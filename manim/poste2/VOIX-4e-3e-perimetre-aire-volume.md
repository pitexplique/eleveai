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
