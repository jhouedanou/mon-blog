---
title: "Turncoat: Omarchy Brought My 2017 MacBook Pro Back to Life"
createdAt: "2026-10-13T18:00:00Z"
image: "/images/articles/pingui.webp"
description: "I swore I'd never touch Omarchy, DHH's Linux distro. On Saturday, I put it on my 2017 MacBook Pro. What works, what doesn't, and where my conscience stands."
searchIntent: "What is daily use of Omarchy (Arch Linux + Hyprland) like on a 2017 Intel MacBook Pro: performance, audio, Bluetooth, external displays, and what to make of its creator DHH?"
tags: ["linux", "omarchy", "hyprland", "apple", "open-source", "opinion"]
---

I'll start with the hardest part: I turned my coat.

On Thursday, October 8, I published a post saying I wouldn't touch Omarchy, DHH's Linux distribution, because of what he writes about immigration. On Saturday the 10th, I took the post down. And that same day, I installed Omarchy on my old MacBook Pro.

Sometimes you have to admit you were wrong. And admit when you gave in to fear. The fear of endorsing him, in this case. I had mixed up two questions: what the tool is worth, and what I think of its author. And I had settled the first one without ever trying it.

So I tried it. Here's what three days of Omarchy look like on a 2017 MacBook Pro.

## What is Omarchy?

Omarchy is a distribution based on Arch Linux, with Hyprland as the desktop. No windows to drag around with the mouse: they tile themselves, and you drive them from the keyboard. Everything comes installed and preconfigured, from the shortcuts to the themes. The current version is 4.0.4, released on September 15 ([GitHub](https://github.com/omacom/omarchy/releases){target="_blank" rel="noopener"}).

Good news for old Macs: the manual promises built-in support for Intel Macs. The installer adds the Broadcom Wi-Fi drivers and the keyboard driver for 2016 and 2017 MacBook Pros on its own ([Omarchy manual](https://github.com/omacom/omarchy/blob/v4.0.4/manual/44-mac-support.md){target="_blank" rel="noopener"}). If you remember my [missing Wi-Fi under Zorin OS](/en/20261008-pas-besoin-detre-dev-ou-barbu-mac-linux), that's a relief to read.

One warning, though: Omarchy wipes the whole drive. On a Mac, it's not something you install next to macOS.

## What works

### The MacBook can breathe

It's the first thing you notice. The MacBook is snappier. The Omarchy manual, for its part, claims a 36% performance gain on a 2019 MacBook Pro just from installing the system ([Omarchy manual](https://github.com/omacom/omarchy/blob/v4.0.4/manual/44-mac-support.md){target="_blank" rel="noopener"}). And above all, on mine, the fan has calmed down.

Under macOS, all it took was opening Chrome for the MacBook to think it was a hair dryer. Now the fan only kicks in when I run a big project on Docker or on [Lerd](https://lerd.sh){target="_blank" rel="noopener"}, the Linux equivalent of Laravel Herd. In other words, when it actually has a reason to blow.

I even think I've gained battery life. I didn't measure it, so I won't give you a number. It's a feeling, but a stubborn one.

### Hyprland: two days to find your bearings

Hyprland is a different way of organizing your work. On day one, you hunt for your windows. Every new app squeezes in next to the others and re-slices the screen, and you wonder what you've got yourself into.

After two days, you find your bearings. One app per workspace, everything from the keyboard, no more windows lost behind another one. `Super + Space` opens the Omarchy menu, and from there, you can find everything.

### Configurable to your heart's content

Everything can be configured. Absolutely everything. Themes change the terminal, the browser, the bar, the notifications and the lock screen in one go. Omarchy ships 22 of them, and you can make your own in `~/.config/omarchy/themes/` ([Omarchy manual](https://github.com/omacom/omarchy/blob/v4.0.4/manual/06-themes.md){target="_blank" rel="noopener"}).

Of course, I couldn't resist. With Claude, I built my Matrix theme, all the way down to the boot screen: green character rain falls while I type the password that unlocks the drive. The Plymouth theme is online, free and MIT-licensed: [omarchy-matrix-plymouth](https://github.com/jhouedanou/omarchy-matrix-plymouth){target="_blank" rel="noopener"}. It picks up the colors of the active Omarchy theme, so it doesn't have to stay green.

### Sound, fixed with the right driver

First hiccup: no sound. The speakers stayed silent, even though the system showed a perfectly normal audio output.

It's a known issue on 2016 and 2017 MacBook Pros. Their Cirrus Logic audio chip isn't handled properly by the driver that ships with Linux ([Arch Wiki](https://wiki.archlinux.org/title/Laptop/Apple){target="_blank" rel="noopener"}). The fix is a community driver, [snd_hda_macbookpro](https://github.com/davidjo/snd_hda_macbookpro){target="_blank" rel="noopener"}. I installed it, and the sound came back. On Arch, it's also available as an AUR package:

```bash
yay -S snd-hda-macbookpro-dkms-git
```

Omarchy doesn't install it on its own yet. The issue has been open on GitHub since September 13 ([issue #11619](https://github.com/omacom/omarchy/issues/11619){target="_blank" rel="noopener"}).

### Claude, the on-call technician

This may be the real change compared to my early years on Linux. Back then, a hardware bug meant an evening on forums, reading answers from 2014 that never quite matched my machine.

Now the AIs live in the terminal. Omarchy builds them in: Claude Code, Codex, Gemini and a dozen others are ready to go, and a shortcut launches your default agent ([Omarchy manual](https://github.com/omacom/omarchy/blob/v4.0.4/manual/17-ai.md){target="_blank" rel="noopener"}). Mine is Claude. I describe the problem, I paste the error message, and we dig together: which driver is loaded, which one should be, which line to change. AI doesn't replace the documentation, but it knows where to look, and it does it in seconds. For a MacBook its maker abandoned, that's after-sales support I never expected.

## What doesn't work

### The Magic Mouse and Bluetooth

The Magic Mouse works. But it doesn't reconnect on its own. Neither do the other Bluetooth devices, for that matter. At startup, or after sleep, I have to go and fetch it by hand.

I haven't fixed it yet, but I have leads, and I'll share them. First, a mouse without a PIN has to be marked as "trusted", otherwise it may not reconnect by itself ([Arch Wiki](https://wiki.archlinux.org/title/Bluetooth){target="_blank" rel="noopener"}). Replace the address with your mouse's:

```bash
bluetoothctl trust AA:BB:CC:DD:EE:FF
bluetoothctl info AA:BB:CC:DD:EE:FF
```

The second command should show `Paired`, `Bonded` and `Trusted` set to `yes`.

Next, check that Bluetooth turns on at boot, especially if your Omarchy predates version 4. Earlier versions wrote `AutoEnable=false` to `/etc/bluetooth/main.conf`. Version 4.0 walked that back: by the admission of the comment left in the code, all that setting ever did was keep Bluetooth off at every boot ([Omarchy migration](https://github.com/omacom/omarchy/blob/v4.0.4/migrations/1786380259.sh){target="_blank" rel="noopener"}). If the line is still there on your machine, comment it out. You can also add `FastConnectable = true` in the `[General]` section to speed up connections, at the cost of a little battery ([BlueZ](https://github.com/bluez/bluez/blob/master/src/main.conf){target="_blank" rel="noopener"}).

I'm testing all this, and I'll tell you what worked.

### External displays

Plugging in an external display works. Choosing its resolution and its position relative to the MacBook's screen is another story. By default, you have to write lines in a config file, `~/.config/hypr/monitors.lua`. For someone used to dragging rectangles around in macOS Settings, that's rough.

So you need an extra tool. The Omarchy manual mentions only one: [Hyprmon](https://github.com/erans/hyprmon){target="_blank" rel="noopener"}, which shows your displays in the terminal as a map you rearrange. It handles profiles (home, office) and rolls back if a setting goes wrong ([Omarchy manual](https://github.com/omacom/omarchy/blob/v4.0.4/manual/33-monitors.md){target="_blank" rel="noopener"}). Watch out for the trap: in the AUR, the right package is called `hyprmon-bin`. The plain `hyprmon` package is a different project.

```bash
yay -S hyprmon-bin
```

That's the one I'm going to try. When you [never work on a single screen](/en/20260810-double-moniteur-portable-blackview-dcm6), it's not a luxury.

### My conscience

And then there's the problem no driver can fix.

I haven't changed my mind about what DHH writes. His posts on immigration are still online, and they still bother me just as much. When I boot Omarchy, I know who created it. I'm not going to pretend that unease has gone away.

What has changed is what I do with it. Omarchy is free software, MIT-licensed, and [more than 400 people have contributed to it](https://github.com/omacom/omarchy/graphs/contributors){target="_blank" rel="noopener"} on GitHub. The code is open, and I can do whatever I want with it. That's exactly what I did: my shortcuts, my theme, my boot screen. Omarchy bills itself as an *opinionated* distribution, shipping with its creator's technical choices. Nothing forces you to keep them. Dotfiles can be rewritten.

And yes, by writing this post, I'm giving Omarchy a bit of publicity too. I know.

Is that enough? I don't know. I'd rather tell you I don't have the answer than pretend the question doesn't exist.

## The 2017 MacBook is my main computer again

Here's the conclusion I didn't see coming. Since Saturday, I've used my 2017 MacBook Pro every day. More than the M1 MacBook, even.

The M1, for its part, feels slower to me since I installed macOS 27 "Golden Gate", as I mentioned in my [post about Mac and Linux](/en/20261008-pas-besoin-detre-dev-ou-barbu-mac-linux). Meanwhile, the machine Apple dropped after macOS Ventura opens Chrome without breaking a sweat, switches themes in a second and shows *Matrix* rain at boot. You can keep an old machine alive without asking anyone's permission. I was already doing it with my [old iMac turned into a second screen](/en/20260929-sharp-vieil-imac-ecran-secondaire-ethernet).

That leaves the big test: the printer. It stares at me. I stare back. I haven't had time to take it on yet.

On paper, Omarchy is ready: the CUPS printing service is installed and enabled, and you add a printer by searching for "Print Settings" in the menu ([Omarchy FAQ](https://github.com/omacom/omarchy/blob/v4.0.4/manual/46-faq.md){target="_blank" rel="noopener"}). One catch: since version 4.0.2, automatic discovery of network printers has been "temporarily" disabled ([release notes](https://github.com/omacom/omarchy/releases/tag/v4.0.2){target="_blank" rel="noopener"}). I may have to give it the address by hand.

If it prints, I'll tell you. If it refuses to cooperate, I'll tell you that too. We've already established that I can admit when I'm wrong.

## Sources

- Omarchy, [release notes](https://github.com/omacom/omarchy/releases){target="_blank" rel="noopener"}, including [4.0.0](https://github.com/omacom/omarchy/releases/tag/v4.0.0){target="_blank" rel="noopener"} and [4.0.2](https://github.com/omacom/omarchy/releases/tag/v4.0.2){target="_blank" rel="noopener"}
- Omarchy 4.0.4 manual: [AI](https://github.com/omacom/omarchy/blob/v4.0.4/manual/17-ai.md){target="_blank" rel="noopener"}, [Mac support](https://github.com/omacom/omarchy/blob/v4.0.4/manual/44-mac-support.md){target="_blank" rel="noopener"}, [themes](https://github.com/omacom/omarchy/blob/v4.0.4/manual/06-themes.md){target="_blank" rel="noopener"}, [monitors](https://github.com/omacom/omarchy/blob/v4.0.4/manual/33-monitors.md){target="_blank" rel="noopener"} and [FAQ](https://github.com/omacom/omarchy/blob/v4.0.4/manual/46-faq.md){target="_blank" rel="noopener"}
- GitHub, [Omarchy issue #11619: audio on Intel MacBook Pros](https://github.com/omacom/omarchy/issues/11619){target="_blank" rel="noopener"}
- GitHub, [snd_hda_macbookpro](https://github.com/davidjo/snd_hda_macbookpro){target="_blank" rel="noopener"}, Cirrus Logic audio driver for MacBook Pro
- Arch Wiki, [Laptop/Apple](https://wiki.archlinux.org/title/Laptop/Apple){target="_blank" rel="noopener"} and [Bluetooth](https://wiki.archlinux.org/title/Bluetooth){target="_blank" rel="noopener"}
- BlueZ, [main.conf configuration file](https://github.com/bluez/bluez/blob/master/src/main.conf){target="_blank" rel="noopener"}
- GitHub, [Hyprmon](https://github.com/erans/hyprmon){target="_blank" rel="noopener"}
- Lerd, [lerd.sh](https://lerd.sh){target="_blank" rel="noopener"}

---
*[Jean-Luc Houédanou](https://houedanou.com) — turncoat, reversible edition*
