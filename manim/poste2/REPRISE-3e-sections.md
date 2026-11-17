# Reprise — les 8 épisodes propres à la 3e (lot T, branche `poste2`)

Ouvert le 17/11/2026. Ce fichier ne couvre QUE les 8 épisodes T1 à T8 de la série
« Périmètre, aire, volume, solides ». Le tableau des 20 autres (4e) vit dans
`manim/REPRISE-4e-perimetre-aire-volume.md`, tenu par une autre session : ⛔ ne pas y toucher.

Voix (VALIDÉES par Frédéric le 15/11, ⛔ pas un mot à changer) :
`manim/poste2/VOIX-4e-3e-perimetre-aire-volume.md`, section « LOT 3 ».
WAV : `public/sons/3e-*/`. Marques : `manim/scripts/4e/3e_*_marques.json`. Tout était déjà prêt.

## Avancement

| Épisode | Id | Ceinture | Paysage | Short | HD — durées réelles |
|---|---|---|---|---|---|
| T1 | `3e-volume-boule` (le ballon, les poumons) | verte | ✅ | ✅ | ✅ 241,8 s / 57,8 s |
| T2 | `3e-volume-reduction-section` (le gobelet du cinéma) | bleue | ✅ | ✅ | ✅ 214,8 s / 55,3 s |
| T3 | `3e-section-pave-cube` (la tranche de pain de mie) | jaune | ✅ | ✅ | ✅ 199,1 s / 49,7 s |
| T4 | `3e-section-cylindre` (le tube d'une trottinette) | verte | ✅ | ✅ | ✅ 187,7 s / 58,3 s |
| T5 | `3e-section-cone-pyramide` (le volcan, 974) | verte | ✅ | ✅ | ✅ 195,8 s / 54,1 s |
| T6 | `3e-section-sphere` (les parallèles du globe) | bleue | ✅ | ✅ | ✅ 217,1 s / 54,6 s |
| T7 | `3e-section-longueur` (la position en vol) | bleue | ✅ | ✅ | ✅ 208,1 s / 61,0 s |
| T8 | `3e-section-defi` (scanner pour imprimer en 3D) | marron | ✅ | ✅ | ✅ 208,8 s / 54,2 s |

## ✅ Les 16 MP4 sont à jour et contrôlés (17/11, 12 h 35)

Sur CHACUN des seize : `verifier-bords-video` → 0 instant qui touche un bord ;
`verifier-zone-margo.py` → 0 instant où quelque chose recouvre Ti-Margo ;
`verifier-coche-carte.py` → 20 à 449 px entre le libellé et le ✓ (il mord sous 6) ;
`verifier-fraicheur-mp4.py --serie 3e` → **16 prouvés à jour, 0 douteux**.
À l'œil : les 8 planches relues écran par écran, les 8 compteurs contrôlés sur le MP4
(3 → 2 → 1 dans la carte, rien par-dessus), les 8 poignées « @eleveai974 » lues en entier
(Ti-Margo a quitté l'écran de commentaire, REGLES.md), et les 16 cartes gagnantes regardées en
PLEINE RÉSOLUTION, une par une.

⭐ **Trois méthodes indépendantes, une seule réponse.** Le contenu des MP4 (poignées, ✓, zone de
la mascotte), les seuils mesurés sur les sources, et l'outil de fraîcheur : les trois concluent
que rien n'est à re-rendre. C'est ce faisceau qui permet de clore, pas une date.

## ⛔ Ce que la relecture a trouvé, et qu'aucun garde-fou ne voyait

Le tableau reçu au passage de main donnait six épisodes pour bons. La relecture image par image
en a démenti cinq et a trouvé **douze chevauchements réels**, tous corrigés — tous invisibles
pour `BORDS=1`, qui ne signale que ce qui SORT du cadre :

- **la colonne de texte mordait sur la figure de droite** : T3 (écrans 02 et 03), T4 (écrans 01,
  02 et 03), T6 (écrans 01 et 02) ;
- **une figure recouvrait Ti-Margo** : T5 (écrans 02 et 04), et dans un SHORT T4 (le disque,
  poussé sous la mascotte par son propre `Indicate(×1,1)`) ;
- **une figure traversait le texte** : T8 (la pile de disques sur la phrase de réponse) ;
- **le texte touchait Ti-Margo** : T8 (écran de défi) ;
- **le ✓ de la bonne réponse mordait sur la dernière lettre** : T3, T5, T8 et les shorts T2, T3,
  T7 et T8 — voir les leçons 44 et 49, et le piège qui m'a coûté deux rendus : la méthode à
  surcharger n'est PAS la même en paysage (`_carte_choix`) et en short (`_carte`).
  ⭐ Le treizième, le short T3, n'a PAS été vu à l'œil : il a été MESURÉ, après coup, par
  `verifier-coche-carte.py`. J'avais regardé cette carte en plein format sans voir le contact.

⚠️ Et **trois faux positifs** : T4 écran 08, T6 et T7 écrans de défi. Sur une planche réduite ils
semblaient se toucher ; en pleine résolution, non. Voir la leçon 43 : la planche sert à REPÉRER,
le plein format à TRANCHER.

## La chaîne d'un épisode (rappel)

1. `manim/scripts/4e/3e_<slug>.py`, classe de base `Paysage3e` (de `volume_4e_commun.py`).
2. `PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run <script> <Scène>`
   → 0 AUDIT-AVANCE, 0 AUDIT-TARD, 0 RETARD, 0 TARD, 0 BORD.
3. `manim/scripts/4e/3e_<slug>_short.py`, classe de base `Short4e`, même contrôle en `-r 1080,1920`.
4. `bash manim/poste2/4e_hd.sh <script> <Scène> eleveai-maths-3e-<slug> manim/scripts/4e/media-hd-<t> manim/sorties/3e/maths/<notion>/NN-<slug> [1080,1920]`
   — un seul rendu HD à la fois sur la machine (verrou), l'autre session s'en sert aussi.
5. Planche : `bash manim/poste2/5e_planche.sh <mp4> <png> <colonnes> t1 t2 …`, et RELIRE les images.
6. Short : contrôler le COMPTEUR autour de « Mets pause » (3 → 2 → 1, dans la carte, rien par-dessus).

⛔ Ne jamais modifier `volume_4e_commun.py` ni `volume_4e_short_commun.py` (l'autre session s'en sert).
⛔ Commit PAR CHEMIN, uniquement les fichiers `3e_*.py`. ⛔ Jamais de push.

## Leçons propres à ce lot (elles s'ajoutent aux 30 de `manim/REPRISE-4e-perimetre-aire-volume.md`)

31. ⛔⛔ **Un dry run qui PLANTE passe inaperçu** : l'exception s'écrit sur la même ligne que la
    barre de progression, et un `grep` ordinaire ne la voit pas. Deux garde-fous, à garder :
    · filtrer la sortie par `tr '\r' '\n'` avant le grep (sinon les messages AUDIT/TARD collés
      à la barre de progression sont invisibles eux aussi) ;
    · vérifier que la ligne `ECRAN 10-abonne` est bien là — c'est la preuve que la scène est allée
      jusqu'au bout. (`manim/poste2/3e_dry.sh` fait les deux.)
32. ⛔ **`pause_defi(x=…)` n'existe pas** : la méthode effective est celle de `PaysageJ2`
    (`y`, `marge`). Et surtout, dans la colonne de droite, « Mets pause, et cherche ! » TOUCHE
    Ti-Margo (vu sur les planches de T1, T2, T3 et T4 : la mascotte occupe x > 4,6 et y < −2,2).
    Chaque épisode définit donc sa `pause_gauche()`, qui pose la phrase en bas À GAUCHE (x = −6,2).
33. ⛔⛔ **Un morceau réduit à « <nombre>. » perd son jeton** : `_jetons` applique
    `_ENUM = ^\s*[0-9]+\.(\s|$)` pour retirer les numérotations (« 1. »), donc « 3. » ne contient
    plus rien à attendre et s'affiche EN AVANCE. Couper autrement (« Le rayon » / « vaut 3. »).
34. ⛔ **Dans un SHORT, la phrase de réponse se cale sur ce qui est dit APRÈS le premier point
    de la voix** (`_poser` ne cherche qu'à partir de là). Avant d'écrire la phrase, lire la voix
    de réponse et repérer ce point : s'il tombe à la fin, la phrase ne doit porter AUCUN nombre.
    Un nombre et son unité vont dans deux morceaux (« 4,2 » puis « litres d'air. ») : sinon on
    attend le mot et le nombre part en AUDIT-TARD.
35. ⛔ **Le premier mot long d'une ligne de question doit être dit JUSTE avant son nombre.**
    « Une sphère de rayon 10 » attendait le « 10 » et mettait « sphère » en TARD de 0,9 s :
    « Rayon de la sphère : 10. » passe. (Même remède que la leçon 24, côté question.)
36. ⛔ **Un `Write(titre)` avant le premier `au_mot` d'un écran met l'écran en RETARD** quand la
    voix commence par le mot attendu (T5, « Pour une pyramide »). Le titre part alors dans le même
    `play` que la première ligne. Dans un SHORT, l'ouverture (0,7 s) suffit à retarder un FadeIn :
    poser la figure avec `add()`, sans animation.
37. ⚠️ `finale_gauche` centre la figure en x = −4,6 : au-delà de 3,8 d'unités de large, elle
    déborde (BORD). Un `fig.scale(0.7)` avant l'appel suffit.
38. ⚠️ La marge basse du paysage est y = −3,57 (et non −3,88) : un disque de rayon 1,2 centré
    en −2,4 déborde.
39. ⭐ Deux barres de comparaison se dessinent À L'ÉCHELLE : si le ballon écrase les poumons,
    l'écran dit le contraire de la voix (« c'est le même ordre de grandeur »).
40. ⛔⛔ **Dans un SHORT, on se cale sur les PIXELS de Ti-Margo, pas sur sa boîte.**
    `margo_bas()` le pose à `scale(0.38)` en y = −3,45. Sa boîte englobante monte à −2,92, mais
    elle contient du vide en haut : ses pixels réels s'arrêtent à **y = −3,02** (x de −0,28 à
    +0,29). Mesure de la session « passe finale des 28 », qui a compté les pixels au lieu de les
    estimer. D'où les valeurs sûres, par hauteur de bloc :
    · `commentaire()` (deux lignes, 0,852 de haut) → **y = −2,45** ; à −2,6 son bas tombe à
      −3,026 et il TOUCHE, à −2,9 (la valeur des 20 shorts de 4e) il le recouvre de 0,31 ;
    · une phrase seule (0,36 de haut) → **y = −2,65**.
    ⚠️ `BORDS=1` ne voit RIEN de tout cela : rien ne sort du cadre.
    ⭐ L'outil qui le mesure sans re-rendre en HD :
    `python manim/poste2/verifier-zone-margo.py <mp4> [--pas 0.4]` → « 0 instant où quelque chose
    recouvre Ti-Margo », ou la liste des instants fautifs. Il marche sur un rendu `-ql`, donc
    AVANT le HD, et il s'étalonne seul (la mascotte ne bouge jamais : le minimum de pixels allumés
    dans son rectangle sur toute la vidéo, c'est elle toute seule). Il connaît aussi le cadre
    paysage, où il regarde en bas à droite.
41. ⭐ Outil : `manim/poste2/verif-au-mot.py <script> <nom-voix>` relit le script, suit les
    `dire`/`ecran`/`question_gauche` et vérifie que CHAQUE `au_mot` existe dans la voix de SON
    écran. Il attrape en une seconde les fautes de casse (« La surface » vs « la surface ») qui
    font planter le rendu à la moitié de la vidéo.

42. ⛔⛔ **La date d'un MP4 ne prouve rien toute seule : elle se compare à l'ÉDITION qui l'a
    produit, pas au commit.** Un script écrit à 05 h 06 et commité à 05 h 27 donne un MP4 de
    05 h 06 qui peut être périmé sans qu'aucune date ne le dise. Au moindre doute, **refaire le
    rendu coûte six minutes ; une vidéo fausse en classe coûte bien plus.** Le short de T3 était
    dans ce cas : le tableau le disait « à jour », il ne l'était pas.
43. ⛔⛔ **Une planche à 4 ou 5 colonnes MENT sur les chevauchements.** Deux vignettes collées
    côte à côte donnent l'illusion qu'un texte d'une image touche une figure de la voisine, et
    une vignette de 640 px cache un contact de quelques pixels. **Toute suspicion se tranche sur
    une image PLEINE RÉSOLUTION** (`ffmpeg -ss … -vf "crop=…"`), jamais sur la planche. Trois
    « défauts » de ce lot étaient des faux positifs (T4 écran 08, T6 et T7 écrans de défi) ; deux
    vrais n'étaient visibles qu'au zoom.
44. ⛔⛔ **Le ✓ de la bonne réponse mord sur le libellé le plus long, et aucun garde-fou ne le
    voit.** `pythagore_pauses._carte` étire le contenu d'une carte jusqu'à 0,8 de son bord,
    alors que `question_pause` pose la coche à 0,38 du bord DROIT : il reste 0,07 d'air.
    ⛔ **Baisser `FS_C` ne sert à RIEN** — le gabarit redescend de toute façon le texte à la
    largeur de la carte : on rapetisse les libellés courts sans libérer le long. Le remède,
    local et sans toucher au gabarit partagé : surcharger `_carte` dans la scène et réserver la
    place (`self.LARG - 1.2`). Fait sur T2s, T3, T5, T7s, T8 et T8s.
    ⚠️ Les 20 épisodes de 4e tournent sur le même gabarit : à regarder de leur côté.
45. ⛔ **Un `Indicate(scale_factor=1.1)` déborde là où la figure au repos ne débordait pas.**
    Dans le short de T4, un disque de rayon 0,75 centré en −2,2 s'arrête à −2,95 ; pulsé à 1,1
    il descend à −3,03 et touche la tête de Ti-Margo. La pulsation compte dans la marge.
46. ⭐ **Une FIGURE recouvre Ti-Margo aussi bien qu'un texte.** Sur T5, le grand disque
    (écran 02) et le grand carré (écran 04) lui passaient dessus : la règle « x > 4,6 et
    y < −2,2 » vaut pour tout ce qu'on pose, pas seulement pour les phrases.
    ⭐ `verifier-zone-margo.py` (leçon 40) l'attrape tout seul : il a rendu « 0 instant » sur
    les 16 MP4 du lot une fois les corrections faites.
47. ⭐ **Écarter la colonne ne suffit pas : il faut regarder les HAUTEURS.** Quand une ligne et
    une figure se croisent, sortir la figure par le haut ou par le bas coûte moins cher que de
    la pousser à droite — poussée, elle finit par toucher le bord ou la mascotte. C'est ce qui a
    servi sur T3 (la tranche monte entre deux lignes, le carré descend sous elles) et sur T8
    (la pile de disques passe au-dessus de la phrase de réponse).
48. ⭐ Outils ajoutés pour ce lot, dans `manim/poste2/` : `planche-3e-paysage.sh <tag> <mp4>` et
    `planche-3e-short.sh <tag> <mp4>` fabriquent les deux planches d'un épisode en lisant les
    instants des écrans dans son `.hd.log` — et, pour un short, les trois images du compteur.
    `file-3e-lot*.sh` enchaînent plusieurs rendus sous le verrou commun.

49. ⛔⛔ **Ce n'est pas la longueur du libellé qui décide si le ✓ touche, c'est la largeur de la
    CARTE** — étroite dans un short. J'ai corrigé les six épisodes dont le libellé me *paraissait*
    long, et j'ai laissé passer « plus grande » (11 caractères) dans le short de T3, où le ✓
    touchait à **0 px**. Je l'avais pourtant regardé en pleine résolution.
    ⭐ L'outil qui tranche, écrit par la session de relève :
    `python -X utf8 -I manim/poste2/verifier-coche-carte.py <mp4> <seconde>` → l'écart en pixels
    entre la fin du libellé et le début du ✓, et « LE ✓ TOUCHE LE LIBELLÉ » sous 6 px.
    · L'instant : `02b-reponse + 4 s` pour un short, le MILIEU de l'écran de réponse pour un
      paysage (le ✓ n'est posé qu'après la lettre dite — trop tôt, on mesure une carte sans ✓).
    · ⛔ `-I` seul fait ignorer `PYTHONIOENCODING` et l'outil plante sur l'accent de « libellé » :
      lancer `python -X utf8 -I`.
    Mesure finale du lot : **20 à 449 px sur les 16**, après correction du short T3.
    ⭐⭐ **La mesure qui explique tout, et qui se fait SANS RENDRE** (quelques secondes) :
    `ligne.width` n'est pas la largeur du texte — c'est rond de la lettre + buff 0,25 + texte,
    soit ~0,8 de plus. Un libellé COURT ne fait donc pas une ligne étroite. Mesuré sur le short
    de T3 (`LARG = 3,9`, `FS_C = 28`) : « plus grande » → 2,991 ; « plus petite » → 2,741 ;
    « la même » → 2,325 ; « non, un huitième » et « une pyramide » → 3,100 (déjà rognés par le
    gabarit). D'où **la zone aveugle, entre 2,7 et 3,1** : au-dessus de 3,1 (= `LARG − 0,8`) le
    gabarit rogne lui-même et le texte s'arrête PILE où le ✓ commence ; en dessous de 2,7 il
    reste de l'air ; **entre les deux le gabarit ne fait rien et le ✓ mord quand même.**
    Se mesure ainsi, en lecture seule (⚠️ régler `config.frame_width/height` AVANT d'importer
    la scène, sinon les largeurs sont fausses — 4,5 × 8,0 en short, 14,22 × 8,0 en paysage) :
    `sc = C.__new__(C)` puis comparer `super(C, sc)._carte("A", t, sc.FS_C)[1].width` à
    `C._carte(sc, "A", t, sc.FS_C)[1].width`. Tout ce qui dépasse 2,7 touchait.
    ⛔⛔ La leçon générale : **sur ce défaut, l'œil ne suffit pas — il faut mesurer les 16, pas
    seulement ceux qu'on soupçonne.** Deux de mes trois erreurs de la journée viennent d'avoir
    choisi QUOI regarder au lieu de tout mesurer.
50. ⛔⛔ **« Périmé » se décide en comparant un MP4 à l'ÉDITION de son script, jamais à un commit**
    — ni au commit global du lot. Un commit n'écrit pas le fichier : il enregistre une édition
    souvent antérieure. Le relevé « 11 MP4 de 3e périmés » qui m'a été transmis venait de là ;
    le même calcul par fichier en donnait 8 ; la vérité était **0**. Et quand la date ne tranche
    pas, ce qui tranche est le CONTENU : regarder dans le MP4 ce que le correctif était censé
    changer (ici, la poignée « @eleveai974 » lisible en entier).

51. ⛔⛔ **« La surcharge manque » décrit le SOURCE ; « le ✓ touche » décrit le RÉSULTAT. Seul le
    second est un défaut.** Le 17/11 on m'a listé 9 scripts de 3e « à corriger » et un lot de
    11 rendus à relancer. Mesure faite, les deux listes étaient vides : sur 8 des 9, la condition
    de la surcharge ne se déclenche JAMAIS (la ligne la plus large va de 1,85 à 3,42 pour un
    seuil à 2,70 en short et 4,16 en paysage) — l'ajouter ne changerait pas un pixel. Le 9ᵉ,
    `3e_section_sphere_short`, dépasse bien le seuil sur « les deux pareil »… qui est le choix C
    alors que la bonne réponse est A : **le ✓ ne se pose jamais sur cette carte**. Vérifié des
    deux côtés : mesure sur les sources ET mesure sur les 16 MP4 (20 à 449 px), même conclusion.
    ⛔ Ne jamais conclure « à re-rendre » d'une absence dans le code : seul le MP4 fait foi, et
    un rendu inutile est une heure de verrou prise à deux autres sessions.
52. ⚠️ **Un libellé peut dépasser le seuil sans que ce soit un défaut** : regarder QUELLE carte
    est la bonne réponse avant de corriger. Le ✓ n'est posé que sur elle.

53. ⭐⭐ **Pour savoir si un MP4 porte une correction, on cherche dans l'IMAGE la trace que le
    diff a laissée — pas une date.** Un diff qui déplace quelque chose est mesurable : sur T4,
    le disque passait de x = 3,9 à 4,3, soit 54 px à 1920 ; une image à 25 s suffit à voir si
    « un disque. » touche le cercle ou en est séparé. Le MP4 accusé d'être périmé portait la
    correction. Quand un diff ne déplace rien de visible, c'est que le rendu n'avait pas d'enjeu.
    ⛔ Sur ce lot, TROIS relevés successifs ont conclu « périmé » sur une date (11, puis 8, puis
    5, puis 1 fichiers) ; à chaque fois la vérité était 0. **La date ne tranche jamais : ni le
    commit, ni même l'horodatage du source, puisqu'un rendu dure cinq minutes et qu'une édition
    précède son commit.**
54. ⚠️ **Un détecteur mal calibré coûte plus cher qu'un œil bien placé, pour une question
    binaire.** En voulant mesurer la position du disque de T4 j'ai échoué deux fois : mon masque
    attrapait le texte, qui est du MÊME cyan que la figure (`SECTION_C` sert aux deux), puis mon
    filtre par hauteur ratait le disque, rempli à 0,35 donc sombre. Une image recadrée au bon
    instant a répondu en une seconde. ⭐ Mesurer vaut pour un contrôle qu'on répète sur 16
    fichiers (le ✓, la zone de Ti-Margo) ; pour trancher UN cas, on regarde.

---

# ⭐ PROMPT DE REPRISE (lot 3e, 17/11/2026)

Tu reprends les **8 épisodes propres à la 3e** de la série « Périmètre, aire, volume, solides »,
sur la branche `poste2`, dans ce dossier **partagé avec une autre session** : ne touche QUE les
fichiers `manim/scripts/4e/3e_*.py` et ce fichier-ci.
⛔ Avant d'écrire quoi que ce soit, fais `git log --oneline -8` et vérifie que le dernier commit
du lot 3e est bien passé : on partage le dossier et la branche.

## Ce qui est fait et ne se refait pas

- **Les 16 scripts sont écrits, relus et commités** (6 commits, un lot par épisode ou deux).
  Tous passent `bash manim/poste2/3e_dry.sh <script> <Scène> 10-abonne` (ou `05-abonne 1080,1920`
  pour un short) avec **0 AUDIT-AVANCE, 0 AUDIT-TARD, 0 RETARD, 0 TARD, 0 BORD** — le seul message
  toléré est `AUDIT-ABSENT 10-abonne « 974 »`, qui vient du gabarit de fin.
- Les voix, les WAV et les marques étaient déjà là : ⛔ ne les retouche pas.
- L'aperçu en pause des 16 vidéos est écrit : `manim/sorties/3e/apercu-lot-3e.html`
  (servi par `python -m http.server 3907 --directory manim/sorties`).

## Ce qui reste

**Le lot est fini.** Les 16 MP4 sont rendus, à jour et contrôlés (voir le bilan plus haut), les
scripts sont commités, le tableau porte les durées réelles. Rien n'attend de rendu.

Ce qui n'est pas de mon ressort et reste ouvert :

1. **Le manifeste et l'aperçu des 28** — la session « Relève 4e/3e : la passe finale des 28 » les
   écrit à partir de ces MP4. Elle a été prévenue qu'ils sont stables.
2. **La validation de Frédéric, épisode par épisode** : l'aperçu en pause est
   `manim/sorties/3e/apercu-lot-3e.html`, servi par
   `python -m http.server 3907 --directory manim/sorties` → <http://localhost:3907/3e/apercu-lot-3e.html>.
   ⛔ Toutes les vidéos y sont en pause, jamais de lecture automatique.
3. ⚠️ **Le même défaut de ✓ existe dans les 20 épisodes de 4e** (gabarit partagé). La relève a
   confirmé l'avoir retrouvé chez elle, dans les deux formats, et a le remède (leçon 44).

Si un épisode devait être repris, la chaîne reste celle décrite plus haut : corriger une
POSITION, relancer `3e_dry.sh` de CET épisode, re-rendre, puis **relire les images** — et
trancher au plein format, jamais sur une planche réduite (leçon 43).

⛔ Jamais de push.

---

# ⏸️ RENDUS SUSPENDUS (17/11, consigne de Frédéric relayée par la session 4e)

**La 4e passe en premier : 75 % du budget hebdomadaire atteint.** Aucun rendu HD de 3e ne se
relance avant le feu vert de la session « 4e Périmètre, aire, volume et solides ». Le verrou
`%TEMP%\eleveai-rendu-hd.lock` lui revient. Vérifié au moment d'écrire : verrou libre, aucun
rendu en cours.

Ce qui reste utile en attendant, et qui ne coûte presque rien : les dry runs, les entrées de
manifeste, et ce tableau.

## ⭐ Comment on PROUVE qu'un MP4 est à jour (et pourquoi une date n'y suffit pas)

⛔ Quatre relevés successifs ont conclu « périmé » sur ce lot — 11, puis 8, puis 5, puis 1
fichiers. **La vérité était 0 à chaque fois**, et aucun n'avait été fait avec la bonne référence.
L'outil, lui, tranche :

```
python -X utf8 -I manim/poste2/verifier-fraicheur-mp4.py --serie 3e
→ 16 MP4 : 16 prouvés à jour, 0 douteux.
```

**Pourquoi mon relevé déviait — et c'est la leçon, pas l'erreur.** J'avais comparé la date du MP4
à celle du **commit** du script. Or un commit *enregistre* un contenu, il ne l'écrit pas : entre
l'écriture et l'enregistrement il peut s'écouler une demi-heure. Mes huit shorts ont tous été
écrits à 07:18:40, en une seule passe, et commités ensemble à 07:32:13 ; les cinq rendus lancés
entre ces deux instants paraissaient « en retard sur leur commit » alors que rien n'avait changé.
Même mécanique sur T4 paysage (écrit 06:27, rendu 06:40, commité 07:10).

⭐ **La bonne référence, ce sont les trois preuves réunies**, et c'est ce que l'outil vérifie :
1. `mtime(.py) < mtime(.mp4)` — le rendu suit la dernière écriture du script ;
2. le `.py` du disque est identique à HEAD — ce qui est commité est ce qui a été rendu ;
3. le `mtime` du MP4 coïncide à la seconde avec son `media-hd-t<N>[s].hd.log` — donc c'est un
   rendu, pas une copie. ⚠️ C'est la preuve qui manquait à mon relevé : `cp` et `mv` rafraîchissent
   un mtime sans rien rendre, et un MP4 recopié se déclare alors à jour.

⛔ Ne jamais relancer un rendu sur la foi d'une comparaison avec un commit : passer l'outil.

⭐⭐ **Et quand un doute subsiste, la règle qui tranche vraiment : un diff qui DÉPLACE quelque
chose laisse une trace mesurable dans l'image — on va la chercher dans le MP4.** C'est ainsi que
les cinq derniers doutes du lot ont été levés sans un seul rendu :
· T4 paysage, dont le diff poussait un disque de x = 3,9 à 4,3, soit 54 px à 1920 : sur le MP4,
  « un disque. » est nettement séparé du cercle (~60 px d'air), la correction est dedans ;
· les trois shorts dont le correctif retirait Ti-Margo de l'écran de commentaire : les huit
  poignées « @eleveai974 » se lisent en entier, donc aucune tête ne couvre de lettre ;
· T1 paysage, dont le seul changement était `pause_defi` → `pause_gauche` : « Mets pause, et
  cherche ! » est bien en bas à gauche.
Quand un diff ne déplace rien de visible, c'est que le rendu n'avait pas d'enjeu.

⚠️ Pour une question BINAIRE (ça touche / ça ne touche pas), une image bien cadrée bat un
détecteur mal calibré. La session qui a mesuré T4 s'y est reprise à trois fois : son masque
attrapait le texte, du même cyan que la figure, puis son filtre de hauteur ratait le disque à
moitié transparent. Le même piège de couleur a été rencontré sur deux outils différents ce
jour-là : un masque par couleur doit être vérifié sur un cas connu avant d'être cru.

## ⛔ `manim/poste2/3e_lot_final.sh` : NEUTRALISÉ, aucun de ses 11 rendus n'est nécessaire

Ce script avait été écrit pour refaire 11 épisodes, sur deux motifs. **Les deux sont tombés à la
mesure, et le compte final est 0 rendu, 0 script à corriger.** Il reste commité comme outil, ses
lignes en commentaire ; ⛔ ne pas le « compléter » ni le réactiver sans refaire les mesures.

**Motif 1, « la surcharge de la coche manque à 9 scripts ».** Vrai pour le source, faux pour le
résultat (leçon 51). Mesuré sur les 9, sans rendre : sur 8, la condition ne se déclenche jamais
— la ligne la plus large y va de 1,85 à 3,42 pour un seuil à 2,70 en short et 4,16 en paysage,
donc l'ajouter ne changerait pas un pixel. Le 9ᵉ, `3e_section_sphere_short`, dépasse le seuil sur
« les deux pareil »… qui est le choix **C** alors que la bonne réponse est **A** : le ✓ ne se
pose jamais sur cette carte (leçon 52). Vérification croisée sur les 16 MP4 : 20 à 449 px
d'écart sous le ✓, le plus serré étant ce même T6 short à 73 px.

**Motif 2, « des MP4 plus anciens que leur script ».** Quatre relevés successifs ont conclu
« périmé » sur 11, puis 8, puis 5, puis 1 fichiers : **la vérité était 0 à chaque fois**
(leçons 50 et 53). Le dernier cas, T4 paysage, était le mieux argumenté — MP4 06:40 contre
script 07:10 — mais 07:10 était l'heure du COMMIT, l'édition datant de 06:35. Preuve par l'image,
puisque le diff déplaçait des objets : sur le MP4, « un disque. » est séparé du cercle d'environ
60 px, alors qu'avant correction le point final le touchait. Les quatre autres étaient déjà
prouvés de même : les 8 poignées « @eleveai974 » lues en entier (donc `margo_bas()` a bien quitté
l'écran de commentaire) et « Mets pause, et cherche ! » en bas À GAUCHE sur T1.

⚠️ Le script porte une garde contre le CRLF que git peut lui donner au checkout (la session 4e a
perdu un rendu là-dessus ; le symptôme n'a pas été reproduit sur cette machine). Elle ne change
rien quand le fichier est propre : la garder.
