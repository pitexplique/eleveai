# Passation — la 6ᵉ maths, chantier ouvert le 26/08/2026

> Ouverte à la fin de la journée qui a terminé la 4ᵉ (voir
> `passation-maths-4e.md`, qui contient TOUTES les règles de dessin et de
> mesure — celle-ci ne redit rien de ce qui y est déjà écrit).
> Commencer par `git pull`.

---

## Où on en est

```
maths 6e   19 fiches sur 35   ·   verifier-micros 111/111   ·   tout est poussé
```

Une seule fiche écrite ce jour-là : **`cercle-disque`**. Les dix-huit autres
datent d'avant.

---

## ⭐ LE COACH A ÉTÉ VÉRIFIÉ AVANT D'ÉCRIRE, ET IL N'EST PAS ENTIÈREMENT SAIN

C'est la condition posée par Frédéric : « vérifie le coach et s'il est ok fais la
fiche ». Résultat des cinq vérificateurs sur `6e maths` :

| vérificateur | verdict |
|---|---|
| validité (`verifier-banque.mjs 6e maths`) | ✅ aucun problème · 176 micros |
| générateurs (`verifier-generateurs.mjs`) | ✅ aucun problème |
| devinabilité (`verifier-devinabilite.mjs`) | ✅ ne se gagne pas à la longueur |
| **variété** (`verifier-variete.mjs`) | ⛔ **4 micros sous le seuil** |
| **canvas** (`verifier-canvas.mjs`) | ⛔ **1 micro graphique sans figure** |

⚠️ **Les verificateurs `.mjs` de la banque se lancent avec `tsx`**, pas avec
`node` seul — sinon ils échouent sur la résolution des `.bank` :
```
npx --yes tsx@4 scripts/verifier-variete.mjs 6e maths
```
⚠️ Et l'ordre des arguments est **`<classe> <matière>`** (`6e maths`), l'inverse
de `verifier-micros.mjs` (`maths 6e`). Les deux existent, ne pas s'y tromper.

### ⛔ CE QUI EST BLOQUÉ, ET POURQUOI

```
7 énoncés  ·  quadrilatere_identifier_nature   (8 items, dont 7 fixes)
8 énoncés  ·  quadrilatere_propriete_defi      (5 items, dont 4 fixes)
9 énoncés  ·  quadrilatere_distinguer          (10 items, dont 9 fixes)
8 énoncés  ·  vision_defi                      (4 items, dont 2 fixes)
```

Trois de ces quatre micros appartiennent à **`quadrilatere_propriete`**, la
quatrième à **`vision_espace`**. Le seuil est de dix : sous dix, l'élève reverra
la même question dans les dix minutes et répondra sans refaire le raisonnement.

👉 **On n'écrit pas la fiche de ces deux notions avant d'avoir réparé leur
banque.** Une fiche ne répare pas un coach qui se répète — elle lui donne juste
une belle façade. Ce qui manque est un **générateur** dans chacune : ces micros
sont presque intégralement `fixed`, et un `fixed` ne compte que pour un énoncé.

⛔ **Et un défaut de figure, sur une notion DÉJÀ fichée** :
```
angle_tracer — 0/10 item(s) avec figure  « Tracer un angle »
```
L'intitulé décrit un geste qui se fait sur une figure ; posé en toutes lettres,
l'élève ne trace plus, il lit. `maths/6e/angle-mesure` existe déjà : c'est donc
la BANQUE qu'il faut compléter, pas la fiche.

---

## Les 16 notions qui restent, et lesquelles sont prêtes

✅ **Prêtes** (coach vert, aucune micro sous le seuil) :
`decimal_calcul` · `demi_droite_graduee` · `fraction_calcul` · `algebre_probleme`
· `prop_echelle` · `aire_unite` · `distance_segment` · `mediatrice_segment` ·
`bissectrice_angle` · `cercle_circonscrit` · `duree_temps` ·
`triangle_propriete` · `stat_enquete` · `proba_frequence`

⛔ **Bloquées par leur banque** : `quadrilatere_propriete` · `vision_espace`

⭐ **La suite naturelle est le bloc des constructions**, qui s'enchaîne comme le
bloc algèbre de 4ᵉ s'est enchaîné et partage ses dessins :
```
distance_segment  →  mediatrice_segment  →  cercle_circonscrit
                                (et bissectrice_angle en parallèle)
```
`distance_segment` pose le milieu, dont la médiatrice a besoin ; les trois
médiatrices d'un triangle donnent le cercle circonscrit. Et la banque de
`circonscrit_defi` porte déjà un très bel énoncé : **« trois maisons non
alignées, où creuser le puits ? »**, avec sa contre-épreuve — **trois points
ALIGNÉS n'ont pas de cercle**, parce que les médiatrices deviennent parallèles.

---

## Ce que la fiche du cercle a appris sur le canvas `cercle`

⭐ **Il SE MET À L'ÉCHELLE**, contrairement à `solide_3d` : son centre, son rayon
et tous ses points sont des paramètres. Réduire le cadre **en réduisant les
coordonnées dans le même rapport** met vraiment le dessin à l'échelle.

⚠️ **Et il le faut absolument.** Ses polices sont FIXES (14 et 15 px). Avec le
cadre de 340 par défaut, une carte de 222 px les ramène à `14 × 222/340 = 9,1 px`
— sous le seuil de 11. Avec un cadre de 228 : 13,6 px. **Ne jamais laisser la
taille par défaut de ce canvas dans une fiche.**

⛔ **LE LIBELLÉ D'UN DIAMÈTRE TOMBE TOUJOURS SUR LE CENTRE.** Le composant pose
l'étiquette d'un segment à son MILIEU — or le milieu d'un diamètre EST le centre,
par définition. Aucune géométrie n'y change rien : incliner le diamètre, le
mettre vertical, rien n'y fait. 👉 Sur un diamètre, on choisit : **ou bien son
libellé, ou bien le « O », jamais les deux.**

⛔ **LA MARGE DU HAUT SE CALCULE.** L'étiquette d'un point est posée à
`(x + 12, y − 10)`, en 15 px bordés d'un contour blanc de 3 : le haut du texte se
trouve **28 unités au-dessus du point**. Un point au sommet du cercle a donc
besoin de 28 unités de marge — sinon son étiquette sort du cadre, **et ça ne se
voit qu'en 1280**.

---

## La boucle, fiche par fiche

Identique à celle de la 4ᵉ (voir `passation-maths-4e.md`), avec deux ajouts :

0. ⭐ **Vérifier le coach de la notion AVANT d'écrire** — au minimum
   `verifier-variete.mjs`, qui est le seul à avoir trouvé quelque chose ici.
3. Le **registre suffit** : `app/sitemap.ts` est génératif depuis le 26/08.
   Contrôle de parité :
   ```
   git show HEAD:lib/fiches/registre.ts | grep -c '"maths/6e/'
   git ls-files app/fiches-cours/maths/6e/ \
     | grep -v '^app/fiches-cours/maths/6e/page.tsx$' | grep -c '/page.tsx$'
   ```
   19 et 19 au soir du 26/08.

⚠️ **DEUX PANNES DIFFÉRENTES DONNENT LE MÊME SYMPTÔME** quand
`build:fiches-pdf` expire, et une seule se soigne par une relance :
- la **dégradation** habituelle du serveur de dev (404 sur une route qui existe)
  → relancer suffit ;
- un **cache `.next-2` corrompu** → la page rend un document VIDE et les logs
  disent `SyntaxError: Unexpected end of JSON input`. Relancer NE SUFFIT PAS :
  il faut `rm -rf .next-2` puis relancer.

👉 **Lire les logs du serveur avant de relancer** (`preview_logs`, niveau
`error`). C'est ce qui distingue les deux.
