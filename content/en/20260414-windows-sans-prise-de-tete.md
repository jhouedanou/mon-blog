---
title: "Windows 11 without a Microsoft account"
image: "/images/articles/windows11-bypass.webp"
createdAt: "2026-04-14"
updatedAt: "2026-11-08T12:00:00Z"
description: "Install Windows 11 without a Microsoft account in 2026: Rufus, BYPASSNRO, domain join... what still works depending on your build, and the traps to avoid."
searchIntent: "How to install Windows 11 with a local account without creating a Microsoft account."
tags: ["tutorial", "windows", "sysadmin"]
---

You've just formatted a machine and Windows 11 insists on a Microsoft account? Welcome to Microsoft in 2026, where creating a local user has become an obstacle course. Installing Windows 11 without a Microsoft account is still possible in November 2026: the safest route is a USB stick prepared with Rufus, which creates the local account in advance. The commands you type during setup are another story: whether they work depends on your build.

> **Warning**: this article contains unreasonable quantities of frustration with broken interfaces, at least two cryptic commands, and the discovery that "cut the internet" was half the answer to your problem all along.

---

## The problem: Microsoft likes accounts, not freedom

Since the latest Windows 11 patches, Microsoft has decided that local accounts are so 2000. And it's in black and white: "Windows 11 Pro for personal use and Windows 11 Home require internet connectivity and a Microsoft account during initial device setup" ([Windows 11 specifications](https://www.microsoft.com/en-us/windows/windows-11-specifications){target="_blank" rel="noopener"}).

Trying the old tricks?

- A fake email like `no@thankyou.com` (see [this explanatory clip](https://www.youtube.com/clip/Ugkxbe-HidbA7gWD_7QvNu3tKLagXSGvShm4))? Rejected.
- Skipping the step by closing the browser? No longer works.
- Leaving the form empty? Microsoft forces you to fill it in again.
- The "Learn more" link on the sign-in screen, which opened local account creation in September 2026? Plugged in October ([PCWorld](https://www.pcworld.com/article/3259577/windows-11s-easy-local-account-trick-is-dead-patched-by-microsoft.html){target="_blank" rel="noopener"}).

It's not malice, it's just business: a user signed in with a Microsoft account is a tracked, synced user inside the cloud ecosystem.

But sometimes, you just need a machine that works locally. A second-hand Surface, a test VM, or an old laptop you are putting back into service.

And that's where you get stuck.

Microsoft isn't evil, let's be honest: it's built for businesses and for users who agree to live in the cloud. Not for African developers who want to keep their computing independence.

---

## Install Windows 11 without a Microsoft account: the solutions (ranked by ease)

Before you charge in, understand one thing: **timing is CRITICAL**. It all depends on which command you run and when in the setup you run it.

### Solution 1: `OOBE\BYPASSNRO` (the real solution, if you are in time)

This is the unofficial method that works, at least at the right moment.

> **Careful, it depends on your build**: Microsoft removed the `bypassnro.cmd` script starting with build 26200.5516, the one preparing Windows 11 25H2 ([Windows Latest](https://windowslatest.com/2025/03/29/windows-11-is-not-killing-off-hack-that-lets-you-bypass-microsoft-account-but-it-takes-more-efforts-now/)). If the command is not recognized, the same prompt (`Shift+F10`) still accepts, on some images, the registry key it used to create: `reg add HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\OOBE /v BypassNRO /t REG_DWORD /d 1 /f`, then `shutdown /r /t 0` to reboot. The other well-known shortcut, `start ms-cxh:localonly`, was also removed from Insider builds 26220.6772 ([PCWorld](https://www.pcworld.com/article/2932975/microsoft-kills-two-more-ways-to-install-windows-11-with-local-accounts.html)). Test with your ISO before relying on it.
>
> **And since then?** In October 2025, Microsoft announced it was removing "known mechanisms" for creating a local account during setup, on the grounds that they skip setup screens and leave a device "not fully configured for use" ([Windows Insider blog](https://blogs.windows.com/windows-insider/2025/10/06/announcing-windows-11-insider-preview-build-26220-6772-dev-channel/){target="_blank" rel="noopener"}). Tests disagree: on the October 2025 Insider builds, Pureinfotech still sees the registry key go through (guide updated in September 2026, [Pureinfotech](https://pureinfotech.com/bypass-microsoft-account-setup-windows-11/){target="_blank" rel="noopener"}), Windows Latest does not. In October 2026, Windows Latest added that the command, the key and `ms-cxh:localonly` only work on some older public images ([Windows Latest](https://www.windowslatest.com/2026/10/13/one-click-let-you-escape-microsofts-forced-sign-in-on-windows-11-of-course-microsoft-killed-it/){target="_blank" rel="noopener"}). On a recent ISO, do not bet on it.

**BUT**: you have to run it **before** connecting the computer to the network. Yes, it's absurd. Yes, that's how it is.

**Steps**:

1. You are at the first Windows 11 screen (the one asking for your language)
2. Press `Shift+F10` to open the command prompt
3. Type: `OOBE\BYPASSNRO`
4. Confirm and wait for the reboot
5. After the reboot, stay offline (WiFi not connected, cable unplugged, or `ipconfig /release`, see solution 2): Windows then offers to continue without internet and shows the local account creation screen, no Microsoft account requested
6. Create your local user and you are done

**The timing**: before clicking "Next" to connect to the network. Get it? At the language/region screen, before any internet connection.

**If you already connected the PC to the internet before trying**: too late for this method, and cutting the internet (solution 2) will not be enough on its own. You are left with domain join on Pro (solution 5), the Microsoft account switched to a local account afterwards (trap no. 5), or a fresh installation from a Rufus stick (solution 4).

---

### Solution 2: Cut the internet at the last minute (the brutal but effective hack)

Already at the account creation screen, and Windows won't take a local account? No worries.

> **Clarification**: cutting the internet is no longer enough on its own. Since Windows 11 22H2, Microsoft has removed the ability to create a local account when setup has no network ([Rufus FAQ](https://github.com/pbatard/rufus/wiki/FAQ){target="_blank" rel="noopener"}), and the specifications quoted above require a connection for Home and Pro. So `ipconfig /release` is the second half of a method: it brings up the offline option once the BypassNRO key is in place (solution 1), as in [Pureinfotech's procedure](https://pureinfotech.com/bypass-microsoft-account-setup-windows-11/){target="_blank" rel="noopener"}, or on a Rufus stick (solution 4).

The trick: **forcing a network disconnection** will make Windows panic. It thinks "right, no internet, I guess you want a local account then".

**Steps**:

1. You are at the Microsoft account creation screen
2. Press `Shift+F10` to open the command prompt
3. Type: `ipconfig /release`
4. Wait for the command to finish (a few seconds)
5. Close the command prompt
6. Click the left arrow to **go back**
7. Click **Next**
8. Windows detects the lack of network connection and offers a local account
9. Create your user

**After setup**: Open a command prompt (`Win+R` → `cmd`) and type `ipconfig /renew` to get your internet connection back. Or simply reboot, both work.

**Why it works (when it works)**: once BypassNRO is enabled, Windows only forces the Microsoft account if the internet is available. No internet, no cloud check, so local account allowed.

---

### Solution 3: The "creative" email (less reliable, but quick)

Some users report that entering an email with some flair, like swear words or weird characters, crashes the validation and sends you back to a local account creation screen.

Example: `nope.nope.nope@nope.nope` or `no@thankyou.combattant@nope.com`

**Honestly**: it's random. It worked for some people in 2024, but the recent builds tested by [Windows Latest](https://www.windowslatest.com/2026/10/13/one-click-let-you-escape-microsofts-forced-sign-in-on-windows-11-of-course-microsoft-killed-it/){target="_blank" rel="noopener"} block it. I'm including it for the record, but don't count on it.

---

### Solution 4: RUFUS (the pro move)

If you make a bootable USB stick with **RUFUS** (the best USB stick creation tool, full stop), there is an option that removes the Microsoft account requirement and lets you avoid this step entirely.

**How**:

1. Download [RUFUS](https://rufus.ie/)
2. Select your Windows 11 ISO (22H2 or later) and click **START**
3. In the "Windows User Experience" window that opens, tick "Create a local account with username:" and type your user name. Also tick "Remove requirement for an online Microsoft account"
4. Boot and install, not a single Microsoft account request

In 2026, the "Create a local account" box is the one that matters. According to the [Rufus source code](https://github.com/pbatard/rufus/blob/master/src/wue.c){target="_blank" rel="noopener"}, "Remove requirement..." merely adds the BypassNRO key, the one Microsoft is neutralizing. "Create a local account" writes the account into the setup answer file, a deployment mechanism [documented by Microsoft](https://learn.microsoft.com/en-us/windows-hardware/customize/desktop/unattend/microsoft-windows-shell-setup-useraccounts-localaccounts){target="_blank" rel="noopener"}: according to the code comment, Windows then skips the Microsoft account step, even with the network connected. That comment dates from 22H2, but in October 2026, Windows Latest still lists Rufus among the remaining ways out. The account is created without a password: Windows will ask you to choose one at first sign-in.

According to the [Rufus FAQ](https://github.com/pbatard/rufus/wiki/FAQ), with the "Remove requirement..." box alone, the local account is only offered if the network is unplugged when you reach the account creation screen. In that case, unplug the cable or do not connect to WiFi.

**Advantages**:
- Zero interaction with Microsoft
- Local account created from the start
- The cleanest solution if you install Windows regularly
- No command-line tinkering

**Disadvantages**:
- You need a USB stick (at least 8 GB)
- A bit of preparation in advance

---

### Solution 5: Windows 11 Pro and domain join

If you are installing the Pro edition, there is still a door meant for businesses. When Windows asks how you want to set up the device, choose the work or school setup, then, in the sign-in options, "Domain join instead". Windows then offers you a local account ([Pureinfotech](https://pureinfotech.com/bypass-microsoft-account-setup-windows-11/){target="_blank" rel="noopener"}, [Windows Latest](https://www.windowslatest.com/2026/10/13/one-click-let-you-escape-microsofts-forced-sign-in-on-windows-11-of-course-microsoft-killed-it/){target="_blank" rel="noopener"}).

Pro only: Windows 11 Home cannot join a domain.

---

## The traps (because there are always some)

### 1. **The network connection before `OOBE\BYPASSNRO`**

If you already clicked on the WiFi and you are connected, the `OOBE\BYPASSNRO` command **will no longer work**.

Windows has already "verified" online that you needed a Microsoft account. The command comes too late.

**Solution**: cutting the internet (solution 2) will not be enough on its own, since BypassNRO did not take effect. On Pro, go through domain join (solution 5); otherwise, sign in with the Microsoft account and switch to a local account afterwards (trap no. 5), or start again from a Rufus stick (solution 4).

### 2. **The form that rejects your "fake" email**

Email validation has been tightened. `no@thankyou.com` no longer goes through. Neither do the variants ([Windows Latest](https://www.windowslatest.com/2026/10/13/one-click-let-you-escape-microsofts-forced-sign-in-on-windows-11-of-course-microsoft-killed-it/){target="_blank" rel="noopener"}).

Forget this trick: it was cool in 2022, not anymore.

### 3. **Automatic reboot without asking you**

Sometimes Windows 11 reboots after the account creation step, which cuts your internet and leaves you with a dead network connection.

**This is normal**. Open a command prompt and type `ipconfig /renew`. Or reboot properly.

### 4. **The command prompt that will not open**

If `Shift+F10` does not work, try `Ctrl+Alt+Delete` → Sign out → then `Shift+F10` at the login screen.

Or open the accessibility options (`Win+U` if possible): sometimes that brings up a menu that lets you launch `cmd.exe`.

### 5. **You created the Microsoft account and you regret it**

Don't panic, it's not final. In Settings → Accounts → Your info, the "Sign in with a local account instead" option converts your session to a local account and keeps your files ([step-by-step guide on Pureinfotech](https://pureinfotech.com/switch-from-microsoft-account-to-local-account-windows-11/)). You can also create a new local user via Settings → Accounts → Other users, but the Microsoft account will still be sitting there.

**Moral**: solutions 1 or 2 must be applied **before** creating a Microsoft account. Once it exists, bypassing it is more complicated.

### 6. **You get a "Cannot connect to the security server" message**

That just means there is no internet connection. That is the goal. If BypassNRO took effect (or if you are installing from a Rufus stick), keep going: Windows will offer you a local account in 5 seconds.

---

## Summary table (because I like tables)

| Solution | Timing | Difficulty | Reliability | Stress level |
|----------|--------|-----------|-----------|---|
| `OOBE\BYPASSNRO` | Before network | ⭐ | Depends on build (removed from recent ones) | Zero if the timing is right |
| Cut the internet | At the account screen | ⭐⭐ | Only with BypassNRO or Rufus | Moderate (you have to cut the internet) |
| Creative email | Any time | ⭐ | Blocked on recent builds | Very high if it does not work |
| RUFUS | Before install | ⭐ | The safest ("local account" option) | Zero (clean solution) |
| Domain join (Pro) | During setup | ⭐⭐ | Pro only | Low, if you have Pro |

---

## The typical scenario (the one you are probably living through)

1. ✅ You boot Windows 11 on a second-hand Surface
2. ✅ Language screen, perfect
3. ❌ You click Next without a second thought
4. ❌ Windows offers you WiFi, you connect out of habit
5. ❌ Microsoft account creation screen, oops
6. ❌ You look for "local account" in the menus, nothing
7. ❌ You try `no@thankyou.com`, rejected
8. ❌ You type `OOBE\BYPASSNRO` at the prompt, does not work (too late)
9. 🔴 You panic

**At this point**: forget `ipconfig /release` on its own, it only works if BypassNRO took effect. On Pro, go through domain join (solution 5). Otherwise, two ways out:

- sign in with the Microsoft account, then switch to a local account afterwards (trap no. 5);
- or start the installation again from a Rufus stick with the "Create a local account" option (solution 4).

---

## Why Microsoft does this

Honestly? Because:

1. **User data**: a Microsoft account = synced data = profiling = insights
2. **Control**: cloud accounts are easier to monitor and lock down
3. **Upsell**: Windows 11 Home pushes Microsoft accounts hard. Very hard.

There's nothing technically shady about it, it's just business. Microsoft has the right to favour its ecosystem.

But you also have the right to want a local machine.

---

## What about the alternatives?

If Windows 11 really frustrates you (which is understandable), remember that [you don't need to be a bearded dev to love Mac and Linux](/en/20261008-pas-besoin-detre-dev-ou-barbu-mac-linux):

- **Windows 10**: local accounts with no hassle. End of support in October 2025, but for a test machine, it's fine. And it's free.
- **Linux** (Ubuntu, Fedora, Pop!_OS): local accounts by default, free, zero tracking, better performance (on an old laptop, [Omarchy brought my 2017 MacBook Pro back to life](/en/20261013-retournement-de-veste-omarchy-macbook-pro-2017)). And once it is installed, you can even [clone your Ubuntu without losing your data](/en/20241029-cloner-ubuntu).
- **macOS**: iCloud accounts optional, but Macs are expensive and locked down.

But if you are stuck with Windows 11, these solutions work, Rufus first.

---

## One-sentence summary

**Prepare your stick with Rufus and the "Create a local account" option; failing that, before connecting to WiFi, run `OOBE\BYPASSNRO`, then cut the internet with `ipconfig /release` and restart the account creation.**

One `ipconfig`, and Windows comes to its senses.

It's not elegant, it's not what we expected in 2026. But it works.

And for someone who has just received a refurbished Surface, an old test machine, or a VM that refuses to cooperate, it's priceless.

---

## Further reading

- **RUFUS**: [https://rufus.ie/](https://rufus.ie/), the best USB stick creation tool
- **Creating a local account afterwards**: Settings → Accounts → Other users
- **Removing a Microsoft account**: Settings → Accounts → Your info → Manage my Microsoft account

*Updated October 8, 2026: Microsoft removed `bypassnro.cmd` from recent Windows 11 builds ([Windows Latest](https://windowslatest.com/2025/03/29/windows-11-is-not-killing-off-hack-that-lets-you-bypass-microsoft-account-but-it-takes-more-efforts-now/)), then `start ms-cxh:localonly` from Insider builds ([PCWorld](https://www.pcworld.com/article/2932975/microsoft-kills-two-more-ways-to-install-windows-11-with-local-accounts.html)): added the fallback registry key, corrected the RUFUS procedure based on its [FAQ](https://github.com/pbatard/rufus/wiki/FAQ), and trap no. 5 (you can switch back to a local account afterwards).*

*Updated November 8, 2026: Microsoft announced it was removing "known mechanisms" for creating a local account during setup ([Windows Insider blog](https://blogs.windows.com/windows-insider/2025/10/06/announcing-windows-11-insider-preview-build-26220-6772-dev-channel/){target="_blank" rel="noopener"}), and the "Learn more" link was plugged in October 2026 ([PCWorld](https://www.pcworld.com/article/3259577/windows-11s-easy-local-account-trick-is-dead-patched-by-microsoft.html){target="_blank" rel="noopener"}): added the status of the commands depending on the build ([Windows Latest](https://www.windowslatest.com/2026/10/13/one-click-let-you-escape-microsofts-forced-sign-in-on-windows-11-of-course-microsoft-killed-it/){target="_blank" rel="noopener"}, [Pureinfotech](https://pureinfotech.com/bypass-microsoft-account-setup-windows-11/){target="_blank" rel="noopener"}), Rufus's "Create a local account" option, the safest today ([Rufus source code](https://github.com/pbatard/rufus/blob/master/src/wue.c){target="_blank" rel="noopener"}), and domain join on Windows 11 Pro. Clarification: cutting the internet is no longer enough on its own since Windows 11 22H2 ([Rufus FAQ](https://github.com/pbatard/rufus/wiki/FAQ){target="_blank" rel="noopener"}), and the fake email is blocked.*

---
*[Jean-Luc Houédanou](https://houedanou.com), Microsoft does not like this article*
