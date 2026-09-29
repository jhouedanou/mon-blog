---
title: "Sharp: turn an old iMac into a second display, with no expensive cable and no hassle"
createdAt: "2026-09-29T20:30:00Z"
image: "/images/articles/sharp-imac-ecran-secondaire.webp"
description: "Sharp is a free, open source app that turns an old iMac into a second display for a newer Mac, Apple Silicon included. All you need is an Ethernet cable. What you need, how to set it up in five steps, and its limits."
searchIntent: "How can I use an old iMac as a second display for a MacBook or an Apple Silicon Mac, without Target Display Mode and without buying an expensive cable or adapter?"
tags: ["tutorial", "apple", "macos", "mac", "open-source", "hardware", "productivity"]
---

# Sharp: turn an old iMac into a second display, with no expensive cable and no hassle

Many of us have an old iMac sitting in a corner. The screen still looks great. The computer behind it has become slow, and macOS no longer updates it.

The idea is simple: keep the screen and use it as a second monitor for a newer Mac. In practice, it was complicated. Until **Sharp**, a free, open source app spotted on [Reddit (r/iMac)](https://www.reddit.com/r/iMac/comments/1wsm7f8/use_your_imac_as_a_highresolution_display_over/). It does the job with a plain Ethernet cable.

![A MacBook and an iMac showing the same picture with Sharp, in mirror mode](/images/articles/sharp-imac-ecran-secondaire.webp)

## Why it was complicated before

Apple used to offer **Target Display Mode**. It let you use an iMac as a screen. But it has three big drawbacks:

- it only works with **some iMacs from 2009 to 2014**;
- it does **not work with Apple Silicon Macs** (M1, M2, M3…);
- 5K Retina iMacs were **never** compatible.

Another option: **AirPlay to Mac**. But the iMac must be from 2019 or later. Older ones cannot receive.

That left solutions with dedicated hardware (like the Luna Display dongle), paid software, or workarounds that take a long time to set up.

## What Sharp does

Sharp was built by developer **Amine Rostane**. Version 1.0 came out at the end of September 2026. Here is what it offers:

- **two Macs linked by an Ethernet cable**, directly, with no router;
- two modes: **Mirror** (the same desktop on both screens) and **Extend** (the iMac becomes an extra screen);
- **sound** can play through the iMac's speakers;
- **free and open source** (GPLv3 licence), with the [code on GitHub](https://github.com/amineross/sharp);
- a single installer for **Intel and Apple Silicon** Macs.

## Why text stays sharp

The name says it: text stays sharp. That is the app's main strength.

The starting problem: a standard (gigabit) Ethernet link is too slow to send the raw picture. 4K at 60 frames per second needs about **twelve times** more bandwidth. So the picture has to be compressed.

Video compression (H.264) is fine for a film. But on text or code, it makes letters blurry and edges smudgy.

So Sharp combines two methods:

1. **When the picture moves** (scrolling, video), it sends compressed video. The display stays smooth.
2. **When the picture stops**, it sends small 64 × 64 pixel squares **with no loss**. They replace the video, piece by piece.

The result: you scroll a page, it is smooth. You stop to read, the text becomes sharp again, pixel for pixel.

Each square carries a version number. Sharp checks it against the displayed picture before placing it. An old square cannot cover a newer picture.

## What you need

| Item | Requirement |
| --- | --- |
| Mac sending the picture | macOS 12.3 (Monterey) or later |
| Sound on the iMac | macOS 14.2 (Sonoma) or later on the sending Mac |
| iMac used as the display | macOS 10.15 (Catalina) or later, which means a Late 2012 iMac or newer |
| Cable | an ordinary Ethernet cable (RJ45) |
| Adapter | a USB-C to **gigabit** Ethernet adapter, if your Mac has no Ethernet port |

Two notes:

- **Get a gigabit adapter** (1 Gbit/s). 100 Mbit/s models, often the cheapest, are too slow.
- **An Ethernet cable costs almost nothing.** You may already have one that came with your internet box. In total, count the price of a cable and, if needed, an adapter. That is far from the Thunderbolt cables and Apple adapters Target Display Mode required.

## Setup in five steps

The app is in English. Button names are given as they appear.

### 1. Download Sharp on both Macs

Open [aminerostane.com/sharp](https://aminerostane.com/sharp) on **each Mac** and download the installer. It is also available in the [releases on GitHub](https://github.com/amineross/sharp/releases).

### 2. Put it in Applications

Open the disk image. Drag **Sharp** into the **Applications** folder, then open it from there. Do this on both Macs.

This matters: Sharp must be in Applications to stay available after a restart.

### 3. Allow it to open

If macOS blocks the first launch, go to **System Settings → Privacy & Security**, then click **Open Anyway** for Sharp.

On older versions of macOS, look under **System Preferences → Security & Privacy**.

### 4. Choose each Mac's role

**On the newer Mac**, choose **Send this Mac**. Allow:

- **Screen Recording** (required);
- **System Audio** (only if you want sound on the iMac).

If macOS asks, reopen Sharp. Then click **Done**.

**On the iMac**, choose **Use as a display**.

### 5. Plug in the cable

Connect the two Macs with the Ethernet cable. Sharp finds the other Mac on its own and picks the right connection.

Open Sharp in the menu bar. If you see **Connected** above the other Mac's name, you are set: the picture is streaming.

## Mirror or extended display

Sharp starts in **Mirror** mode: the same desktop on both screens.

For more room, choose **Extend**. Then, in **System Settings → Displays**, arrange the screens to match your desk. All that is left is to drag a window over to the iMac.

## Useful settings

From the menu bar:

- **Cursor**: two sliders set the size and colour of the pointer on the iMac.
- **Sound**: the speaker icon chooses where sound plays (Mac or iMac).
- **Pause Sharp**: pauses the stream. You resume from the same place.

In the settings window (the gear icon):

- **Resolution**: the choices depend on the iMac's screen. By default, Sharp stays at a resolution equivalent to **2560 × 1440**. Above that, choices are marked **Experimental**. So a 5K iMac does not start in 5K by default.
- **Start Sharp when I log in**: launches Sharp when you log in.
- **Advanced**: keeps separate settings for each paired Mac, and lets you pick the Ethernet port if you have several.
- **Reports → Create report**: creates a report to attach to an issue on GitHub if something goes wrong.

## The limits

Sharp is promising, but keep this in mind:

- **No Wi-Fi.** The Ethernet cable is required.
- **Mac to Mac only.** No Windows PC, no iPad.
- **No iMac older than Late 2012.** They cannot install macOS Catalina.
- **Extend mode is fragile.** It relies on an undocumented Apple feature. A macOS update could break it. If this mode fails, Sharp falls back to Mirror on its own.
- **5K is not guaranteed.** The author has not yet validated performance at that resolution.
- **The iMac is still a computer that stays on.** It uses more power than a plain screen. If either Mac goes to sleep, the stream stops. It resumes on wake.
- **This is version 1.0**, from a single developer. Expect a few bugs.

## In short

If a 2012 to 2020 iMac is gathering dust at home and you have a newer Mac, Sharp gives you a second screen for the price of an Ethernet cable. Setup takes a few minutes, and text stays sharp.

To work on the go, an iMac won't follow you. In that case, read my review of [the portable dual monitor](/en/20260810-double-moniteur-portable-blackview-dcm6).

**Sources:**

- [Sharp announcement article](https://aminerostane.com/articles/sharp/), by Amine Rostane
- [Sharp source code on GitHub](https://github.com/amineross/sharp)
- [Discussion on Reddit (r/iMac)](https://www.reddit.com/r/iMac/comments/1wsm7f8/use_your_imac_as_a_highresolution_display_over/)
