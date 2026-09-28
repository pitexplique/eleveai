// ─── Fiche d'exercices : fractions et puissances (1re, automatismes) ─────────
//                              20 exercices corrigés
//
// Deuxième feuille des automatismes de première (28/09/2026), bâtie sur
// l'étalon `maths-premiere-auto-comparer.tsx`. Première partie de l'épreuve
// anticipée, SANS CALCULATRICE : dénominateurs petits, exposants modestes.
// Alignée sur `lib/tutor-v4/questionBank/premiere/maths/automatismes-calcul.bank.ts`.
// Les exercices 1 (« 2/5 − 3/10 », Antilles), 4 (« (5³)⁴ × 5¹⁰ », Asie) et 6
// (« le nombre 2/5 est égal à ») reprennent des questions des sujets de juin 2026.
//
// ⭐⭐ LE FIL : UN MÊME NOMBRE A PLUSIEURS ÉCRITURES, ET CHACUNE SERT À QUELQUE
// CHOSE. La fraction pour calculer juste (exercice 19 : 6/5 puis 5/6 se
// compensent, ce que « +20 % puis −17 % » cache), le pourcentage pour comparer
// (exercice 11), la puissance de 10 pour les très grands nombres (exercices 12
// et 18 : milliards d'euros, millions d'habitants).
//
// ⭐ Frédéric, 28/09 : un lien GRAPHIQUE (droite graduée, camemberts,
// diagrammes en barres) et un lien à l'ÉCONOMIE ou à l'HISTOIRE-GÉO (budget
// d'un ménage, emplois, chômage, dépenses d'un État, loyers, pouvoir d'achat,
// TVA, occupation du territoire, croissance d'une ville). Les chiffres sont
// des MODÈLES arrondis, jamais présentés comme des données officielles.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-auto-fractions-puissances.mjs`.
//
// Micro-compétences : auto_num_fractions_operations (1, 2, 3, 9, 10, 13, 16,
// 17, 19), auto_num_puissances (4, 5, 8, 12, 15, 18, 20), auto_num_ecritures
// (6, 7, 8, 10, 11, 12, 14, 16, 17, 18, 19). 3/3.

import { CanvasRenderer } from "@/lib/canvas";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { diagramme, tableau } from "@/lib/fiches-exercices/figures";

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

export const exercicesAutoFractionsPuissancesPremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "auto-fractions-puissances",
  titre: "Fractions et puissances",
  accroche:
    "Vingt exercices sans calculatrice, comme à l'épreuve anticipée : calculer avec des fractions, avec des puissances, passer d'une fraction à un décimal ou à un pourcentage. Un rappel de cours avant chaque niveau, et une correction écrite étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Sans calculatrice.",
      rappel: [
        "Additionner ou soustraire deux fractions : on les met au MÊME dénominateur, puis on ajoute les numérateurs. Le dénominateur ne bouge plus.",
        "Multiplier : numérateur fois numérateur, dénominateur fois dénominateur. Diviser par une fraction, c'est multiplier par son INVERSE.",
        "Puissances : $a^m \\times a^n = a^{m+n}$ ; $\\dfrac{a^m}{a^n} = a^{m-n}$ ; $(a^m)^n = a^{m \\times n}$.",
        "Trois écritures d'un même nombre : $\\dfrac{1}{4} = 0{,}25 = 25$ %.",
      ],
      exercices: [
        {
          enonce: "Calculer $\\dfrac{2}{5} - \\dfrac{3}{10}$. Donner le résultat sous forme de fraction irréductible.",
          correction:
            "$10$ est un multiple de $5$ : on transforme seulement la première fraction.\n$\\dfrac{2}{5} = \\dfrac{2 \\times 2}{5 \\times 2} = \\dfrac{4}{10}$.\nDonc $\\dfrac{4}{10} - \\dfrac{3}{10} = \\dfrac{1}{10}$.\n⚠️ Le piège : soustraire en haut ET en bas, $\\dfrac{2 - 3}{5 - 10}$. Une addition ou une soustraction ne touche jamais aux dénominateurs.\n⭐ La droite graduée le montre : $\\dfrac{3}{10}$ et $\\dfrac{2}{5}$ sont à un dixième l'un de l'autre.",
          schema: droiteGraduee(0, 0.5, 0.1, [
            { value: 0.3, label: "3/10" },
            { value: 0.4, label: "2/5" },
          ]),
          micros: ["auto_num_fractions_operations"],
        },
        {
          enonce: "Calculer $\\dfrac{3}{4} \\times \\dfrac{2}{9}$.",
          correction:
            "Pour multiplier, pas besoin du même dénominateur : on multiplie en haut, et en bas.\n$\\dfrac{3}{4} \\times \\dfrac{2}{9} = \\dfrac{3 \\times 2}{4 \\times 9} = \\dfrac{6}{36}$.\nOn simplifie par $6$ : $\\dfrac{6}{36} = \\dfrac{1}{6}$.\n⭐ Plus rapide : simplifier AVANT de multiplier. $3$ et $9$ se simplifient par $3$, $2$ et $4$ par $2$. Il reste $\\dfrac{1}{2} \\times \\dfrac{1}{3} = \\dfrac{1}{6}$.\n⚠️ Mettre au même dénominateur est inutile ici : c'est le geste de l'addition, pas du produit.",
          micros: ["auto_num_fractions_operations"],
        },
        {
          enonce: "Calculer $\\dfrac{5}{6} \\div \\dfrac{10}{3}$.",
          correction:
            "Diviser par $\\dfrac{10}{3}$, c'est multiplier par son inverse, $\\dfrac{3}{10}$.\n$\\dfrac{5}{6} \\times \\dfrac{3}{10} = \\dfrac{15}{60}$.\nOn simplifie par $15$ : $\\dfrac{15}{60} = \\dfrac{1}{4}$.\n⚠️ Le piège : retourner la PREMIÈRE fraction. Seule celle par laquelle on divise se retourne.\n✔️ Vérification : $\\dfrac{1}{4} \\times \\dfrac{10}{3} = \\dfrac{10}{12} = \\dfrac{5}{6}$.",
          micros: ["auto_num_fractions_operations"],
        },
        {
          enonce: "Écrire $(5^3)^4 \\times 5^{10}$ sous la forme d'une seule puissance de $5$.",
          correction:
            "D'abord la puissance d'une puissance : on MULTIPLIE les exposants. $(5^3)^4 = 5^{3 \\times 4} = 5^{12}$.\nPuis le produit de deux puissances de $5$ : on AJOUTE les exposants. $5^{12} \\times 5^{10} = 5^{22}$.\n⚠️ Deux règles, deux gestes : multiplier pour $(a^m)^n$, ajouter pour $a^m \\times a^n$. Tout additionner donnerait $5^{17}$ : c'est faux.\n⭐ Question tombée à l'épreuve anticipée de juin 2026 (Asie).",
          micros: ["auto_num_puissances"],
        },
        {
          enonce: "Calculer $\\dfrac{2^7 \\times 2^{-3}}{2^2}$.",
          correction:
            "Au numérateur, on ajoute les exposants : $2^7 \\times 2^{-3} = 2^{7 + (-3)} = 2^4$.\nPour le quotient, on SOUSTRAIT les exposants : $\\dfrac{2^4}{2^2} = 2^{4 - 2} = 2^2$.\nEt $2^2 = 4$.\n⚠️ Un exposant négatif ne rend pas le nombre négatif : $2^{-3} = \\dfrac{1}{8}$, qui est positif.",
          micros: ["auto_num_puissances"],
        },
        {
          enonce: "Écrire $\\dfrac{2}{5}$ sous forme décimale, puis sous forme de pourcentage.",
          correction:
            "Sous forme décimale : on multiplie en haut et en bas par $2$. $\\dfrac{2}{5} = \\dfrac{4}{10} = 0{,}4$.\nEn pourcentage : on veut le dénominateur $100$. $\\dfrac{2}{5} = \\dfrac{40}{100} = 40$ %.\n⚠️ Le piège : écrire $0{,}4$ %. Un pourcentage, c'est le décimal multiplié par $100$ : $0{,}4 = 40$ %.\n⭐ Question tombée à l'épreuve anticipée de juin 2026.",
          micros: ["auto_num_ecritures"],
        },
        {
          enonce: "Écrire $0{,}125$ sous forme de fraction irréductible, puis en pourcentage.",
          correction:
            "$0{,}125$ a trois chiffres après la virgule : c'est $\\dfrac{125}{1000}$.\nOn simplifie par $125$, car $125 \\times 8 = 1000$ : $\\dfrac{125}{1000} = \\dfrac{1}{8}$.\nEn pourcentage : $0{,}125 \\times 100 = 12{,}5$ %.\n⭐ À connaître par cœur : $\\dfrac{1}{2} = 50$ %, $\\dfrac{1}{4} = 25$ %, $\\dfrac{1}{8} = 12{,}5$ %. Chaque fois qu'on coupe en deux, le pourcentage est divisé par deux.",
          micros: ["auto_num_ecritures"],
        },
        {
          enonce: "Donner l'écriture décimale de $3{,}2 \\times 10^4$, puis celle de $5 \\times 10^{-3}$.",
          correction:
            "$10^4 = 10\\,000$ : multiplier par $10^4$ décale la virgule de $4$ rangs vers la droite. $3{,}2 \\times 10^4 = 32\\,000$.\n$10^{-3} = 0{,}001$ : multiplier par $10^{-3}$ décale la virgule de $3$ rangs vers la GAUCHE. $5 \\times 10^{-3} = 0{,}005$.\n⚠️ Le piège : $10^{-3}$ n'est pas $-1\\,000$. L'exposant négatif veut dire « petit », pas « négatif ».",
          micros: ["auto_num_puissances", "auto_num_ecritures"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Traduire la situation en calcul, puis conclure par une phrase. Sans calculatrice.",
      rappel: [
        "Prendre une fraction d'une quantité, c'est MULTIPLIER : $\\dfrac{2}{3}$ de $600$, c'est $\\dfrac{2}{3} \\times 600 = 400$.",
        "Ce qui reste quand on a retiré des parts : $1$ moins la somme des parts.",
        "Pour comparer des parts, on les écrit toutes en pourcentage, c'est-à-dire sur $100$.",
        "Les grands nombres s'écrivent avec des puissances de $10$ : un million $= 10^6$, un milliard $= 10^9$.",
      ],
      exercices: [
        {
          titre: "Le budget d'un ménage",
          enonce:
            "Un ménage gagne $2\\,400$ € par mois. Il consacre $\\dfrac{1}{3}$ de ce revenu au logement et $\\dfrac{1}{4}$ à l'alimentation.\na) Quelle fraction du revenu reste-t-il pour le reste des dépenses ?\nb) Combien d'euros cela représente-t-il ?",
          correction:
            "a) On additionne les deux parts sur le dénominateur commun $12$ : $\\dfrac{1}{3} + \\dfrac{1}{4} = \\dfrac{4}{12} + \\dfrac{3}{12} = \\dfrac{7}{12}$.\nLe reste, c'est le tout moins les parts : $1 - \\dfrac{7}{12} = \\dfrac{12}{12} - \\dfrac{7}{12} = \\dfrac{5}{12}$.\nb) $\\dfrac{1}{12}$ du revenu, c'est $2\\,400 \\div 12 = 200$ €. Donc $\\dfrac{5}{12}$, c'est $5 \\times 200 = 1\\,000$ €.\n✔️ En euros : logement $800$ €, alimentation $600$ €, reste $1\\,000$ €. Total : $2\\,400$ €.\n⚠️ Le piège : $\\dfrac{1}{3} + \\dfrac{1}{4} = \\dfrac{2}{7}$. On n'additionne jamais les dénominateurs.",
          schema: diagramme("camembert", [
            { label: "Logement", value: 800 },
            { label: "Alimentation", value: 600 },
            { label: "Reste", value: 1000 },
          ]),
          micros: ["auto_num_fractions_operations"],
        },
        {
          titre: "Les emplois d'une région",
          enonce:
            "Dans une région (chiffres d'un modèle), $\\dfrac{2}{3}$ des actifs travaillent dans les services, et parmi eux $\\dfrac{3}{8}$ travaillent dans le commerce. Quelle fraction de tous les actifs travaille dans le commerce ? Donner aussi le pourcentage.",
          correction:
            "« $\\dfrac{3}{8}$ DE $\\dfrac{2}{3}$ » : le mot « de » se traduit par une multiplication.\n$\\dfrac{3}{8} \\times \\dfrac{2}{3} = \\dfrac{6}{24}$.\nOn simplifie par $6$ : $\\dfrac{6}{24} = \\dfrac{1}{4}$.\nEn pourcentage : $\\dfrac{1}{4} = 25$ %. Un actif sur quatre travaille dans le commerce.\n⚠️ Le piège : additionner $\\dfrac{2}{3} + \\dfrac{3}{8}$. Une part d'une part se MULTIPLIE, et le résultat est plus petit que chacune des deux.",
          micros: ["auto_num_fractions_operations", "auto_num_ecritures"],
        },
        {
          titre: "Trois pays, trois écritures",
          enonce:
            "Dans trois pays (chiffres d'un modèle), la part des actifs au chômage est donnée ainsi : pays $A$, $\\dfrac{1}{20}$ ; pays $B$, $0{,}08$ ; pays $C$, $\\dfrac{3}{50}$. Ranger les trois pays du taux le plus bas au taux le plus haut.",
          correction:
            "Trois écritures différentes : on les met toutes en pourcentage.\n$A$ : $\\dfrac{1}{20} = \\dfrac{5}{100} = 5$ % (on a multiplié en haut et en bas par $5$).\n$B$ : $0{,}08 = \\dfrac{8}{100} = 8$ %.\n$C$ : $\\dfrac{3}{50} = \\dfrac{6}{100} = 6$ % (on a multiplié par $2$).\nDu plus bas au plus haut : $A$ ($5$ %), puis $C$ ($6$ %), puis $B$ ($8$ %).\n⭐ Une même écriture pour tous, et la comparaison se fait d'un coup d'œil, comme sur le diagramme.\n⚠️ Le piège : croire que $\\dfrac{3}{50}$ est petit « parce que $50$ est grand ».",
          schema: diagramme("barres", [
            { label: "A", value: 5 },
            { label: "B", value: 8 },
            { label: "C", value: 6 },
          ]),
          micros: ["auto_num_ecritures"],
        },
        {
          titre: "Les dépenses d'un État",
          enonce:
            "Un pays (chiffres d'un modèle) compte $60$ millions d'habitants, et son État dépense $480$ milliards d'euros par an.\na) Écrire ces deux nombres sous la forme $a \\times 10^n$, avec $1 \\leqslant a < 10$.\nb) Combien l'État dépense-t-il par habitant et par an ?",
          correction:
            "a) Un million, c'est $10^6$ : $60$ millions $= 60 \\times 10^6 = 6 \\times 10^7$.\nUn milliard, c'est $10^9$ : $480$ milliards $= 480 \\times 10^9 = 4{,}8 \\times 10^{11}$.\nb) Par habitant, on divise : $\\dfrac{4{,}8 \\times 10^{11}}{6 \\times 10^7}$.\nLes nombres d'un côté : $\\dfrac{4{,}8}{6} = 0{,}8$. Les puissances de l'autre : $\\dfrac{10^{11}}{10^7} = 10^{11 - 7} = 10^4$.\nRésultat : $0{,}8 \\times 10^4 = 8\\,000$ € par habitant et par an.\n⚠️ Le piège : diviser $11$ par $7$. Pour un quotient de puissances, on SOUSTRAIT les exposants.",
          micros: ["auto_num_puissances", "auto_num_ecritures"],
        },
        {
          titre: "Une énigme ancienne",
          enonce:
            "Une vieille énigme raconte qu'un père laisse des chameaux à ses trois fils : $\\dfrac{1}{2}$ du troupeau pour l'aîné, $\\dfrac{1}{3}$ pour le deuxième, $\\dfrac{1}{9}$ pour le plus jeune.\na) Quelle fraction du troupeau le père a-t-il distribuée ?\nb) Le troupeau compte $18$ chameaux. Combien chaque fils en reçoit-il, et combien en reste-t-il ?",
          correction:
            "a) Dénominateur commun $18$, car $18$ est un multiple de $2$, de $3$ et de $9$.\n$\\dfrac{1}{2} + \\dfrac{1}{3} + \\dfrac{1}{9} = \\dfrac{9}{18} + \\dfrac{6}{18} + \\dfrac{2}{18} = \\dfrac{17}{18}$.\nLe père n'a PAS tout distribué : il reste $1 - \\dfrac{17}{18} = \\dfrac{1}{18}$ du troupeau.\nb) $\\dfrac{1}{2}$ de $18$ : $9$. $\\dfrac{1}{3}$ de $18$ : $6$. $\\dfrac{1}{9}$ de $18$ : $2$.\n$9 + 6 + 2 = 17$ : il reste $1$ chameau, c'est bien $\\dfrac{1}{18}$ de $18$.\n⭐ Dans l'énigme, le troupeau compte $17$ chameaux, et un voyageur prête le sien pour faire $18$ : il le reprend à la fin ! Le calcul explique le tour : les trois parts ne font pas $1$.",
          schema: diagramme("barres", [
            { label: "1er", value: 9 },
            { label: "2e", value: 6 },
            { label: "3e", value: 2 },
            { label: "Reste", value: 1 },
          ]),
          micros: ["auto_num_fractions_operations"],
        },
        {
          titre: "Un loyer qui augmente",
          enonce:
            "En dix ans, un loyer est passé de $800$ € à $1\\,000$ € par mois (chiffres d'un modèle).\na) Écrire le quotient $\\dfrac{1\\,000}{800}$ sous forme de fraction irréductible, puis sous forme décimale.\nb) De quel pourcentage le loyer a-t-il augmenté ?",
          correction:
            "a) On simplifie par $200$ : $\\dfrac{1\\,000}{800} = \\dfrac{5}{4}$.\nEt $\\dfrac{5}{4} = 1 + \\dfrac{1}{4} = 1{,}25$.\nb) $1{,}25 = 125$ % : le nouveau loyer vaut $125$ % de l'ancien.\nIl a donc augmenté de $125 - 100 = 25$ %.\n✔️ En euros : $25$ % de $800$, c'est $200$ €, et $800 + 200 = 1\\,000$.\n⚠️ Le piège : répondre « $125$ % d'augmentation ». Le quotient dit ce que l'on paie, pas ce que l'on paie EN PLUS.",
          schema: diagramme("barres", [
            { label: "Avant", value: 800 },
            { label: "Après", value: 1000 },
          ]),
          micros: ["auto_num_ecritures"],
        },
        {
          titre: "Le prix du stockage",
          enonce:
            "Selon un modèle simplifié, le prix d'un gigaoctet de mémoire est divisé par $10$ tous les cinq ans. En $2000$, il vaut $10^3$ €.\na) Écrire le prix en $2005$, $2010$, $2015$ et $2020$ sous forme de puissances de $10$.\nb) Par combien le prix a-t-il été divisé entre $2000$ et $2020$ ?",
          correction:
            "a) Diviser par $10$, c'est enlever $1$ à l'exposant.\n$2005$ : $10^2$ €. $2010$ : $10^1 = 10$ €. $2015$ : $10^0 = 1$ €. $2020$ : $10^{-1} = 0{,}1$ €.\nb) $\\dfrac{10^3}{10^{-1}} = 10^{3 - (-1)} = 10^4$ : le prix a été divisé par $10\\,000$.\n⭐ $10^0 = 1$ et $10^{-1} = 0{,}1$ : les exposants continuent sous zéro, avec la même règle.\n⚠️ Le piège : $3 - (-1) = 2$. Retirer un nombre négatif, c'est AJOUTER : $3 + 1 = 4$.",
          schema: tableau(["année", "2000", "2005", "2010", "2015", "2020"], ["prix (€)", 1000, 100, 10, 1, 0.1], true),
          micros: ["auto_num_puissances"],
        },
        {
          titre: "Le territoire en parts",
          enonce:
            "Le diagramme donne, selon un modèle arrondi, la part du territoire d'un pays occupée par les forêts, les terres agricoles et le reste (villes, routes, eaux…), en pourcentage.\na) Écrire chaque part sous forme de fraction irréductible.\nb) Vérifier que la somme des trois fractions vaut $1$.\nc) Le pays mesure $550\\,000$ km². Quelle surface est couverte de forêts ?",
          figure: diagramme("camembert", [
            { label: "Forêts", value: 30 },
            { label: "Agricole", value: 50 },
            { label: "Autres", value: 20 },
          ]),
          correction:
            "a) Un pourcentage est une fraction sur $100$, qu'on simplifie.\nForêts : $\\dfrac{30}{100} = \\dfrac{3}{10}$. Terres agricoles : $\\dfrac{50}{100} = \\dfrac{1}{2}$. Autres : $\\dfrac{20}{100} = \\dfrac{1}{5}$.\nb) Tout sur $10$ : $\\dfrac{3}{10} + \\dfrac{5}{10} + \\dfrac{2}{10} = \\dfrac{10}{10} = 1$. Les trois parts couvrent bien tout le territoire.\nc) $\\dfrac{3}{10}$ de $550\\,000$ : $550\\,000 \\div 10 = 55\\,000$, puis $55\\,000 \\times 3 = 165\\,000$ km².\n⭐ Dans un camembert, la somme des parts vaut toujours $1$, soit $100$ %.",
          micros: ["auto_num_ecritures", "auto_num_fractions_operations"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un problème complet, avec ses questions qui s'enchaînent. Sans calculatrice.",
      rappel: [
        "Deux évolutions successives se MULTIPLIENT : $\\times \\dfrac{5}{4}$ puis $\\times \\dfrac{6}{5}$, c'est $\\times \\dfrac{5}{4} \\times \\dfrac{6}{5}$.",
        "Quotient de deux nombres écrits avec des puissances de $10$ : on divise les nombres entre eux, puis on soustrait les exposants.",
        "On conclut par une phrase, avec l'unité, et on se demande si le résultat est vraisemblable.",
      ],
      exercices: [
        {
          titre: "Le pouvoir d'achat",
          enonce:
            "En dix ans (chiffres d'un modèle), les prix ont été multipliés par $\\dfrac{5}{4}$ et un salaire par $\\dfrac{6}{5}$.\na) Écrire chacune de ces hausses en pourcentage.\nb) Le pouvoir d'achat est multiplié par $\\dfrac{6}{5} \\div \\dfrac{5}{4}$. Calculer ce nombre sous forme de fraction, puis sous forme décimale.\nc) Le salarié peut-il acheter plus, ou moins, qu'il y a dix ans ? De combien de pour cent ?",
          correction:
            "a) $\\dfrac{5}{4} = 1{,}25$ : les prix ont augmenté de $25$ %. $\\dfrac{6}{5} = 1{,}2$ : le salaire a augmenté de $20$ %.\nb) Diviser par $\\dfrac{5}{4}$, c'est multiplier par $\\dfrac{4}{5}$ : $\\dfrac{6}{5} \\times \\dfrac{4}{5} = \\dfrac{24}{25}$.\nSur $100$ : $\\dfrac{24}{25} = \\dfrac{96}{100} = 0{,}96$.\nc) $0{,}96 < 1$ : il peut acheter MOINS, $96$ % de ce qu'il achetait, soit $4$ % de moins.\n⚠️ Le piège : « $+20$ % contre $+25$ %, donc $-5$ % ». Des évolutions se multiplient ou se divisent, elles ne se soustraient pas.\n⭐ Son salaire a augmenté, et pourtant il peut acheter moins : c'est exactement ce que mesure le pouvoir d'achat. Le diagramme le montre en base $100$ : la barre des prix dépasse celle du salaire.",
          schema: diagramme("barres", [
            { label: "Départ", value: 100 },
            { label: "Salaire", value: 120 },
            { label: "Prix", value: 125 },
          ]),
          micros: ["auto_num_fractions_operations", "auto_num_ecritures"],
        },
        {
          titre: "La richesse par habitant",
          enonce:
            "On compare deux pays (chiffres d'un modèle). Le pays $A$ produit chaque année $2\\,800$ milliards d'euros de richesses pour $70$ millions d'habitants ; le pays $B$ en produit $18\\,000$ milliards pour $300$ millions d'habitants.\na) Écrire ces quatre nombres sous la forme $a \\times 10^n$, avec $1 \\leqslant a < 10$.\nb) Calculer la richesse produite par habitant dans chaque pays.\nc) Combien de fois celle de $B$ contient-elle celle de $A$ ? Donner le résultat en fraction, en décimal, puis en pourcentage de plus.",
          correction:
            "a) $2\\,800$ milliards $= 2{,}8 \\times 10^3 \\times 10^9 = 2{,}8 \\times 10^{12}$. $70$ millions $= 7 \\times 10^7$.\n$18\\,000$ milliards $= 1{,}8 \\times 10^4 \\times 10^9 = 1{,}8 \\times 10^{13}$. $300$ millions $= 3 \\times 10^8$.\nb) $A$ : $\\dfrac{2{,}8 \\times 10^{12}}{7 \\times 10^7} = 0{,}4 \\times 10^5 = 40\\,000$ € par habitant.\n$B$ : $\\dfrac{1{,}8 \\times 10^{13}}{3 \\times 10^8} = 0{,}6 \\times 10^5 = 60\\,000$ € par habitant.\nc) $\\dfrac{60\\,000}{40\\,000} = \\dfrac{3}{2} = 1{,}5$ : $B$ produit par habitant $150$ % de ce que produit $A$, soit $50$ % de plus.\n⚠️ Le piège : comparer directement $2\\,800$ et $18\\,000$ milliards. $B$ produit environ six fois plus, mais pour environ quatre fois plus d'habitants : c'est le quotient PAR HABITANT qui compte.\n⭐ $0{,}4 \\times 10^5$ : on décale la virgule de $5$ rangs vers la droite, $40\\,000$.",
          schema: diagramme("barres", [
            { label: "A (milliers €)", value: 40 },
            { label: "B (milliers €)", value: 60 },
          ]),
          micros: ["auto_num_puissances", "auto_num_ecritures"],
        },
        {
          titre: "La TVA et les soldes",
          enonce:
            "Un article coûte $50$ € hors taxes (HT). Le prix toutes taxes comprises (TTC) s'obtient en ajoutant une TVA de $20$ %.\na) Écrire $20$ % sous forme de fraction irréductible. Par quelle fraction multiplie-t-on le prix HT pour obtenir le prix TTC ?\nb) Calculer le prix TTC.\nc) Pendant les soldes, le magasin retire $\\dfrac{1}{6}$ du prix TTC. Calculer le prix soldé. Que remarque-t-on ?\nd) Écrire $\\dfrac{1}{6}$ en pourcentage, arrondi à l'unité. Pourquoi une remise de $20$ % ne ramène-t-elle pas au prix HT ?",
          correction:
            "a) $20$ % $= \\dfrac{20}{100} = \\dfrac{1}{5}$. Ajouter un cinquième, c'est multiplier par $1 + \\dfrac{1}{5} = \\dfrac{6}{5}$.\nb) $50 \\times \\dfrac{6}{5} = \\dfrac{300}{5} = 60$ € TTC.\nc) Retirer $\\dfrac{1}{6}$, c'est multiplier par $1 - \\dfrac{1}{6} = \\dfrac{5}{6}$. $60 \\times \\dfrac{5}{6} = 50$ €.\nOn retombe sur le prix HT, car $\\dfrac{6}{5} \\times \\dfrac{5}{6} = 1$.\nd) $\\dfrac{1}{6} \\approx 0{,}167$, soit environ $17$ %.\nUne remise de $20$ % donnerait $60 \\times \\dfrac{4}{5} = 48$ €, moins que le prix HT : ces $20$ % portent sur $60$ €, pas sur $50$ €.\n⚠️ Le piège : croire qu'une baisse de $20$ % annule une hausse de $20$ %. Pour revenir en arrière, on multiplie par l'INVERSE, $\\dfrac{5}{6}$.\n⭐ En pourcentage, la chose se cache ; en fraction, elle saute aux yeux : $\\dfrac{6}{5}$ et $\\dfrac{5}{6}$ sont inverses.",
          schema: diagramme("barres", [
            { label: "HT", value: 50 },
            { label: "TTC", value: 60 },
            { label: "Soldé", value: 50 },
          ]),
          micros: ["auto_num_fractions_operations", "auto_num_ecritures"],
        },
        {
          titre: "Une ville qui double",
          enonce:
            "Selon un modèle, une ville industrielle compte $5\\,000$ habitants en $1850$, et sa population double tous les $30$ ans jusqu'en $1970$.\na) Combien de fois la population double-t-elle entre $1850$ et $1970$ ? Par quelle puissance de $2$ est-elle multipliée ?\nb) Calculer la population en $1970$, et l'écrire sous la forme $a \\times 10^n$.\nc) Si ce rythme avait continué jusqu'en $2090$, la ville aurait-elle dépassé un million d'habitants ?",
          correction:
            "a) De $1850$ à $1970$ : $120$ ans, soit $\\dfrac{120}{30} = 4$ doublements. La population est multipliée par $2^4 = 16$.\nb) $5\\,000 \\times 16 = 80\\,000$ habitants, soit $8 \\times 10^4$.\nc) De $1850$ à $2090$ : $240$ ans, soit $8$ doublements, donc $\\times 2^8 = 256$.\n$5\\,000 \\times 256 = 1\\,280\\,000$ : oui, plus d'un million.\n✔️ Autre chemin : $2^8 = 2^4 \\times 2^4$, donc $80\\,000 \\times 16 = 1\\,280\\,000$.\n⚠️ Le piège : $4$ doublements, ce n'est pas $\\times 4$, ni $\\times 8$. C'est $\\times 2 \\times 2 \\times 2 \\times 2 = \\times 16$.\n⭐ Le diagramme, en milliers d'habitants : chaque barre est le double de la précédente. Aucune ville ne double indéfiniment : un modèle a ses limites.",
          schema: diagramme("barres", [
            { label: "1850", value: 5 },
            { label: "1880", value: 10 },
            { label: "1910", value: 20 },
            { label: "1940", value: 40 },
            { label: "1970", value: 80 },
          ]),
          micros: ["auto_num_puissances"],
        },
      ],
    },
  ],
};
