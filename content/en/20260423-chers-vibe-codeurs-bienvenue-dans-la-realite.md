---
title: "Limits of vibe coding: welcome to the NBA"
image: "/images/articles/welcomeToTheNBA.webp"
createdAt: "2026-04-23"
description: "The limits of vibe coding on Claude Code: access to the game without paying the price of the trade, Bronny James style. And Anthropic's April 2026 soap opera."
searchIntent: "Does vibe coding really let you build software without mastering the fundamentals of the developer's trade?"
tags: ["development", "AI", "Claude Code", "Anthropic", "vibe coding", "opinion"]
---

The limits of vibe coding, on Claude Code or anywhere else, fit into a single basketball play.

## The "Welcome to the NBA" moment

In October 2024, Bronny James, 20 years old, son of one of the greatest basketball players of all time, goes up for a dunk on Kevin Durant. 
KD blocks him. 
Violently. 
The commentators call it a *welcome to the league moment*, "Welcome to the NBA, kid", that moment when you realise the real level has nothing to do with what you imagined.

Bronny is currently averaging 2.9 points, 0.5 rebounds and 1.2 assists per game in the regular season, over 42 games played. Those are end-of-bench numbers. The kid has room to grow, no question, he's young, athletic, he's got the DNA. But if he's on the Lakers roster, it's first and foremost because LeBron James put pressure on the franchise to play alongside his son. If Bronny were called Bronny Smith (instead of James), he'd be in the G-League at South Bay and nobody would be talking about him.

And if the talent doesn't follow, if his progress stalls, if his surname is still the only argument, Bronny will have a Smush Parker career. Smush was the starting point guard for the Lakers in 2005-2007, 9 points per game career average, 5 seasons, 6 teams, then off to China and into oblivion. The kind of player who, by Smush's own account, was told by Kobe that he "wasn't allowed to speak to him".

You can see where I'm going with this.

## The vibe coder arrives with privileged access

With vibe coding, you arrive in the "game" with privileged access, thanks to Claude Code, GPT or Copilot. You generate code by typing prompts in plain language, you get a result that looks functional and you deploy. 

You introduce yourself as a developer.

Except your *welcome to the NBA moment* comes sooner or later. The day the server goes down at 11pm. The day a security audit reveals gaping holes. The day the client asks why their database is 40 GB for 200 users. The day you have to debug without AI because the problem is too specific for a prompt.

Or the day you've burned through all the credits on your plan.

## What I do with Claude Code (and what I don't do)

I've been coding for over ten years. I went through Udemy, OpenClassrooms (back when it was still called Site du Zéro), Grafikart's PHP tutorials, sleepless nights on segfaults without Stack Overflow. I did manual FTP on OVH shared servers at 3 euros a month. I migrated projects from jQuery to Vue, from Vue 2 to Vue 3, from Nuxt 2 to Nuxt 3. I debugged merge conflicts at 2am on a Sunday. 

**Anyway. I learned to code before vibe coding existed.**

And today, yes, I use Claude Code every day. It has let me one-shot the most complex Laravel projects of my career, gamification systems, SaaS platforms, API integrations that would have taken me two weeks to build.

What I don't do:

I don't touch Skills or agents. Just like this blog you're reading, I write the code myself first (the structure, the logic, the architecture) and then I have Claude Code fix and optimise it. 

**The AI proofreads my code, it doesn't write it for me.** 


I know what I want to get before I open the terminal, I know why a given middleware is there and why a given Eloquent relation is a `hasMany` and not a `belongsToMany`. Claude Code speeds up my work without replacing it.

Vibe coders do the opposite. They start from a prompt, grab the result, look at neither the code nor its quality, and push to prod, without knowing what they deployed or understanding why it works. 

And the day it stops working, because that day always comes, they're lost.

## Vibe coders are the plague of this profession

I'll say it plainly: **vibe coders are the plague of this profession.**

Everyone should use AI, and that's not what I hold against them. What I hold against them is that they confuse *generating code* with *knowing how to code*. They've never had [bugs that made them cry](/en/20260707-je-suis-encore-vivant). They've never spent an entire weekend figuring out why a `float` was breaking a whole layout. They've never had to explain to a client why [migrating PrestaShop to a new domain](/en/20260331-migrer-prestashop-nouveau-nom-de-domaine) would take a day and not three hours.

They do everything with prompts, without looking at the code, without checking its quality and without understanding the implications of what was generated.

It's as if Bronny James scored 30 points in a friendly against middle schoolers and declared himself better than Kobe, when context matters, and so do adversity and the experience of failure.

## Meanwhile, at Anthropic...

And as if all that weren't enough, Anthropic, the company that makes Claude Code, keeps piling up blunders. A little recap of April 2026 for those not following along:

**The source code leak.** 


On 31 March, Anthropic accidentally published the entire source code of Claude Code through a source map file left behind in an npm package, that is 500,000 lines of TypeScript and 1,906 files. Within hours, the code was mirrored on GitHub and forked tens of thousands of times. 

**The nerfing, then the Opus 4.7 fiasco.** 

Opus 4.6 was quietly degraded for weeks, with shorter answers, poor instruction following and refusals on legitimate requests. A senior director at AMD wrote that "Claude has regressed to the point where it can no longer be trusted with complex engineering". Opus 4.7, released on 16 April to set things right, made matters worse with a new tokenizer that inflates consumption by 35%, API bugs, and "adaptive reasoning" that reasons less. Pro subscribers were hitting their limit after 3 questions.

**Removing Claude Code from the Pro plan.**

On 21 April, without any announcement, Anthropic removed Claude Code from the $20/month plan on its pricing page. A dash where there used to be a checkmark. 
The documentation was quietly edited. When the community reacted, the Head of Growth talked about a "test on 2% of new sign-ups", except the public pages had been changed for everyone.

Needless to say, over at the competition, OpenAI, the jokes started flying.

**And the removal of Opus 4.5.** On Reddit, posts from Opus 4.5 fans keep piling up (*"sad"*, *"heartbroken"*). Many considered it the most reliable model, and it was retired without ceremony.

A leak of vibe-coded source code, nerfed performance, opaque pricing and disastrous communication, for a company that sells itself as "the responsible AI lab", that's quite a blow.

## The barrier to entry is a good thing

There. 
I said it. Deep down, I think it's a good thing there's a barrier to entry in this trade.

I refuse to live in a world where anyone can code an application in a day's work and claim to be a developer. Just as I refuse to believe Bronny James deserves his spot in the NBA because his father is LeBron.

Room for growth exists, for Bronny as much as for vibe coders. Bronny can put in the work, improve his shot (his three-pointer especially, the kid has a great vertical, but his jumpshot is horrible), work on his defence, and become a respectable NBA player. Vibe coders can learn the fundamentals, understand what the AI generates and become real developers.

But if they settle for being there thanks to an advantage they didn't earn (LeBron's name for one, Claude Code's prompts for the others), without ever putting in the work needed to understand the game, then their career will end like Smush Parker's and nobody will remember their name.

## And for us old-timers?

[Experienced developers are going to become more valuable](/en/20261016-pourquoi-lia-ne-me-remplacera-pas). When everyone can generate code, the value shifts to those who can **tell good code from code that looks good**, architect a system that holds up at scale, debug when the AI hallucinates and make technical decisions that aren't in the prompt.

And for developers like me, based in Abidjan, paying in dollars with income in CFA francs, if Anthropic moves Claude Code from $20 to $100, that's going from 12,000 to 60,000 FCFA a month. Many African developers won't be able to justify that expense.

## To vibe coders and to Anthropic

To the weekend vibe coders, your *welcome to the NBA moment* is coming, so get ready.

And to Anthropic, pull yourselves together. We chose you because you were supposed to be the responsible adults of this industry, and you quietly edit your pricing pages at 5pm on a Tuesday.

---
*[Jean-Luc Houédanou](https://houedanou.com). By the way... who would win in a one-on-one between Smush Parker and J Cole?*
