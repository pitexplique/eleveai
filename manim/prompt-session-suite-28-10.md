Prompt — suite au 28/10/2026 (mercredi) : le site cette semaine, les vidéos samedi

Réponds toujours en français. Ne pose pas de questions : tranche, avance, liste tes choix à la fin.

**Règles** (MEMORY.md) : committer PAR CHEMIN (jamais `git add -A`, jamais `media-*`, `mb*`, `*.cues.tsv`) ; story Instagram jamais poussée (`git log origin/main..HEAD --stat` avant chaque push) ; push SUR SON SIGNAL seulement ; ne jamais lancer la lecture d'une vidéo ; 3 agents à la fois au plus, toujours NEUFS (brief court), commit par épisode ; changer de session à 60 % ; ⚠️ quota hebdo à 85 % → économiser (pas d'agent sans nécessité, réponses courtes).

**Le principe (mémoire `coeur-du-site-la-qualite-du-coach.md`)** : le cœur d'eleveai.fr = la QUALITÉ DU COACH (il nourrit vidéos, évaluations, dictées, feuilles, cartes mentales, et bientôt 10+ pays). Variété (squelettes), centres d'intérêt PAR ÂGE, QCM + réponse courte, ⛔ PLUS AUCUNE question « open » à toutes les classes (« on n'est pas prêt »), formats selon la classe.

## Tout est POUSSÉ (dernier commit `7bdb373b`, 27/10 soir)
- Cartes mentales : hub `/cartes-mentales`, une carte par notion du coach (`/cartes-mentales/maths/<classe>/<notion>`, 421 au sitemap), grille 1 2 3 / 4 · 5 / 6 7 8, deux faces au-delà de 7 micros (lycée dès 5), pages A4 pleines, lignes 10 / 8 / 6,5 mm selon le niveau, MODE CLASSE au tableau, bouton « CM » dans le coach ; coach maths tout déplié par défaut.
- Vidéos : lecteur du site coupé avant « Et abonne-toi » → écran « À toi ! » ; feuille bilan par vidéo ; accueil « Ou commencer par une vidéo » → `/video?classe=` ; galerie sans « À la une ».
- Prof : dashboard sans English, Coach en premier, carte « Mes classes : inscrire une classe » ; cartes de connexion imprimées en noir ; code de classe = SIGLE (5 lettres max) + classe (CSJ6A).
- Fractions : 6e/5e/4e + CM1 EN LIGNE ; CM2 01-11 commités (brouillon, `.brouillon` en place) ; CM2 12-15 ARRÊTÉS (sa demande).

## Cette semaine (mer. 28 → ven. 30) : le SITE
1. Recueillir ses retours du test en 4e et 6e (cartes mentales, mode classe, coach simple : calculatrice à gauche, « Question suivante » en bas à droite).
2. ⛔ « La connexion avec Supabase bug, on va devoir revoir le système » : vérifier d'abord qu'il a exécuté `supabase/classes_prof.sql` puis `supabase/activite_eleve.sql`, lire les erreurs de `/api/prof/classes` et `/auth/signin`, puis revoir avec lui (mémoire `mes-classes-prof.md`).
3. Rappel : soumettre `https://www.eleveai.fr/sitemap.xml` dans la Search Console.

## SAMEDI 31/10 : vidéos (75 % du quota ; 25 % pour peaufiner, valider, vérifier le site)
1. Finir CM2 fractions 12-15 + passe finale CM2 (modèle `3db8064f` / `a5aee451`, outils du scratchpad précédent `c1/`).
2. PROPORTIONNALITÉ du CM1 à la Terminale, en commençant par 6e et 4e. D'ABORD la robustesse (mesure du 27/10, `scripts/mesurer-squelettes-coach.ts`) : VERT 6e, 5e, 4e ; ROUGE CM1 (7 micros), CM2 prop/%/échelle (15), 3e (7), 2de information chiffrée (6), 1re proportions + taux d'évolution (7), STMG (7) → réparer (3e, puis CM, puis lycée), en retirant les questions open ; puis feuilles → inventaire → consigne → lots vidéo. Ensuite : relever/ajouter les canvas utiles (tableau ×k, droite par l'origine, barres, échelle, barre de %).
3. S'il reste des crédits : vidéos COMMUNES CP/CE1/CE2 (modèle des épisodes communs CM1/CM2).
