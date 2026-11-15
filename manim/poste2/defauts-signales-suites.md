# Défauts repérés pendant la fin de série SUITES (épisodes 39 à 42) — NON corrigés

2e poste, 15/11/2026. Consigne reçue : **ne pas toucher aux fichiers partagés, noter au lieu de corriger.** Chaque point ci-dessous a été contourné DANS le script de l'épisode concerné ; le fichier d'origine est intact.

## 1. `manim/scripts/premiere/suites_commun.py` — `garde()` : AUDIT-ABSENT quand l'identité contient un chiffre
L'identité de classe (« Maths 1re — EleveAI ») est posée en `Text` audité. Comme « 1re » contient un chiffre, l'audit de synchro cherche le mot « 1 » dans la voix et ne le trouve pas : `AUDIT-ABSENT`. Touche en principe tous les épisodes de 1re et de 1re spé de la série (01 à 27), pas seulement les nouveaux.
*Contourné dans* `suite_expo_prolonger.py`.

## 2. `manim/scripts/premiere/suites_commun.py` — shorts : le bas de l'écran passe sous Ti-Margo
`appel_commentaire(y=-2.45)` et la ligne de base `y_bas = -2.85` posent le texte à moins de 0,15 de la mascotte : le contrôle `MARGO` du dry run se déclenche. Il faut remonter à −2,1 / −2,45.
*Contourné dans* `suite_expo_prolonger_short.py` *et* `suite_integrale_short.py`.

## 3. `manim/scripts/terminale/suite_limite_interpreter.py` — `grossir_indices` et les bornes d'intégrale
L'outil agrandit de 30 % tout indice Unicode. C'est ce qu'il faut pour uₙ, c'est trop pour la borne basse d'un `∫₀¹`, qui ressort plus grosse que la borne haute. Toute future vidéo d'intégrales retombera dessus.
*Contourné dans* `suite_integrale.py` *par une méthode* `bornes()` *locale.*

## 4. Organisation des agents : les fichiers temporaires doivent être nommés par agent
Deux agents de rendu ont écrit leur journal de rendu HD dans le même `hd-paysage.log` du dossier temporaire : les deux journaux se sont écrasés et un rendu HD a tourné un moment hors du verrou (tué puis relancé). À ajouter à la mission commune des prochains lots : **un sous-dossier par épisode dans le dossier temporaire, dès le premier fichier.**

## 5. Les accroches YouTube de la série disent « épisode NN sur 38 »
La série comptait 38 épisodes jusqu'au 13/11 ; elle en compte **42** depuis aujourd'hui. Les 38 accroches déjà au manifeste portent « sur 38 », les 4 nouvelles portent « sur 42 ». À harmoniser par le 1er poste lors d'un passage sur `manim/manifeste-youtube.json` (fichier partagé, non touché ici).

## 6. Durées : les voix validées rendent plus long que l'estimation
Estimations annoncées à Frédéric le 15/11 (mots ÷ débit) contre durées mesurées sur les MP4 :

| Vidéo | Estimé | Mesuré |
|---|---|---|
| 39 paysage | 4 min 18 | **5 min 15** |
| 39 short | 1 min 11 | **1 min 30** |
| 41 paysage | 5 min 37 | **5 min 55** |
| 41 short | 1 min 11 | **1 min 14** |

L'écart vient des temps d'animation et des deux compte-à-rebours de 5 s, qui ne sont pas dans l'estimation de la voix. Les shorts dépassent la fourchette du brief (45 s à 1 min 15) ; la série en compte déjà à 1 min 24 et 1 min 26. **Décision de Frédéric attendue** : laisser, ou resserrer les respirations des shorts et re-rendre.

## 7. ⚠️ Le gabarit de la série fabrique une image aux lettres déformées au passage « À toi de jouer ! » → « Correction »
Trouvé sur l'ép. 40 : le titre du défi devient le titre de la correction par un `ReplacementTransform`, qui dure 0,45 s et produit des glyphes intermédiaires. Images extraites de l'ancien rendu : net à 268,9 s, **déformé à 269,2 s**, net à partir de 269,6 s. Corrigé dans l'ép. 40 par un fondu sortant puis un fondu entrant.
⚠️ **`manim/scripts/terminale/suite_limite_comparaison.py` (ép. 36, le gabarit) et l'ép. 22 utilisent encore `ReplacementTransform(tit, cor)`** : le même défaut est donc probablement présent dans une partie des 38 épisodes déjà publiés. Il ne se voit que sur une image extraite au bon dixième de seconde — une planche à deux images par seconde peut le manquer.

## 8. `_OutilsSuites.au_mot` repart toujours du début de la phrase
Deux appels sur des mots qui ne sont pas dans l'ordre croissant de la phrase produisent un **faux RETARD** au dry run. Il faut donc donner les extraits dans l'ordre où la voix les dit. A coûté deux passes à l'agent de l'ép. 40 (écrans 02 et 04).

## 9. Pas de binaire ffmpeg sur ce poste pour les agents
`scripts/planche-video.py` et `verifier-bords-video.py` marchent (ils lisent avec PyAV), mais les agents n'ont pas trouvé de `ffmpeg` dans leur PATH et ont écrit leur propre extracteur d'images PyAV. *(Depuis la session principale, `ffmpeg` et `ffprobe` répondent bien, à `C:\ffmpeg\bin\` : c'est donc une question de PATH dans l'environnement des agents, pas une absence.)*

## 10. ⚠️⚠️ `suites_commun.fin_short` peut faire toucher les deux bords à `@eleveai974` — et le dry run ne peut pas le voir
Trouvé sur l'ép. 42 : `fin_short` termine par `Indicate(poignee, scale_factor=1.12)` alors que `@eleveai974` est borné à `largeur_texte` (4,1). **Au pic de l'animation la poignée fait 4,59 et touche les deux bords.** Contourné dans `suite_python_short.py` en surchargeant `fin_short` (poignée bornée à 3,55), sans toucher au module.

**Ce qui compte au-delà de cet épisode :** le dry run `BORDS=1` mesure **après** chaque animation, jamais pendant. Il est donc **structurellement incapable** de voir un dépassement qui n'existe qu'au pic d'un `Indicate` ou d'un `scale`. Seul `scripts/verifier-bords-video.py`, qui lit le MP4 image par image, le détecte. ⛔ **Ne jamais sauter cette étape**, et ne jamais conclure « 0 bord » sur la foi du seul dry run.

**Vérification faite ici** : les quatre shorts du lot (39, 40, 41, 42) passent `verifier-bords-video.py` à « 0 instants qui touchent un bord ». Le défaut ne s'est donc manifesté que sur l'ép. 42, dont la poignée était la plus large. **Les 38 shorts déjà publiés n'ont pas pu être vérifiés** : leurs MP4 ne sont pas sur ce poste (`manim/sorties/` est dans `.gitignore` et ne contient que ce lot et la 5e). À repasser au vérificateur depuis le poste qui les a.
