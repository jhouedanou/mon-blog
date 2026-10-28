---
title: "Lemon Studio: the FL Studio clone exists, and it doesn't excite me that much anymore"
createdAt: "2026-10-26T18:30:00Z"
updatedAt: "2026-10-28T15:00:00Z"
image: "/images/articles/lemon-studio.webp"
description: "I tested Lemon Studio, the free FL Studio clone built with Claude: it's very far from the original. MorningDAW, on the other hand, bets on originality."
searchIntent: "How good is Lemon Studio, the free open-source FL Studio clone built with AI help, and which free, original music production app should you pick instead?"
tags: ["opinion", "music", "AI", "open-source", "vibe coding"]
---

In early October, I wrote about [ArtCraft, the Adobe suite rebuilt with Claude](/en/20261009-artcraft-vibe-code-suite-adobe-saaspocalypse). This time, FL Studio has its clone. It's called Lemon Studio.

_Update, October 28, 2026: I tested it. My verdict is at the end of the post._

## What is Lemon Studio?

Lemon Studio is a free, open-source music production app (a digital audio workstation, or DAW), licensed under GPL-3.0. It's written in Rust and targets Windows, macOS and Linux. The interface copies FL Studio's: the Playlist, the Channel rack, the Piano roll, the menus. On paper, if you've ever opened FL Studio, you already know how to use it.

What it can do, according to its documentation:

- open projects saved with FL Studio 24.2 or later;
- load VST2, VST3 and CLAP plugins. In the screenshot, that's Inphonik's RX1200, an emulation of the SP-1200 sampler;
- ship its own instruments, Lemon Sampler, Lemon Trio and Citrus, plus about ten effects.

As with ArtCraft, many commits on GitHub are co-authored by Claude.

The project has no ties to Image-Line, the company behind FL Studio. Its documentation says so.

## Does it work? So-so

From what I've seen, it works so-so. The project says it itself: "Lemon Studio is pre-alpha software." Several features are incomplete. There's no version to download: you have to build it from source.

If I were a little less buried in work, I'd give it a try.

## But it doesn't excite me that much anymore

Personally, it doesn't excite me that much anymore. And I'm not sure I like the direction the industry is taking.

Late September, the Adobe suite. Today, FL Studio. The pattern is the same: take a well-known app and rebuild it with AI. Same interface, same menus, same habits.

One detail sums up the situation. In its documentation, Lemon Studio's author asks that its code not be used in ArtCraft. They specify it's a request, not a license condition. The person cloning FL Studio doesn't want their clone reused.

I understand the request. But it shows the problem: when copying gets easy, everyone copies everyone, and nobody wants to be copied.

## The barriers are falling. Then what?

In the future, the barriers to software development may fall. A single developer, with Claude, can rebuild an app that a company spent years building. FL Studio has existed since 1998, back when it was still called FruityLoops.

That's good news for people who can't afford it. I wrote about it with [Koala Sampler](/en/20260822-koala-sampler-gratuit-mac-boom-bap): many people buy cracked copies of FL Studio in Facebook groups, often stuffed with spyware. A free, legal clone beats that.

But if anyone can rebuild anything, rebuilding is no longer enough. Two things will matter:

- **quality**: software that doesn't crash mid-session, that opens your old projects, and that will still be maintained in five years;
- **originality**: a new idea, not a copy of software that already exists.

AI makes copying easy. It doesn't make quality and originality easy. Those two things are where software will stand apart. That's my opinion.

## Update, October 28: I tested it

I finally found the time to try Lemon Studio. It's very far from FL Studio.

- **VST3 plugins aren't supported.** The documentation lists them as usable. On my setup, they don't work.
- **My favorite plugin crashes.** Inphonik's RX1200, an emulation of the SP-1200 sampler, crashes as soon as I edit a sample.

## If you're looking for a free music app: MorningDAW

Take a look at [MorningDAW](https://www.morningdaw.com/){target="_blank" rel="noopener"} instead, developed by Mattias and Nicklas Holmgren of Morningdew Media. It's free, with no trial and no time limit, on macOS, Windows and Linux. You just need to create an account to download it.

It looks vibe coded too, granted. [Bedroom Producers Blog](https://bedroomproducersblog.com/2026/10/24/morningdew-media-releases-morningdaw-a-free-daw-for-macos-windows-and-linux/){target="_blank" rel="noopener"} finds that its interface shows "some common signs of the vibe-coded aesthetic". And it includes an assistant that runs on your own Claude Code account. Its developers don't say how they coded it.

But MorningDAW is original. It doesn't copy an existing app:

- pie menus open under the mouse, so you don't go back and forth through menus;
- the same song can be edited in several views: arrangement, piano roll, patterns, score, and even a tracker for chiptune music;
- it exports video clips with visualizers, to publish your music as video;
- it has its own synths, Wyvern and Ember.

According to its website, it supports VST3 and CLAP plugins, plus Audio Units on Mac.

It's what I said above: AI makes copying easy, but what will make the difference is quality and originality. Lemon Studio copies FL Studio. MorningDAW offers something else.

## Sources

- GitHub, [Lemon Studio](https://github.com/ItsAlphaNeon/Lemon-Studio){target="_blank" rel="noopener"}, repository and documentation, accessed October 26 and 28, 2026
- Morningdew Media, [MorningDAW](https://www.morningdaw.com/){target="_blank" rel="noopener"}, official website, accessed October 28, 2026
- Bedroom Producers Blog, ["Morningdew Media releases MorningDAW, a FREE DAW for macOS, Windows, and Linux"](https://bedroomproducersblog.com/2026/10/24/morningdew-media-releases-morningdaw-a-free-daw-for-macos-windows-and-linux/){target="_blank" rel="noopener"}, October 24, 2026

_Cover screenshot: Lemon Studio, with Inphonik's RX1200 plugin._

---
*[Jean-Luc Houédanou](https://houedanou.com)*
