# Reprise — SAPHIR, partie 1, épisode 1 « Le cercle des loups »

État au 08/11/2026 au soir : scénario validé par Frédéric (« Grand Nord », puis « go »), épisode **rendu** (3 min 44, paysage, feutrine 3D comme le film de Noël). Rien de publié.

## Fichiers
- Scénario : `manim/film-saphir/episode-1-scenario.md`
- Répliques (2 phrases du vieil homme) : `manim/film-saphir/dialogues-episode1.json` → `node scripts/film-saphir-voix.mjs episode1`
- Scène : `prototypes/film-saphir/episode1.js` (tout dans un bloc `{}`, reprend `prototypes/film-noel/commun.js` sans le modifier)
- Rendu : `node scripts/film-saphir.mjs episode1 controle 12 30 ...` / `film` / `mix`
- Son calculé : `scripts/film-saphir-son.mjs`
- MP4 : `manim/sorties/saphir/eleveai-saphir-partie-1-episode-1-le-cercle-des-loups.mp4`

## Contrôle du 09/11 (fait)
- Corrigés dans `episode1.js` : gros plans sur la petite au centre du cercle (le vieil homme s'arrête un peu de côté, `P_STOP` décalé de `perp`), plongée finale (il descend du traîneau à l'arrivée, lâche la poignée), bascule vers l'étoile remplacée par un raccord sur son regard, fumée assombrie la nuit (les sprites ne sont pas éclairés), souffles des loups masqués (ils restaient en (0,0,0) : petites boules blanches sur la neige), plan de la cabane recadré, écharpe rouge plus basse.
- Son : le fond descend à 30 % sous les répliques (`repliques` dans `film-saphir-son.mjs`), voix × 1,5 au mélange.
- ⛔ 09/11, Frédéric : « je veux pas publier saphir » → ni miniature, ni publication.md, ni YouTube, ni R2, ni site. « On verra quand on le publiera. »

## À faire
1. Contrôler le MP4 final : extraire une image toutes les ~10 s, regarder chaque plan, corriger **tout** défaut, même mineur ; vérifier le niveau des voix par rapport au vent (ffmpeg `volumedetect`).
2. Le mettre dans l'aperçu `manim/sorties/apercu.html` (port 3900), **en pause**, jamais en lecture.
3. Lui faire regarder et écouter. Questions ouvertes : noms (vieil homme, Saphir nommée par lui ?), voix off, maths ou non dans la série, style.
4. (EN ATTENTE, il ne veut pas publier pour l'instant) Miniature (« Dessin animé » / « Film d'animation 3D », à lui demander), `publication.md` sans `Validé : oui`.

## Pièges
- `_planche.jpg` ne se refait pas si les images ne remplissent pas la grille (3 colonnes) : donner 3, 6, 9 ou 12 instants, ou regarder les images une à une.
- Plans serrés sur la petite fille : le vieil homme est entre elle et la caméra (axe `gdir`) ; décaler par `perp`.
- Les noms de commun.js et du modèle sont pris : la scène reste dans son bloc.
