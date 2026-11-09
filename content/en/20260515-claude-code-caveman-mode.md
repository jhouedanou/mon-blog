---
title: "Claude Code caveman mode: less blah-blah"
image: "/images/articles/claude-caveman.webp"
createdAt: "2026-05-15"
updatedAt: "2026-11-08T12:00:00Z"
description: "Claude Code caveman mode makes the agent talk like a caveman: fewer tokens, same code. How to install Caveman 4.1, and what it really saves."
searchIntent: "How to reduce Claude Code's token consumption with the Caveman plugin."
tags: ["tutorial", "dev", "ai"]
---

> *Why use many token when few do trick.*

Claude Code caveman mode starts from a simple fact: you pay for Claude by the token, and Claude is a chatterbox. It explains, it rephrases, it compliments you, it prepares a polished introduction before laying down two useful lines of code.

Julius Brussee had had enough. He released [Caveman](https://github.com/JuliusBrussee/caveman), a plugin for Claude Code (and 30+ other AI agents) that forces the agent to talk like a caveman. **Brain still big. Mouth small.**

Average result over 10 real prompts, according to the project's README in May 2026: **65% fewer output tokens**, up to 87% on long explanations. Technical accuracy: 100%. More recent measurements are far more modest (see below).

---

## Before / After

**Normal Claude (69 tokens)**:

> "The reason your React component is re-rendering is probably that you are creating a new object reference on every render cycle. When you pass an inline object as a prop, React's shallow comparison sees it as a different object each time, which triggers a re-render. I would recommend using useMemo to memoize the object."

**Caveman Claude (19 tokens)**:

> "New object ref each render. Inline object prop = new ref = re-render. Wrap in useMemo."

Same fix. 75% fewer words. The brain is still there; it's just the mouth that shuts up.

---

## How caveman mode works

Caveman drops a *skill* file into the agent. That skill tells it: no filler, no ceremonial politeness, fragments allowed, code and paths preserved byte for byte.

On Claude Code specifically, a hook writes a small flag file at every session, so Claude speaks Caveman from the very first message, without you typing `/caveman`.

And a fun fact: a paper from March 2026 ([*Brevity Constraints Reverse Performance Hierarchies in Language Models*](https://arxiv.org/abs/2604.00025)) showed that forcing large models to be concise **improves accuracy by 26 points** on certain benchmarks. Fewer words = sometimes more correct.

---

## Installing caveman mode in Claude Code

A single line. The script detects every installed agent and drops the skill for each one. Node.js 22.13+ required. Safe to run again. The commands below are pinned to version 4.1.0, released on November 8, 2026, the one on the [official install page](https://github.com/JuliusBrussee/caveman/blob/main/INSTALL.md) at the time of this update: check there for the latest version number.

### macOS, Linux, WSL, Git Bash

```bash
curl -fsSL https://raw.githubusercontent.com/JuliusBrussee/caveman/v4.1.0/install.sh | bash
```

### Windows (PowerShell 5.1+)

```powershell
irm https://raw.githubusercontent.com/JuliusBrussee/caveman/v4.1.0/install.ps1 | iex
```

~30 seconds. Agents that are not installed are skipped. To see first what the script would do, without writing anything, replace `| bash` with `| bash -s -- --dry-run`.

### Claude Code only, or just the skill

For Claude Code only, as a plugin:

```bash
claude plugin marketplace add JuliusBrussee/caveman && claude plugin install caveman@caveman
```

Already inside a Claude Code session? Same thing as slash commands: `/plugin marketplace add JuliusBrussee/caveman`, then `/plugin install caveman@caveman`.

And if you only want the short answers, without the rest:

```bash
npx skills add JuliusBrussee/caveman -g
```

### The full CLI, new in version 4

Since version 4.0, the [README](https://github.com/JuliusBrussee/caveman#install){target="_blank" rel="noopener"} highlights another command, which also installs the `caveman` CLI and its proxy (the "rocks", further down):

```bash
npx @caveman-ai/cli@latest
```

It finds your agents and your logins, shows what it will change and waits for you to press Enter. If you had Caveman before 4.0, keep the `@latest`: without it, the old copy on your machine is the one that runs.

**To trigger it**: type `/caveman` or say *"talk like caveman"*. To go back: *"stop caveman"*, *"normal mode"* or `/caveman off`.

> If the installer struggles: open your agent in a copy of the repo and tell it *"Read CLAUDE.md and INSTALL.md, install caveman for me."* The agent fixes its own brain.

**Check**: the Claude Code statusline shows `[CAVEMAN]`. **Update** the plugin with `claude plugin update caveman@caveman` (the short name `caveman` fails), then restart Claude Code.

---

## Grunt levels

Caveman offers three intensities, depending on how much you can take:

| Command | Style |
| --- | --- |
| `/caveman` | Default Caveman, fragments |
| `/ultracave` (or `/caveman ultra`) | Telegraphic, keywords only |
| `/megacave` (or `/caveman wenyan`) | Classical Chinese, even shorter |

Switch on the fly: `/caveman ultra`. The old `lite` and `full` levels have been merged into `/caveman`. `/caveman status` shows the active mode. To pick the mode new sessions start in, put `{"defaultMode": "ultracave"}` in `~/.config/caveman/config.json`.

---

## Useful commands

| Command | Effect |
| --- | --- |
| `/caveman [level]` | Compresses every answer until the end of the session |
| `/caveman-commit` | Conventional Commit messages, subject ≤ 50 characters |
| `/caveman-review` | One-line PR comments: `L42: 🔴 null deref. Guard it.` |
| `/caveman-stats` | Actual token usage for the Claude Code session |
| `/caveman-compress <file>` | Rewrites a memory file (e.g. `CLAUDE.md`) in caveman-speak and keeps a backup. 23 to 49% fewer tokens depending on the file, **on every following session** |
| `/caveman-help` | Every mode and command on one screen |
| `caveman-shrink` | MCP middleware that compresses MCP tool descriptions (optional, at install: `--with-mcp-shrink` followed by the MCP server command) |
| `cavecrew-*` | Caveman sub-agents (investigator, builder, reviewer), so the main context lasts longer |

Claude Code also shows a badge in the statusline with the active mode: `[CAVEMAN]`, `[ULTRACAVE]` or `[MEGACAVE]`.

---

## How many tokens does caveman mode save?

Measurements from the May 2026 README, in real tokens through the Claude API, over 10 prompts: **65% output reduction** on average.

| Task | Normal | Caveman | Saved |
| --- | ---: | ---: | ---: |
| Explain a React re-render bug | 1180 | 159 | **87%** |
| Fix an auth middleware (token expiry) | 704 | 121 | **83%** |
| Set up a PostgreSQL pool | 2347 | 380 | **84%** |
| `git rebase` vs `merge` | 702 | 292 | 58% |
| Refactor callback → async/await | 387 | 301 | 22% |
| Microservices vs monolith | 446 | 310 | 30% |
| Security PR review | 678 | 398 | 41% |
| Docker multi-stage build | 1042 | 290 | 72% |
| Debug a PostgreSQL race condition | 1200 | 232 | 81% |
| React Error Boundary | 3454 | 456 | **87%** |
| **Average** | **1214** | **294** | **65%** |

Careful: this table compares Caveman with Claude given no particular instruction. The project's eval harness, on the other hand, already compared it with the *"Answer concisely"* instruction, a tougher baseline: that's the one the README uses today.

> **Current as of October 2026**: the "75%" in the former title is the promise made by the [May 2026 README](https://github.com/JuliusBrussee/caveman/blob/e843518438b2cfb404edf00db2d8e64c1d975e34/README.md){target="_blank" rel="noopener"} ("~75% of output tokens"), even though its own measurements already showed 65% on average (the table above). The README has since re-run the measurement on a newer model, and the baseline is no longer an answer with no instruction but the *"Answer concisely"* instruction: against it, `/caveman` now only removes 3% more output tokens at the median, and `/ultracave` 35%. New models already know how to be concise. The figure the project highlights today is elsewhere: 33.2% fewer input tokens across whole sessions, thanks to the project's proxy ([source: Caveman README](https://github.com/JuliusBrussee/caveman#the-numbers){target="_blank" rel="noopener"}).

An independent measurement points the same way: over 86 real tasks in Claude Code, JetBrains measured about 8.5% fewer output tokens, with no detectable effect on task success or code quality ([InfoWorld, July 2026](https://www.infoworld.com/article/4193775/talk-like-a-caveman-prompts-save-tokens-but-far-less-than-promised.html){target="_blank" rel="noopener"}).

---

## What you should know

The caveman voice (the skill) only touches **output tokens**. Reasoning tokens (*thinking*) remain intact: Claude thinks as much as before, it just talks less. The real gain is **readability** and **speed** (~3× faster to read). Saving money is the bonus, and it comes at a price: the skill's rules weigh about 1,160 input tokens, and if you pay per request (GitHub Copilot), shorter answers save nothing.

The version 4 CLI goes further and also compresses what the agent **reads** (see below). By default it sends usage stats: commands run, token counts, an install ID, the OS and your IP address, never your prompts or your code. To turn it off: `caveman telemetry off` or `DO_NOT_TRACK=1` ([Privacy section of the README](https://github.com/JuliusBrussee/caveman#privacy){target="_blank" rel="noopener"}). The skill alone sends nothing, except `/caveman-compress`, which sends the file being compressed to your model provider.

Automatic activation at the start of a session: Claude Code, Codex, Gemini CLI, Cursor, Copilot CLI, opencode and a few others (built in). Windsurf, Cline and Copilot in VS Code: add `--with-init` to the install to get always-on rule files. Other agents are triggered case by case with `/caveman` (`$caveman` in Codex without the hook).

---

## Caveman 4: six "rocks" in one install

Julius is pushing a philosophy: *the agent does more with less.* Since version 4.0, it all fits in a single tool, split into six "rocks", all on after installing the CLI and each with its own switch ([README](https://github.com/JuliusBrussee/caveman#six-rocks-one-install){target="_blank" rel="noopener"}):

- **Say less**: the caveman voice, the one in this article
- **Read less**: logs, JSON, CSV and test output compressed before the model reads them, 33.2% fewer input tokens over whole Claude Code sessions, according to the project
- **Auto**: picks the model and the effort for each request; it needs a free account, and your latest requests then go through Caveman Cloud
- **Blocks**: the agent keeps the scripts it writes and reuses them instead of rewriting them
- **Waste fixes**: finds where your tokens go and keeps the prompt cache warm while you pause
- **Browse**: web pages come back compressed

`caveman status` shows what is on, `caveman off browse` turns one rock off. cavemem (shared memory between agents) and cavekit (the spec-driven build loop), presented separately in May, are now frozen: their development continues in the caveman repo. Six rock. One install. That it.

---

## Verdict

If you work with Claude Code daily and find the answers endless, install Caveman. One line, 30 seconds, and your monthly quota can breathe. The explanations stay correct, just without the frills. Read them anyway: pushing without reading is exactly [the limit of vibe coding](/en/20260423-chers-vibe-codeurs-bienvenue-dans-la-realite). Reading them is part of [what AI doesn't replace in a developer](/en/20261016-pourquoi-lia-ne-me-remplacera-pas). And to drive all of this from your phone, there's [Claude Code Remote Control](/en/20260531-claude-dispatch-smartphone-telecommande-claude-code).

Apache-2.0 license since version 3.0.0 (before that: MIT for the skill, BSL for the engine). *Free like mass mammoth on open plain.*

Link: [github.com/JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman)


*Updated October 8, 2026: new install commands (Node.js 22.13+, pinned versions), levels reduced to `/caveman`, `/ultracave` and `/megacave`, updated commands and license (Apache-2.0), and new benchmarks (the "75%" in the title is the May 2026 promise, not a current measurement), based on the project's [README](https://github.com/JuliusBrussee/caveman), [install page](https://github.com/JuliusBrussee/caveman/blob/main/INSTALL.md) and [licensing file](https://github.com/JuliusBrussee/caveman/blob/main/LICENSING.md).*

*Updated November 8, 2026: commands pinned to version 4.1.0, new CLI (`npx @caveman-ai/cli@latest`) and its six "rocks", CLI telemetry, the cost of the skill's rules, cavemem and cavekit frozen, based on the project's [README](https://github.com/JuliusBrussee/caveman){target="_blank" rel="noopener"} and [install page](https://github.com/JuliusBrussee/caveman/blob/main/INSTALL.md){target="_blank" rel="noopener"}; added JetBrains' independent measurement. Correction: the May table compares Caveman with Claude given no instruction, not with the "Answer concisely" instruction. The title no longer quotes a percentage.*

---
*[Jean-Luc Houédanou](https://houedanou.com), less blah-blah, more code. Ooga booga, tiny bill.*
