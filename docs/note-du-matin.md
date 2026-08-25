# Passation — la 6ᵉ est fermée, et ce qu'on sait maintenant

> Réécrite le 24/08/2026, campagne terminée. **Cette note se remplace, elle ne
> s'empile pas** : elle ne vaut que pour la session suivante. Commencer par
> `git pull`.

---

## Ce qui est fait

**La 6ᵉ en maths est à 100 %** : 18 fiches, chaque propriété et chaque étape de
méthode porte son dessin. 105 dessins écrits dans la journée, sur 16 fiches (les
périmètres et les aires l'étaient déjà).

**Et la 5ᵉ aussi**, depuis le dernier commit : le dernier trou était dans
`maths-5e-operations-relatifs.tsx` — la fiche PILOTE, celle qui a fixé le
standard le 19/08 (« un dessin sur chaque propriété »). Elle portait quatre
dessins sur ses propriétés et **aucun sur sa méthode**. Trouvé en remesurant la
couverture après coup, pas en le lisant.

```
classe          fiches   propr.   méth.    ex.
maths 6e          18     100 %   100 %   100 %
maths 5e          20     100 %   100 %   100 %
maths cm2         28       0 %     0 %    91 %   ⛔ à réécrire, ne rien payer
maths première     1       0 %     0 %    25 %
français 6e        9     100 %   100 %   100 %
français cm2       8     100 %   100 %   100 %
français 5e        3     100 %   100 %   100 %   (autre session)
```

⛔ **Ne pas dessiner le CM2 en maths** : Frédéric réécrit toutes ces fiches, le
travail partirait à la poubelle.

---

## Le coût mesuré d'une classe parfaite

C'était la raison de la campagne : **estimer en mesurant, pas en devinant**.

- **une journée** pour 16 fiches et 105 dessins, vérification et PDF compris ;
- **33 commits**, un par fiche plus les corrections de canvas ;
- **≈ 6,5 dessins par fiche**, et le temps ne se passe PAS à choisir le dessin —
  il se passe à le rendre lisible. Compter à peu près moitié-moitié.

⚠️ Réserve honnête : la 6ᵉ était la classe la MOINS chère à finir — ses exemples
corrigés étaient déjà dessinés partout. Une classe partant de zéro coûte plus. Et
la journée a été ralentie par une collision de sessions (voir tout en bas).

---

## Les cinq règles apprises en mesurant — à lire avant de dessiner

Aucune ne se lit dans le code. Toutes se sont vues au rendu.

1. **`apercu-canvas.mjs` ne suffit pas.** Il a dit « ✅ rien à signaler » sur des
   dessins que la page donnait à 8,7 px. Le script juge un dessin isolé dans un
   cadre supposé ; la page ajoute la vraie largeur du bloc. **Passer les deux.**
2. **Le bloc le plus serré du site est l'EXEMPLE, pas la carte de propriété** :
   199 px sur un téléphone de 375, contre 225. Les canvas à viewBox fixe
   (`schema_barre`, `stat_graph`, `probabilites`, `fraction`, `tableau_*`,
   `calcul_pose`) écrivent en 12–15 px : au-delà de **210** de viewBox dans un
   exemple, ou **245** dans une propriété, le texte passe sous 11 px.
3. **Mesurer à 375 ET 1280.** Le palier intermédiaire (820 px) a été corrigé le
   24/08 dans `FicheCoursClient` — trois colonnes ne s'ouvrent plus qu'à 1024.
4. ⛔ **Trois canvas ne se laissent PAS rétrécir**, parce qu'ils dessinent depuis
   une origine fixe : réduire `size.width` les ROGNE au lieu de les mettre à
   l'échelle. `solide_3d` (origine 160,170, pas de 32 px), `transformation`
   (régler `cellSize`, jamais `width`) et `fonctionGraphique`. Sur les deux
   premiers, la seule commande est la POLICE. Le troisième ne tient pas du tout
   dans une carte de propriété — essayé, mesuré, abandonné.
5. **Quatre défauts qui ne sont pas des polices**, à chercher à part :
   - des **graduations trop denses** qui se touchent (`step: 1` sur douze
     nombres) — viser sept graduations, les points restent à la valeur exacte ;
   - des **étiquettes de parts trop étroites** : `schema_barre` donne à chaque
     part une largeur PROPORTIONNELLE à sa valeur. ⛔ Une décomposition décimale
     (4000 + 200 + 70 + 3) ne se dessine donc **jamais** en longueurs — les 4000
     mangent 93 % de la barre ;
   - une **phrase du bas qui sort du cadre** sans rien casser : elle se compte en
     caractères, viser vingt ;
   - deux **étiquettes au même endroit** (un point et son image confondus, un nom
     d'axe posé au milieu d'un segment).

Le mesureur à coller dans la console — polices sous 11 px, chevauchements de
textes, et textes sortis de leur `<svg>` — est dans le commit `c1840a67`. Il se
réécrit en quinze lignes : pour chaque `svg`, `police × largeurAffichée ÷
largeurViewBox` ; puis toutes les paires de `<text>` dont les rectangles se
coupent ; puis tout `<text>` dont le rectangle dépasse celui du `<svg>`.

⚠️ Vérifier que la fenêtre mesurée n'est pas à **zéro** de large : le volet du
navigateur peut être replié, et toutes les mesures sont alors fausses.

---

## La règle qui commande tout, et qui a tenu 105 fois

**Le canvas se choisit pour ce qu'il MONTRE** (REGLES.md § 2 bis). Sur chaque
fiche, le dessin évident revenait partout : le dé en probabilités, le tableau en
proportionnalité, la grille de 100 carreaux en pourcentages, le triangle en
géométrie. Six fois le même objet, ce sont six règles identiques aux yeux de
l'élève.

Ce qui a marché à chaque fois : **chercher ce que le canvas évident ne sait PAS
faire**, et le lire dans la colonne « ⛔ Pas pour » de `lib/canvas/CATALOGUE.md`.

⭐ **Et un procédé qui revient : le CONTRE-EXEMPLE.** Une propriété qui dit
« toujours » se montre en dessinant le cas où c'est faux. Des parts inégales sur
lesquelles aucune fraction ne s'écrit ; un pliage qui ne se superpose pas ; un
alignement de calcul posé de travers ; un tableau régulier mais non
proportionnel ; un programme qui tourne de 9° au lieu de 90°. C'est souvent le
dessin le plus utile de la fiche.

---

## Après chaque fiche modifiée

1. **Rendre la page** et la mesurer à 375 et 1280 px.
2. **Refaire son PDF** :
   ```bash
   npm run build:fiches-pdf -- http://localhost:3000 /fiches-cours/maths/6e/angle-mesure
   ```
3. **Vérifier** : `npm run verifier:pdf` — PDF manquant, en retard, fiche non
   commitée, PDF orphelin. Il compare des **dates de commit**, pas des `mtime`.

⚠️ Si le **H1** d'une fiche change, le nom de son PDF change et l'ancien devient
orphelin. Le contrôle le dit, il ne le supprime pas.

⚠️ **Le serveur de développement se dégrade** au bout d'une heure ou deux : 404
aléatoires sur des routes qui existent, puis `build:fiches-pdf` qui expire en
attendant `networkidle`. Le relancer suffit — ce n'est jamais le code.

---

## ✅ FAIT — les 67 PDF de maths sont à jour (25/08/2026)

Le h1 et les onze h2 ont changé dans le composant partagé (`ba5cbb43`, puis
`b4b3fe07` : le libellé de classe, pas le slug d'URL). Un PDF étant une photo de
la page, les 90 fichiers portaient encore l'ancien en-tête. **Les 67 de maths ont
été refaits en une passe** (`8b62136e`) ; le français est traité par l'autre
session. `verifier:pdf` : 90 fiches examinées, tous les PDF à jour.

⚠️ **Le contrôle ne voit PAS ce genre de péremption.** Il compare les dates de
commit de la FICHE et de son PDF : quand c'est le composant partagé qui change,
il reste au vert alors que les 90 fichiers sont périmés. À retenir pour la
prochaine fois qu'on touche `FicheCoursClient`.

**Trois pièges de la passe**, qui resserviront :

1. ⛔ **La liste de routes ne doit contenir que des FICHES.**
   `find … -path "*/*/*/*"` ramène aussi `/fiches-cours/francais`, la page
   d'index d'une matière : pas d'en-tête de site à masquer, donc l'attente du
   script ne se termine jamais et le lot entier tombe en `TimeoutError`. Le
   symptôme ressemble à s'y méprendre à la dégradation du serveur — ce n'en est
   pas une. Le bon filtre compte les segments :
   ```bash
   find app/fiches-cours -name page.tsx | sed 's|^app||; s|/page.tsx$||'      | awk -F/ 'NF==5' | grep -v "/ia/"
   ```
2. ⚠️ **Git Bash réécrit les chemins commençant par une barre** :
   `/fiches-cours/…` devient `C:/Program Files/Git/fiches-cours/…`. Mettre
   `MSYS_NO_PATHCONV=1` devant le `npm run`.
3. Des **lots de quinze** passent mieux que des lots de vingt ; le serveur s'est
   dégradé deux fois sur cinq lots, et le relancer suffit.

⛔ **Le trou de la règle d'indexation** reste ouvert : la micro-compétence
n'existe **ni dans `FicheCoursData`, ni sur la page**. Elle ne vit que dans les
commentaires d'en-tête des fichiers de fiche et dans la banque du coach. Classe,
matière et notion sont dans l'URL, le titre et les h2 ; la micro, non.

⚠️ **Et le point faible mesuré du référencement, c'est l'URL** :
`/fiches-cours/maths/6e/decimal-nombre` affiche le `notionId` interne du coach.
« nombres-decimaux » serait l'expression tapée. ⛔ Ne pas le changer sans poser
les redirections 301 — sinon on perd l'indexation acquise.

---

## ⏳ EN COURS — les micro-compétences entrent dans la donnée (25/08/2026)

**15 fiches de 6ᵉ maths restent à annoter.** Faites : angles, aires,
algorithmique. Le contrôle est `npm run verifier:micros` (ou
`node scripts/verifier-micros.mjs maths 6e`).

**La méthode, fiche par fiche :**

1. lister les micros de la notion — le rapport se réécrit en vingt lignes, il lit
   `lib/tutor-v4/knowledge/maths/6e/microSkills.ts` et filtre sur le `notionId`
   (⚠️ la route écrit `angle-mesure`, la banque `angle_mesure`) ;
2. poser `micros: ["…"]` sur chaque bloc qui enseigne vraiment cette micro ;
3. relancer le contrôle : il veut **toutes** les micros de la notion couvertes.

⭐ **NE PAS TOUT ANNOTER.** Quand la banque n'a pas de micro pour ce qu'un bloc
enseigne — la conversion d'unités d'aire, le comptage de carreaux — le bloc reste
**sans** micro. Coller la plus proche produit exactement ce que le contrôle est
censé empêcher : une annotation qui a l'air juste. Un bloc sans micro se lit ; un
bloc mal étiqueté trompe.

⚠️ **Deux pièges d'écriture rencontrés :**

- les blocs de méthode sont parfois **sur une seule ligne**
  (`{ titre: "Observer", texte: "…" },`) et parfois sur plusieurs. Un script
  d'insertion qui ne prévoit que la forme longue échoue — sans rien écrire, ce
  qui est le bon comportement, mais il faut traiter les deux ;
- les **exercices n'ont pas de `titre`** : on les repère par le début de leur
  `question`.

⛔ **Et le français n'est pas de notre ressort** : l'autre session l'annote au fil
de son générateur, et en a déjà deux. Ne pas y toucher.

---

## ✅ FAIT — les micro-compétences sont dans la donnée (25/08/2026)

**Les 18 fiches de 6ᵉ maths citent leurs micros : 105 sur 105.** Le lien
fiche ↔ compétence n'est plus un commentaire d'en-tête que rien ne lit, c'est un
champ vérifié : `npm run verifier:micros`.

- `FicheMicros` = `micros?: string[]` sur les cinq types de bloc — **optionnel**,
  les 89 fiches non annotées compilent et s'affichent à l'identique ;
- une micro sans bloc est un **trou** (signalé, n'échoue pas) ; une micro inconnue
  ou d'une autre notion est une **erreur** (fait échouer) ;
- une propriété a été écrite pour combler le seul vrai trou : « Plus grand qu'un
  entier » sur les fractions (`fraction_mixte`).

⭐ **La règle qui a tenu 105 fois : on n'annote pas tout.** Quand la banque n'a
pas de micro pour ce qu'un bloc enseigne, le bloc reste **sans** micro. Coller la
plus proche produirait ce que le contrôle est censé empêcher.

⛔ **DEUX SOURCES DE CONNAISSANCES COEXISTENT, NE PAS SE TROMPER :**

```
catalog.ts → buildKnowledge6eMaths() → microSkills.ts        ← LA SOURCE VIVE
lib/tutor/loaders/loadKnowledge.ts → *.knowledge.json        ← l'ANCIEN tuteur, figé au 14/08
```

Le vieux JSON dit `fraction_compare`, `fraction_defis`, `fraction_quantite` là où
la banque vive dit `fraction_comparer`, `fraction_defi`, `fraction_mixte`. Les
en-têtes de fiches qui citent les premiers sont des restes.

**Ce qui reste :** annoter les **89 autres fiches**, une classe à la fois. La 5ᵉ
maths d'abord (20 fiches, méthode rodée). Le français est traité par l'autre
session au fil de son générateur.

---

## ⏭️ DÉCIDÉ, PAS ENCORE FAIT

⛔ **L'ancre par bloc — ABANDONNÉ le 25/08.** Une ancre publique doit porter un
texte lisible ; aucune des deux sources ne convient. Les `label` de micros sont
lisibles en maths (« Tracer un angle ») mais illisibles en français — ce sont des
objectifs du BO. Les `titre` de blocs, eux, sont écrits pour un élève, mais
**64 fiches sur 109 ont un doublon** (« Le défi » revient partout). Il aurait
fallu désambiguïser par un identifiant technique, dans une URL publique.
Le raisonnement complet est dans `docs/prompt-ancres-micros.md`, marqué abandonné
pour qu'on ne le recommence pas.

⭐ Le niveau utile est déjà couvert : classe, matière et notion sont dans l'URL,
le `<title>`, le H1 et les onze H2.

**Le graphe des prérequis** — reporté par Frédéric, et voici ce qu'on sait :

```
3 426 micros · 3 618 liens · 0 cycle · 0 référence cassée
15 niveaux pour la plus longue chaîne
   0 lien inter-classes   ⛔
```

Le graphe est complet et sain DANS une classe, et vide ENTRE les classes. La 6ᵉ
maths a **10 racines** — les points où la chaîne devrait continuer vers le CM2 et
s'arrête. ⚠️ Un lien inter-classes ne peut pas être un simple `id` :
`angle_reconnaitre` existe en CM1, CM2 **et** 6ᵉ. Il faudrait
`prerequis: ["cm2:angle_reconnaitre"]`, donc toucher le type et le moteur du
coach. Le volume est petit, c'est la **forme** qui engage.

---

## 📏 LE CHIFFRAGE DU SITE ENTIER (25/08/2026)

Frédéric : « je me laisse 4-5 mois pour que les coachs du CP à la Terminale
soient parfaits, plus les fiches, plus les vidéos Manim. » Et : « je préfère bien
faire les choses. »

```
matière      notions   avec fiche   à écrire
maths          409         66          343
français       170         24          146
                          ─────────────────
maths + français                      489
(+ anglais 70, espagnol 47, IA 15, éco 7 → 628 en tout)
```

**489 fiches à écrire** pour finir maths + français du CP à la Terminale. Sur
100 jours ouvrés, cela ferait cinq fiches par jour, tous les jours, sans compter
les coachs ni les vidéos. La mesure dit 2 à 4 par jour depuis zéro — soit environ
**huit mois pour les fiches seules**.

⭐ **MAIS LE RYTHME DE LA 6ᵉ N'EST PAS LE BON ÉTALON.** Sur cette journée, la
moitié du temps est partie à rendre les dessins lisibles — et ces défauts étaient
dans les CANVAS, pas dans les fiches : le rapporteur à 8,7 px, les solides, les
symétries, les trois colonnes qui s'ouvraient dès 768 px. Corrigés une fois, pour
les 109 fiches. Les classes suivantes ne les repaieront pas.

⭐ **LE VRAI ÉTALON SERA LA 4ᵉ.** À 4-5 fiches par jour, l'horizon tient pour le
collège. À 2, il faudra choisir : le collège seul, ou un standard différent pour
le primaire. ⛔ Ne pas trancher avant d'avoir le chiffre — c'est exactement ce que
la campagne de la 6ᵉ était censée produire, et elle l'a produit pour un cas
particulier (des fiches qui existaient déjà).

⚠️ Et sur le trafic, qui monte : 400 visiteurs/jour au 25/08, peut-être 1000 sous
dix jours. Une part est SAISONNIÈRE — la rentrée est à six jours. Le chiffre qui
comptera est celui de mi-septembre, quand le pic sera retombé.

---

## Ce qui vient après

**La 4ᵉ**, et les analytics Vercel du 24/08 le disent :

```
/cahier-vacances/vers-la-4e   507   ← la page la plus vue du site
/cahier-vacances/vers-la-5e   474
/accueil                      355
/cahier-vacances/vers-la-6e   177
```

⚠️ Mais ce n'est PAS le même travail : les fiches de 4ᵉ sont à **zéro**, éteintes
le 21/08 pour être refaites au propre. Il ne s'agit pas d'ajouter des dessins à
des fiches existantes, il s'agit d'**écrire les fiches**. Prévoir plus qu'une
journée, et commencer par lire une banque du coach en 4ᵉ.

⚠️ Réserve d'interprétation : ces 507 visiteurs sont sur un **cahier de
vacances**, pas sur une fiche. En déduire l'audience des fiches de 4ᵉ est un pari
raisonnable, pas une mesure.

**L'autre branche**, annoncée par Frédéric : les **vidéos Manim**, maintenant que
le coût d'une classe est mesuré. Les deux ne se font pas en même temps —
demander laquelle avant de commencer.

---

## Deux dossiers en sommeil

- **Les 16 fiches d'IA** n'ont pas de PDF : leur bouton appelle encore
  `window.print()` (`FicheCoursIa.tsx`). Frédéric : « les fiches IA pas grave ».
- **`fiches-maths-premiere`** promet une collection et n'a qu'une fiche
  (`derivation`), dont les graduations sont à 10,0 px — seul endroit du site où le
  défaut de `fonctionGraphique` subsiste. Soit on écrit la Première, soit on
  retire la carte.

---

## ⛔ Une seule session par dossier

Le 24/08, deux sessions ont travaillé dans `C:\Users\FRED\Documents\eleveai` en
même temps. Un `git commit --amend` de l'autre session a avalé un de mes commits
(récupéré à la main : `git reset --soft HEAD~1`, puis commit limité par chemin),
et deux serveurs Next sur le même `.next` ont donné des 404 aléatoires qui ont
fait échouer plusieurs constructions de PDF.

**Deux règles qui en découlent :**

- une seule session à la fois **dans ce dossier** — le partage des deux postes ne
  suffit pas, c'est le dossier qui compte ;
- ⭐ **toujours committer par chemin** : `git commit -F msg.txt -- <fichiers>`.
  Un `git commit` ordinaire emporte tout ce que l'autre session a laissé dans
  l'index.
