# Prompt — les fiches de français du collège (et ce qui reste)

> Écrit le 26/08/2026, au terme de la session qui a fiché la 4e entière.
> Mis à jour le 29/08/2026 : **la 4e, la 5e ET la 6e sont entières.**
> À coller tel quel dans une session neuve.

---

## ⭐⭐ ÉTAT AU 29/08/2026 — LIS CECI D'ABORD

```
francais 4e     19 notions   19 fichées   100 %   ⭐ FERMÉE
francais 5e     28 notions   28 fichées   100 %   ⭐ FERMÉE
francais 6e     29 notions   29 fichées   100 %   ⭐ FERMÉE
francais cm2    27 notions   25 fichées    93 %   ← 2 EN ARBITRAGE, VOIR CI-DESSOUS
francais cm1    25 notions    9 fichées    36 %   ← LE CHANTIER EN COURS (31/08)
francais 3e     19 notions    0 fichées     0 %
francais 2de    16 notions    0 fichées     0 %
```

**Le collège de cycle 4 haut (3e) et le lycée n'ont rien ; le cycle 3 est à
moitié fait.** Le CM2 est la suite naturelle, et pour une raison technique :

---

## ⭐⭐ L'ÉTALON DU CYCLE 3 — décidé le 31/08, il commande tout le reste

Frédéric, le 31/08 : « on utilise le même étalon que pour cm1 et cm2 et 6e »,
« il faut privilégier la qualité pas la vitesse — une fois les fiches faites
elles sont là pour 3 4 ans ».

```
6 propriétés · 3 méthodes · 4 exemples · 5 pièges · 5 à retenir · 5 entrainements
usages VIDÉS · aucune formule · AUCUNE capitale d'emphase
aucune légende de figure · tout texte projeté SOUS 250 SIGNES
définition en phrases courtes séparées par 


```

⭐ **Et la découverte doit être DANS LA DÉFINITION**, pas seulement dans
l'accroche. L'accroche attire ; la définition est ce qu'on recopie dans le cahier.

⭐⭐ **La raison profonde de l'étalon est le MODE CLASSE, pas la page** :
`slidesDepuisFiche` fabrique le diaporama DEPUIS la fiche. Dix propriétés et six
exemples donnent trente diapos dont plusieurs débordent de l'écran. Le gabarit
est donc ce qui rend la fiche **projetable**.

⭐ **Le vérificateur applique tout ça** — c'est lui qui tient, pas ma mémoire :

```bash
node scripts/mesurer-etalon-cycle3.mjs cm1 --details
```

## ⭐ ÉTAT DU CM1 AU 31/08 — 9 sur 25, toutes conformes

**Faites** : fluence-lecture · lecture-voix-haute · comprehension-textes ·
comprehension-documents · lecture-oeuvres · culture-personnages ·
culture-soi-et-les-autres · culture-lecteur · ecriture-preparer.
La **lecture** et la **culture** sont closes.

**Restent 16** : écriture ×2 (produire, reviser) · oral ×2 · vocabulaire ×3
(sens, relations, emploi) · grammaire ×6 (types_phrases, phrase, complements,
classes_mots, groupe_nominal, accords) · conjugaison ×3.

⚠️ **Les PDF se génèrent À LA FIN de la classe**, quand les 25 fiches sont
stables — les produire avant, c'est refaire le travail à chaque correction.

⛔⛔ **LE PIÈGE N° 1 DU CM1, ET IL EST INÉDIT : 21 de ses 25 notions portent un
nom déjà pris par le CM2**, qui est entièrement fiché. Chaque fiche demande un
tableau de séparation à **trois colonnes** (CM1 / CM2 / 6e). Une fiche de CM1 qui
répète celle du CM2 ne vaut rien.
⭐ **Où trouver la ligne de partage quand les micros se ressemblent** : dans le
POOL, et souvent dans ses MAUVAISES RÉPONSES. Pour `culture_lecteur`, les quatre
leurres — résumé complet, liste des personnages, titre-auteur-date, poème
recopié — sont quatre façons de *prouver qu'on a lu*, et c'est ça qui a donné le
fil de la fiche.

⚠️ **Toujours relire les identifiants de micros dans `microSkills.ts`**, jamais
les déduire du libellé. J'ai écrit `cm1_ecrit_retenir` au lieu de
`cm1_ecrit_notes` : rien ne le signale — ni typecheck, ni rendu, ni vérificateur.
Ça rompt en silence le lien entre la fiche et le coach.

## ⛔⛔ CE QUI RESTE AU CM2 — UN ARBITRAGE, PAS DEUX FICHES À ÉCRIRE

Au 30/08, **25 des 27 notions ont leur propre fiche**. Lecture, culture,
écriture, oral, vocabulaire et les deux notions de grammaire écrites ce jour-là
sont closes. Les deux restantes ne s'écrivent pas sans une décision :

```
grammaire_accords          5 micros   ⟍
                                       ⟩→ REDIRIGENT toutes deux vers
grammaire_groupe_nominal   5 micros   ⟋   francais/cm2/grammaire-orthographe
```

⛔ **Une seule fiche d'avant le chantier sert les deux notions** — 690 lignes,
titrée « Analyser une phrase : nature, fonction, accords », atteinte par deux
redirections déclarées dans `registre.ts` (~l. 1108). Cela contredit la règle
« une notion = un objet cohérent », et depuis le 30/08 **son titre chevauche en
plus `francais-cm2-grammaire-nature-fonction`**, qui traite la même distinction
au format actuel.

⚠️ **La découper n'est pas un travail d'écriture** : il faut décider ce que
devient l'URL `francais/cm2/grammaire-orthographe`, qui a des PDF et compte dans
les 481 pages soumises à l'indexation (échéance du 26/09). Ne rien faire sans
Frédéric. La proposition à lui soumettre : deux fiches neuves
(`grammaire-accords`, `grammaire-groupe-nominal`), et l'ancienne URL redirigée
vers l'une des deux plutôt que supprimée.

## ⭐⭐ LA SIGNATURE DU CM2, REPÉRÉE EN ÉCRIVANT L'ÉCRITURE

**Le CM2 est la classe où l'on apprend à FAIRE COURT, et où la brièveté est un
TEST plutôt qu'un style.** Cinq notions déjà fichées le répètent, chaque fois
avec la même mécanique — *celui qui n'a pas compris ne peut pas faire court* :

| Notion | La mesure |
|---|---|
| `comprehension_textes` | restituer l'essentiel **en peu de mots** |
| `lecture_oeuvres` | le thème **tient en un mot** |
| `culture_lecteur` | **trois lignes** par livre au carnet |
| `ecriture_preparer` | l'écrit de préparation est **plus court** que ce qu'il prépare |
| `ecriture_reviser` | *(l'inverse, et c'est le même geste)* un brouillon **sans ratures** n'a rien fait |

⭐ **À réutiliser** : chercher, dans chaque pool, la ligne qui donne une mesure
visible sans juger de rien. C'est ce qui a donné les meilleures accroches du CM2,
et c'est reproductible. Les fiches du 30/08 l'ont confirmé six fois de plus —
« plus court que ce qu'il prépare », « un brouillon sans ratures », « fais le
dessin, est-il faux ? », « coupe : ça veut dire quelque chose ? », « cache le
reste de la phrase », « devant le verbe ? c'est un pronom ».

## ⭐⭐ LA SECONDE SIGNATURE DU CM2 : LA PHRASE DÉCIDE

Repérée le 30/08 en écrivant la langue, et elle traverse quatre notions :

| Notion | Ce que la phrase décide |
|---|---|
| `vocabulaire_sens` | le dictionnaire donne des sens, **la phrase en choisit un** |
| `vocabulaire_formation` | sauf pour les **homonymes**, où couper le mot ne sert à rien : retour à la phrase |
| `vocabulaire_emploi` | le sens ne suffit pas, **la place** compte aussi (adjectif-nom, adverbe-verbe) |
| `grammaire_nature_fonction` | le dictionnaire donne la nature, **la phrase donne la fonction** |
| `grammaire_pronoms` | l'**exception** qui rend la règle visible : le seul mot où la fonction se voit sur le mot |

⭐ Les deux dernières se lisent **dans cet ordre** : la fiche des pronoms éclaire
celle de la nature et de la fonction.

⭐⭐ **LE CM2 PARTAGE LE PROGRAMME ET LES BANQUES DE LA 6e.** Même BO (cycle 3,
n° 16 du 17 avril 2025), même générateur `buildCycle3FrancaisBank.ts`, mêmes
pools. Les treize fiches de 6e écrites les 28 et 29/08 ont épuisé ces pools un
par un — `OEUVRE`, `DOCUMENTS`, `IMAGE`, `REPRISES`, `LIENS_LOGIQUES`,
`ORIGINES`, `AVENTURE`, `MONSTRES`, `POESIE`, `THEATRE`, `ECRIRE_MAIN`,
`ECRIT_RESUMER`, `ECRIT_COHERENCE`, `ECRIT_REVISER`, `ORAL`. Une session qui
attaque le CM2 relit donc surtout des choses déjà lues : le travail est un
RENIVELLEMENT, pas une découverte.

⭐ **~~LE CM1 GARDE UNE NOTION FOURRE-TOUT~~ — PLUS VRAI, vérifié le 30/08.** Le
CM1 déclare aujourd'hui `comprehension_textes` ET `comprehension_documents`,
comme le CM2 et la 6e : `grep -rn 'id: "comprehension_textes_documents"'
lib/tutor-v4/knowledge/` ne renvoie plus rien. Le pile ou face de
`questionForNotion` était donc une **branche morte**, dont le commentaire
affirmait le contraire du code ; elle a été retirée le 30/08.

⭐ **ET LA CLASSE EST MESURÉE PRÊTE** (30/08) : `105/105` micros ouvrent leur
ligne, médiane de **16 énoncés générés** par micro (minimum 12), 18 900 tirages
sans anomalie. Rien à réparer avant d'écrire.

⛔⛔ **EN REVANCHE, LA VRAIE DIFFICULTÉ DU CM1 EST AILLEURS, ET ELLE EST INÉDITE :
21 DE SES 25 NOTIONS PORTENT UN NOM DÉJÀ PRIS PAR LE CM2.** Quatre seulement lui
sont propres — `grammaire_types_phrases`, `grammaire_classes_mots`,
`vocabulaire_relations`, `conjugaison_passe_compose`. Chaque fiche de CM1 demande
donc un tableau de séparation **à TROIS colonnes** (CM1 / CM2 / 6e), là où le CM2
n'en demandait que deux. Une fiche de CM1 qui répète celle du CM2 ne vaut rien :
c'est le point de vigilance n° 1 de ce chantier.

### ⛔⛔ LE PIÈGE DE CLASSE, MESURÉ SEPT FOIS SUR SEPT

Sept notions de 6e portent un nom qui existe AUSSI en 5e ou en 4e, avec un
contenu entièrement différent. Chaque fiche de 6e porte en tête le TABLEAU DE
SÉPARATION correspondant — le lire avant d'écrire la sœur d'une notion déjà
fichée. Les cas :

| notion | 5e ou 4e (cycle 4) | 6e (cycle 3) |
|---|---|---|
| `lecture_voix_haute` | la PARTITION : groupes de souffle, diagnostic | l'INDICE : ce qui, dans le texte, commande le ton |
| `culture_connaissances` / `culture_reperes` | genre à l'OUVERTURE, quatre PÉRIODES | genre à une MARQUE, le CADRE (où et quand) |
| `ecriture_reflechir` / `ecriture_apprendre` | planifier, idée principale d'un message | RÉSUMER, hiérarchiser, justifier |
| `ecriture_produire` | ce qui MANQUE : lieu, obstacle, ordre, fin | ce qui CHANGE en route : cohérence |
| `ecriture_reviser` | dans quel ORDRE relire | POURQUOI relire seul échoue |
| `oral_ecouter` | ranger en thèse/argument/exemple | le BUT qui oriente l'écoute |
| `comprehension_documents` (4e) | informer, s'informer, déformer | nature, source, décrire avant d'interpréter |

⭐ **ET DEUX NOTIONS DE 6e N'EXISTENT DANS AUCUNE AUTRE CLASSE** : `fluence_lecture`
et `ecriture_main`. Toutes deux propres au cycle 3, que le cycle 4 suppose
acquis. ⚠️ **Chercher les autres avant d'attaquer le CM1 et le CM2** : une notion
sans écho au cycle 4 ne croise jamais le chemin de personne quand on fiche du
haut vers le bas.

### ⭐ CHAQUE NOTION DE CYCLE 3 A UNE MICRO « DÉFI », le cycle 4 n'en a pas

Elle vaut un bloc de plus dans la fiche, et c'est le moment où l'élève fait seul.

---

## Ta mission

Écrire les fiches de cours de français qui manquent en **5e** et en **6e**, au
standard des seize fiches de 4e écrites le 26/08/2026.

**État mesuré ce jour-là** (`npx --yes tsx@4 scripts/couverture-fiches.ts`) :

| classe | notions | fichées | reste | dont hors étude de la langue |
|---|---|---|---|---|
| **4e** | 19 | **19** | 0 | — |
| 6e | 29 | 9 | **20** | 16 |
| 5e | 28 | 8 | **20** | 12 |

⛔ **Le trou n'est pas seulement du côté lecture.** La 5e manque aussi huit
fiches de LANGUE : tout le vocabulaire, les registres, la conjugaison des formes
et des valeurs. Liste exacte : `npx --yes tsx@4 scripts/couverture-fiches.ts --manquantes`.

### ⭐ Avancement au soir du 26/08/2026 : le domaine lexical de la 5e est ENTIER

Cinq fiches écrites dans la foulée de cette passation, une par objectif du BO :

| notion | ce qu'elle porte |
|---|---|
| `vocabulaire_enrichir` | contexte, dictionnaire, réemploi |
| `vocabulaire_relations` | synonymes, familles, préfixes et suffixes |
| `vocabulaire_jouer` | sens propre et figuré, les quatre portes d'un mot neuf |
| `vocabulaire_formation` | fabriquer un mot, éléments grecs et latins |
| `vocabulaire_orthographe` | lettres muettes et homophones |

Puis `discours_registres`, et **LE DOMAINE DE L'ORAL EN ENTIER** —
`lecture_voix_haute`, `oral_dire_jouer`, `oral_ecouter`, `oral_prendre_parole`.

**La 5e est à 23 notions fichées sur 28.** Ses domaines ENTIERS : le lexique (5),
l'oral (3), la conjugaison (3), la lecture (4). **Reste CINQ notions, et deux
domaines seulement** : `culture_connaissances`, `culture_entrees_5e`,
`ecriture_reflechir`, `ecriture_produire`, `ecriture_reviser`.

### ⭐ La 6e est ouverte : lexique ET étude de la langue entiers — 14 notions sur 29

⛔ **PREMIER RÉFLEXE, ET IL NE DONNE RIEN ICI : chercher les alias.** Sur la 4e
ils ont fait passer le compteur de 16 à 19 sans écrire une ligne, et le CM2 de 7
à 9. En 6e, comparaison faite micro par micro : chacune des neuf fiches
existantes couvre exactement les micros de sa propre notion. **Les manquantes le
sont vraiment.** Le contrôle vaut la peine d'être refait sur toute classe neuve.

⚠️ **Les neuf premières fiches de 6e étaient toutes de l'étude de la langue.**
Rien sur la lecture, la culture, l'écriture, l'oral, le lexique — c'est là qu'est
tout le travail.

⛔⛔ **ET LE PIÈGE DE CLASSE SE TOUCHE DU DOIGT EN 6e.** `vocabulaire_enrichir`
et `vocabulaire_relations` existent en 5e ET en 6e, **sous le même nom**, avec
des contenus différents :

| | 5e (BO 2026, cycle 4) | 6e (BO 2025, cycle 3) |
|---|---|---|
| `vocabulaire_enrichir` | contexte · dictionnaire · réemploi | contexte · **choisir sa stratégie** · **sens figuré** · défi |
| `vocabulaire_relations` | vérifier un synonyme en récrivant · sens des affixes | antonyme **de la même classe** · simple/dérivé/**composé** · racines |

Le mot COMPOSÉ n'est pas au programme de 5e. Le dictionnaire n'est pas au
programme de 6e — il n'y est que la troisième stratégie. **Copier une fiche de 5e
produit un hors-programme parfaitement crédible, que rien ne signalera.**

⭐ **LE CYCLE 3 A UNE MICRO « DÉFI » PAR NOTION**, que le cycle 4 n'a pas. REGLES
dit que le défi a son propre dessin : chaque fiche de 6e porte donc un bloc de
plus, et c'est le moment où l'élève choisit seul.

⭐ **Le coach de 6e a la matière pour les dix-sept restantes** :
`questionBank/6e/francais/fixed.bank.ts` (79 Ko, 145 items, ≥ 5 par notion,
réécrits le 22/08 objectif par objectif contre le BO du cycle 3) plus le
générateur `buildCycle3FrancaisBank`. On écrit depuis les items fixes.

Reste en 6e : lecture ×5, écriture ×4, culture ×3, oral ×3 — **tout est hors langue**.

⭐⭐ **ET UNE NOTION QUI N'EXISTAIT NULLE PART : LA FLUENCE.** Aucune classe, du
CP à la seconde, n'avait de fiche de fluidité de lecture — parce qu'elle
n'existe qu'au CYCLE 3 et que les fiches de français se sont écrites de la 4e
vers le bas. Une notion sans écho au cycle 4 n'a jamais croisé le chemin de
personne. ⚠️ Chercher les autres notions dans ce cas avant d'attaquer le CM1 et
le CM2.

⭐ Sa découverte : **les groupes de SOUFFLE de la partition et les groupes de
SENS de la fluence sont les mêmes groupes**. Le découpage inventé pour la voix en
4e explique la vitesse de lecture, y compris silencieuse.

### ⭐⭐ LE CROCHET DU CANVAS `phrase` A CINQ SENS — la découverte la plus rentable

C'est ce qui a permis de ficher la voix et l'oral, que personne n'avait fichés :

| ce que le crochet marque | où il a servi |
|---|---|
| une FONCTION grammaticale | toutes les fiches de langue |
| une RESPIRATION (groupe de souffle) | la partition, 4e et 5e |
| un DÉFAUT à nommer | « lu d'un trait » enjambant deux points |
| LE CORPS sous la réplique | « il recule » sous « je n'ai peur de rien ! » |
| CE QUE L'AUDITEUR DOIT FAIRE | « je sais », « j'adhère », « je fais » |

Et **le crochet ABSENT est un diagnostic** : sur « il est courageux, voilà », un
seul crochet au lieu de trois montre ce qui manque sans qu'on l'explique.

⭐ **`tableau_donnees` est entré en français** (la grille de prise de notes). La
matière n'avait que `phrase` et `conjugaison`. ⚠️ Cellules très courtes : à la
largeur d'un bloc, vingt signes tombent sous le plancher de 11 px.

### ⛔⛔ LA RÈGLE DE COULEUR, ET LE DÉFAUT QU'ELLE A ATTRAPÉ

**Un crochet qui n'est pas une fonction DOIT RESTER GRIS.** `couleurFonction`
déduit la couleur du `label` — et une étiquette « le sujet », posée sur le THÈME
d'un exposé, est sortie en BLEU : le test est `includes("sujet")`. L'élève lisait
la couleur de la fonction grammaticale sur un crochet qui n'en était pas une.

⛔ Invisible dans le code, invisible au typecheck, invisible au vérificateur de
dessins — **seul le rendu le montre.** Le contrôle à passer sur chaque fiche qui
détourne le crochet, dans la console, page ouverte en 375 px :

```js
document.querySelectorAll('svg text').forEach(t => {
  // toute étiquette de groupe non grammaticale doit valoir rgb(71, 85, 105)
  console.log(t.textContent.trim(), getComputedStyle(t).fill);
});
```

Renommer suffit : « le thème » ne tombe dans aucun test. ⚠️ Les mots piégés sont
ceux des tests de `couleurFonction` : sujet, verbe, objet, cod, coi,
circonstanciel, attribut, nom, épithète, expansion, proposition, coordination…

⛔ **AVANT D'ÉCRIRE UNE FICHE DE LEXIQUE, LIRE L'EN-TÊTE DES DEUX BANQUES.**
Elles se partagent le domaine explicitement, et ne pas le lire fait écrire quatre
fois la même fiche : `relations` = le SENS d'un affixe ; `formation` = le GESTE
DE PRODUCTION et l'origine ; `orthographe` = ce que la dérivation impose à
l'écriture ; `jouer` = choisir le sens qui va avec la phrase.

⛔ **ET LA RÈGLE QUI SÉPARE LA 5e DE LA 4e SUR LES MÊMES OBJETS : la 5e ne NOMME
pas, elle FAIT.** La 4e demande « quelle relation lie ces mots ? » ou
« polysémie ou homonymie ? » — des questions d'étiquette. Le BO de 2026 demande à
la 5e l'OPÉRATION : remplacer le mot et relire la phrase entière, choisir le sens
qui la laisse debout. Les banques de 5e sont bâties là-dessus — table REMPLACER,
table VARIATIONS rangée par paires. Une fiche de 5e qui fait classer au lieu de
faire manipuler est hors programme, même si son contenu est juste.

⭐ **Trois découvertes de dessin, toutes avec des canvas qui existaient déjà :**

- **Un ARTICLE DE DICTIONNAIRE se dessine avec `phrase`** — c'est une suite de
  morceaux étiquetés (le mot, sa classe, son sens, son exemple), donc un `groupe`
  d'un seul mot par morceau.
- **La LETTRE MUETTE se voit dans les wagons** : elle est dans le radical, et le
  suffixe la réveille au joint des deux wagons — « tapis » + « ser ».
- **La bande `nature` peut dire ce que le mot FAIT** (« la qualité », « la
  personne », « l'action ») plutôt que sa classe : trois mots d'une même famille
  cessent alors d'être trois mots qui se ressemblent.

---

## ⚠️⚠️ TROIS PROGRAMMES DIFFÉRENTS — NE JAMAIS TRANSPOSER

C'est l'erreur qui coute le plus cher, et deux sessions l'ont failli faire.

| classe | référence | jusqu'à |
|---|---|---|
| **6e** | BO n° 16 du 17 avril 2025 — elle **ferme le cycle 3**, comme le CM1 et le CM2 | — |
| **5e** | BO n° 10 du 5 mars 2026 (arrêté du 18 février 2026), rubriques « Cinquième » | — |
| 4e | arrêté du 9 novembre 2015, consolidé au BO n° 31 du 30 juillet 2020 | sept. 2027 |

**Conséquences concrètes :**

- ⛔ Le **conditionnel est un MODE** en 4e, un **temps de l'indicatif** en 5e. Les
  deux fiches disent l'inverse et ont raison chacune pour sa classe.
- ⛔ La 6e ne suit **pas** le programme de cycle 4. Ne jamais lui appliquer une
  logique de 5e.
- ⛔ Les entrées littéraires diffèrent entièrement d'une classe à l'autre.

**Avant d'écrire une fiche, lis l'en-tête de la banque de la notion dans
`lib/tutor-v4/questionBank/<classe>/francais/` : la référence exacte y est
écrite en gras.**

---

## Le modèle : les seize fiches de 4e

Ouvre-en deux avant de commencer. Les plus instructives :

- `lib/fiches/francais-4e-phrase-complexe.tsx` — la structure de base.
- `lib/fiches/francais-4e-lecture-comprehension.tsx` — comment dessiner une
  notion « indessinable ».
- `lib/fiches/francais-4e-lecture-documents.tsx` — comment dessiner une image
  qu'on n'a pas.

Chaque fiche = **deux fichiers** :

```
lib/fiches/francais-<classe>-<notion>.tsx      la donnée
app/fiches-cours/francais/<classe>/<notion>/page.tsx   la page (métadonnées SEO)
```

Puis, **à la toute fin seulement**, `lib/fiches/registre.ts` et `app/sitemap.ts`.

---

## Ce que le SEO exige, et qui a été mesuré

- Le `titre` **porte l'année scolaire** : « … en 5e (2026-2027) ». La requête
  tapée est « programme 5e 2026 2027 », pas « fiche de grammaire ». Le titre
  remonte dans le H1 **et** dans tous les H2 de la page.
- ⚠️ Le titre **nomme aussi le PDF** : le changer rend l'ancien orphelin, et
  `npm run verifier:pdf` le signale.
- La `description` de la page **contient le mot « français »**. Mesuré le
  26/08 : il n'était dans **aucun** des 94 titres du site et dans dix
  descriptions. Modèle : « Programme de français 5e 2026-2027 : … ».
- Le composant ajoute lui-même « — cours de français 5e » au H1. Ne pas le
  répéter.

---

## ⛔ Les huit pièges de fabrication, tous payés le 26/08

Aucun n'est deviné : chacun a couté une passe de correction.

1. **`role` n'existe pas sur un mot.** La couleur vient du `label` du GROUPE.
   Un mot par entrée, ponctuation comprise, et `focus: true` pour désigner.
2. **⛔⛔ AUCUN `titre` SUR UN DESSIN `phrase`.** Il ne se plie pas à
   `largeurMax`, il élargit la boite, et tout le dessin rapetisse dans son bloc.
   Mesuré : **5,6 px** de police au lieu de 12. Les fiches de 5e existantes n'en
   mettent jamais — voilà pourquoi.
3. **`deplacable: true` sort du cadre** sur un groupe de plus de deux mots : le
   fantôme redessine le groupe entier à l'autre bout. La légende suffit.
4. **Une étiquette de groupe ne se plie pas.** « durée impossible aujourd'hui »
   sortait du cadre par la gauche. Trois mots maximum.
5. **Le canvas `conjugaison` imprime « infinitif : » EN DUR.** Sur un verbe
   c'est juste ; sur un mot dérivé c'est faux. Ne pas envoyer le champ.
6. **Les blocs de fiche n'interprètent PAS le markdown.** Un `~~barré~~`
   s'affiche avec ses tildes sous les yeux de l'élève.
7. **Un canvas de maths se règle en LARGEUR**, et le réglage se calcule :
   `largeur = bloc × police_interne / plancher`. Valeurs mesurées : `number_line`
   à 235, `schema_barre` à 205, `figure_libre` à 190.
8. **⛔ La frise (`mode: "frise"`) NE TIENT PAS dans un bloc de fiche.** Sa
   largeur vaut `max(size.width, 3 × largeurRepère + marges)` — `size.width`
   n'est qu'un plancher. Minimum ≈ 254 px pour un bloc de 226. **Le correctif
   appartient à `lib/canvas/ConjugaisonCanvas.tsx`, fichier partagé : le
   signaler à Frédéric, pas le modifier.** Utiliser `phrase` à la place.

---

## ⭐ Les trois découvertes qui rendent dessinable ce qui ne l'était pas

C'est le cœur de ce qui a permis de ficher la lecture, l'écriture, l'oral et la
culture — que **personne n'avait jamais fichés, dans aucune classe**.

### 1. L'arc de question (`type: "question"`)

Violet, fléché, avec son étiquette. Il va **de ce qu'on affirme vers ce qui le
prouve** : « il avait peur » → « ses mains tremblaient ». C'est le geste de la
justification, en un trait.

### 2. La nature en gris (`nature:`)

Trois adjectifs alignés sans verbe d'action, et l'on **voit** qu'un portrait
n'est pas un récit — là où une phrase de cours ne fait que l'affirmer.

### 3. La même phrase dessinée deux fois, avec des groupes différents

« Il regarda l'homme avec le télescope » : selon que le groupe s'accroche au
verbe ou au nom, ce n'est pas la même personne qui tient l'instrument. Le débat
interprétatif cesse d'être une formule vague.

### Et deux canvas de maths détournés

- **`figure_libre`** — une grille = **un espace à occuper**, et ce qui l'occupe
  est ce dont on parle. Employé deux fois : comme **cadre photographique** (le
  même sujet occupe 9 cases sur 9 en gros plan, 1 sur 9 en plan large — le
  cadrage devient une proportion) et comme **page** (la silhouette d'un poème,
  d'une scène de théâtre, d'un texte en prose).
- **`number_line`** pour un ORDRE (l'intensité : crainte → peur → épouvante,
  avec `showValues: false`) et **`schema_barre`** pour une INCLUSION (la
  généralité : un caniche dans un chien, un chien dans un animal). ⛔ Ce sont
  **deux axes différents**, et les élèves les confondent parce qu'on les leur
  enseigne avec le même mot, « plus ».
- **`conjugaison` en mode `wagons`** pour démonter un mot dérivé, avec une
  correspondance FIXE : `temps` = préfixe (orange), `radical` = radical (bleu),
  `personne` = suffixe (vert).

⭐ **Avant d'écrire un canvas neuf, relire `lib/canvas/CATALOGUE.md`.** Il le dit
lui-même : « avant d'en écrire un autre, vérifier que celui-ci ne suffit pas ».
Il a suffi seize fois sur seize.

---

## Les règles de contenu, non négociables

- ⛔ **ON N'INTERROGE JAMAIS UNE ŒUVRE.** Aucun titre, aucun auteur dans ce qui
  est demandé à l'élève : les livres sont choisis par le professeur. Les blocs
  « Dans la vraie vie » et « Histoire » peuvent en citer — ils s'adressent au
  lecteur, pas au questionné.
- **Les phrases viennent des BANQUES DU COACH**, sans exception. L'élève qui a
  lu la fiche doit retrouver ses propres phrases dans les exercices. La banque
  de chaque notion est nommée dans l'en-tête de la fiche de 4e correspondante.
- **Chaque bloc cite ses `micros`** dans la donnée (champ optionnel `micros`),
  jamais en commentaire.
- **Orthographe** : accents et apostrophes partout, apostrophe DROITE (`'`,
  28 880 contre 0 dans le dépôt), rectifications de 1990 (reconnaitre, connaitre,
  chaine, gout, cout, parait) — ⛔ sauf `sûr`, `dû`, `mûr`, qui gardent leur
  circonflexe. Voir la mémoire `orthographe-de-ce-que-l-eleve-lit`.
- **Aucun caractère d'une autre écriture.** Deux contaminations en une journée
  (un idéogramme, un mot cyrillique), invisibles pour tsc et pour le
  vérificateur de dessins. Scan disponible, voir plus bas.

---

## La boucle de vérification, à faire sur CHAQUE fiche

```bash
npx tsc --noEmit
node scripts/verifier-fiches-francais.mjs lib/fiches/francais-5e-<notion>.tsx
```

Puis **regarder la page rendue**, ce qui n'est pas optionnel : trois défauts du
26/08 n'existaient que là — l'« infinitif : » en dur, les tildes du markdown, et
six blocs laissés sans dessin.

```bash
# ton propre serveur, jamais celui d'une autre session
# (preview_start sur la config "eleveai-2")
```

Sur la page, en 375 px, mesurer **la plus petite police de tous les `<text>` des
SVG** — pas la plus grande. Plancher : **11 px**. Les seize fiches de 4e sont
entre 11,1 et 12,0.

Vérifier aussi qu'il ne reste **ni markdown brut** (`~~`, `**`) **ni caractère
d'une autre écriture** sur la page.

---

## ⚠️ Le dépôt est partagé — trois sessions y travaillent

Lis `docs/pied-de-prompt-sessions-paralleles.md`. En résumé :

1. **Committer par chemin** : `git commit -F message.txt -- <fichier> <fichier>`.
2. ⛔ **Jamais** `git commit --amend`, `git reset --hard`, `git checkout -- .`,
   ni `git stash` (il emporte l'arbre entier, pas seulement tes fichiers).
3. `git status` montrera des fichiers qui ne sont pas à toi : ne pas les ajouter,
   ne pas les annuler.
4. Démarre **ton** serveur de dev ; ne tue jamais celui d'un autre.

⛔ **ET LE PIÈGE DE LA PASSE FINALE :** `registre.ts` et `sitemap.ts` sont
partagés, et une autre session y aura probablement des lignes non commitées. Un
`git commit -- <fichier>` prend **l'arbre de travail** et emporte leurs lignes.
La parade : trier les hunks (`git diff -U0`, filtrer, `git apply --cached
--unidiff-zero`), puis committer **depuis l'index**, sans pathspec. Fait le
26/08 : cinq hunks stagés, deux laissés intacts.

### ⛔⛔ ET `git add <fichier>` NE SUFFIT PAS NON PLUS — MESURÉ LE 26/08 AU SOIR

Vérifier `git diff -U0` juste avant, puis faire `git add <fichier>`, **ne
protège de rien** : `git add` prend le fichier TEL QU'IL EST à cet instant, et
l'autre session écrit entre les deux. C'est arrivé (commit `336fc2f9`) : quatre
de ses lignes sont parties dans mon commit, dont une entrée de registre qui
pointait vers une page **pas encore commitée**. Poussé tel quel, cela publiait un
404 dans le hub et une URL morte dans le sitemap.

**La parade est de ne jamais stager depuis l'arbre de travail.** On construit un
patch de ses seuls hunks à partir d'un instantané, et on l'applique à l'INDEX :

```
git diff -U0 -- <fichiers>          # filtrer les hunks qui portent MON slug
git apply --cached --unidiff-zero <patch>
git commit -F message.txt           # depuis l'index, SANS pathspec
```

L'index reflète HEAD : les lignes non commitées d'une autre session n'y sont pas
et ne peuvent pas s'y glisser. Et si le fichier a bougé entretemps, `git apply`
**échoue** au lieu de prendre en silence — c'est tout l'intérêt.

⭐ **Et un contrôle à passer avant chaque push**, celui qui aurait attrapé le
404 : pour chaque entrée de `FICHES_REGISTRE` et chaque route de fiche du
sitemap, vérifier que `app/fiches-cours/<clé>/page.tsx` est **suivi par git**
(`git ls-files`), pas seulement présent sur le disque.

---

## La passe finale

1. Une entrée par fiche dans `lib/fiches/registre.ts` (`titre` + `resume`).
2. Une ligne par fiche dans `app/sitemap.ts`.
3. **Les alias** : quand une fiche couvre DEUX notions du coach — parce que le
   découpage a coupé en deux un objectif que le programme traite d'un bloc —,
   ajouter une ligne dans `FICHES_ALIAS`, sinon la seconde notion s'affiche sans
   badge « Fiche » alors que son cours existe. Trois cas en 4e.
4. Mesurer : `npx --yes tsx@4 scripts/couverture-fiches.ts`.

---

## Par où commencer

**La 5e d'abord**, et par ses huit notions de LANGUE manquantes : le vocabulaire
y manque en entier, et c'est le chantier où l'on réutilise le plus directement
ce qui a été inventé en 4e (l'échelle d'intensité, l'emboitement de généralité,
le mot démonté en wagons).

Puis les notions transversales, en s'appuyant sur les trois découvertes
ci-dessus. La 6e ensuite — en relisant son programme à elle, celui du cycle 3.

**Une fiche à la fois, vérifiée et commitée avant la suivante.** C'est ce rythme
qui a permis d'en écrire seize en une journée sans qu'aucune ne soit à reprendre.

---

## ⭐ Trois règles nées de la journée du 27/08, à ne pas repayer

**1. Le crochet a SIX emplois, pas cinq.** Au cinq déjà listés s'ajoute : **ce
que l'auditeur doit faire** (« je sais », « j'adhère », « je fais »). Et l'arc de
question, lui, sert dans TROIS directions selon la fiche —
de ce qu'on comprend vers ce qui le montre (`lecture_comprehension`),
de l'effet vers ce qui l'a produit (`lecture_apprecier`),
et **de la fin vers le début** (`lecture_oeuvre_contextes`, où il remonte le
temps pour comparer le dernier chapitre au premier). Un seul geste, trois sens.

**2. La règle de couleur a une BASCULE, et je l'avais mal énoncée.** Ce n'est pas
« toujours gris » : c'est **« gris quand ce n'est pas une fonction »**. Dans une
fiche de LANGUE (`grammaire_phrase` 6e), les étiquettes SONT des fonctions et les
couleurs DOIVENT s'appliquer — sujet bleu, verbe rouge, COD vert, CC orange,
propositions indigo et sarcelle, vérifié au rendu. Dans une fiche de lexique,
d'oral ou de lecture, elles n'en sont pas et doivent rester grises. **Les deux cas
se mesurent au rendu**, jamais au jugement.

**3. Deux contrôles qui crient au loup — savoir les lire.**
- ⛔ **`window.innerWidth === 0` fausse TOUTE mesure de police.** Un contrôle a
  rendu « 5,01 px, débordement » sur une fiche parfaitement saine : la fenêtre
  n'avait plus de largeur. **Toujours vérifier le viewport avant de croire un
  chiffre** — refait à 375 px, la même page donnait 13,02.
- ⛔ **Chercher la chaine « infinitif : » ne prouve rien**, même dans un SVG :
  elle apparait légitimement dans une légende (« L'infinitif : la consigne vaut
  pour tous »). Le piège du canvas n'existe que si la fiche utilise le canvas
  `conjugaison` ET lui envoie le champ `infinitif`. Vérifier ça, pas la chaine.

⚠️ **Et le vérificateur, lui, ne crie jamais à tort** : il a attrapé une étiquette
à 10,9 px dans une carte de MÉTHODE (201 px, le bloc le plus étroit). Deux mots
trop longs sur un dessin qui touchait `largeurMax`. Correctif : raccourcir les
étiquettes, la légende porte la phrase entière.

---

## ⭐ Quatre règles nées de la journée du 28/08, à ne pas repayer

**1. LE PLAFOND D'UNE BOITE DU CANVAS `phrase` EST D'ENVIRON VINGT SIGNES —
mesuré, et le prix est brutal.** Une SEULE boite de vingt-huit signes (« des
élèves ont perdu le leur ») a poussé le viewBox à 294 px pour un bloc de 218, et
**tout le dessin est tombé à 8,9 px** — étiquettes ET légende, puisque la légende
vit dans le SVG. `largeurMax` dit où la phrase passe à la ligne ; **il ne coupe
pas une boite trop longue**. ⚠️ Et la bande `nature` compte dans la largeur,
puisqu'elle se pose au-dessus du mot : les deux doivent tenir sous vingt signes.

**2. `number_line` DÉCALE SES ÉTIQUETTES EN HAUTEUR — donc il accepte des noms
longs, et comparer deux extensions horizontales ne prouve RIEN.** Sur 235 px avec
quatre points, chaque repère ne dispose que de 47 px ; « Renaissance » en fait
100. Le canvas ne les tasse pas : il les met sur des lignes de base différentes
(y = 62, 40, 18, 4). ⛔ J'ai cru à un défaut en mesurant « Moyen Âge » finissant à
179 px et « Renaissance » commençant à 123 — cinquante-six pixels de recouvrement
APPARENT, aucun pixel partagé. **Ne comparer que des textes de même `y`.**

**3. LE VÉRIFICATEUR A UNE TROISIÈME MESURE DEPUIS LE 28/08 : la superposition.**
`verifier-fiches-francais.mjs` compare désormais, sur chaque ligne de base, les
textes voisins. Les deux mesures d'avant — police et débordement — laissaient
passer ce défaut entièrement : un texte peut être à 12 px, tenir dans le cadre, et
être illisible parce qu'un autre occupe les mêmes pixels.
⚠️ **Il a trouvé des défauts RÉELS dans cinq fiches déjà en ligne**, vérifiés au
navigateur (les pronoms de 6e : deux étiquettes « pronom » recouvertes de 11 px ;
`francais-6e-conjugaison-modes` : « futur » et « imparfait » sur 11 px ;
`francais-6e-conjugaison-temps-composes`, `francais-cm2-conjugaison-formes`,
`francais-cm2-grammaire-orthographe`). **Ces fiches ne sont pas corrigées** : ce
sont des dessins de conjugaison et de langue d'autres chantiers. À reprendre.

**4. LA BASCULE DE COULEUR SE JOUE AUSSI DANS UNE FICHE QUI N'EST PAS DE LANGUE.**
`francais-5e-ecriture-reviser` porte un dessin d'accord sujet-verbe : l'étiquette
« le sujet » EST une fonction, donc la couleur DOIT s'appliquer — vérifié au
rendu, `rgb(29, 78, 216)`, et l'arc est de type `accord`. La règle n'est jamais
« gris dans telle famille de fiches » : elle est **« gris quand ce n'est pas une
fonction »**, et elle se mesure au rendu.

### ⭐ Trois emplois de canvas trouvés le 28/08, tous réutilisables

- **`figure_libre` DESSINE UNE COPIE**, et c'est son meilleur emploi jusqu'ici :
  un bloc plein contre des blocs séparés montre « aller à la ligne » sans un mot,
  et **une ligne remplie sur deux montre le brouillon aéré exprès** pour qu'on
  corrige dedans. Rien d'autre ne dessine cela.
- **DEUX ARCS QUI CONVERGENT DESSINENT UNE INFÉRENCE** — deux indices, une
  conclusion. La même figure sert au sens global (« la pluie » et « le froid »
  convergent sur « elle continue ») et à l'implicite (« il cache sa copie »,
  « joues rouges » → « mauvaise note »). Elle sert aussi au ton d'une réplique
  (le verbe donne le TON, le « ! » donne le VOLUME) et au réseau de deux textes.
- **LA PIÈCE MANQUANTE SE DESSINE PAR SON ABSENCE** : trois boites au lieu de
  quatre, et le vide se compte. Même geste que le crochet absent.

---

## ⭐ Ce que la journée du 29/08 a ajouté (treize fiches de 6e)

**1. LE STAGE SUR `registre.ts` EST UN SCRIPT, ET IL A ATTRAPÉ SA PROPRE CAUSE.**
`node scripts/stager-mon-hunk.mjs lib/fiches/registre.ts "<mon-slug>"` extrait le
diff en **-U3**, ne stage que les hunks portant le slug, annonce combien il en
laisse, puis **relit l'INDEX et le remet à HEAD s'il en sort une clé en double**.
⛔ Les deux raisons, toutes deux payées le 29 :
- avec **`-U0`**, git réémet parfois le bloc d'ancrage pour représenter une
  insertion — un ajout de cinq lignes sort en hunk de dix, `git apply --cached`
  écrit les deux, et l'index part avec une clé DOUBLÉE que l'arbre de travail
  n'a pas. C'est arrivé, c'est parti dans un commit poussé, et **`tsc --noEmit`
  ne dit rien** : TypeScript accepte une clé répétée dans un `Record<string, …>` ;
- appliquer le patch ENTIER emporte les hunks des autres sessions. Le script a
  laissé intacte une entrée `maths/4e/prop-echelle` cinq fois de suite.

⭐ Contrôle plus court, sans outil, donné par la session maths :
`grep -oP '^\s{2}"[^"]+":' lib/fiches/registre.ts | sort | uniq -d`

**2. LE PLAFOND DE VINGT SIGNES PAR BOITE S'EST VÉRIFIÉ TROIS FOIS.** « je ne
suis pas d'accord » (23), « trop vite au début » (21), « des élèves ont perdu le
leur » (28) ont chacune fait tomber un dessin entier sous 11 px — jusqu'à 8,9 px.
La légende vit dans le SVG : elle tombe avec.

**3. LA BANDE `nature` EST CENTRÉE SUR SON MOT** et ne se plie pas à la largeur
de la boite. Au-dessus de mots de deux à quatre lettres (« Elle », « la »,
« lui »), les étiquettes se recouvraient de 12 et 17 px — police à 12 px, dessin
dans son cadre, et illisible. **Chaque mot doit être au moins aussi large que son
étiquette** ; des guillemets suffisent à l'élargir.

**4. `number_line` A LA CASSE INVERSE**, mesuré par la session maths : il décale
ses étiquettes en HAUTEUR (donc il tolère les noms longs), mais il les CENTRE sur
la valeur — **un point posé sur le minimum ou le maximum déborde de la moitié de
sa largeur**. Poser les points en 1..n dans un axe 0..(n+1).

⭐ **Et trois emplois de canvas trouvés le 29** :
- `figure_libre` comme **cadre photographique montrant le HORS-CHAMP** (les cases
  vides sont ce que quelqu'un a laissé dehors) et comme **silhouette de genre**
  (la colonne de noms à gauche n'existe qu'au théâtre) ;
- **deux arcs qui convergent dessinent une INFÉRENCE** — deux indices, une
  conclusion. La même figure sert au sens global, à l'implicite, au ton d'une
  réplique et au réseau de deux œuvres ;
- **l'arc `reprise`** (pointillé, sous la phrase) sur une reprise NOMINALE et non
  un pronom, et **deux arcs de reprise partant du même mot** pour l'ambiguïté.

⭐⭐ **UN FIL QUI TRAVERSE TROIS DOMAINES DE LA 6e, à dire tel quel à l'élève :
UNE REMARQUE N'EST UTILE QUE SI ELLE DÉSIGNE UN ENDROIT.** Les banques le
formulent trois fois — en écriture (« on ne comprend pas qui parle » → on agit
là), en lecture (« c'est nul » ne se discute pas, « au chapitre 3 » se discute),
à l'oral (« je parlais trop vite au début », jamais « c'était nul »).

---

## ⭐ La ROBUSTESSE d'une notion : ce qu'il faut mesurer, et dans quel ordre

« Robuste » a un sens précis ici, et ce n'est pas un total d'énoncés. Trois
scripts, trois grandeurs différentes — les lancer dans cet ordre :

```bash
npx --yes tsx@4 scripts/verifier-demarrage.ts <classe> francais
npx --yes tsx@4 scripts/verifier-renouvellement.ts <classe> francais
node --experimental-strip-types scripts/verifier-generateurs.mjs <classe> francais
```

**1. `verifier-demarrage` — est-ce que la ligne cliquée ouvre la sienne ?** C'est
le plus important et le plus traitre : quand une micro ne peut pas servir, le
moteur sert une VOISINE sans le dire. Mesuré le 29/08 : cliquer « Voyager en
poésie » en 5e donnait une question sur les héros. ⛔ La cause était une micro à
UN SEUL ITEM — `buildQuestionPair` propose deux énoncés au choix et ne trouvait
pas de quoi faire la paire.

**2. `verifier-renouvellement` — combien d'énoncés le coach FABRIQUE-t-il ?**
Seuil : 12. ⛔ Il compte les générés SEULS : un `fixed` ne se renouvelle jamais.
Quand il crie, la réparation n'est jamais d'ajouter des items figés — c'est
d'allonger la TABLE d'un gabarit (« au moins quinze cas »), ou d'écrire un
SECOND GABARIT qui prend la question par l'autre bout : au lieu de donner le cas
et demander la catégorie, donner la catégorie et demander le cas.

**3. `verifier-generateurs` — la bonne réponse est-elle dans les choix ?** Il
exécute les gabarits soixante fois au lieu de lire le source.

### ⛔⛔ ET UN FAUX POSITIF DU TROISIÈME, À NE SURTOUT PAS « CORRIGER »

`verifier-generateurs` signale **34 gabarits de 5e qui « tombent à deux
propositions »** et parle de régression. **Ce n'est pas un défaut.** Les quatre
banques `socle-*.bank.ts` de 5e partagent une constante :

```ts
const TAILLES: readonly number[] = [2, 3, 3, 4, 4, 4];
```

La taille du QCM est tirée au sort à chaque question, et c'est la décision de
Frédéric du 25/08 — « deux, trois ou quatre propositions, quatre au maximum ».
Le script ne sait pas distinguer une taille VOULUE d'un effondrement accidentel
(son propre en-tête le concède : « un oui / non en a deux, et c'est très bien »).
⚠️ Conséquence pratique : sa sortie est à 1 sur la 5e en français, donc il ne
peut pas servir de garde-fou automatique sur cette classe tel quel.

⚠️ Ce qui resterait à arbitrer avec Frédéric, et qui est une vraie question :
un tirage sur six donne DEUX propositions, y compris sur des questions qui ne
sont pas binaires — « Où en est l'histoire ? » a quatre réponses possibles, et
une chance sur deux au hasard quand la taille tombe à deux.

### ⚠️ Deux dettes laissées ouvertes, à arbitrer avec Frédéric

1. **Treize des quatorze fiches de 6e écrites avant le 28/08 n'ont PAS l'année
   dans leur titre** (« Lire avec fluidité en 6e »), alors que la règle SEO
   mesurée le 26/08 l'exige. Les trois fiches du 28/08 la portent. Retitrer les
   anciennes **rend leurs PDF orphelins** (`npm run verifier:pdf` le signale) :
   c'est un arbitrage, pas une correction à faire en passant.
2. **`npx tsc --noEmit` échouait le 28/08 au soir** sur
   `lib/fiches/maths-4e-ratio-pourcentage.tsx(337)` — `size` n'existe pas sur
   `TableauDonneesCanvasData`. Fichier de la session maths, laissé intact.
