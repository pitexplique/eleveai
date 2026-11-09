# Film de Noël de Ti Margo : reprise (09/11/2026)

Prompt pour la session qui reprend le rôle de coordination du film. Répondre toujours en français.

## Où on en est
- Le film de 15 scènes est écrit dans `manim/film-noel/script-essai.md`. À retenir : « On n'a pas besoin d'avoir beaucoup pour donner beaucoup. »
- Style : figurines en feutrine en 3D (three.js), 12 images/s, en paysage 1920 × 1080. Voix Windows (Julie, Paul, Hortense) dont la hauteur est réglée par personnage.
- Le mode d'emploi commun est dans `manim/film-noel/BIBLE.md` : personnages, voix, échelles, comment ajouter une partie. `prototypes/film-noel/commun.js` ne se modifie que par une session à la fois.
- Commandes : `node scripts/film-noel-voix.mjs <partie>`, puis `node scripts/film-noel.mjs <partie> controle 3 12 30` ou `... film`.
- Le film sort en **feuilleton**, épisode par épisode (mémoire `film-noel-feuilleton-par-blocs.md`). Épisode 1 (scènes 1 à 4) : https://youtu.be/seFCfgEgxXE.
- Un montage complet (15 min 44) a été assemblé le 07/11 par la session « film-noel-complet ». Frédéric doit encore l'écouter.
- ⭐ 09/11 : ses élèves de 6e ont **adoré** l'épisode 1. On garde le style et les voix.

## Règles
- Miniatures : la mention « Film d'animation 3D » (mémoire `miniature-film-animation-3d.md`).
- `Validé : oui` dans un `publication.md` seulement sur son ordre, épisode par épisode. L'envoi YouTube, c'est nous qui le faisons sur son ordre (`envoi-youtube-gere-par-claude.md`).
- Ne jamais lancer la lecture d'une vidéo ; l'aperçu `manim/sorties/apercu.html` sur le port 3900, en pause.
- On ne peut pas entendre les voix : ne jamais dire qu'elles sont bonnes, c'est lui qui écoute.
- Corriger chaque défaut, même mineur, puis refaire le rendu.

## Prochaines étapes, sur sa demande seulement
1. Lui demander ce que ses 6e ont aimé ou pas dans l'épisode 1 (un rire, une question, un silence) et en tenir compte pour la suite.
2. Fixer avec lui le rythme des épisodes suivants jusqu'à Noël.
3. Préparer l'épisode suivant (dossier `manim/sorties/ti-margo/film-noel-episode-N/`, miniature, `publication.md`) sans le valider.

Les sessions liées (film-noel-base, noel-atelier, defauts-atelier, atelier-controle-final, film-noel-complet) étaient toutes à l'arrêt le 09/11.
