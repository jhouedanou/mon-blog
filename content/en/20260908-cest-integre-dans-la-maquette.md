---
title: "« It's been integrated into the mockup. » (No.)"
createdAt: "2026-09-08T20:17:00Z"
image: "/images/articles/maquette-integree-non.webp"
description: "A week spent checking, file by file, what I was told had been done in a handoff package. Two screens out of four were actually there. I take the opportunity to list five classic web project traps, and how I handle them now."
searchIntent: "How to verify a handoff deliverable announced as complete, and how to avoid the classic traps of a web project: batched feedback, unfinalised content, validation without a deadline, refused DNS access, secrets shared in a Drive."
tags: ["project management", "development", "handoff", "method", "opinion"]
---

# « It's been integrated into the mockup. » (No.)

There are phrases that should make us prick up our ears. « Trust me », « it takes two minutes », or « can we do a call to talk about it? ». Since last week, I've added « it's been integrated » to my list.

I pick up a handoff package for a client project. Specifications, scoring matrix, HTML mockups, design system, graphic kit, tracking plan. The pack looks serious, it even has a table of contents, and I have nine days to deliver.

After a first read, I list eight gaps. The answer comes two days later, in a mission-accomplished tone: four points fixed, the mockup now includes the privacy policy, the legal notice, the cookie banner and consent in the forms.

Perfect, I tell myself. Except no.

## Thirty seconds of checking

Before opening an editor, I open a terminal. It's not distrust, it's a habit I've picked up over time.

```bash
grep -n -i -E "confidentialit|mentions l|cookie|consentement|RGPD" *.dc.html
```

Ten lines come back. « Politique de confidentialité » and « Mentions légales », in the footer, on three boards. Nothing else.

I do a second, broader pass, in case the cookie banner was hiding under another name:

```bash
grep -n -i -o -E ".{0,90}(cookie|consent|données personnelles|j'accepte).{0,90}" *.dc.html
```

A single result, and it's an admin toggle: « Autoriser l'export de données personnelles ». No cookie banner, no consent checkbox. The word « cookie » appears nowhere in the mockup files.

Two points out of four, then. I sent back the findings with line numbers and board names. It's amazing how a line number cuts a debate short: you can't do a call to talk about it with `grep`.

## The real cost

Two missing screens can be made up in a day, maybe two. What costs is what changes afterwards.

Before, when I was told « it's done », I integrated. Now I open the files, at every announcement, even when I'm told « it's really done this time ». Nobody has costed that time. It doesn't appear in any schedule, any quote, any Excel line, and it is now permanent on this project.

That's the price of a single unverified announcement. It doesn't cost the two screens, it costs the trust, and trust saves a kind of time that nothing replaces.

## Five traps this project served me in one week

They're not specific to my client, I've run into them everywhere. You'll surely recognise them.

### 1. « To avoid back-and-forth, I'll send you feedback in batches. »

The intention is good, but the result is the opposite. A batch works when the items are independent. Here, the consent screens touch the same forms and the same pages as everything else: delivering them in three rounds means redoing the integration three times.

The right answer isn't to refuse, it's to rephrase in terms of dependencies: here is what blocks what, and here is what can move forward in parallel. A batch of independent items, yes. A batch of prerequisites, no.

### 2. « The content isn't finalised. »

That's the classic answer when you ask for a site structure, and it's in good faith: the other person hears « content », you were asking for « structure ». You didn't have the same conversation, but you had it together.

The problem comes from the request. « The list of chapters and the topics covered » reads like an order for editorial content, therefore like three weeks of work, therefore like « we'll see ». It's better to name the exact object you want to receive: a table, one row per chapter, with the columns listed and one example row filled in, provisional accepted. Then there's no room for interpretation.

Since then, I send the empty file along with the request. It has divided my back-and-forth by three.

### 3. « No validation deadline is imposed at this stage. »

This one is sneaky, because it looks like flexibility. In reality, your delivery has a date, but the validation of your delivery doesn't. If functional acceptance drags on for five days, those five days come out of your correction time, and you are the one who misses the deadline.

Ask for a window. Forty-eight working hours from delivery is reasonable, and nobody can refuse it without explaining themselves.

### 4. « No access to our DNS zone can be provided. »

Classic, and often legitimate: the client doesn't want to open their zone to a contractor, and they're right. I wouldn't give the keys to my house to someone I met on Teams either.

Except that without access, every record becomes a ticket. Subdomain validation, TLS certificate, SPF, DKIM, DMARC: you easily get a dozen, each with a round trip and a wait. That can eat a week on a project that has two.

The solution fits in one line in their zone: an NS delegation for the subdomain only. They keep full control of the main domain, give no access, and can revoke the delegation whenever they want. You manage the subdomain's records without asking permission every time. It's exactly their control requirement, satisfied differently. Propose it before accepting ticket mode, half the time it goes through.

### 5. The secret that travels in the shared Drive

In the consolidated pack, I'm told the Conversions API token has been « filled in in the handoff folder ». In other words, dropped into a Drive document shared with a dozen people, whose link has been circulating by email for two weeks.

An API token is not project data. It isn't passed along in a deliverable, it isn't stored next to the specifications, and once it has been through there, it must be considered compromised. Ask for it to be regenerated and for a separate channel, without drama, but in writing.

## The only method that holds

On this kind of project, I long responded with analysis: argued, precise emails, with headings, bullet points and appendices, explaining why such a thing blocked such another. Nobody read them. In return, I got the great classic: « I don't really see it, can we do a call to talk about it? ». I've already devoted [an entire article to that meeting « to talk about it »](/en/20260326-lareunionpourenparler), which is something of a cousin to « it's been integrated »: in both cases, people prefer speech because in writing, you can check.

What works is shorter and less tiring: dependencies and dates.

- What is blocked, and by what exactly.
- What has been received, and when.
- The countdown starts at receipt, not at the announcement.

It doesn't read like a reproach, so it isn't argued about like a reproach. It reads like a fact.

And above all, everything in writing, in a channel visible to everyone. No private messages on anything that commits to a date. Not out of distrust, but because the day the deadline slips, the only thing protecting you is a dated history nobody can rewrite. People's memory, on the other hand, gets very creative after a missed deadline.

## What I do now, systematically

1. I check every announcement in the files before integrating. Thirty seconds.
2. I send the empty template with the request, instead of describing what I want.
3. I ask for a validation window with a number on it.
4. I propose subdomain delegation before accepting ticket mode.
5. I answer in dependencies and dates, never in analysis, and never in a call.

None of this is distrust. It's simply what's left once you've understood that an announced deliverable is not a received deliverable. Check, it takes thirty seconds.

---
*Photo: [Ketut Subiyanto](https://www.pexels.com/photo/4584385/), Pexels.*
