---
title: "Redis full on a WordPress VPS: empty it and cap it"
createdAt: "2026-10-31T19:30:00Z"
description: "Redis eating all the RAM on your WordPress VPS? Empty it, then cap it with maxmemory and allkeys-lru. The commands, and why it keeps growing."
searchIntent: "How do I empty and limit Redis when its memory is full on a WordPress VPS (object cache), with maxmemory and allkeys-lru?"
tags: ["tutorial", "linux", "sysadmin", "wordpress", "development"]
---

**Short answer.** By default, Redis has no memory limit and deletes nothing. On a WordPress VPS, the object cache fills it until it takes all the RAM. The fix is two settings: `maxmemory`, to set a limit, and `maxmemory-policy allkeys-lru`, so that Redis deletes the least used keys when it reaches that limit. To get the memory back right away, empty it with `FLUSHALL ASYNC`.

## What happened to me

On one of my WordPress VPSes, Redis had grown to **10.7 GB**, with **39 million keys**. For a simple cache, that is huge. I fixed it with two lines: `maxmemory` and `allkeys-lru`.

## Why Redis keeps growing

Three things add up:

- **No limit by default.** On a 64-bit system, `maxmemory` is 0: Redis can take all of the server's memory.
- **Nothing gets deleted.** The default policy is called `noeviction`. When there is no room left, Redis refuses new writes instead of deleting keys.
- **WordPress keys do not expire.** WordPress stores the results of its queries in Redis. Many of these keys have no expiry date. With the Redis Object Cache plugin, no maximum lifetime is set by default (`WP_REDIS_MAXTTL` is 0).

The result: every page, every search, every bot visit adds keys, and none go away.

When the RAM is full, the server slows down. Then Linux stops programs to free memory: sometimes MySQL, sometimes Redis itself. And if a limit exists but with no policy to delete keys, WordPress gets the error `OOM command not allowed when used memory > 'maxmemory'`.

## 1. Measure

SSH into the server, then:

```bash
redis-cli INFO memory | grep -E "used_memory_human|maxmemory_human|maxmemory_policy"
redis-cli INFO keyspace
free -h
```

- `used_memory_human`: the memory Redis uses.
- `maxmemory_human`: the limit. `0B` means "no limit".
- `maxmemory_policy`: what Redis does when it is full.
- `INFO keyspace` gives, for each database, the number of keys (`keys=`) and how many have an expiry date (`expires=`).

If Redis answers `NOAUTH`, it is password-protected: add `-a 'your_password'` after `redis-cli`.

## 2. Empty it

Here, Redis is only a cache: WordPress can rebuild everything in it. Emptying it breaks nothing. The site is just a bit slower while the cache fills up again.

**Careful:** first check that Redis is only used for that. If it also holds sessions or queues for another app on the server, those will be wiped too.

```bash
redis-cli FLUSHALL ASYNC
```

`FLUSHALL` empties every Redis database. `ASYNC` frees the memory in the background: even with millions of keys, Redis keeps answering during the cleanup. This option exists since Redis 4.0.

To empty only one database, the site's (often database 0):

```bash
redis-cli -n 0 FLUSHDB ASYNC
```

Emptying fixes nothing in the long run: without a limit, Redis will grow again. Hence the next step.

## 3. Cap it

Open the Redis configuration (on Debian and Ubuntu: `/etc/redis/redis.conf`). Add these two lines, or remove the `#` in front if they are already there:

```
maxmemory 512mb
maxmemory-policy allkeys-lru
```

Then restart Redis:

```bash
sudo systemctl restart redis-server
```

You can also apply the setting without a restart, then save it to the file:

```bash
redis-cli CONFIG SET maxmemory 512mb
redis-cli CONFIG SET maxmemory-policy allkeys-lru
redis-cli CONFIG REWRITE
```

`CONFIG REWRITE` writes the settings to `redis.conf`. Without it, they are lost at the next restart.

**Which limit?** There is no magic number. 512 MB is only an example. Leave enough RAM for MySQL and PHP, start with a modest value, then adjust with step 4.

**Why `allkeys-lru`?** LRU means *least recently used*. When Redis reaches the limit, it deletes the keys nobody has read for a long time. Popular pages stay cached. The [Redis documentation](https://redis.io/docs/latest/develop/reference/eviction/){target="_blank" rel="noopener"} calls `allkeys-lru` a good default choice.

Do not use `volatile-lru`: it only deletes keys that have an expiry date. With WordPress, most have none. Redis would then behave as with `noeviction`, and refuse writes.

## 4. Check

A few days later:

```bash
redis-cli INFO memory | grep used_memory_human
redis-cli INFO stats | grep -E "keyspace_hits|keyspace_misses|evicted_keys"
```

- `used_memory_human` should stay under the limit.
- `evicted_keys` counts the keys deleted to make room.
- The cache hit rate is: `keyspace_hits` ÷ (`keyspace_hits` + `keyspace_misses`). If it drops a lot while `evicted_keys` climbs fast, the limit is too low: raise it.

## 5. Optional: a lifetime for keys

With the Redis Object Cache plugin, add this line to `wp-config.php`:

```php
define( 'WP_REDIS_MAXTTL', 86400 ); // 24 hours at most
```

Keys with no expiry date then expire after 24 hours. Redis grows more slowly. Keep the limit from step 3 anyway: that is what protects the server.

If several WordPress sites share the same Redis, give each one its own prefix with `WP_REDIS_PREFIX`, so their keys do not mix.

## In short

- By default, Redis has neither a memory limit nor a rule to delete keys.
- `redis-cli FLUSHALL ASYNC` empties it without blocking it.
- `maxmemory` and `allkeys-lru` fix the problem for good.
- `CONFIG REWRITE`, or an edit to `redis.conf`, keeps the setting after a restart.

While you are on the server over SSH, also check that PHP is up to date: see [PHP2Shell](/en/20261021-php2shell-mettre-a-jour-php-debian-ubuntu-sans-forge).

**Sources:**

- [Key eviction](https://redis.io/docs/latest/develop/reference/eviction/){target="_blank" rel="noopener"}, Redis documentation (`maxmemory`, eviction policies, `INFO stats`)
- [FLUSHALL](https://redis.io/docs/latest/commands/flushall/){target="_blank" rel="noopener"}, Redis documentation
- [Example redis.conf file](https://github.com/redis/redis/blob/7.0/redis.conf){target="_blank" rel="noopener"}: `noeviction` by default
- [Redis Object Cache README](https://github.com/rhubarbgroup/redis-cache){target="_blank" rel="noopener"}: `WP_REDIS_MAXTTL` and `WP_REDIS_PREFIX`

---
*[Jean-Luc Houédanou](https://houedanou.com)*
