---
title: "You can't separate the man from his dotfiles"
createdAt: "2026-10-08T13:00:00Z"
updatedAt: "2026-10-13T21:00:00Z"
image: "/images/articles/pingui.webp"
description: "I followed Korben in his boycott of Omarchy, DHH's Linux distro. Three days later, I'm flip-flopping: Omarchy brought my old MacBook back to life."
searchIntent: "Why boycott Omarchy, DHH's Linux distribution, and why install it anyway on an old 2017 MacBook Pro?"
tags: ["opinion", "linux", "open-source", "society"]
---

I'm about to flip-flop.

On October 8, I published a post here saying I was following Korben in his boycott of Omarchy, DHH's Linux distribution. I promised not to talk about it here and not to recommend it. Three days later, Omarchy runs on my 2017 MacBook Pro. And here I am, talking about it.

The reason fits in one sentence: an OS with Claude built in, that spares me too much tinkering and that looks good? I'm in.

I explain everything below, along with the changes I had to make to bring the MacBook back to life. But first, here's what I wrote on October 8. I take nothing back about DHH.

## What I wrote on October 8

I rarely pick up another blogger's post. It's not my thing, I'd rather write my own nonsense. But today, it comes from Korben.

Yes, Korben. The French blogger I've been accused of copying for fifteen years.

Quick aside, since we're here. Let's settle this once and for all: it's my writing style, it's my voice. I write short sentences and I talk about tech from Abidjan. That's called having a personality.

But back to the topic.

### What Korben says

This morning, Korben published [« Omarchy, non merci »](https://korben.info/omarchy-dhh-boycott.html){target="_blank" rel="noopener"} (« Omarchy, no thanks »). He announces that he will no longer use or promote Omarchy, and explains why.

Let me be clear right away: I agree with him. Not because it's Korben, but because on this one, he's right. And since I'm not here to polish anyone's shoes, I'll add what he can't say for me: seen from Abidjan, this debate has a slightly different flavour.

For those who don't follow: Omarchy is an Arch-based Linux distribution, with a keyboard-driven tiling desktop, themes that restyle the whole system at once, and a two-minute install. It's pretty, it's fast, it's very trendy among developers. Its creator is DHH, David Heinemeier Hansson, the man behind Ruby on Rails and 37signals.

And DHH has a blog.

### What DHH writes

For over a year now, on [his blog](https://world.hey.com/dhh){target="_blank" rel="noopener"}, DHH no longer talks only about code. He talks about immigration. Korben quoted four posts, here's the short version:

- **[« As I remember London »](https://world.hey.com/dhh/as-i-remember-london-e7d38e64){target="_blank" rel="noopener"}** (September 2025): he refuses to let a country go through a « demographic replacement » like the one he says London went through.
- **[« Europe is weak and delusional (but not doomed) »](https://world.hey.com/dhh/europe-is-weak-and-delusional-but-not-doomed-8b10e7cb){target="_blank" rel="noopener"}** (December 9, 2025): he contrasts selective, American-style immigration with mass immigration from regions he describes as having low average IQ and « net negative contributors ».
- **[« Three sacred cows that must die so Europe can live »](https://world.hey.com/dhh/three-sacred-cows-that-must-die-so-europe-can-live-1afb203d){target="_blank" rel="noopener"}** (July 16, 2026): immigration would fix neither the birth rate, nor pensions, nor the economy, and millions of people already living in Europe should leave.
- **[« Wolves, sheep, and gypsies »](https://world.hey.com/dhh/wolves-sheep-and-gypsies-ba44af6a){target="_blank" rel="noopener"}** (July 21, 2026): he compares the Roma to wolves and writes that when they « take over public spaces », you deport them.

I checked, all four posts are still online. In the same list, there's also a June 2026 post titled [« The Rape of Britain »](https://world.hey.com/dhh/the-rape-of-britain-610412f8){target="_blank" rel="noopener"}. I'll let you imagine the level of nuance.

### Those « regions » are where I live

Let me tell you why Korben's post hit me harder than usual.

When DHH talks about « low average IQ regions » sending « net negative contributors », he isn't talking about an abstraction. He's talking about West Africa, among others. He's talking about Abidjan, Dakar, Lagos, Cotonou. He's talking about the diaspora in Paris, Brussels or London, and about Ivorian developers coding for European companies from their living rooms in Cocody.

He's talking about me.

And you know what's funny? A whole generation of developers, me included, read DHH for years: on Rails, on remote work, on leaving the cloud. The guy taught us things. And all that time, in his head, part of his readership was low-IQ people from problem regions.

This isn't « politics ». I have no problem with someone who thinks immigration should be regulated, that it's up for discussion, that rules are needed. That's a debate, and I can have that debate. But ranking entire peoples by supposed IQ and comparing a minority to wolves is not a debate. It's sorting people. And we know exactly how Europe ended up the last time it started sorting people.

Yes, I know: Godwin's law. It's actually the first one in this blog's history. I own it. When someone ranks entire peoples by supposed IQ, the comparison isn't hyperbole, it's a reminder.

### « You have to separate the man from the work »

Someone will bring it up, so I'll answer right away: no.

You can't separate the man from his ideas or his actions. A song, a book, a piece of software: every time you consume them, you let a bit of the person into your home.

And with Omarchy, it's even more literal than with a song or a book. Omarchy sells itself as an *opinionated* distribution: DHH's choices, his shortcuts, his apps, his dotfiles, installed as-is on your machine. The work is literally the man's taste. His name is all over the site, he gives the talks, he is the product.

Omarchy has opinions, that's its selling point. The problem is the opinions.

Then there's the money. As Korben points out, 1Password and 37signals have each pledged $100,000 a year, for three years, to the foundation behind Omarchy ([It's FOSS](https://itsfoss.com/news/1password-omarchy-pledge/){target="_blank" rel="noopener"}). 1Password's CEO told his staff the company doesn't endorse DHH's views. Fine. But it signs the check. When you put your logo on the stage, you can't pretend you didn't hear what's being said into the mic.

Of course, this doesn't mean everyone who uses or contributes to Omarchy thinks like him. Korben says it, and I'll say it again: most people don't care, or don't know. Now you know.

### What I'm doing

My boycott won't shake anyone, I know. But I won't talk about it here, I won't recommend it, and if you ask me for a distro to get started or to show off a tiling desktop, I'll send you elsewhere.

Because the good news is that everything Omarchy offers exists without DHH. Arch Linux, CachyOS or EndeavourOS for the base. Hyprland for the tiling desktop. Dozens of community dotfiles on GitHub for the looks. It might take you an hour instead of two minutes. An hour is a fair price for not installing the taste of a guy who thinks you or your neighbour have no business being on his continent.

Free software, at its core, is a humanist project. The idea that knowledge belongs to everyone, that anyone, anywhere, can read code, change it and share it. A kid from Abobo has exactly the same rights over the Linux kernel as an engineer in Copenhagen. That's even why many of us here fell into it. A distro that puts forward a man who wants to sort people by origin is a contradiction in terms.

## What you told me

After the October 8 post, I got some reactions. Here are two (translated from French).

The first, about Omarchy:

> It manages to make Linux sexy where the other commercial distros failed. That said, I don't use it, because I'm not a fan of Arch or Hyprland.

The second:

> I'm on Omarchy and I love this distribution, I find it really perfect for me. But I read your post and now I'm torn: I love this distribution, but what he writes is hateful.

That's where I am too.

## Why I'm flip-flopping

Let's start with the obvious: I'm contradicting myself. I wrote that you can't separate the man from his dotfiles, and now I'm installing his dotfiles. I won't pretend it's consistent. Here's what tipped the scales.

In the first place, I wanted to try [Ryoku](https://ryoku.dev){target="_blank" rel="noopener"}, an Omarchy alternative also based on Arch Linux. In the end, I installed Omarchy, for these reasons.

**Claude is built in.** Omarchy ships with Claude Code, Anthropic's coding assistant, and with OpenCode ([Omarchy manual](https://learn.omacom.io/2/the-omarchy-manual/107/ai){target="_blank" rel="noopener"}). The `cx` command starts Claude Code in « danger mode », meaning it doesn't ask for confirmation at every step. Omarchy also ships a « skill », instructions the assistant reads to change the system: the top bar, the themes. The manual calls it experimental. And Claude is how I fixed the MacBook's problems, as you'll see below.

**Less tinkering.** I wrote that you could rebuild everything without DHH, with Arch, Hyprland and some dotfiles: « It might take you an hour instead of two minutes. » I was optimistic. Putting all that together yourself takes much more than an hour. Omarchy arrives ready: desktop, shortcuts, apps, themes. And updates go through a single command that takes a snapshot of the system before touching anything. If an update breaks something, you reboot into the snapshot from before ([Omarchy manual](https://learn.omacom.io/2/the-omarchy-manual/68/updates){target="_blank" rel="noopener"}).

**It looks good.** An Omarchy theme restyles the whole system at once: terminal, bar, windows, wallpaper. I wrote it myself: « It's pretty ». Still true.

**It doesn't pay him.** Omarchy is free software, under the MIT licence ([GitHub](https://github.com/basecamp/omarchy){target="_blank" rel="noopener"}). I pay nothing to use it. The money Korben mentioned comes from sponsors like 1Password, not from users.

**His life is his life.** I don't pick my tools based on the private lives of the people who make them. Tim Cook's or Sam Altman's private life is their own business, and that's how it should be.

**Nobody's perfect.** Elon Musk, I'd rather not get into it. And I'm no role model either: I lost my hair along the way and gained a few kilos.

## Omarchy brought my old MacBook back to life

Apple stopped updating the 2017 MacBook Pro after macOS Ventura: Sonoma no longer supports it ([Apple](https://support.apple.com/en-us/105113){target="_blank" rel="noopener"}). Mine was no longer in use. Today, it runs Omarchy, with Linux kernel 7.2.

Omarchy didn't fix everything on its own. Here are the three changes I had to make.

### Wi-Fi: settings on the CanalBox

Right after the install, Wi-Fi didn't work. I had to change some settings on my CanalBox, my internet box.

### Updates: `omarchy update`, not `pacman -Syu`

On Arch, the reflex is `sudo pacman -Syu`. Omarchy stopped me cold with a « Woah partner ». You have to go through its own command:

```bash
omarchy update
```

It takes a snapshot, applies Omarchy's migrations (configuration changes), then updates the packages. With `pacman -Syu`, you risk missing those migrations.

### Sound: a driver to compile

These MacBooks use a Cirrus CS8409 audio chip. For the speakers to work on Linux, you need a community-maintained driver, [snd_hda_macbookpro](https://github.com/davidjo/snd_hda_macbookpro){target="_blank" rel="noopener"}. It compiles on the machine.

1. Install the build tools and the Omarchy kernel headers. Don't skip this step: the driver script needs them.

```bash
sudo pacman -S --needed base-devel git wget patch dkms linux-omarchy-headers
```

2. Download and install the driver:

```bash
git clone https://github.com/davidjo/snd_hda_macbookpro.git
cd snd_hda_macbookpro
sudo ./install.cirrus.driver.sh -i
```

3. Reboot, then test with the volume low:

```bash
speaker-test -c 2 -t wav -l 1
```

You should hear « Front Left », then « Front Right ». The driver goes through DKMS: it rebuilds itself on every kernel update done with `omarchy update`.

## Conclusion

Apple had dropped this MacBook. Omarchy got it running again.

On DHH, I haven't changed my mind: his posts on immigration are what they are, and on that point I still agree with Korben. On Omarchy, I have changed my mind. It's not glorious, but I'd rather tell you than hide it.

Three days later, I took stock: what works, what still doesn't (Bluetooth, external displays), and the printer waiting for me. It's all in [Omarchy on My 2017 MacBook Pro: Three Days In](/en/20261013-retournement-de-veste-omarchy-macbook-pro-2017).

## Sources

- Korben, [« Omarchy, non merci »](https://korben.info/omarchy-dhh-boycott.html){target="_blank" rel="noopener"}, October 8, 2026 (in French)
- DHH's blog: [world.hey.com/dhh](https://world.hey.com/dhh){target="_blank" rel="noopener"}
- It's FOSS, [« 1Password Just Pledged $300,000 to DHH's Omarchy, and its Own Employees Aren't Happy »](https://itsfoss.com/news/1password-omarchy-pledge/){target="_blank" rel="noopener"}, September 3, 2026
- Ryoku, [ryoku.dev](https://ryoku.dev){target="_blank" rel="noopener"}
- Omarchy manual: [« AI »](https://learn.omacom.io/2/the-omarchy-manual/107/ai){target="_blank" rel="noopener"} and [« Updates »](https://learn.omacom.io/2/the-omarchy-manual/68/updates){target="_blank" rel="noopener"}
- Omarchy on [GitHub](https://github.com/basecamp/omarchy){target="_blank" rel="noopener"} (MIT licence)
- Apple, [macOS Sonoma is compatible with these computers](https://support.apple.com/en-us/105113){target="_blank" rel="noopener"}
- davidjo, [snd_hda_macbookpro](https://github.com/davidjo/snd_hda_macbookpro){target="_blank" rel="noopener"}, audio driver for Cirrus CS8409 chips
