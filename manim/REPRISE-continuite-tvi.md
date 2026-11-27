# REPRISE — série « CONTINUITÉ ET TVI », terminale spé (27/11/2026)

**5 épisodes PAYSAGE = les 5 micro-compétences du coach** de la notion `continuite_tvi`.
Les 5 shorts existent déjà et sont en ligne ; ce sont les paysages qui manquent.

> ⛔ **Ce tour-ci : l'ÉCRITURE seule.** Pas de rendu HD, pas d'écriture dans
> `lib/videos/videos-r2.json`, pas de ligne dans `notion_ressources`, pas de push.

---

## 1. Le trou qu'on vient combler, mesuré

| ce que le coach sert aujourd'hui pour `continuite_tvi` | |
|---|---|
| `terminale-continuite-tvi` | **1 paysage de NOTION**, sans `microId` — il couvre les 5 micros en une vidéo |
| `terminale-continuite-tvi-short-continuite` | short → `continuite_reconnaitre` |
| `terminale-continuite-tvi-short-appliquer` | short → `tvi_appliquer` |
| `terminale-continuite-tvi-short-unicite` | short → `tvi_unicite` |
| `terminale-continuite-tvi-short-rediger` | short → `tvi_rediger` |
| `terminale-continuite-tvi-short-defi` | short → `tvi_defi` |

**Aucun paysage par micro.** L'élève qui ouvre « Vidéo » sur un micro tombe sur une
accroche verticale de 40 secondes. C'est ce que ces 5 épisodes réparent.

⚠️ L'entrée de notion `terminale-continuite-tvi` porte encore un champ `youtube`
(`GWVlbZyiME4`) et son en-tête de script y renvoie. ⛔ Les 5 nouveaux épisodes ne portent
aucune référence YouTube, dans aucun fichier : le coach sert `eleveai.fr/video/<id>`.
Cette vieille entrée n'est pas mon territoire et je n'y touche pas — c'est un constat.

---

## 2. Les décisions de ce tour, et pourquoi

### ⭐⭐ TROIS cartes de choix, pas quatre — et c'est une MESURE, pas une préférence

Le brief demandait « les 4 propositions ». **Le socle de production n'en rend que trois**,
et une quatrième disparaîtrait sans un mot :

- `manim/poste2/espace_ecrans.py` l. 471 : `for l, c in zip("ABC", choix)` — `zip`
  **tronque en silence**. Un quatrième choix écrit dans la voix ne serait jamais affiché ;
- `q_montrer_choix` (l. 525) boucle elle aussi sur `"ABC"` et va chercher `"A : "`,
  `"B : "`, `"C : "` dans le texte de la voix : un `D : ` ne serait jamais cherché ;
- et la géométrie ne le permet pas : la note de la série espace mesure qu'**à quatre
  lignes de question les cartes descendent sur Ti-Margo et lui coupent la tête**
  (boîte x ∈ [5,54 ; 6,66], y ∈ [−3,55 ; −2,15]). Une carte de plus, c'est 0,88 de plus.

Tout le dépôt est à trois : `zip("ABC", …)` dans `4e/div_multiple.py`,
`4e/equation_defi.py`, `4e/pythagore_pauses.py`, les 12 épisodes de l'espace. Les QCM à
quatre choix sont ceux des **banques d'exercices**, pas des vidéos.

👉 **Les 10 questions de cette série ont donc 3 propositions.** La règle de fond — *les
propositions doivent s'exclure mutuellement* — est appliquée et vérifiée une par une au
§ 5. Si Frédéric veut vraiment quatre cartes en vidéo, c'est un chantier de socle
(`carte_choix`, `q_tete`, `q_montrer_choix`, et la hauteur du bloc) : à trancher avant
d'écrire les voix, pas après.

### Les identifiants, les chemins, le socle

| | choix | raison |
|---|---|---|
| id | `terminale-continuite-reconnaitre`, `terminale-tvi-appliquer`, `terminale-tvi-unicite`, `terminale-tvi-rediger`, `terminale-tvi-defi` | la règle de la série espace : `terminale-` + le `microId`, tirets au lieu des tirets bas (`ps_espace_angle` → `terminale-ps-espace-angle`) |
| fichier R2 | `terminale/maths/analyse/<slug>/eleveai-maths-<id>.mp4` | l'espace a ouvert `…/maths/geometrie/<slug>/` ; `analyse` est son équivalent. ⛔ Pas `…/maths/paysage/fr/continuite-tvi/`, qui est le dossier de la vieille vidéo de notion |
| `renvoie_vers` | aucun | ce sont les SHORTS qui renvoient vers un paysage, pas l'inverse |
| ceinture | `verte` | comme les 12 épisodes de terminale spé déjà au manifeste. ⚠️ Rien dans `lib/tutor-v4/knowledge/` ne porte de ceinture : c'est un champ du manifeste, pas une donnée du catalogue |
| socle d'écran | **un socle NEUF**, `manim/poste2/analyse_ecrans.py` | l'en-tête de `espace_ecrans.py` le dit : « la convention terminale (recopiés, rien importé) vaut d'un CHAPITRE à l'autre ». Une série d'analyse n'est pas la série espace : elle n'a aucun repère 3D et il lui faut des axes, des courbes et un tableau de variations. ⛔ Et `espace_ecrans.py` sert une série EN PRODUCTION : on n'y touche pas |

### Les centres d'intérêt, tous ouverts à la tranche 15-18

Lus dans `lib/videos/centres-interet.ts` (liste **fermée**, 18 entrées, 16 ouvertes à
15-18) : `transports`, `meteo-climat`, `sport`, `jeux-defis`, `sciences`.
⚠️ Le contrôle `node scripts/verifier-centres-age.mjs <manifeste>` se relance au moment
de la fiche, pas avant.

### ⭐ La place de la bonne réponse, tirée — et une contrainte de plus

`python -X utf8 manim/poste2/tirage-lettres-continuite-tvi.py` (graine 2711) :

| | E1 | E2 | E3 | E4 | E5 |
|---|---|---|---|---|---|
| `04` | **A** | **C** | **C** | **A** | **B** |
| `07` | **B** | **A** | **B** | **C** | **A** |

Soit **A 4 · B 3 · C 3** sur 10 questions, deux lettres différentes dans chaque épisode,
et jamais deux fois la même lettre d'un épisode au suivant.

⛔⛔ **Le premier tirage retenu mettait A en `04` quatre fois sur cinq.** Il respectait
pourtant `manim/REGLES.md` à la lettre : la règle parle de la série entière et de deux
questions consécutives — **elle ne voit pas les colonnes**. Un élève qui répond toujours
A à la première question gagnait 80 %. Le script porte donc une contrainte de plus :
*aucune lettre plus de deux fois dans la même colonne*. À reprendre pour les séries
suivantes.

---

## 3. Ce que les 5 shorts disent DÉJÀ — et que les paysages ne redisent pas

Lu dans `manim/scripts/terminale/continuite_tvi_short.py`. Le short accroche, le paysage
installe : **aucun des cinq paysages ne rejoue l'exemple de son short.**

| short | son exemple | son défi | ce que le paysage fait à la place |
|---|---|---|---|
| `…-short-continuite` | la fonction en escalier (saut de −1 à 1) ; le catalogue polynômes / exp / ln | « la partie entière est-elle continue ? » | la définition par la limite, le **recollement de deux morceaux**, les intervalles d'une fonction rationnelle, continue ≠ dérivable. ⛔ La partie entière n'apparaît nulle part |
| `…-short-appliquer` | **x³ + x − 1 = 0 sur [0 ; 1]** | x³ − 2 = 0 entre 1 et 2 | le TVI pour **k ≠ 0**, et le cas où il ne dit RIEN. Exemples : x⁵ + 3x − 5, puis x³ = x + 5 |
| `…-short-unicite` | x³ + x − 1, f′ = 3x² + 1 | x² − 1 sur [−2 ; 2] | eˣ + x − 4, puis x + ln x = 3 ; et le cas « strictement croissante mais qui ne s'annule pas » |
| `…-short-rediger` | les 4 lignes, « corollaire du TVI » | « laquelle oublies-tu ? » | **à quoi sert chaque ligne** : une phrase par hypothèse du théorème, et deux copies à réparer |
| `…-short-defi` | le balayage 0,6 / 0,7 puis 0,68 / 0,69 sur x³ + x − 1 | x³ = 2 au dixième | l'exercice entier : **variations d'abord, TVI sur CHAQUE morceau monotone**, puis l'encadrement |

⚠️ **La vieille vidéo de notion est aussi à éviter** : elle tient sur x³ + x − 1 et sur la
montée de Cilaos au Piton des Neiges. Les cinq paysages ne reprennent ni l'un ni l'autre.

---

## 4. Le gabarit d'un épisode — 15 clips, le modèle terminale

`00-garde` · `01-situation` · `02-idee` · `03-theoreme` · `04-question` · `04b-reponse` ·
`05-appliquer` · `06-piege` · `07-question` · `07b-reponse` · `08-rediger` · `09-defi` ·
`09b-correction` · `10-finale` · `11-abonne`.

⭐ **Trois lignes de question à l'écran au MAXIMUM.**
⭐ **La question dit à l'écran exactement ce que la voix dit, mot pour mot.**
⭐ **L'écran `02-idee` traite un AUTRE cas que `04-question` et que `07-question`** —
contrôlé épisode par épisode au § 5. Aucun instrument ne le voit.

⭐⭐ **Une nouveauté de cette série, dans les chapitres.** Les chapitres partent verbatim
dans la description, et ceux de la série espace écrivent « Réponse : un vecteur
vertical » — c'est-à-dire **la réponse de la question-pause, lisible sans regarder la
vidéo**. Ici les chapitres de réponse nomment le **geste**, jamais le verdict :
« Réponse : comparer les deux morceaux au point de recollement ».

---

## 5. LE MANIFESTE DES 5 ÉPISODES

> Les chapitres sont donnés **sans horodatage** : les instants viennent du journal du
> rendu HD, et il n'y a pas de rendu ce tour-ci. L'ordre et les libellés, eux, sont figés.

---

### E1 · `terminale-continuite-reconnaitre`

**Micro** : `continuite_reconnaitre` — Reconnaître une fonction continue sur un intervalle.
**Centre** : `transports`. **Contexte** : Kévin régule le téléphérique urbain de Saint-Denis.
**Script** : `manim/scripts/terminale/continuite_reconnaitre.py`, scène `ContinuiteReconnaitre`.

**Titre** : *Le compteur saute, la cabine non — Reconnaître une fonction continue · Tle spé*

**Accroche** :

> Kévin suit deux écrans en salle de régulation. L'altitude de la cabine : elle monte de
> 40 à 180 mètres et passe par toutes les valeurs du chemin. Le compteur de passagers :
> il saute de 1 à 2, et ne vaut jamais 1,5. Deux courbes, deux mondes — et c'est toute la
> différence entre continue et pas continue.
>
> Dans cette vidéo :
> • la définition : f est continue en a quand la limite en a vaut f(a)
> • deux morceaux recollés : ce qu'on compare, et où
> • le catalogue du bac : polynômes, racine, exponentielle, logarithme, et les quotients
> • une fonction rationnelle se déclare **intervalle par intervalle**, jamais d'un bloc
> • continue et dérivable, ce n'est pas la même chose — et une seule des deux entraîne
>   l'autre
>
> Deux questions-pauses et un défi corrigé. Entraîne-toi sur eleveai.fr

**Les écrans** :
- `02-idee` — **cas 1** : f(x) = 2x + 1 si x < 1, f(x) = 5 si x ⩾ 1. À gauche la limite
  vaut 3, la valeur en 1 vaut 5 : un saut de 2.
- `03-theoreme` — le catalogue, plus « toute fonction dérivable sur un intervalle y est
  continue ».
- `05-appliquer` — **cas 3** : f(x) = (2x + 1)/(x − 3), continue sur ]−∞ ; 3[ **et** sur
  ]3 ; +∞[.
- `06-piege` — un ensemble de continuité s'écrit en intervalles ; la valeur absolue est
  continue en 0 sans y être dérivable ; la réciproque, elle, est vraie.
- `08-rediger` — « h est la somme de ln, continue sur ]0 ; +∞[, et d'un polynôme, continu
  sur ℝ : h est continue sur ]0 ; +∞[. » On nomme la raison, jamais « c'est continu ».
- `09-defi` / `09b` — **cas 5** : f(x) = √(x − 1) + 1/(x − 4). Réponse : continue sur
  [1 ; 4[ et sur ]4 ; +∞[ — **deux intervalles, pas un**.

**Question 1 (`04`) — cas 2** : « g(x) = x² si x ⩽ 2, et g(x) = 3x − 2 si x > 2. g est-elle
continue en 2 ? »

| | proposition | |
|---|---|---|
| **A** | oui, les deux morceaux valent 4 en 2 | ✅ **bonne réponse** |
| B | non, il y a un saut de 2 unités | |
| C | il faudrait connaître la dérivée | |

*Exclusion* : « oui », « non », « on ne peut pas savoir » — trois verdicts incompatibles,
un seul vrai (2² = 4 et 3 × 2 − 2 = 4).

**Question 2 (`07`) — cas 4** : « Sur quel ensemble la fonction h(x) = ln x + x² est-elle
continue ? »

| | proposition | |
|---|---|---|
| A | sur ℝ tout entier | |
| **B** | sur ]0 ; +∞[ | ✅ **bonne réponse** |
| C | sur [0 ; +∞[ | |

*Exclusion* : trois ensembles deux à deux différents ; un seul contient exactement les x
où ln x existe.

**Chapitres** : Le compteur saute, la cabine non · Kévin et ses deux écrans · Recoller
deux morceaux · Le catalogue du bac · Question 1 · Réponse : comparer les deux morceaux au
point de recollement · Une fonction qui a un trou · Le piège · Question 2 · Réponse : le
domaine du logarithme décide · La première ligne de la copie · À toi de jouer · Correction
· Ce que tu as appris.

**Contre-contrôle du titre et de l'accroche** :

| | vérification |
|---|---|
| titre vs A/B/C de `04` | le titre parle du **compteur** et de la **cabine** : ni 2, ni 4, ni « recollement ». Aucune carte n'est réfutable en s'en souvenant |
| titre vs A/B/C de `07` | le titre ne nomme ni ln, ni intervalle, ni ensemble |
| accroche vs `04` | la puce dit « deux morceaux recollés : ce qu'on compare, et où » — elle pose le geste, **elle ne dit pas si ça recolle** |
| accroche vs `07` | la puce dit « une fonction rationnelle se déclare intervalle par intervalle » : c'est le cas 3, pas le logarithme de la question |
| idée ≠ question | `02` = un saut (deux morceaux qui ne recollent pas) ; `04` = deux morceaux qui recollent. **Cas différents, verdicts opposés** |

---

### E2 · `terminale-tvi-appliquer`

**Micro** : `tvi_appliquer` — Appliquer le théorème des valeurs intermédiaires.
**Centre** : `meteo-climat`. **Contexte** : Léa, prévisionniste, relève la température au
sommet du Maïdo.
**Script** : `manim/scripts/terminale/tvi_appliquer.py`, scène `TviAppliquer`.

**Titre** : *Le théorème qui prouve sans calculer — Appliquer le TVI · Tle spé*

**Accroche** :

> À six heures, Léa relève −2 °C au sommet du Maïdo. À midi, 14 °C. Elle n'a pas regardé
> entre les deux, et elle peut pourtant affirmer qu'il a fait exactement 0 °C à un moment.
> Sans savoir quand. C'est le théorème des valeurs intermédiaires, et c'est un des rares
> endroits des maths où on prouve qu'une chose existe sans jamais la trouver.
>
> Dans cette vidéo :
> • l'énoncé exact : f continue sur [a ; b], et k compris entre f(a) et f(b)
> • le cas k = 0, celui du bac, et ce que « signes contraires » veut dire
> • un exemple complet sur x⁵ + 3x − 5 entre 1 et 2
> • **le piège : ce que le théorème ne dit pas quand f(a) et f(b) ont le même signe**
> • ramener une équation à f(x) = 0 avant de commencer
>
> Deux questions-pauses et un défi corrigé. Entraîne-toi sur eleveai.fr

**Les écrans** :
- `02-idee` — **cas 1** : la courbe des températures, k = 0 entre −2 et 14.
- `03-theoreme` — l'énoncé, puis le cas particulier k = 0 avec les signes contraires.
- `05-appliquer` — **cas 3** : g(x) = x⁵ + 3x − 5 sur [1 ; 2]. g(1) = −1, g(2) = 33,
  polynôme donc continue : au moins une solution.
- `06-piege` — oublier d'écrire « f est continue » ; **pas de changement de signe ne veut
  pas dire pas de solution** ; le TVI donne l'existence, jamais la valeur ni le nombre.
- `08-rediger` — les trois lignes de l'existence.
- `09-defi` / `09b` — **cas 5** : montrer que x³ = x + 5 a une solution entre 1 et 2. On
  pose f(x) = x³ − x − 5 : f(1) = −5, f(2) = 1.

**Question 1 (`04`) — cas 2** : « f est continue sur [1 ; 4], f(1) = 5 et f(4) = 9.
L'équation f(x) = 7 a-t-elle une solution sur [1 ; 4] ? »

| | proposition | |
|---|---|---|
| A | non, f ne s'annule pas | |
| B | on ne peut pas conclure | |
| **C** | oui, au moins une | ✅ **bonne réponse** |

*Exclusion* : « non », « on ne sait pas », « oui » — incompatibles. A est l'élève qui
cherche un zéro là où on demande 7.

**Question 2 (`07`) — cas 4** : « f est continue sur [0 ; 3], f(0) = 2 et f(3) = 8. Que dit
le théorème pour l'équation f(x) = 0 ? »

| | proposition | |
|---|---|---|
| **A** | rien : 0 n'est pas entre 2 et 8 | ✅ **bonne réponse** |
| B | qu'il y a au moins une solution | |
| C | qu'il n'y a aucune solution | |

*Exclusion* : « le théorème ne conclut pas », « il conclut qu'il y en a », « il conclut
qu'il n'y en a pas » — trois verdicts incompatibles. C est l'erreur la plus répandue :
confondre « le théorème se tait » et « il n'y a rien ».

**Chapitres** : Prouver sans calculer · Léa, −2 °C à six heures et 14 °C à midi · L'idée ·
L'énoncé exact · Question 1 · Réponse : où se trouve la valeur cherchée · Un exemple
complet · Le piège · Question 2 · Réponse : ce que le théorème ne couvre pas · La
rédaction de l'existence · À toi de jouer · Correction · Ce que tu as appris.

**Contre-contrôle du titre et de l'accroche** :

| | vérification |
|---|---|
| titre vs `04` | « prouve sans calculer » ne dit rien de 5, 7, 9 ni d'un intervalle. Aucune carte réfutée |
| titre vs `07` | le titre vante ce que le théorème fait ; la question porte sur ce qu'il **ne** fait pas. Il ne désigne ni A, ni B, ni C |
| accroche vs `04` | l'accroche illustre k = 0 sur les températures ; la question porte sur k = 7. Se souvenir de l'accroche n'élimine aucune carte |
| ⚠️ accroche vs `07` | **point le plus serré de la série.** Une première version écrivait « le piège : sans changement de signe, le théorème ne dit RIEN » — c'est mot pour mot la carte A. Réécrit en « ce que le théorème ne dit pas quand f(a) et f(b) ont le même signe » : la forme interrogative est gardée, le verdict est retiré |
| idée ≠ question | `02` = températures, k = 0, signes contraires ; `04` = k = 7, pas de zéro ; `07` = même signe aux deux bornes. Trois cas |

---

### E3 · `terminale-tvi-unicite`

**Micro** : `tvi_unicite` — Justifier l'unicité d'une solution.
**Centre** : `sport`. **Contexte** : Mathis court le Grand Raid ; sa distance parcourue ne
recule jamais.
**Script** : `manim/scripts/terminale/tvi_unicite.py`, scène `TviUnicite`.

**Titre** : *Une seule fois au kilomètre cent — Justifier l'unicité d'une solution · Tle spé*

**Accroche** :

> Mathis est quelque part entre Cilaos et Grand-Îlet. Sa distance parcourue depuis le
> départ ne saute pas et ne recule jamais : il est passé au kilomètre cent une fois, et
> une seule. Un marcheur qui ferait demi-tour, lui, pourrait y repasser trois fois. Toute
> la différence entre « il existe une solution » et « il en existe une seule » tient dans
> cette phrase.
>
> Dans cette vidéo :
> • le théorème des valeurs intermédiaires donne l'existence — et jamais autre chose
> • ce qu'il faut lui ajouter pour écrire « unique », et comment on le justifie
> • le corollaire du TVI, aussi appelé théorème de la bijection
> • un exemple complet sur eˣ + x − 4 entre 0 et 2
> • le piège : « croissante » et « strictement croissante » ne valent pas le même nombre
>   de points, parce qu'elles ne disent pas la même chose
>
> Deux questions-pauses et un défi corrigé. Entraîne-toi sur eleveai.fr

**Les écrans** :
- `02-idee` — **cas 1** : deux courbes côte à côte sur [0 ; 4], mêmes valeurs aux bornes.
  L'une monte puis descend et coupe deux fois ; l'autre ne fait que monter et coupe une
  fois.
- `03-theoreme` — le corollaire : continue **et** strictement monotone sur [a ; b], k entre
  f(a) et f(b) ⇒ **une unique** solution. La stricte monotonie se justifie par le signe
  de f′.
- `05-appliquer` — **cas 3** : f(x) = eˣ + x − 4 sur [0 ; 2]. f(0) = −3, f(2) ≈ 5,39,
  f′(x) = eˣ + 1 > 0 : une unique solution α.
- `06-piege` — « croissante » sans « strictement » autorise un palier, donc une infinité
  de solutions ; le TVI seul ne donne jamais l'unicité ; la monotonie doit valoir sur
  l'intervalle de travail.
- `08-rediger` — la seule ligne qui change par rapport à E2 : « f′(x) > 0 sur [0 ; 2],
  donc f est strictement croissante sur [0 ; 2] ». La copie entière est le sujet de E4.
- `09-defi` / `09b` — **cas 5** : x + ln x = 3 sur [1 ; 3]. f(1) = −2, f(3) = ln 3 ≈ 1,10,
  f′(x) = 1 + 1/x > 0 : une unique solution.

**Question 1 (`04`) — cas 2** : « g est continue et strictement croissante sur [0 ; 5],
g(0) = 2 et g(5) = 9. Combien l'équation g(x) = 0 a-t-elle de solutions sur [0 ; 5] ? »

| | proposition | |
|---|---|---|
| A | une seule, g est monotone | |
| B | on ne peut pas le savoir | |
| **C** | aucune, 0 n'est jamais atteint | ✅ **bonne réponse** |

*Exclusion* : « une », « on ne sait pas », « zéro » — trois nombres de solutions
incompatibles. A est le réflexe : stricte monotonie = unicité, en oubliant que 0 doit
d'abord être **atteint**.

**Question 2 (`07`) — cas 4** : « f est continue sur [0 ; 6], f(0) = −4 et f(6) = 2.
Qu'est-ce qui manque pour écrire « une unique solution » ? »

| | proposition | |
|---|---|---|
| A | que f soit dérivable sur [0 ; 6] | |
| **B** | que f soit strictement monotone | ✅ **bonne réponse** |
| C | rien, on peut déjà l'écrire | |

*Exclusion* : deux manques différents et « rien ne manque » : incompatibles. A est le
glissement classique — on se sert de f′ pour justifier la monotonie, donc on croit que
c'est la dérivabilité qu'on exige.

**Chapitres** : Une seule fois au kilomètre cent · Mathis sur le Grand Raid · Deux courbes,
deux réponses · Le corollaire du TVI · Question 1 · Réponse : ce qu'il faut vérifier avant
de compter · Un exemple complet · Le piège · Question 2 · Réponse : l'hypothèse qui
manque · La ligne qui change dans la copie · À toi de jouer · Correction · Ce que tu as
appris.

**Contre-contrôle du titre et de l'accroche** :

| | vérification |
|---|---|
| titre vs `04` | ⚠️ le titre dit « une seule fois », la bonne réponse est « aucune ». Il **ne donne donc pas** la réponse — et le réflexe qu'il installe est exactement celui que la question mesure. C'est voulu, et c'est noté ici pour que personne ne le « corrige » |
| titre vs `07` | le titre ne nomme ni la monotonie, ni la dérivabilité |
| accroche vs `04` | l'accroche parle d'un marcheur qui ferait demi-tour : c'est le cas 1 de l'écran idée, pas la question |
| ⚠️ accroche vs `07` | la dernière puce oppose « croissante » et « strictement croissante ». Elle **nomme la monotonie**, qui est la carte B. Elle ne dit pas qu'elle manque dans la copie de la question, mais c'est l'endroit le plus proche du fil rouge de toute la série : **à relire avec Frédéric**, et à réécrire en « deux mots qui ne valent pas le même nombre de points » si le doute subsiste |
| idée ≠ question | `02` = deux courbes dessinées, sans formule ; `04` = valeurs numériques sans zéro atteint ; `07` = une copie incomplète. Trois cas |

---

### E4 · `terminale-tvi-rediger`

**Micro** : `tvi_rediger` — Rédiger une justification conforme au bac avec le TVI.
**Centre** : `jeux-defis`. **Contexte** : Yoan relit sa copie de bac blanc, ligne par ligne.
**Script** : `manim/scripts/terminale/tvi_rediger.py`, scène `TviRediger`.

**Titre** : *Il a trouvé la bonne réponse et perdu les points — Rédiger le TVI au bac · Tle spé*

**Accroche** :

> Yoan a écrit la bonne conclusion : l'équation a une unique solution. Il a eu le quart
> des points. Ce qui manquait n'était pas le résultat — c'étaient les phrases qui
> autorisent à l'écrire. Dans un exercice de TVI, chaque ligne de la copie répond à une
> hypothèse du théorème, et une hypothèse non citée est une ligne non payée.
>
> Dans cette vidéo :
> • le théorème et la copie posés côte à côte : une hypothèse, une phrase
> • la formule exacte à citer, et pourquoi « d'après le TVI » ne suffit pas pour l'unicité
> • une copie complète sur 2 ln x + x − 4, où la continuité se justifie vraiment
> • trois phrases qui coûtent des points chaque année
> • deux copies à réparer : il manque une ligne, puis deux
>
> Deux questions-pauses et un défi corrigé. Entraîne-toi sur eleveai.fr

**Les écrans** :
- `02-idee` — **cas 1** : le théorème à gauche, la copie à droite, sur
  f(x) = 2x³ + 3x − 4 sur [0 ; 2] (f(0) = −4, f(2) = 18, f′(x) = 6x² + 3 > 0). Chaque
  hypothèse s'allume en même temps que la phrase qui la cite.
- `03-theoreme` — la formule exacte : « d'après le corollaire du théorème des valeurs
  intermédiaires », et les quatre lignes dans l'ordre.
- `05-appliquer` — **cas 3** : g(x) = 2 ln x + x − 4 sur [1 ; 4]. g(1) = −3, g(4) ≈ 2,77,
  g′(x) = 2/x + 1 > 0. ⭐ Ici la continuité se démontre (somme de fonctions continues sur
  ]0 ; +∞[) au lieu de se réciter : c'est E1 qui revient.
- `06-piege` — « croissante » au lieu de « strictement croissante » ; citer « le TVI »
  pour conclure à l'unicité, alors que c'est son corollaire ; oublier de dire sur quel
  intervalle.
- `08-rediger` — le modèle recopiable, avec ses quatre trous à remplir.
- `09-defi` / `09b` — **cas 5** : la copie de Yoan sur f(x) = x³ + 3x − 6 sur [1 ; 2]
  (f(1) = −2, f(2) = 8). Il manque **deux** phrases : la continuité comme polynôme, et
  f′(x) = 3x² + 3 > 0 donc strictement croissante.

**Question 1 (`04`) — cas 2** : « Dans une rédaction, à quoi sert la phrase « f(1) et f(3)
sont de signes contraires » ? »

| | proposition | |
|---|---|---|
| **A** | à dire que 0 est entre f(1) et f(3) | ✅ **bonne réponse** |
| B | à dire que f est continue | |
| C | à dire que f est strictement monotone | |

*Exclusion* : les trois hypothèses du théorème sont distinctes ; une phrase en sert une
seule.

**Question 2 (`07`) — cas 4** : « Une copie dit : « h est continue sur [2 ; 5] », « h(2) = −1
et h(5) = 6 », « donc h(x) = 0 admet une unique solution ». Que manque-t-il ? »

| | proposition | |
|---|---|---|
| A | la valeur approchée de la solution | |
| B | le calcul de h(3) | |
| **C** | la stricte monotonie de h | ✅ **bonne réponse** |

*Exclusion* : trois manques différents, un seul est une hypothèse du théorème.

**Chapitres** : Il a trouvé la réponse et perdu les points · Yoan relit sa copie · Une
hypothèse, une phrase · La formule exacte à citer · Question 1 · Réponse : à quelle
hypothèse cette phrase répond · Une copie complète · Le piège · Question 2 · Réponse :
l'hypothèse absente de la copie · Le modèle à recopier · À toi de jouer · Correction · Ce
que tu as appris.

**Contre-contrôle du titre et de l'accroche** :

| | vérification |
|---|---|
| titre vs `04` | le titre parle de points perdus, pas de signes, pas de 0, pas de f(1) ni f(3) |
| titre vs `07` | le titre ne nomme aucune des trois hypothèses |
| accroche vs `04` | « chaque ligne répond à une hypothèse » est la **méthode**, pas l'appariement demandé. Les trois cartes restent possibles après l'avoir lue |
| accroche vs `07` | la puce « deux copies à réparer : il manque une ligne, puis deux » donne le **nombre**, jamais **laquelle** |
| idée ≠ question | `02` = 2x³ + 3x − 4 ; `04` = une phrase isolée, sans fonction ; `07` = la copie de h sur [2 ; 5], des nombres qu'aucun autre écran n'emploie. ⛔ Une première version de `07` rejouait la copie du `02` : corrigé |

---

### E5 · `terminale-tvi-defi`

**Micro** : `tvi_defi` — Résoudre un exercice type bac avec continuité et TVI.
**Centre** : `sciences`. **Contexte** : Ryan, technicien à l'observatoire du Piton de la
Fournaise, suit l'écart entre l'inclinaison mesurée et celle que prévoit le modèle.
**Script** : `manim/scripts/terminale/tvi_defi.py`, scène `TviDefi`.

**Titre** : *Le théorème ne dit rien, et pourtant elle s'annule — Continuité et TVI, type bac · Tle spé*

**Accroche** :

> Sur l'écran de Ryan, une courbe : l'écart entre l'inclinaison mesurée du volcan et celle
> que prévoit le modèle. Quand l'écart vaut zéro, le modèle tombe juste. Au début de la
> matinée l'écart est positif, à la fin aussi — et pourtant la courbe a croisé le zéro en
> chemin. Un exercice de bac complet commence toujours par là : regarder comment la
> fonction varie avant de chercher où elle s'annule.
>
> Dans cette vidéo :
> • pourquoi appliquer le théorème sur tout l'intervalle fait rater des solutions
> • les variations d'abord : le signe de f′, puis le tableau
> • le théorème appliqué sur **chaque morceau strictement monotone**, un par un
> • un morceau où il n'y a rien à trouver, et comment on l'écrit quand même
> • l'encadrement à la calculatrice, et ce qu'on a le droit d'en conclure
>
> Deux questions-pauses et un défi corrigé. Entraîne-toi sur eleveai.fr

**Les écrans** :
- `02-idee` — **cas 1** : g(x) = (x − 1)² − 4 sur [−2 ; 4]. g(−2) = 5, g(1) = −4, g(4) = 5 :
  même signe aux deux bornes, et pourtant deux zéros (−1 et 3). On coupe en 1.
- `03-theoreme` — la méthode en quatre temps : continuité, variations, le théorème sur
  chaque morceau monotone, encadrement.
- `05-appliquer` — **cas 3** : f(t) = t³ − 3t + 1 sur [0 ; 2]. f′(t) = 3t² − 3 s'annule en
  1 ; f(0) = 1, f(1) = −1, f(2) = 3. Sur [0 ; 1] : strictement décroissante de 1 à −1, une
  unique solution α. Sur [1 ; 2] : strictement croissante de −1 à 3, une unique solution β.
- `06-piege` — appliquer le théorème sur [0 ; 2] entier ne donne **rien du tout** (f(0) = 1
  et f(2) = 3 sont du même signe) alors qu'il y a deux solutions ; « deux solutions » se
  démontre en deux fois ; un morceau sans changement de signe se conclut, il ne se saute
  pas.
- `08-rediger` — la copie complète : le tableau de variations, puis un bloc par morceau,
  puis l'encadrement.
- `09-defi` / `09b` — **cas 5** : f(x) = x³ − 12x + 5 sur [0 ; 3]. f′ s'annule en 2 ;
  f(0) = 5, f(2) = −11, f(3) = −4. Sur [0 ; 2], une solution ; sur [2 ; 3], **aucune**, car
  0 n'est pas entre −11 et −4. Réponse : **une seule solution**.

**Question 1 (`04`) — cas 2** : « Une fonction continue sur [0 ; 4] est strictement
décroissante de 5 à −2, puis strictement croissante de −2 à 3. Combien l'équation
f(x) = 0 a-t-elle de solutions ? »

| | proposition | |
|---|---|---|
| A | une seule | |
| **B** | exactement deux | ✅ **bonne réponse** |
| C | au moins une, sans pouvoir dire combien | |

*Exclusion* : « une », « deux », « on ne peut pas compter » — incompatibles. C est l'élève
qui applique le théorème sans la stricte monotonie et s'arrête à l'existence.

**Question 2 (`07`) — cas 4** : « À la calculatrice, f(0,3) ≈ 0,13 et f(0,4) ≈ −0,14. Que
peut-on écrire pour α ? »

| | proposition | |
|---|---|---|
| **A** | 0,3 < α < 0,4 | ✅ **bonne réponse** |
| B | α ≈ 0,13 | |
| C | 0,13 < α < 0,14 | |

*Exclusion* : trois écritures différentes de α, une seule vraie. B et C confondent les
**images** avec les **antécédents** — l'erreur de lecture du balayage.

**Chapitres** : Le théorème ne dit rien, et pourtant elle s'annule · Ryan et l'inclinaison
du volcan · Couper l'intervalle · La méthode en quatre temps · Question 1 · Réponse :
compter morceau par morceau · L'exercice complet · Le piège · Question 2 · Réponse : ce
que la calculatrice encadre vraiment · La copie type bac · À toi de jouer · Correction ·
Ce que tu as appris.

**Contre-contrôle du titre et de l'accroche** :

| | vérification |
|---|---|
| titre vs `04` | ⚠️ le titre dit « elle s'annule » au singulier ; la bonne réponse est « exactement deux ». Il ne nomme **aucun nombre** : A, B et C restent toutes possibles après l'avoir lu. ⛔ Les versions écartées disaient « deux fois zéro » (= la carte B) et « quand il faut couper en deux » (trop proche) |
| titre vs `07` | le titre ne porte aucun chiffre, et la question est numérique |
| accroche vs `04` | l'accroche dit « il est passé deux fois par zéro » — mais pour la **courbe de Ryan**, qui est le cas 3, pas pour la fonction de la question. ⚠️ C'est le seul endroit de la série où un nombre de solutions est écrit avant une question qui en demande un : les deux cas sont différents (une courbe de volcan ; une fonction donnée par ses variations), **et la réponse reste à compter**. À relire avec Frédéric |
| accroche vs `07` | « l'encadrement à la calculatrice, et ce qu'on a le droit d'en conclure » : pose la question, ne la tranche pas |
| idée ≠ question | `02` = une parabole décalée, deux zéros, coupée en 1 ; `04` = une fonction décrite par ses seules variations, sans formule ; `07` = l'encadrement de α, qui n'a été fait nulle part avant. Trois cas |

---

## 6. Le contre-contrôle, et l'instrument qui le mesure

### ⭐⭐ `manim/poste2/verifier-accroches-continuite-tvi.py` — il n'existait pas

La règle « une carte ne doit pas être réfutable en se rappelant l'accroche — ni le titre —
mot pour mot » a été écrite le 26/11 **à la relecture**, après coup, et les deux paysages
fautifs sont en production. Il n'y avait aucun instrument. En voici un :

```
python -X utf8 manim/poste2/verifier-accroches-continuite-tvi.py              # le manifeste
python -X utf8 manim/poste2/verifier-accroches-continuite-tvi.py --etalonner  # la règle graduée
```

Il lit le manifeste — **source unique, rien de recopié** — et mesure, pour chacune des 30
cartes, la part de ses mots de contenu que contient **un seul segment** du titre ou de
l'accroche.

⭐⭐ **Segment par segment, et c'est tout le sujet.** La première version comparait la
carte à l'accroche entière : elle criait sur E2 `07` carte A (« rien : 0 n'est pas entre 2
et 8 ») parce que l'accroche écrit « −2 °C » dans une phrase, « 0 °C » dans une autre et
« entre » dans une troisième. **Trois coïncidences dans trois phrases ne réfutent rien** —
personne ne se souvient d'une accroche en vrac. Une carte réfutable l'est par UNE phrase.

### ⭐⭐ L'étalon : le seuil vient des quatre cas connus, pas d'une intuition

| cas réel (série espace) | mesure | attendu |
|---|---|---|
| « La grande diagonale d'un cube ne fait pas 45° » / carte « 45 degrés » | **50 %** | doit crier |
| « En son milieu ? Non. » / carte « au milieu de [AG] » | **50 %** | doit crier |
| « Beaucoup de copies se trompent » / carte « 45 degrés » (réécrit) | **0 %** | doit se taire |
| « Pas là où on le croit. » / carte « au milieu de [AG] » (réécrit) | **0 %** | doit se taire |

Seuil retenu : **50 %**, et `--etalonner` affiche 4 cas / 0 désaccord.
⚠️ **La marge est nulle du côté « doit crier »** : les deux défauts connus tombent
exactement SUR le seuil. Un mot de plus dans une de ces cartes et l'instrument se tait.
⛔ Donc il confirme, il n'innocente pas.

⛔ **Et une coupe, une seule, affichée à chaque passage** : le pied de page
« Deux questions-pauses et un défi corrigé », identique dans toutes les accroches de
toutes les séries, est retiré du texte mesuré. Son « Deux » faisait crier E5 `04` contre
la carte « exactement deux » : l'instrument lisait un nombre de questions comme un nombre
de solutions. Retirer du texte mesuré ce qui dérange est la façon la plus simple de faire
mentir un instrument — c'est pour ça que la coupe est à forme exacte, et visible.

### ⭐ Troisième mode : `--voix`, la voix contre le manifeste

```
python -X utf8 manim/poste2/verifier-accroches-continuite-tvi.py --voix
```

La règle de la série est « la question dit à l'écran exactement ce que la voix dit, mot
pour mot ». Ce mode la mesure : pour chaque carte, il cherche la proposition dans la
phrase du clip `04-question` / `07-question`, **après avoir remis en chiffres les nombres
écrits en lettres** (l'écran dit « 4 », la voix dit « quatre »). Il vérifie aussi que le
clip de réponse commence bien par « Réponse A. », « Réponse B. » ou « Réponse C. », et que
la question finit par « Mets pause, et choisis ! ». Un épisode non encore mis en voix est
annoncé « voix pas encore écrite » — **jamais compté comme bon**.

État : **30 cartes comparées (les 5 épisodes), 0 écart.**

⭐ **Deux notations lui ont été apprises, et c'est du gain, pas une excuse.** Il criait
sur E4 `04` carte A (« à dire que 0 est entre f(1) et f(3) ») et E4 `07` carte B (« le
calcul de h(3) »), deux cartes pourtant justes : il ne savait pas lire une image de
fonction. `f(1)` est maintenant ramené à « f de 1 » avant comparaison, ce que la voix
prononce exactement. ⛔ Ces deux cartes ne sont **pas** parties dans la liste des
symboles à relire : la correspondance est exacte et mécanique, donc elle se vérifie — et
une carte vérifiée vaut mieux qu'une carte confiée à l'œil.

⭐⭐ **Et il a sorti une famille le premier jour** : certaines cartes sont écrites en
SYMBOLES à l'écran — « sur ]0 ; +∞[ » — alors que la voix dit « sur zéro plus l'infini,
crochets ouverts ». **Les deux sont justes, et aucune machine ne peut dire qu'ils
désignent la même chose.** ⛔ On n'a donc pas fait taire l'instrument : il les range à
part et les nomme, à chaque passage. C'est la même famille que le « hors audit » de la
série espace (la voix dit « moins 1 », l'écran écrit « −1 »).

⚠️⚠️ **LES 7 CARTES QUI NE SONT VÉRIFIÉES PAR AUCUNE MACHINE** — à relire à l'œil avant
l'enregistrement, c'est la seule chose qui les couvre :

| carte | à l'écran | ce que la voix dit |
|---|---|---|
| E1 `07` A | `sur ℝ tout entier` | sur l'ensemble des réels tout entier |
| E1 `07` B | `sur ]0 ; +∞[` | sur zéro plus l'infini, crochets ouverts |
| E1 `07` C | `sur [0 ; +∞[` | sur zéro plus l'infini, crochet fermé en zéro |
| E3 `07` A | `que f soit dérivable sur [0 ; 6]` | que f soit dérivable sur l'intervalle zéro six |
| E5 `07` A | `0,3 < α < 0,4` | zéro virgule trois est plus petit qu'alpha, lui-même plus petit que zéro virgule quatre |
| E5 `07` B | `α ≈ 0,13` | alpha vaut environ zéro virgule treize |
| E5 `07` C | `0,13 < α < 0,14` | zéro virgule treize est plus petit qu'alpha, lui-même plus petit que zéro virgule quatorze |

⛔ **E5 `07` est la question la plus exposée de la série** : ses TROIS cartes sont dans ce
tableau, donc l'instrument n'y vérifie rien du tout. ⚠️ Et ses cartes sont longues à
l'oral : la carte A fait 17 mots dits. À surveiller au moment de l'écran — `choix3`
plafonne à trois lignes de quatorze caractères, et la question ne doit pas dépasser deux
lignes sinon le bloc descend sur Ti-Margo.

### ⛔⛔ « La virgule finale » — l'instrument sous-comptait depuis son premier passage

Trouvé le 27/11 au soir, **en lisant sa sortie**, pas par un contrôle : la fiche de
relecture annonçait **0 %** entre la carte « une seule, g est monotone » et le titre
« Une seule fois au kilomètre cent ». `plat()` garde la virgule — il le faut, « 0,13 »
est un nombre — donc « seule, » et « seule » étaient deux mots différents. **Tout mot
suivi d'une virgule était invisible à l'instrument.**

⭐ Corrigé : la ponctuation est retirée aux DEUX BOUTS seulement, « 0,13 » reste entier.
L'étalon continue de séparer les quatre cas connus (50 / 50 contre 0 / 0), et la série
passe de 0 à **2 alertes**.
⛔ La leçon : **un instrument qui sous-compte se tait — c'est sa façon d'échouer.** Un
zéro n'est une bonne nouvelle que si on a vu l'instrument crier au moins une fois.

### Ce qu'il ne voit pas (écrit dans son en-tête, à ne pas oublier)

- ⛔ il compare des **mots**, pas du sens : « il n'y a aucune solution » et « le théorème
  ne conclut pas » ne partagent presque rien et s'opposent pourtant dans une tête d'élève ;
- ⛔ il ne vérifie pas que les trois propositions **s'excluent** — aucun instrument ne sait
  le faire ;
- ⛔ il ne vérifie pas que `02-idee` traite un autre cas que les questions.

### Le résultat, épisode par épisode

⚠️ **CHIFFRES CORRIGÉS LE 27/11 AU SOIR** — l'instrument sous-comptait (voir plus bas,
« la virgule finale »). Il annonçait 0 alerte ; après correction il en trouve **2**,
les deux sur E3 `04` carte A. Recouvrement maximal, mesure juste :

| épisode | `04` | `07` | titre réfute-t-il une carte ? | `02-idee` ≠ `04` ≠ `07` |
|---|---|---|---|---|
| E1 | 33 % | 0 % | non | ✅ 3 cas |
| E2 | 0 % | 40 % | non | ✅ 3 cas |
| E3 | **50 %** ⛔ | 33 % | ⚠️ voir ci-dessous — c'est LA décision à prendre | ✅ 3 cas |
| E4 | 0 % | 33 % | non | ✅ 3 cas |
| E5 | 0 % | 0 % | non | ✅ 3 cas |

**Les deux réécritures que ce contrôle a imposées** :

1. **E2, la puce du piège.** Écrite « le piège : sans changement de signe, le théorème ne
   dit RIEN », c'était mot pour mot la carte A de `07`. Devenue « ce que le théorème ne dit
   pas quand f(a) et f(b) ont le même signe » : la forme est gardée, le verdict retiré.
   Trouvé à la relecture, avant l'instrument.
2. **E5, la phrase d'ouverture.** « …et pourtant il est passé deux fois par zéro » mesure
   **50 %** contre la carte B « exactement deux » (vérifié en rejouant l'ancienne phrase).
   Ma relecture l'avait marquée « à relire » sans trancher ; l'instrument a tranché.
   Devenue « …et pourtant la courbe a croisé le zéro en chemin ».

**Les deux points que l'instrument laisse passer et qui restent à l'appréciation de Frédéric** :

- **E3, le titre.** « Une seule fois au kilomètre cent » installe exactement le réflexe que
  `04` mesure (la bonne réponse y est « aucune »). Il ne donne aucune réponse — il tend un
  piège. C'est voulu, et c'est écrit ici pour que personne ne le « corrige » par accident.
- **E3, la dernière puce de l'accroche.** Elle oppose « croissante » et « strictement
  croissante », donc elle **nomme** la monotonie, qui est la carte B de `07`. Mesure :
  33 %, parce qu'elle ne dit pas que c'est elle qui manque dans la copie. C'est l'endroit
  le plus serré de la série.

⛔ Ces arbitrages se font **avant** l'enregistrement des voix : après, chaque mot changé
coûte un WAV et un rendu.

---

## 7. La chaîne qui reste, dans l'ordre

| # | étape | état |
|---|---|---|
| 1 | manifeste des 5 épisodes | ✅ **ce fichier** |
| 1 bis | contre-contrôle outillé des titres et des accroches, avec son étalon | ⚠️ 30 cartes, **2 alertes**, les deux sur E3 `04` A |
| 1 ter | **passe maths du manifeste**, recalculée | ✅ 59 contrôles, 0 erreur |
| 2 | relecture de Frédéric : les 5 titres, les 5 accroches, les 2 points du § 6 | ⏳ **le prochain geste** |
| 3 | `manim/poste2/VOIX-continuite-tvi.md` — 5 × 15 clips, tout en toutes lettres | ✅ **les 75 clips écrits** |
| 3 bis | la voix comparée au manifeste, carte par carte (`--voix`) | ✅ 30 cartes, 0 écart |
| 4 | extraction des JSON de voix, passe gabarit **et passe maths recalculée** | ⏳ |
| 5 | WAV + marques (`-Debit -6` **aux deux étapes**) | ⏳ |
| 6 | `manim/poste2/analyse_ecrans.py` — le socle d'écran de la série | ✅ |
| 7 | les 5 scripts Manim + la mesure hors rendu des questions-pauses | ✅ 10 questions, 0 ennui |
| 8 | `verifier-avant-rendu.py`, puis dry run `AUDIT=1 BORDS=1` | ✅ 5 × 15 écrans, 0 bord, 0 audit |
| 9 | planches `-ql` **regardées à l'image** | ✅ les 5, et corrigées d'après ce qu'on y a vu |
| 10 | voix validée par Frédéric, rendu HD (verrou `mkdir`/`rmdir` partagé) | ⏳ |
| 11 | vignettes, envoi R2, clés à la main dans `lib/videos/videos-r2.json` | ⏳ |
| 12 | fusion dans `main` **par union de clés**, déploiement, URL en 200 | ⏳ |
| 13 | **et seulement alors** les lignes de `notion_ressources` | ⏳ |

⛔ Une ligne de coach écrite avant le déploiement donne un bouton mort : c'est arrivé le
24/11 sur les douze paysages de l'espace.

### Les pièges hérités à relire avant d'écrire les scripts

- `manim/REPRISE-espace-terminale.md` — la méthode entière, et notamment : la planche ne
  montre que la **dernière image** d'un écran ; `col()` rapetisse un bloc sans le dire ;
  un gros `AUDIT-TARD` cache une vraie avance ; l'écran de réponse **hérite** de l'écran
  de question.
- `manim/REPRISE-entiers-cm1-6e.md` — ses 43 pièges valent ici.
- ⛔ Ne **jamais** lancer `node scripts/generer-videos-r2.mjs` : il sort du registre toute
  vidéo dont le MP4 n'est pas sur ce disque.

---

## 8. Où j'en suis exactement (27/11/2026)

**Fait** :
- lecture des 5 shorts (`continuite_tvi_short.py`) et de la vieille paysage de notion
  (`continuite_tvi.py`) — le § 3 dit ce qu'ils occupent déjà ;
- `manim/poste2/tirage-lettres-continuite-tvi.py` — le tirage des 10 lettres, rejouable ;
- ce manifeste : 5 titres, 5 accroches, 5 × 14 chapitres, 10 questions avec leurs
  propositions, leur bonne réponse et leur contrôle d'exclusion, et le contre-contrôle
  titre / accroche de chaque épisode ;
- `manim/poste2/verifier-accroches-continuite-tvi.py` — l'instrument du contre-contrôle,
  avec son étalon (§ 6) : **30 cartes, 0 alerte**, et deux réécritures qu'il a imposées ;
- `manim/poste2/controler-maths-continuite-tvi.py` — **la passe maths du manifeste** :
  les 59 affirmations chiffrées du § 5 recalculées, pas relues. f(0), f(2), les signes de
  f′, le nombre de solutions de chaque exemple et de chaque défi (compté par changement
  de signe, pas annoncé). **59 contrôles, 0 erreur.** ⭐ À relancer après chaque retouche
  d'un exemple : c'est exactement là qu'une erreur se fait ENSEIGNER.

- `manim/poste2/VOIX-continuite-tvi.md` — les règles d'écriture de la série, la table des
  lettres, et **les 5 épisodes mis en voix : 75 clips**. Le texte seul, mesuré par
  l'instrument : 30 cartes, 0 écart, 7 cartes en symboles listées pour relecture.

- `manim/voix/terminale-*.json` — les 5 voix extraites par
  `manim/poste2/voix-continuite-depuis-md.py` (qui refuse d'écrire si un des 15 clips
  manque : un clip absent passerait en silence, `dire()` rendant 0,0 sans rien dire) ;
- `manim/poste2/analyse_ecrans.py` — le socle d'écran, recopié de `espace_ecrans.py`
  sans le 3D, avec axes, courbes, pointillés, bandes, fonctions en deux morceaux,
  escaliers et **tableau de variations** ;
- `manim/poste2/mesure-continuite-tvi.py` — la mesure hors rendu des 10 questions ;
- les **5 scripts Manim**, 15 écrans chacun : dry run `AUDIT=1 BORDS=1` à **0 bord et
  0 audit**, et les 5 planches `-ql` **regardées**, puis corrigées.

**Pas fait, et volontairement** : **aucun WAV, aucun rendu HD** ; aucune écriture dans
un registre ni dans `notion_ressources` ; aucun push.

⛔ **Pourquoi aucun WAV** : les titres et les accroches ne sont pas relus. Le texte d'une
voix se corrige pour rien ; un WAV enregistré, lui, périme son rendu, et personne ne le
signale. On écrit le texte, on n'enregistre pas.

**Tranché par le chef d'orchestre le 27/11, à ne pas rouvrir** :
- **trois cartes, pas quatre** — le socle `carte_choix` / `q_tete` / `q_montrer_choix` ne
  se rouvre pas, ce serait un chantier à part et il n'est pas ouvert ;
- **E3 reste tel quel** : son titre qui tend volontairement le piège, et sa puce qui nomme
  la monotonie, sont remontés à Frédéric — c'est son écriture, pas une correction à faire ;
- **aucun WAV, aucun rendu** tant que le chef ne l'a pas dit.

**Le prochain geste, dans cet ordre** :
1. la relecture de Frédéric : les 5 titres, les 5 accroches, les deux points du § 6,
   **les 7 cartes en symboles**, et les planches `-ql` (elles sont dans le dossier de
   travail de la session, à refaire par la commande du § 9 si besoin) ;
2. les WAV et les marques, **une fois le feu vert donné** — `-Debit -6` **aux deux
   étapes**, sinon les marques datent une autre voix que le WAV et tous les `au_mot`
   glissent sans qu'aucun outil le dise. Puis poser `fichier_marques` dans chaque
   épisode : rien d'autre ne change, et les `au_mot` deviennent exacts ;
3. **re-dry-run et re-planches avec les marques** : la synchronisation n'a été vérifiée
   par personne jusque-là (voir § 9) ;
4. seulement ensuite le HD, les vignettes, R2, le registre, `main`, le déploiement, et
   en tout dernier les lignes de coach.

⭐ **Les trois commandes qui disent où on en est**, à relancer après chaque retouche :

```
python -X utf8 manim/poste2/verifier-accroches-continuite-tvi.py            # 30 cartes, 2 alertes (E3)
python -X utf8 manim/poste2/verifier-accroches-continuite-tvi.py --voix     # 30 cartes, 0 écart
python -X utf8 manim/poste2/verifier-accroches-continuite-tvi.py --etalonner  # 4 cas, 0 désaccord
python -X utf8 manim/poste2/controler-maths-continuite-tvi.py               # 73 contrôles, 0 erreur
```

⭐ La passe maths couvre maintenant aussi **les décompositions dites à haute voix** : une
correction ne donne pas un résultat, elle le déroule (« huit, moins vingt-quatre, plus
cinq : moins onze »), et chacun de ces nombres est enseigné. Une faute d'étape passe
inaperçue quand le total, lui, est juste.

---

## 9. Les scènes Manim — ce que la planche a trouvé, et ce qu'elle ne peut pas trouver

Les 5 épisodes passent, chacun : **15 écrans, 0 bord, 0 audit**, et leur planche `-ql` a
été **regardée à l'image** puis corrigée.

```
python -X utf8 manim/poste2/mesure-continuite-tvi.py                       # 10 questions, 0 ennui
AUDIT=1 BORDS=1 python -m manim render -ql --disable_caching --dry_run \
  manim/scripts/terminale/<script>.py <Scene> --media_dir manim/scripts/terminale/media
python -m manim render -ql --disable_caching manim/scripts/terminale/<script>.py <Scene> \
  -o <nom>-ql --media_dir manim/scripts/terminale/media
python scripts/planche-video.py <...>/<nom>-ql.mp4 <planche>.png 4
```

### ⛔⛔ LA PLANCHE PÉRIMÉE — le défaut le plus coûteux de la journée

**Ce qui s'est passé.** J'ai vu le carré vide sur la planche de E1, corrigé les glyphes
⩽ / ⩾ en ≤ / ≥, ajouté un garde-fou dans le socle qui REFUSE les deux mauvais, relancé
le dry run — propre — et commité. **Je n'ai jamais re-rendu l'épisode.** J'ai relu sa
planche en croyant regarder le nouveau rendu : le carré y était toujours, et je l'ai lu
comme un glyphe à la taille de la vignette. Il a fallu qu'une session sœur le reprenne
au pixel pour que ça se voie — le carré porte `2A` / `7E` écrits en tout petit dedans,
c'est la façon dont Pango affiche un codepoint sans glyphe.

**Les trois mesures qui ont tranché, dans l'ordre :**

1. la source dit bien `≥` (U+2265) à la ligne 428 — donc ni le texte ni le garde-fou
   n'étaient en cause ;
2. un rendu minimal de `Text("x ≥ 1")`, `Text("x ≤ 2")`, `Text("x ≠ 3")` les affiche
   **tous les trois parfaitement** — donc ni la police ni Manim ;
3. `stat` sur les deux fichiers : le MP4 datait de **06:21:27**, la source de
   **06:22:55**. **La source était plus récente de 88 secondes que la vidéo.**

Il n'y avait aucune transformation à trouver : l'artefact était simplement vieux.

⭐⭐ **LA LEÇON, et elle vaut au-delà de cette série : « planche regardée » n'est vrai
que de l'artefact qu'on a effectivement RECONSTRUIT.** Un dry run propre ne reconstruit
rien. Entre la correction et la planche il y a un rendu, et rien ne rappelle de le
faire — ni Manim, ni le dry run, ni la planche elle-même, qui s'ouvre sans dire son âge.

⭐ **L'instrument qui manquait** : `python -X utf8 manim/poste2/fraicheur-planches.py`.
Il compare chaque MP4 `-ql` à **trois** dates : son script, **le socle d'écran**, et sa
voix. Il imprime la commande de re-rendu de chaque planche périmée.
⚠️ Il ne regarde que les dates : une planche fraîche peut être mauvaise, une planche
périmée est forcément à refaire. Il dit « à refaire », jamais « c'est bon ».
⭐⭐ Et il en a trouvé **deux**, pas une : E2 aussi était périmée — par une modification
du SOCLE, 56 secondes après son rendu. C'est le cas le plus facile à oublier, parce
qu'on pense à son épisode et pas à l'outil commun : **une correction dans le socle
périme les cinq planches d'un coup.**

**Vérification faite après re-rendu, au pixel**, sur les trois seuls endroits de la
série où un symbole de comparaison est écrit à l'écran :

| | écran | affiché | état |
|---|---|---|---|
| E1 `04` | la légende de g | `g(x) = x² si x ≤ 2, / 3x − 2 si x > 2` | ✅ vrai ≤ |
| E1 `09b` | la correction | `√(x − 1) : x ≥ 1` | ✅ vrai ≥ |
| E3 `04b` | la réponse | `g(x) ≥ 2 sur [0 ; 5]` | ✅ vrai ≥ |

Les cinq planches ont été refaites et regardées ensuite ; `fraicheur-planches.py` rend
**0 planche à refaire**.

### ⛔⛔ Deux glyphes sortent en CARRÉ VIDE, et rien ne le dit

« ⩽ » (U+2A7D) et « ⩾ » (U+2A7E) ne sont pas dans la police. Ni le dry run ni l'audit ne
voient un tofu : ce n'est ni un bord, ni un nombre. Vu à la planche de E1, sur « x ⩽ 2 »
et « x ⩾ 1 ». Les bons sont **« ≤ » (U+2264) et « ≥ » (U+2265)**, et `EcransAnalyse.t`
**refuse** maintenant les deux mauvais, avec le bon caractère dans le message.
⚠️ Vérifiés bons à l'image : ≠, ∞, ℝ, √, ⟹, α, β, ≈, ′.

### ⛔⛔ Une graduation ancrée sur `c2p(0, v)` part hors cadre quand 0 n'est pas dans l'intervalle

Avec des x de 6 à 12,4, les étiquettes de l'axe vertical se posaient à **x = −11,9** —
très au-delà du cadre (±7,1). Elles ne s'affichaient nulle part, et seul `BORDS=1` l'a
dit : 6 étiquettes sur 3 écrans. `plan_axes` ancre désormais sur la borne de
l'intervalle quand 0 n'y est pas.

### ⭐⭐ La règle qui a corrigé TROIS chevauchements : un bloc se pose par rapport au précédent

Trois fois le même accident, sur trois épisodes : un bloc posé à une **ordonnée devinée**
dans la colonne de gauche s'écrivait sur celui du dessus (E2 `04b`, E4 `07b`, E5 `07b`).
⛔ Le dry run ne le voit pas — deux objets qui se chevauchent sont tous les deux dans la
marge. ⭐ Le remède : `next_to(precedent, DOWN, buff=…).align_to(premier, LEFT)`. Et
quand le bloc du dessus est la *question* à laquelle le nouveau répond, mieux encore :
`ReplacementTransform` — la ligne devient sa propre réponse (E2 `04b` et `07b`).

### ⚠️ `col()` rétrécit en silence sous −1,95, et seule la planche le montre

Son garde-fou Ti-Margo (« bas sous −1,95 **et** droite au-delà de 5,3 → réduire ») est
bon, mais invisible : sur E3 deux blocs sortaient deux fois trop petits. Remèdes, dans
l'ordre de préférence : remonter le bloc, raccourcir le texte, baisser la police d'un
cran. ⚠️ Et les deux contraintes se contredisent (trop haut = chevauchement, trop bas =
rétrécissement) : sur E3 `06` il a fallu 26 px à y = −1,45 pour tenir les deux.

### ⚠️ Une figure trop écrasée ment sur ce que le texte affirme

Sur E3 `02`, l'écran disait « elle coupe trois fois » et la courbe n'en montrait que
deux : son creux descendait à −1,6 sur une figure de 1,6 de haut, soit 0,26 d'écran.
Aucun instrument ne compare un texte à une figure. Amplitude portée à 3,2, hauteur à 1,9.

### ⭐ Le socle tourne SANS WAV, et il le DIT

`dire()` imprime une bannière au premier clip : « SANS MARQUES — les `au_mot` sont
ESTIMÉS au prorata des caractères ». ⛔ C'est ce qui permet de faire des planches
aujourd'hui, et c'est aussi la limite de ce qu'elles prouvent : **la mise en page est
vérifiée, la SYNCHRONISATION ne l'est par personne.** Le jour des WAV, il suffit de poser
`fichier_marques` dans chaque épisode — rien d'autre ne change — puis de **refaire dry
run et planches**.

### ⚠️ `grep "^ECRAN"` SOUS-COMPTE — piège hérité, confirmé ici

Sur le premier dry run, le `grep` ancré annonçait 14 écrans, 0 question et 0 audit ; le
vrai compte était 15, 2 et 1. Les signalements tombent **sur les barres de progression**.
⭐ On écrit la sortie dans un fichier, on éclate les `\r` en `\n`, et on compte sans ancre.

### ⚠️ L'audit est en grande partie DÉSARMÉ dans cette série, et c'est mesurable

`grep -c "self.lettres(" manim/scripts/terminale/{continuite_reconnaitre,tvi_*}.py`
compte ce que l'audit ne voit pas. La cause est écrite dans la docstring de
`EcransAnalyse.lettres` : les voix disent les valeurs **en toutes lettres**, l'écran les
écrit en chiffres. ⭐ Il reste utile là où on ne l'a pas désarmé : il a sorti 8 nombres
affichés que la voix ne dit pas, dont un dans une FINALE — l'écran où tout est enseigné.
⭐ Ce qui le rendrait entier : une passe sur `VOIX-continuite-tvi.md` écrivant les valeurs
en chiffres, comme la série espace. **Mécanique, et à faire AVANT les WAV.**

---

# 10. LA RELÈVE — reprendre la série sans moi

*(écrit le 27/11/2026 par la session qui a produit le manifeste, les voix et les cinq
scènes. Règle de Frédéric : une seule productrice par série, relève à 65 % de contexte.)*

## 10.1 Où en est chaque épisode, exactement

⭐ **« Regardé » et « dry run propre » ne sont pas la même chose**, et la colonne de
droite le dit : le dry run voit les bords et les nombres, la planche voit l'image.

| | épisode | script | voix | mesure | dry run | planche `-ql` **regardée** | WAV | HD |
|---|---|---|---|---|---|---|---|---|
| E1 | `continuite_reconnaitre` | ✅ | ✅ 15 clips | ✅ | ✅ 15 écrans, 0 bord, 0 audit | ✅ **refaite et regardée au soir** (⚠️ la 1ʳᵉ lecture portait sur un rendu PÉRIMÉ) | ⛔ | ⛔ |
| E2 | `tvi_appliquer` | ✅ | ✅ 15 clips | ✅ | ✅ 15 / 0 / 0 | ✅ **refaite et regardée au soir** (⚠️ idem, périmée par le socle) | ⛔ | ⛔ |
| E3 | `tvi_unicite` | ✅ | ✅ 15 clips | ✅ | ✅ 15 / 0 / 0 | ✅ **2 fois** | ⛔ | ⛔ |
| E4 | `tvi_rediger` | ✅ | ✅ 15 clips | ✅ | ✅ 15 / 0 / 0 | ✅ **2 fois** | ⛔ | ⛔ |
| E5 | `tvi_defi` | ✅ | ✅ 15 clips | ✅ | ✅ 15 / 0 / 0 | ✅ **2 fois** | ⛔ | ⛔ |

✅ **LES CINQ PLANCHES SONT VALIDÉES PAR FRÉDÉRIC (27/11/2026)** : « les écrans sont
parfaits ».

⛔⛔ **MAIS CETTE VALIDATION A ÉTÉ DONNÉE SUR DES ÉCRANS QUI CONTENAIENT ENCORE UN CARRÉ
VIDE** (E1, écran « Correction », U+2A7E — voir § 9, « la planche périmée »). Elle ne le
couvre donc pas : **personne ne valide un défaut qu'on ne lui a pas montré.** Ce n'est
le reproche de personne, et c'est écrit ici pour que dans six mois quelqu'un ne croie
pas que ce tofu avait été accepté. Les planches ont été refaites et regardées depuis,
le carré n'y est plus.

⛔ **Ce que ce oui couvre, et rien de plus : l'IMAGE.** Il ne vaut ni pour
l'écriture (les titres, les accroches, et les deux points du § 10.4 restent ouverts), ni
pour l'arithmétique — c'est la leçon de la série des entiers, où une voix validée disait
« 6 032 a 3 centaines ». Ici les nombres sont tenus à part, par
`controler-maths-continuite-tvi.py`, et c'est lui qui en répond.

⚠️ **Ce que ces planches NE prouvent pas** : la synchronisation. Elles ont été faites
sans marques, donc tous les `au_mot` y sont estimés au prorata des caractères. Elles
jugent la **mise en page**, et seulement elle. Une fois les WAV faits, il faut **refaire
dry run et planches** : c'est là qu'apparaîtront les `RETARD` et les `AUDIT-AVANCE` que
personne n'a encore vus.

⚠️ Les durées `-ql` (1 min 15 à 1 min 35) ne veulent rien dire : sans WAV, chaque écran
ne dure que ses animations. Avec les voix, compter 5 à 7 minutes par épisode.

## 10.2 Les commandes, exactement

**Régénérer une planche** (les cinq se font ainsi, en changeant les trois noms) :

```
python -m manim render -ql --disable_caching manim/scripts/terminale/tvi_appliquer.py TviAppliquer -o e2-ql --media_dir manim/scripts/terminale/media
python scripts/planche-video.py manim/scripts/terminale/media/videos/tvi_appliquer/480p15/e2-ql.mp4 planche-e2.png 4
```

| | script | scène |
|---|---|---|
| E1 | `continuite_reconnaitre.py` | `ContinuiteReconnaitre` |
| E2 | `tvi_appliquer.py` | `TviAppliquer` |
| E3 | `tvi_unicite.py` | `TviUnicite` |
| E4 | `tvi_rediger.py` | `TviRediger` |
| E5 | `tvi_defi.py` | `TviDefi` |

**Le dry run** — ⚠️ écrire dans un fichier et éclater les retours chariot, sinon le
`grep` sous-compte (voir § 9) :

```
AUDIT=1 BORDS=1 python -m manim render -ql --disable_caching --dry_run manim/scripts/terminale/tvi_defi.py TviDefi --media_dir manim/scripts/terminale/media > dry.log 2>&1
tr "\r" "\n" < dry.log > dry.txt
grep -c ECRAN dry.txt ; grep -c AUDIT- dry.txt ; grep -c "BORD " dry.txt
```

**Les cinq contrôles qui disent où on en est** :

```
python -X utf8 manim/poste2/verifier-accroches-continuite-tvi.py
python -X utf8 manim/poste2/verifier-accroches-continuite-tvi.py --voix
python -X utf8 manim/poste2/verifier-accroches-continuite-tvi.py --etalonner
python -X utf8 manim/poste2/controler-maths-continuite-tvi.py
python -X utf8 manim/poste2/mesure-continuite-tvi.py
python -X utf8 manim/poste2/fraicheur-planches.py
```

Attendus, au 27/11 au soir : 30 cartes / **2 alertes, les deux sur E3 `04` A** ·
30 cartes / 0 écart · 4 cas / 0 désaccord ·
73 contrôles / 0 erreur · 10 questions / 0 ennui.

**Les WAV, quand le feu passera au vert** — le script est écrit, il n'a jamais tourné :

```
bash manim/poste2/voix-continuite-tous-les-wav.sh
```

⚠️ `-Debit -6` **aux deux étapes** : `generer-voix.ps1` a pour défaut −18 et
`marques_dump.ps1` −10. Deux débits différents = des marques qui datent une AUTRE voix
que le WAV, tous les `au_mot` glissent, et **aucun outil ne le dit**. Le script le fait
déjà ; ne pas le court-circuiter.
⭐ Et **seulement après** : poser `fichier_marques = "<script>_marques.json"` dans chaque
classe de scène. Rien d'autre ne change dans le code.

**Si une voix change** : on corrige `manim/poste2/VOIX-continuite-tvi.md`, jamais les
JSON, puis `python -X utf8 manim/poste2/voix-continuite-depuis-md.py --tout`.

## 10.3 Ce que les planches ont imposé — et ce que j'ai vu à l'écran

⭐ C'est la partie qui ne se retrouve pas dans un diff.

| ce que j'ai VU | l'épisode | la correction |
|---|---|---|
| « 5 < 7 < 9 » écrit **par-dessus** « f(x) = 7 ? », les deux lisibles l'un dans l'autre | E2 `04b` | la ligne de question devient sa propre réponse (`ReplacementTransform`) |
| l'explication de la réponse écrite **sur le rappel** de la colonne de gauche, resté affiché | E1 `07b` | `FadeOut` du rappel avant l'explication |
| « g(x) ⩽²x²=si4x ▮ 2 » — une bouillie de trois textes au même endroit, avec un **carré vide** au milieu | E1 `04` | légende remontée **au-dessus** des axes ; et les glyphes ⩽ / ⩾ remplacés par ≤ / ≥ |
| « √(x − 1) : x ▮ 1 » — le carré vide, encore | E1 `09b` | idem, et le socle REFUSE maintenant ces deux glyphes |
| un graphique **vide** avec deux points flottants, sans rien qui dise à quoi ils correspondent | E2 `01` | pointillés vers les deux axes |
| « monotone SUR l'intervalle… » sorti **deux fois plus petit** que les lignes voisines | E3 `06` | remonté à −1,45 et passé à 26 px (les deux contraintes se contredisent : § 9) |
| la courbe annoncée « elle coupe trois fois » n'en montrait que **deux** | E3 `02` | amplitude 2,6 → 3,2, hauteur 1,6 → 1,9 |
| « → une seule : NON » écrit **sur** « A confond la démonstration » | E4 `07b` | les blocs se posent par `next_to` les uns sous les autres |
| « des IMAGES » écrit **sur** « la fonction change de signe » | E5 `07b` | idem |
| la question de `07` lisible **deux fois plus petite** que les autres écrans | E2 `07` | données passées à gauche, cartes élargies à 6,0 |

## 10.4 Les deux points d'ÉCRITURE encore ouverts — ⛔ ne pas les « corriger »

Ils sont détaillés au § 6, et ils attendent la parole de Frédéric. **Ce ne sont pas des
défauts** : ce sont des choix d'écriture, et quelqu'un qui les prendrait pour des
erreurs abîmerait la série.

1. ⛔ **E3, le titre — MESURÉ À 50 %, le même niveau que les deux fautes de la série
   espace.** « Une seule fois au kilomètre cent » reprend mot pour mot la carte A de
   `04` (« une seule, g est monotone »), et la bonne réponse est « aucune ».
   ⭐ **Mais le sens de l'effet est l'INVERSE de celui des deux fautes connues** : là-bas
   le titre réfutait une carte, ici il rend un LEURRE attirant. L'instrument voit le
   recouvrement, il ne voit pas le sens — il dit « DÉSIGNE UN LEURRE » et s'arrête là.
   C'est donc une décision d'écriture, et c'est **la seule vraie décision de la série** :
   ou bien le piège est voulu (et il fait travailler), ou bien le titre change.
   ⚠️ L'accroche porte le même mot (50 % aussi) : la changer suppose de changer les deux.
2. **E3, la dernière puce de l'accroche** — elle oppose « croissante » et « strictement
   croissante », donc elle **nomme** la monotonie, qui est la carte B de `07`. Mesure :
   33 %, sous le seuil, parce qu'elle ne dit pas que c'est elle qui manque dans la copie.

⚠️ Et les **7 cartes écrites en symboles** (tableau du § 6) : la voix les dit en toutes
lettres, aucune machine ne peut vérifier qu'elle dit la même chose. E5 `07` y met ses
TROIS cartes. À relire à l'œil avant l'enregistrement.

## 10.5 ⛔ Ce qu'un repreneur ne doit SURTOUT pas faire

- ⛔⛔ **Pas de rendu HD sans avoir regardé la planche `-ql` de l'épisode.** Tout se
  contrôle en `-ql` ; le HD seulement quand on est certain. Et celui qui rend est celui
  qui a regardé.
- ⛔⛔ **Et la planche regardée doit être FRAÎCHE** : après toute correction — dans
  l'épisode **ou dans le socle** — il faut RE-RENDRE avant de regarder. Un dry run
  propre ne reconstruit rien. `python -X utf8 manim/poste2/fraicheur-planches.py` le
  dit en une seconde ; sans lui, on relit un vieux rendu en croyant voir le nouveau,
  et c'est arrivé le 27/11 sur deux épisodes.
- ⛔⛔ **Le verrou de rendu HD est un mutex `mkdir` / `rmdir` partagé avec les autres
  sessions** : une seule série en rendu à la fois. Un verrou orphelin bloque tout le
  monde.
- ⛔⛔ **Ne jamais lancer `node scripts/generer-videos-r2.mjs`** : il sort du registre
  toute vidéo dont le MP4 n'est pas sur ce disque.
- ⛔⛔ **Rien dans `notion_ressources` avant que les URL répondent 200** en production.
  Une ligne de coach écrite avant le déploiement donne un bouton mort — c'est arrivé le
  24/11 sur les douze paysages de l'espace.
- ⛔⛔ **Aucune publication YouTube, jamais.** Le coach sert `eleveai.fr/video/<id>`.
- ⛔ **Ne pas modifier `manim/poste2/espace_ecrans.py`** : il sert une série en
  production. Les corrections d'outil de CETTE série vont dans `analyse_ecrans.py`.
- ⛔ **Ne pas toucher `scripts/cues2marques.py`** (le convertisseur commun) : d'autres
  séries ont de vrais doublons à jeter.
- ⛔ **Pas de `git add -A`** : plusieurs sessions partagent ce dossier. On committe par
  chemin explicite, sur `poste2`, et on ne pousse pas.
- ⚠️ **Le format d'une vidéo ne se lit pas dans son URL** — ni le suffixe `-short`, ni
  `?format=short`. La vérité est le champ `short` de `lib/videos/videos-r2.json`. Mesuré
  par une session sœur le 27/11 : le coach servait un short à la place du cours sur
  42 micros. C'est ce champ qu'il faudra renseigner au moment des clés.

## 10.6 Les six instruments laissés derrière, et ce qu'ils valent

| outil | ce qu'il attrape | ce qu'il ne voit PAS |
|---|---|---|
| `verifier-accroches-continuite-tvi.py` | une carte réfutable en se rappelant le titre ou l'accroche, **segment par segment**, seuil étalonné sur 4 cas réels | le sens : il compare des mots. Et sa marge est NULLE du côté « doit crier » |
| ⤷ `--voix` | une proposition que la voix ne reprend pas mot pour mot, nombres remis en chiffres | les 7 cartes en symboles, qu'il range à part et nomme |
| ⤷ `--etalonner` | que le seuil sépare encore les cas connus | rien d'autre : c'est la règle graduée de l'instrument |
| `controler-maths-continuite-tvi.py` | un nombre faux parmi les 73 du manifeste et des corrections dites à voix haute | tout choix pédagogique |
| `mesure-continuite-tvi.py` | une carte rétrécie sous 19 px, un énoncé rétréci par `col()`, un bloc qui recouvre Ti-Margo | les figures, les colonnes de calcul, les chevauchements d'un écran à l'autre |
| `voix-continuite-depuis-md.py` | un des 15 clips manquant ou hors gabarit | le contenu des clips |
| `fraicheur-planches.py` | une planche `-ql` plus vieille que son script, **que le socle** ou que sa voix | si une planche fraîche est bonne : il ne regarde que les dates |
| `voix-continuite-tous-les-wav.sh` | — | ⛔ **il n'a jamais tourné** |

⭐ Les trois premiers ne sont pas propres à cette série : ils lisent un manifeste et une
voix, et la règle qu'ils mesurent — *une carte ne doit pas être réfutable en se
rappelant l'accroche, ni le titre* — vaut pour toutes les séries. Deux paysages de
terminale sont en production avec ce défaut, et il n'y avait aucun instrument pour le
dire.
