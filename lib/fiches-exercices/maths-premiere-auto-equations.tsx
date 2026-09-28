// ─── Fiche d'exercices : équations et inéquations (1re, automatismes) ────────
//                              20 exercices corrigés
//
// Cinquième feuille des automatismes de première (28/09/2026), bâtie sur
// l'étalon `maths-premiere-auto-comparer.tsx`. Première partie de l'épreuve
// anticipée, SANS CALCULATRICE, et SANS DISCRIMINANT : le second degré s'arrête
// à x² = a. Alignée sur
// `lib/tutor-v4/questionBank/premiere/maths/automatismes-algebre.bank.ts` :
// l'exercice 1 est celui de Métropole (7x + 4 = 5x + 6), l'exercice 3 celui
// d'Asie (x² = 5).
//
// ⭐⭐ LE FIL : UNE ÉQUATION RÉPOND À « QUAND EST-CE ÉGAL ? », UNE INÉQUATION À
// « À PARTIR DE QUAND ? ». Deux tarifs, deux villes, l'offre et la demande :
// l'égalité est le point où deux droites se croisent (exercices 9, 10, 17), et
// l'inéquation dit de quel côté du croisement on se trouve (14, 17, 20).
// La balance montre qu'on fait la MÊME opération des deux côtés (1, 5, 19) ;
// la droite graduée montre l'ensemble des solutions d'une inéquation.
//
// ⭐ Frédéric, 28/09 : un lien GRAPHIQUE (balance, droites graduées, repères,
// tableaux) et un lien à l'ÉCONOMIE ou à l'HISTOIRE-GÉO (location de voiture,
// prix d'équilibre, densité de population, surface agricole, abonnement,
// température et altitude, intérêts composés, villes qui se rapprochent,
// voyage scolaire, parc sur une carte, taxi). Les chiffres sont des MODÈLES,
// jamais présentés comme des données officielles.
//
// ⭐ PDF ≤ 12 pages : les dessins qui redisent le corrigé (5, 18) sont montrés
// à l'écran seulement (`ecranSeulement`, comme dans `maths-premiere-tc-derivation.tsx`).
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-auto-equations.mjs`.
//
// Micro-compétences : auto_alg_equation_premier_degre (1, 2, 9, 10, 14, 17,
// 19), auto_alg_equation_carre (3, 4, 13, 16, 19), auto_alg_equation_quotient
// (5, 6, 11, 12, 18), auto_alg_inequation (7, 8, 14, 15, 17, 18, 20). 4/4.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, droite, intervalles, repere, tableau, tableauProba } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

// ⭐ LA BALANCE (reprise de `maths-3e-equations.tsx`) : une ligne par état, les
// deux plateaux à l'équilibre, et l'opération faite DES DEUX CÔTÉS écrite en
// orange au-dessus. La dernière ligne, « x = … », est en vert. Du SVG simple,
// texte nu (pas de `$`) : on écrit « - » et « . » dans la donnée, affichés
// « − » et « , ».
// ⭐ Le script de recalcul relit `g` et `d` : chaque ligne doit avoir la même
// solution que la dernière.
const affiche = (s: string) => s.replace(/-/g, "−").replace(/\./g, ",");
const balance = (etapes: { g: string; d: string; op?: string }[]) => {
  const H = 62;
  return (
    <svg
      viewBox={`0 0 260 ${etapes.length * H + 4}`}
      role="img"
      aria-label={etapes.map((e) => `${e.op ? `${affiche(e.op)}, ` : ""}${affiche(e.g)} = ${affiche(e.d)}`).join(" ; ")}
      className="mx-auto w-full max-w-[17rem] print:max-w-[13rem]"
    >
      {etapes.map((e, i) => {
        const y = i * H;
        const fin = i === etapes.length - 1;
        const fond = fin ? "#dcfce7" : "#dbeafe";
        const trait = fin ? "#16a34a" : "#2563eb";
        const op = e.op ? (/^[−+÷×]/.test(e.op) ? `${affiche(e.op)} des deux côtés` : e.op) : "";
        return (
          <g key={i}>
            {op && (
              <text x={130} y={y + 12} textAnchor="middle" fontSize={11} fontWeight={700} fill={ORANGE}>
                ↓ {op}
              </text>
            )}
            <rect x={8} y={y + 17} width={112} height={22} rx={5} fill={fond} stroke={trait} strokeWidth={1.3} />
            <rect x={140} y={y + 17} width={112} height={22} rx={5} fill={fond} stroke={trait} strokeWidth={1.3} />
            <text x={64} y={y + 32} textAnchor="middle" fontSize={12} fill="#0f172a">
              {affiche(e.g)}
            </text>
            <text x={196} y={y + 32} textAnchor="middle" fontSize={12} fill="#0f172a">
              {affiche(e.d)}
            </text>
            <line x1={34} y1={y + 43} x2={226} y2={y + 43} stroke="#475569" strokeWidth={2.4} />
            <polygon points={`130,${y + 43} 121,${y + 58} 139,${y + 58}`} fill="#94a3b8" />
          </g>
        );
      })}
    </svg>
  );
};

export const exercicesAutoEquationsPremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "auto-equations",
  titre: "Équations et inéquations",
  accroche:
    "Vingt exercices sans calculatrice, comme à l'épreuve anticipée : résoudre ax + b = cx + d, x² = a, a/x = b, et une inéquation du premier degré. Balances, droites graduées et graphiques pour voir les solutions. Un rappel de cours avant chaque niveau, et une correction écrite étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Sans calculatrice.",
      rappel: [
        "Équation $ax + b = cx + d$ : on regroupe les $x$ d'un côté et les nombres de l'autre, en faisant la MÊME opération des deux côtés.",
        "$x^2 = a$ : deux solutions, $\\sqrt{a}$ et $-\\sqrt{a}$, si $a > 0$ ; une seule, $0$, si $a = 0$ ; aucune si $a < 0$.",
        "$\\dfrac{a}{x} = b$, avec $x \\neq 0$ et $b \\neq 0$ : on multiplie par $x$, puis on divise par $b$. $x = \\dfrac{a}{b}$.",
        "Inéquation : mêmes gestes, mais multiplier ou diviser par un nombre NÉGATIF renverse le sens de l'inégalité.",
      ],
      exercices: [
        {
          enonce: "Résoudre l'équation $7x + 4 = 5x + 6$.",
          correction:
            "On retire $5x$ des deux côtés : $2x + 4 = 6$.\nOn retire $4$ des deux côtés : $2x = 2$.\nOn divise les deux côtés par $2$ : $x = 1$.\n✔️ Vérification : $7 \\times 1 + 4 = 11$ et $5 \\times 1 + 6 = 11$.\n⚠️ Le piège : faire passer $5x$ à gauche sans changer son signe, et écrire $12x$.\n⭐ Question tombée à l'épreuve anticipée de juin 2026 (Métropole).",
          schema: balance([
            { g: "7x + 4", d: "5x + 6" },
            { g: "2x + 4", d: "6", op: "−5x" },
            { g: "2x", d: "2", op: "−4" },
            { g: "x", d: "1", op: "÷2" },
          ]),
          micros: ["auto_alg_equation_premier_degre"],
        },
        {
          enonce: "Résoudre l'équation $3(x - 2) = x + 4$.",
          correction:
            "On développe d'abord : $3x - 6 = x + 4$.\nOn retire $x$ des deux côtés : $2x - 6 = 4$.\nOn ajoute $6$ : $2x = 10$.\nOn divise par $2$ : $x = 5$.\n✔️ $3 \\times (5 - 2) = 9$ et $5 + 4 = 9$.\n⚠️ Le piège : $3(x - 2) = 3x - 2$. Le $3$ multiplie aussi le $2$.",
          micros: ["auto_alg_equation_premier_degre"],
        },
        {
          enonce: "Résoudre l'équation $x^2 = 5$.",
          correction:
            "$5 > 0$ : l'équation a deux solutions.\n$x = \\sqrt{5}$ ou $x = -\\sqrt{5}$.\n$S = \\{-\\sqrt{5}\\,;\\,\\sqrt{5}\\}$.\n⭐ Sur le dessin, la droite horizontale $y = 5$ coupe la parabole $y = x^2$ en DEUX points, symétriques.\n⚠️ Le piège : oublier la solution négative. $(-\\sqrt{5})^2 = 5$ aussi.\n⭐ Question tombée à l'épreuve anticipée de juin 2026 (Asie).",
          schema: repere([-4, 4, -1, 7], [{ q: [1, 0, 0] }], [{ x: -2.236, y: 5, label: "−√5" }, { x: 2.236, y: 5, label: "√5" }], 5, true),
          micros: ["auto_alg_equation_carre"],
        },
        {
          enonce: "Résoudre les équations :\na) $x^2 = 49$ ;\nb) $x^2 = -4$ ;\nc) $x^2 = 0$.",
          correction:
            "a) $49 = 7^2$ : $x = 7$ ou $x = -7$.\nb) Un carré n'est jamais négatif : aucune solution. $S = \\varnothing$.\nc) Seul $0$ a pour carré $0$ : $x = 0$.\n⚠️ Le piège au b) : répondre $x = -2$. Or $(-2)^2 = 4$, pas $-4$.\n⭐ Trois cas, trois nombres de solutions : deux, aucune, une.",
          micros: ["auto_alg_equation_carre"],
        },
        {
          enonce: "Résoudre l'équation $\\dfrac{12}{x} = 3$.",
          correction:
            "$x$ est au dénominateur : on suppose $x \\neq 0$.\nOn multiplie les deux côtés par $x$ : $12 = 3x$.\nOn divise par $3$ : $x = 4$.\n✔️ $\\dfrac{12}{4} = 3$.\n⚠️ Le piège : répondre $x = 36$, en multipliant $12$ par $3$. Or $\\dfrac{12}{36} = \\dfrac{1}{3}$, pas $3$.",
          schema: ecranSeulement(
            balance([
              { g: "12/x", d: "3" },
              { g: "12", d: "3x", op: "×x" },
              { g: "4", d: "x", op: "÷3" },
            ]),
          ),
          micros: ["auto_alg_equation_quotient"],
        },
        {
          enonce: "Résoudre l'équation $\\dfrac{5}{x} = -2$.",
          correction:
            "On suppose $x \\neq 0$, et on multiplie les deux côtés par $x$ : $5 = -2x$.\nOn divise par $-2$ : $x = \\dfrac{5}{-2} = -2{,}5$.\n✔️ $\\dfrac{5}{-2{,}5} = -2$.\n⚠️ Le signe compte : le numérateur $5$ est positif et le quotient est négatif, donc $x$ est NÉGATIF.",
          micros: ["auto_alg_equation_quotient"],
        },
        {
          enonce: "Résoudre l'inéquation $-2x + 3 > 7$, et représenter les solutions sur une droite graduée.",
          correction:
            "On retire $3$ des deux côtés : $-2x > 4$.\nOn divise par $-2$, un nombre NÉGATIF : le sens s'inverse. $x < \\dfrac{4}{-2}$, soit $x < -2$.\n$S = \\left]-\\infty\\,;\\,-2\\right[$ : crochet ouvert en $-2$, car l'inégalité est stricte.\n✔️ Test avec $x = -3$ : $-2 \\times (-3) + 3 = 9$, et $9 > 7$.\n⚠️ Le piège : garder le sens, et écrire $x > -2$.",
          schema: droite(-6, 2, { a: -2, aInclus: false }),
          micros: ["auto_alg_inequation"],
        },
        {
          enonce: "Résoudre l'inéquation $3x - 5 \\leqslant x + 1$.",
          correction:
            "On retire $x$ des deux côtés : $2x - 5 \\leqslant 1$.\nOn ajoute $5$ : $2x \\leqslant 6$.\nOn divise par $2$, un nombre POSITIF : le sens ne change pas. $x \\leqslant 3$.\n$S = \\left]-\\infty\\,;\\,3\\right]$ : le crochet est fermé en $3$, car $3$ est solution.\n⚠️ Le piège : un crochet ouvert en $3$. Avec $\\leqslant$, la borne est comprise.",
          micros: ["auto_alg_inequation"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Mettre en équation, résoudre, puis répondre par une phrase. Sans calculatrice.",
      rappel: [
        "Mettre en équation : on nomme l'inconnue (« soit $x$ le nombre de km »), on traduit l'énoncé par une égalité, on résout, on répond par une phrase.",
        "Deux tarifs sont égaux au point où leurs droites se croisent.",
        "Si l'inconnue est une longueur, un prix, un nombre de personnes, on ne garde que les solutions qui ont un sens.",
      ],
      exercices: [
        {
          titre: "Deux loueurs de voiture",
          enonce:
            "Pour louer une voiture une journée, le loueur $A$ demande $40$ € plus $0{,}20$ € par km, le loueur $B$ demande $60$ € plus $0{,}10$ € par km.\na) Pour quel kilométrage les deux loueurs coûtent-ils le même prix ? Quel est ce prix ?\nb) Lequel choisir pour $300$ km ?",
          correction:
            "a) Soit $x$ le nombre de km. Prix chez $A$ : $40 + 0{,}2x$. Chez $B$ : $60 + 0{,}1x$.\nÉgalité : $40 + 0{,}2x = 60 + 0{,}1x$.\nOn retire $0{,}1x$ : $40 + 0{,}1x = 60$. On retire $40$ : $0{,}1x = 20$. On multiplie par $10$ : $x = 200$.\nPour $200$ km, les deux coûtent $40 + 0{,}2 \\times 200 = 80$ €.\nb) Pour $300$ km : $A$ coûte $40 + 60 = 100$ €, $B$ coûte $60 + 30 = 90$ €. On choisit $B$.\n⭐ Le graphique, en centaines de km et en dizaines d'euros : les droites se croisent en $(2\\,;\\,8)$, soit $200$ km et $80$ €. Avant, la bleue ($A$) est en dessous ; après, c'est l'orange ($B$).\n⚠️ Le piège : $0{,}1x = 20$ donne $x = 2$. Diviser par $0{,}1$, c'est multiplier par $10$.",
          schema: repere([-1, 5, -1, 12], [{ q: [0, 2, 4] }, { q: [0, 1, 6], couleur: ORANGE }], [{ x: 2, y: 8, label: "2 ; 8" }], undefined, true),
          micros: ["auto_alg_equation_premier_degre"],
        },
        {
          titre: "Le prix d'équilibre",
          enonce:
            "Sur le marché d'un produit (modèle), au prix de $p$ euros, les producteurs veulent vendre $O = 2p - 4$ milliers d'unités, et les clients veulent acheter $D = 20 - p$ milliers d'unités.\na) Déterminer le prix d'équilibre, pour lequel l'offre est égale à la demande.\nb) Quelle quantité est alors échangée ?",
          correction:
            "a) À l'équilibre : $2p - 4 = 20 - p$.\nOn ajoute $p$ des deux côtés : $3p - 4 = 20$. On ajoute $4$ : $3p = 24$. On divise par $3$ : $p = 8$.\nb) $D = 20 - 8 = 12$ milliers d'unités, et $O = 2 \\times 8 - 4 = 12$. ✔️\n⭐ Sur le graphique, la droite de l'offre monte (plus c'est cher, plus on veut vendre), celle de la demande descend : elles se croisent en $(8\\,;\\,12)$.\n⚠️ Le piège : oublier le $-p$ de droite, écrire $2p = 24$ et trouver $p = 12$.",
          schema: repere([-1, 11, -1, 14], [{ q: [0, 2, -4] }, { q: [0, -1, 20], couleur: ORANGE }], [{ x: 8, y: 12, label: "8 ; 12" }], undefined, true),
          micros: ["auto_alg_equation_premier_degre"],
        },
        {
          titre: "Le partage de la location",
          enonce:
            "Un groupe d'amis loue une maison pour $480$ €, partagés à parts égales. Chacun paie $40$ €. Combien sont-ils ?",
          correction:
            "Soit $x$ le nombre de personnes ($x > 0$). Chacun paie $\\dfrac{480}{x}$ €.\nÉquation : $\\dfrac{480}{x} = 40$.\nOn multiplie par $x$ : $480 = 40x$. On divise par $40$ : $x = 12$.\nIls sont $12$.\n✔️ $480 \\div 12 = 40$.\n⚠️ Le piège : calculer $480 \\times 40$. L'inconnue est au dénominateur : on finit par diviser $480$ par $40$.",
          micros: ["auto_alg_equation_quotient"],
        },
        {
          titre: "La superficie d'un territoire",
          enonce:
            "Un territoire compte $900\\,000$ habitants (chiffres d'un modèle), et sa densité de population est de $60$ habitants par km². Quelle est sa superficie ?",
          correction:
            "La densité est le quotient : habitants $\\div$ superficie.\nSoit $x$ la superficie, en km² : $\\dfrac{900\\,000}{x} = 60$.\nOn multiplie par $x$ : $900\\,000 = 60x$. On divise par $60$ : $x = 15\\,000$.\nLa superficie est de $15\\,000$ km².\n✔️ $900\\,000 \\div 15\\,000 = 60$.\n⭐ Quand on cherche la surface, elle est au dénominateur : c'est une équation du type $\\dfrac{a}{x} = b$.",
          micros: ["auto_alg_equation_quotient"],
        },
        {
          titre: "Un champ carré",
          enonce: "Un champ carré a une aire de $2{,}25$ ha. Quelle est la longueur de son côté, en mètres ?",
          correction:
            "$1$ ha $= 10\\,000$ m², donc $2{,}25$ ha $= 22\\,500$ m².\nSoit $x$ le côté, en m : $x^2 = 22\\,500$.\nDeux solutions : $x = 150$ ou $x = -150$, car $150^2 = 22\\,500$.\nUne longueur est positive : on garde $x = 150$ m.\n✔️ $15^2 = 225$, donc $150^2 = 22\\,500$.\n⚠️ Le piège : garder $-150$, ou l'écarter sans dire pourquoi.",
          micros: ["auto_alg_equation_carre"],
        },
        {
          titre: "L'abonnement au cinéma",
          enonce:
            "Sans abonnement, une place de cinéma coûte $9$ €. Avec un abonnement à $20$ € par mois, la place coûte $5$ €. À partir de combien de séances dans le mois l'abonnement est-il plus intéressant ?",
          correction:
            "Soit $x$ le nombre de séances dans le mois.\nSans abonnement : $9x$. Avec : $20 + 5x$.\nL'abonnement est plus intéressant quand $20 + 5x < 9x$.\nOn retire $5x$ : $20 < 4x$. On divise par $4$, positif : $5 < x$.\n$x$ est un nombre entier : l'abonnement devient intéressant à partir de $6$ séances.\n✔️ Le tableau : pour $5$ séances, $45$ € des deux façons ; pour $6$, $54$ € contre $50$ €.\n⚠️ Le piège : répondre « à partir de $5$ ». À $5$ séances, les deux coûtent autant.",
          schema: tableauProba(
            ["séances", "4", "5", "6"],
            [
              ["sans (€)", "36", "45", "54"],
              ["avec (€)", "40", "45", "50"],
            ],
          ),
          micros: ["auto_alg_inequation", "auto_alg_equation_premier_degre"],
        },
        {
          titre: "Où gèle-t-il ?",
          enonce:
            "Selon un modèle simple, un jour d'été en montagne, la température baisse de $6$ °C par kilomètre d'altitude, et il fait $18$ °C au niveau de la mer. À l'altitude $h$, en km, la température est donc $T = 18 - 6h$. À partir de quelle altitude la température est-elle négative ?",
          correction:
            "On cherche $h$ tel que $18 - 6h < 0$.\nOn retire $18$ des deux côtés : $-6h < -18$.\nOn divise par $-6$, NÉGATIF : le sens s'inverse. $h > 3$.\nLa température est négative au-dessus de $3$ km d'altitude, soit $3\\,000$ m.\n✔️ À $h = 4$ : $18 - 24 = -6$ °C.\n⚠️ Le piège : oublier d'inverser, et conclure « en dessous de $3$ km »… là où il fait le plus chaud !",
          schema: droite(0, 6, { de: 3, deInclus: false }),
          micros: ["auto_alg_inequation"],
        },
        {
          titre: "Les intérêts composés",
          enonce:
            "Un capital de $1\\,000$ € est placé pendant deux ans, au même taux annuel $t$ chaque année. Au bout de deux ans, il vaut $1\\,210$ €. Quel est ce taux ?",
          correction:
            "Chaque année, le capital est multiplié par $1 + t$ ; en deux ans, par $(1 + t)^2$.\n$1\\,000 \\times (1 + t)^2 = 1\\,210$, donc $(1 + t)^2 = 1{,}21$.\nC'est une équation « carré $=$ nombre » : $1 + t = 1{,}1$ ou $1 + t = -1{,}1$, car $1{,}1^2 = 1{,}21$.\nDonc $t = 0{,}1$ ou $t = -2{,}1$.\nUn taux de $-210$ % n'a pas de sens ici : $t = 0{,}1$, soit $10$ % par an.\n✔️ $1\\,000$ € devient $1\\,100$ € la première année, puis $1\\,210$ € la deuxième.\n⚠️ Le piège : diviser $21$ % par deux, et répondre $10{,}5$ % par an.",
          micros: ["auto_alg_equation_carre"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un problème complet, avec ses questions qui s'enchaînent. Sans calculatrice.",
      rappel: [
        "On nomme l'inconnue avec son unité, on écrit l'équation ou l'inéquation, on résout, on vérifie dans l'ÉNONCÉ.",
        "Une inéquation répond aux questions « à partir de quand ? », « au plus combien ? ».",
        "On ne garde que les solutions qui ont un sens : un nombre entier de personnes, une longueur positive…",
      ],
      exercices: [
        {
          titre: "Deux villes qui se rapprochent",
          enonce:
            "Selon un modèle, la ville $A$ compte $50\\,000$ habitants et en gagne $1\\,000$ par an ; la ville $B$ compte $80\\,000$ habitants et en perd $500$ par an.\na) Dans combien d'années auront-elles la même population ? Laquelle ?\nb) À partir de quand $A$ sera-t-elle plus peuplée que $B$ ?",
          correction:
            "a) Au bout de $n$ années, $A$ compte $50\\,000 + 1\\,000n$ habitants et $B$ en compte $80\\,000 - 500n$.\nÉgalité : $50\\,000 + 1\\,000n = 80\\,000 - 500n$.\nOn ajoute $500n$ : $50\\,000 + 1\\,500n = 80\\,000$. On retire $50\\,000$ : $1\\,500n = 30\\,000$. On divise par $1\\,500$ : $n = 20$.\nAu bout de $20$ ans, les deux villes comptent $70\\,000$ habitants.\nb) $A$ dépasse $B$ quand $50\\,000 + 1\\,000n > 80\\,000 - 500n$, soit $1\\,500n > 30\\,000$, soit $n > 20$ : après $20$ ans.\n⭐ Le graphique, en décennies et en dizaines de milliers d'habitants : les droites se croisent en $(2\\,;\\,7)$. Après, la droite bleue ($A$) passe au-dessus.\n⚠️ Le piège : écrire $1\\,000n = 80\\,000 - 500n$, en oubliant les $50\\,000$ habitants de départ.",
          schema: repere([-1, 5, -1, 10], [{ q: [0, 1, 5] }, { q: [0, -0.5, 8], couleur: ORANGE }], [{ x: 2, y: 7, label: "2 ; 7" }], undefined, true),
          micros: ["auto_alg_equation_premier_degre", "auto_alg_inequation"],
        },
        {
          titre: "Le voyage scolaire",
          enonce:
            "Pour une sortie, le car coûte $1\\,200$ €, partagés entre les $x$ élèves ; chaque élève paie en plus $10$ € d'entrée au musée.\na) Combien paie chaque élève s'ils sont $30$ ?\nb) Combien faut-il d'élèves pour que la part du car soit de $24$ € ?\nc) Combien faut-il d'élèves pour que chacun paie $40$ € en tout ?\nd) Le budget de chaque famille est de $40$ € au plus. Combien d'élèves faut-il au minimum ?",
          correction:
            "a) Part du car : $\\dfrac{1\\,200}{30} = 40$ €. Avec l'entrée : $40 + 10 = 50$ €.\nb) $\\dfrac{1\\,200}{x} = 24$ donne $1\\,200 = 24x$, donc $x = 50$ élèves.\nc) $\\dfrac{1\\,200}{x} + 10 = 40$ donne $\\dfrac{1\\,200}{x} = 30$, puis $1\\,200 = 30x$, donc $x = 40$ élèves.\nd) On veut $\\dfrac{1\\,200}{x} + 10 \\leqslant 40$, soit $\\dfrac{1\\,200}{x} \\leqslant 30$.\n$x$ est positif : on multiplie par $x$ sans changer le sens. $1\\,200 \\leqslant 30x$, donc $x \\geqslant 40$.\nIl faut au moins $40$ élèves.\n⭐ Le tableau le montre : plus les élèves sont nombreux, plus la part du car baisse.\n⚠️ Le piège au c) : oublier les $10$ € d'entrée, et résoudre $\\dfrac{1\\,200}{x} = 40$.",
          schema: ecranSeulement(tableau(["élèves", "20", "30", "40", "50"], ["part du car (€)", 60, 40, 30, 24])),
          micros: ["auto_alg_equation_quotient", "auto_alg_inequation"],
        },
        {
          titre: "Le parc et sa clôture",
          enonce:
            "Une ville veut aménager un parc carré de $4$ ha.\na) Quelle est la longueur de son côté, en mètres ?\nb) Sur un plan au $\\dfrac{1}{10\\,000}$, combien mesure ce côté ?\nc) La clôture coûte $15$ € le mètre, plus $500$ € pour le portail. Vérifier que la clôture du parc coûte $12\\,500$ €.\nd) Pour un autre parc carré, le devis de clôture s'élève à $9\\,500$ €. Quel est son côté ? Son aire, en hectares ?",
          correction:
            "a) $4$ ha $= 40\\,000$ m². Soit $x$ le côté : $x^2 = 40\\,000$, donc $x = 200$ ou $x = -200$. Une longueur est positive : $200$ m.\nb) $200$ m $= 20\\,000$ cm, et $20\\,000 \\div 10\\,000 = 2$ cm.\nc) Périmètre : $4 \\times 200 = 800$ m. Coût : $800 \\times 15 + 500 = 12\\,000 + 500 = 12\\,500$ €. ✔️\nd) Le périmètre vaut $4x$, et le coût $15 \\times 4x + 500 = 60x + 500$.\nÉquation : $60x + 500 = 9\\,500$. On retire $500$ : $60x = 9\\,000$. On divise par $60$ : $x = 150$ m.\nAire : $150^2 = 22\\,500$ m², soit $2{,}25$ ha.\n⚠️ Le piège au d) : oublier le portail, et résoudre $60x = 9\\,500$.\n⭐ La balance : on enlève d'abord le prix fixe, puis on divise.",
          schema: balance([
            { g: "60x + 500", d: "9500" },
            { g: "60x", d: "9000", op: "−500" },
            { g: "x", d: "150", op: "÷60" },
          ]),
          micros: ["auto_alg_equation_carre", "auto_alg_equation_premier_degre"],
        },
        {
          titre: "Taxi ou VTC ?",
          enonce:
            "Dans une ville (tarifs d'un modèle), un taxi coûte $4$ € de prise en charge plus $2$ € par km ; un VTC coûte $7$ € plus $1{,}50$ € par km.\na) Avec $30$ € en taxi, quelle distance peut-on parcourir au plus ?\nb) Pour quelles distances le taxi est-il moins cher que le VTC ?\nc) Pour quelle distance les deux coûtent-ils autant ?",
          correction:
            "a) Soit $x$ la distance, en km. On veut $4 + 2x \\leqslant 30$.\nOn retire $4$ : $2x \\leqslant 26$. On divise par $2$ : $x \\leqslant 13$. Au plus $13$ km.\nb) Taxi moins cher : $4 + 2x < 7 + 1{,}5x$.\nOn retire $1{,}5x$ : $4 + 0{,}5x < 7$. On retire $4$ : $0{,}5x < 3$. On multiplie par $2$, positif : $x < 6$.\nLe taxi est moins cher pour moins de $6$ km.\nc) Pour $x = 6$ : taxi $4 + 12 = 16$ €, VTC $7 + 9 = 16$ €.\n⭐ Sur la droite : en dessous de $6$ km, le taxi ; au-dessus, le VTC.\n⚠️ Le piège au b) : diviser $3$ par $0{,}5$ et trouver $1{,}5$. Diviser par $0{,}5$, c'est multiplier par $2$.",
          schema: intervalles(
            0,
            14,
            [
              { de: 0, a: 6, deInclus: true, aInclus: false, label: "taxi" },
              { de: 6, a: 14, deInclus: false, aInclus: true, label: "VTC", color: ORANGE },
            ],
            2,
          ),
          micros: ["auto_alg_inequation"],
        },
      ],
    },
  ],
};
