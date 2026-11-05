// ─── Fiche d'exercices : ordre de grandeur et conversions (STMG) — 20 exercices ─
//
// Notion auto_ordres_unites du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/automatismes-calcul.bank.ts`). Le coach
// demande : les pourcentages usuels de tête (10, 20, 25, 50, 75 %), multiplier par
// 0,1 ; 0,25 ; 0,5 ; 0,75 ; 1,5 ; 2,5 ; l'ordre de grandeur d'un produit et d'un
// quotient (en arrondissant) ; les conversions de durées (h et min) et de masses
// (t, kg, g), et la distance à vitesse connue, la durée étant donnée en minutes.
// Pas de m³, pas de conversion de vitesses : la feuille non plus.
//
// ⭐ Aucune donnée réelle : tout est un modèle ou une situation visiblement fictive.
//
// Domaines et métiers : calculs nus (ex. 1 à 8) ; mode (vendeuse), glacier (gérant),
// jeux de société (éditrice), transport (chauffeur), meunerie (meunier), rail
// (contrôleuse), santé (cardiologue), pâtisserie (pâtissière) ; livraison
// (livreuse), arboriculture (arboricultrice), hôtellerie et énergie (hôtelier),
// concert (producteur).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-automatismes-1.mjs`.
//
// Micro-compétences : auto_num_calcul_mental (1, 2, 3, 4, 9, 16, 19, 20),
// auto_num_ordre_grandeur (5, 10, 11, 15, 18, 20), auto_num_conversions (6, 7, 8,
// 12, 13, 14, 16, 17, 18, 19). 3/3.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

/** Un ordre de grandeur : le corrigé écrit « environ », et le clavier a la touche ≈. */
const environ = (n: string, unite = ""): string[] =>
  unite ? [n, `${n} ${unite}`, `environ ${n} ${unite}`, `≈ ${n}`, `≈ ${n} ${unite}`] : [n, `≈ ${n}`];

/** Une heure d'arrivée : « 9 h 15 », et les écritures d'un élève qui répond à « À quelle heure ? ». */
const heure = (h: number, min: number): string[] => [`${h} h ${min}`, `${h} h ${min} min`, `à ${h} h ${min}`, `${h}:${min}`];

export const exercicesAutoOrdresUnitesStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "auto-ordres-unites",
  titre: "Ordre de grandeur et conversions",
  accroche:
    "Vingt exercices pour calculer de tête et ne plus se tromper d'un zéro : les pourcentages usuels, l'ordre de grandeur d'un produit ou d'un quotient, les heures et les minutes, les tonnes et les kilos. Un train, un glacier, un chargement de pommes, le cœur qui bat, la facture d'un hôtel, une salle de concert. Un rappel de cours avant chaque niveau, une correction étape par étape avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice, de tête ou presque : pas de calculatrice.",
      rappel: [
        "$50\\,\\%$, c'est la moitié ; $25\\,\\%$, le quart ; $10\\,\\%$, le dixième ; $75\\,\\%$, trois quarts.",
        "Multiplier par $0{,}5$, c'est diviser par $2$. Par $0{,}25$, diviser par $4$. Par $1{,}5$, ajouter la moitié.",
        "Un ordre de grandeur : on remplace chaque nombre par une valeur ronde proche, puis on calcule de tête.",
        "$1$ h $= 60$ min (donc $0{,}25$ h $= 15$ min, pas $25$). $1$ t $= 1\\,000$ kg et $1$ kg $= 1\\,000$ g.",
      ],
      exercices: [
        {
          enonce: "Calcule de tête $25\\,\\%$ de $360$.",
          reponses: [{ attendu: "90" }],
          correction:
            "$25\\,\\%$, c'est le quart.\n$360 \\div 4 = 90$.\n⛔ Le piège : calculer $360 - 25 = 335$. Un pourcentage ne se retranche pas directement.\nRéponse : 90.",
          micros: ["auto_num_calcul_mental"],
        },
        {
          enonce: "Calcule de tête $75\\,\\%$ de $80$.",
          reponses: [{ attendu: "60" }],
          correction:
            "$75\\,\\%$, ce sont trois quarts.\nLe quart de $80$ : $80 \\div 4 = 20$.\nTrois quarts : $20 \\times 3 = 60$.\n⛔ Le piège : s'arrêter à $20$, qui n'est que $25\\,\\%$.\nRéponse : 60.",
          micros: ["auto_num_calcul_mental"],
        },
        {
          enonce: "Calcule de tête $240 \\times 0{,}25$.",
          reponses: [{ attendu: "60", exact: true }],
          correction:
            "Multiplier par $0{,}25$, c'est diviser par $4$.\n$240 \\div 4 = 60$.\n⛔ Le piège : diviser par $25$. Or $0{,}25$ vaut un quart, pas un vingt-cinquième.\nRéponse : 60.",
          micros: ["auto_num_calcul_mental"],
        },
        {
          enonce: "Calcule de tête $120 \\times 1{,}5$.",
          reponses: [{ attendu: "180", exact: true }],
          correction:
            "Multiplier par $1{,}5$, c'est ajouter la moitié.\nLa moitié de $120$ est $60$.\n$120 + 60 = 180$.\n⛔ Le piège : ne prendre que la moitié ($60$). Le résultat doit être plus grand que $120$, car $1{,}5$ dépasse $1$.\nRéponse : 180.",
          micros: ["auto_num_calcul_mental"],
        },
        {
          enonce: "Donne un ordre de grandeur de $39 \\times 412$ : arrondis $39$ à la dizaine et $412$ à la centaine, puis calcule.",
          reponses: [{ attendu: environ("16 000") }],
          correction:
            "$39$ est proche de $40$, et $412$ est proche de $400$.\n$40 \\times 400 = 16\\,000$.\n⛔ Le piège : se tromper d'un zéro et écrire $1\\,600$. On compte : $4 \\times 4 = 16$, et trois zéros en tout.\nRéponse : environ 16 000.",
          micros: ["auto_num_ordre_grandeur"],
        },
        {
          enonce: "Une livraison dure $2$ h $45$ min. Combien cela fait-il de minutes ?",
          reponses: [{ attendu: "165 min" }],
          correction:
            "On convertit les heures : $2 \\times 60 = 120$ minutes.\nOn ajoute les minutes : $120 + 45 = 165$.\n⛔ Le piège : écrire $245$. Une heure fait $60$ minutes, pas $100$.\nRéponse : 165 min.",
          micros: ["auto_num_conversions"],
        },
        {
          enonce: "Un chargement pèse $2{,}4$ tonnes. Combien cela fait-il de kilogrammes ?",
          reponses: [{ attendu: "2 400 kg" }],
          correction:
            "$1$ tonne vaut $1\\,000$ kg : on multiplie par $1\\,000$.\n$2{,}4 \\times 1\\,000 = 2\\,400$.\n⛔ Le piège : écrire $240$. Multiplier par $1\\,000$, c'est décaler la virgule de TROIS rangs.\nRéponse : 2 400 kg.",
          micros: ["auto_num_conversions"],
        },
        {
          enonce: "Convertis en minutes.\na) $0{,}5$ h\nb) $1{,}5$ h\nc) $0{,}75$ h",
          reponses: [
            { question: "a)", attendu: "30 min" },
            { question: "b)", attendu: "90 min" },
            { question: "c)", attendu: "45 min" },
          ],
          correction:
            "On multiplie par $60$.\na) $0{,}5 \\times 60 = 30$.\nb) $1{,}5 \\times 60 = 90$.\nc) $0{,}75 \\times 60 = 45$.\n⛔ Le piège au a) : écrire $50$ min. Une heure fait $60$ minutes, pas $100$ : $0{,}5$ h, c'est une demi-heure.\nRéponse : a) 30 min ; b) 90 min ; c) 45 min.",
          micros: ["auto_num_conversions"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire : arrondir ou convertir d'abord, calculer ensuite.",
      rappel: [
        "Chiffre d'affaires = prix × quantité. Pour estimer une quantité, on DIVISE le chiffre d'affaires par le prix.",
        "Un ordre de grandeur sert à repérer une erreur d'un zéro dans un résultat.",
        "Distance = vitesse × durée, avec la durée dans la même unité de temps que la vitesse : en km/h, la durée se met en heures.",
      ],
      exercices: [
        {
          enonce:
            "Une vendeuse solde un manteau à $160$ € avec une remise de $20\\,\\%$.\na) Combien vaut la remise ?\nb) Quel est le prix après remise ?",
          reponses: [
            { question: "a)", attendu: "32 €" },
            { question: "b)", attendu: "128 €" },
          ],
          correction:
            "a) $10\\,\\%$ de $160$, c'est $16$. Donc $20\\,\\%$, c'est $2 \\times 16 = 32$ €.\nb) On retire la remise : $160 - 32 = 128$ €.\n⛔ Le piège au b) : calculer $160 - 20 = 140$. On retire le montant de la remise, pas le nombre $20$.\nRéponse : a) 32 € ; b) 128 €.",
          micros: ["auto_num_calcul_mental"],
        },
        {
          enonce:
            "Un glacier vend $1\\,980$ cornets à $3{,}10$ € pièce (modèle).\na) Donne un ordre de grandeur de sa recette : arrondis à $2\\,000$ cornets et à $3$ €.\nb) Son employé annonce une recette de $61\\,380$ €. Ce résultat est-il plausible ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: environ("6 000", "€") },
            { question: "b)", attendu: "non" },
          ],
          correction:
            "a) $2\\,000 \\times 3 = 6\\,000$ €.\nb) $61\\,380$ est environ dix fois plus grand que $6\\,000$ : non, il y a une erreur d'un zéro.\nLe calcul exact donne $1\\,980 \\times 3{,}10 = 6\\,138$ €.\n⛔ Le piège au a) : additionner et écrire $2\\,003$ €. Une recette est un produit.\nRéponse : a) environ 6 000 € ; b) non.",
          micros: ["auto_num_ordre_grandeur"],
        },
        {
          enonce:
            "Une éditrice de jeux de société lit un chiffre d'affaires mensuel de $23\\,760$ € (modèle). Chaque jeu est vendu $48$ €. Donne un ordre de grandeur du nombre de jeux vendus : arrondis à $25\\,000$ € et à $50$ €.",
          reponses: [{ attendu: environ("500", "jeux") }],
          correction:
            "Le chiffre d'affaires est le prix multiplié par la quantité : pour trouver la quantité, on divise.\n$25\\,000 \\div 50 = 500$.\nVérification : $50 \\times 500 = 25\\,000$. ✔\n⛔ Le piège : multiplier $25\\,000$ par $50$. On obtiendrait $1\\,250\\,000$ jeux, ce qui n'a pas de sens.\nRéponse : environ 500 jeux.",
          micros: ["auto_num_ordre_grandeur"],
        },
        {
          enonce:
            "Un chauffeur roule à $75$ km/h pendant $40$ minutes.\na) Quelle fraction d'heure font $40$ minutes ? Donne une fraction irréductible.\nb) Quelle distance le chauffeur parcourt-il ?",
          reponses: [
            { question: "a)", attendu: ["2/3", "(2)/(3)"], exact: true },
            { question: "b)", attendu: "50 km" },
          ],
          correction:
            "a) $40$ minutes sur $60$ : $\\dfrac{40}{60} = \\dfrac{2}{3}$ d'heure.\nb) Distance = vitesse × durée : $75 \\times \\dfrac{2}{3} = 75 \\div 3 \\times 2 = 50$ km.\n⛔ Le piège au b) : calculer $75 \\times 40 = 3\\,000$ km. La vitesse est en km par HEURE : il faut d'abord convertir les minutes.\nRéponse : a) $\\dfrac{2}{3}$ ; b) 50 km.",
          micros: ["auto_num_conversions"],
        },
        {
          enonce:
            "Un meunier a $3{,}5$ tonnes de farine, qu'il met en sacs de $25$ kg.\na) Combien cela fait-il de kilogrammes ?\nb) Combien de sacs remplit-il ?",
          reponses: [
            { question: "a)", attendu: "3 500 kg" },
            { question: "b)", attendu: "140" },
          ],
          correction:
            "a) $3{,}5 \\times 1\\,000 = 3\\,500$ kg.\nb) $3\\,500 \\div 25 = 140$ sacs.\nDe tête : dans $100$ kg, il y a $4$ sacs ; dans $3\\,500$ kg, il y en a $35 \\times 4 = 140$. ✔\n⛔ Le piège au b) : diviser $3{,}5$ par $25$ sans convertir. Les deux masses doivent être dans la même unité.\nRéponse : a) 3 500 kg ; b) 140 sacs.",
          micros: ["auto_num_conversions"],
        },
        {
          enonce:
            "Une contrôleuse prend un train qui part à $8$ h $45$ et arrive à $11$ h $15$.\na) Combien de minutes dure le trajet ?\nb) Écris cette durée en heures, sous forme décimale.",
          reponses: [
            { question: "a)", attendu: "150 min" },
            { question: "b)", attendu: "2,5 h", exact: true },
          ],
          correction:
            "a) De $8$ h $45$ à $9$ h : $15$ minutes. De $9$ h à $11$ h : $120$ minutes. De $11$ h à $11$ h $15$ : $15$ minutes.\n$15 + 120 + 15 = 150$ minutes.\nb) $150 \\div 60 = 2{,}5$ heures.\n⛔ Le piège au b) : écrire $2{,}30$ pour « 2 h 30 ». Or $2{,}30$ h, ce n'est pas $2$ h $30$ : la moitié d'une heure s'écrit $0{,}5$.\nRéponse : a) 150 min ; b) 2,5 h.",
          micros: ["auto_num_conversions"],
        },
        {
          enonce:
            "Une cardiologue explique à un patient : un cœur bat environ $72$ fois par minute (modèle).\na) Donne un ordre de grandeur du nombre de battements en une heure : arrondis à $70$ par minute.\nb) Donne un ordre de grandeur du nombre de battements en une journée : arrondis à $4\\,000$ par heure et à $25$ heures.",
          reponses: [
            { question: "a)", attendu: environ("4 200", "battements") },
            { question: "b)", attendu: environ("100 000", "battements") },
          ],
          correction:
            "a) Une heure fait $60$ minutes : $70 \\times 60 = 4\\,200$.\nb) $4\\,000 \\times 25 = 100\\,000$.\nC'est le bon réflexe : on arrondit pour que le calcul se fasse de tête.\n⛔ Le piège au a) : multiplier par $100$ en pensant qu'une heure fait $100$ minutes.\nRéponse : a) environ 4 200 ; b) environ 100 000.",
          micros: ["auto_num_ordre_grandeur"],
        },
        {
          enonce:
            "Une pâtissière prépare $8$ gâteaux, avec $250$ g de farine par gâteau. La farine coûte $1{,}50$ € le kilogramme.\na) Quelle masse de farine lui faut-il, en grammes ?\nb) Écris cette masse en kilogrammes.\nc) Combien lui coûte cette farine ?",
          reponses: [
            { question: "a)", attendu: "2 000 g" },
            { question: "b)", attendu: "2 kg" },
            { question: "c)", attendu: "3 €" },
          ],
          correction:
            "a) $8 \\times 250 = 2\\,000$ g.\nb) $1$ kg vaut $1\\,000$ g : $2\\,000 \\div 1\\,000 = 2$ kg.\nc) $2 \\times 1{,}50 = 3$ €.\n⛔ Le piège au c) : multiplier $2\\,000$ par $1{,}50$. Le prix est donné au kilogramme : on doit d'abord convertir.\nRéponse : a) 2 000 g ; b) 2 kg ; c) 3 €.",
          micros: ["auto_num_calcul_mental", "auto_num_conversions"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Plusieurs étapes : on estime d'abord, on convertit, on calcule, et on compare à l'estimation.",
      rappel: [
        "Durée = distance ÷ vitesse. Puis on passe en heures et minutes.",
        "On convertit AVANT de calculer : tout dans la même unité.",
        "Pour un nombre maximal d'objets, on divise et on garde la partie entière : on ne dépasse pas la limite.",
      ],
      exercices: [
        {
          titre: "La tournée de la livreuse",
          enonce:
            "Une livreuse doit parcourir $135$ km à $90$ km/h de moyenne. Elle part à $7$ h $45$.\na) Combien d'heures dure le trajet, sous forme décimale ?\nb) Combien de minutes cela fait-il ?\nc) À quelle heure arrive-t-elle ? Écris sous la forme « 10 h 30 ».\nd) Si elle fait une pause de $20$ minutes, à quelle heure arrive-t-elle ?",
          reponses: [
            { question: "a)", attendu: "1,5 h" },
            { question: "b)", attendu: "90 min" },
            { question: "c)", attendu: heure(9, 15) },
            { question: "d)", attendu: heure(9, 35) },
          ],
          correction:
            "a) Durée = distance ÷ vitesse : $135 \\div 90 = 1{,}5$ h.\nb) $1{,}5 \\times 60 = 90$ minutes.\nc) $7$ h $45$ + $15$ minutes = $8$ h. Il reste $75$ minutes, soit $1$ h $15$ : elle arrive à $9$ h $15$.\nd) $9$ h $15$ + $20$ minutes = $9$ h $35$.\n⛔ Le piège au c) : ajouter « 1,5 » et écrire $7$ h $45$ + $1$ h $50$. On a vu que $0{,}5$ h, c'est $30$ minutes, pas $50$.\nRéponse : a) 1,5 h ; b) 90 min ; c) 9 h 15 ; d) 9 h 35.",
          micros: ["auto_num_conversions"],
        },
        {
          titre: "Le chargement de pommes",
          enonce:
            "Une arboricultrice veut charger $690$ caisses de $18$ kg dans un camion limité à $12$ tonnes (modèle).\na) Donne un ordre de grandeur de la masse totale, en kg : arrondis à $700$ caisses et à $20$ kg.\nb) Calcule la masse exacte, en tonnes.\nc) Combien de caisses, au maximum, peut-elle charger ?",
          reponses: [
            { question: "a)", attendu: environ("14 000", "kg") },
            { question: "b)", attendu: "12,42 t" },
            { question: "c)", attendu: "666" },
          ],
          correction:
            "a) $700 \\times 20 = 14\\,000$ kg. C'est au-dessus de $12\\,000$ kg : il faut vérifier.\nb) $690 \\times 18 = 12\\,420$ kg, soit $12{,}42$ tonnes. Le camion ne peut pas tout prendre.\nc) $12$ tonnes font $12\\,000$ kg. $12\\,000 \\div 18 \\approx 666{,}7$.\nOn garde la partie entière : $666$ caisses.\nVérification : $666 \\times 18 = 11\\,988$ kg, et $667 \\times 18 = 12\\,006$ kg, ce qui dépasse. ✔\n⛔ Le piège au c) : arrondir à $667$. L'arrondi au plus proche ferait dépasser la limite.\nRéponse : a) environ 14 000 kg ; b) 12,42 t ; c) 666 caisses.",
          micros: ["auto_num_ordre_grandeur", "auto_num_conversions"],
        },
        {
          titre: "L'eau chaude de l'hôtel",
          enonce:
            "Un hôtelier a un chauffe-eau de $6$ kW, qui fonctionne $1$ h $30$ par jour (modèle). L'énergie en kWh vaut la puissance en kW multipliée par la durée en heures. Le kWh coûte $0{,}20$ €.\na) Écris $1$ h $30$ en heures, sous forme décimale.\nb) Quelle énergie le chauffe-eau consomme-t-il par jour ?\nc) Quel est le coût pour $30$ jours ?\nd) Un réglage ferait économiser $20\\,\\%$ de ce coût. Combien d'euros cela fait-il ?",
          reponses: [
            { question: "a)", attendu: "1,5 h", exact: true },
            { question: "b)", attendu: "9 kWh" },
            { question: "c)", attendu: "54 €" },
            { question: "d)", attendu: "10,80 €" },
          ],
          correction:
            "a) $30$ minutes, c'est une demi-heure : $1$ h $30 = 1{,}5$ h.\nb) $6 \\times 1{,}5 = 9$ kWh.\nc) Par jour : $9 \\times 0{,}20 = 1{,}80$ €. Pour $30$ jours : $1{,}80 \\times 30 = 54$ €.\nd) $10\\,\\%$ de $54$, c'est $5{,}40$. Donc $20\\,\\%$, c'est $2 \\times 5{,}40 = 10{,}80$ €.\n⛔ Le piège au a) : écrire $1{,}30$ h. La virgule n'est pas le « h » : $1{,}30$ h ferait $1$ h $18$ min.\nRéponse : a) 1,5 h ; b) 9 kWh ; c) 54 € ; d) 10,80 €.",
          micros: ["auto_num_calcul_mental", "auto_num_conversions"],
        },
        {
          titre: "La salle de concert",
          enonce:
            "Un producteur prépare une tournée. Il attend $38\\,500$ spectateurs à $22$ € la place (modèle). Il raisonne en ordres de grandeur : $40\\,000$ spectateurs et $20$ € la place.\na) Donne un ordre de grandeur de la recette de billetterie.\nb) Il pense que $25\\,\\%$ des spectateurs passent à la buvette. Avec $40\\,000$ spectateurs, combien de personnes cela fait-il ?\nc) Chacune dépense environ $8$ €. Donne un ordre de grandeur de la recette de buvette.\nd) Donne un ordre de grandeur de la recette totale.",
          reponses: [
            { question: "a)", attendu: environ("800 000", "€") },
            { question: "b)", attendu: "10 000" },
            { question: "c)", attendu: environ("80 000", "€") },
            { question: "d)", attendu: environ("880 000", "€") },
          ],
          correction:
            "a) $40\\,000 \\times 20 = 800\\,000$ €.\nb) $25\\,\\%$, c'est le quart : $40\\,000 \\div 4 = 10\\,000$ personnes.\nc) $10\\,000 \\times 8 = 80\\,000$ €.\nd) $800\\,000 + 80\\,000 = 880\\,000$ €.\n⛔ Le piège au a) : perdre un zéro. On compte : $4 \\times 2 = 8$, et cinq zéros en tout.\nRéponse : a) environ 800 000 € ; b) 10 000 ; c) environ 80 000 € ; d) environ 880 000 €.",
          micros: ["auto_num_calcul_mental", "auto_num_ordre_grandeur"],
        },
      ],
    },
  ],
};
