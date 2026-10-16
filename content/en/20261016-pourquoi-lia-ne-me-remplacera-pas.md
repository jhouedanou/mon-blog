---
title: "Why AI won't replace me (and why I can't do without it anymore)"
createdAt: "2026-10-16T01:00:00Z"
draft: true
image: "/images/articles/pexels-tara-winstead-8386435.webp"
description: "I refused AI for a long time. Then a hack forced us to vibe code an app with Claude, and the technical debt followed. Why AI won't replace me."
searchIntent: "Will AI replace developers? A developer's experience: emergency vibe coding with Claude, technical debt, and everyday uses of AI."
tags: ["AI", "development", "opinion", "linux", "omarchy"]
---

Before explaining why AI won't replace me, I need to say what it is.

## What is AI?

Claude, ChatGPT and Gemini are language models. They are programs trained on huge amounts of text: books, websites, and a lot, a lot of code. From what you write to them, they work out the most likely continuation. Word after word.

That's all. And that's already huge. Having read almost everything ever written, they get it right most of the time. They write code that runs, and they explain an error message better than a forum.

But a language model doesn't know what you want. It knows what looks most like what you asked for. It doesn't know your client, your server or the history of your project, unless you give them to it. And when it's wrong, it's wrong with the same confidence as when it's right.

Keep that in mind. The rest of this post will show it.

## I was a holdout

For a long time, I wanted nothing to do with it. GitHub Copilot, Cursor, Windsurf: no thanks. I was afraid AI would make me worse, do the work for me and pull me away from a craft I spent years learning. I wrote about it in [my review after a year of AI](/en/20250604-liaetmoi).

Then I tried Claude. For precise questions, for debugging, keeping control of the code. It worked well. But I still refused to hand it a whole application. I watched vibe coding from a distance, and I thought [everything bad about it](/en/20260423-chers-vibe-codeurs-bienvenue-dans-la-realite).

Then reality caught up with me.

## The day we had to vibe code

A former colleague hacked our GitLab. He deleted the database behind one of our applications.

No time to do things properly. We needed a mobile app, and fast. So we did what I had refused to do: vibe coding, in a rush, with Claude Sonnet.

At the time, it got us out of a dead end.

![A person in a hoodie, seen from behind, in front of several screens full of code](/images/articles/pexels-julio-lopez-34258667.webp)

## The bill came later

Behind it, the technical debt was huge.

For those outside the trade, technical debt is the price of shortcuts. Every quick fix you take today, you pay back tomorrow, with interest. And we had taken nothing but shortcuts: code written fast, with no overall plan, that nobody on the team had really thought through.

The result: we had to rewrite a good part of the app.

And before anyone says it: maybe Fable, the most powerful model Anthropic offers the public, would have done better than Sonnet. Nothing guarantees it. A better model writes better code, but it doesn't guess any better what you want when you don't know it yourself. And in the rush, we didn't.

## AI is useful. Really.

I won't pretend: I use it every day.

**For my niece.** I now prepare her revision guides with AI. It often explains things better than I do, [as I already admitted](/en/20250604-liaetmoi) back when she took her primary school exam.

**For debugging.** I paste the error message, explain the context, and we look for the cause together. It doesn't always find it, but it's faster than reading answers from 2014 on a forum.

**For the tedious jobs.** Filling in the frontmatter of my posts, finding images on Pexels (like the ones in this post), rewording an email to a difficult colleague. None of it is exciting. AI does it, I check, I move on.

![A schoolgirl doing her homework at a table, next to an alarm clock](/images/articles/pexels-gabby-k-5200784.webp)

## Omarchy: I've never been this happy on Linux

And then there's Omarchy, DHH's Linux distribution, which I [installed on my old 2017 MacBook Pro](/en/20261013-retournement-de-veste-omarchy-macbook-pro-2017). After swearing I would never touch it, [I know](/en/20261008-omarchy-dhh-homme-dotfiles).

I have never been this happy working on Linux. Not because Linux got simpler. Because Claude literally solves all my problems. No sound? Claude finds the right driver. Bluetooth acting up? Claude suggests the commands to try. A Matrix theme all the way to the boot screen? Claude built it with me.

Before, a bug on Linux meant a lost evening. Now it's an error message pasted into the terminal and a few minutes of back and forth.

AI hasn't replaced me. It has made me a happy Linux user. Years of forums never managed that.

![A sticker of Tux, the Linux mascot, on an ice cube tray](/images/articles/pexels-realtoughcandy-11034131.webp)

## So, will AI replace developers?

Maybe. Maybe in a few versions, an AI will be able to write a whole application, clean, with no technical debt. I'm not going to play fortune teller.

But look at what cost us. It wasn't writing the code: Sonnet wrote it fast. It was everything else. Knowing what to build. Checking what comes out. Understanding the code six months later. And being there when it breaks, including when a former colleague decides to delete everything.

An AI works out the most likely continuation of what you ask it. The day it can also decide what to ask, say no to a client and own the debt it created, we'll talk again. That day, maybe we won't need developers anymore. But we'll still need someone who understands the code, whether we call them a developer or something else.

In the meantime, AI isn't replacing me. It makes me faster. The developer whose job is at risk is the one who holds out. I know something about that: it was me.

_Photos: [Tara Winstead](https://www.pexels.com/@tara-winstead/){target="_blank" rel="noopener"}, [Julio Lopez](https://www.pexels.com/@julio-lopez-75309646/){target="_blank" rel="noopener"}, [Monstera Production](https://www.pexels.com/@gabby-k/){target="_blank" rel="noopener"} and [RealToughCandy.com](https://www.pexels.com/@realtoughcandy/){target="_blank" rel="noopener"}, on Pexels._

---
*[Jean-Luc Houédanou](https://houedanou.com) — former holdout, not replaced yet*
