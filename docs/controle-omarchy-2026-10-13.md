# Contrôle avant publication : « Retournement de veste : Omarchy a ressuscité mon MacBook Pro 2017 »

Billet : `content/fr/20261013-retournement-de-veste-omarchy-macbook-pro-2017.md` et `content/en/…`, daté du 13 octobre 2026.
Outils : claude-blog (`blog-reviewer`, `blog-seo`, `analyze_blog.py`), vérification des sources sur le dépôt
`omacom/omarchy` au tag v4.0.4, rendu contrôlé sur `nuxt dev`.

## Scores

| | Premier jet | Après corrections |
|---|---|---|
| `analyze_blog.py` FR (heuristique anglophone) | 59 | 59 |
| `analyze_blog.py` EN | 57 | 61 |
| blog-reviewer (barème sur 100) | 81 | corrigé |
| blog-seo (checklist) | 9/9 | 9/9 |

## Checklist SEO

| Élément | Résultat |
|---|---|
| Titre | 65 car. FR, 59 EN (+ « — houedanou.com ») |
| Meta description = `description` | OK : 156 car. FR et EN, « Linux » ajouté |
| Un seul H1 (template), 5 H2, 8 H3, aucun saut de niveau | OK, vérifié dans le HTML rendu |
| Liens internes | 3 billets par langue (Mac et Linux, double moniteur, vieil iMac) |
| Lien de retour | Ajouté en note de fin du billet « Mac et Linux » (FR et EN), sans `updatedAt` |
| Liens externes en nouvel onglet | OK, aucun `{target…}` résiduel dans le rendu |
| `og:image` | `/og/pingui.jpg` (déjà dans `data/og-cards.js`). Même image que `20241029-cloner-ubuntu` |
| hreflang fr / en / x-default, canonical | OK (template) |
| `redirects.js` | Aucune règle sur le nouveau slug. Les anciennes URLs `20261008-omarchy-dhh-homme-dotfiles` pointent toujours vers le billet Mac et Linux |

## Factcheck

| Affirmation | Statut | Source |
|---|---|---|
| Omarchy 4.0.4, sortie le 15 septembre 2026 | Vérifié | API GitHub, releases |
| Prise en charge intégrée des Mac Intel, disque effacé | Vérifié | `manual/44-mac-support.md` |
| Pilote clavier SPI pour MacBookPro13,x et 14,x, pilotes Wi-Fi Broadcom | Vérifié | `install/hardware/apple/`, `fix-bcm43xx.sh` |
| 36 % de performances en plus sur un MacBook Pro 2019 | Vérifié (chiffre du projet) | `manual/44-mac-support.md` |
| 22 thèmes, thèmes perso dans `~/.config/omarchy/themes/` | Vérifié | dossier `themes/` (22), `manual/06-themes.md` |
| `Super + Espace` ouvre le menu d'Omarchy | Vérifié | `manual/07-hotkeys.md` |
| Agents IA intégrés (Claude Code, Codex, Gemini…) | Vérifié | `manual/17-ai.md` |
| Son des MacBook Pro 2016-2017 : CS8409, pilote snd_hda_macbookpro, paquet AUR | Vérifié | Arch Wiki Laptop/Apple, dépôt davidjo, AUR |
| Issue #11619 ouverte le 13 septembre | Vérifié | API GitHub |
| `AutoEnable=false` écrit par les anciennes versions, corrigé en 4.0 | Vérifié ; citation remplacée par une paraphrase du commentaire | `migrations/1786380259.sh` |
| `monitors.lua`, Hyprmon seul outil cité, paquet `hyprmon-bin` | Vérifié | `manual/33-monitors.md`, AUR |
| CUPS activé, « Print Settings », détection réseau coupée en 4.0.2 | Vérifié | `manual/46-faq.md`, notes de la 4.0.2 |
| Plus de 400 contributeurs, licence MIT | Vérifié (441 au 13 octobre) | API GitHub |
| Lerd | Vérifié | lerd.sh |
| Dépôt omarchy-matrix-plymouth : aucune donnée personnelle | Vérifié | lecture complète du dépôt |
| Dépôt `jhouedanou/dotfiles` | **Introuvable** (privé ou renommé), non cité | — |

## Corrections après relecture

- Introduction : la faute reconnue est précisée (avoir jugé l'outil sans l'essayer, en mélangeant l'outil et l'auteur), sans retirer la peur, voulue par l'auteur.
- « Ma conscience » : le jeu de mots sur *opinionated* est limité aux choix techniques ; ajout d'une phrase qui reconnaît que le billet fait aussi la publicité d'Omarchy.
- Le chiffre de 36 % n'est plus présenté comme une confirmation de l'expérience de l'auteur.
- Le conseil `AutoEnable` est présenté comme valable surtout pour les installations antérieures à la version 4.
- Français : « faire semblant que » → « faire comme si », gérondif sans proposition principale, « Je ne l'ai pas encore réglé » → « le problème ».
- Anglais : titre « Turncoat » pour que la blague de la veste fonctionne, « (yet) » retiré du H2.

## Points laissés à l'auteur

- Image de couverture : réutilisée (déjà sur le billet Ubuntu de 2024).
- Redirection des anciennes URLs Omarchy vers ce billet plutôt que vers « Mac et Linux ».
- Le Wi-Fi « du premier coup » n'est pas affirmé : à ajouter si c'est le cas.
