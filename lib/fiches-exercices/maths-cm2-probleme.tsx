// ─── Fiche d'exercices : les problèmes (CM2) — 20 exercices corrigés ──────────
//
// 10/11/2026 : feuille NOUVELLE, sur la forme des feuilles CM2
// (`maths-cm2-fraction.tsx`, `maths-cm2-tableau.tsx`) : 8 ★, 7 ★★, 5 ★★★, un
// rappel avant chaque niveau, corrigés à la première personne.
//
// Alignée sur la carte mentale remplie (`lib/cartes/remplies/cm2.json`, clé
// `cm2/probleme`) et sur les banques `probleme.bank.ts` et
// `problemes-recherche.bank.ts` : choisir l'opération, problème à une étape,
// à plusieurs étapes, rédiger la réponse, dénombrer, trouver toutes les
// solutions, chercher le minimum ou le maximum, défis.
// ⭐ « RÉDIGER » SANS QUESTION OUVERTE : l'élève CHOISIT la bonne phrase-réponse
// parmi trois (exercices 3, 9, 14, 17) — celle qui reprend la question, avec
// le nombre ET l'unité.
// ⛔ CM2 = AUCUNE question ouverte : nombres, QCM A/B/C (réponses A : 1 b),
// 3 b), 4 b), 14 b), 17 e) ; B : 1 c), 3 a), 9 c), 15 c) ; C : 1 a), 1 d),
// 3 c), 10 a)), oui/non.
// ⛔ Aucun exemple de la carte mentale n'est repris (24 œufs par 6 ; bus de 52
// places ; 3 BD à 8 € ; 2 pains et 3 garnitures ; 12 élèves en équipes ; 30
// enfants et minibus de 8 ; Lou et Sam, 17 ans).
//
// Les pièges nommés : choisir sur un mot-clé (1, 15), calculer avec tous les
// nombres (4), une phrase sans unité ou qui ne répond pas (3, 9, 14, 17),
// s'arrêter à la 1re étape (5, 9, 17), additionner au lieu de multiplier (6,
// 11, 18), s'arrêter à la première solution (7, 12, 19), oublier ceux qui
// restent (8, 17), compter deux fois le même code (11), compter deux fois la
// même paire (18), partager sans enlever l'écart (16), tout compter en
// poules (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES ET LES MÉTIERS NOMBREUX : infirmier (2),
// zoo (4), cinéma (9), boulangère (10), fleuriste (13), randonneur (14),
// parc animalier (17), glacier (18), jardinier (19), fermière (20). Aucun
// contexte réunionnais sur cette feuille. Tout est un MODÈLE.
//
// ⭐ LES DESSINS : l'ARBRE des possibilités (SVG 300 de large, police 14),
// la BANDE de l'écart d'âge, le TABLEAU de toutes les solutions.
//
// Micro-compétences : probleme_choisir_operation (1, 10, 15),
// probleme_une_etape (2, 4, 15), probleme_plusieurs_etapes (5, 9, 14, 17),
// probleme_rediger (3, 9, 14, 17), probleme_denombrement (6, 11, 18),
// probleme_toutes_solutions (7, 12, 18, 19), probleme_optimisation (8, 12,
// 13, 17, 19), probleme_defi (16, 20). 8/8.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

const BLEU = "#2563eb";
const ORANGE = "#ea580c";
const NOIR = "#0f172a";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/**
 * L'ARBRE DES POSSIBILITÉS, sur deux étages : chaque choix du 1er étage
 * (bleu) se ramifie en tous les choix du 2e (orange) ; sous chaque feuille,
 * la possibilité complète. Neuf feuilles au plus (33 px chacune à 300).
 */
const arbre = (etage1: string[], etage2: string[]) => {
  const W = 300;
  const n = etage1.length * etage2.length;
  const pas = W / n;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} 152`} className="block h-auto w-full" role="img" aria-label="Arbre des possibilités">
        <circle cx={W / 2} cy={10} r={5} fill={NOIR} />
        {etage1.map((a, i) => {
          const x1 = pas * etage2.length * (i + 0.5);
          return (
            <g key={a}>
              <line x1={W / 2} y1={12} x2={x1} y2={48} stroke={NOIR} strokeWidth={1.5} />
              <text x={x1} y={66} textAnchor="middle" fontSize="14" fontWeight="800" fill={BLEU}>
                {a}
              </text>
              {etage2.map((b, j) => {
                const x2 = pas * (i * etage2.length + j + 0.5);
                return (
                  <g key={b}>
                    <line x1={x1} y1={72} x2={x2} y2={106} stroke={NOIR} strokeWidth={1.2} />
                    <text x={x2} y={122} textAnchor="middle" fontSize="14" fontWeight="800" fill={ORANGE}>
                      {b}
                    </text>
                    <text x={x2} y={144} textAnchor="middle" fontSize="14" fontWeight="700" fill={NOIR}>
                      {a + b}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/** LA BANDE : des barres faites de morceaux, à la même échelle (le nombre écrit dedans). */
const bandes = (lignes: { nom: string; morceaux: { v: number; label: string; couleur?: string }[] }[]) => {
  const W = 300;
  const gauche = 70;
  const total = Math.max(...lignes.map((l) => l.morceaux.reduce((s, m) => s + m.v, 0)));
  const k = (W - gauche - 6) / total;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} ${lignes.length * 40 + 6}`} className="block h-auto w-full" role="img" aria-label="Bandes">
        {lignes.map((l, i) => {
          let x = gauche;
          const y = 6 + i * 40;
          return (
            <g key={i}>
              <text x={gauche - 6} y={y + 20} textAnchor="end" fontSize="14" fontWeight="700" fill={NOIR}>
                {l.nom}
              </text>
              {l.morceaux.map((m, j) => {
                const w = m.v * k;
                const x0 = x;
                x += w;
                return (
                  <g key={j}>
                    <rect x={x0} y={y} width={w} height={30} fill={m.couleur ?? BLEU} stroke="white" strokeWidth={2} rx={3} />
                    <text x={x0 + w / 2} y={y + 20} textAnchor="middle" fontSize="14" fontWeight="700" fill="white">
                      {m.label}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/** LE TABLEAU DES SOLUTIONS : une ligne par essai, dans l'ordre. */
const liste = (entete: string[], lignes: string[][]) => (
  <div className="mx-auto w-full max-w-[20rem]">
    <table className="mx-auto border-collapse text-sm">
      <thead>
        <tr className="bg-slate-100 text-slate-800">
          {entete.map((t) => (
            <th key={t} className="border border-slate-400 px-2 py-1 font-semibold">
              {t}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {lignes.map((l, i) => (
          <tr key={i}>
            {l.map((c, j) => (
              <td key={j} className="border border-slate-400 px-2 py-1 text-center text-slate-900">
                {c}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const exercicesProblemeCm2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "probleme",
  titre: "Les problèmes",
  accroche:
    "Vingt exercices, du geste seul au problème. Choisir la bonne opération. Résoudre un problème en une étape, puis en plusieurs. Choisir la bonne phrase-réponse. Compter toutes les possibilités, trouver toutes les solutions, chercher le plus petit ou le plus grand. Un infirmier, un zoo, un cinéma, une boulangerie, une fleuriste, une randonnée, un parc animalier, un glacier, un potager et une ferme. Un rappel avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/cm2/probleme", titre: "Les problèmes" }],
  coachHref: "/coach-ia/maths?classe=cm2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Je lis l'histoire, je repère la question, puis je choisis UN calcul.",
      rappel: [
        "On réunit → + ; on enlève → − ; on répète la même quantité → × ; on partage → ÷.",
        "Je n'utilise que les nombres qui servent à répondre à la question.",
        "La phrase-réponse reprend la question, avec le nombre ET l'unité.",
      ],
      exercices: [
        {
          enonce: "Choisis le bon calcul.\na) Un fermier range 48 pommes dans des sachets de 6. Combien de sachets ?\nA : 48 + 6 ; B : 48 × 6 ; C : 48 ÷ 6\nb) Léa a 25 billes. Elle en gagne 17. Combien en a-t-elle maintenant ?\nA : 25 + 17 ; B : 25 − 17 ; C : 25 × 17\nc) Un livre coûte 7 €. Jules en achète 9. Combien paie-t-il ?\nA : 7 + 9 ; B : 7 × 9 ; C : 9 − 7\nd) Un bus a 55 places. 38 sont prises. Combien de places libres ?\nA : 55 ÷ 38 ; B : 55 + 38 ; C : 55 − 38",
          reponses: [
            { question: "a)", attendu: "C" },
            { question: "b)", attendu: "A" },
            { question: "c)", attendu: "B" },
            { question: "d)", attendu: "C" },
          ],
          correction:
            "Je me demande ce qui se passe dans l'histoire.\na) On PARTAGE 48 pommes en paquets de 6 : division. 48 ÷ 6 = 8 sachets. Choix C.\nb) On RÉUNIT les billes de Léa et celles gagnées : addition. 25 + 17 = 42 billes. Choix A.\nc) On RÉPÈTE 9 fois le prix de 7 € : multiplication. 7 × 9 = 63 €. Choix B.\nd) On ENLÈVE les places prises : soustraction. 55 − 38 = 17 places. Choix C.\n⛔ Le piège : choisir sur un seul mot. « Combien » ne dit pas l'opération : c'est l'histoire qui la dit.\nRéponse : a) C ; b) A ; c) B ; d) C.",
          micros: ["probleme_choisir_operation"],
        },
        {
          enonce: "Résous en un seul calcul.\na) Bastien est infirmier. Il fait 6 vaccins par heure pendant 7 heures. Combien de vaccins ?\nb) Un ruban de 96 cm est coupé en 4 morceaux égaux. Combien mesure un morceau, en cm ?\nc) Un train part avec 312 voyageurs. 87 descendent à la gare. Combien restent ?\nd) Une bibliothèque reçoit 145 livres, puis 78 livres. Combien de livres reçus en tout ?",
          reponses: [
            { question: "a)", attendu: "42" },
            { question: "b)", attendu: "24", unite: "cm" },
            { question: "c)", attendu: "225" },
            { question: "d)", attendu: "223" },
          ],
          correction:
            "a) 6 vaccins, 7 fois : je répète. 6 × 7 = 42 vaccins.\nb) Je partage 96 en 4 : 96 ÷ 4 = 24 cm. (Moitié de 96 : 48, moitié de 48 : 24.)\nc) Des voyageurs s'en vont : j'enlève. 312 − 87 = 225 voyageurs.\nd) Je réunis les deux livraisons : 145 + 78 = 223 livres.\n⭐ Je vérifie le c) : 225 + 87 = 312.\n⛔ Le piège du b) : multiplier, 96 × 4. Un morceau est plus PETIT que le ruban entier.\nRéponse : a) 42 ; b) 24 cm ; c) 225 ; d) 223.",
          micros: ["probleme_une_etape"],
        },
        {
          enonce: "Choisis la bonne phrase-réponse.\na) Question : « Combien de kilomètres Sami a-t-il parcourus ? » Le calcul donne 18.\nA : « 18. » ; B : « Sami a parcouru 18 km. » ; C : « Sami a 18 ans. »\nb) Question : « Combien coûte le goûter ? » Le calcul donne 6.\nA : « Le goûter coûte 6 €. » ; B : « Il y a 6 goûters. » ; C : « 6 €. »\nc) Question : « Combien de places restent libres ? » Le calcul donne 15.\nA : « 15 places sont prises. » ; B : « Il y a 15 bus. » ; C : « Il reste 15 places libres. »",
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: "A" },
            { question: "c)", attendu: "C" },
          ],
          correction:
            "Une bonne phrase-réponse reprend les mots de la question, avec le nombre ET l'unité.\na) B reprend « Sami a parcouru » et dit « 18 km ». A n'a pas d'unité. C parle d'âge. Choix B.\nb) A reprend « le goûter coûte » et dit « 6 € ». C n'est pas une phrase. B parle d'autre chose. Choix A.\nc) C reprend « places libres » avec le nombre 15. A dit le contraire : des places prises. Choix C.\n⛔ Le piège : écrire seulement le nombre. « 18 », ce sont des km, des euros, des ans ? Le lecteur ne le sait pas.\nRéponse : a) B ; b) A ; c) C.",
          micros: ["probleme_rediger"],
        },
        {
          enonce: "Au zoo, il y a 3 girafes et 12 singes. L'entrée coûte 9 € par élève. Une classe de 24 élèves visite le zoo.\na) Combien la classe paie-t-elle pour les entrées ?\nb) Quel nombre ne sert pas à répondre au a) ?\nA : 12 ; B : 24 ; C : 9",
          reponses: [
            { question: "a)", attendu: "216" },
            { question: "b)", attendu: "A" },
          ],
          correction:
            "La question parle du prix des entrées. Il me faut le prix d'une entrée et le nombre d'élèves.\na) 24 élèves à 9 € : 24 × 9 = 216 €. (24 × 10 = 240, moins 24 = 216.)\nb) Les girafes et les singes ne servent pas. Parmi les choix, c'est 12 (les singes). Choix A.\n⛔ Le piège : utiliser TOUS les nombres de l'énoncé. 3 et 12 sont là pour raconter le zoo, pas pour calculer.\nRéponse : a) 216 € ; b) A.",
          micros: ["probleme_une_etape", "probleme_choisir_operation"],
        },
        {
          enonce: "Mila achète 4 cahiers à 3 € et un sac à 18 €. Elle paie avec un billet de 50 €.\na) Combien coûtent les 4 cahiers ?\nb) Combien coûtent tous ses achats ?\nc) Combien la vendeuse lui rend-elle ?",
          reponses: [
            { question: "a)", attendu: "12" },
            { question: "b)", attendu: "30" },
            { question: "c)", attendu: "20" },
          ],
          correction:
            "Je cherche ce qui manque, étape par étape.\na) 4 cahiers à 3 € : 4 × 3 = 12 €.\nb) Les cahiers et le sac : 12 + 18 = 30 €.\nc) Elle donne 50 € : 50 − 30 = 20 €.\n⛔ Le piège : s'arrêter en route. 12 € n'est pas le prix de tous les achats : il manque le sac.\nRéponse : a) 12 € ; b) 30 € ; c) 20 €.",
          micros: ["probleme_plusieurs_etapes"],
        },
        {
          enonce: "Compte toutes les possibilités.\na) À la cantine, on choisit 1 sorte de pâtes parmi 2 et 1 sauce parmi 4. Combien de plats différents ?\nb) Zoé a 3 t-shirts (rouge, bleu, vert) et 2 shorts (noir, gris). Combien de tenues différentes ?\nc) Un menu : 1 entrée parmi 3, 1 plat parmi 2, 1 dessert parmi 2. Combien de menus différents ?",
          reponses: [
            { question: "a)", attendu: "8" },
            { question: "b)", attendu: "6" },
            { question: "c)", attendu: "12" },
          ],
          correction:
            "Pour chaque premier choix, je peux prendre TOUS les deuxièmes choix : je multiplie.\na) Chaque sorte de pâtes va avec 4 sauces : 2 × 4 = 8 plats.\nb) Chaque t-shirt va avec 2 shorts : 3 × 2 = 6 tenues. L'arbre les montre toutes : RN, RG, BN, BG, VN, VG.\nc) 3 × 2 = 6 entrées-plats, et chacun va avec 2 desserts : 6 × 2 = 12 menus.\n⛔ Le piège : ADDITIONNER. 3 + 2 = 5 tenues, c'est faux : on en compte 6 sur l'arbre.\nRéponse : a) 8 ; b) 6 ; c) 12.",
          schema: arbre(["R", "B", "V"], ["N", "G"]),
          micros: ["probleme_denombrement"],
        },
        {
          enonce: "18 élèves veulent faire des équipes égales. Chaque équipe a au moins 2 élèves. Il faut au moins 2 équipes.\na) Combien de tailles d'équipes sont possibles ?\nb) Écris toutes les tailles possibles (nombre d'élèves par équipe), séparées par « ; ».",
          reponses: [
            { question: "a)", attendu: "4" },
            { question: "b)", attendu: "2 ; 3 ; 6 ; 9" },
          ],
          correction:
            "J'essaie les tailles une par une, dans l'ordre. Je garde celles qui tombent juste.\n2 élèves : 18 ÷ 2 = 9 équipes. Oui.\n3 élèves : 18 ÷ 3 = 6 équipes. Oui.\n4 et 5 élèves : ça ne tombe pas juste. Non.\n6 élèves : 18 ÷ 6 = 3 équipes. Oui.\n7 et 8 élèves : non.\n9 élèves : 18 ÷ 9 = 2 équipes. Oui.\nPlus de 9 élèves : il n'y aurait qu'une équipe. Non.\na) Il y a 4 tailles possibles.\nb) 2 ; 3 ; 6 ; 9.\n⛔ Le piège : s'arrêter à la première solution. Il y en a quatre.\nRéponse : a) 4 ; b) 2 ; 3 ; 6 ; 9.",
          micros: ["probleme_toutes_solutions"],
        },
        {
          enonce: "a) 50 personnes partent en voyage. Un minibus a 9 places. Combien de minibus faut-il au minimum ?\nb) Une fermière a 40 œufs et des boîtes de 6. Combien de boîtes peut-elle remplir complètement, au maximum ?\nc) Au b), combien d'œufs restent hors des boîtes ?",
          reponses: [
            { question: "a)", attendu: "6" },
            { question: "b)", attendu: "6" },
            { question: "c)", attendu: "4" },
          ],
          correction:
            "a) 9 × 5 = 45 : 5 minibus portent 45 personnes. Il en reste 50 − 45 = 5 à pied ! Il faut un minibus de plus : 6 minibus.\nb) 6 × 6 = 36 et 6 × 7 = 42. 42 dépasse 40 : elle remplit 6 boîtes.\nc) 40 − 36 = 4 œufs restent.\n⭐ Même division, deux réponses : pour le a), personne ne doit rester, donc je prends un minibus de PLUS. Pour le b), seules les boîtes PLEINES comptent.\n⛔ Le piège du a) : répondre 5 minibus. 5 personnes resteraient sur le trottoir.\nRéponse : a) 6 minibus ; b) 6 boîtes ; c) 4 œufs.",
          micros: ["probleme_optimisation"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. J'écris ce que je cherche à chaque étape.",
      rappel: [
        "Je cherche d'abord ce qui manque, étape par étape, puis je réponds à la VRAIE question.",
        "Pour compter des possibilités, je fais un arbre ou une liste rangée.",
        "« De plus » ne veut pas toujours dire + : je relis qui en a le plus.",
      ],
      exercices: [
        {
          enonce: "Un cinéma a 8 rangées de 15 sièges. 87 spectateurs sont assis.\na) Combien de sièges y a-t-il en tout ?\nb) Combien de sièges sont libres ?\nc) Choisis la bonne phrase-réponse au b).\nA : « Il y a 33 spectateurs. » ; B : « Il reste 33 sièges libres. » ; C : « Il y a 120 sièges. »",
          reponses: [
            { question: "a)", attendu: "120" },
            { question: "b)", attendu: "33" },
            { question: "c)", attendu: "B" },
          ],
          correction:
            "a) 8 rangées de 15 : 8 × 15 = 120 sièges.\nb) J'enlève les sièges pris : 120 − 87 = 33 sièges libres.\nc) La question parle des sièges LIBRES. B dit « 33 sièges libres ». A parle de spectateurs, C répond au a). Choix B.\n⛔ Le piège : répondre 120 au b). 120, c'est l'étape d'avant ; la question demande les sièges libres.\nRéponse : a) 120 ; b) 33 ; c) B.",
          micros: ["probleme_plusieurs_etapes", "probleme_rediger"],
        },
        {
          enonce: "Marie est boulangère. Elle cuit 6 plaques de 24 croissants. Elle en vend 130.\na) Quel calcul donne le nombre de croissants cuits ?\nA : 6 + 24 ; B : 24 − 6 ; C : 6 × 24\nb) Combien de croissants a-t-elle cuits ?\nc) Combien de croissants lui restent ?",
          reponses: [
            { question: "a)", attendu: "C" },
            { question: "b)", attendu: "144" },
            { question: "c)", attendu: "14" },
          ],
          correction:
            "a) 24 croissants sur chaque plaque, 6 fois : je répète. 6 × 24. Choix C.\nb) 6 × 24 = 6 × 20 + 6 × 4 = 120 + 24 = 144 croissants.\nc) Elle en vend 130 : 144 − 130 = 14 croissants.\n⛔ Le piège du a) : faire 6 + 24 = 30. On n'ajoute pas les plaques aux croissants : ce ne sont pas les mêmes choses.\nRéponse : a) C ; b) 144 ; c) 14.",
          micros: ["probleme_choisir_operation", "probleme_une_etape"],
        },
        {
          enonce: "Un cadenas a 2 roues. Chaque roue porte les chiffres 1, 2 et 3. Un code, c'est un chiffre sur chaque roue, comme 31.\na) Combien de codes différents y a-t-il ?\nb) Combien de codes ont deux chiffres différents ?",
          reponses: [
            { question: "a)", attendu: "9" },
            { question: "b)", attendu: "6" },
          ],
          correction:
            "Je fais un arbre : 1re roue, puis 2e roue.\na) Chaque chiffre de la 1re roue va avec 3 chiffres de la 2e : 3 × 3 = 9 codes. 11, 12, 13, 21, 22, 23, 31, 32, 33.\nb) J'enlève les codes avec deux fois le même chiffre : 11, 22 et 33. 9 − 3 = 6 codes.\n⛔ Le piège : compter 12 et 21 comme le même code. Pour un cadenas, l'ordre compte : 12 et 21 sont deux codes.\nRéponse : a) 9 ; b) 6.",
          schema: arbre(["1", "2", "3"], ["1", "2", "3"]),
          micros: ["probleme_denombrement"],
        },
        {
          enonce: "Avec des pièces de 5 € et de 2 €, on veut payer 20 € exactement.\na) De combien de façons différentes peut-on payer ?\nb) Quel est le plus petit nombre de pièces possible ?\nc) Quel est le plus grand nombre de pièces possible ?",
          reponses: [
            { question: "a)", attendu: "3" },
            { question: "b)", attendu: "4" },
            { question: "c)", attendu: "10" },
          ],
          correction:
            "J'essaie dans l'ordre le nombre de pièces de 5 €. Le reste doit se payer en pièces de 2 €.\n0 pièce de 5 € : 20 € en pièces de 2 € → 10 pièces. Oui.\n1 pièce de 5 € : reste 15 €. 15 est impair : impossible en pièces de 2 €.\n2 pièces de 5 € : reste 10 € → 5 pièces de 2 €. Oui, 7 pièces.\n3 pièces de 5 € : reste 5 €, impair : impossible.\n4 pièces de 5 € : reste 0 €. Oui, 4 pièces.\na) 3 façons.\nb) Le moins de pièces : 4 pièces de 5 €.\nc) Le plus de pièces : 10 pièces de 2 €.\n⛔ Le piège : s'arrêter à la première façon trouvée. Le tableau rangé montre les 3.\nRéponse : a) 3 ; b) 4 ; c) 10.",
          schema: liste(
            ["pièces de 5 €", "pièces de 2 €", "en tout"],
            [
              ["0", "10", "10 pièces"],
              ["2", "5", "7 pièces"],
              ["4", "0", "4 pièces"],
            ],
          ),
          micros: ["probleme_toutes_solutions", "probleme_optimisation"],
        },
        {
          enonce: "Émilie est fleuriste. Elle a 24 roses et 36 tulipes. Elle fait des bouquets tous pareils et utilise toutes les fleurs.\na) Combien de bouquets peut-elle faire, au maximum ?\nb) Combien de roses dans chaque bouquet ?\nc) Combien de tulipes dans chaque bouquet ?",
          reponses: [
            { question: "a)", attendu: "12" },
            { question: "b)", attendu: "2" },
            { question: "c)", attendu: "3" },
          ],
          correction:
            "Le nombre de bouquets doit partager 24 ET 36 sans reste.\nLes nombres qui partagent 24 : 1, 2, 3, 4, 6, 8, 12, 24.\nLes nombres qui partagent 36 : 1, 2, 3, 4, 6, 9, 12, 18, 36.\nLes deux listes ont en commun : 1, 2, 3, 4, 6, 12. Le plus grand est 12.\na) 12 bouquets.\nb) 24 ÷ 12 = 2 roses par bouquet.\nc) 36 ÷ 12 = 3 tulipes par bouquet.\n⛔ Le piège : choisir 24 bouquets. 36 tulipes ne se partagent pas en 24 bouquets égaux.\nRéponse : a) 12 ; b) 2 ; c) 3.",
          micros: ["probleme_optimisation"],
        },
        {
          enonce: "Un randonneur marche 3 jours : 14 km le 1er jour, 17 km le 2e, 12 km le 3e.\na) Combien de km a-t-il marché en tout ?\nb) Choisis la bonne phrase-réponse au a).\nA : « Le randonneur a marché 43 km en tout. » ; B : « Le randonneur a marché 43 jours. » ; C : « 43. »\nc) Combien de km de plus le 2e jour que le 3e ?",
          reponses: [
            { question: "a)", attendu: "43" },
            { question: "b)", attendu: "A" },
            { question: "c)", attendu: "5" },
          ],
          correction:
            "a) Je réunis les trois jours : 14 + 17 + 12 = 43 km.\nb) A reprend la question avec le nombre et la bonne unité, les km. B se trompe d'unité. C n'a pas d'unité. Choix A.\nc) Je compare : 17 − 12 = 5 km de plus.\n⛔ Le piège du b) : choisir B, avec la mauvaise unité. 43, ce sont des km, pas des jours : il a marché 3 jours.\nRéponse : a) 43 km ; b) A ; c) 5 km.",
          micros: ["probleme_plusieurs_etapes", "probleme_rediger"],
        },
        {
          enonce: "a) Tom a 35 billes. Il a 12 billes de plus que Zoé. Combien Zoé a-t-elle de billes ?\nb) Lucas a 9 €. Il a 6 € de moins qu'Inès. Combien Inès a-t-elle ?\nc) Quel calcul fallait-il faire au a) ?\nA : 35 + 12 ; B : 35 − 12 ; C : 35 × 12",
          reponses: [
            { question: "a)", attendu: "23" },
            { question: "b)", attendu: "15" },
            { question: "c)", attendu: "B" },
          ],
          correction:
            "Je cherche d'abord QUI en a le plus.\na) Tom a 12 billes de plus que Zoé : c'est Tom qui en a le plus. Zoé en a donc 12 de moins : 35 − 12 = 23 billes.\nb) Lucas a 6 € de moins qu'Inès : c'est Inès qui en a le plus. Inès a 6 € de plus : 9 + 6 = 15 €.\nc) Au a), j'ai fait 35 − 12. Choix B.\n⛔ Le piège : voir « de plus » et additionner. Ici, « de plus » cache une soustraction, et « de moins » cache une addition.\nRéponse : a) 23 billes ; b) 15 € ; c) B.",
          micros: ["probleme_choisir_operation", "probleme_une_etape"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un vrai problème. Je fais un dessin ou une liste, j'essaie, puis je vérifie.",
      rappel: [
        "Un dessin (bande, arbre, liste) aide à voir le problème.",
        "Je peux essayer un nombre, vérifier, puis ajuster.",
        "À la fin, je relis la question : ma réponse lui répond-elle ?",
      ],
      exercices: [
        {
          titre: "Les deux âges",
          enonce: "Lina et son petit frère ont 21 ans à eux deux. Lina a 5 ans de plus que son frère.\na) Quel âge a le frère de Lina ?\nb) Quel âge a Lina ?",
          reponses: [
            { question: "a)", attendu: "8" },
            { question: "b)", attendu: "13" },
          ],
          correction:
            "Je dessine deux bandes : celle de Lina est plus longue de 5 ans.\nSi j'enlève les 5 ans d'écart, il reste deux bandes égales : 21 − 5 = 16.\nJe partage en deux : 16 ÷ 2 = 8.\na) Le frère a 8 ans.\nb) Lina a 5 ans de plus : 8 + 5 = 13 ans.\n⭐ Je vérifie : 8 + 13 = 21, et 13 − 8 = 5.\n⛔ Le piège : partager 21 en deux tout de suite. 21 ÷ 2 = 10,5 : les deux auraient le même âge.\nRéponse : a) 8 ans ; b) 13 ans.",
          schema: bandes([
            { nom: "frère", morceaux: [{ v: 8, label: "8" }] },
            { nom: "Lina", morceaux: [{ v: 8, label: "8" }, { v: 5, label: "5", couleur: ORANGE }] },
          ]),
          micros: ["probleme_defi"],
        },
        {
          titre: "La sortie au parc animalier",
          enonce: "52 élèves et 6 adultes vont au parc animalier. Un car a 25 places et coûte 180 €. L'entrée coûte 7 € par élève. Les adultes entrent gratuitement.\na) Combien de personnes partent ?\nb) Combien de cars faut-il au minimum ?\nc) Combien coûtent les cars ?\nd) Combien coûte la sortie en tout (cars et entrées) ?\ne) Choisis la bonne phrase-réponse au d).\nA : « La sortie coûte 904 €. » ; B : « Il faut 904 cars. » ; C : « 904 élèves vont au parc. »",
          reponses: [
            { question: "a)", attendu: "58" },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: "540" },
            { question: "d)", attendu: "904" },
            { question: "e)", attendu: "A" },
          ],
          correction:
            "a) 52 + 6 = 58 personnes.\nb) 2 cars : 2 × 25 = 50 places. Il resterait 58 − 50 = 8 personnes. Il faut un car de plus : 3 cars.\nc) 3 × 180 = 540 €.\nd) Les entrées : 52 × 7 = 364 €. Les adultes ne paient pas. En tout : 540 + 364 = 904 €.\ne) La question demande un prix : A dit « la sortie coûte 904 € ». Choix A.\n⛔ Le piège du b) : répondre 2 cars. 8 personnes resteraient à l'école !\n⛔ Autre piège, au d) : compter l'entrée des 6 adultes. Ils entrent gratuitement.\nRéponse : a) 58 ; b) 3 cars ; c) 540 € ; d) 904 € ; e) A.",
          micros: ["probleme_plusieurs_etapes", "probleme_optimisation", "probleme_rediger"],
        },
        {
          titre: "Chez le glacier",
          enonce: "Chez Tiago, le glacier, on choisit un cornet ou un pot, puis un parfum parmi 4 : vanille, chocolat, fraise, mangue.\na) Combien de glaces différentes à une boule ?\nb) On peut aussi ajouter de la chantilly ou non. Combien de glaces différentes maintenant ?\nc) Léo veut 2 boules de parfums différents (vanille-fraise, c'est comme fraise-vanille). Combien de paires de parfums peut-il choisir ?",
          reponses: [
            { question: "a)", attendu: "8" },
            { question: "b)", attendu: "16" },
            { question: "c)", attendu: "6" },
          ],
          correction:
            "a) 2 choix (cornet ou pot), et pour chacun 4 parfums : 2 × 4 = 8 glaces.\nb) Chacune des 8 glaces peut avoir de la chantilly ou non : 8 × 2 = 16 glaces.\nc) Je fais une liste rangée, sans répéter une paire.\nAvec vanille : VC, VF, VM (3 paires).\nAvec chocolat, sans revenir à la vanille : CF, CM (2 paires).\nAvec fraise : FM (1 paire).\n3 + 2 + 1 = 6 paires.\n⛔ Le piège du c) : compter VF et FV deux fois. Ici, l'ordre ne compte pas : c'est la même glace.\nRéponse : a) 8 ; b) 16 ; c) 6.",
          micros: ["probleme_denombrement", "probleme_toutes_solutions"],
        },
        {
          titre: "Le potager rectangulaire",
          enonce: "Yanis, jardinier, plante 24 salades en rangées égales. Il veut au moins 2 rangées, et au moins 2 salades par rangée.\na) Combien de façons a-t-il de ranger ses salades ?\nb) Quel est le plus grand nombre de rangées possible ?\nc) Peut-il faire 5 rangées égales ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "6" },
            { question: "b)", attendu: "12" },
            { question: "c)", attendu: "non" },
          ],
          correction:
            "J'essaie le nombre de rangées dans l'ordre : 24 doit se partager sans reste.\n2 rangées de 12. 3 rangées de 8. 4 rangées de 6. 6 rangées de 4. 8 rangées de 3. 12 rangées de 2.\n5, 7, 9, 10, 11 rangées : ça ne tombe pas juste. Plus de 12 rangées : moins de 2 salades par rangée.\na) 6 façons.\nb) Le plus de rangées : 12 rangées de 2 salades.\nc) 24 ÷ 5 : 5 × 4 = 20, il reste 4 salades. Non.\n⛔ Le piège : s'arrêter à 2, 3 et 4 rangées. 6, 8 et 12 rangées marchent aussi.\nRéponse : a) 6 ; b) 12 ; c) non.",
          schema: ecranSeulement(
            liste(
              ["rangées", "salades par rangée"],
              [
                ["2", "12"],
                ["3", "8"],
                ["4", "6"],
                ["6", "4"],
                ["8", "3"],
                ["12", "2"],
              ],
            ),
          ),
          micros: ["probleme_toutes_solutions", "probleme_optimisation"],
        },
        {
          titre: "Poules et lapins",
          enonce: "Dans la ferme de Jeanne, il y a des poules et des lapins. Elle compte 10 têtes et 28 pattes.\na) Combien y a-t-il de lapins ?\nb) Combien y a-t-il de poules ?",
          reponses: [
            { question: "a)", attendu: "4" },
            { question: "b)", attendu: "6" },
          ],
          correction:
            "Une poule a 2 pattes, un lapin en a 4. Chaque animal a 1 tête : il y a 10 animaux.\nJ'essaie : si les 10 animaux étaient des poules, il y aurait 10 × 2 = 20 pattes.\nIl manque 28 − 20 = 8 pattes.\nChaque fois que je change une poule en lapin, j'ajoute 2 pattes. 8 ÷ 2 = 4 lapins.\na) 4 lapins.\nb) 10 − 4 = 6 poules.\n⭐ Je vérifie : 4 × 4 = 16 pattes de lapins, 6 × 2 = 12 pattes de poules. 16 + 12 = 28. Et 4 + 6 = 10 têtes.\n⛔ Le piège : oublier qu'on a compté toutes les têtes. Le nombre de lapins et de poules doit faire 10.\nRéponse : a) 4 lapins ; b) 6 poules.",
          micros: ["probleme_defi"],
        },
      ],
    },
  ],
};
