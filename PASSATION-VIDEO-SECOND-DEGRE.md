# Passation — refaire la vidéo paysage 1/2 du second degré (16/09/2026)

> Écrit à 90 % de contexte, session du 15-16/09. À coller tel quel dans une
> nouvelle session. Lire d'abord la mémoire `videos-second-degre-premiere.md`.

## Pourquoi on refait

La vidéo 1/2 « Le second degré : Δ décide » est EN LIGNE depuis le 15/09 au
soir, mais Frédéric : « tu parles de solutions, mais solutions de quoi ? tu as
oublié de dire résoudre f(x) = 0, et les solutions sont appelées racines.
Refaire vidéo. »

## Ce qui est DÉJÀ fait (ne pas refaire)

- `manim/voix/premiere-second-degre-equation.json` — RÉÉCRIT avec le vocabulaire
  juste : « f(x) = 0 », « les racines », « une racine double », « aucune racine ».
  ⚠️ Les WAV dans `public/sons/premiere-second-degre-equation/` sont ENCORE LES
  ANCIENS : il faut régénérer.
- `manim/scripts/premiere/second_degre.py`, classe `SecondDegreEquation` —
  écrans corrigés : boîte « f(x) = a x² + b x + c (a ≠ 0) », ligne « résoudre
  f(x) = 0 : les solutions s'appellent les racines » (écran 1, positions
  redescendues d'un cran), « deux racines / une racine double / aucune racine »
  (écran 2), titre « la formule des racines », vérification « f(−1) = … »,
  défi « trouve les racines, s'il y en a », correction « racines : −2 et 5 »,
  objectifs et finale en « racines ».
- La vidéo 2/2 (`SecondDegreSigne`) dit déjà « racines » partout : rien à refaire,
  elle est livrée dans `manim/sorties/premiere/maths/paysage/fr/second-degre-signe/`
  pour jeudi 17/09.

## Ce qui RESTE à faire, dans l'ordre

1. Voix (PowerShell, depuis la racine du dépôt) :
   `powershell -File scripts/generer-voix.ps1 -Fichier manim/voix/premiere-second-degre-equation.json -Debit -4`
2. Brouillon 480p :
   `python -m manim render -ql --disable_caching manim/scripts/premiere/second_degre.py SecondDegreEquation -o eleveai-maths-premiere-second-degre-equation --media_dir manim/scripts/premiere/media`
3. Planche de contrôle (dernière image de chaque écran) :
   `python scripts/planche-video.py manim/scripts/premiere/media/videos/second_degre/480p15/eleveai-maths-premiere-second-degre-equation.mp4 <scratchpad>/planche.png 3`
   puis regarder l'image (Read). ⚠️ Vérifier surtout l'écran 1 : la nouvelle
   ligne « racines » à y = 1,3 et le trinôme descendu à y = 0,3 — rien ne doit se
   chevaucher (la colonne Δ à droite descend aussi : 0,3 / −0,75 / −1,55).
4. Rendu final :
   `python -m manim render -qh --disable_caching … SecondDegreEquation …` (même ligne)
   → `manim/scripts/premiere/media/videos/second_degre/1080p60/…-equation.mp4`
5. Copier le mp4 dans `manim/sorties/premiere/maths/paysage/fr/second-degre-equation/`
   (écraser l'ancien). La vignette y est déjà ; si on la retouche, dans
   `manim/miniature.py` l'entrée `eleveai-maths-premiere-second-degre-equation`
   (« sous » → « combien de racines ? un seul nombre le sait ») puis
   `python manim/miniature.py eleveai-maths-premiere-second-degre-equation`.
6. `manim/sorties/premiere/maths/paysage/fr/METADONNEES-YOUTUBE-SECOND-DEGRE.md` :
   remplacer « solutions » par « racines » dans la description 1/2
   (« deux racines, une seule, ou aucune », « lire … le nombre de racines »,
   « calculer les racines »). ⛔ Jamais de « < » ni « > » : YouTube les refuse.
7. Dire à Frédéric : YouTube ne remplace pas un fichier vidéo — il faut
   SUPPRIMER l'ancienne 1/2 et RE-TÉLÉVERSER (titre, description, tags,
   vignette, playlist « Maths Première spécialité »), puis mettre à jour le
   lien de la vidéo longue dans la description du short dauphin/baleine et
   son champ « Vidéo similaire ». Lui donner titre/description/tags en
   blocs à copier, sans chemins.
8. Quand il donne les liens YouTube : brancher le bouton « Vidéo » du coach
   (table `notion_ressources`, notion `second_degre`, classe premiere-spe),
   et le sitemap vidéo (`VIDEOS_FICHES` dans `app/sitemap.ts`).

## Règles qui ne bougent pas

- ⛔ Ne JAMAIS committer ni pousser quoi que ce soit sous `manim/` ni `public/sons/`.
- Pas de LaTeX sur ce poste : `Text` + `puissance()`, `label_constructor=Text`.
- Pas de binaire ffmpeg : tout passe par PyAV (`scripts/planche-video.py`).
- Outils jetables en Python, pas en PowerShell (accents → ANSI → plus de parse).
- Serveur de dev : « eleveai-2 », port 3100 (3000 = l'autre poste).
- Commits par chemin (`git commit -F msg -- fichiers`), vérifier `git diff --cached` avant.
