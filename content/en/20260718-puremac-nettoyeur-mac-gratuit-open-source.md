---
title: "PureMac: the free tool that cleans your Mac without stealing your data"
image: "/images/articles/puremac.webp"
createdAt: "2026-07-18"
description: "PureMac is a free, open-source macOS uninstaller and cleaner with no telemetry. A credible alternative to CleanMyMac, with public code you can check before deleting anything."
searchIntent: "Is PureMac a free, open-source, telemetry-free alternative to CleanMyMac for cleaning a Mac?"
tags: ["macOS", "open-source", "cleaner", "PureMac", "free software", "Homebrew"]
---
# PureMac: the free tool that cleans your Mac without stealing your data

If you have a recent Mac (Air, Mac mini, entry-level MacBook Pro), you know the problem: Apple sells soldered SSDs that can't be upgraded, often capped at 256 GB. As a result, every gigabyte counts, and cache files, logs and leftovers from uninstalled apps end up seriously nibbling away at your space.

To deal with that, most people turn to apps like CleanMyMac. The catch? A paid subscription, telemetry switched on by default, and alerts like "47 GB of dangerous files detected!" that make you panic over nothing. I tested an alternative that really changes things: PureMac.

---

## So what is PureMac?

PureMac is a free, open-source macOS uninstaller and cleaner, released under the MIT licence. No subscription, no account to create, no telemetry. The app never "phones home"; it doesn't even know you exist.

The code is public, so if you're a developer (or just curious), you can check for yourself what the app does before deleting anything.

---

## Installation

The simplest way is through Homebrew in the terminal:

```bash
brew install --cask puremac
```

Otherwise you can download the `.dmg`, signed and notarised by Apple, straight from the [Releases page on GitHub (v2.8.3)](https://github.com/momenbasel/PureMac/releases/tag/v2.8.3), then drag the app into `/Applications`. Since it's notarised, there's no Gatekeeper warning to work around.

The project is fully open-source: the [developer's repository is on GitHub](https://github.com/momenbasel/PureMac).

And if you'd rather build it yourself from source:

```bash
brew install xcodegen
git clone https://github.com/momenbasel/PureMac.git
cd PureMac
xcodegen generate
xcodebuild -project PureMac.xcodeproj -scheme PureMac -configuration Release -derivedDataPath build build
open build/Build/Products/Release/PureMac.app
```

---

## What the app actually does

- **App uninstaller**: when you delete an app, PureMac tracks down every file it left behind (preferences, cache, containers, logs) using a 10-level matching engine.
- **Orphan file detector**: spots leftovers from apps you already removed some other way.
- **System cleaner**: system caches, Mail files, trash, Xcode leftovers, Homebrew cache, Docker, and so on.
- **Node cache cleanup**: PureMac also empties the caches of the JavaScript package managers, npm, yarn and pnpm. If you're a dev, those caches balloon quickly (several GB), and getting them back in one click makes a real difference on a 256 GB SSD.
- **Scheduled cleaning**: you can automate scans at regular intervals.

One important detail that shows how serious the project is: PureMac never sends anything straight to permanent deletion without going through a reversible step. Everything goes into the regular macOS Trash, never a definitive `rm`. If you have regrets, you get the file back.

Another honest point: the app doesn't try to "free up purgeable space", unlike other cleaners. That space is managed by macOS itself and no third-party app can reliably free it. PureMac prefers to show it to you without counting it as "to be deleted".

---

## PureMac vs CleanMyMac: the comparison

| Criterion | PureMac | CleanMyMac |
| --- | --- | --- |
| Price | Free | $40+/year |
| Open-source | Yes (MIT) | No |
| Telemetry | None | Yes |
| Subscription | No | Yes |
| Signed and notarised | Yes | Yes |
| App uninstaller | Yes | Yes |
| Recoverable deletion (Trash) | Yes | Partial |
| Honest about purgeable space | Yes | No |

The real gap isn't in features; both do roughly the same cleaning job. It's trust. CleanMyMac asks for Full Disk Access and works like a paid black box. PureMac asks for the same permission, but all the code that decides what to delete is public and verifiable.

---

## The permissions it asks for

PureMac needs Full Disk Access to read the folders macOS protects (Mail, Safari, app containers). Without that permission, the app misses about 70% of what it could clean. The onboarding on first launch walks you through enabling it, and if it gets stuck, the app opens System Settings itself and automatically restarts the cleanup once the permission is granted.

---

## My take

For someone who manages servers and several machines every day, this kind of tool that asks for neither a subscription nor blind trust is exactly what's needed. Nothing to hide, nothing to pay, and the code is right there for anyone who wants to check.

If you want to try it: `brew install --cask puremac`.
