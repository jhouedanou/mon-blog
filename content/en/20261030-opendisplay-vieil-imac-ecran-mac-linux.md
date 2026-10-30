---
title: "OpenDisplay: an old iMac as a free second screen for a Mac or a Linux PC"
createdAt: "2026-10-30T15:00:00Z"
image: "/images/articles/opendisplay-macbook-omarchy-imac.webp"
description: "OpenDisplay, free and open source, turns an old iMac into a screen for a Mac or a Linux PC. Step-by-step setup, and what you lose in picture quality."
searchIntent: "How can I use an old iMac as a free second screen for a Mac or a Linux PC with OpenDisplay, and what picture quality should I expect?"
tags: ["tutorial", "apple", "macos", "mac", "linux", "omarchy", "open-source", "hardware"]
---

**Short answer.** OpenDisplay is a free, open source app. It turns an old iMac into the second screen of a newer Mac or of a Linux PC. You install a receiver on the iMac, a sender on the other machine, and that's it. But the picture travels as compressed video: it is less sharp and less smooth than a real screen on a cable. The numbers are below.

I did it with my 2017 MacBook Pro running Omarchy: the iMac does show its extended desktop.

![On the left, the 2017 MacBook Pro running Omarchy, with the od-sender install and logs in the terminal. On the right, the iMac showing the MacBook's extended desktop](/images/articles/opendisplay-macbook-omarchy-imac.webp)

## OpenDisplay in short

- **Free**: no subscription, no account, no dongle to buy. The code is open (GPL-3.0 licence) [on GitHub](https://github.com/peetzweg/opendisplay){target="_blank" rel="noopener"}.
- **Two apps**: a sender on the machine that draws the picture, a receiver on the iMac that shows it.
- **A real extra screen**: the computer sees the iMac as a monitor. You drag windows onto it.
- **Wi-Fi or cable** between two Macs (Thunderbolt, Ethernet or USB-C). From Linux, over the network only.
- **No server**: one direct connection between the two machines.

OpenDisplay also works with an iPhone, an iPad or an Android tablet. Here, I only cover the iMac.

## What you need

| Item | Requirement |
| --- | --- |
| iMac that shows the picture | macOS 12 Monterey or later, so an iMac from late 2015 or newer |
| Mac that sends | macOS 14 Sonoma or later, Intel or Apple Silicon |
| Linux PC that sends | a Wayland desktop: Hyprland 0.55 or later (Omarchy), or recent Sway, KDE Plasma, GNOME. No X11 |
| Link | the same network (Wi-Fi or router), or a cable between two Macs |

Two traps:

- **An iMac from 2012 to 2014 cannot be the screen**: it does not get macOS Monterey. For that one, see [Sharp](/en/20260929-sharp-vieil-imac-ecran-secondaire-ethernet).
- **A Mac too old for Sonoma cannot send.** My 2017 MacBook Pro, for example, stops at macOS Ventura. Under [Omarchy](/en/20261013-retournement-de-veste-omarchy-macbook-pro-2017), though, it can be the sender: that is the setup in the photo. Hence the Linux case below.

## On the iMac: install the receiver

This step is the same in both cases.

On the iMac, download `OpenDisplayReceiver.dmg` from the [latest release on GitHub](https://github.com/peetzweg/opendisplay/releases/latest){target="_blank" rel="noopener"}. Drag the app to **Applications**. Or, with Homebrew:

```bash
brew install --cask opendisplay-receiver
```

Open **OpenDisplay Receiver**. Allow **Local Network** access when macOS asks. The iMac now waits for a connection.

The app is signed and notarized by Apple: no warning on first launch. It updates itself.

## Case 1: from a Mac to the iMac

1. On the newer Mac, install the sender: `OpenDisplay.dmg`, on the same GitHub page, or:

   ```bash
   brew install --cask opendisplay
   ```

2. Open **OpenDisplay**. In **System Settings → Privacy & Security**, allow **Screen Recording** and **Local Network**. Without them, the iMac stays black or does not show up, with no error message.
3. The iMac shows up in the app's device list. Pick it.
4. Drag a window to the iMac. Arrange the screens in **System Settings → Displays**.

To use a cable, link the two Macs with a Thunderbolt or Ethernet cable. A USB-C **data** cable works too if both Macs run a recent macOS (a charge-only cable does not work). OpenDisplay moves to the cable by itself, even mid-session.

## Case 2: from a Linux PC to the iMac

The Linux sender is called `od-sender`. It is **in beta**.

**On Omarchy or Arch**, build the package that ships in the repository:

```bash
sudo pacman -S --needed base-devel git
git clone https://github.com/peetzweg/opendisplay
cd opendisplay/linux/packaging/arch/opendisplay-sender
./from-checkout.sh -si
```

The official documentation says `makepkg -si` instead. On 30 October 2026, on my machine, that command failed with the error `cd: opendisplay-1.25.0/linux: No such file or directory`. The `from-checkout.sh` script, in the same folder, builds the repository's current version (1.30.1 for me), and it works.

It also installs the build tools (Rust, clang and, on an Intel or AMD PC, nasm). So it asks for your password. The build takes a few minutes, longer on a small machine.

**On another distribution** (Ubuntu 24.04, Debian 13, Fedora 39 or newer), get the ready-made archive from the [releases page](https://github.com/peetzweg/opendisplay/releases/latest){target="_blank" rel="noopener"}, then:

```bash
tar xf od-sender-$(uname -m)-unknown-linux-gnu.tar.gz && cd od-sender-$(uname -m)-unknown-linux-gnu
./install.sh
```

Then, with the receiver open on the iMac:

```bash
od-sender doctor          # checks that your desktop is supported
od-sender list            # lists the screens found on the network
od-sender run --to iMac   # extends the desktop onto the iMac
```

After `--to`, type part of the name that `list` shows. On Omarchy, send a window to the iMac with **Super + Shift + →**. **Ctrl + C** stops everything and removes the virtual screen.

## The quality trade-offs, plainly

OpenDisplay does not plug the iMac in like a real screen. The sender records a virtual screen, compresses it into video and sends it. The iMac decodes that video and shows it. Each step costs something.

**1. The picture is heavily compressed.** Between two Macs, the stream uses at most 18 Mb/s. A raw 5K picture at 30 frames per second needs about 10 Gb/s. So the picture is compressed several hundred times. On text that does not move, it holds up well. When the picture moves, details drop out for a moment.

**2. Colours lose detail.** Colour travels at a quarter of the resolution (4:2:0 format). Black text on white stays sharp. Coloured text, such as syntax colouring in a code editor, gets a little blurry at the edges.

**3. On a 5K iMac, you choose between sharp and smooth.** These are the developer's measurements, from an M5 Pro MacBook Pro to a 2017 5K iMac, over a cable:

| iMac setting | Sender quality | Desktop | Frames per second | Latency |
| --- | --- | --- | --- | --- |
| Default | Best | 2560 × 1440 | about 30 | about 30 ms |
| Default | Fast | 2560 × 1440 | about 58 | about 12 ms |
| 1600 × 900 | Best | 1600 × 900 | about 55 | about 15 ms |

In plain terms: at full sharpness, the 5K iMac shows 30 frames per second. Fine for reading and writing, less so for video. To get 60 frames per second, you accept a softer picture (**Fast**) or a smaller desktop. With an older chip, you get less: an M1 Pro drops to about 23 frames per second at 5K.

**4. An Intel Mac limits the resolution.** HEVC, the sharper format, is only used when the sending Mac has an Apple chip and the iMac decodes HEVC (most Macs from 2017 on). Otherwise it is H.264, capped at 4096 × 2304 pixels. On a 5K iMac, the desktop then drops from 2560 × 1440 to 2048 × 1152 points. On the other hand, a non-Retina 1920 × 1080 iMac gets its picture pixel for pixel, at 60 frames per second.

**5. From Linux, it is slower and heavier.** The Linux sender does not use the graphics card: the processor does all the work. It has no HEVC. To a 5K iMac, expect 55 to 70 ms of latency, against about 20 ms to an iPhone, and a busy processor. On Hyprland, the cursor is drawn into the video: it follows the mouse with a delay. And the Linux version is only officially tested on Omarchy for Apple Silicon Macs (Asahi Linux). On an Intel or AMD PC, it "is expected to work", according to the developer. On my 2017 MacBook Pro, an Intel Mac, it works.

On that MacBook, the `od-sender` logs (visible in the photo) show about 24 ms to encode a frame, and roughly 60 to 100 ms from capture to send. Add the network and the display on the iMac on top of that. When nothing moves on screen, the sender sends almost nothing: less than one frame per second.

On a modest machine, lower the frame rate:

```bash
od-sender run --to iMac --max-fps 30
```

A smaller resolution on the iMac also lightens the load.

**6. Wi-Fi adds hitches.** Between two Macs, prefer the cable. On Wi-Fi, on the sending Mac, set AirDrop to **Contacts Only** or **No One**. With **Everyone**, the Mac's Wi-Fi pauses for about 75 ms twice a second to look for devices, and the picture jumps each time.

**What is still missing:**

- **no sound** through the iMac's speakers;
- **the iMac's keyboard and mouse** do not control the other machine (it is planned);
- **from Linux, the stream is not encrypted**: use it only on a network you trust. No mirror mode either;
- **on the Mac side, OpenDisplay relies on an undocumented Apple feature**: a macOS update can break it;
- **a purple dot** shows in the sending Mac's menu bar. That is normal: macOS tells you the screen is being recorded;
- **the iMac is still a computer that stays on**: it uses more power than a plain screen.

## Which setting to pick

- **Reading, writing, coding**: keep the defaults (**Best** on the sender, the default resolution on the iMac).
- **Sharp and smooth**: on the iMac, in **System Settings → Displays**, go one or two steps toward "Larger Text".
- **Video and animation**: pick **Fast** on the sender.

## OpenDisplay or Sharp?

I already covered [Sharp](/en/20260929-sharp-vieil-imac-ecran-secondaire-ethernet), which does the same job between two Macs.

- **Sharp** sends still text losslessly, so it is perfectly sharp. It sends sound. It accepts iMacs from late 2012, and the sending Mac can run macOS 12.3. But it needs a cable, and it only works between two Macs.
- **OpenDisplay** works over Wi-Fi, accepts a Linux PC as the sender, and also works with an iPhone or an iPad. But everything goes through compressed video, without sound.

For reading and coding between two Macs on a cable, Sharp gives sharper text. For a Linux PC or a Wi-Fi link, OpenDisplay is the only one of the two that works.

**Sources:**

- [OpenDisplay website](https://opendisplay.app/){target="_blank" rel="noopener"}
- [OpenDisplay README on GitHub](https://github.com/peetzweg/opendisplay){target="_blank" rel="noopener"}: FAQ, measurements and comparison
- [Installing the Linux sender](https://opendisplay.app/docs/linux/install/){target="_blank" rel="noopener"}, official documentation
- [Linux sender README](https://github.com/peetzweg/opendisplay/blob/main/linux/README.md){target="_blank" rel="noopener"}: supported desktops and known issues
- [from-checkout.sh script](https://github.com/peetzweg/opendisplay/blob/main/linux/packaging/arch/opendisplay-sender/from-checkout.sh){target="_blank" rel="noopener"}, in the OpenDisplay repository

---
*[Jean-Luc Houédanou](https://houedanou.com)*
