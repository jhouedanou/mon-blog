---
title: "MacSai and Mole: two free alternatives to CleanMyMac"
createdAt: "2026-09-01"
image: "/images/articles/macao.webp"
description: "After PureMac, two other free and open-source cleaners for macOS are worth a look: MacSai, which mirrors CleanMyMac feature for feature, and Mole, a command-line tool designed for developers."
searchIntent: "Which free and open-source alternatives to CleanMyMac should you install on a Mac in 2026?"
tags: ["macOS", "open-source", "cleaner", "free software", "Homebrew"]
---

# MacSai and Mole: two free alternatives to CleanMyMac

In July, I told you about [PureMac](/en/20260718-puremac-nettoyeur-mac-gratuit-open-source), a free, telemetry-free cleaner for Mac. The situation hasn't changed since: Apple's soldered SSDs fill up fast, and CleanMyMac wants a subscription to empty caches that macOS knows perfectly well how to empty on its own.

Since then, two other projects have caught my attention. They're nothing alike, and that's precisely why I'm telling you about them together.

## MacSai, the unapologetic CleanMyMac clone

[MacSai](https://github.com/iliyami/MacSai) is free and open-source software, under the BSD licence, written in Swift 6 and SwiftUI. The project's goal is clear: reproduce every important CleanMyMac feature, with no subscription, no ads and no telemetry. The code is public, the app is notarised by Apple, and the project claims more than 480 automated tests.

You'll find everything you'd expect from a full cleaner: system caches and logs, an uninstaller that tracks down files apps forget, a malware scanner, startup item management, duplicate detection, and a visual disk map to spot the folders that weigh a lot. One detail I hadn't seen anywhere else: universal binary thinning, which strips the Intel part out of apps on Apple Silicon Macs.

On first launch on my MacBook, a Smart Scan sent 5.66 GB to the trash: 4.42 GB of useless system files and 2.96 GB of browsing traces. Nothing is erased permanently, everything goes through the macOS Trash, which leaves time to recover a file if in doubt.

It requires macOS 14 at minimum. Installation is a one-liner:

```bash
brew install --cask mac-sai
```

The DMG is also available on the project's [Releases page](https://github.com/iliyami/MacSai/releases/latest).

## Mole, for those who live in the Terminal

[Mole](https://github.com/tw93/Mole), developed by tw93, takes the opposite path. No window, no buttons, everything happens in the Terminal. The project is free, open-source under the GPL licence, and it bundles into a single binary what CleanMyMac, AppCleaner, DaisyDisk and iStat Menus do.

```bash
brew install mole
```

Once installed, the command is called `mo`. Here are the four to remember:

```bash
mo clean       # nettoyage en profondeur des caches et restes d'applications
mo uninstall   # désinstallation complète d'une application
mo analyze     # explorateur visuel du disque
mo status      # tableau de bord système en temps réel
```

What won me over is the `--dry-run` option available on every destructive command: Mole shows you what it intends to delete before touching a single file. A log of operations is kept, and you can protect certain caches with a whitelist. When you spend your days in a terminal, it's faster than any interface.

The developer also offers a graphical version, Mole for Mac, which organises the same tools into themed "planets". That one is paid, a one-off purchase of around 19 dollars with no subscription, with a free trial where each tool works twice. The Terminal version, for its part, remains free.

## Which one to choose?

If you want an interface and the complete equivalent of CleanMyMac, go for MacSai. If you live in the Terminal, go for Mole. And if you're simply looking for a clean, no-frills uninstaller, PureMac still does the job very well.

In all three cases, the code can be read by anyone, nothing leaves your machine, and you pay nothing. Hard to do better as a comparison with CleanMyMac.

[Jean Luc Houédanou](https://houedanou.com)
