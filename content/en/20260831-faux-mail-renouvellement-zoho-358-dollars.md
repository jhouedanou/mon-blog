---
title: "$358.25 charged: anatomy of the fake renewal email"
createdAt: "2026-08-31"
image: "/images/articles/zoho.webp"
description: "This morning, I received a payment confirmation for 358.25 dollars for a Zoho Backstage renewal, a service I have never used. No link, no attachment, just a phone number to call. Here's how this scam works and what to do if you get the same email."
searchIntent: "How to recognise a fake Zoho renewal email with a phone number, and what to do if you have already called."
tags: [security, phishing, alert]
---

# $358.25 charged: anatomy of the fake renewal email

This morning, opening my inbox, I come across a payment confirmation: 358.25 dollars, renewal processed successfully, transaction completed, thank you for choosing Zoho Backstage.

The problem is that I've never bought anything from Zoho Backstage. I don't have a Zoho account, I've never organised an event, and I've never paid 358 dollars for anything at all. Yet the email is there, with an official tone and a logo that looks authentic.

The first reflex, the one we all have, is to look for the cancel button. That's exactly what the authors of this email are counting on.

The second reflex, fortunately, was to remember that I don't usually leave that kind of amount sitting on my prepaid cards. It helps keep a cool head.

## What makes this email different

We've been repeating the same advice for ten years: don't click the links, don't download the attachments, check the address before logging in. Except this email asks for none of that. There's nothing to click, nothing to download, no login form. The only call to action sits in one discreet line, slipped into the middle of the text:

> Refund help is available through +1 (812) 552-8528 when a transaction appears without your consent

Just a phone number. That's precisely why the message gets through: anti-phishing filters analyse links and domains, and a number buried in a block of text sets off no alarm, not at Gmail and not in your head.

This technique has a name, the refund scam, or vishing (voice phishing). The attack doesn't play out in the email, which is only a pretext to get you to pick up your phone.

## What happens if you call

The script is well rehearsed and hardly ever varies.

1. Someone very pleasant picks up, confirms the charge, apologises and offers to refund you immediately.
2. To "process the refund", you need to install a little remote-assistance tool, AnyDesk, TeamViewer or UltraViewer. It's standard, sir, it's our procedure.
3. They have you open your bank account on screen, then "make a mistake" typing the amount: instead of $358, they supposedly transferred $3,580 to you. They panic and beg you to send back the difference.
4. In reality, nothing was transferred. The screen was manipulated, or the money comes from a stolen account. You, on the other hand, send a real transfer from a real account, to an account that will have vanished within the hour.

And all this time, that person has control of your machine.

## The six signals that should have tipped me off

1. The American phone number. No serious software vendor puts a number to call back in a billing email. At Zoho, Adobe or Microsoft, support goes through your customer portal, never through a number received in an unsolicited message. This signal alone is enough.

2. The precise amount. $358.25, not 350 or 400. An amount with cents looks real, and it hurts. It's calibrated to worry you while staying plausible enough that you don't immediately think "that's impossible".

3. The inconsistent content. The email mixes a payment confirmation with an invitation to become Space Admin of a brand. Those are two completely different messages that nobody would send together. You can recognise blocks copied and pasted from real templates.

4. The service you've never used. Zoho Backstage is an event management tool. If you've never organised a conference, you have nothing to renew there. The senders spray millions of addresses knowing that a small fraction of recipients will have a doubt, and that doubt is enough for them.

5. The real sender. The display name says "Zoho Backstage", but the address behind it tells another story. In Gmail, click the arrow next to the name, or open Show original to read the full headers. Look at the `Return-Path` and the result of the SPF and DKIM checks: if they fail, or if the domain isn't `zohocorp.com`, case closed.

6. The absence of any account details. A real billing email contains an invoice number, the last four digits of the card, the plan name and the due date. Here, none of that, quite simply because they know nothing about you.

## Why Zoho, of all things?

The same campaigns have been running for years with Norton, McAfee, Geek Squad or PayPal. What they have in common is services you may have subscribed to without remembering: an antivirus installed three years ago, an account created for a test, a team subscription paid by a colleague.

These campaigns aren't trying to convince you that you have to pay, but that you may already have paid. It's no longer greed they exploit, it's the perfectly legitimate wish to get your money back.

Zoho enters the rotation because the suite is widely used by SMEs, including here at home. Many of us have a Zoho account somewhere. Backstage, far fewer, but who takes the time to check the difference when they see 358 dollars leaving?

## What to do

- Don't call, ever. That's the only rule that really matters on this one.
- Check your bank statement directly, from your bank's app or website. No charge? End of story.
- If you have a real Zoho account, type `zoho.com` yourself into the address bar and look at your invoices from your account. Never go through the email.
- Report the message to `abuse@zohocorp.com`, then delete it.
- Warn your team. That's probably the most important point: these emails also land with your accountant, your assistant, the colleague who holds the company's bank card, and they don't necessarily have the reflex.

## If someone has already called

It happens, and it's not the end of the world provided you react quickly.

- Immediately uninstall any remote access software installed during the call.
- Disconnect the machine from the network, then have it scanned.
- Call your bank to report the attempt and have the account monitored.
- Change your passwords from another device, never from the one that was shared.
- If a transfer went out, report it to the bank within the hour. That's the only window in which there's still a chance of getting it back.

## To wrap up

We harden servers, we enforce MFA everywhere, we run audits. And the attack most likely to get through is still an ugly email, with no link, with a phone number in it. There's no technique in there, just a well-chosen amount and the bet that panic will do the rest.

The rule to remember, for you and for your colleagues: an email never proves a charge, only your bank does. The email says what the sender wants you to believe, the statement says what actually happened.

— [Jean Luc Houédanou](https://houedanou.com) · Zoho Backstage's "customer service" still hasn't called me back 🙂
