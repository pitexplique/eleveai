# Passation — la fiche de COURS de trigonométrie, 1re spé (28/09/2026)

À coller en début de session. Tout le reste de la trigo de 1re spé est FAIT ;
il ne manque que la fiche de cours.

---

Crée la fiche de cours de trigonométrie de 1re spécialité :
`/fiches-cours/maths/premiere-spe/trigonometrie`, avec son PDF.

## Ce qui existe déjà (ne pas refaire)
- Coach : notion `trigonometrie` (libellé « Trigonométrie », BO 2026), 13 micros
  dans `lib/tutor-v4/knowledge/maths/premiere-spe/microSkills.ts`, banque
  `lib/tutor-v4/questionBank/premiere-spe/maths/trigonometrie.bank.ts`.
  ⛔ Lire les micros AVANT d'écrire : chaque bloc de la fiche doit en couvrir une.
- Feuille d'exercices : `lib/fiches-exercices/maths-premiere-trigonometrie.tsx`
  (20 exercices, 18 cercles dessinés) — elle porte le rappel de cours utile ;
  la fiche de cours doit renvoyer vers elle, et elle vers la fiche
  (`fichesCours` est aujourd'hui VIDE dans la feuille : le remplir).
- Canvas `cercle_trigo` (`lib/canvas/CercleTrigoCanvas.tsx`, catalogue dans
  `lib/canvas/CATALOGUE.md`) : se décrit en `{ n, d }` = nπ/d, cos et sin
  CALCULÉS (jamais saisis), arc, projections, 16 repères remarquables.
- Vidéo en ligne : https://youtu.be/5E56e0CbyvQ (leçon « rouge et vert »,
  déjà en base au niveau notion → elle s'affichera sur la fiche toute seule).

## Le contenu (BO 2026, dans cet ordre)
1. Cercle trigonométrique, rayon 1 ; sens + = inverse des aiguilles d'une montre.
2. Radian = longueur de l'arc (2πR du CM2 → un tour = 2π) ; conversions.
3. Enroulement de la droite ; x et x + 2π ont le même point image.
4. cos x = abscisse, sin x = ordonnée ; −1 ≤ cos, sin ≤ 1 ; signes.
5. Lien avec le triangle rectangle ; cos² x + sin² x = 1.
6. Valeurs remarquables (0, π/6, π/4, π/3, π/2) — l'astuce √0/2 … √4/2.
7. Démonstrations AU PROGRAMME : cos et sin de π/4 (bissectrice + Pythagore) et
   de π/3 (triangle équilatéral).
8. Angles associés lus sur le cercle : −x, π − x, π + x ; grands réels (retirer
   les tours).
9. Parité, périodicité, courbes : GARDÉES (décision de Frédéric du 26/09), même
   si le BO 2026 ne les nomme plus.
10. Exemple d'algorithme : approximation de π par Archimède.
⛔ PAS de résolution de cos x = a (hors BO 2026 — Frédéric, 28/09).

## ⭐ Les conventions de Frédéric (obligatoires)
- **Axe horizontal ROUGE = cosinus, axe vertical VERT = sinus** — c'est ainsi
  qu'il dessine en classe. Toutes les figures de la fiche la suivent.
- **Le signe du cosinus s'explique par le VENT** : tu avances vers la droite, le
  vent souffle dans la direction de l'angle ; il t'aide → cos > 0 ; de côté →
  0 ; il te freine → cos < 0. « Le cosinus, c'est la part du vent qui te pousse
  vers l'avant. » (sa pédagogie de classe, mémoire `le-vent-explique-le-signe-du-cosinus`)
- Écrire SIMPLEMENT (une phrase par idée, le mot de la classe), un visuel par
  bloc, exemples du monde (pas La Réunion par défaut).

## ⚠️ Le canvas ne sait pas encore faire le rouge et vert
`cercle_trigo` dessine ses axes en gris. Deux options, à trancher AVEC Frédéric
avant de coder : (a) ajouter une option `axesCouleur: true` au canvas (axe x
rouge, axe y vert, projections colorées) — elle servira aussi à la feuille ;
(b) dessiner en SVG dans la fiche. L'option (a) est la plus propre.

## La mécanique (copier une fiche voisine)
- Modèles : `lib/fiches/maths-premiere-suites.tsx` (fiche récente, 3 dessins),
  `lib/fiches/maths-premiere-exponentielle.tsx`. Règles : `lib/fiches/REGLES.md`.
- Registre : `lib/fiches/registre.ts` (clé `maths/premiere-spe/trigonometrie`).
- Page : `app/fiches-cours/maths/premiere-spe/trigonometrie/page.tsx`.
- ⛔ Titre COURT (les h2 le reprennent) ; ne pas numéroter les titres de `methode`.
- PDF : serveur REDÉMARRÉ, puis
  `node --experimental-strip-types scripts/build-fiches-pdf.ts http://localhost:3000 /fiches-cours/maths/premiere-spe/trigonometrie`.
- Vérifier chaque bloc EN LE RENDANT (écran + PDF + mode classe) : les petites
  erreurs se voient au rendu, pas à la relecture du code.
- Recalculer indépendamment chaque valeur citée (modèle :
  `scripts/verifier-exercices-trigonometrie-premiere.mjs`).
- Commits : par CHEMIN, groupés ; un seul push, à son signal.
