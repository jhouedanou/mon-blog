---
title: "Hacked WordPress site: find out how the attacker got in"
createdAt: "2026-10-20T09:00:00Z"
image: "/images/articles/pexels-pixabay-276452.webp"
description: "WordPress site hacked? Before cleaning up, find the way in from the server logs: a guessed admin password, a plugin uploaded via wp-admin. Commands included."
searchIntent: "My WordPress site was hacked: what should I do first, and how do I find in the server logs how the attacker got in (admin password, plugin, FTP)?"
tags: ["tutorial", "wordpress", "security", "development"]
---

**Short answer.** Before you clean anything, copy the server logs. Then look for the way in: a burst of `POST /wp-login.php` followed by a successful login means the password was guessed; an `upload-plugin` right after means the attacker installed their own plugin from the dashboard. Until you know how they got in, they will come back the same way, even after a clean restore.

That's exactly what I found in August, on an African news site I had to put back on its feet. Here's the method, commands included.

## What to do first when a WordPress site is hacked

The reflex is to delete everything and restore a backup. That's the best way to erase the evidence and leave the door open. In order:

1. **Copy the logs**, right away. Access logs rotate: depending on the host, files older than a few days get compressed, then deleted. Without them, there's nothing to investigate.
2. **Archive the hacked site** (files and database), infected as it is. It's your crime scene.
3. **Change every administrator password** and invalidate every open session.
4. **Find the way in**, which is what the rest of this post covers.
5. Only then: clean up or restore, and close the door.

One precaution before typing any `wp` command. [WP-CLI](https://wp-cli.org/){target="_blank" rel="noopener"} loads WordPress, which means it loads the plugins too, the attacker's included. Its code can run, or hide its administrator account from the results. On a hacked site, always run WP-CLI without plugins or theme. The easiest way is to set it once for the whole session:

```bash
wp() { command wp --path=/var/www/mysite --skip-plugins --skip-themes "$@"; }
```

Then, for steps 1 to 3, over SSH:

```bash
# 1. Copy the logs (adjust the path, see below)
mkdir -p ~/investigation/logs
sudo cp -a /var/log/nginx/. ~/investigation/logs/
sudo chown -R "$USER" ~/investigation

# 2. Archive the site and the database, as they are
tar czf ~/investigation/hacked-site.tar.gz -C /var/www mysite
wp db export ~/investigation/hacked-db.sql

# 3. Invalidate logins and change passwords
wp config shuffle-salts
wp user update <username> --prompt=user_pass
```

`wp config shuffle-salts` changes the secret keys in `wp-config.php`: every login cookie becomes invalid, the attacker's included. `--prompt=user_pass` asks for the new password without leaving it in your shell history. Repeat for every administrator account.

## Where to find the server logs

WordPress doesn't record login attempts. It only keeps open sessions, with the date, IP address and browser, in the database (more on that below). The rest of the evidence lives in the web server's access log, which records every request: IP address, date, page requested, response code.

| Server or panel | Usual access log location |
|---|---|
| Nginx | `/var/log/nginx/access.log` |
| Apache (Debian, Ubuntu) | `/var/log/apache2/access.log` |
| Apache (AlmaLinux, Rocky) | `/var/log/httpd/access_log` |
| cPanel | `/usr/local/apache/domlogs/<domain>` and `<domain>-ssl_log`; without root, `~/access-logs/` and `~/logs/` |
| CyberPanel (OpenLiteSpeed) | `/home/<domain>/logs/<domain>.access_log` |

On shared hosting without SSH, the control panel usually lets you download the raw logs. Take everything available, `.gz` files included, and put them in `~/investigation/logs/`. In the commands below, `zgrep` reads compressed files just like plain ones, whatever their name.

A log line looks like this (the common "combined" format):

```
203.0.113.45 - - [12/Aug/2026:03:14:07 +0000] "POST /wp-login.php HTTP/1.1" 200 4521 "-" "Mozilla/5.0"
```

In order: the IP, the date, the request, then the **response code** (`200` here). That code tells the whole story.

## Lead 1: a guessed admin password

When the password is wrong, `wp-login.php` answers `200`: it shows the form again with an error message. When the password is right, it answers `302`: a redirect to `/wp-admin/`. A brute-force attack therefore leaves a very readable signature: hundreds of `POST` requests returning `200`, then one `302`.

Count attempts per IP address:

```bash
zgrep -h 'POST /wp-login.php HTTP' ~/investigation/logs/* \
  | awk '{print $1}' | sort | uniq -c | sort -rn | head -20
```

Find the successful logins:

```bash
zgrep -h 'POST /wp-login.php HTTP' ~/investigation/logs/* | awk '$9 == 302'
```

The `wp-login.php HTTP` pattern leaves out the "lost password" pages (`wp-login.php?action=lostpassword`), which also answer `302`. If the site uses two-factor authentication, a correct password first returns `200` (the page asking for the code): rely on the next lead and on the sessions instead.

Don't stop at `wp-login.php`. Bots also go through `xmlrpc.php`, the old remote publishing interface. It accepts a username and password too, but always answers `200`, whether the attempt works or not. An abnormal volume of `POST /xmlrpc.php` is a warning sign, even with no `302` in sight:

```bash
zgrep -h 'POST /xmlrpc.php' ~/investigation/logs/* \
  | awk '{print $1}' | sort | uniq -c | sort -rn | head
```

How did the attacker know the username? WordPress hands it over: `/?author=1` redirects to `/author/<name>/`, which is often the username itself, and `/wp-json/wp/v2/users` (or `?rest_route=/wp/v2/users`) lists the authors who have published. Look for those requests just before the burst.

Finally, look at the sessions WordPress kept for each administrator: login time, IP and browser.

```bash
wp user session list <username> --fields=login_time,ip,ua
```

**Reading the result:**

- **Many failures, then a success from the same IP**: the password was guessed. It was too short or too common.
- **A burst on `xmlrpc.php`, then a single `302` on `wp-login.php`**: same thing. The password was found through `xmlrpc.php`, then used on the login page, which therefore shows no failures.
- **A success with no failures anywhere, from an unknown IP**: the attacker already had the password. One reused elsewhere, a phishing email, or spyware on an editor's computer. That's the [fake Zoho renewal email](/en/20260831-faux-mail-renouvellement-zoho-358-dollars) scenario: nobody guesses anything, they just ask.

## Lead 2: a malicious plugin uploaded via wp-admin

Once they're an administrator, the attacker doesn't need a vulnerability. WordPress gives them a button: **Plugins > Add New > Upload Plugin**. They send a ZIP file, WordPress installs it, and the attacker's code runs on the server. That upload goes through a specific address, and the activation that follows gives away the plugin's folder name:

```bash
zgrep -h -E 'update\.php\?action=upload-(plugin|theme)' ~/investigation/logs/*
zgrep -h 'plugins.php?action=activate' ~/investigation/logs/*
```

A `POST /wp-admin/update.php?action=upload-plugin` line nobody on the team made is the second step. Also look for the built-in file editor, which attackers use to slip code into an existing plugin or theme. Saving goes through `admin-ajax.php` and doesn't stand out in the logs, but opening the editor does leave a trace:

```bash
zgrep -h -E 'plugin-editor\.php|theme-editor\.php' ~/investigation/logs/*
```

Then find the files themselves. The attacker can fake a file's modification date, but not its status change time (`ctime`). List the PHP files in `wp-content` from newest to oldest:

```bash
cd /var/www/mysite
find wp-content -name '*.php' -printf '%C+ %p\n' | sort -r | head -30
find wp-content/uploads -name '*.php'
```

The second command should return nothing: the media folder has no reason to hold PHP. Careful, a `chmod`, a `chown` or a restore also update the `ctime`: run this search before touching the files.

In the logs, requests to a PHP file of the plugin show when it was used, and from where:

```bash
zgrep -h '/wp-content/plugins/PLUGIN-NAME/' ~/investigation/logs/*
```

Don't trust the name. A malicious plugin often picks a reassuring one, close to a well-known caching, security or SEO plugin. A plugin nobody installed is suspicious, even if it's called "security".

## Rebuild the timeline

You now have one or two IP addresses. Pull out everything they did, in order:

```bash
cd ~/investigation/logs
zgrep -h '^203\.0\.113\.45 ' $(ls -tr) > ~/investigation/timeline.txt
```

`ls -tr` sorts the files from oldest to newest, so you can read the story top to bottom. The `^` and the trailing space avoid catching another IP that starts the same way. For a guessed password followed by a plugin, the story looks like this: the username lookup, the password attempts, the login, the plugin upload, then the calls to its PHP file. Write down the time of each step: it tells you which backup predates the attack.

Two traps. Attackers often switch IP addresses between steps: if the trail goes cold, search by behavior, the same browser (`User-Agent`) or requests to the malicious plugin. And if the site sits behind Cloudflare or another proxy, the first column may be the proxy's IP, not the attacker's, unless the server is set up to log the real address.

Check the database too. An attacker with admin rights often creates a second administrator account, to get back in if the first password is changed:

```bash
wp user list --role=administrator --fields=ID,user_login,user_email,user_registered
```

An account created on the day of the attack, with an address nobody recognizes: write it down, then delete it.

## If the logs show neither

No suspicious `302`, no upload? The door is somewhere else. The most common signatures:

| Way in | Where to look | What to look for |
|---|---|---|
| Plugin vulnerability | Access log | `POST` requests to `admin-ajax.php` or to a specific plugin file, with no prior login |
| Stolen FTP or SSH access | `/var/log/secure` (AlmaLinux), `/var/log/auth.log` or `journalctl -u ssh` (Debian, Ubuntu), the panel's FTP log | A successful login from an unknown IP |
| Compromised hosting account | The panel's login history | A session you didn't open |
| Infected neighbor site | Other sites on the same account | The same malicious file, older, somewhere else |

For the first lead, WP-CLI compares WordPress core and plugins from the official directory against the originals. Any modified or added file shows up:

```bash
wp core verify-checksums
wp plugin verify-checksums --all
```

A plugin WP-CLI can't find checksums for isn't in the official directory. If it's a premium or custom plugin, compare it by hand against a fresh copy from the vendor. If nobody knows where it came from, you may have found the culprit.

## Close the door

Finding the way in is useless if you leave it open. For a guessed password and a plugin uploaded through wp-admin, the minimum:

- **Long, unique passwords** for every administrator account, plus two-factor authentication.
- **Fewer administrators.** An editor doesn't need the Administrator role to publish.
- **No more plugin installs from the dashboard**, by adding this line to `wp-config.php`: it disables the file editor, uploads, and plugin and theme installs and updates.

```php
define( 'DISALLOW_FILE_MODS', true );
```

The downside: automatic updates stop too, security updates included. They then go through SSH (`wp core update`, `wp plugin update --all`) or your deployment. Only pick this if someone will actually do it.

- **Limit login attempts**, and block `xmlrpc.php` if nothing uses it (mobile app, Jetpack).

These settings only help if you've first checked that nothing is left behind: a forgotten plugin, a second admin account, or a script that recreates the backdoor. That will be the subject of an upcoming post.

## What I take away from it

On the August site, there was no unknown vulnerability and no genius hacker. The administrator password was guessed, and WordPress did the rest: it lets any administrator install code on the server in three clicks. The logs told the whole story, as long as you read them before wiping everything.

These bots aren't after anyone in particular. They try the same addresses on every site, including those that no longer run WordPress. This blog left it [two years ago](/en/20261018-migration-wordpress-nuxt-referencement-perdu-recupere), and bots still look for its `wp-login.php`: I told that story in [I got my blog's traffic back (and the bots that come with it)](/en/20260922-jai-recupere-le-trafic-de-mon-blog-et-les-bots-qui-vont-avec). Your site isn't too small to get hacked. It's just on the list, like all the others.

---

*Photo: [Pixabay](https://www.pexels.com/photo/276452/), Pexels.*

---
*[Jean-Luc Houédanou](https://houedanou.com) — log reader, preferably before the big clean-up*
