---
title: "Vue Mastery Black Friday 2026, 70% off a year of Vue.js"
createdAt: "2026-11-26T09:00:00Z"
image: "/images/articles/vue-mastery-black-friday-2026.webp"
description: "Black Friday 2026 at Vue Mastery: 70% off a year of Vue.js courses. Why I use it, and how Claude made itself co-author of my commits."
searchIntent: "What is the Vue Mastery Black Friday 2026 deal, what does the subscription include, and how do you remove the Claude Code Co-Authored-By line from commits?"
tags: ["dev", "vue", "black friday", "Claude Code", "ai"]
---

It's Black Friday, and among all the deals there's one that concerns me. Vue Mastery, the platform I use to get better at Vue.js, is showing [70% off a year of subscription](https://www.vuemastery.com/black-friday), which is 210 dollars less according to the button on the page.

I'm writing about it because this blog runs on Nuxt, so on Vue, and because I'm not a vibe coder. I also talk about Claude further down, since it made itself co-author of my commits without asking my opinion.

## The Vue Mastery Black Friday 2026 deal

The deal is already live, with 70% off the annual subscription. The page also offers two more expensive bundles, at 399 and 999 dollars, with advanced courses and certifications on Nuxt and Pinia.

However, it gives no end date, so if the deal interests you, I wouldn't count on next week.

Vue Mastery also says on [its pricing page](https://www.vuemastery.com/pricing) that you can ask for a refund within the first 14 days, and that there is a student discount, on request by email.

## What's in the subscription

The page announces 21 courses, 143 talks and 73 hours of video, on Vue 3, the Composition API, composables, Pinia, Vue Router, Nuxt, TypeScript, Vite and Vitest. Two courses are taught by Evan You, the creator of Vue and Vite, including "Vue 3 Deep Dive with Evan You", and the platform says part of the subscription goes to the Vue.js project.

And if you don't want to pay, there are free courses such as "Intro to Vue 3", "What is Pinia?" or "What is a Composable?", and with a free account you can download cheat sheets on Vue 3, Nuxt, Pinia and Vue Router.

## Why I'd rather learn Vue

For a long time, [I didn't want AI](/en/20261016-pourquoi-lia-ne-me-remplacera-pas), because I was afraid it would do the work for me and I would lose a trade I spent years learning. I use it today, but I still want to understand the code I put online.

This blog has run on Nuxt since I [left WordPress](/en/20261018-migration-wordpress-nuxt-referencement-perdu-recupere), and that's why I take courses instead of asking an AI to write the site for me. I've already said what I think about the [limits of vibe coding](/en/20260423-chers-vibe-codeurs-bienvenue-dans-la-realite), generating code you can't read works until the first serious bug, and that day you need someone who knows Vue.

## What I'm living through right now with vibe coding

And this problem, I'm living it at work right now. People who don't code put all their specs into Claude, ship an application, and then can't explain either the code or the features.

Here is a recent example, from which I removed the names and the details that would identify the project. Someone who doesn't code, raised on Claude Code, sends me an acceptance testing ticket about a project I'm developing. He wants to know why a list only offers a few profiles and why some content doesn't show up in a menu, and he ends by asking me to confirm, topic by topic, what needs a fix and what is just a setting to change.

None of these points was a bug. Each time, the answer was a business rule of the project, along the lines of "a profile shows up in the list when it has published content". And while he was at it, the ticket contained new requests, introduced with "it would also be good to", which I sent back to an additional specification, for a version 2 after delivery.

There's also the one who supplies the screens and the architecture and who, once the site is deployed in beta based on his mockup, asks me to check whether it works.

No sir, that's called acceptance testing.

Someone who wrote a rule can explain it, while someone who got it from a prompt has to ask somebody else what their own application does, and that's why I keep learning.

## Rap went through the same thing

Hip-hop has known the lyrical dexterity of Treach, the sample manipulations of RZA and DJ Premier, the mixing excellence of Dr. Dre, the creative madness of Timbaland, the versatility and adaptability of Just Blaze. They all have passion and talent in common. (And Treach is the real GOAT, and I'ma die on that hill. "Feel Me Flow" is a killer track.)

Then [FL Studio](/en/20261026-lemon-studio-clone-fl-studio), Auto-Tune and MIDI loops became available to everyone, and we got copies of sub-copies of Shawty Redd, some Sexyy Reds, in short imitators who are only there for the money and who carve out niches for themselves.

Vibe coding has the same problem. It produces fast, and it chases money.

## How I use Claude

So yes, I know, I use Claude too. But my use is Opus, in VS Code, and for two things. I give it the code that doesn't work so it finds the bug, and I let it make the commits automatically, with the message that goes with them.

## Claude made itself co-author

And that's where I got the surprise of finding, at the bottom of my commits, a `Co-Authored-By` line with the model's name and the address `noreply@anthropic.com`, which means that on GitHub, Claude shows up next to me in the list of authors.

I hadn't asked for anything. It's the default behaviour of Claude Code, and [the settings documentation](https://code.claude.com/docs/en/settings) provides a setting named `attribution` to change or hide that line.

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

The empty `commit` value removes the line from commits, and the empty `pr` value removes the "Generated with Claude Code" mention from pull requests. The old `includeCoAuthoredBy` setting still exists, but the documentation marks it as deprecated, and commits already made keep their co-author, since the setting only applies to the next ones.

In my case, that line doesn't bother me that much anymore, because I understand my code.

## I'm keeping both

So there you go, I'm keeping Vue Mastery to learn and Claude to debug and make my commits. If you work with Vue or Nuxt and you want to understand what you deploy, [the Vue Mastery Black Friday deal](https://www.vuemastery.com/black-friday) is the right time to get started, and the free courses are enough to check that the format suits you before paying.

As for those who say that developing is useless, they are heading for difficult tomorrows.

---
*[Jean-Luc Houédanou](https://houedanou.com), lead author of his own commits*
