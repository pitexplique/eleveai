// ─── Fiche d'exercices : les débuts de l'algèbre (CM2) — 20 exercices corrigés ─
//
// 10/11/2026 : feuille INTERACTIVE (réponses vérifiées sans IA), sur la forme
// des feuilles 6e (`maths-6e-algebre-probleme.tsx`) et des feuilles CM2
// (`maths-cm2-fraction.tsx`) : 8 ★, 7 ★★, 5 ★★★, un rappel avant chaque niveau,
// corrigés à la première personne, étape par étape.
//
// Alignée sur la carte mentale remplie (`lib/cartes/remplies/cm2.json`,
// cm2/algebre) et la banque du coach (`questionBank/cm2/maths/algebre.bank.ts`) :
// le signe = « vaut autant que », compléter une égalité, l'opération inverse,
// le schéma en barres, les motifs qui grandissent, l'étape lointaine, la règle
// entre deux quantités, les défis (défaire les calculs en partant de la fin).
// ⛔ CM2 : AUCUNE question ouverte. QCM (A, B, C), vrai/faux, < = >, nombres.
// ⛔ Aucun exemple de la carte mentale n'est repris (8 + 4 = 10 + 2, les
// billes de Théo et Zoé, les allumettes 4, 7, 10, les vélos, × 3 puis + 5).
//
// Les pièges nommés : lire = comme « le résultat » (1, 2, 9), faire la même
// opération au lieu de l'inverse (3, 10), additionner au lieu de soustraire
// sur le schéma (4), croire qu'une suite ajoute toujours (6), une règle vraie
// pour une seule case (7, 14), oublier une part du schéma (11, 17), partager
// sans enlever l'écart (12), compter un saut de trop (13, 18, 19), enlever des
// deux côtés d'un seul plateau (15), défaire dans le mauvais ordre (16), le
// prix d'un fruit pris pour le prix du lot (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : course de relais (11), musique (12,
// ukulélé), boulangerie (10), restaurant (14), cuisine (15), magie (16), cartes
// de football (17), jardin (18), robotique (19), marché (20). Les métiers :
// boulangère (10), serveur (14), paysagiste (18), ingénieure (19). Tout est un
// MODÈLE : aucun fait réel à sourcer.
//
// ⭐ LES DESSINS (SVG de viewBox 300, police 14, sans `min-w`) : le schéma en
// barres (4, 11, 12, 17), la croix qui grandit (5), les triangles d'allumettes
// (13), le bassin et ses dalles (18), la balance (15), des tableaux (7, 14, 19).
//
// Micro-compétences : algebre_egalite (1, 8, 15), algebre_completer_egalite
// (2, 9), algebre_nombre_inconnu (3, 10, 16), algebre_schema_barre (4, 11, 12,
// 17), algebre_motif (5, 6, 13), algebre_motif_rang (13, 18), algebre_relation
// (7, 14, 19), algebre_defi (15, 16, 17, 18, 19, 20). 8/8.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

const BLEU = "#2563eb";
const ORANGE = "#ea580c";
const ENCRE = "#0f172a";
const GRIS = "#94a3b8";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/**
 * UN TABLEAU en SVG : la première colonne porte les titres (sur fond gris), les
 * autres les nombres. Une case « ? » est écrite en rouge. 300 de large, police 14.
 */
const grille = (lignes: string[][]) => {
  const n = lignes[0].length;
  const c0 = Math.max(...lignes.map((l) => l[0].length)) * 8.4 + 16;
  const w = (296 - c0) / (n - 1);
  const H = lignes.length * 32 + 4;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[15rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label={`Un tableau : ${lignes.map((l) => l.join(", ")).join(" ; ")}.`}>
        {lignes.map((l, i) =>
          l.map((c, j) => {
            const x = j === 0 ? 2 : 2 + c0 + (j - 1) * w;
            const larg = j === 0 ? c0 : w;
            return (
              <g key={`${i}-${j}`}>
                <rect x={x} y={2 + i * 32} width={larg} height={32} fill={j === 0 ? "#f1f5f9" : "#ffffff"} stroke={GRIS} strokeWidth={1} />
                <text x={x + larg / 2} y={2 + i * 32 + 21} textAnchor="middle" fontSize={14} fontWeight={j === 0 || c === "?" ? 700 : 400} fill={c === "?" ? "#dc2626" : ENCRE}>
                  {c}
                </text>
              </g>
            );
          }),
        )}
      </svg>
    </div>
  );
};

/**
 * LE SCHÉMA EN BARRES : une barre par personne (son nom à gauche), faite de
 * parts posées bout à bout (`l` = longueur dessinée, `txt` écrit dedans). À
 * droite, une accolade et le total.
 */
const schema = (rangs: { nom: string; parts: { l: number; txt: string; c?: string }[] }[], total: string) => {
  const X0 = 64;
  const H = rangs.length * 46 + 6;
  const fin = Math.max(...rangs.map((r) => X0 + r.parts.reduce((s, p) => s + p.l, 0)));
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[15rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label={`Un schéma en barres : ${rangs.map((r) => `${r.nom}, ${r.parts.map((p) => p.txt).join(" + ")}`).join(" ; ")} ; en tout ${total}.`}>
        {rangs.map((r, i) => {
          const y = 8 + i * 46;
          let x = X0;
          return (
            <g key={i}>
              <text x={4} y={y + 22} fontSize={14} fontWeight={700} fill={ENCRE}>
                {r.nom}
              </text>
              {r.parts.map((p, k) => {
                const x0 = x;
                x += p.l;
                return (
                  <g key={k}>
                    <rect x={x0} y={y} width={p.l} height={32} fill={p.c ?? (i % 2 === 0 ? "#dbeafe" : "#fed7aa")} stroke={ENCRE} strokeWidth={1.5} />
                    <text x={x0 + p.l / 2} y={y + 21} textAnchor="middle" fontSize={14} fontWeight={700} fill={ENCRE}>
                      {p.txt}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
        <path d={`M ${fin + 6} 8 Q ${fin + 14} 8 ${fin + 14} 18 L ${fin + 14} ${H / 2 - 6} L ${fin + 20} ${H / 2} L ${fin + 14} ${H / 2 + 6} L ${fin + 14} ${H - 16} Q ${fin + 14} ${H - 6} ${fin + 6} ${H - 6}`} fill="none" stroke={ENCRE} strokeWidth={1.5} />
        <text x={fin + 24} y={H / 2 + 5} fontSize={14} fontWeight={700} fill={BLEU}>
          {total}
        </text>
      </svg>
    </div>
  );
};

/** Trois étapes côte à côte, chacune dans une case de 96, son nom dessous. */
const etapes = (dessins: ((cx: number, bas: number) => ReactNode)[], hauteur: number, label: string) => {
  const H = hauteur + 30;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[15rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label={label}>
        {dessins.map((d, i) => {
          const cx = 6 + 48 + i * 96;
          return (
            <g key={i}>
              {d(cx, hauteur + 4)}
              <text x={cx} y={H - 4} textAnchor="middle" fontSize={14} fontWeight={700} fill={ENCRE}>
                {`Étape ${i + 1}`}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/** La CROIX qui grandit : un carré au centre et 4 bras de n carrés. */
const croix = (n: number) => (cx: number, bas: number) => {
  const s = 12;
  const cy = bas - (2 * n + 1) * s / 2;
  const cases: [number, number][] = [[0, 0]];
  for (let k = 1; k <= n; k++) cases.push([k, 0], [-k, 0], [0, k], [0, -k]);
  return cases.map(([i, j], k) => (
    <rect key={k} x={cx - s / 2 + i * s} y={cy - s / 2 + j * s} width={s} height={s} fill={i === 0 && j === 0 ? ORANGE : "#bfdbfe"} stroke={ENCRE} strokeWidth={1} />
  ));
};

/** Des TRIANGLES d'allumettes en bande : n triangles, tête-bêche. */
const bande = (n: number) => (cx: number, bas: number) => {
  const s = 30;
  const h = 26;
  const largeur = Math.ceil(n / 2) * s + (n % 2 === 0 ? s / 2 : 0);
  const x0 = cx - largeur / 2;
  const traits: [number, number, number, number][] = [];
  for (let k = 0; k < n; k++) {
    const m = Math.floor(k / 2);
    if (k % 2 === 0) {
      // triangle pointe en haut : base en bas
      traits.push([x0 + m * s, bas, x0 + m * s + s, bas], [x0 + m * s, bas, x0 + m * s + s / 2, bas - h], [x0 + m * s + s, bas, x0 + m * s + s / 2, bas - h]);
    } else {
      // triangle pointe en bas : côté du haut
      traits.push([x0 + m * s + s / 2, bas - h, x0 + m * s + (3 * s) / 2, bas - h], [x0 + m * s + s, bas, x0 + m * s + (3 * s) / 2, bas - h]);
    }
  }
  return traits.map(([a, b, c, d], k) => <line key={k} x1={a} y1={b} x2={c} y2={d} stroke={ORANGE} strokeWidth={3} strokeLinecap="round" />);
};

/** Le BASSIN de n carrés bleus, entouré de dalles grises. */
const bassin = (n: number) => (cx: number, bas: number) => {
  const s = 14;
  const x0 = cx - ((n + 2) * s) / 2;
  const y0 = bas - 3 * s;
  const cases: ReactNode[] = [];
  for (let i = 0; i < n + 2; i++)
    for (let j = 0; j < 3; j++) {
      const eau = j === 1 && i > 0 && i < n + 1;
      cases.push(<rect key={`${i}-${j}`} x={x0 + i * s} y={y0 + j * s} width={s} height={s} fill={eau ? "#60a5fa" : "#e2e8f0"} stroke={ENCRE} strokeWidth={1} />);
    }
  return cases;
};

/** La BALANCE en équilibre : 3 sacs à gauche ; 1 sac et un poids de 4 kg à droite. */
const balance = () => (
  <div className="mx-auto w-full max-w-[20rem] print:max-w-[15rem]">
    <svg viewBox="0 0 300 150" className="block h-auto w-full" role="img" aria-label="Une balance en équilibre : à gauche 3 sacs de farine pareils ; à droite 1 sac pareil et un poids de 4 kg.">
      <polygon points="150,44 134,140 166,140" fill="#cbd5e1" stroke={ENCRE} strokeWidth={1.5} />
      <line x1={30} y1={44} x2={270} y2={44} stroke={ENCRE} strokeWidth={4} />
      <line x1={75} y1={44} x2={75} y2={96} stroke={GRIS} strokeWidth={1.5} />
      <line x1={225} y1={44} x2={225} y2={96} stroke={GRIS} strokeWidth={1.5} />
      <line x1={25} y1={96} x2={125} y2={96} stroke={ENCRE} strokeWidth={3} />
      <line x1={175} y1={96} x2={275} y2={96} stroke={ENCRE} strokeWidth={3} />
      {[0, 1, 2].map((k) => (
        <rect key={k} x={32 + k * 30} y={66} width={26} height={30} rx={5} fill="#fde68a" stroke={ENCRE} strokeWidth={1.5} />
      ))}
      <rect x={184} y={66} width={26} height={30} rx={5} fill="#fde68a" stroke={ENCRE} strokeWidth={1.5} />
      <rect x={216} y={70} width={52} height={26} fill="#64748b" stroke={ENCRE} strokeWidth={1.5} />
      <text x={242} y={88} textAnchor="middle" fontSize={14} fontWeight={700} fill="#ffffff">
        4 kg
      </text>
      <text x={75} y={122} textAnchor="middle" fontSize={14} fill={ENCRE}>
        3 sacs
      </text>
      <text x={225} y={122} textAnchor="middle" fontSize={14} fill={ENCRE}>
        1 sac + 4 kg
      </text>
    </svg>
  </div>
);

export const exercicesAlgebreCm2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "algebre",
  titre: "Les débuts de l'algèbre",
  accroche:
    "Vingt exercices, du geste seul au problème. Lire une égalité, la compléter, trouver le nombre caché. Dessiner un schéma en barres. Continuer un motif qui grandit, et trouver une étape lointaine sans tout dessiner. Une course de relais, un ukulélé, une boulangerie, un restaurant, un tour de magie, un bassin et un robot. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis écris ta réponse et ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/cm2/algebre", titre: "Les débuts de l'algèbre" }],
  coachHref: "/coach-ia/maths?classe=cm2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je calcule chaque côté du signe = avant de répondre.",
      rappel: [
        "Le signe = veut dire « vaut autant que » : les deux côtés ont la même valeur.",
        "Pour trouver un nombre caché, je fais l'opération inverse : le + devient −, le × devient ÷.",
        "Dans un motif, je regarde ce qui change d'une étape à la suivante.",
      ],
      exercices: [
        {
          enonce: "Au tableau, Lina a écrit quatre égalités. Vrai ou faux ?\na) 7 + 5 = 12\nb) 9 + 6 = 10 + 5\nc) 4 × 5 = 18 + 3\nd) 20 − 8 = 6 + 7",
          reponses: [
            { question: "a)", attendu: "vrai" },
            { question: "b)", attendu: "vrai" },
            { question: "c)", attendu: "faux" },
            { question: "d)", attendu: "faux" },
          ],
          correction:
            "Une égalité est vraie quand les DEUX côtés ont la même valeur. Je calcule chaque côté.\na) À gauche : 7 + 5 = 12. À droite : 12. Même valeur : vrai.\nb) À gauche : 9 + 6 = 15. À droite : 10 + 5 = 15. Même valeur : vrai.\nc) À gauche : 4 × 5 = 20. À droite : 18 + 3 = 21. 20 et 21 sont différents : faux.\nd) À gauche : 20 − 8 = 12. À droite : 6 + 7 = 13. 12 et 13 sont différents : faux.\n⛔ Le piège : croire qu'après le signe =, il faut toujours UN seul nombre. Au b), il y a un calcul de chaque côté, et c'est juste.\nRéponse : a) vrai ; b) vrai ; c) faux ; d) faux.",
          micros: ["algebre_egalite"],
        },
        {
          enonce: "Complète pour que l'égalité soit vraie. Écris le nombre de la case.\na) 8 + 6 = □ + 4\nb) 9 + 3 = □ × 3\nc) 30 − 10 = □ + 15",
          reponses: [
            { question: "a)", attendu: "10" },
            { question: "b)", attendu: "4" },
            { question: "c)", attendu: "5" },
          ],
          correction:
            "Je calcule d'abord le côté connu. Puis je cherche ce qui donne la même valeur de l'autre côté.\na) 8 + 6 = 14. Je cherche □ + 4 = 14. Or 10 + 4 = 14. Donc □ = 10.\nb) 9 + 3 = 12. Je cherche □ × 3 = 12. Or 4 × 3 = 12. Donc □ = 4.\nc) 30 − 10 = 20. Je cherche □ + 15 = 20. Or 5 + 15 = 20. Donc □ = 5.\n⛔ Le piège : écrire 14 dans la case du a). Mais 14 + 4 = 18, pas 14. La case n'est pas le résultat.\nRéponse : a) 10 ; b) 4 ; c) 5.",
          micros: ["algebre_completer_egalite"],
        },
        {
          enonce: "Trouve le nombre caché □.\na) □ + 18 = 45\nb) □ − 12 = 30\nc) □ × 7 = 56\nd) □ ÷ 4 = 9",
          reponses: [
            { question: "a)", attendu: "27" },
            { question: "b)", attendu: "42" },
            { question: "c)", attendu: "8" },
            { question: "d)", attendu: "36" },
          ],
          correction:
            "Je fais l'opération INVERSE pour défaire le calcul.\na) On a ajouté 18. J'enlève 18 : 45 − 18 = 27. Je vérifie : 27 + 18 = 45.\nb) On a enlevé 12. J'ajoute 12 : 30 + 12 = 42. Je vérifie : 42 − 12 = 30.\nc) On a multiplié par 7. Je divise par 7 : 56 ÷ 7 = 8. Je vérifie : 8 × 7 = 56.\nd) On a divisé par 4. Je multiplie par 4 : 9 × 4 = 36. Je vérifie : 36 ÷ 4 = 9.\n⛔ Le piège : faire la même opération. Au a), 45 + 18 = 63, et 63 + 18 ne fait pas 45.\nRéponse : a) 27 ; b) 42 ; c) 8 ; d) 36.",
          micros: ["algebre_nombre_inconnu"],
        },
        {
          enonce: "Une couturière a une ficelle de 50 cm. Elle la coupe en deux morceaux. Le premier mesure 18 cm. Le schéma montre la ficelle.\na) Quel calcul donne la longueur □ de l'autre morceau ?\nA) 50 + 18\nB) 18 × 50\nC) 50 − 18\nb) Combien mesure l'autre morceau, en cm ?",
          figure: schema([{ nom: "Ficelle", parts: [{ l: 58, txt: "18 cm" }, { l: 100, txt: "□", c: "#fed7aa" }] }], "50 cm"),
          reponses: [
            { question: "a)", attendu: "C" },
            { question: "b)", attendu: "32", unite: "cm" },
          ],
          correction:
            "Sur le schéma, toute la barre vaut 50 cm. Elle est faite de 18 cm et de □.\nDonc 18 + □ = 50.\na) Pour trouver une partie, j'enlève l'autre partie du tout : 50 − 18. C'est le choix C.\nb) 50 − 18 = 32. L'autre morceau mesure 32 cm.\nJe vérifie : 18 + 32 = 50.\n⛔ Le piège : additionner 50 + 18 = 68. Mais un morceau ne peut pas être plus long que toute la ficelle.\nRéponse : a) C ; b) 32 cm.",
          micros: ["algebre_schema_barre"],
        },
        {
          enonce: "Voici un motif de carrés qui grandit.\na) Combien de carrés à l'étape 4 ?\nb) Combien de carrés à l'étape 5 ?\nc) Combien de carrés ajoute-t-on à chaque étape ?",
          figure: etapes([croix(1), croix(2), croix(3)], 84, "Un motif en croix : étape 1, 5 carrés ; étape 2, 9 carrés ; étape 3, 13 carrés."),
          reponses: [
            { question: "a)", attendu: "17" },
            { question: "b)", attendu: "21" },
            { question: "c)", attendu: "4" },
          ],
          correction:
            "Je compte les carrés : étape 1 : 5 carrés ; étape 2 : 9 carrés ; étape 3 : 13 carrés.\nD'une étape à la suivante : 9 − 5 = 4 et 13 − 9 = 4. On ajoute 4 carrés : un au bout de chaque bras.\na) Étape 4 : 13 + 4 = 17 carrés.\nb) Étape 5 : 17 + 4 = 21 carrés.\nc) On ajoute 4 carrés à chaque étape.\n⛔ Le piège : ajouter 1 carré, comme si un seul bras grandissait. La croix a 4 bras : chacun grandit.\nRéponse : a) 17 ; b) 21 ; c) 4.",
          micros: ["algebre_motif"],
        },
        {
          enonce: "Trouve le nombre suivant de chaque suite.\na) 5 ; 9 ; 13 ; 17 ; …\nb) 3 ; 6 ; 12 ; 24 ; …\nc) 50 ; 45 ; 40 ; 35 ; …",
          reponses: [
            { question: "a)", attendu: "21" },
            { question: "b)", attendu: "48" },
            { question: "c)", attendu: "30" },
          ],
          correction:
            "Je regarde comment on passe d'un nombre au suivant. Je vérifie sur TOUS les nombres.\na) 5 + 4 = 9 ; 9 + 4 = 13 ; 13 + 4 = 17. On ajoute 4 : 17 + 4 = 21.\nb) 3 + 3 = 6, mais 6 + 3 = 9, pas 12. Alors j'essaie : 3 × 2 = 6 ; 6 × 2 = 12 ; 12 × 2 = 24. On double : 24 × 2 = 48.\nc) 50 − 5 = 45 ; 45 − 5 = 40 ; 40 − 5 = 35. On enlève 5 : 35 − 5 = 30.\n⛔ Le piège du b) : croire qu'on ajoute toujours. Ici, on DOUBLE. 24 + 12 = 36 serait faux.\nRéponse : a) 21 ; b) 48 ; c) 30.",
          micros: ["algebre_motif"],
        },
        {
          enonce: "Au parc, on loue des tricycles. Le tableau donne le nombre de roues.\na) Combien de roues pour 5 tricycles ?\nb) Combien de roues pour 10 tricycles ?\nc) Quelle est la règle ?\nA) roues = tricycles × 3\nB) roues = tricycles + 2\nC) roues = tricycles × 2",
          figure: grille([
            ["Tricycles", "1", "2", "4", "5"],
            ["Roues", "3", "6", "12", "?"],
          ]),
          reponses: [
            { question: "a)", attendu: "15" },
            { question: "b)", attendu: "30" },
            { question: "c)", attendu: "A" },
          ],
          correction:
            "Un tricycle a 3 roues. Je vérifie sur chaque case : 1 × 3 = 3 ; 2 × 3 = 6 ; 4 × 3 = 12.\nLa règle : roues = tricycles × 3. C'est le choix A.\na) 5 tricycles : 5 × 3 = 15 roues.\nb) 10 tricycles : 10 × 3 = 30 roues.\n⛔ Le piège : choisir « + 2 », vrai pour 1 tricycle seulement (1 + 2 = 3). Pour 2 tricycles, 2 + 2 = 4, et non 6.\nRéponse : a) 15 ; b) 30 ; c) A.",
          micros: ["algebre_relation"],
        },
        {
          enonce: "Compare avec <, > ou =. Calcule d'abord chaque côté.\na) 6 × 4 … 30 − 6\nb) 45 ÷ 5 … 2 + 8\nc) 100 − 1 … 9 × 11\nd) 7 × 8 … 50 + 5",
          reponses: [
            { question: "a)", attendu: "=" },
            { question: "b)", attendu: "<" },
            { question: "c)", attendu: "=" },
            { question: "d)", attendu: ">" },
          ],
          correction:
            "Je calcule chaque côté, puis je compare les deux nombres.\na) 6 × 4 = 24 et 30 − 6 = 24. Même valeur : =.\nb) 45 ÷ 5 = 9 et 2 + 8 = 10. 9 est plus petit que 10 : <.\nc) 100 − 1 = 99 et 9 × 11 = 99. Même valeur : =.\nd) 7 × 8 = 56 et 50 + 5 = 55. 56 est plus grand que 55 : >.\n⛔ Le piège : comparer les nombres écrits sans calculer. Au b), 45 a l'air plus grand que 8, mais 45 ÷ 5 ne vaut que 9.\nRéponse : a) = ; b) < ; c) = ; d) >.",
          micros: ["algebre_egalite"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je dessine un schéma au brouillon, puis je vérifie ma réponse.",
      rappel: [
        "Pour compléter une égalité, je calcule le côté connu, puis je cherche ce qui manque.",
        "Dans un schéma en barres, toutes les parts ont la même taille : je divise le tout par le nombre de parts.",
        "Une règle doit marcher pour TOUTES les cases du tableau, pas pour une seule.",
      ],
      exercices: [
        {
          enonce: "Complète pour que l'égalité soit vraie.\na) 25 + 17 = 20 + □\nb) 6 × 8 = □ × 4\nc) 100 − 35 = □ − 40",
          reponses: [
            { question: "a)", attendu: "22" },
            { question: "b)", attendu: "12" },
            { question: "c)", attendu: "105" },
          ],
          correction:
            "Je calcule d'abord le côté gauche, qui est complet.\na) 25 + 17 = 42. Je cherche 20 + □ = 42. Je fais 42 − 20 = 22. Donc □ = 22.\nb) 6 × 8 = 48. Je cherche □ × 4 = 48. Je fais 48 ÷ 4 = 12. Donc □ = 12.\nc) 100 − 35 = 65. Je cherche □ − 40 = 65. Je fais 65 + 40 = 105. Donc □ = 105.\nJe vérifie le c) : 105 − 40 = 65. C'est juste.\n⛔ Le piège : écrire 42 au a). Mais 20 + 42 = 62, pas 42. La case est ce qui MANQUE.\nRéponse : a) 22 ; b) 12 ; c) 105.",
          micros: ["algebre_completer_egalite", "algebre_egalite"],
        },
        {
          enonce: "Une boulangère doit cuire 120 croissants pour une fête. Elle en a déjà cuit 48. Il lui en reste □ à cuire.\na) Quelle égalité décrit la situation ?\nA) 48 × □ = 120\nB) 48 + □ = 120\nC) □ − 48 = 120\nb) Combien de croissants lui reste-t-il à cuire ?",
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: "72" },
          ],
          correction:
            "Les croissants déjà cuits PLUS ceux qui restent font les 120 croissants.\na) Donc 48 + □ = 120. C'est le choix B.\nb) Pour trouver □, je fais l'inverse du + : 120 − 48 = 72.\nJe vérifie : 48 + 72 = 120.\n⛔ Le piège : calculer 120 + 48 = 168. On a ajouté au lieu d'enlever.\nRéponse : a) B ; b) 72 croissants.",
          micros: ["algebre_nombre_inconnu"],
        },
        {
          enonce: "Dans une course de relais, Sam court 2 fois plus que Léa. Ensemble, ils courent 900 m.\na) Combien de parts égales y a-t-il dans le schéma ?\nb) Combien de mètres vaut une part ?\nc) Combien de mètres court Sam ?",
          figure: schema(
            [
              { nom: "Léa", parts: [{ l: 52, txt: "?" }] },
              { nom: "Sam", parts: [{ l: 52, txt: "?" }, { l: 52, txt: "?" }] },
            ],
            "900 m",
          ),
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "300", unite: "m" },
            { question: "c)", attendu: "600", unite: "m" },
          ],
          correction:
            "Léa a 1 part. Sam court 2 fois plus : il a 2 parts.\na) En tout : 1 + 2 = 3 parts égales.\nb) Les 3 parts font 900 m : 900 ÷ 3 = 300 m pour une part. Léa court 300 m.\nc) Sam a 2 parts : 2 × 300 = 600 m.\nJe vérifie : 300 + 600 = 900.\n⛔ Le piège : compter 2 parts en tout, et trouver 900 ÷ 2 = 450. Léa a aussi sa part.\nRéponse : a) 3 parts ; b) 300 m ; c) 600 m.",
          micros: ["algebre_schema_barre"],
        },
        {
          enonce: "Noé et Maya économisent pour acheter un ukulélé. À eux deux, ils ont 50 €. Maya a 10 € de plus que Noé.\na) Si on enlève les 10 € en plus, combien d'euros reste-t-il ?\nb) Combien d'euros a Noé ?\nc) Combien d'euros a Maya ?",
          figure: schema(
            [
              { nom: "Noé", parts: [{ l: 70, txt: "?" }] },
              { nom: "Maya", parts: [{ l: 70, txt: "?" }, { l: 50, txt: "10 €", c: "#bbf7d0" }] },
            ],
            "50 €",
          ),
          reponses: [
            { question: "a)", attendu: "40" },
            { question: "b)", attendu: "20" },
            { question: "c)", attendu: "30" },
          ],
          correction:
            "Sur le schéma, Maya a la même part que Noé, plus 10 €.\na) J'enlève d'abord l'écart : 50 − 10 = 40 €. Il reste 2 parts égales.\nb) 40 ÷ 2 = 20. Noé a 20 €.\nc) Maya a 10 € de plus : 20 + 10 = 30 €.\nJe vérifie : 20 + 30 = 50, et 30 − 20 = 10.\n⛔ Le piège : partager 50 € en deux, 25 € chacun. Mais alors Maya n'a pas 10 € de plus.\nRéponse : a) 40 € ; b) 20 € ; c) 30 €.",
          micros: ["algebre_schema_barre"],
        },
        {
          enonce: "Avec des allumettes, Tom fait une bande de triangles.\na) Combien d'allumettes à l'étape 4 ?\nb) Combien d'allumettes à l'étape 10 ?\nc) Combien d'allumettes à l'étape 50 ?",
          figure: etapes([bande(1), bande(2), bande(3)], 34, "Une bande de triangles d'allumettes : étape 1, 3 allumettes ; étape 2, 5 allumettes ; étape 3, 7 allumettes."),
          reponses: [
            { question: "a)", attendu: "9" },
            { question: "b)", attendu: "21" },
            { question: "c)", attendu: "101" },
          ],
          correction:
            "Je compte : étape 1 : 3 allumettes ; étape 2 : 5 ; étape 3 : 7. On ajoute 2 allumettes à chaque étape.\na) Étape 4 : 7 + 2 = 9 allumettes.\nb) De l'étape 1 à l'étape 10, il y a 9 sauts de 2 : 9 × 2 = 18. Puis 3 + 18 = 21 allumettes.\nc) De l'étape 1 à l'étape 50, il y a 49 sauts : 49 × 2 = 98. Puis 3 + 98 = 101 allumettes.\n⭐ Je n'ai pas besoin de dessiner les 50 étapes : je compte les sauts.\n⛔ Le piège : compter 10 sauts pour l'étape 10, et trouver 3 + 20 = 23. De 1 à 10, il n'y a que 9 sauts.\nRéponse : a) 9 ; b) 21 ; c) 101.",
          micros: ["algebre_motif", "algebre_motif_rang"],
        },
        {
          enonce: "Au restaurant, un serveur met des tables carrées bout à bout. Le tableau donne le nombre de chaises.\na) Combien de chaises pour 4 tables ?\nb) Combien de chaises pour 10 tables ?\nc) Quelle est la règle ?\nA) chaises = tables × 4\nB) chaises = tables + 3\nC) chaises = tables × 2 + 2",
          figure: grille([
            ["Tables", "1", "2", "3", "4"],
            ["Chaises", "4", "6", "8", "?"],
          ]),
          reponses: [
            { question: "a)", attendu: "10" },
            { question: "b)", attendu: "22" },
            { question: "c)", attendu: "C" },
          ],
          correction:
            "Chaque table de plus ajoute 2 chaises : 4, 6, 8…\na) 4 tables : 8 + 2 = 10 chaises.\nJe teste les règles sur TOUTES les cases. Avec 3 tables : 3 × 4 = 12 (non) ; 3 + 3 = 6 (non) ; 3 × 2 + 2 = 8 (oui).\nc) La règle est chaises = tables × 2 + 2 : 2 chaises par table, plus 1 chaise à chaque bout. C'est le choix C.\nb) 10 tables : 10 × 2 + 2 = 22 chaises.\n⛔ Le piège : choisir « × 4 » parce que c'est juste pour 1 table. Les tables collées perdent des places sur les côtés.\nRéponse : a) 10 ; b) 22 ; c) C.",
          micros: ["algebre_relation", "algebre_motif_rang"],
        },
        {
          enonce: "Un cuisinier pose des sacs de farine identiques sur une balance. Elle est en équilibre.\na) Il enlève 1 sac de chaque plateau. Combien de sacs restent à gauche ?\nb) Combien pèse un sac, en kg ?\nc) Combien pèse le plateau de gauche au début, en kg ?",
          figure: balance(),
          reponses: [
            { question: "a)", attendu: "2" },
            { question: "b)", attendu: "2", unite: "kg" },
            { question: "c)", attendu: "6", unite: "kg" },
          ],
          correction:
            "La balance est en équilibre : les deux plateaux pèsent autant. C'est une égalité.\na) J'enlève 1 sac à gauche ET 1 sac à droite : la balance reste en équilibre. À gauche, il reste 3 − 1 = 2 sacs.\nÀ droite, il reste seulement le poids de 4 kg.\nb) 2 sacs pèsent 4 kg. Un sac pèse 4 ÷ 2 = 2 kg.\nc) Au début, à gauche : 3 sacs, donc 3 × 2 = 6 kg.\nJe vérifie à droite : 2 + 4 = 6 kg. Même poids : la balance est bien en équilibre.\n⛔ Le piège : enlever un sac d'un seul plateau. La balance penche, et l'égalité est fausse.\nRéponse : a) 2 sacs ; b) 2 kg ; c) 6 kg.",
          micros: ["algebre_egalite", "algebre_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis deux fois, je fais un schéma ou un tableau, puis je réponds à chaque question.",
      rappel: [
        "Pour retrouver un nombre de départ, je pars de la fin et je défais les calculs un par un.",
        "Pour une étape lointaine : étape de départ + nombre de sauts × ce qu'on ajoute.",
        "Je vérifie toujours ma réponse en refaisant le calcul dans l'autre sens.",
      ],
      exercices: [
        {
          titre: "Le tour de magie",
          enonce: "Un magicien dit : « Je pense à un nombre. Je le multiplie par 4, puis j'ajoute 6. Je trouve 50. »\na) Pour remonter, quel calcul fais-je en premier ?\nA) 50 − 6\nB) 50 ÷ 4\nC) 50 + 6\nb) À quel nombre pense le magicien ?",
          reponses: [
            { question: "a)", attendu: "A" },
            { question: "b)", attendu: "11" },
          ],
          correction:
            "Le magicien a fait : nombre → × 4 → + 6 → 50.\nPour remonter, je pars de la fin et je défais le DERNIER calcul en premier.\na) Le dernier calcul est + 6. Je le défais avec − 6 : 50 − 6 = 44. C'est le choix A.\nb) Puis je défais × 4 avec ÷ 4 : 44 ÷ 4 = 11.\nJe vérifie : 11 × 4 = 44, puis 44 + 6 = 50.\n⛔ Le piège : défaire dans le mauvais ordre. 50 ÷ 4 ne tombe pas juste : il faut enlever 6 d'abord.\nRéponse : a) A ; b) 11.",
          micros: ["algebre_nombre_inconnu", "algebre_defi"],
        },
        {
          titre: "Les cartes de football",
          enonce: "Trois amis se partagent 80 cartes de football. Inès en a 2 fois plus que Léo. Mia en a autant que Léo.\na) Combien de parts égales y a-t-il dans le schéma ?\nb) Combien de cartes a Léo ?\nc) Combien de cartes a Inès ?",
          figure: schema(
            [
              { nom: "Léo", parts: [{ l: 46, txt: "?" }] },
              { nom: "Inès", parts: [{ l: 46, txt: "?" }, { l: 46, txt: "?" }] },
              { nom: "Mia", parts: [{ l: 46, txt: "?" }] },
            ],
            "80",
          ),
          reponses: [
            { question: "a)", attendu: "4" },
            { question: "b)", attendu: "20" },
            { question: "c)", attendu: "40" },
          ],
          correction:
            "Léo a 1 part. Inès a 2 fois plus : 2 parts. Mia a autant que Léo : 1 part.\na) En tout : 1 + 2 + 1 = 4 parts égales.\nb) 80 ÷ 4 = 20. Une part vaut 20 cartes : Léo a 20 cartes.\nc) Inès a 2 parts : 2 × 20 = 40 cartes.\nMia a 20 cartes, comme Léo.\nJe vérifie : 20 + 40 + 20 = 80.\n⛔ Le piège : oublier la part de Mia, et compter 3 parts. 80 ÷ 3 ne tombe même pas juste.\nRéponse : a) 4 parts ; b) 20 cartes ; c) 40 cartes.",
          micros: ["algebre_schema_barre", "algebre_defi"],
        },
        {
          titre: "Le bassin du jardin",
          enonce: "Un paysagiste construit des bassins. L'eau est en bleu. Il pose des dalles grises tout autour.\na) Combien de dalles pour l'étape 4 ?\nb) Combien de dalles pour l'étape 20 ?\nc) Il a 30 dalles. Pour quelle étape les utilise-t-il toutes ?",
          figure: etapes([bassin(1), bassin(2), bassin(3)], 42, "Des bassins entourés de dalles : étape 1, 8 dalles ; étape 2, 10 dalles ; étape 3, 12 dalles."),
          reponses: [
            { question: "a)", attendu: "14" },
            { question: "b)", attendu: "46" },
            { question: "c)", attendu: "12" },
          ],
          correction:
            "Je compte les dalles grises : étape 1 : 8 ; étape 2 : 10 ; étape 3 : 12. On ajoute 2 dalles à chaque étape : une en haut, une en bas.\na) Étape 4 : 12 + 2 = 14 dalles.\nb) De l'étape 1 à l'étape 20, il y a 19 sauts : 19 × 2 = 38. Puis 8 + 38 = 46 dalles.\nc) 30 − 8 = 22 dalles de plus qu'à l'étape 1. 22 ÷ 2 = 11 sauts. L'étape est 1 + 11 = 12.\nJe vérifie : 11 × 2 = 22, et 8 + 22 = 30.\n⛔ Le piège : compter 20 sauts pour l'étape 20. On part de l'étape 1 : il n'y a que 19 sauts.\nRéponse : a) 14 ; b) 46 ; c) l'étape 12.",
          micros: ["algebre_motif_rang", "algebre_defi"],
        },
        {
          titre: "Le robot",
          enonce: "Une ingénieure teste un robot sur une piste de cases. Il part de la case 5. À chaque pas, il avance de 3 cases.\na) Sur quelle case est-il après 4 pas ?\nb) Sur quelle case est-il après 10 pas ?\nc) Combien de pas faut-il pour arriver à la case 50 ?",
          figure: grille([
            ["Pas", "0", "1", "2", "3"],
            ["Case", "5", "8", "11", "14"],
          ]),
          reponses: [
            { question: "a)", attendu: "17" },
            { question: "b)", attendu: "35" },
            { question: "c)", attendu: "15" },
          ],
          correction:
            "La règle : case = 5 + pas × 3. Je vérifie : 5 + 2 × 3 = 11. C'est bien dans le tableau.\na) Après 4 pas : 4 × 3 = 12, puis 5 + 12 = 17. Case 17.\nb) Après 10 pas : 10 × 3 = 30, puis 5 + 30 = 35. Case 35.\nc) Je défais : 50 − 5 = 45 cases à avancer. 45 ÷ 3 = 15 pas.\nJe vérifie : 15 × 3 = 45, et 5 + 45 = 50.\n⛔ Le piège : oublier la case de départ, et calculer 50 ÷ 3. Le robot ne part pas de 0 : il part de la case 5.\nRéponse : a) case 17 ; b) case 35 ; c) 15 pas.",
          micros: ["algebre_relation", "algebre_defi"],
        },
        {
          titre: "Au marché",
          enonce: "Au marché, 3 mangues coûtent autant que 2 ananas. Un ananas coûte 3 €.\na) Combien coûtent 2 ananas, en € ?\nb) Combien coûte une mangue, en € ?\nc) 6 mangues coûtent autant que combien d'ananas ?",
          reponses: [
            { question: "a)", attendu: "6" },
            { question: "b)", attendu: "2" },
            { question: "c)", attendu: "4" },
          ],
          correction:
            "J'écris l'égalité : 3 mangues = 2 ananas.\na) 2 ananas : 2 × 3 = 6 €.\nb) Donc 3 mangues coûtent aussi 6 €. Une mangue : 6 ÷ 3 = 2 €.\nc) 6 mangues : 6 × 2 = 12 €. Avec 12 €, j'ai 12 ÷ 3 = 4 ananas.\n⭐ Autre chemin : 6 mangues, c'est 2 fois 3 mangues. Donc 2 fois 2 ananas : 4 ananas.\n⛔ Le piège : croire qu'une mangue coûte 6 €. 6 €, c'est le prix des 3 mangues ensemble.\nRéponse : a) 6 € ; b) 2 € ; c) 4 ananas.",
          micros: ["algebre_egalite", "algebre_defi"],
        },
      ],
    },
  ],
};
