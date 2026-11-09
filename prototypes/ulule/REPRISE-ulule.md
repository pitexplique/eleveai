# Reprise — campagne Ulule « Ti Margo : les maths en dessin animé »

> Session du 07/11/2026, bascule à 65 % de contexte. À lire en entier avant de reprendre.

## Où on en est

Frédéric remplit le formulaire Ulule lui-même, dans son navigateur et sur son compte (eleveai974). Moi, je lui donne les textes à coller. **Ne jamais remplir ni envoyer le formulaire à sa place sans son accord explicite.**

Ses choix, tranchés :
- **Mode** : collecte « pour un projet », avec contreparties. À l'étape 2, il a coché « réunir de l'argent ».
- **Titre** : « Ti Margo : les maths en dessin animé » (déjà saisi).
- **Objectif** : **8 000 €**. Paliers : 12 000 € (tout le parcours GS → terminale vérifié), 18 000 € (un an d'IA et plus de visibilité), 31 000 € (pays francophones, grâce à la matrice des programmes par pays).
- **Périmètre** : de la grande section à la **terminale** (et non plus GS → 6e).
- ⛔ **La qualité d'abord** : le facteur limitant, c'est la vérification, pas l'IA. Les étudiants vérificateurs passent avant l'IA.
- ⛔ **Pas de nombre de vidéos sur la page** : on parle de « vérification ».
- ⛔ **Pas de prénom d'enfant au générique** en contrepartie (trop de contributeurs). À la place : un film de remerciement Ti Margo, le même pour tous, et le mur des soutiens.
- ⛔ **Ne nommer aucun concurrent** sur la page. Écrire « un adulte qui explique au tableau » plutôt qu'IXL.
- ⛔ **Devoir de réserve** : aucune critique des inspecteurs. Écrire « un projet indépendant, né en classe ».
- Rectorat : **OK** pour le cumul d'activités (confirmé le 07/11).
- Test gratuit : **eleveai.fr/coach**, sans compte ni abonnement, mais **sans suivi**. Le suivi dans la durée vient avec l'abonnement.
- Coûts réels : Claude Max 200 $/mois, Vercel 40 €/mois, Supabase Pro à venir, voix Julie gratuite (voix Windows).
- Il prévoit **3 500 vidéos en deux mois**. Avec 8 000 €, la vérification n'est pas toute payée dès l'objectif : elle se finit au palier 12 000 €. Une question « 13 000 € ou 8 000 € + palier » est restée sans réponse claire, et il a continué avec 8 000 €.

## Les fichiers (`prototypes/ulule/`)

| Fichier | Contenu |
|---|---|
| `page-ulule.md` | Toute la page : titre, textes, contreparties, script vidéo, FAQ, messages réseaux, liste avant lancement. ⚠️ La « description » y est plus longue que le texte final ci-dessous : c'est ce dernier qui fait foi. |
| `budget.md` | Le budget interne détaillé : matériel, mensuel, étudiants, URSSAF, paliers, contributeurs. |
| `budget-camembert.png` | Le camembert des 8 000 € (8 postes, sans nombre de vidéos). |
| `image-principale.png` | L'image principale Ulule, 1360 × 760 (affichée en 680 × 380) : Ti Margo détouré et le titre. |
| `video-ulule-voix.md` | La voix **VALIDÉE** de la vidéo de présentation (9 scènes, paysage, ≈ 2 min). |

Les scripts qui dessinent les deux images sont dans le scratchpad de l'ancienne session. Ils ne sont pas indispensables : il suffit de rouvrir les PNG.

## Le texte final de la description (le dernier mélange, à coller tel quel)

Voir la fin de ce fichier, section « Description finale ».

## Ce qui reste

1. **La vidéo de présentation** : un agent la rendait en arrière-plan au moment de la bascule (série `ulule`, épisode `presentation`, sortie attendue `manim/sorties/ulule/presentation.mp4`, aperçu `manim/sorties/apercu.html` en pause). Il devait s'inspirer de `scripts/film-noel.mjs` pour le paysage, sans toucher aux fichiers du film de Noël. **Contrôler sa planche et son son**, corriger tout défaut, puis la faire écouter à Frédéric. Mise en ligne YouTube « non répertoriée » **seulement sur son ordre**. Les fichiers qu'il a créés (`prototypes/ti-margo/films/ulule*`, `public/sons/ulule-presentation`, une éventuelle option paysage dans `scripts/ti-margo-short.mjs`) ne sont pas committés.
2. **Les contreparties** à saisir sur Ulule : textes dans `page-ulule.md`, section 6.
3. **Avant le lancement** : le SIRET, les codes cadeaux (rien n'existe encore), la carte Ti Margo à imprimer, la date d'ouverture de l'offre famille, et une centaine de promesses de dons avant le jour 1.
4. **Facultatif** : une adresse `eleveai.fr/ulule` vers le coach avec `utm_source=ulule` (aujourd'hui, `/coach` compte les visiteurs comme venant de YouTube).
5. **Calendrier** : lancement conseillé début décembre, sur 35 jours. Ulule verse l'argent quelques semaines après la fin : si la production se fait en décembre, l'ordinateur doit être acheté avant.

## Description finale

```text
Je suis Frédéric, professeur de maths à La Réunion.
Pour mes élèves, j'ai créé eleveai.fr. Le site accompagne chaque notion du programme, de la grande section à la terminale, avec :

* un court dessin animé avec Ti Margo, pour avoir envie ;
* une vidéo pour comprendre chaque étape ;
* un coach qui suit l'enfant, micro-compétence après micro-compétence.

Le coach est construit sur une matrice des programmes par pays : il suit le programme français, et il est conçu pour s'adapter aux autres pays francophones.

Près de 1 500 vidéos existent déjà. Le site reçoit 500 visites par jour sans publicité, et mes élèves les regardent de leur plein gré. C'est ce qui me donne envie d'aller plus loin.

Mais aujourd'hui, je bute sur deux limites. La première, c'est la fabrication : tout est calculé image par image sur un ordinateur portable, qui ne peut pas produire les milliers de vidéos qui manquent encore pour couvrir l'ensemble du programme. La seconde, c'est la qualité : fabriquer vite ne suffit pas, chaque vidéo doit être juste avant d'arriver devant un enfant.

C'est exactement à ces deux limites que répond la collecte. Elle financera, dans l'ordre :

* un ordinateur de fabrication, pour produire plusieurs vidéos à la fois ;
* des étudiants vérificateurs à La Réunion, futurs professeurs, qui relisent chaque vidéo avant sa mise en ligne ;
* l'intelligence artificielle qui m'aide à écrire et à animer les vidéos ;
* de la publicité, pour faire connaître le projet aux familles.

Avec ces moyens, je pourrai mener le projet jusqu'au bout : offrir à chaque enfant, de la grande section à la terminale, un parcours complet où chaque notion a son dessin animé, sa vidéo et son coach, et où chaque vidéo a été vérifiée. Pour qu'aucun enfant ne décroche faute d'avoir compris une étape.

En contribuant, vous pouvez recevoir des mois d'abonnement famille dès 10 €, notamment dans une version à offrir à vos petits-enfants, ou des licences pour les classes.

Chaque soutien aidera eleveai.fr à produire les vidéos animées avec Ti Margo qui manquent, sans rien lâcher sur la qualité, et à rendre les maths plus accessibles, notion après notion.
```

Sous-titre (133 caractères) :

```text
Votre enfant aime les dessins animés ? Aidez-nous à finir ceux qui apprennent les maths, de la GS à la terminale, vérifiés un par un.
```

## Changement après la bascule

- 07/11 : Frédéric a mis une contrepartie à **4,95 €** sur Ulule, soit le prix d'un mois d'abonnement famille. À confirmer : 4,95 € = 1 mois offert, à la place du « Merci » à 5 €. Les autres contreparties restent : 10 € = 2 mois, 25 € = 6 mois, 50 € = 1 an.

- 07/11 : **le texte final de la description** est celui que Frédéric a collé sur Ulule. Il ajoute des intertitres (« Deux limites à dépasser », « À quoi servira la collecte », « Rejoindre le projet ») et une **licence classe à partir de 2 € par élève et par an** (⚠️ à mettre en cohérence avec la contrepartie à 300 € de `page-ulule.md`). Il remplace la « Description finale » ci-dessus.

- 07/11 : **vidéo de présentation RENDUE** : `manim/sorties/ulule/presentation.mp4` (1 min 53, 1920 × 1080), planche `presentation-planche.png` relue, aperçu sur le port 3900 en pause. Reste à l'écouter (Frédéric). Non committés : `prototypes/ti-margo/films/ulule*`, `manim/voix/ulule-presentation.json`, `public/sons/ulule-presentation/`, `manim/sorties/ulule/`, et l'option paysage dans `scripts/ti-margo-short.mjs`, `prototypes/ti-margo/short.js`, `scripts/ti-margo-planche.py` (vérifiée sans effet sur les shorts verticaux). Committer PAR CHEMIN après son écoute. Défauts connus : photo de Frédéric un peu floue (240 px), captures du coach illisibles en petit, la vue parent est la maquette de `/parents` (pas de vert, orange, gris par compétence).

- 07/11 soir : **vidéo v2 rendue** (2 min 22) : scènes 6-7 avec les quatre postes financés, 4,95 € = 1 mois, camembert à la fin (« Et voici où vont les huit mille euros »). Planche relue, carte des usages corrigée. Reste : son écoute, le commit PAR CHEMIN, puis YouTube « non répertoriée » sur son ordre. Images aussi : `photo-profil.png` (Ti Margo + sa photo, « Maths en dessin animé ») et `image-principale.png` (« Ti Margo : les maths en dessin animé », « De la GS à la terminale »), non committées dans leur dernière version.

- 08/11 : **v3 demandée** (agent `a16e48ecac8f79af5`) :
  - scène 4 : « Et le coach suit le programme de ton pays, partout où l'on apprend les maths en français », avec 7 drapeaux et leurs noms ;
  - scène 9 : « Alors ? On les finit ensemble ? », ton joyeux et montant, Ti Margo bras ouverts.

  Nouvelles images, non committées :
  - `photo-profil-rond.png`, l'avatar pensé pour le rond, avec « Maths animées ! » ;
  - `banniere-profil.png`, la bannière du profil en 1920 × 420.

  Après son écoute : committer PAR CHEMIN, puis envoyer sur YouTube en « non répertoriée » sur son ordre.

- 08/11 : **NOUVELLE STRATÉGIE.** Ulule jugeait 8 000 € trop ambitieux.
  - Objectif **3 000 € = le collège vérifié avant le brevet 2027**.
  - Étapes ensuite : 5 000 € = l'école primaire, 8 000 € = le lycée. Plus de palier pub ni pays.
  - **Ordinateur retiré** de la page et de la vidéo : « les gens ne financent pas un ordinateur ».
  - **« Étudiants en maths, futurs professeurs »**.
  - **Qualité dite en positif** (« label qualité »), jamais « une erreur = un enfant qui apprend faux ».
  - **IA écrite « Outils d'animation »**.
- Camembert 3 000 € : étudiants 1 400 / cotisations 720 / outils 640 / Ulule 240. Script `camembert3000.mjs` dans le scratchpad de l'ancienne session.
- Texte final mis en forme : `description-ulule.html` (Ctrl+A / Ctrl+C / Ctrl+V dans Ulule). Il remplace les descriptions précédentes.
- Fond de page Ulule : couleur unie `C6E9FB` (`fond-page.png` en réserve).
- Vidéo v5 en BASSE DÉFINITION : `manim/sorties/ulule/presentation-bd.mp4` (2 min 20). Option `BD=1` dans `scripts/ti-margo-short.mjs`. Le HD attend sa validation.
- Il manque une vraie anecdote d'élève (sans prénom) à ajouter au texte.

- 08/11 : **vidéo HD FINALE (v6)** rendue : `manim/sorties/ulule/presentation.mp4` (2 min 18, 30,9 Mo), planche relue.
  - Scène 7 : « 3 000 € = tous les dessins animés du collège », « Relus par un futur professeur ».
  - Rien n'est committé. ✅ En ligne (non répertoriée), mise par lui : https://youtu.be/HQ7B3ElMH8Y — à coller dans Ulule et dans la description YouTube (lien Ulule à ajouter).
  - Description réécrite autour du résultat : « finir les dessins animés du collège », avec la relecture comme garantie et des contreparties à tarif fondateur. **Le prix fondateur de l'abonnement d'un an est à fixer.**
  - Session [codes-ulule] lancée : codes d'abonnement, page /code et carte cadeau. Mise en ligne dès qu'Ulule accepte, sur son ordre.

- 08/11 : **prix fondateur 1 an = 39 €** (proposé par Frédéric). Grille des contreparties proposée, à saisir sur Ulule :
  - 4,95 € = 1 mois ;
  - 12 € = 3 mois ;
  - 22 € = 6 mois ;
  - 39 € = 1 an ;
  - chacune existe aussi « à offrir », au même prix.

- 08/11 (session fille) : **grille à 39 € intégrée.**
  - `page-ulule.md` réécrite pour la stratégie 3 000 € : sous-titre collège, objectif, contreparties 4,95 / 12 / 22 / 39 € et les mêmes « à offrir », FAQ et messages réseaux. Les sections 5 et 7 renvoient à `description-ulule.html` et `video-ulule-voix.md`.
  - `description-ulule.html` : « Comment soutenir » donne 3 mois 12 €, 6 mois 22 €, **1 an 39 € au lieu de 59,40 €**.
  - Codes : la durée **3 mois** manquait (SQL, `codes-ulule.mjs`, carte cadeau), ajoutée ; « 1 mois offerts » corrigé en « offert ».
  - Licence classe proposée à **60 € pour 30 élèves** (= 2 €/élève/an) : **validé par lui le 08/11**.
  - Liste d'avant-lancement : **`avant-lancement.md`** (SIRET, 100 promesses, calendrier : lancement mar. 24/11, fin dim. 20/12, codes envoyés avant Noël).

- 09/11 (session fille « champs restants ») : textes donnés pour la page « Impact et défis ».
  - Impact (476 car., le compteur Ulule affiche déjà 9/500 à vide) : décrochage au collège, surtout en 4e ; 1 500 vidéos, 500 visites/jour ; 3 000 € pour le collège avant le brevet 2027, relu par un étudiant en maths futur professeur, rémunéré ; puis primaire 5 000 €, lycée 8 000 €.
  - Label et certifications : « pas encore de label », programmes officiels (dont 2026), relecture par étudiants futurs professeurs.
  - ODD : cocher le **4 « Éducation de qualité »** seulement.
  - 09/11, sa demande : l'impact dit aussi que Ti Margo **aide d'abord les élèves en difficulté** et que **« mes classes adorent ! »** (478 car.).
  - 09/11, sa précision : **chaque dessin animé est relu par lui ET par un étudiant** (pas seulement par l'étudiant). Corrigé dans l'impact (479 car.), le label et `description-ulule.html`. Le texte déjà collé sur Ulule est à corriger par lui.
  - ODD 4, « Expliquez comment vous agissez » : accès (test gratuit sans compte, 4,95 €/mois, vidéos libres sur YouTube), pour tous (coach qui se lit et s'écoute, petites étapes), qualité (programmes officiels, relu par lui et un étudiant).
  - Fuseau horaire Ulule : **La Réunion (UTC+4)**, à défaut Maurice ou Dubaï (même heure).
- 09/11 : **deux contreparties ajoutées** (sa proposition) : **69 € Duo famille à offrir** (deux codes d'un an) et **99 € 1 an + visio** (30 min en janvier 2027, limitée à 20 places, au vouvoiement « votre enfant »). Total 11 contreparties, au-delà des 10 conseillées par Ulule : si Ulule tique, retirer « 6 mois à offrir ». Ajoutées à `page-ulule.md` et à `description-ulule.html`.
  - 09/11 : « 30 minutes, ça fait léger » → **deux visios de 45 min** (janvier et avril 2027), **15 places**.
