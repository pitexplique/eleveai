# Reprise — série LONGUEURS du CE2 (8 micros)

Plan : `manim/PLAN-perimetre-aire-volume.md` (CE2, « Longueurs et conversions »). Banque : `lib/tutor-v4/questionBank/ce2/maths/longueur.bank.ts` (notion `longueur`).
Chaîne identique à la contenance CE2 : voir `manim/REPRISE-pav-ce2.md` (sessions 7 à 9) pour les outils et les leçons de synchro.
⛔ Interdits de la banque (BO cycle 2) : pas de tableau de conversion, pas de virgule dans les longueurs (« 2 m 50 cm », jamais « 2,50 m »).

## Session 1 (14/11) : 16 voix écrites, EN ATTENTE de Frédéric
`manim/voix/ce2-longueur-<ep>[-short].json`. Pas encore validées : ne rien générer avant son oui.

| Ép. | Micro | Métier / centre | Ceinture paysage / short | Bonnes réponses (Q1, Q2 ; short) |
|---|---|---|---|---|
| 01 unités | `ce2_longueur_unites` | Samuel, menuisier (art-design) ; short queue de Ti Margo en km | blanche / blanche | B, A ; C |
| 02 relations | `ce2_longueur_relations` | Nina, entraîneuse d'athlétisme (sport) ; short ficelle du cerf-volant | jaune / blanche | C, B ; A |
| 03 mesurer | `ce2_longueur_mesurer` | Clara, astronome (espace) ; short banane mal posée | jaune / blanche | A, C ; B |
| 04 comparer | `ce2_longueur_comparer` | Lina, biologiste marine (animaux) ; short gecko 1 dm contre 9 cm | orange / jaune | C, A ; B |
| 05 choisir l'unité | `ce2_longueur_choisir_unite` | Karim, pilote d'avion (transports) ; short Mamie à 3 millions de cm | jaune / blanche | B, C ; A |
| 06 estimer | `ce2_longueur_estimer` | Élodie, paysagiste (nature-ecologie) ; short mur mesuré à la queue | jaune / jaune | A, B ; C |
| 07 problème | `ce2_longueur_probleme` | Jules, technicien de concert (musique) ; short corde à sauter | orange / jaune | C, A ; B |
| 08 défi | `ce2_longueur_defi` | Maya, pâtissière (cuisine) ; short skate 6 dm = 60 cm = 600 mm | bleue / orange | B, C ; A |

Réponses : 8 A, 8 B, 8 C sur la série ; jamais deux fois la même lettre de suite dans une vidéo.
Métiers : la matrice (`scripts/metiers-pour-video.ts ce2 longueur`) n'en a que 3 (couturière déjà prise par Kenza, menuisier et entraîneuse pris ici) ; les 6 autres sont à ajouter à la matrice au moment du manifeste. Aucun ne recoupe la série CM1 (Jade, Bilal, Zoé, Sarah, Adam).

### Reste (après le oui de Frédéric)
1. WAV, marques (`perimetre_marques.py longueur:<ep>`), commun `longueur_ce2_commun.py` (règle graduée, mètre ruban, personnages), 8 paysages : dry run propre → aperçu -ql relu → UN HD sous verrou → bords 0 → planche.
2. Shorts Ti Margo : série `ce2-longueur` (json + cues + `films/ce2-longueur-<ep>.js`), miniatures « Dessin animé ».
3. Miniatures paysage, passe manifeste (dates libres après le 24/01/2027), fiches YouTube, vignettes, R2, `videos-r2.json` (nos clés seulement), coach, plan coché, mémoire.
