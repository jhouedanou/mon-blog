---
title: "Mode caveman Claude Code : moins de bla-bla"
image: "/images/articles/claude-caveman.webp"
createdAt: "2026-05-15"
updatedAt: "2026-11-08T12:00:00Z"
description: "Le mode caveman de Claude Code fait parler l'agent comme un homme des cavernes : moins de tokens, même code. Installation de Caveman 4.1 et vrais chiffres."
searchIntent: "Comment réduire la consommation de tokens de Claude Code avec le plugin Caveman."
tags: ["tutoriel", "dev", "ia"]
---

> *Why use many token when few do trick.*

Le mode caveman de Claude Code part d'un constat : vous payez Claude au token, et Claude, c'est un bavard. Il vous explique, il reformule, il vous complimente, il vous prépare une introduction soignée avant de poser deux lignes de code utiles.

Julius Brussee en a eu marre. Il a sorti [Caveman](https://github.com/JuliusBrussee/caveman), un plugin pour Claude Code (et 30+ autres agents IA) qui force l'agent à parler comme un homme des cavernes. **Brain still big. Mouth small.**

Résultat moyen sur 10 prompts réels, selon le README du projet en mai 2026 : **65 % d'output tokens en moins**, jusqu'à 87 % sur les longues explications. Précision technique : 100 %. Les mesures plus récentes sont nettement plus modestes (voir plus bas).

---

## Avant / Après

**Claude normal (69 tokens)** :

> « La raison pour laquelle votre composant React se re-rend est probablement que vous créez une nouvelle référence d'objet à chaque cycle de rendu. Quand vous passez un objet inline en prop, la comparaison superficielle de React le voit comme un objet différent à chaque fois, ce qui déclenche un re-render. Je recommanderais d'utiliser useMemo pour mémoïser l'objet. »

**Caveman Claude (19 tokens)** :

> « New object ref each render. Inline object prop = new ref = re-render. Wrap in useMemo. »

Même correction. 75 % de mots en moins. Le cerveau est toujours là, juste la bouche qui se tait.

---

## Comment fonctionne le mode caveman

Caveman dépose un fichier *skill* dans l'agent. Ce skill lui dit : pas de remplissage, pas de politesse cérémonieuse, fragments autorisés, code et chemins préservés au byte près.

Sur Claude Code en particulier, un hook écrit un petit fichier-drapeau à chaque session : Claude parle Caveman dès le premier message, sans qu'on tape `/caveman`.

Et fait amusant : un papier de mars 2026 ([*Brevity Constraints Reverse Performance Hierarchies in Language Models*](https://arxiv.org/abs/2604.00025)) a montré que contraindre les gros modèles à la concision **améliore la précision de 26 points** sur certains benchmarks. Moins de mots = parfois plus juste.

---

## Installer le mode caveman dans Claude Code

Une seule ligne. Le script détecte tous les agents installés et pose le skill pour chacun. Node.js 22.13+ requis. Re-exécutable sans risque. Les commandes ci-dessous sont épinglées sur la version 4.1.0, sortie le 8 novembre 2026, celle de la [page d'installation officielle](https://github.com/JuliusBrussee/caveman/blob/main/INSTALL.md) au moment de cette mise à jour : vérifiez-y le numéro de version le plus récent.

### macOS, Linux, WSL, Git Bash

```bash
curl -fsSL https://raw.githubusercontent.com/JuliusBrussee/caveman/v4.1.0/install.sh | bash
```

### Windows (PowerShell 5.1+)

```powershell
irm https://raw.githubusercontent.com/JuliusBrussee/caveman/v4.1.0/install.ps1 | iex
```

~30 secondes. Les agents non installés sont sautés. Pour voir d'abord ce que le script ferait, sans rien écrire, remplacez `| bash` par `| bash -s -- --dry-run`.

### Seulement Claude Code, ou seulement le skill

Pour Claude Code uniquement, en plugin :

```bash
claude plugin marketplace add JuliusBrussee/caveman && claude plugin install caveman@caveman
```

Déjà dans une session Claude Code ? Même chose en commandes slash : `/plugin marketplace add JuliusBrussee/caveman`, puis `/plugin install caveman@caveman`.

Et si vous voulez juste les réponses courtes, sans le reste :

```bash
npx skills add JuliusBrussee/caveman -g
```

### Le CLI complet, nouveau en version 4

Depuis la version 4.0, le [README](https://github.com/JuliusBrussee/caveman#install){target="_blank" rel="noopener"} met en avant une autre commande, qui installe en plus le CLI `caveman` et son proxy (les « rocks », plus bas) :

```bash
npx @caveman-ai/cli@latest
```

Il repère vos agents et vos connexions, affiche ce qu'il va changer et attend que vous validiez avec Entrée. Si vous aviez Caveman avant la 4.0, gardez le `@latest` : sans lui, c'est l'ancienne copie installée qui se lance.

**Déclencher** : tapez `/caveman` ou dites *« talk like caveman »*. Pour revenir en arrière : *« stop caveman »*, *« normal mode »* ou `/caveman off`.

> Si l'installeur galère : ouvrez votre agent dans une copie du dépôt et dites-lui *« Read CLAUDE.md and INSTALL.md, install caveman for me. »* L'agent se répare le cerveau tout seul.

**Vérifier** : la statusline de Claude Code affiche `[CAVEMAN]`. **Mettre à jour** le plugin : `claude plugin update caveman@caveman` (le nom court `caveman` échoue), puis relancez Claude Code.

---

## Les niveaux de grunt

Caveman propose trois intensités, à choisir selon votre tolérance :

| Commande | Style |
| --- | --- |
| `/caveman` | Caveman par défaut, fragments |
| `/ultracave` (ou `/caveman ultra`) | Télégraphique, mots-clés uniquement |
| `/megacave` (ou `/caveman wenyan`) | Chinois classique, encore plus court |

Changement à la volée : `/caveman ultra`. Les anciens niveaux `lite` et `full` ont été fondus dans `/caveman`. `/caveman status` affiche le mode actif. Pour choisir le mode de départ des nouvelles sessions, mettez `{"defaultMode": "ultracave"}` dans `~/.config/caveman/config.json`.

---

## Les commandes utiles

| Commande | Effet |
| --- | --- |
| `/caveman [niveau]` | Compresse toutes les réponses jusqu'à la fin de session |
| `/caveman-commit` | Messages Conventional Commit, sujet ≤ 50 caractères |
| `/caveman-review` | Commentaires de PR en une ligne : `L42: 🔴 null deref. Guard it.` |
| `/caveman-stats` | Consommation réelle de tokens sur la session Claude Code |
| `/caveman-compress <fichier>` | Réécrit un fichier mémoire (ex. `CLAUDE.md`) en caveman-speak et garde une sauvegarde. De 23 à 49 % de tokens en moins selon le fichier, **à chaque session suivante** |
| `/caveman-help` | Tous les modes et commandes sur un seul écran |
| `caveman-shrink` | Middleware MCP qui compresse les descriptions d'outils MCP (optionnel, à l'installation : `--with-mcp-shrink` suivi de la commande du serveur MCP) |
| `cavecrew-*` | Sous-agents Caveman (investigator, builder, reviewer) — contexte principal qui dure plus longtemps |

Claude Code affiche aussi un badge dans la statusline avec le mode actif : `[CAVEMAN]`, `[ULTRACAVE]` ou `[MEGACAVE]`.

---

## Combien de tokens le mode caveman fait-il économiser ?

Mesures du README de mai 2026, en vrais tokens via l'API Claude, sur 10 prompts : **65 % de réduction d'output** en moyenne.

| Tâche | Normal | Caveman | Économisé |
| --- | ---: | ---: | ---: |
| Expliquer un bug de re-render React | 1180 | 159 | **87 %** |
| Fixer un middleware d'auth (expiry token) | 704 | 121 | **83 %** |
| Setup d'un pool PostgreSQL | 2347 | 380 | **84 %** |
| `git rebase` vs `merge` | 702 | 292 | 58 % |
| Refactor callback → async/await | 387 | 301 | 22 % |
| Microservices vs monolithe | 446 | 310 | 30 % |
| Review PR sécurité | 678 | 398 | 41 % |
| Docker multi-stage build | 1042 | 290 | 72 % |
| Debug race condition PostgreSQL | 1200 | 232 | 81 % |
| React Error Boundary | 3454 | 456 | **87 %** |
| **Moyenne** | **1214** | **294** | **65 %** |

Attention : ce tableau compare Caveman à Claude sans consigne particulière. Le harnais d'éval du projet, lui, le comparait déjà à la consigne *« Answer concisely »*, une référence plus exigeante : c'est celle que le README retient aujourd'hui.

> **À jour en octobre 2026** : le « -75 % » de l'ancien titre, c'est la promesse affichée par le [README de mai 2026](https://github.com/JuliusBrussee/caveman/blob/e843518438b2cfb404edf00db2d8e64c1d975e34/README.md){target="_blank" rel="noopener"} (« ~75% of output tokens »), alors que ses propres mesures donnaient déjà 65 % en moyenne (le tableau ci-dessus). Le README a depuis refait la mesure sur un modèle plus récent, et la référence n'est plus une réponse sans consigne, mais la consigne *« Answer concisely »* : face à elle, `/caveman` ne retire plus que 3 % de tokens de sortie supplémentaires en médiane, et `/ultracave` 35 %. Les nouveaux modèles savent déjà être concis. Le chiffre mis en avant aujourd'hui est ailleurs : 33,2 % de tokens d'entrée en moins sur des sessions complètes, grâce au proxy du projet ([source : README de Caveman](https://github.com/JuliusBrussee/caveman#the-numbers){target="_blank" rel="noopener"}).

Une mesure indépendante va dans le même sens : sur 86 tâches réelles dans Claude Code, JetBrains a mesuré environ 8,5 % de tokens de sortie en moins, sans effet détectable sur la réussite des tâches ni sur la qualité du code ([InfoWorld, juillet 2026](https://www.infoworld.com/article/4193775/talk-like-a-caveman-prompts-save-tokens-but-far-less-than-promised.html){target="_blank" rel="noopener"}).

---

## Ce qu'il faut savoir

La voix caveman (le skill) ne touche **que les output tokens**. Les tokens de raisonnement (*thinking*) restent intacts : Claude réfléchit autant qu'avant, il parle juste moins. Le vrai gain, c'est la **lisibilité** et la **vitesse** (~3× plus rapide à lire). L'économie d'argent, c'est le bonus, et elle a un prix : les règles du skill pèsent environ 1 160 tokens d'entrée, et si vous payez à la requête (GitHub Copilot), des réponses plus courtes n'économisent rien.

Le CLI de la version 4 va plus loin et compresse aussi ce que l'agent **lit** (voir plus bas). Il envoie par défaut des statistiques d'usage : commandes lancées, nombres de tokens, un identifiant d'installation, le système et l'adresse IP, jamais vos prompts ni votre code. Pour couper : `caveman telemetry off` ou `DO_NOT_TRACK=1` ([section Privacy du README](https://github.com/JuliusBrussee/caveman#privacy){target="_blank" rel="noopener"}). Le skill seul n'envoie rien, sauf `/caveman-compress`, qui transmet le fichier à compresser à votre fournisseur de modèle.

Activation automatique en début de session : Claude Code, Codex, Gemini CLI, Cursor, Copilot CLI, opencode et quelques autres (intégré). Windsurf, Cline et Copilot dans VS Code : ajoutez `--with-init` à l'install pour avoir des rule files toujours actifs. Les autres agents se déclenchent au coup par coup avec `/caveman` (`$caveman` dans Codex sans le hook).

---

## Caveman 4 : six « rocks » en une installation

Julius pousse une philosophie : *l'agent fait plus avec moins.* Depuis la version 4.0, tout tient dans un seul outil, découpé en six « rocks », tous actifs après l'installation du CLI et chacun avec son interrupteur ([README](https://github.com/JuliusBrussee/caveman#six-rocks-one-install){target="_blank" rel="noopener"}) :

- **Say less** — la voix caveman, celle de cet article
- **Read less** — logs, JSON, CSV et sorties de tests compressés avant que le modèle les lise : 33,2 % de tokens d'entrée en moins sur des sessions Claude Code complètes, selon le projet
- **Auto** — choisit le modèle et l'effort pour chaque demande ; il faut un compte gratuit, et vos dernières demandes partent alors chez Caveman Cloud
- **Blocks** — l'agent garde les scripts qu'il écrit et les réutilise au lieu de les réécrire
- **Waste fixes** — repère où partent vos tokens et garde le cache de prompt au chaud pendant vos pauses
- **Browse** — les pages web arrivent compressées

`caveman status` montre ce qui est actif, `caveman off browse` coupe un rock. cavemem (la mémoire partagée entre agents) et cavekit (la boucle de build spec-driven), présentés à part en mai, sont désormais gelés : leur développement continue dans le dépôt caveman. Six rock. One install. That it.

---

## Verdict

Si vous bossez avec Claude Code au quotidien et que vous trouvez les réponses interminables, installez Caveman. Une ligne, 30 secondes, et votre quota mensuel respire. Les explications restent justes, juste sans les fioritures. Relisez-les quand même : pousser sans relire, c'est [la limite du vibe coding](/fr/20260423-chers-vibe-codeurs-bienvenue-dans-la-realite). Relire fait partie de [ce que l'IA ne remplace pas chez un développeur](/fr/20261016-pourquoi-lia-ne-me-remplacera-pas). Et pour piloter tout ça depuis votre téléphone, il y a [Claude Code Remote Control](/fr/20260531-claude-dispatch-smartphone-telecommande-claude-code).

Licence Apache-2.0 depuis la version 3.0.0 (avant : MIT pour le skill, BSL pour le moteur). *Free like mass mammoth on open plain.*

Lien : [github.com/JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman)


*Mise à jour du 8 octobre 2026 : nouvelles commandes d'installation (Node.js 22.13+, versions épinglées), niveaux réduits à `/caveman`, `/ultracave` et `/megacave`, commandes et licence (Apache-2.0) mises à jour, et nouveaux benchmarks (le « -75 % » du titre est la promesse de mai 2026, pas une mesure actuelle), d'après le [README](https://github.com/JuliusBrussee/caveman), la [page d'installation](https://github.com/JuliusBrussee/caveman/blob/main/INSTALL.md) et le [fichier de licence](https://github.com/JuliusBrussee/caveman/blob/main/LICENSING.md) du projet.*

*Mise à jour du 8 novembre 2026 : commandes épinglées sur la version 4.1.0, nouveau CLI (`npx @caveman-ai/cli@latest`) et ses six « rocks », télémétrie du CLI, coût des règles du skill, cavemem et cavekit gelés, d'après le [README](https://github.com/JuliusBrussee/caveman){target="_blank" rel="noopener"} et la [page d'installation](https://github.com/JuliusBrussee/caveman/blob/main/INSTALL.md){target="_blank" rel="noopener"} du projet ; ajout de la mesure indépendante de JetBrains. Correction : le tableau de mai compare Caveman à Claude sans consigne, et non à la consigne « Answer concisely ». Le titre ne cite plus de pourcentage.*

---
*[Jean-Luc Houédanou](https://houedanou.com) — moins de bla-bla, plus de code. Ooga booga, facture mini.*
