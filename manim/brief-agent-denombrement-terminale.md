# Brief commun — agents de rendu, DÉNOMBREMENT + SOMME DE VA, Terminale spé (une paysage + un short par micro) — 03/11/2026

Réponds en français. Dépôt C:\Users\FRED\Documents\eleveai (Windows ; Git Bash et PowerShell). D'autres agents rendent les autres micros en même temps, et d'autres sessions travaillent dans le dépôt : ne crée que TES fichiers ; range tes outils temporaires dans un sous-dossier à ton nom du dossier temporaire. Avance à PETITS PAS : les commandes longues (WAV, dry run, rendus) partent en ARRIÈRE-PLAN, jamais plus de 2 minutes au premier plan.

## À lire d'abord, EN ENTIER
`manim/REGLES.md` (questions-pauses, ceintures, synchro 0 s, bords, « Ce que tu as appris », phrase de fin), puis les MODÈLES Tle finis :
- `manim/scripts/terminale/convexite_tangente.py` + `convexite_tangente_micro_short.py` (série la plus récente, même structure que toi) ;
- `manim/scripts/terminale/loi_normale_escalier.py` + `loi_normale_escalier_short.py` et leurs `*_marques.json` (`MotsCales`, `au_mot`/`au_pos`, `AuditSynchro`, `CompteARebours`, `pastille_pause`, `echelle_ceintures`, identité « Maths Tle — EleveAI », écran de fin) ;
- `manim/scripts/terminale/continuite_tvi.py` (rédaction du bac en lignes) ;
- la banque du coach de TA micro : `lib/tutor-v4/questionBank/terminale-spe/maths/denombrement.bank.ts` (+ `denombrement-renfort.ts` s'il existe) ou `variables-aleatoires.bank.ts` (micro `va_somme`).
⛔ Ne modifie aucun module commun ni le script d'un autre épisode (recopie dans TON script ce dont tu as besoin).

## Voix
Écrites le 03/11 : `manim/voix/terminale-denombrement-<slug>.json` / `…-<slug>-short.json`, et `manim/voix/terminale-proba-va-somme.json` / `…-short.json`. N'y change RIEN, sauf erreur factuelle ou phrase imprononçable (dis-le dans ton rapport). Débit −6 : `powershell -NoProfile -File scripts/generer-voix.ps1 -Fichier manim/voix/<nom>.json -Debit -6`, WAV dans `public/sons/<nom-de-la-voix>/`. Marques mot à mot : `scripts/marques_dump.ps1` puis `scripts/cues2marques.py` (comme le modèle loi_normale_escalier).

## Noms
- Dénombrement : scripts `manim/scripts/terminale/denombrement_<slug_underscore>.py` et `denombrement_<slug_underscore>_short.py` ; classes `Denombrement<Slug>Terminale` / `Denombrement<Slug>Short` ; sorties `manim/sorties/terminale/maths/probabilites/denombrement-<slug>/eleveai-maths-terminale-denombrement-<slug>[-short].mp4` ; media_dir `manim/scripts/terminale/media-denombrement-<slug>[-short]`.
- Somme de VA : `proba_va_somme.py` / `proba_va_somme_short.py`, classes `ProbaVaSommeTerminale` / `ProbaVaSommeShort`, sorties `manim/sorties/terminale/maths/probabilites/va-somme/eleveai-maths-terminale-proba-va-somme[-short].mp4`, media `media-va_somme[-s]`.
Mets le dossier du script EN TÊTE de `sys.path`.

## Règles du lot (Tle, 17-18 ans)
- Ceinture : paysage VERTE (sauf `defi` : BLEUE), short BLANCHE ; échelle ENTIÈRE sur la page de garde et sous le titre du short.
- Un dessin par écran, qui BOUGE : arbres de choix qui poussent branche par branche (le nombre de chemins s'affiche quand la voix le dit), cases de code qui se remplissent, podium qui se compose, groupes entourés, grille de rues où les nombres de chemins se propagent, triangle de Pascal qui se construit par additions (flèches des deux voisins), points reliés pour les poignées de main, dés qui roulent et histogramme du total qui se resserre. Code couleur constant : bleu = l'ordre compte / k-uplet, orange = sans ordre / combinaison, vert = résultat juste, rouge = piège.
- Le métier de la situation : pictogramme simple + prénom + métier écrit ; l'image concrète est DESSINÉE, schématique et lisible.
- Pas de LaTeX sur le poste : tout en `Text`. Écris n!, (n − k)!, nᵏ, 2ⁿ, √n ; « k parmi n » s'écrit avec deux nombres empilés entre grandes parenthèses (deux `Text` dans des parenthèses étirées), comme au bac. E(X + Y), V(aX + b) = a²V(X). Décimaux à la française (virgule), grands nombres avec espaces (10 000, 40 320).
- Questions-pauses : écran « Question ! », 3 boutons A / B / C, compte à rebours 5 s en paysage, 3 s en short, puis la bonne réponse s'allume (agrandir puis rétrécir) + la phrase d'explication de la voix.
- Short 9:16 : en HAUT l'image concrète qui bouge, en BAS le calcul ou le dessin mathématique EN MÊME TEMPS. La surprise finale doit être spectaculaire (52! qui s'écrit chiffre après chiffre, Sierpinski qui apparaît, 1 048 576 pizzas…). Il finit sur la question en commentaire, puis la fin standard.
- Ti-Margo sur chaque écran. Synchro 0 s d'avance : un nombre ou un mot n'apparaît qu'au moment où la voix le dit. « Ce que tu as appris » : titre en haut, centré. Marge de 3 % sur les quatre côtés. Écran de fin identique aux modèles.

## ⛔ Un seul rendu HD à la fois SUR LA MACHINE (MemoryError sinon)
Avant chaque rendu HD : prends le verrou `mkdir "C:/Users/FRED/AppData/Local/Temp/eleveai-rendu-hd.lock"` (si la commande échoue, un autre agent rend : attends avec une boucle `until mkdir …; do sleep 30; done` lancée en arrière-plan ou via Monitor, puis recommence). Libère-le (`rmdir`) dès la fin du rendu, même en cas d'échec. Les dry runs et rendus basse définition n'ont pas besoin du verrou. Shorts : `-qh -r 1080,1920` (sinon sortie paysage).

## Ordre obligatoire
voix + calage → `AUDIT=1 BORDS=1 python -m manim render --dry_run …` (0 AUDIT-AVANCE, 0 RETARD, 0 BORD) → planche basse déf de 8 images REGARDÉE, écran par écran → UN SEUL rendu HD par vidéo (`PYTHONIOENCODING=utf-8`, en arrière-plan, sous verrou) → `python scripts/verifier-bords-video.py <mp4>` = « 0 instants » → planche finale de 12 images regardée (zoom sur les questions, la correction, « Ce que tu as appris », chevauchements d'étiquettes). Paysage d'abord, puis le short. Place les étiquettes par calcul de distance aux objets mobiles AVANT le rendu (leçon de la convexité).

⛔ NE COMMITTE RIEN. ⛔ Ne lance JAMAIS la lecture d'une vidéo. ⛔ Pas de miniature, manifeste, R2 (la session principale s'en charge). Écris par morceaux de ≤ 150 lignes.

## Rapport final COURT
Fichiers créés, durées, ceintures, centres (liste fermée `lib/videos/centres-interet.ts`), liste `questions` JSON (t "MM:SS" mesuré sur le rendu = début de l'écran « Question ! », question, choix, reponse 0/1/2, explication) pour chaque vidéo, chapitres (MM:SS par dry run / renderer.time) de la paysage, résultat des bords, ce que tu as vu sur les planches, soucis restants. Écris AUSSI ce rapport dans `manim/rapports-denombrement-terminale.md` (ajoute ta section, sans effacer celles des autres).
