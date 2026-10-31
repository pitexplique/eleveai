Prompt — série PROPORTIONNALITÉ, reprise au lot 3 (6e pourcentages) — 31/10/2026

Réponds toujours en français. Ne pose pas de questions : tranche, avance, liste tes choix à la fin.

**Règles** (MEMORY.md) : committer PAR CHEMIN (jamais `git add -A`, jamais `media-*`, `*.cues.tsv` ; ⚠️ `git commit -- <chemins>` pour ne pas embarquer ce qu'une autre session a mis en attente, ex. `lib/videoSearch.ts`) ; push SEULEMENT sur son signal, le soir (vérifier `git log origin/main..HEAD --stat`) ; ne jamais lancer la lecture d'une vidéo ; 3 agents à la fois au plus, toujours NEUFS ; changer de session à 60 % ; La Réunion ≈ 4 % des contextes.

## Où on en est
- Lots pilote, 1 (6e proportionnalité) et 2 (échelles 6e/4e) FINIS : rendus, passe finale (manifeste, R2, coach). Lot 2 : `1020970a`. Questions + centres : `manim/questions-proportionnalite.md`. Consigne : `manim/consigne-videos-proportionnalite.md`.
- **Lot 3 : voix VALIDÉES par Frédéric** (`085081fe`) : `manim/voix/6e-prop-pourcentage-{comprendre,lire,calcul,defi}[-short].json`. Brief des agents : `manim/brief-agent-proportionnalite-lot3.md` (`79bd2250`).
- **Rendus lancés le 31/10 vers 16 h** (agents de l'ancienne session ; leurs rapports seront PERDUS si elle s'est fermée) : 11 `pourcentage-comprendre` (Clara vétérinaire ; short batterie), 12 `pourcentage-lire` (Emma chocolatière ; short étiquette tee-shirt), 13 `pourcentage-calcul` (Karim vendeur de vélos ; short 10 % en 1 s). Scripts `manim/scripts/6e/prop_pourcentage_<slug>[_short].py`, sorties `manim/sorties/6e/maths/proportionnalite/<NN>-pourcentage-<slug>/`.
- **14 `pourcentage-defi` : PAS lancé.** Mission : script `prop_pourcentage_defi.py` (`PropPourcentageDefi6e`) + `_short`, dossier `14-pourcentage-defi`, micro `pourcentage_defi`, media_dir `manim/media-prop-14` ; Thomas, organisateur d'un festival de musique (200 billets, 30 % → 60 ; 50 % → 100 ; comparer 18 sur 20 = 90 % et 85 % ; piège 18 places ≠ 18 % ; 12 sur 50 = 24 % ; défi 25 % de 200 = 50) ; short « le meilleur buteur » (10 sur 20 = 50 % > 40 sur 100) ; centres paysage `musique`, `jeux-defis`, short `football`, `jeux-defis`.

## Vérifier chaque épisode (toi-même)
Les 2 mp4 présents et immobiles → `python scripts/verifier-bords-video.py <mp4>` = « 0 instants » ; planche de 12 images (PyAV, outil à recréer dans ton scratchpad) regardée ; `t` des questions-pauses (début de l'écran « Question ! ») par les `*_marques.json` ou la planche ; noter `questions` + centres + durées + question en commentaire dans `manim/questions-proportionnalite.md` (modèle des sections 07-10) ; commit par chemin (scripts + `*_marques.json` + questions). S'il manque des fichiers et que rien ne bouge depuis longtemps : agent neuf (« lis et applique le brief » + mission).

## Suite
1. ✅ 31/10 : LOT 3 FINI. Rendus 11-13 (autre session), 14 `cdfb0559` ; passe finale FAITE et COMMITÉE (8 vidéos 6e : manifeste, R2, bilans, coach ; microId `pourcentage_comprendre`, `pourcentage_lire`, `pourcentage_calcul_simple`, `pourcentage_defi` ; miniatures et `fiche-youtube.md` hors git dans les dossiers de sortie, accroches/chapitres à relire par Frédéric).
3. Puis lot 4 (4e agrandissements + grandeurs composées), voix à écrire puis à faire valider (coller la voix en entier, s'arrêter là).
4. Publier sur YouTube les paysages AVANT leurs shorts (lots 2 et 3 ; les 4e des épisodes communs portent `meme_video_que`).
