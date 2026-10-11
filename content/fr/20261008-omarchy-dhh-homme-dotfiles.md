---
title: "On ne sépare pas l'homme de ses dotfiles"
createdAt: "2026-10-08T13:00:00Z"
updatedAt: "2026-10-11T22:00:00Z"
image: "/images/articles/pingui.webp"
description: "J'avais suivi Korben dans son boycott d'Omarchy, la distro de DHH. Trois jours plus tard, je retourne ma veste : Omarchy a ressuscité mon vieux MacBook."
searchIntent: "Pourquoi boycotter Omarchy, la distribution Linux de DHH, et pourquoi l'installer quand même sur un vieux MacBook Pro de 2016 ?"
tags: ["opinion", "linux", "open-source", "société"]
---

Je vais faire un retournement de veste.

Le 8 octobre, j'ai publié ici un billet pour dire que je suivais Korben dans son boycott d'Omarchy, la distribution Linux de DHH. J'y promettais de ne pas en parler ici et de ne pas la recommander. Trois jours plus tard, Omarchy tourne sur mon MacBook Pro fin 2016. Et j'en parle.

La raison tient en une phrase : un système avec Claude intégré, qui m'évite de trop bidouiller et qui est beau, je suis preneur.

Je vous explique tout plus bas, avec les réglages qu'il m'a fallu pour faire revivre le MacBook. Mais d'abord, je vous laisse ce que j'écrivais le 8 octobre. Je n'en retire rien sur DHH.

## Ce que j'écrivais le 8 octobre

C'est rare que je reprenne le billet d'un autre blogueur. Ce n'est pas mon truc, je préfère écrire mes propres âneries. Mais aujourd'hui, ça vient de Korben.

Oui, Korben. Le blogueur qu'on m'accuse de copier depuis quinze ans.

Petite parenthèse, puisqu'on y est. Mettons fin à ça une bonne fois : c'est mon style d'écriture, c'est ma voix. Je fais des phrases courtes et je parle de la tech depuis Abidjan. Ça s'appelle avoir une personnalité.

Mais revenons au sujet.

### Ce que dit Korben

Ce matin, Korben a publié [« Omarchy, non merci »](https://korben.info/omarchy-dhh-boycott.html){target="_blank" rel="noopener"}. Il y annonce qu'il ne veut plus utiliser ni promouvoir Omarchy, et il explique pourquoi.

Je vais être clair tout de suite : je suis d'accord avec lui. Pas parce que c'est Korben, mais parce que sur ce coup-là, il a raison. Et comme je ne suis pas là pour cirer des pompes, j'ajoute ce que lui ne peut pas dire à ma place : vu d'Abidjan, ce débat n'a pas tout à fait la même saveur.

Pour ceux qui ne suivent pas : Omarchy est une distribution Linux basée sur Arch, avec un bureau en mosaïque piloté au clavier, des thèmes qui changent tout le système d'un coup, et une installation en deux minutes. C'est joli, c'est rapide, c'est très à la mode chez les développeurs. Son créateur, c'est DHH, David Heinemeier Hansson, l'homme derrière Ruby on Rails et 37signals.

Et DHH a un blog.

### Ce qu'écrit DHH

Depuis plus d'un an, sur [son blog](https://world.hey.com/dhh){target="_blank" rel="noopener"}, DHH ne parle plus seulement de code. Il parle d'immigration. Korben a traduit et cité quatre billets, et je vous les résume :

- **[« As I remember London »](https://world.hey.com/dhh/as-i-remember-london-e7d38e64){target="_blank" rel="noopener"}** (septembre 2025) : il refuse qu'un pays connaisse un « remplacement démographique » comme celui qu'aurait connu Londres.
- **[« Europe is weak and delusional (but not doomed) »](https://world.hey.com/dhh/europe-is-weak-and-delusional-but-not-doomed-8b10e7cb){target="_blank" rel="noopener"}** (9 décembre 2025) : il oppose une immigration choisie, à l'américaine, à l'immigration de masse venue de régions qu'il décrit comme ayant un QI moyen bas et des habitants « contributeurs nets négatifs ».
- **[« Three sacred cows that must die so Europe can live »](https://world.hey.com/dhh/three-sacred-cows-that-must-die-so-europe-can-live-1afb203d){target="_blank" rel="noopener"}** (16 juillet 2026) : l'immigration ne réglerait ni la natalité, ni les retraites, ni l'économie, et des millions de personnes déjà installées en Europe devraient repartir.
- **[« Wolves, sheep, and gypsies »](https://world.hey.com/dhh/wolves-sheep-and-gypsies-ba44af6a){target="_blank" rel="noopener"}** (21 juillet 2026) : il compare les Roms à des loups et écrit que, lorsqu'ils « prennent possession de l'espace public », on les expulse.

J'ai vérifié, les quatre billets sont toujours en ligne. Dans la même liste, on trouve aussi un billet de juin 2026 intitulé [« The Rape of Britain »](https://world.hey.com/dhh/the-rape-of-britain-610412f8){target="_blank" rel="noopener"}. Je vous laisse imaginer le niveau de nuance.

### Les « régions », c'est chez moi

Je vais vous dire pourquoi ce billet de Korben m'a fait réagir plus que d'habitude.

Quand DHH parle de « régions à QI moyen bas » dont viennent des « contributeurs nets négatifs », il ne parle pas d'une abstraction. Il parle de l'Afrique de l'Ouest, entre autres. Il parle d'Abidjan, de Dakar, de Lagos, de Cotonou. Il parle de la diaspora à Paris, à Bruxelles ou à Londres, et des développeurs ivoiriens qui codent pour des boîtes européennes depuis leur salon à Cocody.

Il parle de moi.

Et vous savez ce qui est drôle ? Toute une génération de développeurs, moi compris, a lu DHH pendant des années : sur Rails, sur le télétravail, sur la sortie du cloud. Le gars nous a appris des choses. Et pendant tout ce temps, dans sa tête, une partie de ses lecteurs étaient des QI moyens bas venus de régions à problèmes.

Ce n'est pas de la « politique ». Je n'ai aucun problème avec quelqu'un qui pense que l'immigration doit être régulée, qu'on peut en discuter, qu'il faut des règles. C'est un débat, et je peux avoir ce débat. Mais classer des peuples entiers par QI supposé et comparer une minorité à des loups, ce n'est pas un débat. C'est un tri. Et on sait très bien comment l'Europe a fini la dernière fois qu'elle s'est mise à trier.

Oui, je sais : point Godwin. C'est même le premier de l'histoire de ce blog. Je l'assume. Quand quelqu'un classe des peuples entiers selon leur QI supposé, la comparaison n'est pas une exagération, c'est un rappel.

### « Il faut séparer l'homme de l'œuvre »

On va me le sortir, donc je réponds tout de suite : non.

On ne peut pas dissocier l'homme de ses idées ou de ses actes. Une chanson, un livre, un logiciel : chaque fois qu'on les consomme, on fait entrer un peu de la personne chez soi.

Et avec Omarchy, c'est encore plus littéral qu'avec une chanson ou un livre. Omarchy se vend comme une distribution *opinionated*, une distro « qui a des opinions » : les choix de DHH, ses raccourcis, ses applications, ses dotfiles, installés tels quels sur votre machine. L'œuvre, c'est littéralement le goût de l'homme. Son nom est partout sur le site, c'est lui qui fait les conférences, c'est lui le produit.

Omarchy a des opinions, c'est son argument de vente. Le problème, ce sont les opinions.

Et puis il y a l'argent. Comme le rappelle Korben, 1Password et 37signals se sont engagés à verser chacun 100 000 dollars par an, pendant trois ans, à la fondation qui finance Omarchy ([It's FOSS](https://itsfoss.com/news/1password-omarchy-pledge/){target="_blank" rel="noopener"}). Devant ses employés, le patron de 1Password a assuré que l'entreprise ne soutient pas les opinions de DHH. D'accord. Mais elle signe le chèque. Quand vous mettez votre logo sur la tribune, vous ne pouvez pas faire semblant de ne pas avoir vu ce qui se dit au micro.

Évidemment, ça ne veut pas dire que tous ceux qui utilisent ou contribuent à Omarchy pensent comme lui. Korben le dit, et je le redis : la plupart s'en fichent, ou ne savent pas. Maintenant, vous savez.

### Ce que je fais, moi

Mon boycott ne va pas faire trembler grand monde, je le sais. Mais je n'en parlerai pas ici, je ne le recommanderai pas, et si vous me demandez une distro pour débuter ou pour frimer avec un bureau en mosaïque, je vous enverrai ailleurs.

Parce que la bonne nouvelle, c'est que tout ce qu'offre Omarchy existe sans DHH. Arch Linux, CachyOS ou EndeavourOS pour la base. Hyprland pour le bureau en mosaïque. Des dizaines de jeux de dotfiles communautaires sur GitHub pour l'habillage. Ça vous prendra peut-être une heure au lieu de deux minutes. Une heure, c'est un prix raisonnable pour ne pas installer le goût d'un type qui pense que vous ou votre voisin n'avez rien à faire sur son continent.

Le libre, à la base, c'est un projet humaniste. L'idée que le savoir appartient à tout le monde, que n'importe qui, n'importe où, peut lire le code, le modifier et le partager. Un gamin d'Abobo a exactement les mêmes droits sur le noyau Linux qu'un ingénieur de Copenhague. C'est même pour ça que beaucoup d'entre nous, ici, sommes tombés dedans. Une distro qui met en avant un homme qui veut trier les gens selon leur origine, c'est un contresens.

## Ce que vous m'avez répondu

Après le billet du 8 octobre, j'ai reçu des réactions. En voici deux.

La première, sur Omarchy :

> Il parvient à rendre Linux sexy là où les autres distros commerciales ont échoué. Après, je ne l'utilise pas, car je ne suis pas fan d'Arch et d'Hyprland.

La deuxième :

> Je suis sur Omarchy et j'adore cette distribution, je la trouve vraiment parfaite pour moi. Mais j'ai lu ton article et maintenant je suis partagé : j'adore cette distribution, mais ce qu'il écrit est détestable.

C'est là où j'en suis aussi.

## Pourquoi je retourne ma veste

Commençons par l'évidence : je me contredis. J'ai écrit qu'on ne sépare pas l'homme de ses dotfiles, et j'installe ses dotfiles. Je ne vais pas faire semblant que c'est cohérent. Voici ce qui a fait pencher la balance.

À la base, je voulais essayer [Ryoku](https://ryoku.dev){target="_blank" rel="noopener"}, une alternative à Omarchy, basée elle aussi sur Arch Linux. Finalement, c'est Omarchy que j'ai installé, pour ces raisons.

**Claude est intégré.** Omarchy est livré avec Claude Code, l'assistant de programmation d'Anthropic, et avec OpenCode ([manuel d'Omarchy](https://learn.omacom.io/2/the-omarchy-manual/107/ai){target="_blank" rel="noopener"}). La commande `cx` lance Claude Code en « danger mode », c'est-à-dire sans demander de confirmation à chaque action. Omarchy fournit aussi une « skill », un mode d'emploi que l'assistant lit pour modifier le système : la barre du haut, les thèmes. Le manuel la dit expérimentale. Et c'est avec Claude que j'ai réglé les problèmes du MacBook, vous le verrez plus bas.

**Moins de bidouille.** J'écrivais qu'on peut tout refaire sans DHH, avec Arch, Hyprland et des dotfiles : « Ça vous prendra peut-être une heure au lieu de deux minutes. » J'étais optimiste. Assembler tout ça soi-même prend bien plus qu'une heure. Omarchy arrive prêt : bureau, raccourcis, applications, thèmes. Et les mises à jour passent par une seule commande, qui prend un snapshot du système avant de toucher à quoi que ce soit. Si une mise à jour casse quelque chose, on redémarre sur le snapshot d'avant ([manuel d'Omarchy](https://learn.omacom.io/2/the-omarchy-manual/68/updates){target="_blank" rel="noopener"}).

**C'est beau.** Un thème Omarchy change tout le système d'un coup : terminal, barre, fenêtres, fond d'écran. Je l'avais écrit moi-même : « C'est joli ». C'est toujours vrai.

**Ça ne lui rapporte rien.** Omarchy est un logiciel libre, sous licence MIT ([GitHub](https://github.com/basecamp/omarchy){target="_blank" rel="noopener"}). Je ne paie rien pour l'utiliser. L'argent dont parlait Korben vient des sponsors, comme 1Password, pas des utilisateurs.

**Sa vie, c'est sa vie.** Je ne choisis pas mes outils selon la vie privée de ceux qui les fabriquent. Celle de Tim Cook ou de Sam Altman ne regarde qu'eux, et c'est très bien comme ça.

**Personne n'est parfait.** Elon Musk, je préfère ne pas en parler. Et je ne suis pas un modèle non plus : j'ai perdu mes cheveux en route et gagné quelques kilos.

## Omarchy a ressuscité mon vieux MacBook

Apple a arrêté les mises à jour du MacBook Pro fin 2016 après macOS Monterey ([Apple](https://support.apple.com/fr-fr/108052){target="_blank" rel="noopener"}). Le mien ne servait plus. Aujourd'hui, il tourne sous Omarchy, avec un noyau Linux 7.2.

Omarchy n'a pas tout réglé tout seul. Voici les trois changements que j'ai dû faire.

### Le Wi-Fi : des réglages sur la CanalBox

Juste après l'installation, le Wi-Fi ne fonctionnait pas. Il a fallu changer des réglages sur ma CanalBox, ma box internet.

### Les mises à jour : `omarchy update`, pas `pacman -Syu`

Sous Arch, le réflexe, c'est `sudo pacman -Syu`. Omarchy m'a arrêté net avec un « Woah partner ». Il faut passer par sa propre commande :

```bash
omarchy update
```

Elle prend un snapshot, applique les migrations d'Omarchy (les changements de configuration), puis met à jour les paquets. Avec `pacman -Syu`, on risque de rater ces migrations.

### Le son : un pilote à compiler

Ces MacBook utilisent une puce audio Cirrus CS8409. Pour que les haut-parleurs marchent sous Linux, il faut un pilote maintenu par la communauté, [snd_hda_macbookpro](https://github.com/davidjo/snd_hda_macbookpro){target="_blank" rel="noopener"}. Il se compile sur la machine.

1. Installer les outils de compilation et les headers du noyau d'Omarchy. Ne sautez pas cette étape : le script du pilote en a besoin.

```bash
sudo pacman -S --needed base-devel git wget patch dkms linux-omarchy-headers
```

2. Télécharger et installer le pilote :

```bash
git clone https://github.com/davidjo/snd_hda_macbookpro.git
cd snd_hda_macbookpro
sudo ./install.cirrus.driver.sh -i
```

3. Redémarrer, puis tester avec le volume bas :

```bash
speaker-test -c 2 -t wav -l 1
```

On doit entendre « Front Left », puis « Front Right ». Le pilote passe par DKMS : il se recompile tout seul à chaque mise à jour du noyau faite avec `omarchy update`.

## Conclusion

Apple avait lâché ce MacBook. Omarchy l'a remis en route.

Sur DHH, je n'ai pas changé d'avis : ses billets sur l'immigration restent ce qu'ils sont, et sur ce point, je suis toujours d'accord avec Korben. Sur Omarchy, j'ai changé d'avis. Ce n'est pas glorieux, mais je préfère vous le dire que de le cacher.

## Sources

- Korben, [« Omarchy, non merci »](https://korben.info/omarchy-dhh-boycott.html){target="_blank" rel="noopener"}, 8 octobre 2026
- Le blog de DHH : [world.hey.com/dhh](https://world.hey.com/dhh){target="_blank" rel="noopener"}
- It's FOSS, [« 1Password Just Pledged $300,000 to DHH's Omarchy, and its Own Employees Aren't Happy »](https://itsfoss.com/news/1password-omarchy-pledge/){target="_blank" rel="noopener"}, 3 septembre 2026
- Ryoku, [ryoku.dev](https://ryoku.dev){target="_blank" rel="noopener"}
- Manuel d'Omarchy : [« AI »](https://learn.omacom.io/2/the-omarchy-manual/107/ai){target="_blank" rel="noopener"} et [« Updates »](https://learn.omacom.io/2/the-omarchy-manual/68/updates){target="_blank" rel="noopener"}
- Omarchy sur [GitHub](https://github.com/basecamp/omarchy){target="_blank" rel="noopener"} (licence MIT)
- Apple, [Identifier votre modèle de MacBook Pro](https://support.apple.com/fr-fr/108052){target="_blank" rel="noopener"}
- davidjo, [snd_hda_macbookpro](https://github.com/davidjo/snd_hda_macbookpro){target="_blank" rel="noopener"}, pilote audio pour les puces Cirrus CS8409
