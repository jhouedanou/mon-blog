---
title: "ArtCraft: Someone Vibe Coded the Adobe Suite"
createdAt: "2026-10-09T18:00:00Z"
image: "/images/articles/artcraft-photocraft.webp"
description: "ArtCraft, the open-source Adobe suite built with Claude, remakes Photoshop, Lightroom and Premiere in Rust for Windows, Mac and Linux. What works, what doesn't."
searchIntent: "What is ArtCraft (PhotoCraft, LightCraft, FilmCraft), the AI-built open-source Adobe clones, and can they replace Photoshop or Lightroom?"
tags: ["opinion", "tech", "AI", "open-source", "free software", "vibe coding", "linux"]
---

In April, I wrote that vibe coding was the Bronny James of code. Six months later, someone vibe coded the Adobe suite, open source, and it's called ArtCraft.

And it's not a Paint clone or yet another to-do list, but Photoshop, Lightroom, Premiere, Illustrator, After Effects, InDesign and Acrobat, all seven.

I came across it in a video by FUTC, a photography YouTuber who is also a developer. The title doesn't do nuance: ["Somebody Vibe Coded EVERY SINGLE ADOBE App"](https://www.youtube.com/watch?v=eFB79TYI-Vw){target="_blank" rel="noopener"}. And this weekend, I'm trying ArtCraft.

## What is ArtCraft?

ArtCraft is a collection of free, open-source alternatives to Adobe's software, written from scratch in Rust, that reproduce its interface and tools. The first repositories went up on GitHub on September 30, 2026, under the MIT or Apache-2.0 license. All seven apps are announced for macOS, Windows and Linux.

ArtCraft was created by Brandon Thomas, a developer in Atlanta. It started out as an open-source studio for AI image and video generation. For these new apps, Brandon Thomas worked with Claude Opus 5.5, Anthropic's model. It shows right in the GitHub history: the commits carry a "Co-Authored-By: Claude Opus 5.5" line.

| App | Replaces | Status as of October 9, 2026 |
|---|---|---|
| PhotoCraft | Photoshop | early alpha |
| LightCraft | Lightroom | in development |
| FilmCraft | Premiere Pro | in development |
| VectorCraft | Illustrator | in development |
| EffectCraft | After Effects | in development |
| DesignCraft | InDesign | in development |
| PdfCraft | Acrobat | early alpha |

The wildest part is the timeline. The PhotoCraft, LightCraft, FilmCraft, VectorCraft and PdfCraft repositories were created on September 30. PhotoCraft's first commit is titled "one-shot". As of October 9, 2026, the app is at version 0.5.0 and has nearly 34,000 stars on GitHub.

LightCraft's roadmap gives the number: four to six AI agents working in parallel completed the app's first fourteen milestones in about 25 active hours. The same document is clear that, by effort, LightCraft is only 20 to 35% of the way to a complete Lightroom.

And it doesn't stop at Adobe. On October 7, [the same team](https://github.com/storytold){target="_blank" rel="noopener"} opened repositories for Word (WordCraft), Excel (GridCraft), PowerPoint (DeckCraft), Pro Tools (SoundCraft) and an AutoCAD-style drafting app (CADCraft).

## Is it vibe coding?

I have to be honest, since I spent an entire post [going after vibe coders](/en/20260423-chers-vibe-codeurs-bienvenue-dans-la-realite).

That's not Brandon Thomas's case. In his Reddit announcement, as reported by Gizmodo, he describes himself as a fifteen-year industry veteran, not some casual vibe coder. His GitHub profile states his specialty, Rust. He knows what he's asking the machine for, and he knows how to read what it gives back.

That's what I was saying in April, AI multiplies the skills of people who already have them. For someone who knows the job, Claude provides a team of assistants who never get tired.

The video title says "vibe coded", but I'd rather say it's an experienced developer with several AI agents, and for Adobe, that's far more worrying.

## What FUTC's video shows

FUTC explains that Adobe's pricing, its terms of service and its AI policies are why they're looking at these alternatives. The video tests three apps:

- **PhotoCraft**, the Photoshop equivalent: layers, masks, curves, opening PSD files and hardware acceleration. It works.
- **LightCraft**, the Lightroom equivalent: importing RAW files and Lightroom presets. Previews stay low-resolution to keep things smooth, but standard presets come through.
- **FilmCraft**, the Premiere equivalent: 5K 10-bit footage and H.265 files. It stutters at times, and at the time of filming it lacked features like ripple delete, but hardware-accelerated encoding works.

Anyway, it's an alpha, still rudimentary, but surprisingly capable for a project put together in a few days. VectorCraft, DesignCraft and EffectCraft are still to be tested.

## Available on Windows, Mac and Linux

What makes me happy is that ArtCraft runs on all three systems.

PhotoCraft installs on macOS as a universal build for Apple silicon and Intel, signed and notarized by Apple, on Windows, in x64, ARM and all the way down to 32-bit, and on Linux, as an AppImage, a .deb, an .rpm or a Flatpak. There's also a FreeBSD build, and according to the ArtCraft website, six of the seven apps run in the browser.

Adobe has never released Photoshop or Lightroom for Linux. And Affinity, which I love, still has no official Linux version, and you have to rely on [Wine-based workarounds](https://www.omgubuntu.co.uk/2026/01/run-affinity-linux-ubuntu-appimage){target="_blank" rel="noopener"}.

I [move between Mac and Linux](/en/20261008-pas-besoin-detre-dev-ou-barbu-mac-linux) without a second thought, and lately I've been borrowing my niece's ChromeOS computer. This is the first time a suite that mimics Adobe, from Photoshop to Lightroom, can follow me everywhere. On ChromeOS, I'll go through the Linux environment and the .deb package, since the web version is an archive you host yourself.

The graphic designer in Abidjan who rescued an old PC and put Ubuntu on it because Windows was crawling already had GIMP, Krita or Darktable. Soon they may get the tools and shortcuts they learned on Photoshop, natively, with no subscription billed in foreign currency and no cracked copy. Brandon Thomas says as much on Hacker News: he's sick of GIMP, Krita and Inkscape being the best Linux and open source have to offer.

## LightCraft and my old Ricoh Theta presets

I've used Affinity since its very first version. I paid for version 1, then version 2, and I cheered when [Affinity went free](/en/20251031-affinity-est-gratuit). But I always had one regret, and I wrote it at the time: I never found a Lightroom equivalent for editing the photos from my Ricoh Theta, neither with Darktable nor with Affinity Photo.

So I have old Lightroom presets sitting unused in a folder, tuned for the Theta's 360-degree photos.

Good news, LightCraft can import them, and it's written in [the project's documentation](https://github.com/storytold/lightcraft/blob/main/docs/xmp-interop.md){target="_blank" rel="noopener"}. It reads XMP presets, Lightroom's older .lrtemplate format, whole folders and even .zip archives. It also reads DNG, the Theta Z1's RAW format, using the color matrices embedded in the file.

Two caveats, which the project points out itself:

- some settings don't carry over, such as the camera profile or "Looks". The app lists them on import instead of silently dropping them;
- for presets from before Lightroom 4 (the 2010 process version), settings are approximated with today's sliders.

And a third caveat, specific to the Theta, worth keeping in mind before the weekend. The Z1's DNG holds the two fisheye images side by side, not yet stitched. In Lightroom Classic, [Ricoh's THETA Stitcher plug-in](https://thetaz1.com/en/creativity/){target="_blank" rel="noopener"} stitches them, and LightCraft doesn't support plug-ins. So I'll have to develop in LightCraft, export to TIFF, then figure out how to stitch without the plug-in.

My plan for this weekend:

1. import my presets folder into LightCraft;
2. apply them to a handful of Theta DNGs;
3. compare with what those presets gave me in Lightroom;
4. export to TIFF, stitch the photo without the plug-in, then check that it's still recognized as a 360.

Another surprise, on the Affinity side, PhotoCraft opens Affinity files (.afphoto, .afdesign, .afpub), read-only. Effects and adjustments it can't render yet are listed in a warning. I'll test that too, on copies.

## Can ArtCraft replace Photoshop?

ArtCraft doesn't replace Photoshop yet, by the project's own admission, and I'm not going to [sell you a dream](/en/20260908-philippe-simo-vendeur-de-reves).

- PhotoCraft says so in its documentation: it's not yet a Photoshop replacement for daily professional work. It's missing generative AI, about twenty tools, depth in typography and plug-in compatibility.
- Brandon Thomas admits it on Hacker News: his apps are still far from ready. He expects near-parity with Adobe in "months and not years".
- LightCraft gives itself 60 to 70% of what it takes to replace Lightroom day to day. On Hacker News, one photographer found its RAW rendering still far from Adobe's.
- Gizmodo tested PhotoCraft: Free Transform behaved erratically.
- ArtCraft calls its work a "clean-room" reimplementation: not a single line of Adobe code, everything written from public specifications and the observed behavior of the software. We'll see what Adobe's legal department thinks of that.

So we test on copies of our files and keep the only copy of a client shoot safe.

## The SaaSpocalypse is real

In early February 2026, the job-specific plug-ins Anthropic had just released for Claude Cowork, its tool for office work, sent markets into a panic. Investors dumped software stocks. [Fortune](https://fortune.com/2026/02/06/anthropic-claude-opus-4-6-stock-selloff-new-upgrade/){target="_blank" rel="noopener"} described a trillion-dollar selloff, and [Bloomberg](https://www.bloomberg.com/news/articles/2026-02-04/what-s-behind-the-saaspocalypse-plunge-in-software-stocks){target="_blank" rel="noopener"} picked up the nickname going around trading desks: "SaaSpocalypse".

In June, the private equity firm Thoma Bravo told [CNBC](https://www.cnbc.com/2026/06/09/orlando-bravo-saaspocalypse-over-ai-software.html){target="_blank" rel="noopener"} that the SaaSpocalypse was over. I disagree.

In February, markets feared that AI would do employees' work, so Adobe and the others would sell fewer seats. What ArtCraft shows in October is that AI can rebuild the software itself. Adobe was protected by the idea that nobody would ever be able to afford rewriting Photoshop, and that protection is disappearing fast.

Adobe still has assets, of course: the file formats, people's habits, plug-ins, Firefly, the studios that built their whole pipeline on it. But when a free alpha opens your PSDs on Linux, a monthly subscription gets harder to justify, especially when Adobe agreed in March to [a $150 million settlement](https://www.justice.gov/opa/pr/adobe-agrees-150-million-settlement-and-injunction-resolve-alleged-violations-restore-online){target="_blank" rel="noopener"} to resolve the US Department of Justice's complaint, which accused it of hiding early termination fees and making subscriptions hard to cancel. [I already wrote about that complaint in 2024](/en/20241212-cher-gens-dadobe).

As Wu-Tang put it, [C.R.E.A.M.](/en/20260907-bill-gates-ia-hypocrisie-meta-cash-rules-everything), *Cash Rules Everything Around Me*. At Adobe, it's long been *Cloud Rules Everything Around Me*, and I don't know for how much longer.

## See you after the weekend

This weekend, I'm installing PhotoCraft and LightCraft, on the Mac first, then on Linux. I'll report back. If my old Theta presets work, that will deserve a post of its own.

In early February, plug-ins for Claude sent software stocks tumbling, and in early October, Claude wrote ArtCraft. Anthropic doesn't need to compete with Adobe, it only has to sell the tool to those who do.

## Sources

- FUTC, ["Somebody Vibe Coded EVERY SINGLE ADOBE App"](https://www.youtube.com/watch?v=eFB79TYI-Vw){target="_blank" rel="noopener"}, YouTube
- ArtCraft, [Crafting Apps](https://getartcraft.com/apps){target="_blank" rel="noopener"}, app list and status
- GitHub, [the storytold organization](https://github.com/storytold){target="_blank" rel="noopener"} and the [PhotoCraft](https://github.com/storytold/photocraft){target="_blank" rel="noopener"}, [LightCraft](https://github.com/storytold/lightcraft){target="_blank" rel="noopener"} and [FilmCraft](https://github.com/storytold/filmcraft){target="_blank" rel="noopener"} repositories, accessed October 9, 2026
- LightCraft, [roadmap](https://github.com/storytold/lightcraft/blob/main/ROADMAP.md){target="_blank" rel="noopener"} and [Lightroom preset import](https://github.com/storytold/lightcraft/blob/main/docs/xmp-interop.md){target="_blank" rel="noopener"}
- Gizmodo, ["Someone Vibe Coded a Free Knockoff of Adobe Creative Suite"](https://gizmodo.com/someone-vibe-coded-a-free-knockoff-of-adobe-creative-suite-2000823322){target="_blank" rel="noopener"}, October 7, 2026
- PetaPixel, ["Someone Rebuilt Free, Open-Source Versions of Photoshop, Premiere, and Lightroom Using AI"](https://petapixel.com/2026/10/07/someone-rebuilt-free-open-source-versions-of-photoshop-premiere-and-lightroom-using-ai/){target="_blank" rel="noopener"}, October 7, 2026
- Hacker News, ["ArtCraft Apps – open-source Adobe compatible suite written in Rust"](https://news.ycombinator.com/item?id=49958850){target="_blank" rel="noopener"}, October 4, 2026, with replies from Brandon Thomas, and ["Adobe Creative Suite Cleanroom Port to Rust"](https://news.ycombinator.com/item?id=49981449){target="_blank" rel="noopener"}, October 6, 2026
- Ricoh, [THETA Z1: RICOH THETA Stitcher for Lightroom Classic](https://thetaz1.com/en/creativity/){target="_blank" rel="noopener"}
- OMG! Ubuntu, [Affinity on Linux through an unofficial AppImage](https://www.omgubuntu.co.uk/2026/01/run-affinity-linux-ubuntu-appimage){target="_blank" rel="noopener"}, January 2026
- Fortune, ["Anthropic's Claude triggered a trillion-dollar selloff"](https://fortune.com/2026/02/06/anthropic-claude-opus-4-6-stock-selloff-new-upgrade/){target="_blank" rel="noopener"}, February 6, 2026
- Bloomberg, ["What's Behind the 'SaaSpocalypse' Plunge in Software Stocks"](https://www.bloomberg.com/news/articles/2026-02-04/what-s-behind-the-saaspocalypse-plunge-in-software-stocks){target="_blank" rel="noopener"}, February 4, 2026
- CNBC, ["The 'SaaSpocalypse' is over, says private equity giant Thoma Bravo"](https://www.cnbc.com/2026/06/09/orlando-bravo-saaspocalypse-over-ai-software.html){target="_blank" rel="noopener"}, June 9, 2026
- US Department of Justice, [$150 million settlement with Adobe](https://www.justice.gov/opa/pr/adobe-agrees-150-million-settlement-and-injunction-resolve-alleged-violations-restore-online){target="_blank" rel="noopener"}, March 2026

_Cover screenshot: PhotoCraft (MIT or Apache-2.0 license), showing [The Great Wave off Kanagawa](https://commons.wikimedia.org/wiki/File:Tsunami_by_hokusai_19th_century.jpg){target="_blank" rel="noopener"} by Hokusai, in the public domain._

---
*[Jean-Luc Houédanou](https://houedanou.com)*
