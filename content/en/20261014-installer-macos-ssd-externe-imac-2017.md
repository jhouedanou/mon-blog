---
title: "Install macOS on an External SSD to Revive a 2017 iMac"
createdAt: "2026-10-14T18:00:00Z"
image: "/images/articles/imac-2017-macos-ssd-externe.webp"
description: "Is your 2017 iMac slow? Install macOS on a 1 TB external SSD over USB-C, without opening the machine. Ventura, OpenCore and the limits."
searchIntent: "How do you install macOS on an external SSD and boot from it to revive a slow old 2017 iMac, without opening the iMac to replace the internal drive?"
tags: ["tutorial", "apple", "macos", "mac", "hardware", "ssd"]
---

I had a 2017 iMac sitting abandoned in a corner. The kind of machine you stop turning on, because it takes forever to boot and opening Safari becomes an ordeal.

The culprit, almost every time, is the internal drive. The good news: you don't need to open the iMac to replace it. You just install macOS on an **external SSD** and boot from it. I went with a 1 TB **Lexar SL500** and installed **macOS Ventura** on it. Here's how to do it, step by step.

![A 2017 iMac booting from a 1 TB external SSD plugged in over USB-C](/images/articles/imac-2017-macos-ssd-externe.webp)

## Why the 2017 iMac is so slow

Unless an SSD was picked as an option at purchase, the 2017 iMac left the factory with one of these drives (Apple tech specs for the [21.5-inch](https://support.apple.com/en-us/111921){target="_blank" rel="noopener"}, the [21.5-inch 4K](https://support.apple.com/en-us/112026){target="_blank" rel="noopener"} and the [27-inch 5K](https://support.apple.com/en-us/111969){target="_blank" rel="noopener"}):

- a **1 TB hard drive at 5,400 rpm** on the entry-level 21.5-inch and on the 3.0 GHz 21.5-inch 4K;
- a **Fusion Drive** (a small SSD paired with a hard drive) on the 3.4 GHz 21.5-inch 4K and on every 27-inch 5K.

A 5,400 rpm hard drive is slow. Seagate advertises "up to 140 MB/s" for its own, and that's a maximum ([Seagate datasheet](https://www.seagate.com/www-content/datasheets/pdfs/barracuda-2-5-DS1907-2-1907US-en_US.pdf){target="_blank" rel="noopener"}). In practice, you get closer to 100 MB/s. But the real problem lies elsewhere: macOS constantly reads and writes thousands of small, scattered files. A hard drive is very slow at that, because its read head has to move every time. An SSD has no moving parts. That's where it makes all the difference.

## Why an external SSD rather than an internal one

Replacing the internal drive of a 2017 iMac is possible. But the display is **glued** to the chassis. You have to unglue it, glue it back, and you risk breaking it.

An external SSD has three advantages:

- **you don't open anything**: all it takes is a cable;
- **it's reversible**: unplug the SSD and the iMac boots from its original drive again (and it can still serve as a [second screen with Sharp](/en/20260929-sharp-vieil-imac-ecran-secondaire-ethernet));
- **the SSD isn't wasted**: if the iMac eventually gives up, you keep it as a storage drive.

More good news: the 2017 iMac has **no T2 chip**. So there's no security setting to change to let it boot from an external drive ([Apple's list of Macs with the T2 chip](https://support.apple.com/en-us/HT208862){target="_blank" rel="noopener"}). Don't confuse it with the 2017 iMac Pro, which does have one.

## What you need

| Item | Details |
| --- | --- |
| A 2017 iMac | 21.5-inch, 21.5-inch 4K or 27-inch 5K |
| An external SSD | 500 GB minimum recommended, 1 TB to be safe |
| The right cable | USB-C to USB-C, plugged into one of the iMac's Thunderbolt 3 ports |
| An internet connection | to download macOS, which weighs several gigabytes |
| An hour to spare | the download and installation take a while |

### Which Lexar SSD to choose

The 2017 iMac has two **Thunderbolt 3 (USB-C)** ports. Over USB, they top out at **10 Gbps** ([Apple tech specs](https://support.apple.com/en-us/111969){target="_blank" rel="noopener"}), which gives about **1,000 MB/s** in practice. On the hard drive models, that's several times faster than the original drive.

It also has four USB-A ports. These are 5 Gbps USB 3 ports, or about 400 MB/s in practice ([Tom's Hardware](https://www.tomshardware.com/reviews/usb-3-uas-turbo,3215-2.html){target="_blank" rel="noopener"}). They work, but plug the SSD into a USB-C port instead.

The upshot: on this iMac, a 20 Gbps SSD won't go any faster than a 10 Gbps SSD. Here are a few 1 TB Lexar models:

| Model | Interface | Advertised speed (read) | On the 2017 iMac |
| --- | --- | --- | --- |
| [Lexar ES3](https://americas.lexar.com/product/lexar-es3-portable-ssd/){target="_blank" rel="noopener"} | USB 3.2 Gen 2 (10 Gbps) | 1,050 MB/s | about 1,000 MB/s |
| [Lexar SL300](https://americas.lexar.com/product/lexar-sl300-portable-ssd/){target="_blank" rel="noopener"} | USB 3.2 Gen 2 (10 Gbps) | 1,050 MB/s | about 1,000 MB/s |
| [Lexar SL500](https://americas.lexar.com/product/lexar-sl500-portable-ssd/){target="_blank" rel="noopener"} | USB 3.2 Gen 2x2 (20 Gbps) | 2,000 MB/s | about 1,000 MB/s |
| [Lexar Armor 700](https://americas.lexar.com/product/lexar-armor-700-portable-ssd/){target="_blank" rel="noopener"} | USB 3.2 Gen 2x2 (20 Gbps) | 2,000 MB/s | about 1,000 MB/s |

The 2,000 MB/s models use a standard (USB 3.2 Gen 2x2) that Macs don't support. Lexar even warns that performance may be lower on a Mac ([SL500 product page](https://americas.lexar.com/product/lexar-sl500-portable-ssd/){target="_blank" rel="noopener"}). On the 2017 iMac, they fall back to 10 Gbps: TechRadar's review measured the SL500 at about 1,000 MB/s on macOS ([TechRadar](https://www.techradar.com/pro/lexar-sl500-portable-ssd-review){target="_blank" rel="noopener"}). That's the case with my SL500: on this iMac, it can't go any faster than an ES3. If you're buying an SSD just for this iMac, a 10 Gbps model is enough.

## Which macOS to install

| Version | How | For whom |
| --- | --- | --- |
| **macOS Ventura 13** | official, straight from Apple | the simple, safe option |
| **macOS Sequoia 15** | with OpenCore Legacy Patcher (unofficial) | those who want a newer system |
| **macOS Tahoe 26** | OpenCore Legacy Patcher pre-release | experimental, avoid on an everyday machine |
| **macOS 27 Golden Gate** | impossible | Apple silicon Macs only |

Apple stopped at **Ventura** for the 2017 iMac ([Ventura compatibility](https://support.apple.com/en-us/102861){target="_blank" rel="noopener"}). Sonoma no longer supports it. The latest version is **Ventura 13.7.8**, released on August 20, 2025 ([Apple](https://support.apple.com/en-us/124929){target="_blank" rel="noopener"}). There hasn't been an update since. Apple hasn't said so officially, but Ventura is probably no longer maintained.

Ventura is what I installed, using Apple's official method. That's what I walk through first. I cover Sequoia further down.

## Install macOS Ventura on the external SSD in five steps

These steps follow Apple's method to [start up a Mac from an external drive](https://support.apple.com/en-us/111336){target="_blank" rel="noopener"}. You do them from the iMac itself, booted from its original drive.

### 1. Plug in the SSD

Plug the SSD into one of the two **USB-C** (Thunderbolt 3) ports on the back of the iMac, with a USB-C to USB-C cable. The SL500 comes with one; other SSDs often do too.

### 2. Erase and format the SSD

**Warning: this step erases everything on the SSD.** Back up its contents first.

1. Open **Disk Utility** (in Applications → Utilities).
2. Choose **View → Show All Devices**.
3. In the sidebar, select the Lexar SSD at the **very top** of its hierarchy (the drive itself, not the volume below it). Check that it's listed under **External** and that its size is about 1 TB. If in doubt, unplug it: the drive that disappears from the list is the one.
4. Click **Erase**, then choose:
   - **Name**: whatever you like, for example "Lexar";
   - **Format**: **APFS**;
   - **Scheme**: **GUID Partition Map**.
5. Click **Erase**, then **Done**.

Apple recommends APFS, especially for an SSD ([Disk Utility](https://support.apple.com/en-us/guide/disk-utility/dskutl14079/mac){target="_blank" rel="noopener"}). The GUID scheme is required for the Mac to boot from it.

### 3. Download macOS Ventura

The easiest way: open [Ventura in the App Store](https://apps.apple.com/app/macos-ventura/id1638787999?mt=12){target="_blank" rel="noopener"} and click **Get**. If **Software Update** opens instead, click **Download**. If the installer launches on its own when it's done, skip straight to step 4. The link comes from Apple's [Download and install macOS](https://support.apple.com/en-us/102662){target="_blank" rel="noopener"} page.

If the App Store acts up, use Terminal (you need macOS Catalina or later on the internal drive). This command lists the available versions:

```bash
softwareupdate --list-full-installers
```

And this one downloads Ventura 13.7.8 to the Applications folder:

```bash
softwareupdate --fetch-full-installer --full-installer-version 13.7.8
```

Either way, you end up with **Install macOS Ventura** in Applications.

### 4. Install Ventura on the SSD

1. Launch **Install macOS Ventura**.
2. Accept the license.
3. When the installer asks where to install macOS, it suggests the internal drive. Click **Show All Disks**, then choose the **Lexar SSD**.
4. Click **Continue** and let it run.

The iMac restarts several times. **Whatever you do, don't unplug the SSD during the installation.** At the end, the macOS Setup Assistant opens: language, account, Wi-Fi, and so on. You're running from the SSD.

### 5. Make the SSD the startup disk

To make the iMac always boot from the SSD:

1. Open **System Settings → General → Startup Disk**.
2. Choose the Lexar SSD, then click **Restart**.

To pick the drive each time, there's **Startup Manager**: turn on the iMac while holding down the **Option (⌥)** key, then choose the drive ([Apple](https://support.apple.com/en-us/102603){target="_blank" rel="noopener"}). If it doesn't work after a restart, shut the iMac down completely and try again.

## Another method: install from macOS Recovery

If the iMac no longer boots from its internal drive at all, use **macOS Recovery**, which downloads the system from the internet ([Apple](https://support.apple.com/en-us/102655){target="_blank" rel="noopener"}):

- **Command (⌘) + R** at startup: reinstalls the latest version of macOS that was installed on this Mac;
- **Option + Command + R**: installs the latest compatible version, so Ventura here;
- **Shift + Option + Command + R**: installs the version that came with the Mac, or the closest one still available.

Go with **Option + Command + R**. In Recovery, first open **Disk Utility** to format the SSD (step 2), then choose **Reinstall macOS Ventura** and select the SSD as the destination.

You need a regular internet connection. Wi-Fi networks with a login page (hotels, train stations) won't work. An Ethernet cable plugged into your router is ideal.

## Going further: Sequoia with OpenCore Legacy Patcher

To go beyond Ventura, there's **OpenCore Legacy Patcher** (OCLP). This free, open source tool makes macOS believe it's running on a supported Mac, then adds the missing drivers. It supports all three 2017 iMacs ([supported models](https://dortania.github.io/OpenCore-Legacy-Patcher/MODELS.html){target="_blank" rel="noopener"}), since [version 1.0.0](https://github.com/dortania/OpenCore-Legacy-Patcher/releases/1.0.0){target="_blank" rel="noopener"} from October 2023.

Where do things stand as of October 14, 2026?

- The stable version, **OCLP 2.5.1** (September 19, 2026), supports **Sequoia** ([GitHub](https://github.com/dortania/OpenCore-Legacy-Patcher/releases){target="_blank" rel="noopener"}).
- **Tahoe** is only supported by the **3.0.0-rc.3** pre-release (October 8, 2026). GitHub warns you to expect instability and data loss ([release notes](https://github.com/dortania/OpenCore-Legacy-Patcher/releases/tag/3.0.0-rc.3){target="_blank" rel="noopener"}).
- **macOS 27 Golden Gate** only runs on Apple silicon Macs. No tool will install it on an Intel iMac ([MacRumors](https://www.macrumors.com/2026/06/08/macs-compatible-macos-golden-gate/){target="_blank" rel="noopener"}).

I haven't tested it myself: I stuck with Ventura. How it works with an external SSD:

1. Boot into Ventura (on the SSD) and install OCLP.
2. In OCLP, click **Build and Install OpenCore**. The tool lists the drives it can install OpenCore on: choose the **Lexar SSD**. The internal drive stays untouched.
3. Restart while holding **Option**, then choose **EFI Boot**, the entry with the OpenCore icon. Hold **Control** while clicking it to make it the default entry ([boot guide](https://dortania.github.io/OpenCore-Legacy-Patcher/BOOT.html){target="_blank" rel="noopener"}).
4. Once booted through **EFI Boot**, open **System Settings → General → Software Update**: Sequoia shows up there and installs on the SSD, like a normal update. Otherwise, OCLP can also build an installer (**Create macOS Installer**, see [Dortania's guide](https://dortania.github.io/OpenCore-Legacy-Patcher/INSTALLER.html){target="_blank" rel="noopener"}); in that case, choose the SSD with **Show All Disks**, as in step 4 above. Sequoia's quirks are covered [here](https://dortania.github.io/OpenCore-Legacy-Patcher/SEQUOIA-DROP.html){target="_blank" rel="noopener"}.
5. Once on Sequoia, OCLP offers **system patches** (*Post-Install Root Patch*), notably for Wi-Fi. Connect the iMac over Ethernet first: without internet, OCLP may only install the Wi-Fi driver on the first pass ([post-install](https://dortania.github.io/OpenCore-Legacy-Patcher/POST-INSTALL.html){target="_blank" rel="noopener"}).

Three things to know:

- **Every macOS update wipes the patches.** You have to reapply them with OCLP after each update.
- **No Apple Intelligence or iPhone Mirroring.** These features require an Apple silicon Mac (or a T2 chip for mirroring), patched or not.
- **It's unofficial.** If something breaks, Apple won't help you. Keep a backup.

My advice: start with Ventura. If the iMac proves useful and you want a newer system, move to Sequoia with OCLP 2.5.1. Tahoe, only for tinkering.

## After the installation

### Check TRIM

**TRIM** helps the SSD keep its performance over time. On an external USB SSD, it doesn't always work: it depends on the chip that bridges the SSD and USB ([The Eclectic Light Company](https://eclecticlight.co/2024/04/09/which-external-drives-have-trim-and-smart-support/){target="_blank" rel="noopener"}).

To find out whether yours supports it, look in **System Information** (Applications → Utilities), on the SSD's entry: depending on how it's connected, a **TRIM Support** line may appear. If it doesn't, the Eclectic Light article mentioned above covers other ways to check. And if TRIM doesn't work, don't panic: the SSD still works. It may just slow down a little over the years.

### What to do with the internal drive

There's no rush. As long as you don't erase it, it's your plan B: unplug the SSD, and the iMac boots just like before.

Once everything runs smoothly, you can erase it in Disk Utility and use it as storage for large files, or as a **Time Machine** drive to back up the SSD. Time Machine already saved me [when iCloud locked up my GitHub repos](/en/20260925-retrouver-dossier-github-icloud-time-machine). A backup on the same computer doesn't replace a real external backup, but it's better than nothing.

## The limits of macOS on an external SSD

- **The SSD has to stay plugged in.** If you unplug it while macOS is running, the system crashes and you risk losing data.
- **The installation is tied to this Mac.** Apple says so: an SSD set up on this iMac isn't meant to boot a different Mac model.
- **Ventura hasn't had a single update** since August 20, 2025. For everyday use on the internet, that's a real security weakness.
- **The USB-A ports are slower.** About 400 MB/s instead of 1,000 MB/s on the USB-C ports.
- **OpenCore needs upkeep.** You have to reapply the patches after every update, and nothing is guaranteed.

## In short

A slow 2017 iMac isn't ready for the trash. With a 1 TB external SSD plugged in over USB-C, macOS installed on it and the SSD set as the startup disk, you give it a second life without a screwdriver and without prying off the display.

Ventura is the simple path. OpenCore Legacy Patcher opens the door to Sequoia, at the cost of a little upkeep.

And if the computer no longer interests you but the screen still looks great, there's another option: [turn the old iMac into a second screen with Sharp](/en/20260929-sharp-vieil-imac-ecran-secondaire-ethernet). For old Mac laptops, I also tried [Omarchy on my 2017 MacBook Pro](/en/20261013-retournement-de-veste-omarchy-macbook-pro-2017).

**Sources:**

- [Use an external storage device as a Mac startup disk](https://support.apple.com/en-us/111336), Apple
- Tech specs for the [2017 21.5-inch iMac](https://support.apple.com/en-us/111921), the [2017 4K iMac](https://support.apple.com/en-us/112026) and the [2017 5K iMac](https://support.apple.com/en-us/111969), Apple
- [Mac computers with the Apple T2 Security Chip](https://support.apple.com/en-us/HT208862), Apple
- [macOS Ventura compatibility](https://support.apple.com/en-us/102861) and [security content of Ventura 13.7.8](https://support.apple.com/en-us/124929), Apple
- [Download and install macOS](https://support.apple.com/en-us/102662), [macOS Recovery on an Intel-based Mac](https://support.apple.com/en-us/102655) and [choosing a startup disk](https://support.apple.com/en-us/102603), Apple
- [Erase a disk in Disk Utility](https://support.apple.com/en-us/guide/disk-utility/dskutl14079/mac), Apple
- [OpenCore Legacy Patcher documentation](https://dortania.github.io/OpenCore-Legacy-Patcher/) and [releases on GitHub](https://github.com/dortania/OpenCore-Legacy-Patcher/releases), Dortania
- [Macs compatible with macOS Golden Gate](https://www.macrumors.com/2026/06/08/macs-compatible-macos-golden-gate/), MacRumors
- [Portable SSD product pages](https://americas.lexar.com/product/lexar-sl500-portable-ssd/), Lexar
- [Lexar SL500 review](https://www.techradar.com/pro/lexar-sl500-portable-ssd-review), TechRadar
- [Real-world USB 3 speeds](https://www.tomshardware.com/reviews/usb-3-uas-turbo,3215-2.html), Tom's Hardware
- [BarraCuda 2.5-inch drive datasheet](https://www.seagate.com/www-content/datasheets/pdfs/barracuda-2-5-DS1907-2-1907US-en_US.pdf), Seagate
- [Which external drives support TRIM](https://eclecticlight.co/2024/04/09/which-external-drives-have-trim-and-smart-support/), The Eclectic Light Company

---
*[Jean-Luc Houédanou](https://houedanou.com)*
