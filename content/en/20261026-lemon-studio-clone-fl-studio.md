---
title: "Lemon Studio, the FL Studio clone: so-so"
createdAt: "2026-10-26T18:30:00Z"
updatedAt: "2026-10-28T15:00:00Z"
image: "/images/articles/lemon-studio.webp"
description: "I tested Lemon Studio, the free FL Studio clone built with Claude: it's very far from the original. MorningDAW, on the other hand, bets on originality."
searchIntent: "How good is Lemon Studio, the free open-source FL Studio clone built with AI help, and which free, original music production app should you pick instead?"
tags: ["opinion", "music", "AI", "open-source", "vibe coding"]
---

In early October, I wrote about [ArtCraft, the Adobe suite rebuilt with Claude](/en/20261009-artcraft-vibe-code-suite-adobe-saaspocalypse). This time, FL Studio has its free, open-source clone, and it's called Lemon Studio.

_Update, October 28, 2026: I tested it. My verdict is at the end of the post._

## What is Lemon Studio?

Lemon Studio is a free, open-source music production app (a digital audio workstation, or DAW), licensed under GPL-3.0. It's written in Rust and targets Windows, macOS and Linux. The interface copies FL Studio's: the Playlist, the Channel rack, the Piano roll, the menus. On paper, if you've ever opened FL Studio, you already know how to use it.

What it can do, according to its documentation:

- open projects saved with FL Studio 24.2 or later;
- load VST2, VST3 and CLAP plugins. In the screenshot, that's Inphonik's RX1200, an emulation of the SP-1200 sampler;
- ship its own instruments, Lemon Sampler, Lemon Trio and Citrus, plus about ten effects.

As with ArtCraft, many commits on GitHub are co-authored by Claude.

The project has no ties to Image-Line, the company behind FL Studio, and its documentation says so.

## It works so-so

From what I've seen, it works so-so, and the project says so itself: "Lemon Studio is pre-alpha software." Several features are incomplete, and there's no version to download, you have to build it from source.

If I were a little less buried in work, I'd give it a try.

## But it doesn't excite me that much anymore

It doesn't excite me that much anymore, and I'm not sure I like the direction the industry is taking.

In late September it was the Adobe suite, and today it's FL Studio. The pattern is the same, you take a well-known app and rebuild it with AI, with the same interface, the same menus and the same habits.

In its documentation, Lemon Studio's author asks that their code not be used in ArtCraft, and makes clear it's a request rather than a license condition. The person cloning FL Studio doesn't want their clone reused.

I understand the request, but it shows that when copying gets easy, everyone copies everyone, and nobody wants to be copied.

## The barriers to development are falling

In the future, the barriers to software development may fall. A single developer, with Claude, can rebuild an app that a company spent years building. FL Studio has existed since 1998, back when it was still called FruityLoops.

That's good news for people who can't afford it. I wrote about this in my post on [Koala Sampler, the free sampler for Mac](/en/20260822-koala-sampler-gratuit-mac-boom-bap): many people buy cracked copies of FL Studio in Facebook groups, which often contain spyware. A free, legal clone beats that.

But if anyone can rebuild anything, rebuilding is no longer enough. Two things will matter:

- quality, meaning software that doesn't crash mid-session, that opens your old projects, and that will still be maintained in five years;
- originality, meaning a new idea rather than a copy of software that already exists.

AI makes copying easy, but not quality or originality. That's my opinion.

## I tested it (update, October 28)

I finally found the time to try Lemon Studio, and it's very far from FL Studio.

- **VST3 plugins don't work on my setup.** Yet the documentation lists them as usable.
- **My favorite plugin crashes.** Inphonik's RX1200, an emulation of the SP-1200 sampler, crashes as soon as I edit a sample.

## MorningDAW, if you're looking for a free music app

Take a look at [MorningDAW](https://www.morningdaw.com/){target="_blank" rel="noopener"} instead, developed by Mattias and Nicklas Holmgren of Morningdew Media. It's free, with no trial and no time limit, on macOS, Windows and Linux. You only need to create an account to download it.

It looks [vibe coded](/en/20260423-chers-vibe-codeurs-bienvenue-dans-la-realite) too, granted. [Bedroom Producers Blog](https://bedroomproducersblog.com/2026/10/24/morningdew-media-releases-morningdaw-a-free-daw-for-macos-windows-and-linux/){target="_blank" rel="noopener"} finds that its interface shows "some common signs of the vibe-coded aesthetic". And it includes an assistant that runs on your own Claude Code account. Its developers don't say how they coded it.

But MorningDAW is original and doesn't copy an existing app:

- pie menus open under the mouse, so you don't go back and forth through menus;
- the same song can be edited in several views: arrangement, piano roll, patterns, score, and even a tracker for chiptune music;
- it exports video clips with visualizers, to publish your music as video;
- it has its own synths, Wyvern and Ember.

According to its website, it supports VST3 and CLAP plugins, plus Audio Units on Mac.

## Sources

- GitHub, [Lemon Studio](https://github.com/ItsAlphaNeon/Lemon-Studio){target="_blank" rel="noopener"}, repository and documentation, accessed October 26 and 28, 2026
- Morningdew Media, [MorningDAW](https://www.morningdaw.com/){target="_blank" rel="noopener"}, official website, accessed October 28, 2026
- Bedroom Producers Blog, ["Morningdew Media releases MorningDAW, a FREE DAW for macOS, Windows, and Linux"](https://bedroomproducersblog.com/2026/10/24/morningdew-media-releases-morningdaw-a-free-daw-for-macos-windows-and-linux/){target="_blank" rel="noopener"}, October 24, 2026

_Cover screenshot: Lemon Studio, with Inphonik's RX1200 plugin._

---
*[Jean-Luc Houédanou](https://houedanou.com)*
