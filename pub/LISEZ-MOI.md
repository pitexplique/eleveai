# pub/ — les visuels de promotion

- `instagram/crpe/` — la pub de la formation CRPE : post, story, légende (`legende.md`).
  Script : `scripts/pub-crpe-instagram.py`.
- `instagram/accueil/` — les visuels Instagram du site (post, carré, story).
- `youtube-miniatures/` — les miniatures des vidéos. ⚠️ C'est un RACCOURCI
  (jonction Windows) vers `manim/miniatures/`, où les scripts de publication
  les écrivent et les lisent. Ne pas déplacer les fichiers : regarder ici,
  ranger là-bas.
- `youtube-chaine/` — la bannière et l'avatar de la chaîne, même principe
  (raccourci vers `manim/chaine/`).

- `instagram/profil/` — les photos de profil (`scripts/pub-photo-profil.py`).
- `instagram/stories/AAAA-MM-JJ/` — la story du jour, Ti Margo + le défi de
  l'accueil (`python scripts/pub-story-du-jour.py`).

⛔ Comme pour manim (19/10/2026) : les IMAGES de `pub/` ne vont ni sur GitHub ni
sur Vercel. Elles restent sur ce poste et se refont avec leur script. Seul le
texte (ce fichier, les légendes) est suivi.
