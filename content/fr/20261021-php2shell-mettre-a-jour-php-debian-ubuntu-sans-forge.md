---
title: "PHP2Shell : mettre à jour PHP sur Debian et Ubuntu quand Forge ne répond plus"
createdAt: "2026-10-21T21:30:00Z"
image: "/images/articles/pexels-panumas-nikhomkhai-1148820.webp"
description: "PHP2Shell : deux failles critiques de PHP déjà exploitées. Forge ne répond plus ? Voici la commande pour mettre à jour PHP en SSH sur Debian et Ubuntu."
searchIntent: "Comment corriger PHP2Shell (CVE-2026-109618, CVE-2026-109619) et mettre à jour PHP-FPM sur un serveur Debian ou Ubuntu, Laravel Forge compris, en SSH ?"
tags: ["tutoriel", "sécurité", "php", "linux", "dev"]
---

**Réponse courte.** Deux failles de PHP, baptisées PHP2Shell, permettent de prendre la main sur un serveur web sans mot de passe, avec une seule requête. Elles sont corrigées depuis ce mercredi 21 octobre dans PHP 8.5.12, 8.4.27, 8.3.36 et 8.2.35, et déjà exploitées. Sur un serveur Laravel Forge, les mises à jour automatiques ne touchent pas à PHP : il faut le faire à la main. Forge étant aux abonnés absents, voici la marche à suivre, en SSH, avec la commande que j'ai passée sur mes serveurs.

## PHP2Shell, c'est quoi

Deux vulnérabilités, notées 9,2 sur 10 (CVSS 4.0) :

- **CVE-2026-109618** : quand PHP manque de mémoire au mauvais moment, il peut laisser une requête à moitié initialisée, puis la nettoyer comme si elle était valide.
- **CVE-2026-109619** : des données d'une requête survivent après avoir été libérées, et la requête suivante traitée par le même processus les réutilise.

En clair : un attaquant envoie une requête piégée et exécute son code sur le serveur, avant même que votre application ne démarre. Pas besoin de compte, pas besoin d'un plugin vulnérable. Selon [Help Net Security](https://www.helpnetsecurity.com/2026/10/21/php2shell-php-vulnerabilities-patched-cve-2026-109618-cve-2026-109619/){target="_blank" rel="noopener"}, toutes les installations de PHP qui servent des pages web sont concernées : PHP-FPM, Apache avec mod_php, php-cgi, FrankenPHP, LiteSpeed. [watchTowr](https://watchtowr.com/intelligence/php-remote-code-execution-php2shell/){target="_blank" rel="noopener"} signale des exploitations réelles, Cloudflare a vu des tentatives avant même la publication du correctif, et l'agence américaine [CISA](https://www.cisa.gov/news-events/alerts/2026/10/21/critical-vulnerabilities-php-require-immediate-patching){target="_blank" rel="noopener"} demande de corriger immédiatement.

Les versions corrigées, d'après [l'annonce du projet PHP](https://www.php.net/archive/2026.php){target="_blank" rel="noopener"} :

| Branche | Version corrigée |
|---|---|
| PHP 8.5 | 8.5.12 |
| PHP 8.4 | 8.4.27 |
| PHP 8.3 | 8.3.36 |
| PHP 8.2 | 8.2.35 |
| PHP 8.1 et plus ancien | Pas de version officielle : fin de vie |

Pour PHP 8.1 et avant, le projet PHP a publié des correctifs à compiler soi-même, et certaines distributions en livrent. Le vrai remède reste de passer à une version suivie. Et PHP 8.2 perd son support de sécurité le 31 décembre 2026.

## Pourquoi votre serveur Forge n'est pas à jour

On pourrait croire qu'un serveur avec les mises à jour automatiques d'Ubuntu est protégé. Non. Forge installe PHP depuis les paquets d'Ondřej Surý, pas depuis Ubuntu, et `unattended-upgrades` ne prend que les mises à jour de sécurité d'Ubuntu. [L'avis de Forge](https://laravel.com/forge/docs/knowledge-base/php-security-release-october-2026){target="_blank" rel="noopener"} le dit noir sur blanc : il faut mettre PHP à jour soi-même, serveur par serveur, version par version.

Forge recommande de passer par son tableau de bord, onglet PHP, bouton « Update PHP ». L'avantage : il répare au passage la source des paquets. Sauf que ce soir, Forge est aux abonnés absents. Reste le SSH.

## La commande, en SSH

Connectez-vous en root (`sudo -i`), puis collez ce bloc. Il tourne sur Ubuntu et sur Debian, avec Nginx et PHP-FPM (la configuration d'un serveur Forge) ou avec Apache, en PHP-FPM comme en mod_php. Avec LiteSpeed, il ne convient pas : voir plus bas.

```bash
FIXED="8.5.12 8.4.27 8.3.36 8.2.35"
export DEBIAN_FRONTEND=noninteractive NEEDRESTART_MODE=a LC_ALL=C
echo "=== $(hostname) – $(lsb_release -ds 2>/dev/null)"
WEB=""; for w in nginx apache2 lsws; do systemctl is-active --quiet $w && WEB="$WEB $w"; done
echo "Serveur web :${WEB:- aucun détecté}"
MODPHP=$(ls /etc/apache2/mods-enabled/ 2>/dev/null | grep -oE '^php[0-9.]+\.load' | grep -oE '[0-9]+\.[0-9]+')
[ -n "$MODPHP" ] && echo "⚠️ Apache mod_php activé (PHP $MODPHP) – cas le plus risqué selon PHP"
echo "$WEB" | grep -q lsws && echo "⚠️ LiteSpeed détecté : PHP vient des paquets lsphp, utiliser la procédure LiteSpeed"
for f in $(grep -l 'launchpad.*ondrej/php' /etc/apt/sources.list.d/* 2>/dev/null); do cp "$f" /root/$(basename "$f").bak; sed -i 's#https\?://ppa\.launchpad\(content\)\?\.net/ondrej/php/ubuntu#https://ppa.setup-php.com/ondrej/php/ubuntu#' "$f"; echo "Source modifiée : $f"; done
apt-get update 2>&1 | grep -iE 'err.*php|gpg|no_pubkey'
for v in $(ls /etc/php); do
  C=$(apt-cache policy php$v-common | awk '/Candidate/ {print $2}' | cut -d- -f1)
  if [ -n "$C" ] && echo "$FIXED" | grep -qwF "$C"; then
    echo "PHP $v : installation de $C..."
    apt-get install -qq --only-upgrade -y -o Dpkg::Options::="--force-confold" $(dpkg -l "php$v*" "libapache2-mod-php$v*" 2>/dev/null | awk '/^ii/ {print $2}') >/dev/null
  else
    echo "PHP $v : ⚠️ PAS DE CORRECTIF (installé : $(dpkg-query -W -f='${Version}' php$v-common 2>/dev/null), candidat : $(apt-cache policy php$v-common | awk '/Candidate/ {print $2}')) – protection temporaire seulement"
  fi
done
sed -i 's/^;\?session.upload_progress.enabled.*/session.upload_progress.enabled = 0/' /etc/php/*/fpm/php.ini /etc/php/*/apache2/php.ini /etc/php/*/cgi/php.ini 2>/dev/null
for s in $(systemctl list-units --type=service --no-legend --plain 'php*-fpm*' | awk '{print $1}'); do systemctl restart "$s"; done
echo "$WEB" | grep -q apache2 && systemctl restart apache2
for a in $(ls /home/*/*/artisan /home/*/*/current/artisan 2>/dev/null); do sudo -u $(stat -c %U $a) php $a queue:restart >/dev/null 2>&1; done
echo "=== RÉSULTAT"
grep -H '^session.upload_progress.enabled' /etc/php/*/fpm/php.ini /etc/php/*/apache2/php.ini 2>/dev/null | sed 's#^/etc/php/#PROTECTION #'
FPMV=$(grep -rhoE 'php[0-9.]+-fpm' /etc/nginx/ /etc/apache2/ 2>/dev/null | grep -oE '[0-9]+\.[0-9]+' | sort -u)
[ -z "$FPMV$MODPHP" ] && echo "Aucun site n'utilise PHP : PHP n'est pas exposé sur le web sur ce serveur"
chk(){ if [ -n "$2" ] && echo "$FIXED" | grep -qwF "$2"; then echo "VERSION PHP ($1) : $2 ✅ corrigée"; else echo "VERSION PHP ($1) : $2 ❌ NON corrigée"; fi; }
for v in $FPMV; do chk "php-fpm $v" "$(/usr/sbin/php-fpm$v -v 2>/dev/null | head -1 | awk '{print $2}')"; done
for v in $MODPHP; do chk "mod_php $v" "$(dpkg-query -W -f='${Version}' libapache2-mod-php$v 2>/dev/null | cut -d- -f1)"; done
DOMS=$( { grep -RhE '^\s*server_name\s' /etc/nginx/sites-enabled/ /etc/nginx/conf.d/ 2>/dev/null | sed -E 's/^\s*server_name\s+//;s/;.*//'; grep -RhiE '^\s*(ServerName|ServerAlias)\s' /etc/apache2/sites-enabled/ 2>/dev/null | sed -E 's/^\s*\S+\s+//'; } | tr -s ' \t' '\n' | sed 's/:.*//' | grep -vE '^$|^_$|^localhost$|^[0-9.]+$|default|\*' | sort -u)
for d in $DOMS; do echo "DOMAINE : $d → HTTP $(curl -s -o /dev/null -m 10 -w '%{http_code}' https://$d)"; done
echo "DATE : $(date -u '+%d/%m/%Y à %H:%M') (UTC)"
```

Comptez quelques secondes de coupure par version de PHP, le temps que PHP-FPM redémarre. Si vous avez le choix de l'heure, prenez celle où il y a le moins de visiteurs.

Ce qu'on doit voir dans le résultat :

- `PROTECTION` : `session.upload_progress.enabled = 0` pour chaque fichier (fpm et/ou apache2).
- `✅` pour chaque version utilisée (php-fpm ou mod_php).
- HTTP `200`, `301` ou `302` pour chaque domaine.
- « LiteSpeed détecté » : ce script ne convient pas, il faut passer par la procédure lsphp (plus bas).

## Ce que fait la commande, étape par étape

**1. Elle repère le serveur web.** Nginx, Apache ou LiteSpeed : elle affiche ceux qui tournent. Elle signale aussi mod_php, le cas le plus risqué selon PHP, parce que l'attaque passe avant même que le code de l'application ne s'exécute, dans le processus d'Apache lui-même. Et elle prévient si LiteSpeed tourne : son PHP vient d'autres paquets, que ce script ne touche pas.

**2. Elle répare la source des paquets.** Les vieux serveurs Forge pointent encore vers Launchpad, l'adresse d'origine du dépôt `ondrej/php`. Forge utilise désormais `ppa.setup-php.com`, un miroir de ce dépôt. La boucle `for f in …` remplace l'une par l'autre, après avoir copié le fichier d'origine dans `/root/` (`.bak`). C'est l'étape que fait le bouton de Forge, et celle qu'on oublie en SSH.

**3. Elle vérifie que le correctif est vraiment là.** `apt-get update` n'affiche que les erreurs qui concernent PHP ou les clés GPG. Puis, pour chaque version installée (`ls /etc/php`), `apt-cache policy` donne la version que l'on va recevoir. Si elle ne figure pas dans la liste `FIXED`, la commande n'installe rien et le dit, en affichant la version installée et la version proposée. C'est volontaire : ce soir, certains paquets n'avaient pas encore atteint les miroirs, surtout sur les serveurs ARM (8.4 et 8.5 sur arm64, selon [le mainteneur du miroir](https://github.com/shivammathur/setup-php/issues/1139){target="_blank" rel="noopener"}).

**4. Elle met à jour tous les paquets de cette version.** `--only-upgrade` n'installe rien de nouveau, `--force-confold` garde vos `php.ini` et vos pools PHP-FPM tels quels. Le module Apache (`libapache2-mod-php`) est mis à jour avec le reste. Les variables du début évitent qu'apt ou `needrestart` ne s'arrêtent pour poser une question. `LC_ALL=C` force apt à répondre en anglais : sur un serveur réglé en français, il écrit « Candidat » au lieu de « Candidate », et la commande ne trouverait aucune version.

**5. Elle coupe une fonction de PHP par précaution.** `session.upload_progress.enabled = 0` fait partie des parades temporaires recommandées par PHP, relayées par le [NCSC néerlandais](https://github.com/NCSC-NL/php2shell){target="_blank" rel="noopener"}. Elle sert de filet sur les versions pas encore corrigées. Le revers : les barres de progression d'envoi de fichiers basées sur cette fonction ne marchent plus. Si votre site n'en a pas, laissez-la coupée. La commande la coupe dans les `php.ini` de PHP-FPM, d'Apache et de CGI.

**6. Elle redémarre PHP-FPM, Apache et les files d'attente Laravel.** Tant qu'un processus n'a pas redémarré, il garde l'ancien PHP en mémoire. La commande redémarre tous les services `php*-fpm`, puis Apache s'il tourne (un vrai `restart` : avec mod_php, un `reload` ne suffit pas), puis lance `php artisan queue:restart` pour chaque application Laravel trouvée dans `/home`, sous l'utilisateur propriétaire. Si vous utilisez Horizon, Reverb ou Octane, redémarrez-les aussi : `php artisan horizon:terminate`, `php artisan reverb:restart`, et pour Octane, un redémarrage complet de son programme Supervisor (`octane:reload` ne suffit pas).

**7. Elle fait le bilan.** D'abord la ligne de protection de l'étape 5, fichier par fichier. Ensuite, pour chaque version de PHP utilisée par Nginx ou Apache, la version de PHP-FPM ou de mod_php installée, avec ✅ ou ❌. Si aucun site n'utilise PHP, elle le dit : PHP n'est alors pas exposé sur le web sur ce serveur. Enfin, elle appelle chaque domaine déclaré dans la configuration de Nginx (`server_name`) et d'Apache (`ServerName`, `ServerAlias`) et affiche le code HTTP : `200`, `301` ou `302`, le site répond ; `502`, PHP-FPM ne tourne pas, allez voir ; `000`, pas de réponse du tout (domaine qui ne pointe plus vers ce serveur, certificat absent).

## Sans Forge : Debian et Ubuntu

Sur une Debian qui utilise le PHP de la distribution, c'est plus simple : les correctifs passent par le dépôt de sécurité de Debian, comme le reste. D'après [le récapitulatif de Mattias Geniar](https://ma.ttias.be/php-cve-2026-109618-patch/){target="_blank" rel="noopener"}, les paquets corrigés sont `8.4.27-1~deb13u1` pour Debian 13 et `8.2.35-1~deb12u1` pour Debian 12.

```bash
sudo apt-get update
apt-cache policy php8.4-fpm      # ou php8.2-fpm sur Debian 12
sudo apt-get install --only-upgrade $(dpkg -l 'php8.4*' 'libapache2-mod-php8.4' 2>/dev/null | awk '/^ii/ {print $2}')
sudo systemctl restart php8.4-fpm
```

Si `unattended-upgrades` est actif, il a peut-être déjà installé le correctif. Vérifiez quand même la version, et que PHP-FPM a bien redémarré. Avec Apache et mod_php, c'est `sudo systemctl restart apache2` : un simple `reload` ne suffit pas.

Si vous utilisez le dépôt `packages.sury.org` (plusieurs versions de PHP sur Debian), la commande du début fonctionne telle quelle : elle ne touche qu'aux sources Launchpad et compare la version candidate à la liste. Mais là aussi, ce soir, les paquets arm64 avaient du retard.

Un piège sur **Ubuntu sans Forge**, avec le PHP d'Ubuntu : la distribution reporte le correctif sur son ancienne version sans changer le numéro. PHP 8.3 corrigé sur Ubuntu 24.04 s'appelle `8.3.6-0ubuntu0.24.04.13`, et `php -v` affiche toujours 8.3.6. La commande du début n'y reconnaît pas une version corrigée : elle n'installe rien et affiche « PAS DE CORRECTIF ». Sur ces serveurs, passez par la méthode Debian juste au-dessus (en remplaçant `8.4` par `8.3`), puis vérifiez dans le journal du paquet que le correctif est bien là :

```bash
zgrep -E 'CVE-2026-10961[89]' /usr/share/doc/php8.3-fpm/changelog.Debian.gz
```

### Avec LiteSpeed ou CyberPanel

OpenLiteSpeed et LiteSpeed n'utilisent ni PHP-FPM ni mod_php, mais leurs propres paquets, `lsphp` (par exemple `lsphp83`), installés dans `/usr/local/lsws/`. C'est le cas de CyberPanel, que j'utilise sur un VPS Hostinger sous AlmaLinux (je l'ai raconté dans [ma migration de cPanel vers CyberPanel](/fr/20260327-cpanel-cyberpanel-migration)). La commande du début ne les voit pas. La procédure :

```bash
# AlmaLinux, Rocky
sudo dnf upgrade 'lsphp*'
# Ubuntu, Debian
sudo apt-get install --only-upgrade $(dpkg -l 'lsphp*' | awk '/^ii/ {print $2}')
# puis, dans les deux cas
sudo pkill lsphp
/usr/local/lsws/lsphp83/bin/php -v
```

`pkill lsphp` arrête les processus PHP : LiteSpeed les relance à la première visite, avec la nouvelle version. Vérifiez que celle-ci figure bien dans le tableau des versions corrigées : si le paquet n'est pas encore sorti, la parade `session.upload_progress` se règle dans le `php.ini` de chaque `lsphp` (`/usr/local/lsws/lsphp83/etc/php/8.3/litespeed/php.ini` sur Ubuntu, par exemple).

Dernier cas : FrankenPHP embarque son propre PHP, qu'apt ne met pas à jour. Il faut passer à FrankenPHP 1.13.2, ou reconstruire l'image Docker.

## Si le correctif n'est pas encore disponible

La commande affiche « PAS DE CORRECTIF » ? Comparez les deux versions entre parenthèses. Sauf sur Ubuntu avec le PHP d'Ubuntu (voir plus haut), le paquet corrigé n'a pas encore atteint votre miroir. Relancez-la dans une heure. En attendant :

- **La parade `session.upload_progress`** est déjà appliquée par la commande. Elle réduit le risque, elle ne le supprime pas.
- **Cloudflare** a déployé des règles de pare-feu contre les attaques connues, pour tous ses clients, offre gratuite comprise, selon [Help Net Security](https://www.helpnetsecurity.com/2026/10/21/php2shell-php-vulnerabilities-patched-cve-2026-109618-cve-2026-109619/){target="_blank" rel="noopener"}. Si votre site passe par Cloudflare, c'est une couche de plus. J'ai raconté comment ces règles m'ont déjà débarrassé de robots indésirables dans [J'ai récupéré le trafic de mon blog (et les bots qui vont avec)](/fr/20260922-jai-recupere-le-trafic-de-mon-blog-et-les-bots-qui-vont-avec).
- **Le NCSC britannique** conseille de mettre hors ligne ce qui ne peut pas être corrigé tout de suite. Pour un site vitrine qui peut attendre demain matin, c'est l'option la plus sûre.

Et si le serveur tourne encore en PHP 8.1 ou plus ancien, aucune attente ne servira : il faut installer une version suivie et y basculer les sites.

## Vérifier qu'aucun processus ne garde l'ancien PHP

Le bilan de la commande vérifie la version de PHP-FPM installée sur le disque, pas celle qui tourne en mémoire. Pour être sûr qu'aucun processus, PHP-FPM, un worker oublié ou un script lancé à la main, ne tourne encore avec les anciens fichiers :

```bash
sudo grep -lsE 'php.*\(deleted\)$' /proc/[0-9]*/maps
```

Aucune ligne en sortie : plus rien n'utilise l'ancienne version de PHP. Sinon, le numéro dans le chemin (`/proc/<numéro>/maps`) est celui du processus à redémarrer.

## Je vous laisse

Une faille qui donne la main sans mot de passe, sur le langage qui fait tourner une bonne partie du Web, avec des attaques déjà en cours : il n'y a pas grand-chose à analyser, il faut corriger. J'en parlais hier à propos d'un [WordPress piraté](/fr/20261020-site-wordpress-pirate-trouver-par-ou-le-pirate-est-entre) : les robots ne visent personne en particulier, ils essaient tout, partout. Ce soir, ils essaient PHP2Shell.

Je vous laisse… la nuit va être longue.

---

*Photo : [Panumas Nikhomkhai](https://www.pexels.com/photo/1148820/), Pexels.*

---
*[Jean-Luc Houédanou](https://houedanou.com) — en SSH ce soir, un serveur après l'autre*
