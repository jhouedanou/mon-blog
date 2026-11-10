---
title: "Why you sometimes have to put a client's IT person in their place"
createdAt: "2026-11-10T18:00:00Z"
draft: true
image: "/images/articles/it-client-en-copie.webp"
description: "Acceptance testing passed, then the client's IT person created their own database. My method: no WhatsApp, everyone in copy, and facts."
searchIntent: "How do you deal with a client's IT person who complicates a production release, and how do you set them straight without a conflict?"
tags: ["opinion", "project management", "development", "method"]
---

Sometimes you have to put a client's IT person in their place. Not by shouting: by email, with everyone in copy, and with facts.

The context is simple. A project to deploy for a client. Everything goes well. Acceptance testing is signed off, the client is happy, and only the go-live remains. Then the final boss of the game shows up: the client's IT person.

## The final boss: the client's IT person

I have a rule, drawn from experience: the more junior they are, the less they know, and the more of a pain they are.

An experienced IT person asks two questions, reads the README and deploys. A junior one has to show they exist. So they do things nobody asked for.

Here is this week's example. I removed the names; the rest is accurate.

Monday, 4:51 pm. I send the go-live email. The sending domain for emails is already verified, so there is nothing to do on the DNS side. The environment variables are in a secure link. Four colleagues are in copy.

The reply has two points. First: one variable is empty. Second, and I quote (translated from French): "I created our own database on our side for this, should I change that?"

Read the sentence again. The application ships with its database, secured, with multi-factor authentication. Nobody asked for a second database. They created one, plugged it in, and then asked whether they should have.

## What that database cost

Here is what followed, in order.

- **The empty variable.** That was normal. This secret is generated when the webhook is created, and the webhook needs the final production URL. So we had to wait for the deployment. I replied with what works, what does not work, and the file and line where it blocks.
- **The database.** Back to the planned database. The container restarts in a loop: the migration fails because the schema already exists.
- **The domain.** The application is served on a different domain from the planned one. And a test secret was left in place.
- **The accounts.** Once the site was live: "the old admin accounts, including mine, can no longer log in". That was normal too: those accounts had been created in the database they had invented.

Thirteen messages in total, from Monday to Tuesday. In my opinion, without the surprise database, four would have been enough.

## The teaching method: three rules

I don't get angry. I apply three rules, always the same ones.

### 1. I don't answer on WhatsApp

A technical question on WhatsApp has no witness and no archive. Three weeks later, nobody can find it. If the question arrives there, the answer leaves by email. I have explained elsewhere [why WhatsApp is not a work tool](/en/20261028-whatsapp-nest-pas-un-moyen-de-communication-professionnel).

### 2. I put everyone in copy

This is not to humiliate anyone. It is so that the project manager, the salesperson and management read the same version as the IT person.

In private, "I created another database" becomes, a month later, "the contractor delivered something that didn't work". In copy, the sentence stays what it is, with its date and its author.

### 3. I point to facts

I don't write "you shouldn't have". I write: "This is the production database. There is no other one."

Then comes the proof: a check run directly on the database, one witness object per migration, all fourteen present, screenshot attached. Then come the actions, numbered, one per line.

When they wrote that some accounts no longer worked, my answer was one line: "Please send the list of accounts and email addresses to recreate." No comment on the cause. The cause is already written higher up in the thread, and everyone has read it.

I use the same method to [check a deliverable announced as done](/en/20260908-cest-integre-dans-la-maquette): nobody argues with a line number.

### And it works

In the middle of the thread, they read the README. They then asked two good questions: is this really the production database, and up to which migration is it current? I answered point by point, and the site was live shortly after.

That is the goal. I am not trying to crush anyone. I am trying to bring them onto the facts, because on the facts they work well.

## Canibus, LL Cool J and the mic

In 1997, LL Cool J has more than ten years of career behind him. He invites four rappers onto the track "4, 3, 2, 1": Method Man, Redman, DMX, and a newcomer, Canibus.

LL has a microphone tattooed on his arm. Canibus writes in his verse: "L, is that a mic on your arm? Let me borrow that."

LL takes it as a challenge. He writes an answer in his own verse, and he asks Canibus to change his line. Canibus changes it. LL keeps his answer on the record.

In 1998, Canibus releases "Second Round K.O.", with Mike Tyson. Many people say he won that round. LL answers with "The Ripper Strikes Back". Then Canibus's first album disappoints, and people still talk about him mostly for this story. LL Cool J was inducted into the Rock and Roll Hall of Fame in 2021.

The junior IT person is Canibus. They are invited onto someone else's track, and they want to borrow the mic: their own database, their own domain.

I keep one thing from LL, and I leave one.

I keep the place of the answer. LL did not settle this in the studio corridor. He answered on the record, where everyone listens. That is my email with everyone in copy.

I leave the ego. LL answered a line that he himself had had erased, and that is what started the war. I answer with a line number and a screenshot.

Canibus had talent. The junior may have some too. They have one thing left to learn: on someone else's track, you lay down your verse and you hand the mic back.

---
*[Jean-Luc Houédanou](https://houedanou.com)*
