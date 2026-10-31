---
title: "Redis plein sur un VPS WordPress : le vider et le limiter"
createdAt: "2026-10-31T19:30:00Z"
description: "Redis prend toute la RAM de votre VPS WordPress ? Videz-le, puis limitez-le avec maxmemory et allkeys-lru. Les commandes, et pourquoi il grossit."
searchIntent: "Comment vider et limiter Redis quand sa mémoire est pleine sur un VPS WordPress (cache objet), avec maxmemory et allkeys-lru ?"
tags: ["tutoriel", "linux", "sysadmin", "wordpress", "dev"]
---

**Réponse courte.** Par défaut, Redis n'a aucune limite de mémoire et n'efface rien. Sur un VPS WordPress, le cache objet le remplit jusqu'à prendre toute la RAM. La solution tient en deux réglages : `maxmemory`, pour fixer une limite, et `maxmemory-policy allkeys-lru`, pour que Redis efface les clés les moins utilisées quand il atteint cette limite. Pour récupérer la mémoire tout de suite, videz-le avec `FLUSHALL ASYNC`.

## Ce qui m'est arrivé

Sur un de mes VPS WordPress, Redis avait grossi jusqu'à **10,7 Go**, avec **39 millions de clés**. Pour un simple cache, c'est énorme. Je l'ai réglé avec deux lignes : `maxmemory` et `allkeys-lru`.

## Pourquoi Redis grossit sans fin

Trois choses se cumulent :

- **Pas de limite par défaut.** Sur un système 64 bits, `maxmemory` vaut 0 : Redis peut prendre toute la mémoire du serveur.
- **Rien n'est effacé.** La politique par défaut s'appelle `noeviction`. Quand il n'y a plus de place, Redis refuse les nouvelles écritures au lieu d'effacer des clés.
- **Les clés de WordPress n'expirent pas.** WordPress range dans Redis le résultat de ses requêtes. Beaucoup de ces clés n'ont pas de date d'expiration. Avec l'extension Redis Object Cache, aucune durée maximale n'est fixée par défaut (`WP_REDIS_MAXTTL` vaut 0).

Résultat : chaque page, chaque recherche, chaque passage de robot ajoute des clés, et aucune ne part.

Quand la RAM est pleine, le serveur ralentit. Puis Linux arrête des programmes pour libérer de la mémoire : parfois MySQL, parfois Redis lui-même. Et si une limite existe mais sans politique pour effacer, WordPress reçoit l'erreur `OOM command not allowed when used memory > 'maxmemory'`.

## 1. Mesurer

Connectez-vous en SSH au serveur, puis :

```bash
redis-cli INFO memory | grep -E "used_memory_human|maxmemory_human|maxmemory_policy"
redis-cli INFO keyspace
free -h
```

- `used_memory_human` : la mémoire prise par Redis.
- `maxmemory_human` : la limite. `0B` veut dire « aucune limite ».
- `maxmemory_policy` : ce que Redis fait quand il est plein.
- `INFO keyspace` donne, pour chaque base, le nombre de clés (`keys=`) et combien ont une date d'expiration (`expires=`).

Si Redis répond `NOAUTH`, il est protégé par un mot de passe : ajoutez `-a 'votre_mot_de_passe'` après `redis-cli`.

## 2. Vider

Ici, Redis ne sert que de cache : WordPress peut recalculer tout ce qu'il contient. Le vider ne casse rien. Le site est juste un peu plus lent, le temps que le cache se remplisse à nouveau.

**Attention :** vérifiez d'abord que Redis ne sert qu'à ça. S'il garde aussi les sessions ou les files d'attente d'une autre application du serveur, elles seront effacées elles aussi.

```bash
redis-cli FLUSHALL ASYNC
```

`FLUSHALL` vide toutes les bases de Redis. `ASYNC` libère la mémoire en arrière-plan : même avec des millions de clés, Redis continue de répondre pendant le nettoyage. Cette option existe depuis Redis 4.0.

Pour ne vider qu'une base, celle du site (souvent la base 0) :

```bash
redis-cli -n 0 FLUSHDB ASYNC
```

Vider ne règle rien à long terme : sans limite, Redis regrossira. D'où l'étape suivante.

## 3. Limiter

Ouvrez la configuration de Redis (sur Debian et Ubuntu : `/etc/redis/redis.conf`). Ajoutez ces deux lignes, ou retirez le `#` devant si elles y sont déjà :

```
maxmemory 512mb
maxmemory-policy allkeys-lru
```

Puis redémarrez Redis :

```bash
sudo systemctl restart redis-server
```

Vous pouvez aussi appliquer le réglage sans redémarrer, puis l'enregistrer dans le fichier :

```bash
redis-cli CONFIG SET maxmemory 512mb
redis-cli CONFIG SET maxmemory-policy allkeys-lru
redis-cli CONFIG REWRITE
```

`CONFIG REWRITE` écrit les réglages dans `redis.conf`. Sans lui, ils disparaissent au prochain redémarrage.

**Quelle limite choisir ?** Il n'y a pas de chiffre magique. 512 Mo n'est qu'un exemple. Laissez assez de RAM à MySQL et à PHP, partez d'une valeur modeste, puis ajustez avec l'étape 4.

**Pourquoi `allkeys-lru` ?** LRU veut dire *least recently used* : la clé utilisée le moins récemment. Quand Redis atteint la limite, il efface les clés que personne n'a lues depuis longtemps. Les pages populaires restent en cache. La [documentation de Redis](https://redis.io/docs/latest/develop/reference/eviction/){target="_blank" rel="noopener"} présente `allkeys-lru` comme un bon choix par défaut.

N'utilisez pas `volatile-lru` : il n'efface que les clés qui ont une date d'expiration. Avec WordPress, la plupart n'en ont pas. Redis se comporterait alors comme avec `noeviction`, et refuserait les écritures.

## 4. Vérifier

Quelques jours plus tard :

```bash
redis-cli INFO memory | grep used_memory_human
redis-cli INFO stats | grep -E "keyspace_hits|keyspace_misses|evicted_keys"
```

- `used_memory_human` doit rester sous la limite.
- `evicted_keys` compte les clés effacées pour faire de la place.
- Le taux de réussite du cache se calcule ainsi : `keyspace_hits` ÷ (`keyspace_hits` + `keyspace_misses`). S'il baisse beaucoup et que `evicted_keys` grimpe vite, la limite est trop basse : augmentez-la.

## 5. En option : une durée de vie pour les clés

Avec l'extension Redis Object Cache, ajoutez cette ligne dans `wp-config.php` :

```php
define( 'WP_REDIS_MAXTTL', 86400 ); // 24 heures au plus
```

Les clés sans date d'expiration expirent alors au bout de 24 heures. Redis grossit moins vite. Gardez quand même la limite de l'étape 3 : c'est elle qui protège le serveur.

Si plusieurs sites WordPress partagent le même Redis, donnez à chacun son préfixe avec `WP_REDIS_PREFIX`, pour que leurs clés ne se mélangent pas.

## En résumé

- Par défaut, Redis n'a ni limite de mémoire, ni règle pour effacer.
- `redis-cli FLUSHALL ASYNC` le vide sans le bloquer.
- `maxmemory` et `allkeys-lru` règlent le problème pour de bon.
- `CONFIG REWRITE`, ou une modification de `redis.conf`, garde le réglage après un redémarrage.

Tant que vous êtes en SSH sur le serveur, vérifiez aussi que PHP est à jour : voyez [PHP2Shell](/fr/20261021-php2shell-mettre-a-jour-php-debian-ubuntu-sans-forge).

**Sources :**

- [Key eviction](https://redis.io/docs/latest/develop/reference/eviction/){target="_blank" rel="noopener"}, documentation de Redis (`maxmemory`, politiques d'éviction, `INFO stats`)
- [FLUSHALL](https://redis.io/docs/latest/commands/flushall/){target="_blank" rel="noopener"}, documentation de Redis
- [Fichier redis.conf d'exemple](https://github.com/redis/redis/blob/7.0/redis.conf){target="_blank" rel="noopener"} : `noeviction` par défaut
- [README de Redis Object Cache](https://github.com/rhubarbgroup/redis-cache){target="_blank" rel="noopener"} : `WP_REDIS_MAXTTL` et `WP_REDIS_PREFIX`

---
*[Jean-Luc Houédanou](https://houedanou.com)*
