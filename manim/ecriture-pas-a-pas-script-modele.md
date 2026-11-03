# « La belle écriture — pas à pas » : les paysages lents (chiffres puis alphabet)

> 03/11/2026 — Frédéric, en 6e : un élève avec AESH, en attente d'ULIS, ne sait
> pas écrire. Devant les vidéos de CP, « il n'avait pas écrit depuis 10 ans, il
> a écrit ». Il faut des **paysages** (pas des shorts : « trop simples »), **lents**,
> avec **au début une phrase d'encouragement et une méthode**, et **une question
> simple pour qu'il se sente valorisé**. Ordre : **les 10 chiffres, puis
> l'alphabet**. But : en 8 mois, écrire lettres, chiffres, et composer des mots.

⛔ **Le script se valide À DEUX** : ci-dessous la voix ENTIÈRE du modèle
(chiffre 1). Rien n'est rendu avant son accord.

## Ce qui change par rapport aux vidéos CP existantes

| | Vidéos CP (shorts) | Pas à pas (paysage) |
|---|---|---|
| Ouverture | « Aujourd'hui, on apprend… » | + **encouragement** + **la méthode en 3 images** (les mêmes que sur la fiche) |
| Tracé | lent 5 s, puis 2,0 s et 1,2 s | **par morceaux**, chaque morceau dit puis tracé (~3 s chacun), puis entier lent (8 s), puis 2 reprises |
| L'élève | regarde | **trace avec le doigt en l'air** pendant un passage (pause 6 s) |
| Questions | — | **3 questions-pauses très simples**, 2 choix, compte à rebours **8 s** (au lieu de 5), réponse = « Bravo ! » + pourquoi |
| Fin | « Va sur élève A I… » | « Prends ta fiche et écris » + phrase de fin officielle |

⭐ Les questions ne testent pas : elles **font réussir**. Deux choix, dont un
visiblement faux, et la réponse est toujours suivie d'un compliment sur l'effort.

## Voix du modèle : chiffre 1 (≈ 3 min)

```json
{
  "00-bonjour": "Bonjour ! Aujourd'hui, on écrit le chiffre un.",
  "01-courage": "Tu vas y arriver. On va doucement, et c'est très bien comme ça.",
  "02-methode": "Voici ma méthode.",
  "03-methode-1": "Un : je pose mon crayon sur le point vert.",
  "04-methode-2": "Deux : je suis la flèche, tout doucement.",
  "05-methode-3": "Trois : quand j'ai fini, je colorie mon étoile.",

  "06-q1": "Question ! Pour commencer, où je pose mon crayon ? Sur le point vert, ou sur le point rouge ?",
  "07-q1-rep": "Sur le point vert ! Bravo, tu as retenu la méthode.",

  "08-regarde": "Regarde bien le crayon.",
  "09-morceau-1": "Je pose le crayon sur le point vert.",
  "10-morceau-2": "Je monte en biais, jusqu'en haut.",
  "11-morceau-3": "Je descends tout droit, jusqu'à la ligne.",
  "12-entier": "Encore une fois, en entier. Doucement.",
  "13-doigt": "À toi ! Lève ton doigt, et trace le un en l'air avec moi.",
  "14-doigt-bravo": "Super ! Ton doigt connaît le chemin.",
  "15-plus-vite": "Maintenant, un peu plus vite.",

  "16-q2": "Question ! Lequel est le chiffre un ? Celui-ci, ou celui-là ?",
  "17-q2-rep": "C'est celui-ci ! Bravo, tu le reconnais déjà.",

  "18-combien": "Un, ça veut dire combien ?",
  "19-nez": "Un, comme ton nez. Tu n'en as qu'un !",
  "20-q3": "Question ! Combien de ballons ? Un, ou trois ?",
  "21-q3-rep": "Un seul ballon ! Bravo.",

  "22-fiche": "Maintenant, prends ta fiche et ton crayon. Pars du point vert, et écris le un, doucement.",
  "23-fier": "Tu as bien travaillé aujourd'hui. Tu peux être fier de toi.",
  "24-abonne": "Entraîne-toi sur éleveai point f r. Et abonne-toi !"
}
```

**À l'écran** (voix = écrit) : chaque phrase de méthode s'affiche avec son
picto ; « Question ! » en grand ; les choix côte à côte, gros, avec le
compte à rebours de 8 s ; « Bravo ! » en vert. Le nez = Ti Margo qui montre son
nez. ⛔ Aucun écran sans mot dit, aucun mot dit sans écrit.

## La suite, une fois ce modèle validé

1. Un gabarit `EcriturePasAPas` dans `manim/scripts/cp/pas_a_pas_commun.py`
   (réutilise `chemin_<x>()`, la réglure et le stylo de `lettre_commune.py`) ;
   les morceaux du tracé se découpent par proportion du chemin.
2. **Chiffres 0 → 9** (droitier d'abord ; gaucher ensuite si utile).
3. **Alphabet a → z** : les 20 lettres tracées + `b j v w x z` à décrire en
   courbures AVANT tout essai (règle du 07/09).
4. **Composer des mots** : vidéos et pages « j'écris des mots » (ami, papa,
   lune, moto…) quand les lettres qu'ils utilisent sont faites.

Rangement : `manim/sorties/cp/francais/paysage/fr/pas-a-pas/` (chiffres compris :
tracer un chiffre est de l'écriture, décision du 05/09).
