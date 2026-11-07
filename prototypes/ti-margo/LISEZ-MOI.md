# Le socle des shorts dessin animé de Ti Margo

Un seul Ti Margo, une seule page, un seul outil de rendu. **Chaque film n'écrit que sa propre scène.** On ne copie plus jamais une page entière.

| Fichier | Rôle |
|---|---|
| `personnage.js` | Ti Margo, ses gestes, sa pose, le rendu. Une correction ici vaut pour tous les prochains films. |
| `short.js` | Le cadre du short : titre et ceinture, écrits mot à mot, question-pause, écran de fin, bouche, caméra, `poserStudio()`. |
| `page.html` | La page unique : `page.html?serie=<série>&video=<épisode>`. Sans paramètre : Ti Margo seul, avec ses boutons de gestes. |
| `films/<série>.js` | Les films de la série : `FILMS.<épisode> = function(outils){ … }`. |
| `films/<série>-<épisode>.js` | Facultatif : le film d'un épisode dans son propre fichier, chargé après `films/<série>.js` (plusieurs sessions peuvent ainsi écrire chacune leur film). |
| `films/<série>.json` | Où sont les voix et où écrire les vidéos. |
| `films/<série>-cues.js` | Les instants des mots, fabriqués par `ti-margo-cues.py`. |
| `films/_modele.js` | Le plus petit film complet, à recopier pour commencer. |

## Créer une série

1. Copier `films/_modele.js` vers `films/<série>.js`, et `films/_modele.json` vers `films/<série>.json`, puis remplir le JSON. `{ep}` et `{num}` sont remplacés par l'épisode et son numéro :

   ```json
   {
     "voix": "6e-triangle-{ep}-short",
     "sons": "public/sons/6e-triangle-{ep}-short",
     "sortie": "manim/sorties/6e/maths/triangles/{num}-{ep}",
     "nom": "eleveai-maths-6e-triangle-{ep}-short",
     "episodes": { "construire": "01" }
   }
   ```

2. Fabriquer les voix, puis les instants des mots :

   ```bash
   python scripts/ti-margo-cues.py <série> <épisode>
   ```

3. Contrôler quelques images, puis rendre le film (depuis n'importe quel dossier) :

   ```bash
   CONTROLE=<dossier> node scripts/ti-margo-short.mjs <série> <épisode> controle 1 12 30
   ```

   ```bash
   node scripts/ti-margo-short.mjs <série> <épisode> film
   ```

Le mode `mix` refait seulement le son. Le mode `miniature` appelle `window.tiMargoMiniature`, que le film doit définir ; la miniature porte la mention « Film d'animation 3D ».

## Ce qu'un film renvoie

`clips`, `FIN`, `titre`, `ceinture`, `finTitre`, `groupes`, `question`, `finClip`, `jouer(P,T,c,A)`, et au besoin `cuts`, `tics`. Le film reçoit `el`, `$`, `mots`, `jetons`, `legende`, `carte`, `panneau`, `fin`, `lisse`, et voit tout ce que définit `personnage.js` : `scene3d`, `scene`, `piece`, `toon`, `C`, etc.

## Les règles

- Les règles des vidéos sont dans `manim/REGLES.md`, section « Les nouveaux shorts sont en DESSIN ANIMÉ ».
- **Un décor, un geste ou un objet qui sert à deux séries remonte dans `short.js` ou `personnage.js`**, sans changer le rendu des films déjà faits. Sinon, il reste dans le fichier de la série.
- Deux sessions ne modifient pas `personnage.js` ou `short.js` en même temps : y faire de petits changements, puis contrôler.
- Tout est écrit à l'instant T : `image(T)` donne toujours la même image.

## Ce qui n'est pas passé par ce socle

- `ti-margo-3d.html` (le mur) et `ti-margo-vues.html` restent tels quels, pour pouvoir refaire ces films.
- `scripts/film-noel.mjs` lit le modèle dans `ti-margo-3d.html`, avec un rendu feutrine : **ne pas déplacer ce fichier**. Une correction de Ti Margo faite dans `personnage.js` n'arrive pas dans le film de Noël.
