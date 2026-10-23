---
title: "Netflix goes black on a DisplayLink screen: 3 fixes on a Mac"
createdAt: "2026-10-23T21:00:00Z"
image: "/images/articles/pexels-luca-sammarco-6142159.webp"
description: "On a Mac, Netflix shows a black picture as soon as a DisplayLink screen is plugged in. Three fixes, and the native port on the Ugreen CM555 dock."
searchIntent: "How do I watch Netflix on a Mac connected to a DisplayLink dock when the video stays black but the sound works, and which port on the Ugreen CM555 dock is native?"
tags: ["tutorial", "apple", "macos", "hardware", "tech"]
---

**Short answer.** On a Mac, Netflix shows a black picture, with sound, as soon as a screen is connected through DisplayLink. Three fixes: turn off hardware acceleration in Chrome or Edge, watch on a screen that doesn't use DisplayLink, or plug the screen into a native video output. On the Ugreen CM555 dock, the native output is the **HDMI 2** port.

## My hardware

I keep my machines for a long time and get everything I can out of them. At home, I work on an **M1 MacBook**, the base model. I use it almost like a desktop computer.

The catch: a base M1 Mac only handles **one external display**. I have two:

- a **34-inch curved Xiaomi Mi Monitor**;
- a **29-inch Lenovo ultrawide**.

![A curved ultrawide monitor on a desk, with a keyboard, a mouse and a headset](/images/articles/pexels-minhphuc-workspace-20648391.webp)

To connect both, I use a **Ugreen CM555** dock (model 90325, also sold as the Revodok Pro 312). It's a bit expensive, but it's worth the price. It uses **DisplayLink**: a piece of software, DisplayLink Manager, adds screens to the Mac and sends them the picture over the USB cable. That's what makes [my multi-screen layout](/en/20260810-double-moniteur-portable-blackview-dcm6) possible.

![A laptop connected to a USB-C adapter](/images/articles/pexels-pixabay-461461.webp)

For coding, everything is fine. For Netflix, it's another story.

## The problem: sound, but no picture

With a DisplayLink screen connected, the video starts, the sound plays, but the picture stays black. DisplayLink acknowledges this in [its documentation](https://support.displaylink.com/knowledgebase/articles/830301-content-protected-video-does-not-play-on-mac-while){target="_blank" rel="noopener"}. Netflix isn't alone: Disney+, Amazon Prime Video, HBO, YouTube TV, Udemy and iTunes are affected too.

The most annoying part: according to DisplayLink, **as soon as one DisplayLink screen is connected, protected video can be blocked on every screen**, including the Mac's own.

Why? A DisplayLink screen isn't connected to the graphics card. The software copies the screen's picture, then sends it over USB. That's why macOS asks you to give it the "Screen Recording" permission ([Deux Ordis](https://deuxordis.xyz/blog/displaylink-mac-autorisations/){target="_blank" rel="noopener"}, in French). Netflix videos, however, are protected against copying. They don't go through that path: instead, you get a black rectangle.

## Fix 1: turn off hardware acceleration (Chrome or Edge)

This is the fix that DisplayLink and Anker suggest. It works in **Google Chrome** and **Microsoft Edge**, but not in Safari or Firefox ([Anker](https://service.anker.com/article-description/What-Should-I-Do-If-Protected-Videos-Won-t-Play-On-My-Mac-When-Connected-to-a-DisplayLink-Monitor-A83B3?ref=Home_Page){target="_blank" rel="noopener"}).

1. Open Google Chrome or Microsoft Edge.
2. Go to **Settings** (three-dot menu, top right).
3. Search for or open **System**.
4. Turn off "**Use graphics acceleration when available**" (in Edge: "Use hardware acceleration when available").
5. Quit the browser completely (`Cmd + Q` on a Mac), then open it again.

Don't skip step 5. On the [DisplayLink forum](https://www.displaylink.org/forum/showthread.php?t=69146){target="_blank" rel="noopener"}, a user explains in January 2026 that the setting only worked after quitting and reopening Chrome.

Good to know: without acceleration, the processor does all of the browser's graphics work. If Chrome gets slow, turn the option back on after the movie.

## Fix 2: switch browsers or watch on the Mac's screen

DisplayLink also offers two simple options ([DisplayLink support](https://support.displaylink.com/knowledgebase/articles/830301-content-protected-video-does-not-play-on-mac-while){target="_blank" rel="noopener"}):

- **Try another browser.**
- **Watch the video on the Mac's built-in screen.** If the picture stays black, unplug the DisplayLink screen for the length of the movie.

Tip: no need to touch the cables. DisplayLink screens only work while DisplayLink Manager is running. Quit it from its icon in the menu bar: the DisplayLink screens go dark. Open it again after the movie.

## Fix 3: plug the screen into a native video output

To watch on a big screen without changing any settings, you need a **native video output**: a USB-C to HDMI or DisplayPort cable, or an adapter that doesn't use DisplayLink ([Deux Ordis](https://deuxordis.xyz/blog/displaylink-mac-autorisations/){target="_blank" rel="noopener"}, [Reddit](https://www.reddit.com/r/mac/comments/18yui77/how_to_stream_netflixhulu_while_using_a/){target="_blank" rel="noopener"}). Not every USB-C adapter uses DisplayLink, but some do. Read the product page before you buy.

### On the Ugreen CM555 dock, the HDMI 2 port is native

Good news: on the Ugreen CM555 dock, not every video port goes through DisplayLink. The **HDMI 2** port (the one marked 8K) is a native output: it works even without DisplayLink Manager. The HDMI 1 port and the DisplayPort go through DisplayLink ([DisplayLink forum](https://www.displaylink.org/forum/archive/index.php/t-69160.html){target="_blank" rel="noopener"}).

So plug the screen you watch movies on into the HDMI 2 port.

Two limits:

- **Only one native output.** A base M1 Mac has just one. So only one screen can sit on the HDMI 2 port. The other one stays on DisplayLink.
- **The other screen can still get in the way.** According to DisplayLink, a connected DisplayLink screen can block video on every screen. If the picture stays black on the HDMI 2 screen, quit DisplayLink Manager for the length of the movie, or use fix 1.

To find out which screen is on the native port: quit DisplayLink Manager. The screen that stays on is the one plugged into the native port.

## In short

| Fix | What to do | Limit |
|---|---|---|
| Turn off hardware acceleration | Change the setting in Chrome or Edge, then `Cmd + Q` | Not in Safari or Firefox |
| Another browser or the Mac's screen | Switch browsers, or quit DisplayLink Manager | The DisplayLink screen goes dark during the movie |
| Native video output | Plug the screen into the CM555's HDMI 2 port, or use a USB-C to HDMI cable | Only one native output on a base M1 Mac |

---

*Photos: [Luca Sammarco](https://www.pexels.com/photo/6142159/), [minhphuc .workspace](https://www.pexels.com/photo/20648391/) and [Pixabay](https://www.pexels.com/photo/461461/), Pexels.*

---
*[Jean-Luc Houédanou](https://houedanou.com) — two screens for coding, one for Netflix*
