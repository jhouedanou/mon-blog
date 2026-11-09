---
title: "Claude Code Remote Control from your phone"
image: "/images/articles/clauderemote.webp"
createdAt: "2026-05-31"
updatedAt: "2026-11-08T12:00:00Z"
description: "Claude Code Remote Control: drive a session running on your computer from your phone. Setup in 3 steps, plans, limits, and how it differs from Dispatch."
searchIntent: "How to control a Claude Code session from a smartphone with Remote Control."
tags: ["claude-code", "tools", "productivity", "development"]
---

With Claude Code Remote Control, your smartphone becomes the remote for a Claude Code session running on your computer.

There are days when you have to leave, but your code can't wait.

A bug in prod. A client calling back. A meeting in 20 minutes on the other side of Abidjan. Or that colleague who's got into the habit of waiting until the end of the day to update the feature list, when he isn't doing it on Sunday evening.

You could resign yourself to it, call it "office life" and grumble your way through it. That's not my approach. In the rare cases where I don't [block these late requests](/en/20261028-whatsapp-nest-pas-un-moyen-de-communication-professionnel) (*yes, blocked. I'm a professional, but I have a life. And experience shows that messages sent at 6pm sharp are never real emergencies, just a way of looking like a "hard worker who never lets go", otherwise known by a name my good upbringing prevents me from writing here*), I go home, switch on the MacBook, and let Claude Code run so I can deliver without sacrificing my wellbeing.

I owe this workflow to **Remote Control**, the Claude Code feature I loosely called Dispatch in the first version of this post. The real **Dispatch** is its cousin on the Cowork side, in the Claude Desktop app ([MacStories tried it](https://www.macstories.net/stories/hands-on-with-claude-dispatch-for-cowork/)). The principle of [Remote Control](https://code.claude.com/docs/en/remote-control): turn your smartphone into a remote control for your active Claude Code session.

## What Claude Code Remote Control does

Your code stays on your computer. Claude Code runs on your computer. Your phone becomes an encrypted mirror of your terminal: you see what Claude is doing, you write to it, you approve or reject its actions. Your machine opens no inbound ports: it reaches the Anthropic API over HTTPS, and messages travel that way, encrypted with TLS. The session transcript (your messages, Claude's replies, its actions) is stored on Anthropic's servers to stay in sync across your devices; execution and files stay on your computer ([Remote Control documentation](https://code.claude.com/docs/en/remote-control#connection-and-security){target="_blank" rel="noopener"}).

## Remote Control or Dispatch: which one?

Both are driven from the Claude app on your phone, and in both cases Claude works on your computer. The difference is what you hand it ([comparison in the documentation](https://code.claude.com/docs/en/remote-control#remote-control-vs-cloud-sessions){target="_blank" rel="noopener"}, [Dispatch in Claude Desktop](https://code.claude.com/docs/en/desktop#sessions-from-dispatch){target="_blank" rel="noopener"}):

| | Remote Control | Dispatch |
| --- | --- | --- |
| Where it lives | Claude Code: terminal, Claude Desktop app or VS Code | Cowork, in the Claude Desktop app |
| From your phone | You pick up a session that is already open | You send a task; Claude decides how to handle it and can open a Claude Code session on its own |
| Setup | `/remote-control` in the session | Pair the mobile app with Claude Desktop |
| Plans | Pro, Max, Ultra, Team, Enterprise | Pro, Max, Ultra (not Team or Enterprise) |

To carry on with work in progress, use Remote Control. To hand off a task as you leave, use Dispatch.

## Turn on Remote Control in 3 steps

**1. Open Claude Code in your terminal.**

Sign in with your claude.ai account (`/login`): Remote Control doesn't work with an API key.

**2. Generate the control link** by typing in the active session:

```bash
/rc
```

or

```bash
/remote-control
```

Claude Code generates a secure link and a QR code. The first time, a dialog asks you to confirm: choose **Enable Remote Control**.

To start a session you can drive remotely straight away, run `claude --remote-control` instead of `claude`. And so you never have to think about it again, `/config` offers **Enable Remote Control for all sessions**.

**3. Connect your phone**: scan the QR code, or open the official Claude app on iOS or Android, tap **Code** in the navigation and find the matching session in the list. It's marked with a computer icon and a green dot when it's online. Don't have the app yet? Type `/mobile` in Claude Code: it shows a QR code that opens the right app store.

That's it. Your session can now be driven from your phone.

## What to know before diving in

- **Your computer has to stay on.** Remote Control doesn't resurrect dead sessions: the `claude` process has to keep running. If your Mac goes to sleep or loses the network, the session pauses, then Claude Code reconnects on its own when the machine comes back. One exception: in server mode (`claude remote-control`), if the machine stays awake but offline, Claude Code gives up after about ten minutes and you have to run the command again.
- **It's a mirror, not an autonomous agent.** You approve the changes: in the default permission mode, Claude Code asks before most file edits, shell commands and network access, and the request shows up on your phone. If the session runs in a more permissive mode (`acceptEdits`, for example), it acts without asking ([permission modes](https://code.claude.com/docs/en/permission-modes){target="_blank" rel="noopener"}).
- **Plan required.** The feature is available on the Pro, Max, Ultra, Team and Enterprise plans (on Team and Enterprise, an admin has to turn it on first). API keys are not supported, and neither is Claude through Amazon Bedrock, Google Cloud or Microsoft Foundry.
- **Notifications.** In `/config`, turn on **Push when actions required**: permission requests and Claude's questions arrive as notifications on your phone ([documentation](https://code.claude.com/docs/en/remote-control#mobile-push-notifications){target="_blank" rel="noopener"}).
- **Short answers for a small screen.** [Claude Code caveman mode](/en/20260515-claude-code-caveman-mode) makes the agent answer in a telegraphic style, easier to follow on a phone.

My own use is simple: I've never delegated writing my code to Claude Code ([I explained why in my post on the limits of vibe coding](/en/20260423-chers-vibe-codeurs-bienvenue-dans-la-realite)). I write first, Claude Code fixes afterwards, no skills, no agents, just my terminal and me. Remote Control fits right in: I stay in control, from anywhere. The preview happens on the smart TV or the iPad, depending on which room I'm in.

*Updated October 8, 2026: clarifications based on the [official Remote Control documentation](https://code.claude.com/docs/en/remote-control): the feature is called Remote Control (Dispatch is the Cowork equivalent), it is open to the Pro, Max, Team and Enterprise plans, the session shows up in the app's Code tab, and it reconnects after sleep. The title has been corrected accordingly (it used to say "Claude Dispatch").*

*Updated November 8, 2026: based on the [official Remote Control documentation](https://code.claude.com/docs/en/remote-control){target="_blank" rel="noopener"}, added the Ultra plan, starting with `claude --remote-control`, push notifications and a comparison with Dispatch. Two clarifications correct the post: the session transcript is stored by Anthropic (the post said nothing travelled anywhere else), and Claude Code does not always ask for your approval: it depends on the session's permission mode.*

---
*[Jean-Luc Houédanou](https://houedanou.com). This is the kind of feature that justifies the rising price of RAM.*
