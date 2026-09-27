---
title: "Cloudflare WARP on CanalBox fibre: what it is good for, and what it costs"
createdAt: "2026-09-27T23:30:00Z"
image: "/images/articles/cloudflare-warp-fast-com-canalbox.webp"
description: "Same CanalBox fibre, two fast.com tests: with Cloudflare WARP, download speed barely moves, but upload drops 40% and latency goes from 7 to 136 ms. Here is why, and what WARP is really good for."
searchIntent: "Does Cloudflare WARP slow down a CanalBox fibre connection in Abidjan, why does latency go up with WARP, and what is WARP useful for: security on public Wi-Fi, privacy from your operator?"
tags: ["tech", "africa", "security", "cloudflare", "canalbox", "vpn"]
---

# Cloudflare WARP on CanalBox fibre: what it is good for, and what it costs

I ran two speed tests on [fast.com](https://fast.com/) with my Canal+ CanalBox fibre connection (the same box as in [my Wi-Fi password tutorial](/en/20260924-changer-mot-de-passe-wifi-canalbox-canal-plus-afrique)). The first with Cloudflare WARP on, the second without. Both screenshots are at the top of this article (the fast.com interface is in French).

## The numbers

| | With WARP | Without WARP |
|---|---|---|
| Download | 21 Mbps | 23 Mbps |
| Upload | 6.5 Mbps | 11 Mbps |
| Latency, idle line | 136 ms | 7 ms |
| Latency, busy line | 247 ms | 141 ms |
| Test servers | Madrid, Fortaleza (Brazil) | Abidjan, Lagos, Paris |

Latency is the time a round trip takes between my computer and the server. fast.com measures it twice: when the line is doing nothing else ("unloaded", *non chargé* on the screenshots), then during the speed test ("loaded", *chargé*).

What this means:

- **Download barely moves**: 2 Mbps less, or 9%. To watch a video or download a file, you will not see the difference.
- **Upload loses 40%**: 6.5 Mbps instead of 11. Sending a video on WhatsApp, backing up your photos to the cloud or pushing code to GitHub takes longer.
- **Latency is multiplied by 19**: 136 ms instead of 7. At 7 ms, the response is instant. At 136 ms, you feel the lag in an online game.

One test on each side is not much: the exact numbers change from one measurement to the next. But a jump from 7 to 136 ms is not down to chance. It comes from the route.

## Why such a gap: the detour

fast.com belongs to Netflix. It measures the speed between you and the servers that stream Netflix films and series, and it picks those servers based on the IP address it sees.

- **Without WARP**, fast.com sees my address at GVA Côte d'Ivoire, the operator behind CanalBox (it starts with `2c0f:ecf0`). It sends me to servers in Abidjan, Lagos and Paris. The closest one is in Abidjan itself: 7 ms.
- **With WARP**, all my internet traffic first enters Cloudflare's network, and leaves from there towards websites. So fast.com sees a Cloudflare address. It starts with `2a09:bac1`, a block that RIPE, the European IP address registry, records under the name "CLOUDFLAREWARP". For that address, Netflix picked servers in Madrid and in Fortaleza, Brazil. Both cities are nearly 4,000 km from Abidjan as the crow flies, and undersea cables do not run in a straight line: 136 ms.

With WARP, fast.com still shows me in Abidjan. That is by design. According to [Cloudflare's FAQ](https://developers.cloudflare.com/warp-client/known-issues-and-faq/), WARP replaces your IP address with a Cloudflare IP "that consistently and accurately represents your approximate location". To websites, I am still in Abidjan. But for this test, my data went all the way to Madrid and Fortaleza.

The detour mostly slows down services that have servers in Abidjan, like Netflix. For a website hosted in Europe, data crosses the sea either way, and the gap should be smaller.

Cloudflare admits the cost in the same FAQ: WARP "is built to trade some throughput for enhanced privacy", and "on desktop systems in countries where high-speed broadband is available, you may notice a drop".

## So what is WARP for?

WARP is a free app: one button, and all of the device's traffic goes, encrypted, through Cloudflare's network. When it was announced, in April 2019, Cloudflare promised to make mobile internet faster and safer, and described WARP as ["the VPN for people who don't know what V.P.N. stands for"](https://blog.cloudflare.com/1111-warp-better-vpn/).

On my fibre, WARP does not make anything faster. It is for something else:

- **Protecting yourself on public Wi-Fi.** At a hotel, an airport, a coworking space or a maquis (an open-air restaurant), the network owner and the other customers can no longer see which sites you visit. This is where WARP is most useful.
- **Hiding your browsing from your operator.** GVA, or Orange, MTN and Moov on 4G, only see an encrypted stream sent to Cloudflare.
- **Hiding your IP address from websites.** They see a Cloudflare address, not your line's.

And what WARP does not do:

- **It does not change your country.** You cannot pick a location, and websites still place you near home. So WARP will not unlock another country's Netflix catalogue.
- **It does not make you anonymous.** Your operator no longer sees where you go, but Cloudflare does. You move your trust from one to the other. At launch, Cloudflare committed to not writing user-identifiable log data to disk, and to never selling your browsing data or using it to target you with advertising.

## In practice

- **At home, on fibre**: WARP off, unless you really want to hide your browsing from your operator. To keep encrypted DNS queries without the detour, the app has a "1.1.1.1" mode. It only sends DNS (the directory that turns a site's name into an IP address) through Cloudflare, and the rest of the traffic takes the normal route. Run another fast.com test to check.
- **On a Wi-Fi network you do not know**: WARP on, no hesitation.
- **For an online game or a big upload** (a backup, a video, a `git push`): turn WARP off for the time it takes.

## By the way: latency when the line is busy

The screenshots show another problem, one that does not come from WARP. Without WARP, latency goes from 7 to 141 ms as soon as the line is busy. With WARP, it goes from 136 to 247 ms. Either way, more than 100 ms are added during the speed test.

In plain terms: when someone at home starts a big download, WhatsApp calls and online games suffer, with or without WARP. This problem has a name, "bufferbloat": queues that are too long in the box, the Wi-Fi or the operator's network. When a big download fills them, everything else waits its turn, including the voice on a call.

---

_Screenshots: two fast.com tests on my CanalBox fibre, the first with WARP, the second without. I boxed the idle latency and hid the end of my IP address. This blog is hosted on Cloudflare, on the free plan ([I wrote about it here](/en/20260922-jai-recupere-le-trafic-de-mon-blog-et-les-bots-qui-vont-avec))._
