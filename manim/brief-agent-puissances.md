# Brief commun — agents de rendu, série PUISSANCES 4e → 2de (une paysage + un short par épisode) — 04/11/2026

Réponds en français. Dépôt C:\Users\FRED\Documents\eleveai (Windows ; Git Bash et PowerShell). D'autres agents et d'autres sessions travaillent dans le dépôt : ne crée que TES fichiers ; range tes outils temporaires dans un sous-dossier à ton nom du dossier temporaire. Avance à PETITS PAS : les commandes longues (WAV, dry run, rendus) partent en ARRIÈRE-PLAN, jamais plus de 2 minutes au premier plan.

## À lire d'abord, EN ENTIER
`manim/REGLES.md` (questions-pauses, ceintures, synchro 0 s, bords, « Ce que tu as appris », phrase de fin), puis les MODÈLES collège finis :
- épisode COMMUN à deux classes (une base + une sous-classe par classe, seule l'identité/la ceinture change) : `manim/scripts/6e/prop_echelle_comprendre.py` + `prop_echelle_comprendre_short.py` + leurs `*_marques.json` et `manim/scripts/6e/prop_commun.py` (garde, identité, échelle de ceintures, `MotsCales`, `au_mot`, `AuditSynchro`, `CompteARebours`, questions-pauses, écran de fin) ;
- pour les arbres qui poussent branche par branche : `manim/scripts/terminale/denombrement_produit_somme.py` ;
- les visuels du coach dont on s'inspire : `lib/tutor-v4/questionBank/puissances-canvas-commun.ts` (carré quadrillé b × b, cube d'arête b, arbre de kⁿ chemins, table des puissances de 10).
⛔ Ne modifie aucun module commun ni le script d'un autre épisode (importe ou recopie dans TON script ce dont tu as besoin).

## Voix
VALIDÉES par Frédéric : `manim/voix/4e-puissance-<slug>.json` / `…-<slug>-short.json`. N'y change RIEN, sauf erreur factuelle ou phrase imprononçable (dis-le dans ton rapport). Débit −6 : `powershell -NoProfile -File scripts/generer-voix.ps1 -Fichier manim/voix/<nom>.json -Debit -6`, WAV dans `public/sons/<nom-de-la-voix>/`. Marques mot à mot : `scripts/marques_dump.ps1` puis `scripts/cues2marques.py` (comme les modèles). ⚠️ `cues2marques.py` perd les marques des mots RÉPÉTÉS (« 3 fois 3 fois 3 fois 3 » : seuls le premier et le dernier 3 sont datés) : recalcule ces marques toi-même (copie corrigée dans TON dossier temporaire, sans toucher au script commun). Voix 2de : `manim/voix/2de-puissance-<slug>.json`.

## Noms (épisode NN, slug ex. `comprendre`)
- Scripts : `manim/scripts/4e/puissance_<slug>.py` (classes `Puissance<Slug>4e`, `Puissance<Slug>3e`… selon les classes de l'épisode) et `manim/scripts/4e/puissance_<slug>_short.py` (classe `Puissance<Slug>Short`).
- Sorties : `manim/sorties/<classe>/maths/puissances/NN-<slug>/eleveai-maths-<classe>-puissance-<slug>[-short].mp4` (le short va dans le dossier 4e). media_dir `manim/scripts/4e/media-puiss-NN[-<classe>|-short]`.
- Identité « Maths 4e — EleveAI », « Maths 3e — EleveAI »… Mets le dossier du script EN TÊTE de `sys.path`.

## Règles du lot (collège, 13-15 ans)
- Un dessin par écran, qui BOUGE : l'arbre de partage qui pousse niveau par niveau (le nombre s'affiche quand la voix le dit), le carré de pixels qui se remplit rangée par rangée (et 4 × 2 = seulement deux rangées, en rouge), le cube qui s'empile, les facteurs « 3 × 3 × 3 × 3 » qui se replient en 3⁴ (la base et l'exposant pointés et nommés). Code couleur constant : bleu = la base, orange = l'exposant, vert = résultat juste, rouge = piège (a × n).
- Pour insister : AGRANDIR puis rétrécir (l'exposant, le 81 contre 12, le 32 contre 10).
- Le métier de la situation : pictogramme simple + prénom/métier écrit ; l'image concrète est DESSINÉE, schématique et lisible.
- Pas de LaTeX : tout en `Text`. Exposants en caractères ⁰¹²³⁴⁵⁶⁷⁸⁹ ou petit `Text` décalé vers le haut ; « × » pour fois ; virgule décimale ; grands nombres avec espaces.
- Questions-pauses : écran « Question ! », 3 boutons A / B / C, compte à rebours 5 s en paysage, 3 s en short, puis la bonne réponse s'allume (agrandir puis rétrécir) + la phrase d'explication de la voix.
- Short 9:16 : en HAUT l'image concrète qui bouge, en BAS les maths qui se remplissent EN MÊME TEMPS (geste et case synchrones). Il finit sur la question en commentaire, puis la fin standard. Échelle des ceintures ENTIÈRE sous le titre.
- Ti-Margo sur chaque écran. Synchro 0 s d'avance : un nombre ou un mot n'apparaît qu'au moment où la voix le dit. « Ce que tu as appris » : titre en haut, centré. Marge de 3 % sur les quatre côtés. Écran de fin identique aux modèles.

## ⛔ Un seul rendu HD à la fois SUR LA MACHINE (MemoryError sinon)
Avant chaque rendu HD : prends le verrou `mkdir "C:/Users/FRED/AppData/Local/Temp/eleveai-rendu-hd.lock"` (si la commande échoue, un autre agent rend : attends avec une boucle `until mkdir …; do sleep 30; done` lancée en arrière-plan, puis recommence). Libère-le (`rmdir`) dès la fin du rendu, même en cas d'échec. Les dry runs et rendus basse définition n'ont pas besoin du verrou. Shorts : `-qh -r 1080,1920`.

## Ordre obligatoire
voix + calage → `AUDIT=1 BORDS=1 python -m manim render --dry_run …` (0 AUDIT-AVANCE, 0 RETARD, 0 BORD) → planche basse déf de 8 images REGARDÉE, écran par écran → UN SEUL rendu HD par vidéo (`PYTHONIOENCODING=utf-8`, en arrière-plan, sous verrou) → `python scripts/verifier-bords-video.py <mp4>` = « 0 instants » → planche finale de 12 images regardée (zoom sur les questions, la correction, « Ce que tu as appris », chevauchements d'étiquettes). Place les étiquettes par calcul de distance aux objets mobiles AVANT le rendu.

⛔ CORRIGE TOUJOURS LES DÉFAUTS MINEURS (Frédéric, 04/11) : un texte serré, un léger chevauchement, une étiquette mal placée vus sur une planche se corrigent dans le script et se RE-RENDENT avant ton rapport. « Lisible quand même » ne suffit pas : ta section « soucis restants » ne doit contenir aucun défaut visuel corrigeable.

⛔ NE COMMITTE RIEN. ⛔ Ne lance JAMAIS la lecture d'une vidéo. ⛔ Pas de miniature, manifeste, R2 (la session principale s'en charge). Écris par morceaux de ≤ 150 lignes.

## Rapport final COURT
Fichiers créés, durées, ceintures, centres (liste fermée `lib/videos/centres-interet.ts`), liste `questions` JSON (t "MM:SS" mesuré sur le rendu = début de l'écran « Question ! », question, choix, reponse 0/1/2, explication) pour chaque vidéo, chapitres (MM:SS par dry run / renderer.time) de la paysage, résultat des bords, ce que tu as vu sur les planches, soucis restants. Écris AUSSI ce rapport dans `manim/rapports-puissances.md` (ajoute ta section, sans effacer celles des autres).
