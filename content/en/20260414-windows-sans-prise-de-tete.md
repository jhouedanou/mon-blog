---
title: "Windows 11: Install it without a Microsoft account (and without losing your hair)"
image: "/images/articles/windows11-bypass.webp"
createdAt: "2026-04-14"
description: "Just formatted Windows 11 and Microsoft refuses a local account? Complete guide with 4 solutions that actually work, plus explanations of the traps. For those who like their computing freedom."
searchIntent: "How to install Windows 11 with a local account without creating a Microsoft account."
tags: ["tutorial", "windows", "sysadmin"]
---

# Windows 11: Install it without a Microsoft account (and without losing your hair)

You have just formatted a machine and Windows 11 insists on a Microsoft account? Welcome to the Microsoft world of 2026, where creating a local user has become an obstacle course.

> **Warning**: this article contains unreasonable quantities of frustration with broken interfaces, at least two cryptic commands, and the discovery that "cut the internet" was the answer to your problem all along.

---

## The problem: Microsoft likes accounts, not freedom

Since the latest Windows 11 patches, Microsoft has decided that local accounts were so 2000.

Trying the old tricks?

- A fake email like `no@thankyou.com` (see this explanatory clip: https://www.youtube.com/clip/Ugkxbe-HidbA7gWD_7QvNu3tKLagXSGvShm4 )? Rejected.
- Skipping the step by closing the browser? No longer works.
- Leaving the form empty? Microsoft forces you to fill it in again.

It is not malice, it is just business: a user connected to a Microsoft account is a tracked, synced user inside the cloud ecosystem.

But sometimes, you just need a machine that works locally. A second-hand Surface, a test VM, or an old laptop you are putting back into service.

And there, you are stuck.

Microsoft is not evil, you just have to be honest: it is built for businesses and for users who agree to live in the cloud. Not for African developers who want to keep their computing independence.

---

## The solutions (ranked by ease)

Before charging in head first, understand one thing: **timing is CRITICAL**. When you run which command, at which point in the setup, changes everything.

### Solution 1: `OOBE\BYPASSNRO` (the real solution, if you are in time)

This is the unofficial method that works, at least at the right moment.

**BUT**: you have to run it **before** connecting the computer to the network. Yes, it is absurd. Yes, that is how it is.

**Steps**:

1. You are at the first Windows 11 screen (the one asking for your language)
2. Press `Shift+F10` to open the command prompt
3. Type: `OOBE\BYPASSNRO`
4. Confirm and wait for the reboot
5. The local account creation screen appears, no Microsoft account requested
6. Create your local user and you are done

**The timing**: before clicking "Next" to connect to the network. Get it? At the language/region screen, before any internet connection.

**If you already connected the PC to the internet before trying**: too late, move on to solution 2.

---

### Solution 2: Cut the internet at the last minute (the brutal but effective hack)

You have already reached the account creation screen and Windows refuses local accounts? No worries.

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

**Why it works**: Windows only blocks local accounts if the internet is available. No internet, no cloud check, so local account allowed.

---

### Solution 3: The "creative" email (less reliable, but quick)

Some users report that entering an email with some flair, like swear words or weird characters, crashes the validation and sends you back to a local account creation screen.

Example: `nope.nope.nope@nope.nope` or `no@thankyou.combattant@nope.com`

**Honestly**: it is random. It worked for some people in 2024, but the latest patches may have patched it. I include it for the record, but do not count on it.

---

### Solution 4: RUFUS (the pro move)

If you make a bootable USB stick with **RUFUS** (the best USB stick creation tool, full stop), there is a "Skip Windows Account" option that lets you avoid this step entirely.

**How**:

1. Download [RUFUS](https://rufus.ie/)
2. Create a bootable Windows 11 USB stick
3. In the advanced options, tick "Start menu" and "Skip Windows Account" (or similar, depending on your version)
4. Boot and install, not a single Microsoft account request

**Advantages**:
- Zero interaction with Microsoft
- Local account created from the start
- The cleanest solution if you install Windows regularly
- No command-line tinkering

**Disadvantages**:
- You need a USB stick (at least 8 GB)
- A bit of preparation in advance

---

## The traps (because there are always some)

### 1. **The network connection before `OOBE\BYPASSNRO`**

If you already clicked on the WiFi and you are connected, the `OOBE\BYPASSNRO` command **will no longer work**.

Windows has already "verified" online that you needed a Microsoft account. The command is too late.

**Solution**: Solution 2 (cut the internet).

### 2. **The form that rejects your "fake" email**

Email validation has been tightened. `no@thankyou.com` no longer goes through. Neither do the variants.

**Verdict**: forget this trick. It was cool in 2022, not anymore.

### 3. **Automatic reboot without asking you**

Sometimes Windows 11 reboots after the account creation step, which cuts your internet and leaves you with a dead network connection.

**This is normal**. Open a command prompt and type `ipconfig /renew`. Or reboot properly.

### 4. **The command prompt that will not open**

If `Shift+F10` does not work, try `Ctrl+Alt+Delete` → Sign out → then `Shift+F10` at the login screen.

Or bring up an accessibility request (`Win+U` if possible), sometimes it opens a menu that lets you launch `cmd.exe`.

### 5. **You created the Microsoft account and you regret it**

Too late. You have to use that account now. Create a new local user afterwards? Yes, it is possible via Settings → Accounts → Create a local account, but you will always have the Microsoft account hanging around.

**Moral**: solutions 1 or 2 must be applied **before** creating a Microsoft account. Once it exists, bypassing it is more complicated.

### 6. **You get a "Cannot connect to the security server" message**

That just means there is no internet connection. That is the goal. Keep going, Windows will offer you a local account in 5 seconds.

---

## Summary table (because I like tables)

| Solution | Timing | Difficulty | Reliability | Stress level |
|----------|--------|-----------|-----------|---|
| `OOBE\BYPASSNRO` | Before network | ⭐ | 100% | Zero if the timing is right |
| Cut the internet | At the account screen | ⭐⭐ | 95% | Moderate (you have to cut the internet) |
| Creative email | Any time | ⭐ | 30% | Very high if it does not work |
| RUFUS | Before install | ⭐ | 100% | Zero (clean solution) |

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

**At this point**: use Solution 2 (cut the internet). It is your salvation.

Press `Shift+F10`, type `ipconfig /release`, wait, then go back to the previous screen. Windows will resign itself and offer you a local account.

---

## Why Microsoft does this

Honestly? Because:

1. **User data**: a Microsoft account = synced data = profiling = insights
2. **Control**: cloud accounts are easier to monitor and lock down
3. **Upsell**: Windows 11 Home pushes Microsoft accounts hard. Very hard.

There is nothing technically shady about it, it is just business. Microsoft has the right to favour its ecosystem.

But you also have the right to want a local machine. The two can coexist.

---

## What about the alternatives?

If Windows 11 really frustrates you (which is understandable):

- **Windows 10**: local accounts with no hassle. End of support in October 2025, but for a test machine, it is fine. And it is free.
- **Linux** (Ubuntu, Fedora, Pop!_OS): local accounts by default, free, zero tracking, better performance.
- **macOS**: iCloud accounts optional, but Macs are expensive and locked down.

But if you are stuck with Windows 11, these solutions work.

And honestly? For someone who has just received a refurbished Surface and just wants to create an account to use it? It is priceless.

---

## One-sentence summary

**If you are not yet connected to WiFi: run `OOBE\BYPASSNRO` right away. If it is too late: cut the internet with `ipconfig /release` and restart the account creation.**

One `ipconfig`. One command line. And suddenly, Windows comes to its senses.

It is not pretty, it is not elegant, it is not what we expected in 2026. But it works.

And for someone who has just received a refurbished Surface, an old test machine, or a VM that refuses to cooperate, it is priceless.

---

## Further reading

- **RUFUS**: [https://rufus.ie/](https://rufus.ie/), the best USB stick creation tool
- **Creating a local account afterwards**: Settings → Accounts → Other users
- **Removing a Microsoft account**: Settings → Accounts → Your info → Manage my Microsoft account

---

*[Jean Houédanou](https://houedanou.com), Microsoft does not like this article*
