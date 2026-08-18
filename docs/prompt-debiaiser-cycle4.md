# Chantier : le cycle 4 se laisse gagner à la longueur

Écrit le 18/08/2026, à coller dans une session neuve.

---

## Ce qu'il y a à faire, en une phrase

Les banques de français de **5ᵉ, 4ᵉ et 3ᵉ** ont un défaut mesuré : dans plus
d'une question sur deux, **la bonne réponse est la plus longue des quatre**. Un
élève qui coche la ligne la plus longue sans rien lire réussit à 55 %, là où le
hasard donnerait 25 %. Il faut réécrire les leurres.

## La mesure, à refaire AVANT de toucher quoi que ce soit

```bash
node --experimental-strip-types --no-warnings scripts/verifier-devinabilite.mjs --etalon
```

L'instrument porte ses trois étalons et les vérifie à chaque lancement : une
banque fabriquée où la bonne réponse est délibérément la plus longue doit sortir
à 100 %, une banque aux longueurs égalisées à 0 %. **Si l'étalonnage ne passe
pas, ne rien mesurer d'autre.**

Puis, classe par classe :

```bash
node --experimental-strip-types --no-warnings scripts/verifier-devinabilite.mjs 5e francais
```

L'état au 18/08/2026 :

| classe | items | la bonne est la plus longue | avance moyenne |
|---|---|---|---|
| CP (réparé le 18/08) | 202 | 24 % | +1,4 car. |
| 2de (écrite le 18/08) | 192 | 25 % | +0,4 car. |
| CM2 | 281 | 51 % | +7,9 car. |
| **5ᵉ** | 466 | **54 %** | +8,8 car. |
| **4ᵉ** | 360 | **59 %** | +9,7 car. |
| **3ᵉ** | 369 | **60 %** | +10,6 car. |

⚠️ **Les trois classes sont VERTES au seuil calibré** (80 % *et* +15 car.). Ce
n'est donc pas une panne : c'est un défaut de qualité installé. Le seuil a été
calé sur ce que rendent les banques saines, il ne se décrète pas — ne pas le
baisser pour se donner raison. L'objectif est de faire tomber les trois classes
sous **35 %**, pas de repeindre le verdict.

## Où est la cause

Un seul fichier alimente les trois classes :

- `lib/tutor-v4/questionBank/cycle4/francais/buildCycle4FrancaisBank.ts`
  — **3 893 lignes, 441 jeux de leurres** (`wrongs:`)

⭐ **Une correction vaut donc pour trois classes.** C'est ce qui rend le chantier
rentable, et c'est aussi ce qui oblige à remesurer les trois après chaque lot.

Les autres foyers, secondaires, sont les couches `fixed` :
`lib/tutor-v4/questionBank/{5e,4e,3e}/francais/fixed.bank.ts`.

## Le défaut est STRUCTUREL, pas de la négligence

Exemple réel, `buildCycle4FrancaisBank.ts` ligne 409 :

> **Quelle phrase donne un avis de lecteur JUSTIFIÉ ?**
> - « J'ai aimé ce roman car le héros affronte ses peurs jusqu'au bout. » ← 65 signes, **bonne**
> - « Ce roman existe. » ← 16
> - « Il a trois cents pages. » ← 23
> - « C'est un roman. » ← 15

La question demande un avis *justifié* : la bonne réponse doit contenir le
« car… », donc elle est longue. Les leurres sont des avis non justifiés, donc
courts. **La notion enseignée fabrique elle-même le signal.** C'est pourquoi le
défaut se répète sur des centaines d'items sans que personne l'ait voulu.

## ⛔ LA RÈGLE DU REMÈDE — elle vient de Frédéric, 14/08

**« Le remède n'est pas de gonfler les leurres, c'est d'ajouter des cas à
réponse courte. »** Autrement dit : ne jamais rallonger un leurre avec du
remplissage. Deux gestes seulement sont autorisés :

1. **Raccourcir la bonne réponse** quand elle dit plus que nécessaire.
2. **Rendre les leurres PLAUSIBLES** — ce qui les allonge naturellement, et
   améliore l'exercice au passage.

⭐ **Le second geste est le bon, et il a été éprouvé au CP le 18/08.** Sur la
table des reformulations, « Le margouillat a mangé deux pierres » s'écartait
sans avoir rien lu. Les trois leurres sont devenus de vraies reformulations qui
changent **UN** détail — le moment, le lieu, qui fait quoi. Il faut désormais
avoir compris la phrase de départ pour les écarter.

Sur l'exemple ci-dessus, cela donnerait des leurres du type :
« J'ai aimé ce roman, il est vraiment très bien écrit » (avis sans raison tirée
du texte), « J'ai aimé ce roman car ma sœur me l'avait conseillé » (raison hors
du texte), « J'ai aimé ce roman, il fait trois cents pages » (fait, pas raison).
Trois leurres de longueur comparable, chacun fautif pour une raison DIFFÉRENTE
et instructive.

## Les pièges du dépôt, à ne pas rouvrir

- ⛔ **Les quatre choix doivent s'EXCLURE deux à deux.** En rendant un leurre
  plausible, on risque de le rendre *juste*. C'est le défaut trouvé au CP le
  même jour : « alors » et « ensuite » étaient tous deux corrects, et l'élève
  était compté faux. **Aucun instrument ne voit ce défaut** — seule la relecture.
- ⛔ **Pas de ligne morte.** Un leurre qui ne serait la bonne réponse nulle part,
  et présent à chaque tirage, ramène le QCM à trois lignes : 33 % au lieu de 25.
- ⚠️ **Le conditionnel est un MODE en 4ᵉ et 3ᵉ, un TEMPS en 5ᵉ.** Le builder sert
  les trois classes : ne surtout pas « harmoniser ». Les deux ont raison, chacune
  pour sa classe.
- ⚠️ `scripts/auditer-banque.mjs` **ment sur tout le français** : il lit le
  SOURCE, pas le runtime. Utiliser `scripts/auditer-banque-runtime.ts`.

## Le contrôle de non-régression

Après chaque lot, les deux instruments, sur **les trois classes** :

```bash
npx --yes tsx@4 scripts/verifier-demarrage.ts 3e francais complete
```

⚠️ **Toujours passer le MODE en argument.** Une même classe rend des chiffres
opposés en `simple` et en `complete` — le français de 2de donnait 96/96 en
simple et 6/96 en complet le matin du 18/08. Un chiffre sans son mode ne veut
rien dire.

État de référence au 18/08 : **5ᵉ, 4ᵉ et 3ᵉ démarrent toutes à 100 %**, sans
aucune ligne détournée. Ne pas dégrader ce chiffre.

## Ce qui est fini et qu'il ne faut PAS retoucher

- ✅ Le **français de 2de** : 96/96, 192 items, 25 %. Terminé le 18/08.
- ✅ Le **CP** : 96/96, 24 %, plus aucun item au-dessus du seuil. Terminé le 18/08.
- ✅ Les 5 micros de **culture littéraire de 3ᵉ** : elles avaient un repli muet,
  il est réparé (`3e/francais/culture-litteraire.bank.ts`).
- ⛔ **La STMG est tenue par une autre session.** Ne pas y toucher.

## Conventions de travail

- ⛔ **Jamais `git add -A`** : nommer les fichiers un par un.
- Commiter **souvent**, pousser **par lots** — pas à chaque commit.
- Les commentaires du dépôt sont en français, denses, et expliquent le POURQUOI
  d'un choix ainsi que ce qui a été mesuré. Suivre cette forme : le prochain
  lecteur doit pouvoir refaire la mesure.
- Annoncer les résultats avec **les trois nombres** du contrôle de démarrage
  (franches / détournées / lèvent), jamais un chiffre mélangé.

## Ce que « fini » veut dire

1. `5e`, `4e`, `3e` sous **35 %** au contrôle de devinabilité, avance moyenne
   sous **+5 car.**
2. Plus aucun item au-dessus du seuil individuel de 20 caractères.
3. Les trois classes démarrent toujours à 100 % en mode complet.
4. `npx tsc --noEmit` propre.
5. Un échantillon d'items relu à la main — c'est le seul contrôle qui trouve
   une seconde réponse défendable.
