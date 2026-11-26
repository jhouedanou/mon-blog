---
title: "Vue Mastery Black Friday 2026, 70% off a year of Vue.js"
createdAt: "2026-11-26T09:00:00Z"
image: "/images/articles/vue-mastery-black-friday-2026.webp"
description: "Black Friday 2026 at Vue Mastery: 70% off a year of Vue.js courses. Why I use it, and how Claude made itself co-author of my commits."
searchIntent: "What is the Vue Mastery Black Friday 2026 deal, what does the subscription include, and how do you remove the Claude Code Co-Authored-By line from commits?"
tags: ["dev", "vue", "black friday", "Claude Code", "ai"]
---

It's Black Friday at Vue Mastery, and the deal is already live with [70% off a year of subscription](https://www.vuemastery.com/black-friday). The button on the page announces a saving of 210 dollars on the annual plan.

I'm writing about it because it's the platform I use to get better at Vue.js, and because I'm not a vibe coder.

## The Vue Mastery Black Friday 2026 deal

The deal page shows 70% off a year, which is 210 dollars less on the annual bill. It also offers two more expensive bundles, at 399 and 999 dollars, with advanced courses and certifications on Nuxt and Pinia.

However, the page gives no end date. If the deal interests you, I wouldn't count on next week.

Vue Mastery also says on [its pricing page](https://www.vuemastery.com/pricing) that you can ask for a refund within the first 14 days, and that there is a student discount, on request by email.

## What the subscription includes

According to the deal page, the subscription gives access to 21 courses, 143 talks and 73 hours of video. The courses cover Vue 3, the Composition API, composables, Pinia, Vue Router, Nuxt, TypeScript, Vite and Vitest.

Two courses are taught by Evan You, the creator of Vue and Vite, including "Vue 3 Deep Dive with Evan You". The platform also says part of the subscription goes to the Vue.js project.

And for those who don't want to pay, there are free courses, such as "Intro to Vue 3", "What is Pinia?" or "What is a Composable?", and cheat sheets to download on Vue 3, Nuxt, Pinia and Vue Router with a free account.

## Why I'd rather learn Vue

This blog runs on Nuxt, so on Vue, since I [left WordPress](/en/20261018-migration-wordpress-nuxt-referencement-perdu-recupere). I want to understand the code I put online, and that's why I take courses instead of asking an AI to write the site for me.

I've already written what I think about the [limits of vibe coding](/en/20260423-chers-vibe-codeurs-bienvenue-dans-la-realite). Generating code you can't read works until the first serious bug, and that day you need someone who knows Vue.

## What I'm living through right now with vibe coding

I'm living this problem at work right now. People who don't code put all their specs into Claude, ship an application, and then can't explain either the code or the features.

Latest example, someone who doesn't code and who was raised on Claude Code recently sent me an acceptance testing ticket about a project I'm developing. He wanted to know why a list only offered a few profiles, and why some content didn't show up in a menu.

None of these points was a bug. Each time, the answer was a business rule of the project, for example that a profile shows up in the list when it has published content, or when an option is switched on in its record. He actually ended by asking me to confirm, topic by topic, what needed a fix and what was just a setting to change in the admin.

The ticket also contained new requests, introduced with "it would also be good to". I answered that they had to go through an additional specification, for a version 2 after the delivery date.

There's also the one who supplies the screens and the architecture, and who, once the site is deployed in beta based on his mockup, asks me to check whether it works.

No sir, that's called acceptance testing.

That's why I keep learning. Someone who wrote a rule can explain it, and someone who got it from a prompt has to ask somebody else what their own application does.

So yes, I know, I use Claude too.

## How I use Claude

My use of Claude is Opus, in VS Code, and for two things. I give it code that doesn't work so it finds the bug, and I let it make the commits automatically, with the message that goes with them.

The code, I write it and I review it. Claude debugs and keeps the Git history tidy.

## The co-author surprise

It was while reading that history that I got a surprise. At the bottom of my commits, there was a `Co-Authored-By` line, with the model's name and the address `noreply@anthropic.com`. Claude had made itself co-author of my code, and on GitHub it shows up next to me in the commit's list of authors.

I hadn't asked for anything. It's the default behaviour of Claude Code, and [the settings documentation](https://code.claude.com/docs/en/settings) describes it with a setting named `attribution`, which lets you change or hide that line.

## Removing Claude from the co-authors

For those who want to remove the line, open the `~/.claude/settings.json` file and add this.

```json
{
  "attribution": {
    "commit": "",
    "pr": ""
  }
}
```

The empty `commit` value removes the line from commits, and the empty `pr` value removes the "Generated with Claude Code" mention from pull requests. The old `includeCoAuthoredBy` setting still exists, but the documentation marks it as deprecated.

Commits already made keep their co-author, the setting only applies to the next ones.

## I'm keeping both

So there you go, I'm keeping Vue Mastery to learn and Claude to debug and make my commits, and those who say that developing is useless are heading for difficult tomorrows. If you work with Vue or Nuxt and you want to understand what you deploy, [the Vue Mastery Black Friday deal](https://www.vuemastery.com/black-friday) is the right time to get started, and the free courses are enough to check that the format suits you before paying.

---
*[Jean-Luc Houédanou](https://houedanou.com)*
