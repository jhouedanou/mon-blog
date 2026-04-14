---
title: "Windows 11 : Installez le sans compte Microsoft (et sans perdre vos cheveux)"
image: "/images/articles/windows11-bypass.jpg"
createdAt: "2026-04-14"
description: "Vous venez de formater Windows 11 et Microsoft refuse un compte local ? Guide complet avec 4 solutions qui marchent vraiment — et explications des pièges. Pour ceux qui aiment leur liberté informatique."
keywords: "Windows 11, compte local, Microsoft, OOBE BYPASSNRO, configuration système, installation Windows, compte utilisateur"
tags: ["tutoriel", "windows", "sysadmin"]
---

# Windows 11 : Installez le sans compte Microsoft (et sans perdre vos cheveux)

Vous venez de formater une machine et Windows 11 vous demande impérativement un compte Microsoft ? Bienvenue dans le monde Microsoft 2026, où créer un utilisateur local est devenu un parcours du combattant.

> **Avertissement** : cet article contient des quantités déraisonnables de frustration contre les interfaces cassées, au moins deux commandes cryptiques, et la découverte que « coupure internet » était la réponse à votre problème depuis le départ.

---

## Le problème : Microsoft aime les comptes, pas la liberté

Depuis les derniers patches Windows 11, Microsoft a décidé que les comptes locaux, c'était trop 2000.

Vous essayez les anciennes astuces ?

- Email factice comme `no@thankyou.com` (Voir ce clip explicatif : https://www.youtube.com/clip/Ugkxbe-HidbA7gWD_7QvNu3tKLagXSGvShm4 ) ? Rejet.
- Sauter l'étape en fermant le navigateur  ? Ne marche plus.
- Laisser le formulaire vide ? Microsoft re-force la saisie.

C'est pas de la malveillance, c'est juste du business : un utilisateur connecté à un compte Microsoft, c'est un utilisateur tracé, synchro, et dans l'écosystème cloud.

Mais parfois, vous avez juste besoin d'une machine qui fonctionne localement. Une Surface achetée d'occasion, une VM de test, ou un vieux laptop que vous remettez en circulation.

Et là, vous êtes bloqué.

Microsoft n'est pas méchant, il faut juste être honnête : c'est fait pour les entreprises et les utilisateurs qui acceptent de vivre dans le cloud. Pas pour les développeurs africains qui veulent garder leur indépendance informatique.

---

## Les solutions (classées par facilité)

Avant de foncer tête baissée, comprenez un truc : **le timing est CRITIQUE**. Quand vous lancez quelle commande, à quel moment du setup — ça change tout.

### Solution 1 : `OOBE\BYPASSNRO` (la vraie solution, si vous êtes à temps)

C'est la méthode officieuse qui marche — du moins au bon moment.

**MAIS** : il faut la lancer **avant** de connecter l'ordinateur au réseau. Oui, c'est absurde. Oui, c'est comme ça.

**Étapes** :

1. Vous êtes au premier écran de Windows 11 (celui qui vous demande la langue)
2. Appuyez sur `Maj+F10` pour ouvrir l'invite de commande
3. Tapez : `OOBE\BYPASSNRO`
4. Validez et attendez le redémarrage
5. L'écran de création de compte local s'affiche — pas de compte Microsoft demandé
6. Créez votre utilisateur local et c'est fini

**Le timing** : avant de cliquer sur « Suivant » pour connecter le réseau. Vous comprenez ? À l'écran de langue/région, avant tout connexion internet.

**Si vous avez déjà connecté le PC à internet avant d'essayer** : trop tard, passez à la solution 2.

---

### Solution 2 : Couper internet à la dernière minute (le hack brutal mais efficace)

Vous êtes déjà arrivé à l'écran de création de compte et Windows refuse les comptes locaux ? Pas de souci.

L'astuce : **forcer la déconnexion réseau** va faire paniquer Windows. Il se dit « bon, pas d'internet, je suppose que tu veux un compte local alors ».

**Étapes** :

1. Vous êtes à l'écran de création de compte Microsoft
2. Appuyez sur `Maj+F10` pour ouvrir l'invite de commande
3. Tapez : `ipconfig /release`
4. Attendez que la commande finisse (quelques secondes)
5. Fermez l'invite de commande
6. Cliquez sur la flèche gauche pour **revenir en arrière**
7. Cliquez sur **Suivant**
8. Windows détecte l'absence de connexion réseau et propose un compte local
9. Créez votre utilisateur

**Après la configuration** : Ouvrez une invite de commande (`Win+R` → `cmd`) et tapez `ipconfig /renew` pour récupérer votre connexion internet. Ou redémarrez simplement — les deux fonctionnent.

**Pourquoi ça marche** : Windows bloque les comptes locaux seulement si internet est dispo. Sans internet, pas de vérification cloud, donc compte local autorisé.

---

### Solution 3 : L'email « créatif » (moins fiable, mais rapide)

Certains utilisateurs rapportent qu'entrer un email avec du style — genre des gros mots ou des caractères bizarres — fait crasher la validation et vous ramène à un écran de création de compte local.

Exemple : `nope.nope.nope@nope.nope` ou `no@thankyou.combattant@nope.com`

**Honnêtement** : c'est aléatoire. Ça a marché pour certains en 2024, mais les derniers patches l'ont peut-être patché. J'inclus ça pour la forme, mais ne comptez pas dessus.

---

### Solution 4 : RUFUS (le pro move)

Si vous faites une clé USB bootable avec **RUFUS** (le meilleur outil de création de clés USB, point barre), il y a une option « Skip Windows Account » qui vous évite complètement cette étape.

**Comment** :

1. Téléchargez [RUFUS](https://rufus.ie/)
2. Créez une clé USB bootable Windows 11
3. Dans les options avancées, cochez « Start menu » et « Skip Windows Account » (ou similaire, selon votre version)
4. Bootez et installez — pas une seule demande de compte Microsoft

**Avantages** :
- Zéro interaction avec Microsoft
- Compte local créé d'emblée
- La solution la plus propre si vous installez Windows régulièrement
- Pas de bricolage en ligne de commande

**Inconvénients** :
- Faut une clé USB (au moins 8 Go)
- Un peu de préparation en avance

---

## Les pièges (parce qu'il y en a toujours)

### 1. **La connexion réseau avant `OOBE\BYPASSNRO`**

Si vous avez déjà cliqué sur le WiFi et vous êtes connecté, la commande `OOBE\BYPASSNRO` **ne marchera plus**.

Windows a déjà « vérifié » en ligne que vous aviez besoin d'un compte Microsoft. La commande est trop tard.

**Solution** : Solution 2 (couper internet).

### 2. **Le formulaire qui refuse votre email "factice"**

Les validations email se sont renforcées. `no@thankyou.com` ne passe plus. Les variantes non plus.

**Verdict** : oubliez cette astuce. C'était cool en 2022, plus maintenant.

### 3. **Redémarrage automatique sans vous demander**

Parfois Windows 11 redémarre après l'étape de création de compte, ce qui coupe votre internet et vous retrouve avec une connexion réseau morte.

**C'est normal**. Ouvrez une invite de commande et tapez `ipconfig /renew`. Ou redémarrez proprement.

### 4. **L'invite de commande qui ne s'ouvre pas**

Si `Maj+F10` ne marche pas, essayez `Ctrl+Alt+Delete` → Déconnexion → puis `Maj+F10` à l'écran de login.

Ou créez une demande d'accessibilité (`Win+U` si possible) — parfois ça ouvre un menu qui vous laisse lancer `cmd.exe`.

### 5. **Vous avez créé le compte Microsoft et vous regrettez**

Trop tard. Vous devez utiliser ce compte maintenant. Créer un nouvel utilisateur local après coup ? Oui, c'est possible via Paramètres → Comptes → Créer un compte local, mais vous aurez toujours le compte Microsoft qui traîne.

**Morale** : les solutions 1 ou 2 doivent être appliquées **avant** d'avoir créé un compte Microsoft. Une fois qu'il existe, c'est plus compliqué de le bypasser.

### 6. **Vous avez un message "Impossible de se connecter au serveur de sécurité"**

Ça veut juste dire qu'il n'y a pas de connexion internet. C'est l'objectif. Continue, Windows va t'offrir un compte local dans 5 secondes.

---

## Tableau récapitulatif (parce que j'aime les tables)

| Solution | Timing | Difficulté | Fiabilité | Stress level |
|----------|--------|-----------|-----------|---|
| `OOBE\BYPASSNRO` | Avant réseau | ⭐ | 100% | Zéro si c'est au bon moment |
| Couper internet | À l'écran compte | ⭐⭐ | 95% | Modéré (faut couper internet) |
| Email créatif | N'importe quand | ⭐ | 30% | Très fort si ça marche pas |
| RUFUS | Avant l'install | ⭐ | 100% | Zéro (solution propre) |

---

## Le scénario typique (celui que vous vivez probablement)

1. ✅ Vous démarrez Windows 11 sur une surface achetée d'occasion
2. ✅ Écran de langue — parfait
3. ❌ Vous cliquez sur Suivant sans penser à mal
4. ❌ Windows vous propose le WiFi — vous vous connectez par automatisme
5. ❌ Écran de création de compte Microsoft — oups
6. ❌ Vous cherchez « compte local » dans les menus — rien
7. ❌ Vous essayez `no@thankyou.com` — rejet
8. ❌ Vous tapez `OOBE\BYPASSNRO` à l'invite — ne marche pas (trop tard)
9. 🔴 Vous paniquez

**À ce stade** : utilisez la Solution 2 (couper internet). C'est votre salut.

Appuyez sur `Maj+F10`, tapez `ipconfig /release`, attendez, puis retournez à l'écran précédent. Windows se résignera et vous proposera un compte local.

---

## Pourquoi Microsoft fait ça

Honnêtement ? Parce que :

1. **Données utilisateur** — un compte Microsoft = données synchro = profilage = insights
2. **Contrôle** — les comptes cloud sont plus faciles à surveiller et à verrouiller
3. **Upsell** — Windows 11 Home pousse les comptes Microsoft dur. Très dur.

Ça n'a rien de louche techniquement, c'est juste du business. Microsoft a le droit de favoriser son écosystème.

Mais vous avez aussi le droit de vouloir une machine locale. Les deux peuvent coexister.

---

## Et les alternatives ?

Si Windows 11 vous frustre vraiment (ce qui est compréhensible) :

- **Windows 10** : comptes locaux sans tracas. Fin du support en octobre 2025, mais pour une machine de test, ça va. Et c'est gratuit.
- **Linux** (Ubuntu, Fedora, Pop!_OS) : comptes locaux par défaut, gratuit, zéro tracking, plus performant.
- **macOS** : comptes iCloud optionnels, mais les macs chers et verrouillés.

Mais si vous êtes obligé de Windows 11, ces solutions fonctionnent.

Et franchement ? Pour quelqu'un qui vient de recevoir une Surface refurbisée et qui veut juste créer un compte pour l'utiliser ? C'est inestimable.

---

## Résumé en une phrase

**Si vous n'êtes pas encore connecté au WiFi : lancez `OOBE\BYPASSNRO` tout de suite. Si c'est trop tard : coupez internet avec `ipconfig /release` et relancez la création de compte.**

Un `ipconfig`. Une ligne de commande. Et soudain, Windows se rend à la raison.

C'est pas beau, c'est pas élégant, c'est pas ce qu'on attendait en 2026. Mais ça marche.

Et pour quelqu'un qui vient de recevoir une Surface refurbisée, une vieille machine de test, ou une VM qui refuse de collaborer, c'est inestimable.

---

## Pour aller plus loin

- **RUFUS** : [https://rufus.ie/](https://rufus.ie/) — le meilleur outil de création de clés USB
- **Création de compte local après coup** : Paramètres → Comptes → Autres utilisateurs
- **Supprimer un compte Microsoft** : Paramètres → Comptes → Vos infos → Gérer votre compte Microsoft

---

*[Jean Houédanou](https://houedanou.com) —  Microsoft n'aime pas cet article*
