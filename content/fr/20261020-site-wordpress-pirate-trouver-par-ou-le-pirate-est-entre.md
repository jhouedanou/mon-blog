---
title: "Site WordPress piraté : trouver par où le pirate est entré"
createdAt: "2026-10-20T09:00:00Z"
image: "/images/articles/wordpress-pirate-trace-logs.webp"
description: "Site WordPress piraté, que faire ? D'abord trouver la porte d'entrée dans les logs : mot de passe deviné, plugin envoyé par wp-admin. Commandes incluses."
searchIntent: "Mon site WordPress a été piraté : que faire en premier, et comment retrouver dans les logs du serveur par où le pirate est entré (mot de passe admin, plugin, FTP) ?"
tags: ["tutoriel", "wordpress", "sécurité", "dev"]
---

**Réponse courte.** Avant de nettoyer quoi que ce soit, copiez les logs du serveur. Puis cherchez-y la porte d'entrée : une rafale de `POST /wp-login.php` suivie d'une connexion réussie veut dire que le mot de passe a été deviné ; un `upload-plugin` juste après veut dire que le pirate a installé son propre plugin depuis l'administration. Tant que vous ne savez pas par où il est entré, il reviendra par le même chemin, même après une restauration propre.

C'est exactement ce que j'ai trouvé en août, sur un site d'actualité africain que je devais remettre d'aplomb. Voici la méthode, commandes comprises.

## Que faire en premier quand un site WordPress est piraté

Le réflexe, c'est de tout supprimer et de restaurer une sauvegarde. C'est le meilleur moyen d'effacer les preuves et de laisser la porte ouverte. Dans l'ordre :

1. **Copier les logs**, tout de suite. Les journaux d'accès tournent : selon l'hébergeur, ceux de plus de quelques jours sont compressés, puis supprimés. Sans eux, plus d'enquête possible.
2. **Faire une archive du site piraté** (fichiers et base), même infectée. C'est votre scène de crime.
3. **Changer tous les mots de passe administrateur** et invalider toutes les sessions ouvertes.
4. **Chercher la porte d'entrée**, ce que décrit la suite de ce billet.
5. Seulement ensuite : nettoyer ou restaurer, et fermer la porte.

Une précaution avant de taper la moindre commande `wp`. [WP-CLI](https://wp-cli.org/){target="_blank" rel="noopener"} charge WordPress, donc aussi les plugins, y compris celui du pirate. Son code peut s'exécuter, ou cacher son compte administrateur dans les résultats. Sur un site piraté, on lance donc toujours WP-CLI sans plugins ni thème. Le plus simple est de le définir une fois pour toute la session :

```bash
wp() { command wp --path=/var/www/monsite --skip-plugins --skip-themes "$@"; }
```

Ensuite, pour les étapes 1 à 3, en SSH :

```bash
# 1. Copier les logs (adapter le chemin, voir plus bas)
mkdir -p ~/enquete/logs
sudo cp -a /var/log/nginx/. ~/enquete/logs/
sudo chown -R "$USER" ~/enquete

# 2. Archiver le site et la base, en l'état
tar czf ~/enquete/site-pirate.tar.gz -C /var/www monsite
wp db export ~/enquete/base-piratee.sql

# 3. Invalider les connexions et changer les mots de passe
wp config shuffle-salts
wp user update <identifiant> --prompt=user_pass
```

`wp config shuffle-salts` change les clés secrètes de `wp-config.php` : tous les cookies de connexion deviennent invalides, y compris celui du pirate. `--prompt=user_pass` demande le nouveau mot de passe sans le laisser dans l'historique du terminal. À répéter pour chaque compte administrateur.

## Où trouver les logs du serveur

WordPress ne note pas les tentatives de connexion. Il garde seulement les sessions ouvertes, avec la date, l'adresse IP et le navigateur, dans la base (on y revient plus bas). Le reste de la preuve est dans le journal d'accès du serveur web, qui note chaque requête : adresse IP, date, page demandée, code de réponse.

| Serveur ou panneau | Emplacement habituel du journal d'accès |
|---|---|
| Nginx | `/var/log/nginx/access.log` |
| Apache (Debian, Ubuntu) | `/var/log/apache2/access.log` |
| Apache (AlmaLinux, Rocky) | `/var/log/httpd/access_log` |
| cPanel | `/usr/local/apache/domlogs/<domaine>` et `<domaine>-ssl_log` ; sans accès root, `~/access-logs/` et `~/logs/` |
| CyberPanel (OpenLiteSpeed) | `/home/<domaine>/logs/<domaine>.access_log` |

Sur un hébergement mutualisé sans SSH, le panneau d'administration propose en général de télécharger les logs bruts. Prenez tout ce qui est disponible, y compris les fichiers `.gz`, et rangez-les dans `~/enquete/logs/`. Dans les commandes suivantes, `zgrep` lit les fichiers compressés comme les autres, quel que soit leur nom.

Une ligne de log ressemble à ça (format « combined », le plus courant) :

```
203.0.113.45 - - [12/Aug/2026:03:14:07 +0000] "POST /wp-login.php HTTP/1.1" 200 4521 "-" "Mozilla/5.0"
```

Dans l'ordre : l'IP, la date, la requête, puis le **code de réponse** (`200` ici). C'est ce code qui va tout dire.

## Piste 1 : un mot de passe administrateur deviné

Quand on se trompe de mot de passe, `wp-login.php` répond `200` : il réaffiche le formulaire avec un message d'erreur. Quand le mot de passe est bon, il répond `302` : une redirection vers `/wp-admin/`. Une attaque par force brute laisse donc une signature très lisible : des centaines de `POST` en `200`, puis un `302`.

Compter les tentatives par adresse IP :

```bash
zgrep -h 'POST /wp-login.php HTTP' ~/enquete/logs/* \
  | awk '{print $1}' | sort | uniq -c | sort -rn | head -20
```

Retrouver les connexions réussies :

```bash
zgrep -h 'POST /wp-login.php HTTP' ~/enquete/logs/* | awk '$9 == 302'
```

Le motif `wp-login.php HTTP` écarte les pages « mot de passe oublié » (`wp-login.php?action=lostpassword`), qui répondent aussi `302`. Si le site utilise la double authentification, un bon mot de passe renvoie d'abord `200` (la page qui demande le code) : comptez alors sur la piste suivante et sur les sessions.

Ne vous arrêtez pas à `wp-login.php`. Les robots passent aussi par `xmlrpc.php`, l'ancienne interface de publication à distance. Elle accepte elle aussi un identifiant et un mot de passe, mais répond toujours `200`, que l'essai réussisse ou non. Un volume anormal de `POST /xmlrpc.php` est donc un signal, même sans `302` visible :

```bash
zgrep -h 'POST /xmlrpc.php' ~/enquete/logs/* \
  | awk '{print $1}' | sort | uniq -c | sort -rn | head
```

Comment le pirate connaissait-il le nom d'utilisateur ? WordPress le donne volontiers : `/?author=1` redirige vers `/author/<nom>/`, qui est souvent l'identifiant lui-même, et `/wp-json/wp/v2/users` (ou `?rest_route=/wp/v2/users`) liste les auteurs qui ont publié. Cherchez ces requêtes juste avant la rafale.

Enfin, regardez les sessions que WordPress a gardées pour chaque administrateur : date de connexion, IP et navigateur.

```bash
wp user session list <identifiant> --fields=login_time,ip,ua
```

**Lire le résultat :**

- **Beaucoup d'échecs, puis un succès depuis la même IP** : le mot de passe a été deviné. Il était trop court ou trop courant.
- **Une rafale sur `xmlrpc.php`, puis un seul `302` sur `wp-login.php`** : même chose. Le mot de passe a été trouvé par `xmlrpc.php`, puis utilisé sur la page de connexion, qui ne montre donc aucun échec.
- **Un succès sans aucun échec nulle part, depuis une IP inconnue** : le pirate avait déjà le mot de passe. Un mot de passe réutilisé ailleurs, un e-mail de phishing ou un logiciel espion sur l'ordinateur d'un rédacteur. C'est le scénario du [faux mail de renouvellement Zoho](/fr/20260831-faux-mail-renouvellement-zoho-358-dollars) : on ne devine rien, on demande.

## Piste 2 : un plugin malveillant envoyé par wp-admin

Une fois administrateur, le pirate n'a pas besoin de faille. WordPress lui offre un bouton : **Extensions > Ajouter > Téléverser une extension**. Il envoie un fichier ZIP, WordPress l'installe, et le code du pirate tourne sur le serveur. Ce téléversement passe par une adresse précise, et l'activation qui suit donne le nom du dossier du plugin :

```bash
zgrep -h -E 'update\.php\?action=upload-(plugin|theme)' ~/enquete/logs/*
zgrep -h 'plugins.php?action=activate' ~/enquete/logs/*
```

Une ligne `POST /wp-admin/update.php?action=upload-plugin` que personne de l'équipe n'a faite, c'est la deuxième marche. Cherchez aussi l'éditeur de fichiers intégré, que les pirates utilisent pour glisser du code dans un plugin ou un thème existant. L'enregistrement passe par `admin-ajax.php` et ne se distingue pas dans les logs, mais l'ouverture de l'éditeur, elle, laisse une trace :

```bash
zgrep -h -E 'plugin-editor\.php|theme-editor\.php' ~/enquete/logs/*
```

Puis trouvez les fichiers eux-mêmes. Le pirate peut maquiller la date de modification d'un fichier, mais pas sa date de changement de statut (`ctime`). Listez les fichiers PHP de `wp-content` du plus récent au plus ancien :

```bash
cd /var/www/monsite
find wp-content -name '*.php' -printf '%C+ %p\n' | sort -r | head -30
find wp-content/uploads -name '*.php'
```

La deuxième commande devrait ne rien renvoyer : le dossier des médias n'a aucune raison de contenir du PHP. Attention, un `chmod`, un `chown` ou une restauration remettent aussi le `ctime` à jour : faites cette recherche avant de toucher aux fichiers.

Côté logs, les requêtes vers un fichier PHP du plugin montrent quand il a servi, et depuis où :

```bash
zgrep -h '/wp-content/plugins/NOM-DU-PLUGIN/' ~/enquete/logs/*
```

Ne vous fiez pas au nom. Un plugin malveillant prend souvent un nom rassurant, proche d'une extension connue de cache, de sécurité ou de SEO. Un plugin que personne n'a installé est suspect, même s'il s'appelle « security ».

## Reconstituer la chronologie

Vous avez maintenant une ou deux adresses IP. Sortez tout ce qu'elles ont fait, dans l'ordre :

```bash
cd ~/enquete/logs
zgrep -h '^203\.0\.113\.45 ' $(ls -tr) > ~/enquete/chronologie.txt
```

`ls -tr` range les fichiers du plus ancien au plus récent, pour lire l'histoire de haut en bas. Le `^` et l'espace évitent d'attraper une autre IP qui commencerait pareil. Pour un mot de passe deviné suivi d'un plugin, l'histoire a cette forme : la recherche de l'identifiant, les essais de mot de passe, la connexion, le téléversement du plugin, puis les appels à son fichier PHP. Notez l'heure de chaque étape : elle vous dira quelle sauvegarde est antérieure à l'attaque.

Deux pièges. Les pirates changent souvent d'adresse IP entre deux étapes : si la piste s'arrête, cherchez par le comportement, le même navigateur (`User-Agent`) ou les requêtes vers le plugin malveillant. Et si le site est derrière Cloudflare ou un autre proxy, la première colonne peut être l'IP du proxy, pas celle du pirate, tant que le serveur n'est pas réglé pour noter l'adresse réelle.

Vérifiez aussi la base de données. Un pirate admin crée souvent un second compte administrateur, pour revenir si on change le mot de passe du premier :

```bash
wp user list --role=administrator --fields=ID,user_login,user_email,user_registered
```

Un compte créé le jour de l'attaque, avec une adresse que personne ne connaît : supprimez-le, après l'avoir noté.

## Si les logs ne montrent ni l'un ni l'autre

Pas de `302` suspect, pas de téléversement ? La porte est ailleurs. Les signatures les plus courantes :

| Porte d'entrée | Où regarder | Ce qu'on cherche |
|---|---|---|
| Faille dans un plugin | Journal d'accès | Des `POST` vers `admin-ajax.php` ou vers un fichier précis d'un plugin, sans connexion préalable |
| Accès FTP ou SSH volé | `/var/log/secure` (AlmaLinux), `/var/log/auth.log` ou `journalctl -u ssh` (Debian, Ubuntu), journal FTP du panneau | Une connexion réussie depuis une IP inconnue |
| Compte d'hébergement compromis | Historique de connexion du panneau | Une session ouverte que vous n'avez pas ouverte |
| Site voisin infecté | Les autres sites du même compte | Le même fichier malveillant, plus ancien, ailleurs |

Pour la première piste, WP-CLI compare les fichiers de WordPress et des plugins du dépôt officiel avec les originaux. Tout fichier modifié ou ajouté ressort :

```bash
wp core verify-checksums
wp plugin verify-checksums --all
```

Un plugin dont WP-CLI ne trouve pas les sommes de contrôle n'est pas sur le dépôt officiel. Si c'est un plugin payant ou maison, comparez-le à la main avec une copie téléchargée chez l'éditeur. Si personne ne sait d'où il vient, vous tenez peut-être le coupable.

## Fermer la porte

Trouver l'entrée ne sert à rien si on la laisse ouverte. Pour un mot de passe deviné et un plugin envoyé par wp-admin, le minimum :

- **Des mots de passe longs et uniques** pour chaque compte administrateur, et la double authentification.
- **Moins d'administrateurs.** Un rédacteur n'a pas besoin du rôle Administrateur pour publier.
- **Plus d'installation de plugins depuis l'administration**, en ajoutant cette ligne dans `wp-config.php` : elle désactive l'éditeur de fichiers, le téléversement, l'installation et la mise à jour des plugins et des thèmes.

```php
define( 'DISALLOW_FILE_MODS', true );
```

Le revers : les mises à jour automatiques, y compris de sécurité, s'arrêtent aussi. Elles se font alors en SSH (`wp core update`, `wp plugin update --all`) ou par déploiement. À ne choisir que si quelqu'un s'en charge vraiment.

- **Limiter les tentatives de connexion**, et bloquer `xmlrpc.php` si aucun service ne s'en sert (application mobile, Jetpack).

Ces réglages ne valent que si on a d'abord vérifié qu'il ne reste rien : un plugin oublié, un second compte admin ou un script qui recrée la porte dérobée. Ce sera l'objet d'un prochain billet.

## Ce que j'en retiens

Sur le site d'août, il n'y avait ni faille inconnue ni pirate de génie. Le mot de passe administrateur a été deviné, et WordPress a fait le reste : il propose à tout administrateur d'installer du code sur le serveur en trois clics. Les logs racontaient toute l'histoire, à condition de les lire avant de tout effacer.

Ces robots ne visent personne en particulier. Ils essaient les mêmes adresses sur tous les sites, y compris ceux qui ne tournent plus sous WordPress. Ce blog l'a quitté [il y a deux ans](/fr/20261018-migration-wordpress-nuxt-referencement-perdu-recupere), et les robots cherchent toujours son `wp-login.php` : je l'ai raconté dans [J'ai récupéré le trafic de mon blog (et les bots qui vont avec)](/fr/20260922-jai-recupere-le-trafic-de-mon-blog-et-les-bots-qui-vont-avec). Votre site n'est pas trop petit pour être piraté. Il est juste sur la liste, comme tous les autres.

---

*Image : la trace d'un mot de passe deviné puis d'un plugin téléversé, dans un journal d'accès. Exemple : heures, nombre d'essais et nom du plugin fictifs.*

---
*[Jean-Luc Houédanou](https://houedanou.com) — lecteur de logs, de préférence avant le grand ménage*
