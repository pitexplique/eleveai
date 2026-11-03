# Brief commun — agents de rendu, CONVEXITÉ Terminale spé (une paysage + un short par micro) — 03/11/2026

Réponds en français. Dépôt C:\Users\FRED\Documents\eleveai (Windows ; Git Bash et PowerShell). D'autres agents rendent les autres micros en même temps, et d'autres sessions travaillent dans le dépôt : ne crée que TES fichiers ; range tes outils temporaires dans un sous-dossier à ton nom du dossier temporaire. Avance à PETITS PAS : les commandes longues (WAV, dry run, rendus) partent en ARRIÈRE-PLAN, jamais plus de 2 minutes au premier plan.

## ⛔ Une AUTRE session a fait sa propre vidéo de la notion : n'y touche pas
`manim/scripts/terminale/convexite_fonction.py` (+ `_marques.json`, `.cues.tsv`), `manim/voix/terminale-convexite-fonction.json`, `manim/voix/terminale-convexite-shorts.md`, `manim/sorties/terminale/maths/analyse/convexite/`, `media-convexite` : NE LES MODIFIE PAS, NE LES SUPPRIME PAS. Tu peux LIRE `convexite_fonction.py` comme modèle (dessins de courbes, tangentes, tableau de signes), en recopiant dans TON script ce dont tu as besoin (n'importe rien de ce fichier).

## À lire d'abord, EN ENTIER
`manim/REGLES.md` (questions-pauses, ceintures, synchro 0 s, bords, « Ce que tu as appris », phrase de fin), puis les MODÈLES Tle finis :
- `manim/scripts/terminale/loi_normale_escalier.py` + `loi_normale_escalier_short.py` et leurs `*_marques.json` (structure, `MotsCales`, `au_mot`/`au_pos`, `AuditSynchro`, `CompteARebours`, `pastille_pause`, `echelle_ceintures`, identité « Maths Tle — EleveAI », écran de fin) ;
- `manim/scripts/terminale/continuite_tvi.py` (le modèle lycée qu'il adore : accroche, rédaction du bac en lignes) ;
- la banque `lib/tutor-v4/questionBank/terminale-spe/maths/convexite.bank.ts` (+ `convexite-renfort.ts`) pour TA micro : mêmes notations, mêmes erreurs typiques.
⛔ Ne modifie aucun module commun ni le script d'un autre épisode.

## Voix
VALIDÉE par Frédéric le 03/11 : `manim/voix/terminale-convexite-<slug>.json` et `…-<slug>-short.json`. N'y change RIEN, sauf erreur factuelle (dis-le dans ton rapport). Débit −6 (comme les autres vidéos Tle) : `powershell -NoProfile -File scripts/generer-voix.ps1 -Fichier manim/voix/<nom>.json -Debit -6`, WAV dans `public/sons/<nom-de-la-voix>/`. Marques mot à mot : `scripts/marques_dump.ps1` puis `scripts/cues2marques.py` (fais comme le modèle loi_normale_escalier).

## Noms (distincts de l'autre session)
- Scripts : `manim/scripts/terminale/convexite_<slug_underscore>.py` et `convexite_<slug_underscore>_short.py` (ex. `convexite_derivee_seconde.py`). Mets le dossier du script EN TÊTE de `sys.path`.
- Classes : `Convexite<Slug>Terminale` et `Convexite<Slug>Short`.
- Sorties : `manim/sorties/terminale/maths/analyse/convexite-<slug>/eleveai-maths-terminale-convexite-<slug>[-short].mp4` ; media_dir `manim/scripts/terminale/media-convexite-<slug>[-short]`.

## Règles du lot (Tle, 17-18 ans)
- Ceinture : paysage VERTE (sauf `defi` : BLEUE), short BLANCHE ; échelle ENTIÈRE sur la page de garde et sous le titre du short.
- Un dessin par écran, qui BOUGE : courbes tracées (`Create`), tangente qui glisse le long de la courbe, corde, tableau de signes de f'' qui se remplit, point d'inflexion qui s'allume. Code couleur constant dans TA paysage et TON short : bleu = convexe / creux / f'' ≥ 0, orange = concave / bosse / f'' ≤ 0, vert = résultat juste, rouge = piège.
- Le métier de la situation est un pictogramme simple + le prénom + le métier écrit ; l'image concrète (skatepark, fusée, chanson, phares, atelier de vélos) est DESSINÉE, schématique et lisible.
- Pas de LaTeX sur le poste : tout en `Text` ; écris f'(x), f''(x), eˣ, x², x³, ln, ≥, ≤ ; « moins l'infini » s'écrit −∞. Décimaux à la française (virgule).
- Questions-pauses : écran « Question ! », 3 boutons A / B / C, compte à rebours 5 s en paysage, 3 s en short, puis la bonne réponse s'allume (agrandir puis rétrécir) + la phrase d'explication de la voix.
- Short 9:16 : en HAUT l'image concrète qui bouge, en BAS la courbe qui se trace EN MÊME TEMPS (synchrones, l'œil descend tout droit). Il finit sur la question en commentaire (dessin dont la réponse se lit, si la voix le demande : parcours, graphique), puis la fin standard.
- Ti-Margo sur chaque écran. Synchro 0 s d'avance : un nombre ou un mot n'apparaît qu'au moment où la voix le dit. « Ce que tu as appris » : titre en haut, centré. Marge de 3 % sur les quatre côtés. Écran de fin identique aux modèles.

## Ordre obligatoire
voix + calage → `AUDIT=1 BORDS=1 python -m manim render --dry_run …` (0 AUDIT-AVANCE, 0 RETARD, 0 BORD) → planche basse déf de 8 images REGARDÉE, écran par écran → UN SEUL rendu HD par vidéo (`PYTHONIOENCODING=utf-8`, en arrière-plan) → `python scripts/verifier-bords-video.py <mp4>` = « 0 instants » → planche finale de 12 images regardée (zoom sur les questions, la correction, « Ce que tu as appris »). Paysage d'abord, puis le short.

⛔ NE COMMITTE RIEN. ⛔ Ne lance JAMAIS la lecture d'une vidéo. ⛔ Pas de miniature, manifeste, R2 (la session principale s'en charge). Écris par morceaux de ≤ 150 lignes. Jamais deux rendus simultanés de ton côté.

## Rapport final COURT
Fichiers créés, durées, ceintures, centres (liste fermée `lib/videos/centres-interet.ts`), liste `questions` JSON (t "MM:SS" mesuré sur le rendu = début de l'écran « Question ! », question, choix, reponse 0/1/2, explication) pour chaque vidéo, chapitres (MM:SS par dry run / renderer.time) de la paysage, résultat des bords, ce que tu as vu sur les planches, soucis restants.
