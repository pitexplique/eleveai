# Passation — les vidéos d'écriture des lettres (CP)

> À coller tel quel dans une session neuve. Tout ce qui suit a été vérifié au
> rendu le 02/09/2026, pas supposé.

---

## Ta mission

Produire les **vidéos d'apprentissage des lettres** pour le CP, sur le modèle de
`manim/scripts/cp/lettre_a.py`, qui est **fait, rendu et validé par Frédéric**.

Chaque vidéo enchaine : le **son** de la lettre → la **réglure** et le point de
départ → le **tracé lent mené par un stylo** → deux reprises plus rapides →
**« a comme… »** cinq mots, chacun avec son dessin → **« On essaie un autre
mot ? »** → **Ti-Margo**.

**État au 04/09/2026 (soir).**
⭐ **LES SIX VOYELLES** — `a`, `e`, `i`, `o`, `u`, `y` : deux Shorts, une fiche
d'écriture, une vignette et une page chacune. `a`, `i`, `o` sont **en ligne**.
⭐ **DEUX CHIFFRES** — `0` et `1` : deux Shorts et deux vignettes chacun.
⛔⛔ **ON NE PRODUIT PLUS AVANT D'AVOIR MESURÉ** (Frédéric, 04/09 : « on
analysera les chiffres sur YouTube avant de se lancer à faire des vidéos »).
Seize Shorts sont faits, et on ne sait toujours pas grand-chose : le seul
chiffre solide est **126 vues pour un Short contre 2 pour un paysage**, et c'est
lui qui a fait abandonner le 16:9. Le reste est encore une hypothèse.

**Les trois questions à trancher avec les chiffres réels :**
1. ⭐ **Le gaucher fait-il vraiment mieux ?** 126 contre 37 sur le `a` — mais le
   gaucher était sorti en premier. ⚠️ Le test est prêt : publier le `i` avec le
   **droitier D'ABORD**. Si le gaucher repasse devant en étant sorti second, ce
   n'est plus l'ordre — c'est qu'aucune autre chaîne ne parle aux gauchers.
2. **Lettres ou chiffres ?** Deux familles, deux publics ; laquelle circule.
3. **Le titre en question** (« Pourquoi on ne peut pas dessiner zéro ») contre
   l'intitulé (« Écrire le chiffre 0 »).

👉 Ensuite seulement : les chiffres `2` à `9`, puis les vingt et une consonnes.

## ⛔ Ce qu'il faut savoir avant de reprendre

**LES TRACÉS DE 2 À 9 SONT VALIDÉS** (planche dessinée le 04/09). ⚠️ Le `4` et le
`5` s'écrivent **EN DEUX TEMPS** en français : on lève le crayon. Les tracer d'un
seul trait oblige à revenir en arrière sur son propre chemin — l'erreur exacte du
point du `i`. La machinerie existe (`lettre_i.py` lève déjà le crayon).

**UN CHIFFRE N'A PAS DE SON.** L'écran des cinq mots des lettres est remplacé par
la **quantité**. ⭐⭐ Et le zéro ne se dessine pas : on montre une DISPARITION —
trois pommes, on les mange, **l'assiette reste**. ⛔ Jamais d'écran vide.
Pour `1`, cinq objets DIFFÉRENTS (un seul de chaque) : c'est la variété qui
enseigne que le nombre ne dépend pas de la chose comptée.

**LES CHIFFRES SONT DES MATHS** : `page_de_fin(..., portes=PORTES_MATHS)`, garde
qui dit « Les chiffres », deux interlignes au lieu de trois, sorties nommées
`eleveai-maths-cp-chiffre-<n>-…`, vignettes dans `cp/maths/shorts`.

**LA GARDE TIENT 1,50 s** — et c'est la vignette téléversée qui le permet
(`python scripts/vignettes-shorts.py`). Le réglage a bougé quatre fois
(0,75 → 1,30 → 1,80 → 1,50) parce qu'on devinait l'instant du prélèvement.
⛔ Sans vignette téléversée, remonter à 1,80.

**CE QUI RESTE À FAIRE, ET QUI N'EST PAS DU RENDU :**
- ⚠️ **Les chiffres n'ont pas de fiche** : `manim/fiche_ecriture.py` ne connaît
  que les lettres, et la famille `chiffres` du hub est fermée (`ouverte: false`).
  Tant qu'elle l'est, **aucune description de chiffre ne doit porter de lien**.
- ⚠️ **Les identifiants YouTube** manquent dans `lib/fiches-ecriture/registre.ts`
  (constante `VIDEOS`) : les six pages de lettres annoncent « la vidéo arrive
  bientôt » alors que trois sont en ligne.
- ⚠️ **`a`, `i`, `o` en ligne sont périmés** : ancienne garde, ancien écran de
  fin sans « Fiches d'écriture ». Les fichiers à jour sont sur le disque.

## ⛔⛔ Ce qui a changé depuis le 03/09 et qui commande tout

**ON NE REND QUE LES SHORTS.** 126 vues pour un Short contre 2 pour la même
vidéo en paysage. Les scènes 16:9 restent dans les fichiers, on ne les rend
plus. `1920p60/` = portrait = ce qu'on publie.

**L'IMAGE À 1,000 s EST LA VIGNETTE DU SHORT.** YouTube la prélève là, et le
PNG 1280×720 du générateur ne sert qu'au paysage — sur un Short il ne s'affiche
pas. La page de garde tient donc **1,30 s** (`page_de_garde`), et « Pour
droitier » / « Pour gaucher » doit y être lisible. ⚠️ `a`, `i` et `o` ont été
publiés avec l'ancienne durée : leur vignette était un écran noir.

**UN SEUL FICHIER PORTE LE MONTAGE** : `lettre_commune.py` (réglure, stylo,
`page_de_garde`, `ecran_relance`, `page_de_fin`, `verifier`). ⛔ Trois fois de
suite, une lettre a gardé sa propre copie d'un écran et n'a pas reçu une
correction — c'est ainsi que « Fiches d'écriture » a manqué au `i`. **Ne jamais
recopier un écran dans un fichier de lettre.**

**`verifier()` ARRÊTE LE RENDU** si un texte dépasse la largeur du cadre. Il a
remplacé un filet silencieux qui écrasait le bloc et faisait passer deux
défauts pour des rendus corrects. ⭐ Sur le `u`, il a montré que le coupable
était le TITRE et non la liste : sa mesure ne bougeait pas quand je rétrécissais
les mots.

**DEUX FORMATS DE LISTE, selon la lettre :**
- `a`, `i`, `o` → « **a comme…** », cinq mots qui COMMENCENT par la lettre ;
- `e`, `u`, `y` → « **u comme dans…** », le son DANS le mot, la lettre coloriée
  à sa place (`ecran_relance(..., dans_le_mot=True)`).
⭐ C'est le second format qu'il faudra pour **les vingt et une consonnes**.

**LA FICHE D'ÉCRITURE** (`manim/fiche_ecriture.py`) sort du même tableau
`TRACES` que les vignettes : une lettre ajoutée là donne le PDF, l'aperçu, la
vignette et la page `/fiches-ecriture/lettres/<x>`. ⛔ Une lettre à JAMBAGE
(y, et bientôt j, g, p, q, f) prend un interligne plus court — sinon sa jambe
passe sous la consigne de la bande suivante.

---

## ⛔⛔ Les cinq pièges, tous payés une fois

**1. Une police donne le CONTOUR d'une lettre, pas son CHEMIN.**
Une cursive — dans une police comme dans un SVG trouvé en ligne — est un tracé
fermé qui monte d'un côté du trait et redescend de l'autre. `Write()` et
`Create()` animent ce contour : le crayon ferait **le tour** de la lettre.
Sur une vidéo dont l'objet EST le geste, c'est montrer l'inverse de ce qu'on
enseigne. ⚠️ Marelle livre 12 fichiers, **tous des contours**.
👉 Chaque lettre s'écrit **à la main, en Bézier cubiques**, avec son point de
départ et son sens. Voir `DEPART`, `COURBES`, `STEM_BAS`, `SORTIE` dans
`lettre_a.py`.

**2. ⛔ TOUJOURS `--disable_caching`.**
`Scene.add_sound` commence par `if self.renderer.skip_animations: return`, et ce
drapeau passe à True dès qu'une animation vient du cache. Sans l'option, la
vidéo sort avec **une phrase sur douze** — 3,71 s d'audio pour 48 s d'image,
sans un mot dans les journaux.
👉 Après chaque rendu, **vérifier la durée de la piste audio** :
```
python -c "import av; c=av.open('<le mp4>'); st=[s for s in c.streams if s.type=='audio'][0]; n=sum(f.samples for f in c.decode(st)); print('VIDEO %.2f AUDIO %.2f' % (c.duration/1e6, n/st.rate))"
```
Les deux nombres doivent être proches. Sinon, le son a sauté.

**3. Les `wait()` se calent sur la DURÉE MESURÉE de chaque clip.**
Le générateur imprime les durées ; on les recopie dans `DUREE`. Et **le tracé
dure exactement le temps de la phrase qui le décrit** — sinon l'enfant entend
« on redescend » quand le crayon est déjà sorti.
⚠️ Pour lire un WAV, **parcourir les chunks**, jamais lire à l'offset 40 : ces
fichiers portent des blocs supplémentaires (un premier essai annonçait 874 s
pour un clip de 3,7 s).

**4. ⛔ La synthèse dit le NOM des consonnes.**
« a » se lit bien `[a]`. Mais « b » se lit **« bé »** — le nom de la lettre,
l'erreur exacte à ne pas commettre au CP.
👉 Pour une consonne, ne JAMAIS faire dire la lettre seule : écrire une
**syllabe** (« ba », « bi »), ou attendre un enregistrement de Frédéric.

**5. Chaque mot a SON dessin.**
Jamais un seul dessin pour toute la liste : un mot sans image serait le seul que
l'enfant ne pourrait relier à rien. ⚠️ C'est ce qui a fait sortir « allons » —
un verbe ne se dessine pas. Choisir **cinq noms concrets** qui commencent par la
LETTRE **et** par le SON (« âne » aurait le son sans la lettre nue).

---

## ⛔⛔ Les six pièges payés le 03/09 — à ne pas repayer

**6. Le stylo ne suit PAS le chemin.** Il suivait la normale au segment : sur le
rond du `a` la tangente fait un tour complet, donc le stylo tournait avec elle et
finissait **couché vers la gauche — la prise d'un gaucher**, projetée à toute la
classe. Angle **constant** (`ANGLE_STYLO = 30°`), miroir (`PI − ANGLE_STYLO`)
pour les gauchers. Une main ne change pas de prise en cours de lettre.

**7. Quatre vidéos par lettre**, pas deux : droitier × gaucher × paysage ×
portrait. Nommage `eleveai-francais-cp-lettre-<x>-<main>-<cadre>`.
⛔ **Une commande de rendu par scène** : `config.frame_width` est global, un
portrait rendu avant un paysage laisse le cadre étroit au second, et tout son
texte déborde **sans qu'aucune erreur ne le signale**.
⚠️ Manim range par **hauteur** : `1080p60/` = paysage, `1920p60/` = portrait.

**8. Aucune image noire, jamais.** La vidéo s'ouvrait sur 3,2 s d'écran noir — la
première phrase jouée sur du vide. La page de garde va de **0 à 1 s**, posée par
`add` et non par `play` : un fondu d'entrée ne peut pas s'appliquer à la première
image, il ne fait que la retarder. Elle porte `Français CP · Écriture cursive`,
**les deux formes de la lettre** (cursive à gauche, plus grande) et **« Pour
droitier » / « Pour gaucher »** en haut — la seule chose qui distingue les deux
vidéos.

**9. La page de fin est une PORTE, pas une signature.** « Va sur eleveai.fr /
Essaie notre coach CP français ». On nomme le **coach français**, la porte qui
mène au tutor — jamais l'accueil, sinon l'enfant arrive et cherche.
⚠️ Vérifier que la page répond **avant** de l'écrire à l'écran.
⚠️ Signature YouTube : **« Frédéric Lacoste — La Réunion 🌋 »**, sans le mot
*enseignant* (Frédéric, 03/09).

**10. Les dessins se jugent à leur TAILLE FINALE.** L'iris du `i` — trois pétales
étroits et vides — ne faisait plus qu'un bâton une fois réduit à 0,52 dans la
liste des mots. Le seul des cinq qui ne disait rien. Regarder l'image du rendu,
pas le code.

**11. Chaque lettre a son propre interligne dans la vignette.** Le point du `i`
monte à 1,32 interligne là où le `a` culmine à 1,05 : au même réglage il se
posait **sur le sous-titre**. Clé `"il"` dans `TRACES` (`manim/miniature.py`).
Une lettre à hampe (`b`, `l`, `h`) en demandera un plus court encore.

---

## ⛔ Le piège du `e` — pourquoi il est reporté

La règle du `a` (« cinq noms concrets qui commencent par la **lettre** ET par le
**son** ») **n'a pas de solution pour `e`** : en position initiale, la lettre `e`
ne fait presque jamais [ə] en français. « école » et « étoile » sont des `é`,
« escargot » est [ɛ], « enfant » est nasal. Une vidéo qui les alignerait ferait
entendre **quatre sons sous une seule lettre** — exactement l'erreur qu'elle est
censée éviter.

Trois voies, **non tranchées, c'est l'arbitrage de Frédéric** :
1. « e comme **dans** cheval » — cheval, renard, melon, requin, cerise ; le `e`
   colorié à sa place **dans** le mot. Juste, mais casse le parallélisme.
2. Faire `o` et `u` d'abord (lettre et son coïncident) — **voie retenue le 03/09**.
3. Forcer l'initiale malgré le son — déconseillé.

⚠️ **Même pour `o` et `u`, les listes se valident.** `île` est écarté du `i` par
la règle qui avait sorti `âne` du `a` : le circonflexe donne le son sans la
lettre nue. Et tous les mots en `in-` (insecte, instrument) sont écartés — la
lettre y est un `i`, mais elle se lit [ɛ̃].

---

## Ce qui existe déjà et qu'on ne refait pas

| | |
|---|---|
| `manim/scripts/cp/lettre_a.py` | le modèle : les 4 scènes, voix, stylo, garde, fin |
| `manim/scripts/cp/lettre_i.py` | la 2ᵉ lettre — et le geste **en deux temps** (on lève le crayon pour le point) |
| `manim/miniature.py` → `TRACES` | le chemin de chaque lettre pour la vignette ; ajouter `o` = 5 lignes |
| `manim/miniatures/cp/francais/` | les vignettes, 1280×720 (paysage) et 1080×1920 (portrait, = l'image 0 de la vidéo) |
| `scripts/generer-voix.ps1` | la voix, depuis un JSON — **Julie**, voix moderne |
| `manim/voix/cp-lettre-a.json` | les 15 phrases |
| `public/sons/cp-lettre-a/` | les clips |
| `public/apercu-video-lettre-a.html` | la maquette qui valide **avant** de rendre |
| `manim/charte.py`, `manim/mascotte.py` | couleurs et Ti-Margo (il tient un crayon) |

⭐ **La maquette a payé trois fois** : elle a montré que le stylo tenait la
route, que la lettre restait affichée derrière les mots, et que le zoom devait
porter sur la ligne. Aucun des trois ne se lisait dans le code.
👉 **Valider la courbe de la lettre dans le navigateur avant d'écrire du Python.**

---

## Les arbitrages de Frédéric — ne pas les re-litiger

- **Ti-Margo à l'accueil et à la fin, jamais au milieu.** `REGLES.md` le veut
  partout ; pendant le tracé l'œil doit suivre le crayon **et rien d'autre**.
- **Le zoom porte sur la ligne entière, mot ET image** — pas sur le mot seul.
- **Trois lignes de réglure, jamais deux** : modèle, pointillé à repasser, et
  **une ligne vide** où l'enfant écrit seul.
- **Pas de crochets phonétiques** : « [a] » est une notation de spécialiste.
- **Le son sur toute la vidéo**, pas de plage muette.
- ⭐ **La règle « muet + texte » de `manim/REGLES.md` ne s'applique PAS au
  cycle 2** : elle suppose que l'enfant sait lire, et c'est justement ce qu'on
  lui apprend.

---

## Les commandes

```
powershell -File scripts/generer-voix.ps1 -Fichier manim/voix/cp-lettre-<x>.json
python -m manim render -ql --disable_caching manim/scripts/cp/lettre_<x>.py Lettre<X>Cp -o eleveai-francais-cp-lettre-<x> --media_dir manim/scripts/cp/media
```

`-ql` pour vérifier, `-qh` pour le final. Le vertical ajoute `-r 1080,1920` et
vise la scène `Lettre<X>CpShort`.

⚠️ **Dépôt partagé, plusieurs sessions.** Committer **par chemin**, jamais un
`git commit` nu — il emporterait ce qu'une autre session a laissé dans l'index.
Pour un fichier partagé (`registre.ts`, `pdf-disponibles.ts`) :
`node scripts/stager-mon-hunk.mjs <fichier> "<mon-slug>"`.
