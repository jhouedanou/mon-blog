# Skills vendored

Deux suites open source (licence MIT) copiées dans le repo, à portée projet.
Elles se chargent automatiquement quand Claude Code est lancé dans `mon-blog`.

| Suite | Source | Tag | Commit | Copié le |
|---|---|---|---|---|
| claude-blog | https://github.com/AgriciDaniel/claude-blog | v2.2.0 | 7b6ca107adb40b7c59030568420c117e2ea61301 | 2026-10-08 |
| claude-seo | https://github.com/AgriciDaniel/claude-seo | v2.4.1 | ff87fcee0734845d3f59128c8c905799ee2298da | 2026-10-08 |

## Ce qui a été copié

- claude-blog : `skills/*` → `.claude/skills/`, `agents/*.md` → `.claude/agents/`,
  `scripts/*.py` → `.claude/scripts/`, `data/google-updates.json` → `.claude/skills/blog/data/`.
- claude-seo : `skills/*` → `.claude/skills/`, `agents/*.md` → `.claude/agents/`,
  `scripts/`, `schema/`, `data/`, `hooks/` → `.claude/skills/seo/`.
- Non copié : les extensions payantes de claude-seo (DataForSEO, Banana).

## Différences avec les installeurs officiels

Les `install.sh` officiels écrivent dans `~/.claude`. Ils n'ont pas été lancés.
La copie reproduit leur disposition, avec ces chemins réécrits dans les `.md` :

- `${CLAUDE_PLUGIN_ROOT}/skills/` → `.claude/skills/`
- `${CLAUDE_PLUGIN_ROOT}/scripts/claude-seo` → `"$(git rev-parse --show-toplevel)/.claude/skills/seo/scripts/claude-seo"`
- `$HOME/.claude/scripts` → `$(git rev-parse --show-toplevel)/.claude/scripts`
- `~/.claude/skills/` → `.claude/skills/`

Le hook `PostToolUse` de claude-seo (`hooks/validate-schema.py`) est copié mais **pas activé** :
il ne se branche que via une installation en plugin.

## Dépendances Python (non versionnées)

- claude-seo : `.claude/skills/seo/scripts/claude-seo setup --skip-browser`
  crée `.claude/skills/seo/.venv` (sans Chromium, donc sans rendu ni captures).
- claude-blog : `python3 -m venv .claude/.venv && .claude/.venv/bin/pip install textstat beautifulsoup4 lxml`.

Aucune clé API (Google, Gemini, Moz…) n'est configurée : les commandes qui en dépendent
se replient ou s'arrêtent.

## Mettre à jour

Cloner la nouvelle version, comparer avec `diff -r`, recopier, réappliquer les
réécritures de chemins ci-dessus, mettre à jour ce tableau.
