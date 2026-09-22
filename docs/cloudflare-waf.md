# Règles WAF Cloudflare pour houedanou.com

Le site est un Worker Cloudflare (plan gratuit : 10 ms de CPU par requête).
Tout chemin qui n'est pas un fichier de `dist/` réveille le Worker. Les
scanners de vulnérabilités testent en continu des fichiers qui n'ont jamais
existé ici (`.env`, `.git/HEAD`, `phpinfo.php`…) : sur 24 h, le 22 septembre
2026, ils représentaient 1 201 invocations coupées pour dépassement de CPU et
2 300 réponses 503/522/504.

Le Worker répond désormais à ces sondes en texte brut (voir `PROBE_PATTERNS`
dans `redirects.js`), mais la vraie parade est de ne pas l'invoquer du tout :
les règles ci-dessous bloquent au bord, avant le Worker, et ne comptent pas
dans son quota.

À coller dans **Security → WAF → Custom rules → Create rule**, mode
*Edit expression*, action **Block**. Le plan gratuit autorise 5 règles ; il en
faut 3. Le langage de règles du plan gratuit n'a pas d'expressions régulières
(`matches`), d'où les listes de `contains` / `ends_with`.

`cf.client.bot` est vrai pour les robots vérifiés (Googlebot, Bingbot,
Applebot…) : la règle 1 les laisse passer pour qu'ils reçoivent toujours le
410 des anciennes URLs.

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

## Règle 3 — Scrapers SEO et crawlers IA

Nom : `Crawlers : SEO et IA`

Relevés le même jour : AhrefsBot (265), Baiduspider (113), CCBot (74),
Perplexity (72), DotBot (71), Hunyuan (71), Amazonbot (56).

```
http.user_agent contains "AhrefsBot"
or http.user_agent contains "DotBot"
or http.user_agent contains "SemrushBot"
or http.user_agent contains "MJ12bot"
or http.user_agent contains "BLEXBot"
or http.user_agent contains "DataForSeoBot"
or http.user_agent contains "PetalBot"
or http.user_agent contains "Baiduspider"
or http.user_agent contains "CCBot"
or http.user_agent contains "Hunyuan"
or http.user_agent contains "Amazonbot"
or http.user_agent contains "PerplexityBot"
or http.user_agent contains "Perplexity-User"
or http.user_agent contains "GPTBot"
or http.user_agent contains "ChatGPT-User"
or http.user_agent contains "OAI-SearchBot"
or http.user_agent contains "ClaudeBot"
or http.user_agent contains "Claude-User"
or http.user_agent contains "Claude-SearchBot"
or http.user_agent contains "anthropic-ai"
or http.user_agent contains "Bytespider"
or http.user_agent contains "meta-externalagent"
or http.user_agent contains "cohere-ai"
or http.user_agent contains "Diffbot"
or http.user_agent contains "ImagesiftBot"
or http.user_agent contains "omgili"
or http.user_agent contains "YouBot"
or http.user_agent contains "DuckAssistBot"
or http.user_agent contains "PanguBot"
or http.user_agent contains "Timpibot"
```

Plus simple pour la partie IA, et tenu à jour par Cloudflare :
**Security → Bots → Block AI bots** (interrupteur), qui couvre aussi les
crawlers absents de cette liste. Les deux peuvent coexister.

## Après mise en place

Vérifier depuis un terminal (un 403 signé Cloudflare, sans passer par le
Worker) :

```bash
curl -sI https://houedanou.com/.env | head -1
curl -sI https://houedanou.com/phpinfo.php | head -1
curl -sI -A "AhrefsBot/7.0" https://houedanou.com/ | head -1
curl -sI https://houedanou.com/fr/20250508-project-fat-loss | head -1   # doit rester 200
```

Puis, 24 h plus tard, dans **Workers & Pages → mon-blog → Metrics** : la
courbe « Errors » (exceeded resources) doit être retombée à zéro et le nombre
d'invocations divisé par deux ou trois. Les blocages apparaissent dans
**Security → Events**.
