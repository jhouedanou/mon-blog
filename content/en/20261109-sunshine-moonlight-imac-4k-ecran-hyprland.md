---
title: "Sunshine + Moonlight: a 4K iMac as a monitor"
createdAt: "2026-11-09T12:00:00Z"
draft: true
image: "/images/articles/imac-2017-macos-ssd-externe.webp"
description: "No Target Display Mode on the 2017 4K iMac? Sunshine and Moonlight turn it into the monitor of a Hyprland PC, over a Thunderbolt cable. Step by step."
summary: "The 2017 Retina 4K iMac has no Target Display Mode. With Sunshine on a PC running Omarchy, Moonlight on the iMac and a Thunderbolt cable, it still becomes a second screen. It plays the sound too, and its keyboard and mouse control the PC."
searchIntent: "How can I use a 2017 Retina 4K iMac, which has no Target Display Mode, as the monitor of a Linux PC (Hyprland, Omarchy) with Sunshine, Moonlight and a Thunderbolt cable?"
tags: ["tutorial", "apple", "macos", "mac", "linux", "omarchy", "open-source", "hardware"]
---

Yes, I know, I keep coming back to this, but I just think this computer is too beautiful to let it gather dust.

Here's how to turn my 2017 21.5-inch Retina 4K iMac into the monitor of my 2017 MacBook Pro running [Omarchy](/en/20261013-retournement-de-veste-omarchy-macbook-pro-2017). You need two free apps, **Sunshine** on the MacBook and **Moonlight** on the iMac, and a Thunderbolt cable between the two. No need to open the iMac.

It's my fourth post about this iMac, after [Sharp](/en/20260929-sharp-vieil-imac-ecran-secondaire-ethernet), the [external SSD](/en/20261014-installer-macos-ssd-externe-imac-2017) and [OpenDisplay](/en/20261030-opendisplay-vieil-imac-ecran-mac-linux).

## Why not a plain video cable

This iMac has no **Target Display Mode**. Apple keeps it for some iMacs from 2009 to mid-2014, running macOS High Sierra or earlier ([Apple page](https://support.apple.com/en-us/105126){target="_blank" rel="noopener"}). No Retina iMac is on the list.

The iMac's Thunderbolt 3 ports send a picture to an external display ([Apple tech specs](https://support.apple.com/en-us/112026){target="_blank" rel="noopener"}). They don't receive one. No cable or setting changes that.

That leaves two options:

- **software**: the method in this post. The cable is a fast network link, not a video cable;
- **hardware**: remove the iMac's logic board and fit a controller board made for its panel. On this model, the panel is an LG LM215UH1-SDB1, according to [iFixit's teardown](https://www.ifixit.com/Guide/iMac+Intel+21.5-Inch+Retina+4K+Display+%282017%29+Teardown/92170){target="_blank" rel="noopener"}. Still, check the label on the back of yours before you buy. The iMac becomes a real 4K monitor plugged in directly, but it's no longer a computer.

I'm starting with software: it's free, and you can undo it.

## Sunshine and Moonlight in short

- **Sunshine** is an open source streaming server. It captures a screen and sends it as video over the network. It's made for games, but it can stream the whole desktop too.
- **Moonlight** is the client. On the iMac, it receives the video and shows it full screen.
- **Hyprland**, Omarchy's window manager, creates a **virtual screen**. The MacBook sees it as a real extra monitor. Sunshine captures that virtual screen, and the iMac shows it.
- **The Thunderbolt cable** connects the two machines directly, with no router or Wi-Fi.
- **The sound** follows the video to the iMac. **In the other direction**, the iMac's keyboard and mouse control the MacBook. Sound, keyboard and mouse are all on by default ([Sunshine configuration](https://docs.lizardbyte.dev/projects/sunshine/latest/md_docs_2configuration.html){target="_blank" rel="noopener"}).

![Diagram: Hyprland creates a virtual screen on the MacBook, Sunshine compresses it and sends it over the Thunderbolt cable (10.0.0.1 to 10.0.0.2), Moonlight shows it on the iMac with the sound. The iMac's keyboard and mouse control the MacBook. The virtual screen must exist before Sunshine starts.](/images/articles/sunshine-moonlight-schema-en.svg)

## What you need

| Item | Details |
| --- | --- |
| The iMac | here a 2017 21.5-inch Retina 4K iMac, running macOS Ventura |
| The sending PC | here a 2017 MacBook Pro running Omarchy 4 (Hyprland) |
| The cable | a Thunderbolt 3 cable, plugged into a Thunderbolt port on each machine |
| The software | Sunshine on the PC, Moonlight on the iMac, both free |

The commands in this post are written for **Omarchy 4**. That version configures Hyprland in Lua files (`~/.config/hypr/*.lua`) and handles networking with NetworkManager ([Omarchy manual](https://github.com/omacom/omarchy/blob/v4.0.4/manual/35-networking.md){target="_blank" rel="noopener"}). On another distribution, the idea is the same, but the files differ.

## Step 1: the Thunderbolt cable as a network

Plug the cable into both machines.

**On the iMac**: **System Settings → Network → Thunderbolt Bridge → Details → TCP/IP**. In **Configure IPv4**, choose **Manually**, then:

- IP address: `10.0.0.2`
- subnet mask: `255.255.255.0`

**On the MacBook (Omarchy)**, create a fixed connection for the cable with NetworkManager:

```bash
nmcli connection add type ethernet ifname thunderbolt0 con-name imac ipv4.method manual ipv4.addresses 10.0.0.1/24
nmcli connection up imac
ping 10.0.0.2
```

NetworkManager keeps this connection: it comes back by itself every time you plug in the cable.

If the other machine is a Mac, the `thunderbolt-net` driver loads by itself when you plug in the cable ([Linux kernel documentation](https://docs.kernel.org/admin-guide/thunderbolt.html){target="_blank" rel="noopener"}). If `nmcli` can't find `thunderbolt0`, load it by hand with `sudo modprobe thunderbolt-net`, then try again.

## Step 2: the virtual screen in Hyprland

In `~/.config/hypr/monitors.lua`, add a line for the virtual screen, which I call `imac`:

```lua
hl.monitor({ output = "imac", mode = "3840x2160@60", position = "auto", scale = 2 })
```

It's the same syntax as the examples already in that file ([Omarchy manual, monitors](https://github.com/omacom/omarchy/blob/v4.0.4/manual/33-monitors.md){target="_blank" rel="noopener"}). This line does nothing until the `imac` screen exists.

Then create the virtual screen:

```bash
hyprctl output create headless imac
```

Why 3840 × 2160, when the iMac's panel is 4096 × 2304?

- **3840 × 2160** is standard 4K. At scale `2`, the desktop is 1920 × 1080 points, and text stays crisp. The iMac enlarges the picture by about 7% to fill its panel: text is slightly less sharp than at native resolution.
- **4096 × 2304** matches the panel, but that size goes beyond the usual HEVC limits (levels 5.x: at most 8,912,896 pixels per frame, versus 9,437,184 here). Depending on the chip, compression or playback can fail ([HEVC levels](https://en.wikipedia.org/wiki/High_Efficiency_Video_Coding_tiers_and_levels){target="_blank" rel="noopener"}). Try it if you like, with the same resolution in Moonlight.
- **If the picture stutters**, switch to `mode = "1920x1080@60"` and `scale = 1`. It's lighter, but less sharp.

## Step 3: Sunshine on the MacBook

Omarchy has a command for this ([Omarchy manual, gaming](https://github.com/omacom/omarchy/blob/v4.0.4/manual/26-gaming.md){target="_blank" rel="noopener"}):

```bash
omarchy install service sunshine
```

According to [its script](https://github.com/omacom/omarchy/blob/v4.0.4/bin/omarchy-install-service-sunshine){target="_blank" rel="noopener"}, it:

- installs Sunshine and starts it every time you log in;
- opens Moonlight's ports in the firewall for private networks, including `10.0.0.0/8`. So our cable is covered. Without this, Omarchy's firewall blocks all incoming traffic;
- adds a **Sunshine Admin** app: Sunshine's settings page, at `https://localhost:47990`.

Open **Sunshine Admin** and create a login. If you use a browser instead, it warns about an untrusted certificate: that's normal, Sunshine signs its own.

Then, in `~/.config/sunshine/sunshine.conf`, tell Sunshine which screen to capture:

```ini
capture = wlr
output_name = imac
```

- `capture = wlr` captures the screen through the wlr-screencopy protocol ([Sunshine configuration](https://docs.lizardbyte.dev/projects/sunshine/latest/md_docs_2configuration.html){target="_blank" rel="noopener"}). The [sunshine-hyprland-virtual-display](https://github.com/jhonsnake/sunshine-hyprland-virtual-display){target="_blank" rel="noopener"} project uses this method with Hyprland.
- `output_name` takes the screen's name. Sunshine's documentation even recommends the name over the number, as it's more stable.
- Sound goes to the iMac by default. If you'd rather hear it on the MacBook, add `stream_audio = disabled`.

Finally, restart Sunshine so it reads these settings:

```bash
systemctl --user restart sunshine
```

⚠️ **The virtual screen must exist before Sunshine starts.** According to the sunshine-hyprland-virtual-display project, Sunshine only reads `output_name` at startup. If the `imac` screen doesn't exist yet, the iMac shows the MacBook's screen, or a black picture.

## Step 4: Moonlight on the iMac

1. Install Moonlight, from [moonlight-stream.org](https://moonlight-stream.org/){target="_blank" rel="noopener"} or with Homebrew:

   ```bash
   brew install --cask moonlight
   ```

2. Open Moonlight. Click **+** and add the host `10.0.0.1`.
3. A PIN shows up. Type it into the **PIN** tab of Sunshine Admin, on the MacBook.
4. In Moonlight's settings, choose:
   - resolution: **4K** (3840 × 2160), the same as the virtual screen. If you picked another resolution in step 2, use the same one here;
   - frames per second: 60;
   - video codec: HEVC;
   - bitrate: near the top of the slider. The Thunderbolt 3 cable goes up to 40 Gb/s ([Apple tech specs](https://support.apple.com/en-us/112026){target="_blank" rel="noopener"}), far more than Moonlight sends.
5. Launch **Desktop**.

## Step 5: using the screen

The `imac` screen behaves like an external monitor. Move the MacBook's mouse over to it, or send a workspace there:

```bash
hyprctl dispatch moveworkspacetomonitor 5 imac
```

Replace `5` with the number of the workspace you want to move.

**Next time**, after the MacBook restarts, the virtual screen is gone, but Sunshine starts again by itself. Create the screen again, then restart Sunshine:

```bash
hyprctl output create headless imac
systemctl --user restart sunshine
```

**When you're done**, remove the virtual screen. Otherwise, windows can open on it without you seeing them:

```bash
hyprctl output remove imac
```

## If it doesn't work

- **Moonlight can't find the MacBook**: first check that `ping 10.0.0.2` gets a reply. Then run `sudo ufw status`: Sunshine's rules are tagged `omarchy-sunshine`. If you installed Sunshine another way, open the cable by hand: `sudo ufw allow in on thunderbolt0`.
- **The iMac shows the MacBook's screen or a black picture**: Sunshine started before the virtual screen. Check that `imac` shows up in `hyprctl monitors`, then run `systemctl --user restart sunshine`.
- **The picture is blurry**: Moonlight's resolution doesn't match the virtual screen's. Use the same on both sides.
- **Nothing shows at 4096 × 2304**: go back to 3840 × 2160, on both sides.

## Sunshine and Moonlight, or OpenDisplay?

I've already tested [OpenDisplay on this same MacBook running Omarchy](/en/20261030-opendisplay-vieil-imac-ecran-mac-linux), and it works: the iMac does show the extended desktop. But on Linux, OpenDisplay compresses the picture with the processor alone. On my MacBook, its logs showed about 24 ms to compress a frame, and 60 to 100 ms from capture to send. At 60 frames per second, you need a new frame every 16.7 ms: the processor can't keep up at that pace.

Sunshine can compress with the graphics chip instead, through VA-API on Intel and AMD chips ([Sunshine README](https://github.com/LizardByte/Sunshine){target="_blank" rel="noopener"}). For 4K, Sunshine suggests at least an Intel HD Graphics 510. The 2017 MacBook Pro has a 7th-generation Intel chip (Kaby Lake), which is newer. To check that it can compress HEVC, run `vainfo` (package `libva-utils`) and look for a `VAProfileHEVCMain` line followed by `VAEntrypointEncSlice`.

Both methods do the same job: capture a virtual screen, compress it into video, show it on the iMac. The differences:

| | OpenDisplay | Sunshine and Moonlight |
| --- | --- | --- |
| Setup | two apps; on Linux, a beta sender to compile | one Omarchy command, plus the network and the virtual screen |
| Video compression on Linux | by the processor alone, in H.264 | by the graphics chip (VA-API), in HEVC if the driver allows it |
| Sound on the iMac | no | yes |
| The iMac's keyboard and mouse | don't control the PC | control the PC |
| Intended use | an extra screen | remote gaming, adapted here as a screen |

If OpenDisplay is enough for you, keep it. If the MacBook's processor struggles, or if you want the iMac's sound and keyboard, try Sunshine and Moonlight.

**Sources:**

- [Use your iMac as a display (Target Display Mode)](https://support.apple.com/en-us/105126){target="_blank" rel="noopener"}, Apple Support
- [iMac (Retina 4K, 21.5-inch, 2017) - Technical Specifications](https://support.apple.com/en-us/112026){target="_blank" rel="noopener"}, Apple Support
- [iMac Intel 21.5-Inch Retina 4K Display (2017) Teardown](https://www.ifixit.com/Guide/iMac+Intel+21.5-Inch+Retina+4K+Display+%282017%29+Teardown/92170){target="_blank" rel="noopener"}, iFixit: panel part number
- [Thunderbolt, "Networking over Thunderbolt cable" section](https://docs.kernel.org/admin-guide/thunderbolt.html){target="_blank" rel="noopener"}, Linux kernel documentation
- Omarchy 4.0.4 manual: [networking](https://github.com/omacom/omarchy/blob/v4.0.4/manual/35-networking.md){target="_blank" rel="noopener"}, [monitors](https://github.com/omacom/omarchy/blob/v4.0.4/manual/33-monitors.md){target="_blank" rel="noopener"} and [gaming](https://github.com/omacom/omarchy/blob/v4.0.4/manual/26-gaming.md){target="_blank" rel="noopener"}
- [omarchy-install-service-sunshine script](https://github.com/omacom/omarchy/blob/v4.0.4/bin/omarchy-install-service-sunshine){target="_blank" rel="noopener"}, Omarchy 4.0.4
- [Sunshine configuration](https://docs.lizardbyte.dev/projects/sunshine/latest/md_docs_2configuration.html){target="_blank" rel="noopener"}: `capture`, `output_name`, `stream_audio`, keyboard and mouse
- [Sunshine README](https://github.com/LizardByte/Sunshine){target="_blank" rel="noopener"}: compression with the graphics chip (VA-API)
- [sunshine-hyprland-virtual-display](https://github.com/jhonsnake/sunshine-hyprland-virtual-display){target="_blank" rel="noopener"}: Sunshine with a Hyprland virtual screen
- [Using hyprctl](https://wiki.hypr.land/0.49.0/Configuring/Using-hyprctl/){target="_blank" rel="noopener"}, Hyprland wiki: `hyprctl output create`
- [HEVC tiers and levels](https://en.wikipedia.org/wiki/High_Efficiency_Video_Coding_tiers_and_levels){target="_blank" rel="noopener"}, Wikipedia
- [Moonlight](https://moonlight-stream.org/){target="_blank" rel="noopener"}, official site

---
*[Jean-Luc Houédanou](https://houedanou.com)*
