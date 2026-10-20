# Règles de création des vidéos Manim EleveAI

Une notion = une banque (source de vérité) = une fiche = **une vidéo**.
Cette procédure est la jumelle de la procédure fiches : même point de départ (la banque), même nommage (le notionId), même standard qualité (montrer, pas raconter).

## ⛔ La phrase de fin (Frédéric, 19/10/2026, depuis la nouvelle page d'accueil)

Toute NOUVELLE voix finit par la clé `…-abonne` exactement ainsi :

> « Entraîne-toi sur éleveai point f r. Et abonne-toi ! »

L'écran de fin écrit ce que dit la voix : « Entraîne-toi sur » + « eleveai.fr » (encadré), puis « Abonne-toi ! » + « @eleveai974 ». Plus de « va sur le coach » : l'accueil mène à tout (exercices, vidéos, coach). Les vidéos rendues avant le 19/10 gardent leur ancienne fin (pas de re-rendu pour ça).

---

## La procédure (dans l'ordre, à suivre à la lettre)

1. **Lire la banque du coach** : `lib/tutor-v4/questionBank/<classe>/maths/<notion>.bank.ts` → relever le `notionId` et TOUS les `microId`. Chaque micro-compétence doit être couverte par un écran de la vidéo (commentaire de mapping micro→écran en tête du script).
2. **Reprendre les exemples DE LA FICHE** (`lib/fiches/maths-<classe>-<notion>.tsx`) : mêmes nombres, mêmes méthodes, mêmes vérifications. L'élève qui lit la fiche puis regarde la vidéo doit reconnaître le même cours.
3. **Écrire le script** : `manim/scripts/<classe>/<notionId>.py` (underscores conservés), classe scène en PascalCase + classe (ex. `EntierCalculPose6e`). En tête du fichier :
   ```python
   import sys
   from pathlib import Path
   sys.path.insert(0, str(Path(__file__).resolve().parents[2]))  # dossier manim/
   from charte import *
   from mascotte import MascotteMargouillat
   ```
4. **Rendre en brouillon** pour vérifier : `-ql` (480p). Puis **rendu final** : `-qh` (1080p60).
   Le `-o` impose le **nom de fichier de sortie** (convention `eleveai-<matiere>-<classe>-<notionId en tirets>`, sans accent ni espace — voir « Conventions » plus bas) :
   ```
   python -m manim render -qh manim/scripts/<classe>/<notionId>.py <ClasseScene> \
     -o eleveai-<matiere>-<classe>-<notionId-en-tirets> \
     --media_dir manim/scripts/<classe>/media
   ```
   Ex. 6e calcul posé → `-o eleveai-maths-6e-entier-calcul-pose` → `eleveai-maths-6e-entier-calcul-pose.mp4`.
5. **Générer la miniature** : `python manim/miniature.py <nom>` (registre, voir plus bas).
6. **Publier sur YouTube** (chaîne eleveai) — le mp4 est **muet + texte**, publiable tel quel (voir « Muet + texte » ci-dessous). Voir conventions YouTube.
7. **Coller l'URL dans `/admin/ressources`** (clé = notionId) → badge « ▶ Vidéo » dans le coach. Ajouter l'entrée `VIDEOS_FICHES` du sitemap (`app/sitemap.ts`).
8. **Voix (OPTIONNELLE, plus tard)** : uniquement sur les notions phares, ou par les élèves. Voir « Workflow voix ». On n'attend PAS la voix pour publier.

---

## Standard qualité : MONTRER, pas raconter — et « PLUS C'EST VISUEL, MIEUX C'EST »

C'est un enfant qui regarde. Principe directeur de Frédéric (13/07) : **par défaut, ON DESSINE**, même là où une phrase suffirait.

- **Les objets bougent, ils portent le sens.** Les chiffres s'alignent, la retenue monte, la grille se colorie, les barres se comparent. Jamais un paragraphe figé.
- **Varier les animations** (retour Frédéric 13/07) — pas seulement `Write` (caractère par caractère). Utiliser la palette Manim : `FadeIn`/`GrowFromCenter`/`scale` (apparition), `.animate.scale()` (zoom sur l'élément clé), `Indicate`/`Flash`/`Circumscribe` (attirer l'œil), `Transform`/`TransformMatchingShapes` (une forme devient une autre), `.animate.shift()` (glisser), `Create` (tracer). Un zoom ou un surlignage sur le chiffre/la part qui compte vaut mille mots. Garder ça au service de la compréhension, jamais gratuit.
- **Un visuel par écran, et un visuel pour CHAQUE micro-compétence** quand elle se dessine (ne pas regrouper 2 micros dans un seul dessin). **Le défi a SON dessin**, pas seulement du texte.
- **Un seul concept par écran.** Deux idées = deux écrans.
- **Les `wait()` sont généreux** (1 à 2,5 s) : le temps de lire et de regarder.
- **Durée cible : 1 à 2 minutes.** Au-delà, découper en deux vidéos.

### Muet + texte (le mode par défaut) — ⚠️ RÈGLE INSISTÉE PAR FRÉDÉRIC
Les vidéos sont **muettes** (choix du 13/07 pour produire en volume sans goulot voix). **Comme il n'y a AUCUN son, le texte à l'écran doit tout expliquer, en détail et simplement. On n'est PAS pressé** — mieux vaut une vidéo un peu plus longue mais limpide qu'une vidéo rapide et sèche.
- **Le texte porte TOUTE l'explication.** À chaque étape : ce qu'on fait ET pourquoi, en mots simples d'enfant (ex. non pas « 4 + 7 = 11 » seul, mais « 4 + 7 = 11, j'écris 1 et je retiens 1 »).
- **Détaillé mais simple** : phrases courtes, une idée par ligne, vocabulaire d'un élève de la classe visée. Chaque écran doit se comprendre **seul, sans le son**.
- **Prendre son temps** : `wait()` généreux (2 à 3 s, plus sur les écrans denses) pour laisser lire. La durée n'est pas un problème ; la clarté prime. Si la notion est riche, faire 2 vidéos plutôt qu'une trop dense.
- La voix reste possible **par-dessus, plus tard** (notions phares ou voix d'élèves) sans rien refaire.

## Charte visuelle (constante, jamais renégociée par vidéo)

- **Couleurs** : importées de `manim/charte.py`, jamais redéfinies. Jaune = titres, bleu = calcul en cours, orange = retenues/pauses, vert = résultats justes et vérifications, rouge = erreurs/« impossible ».
- **Mascotte** : `MascotteMargouillat` de `manim/mascotte.py`, présente sur chaque écran (coin bas-droit, scale ≈ 0.5 ; plus grande sur l'écran d'accueil). ⚠️ **JAMAIS le π** (signature 3Blue1Brown/Manim). Le dessin est provisoire : quand le concours logo élèves donnera le margouillat officiel, on ne change QUE `mascotte.py`.
- **Structure des écrans** (signature EleveAI) :
  1. Page de garde : le NOM de la notion + sa QUESTION (+ la ceinture), puis tout de suite la situation CONCRÈTE (⛔ 12/10/2026 : ni formule ni « ce que tu sauras faire » au début ; le bilan va à la fin, et depuis le 13/10/2026 il s'intitule « Ce que tu as appris » — plus jamais « ce que tu sais / sauras faire »)
  2. 2 à 4 écrans de démonstration ANIMÉE (le cœur)
  3. Défi + pause orange (« Mets pause et cherche ! »)
  4. Correction
  5. À retenir (3 lignes max) + signature `SIGNATURE`
- **Fond noir** (défaut Manim), textes blancs, français partout.

## ⛔ Les CEINTURES de difficulté — RÈGLE DU 11/10/2026

Frédéric, 11/10/2026 : « à partir de maintenant il faudrait que apparaisse une étoile de difficulté ou de ceinture », et « tous les animaux ne montent pas de la même façon en haut de l'arbre ». Une même notion se décline du plus visuel au plus exigeant, et chaque élève y monte par son chemin.

- **L'échelle est celle du judo**, dans cet ordre : blanche, jaune, orange, verte, bleue, marron, noire.
- **Chaque vidéo affiche sa ceinture, sans exception.** En paysage, la page de garde montre l'échelle entière, avec la ceinture du jour grandie, en couleur, et nommée (« Ceinture verte ») ; les autres restent pâles. Dans un short aussi, c'est l'ÉCHELLE ENTIÈRE, sous le titre (⛔ 13/10/2026, Frédéric : « affiche l'ordre des ceintures pour que l'élève sache où se situe la sienne ») : `echelle_ceintures("blanche").scale_to_fit_width(config.frame_width * 0.7)`. Les miniatures (paysage et short) la dessinent aussi : `echelle()` de `miniature_short_expression.py`.
- **Les ceintures sont DESSINÉES** (bande, nœud, deux pans), jamais un emoji. Le code se trouve dans `scripts/seconde/signes_expression_2de.py` : `CEINTURES`, `ceinture()`, `echelle_ceintures()`. À importer de là, pas à recopier.
- **Repères** : la blanche, c'est le short visuel ci-dessous ; la verte, c'est la paysage complète du niveau de la classe (méthode, pièges, défi corrigé). Les autres ceintures se fixent avec Frédéric au fil des vidéos : on ne les invente pas seul.

### ⛔ Le short CEINTURE BLANCHE : la règle

Premier modèle : `scripts/seconde/signes_short_dauphin.py`, le dauphin et le tableau de signes (11/10/2026). Frédéric : « un short simple : un dauphin qui saute en haut et le tableau de signes qui se remplit en bas ; le dauphin devient bleu dans l'air et d'une autre couleur dans l'eau ».

1. **Format 9:16, environ 45 s, une seule idée.** Aucun calcul : on VOIT la notion.
2. **En HAUT, l'image concrète qui bouge** (un animal, un objet, un lieu de La Réunion) ; **en BAS, l'objet mathématique qui se remplit EN MÊME TEMPS** (tableau, droite graduée, schéma).
3. **Le geste de l'image et la case qui se remplit sont SYNCHRONES.** L'œil doit pouvoir descendre tout droit de l'un à l'autre : par exemple, le dauphin passe exactement au-dessus de sa colonne, et un curseur relie les deux.
4. **Un code couleur partagé** entre l'image et les maths : le dauphin est bleu dans l'air, comme le « + » ; il est orange dans l'eau, comme le « − ». La paysage de la même notion garde ce même code.
5. **Une voix courte, validée à deux** (voir `script-video-se-valide-a-deux`), et chaque mot dit est écrit à l'écran.
6. **Le short finit par une question chiffrée à laquelle on répond en commentaire** (« Combien de secondes le dauphin est-il dans l'air ? »). Pas d'annonce d'objectifs.
7. **Il accompagne une paysage de la même notion**, qu'on publie AVANT lui.

## Workflow voix (téléphone) — OPTIONNEL, seulement notions phares / voix d'élèves

⚠️ Par défaut on publie **muet + texte** (voir plus haut). Ce workflow ne sert que si on veut ajouter une voix a posteriori.

1. Rendre la vidéo **muette** et la regarder une fois en entier.
2. Enregistrer au **téléphone** (app Dictaphone) en la regardant : mode avion, pièce calme, téléphone à ~20 cm. Dire **« top »** pile quand le titre d'accueil apparaît → point de synchro.
3. Transférer (câble ou Drive) → **Clipchamp** : glisser vidéo + audio, caler sur le « top », couper le « top », exporter.
4. Si la voix déborde sur un écran : **on ne recoupe pas l'audio** — on allonge le `wait()` dans le script et on re-rend. La vidéo s'adapte à la voix, jamais l'inverse.

## Convention de nommage du fichier vidéo

```
eleveai-<matiere>-<classe>-<notionId en tirets>.mp4
```
- **Toujours** ce format, même si le fichier vit déjà dans un dossier `6e/` : le nom doit rester auto-explicatif hors du repo (Téléchargements, Clipchamp, téléphone, YouTube).
- **Aucun accent, aucun espace, aucune majuscule** (`posé`→`pose`) : ça casse sur YouTube/URL/Windows.
- **Coller au notionId** (le nom de la banque), pas à une version raccourcie : c'est la colonne vertébrale banque → fiche → vidéo → coach. Ex. notion `entier_calcul_pose` → `eleveai-maths-6e-entier-calcul-pose.mp4`.
- Obtenu directement au rendu via `-o` (voir étape 4).

## Miniature YouTube (style « cahier », REGISTRE)

`manim/miniature.py` = un **registre** : chaque notion est une entrée `NOTIONS[<nom>]` (badge, titre, taille du titre, sous-titre, fonction `accroche`). Style figé « cahier » : fond papier à carreaux clair, badge bleu nuit `MATHS · <classe>`, titre bleu nuit (Arial Black), sous-titre, **accroche visuelle propre à la notion**, Ti-Margo à droite, **signature humaine** bas-gauche (photo ronde de Frédéric `public/images/avatar-frederic-Lacoste.jpg` + « Frédéric, ton prof » + `eleveai.fr`).
- `python manim/miniature.py` → génère **toutes** les miniatures du registre.
- `python manim/miniature.py <préfixe>` → seulement celles dont le nom contient `<préfixe>`.
- **Ajouter une notion** = ajouter une fonction `acc_xxx(d)` + une entrée dans `NOTIONS`.
⚠️ Miniature perso = **compte YouTube vérifié** (numéro de téléphone). Elle se change à tout moment, même après publication (Studio → Contenu → la vidéo → Miniature → Enregistrer).

## Production EN LOT (l'échelle — décidé le 13/07)

Une seule personne (Frédéric) doit couvrir toutes les classes. On sépare **la machine** (auto) de **l'humain** (upload). L'IA génère et rend des **classes entières** ; Frédéric ne garde que l'upload YouTube + un SQL.

1. **Générer une classe** (IA, en une passe) : lire toutes les banques `lib/tutor-v4/questionBank/<classe>/maths/*.bank.ts` → écrire toutes les fiches `lib/fiches/maths-<classe>-<notion>.tsx` + tous les scripts `manim/scripts/<classe>/<notionId>.py` + les entrées miniature (`NOTIONS`).
2. **Rendre en lot** (la nuit) : `python manim/render_all.py <classe>` rend TOUTES les vidéos de la classe en 1080p60 au bon nom. `--draft` pour vérifier vite, `<filtre>` pour une sous-partie.
3. **Miniatures en lot** : `python manim/miniature.py`.
4. **Upload** (Frédéric, depuis le téléphone possible) : publier les mp4 muets sur YouTube (playlist par classe).
5. **Brancher** : une entrée `VIDEOS_FICHES` par vidéo dans `app/sitemap.ts`, + une ligne `notion_ressources` par vidéo (`/admin/ressources` ou un INSERT SQL groupé).

**Prioriser par la data** : ne pas pré-produire 180 vidéos. Faire les notions les plus cherchées/utilisées, laisser le SEO + les stats du coach guider l'ordre.

## Conventions YouTube

- **Titre** : `Maths <classe> · <Titre de la notion> — EleveAI` (ex. `Maths 6e · Le calcul posé — EleveAI`)
- **Description** : 1 phrase d'accroche + lien vers la fiche (`https://www.eleveai.fr/fiches-cours/maths/<classe>/<notion>`) + lien vers le coach (`https://www.eleveai.fr/coach-ia/maths?classe=<classe>`) + « Fait à La Réunion 🌋 »
- **Playlist** : une par classe (`Maths 6e`, `Maths 5e`, …)
- **Visibilité** : publique (la machine à contenu = le marketing)

## Checklist finale

- [ ] Tous les `microId` de la banque couverts (mapping en tête du script)
- [ ] Mêmes exemples que la fiche
- [ ] **Un visuel par écran + le défi dessiné** (« plus c'est visuel, mieux c'est »)
- [ ] **Muet + texte** : le texte à l'écran porte l'explication (étapes + pourquoi)
- [ ] Margouillat sur chaque écran, couleurs de `charte.py`
- [ ] **La ceinture est affichée** (échelle sur la page de garde, badge dans un short)
- [ ] Rendu 1080p60 (`-qh` via `render_all.py`) + miniature générée
- [ ] Titre/description YouTube conformes (sans chevrons `< >`), playlist par classe
- [ ] URL dans `/admin/ressources` (badge ▶) + entrée `VIDEOS_FICHES` du sitemap

---

# Série « Les maths en vrai » (format terrain 974, HORS banques)

Deuxième format, distinct des vidéos de notions ci-dessus : des **simulations animées** d'un phénomène de La Réunion, avec les maths cachées derrière (l'eau → foehn + proportionnalité ; le lait → % + proportionnalité). **Pas de notionId, pas de banque, pas de fiche.** C'est la série marketing/culture, branchée sur l'accueil (`components/accueil/MathsEtReunion.tsx`), playlist YouTube **« Les maths en vrai »**.
⚠️ Ne PAS confondre avec « Maths Réel · 974 » (`/maths-974`) qui est le carnet de TERRAIN réel (vraies vidéos tournées sur place) — deux marques séparées.

## Le processus (idée → YouTube)

1. **L'idée** : un phénomène 974 + les maths derrière.
2. **Le script** : `manim/scripts/974/<sujet>.py`, DEUX scènes dans le même fichier — `Xxx974` (16:9 YouTube ~1 min 30) + `Xxx974Short` (9:16 Shorts/Insta). Le Short impose son cadre dans `__init__` : `config.frame_height = 8.0 ; config.frame_width = 4.5` AVANT `super().__init__()` (sinon `-r` ne change que les pixels, pas le cadre logique → texte qui déborde).
3. **Brouillon** `-ql` (480p) → **vérif visuelle** en extrayant des images (ffmpeg) à chaque écran → corriger chevauchements/débordements.
4. **Rendu final** `-qh` (1080p60), nom `eleveai-maths-974-<sujet>`.
5. **Miniature** : entrée dans le registre `manim/miniature.py` (badge « LA RÉUNION · EN VRAI »).
6. **Upload** (Frédéric) : playlist « Les maths en vrai ».
7. **Accueil** : coller l'URL dans `EPISODES` de `MathsEtReunion.tsx` (`url: null` = carte « bientôt »).

## Standard d'effets (validé par Frédéric le 15/07/2026)

Trois règles nées de ses retours — **la barre de qualité de la série** :

1. **Animations VARIÉES** — jamais tout en `Write` (lettre par lettre, ça lasse). Une palette qui **tourne** à chaque texte : glisse (gauche/droite), grossit (`GrowFromCenter`), pop (fade+scale), fondu (haut/bas). + emphase sur l'élément clé : `Indicate` / `Flash` / `Circumscribe` / `.animate.scale()` / `Transform`.
2. **Légendes DISTRIBUÉES** — jamais 3 phrases qui se réécrivent sur la même « 2ᵉ ligne » sous le titre. Chaque légende **change de place** (coins, bas…) ET d'animation, posée **près de l'action** qu'elle décrit. Exception : sous le titre (centré) si sa place auto tombe sur un dessin.
3. **VRAIS défis** — pas de calcul évident (×3, une division). Un problème **à 2 étapes** ancré 974 (lait : 250 L/jour + fromage 500 g → 50 fromages ; eau : toit 100 m² × 2 000 mm → 200 000 L → 40 citernes).

## Les helpers (dans la classe de base de chaque script)

Réutiliser tels quels d'un épisode à l'autre (présents dans `lait_reunion.py` et `circulation_eau.py`) :
- **`anim_entree(m, mode=None)`** → une animation d'apparition qui **change à chaque appel** (palette tournante). `mode="grow"` pour forcer.
- **`legende_mobile()`** → renvoie `dire(texte, size, couleur, mode=None, pos=None)` : une légende à la fois, **place qui tourne + anim qui varie**. `pos=(x,y)` force la position, `mode=` force l'anim.
- **`titre_ecran(texte)`** : les titres alternent aussi leur entrée (Write / glisse / grossit).

⚠️ **Pas d'emoji dans les `Text` Manim** (ex. ⏸) : la police ne les rend pas → petits carrés. Texte simple uniquement.

## Checklist « en vrai »

- [ ] 16:9 ET 9:16 rendus (Short = cadre imposé dans `__init__`)
- [ ] Animations variées (helpers `anim_entree` / `legende_mobile`), aucune légende qui chevauche titre/dessin
- [ ] Défi à 2 étapes, ancré 974, réponse dans la correction
- [ ] Miniature registre + margouillat sur chaque écran + couleurs `charte.py`
- [ ] URL collée dans `MathsEtReunion.tsx` (PAS dans `maths_974` — marque séparée)

## Code Python à l'écran (20/10)
- Police `font="Consolas"` (testée : bien plus lisible que Courier New, 0 barré).
- ⚠️ `Text` supprime les espaces de début de ligne : l'indentation disparaît. Une ligne = un Text, aligné à gauche, puis décalé de (nombre d'espaces) × la largeur d'un caractère Consolas.

## ⭐⭐ Les mathématiques sont TRANSVERSALES (Frédéric, 20/10/2026 — « je le répète »)
- Chaque vidéo montre que ces maths servent AILLEURS : musique, cinéma, culture, géographie, histoire, sport, santé, écologie, économie, numérique, sciences, agriculture, transports, La Réunion.
- Un MÉTIER porte la situation (évoquer des vocations), filles et garçons : ingénieure du son, monteur, géographe, historienne, vétérinaire, technicien, data analyst…
- Un domaine, un métier et une problématique DIFFÉRENTS d'un épisode à l'autre dans un même lot (décider, prévoir, contrôler, choisir, juger une affirmation, évaluer un risque).
- **DONNER ENVIE** (le but, 20/10/2026) : beaucoup de jeunes doutent de leur avenir. Chaque vidéo ouvre une porte : un métier réel et accessible, des gens qui leur ressemblent, d'ici, et des maths qui servent à quelque chose qui compte. Ton concret, respectueux et plein d'élan, jamais moralisateur.
