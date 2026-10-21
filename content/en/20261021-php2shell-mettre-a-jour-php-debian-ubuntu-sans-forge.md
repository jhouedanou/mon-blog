---
title: "PHP2Shell: updating PHP on Debian and Ubuntu when Forge goes quiet"
createdAt: "2026-10-21T21:30:00Z"
image: "/images/articles/pexels-panumas-nikhomkhai-1148820.webp"
description: "PHP2Shell: two critical PHP flaws, already exploited. Forge not answering? Here is the command to update PHP over SSH on Debian and Ubuntu servers."
searchIntent: "How do I fix PHP2Shell (CVE-2026-109618, CVE-2026-109619) and update PHP-FPM over SSH on a Debian or Ubuntu server, including Laravel Forge servers?"
tags: ["tutorial", "security", "php", "linux", "development"]
---

**Short answer.** Two PHP flaws, nicknamed PHP2Shell, let an attacker take over a web server with a single request and no password. They were fixed on Wednesday, October 21, in PHP 8.5.12, 8.4.27, 8.3.36 and 8.2.35, and they are already being exploited. On a Laravel Forge server, automatic updates don't touch PHP: you have to do it yourself. With Forge gone quiet, here is the way through, over SSH, with the command I'm running on my servers.

## What PHP2Shell is

Two vulnerabilities, both rated 9.2 out of 10 (CVSS 4.0):

- **CVE-2026-109618**: when PHP runs out of memory at the wrong moment, it can leave a request half initialized, then clean it up as if it were valid.
- **CVE-2026-109619**: data from one request survives after being freed, and the next request handled by the same process reuses it.

In plain terms: an attacker sends a crafted request and runs their own code on the server, before your application even starts. No account needed, no vulnerable plugin needed. According to [Help Net Security](https://www.helpnetsecurity.com/2026/10/21/php2shell-php-vulnerabilities-patched-cve-2026-109618-cve-2026-109619/){target="_blank" rel="noopener"}, every PHP installation serving web pages is affected: PHP-FPM, Apache with mod_php, php-cgi, FrankenPHP, LiteSpeed. [watchTowr](https://watchtowr.com/intelligence/php-remote-code-execution-php2shell/){target="_blank" rel="noopener"} reports exploitation in the wild, Cloudflare saw attempts before the fix was even out, and the US agency [CISA](https://www.cisa.gov/news-events/alerts/2026/10/21/critical-vulnerabilities-php-require-immediate-patching){target="_blank" rel="noopener"} is asking everyone to patch immediately.

The fixed versions, according to [the PHP project's announcement](https://www.php.net/archive/2026.php){target="_blank" rel="noopener"}:

| Branch | Fixed version |
|---|---|
| PHP 8.5 | 8.5.12 |
| PHP 8.4 | 8.4.27 |
| PHP 8.3 | 8.3.36 |
| PHP 8.2 | 8.2.35 |
| PHP 8.1 and older | No official release: end of life |

For PHP 8.1 and older, the PHP project published source patches to build yourself, and some distributions ship them. The real fix is still moving to a supported version. And PHP 8.2 loses security support on December 31, 2026.

## Why your Forge server isn't up to date

You might think a server with Ubuntu's automatic updates is covered. It isn't. Forge installs PHP from Ondřej Surý's packages, not from Ubuntu, and `unattended-upgrades` only applies Ubuntu's own security updates. [Forge's advisory](https://laravel.com/forge/docs/knowledge-base/php-security-release-october-2026){target="_blank" rel="noopener"} says so plainly: you have to update PHP yourself, server by server, version by version.

Forge recommends its dashboard: PHP tab, "Update PHP" button. The upside is that it also repairs the package source along the way. Except tonight, Forge has gone quiet. That leaves SSH.

## The command, over SSH

Log in as root (`sudo -i`) and paste this block. It runs on Ubuntu and Debian with Nginx and PHP-FPM (how Forge sets servers up) or with Apache, using PHP-FPM or mod_php. It's not for LiteSpeed: see further down.

```bash
FIXED="8.5.12 8.4.27 8.3.36 8.2.35"
export DEBIAN_FRONTEND=noninteractive NEEDRESTART_MODE=a LC_ALL=C
echo "=== $(hostname) – $(lsb_release -ds 2>/dev/null)"
WEB=""; for w in nginx apache2 lsws; do systemctl is-active --quiet $w && WEB="$WEB $w"; done
echo "Web server:${WEB:- none detected}"
MODPHP=$(ls /etc/apache2/mods-enabled/ 2>/dev/null | grep -oE '^php[0-9.]+\.load' | grep -oE '[0-9]+\.[0-9]+')
[ -n "$MODPHP" ] && echo "⚠️ Apache mod_php enabled (PHP $MODPHP) – highest risk according to PHP"
echo "$WEB" | grep -q lsws && echo "⚠️ LiteSpeed detected: PHP comes from lsphp packages, use the LiteSpeed procedure"
for f in $(grep -l 'launchpad.*ondrej/php' /etc/apt/sources.list.d/* 2>/dev/null); do cp "$f" /root/$(basename "$f").bak; sed -i 's#https\?://ppa\.launchpad\(content\)\?\.net/ondrej/php/ubuntu#https://ppa.setup-php.com/ondrej/php/ubuntu#' "$f"; echo "Package source switched: $f"; done
apt-get update 2>&1 | grep -iE 'err.*php|gpg|no_pubkey'
for v in $(ls /etc/php); do
  C=$(apt-cache policy php$v-common | awk '/Candidate/ {print $2}' | cut -d- -f1)
  if [ -n "$C" ] && echo "$FIXED" | grep -qwF "$C"; then
    echo "PHP $v: installing $C..."
    apt-get install -qq --only-upgrade -y -o Dpkg::Options::="--force-confold" $(dpkg -l "php$v*" "libapache2-mod-php$v*" 2>/dev/null | awk '/^ii/ {print $2}') >/dev/null
  else
    echo "PHP $v: ⚠️ NO PATCH AVAILABLE (installed: $(dpkg-query -W -f='${Version}' php$v-common 2>/dev/null), candidate: $(apt-cache policy php$v-common | awk '/Candidate/ {print $2}')) – temporary mitigation only"
  fi
done
sed -i 's/^;\?session.upload_progress.enabled.*/session.upload_progress.enabled = 0/' /etc/php/*/fpm/php.ini /etc/php/*/apache2/php.ini /etc/php/*/cgi/php.ini 2>/dev/null
for s in $(systemctl list-units --type=service --no-legend --plain 'php*-fpm*' | awk '{print $1}'); do systemctl restart "$s"; done
echo "$WEB" | grep -q apache2 && systemctl restart apache2
for a in $(ls /home/*/*/artisan /home/*/*/current/artisan 2>/dev/null); do sudo -u $(stat -c %U $a) php $a queue:restart >/dev/null 2>&1; done
echo "=== RESULT"
grep -H '^session.upload_progress.enabled' /etc/php/*/fpm/php.ini /etc/php/*/apache2/php.ini 2>/dev/null | sed 's#^/etc/php/#MITIGATION #'
FPMV=$(grep -rhoE 'php[0-9.]+-fpm' /etc/nginx/ /etc/apache2/ 2>/dev/null | grep -oE '[0-9]+\.[0-9]+' | sort -u)
[ -z "$FPMV$MODPHP" ] && echo "No website uses PHP: PHP is not exposed to the web on this server"
chk(){ if [ -n "$2" ] && echo "$FIXED" | grep -qwF "$2"; then echo "PHP VERSION ($1): $2 ✅ patched"; else echo "PHP VERSION ($1): $2 ❌ NOT patched"; fi; }
for v in $FPMV; do chk "php-fpm $v" "$(/usr/sbin/php-fpm$v -v 2>/dev/null | head -1 | awk '{print $2}')"; done
for v in $MODPHP; do chk "mod_php $v" "$(dpkg-query -W -f='${Version}' libapache2-mod-php$v 2>/dev/null | cut -d- -f1)"; done
DOMS=$( { grep -RhE '^\s*server_name\s' /etc/nginx/sites-enabled/ /etc/nginx/conf.d/ 2>/dev/null | sed -E 's/^\s*server_name\s+//;s/;.*//'; grep -RhiE '^\s*(ServerName|ServerAlias)\s' /etc/apache2/sites-enabled/ 2>/dev/null | sed -E 's/^\s*\S+\s+//'; } | tr -s ' \t' '\n' | sed 's/:.*//' | grep -vE '^$|^_$|^localhost$|^[0-9.]+$|default|\*' | sort -u)
for d in $DOMS; do echo "DOMAIN: $d → HTTP $(curl -s -o /dev/null -m 10 -w '%{http_code}' https://$d)"; done
echo "DATE: $(date -u '+%d %b %Y, %H:%M') (UTC)"
```

Expect a few seconds of downtime per PHP version while PHP-FPM restarts. If you can pick the time, pick the one with the fewest visitors.

What you should see in the result:

- `MITIGATION`: `session.upload_progress.enabled = 0` for each file (fpm and/or apache2).
- `✅` for each version in use (php-fpm or mod_php).
- HTTP `200`, `301` or `302` for each domain.
- "LiteSpeed detected": this script isn't the right one, use the lsphp procedure (further down).

## What the command does, step by step

**1. It identifies the web server.** Nginx, Apache or LiteSpeed: it prints the ones running. It also flags mod_php, the riskiest case according to PHP, because the attack lands before any application code runs, inside Apache's own process. And it warns you if LiteSpeed is running: its PHP comes from other packages, which this script doesn't touch.

**2. It repairs the package source.** Older Forge servers still point at Launchpad, the original home of the `ondrej/php` repository. Forge now uses `ppa.setup-php.com`, a mirror of that repository. The `for f in …` loop swaps one for the other, after copying the original file to `/root/` (`.bak`). That's the step Forge's button does for you, and the one people forget over SSH.

**3. It checks the fix is actually there.** `apt-get update` only shows errors about PHP or GPG keys. Then, for each installed version (`ls /etc/php`), `apt-cache policy` gives the version you are about to receive. If it isn't in the `FIXED` list, the command installs nothing and says so, showing the installed and candidate versions. That's on purpose: tonight, some packages hadn't reached the mirrors yet, especially on ARM servers (8.4 and 8.5 on arm64, according to [the mirror's maintainer](https://github.com/shivammathur/setup-php/issues/1139){target="_blank" rel="noopener"}).

**4. It upgrades every package for that version.** `--only-upgrade` installs nothing new, `--force-confold` keeps your `php.ini` and PHP-FPM pools as they are. The Apache module (`libapache2-mod-php`) is upgraded along with the rest. The variables at the top stop apt and `needrestart` from pausing to ask questions. `LC_ALL=C` forces apt to answer in English: on a server set to French, it prints "Candidat" instead of "Candidate", and the command wouldn't find any version.

**5. It turns off one PHP feature as a precaution.** `session.upload_progress.enabled = 0` is one of the temporary mitigations recommended by PHP and relayed by the [Dutch NCSC](https://github.com/NCSC-NL/php2shell){target="_blank" rel="noopener"}. It's a safety net for versions not yet fixed. The downside: upload progress bars built on that feature stop working. If your site has none, leave it off. The command turns it off in the PHP-FPM, Apache and CGI `php.ini` files.

**6. It restarts PHP-FPM, Apache and Laravel queues.** Until a process restarts, it keeps the old PHP in memory. The command restarts every `php*-fpm` service, then Apache if it's running (a real `restart`: with mod_php, a `reload` isn't enough), then runs `php artisan queue:restart` for each Laravel app found under `/home`, as the user who owns it. If you use Horizon, Reverb or Octane, restart those too: `php artisan horizon:terminate`, `php artisan reverb:restart`, and for Octane, a full restart of its Supervisor program (`octane:reload` isn't enough).

**7. It reports back.** First the step 5 mitigation line, file by file. Then, for each PHP version Nginx or Apache uses, the installed PHP-FPM or mod_php version, with ✅ or ❌. If no site uses PHP, it says so: PHP isn't exposed to the web on that server. Finally, it calls every domain declared in the Nginx (`server_name`) and Apache (`ServerName`, `ServerAlias`) configuration and prints the HTTP code: `200`, `301` or `302`, the site is answering; `502`, PHP-FPM isn't running, go and look; `000`, no answer at all (a domain no longer pointing at this server, a missing certificate).

## Several Forge servers: the API and Termius

With one or two servers, you log in, paste the command, done. With a whole fleet, you first need to know which site runs on which PHP, then check everywhere. I do it in two steps: Forge's API for the inventory and the update, [Termius](https://termius.com/){target="_blank" rel="noopener"} to check over SSH on every server at once.

### The inventory with the Forge API

You need a token: in Forge, profile menu, **API**, then *Create token*. Read access is enough for the inventory. To trigger the update through the API, you also need server management access. The new API is scoped by organisation (`https://forge.laravel.com/api/orgs/{org}/…`). The useful endpoints, according to [its OpenAPI specification](https://forge.laravel.com/api/docs.openapi){target="_blank" rel="noopener"}:

| Request | What it returns |
|---|---|
| `GET /orgs` | Each organisation's `slug` |
| `GET /orgs/{org}/servers` | IP, SSH port, Ubuntu version, default PHP for sites and for the command line |
| `GET /orgs/{org}/servers/{id}/sites` | Each site, with its `php_version` |
| `GET /orgs/{org}/servers/{id}/php/versions` | Installed PHP versions, with their ID |
| `PUT /orgs/{org}/servers/{id}/php/versions/{php_id}` | Updates that version to the latest patch: the "Update PHP" button, without the dashboard |

This small Python script goes through everything without changing anything. It only needs Python, already there on macOS and Linux:

```python
#!/usr/bin/env python3
# PHP inventory of every Forge server (read-only).
# FORGE_TOKEN=... python3 forge-php.py         → servers, PHP versions, sites
# FORGE_TOKEN=... python3 forge-php.py --ssh   → ~/.ssh/config blocks for Termius
import json, os, sys, urllib.request

API = "https://forge.laravel.com/api"
TOKEN = os.environ["FORGE_TOKEN"]

def get(path):
    """Paginated GET: returns every item in data[]."""
    items, url = [], f"{API}{path}?page[size]=100"
    while url:
        req = urllib.request.Request(url, headers={"Authorization": f"Bearer {TOKEN}", "Accept": "application/json"})
        with urllib.request.urlopen(req) as r:
            body = json.load(r)
        items += body.get("data", [])
        nxt = (body.get("links") or {}).get("next")
        url = (nxt if nxt.startswith("http") else "https://forge.laravel.com" + nxt) if nxt else None
    return items

for org in get("/orgs"):
    slug = org["attributes"]["slug"]
    for srv in get(f"/orgs/{slug}/servers"):
        a, sid = srv["attributes"], srv["id"]
        if "--ssh" in sys.argv:
            print(f"Host {a['name']}\n  HostName {a['ip_address']}\n  Port {a['ssh_port']}\n  User forge\n")
            continue
        php = get(f"/orgs/{slug}/servers/{sid}/php/versions")
        print(f"\n■ {a['name']}  {a['ip_address']}  Ubuntu {a['ubuntu_version']}  [org {slug}, server {sid}]")
        print("  Installed PHP: " + ", ".join(f"{p['attributes']['version']} (id {p['id']})" for p in php))
        for site in get(f"/orgs/{slug}/servers/{sid}/sites"):
            print(f"  - {site['attributes']['name']:<40} {site['attributes'].get('php_version')}")
```

One limit: the API gives the branch (`php83`), not the patch number. It tells you a site runs PHP 8.3, not whether it's 8.3.35 or 8.3.36. For that, you have to look on the server.

### Checking everywhere with Termius

The same script, run with `--ssh`, writes one SSH entry per server:

```bash
FORGE_TOKEN=your_token python3 forge-php.py --ssh >> ~/.ssh/config
```

In Termius: **Hosts**, the **New Host** menu, **Import**, then **~/.ssh** ([documentation](https://docs.termius.com/getting-started/import-existing-hosts/){target="_blank" rel="noopener"}). Every server comes in at once. The user is `forge`: your SSH key must be in Termius and added in Forge for that account.

Then **Vault**, **Snippets**, **New Snippet**, and this script. It doesn't need root:

```bash
FIXED="8.5.12 8.4.27 8.3.36 8.2.35"
for f in /etc/nginx/sites-enabled/*; do
  v=$(grep -ohE 'php[0-9.]+-fpm' "$f" | head -1 | grep -oE '[0-9]+\.[0-9]+'); [ -z "$v" ] && continue
  r=$(/usr/sbin/php-fpm$v -v 2>/dev/null | head -1 | awk '{print $2}')
  echo "$FIXED" | grep -qwF "$r" && e="✅" || e="❌"
  echo "$(hostname) | $(basename "$f") | PHP $r $e"
done
```

Open the snippet, tick every server and click **Run**: Termius opens one tab per server and runs the script there ([snippets documentation](https://docs.termius.com/terminal/snippets.md){target="_blank" rel="noopener"}). **Save targets** keeps the selection for next time. Each site comes out on one line: server, site, actual PHP-FPM version, ✅ or ❌.

### Fixing the ❌

The simplest way goes through the API, with no SSH and no password. The version ID (`php_id`) is the one the inventory prints:

```bash
curl -X PUT -H "Authorization: Bearer $FORGE_TOKEN" -H "Accept: application/json" \
  https://forge.laravel.com/api/orgs/ORG/servers/SERVER/php/versions/PHP_ID
```

Forge answers straight away (`202`) and runs the update right after. Wait a minute, then run the Termius snippet again. To run this post's big command through Termius instead, you need root: as the `forge` user, `sudo -i` asks for the server's sudo password, the one Forge shows when the server is created, different on each server. Across a whole fleet, the API is simpler.

Either way, queues don't restart on their own: one last snippet with `php artisan queue:restart` (and `horizon:terminate` with Horizon) in each application.

## Without Forge: Debian and Ubuntu

On Debian with the distribution's own PHP, it's simpler: fixes come through Debian's security repository, like everything else. According to [Mattias Geniar's summary](https://ma.ttias.be/php-cve-2026-109618-patch/){target="_blank" rel="noopener"}, the fixed packages are `8.4.27-1~deb13u1` for Debian 13 and `8.2.35-1~deb12u1` for Debian 12.

```bash
sudo apt-get update
apt-cache policy php8.4-fpm      # or php8.2-fpm on Debian 12
sudo apt-get install --only-upgrade $(dpkg -l 'php8.4*' 'libapache2-mod-php8.4' 2>/dev/null | awk '/^ii/ {print $2}')
sudo systemctl restart php8.4-fpm
```

If `unattended-upgrades` is on, it may already have installed the fix. Check the version anyway, and check that PHP-FPM restarted. With Apache and mod_php, it's `sudo systemctl restart apache2`: a plain `reload` isn't enough.

If you use the `packages.sury.org` repository (several PHP versions on Debian), the command from the start works as is: it only touches Launchpad sources and compares the candidate version against the list. There too, tonight, arm64 packages were lagging.

One trap on **Ubuntu without Forge**, with Ubuntu's own PHP: the distribution backports the fix to its old version without changing the number. PHP 8.3 fixed on Ubuntu 24.04 is `8.3.6-0ubuntu0.24.04.13`, and `php -v` still says 8.3.6. The command from the start doesn't recognise that as a fixed version: it installs nothing and prints "NO PATCH AVAILABLE". On those servers, use the Debian method just above (replacing `8.4` with `8.3`), then check the package changelog to confirm the fix is there:

```bash
zgrep -E 'CVE-2026-10961[89]' /usr/share/doc/php8.3-fpm/changelog.Debian.gz
```

### With LiteSpeed or CyberPanel

OpenLiteSpeed and LiteSpeed use neither PHP-FPM nor mod_php, but their own packages, `lsphp` (for example `lsphp83`), installed under `/usr/local/lsws/`. That's the case with CyberPanel, which I run on a Hostinger VPS under AlmaLinux (I covered it in [my move from cPanel to CyberPanel](/en/20260327-cpanel-cyberpanel-migration)). The command from the start doesn't see them. The procedure:

```bash
# AlmaLinux, Rocky
sudo dnf upgrade 'lsphp*'
# Ubuntu, Debian
sudo apt-get install --only-upgrade $(dpkg -l 'lsphp*' | awk '/^ii/ {print $2}')
# then, in both cases
sudo pkill lsphp
/usr/local/lsws/lsphp83/bin/php -v
```

`pkill lsphp` stops the PHP processes: LiteSpeed starts them again on the next visit, with the new version. Check that it appears in the fixed versions table: if the package isn't out yet, the `session.upload_progress` mitigation goes in each `lsphp`'s `php.ini` (`/usr/local/lsws/lsphp83/etc/php/8.3/litespeed/php.ini` on Ubuntu, for example).

One last case: FrankenPHP bundles its own PHP, which apt doesn't update. Move to FrankenPHP 1.13.2, or rebuild the Docker image.

## If the fix isn't available yet

The command prints "NO PATCH AVAILABLE"? Compare the two versions in brackets. Unless you're on Ubuntu with Ubuntu's own PHP (see above), the fixed package hasn't reached your mirror yet. Run it again in an hour. Meanwhile:

- **The `session.upload_progress` mitigation** is already applied by the command. It lowers the risk, it doesn't remove it.
- **Cloudflare** has deployed firewall rules against the known attacks, for all customers, free plan included, according to [Help Net Security](https://www.helpnetsecurity.com/2026/10/21/php2shell-php-vulnerabilities-patched-cve-2026-109618-cve-2026-109619/){target="_blank" rel="noopener"}. If your site sits behind Cloudflare, that's one more layer. I told how those rules already rid me of unwanted bots in [I got my blog's traffic back (and the bots that come with it)](/en/20260922-jai-recupere-le-trafic-de-mon-blog-et-les-bots-qui-vont-avec).
- **The UK NCSC** advises taking offline whatever can't be fixed right away. For a brochure site that can wait until tomorrow morning, that's the safest option.

And if the server still runs PHP 8.1 or older, no amount of waiting will help: install a supported version and switch the sites to it.

## Checking no process still runs the old PHP

The command's report checks the PHP-FPM version installed on disk, not the one running in memory. To make sure no process, PHP-FPM, a forgotten worker or a script started by hand, still runs the old files:

```bash
sudo grep -lsE 'php.*\(deleted\)$' /proc/[0-9]*/maps
```

No output: nothing uses the old PHP any more. Otherwise, the number in the path (`/proc/<number>/maps`) is the process to restart.

## I'll leave you to it

A flaw that hands over a server without a password, in the language behind a good part of the Web, with attacks already under way: there isn't much to analyse, you patch. I wrote yesterday about a [hacked WordPress site](/en/20261020-site-wordpress-pirate-trouver-par-ou-le-pirate-est-entre): the bots don't target anyone in particular, they try everything, everywhere. Tonight, they're trying PHP2Shell.

I'll leave you to it… it's going to be a long night.

---

*Photo: [Panumas Nikhomkhai](https://www.pexels.com/photo/1148820/), Pexels.*

---
*[Jean-Luc Houédanou](https://houedanou.com) — on SSH tonight, one server after another*
