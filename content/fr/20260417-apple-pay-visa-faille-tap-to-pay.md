---
title: "Comment des chercheurs ont volé 10 000 $ via un iPhone verrouillé — la faille Apple Pay / Visa expliquée"
image: "/images/articles/apple-pay-visa-hack.jpg"
createdAt: "2026-04-17"
description: "Des chercheurs ont démontré qu'il est possible de débiter une somme importante depuis un iPhone verrouillé en exploitant le mode Express Transit d'Apple Pay combiné aux protocoles Visa. Voici comment, et comment se protéger."
keywords: "Apple Pay, Visa, sécurité, NFC, Express Transit, faille, iPhone, Tap to Pay, paiement sans contact, man-in-the-middle"
tags: ["sécurité", "Apple Pay", "Visa", "NFC", "iPhone", "faille de sécurité"]
---
# Comment des chercheurs ont volé 10 000 $ via un iPhone verrouillé — la faille Apple Pay / Visa expliquéeS

Il y a des histoires de sécurité qui ressemblent à de la science-fiction. Celle-ci s'est passée dans un laboratoire universitaire, documentée, publiée — et elle concerne très probablement le téléphone qui est dans votre poche en ce moment.

Des chercheurs de l'université de Birmingham et de Surrey ont démontré qu'il est possible de **débiter plusieurs milliers d'dollars depuis un iPhone verrouillé**, sans aucune interaction de sa part, en exploitant une combinaison de failles dans Apple Pay et les protocoles de transaction Visa.

Regarder la démonstration complète (anglais)
:youtube{video="PPJ6NJkmDAo" title="VISA"}

---

## Le mode Express Transit : pratique, mais dangereux

Pour comprendre l'attaque, il faut d'abord comprendre le mode **Express Transit** d'Apple Pay.

Ce mode a été conçu pour les transports en commun : vous passez votre iPhone verrouillé devant un tourniquet de métro, le paiement se fait instantanément, sans Face ID ni code PIN. L'idée est bonne — on ne va pas demander à quelqu'un de déverrouiller son téléphone à chaque passage de porte.

Le problème ? Ce mode désactive volontairement les protections habituelles. Et n'importe quel terminal NFC peut, en émettant le bon signal, *faire croire à l'iPhone qu'il est en face d'un tourniquet de métro*.

---

## L'attaque en trois actes

### Acte 1 — L'interception (Man-in-the-Middle NFC)

Les chercheurs utilisent deux appareils NFC (des Proxmark, disponibles dans le commerce) : un qui se fait passer pour un terminal de paiement auprès du téléphone, et un autre qui se fait passer pour un iPhone auprès d'un vrai terminal.

Les deux appareils sont reliés via une connexion WiFi ou filaire. Résultat : le téléphone et le terminal pensent communiquer directement entre eux, alors que tout passe par les chercheurs, qui peuvent lire et **modifier** les données en transit.

### Acte 2 — Tromper l'iPhone

En envoyant un signal qui imite celui d'un terminal de transport en commun, le téléphone bascule automatiquement en **mode Express Transit**. Le verrou disparaît. Apple Pay est prêt à payer.

L'iPhone croit qu'il valide un trajet à 2 $.

### Acte 3 — Tromper le terminal

C'est là que ça devient technique. Les chercheurs **manipulent quelques bits** dans les données de la transaction : ils modifient le marqueur qui indique au terminal si la transaction est "petite valeur" (transit) ou "grande valeur" (retail). Le terminal lit donc un achat de détail — disons 10 000 $ — et l'approuve comme s'il avait reçu toutes les vérifications nécessaires.

Le téléphone a dit oui parce qu'il croyait payer un bus.  
Le terminal a dit oui parce qu'il croyait que l'utilisateur avait validé.

Personne n'a rien remarqué. L'argent part.

---

## Pourquoi Visa et pas Mastercard ?

C'est la question clé, et la réponse est dans les choix d'architecture.

**Mastercard** impose une **cryptographie asymétrique** (signatures numériques) sur ses transactions en ligne. Concrètement, les données signées cryptographiquement ne peuvent pas être modifiées en transit sans que la falsification soit détectée. Si vous changez un bit, la signature devient invalide, la transaction est rejetée.

**Visa**, en revanche, **ne mandate pas cette couche pour les transactions retail en ligne**. Les données circulent, mais elles ne sont pas "scellées" de bout en bout de la même façon. C'est cette absence qui permet la manipulation de bits décrite plus haut.

Ce n'est pas un bug dans le code de Visa. C'est un **choix architectural** qui sacrifie une couche de sécurité au profit de la simplicité et de la compatibilité.

---

## Pourquoi les téléphones Android ne sont pas touchés ?

La faille côté iPhone vient d'un comportement spécifique : l'iPhone fait confiance à l'étiquette "petite valeur transit" que lui envoie le terminal, **sans vérifier le montant numérique réel**.

Les téléphones Samsung (et Android en général), eux, **vérifient le montant de la transaction** indépendamment. Si un terminal dit "transit" mais que le montant est 10 000 $, le téléphone rejette la transaction.

Apple a fait un choix différent, probablement pour des raisons de compatibilité avec des systèmes de transport hétérogènes. Ce choix s'est révélé être le maillon faible.

---

## La position de Visa et d'Apple

Visa a répondu que ce type de fraude est **difficile à mettre à l'échelle dans le monde réel** — il faut être physiquement proche de la victime, avoir du matériel spécialisé, et coordonner l'attaque en temps réel. La banque rappelle également sa politique de **responsabilité zéro** : si vous êtes victime d'une fraude de ce type, vous êtes remboursé.

Apple n'a pas commenté directement cette recherche.

Les chercheurs, de leur côté, maintiennent que la faille est réelle et exploitable, même si elle n'est pas triviale à industrialiser.

---

## Comment se protéger concrètement ?

Deux options simples :

1. **Désactiver le mode Express Transit** dans Réglages → Wallet & Apple Pay → Transit Card → désactiver "Express Transit Card".
2. **Ne pas associer une carte Visa au slot Express Transit**. Utilisez une carte Mastercard à la place, ou une carte de transport dédiée.

Si vous vivez dans une ville où vous utilisez vraiment les transports en commun avec votre téléphone tous les jours, l'option 2 est probablement le meilleur compromis. Vous gardez la commodité, vous retirez Visa de l'équation.

---

## Ce que ça dit de notre rapport à la sécurité

Ce qui me frappe dans cette histoire, ce n'est pas la sophistication de l'attaque. C'est la **tension permanente entre commodité et sécurité** que les constructeurs et les réseaux de paiement naviguent constamment.

Express Transit *est* pratique. Le fait que Visa soit accepté partout *est* une qualité. Ce sont ces mêmes avantages qui créent les conditions de la vulnérabilité.

La bonne nouvelle, c'est que la solution est à portée de main dans vos réglages. La mauvaise, c'est que la plupart des utilisateurs ne savent pas que cette surface d'attaque existe.

Maintenant vsus savez.

---

*[Jean Luc Houédanou](https://houedanou.com) — content d'avoir un téléphone android.*