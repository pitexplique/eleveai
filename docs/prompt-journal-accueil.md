# Le journal revient — prompt de chantier

> Écrit à deux le 30/08/2026, en fin de journée. Frédéric : « ça me manque de
> pas pouvoir regarder mon journal avec les simulations de l'aiguille de la
> médaille Fields ». Puis : « on va pas retrouver ce commit, on va créer la
> page ».

---

## 1. La décision, et pourquoi elle est simple

⭐⭐ **`/` REDEVIENT LE JOURNAL. `/accueil` GARDE LA MATRICE IA.** Deux versions,
deux routes, deux familles de requêtes.

**Ce qui rend la chose facile, vérifié le 30/08** : `app/page.tsx` ne contient
**qu'une redirection** vers `/accueil`. La racine est libre — elle ne porte aucun
contenu à déplacer.
⚠️ Une seule chose à préserver : la redirection **transmet les UTM** (les liens
de campagne YouTube arrivaient sur `/` et perdaient leurs paramètres). Une vraie
page à la racine n'a plus ce problème, mais il faut le savoir avant de croire
qu'on peut supprimer le fichier sans réfléchir.

⛔ **PAS D'ÉCRAN DE CHOIX ENTRE LES DEUX VERSIONS.** L'idée a été posée puis
écartée le soir même : elle ajouterait une **cinquième question** à un accueil
qui en pose déjà quatre (qui es-tu, ta classe parmi treize, ta matière, ta
question). Or c'est précisément ce qui gêne. Le journal montre quelque chose
tout de suite ; qui veut l'outil clique une fois.

## 2. Ce qui n'est PAS perdu — l'inventaire

⭐ **Le contenu du journal existe toujours.** Ce qui a disparu le 14/08
(`49d9f406`), c'est **la vitrine**, pas les objets. Onze routes sont intactes :

```
/aiguille-de-kakeya        ⭐ la médaille Fields, Hong Wang
/simulateur-volcan         /simulateur-cyclone      /simulateur-lagon
/simulateur-barrage        /simulateur-energie      /simulateur-epsilon
/simulateur-fromage        /simulateur-hotel        /simulateur-sucre
/simulateurs               le hub : « Les machines dans ta main »
```

Plus les 481 pages de notion, les fiches, le coach, les rituels du jour.

**Écrire le journal, ce n'est donc pas ressusciter dix pages : c'est écrire une
Une qui pointe vers ce qui existe déjà.**

⚠️ L'ancien code reste consultable si besoin — `git show 49d9f406^:app/accueil/AccueilClient.tsx`
(3 439 lignes) et les huit composants de `components/accueil/`. ⛔ Mais la
décision est de **ne pas le restaurer** : seize jours d'écart, et il lisait des
tables Supabase (`journal_une`, `journal_articles`, `catalogue_actions`) dont
l'état n'est pas vérifié.

## 3. Ce que le journal doit tenir

⭐⭐ **LE PRINCIPE FONDATEUR S'APPLIQUE ICI AUSSI** (voir la mémoire du même
jour) : *est-ce qu'un prof peut le projeter en classe, et est-ce que ça éveille
l'intérêt de l'élève ?* Un journal se projette très bien — c'est même son format
naturel : une Une, une image, un titre.

⭐ **L'identité SEO est déjà écrite, et c'est la sienne** — commit `dc32d246`,
22/07 : « **le journal scientifique de La Réunion où les enfants apprennent** ».
C'est une requête que la page IA ne gagnera jamais. Frédéric : « on avait même
été devant le CNRS » sur cette requête.

⛔ **Ce qu'on ne copie pas** : mascotte, badges, « +50k élèves actifs »,
« Réussis ta 6e ». C'est le costume d'un site de révision (cf. Allo6ème). La
sobriété d'EleveAI correspond à ce qu'il vend — un outil sérieux, testé en
classe. Voir la mémoire sur le principe fondateur.

⭐⭐ **ET LE VISUEL ÉTAIT CELUI D'UN ANCIEN JOURNAL** — Frédéric, 30/08. Ce n'est
pas un détail de gout : c'est **le différenciateur visuel le plus fort du site**.
Tous les concurrents se ressemblent — bleu arrondi, mascotte, dégradés, badges.
Un vrai journal à l'ancienne ne ressemble à aucun d'eux, et il porte exactement
ce qu'EleveAI vend : du sérieux, de la lecture, quelque chose qu'on projette.

Ce que ce parti pris implique, et qu'il faudra tenir jusqu'au bout :
- une **manchette** (le titre du journal, la date, l'édition) ;
- des **colonnes** et des **filets** — la mise en page fait le travail, pas les
  couleurs ;
- une **typographie à empattements** pour les titres ;
- du **noir sur blanc**, la couleur en accent seulement.
⭐ Bénéfice inattendu : c'est aussi ce qui **s'imprime le mieux en noir et
blanc** — l'autre demande de Frédéric le même jour (« les profs n'ont pas
d'imprimante couleur »).
⚠️ Piège du genre : un journal à l'ancienne appelle des colonnes serrées et du
petit corps. ⛔ Or la page doit rester **projetable** et lisible par un enfant.
Le costume est vintage, la lisibilité ne l'est pas.

---

## 4. ⛔ CE QUE SEUL FRÉDÉRIC PEUT RÉPONDRE

*À remplir à deux. Rien ne s'écrit avant.*

**a. La Une — qu'est-ce qu'on y met en premier ?**
L'aiguille de Kakeya est le candidat évident (c'est ce qui lui manque). Mais la
Une change-t-elle ? Chaque jour, chaque semaine, à la main ?
→ …

**b. Les rubriques — lesquelles, et dans quel ordre ?**
L'ancien journal avait : la Une (carrousel), le fil, l'édito du jour, le chiffre
du jour, le mot du jour, « Un peu de maths », l'agenda, la reco du jour.
Lesquelles reviennent ? Lesquelles étaient de trop ?
→ …

**c. Le rythme — qu'est-ce qui doit changer tout seul ?**
Le signal « ça change chaque jour » était porté par une pastille rouge sur ce
qui datait du jour même (heure Réunion). Le veut-on d'emblée, ou une Une fixe
suffit-elle pour commencer ?
→ …

**d. Supabase ou en dur ?**
L'ancien journal avait une **régie** (`/admin/journal`) pour piloter la Une sans
toucher au code. On repart en dur (rapide, figé) ou on rebranche la régie
(plus long, mais il édite lui-même) ?
→ …

**e. À qui la page parle-t-elle en premier ?**
⚠️ Question posée le 30/08 et non tranchée : sur `/accueil`, « Élève » est
présélectionné et « Enseignant » arrive troisième — alors que l'avantage
d'EleveAI parle au prof. Le journal doit-il corriger ce déséquilibre, ou
s'adresser à tout le monde ?
→ …

---

## 5. ⚠️ À ne pas oublier en chemin

- **« TESTÉE EN CLASSE »** est le différenciateur le plus fort du site, et il est
  aujourd'hui *sous la ligne de flottaison* de `/accueil`. Le journal est
  l'occasion de le remonter.
- **Le rebond de 62 %** est un chiffre réel, mais **rien ne prouve encore qu'il
  vienne des quatre questions** — hypothèse posée le 30/08 et non vérifiée. Ne
  pas la présenter comme une cause établie.
- **Le rendez-vous d'indexation du 26/09** : deux routes aux titres distincts ne
  se cannibalisent pas, mais il faut que les `<title>` et les descriptions
  soient franchement différents.
