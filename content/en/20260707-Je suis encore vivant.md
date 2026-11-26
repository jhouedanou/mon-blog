---
title: "The real job of a developer: hitting walls"
image: "/images/Gemini_Generated_Image_oudr54oudr54oudr.jpeg"
createdAt: "2026-07-07"
description: "The real job of a developer, in three days and four acts: slowness, ghost bugs, Franglais and a deployment quota hit at 10:41pm. Unfiltered."
searchIntent: "What a string of bugs, slowdowns and deployment problems reveals about the real job of a developer."
tags: ["development", "behind the scenes", "programming"]
---

Hitting wall after wall, stacking up technical headaches, improvising solutions under pressure and moving forward regardless, that's what a developer's job looks like day to day.

Don't listen to the people who insist that [a dash of AI and three lines of code](/en/20260423-chers-vibe-codeurs-bienvenue-dans-la-realite) is all it takes for everything to run itself. They're either liars or geniuses (and 99% of the time, they're liars). This trade is punctuated by those famous days when everything hits at once, unexplained slowness, ghost bugs and deployments crashing at the worst possible moment.

Looking back on 3 days of firefighting in 4 acts.

---

## Act 1: But why is it so slow?

**Day 1:** Understanding why the application took forever to load.

After a bit of digging, I found the problem, it was spending its time doing pointless work, re-downloading massive files on every update.

One clean-up and a logic fix later, performance was finally back to decent.

## Act 2: Hunting ghost bugs

**Days 1 and 2:** Time for the classics, the ones that love to pop up when you don't have time:

* A name changing on its own in the interface (thank you, slightly too persistent `localStorage`).
* A random error message (the backend choking on a spike of requests).
* A calendar stubbornly refusing to line up (a real head-in-hands moment courtesy of Tailwind CSS... which I despise more and more the longer I use it).

The cause was different every time, and the same question kept coming back: *"How did this run like that for so long without anyone noticing?"* I fixed them all, one by one.

## Act 3: Harmonising the UI

**Day 2:** Once the big bugs were fixed (and Tailwind temporarily under control), might as well take the chance to tidy up, harmonising copy, tweaking colours, removing useless buttons and adjusting the interface.

Taken separately, none of these adjustments are spectacular, but put together, they finally make the application smooth and consistent.

## Act 4: The "Franglais" syndrome

**Day 3:** This one had been dragging on for weeks. Half the application was in French and the other half in English, a merry mess.

We expected a complicated technical problem, when it was a single wrong configuration setting, there since day one of the project.

* **Time to fix:** 3 minutes.
* **Time spent hunting for the cause over the weeks:** Too long for my self-esteem. Classic.

---

## Interlude: Sampling while the containers warm up

A deployment takes time, and faced with the progress bar, you can either stare at it doing nothing or make use of the dead time.

I fired up [Koala Sampler](/en/20260822-koala-sampler-gratuit-mac-boom-bap) again, which I'd been neglecting lately. A few well-chosen samples, a very Wu-Tang vibe, and two instrumentals came to life while the servers worked in the background.

---

## The 10:41pm wall

Then came the moment when everything seemed about to fall apart.

**10:41pm: Nothing deploys anymore.** The deployment quota is reached on the platform, naturally at the worst possible moment, with a pile of important fixes waiting to go to production.

No time to wait until tomorrow, so I pull out the prepaid card to switch to the paid tier and unblock the situation. Except it's [impossible to get my local cards accepted](/en/20260327-cpanel-cyberpanel-migration) in the United States, and the system refuses the transaction.

I had to improvise a fallback in a hurry, a switch to [Cloudflare Pages](/en/20260402-vercel-cloudflare-pages-migration) and GitHub Actions, the whole thing configured in 15 minutes flat with Claude's help. For my next projects, how a platform handles these geographic payment barriers will be a direct exclusion criterion.

---

## The takeaway

These last few days have been long, intense, and cost me a few hairs (and spoiler: I didn't have many left to begin with). But the code is finally live.

And now I can see plenty of people thinking: *"You must be relieved."*
Well, no, not really.

I know full well that tomorrow, barely out of bed, there may be a server outage or a critical bug to fix urgently. 
It's a job I chose, it's not the worst in the world, but above all, people are counting on me.

On that note, I need to go to sleep. Tomorrow there will be more walls to hit, and I fully intend to face them.

---
**[Jean-Luc Houédanou](https://houedanou.com)**
