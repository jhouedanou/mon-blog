---
title: "With Claude Dispatch, your smartphone becomes a remote control for Claude Code"
image: "/images/articles/clauderemote.webp"
createdAt: "2026-05-31"
description: "Claude Dispatch lets you control Claude Code remotely from your phone. 3 steps, and your terminal follows you everywhere."
searchIntent: "How to control a Claude Code session from a smartphone with Claude Dispatch."
tags: ["claude-code", "tools", "productivity", "development"]
---

# With Claude Dispatch (Anthropic Remote Control), your smartphone becomes a remote control for Claude Code

There are days when you have to leave, but your code cannot wait.

A bug in prod. A client calling back. A meeting in 20 minutes on the other side of Abidjan. Or that colleague who has got into the habit of waiting until the end of the day to update the feature list, when he is not doing it on Sunday evening.

You could resign yourself to it, call it "office life" and put up with it while grumbling. That is not my approach. In the rare cases where I don't block these late requests (*yes, blocked. I am a professional, but I have a life. And experience shows that messages sent at 6pm sharp are never real emergencies, just a way of looking like a "hard worker who never lets go", otherwise known by a name my good upbringing prevents me from writing here*), I go home, switch on the MacBook, and let Claude Code run to deliver without sacrificing my wellbeing.

This workflow is made possible by **Claude Dispatch**, or **Remote Control** depending on the version. The principle: turn your smartphone into a remote control for your active Claude Code session.

## What it actually does

Your code stays on your computer. Claude Code runs on your computer. Your phone becomes an encrypted mirror of your terminal: you see what Claude is doing, you approve or reject each action. Anthropic sets up a secure tunnel between your desktop session and the Claude mobile app, and nothing travels anywhere else.

## Set up in 3 steps

**1. Open Claude Code in your terminal.**

**2. Generate the control link** by typing in the active session:

```bash
/rc
```

or

```bash
/remote-control
```

Claude Code generates a secure link and a QR code.

**3. Connect your phone**: open the official Claude app on iOS or Android, go to the **Code / Dispatch** tab and find the matching session. It is marked with a green "connected" badge.

That's it. Your session can now be driven from your phone.

## What to know before diving in

- **Your computer has to stay on.** Remote Control does not resurrect dead sessions. If your Mac goes to sleep, the connection drops.
- **It is a mirror, not an autonomous agent.** You still approve the changes. Claude Code does nothing without your say-so.
- **Plan required.** The feature is available to Max and Pro subscribers.

For my part, my usage stays simple: I have never delegated writing my code to Claude Code. I write first, Claude Code fixes afterwards, no skills, no agents, just my terminal and me. Remote Control fits into that logic: I stay in control, from anywhere. The preview happens on the smart TV or the iPad, depending on which room I am in.

Simple. Efficient. Three steps.

---

*[Jean Houédanou](https://houedanou.com). This is the kind of feature that gives meaning to the rising price of RAM.*
