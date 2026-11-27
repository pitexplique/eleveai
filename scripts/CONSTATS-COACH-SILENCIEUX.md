# Ce qui tombe en silence entre une ligne de registre et ce que l'élève voit

27/11/2026 · branche `poste2` · rien n'est poussé.
Les chiffres viennent tous d'une mesure lancée aujourd'hui, jamais d'une lecture de code :
`scripts/RAPPORT-COACH-SILENCIEUX.md` est la sortie brute, régénérable par

```powershell
npx tsx scripts/verifier-coach-silencieux.ts --sortie=scripts/RAPPORT-COACH-SILENCIEUX.md
```

---

## Un chiffre par ligne

| # | ce qui est mesuré | chiffre |
| --- | --- | ---: |
| 1 | identifiants de vidéo appelés en prod (× 2 adresses = 3 566 appels) | 1 783 |
| 1 | **boutons morts** (`/api/video-lecteur/<id>` ou `/video/<id>` non-200) | **0** |
| 1 | redirections vers YouTube | 0 |
| 2 | lignes servant un hôte YouTube | **0** (2 095 sur `www.eleveai.fr`) |
| 3 | lignes pointant une **notion** absente du catalogue | **1** |
| 3 | lignes pointant une **micro** absente de sa notion | **2** |
| 3 | lignes pointant une micro **masquée** (jamais affichée) | 22 |
| 4 | micros servies par une vidéo | 1 038 |
| 4 | dont un **short seul**, sans aucun paysage | **64** |
| 4 | lignes où la forme de l'URL **contredisait** le registre | **122** |
| 4 | micros dont le bouton ▶ servait un short alors qu'un paysage existait | **42** → corrigé |
| 5 | clés du registre déployé portant un lien coach, **sans ligne de coach** | **57** |
| 5 | lignes de coach dont l'identifiant est **absent du registre** | **0** |
| 6 | combinaisons `?classe=…&matiere=…` repliées **en silence** sur une autre classe | **88** / 132 |

---

## 1 · Les boutons morts : zéro, et c'est mesuré

1 783 identifiants distincts, deux adresses chacun, 4 appels en parallèle : **aucun non-200**.

Deux précisions qui comptent plus que le zéro :

- **Un bouton mort ne renvoie pas 404 à l'élève.** Le modal du coach appelle
  `/api/video-lecteur/<id>`. Sur un 404 il n'affiche pas d'erreur : il écrit « Cette vidéo
  n'est pas encore sur le site » avec un lien « L'ouvrir à part ». C'est cette adresse-là
  que le vérificateur appelle — pas seulement la page.
- **Un 200 ne suffit pas.** `/video/<11 caractères>` inconnu du registre **redirige vers
  YouTube** (`app/video/[id]/page.tsx`). Un test qui suit les redirections verrait 200 et
  conclurait « tout va bien » pendant que l'élève part chez YouTube. Le vérificateur appelle
  en `redirect: "manual"` et lit l'en-tête `Location` : **0 redirection vers YouTube**.

## 2 · Les hôtes : aucun lien YouTube

2 095 lignes sur 2 095 servent `www.eleveai.fr`. Le piège de la clé est bien réel mais ne
mord pas ici : **35 lignes portent une clé nommée `youtube-…`** (par exemple
`/video/youtube-Y3gFecuyBTQ`), et toutes sont des clés du registre R2 servies depuis
eleveai.fr. Le vérificateur lit l'hôte de l'URL, jamais le nom de la clé.

## 3 · Trois lignes mal rangées, et 22 lignes qui ne s'affichent nulle part

- `premiere-spe` · notion **`exponentielle_etude`** — cette notion n'existe pas au
  catalogue ; la bonne est `exponentielle`. 1 ligne, titre « Dériver et étudier
  l'exponentielle (3/3) ».
- `cm1` · notion `masse` · micro **`masse_mesurer`** — cette micro n'existe pas : le CM1 a
  `masse_comparer`, `masse_convertir`, `masse_estimer`, `masse_defi`. 2 lignes
  (« Combien pèse ma pastèque ? » et « Où pointe l'aiguille de la balance ? »).

Ces trois lignes n'affichent **aucun** bouton : elles sont rangées sous un identifiant que
le coach ne connaît pas. **Rien n'a été écrit en base** — c'est ta décision (voir plus bas).

À part : **22 lignes servent des micros masquées** (`lib/tutor-v4/micros-masquees.ts`) —
proportionnalité en CM1/CM2, fréquences en STMG, quatre micros de seconde. La micro existe,
sa vidéo existe, mais le coach ne propose plus la micro : le bouton ne s'affiche jamais.

✅ **Décidé le 27/11 : on les garde.** Une micro masquée peut être démasquée, et la ligne
retirée serait à réécrire sans que personne se souvienne qu'elle a existé. Le vérificateur
les classe désormais **à part**, comme un choix fait, et n'en donne plus la liste ligne à
ligne — seulement un décompte par classe, pour ne pas sonner chaque semaine.

## 4 · Le cas qui a motivé le chantier — et la troisième forme

**La troisième forme existe, et c'est la seule qui décide : le champ `short` du registre.**

Recherche faite dans tout le dépôt (`.short`, `format=short`, `aspect-[9/16]`) :

| forme | qui la lit | ce qu'elle décide |
| --- | --- | --- |
| champ `short` de `videos-r2.json` | `app/video/[id]/page.tsx`, `components/LienVideoModal.tsx` | **le format réellement affiché** (9/16 ou 16/9) |
| `?format=short` dans l'URL | **aucune page** — seulement `estShortVideo()` | quelle vidéo le bouton ▶ propose |
| suffixe `-short` de la clé | personne, avant aujourd'hui | rien |

`app/passions/PassionsClient.tsx` **écrit** `?format=short` à partir de `v.short`, mais
aucune page ne le relit. Le paramètre est décoratif.

Conséquence mesurée : **122 des 2 095 lignes** contredisaient le registre — 113 shorts sont
branchés sous la forme `/video/<clé>-short`, sans paramètre. `estShortVideo()` les prenait
pour des cours, et le bouton ▶ servait le short **alors que le paysage de la même micro
existait, sur 42 micros**.

Vérifié dans l'autre sens avant de corriger : **aucune** clé finissant par `-short` et
**aucune** URL portant `?format=short` n'est un paysage au registre. Élargir la détection ne
pouvait donc pas transformer un cours en short.

### Ce qui a été corrigé

1. `lib/videos/lienVideo.ts` — `estShortVideo()` lit aussi le suffixe `-short` de la clé.
   Effet mesuré : **24 micros** cessent de servir un short à la place de leur paysage.
2. `app/api/notion-videos/route.ts` — l'API renvoie maintenant un champ **`short` par ligne,
   lu au registre R2** (serveur), avec repli sur la forme de l'URL si la clé y est inconnue.
   Effet mesuré : **18 micros de plus**, soit 42 au total. Après correctif, plus aucune des
   2 095 lignes n'est mal classée.
3. Les trois consommateurs de cette API utilisent le champ : `app/coach/serie/BoutonVideoCompetence.tsx`,
   `app/coach-ia/[matiere]/page.tsx`, `components/pays/RessourcesMicro.tsx`.

Contrôlé sur un serveur `npm run dev` (port 3500), pas seulement au compilateur :
`/api/notion-videos?matiere=maths&classe=4e` renvoie bien `short: true` pour
`4e-prop-proportionnalite-short-graphique`, et sur `/coach-ia/maths?classe=4e` ce short
s'affiche dans sa petite case verticale tandis que `4e-prop-graphique` prend le bouton
« Vidéo ». Même contrôle sur `4e-prop-reconnaitre` et `4e-pythagore-verifier`.

### Le trou qui reste : 64 micros n'ont qu'un short

Un short seul n'est pas une couverture. Par classe :

| classe | micros sans paysage |
| --- | ---: |
| seconde | 30 |
| 5e | 11 |
| terminale-spe | 5 |
| 3e | 4 |
| cm1 · premiere · stmg | 3 chacune |
| 6e · premiere-spe | 2 chacune |
| cp | 1 |

La liste complète est dans `scripts/RAPPORT-COACH-SILENCIEUX.md`, section 4.
C'est un chantier de production vidéo, pas un bug.

## 5 · Les deux registres

- **Sens registre → coach : 57 clés** portent un lien `coach` mais aucune ligne de
  `notion_ressources` ne les sert. Ce sont des vidéos qui existent, qui ont une destination
  d'entraînement écrite dans le registre, et qu'aucun élève ne voit depuis le coach.
  **Les trois contrôles demandés avant toute écriture sont faits** (voir plus bas).
- **Sens coach → registre : 0.** Les 1 783 identifiants servis existent tous au registre
  déployé.

⚠️ Ce second zéro vient d'une correction de méthode. Mesuré sur la copie de travail, il
donnait **32 « clés manquantes » imaginaires** : `main` local a 452 commits de retard sur
`origin/main` et `poste2` est 38 clés derrière le registre déployé. Les mêmes URL répondaient
200 en prod. Le vérificateur lit donc `origin/main` par défaut.

## 6 · Les replis muets — mesuré deux fois, par deux chemins

**Sonde en Node** : 22 classes × 6 matières = 132 combinaisons qu'une adresse
`/coach/serie?classe=…&matiere=…` peut produire. **44** reçoivent leur propre paquet, **88**
reçoivent le catalogue d'une autre classe (`ce1/francais`, `a1/economie`, `a1/espagnol`,
`a1/ia`, `a1/english-maths`, `6e/maths`).

**Contre-mesure en partant de l'accueil, dans le navigateur, sur la production** — parce
qu'interroger une page par `?classe=` ment sur ce que l'élève voit. Trois choses en sont
sorties, dont deux corrigent mon premier rapport.

### a) Aucune de ces 88 combinaisons n'est atteignable depuis l'accueil

Depuis `/accueil`, les portes du coach sont `/coach-ia/<matiere>?classe=<classe>` — **la
matière est dans le chemin, pas en paramètre**. Le coach de français n'offre que CP → 2nd,
exactement les dix classes qui ont un paquet. Et si on force l'adresse,
`/coach-ia/francais?classe=terminale-spe` **retombe sur le CP en l'annonçant** : la page
titre « Français CP », le sélecteur dit « Ta classe : CP », l'encart dit « CP a 3e ouverts ».
Ce repli-là est étiqueté, donc honnête.

### b) Mais par une adresse `/coach/serie` écrite à la main, le repli est réel — et il MENT

Reproduit sur `www.eleveai.fr`, pas en local :

| adresse forcée | fil d'Ariane affiché | catalogue réellement servi |
| --- | --- | --- |
| `?classe=terminale-spe&matiere=francais` | **« Terminale spé > Français > Langage oral »** | celui du **CE1** (fluence, écriture cursive, « Devenir lecteur ») |
| `?classe=cp&matiere=economie` | **« Classe : cp »** | celui de l'**A1 économie** (« L'argent : payer et échanger », « Le budget ») |

L'étiquette affiche la classe demandée pendant que la liste est celle d'une autre. C'est
plus grave qu'une liste vide : rien ne permet à l'élève — ni au prof qui a partagé le lien —
de voir que ce n'est pas le bon programme.

### c) Deux corrections à mon premier rapport

- **Ce n'est pas « Chargement du tutor… sans fin ».** Mesuré :
  `POST /api/coach/start` répond **500**, et le bouton « Commencer » **ne fait rien** —
  aucune question, aucun message, aucune roue qui tourne. Le silence est donc complet, pas
  partiel.
- **La classe inconnue n'est PAS muette.** `?classe=4eme&matiere=maths` tombe bien sur la 6e,
  mais le fil d'Ariane affiche « **Classe : 6e** » : le coach annonce sa correction. Je l'avais
  classé comme le cas « entièrement muet » ; c'est faux, et c'est le seul des trois replis
  qui se comporte bien.

Relevé statique en complément (hors banques de questions, où un `default:` est une variante
de plus) : **6 `default:` qui servent un contenu** — les 5 de `lib/tutor-v4/catalog.ts` et un
inoffensif dans `coach-ia` (une couleur) — et **3 `catch` à valeur de repli**, tous les trois
légitimes (une liste vide quand le réseau tombe).

**Rien de corrigé ici, et `/coach/serie` n'a pas été touché.**

Relevé statique en complément (hors banques de questions, où un `default:` est une variante
de plus) : **6 `default:` qui servent un contenu** — les 5 de `lib/tutor-v4/catalog.ts` et un
inoffensif dans `coach-ia` (une couleur) — et **3 `catch` à valeur de repli**, tous les trois
légitimes (une liste vide quand le réseau tombe).

**Rien de corrigé ici** : refuser une combinaison inconnue au lieu de la replier change le
comportement d'anciens liens déjà distribués. C'est ta décision.

---

## ✅ Les 6 lignes de Pythagore 4e sont écrites (27/11)

Accord donné sur **6 clés nommées, pas 55** : celles qui comblent un vrai trou. Écrites avec
`--cles=` (garde de périmètre : le script s'arrête si une clé demandée n'est pas candidate),
les six gardes passées, zéro refus.

| contrôle | valeur |
| --- | --- |
| lignes de `notion_ressources`, comptées avant puis après l'écriture | 2 095 → **2 101** |
| insertions réussies | **6 / 6** |
| micros de 4e servies, **recomptées sur l'état final** | **149** |
| micros de 4e ayant un **paysage**, recomptées sur l'état final | **149** — aucune n'est couverte par un short seul |
| les 6 URL en 200 (`/api/video-lecteur` **et** `/video`), rappelées après l'écriture | **6 / 6** |

⚠️ Les deux « 149 » sont recomptés sur l'état final, pas déduits d'un delta. Je n'ai **pas**
mesuré le compte de micros de 4e avant l'écriture : il n'y a donc pas de colonne « avant »
pour ces deux lignes, et je n'en invente pas.

Les trois micros — `pythagore_defi`, `pythagore_reciproque_conclure`, `pythagore_rediger` —
reçoivent chacun son paysage **et** son short. Vérifié dans le navigateur sur
`www.eleveai.fr/coach-ia/maths?classe=4e` : les trois montrent le bouton « Vidéo » et la
petite case verticale du short.

Pour défaire : lignes `a817fed4…`, `ca83c118…`, `23940300…`, `5af0410a…`, `ea6d392d…`,
`1bca99d4…` (identifiants complets dans `scripts/REPRISE-COACH-SILENCIEUX.md`).

⏳ **Les 49 autres n'ont pas été écrites** : elles complètent des micros déjà pourvus, et
c'est à Frédéric de dire ce qui s'ajoute sous les yeux des élèves quand rien ne manque.
Après écriture, les clés orphelines passent de 57 à **51** (recompté, pas déduit).

⛔ **Deux micros de 3e restent sans aucune vidéo**, et aucune clé du registre ne les sert :
`3e / pythagore_theoreme / pythagore_rediger` et `3e / pythagore_theoreme / pythagore_defi`.
Vérifié micro par micro : la notion en a 7, cinq sont servis par les vidéos de 4e — la 3e les
réutilise, c'est délibéré — et `pythagore_solide` a les siennes. ⭐ Avant de produire :
`4e-pythagore-rediger` et `4e-pythagore-defi-cube` existent et portent les mêmes identifiants
de micro ; les rattacher à la 3e coûterait deux lignes au lieu de deux tournages. Décision de
contenu, pas d'audit.

⚠️ **Le correctif des 42 micros n'est pas en ligne.** La production ne renvoie pas encore le
champ `short` : les élèves reçoivent toujours un short à la place du cours sur ces 42 micros,
et jusqu'au déploiement. Les 6 lignes écrites aujourd'hui n'en souffrent pas, leurs shorts
portant `?format=short`.

## Les 57 clés : l'audit qui a servi à décider

Script : `scripts/brancher-cles-coach-orphelines.ts`. **Il n'écrit pas** sans `--ecrire`,
et il ne sera lancé que sur l'accord de Frédéric. Six gardes, et une clé refusée par l'une
d'elles n'est jamais insérée : anti-doublon (par identifiant du registre, pas par chaîne
d'URL), HTTP 200 sur les deux adresses, notion et micro présentes au catalogue, micro non
masquée, aucun short seul sur sa micro, et lecture sur `origin/main`.

Résultat de la simulation du 27/11 :

| contrôle demandé | résultat |
| --- | --- |
| les 57 URL répondent 200 | **57 / 57**, sur `/api/video-lecteur/<id>` ET `/video/<id>` |
| notion/micro existent au catalogue | **57 / 57** — aucune notion ni micro fantôme |
| combien de shorts | **36 shorts, 21 paysages** |
| un short deviendrait-il la seule ressource d'un micro ? | **0** — le défaut corrigé le 27/11 ne revient pas |
| **retenues après les six gardes** | **55** |
| refusées | **2**, parce qu'elles visent une micro **masquée** : `youtube-h8veBP9mtMQ` (`seconde/racine_carree_2de/racine_domaine`) et `youtube-pPQUPDx3aeA` (`seconde/geometrie_problemes_plan/geo_projete_orthogonal`) — la ligne ne s'afficherait jamais |

**Le chiffre qui compte, et il est plus petit qu'espéré : 6 lignes seulement apportent une
PREMIÈRE vidéo à leur destination, soit 3 micros** — toutes en 4e, sur Pythagore :
`pythagore_defi`, `pythagore_reciproque_conclure`, `pythagore_rediger`, chacune avec son
paysage **et** son short. Les 49 autres ajoutent une deuxième vidéo à un micro ou une notion
qui en a déjà une (presque toujours le short qui manque à côté du paysage, ou l'inverse).

Les 55 retenues, par classe :

| classe | lignes | dont shorts | ce que ça change |
| --- | ---: | ---: | --- |
| seconde | 21 | 13 | le short manquant sur 13 micros déjà pourvues, 8 vidéos de notion |
| premiere-spe | 10 | 2 | 8 vidéos de notion + 2 shorts de trigonométrie ; ⚠️ leurs titres sont des libellés techniques (« maths premiere exponentielle calculer »), à relire avant d'afficher |
| 6e | 10 | 8 | les shorts des décimaux, 2 vidéos de notion |
| 4e | 8 | 5 | **les 6 lignes de Pythagore qui comblent un vrai trou**, + 2 shorts de défi |
| 5e | 5 | 5 | les shorts des fractions |
| 3e | 1 | 1 | le short « Pense à un nombre » sur `affine_defi` |

La liste exacte, clé par clé, sort de la simulation :

```powershell
npx tsx scripts/brancher-cles-coach-orphelines.ts
```

⚠️ Un point à trancher avant d'écrire : les **10 clés de première spé** ont pour titre leur
propre identifiant (« maths premiere second degre signe »). Ce titre s'affiche à l'élève dans
le modal. Il faudrait les renommer au registre avant de les brancher — et le registre n'est
pas mon territoire.

## Ce qui attend encore une décision

1. **Les 3 lignes mal rangées** (`exponentielle_etude`, et `masse_mesurer` × 2) — question de
   contenu, portée à Frédéric.
2. ✅ **Les 22 lignes de micros masquées : gardées.** Décidé le 27/11. Le vérificateur les
   classe à part et ne les signale plus comme un reste à traiter.
3. **Les 55 lignes retenues** : feu vert pour `--ecrire` ? (et faut-il d'abord renommer les
   10 titres de première spé au registre ?)
4. **Les 88 combinaisons** : le chiffre est confirmé par le chemin de l'élève — aucune n'est
   atteignable depuis l'accueil, mais par une adresse écrite à la main le fil d'Ariane
   affiche la classe demandée pendant que le catalogue est celui d'une autre. Veux-tu que
   `/coach/serie` refuse visiblement une combinaison inconnue ?

## Une observation à reproduire

Sur le serveur de dev local (port 3500, config `eleveai-5`), `/coach/serie` reste sur
« Chargement du coach… » et n'affiche jamais le coach — alors que `/coach-ia` rend
normalement sur le même serveur, et que la prod affiche bien le coach. Cause non établie.
Ce n'est pas imputable aux modifications de cette session : la frontière `Suspense` qui
bloque est au-dessus de tous les fichiers touchés. **À reproduire avant d'en conclure quoi
que ce soit.**
