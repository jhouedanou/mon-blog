---
title: "Claude Code in Caveman mode: 75% fewer tokens, agent talk like caveman"
image: "/images/articles/claude-caveman.webp"
createdAt: "2026-05-15"
updatedAt: "2026-10-08T12:00:00Z"
description: "Caveman makes Claude Code and 30+ other agents talk like a caveman: fewer tokens, same technical accuracy. Installation on Windows, macOS and Linux."
searchIntent: "How to reduce Claude Code's token consumption with the Caveman plugin."
tags: ["tutorial", "dev", "ai"]
---

> *Why use many token when few do trick.*

You pay for Claude by the token. And Claude is a chatterbox. It explains, it rephrases, it compliments you, it prepares a polished introduction before laying down two useful lines of code.

Julius Brussee had enough. He released [Caveman](https://github.com/JuliusBrussee/caveman), a plugin for Claude Code (and 30+ other AI agents) that forces the agent to talk like a caveman. **Brain still big. Mouth small.**

Average result over 10 real prompts, according to the project's README in May 2026: **65% fewer output tokens**, up to 87% on long explanations. Technical accuracy: 100%.

---

## Before / After

**Normal Claude (69 tokens)**:

> "The reason your React component is re-rendering is probably that you are creating a new object reference on every render cycle. When you pass an inline object as a prop, React's shallow comparison sees it as a different object each time, which triggers a re-render. I would recommend using useMemo to memoize the object."

**Caveman Claude (19 tokens)**:

> "New object ref each render. Inline object prop = new ref = re-render. Wrap in useMemo."

Same fix. 75% fewer words. The brain is still there, it is just the mouth that shuts up.

---

## Why it works

Caveman drops a *skill* file into the agent. That skill tells it: no filler, no ceremonial politeness, fragments allowed, code and paths preserved byte for byte.

On Claude Code specifically, a hook writes a small flag file at every session, so Claude speaks Caveman from the very first message, without you typing `/caveman`.

And a fun fact: a paper from March 2026 ([*Brevity Constraints Reverse Performance Hierarchies in Language Models*](https://arxiv.org/abs/2604.00025)) showed that forcing large models to be concise **improves accuracy by 26 points** on certain benchmarks. Fewer words = sometimes more correct.

---

## Installation

A single line. The script detects every installed agent and drops the skill for each one. Node.js 22.13+ required. Safe to run again. The commands below are pinned to version 3.2.0, the one on the [official install page](https://github.com/JuliusBrussee/caveman/blob/main/INSTALL.md) at the time of this update: check there for the latest version number.

### macOS, Linux, WSL, Git Bash

```bash
curl -fsSL https://raw.githubusercontent.com/JuliusBrussee/caveman/v3.2.0/install.sh | bash
```

### Windows (PowerShell 5.1+)

```powershell
irm https://raw.githubusercontent.com/JuliusBrussee/caveman/v3.2.0/install.ps1 | iex
```

~30 seconds. Agents that are not installed are skipped.

### Claude Code only, or just the skill

For Claude Code only, as a plugin:

```bash
claude plugin marketplace add JuliusBrussee/caveman && claude plugin install caveman@caveman
```

And if you only want the short answers, without the rest:

```bash
npx skills add JuliusBrussee/caveman -g
```

**To trigger it**: type `/caveman` or say *"talk like caveman"*. To go back: *"stop caveman"* or *"normal mode"*.

> If the installer struggles: open your agent and tell it *"Read CLAUDE.md and INSTALL.md, install caveman for me."* The agent fixes its own brain.

---

## Grunt levels

Caveman offers three intensities, to pick according to your tolerance:

| Command | Style |
| --- | --- |
| `/caveman` | Default Caveman, fragments |
| `/ultracave` (or `/caveman ultra`) | Telegraphic, keywords only |
| `/megacave` (or `/caveman wenyan`) | Classical Chinese, even shorter |

Switch on the fly: `/caveman ultra`. The old `lite` and `full` levels have been merged into `/caveman`.

---

## Useful commands

| Command | Effect |
| --- | --- |
| `/caveman [level]` | Compresses every answer until the end of the session |
| `/caveman-commit` | Conventional Commit messages, subject ≤ 50 characters |
| `/caveman-review` | One-line PR comments: `L42: 🔴 bug: user null. Add guard.` |
| `/caveman-stats` | Actual token usage for the Claude Code session |
| `/caveman-compress <file>` | Rewrites a memory file (e.g. `CLAUDE.md`) in caveman-speak and keeps a backup. 23 to 49% fewer tokens depending on the file, **on every following session** |
| `/caveman-help` | Every mode and command on one screen |
| `caveman-shrink` | MCP middleware that compresses MCP tool descriptions (optional: `--with-mcp-shrink` at install) |
| `cavecrew-*` | Caveman sub-agents (investigator, builder, reviewer), so the main context lasts longer |

Claude Code also shows a badge in the statusline with the active mode: `[CAVEMAN]`, `[ULTRACAVE]` or `[MEGACAVE]`.

---

## Benchmarks (real tokens, Claude API)

Average over 10 prompts: **65% output reduction**.

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

The eval harness is honest: it compares Caveman against *"Answer concisely"* (not against the default verbose mode), so the delta is real.

> **Current as of October 2026**: the "75%" in the title is the promise made by the [May 2026 README](https://github.com/JuliusBrussee/caveman/blob/e843518438b2cfb404edf00db2d8e64c1d975e34/README.md){target="_blank" rel="noopener"} ("~75% of output tokens"), even though its own measurements already showed 65% on average (the table above). The README has since re-run the measurement on a newer model, and the baseline is no longer an answer with no instruction but the *"Answer concisely"* instruction: against it, `/caveman` now only removes 3% more output tokens at the median, and `/ultracave` 35%. New models already know how to be concise. The figure the project highlights today is elsewhere: 33.2% fewer input tokens across whole sessions, thanks to the project's proxy ([source: Caveman README](https://github.com/JuliusBrussee/caveman#the-numbers){target="_blank" rel="noopener"}).

---

## What you should know

Caveman only touches **output tokens**. Reasoning tokens (*thinking*) remain intact: Claude thinks as much as before, it just talks less. The real gain is **readability** and **speed** (~3× faster to read). Saving money is the bonus.

Automatic activation at the start of a session: Claude Code, Codex, Gemini, Cursor and Copilot CLI (built in). Windsurf, Cline and Copilot in VS Code: add `--with-init` to the install to get always-on rule files. Other agents are triggered case by case with `/caveman` (`$caveman` in Codex without the hook).

---

## The Caveman ecosystem

Julius is pushing a philosophy: *the agent does more with less.* Three complementary tools:

- **caveman**: compresses what the agent **says** (this article)
- **cavemem**: shared memory between agents, why forget when you can remember
- **cavekit**: spec-driven build loop, why guess when you can know

Put together: `cavekit` drives the build, `caveman` compresses the output, `cavemem` compresses the memory. One rock. Two rock. Three rock. That it.

---

## Verdict

If you work with Claude Code daily and find the answers endless, install Caveman. One line, 30 seconds, and your monthly quota can breathe. The explanations stay correct, just without the frills. And to drive all of this from your phone, see [Claude Dispatch](/en/20260531-claude-dispatch-smartphone-telecommande-claude-code).

Apache-2.0 license since version 3.0.0 (MIT before). *Free like mass mammoth on open plain.*

Link: [github.com/JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman)


*Updated October 8, 2026: new install commands (Node.js 22.13+, pinned versions), levels reduced to `/caveman`, `/ultracave` and `/megacave`, updated commands and license (Apache-2.0), and new benchmarks (the "75%" in the title is the May 2026 promise, not a current measurement), based on the project's [README](https://github.com/JuliusBrussee/caveman), [install page](https://github.com/JuliusBrussee/caveman/blob/main/INSTALL.md) and [licensing file](https://github.com/JuliusBrussee/caveman/blob/main/LICENSING.md).*

---
*[Jean-Luc Houédanou](https://houedanou.com), less blah-blah, more code. Ooga booga, tiny bill.*
