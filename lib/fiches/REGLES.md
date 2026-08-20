# Règles de création des fiches de cours EleveAI

Le pendant « fiche » de [`manim/REGLES.md`](../../manim/REGLES.md) (le pendant « vidéo »).
Une notion = une banque (source de vérité) = **une fiche** = une vidéo. Même point de
départ (la banque), même nommage (le notionId), même standard qualité :
**montrer, pas raconter → « plus c'est visuel, mieux c'est ».**

Modèle de référence : [`maths-6e-calcul-pose.tsx`](./maths-6e-calcul-pose.tsx).

---

## 1. Le point de départ : la banque du coach

- Toujours partir de `lib/tutor-v4/questionBank/<classe>/maths/<notion>.bank.ts` → relever
  le **notionId** et **TOUS les microId**. C'est la source de vérité (conforme au BO).
- **La fiche se nomme comme le notionId** (underscores → tirets) : `entier_calcul_pose`
  → `notion: "entier-calcul-pose"`. Jamais de table de correspondance — c'est ce qui
  allume automatiquement le badge « 📖 Fiche » dans le coach.
- **Chaque micro-compétence est couverte par un bloc** (texte OU dessin), avec un
  **commentaire de mapping micro → bloc en tête du fichier**.

## 2. Le standard qualité : « MONTRER, pas raconter »

C'est un enfant qui lit. Règle de Frédéric (13/07), renforcée :

- **Propriétés = UNE ligne chacune.** Textes courts partout, vocabulaire de la classe visée.
- **On dessine par défaut**, même là où une phrase suffirait : un **canvas du coach** par
  bloc dès que possible.
- Viser **un visuel par micro-compétence** (ne pas regrouper 2 micros dans un seul dessin,
  comme fraction + décimal l'avaient été).
- **Le défi a son propre dessin** (pas juste du texte).
- Nuance technique gardée : *canvas ≠ micro* — un dessin peut couvrir plusieurs micros —
  mais on préfère désormais **plus** de dessins.

### 2 bis. Le calibrage validé le 19/08/2026

Arrêté sur la fiche pilote `maths-5e-operations-relatifs.tsx`, relue et validée par
Frédéric (« excellent sur la structure, rien à changer »). **Les fiches suivantes se
calent dessus.**

1. **Un dessin sur CHAQUE définition ET CHAQUE propriété.** Pas seulement sur la figure
   de référence et les exemples. `FichePropriete` porte un champ `schema?: ReactNode`
   rendu par `FicheCoursClient` (ajouté le 19/08, optionnel : les fiches antérieures ne
   bougent pas). Les propriétés étaient le seul bloc du cours sans visuel — trois pavés
   de texte côte à côte, donc le bloc qu'on survole.
2. **Le canvas se choisit pour ce qu'il MONTRE, pas par habitude.** Deux propriétés
   voisines ne doivent pas porter la même image. Contre-exemple vécu : les quatre
   propriétés des relatifs portaient la même droite graduée avec deux pastilles — vu par
   un élève de 5e, quatre règles identiques où rien ne bouge. `number_line` dessine des
   points, **pas des sauts**. Les distances à 0 sont des longueurs → `schema_barre` (deux
   longueurs bout à bout, ça se voit). D'où : la barre pour les règles de calcul, la
   droite pour les règles de position.
3. **Les exemples parlent du monde de l'élève, à son âge.** Collège → score, vies,
   manches, sport, skate. Primaire → billes, goûter, cour de récré. Un élève de 5e compte
   des points bien avant de compter des euros. ⭐ Les thèmes existent déjà dans le
   moteur : `algebre` et `suite` acceptent `theme: "jeu_video" | "surf" | "requin" |
   "margouillat" | "pieces" | "eau" | "dechet" | "tresor" | "pi"`, icônes comprises.
4. **La `size` du canvas se choisit, elle ne se subit pas.** L'étalon est la banque de
   seconde (`reels-intervalles.bank.ts`) : un helper en tête de fichier, `display` fixés
   une fois, une couleur porteuse de sens par point, et `size: 360 × 90` pour une droite
   graduée — deux fois plus plate que le défaut du composant (320 × 120), parce qu'une
   droite n'a rien à montrer en hauteur. Pour un canvas à plus de trois réglages, copier
   le helper à options de `3e/maths/thales.bank.ts` (labels par défaut fusionnés avec
   ceux de l'appelant).
5. **Les nombres sont ceux de la banque, sans exception.** L'élève qui a lu la fiche doit
   retrouver ses propres exemples dans le coach.
6. **On ne promet rien qui n'existe pas.** Le bloc vidéo ne s'affiche plus que si une
   vidéo est réellement enregistrée pour la notion (`VideoNotion`, 19/08) — plus de repli
   vers la chaîne. Une fiche imprimée et distribuée en classe ne renvoie pas vers du vide.

### 2 ter. « Toujours une visualisation humaine » (Frédéric, 20/08/2026)

Un dessin juste n'est pas un dessin lisible. Trois retours en une matinée, tous
sur la même chose : le calcul était bon, l'élève ne voyait rien.

- **Dans une carte, on EMPILE, on ne juxtapose pas.** Une carte de propriété vit
  sur trois colonnes, ~250 px : trois barres côte à côte y reçoivent 80 px
  chacune. Empilées, chacune prend toute la largeur. Au-delà de deux dessins,
  passer en 2 × 2 plutôt qu'en ligne.
- **Aucune légende ne doit en toucher une autre.** Calculer la place réellement
  occupée (≈ 7 px par caractère à `fontSize` 15) avant de poser deux textes sous
  la même figure. Si ça ne tient pas, une légende passe **au-dessus**, avec une
  flèche — c'est ce qui a sauvé l'anatomie de `3x + 2`.
- **Le cadre se serre sur le dessin.** Un `viewBox` fixe laisse le sujet occuper
  un quart de son cadre : à largeur égale, un cadre ajusté double la taille du
  trait (fait sur `AngleCanvas`).
- **Vérifier en RENDANT, pas en lisant le code** : `renderToStaticMarkup` donne
  les coordonnées réelles, donc les chevauchements et les débordements. C'est
  ainsi qu'on a vu qu'un pavé 4 × 3 × 2 sortait de son cadre en silence.

### 2 quater. Le contrôle avant de committer (20/08/2026)

Frédéric : « à chaque fois je dois tout vérifier fiche par fiche, car parfois de
petites erreurs. » Ces erreurs-là ne se voient pas dans le code — elles se mesurent.
Deux outils, à passer sur CHAQUE fiche :

1. **`node scripts/apercu-canvas.mjs <figures.json> <sortie.html>`** — rend les dessins
   hors du site (jiti + `renderToStaticMarkup`) dans les trois largeurs réelles d'un
   bloc : **250 px** (carte de propriété sur trois colonnes), **340 px** (téléphone),
   **400 px** (exemple sur ordinateur). Il affiche, et refuse sous 11 px, **la taille
   finale des lettres** une fois le dessin mis à l'échelle de son bloc.
2. **La page ouverte, la fenêtre en 375 px**, puis dans la console :
   pour chaque `svg`, `police × largeurAffichée ÷ largeurViewBox`. C'est ainsi qu'on a
   découvert que le bloc d'un dessin ne fait que **226 px** sur un téléphone — et que la
   moitié des dessins de la première fiche de français y étaient sous 10 px.

⛔ **Deux blocs côte à côte, jamais sans écart ni sans retour à la ligne.** Dans une
carte, on empile (§ 2 ter) ; dans un aperçu, `gap` explicite et `flex-wrap`.

⛔ **Deux pièges de canvas à connaître** (le reste est dans `types_canvas.ts`) :
`SuiteCanvas` imprime « Suite » en titre **en dur** et étiquette ses cases « terme 1,
terme 2 » — ses flèches sont donc inutilisables ailleurs que sur une vraie suite ;
`fonctionGraphique` est le seul `kind` en camelCase.

## 3. Les canvas (au lieu de SVG dessinés à la main)

Via `CanvasRenderer` (types dans `lib/tutor-v4/types_canvas.ts`) — les MÊMES dessins que
dans les exercices du coach.

⭐ **Ce que chaque canvas montre, et ce pour quoi il ne sert pas :
[`lib/canvas/CATALOGUE.md`](../canvas/CATALOGUE.md)** — les trente `kind` en un tableau,
avec les étalons (la seconde pour la `size`, la 3e pour les helpers à options) et les
deux pièges (`suite` imprime son titre en dur, `fonctionGraphique` est le seul en
camelCase). À lire AVANT de choisir un dessin, pour ne pas relire 1 300 lignes de types.

Déjà utilisés :
- `tableau_donnees` (tableau de numération), `number_line` (droite graduée),
  `calcul_pose` (virgules alignées), `fraction` (barre/disque/grille/comparaison),
  `tableau_proportionnalite`, `schema_barre`.

À venir pour la géométrie / les données :
- `triangle`, `quadrilatere`, `angle`, `cercle`, `droites`, `reperage`,
  `figure_libre` (aires/périmètres sur quadrillage), `solide_3d` / `section_solide`,
  `transformation` (symétrie), `stat_graph`, `probabilites`, `scratch` (algo).

## 3 bis. Le français (depuis le 20/08/2026)

La matière s'ouvre avec `francais-cm2-grammaire-orthographe.tsx`, calée sur le modèle
5e. Trois choses la distinguent :

- **Un seul canvas porte la matière** : `phrase` (voir le CATALOGUE). On dessine la
  phrase, pas des schémas décoratifs.
- **Les phrases viennent de la banque** comme les nombres en maths — le cycle 3 est
  généré (`questionBank/cycle3/francais/buildCycle3FrancaisBank.ts`), les micros sont
  dans `knowledge/francais/<classe>/microSkills.ts`.
- **Ça sert aussi au CRPE.** Même programme, et surtout même méthode : le concours
  attend les manipulations syntaxiques (poser la question au verbe, déplacer,
  supprimer, remplacer), pas des définitions récitées. Ce sont les trois réflexes du
  bloc `methode`, et c'est précisément ce que le canvas `phrase` sait montrer.

Les encarts de la page de garde (la dictée du jour…) vivent dans
`components/fiches/EncartsFiche.tsx` — une entrée par encart, filtrée par matière :
on n'ouvre plus `FicheCoursClient` pour changer un lien.

## 4. L'anatomie d'une fiche (`FicheCoursData`)

Les blocs, dans l'ordre canonique :

- **titre**, **accroche** (1-2 phrases).
- **identite[]** : ~3 lignes label/valeur → « Mots clés », « Le secret », « Outil ».
- **definition{texte}** + **figure{schema, legende}** : un canvas à côté de la définition.
- **proprietes[]** : titre + une ligne.
- **reel{texte}** : le bloc « à quoi ça sert » (ancrage quotidien / 974).
- **historique{texte}** : le « le savais-tu ? ».
- **formule{contexte, expression, legende, schema?}** (si pertinent).
- **methode[]** : les 3 réflexes.
- **usages[]** : 3 situations.
- **exemples[]** : titre, données, question, **schema?** (un canvas par exemple), solution.
- **pieges[]**, **aRetenir[]** (3 lignes max), **entrainement[]** (corrections repliables + CTA coach).
- **coachHref**.
- Plus **slides[] (`ClasseSlide[]`)** pour le mode classe (projection).

## 5. Fidélité & cohérence

- **Mêmes exemples / nombres / méthodes** dans la banque, la fiche ET la vidéo — l'élève
  reconnaît le même cours partout.
- Une même fiche-donnée = **3 lectures** : élève / prof (composeur) / flashcards.

## 6. Fichiers & branchement

- Data : `lib/fiches/maths-<classe>-<notion>.tsx` (exporte `ficheX: FicheCoursData`
  + `slidesX: ClasseSlide[]`).
- Page mince : `app/fiches-cours/maths/<classe>/<notion>/page.tsx`
  (metadata SEO + `<FicheCoursClient>`).
- Ajouter au **registre** `lib/fiches/registre.ts` (titre + résumé → génère le hub) + **sitemap**.
- Vérifier : typecheck, page 200, badge Fiche dans le coach, zéro erreur console.
  ⚠️ Après renommage de route : `rm -rf .next` + redémarrer.

## Checklist finale

- [ ] Tous les `microId` de la banque couverts (mapping en tête du fichier)
- [ ] `notion` = notionId en tirets (badge Fiche auto)
- [ ] **Un visuel canvas par micro-compétence** quand ça se dessine + **le défi dessiné**
- [ ] Propriétés = une ligne ; `aRetenir` = 3 lignes max ; vocabulaire de la classe
- [ ] `reel` (ancrage 974/quotidien) + `historique` présents
- [ ] Mêmes exemples/nombres que la banque et la vidéo
- [ ] `slides[]` pour le mode classe
- [ ] Page mince + registre + sitemap + typecheck OK
- [ ] **Lisible en 375 px** : aucun texte de dessin sous 11 px une fois à l'échelle
      (§ 2 quater) — c'est le contrôle qui attrape les « petites erreurs »
- [ ] Zéro erreur console **dans un onglet neuf** (le tampon d'un onglet déjà ouvert
      garde les erreurs d'avant le correctif et fait croire à une régression)
