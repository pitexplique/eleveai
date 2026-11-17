# Reprise — 4e « Périmètre, aire, volume, solides » (2e poste, branche `poste2`)

Ouvert le 15/11/2026. 30 micros du coach, plan : `manim/PLAN-perimetre-aire-volume.md`, section `## 4E`.

## État

- [x] Inventaire des 30 micros (ci-dessous), fait sur les banques 4e et sur
      `manim/manifeste-youtube.json` + `manim/poste2/manifeste-5e.json`.
- [ ] Inventaire validé par Frédéric (ce qu'on branche en `aussi`, ce qu'on tourne).
- [x] Inventaire VALIDÉ par Frédéric le 15/11 (« Fais la 3e aussi »).
- [x] Règle neuve : les centres d'intérêt se vérifient par ÂGE (voir plus bas).
- [x] Inventaire des sujets 13-14 ans : `manim/poste2/SUJETS-13-14-ans.md`
      (piscine, maison, territoire, poumons, muscles + les 18 centres).
- [x] Tableau des 28 épisodes + voix du PILOTE : `manim/poste2/VOIX-4e-3e-perimetre-aire-volume.md`.
- [x] **Pilote `volume_pyramide` rendu en `-ql`** (paysage 4 min 42 + short Manim 65 s).
- [x] **Pilote VALIDÉ par Frédéric le 15/11 (« Oui, lance la suite »).**
- [x] HD du pilote : paysage 282,6 s et short 65,9 s en 1080 × 1920, `verifier-bords` = 0.
      Outil : `manim/poste2/4e_hd.sh <script> <Scène> <nom> <media> <sortie> [résolution]`
      (la résolution sert aux shorts 9:16 : passer `1080,1920`).
- [x] **Les 54 voix des 27 autres épisodes sont ÉCRITES** dans le même fichier
      `manim/poste2/VOIX-4e-3e-perimetre-aire-volume.md` (899 lignes, 28 épisodes).
      84 questions-pauses : exactement 28 A, 28 B, 28 C, jamais deux fois la même
      lettre dans une vidéo ; tous les nombres recalculés par script ; les 17 centres
      d'intérêt utilisés sont dans la liste fermée et ouverts en 12-14 ans.
      ⚠️ Un défi corrigé à la relecture : le gobelet conique a la pointe EN BAS, donc
      aux trois quarts de la hauteur le client a 20 cL sur 48, pas 47.
- [x] **Voix VALIDÉES par Frédéric le 15/11 (« Oui, valide tout »).** ⛔ Ne plus les retoucher sans lui.
- [x] Les 54 voix extraites en JSON (`manim/poste2/voix-depuis-md.py` : le .md reste la source de
      vérité), leurs WAV (`manim/poste2/4e_wav.ps1`, Julie, débit −6) et leurs 56 fichiers de marques.
- [x] Socle de la série : `volume_4e_commun.py` (figures `cercle`, `demi_disque`, `boule`, `figure_L`,
      `piste`, `vues_trois`, `patron_pyramide_carree`, plus les 28 personnages) et
      `volume_4e_short_commun.py` (`Short4e` : `ajuster()` à 3,9, `FS_PH = 30`, fin aux bonnes tailles).
- [ ] Les 27 épisodes, un par un.

## Avancement des 28 épisodes (au 16/11)

| Épisode | Paysage | Short | HD |
|---|---|---|---|
| V2 `volume_pyramide` ⭐ pilote | ✅ | ✅ | ✅ 282,6 s / 65,9 s, bords 0 |
| V1 `volume_lien_aire` (piscine) | ✅ | ✅ | ✅ 201,6 s / 61,1 s, bords 0 |
| V3 `volume_cone` (cornet) | ✅ | ✅ | ✅ 242,1 s / 65,6 s, bords 0 |
| V4 `volume_defi` (citerne) | ✅ | ✅ | ✅ 214,7 s / 53,7 s, bords 0 |
| S1 `vision_reconnaitre` (jeu vidéo) | ✅ | ✅ | ✅ 208,9 s / 56,7 s, bords 0 |
| S2 `vision_vues` (maquette) | ✅ | ✅ | ✅ 203,9 s / 54,7 s, bords 0 |
| S3 `vision_representation` (manga) | ✅ | ✅ | ✅ 188,6 s / 57,4 s, bords 0 |
| S4 `patron_pyramide` (dé à 4 faces) | ✅ | ✅ | ✅ 200,2 s / 57,0 s, bords 0 |
| S5 `vision_section` (muscle, scanner) | ✅ | ✅ | ✅ 201,8 s / 56,5 s, bords 0 |
| S6 `vision_defi` (drone) | ✅ | ✅ | ✅ 208,4 s / 53,4 s, bords 0 |
| P1 `aire_perimetre_comprendre`+3 (skatepark) | ✅ | ✅ | ✅ 215,4 s / 62,6 s, bords 0 |
| P2 `aire_perimetre_cercle` (margelle) | ✅ | ✅ | ✅ 208,3 s / 64,9 s, bords 0 |
| P3 `aire_perimetre_figure` (piste BMX) | ✅ | ✅ | ✅ 210,4 s / 64,3 s, bords 0 |
| P4 `aire_perimetre_probleme` (tour de piste) | ✅ | ✅ | ✅ 222,2 s / 51,8 s, bords 0 |
| P5 `aire_perimetre_defi` (enclos) | ✅ | ✅ | ✅ 215,1 s / 50,4 s, bords 0 |
| A1 `aire_rectangle`, `aire_carre` (écran) | ✅ | ✅ | ✅ 211,2 s / 59,2 s, bords 0 |
| A2 `aire_disque` (tambour) | ✅ | ✅ | ✅ 210,1 s / 52,1 s, bords 0 |
| A3 `aire_figure` (cour en L) | ✅ | ✅ | ✅ 224,2 s / 55,0 s, bords 0 |
| A4 `aire_probleme` (terrasse) | ✅ | ✅ | ✅ 212,2 s / 65,2 s, bords 0 |
| A5 `aire_defi` (maillots) | ⏳ | ⏳ | — |
| T1 → T8 (3e) | ⏳ | ⏳ | — |

**19 épisodes finis sur 28** (V1 à V4, S1 à S6, P1 à P5, A1 à A4) — paysages et shorts rendus
en HD, `verifier-bords-video` = 0 sur les 38 MP4. **9 restent à écrire et à rendre.**
⚠️ Les 8 épisodes de 3e (T1 à T8) sont confiés à une SESSION SŒUR depuis le 17/11 : elle écrit
`manim/scripts/4e/3e_*.py` et tient son propre tableau dans `manim/poste2/REPRISE-3e-sections.md`.
Il ne reste donc ici que A5.
⭐ Le LOT PÉRIMÈTRE est COMPLET : les 7 micros `aire_perimetre` de 4e sont couverts.
⭐ Le LOT SOLIDES est COMPLET : les 6 micros `vision_espace` de 4e sont couverts.

Chaîne d'un épisode : script paysage → dry run `AUDIT=1 BORDS=1` jusqu'à 0 AVANCE / RETARD / TARD /
BORD → script short (même contrôle, en `-r 1080,1920`) → `manim/poste2/4e_hd.sh` pour les deux
(le short prend `1080,1920` en 6ᵉ argument) → planche → contrôle du compteur sur le MP4.

### Leçons ajoutées par le lot Volume
7. Un TITRE d'écran qui reprend un mot dit dans les deux premières secondes de la voix part en
   `hors_audit` : il s'affiche forcément après, et l'audit le compte en retard (V4, écrans 02 et 03).
8. Quand la voix d'un écran COMMENCE par ce qui doit s'écrire, la ligne passe AVANT le titre (V1, 02).
9. Dans une phrase de correction, un morceau ne contient qu'UN nombre : « 9π », « × 12 », « ÷ 3 »
   séparés, sinon le dernier chiffre s'affiche avant d'être dit (V3 short, AUDIT-TARD).
10. `au_mot(x, 2)` pour un nombre répété (V4 : « 7 200 » dit deux fois).
11. ⭐ **Une carte de question ne reprend jamais mot pour mot le début de l'annonce.** Le gabarit
    ne pose la carte qu'APRÈS « Question ! » : tout mot déjà dit y est compté en retard (3 s).
    Le remède n'est pas de couper l'audit — `q_sans_audit` vise le mauvais objet dans le commun
    CM1 (`r[1]` = le compte à rebours ; `Paysage4e._disposer_q` le réapplique à `r[2]`), et la
    valeur `"tout"` fait planter le RENDU alors que le dry run passait. Le remède est éditorial,
    et il est meilleur : les données sont DESSINÉES par `avant_q`, et la carte ne garde que la
    question (« Quel solide ? »). C'est « montrer, pas raconter » appliqué à l'écran de question.

### Leçons ajoutées par le lot Solides (S3, 16/11) — elles valent pour les 21 restants
12. ⭐⭐ **Le gabarit PAYSAGE attend tout seul.** À chaque `play`, `SynchroJ2._attente` retarde
    l'animation jusqu'à ce que la voix ait dit, pour chaque texte neuf, ses NOMBRES et son
    PREMIER mot de 4 lettres ou plus (`_jetons`). Conséquences :
    · deux lignes dont les mots sont dits à des moments différents = DEUX `play`, jamais un
      `FadeIn` du bloc entier (sinon le gabarit attend le mot le plus tardif, et le mot le plus
      tôt est compté en `TARD`) ;
    · un `au_mot` placé APRÈS un `play` qui a déjà attendu plus loin = `RETARD` : on le supprime.
    Le SHORT, lui, n'a pas ce moteur : là, tout se cale à la main avec `au_mot`.
13. ⛔ **Ne jamais passer `mot_q="Question"`** à `question_gauche` : le gabarit fait déjà
    `au_mot("Question")` avant la tête, puis rejoue `mot_q` 0,4 s plus tard → `RETARD 0,40 s`
    sur CHAQUE question-pause. (Les épisodes V1-S2 le passent : c'est à corriger s'ils sont refaits.)
14. Dans un SHORT, `_cue` cherche **par sous-chaîne** : « Les fuyantes » attendait le « les » de
    « paral-lès-… » et la carte A arrivait 0,9 s trop tard. La carte de question d'un short ne
    porte qu'UNE ligne courte, faite de mots absents de la voix (« Quelles fuyantes ? »).
15. Un nombre collé au premier mot long de sa ligne s'écrit en retard : « 4, c'est oublier la
    base. » attend « oublier ». Remède : `couper={i: ("4,", "c'est oublier la base.")}` en paysage,
    et un morceau à part (`["4", "seuls : …"]`) dans un short.
16. Le patron d'un tétraèdre se dessine à partir d'un triangle du milieu qui pointe vers le BAS :
    ses trois symétriques forment alors le grand triangle partagé en quatre. Vers le haut, on
    obtient une étoile, et l'élève ne reconnaît plus rien.
17. Dans un écran de question, la figure monte **au-dessus de y = +0,5** (la phrase de réponse
    s'écrit à partir de −0,3), et la phrase de réponse tient en **3 lignes** : à 4 elle est
    rétrécie jusqu'à devenir illisible sur un vidéoprojecteur.

### Leçons ajoutées par S5 et S6 (16/11)
18. ⭐⭐ **Le gabarit paysage ne regarde qu'UN mot par texte** : `_jetons` renvoie tous les NOMBRES
    plus le PREMIER mot de 4 lettres ou plus. D'où la règle de découpe : un morceau ne contient
    jamais à la fois un nombre et un mot long dits à plus de 0,4 s d'écart. « rayon 4 cm »,
    « 4 m de diamètre », « 25 € le mètre », « 1 m plus loin » : tous à couper en deux.
19. ⛔⛔ **Un mot de 4 lettres qui REVIENT plus loin décale tout l'écran.** « Elle coûte » attendait
    le « elle » de « Combien coûte-t-elle ? », douze mots plus loin : tout le reste de l'écran
    partait en retard. Avant d'écrire une étiquette, vérifier que son premier mot long n'est pas
    caché dans un mot de la fin (« elle » dans « va-t-elle »).
20. Un TITRE qui redit un mot prononcé plus tard se met en `hors_audit` : il sort de la synchro
    au lieu de retarder la ligne qui l'accompagne (S6, « Un solide à la fois »).
21. ⛔ **Les milliers prennent une ESPACE INSÉCABLE** (U+00A0) : l'audit efface l'espace ordinaire
    ET l'espace fine (U+202F), « 1 200 » devient « 1200 », introuvable dans la voix, et le nombre
    sort du contrôle (c'est pour ça que V4 affiche AUDIT-ABSENT « 10000 »).
22. Dans un SHORT, `au_mot` cherche une SOUS-CHAÎNE : « 6 000 watts » se trouve dans
    « 36 000 watts », et « Les fuyantes » dans « paral-lès-… ». Choisir un extrait unique
    (« ajouté 6 000 ») ou passer `n=2`.
23. Un visuel faux reste faux même s'il est joli : quatre petits disques posés sur un grand ne le
    remplissent pas. Quatre QUARTS du grand disque, si — et ils ont bien l'aire du petit (S5 short).

### Leçons ajoutées par le lot Périmètre (P1 à P4, 16/11)
24. ⛔⛔ **Un morceau ne contient jamais un nombre ET un mot long dits à plus de 0,4 s d'écart.**
    La liste de ce qui s'est fait prendre : « rayon 4 cm », « 4 m de diamètre », « 25 € le mètre »,
    « 1 m plus loin », « de 36 m de rayon », « 6 m de haut », « rayon 6 cm ». Deux morceaux,
    toujours : le nombre d'un côté, le mot de l'autre.
25. ⛔⛔ **Vérifier que le premier mot long d'une étiquette n'est pas caché à la fin de la voix.**
    « Elle coûte » attendait le « elle » de « Combien coûte-t-elle ? » et « Prix : » le « prix »
    de « Quel est le prix ? » : tout l'écran partait 2,5 s en retard. Prendre un mot dit AU BON
    ENDROIT (« La bordure : », « La barrière : »).
26. ⛔ **Un `au_mot` placé AVANT un texte que le gabarit attend déjà met ses autres mots en TARD.**
    Sur la page de garde, `au_mot("400 mètres")` puis la ligne « fait-il 400 mètres ? » : « fait »
    était déjà dit. On laisse le gabarit attendre tout seul, et on réserve `au_mot` aux figures.
27. Dans un SHORT, `au_mot` se pose sur LE NOMBRE, jamais sur le début de la phrase
    (« 31 mètres », pas « Le virage ajoute 31 mètres ») : sinon le nombre s'écrit 1 s trop tôt.
28. ⛔ **La phrase de réponse d'un short ne porte que les nombres dits APRÈS le premier point**
    de la voix de réponse : `_poser` ne cherche qu'à partir de là. Un nombre dit avant (« 504 »,
    « 400 », « 60 ») s'écrit en avance ou en retard, jamais au bon moment.
29. ⛔ Dans un SHORT, l'audit efface AUSSI l'espace insécable : « 2 000 » devient « 2000 »,
    introuvable dans la voix. Les nombres à quatre chiffres restent aux paysages.
30. Trois diamètres bout à bout font UNE ligne à l'œil : on les sépare par des barres blanches et
    on alterne les teintes, sinon l'élève ne peut pas compter « un peu plus de trois » (P2).

## Le PILOTE V2 `volume_pyramide` (15/11) — vidéo COMMUNE 4e + 3e

- Sujet : Awen, monteuse de stands de festival ; la tonnelle 3 × 3, toit pyramidal.
  Centres `musique`, `sciences` (tranche 12-14 vérifiée).
- Voix : `manim/voix/4e-volume-pyramide.json` et `-short.json` (Julie, débit −6) ;
  WAV dans `public/sons/4e-volume-pyramide[-short]/`.
- Marques : `python manim/scripts/4e/volume_4e_marques.py 4e-volume-pyramide 4e-volume-pyramide-short`
  (⚠️ ce script importe `convertir` du script 5e avec un `sys.argv` vidé : le 5e traite argv au niveau du module).
- Commun du lot : `manim/scripts/4e/volume_4e_commun.py` — importe le commun 5e sans le toucher,
  ajoute `pyramide()`, `cone()`, `sable()`, `awen()`, `Paysage4e`, `Paysage3e`.
- Paysage : `manim/scripts/4e/4e_volume_pyramide.py`, scène `VolumePyramide4e` (verte).
  Questions à 01:51 (B) et 02:53 (A). Dry run AUDIT=1 BORDS=1 : 0 AVANCE, 0 RETARD, 0 TARD, 0 BORD ;
  `verifier-bords-video.py` sur le MP4 : 0.
- Short : `4e_volume_pyramide_short.py`, scène `ShortVolumePyramide4e`, **en MANIM** (`PausesShort` + `Short6e`),
  « Trois fois le même sable », question-pause à 14,8 s, réponse C, compteur de 3 s **contrôlé sur le MP4**
  (planche `manim/poste2/planche-4e-pyramide-short-compteur.png` : 3 → 2 → 1, dans la carte, rien par-dessus).
- Aperçu (en pause) : `manim/sorties/4e/maths/volume/12-volume-pyramide/apercu.html`,
  servi par `python -m http.server 3907 --directory manim/sorties`
  (⚠️ la config `sorties-video` de `.claude/launch.json` est restée « starting » : lancer le serveur à la main).

### Leçons du pilote (à appliquer aux 27 autres)
1. Un texte n'écrit QUE des mots dits, à la lettre : « trois fois », pas « 3 fois » — sinon
   `montrer_ligne` ne trouve pas le mot et tout l'écran glisse (4 s de retard sur la finale).
2. `au_mot` attend la FIN de l'extrait : extraits COURTS finissant au mot à montrer
   (« Il en faut », pas « Il en faut un de 1 200 »).
3. Dans un écran de question, la figure monte à y ≈ +0,5 : la phrase de réponse s'écrit à partir de −0,3.
4. Toute cote posée sur une face colorée prend un cartouche (`sur_fond`), sinon elle est illisible.
5. Dans le cadre 9:16 (4,5 d'unités), tout texte passe par un `ajuster()` à 3,9 : un titre de
   24 lettres déborde sans prévenir.
6. Les deux solides à comparer se posent CÔTE À CÔTE, bases alignées : « même base, même hauteur »
   doit se voir.

## Les notions 4e et leurs micros (source : les banques)

| notionId 4e | banque | micros |
|---|---|---|
| `aire_perimetre` | `perimetres.bank.ts` | 7 |
| `aire_surface` | `aires.bank.ts` | 8 |
| `volume_solide` | `volumes.bank.ts` + `volumes-pyramide-cone.bank.ts` | 9 |
| `vision_espace` | `vision-espace.bank.ts` + `patron-pyramide.bank.ts` | 6 |

⭐ `aire_surface` et `volume_solide` portent le MÊME nom en 5e et en 4e : un `aussi`
depuis une vidéo 5e ne change que la classe.

## Inventaire micro par micro

Légende : **5e** = déjà tourné par ce poste (série du 15/11, rendue, sur R2, pas
encore sur YouTube) · **primaire** = seulement CM1/CM2/CE2 · **—** = rien.

### Périmètre (7) — en 4e le cercle et π entrent dans la notion
| micro | existant | décision proposée |
|---|---|---|
| `aire_perimetre_comprendre` | CE2, CM2 (`perimetre_comprendre`) | 1 paysage 4e de rappel, 4 micros |
| `aire_perimetre_rectangle` | CE2, CM1/CM2 (`perimetre_quadrilatere`) | idem (`aussi`) |
| `aire_perimetre_carre` | CM1/CM2 (`perimetre_quadrilatere`) | idem (`aussi`) |
| `aire_perimetre_triangle` | CM1/CM2 (`perimetre_triangle`) | idem (`aussi`) |
| `aire_perimetre_figure` | — (cercle, demi-cercle, π : neuf en 4e) | **à tourner** |
| `aire_perimetre_probleme` | — | **à tourner** |
| `aire_perimetre_defi` | primaire seulement | **à tourner** (défi 4e : disque, π) |

### Aire (8)
| micro | existant | décision proposée |
|---|---|---|
| `aire_comprendre` | **5e**, CM1, CM2 | `aussi` 5e |
| `aire_rectangle` | CM1/CM2 (`aire_carre_rectangle`) | 1 paysage 4e de rappel, 2 micros |
| `aire_carre` | CM1/CM2 (`aire_carre_rectangle`) | idem (`aussi`) |
| `aire_triangle` | **5e** | `aussi` 5e |
| `aire_parallelogramme` | **5e** | `aussi` 5e |
| `aire_figure` | 5e `aire_composer` (sans disque) | **à tourner** (le disque entre en 4e) |
| `aire_probleme` | — | **à tourner** |
| `aire_defi` | 5e (sans disque) | **à tourner** (défi 4e) |

### Volume et contenance (9)
| micro | existant | décision proposée |
|---|---|---|
| `volume_comprendre` | **5e** | `aussi` 5e |
| `volume_lien_aire` | — | **à tourner** (neuf 4e) |
| `volume_pave` | **5e** | `aussi` 5e |
| `volume_prisme` | **5e** | `aussi` 5e |
| `volume_cylindre` | **5e** | `aussi` 5e |
| `volume_pyramide` | — | **à tourner** — PILOTE |
| `volume_cone` | — | **à tourner** (neuf 4e) |
| `volume_unite` | **5e** | `aussi` 5e |
| `volume_defi` | 5e (sans pyramide ni cône) | **à tourner** (défi 4e) |

### Solides et espace (6) — rien au collège aujourd'hui
| micro | existant | décision proposée |
|---|---|---|
| `vision_reconnaitre` | CE2, CM1 | **à tourner** (pyramide et cône au programme) |
| `vision_vues` | — | **à tourner** |
| `vision_representation` | — | **à tourner** (perspective cavalière) |
| `patron_pyramide` | 5e `patron_prisme_cylindre` (prisme, cylindre) | **à tourner** (pyramide) |
| `vision_section` | — | **à tourner** (neuf 4e) |
| `vision_defi` | CE2, CM1 | **à tourner** |

## Compte

- 8 micros branchés en `aussi` depuis la série 5e : zéro tournage.
- 22 micros couverts par **18 paysages + 18 shorts** à tourner (dont 2 paysages
  « rappel » qui servent 6 micros à elles deux par `aussi`).

## Trois points à trancher avec Frédéric

1. **`aussi` 5e → 4e** : l'élève de 4e verra « Maths 5e » en haut de l'écran
   (même cas que 1re spé → terminale sur les suites, accepté le 10/11).
2. **Les rappels de périmètre et d'aire** : seules des vidéos CM1/CM2 existent.
   Brancher le CM2 sur un 4e serait visible (« Maths CM2 »). Proposition : deux
   paysages 4e de rappel plutôt qu'un branchement primaire.
3. ✅ **Tranché le 15/11 : le short 4e reste en MANIM**, pas en dessin animé
   (Frédéric, confirmant sa règle du 09/11/2026 dans `manim/REGLES.md` : « à partir
   de la 4e, le short reste en Manim »), **et toujours avec un défi** (Frédéric,
   15/11). Donc pas de `prototypes/ti-margo/films/4e-commun.js` à écrire, et les
   miniatures viennent des générateurs `manim/miniature_*.py`.
   Chaque short 4e porte : un défi (pas un mini-cours), sa ceinture (échelle
   entière sous le titre), une question-pause avec compte à rebours de 3 s, la
   question chiffrée en commentaire à la fin.

## Pièges relevés

- Les 3 métiers de la matrice 4e `volume_solide` (ingénieur de l'eau, pâtissière,
  logisticien) sont exactement ceux déjà pris dans la série 5e : il faudra d'autres
  métiers, ou les prendre dans d'autres notions.
- Aucune vidéo 6e de périmètre ni d'aire n'existe (la banque 6e a les mêmes micros).
  Si le 1er poste en tourne, les deux séries se croiseront : à vérifier avant la fusion.

---

# La 3e : les vidéos communes (demandé par Frédéric le 15/11)

Convention reprise des suites (`manim/REPRISE-suites.md` : « vidéo commune = faite
dans la classe la plus basse, branchée par `aussi` ») : une vidéo commune 4e+3e est
tournée en 4e, id `4e-…`, et branchée sur la 3e par `aussi`.

## Les micros 3e de ces familles (banques réelles, 31 micros visibles en France)

| notionId 3e | banque | micros |
|---|---|---|
| `aire_perimetre` | `perimetres.bank.ts` | comprendre, polygone, cercle, figure_composee, defi (5) |
| `aire_surface` | `aires.bank.ts` | comprendre, triangle, disque, figure_composee, agrandissement_reduction, defi (6) |
| `volume_solide` | `volumes.bank.ts` + `volumes-pyramide-cone.bank.ts` | comprendre, pave, prisme, cylindre, boule, unite, defi, agrandissement_reduction, pyramide_cone_reduction (9) |
| `volume_geometrie_espace` | `geometrie-espace.bank.ts` | solide_reconnaitre, section, representation, defi (4) |
| `sections_solides` | `sections_solides.bank.ts` + `angles-cercle.bank.ts` | reconnaitre, pave_cube, cylindre, cone_pyramide, sphere, calculer_longueur, defi (7) |

⛔ Hors France, à NE PAS tourner (`lib/tutor-v4/micros-masquees.ts`) : les aires de
solides en 3e (`aire_prisme_droit`, `aire_cylindre`, `aire_pyramide_cone`,
`aire_sphere`). En revanche `section_sphere` EST au programme français.

✅ `volume_pyramide` et `volume_cone` existent bien en 3e : la banque 3e importe
`fabriquerPyramideCone` de la banque 4e (préfixe `3e_`), et les deux micros sont
déclarés dans `knowledge/maths/3e/microSkills.ts`. Les vidéos 4e de pyramide et de
cône servent donc les deux classes. Décompte exact : **4e = 30 micros, 3e = 33**.

## Ce que la 3e gagne sans aucun tournage

- **13 micros 3e servis par la série 5e déjà tournée** (`aussi`, exactement les mêmes
  microId) : `aire_comprendre`, `aire_triangle`, `volume_comprendre`, `volume_pave`,
  `volume_prisme`, `volume_cylindre`, `volume_unite`.
- **2 micros 3e servis par deux vidéos 4e DÉJÀ en ligne** : `4e-prop-agrandissement-aire`
  → `aire_agrandissement_reduction`, `4e-prop-agrandissement-volume` →
  `volume_agrandissement_reduction`. (Elles vivent sous `prop_echelle` en 4e.)

## Découpage proposé : 17 vidéos communes 4e+3e, 10 vidéos 3e seules

Vidéos tournées ici (4e), avec les micros qu'elles servent :

| id | 4e | 3e |
|---|---|---|
| `4e-perimetre-polygones` | comprendre, rectangle, carre, triangle | comprendre, polygone |
| `4e-perimetre-cercle` | (nourrit `figure`) | `aire_perimetre_cercle` |
| `4e-perimetre-figure-composee` | `aire_perimetre_figure` | `aire_perimetre_figure_composee` |
| `4e-perimetre-probleme` | `aire_perimetre_probleme` | — |
| `4e-perimetre-defi` | `aire_perimetre_defi` | `aire_perimetre_defi` |
| `4e-aire-rectangle-carre` | `aire_rectangle`, `aire_carre` | — |
| `4e-aire-disque` | (nourrit `figure`) | `aire_disque` |
| `4e-aire-figure-composee` | `aire_figure` | `aire_figure_composee` |
| `4e-aire-probleme` | `aire_probleme` | — |
| `4e-aire-defi` | `aire_defi` | `aire_defi` |
| `4e-volume-lien-aire` | `volume_lien_aire` | — |
| `4e-volume-pyramide` **(PILOTE)** | `volume_pyramide` | `volume_pyramide` |
| `4e-volume-cone` | `volume_cone` | `volume_cone` |
| `4e-volume-defi` | `volume_defi` | `volume_defi` |
| `4e-solides-reconnaitre` | `vision_reconnaitre` | `volume_solide_reconnaitre` |
| `4e-solides-vues` | `vision_vues` | — |
| `4e-solides-perspective` | `vision_representation` | `volume_representation` |
| `4e-patron-pyramide` | `patron_pyramide` | — |
| `4e-section-comprendre` | `vision_section` | `volume_section`, `section_reconnaitre` |
| `4e-solides-defi` | `vision_defi` | `volume_geometrie_espace_defi` |

**20 paysages 4e** (+ 20 shorts Manim) couvrent les 30 micros de 4e et 18 de 3e.

Restent **8 micros 3e purs**, 8 paysages de plus : `volume_boule`,
`volume_pyramide_cone_reduction`, `section_pave_cube`, `section_cylindre`,
`section_cone_pyramide`, `section_sphere`, `section_calculer_longueur`,
`section_defi`.

## ✅ Décidé le 15/11 par Frédéric : « Fais la 3e aussi »

**28 paysages + 28 shorts Manim** pour couvrir les 30 micros de 4e ET les 33 de 3e
(9 micros de plus sont servis par la série 5e déjà tournée, 2 par deux vidéos 4e
déjà en ligne). Voix dans `manim/poste2/VOIX-4e-3e-perimetre-aire-volume.md`.

⚠️ À dire au 1er poste : il ne reste RIEN à tourner en 3e dans ces familles après
cette série. Qu'il ne la reprenne pas.

## Suivi (follow-up, hors série)

La fiche `lib/fiches/maths-4e-volumes.tsx` n'a ni pyramide ni cône, alors que le
coach les a depuis le 05/11. Les exemples du pilote viennent donc de la banque.

---

# ⛔⛔ Les centres d'intérêt se vérifient par ÂGE (Frédéric, 15/11/2026)

« Les centres d'intérêts doivent être vérifiés par âge. » Règle inscrite dans
`manim/REGLES.md` (section des centres d'intérêt) et rendue MESURABLE :
`node scripts/verifier-centres-age.mjs [manifeste …]` doit afficher
« 0 centre hors tranche ». Il relit les `tranches` de `lib/videos/centres-interet.ts`
et la table classe → tranche de `manim/centres-interet-par-age.md`.

## Ce que le premier passage a trouvé (15/11)

Sur 775 vidéos du manifeste, **129 écarts**, de deux sortes :

1. **76 centres INVENTÉS**, absents des 18 de la liste fermée : `construction` (24),
   `mode` (7), `football` (7), `course-trail` (5), `avions` (5), `voitures-motos` (4),
   `velo` (4), `photo` (3), `natation` (3), `chiens-chats` (3), `instrument`…
   ⚠️ `manim/REPRISE-suites.md` affirme que « construction, photo, velo, natation
   EXISTENT dans la liste fermée » : **c'est faux**, aucun des quatre n'y est.
2. **53 centres hors tranche d'âge** : `cinema-series` en CM2 (n'ouvre qu'à 12-14),
   `sport`, `transports` et `musique` en CE2 (n'ouvrent qu'à 9-11).

**Corrigé ici** : les 2 écarts de mes fichiers (`manim/poste2/manifeste-suites.json` :
`instrument` → `musique, sciences` ; `construction` → `sport, art-design`).
**PAS corrigé** : les 127 autres sont dans `manim/manifeste-youtube.json`, interdit à
ce poste. ⚠️ À faire reprendre par le 1er poste : ce sont surtout des vidéos CM2 et CE2.

---

# ⭐ PROMPT DE REPRISE (passage de main, 16/11/2026)

Tu reprends la série 4e + 3e « Périmètre, aire, volume, solides » sur la branche `poste2`.
**6 épisodes sur 28 sont finis** (tableau ci-dessus) ; **22 restent**. Tout ce qui suit est prêt :
les 54 voix VALIDÉES par Frédéric, leurs WAV, leurs marques, et le socle de la série.

## Ce que tu ne refais pas
- Les voix : `manim/poste2/VOIX-4e-3e-perimetre-aire-volume.md` fait foi. ⛔ Ne change pas un mot
  sans Frédéric. Pour (re)générer un JSON : `python manim/poste2/voix-depuis-md.py --tout`.
- Les WAV (`public/sons/<id>/`) et les marques (`manim/scripts/4e/<id>_marques.json`) : déjà là.
- Le socle : `volume_4e_commun.py` (figures + 28 personnages + `Paysage4e`) et
  `volume_4e_short_commun.py` (`Short4e`). ⛔ Les shorts sont en MANIM, jamais en dessin animé
  (REGLES.md 09/11, redit par Frédéric le 16/11).

## La chaîne d'un épisode (compte ~30 min)
1. `manim/scripts/4e/<id>.py`, scène en PascalCase, classe de base `Paysage4e`.
   Modèles les plus proches : `4e_volume_cone.py` (formule + piège), `4e_solides_vues.py` (figures),
   `4e_volume_defi.py` (deux solides à composer).
2. `PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run <script> <Scène>`
   → 0 AUDIT-AVANCE, 0 RETARD, 0 TARD, 0 BORD. Les 11 leçons ci-dessus évitent 90 % des allers-retours.
3. Le short : `Short4e`, même contrôle avec `-r 1080,1920`.
4. `bash manim/poste2/4e_hd.sh <script> <Scène> <nom-sortie> <media_dir> <dossier-sortie> [1080,1920]`
   (le 6ᵉ argument pour les shorts). Un seul rendu HD à la fois : le script prend un verrou.
5. Planche de contrôle : `bash manim/poste2/5e_planche.sh <mp4> <png> <colonnes> t1 t2 …`, puis
   relire les images. ⛔ Pour un short, contrôler le COMPTEUR autour de « Mets pause » (Frédéric, 15/11).
6. Commit PAR CHEMIN, et mettre le tableau d'avancement à jour.

## Nommage et sorties
- Ids : `4e-perimetre-polygones`, `4e-aire-disque`, `3e-volume-boule`… (colonne « Id » du tableau
  des 28 épisodes dans le fichier de voix). Fichiers MP4 : `eleveai-maths-<classe>-<id sans classe>.mp4`.
- Sorties : `manim/sorties/4e/maths/{volume,solides,perimetre,aire}/NN-<slug>/` et
  `manim/sorties/3e/maths/<notion>/NN-<slug>/`.

## La passe finale (quand les 28 seront là)
- `manim/poste2/manifeste-4e.json` et `videos-r2-4e.json` (⛔ ne jamais toucher
  `manim/manifeste-youtube.json` ni `lib/videos/*.json` : ce sont les fichiers du 1er poste),
  `manim/poste2/coach-4e.md` pour le branchement, avec les `aussi` vers la 3e.
- `node scripts/verifier-centres-age.mjs manim/poste2/manifeste-4e.json` → 0 centre hors tranche.
- R2 : les clés sont dans `.env.local` et rclone 1.76 est installé, mais on n'envoie qu'une série
  validée par Frédéric.
- ⛔ Jamais de push : c'est le 1er poste qui fusionne `poste2` dans `main`.
