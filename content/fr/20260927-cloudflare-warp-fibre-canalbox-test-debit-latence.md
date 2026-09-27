---
title: "Cloudflare WARP sur la fibre CanalBox : à quoi ça sert, et ce que ça coûte"
createdAt: "2026-09-27T23:30:00Z"
image: "/images/articles/cloudflare-warp-fast-com-canalbox.webp"
description: "Même fibre CanalBox, deux tests fast.com : avec Cloudflare WARP, le téléchargement ne bouge presque pas, mais l'envoi perd 40 % et la latence passe de 7 à 136 ms. Voici pourquoi, et à quoi sert vraiment WARP."
searchIntent: "Cloudflare WARP ralentit-il une connexion fibre CanalBox à Abidjan, pourquoi la latence augmente-t-elle avec WARP, et à quoi sert WARP : sécurité sur un Wi-Fi public, confidentialité face à son opérateur ?"
tags: ["tech", "afrique", "sécurité", "cloudflare", "canalbox", "vpn"]
---

# Cloudflare WARP sur la fibre CanalBox : à quoi ça sert, et ce que ça coûte

J'ai lancé deux tests de vitesse sur [fast.com](https://fast.com/fr/) avec ma connexion fibre CanalBox de Canal+ (la même box que dans [mon tutoriel sur le mot de passe Wi-Fi](/fr/20260924-changer-mot-de-passe-wifi-canalbox-canal-plus-afrique)). Le premier avec Cloudflare WARP activé, le second sans. Les deux captures sont en tête d'article.

## Les chiffres

| | Avec WARP | Sans WARP |
|---|---|---|
| Téléchargement | 21 Mbps | 23 Mbps |
| Envoi | 6,5 Mbps | 11 Mbps |
| Latence, ligne au repos | 136 ms | 7 ms |
| Latence, ligne occupée | 247 ms | 141 ms |
| Serveurs du test | Madrid, Fortaleza (Brésil) | Abidjan, Lagos, Paris |

La latence, c'est le temps d'un aller-retour entre mon ordinateur et le serveur. fast.com la mesure deux fois : quand la ligne ne fait rien d'autre (« non chargé »), puis pendant le test de vitesse (« chargé »).

Ce que ça donne :

- **Le téléchargement ne bouge presque pas** : 2 Mbps de moins, soit 9 %. Pour regarder une vidéo ou télécharger un fichier, on ne voit pas la différence.
- **L'envoi perd 40 %** : 6,5 Mbps au lieu de 11. Envoyer une vidéo sur WhatsApp, sauvegarder ses photos dans le cloud ou pousser du code sur GitHub prend plus de temps.
- **La latence est multipliée par 19** : 136 ms au lieu de 7. À 7 ms, la réponse est immédiate. À 136 ms, on sent le retard dans un jeu en ligne.

Un seul test de chaque côté, c'est peu : les chiffres exacts changent d'une mesure à l'autre. Mais un écart de 7 à 136 ms ne vient pas du hasard. Il vient du trajet.

## Pourquoi un tel écart : le détour

fast.com appartient à Netflix. Il mesure la vitesse entre vous et les serveurs qui diffusent les films et les séries de Netflix, et il choisit ces serveurs d'après l'adresse IP qu'il voit.

- **Sans WARP**, fast.com voit mon adresse chez GVA Côte d'Ivoire, l'opérateur de la CanalBox (elle commence par `2c0f:ecf0`). Il m'envoie vers des serveurs à Abidjan, Lagos et Paris. Le plus proche est à Abidjan même : 7 ms.
- **Avec WARP**, tout mon trafic internet entre d'abord dans le réseau de Cloudflare, et c'est de là qu'il repart vers les sites. fast.com voit donc une adresse de Cloudflare. Elle commence par `2a09:bac1`, un bloc que le RIPE, le registre européen des adresses IP, enregistre sous le nom « CLOUDFLAREWARP ». Pour cette adresse, Netflix a choisi des serveurs à Madrid et à Fortaleza, au Brésil. Les deux villes sont à près de 4 000 km d'Abidjan à vol d'oiseau, et les câbles sous-marins ne vont pas en ligne droite : 136 ms.

Avec WARP, fast.com m'affiche quand même à Abidjan. C'est voulu. Selon [la FAQ de Cloudflare](https://developers.cloudflare.com/warp-client/known-issues-and-faq/), WARP remplace votre adresse IP par une adresse de Cloudflare « qui représente de façon fiable et précise votre position approximative ». Pour les sites, je suis donc toujours à Abidjan. Mais pour ce test, mes données sont allées jusqu'à Madrid et Fortaleza.

Le détour ralentit surtout les services qui ont des serveurs à Abidjan, comme Netflix. Pour un site hébergé en Europe, les données traversent la mer dans tous les cas, et l'écart devrait être plus faible.

Cloudflare reconnaît d'ailleurs le coût dans la même FAQ : WARP est « conçu pour échanger un peu de débit contre plus de confidentialité », et sur un ordinateur, dans les pays qui ont le haut débit, « vous pourriez remarquer une baisse ».

## À quoi sert WARP, alors ?

WARP est une application gratuite : un seul bouton, et tout le trafic de l'appareil passe, chiffré, par le réseau de Cloudflare. À son annonce, en avril 2019, Cloudflare promettait de rendre l'internet mobile plus rapide et plus sûr, et présentait WARP comme [« le VPN pour les gens qui ne savent pas ce que V.P.N. veut dire »](https://blog.cloudflare.com/1111-warp-better-vpn/).

Sur ma fibre, WARP ne fait pas gagner de vitesse. Il sert à autre chose :

- **Se protéger sur un Wi-Fi public.** À l'hôtel, à l'aéroport, dans un espace de coworking ou au maquis, le propriétaire du réseau et les autres clients ne voient plus quels sites vous visitez. C'est là que WARP est le plus utile.
- **Cacher sa navigation à son opérateur.** GVA, ou Orange, MTN et Moov sur la 4G, ne voient plus qu'un flux chiffré envoyé à Cloudflare.
- **Cacher son adresse IP aux sites.** Ils voient une adresse de Cloudflare, pas celle de votre ligne.

Et ce que WARP ne fait pas :

- **Il ne change pas de pays.** On ne peut pas choisir sa position, et les sites vous situent toujours près de chez vous. WARP ne sert donc pas à débloquer le catalogue Netflix d'un autre pays.
- **Il ne rend pas anonyme.** Votre opérateur ne voit plus où vous allez, mais Cloudflare, lui, le voit. Vous déplacez votre confiance de l'un vers l'autre. À son lancement, Cloudflare s'est engagé à ne pas écrire sur disque de journaux qui permettent de vous identifier, et à ne jamais vendre vos données de navigation ni s'en servir pour vous cibler avec de la publicité.

## En pratique

- **À la maison, sur la fibre** : WARP coupé, sauf si vous tenez à cacher votre navigation à l'opérateur. Pour garder des requêtes DNS chiffrées sans le détour, l'application a un mode « 1.1.1.1 ». Il ne fait passer que le DNS (l'annuaire qui traduit le nom d'un site en adresse IP) par Cloudflare, et le reste du trafic prend la route normale. Refaites un test fast.com pour vérifier.
- **Sur un Wi-Fi que vous ne connaissez pas** : WARP activé, sans hésiter.
- **Pour un jeu en ligne ou un gros envoi** (une sauvegarde, une vidéo, un `git push`) : coupez WARP le temps de l'opération.

## Au passage : la latence quand la ligne est occupée

Les captures montrent un autre problème, qui ne vient pas de WARP. Sans WARP, la latence passe de 7 à 141 ms dès que la ligne est occupée. Avec WARP, elle passe de 136 à 247 ms. Dans les deux cas, plus de 100 ms s'ajoutent pendant le test de vitesse.

En clair : quand quelqu'un lance un gros téléchargement à la maison, les appels WhatsApp et les jeux en ligne en souffrent, avec ou sans WARP. Ce problème a un nom, le « bufferbloat » : des files d'attente trop longues dans la box, le Wi-Fi ou le réseau de l'opérateur. Quand un gros téléchargement les remplit, tout le reste attend son tour, y compris la voix d'un appel.

---

_Captures : deux tests fast.com sur ma fibre CanalBox, le premier avec WARP, le second sans. J'ai encadré la latence au repos et masqué la fin de mon adresse IP. Ce blog est hébergé chez Cloudflare, sur le plan gratuit ([j'en parlais ici](/fr/20260922-jai-recupere-le-trafic-de-mon-blog-et-les-bots-qui-vont-avec))._
