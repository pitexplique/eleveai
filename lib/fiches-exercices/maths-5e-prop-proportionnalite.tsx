// ─── Fiche d'exercices : la proportionnalité (5e) — 20 exercices corrigés ─────
//
// Lot des feuilles de 5e (29/09/2026), sur le modèle de la feuille étalon
// `maths-5e-relatif-nombre.tsx` : aides de dessin locales, écrites EN CLAIR,
// relues par le script de recalcul.
//
// Alignée sur la fiche de cours `lib/fiches/maths-5e-proportionnalite.tsx` et sur
// la banque `lib/tutor-v4/questionBank/5e/maths/proportionnalite.bank.ts`,
// notionId prop_proportionnalite : reconnaître (et reconnaître ce qui NE l'est
// pas), compléter un tableau, quatrième proportionnelle, coefficient et passage
// à l'unité, problème, défi.
// ⛔ LIMITES DE LA 5e : les méthodes de la banque — le coefficient, le passage à
// l'unité, les colonnes qu'on multiplie, qu'on additionne ou qu'on soustrait.
// Pas de « produit en croix » écrit comme une formule (4e), pas d'équation : le
// seuil de l'exercice 19 se trouve en essayant, dans un tableau. Les
// pourcentages et les ratios sont la notion voisine (prop_ratio_pourcentage),
// les échelles sont en 4e. Deux graphiques (8 et 13) : des droites qui passent
// par l'origine, qu'on LIT, sans notation de fonction.
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni les cahiers (3 → 9 €,
// 3 → 12 €), ni les stylos (4 → 20 €, 8 → 20 €), ni sachets et bonbons, ni
// l'âge et la taille, ni les 3 kg à 7,50 €, ni le sirop 1:4, ni les 300 g de
// riz, ni le sac à 60 €. Ni ceux de la feuille de 4e (cinéma, parking, tissu,
// peinture, crêpes, confiture, gazon, baguettes, aquarium, jus d'orange,
// peintres, pluie, orage, Fahrenheit, tour de la Terre).
//
// Les pièges nommés : ne vérifier qu'une colonne (1), le double qui n'est pas
// le double quand on AJOUTE (2, 14), ajouter l'écart d'une ligne à l'autre (3,
// 11), diviser dans le mauvais sens (4), ajouter des euros au lieu d'ajouter des
// PARTS (5, 12), multiplier pour remonter d'une ligne (7), lire un graphique à
// l'envers (8), le tarif dégressif pris pour proportionnel (9), les grammes et
// les kilogrammes mêlés (10), le prix le plus bas sans ramener à la même
// quantité (15), le coefficient appliqué aux heures sans les convertir (18), le
// forfait compté deux fois (14), le seuil lu dans le mauvais sens (19), arrondir
// ou oublier l'unité (17, 20).
//
// Les faits réels : une piste d'athlétisme standard mesure 400 m au couloir 1
// (règlement de World Athletics) — ex. 3 et 20 ; l'eau de mer contient en
// moyenne environ 35 g de sel par litre (salinité moyenne des océans, environ
// 35 g par kg, Ifremer) — ex. 10. Tout le reste (croissants, douche, ruches,
// voiture, piscines, kayak, pressoir, robinet qui goutte, photos, pas de Tom)
// est un MODÈLE, dit comme tel, à l'ordre de grandeur réel.
//
// ⭐ LES DESSINS : le tableau de proportionnalité à deux lignes avec sa flèche
// « ↓ × coefficient » et les cases trouvées en rouge (`tableauCoef`, repris de
// la feuille de 4e), le tableau à une ligne de figures.tsx (`tableau`), un
// tableau à plusieurs lignes (`table`, repris de l'étalon) et deux graphiques
// `repere()` de droites par l'origine. 14 dessins imprimés ; ceux qui redisent
// le corrigé mot pour mot sont `ecranSeulement` (PDF ≤ 12 pages).
//
// Les corrigés sont écrits à la première personne (« je divise »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-5e-prop-proportionnalite.mjs`.
//
// Micro-compétences : prop_reconnaitre (1, 2, 8, 9, 13, 14, 19), prop_table (3,
// 7, 10, 11, 16), prop_quatrieme (5, 6, 12, 17, 18, 20), prop_coeff (4, 5, 7, 8,
// 10, 13, 15, 17, 18, 20), prop_probleme (9, 12, 13, 15, 17, 18, 19, 20),
// prop_defi (11, 14, 16, 19, 20). 6/6.

import type { ReactNode } from "react";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, repere, tableau } from "@/lib/fiches-exercices/figures";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** Deux dessins : l'un sous l'autre sur téléphone, côte à côte à partir de `sm`
 *  et sur papier. Une légende courte au-dessus de chacun. */
const deux = (a: ReactNode, b: ReactNode, legendes?: [string, string]) => (
  <div className="grid grid-cols-1 min-w-0 gap-3 sm:grid-cols-2 print:grid-cols-2">
    {[a, b].map((d, i) => (
      <div key={i} className="min-w-0">
        {legendes && <p className="mb-1 text-center text-sm font-bold text-slate-700">{legendes[i]}</p>}
        {d}
      </div>
    ))}
  </div>
);

/**
 * LE TABLEAU DE PROPORTIONNALITÉ d'un corrigé (repris de la feuille de 4e) :
 * deux lignes, et à droite la flèche « ↓ × coefficient ». Une case écrite
 * « !45 » est une case TROUVÉE : elle s'affiche en rouge, sans le « ! ».
 * ⛔ MESURÉ LE 29/09 : la zone de dessin d'une correction fait ~235 px à 375 px,
 * et rien ne doit y défiler. Sur TÉLÉPHONE (sous `sm`), le tableau est donc
 * COUCHÉ : deux colonnes, une ligne par paire, la flèche « → × coefficient »
 * dessous. À partir de `sm` et sur papier, il reprend ses deux lignes.
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

/** Un tableau à plusieurs lignes (le `tableau()` commun n'en a qu'une). */
const table = (entete: string[], lignes: string[][]) => (
  <div className="mx-auto w-full max-w-[22rem] print:max-w-[15rem]">
    <CanvasRenderer figure={{ kind: "tableau_donnees", headers: entete, rows: lignes.map((values) => ({ values })), display: { compact: true, striped: true } }} />
  </div>
);

export const exercicesPropProportionnalite5e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "5e",
  notion: "prop-proportionnalite",
  titre: "La proportionnalité",
  accroche:
    "Vingt exercices, du geste seul au problème : reconnaître une situation de proportionnalité, et surtout celle qui n'en est pas une, compléter un tableau, trouver le coefficient, revenir à l'unité, calculer une quatrième proportionnelle. Des croissants, une piste d'athlétisme, des ruches, l'eau de mer, deux randonneurs, un pressoir, un robinet qui goutte, un podomètre. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé, et le tableau dessiné.",

  fichesCours: [{ href: "/fiches-cours/maths/5e/prop-proportionnalite", titre: "La proportionnalité" }],
  coachHref: "/coach-ia/maths?classe=5e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : vérifier, compléter ou calculer. J'écris la réponse avec son unité.",
      rappel: [
        "Deux grandeurs sont proportionnelles quand on passe de l'une à l'autre en MULTIPLIANT toujours par le même nombre : le coefficient de proportionnalité.",
        "Pour le vérifier, je divise chaque nombre du bas par celui du dessus : tous les quotients doivent être égaux.",
        "Passage à l'unité : je calcule la valeur pour 1, puis je multiplie par la quantité voulue.",
        "Dans un tableau de proportionnalité, je peux multiplier une colonne, ou additionner deux colonnes. Je n'ajoute jamais le même nombre en haut et en bas.",
      ],
      exercices: [
        {
          enonce: "Une boulangerie affiche ces prix pour ses croissants. Le prix est-il proportionnel au nombre de croissants ?",
          figure: tableau(["Croissants", "2", "5", "8"], ["Prix (€)", "2,40", "6", "9,60"], true),
          correction:
            "Je divise chaque prix par le nombre de croissants qui lui correspond.\n$2{,}40 \\div 2 = 1{,}20$ ; $6 \\div 5 = 1{,}20$ ; $9{,}60 \\div 8 = 1{,}20$.\nLes trois quotients sont égaux : le prix est proportionnel au nombre de croissants.\nLe coefficient est $1{,}2$ : c'est le prix d'UN croissant, $1{,}20$ €.\n⛔ Le piège : ne vérifier que la première colonne. Il faut que TOUTES les colonnes donnent le même quotient.\nRéponse : oui, le prix est proportionnel, avec le coefficient $1{,}2$.",
          schema: ecranSeulement(tableauCoef(["Croissants", "Prix (€)"], ["2", "5", "8"], ["2,40", "6", "9,60"], "1,2")),
          micros: ["prop_reconnaitre"],
        },
        {
          enonce: "Voici l'âge de Léa et celui de son grand frère, à trois moments de leur vie. L'âge du frère est-il proportionnel à celui de Léa ?",
          figure: tableau(["Âge de Léa", "4", "8", "12"], ["Âge du frère", "7", "11", "15"], true),
          correction:
            "Je regarde ce qui se passe quand l'âge de Léa double : de $4$ à $8$ ans.\nSi c'était proportionnel, l'âge du frère doublerait aussi : $7 \\times 2 = 14$.\nOr il a $11$ ans, pas $14$ : ce n'est PAS proportionnel.\nCe qui reste toujours pareil, c'est l'écart : le frère a toujours $3$ ans de plus. On AJOUTE $3$, on ne multiplie pas.\n⛔ Le piège : croire que « les deux âges grandissent ensemble » suffit. Ajouter toujours le même nombre, ce n'est pas multiplier par le même nombre.\nRéponse : non, l'âge du frère n'est pas proportionnel à celui de Léa.",
          schema: ecranSeulement(tableau(["Léa", "4", "8", "12"], ["Frère − Léa", "3", "3", "3"], true)),
          micros: ["prop_reconnaitre"],
        },
        {
          enonce: "Sur une piste d'athlétisme, la distance parcourue est proportionnelle au nombre de tours. Complète le tableau en utilisant les colonnes déjà remplies, sans calculer la longueur d'un tour.",
          figure: tableau(["Tours", "2", "6", "8", "16"], ["Distance (m)", "800", "?", "?", "?"], true),
          correction:
            "$6$ tours, c'est $3$ fois $2$ tours : la distance est $3$ fois plus grande. $3 \\times 800 = 2\\,400$.\n$8$ tours, c'est $2$ tours plus $6$ tours : j'additionne les deux colonnes. $800 + 2\\,400 = 3\\,200$.\n$16$ tours, c'est le double de $8$ tours : $2 \\times 3\\,200 = 6\\,400$.\n⭐ Contrôle : $800 \\div 2 = 400$. Un tour fait $400$ m, la longueur d'une piste d'athlétisme. Et $16 \\times 400 = 6\\,400$.\n⛔ Le piège : voir « $4$ tours de plus » entre $2$ et $6$, et ajouter $4$ m. On ajoute $4$ TOURS, pas $4$ mètres.\nRéponse : $2\\,400$ m, $3\\,200$ m et $6\\,400$ m.",
          schema: ecranSeulement(tableauCoef(["Tours", "Distance (m)"], ["2", "6", "8", "16"], ["800", "!2 400", "!3 200", "!6 400"], "400")),
          micros: ["prop_table"],
        },
        {
          enonce: "Sous une douche, l'eau coule toujours au même débit. En $5$ minutes, il coule $60$ L d'eau (un modèle).\na) Calcule le coefficient qui fait passer de la durée au volume d'eau.\nb) Que représente ce nombre ?\nc) Quel volume d'eau coule en $8$ minutes ?",
          correction:
            "a) Pour passer de la durée au volume, je divise le volume par la durée : $60 \\div 5 = 12$.\nb) C'est le volume d'eau qui coule en UNE minute : $12$ L par minute.\nc) En $8$ minutes, il coule $8$ fois plus : $8 \\times 12 = 96$ L.\n⛔ Le piège : diviser dans l'autre sens, $5 \\div 60$. On cherche des litres PAR minute : les litres sont au-dessus de la division.\nRéponse : le coefficient est $12$, soit $12$ L par minute ; en $8$ minutes, il coule $96$ L.",
          schema: ecranSeulement(tableauCoef(["Durée (min)", "Eau (L)"], ["5", "1", "8"], ["60", "!12", "!96"], "12")),
          micros: ["prop_coeff"],
        },
        {
          enonce: "Un pack de $6$ briques de lait coûte $5{,}40$ €. Chaque brique a le même prix. Combien coûtent $11$ briques ?",
          correction:
            "Je passe par l'unité : le prix d'UNE brique.\n$5{,}40 \\div 6 = 0{,}90$ : une brique coûte $0{,}90$ €.\nPour $11$ briques : $11 \\times 0{,}90 = 9{,}90$.\n⭐ Contrôle : $11$ briques, c'est un peu moins que le double de $6$. Le prix doit être un peu moins que $2 \\times 5{,}40 = 10{,}80$ €. C'est le cas.\n⛔ Le piège : « $5$ briques de plus, donc $5$ € de plus », et répondre $10{,}40$ €. On ajoute $5$ briques à $0{,}90$ € chacune, pas $5$ €.\nRéponse : $11$ briques coûtent $9{,}90$ €.",
          schema: ecranSeulement(tableauCoef(["Briques", "Prix (€)"], ["6", "1", "11"], ["5,40", "!0,90", "!9,90"], "0,9")),
          micros: ["prop_quatrieme", "prop_coeff"],
        },
        {
          enonce: "Une voiture consomme $6$ L d'essence pour $100$ km (un modèle). La consommation est proportionnelle à la distance.\na) Combien consomme-t-elle pour $50$ km ?\nb) Pour $250$ km ?",
          correction:
            "a) $50$ km, c'est la moitié de $100$ km : elle consomme la moitié de $6$ L, soit $3$ L.\nb) $250$ km, c'est $100 + 100 + 50$ : j'additionne les colonnes. $6 + 6 + 3 = 15$ L.\n⭐ Autre chemin : $250$ km, c'est $2{,}5$ fois $100$ km, et $2{,}5 \\times 6 = 15$.\n⛔ Le piège : « $150$ km de plus, donc $150$ L de plus ». Des litres et des kilomètres ne s'ajoutent pas : on multiplie.\nRéponse : $3$ L pour $50$ km, $15$ L pour $250$ km.",
          schema: ecranSeulement(tableauCoef(["Distance (km)", "Essence (L)"], ["100", "50", "250"], ["6", "!3", "!15"], "0,06")),
          micros: ["prop_quatrieme"],
        },
        {
          enonce: "Dans un rucher, la masse de miel récoltée est proportionnelle au nombre de ruches (un modèle). Voici le tableau de l'apicultrice.\na) Calcule le coefficient. Que représente-t-il ?\nb) Complète les deux cases vides.",
          figure: tableau(["Ruches", "4", "?", "10"], ["Miel (kg)", "56", "84", "?"], true),
          correction:
            "a) La première colonne est complète : $56 \\div 4 = 14$. Le coefficient est $14$ : chaque ruche donne $14$ kg de miel.\nb) Dernière colonne : je DESCENDS des ruches vers le miel, je multiplie. $10 \\times 14 = 140$ kg.\nDeuxième colonne : je REMONTE du miel vers les ruches, je fais l'inverse, je divise. $84 \\div 14 = 6$ ruches.\n⭐ Contrôle : $6 \\times 14 = 84$.\n⛔ Le piège : multiplier aussi pour remonter, $84 \\times 14$. On trouverait plus de mille ruches : pour remonter, on divise.\nRéponse : le coefficient est $14$ kg par ruche ; les cases valent $6$ ruches et $140$ kg.",
          schema: ecranSeulement(tableauCoef(["Ruches", "Miel (kg)"], ["4", "!6", "10"], ["56", "84", "!140"], "14")),
          micros: ["prop_table", "prop_coeff"],
        },
        {
          enonce: "Le graphique donne le prix payé (en €, axe vertical) selon la masse de pommes achetée (en kg, axe horizontal).\na) Lis le prix de $3$ kg de pommes.\nb) Quelle masse de pommes achète-t-on avec $8$ € ?\nc) Le prix est-il proportionnel à la masse ? Donne le coefficient.",
          figure: repere([-1, 6, -1, 12], [{ pts: [[0, 0], [5.5, 11]] }], [], undefined, true),
          correction:
            "a) Je pars de $3$ sur l'axe horizontal, je monte jusqu'à la droite, puis je lis sur l'axe vertical : $6$ €.\nb) Cette fois je pars de $8$ sur l'axe VERTICAL, je vais jusqu'à la droite, puis je descends : $4$ kg.\nc) Les points sont sur une droite qui passe par l'origine : $0$ kg coûte $0$ €. C'est la marque de la proportionnalité.\nLe coefficient : $6 \\div 3 = 2$. Le kilogramme de pommes coûte $2$ €.\n⛔ Le piège du b) : calculer $8 \\times 2 = 16$ et répondre « $16$ kg ». Ce serait le prix de $8$ kg. Ici, $8$ est un PRIX : je pars de l'axe des prix, ou je divise, $8 \\div 2 = 4$.\nRéponse : $6$ € ; $4$ kg ; oui, avec le coefficient $2$ (soit $2$ € le kilogramme).",
          schema: ecranSeulement(repere([-1, 6, -1, 12], [{ pts: [[0, 0], [5.5, 11]] }], [{ x: 3, y: 6, label: "(3 ; 6)" }, { x: 4, y: 8, label: "(4 ; 8)" }], undefined, true)),
          micros: ["prop_reconnaitre", "prop_coeff"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs questions sur une même situation. Je range les nombres dans un tableau avant de calculer.",
      rappel: [
        "Avant de calculer, je vérifie que c'est proportionnel : si l'une double, l'autre doit doubler. Un forfait ou un prix dégressif cassent la proportionnalité.",
        "Pour descendre d'une ligne à l'autre, je multiplie par le coefficient ; pour remonter, je divise.",
        "Je mets les nombres d'une même ligne dans la même unité AVANT de calculer.",
      ],
      exercices: [
        {
          enonce: "Deux piscines affichent leurs tarifs.\na) Dans chaque piscine, le prix est-il proportionnel au nombre d'entrées ?\nb) Dans la piscine B, combien coûte une entrée quand on en achète $10$ ?\nc) Mia veut nager $10$ fois. Combien économise-t-elle en choisissant la piscine B ?",
          figure: deux(
            tableau(["Entrées", "1", "5", "10"], ["Prix (€)", "4", "20", "40"], true),
            tableau(["Entrées", "1", "5", "10"], ["Prix (€)", "4", "18", "32"], true),
            ["Piscine A", "Piscine B"],
          ),
          correction:
            "a) Piscine A : $4 \\div 1 = 4$ ; $20 \\div 5 = 4$ ; $40 \\div 10 = 4$. Les quotients sont égaux : c'est proportionnel, une entrée coûte toujours $4$ €.\nPiscine B : $4 \\div 1 = 4$ mais $18 \\div 5 = 3{,}6$. Les quotients changent : ce n'est PAS proportionnel.\nb) $32 \\div 10 = 3{,}2$ : avec la carte de $10$, une entrée revient à $3{,}20$ €. Plus on achète d'entrées, moins chacune coûte : c'est un tarif dégressif.\nc) $40 - 32 = 8$ : elle économise $8$ €.\n⛔ Le piège : croire que la piscine B est proportionnelle parce que ses prix « montent avec le nombre d'entrées ». Ils montent, mais moins vite.\nRéponse : A oui, B non ; $3{,}20$ € l'entrée ; Mia économise $8$ €.",
          micros: ["prop_reconnaitre", "prop_probleme"],
        },
        {
          enonce: "L'eau de mer contient en moyenne environ $35$ g de sel par litre. La masse de sel est proportionnelle au volume d'eau. Complète le tableau. Attention : les deux dernières cases sont en kilogrammes.",
          figure: tableau(["Eau de mer (L)", "1", "20", "500", "2 000"], ["Sel", "35 g", "? g", "? kg", "? kg"], true),
          correction:
            "Le coefficient est $35$ : chaque litre donne $35$ g de sel. Je multiplie le volume par $35$.\n$20 \\times 35 = 700$ : $700$ g de sel.\n$500 \\times 35 = 17\\,500$ g. Pour passer en kilogrammes, je divise par $1\\,000$ : $17{,}5$ kg.\n$2\\,000 \\times 35 = 70\\,000$ g, soit $70$ kg.\n⭐ Contrôle : $2\\,000$ L, c'est $4$ fois $500$ L, et $4 \\times 17{,}5 = 70$.\n⛔ Le piège : écrire « $17\\,500$ kg » dans la case. Le calcul donne des grammes : je convertis avant d'écrire.\nRéponse : $700$ g ; $17{,}5$ kg ; $70$ kg.",
          schema: ecranSeulement(tableauCoef(["Eau (L)", "Sel (g)"], ["1", "20", "500", "2 000"], ["35", "!700", "!17 500", "!70 000"], "35")),
          micros: ["prop_table", "prop_coeff"],
        },
        {
          enonce: "Au magasin de bricolage, la corde se vend au mètre. $6$ m de corde coûtent $9$ €. Sami écrit : « de $6$ m à $10$ m, j'ajoute $4$ ; donc de $9$ € j'ajoute aussi $4$ : $10$ m coûtent $13$ € ».\na) Explique son erreur.\nb) Trouve le vrai prix de $10$ m de corde, de deux façons différentes.",
          correction:
            "a) Sami ajoute le même nombre en haut et en bas. Or, quand c'est proportionnel, on MULTIPLIE par le même nombre. Avec sa réponse, $6$ m reviennent à $9 \\div 6 = 1{,}50$ € le mètre, mais $10$ m à $1{,}30$ € le mètre : impossible si le prix est au mètre.\nb) Première façon, le coefficient : $9 \\div 6 = 1{,}5$. Donc $10 \\times 1{,}5 = 15$ €.\nDeuxième façon, les colonnes : $2$ m, c'est $6$ m divisé par $3$, donc $9 \\div 3 = 3$ €. Et $10$ m, c'est $5$ fois $2$ m : $5 \\times 3 = 15$ €.\n⛔ Le piège : ajouter $4$ m en haut, c'est ajouter $4 \\times 1{,}5 = 6$ € en bas, pas $4$ €.\nRéponse : $10$ m de corde coûtent $15$ €.",
          schema: ecranSeulement(tableauCoef(["Corde (m)", "Prix (€)"], ["6", "2", "10"], ["9", "!3", "!15"], "1,5")),
          micros: ["prop_defi", "prop_table"],
        },
        {
          enonce: "Voici la recette d'un smoothie pour $4$ verres. Calcule les quantités pour $6$ verres, puis pour $10$ verres.",
          figure: table(["Ingrédient", "4 verres"], [
            ["Bananes", "2"],
            ["Lait (mL)", "300"],
            ["Fraises (g)", "120"],
          ]),
          correction:
            "Chaque quantité est proportionnelle au nombre de verres.\nJe cherche d'abord la recette pour $2$ verres, la moitié de $4$ : $1$ banane, $150$ mL de lait, $60$ g de fraises.\n$6$ verres, c'est $4 + 2$ : $2 + 1 = 3$ bananes ; $300 + 150 = 450$ mL ; $120 + 60 = 180$ g.\n$10$ verres, c'est $4 + 4 + 2$ : $2 + 2 + 1 = 5$ bananes ; $300 + 300 + 150 = 750$ mL ; $120 + 120 + 60 = 300$ g.\n⭐ Contrôle : $10$ verres, c'est $2{,}5$ fois $4$ verres, et $2{,}5 \\times 300 = 750$.\n⛔ Le piège : « $2$ verres de plus, donc $2$ bananes de plus ». On ajoute la recette de $2$ verres, qui ne contient qu'$1$ banane.\nRéponse : pour $6$ verres, $3$ bananes, $450$ mL et $180$ g ; pour $10$ verres, $5$ bananes, $750$ mL et $300$ g.",
          schema: ecranSeulement(
            table(["Recette", "6 verres", "10 verres"], [
              ["Bananes", "3", "5"],
              ["Lait (mL)", "450", "750"],
              ["Fraises (g)", "180", "300"],
            ]),
          ),
          micros: ["prop_probleme", "prop_quatrieme"],
        },
        {
          enonce: "Aya (en bleu) et Noé (en orange) partent en randonnée, chacun à son rythme, toujours le même. Le graphique donne la distance parcourue (en km, axe vertical) selon la durée de marche (en heures, axe horizontal).\na) Pourquoi la distance est-elle proportionnelle à la durée, pour chacun ?\nb) Lis la distance parcourue par chacun en $2$ h.\nc) Calcule le coefficient de chacun. Que représente-t-il ?\nd) Le refuge est à $12$ km. Combien de temps met chacun pour y arriver ?",
          figure: repere([-1, 4, -1, 13], [{ pts: [[0, 0], [3, 12]] }, { pts: [[0, 0], [3, 9]], couleur: ORANGE }], [], undefined, true),
          correction:
            "a) Chaque graphique est une droite qui passe par l'origine : au départ, $0$ h et $0$ km. C'est la marque de la proportionnalité.\nb) Je pars de $2$ sur l'axe horizontal. Aya : $8$ km. Noé : $6$ km.\nc) Aya : $8 \\div 2 = 4$. Noé : $6 \\div 2 = 3$. C'est la distance parcourue en UNE heure : Aya marche à $4$ km par heure, Noé à $3$ km par heure.\nd) Aya : $12 \\div 4 = 3$ h. Noé : $12 \\div 3 = 4$ h. Noé arrive une heure après Aya.\n⭐ La droite la plus pentue est celle du marcheur le plus rapide : son coefficient est le plus grand.\n⛔ Le piège : pour Noé, la réponse sort du graphique. Je ne la lis pas, je la calcule avec le coefficient.\nRéponse : $8$ km et $6$ km ; $4$ et $3$ km par heure ; $3$ h pour Aya, $4$ h pour Noé.",
          micros: ["prop_reconnaitre", "prop_coeff", "prop_probleme"],
        },
        {
          enonce: "Un loueur de kayaks fait payer $5$ € pour le gilet et la pagaie, puis $6$ € par heure.\na) Vérifie les prix du tableau.\nb) Le prix est-il proportionnel à la durée ?\nc) Léo dit : « $2$ h coûtent $17$ €, donc $4$ h coûtent le double, $34$ € ». A-t-il raison ? Combien coûtent $4$ h ?",
          figure: tableau(["Durée (h)", "1", "2", "3"], ["Prix (€)", "11", "17", "23"], true),
          correction:
            "a) $1$ h : $5 + 6 = 11$ €. $2$ h : $5 + 2 \\times 6 = 17$ €. $3$ h : $5 + 3 \\times 6 = 23$ €. Le tableau est juste.\nb) De $1$ h à $2$ h, la durée double. Le prix devrait doubler : $2 \\times 11 = 22$ €. Or il vaut $17$ € : ce n'est PAS proportionnel. C'est le forfait de $5$ € qui casse la proportionnalité.\nc) Léo a tort : en doublant $17$ €, il paie DEUX fois le gilet. Le bon prix : $5 + 4 \\times 6 = 29$ €.\n⛔ Le piège : utiliser la proportionnalité (doubler, le coefficient) sans avoir vérifié que la situation est proportionnelle.\nRéponse : non, ce n'est pas proportionnel ; $4$ h coûtent $29$ €.",
          schema: ecranSeulement(tableau(["Durée (h)", "1", "2", "4"], ["Prix (€)", "11", "17", "29"], true)),
          micros: ["prop_reconnaitre", "prop_defi"],
        },
        {
          enonce: "Au supermarché, un paquet de riz de $500$ g coûte $1{,}35$ € et un sac de $2$ kg coûte $4{,}80$ €. Lequel est le plus avantageux ?",
          correction:
            "Je ne peux pas comparer $1{,}35$ € et $4{,}80$ € : les masses ne sont pas les mêmes. Je ramène tout à la même masse.\n$2$ kg, c'est $2\\,000$ g, soit $4$ paquets de $500$ g.\n$4$ petits paquets coûtent $4 \\times 1{,}35 = 5{,}40$ €. Le grand sac coûte $4{,}80$ € pour la même masse.\n⭐ Autre chemin, le prix d'UN kilogramme : petits paquets, $2 \\times 1{,}35 = 2{,}70$ € ; grand sac, $4{,}80 \\div 2 = 2{,}40$ €.\n⛔ Le piège : choisir le petit paquet « parce qu'il coûte moins cher ». Il coûte moins, mais il contient moins.\nRéponse : le sac de $2$ kg est le plus avantageux.",
          schema: ecranSeulement(
            deux(
              tableauCoef(["Riz (kg)", "Prix (€)"], ["0,5", "2"], ["1,35", "!5,40"], "2,7"),
              tableauCoef(["Riz (kg)", "Prix (€)"], ["2", "1"], ["4,80", "!2,40"], "2,4"),
              ["Petits paquets", "Grand sac"],
            ),
          ),
          micros: ["prop_coeff", "prop_probleme"],
        },
        {
          enonce: "Dans une pépinière, tous les plants de tomates ont le même prix. $7$ plants coûtent $17{,}50$ € et $3$ plants coûtent $7{,}50$ €. Sans chercher d'abord le prix d'un plant :\na) Trouve le prix de $10$ plants.\nb) Trouve le prix de $4$ plants.\nc) Déduis-en le prix d'un plant.",
          correction:
            "a) $10$ plants, c'est $7$ plants plus $3$ plants : j'additionne les deux colonnes. $17{,}50 + 7{,}50 = 25$ €.\nb) $4$ plants, c'est $7$ plants moins $3$ plants : je soustrais. $17{,}50 - 7{,}50 = 10$ €.\nc) $1$ plant, c'est $4$ plants moins $3$ plants : $10 - 7{,}50 = 2{,}50$ €.\n⭐ Contrôle avec le coefficient : $7 \\times 2{,}50 = 17{,}50$ et $10 \\times 2{,}50 = 25$.\n⛔ Le piège : additionner le haut d'une colonne avec le bas d'une autre. On additionne des colonnes ENTIÈRES : plants avec plants, euros avec euros.\nRéponse : $25$ € ; $10$ € ; un plant coûte $2{,}50$ €.",
          schema: ecranSeulement(tableauCoef(["Plants", "Prix (€)"], ["7", "3", "10", "4", "1"], ["17,50", "7,50", "!25", "!10", "!2,50"], "2,5")),
          micros: ["prop_defi", "prop_table"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions qui s'enchaînent. Je décide d'abord si c'est proportionnel, puis je réponds par des phrases.",
      rappel: [
        "Je repère les deux grandeurs, et je me demande : si l'une double, est-ce que l'autre double ?",
        "Le coefficient a une unité : des litres PAR kilogramme, des mètres PAR pas. Je l'écris.",
        "Je contrôle l'ordre de grandeur de ma réponse avant de l'écrire.",
      ],
      exercices: [
        {
          titre: "Le pressoir à pommes",
          enonce: "Au pressoir d'un village, $10$ kg de pommes donnent $6$ L de jus (un modèle). La quantité de jus est proportionnelle à la masse de pommes.\na) Quelle quantité de jus donne $1$ kg de pommes ?\nb) Une famille apporte $45$ kg de pommes. Combien de litres de jus obtient-elle ?\nc) Un voisin veut $15$ L de jus. Quelle masse de pommes doit-il apporter ?\nd) Le jus des $45$ kg est versé dans des bouteilles de $75$ cL. Combien de bouteilles remplit-on ?",
          correction:
            "a) Je passe à l'unité : $6 \\div 10 = 0{,}6$. Un kilogramme de pommes donne $0{,}6$ L de jus. C'est le coefficient.\nb) $45 \\times 0{,}6 = 27$ : la famille obtient $27$ L de jus.\nc) Je remonte du jus vers les pommes : je divise. $15 \\div 0{,}6 = 25$ : il doit apporter $25$ kg de pommes.\nd) Je mets tout dans la même unité : $27$ L $= 2\\,700$ cL. Puis $2\\,700 \\div 75 = 36$ : on remplit $36$ bouteilles.\n⭐ Contrôle du c) : $25$ kg, c'est $2{,}5$ fois $10$ kg, et $2{,}5 \\times 6 = 15$ L.\n⛔ Le piège du d) : diviser $27$ par $75$. Des litres et des centilitres ne se divisent pas entre eux sans conversion.\nRéponse : $0{,}6$ L ; $27$ L ; $25$ kg ; $36$ bouteilles.",
          schema: tableauCoef(["Pommes (kg)", "Jus (L)"], ["10", "1", "45", "!25"], ["6", "!0,6", "!27", "15"], "0,6"),
          micros: ["prop_probleme", "prop_coeff", "prop_quatrieme"],
        },
        {
          titre: "Le robinet qui goutte",
          enonce: "Un robinet qui goutte perd $0{,}5$ L d'eau en $20$ minutes (un modèle). L'eau perdue est proportionnelle à la durée.\na) Combien de litres perd-il en $1$ heure ?\nb) En $1$ jour ?\nc) En $1$ an, soit $365$ jours ?\nd) Une douche de $5$ minutes utilise $60$ L (exercice 4). À combien de douches correspond l'eau perdue en un an ?",
          correction:
            "a) $1$ heure, c'est $60$ minutes, soit $3$ fois $20$ minutes : $3 \\times 0{,}5 = 1{,}5$ L.\nb) $1$ jour, c'est $24$ heures : $24 \\times 1{,}5 = 36$ L.\nc) $365 \\times 36 = 13\\,140$ L en un an.\nd) $13\\,140 \\div 60 = 219$ : c'est l'eau de $219$ douches.\n⭐ Une petite goutte, mais plus de $13\\,000$ litres par an : c'est pour cela qu'on répare un robinet qui fuit.\n⛔ Le piège du a) : multiplier $0{,}5$ par $1$ parce qu'on demande « $1$ heure ». Les $0{,}5$ L sont perdus en $20$ MINUTES : je convertis l'heure en minutes d'abord.\nRéponse : $1{,}5$ L ; $36$ L ; $13\\,140$ L ; $219$ douches.",
          schema: ecranSeulement(
            table(["durée", "eau perdue"], [
              ["20 min", "0,5 L"],
              ["1 h = 60 min", "1,5 L"],
              ["1 jour = 24 h", "36 L"],
              ["1 an = 365 jours", "13 140 L"],
            ]),
          ),
          micros: ["prop_probleme", "prop_quatrieme", "prop_coeff"],
        },
        {
          titre: "Deux tarifs de photos",
          enonce: "Pour imprimer des photos, un magasin propose deux tarifs.\nTarif A : $0{,}15$ € la photo.\nTarif B : $3$ € de frais d'envoi, puis $0{,}10$ € la photo.\na) Calcule le prix de $10$, de $40$ et de $100$ photos avec chaque tarif.\nb) Lequel des deux tarifs est proportionnel au nombre de photos ? Pourquoi l'autre ne l'est-il pas ?\nc) Quel tarif choisir pour $40$ photos ? Pour $100$ photos ?\nd) Pour combien de photos les deux tarifs coûtent-ils la même chose ?",
          correction:
            "a) Tarif A : $10 \\times 0{,}15 = 1{,}50$ € ; $40 \\times 0{,}15 = 6$ € ; $100 \\times 0{,}15 = 15$ €.\nTarif B : $3 + 10 \\times 0{,}10 = 4$ € ; $3 + 40 \\times 0{,}10 = 7$ € ; $3 + 100 \\times 0{,}10 = 13$ €.\nb) Le tarif A est proportionnel : je multiplie toujours par $0{,}15$. Le tarif B ne l'est pas : $0$ photo coûte déjà $3$ €, et de $10$ à $100$ photos le prix ne fait pas $\\times 10$.\nc) Pour $40$ photos, A est moins cher ($6$ € contre $7$ €). Pour $100$ photos, B est moins cher ($13$ € contre $15$ €).\nd) Chaque photo coûte $0{,}05$ € de moins avec B, mais B part avec $3$ € de frais. Il faut $3 \\div 0{,}05 = 60$ photos pour rattraper les frais.\nJe vérifie : A, $60 \\times 0{,}15 = 9$ € ; B, $3 + 60 \\times 0{,}10 = 9$ €.\n⛔ Le piège : croire qu'un tarif est toujours le meilleur. Ici, A gagne en dessous de $60$ photos, B au-dessus.\nRéponse : A est proportionnel ; A pour $40$ photos, B pour $100$ ; les deux coûtent $9$ € pour $60$ photos.",
          schema: table(["Photos", "A (€)", "B (€)"], [
            ["10", "1,50", "4"],
            ["40", "6", "7"],
            ["60", "9", "9"],
            ["100", "15", "13"],
          ]),
          micros: ["prop_reconnaitre", "prop_probleme", "prop_defi"],
        },
        {
          titre: "Les pas de Tom",
          enonce: "Tom compte ses pas : $10$ pas mesurent $8$ m. Ses pas ont toujours la même longueur.\na) Quelle est la longueur d'un pas de Tom, en mètres puis en centimètres ?\nb) Un tour de piste d'athlétisme mesure $400$ m. Combien de pas fait-il pour un tour ?\nc) Le soir, sa montre a compté $9\\,000$ pas. Quelle distance a-t-il parcourue, en kilomètres ?\nd) Il veut marcher $10$ km. Combien de pas doit-il faire ?",
          correction:
            "a) Je passe à l'unité : $8 \\div 10 = 0{,}8$. Un pas mesure $0{,}8$ m, soit $80$ cm. C'est le coefficient : $0{,}8$ m par pas.\nb) Je remonte des mètres vers les pas : je divise. $400 \\div 0{,}8 = 500$ pas.\nc) $9\\,000 \\times 0{,}8 = 7\\,200$ m, soit $7{,}2$ km.\nd) $10$ km $= 10\\,000$ m. Puis $10\\,000 \\div 0{,}8 = 12\\,500$ pas.\n⭐ Contrôle du d) : $10$ km, c'est $25$ tours de piste de $400$ m, et $25 \\times 500 = 12\\,500$.\n⛔ Le piège du d) : diviser $10$ par $0{,}8$ sans convertir, et trouver $12{,}5$ pas pour $10$ km. Le coefficient est en mètres : je mets la distance en mètres.\nRéponse : $0{,}8$ m soit $80$ cm ; $500$ pas ; $7{,}2$ km ; $12\\,500$ pas.",
          schema: tableauCoef(["Pas", "Distance (m)"], ["10", "1", "!500", "9 000", "!12 500"], ["8", "!0,8", "400", "!7 200", "10 000"], "0,8"),
          micros: ["prop_probleme", "prop_coeff", "prop_quatrieme", "prop_defi"],
        },
      ],
    },
  ],
};
