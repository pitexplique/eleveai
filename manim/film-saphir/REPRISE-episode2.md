# Reprise — SAPHIR, partie 1, épisode 2 « Le milieu du cercle »

État au 09/11/2026 au soir. Frédéric a dicté le début, puis a demandé de « créer cet épisode », avec deux questions, des formules lisibles, de la poésie, et « faire rêver et réfléchir ». Un brouillon basse définition a été vu et validé (« Oui, rendu final »). Rien de publié : ⛔ « je veux pas publier saphir ».

## Fichiers
- Scénario : `manim/film-saphir/episode-2-scenario.md`
- Répliques (4 phrases du vieil homme, dont le poème final) : `manim/film-saphir/dialogues-episode2.json` → `node scripts/film-saphir-voix.mjs episode2`
- Scène : `prototypes/film-saphir/episode2.js`. Elle est tout entière à l'intérieur de la cabane (repère : x de -6 à 6, z de -5 à 5, fenêtre au mur x = 6), et on voit le dehors par la fenêtre.
- Rendu : `node scripts/film-saphir.mjs episode2 controle 12 30 ...` / `brouillon` (960 × 540, ~4 min) / `film` / `mix`
- Son : `scripts/film-saphir-son.mjs` a reçu de nouvelles options (`chiens: false`, `echos: false`, `feu`, `crayon`, `pas`, `toc`, `respire`). L'épisode 1 n'est pas touché par défaut.
- MP4 : `manim/sorties/saphir/eleveai-saphir-partie-1-episode-2-le-milieu-du-cercle.mp4` (le brouillon porte `-brouillon` en plus).

## Ce qu'il y a dedans
Le réveil près du feu ; sa phrase à lui, en italique : « Une enfant se réveille, et voit un homme penché sur son cahier de physique, pour comprendre le monde. »
Q1 « Les maths, ça sert à quoi ? » (réponse C). Les quatre feuilles du mur, lisibles : ombres et tan a ≈ 20°, étoile polaire et latitude, chute d ≈ ½ g t², P = 2πr.
Q2 « Et la physique ? » (réponse A).
Le cahier : 360° ÷ 8 = 45°, puis le cercle au compas, les huit rayons et « r » ; les points s'allument (le rêve). La fenêtre : les loups immobiles.
La fin : le bol, le cristal à six branches, le poème « Le monde est un grand livre. Et les maths, c'est l'alphabet pour le lire. », puis l'énigme « pourquoi un cristal de neige a-t-il six branches ? », qui ouvre l'épisode 3.

## Pièges
- Les gros plans du cahier se filment à la verticale (`haut: Vx(0,0,1)` dans le plan), de haut (1,7 à 1,9) et serrés (focale 17). Plus près, les mains cachent le dessin.
- Les plans « dehors » partent de x = 6,35 : la caméra doit passer de l'autre côté de la vitre, sinon elle se retrouve dans la tête de la petite, agenouillée au coffre.
- La tête de la petite couchée tourne avec `tY` (l'axe du corps), pas avec `tZ`.
- La session des shorts (`scripts/film-saphir-short.mjs`) attend le MP4 final pour faire le short de l'épisode 2.
