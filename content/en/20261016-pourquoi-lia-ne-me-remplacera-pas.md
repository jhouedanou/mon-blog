---
title: "Will AI replace developers? Not me"
createdAt: "2026-10-16T01:00:00Z"
image: "/images/articles/pexels-tara-winstead-8386435.webp"
description: "Will AI replace developers? I refused AI for a long time. Then a hack forced us to vibe code an app with Claude, and the technical debt followed."
searchIntent: "Will AI replace developers? A developer's experience: emergency vibe coding with Claude, technical debt, and everyday uses of AI."
tags: ["AI", "development", "opinion", "linux", "omarchy"]
---

Will AI replace developers? It won't replace me, anyway. But before I say why, I need to say what it is.

## What is AI?

Claude, ChatGPT and Gemini are language models, programs that have read a huge amount of text: books, websites and a lot of code.

When you write to them, they work out the most likely next words, word after word.

That's all they do, but since they have read almost everything, they are often right, they write code that works and they explain an error message better than a forum.

But a language model doesn't know what you want, it gives you what looks most like your request. It doesn't know your client, your server or your project, unless you explain them, and when it's wrong, it sounds just as sure as when it's right.

Keep that in mind, because the rest of this post will show it.

## I was a holdout

For a long time, I didn't want AI, and to GitHub Copilot, Cursor or Windsurf, I said no thanks.

I was afraid it would make me worse and do the work for me, because I spent years learning my job and I didn't want to lose it. I wrote about it in [my review after a year of AI](/en/20250604-liaetmoi).

Then I tried Claude. I asked it precise questions, I used it for debugging, I kept control of the code, and it worked well.

But I refused to hand it a whole application, and I watched [vibe coding](/en/20260423-chers-vibe-codeurs-bienvenue-dans-la-realite) from a distance and thought the worst of it.

Then reality caught up with me.

## The day we had to vibe code

A former colleague hacked our GitLab and deleted the database of one of our applications.

We had no time to do things right, we needed a mobile app, and fast. So we did what I had refused to do, we vibe coded in a rush with Claude Sonnet.

At the time, it bailed us out.

![A person in a hoodie, seen from behind, in front of several screens full of code](/images/articles/pexels-julio-lopez-34258667.webp)

## What it cost us

The technical debt that followed was huge.

Technical debt is the extra work that today's shortcuts demand tomorrow, and we had taken nothing but shortcuts. The code was written fast, with no overall plan, and nobody on the team had thought it through.

So we had to rewrite a good part of the app.

Some will say that with Fable, the most powerful model Anthropic offers the public, it would have been better. Maybe it would have done better than Sonnet, but nothing guarantees it. A better model writes better code, but it's no better at guessing what you want, and in the rush, even we didn't know what we wanted.

## AI is useful

I won't lie, I use it every day.

**For my niece.** I prepare her revision guides with AI, which often explains things better than I do. I already said so the year of her primary school exam, writing about [AI and her maths homework](/en/20250604-liaetmoi).

**For debugging.** I paste the error message, explain the context and we look for the cause together. AI doesn't always find it, but it's faster than reading answers from 2014 on a forum.

**For the tedious jobs.** Filling in the frontmatter of my posts, finding images on Pexels like the ones in this post, rewording an email to a difficult colleague, none of it is exciting. AI does it, I check, and I move on.

![A schoolgirl doing her homework at a table, next to an alarm clock](/images/articles/pexels-gabby-k-5200784.webp)

## Linux with Omarchy and Claude

And then there's Omarchy, DHH's Linux distribution, which I [installed on my old 2017 MacBook Pro](/en/20261013-retournement-de-veste-omarchy-macbook-pro-2017). Yes, after [swearing I would never touch Omarchy](/en/20261008-omarchy-dhh-homme-dotfiles), I know.

I've never been this happy on Linux, something years of forums never managed. Linux didn't get any simpler, but Claude solves all my problems. When I have no sound, it finds the right driver, when Bluetooth isn't working well, it gives me the commands to try, and a Matrix theme all the way to the boot screen, we built that together.

Before, a bug on Linux meant a lost evening, whereas now I paste the error message into the terminal and it's often fixed a few minutes later.

![A sticker of Tux, the Linux mascot, on an ice cube tray](/images/articles/pexels-realtoughcandy-11034131.webp)

## So, will AI replace developers?

Maybe one day an AI will be able to write a whole application, clean, with no technical debt, and I'm not going to make predictions about it.

But look at what cost us dearly. Sonnet wrote the code fast, and what costs a lot is the rest:

- knowing what you want to build;
- checking what the AI wrote;
- understanding the code six months later;
- [being there when it breaks](/en/20260707-je-suis-encore-vivant), including when a former colleague decides to delete everything.

One day, an AI may be able to decide what to build, say no to a client and fix the debt it created. That day, maybe we won't need developers anymore, but we'll still need someone who understands the code, whether we call them a developer or something else.

In the meantime, AI makes me faster without replacing me, and the developer whose job is at risk is the one who refuses AI. I should know, it was me.

_Photos: [Tara Winstead](https://www.pexels.com/@tara-winstead/){target="_blank" rel="noopener"}, [Julio Lopez](https://www.pexels.com/@julio-lopez-75309646/){target="_blank" rel="noopener"}, [Monstera Production](https://www.pexels.com/@gabby-k/){target="_blank" rel="noopener"} and [RealToughCandy.com](https://www.pexels.com/@realtoughcandy/){target="_blank" rel="noopener"}, on Pexels._

---
*[Jean-Luc Houédanou](https://houedanou.com)*
