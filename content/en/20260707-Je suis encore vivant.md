---
title: "Hitting walls (and why that is the real job of a dev)"
image: "/images/Gemini_Generated_Image_oudr54oudr54oudr.jpeg"
createdAt: "2026-07-06"
description: "An evening when everything seemed determined to break... until it all finally fell back into place."
searchIntent: "What a string of bugs, slowdowns and deployment problems reveals about the real job of a developer."
tags: ["development", "behind the scenes", "programming"]
---

# Hitting walls (and why that is the real job of a dev)

Hitting wall after wall, stacking up technical headaches, improvising solutions under pressure and moving forward regardless: that is the reality on the ground.

Don't listen to the people who insist that a dash of AI and three lines of code is all it takes for everything to run itself. They are either liars or geniuses (and 99% of the time, they are liars). This trade is punctuated by those famous days when everything lines up as if the project had decided to test your nerves. Unexplained slowness, ghost bugs, deployments crashing at the worst possible moment...

Looking back on 3 days of firefighting in 4 acts.

---

## Act 1: But why is it so slow?

**Day 1:** Understanding why the application took forever to load.

After a bit of digging, the verdict came in: it was spending its time doing pointless work, re-downloading massive files on every update. Imagine someone moving their entire house just to change a light bulb.

One good clean-up and a logic fix later, performance finally started breathing again.

## Act 2: Hunting ghost bugs

**Days 1 and 2:** Time for the classics. The ones that love to pop up when you don't have time:

* A name changing on its own in the interface (thank you, slightly too persistent `localStorage`).
* A random error message (the backend choking on a spike of requests).
* A calendar stubbornly refusing to line up (a great moment of loneliness courtesy of Tailwind CSS... which I despise more and more the longer I use it).

A different cause every time. And always the same question on a loop: *"How did this run like that for so long without anyone noticing?"* One by one, they all fell.

## Act 3: The butterfly effect, harmonising the UI

**Day 2:** Once the big fires were out (and Tailwind temporarily tamed), might as well take the chance to tidy the house. Harmonising copy, tweaking colours, removing useless buttons and adjusting the interface.

Taken separately, none of these adjustments are spectacular. Put end to end, the application finally becomes smooth, coherent and pleasant.

## Act 4: The "Franglais" syndrome

**Day 3:** This one had been sitting in a drawer for weeks. Half the application spoke French, the other half answered in English. A merry mess.

We expected some technical monstrosity. The reality? A simple wrong configuration setting, sitting there since day one of the project.

* **Time to fix:** 3 minutes.
* **Time spent hunting for the cause over the weeks:** Too long for my self-esteem. Classic.

---

## Interlude: Sampling while the containers warm up

A deployment takes time. Faced with the progress bar, there are two schools: stare at it like a zombie, or make use of the dead time.

I fired up Koala Sampler again, neglected lately. A few well-chosen samples, a very Wu-Tang vibe, and two instrumentals came to life while the servers sweated in the background. Which goes to show, technical frustration can feed creativity.

---

## The grand finale: The 10:41pm Wall

Speaking of music... shrieking violins, please. The moment when everything seemed about to fall apart. The final boss had arrived.

**10:41pm: Nothing deploys anymore.** The axe falls: deployment quota reached on the platform. Naturally, the limit hits at the worst possible moment, with a pile of crucial fixes waiting to go to production.

No time to wait until tomorrow. I pull out the prepaid card to switch to the paid tier and unblock the situation. And there, surprise: impossible to get my local cards accepted in Uncle Sam's country. The system refuses the transaction, leaving me stuck at the door.

I had to improvise a fallback in absolute urgency: switch to Cloudflare Pages and GitHub Actions, the whole thing configured in 15 minutes flat with Claude's help. One thing is certain: for my next projects, how a platform handles these geographic payment barriers will be a direct exclusion criterion.

---

## The takeaway

These last few days have been long, intense, and cost me a few hairs (and spoiler: I did not have many left to begin with). But the code is finally live.

And now I can see plenty of people thinking: *"You must be relieved."*
Well, no. Not really.

I know full well that tomorrow, barely out of bed, there may be a server outage or a critical bug to fix urgently. 
It is a job I chose, it is not the worst in the world, but above all people are counting on me.

On that note, I need to go to sleep. Tomorrow there will be more walls to hit, and I fully intend to face them.

**Jean-Luc Houédanou**
