Prompt — PAYS : finir le Sénégal, puis les retirer de l'accueil jusqu'aux 3 000 vidéos (Frédéric, 25/10/2026)

Colle ceci dans une session :

---

Réponds toujours en français. Ne me pose pas de questions, sauf pour me montrer le Sénégal à l'étape 1. Tranche, avance, et liste tes choix à la fin.

**Règles de travail**
- Committe PAR CHEMIN, jamais `git add -A`.
- Pas de push sans mon signal. Avant chaque push, vérifie que la story Instagram n'en fait pas partie (`git log origin/main..HEAD --stat`).
- Ne touche à aucun fichier des séries vidéo (fractions, proportionnalité) : d'autres sessions y travaillent.

**Ma décision du 25/10** : « fais le Sénégal pour voir, puis on l'enlève de l'accueil et on le remet après les 3 000 vidéos ». Les pays sont GELÉS jusqu'à 3 000 vidéos, toute l'énergie va aux vidéos.

## Étape 1 — Le Sénégal (collège, de la 6e à la 3e)
- **Vérifier ce qui existe.** Un agent a peut-être déjà fait la matrice : regarde si `lib/programmes-pays/senegal-moyen.ts` existe et si `senegal` figure dans `PAYS` de `lib/programmes-pays/pays.ts`. Lis aussi `git log --oneline -- lib/programmes-pays`.
- **S'il manque quelque chose, le faire.**
  - Matrice : une par classe, au format de `maroc-3ac.ts`, avec la source officielle du ministère sénégalais (approche par compétences) dans l'en-tête et seulement de vrais ids de micros.
  - Classes dans `CLASSES_PAYS` : Élémentaire CI → CM2 (grisée), Moyen 6e → 3e, Secondaire 2nde → Tle (grisée).
  - Drapeau `public/drapeaux/senegal.svg` (flag-icons, licence MIT).
  - Sur la page, la phrase doit dire « Programme du Sénégal ».
- **Vérifier** : `npx --yes tsx@4 scripts/couverture-programmes-pays.ts`, `npx tsc --noEmit -p .`, puis les pages /pays/senegal?classe=6e à 3e dans le navigateur intégré (serveur « eleveai »). Chaque micro doit avoir ses fiches et ses vidéos.
- **Me le montrer** (capture et couverture par classe), puis committer.

## Étape 2 — Retirer les pays de l'ACCUEIL (après que j'ai vu le Sénégal)
Dans `app/accueil/AccueilCoach.tsx` :
- retirer la ligne « Ton pays : » (les boutons France, Québec, Maroc, Sénégal) ;
- ⭐ GARDER une carte, mais transformée (Frédéric, 25/10 : « intéressant pédagogiquement de voir la carte des pays où on enseigne les maths en français ») : « Les maths en français dans le monde », PLUS BAS dans la page (pas dans le bloc « commencer »), deux teintes : rouge foncé = programme sur EleveAI (France, Maroc, Québec, Sénégal) ; rouge clair = pays où les maths s'enseignent en français (liste VÉRIFIÉE par WebSearch : OIF, ministères ; ne colorier que les cas sûrs, ex. Belgique, Suisse, Luxembourg, Monaco, Haïti, Côte d'Ivoire, Mali, Burkina Faso, Niger, Guinée, Bénin, Togo, Cameroun, Gabon, Congo, RDC, Tchad, Centrafrique, Madagascar, Djibouti, Comores, Burundi, Tunisie au lycée…). Légende courte et juste (nombre de francophones selon l'OIF, chiffre et année vérifiés). Régénérer le SVG avec le script du scratchpad `carte/carte.mjs` (d3-geo, Natural Earth 110 m) en y ajoutant la seconde teinte. Pas de sélecteur de pays : la carte est un repère culturel, pas une entrée du coach ;
- retirer le bloc « Le coach suit le programme officiel… » ;
- dans les compteurs, remplacer « N programmes de pays » par un autre chiffre vrai (par exemple « 24 000+ exercices » si on peut le mesurer, sinon « CP → Tle » déjà présent : choisis un compteur juste) ;
- retirer la porte « Écoles et pays » des portes des adultes.

Ailleurs :
- retirer le bandeau des pays (`components/accueil/BandePays.tsx`) là où il est affiché (`app/accueil-journal/JournalClient.tsx`) ;
- retirer le sélecteur de pays du coach (`components/SelecteurPays.tsx` dans `app/coach-ia/[matiere]/page.tsx`).

**On garde** : les pages `/pays/<pays>` (noindex), `lib/programmes-pays/`, `public/carte-pays.svg` et `public/drapeaux/`. Un commentaire « ⏸ pays gelés jusqu'à 3 000 vidéos (Frédéric, 25/10) » doit marquer chaque endroit retiré, pour savoir quoi remettre.

Vérifie l'accueil dans le navigateur, en ordinateur et en téléphone : plus de pays, rien de cassé, la classe choisie montre bien ses vidéos. Lance `npx tsc --noEmit -p .`, puis committe par chemin.

## Étape 3 — À 3 000 vidéos (pas maintenant)
- Remettre les éléments retirés (chercher le commentaire « ⏸ pays gelés »).
- Ma liste de pays, dans l'ordre : France, Suisse romande, Belgique (FWB), Maroc, Québec, Côte d'Ivoire, Sénégal. Les USA et l'Ontario sont retirés.
- Session de réflexion : `manim/prompt-session-transversal-classes-pays.md`.
