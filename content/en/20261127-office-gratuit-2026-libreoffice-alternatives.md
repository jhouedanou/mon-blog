---
title: "It's 2026, you no longer need to buy or pirate Office"
createdAt: "2026-11-27T09:00:00Z"
image: "/images/articles/pexels-darlene-alderson-7970821.webp"
description: "LibreOffice, OpenOffice, WordCraft, DeckCraft, Elixir Office and Office on the web: free, legal office software is enough, and a crack costs more."
searchIntent: "Which free and legal Microsoft Office alternatives should you use in 2026, and why stop pirating Office?"
tags: ["opinion", "free software", "open-source", "tools", "linux"]
---

Okay, it's 2026, and some people still download an activator for Office or buy a key from a stranger, all to type a CV, a quote or three slides for a meeting. Yet there are free and legal office suites, and more than one.

## What Office costs

So yes, I know, Office is expensive. Microsoft 365 Personal costs [€99 a year](https://www.microsoft.com/fr-fr/microsoft-365/buy/compare-all-microsoft-365-products){target="_blank" rel="noopener"} in France, about 65,000 CFA francs, the currency we use in Côte d'Ivoire, and the Family plan costs €129, roughly 84,600 francs. In January 2025, Microsoft [added Copilot to both plans](https://www.microsoft.com/en-us/microsoft-365/blog/2025/01/16/copilot-is-now-included-in-microsoft-365-personal-and-family/){target="_blank" rel="noopener"}, whether you asked for it or not, and the price [went up by €3 a month at renewal](https://www.it-connect.fr/microsoft-365-personnel-et-famille-augmentation-tarifs-2025-avec-copilot/){target="_blank" rel="noopener"}. For someone who opens Word twice a month, that makes for an expensive cover letter.

## The crack, 2026 edition

Except a crack often installs something other than Office. In 2024, AhnLab researchers [took apart a fake Office crack](https://asec.ahnlab.com/en/66017/){target="_blank" rel="noopener"} spread on torrent sites. While it pretended to activate Office, it installed Orcus, which lets someone take over the computer remotely, record what you type and turn on the webcam, plus a cryptocurrency miner that puts your processor to work for someone else. And a module reinstalled everything if you removed part of it, [BleepingComputer reports](https://www.bleepingcomputer.com/news/security/pirated-microsoft-office-delivers-malware-cocktail-on-systems/){target="_blank" rel="noopener"}.

Before that, there was [the fake KMSPico](https://www.zscaler.com/blogs/cybersecurity-best-practices/kmspico-cryptbot){target="_blank" rel="noopener"}, which stole credentials, and Microsoft lists the risks on [its page about counterfeit copies](https://support.microsoft.com/en-us/accounts-billing/stay-safe-with-a-genuine-office-license){target="_blank" rel="noopener"}, with viruses, corrupted files and no security updates.

I already wrote about this for [Koala Sampler](/en/20260822-koala-sampler-gratuit-mac-boom-bap), with FL Studio "licences" sold for 5,000 francs in Facebook groups. It's the same for Office, when the free and legal versions are one download away.

## The safe bets

The first one is LibreOffice. It's published by The Document Foundation, [a non-profit foundation under German law](https://www.documentfoundation.org/foundation/){target="_blank" rel="noopener"}, born [in September 2010](https://mail-archive.com/announce@documentfoundation.org/msg00000.html){target="_blank" rel="noopener"} when part of the OpenOffice.org community left the project to start its own. You get Writer for text, Calc for spreadsheets, Impress for presentations, plus Draw, Base and Math, under the MPL 2.0 licence, with no account and no subscription. It saves in ODF, an open format standardised by ISO, and it [reads and writes .docx, .xlsx and .pptx files](https://blog.documentfoundation.org/blog/2026/08/26/libreoffice-26-8/){target="_blank" rel="noopener"}. The latest version, [26.8.3](https://blog.documentfoundation.org/blog/2026/11/12/announcement-of-libreoffice-26-8-3/){target="_blank" rel="noopener"}, came out on November 12 for Windows, macOS and Linux, and since [version 24.2](https://blog.documentfoundation.org/blog/2024/01/31/libreoffice-24-2/){target="_blank" rel="noopener"}, the version number follows the year and month of release. Version 26.8 also has no generative AI features at all, a deliberate choice according to the foundation.

And for those who think it's software for tinkerers, Schleswig-Holstein, a state in northern Germany, has moved almost 80% of its administration's workstations to LibreOffice, outside the tax administration, and [expects to save more than €15 million in Windows and Office licences](https://heise.de/-11105459){target="_blank" rel="noopener"} in 2026 alone, even though the local opposition criticises how the migration was handled.

The second one is Apache OpenOffice, the ancestor. Sun bought StarDivision, the maker of StarOffice, in 1999, and [opened its code in 2000](https://www.openoffice.org/about_us/milestones.html){target="_blank" rel="noopener"} under the name OpenOffice.org, then the project was [handed over to the Apache foundation in 2011](https://openoffice.apache.org/){target="_blank" rel="noopener"}. It's still alive, [version 4.1.17](https://openoffice.apache.org/blog/announcing-apache-openoffice-4-1-17.html){target="_blank" rel="noopener"} came out on October 14 with security fixes, and the team [dropped version 4.2](https://openoffice.apache.org/blog/what-is-going-on-in-Apache-OpenOffice-development.html){target="_blank" rel="noopener"} to work on a version 5, with fifteen contributors since January 2025. In the same post, it explains that AI coding agents help it a lot, while LibreOffice puts none in its software. If you already have OpenOffice, it does the job. If you're starting from scratch, get LibreOffice.

## The ones that intrigued me

The ArtCraft ones and Elixir Office intrigued me. I used them, but instinctively, I went back to LibreOffice.

WordCraft and DeckCraft come from the ArtCraft team, [which I wrote about in October](/en/20261009-artcraft-vibe-code-suite-adobe-saaspocalypse) when it remade the Adobe suite. They are clones of Word and PowerPoint written in Rust, open source under the MIT or Apache-2.0 licence, that open and save .docx and .pptx files directly, on [Windows, Mac and Linux](https://getartcraft.com/apps){target="_blank" rel="noopener"}. They are in alpha, and their pages say so plainly, [WordCraft](https://github.com/storytold/wordcraft){target="_blank" rel="noopener"} calls itself 60% ready for real work and [DeckCraft](https://github.com/storytold/deckcraft){target="_blank" rel="noopener"} 55%. Like the rest of the suite, they were written with Claude, to the point that The Register ran the headline "[Rust upstart reveals 'reimplementation' of Microsoft Office – with Claude on coding duty](https://www.theregister.com/a/5301952){target="_blank" rel="noopener"}" on October 8.

Elixir Office is for people who don't want to relearn where the buttons are. [Its repository](https://github.com/leag1234/elixiroffice){target="_blank" rel="noopener"} says it in one sentence, "It behaves like Microsoft Office", with the ribbon, the shortcuts and the KeyTips. It's under the AGPL licence, with no telemetry and no account, and [version 0.9.5](https://github.com/leag1234/elixiroffice/releases){target="_blank" rel="noopener"} came out yesterday, November 26, for Windows, Mac (Apple chips only) and Linux. It's a beta, and the project warns you, "Expect rough edges".

That said, between the two families, I prefer the ones with their own identity, like LibreOffice, to the ones that slavishly copy Office's. I already said it about [Lemon Studio, the FL Studio clone](/en/20261026-lemon-studio-clone-fl-studio), AI makes copying easy, but not originality.

## Office on the web for clients' files

There's one case where I still open something from Microsoft. When a client sends me a .docx or a .pptx that displays badly in LibreOffice, I open it in [the free web version of Office](https://www.microsoft.com/fr-fr/microsoft-365/free-office-online-for-the-web){target="_blank" rel="noopener"}. Word, Excel and PowerPoint are free in the browser with a Microsoft account, with 5 GB of OneDrive storage, but [with no desktop apps and no new features](https://support.microsoft.com/en-us/office/what-s-the-difference-between-a-microsoft-365-subscription-and-free-web-apps-36a2c67d-3488-4cad-ae9d-470d0086e2b9){target="_blank" rel="noopener"}. To check a document and send it back to the client, that's more than enough.

## The one I use

So there you go, if someone asks me which one I use, it's LibreOffice, because it's stable. It asks me for no account and no subscription, its price doesn't go up at renewal since there's nothing to renew, and a new version comes out every six months. After all, a word processor is just one way among others to write a document, and for writing, I prefer [Nuxt Studio](https://nuxt.studio/){target="_blank" rel="noopener"} or [iA Writer](/en/20241020-ghostwriter-une-alternative-gratuite-a-ia-writer-pour-linux). As for the crack, I'll leave it to those who want to lend their webcam to a stranger.

_Photo: [Darlene Alderson](https://www.pexels.com/@darlene-alderson/){target="_blank" rel="noopener"}, on Pexels._

---
*[Jean-Luc Houédanou](https://houedanou.com)*
