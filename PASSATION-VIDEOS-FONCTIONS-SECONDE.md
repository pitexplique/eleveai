# Passation — vidéos de seconde : Fonctions (23/09) puis Géométrie plane (24/09)

## ⏳ EN COURS AU 24/09 — LA GÉOMÉTRIE PLANE (`geometrie_problemes_plan`)

⛔ **CETTE NOTION N'A PAS DE FICHE DE COURS** (`lib/fiches/maths-seconde-geometrie.tsx`
n'existe pas, absente du registre). Les exemples de la vidéo viennent donc de
**la feuille d'exercices** (`762583f9`) et de la banque du coach. Si la fiche
est écrite un jour, elle doit reprendre CES MÊMES nombres.

**✅ Fabriqué et rangé** (rien n'est publié) :
- Leçon paysage **7 min 14**, 1920 × 1080, avec sa vignette, dans
  `manim/sorties/seconde/maths/paysage/fr/geometrie-problemes-plan/`.
  Script `manim/scripts/seconde/geometrie_problemes_plan.py`, voix
  `seconde-geometrie-problemes-plan.json`. Les 5 micros y passent.
- **3 shorts** dans `manim/sorties/seconde/maths/shorts/fr/geometrie-problemes-plan/`,
  avec leurs vignettes : `pente` 79 s (`geo_trigonometrie`), `projete` 80 s
  (`geo_projete_orthogonal`), `enclos` 90 s (`geo_optimisation`).
  Script `manim/scripts/seconde/geometrie_shorts.py`.
  ⛔ `geo_trig_identite` et `geo_longueurs_aires` n'ont PAS de short : gardés
  pour la leçon longue (un outil sans surprise, et la suite du projeté).

- ✅ **La fiche de cours est écrite** (`lib/fiches/maths-seconde-geometrie.tsx`,
  sa page, le registre) — commits `f67f0be9` puis `610ea1a0`, NON POUSSÉS.
  Vérifiée au rendu : 261 formules KaTeX, 0 `$` restant, les deux triangles
  dessinés. ⛔ Elle dit « rectangle en **B** » là où la vidéo dit « en A » :
  même triangle, mêmes nombres, autres lettres — voir la note du canvas.
- ✅ **Les 4 entrées du manifeste sont écrites** (`geometrie-plane`,
  `geo-pente`, `geo-projete`, `geo-enclos`), fichiers et vignettes vérifiés
  présents. `{{LONGUE}}` dans les shorts sera remplacé à la publication.

**⏳ ÉTAT DE PUBLICATION au 24/09 au soir**
- ✅ Leçon paysage EN LIGNE : **https://youtu.be/vJXmDdHk6_A**
- ✅ Short « la pente » publié — ⚠️ son URL n'a pas encore été communiquée,
  le manifeste ne la porte pas.
- ⏳ Shorts « projeté » et « enclos » : gardés pour le 25/09.

**⏳ Ce qui reste** : les URL manquantes au manifeste, puis
`notion_ressources` (leçon → `micro_id` vide ; chaque short → sa micro) et
`VIDEOS_FICHES` dans `app/sitemap.ts`.

⛔⛔ **LES DESCRIPTIONS PUBLIÉES RENVOIENT VERS LA FICHE DE COURS, QUI N'EST PAS
DÉPLOYÉE.** Les commits `f67f0be9` et `610ea1a0` ne sont pas poussés : le lien
`/fiches-cours/maths/seconde/geometrie-problemes-plan` est mort jusqu'au push.
C'est la première chose à vérifier après le push du soir.

⭐ **Un outil neuf, réutilisable** : `arc_angle(sommet, p1, p2)` dans
`geometrie_problemes_plan.py`. ⛔ `Angle(Line(B, A), Line(B, C))` de Manim
dessine parfois un CERCLE ENTIER — il raisonne sur des droites, pas sur des
demi-droites. `arc_angle` prend toujours le plus petit secteur.

---

# Passation — les vidéos du bloc « Fonctions » de seconde (23/09/2026)

> À coller tel quel dans une nouvelle session. La mémoire se charge seule ; lire
> d'abord `fonctions-seconde-feuilles-exercices` et `videos-manim-de-la-seconde`.

## ⛔⛔ À LIRE AVANT DE TAPER QUOI QUE CE SOIT

**1. LE SCRIPT DE LA VOIX SE VALIDE À DEUX.** Frédéric, 23/09 : « j'ai oublié la
règle de base : écrire le script tous les deux ». On écrit
`manim/voix/<notion>.json`, **on le colle EN ENTIER dans la réponse, et on
s'arrête là**. Pas de `generer-voix.ps1`, pas de scène, pas de rendu avant son
retour. Le 23/09, sauter cette étape a coûté **deux rendus HD complets** pour
des remarques qui, lues sur le texte, coûtaient une ligne.
Mémoire : `script-video-se-valide-a-deux`.

**2. LES NOMBRES D'UN EXEMPLE DOIVENT ÊTRE SUR LE GRAPHIQUE.** Frédéric, 23/09 :
« remplace −5 < −2 par −3 < −2, ça correspond au graphique ». Un nombre hors de
la fenêtre affichée donne à l'élève un calcul qu'il ne peut pas vérifier des
yeux. Et chaque fonction montre son ordre **juste après** qu'on ait dit son sens
de variation, les deux points allumés sur sa propre courbe.

**3. CONTRÔLE `-ql` + PLANCHES AVANT LE RENDU HD.** Trois minutes, et ça a évité
sept rendus perdus sur cette seule notion. Les trois outils sont dans le
scratchpad : `planches.py`, `images.py`, `coupes.py` (chapitres mesurés).

## Ce qui reste pour FINIR LA SECONDE (décidé le 23/09 : autre session)

Deux leçons vidéo, et rien d'autre côté vidéos du bloc Fonctions :
- `fonction_variations_extremums` — variations et extremums ;
- `signes_expression_2de` — le signe d'une expression.

Leurs feuilles d'exercices et leurs fiches existent déjà : les exemples de la
vidéo sont CEUX DE LA FICHE. Les fils que les feuilles ont dégagés le 22/09 :
variations = « un extremum est une ORDONNÉE, et il se cherche aussi aux bords » ;
signes = « dans quelle colonne tombe le zéro, où va la double barre ».
⚠️ Les feuilles de géométrie / stats / probas de seconde sont un AUTRE chantier,
suivi par la mémoire `seconde-feuilles-geometrie-stats-en-cours`.

## Où on en est

✅ **Le bloc « Fonctions » de seconde est COMPLET côté écrit et EN LIGNE**
(poussé `0af463b9` le 22/09 à 17:48, vérifié en production à 17:51 : 5 pages et
5 PDF en 200, 5 entrées au sitemap, bouton « Exercices » sur les 5 notions du
coach).

Les 5 feuilles de 20 exercices corrigés : `fonction-vocabulaire-2de`,
`fonction-variations-extremums`, `signes-expression-2de`, `fonctions-affines-2de`,
`fonctions-reference-2de`. Chacune a son script de recalcul
(`scripts/verifier-exercices-*.mjs`, 13 à 16 casses attrapées) — **les relancer
avant tout commit qui touche une feuille**.

## Le chantier vidéo du bloc Fonctions

Frédéric, 21/09 : « et après on fera les vidéos ». 23/09 au matin, il a choisi
« les vidéos du bloc Fonctions ».

Trois notions n'avaient PAS de leçon vidéo :
1. `fonction_variations_extremums` — variations et extremums ; **à faire** ;
2. `signes_expression_2de` — le signe d'une expression ; **à faire** ;
3. `fonctions_reference_2de` — les fonctions de référence ; ✅ **FAITE le 23/09**.

(`fonction_vocabulaire_2de` et `fonctions_affines_2de` en avaient déjà une.)

### ✅ Leçon 3 — « Les fonctions de référence » : EN LIGNE ET BRANCHÉE

Écrite, rendue, publiée, inscrite au sitemap et en base le 23/09. Rien à y
reprendre — elle sert de MODÈLE aux deux qui restent.

- Voix : `manim/voix/seconde-fonctions-reference.json`, 11 clips
  (Julie, `-Debit -4`).
- Scène : `manim/scripts/seconde/fonctions_reference_2de.py`, classe
  `FonctionsReference2de`, 8 écrans + les 4 de structure. Les 7 micros passent.
- Rendu HD : **7 min 23**, 1920 × 1080, son présent. Rangé avec sa vignette
  dans `manim/sorties/seconde/maths/paysage/fr/fonctions-reference/`.
- Vignette : `python manim/miniature.py eleveai-maths-seconde-fonctions-reference`
  (accroche `acc_fonctions_reference_2de` + entrée au registre, ajoutées à
  `miniature.py`). **Les cinq courbes dessinées côte à côte** — ✅ validée par
  Frédéric. Le premier jet montrait le paradoxe `−5 < −2` / `25 > 4` :
  « on ne comprend pas comparer », un raisonnement ne se lit pas en une seconde.

## ✅ TOUT EST BRANCHÉ — le chantier est CLOS (23/09)

**Les deux lignes de `notion_ressources` sont écrites**, sur son « met à jour le
badge vidéo dans coach ». ✅ **Vérifié en production** sur
`/api/notion-videos?matiere=maths&classe=seconde` : la notion sert sa leçon,
la micro sert son short. 13 notions de seconde servies, et **1 micro — la
PREMIÈRE de toute la base** : ce chemin d'affichage n'avait jamais servi, un
œil sur la ligne de `reference_carre` dans le coach ne coûte rien.

Ce qui a été écrit :

| matiere | classe | notion_id | micro_id | type | url | titre |
|---|---|---|---|---|---|---|
| maths | seconde | `fonctions_reference_2de` | `""` **vide** | video | `https://youtu.be/1g53KZ3d_XM` | Les fonctions de référence (2de) |
| maths | seconde | `fonctions_reference_2de` | `reference_carre` | video | `https://youtube.com/shorts/QcmF3CFlg4M` | Le carré retourne l'ordre |

⛔ La leçon paysage va sur la NOTION (`micro_id` vide), le short sur la MICRO.
Les 12 autres notions de seconde suivent le même format
(`titre` = « <Titre court> (2de) »).

Le script qui les a écrites : **`.tmp-inserer-ressource.mjs`** à la racine (non
suivi par git). Il lit `.env.local`, **refuse d'écrire si la ligne existe déjà**
et relit la notion à la fin ; il doit tourner depuis la racine du dépôt (node y
trouve `node_modules`). `.tmp-lire-ressources.mjs` est son pendant en LECTURE
SEULE. Les deux resservent pour la prochaine vidéo : changer les constantes.

## ✅ CE QUI EST FAIT ET POUSSÉ

- **Commit `240f0289`**, poussé : `app/sitemap.ts` porte la balise vidéo de la
  fiche. C'est le SEUL fichier suivi que ce chantier a touché — tout le reste
  vit dans `manim/` et `public/sons/`, qui ne se commitent jamais.
- **Leçon paysage en ligne** : https://youtu.be/1g53KZ3d_XM
- **Short en ligne** : https://youtube.com/shorts/QcmF3CFlg4M
- Manifeste à jour : les deux entrées portent leur `url`.

### ✅ LE SHORT « le carré retourne l'ordre » (23/09)
`FonctionsReference2deShortCarre` dans le même script, voix
`seconde-fonctions-reference-short-carre.json`, 1080 × 1920, **63,5 s**.
⚠️ Plus long que les autres shorts (44 à 54 s) : mesuré à 56,8 s de parole et
**assumé par Frédéric** (« garde 68 s »), ce n'est pas un oubli.
Vignette : `miniature_short.py`, entrée + `acc_fr_carre`.
⛔ Deux défauts d'image attrapés par les planches :
1. Une barre tracée sur un VGroup de deux lignes tombe ENTRE elles et se lit
   comme un trait de séparation — elle doit viser `phrase[1]`, la conclusion.
2. `grand()` borne à la largeur du cadre : une ligne LONGUE en gros corps sort
   PLUS PETITE qu'une ligne courte en petit corps, et la hiérarchie s'inverse.
   Couper l'idée forte en deux lignes courtes.
⭐ Et sa vignette : Frédéric a demandé `(−3)² > (−2)²` au lieu de `9 > 4` —
les MÊMES symboles sur les deux lignes, le retournement se voit sans calculer,
et la vignette promet alors l'écran 1 du short, pas l'écran 2.

### ✅ VERSION FINALE DE LA LEÇON (23/09, rendu terminé à 10:49)

Troisième version du script, **validée par Frédéric** (« go »), voix refaite,
rendu de contrôle vu et propre sur les 4 écrans modifiés, **rendu HD rangé**
avec sa vignette dans `manim/sorties/seconde/maths/paysage/fr/fonctions-reference/`.
1920 × 1080, **8 min 14**, son présent (fichier vérifié NEUF avant la copie —
⛔ un rendu échoué laisse celui d'avant).
Manifeste à jour : chapitres remesurés. **Il ne reste que la publication.**

### ⭐ La 3ᵉ correction : des nombres QUI SONT SUR LE GRAPHIQUE
Frédéric, 23/09 : « remplace −5 < −2 par −3 < −2, ça correspond au graphique »,
« rajoute 1 < 2 alors 1² < 2² », « fonction inverse, après avoir dit
décroissante : … on inverse le sens », « idem pour les autres fonctions ».
⛔ `−5` était **hors de la fenêtre** [−3 ; 3] : l'élève lisait un calcul qu'il
ne pouvait pas vérifier des yeux. Chaque fonction montre maintenant son ordre,
points allumés sur sa propre courbe :

| fonction | fenêtre | points | conclusion |
|---|---|---|---|
| √x | x −2→9, y −1→4 | (4 ; 2) (9 ; 3) | 4 < 9 donc √4 < √9 — gardé |
| x² | x −3→3, y −1→9 | (1 ; 1) (2 ; 4) · (−3 ; 9) (−2 ; 4) | gardé à droite, INVERSÉ à gauche |
| 1/x | x et y −4→4 | (1 ; 1) (2 ; 0,5) | 1 < 2 mais 1/1 > 1/2 — inversé |
| x³ | x −2→2, y −8→8 | (−2 ; −8) (1 ; 1) | −2 < 1 donc −8 < 1 — gardé |
| \|x\| | x −4→4, y −1→4 | (−3 ; 3) (−1 ; 1) | −3 < −1 mais 3 > 1 — inversé |

⭐ Son premier choix pour l'inverse était `2 < 4 donc 1/2 > 1/4`. Signalé :
0,25 unité d'écart sur une échelle de −4 à 4, **la baisse ne se voyait pas**.
Il a tranché `1 < 2 alors 1/1 > 1/2` — écart doublé, et les deux fractions
restent parallèles à l'œil.

### ⛔ Les deux premières corrections de Frédéric (et leur coût)
1. **La vignette** : le mot « comparer » ne montre rien → cinq dessins.
2. **La question d'accroche** : « enlève la 1re question au début », « tu peux
   mettre la question quand tu expliques racine carrée, mais pas au début ».
   La garde annonce maintenant « Deux d'entre elles refusent certains
   nombres. » ; la question « et l'image de −1 ? » s'affiche sur l'écran 1,
   seule, avant sa réponse.
   ⛔ Cette correction a coûté **un second rendu HD entier**. D'où la règle
   qu'il a énoncée ensuite : **le script de la voix se valide À DEUX, avant la
   voix et avant tout rendu** (mémoire `script-video-se-valide-a-deux`).
- Manifeste : entrée `fonctions-reference` ajoutée (63 vidéos), chapitres
  MESURÉS, description sans chevrons, avec les liens feuille + fiche.
- ⛔ RIEN N'A ÉTÉ COMMITÉ, et c'est normal : tout est dans `manim/` et
  `public/sons/`.

⭐ Cinq défauts d'image ont été attrapés par un rendu `-ql` de contrôle AVANT le
rendu HD (voir la mémoire `videos-fonctions-seconde`). Le contrôle `-ql` +
planches coûte 3 minutes et a évité trois rendus HD perdus. Les trois scripts de
contrôle vivent dans le scratchpad : `planches.py`, `images.py`, `coupes.py`.

## La chaîne, dans l'ordre (elle est rodée, ne pas l'inventer)

1. **Lire la banque du coach** puis **la fiche de cours** : les exemples de la
   vidéo sont CEUX DE LA FICHE (`lib/fiches/maths-seconde-<notion>.tsx`), et
   chaque micro-compétence a son écran (mapping en tête du script).
   ⭐ Les feuilles d'exercices écrites hier donnent les mêmes fils :
   variations = « un extremum est une ORDONNÉE, et il se cherche aussi aux
   bords » ; signes = « dans quelle colonne tombe le zéro, où va la double
   barre » ; référence = « le sens de variation permet de comparer sans
   calculer ».
2. **Écrire la voix** : `manim/voix/seconde-<notion>.json` (une clé par écran :
   `00-garde`, `00b-objectifs`, `01-…`, …, `08-defi`, `09-correction`, `10-finale`).
3. **Fabriquer la voix** (locale, gratuite) :
   `powershell -File scripts/generer-voix.ps1 -Fichier manim/voix/seconde-<notion>.json -Voix Julie -Debit -4`
   ⚠️ `-Debit -4` (le −18 du CP traîne au lycée).
4. **Écrire la scène** : `manim/scripts/seconde/<notionId>.py`, classe héritant
   de `NotionSeconde` (`manim/gabarit_seconde.py`) : `page_de_garde`,
   `page_objectifs`, écrans, défi, correction, `page_finale`, `page_abonnement`.
   `self.dire("01-…")` puis `self.attendre_voix()` : **c'est la voix qui fait la
   durée**, jamais l'inverse.
5. **Rendre** :
   `python -m manim render -qh --disable_caching manim/scripts/seconde/<fichier>.py <Scene> -o eleveai-maths-seconde-<notion-en-tirets> --media_dir manim/scripts/seconde/media`
   Chrono mesuré : 3 min 30 seul, 4 à 5 min à deux en parallèle (8 cœurs).
6. **Contrôler par planches** (scratchpad, PyAV, une image toutes les 8 s) :
   chaque défaut d'image coûte un rendu entier.
7. **Vignette** : `python manim/miniature.py <nom>` (registre dans `miniature.py`)
   — ⛔ la copier À CÔTÉ de la vidéo dans
   `manim/sorties/seconde/maths/paysage/fr/<notion>/`, pas dans `manim/miniatures/`.
   ⛔ « ✓ » sort en carré en Arial Black.
8. **Manifeste YouTube** : `manim/manifeste-youtube.json`, chapitres MESURÉS
   (scratchpad `coupes.py` : un écran commence quand l'image hors Ti-Margo
   redevient noire). ⛔ YouTube refuse les chevrons `<` `>` dans une description.
9. **Publication : PAR FRÉDÉRIC** (quota ~5 vidéos/jour).
10. **Après publication** : écrire les lignes dans `notion_ressources`
    (⛔ base de PRODUCTION : montrer le tableau, attendre son oui) puis
    `VIDEOS_FICHES` dans `app/sitemap.ts` (commit par chemin).
    ⛔ Une leçon paysage se range sur la NOTION (`micro_id` vide) ; un short va
    sur la micro.

## Les règles qui ne se discutent pas

- ⛔ **Rien de `manim/` ni de `public/sons/` dans un commit.** Commit PAR CHEMIN,
  `git diff --cached --name-only` avant. Pousser seulement sur son « pousse ».
- ⛔ Une autre session travaille souvent dans le même dépôt : `registre.ts`,
  `sitemap.ts` sont partagés — ne stager QUE ses propres morceaux.
- Chronométrer chaque étape **par l'heure des fichiers**, jamais à l'estime
  (le 22/09 j'ai annoncé « 09:40 » alors que l'horloge disait 16:15).
- Exemples concrets pris dans le monde, pas La Réunion par défaut (85 % de
  l'audience est en métropole).

## Ensuite (déjà préparé, chiffres vérifiés à la source)

Les deux épisodes « …sauf à mesurer le déclin de la nature » choisis par
Frédéric : **les baleines** (440 individus en 1958 → 24 900 en 2019, Zerbini
2019) et **les coraux** (21 % des récifs touchés en 1998 → 84 % en 2023-2025,
NOAA ; retour d'un blanchiment tous les 5,9 ans contre 10 à 15 ans pour
guérir, Hughes 2018). Format pas encore tranché ; ma recommandation : une leçon
paysage qui oppose les deux, plus un short par animal. Fin dictée par Frédéric :
« Et toi, tu fais quoi ? ». Voir la mémoire `maths-mesurer-le-declin-de-la-nature`.
