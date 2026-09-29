// ─── Fiche d'exercices : horaires et durées (6e) — 20 exercices corrigés ──────
//
// Lot des feuilles de 6e (30/09/2026), sur le modèle de la feuille de 5e
// voisine `maths-5e-grandeur-conversion.tsx` (sa bande à l'échelle `bande`,
// reprise telle quelle) : aides de dessin locales, écrites EN CLAIR, relues par
// le script de recalcul.
//
// Pas de fiche de cours de 6e pour cette notion (fichesCours: []). Alignée sur
// la banque `lib/tutor-v4/questionBank/6e/maths/durees.bank.ts`, notionId
// duree_temps : calculer un horaire ou une durée, convertir des durées (h, min,
// s, jours, semaines), passer de l'écriture décimale d'une durée aux minutes,
// résoudre un problème d'horaires, défis (passer minuit, lire un tableau
// d'horaires).
// ⭐ LA DIFFICULTÉ DU CHAPITRE (banque) : le temps ne se compte pas en base dix.
// 15 h 75 n'existe pas, et 1,2 h ne vaut pas 1 h 20. Chaque niveau y revient.
// ⛔ LIMITES DE LA 6e : pas de vitesse (grandeur composée, 4e), pas de nombres
// relatifs. Les écritures décimales restent simples (0,2 ; 0,5 ; 0,25 ; 0,75).
// ⛔ Aucun exemple de la banque n'est repris : ni le cinéma de 17 h 40, ni le
// cours de 8 h 15, ni le train de 14 h 25, ni le film de 22 h 10 ou de 23 h 20,
// ni 8 h 50 + 20 min, ni 17 h 22, ni 3 h 20 = 200 min, ni 150 min, ni 34 990 s,
// ni 609 h, ni les 76 mois, ni 1,30 h, ni le bus de 17 h 26, ni les 26 h de
// cours, ni le réveil, ni la Diagonale des Fous. Ni ceux de la feuille de 5e
// (Lyon-Marseille, relais 4 × 100 m, trail, sortie au musée).
//
// Les pièges nommés : écrire 15 h 75 (1, 12, 17), soustraire des horaires comme
// des décimaux (2), lire 4 h 15 comme 415 min (3), diviser par 100 (4, 16),
// lire 1,5 h comme 1 h 5 min (5, 18), le chiffre après la virgule pris pour des
// minutes (6, 12, 20), 150 s = 1 min 50 s (7), reculer sans passer par l'heure
// pile (8), la mauvaise ligne d'un tableau d'horaires (9), un cours compté pour
// une heure (10), les nombres 60, 24 et 7 confondus (11), comparer des séances
// au lieu des durées (13), oublier minuit (14, 19), une étape oubliée (15).
//
// Faits réels : aucun. Tous les horaires et toutes les durées (match, balade,
// gâteau, bus, cours, GPS, natation, bateau, gratin, ski, trains, marathon,
// sommeil, randonnée) sont des MODÈLES, à l'ordre de grandeur réel.
//
// ⭐ LES DESSINS :
//   · `frise` — LA LIGNE DU TEMPS : les horaires sur une ligne, un bond par
//     étape jusqu'aux heures pile, la durée de chaque bond au-dessus, le total
//     en haut. Espacement régulier (pas à l'échelle) : un bond de 5 min reste
//     lisible. Les horaires passent sur deux rangs quand ils sont serrés ;
//   · `bande` — une durée coupée en heures et en minutes, À L'ÉCHELLE (reprise
//     de la feuille de 5e des conversions) ;
//   · `table` — un tableau d'horaires ou de conversions, 3 colonnes au plus.
// SVG de viewBox 300, police 14, sans `min-w`. Le script vérifie les bonds,
// les totaux, et que rien ne sort du cadre ni ne se touche. 14 dessins imprimés.
//
// Les corrigés sont écrits à la première personne (« j'avance jusqu'à 15 h »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-6e-duree-temps.mjs`.
//
// Micro-compétences : duree_calculer (1, 2, 8, 12, 15, 18, 19), duree_convertir
// (3, 4, 7, 10, 11, 13, 16, 19), duree_decimale (5, 6, 12, 18, 20),
// duree_probleme (9, 10, 13, 15, 17, 18, 20), duree_defi (9, 14, 16, 17, 19,
// 20). 5/5.

import type { ReactNode } from "react";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

const BLEU = "#2563eb";
const CYAN = "#0e7490";
const ORANGE = "#ea580c";
const NOIR = "#0f172a";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** Un tableau à plusieurs lignes. 3 colonnes courtes au plus. */
const table = (entete: string[], lignes: string[][]) => (
  <div className="mx-auto w-full max-w-[22rem] print:max-w-[15rem]">
    <CanvasRenderer figure={{ kind: "tableau_donnees", headers: entete, rows: lignes.map((values) => ({ values })), display: { compact: true, striped: true } }} />
  </div>
);

/**
 * LA LIGNE DU TEMPS. Les horaires sur une ligne, également espacés (ce n'est
 * PAS une échelle : un bond de 5 min doit rester lisible) ; entre deux
 * horaires, un bond en arc avec sa durée au-dessus ; le total en haut.
 * Les horaires passent sur deux rangs quand ils sont trop serrés.
 * ⚠️ Texte NU. ⭐ Le script vérifie que chaque bond dit l'écart entre ses deux
 * horaires, que les bonds font le total, et que rien ne sort ni ne se touche.
 */
const frise = (horaires: string[], sauts: string[], total?: string) => {
  const n = horaires.length;
  const pas = 252 / (n - 1);
  const X = (i: number) => 24 + i * pas;
  const deuxRangs = Math.max(...horaires.map((h) => h.length * 8.8)) + 4 > pas;
  const yL = total ? 70 : 50;
  const H = yL + (deuxRangs ? 48 : 30);
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[15rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label={`Ligne du temps : ${horaires.map((h, i) => (i < sauts.length ? `${h}, puis ${sauts[i]}` : h)).join(", ")}${total ? `. Total : ${total}` : ""}.`}>
        {total ? (
          <text x={150} y={16} textAnchor="middle" fontSize={14} fontWeight={700} fill={NOIR}>
            {`total : ${total}`}
          </text>
        ) : null}
        <line x1={14} y1={yL} x2={286} y2={yL} stroke={NOIR} strokeWidth={2} />
        {sauts.map((s, i) => {
          const a = X(i);
          const b = X(i + 1);
          return (
            <g key={`s${i}`}>
              <path d={`M ${a} ${yL - 2} Q ${(a + b) / 2} ${yL - 30} ${b - 2} ${yL - 4}`} fill="none" stroke={ORANGE} strokeWidth={2} />
              <path d={`M ${b - 2} ${yL - 4} l -7 -2 l 3 6 z`} fill={ORANGE} />
              <text x={(a + b) / 2} y={yL - 22} textAnchor="middle" fontSize={14} fontWeight={700} fill={ORANGE}>
                {s}
              </text>
            </g>
          );
        })}
        {horaires.map((h, i) => {
          const demi = (h.length * 8.8) / 2;
          const cx = Math.min(Math.max(X(i), demi + 2), 298 - demi);
          const bas = deuxRangs && i % 2 === 1;
          return (
            <g key={`h${i}`}>
              <line x1={X(i)} y1={yL - 6} x2={X(i)} y2={yL + 6} stroke={BLEU} strokeWidth={2.5} />
              {bas ? <line x1={X(i)} y1={yL + 8} x2={X(i)} y2={yL + 26} stroke={BLEU} strokeWidth={1} strokeDasharray="2 2" /> : null}
              <text x={cx} y={yL + (bas ? 40 : 22)} textAnchor="middle" fontSize={14} fontWeight={700} fill={BLEU}>
                {h}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/**
 * UNE BANDE À L'ÉCHELLE (reprise de la feuille de 5e des conversions) : une
 * durée coupée en morceaux, chacun de sa longueur VRAIE (`valeur`), son
 * étiquette dedans si elle y tient, dessous sinon. Le total en haut ; des
 * repères (`bornes`, un par frontière, "" pour rien) au-dessus des bouts.
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

export const exercicesDureeTemps6e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "duree-temps",
  titre: "Horaires et durées",
  accroche:
    "Vingt exercices, du plus simple au problème. Calculer une heure de fin ou une durée, convertir des heures, des minutes et des secondes, comprendre 1,5 h. Un match, un bus, un bateau de nuit, un marathon, une nuit de sommeil, une randonnée. Un rappel avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec la ligne du temps dessinée.",

  fichesCours: [{ href: "/fiches-cours/maths/6e/duree-temps", titre: "Horaires et durées" }],
  coachHref: "/coach-ia/maths?classe=6e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je fais une ligne du temps, et j'avance jusqu'aux heures pile.",
      rappel: [
        "$1$ h $= 60$ min et $1$ min $= 60$ s. On ne compte pas par $100$ !",
        "Un horaire dit QUAND. Une durée dit COMBIEN DE TEMPS.",
        "Pour calculer, j'avance par bonds jusqu'à l'heure pile.",
      ],
      exercices: [
        {
          enonce: "Un match de basket commence à $14$ h $35$. Il dure $1$ h $40$ min, pauses comprises. À quelle heure finit-il ?",
          correction:
            "J'avance par bonds, jusqu'aux heures pile.\nDe $14$ h $35$ à $15$ h : $25$ min.\nIl reste $100 - 25 = 75$ min, soit $1$ h $15$ min.\nDe $15$ h à $16$ h : $1$ h. Puis encore $15$ min : $16$ h $15$.\n⛔ Le piège : écrire « $15$ h $75$ ». Une heure a $60$ minutes : $75$ min, c'est $1$ h $15$ min.\nRéponse : le match finit à $16$ h $15$.",
          schema: frise(["14 h 35", "15 h", "16 h", "16 h 15"], ["25 min", "1 h", "15 min"], "1 h 40 min"),
          micros: ["duree_calculer"],
        },
        {
          enonce: "Une balade à vélo part à $9$ h $50$ et revient à $12$ h $20$. Combien de temps a-t-elle duré ?",
          correction:
            "Je fais une ligne du temps, et j'avance jusqu'aux heures pile.\nDe $9$ h $50$ à $10$ h : $10$ min.\nDe $10$ h à $12$ h : $2$ h.\nDe $12$ h à $12$ h $20$ : $20$ min.\nEn tout : $2$ h et $10 + 20 = 30$ min.\n⛔ Le piège : calculer $12{,}20 - 9{,}50 = 2{,}70$. Un horaire n'est pas un nombre décimal.\nRéponse : la balade a duré $2$ h $30$ min.",
          schema: frise(["9 h 50", "10 h", "12 h", "12 h 20"], ["10 min", "2 h", "20 min"], "2 h 30 min"),
          micros: ["duree_calculer"],
        },
        {
          enonce: "Écris ces durées en minutes.\na) $2$ h\nb) $4$ h $15$ min\nc) $1$ h $45$ min",
          correction:
            "Une heure, c'est $60$ minutes.\na) $2 \\times 60 = 120$ min.\nb) $4 \\times 60 = 240$, puis $240 + 15 = 255$ min.\nc) $60 + 45 = 105$ min.\n⛔ Le piège : lire $4$ h $15$ comme $415$ min.\nRéponse : a) $120$ min ; b) $255$ min ; c) $105$ min.",
          schema: ecranSeulement(
            table(["Durée", "En minutes"], [
              ["2 h", "120"],
              ["4 h 15 min", "255"],
              ["1 h 45 min", "105"],
            ]),
          ),
          micros: ["duree_convertir"],
        },
        {
          enonce: "Écris ces durées en heures et minutes.\na) $75$ min\nb) $200$ min\nc) $310$ min",
          correction:
            "Je fais des paquets de $60$ minutes : ce sont les heures.\na) $75 = 60 + 15$ : $1$ h $15$ min.\nb) $200 = 3 \\times 60 + 20$ : $3$ h $20$ min.\nc) $310 = 5 \\times 60 + 10$ : $5$ h $10$ min.\n⛔ Le piège : diviser par $100$ et écrire « $2$ h » pour $200$ min. Une heure a $60$ minutes.\nRéponse : a) $1$ h $15$ min ; b) $3$ h $20$ min ; c) $5$ h $10$ min.",
          schema: bande("200 min = 3 h 20 min", [
            { valeur: 60, label: "1 h" },
            { valeur: 60, label: "1 h" },
            { valeur: 60, label: "1 h" },
            { valeur: 20, label: "20 min", couleur: ORANGE },
          ]),
          micros: ["duree_convertir"],
        },
        {
          enonce: "Combien de minutes valent ces durées ?\na) $1{,}5$ h\nb) $0{,}2$ h\nc) $2{,}25$ h",
          correction:
            "Une heure, c'est $60$ min. Je regarde ce qui est après la virgule.\na) $0{,}5$ h, c'est une demi-heure : $30$ min. Donc $1{,}5$ h $= 60 + 30 = 90$ min.\nb) $0{,}2$ h, c'est $0{,}2 \\times 60 = 12$ min.\nc) $0{,}25$ h, c'est un quart d'heure : $15$ min. Donc $2{,}25$ h $= 120 + 15 = 135$ min.\n⛔ Le piège : lire $1{,}5$ h comme $1$ h $5$ min. La virgule ne sépare pas les heures des minutes.\nRéponse : a) $90$ min ; b) $12$ min ; c) $135$ min.",
          schema: bande(
            "1 h = 60 min",
            [
              { valeur: 15, label: "15 min" },
              { valeur: 15, label: "15 min" },
              { valeur: 15, label: "15 min" },
              { valeur: 15, label: "15 min" },
            ],
            ["0", "0,25 h", "0,5 h", "0,75 h", "1 h"],
          ),
          micros: ["duree_decimale"],
        },
        {
          enonce: "Sur un panneau de randonnée, on lit : « durée $1{,}2$ h ». Nina dit : « c'est $1$ h $20$ min ». A-t-elle raison ?",
          correction:
            "$1{,}2$ h, c'est $1$ h plus $0{,}2$ h.\n$0{,}2$ h $= 0{,}2 \\times 60 = 12$ min.\nDonc $1{,}2$ h $= 1$ h $12$ min, et non $1$ h $20$ min.\n⭐ En minutes : $1{,}2$ h $= 72$ min, mais $1$ h $20$ min $= 80$ min.\n⛔ Le piège : croire que le chiffre après la virgule donne les minutes. Une heure n'a pas $100$ minutes.\nRéponse : non, Nina se trompe : $1{,}2$ h $= 1$ h $12$ min.",
          schema: ecranSeulement(
            table(["Écriture", "En minutes"], [
              ["1,2 h", "72"],
              ["1 h 20 min", "80"],
            ]),
          ),
          micros: ["duree_decimale"],
        },
        {
          enonce: "a) Une chanson dure $3$ min $45$ s. Écris cette durée en secondes.\nb) Une autre dure $150$ s. Écris-la en minutes et secondes.",
          correction:
            "Une minute, c'est $60$ secondes.\na) $3 \\times 60 = 180$, puis $180 + 45 = 225$ s.\nb) $150 = 2 \\times 60 + 30$ : $2$ min $30$ s.\n⛔ Le piège : écrire « $1$ min $50$ s » pour $150$ s. Une minute a $60$ secondes, pas $100$.\nRéponse : a) $225$ s ; b) $2$ min $30$ s.",
          schema: ecranSeulement(
            bande("225 s", [
              { valeur: 60, label: "1 min" },
              { valeur: 60, label: "1 min" },
              { valeur: 60, label: "1 min" },
              { valeur: 45, label: "45 s", couleur: ORANGE },
            ]),
          ),
          micros: ["duree_convertir"],
        },
        {
          enonce: "Un gâteau doit cuire $45$ minutes. Il doit être prêt à $12$ h $10$. À quelle heure faut-il le mettre au four ?",
          correction:
            "Je recule sur la ligne du temps, depuis $12$ h $10$.\nDe $12$ h $10$ à $12$ h : je recule de $10$ min.\nIl reste à reculer $45 - 10 = 35$ min.\nDe $12$ h, je recule de $35$ min : $11$ h $25$.\n⭐ Je vérifie : de $11$ h $25$ à $12$ h $10$, il y a $35 + 10 = 45$ min.\n⛔ Le piège : écrire « $11$ h $65$ ». Je passe par l'heure pile.\nRéponse : il faut le mettre au four à $11$ h $25$.",
          schema: frise(["11 h 25", "12 h", "12 h 10"], ["35 min", "10 min"], "45 min"),
          micros: ["duree_calculer"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs questions sur une même situation. Je fais une ligne du temps, ou je mets tout dans la même unité.",
      rappel: [
        "$1$ jour $= 24$ h et $1$ semaine $= 7$ jours.",
        "$0{,}5$ h $= 30$ min et $0{,}25$ h $= 15$ min. Pour les autres : je multiplie par $60$.",
        "Pour comparer deux durées, je les écris dans la même unité.",
      ],
      exercices: [
        {
          enonce: "Voici les horaires de deux bus.\na) Combien de temps dure le trajet de la gare à la piscine ?\nb) Léa arrive à la gare à $7$ h $50$. Quel bus prend-elle ? Combien de temps attend-elle ?\nc) Ses cours commencent à $8$ h $30$. Arrive-t-elle à l'heure à l'école ?",
          figure: table(["Arrêt", "Bus A", "Bus B"], [
            ["Gare", "7 h 45", "8 h 15"],
            ["École", "7 h 58", "8 h 28"],
            ["Piscine", "8 h 12", "8 h 42"],
          ]),
          correction:
            "a) Bus A : de $7$ h $45$ à $8$ h $12$.\nDe $7$ h $45$ à $8$ h : $15$ min, puis $12$ min. En tout : $27$ min.\nb) Le bus A est parti à $7$ h $45$ : trop tôt. Elle prend le bus B, à $8$ h $15$.\nDe $7$ h $50$ à $8$ h $15$ : $10 + 15 = 25$ min d'attente.\nc) Le bus B arrive à l'école à $8$ h $28$. C'est $2$ min avant $8$ h $30$ : elle est à l'heure.\n⛔ Le piège : lire la ligne de la piscine au lieu de celle de l'école.\nRéponse : $27$ min ; le bus B, $25$ min d'attente ; oui, de justesse.",
          micros: ["duree_probleme", "duree_defi"],
        },
        {
          enonce: "Tom a cours $5$ jours par semaine. Chaque jour, il a $6$ cours de $55$ minutes.\na) Combien de cours a-t-il par semaine ?\nb) Quelle est la durée totale de ses cours, en minutes ?\nc) Écris cette durée en heures et minutes.",
          correction:
            "a) $5 \\times 6 = 30$ cours.\nb) $30 \\times 55 = 1\\,650$ min.\nc) Je cherche les paquets de $60$ min : $27 \\times 60 = 1\\,620$.\nIl reste $1\\,650 - 1\\,620 = 30$ min.\nDonc $1\\,650$ min $= 27$ h $30$ min.\n⭐ Contrôle : $30$ cours d'un peu moins d'une heure, c'est un peu moins de $30$ h.\n⛔ Le piège : compter $30$ h, comme si un cours durait une heure.\nRéponse : $30$ cours ; $1\\,650$ min ; $27$ h $30$ min.",
          schema: ecranSeulement(
            table(["Calcul", "Résultat"], [
              ["5 × 6", "30 cours"],
              ["30 × 55", "1 650 min"],
              ["27 × 60 + 30", "27 h 30 min"],
            ]),
          ),
          micros: ["duree_probleme", "duree_convertir"],
        },
        {
          enonce: "a) Combien d'heures y a-t-il dans $3$ jours ?\nb) Écris $100$ h en jours et heures.\nc) Écris $45$ jours en semaines et jours.",
          correction:
            "Un jour, c'est $24$ h. Une semaine, c'est $7$ jours.\na) $3 \\times 24 = 72$ h.\nb) $4 \\times 24 = 96$, et $100 - 96 = 4$ : $4$ jours et $4$ h.\nc) $6 \\times 7 = 42$, et $45 - 42 = 3$ : $6$ semaines et $3$ jours.\n⛔ Le piège : diviser par $10$ ou par $100$. Chaque unité a son nombre : $60$, $24$ ou $7$.\nRéponse : a) $72$ h ; b) $4$ jours et $4$ h ; c) $6$ semaines et $3$ jours.",
          schema: ecranSeulement(
            table(["Unité", "vaut"], [
              ["1 min", "60 s"],
              ["1 h", "60 min"],
              ["1 jour", "24 h"],
              ["1 semaine", "7 jours"],
            ]),
          ),
          micros: ["duree_convertir"],
        },
        {
          enonce: "Le GPS annonce un trajet de $2{,}75$ h.\na) Écris cette durée en heures et minutes.\nb) Le départ est à $8$ h $20$. À quelle heure arrive-t-on ?",
          correction:
            "a) $2{,}75$ h, c'est $2$ h plus $0{,}75$ h.\n$0{,}75$ h, ce sont trois quarts d'heure : $3 \\times 15 = 45$ min.\nDonc $2{,}75$ h $= 2$ h $45$ min.\nb) $8$ h $20 + 2$ h $= 10$ h $20$.\nPuis $10$ h $20 + 40$ min $= 11$ h, et encore $5$ min : $11$ h $05$.\n⛔ Le piège : lire $2{,}75$ h comme $2$ h $75$ min.\nRéponse : a) $2$ h $45$ min ; b) on arrive à $11$ h $05$.",
          schema: frise(["8 h 20", "10 h 20", "11 h", "11 h 05"], ["2 h", "40 min", "5 min"], "2 h 45 min"),
          micros: ["duree_decimale", "duree_calculer"],
        },
        {
          enonce: "Chaque semaine, Inès fait $3$ séances de natation de $45$ min. Son frère fait $2$ séances de foot de $1$ h $10$ min. Qui fait le plus de sport ? De combien de minutes ?",
          correction:
            "Je mets tout en minutes.\nInès : $3 \\times 45 = 135$ min.\nSon frère : $1$ h $10$ min $= 70$ min, et $2 \\times 70 = 140$ min.\n$140 - 135 = 5$ min.\n⛔ Le piège : dire « Inès, car elle a plus de séances ». Ce qui compte, c'est la durée totale.\nRéponse : son frère fait $5$ min de plus.",
          schema: table(["Qui", "Calcul", "Total"], [
            ["Inès", "3 × 45 min", "135 min"],
            ["frère", "2 × 70 min", "140 min"],
          ]),
          micros: ["duree_convertir", "duree_probleme"],
        },
        {
          enonce: "Un bateau de nuit part à $21$ h $40$. Il arrive le lendemain à $6$ h $15$. Combien de temps dure la traversée ?",
          correction:
            "Je passe par les heures pile, et par minuit.\nDe $21$ h $40$ à $22$ h : $20$ min.\nDe $22$ h à minuit : $2$ h.\nDe minuit à $6$ h : $6$ h.\nDe $6$ h à $6$ h $15$ : $15$ min.\nEn tout : $2 + 6 = 8$ h, et $20 + 15 = 35$ min.\n⛔ Le piège : calculer de $6$ h $15$ à $21$ h $40$. Le bateau part le soir et passe minuit.\nRéponse : la traversée dure $8$ h $35$ min.",
          schema: frise(["21 h 40", "22 h", "minuit", "6 h", "6 h 15"], ["20 min", "2 h", "6 h", "15 min"], "8 h 35 min"),
          micros: ["duree_defi"],
        },
        {
          enonce: "Pour un gratin, il faut préparer $25$ min, cuire $1$ h $10$ min, puis laisser reposer $15$ min. Jules commence à $17$ h $50$.\na) Combien de temps dure la recette ?\nb) À quelle heure le gratin est-il prêt ?",
          correction:
            "a) J'additionne les minutes : $25 + 10 + 15 = 50$ min. Plus $1$ h : $1$ h $50$ min.\nb) Je place chaque étape sur la ligne du temps.\n$17$ h $50 + 25$ min : $10$ min pour $18$ h, puis $15$ min. Il est $18$ h $15$.\n$18$ h $15 + 1$ h $10$ min $= 19$ h $25$.\n$19$ h $25 + 15$ min $= 19$ h $40$.\n⭐ Contrôle : $17$ h $50 + 1$ h $50$ min $= 19$ h $40$.\n⛔ Le piège : oublier le repos. La recette a TROIS étapes.\nRéponse : a) $1$ h $50$ min ; b) le gratin est prêt à $19$ h $40$.",
          schema: ecranSeulement(frise(["17 h 50", "18 h 15", "19 h 25", "19 h 40"], ["25 min", "1 h 10", "15 min"], "1 h 50 min")),
          micros: ["duree_calculer", "duree_probleme"],
        },
        {
          enonce: "Une course de ski de fond a duré $4\\,000$ secondes. Écris cette durée en heures, minutes et secondes.",
          correction:
            "Une heure, c'est $60 \\times 60 = 3\\,600$ s.\n$4\\,000 - 3\\,600 = 400$ s : il y a $1$ h, et il reste $400$ s.\n$400 = 6 \\times 60 + 40$ : $6$ min et $40$ s.\n⛔ Le piège : diviser par $100$ et écrire « $40$ min ». Il faut passer par $60$, deux fois.\nRéponse : $1$ h $6$ min $40$ s.",
          schema: table(["Étape", "Secondes"], [
            ["1 h", "3 600"],
            ["reste", "400"],
            ["6 min", "360"],
            ["reste", "40"],
          ]),
          micros: ["duree_convertir", "duree_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions qui s'enchaînent. Je fais une ligne du temps, et je réponds par une phrase.",
      rappel: [
        "J'avance par bonds jusqu'aux heures pile, et je passe par minuit si besoin.",
        "Dès $60$ minutes, j'ajoute une heure.",
        "Une durée décimale : je transforme d'abord la partie après la virgule en minutes.",
      ],
      exercices: [
        {
          titre: "Le voyage en train",
          enonce: "Maé voyage en deux trains. Elle change de train à Lyon. Voici les horaires.\na) Combien de temps dure le premier trajet ?\nb) Combien de temps attend-elle à Lyon ?\nc) Combien de temps dure tout le voyage ?\nd) Le premier train a $35$ min de retard. Peut-elle prendre le deuxième train ?",
          figure: table(["Train", "Départ", "Arrivée"], [
            ["1", "7 h 48", "9 h 56"],
            ["2", "10 h 20", "12 h 05"],
          ]),
          correction:
            "a) De $7$ h $48$ à $8$ h : $12$ min. De $8$ h à $9$ h $56$ : $1$ h $56$ min.\nEn tout : $1$ h et $12 + 56 = 68$ min, soit $2$ h $8$ min.\nb) De $9$ h $56$ à $10$ h : $4$ min. Puis jusqu'à $10$ h $20$ : $20$ min. Elle attend $24$ min.\nc) De $7$ h $48$ à $12$ h $05$ : $12$ min, puis $4$ h, puis $5$ min.\nEn tout : $4$ h $17$ min.\nd) Avec le retard : $9$ h $56 + 35$ min $= 10$ h $31$.\nLe deuxième train part à $10$ h $20$ : il est déjà parti.\n⛔ Le piège : écrire « $1$ h $68$ min ». Dès $60$ minutes, j'ajoute une heure.\nRéponse : $2$ h $8$ min ; $24$ min ; $4$ h $17$ min ; non, elle rate le deuxième train.",
          schema: ecranSeulement(frise(["7 h 48", "9 h 56", "10 h 20", "12 h 05"], ["2 h 08", "24 min", "1 h 45"], "4 h 17 min")),
          micros: ["duree_probleme", "duree_defi"],
        },
        {
          titre: "Le marathon",
          enonce: "Un coureur finit un marathon en $3{,}5$ h (un modèle).\na) Écris ce temps en heures et minutes.\nb) Il part à $8$ h $45$. À quelle heure arrive-t-il ?\nc) Son amie met $3$ h $50$ min. Combien de minutes de plus que lui ?\nd) Elle part en même temps. À quelle heure arrive-t-elle ?",
          correction:
            "a) $3{,}5$ h, c'est $3$ h et une demi-heure : $3$ h $30$ min.\nb) $8$ h $45 + 3$ h $= 11$ h $45$.\nPuis $15$ min pour $12$ h, et encore $15$ min : $12$ h $15$.\nc) $3$ h $50$ min $- 3$ h $30$ min $= 20$ min.\nd) Elle arrive $20$ min après lui : $12$ h $15 + 20$ min $= 12$ h $35$.\n⛔ Le piège : lire $3{,}5$ h comme $3$ h $5$ min.\nRéponse : a) $3$ h $30$ min ; b) $12$ h $15$ ; c) $20$ min ; d) $12$ h $35$.",
          schema: frise(["8 h 45", "11 h 45", "12 h", "12 h 15", "12 h 35"], ["3 h", "15 min", "15 min", "20 min"], "3 h 50 min"),
          micros: ["duree_decimale", "duree_calculer", "duree_probleme"],
        },
        {
          titre: "La nuit de Sami",
          enonce: "Sami se couche à $21$ h $45$. Il se lève à $7$ h $10$.\na) Combien de temps dort-il ?\nb) Il dort pareil $5$ nuits de suite. Combien de temps en tout ?\nc) Samedi, il se couche à $23$ h $20$ et dort autant. À quelle heure se réveille-t-il ?",
          correction:
            "a) De $21$ h $45$ à $22$ h : $15$ min. De $22$ h à minuit : $2$ h.\nDe minuit à $7$ h : $7$ h. De $7$ h à $7$ h $10$ : $10$ min.\nEn tout : $9$ h $25$ min.\nb) $5 \\times 9 = 45$ h et $5 \\times 25 = 125$ min.\n$125$ min $= 2$ h $5$ min. En tout : $47$ h $5$ min.\nc) De $23$ h $20$ à minuit : $40$ min.\nIl reste $9$ h $25$ min $- 40$ min $= 8$ h $45$ min.\nIl se réveille à $8$ h $45$.\n⛔ Le piège : oublier de passer par minuit. Après minuit, on repart de $0$ h.\nRéponse : a) $9$ h $25$ min ; b) $47$ h $5$ min ; c) $8$ h $45$.",
          schema: frise(["21 h 45", "22 h", "minuit", "7 h", "7 h 10"], ["15 min", "2 h", "7 h", "10 min"], "9 h 25 min"),
          micros: ["duree_defi", "duree_calculer", "duree_convertir"],
        },
        {
          titre: "La randonnée au refuge",
          enonce: "Une randonnée au refuge : montée $2{,}5$ h, pause $45$ min, descente $1{,}75$ h. Le départ est à $8$ h $50$.\na) Écris la montée et la descente en heures et minutes.\nb) À quelle heure arrive-t-on au refuge ? À quelle heure repart-on ?\nc) À quelle heure est-on de retour ?\nd) Il faut être rentré avant $16$ h. Avec combien d'avance ?",
          correction:
            "a) $2{,}5$ h $= 2$ h $30$ min.\n$1{,}75$ h $= 1$ h $45$ min, car $0{,}75$ h, ce sont trois quarts d'heure.\nb) $8$ h $50 + 2$ h $= 10$ h $50$. Puis $10$ h $50 + 30$ min $= 11$ h $20$.\nAprès la pause : $11$ h $20 + 45$ min $= 12$ h $05$.\nc) $12$ h $05 + 1$ h $45$ min $= 13$ h $50$.\nd) De $13$ h $50$ à $16$ h : $10$ min, puis $2$ h. Soit $2$ h $10$ min d'avance.\n⛔ Le piège : lire $1{,}75$ h comme $1$ h $75$ min.\nRéponse : a) $2$ h $30$ min et $1$ h $45$ min ; b) $11$ h $20$, puis $12$ h $05$.\nc) $13$ h $50$ ; d) $2$ h $10$ min d'avance.",
          schema: frise(["8 h 50", "11 h 20", "12 h 05", "13 h 50"], ["2 h 30", "45 min", "1 h 45"], "5 h"),
          micros: ["duree_decimale", "duree_probleme", "duree_defi"],
        },
      ],
    },
  ],
};
