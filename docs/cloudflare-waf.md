# Règles WAF Cloudflare pour houedanou.com

Depuis le 23 septembre 2026, le site est servi en statique pur, sans Worker :
les dépassements de CPU du plan gratuit (1 201 invocations coupées sur 24 h le
22 septembre, presque toutes des sondes de scanners : `.env`, `.git/HEAD`,
`phpinfo.php`…) ne peuvent plus se produire. Ces règles restent utiles pour
ne pas servir de pages aux scanners et aux aspirateurs, et garder les
statistiques lisibles.

À coller dans **Security → WAF → Custom rules → Create rule**, mode
*Edit expression*, action **Block**. Le plan gratuit autorise 5 règles ; il en
faut 3. Le langage de règles du plan gratuit n'a pas d'expressions régulières
(`matches`), d'où les listes de `contains` / `ends_with`.

`cf.client.bot` est vrai pour les robots vérifiés (Googlebot, Bingbot,
Applebot…) : la règle 1 les laisse passer pour qu'ils reçoivent toujours la
404 des anciennes URLs WordPress et finissent par les oublier.

## Règle 1 — Sondes de scanners (chemins)

Nom : `Scanners : chemins de fichiers sensibles`

```
(
  (http.request.uri.path contains "/." and not starts_with(http.request.uri.path, "/.well-known/"))
  or http.request.uri.path contains ".env"
  or http.request.uri.path contains "%2F"
  or ends_with(lower(http.request.uri.path), ".php")
  or ends_with(lower(http.request.uri.path), ".php7")
  or ends_with(lower(http.request.uri.path), ".phtml")
  or ends_with(lower(http.request.uri.path), ".asp")
  or ends_with(lower(http.request.uri.path), ".aspx")
  or ends_with(lower(http.request.uri.path), ".jsp")
  or ends_with(lower(http.request.uri.path), ".cgi")
  or ends_with(lower(http.request.uri.path), ".bak")
  or ends_with(lower(http.request.uri.path), ".old")
  or ends_with(lower(http.request.uri.path), ".key")
  or ends_with(lower(http.request.uri.path), ".pem")
  or ends_with(lower(http.request.uri.path), ".sql")
  or ends_with(lower(http.request.uri.path), ".ini")
  or ends_with(lower(http.request.uri.path), ".yml")
  or ends_with(lower(http.request.uri.path), ".yaml")
  or ends_with(lower(http.request.uri.path), ".log")
  or ends_with(lower(http.request.uri.path), ".zip")
  or ends_with(lower(http.request.uri.path), ".rar")
  or ends_with(lower(http.request.uri.path), ".tar")
  or ends_with(lower(http.request.uri.path), ".gz")
  or ends_with(lower(http.request.uri.path), ".7z")
  or http.request.uri.path contains "/wp-"
  or http.request.uri.path contains "xmlrpc"
  or http.request.uri.path contains "phpinfo"
  or http.request.uri.path contains "/cgi-bin/"
  or http.request.uri.path contains "/phpmyadmin"
  or http.request.uri.path contains "/wordpress/"
  or http.request.uri.path contains "/joomla/"
  or http.request.uri.path contains "/vendor/"
  or http.request.uri.path contains "/_debugbar"
  or http.request.uri.path contains "/__vite"
  or http.request.uri.path contains "/credentials"
  or (
    starts_with(http.request.uri.path, "/api/")
    and not starts_with(http.request.uri.path, "/api/_content/")
    and not http.request.uri.path eq "/api/_sitemap-urls"
  )
)
and not cf.client.bot
```

## Règle 2 — Faux navigateurs et user-agents vides

Nom : `Scanners : user-agents`

Relevés dans les analytics du 22 septembre 2026 : UA vide (421 requêtes),
« nginx-ssl early hints » (408), « More Firefox 1.0 user agents strings -->> »
(222), Internet Explorer 10 (263), « Photon/1.0 » (147). Aucun navigateur
réel n'envoie « MSIE » depuis IE 11.

```
http.user_agent eq ""
or http.user_agent contains "nginx-ssl early hints"
or http.user_agent contains "user agents strings"
or http.user_agent contains "MSIE "
or http.user_agent contains "Photon/"
or http.user_agent contains "python-requests"
or http.user_agent contains "python-httpx"
or http.user_agent contains "Go-http-client"
or http.user_agent contains "libwww-perl"
or http.user_agent contains "masscan"
or http.user_agent contains "zgrab"
or http.user_agent contains "Nuclei"
or http.user_agent contains "sqlmap"
or http.user_agent contains "nikto"
```

`curl` n'est volontairement pas dans la liste : il sert à vérifier le site.

## Règle 3 — Scrapers SEO

Nom : `Crawlers : SEO`

Relevés le 22 septembre 2026 : AhrefsBot (265), Baiduspider (113),
DotBot (71).

```
http.user_agent contains "AhrefsBot"
or http.user_agent contains "DotBot"
or http.user_agent contains "SemrushBot"
or http.user_agent contains "MJ12bot"
or http.user_agent contains "BLEXBot"
or http.user_agent contains "DataForSeoBot"
or http.user_agent contains "PetalBot"
or http.user_agent contains "Baiduspider"
```

## Robots d'IA : autorisés

Depuis le 25 octobre 2026, les robots d'IA (GPTBot, ClaudeBot, PerplexityBot,
Google-Extended, CCBot…) peuvent lire le site. ChatGPT, Claude, Perplexity
ou Gemini ne peuvent citer le blog que si ces robots y ont accès.

Avant, trois réglages Cloudflare les bloquaient. Les trois doivent être
désactivés, sinon le blocage reste :

1. **Règle WAF 3.** L'ancienne règle « Crawlers : SEO et IA » renvoyait 403
   aux user-agents d'IA. La remplacer par l'expression ci-dessus.
2. **Security → Bots → Block AI bots** (ou **AI Crawl Control**) : mettre
   sur *Do not block*.
3. **robots.txt géré** : dans **AI Crawl Control** (ou **Security → Bots**),
   désactiver *Instruct AI bot traffic with robots.txt* / *Manage your
   robots.txt*. Cloudflare ajoute sinon, en tête du fichier, un
   `Disallow: /` pour GPTBot, ClaudeBot, Google-Extended… et la ligne
   `Content-Signal: ai-train=no`.

Le `robots.txt` du site (`server/routes/robots.txt.ts`) nomme ces robots dans
son groupe `Allow: /`, au cas où le point 3 serait réactivé.

## Après mise en place

Vérifier depuis un terminal (un 403 signé Cloudflare) :

```bash
curl -sI https://houedanou.com/.env | head -1
curl -sI https://houedanou.com/phpinfo.php | head -1
curl -sI -A "AhrefsBot/7.0" https://houedanou.com/ | head -1
curl -sI https://houedanou.com/fr/20250508-project-fat-loss | head -1   # doit rester 200
```

Et les robots d'IA (un 200, plus de 403) :

```bash
curl -sI -A "GPTBot/1.2" https://houedanou.com/ | head -1
curl -sI -A "ClaudeBot/1.0" https://houedanou.com/ | head -1
curl -s https://houedanou.com/robots.txt | grep -c "Cloudflare Managed"   # doit afficher 0
```

Les blocages apparaissent dans **Security → Events**.
