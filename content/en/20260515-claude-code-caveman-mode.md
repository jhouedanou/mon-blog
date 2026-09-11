---
title: "Claude Code in Caveman mode: 75% fewer tokens, agent talk like caveman"
image: "/images/articles/claude-caveman.webp"
createdAt: "2026-05-15"
description: "The Caveman plugin makes Claude Code (and 30+ other agents) talk like a caveman: 65 to 75% fewer tokens, technical accuracy intact. Installation on Windows, macOS and Linux."
searchIntent: "How to reduce Claude Code's token consumption with the Caveman plugin."
tags: ["tutorial", "dev", "ai"]
---

# Claude Code in Caveman mode: 75% fewer tokens, agent talk like caveman

> *Why use many token when few do trick.*

You pay for Claude by the token. And Claude is a chatterbox. It explains, it rephrases, it compliments you, it prepares a polished introduction before laying down two useful lines of code.

Julius Brussee had enough. He released [Caveman](https://github.com/JuliusBrussee/caveman), a plugin for Claude Code (and 30+ other AI agents) that forces the agent to talk like a caveman. **Brain still big. Mouth small.**

Average result over 10 real prompts: **65% fewer output tokens**, up to 87% on long explanations. Technical accuracy: 100%.

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

And a fun fact: a paper from March 2026 (*Brevity Constraints Reverse Performance Hierarchies in Language Models*) showed that forcing large models to be concise **improves accuracy by 26 points** on certain benchmarks. Fewer words = sometimes more correct.

---

## Installation

A single line. The script detects every installed agent and drops the skill for each one. Node ≥18 required. Safe to run again.

### macOS, Linux, WSL, Git Bash

```bash
curl -fsSL https://raw.githubusercontent.com/JuliusBrussee/caveman/main/install.sh | bash
```

### Windows (PowerShell 5.1+)

```powershell
irm https://raw.githubusercontent.com/JuliusBrussee/caveman/main/install.ps1 | iex
```

~30 seconds. Agents that are not installed are skipped.

**To trigger it**: type `/caveman` or say *"talk like caveman"*. To go back: *"normal mode"*.

> If the installer struggles: open your agent and tell it *"Read CLAUDE.md and INSTALL.md, install caveman for me."* The agent fixes its own brain.

---

## Grunt levels

Caveman offers several intensities, to pick according to your tolerance:

| Level | Style |
| --- | --- |
| `lite` | Removes filler, normal sentences |
| `full` | Default Caveman, fragments |
| `ultra` | Telegraphic, keywords only |
| `wenyan` | Classical Chinese, even shorter |

Switch on the fly: `/caveman ultra`.

---

## Useful commands

| Command | Effect |
| --- | --- |
| `/caveman [level]` | Compresses every answer until the end of the session |
| `/caveman-commit` | Conventional Commit messages, subject ≤ 50 characters |
| `/caveman-review` | One-line PR comments: `L42: 🔴 bug: user null. Add guard.` |
| `/caveman-stats` | Tokens saved this session + lifetime total + USD equivalent |
| `/caveman-compress <file>` | Rewrites a memory file (e.g. `CLAUDE.md`) in caveman-speak. ~46% fewer input tokens **on every following session** |
| `caveman-shrink` | MCP middleware that compresses MCP tool descriptions |
| `cavecrew-*` | Caveman sub-agents (investigator, builder, reviewer), so the main context lasts longer |

Claude Code also shows a badge in the statusline: `[CAVEMAN] ⛏ 12.4k` (lifetime tokens saved). Can be turned off with `CAVEMAN_STATUSLINE_SAVINGS=0`.

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

---

## What you should know

Caveman only touches **output tokens**. Reasoning tokens (*thinking*) remain intact: Claude thinks as much as before, it just talks less. The real gain is **readability** and **speed** (~3× faster to read). Saving money is the bonus.

Automatic activation at the start of a session: Claude Code, Codex, Gemini (built in). Cursor, Windsurf, Cline, Copilot: add `--with-init` to the install to get always-on rule files. Other agents are triggered case by case with `/caveman`.

---

## The Caveman ecosystem

Julius is pushing a philosophy: *the agent does more with less.* Three complementary tools:

- **caveman**: compresses what the agent **says** (this article)
- **cavemem**: shared memory between agents, why forget when you can remember
- **cavekit**: spec-driven build loop, why guess when you can know

Put together: `cavekit` drives the build, `caveman` compresses the output, `cavemem` compresses the memory. One rock. Two rock. Three rock. That it.

---

## Verdict

If you work with Claude Code daily and find the answers endless, install Caveman. One line, 30 seconds, and your monthly quota can breathe. The explanations stay correct, just without the frills.

MIT license. *Free like mass mammoth on open plain.*

Link: [github.com/JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman)

---
*Jean Luc Houédanou, less blah-blah, more code. Ooga booga, tiny bill.*
