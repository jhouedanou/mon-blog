---
title: "Failles PHP et nginx2root : corriger son serveur Ubuntu"
createdAt: "2026-11-20T18:00:00Z"
image: "/images/articles/pexels-brett-sayles-2881229.webp"
description: "Deux failles critiques dans les sessions PHP, nginx2root dans nginx : les commandes à coller en SSH pour corriger un serveur Ubuntu 22.04 ou plus récent."
searchIntent: "Comment corriger les failles de session PHP (CVE-2026-115560, CVE-2026-126714) et nginx2root (CVE-2026-123007) sur un serveur Ubuntu, en SSH ?"
tags: ["tutoriel", "sécurité", "php", "nginx", "linux"]
---

J'ai écrit en juillet que [le vrai métier de dev, c'est de se prendre des murs](/fr/20260707-je-suis-encore-vivant). Je le pense toujours, mais là, ça commence à faire beaucoup de murs quand même.

Il y a un mois, je passais ma soirée à corriger [PHP2Shell](/fr/20261021-php2shell-mettre-a-jour-php-debian-ubuntu-sans-forge). Je pensais être tranquille jusqu'à Noël, et j'ai tenu trente jours. Heureusement que j'ai la foi, ainsi que les humoristes camerounais du Web (Takam, les Baos, Eric le Retour, Neil Cruz…), pour rendre ces moments de solitude plus supportables. En parallèle, j'ai installé Omarchy sur mon iMac de 2017, après [le MacBook Pro de la même année](/fr/20261013-retournement-de-veste-omarchy-macbook-pro-2017).

Cette semaine, ce sont deux nouvelles failles critiques dans PHP, une dans nginx, et un noyau Linux à tenir à jour. Il faut passer nginx en 1.31.9 (ou installer le paquet corrigé d'Ubuntu), PHP en 8.2.36, 8.3.37, 8.4.28 ou 8.5.13, couper `session.upload_progress`, puis redémarrer le serveur. Ça fait trois blocs de commandes à coller en SSH, dix minutes par serveur.

**L'essentiel :**

- **PHP** : deux failles dans les sessions, notées 9,2 sur 10, corrigées le 19 novembre 2026 dans PHP 8.5.13, 8.4.28, 8.3.37 et 8.2.36.
- **nginx** : une corruption de mémoire dans HTTP/2, premier maillon de la chaîne nginx2root, corrigée le 18 novembre dans nginx 1.31.9 et 1.30.7.
- **Pas d'attaque connue** à ce jour, ni pour l'une ni pour l'autre. C'est le bon moment pour corriger.
- **Les commandes** de cet article valent pour Ubuntu 22.04 ou plus récent.

## Ce qui est cassé cette fois

### Les deux failles PHP

Les deux touchent les sessions, c'est-à-dire le mécanisme qui retient qu'un visiteur est connecté. Les deux sont notées 9,2 sur 10 et permettent, dans certaines conditions, d'exécuter du code sur le serveur.

- **[CVE-2026-115560](https://github.com/php/php-src/security/advisories/GHSA-658j-r8rw-q6mx){target="_blank" rel="noopener"}** : PHP sait écrire une session dans trois formats. Si une session est écrite dans un format puis relue dans un autre, un attaquant peut y glisser des données piégées. Il passe par `session.upload_progress`, l'option qui suit l'avancement des envois de fichiers. Le code fautif date de PHP 5.4, sorti en 2012.
- **[CVE-2026-126714](https://github.com/php/php-src/security/advisories/GHSA-fm2m-fjf5-v3cp){target="_blank" rel="noopener"}** : si l'écriture d'un fichier de session est interrompue au mauvais moment, le fichier contient un mélange de deux sessions, et PHP le relit comme s'il était valide. Ce code-là date de PHP 4.1, sorti en 2001.

Ces failles sont moins faciles à exploiter que PHP2Shell. Le [projet PHP](https://www.php.net/archive/2026.php#2026-11-18-1){target="_blank" rel="noopener"} précise que les failles critiques de cette livraison demandent une configuration particulière ou peu courante, et l'application doit contenir du code réutilisable par l'attaquant. Personne ne signale d'attaque pour l'instant.

« Deux failles », c'est aussi une façon polie de compter, puisque d'après le [journal des modifications de PHP](https://www.php.net/ChangeLog-8.php){target="_blank" rel="noopener"}, la livraison du 19 novembre corrige 18 failles en tout. Je vous présente les deux plus graves, et les seize autres sont comprises dans la même mise à jour, vous n'aurez pas à les connaître.

### La faille nginx de la chaîne nginx2root

**CVE-2026-123007** est une corruption de mémoire dans le module HTTP/2 de nginx. Elle est classée « major » par [nginx](https://nginx.org/en/security_advisories.html){target="_blank" rel="noopener"} et touche toutes les versions de 1.9.5 à 1.31.8. La version 1.9.5 date de 2015, donc onze ans de nginx sont concernés. Il faut que HTTP/2 soit activé, ce qui est courant sur les sites en HTTPS.

Les chercheurs de [Xint](https://xint.io/blog/nginx2root-remote-code-execution){target="_blank" rel="noopener"} ont enchaîné cinq failles de nginx, dont celle-ci, sous le nom nginx2root. Pour devenir root, c'est-à-dire administrateur de la machine, leur chaîne se termine par une faille du noyau Linux, d'où le troisième bloc de cet article.

Là encore, pas d'attaque connue. Selon [StepSecurity](https://www.stepsecurity.io/blog/cve-2026-123007-nginx-http2-rce){target="_blank" rel="noopener"}, l'attaque demande d'envoyer environ 119 Gio de données en moins d'une heure à un serveur peu chargé. Ce n'est pas à la portée du premier robot venu.

Et comme pour PHP, « une faille » est un résumé : nginx 1.31.9 en corrige dix.

| Logiciel | Faille principale | Versions corrigées | Date |
|---|---|---|---|
| PHP | CVE-2026-115560 et CVE-2026-126714 (sessions) | 8.5.13, 8.4.28, 8.3.37, 8.2.36 | 19 novembre 2026 |
| nginx | CVE-2026-123007 (HTTP/2, nginx2root) | 1.31.9 (mainline), 1.30.7 (stable) | 18 novembre 2026 |

Selon l'[enquête Netcraft de septembre 2026](https://www.netcraft.com/blog/september-2026-web-server-survey){target="_blank" rel="noopener"}, nginx tourne sur 44 % des ordinateurs exposés au Web. Il y a donc du monde concerné.

## Avant de commencer

Les trois blocs valent pour **Ubuntu 22.04 ou plus récent**. Vérifiez d'abord :

```bash
lsb_release -ds
```

Puis passez en root et rafraîchissez la liste des paquets :

```bash
sudo -i
```

```bash
apt-get update
```

Enfin, regardez d'où vient votre nginx. La réponse décide si vous faites le bloc 1 ou si vous le sautez. C'est la commande de [la procédure de Laravel Forge](https://laravel.com/forge/docs/knowledge-base/nginx-to-root){target="_blank" rel="noopener"} :

```bash
dpkg-query -W -f='${Version}  ${Maintainer}\n' nginx
```

| La ligne contient | Votre nginx vient | À faire |
|---|---|---|
| `sury.org` | du dépôt d'Ondřej Surý | Bloc 1 |
| `nginx-packaging@f5.com` | du dépôt officiel nginx.org | Bloc 1 (il ne fera que la mise à jour) |
| `Ubuntu` | des paquets d'Ubuntu | Sautez le bloc 1 |

Si vous gérez plusieurs serveurs, la méthode de l'article PHP2Shell pour [lancer la même commande sur tout un parc](/fr/20261021-php2shell-mettre-a-jour-php-debian-ubuntu-sans-forge) marche aussi ici.

## Bloc 1 : mettre nginx à jour

Ce bloc est fait pour les serveurs dont nginx vient du dépôt d'Ondřej Surý (`ondrej/nginx`) ou du dépôt officiel nginx.org. Si votre nginx vient des paquets d'Ubuntu, sautez-le : le bloc 3 le mettra à jour, Ubuntu ayant publié les correctifs ([USN-9159-1](https://ubuntu.com/security/notices/USN-9159-1){target="_blank" rel="noopener"} et [USN-9182-1](https://ubuntu.com/security/notices/USN-9182-1){target="_blank" rel="noopener"}).

### DigitalOcean ou ailleurs, ce qui change

J'ai cherché si DigitalOcean imposait une marche à suivre à part, et je n'ai rien trouvé de documenté. Ce qui compte, c'est qui a installé nginx, quel que soit l'hébergeur. Il y a trois cas :

- **Serveur créé par Laravel Forge avant fin avril 2026**, chez DigitalOcean comme ailleurs : nginx vient du dépôt d'Ondřej Surý. Il faut retirer cette source, parce que le dépôt a été supprimé et ne livrera jamais la version corrigée. Attention : on retire la source, pas nginx. Inutile de désinstaller le paquet, [la procédure de Forge](https://laravel.com/forge/docs/knowledge-base/nginx-to-root){target="_blank" rel="noopener"} ne le demande pas. Et la commande habituelle, `add-apt-repository --remove`, échoue puisque le dépôt n'existe plus, donc le bloc 1 supprime le fichier à la main. Les serveurs Forge plus récents sont déjà sur nginx.org.
- **Droplet DigitalOcean installé sans Forge** : nginx vient des paquets d'Ubuntu, que DigitalOcean sert depuis [son propre miroir](https://docs.digitalocean.com/products/droplets/details/mirrors/){target="_blank" rel="noopener"}. Ne soyez pas surpris de lire `mirrors.digitalocean.com` à la place de `archive.ubuntu.com` pendant `apt-get update`. Sautez le bloc 1.
- **Ailleurs, sans Forge** : nginx vient en général des paquets d'Ubuntu. Sautez le bloc 1.

Dans le doute, la commande `dpkg-query` de la section précédente tranche.

```bash
cp -a /etc/nginx /root/nginx-backup-$(date +%F)
rm -f /etc/apt/sources.list.d/ondrej-ubuntu-nginx-*
grep -rqs "nginx.org/packages" /etc/apt/sources.list /etc/apt/sources.list.d/ || {
  curl -fsSL https://nginx.org/keys/nginx_signing.key | gpg --dearmor > /usr/share/keyrings/nginx-archive-keyring.gpg
  echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] https://nginx.org/packages/mainline/ubuntu $(lsb_release -cs) nginx" > /etc/apt/sources.list.d/nginx.list
}
printf "Package: *\nPin: origin nginx.org\nPin: release o=nginx\nPin-Priority: 900\n" > /etc/apt/preferences.d/99nginx
apt-get update
apt-get install -y --only-upgrade -o Dpkg::Options::=--force-confold nginx
grep -qs "server_name  *localhost" /etc/nginx/conf.d/default.conf && mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.disabled
nginx -t && systemctl restart nginx
nginx -v; systemctl is-active nginx
```

Attendu : `test is successful`, `nginx/1.31.9`, `active`.

Lancez ce bloc à une heure creuse : le changement de dépôt remplace le paquet nginx, et si le test de configuration échoue, vos sites restent coupés le temps de corriger.

Ce que fait le bloc, dans l'ordre :

1. **Il sauvegarde** `/etc/nginx` dans `/root`. Si quelque chose casse, la configuration d'avant est là.
2. **Il supprime la source `ondrej/nginx`.** Ce dépôt n'existe plus. Ondřej Surý a annoncé en janvier [qu'il arrêtait de fournir nginx](https://codeberg.org/oerdnj/deb.sury.org/issues/67){target="_blank" rel="noopener"}, parce qu'il n'y trouvait plus « ni joie ni satisfaction », et il a fermé le dossier en avril. Voilà quelqu'un qui a changé de métier au bon moment.
3. **Il ajoute le dépôt officiel de nginx**, branche mainline, avec sa clé de signature, et lui donne la priorité sur les paquets d'Ubuntu. C'est la méthode décrite dans [la documentation de nginx](https://nginx.org/en/linux_packages.html){target="_blank" rel="noopener"}.
4. **Il met nginx à jour** en gardant vos fichiers de configuration (`--force-confold`).
5. **Il désactive le site d'exemple** que le paquet officiel installe (`default.conf`, avec `server_name localhost`), pour qu'il ne réponde pas à la place d'un de vos sites.
6. **Il teste la configuration, puis redémarre nginx.** Un redémarrage complet, parce qu'un rechargement garde l'ancien programme en mémoire.

**Si `nginx -t` échoue** en citant une ligne `load_module`, c'est normal : les modules fournis par l'ancien dépôt (brotli, geoip, image-filter, xslt) n'existent pas dans le paquet officiel. Ouvrez le fichier indiqué, commentez la ligne avec un `#` (ou supprimez le lien cassé dans `/etc/nginx/modules-enabled/`), puis relancez `nginx -t && systemctl restart nginx`. Si votre configuration utilise brotli, commentez aussi les directives `brotli`.

## Bloc 2 : mettre PHP à jour

```bash
apt-get install -y --only-upgrade -o Dpkg::Options::=--force-confold $(dpkg -l | awk '/^ii/ && $2 ~ /^php8\.[0-9]/ {print $2}')
sed -i 's/^;\?\s*session.upload_progress.enabled.*/session.upload_progress.enabled = Off/' /etc/php/*/fpm/php.ini
for s in $(systemctl list-units --type=service --no-legend 'php*-fpm*' | awk '{print $1}'); do systemctl restart $s; done
for v in /usr/bin/php8.*; do $v -v | head -1; done
grep -H "upload_progress.enabled" /etc/php/*/fpm/php.ini
```

Attendu : 8.2.36, 8.3.37, 8.4.28 ou 8.5.13, et `= Off` partout.

Ce que fait le bloc :

1. **Il met à jour tous les paquets PHP 8 installés**, toutes versions confondues, sans en installer de nouveaux.
2. **Il coupe `session.upload_progress`** dans le `php.ini` de chaque PHP-FPM. C'est par cette option que passe la première faille, et la protection recommandée pour la seconde. Le correctif de PHP la coupe déjà par défaut, mais un réglage explicite déjà présent sur votre serveur garde la main, donc autant l'écrire soi-même.
3. **Il redémarre chaque PHP-FPM**, puis affiche les versions et le réglage.

Deux précisions.

**Les numéros 8.x.y sont ceux du dépôt `ondrej/php`**, encore actif pour Ubuntu 22.04 et 24.04. Si votre PHP vient des paquets d'Ubuntu, le numéro ne changera presque pas (par exemple `8.3.6-0ubuntu0.24.04.14` sur Ubuntu 24.04) : Ubuntu corrige sans changer de version. À ce jour, [Ubuntu a corrigé CVE-2026-126714](https://ubuntu.com/security/CVE-2026-126714){target="_blank" rel="noopener"} mais [pas encore CVE-2026-115560](https://ubuntu.com/security/CVE-2026-115560){target="_blank" rel="noopener"}. Dans ce cas, c'est la ligne `sed` qui vous protège. Ne la sautez pas.

**Vérifiez qu'aucun site ne réactive l'option** dans sa propre configuration :

```bash
grep -rn "upload_progress.enabled" /etc/php/*/fpm/pool.d/ /etc/php/*/fpm/conf.d/
find /home /var/www -name .user.ini -exec grep -Hn upload_progress {} + 2>/dev/null
```

Aucune ligne en sortie : rien à faire. Sinon, passez la valeur à `Off` dans le fichier indiqué et redémarrez PHP-FPM. Le bloc ne touche que PHP-FPM : avec Apache et mod_php, faites le même réglage dans `/etc/php/*/apache2/php.ini`, puis redémarrez Apache. Les seuls sites qui y perdent sont ceux qui affichent une barre de progression d'envoi de fichier gérée par PHP. La plupart la gèrent dans le navigateur et ne verront aucune différence.

## Bloc 3 : mettre Ubuntu et le noyau à jour

```bash
uname -r
apt-get upgrade -y --with-new-pkgs -o Dpkg::Options::=--force-confold
[ -f /var/run/reboot-required ] && echo "REDEMARRAGE NECESSAIRE"
```

Si l'écran « Newer kernel available » apparaît, validez avec Entrée.

Puis, à une heure creuse (1 à 2 minutes de coupure) :

```bash
reboot
```

Après reconnexion :

```bash
uname -r; nginx -v; systemctl is-active nginx
systemctl list-units --type=service 'php*-fpm*' --no-legend
```

Attendu : un noyau plus récent, nginx en 1.31.9, `active` et `running`. Si vous avez sauté le bloc 1, nginx garde son numéro habituel d'Ubuntu, parce qu'Ubuntu corrige sans changer de version. Relancez alors la commande `dpkg-query` du début : le paquet corrigé est `1.24.0-2ubuntu7.21` sur Ubuntu 24.04 et `1.18.0-6ubuntu14.24` sur Ubuntu 22.04. Un numéro plus ancien veut dire que le paquet n'est pas encore arrivé : refaites le bloc 3 un peu plus tard.

Le noyau est concerné parce que la chaîne nginx2root se termine par une faille du noyau Linux pour devenir root. D'après Xint, cette faille du noyau n'avait pas encore de correctif à la date de leur article. Le redémarrage d'aujourd'hui installe tous les correctifs déjà publiés. Il faudra refaire ce bloc quand celui-là sortira.

Une « heure creuse », pour un serveur, c'est la nuit.

## Les questions qu'on me pose

### Est-ce que ces failles sont déjà exploitées ?

Non, pas à ma connaissance au 20 novembre 2026. Ni les avis du projet PHP, ni nginx, ni les chercheurs ne signalent d'attaque réelle. PHP2Shell, le mois dernier, était exploitée avant même la sortie du correctif. Cette fois, vous avez un peu d'avance, profitez-en pour corriger.

### Je suis encore en PHP 8.1 ou plus ancien, que faire ?

Le projet PHP ne publie plus de version pour ces branches. Ubuntu corrige encore son PHP 8.1 sur Ubuntu 22.04, mais le remède est de passer à une version suivie. En attendant, coupez `session.upload_progress` : la ligne `sed` du bloc 2 marche sur toutes les versions.

### Peut-on se protéger de nginx2root sans mettre nginx à jour ?

En partie. Désactiver HTTP/2 (`http2 off;`, ou retirer `http2` des lignes `listen` sur un nginx antérieur à 1.25.1) coupe l'accès à la faille principale, mais pas aux neuf autres corrigées dans la même version, et vos sites seront plus lents. Ça permet de tenir une nuit, mais ce n'est pas une solution.

### Faut-il vraiment redémarrer le serveur ?

Oui, parce qu'un nouveau noyau ne sert à rien tant que l'ancien tourne. Comptez une à deux minutes de coupure, à l'heure où vos visiteurs dorment.

## Je vous laisse

Ces failles étaient dans PHP depuis 2001 et 2012 et dans nginx depuis 2015, et le métier consiste, de plus en plus, à apprendre le vendredi que ce qu'on a installé il y a dix ans était cassé depuis le début. Si la boulangerie, la menuiserie ou l'élevage de chèvres vous tentent, partez maintenant, pendant que vos serveurs sont à jour.

Moi, je reste, parce que quelqu'un doit bien coller les trois blocs. Et si un de vos sites a déjà été visité, j'explique ici [comment trouver par où le pirate est entré](/fr/20261020-site-wordpress-pirate-trouver-par-ou-le-pirate-est-entre).

Je vous laisse… on se retrouve à la prochaine faille, disons dans un mois.

---

*Photo : [Brett Sayles](https://www.pexels.com/photo/2881229/), Pexels.*

---
*[Jean-Luc Houédanou](https://houedanou.com)*
