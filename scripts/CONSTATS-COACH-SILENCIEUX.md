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
Ce n'est pas une faute, c'est une conséquence du masquage. À garder ou à nettoyer.

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
  `notion_ressources` ne les sert. 23 visent la seconde, 10 la 6e, 10 la première spé,
  8 la 4e, 5 la 5e, 1 la 3e. Ce sont des vidéos qui existent, qui ont une destination
  d'entraînement écrite dans le registre, et qu'aucun élève ne voit depuis le coach.
- **Sens coach → registre : 0.** Les 1 783 identifiants servis existent tous au registre
  déployé.

⚠️ Ce second zéro vient d'une correction de méthode. Mesuré sur la copie de travail, il
donnait **32 « clés manquantes » imaginaires** : `main` local a 452 commits de retard sur
`origin/main` et `poste2` est 38 clés derrière le registre déployé. Les mêmes URL répondaient
200 en prod. Le vérificateur lit donc `origin/main` par défaut.

## 6 · Les replis muets

**Mesuré, pas lu** : 22 classes × 6 matières = 132 combinaisons qu'une adresse
`/coach/serie?classe=…&matiere=…` peut produire (une valeur inconnue est déjà ramenée à `6e`
/ `maths` par `normalizeClasse`/`normalizeMatiere`).

- **44** reçoivent leur propre paquet.
- **88** reçoivent **le catalogue d'une autre classe, sans un mot** — `ce1/francais` pour
  toutes les classes de français non branchées, `a1/economie`, `a1/espagnol`, `a1/ia`,
  `a1/english-maths`, `6e/maths`.
- Les 88 finissent toutes par un échec de l'API (`loadKnowledgeV4` lève, lui). L'élève voit
  donc une **liste de notions qui n'est pas la sienne**, puis « Chargement du tutor… » sans
  fin. Aucune ne sert du contenu faux *qui marche* : c'est la seule bonne nouvelle.

Un cas n'est pas dans ces 88 et reste **entièrement muet** : une classe inconnue
(`?classe=4eme`, `?classe=quatrieme`) devient `6e` et le coach fonctionne — avec le programme
de 6e. Rien ne le signale.

Relevé statique en complément (hors banques de questions, où un `default:` est une variante
de plus) : **6 `default:` qui servent un contenu** — les 5 de `lib/tutor-v4/catalog.ts` et un
inoffensif dans `coach-ia` (une couleur) — et **3 `catch` à valeur de repli**, tous les trois
légitimes (une liste vide quand le réseau tombe).

**Rien de corrigé ici** : refuser une combinaison inconnue au lieu de la replier change le
comportement d'anciens liens déjà distribués. C'est ta décision.

---

## Ce qui attend une décision

1. **Les 3 lignes mal rangées** (`exponentielle_etude`, et `masse_mesurer` × 2). Correction =
   un `UPDATE` sur `notion_ressources`. Dis-moi la bonne micro pour les deux vidéos de masse
   CM1 et je prépare l'écriture, avec garde anti-doublon.
2. **Les 22 lignes de micros masquées** : on les garde (la micro peut être démasquée un jour)
   ou on les retire ?
3. **Les 57 clés R2 avec lien coach mais sans ligne de coach** : ce sont des vidéos prêtes et
   invisibles dans le coach. Faut-il les brancher ? C'est le plus gros gain pour l'élève de
   tout ce rapport.
4. **Les 88 combinaisons repliées** : veux-tu que `/coach/serie` refuse visiblement une
   combinaison inconnue au lieu de montrer le catalogue d'une autre classe ?

## Une observation à reproduire

Sur le serveur de dev local (port 3500, config `eleveai-5`), `/coach/serie` reste sur
« Chargement du coach… » et n'affiche jamais le coach — alors que `/coach-ia` rend
normalement sur le même serveur, et que la prod affiche bien le coach. Cause non établie.
Ce n'est pas imputable aux modifications de cette session : la frontière `Suspense` qui
bloque est au-dessus de tous les fichiers touchés. **À reproduire avant d'en conclure quoi
que ce soit.**
