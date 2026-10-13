---
title: "Retournement de veste : Omarchy a ressuscité mon MacBook Pro 2017"
createdAt: "2026-10-13T18:00:00Z"
image: "/images/articles/pingui.webp"
description: "J'avais juré de ne pas toucher à Omarchy, le Linux de DHH. Samedi, je l'installais sur mon MacBook Pro 2017. Ce qui marche, ce qui coince, et ma conscience."
searchIntent: "Comment se passe Omarchy (Arch Linux + Hyprland) au quotidien sur un MacBook Pro Intel de 2017 : performances, son, Bluetooth, écrans externes, et que penser de son créateur DHH ?"
tags: ["linux", "omarchy", "hyprland", "apple", "open-source", "opinion"]
---

Je vais commencer par le plus difficile : j'ai retourné ma veste.

Jeudi 8 octobre, j'ai publié un billet pour dire que je ne toucherais pas à Omarchy, la distribution Linux de DHH, à cause de ce qu'il écrit sur l'immigration. Samedi 10, j'ai retiré le billet. Et le même jour, j'ai installé Omarchy sur mon vieux MacBook Pro.

Il faut parfois savoir reconnaître ses torts. Et reconnaître quand on a cédé à la peur. La peur de cautionner, en l'occurrence. J'avais mélangé deux questions : ce que vaut l'outil, et ce que je pense de son auteur. Et j'avais tranché la première sans jamais l'avoir essayé.

Alors je l'ai essayé. Voilà ce que donnent trois jours d'Omarchy sur un MacBook Pro de 2017.

## Omarchy, c'est quoi ?

Omarchy est une distribution basée sur Arch Linux, avec Hyprland comme bureau. Pas de fenêtres qu'on traîne à la souris : elles se rangent toutes seules en mosaïque, et on les pilote au clavier. Tout est installé et réglé d'avance, des raccourcis aux thèmes. La version actuelle est la 4.0.4, sortie le 15 septembre ([GitHub](https://github.com/omacom/omarchy/releases){target="_blank" rel="noopener"}).

Bonne surprise pour les vieux Mac : le manuel annonce une prise en charge intégrée des Mac Intel. L'installeur ajoute tout seul les pilotes Wi-Fi Broadcom et le pilote du clavier des MacBook Pro 2016 et 2017 ([manuel d'Omarchy](https://github.com/omacom/omarchy/blob/v4.0.4/manual/44-mac-support.md){target="_blank" rel="noopener"}). Quand on se souvient de mon [Wi-Fi aux abonnés absents sous Zorin OS](/fr/20261008-pas-besoin-detre-dev-ou-barbu-mac-linux), ça fait plaisir à lire.

Attention quand même : Omarchy efface tout le disque. Ce n'est pas un système qu'on installe à côté de macOS sur un Mac.

## Ce qui marche

### Le MacBook respire

C'est la première chose qu'on remarque. Le MacBook est plus réactif. Le manuel d'Omarchy, lui, annonce 36 % de performances en plus sur un MacBook Pro de 2019, rien qu'en installant le système ([manuel d'Omarchy](https://github.com/omacom/omarchy/blob/v4.0.4/manual/44-mac-support.md){target="_blank" rel="noopener"}). Et surtout, chez moi, le ventilateur s'est calmé.

Sous macOS, il suffisait d'ouvrir Chrome pour que le MacBook se prenne pour un sèche-cheveux. Maintenant, le ventilateur ne se lance que quand je fais tourner un gros projet sur Docker ou sur [Lerd](https://lerd.sh){target="_blank" rel="noopener"}, l'équivalent de Laravel Herd pour Linux. Autrement dit, quand il a une vraie raison de souffler.

Je pense même avoir gagné en autonomie. Je n'ai pas fait de mesure, donc je ne vous donnerai pas de chiffre. C'est une impression, mais elle est tenace.

### Hyprland : deux jours pour prendre ses marques

Hyprland, c'est une autre façon de s'organiser. Le premier jour, on cherche ses fenêtres. Chaque nouvelle application vient se caser à côté des autres et redécoupe l'écran, et on se demande ce qu'on fait là.

Au bout de deux jours, on prend ses marques. Une application par espace de travail, tout au clavier, plus de fenêtre perdue derrière une autre. `Super + Espace` ouvre le menu d'Omarchy, et à partir de là, on trouve tout.

### Configurable à volonté

Tout se configure. Absolument tout. Les thèmes changent d'un coup le terminal, le navigateur, la barre, les notifications et l'écran de verrouillage. Omarchy en fournit 22, et on peut créer les siens dans `~/.config/omarchy/themes/` ([manuel d'Omarchy](https://github.com/omacom/omarchy/blob/v4.0.4/manual/06-themes.md){target="_blank" rel="noopener"}).

Évidemment, je n'ai pas résisté. Avec Claude, j'ai monté mon thème Matrix, jusqu'à l'écran de démarrage : la pluie de caractères verts tombe pendant que je tape le mot de passe qui déchiffre le disque. Le thème Plymouth est en ligne, gratuit et sous licence MIT : [omarchy-matrix-plymouth](https://github.com/jhouedanou/omarchy-matrix-plymouth){target="_blank" rel="noopener"}. Il reprend les couleurs du thème Omarchy actif, donc il ne reste pas forcément vert.

### Le son, réglé avec le bon pilote

Premier pépin : pas de son. Les haut-parleurs restaient muets, alors que le système affichait une sortie audio tout à fait normale.

C'est un problème connu des MacBook Pro 2016 et 2017. Leur puce audio Cirrus Logic n'est pas gérée correctement par le pilote livré avec Linux ([Arch Wiki](https://wiki.archlinux.org/title/Laptop/Apple){target="_blank" rel="noopener"}). La solution, c'est un pilote communautaire, [snd_hda_macbookpro](https://github.com/davidjo/snd_hda_macbookpro){target="_blank" rel="noopener"}. Je l'ai installé, et le son est revenu. Sur Arch, il existe aussi en paquet AUR :

```bash
yay -S snd-hda-macbookpro-dkms-git
```

Omarchy ne l'installe pas encore tout seul. Le sujet est ouvert sur GitHub depuis le 13 septembre ([issue #11619](https://github.com/omacom/omarchy/issues/11619){target="_blank" rel="noopener"}).

### Claude, le technicien de garde

C'est peut-être le vrai changement par rapport à mes premières années sous Linux. Avant, un bug matériel, c'était une soirée sur des forums, à lire des réponses de 2014 qui ne correspondaient jamais tout à fait à ma machine.

Maintenant, les IA sont dans le terminal. Omarchy les intègre d'office : Claude Code, Codex, Gemini et une dizaine d'autres sont prêts à l'emploi, et un raccourci lance l'agent par défaut ([manuel d'Omarchy](https://github.com/omacom/omarchy/blob/v4.0.4/manual/17-ai.md){target="_blank" rel="noopener"}). Moi, c'est Claude. Je décris le problème, je colle le message d'erreur, et on cherche ensemble : quel pilote est chargé, lequel devrait l'être, quelle ligne changer. L'IA ne remplace pas la documentation, mais elle sait où chercher, et elle le fait en quelques secondes. Pour un MacBook que son fabricant a abandonné, c'est un service après-vente inespéré.

## Ce qui coince

### La Magic Mouse et le Bluetooth

La Magic Mouse fonctionne. Mais elle ne se reconnecte pas toute seule. Comme les autres appareils Bluetooth, d'ailleurs. Au démarrage, ou après la mise en veille, il faut aller la rechercher à la main.

Je n'ai pas encore réglé le problème, mais j'ai mes pistes, et je vous les donne. D'abord, une souris sans code PIN doit être déclarée « de confiance », sinon elle risque de ne pas se reconnecter d'elle-même ([Arch Wiki](https://wiki.archlinux.org/title/Bluetooth){target="_blank" rel="noopener"}). Remplacez l'adresse par celle de votre souris :

```bash
bluetoothctl trust AA:BB:CC:DD:EE:FF
bluetoothctl info AA:BB:CC:DD:EE:FF
```

La deuxième commande doit afficher `Paired`, `Bonded` et `Trusted` à `yes`.

Ensuite, vérifier que le Bluetooth s'allume au démarrage, surtout si votre Omarchy date d'avant la version 4. Les anciennes versions écrivaient `AutoEnable=false` dans `/etc/bluetooth/main.conf`. La version 4.0 a corrigé le tir : de l'aveu même du commentaire laissé dans le code, ce réglage ne faisait que garder le Bluetooth éteint à chaque démarrage ([migration d'Omarchy](https://github.com/omacom/omarchy/blob/v4.0.4/migrations/1786380259.sh){target="_blank" rel="noopener"}). Si la ligne est toujours là chez vous, il faut la commenter. On peut aussi y ajouter `FastConnectable = true`, dans la section `[General]`, pour accélérer les connexions, au prix d'un peu de batterie ([BlueZ](https://github.com/bluez/bluez/blob/master/src/main.conf){target="_blank" rel="noopener"}).

Je teste tout ça, et je vous dirai ce qui a marché.

### Les écrans externes

Brancher un écran externe, ça marche. Choisir sa résolution et sa position par rapport à l'écran du MacBook, c'est une autre histoire. Par défaut, il faut écrire des lignes dans un fichier de configuration, `~/.config/hypr/monitors.lua`. Pour quelqu'un qui a l'habitude de glisser des rectangles dans les Réglages de macOS, c'est rude.

Il faut donc ajouter un outil. Le manuel d'Omarchy n'en cite qu'un : [Hyprmon](https://github.com/erans/hyprmon){target="_blank" rel="noopener"}, qui affiche les écrans dans le terminal sous forme de plan qu'on réorganise. Il gère des profils (maison, bureau) et revient en arrière si le réglage tourne mal ([manuel d'Omarchy](https://github.com/omacom/omarchy/blob/v4.0.4/manual/33-monitors.md){target="_blank" rel="noopener"}). Attention au piège : dans l'AUR, le bon paquet s'appelle `hyprmon-bin`. Le paquet `hyprmon` tout court est un autre projet.

```bash
yay -S hyprmon-bin
```

C'est celui que je vais essayer. Quand on [ne travaille jamais sur un seul écran](/fr/20260810-double-moniteur-portable-blackview-dcm6), ce n'est pas un luxe.

### Ma conscience

Et puis il y a le problème qu'aucun pilote ne règle.

Je n'ai pas changé d'avis sur ce qu'écrit DHH. Ses billets sur l'immigration sont toujours en ligne, et ils me posent toujours le même problème. Quand je lance Omarchy, je sais qui l'a créé. Ce malaise-là, je ne vais pas faire comme s'il avait disparu.

Ce qui a changé, c'est ce que je fais de ce malaise. Omarchy est un logiciel libre, sous licence MIT, auquel [plus de 400 personnes ont contribué](https://github.com/omacom/omarchy/graphs/contributors){target="_blank" rel="noopener"} sur GitHub. Le code est ouvert, et je peux en faire ce que je veux. C'est même ce que j'ai fait : mes raccourcis, mon thème, mon écran de démarrage. Omarchy se présente comme une distribution *opinionated*, livrée avec les choix techniques de son créateur. Ces choix-là, rien n'oblige à les garder. Les dotfiles, ça se réécrit.

Et oui, en écrivant ce billet, je fais aussi un peu de publicité à Omarchy. Je le sais.

Est-ce que ça suffit ? Je ne sais pas. Je préfère vous dire que je n'ai pas la réponse plutôt que de faire comme si la question n'existait pas.

## Le MacBook de 2017 est redevenu mon ordinateur principal

Voilà la conclusion à laquelle je ne m'attendais pas. Depuis samedi, j'utilise mon MacBook Pro de 2017 tous les jours. Plus que le MacBook M1, même.

Le M1, lui, me semble plus lent depuis que j'ai installé macOS 27 « Golden Gate », comme je le racontais dans mon [billet sur Mac et Linux](/fr/20261008-pas-besoin-detre-dev-ou-barbu-mac-linux). Pendant ce temps, la machine qu'Apple a lâchée après macOS Ventura ouvre Chrome sans souffler, change de thème en une seconde et affiche la pluie de *Matrix* au démarrage. On peut garder une vieille machine en vie sans demander la permission à personne. C'est déjà ce que je faisais avec mon [vieil iMac recyclé en écran secondaire](/fr/20260929-sharp-vieil-imac-ecran-secondaire-ethernet).

Reste le grand test : l'imprimante. Elle me regarde. Je la regarde. Je n'ai pas encore eu le temps de m'y frotter.

Sur le papier, Omarchy est prêt : le service d'impression CUPS est installé et activé, et on ajoute une imprimante en cherchant « Print Settings » dans le menu ([FAQ d'Omarchy](https://github.com/omacom/omarchy/blob/v4.0.4/manual/46-faq.md){target="_blank" rel="noopener"}). Petit bémol : depuis la version 4.0.2, la détection automatique des imprimantes réseau est désactivée « temporairement » ([notes de version](https://github.com/omacom/omarchy/releases/tag/v4.0.2){target="_blank" rel="noopener"}). Il faudra peut-être lui donner l'adresse à la main.

Si elle imprime, je vous le dirai. Si elle ne veut rien savoir, je vous le dirai aussi. On a déjà vu que je savais reconnaître mes torts.

## Sources

- Omarchy, [notes de version](https://github.com/omacom/omarchy/releases){target="_blank" rel="noopener"}, dont la [4.0.0](https://github.com/omacom/omarchy/releases/tag/v4.0.0){target="_blank" rel="noopener"} et la [4.0.2](https://github.com/omacom/omarchy/releases/tag/v4.0.2){target="_blank" rel="noopener"}
- Manuel d'Omarchy 4.0.4 : [IA](https://github.com/omacom/omarchy/blob/v4.0.4/manual/17-ai.md){target="_blank" rel="noopener"}, [prise en charge des Mac](https://github.com/omacom/omarchy/blob/v4.0.4/manual/44-mac-support.md){target="_blank" rel="noopener"}, [thèmes](https://github.com/omacom/omarchy/blob/v4.0.4/manual/06-themes.md){target="_blank" rel="noopener"}, [écrans](https://github.com/omacom/omarchy/blob/v4.0.4/manual/33-monitors.md){target="_blank" rel="noopener"} et [FAQ](https://github.com/omacom/omarchy/blob/v4.0.4/manual/46-faq.md){target="_blank" rel="noopener"}
- GitHub, [Omarchy, issue #11619 : le son des MacBook Pro Intel](https://github.com/omacom/omarchy/issues/11619){target="_blank" rel="noopener"}
- GitHub, [snd_hda_macbookpro](https://github.com/davidjo/snd_hda_macbookpro){target="_blank" rel="noopener"}, pilote audio Cirrus Logic pour MacBook Pro
- Arch Wiki, [Laptop/Apple](https://wiki.archlinux.org/title/Laptop/Apple){target="_blank" rel="noopener"} et [Bluetooth](https://wiki.archlinux.org/title/Bluetooth){target="_blank" rel="noopener"}
- BlueZ, [fichier de configuration main.conf](https://github.com/bluez/bluez/blob/master/src/main.conf){target="_blank" rel="noopener"}
- GitHub, [Hyprmon](https://github.com/erans/hyprmon){target="_blank" rel="noopener"}
- Lerd, [lerd.sh](https://lerd.sh){target="_blank" rel="noopener"}

---
*[Jean-Luc Houédanou](https://houedanou.com) — veste réversible*
