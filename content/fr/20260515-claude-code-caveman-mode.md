---
title: "Claude Code en mode Caveman : -75% de tokens, agent parle comme homme des cavernes"
image: "/images/articles/claude-caveman.jpg"
createdAt: "2026-05-15"
description: "Le plugin Caveman fait parler Claude Code (et 30+ autres agents) comme un homme des cavernes : 65 à 75 % de tokens en moins, précision technique intacte. Installation sur Windows, macOS et Linux."
keywords: "Claude Code, caveman, plugin, économiser tokens, Anthropic, Codex, Gemini, Cursor, Windsurf, Cline, Copilot, Windows, macOS, Linux"
tags: ["tutoriel", "dev", "ia"]
---

# Claude Code en mode Caveman : -75% de tokens, agent parle comme homme des cavernes

> *Why use many token when few do trick.*

Vous payez Claude au token. Et Claude, c'est un bavard. Il vous explique, il reformule, il vous complimente, il vous prépare une introduction soignée avant de poser deux lignes de code utiles.

Julius Brussee en a eu marre. Il a sorti [Caveman](https://github.com/JuliusBrussee/caveman), un plugin pour Claude Code (et 30+ autres agents IA) qui force l'agent à parler comme un homme des cavernes. **Brain still big. Mouth small.**

Résultat moyen sur 10 prompts réels : **65 % d'output tokens en moins**, jusqu'à 87 % sur les longues explications. Précision technique : 100 %.

---

## Avant / Après

**Claude normal (69 tokens)** :

> « La raison pour laquelle votre composant React se re-rend est probablement que vous créez une nouvelle référence d'objet à chaque cycle de rendu. Quand vous passez un objet inline en prop, la comparaison superficielle de React le voit comme un objet différent à chaque fois, ce qui déclenche un re-render. Je recommanderais d'utiliser useMemo pour mémoïser l'objet. »

**Caveman Claude (19 tokens)** :

> « New object ref each render. Inline object prop = new ref = re-render. Wrap in useMemo. »

Même correction. 75 % de mots en moins. Le cerveau est toujours là, juste la bouche qui se tait.

---

## Pourquoi ça marche

Caveman dépose un fichier *skill* dans l'agent. Ce skill lui dit : pas de remplissage, pas de politesse cérémonieuse, fragments autorisés, code et chemins préservés au byte près.

Sur Claude Code en particulier, un hook écrit un petit fichier-drapeau à chaque session — Claude parle Caveman dès le premier message, sans qu'on tape `/caveman`.

Et fait amusant : un papier de mars 2026 (*Brevity Constraints Reverse Performance Hierarchies in Language Models*) a montré que contraindre les gros modèles à la concision **améliore la précision de 26 points** sur certains benchmarks. Moins de mots = parfois plus juste.

---

## Installation

Une seule ligne. Le script détecte tous les agents installés et pose le skill pour chacun. Node ≥18 requis. Re-exécutable sans risque.

### macOS, Linux, WSL, Git Bash

```bash
curl -fsSL https://raw.githubusercontent.com/JuliusBrussee/caveman/main/install.sh | bash
```

### Windows (PowerShell 5.1+)

```powershell
irm https://raw.githubusercontent.com/JuliusBrussee/caveman/main/install.ps1 | iex
```

~30 secondes. Les agents non installés sont sautés.

**Déclencher** : tapez `/caveman` ou dites *« talk like caveman »*. Pour revenir en arrière : *« normal mode »*.

> Si l'installeur galère : ouvrez votre agent et dites-lui *« Read CLAUDE.md and INSTALL.md, install caveman for me. »* L'agent se répare le cerveau tout seul.

---

## Les niveaux de grunt

Caveman propose plusieurs intensités, à choisir selon votre tolérance :

| Niveau | Style |
| --- | --- |
| `lite` | Supprime le remplissage, phrases normales |
| `full` | Caveman par défaut, fragments |
| `ultra` | Télégraphique, mots-clés uniquement |
| `wenyan` | Chinois classique, encore plus court |

Changement à la volée : `/caveman ultra`.

---

## Les commandes utiles

| Commande | Effet |
| --- | --- |
| `/caveman [niveau]` | Compresse toutes les réponses jusqu'à la fin de session |
| `/caveman-commit` | Messages Conventional Commit, sujet ≤ 50 caractères |
| `/caveman-review` | Commentaires de PR en une ligne : `L42: 🔴 bug: user null. Add guard.` |
| `/caveman-stats` | Tokens économisés sur la session + total à vie + équivalent USD |
| `/caveman-compress <fichier>` | Réécrit un fichier mémoire (ex. `CLAUDE.md`) en caveman-speak. ~46 % d'input tokens en moins **à chaque session suivante** |
| `caveman-shrink` | Middleware MCP qui compresse les descriptions d'outils MCP |
| `cavecrew-*` | Sous-agents Caveman (investigator, builder, reviewer) — contexte principal qui dure plus longtemps |

Claude Code affiche aussi un badge dans la statusline : `[CAVEMAN] ⛏ 12.4k` (tokens économisés à vie). Désactivable avec `CAVEMAN_STATUSLINE_SAVINGS=0`.

---

## Benchmarks (vrais tokens, API Claude)

Moyenne sur 10 prompts : **65 % de réduction d'output**.

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

Le harnais d'éval est honnête : il compare Caveman contre *« Answer concisely »* (pas contre le mode verbeux par défaut), donc le delta est réel.

---

## Ce qu'il faut savoir

Caveman ne touche **que les output tokens**. Les tokens de raisonnement (*thinking*) restent intacts — Claude réfléchit autant qu'avant, il parle juste moins. Le vrai gain, c'est la **lisibilité** et la **vitesse** (~3× plus rapide à lire). L'économie d'argent, c'est le bonus.

Activation automatique en début de session : Claude Code, Codex, Gemini (intégré). Cursor, Windsurf, Cline, Copilot : ajoutez `--with-init` à l'install pour avoir des rule files toujours actifs. Les autres agents se déclenchent au coup par coup avec `/caveman`.

---

## L'écosystème Caveman

Julius pousse une philosophie : *l'agent fait plus avec moins.* Trois outils complémentaires :

- **caveman** — compresse ce que l'agent **dit** (cet article)
- **cavemem** — mémoire partagée entre agents : pourquoi oublier quand on peut se souvenir
- **cavekit** — boucle de build spec-driven : pourquoi deviner quand on peut savoir

Compose : `cavekit` pilote le build, `caveman` compresse la sortie, `cavemem` compresse la mémoire. One rock. Two rock. Three rock. That it.

---

## Verdict

Si vous bossez avec Claude Code au quotidien et que vous trouvez les réponses interminables, installez Caveman. Une ligne, 30 secondes, et votre quota mensuel respire. Les explications restent justes, juste sans les fioritures.

License MIT. *Free like mass mammoth on open plain.*

Lien : [github.com/JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman)

---
*Jean Luc Houédanou — moins de bla-bla, plus de code. Ooga booga, facture mini.*
