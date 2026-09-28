// ─── Fiche d'exercices : calcul mental, ordres de grandeur, unités (1re) ─────
//                              20 exercices corrigés
//
// Troisième feuille des automatismes de première (28/09/2026), bâtie sur
// l'étalon `maths-premiere-auto-comparer.tsx`. Première partie de l'épreuve
// anticipée, SANS CALCULATRICE. Alignée sur
// `lib/tutor-v4/questionBank/premiere/maths/automatismes-calcul.bank.ts`.
// L'exercice 3 est celui d'Asie (« 3 400 mm³ en cm³ ») ; l'exercice 10 prolonge
// celui des Antilles (une distance à partir d'une durée en heures et minutes).
//
// ⭐⭐ LE FIL : AVANT LE CALCUL EXACT, LE GARDE-FOU. Un ordre de grandeur, une
// unité bien choisie, un « est-ce possible ? » : trois réflexes qui repèrent
// une erreur sans refaire le calcul (exercices 8, 12, 17 c et 19 c). Les
// conversions s'appuient sur un TABLEAU D'UNITÉS dessiné (3, 4, 13), comme au
// tableau de la classe.
//
// ⭐ Frédéric, 28/09 : un lien GRAPHIQUE (tableaux d'unités, droite graduée,
// frise, diagrammes, repère) et un lien à l'ÉCONOMIE ou à l'HISTOIRE-GÉO
// (cartes et échelles, déchets d'une région, pluie, montée des océans, soldes,
// salaire, prise de la Bastille). Les chiffres sont des MODÈLES arrondis,
// jamais présentés comme des données officielles.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-auto-ordres-unites.mjs`.
//
// Micro-compétences : auto_num_calcul_mental (1, 2, 9, 14, 15, 16, 17, 18,
// 19, 20), auto_num_ordre_grandeur (7, 11, 12, 13, 16, 17, 20),
// auto_num_vraisemblance (8, 10, 12, 15, 17, 18, 19, 20),
// auto_num_conversions (3, 4, 5, 6, 9, 10, 11, 13, 14, 17, 18, 19, 20). 4/4.

import { CanvasRenderer } from "@/lib/canvas";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { diagramme, repere, tableau, tableauProba } from "@/lib/fiches-exercices/figures";

/** Une droite graduée avec des nombres placés dessus (texte NU : SVG). */
const droiteGraduee = (min: number, max: number, step: number, points: { value: number; label: string }[]) => (
  <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
    <CanvasRenderer
      figure={{
        kind: "number_line",
        min,
        max,
        step,
        size: { width: 260, height: 80 },
        points: points.map((p) => ({ ...p, color: "#dc2626" })),
        display: { showPoints: true, showPointLabels: true },
      }}
    />
  </div>
);

export const exercicesAutoOrdresUnitesPremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "auto-ordres-unites",
  titre: "Calcul mental, ordres de grandeur et unités",
  accroche:
    "Vingt exercices sans calculatrice, comme à l'épreuve anticipée : calculer de tête, estimer un ordre de grandeur, repérer un résultat impossible, convertir longueurs, aires, volumes, durées et vitesses. Un rappel de cours avant chaque niveau, et une correction écrite étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Sans calculatrice.",
      rappel: [
        "Calcul mental : $10$ % d'un nombre, c'est le diviser par $10$ ; $25$ %, en prendre le quart ; $50$ %, la moitié.",
        "Ordre de grandeur : on arrondit chaque nombre à une valeur simple, puis on calcule de tête.",
        "Conversions : longueurs, facteur $10$ d'une unité à la suivante ; aires, facteur $100$ ; volumes, facteur $1\\,000$.",
        "Durées : $1$ h $= 60$ min $= 3\\,600$ s. $0{,}5$ h $= 30$ min et $0{,}25$ h $= 15$ min.",
      ],
      exercices: [
        {
          enonce: "Calculer $4 \\times \\dfrac{3}{5} + 2$. Donner le résultat sous forme de fraction, puis sous forme décimale.",
          correction:
            "La multiplication passe avant l'addition.\n$4 \\times \\dfrac{3}{5} = \\dfrac{12}{5}$.\nPuis on ajoute $2 = \\dfrac{10}{5}$ : $\\dfrac{12}{5} + \\dfrac{10}{5} = \\dfrac{22}{5}$.\nEn décimal : $\\dfrac{22}{5} = \\dfrac{44}{10} = 4{,}4$.\n⚠️ Le piège : calculer d'abord $\\dfrac{3}{5} + 2$. Les priorités ne changent pas avec les fractions.",
          micros: ["auto_num_calcul_mental"],
        },
        {
          enonce: "Calculer de tête $25$ % de $360$, puis $15$ % de $80$.",
          correction:
            "$25$ %, c'est un quart : $360 \\div 4 = 90$.\n$15$ %, c'est $10$ % plus $5$ %.\n$10$ % de $80$ font $8$ ; $5$ %, la moitié, font $4$.\nDonc $15$ % de $80$ font $8 + 4 = 12$.\n⭐ Découper un pourcentage en morceaux faciles ($10$ %, $5$ %, $1$ %) : c'est le geste du calcul mental.",
          micros: ["auto_num_calcul_mental"],
        },
        {
          enonce: "Convertir $3\\,400$ mm³ en cm³.",
          correction:
            "$1$ cm $= 10$ mm, donc $1$ cm³ $= 10 \\times 10 \\times 10 = 1\\,000$ mm³.\nPour passer des mm³ aux cm³, on divise par $1\\,000$ : $3\\,400 \\div 1\\,000 = 3{,}4$.\n$3\\,400$ mm³ $= 3{,}4$ cm³.\n⚠️ Le piège : diviser par $10$, le facteur des longueurs. Pour les volumes, chaque rang du tableau vaut $1\\,000$.\n⭐ Question tombée à l'épreuve anticipée de juin 2026 (Asie).",
          schema: tableau(["unité", "dm³", "cm³", "mm³"], ["3 400 mm³", "0,0034", "3,4", "3 400"]),
          micros: ["auto_num_conversions"],
        },
        {
          enonce: "Convertir $2{,}5$ m² en cm².",
          correction:
            "$1$ m $= 100$ cm, donc $1$ m² $= 100 \\times 100 = 10\\,000$ cm².\n$2{,}5 \\times 10\\,000 = 25\\,000$.\n$2{,}5$ m² $= 25\\,000$ cm².\n⚠️ Le piège : multiplier par $100$. Un carré de $1$ m de côté contient $100$ rangées de $100$ petits carrés de $1$ cm de côté.",
          schema: tableau(["unité", "m²", "dm²", "cm²"], ["2,5 m²", "2,5", "250", "25 000"]),
          micros: ["auto_num_conversions"],
        },
        {
          enonce: "Convertir $90$ km/h en m/s.",
          correction:
            "$90$ km/h, c'est $90$ km en une heure, soit $90\\,000$ m en $3\\,600$ s.\nEn une seconde : $\\dfrac{90\\,000}{3\\,600} = \\dfrac{900}{36} = 25$ m/s.\n⭐ Le raccourci à retenir : de km/h en m/s, on divise par $3{,}6$.\n⚠️ Le piège : diviser par $60$. Une heure compte $3\\,600$ secondes, pas $60$.",
          micros: ["auto_num_conversions"],
        },
        {
          enonce: "Écrire $1$ h $45$ min en heures, sous forme décimale. Puis convertir $0{,}3$ h en minutes.",
          correction:
            "$45$ min, c'est $\\dfrac{45}{60} = \\dfrac{3}{4} = 0{,}75$ h. Donc $1$ h $45$ min $= 1{,}75$ h.\n$0{,}3$ h $= 0{,}3 \\times 60 = 18$ min.\n⚠️ Le piège : écrire $1$ h $45$ min $= 1{,}45$ h. Les minutes vont de $60$ en $60$, pas de $100$ en $100$.",
          micros: ["auto_num_conversions"],
        },
        {
          enonce: "Donner un ordre de grandeur de $0{,}48 \\times 205$.",
          correction:
            "On arrondit chaque facteur à une valeur simple : $0{,}48 \\approx 0{,}5$ et $205 \\approx 200$.\n$0{,}5 \\times 200 = 100$ : le résultat est de l'ordre de $100$.\n✔️ Le calcul exact donne $98{,}4$ : l'estimation est très proche.\n⭐ Multiplier par $0{,}5$, c'est prendre la moitié.",
          micros: ["auto_num_ordre_grandeur"],
        },
        {
          enonce: "Un élève calcule la moyenne des notes $12$, $15$, $9$ et $14$, et trouve $16{,}5$. Sans refaire le calcul, pourquoi est-ce forcément faux ? Quelle est la bonne moyenne ?",
          correction:
            "Une moyenne est toujours comprise entre la plus petite et la plus grande valeur.\nIci, entre $9$ et $15$. Or $16{,}5 > 15$ : le résultat est impossible.\nLe bon calcul : $12 + 15 + 9 + 14 = 50$, et $50 \\div 4 = 12{,}5$.\n⭐ Ce contrôle prend deux secondes, et repère l'erreur sans rien refaire.\n⚠️ L'erreur la plus probable : une note oubliée, ou une division par un mauvais nombre.",
          schema: droiteGraduee(8, 17, 1, [
            { value: 9, label: "min" },
            { value: 12.5, label: "12,5" },
            { value: 15, label: "max" },
            { value: 16.5, label: "16,5 ?" },
          ]),
          micros: ["auto_num_vraisemblance"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Convertir, estimer, puis conclure par une phrase avec l'unité. Sans calculatrice.",
      rappel: [
        "Échelle $\\dfrac{1}{25\\,000}$ : $1$ cm sur la carte représente $25\\,000$ cm, soit $250$ m, en réalité.",
        "Vitesse $=$ distance $\\div$ durée, avec la durée EN HEURES pour des km/h.",
        "Aires : $1$ km² $= 100$ ha et $1$ ha $= 10\\,000$ m². Volumes : $1$ m³ $= 1\\,000$ L.",
        "Avant de répondre, on se demande : le résultat est-il vraisemblable ?",
      ],
      exercices: [
        {
          titre: "La carte de randonnée",
          enonce:
            "Sur une carte au $\\dfrac{1}{25\\,000}$, un sentier mesure $6$ cm.\na) Quelle est sa longueur réelle, en km ?\nb) Un randonneur marche à $4$ km/h. Combien de temps lui faut-il ?",
          correction:
            "a) $1$ cm sur la carte représente $25\\,000$ cm en réalité.\n$6 \\times 25\\,000 = 150\\,000$ cm.\nOn convertit : $150\\,000$ cm $= 1\\,500$ m $= 1{,}5$ km (on divise par $100$, puis par $1\\,000$).\nb) Durée $=$ distance $\\div$ vitesse $= 1{,}5 \\div 4 = 0{,}375$ h.\nEn minutes : $0{,}375 \\times 60 = 22{,}5$ min, soit $22$ min $30$ s.\n⚠️ Le piège : lire $0{,}375$ h comme $37{,}5$ min. Des heures décimales se convertissent en multipliant par $60$.",
          schema: tableau(["carte (cm)", "1", "4", "6"], ["réel (km)", 0.25, 1, 1.5]),
          micros: ["auto_num_conversions", "auto_num_calcul_mental"],
        },
        {
          titre: "Le train",
          enonce:
            "Un train parcourt $420$ km en $2$ h $20$ min.\na) Écrire la durée en heures, sous forme de fraction.\nb) Calculer sa vitesse moyenne en km/h.\nc) Un voyageur annonce « $180$ m/s ». Est-ce vraisemblable ?",
          correction:
            "a) $20$ min $= \\dfrac{20}{60} = \\dfrac{1}{3}$ h, donc $2$ h $20$ min $= 2 + \\dfrac{1}{3} = \\dfrac{7}{3}$ h.\nb) $v = 420 \\div \\dfrac{7}{3} = 420 \\times \\dfrac{3}{7} = 60 \\times 3 = 180$ km/h.\nc) Non : $180$ m/s, c'est $180 \\times 3{,}6 = 648$ km/h, plus du double de la vitesse d'un TGV. L'unité est fausse : c'est $180$ km/h.\n⚠️ Le piège : $2$ h $20$ min $= 2{,}2$ h. On trouverait $420 \\div 2{,}2 \\approx 191$ km/h, faux.\n⭐ Le tableau le confirme : en $20$ minutes, le train fait $60$ km ; en $7$ fois $20$ minutes, $420$ km.",
          schema: tableau(["durée", "20 min", "1 h", "2 h 20"], ["distance (km)", 60, 180, 420]),
          micros: ["auto_num_conversions", "auto_num_vraisemblance"],
        },
        {
          titre: "Les déchets d'une région",
          enonce:
            "Une région compte $5\\,950\\,000$ habitants (chiffres d'un modèle). Chaque habitant jette en moyenne $0{,}98$ kg de déchets par jour. Donner un ordre de grandeur de la masse de déchets jetée chaque jour dans la région, en tonnes.",
          correction:
            "On arrondit : $5\\,950\\,000 \\approx 6\\,000\\,000$ et $0{,}98 \\approx 1$.\nMasse par jour : $6\\,000\\,000 \\times 1 = 6\\,000\\,000$ kg.\nOn convertit : $1$ t $= 1\\,000$ kg, donc $6\\,000\\,000$ kg $= 6\\,000$ t.\nEnviron $6\\,000$ tonnes par jour.\n✔️ Le calcul exact donne $5\\,831$ tonnes : l'ordre de grandeur est le bon.\n⭐ En un an, c'est de l'ordre de $6\\,000 \\times 365$, environ $2$ millions de tonnes.",
          micros: ["auto_num_ordre_grandeur", "auto_num_conversions"],
        },
        {
          titre: "Un salaire mal recopié",
          enonce:
            "Un article de journal (imaginaire) écrit : « Payé $2\\,000$ € par mois, ce salarié gagne $2\\,400\\,000$ € par an. » L'erreur saute-t-elle aux yeux ? Corriger.",
          correction:
            "Un an compte $12$ mois : le salaire annuel est $2\\,000 \\times 12 = 24\\,000$ €.\n$2\\,400\\,000$ €, c'est $100$ fois trop : à $2\\,000$ € par mois, on ne gagne pas des millions en un an.\n⭐ L'ordre de grandeur suffit : $2\\,000 \\times 12$ est entre $2\\,000 \\times 10 = 20\\,000$ et $2\\,000 \\times 20 = 40\\,000$.\n⚠️ Deux zéros de trop : c'est l'erreur la plus fréquente dans les chiffres. On la voit dès qu'on se demande « est-ce possible ? ».",
          micros: ["auto_num_vraisemblance", "auto_num_ordre_grandeur"],
        },
        {
          titre: "La surface d'une commune",
          enonce:
            "Une commune couvre $12$ km².\na) Convertir cette surface en hectares, puis en m².\nb) Un terrain de football mesure environ $100$ m sur $70$ m. Combien de terrains de football tiendraient dans la commune, en ordre de grandeur ?",
          correction:
            "a) $1$ km² $= 100$ ha : un carré de $1$ km de côté contient $10 \\times 10$ carrés de $100$ m de côté.\n$12$ km² $= 1\\,200$ ha.\n$1$ ha $= 10\\,000$ m², donc $1\\,200$ ha $= 12\\,000\\,000$ m².\nb) Un terrain : $100 \\times 70 = 7\\,000$ m².\n$12\\,000\\,000 \\div 7\\,000 = 12\\,000 \\div 7$, environ $1\\,700$.\nEnviron $1\\,700$ terrains de football.\n⚠️ Le piège : $1$ km² $= 1\\,000$ m². C'est $1\\,000 \\times 1\\,000 = 1\\,000\\,000$ m².",
          schema: tableau(["unité", "km²", "ha", "m²"], ["12 km²", "12", "1 200", "12 000 000"]),
          micros: ["auto_num_conversions", "auto_num_ordre_grandeur"],
        },
        {
          titre: "La pluie sur un toit",
          enonce:
            "Dans une ville, il tombe environ $800$ mm de pluie par an (chiffres d'un modèle). Un toit couvre au sol $50$ m².\na) Convertir $800$ mm en mètres.\nb) Quel volume d'eau tombe sur le toit en un an ? Répondre en m³, puis en litres.",
          correction:
            "a) $1$ m $= 1\\,000$ mm, donc $800$ mm $= 0{,}8$ m.\nb) Le volume est celui d'une couche d'eau : surface $\\times$ hauteur $= 50 \\times 0{,}8 = 40$ m³.\n$1$ m³ $= 1\\,000$ L, donc $40$ m³ $= 40\\,000$ L.\n⭐ « $800$ mm de pluie », c'est $800$ litres sur chaque m² : $800 \\times 50 = 40\\,000$ L. Même résultat.\n⚠️ Le piège : calculer $50 \\times 800$ et répondre en m³. Les unités doivent être accordées AVANT de multiplier.",
          micros: ["auto_num_conversions", "auto_num_calcul_mental"],
        },
        {
          titre: "Deux remises de suite",
          enonce:
            "Un manteau coûte $60$ €. Il est soldé à $-30$ %, puis le magasin accorde $10$ % de remise supplémentaire sur le prix soldé.\na) Calculer de tête le prix final.\nb) Un client dit : « En tout, $40$ % de remise. » A-t-il raison ?",
          correction:
            "a) $-30$ %, c'est garder $70$ % : $60 \\times 0{,}7 = 42$ €.\nPuis $-10$ % sur $42$ € : $10$ % de $42$ font $4{,}20$ €, donc $42 - 4{,}20 = 37{,}80$ €.\nb) $40$ % de remise donneraient $60 \\times 0{,}6 = 36$ €. Or le manteau coûte $37{,}80$ € : le client se trompe.\nLa remise totale est $60 - 37{,}80 = 22{,}20$ €, soit $\\dfrac{22{,}2}{60} = 0{,}37$, donc $37$ %.\n⚠️ Le piège : additionner les pourcentages. La deuxième remise porte sur $42$ €, pas sur $60$ €.",
          schema: diagramme("barres", [
            { label: "Départ", value: 60 },
            { label: "−30 %", value: 42 },
            { label: "puis −10 %", value: 37.8 },
          ]),
          micros: ["auto_num_calcul_mental", "auto_num_vraisemblance"],
        },
        {
          titre: "Depuis la prise de la Bastille",
          enonce:
            "La prise de la Bastille a eu lieu le $14$ juillet $1789$. Donner un ordre de grandeur du nombre de jours écoulés depuis, jusqu'au $14$ juillet $2026$.",
          correction:
            "Nombre d'années : $2026 - 1789 = 237$ ans.\nOn arrondit : $237 \\approx 240$ ans, et $365 \\approx 360$ jours par an.\n$240 \\times 360 = 86\\,400$, car $24 \\times 36 = 864$.\nEnviron $86\\,000$ jours, de l'ordre de $10^5$.\n✔️ Le calcul exact, années bissextiles comprises, donne un peu plus de $86\\,500$ jours.\n⭐ Sur la frise, $237$ ans : un peu moins d'un quart de millénaire.\n⚠️ Le piège : oublier une étape, et répondre $237 \\times 12$ (des mois) ou $237 \\times 52$ (des semaines).",
          schema: droiteGraduee(1700, 2100, 100, [
            { value: 1789, label: "1789" },
            { value: 2026, label: "2026" },
          ]),
          micros: ["auto_num_ordre_grandeur", "auto_num_calcul_mental"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un problème complet, avec ses questions qui s'enchaînent. Sans calculatrice.",
      rappel: [
        "On convertit TOUT dans les mêmes unités avant de calculer.",
        "On estime d'abord l'ordre de grandeur : il sert de garde-fou au calcul exact.",
        "On conclut par une phrase, avec l'unité, et on se demande si le résultat est vraisemblable.",
      ],
      exercices: [
        {
          titre: "Le plein pour les vacances",
          enonce:
            "Une famille part en voiture pour un trajet d'environ $800$ km. Sa voiture consomme $6$ L d'essence aux $100$ km, et le litre coûte $1{,}90$ € (chiffres d'un modèle).\na) Combien de litres faut-il pour le trajet ?\nb) Calculer de tête le coût de l'essence.\nc) Un enfant annonce $912$ €. Sans refaire le calcul, pourquoi est-ce impossible ?\nd) Le trajet dure $8$ h, pauses comprises. Quelle est la vitesse moyenne ?",
          correction:
            "a) $800$ km, c'est $8$ fois $100$ km : $8 \\times 6 = 48$ L.\nb) $48 \\times 1{,}90 = 48 \\times 2 - 48 \\times 0{,}10 = 96 - 4{,}80 = 91{,}20$ €.\nc) Ordre de grandeur : $50$ L à $2$ € font $100$ €. $912$ €, c'est dix fois trop : une virgule a glissé.\nd) $v = 800 \\div 8 = 100$ km/h.\n⭐ « Fois $2$, puis on retire un peu » : c'est le geste du calcul mental avec les prix en $,90$.\n⚠️ Le piège au a) : $6 \\times 800 = 4\\,800$ L. La consommation est donnée pour $100$ km, pas pour $1$ km.",
          schema: tableau(["distance (km)", "100", "400", "800"], ["essence (L)", 6, 24, 48]),
          micros: ["auto_num_conversions", "auto_num_calcul_mental", "auto_num_ordre_grandeur", "auto_num_vraisemblance"],
        },
        {
          titre: "La mer qui monte",
          enonce:
            "Selon un modèle simple, le niveau moyen des océans monte de $3$ mm par an.\na) De combien monte-t-il en une décennie ? en un siècle ? Répondre en cm.\nb) Un élève affirme : « À ce rythme, la mer monte de $3$ m en un siècle. » Est-ce vraisemblable ?\nc) Combien d'années faut-il, à ce rythme, pour une hausse de $1$ m ? Arrondir à la dizaine.",
          correction:
            "a) En $10$ ans : $3 \\times 10 = 30$ mm $= 3$ cm.\nEn $100$ ans : $3 \\times 100 = 300$ mm $= 30$ cm.\nb) Non : $3$ m, c'est $300$ cm, dix fois trop. L'élève a confondu millimètres et centimètres.\nc) $1$ m $= 1\\,000$ mm, et $1\\,000 \\div 3 \\approx 333$ : environ $330$ ans.\n⭐ Le graphique est une droite, car la hausse est la même chaque année. En abscisse, les décennies ; en ordonnée, les décimètres ($1$ dm $= 10$ cm). Au bout de $10$ décennies : $3$ dm, soit $30$ cm.\n⚠️ Un modèle simplifie : rien ne dit que le rythme restera le même pendant trois siècles.",
          schema: repere([-1, 11, -1, 4], [{ q: [0, 0.3, 0] }], [{ x: 10, y: 3, label: "10 ; 3" }], undefined, true),
          micros: ["auto_num_conversions", "auto_num_vraisemblance", "auto_num_calcul_mental"],
        },
        {
          titre: "Le parc sur la carte",
          enonce:
            "Sur une carte au $\\dfrac{1}{100\\,000}$, un parc naturel est représenté par un rectangle de $3$ cm sur $4$ cm.\na) Que représente $1$ cm sur la carte, en km ?\nb) Quelles sont les dimensions réelles du parc ? Son aire réelle, en km², puis en hectares ?\nc) L'aire sur la carte est de $12$ cm². Un élève en déduit que l'aire réelle vaut $12 \\times 100\\,000 = 1\\,200\\,000$ cm², soit $120$ m². Qu'en penser ?\nd) Un randonneur fait le tour du parc à $4$ km/h. Combien de temps met-il ?",
          correction:
            "a) $1$ cm représente $100\\,000$ cm $= 1\\,000$ m $= 1$ km.\nb) $3$ km sur $4$ km. Aire : $3 \\times 4 = 12$ km², soit $12 \\times 100 = 1\\,200$ ha.\nc) C'est absurde : $120$ m², c'est la surface d'un appartement, pas celle d'un parc naturel.\nPour les AIRES, l'échelle joue deux fois : $12$ cm² représentent $12 \\times 100\\,000 \\times 100\\,000$ cm², soit bien $12$ km².\nd) Périmètre : $2 \\times (3 + 4) = 14$ km. Durée : $14 \\div 4 = 3{,}5$ h, soit $3$ h $30$ min.\n⚠️ Le piège : $3{,}5$ h $= 3$ h $50$ min. $0{,}5$ h, c'est une demi-heure : $30$ min.\n⭐ Le tableau : les longueurs sont multipliées par $100\\,000$, les aires par $100\\,000 \\times 100\\,000$.",
          schema: tableauProba(
            ["", "carte", "réalité"],
            [
              ["longueur", "3 cm", "3 km"],
              ["largeur", "4 cm", "4 km"],
              ["aire", "12 cm²", "12 km²"],
            ],
          ),
          micros: ["auto_num_conversions", "auto_num_vraisemblance", "auto_num_calcul_mental"],
        },
        {
          titre: "Le salaire horaire",
          enonce:
            "Une salariée gagne $1\\,820$ € par mois, $12$ mois par an. Elle travaille $35$ heures par semaine, $52$ semaines par an (on ne tient pas compte des congés, pour simplifier).\na) Calculer son salaire annuel.\nb) Calculer le nombre d'heures travaillées dans l'année.\nc) En déduire son salaire horaire.\nd) Contrôler le résultat par un ordre de grandeur, sachant qu'un mois compte environ $150$ heures de travail.",
          correction:
            "a) $1\\,820 \\times 12 = 18\\,200 + 3\\,640 = 21\\,840$ €.\nb) $35 \\times 52 = 35 \\times 50 + 35 \\times 2 = 1\\,750 + 70 = 1\\,820$ h.\nc) $\\dfrac{21\\,840}{1\\,820} = 12$ € de l'heure, car $1\\,820 \\times 12 = 21\\,840$ : c'est le calcul du a).\nd) $1\\,820 \\div 150$ est proche de $1\\,800 \\div 150 = 12$ : même ordre de grandeur. ✔️\n⭐ Une coïncidence utile : $1\\,820$ est à la fois le salaire mensuel et le nombre d'heures dans l'année. Le salaire horaire vaut donc le nombre de mois, $12$.\n⚠️ Le piège : diviser le salaire MENSUEL par les heures ANNUELLES, et trouver $1$ € de l'heure. Invraisemblable : on a mélangé deux durées.",
          micros: ["auto_num_calcul_mental", "auto_num_ordre_grandeur", "auto_num_vraisemblance", "auto_num_conversions"],
        },
      ],
    },
  ],
};
