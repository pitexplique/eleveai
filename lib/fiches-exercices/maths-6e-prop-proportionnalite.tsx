// ─── Fiche d'exercices : la proportionnalité (6e) — 20 exercices corrigés ─────
//
// Lot des feuilles de 6e (30/09/2026), sur le modèle de la feuille de 5e voisine
// `maths-5e-prop-proportionnalite.tsx` : aides de dessin locales, écrites EN
// CLAIR, relues par le script de recalcul.
//
// Alignée sur la fiche de cours `lib/fiches/maths-6e-proportionnalite.tsx` (même
// vocabulaire : coefficient, tableau, passer par l'unité) et sur la banque
// `lib/tutor-v4/questionBank/6e/maths/proportionnalite.bank.ts`, notionId
// prop_proportionnalite : reconnaître (et reconnaître ce qui NE l'est pas),
// compléter un tableau, utiliser un coefficient, passer par l'unité, résoudre une
// situation, défis.
// ⛔ LIMITES DE LA 6e : les procédures du BO — la LINÉARITÉ (colonnes qu'on
// multiplie ou qu'on additionne), le COEFFICIENT et le RETOUR À L'UNITÉ. Pas de
// produit en croix, pas d'équation, pas de graphique (la représentation
// graphique de la proportionnalité est en 5e). Les échelles ont leur feuille
// (prop_echelle), les pourcentages aussi (pourcentage_nombre). Le seuil de
// l'exercice 20 se trouve en ESSAYANT, dans un tableau.
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni les cahiers (1 → 2 €,
// 3 → 6 €, 5 → 10 €), ni les stylos (2 → 4 €), ni les tickets (5 → 15 €), ni les
// crêpes (10 → 250 g), ni le cycliste (12 km en 30 min), ni le riz (4 → 200 g),
// ni les 15 € pour 5 objets. Ni ceux de la feuille de 5e (croissants, piste,
// douche, ruches, piscines, eau de mer, corde, smoothie, randonneurs, kayak,
// riz, plants de tomates, pressoir, robinet, photos, pas de Tom).
//
// Les pièges nommés : ne vérifier qu'une colonne (1), « le prix monte » pris
// pour proportionnel (2), ajouter l'écart d'une colonne à l'autre (3, 11),
// diviser dans le mauvais sens (4), ajouter des euros au lieu d'ajouter des
// objets (5), multiplier pour remonter d'une ligne (7), le forfait qui casse la
// proportionnalité (9, 20), ajouter les ingrédients au lieu d'ajouter la recette
// (10), comparer des prix sans ramener à la même masse (12), la bonne colonne à
// additionner (13), le prix total pris pour le prix d'un kilogramme (14), une
// minute contre une heure (15), « plus de jardiniers, plus de temps » (16),
// oublier de convertir (18), arrondir un nombre de baguettes (17).
//
// Faits réels : aucun. Tous les nombres (musée, glaces, gâteaux, biscuits, lait,
// perles, pommes, manège, vélos, soupe, tartes, ressort, bananes, escargot,
// pelouse, pique-nique, roue de vélo, essence, escalade) sont des MODÈLES, à
// l'ordre de grandeur réel.
//
// ⭐ LES DESSINS : le tableau de proportionnalité à deux lignes avec sa flèche
// « ↓ × coefficient » et les cases trouvées en rouge (`tableauCoef`, repris de la
// feuille de 5e, couché sur téléphone), le tableau à une ligne de figures.tsx
// (`tableau`), un tableau à plusieurs lignes (`table`) et la barre coupée en
// parts égales du passage à l'unité (`partage`, le geste de la fiche de cours :
// revenir à l'unité, c'est découper). 14 dessins imprimés ; ceux qui redisent le
// corrigé sont `ecranSeulement` (PDF ≤ 12 pages).
//
// Les corrigés sont écrits à la première personne (« je divise »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-6e-prop-proportionnalite.mjs`.
//
// Micro-compétences : prop_reconnaitre (1, 2, 9, 16, 20), prop_table (3, 7, 8,
// 10, 11, 13), prop_coeff (1, 4, 7, 14, 18, 19), prop_unite (5, 6, 12, 14, 15,
// 17), prop_direct (6, 8, 9, 10, 12, 15, 17, 18, 19), prop_defi (11, 16, 17, 19,
// 20). 6/6.

import type { ReactNode } from "react";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { tableau } from "@/lib/fiches-exercices/figures";

const BLEU = "#2563eb";
const ENCRE = "#0f172a";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/**
 * LE TABLEAU DE PROPORTIONNALITÉ d'un corrigé (repris de la feuille de 5e) :
 * deux lignes, et à droite la flèche « ↓ × coefficient ». Une case écrite
 * « !45 » est une case TROUVÉE : elle s'affiche en rouge, sans le « ! ».
 * ⛔ Sur TÉLÉPHONE (sous `sm`), le tableau est COUCHÉ : deux colonnes, une ligne
 * par paire, la flèche « → × coefficient » dessous (rien ne défile à 375 px).
 * ⚠️ Texte NU dans les cases : elles ne traversent pas KaTeX.
 */
const tableauCoef = (titres: [string, string], haut: string[], bas: string[], coef: string) => {
  const cellule = (c: string, i: number) => {
    const trouvee = c.startsWith("!");
    return (
      <td key={i} className={`whitespace-nowrap border border-slate-400 px-2 py-1 text-center ${trouvee ? "font-bold text-red-600" : "text-slate-900"}`}>
        {trouvee ? c.slice(1) : c}
      </td>
    );
  };
  const titre = (texte: string) => <th className="whitespace-nowrap border border-slate-400 bg-slate-100 px-2 py-1 text-left font-semibold text-slate-800">{texte}</th>;
  return (
    <>
      <div className="sm:hidden print:hidden">
        <table className="mx-auto border-collapse text-sm">
          <thead>
            <tr>
              {titre(titres[0])}
              {titre(titres[1])}
            </tr>
          </thead>
          <tbody>
            {haut.map((h, i) => (
              <tr key={i}>
                {cellule(h, 0)}
                {cellule(bas[i], 1)}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-1 text-center text-sm font-bold text-blue-700">→ × {coef}</p>
      </div>
      <div className="hidden sm:block print:block">
        <table className="mx-auto border-collapse text-sm">
          <tbody>
            <tr>
              {titre(titres[0])}
              {haut.map(cellule)}
              <td rowSpan={2} className="whitespace-nowrap pl-2 text-center font-bold text-blue-700">
                ↓ × {coef}
              </td>
            </tr>
            <tr>
              {titre(titres[1])}
              {bas.map(cellule)}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

/** Un tableau à plusieurs lignes (le `tableau()` commun n'en a qu'une). 3 colonnes courtes au plus. */
const table = (entete: string[], lignes: string[][]) => (
  <div className="mx-auto w-full max-w-[22rem] print:max-w-[15rem]">
    <CanvasRenderer figure={{ kind: "tableau_donnees", headers: entete, rows: lignes.map((values) => ({ values })), display: { compact: true, striped: true } }} />
  </div>
);

/**
 * LA BARRE DU PASSAGE À L'UNITÉ : le total en haut, la barre coupée en `n`
 * parts ÉGALES, la valeur d'une part écrite dans chaque part (si elle y tient,
 * 8,8 par signe en corps 14 gras), et « n parts égales : 1 part = … » dessous.
 * C'est le geste de la fiche de cours : revenir à l'unité, c'est DÉCOUPER.
 * ⚠️ Texte NU. ⭐ Le script vérifie : total ÷ n = une part, et que tout tient.
 */
const partage = (total: string, n: number, unePart: string) => {
  const x0 = 10;
  const u = 260 / n;
  const dedans = unePart.length * 8.8 <= u - 4;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[15rem]">
      <svg viewBox="0 0 280 100" className="block h-auto w-full" role="img" aria-label={`Un total de ${total} coupé en ${n} parts égales de ${unePart}.`}>
        <text x={140} y={15} textAnchor="middle" fontSize={14} fontWeight={700} fill={ENCRE}>
          {`total : ${total}`}
        </text>
        <path d={`M ${x0} 28 V 22 H ${x0 + 260} V 28`} fill="none" stroke="#475569" strokeWidth={1.5} />
        {Array.from({ length: n }, (_, i) => (
          <g key={i}>
            <rect x={x0 + i * u} y={30} width={u} height={34} fill={i === 0 ? BLEU : "#93c5fd"} stroke="#fff" strokeWidth={1.5} />
            {dedans ? (
              <text x={x0 + i * u + u / 2} y={52} textAnchor="middle" fontSize={14} fontWeight={700} fill={i === 0 ? "#fff" : ENCRE}>
                {unePart}
              </text>
            ) : null}
          </g>
        ))}
        <rect x={x0} y={30} width={260} height={34} fill="none" stroke={ENCRE} strokeWidth={1.5} />
        <text x={140} y={90} textAnchor="middle" fontSize={14} fill="#334155">
          {`${n} parts égales : 1 part = ${unePart}`}
        </text>
      </svg>
    </div>
  );
};

export const exercicesPropProportionnalite6e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "prop-proportionnalite",
  titre: "La proportionnalité",
  accroche:
    "Vingt exercices, du plus simple au problème. Reconnaître ce qui est proportionnel, et ce qui ne l'est pas. Compléter un tableau, trouver le coefficient, passer par l'unité. Des glaces, des biscuits, une soupe, un ressort, un escargot, un pique-nique, une roue de vélo. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le piège nommé et le tableau dessiné.",

  fichesCours: [{ href: "/fiches-cours/maths/6e/prop-proportionnalite", titre: "La proportionnalité" }],
  coachHref: "/coach-ia/maths?classe=6e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : vérifier, compléter ou calculer. J'écris la réponse avec son unité.",
      rappel: [
        "C'est proportionnel quand on passe d'une ligne à l'autre en multipliant TOUJOURS par le même nombre : le coefficient.",
        "Pour vérifier, je divise chaque nombre du bas par celui du haut. Tous les résultats doivent être égaux.",
        "Passer par l'unité : je cherche la valeur pour 1, puis je multiplie.",
      ],
      exercices: [
        {
          enonce: "Voici le prix d'entrée d'un musée selon le nombre de visiteurs. Le prix est-il proportionnel au nombre de visiteurs ?",
          figure: tableau(["Visiteurs", "2", "4", "5"], ["Prix (€)", "14", "28", "35"], true),
          correction:
            "Je divise chaque prix par le nombre de visiteurs.\n$14 \\div 2 = 7$ ; $28 \\div 4 = 7$ ; $35 \\div 5 = 7$.\nLes trois résultats sont égaux : c'est proportionnel.\nLe coefficient est $7$ : une entrée coûte $7$ €.\n⛔ Le piège : ne vérifier que la première colonne. Il faut vérifier TOUTES les colonnes.\nRéponse : oui, c'est proportionnel, avec le coefficient $7$.",
          schema: ecranSeulement(tableauCoef(["Visiteurs", "Prix (€)"], ["2", "4", "5"], ["14", "28", "35"], "7")),
          micros: ["prop_reconnaitre", "prop_coeff"],
        },
        {
          enonce: "Un glacier affiche ses prix. Le prix est-il proportionnel au nombre de boules ?",
          figure: tableau(["Boules", "1", "2", "3"], ["Prix (€)", "2", "3,50", "5"], true),
          correction:
            "Je regarde ce qui se passe quand le nombre de boules double : de $1$ à $2$ boules.\nSi c'était proportionnel, le prix doublerait aussi : $2 \\times 2 = 4$ €.\nOr $2$ boules coûtent $3{,}50$ €, pas $4$ €.\nPour $3$ boules, ce serait $3 \\times 2 = 6$ €. Or le prix est $5$ €.\n⛔ Le piège : « le prix monte avec les boules, donc c'est proportionnel ». Il monte, mais il ne double pas.\nRéponse : non, ce n'est pas proportionnel.",
          schema: ecranSeulement(table(["Boules", "Prix", "Si ×2"], [
            ["1", "2", "2"],
            ["2", "3,50", "4"],
            ["3", "5", "6"],
          ])),
          micros: ["prop_reconnaitre"],
        },
        {
          enonce: "La farine est proportionnelle au nombre de gâteaux. Complète le tableau avec les colonnes déjà remplies, sans chercher la farine d'un seul gâteau.",
          figure: tableau(["Gâteaux", "2", "3", "5", "10"], ["Farine (g)", "300", "450", "?", "?"], true),
          correction:
            "$5$ gâteaux, c'est $2$ gâteaux plus $3$ gâteaux. J'additionne les deux colonnes : $300 + 450 = 750$.\n$10$ gâteaux, c'est le double de $5$ gâteaux : $2 \\times 750 = 1\\,500$.\n⭐ Contrôle : un gâteau demande $300 \\div 2 = 150$ g, et $10 \\times 150 = 1\\,500$.\n⛔ Le piège : voir « $2$ gâteaux de plus » entre $3$ et $5$, et ajouter $2$ g. J'ajoute des GÂTEAUX, pas des grammes.\nRéponse : $750$ g et $1\\,500$ g.",
          schema: ecranSeulement(tableauCoef(["Gâteaux", "Farine (g)"], ["2", "3", "5", "10"], ["300", "450", "!750", "!1 500"], "150")),
          micros: ["prop_table"],
        },
        {
          enonce: "$3$ paquets de biscuits contiennent $24$ biscuits. Tous les paquets sont pareils.\na) Calcule le coefficient qui fait passer des paquets aux biscuits. Que veut dire ce nombre ?\nb) Combien de biscuits dans $5$ paquets ? Dans $7$ paquets ?",
          correction:
            "a) Je divise les biscuits par les paquets : $24 \\div 3 = 8$.\nLe coefficient est $8$ : il y a $8$ biscuits dans UN paquet.\nb) Je multiplie par $8$ : $5 \\times 8 = 40$ et $7 \\times 8 = 56$.\n⛔ Le piège : diviser dans l'autre sens, $3 \\div 24$. Je cherche des biscuits PAR paquet : les biscuits sont en premier.\nRéponse : le coefficient est $8$ ; $40$ biscuits et $56$ biscuits.",
          schema: ecranSeulement(tableauCoef(["Paquets", "Biscuits"], ["3", "5", "7"], ["24", "!40", "!56"], "8")),
          micros: ["prop_coeff"],
        },
        {
          enonce: "$6$ bouteilles de lait coûtent $9$ €. Elles ont toutes le même prix. Combien coûtent $10$ bouteilles ?",
          correction:
            "Je passe par l'unité : le prix d'UNE bouteille.\n$9 \\div 6 = 1{,}50$ : une bouteille coûte $1{,}50$ €.\nPour $10$ bouteilles : $10 \\times 1{,}50 = 15$.\n⭐ Contrôle : $10$ bouteilles, c'est un peu moins que $12$, le double de $6$. Le prix doit être un peu moins que $18$ €.\n⛔ Le piège : « $4$ bouteilles de plus, donc $4$ € de plus », et répondre $13$ €. J'ajoute $4$ bouteilles à $1{,}50$ € chacune.\nRéponse : $10$ bouteilles coûtent $15$ €.",
          schema: partage("9 €", 6, "1,50 €"),
          micros: ["prop_unite"],
        },
        {
          enonce: "Inès fabrique des bracelets, tous pareils. Pour $3$ bracelets, elle utilise $45$ perles. Combien de perles lui faut-il pour $7$ bracelets ?",
          correction:
            "Je cherche d'abord les perles d'UN bracelet : $45 \\div 3 = 15$.\nPuis pour $7$ bracelets : $7 \\times 15 = 105$.\n⭐ Contrôle : $7$ bracelets, c'est un peu plus que le double de $3$. Il faut un peu plus que $90$ perles.\n⛔ Le piège : ajouter $4$ perles parce qu'il y a $4$ bracelets de plus.\nRéponse : il lui faut $105$ perles.",
          schema: ecranSeulement(tableauCoef(["Bracelets", "Perles"], ["3", "1", "7"], ["45", "!15", "!105"], "15")),
          micros: ["prop_unite", "prop_direct"],
        },
        {
          enonce: "Toutes les caisses de pommes pèsent la même masse. Complète les deux cases vides.",
          figure: tableau(["Caisses", "2", "?", "8"], ["Pommes (kg)", "36", "90", "?"], true),
          correction:
            "La première colonne est complète : $36 \\div 2 = 18$. Le coefficient est $18$ : une caisse pèse $18$ kg.\nDernière colonne : je DESCENDS des caisses vers les kilogrammes, je multiplie. $8 \\times 18 = 144$.\nDeuxième colonne : je REMONTE des kilogrammes vers les caisses, je divise. $90 \\div 18 = 5$.\n⭐ Contrôle : $5 \\times 18 = 90$.\n⛔ Le piège : multiplier aussi pour remonter. Pour remonter, je divise.\nRéponse : $5$ caisses et $144$ kg.",
          schema: ecranSeulement(tableauCoef(["Caisses", "Pommes (kg)"], ["2", "!5", "8"], ["36", "90", "!144"], "18")),
          micros: ["prop_table", "prop_coeff"],
        },
        {
          enonce: "$3$ tickets de manège coûtent $7{,}50$ €. Sans chercher le prix d'un ticket, trouve le prix de $6$ tickets, de $9$ tickets, puis de $12$ tickets.",
          correction:
            "$6$ tickets, c'est $2$ fois $3$ tickets : $2 \\times 7{,}50 = 15$.\n$9$ tickets, c'est $3$ fois $3$ tickets : $3 \\times 7{,}50 = 22{,}50$.\n$12$ tickets, c'est $4$ fois $3$ tickets : $4 \\times 7{,}50 = 30$.\n⭐ Autre chemin : $12$ tickets, c'est $6 + 6$, et $15 + 15 = 30$.\n⛔ Le piège : ajouter $3$ € à chaque fois qu'on ajoute $3$ tickets.\nRéponse : $15$ €, $22{,}50$ € et $30$ €.",
          schema: ecranSeulement(tableauCoef(["Tickets", "Prix (€)"], ["3", "6", "9", "12"], ["7,50", "!15", "!22,50", "!30"], "2,5")),
          micros: ["prop_table", "prop_direct"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs questions sur une même situation. Je range les nombres dans un tableau avant de calculer.",
      rappel: [
        "Avant de calculer, je vérifie que c'est proportionnel : si l'un double, l'autre doit doubler.",
        "Un prix fixe en plus (un abonnement, un casque) casse la proportionnalité.",
        "Pour descendre d'une ligne à l'autre, je multiplie par le coefficient. Pour remonter, je divise.",
      ],
      exercices: [
        {
          enonce: "Pour louer un vélo, il y a deux tarifs.\nTarif A : $4$ € par heure.\nTarif B : $5$ € pour le casque, puis $3$ € par heure.\na) Complète le tableau.\nb) Quel tarif est proportionnel à la durée ?\nc) Quel tarif choisir pour $4$ h ? Pour $6$ h ?",
          figure: table(["Durée", "Tarif A (€)", "Tarif B (€)"], [
            ["1 h", "?", "?"],
            ["2 h", "?", "?"],
            ["4 h", "?", "?"],
            ["6 h", "?", "?"],
          ]),
          correction:
            "a) Tarif A : je multiplie les heures par $4$. $1 \\times 4 = 4$ ; $2 \\times 4 = 8$ ; $4 \\times 4 = 16$ ; $6 \\times 4 = 24$.\nTarif B : $5$ € de casque, plus $3$ € par heure. $5 + 3 = 8$ ; $5 + 6 = 11$ ; $5 + 12 = 17$ ; $5 + 18 = 23$.\nb) Le tarif A est proportionnel : je multiplie toujours par $4$.\nLe tarif B ne l'est pas : $1$ h coûte $8$ €, mais $2$ h ne coûtent pas $16$ €. Le casque casse la proportionnalité.\nc) Pour $4$ h : A coûte $16$ €, B coûte $17$ €. Je choisis A.\nPour $6$ h : A coûte $24$ €, B coûte $23$ €. Je choisis B.\n⛔ Le piège : croire qu'un tarif est toujours le meilleur. Ça dépend de la durée.\nRéponse : A est proportionnel ; A pour $4$ h, B pour $6$ h.",
          schema: ecranSeulement(table(["Durée", "Tarif A (€)", "Tarif B (€)"], [
            ["1 h", "4", "8"],
            ["2 h", "8", "11"],
            ["4 h", "16", "17"],
            ["6 h", "24", "23"],
          ])),
          micros: ["prop_reconnaitre", "prop_direct"],
        },
        {
          enonce: "Voici une recette de soupe pour $4$ personnes. Calcule les quantités pour $6$ personnes, puis pour $10$ personnes.",
          figure: table(["Ingrédient", "4 personnes"], [
            ["Carottes", "8"],
            ["Poireaux", "2"],
            ["Eau (L)", "1"],
          ]),
          correction:
            "Je cherche d'abord la recette pour $2$ personnes, la moitié de $4$ : $4$ carottes, $1$ poireau, $0{,}5$ L d'eau.\n$6$ personnes, c'est $4 + 2$. J'additionne les deux recettes :\n$8 + 4 = 12$ carottes ; $2 + 1 = 3$ poireaux ; $1 + 0{,}5 = 1{,}5$ L.\n$10$ personnes, c'est $4 + 4 + 2$ :\n$8 + 8 + 4 = 20$ carottes ; $2 + 2 + 1 = 5$ poireaux ; $1 + 1 + 0{,}5 = 2{,}5$ L.\n⛔ Le piège : « $2$ personnes de plus, donc $2$ carottes de plus ». J'ajoute la recette de $2$ personnes, pas $2$ carottes.\nRéponse : $6$ personnes, $12$ carottes, $3$ poireaux, $1{,}5$ L.\n$10$ personnes, $20$ carottes, $5$ poireaux, $2{,}5$ L.",
          schema: ecranSeulement(table(["Soupe", "6 pers.", "10 pers."], [
            ["Carottes", "12", "20"],
            ["Poireaux", "3", "5"],
            ["Eau (L)", "1,5", "2,5"],
          ])),
          micros: ["prop_table", "prop_direct"],
        },
        {
          enonce: "Pour $2$ tartes aux pommes, il faut $6$ pommes. Tom écrit : « $5$ tartes, c'est $3$ tartes de plus. Donc il faut $3$ pommes de plus : $9$ pommes. »\na) Explique son erreur.\nb) Combien faut-il de pommes pour $5$ tartes ?",
          correction:
            "a) Tom ajoute le même nombre en haut et en bas. Quand c'est proportionnel, on MULTIPLIE, on n'ajoute pas le même nombre.\nb) Une tarte demande $6 \\div 2 = 3$ pommes.\nPour $5$ tartes : $5 \\times 3 = 15$ pommes.\n⭐ Contrôle avec l'idée de Tom, corrigée : $3$ tartes de plus, c'est $3 \\times 3 = 9$ pommes de plus. Et $6 + 9 = 15$.\n⛔ Le piège : ajouter $3$ TARTES en haut, ce n'est pas ajouter $3$ POMMES en bas.\nRéponse : il faut $15$ pommes.",
          schema: ecranSeulement(tableauCoef(["Tartes", "Pommes"], ["2", "1", "5"], ["6", "!3", "!15"], "3")),
          micros: ["prop_defi", "prop_table"],
        },
        {
          enonce: "Au magasin, un paquet de gâteaux de $200$ g coûte $1{,}50$ €. Un paquet de $500$ g coûte $3{,}50$ €. Lequel est le moins cher, pour la même masse ?",
          correction:
            "Je ne peux pas comparer $1{,}50$ € et $3{,}50$ € : les masses ne sont pas les mêmes.\nJe cherche le prix de $100$ g dans chaque paquet.\nPetit paquet : $200$ g, c'est $2$ fois $100$ g. $1{,}50 \\div 2 = 0{,}75$ €.\nGrand paquet : $500$ g, c'est $5$ fois $100$ g. $3{,}50 \\div 5 = 0{,}70$ €.\n$0{,}70$ € est moins que $0{,}75$ € : le grand paquet est moins cher.\n⛔ Le piège : choisir le petit paquet « parce qu'il coûte moins ». Il coûte moins, mais il contient moins.\nRéponse : le paquet de $500$ g est le moins cher.",
          schema: table(["Paquet", "Prix", "Prix de 100 g"], [
            ["200 g", "1,50 €", "0,75 €"],
            ["500 g", "3,50 €", "0,70 €"],
          ]),
          micros: ["prop_unite", "prop_direct"],
        },
        {
          enonce: "On accroche des masses à un ressort. L'allongement du ressort est proportionnel à la masse.\na) Trouve l'allongement pour $300$ g, puis pour $50$ g.\nb) Le ressort s'allonge de $7$ cm. Quelle masse a-t-on accrochée ?",
          figure: tableau(["Masse (g)", "100", "300", "50", "?"], ["Allongement (cm)", "2", "?", "?", "7"], true),
          correction:
            "a) $300$ g, c'est $3$ fois $100$ g : $3 \\times 2 = 6$ cm.\n$50$ g, c'est la moitié de $100$ g : $2 \\div 2 = 1$ cm.\nb) $7$ cm, c'est $6$ cm plus $1$ cm. J'additionne les deux colonnes : $300 + 50 = 350$ g.\n⭐ Contrôle : $350$ g, c'est $3{,}5$ fois $100$ g, et $3{,}5 \\times 2 = 7$ cm.\n⛔ Le piège : additionner deux colonnes, mais pas les bonnes. Je cherche celles dont les allongements font $7$.\nRéponse : $6$ cm ; $1$ cm ; $350$ g.",
          schema: ecranSeulement(table(["Masse", "Allongement"], [
            ["100 g", "2 cm"],
            ["300 g", "6 cm"],
            ["50 g", "1 cm"],
            ["350 g", "7 cm"],
          ])),
          micros: ["prop_table"],
        },
        {
          enonce: "$2$ kg de bananes coûtent $3{,}60$ €.\na) Quel est le prix d'un kilogramme ? C'est le coefficient.\nb) Combien coûtent $3$ kg ? Et $5$ kg ?\nc) Avec $9$ €, combien de kilogrammes de bananes peut-on acheter ?",
          correction:
            "a) Je passe à l'unité : $3{,}60 \\div 2 = 1{,}80$. Un kilogramme coûte $1{,}80$ €.\nb) $3 \\times 1{,}80 = 5{,}40$ € et $5 \\times 1{,}80 = 9$ €.\nc) $9$ €, c'est le prix de $5$ kg : je l'ai trouvé au b).\n⭐ Autre chemin : je remonte des euros vers les kilogrammes, je divise. $9 \\div 1{,}80 = 5$.\n⛔ Le piège : prendre $3{,}60$ € pour le prix d'un kilogramme. C'est le prix de $2$ kg.\nRéponse : $1{,}80$ € ; $5{,}40$ € et $9$ € ; $5$ kg.",
          schema: ecranSeulement(tableauCoef(["Bananes (kg)", "Prix (€)"], ["2", "1", "3", "5"], ["3,60", "!1,80", "!5,40", "!9"], "1,8")),
          micros: ["prop_coeff", "prop_unite"],
        },
        {
          enonce: "Un escargot avance toujours à la même allure : $6$ cm en $4$ minutes (un modèle).\na) De combien avance-t-il en $1$ minute ?\nb) En $10$ minutes ?\nc) En $1$ heure ? Donne la réponse en cm, puis en m.",
          correction:
            "a) Je passe à l'unité : $6 \\div 4 = 1{,}5$. Il avance de $1{,}5$ cm en une minute.\nb) $10 \\times 1{,}5 = 15$ cm.\nc) $1$ heure, c'est $60$ minutes. $60 \\times 1{,}5 = 90$ cm.\nEt $90$ cm $= 0{,}9$ m : moins d'un mètre en une heure !\n⛔ Le piège du c) : calculer avec $1$ au lieu de $60$. L'allure est donnée en MINUTES : je mets l'heure en minutes.\nRéponse : $1{,}5$ cm ; $15$ cm ; $90$ cm, soit $0{,}9$ m.",
          schema: ecranSeulement(tableauCoef(["Durée (min)", "Distance (cm)"], ["4", "1", "10", "60"], ["6", "!1,5", "!15", "!90"], "1,5")),
          micros: ["prop_unite", "prop_direct"],
        },
        {
          enonce: "Un jardinier tond une pelouse en $60$ minutes. Léna dit : « Avec $2$ jardiniers, il faudra $120$ minutes. C'est proportionnel ! »\na) A-t-elle raison ?\nb) Les jardiniers travaillent au même rythme. Combien de temps faut-il à $2$ jardiniers ? À $3$ jardiniers ?",
          correction:
            "a) Non. Avec plus de jardiniers, on va plus VITE : le temps diminue, il ne double pas.\nb) À $2$, chacun tond la moitié de la pelouse : $60 \\div 2 = 30$ minutes.\nÀ $3$, chacun tond un tiers : $60 \\div 3 = 20$ minutes.\nQuand les jardiniers doublent, le temps est divisé par $2$ : ce n'est pas proportionnel.\n⛔ Le piège : « plus de jardiniers, donc plus de temps ». Je me demande toujours si le résultat a du sens.\nRéponse : Léna a tort ; $30$ minutes à $2$, $20$ minutes à $3$.",
          schema: table(["Jardiniers", "Durée"], [
            ["1", "60 min"],
            ["2", "30 min"],
            ["3", "20 min"],
          ]),
          micros: ["prop_reconnaitre", "prop_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions qui s'enchaînent. Je vérifie d'abord que c'est proportionnel, puis je réponds par une phrase.",
      rappel: [
        "Je repère les deux grandeurs, et je me demande : si l'une double, est-ce que l'autre double ?",
        "Je peux multiplier une colonne, additionner deux colonnes, ou passer par l'unité.",
        "Je vérifie que ma réponse est possible avant de l'écrire.",
      ],
      exercices: [
        {
          titre: "Le pique-nique",
          enonce: "La classe prépare un pique-nique : un sandwich pour chacun des $28$ élèves. Pour $4$ sandwichs, il faut $1$ baguette et $100$ g de fromage.\na) Combien de baguettes faut-il ?\nb) Quelle masse de fromage faut-il ?\nc) Une baguette coûte $1{,}10$ €. Le fromage coûte $1{,}50$ € les $100$ g. Quel est le prix total ?\nd) Combien cela coûte-t-il par élève ?",
          correction:
            "a) $28$ sandwichs, c'est $7$ fois $4$ sandwichs : $28 \\div 4 = 7$. Il faut $7$ baguettes.\nb) $7$ fois plus de fromage : $7 \\times 100 = 700$ g.\nc) Pain : $7 \\times 1{,}10 = 7{,}70$ €.\nFromage : $700$ g, c'est $7$ fois $100$ g. $7 \\times 1{,}50 = 10{,}50$ €.\nTotal : $7{,}70 + 10{,}50 = 18{,}20$ €.\nd) $18{,}20 \\div 28 = 0{,}65$ €.\n⭐ Le nombre $7$ sert partout : il y a $7$ fois plus de sandwichs, donc $7$ fois plus de tout.\n⛔ Le piège : oublier que le fromage est vendu par $100$ g, et multiplier $700$ par $1{,}50$.\nRéponse : $7$ baguettes ; $700$ g ; $18{,}20$ € ; $0{,}65$ € par élève.",
          schema: tableauCoef(["Sandwichs", "Fromage (g)"], ["4", "28"], ["100", "!700"], "25"),
          micros: ["prop_direct", "prop_unite", "prop_defi"],
        },
        {
          titre: "La roue du vélo",
          enonce: "Quand la roue du vélo de Sami fait un tour, le vélo avance de $2$ m.\na) De combien avance le vélo en $10$ tours ? En $50$ tours ? En $500$ tours ?\nb) Combien de tours de roue pour faire $1$ km ?\nc) Un soir, la roue a fait $3\\,500$ tours. Quelle distance Sami a-t-il parcourue, en km ?",
          correction:
            "a) Le coefficient est $2$ : je multiplie les tours par $2$.\n$10 \\times 2 = 20$ m ; $50 \\times 2 = 100$ m ; $500 \\times 2 = 1\\,000$ m.\nb) $1$ km $= 1\\,000$ m. C'est la réponse du a) : il faut $500$ tours.\nc) $3\\,500 \\times 2 = 7\\,000$ m, soit $7$ km.\n⛔ Le piège du b) : chercher « $1$ km » sans le convertir en mètres. Le coefficient est en mètres.\nRéponse : $20$ m, $100$ m, $1\\,000$ m ; $500$ tours ; $7$ km.",
          schema: tableauCoef(["Tours", "Distance (m)"], ["1", "10", "50", "500", "3 500"], ["2", "!20", "!100", "!1 000", "!7 000"], "2"),
          micros: ["prop_coeff", "prop_direct"],
        },
        {
          titre: "Le plein d'essence",
          enonce: "À la station, l'essence coûte $1{,}80$ € le litre (un modèle).\na) Combien coûtent $10$ L ? Et $45$ L ?\nb) Avec $27$ €, combien de litres peut-on mettre ?\nc) La voiture consomme $5$ L pour faire $100$ km. Avec les litres du b), combien de kilomètres peut-elle faire ?",
          correction:
            "a) Le coefficient est $1{,}80$ : le prix d'UN litre.\n$10 \\times 1{,}80 = 18$ € et $45 \\times 1{,}80 = 81$ €.\nb) Je remonte des euros vers les litres : je divise. $27 \\div 1{,}80 = 15$ L.\n⭐ Contrôle : $15 \\times 1{,}80 = 27$.\nc) $15$ L, c'est $3$ fois $5$ L. La voiture roule $3$ fois $100$ km : $3 \\times 100 = 300$ km.\n⛔ Le piège du b) : multiplier $27$ par $1{,}80$. Je cherche des litres : je divise.\nRéponse : $18$ € et $81$ € ; $15$ L ; $300$ km.",
          schema: tableauCoef(["Essence (L)", "Prix (€)"], ["1", "10", "45", "!15"], ["1,80", "!18", "!81", "27"], "1,8"),
          micros: ["prop_coeff", "prop_direct", "prop_defi"],
        },
        {
          titre: "La salle d'escalade",
          enonce: "Une salle d'escalade propose deux tarifs.\nTarif A : $8$ € la séance.\nTarif B : une carte à $30$ €, puis $5$ € la séance.\na) Combien coûtent $5$ séances avec chaque tarif ?\nb) Quel tarif est proportionnel au nombre de séances ?\nc) Calcule le prix de $8$, $10$ et $12$ séances avec chaque tarif.\nd) À partir de combien de séances le tarif B devient-il moins cher ?",
          correction:
            "a) Tarif A : $5 \\times 8 = 40$ €. Tarif B : $30 + 5 \\times 5 = 55$ €.\nb) Le tarif A est proportionnel : je multiplie toujours par $8$. Le tarif B ne l'est pas : $0$ séance coûte déjà $30$ €.\nc) Tarif A : $8 \\times 8 = 64$ ; $10 \\times 8 = 80$ ; $12 \\times 8 = 96$.\nTarif B : $30 + 8 \\times 5 = 70$ ; $30 + 10 \\times 5 = 80$ ; $30 + 12 \\times 5 = 90$.\nd) Pour $10$ séances, les deux coûtent $80$ €. J'essaie $11$ séances : A, $11 \\times 8 = 88$ € ; B, $30 + 11 \\times 5 = 85$ €.\nÀ partir de $11$ séances, B est moins cher.\n⛔ Le piège : croire que la carte est toujours une bonne affaire. Elle ne l'est que si on vient souvent.\nRéponse : $40$ € et $55$ € ; A ; B devient moins cher à partir de $11$ séances.",
          schema: table(["Séances", "A (€)", "B (€)"], [
            ["5", "40", "55"],
            ["8", "64", "70"],
            ["10", "80", "80"],
            ["11", "88", "85"],
            ["12", "96", "90"],
          ]),
          micros: ["prop_reconnaitre", "prop_defi"],
        },
      ],
    },
  ],
};
