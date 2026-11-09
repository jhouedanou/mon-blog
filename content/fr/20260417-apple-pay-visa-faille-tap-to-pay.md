---
title: "Faille Apple Pay Visa : 1 000 £ sans Face ID"
image: "/images/articles/apple-pay-visa-hack.webp"
createdAt: "2026-04-17"
description: "Faille Apple Pay Visa : en 2021, des chercheurs ont débité un iPhone verrouillé en mode Express Transit. Pourquoi Mastercard résiste, et comment se protéger."
searchIntent: "Comment une faille Apple Pay et Visa peut-elle débiter un iPhone verrouillé et comment s’en protéger ?"
updatedAt: "2026-11-08T12:00:00Z"
tags: ["sécurité", "Apple Pay", "Visa", "NFC", "iPhone", "faille de sécurité"]
---

Il y a des histoires de sécurité qui ressemblent à de la science-fiction. Celle de la faille Apple Pay / Visa s'est pourtant passée dans un laboratoire universitaire : elle a été documentée, publiée, et elle concerne très probablement le téléphone qui est dans votre poche en ce moment.

Des chercheurs de l'université de Birmingham et de Surrey ont démontré qu'il est possible de **débiter un iPhone verrouillé, pour n'importe quel montant** (1 000 £ dans leur démonstration), sans aucune interaction de son propriétaire, en exploitant une combinaison de failles dans Apple Pay et les protocoles de transaction Visa.

La recherche ne date pas d'hier. Elle a été rendue publique le 30 septembre 2021 ([communiqué de l'université de Surrey](https://www.surrey.ac.uk/news/visa-and-apple-pay-vulnerabilities-leaves-iphone-users-open-payment-fraud){target="_blank" rel="noopener"}) et présentée au symposium IEEE Security & Privacy de 2022, sous le titre *Practical EMV Relay Protection*. Mais le mode Express Transit et les cartes Visa sont toujours dans nos téléphones, et la leçon tient toujours.

Regarder la démonstration complète (anglais)
:youtube{video="PPJ6NJkmDAo" title="VISA"}

---

## Le mode Express Transit : pratique, mais dangereux

Pour comprendre l'attaque, il faut d'abord comprendre le mode **Express Transit** d'Apple Pay.

Ce mode a été conçu pour les transports en commun : vous passez votre iPhone verrouillé devant un tourniquet de métro, le paiement se fait instantanément, sans Face ID ni code PIN. L'idée est bonne : on ne va pas demander à quelqu'un de déverrouiller son téléphone à chaque passage de porte.

Le problème, c'est que ce mode désactive volontairement les protections habituelles. Et n'importe quel terminal NFC peut, en émettant le bon signal, _faire croire à l'iPhone qu'il est en face d'un tourniquet de métro_.

---

## La faille Apple Pay Visa en trois actes

### Acte 1 — L'interception (Man-in-the-Middle NFC)

Les chercheurs utilisent deux appareils NFC du commerce : un Proxmark, qui se fait passer pour un terminal de paiement auprès de l'iPhone, et un téléphone Android équipé du NFC (même pas rooté), qui se fait passer pour un iPhone auprès d'un vrai terminal.

Les deux appareils sont reliés entre eux : dans leurs essais, le Proxmark est branché en USB sur un ordinateur portable, qui relaie les messages en Wi-Fi jusqu'au téléphone Android ([page des chercheurs](https://practical_emv.gitlab.io/){target="_blank" rel="noopener"}). Résultat : le téléphone et le terminal pensent communiquer directement entre eux, alors que tout passe par les chercheurs, qui peuvent lire et **modifier** les données en transit.

### Acte 2 — Tromper l'iPhone

Les chercheurs envoient un signal qui imite celui d'un terminal de transport en commun, et le téléphone bascule automatiquement en **mode Express Transit**. Le verrou disparaît. Apple Pay est prêt à payer.

L'iPhone croit qu'il valide un trajet à 2 $.

### Acte 3 — Tromper le terminal

C'est là que ça devient technique. Les chercheurs **manipulent quelques bits** dans les données de la transaction : ils activent notamment l'indicateur qui signale au terminal que le porteur s'est déjà authentifié sur son téléphone (Face ID ou code). Le terminal lit donc un achat de détail (disons 10 000 $) et l'approuve comme s'il avait reçu toutes les vérifications nécessaires.

Le téléphone a dit oui parce qu'il croyait payer un bus.  
Le terminal a dit oui parce qu'il croyait que l'utilisateur avait validé.

Personne n'a rien remarqué. L'argent part.

---

## Pourquoi Visa et pas Mastercard ?

La réponse est dans les choix d'architecture.

**Mastercard** impose une **cryptographie asymétrique** (signatures numériques) sur ses transactions en ligne. Concrètement, les données signées cryptographiquement ne peuvent pas être modifiées en transit sans que la falsification soit détectée. Si vous changez un bit, la signature devient invalide, la transaction est rejetée.

**Visa**, en revanche, **ne mandate pas cette couche pour les transactions retail en ligne**. Les données circulent, mais elles ne sont pas « scellées » de bout en bout de la même façon. C'est cette absence qui permet la manipulation de bits décrite plus haut.

Ce n'est pas un bug dans le code de Visa, mais un **choix architectural** qui sacrifie une couche de sécurité au profit de la simplicité et de la compatibilité.

---

## Pourquoi les téléphones Android ne sont pas touchés ?

La faille côté iPhone vient d'un comportement spécifique : l'iPhone fait confiance à l'étiquette « petite valeur transit » que lui envoie le terminal, **sans vérifier le montant numérique réel**.

Les téléphones Samsung (et Android en général), eux, **vérifient le montant de la transaction** indépendamment. Si un terminal dit « transit » mais que le montant est 10 000 $, le téléphone rejette la transaction.

Apple a fait un choix différent, probablement pour des raisons de compatibilité avec des systèmes de transport hétérogènes. Ce choix s'est révélé être le maillon faible.

---

## La position de Visa et d'Apple

Visa a répondu que ce type de fraude est **difficile à mettre à l'échelle dans le monde réel** : il faut être physiquement proche de la victime, avoir du matériel spécialisé, et coordonner l'attaque en temps réel. Visa rappelle également sa politique de **responsabilité zéro** : si vous êtes victime d'une fraude de ce type, vous êtes remboursé.

Apple, de son côté, a renvoyé la balle : pour la marque, il s'agit d'un problème qui concerne « un système Visa » ([BBC News](https://www.bbc.co.uk/news/technology-58719891)).

Les chercheurs, eux, maintiennent que la faille est réelle et exploitable, même si elle n'est pas triviale à industrialiser.

---

## Comment se protéger concrètement ?

Deux options simples :

1. **Désactiver le mode Express Transit** : Réglages → Cartes et Apple Pay (Wallet et Apple Pay sur les anciennes versions d'iOS) → Transport Express, et ne laissez aucune carte sélectionnée (voir la [fiche d'assistance Apple sur le mode Express](https://support.apple.com/fr-fr/105123) : il est activé par défaut quand on ajoute une carte de transport éligible ou une autre carte compatible).
2. **Ne pas associer une carte Visa au slot Express Transit**. Utilisez une carte Mastercard à la place, ou une carte de transport dédiée.

Si vous vivez dans une ville où vous utilisez vraiment les transports en commun avec votre téléphone tous les jours, l'option 2 est probablement le meilleur compromis. Vous gardez la commodité, vous retirez Visa de l'équation.

Et si l'iPhone est perdu ou volé, les chercheurs conseillent d'activer le mode Perdu et d'appeler sa banque pour faire bloquer la carte ([page des chercheurs](https://practical_emv.gitlab.io/){target="_blank" rel="noopener"}). Sur Android, c'est Find Hub qui localise l'appareil, et il m'a aidé à [retrouver mon téléphone perdu à Abobo](/fr/20260730-telephone-perdu-retrouve-abobo-findhub).

Dans tous les cas, un débit suspect se vérifie sur le relevé de votre banque, jamais auprès d'un numéro reçu par mail : c'est tout le piège du [faux mail de renouvellement Zoho](/fr/20260831-faux-mail-renouvellement-zoho-358-dollars).

---

## Ce que ça dit de notre rapport à la sécurité

Ce qui me frappe dans cette histoire, ce n'est pas la sophistication de l'attaque. C'est la **tension permanente entre commodité et sécurité**, avec laquelle constructeurs et réseaux de paiement doivent composer.

Express Transit _est_ pratique. Le fait que Visa soit accepté partout _est_ une qualité. Et ce sont justement ces avantages qui ouvrent la faille. Pareil pour [l'iPhone et l'AirTag qui racontent vos trajets à votre patron](/fr/20250705-cherscommerciaux) : ce qui vous simplifie la vie la documente aussi.

La bonne nouvelle, c'est que la solution se trouve dans vos réglages. La mauvaise, c'est que la plupart des utilisateurs ne savent pas que cette surface d'attaque existe.

*Correction du 8 octobre 2026 : la première version de ce billet présentait cette recherche comme récente. Elle a été publiée en septembre 2021 par les universités de Birmingham et de Surrey ; la date et la source ont été ajoutées en début d'article. Le titre annonçait aussi « 10 000 $ » : le paiement de démonstration était de 1 000 £ ([université de Surrey](https://www.surrey.ac.uk/news/visa-and-apple-pay-vulnerabilities-leaves-iphone-users-open-payment-fraud){target="_blank" rel="noopener"}).*

*Correction du 8 novembre 2026 : l'attaque n'utilise pas deux Proxmark, mais un Proxmark face à l'iPhone et un téléphone Android face au terminal, reliés par un ordinateur portable ; la manipulation de l'acte 3 porte sur l'indicateur d'authentification du porteur sur le téléphone, et non sur un marqueur « petite valeur » ou « grande valeur » ; et elle fonctionne pour n'importe quel montant ([page des chercheurs](https://practical_emv.gitlab.io/){target="_blank" rel="noopener"}). Ajouts : le mode Express est activé par défaut ([assistance Apple](https://support.apple.com/fr-fr/105123){target="_blank" rel="noopener"}), et le conseil des chercheurs en cas de perte ou de vol.*

---
_[Jean-Luc Houédanou](https://houedanou.com) — content d'avoir un téléphone Android._
