# Reprise de la série TRIANGLES 6e (bascule du 07/11/2026)

Réponds en français. Série : notions `triangle_figure` et `triangle_propriete`, 9 micros, une paysage Manim et un short en dessin animé Ti Margo 3D par micro. Slugs, décors, centres, ceintures et réponses des commentaires : `manim/REPRISE-triangles.md`.

## Où on en est
- Coach renforcé et committé (`8bd7ce8d`, non poussé).
- Les 18 voix sont écrites dans `manim/voix/6e-triangle-<slug>[-short].json` et ont été montrées en entier à Frédéric. **Il n'a pas encore répondu. Rien n'est généré ni rendu.** S'il corrige, modifie ces fichiers.

## Ce qui reste, dans l'ordre
1. Attendre son oui sur les voix, puis générer les voix (Julie, débit −6, `scripts/generer-voix.ps1`).
2. Rendre UN short et UNE paysage pilotes, les contrôler sur planches et images zoomées, les lui montrer, **donner le temps de rendu réel d'un short, et s'arrêter** : il valide le format avant les 9.
3. Après son oui, enchaîner sans redemander : rendu, contrôle, défauts mineurs corrigés et re-rendus, miniatures, manifeste, R2, branchement au coach, fiches YouTube. Rapport final : décisions, et ce qui reste à écouter.

## À lire d'abord
`manim/REGLES.md`, `manim/brief-agent-angles.md`, `manim/REPRISE-angles.md`, `manim/canvas_angles.py`, `manim/REPRISE-triangles.md`, puis pour les shorts `prototypes/ti-margo/LISEZ-MOI.md`. Mémoires : `shorts-amusent-paysages-apprennent`, `la-voix-correspond-aux-ecrits`, `questions-pauses-dans-les-videos`, `phrase-de-fin-des-videos`, `corriger-toujours-les-defauts-mineurs`, `short-ti-margo-mes-vues-doublent`, `ti-margo-encouragement-fractions`, `miniature-film-animation-3d`.

## Paysages
Chaîne Manim habituelle, ceinture verte. Modèles finis : `manim/scripts/6e/angle_reconnaitre.py`. `manim/scripts/6e/triangle_figure.py` est une ancienne vidéo : n'y touche pas, les nouveaux scripts sont par micro. Dans les figures, un arc marqué 40° ouvre vraiment 40°.

## Shorts
- Socle commun Ti Margo (`a7e85d3c`), à la place de la consigne d'origine de copier une page : `films/triangles.js` et `films/triangles.json` à partir de `films/_modele.*`. Ne copie aucune page. Commandes dans la reprise.
- Le socle ne fournit pas la miniature : le film définit `window.tiMargoMiniature`.
- Miniature : recette du « Défi du mur », Ti Margo plein cadre, pari en gros « TU PARIES ? », échelle des ceintures, pas de fond quadrillé, mention « Film d'animation 3D ». Décors différents d'un short à l'autre.
- Ti Margo complice maladroit, gag sur les maths, image et objet maths synchrones, chaque nombre dit est écrit. Un défi, pas un mini-cours.
- Figures justes en 3D : posées face caméra, un triangle rectangle ou isocèle doit se reconnaître, la caméra ne le déforme pas. Tangram : chat et bateau à composer avec les 7 vraies pièces.
- Pièges connus : `verifier-bords-video.py` alerte toujours sur un décor clair ; mixage avec `apad=whole_dur=FIN` et `-t FIN` ; silence de 0,1 s en tête des clips (mesurer avec d=0.05) ; pouce sur le côté du poing.

## Contraintes
- Ne lance jamais la lecture d'une vidéo.
- Commit PAR CHEMIN, seulement tes fichiers, sans pousser : le push se fait le soir à sa demande.
- `manim/manifeste-youtube.json` contient des modifications non commitées d'autres sessions : ajoute tes entrées sans le réécrire en entier.
- Rien sur YouTube sans son ordre.
- D'autres sessions partagent ce dossier : Relatifs 4e, et une réparation du coach de géométrie 6e sur les banques d'angles et de quadrilatères. Ne touche pas à leurs fichiers.
- Tiens à jour `manim/REPRISE-triangles.md`.

## Terminé quand
Les 18 vidéos sont contrôlées, sur R2 et au coach, et le rapport liste les décisions et ce qui reste à écouter.

## À lui signaler dans le rapport
La fiche de cours dit « triangle aigu », le coach et les voix disent « acutangle » : une des deux devra s'aligner. Figures du coach contrôlées par calcul, pas regardées à l'écran.
