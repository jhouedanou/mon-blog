---
title: "Installer Windows 11 sans compte Microsoft"
image: "/images/articles/windows11-bypass.webp"
createdAt: "2026-04-14"
updatedAt: "2026-11-08T12:00:00Z"
description: "Installer Windows 11 sans compte Microsoft en 2026 : Rufus, BYPASSNRO, jonction à un domaine… ce qui marche encore selon votre build, et les pièges à éviter."
searchIntent: "Comment installer Windows 11 avec un compte local sans créer de compte Microsoft."
tags: ["tutoriel", "windows", "sysadmin"]
---

Vous venez de formater une machine et Windows 11 vous demande impérativement un compte Microsoft ? Bienvenue chez Microsoft en 2026, où créer un utilisateur local est devenu un parcours du combattant. Installer Windows 11 sans compte Microsoft reste possible en novembre 2026 : la voie la plus sûre est une clé USB préparée avec Rufus, qui crée le compte local d'avance. Les commandes à taper pendant l'installation, elles, marchent ou non selon votre build.

> **Avertissement** : cet article contient des quantités déraisonnables de frustration contre les interfaces cassées, au moins deux commandes cryptiques, et la découverte que « coupure internet » était la moitié de la réponse à votre problème depuis le départ.

---

## Le problème : Microsoft aime les comptes, pas la liberté

Depuis les derniers patches Windows 11, Microsoft a décidé que les comptes locaux, c'était trop 2000. Et c'est écrit noir sur blanc : « Windows 11 Professionnel pour un usage strictement personnel et Windows 11 Famille nécessitent une connexion Internet et un compte Microsoft lors de la configuration initiale de l'appareil » ([fiche technique de Windows 11](https://www.microsoft.com/fr-fr/windows/windows-11-specifications){target="_blank" rel="noopener"}).

Vous essayez les anciennes astuces ?

- Email factice comme `no@thankyou.com` (voir [ce clip explicatif](https://www.youtube.com/clip/Ugkxbe-HidbA7gWD_7QvNu3tKLagXSGvShm4)) ? Rejet.
- Sauter l'étape en fermant le navigateur ? Ne marche plus.
- Laisser le formulaire vide ? Microsoft re-force la saisie.
- Le lien « En savoir plus » de l'écran de connexion, qui ouvrait la création d'un compte local en septembre 2026 ? Bouché en octobre ([PCWorld](https://www.pcworld.com/article/3259577/windows-11s-easy-local-account-trick-is-dead-patched-by-microsoft.html){target="_blank" rel="noopener"}).

C'est pas de la malveillance, c'est juste du business : un utilisateur connecté à un compte Microsoft, c'est un utilisateur tracé, synchro, et dans l'écosystème cloud.

Mais parfois, vous avez juste besoin d'une machine qui fonctionne localement. Une Surface achetée d'occasion, une VM de test, ou un vieux laptop que vous remettez en circulation.

Et là, vous êtes bloqué.

Microsoft n'est pas méchant, il faut juste être honnête : c'est fait pour les entreprises et les utilisateurs qui acceptent de vivre dans le cloud. Pas pour les développeurs africains qui veulent garder leur indépendance informatique.

---

## Installer Windows 11 sans compte Microsoft : les solutions (classées par facilité)

Avant de foncer tête baissée, comprenez un truc : **le timing est CRITIQUE**. Tout dépend de la commande que vous lancez et du moment du setup où vous la lancez.

### Solution 1 : `OOBE\BYPASSNRO` (la vraie solution, si vous êtes à temps)

C'est la méthode officieuse qui marche — du moins au bon moment.

> **Attention, ça dépend de votre build** : Microsoft a retiré le script `bypassnro.cmd` à partir de la build 26200.5516, celle qui préparait Windows 11 25H2 ([Windows Latest](https://windowslatest.com/2025/03/29/windows-11-is-not-killing-off-hack-that-lets-you-bypass-microsoft-account-but-it-takes-more-efforts-now/)). Si la commande n'est pas reconnue, la même invite (`Maj+F10`) accepte encore, sur certaines images, la clé de registre qu'elle créait : `reg add HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\OOBE /v BypassNRO /t REG_DWORD /d 1 /f`, puis `shutdown /r /t 0` pour redémarrer. L'autre raccourci connu, `start ms-cxh:localonly`, a lui aussi été supprimé des builds Insider 26220.6772 ([PCWorld](https://www.pcworld.com/article/2932975/microsoft-kills-two-more-ways-to-install-windows-11-with-local-accounts.html)). Testez avec votre ISO avant de compter dessus.
>
> **Et depuis ?** Microsoft a annoncé en octobre 2025 retirer « les mécanismes connus » de création d'un compte local pendant l'installation, au motif qu'ils sautent des écrans de configuration et laissent un appareil « pas entièrement configuré » ([blog Windows Insider](https://blogs.windows.com/windows-insider/2025/10/06/announcing-windows-11-insider-preview-build-26220-6772-dev-channel/){target="_blank" rel="noopener"}). Les tests divergent : sur les builds Insider d'octobre 2025, Pureinfotech voit encore passer la clé de registre (guide mis à jour en septembre 2026, [Pureinfotech](https://pureinfotech.com/bypass-microsoft-account-setup-windows-11/){target="_blank" rel="noopener"}), Windows Latest non. En octobre 2026, Windows Latest ajoute que la commande, la clé et `ms-cxh:localonly` ne passent plus que sur certaines images publiques plus anciennes ([Windows Latest](https://www.windowslatest.com/2026/10/13/one-click-let-you-escape-microsofts-forced-sign-in-on-windows-11-of-course-microsoft-killed-it/){target="_blank" rel="noopener"}). Sur une ISO récente, ne pariez pas dessus.

**MAIS** : il faut la lancer **avant** de connecter l'ordinateur au réseau. Oui, c'est absurde. Oui, c'est comme ça.

**Étapes** :

1. Vous êtes au premier écran de Windows 11 (celui qui vous demande la langue)
2. Appuyez sur `Maj+F10` pour ouvrir l'invite de commande
3. Tapez : `OOBE\BYPASSNRO`
4. Validez et attendez le redémarrage
5. Au redémarrage, restez hors ligne (WiFi non connecté, câble débranché, ou `ipconfig /release`, voir la solution 2) : Windows propose alors de continuer sans internet et affiche l'écran de création de compte local — pas de compte Microsoft demandé
6. Créez votre utilisateur local et c'est fini

**Le timing** : avant de cliquer sur « Suivant » pour connecter le réseau. Vous comprenez ? À l'écran de langue/région, avant toute connexion internet.

**Si vous avez déjà connecté le PC à internet avant d'essayer** : trop tard pour cette méthode, et couper internet (solution 2) ne suffira pas seul. Il reste la jonction à un domaine sur Pro (solution 5), le compte Microsoft converti en compte local après coup (piège n° 5), ou une nouvelle installation depuis une clé Rufus (solution 4).

---

### Solution 2 : Couper internet à la dernière minute (le hack brutal mais efficace)

Vous êtes déjà arrivé à l'écran de création de compte et Windows refuse les comptes locaux ? Pas de souci.

> **Mise au point** : couper internet ne suffit plus à lui seul. Depuis Windows 11 22H2, Microsoft a supprimé la possibilité de créer un compte local quand l'installation n'a pas de réseau ([FAQ de Rufus](https://github.com/pbatard/rufus/wiki/FAQ){target="_blank" rel="noopener"}), et la fiche technique citée plus haut exige une connexion pour Famille et Professionnel. `ipconfig /release` est donc la deuxième moitié d'une méthode : il fait apparaître l'option hors ligne une fois la clé BypassNRO en place (solution 1), comme dans la procédure de [Pureinfotech](https://pureinfotech.com/bypass-microsoft-account-setup-windows-11/){target="_blank" rel="noopener"}, ou sur une clé Rufus (solution 4).

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

**Pourquoi ça marche (quand ça marche)** : une fois BypassNRO activé, Windows n'impose le compte Microsoft que si internet est dispo. Sans internet, pas de vérification cloud, donc compte local autorisé.

---

### Solution 3 : L'email « créatif » (moins fiable, mais rapide)

Certains utilisateurs rapportent qu'entrer un email avec du style — genre des gros mots ou des caractères bizarres — fait crasher la validation et vous ramène à un écran de création de compte local.

Exemple : `nope.nope.nope@nope.nope` ou `no@thankyou.combattant@nope.com`

**Honnêtement** : c'est aléatoire. Ça a marché pour certains en 2024, mais les builds récentes testées par [Windows Latest](https://www.windowslatest.com/2026/10/13/one-click-let-you-escape-microsofts-forced-sign-in-on-windows-11-of-course-microsoft-killed-it/){target="_blank" rel="noopener"} le bloquent. J'inclus ça pour la forme, mais ne comptez pas dessus.

---

### Solution 4 : RUFUS (le pro move)

Si vous faites une clé USB bootable avec **RUFUS** (le meilleur outil de création de clés USB, point barre), il y a une option qui retire l'obligation du compte Microsoft et vous évite complètement cette étape.

**Comment** :

1. Téléchargez [RUFUS](https://rufus.ie/)
2. Sélectionnez votre ISO de Windows 11 (22H2 ou plus récent) et cliquez sur **Démarrer**
3. Dans la fenêtre « Windows User Experience » qui s'ouvre, cochez « Créer un compte local sous le nom de : » et tapez votre nom d'utilisateur. Cochez aussi « Supprimer la nécessité d'utiliser un compte utilisateur Microsoft en ligne » (libellés de la version française de Rufus)
4. Bootez et installez — pas une seule demande de compte Microsoft

En 2026, c'est la case « Créer un compte local » qui compte. D'après le [code source de Rufus](https://github.com/pbatard/rufus/blob/master/src/wue.c){target="_blank" rel="noopener"}, « Supprimer la nécessité… » se contente d'ajouter la clé BypassNRO, celle que Microsoft neutralise. « Créer un compte local », elle, inscrit le compte dans le fichier de réponses de l'installation, un mécanisme de déploiement [documenté par Microsoft](https://learn.microsoft.com/fr-fr/windows-hardware/customize/desktop/unattend/microsoft-windows-shell-setup-useraccounts-localaccounts){target="_blank" rel="noopener"} : d'après le commentaire du code, Windows saute alors l'étape du compte Microsoft, même avec le réseau branché. Ce commentaire date de la 22H2, mais en octobre 2026, Windows Latest cite toujours Rufus parmi les issues qui restent. Le compte est créé sans mot de passe : Windows vous demandera d'en choisir un à la première connexion.

D'après la [FAQ de Rufus](https://github.com/pbatard/rufus/wiki/FAQ), avec la seule case « Supprimer la nécessité… », le compte local n'est proposé que si le réseau est débranché au moment de l'écran de création de compte. Dans ce cas, débranchez le câble ou ne vous connectez pas au WiFi.

**Avantages** :
- Zéro interaction avec Microsoft
- Compte local créé d'emblée
- La solution la plus propre si vous installez Windows régulièrement
- Pas de bricolage en ligne de commande

**Inconvénients** :
- Faut une clé USB (au moins 8 Go)
- Un peu de préparation en avance

---

### Solution 5 : Windows 11 Pro et la jonction à un domaine

Si vous installez l'édition Professionnel, il reste une porte prévue pour les entreprises. Quand Windows demande comment configurer l'appareil, choisissez la configuration pour le travail ou l'école, puis, dans les options de connexion, la jonction à un domaine (« Domain join instead » en anglais, libellé selon la langue). Windows vous propose alors un compte local ([Pureinfotech](https://pureinfotech.com/bypass-microsoft-account-setup-windows-11/){target="_blank" rel="noopener"}, [Windows Latest](https://www.windowslatest.com/2026/10/13/one-click-let-you-escape-microsofts-forced-sign-in-on-windows-11-of-course-microsoft-killed-it/){target="_blank" rel="noopener"}).

Réservé à Pro : Windows 11 Famille ne sait pas rejoindre un domaine.

---

## Les pièges (parce qu'il y en a toujours)

### 1. **La connexion réseau avant `OOBE\BYPASSNRO`**

Si vous avez déjà cliqué sur le WiFi et vous êtes connecté, la commande `OOBE\BYPASSNRO` **ne marchera plus**.

Windows a déjà « vérifié » en ligne que vous aviez besoin d'un compte Microsoft. La commande arrive trop tard.

**Solution** : couper internet (solution 2) ne suffira pas seul, puisque BypassNRO n'a pas pris. Sur Pro, passez par la jonction à un domaine (solution 5) ; sinon, connectez-vous avec le compte Microsoft et repassez en compte local après coup (piège n° 5), ou recommencez depuis une clé Rufus (solution 4).

### 2. **Le formulaire qui refuse votre email « factice »**

Les validations email se sont renforcées. `no@thankyou.com` ne passe plus. Les variantes non plus ([Windows Latest](https://www.windowslatest.com/2026/10/13/one-click-let-you-escape-microsofts-forced-sign-in-on-windows-11-of-course-microsoft-killed-it/){target="_blank" rel="noopener"}).

Oubliez cette astuce : c'était cool en 2022, plus maintenant.

### 3. **Redémarrage automatique sans vous demander**

Parfois Windows 11 redémarre après l'étape de création de compte, ce qui coupe votre internet : vous vous retrouvez avec une connexion réseau morte.

**C'est normal**. Ouvrez une invite de commande et tapez `ipconfig /renew`. Ou redémarrez proprement.

### 4. **L'invite de commande qui ne s'ouvre pas**

Si `Maj+F10` ne marche pas, essayez `Ctrl+Alt+Delete` → Déconnexion → puis `Maj+F10` à l'écran de login.

Ou ouvrez les options d'accessibilité (`Win+U` si possible) : parfois, ça ouvre un menu qui vous laisse lancer `cmd.exe`.

### 5. **Vous avez créé le compte Microsoft et vous regrettez**

Pas de panique, ce n'est pas définitif. Dans Paramètres → Comptes → Vos informations, l'option « Se connecter plutôt avec un compte local » convertit votre session en compte local en gardant vos fichiers ([marche à suivre détaillée chez Pureinfotech](https://pureinfotech.com/switch-from-microsoft-account-to-local-account-windows-11/)). Vous pouvez aussi créer un nouvel utilisateur local via Paramètres → Comptes → Autres utilisateurs, mais le compte Microsoft restera dans un coin.

**Morale** : les solutions 1 ou 2 doivent être appliquées **avant** d'avoir créé un compte Microsoft. Une fois qu'il existe, c'est plus compliqué de le bypasser.

### 6. **Vous avez un message « Impossible de se connecter au serveur de sécurité »**

Ça veut juste dire qu'il n'y a pas de connexion internet. C'est l'objectif. Si BypassNRO a pris (ou si vous installez depuis une clé Rufus), continuez : Windows va vous proposer un compte local dans 5 secondes.

---

## Tableau récapitulatif (parce que j'aime les tables)

| Solution | Timing | Difficulté | Fiabilité | Stress level |
|----------|--------|-----------|-----------|---|
| `OOBE\BYPASSNRO` | Avant réseau | ⭐ | Selon la build (retiré des récentes) | Zéro si c'est au bon moment |
| Couper internet | À l'écran compte | ⭐⭐ | Seulement avec BypassNRO ou Rufus | Modéré (faut couper internet) |
| Email créatif | N'importe quand | ⭐ | Bloqué sur les builds récentes | Très fort si ça marche pas |
| RUFUS | Avant l'install | ⭐ | La plus sûre (option « compte local ») | Zéro (solution propre) |
| Domaine (Pro) | Pendant le setup | ⭐⭐ | Pro uniquement | Faible, si vous avez Pro |

---

## Le scénario typique (celui que vous vivez probablement)

1. ✅ Vous démarrez Windows 11 sur une Surface achetée d'occasion
2. ✅ Écran de langue — parfait
3. ❌ Vous cliquez sur Suivant sans penser à mal
4. ❌ Windows vous propose le WiFi — vous vous connectez par automatisme
5. ❌ Écran de création de compte Microsoft — oups
6. ❌ Vous cherchez « compte local » dans les menus — rien
7. ❌ Vous essayez `no@thankyou.com` — rejet
8. ❌ Vous tapez `OOBE\BYPASSNRO` à l'invite — ne marche pas (trop tard)
9. 🔴 Vous paniquez

**À ce stade** : oubliez `ipconfig /release` tout seul, il ne marche que si BypassNRO a pris. Sur Pro, passez par la jonction à un domaine (solution 5). Sinon, deux sorties :

- connectez-vous avec le compte Microsoft, puis repassez en compte local après coup (piège n° 5) ;
- ou recommencez l'installation depuis une clé Rufus avec l'option « Créer un compte local » (solution 4).

---

## Pourquoi Microsoft fait ça

Honnêtement ? Parce que :

1. **Données utilisateur** — un compte Microsoft = données synchro = profilage = insights
2. **Contrôle** — les comptes cloud sont plus faciles à surveiller et à verrouiller
3. **Upsell** — Windows 11 Home pousse les comptes Microsoft dur. Très dur.

Ça n'a rien de louche techniquement, c'est juste du business. Microsoft a le droit de favoriser son écosystème.

Mais vous avez aussi le droit de vouloir une machine locale.

---

## Et les alternatives ?

Si Windows 11 vous frustre vraiment (ce qui est compréhensible), sachez qu'[il n'y a pas besoin d'être dev ou barbu pour aimer Mac et Linux](/fr/20261008-pas-besoin-detre-dev-ou-barbu-mac-linux) :

- **Windows 10** : comptes locaux sans tracas. Fin du support en octobre 2025, mais pour une machine de test, ça va. Et c'est gratuit.
- **Linux** (Ubuntu, Fedora, Pop!_OS) : comptes locaux par défaut, gratuit, zéro tracking, plus performant (sur un vieux portable, [Omarchy a ressuscité mon MacBook Pro 2017](/fr/20261013-retournement-de-veste-omarchy-macbook-pro-2017)). Et une fois installé, vous pouvez même [cloner votre Ubuntu sans perdre vos données](/fr/20241029-cloner-ubuntu).
- **macOS** : comptes iCloud optionnels, mais les Mac sont chers et verrouillés.

Mais si vous êtes obligé de passer par Windows 11, ces solutions fonctionnent, Rufus en tête.

---

## Résumé en une phrase

**Préparez votre clé avec Rufus et l'option « Créer un compte local » ; à défaut, avant de vous connecter au WiFi, lancez `OOBE\BYPASSNRO`, puis coupez internet avec `ipconfig /release` et relancez la création de compte.**

Un `ipconfig`, et Windows se rend à la raison.

C'est pas élégant, c'est pas ce qu'on attendait en 2026. Mais ça marche.

Et pour quelqu'un qui vient de recevoir une Surface refurbisée, une vieille machine de test, ou une VM qui refuse de collaborer, c'est inestimable.

---

## Pour aller plus loin

- **RUFUS** : [https://rufus.ie/](https://rufus.ie/) — le meilleur outil de création de clés USB
- **Création de compte local après coup** : Paramètres → Comptes → Autres utilisateurs
- **Supprimer un compte Microsoft** : Paramètres → Comptes → Vos infos → Gérer votre compte Microsoft

*Mise à jour du 8 octobre 2026 : Microsoft a retiré `bypassnro.cmd` des builds récentes de Windows 11 ([Windows Latest](https://windowslatest.com/2025/03/29/windows-11-is-not-killing-off-hack-that-lets-you-bypass-microsoft-account-but-it-takes-more-efforts-now/)) puis `start ms-cxh:localonly` des builds Insider ([PCWorld](https://www.pcworld.com/article/2932975/microsoft-kills-two-more-ways-to-install-windows-11-with-local-accounts.html)) : ajout de la clé de registre de secours, correction de la procédure RUFUS d'après sa [FAQ](https://github.com/pbatard/rufus/wiki/FAQ), et du piège n° 5 (on peut repasser en compte local après coup).*

*Mise à jour du 8 novembre 2026 : Microsoft a annoncé retirer « les mécanismes connus » de création d'un compte local pendant l'installation ([blog Windows Insider](https://blogs.windows.com/windows-insider/2025/10/06/announcing-windows-11-insider-preview-build-26220-6772-dev-channel/){target="_blank" rel="noopener"}), et le lien « En savoir plus » a été bouché en octobre 2026 ([PCWorld](https://www.pcworld.com/article/3259577/windows-11s-easy-local-account-trick-is-dead-patched-by-microsoft.html){target="_blank" rel="noopener"}) : ajout de l'état des commandes selon les builds ([Windows Latest](https://www.windowslatest.com/2026/10/13/one-click-let-you-escape-microsofts-forced-sign-in-on-windows-11-of-course-microsoft-killed-it/){target="_blank" rel="noopener"}, [Pureinfotech](https://pureinfotech.com/bypass-microsoft-account-setup-windows-11/){target="_blank" rel="noopener"}), de l'option « Créer un compte local » de Rufus, la plus sûre aujourd'hui ([code source de Rufus](https://github.com/pbatard/rufus/blob/master/src/wue.c){target="_blank" rel="noopener"}), et de la jonction à un domaine sur Windows 11 Pro. Précision : couper internet ne suffit plus à lui seul depuis Windows 11 22H2 ([FAQ de Rufus](https://github.com/pbatard/rufus/wiki/FAQ){target="_blank" rel="noopener"}), et l'email factice est bloqué.*

---
*[Jean-Luc Houédanou](https://houedanou.com) — Microsoft n'aime pas cet article*
