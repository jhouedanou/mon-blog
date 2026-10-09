# Audit SEO et relecture des billets, octobre 2026

Relecture des 54 billets publiés (108 fichiers FR + EN) avec les suites `claude-blog` v2.2.0
et `claude-seo` v2.4.1, installées dans `.claude/skills` (voir `.claude/skills/VENDORED.md`).

## Avant / après

| Contrôle | Avant | Après |
|---|---|---|
| Descriptions hors 120-160 caractères | 99 | 0 |
| H1 en double (`# Titre` dans le corps) | 102 | 0 |
| Pages d'article avec plus d'un H1 dans le HTML généré | 108 | 0 |
| Pages EN déclarées `og:locale=fr_FR` / `inLanguage: fr` | 54 | 0 |
| Meta description = `searchIntent` (une question) | 108 | 0 (vient de `description`) |
| Blocs frontmatter morts (og/twitter/schema) | 18 | 0 |
| Liens internes cassés dans le HTML généré | — | 0 |
| Bugs de rendu (blocs de code orphelins, titres setext) | 4 | 0 |
| Billets avec `updatedAt` (fond mis à jour, sourcé) | 0 | 16 |

Score `analyze_blog.py` (heuristique anglophone, indicatif) : FR 50,9 → 51,6, EN 52,9 → 53,8.
Il bouge peu parce qu'il récompense ce qui a été volontairement refusé : auteur et JSON-LD dans
le Markdown (déjà produits par le template), FAQ, « points clés », définitions d'entités.

## Règles suivies

- Voix de l'auteur intacte, aucun fait biographique inventé.
- Billets d'opinion : correction légère uniquement, rien de plaqué.
- Tutoriels : restructuration permise, toute mise à jour sourcée, note « Mise à jour du 8 octobre 2026 ».
- Titres, dates, images et slugs inchangés.

## Points à trancher par l'auteur

Les relecteurs ont signalé ces points sans les modifier (titre gelé, billet d'opinion daté, ou
source introuvable).

**Faits à vérifier ou à corriger**
- `20250115-l-histoire-danne` : montant aligné sur la presse (830 000 € en un an et demi) au lieu de 800 000 € en un an. À valider.
- `20260327-cpanel-cyberpanel-migration` : aucune mesure de l'administration Trump restreignant les paiements UEMOA en janvier 2026 n'a été trouvée (seule la décision 31 du GIM-UEMOA). La prémisse et le titre sont probablement faux. Les prix cPanel ne correspondent pas aux tarifs publics.
- `20241220-coca-cola-et-ia` : la pub n'a pas été faite avec DALL-E mais avec Leonardo, Luma, Runway et Kling ([PetaPixel](https://petapixel.com/2024/11/18/coca-cola-uses-ai-video-to-reimagine-its-classic-christmas-ad)).
- `20241212-cher-gens-dadobe` : billet daté du 12/12 qui parle de « vendredi 13 » ; Affinity était vendu en licence perpétuelle ; une seule plainte (DOJ sur saisine de la FTC) ; « tribunes » ou « tribunaux » ? Un accord à 150 M$ a été proposé en mars 2026.
- `20260326-lasagessedugeant` : « 27 milliards en 14 tours » contredit « dernier tour à 30 milliards ».
- `20260810-double-moniteur-portable-blackview-dcm6` : « quelques grammes » ; les fiches donnent environ 1 kg. Le nom « Blackview DCM6 » a été ajouté dans le texte.
- `20260901-macsai-mole-alternatives-gratuites-cleanmymac` : 4,42 Go + 2,96 Go ≠ 5,66 Go dans le Smart Scan.
- `20260417-apple-pay-visa-faille-tap-to-pay` : la recherche date de 2021, mais elle est présentée comme récente.
- `20241021-2-non-ce-cable-de-240w…` : un MacBook Pro 15" à 87 W a besoin d'un câble 5 A ; « 60 W suffirait » est discutable.
- `20241029-cloner-ubuntu` : `resize2fs` exige souvent un `e2fsck -f` d'abord ; sur NVMe, la partition s'appelle `p2`. Le script n'a pas été modifié.
- `20240905-djamo…` : aucune source trouvée sur les trois nouveautés citées.
- `20260924-changer-mot-de-passe-wifi-canalbox…` : procédure non vérifiable de l'extérieur.

**Corrections de fond faites, à relire**
- `20260618-alerte-phishing-bing-webmaster-tools` : le vrai Bing Webmaster Tools accepte la connexion Google depuis 2018. L'argument est réécrit, avec une note « correction d'une erreur de ma part ». À valider.
- `20260907-bill-gates…` : les 567 M$ d'août s'ajoutent aux 375 M$ de mars ([GigaLaw](https://giga.law/daily-news/2026/8/7/new-mexico-judge-orders-meta-to-pay-567-million-in-mental-health-case)).
- `20251225-infinix-ou-oraimo` : phrase ajoutée, « j'ai finalement troqué l'Oraimo contre une Pixel Watch » (tirée du billet Pixel Watch).

**Titres et métadonnées gelés**
- `20260515-claude-code-caveman-mode` : « -75 % de tokens » ne colle plus aux chiffres actuels du projet.
- `20260531-claude-dispatch…` : la fonction s'appelle Remote Control ; Dispatch est l'équivalent côté Cowork.
- `20260822-oui-a-lexcision…` : le `searchIntent` promet une analyse des lois ivoirienne et malienne, absente du billet.
- `20260414-windows-sans-prise-de-tete` : « sans compte Microsoft » est de plus en plus difficile sur les builds récentes.
- `20251104-josh-vs-aircotedivoire` : le fichier FR est entièrement en anglais (depuis l'origine).
- `20260707-Je suis encore vivant` : `createdAt` (06/07) ≠ date du nom de fichier (07/07).
- `20260908-cest-integre-dans-la-maquette` : le titre EN contient des « ».

**Divers**
- `20260401-persistance-css-chrome-devtools` : les captures sont générées par IA (filigrane Gemini, libellés incohérents) ; de vraies captures seraient plus crédibles.
- `20250705-chersCommerciaux` : la protection anti-traque des AirTag (alerte sur l'iPhone de la personne suivie) n'est pas mentionnée.
- `20260730-telephone-perdu…` : « prises de murs surmontables » → « prises de tête » ?
- `20260907-free-speech…` : le titre Snopes a été remplacé par le titre actuel de l'article ; l'analyse Volokh reste sans lien.

## Suivi des points à trancher (8 octobre 2026, soir)

**Corrigés, avec source et note de correction datée**
- `20260327-cpanel-cyberpanel-migration` : aucune mesure de l'administration Trump n'existe. Le blocage venait de la décision n° 31 du GIM-UEMOA (routage obligatoire par GIM-Switch, ultimatum à Visa et Mastercard au 31 mars 2026). Récit, intertitre et **titre** corrigés. Les prix cPanel sont présentés comme des tarifs partenaires, et les prix publics sont ajoutés.
- `20260326-lasagessedugeant` : levées d'Anthropic (près de 64 milliards depuis 2021, dont 30 milliards en février 2026), record d'OpenAI (110 milliards), chiffres trimestriels d'Apple et capitalisation boursière corrigés et sourcés.
- `20260417-apple-pay-visa-faille-tap-to-pay` : la recherche date de septembre 2021 ; **titre** corrigé, le paiement de démonstration était de 1 000 £ et non de 10 000 $.
- `20241220-coca-cola-et-ia` : la pub a été faite avec Leonardo, Luma, Runway et Kling, pas avec DALL-E.
- `20241212-cher-gens-dadobe` : `createdAt` passe au 13/12 (le vendredi 13), Affinity était vendu en licence perpétuelle, une seule plainte, « tribunaux », accord à 150 M$ de mars 2026.
- `20241029-cloner-ubuntu` : script corrigé (`e2fsck -f` avant `resize2fs`, suffixe `p` pour les disques NVMe et mmcblk).
- `20241021-2-non-ce-cable-de-240w…` : au-delà de 60 W, il faut un câble 5 A e-marqué.
- `20260810-double-moniteur-portable-blackview-dcm6` : environ 1 kg, et non « quelques grammes ».
- `20260901-macsai-mole…` : le détail du Smart Scan, dont la somme était fausse, est retiré.
- `20260531-claude-dispatch…` : **titre** « Remote Control », le vrai nom de la fonction.
- `20260515-claude-code-caveman-mode` : l'encadré précise que « -75 % » était la promesse de mai 2026, et donne les mesures actuelles.
- `20250705-chersCommerciaux` : ajout de l'alerte anti-traque des AirTag (iPhone et Android).
- `20260907-free-speech…` : lien vers l'analyse de Volokh.
- `20251104-josh-vs-aircotedivoire` : la version FR est désormais en français.
- `20260822-oui-a-lexcision…` : `searchIntent` aligné sur le contenu.
- `20260908-cest-integre-dans-la-maquette` : guillemets du titre EN.
- `20260707-Je suis encore vivant` : `createdAt` aligné sur le 07/07.

**Conservés volontairement**
- « prises de murs surmontables » : expression de l'auteur (cf. « des murs à se prendre »).
- Djamo, CanalBox : non vérifiables de l'extérieur, billets datés.
- Infinix (phrase tirée du billet Pixel Watch) et note de correction du billet Bing : validés.
- Captures IA du billet DevTools : à remplacer par de vraies captures quand l'auteur le pourra.
- Josh : les incohérences du récit (« chief ground agent » ou « station manager », surclassement « en plein vol ») sont laissées à l'auteur.
