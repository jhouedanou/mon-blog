---
title: "NETUM A401S on Linux: Claude Got It Talking"
createdAt: "2026-10-21T16:00:00Z"
image: "/images/articles/pexels-towfiqu-barbhuiya-9755391.webp"
description: "NETUM A401S on Linux: my Bluetooth thermal printer only printed from an Android app. Claude decoded its language, CPCL. Now it prints, widget included."
searchIntent: "How do you print from Linux to a driverless Bluetooth A4 thermal printer (NETUM / Zjiang A401S, ScanPrint app), and how can AI help recover its protocol?"
tags: ["linux", "omarchy", "AI", "vibe coding", "hardware", "open-source", "dev"]
---

A few days ago, while my NETUM A401S thermal printer still didn't work on Linux, Ryan Doyle shared a funny experiment on X. He sent Claude his smart TV's listing with one question, "Can you hack this?", and the AI walked him through it step by step. He has no more ads or forced apps, and he has a faster interface and the screensaver of his choice ([TechCrunch](https://techcrunch.com/2026/10/19/people-are-using-ai-to-make-their-smart-tvs-dumb-again/){target="_blank" rel="noopener"}).

The internet says he "vibe coded" his TV, and TechCrunch talks about making smart TVs "dumb again". I'd rather say he made it smarter, because a TV that only obeys its owner finally deserves the word *smart*.

The idea has been picked up on GitHub, with projects like [tv-vibehack](https://github.com/Gathin23/tv-vibehack){target="_blank" rel="noopener"} and [dumbtv](https://github.com/humblemuzzu/dumbtv){target="_blank" rel="noopener"}. The principle is always the same: Android TVs have the same debugging tool as our phones, ADB, and Claude uses it to switch off the clutter ([It's FOSS](https://itsfoss.com/news/debloat-smart-tv/){target="_blank" rel="noopener"}).

That gave me an idea. In [my review of Omarchy on the 2017 MacBook Pro](/en/20261013-retournement-de-veste-omarchy-macbook-pro-2017), I left you with a printer I hadn't had time to try yet. If Claude can make a TV smarter, maybe it can get my printer working on Linux.

I promised to tell you whether it would print. It prints. Claude found what was wrong and fixed it, and as a bonus, I have a widget.

## A NETUM A401S that only worked with Android

The printer is an **A401S** sold by NETUM, a small portable A4 thermal printer, with no ink, a battery, Bluetooth and an Android app called **ScanPrint**. From the phone, everything works.

From my 2017 MacBook Pro running Omarchy, nothing. In the previous post, I reassured myself that the CUPS print service comes preinstalled, but you still need a driver. And there is no driver, nothing in CUPS, and the documentation boils down to "download the app".

An Android TV can be driven with the debugging tool Google built in, but my printer has nothing like that, and we had to find the protocol it uses.

## Claude investigates

I opened Claude Code in the terminal, where I take my problems since I moved to Omarchy, and handed it this one.

### It beeps, but prints nothing

A Bluetooth scan finds it right away: `A401S-545974`, with a "printer" icon. Asked for its services, it advertises both:

- the classic **serial port profile** (SPP, `0x1101`);
- several **Bluetooth Low Energy** services (`18f0`, `fee7`, `ff00`…).

Most small thermal printers understand **ESC/POS**, the language of receipt printers, so we started there. Claude opens a Bluetooth serial channel (RFCOMM) in Python, without installing anything, using just the `socket` module:

```python
s = socket.socket(socket.AF_BLUETOOTH, socket.SOCK_STREAM, socket.BTPROTO_RFCOMM)
s.connect(("28:D4:1E:54:59:74", 1))
```

The connection goes through without pairing. Claude sends an ESC/POS image (`GS v 0`) and… two beeps, but not a single printed line. Same thing at full A4 width, same thing with an end-of-page command.

### The Bluetooth Low Energy detour

Since the serial port gave nothing, the next lead was BLE, because maybe that's what the phone used. BlueZ, the Linux Bluetooth stack, kept connecting over classic Bluetooth, since the printer does both. But since version 3.14, Python can open an ATT channel over Low Energy directly ([Python documentation](https://docs.python.org/3/library/socket.html){target="_blank" rel="noopener"}):

```python
s = socket.socket(socket.AF_BLUETOOTH, socket.SOCK_SEQPACKET, socket.BTPROTO_L2CAP)
s.bind(("00:00:00:00:00:00", 0, 4, socket.BDADDR_LE_PUBLIC))
s.connect((addr, 0, 4, socket.BDADDR_LE_PUBLIC))
```

That let us list its services: a data channel, `ff02`, with **credit-based flow control** (the printer announces `01 07` then `02 f4 00`, meaning "7 packets ahead, 244 bytes max"), and an `ff80` channel that answers `ERROR` to everything. That one is the Bluetooth module's AT command interface, best left alone.

It was instructive, but still nothing on paper, neither in ESC/POS nor in the "Luck Jingle" format, another common family. It received the data without ever answering.

### The right lead was in the app

The app's name is what unblocked everything. We got the ScanPrint APK (`com.netum.scanprint`) and decompiled it with [jadx](https://github.com/skylot/jadx){target="_blank" rel="noopener"}. The interface is in Flutter, but the Bluetooth part stayed in Java. Three findings were enough.

**1. The model gets special treatment.**

```java
if (name.startsWith("A401S") || name.startsWith("A403S") || name.startsWith("LT-D80S")) {
    dpi = 300; dotsPerMm = 12;
} else {
    dpi = 203; dotsPerMm = 8;
}
```

It's a 300 dpi printer, not 203 dpi. Every width sent so far was wrong.

**2. The transport really is the classic serial port** (`00001101-…`, SPP). The very first attempt was on the right channel, but with the wrong content.

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

On top of that, the printer **answers in JSON**. The app's status request is:

```
1F 57 10 00 30 02 0A 00 00 00 52 45 41 44 5F 49 4E 46 4F 00   ("READ_INFO")
```

And the answer:

```json
{"brand":"zjiang","model":"A401S","hardVer":"v1.2","softVer":"1.01",
 "battery":14,"charger":0,"paperType":0,"printerStatus":6}
```

That confirms the original manufacturer, Zjiang, and finally explains the beeps, since according to the app's code, `printerStatus: 6` means **low battery**, and it was at 14%. So the beeps signaled a low battery and not a misunderstanding, and what blocked printing was the language.

## The first page printed from Linux

With the right format, the test band finally comes out, and the printer confirms:

```json
{"printResult":"success","printMsg":"77"}
```

A full A4 page follows, generated with ImageMagick in PBM format. This black-and-white format, one bit per dot (most significant bit on the left, 1 for black), is exactly what `CG` expects, with no conversion needed.

One problem, it takes **4 minutes** to send an uncompressed page, about 1 MB. The app compresses its bands with MiniLZO, and the Java class is in fact called `NativeMiniLZO`. And MiniLZO is the LZO1X-1 algorithm, which the `liblzo2` library provides in every major Linux distribution ([LZO](https://www.oberhumer.com/opensource/lzo/){target="_blank" rel="noopener"}). A few lines of `ctypes` are enough:

```python
lib = ctypes.CDLL(ctypes.util.find_library("lzo2"))
lib.lzo1x_1_compress(src, len(src), dst, ctypes.byref(dst_len), workmem)
```

A test band then shrinks from several dozen KB to **8 KB, sent in 3 seconds**.

## As a bonus, a command and a widget

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

The widget only queries the printer **when the panel opens**, because each request opens a Bluetooth connection and the printer beeps on every connection. Refreshing every 30 seconds would quickly have become unbearable.

The code (the command, the widget and the protocol description) is MIT-licensed. If you have an A403S or an LT-D80S, the app treats them like the A401S, so they should work as is. I'd love to hear how it goes.

## What I take away from it

- **A beep isn't a protocol error.** Here, it signaled the connection, then a low battery. Reading the printer's status would have saved time, but first we had to know the command.
- **BLE was a false lead.** The serial port was the right one from the first attempt, it was missing the right language.
- **The app's name beats any amount of random guessing.** Once the APK was decompiled, the whole protocol fit in about a hundred lines of Java.
- **Don't touch what you don't understand.** The `ff80` channel, the one for the Bluetooth module's AT commands, could have been used to rename the module or mess it up. We only sent read requests there, and left it alone as soon as we understood what it was. On the TV side, not everyone was that careful, and TechCrunch quotes someone who says they bricked their Android TV with Claude.

## My distro-hopping days are over

A distro hopper is someone who switches Linux distributions very often, always looking for the one where everything will work the first time. I was one, with Zorin OS on my HP Pro x2 tablet, back when I discovered [Ghostwriter](/en/20241020-ghostwriter-une-alternative-gratuite-a-ia-writer-pour-linux) on it, [Zorin again, on a MacBook](/en/20261008-pas-besoin-detre-dev-ou-barbu-mac-linux) where the Wi-Fi never worked, then [Omarchy, installed reluctantly after boycotting it](/en/20261008-omarchy-dhh-homme-dotfiles).

I think my distro-hopping days ended today.

Omarchy isn't perfect, you've read about my struggles with the Magic Mouse and external displays. But a distro hopper's hope is often that the next distribution will have the right driver, while my printer had no driver on any distribution, and it prints anyway, from my desktop's bar. When the driver doesn't exist, there's no point switching distributions to find it, you have to write it.

## The power of Linux

The power of Linux, for me, is a system that never tells you "that's not supported", far more than the tiling desktop, the themes or the *Matrix* rain at boot, much as I love it. Bluetooth is a socket there, which Python opens with its standard module, the image is a PBM file and compression is a free library every distribution ships. On the Linux side, everything was already there, documented and open, and all we had to do was put it together.

Claude did the research, and Linux provided the tools without locking anything down. Ryan Doyle made his TV smarter. My printer still only understands CPCL, but now Linux can send it, on a MacBook its manufacturer abandoned, with a printer whose manufacturer never gave Linux a thought.

Nobody gave me permission, and nobody had to.

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
*[Jean-Luc Houédanou](https://houedanou.com)*
