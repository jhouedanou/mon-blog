---
title: "Dear Vibe Coders (on Claude Code): welcome to reality"
image: "/images/articles/welcomeToTheNBA.webp"
createdAt: "2026-04-23"
description: "Vibe coding is the Bronny James of software development: privileged access to the game thanks to Claude Code, without having paid the price of the trade. An unfiltered take, with the April 2026 Anthropic soap opera as a bonus."
searchIntent: "Does vibe coding really let you build software without mastering the fundamentals of the developer's trade?"
tags: ["development", "AI", "Claude Code", "Anthropic", "vibe coding", "opinion"]
---

# Dear Vibe Coders (on Claude Code): welcome to reality

## The "Welcome to the NBA" moment

In October 2024, Bronny James, 20 years old, son of one of the greatest basketball players of all time, goes up for a dunk on Kevin Durant. 
KD blocks him. 
Violently. 
The commentators call it a *welcome to the league moment*. "Welcome to the NBA, kid." That moment when you realise the real level has nothing to do with what you imagined.

Bronny is currently averaging 2.9 points, 0.5 rebounds and 1.2 assists per game in the regular season. 42 games played. End-of-bench numbers. The kid has room to grow, no question. He is young, athletic, he has the DNA. But let's be honest: if he is on the Lakers roster, it is first and foremost because LeBron James put pressure on the franchise to play alongside his son. If Bronny were called Bronny Smith (instead of James), he would be in the G-League at South Bay and nobody would be talking about him.

And if it carries on like this, if the talent does not follow, if the progress stalls, if the only argument is the surname, Bronny will have a Smush Parker career. Remember Smush? Starting point guard for the Lakers in 2005-2007, 9 points per game career average, 5 seasons, 6 teams, then off to China and into oblivion. The kind of player Kobe said "wasn't allowed to speak to him".

You can see where I am going with this.

## Vibe coding is the Bronny James of software development

That is what vibe coding is. You arrive in the "game" with privileged access, not thanks to LeBron, but thanks to Claude Code, GPT, Copilot. You generate code by typing prompts in plain language. You get a result that looks functional. You deploy. 

You introduce yourself as a developer.

Except your *welcome to the NBA moment* comes sooner or later. The day the server goes down at 11pm. The day a security audit reveals gaping holes. The day the client asks why their database is 40 GB for 200 users. The day you have to debug without AI because the problem is too specific for a prompt.

Or the day you have burned through all the credits on your plan.

And there, like Bronny facing KD, you realise the real level has nothing to do with what you imagined.

## What I do (and what I don't do)

I have been coding for over ten years. I went through Udemy, OpenClassrooms (back when it was still called Site du Zéro), Grafikart's PHP tutorials, sleepless nights on segfaults without Stack Overflow. I did manual FTP on OVH shared servers at 3 euros a month. I migrated projects from jQuery to Vue, from Vue 2 to Vue 3, from Nuxt 2 to Nuxt 3. I debugged merge conflicts at 2am on a Sunday. 

**In short: I learned to code before vibe coding existed.**

And today, yes, I use Claude Code. Every day. It has let me one-shot the most complex Laravel projects of my career: gamification systems, SaaS platforms, API integrations that would have taken me two weeks to build.

What I don't do:

I don't touch Skills or agents. Just like this blog you are reading, I write the code myself first, the structure, the logic, the architecture, and then I have Claude Code fix and optimise it. 

**The AI is my proofreader, not my author.** 


I know what I want to get before I open the terminal. I know why a given middleware is there. I know why a given Eloquent relation is a `hasMany` and not a `belongsToMany`. Claude Code speeds up my work. It does not replace it.

Vibe coders? They do the opposite. They start from a prompt, grab the result, don't even look at the code or its quality, and push to prod. They don't know what they deployed. They don't understand why it works. 

And the day it stops working, because that day always comes, they are lost.

## Vibe coders are the plague of this profession

I will say it plainly: **vibe coders are the plague of this profession.**

Not because they use AI. Everyone should use AI. But because they confuse *generating code* with *knowing how to code*. Because they have never had bugs that made them cry. Because they have never spent an entire weekend figuring out why a `float` was breaking a whole layout. Because they have never had to explain to a client why migrating PrestaShop to a new domain would take a day and not three hours.

They get everything with prompts. Without looking at the code. Without checking the quality. Without understanding the implications or the quality of what was generated.

It is as if Bronny James scored 30 points in a friendly against middle schoolers and declared himself better than Kobe. Context matters. Adversity matters. The experience of failure matters.

## Meanwhile, at Anthropic...

And as if all that were not enough, Anthropic, the company that makes Claude Code, is treating us to quite an edifying show. A little recap of April 2026 for those not following along:

**The source code leak.** 


On 31 March, Anthropic accidentally published the entire source code of Claude Code through a source map file left behind in an npm package. 500,000 lines of TypeScript. 1,906 files. Within hours, the code was mirrored on GitHub and forked tens of thousands of times. 

**The nerfing, then the Opus 4.7 fiasco.** 

Opus 4.6 was quietly degraded for weeks: shorter answers, poor instruction following, refusals on legitimate requests. A senior director at AMD wrote that "Claude has regressed to the point where it can no longer be trusted with complex engineering". Opus 4.7, released on 16 April to set things right, made matters worse: a new tokenizer that inflates consumption by 35%, API bugs, and "adaptive reasoning" that reasons less. Pro subscribers were hitting their limit after 3 questions.

**Removing Claude Code from the Pro plan.**

 On 21 April, without any announcement, Anthropic removed Claude Code from the $20/month plan on its pricing page. A dash where there used to be a checkmark. 
 The documentation quietly edited. When the community reacted, the Head of Growth talked about a "test on 2% of new sign-ups", except the public pages had been changed for everyone.
 
 Needless to say, over at OpenAI, the floodgates of mockery were opened.

**And the removal of Opus 4.5.** On Reddit, posts from Opus 4.5 fans keep piling up: *"sad"*, *"heartbroken"*. A model many considered the most reliable, retired without ceremony.

In summary: a leak of vibe-coded source code, nerfed performance, opaque pricing, disastrous communication. For a company that sells itself as "the responsible AI lab", that is quite a blow.

## The barrier to entry is a good thing

There. 
I said it. Deep down, I think it is a good thing that there is a barrier to entry in this trade.

I refuse to live in a world where anyone can code an application in a day's work and claim to be a developer. Just as I refuse to believe Bronny James deserves his spot in the NBA just because his father is LeBron.

Room for growth exists, for Bronny as much as for vibe coders. Bronny can put in the work, improve his shot (his three-pointer especially; the kid genuinely has a great vertical, but his jumpshot is horrible), work on his defence, and become a respectable NBA player. Vibe coders can learn the fundamentals, understand what the AI generates and become real developers.

But if they settle for being there thanks to an advantage they did not earn, LeBron's name for one, Claude Code's prompts for the others, without ever putting in the work needed to understand the game, then their career will end like Smush Parker's. Forgotten. Anecdotal. A name nobody remembers.

## And for us old-timers?

Experienced developers are going to become more valuable, not less. Because when everyone can generate code, the value shifts to those who can **tell good code from code that looks good**. Those who can architect a system that holds up at scale. Those who can debug when the AI hallucinates. Those who make technical decisions that are not in the prompt.

And for developers like me, based in Abidjan, paying in dollars with income in CFA francs: if Anthropic moves Claude Code from $20 to $100, that is going from 12,000 to 60,000 FCFA a month. A calculation many African developers will not be able to justify.

## In conclusion

To the weekend vibe coders: your *welcome to the NBA moment* is coming. Get ready, or get ready to be Smush Parker.

And to Anthropic: pull yourselves together. We chose you because you were supposed to be the responsible adults of this industry. 

Not to quietly edit your pricing pages at 5pm on a Tuesday.

---

*Jean Houédanou. Otherwise... who would win in a one-on-one between Smush Parker and J Cole?*
