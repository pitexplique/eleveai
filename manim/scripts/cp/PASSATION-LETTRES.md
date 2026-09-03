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

**État au 03/09/2026 (soir).** `a` **et** `i` sont faits, rendus en 1080p60,
vignettes comprises, et commités. Le `a` est **en ligne sur YouTube**.
👉 **La suite est `o`, puis `u`.** ⛔ **PAS `e`** — voir « Le piège du `e` ».

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
