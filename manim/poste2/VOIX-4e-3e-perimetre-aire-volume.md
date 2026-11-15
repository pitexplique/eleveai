# Voix de la série 4e + 3e « Périmètre, aire, volume, solides » — À VALIDER PAR FRÉDÉRIC

28 paysages (Manim) + 28 shorts (**Manim** : à partir de la 4e, pas de dessin animé —
`manim/REGLES.md`, 09/11 ; et toujours un défi dans le short, 15/11).
Elles couvrent **les 30 micros de 4e ET les 33 micros de 3e** : 20 vidéos sont faites
en 4e et branchées sur la 3e par `aussi` (convention des suites : la vidéo est tournée
dans la classe la plus basse), 8 sont propres à la 3e.
9 micros de plus sont déjà servis par la série 5e, 2 par deux vidéos 4e en ligne.

Rien n'est rendu. Après ton « oui » : le **pilote V2 `volume_pyramide`** (paysage + short)
est rendu en `-ql` pour toi, puis les 27 autres.

Banques : `4e/maths/perimetres.bank.ts` (`aire_perimetre`), `aires.bank.ts` (`aire_surface`),
`volumes.bank.ts` + `volumes-pyramide-cone.bank.ts` (`volume_solide`), `vision-espace.bank.ts`
+ `patron-pyramide.bank.ts` (`vision_espace`) ; en 3e `sections_solides.bank.ts` et
`geometrie-espace.bank.ts`. ⚠️ La fiche `maths-4e-volumes.tsx` n'a ni pyramide ni cône
(micros ajoutés le 05/11) : les exemples du pilote viennent de la banque.

**À l'écran la division s'écrit « ÷ »** ; la voix dit « divisé par ». Chaque mot dit est
écrit à l'écran. Résultats exacts, aucun arrondi sauf avec π.

## Les sujets (tes consignes du 15/11)

« Ces chapitres s'appliquent au bassin d'eau, aux maisons, aux territoires, à la santé,
aux poumons, aux muscles » — et « des sujets qui intéressent les 13-14 ans ».
Les sujets ados sont pris dans la réserve `manim/centres-interet-par-age.md`, tranche
12-14 : réseaux sociaux, musique, séries, jeux en ligne, sport, mode, smartphones,
environnement. Ton : esprit critique, humour, jamais infantilisant.

L'inventaire de ce qu'aiment les 13-14 ans, et de ce que ce chapitre peut en faire,
est à côté : `manim/poste2/SUJETS-13-14-ans.md`.

| Famille | Épisodes |
|---|---|
| **La piscine** (le sujet le plus rentable du chapitre : il donne les quatre grandeurs) | P2 la margelle d'un bassin rond · A4 la terrasse autour du bassin · V1 le volume d'eau, puis les litres et la dose de produit |
| **Bassin d'eau, pluie** | V4 la citerne à fond conique |
| **Maison** | P3 la plinthe d'une pièce en L · A1 l'écran d'un smartphone · S2 la maquette d'une maison |
| **Territoire** | P1 borner un skatepark · P5 l'enclos rond · A3 la cour du collège en L · S6 le relevé par drone · T5 le volcan coupé en deux (974) |
| **Santé, poumons, muscles** | T1 souffler dans un ballon : la capacité des poumons (kiné) · S5 la section d'une cuisse : la force d'un muscle dépend de l'aire de sa section (radiologie) |
| **Ados 13-14** | A1 l'écran du smartphone · **V2 la tonnelle du festival (pilote)** · A2 la peau d'un tambour · P3 la piste de BMX · V3 le cornet de glace · A5 les maillots floqués · S1 modéliser un personnage de jeu · S3 la planche de manga · S4 le dé à 4 faces · T2 le gobelet du cinéma rempli à mi-hauteur · T4 le tube d'une trottinette · T8 scanner un objet pour l'imprimer en 3D |

## Tableau de la série

Lettres de la bonne réponse : une permutation de A, B, C par épisode, qui tourne →
**28 A, 28 B, 28 C** sur les 84 questions, jamais deux fois la même lettre dans une vidéo.

| N° | Id | Micro(s) 4e | Aussi 3e | Sujet | Métier (prénom) | Ceinture | Q1 · Q2 · short |
|---|---|---|---|---|---|---|---|
| P1 | `4e-perimetre-polygones` | `aire_perimetre_comprendre` + rectangle, carre, triangle | comprendre, polygone | borner un skatepark | géomètre-topographe (Nour) | jaune | A · B · C |
| P2 | `4e-perimetre-cercle` | (nourrit `figure`) | `aire_perimetre_cercle` | **la margelle d'une piscine ronde** | pisciniste (Marc) | verte | B · C · A |
| P3 | `4e-perimetre-figure-composee` | `aire_perimetre_figure` | `aire_perimetre_figure_composee` | une piste de BMX avec un virage | conceptrice de pistes (Zahia) | verte | C · A · B |
| P4 | `4e-perimetre-probleme` | `aire_perimetre_probleme` | — | le tour de piste, 400 m | entraîneuse d'athlétisme (Sonia) — matrice | verte | A · C · B |
| P5 | `4e-perimetre-defi` | `aire_perimetre_defi` | `aire_perimetre_defi` | le grillage d'un enclos rond | éleveur (Thierry) — matrice | bleue | C · B · A |
| A1 | `4e-aire-rectangle-carre` | `aire_rectangle`, `aire_carre` | — | l'écran d'un smartphone | réparateur de smartphones (Noé) | jaune | B · A · C |
| A2 | `4e-aire-disque` | (nourrit `figure`) | `aire_disque` | la peau d'un tambour | fabricante de tambours (Nina) | verte | A · B · C |
| A3 | `4e-aire-figure-composee` | `aire_figure` | `aire_figure_composee` | la cour du collège en L | paysagiste (Hugo) | verte | B · C · A |
| A4 | `4e-aire-probleme` | `aire_probleme` | — | **la terrasse autour de la piscine** (l'aire du tour moins le bassin) | carreleuse (Salomé) | verte | C · A · B |
| A5 | `4e-aire-defi` | `aire_defi` | `aire_defi` | floquer les maillots d'un tournoi | imprimeur grand format (Ryan) | bleue | A · C · B |
| V1 | `4e-volume-lien-aire` | `volume_lien_aire` | — | **la piscine : aire du fond × profondeur, puis les litres et la dose** | technicienne en traitement de l'eau (Léa) | verte | C · B · A |
| **V2** | `4e-volume-pyramide` ⭐ **PILOTE** | `volume_pyramide` | `volume_pyramide` | la tonnelle du festival | monteuse de stands (Awen) | verte | **B · A · C** |
| V3 | `4e-volume-cone` | `volume_cone` | `volume_cone` | le cornet de glace | glacier (Malo) | verte | A · B · C |
| V4 | `4e-volume-defi` | `volume_defi` | `volume_defi` | la citerne à fond conique | hydrologue (Elsa) | bleue | B · C · A |
| S1 | `4e-solides-reconnaitre` | `vision_reconnaitre` | `volume_solide_reconnaitre` | modéliser un personnage de jeu | animatrice 3D (Yuna) — matrice | jaune | C · A · B |
| S2 | `4e-solides-vues` | `vision_vues` | — | la maquette d'une maison | architecte (Karim) — matrice | verte | A · C · B |
| S3 | `4e-solides-perspective` | `vision_representation` | `volume_representation` | une planche de manga | dessinatrice de BD (Maya) | verte | C · B · A |
| S4 | `4e-patron-pyramide` | `patron_pyramide` | — | le dé à 4 faces d'un jeu | fabricant de jeux (Tiago) | verte | B · A · C |
| S5 | `4e-section-comprendre` | `vision_section` | `volume_section`, `section_reconnaitre` | **la section d'une cuisse : la force du muscle** | manipulatrice en radiologie (Naïma) — matrice 3e | verte | A · B · C |
| S6 | `4e-solides-defi` | `vision_defi` | `volume_geometrie_espace_defi` | le relevé d'un bâtiment par drone | pilote de drone (Enzo) | bleue | B · C · A |
| T1 | `3e-volume-boule` | — | `volume_boule` | **souffler dans un ballon : tes poumons** | kinésithérapeute (Lina) | verte | C · A · B |
| T2 | `3e-volume-reduction-section` | — | `volume_pyramide_cone_reduction` | le gobelet du cinéma à moitié haut | responsable de salle (Adam) | bleue | A · C · B |
| T3 | `3e-section-pave-cube` | — | `section_pave_cube` | trancher un pain de mie | boulangère (Fatou) — matrice 3e | jaune | C · B · A |
| T4 | `3e-section-cylindre` | — | `section_cylindre` | couper le tube d'une trottinette | tourneur sur métaux (Oscar) | verte | B · A · C |
| T5 | `3e-section-cone-pyramide` | — | `section_cone_pyramide` | **le volcan coupé en deux (974)** | volcanologue (Jade) | verte | A · B · C |
| T6 | `3e-section-sphere` | — | `section_sphere` | les parallèles du globe | géographe (Rayan) | bleue | B · C · A |
| T7 | `3e-section-longueur` | — | `section_calculer_longueur` | la position en vol | pilote de ligne (Maëlle) — matrice 3e | bleue | C · A · B |
| T8 | `3e-section-defi` | — | `section_defi` | scanner un objet pour l'imprimer en 3D | technicien en numérisation 3D (Nathan) | marron | A · C · B |

- **Métiers** : 28 différents, 15 femmes et 13 hommes, aucun repris de la série 5e.
  Les 5 métiers encore libres de la matrice 4e et les 3 de la matrice 3e sont pris
  (V à marquer dans `lib/matrice/metiers-college.ts` après ton oui).
- **La Réunion** : une seule fois sur 56 voix (T5, le volcan coupé en deux).
- **Défis** : tous à 2 étapes. Les shorts sont des défis, pas des mini-cours.
- **Ceintures** : jaune pour une entrée, verte pour le niveau de la classe, bleue pour
  les défis, marron pour le dernier défi de 3e. Les shorts sont ceinture blanche.
- **Esprit critique** (ton des 13-14) : T2 (« la moitié de la hauteur, ce n'est pas la
  moitié du soda »), A1 (« un écran plus grand en pouces, c'est combien de surface en
  plus ? »), V2 (« le groupe de clim de 1 000 watts ne suffit pas »).

---

# V2 · `4e-volume-pyramide` — ceinture verte — ⭐ PILOTE

Micro : 4e `volume_pyramide` (+ 3e `volume_pyramide` par `aussi`).
Sujet : **la tonnelle d'un stand de festival**. Métier : Awen, monteuse de stands.
Centres : `musique`, `sciences`.
Erreurs typiques visées par les leurres (banque) : oublier le ÷ 3 (c'est le prisme),
diviser par 2, prendre l'arête pour la hauteur, confondre pyramide et prisme.

### Paysage

- **00-garde** : Le volume d'une pyramide. Combien de place y a-t-il sous un toit pointu ?
- **01-situation** : Voici Awen. Elle monte les stands d'un festival. Son stand est une tonnelle de 3 mètres sur 3, avec un toit pointu en forme de pyramide. Il fait chaud sous la toile : il faut un groupe de climatisation. Pour choisir le bon, Awen doit savoir combien de mètres cubes d'air il y a dedans.
- **02-le-tiers** : Awen prend deux formes qui ont la même base et la même hauteur : une pyramide et un prisme. Elle remplit la pyramide de sable et la verse dans le prisme. Une fois. Deux fois. Trois fois. Le prisme est plein. La pyramide tient exactement trois fois dans le prisme.
- **03-formule** : Le prisme, c'est l'aire de la base fois la hauteur. La pyramide, c'est trois fois moins. Volume de la pyramide : aire de la base, fois la hauteur, divisé par 3.
- **04-exemple** : Essayons sur un grand toit du festival. Sa base est un carré de 4 mètres de côté, sa hauteur est 3 mètres. L'aire de la base : 4 fois 4, 16 mètres carrés. 16 fois 3, 48. 48 divisé par 3 : 16. Il y a 16 mètres cubes d'air sous ce toit.
- **05-question** : Question ! Une pyramide a une base de 15 mètres carrés et une hauteur de 4 mètres. Quel est son volume ? A : 60 mètres cubes. B : 20 mètres cubes. C : 30 mètres cubes. Mets pause, et choisis !
- **05b-reponse** : Réponse B. 15 fois 4, 60. 60 divisé par 3 : 20 mètres cubes. 60, c'est le volume du prisme : le divisé par 3 a été oublié. 30, c'est divisé par 2.
- **06-piege** : Attention au piège ! La hauteur d'une pyramide, ce n'est pas l'arête qui descend du sommet vers un coin. C'est la distance du sommet à la base, bien droite. L'arête est plus longue : si on la prend, le volume est trop grand.
- **07-question** : Question ! Un prisme et une pyramide ont la même base et la même hauteur. Le prisme fait 45 mètres cubes. Quel est le volume de la pyramide ? A : 15 mètres cubes. B : 135 mètres cubes. C : 22,5 mètres cubes. Mets pause, et choisis !
- **07b-reponse** : Réponse A. La pyramide, c'est le tiers du prisme. 45 divisé par 3 : 15 mètres cubes. 135, c'est fois 3 : ça, c'est le prisme quand on connaît la pyramide.
- **08-defi** : À toi de jouer ! La tonnelle d'Awen. Les parois forment un pavé de 3 mètres sur 3, haut de 2,4 mètres. Le toit est une pyramide de même base, haute de 1,8 mètre. La climatisation demande 40 watts par mètre cube. Le groupe de 1 000 watts du festival suffit-il ? Mets pause, et cherche !
- **08b-correction** : Correction. Les parois d'abord. La base : 3 fois 3, 9 mètres carrés. 9 fois 2,4, 21,6 mètres cubes. Le toit ensuite : 9 fois 1,8, 16,2 ; divisé par 3, 5,4 mètres cubes. En tout : 21,6 plus 5,4, 27 mètres cubes. 27 fois 40, 1 080 watts. Le groupe de 1 000 watts ne suffit pas. Il en faut un de 1 200.
- **09-finale** : Ce que tu as appris. Une pyramide tient trois fois dans le prisme de même base et de même hauteur. Son volume : aire de la base, fois la hauteur, divisé par 3. La hauteur part du sommet, bien droite jusqu'à la base.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « Trois fois le même sable » (ceinture blanche)

- **00-accroche** : Awen a rempli ce prisme de sable : 60 centimètres cubes, ras bord.
- **01-defi** : Elle le verse dans des pyramides qui ont la même base et la même hauteur que lui. Combien de pyramides va-t-elle remplir ?
- **02-question** : Question ! A : 2 pyramides. B : 1 pyramide. C : 3 pyramides. Mets pause, et choisis !
- **02b-reponse** : Réponse C ! Une pyramide fait le tiers du prisme : 60 divisé par 3, 20 centimètres cubes chacune. Trois pyramides, et le prisme est vide.
- **03-visuel** : Une. Deux. Trois. Il ne reste plus un grain.
- **04-commentaire** : À toi : une pyramide fait 25 centimètres cubes. Quel est le volume du prisme de même base et de même hauteur ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

---

# LOT 1 — Volume et Solides (9 épisodes, écrits après le oui du pilote, 15/11)

Même structure que le pilote. Paysage : `00-garde … 10-abonne`. Short Manim :
`00-accroche, 01-defi, 02-question, 02b-reponse, 03-visuel, 04-commentaire, 05-abonne`.

## V1 · `4e-volume-lien-aire` — ceinture verte — **la piscine**
Micro 4e `volume_lien_aire`. Léa, technicienne en traitement de l'eau. Centres `nature-ecologie`, `sciences`.

### Paysage
- **00-garde** : Aire de base et volume. Comment passer d'un fond plat à des litres d'eau ?
- **01-situation** : Voici Léa. Elle s'occupe de l'eau des piscines. Avant de doser le produit qui garde l'eau propre, elle doit savoir combien d'eau il y a dans le bassin. Le produit se dose au mètre cube.
- **02-le-fond** : Le bassin est un rectangle de 8 mètres sur 4. Le fond, c'est une aire : 8 fois 4, 32 mètres carrés.
- **03-empiler** : Maintenant, l'eau monte. Chaque tranche d'eau d'un mètre d'épaisseur, c'est 32 mètres cubes. Le bassin a 1,5 mètre de profondeur : 32 fois 1,5, 48 mètres cubes.
- **04-methode** : La règle vaut pour tous ces solides : volume égale aire de la base, fois la hauteur. Le fond donne l'aire, la profondeur donne la hauteur.
- **05-question** : Question ! Un bassin a un fond de 20 mètres carrés et 1,5 mètre de profondeur. Quel est son volume ? A : 21,5 mètres cubes. B : 15 mètres cubes. C : 30 mètres cubes. Mets pause, et choisis !
- **05b-reponse** : Réponse C. 20 fois 1,5, 30 mètres cubes. 21,5, c'est une addition : on n'additionne pas une aire et une longueur.
- **06-piege** : Attention au piège ! Un mètre cube, ce n'est pas un litre. Un mètre cube, c'est mille litres. Un bassin de 48 mètres cubes, ce n'est pas 48 litres : c'est 48 000 litres.
- **07-question** : Question ! Le bassin fait 48 mètres cubes. Combien de litres ? A : 4 800 litres. B : 48 000 litres. C : 480 litres. Mets pause, et choisis !
- **07b-reponse** : Réponse B. Un mètre cube, c'est mille litres. 48 fois mille, 48 000 litres.
- **08-defi** : À toi de jouer ! Un autre bassin : 10 mètres sur 5, profondeur 1,4 mètre. Le produit se dose à une pastille pour 10 mètres cubes. Combien de pastilles Léa doit-elle mettre ? Mets pause, et cherche !
- **08b-correction** : Correction. Le fond : 10 fois 5, 50 mètres carrés. Le volume : 50 fois 1,4, 70 mètres cubes. Les pastilles : 70 divisé par 10, 7 pastilles.
- **09-finale** : Ce que tu as appris. Volume égale aire de la base, fois la hauteur. L'aire du fond se calcule d'abord. Un mètre cube, c'est mille litres.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « La piscine gonflable » (blanche)
- **00-accroche** : La piscine gonflable du jardin : un fond de 3 mètres carrés, 50 centimètres d'eau.
- **01-defi** : Le tuyau donne 100 litres par minute. Combien de litres faut-il mettre dedans ?
- **02-question** : Question ! A : 1 500 litres. B : 150 litres. C : 15 000 litres. Mets pause, et choisis !
- **02b-reponse** : Réponse A ! 3 fois 0,5, c'est 1,5 mètre cube. Un mètre cube fait mille litres : 1 500 litres.
- **03-visuel** : 1 500 litres, à 100 litres par minute : un quart d'heure de tuyau.
- **04-commentaire** : À toi : un fond de 6 mètres carrés et 40 centimètres d'eau. Combien de litres ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

## V3 · `4e-volume-cone` — ceinture verte — le cornet de glace
Micro 4e et 3e `volume_cone`. Malo, glacier. Centres `cuisine`, `argent-budget`.

### Paysage
- **00-garde** : Le volume d'un cône. Combien de glace tient dans un cornet ?
- **01-situation** : Voici Malo. Il est glacier. Ses cornets sont des cônes. Pour savoir combien de glace il prépare chaque matin, il doit calculer le volume d'un cornet.
- **02-le-tiers** : Le cône, c'est comme la pyramide : il tient trois fois dans le cylindre de même base et de même hauteur. Malo le montre avec du sable. Une fois. Deux fois. Trois fois. Le cylindre est plein.
- **03-formule** : La base d'un cône est un disque. Son aire : pi fois le rayon, fois le rayon. Volume du cône : pi fois le rayon, fois le rayon, fois la hauteur, divisé par 3.
- **04-exemple** : Le cornet de Malo : 3 centimètres de rayon, 12 centimètres de hauteur. Le disque de base : pi fois 3 fois 3, 9 pi centimètres carrés. On multiplie par 12 : 108 pi. On divise par 3 : 36 pi centimètres cubes. Environ 113 centimètres cubes.
- **05-question** : Question ! Un cône a un rayon de 2 centimètres et une hauteur de 9 centimètres. Quel est son volume ? A : 12 pi centimètres cubes. B : 36 pi centimètres cubes. C : 6 pi centimètres cubes. Mets pause, et choisis !
- **05b-reponse** : Réponse A. Pi fois 2 fois 2, 4 pi. Fois 9, 36 pi. Divisé par 3 : 12 pi centimètres cubes. 36 pi, c'est l'oubli du divisé par 3.
- **06-piege** : Attention au piège ! Quand on te donne le diamètre, ce n'est pas le rayon. Le rayon, c'est la moitié du diamètre. Un cornet de 6 centimètres de diamètre a 3 centimètres de rayon.
- **07-question** : Question ! Un cornet de 6 centimètres de diamètre et de 10 centimètres de hauteur. Quel est son volume ? A : 120 pi centimètres cubes. B : 30 pi centimètres cubes. C : 90 pi centimètres cubes. Mets pause, et choisis !
- **07b-reponse** : Réponse B. Le rayon vaut 3. Pi fois 3 fois 3, 9 pi. Fois 10, 90 pi. Divisé par 3 : 30 pi centimètres cubes. 120 pi, c'est le diamètre pris pour le rayon.
- **08-defi** : À toi de jouer ! Malo prépare 60 cornets. Chaque cornet fait environ 113 centimètres cubes. Un bac de glace contient 5 litres. Un seul bac suffit-il ? Mets pause, et cherche !
- **08b-correction** : Correction. 60 cornets : 113 fois 60, 6 780 centimètres cubes. Un litre fait mille centimètres cubes, donc 5 litres font 5 000 centimètres cubes. 6 780, c'est plus que 5 000 : un seul bac ne suffit pas.
- **09-finale** : Ce que tu as appris. Le cône tient trois fois dans le cylindre de même base et de même hauteur. Son volume : pi fois le rayon, fois le rayon, fois la hauteur, divisé par 3. Le rayon est la moitié du diamètre.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « Le cornet ou le pot ? » (blanche)
- **00-accroche** : Même prix : un cornet de 3 centimètres de rayon et 12 de haut, ou un pot de 3 centimètres de rayon et 4 de haut.
- **01-defi** : Le cornet est bien plus haut. Alors, lequel contient le plus de glace ?
- **02-question** : Question ! A : le cornet. B : le pot. C : les deux pareil. Mets pause, et choisis !
- **02b-reponse** : Réponse C ! Le cornet : 9 pi fois 12, divisé par 3, 36 pi. Le pot : 9 pi fois 4, 36 pi aussi. Exactement la même glace.
- **03-visuel** : Trois fois plus haut, mais divisé par 3 : ça s'annule.
- **04-commentaire** : À toi : un cône de 2 centimètres de rayon et 6 de haut. Quelle hauteur doit avoir le pot de même rayon pour contenir autant ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

## V4 · `4e-volume-defi` — ceinture bleue — la citerne d'eau de pluie
Micro 4e et 3e `volume_defi`. Elsa, hydrologue. Centres `nature-ecologie`, `meteo-climat`.

### Paysage
- **00-garde** : Défis sur les volumes. Combien de jours tient une citerne pleine ?
- **01-situation** : Voici Elsa. Elle est hydrologue : elle étudie l'eau. Elle installe une citerne qui récupère l'eau de pluie. Cette citerne est un cylindre posé sur un fond en forme de cône.
- **02-le-cylindre** : Le cylindre : 1 mètre de rayon, 3 mètres de hauteur. Son volume : pi fois 1 fois 1, fois 3. Trois pi mètres cubes, environ 9,4 mètres cubes.
- **03-le-cone** : Le fond conique : 1 mètre de rayon, 0,6 mètre de hauteur. Pi fois 1 fois 1, fois 0,6, divisé par 3. Zéro virgule 2 pi mètres cubes, environ 0,6 mètre cube.
- **04-total** : En tout : 9,4 plus 0,6, environ 10 mètres cubes. Soit 10 000 litres d'eau de pluie.
- **05-question** : Question ! Un cylindre de rayon 2 mètres et de hauteur 5 mètres. Quel est son volume ? A : 10 pi mètres cubes. B : 20 pi mètres cubes. C : 40 pi mètres cubes. Mets pause, et choisis !
- **05b-reponse** : Réponse B. Pi fois 2 fois 2, 4 pi. Fois 5, 20 pi mètres cubes. 10 pi, c'est le rayon compté une seule fois.
- **06-piege** : Attention au piège ! Pour un cylindre, on multiplie par la hauteur. Pour un cône, on multiplie par la hauteur et on divise par 3. Le même début, deux fins différentes.
- **07-question** : Question ! Un fond conique de 2 mètres de rayon et 3 mètres de hauteur. Quel est son volume ? A : 12 pi mètres cubes. B : 6 pi mètres cubes. C : 4 pi mètres cubes. Mets pause, et choisis !
- **07b-reponse** : Réponse C. Pi fois 2 fois 2, 4 pi. Fois 3, 12 pi. Divisé par 3 : 4 pi mètres cubes. 12 pi, c'est l'oubli du divisé par 3.
- **08-defi** : À toi de jouer ! La citerne d'Elsa contient 10 000 litres, et elle est pleine. La famille utilise 400 litres par jour. Il n'a pas plu depuis une semaine. Combien de jours la citerne peut-elle encore tenir ? Mets pause, et cherche !
- **08b-correction** : Correction. Pleine, elle tiendrait 10 000 divisé par 400, soit 25 jours. Mais la semaine passée en a déjà pris : 7 fois 400, 2 800 litres. Il reste 7 200 litres. 7 200 divisé par 400 : 18 jours.
- **09-finale** : Ce que tu as appris. Un solide compliqué se découpe en solides simples. On calcule chaque morceau, puis on additionne. Un mètre cube, c'est mille litres.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « La citerne et la sécheresse » (blanche)
- **00-accroche** : La citerne d'Elsa est pleine : 10 000 litres d'eau de pluie.
- **01-defi** : La famille en utilise 400 litres par jour. Combien de jours avant qu'elle soit vide ?
- **02-question** : Question ! A : 25 jours. B : 40 jours. C : 2,5 jours. Mets pause, et choisis !
- **02b-reponse** : Réponse A ! 10 000 divisé par 400, 25 jours.
- **03-visuel** : 25 jours sans pluie, et il ne reste plus rien.
- **04-commentaire** : À toi : la même citerne, mais 250 litres par jour. Combien de jours ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

## S1 · `4e-solides-reconnaitre` — ceinture jaune — le personnage de jeu vidéo
Micros 4e `vision_reconnaitre` (+ 3e `volume_solide_reconnaitre`). Yuna, animatrice 3D. Centres `jeux-video`, `cinema-series`.

### Paysage
- **00-garde** : Reconnaître les solides. À quoi voit-on qu'un solide est un prisme ?
- **01-situation** : Voici Yuna. Elle est animatrice 3D : elle fabrique les personnages d'un jeu. Elle ne part jamais d'une forme compliquée. Elle assemble des solides simples : des pavés, des cylindres, des cônes, des pyramides, une boule.
- **02-les-bases** : Un solide se reconnaît à ses bases. Le prisme droit a deux bases identiques, posées l'une au-dessus de l'autre, et des faces latérales rectangulaires. La pyramide n'a qu'une seule base, et toutes ses autres faces sont des triangles qui se rejoignent au sommet.
- **03-les-ronds** : Quand la base est un disque, il y a deux cas. Deux disques et pas de pointe : c'est un cylindre. Un disque et une pointe : c'est un cône. Et la boule n'a aucune face plate.
- **04-compter** : Yuna compte aussi les faces, les arêtes et les sommets. Une pyramide à base carrée : un carré et quatre triangles, donc cinq faces. Huit arêtes. Cinq sommets.
- **05-question** : Question ! Un solide a deux bases triangulaires et trois faces rectangulaires. Qu'est-ce que c'est ? A : une pyramide. B : un pavé droit. C : un prisme droit. Mets pause, et choisis !
- **05b-reponse** : Réponse C. Deux bases identiques et des faces latérales rectangulaires : c'est un prisme droit. La pyramide n'aurait qu'une seule base.
- **06-piege** : Attention au piège ! Ce n'est pas l'allure générale qui décide, ce sont les bases. Un cube est un pavé droit dont toutes les faces sont des carrés. Un pavé droit est aussi un prisme droit : ses bases sont des rectangles.
- **07-question** : Question ! Une pyramide a une base carrée. Combien a-t-elle de faces en tout ? A : 5. B : 4. C : 6. Mets pause, et choisis !
- **07b-reponse** : Réponse A. Le carré de la base, plus quatre triangles : cinq faces. 4, c'est oublier la base.
- **08-defi** : À toi de jouer ! Yuna modélise une fusée : un cylindre surmonté d'un cône, posé sur trois pavés. Combien de solides en tout, et combien de disques y a-t-il dans cet assemblage ? Mets pause, et cherche !
- **08b-correction** : Correction. Les solides : un cylindre, un cône, trois pavés, cinq solides. Les disques : le cylindre en a deux, le cône en a un, les pavés n'en ont aucun. Trois disques.
- **09-finale** : Ce que tu as appris. Un solide se reconnaît à ses bases, pas à son allure. Deux bases identiques : un prisme. Une seule base et des triangles : une pyramide. Un disque et une pointe : un cône.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « Le chapeau du personnage » (blanche)
- **00-accroche** : Yuna termine son personnage. Il lui manque un chapeau.
- **01-defi** : Le chapeau a une base ronde, une pointe en haut, et aucune arête sur le côté. Quel solide est-ce ?
- **02-question** : Question ! A : une pyramide. B : un cône. C : un cylindre. Mets pause, et choisis !
- **02b-reponse** : Réponse B ! Une base ronde et une pointe : c'est un cône. La pyramide aurait des arêtes, le cylindre deux disques et pas de pointe.
- **03-visuel** : Un disque, une pointe : un cône.
- **04-commentaire** : À toi : deux disques, pas de pointe, aucune arête. Quel solide ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

## S2 · `4e-solides-vues` — ceinture verte — la maquette d'une maison
Micro 4e `vision_vues`. Karim, architecte. Centres `art-design`, `histoire-geographie`.

### Paysage
- **00-garde** : Les vues d'un solide. Que voit-on de face, de dessus, de côté ?
- **01-situation** : Voici Karim. Il est architecte. Avant de construire une maquette, il dessine trois vues : de face, de dessus, de côté. Un ouvrier qui n'a jamais vu la maison doit pouvoir la fabriquer avec ces trois dessins.
- **02-l-ombre** : Une vue, c'est une ombre. On aplatit le solide sur un plan, et on garde seulement le contour. Un cylindre debout : de face, un rectangle. De dessus, un disque.
- **03-trois-vues** : La maison de Karim : un pavé surmonté d'un toit. De face, un rectangle et un triangle. De dessus, un rectangle. De côté, un rectangle et un triangle plus étroit.
- **04-methode** : Une seule vue ne suffit presque jamais. De face, un rectangle : c'est peut-être un pavé, peut-être un cylindre. Il faut la vue de dessus pour trancher.
- **05-question** : Question ! De dessus, on voit un disque. De face, un rectangle. Quel solide ? A : un cylindre. B : un cône. C : une boule. Mets pause, et choisis !
- **05b-reponse** : Réponse A. Un cylindre debout. Le cône donnerait un triangle de face. La boule donnerait un disque des deux côtés.
- **06-piege** : Attention au piège ! Une vue ne montre pas la profondeur. Deux solides très différents peuvent avoir la même vue de face. C'est pour ça qu'on en dessine toujours plusieurs.
- **07-question** : Question ! De face, un triangle. De dessus, un disque. Quel solide ? A : une pyramide. B : un prisme. C : un cône. Mets pause, et choisis !
- **07b-reponse** : Réponse C. Un cône. La pyramide donnerait un carré ou un triangle de dessus, jamais un disque.
- **08-defi** : À toi de jouer ! Karim pose un cylindre debout sur un pavé. Dessine ce qu'il voit de face, puis de dessus. Et dis combien de vues il faut pour que l'ouvrier ne se trompe pas. Mets pause, et cherche !
- **08b-correction** : Correction. De face : un rectangle large en bas, un rectangle étroit au-dessus. De dessus : le rectangle du pavé, avec un disque au milieu. Deux vues suffisent ici, parce que la vue de dessus montre le disque.
- **09-finale** : Ce que tu as appris. Une vue est une ombre : elle aplatit le solide. Une seule vue ne suffit presque jamais. De face, de dessus, de côté : ensemble, elles décrivent le solide.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « Rectangle de face » (blanche)
- **00-accroche** : De face, Karim voit un rectangle. Rien d'autre.
- **01-defi** : Il ajoute la vue de dessus : un disque. Alors, pavé ou cylindre ?
- **02-question** : Question ! A : un pavé. B : un cylindre. C : on ne peut pas savoir. Mets pause, et choisis !
- **02b-reponse** : Réponse B ! Le disque vu de dessus ne peut venir que du cylindre. Un pavé donnerait un rectangle.
- **03-visuel** : Une vue, ça ment. Deux vues, ça décide.
- **04-commentaire** : À toi : de face un triangle, de dessus un carré. Quel solide ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

## S3 · `4e-solides-perspective` — ceinture verte — la planche de manga
Micros 4e `vision_representation` (+ 3e `volume_representation`). Maya, dessinatrice de BD. Centres `art-design`, `cinema-series`.

### Paysage
- **00-garde** : La perspective cavalière. Comment dessiner un solide à plat sans mentir ?
- **01-situation** : Voici Maya. Elle dessine des mangas. Dans sa case, il y a une chambre vue en volume. Elle utilise la même méthode qu'en mathématiques : la perspective cavalière.
- **02-la-face** : La face de devant se dessine en vraie grandeur. Un cube de 3 centimètres d'arête : un carré de 3 centimètres, sans déformation.
- **03-les-fuyantes** : Ensuite, les fuyantes. Elles partent de chaque sommet, toutes parallèles entre elles, toutes de la même longueur. Et cette longueur est RÉDUITE : ce qui fuit n'est pas dessiné en vraie grandeur.
- **04-les-cachees** : Enfin, les arêtes qu'on ne voit pas se dessinent en pointillés. Elles existent, mais le solide les cache.
- **05-question** : Question ! Dans un cube dessiné en perspective cavalière, la face de devant est dessinée… A : plus petite. B : en losange. C : en vraie grandeur. Mets pause, et choisis !
- **05b-reponse** : Réponse C. La face de devant garde ses vraies mesures. Ce sont les fuyantes qui sont réduites.
- **06-piege** : Attention au piège ! Sur le dessin, deux arêtes de même longueur réelle peuvent être dessinées de longueurs différentes. On ne mesure jamais une fuyante sur le dessin pour en déduire une vraie longueur.
- **07-question** : Question ! Les arêtes cachées se dessinent… A : en gras. B : en pointillés. C : pas du tout. Mets pause, et choisis !
- **07b-reponse** : Réponse B. En pointillés. Si on ne les dessinait pas du tout, on ne saurait plus que le solide est fermé derrière.
- **08-defi** : À toi de jouer ! Maya dessine un pavé de 4 centimètres sur 2, profond de 3 centimètres. Elle réduit les fuyantes de moitié. Quelle longueur fait la fuyante sur le papier, et combien d'arêtes sont en pointillés ? Mets pause, et cherche !
- **08b-correction** : Correction. La fuyante : 3 divisé par 2, 1,5 centimètre sur le papier. Les arêtes cachées : celles du sommet du fond. Pour un pavé, il y en a trois en pointillés.
- **09-finale** : Ce que tu as appris. La face de devant est en vraie grandeur. Les fuyantes sont parallèles, de même longueur, et réduites. Les arêtes cachées sont en pointillés.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « Le cube qui penche » (blanche)
- **00-accroche** : Maya dessine un cube : d'abord un carré bien droit, puis les fuyantes.
- **01-defi** : Ses fuyantes doivent-elles être parallèles, perpendiculaires, ou en vraie longueur ?
- **02-question** : Question ! A : parallèles entre elles. B : perpendiculaires au carré. C : de la vraie longueur. Mets pause, et choisis !
- **02b-reponse** : Réponse A ! Toutes les fuyantes sont parallèles, de même longueur, et réduites. Sinon le cube se tord.
- **03-visuel** : Parallèles : le cube tient. Pas parallèles : il se tord.
- **04-commentaire** : À toi : dans un cube en perspective cavalière, combien d'arêtes sont en pointillés ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

## S4 · `4e-patron-pyramide` — ceinture verte — le dé à 4 faces
Micro 4e `patron_pyramide`. Tiago, fabricant de jeux. Centres `jeux-defis`, `art-design`.

### Paysage
- **00-garde** : Le patron d'une pyramide. Quel découpage se referme en pointe ?
- **01-situation** : Voici Tiago. Il fabrique des jeux de société. Aujourd'hui, il découpe des dés dans du carton : des dés à quatre faces, qui sont des pyramides. Pour les découper, il lui faut le patron.
- **02-deplier** : Un patron, c'est le solide déplié à plat. Chaque face y apparaît une fois, en vraie grandeur. Tiago déplie sa pyramide à base carrée : le carré reste au milieu, et les quatre triangles se rabattent autour.
- **03-compter** : Le patron a donc cinq morceaux : un carré et quatre triangles. Autant que de faces.
- **04-le-de** : Le dé à quatre faces, lui, a une base triangulaire. Son patron : quatre triangles, et rien d'autre.
- **05-question** : Question ! Le patron d'une pyramide à base carrée, combien de morceaux ? A : 4. B : 5. C : 6. Mets pause, et choisis !
- **05b-reponse** : Réponse B. Cinq : le carré de la base et quatre triangles. 4, c'est oublier la base. 6, ce serait un cube.
- **06-piege** : Attention au piège ! Les triangles doivent être collés aux côtés du carré, pas n'importe où. Si deux triangles partent du même côté, le patron ne se referme pas.
- **07-question** : Question ! Le dé à quatre faces est une pyramide à base triangulaire. Son patron ? A : 4 triangles. B : 1 carré et 4 triangles. C : 3 triangles. Mets pause, et choisis !
- **07b-reponse** : Réponse A. Quatre triangles : la base en est un, et les trois faces aussi. 3 triangles, c'est oublier la base.
- **08-defi** : À toi de jouer ! Tiago découpe une pyramide à base carrée de 6 centimètres de côté. Chaque triangle a une hauteur de 5 centimètres. Quelle est l'aire totale de carton découpé ? Mets pause, et cherche !
- **08b-correction** : Correction. Le carré : 6 fois 6, 36 centimètres carrés. Un triangle : 6 fois 5, divisé par 2, 15 centimètres carrés. Quatre triangles : 15 fois 4, 60. En tout : 36 plus 60, 96 centimètres carrés.
- **09-finale** : Ce que tu as appris. Un patron est le solide déplié à plat. Chaque face y apparaît une fois, en vraie grandeur. Une pyramide à base carrée a cinq morceaux, une pyramide à base triangulaire en a quatre.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « Le patron qui ne se referme pas » (blanche)
- **00-accroche** : Tiago veut une pyramide à base carrée. Trois patrons sont posés sur sa table.
- **01-defi** : Lequel se referme vraiment en pyramide ?
- **02-question** : Question ! A : 5 carrés. B : 4 triangles. C : 1 carré et 4 triangles. Mets pause, et choisis !
- **02b-reponse** : Réponse C ! Un carré pour la base, quatre triangles pour les côtés. 4 triangles seuls donneraient une pyramide à base triangulaire.
- **03-visuel** : On plie les quatre triangles, et la pointe se referme.
- **04-commentaire** : À toi : combien de triangles dans le patron d'un dé à quatre faces ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

## S5 · `4e-section-comprendre` — ceinture verte — **la section d'un muscle**
Micros 4e `vision_section` (+ 3e `volume_section` et `section_reconnaitre`). Naïma, manipulatrice en radiologie. Centres `corps-sante`, `technologie-ia`.

### Paysage
- **00-garde** : La section plane. Quelle forme apparaît quand on coupe un solide ?
- **01-situation** : Voici Naïma. Elle est manipulatrice en radiologie : elle règle le scanner. Le scanner ne coupe rien pour de vrai : il fabrique des images de tranches. Chaque tranche est une section.
- **02-definition** : Couper un solide par un plan, c'est le trancher. La section, c'est la surface plate qu'on voit sur la tranche, vue à plat.
- **03-le-cylindre** : Naïma scanne un bras, qui ressemble à un cylindre. Elle coupe en travers, parallèlement à la base : la section est un disque. Si elle coupait dans la longueur, elle verrait un rectangle.
- **04-le-muscle** : Et cette section sert à quelque chose. La force d'un muscle dépend de l'aire de sa section, pas de sa longueur. Deux fois plus large, ce n'est pas deux fois plus fort.
- **05-question** : Question ! On coupe un cylindre parallèlement à sa base. La section est… A : un disque. B : un rectangle. C : un triangle. Mets pause, et choisis !
- **05b-reponse** : Réponse A. Une coupe parallèle à la base d'un cylindre donne un disque, de la même taille que la base.
- **06-piege** : Attention au piège ! La forme de la section dépend de l'orientation de la coupe. Le même cylindre donne un disque en travers, et un rectangle dans la longueur. Ce n'est pas le solide qui décide tout seul.
- **07-question** : Question ! On coupe un pavé droit parallèlement à une face. La section est… A : un triangle. B : un rectangle. C : un disque. Mets pause, et choisis !
- **07b-reponse** : Réponse B. Un rectangle, identique à la face à laquelle la coupe est parallèle.
- **08-defi** : À toi de jouer ! Naïma scanne une cuisse. La section du muscle est un disque de 4 centimètres de rayon. Chez un sportif, le rayon est de 6 centimètres. De combien l'aire de la section est-elle multipliée ? Mets pause, et cherche !
- **08b-correction** : Correction. Première section : pi fois 4 fois 4, 16 pi. Deuxième : pi fois 6 fois 6, 36 pi. 36 divisé par 16, c'est 2,25. L'aire est multipliée par 2,25, alors que le rayon n'est multiplié que par 1,5.
- **09-finale** : Ce que tu as appris. La section est la surface plane obtenue en coupant un solide. Sa forme dépend de l'orientation de la coupe. Une coupe parallèle à la base garde la forme de la base.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « Deux fois plus large » (blanche)
- **00-accroche** : Le scanner coupe un bras en travers. La section du muscle est un disque.
- **01-defi** : Chez quelqu'un dont le muscle est deux fois plus large, la section est combien de fois plus grande ?
- **02-question** : Question ! A : deux fois plus grande. B : la même. C : quatre fois plus grande. Mets pause, et choisis !
- **02b-reponse** : Réponse C ! Le rayon double, mais l'aire du disque dépend du rayon multiplié par lui-même : deux fois deux, quatre.
- **03-visuel** : Rayon doublé, aire multipliée par quatre.
- **04-commentaire** : À toi : si le rayon est multiplié par 3, par combien l'aire est-elle multipliée ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

## S6 · `4e-solides-defi` — ceinture bleue — le relevé par drone
Micros 4e `vision_defi` (+ 3e `volume_geometrie_espace_defi`). Enzo, pilote de drone. Centres `technologie-ia`, `transports`.

### Paysage
- **00-garde** : Défis sur les solides. Comment calculer le volume d'un bâtiment entier ?
- **01-situation** : Voici Enzo. Il pilote un drone qui relève des bâtiments. Le drone prend des photos de dessus et de côté. Ensuite, Enzo remplace le bâtiment par des solides simples : c'est ce qu'on appelle modéliser.
- **02-modeliser** : Modéliser, c'est oublier les détails. Les fenêtres, la gouttière, la cheminée : on les enlève. Il reste un pavé pour le corps du bâtiment, et une pyramide pour le toit.
- **03-les-vues** : Les photos donnent les mesures. De dessus : un rectangle de 20 mètres sur 10. De face : un mur de 6 mètres de haut, surmonté d'un toit de 3 mètres.
- **04-decouper** : On calcule chaque solide séparément, puis on additionne. Jamais tout d'un coup.
- **05-question** : Question ! Le corps du bâtiment mesure 20 mètres sur 10, et 6 mètres de haut. Quel est son volume ? A : 360 mètres cubes. B : 1 200 mètres cubes. C : 120 mètres cubes. Mets pause, et choisis !
- **05b-reponse** : Réponse B. 20 fois 10, 200 mètres carrés de base. 200 fois 6, 1 200 mètres cubes. 360, c'est une addition des trois mesures multipliée.
- **06-piege** : Attention au piège ! Le toit n'est pas un pavé. C'est une pyramide : on n'oublie pas le divisé par 3, sinon le bâtiment devient bien plus gros qu'il n'est.
- **07-question** : Question ! Le toit est une pyramide de base 200 mètres carrés et de hauteur 3 mètres. Quel est son volume ? A : 600 mètres cubes. B : 300 mètres cubes. C : 200 mètres cubes. Mets pause, et choisis !
- **07b-reponse** : Réponse C. 200 fois 3, 600. Divisé par 3 : 200 mètres cubes. 600, c'est l'oubli du divisé par 3.
- **08-defi** : À toi de jouer ! Enzo doit chiffrer le chauffage du bâtiment entier : le corps, 1 200 mètres cubes, et le toit, 200 mètres cubes. Le chauffagiste compte 30 watts par mètre cube, mais le toit n'est pas chauffé. Quelle puissance faut-il ? Mets pause, et cherche !
- **08b-correction** : Correction. Seul le corps est chauffé : 1 200 mètres cubes. 1 200 fois 30, 36 000 watts, soit 36 kilowatts. Si Enzo avait compté le toit, il aurait ajouté 6 000 watts pour rien.
- **09-finale** : Ce que tu as appris. Modéliser, c'est remplacer un objet réel par des solides simples. On calcule chaque solide, puis on additionne. Et on lit les mesures sur les vues.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « Ce que voit le drone » (blanche)
- **00-accroche** : Le drone d'Enzo survole un bâtiment. De dessus : un rectangle.
- **01-defi** : De face : un rectangle surmonté d'un triangle. Quel solide est le toit ?
- **02-question** : Question ! A : une pyramide. B : un cylindre. C : une boule. Mets pause, et choisis !
- **02b-reponse** : Réponse A ! Un triangle de face et un rectangle de dessus : c'est une pyramide posée sur le pavé.
- **03-visuel** : Deux vues, et le bâtiment devient deux solides.
- **04-commentaire** : À toi : de dessus un disque, de face un triangle. Quel toit ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

---

# LOT 2 — Périmètre et Aire (10 épisodes)

## P1 · `4e-perimetre-polygones` — ceinture jaune — borner un skatepark
Micros 4e `aire_perimetre_comprendre`, `_rectangle`, `_carre`, `_triangle` (+ 3e `comprendre`, `polygone`).
Nour, géomètre-topographe. Centres `sport`, `technologie-ia`.

### Paysage
- **00-garde** : Le périmètre. Combien mesure le tour d'une figure ?
- **01-situation** : Voici Nour. Elle est géomètre-topographe : elle mesure les terrains. La commune veut un skatepark. Avant les travaux, Nour doit borner le terrain et dire combien de mètres de barrière il faudra.
- **02-comprendre** : Le périmètre, c'est la longueur du tour. Nour marche le long du bord, et elle additionne tout ce qu'elle parcourt. Rien de ce qui est à l'intérieur ne compte.
- **03-rectangle** : Le terrain est un rectangle de 20 mètres sur 12. Le tour : 20 plus 12 plus 20 plus 12, 64 mètres. Plus court : 20 plus 12, 32, fois 2, 64 mètres.
- **04-carre-triangle** : Si la figure est un carré, les quatre côtés sont égaux : côté fois 4. Si c'est un triangle, on additionne ses trois côtés, et il n'y a pas de raccourci.
- **05-question** : Question ! Un rectangle mesure 12 mètres sur 5. Quel est son périmètre ? A : 34 mètres. B : 60 mètres. C : 17 mètres. Mets pause, et choisis !
- **05b-reponse** : Réponse A. 12 plus 5, 17, fois 2, 34 mètres. 60, c'est l'aire. 17, c'est la longueur plus la largeur, le tour n'est pas fini.
- **06-piege** : Attention au piège ! Un périmètre se mesure en mètres, jamais en mètres carrés. Le mètre carré, c'est pour la surface. Si ta réponse est en mètres carrés, tu as calculé autre chose.
- **07-question** : Question ! Un carré a 7 mètres de côté. Quel est son périmètre ? A : 49 mètres. B : 28 mètres. C : 14 mètres. Mets pause, et choisis !
- **07b-reponse** : Réponse B. 7 fois 4, 28 mètres. 49, c'est 7 fois 7 : c'est l'aire. 14, c'est seulement deux côtés.
- **08-defi** : À toi de jouer ! Le skatepark est un rectangle de 20 mètres sur 12. Nour pose une barrière tout autour, sauf une entrée de 3 mètres. La barrière coûte 25 euros le mètre. Combien va-t-elle coûter ? Mets pause, et cherche !
- **08b-correction** : Correction. Le tour : 20 plus 12, 32, fois 2, 64 mètres. Moins l'entrée : 64 moins 3, 61 mètres de barrière. Le prix : 61 fois 25, 1 525 euros.
- **09-finale** : Ce que tu as appris. Le périmètre est la longueur du tour. Pour un rectangle : longueur plus largeur, fois 2. Pour un carré : côté fois 4. Pour un triangle : on additionne les trois côtés.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « Le triangle du skatepark » (blanche)
- **00-accroche** : Au coin du skatepark, une rampe triangulaire : 8 mètres, 6 mètres, 10 mètres.
- **01-defi** : Nour doit poser une bordure tout autour de ce triangle. Combien de mètres ?
- **02-question** : Question ! A : 48 mètres. B : 14 mètres. C : 24 mètres. Mets pause, et choisis !
- **02b-reponse** : Réponse C ! 8 plus 6 plus 10, 24 mètres. 48, c'est 8 fois 6 : ce serait une aire. 14, c'est deux côtés oubliés en route.
- **03-visuel** : Trois côtés, une addition : 24 mètres.
- **04-commentaire** : À toi : un triangle de 5 mètres, 12 mètres et 13 mètres. Son périmètre ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

## P2 · `4e-perimetre-cercle` — ceinture verte — **la margelle d'une piscine ronde**
Micro 3e `aire_perimetre_cercle` (et nourrit la 4e `aire_perimetre_figure`). Marc, pisciniste.
Centres `nature-ecologie`, `argent-budget`.

### Paysage
- **00-garde** : La longueur d'un cercle. Combien mesure le tour d'un rond ?
- **01-situation** : Voici Marc. Il installe des piscines. Autour d'un bassin rond, il pose la margelle : la bordure sur laquelle on s'assoit. Elle se vend au mètre. Combien de mètres faut-il commander ?
- **02-le-nombre-pi** : Marc enroule une ficelle autour du bassin, puis il la déroule. Le tour fait un peu plus de trois fois le diamètre. Un peu plus de trois : c'est pi, environ 3,14. Ce nombre est le même pour tous les cercles du monde.
- **03-formule** : La longueur d'un cercle : pi fois le diamètre. Et comme le diamètre vaut deux rayons, on l'écrit aussi 2 fois pi fois le rayon.
- **04-exemple** : Le bassin de Marc a 4 mètres de diamètre. Sa longueur : pi fois 4, 4 pi mètres. Environ 12,6 mètres de margelle.
- **05-question** : Question ! Un cercle a un rayon de 3 mètres. Quelle est sa longueur ? A : 3 pi mètres. B : 6 pi mètres. C : 9 pi mètres. Mets pause, et choisis !
- **05b-reponse** : Réponse B. 2 fois pi fois 3, 6 pi mètres. 9 pi, c'est pi fois 3 fois 3 : c'est l'aire du disque, pas le tour.
- **06-piege** : Attention au piège ! Rayon ou diamètre : il faut savoir lequel on te donne. Avec le diamètre, on multiplie par pi une seule fois. Avec le rayon, on multiplie par 2 et par pi.
- **07-question** : Question ! Un bassin a 5 mètres de diamètre. Quelle est sa longueur ? A : 10 pi mètres. B : 25 pi mètres. C : 5 pi mètres. Mets pause, et choisis !
- **07b-reponse** : Réponse C. Pi fois 5, 5 pi mètres. 10 pi, c'est avoir pris le diamètre pour un rayon.
- **08-defi** : À toi de jouer ! Le bassin fait 6 mètres de diamètre. Marc pose une barrière de sécurité à 1 mètre du bord, tout autour. La barrière coûte 40 euros le mètre. Combien coûte-t-elle ? Mets pause, et cherche !
- **08b-correction** : Correction. Le rayon du bassin : 6 divisé par 2, 3 mètres. La barrière est 1 mètre plus loin : rayon 4 mètres. Sa longueur : 2 fois pi fois 4, 8 pi, environ 25,1 mètres. Le prix : 25,1 fois 40, environ 1 005 euros.
- **09-finale** : Ce que tu as appris. La longueur d'un cercle vaut pi fois son diamètre, ou 2 fois pi fois son rayon. Pi vaut environ 3,14. Le tour fait un peu plus de trois diamètres.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « La margelle au mètre » (blanche)
- **00-accroche** : Le bassin de Marc fait 4 mètres de diamètre. Sa margelle coûte 40 euros le mètre.
- **01-defi** : Le tour du bassin mesure environ 12,6 mètres. Combien va coûter la margelle ?
- **02-question** : Question ! A : environ 504 euros. B : environ 160 euros. C : environ 50 euros. Mets pause, et choisis !
- **02b-reponse** : Réponse A ! 12,6 fois 40, environ 504 euros. 160, c'est avoir compté 4 mètres de tour au lieu de 12,6.
- **03-visuel** : Un bassin de 4 mètres de large fait plus de 12 mètres de tour.
- **04-commentaire** : À toi : un bassin de 6 mètres de diamètre. Quelle est la longueur de sa margelle ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

## P3 · `4e-perimetre-figure-composee` — ceinture verte — la piste de BMX
Micros 4e `aire_perimetre_figure` (+ 3e `aire_perimetre_figure_composee`). Zahia, conceptrice de pistes.
Centres `sport`, `art-design`.

### Paysage
- **00-garde** : Le périmètre d'une figure composée. Que compte-t-on, et que laisse-t-on ?
- **01-situation** : Voici Zahia. Elle dessine des pistes de BMX. Sa piste a trois lignes droites et un virage arrondi. Il faut une bordure tout autour. Combien de mètres ?
- **02-faire-le-tour** : La méthode est simple : on part d'un point, on fait le tour, et on additionne tout ce qu'on parcourt. Un trait qui passe à l'intérieur ne compte pas : on ne marche pas dessus.
- **03-le-demi-cercle** : Le virage est un demi-cercle de 20 mètres de diamètre. Un cercle entier mesurerait pi fois 20. La moitié : pi fois 20, divisé par 2, soit 10 pi mètres. Environ 31,4 mètres.
- **04-additionner** : Les trois lignes droites font 30, 20 et 30 mètres, soit 80 mètres. Plus le virage : 80 plus 31,4, environ 111,4 mètres de bordure.
- **05-question** : Question ! Un demi-cercle a 10 mètres de diamètre. Quelle est la longueur de son arc ? A : 10 pi mètres. B : 100 pi mètres. C : 5 pi mètres. Mets pause, et choisis !
- **05b-reponse** : Réponse C. Pi fois 10, divisé par 2 : 5 pi mètres. 10 pi, c'est le cercle entier.
- **06-piege** : Attention au piège ! Quand on coupe une figure en deux morceaux pour calculer, le trait de coupe apparaît sur le dessin, mais il n'est pas sur le contour. Il ne compte pas dans le périmètre.
- **07-question** : Question ! Dans une figure composée, le trait intérieur qui sépare les deux morceaux… A : ne compte pas. B : compte une fois. C : compte deux fois. Mets pause, et choisis !
- **07b-reponse** : Réponse A. Il ne compte pas. Le périmètre, c'est le tour : seul ce qui est sur le bord compte.
- **08-defi** : À toi de jouer ! La piste de Zahia : trois côtés droits de 20 mètres, et un demi-cercle de 20 mètres de diamètre pour fermer. La bordure coûte 18 euros le mètre. Quel est le prix ? Mets pause, et cherche !
- **08b-correction** : Correction. Les droites : 20 fois 3, 60 mètres. Le demi-cercle : pi fois 20, divisé par 2, environ 31,4 mètres. Le tour : 60 plus 31,4, environ 91,4 mètres. Le prix : 91,4 fois 18, environ 1 645 euros.
- **09-finale** : Ce que tu as appris. Le périmètre d'une figure composée s'obtient en faisant le tour. Un demi-cercle vaut pi fois le diamètre, divisé par 2. Les traits intérieurs ne comptent pas.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « Le virage qui compte double » (blanche)
- **00-accroche** : La piste de Zahia : trois côtés droits de 20 mètres, et un virage en demi-cercle de 20 mètres de diamètre.
- **01-defi** : Combien mesure le tour complet de la piste ?
- **02-question** : Question ! A : 80 mètres. B : environ 91,4 mètres. C : environ 123 mètres. Mets pause, et choisis !
- **02b-reponse** : Réponse B ! Les droites : 60 mètres. Le demi-cercle : pi fois 20, divisé par 2, environ 31,4. En tout, environ 91,4 mètres.
- **03-visuel** : Le virage ajoute 31 mètres, pas 20.
- **04-commentaire** : À toi : un demi-cercle de 14 mètres de diamètre. Quelle est la longueur de son arc ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

## P4 · `4e-perimetre-probleme` — ceinture verte — le tour de piste
Micro 4e `aire_perimetre_probleme`. Sonia, entraîneuse d'athlétisme. Centres `sport`, `corps-sante`.

### Paysage
- **00-garde** : Un problème de périmètre. Pourquoi un tour de piste fait-il 400 mètres ?
- **01-situation** : Voici Sonia. Elle entraîne des coureurs. Sur le stade, un tour de piste fait 400 mètres, dans le couloir du bord intérieur. Mais d'où vient ce nombre ?
- **02-la-piste** : La piste est faite de deux lignes droites et de deux virages. Chaque ligne droite mesure environ 85 mètres. Chaque virage est un demi-cercle de 36 mètres de rayon.
- **03-les-virages** : Les deux demi-cercles mis bout à bout font un cercle entier. Sa longueur : 2 fois pi fois 36, soit 72 pi mètres. Environ 226 mètres.
- **04-total** : Les droites : 85 fois 2, 170 mètres. En tout : 170 plus 226, environ 396 mètres. On arrondit à 400 : c'est le tour de piste.
- **05-question** : Question ! Deux demi-cercles de rayon 36 mètres, mis bout à bout, font un cercle. Quelle est sa longueur ? A : 72 pi mètres. B : 36 pi mètres. C : 1 296 pi mètres. Mets pause, et choisis !
- **05b-reponse** : Réponse A. 2 fois pi fois 36, 72 pi mètres. 1 296 pi, c'est 36 fois 36 fois pi : c'est une aire.
- **06-piege** : Attention au piège ! Dans un problème, on cherche d'abord ce qu'on demande. Ici, on demande une longueur, donc des mètres. Une réponse en mètres carrés serait une surface : ce n'est pas la question.
- **07-question** : Question ! 72 pi mètres, c'est environ… A : 113 mètres. B : 452 mètres. C : 226 mètres. Mets pause, et choisis !
- **07b-reponse** : Réponse C. 72 fois 3,14, environ 226 mètres. 113, c'est la moitié : un seul virage.
- **08-defi** : À toi de jouer ! Sonia fait courir 12 tours. Un coureur du couloir extérieur tourne 3 mètres plus loin du centre : son virage a donc 3 mètres de rayon en plus. Combien de mètres parcourt-il en plus sur les 12 tours ? Mets pause, et cherche !
- **08b-correction** : Correction. Par tour, les deux virages font un cercle de rayon 39 au lieu de 36. La différence : 2 fois pi fois 39 moins 2 fois pi fois 36, soit 2 fois pi fois 3, environ 18,8 mètres par tour. Sur 12 tours : 18,8 fois 12, environ 226 mètres de plus.
- **09-finale** : Ce que tu as appris. Un problème de périmètre se découpe : les parties droites, puis les parties rondes. Deux demi-cercles font un cercle. Et la réponse est toujours une longueur.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « Cinq tours » (blanche)
- **00-accroche** : Sonia fait courir cinq tours de piste. Un tour, c'est 400 mètres.
- **01-defi** : Ça fait combien de kilomètres ?
- **02-question** : Question ! A : 20 kilomètres. B : 2 kilomètres. C : 200 mètres. Mets pause, et choisis !
- **02b-reponse** : Réponse B ! 400 fois 5, 2 000 mètres. Et 2 000 mètres, c'est 2 kilomètres.
- **03-visuel** : Cinq tours, et le compteur affiche 2 kilomètres.
- **04-commentaire** : À toi : combien de tours pour courir 10 kilomètres ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

## P5 · `4e-perimetre-defi` — ceinture bleue — l'enclos
Micros 4e et 3e `aire_perimetre_defi`. Thierry, éleveur. Centres `animaux`, `nature-ecologie`.

### Paysage
- **00-garde** : Défis sur les périmètres. Combien de grillage pour un enclos ?
- **01-situation** : Voici Thierry. Il est éleveur. Il veut agrandir l'enclos de ses chèvres. Le grillage coûte cher : il doit calculer juste, sans en commander trop ni trop peu.
- **02-le-demi-disque** : Le premier enclos est un demi-disque de 10 mètres de rayon. Attention : le tour d'un demi-disque, ce n'est pas seulement l'arc. C'est l'arc, plus le diamètre qui le ferme.
- **03-calcul** : L'arc : pi fois 20, divisé par 2, soit 10 pi mètres, environ 31,4. Le diamètre : 20 mètres. Le tour complet : 31,4 plus 20, environ 51,4 mètres.
- **04-comparer** : Thierry hésite avec un enclos carré de même aire. Un carré de 400 mètres carrés a un côté de 20 mètres, donc un tour de 80 mètres. Même place pour les chèvres, bien plus de grillage.
- **05-question** : Question ! Le tour d'un demi-disque de 10 mètres de rayon, c'est… A : 10 pi mètres. B : 20 pi mètres. C : 10 pi plus 20 mètres. Mets pause, et choisis !
- **05b-reponse** : Réponse C. L'arc fait 10 pi mètres, et le diamètre de 20 mètres ferme la figure : il est sur le contour, il compte.
- **06-piege** : Attention au piège ! Deux enclos de même aire n'ont pas le même tour. Plus la figure est ronde, moins il faut de grillage pour la même surface.
- **07-question** : Question ! Un enclos carré a une aire de 400 mètres carrés. Quel est son côté ? A : 100 mètres. B : 20 mètres. C : 40 mètres. Mets pause, et choisis !
- **07b-reponse** : Réponse B. 20 fois 20, 400 mètres carrés. 100, c'est 400 divisé par 4 : ce serait le quart du tour, pas le côté.
- **08-defi** : À toi de jouer ! Thierry a 100 mètres de grillage. Il hésite entre un enclos carré et un enclos rond, en utilisant tout le grillage. Lequel donne le plus de place à ses chèvres ? Mets pause, et cherche !
- **08b-correction** : Correction. Le carré : 100 divisé par 4, côté 25 mètres. Son aire : 25 fois 25, 625 mètres carrés. Le rond : 100 égale 2 fois pi fois le rayon, donc le rayon vaut environ 15,9 mètres. Son aire : pi fois 15,9 fois 15,9, environ 796 mètres carrés. Le rond gagne, de 170 mètres carrés.
- **09-finale** : Ce que tu as appris. Le tour d'un demi-disque comprend son diamètre. À grillage égal, le rond donne plus de place que le carré. Et l'aire ne se déduit jamais du périmètre tout seul.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « Deux fois plus grand ? » (blanche)
- **00-accroche** : Thierry double le rayon de son enclos rond.
- **01-defi** : Le grillage qui en fait le tour est multiplié par combien ?
- **02-question** : Question ! A : 2. B : 4. C : 3. Mets pause, et choisis !
- **02b-reponse** : Réponse A ! Le tour vaut 2 fois pi fois le rayon : si le rayon double, le tour double. C'est l'aire qui serait multipliée par 4.
- **03-visuel** : Rayon doublé : grillage doublé, mais place multipliée par quatre.
- **04-commentaire** : À toi : si le rayon est multiplié par 3, par combien le grillage est-il multiplié ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

## A1 · `4e-aire-rectangle-carre` — ceinture jaune — l'écran du smartphone
Micros 4e `aire_rectangle` et `aire_carre`. Noé, réparateur de smartphones. Centres `technologie-ia`, `argent-budget`.

### Paysage
- **00-garde** : L'aire d'un rectangle et d'un carré. Combien de place prend une surface ?
- **01-situation** : Voici Noé. Il répare des smartphones. Quand un écran est cassé, il découpe un film de protection à la bonne taille. Le film se vend au centimètre carré : il doit calculer la surface de l'écran.
- **02-compter** : L'écran mesure 14 centimètres sur 7. Noé le quadrille en carrés de 1 centimètre de côté. Sept rangées de 14 carrés : 98 carrés. L'aire est de 98 centimètres carrés.
- **03-formule** : On n'a pas besoin de compter à chaque fois. Aire d'un rectangle : longueur fois largeur. 14 fois 7, 98 centimètres carrés.
- **04-le-carre** : Le carré est un rectangle dont les côtés sont égaux. Son aire : côté fois côté. Un carré de 9 centimètres : 9 fois 9, 81 centimètres carrés.
- **05-question** : Question ! Un écran mesure 15 centimètres sur 7. Quelle est son aire ? A : 44 centimètres carrés. B : 105 centimètres carrés. C : 22 centimètres carrés. Mets pause, et choisis !
- **05b-reponse** : Réponse B. 15 fois 7, 105 centimètres carrés. 44, c'est le périmètre. 22, c'est la longueur plus la largeur.
- **06-piege** : Attention au piège ! L'aire se mesure en centimètres carrés, le tour en centimètres. Deux écrans de même tour peuvent avoir des surfaces différentes.
- **07-question** : Question ! Un carré a 9 centimètres de côté. Quelle est son aire ? A : 81 centimètres carrés. B : 36 centimètres carrés. C : 18 centimètres carrés. Mets pause, et choisis !
- **07b-reponse** : Réponse A. 9 fois 9, 81 centimètres carrés. 36, c'est le périmètre : 9 fois 4.
- **08-defi** : À toi de jouer ! Noé doit protéger deux écrans de 15 centimètres sur 7. Le film se vend par feuilles de 150 centimètres carrés, à 12 euros la feuille. Combien de feuilles, et combien ça coûte ? Mets pause, et cherche !
- **08b-correction** : Correction. Un écran : 15 fois 7, 105 centimètres carrés. Deux écrans : 105 fois 2, 210 centimètres carrés. Une feuille couvre 150 : il en faut 2, car une seule ne suffit pas. Le prix : 12 fois 2, 24 euros.
- **09-finale** : Ce que tu as appris. L'aire d'un rectangle est longueur fois largeur. L'aire d'un carré est côté fois côté. Une aire se mesure en unités carrées.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « Le plus grand écran » (blanche)
- **00-accroche** : Deux téléphones, même prix. L'un fait 16 centimètres sur 7, l'autre 15 sur 8.
- **01-defi** : Le premier est plus long. Mais lequel a le plus grand écran ?
- **02-question** : Question ! A : le premier. B : les deux pareil. C : le deuxième. Mets pause, et choisis !
- **02b-reponse** : Réponse C ! Le premier : 16 fois 7, 112 centimètres carrés. Le deuxième : 15 fois 8, 120. Le plus long n'est pas le plus grand.
- **03-visuel** : Plus long, et pourtant moins de surface.
- **04-commentaire** : À toi : un écran de 14 centimètres sur 9. Quelle est son aire ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

## A2 · `4e-aire-disque` — ceinture verte — la peau d'un tambour
Micro 3e `aire_disque` (et nourrit la 4e `aire_figure`). Nina, fabricante de tambours. Centres `musique`, `art-design`.

### Paysage
- **00-garde** : L'aire d'un disque. Combien de peau pour un tambour ?
- **01-situation** : Voici Nina. Elle fabrique des tambours. Sur chaque tambour, elle tend une peau ronde. La peau se vend au décimètre carré : Nina doit calculer l'aire d'un disque.
- **02-pas-le-tour** : Attention : le tour du tambour et la peau, ce ne sont pas la même chose. Le tour est une longueur. La peau est une surface.
- **03-formule** : L'aire d'un disque : pi fois le rayon, fois le rayon. Le rayon y passe deux fois, et c'est ce qui change tout.
- **04-exemple** : Le tambour de Nina a 20 centimètres de rayon. Son aire : pi fois 20 fois 20, soit 400 pi centimètres carrés. Environ 1 256 centimètres carrés.
- **05-question** : Question ! Un disque a 5 centimètres de rayon. Quelle est son aire ? A : 25 pi centimètres carrés. B : 10 pi centimètres carrés. C : 5 pi centimètres carrés. Mets pause, et choisis !
- **05b-reponse** : Réponse A. Pi fois 5 fois 5, 25 pi centimètres carrés. 10 pi, c'est la longueur du cercle, pas son aire.
- **06-piege** : Attention au piège ! Quand on donne le diamètre, il faut d'abord le diviser par 2. Une peau de 40 centimètres de diamètre a 20 centimètres de rayon : sinon, l'aire est multipliée par 4 sans raison.
- **07-question** : Question ! Une peau mesure 40 centimètres de diamètre. Quelle est son aire ? A : 1 600 pi centimètres carrés. B : 400 pi centimètres carrés. C : 80 pi centimètres carrés. Mets pause, et choisis !
- **07b-reponse** : Réponse B. Le rayon vaut 20. Pi fois 20 fois 20, 400 pi centimètres carrés. 1 600 pi, c'est le diamètre pris pour le rayon.
- **08-defi** : À toi de jouer ! Nina prépare 6 tambours de 20 centimètres de rayon. La peau se vend par carrés de 50 centimètres sur 50. Combien de carrés de peau faut-il au minimum, si elle découpe un disque par carré ? Mets pause, et cherche !
- **08b-correction** : Correction. Un disque de 20 centimètres de rayon fait 40 centimètres de large : il entre tout juste dans un carré de 50. Un carré par tambour : 6 carrés. Et il reste de la chute : 2 500 moins 1 256, environ 1 244 centimètres carrés perdus par carré.
- **09-finale** : Ce que tu as appris. L'aire d'un disque vaut pi fois le rayon, fois le rayon. Le rayon est la moitié du diamètre. Le tour, lui, vaut 2 fois pi fois le rayon.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « Le tambour deux fois plus large » (blanche)
- **00-accroche** : Nina fabrique un tambour deux fois plus large que le premier.
- **01-defi** : La peau coûte combien de fois plus cher ?
- **02-question** : Question ! A : 2 fois. B : 3 fois. C : 4 fois. Mets pause, et choisis !
- **02b-reponse** : Réponse C ! L'aire vaut pi fois le rayon fois le rayon. Si le rayon double, l'aire est multipliée par 2 fois 2, donc par 4.
- **03-visuel** : Deux fois plus large, quatre fois plus de peau.
- **04-commentaire** : À toi : un tambour trois fois plus large. Combien de fois plus de peau ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

## A3 · `4e-aire-figure-composee` — ceinture verte — la cour du collège
Micros 4e `aire_figure` (+ 3e `aire_figure_composee`). Hugo, paysagiste. Centres `nature-ecologie`, `sport`.

### Paysage
- **00-garde** : L'aire d'une figure composée. Comment mesurer une surface qui n'est pas un rectangle ?
- **01-situation** : Voici Hugo. Il est paysagiste. Le collège veut du gazon synthétique dans sa cour. La cour a la forme d'un L : ce n'est ni un rectangle, ni un carré. Combien de mètres carrés faut-il commander ?
- **02-decouper** : La méthode : on découpe la figure en rectangles. Hugo trace un trait, et le L devient deux rectangles : un de 10 mètres sur 6, un autre de 4 mètres sur 3.
- **03-additionner** : Le premier : 10 fois 6, 60 mètres carrés. Le second : 4 fois 3, 12 mètres carrés. En tout : 60 plus 12, 72 mètres carrés.
- **04-soustraire** : Il y a une autre façon de faire : partir du grand rectangle et enlever le morceau manquant. Les deux méthodes donnent le même résultat. On choisit la plus simple à calculer.
- **05-question** : Question ! Une cour en L : un rectangle de 10 mètres sur 6, et un rectangle de 4 mètres sur 3. Quelle est l'aire totale ? A : 23 mètres carrés. B : 72 mètres carrés. C : 60 mètres carrés. Mets pause, et choisis !
- **05b-reponse** : Réponse B. 60 plus 12, 72 mètres carrés. 23, c'est une addition de longueurs. 60, c'est avoir oublié le deuxième morceau.
- **06-piege** : Attention au piège ! Quand on découpe, on ne compte jamais deux fois la partie commune. Et le trait qu'on a tracé ne change pas l'aire : il n'est là que pour nous aider.
- **07-question** : Question ! Un carré de 10 mètres de côté, dans lequel on enlève un carré de 4 mètres au coin. Quelle est l'aire restante ? A : 100 mètres carrés. B : 96 mètres carrés. C : 84 mètres carrés. Mets pause, et choisis !
- **07b-reponse** : Réponse C. 10 fois 10, 100. Moins 4 fois 4, 16. 100 moins 16, 84 mètres carrés. 96, c'est avoir enlevé 4 au lieu de 16.
- **08-defi** : À toi de jouer ! La cour fait 72 mètres carrés, et un rond-point planté d'arbres occupe un disque de 2 mètres de rayon, qu'on ne gazonne pas. Le gazon coûte 28 euros le mètre carré. Quel est le prix ? Mets pause, et cherche !
- **08b-correction** : Correction. Le disque : pi fois 2 fois 2, 4 pi, environ 12,6 mètres carrés. La surface à gazonner : 72 moins 12,6, environ 59,4 mètres carrés. Le prix : 59,4 fois 28, environ 1 663 euros.
- **09-finale** : Ce que tu as appris. Une figure composée se découpe en figures simples. On additionne les morceaux, ou on enlève ce qui manque. Et les traits de découpe ne changent pas l'aire.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « La terrasse en L » (blanche)
- **00-accroche** : Hugo pose du gazon sur une terrasse en L : un rectangle de 8 mètres sur 5, et un autre de 3 mètres sur 2.
- **01-defi** : Combien de mètres carrés de gazon doit-il commander ?
- **02-question** : Question ! A : 46 mètres carrés. B : 40 mètres carrés. C : 52 mètres carrés. Mets pause, et choisis !
- **02b-reponse** : Réponse A ! 8 fois 5, 40. 3 fois 2, 6. 40 plus 6, 46 mètres carrés. 40, c'est avoir oublié le petit morceau.
- **03-visuel** : Un trait, deux rectangles, une addition.
- **04-commentaire** : À toi : un L fait d'un rectangle 9 sur 4 et d'un rectangle 5 sur 2. Son aire ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

## A4 · `4e-aire-probleme` — ceinture verte — **la terrasse autour de la piscine**
Micro 4e `aire_probleme`. Salomé, carreleuse. Centres `argent-budget`, `art-design`.

### Paysage
- **00-garde** : Un problème d'aire. Combien de carrelage autour d'un bassin ?
- **01-situation** : Voici Salomé. Elle est carreleuse. Autour d'une piscine, elle pose une terrasse. Le bassin, lui, n'est pas carrelé : c'est de l'eau. Combien de mètres carrés de carrelage faut-il ?
- **02-le-grand** : Le terrain entier est un rectangle de 12 mètres sur 8. Son aire : 12 fois 8, 96 mètres carrés.
- **03-le-trou** : Le bassin est un rectangle de 8 mètres sur 4. Son aire : 8 fois 4, 32 mètres carrés. Cette surface-là ne reçoit pas de carrelage.
- **04-soustraire** : La terrasse, c'est tout le reste : 96 moins 32, 64 mètres carrés.
- **05-question** : Question ! Terrain de 12 mètres sur 8, bassin de 8 mètres sur 4. Quelle est l'aire de la terrasse ? A : 96 mètres carrés. B : 32 mètres carrés. C : 64 mètres carrés. Mets pause, et choisis !
- **05b-reponse** : Réponse C. 96 moins 32, 64 mètres carrés. 96, c'est le terrain entier, bassin compris.
- **06-piege** : Attention au piège ! Le carrelage se vend par paquets. Quand le calcul tombe entre deux paquets, on arrondit toujours au-dessus : un demi-paquet manquant, c'est un trou dans la terrasse.
- **07-question** : Question ! Le carrelage se vend par paquets de 1,5 mètre carré. Pour 64 mètres carrés, combien de paquets ? A : 43 paquets. B : 42 paquets. C : 96 paquets. Mets pause, et choisis !
- **07b-reponse** : Réponse A. 64 divisé par 1,5, environ 42,7. On ne peut pas acheter 42,7 paquets : il en faut 43.
- **08-defi** : À toi de jouer ! Un autre chantier : terrain carré de 8 mètres de côté, bassin rond de 4 mètres de diamètre au milieu. Le carrelage coûte 35 euros le mètre carré. Quel est le prix ? Mets pause, et cherche !
- **08b-correction** : Correction. Le terrain : 8 fois 8, 64 mètres carrés. Le bassin : rayon 2, donc pi fois 2 fois 2, 4 pi, environ 12,6 mètres carrés. La terrasse : 64 moins 12,6, environ 51,4 mètres carrés. Le prix : 51,4 fois 35, environ 1 799 euros.
- **09-finale** : Ce que tu as appris. Pour une surface percée, on calcule le grand, puis on enlève le trou. On arrondit toujours au-dessus pour les paquets. Et on vérifie que la réponse est en mètres carrés.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « Le bassin rond dans la terrasse » (blanche)
- **00-accroche** : Une terrasse carrée de 8 mètres de côté, un bassin rond de 4 mètres de diamètre au milieu.
- **01-defi** : Combien de mètres carrés faut-il carreler ?
- **02-question** : Question ! A : 64 mètres carrés. B : environ 51,4 mètres carrés. C : environ 12,6 mètres carrés. Mets pause, et choisis !
- **02b-reponse** : Réponse B ! Le carré : 64. Le bassin : pi fois 2 fois 2, environ 12,6. 64 moins 12,6, environ 51,4 mètres carrés.
- **03-visuel** : On carrelle tout, sauf le rond.
- **04-commentaire** : À toi : terrasse de 10 mètres de côté, bassin rond de 6 mètres de diamètre. Combien de mètres carrés ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

## A5 · `4e-aire-defi` — ceinture bleue — floquer les maillots
Micros 4e et 3e `aire_defi`. Ryan, imprimeur grand format. Centres `sport`, `argent-budget`.

### Paysage
- **00-garde** : Défis sur les aires. Combien de film pour floquer une équipe ?
- **01-situation** : Voici Ryan. Il imprime les flocages des maillots : le numéro dans le dos, et le logo rond sur la manche. Le film se vend au mètre carré, et il n'aime pas en jeter.
- **02-le-numero** : Le numéro tient dans un rectangle de 25 centimètres sur 18. Son aire : 25 fois 18, 450 centimètres carrés.
- **03-le-logo** : Le logo est un disque de 6 centimètres de rayon. Son aire : pi fois 6 fois 6, 36 pi, environ 113 centimètres carrés.
- **04-par-maillot** : Un maillot, c'est donc 450 plus 113, environ 563 centimètres carrés de film.
- **05-question** : Question ! Un rectangle de 25 centimètres sur 18. Quelle est son aire ? A : 450 centimètres carrés. B : 86 centimètres carrés. C : 43 centimètres carrés. Mets pause, et choisis !
- **05b-reponse** : Réponse A. 25 fois 18, 450 centimètres carrés. 86, c'est le périmètre.
- **06-piege** : Attention au piège ! Un mètre carré, ce n'est pas 100 centimètres carrés, c'est 10 000. Un carré d'un mètre de côté, c'est 100 centimètres sur 100.
- **07-question** : Question ! Un disque de 6 centimètres de rayon, c'est environ… A : environ 38 centimètres carrés. B : environ 226 centimètres carrés. C : environ 113 centimètres carrés. Mets pause, et choisis !
- **07b-reponse** : Réponse C. Pi fois 6 fois 6, 36 pi, environ 113 centimètres carrés. 38, c'est la longueur du cercle.
- **08-defi** : À toi de jouer ! Ryan floque 18 maillots, 563 centimètres carrés chacun. Le film se vend au mètre carré, à 30 euros, et on ne vend que des mètres entiers. Combien va-t-il payer ? Mets pause, et cherche !
- **08b-correction** : Correction. 563 fois 18, 10 134 centimètres carrés. Un mètre carré fait 10 000 centimètres carrés : ça fait un peu plus d'un mètre carré. Comme on ne vend que des mètres entiers, Ryan en achète 2, soit 60 euros.
- **09-finale** : Ce que tu as appris. On additionne les aires des morceaux, même quand ils n'ont pas la même forme. Un mètre carré vaut 10 000 centimètres carrés. Et on arrondit au-dessus quand on achète.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « Un mètre carré, c'est combien ? » (blanche)
- **00-accroche** : Ryan floque 18 maillots. Chaque flocage fait 563 centimètres carrés.
- **01-defi** : En mètres carrés, ça fait combien ?
- **02-question** : Question ! A : 101 mètres carrés. B : environ 1 mètre carré. C : environ 10 mètres carrés. Mets pause, et choisis !
- **02b-reponse** : Réponse B ! 563 fois 18, 10 134 centimètres carrés. Un mètre carré en fait 10 000 : ça fait à peine plus d'un mètre carré.
- **03-visuel** : Dix-huit flocages tiennent dans un carré d'un mètre.
- **04-commentaire** : À toi : combien de centimètres carrés dans 3 mètres carrés ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

---

# LOT 3 — Les 8 épisodes propres à la 3e

## T1 · `3e-volume-boule` — ceinture verte — **souffler dans un ballon : tes poumons**
Micro 3e `volume_boule`. Lina, kinésithérapeute. Centres `corps-sante`, `sport`.

### Paysage
- **00-garde** : Le volume d'une boule. Combien d'air tient dans un ballon ?
- **01-situation** : Voici Lina. Elle est kinésithérapeute : elle fait travailler la respiration de ses patients. Elle leur demande de souffler tout l'air de leurs poumons dans un ballon. La taille du ballon dit beaucoup de choses.
- **02-formule** : Le volume d'une boule se calcule avec son rayon : 4 fois pi, fois le rayon, fois le rayon, fois le rayon, divisé par 3. Le rayon y passe trois fois : c'est un volume.
- **03-exemple** : Le ballon gonflé mesure 10 centimètres de rayon. 10 fois 10 fois 10, mille. 4 fois pi fois mille, 4 000 pi. Divisé par 3 : environ 4 189 centimètres cubes. Soit un peu plus de 4 litres.
- **04-les-poumons** : Et c'est exactement l'ordre de grandeur d'une grande inspiration : chez un adolescent, les poumons tiennent 3 à 4 litres. Ce ballon, c'est une respiration.
- **05-question** : Question ! Une boule a 3 centimètres de rayon. Quel est son volume ? A : 12 pi centimètres cubes. B : 27 pi centimètres cubes. C : 36 pi centimètres cubes. Mets pause, et choisis !
- **05b-reponse** : Réponse C. 3 fois 3 fois 3, 27. 4 fois pi fois 27, 108 pi. Divisé par 3 : 36 pi centimètres cubes. 27 pi, c'est avoir oublié le 4 et le divisé par 3.
- **06-piege** : Attention au piège ! Le rayon est la moitié du diamètre. Comme il est multiplié trois fois, une erreur de 2 sur le rayon devient une erreur de 8 sur le volume.
- **07-question** : Question ! Une boule a 6 centimètres de diamètre. Quel est son volume ? A : 36 pi centimètres cubes. B : 288 pi centimètres cubes. C : 48 pi centimètres cubes. Mets pause, et choisis !
- **07b-reponse** : Réponse A. Le rayon vaut 3. 4 fois pi fois 27, divisé par 3 : 36 pi centimètres cubes. 288 pi, c'est le diamètre pris pour le rayon : huit fois trop.
- **08-defi** : À toi de jouer ! Lina compare deux patients. Le premier gonfle un ballon de 10 centimètres de rayon, le second un ballon de 12 centimètres de rayon. Combien de litres chacun, et combien de litres d'écart ? Mets pause, et cherche !
- **08b-correction** : Correction. Le premier : 4 fois pi fois mille, divisé par 3, environ 4 189 centimètres cubes, soit 4,2 litres. Le second : 12 fois 12 fois 12, 1 728. 4 fois pi fois 1 728, divisé par 3, environ 7 238 centimètres cubes, soit 7,2 litres. L'écart : 3 litres.
- **09-finale** : Ce que tu as appris. Le volume d'une boule vaut 4 fois pi, fois le rayon trois fois, divisé par 3. Le rayon est la moitié du diamètre. Un ballon de 20 centimètres de diamètre, c'est à peu près une respiration.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « Tout l'air de tes poumons » (blanche)
- **00-accroche** : Souffle tout l'air de tes poumons dans un ballon : environ 4 litres.
- **01-defi** : Quel rayon fait ce ballon une fois gonflé ?
- **02-question** : Question ! A : 5 centimètres. B : 10 centimètres. C : 20 centimètres. Mets pause, et choisis !
- **02b-reponse** : Réponse B ! Avec 10 centimètres de rayon : 4 fois pi fois mille, divisé par 3, environ 4 189 centimètres cubes. Soit 4,2 litres.
- **03-visuel** : Un ballon de 20 centimètres de large : c'est une respiration.
- **04-commentaire** : À toi : un ballon de 5 centimètres de rayon. Combien de litres ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

## T2 · `3e-volume-reduction-section` — ceinture bleue — le gobelet du cinéma
Micro 3e `volume_pyramide_cone_reduction`. Adam, responsable de salle de cinéma. Centres `cinema-series`, `argent-budget`.

### Paysage
- **00-garde** : La réduction par une section. À mi-hauteur, combien reste-t-il ?
- **01-situation** : Voici Adam. Il dirige une salle de cinéma. Les boissons sont servies dans des gobelets coniques. Un client se plaint : son gobelet est rempli jusqu'à la moitié de la hauteur, et il trouve qu'il n'y a pas assez. Il a raison, et les mathématiques le disent.
- **02-la-section** : Un gobelet conique, c'est un cône posé sur sa pointe. Quand on verse, la surface du liquide coupe le cône par un plan parallèle à la base : le liquide forme un petit cône, de la même forme que le gobelet. C'est une réduction.
- **03-le-rapport** : À mi-hauteur, le rapport vaut un demi. La hauteur du liquide est la moitié, et son rayon aussi.
- **04-le-cube** : Mais le volume, lui, est divisé par 2 fois 2 fois 2, c'est-à-dire par 8. Un gobelet rempli à mi-hauteur ne contient qu'un huitième de la boisson.
- **05-question** : Question ! Un gobelet conique rempli jusqu'à la moitié de sa hauteur contient quelle part du total ? A : un huitième. B : la moitié. C : un quart. Mets pause, et choisis !
- **05b-reponse** : Réponse A. Le rapport est un demi, donc le volume est divisé par 2 fois 2 fois 2, soit 8. Un huitième seulement.
- **06-piege** : Attention au piège ! Une longueur se multiplie par le rapport. Une aire se multiplie par le rapport deux fois. Un volume, par le rapport trois fois. Trois règles différentes, à ne pas mélanger.
- **07-question** : Question ! Dans une réduction de rapport un tiers, le volume est divisé par… A : 3. B : 9. C : 27. Mets pause, et choisis !
- **07b-reponse** : Réponse C. 3 fois 3 fois 3, 27. 9, ce serait pour une aire.
- **08-defi** : À toi de jouer ! Le gobelet d'Adam contient 48 centilitres une fois plein. Le serveur le remplit aux trois quarts de la hauteur, et le verre a l'air presque plein. Combien de centilitres le client a-t-il vraiment, et combien lui manque-t-il ? Mets pause, et cherche !
- **08b-correction** : Correction. Le liquide forme un petit cône de rapport trois quarts, soit 0,75. Son volume : 0,75 fois 0,75 fois 0,75, environ 0,42. 48 fois 0,42, environ 20 centilitres. Il en manque donc 28 : plus de la moitié du gobelet, alors qu'il a l'air rempli aux trois quarts.
- **09-finale** : Ce que tu as appris. Une section parallèle à la base donne une réduction. Les longueurs sont multipliées par le rapport, les aires par le rapport deux fois, les volumes par le rapport trois fois.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « La moitié du gobelet » (blanche)
- **00-accroche** : Ton gobelet conique est rempli jusqu'à la moitié de sa hauteur.
- **01-defi** : Tu as payé plein tarif. As-tu vraiment la moitié de la boisson ?
- **02-question** : Question ! A : oui, la moitié. B : non, un huitième. C : non, un quart. Mets pause, et choisis !
- **02b-reponse** : Réponse B ! La moitié de la hauteur, c'est un rapport d'un demi : le volume est divisé par 2 fois 2 fois 2, soit 8. Un huitième.
- **03-visuel** : La moitié de la hauteur, un huitième de la boisson.
- **04-commentaire** : À toi : rempli au tiers de la hauteur, quelle part du volume ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

## T3 · `3e-section-pave-cube` — ceinture jaune — la tranche de pain de mie
Micro 3e `section_pave_cube`. Fatou, boulangère. Centres `cuisine`, `art-design`.

### Paysage
- **00-garde** : La section d'un pavé. Quelle forme a une tranche ?
- **01-situation** : Voici Fatou. Elle est boulangère. Chaque matin, elle tranche des pains de mie. Un pain de mie, c'est un pavé droit. Et chaque tranche est une section.
- **02-parallele** : Quand Fatou coupe parallèlement à une face, la tranche a exactement la forme de cette face : un rectangle, de mêmes dimensions. Toutes les tranches sont identiques.
- **03-le-cube** : Si le pain était un cube de 8 centimètres, chaque tranche parallèle à une face serait un carré de 8 centimètres de côté : 64 centimètres carrés.
- **04-en-biais** : Mais si Fatou coupe en biais, la tranche change. Elle reste un rectangle, mais plus long : la diagonale est plus longue que le côté. Une coupe en biais donne toujours une section plus grande.
- **05-question** : Question ! On tranche un pain de mie parallèlement à sa face avant. La tranche est… A : un carré plus petit. B : un triangle. C : un rectangle identique à la face. Mets pause, et choisis !
- **05b-reponse** : Réponse C. Une coupe parallèle à une face donne exactement cette face, à la même taille.
- **06-piege** : Attention au piège ! La section ne dépend pas que du solide : elle dépend aussi de l'orientation de la coupe. Le même pain donne des tranches différentes selon le geste.
- **07-question** : Question ! On coupe un cube de 8 centimètres de côté parallèlement à une face. Quelle est l'aire de la section ? A : 512 centimètres carrés. B : 64 centimètres carrés. C : 32 centimètres carrés. Mets pause, et choisis !
- **07b-reponse** : Réponse B. 8 fois 8, 64 centimètres carrés. 512, c'est 8 fois 8 fois 8 : c'est le volume du cube.
- **08-defi** : À toi de jouer ! Le pain de Fatou est un pavé de 30 centimètres de long, 10 de large, 10 de haut. Elle fait des tranches de 1 centimètre d'épaisseur, parallèles à la face carrée. Combien de tranches, et quelle est l'aire d'une tranche ? Mets pause, et cherche !
- **08b-correction** : Correction. Les tranches sont parallèles au carré de 10 sur 10 : il y en a 30, une par centimètre de longueur. Chaque tranche : 10 fois 10, 100 centimètres carrés.
- **09-finale** : Ce que tu as appris. Une section parallèle à une face d'un pavé est un rectangle identique à cette face. La forme de la section dépend de l'orientation de la coupe. Une coupe en biais donne une section plus grande.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « La tranche en biais » (blanche)
- **00-accroche** : Fatou coupe le pain droit, puis elle le coupe en biais.
- **01-defi** : La tranche en biais est-elle plus grande, plus petite, ou pareille ?
- **02-question** : Question ! A : plus grande. B : plus petite. C : la même. Mets pause, et choisis !
- **02b-reponse** : Réponse A ! En biais, la coupe traverse le pain sur une plus grande longueur : la section est plus grande.
- **03-visuel** : Même pain, deux gestes, deux tranches.
- **04-commentaire** : À toi : quelle forme a la section d'un cube coupé parallèlement à une face ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

## T4 · `3e-section-cylindre` — ceinture verte — le tube d'une trottinette
Micro 3e `section_cylindre`. Oscar, tourneur sur métaux. Centres `transports`, `technologie-ia`.

### Paysage
- **00-garde** : La section d'un cylindre. Disque ou rectangle ?
- **01-situation** : Voici Oscar. Il est tourneur sur métaux : il découpe des tubes. Le cadre d'une trottinette est fait de tubes, et la façon de les couper change tout.
- **02-en-travers** : Quand Oscar coupe perpendiculairement à l'axe du tube, la section est un disque. C'est la coupe qu'on voit au bout d'un tube.
- **03-dans-la-longueur** : Quand il coupe parallèlement à l'axe, en passant par le centre, la section est un rectangle. Sa largeur est le diamètre, sa longueur est celle du tube.
- **04-le-vide** : Et un tube n'est pas plein : sa section en travers est une couronne, un disque percé d'un disque. L'aire de métal est la différence des deux disques.
- **05-question** : Question ! On coupe un tube perpendiculairement à son axe. La section est… A : un rectangle. B : un disque. C : un triangle. Mets pause, et choisis !
- **05b-reponse** : Réponse B. Perpendiculairement à l'axe, c'est parallèle aux bases : on retrouve la forme de la base, un disque.
- **06-piege** : Attention au piège ! Perpendiculaire à l'axe et parallèle à la base, c'est la même coupe. On parle tantôt de l'axe, tantôt de la base : il faut savoir à quoi on se réfère.
- **07-question** : Question ! On coupe un cylindre parallèlement à son axe, en passant par le centre. La section est… A : un rectangle. B : un disque. C : un ovale. Mets pause, et choisis !
- **07b-reponse** : Réponse A. Un rectangle, dont la largeur est le diamètre du cylindre.
- **08-defi** : À toi de jouer ! Oscar coupe un tube de 3 centimètres de rayon extérieur et 2,5 centimètres de rayon intérieur. Quelle est l'aire de métal sur la coupe ? Mets pause, et cherche !
- **08b-correction** : Correction. Le grand disque : pi fois 3 fois 3, 9 pi. Le trou : pi fois 2,5 fois 2,5, 6,25 pi. La couronne : 9 pi moins 6,25 pi, 2,75 pi centimètres carrés. Environ 8,6 centimètres carrés de métal.
- **09-finale** : Ce que tu as appris. Une coupe perpendiculaire à l'axe d'un cylindre donne un disque. Une coupe parallèle à l'axe donne un rectangle. Et la section d'un tube est une couronne.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « Le bout du tube » (blanche)
- **00-accroche** : Oscar coupe un tube de trottinette de 3 centimètres de rayon, bien en travers.
- **01-defi** : Si le tube était plein, quelle serait l'aire de la coupe ?
- **02-question** : Question ! A : 6 pi centimètres carrés. B : 3 pi centimètres carrés. C : 9 pi centimètres carrés. Mets pause, et choisis !
- **02b-reponse** : Réponse C ! Pi fois 3 fois 3, 9 pi centimètres carrés. 6 pi, c'est la longueur du cercle.
- **03-visuel** : En travers, un disque. Dans la longueur, un rectangle.
- **04-commentaire** : À toi : quelle est la forme de la section d'un tube coupé en travers, en tenant compte du vide ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

## T5 · `3e-section-cone-pyramide` — ceinture verte — **le volcan coupé en deux (974)**
Micro 3e `section_cone_pyramide`. Jade, volcanologue. Centres `nature-ecologie`, `sciences`.
⚠️ C'est la SEULE vidéo de la série qui parle de La Réunion.

### Paysage
- **00-garde** : La section d'un cône et d'une pyramide. Que voit-on dans la coupe ?
- **01-situation** : Voici Jade. Elle est volcanologue, à La Réunion. Pour expliquer le Piton de la Fournaise, elle le dessine coupé en deux. Un volcan, c'est à peu près un cône : ses sections racontent son histoire.
- **02-parallele** : Quand on coupe un cône parallèlement à sa base, la section est un disque, plus petit que la base. Plus on monte, plus le disque rétrécit.
- **03-la-reduction** : Et ce disque est une réduction exacte de la base. À mi-hauteur, son rayon est la moitié du rayon de la base. Aux trois quarts de la hauteur, il n'en reste qu'un quart.
- **04-la-pyramide** : Pour une pyramide, c'est pareil : une coupe parallèle à la base donne la même forme que la base, en plus petit. Base carrée, section carrée.
- **05-question** : Question ! On coupe un cône parallèlement à sa base. La section est… A : un disque plus petit. B : un rectangle. C : un triangle. Mets pause, et choisis !
- **05b-reponse** : Réponse A. Un disque plus petit, qui est une réduction de la base. Le triangle, c'est ce qu'on verrait en coupant le cône verticalement.
- **06-piege** : Attention au piège ! Si la coupe n'est pas parallèle à la base, la section n'est plus une réduction : sur un cône, elle devient un ovale. Le mot « parallèle » n'est pas décoratif.
- **07-question** : Question ! On coupe une pyramide à base carrée parallèlement à sa base. La section est… A : un triangle. B : un carré plus petit. C : un disque. Mets pause, et choisis !
- **07b-reponse** : Réponse B. Un carré plus petit : la section a la forme de la base.
- **08-defi** : À toi de jouer ! Jade modélise un cône de 1 000 mètres de rayon à la base et 500 mètres de haut. Quel est le rayon de la section à 300 mètres d'altitude ? Mets pause, et cherche !
- **08b-correction** : Correction. À 300 mètres sur 500, il reste 200 mètres jusqu'au sommet, soit 200 divisé par 500, c'est-à-dire 0,4 de la hauteur. Le rapport de réduction est 0,4 : le rayon vaut 0,4 fois 1 000, soit 400 mètres.
- **09-finale** : Ce que tu as appris. Une section parallèle à la base d'un cône est un disque plus petit. Pour une pyramide, c'est la forme de la base en plus petit. Et ce petit solide est une réduction du grand.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « Le volcan à mi-hauteur » (blanche)
- **00-accroche** : Jade coupe son volcan en deux, à mi-hauteur. Le cratère du bas fait 1 000 mètres de rayon.
- **01-defi** : À mi-hauteur, quel est le rayon du disque de la coupe ?
- **02-question** : Question ! A : le même. B : le quart. C : la moitié. Mets pause, et choisis !
- **02b-reponse** : Réponse C ! À mi-hauteur, le rapport est un demi : le rayon est la moitié, soit 500 mètres. C'est l'aire qui serait divisée par 4.
- **03-visuel** : Mi-hauteur, demi-rayon.
- **04-commentaire** : À toi : au quart de la hauteur en partant du sommet, quel est le rapport ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

## T6 · `3e-section-sphere` — ceinture bleue — les parallèles du globe
Micro 3e `section_sphere`. Rayan, géographe. Centres `histoire-geographie`, `espace`.

### Paysage
- **00-garde** : La section d'une sphère. Pourquoi est-ce toujours un cercle ?
- **01-situation** : Voici Rayan. Il est géographe. Sur son globe, il montre l'équateur et les parallèles. Ce sont tous des cercles, et ce n'est pas un hasard : ce sont des sections de la sphère.
- **02-toujours-un-cercle** : Un plan qui coupe une sphère donne toujours un cercle. Jamais un ovale, jamais autre chose. Quelle que soit l'inclinaison du plan.
- **03-le-grand-cercle** : Si le plan passe par le centre, le cercle est le plus grand possible : son rayon est celui de la sphère. C'est l'équateur. On l'appelle un grand cercle.
- **04-le-triangle** : Plus le plan s'éloigne du centre, plus le cercle rétrécit. Et il y a un triangle rectangle caché : le rayon de la sphère est l'hypoténuse, la distance au centre et le rayon de la section sont les deux côtés.
- **05-question** : Question ! Un plan coupe une sphère. La section est toujours… A : un ovale. B : un cercle. C : un carré. Mets pause, et choisis !
- **05b-reponse** : Réponse B. Toujours un cercle, quelle que soit l'inclinaison du plan.
- **06-piege** : Attention au piège ! Si le plan est trop loin du centre, il ne coupe plus la sphère du tout. La distance au centre doit rester inférieure au rayon.
- **07-question** : Question ! Une sphère de rayon 10 est coupée par un plan situé à 6 du centre. Quel est le rayon de la section ? A : 4. B : 16. C : 8. Mets pause, et choisis !
- **07b-reponse** : Réponse C. Le triangle rectangle : 10 au carré moins 6 au carré, 100 moins 36, 64. La racine de 64, c'est 8. 4, c'est 10 moins 6 : la soustraction directe ne marche pas.
- **08-defi** : À toi de jouer ! La Terre fait environ 6 370 kilomètres de rayon. Un parallèle passe à 3 185 kilomètres du centre, soit la moitié du rayon. Quel est son rayon, arrondi au kilomètre ? Mets pause, et cherche !
- **08b-correction** : Correction. Le triangle rectangle : 6 370 au carré moins 3 185 au carré. Soit environ 40 576 900 moins 10 144 225, environ 30 432 675. La racine : environ 5 517 kilomètres. Le parallèle est plus petit que l'équateur, mais pas de moitié.
- **09-finale** : Ce que tu as appris. La section d'une sphère par un plan est toujours un cercle. Par le centre, c'est un grand cercle. Et un triangle rectangle relie le rayon, la distance au centre et le rayon de la section.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « L'équateur ou le parallèle ? » (blanche)
- **00-accroche** : Sur le globe de Rayan, deux cercles : l'équateur, et un parallèle tout près du pôle.
- **01-defi** : Lequel est le plus grand cercle ?
- **02-question** : Question ! A : l'équateur. B : le parallèle. C : les deux pareil. Mets pause, et choisis !
- **02b-reponse** : Réponse A ! L'équateur passe par le centre de la Terre : c'est un grand cercle. Plus un plan s'éloigne du centre, plus son cercle rétrécit.
- **03-visuel** : Près du pôle, le cercle n'est presque plus rien.
- **04-commentaire** : À toi : que devient la section quand le plan touche la sphère sans la traverser ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

## T7 · `3e-section-longueur` — ceinture bleue — la position en vol
Micro 3e `section_calculer_longueur`. Maëlle, pilote de ligne. Centres `transports`, `espace`.

### Paysage
- **00-garde** : Calculer une longueur dans une section. Où se cache le triangle rectangle ?
- **01-situation** : Voici Maëlle. Elle est pilote de ligne. En vol, elle se repère dans l'espace : une position au sol et une altitude. Pour calculer une distance, elle ramène toujours le problème à un plan.
- **02-ramener-au-plan** : La méthode est toujours la même : on dessine la section à plat, on y place les longueurs connues, et on cherche le triangle rectangle.
- **03-la-diagonale** : Dans une section rectangulaire de 6 sur 8, la diagonale ferme un triangle rectangle. 6 au carré plus 8 au carré, 36 plus 64, 100. La racine de 100, c'est 10.
- **04-la-sphere** : Dans une sphère, c'est le même triangle : le rayon de la sphère est l'hypoténuse, la distance au centre et le rayon de la section sont les côtés de l'angle droit.
- **05-question** : Question ! Dans une section rectangulaire de 6 centimètres sur 8, combien mesure la diagonale ? A : 14 centimètres. B : 48 centimètres. C : 10 centimètres. Mets pause, et choisis !
- **05b-reponse** : Réponse C. 36 plus 64, 100 ; la racine de 100, c'est 10 centimètres. 14, c'est 6 plus 8 : on n'additionne pas les côtés.
- **06-piege** : Attention au piège ! Le théorème de Pythagore ne s'applique que dans un plan. Il faut d'abord dessiner la section, puis y travailler à plat.
- **07-question** : Question ! Une sphère de rayon 13 est coupée en un cercle de rayon 5. À quelle distance du centre est le plan ? A : 12. B : 8. C : 18. Mets pause, et choisis !
- **07b-reponse** : Réponse A. 13 au carré moins 5 au carré, 169 moins 25, 144. La racine de 144, c'est 12. 8, c'est 13 moins 5.
- **08-defi** : À toi de jouer ! Maëlle survole un point à 9 kilomètres d'altitude. L'aéroport est à 40 kilomètres devant elle, au sol. Quelle distance la sépare de l'aéroport en ligne droite ? Mets pause, et cherche !
- **08b-correction** : Correction. Le triangle rectangle : 40 au carré plus 9 au carré, 1 600 plus 81, 1 681. La racine de 1 681, c'est 41. L'aéroport est à 41 kilomètres en ligne droite, à peine un de plus qu'au sol.
- **09-finale** : Ce que tu as appris. On ramène toujours le calcul à une section dessinée à plat. On y cherche le triangle rectangle. Et on applique Pythagore dans ce plan, jamais dans l'espace.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « La diagonale de la face » (blanche)
- **00-accroche** : Un cube de 6 centimètres d'arête. On trace la diagonale d'une de ses faces.
- **01-defi** : Combien mesure cette diagonale ?
- **02-question** : Question ! A : 12 centimètres. B : environ 8,5 centimètres. C : 6 centimètres. Mets pause, et choisis !
- **02b-reponse** : Réponse B ! 36 plus 36, 72. La racine de 72, environ 8,5 centimètres. 12, c'est 6 plus 6.
- **03-visuel** : La face est un carré : sa diagonale dépasse toujours son côté.
- **04-commentaire** : À toi : un carré de 10 centimètres de côté. Combien mesure sa diagonale ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !

## T8 · `3e-section-defi` — ceinture marron — scanner un objet pour l'imprimer en 3D
Micro 3e `section_defi`. Nathan, technicien en numérisation 3D. Centres `technologie-ia`, `jeux-video`.

### Paysage
- **00-garde** : Défis sur les sections. Peut-on reconnaître un solide à ses tranches ?
- **01-situation** : Voici Nathan. Il numérise des objets pour les imprimer en 3D. Son scanner ne voit pas le solide entier : il enregistre des centaines de sections horizontales, l'une au-dessus de l'autre. L'ordinateur reconstruit le solide à partir d'elles.
- **02-le-cylindre** : Si toutes les sections sont des disques de même rayon, empilés, le solide est un cylindre. Rien d'autre ne donne ça.
- **03-le-cone** : Si les disques rétrécissent régulièrement du bas vers un point en haut, c'est un cône. Et si la base n'est pas un disque mais un carré qui rétrécit, c'est une pyramide.
- **04-la-boule** : Pour une boule, les disques grandissent, puis rétrécissent : le plus grand est au milieu, à l'équateur. C'est la signature de la sphère.
- **05-question** : Question ! Les sections horizontales sont des disques : le plus grand en bas, et ils rétrécissent jusqu'à un point en haut. Quel solide ? A : un cône. B : une boule. C : un cylindre. Mets pause, et choisis !
- **05b-reponse** : Réponse A. Un cône. Pour une boule, le plus grand disque serait au milieu, pas en bas.
- **06-piege** : Attention au piège ! Une seule section ne suffit jamais. Un disque peut venir d'un cylindre, d'un cône ou d'une boule. C'est la suite des sections qui identifie le solide.
- **07-question** : Question ! Les sections horizontales d'une boule sont des disques qui… A : grandissent vers le haut. B : restent égaux. C : grandissent puis rétrécissent. Mets pause, et choisis !
- **07b-reponse** : Réponse C. Le plus grand est au milieu. En haut et en bas, ils se réduisent à un point.
- **08-defi** : À toi de jouer ! Le scanner de Nathan donne trois sections d'un objet : un carré de 10 centimètres de côté en bas, un carré de 5 centimètres à mi-hauteur, et un point au sommet. Quel solide est-ce, et quel est son volume si la hauteur est 12 centimètres ? Mets pause, et cherche !
- **08b-correction** : Correction. Des carrés qui rétrécissent régulièrement jusqu'à un point : c'est une pyramide à base carrée. À mi-hauteur, le côté est bien la moitié : la réduction est régulière. Son volume : la base, 10 fois 10, 100 centimètres carrés ; fois la hauteur, 100 fois 12, 1 200 ; divisé par 3 : 400 centimètres cubes.
- **09-finale** : Ce que tu as appris. Une suite de sections identifie un solide. Des disques égaux : un cylindre. Des disques qui rétrécissent vers un point : un cône. Des disques qui grandissent puis rétrécissent : une boule.
- **10-abonne** : Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche !

### Short « Trois tranches, un solide » (blanche)
- **00-accroche** : Le scanner de Nathan donne trois tranches : un carré en bas, un carré plus petit au milieu, un point en haut.
- **01-defi** : Quel solide a-t-il scanné ?
- **02-question** : Question ! A : un cube. B : une pyramide. C : un cône. Mets pause, et choisis !
- **02b-reponse** : Réponse B ! Des carrés qui rétrécissent jusqu'à un point : une pyramide. Le cône donnerait des disques, le cube des carrés tous égaux.
- **03-visuel** : Trois tranches suffisent, si elles racontent la même histoire.
- **04-commentaire** : À toi : des disques tous égaux, du bas jusqu'en haut. Quel solide ? Réponds en commentaire !
- **05-abonne** : Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche !
