---
title: "Sunshine + Moonlight: a 4K iMac as a monitor"
createdAt: "2026-11-09T12:00:00Z"
draft: true
image: "/images/articles/imac-2017-macos-ssd-externe.webp"
description: "No Target Display Mode on the 2017 4K iMac? Sunshine and Moonlight turn it into the monitor of a Hyprland PC, over a Thunderbolt cable. Step by step."
searchIntent: "How can I use a 2017 Retina 4K iMac, which has no Target Display Mode, as the monitor of a Linux PC (Hyprland, Omarchy) with Sunshine, Moonlight and a Thunderbolt cable?"
tags: ["tutorial", "apple", "macos", "mac", "linux", "omarchy", "open-source", "hardware"]
---

Yes, I know, I keep coming back to this, but I just think this computer is too beautiful to leave it gathering dust.

After [Sharp](/en/20260929-sharp-vieil-imac-ecran-secondaire-ethernet), the [external SSD](/en/20261014-installer-macos-ssd-externe-imac-2017) and [OpenDisplay](/en/20261030-opendisplay-vieil-imac-ecran-mac-linux), here is a fourth post about my 2017 21.5-inch Retina 4K iMac. The goal: make it the monitor of my 2017 MacBook Pro running [Omarchy](/en/20261013-retournement-de-veste-omarchy-macbook-pro-2017). The tools: **Sunshine** on the MacBook, **Moonlight** on the iMac, and a Thunderbolt cable between the two. It's free, and the iMac stays as it is.

## Why not a plain video cable

This iMac has no **Target Display Mode**. Apple keeps it for iMacs from 2009 to mid-2014, running macOS High Sierra or earlier ([Apple page](https://support.apple.com/en-us/105126){target="_blank" rel="noopener"}). No Retina iMac is on the list.

The iMac's Thunderbolt 3 ports send a picture to a monitor. They don't receive one. No cable or setting changes that.

That leaves two options:

- **software**: the method in this post. The cable is a fast network link, not a video cable;
- **hardware**: remove the iMac's logic board and fit a controller board made for its panel. On this model, the panel is often an LG LM215UH1, but check the part number printed on the back before you buy. The iMac becomes a real 4K monitor plugged in directly, but it's no longer a computer.

I'm starting with software: it's free, and you can undo it.

## Sunshine and Moonlight in short

- **Sunshine** is an open source streaming server. It records a screen and sends it as video over the network. It's made for games, but it works with any desktop.
- **Moonlight** is the client. On the iMac, it receives the video and shows it full screen.
- **Hyprland**, Omarchy's window manager, creates a **virtual screen**. The MacBook sees it as a real extra monitor. Sunshine records that virtual screen, and the iMac shows it.
- **The Thunderbolt cable** links the two machines in a direct network, with no router or Wi-Fi.

## What you need

| Item | Details |
| --- | --- |
| The iMac | here a 2017 21.5-inch Retina 4K iMac, running macOS Ventura |
| The sending PC | here a 2017 MacBook Pro running Omarchy (Hyprland) |
| The cable | a Thunderbolt 3 cable, plugged into a Thunderbolt port on each machine |
| The software | Sunshine on the PC, Moonlight on the iMac, both free |

## Step 1: the Thunderbolt cable as a network

Plug the cable into both machines.

**On the iMac**: **System Settings → Network → Thunderbolt Bridge → Details → TCP/IP**. In **Configure IPv4**, choose **Manually**, then:

- IP address: `10.0.0.2`
- subnet mask: `255.255.255.0`

**On the MacBook (Omarchy)**:

```bash
sudo modprobe thunderbolt-net
sudo ip addr add 10.0.0.1/24 dev thunderbolt0
sudo ip link set thunderbolt0 up
ping 10.0.0.2
```

The `thunderbolt-net` driver speaks the same protocol as the macOS Thunderbolt Bridge: the two machines recognise each other. If `ping` gets no reply, run `boltctl list`. If the iMac shows up as not authorized, authorize it with `sudo boltctl enroll --policy auto <uuid>`, copying the ID it shows.

The `ip` commands are wiped at reboot. To keep the address, Omarchy uses systemd-networkd: create the file `/etc/systemd/network/50-thunderbolt.network`:

```ini
[Match]
Name=thunderbolt0

[Network]
Address=10.0.0.1/24
```

Then reload the configuration with `sudo networkctl reload`.

## Step 2: the virtual screen in Hyprland

Create the virtual screen, which I call `imac`:

```bash
hyprctl output create headless imac
```

In `~/.config/hypr/monitors.conf`, give it the iMac's resolution:

```ini
monitor = imac, 4096x2304@60, auto, 2
```

- `4096x2304` is the resolution of the iMac's panel. At scale `2`, the desktop is 2048 × 1152 points, and text is sharp, like on a Retina screen.
- If the picture stutters, switch to `monitor = imac, 2048x1152@60, auto, 1`. It's lighter, but less sharp.

## Step 3: Sunshine on the MacBook

Install Sunshine from the AUR:

```bash
yay -S sunshine-bin
```

If that package won't start (it sometimes breaks after an Arch update), LizardByte, the team behind Sunshine, also runs its own repository for Arch: see its [documentation](https://docs.lizardbyte.dev/projects/sunshine/latest/){target="_blank" rel="noopener"}.

In `~/.config/sunshine/sunshine.conf`, tell Sunshine which screen to record:

```ini
capture = wlr
output_name = imac
```

`wlr` is the capture method for Wayland desktops like Hyprland.

Run `sunshine`, open `https://localhost:47990` in the browser and create a login.

⚠️ **Create the virtual screen before you start Sunshine.** Sunshine reads `output_name` only once, at startup. If the `imac` screen doesn't exist yet, the iMac shows the MacBook's screen, or a black picture ([sunshine-hyprland-virtual-display](https://github.com/jhonsnake/sunshine-hyprland-virtual-display){target="_blank" rel="noopener"}).

To start everything in the right order at each boot, add this line to `~/.config/hypr/autostart.conf`:

```ini
exec-once = hyprctl output create headless imac && sunshine
```

## Step 4: Moonlight on the iMac

1. Install Moonlight, from [moonlight-stream.org](https://moonlight-stream.org/){target="_blank" rel="noopener"} or with Homebrew:

   ```bash
   brew install --cask moonlight
   ```

2. Open Moonlight. Click **+** and add the host `10.0.0.1`.
3. A PIN shows up. Type it into the **PIN** tab of Sunshine's web page, on the MacBook.
4. In Moonlight's settings, choose:
   - resolution: the iMac's resolution, 4096 × 2304 ("Native" if the list offers it, otherwise 4K);
   - frames per second: 60;
   - video codec: HEVC;
   - bitrate: high. The cable has room to spare.
5. Launch **Desktop**.

## Step 5: using the screen

The `imac` screen behaves like an external monitor. Move the MacBook's mouse over to it, or send a workspace there:

```bash
hyprctl dispatch moveworkspacetomonitor 5 imac
```

Replace `5` with the number of the workspace you want to move.

## If it doesn't work

- **Moonlight can't find the MacBook**: first check that `ping 10.0.0.2` gets a reply. Then look at the firewall with `sudo ufw status`. If it's active, allow the cable: `sudo ufw allow in on thunderbolt0`.
- **The iMac shows the MacBook's screen or a black picture**: Sunshine started before the virtual screen. Quit Sunshine, check that `imac` shows up in `hyprctl monitors`, then run `sunshine` again.
- **The picture is blurry**: Moonlight's resolution doesn't match the virtual screen's. Use the same on both sides.

## Sunshine and Moonlight, or OpenDisplay?

I already got [OpenDisplay working with this MacBook running Omarchy](/en/20261030-opendisplay-vieil-imac-ecran-mac-linux). Both methods do the same job: record a virtual screen, compress it into video, show it on the iMac. The differences:

| | OpenDisplay | Sunshine and Moonlight |
| --- | --- | --- |
| Setup | two apps, almost nothing to configure | more steps (network, virtual screen, configuration) |
| Video compression on Linux | by the processor alone, in H.264 | by the graphics chip when the driver allows it, HEVC possible |
| Sound on the iMac | no | yes |
| The iMac's keyboard and mouse | don't control the PC | control the PC |
| Intended use | an extra screen | remote gaming, adapted here as a screen |

If OpenDisplay is enough for you, keep it: it's simpler. If the MacBook's processor struggles, or if you want the iMac's sound and keyboard, try Sunshine and Moonlight.

**Sources:**

- [Use your iMac as a display (Target Display Mode)](https://support.apple.com/en-us/105126){target="_blank" rel="noopener"}, Apple Support
- [Sunshine configuration](https://docs.lizardbyte.dev/projects/sunshine/latest/md_docs_2configuration.html){target="_blank" rel="noopener"}: `capture` and `output_name`
- [sunshine-hyprland-virtual-display](https://github.com/jhonsnake/sunshine-hyprland-virtual-display){target="_blank" rel="noopener"}: Sunshine with a Hyprland virtual screen
- [Using hyprctl](https://wiki.hypr.land/0.49.0/Configuring/Using-hyprctl/){target="_blank" rel="noopener"}, Hyprland wiki: `hyprctl output create`
- [Moonlight](https://moonlight-stream.org/){target="_blank" rel="noopener"}, official site
- [sunshine-bin package](https://aur.archlinux.org/packages/sunshine-bin){target="_blank" rel="noopener"}, AUR

---
*[Jean-Luc Houédanou](https://houedanou.com)*
