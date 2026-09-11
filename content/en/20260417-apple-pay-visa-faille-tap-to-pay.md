---
title: "How researchers stole $10,000 through a locked iPhone: the Apple Pay / Visa flaw explained"
image: "/images/articles/apple-pay-visa-hack.webp"
createdAt: "2026-04-17"
description: "Researchers have shown that it is possible to charge a large amount to a locked iPhone by exploiting Apple Pay's Express Transit mode combined with Visa's protocols. Here is how it works, and how to protect yourself."
searchIntent: "How can an Apple Pay and Visa flaw charge a locked iPhone, and how do you protect yourself?"
tags: ["security", "Apple Pay", "Visa", "NFC", "iPhone", "security flaw"]
---

# How researchers stole $10,000 through a locked iPhone: the Apple Pay / Visa flaw explained

Some security stories sound like science fiction. This one happened in a university lab, was documented and published, and it very probably concerns the phone sitting in your pocket right now.

Researchers from the universities of Birmingham and Surrey have shown that it is possible to **charge several thousand dollars to a locked iPhone**, without any interaction from its owner, by exploiting a combination of weaknesses in Apple Pay and Visa's transaction protocols.

Watch the full demonstration (English)
:youtube{video="PPJ6NJkmDAo" title="VISA"}

---

## Express Transit mode: convenient, but dangerous

To understand the attack, you first need to understand Apple Pay's **Express Transit** mode.

This mode was designed for public transport: you hold your locked iPhone up to a metro turnstile, the payment goes through instantly, no Face ID, no PIN. The idea is a good one. Nobody wants to ask people to unlock their phone every time they walk through a gate.

The problem? This mode deliberately switches off the usual protections. And any NFC terminal can, by sending the right signal, _make the iPhone believe it is standing in front of a metro turnstile_.

---

## The attack in three acts

### Act 1: Interception (NFC Man-in-the-Middle)

The researchers use two NFC devices (Proxmarks, available commercially): one that pretends to be a payment terminal to the phone, and another that pretends to be an iPhone to a real terminal.

The two devices are linked over WiFi or a wired connection. The result: the phone and the terminal think they are talking directly to each other, while everything actually passes through the researchers, who can read and **modify** the data in transit.

### Act 2: Fooling the iPhone

By sending a signal that imitates a public transport terminal, the phone automatically switches into **Express Transit mode**. The lock disappears. Apple Pay is ready to pay.

The iPhone thinks it is validating a $2 ride.

### Act 3: Fooling the terminal

This is where it gets technical. The researchers **flip a few bits** in the transaction data: they change the marker that tells the terminal whether the transaction is "low value" (transit) or "high value" (retail). The terminal therefore reads a retail purchase, let's say $10,000, and approves it as if it had received all the required verifications.

The phone said yes because it thought it was paying for a bus.  
The terminal said yes because it thought the user had authenticated.

Nobody noticed anything. The money is gone.

---

## Why Visa and not Mastercard?

That is the key question, and the answer lies in architectural choices.

**Mastercard** requires **asymmetric cryptography** (digital signatures) on its online transactions. In practice, cryptographically signed data cannot be modified in transit without the tampering being detected. Change one bit, the signature becomes invalid, the transaction is rejected.

**Visa**, on the other hand, **does not mandate that layer for online retail transactions**. The data travels, but it is not "sealed" end to end in the same way. That absence is what makes the bit manipulation described above possible.

This is not a bug in Visa's code. It is an **architectural choice** that sacrifices a layer of security in favour of simplicity and compatibility.

---

## Why aren't Android phones affected?

The flaw on the iPhone side comes from a specific behaviour: the iPhone trusts the "low value transit" label sent by the terminal **without checking the actual numeric amount**.

Samsung phones (and Android in general) **check the transaction amount** independently. If a terminal says "transit" but the amount is $10,000, the phone rejects the transaction.

Apple made a different choice, probably for compatibility with a wide variety of transport systems. That choice turned out to be the weak link.

---

## Visa's and Apple's position

Visa replied that this type of fraud is **hard to scale in the real world**: you need to be physically close to the victim, have specialised hardware, and coordinate the attack in real time. The company also points to its **zero liability** policy: if you fall victim to this kind of fraud, you get reimbursed.

Apple did not comment directly on this research.

The researchers, for their part, maintain that the flaw is real and exploitable, even if it is not trivial to industrialise.

---

## How do you actually protect yourself?

Two simple options:

1. **Turn off Express Transit mode** in Settings → Wallet & Apple Pay → Transit Card → disable "Express Transit Card".
2. **Do not put a Visa card in the Express Transit slot**. Use a Mastercard instead, or a dedicated transit card.

If you live in a city where you genuinely use public transport with your phone every day, option 2 is probably the best compromise. You keep the convenience, you take Visa out of the equation.

---

## What this says about our relationship with security

What strikes me in this story is not the sophistication of the attack. It is the **constant tension between convenience and security** that manufacturers and payment networks have to navigate all the time.

Express Transit _is_ convenient. The fact that Visa is accepted everywhere _is_ a strength. Those very same advantages are what create the conditions for the vulnerability.

The good news is that the fix is right there in your settings. The bad news is that most users have no idea this attack surface even exists.

Now you know.

---

_[Jean Luc Houédanou](https://houedanou.com), happy to own an Android phone._
