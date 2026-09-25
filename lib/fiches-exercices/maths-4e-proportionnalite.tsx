// ─── Fiche d'exercices : la proportionnalité (4e) — 20 exercices corrigés ─────
//
// Alignée sur la fiche de cours `lib/fiches/maths-4e-proportionnalite.tsx` et sur
// les six micros du coach de 4e (notionId prop_proportionnalite). ⛔ La notion a
// été SCINDÉE le 28/08/2026 : les pourcentages, le coefficient multiplicateur et
// les évolutions sont partis dans `prop_ratio_pourcentage`, les échelles dans
// `prop_echelle` — chacune a sa feuille. Celle-ci reste sur ce qui reste :
// reconnaître (tableau ET graphique), compléter un tableau, le coefficient et le
// retour à l'unité, la quatrième proportionnelle, le problème, le défi. Aucun
// pourcentage, aucune échelle, pas de notation f(x) (hors programme de 4e) : le
// graphique se dit « des points alignés avec l'origine ».
//
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni les letchis (3 kg,
// 12 €), ni le plombier (50 € + 30 €/h), ni les six bouteilles, ni 2 → 10,
// 2 → 6 / 5 → 9, le cycliste de 24 km, l'abonnement à 15 €. ⛔ Ni ceux de la
// feuille de 3e (tomates, 4 → 10, taxi, 12 L aux 200 km, robinet, bus,
// tablette, verre doseur, abonnés, démarque, aller-retour).
//
// Les pièges nommés : conclure parce que « les deux lignes grandissent
// ensemble » (1, 9), le tableau régulier pris pour proportionnel (2), copier
// l'écart d'une ligne sur l'autre (3, 14), le coefficient pris dans le mauvais
// sens (4), la mauvaise diagonale du produit en croix (5, 11), ajouter au lieu
// d'ajouter des PARTS (6), « c'est une droite, donc c'est proportionnel » (7),
// multiplier pour remonter d'une ligne (8), les unités mêlées (10, 18),
// arrondir vers le haut un nombre d'objets (12), lire un graphique à l'envers
// (13), comparer deux prix sans ramener à la même quantité (15), le produit en
// croix sur une situation qui n'est pas proportionnelle (16), oublier la
// surface (17), croire que doubler une température la double (19), un
// coefficient sans son unité (20).
//
// Les chiffres du monde, et d'où ils viennent :
// - « 1 mm de pluie = 1 L par m² » : c'est la DÉFINITION du millimètre de pluie
//   (Météo-France, pluviométrie) — ex. 17 ; à Paris, environ 640 mm par an
//   (normale 1991-2020 de Paris-Montsouris, 637 mm, Météo-France) ; l'abri de
//   12 m² et la cuve de 300 L sont imaginés, à l'ordre de grandeur réel ;
// - vitesse du son dans l'air : environ 340 m/s (343 m/s à 20 °C) ; la règle
//   « 3 secondes par kilomètre » pour situer un orage (Météo-France) — ex. 18 ;
// - l'échelle Fahrenheit : 0 °C = 32 °F, 100 °C = 212 °F, et °F = °C × 1,8 + 32,
//   par définition — ex. 19 ;
// - la Terre tourne de 360° en 24 h (jour solaire moyen ; le jour sidéral,
//   23 h 56 min, n'est pas utile en 4e), d'où 15° par heure et les 24 fuseaux
//   horaires de 15° — ex. 20.
//
// ⭐ LES SCHÉMAS (« les élèves adorent les schémas ») : les VINGT corrigés ont
// leur dessin. Le tableau de proportionnalité à deux lignes, avec sa flèche
// « × coefficient » et les cases trouvées en rouge (`tableauCoef`, HTML : lisible
// à toutes les largeurs, rien à mesurer), les graphiques avec `repere()` de
// figures.tsx, le tableau des quotients qui ne sont pas égaux avec `tableau()`,
// et le quart de tour de la Terre en SVG local (`tourDeTerre`). Le script de
// recalcul RELIT chaque tableau et vérifie que la ligne du bas est bien celle du
// haut multipliée par le coefficient écrit.
//
// Les corrigés sont écrits à la première personne (« je divise »), comme les
// feuilles de 3e.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-proportionnalite-4e.mjs`.
//
// Micro-compétences : prop_reconnaitre (1, 2, 7, 9, 13, 16, 19), prop_table (3,
// 8, 10, 14), prop_coeff (4, 6, 8, 10, 12, 13, 15, 17, 20), prop_quatrieme (5,
// 11, 12, 18), prop_probleme (12, 15, 17, 18, 20), prop_defi (14, 16, 18, 19,
// 20). 6/6.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, repere, tableau } from "@/lib/fiches-exercices/figures";

/** Deux dessins côte à côte : l'un sous l'autre sur téléphone, côte à côte à
 *  partir de `sm` et sur papier. Une légende courte au-dessus de chacun. */
const deux = (a: ReactNode, b: ReactNode, legendes?: [string, string]) => (
  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 print:grid-cols-2">
    {[a, b].map((d, i) => (
      <div key={i}>
        {legendes && <p className="mb-1 text-center text-sm font-bold text-slate-700">{legendes[i]}</p>}
        {d}
      </div>
    ))}
  </div>
);

/**
 * LE TABLEAU DE PROPORTIONNALITÉ d'un corrigé : deux lignes, et à droite la
 * flèche « ↓ × coefficient » qui fait passer de l'une à l'autre. Une case
 * écrite « !45 » est une case TROUVÉE : elle s'affiche en rouge, sans le « ! ».
 * Du HTML, pas un canvas : cinq colonnes de nombres tiennent à 360 px.
 * ⚠️ Pas de formule dans les cases : elles ne traversent pas KaTeX.
 */
const tableauCoef = (titres: [string, string], haut: string[], bas: string[], coef: string) => {
  const cellule = (c: string, i: number) => {
    const trouvee = c.startsWith("!");
    return (
      <td
        key={i}
        className={`whitespace-nowrap border border-slate-400 px-2 py-1 text-center ${trouvee ? "font-bold text-red-600" : "text-slate-900"}`}
      >
        {trouvee ? c.slice(1) : c}
      </td>
    );
  };
  return (
    <div className="overflow-x-auto">
      <table className="mx-auto border-collapse text-sm">
        <tbody>
          <tr>
            <th className="whitespace-nowrap border border-slate-400 bg-slate-100 px-2 py-1 text-left font-semibold text-slate-800">{titres[0]}</th>
            {haut.map(cellule)}
            <td rowSpan={2} className="whitespace-nowrap pl-2 text-center font-bold text-blue-700">
              ↓ × {coef}
            </td>
          </tr>
          <tr>
            <th className="whitespace-nowrap border border-slate-400 bg-slate-100 px-2 py-1 text-left font-semibold text-slate-800">{titres[1]}</th>
            {bas.map(cellule)}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

/**
 * LE TOUR DE LA TERRE (exercice 20) : un cadran de 24 heures, et la part qui
 * tourne en `heures` heures, coloriée. 6 h font un quart de tour, 90°. Le
 * libellé se CALCULE sur l'argument : il ne peut pas contredire le dessin.
 */
const tourDeTerre = (heures: number) => {
  const cx = 100;
  const cy = 70;
  const r = 56;
  const angle = heures * 15;
  const point = (deg: number, rayon = r) => {
    const a = ((deg - 90) * Math.PI) / 180;
    return [cx + rayon * Math.cos(a), cy + rayon * Math.sin(a)];
  };
  const [x1, y1] = point(angle);
  return (
    <svg viewBox="0 0 200 150" role="img" aria-label={`En ${heures} heures, la Terre tourne de ${angle} degrés sur 360.`} className="mx-auto w-full max-w-[12rem]">
      <circle cx={cx} cy={cy} r={r} fill="#e0f2fe" stroke="#0369a1" strokeWidth={1.5} />
      <path d={`M ${cx} ${cy} L ${cx} ${cy - r} A ${r} ${r} 0 ${angle > 180 ? 1 : 0} 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z`} fill="#fdba74" stroke="#ea580c" strokeWidth={1.5} />
      {Array.from({ length: 24 }, (_, h) => {
        const [xa, ya] = point(h * 15, r - (h % 6 === 0 ? 9 : 5));
        const [xb, yb] = point(h * 15);
        return <line key={h} x1={xa} y1={ya} x2={xb} y2={yb} stroke="#0369a1" strokeWidth={h % 6 === 0 ? 1.6 : 0.8} />;
      })}
      <text x={cx} y={144} textAnchor="middle" fontSize={16} fontWeight={700} fill="#c2410c">
        {`${heures} h → ${angle}°`}
      </text>
    </svg>
  );
};

export const exercicesProportionnalite4e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "prop-proportionnalite",
  titre: "Proportionnalité : tableaux, coefficient, produit en croix",
  accroche:
    "Vingt exercices, du geste seul au problème : reconnaître une situation de proportionnalité dans un tableau ou sur un graphique, compléter un tableau, trouver le coefficient, calculer une quatrième proportionnelle. La pluie sur un toit, l'orage qu'on écoute, les degrés Fahrenheit, le tour de la Terre. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé, et le tableau dessiné.",

  fichesCours: [{ href: "/fiches-cours/maths/4e/prop-proportionnalite", titre: "La proportionnalité" }],
  coachHref: "/coach-ia/maths?classe=4e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : vérifier, compléter ou calculer. Tu écris la réponse avec son unité.",
      rappel: [
        "Deux grandeurs sont proportionnelles quand on passe de l'une à l'autre en MULTIPLIANT toujours par le même nombre : le coefficient de proportionnalité.",
        "Pour le vérifier, je divise chaque valeur de la seconde ligne par celle du dessus : tous les quotients doivent être égaux.",
        "Quatrième proportionnelle : si $a \\to b$ et $c \\to x$, alors $x = \\dfrac{b \\times c}{a}$. C'est le produit en croix.",
        "Sur un graphique, une situation de proportionnalité donne des points alignés avec l'origine du repère.",
      ],
      exercices: [
        {
          enonce: "Au cinéma, $2$ places coûtent $17$ €, $3$ places coûtent $25{,}50$ € et $5$ places coûtent $42{,}50$ €. Le prix est-il proportionnel au nombre de places ?",
          figure: tableau(["Places", "2", "3", "5"], ["Prix (€)", "17", "25,50", "42,50"]),
          correction:
            "Je divise chaque prix par le nombre de places qui lui correspond.\n$17 \\div 2 = 8{,}5$ ; $25{,}5 \\div 3 = 8{,}5$ ; $42{,}5 \\div 5 = 8{,}5$.\nLes trois quotients sont égaux : le prix est proportionnel au nombre de places.\nLe coefficient est $8{,}5$ : une place coûte $8{,}50$ €.\n⛔ Le piège : répondre « oui » parce que les deux lignes grandissent ensemble. Elles grandissent aussi dans un tableau qui n'est pas proportionnel : seul le calcul des quotients décide.\nRéponse : oui, le prix est proportionnel au nombre de places, avec le coefficient $8{,}5$.",
          schema: tableauCoef(["Places", "Prix (€)"], ["2", "3", "5"], ["17", "25,50", "42,50"], "8,5"),
          micros: ["prop_reconnaitre"],
        },
        {
          enonce: "Voici les tarifs d'un parking. Le prix payé est-il proportionnel à la durée de stationnement ?",
          figure: tableau(["Durée (h)", "1", "2", "4"], ["Prix (€)", "3", "5", "9"]),
          correction:
            "Je divise chaque prix par sa durée.\n$3 \\div 1 = 3$ ; $5 \\div 2 = 2{,}5$ ; $9 \\div 4 = 2{,}25$.\nLes quotients ne sont pas égaux : le prix n'est PAS proportionnel à la durée.\n⭐ Autre chemin : $2$ h, c'est le double de $1$ h, mais $5$ € n'est pas le double de $3$ €.\n⛔ Le piège : le tableau est régulier, chaque heure de plus coûte $2$ €, et l'on croit que c'est proportionnel. Ajouter toujours la même somme, ce n'est pas multiplier toujours par le même nombre.\nRéponse : non, le prix n'est pas proportionnel à la durée.",
          schema: tableau(["Durée (h)", "1", "2", "4"], ["Prix ÷ durée", "3", "2,5", "2,25"]),
          micros: ["prop_reconnaitre"],
        },
        {
          enonce: "Ce tableau est un tableau de proportionnalité. Complète-le en utilisant les colonnes déjà remplies, sans calculer le coefficient.",
          figure: tableau(["Ligne 1", "4", "8", "12", "20"], ["Ligne 2", "6", "?", "?", "?"]),
          correction:
            "$8$ est le double de $4$ : la case du dessous est le double de $6$, soit $12$.\n$12 = 4 + 8$ : j'additionne les deux cases du dessous, $6 + 12 = 18$.\n$20 = 8 + 12$ : j'additionne encore, $12 + 18 = 30$.\n⭐ Contrôle avec le coefficient : $6 \\div 4 = 1{,}5$, et $8 \\times 1{,}5 = 12$, $12 \\times 1{,}5 = 18$, $20 \\times 1{,}5 = 30$.\n⛔ Le piège : voir que $6 - 4 = 2$ et ajouter $2$ partout. On écrirait $10$ sous le $8$ : faux, car $10 \\div 8$ ne fait pas $1{,}5$.\nRéponse : les cases valent $12$, $18$ et $30$.",
          schema: tableauCoef(["Ligne 1", "Ligne 2"], ["4", "8", "12", "20"], ["6", "!12", "!18", "!30"], "1,5"),
          micros: ["prop_table"],
        },
        {
          enonce: "$2{,}5$ m de tissu coûtent $20$ €. Le prix est proportionnel à la longueur.\na) Calcule le coefficient qui fait passer de la longueur au prix.\nb) Que représente ce nombre ?",
          correction:
            "a) Pour passer de la longueur au prix, je divise le prix par la longueur : $20 \\div 2{,}5 = 8$.\nb) C'est le prix d'UN mètre de tissu, $8$ €. Le coefficient est le prix « à l'unité ».\n⭐ Contrôle : $2{,}5 \\times 8 = 20$.\n⛔ Le piège : diviser dans l'autre sens, $2{,}5 \\div 20 = 0{,}125$. Ce nombre existe, mais il fait passer du prix à la longueur : c'est la longueur de tissu qu'on achète avec $1$ €.\nRéponse : le coefficient est $8$ ; c'est le prix d'un mètre de tissu, $8$ €.",
          schema: tableauCoef(["Longueur (m)", "Prix (€)"], ["2,5", "1"], ["20", "!8"], "8"),
          micros: ["prop_coeff"],
        },
        {
          enonce: "$4$ pots de peinture permettent de peindre $30$ m² de mur. Combien de mètres carrés peut-on peindre avec $6$ pots ?",
          correction:
            "La surface peinte est proportionnelle au nombre de pots : $4 \\to 30$ et $6 \\to x$.\nProduit en croix : je multiplie les deux nombres en diagonale, puis je divise par le troisième. $x = \\dfrac{30 \\times 6}{4}$.\n$30 \\times 6 = 180$, puis $180 \\div 4 = 45$.\n⭐ Contrôle : $6$ pots, c'est $4$ pots plus leur moitié ; $30 + 15 = 45$.\n⛔ Le piège : se tromper de diagonale, $\\dfrac{30 \\times 4}{6} = 20$. Avec PLUS de pots, on ne peut pas peindre MOINS de mur.\nRéponse : avec $6$ pots, on peint $45$ m² de mur.",
          schema: tableauCoef(["Pots", "Surface (m²)"], ["4", "6"], ["30", "!45"], "7,5"),
          micros: ["prop_quatrieme"],
        },
        {
          enonce: "Pour $4$ personnes, une pâte à crêpes demande $300$ g de farine.\na) Quelle masse de farine faut-il pour $1$ personne ?\nb) Pour $7$ personnes ?",
          correction:
            "a) Je reviens à l'unité : pour $1$ personne, il faut $4$ fois moins de farine. $300 \\div 4 = 75$, soit $75$ g.\nb) Pour $7$ personnes, $7$ fois plus : $7 \\times 75 = 525$, soit $525$ g.\n⭐ Ces $75$ g par personne sont le coefficient : il fait passer du nombre de personnes à la masse de farine.\n⛔ Le piège : « $3$ personnes de plus, donc $3$ g de plus », et répondre $303$ g. On ajoute trois PARTS de $75$ g : $300 + 3 \\times 75 = 525$.\nRéponse : $75$ g pour une personne, $525$ g pour sept personnes.",
          schema: tableauCoef(["Personnes", "Farine (g)"], ["4", "1", "7"], ["300", "!75", "!525"], "75"),
          micros: ["prop_coeff"],
        },
        {
          enonce: "Voici deux graphiques. Lequel représente une situation de proportionnalité ? Justifie.",
          figure: deux(
            repere([-1, 7, -1, 10], [{ pts: [[0, 0], [6, 9]] }]),
            repere([-1, 7, -1, 10], [{ pts: [[0, 2], [6, 8]], couleur: ORANGE }]),
            ["Graphique A", "Graphique B"],
          ),
          correction:
            "Je lis deux points sur chaque droite, et je divise la hauteur du point par son abscisse.\nGraphique A : $(2 ; 3)$ et $(4 ; 6)$. $3 \\div 2 = 1{,}5$ et $6 \\div 4 = 1{,}5$ : les quotients sont égaux.\nGraphique B : $(2 ; 4)$ et $(4 ; 6)$. $4 \\div 2 = 2$ mais $6 \\div 4 = 1{,}5$ : les quotients sont différents.\n⭐ La règle : une situation de proportionnalité se représente par des points ALIGNÉS AVEC L'ORIGINE. La droite A passe par le point $(0 ; 0)$ ; la droite B coupe l'axe vertical en $2$.\n⛔ Le piège : « c'est une droite, donc c'est proportionnel ». La droite B est bien droite, mais elle ne passe pas par l'origine.\nRéponse : c'est le graphique A qui représente une situation de proportionnalité.",
          schema: deux(
            repere([-1, 7, -1, 10], [{ pts: [[0, 0], [6, 9]] }], [{ x: 2, y: 3 }, { x: 4, y: 6 }, { x: 0, y: 0 }]),
            repere([-1, 7, -1, 10], [{ pts: [[0, 2], [6, 8]], couleur: ORANGE }], [{ x: 2, y: 4 }, { x: 4, y: 6 }, { x: 0, y: 2 }]),
            ["A : passe par l'origine", "B : ne passe pas par l'origine"],
          ),
          micros: ["prop_reconnaitre"],
        },
        {
          enonce: "Ce tableau est un tableau de proportionnalité.\na) Calcule le coefficient qui fait passer de la ligne 1 à la ligne 2.\nb) Complète les deux cases vides.",
          figure: tableau(["Ligne 1", "5", "?", "12"], ["Ligne 2", "3,5", "4,9", "?"]),
          correction:
            "a) La seule colonne complète est la première : $3{,}5 \\div 5 = 0{,}7$. Le coefficient est $0{,}7$.\nb) Dans la dernière colonne, je DESCENDS de la ligne 1 à la ligne 2 : je multiplie, $12 \\times 0{,}7 = 8{,}4$.\nDans la deuxième colonne, je REMONTE de la ligne 2 à la ligne 1 : je fais l'opération inverse, $4{,}9 \\div 0{,}7 = 7$.\n⭐ Contrôle : $7 \\times 0{,}7 = 4{,}9$.\n⛔ Le piège : multiplier aussi pour remonter, $4{,}9 \\times 0{,}7 = 3{,}43$. Pour remonter, on divise.\nRéponse : le coefficient est $0{,}7$ ; les cases vides valent $7$ et $8{,}4$.",
          schema: tableauCoef(["Ligne 1", "Ligne 2"], ["5", "!7", "12"], ["3,5", "4,9", "!8,4"], "0,7"),
          micros: ["prop_table", "prop_coeff"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au contrôle. Tu justifies chaque réponse par un calcul.",
      rappel: [
        "Avant tout calcul, je vérifie que la situation est proportionnelle : un forfait, une aire, un travail partagé entre plusieurs personnes ne le sont pas.",
        "Dans un tableau de proportionnalité, je peux multiplier une colonne par un nombre, ou additionner deux colonnes. Je n'ajoute JAMAIS le même nombre aux deux lignes.",
        "Revenir à l'unité : je divise pour trouver la valeur d'UNE unité, puis je multiplie par la quantité voulue.",
        "Je mets les deux valeurs d'une même ligne dans la même unité AVANT de calculer.",
      ],
      exercices: [
        {
          enonce:
            "Pour chaque situation, dis si les deux grandeurs sont proportionnelles. Justifie par un calcul.\na) Le périmètre d'un carré et la longueur de son côté.\nb) L'aire d'un carré et la longueur de son côté.\nc) Le prix payé et le nombre de croissants achetés, à $1{,}10$ € le croissant.",
          correction:
            "a) Le périmètre d'un carré vaut $4$ fois son côté : côté $1$ cm, périmètre $4$ cm ; côté $3$ cm, périmètre $12$ cm. Je multiplie toujours par $4$ : c'est proportionnel, de coefficient $4$.\nb) Côté $1$ cm, aire $1$ cm² ; côté $2$ cm, aire $4$ cm² ; côté $3$ cm, aire $9$ cm². $1 \\div 1 = 1$ mais $4 \\div 2 = 2$ : les quotients changent, ce n'est PAS proportionnel.\nc) $n$ croissants coûtent $n \\times 1{,}10$ € : je multiplie toujours par $1{,}10$, c'est proportionnel.\n⛔ Le piège : « quand le côté augmente, l'aire augmente, donc c'est proportionnel ». Deux grandeurs peuvent grandir ensemble sans être proportionnelles.\nRéponse : a) oui ; b) non ; c) oui.",
          schema: tableau(["Côté (cm)", "1", "2", "3"], ["Aire (cm²)", "1", "4", "9"]),
          micros: ["prop_reconnaitre"],
        },
        {
          enonce:
            "Pour faire de la confiture, la masse de sucre est proportionnelle à la masse de fruits. Complète le tableau. Attention aux unités.",
          figure: tableau(["Fruits", "600 g", "1 000 g", "?", "2 kg"], ["Sucre", "450 g", "?", "900 g", "?"], true),
          correction:
            "Le coefficient, avec la première colonne : $450 \\div 600 = 0{,}75$. Je multiplie la masse de fruits par $0{,}75$ pour obtenir la masse de sucre.\n$1\\,000 \\times 0{,}75 = 750$ : il faut $750$ g de sucre.\nPour remonter du sucre aux fruits, je divise : $900 \\div 0{,}75 = 1\\,200$, soit $1\\,200$ g de fruits.\n$2$ kg, c'est $2\\,000$ g : $2\\,000 \\times 0{,}75 = 1\\,500$, soit $1\\,500$ g de sucre.\n⛔ Le piège : calculer $2 \\times 0{,}75 = 1{,}5$ et écrire « $1{,}5$ g ». Le nombre est juste en kilogrammes, faux en grammes : je convertis AVANT de calculer.\nRéponse : $750$ g de sucre, $1\\,200$ g de fruits, $1\\,500$ g de sucre.",
          schema: tableauCoef(["Fruits (g)", "Sucre (g)"], ["600", "1 000", "!1 200", "2 000"], ["450", "!750", "900", "!1 500"], "0,75"),
          micros: ["prop_table", "prop_coeff"],
        },
        {
          enonce: "Il faut $2{,}4$ kg de graines pour semer $60$ m² de gazon. Quelle masse de graines faut-il pour $85$ m² ?",
          correction:
            "La masse de graines est proportionnelle à la surface : $60 \\to 2{,}4$ et $85 \\to x$.\nProduit en croix : $x = \\dfrac{2{,}4 \\times 85}{60}$.\n$2{,}4 \\times 85 = 204$, puis $204 \\div 60 = 3{,}4$.\n⭐ Autre chemin, par l'unité : $2{,}4 \\div 60 = 0{,}04$ kg par m², soit $40$ g par m². Puis $85 \\times 0{,}04 = 3{,}4$.\n⛔ Le piège : la mauvaise diagonale, $\\dfrac{60 \\times 85}{2{,}4} = 2\\,125$. Plus de deux tonnes de graines pour un jardin : l'ordre de grandeur signale l'erreur.\nRéponse : il faut $3{,}4$ kg de graines.",
          schema: tableauCoef(["Surface (m²)", "Graines (kg)"], ["60", "85"], ["2,4", "!3,4"], "0,04"),
          micros: ["prop_quatrieme"],
        },
        {
          enonce:
            "Un boulanger utilise $1{,}2$ kg de farine pour $8$ baguettes.\na) Quelle masse de farine lui faut-il pour $50$ baguettes ?\nb) Il lui reste un sac de $25$ kg. Combien de baguettes peut-il faire, au maximum ?",
          correction:
            "a) Je reviens à une baguette : $1{,}2 \\div 8 = 0{,}15$ kg, soit $150$ g de farine par baguette.\nPour $50$ baguettes : $50 \\times 0{,}15 = 7{,}5$, soit $7{,}5$ kg de farine.\nb) Chaque baguette prend $0{,}15$ kg : je cherche combien de fois $0{,}15$ tient dans $25$. $25 \\div 0{,}15 = 166{,}66\\ldots$\nIl ne peut pas faire un morceau de baguette : j'arrondis vers le BAS, $166$ baguettes.\n⛔ Le piège : arrondir à $167$. Il faudrait $167 \\times 0{,}15 = 25{,}05$ kg de farine, plus que le sac.\nRéponse : $7{,}5$ kg de farine pour $50$ baguettes ; $166$ baguettes au maximum avec le sac.",
          schema: tableauCoef(["Baguettes", "Farine (kg)"], ["8", "1", "50", "!166"], ["1,2", "!0,15", "!7,5", "24,9"], "0,15"),
          micros: ["prop_quatrieme", "prop_probleme", "prop_coeff"],
        },
        {
          enonce:
            "On remplit un aquarium avec un broc, toujours rempli de la même façon. Le graphique donne le volume d'eau versé (en litres, axe vertical) selon le nombre de brocs (axe horizontal).\na) Pourquoi le volume est-il proportionnel au nombre de brocs ?\nb) Lis le volume d'eau après $4$ brocs.\nc) Quel est le coefficient ? Que représente-t-il ?\nd) Combien de brocs faut-il pour verser $12$ L ?",
          figure: repere([-1, 7, -1, 11], [{ pts: [[0, 0], [7, 10.5]] }]),
          correction:
            "a) Les points sont sur une droite qui passe par l'origine : c'est la marque d'une situation de proportionnalité. C'est logique : $0$ broc, $0$ L ; deux fois plus de brocs, deux fois plus d'eau.\nb) Je pars de $4$ sur l'axe horizontal, je monte jusqu'à la droite, puis je lis sur l'axe vertical : $6$ L.\nc) $6 \\div 4 = 1{,}5$. Le coefficient est $1{,}5$ : c'est le volume d'UN broc, $1{,}5$ L.\nd) $12$ L sort du graphique, alors je calcule : $12 \\div 1{,}5 = 8$, soit $8$ brocs.\n⛔ Le piège : lire le graphique à l'envers, en partant de $4$ sur l'axe VERTICAL. On trouverait environ $2{,}7$ brocs, une réponse qui n'a pas de sens ici.\nRéponse : $6$ L après $4$ brocs ; le coefficient $1{,}5$ est le volume d'un broc ; il faut $8$ brocs pour $12$ L.",
          schema: repere([-1, 7, -1, 11], [{ pts: [[0, 0], [7, 10.5]] }], [{ x: 4, y: 6, label: "(4 ; 6)" }, { x: 2, y: 3 }]),
          micros: ["prop_reconnaitre", "prop_coeff"],
        },
        {
          enonce:
            "Dans un tableau de proportionnalité, on lit $6 \\to 15$ et $10 \\to 25$. Tom veut compléter $16 \\to ?$ et $4 \\to ?$. Il écrit : « de $10$ à $16$ j'ajoute $6$, donc de $25$ j'ajoute aussi $6$ : $31$ ».\na) Explique son erreur.\nb) Complète correctement les deux cases, de deux façons différentes.",
          figure: tableau(["Ligne 1", "6", "10", "16", "4"], ["Ligne 2", "15", "25", "?", "?"]),
          correction:
            "a) Tom ajoute la même chose sur les deux lignes. Or, dans un tableau de proportionnalité, on MULTIPLIE par le même nombre : $15 \\div 6 = 2{,}5$ et $25 \\div 10 = 2{,}5$. Avec sa réponse, $31 \\div 16$ ne fait pas $2{,}5$.\nb) Première façon, le coefficient : $16 \\times 2{,}5 = 40$ et $4 \\times 2{,}5 = 10$.\nDeuxième façon, les colonnes : $16 = 6 + 10$, donc la case vaut $15 + 25 = 40$. Et $4 = 10 - 6$, donc la case vaut $25 - 15 = 10$.\n⭐ J'ai le droit d'additionner ou de soustraire deux colonnes ENTIÈRES. Je n'ai pas le droit d'ajouter un même nombre aux deux lignes.\n⛔ Le piège : copier l'écart d'une ligne sur l'autre. Ajouter $6$ en haut, c'est ajouter $6 \\times 2{,}5 = 15$ en bas.\nRéponse : $16 \\to 40$ et $4 \\to 10$.",
          schema: tableauCoef(["Ligne 1", "Ligne 2"], ["6", "10", "16", "4"], ["15", "25", "!40", "!10"], "2,5"),
          micros: ["prop_defi", "prop_table"],
        },
        {
          enonce:
            "Au supermarché, une bouteille de jus d'orange de $1{,}5$ L coûte $2{,}70$ €, et une bouteille de $2$ L coûte $3{,}40$ €. Laquelle est la plus avantageuse ?",
          correction:
            "Je ne peux pas comparer $2{,}70$ € et $3{,}40$ € : les volumes ne sont pas les mêmes. Je reviens à l'unité, le prix d'UN litre.\nPetite bouteille : $2{,}70 \\div 1{,}5 = 1{,}80$ € le litre.\nGrande bouteille : $3{,}40 \\div 2 = 1{,}70$ € le litre.\n$1{,}70 < 1{,}80$ : le litre est moins cher dans la grande bouteille.\n⭐ Ce prix au litre est le coefficient de proportionnalité. Il est écrit en petit sur l'étiquette des rayons : « prix au litre ».\n⛔ Le piège : choisir la bouteille à $2{,}70$ € parce qu'elle « coûte moins cher ». Elle coûte moins, mais elle contient moins.\nRéponse : la bouteille de $2$ L est la plus avantageuse.",
          schema: deux(
            tableauCoef(["Volume (L)", "Prix (€)"], ["1,5", "1"], ["2,70", "!1,80"], "1,8"),
            tableauCoef(["Volume (L)", "Prix (€)"], ["2", "1"], ["3,40", "!1,70"], "1,7"),
            ["Petite bouteille", "Grande bouteille"],
          ),
          micros: ["prop_coeff", "prop_probleme"],
        },
        {
          enonce:
            "$3$ peintres mettent $12$ jours pour repeindre une école. Ils travaillent tous au même rythme. Léo calcule le temps qu'il faudrait à $6$ peintres avec un produit en croix : $\\dfrac{12 \\times 6}{3} = 24$ jours.\na) Sa réponse est-elle vraisemblable ?\nb) Le nombre de jours est-il proportionnel au nombre de peintres ?\nc) Combien de jours faut-il à $6$ peintres ?",
          correction:
            "a) Non : avec DEUX fois plus de peintres, le travail ne peut pas prendre deux fois plus de temps. Il doit aller plus vite.\nb) Si c'était proportionnel, doubler le nombre de peintres doublerait le nombre de jours. Ici, c'est le contraire : ce n'est PAS proportionnel, et le produit en croix ne s'applique pas.\nc) Deux fois plus de peintres font le travail en deux fois moins de temps : $12 \\div 2 = 6$ jours.\n⭐ Contrôle : $3$ peintres pendant $12$ jours, c'est $3 \\times 12 = 36$ journées de travail ; $6$ peintres pendant $6$ jours, c'est aussi $6 \\times 6 = 36$.\n⛔ Le piège : lancer le produit en croix sans avoir vérifié que la situation est proportionnelle. Il donne toujours un nombre, même quand ce nombre n'a aucun sens.\nRéponse : ce n'est pas proportionnel ; $6$ peintres mettent $6$ jours.",
          schema: tableau(["Peintres", "3", "6"], ["Jours", "12", "6"]),
          micros: ["prop_reconnaitre", "prop_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles. Tu décides d'abord si c'est proportionnel, puis tu ranges les nombres dans un tableau.",
      rappel: [
        "Je repère les deux grandeurs, et je me demande : si l'une double, est-ce que l'autre double ?",
        "Je range les nombres dans un tableau, avec leurs unités, puis je cherche le coefficient. C'est souvent une grandeur « par » : des litres par millimètre, des mètres par seconde, des degrés par heure.",
        "Je contrôle l'ordre de grandeur de ma réponse avant de l'écrire.",
      ],
      exercices: [
        {
          titre: "La pluie sur le toit",
          enonce:
            "Un millimètre de pluie, c'est $1$ litre d'eau tombé sur chaque mètre carré. Un abri de jardin a un toit de $12$ m² ; toute l'eau qui tombe dessus coule dans une cuve.\na) Un orage donne $15$ mm de pluie. Combien de litres arrivent dans la cuve ?\nb) La cuve contient $300$ L. Combien de millimètres de pluie faut-il pour la remplir, en partant de vide ?\nc) À Paris, il tombe en moyenne environ $640$ mm de pluie par an. Combien de litres ce toit recueillerait-il en un an ?",
          correction:
            "Sur $12$ m², $1$ mm de pluie donne $12$ fois $1$ L, soit $12$ L. Le volume recueilli est proportionnel à la hauteur de pluie, de coefficient $12$.\na) $15 \\times 12 = 180$ : $180$ L arrivent dans la cuve.\nb) Je remonte du volume à la hauteur de pluie : je divise. $300 \\div 12 = 25$, soit $25$ mm de pluie.\nc) $640 \\times 12 = 7\\,680$ : environ $7\\,680$ L en un an.\n⭐ $7\\,680 \\div 300 = 25{,}6$ : le toit remplirait la cuve plus de $25$ fois dans l'année.\n⛔ Le piège : oublier la surface et répondre « $15$ L » au a). Les $15$ mm tombent sur CHAQUE mètre carré du toit.\nRéponse : $180$ L ; $25$ mm ; environ $7\\,680$ L par an.",
          schema: tableauCoef(["Pluie (mm)", "Eau (L)"], ["1", "15", "!25", "640"], ["12", "!180", "300", "!7 680"], "12"),
          micros: ["prop_probleme", "prop_coeff"],
        },
        {
          titre: "Compter les secondes pendant l'orage",
          enonce:
            "Le son se propage dans l'air à environ $340$ m par seconde. La lumière de l'éclair, elle, nous arrive presque instantanément. On compte donc les secondes entre l'éclair et le tonnerre.\na) Tu comptes $6$ s. À quelle distance la foudre est-elle tombée ?\nb) Une règle dit : « $3$ secondes par kilomètre ». Vérifie-la.\nc) La foudre tombe à $5{,}1$ km de toi. Combien de secondes vas-tu compter ?\nd) Pendant un orage, tu comptes d'abord $12$ s, puis $6$ s à l'éclair suivant. L'orage s'approche-t-il ? De combien de mètres ?",
          correction:
            "La distance est proportionnelle à la durée : chaque seconde, le son parcourt $340$ m. Le coefficient est $340$.\na) $6 \\times 340 = 2\\,040$ : la foudre est tombée à $2\\,040$ m, environ $2$ km.\nb) En $3$ s, le son parcourt $3 \\times 340 = 1\\,020$ m : environ $1$ km. La règle est bonne, à $20$ m près.\nc) $5{,}1$ km $= 5\\,100$ m. Je remonte de la distance à la durée : $5\\,100 \\div 340 = 15$, soit $15$ s.\nd) $12$ s : $12 \\times 340 = 4\\,080$ m. Puis $6$ s : $2\\,040$ m. L'orage s'approche, de $4\\,080 - 2\\,040 = 2\\,040$ m.\n⛔ Le piège : oublier de convertir au c), et calculer $5{,}1 \\div 340 = 0{,}015$ s. Quinze millièmes de seconde pour un orage à $5$ km : impossible.\nRéponse : $2\\,040$ m ; la règle est juste ; $15$ s ; l'orage s'est approché de $2\\,040$ m.",
          schema: tableauCoef(["Durée (s)", "Distance (m)"], ["1", "3", "6", "!15"], ["340", "!1 020", "!2 040", "5 100"], "340"),
          micros: ["prop_probleme", "prop_quatrieme", "prop_defi"],
        },
        {
          titre: "Degrés Celsius et degrés Fahrenheit",
          enonce:
            "Aux États-Unis, la température se mesure en degrés Fahrenheit (°F). Le tableau donne quelques correspondances exactes.\na) La température en °F est-elle proportionnelle à la température en °C ? Donne deux raisons.\nb) Un élève dit : « $20$ °C, c'est le double de $10$ °C, donc c'est le double de $50$ °F, $100$ °F ». Qu'en penses-tu ?\nc) On passe des °C aux °F en multipliant par $1{,}8$, puis en ajoutant $32$. Convertis $30$ °C.\nd) Retire $32$ à chaque valeur en °F. Ce qui reste est-il proportionnel à la température en °C ?",
          figure: tableau(["°C", "0", "10", "20", "100"], ["°F", "32", "50", "68", "212"]),
          correction:
            "a) Première raison : $0$ °C donne $32$ °F, pas $0$. Dans une situation de proportionnalité, $0$ donne toujours $0$.\nSeconde raison : $50 \\div 10 = 5$ mais $68 \\div 20 = 3{,}4$. Les quotients changent : ce n'est PAS proportionnel.\nb) Il a tort : $20$ °C font $68$ °F, pas $100$ °F. Doubler la température en °C ne la double pas en °F.\nc) $30 \\times 1{,}8 = 54$, puis $54 + 32 = 86$ : $30$ °C font $86$ °F.\nd) $50 - 32 = 18$ ; $68 - 32 = 36$ ; $212 - 32 = 180$. Et $18 \\div 10 = 1{,}8$ ; $36 \\div 20 = 1{,}8$ ; $180 \\div 100 = 1{,}8$. OUI : cette partie-là est proportionnelle, de coefficient $1{,}8$. C'est le « plus $32$ » qui casse la proportionnalité.\n⛔ Le piège : croire qu'une température deux fois plus grande est « deux fois plus chaude ». Le double en °C n'est même pas le double en °F.\nRéponse : non, ce n'est pas proportionnel ; $20$ °C font $68$ °F ; $30$ °C font $86$ °F ; l'écart au-dessus de $32$ °F, lui, est proportionnel.",
          schema: (
            <div className="space-y-3">
              {tableau(["°C", "10", "20", "100"], ["°F ÷ °C", "5", "3,4", "2,12"])}
              {tableauCoef(["°C", "°F − 32"], ["10", "20", "30", "100"], ["18", "36", "!54", "180"], "1,8")}
            </div>
          ),
          micros: ["prop_reconnaitre", "prop_defi"],
        },
        {
          titre: "Le tour de la Terre",
          enonce:
            "La Terre fait un tour complet sur elle-même, soit $360°$, en $24$ h, et elle tourne toujours à la même vitesse.\na) De combien de degrés tourne-t-elle en $1$ h ? en $6$ h ?\nb) Le monde est découpé en $24$ fuseaux horaires. Explique pourquoi chacun mesure $15°$ de large.\nc) Le Soleil passe au plus haut au-dessus de Greenwich, près de Londres. Pour une ville située $45°$ plus à l'ouest, il passera au plus haut combien d'heures plus tard ?\nd) Une élève écrit : « en $1$ minute, la Terre tourne de $360 \\div 24 = 15°$ ». Corrige-la.",
          correction:
            "L'angle est proportionnel à la durée : $360°$ en $24$ h.\na) En $1$ h : $360 \\div 24 = 15$, soit $15°$. En $6$ h : $6 \\times 15 = 90$, soit $90°$, un quart de tour.\nb) Les $24$ fuseaux se partagent les $360°$ du tour : $360 \\div 24 = 15$. Chacun couvre ce que la Terre tourne en $1$ h, $15°$.\nc) Je remonte de l'angle à la durée : $45 \\div 15 = 3$, soit $3$ h plus tard.\nd) $15°$, c'est en UNE HEURE. En $1$ minute, c'est $60$ fois moins : $15 \\div 60 = 0{,}25$, soit $0{,}25°$. Il faut donc $1 \\div 0{,}25 = 4$ minutes pour tourner de $1°$.\n⛔ Le piège : oublier l'unité du coefficient. « $15$ » ne veut rien dire seul : c'est $15°$ PAR HEURE.\nRéponse : $15°$ en $1$ h et $90°$ en $6$ h ; $3$ h plus tard ; $0{,}25°$ par minute.",
          schema: deux(
            tourDeTerre(6),
            tableauCoef(["Durée (h)", "Angle (°)"], ["1", "3", "6", "24"], ["!15", "!45", "!90", "360"], "15"),
          ),
          micros: ["prop_coeff", "prop_probleme", "prop_defi"],
        },
      ],
    },
  ],
};
