---
title: "With Claude Dispatch, your smartphone becomes a remote control for Claude Code"
image: "/images/articles/clauderemote.webp"
createdAt: "2026-05-31"
updatedAt: "2026-10-08T12:00:00Z"
description: "Drive a Claude Code session running on your computer from your phone: the 3-step setup, the eligible plans and the limits to know before you start."
searchIntent: "How to control a Claude Code session from a smartphone with Claude Dispatch."
tags: ["claude-code", "tools", "productivity", "development"]
---

There are days when you have to leave, but your code cannot wait.

A bug in prod. A client calling back. A meeting in 20 minutes on the other side of Abidjan. Or that colleague who has got into the habit of waiting until the end of the day to update the feature list, when he is not doing it on Sunday evening.

You could resign yourself to it, call it "office life" and put up with it while grumbling. That is not my approach. In the rare cases where I don't block these late requests (*yes, blocked. I am a professional, but I have a life. And experience shows that messages sent at 6pm sharp are never real emergencies, just a way of looking like a "hard worker who never lets go", otherwise known by a name my good upbringing prevents me from writing here*), I go home, switch on the MacBook, and let Claude Code run to deliver without sacrificing my wellbeing.

This workflow is made possible by **Remote Control**, the Claude Code feature I loosely call Dispatch here. The real **Dispatch** is its cousin on the Cowork side, in the Claude Desktop app ([MacStories tried it](https://www.macstories.net/stories/hands-on-with-claude-dispatch-for-cowork/)). The principle of [Remote Control](https://code.claude.com/docs/en/remote-control): turn your smartphone into a remote control for your active Claude Code session.

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

**3. Connect your phone**: scan the QR code, or open the official Claude app on iOS or Android, tap **Code** in the navigation and find the matching session in the list. It is marked with a computer icon and a green dot when it is online.

That's it. Your session can now be driven from your phone.

## What to know before diving in

- **Your computer has to stay on.** Remote Control does not resurrect dead sessions: the `claude` process has to keep running. If your Mac goes to sleep or loses the network, the session pauses, then Claude Code reconnects on its own when the machine comes back.
- **It is a mirror, not an autonomous agent.** You still approve the changes. Claude Code does nothing without your say-so.
- **Plan required.** The feature is available on the Pro, Max, Team and Enterprise plans (on Team and Enterprise, an admin has to turn it on first). API keys are not supported.

For my part, my usage stays simple: I have never delegated writing my code to Claude Code ([I explained why here](/en/20260423-chers-vibe-codeurs-bienvenue-dans-la-realite)). I write first, Claude Code fixes afterwards, no skills, no agents, just my terminal and me. Remote Control fits into that logic: I stay in control, from anywhere. The preview happens on the smart TV or the iPad, depending on which room I am in.

Simple. Efficient. Three steps.

*Updated October 8, 2026: clarifications based on the [official Remote Control documentation](https://code.claude.com/docs/en/remote-control): the feature is called Remote Control (Dispatch is the Cowork equivalent), it is open to the Pro, Max, Team and Enterprise plans, the session shows up in the app's Code tab, and it reconnects after sleep.*

---
*[Jean-Luc Houédanou](https://houedanou.com). This is the kind of feature that gives meaning to the rising price of RAM.*
