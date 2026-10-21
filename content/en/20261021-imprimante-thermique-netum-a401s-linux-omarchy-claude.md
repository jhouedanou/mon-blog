---
title: "NETUM A401S Thermal Printer on Linux: Claude Got It Talking"
createdAt: "2026-10-21T16:00:00Z"
image: "/images/articles/pexels-towfiqu-barbhuiya-9755391.webp"
description: "My NETUM A401S thermal printer only printed from an Android app. Claude decoded its language: it now prints on Linux (Omarchy), widget included."
searchIntent: "How do you print from Linux to a driverless Bluetooth A4 thermal printer (NETUM / Zjiang A401S, ScanPrint app), and how can AI help recover its protocol?"
tags: ["linux", "omarchy", "AI", "vibe coding", "hardware", "open-source", "dev"]
---

A few days ago, Ryan Doyle shared a funny experiment on X. He sent Claude his smart TV's listing with one question: "Can you hack this?" The AI walked him through it step by step. The result: no more ads, no more forced apps, a faster interface and the screensaver of his choice ([TechCrunch](https://techcrunch.com/2026/10/19/people-are-using-ai-to-make-their-smart-tvs-dumb-again/){target="_blank" rel="noopener"}).

The internet says he "vibe coded" his TV. TechCrunch even talks about making smart TVs "dumb again". Personally, I'd rather say he made it smarter. A TV that only obeys its owner is finally a TV that deserves the word *smart*.

The idea has spread on GitHub, with projects like [tv-vibehack](https://github.com/Gathin23/tv-vibehack){target="_blank" rel="noopener"} and [dumbtv](https://github.com/humblemuzzu/dumbtv){target="_blank" rel="noopener"}. The principle is always the same: Android TVs have the same debugging tool as our phones, ADB, and Claude uses it to switch off the clutter ([It's FOSS](https://itsfoss.com/news/debloat-smart-tv/){target="_blank" rel="noopener"}).

That gave me an idea. In [my last Omarchy post](/en/20261013-retournement-de-veste-omarchy-macbook-pro-2017), I left you with a printer staring at me. I was staring back. If Claude can make a TV smarter, maybe it can teach my printer to talk to Linux.

I promised to tell you whether it would print. It prints. Claude found what was wrong, and fixed it. And as a bonus, I even have a widget.

## A printer that only talked to Android

The printer is an **A401S** sold by NETUM: a small portable A4 thermal printer. No ink, a battery, Bluetooth, and an Android app called **ScanPrint**. From the phone, everything works.

From my 2017 MacBook Pro running Omarchy, nothing. In the previous post, I reassured myself that the CUPS print service comes preinstalled. You still need a driver. No driver, nothing in CUPS, and documentation that boils down to "download the app".

An Android TV can be driven with the debugging tool Google built in. My printer has nothing like that. No service door. We had to find the language it speaks.

## Claude investigates

I opened Claude Code in the terminal, my on-call technician since I moved to Omarchy, and handed it the case.

### First contact: it beeps, but prints nothing

A Bluetooth scan finds it right away: `A401S-545974`, with a "printer" icon. Asked for its services, it advertises both:

- the classic **serial port profile** (SPP, `0x1101`);
- several **Bluetooth Low Energy** services (`18f0`, `fee7`, `ff00`…).

First instinct: most small thermal printers understand **ESC/POS**, the language of receipt printers. So Claude opens a Bluetooth serial channel (RFCOMM) in Python, without installing anything, using just the `socket` module:

```python
s = socket.socket(socket.AF_BLUETOOTH, socket.SOCK_STREAM, socket.BTPROTO_RFCOMM)
s.connect(("28:D4:1E:54:59:74", 1))
```

The connection goes through without pairing. Claude sends an ESC/POS image (`GS v 0`) and… two beeps, but not a single printed line. Same thing at full A4 width, same thing with an end-of-page command.

### The Bluetooth Low Energy detour

Since the serial port gave nothing, the next lead was BLE: maybe the phone went through there. BlueZ, the Linux Bluetooth stack, kept connecting over classic Bluetooth, since the printer does both. But since version 3.14, Python can open an ATT channel over Low Energy directly ([Python documentation](https://docs.python.org/3/library/socket.html){target="_blank" rel="noopener"}):

```python
s = socket.socket(socket.AF_BLUETOOTH, socket.SOCK_SEQPACKET, socket.BTPROTO_L2CAP)
s.bind(("00:00:00:00:00:00", 0, 4, socket.BDADDR_LE_PUBLIC))
s.connect((addr, 0, 4, socket.BDADDR_LE_PUBLIC))
```

That made it possible to list its services: a data channel, `ff02`, with **credit-based flow control** (the printer announces `01 07` then `02 f4 00`, meaning "7 packets ahead, 244 bytes max"), and an `ff80` channel that answers `ERROR` to everything. That one is the Bluetooth module's AT command interface. Best left alone.

Instructive, but still nothing on paper, neither in ESC/POS nor in the "Luck Jingle" format, another common family. It swallowed the data without ever answering.

### The right lead: read the app

The app's name is what unlocked everything. We got the ScanPrint APK (`com.netum.scanprint`) and decompiled it with [jadx](https://github.com/skylot/jadx){target="_blank" rel="noopener"}. The interface is in Flutter, but the Bluetooth part stayed in Java. Three findings were enough.

**1. The model gets special treatment.**

```java
if (name.startsWith("A401S") || name.startsWith("A403S") || name.startsWith("LT-D80S")) {
    dpi = 300; dotsPerMm = 12;
} else {
    dpi = 203; dotsPerMm = 8;
}
```

It's a 300 dpi printer, not 203 dpi. Every width sent so far was wrong.

**2. The transport really is the classic serial port** (`00001101-…`, SPP). The very first attempt was on the right channel. It was the content that was wrong.

**3. The language is CPCL**, not ESC/POS. The app builds text like this:

```
! 0 300 300 3480 1
PW 2496
DENSITY 2
MYPHOTOS 0
CG 312 13 0 0 <binary data>
...
FORM
PRINT
```

The image is cut into bands: `CG` for a raw band, `GG` for an **LZO**-compressed band. The page ends with `FORM` and `PRINT`. Before all that, a binary command sets the paper type.

The icing on the cake: the printer **answers in JSON**. The app's status request is:

```
1F 57 10 00 30 02 0A 00 00 00 52 45 41 44 5F 49 4E 46 4F 00   ("READ_INFO")
```

And the answer:

```json
{"brand":"zjiang","model":"A401S","hardVer":"v1.2","softVer":"1.01",
 "battery":14,"charger":0,"paperType":0,"printerStatus":6}
```

That confirms the real manufacturer, Zjiang, and finally explains the beeps: according to the app's code, `printerStatus: 6` means **low battery**. 14%. The beeps didn't mean "I don't understand". They meant "I'm hungry". The real blocker was the language.

## The first page

With the right format, the test band finally comes out, and the printer confirms:

```json
{"printResult":"success","printMsg":"77"}
```

A full A4 page follows, generated with ImageMagick in PBM format. This black-and-white format, one bit per dot (most significant bit on the left, 1 for black), is exactly what `CG` expects. No conversion needed.

One problem: **4 minutes** to send an uncompressed page, about 1 MB. The app compresses its bands with MiniLZO: the Java class is literally called `NativeMiniLZO`. And MiniLZO is the LZO1X-1 algorithm, which the `liblzo2` library provides in every major Linux distribution ([LZO](https://www.oberhumer.com/opensource/lzo/){target="_blank" rel="noopener"}). A few lines of `ctypes` are enough:

```python
lib = ctypes.CDLL(ctypes.util.find_library("lzo2"))
lib.lzo1x_1_compress(src, len(src), dst, ctypes.byref(dst_len), workmem)
```

A test band then shrinks from several dozen KB to **8 KB, sent in 3 seconds**.

## Bonus: a command and a widget

### The `a401s-print` command

`a401s-print` is a Python script with no Python packages to install, built on standard Linux tools: BlueZ, ImageMagick, Poppler and liblzo2.

```bash
a401s-print --status
#  Imprimante : zjiang A401S (A401S-545974, 28:D4:1E:54:59:74)
#  État       : prête
#  Batterie   : 31 %

a401s-print rapport.pdf            # all pages
a401s-print -p 2-3 rapport.pdf     # a few pages
a401s-print --photo photo.jpg      # dithering for photos
```

It finds the printer on its own, converts PDFs to 300 dpi with `pdftoppm`, scales to A4 width, compresses, sends, then waits for each page's JSON confirmation.

### The widget in Omarchy's bar

And because Omarchy can be configured to your heart's content, the printer now has its icon in the top bar. A click opens a panel with live status and battery, a button to the file picker, darkness (light, normal, dark), a photo mode and a progress bar. The panel just calls `a401s-print --json`, which outputs one event line per printing step.

One detail that matters: the widget only queries the printer **when the panel opens**. Each request opens a Bluetooth connection, and the printer beeps on every connection. Refreshing every 30 seconds would quickly have become unbearable.

The code (the command, the widget and the protocol description) is MIT-licensed. If you have an A403S or an LT-D80S, the app treats them like the A401S: they should work as is. I'd love to hear how it goes.

## What I take away from it

- **A beep isn't a protocol error.** Here, it signaled the connection, then a low battery. Reading the printer's status would have saved time, but first we had to know the command.
- **BLE was a red herring.** The serial port was the right one from the first attempt. It just needed the right language.
- **The app's name beats any amount of random guessing.** Once the APK was decompiled, the whole protocol fit in about a hundred lines of Java.
- **Don't touch what you don't understand.** The `ff80` channel, the one for the Bluetooth module's AT commands, could have been used to rename the module or mess it up. We only sent read requests there, and left it alone as soon as we understood what it was. On the TV side, not everyone was that careful: TechCrunch quotes someone who says they bricked their Android TV with Claude.

## My distro-hopping days are over

A distro hopper is someone who switches Linux distributions every other week, always looking for the one where everything will work the first time. I was one. Zorin OS on my HP Pro x2 tablet, back when I discovered [Ghostwriter](/en/20241020-ghostwriter-une-alternative-gratuite-a-ia-writer-pour-linux) on it. Zorin again, on a MacBook where the Wi-Fi [never wanted to show up](/en/20261008-pas-besoin-detre-dev-ou-barbu-mac-linux). Then Omarchy, [installed reluctantly](/en/20261008-omarchy-dhh-homme-dotfiles).

I think my distro-hopping days ended today.

Not because Omarchy is perfect: you've read about my struggles with the Magic Mouse and external displays. A distro hopper's hope is often that the next distribution will have the right driver. My printer had no driver anywhere, on any distribution. And it prints anyway, from my desktop's bar. When the driver doesn't exist, there's no point switching distributions to find it. You write it.

## The power of Linux

The power of Linux isn't the tiling desktop, or the themes, or the *Matrix* rain at boot, even though I'm attached to it. It's a system that never tells you "that's not supported". Bluetooth is just a socket there, which Python opens with its standard module. The image is a PBM file. Compression is a free library every distribution ships. On the Linux side, everything was there, documented, open. All we had to do was put the pieces together.

Claude led the investigation. Linux provided the tools, without locking anything down. Ryan Doyle made his TV smarter. My printer still only speaks CPCL. But now, Linux speaks it too. On a MacBook its manufacturer abandoned, with a printer whose manufacturer never gave Linux a thought.

Nobody gave me permission. Nobody had to.

## Sources

- Sarah Perez, TechCrunch, ["People are using AI to make their smart TVs dumb again"](https://techcrunch.com/2026/10/19/people-are-using-ai-to-make-their-smart-tvs-dumb-again/){target="_blank" rel="noopener"}, October 19, 2026
- Abhishek Prakash, It's FOSS, ["People Are Using AI to Get Rid of Smart TV Ads and Make Their TVs Faster"](https://itsfoss.com/news/debloat-smart-tv/){target="_blank" rel="noopener"}, October 19, 2026
- Ryan Doyle on X, [the original post](https://x.com/doooyle/status/2111196679680540724){target="_blank" rel="noopener"}
- GitHub, [tv-vibehack](https://github.com/Gathin23/tv-vibehack){target="_blank" rel="noopener"} and [dumbtv](https://github.com/humblemuzzu/dumbtv){target="_blank" rel="noopener"}
- Python, [socket module documentation](https://docs.python.org/3/library/socket.html){target="_blank" rel="noopener"}
- GitHub, [jadx](https://github.com/skylot/jadx){target="_blank" rel="noopener"}, Android app decompiler
- Markus Oberhumer, [LZO and miniLZO](https://www.oberhumer.com/opensource/lzo/){target="_blank" rel="noopener"}

---

*Photo: [Towfiqu barbhuiya](https://www.pexels.com/photo/9755391/), Pexels.*

---
*[Jean-Luc Houédanou](https://houedanou.com) — retired distro hopper*
