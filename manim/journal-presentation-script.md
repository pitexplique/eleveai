# « Le Journal d'EleveAI : comprendre le monde et le changer » : paysage + short en dessin animé

> ✅ **SCRIPT VALIDÉ PAR FRÉDÉRIC** le 10/11/2026 (« Je valide » : voix, écrits, questions, ceinture jaune pour les deux). Rien n'est encore rendu, aucune voix générée.
> Voix (Ti Margo) : `manim/voix/journal-presentation-paysage.json` et `manim/voix/journal-presentation-short.json`.
> Rendu prévu avec le socle Ti Margo (`prototypes/ti-margo/LISEZ-MOI.md`) : série `journal`, épisodes `presentation` (paysage, `"format": "paysage"` comme `ulule`) et `presentation-short` (9:16).
> Page présentée : `/accueil-journal` (bandeau Ti Margo en haut de toutes les pages). Article à la Une : `bonnes-actions-puissances` de `lib/accueil/articles.ts`.
> Contextes : bus, récré, espace, santé, nature, métier de la santé. Pas de La Réunion (les 4 % sont pris ailleurs). Prénoms : Lina, Sam.
> Ceinture : **jaune** pour les deux (validée le 10/11).

## Calculs vérifiés

- Jour n : 2ⁿ. Jour 5 : 32 · jour 7 : 128 · jour 10 : 1 024 · jour 30 : 2³⁰ = 1 073 741 824.
- Total après n jours : 2 + 4 + … + 2ⁿ = 2ⁿ⁺¹ − 2. Après 3 jours : 14 = 2⁴ − 2. Après 30 jours : 2³¹ − 2 = 2 147 483 646.
- Planète : après 31 jours, 2³² − 2 ≈ 4,3 milliards (pas assez) ; après 32 jours, 2³³ − 2 ≈ 8,6 milliards > 8 milliards. ✅ 32 jours.
- Une fois par semaine : 32 doublements = 32 semaines < 52. ✅ moins d'un an.
- Question en commentaire du short : 3, 9, 27, **81** le 4e jour.

## PAYSAGE (16:9, environ 4 min)

| # | Image (dessin animé) | Voix (Ti Margo) | Écrit à l'écran |
|---|---|---|---|
| 00 | Dans un bus, les crayons de Lina roulent par terre ; Ti Margo les ramasse. Puis la cour de récré : il casse son goûter en deux pour Sam. Deux petits cœurs s'allument au-dessus de lui. | « Ce matin, dans le bus, Lina a fait tomber ses crayons. Je les ai ramassés. Et à la récré, Sam avait oublié son goûter : je lui ai donné la moitié du mien. Deux petites bonnes actions. Est-ce que ça peut changer le monde ? » | Lina · Sam · 2 bonnes actions · Est-ce que ça peut changer le monde ? |
| 01 | Ti Margo s'assoit et ouvre un grand journal (la pose du bandeau). Le titre se déplie ; des vignettes de rubriques volent autour. | « Pour le savoir, j'ouvre le Journal d'éleveai. Son nom : comprendre le monde, et le changer. Chaque jour, des articles sur l'espace, la santé, l'argent, le sport, la planète… et les maths qui les expliquent. » | Le Journal d'EleveAI · Comprendre le monde, et le changer · Espace · Santé · Argent · Sport · Planète |
| 02 | La Une du journal en gros plan. Puis une rangée de bonhommes : chaque bonhomme lance deux cœurs vers deux nouveaux bonhommes (1 → 2 → 4 → 8). En bas, un compteur par jour, synchrone. | « Aujourd'hui, à la Une : deux bonnes actions par jour, et la planète entière change en un mois. Je lis l'article. Le premier jour, je fais 2 bonnes actions. Le deuxième jour, Lina et Sam en font chacun 2 : ça fait 4. Le troisième jour : 8. Chaque jour, le nombre double. » | Titre de l'article · Jour 1 : 2 · Jour 2 : 4 · Jour 3 : 8 · × 2 chaque jour |
| 03 | ⏸ L'encadré « 🎯 Le défi de l'article » (comme sur la page), 3 boutons, compte à rebours 5 s. Puis B s'allume (agrandir puis rétrécir) ; les 5 jours s'alignent. | « Sous l'article, il y a son défi. Question ! Le 5e jour, combien de bonnes actions sont faites ce jour-là ? A : 10. B : 32. C : 25. Mets pause, et choisis ! » / « Réponse B : 32. On double chaque jour : 2, 4, 8, 16, 32. C'est 2 puissance 5, et pas 2 fois 5. » | Le défi de l'article · Le 5e jour : combien ce jour-là ? · A 10 · B 32 · C 25 · 2, 4, 8, 16, 32 · 2⁵ = 32 · 2 × 5 = 10 ✗ |
| 04 | Les bonhommes deviennent une petite foule ; Ti Margo hausse les épaules… puis tend l'oreille, malicieux. | « Au début, c'est minuscule. Le 7e jour : 128 bonnes actions ce jour-là. Pas de quoi changer le monde… Attends un peu. » | Jour 7 : 128 |
| 05 | L'encadré « Les maths derrière » glisse sur l'écran. Un calendrier défile jusqu'au 30 ; le nombre grandit, chiffre par chiffre, jusqu'à déborder (agrandir puis rétrécir). | « Dans l'article, un encadré : Les maths derrière. Jour 2 : 2 au carré, 4. Jour 3 : 2 au cube, 8. Et le jour 30 : 2 puissance 30. Un milliard soixante-treize millions sept cent quarante et un mille huit cent vingt-quatre ! Plus d'un milliard, en un seul jour. » | Les maths derrière · 2² = 4 · 2³ = 8 · Jour 30 : 2³⁰ = 1 073 741 824 · Plus d'1 milliard en 1 jour |
| 06 | ⏸ Question, 3 boutons, 5 s. Puis C s'allume ; les trois piles (2, 4, 8) se rassemblent en une seule de 14, à côté d'une pile de 16 qui perd 2. | « Question ! Et en tout ? Après 3 jours, combien de bonnes actions depuis le début ? A : 8. B : 16. C : 14. Mets pause, et choisis ! » / « Réponse C : 14. On additionne les trois jours : 2 plus 4 plus 8. Et regarde : 14, c'est 2 puissance 4, moins 2. » | En tout, après 3 jours ? · A 8 · B 16 · C 14 · 2 + 4 + 8 = 14 · 2⁴ − 2 = 14 |
| 07 | La même pile, géante : elle monte jusqu'au ciel, à côté d'une montagne. | « Même astuce au bout de 30 jours : le total, c'est 2 puissance 31, moins 2. Deux milliards cent quarante-sept millions quatre cent quatre-vingt-trois mille six cent quarante-six bonnes actions ! » | 2 + 4 + … + 2³⁰ = 2³¹ − 2 = 2 147 483 646 |
| 08 | ⏸ La Terre qui tourne, 3 boutons, 5 s. Puis A s'allume ; la Terre se couvre de petits cœurs, jour 32. | « Question ! La Terre compte environ 8 milliards d'habitants. En combien de temps la chaîne toucherait-elle tout le monde ? A : environ 32 jours. B : environ 4 ans. C : environ mille ans. Mets pause, et choisis ! » / « Réponse A : environ 32 jours ! Au bout de 32 jours, le total dépasse 8 milliards. Toute la planète, en un mois. » | 8 milliards d'habitants · A environ 32 jours · B environ 4 ans · C environ 1 000 ans · Jour 32 : total > 8 milliards |
| 09 | Quelques fils de la chaîne se cassent (gris) ; le calendrier passe en semaines. Puis trois chaînes qui poussent : un virus, une bulle de rumeur, une ampoule. | « Bien sûr, dans la vraie vie, la chaîne se casse souvent. Mais même si chacun ne transmettait qu'une fois par semaine, il faudrait 32 semaines : moins d'un an. C'est comme ça que se propagent un virus, une rumeur… ou une idée généreuse. » | 1 fois par semaine → 32 semaines < 1 an · Un virus · Une rumeur · Une idée généreuse |
| 10 | Une épidémiologiste devant une carte où des points se multiplient. | « D'ailleurs, ces calculs, c'est le métier d'une épidémiologiste : elle suit la façon dont les maladies se propagent. » | Métier : épidémiologiste · Elle suit la façon dont les maladies se propagent |
| 11 | L'encadré vert « Et toi, tu peux… » ; Ti Margo tend deux cœurs vers nous. | « Et l'article finit par une phrase qui change le monde : Et toi, tu peux… Lance la chaîne aujourd'hui : fais une bonne action à deux personnes, et demande-leur d'en faire autant. Demain, compte combien ont continué. » | Et toi, tu peux… · Fais une bonne action à 2 personnes · Demain : combien ont continué ? |
| 12 | La colonne de droite du journal : « Les chiffres clés » ; un rayon de lumière file vers la Terre. | « Dans le journal, il y a aussi les chiffres clés. Par exemple : trois cent mille kilomètres par seconde, la vitesse de la lumière. » | Les chiffres clés · 300 000 km/s · La vitesse de la lumière |
| 13 | « Les autres nouvelles » : trois colonnes ; le Soleil (avec une horloge), un cœur qui bat. | « Puis les autres nouvelles : le Soleil que tu vois a 8 minutes de retard. Ton cœur bat environ cent mille fois par jour. » | Les autres nouvelles · Le Soleil que tu vois a 8 minutes de retard · Ton cœur bat environ 100 000 fois par jour |
| 14 | Un calendrier qui alterne : 🌳 Ti Margo plante un bâton près d'un arbre, les deux ombres s'allongent ; 🤝 Ti Margo sous la douche, un sablier, un seau qui se remplit. | « Et chaque jour, une mission. Un jour, le défi dehors : mesure la hauteur d'un arbre, sans y grimper, avec son ombre. Le lendemain, la bonne action du jour : économise l'eau de ta douche. » | Le défi dehors : mesure la hauteur d'un arbre… sans y grimper · La bonne action du jour : économise l'eau de ta douche |
| 15 | « Ce que tu as appris », titre en haut et centré ; trois pictos : 📖 💡 🤝. | « Ce que tu as appris. Ce qui double chaque jour devient vite gigantesque. Et un article du journal se lit en trois temps : comprendre, se tester, agir. » | Ce que tu as appris · Ce qui double chaque jour devient vite gigantesque · Comprendre · Se tester · Agir |
| 16 | Le haut d'une page du site, avec le bandeau ; un curseur clique dessus ; Ti Margo, dans le bandeau, fait un clin d'œil. | « Le journal change chaque jour. Pour le trouver, clique sur le bandeau où je lis mon journal, en haut de toutes les pages. » | Le journal change chaque jour · (le bandeau, tel qu'il est sur le site) |
| 17 | Écran de fin habituel. | « Entraîne-toi sur éleveai point f r. Et si ça t'a aidé : mets un pouce, laisse un commentaire, abonne-toi et active la cloche ! » | Entraîne-toi sur · eleveai.fr · Abonne-toi ! · @eleveai974 · Un pouce · Un commentaire · La cloche |

Questions-pauses (bonne réponse : B, C, A ; jamais deux fois la même lettre de suite). La première est le défi de l'article tel quel (même ordre que sur la page, donc B).

```json
"questions": [
  { "t": "…", "question": "Le 5e jour, combien de bonnes actions sont faites ce jour-là ?", "choix": ["10", "32", "25"], "reponse": 1, "explication": "On double chaque jour : 2, 4, 8, 16, 32. C'est 2⁵, et pas 2 × 5." },
  { "t": "…", "question": "Après 3 jours, combien de bonnes actions depuis le début ?", "choix": ["8", "16", "14"], "reponse": 2, "explication": "2 + 4 + 8 = 14, c'est 2⁴ − 2." },
  { "t": "…", "question": "8 milliards d'habitants : en combien de temps la chaîne toucherait-elle tout le monde ?", "choix": ["Environ 32 jours", "Environ 4 ans", "Environ 1 000 ans"], "reponse": 0, "explication": "Au bout de 32 jours, le total 2³³ − 2 dépasse 8 milliards." }
]
```

## SHORT (9:16, environ 50 s)

| # | Image (dessin animé) | Voix (Ti Margo) | Écrit à l'écran |
|---|---|---|---|
| 00 | Titre + échelle des ceintures. Ti Margo, deux cœurs dans les mains, un calendrier derrière lui. | « 2 bonnes actions, qui doublent chaque jour : combien au bout d'un mois ? » | 2 bonnes actions, qui doublent chaque jour : combien au bout d'un mois ? |
| 01 | En haut, les cœurs se dédoublent ; en bas, le compteur du jour se remplit EN MÊME TEMPS (même couleur). | « Jour 1 : j'aide 2 amis. Jour 2 : chacun en aide 2 : 4. Jour 3 : 8. Jour 4 : 16. » | Jour 1 : 2 · Jour 2 : 4 · Jour 3 : 8 · Jour 4 : 16 |
| 02 | ⏸ Question, 3 boutons, 3 s. Puis A s'allume (agrandir puis rétrécir). | « Question ! Le 10e jour, combien de bonnes actions ce jour-là ? A : mille vingt-quatre. B : 20. C : 100. Mets pause, et choisis ! » / « Réponse A : mille vingt-quatre. C'est 2 puissance 10, et pas 2 fois 10 ! » | Le 10e jour ? · A 1 024 · B 20 · C 100 · 2¹⁰ = 1 024 · 2 × 10 = 20 ✗ |
| 03 | Le calendrier s'envole jusqu'au 30 ; les cœurs remplissent l'écran, Ti Margo est soulevé par la vague. | « Et le jour 30 ? 2 puissance 30 : plus d'un milliard en un seul jour ! Et plus de 2 milliards en tout. » | Jour 30 : 2³⁰ > 1 milliard · En tout : > 2 milliards |
| 04 | La Terre se couvre de cœurs ; puis Ti Margo ouvre le journal, l'article à la Une. | « Toute la planète, 8 milliards d'humains, en 32 jours. C'est l'article à la Une du Journal d'éleveai : comprendre le monde, et le changer. » | 8 milliards · 32 jours · Le Journal d'EleveAI · Comprendre le monde, et le changer |
| 05 | Trois cœurs qui triplent ; un « ? » sur le jour 4. | « À toi : 3 bonnes actions, qui triplent chaque jour. Combien le 4e jour ? Réponds en commentaire ! » | 3 bonnes actions, × 3 chaque jour · Combien le 4e jour ? · Réponds en commentaire ! |
| 06 | Écran de fin habituel du short. | « Entraîne-toi sur éleveai point f r. Mets un pouce, abonne-toi et active la cloche ! » | Entraîne-toi sur · eleveai.fr · Abonne-toi ! · @eleveai974 · Un pouce · La cloche |

```json
"questions": [
  { "t": "…", "question": "Le 10e jour, combien de bonnes actions ce jour-là ?", "choix": ["1 024", "20", "100"], "reponse": 0, "explication": "2¹⁰ = 1 024, et pas 2 × 10." }
]
```

Réponse attendue en commentaire : 81 (3, 9, 27, 81).

## Validé le 10/11 ; prochaines étapes

1. Générer les voix (Ti Margo), puis les instants des mots (`scripts/ti-margo-cues.py journal <épisode>`).
2. Écrire `prototypes/ti-margo/films/journal.js` + `journal.json` (paysage `"format": "paysage"`, modèle `ulule.js`), contrôle, brouillon, puis rendu.
3. Le short sort APRÈS la paysage (règle habituelle).
