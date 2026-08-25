# Prompt — la 4ᵉ maths : vérifier le coach, puis écrire les fiches

> Écrit le 25/08/2026 par la session qui a fermé la 6ᵉ. **Autonome.**
> (`docs/*` est ignoré par git : ajouter avec `git add -f`.)

```
Tu travailles sur eleveai (C:\Users\FRED\Documents\eleveai).
Deux phases, dans cet ordre. NE PAS commencer par la seconde.

════ L'OBJECTIF DE FRÉDÉRIC, ET SON ARITHMÉTIQUE ════════════════════
« Finir le collège en maths et en français dans la semaine. »

⚠️ CE QUE DIT LA MESURE, ET IL FAUT LE DIRE À FRÉDÉRIC :
   maths 4e : 0 fiche · 136 micros · 19 notions
   maths 3e : 0 fiche · 140 micros · 22 notions
   → 41 fiches à ÉCRIRE depuis zéro, plus le français 4e et 3e.

La 6e a coûté UNE JOURNÉE pour 16 fiches QUI EXISTAIENT DÉJÀ — il ne
s'agissait que d'ajouter 105 dessins. Écrire une fiche depuis rien, c'est
le contenu, puis les dessins, puis la mesure, puis le PDF. 41 fiches ne
tiennent pas dans une semaine à ce standard.

⭐ PRIORITÉ : LA 4e D'ABORD. Son cahier de vacances est la page la plus
vue et la plus téléchargée du site (507 visiteurs le 24/08, contre 177
pour la 6e). Une 4e finie vaut mieux que deux classes à moitié.
⛔ NE PAS baisser le standard pour tenir un calendrier. Une fiche sans
dessin sur ses propriétés, c'est le bloc que l'élève survole — c'est
mesuré, et c'est toute la raison du travail des trois derniers jours.

Rendre compte de l'avancement réel à la fin de chaque journée, en fiches
terminées et vérifiées — pas en fiches commencées.

════ L'ÉTAT MESURÉ AU 25/08/2026 ════════════════════════════════════
maths 6e   18 fiches · dessins 100 % · micros 18/18   ✅ terminée
maths 5e   20 fiches · dessins 100 % · micros  0/20   (micros à faire,
                                        voir docs/prompt-micros-maths-5e.md)
maths 4e    0 FICHE · banque : 136 micros sur 19 notions

⚠️ LA 4e N'A AUCUNE FICHE. Les 19 notions sont sans fiche — elles ont
été éteintes le 21/08 pour être refaites au propre. Ce n'est donc PAS
« ajouter des dessins à des fiches existantes » comme en 6e : c'est
ÉCRIRE dix-neuf fiches. Prévoir plusieurs jours, pas une journée.

Les 19 notions sans fiche :
  relatif_operation · fraction_nombre · prop_proportionnalite
  litteral_expression · litteral_distributivite
  litteral_identite_remarquable · litteral_factorisation
  equation_resolution · pythagore_theoreme · thales_theoreme
  trigo_cosinus · quadrilatere_parallelogramme · sym_transformation
  aire_perimetre · aire_surface · volume_solide · stat_statistique
  proba_experience · algo_programmation

════ PHASE 0 — VÉRIFIER LE COACH DE 4e (Frédéric y tient) ═══════════
On n'écrit pas dix-neuf fiches contre une banque qu'on n'a pas vérifiée :
une fiche colle à la banque, donc une banque fausse produit dix-neuf
fiches fausses.

Il existe 25 vérificateurs dans scripts/. Les six qui comptent ici :

  node scripts/verifier-banque.mjs        validité : un `expected` absent
                                          des `choices` rend la question
                                          IMPOSSIBLE, et rien ne le dit
                                          au runtime
  node scripts/auditer-banque.mjs         couverture : y a-t-il de quoi
                                          ne pas se répéter ?
  node scripts/verifier-devinabilite.mjs  la question se gagne-t-elle
                                          SANS savoir ? (longueur de la
                                          bonne réponse, répétition d'un
                                          mot de l'énoncé…)
  node scripts/verifier-variete.mjs
  node scripts/verifier-generateurs.mjs
  node scripts/verifier-canvas.mjs        une micro dont l'intitulé décrit
                                          un GESTE graphique doit avoir
                                          une figure

⚠️ Chacun prend des arguments (matière, classe) : lire son en-tête, ils
sont tous documentés en tête de fichier.

⭐ LE SEUIL DE ROBUSTESSE EST DIX ÉNONCÉS PAR MICRO. Il n'est pas dans
une mémoire, il est dans les scripts. En dessous, le coach se répète et
l'élève reconnaît les questions au lieu de les résoudre.

Un travail a déjà été fait le 24/08 sur ce coach — voir le commit
034aadb9 « Le coach de 4e ne se gagne plus sans savoir ». Lire son
message avant de recommencer quoi que ce soit.

RENDRE COMPTE À FRÉDÉRIC AVANT LA PHASE 1 : combien de micros sous le
seuil, quelles notions sont faibles, ce qui est réparable et ce qui ne
l'est pas. Il décidera si on écrit les fiches maintenant.

════ PHASE 1 — ÉCRIRE LES FICHES ════════════════════════════════════
Le standard est dans lib/fiches/REGLES.md. L'étalon d'écriture est
lib/fiches/maths-6e-angles.tsx (fiche fermée le 24/08, mesurée).

Une fiche = un `notionId`, sinon le badge « 📖 Fiche » du coach ne sait
plus quoi allumer. La donnée vit dans lib/fiches/<matiere>-<classe>-
<notion>.tsx ; la page app/fiches-cours/… n'est qu'un point d'entrée
(métadonnées SEO + rendu).

⭐ UN VISUEL PAR BLOC. Chaque propriété et chaque étape de méthode porte
son dessin, fait avec un canvas du coach (lib/canvas), JAMAIS en SVG à la
main — pour que l'élève retrouve dans sa fiche la figure de ses exercices.
Lire lib/canvas/CATALOGUE.md EN ENTIER avant de choisir un `kind` : c'est
la colonne « ⛔ Pas pour » qui évite les contresens.

⭐ ET LA RÈGLE QUI A TENU 105 FOIS : le canvas se choisit pour ce qu'il
MONTRE, pas par habitude. Sur chaque fiche, le dessin évident revient
partout — le triangle en géométrie, le tableau en proportionnalité. Six
fois le même objet, ce sont six règles identiques aux yeux de l'élève.
Ce qui marche : chercher ce que le canvas évident ne sait PAS faire.
Et le procédé le plus utile est le CONTRE-EXEMPLE — une propriété qui dit
« toujours » se montre en dessinant le cas où c'est faux.

Annoter les micros au passage (champ `micros` sur chaque bloc, contrôle
`npm run verifier:micros`) : c'est gratuit pendant l'écriture, cher après.

════ POURQUOI LA QUALITÉ N'EST PAS NÉGOCIABLE ICI ═══════════════════
Frédéric, 25/08 : « le principal est d'avoir la qualité des coachs et des
fiches, car après j'attaquerai les vidéos Manim SUR LES FICHES. »

⭐ CE QUI VEUT DIRE QUE LES DESSINS SONT DE LA DONNÉE, PAS DES IMAGES.
Un dessin de fiche s'écrit :

    { kind: "angle", angle: { angleDeg: 55,
        display: { showProtractor: true, protractorStep: "reading" } } }

Ce n'est pas un SVG, c'est une DESCRIPTION de figure. Un script Manim
peut la lire et la rejouer — le rapporteur qui se pose, le zéro qui
s'aligne, la graduation qu'on lit. C'est l'animation que la fiche décrit
déjà en trois cartes fixes.

⛔ D'où l'interdit du SVG écrit à la main : il ne semblait qu'une règle
de cohérence visuelle (l'élève retrouve dans sa fiche la figure de ses
exercices), il est en réalité ce qui rendra les vidéos possibles. Un SVG
dessiné à la main ne se rejoue pas.

Et la structure en blocs d'une fiche — définition, propriétés, méthode,
exemples — EST déjà le storyboard. Une fiche bâclée donnera une vidéo
bâclée, et il sera trop tard pour la reprendre.

════ LES CINQ RÈGLES DE MESURE, APPRISES EN FERMANT LA 6e ═══════════
Aucune ne se lit dans le code ; toutes se sont vues au rendu.

1. `apercu-canvas.mjs` NE SUFFIT PAS. Il a dit « ✅ rien à signaler » sur
   des dessins que la page donnait à 8,7 px. Passer les DEUX : le script,
   puis la page.
2. Le bloc le plus serré est l'EXEMPLE (199 px sur un téléphone de 375),
   pas la carte de propriété (225). Au-delà de 210 de viewBox dans un
   exemple, ou 245 dans une propriété, le texte passe sous 11 px.
3. Mesurer à 375 ET 1280 px.
4. ⛔ Trois canvas ne se laissent PAS rétrécir (`solide_3d`,
   `transformation`, `fonctionGraphique`) : ils dessinent depuis une
   origine fixe, donc réduire `size.width` les ROGNE. Sur les deux
   premiers la seule commande est la POLICE ; le troisième ne tient pas
   dans une carte de propriété — essayé, mesuré, abandonné.
5. Quatre défauts qui ne sont pas des polices : graduations trop denses
   qui se touchent ; étiquettes de parts trop étroites (`schema_barre`
   donne une largeur PROPORTIONNELLE à la valeur, donc ⛔ une
   décomposition décimale ne se dessine JAMAIS en longueurs) ; une phrase
   du bas qui sort du cadre sans rien casser (compter en caractères,
   viser vingt) ; deux étiquettes au même endroit.

Après chaque fiche : rendre la page, mesurer, refaire son PDF
(npm run build:fiches-pdf -- <origine> <route>), puis npm run verifier:pdf.

════ CE QU'IL NE FAUT PAS FAIRE ═════════════════════════════════════
⛔ Le graphe des PRÉREQUIS : reporté par Frédéric.
⛔ Les ANCRES par micro : abandonné, voir docs/prompt-ancres-micros.md.
⛔ Changer les URL des fiches : sans redirections 301 on perd
   l'indexation acquise.
⛔ Le français : une autre session s'en charge (4e et 3e en cours).
⛔ Les fiches de CM2 en maths : Frédéric les réécrit, tout dessin
   ajouté partirait à la poubelle.

════ LES RÈGLES DE CE DÉPÔT ═════════════════════════════════════════
• git commit -F message.txt -- <fichiers>  ⭐ TOUJOURS par chemin.
• Une seule session à la fois dans ce dossier.
• Le serveur de dev se dégrade au bout d'une heure : 404 aléatoires puis
  build:fiches-pdf qui expire. Le relancer suffit, ce n'est jamais le code.
• `docs/*` est ignoré : git add -f.
• Lire docs/note-du-matin.md avant de commencer.
```
