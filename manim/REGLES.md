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
5. **Enregistrer la voix** (voir « Workflow voix » ci-dessous).
6. **Monter** dans Clipchamp (inclus dans Windows 11) : vidéo + audio, calage sur le « top », export 1080p.
7. **Publier sur YouTube** (chaîne eleveai) — voir conventions ci-dessous.
8. **Coller l'URL dans `/admin/ressources`** (clé = notionId) → vérifier que le badge « ▶ Vidéo » s'allume dans le coach sur cette notion.

---

## Standard qualité : MONTRER, pas raconter

C'est un enfant qui regarde. La règle des fiches (retour Frédéric du 13/07) s'applique encore plus fort en vidéo :

- **Les objets bougent, le texte se tait.** Les chiffres s'alignent, la retenue monte, la fraction se construit. Jamais un paragraphe à l'écran.
- **Texte à l'écran ≤ 6 mots par ligne** (hors calculs). Les explications complètes, c'est la VOIX qui les porte.
- **Un seul concept par écran.** Si un écran veut dire deux choses, c'est deux écrans.
- **Les `wait()` sont généreux** (1 à 2,5 s) : ils laissent la place à la voix et au regard de l'élève.
- **Durée cible : 1 à 2 minutes** (muet). Au-delà, découper en deux vidéos.

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

## Workflow voix (téléphone)

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

## Conventions YouTube

- **Titre** : `Maths <classe> · <Titre de la notion> — EleveAI` (ex. `Maths 6e · Le calcul posé — EleveAI`)
- **Description** : 1 phrase d'accroche + lien vers la fiche (`https://eleveai.fr/fiches-cours/maths/<classe>/<notion>`) + lien vers le coach (`https://eleveai.fr/coach-ia/maths?classe=<classe>`) + « Fait à La Réunion 🌋 »
- **Playlist** : une par classe (`Maths 6e`, `Maths 5e`, …)
- **Visibilité** : publique (la machine à contenu = le marketing)

## Checklist finale

- [ ] Tous les `microId` de la banque couverts (mapping en tête du script)
- [ ] Mêmes exemples que la fiche
- [ ] Margouillat sur chaque écran, couleurs de `charte.py`
- [ ] Rendu 1080p60 (`-qh`), voix calée, pas de coupure audio
- [ ] Titre/description/playlist YouTube conformes
- [ ] URL collée dans `/admin/ressources` + badge ▶ vérifié dans le coach
