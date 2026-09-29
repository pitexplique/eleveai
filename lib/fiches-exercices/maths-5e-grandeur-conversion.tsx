// ─── Fiche d'exercices : convertir les grandeurs (5e) — 20 exercices corrigés ──
//
// Lot des feuilles de 5e (29/09/2026), sur le modèle de la feuille étalon
// `maths-5e-relatif-nombre.tsx` : aides de dessin locales, écrites EN CLAIR,
// relues par le script de recalcul.
//
// Alignée sur la fiche de cours `lib/fiches/maths-5e-conversions.tsx` et sur la
// banque `lib/tutor-v4/questionBank/5e/maths/conversions.bank.ts`, notionId
// grandeur_conversion : convertir une longueur, une masse, une contenance ;
// convertir une durée en heures et minutes ; convertir AVANT de comparer ou de
// calculer (l'erreur centrale de la fiche Éduscol citée par la banque) ;
// contrôler qu'un résultat converti est cohérent.
// ⛔ LIMITES DE LA 5e (celles de la banque) : km, m, cm, mm (et hm, dam, dm dans
// le tableau) ; kg, g (et la tonne, 1 t = 1 000 kg) ; L, dL, cL, mL ; h, min, s.
// Ni aires ni volumes (m², m³ : notions aire_surface et volume_solide), ni
// vitesse ni débit (grandeurs composées, 4e), ni durée écrite en heures
// décimales : une durée se dit en heures et minutes, comme dans la banque.
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni 0,75 L = 75 cL, ni la
// route de 3,5 km, ni le sac de riz de 2 400 g, ni le spectacle de 135 min, ni
// 2 h 45 = 165 min, ni 1 h 20 = 80 min, ni 0,5 L / 75 cL / 400 mL, ni le ruban
// de 1,2 m, ni 75 L = 7 500 cL, ni 1 h 50 + 20 min. Ni ceux de la banque (2 km
// = 200 m, le stylo de 14 m, le lait et le beurre, le marché à 3 km).
//
// Les pièges nommés : ajouter des zéros après la virgule (1), enlever la
// virgule sans compter les rangs (2), diviser par 100 au lieu de 1 000 (3), lire
// 1 h 35 comme 135 min (4, 14), écrire 2 h 85 min (5), compter les grandes
// graduations au lieu des millimètres (6), une unité qui donne un objet absurde
// (7), le seul « sens » qui ne suffit pas (8), comparer des nombres sans leur
// unité (9), additionner des kg et des g (10), soustraire des m et des cm (11),
// soustraire des horaires comme des décimaux (12, 17), laisser 125 s dans un
// temps (13), les unités mêlées dans une division (15, 16, 20), un nombre de
// paquets à virgule (18), des minutes au-delà de 60 dans un horaire (19).
//
// Faits réels : aucun. Tous les nombres (horaires de train, relais, trail,
// sortie scolaire, citronnade, bouteilles, gouttes) sont des MODÈLES, à l'ordre
// de grandeur réel ; les repères de l'exercice 7 sont des ordres de grandeur.
//
// ⭐ LES DESSINS (« n'oublie pas les canvas ») :
//   · `conversion` — le TABLEAU DE CONVERSION, repris de la feuille de 4e des
//     grandeurs composées : un chiffre par colonne, la colonne de départ en
//     bleu, la virgule orange posée dans la colonne d'arrivée. On y VOIT la
//     virgule se déplacer. ⛔ Seulement les colonnes utiles (4 à 6) : à 375 px,
//     la zone de dessin fait ~235 px et rien ne doit défiler ;
//   · `bande` — une bande à l'échelle, coupée en morceaux : les heures et les
//     minutes d'une durée, les morceaux d'une planche. Les horaires aux deux
//     bouts ; une étiquette trop large pour son morceau passe dessous ;
//   · `regle` — une règle graduée en millimètres, et des objets posés dessus ;
//   · `tableau` de figures.tsx (vertical sur téléphone), `table` (plusieurs
//     lignes, repris de l'étalon).
// SVG de viewBox 300, police 14, sans `min-w`. Le script vérifie que les
// étiquettes tiennent et ne se touchent pas. 13 dessins imprimés ; ceux qui
// redisent le corrigé sont `ecranSeulement` (PDF ≤ 12 pages).
//
// Les corrigés sont écrits à la première personne (« je regarde le sens »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-5e-grandeur-conversion.mjs`.
//
// Micro-compétences : conversion_decimal (1, 2, 3, 6, 8, 14, 18, 20),
// conversion_duree (4, 5, 12, 13, 14, 17, 19), conversion_avant_calcul (9, 10,
// 11, 15, 16, 17, 18, 20), conversion_coherence (7, 8, 14, 16, 17, 18, 20). 4/4.

import type { ReactNode } from "react";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { tableau } from "@/lib/fiches-exercices/figures";

const BLEU = "#2563eb";
const CYAN = "#0e7490";
const ORANGE = "#ea580c";
const NOIR = "#0f172a";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/**
 * LE TABLEAU DE CONVERSION (feuille de 4e des grandeurs composées). Une colonne
 * par unité, un chiffre par case (une case vide s'écrit ""). La colonne de
 * DÉPART est en bleu ; la virgule orange est posée après la colonne d'ARRIVÉE :
 * on lit le résultat tel quel.
 * ⭐ Le script relit les chiffres, lit le nombre dans l'unité de départ (celui
 * de l'énoncé) et dans l'unité d'arrivée (celui du corrigé).
 * ⛔ Six colonnes au plus : sept colonnes (km … mm) débordaient à 375 px.
 */
type LigneConversion = { cases: string[]; de: string; vers: string };
const conversion = (unites: string[], lignes: LigneConversion[]) => (
  <div className="mx-auto w-full max-w-[20rem]">
    <table className="mx-auto border-collapse text-sm">
      <thead>
        <tr>
          {unites.map((u) => (
            <th key={u} className="border border-slate-400 bg-slate-100 px-1.5 py-1 font-semibold text-slate-800">
              {u}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {lignes.map((li, i) => (
          <tr key={i}>
            {li.cases.map((c, j) => (
              <td key={j} className={`border border-slate-400 px-1.5 py-1 text-center font-mono text-slate-900 ${unites[j] === li.de ? "bg-blue-100" : ""}`}>
                <span>{c || " "}</span>
                {unites[j] === li.vers ? <span className="font-bold text-orange-600">,</span> : null}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    <p className="mt-1 text-center text-xs font-semibold text-slate-600">en bleu : l'unité de départ · virgule orange : l'unité d'arrivée</p>
  </div>
);

/**
 * UNE BANDE À L'ÉCHELLE : une durée coupée en heures et en minutes, une
 * planche coupée en morceaux. Chaque morceau a sa longueur VRAIE (`valeur`,
 * dans l'unité du dessin) et son étiquette, écrite dedans si elle y tient,
 * dessous sinon. Le total en haut ; les horaires ou repères (`bornes`, un par
 * frontière, "" pour rien) au-dessus des bouts.
 * ⚠️ Texte NU. ⭐ Le script vérifie que les étiquettes tiennent (8,8 par signe
 * en corps 14 gras) et ne se touchent pas.
 */
const bande = (total: string, morceaux: { valeur: number; label: string; couleur?: string }[], bornes: string[] = []) => {
  const x0 = 12;
  const larg = 276;
  const somme = morceaux.reduce((s, m) => s + m.valeur, 0);
  const u = larg / somme;
  const avecBornes = bornes.some((b) => b !== "");
  const yB = avecBornes ? 48 : 28;
  const debuts = morceaux.map((_, i) => x0 + morceaux.slice(0, i).reduce((s, m) => s + m.valeur, 0) * u);
  const dessous = morceaux.some((m) => m.label.length * 8.8 > m.valeur * u - 6);
  const H = yB + 34 + (dessous ? 26 : 0) + 6;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label={`Une bande de ${total} : ${morceaux.map((m) => m.label).join(", ")}.`}>
        <text x={150} y={16} textAnchor="middle" fontSize={14} fontWeight={700} fill={NOIR}>
          {`total : ${total}`}
        </text>
        {morceaux.map((m, i) => {
          const w = m.valeur * u;
          const cx = debuts[i] + w / 2;
          const dedans = m.label.length * 8.8 <= w - 6;
          const demi = (m.label.length * 8.8) / 2;
          const cxBas = Math.min(Math.max(cx, x0 + demi), x0 + larg - demi);
          const couleur = m.couleur ?? (i % 2 === 0 ? BLEU : CYAN);
          return (
            <g key={i}>
              <rect x={debuts[i]} y={yB} width={w} height={32} fill={couleur} stroke="#fff" strokeWidth={1.5} />
              {dedans ? (
                <text x={cx} y={yB + 21} textAnchor="middle" fontSize={14} fontWeight={700} fill="#fff">
                  {m.label}
                </text>
              ) : (
                <g>
                  <line x1={cx} y1={yB + 32} x2={cxBas} y2={yB + 40} stroke={couleur} strokeWidth={1.2} />
                  <text x={cxBas} y={yB + 54} textAnchor="middle" fontSize={14} fontWeight={700} fill={couleur}>
                    {m.label}
                  </text>
                </g>
              )}
            </g>
          );
        })}
        <rect x={x0} y={yB} width={larg} height={32} fill="none" stroke={NOIR} strokeWidth={1.5} />
        {bornes.map((b, i) =>
          b ? (
            <g key={`b${i}`}>
              <line x1={i === morceaux.length ? x0 + larg : debuts[i]} y1={yB - 6} x2={i === morceaux.length ? x0 + larg : debuts[i]} y2={yB} stroke={NOIR} strokeWidth={2} />
              <text
                x={i === morceaux.length ? x0 + larg : debuts[i]}
                y={yB - 10}
                textAnchor={i === 0 ? "start" : i === morceaux.length ? "end" : "middle"}
                fontSize={14}
                fontWeight={700}
                fill={ORANGE}
              >
                {b}
              </text>
            </g>
          ) : null,
        )}
      </svg>
    </div>
  );
};

/**
 * UNE RÈGLE GRADUÉE de 0 à `max` cm, une graduation par millimètre (plus
 * longue au demi-centimètre et au centimètre), un nombre par centimètre. Les
 * objets sont posés au-dessus, chacun sur sa ligne, de `de` à `a` (en cm), son
 * nom au-dessus, un pointillé à son bout pour lire la graduation.
 * ⛔ `max` ≤ 10 : onze nombres au plus, lisibles à 375 px.
 */
const regle = (max: number, objets: { de: number; a: number; label: string }[]) => {
  const x0 = 16;
  const u = 268 / max;
  const x = (v: number) => x0 + v * u;
  const yR = 26 + 28 * objets.length;
  const H = yR + 42;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label={`Une règle graduée de 0 à ${max} cm, avec ${objets.map((o) => o.label).join(" et ")}.`}>
        <rect x={x0 - 10} y={yR} width={268 + 20} height={36} rx={3} fill="#fef9c3" stroke="#a16207" strokeWidth={1.2} />
        {Array.from({ length: max * 10 + 1 }, (_, k) => (
          <line key={k} x1={x(k / 10)} y1={yR} x2={x(k / 10)} y2={yR + (k % 10 === 0 ? 14 : k % 5 === 0 ? 10 : 6)} stroke={NOIR} strokeWidth={k % 10 === 0 ? 1.4 : 0.8} />
        ))}
        {Array.from({ length: max + 1 }, (_, k) => (
          <text key={`n${k}`} x={x(k)} y={yR + 30} textAnchor="middle" fontSize={14} fontWeight={700} fill={NOIR}>
            {k}
          </text>
        ))}
        {objets.map((o, i) => {
          const y = yR - 18 - 28 * i;
          return (
            <g key={`o${i}`}>
              <rect x={x(o.de)} y={y} width={(o.a - o.de) * u} height={12} rx={3} fill={i === 0 ? ORANGE : BLEU} />
              <line x1={x(o.a)} y1={y + 12} x2={x(o.a)} y2={yR} stroke={i === 0 ? ORANGE : BLEU} strokeWidth={1} strokeDasharray="2 2" />
              <text x={x((o.de + o.a) / 2)} y={y - 4} textAnchor="middle" fontSize={14} fontWeight={700} fill={i === 0 ? ORANGE : BLEU}>
                {o.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/** Un tableau à plusieurs lignes (le `tableau()` commun n'en a qu'une). */
const table = (entete: string[], lignes: string[][]) => (
  <div className="mx-auto w-full max-w-[22rem] print:max-w-[15rem]">
    <CanvasRenderer figure={{ kind: "tableau_donnees", headers: entete, rows: lignes.map((values) => ({ values })), display: { compact: true, striped: true } }} />
  </div>
);

export const exercicesGrandeurConversion5e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "5e",
  notion: "grandeur-conversion",
  titre: "Convertir les grandeurs",
  accroche:
    "Vingt exercices, du geste seul au problème : convertir une longueur, une masse, une contenance, écrire une durée en heures et minutes, convertir avant de comparer ou de calculer, et vérifier qu'un résultat a du sens. Une règle graduée, un sac de randonnée, un train, un relais de natation, un trail, une citronnade, une sortie scolaire, des bouteilles en plastique. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé, et le tableau de conversion dessiné.",

  fichesCours: [{ href: "/fiches-cours/maths/5e/grandeur-conversion", titre: "Convertir les grandeurs" }],
  coachHref: "/coach-ia/maths?classe=5e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une conversion par question. Je regarde le sens avant de calculer.",
      rappel: [
        "Longueurs, masses, contenances : on passe d'une unité à sa voisine en multipliant ou en divisant par $10$. $1$ km $= 1\\,000$ m, $1$ m $= 100$ cm, $1$ kg $= 1\\,000$ g, $1$ L $= 100$ cL $= 1\\,000$ mL.",
        "Vers une unité plus PETITE, le nombre devient plus GRAND : je multiplie. Vers une unité plus grande, je divise.",
        "Les durées comptent en $60$ : $1$ h $= 60$ min et $1$ min $= 60$ s. Jamais $100$.",
      ],
      exercices: [
        {
          enonce: "Convertis.\na) $4{,}2$ km en m\nb) $356$ cm en m\nc) $7{,}5$ cm en mm\nd) $80$ mm en cm",
          correction:
            "Je regarde d'abord le sens : vers une unité plus petite, le nombre devient plus grand ; vers une plus grande, il devient plus petit.\na) $1$ km $= 1\\,000$ m. Du km au m, l'unité est plus petite : je multiplie par $1\\,000$. $4{,}2 \\times 1\\,000 = 4\\,200$ m.\nb) $1$ m $= 100$ cm. Du cm au m, l'unité est plus grande : je divise par $100$. $356 \\div 100 = 3{,}56$ m.\nc) $1$ cm $= 10$ mm : $7{,}5 \\times 10 = 75$ mm.\nd) $80 \\div 10 = 8$ cm.\n⛔ Le piège du a) : « ajouter trois zéros » et écrire $4{,}2000$. Ce nombre vaut toujours $4{,}2$. Multiplier par $1\\,000$, c'est déplacer la virgule de trois rangs : c'est ce que montre le tableau.\nRéponse : a) $4\\,200$ m ; b) $3{,}56$ m ; c) $75$ mm ; d) $8$ cm.",
          schema: (
            <div className="space-y-3">
              {ecranSeulement(conversion(["km", "hm", "dam", "m"], [{ cases: ["4", "2", "0", "0"], de: "km", vers: "m" }]))}
              {conversion(["m", "dm", "cm", "mm"], [
                { cases: ["3", "5", "6", ""], de: "cm", vers: "m" },
                { cases: ["", "", "7", "5"], de: "cm", vers: "mm" },
                { cases: ["", "", "8", "0"], de: "mm", vers: "cm" },
              ])}
            </div>
          ),
          micros: ["conversion_decimal"],
        },
        {
          enonce: "Convertis.\na) $3{,}05$ kg en g\nb) $650$ g en kg\nc) $2$ t en kg (une tonne vaut $1\\,000$ kg)\nd) $0{,}8$ t en kg",
          correction:
            "a) $1$ kg $= 1\\,000$ g : je multiplie par $1\\,000$. $3{,}05 \\times 1\\,000 = 3\\,050$ g.\nb) Du g au kg, l'unité est plus grande : je divise par $1\\,000$. $650 \\div 1\\,000 = 0{,}65$ kg.\nc) $2 \\times 1\\,000 = 2\\,000$ kg.\nd) $0{,}8 \\times 1\\,000 = 800$ kg.\n⛔ Le piège du a) : enlever la virgule et écrire $305$ g. Dans le tableau, le $3$ est dans la colonne des kg : il faut aller jusqu'à la colonne des g, trois rangs plus loin, donc un zéro de plus.\nRéponse : a) $3\\,050$ g ; b) $0{,}65$ kg ; c) $2\\,000$ kg ; d) $800$ kg.",
          schema: conversion(["kg", "hg", "dag", "g"], [
            { cases: ["3", "0", "5", "0"], de: "kg", vers: "g" },
            { cases: ["0", "6", "5", "0"], de: "g", vers: "kg" },
          ]),
          micros: ["conversion_decimal"],
        },
        {
          enonce: "Convertis.\na) $1{,}5$ L en cL\nb) $250$ mL en L\nc) $33$ cL en mL\nd) $4$ dL en L",
          correction:
            "a) $1$ L $= 100$ cL : $1{,}5 \\times 100 = 150$ cL.\nb) $1$ L $= 1\\,000$ mL. Du mL au L, je divise par $1\\,000$ : $250 \\div 1\\,000 = 0{,}25$ L.\nc) $1$ cL $= 10$ mL : $33 \\times 10 = 330$ mL.\nd) $1$ L $= 10$ dL : $4 \\div 10 = 0{,}4$ L.\n⛔ Le piège du b) : diviser par $100$ et écrire $2{,}5$ L. $2{,}5$ L, c'est plus que deux bouteilles d'un litre, alors que $250$ mL tiennent dans un verre. Entre le mL et le L, il y a trois rangs : dL, cL, mL.\nRéponse : a) $150$ cL ; b) $0{,}25$ L ; c) $330$ mL ; d) $0{,}4$ L.",
          schema: ecranSeulement(
            conversion(["L", "dL", "cL", "mL"], [
              { cases: ["1", "5", "0", ""], de: "L", vers: "cL" },
              { cases: ["0", "2", "5", "0"], de: "mL", vers: "L" },
              { cases: ["", "3", "3", "0"], de: "cL", vers: "mL" },
              { cases: ["0", "4", "", ""], de: "dL", vers: "L" },
            ]),
          ),
          micros: ["conversion_decimal"],
        },
        {
          enonce: "Convertis en minutes.\na) $3$ h\nb) $1$ h $35$ min\nc) $2$ h $05$ min\nd) une demi-heure",
          correction:
            "Une heure vaut $60$ minutes : je multiplie les heures par $60$, puis j'ajoute les minutes.\na) $3 \\times 60 = 180$ min.\nb) $60 + 35 = 95$ min.\nc) $2 \\times 60 = 120$, puis $120 + 5 = 125$ min.\nd) La moitié de $60$ : $30$ min.\n⛔ Le piège du b) : lire « $1$ h $35$ » comme $135$ min. Une heure ne vaut pas $100$ minutes : elle en vaut $60$.\nRéponse : a) $180$ min ; b) $95$ min ; c) $125$ min ; d) $30$ min.",
          schema: ecranSeulement(bande("95 min", [{ valeur: 60, label: "1 h = 60 min" }, { valeur: 35, label: "35 min" }])),
          micros: ["conversion_duree"],
        },
        {
          enonce: "Écris chaque durée en heures et minutes.\na) Un film de $110$ min.\nb) Un trajet de $200$ min.\nc) Une randonnée de $285$ min.",
          correction:
            "Je cherche combien de fois $60$ minutes tiennent dans la durée : ce sont les heures. Ce qui reste, ce sont les minutes.\na) $110 = 60 + 50$ : $1$ h $50$ min.\nb) $3 \\times 60 = 180$, et $200 - 180 = 20$ : $3$ h $20$ min.\nc) $4 \\times 60 = 240$, et $285 - 240 = 45$ : $4$ h $45$ min.\n⛔ Le piège du c) : écrire $2$ h $85$ min, ou $2{,}85$ h. Les minutes s'arrêtent à $59$ : dès qu'il y en a $60$, cela fait une heure de plus.\nRéponse : a) $1$ h $50$ min ; b) $3$ h $20$ min ; c) $4$ h $45$ min.",
          schema: bande("285 min = 4 h 45 min", [
            { valeur: 60, label: "1 h" },
            { valeur: 60, label: "1 h" },
            { valeur: 60, label: "1 h" },
            { valeur: 60, label: "1 h" },
            { valeur: 45, label: "45 min", couleur: ORANGE },
          ]),
          micros: ["conversion_duree"],
        },
        {
          enonce: "Sur cette règle graduée en centimètres, on a posé une clé et une gomme, au ras du zéro.\na) Lis la longueur de chacune, en centimètres.\nb) Écris ces deux longueurs en millimètres.\nc) Quelle est la différence de longueur entre la clé et la gomme, en mm puis en cm ?",
          figure: regle(7, [
            { de: 0, a: 6.3, label: "clé" },
            { de: 0, a: 3.8, label: "gomme" },
          ]),
          correction:
            "Entre deux nombres de la règle, il y a $10$ petites graduations : chacune vaut $1$ mm, soit $0{,}1$ cm.\na) La clé s'arrête $3$ petites graduations après le $6$ : elle mesure $6{,}3$ cm. La gomme s'arrête $8$ petites graduations après le $3$ : $3{,}8$ cm.\nb) $1$ cm $= 10$ mm : $6{,}3 \\times 10 = 63$ mm et $3{,}8 \\times 10 = 38$ mm.\nc) En mm : $63 - 38 = 25$ mm. En cm : $25 \\div 10 = 2{,}5$ cm.\n⭐ Contrôle en cm : $6{,}3 - 3{,}8 = 2{,}5$ cm.\n⛔ Le piège du a) : compter seulement les grands traits et répondre « un peu plus de $6$ cm ». Les petits traits sont là pour être comptés : chacun vaut un millimètre.\nRéponse : a) $6{,}3$ cm et $3{,}8$ cm ; b) $63$ mm et $38$ mm ; c) $25$ mm, soit $2{,}5$ cm.",
          micros: ["conversion_decimal"],
        },
        {
          enonce: "Choisis l'unité qui convient, parmi : mg, g, kg, mL, L, cm, m, km.\na) Un crayon neuf mesure environ $17$ …\nb) Une baignoire pleine contient environ $200$ …\nc) Une fourmi pèse environ $3$ …\nd) Un marathon mesure environ $42$ …\ne) Une cuillère à café contient environ $5$ …",
          correction:
            "J'essaie chaque unité dans ma tête et je garde celle qui donne un objet que je reconnais.\na) $17$ m, c'est la hauteur d'un immeuble ; $17$ cm, c'est bien un crayon. Réponse : cm.\nb) $200$ mL, c'est un verre ; $200$ L, c'est une baignoire. Réponse : L.\nc) $3$ g, c'est un morceau de sucre, bien trop lourd pour une fourmi. Réponse : mg.\nd) $42$ m, c'est la longueur d'une piscine et demie ; $42$ km, c'est une course de plusieurs heures. Réponse : km.\ne) $5$ L, c'est un bidon ; $5$ mL tiennent dans une cuillère. Réponse : mL.\n⛔ Le piège : répondre au hasard parce que « le nombre est juste ». Un nombre sans la bonne unité ne veut rien dire.\nRéponse : a) cm ; b) L ; c) mg ; d) km ; e) mL.",
          schema: ecranSeulement(
            table(["Repère", "environ"], [
              ["largeur d'un ongle", "1 cm"],
              ["une grande enjambée", "1 m"],
              ["un trombone", "1 g"],
              ["une brique de lait", "1 L"],
            ]),
          ),
          micros: ["conversion_coherence"],
        },
        {
          enonce: "Sans poser de calcul, dis si chaque égalité est vraie ou fausse. Corrige celles qui sont fausses.\na) $5$ km $= 500$ m\nb) $0{,}3$ kg $= 300$ g\nc) $45$ cL $= 4{,}5$ L\nd) $2$ h $= 120$ min",
          correction:
            "Je compare avec une unité que je connais bien.\na) $1$ km, c'est déjà $1\\,000$ m. Donc $5$ km, c'est bien plus que $500$ m : FAUX. La bonne égalité : $5$ km $= 5\\,000$ m.\nb) $0{,}3$ kg, c'est moins que $1$ kg $= 1\\,000$ g, et $300$ g aussi : VRAI, puisque $0{,}3 \\times 1\\,000 = 300$.\nc) $4{,}5$ L, c'est plus que $1$ L $= 100$ cL. Or $45$ cL, c'est moins qu'un litre : FAUX. La bonne égalité : $45$ cL $= 0{,}45$ L.\nd) $2 \\times 60 = 120$ : VRAI.\n⛔ Le piège : regarder seulement si le nombre grandit ou diminue. Au a), $500$ est bien plus grand que $5$, et pourtant c'est faux : il faut aussi le bon nombre de rangs.\nRéponse : a) faux, $5\\,000$ m ; b) vrai ; c) faux, $0{,}45$ L ; d) vrai.",
          schema: conversion(["km", "hm", "dam", "m"], [{ cases: ["5", "0", "0", "0"], de: "km", vers: "m" }]),
          micros: ["conversion_coherence", "conversion_decimal"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs questions sur une même situation. Je mets tout dans la même unité avant de comparer ou de calculer.",
      rappel: [
        "On ne compare et on n'additionne que des grandeurs écrites dans la MÊME unité. Je choisis l'unité, je convertis, puis je calcule.",
        "Pour une durée entre deux horaires, j'avance par étapes : jusqu'à l'heure pile, puis les heures, puis les minutes qui restent.",
        "À la fin, je relis : le résultat est-il possible pour un vrai objet ?",
      ],
      exercices: [
        {
          enonce: "Voici quatre masses : $1{,}2$ kg ; $950$ g ; $1\\,050$ g ; $0{,}99$ kg.\na) Range-les dans l'ordre croissant.\nb) Quel écart y a-t-il entre la plus lourde et la plus légère, en grammes ?",
          correction:
            "a) Je mets tout en grammes : $1$ kg $= 1\\,000$ g.\n$1{,}2$ kg $= 1\\,200$ g et $0{,}99$ kg $= 990$ g. Les deux autres sont déjà en grammes.\n$950 < 990 < 1\\,050 < 1\\,200$.\nb) $1\\,200 - 950 = 250$ g.\n⛔ Le piège : comparer les nombres sans leurs unités, et croire que $0{,}99$ est la plus petite masse parce que $0{,}99 < 950$. Des kilogrammes et des grammes ne se comparent qu'une fois convertis.\nRéponse : a) $950$ g $< 0{,}99$ kg $< 1\\,050$ g $< 1{,}2$ kg ; b) $250$ g.",
          schema: tableau(["Masse", "1,2 kg", "950 g", "1 050 g", "0,99 kg"], ["en g", "1 200", "950", "1 050", "990"], true),
          micros: ["conversion_avant_calcul"],
        },
        {
          enonce: "Amir prépare son sac de randonnée. Il y met une gourde pleine de $1{,}2$ kg, un pique-nique de $850$ g, une polaire de $400$ g et une trousse de secours de $0{,}25$ kg. Le sac vide pèse $1{,}1$ kg.\na) Quelle est la masse du sac rempli, en grammes, puis en kilogrammes ?\nb) Pour un enfant, on conseille un sac de $4$ kg au plus (un modèle). Le sac d'Amir respecte-t-il ce conseil ?",
          correction:
            "a) Je mets tout en grammes : $1{,}2$ kg $= 1\\,200$ g ; $0{,}25$ kg $= 250$ g ; $1{,}1$ kg $= 1\\,100$ g.\n$1\\,200 + 850 + 400 + 250 + 1\\,100 = 3\\,800$ g.\nEn kilogrammes : $3\\,800 \\div 1\\,000 = 3{,}8$ kg.\nb) $3{,}8 < 4$ : le sac respecte le conseil, avec $200$ g de marge.\n⛔ Le piège : additionner les nombres tels quels, $1{,}2 + 850 + 400 + 0{,}25 + 1{,}1$. On mélangerait des kilogrammes et des grammes : le total ne voudrait rien dire.\nRéponse : a) $3\\,800$ g, soit $3{,}8$ kg ; b) oui.",
          schema: ecranSeulement(
            table(["Objet", "en g"], [
              ["gourde", "1 200"],
              ["pique-nique", "850"],
              ["polaire", "400"],
              ["trousse", "250"],
              ["sac vide", "1 100"],
              ["total", "3 800"],
            ]),
          ),
          micros: ["conversion_avant_calcul"],
        },
        {
          enonce: "Dans une planche de $2{,}4$ m, un menuisier coupe $3$ morceaux de $65$ cm.\na) Quelle longueur de planche reste-t-il, en cm puis en m ?\nb) Peut-il couper un quatrième morceau de $65$ cm ?",
          correction:
            "a) Je mets tout en centimètres : $2{,}4$ m $= 240$ cm.\nLes trois morceaux : $3 \\times 65 = 195$ cm.\nIl reste $240 - 195 = 45$ cm, soit $0{,}45$ m.\nb) $45 < 65$ : il ne reste pas assez de bois pour un quatrième morceau.\n⛔ Le piège : calculer $2{,}4 - 195$. On ne soustrait pas des centimètres à des mètres : je convertis d'abord.\nRéponse : a) $45$ cm, soit $0{,}45$ m ; b) non.",
          schema: bande("2,4 m = 240 cm", [
            { valeur: 65, label: "65 cm" },
            { valeur: 65, label: "65 cm" },
            { valeur: 65, label: "65 cm" },
            { valeur: 45, label: "45 cm", couleur: ORANGE },
          ]),
          micros: ["conversion_avant_calcul"],
        },
        {
          enonce: "Un train part de Lyon à $9$ h $47$ et arrive à Marseille à $12$ h $15$ (horaires modèles).\na) Combien de temps dure le trajet, en heures et minutes ?\nb) Écris cette durée en minutes.",
          correction:
            "a) J'avance par étapes, comme sur une frise.\nDe $9$ h $47$ à $10$ h : $13$ min.\nDe $10$ h à $12$ h : $2$ h.\nDe $12$ h à $12$ h $15$ : $15$ min.\nEn tout : $2$ h et $13 + 15 = 28$ min, soit $2$ h $28$ min.\nb) $2 \\times 60 = 120$, puis $120 + 28 = 148$ min.\n⛔ Le piège : poser $12{,}15 - 9{,}47 = 2{,}68$ et répondre « $2$ h $68$ min ». Un horaire n'est pas un nombre décimal : une heure a $60$ minutes, pas $100$.\nRéponse : a) $2$ h $28$ min ; b) $148$ min.",
          schema: bande("2 h 28 min", [
            { valeur: 13, label: "13 min" },
            { valeur: 120, label: "2 h" },
            { valeur: 15, label: "15 min" },
          ], ["9 h 47", "", "", "12 h 15"]),
          micros: ["conversion_duree"],
        },
        {
          enonce: "Dans un relais $4 \\times 100$ m nage libre, les quatre nageurs d'un club réalisent : $1$ min $52$ s ; $2$ min $05$ s ; $1$ min $58$ s ; $2$ min $10$ s.\na) Quel est le temps total du relais, en minutes et secondes ?\nb) Écris ce temps en secondes.",
          correction:
            "a) J'additionne les minutes, puis les secondes.\nMinutes : $1 + 2 + 1 + 2 = 6$ min. Secondes : $52 + 5 + 58 + 10 = 125$ s.\n$125$ s, c'est plus d'une minute : $125 = 2 \\times 60 + 5$, soit $2$ min $5$ s.\nEn tout : $6$ min $+ 2$ min $5$ s $= 8$ min $5$ s.\nb) $8 \\times 60 = 480$, puis $480 + 5 = 485$ s.\n⭐ Contrôle nageur par nageur : $112 + 125 + 118 + 130 = 485$ s.\n⛔ Le piège : laisser « $6$ min $125$ s ». Comme les minutes dans une heure, les secondes s'arrêtent à $59$.\nRéponse : a) $8$ min $5$ s ; b) $485$ s.",
          schema: ecranSeulement(
            table(["Nageur", "Temps", "en s"], [
              ["1", "1 min 52 s", "112"],
              ["2", "2 min 05 s", "125"],
              ["3", "1 min 58 s", "118"],
              ["4", "2 min 10 s", "130"],
              ["total", "8 min 05 s", "485"],
            ]),
          ),
          micros: ["conversion_duree"],
        },
        {
          enonce: "Léo a écrit quatre égalités, toutes fausses. Pour chacune, explique pourquoi elle ne peut pas être juste, puis corrige-la.\na) $2{,}5$ m $= 25$ cm\nb) $1$ h $30$ min $= 130$ min\nc) $600$ g $= 6$ kg\nd) $12$ mL $= 1{,}2$ L",
          correction:
            "a) $2{,}5$ m, c'est plus que $1$ m $= 100$ cm ; $25$ cm, c'est moins. Impossible. $2{,}5 \\times 100 = 250$ : $2{,}5$ m $= 250$ cm.\nb) Une heure ne vaut pas $100$ minutes. $60 + 30 = 90$ : $1$ h $30$ min $= 90$ min.\nc) $600$ g, c'est moins que $1$ kg ; $6$ kg, c'est plus. Impossible. $600 \\div 1\\,000 = 0{,}6$ : $600$ g $= 0{,}6$ kg.\nd) $12$ mL tiennent dans une cuillère, $1{,}2$ L remplissent une bouteille. $12 \\div 1\\,000 = 0{,}012$ : $12$ mL $= 0{,}012$ L.\n⭐ Le réflexe : avant de calculer, je me demande si le résultat doit être plus grand ou plus petit que $1$ de la nouvelle unité.\n⛔ Le piège de Léo, à chaque fois : un seul rang de virgule, ou $100$ minutes dans une heure.\nRéponse : a) $250$ cm ; b) $90$ min ; c) $0{,}6$ kg ; d) $0{,}012$ L.",
          schema: ecranSeulement(
            table(["Léo écrit", "Correction"], [
              ["2,5 m = 25 cm", "250 cm"],
              ["1 h 30 min = 130 min", "90 min"],
              ["600 g = 6 kg", "0,6 kg"],
              ["12 mL = 1,2 L", "0,012 L"],
            ]),
          ),
          micros: ["conversion_coherence", "conversion_decimal", "conversion_duree"],
        },
        {
          enonce: "Chloé remplit un aquarium de $54$ L.\na) Avec une carafe de $1{,}5$ L, combien de carafes doit-elle verser ?\nb) Avec un verre de $25$ cL, combien de verres faudrait-il ?\nc) Avec une bouteille de $750$ mL, combien de bouteilles ?",
          correction:
            "a) La carafe et l'aquarium sont en litres : $54 \\div 1{,}5 = 36$ carafes.\nb) Le verre est en cL : je mets l'aquarium en cL. $54$ L $= 5\\,400$ cL, et $5\\,400 \\div 25 = 216$ verres.\nc) La bouteille est en mL : $54$ L $= 54\\,000$ mL, et $54\\,000 \\div 750 = 72$ bouteilles.\n⭐ Contrôle : une bouteille de $750$ mL, c'est la moitié d'une carafe de $1{,}5$ L. Il en faut deux fois plus : $2 \\times 36 = 72$.\n⛔ Le piège du b) : calculer $54 \\div 25$ et trouver à peine plus de $2$ verres pour tout un aquarium. Je divise des cL par des cL.\nRéponse : a) $36$ carafes ; b) $216$ verres ; c) $72$ bouteilles.",
          schema: conversion(["hL", "daL", "L", "dL", "cL", "mL"], [
            { cases: ["", "5", "4", "0", "0", ""], de: "L", vers: "cL" },
            { cases: ["", "5", "4", "0", "0", "0"], de: "L", vers: "mL" },
          ]),
          micros: ["conversion_avant_calcul"],
        },
        {
          enonce: "Un compte-gouttes délivre des gouttes de $0{,}05$ mL (un modèle).\na) Combien de gouttes faut-il pour $1$ mL ?\nb) Pour $1$ cL ?\nc) Pour $1$ L ?\nd) Hugo affirme : « $1$ L d'eau, c'est à peu près $20$ gouttes ». Qu'en penses-tu ?",
          correction:
            "a) $1 \\div 0{,}05 = 20$ : il faut $20$ gouttes pour $1$ mL.\nb) $1$ cL $= 10$ mL : $10 \\times 20 = 200$ gouttes.\nc) $1$ L $= 1\\,000$ mL : $1\\,000 \\times 20 = 20\\,000$ gouttes.\nd) Hugo se trompe : $20$ gouttes font seulement $1$ mL, une toute petite cuillère. Il a oublié de convertir le litre en millilitres.\n⛔ Le piège : faire le calcul du a) et l'appliquer au litre sans conversion. Une bouteille d'un litre ne se vide pas en $20$ gouttes.\nRéponse : a) $20$ ; b) $200$ ; c) $20\\,000$ gouttes ; d) Hugo a tort, $20$ gouttes font $1$ mL.",
          schema: ecranSeulement(conversion(["L", "dL", "cL", "mL"], [{ cases: ["1", "0", "0", "0"], de: "L", vers: "mL" }])),
          micros: ["conversion_avant_calcul", "conversion_coherence"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions qui s'enchaînent. Je choisis mon unité, je convertis, et je réponds par une phrase avec l'unité.",
      rappel: [
        "Je repère toutes les unités de l'énoncé, puis je choisis celle du calcul.",
        "Une durée : heures et minutes, jamais de virgule. Un horaire plus une durée : j'ajoute les minutes, et $60$ minutes font une heure de plus.",
        "Je relis ma réponse avec son unité : est-elle possible ?",
      ],
      exercices: [
        {
          titre: "Le trail",
          enonce: "Un trail compte trois étapes : $12{,}5$ km, puis $8\\,400$ m, puis $9{,}1$ km. Nora part à $7$ h $45$ et arrive à $11$ h $20$.\na) Quelle est la longueur totale du trail, en km ?\nb) Combien de temps a duré sa course, en heures et minutes, puis en minutes ?\nc) À chacun des $2$ ravitaillements, elle boit $3$ gobelets de $20$ cL. Quelle quantité d'eau a-t-elle bue, en L ?\nd) Le soir, sa montre affiche « $30\\,000$ » pour la distance. Dans quelle unité ? Est-ce cohérent ?",
          correction:
            "a) Je mets tout en km : $8\\,400$ m $= 8{,}4$ km. Puis $12{,}5 + 8{,}4 + 9{,}1 = 30$ km.\nb) De $7$ h $45$ à $8$ h : $15$ min. De $8$ h à $11$ h : $3$ h. De $11$ h à $11$ h $20$ : $20$ min.\nEn tout : $3$ h et $15 + 20 = 35$ min, soit $3$ h $35$ min. En minutes : $3 \\times 60 + 35 = 215$ min.\nc) $2 \\times 3 = 6$ gobelets, et $6 \\times 20 = 120$ cL. Or $1$ L $= 100$ cL : $120$ cL $= 1{,}2$ L.\nd) $30$ km $= 30\\,000$ m : la montre compte en mètres, et c'est cohérent avec le a).\n⛔ Le piège du b) : poser $11{,}20 - 7{,}45 = 3{,}75$ et répondre « $3$ h $75$ min ». Un horaire se calcule par étapes, en passant par l'heure pile.\nRéponse : a) $30$ km ; b) $3$ h $35$ min, soit $215$ min ; c) $1{,}2$ L ; d) des mètres, c'est cohérent.",
          schema: bande("3 h 35 min", [
            { valeur: 15, label: "15 min" },
            { valeur: 180, label: "3 h" },
            { valeur: 20, label: "20 min" },
          ], ["7 h 45", "", "", "11 h 20"]),
          micros: ["conversion_avant_calcul", "conversion_duree", "conversion_coherence"],
        },
        {
          titre: "La citronnade de la fête",
          enonce: "Pour la fête de l'école, on prépare une citronnade pour $20$ personnes : $3$ L d'eau, $45$ cL de jus de citron et $600$ g de sucre.\na) Quel volume de liquide obtient-on, en cL, puis en L ?\nb) On la sert dans des verres de $15$ cL. Combien de verres peut-on remplir ?\nc) Pour $50$ personnes, il faut $2{,}5$ fois plus de sucre. Le sucre se vend en paquets de $1$ kg. Combien de paquets faut-il acheter ?\nd) Lou affirme : « $3{,}45$ L, c'est $34{,}5$ cL ». Explique son erreur.",
          correction:
            "a) Je mets tout en cL : $3$ L $= 300$ cL. Puis $300 + 45 = 345$ cL, soit $3{,}45$ L.\nb) $345 \\div 15 = 23$ : on remplit $23$ verres.\nc) $600 \\times 2{,}5 = 1\\,500$ g, soit $1{,}5$ kg. On ne vend pas de demi-paquet : il faut acheter $2$ paquets.\nd) $3{,}45$ L, c'est plus que $1$ L $= 100$ cL. Or $34{,}5$ cL, c'est moins qu'un litre : impossible. Lou a multiplié par $10$ au lieu de $100$ : $3{,}45 \\times 100 = 345$ cL.\n⛔ Le piège du c) : répondre « $1{,}5$ paquet ». Un nombre de paquets se compte en entiers, et il faut avoir ASSEZ de sucre : j'arrondis au-dessus.\nRéponse : a) $345$ cL, soit $3{,}45$ L ; b) $23$ verres ; c) $2$ paquets ; d) $3{,}45$ L $= 345$ cL.",
          schema: table(["Ingrédient", "en cL"], [
            ["eau : 3 L", "300"],
            ["citron : 45 cL", "45"],
            ["total", "345"],
          ]),
          micros: ["conversion_avant_calcul", "conversion_decimal", "conversion_coherence"],
        },
        {
          titre: "La sortie au musée",
          enonce: "Une classe part en sortie à $8$ h $15$. Le trajet en car dure $1$ h $40$ min, la visite du musée $2$ h $30$ min, le pique-nique $50$ min et le retour $1$ h $40$ min.\na) À quelle heure commence la visite ? À quelle heure finit-elle ?\nb) À quelle heure la classe rentre-t-elle ?\nc) Combien de temps dure la sortie, en heures et minutes, puis en minutes ?\nd) Les parents attendent à $15$ h $30$. La classe est-elle à l'heure ?",
          correction:
            "a) $8$ h $15 + 1$ h $40$ : j'ajoute les heures, puis les minutes. $9$ h et $15 + 40 = 55$ min : la visite commence à $9$ h $55$.\n$9$ h $55 + 2$ h $30$ : $11$ h et $55 + 30 = 85$ min. Or $85$ min $= 1$ h $25$ min : la visite finit à $12$ h $25$.\nb) Pique-nique : $12$ h $25 + 50$ min $= 12$ h $75$ min $= 13$ h $15$. Retour : $13$ h $15 + 1$ h $40 = 14$ h $55$.\nc) $100 + 150 + 50 + 100 = 400$ min, et $400 = 6 \\times 60 + 40$ : $6$ h $40$ min.\n⭐ Contrôle : de $8$ h $15$ à $14$ h $55$, il y a bien $6$ h $40$ min.\nd) $14$ h $55$, c'est avant $15$ h $30$ : la classe arrive $35$ min en avance.\n⛔ Le piège : écrire « $11$ h $85$ ». Dès qu'on dépasse $59$ minutes, on ajoute une heure.\nRéponse : a) de $9$ h $55$ à $12$ h $25$ ; b) $14$ h $55$ ; c) $6$ h $40$ min, soit $400$ min ; d) oui, $35$ min en avance.",
          schema: bande("6 h 40 min", [
            { valeur: 100, label: "1 h 40" },
            { valeur: 150, label: "2 h 30" },
            { valeur: 50, label: "50 min" },
            { valeur: 100, label: "1 h 40" },
          ], ["8 h 15", "", "", "", "14 h 55"]),
          micros: ["conversion_duree"],
        },
        {
          titre: "Les bouteilles en plastique",
          enonce: "Léa boit $1{,}5$ L d'eau par jour.\na) Si elle boit des bouteilles de $50$ cL, combien en vide-t-elle par jour ? Et en un an de $365$ jours ?\nb) Une bouteille vide pèse $12$ g (un modèle). Quelle masse de plastique cela fait-il en un an, en kg ?\nc) Elle achète une gourde de $750$ mL. Combien de fois la remplit-elle chaque jour ?\nd) Son frère dit : « Ce plastique pèse $13$ g par an ». Est-ce possible ?",
          correction:
            "a) Je mets tout en cL : $1{,}5$ L $= 150$ cL. Puis $150 \\div 50 = 3$ bouteilles par jour.\nEn un an : $3 \\times 365 = 1\\,095$ bouteilles.\nb) $1\\,095 \\times 12 = 13\\,140$ g. En kg : $13\\,140 \\div 1\\,000 = 13{,}14$ kg.\nc) $1{,}5$ L $= 1\\,500$ mL, et $1\\,500 \\div 750 = 2$ : elle remplit sa gourde $2$ fois par jour.\nd) Non : une seule bouteille pèse déjà $12$ g. Son frère a confondu les grammes et les kilogrammes : c'est environ $13$ kg.\n⭐ Plus de $13$ kg de plastique par an pour une seule personne : la gourde les évite presque tous.\n⛔ Le piège du c) : diviser $1{,}5$ par $750$. Les litres et les millilitres ne se divisent qu'une fois dans la même unité.\nRéponse : a) $3$ par jour, $1\\,095$ par an ; b) $13{,}14$ kg ; c) $2$ fois ; d) non, c'est environ $13$ kg.",
          schema: table(["Contenance", "en mL"], [
            ["à boire : 1,5 L", "1 500"],
            ["bouteille : 50 cL", "500"],
            ["gourde : 750 mL", "750"],
          ]),
          micros: ["conversion_avant_calcul", "conversion_decimal", "conversion_coherence"],
        },
      ],
    },
  ],
};
