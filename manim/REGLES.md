# Règles de création des vidéos Manim EleveAI

Une notion = une banque (source de vérité) = une fiche = **une vidéo**.
Cette procédure est la jumelle de la procédure fiches : même point de départ (la banque), même nommage (le notionId), même standard qualité (montrer, pas raconter).

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
  1. Accueil : titre + « Maths <classe> » + question d'accroche
  2. 2 à 4 écrans de démonstration ANIMÉE (le cœur)
  3. Défi + pause orange (« Mets pause et cherche ! »)
  4. Correction
  5. À retenir (3 lignes max) + signature `SIGNATURE`
- **Fond noir** (défaut Manim), textes blancs, français partout.

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
- **Description** : 1 phrase d'accroche + lien vers la fiche (`https://eleveai.fr/fiches-cours/maths/<classe>/<notion>`) + lien vers le coach (`https://eleveai.fr/coach-ia/maths?classe=<classe>`) + « Fait à La Réunion 🌋 »
- **Playlist** : une par classe (`Maths 6e`, `Maths 5e`, …)
- **Visibilité** : publique (la machine à contenu = le marketing)

## Checklist finale

- [ ] Tous les `microId` de la banque couverts (mapping en tête du script)
- [ ] Mêmes exemples que la fiche
- [ ] **Un visuel par écran + le défi dessiné** (« plus c'est visuel, mieux c'est »)
- [ ] **Muet + texte** : le texte à l'écran porte l'explication (étapes + pourquoi)
- [ ] Margouillat sur chaque écran, couleurs de `charte.py`
- [ ] Rendu 1080p60 (`-qh` via `render_all.py`) + miniature générée
- [ ] Titre/description YouTube conformes (sans chevrons `< >`), playlist par classe
- [ ] URL dans `/admin/ressources` (badge ▶) + entrée `VIDEOS_FICHES` du sitemap
