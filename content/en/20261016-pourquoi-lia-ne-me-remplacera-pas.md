---
title: "Why AI won't replace me (and why I can't do without it anymore)"
createdAt: "2026-10-16T01:00:00Z"
draft: true
image: "/images/articles/pexels-tara-winstead-8386435.webp"
description: "I refused AI for a long time. Then a hack forced us to vibe code an app with Claude. The technical debt followed. Why AI won't replace me."
searchIntent: "Will AI replace developers? A developer's experience: emergency vibe coding with Claude, technical debt, and everyday uses of AI."
tags: ["AI", "development", "opinion", "linux", "omarchy"]
---

Before I say why AI won't replace me, I need to say what it is.

## What is AI?

Claude, ChatGPT and Gemini are language models. They are programs. They have read a huge amount of text: books, websites and a lot of code.

When you write to them, they work out the most likely next words. Word after word.

That's all. And that's already a lot. Since they have read almost everything, they are often right. They write code that works. They explain an error message better than a forum.

But a language model doesn't know what you want. It gives you what looks most like your request. It doesn't know your client. It doesn't know your server. It doesn't know your project, unless you explain it. And when it's wrong, it sounds just as sure as when it's right.

Keep that in mind. The rest of this post will show it.

## I was a holdout

For a long time, I didn't want AI. GitHub Copilot, Cursor, Windsurf: no thanks.

I was afraid it would make me worse. I was afraid it would do the work for me. I spent years learning my job. I didn't want to lose it. I wrote about it in [my review after a year of AI](/en/20250604-liaetmoi).

Then I tried Claude. I asked it precise questions. I used it for debugging. I kept control of the code. It worked well.

But I refused to hand it a whole application. I watched vibe coding from a distance. And I thought [everything bad about it](/en/20260423-chers-vibe-codeurs-bienvenue-dans-la-realite).

Then reality caught up with me.

## The day we had to vibe code

A former colleague hacked our GitLab. He deleted the database of one of our applications.

We had no time to do things right. We needed a mobile app, and fast. So we did what I had refused to do. We vibe coded, in a rush, with Claude Sonnet.

At the time, it got us by.

![A person in a hoodie, seen from behind, in front of several screens full of code](/images/articles/pexels-julio-lopez-34258667.webp)

## The bill came later

Then the technical debt was huge.

Technical debt is the price of shortcuts. A quick fix today means extra work tomorrow. And we had taken nothing but shortcuts. The code was written fast. There was no overall plan. Nobody on the team had really thought it through.

The result: we had to rewrite a good part of the app.

Some will say: with Fable, it would have been better. Fable is the most powerful model Anthropic offers the public. Maybe it would have done better than Sonnet. But nothing guarantees it. A better model writes better code. But it doesn't guess better what you want. And in the rush, even we didn't know what we wanted.

## AI is useful. Really.

I won't lie: I use it every day.

**For my niece.** I prepare her revision guides with AI. It often explains things better than I do. [I already said so](/en/20250604-liaetmoi) the year of her primary school exam.

**For debugging.** I paste the error message. I explain the context. And we look for the cause together. AI doesn't always find it. But it's faster than reading answers from 2014 on a forum.

**For the tedious jobs.** Filling in the frontmatter of my posts. Finding images on Pexels, like the ones in this post. Rewording an email to a difficult colleague. It's not exciting. AI does it, I check, and I move on.

![A schoolgirl doing her homework at a table, next to an alarm clock](/images/articles/pexels-gabby-k-5200784.webp)

## Omarchy: I've never been this happy on Linux

And then there's Omarchy, DHH's Linux distribution. I [installed it on my old 2017 MacBook Pro](/en/20261013-retournement-de-veste-omarchy-macbook-pro-2017). Yes, after swearing I would never touch it. [I know](/en/20261008-omarchy-dhh-homme-dotfiles).

I've never been this happy on Linux. Linux didn't get simpler. Claude solves all my problems. No sound? Claude finds the right driver. Bluetooth not working well? Claude gives me the commands to try. A Matrix theme all the way to the boot screen? We built it together.

Before, a bug on Linux meant a lost evening. Now I paste the error message into the terminal. And often, a few minutes later, it's fixed.

AI hasn't replaced me. It made me happy on Linux. Years of forums never managed that.

![A sticker of Tux, the Linux mascot, on an ice cube tray](/images/articles/pexels-realtoughcandy-11034131.webp)

## So, will AI replace developers?

Maybe. One day, an AI may be able to write a whole application, clean, with no technical debt. I'm not going to play fortune teller.

But look at what cost us. It wasn't writing the code. Sonnet wrote it fast. What costs a lot is the rest:

- knowing what you want to build;
- checking what the AI wrote;
- understanding the code six months later;
- being there when it breaks.

Even when a former colleague decides to delete everything.

An AI works out the most likely next words. One day, it may be able to decide what to build. It may be able to say no to a client. It may be able to fix the debt it created. That day, maybe we won't need developers anymore. But we'll still need someone who understands the code. We'll call them a developer, or something else.

In the meantime, AI isn't replacing me. It makes me faster. The developer whose job is at risk is the one who refuses AI. I know something about that: it was me.

_Photos: [Tara Winstead](https://www.pexels.com/@tara-winstead/){target="_blank" rel="noopener"}, [Julio Lopez](https://www.pexels.com/@julio-lopez-75309646/){target="_blank" rel="noopener"}, [Monstera Production](https://www.pexels.com/@gabby-k/){target="_blank" rel="noopener"} and [RealToughCandy.com](https://www.pexels.com/@realtoughcandy/){target="_blank" rel="noopener"}, on Pexels._

---
*[Jean-Luc Houédanou](https://houedanou.com) — former holdout, not replaced yet*
