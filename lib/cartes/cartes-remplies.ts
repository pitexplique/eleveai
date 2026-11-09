// ─── PILOTE : les cartes mentales REMPLIES (6e, 4e, seconde) ─────────────────────
// ⭐ 09/11/2026 — Pourquoi : 85 % des visiteurs des cartes arrivent de Bing ou
// Google (« carte mentale <notion> <classe> ») et tombaient sur une feuille
// vierge à remplir → rebond. Pour ces notions, l'écran montre d'abord la carte
// remplie : dans chaque bulle, la règle, un mini-exemple chiffré et le piège.
// La feuille à compléter reste là, un clic plus loin (« Version à compléter »),
// pour l'imprimer après les vidéos.
// Frédéric, le même jour : « pilote classe 6eme ou 4eme, mes classes », « et
// fait pour 4eme puissance et autre notion et 6eme », « cartes mentales remplit
// c’est mieux » : 3 notions de 6e, 3 de 4e (dont les puissances), 5 de seconde.
// ⭐ 09/11 soir — « j'aime la carte mentale de 4eme sur les puissances »,
// « continue ! » : toutes les notions de 6e et de 4e sont remplies, dans
// lib/cartes/remplies/<classe>.json (même forme). Les cartes écrites ici, à la
// main, l'emportent sur celles des fichiers.
//
// Collège : phrases courtes, un seul calcul par exemple (ses 6e lisent mal).
// Une bulle par micro, DANS L'ORDRE de lib/videos/bilans-notions.json (une carte
// dont le nombre de bulles ne correspond plus aux micros n'est pas affichée).
// Notation : « ^2 », « ^(…) » pour les exposants, « _A » ou « _{…} » pour les
// indices (components/cartes/TexteMaths.tsx).

import SIXIEME from "./remplies/6e.json";
import QUATRIEME from "./remplies/4e.json";

export type BulleRemplie = { regle: string; exemple: string; piege: string };

const ECRITES_A_LA_MAIN: Record<string, BulleRemplie[]> = {
  // ── 6e ──────────────────────────────────────────────────────────────────
  "6e/fraction_nombre": [
    {
      regle: "En bas, le dénominateur : en combien de parts égales on coupe. En haut, le numérateur : combien on en prend.",
      exemple: "3/4 : on coupe en 4 parts égales, on en prend 3.",
      piege: "Les parts doivent être ÉGALES.",
    },
    {
      regle: "On partage l’unité (barre, disque) en parts égales et on en colorie.",
      exemple: "2/5 d’une barre : 5 parts égales, 2 coloriées.",
      piege: "Le dénominateur compte TOUTES les parts, coloriées ou non.",
    },
    {
      regle: "On multiplie (ou on divise) le haut et le bas par le même nombre.",
      exemple: "6/8 = 3/4 (÷ 2 en haut et en bas) ; 1/2 = 5/10.",
      piege: "Ajouter le même nombre en haut et en bas ne marche pas : 1/2 ≠ 2/3.",
    },
    {
      regle: "Une fraction sur 10, 100, 1 000 s’écrit avec une virgule.",
      exemple: "7/10 = 0,7 ; 25/100 = 0,25 ; 3/4 = 75/100 = 0,75.",
      piege: "3/100 = 0,03 et non 0,3.",
    },
    {
      regle: "a/b = a ÷ b : c’est le nombre qui, multiplié par b, donne a.",
      exemple: "7/4 = 7 ÷ 4 = 1,75 et 4 × 1,75 = 7.",
      piege: "C’est le numérateur qu’on divise par le dénominateur, pas l’inverse.",
    },
    {
      regle: "Même dénominateur : la plus grande a le plus grand numérateur.",
      exemple: "5/8 > 3/8. Et 7/6 > 1, car 7 > 6.",
      piege: "1/3 > 1/5 : plus on coupe de parts, plus elles sont petites.",
    },
    {
      regle: "Pour encadrer : combien de fois le dénominateur tient dans le numérateur ?",
      exemple: "11/4 = 2 + 3/4, donc 2 < 11/4 < 3.",
      piege: "Le reste (ici 3) garde le dénominateur 4.",
    },
    {
      regle: "Défi : dessiner avant de calculer.",
      exemple: "Gâteau en 8 parts : Léa mange 3/8, Tom 1/4 = 2/8. Il reste 3/8.",
      piege: "Même dénominateur avant de comparer ou d’enlever : 1/4 = 2/8.",
    },
  ],

  "6e/decimal_nombre": [
    {
      regle: "La virgule sépare la partie entière de la partie décimale.",
      exemple: "12,05 se lit « douze unités et cinq centièmes ».",
      piege: "12,05 ≠ 12,5 : le 0 compte.",
    },
    {
      regle: "Après la virgule : dixièmes, centièmes, millièmes.",
      exemple: "Dans 3,472 : 4 dixièmes, 7 centièmes, 2 millièmes.",
      piege: "Le 1er chiffre après la virgule est celui des dixièmes (pas d'« unièmes »).",
    },
    {
      regle: "On compare la partie entière, puis les dixièmes, puis les centièmes.",
      exemple: "4,7 > 4,15, car 7 dixièmes > 1 dixième.",
      piege: "Le plus long n’est pas le plus grand : 4,7 = 4,70 > 4,15.",
    },
    {
      regle: "On regarde le chiffre juste après : de 0 à 4, on garde ; de 5 à 9, on monte.",
      exemple: "Au dixième : 3,46 → 3,5 et 3,43 → 3,4.",
      piege: "On regarde UN seul chiffre : celui qui suit le rang demandé.",
    },
    {
      regle: "Entre deux décimaux, il y en a toujours un autre.",
      exemple: "Entre 2,3 et 2,4 : 2,35. À l’unité : 7 < 7,8 < 8.",
      piege: "Écrire 2,30 et 2,40 aide à voir les nombres entre les deux.",
    },
    {
      regle: "Défi : compléter avec des zéros, puis ranger.",
      exemple: "0,5 ; 0,45 ; 0,405 → 0,405 < 0,45 < 0,5.",
      piege: "0,500 ; 0,450 ; 0,405 : même nombre de chiffres, on compare facilement.",
    },
  ],

  "6e/angle_mesure": [
    {
      regle: "Un angle : deux demi-droites qui partent d’un même point, le sommet.",
      exemple: "L’angle xÔy a pour sommet O.",
      piege: "Dans le nom de l’angle, la lettre du milieu est TOUJOURS le sommet.",
    },
    {
      regle: "Un angle droit mesure 90°. On le vérifie avec l’équerre.",
      exemple: "Le coin d’une feuille est un angle droit.",
      piege: "« À l’œil » ne suffit pas : on pose l’équerre.",
    },
    {
      regle: "Aigu : moins de 90°. Obtus : entre 90° et 180°. Plat : 180°.",
      exemple: "40° est aigu, 120° est obtus.",
      piege: "La longueur des côtés dessinés ne change pas l’angle.",
    },
    {
      regle: "Centre du rapporteur sur le sommet, le 0 sur un côté.",
      exemple: "On lit 65° sur la graduation qui part de ce 0.",
      piege: "65° ou 115° ? Un angle aigu mesure moins de 90°.",
    },
    {
      regle: "On trace un côté, on place le rapporteur, on marque la mesure, on relie.",
      exemple: "Tracer 50° : un point en face de 50, puis relier au sommet.",
      piege: "Partir du 0 qui est sur le côté déjà tracé.",
    },
    {
      regle: "Supplémentaires : somme de 180°. Opposés par le sommet : même mesure.",
      exemple: "Un angle de 70° a un supplémentaire de 110°.",
      piege: "Adjacents : même sommet ET un côté commun, sans se recouvrir.",
    },
    {
      regle: "Défi : écrire les angles égaux avant de calculer.",
      exemple: "Deux droites se coupent, un angle fait 35° : les autres font 145°, 35° et 145°.",
      piege: "Vérifier : le tour complet fait 360°.",
    },
  ],

  // ── 4e ──────────────────────────────────────────────────────────────────
  "4e/relatif_operation": [
    {
      regle: "Même signe : on ajoute les distances à zéro. Signes contraires : on les soustrait, signe du plus éloigné de zéro.",
      exemple: "(−3) + (−5) = −8 ; (−7) + 4 = −3.",
      piege: "(−7) + 4 ne fait pas −11.",
    },
    {
      regle: "Soustraire un nombre, c’est ajouter son opposé.",
      exemple: "5 − (−2) = 5 + 2 = 7 ; (−4) − 6 = (−4) + (−6) = −10.",
      piege: "On change le signe du nombre qu’on soustrait, pas du premier.",
    },
    {
      regle: "Produit : même signe → positif ; signes contraires → négatif.",
      exemple: "(−3) × (−4) = 12 ; (−3) × 4 = −12.",
      piege: "Plusieurs facteurs : on compte les « − ». Pair → +, impair → −.",
    },
    {
      regle: "Quotient : même règle des signes que le produit.",
      exemple: "(−20) ÷ (−5) = 4 ; 18 ÷ (−3) = −6.",
      piege: "On ne divise jamais par 0.",
    },
    {
      regle: "Priorités : parenthèses, puis × et ÷, puis + et −.",
      exemple: "−2 + 3 × (−4) = −2 + (−12) = −14.",
      piege: "Ne pas commencer par −2 + 3.",
    },
    {
      regle: "Températures, altitudes, comptes : un nombre négatif est sous zéro.",
      exemple: "Il fait −6 °C, puis la température monte de 9 °C : −6 + 9 = 3 °C.",
      piege: "Un écart se calcule par différence : de −6 à 3, il y a 9 degrés.",
    },
    {
      regle: "Défi : le signe d’abord, puis les nombres.",
      exemple: "(−2) × (−3) × (−5) = −30 (trois signes −).",
      piege: "(−2)^2 = 4 mais −2^2 = −4.",
    },
  ],

  "4e/pythagore_theoreme": [
    {
      regle: "a^2 = a × a ; la racine carrée fait l’inverse : √49 = 7 car 7^2 = 49.",
      exemple: "6^2 = 36 ; √81 = 9 ; √50 ≈ 7,07.",
      piege: "6^2 = 36, pas 12.",
    },
    {
      regle: "L’hypoténuse est le côté en face de l’angle droit : le plus long.",
      exemple: "ABC rectangle en A : l’hypoténuse est [BC].",
      piege: "L’hypoténuse ne touche PAS l’angle droit.",
    },
    {
      regle: "Hypoténuse^2 = somme des carrés des deux autres côtés.",
      exemple: "Côtés 6 et 8 : BC^2 = 36 + 64 = 100, donc BC = √100 = 10.",
      piege: "Ne pas oublier la racine carrée à la fin.",
    },
    {
      regle: "Côté de l’angle droit^2 = hypoténuse^2 − autre côté^2.",
      exemple: "Hypoténuse 13, côté 5 : AB^2 = 169 − 25 = 144, donc AB = 12.",
      piege: "On SOUSTRAIT : le résultat est plus petit que l’hypoténuse.",
    },
    {
      regle: "On calcule séparément le carré du plus grand côté et la somme des deux autres carrés.",
      exemple: "3, 4, 5 : 5^2 = 25 et 3^2 + 4^2 = 9 + 16 = 25.",
      piege: "N’écrire l’égalité qu’après avoir fait les deux calculs.",
    },
    {
      regle: "Si le carré du plus grand côté égale la somme des deux autres, le triangle est rectangle.",
      exemple: "Échelle de 2,5 m, pied à 1,5 m, haut à 2 m : 6,25 = 2,25 + 4, le mur est droit.",
      piege: "Si les deux résultats diffèrent, le triangle N’EST PAS rectangle.",
    },
    {
      regle: "Rédiger : le triangle rectangle, le théorème, le calcul, la conclusion avec l’unité.",
      exemple: "« ABC est rectangle en A, donc d’après le théorème de Pythagore : BC^2 = AB^2 + AC^2. »",
      piege: "Théorème : on SAIT que l’angle est droit. Réciproque : on le PROUVE.",
    },
    {
      regle: "Défi : trouver le triangle rectangle caché dans la figure.",
      exemple: "Écran de 16 × 12 cm : diagonale = √(256 + 144) = √400 = 20 cm.",
      piege: "Arrondir seulement à la fin.",
    },
  ],

  "4e/puissance_ecriture": [
    {
      regle: "a^n = a × a × … × a : n facteurs égaux à a.",
      exemple: "2^3 = 2 × 2 × 2 = 8.",
      piege: "2^3 ≠ 2 × 3 : ce n’est pas 6.",
    },
    {
      regle: "On multiplie le nombre par lui-même autant de fois que l’exposant.",
      exemple: "5^2 = 25 ; (−3)^2 = 9 ; 7^1 = 7 ; 7^0 = 1.",
      piege: "(−3)^2 = 9 mais −3^2 = −9 : les parenthèses comptent.",
    },
    {
      regle: "a^(−n) = 1 ÷ a^n : l’inverse de a^n.",
      exemple: "2^(−3) = 1 ÷ 2^3 = 1 ÷ 8 = 0,125.",
      piege: "2^(−3) n’est pas négatif : c’est un petit nombre positif.",
    },
    {
      regle: "10^n : un 1 suivi de n zéros. 10^(−n) : le 1 au n-ième rang après la virgule.",
      exemple: "10^4 = 10 000 ; 10^(−3) = 0,001.",
      piege: "10^(−3) a 3 chiffres après la virgule (0,001), pas 3 zéros.",
    },
    {
      regle: "Notation scientifique : a × 10^n, avec a entre 1 (compris) et 10 (exclu).",
      exemple: "45 000 = 4,5 × 10^4 ; 0,0062 = 6,2 × 10^(−3).",
      piege: "45 × 10^3 n’est pas en notation scientifique : 45 est plus grand que 10.",
    },
    {
      regle: "On compare d’abord les puissances de 10, puis les nombres devant.",
      exemple: "3 × 10^5 > 9 × 10^4 ; 2,1 × 10^3 < 2,5 × 10^3.",
      piege: "9 × 10^4 est plus petit que 3 × 10^5, même si 9 > 3.",
    },
    {
      regle: "10^m × 10^n = 10^(m+n) ; 10^m ÷ 10^n = 10^(m−n).",
      exemple: "10^3 × 10^5 = 10^8 ; 10^2 ÷ 10^6 = 10^(−4).",
      piege: "On AJOUTE les exposants : 10^3 × 10^5 ≠ 10^15.",
    },
    {
      regle: "Défi : écrire en notation scientifique, puis calculer.",
      exemple: "Soleil à 1,5 × 10^8 km, lumière à 3 × 10^5 km/s : 1,5 × 10^8 ÷ (3 × 10^5) = 500 s.",
      piege: "Diviser les nombres devant (1,5 ÷ 3 = 0,5) ET les puissances de 10 (10^3).",
    },
  ],

  // ── Seconde ─────────────────────────────────────────────────────────────
  "seconde/reels_intervalles": [
    {
      regle: "N ⊂ Z ⊂ D ⊂ Q ⊂ R : chaque ensemble contient le précédent.",
      exemple: "−3 ∈ Z ; 0,25 ∈ D ; 1/3 ∈ Q mais 1/3 ∉ D ; √2 ∈ R mais √2 ∉ Q.",
      piege: "1/3 = 0,333… n’est pas décimal : son écriture ne s’arrête jamais.",
    },
    {
      regle: "Chaque réel est l’abscisse d’un seul point de la droite graduée.",
      exemple: "√2 ≈ 1,41 : entre 1,4 et 1,5, plus près de 1,4.",
      piege: "Regarder l’unité de la graduation avant de placer le point.",
    },
    {
      regle: "Crochet tourné vers le nombre : la borne est comprise.",
      exemple: " ;  : tous les x tels que −2 < x ⩽ 3.",
      piege: "Du côté de l’infini, le crochet est toujours ouvert :  ; .",
    },
    {
      regle: "x ∈  ;  quand a ⩽ x ⩽ b : on vérifie les deux inégalités.",
      exemple: "3 ∈  ;  mais 3 ∉  ; .",
      piege: "Une borne exclue (crochet ouvert) n’appartient pas à l’intervalle.",
    },
    {
      regle: "|a − b| est la distance entre a et b sur la droite.",
      exemple: "|x − 2| ⩽ 3 ⟺ x est à 3 au plus de 2 ⟺ x ∈  ; .",
      piege: "|x + 1| est la distance entre x et −1, pas entre x et 1.",
    },
    {
      regle: "Encadrer à 10^(−n) près : deux décimaux à n chiffres après la virgule.",
      exemple: "1,414 < √2 < 1,415 : encadrement à 10^(−3) près.",
      piege: "Les deux bornes ont le même nombre de décimales et diffèrent de 10^(−n).",
    },
  ],

  "seconde/identites_remarquables_2de": [
    {
      regle: "(a + b)^2 = a^2 + 2ab + b^2",
      exemple: "(x + 3)^2 = x^2 + 6x + 9",
      piege: "(a + b)^2 ≠ a^2 + b^2 : ne pas oublier le double produit 2ab.",
    },
    {
      regle: "(a − b)^2 = a^2 − 2ab + b^2",
      exemple: "(2x − 5)^2 = 4x^2 − 20x + 25",
      piege: "Le carré de 2x est 4x^2, pas 2x^2.",
    },
    {
      regle: "a^2 − b^2 = (a − b)(a + b)",
      exemple: "x^2 − 49 = (x − 7)(x + 7)",
      piege: "a^2 + b^2 ne se factorise pas de cette façon.",
    },
    {
      regle: "Écrire le nombre autour d’un nombre rond, puis appliquer l’identité.",
      exemple: "99^2 = (100 − 1)^2 = 10 000 − 200 + 1 = 9 801 ; 51 × 49 = 50^2 − 1 = 2 499.",
      piege: "Garder le signe du double produit : (100 − 1)^2 commence par 10 000 − 200.",
    },
    {
      regle: "Développer : (…)^2 → somme. Factoriser : repérer a^2, b^2 et 2ab.",
      exemple: "x^2 + 10x + 25 = (x + 5)^2, car 10x = 2 × x × 5.",
      piege: "Vérifier le double produit : x^2 + 5x + 25 n’est pas un carré.",
    },
  ],

  "seconde/fonctions_affines_2de": [
    {
      regle: "f(x) = ax + b, avec a et b deux nombres fixés.",
      exemple: "f(x) = 3 − 2x est affine : a = −2 et b = 3.",
      piege: "x^2 + 1 et 1/x ne sont pas affines (x doit être seul, à la puissance 1).",
    },
    {
      regle: "Image : on remplace x et on calcule. Antécédent : on résout ax + b = y.",
      exemple: "f(x) = 2x − 1 : f(4) = 7 ; antécédent de 5 : 2x − 1 = 5, donc x = 3.",
      piege: "Image → un calcul ; antécédent → une équation à résoudre.",
    },
    {
      regle: "a = (f(x_2) − f(x_1)) / (x_2 − x_1), puis b avec l’un des points.",
      exemple: "f(1) = 3 et f(3) = 7 : a = 4/2 = 2 ; 3 = 2 × 1 + b, b = 1 ; f(x) = 2x + 1.",
      piege: "Garder le même ordre des points en haut et en bas de la fraction.",
    },
    {
      regle: "ax + b s’annule en x = −b/a ; après ce nombre, il a le signe de a.",
      exemple: "2x − 6 < 0 sur  ;  et 2x − 6 > 0 sur  ; .",
      piege: "Si a < 0, c’est l’inverse : −x + 4 est positif AVANT 4.",
    },
  ],

  "seconde/information_chiffree_evolutions": [
    {
      regle: "Proportion = effectif de la partie ÷ effectif total.",
      exemple: "180 internes sur 600 élèves : 180 ÷ 600 = 0,3 = 30 %.",
      piege: "Diviser par l’effectif de la population de référence, pas par un autre total.",
    },
    {
      regle: "Un pourcentage d’un pourcentage : on multiplie les proportions.",
      exemple: "40 % d’internes, dont 25 % en 2de : 0,4 × 0,25 = 0,1 = 10 % des élèves.",
      piege: "Pas 40 × 25 : on multiplie les écritures décimales 0,4 et 0,25.",
    },
    {
      regle: "Absolue : V_1 − V_0 (dans l’unité). Relative : (V_1 − V_0) ÷ V_0 (en %).",
      exemple: "50 € → 60 € : +10 € ; 10 ÷ 50 = 0,2, soit +20 %.",
      piege: "La variation relative se calcule par rapport à la valeur de DÉPART.",
    },
    {
      regle: "Coefficient multiplicateur : CM = 1 + t (t en écriture décimale).",
      exemple: "+15 % → × 1,15 ; −20 % → × 0,8.",
      piege: "Une baisse de 20 % donne × 0,8, pas × 0,2.",
    },
    {
      regle: "Évolutions successives : on multiplie les coefficients multiplicateurs.",
      exemple: "+10 % puis −10 % : 1,1 × 0,9 = 0,99, soit −1 %.",
      piege: "Les pourcentages ne s’ajoutent pas : +10 % puis −10 % ne fait pas 0 %.",
    },
    {
      regle: "Pour revenir à la valeur de départ : CM réciproque = 1 ÷ CM.",
      exemple: "Après +25 % (× 1,25) : × 1 ÷ 1,25 = × 0,8, soit −20 %.",
      piege: "Après une hausse de 25 %, une baisse de 25 % ne ramène pas au départ.",
    },
  ],

  "seconde/probabilites_conditionnelles_2de": [
    {
      regle: "P_A(B) = P(A ∩ B) ÷ P(A) : la probabilité de B quand on sait que A est réalisé.",
      exemple: "P(A) = 0,5 et P(A ∩ B) = 0,2 : P_A(B) = 0,2 ÷ 0,5 = 0,4.",
      piege: "On divise par la probabilité de ce que l’on SAIT (ici A).",
    },
    {
      regle: "Les branches qui partent d’un même nœud ont une somme égale à 1.",
      exemple: "P(A) = 0,3 donc P(Ā) = 0,7 ; P_A(B) = 0,6 donc P_A(B̄) = 0,4.",
      piege: "Les branches du 2e niveau portent des probabilités conditionnelles.",
    },
    {
      regle: "Le long d’un chemin, on multiplie ; entre les chemins qui mènent à B, on additionne.",
      exemple: "P(B) = 0,3 × 0,6 + 0,7 × 0,2 = 0,18 + 0,14 = 0,32.",
      piege: "Ne pas oublier les chemins qui passent par Ā.",
    },
    {
      regle: "P_A(B) = effectif de « A et B » ÷ effectif total de A.",
      exemple: "40 filles, dont 10 gauchères : P_F(G) = 10 ÷ 40 = 0,25.",
      piege: "Diviser par le total de la ligne (ou colonne) de A, pas par le total général.",
    },
    {
      regle: "P_A(B) et P_B(A) ne sont, en général, pas égales.",
      exemple: "Maladie rare (1 %), test qui détecte 99 % des malades, 10 % de faux positifs : P_{positif}(malade) ≈ 0,09.",
      piege: "« Positif sachant malade » n’est pas « malade sachant positif ».",
    },
  ],
};

export const CARTES_REMPLIES: Record<string, BulleRemplie[]> = {
  ...(SIXIEME as Record<string, BulleRemplie[]>),
  ...(QUATRIEME as Record<string, BulleRemplie[]>),
  ...ECRITES_A_LA_MAIN,
};

// La carte remplie d'une notion, si elle existe ET correspond encore aux micros.
export function carteRemplie(cle: string, nbMicros: number): BulleRemplie[] | null {
  const c = CARTES_REMPLIES[cle];
  return c && c.length === nbMicros ? c : null;
}
