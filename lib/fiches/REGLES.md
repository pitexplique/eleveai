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

## 3. Les canvas (au lieu de SVG dessinés à la main)

Via `CanvasRenderer` (types dans `lib/tutor-v4/types_canvas.ts`) — les MÊMES dessins que
dans les exercices du coach.

Déjà utilisés :
- `tableau_donnees` (tableau de numération), `number_line` (droite graduée),
  `calcul_pose` (virgules alignées), `fraction` (barre/disque/grille/comparaison),
  `tableau_proportionnalite`, `schema_barre`.

À venir pour la géométrie / les données :
- `triangle`, `quadrilatere`, `angle`, `cercle`, `droites`, `reperage`,
  `figure_libre` (aires/périmètres sur quadrillage), `solide_3d` / `section_solide`,
  `transformation` (symétrie), `stat_graph`, `probabilites`, `scratch` (algo).

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
