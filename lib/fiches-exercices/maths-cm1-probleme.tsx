// ─── Fiche d'exercices : résoudre des problèmes (CM1) — 20 exercices corrigés ─
//
// 10/11/2026 : feuille interactive de la notion `probleme` du coach CM1 (6
// micros). Sur la forme de `maths-cm1-fraction.tsx` : 8 ★, 8 ★★, 4 ★★★, un
// rappel avant chaque niveau, corrigés à la première personne, étape par étape,
// avec le piège nommé. Chaque exercice a ses `reponses` (vérifiées sans IA).
//
// Alignée sur la carte mentale `cm1/probleme` (`lib/cartes/remplies/cm1.json`)
// et sur `problemes.bank.ts` : choisir l'opération (ajouter, enlever, répéter,
// partager), problème à une étape, à plusieurs étapes, la phrase réponse, la
// vérification (le résultat est-il possible ?), le défi au schéma en barres.
// ⛔ LIMITES DU CM1 : nombres entiers, les quatre opérations, une division
// avec reste au plus. ⛔ « Rédiger » devient un QCM : choisir LA bonne phrase.
//
// Les pièges nommés : soustraire au lieu de partager (1), ajouter au lieu
// d'enlever (2, 7), une seule opération pour tout (3), une phrase sans la bonne
// unité (4, 15), un résultat impossible (5, 8), oublier le « 3 fois » (6),
// oublier les adultes (9, 18), le reste pris pour le quotient (10), partager
// en deux parts égales (11, 19), le prix des barquettes rapporté au stock
// (12), calculer dans le mauvais ordre (13), oublier une étape (14, 17, 20),
// « 3 fois plus » et « 3 de plus » (16).
//
// ⭐ LES MATHS SONT TRANSVERSALES : jeux (1, 11, 19), transports (2, 9),
// fleuriste, lecture, école, cuisine (3), dessin (4), cinéma (5), randonnée
// (7), apiculture (8), boulangerie (10), marché de Saint-Paul (12, le seul
// décor de La Réunion), ferme (13), natation (14), musée (15), argent de poche
// (16), pâtisserie (17), zoo (18), électricité (20).
// Les métiers : fleuriste, apiculteur, boulanger, marchande, maraîcher,
// nageuse ; dans les problèmes : chef pâtissier (17), accompagnatrice de
// sortie (18), électricienne (20).
// Tous les nombres sont des MODÈLES (aucun fait réel).
//
// Micro-compétences : probleme_choisir_operation (1, 2, 3, 13),
// probleme_une_etape (1, 2, 3, 5, 7, 8, 10), probleme_plusieurs_etapes (6, 9,
// 12, 13, 14, 16, 17, 18, 20), probleme_rediger (4, 15), probleme_verifier (5,
// 8, 15), probleme_defi (11, 17, 18, 19, 20). 6/6.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE } from "@/lib/fiches-exercices/figures";
import { ecranSeulement } from "@/lib/fiches-exercices/dessins-fractions-cm2";

const NOIR = "#0f172a";

/**
 * Un SCHÉMA EN BARRES : une barre par personne, faite de morceaux de longueur
 * `n` (relative), chacun avec son texte. Le texte `total` est écrit à droite,
 * sous une accolade. ⛔ Texte NU (SVG).
 */
const schemaBarres = (lignes: { nom: string; morceaux: { n: number; texte: string; couleur?: string }[] }[], total?: string) => {
  const [x0, L, h, pas] = [56, 190, 26, 36];
  const max = Math.max(...lignes.map((l) => l.morceaux.reduce((s, m) => s + m.n, 0)));
  const H = lignes.length * pas + 8;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label="Schéma en barres">
        {lignes.map((l, i) => {
          const y = 6 + i * pas;
          let x = x0;
          return (
            <g key={i}>
              <text x={x0 - 8} y={y + h / 2 + 5} textAnchor="end" fontSize="14" fontWeight="800" fill={NOIR}>
                {l.nom}
              </text>
              {l.morceaux.map((m, k) => {
                const w = (m.n * L) / max;
                const g = (
                  <g key={k}>
                    <rect x={x} y={y} width={w} height={h} fill={m.couleur ?? (k === 0 ? BLEU : ORANGE)} fillOpacity={0.25} stroke={NOIR} strokeWidth={1.4} />
                    <text x={x + w / 2} y={y + h / 2 + 5} textAnchor="middle" fontSize="13" fontWeight="800" fill={NOIR}>
                      {m.texte}
                    </text>
                  </g>
                );
                x += w;
                return g;
              })}
            </g>
          );
        })}
        {total ? (
          <g>
            <path d={`M ${x0 + L + 8} 6 Q ${x0 + L + 16} 6 ${x0 + L + 16} ${H / 2} Q ${x0 + L + 16} ${H - 2} ${x0 + L + 8} ${H - 2}`} fill="none" stroke={NOIR} strokeWidth={1.6} />
            <text x={x0 + L + 22} y={H / 2 + 5} fontSize="14" fontWeight="900" fill={NOIR}>
              {total}
            </text>
          </g>
        ) : null}
      </svg>
    </div>
  );
};

export const exercicesProblemeCm1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm1",
  notion: "probleme",
  titre: "Résoudre des problèmes",
  accroche:
    "Vingt problèmes, du plus court au défi. Choisir la bonne opération : ajouter, enlever, répéter ou partager. Résoudre en une étape, puis en plusieurs. Choisir la bonne phrase réponse. Vérifier qu'un résultat est possible. Faire un schéma en barres. Des billes, un bus, des pots de miel, un car scolaire, des croissants, un marché, une piscine, un zoo et une électricienne. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=cm1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une opération par problème. Je lis la question avant de calculer.",
      rappel: [
        "Je me demande : on ajoute, on enlève, on répète ou on partage ?",
        "Ajouter : +. Enlever ou chercher l'écart : −. Répéter : ×. Partager en parts égales : ÷.",
        "Je réponds par une phrase, avec l'unité.",
      ],
      exercices: [
        {
          enonce:
            "Yanis partage 24 billes entre 4 amis, de façon égale.\na) Quel calcul faut-il faire ? A) 24 − 4  B) 24 + 4  C) 24 ÷ 4\nb) Combien de billes reçoit chaque ami ?",
          reponses: [
            { question: "a)", attendu: ["C", "24 ÷ 4"], exact: true },
            { question: "b)", attendu: "6" },
          ],
          correction:
            "a) « Partager de façon égale », c'est diviser. Le calcul est $24 \\div 4$ : c'est le C.\nb) Je cherche combien de fois 4 dans 24 : $4 \\times 6 = 24$. Donc $24 \\div 4 = 6$.\nChaque ami reçoit 6 billes.\n⛔ Le piège : faire $24 - 4 = 20$. On n'enlève pas 4 billes : on fait 4 parts.\nRéponse : a) C ; b) 6 billes.",
          micros: ["probleme_choisir_operation", "probleme_une_etape"],
        },
        {
          enonce:
            "Un bus a 38 places. 29 places sont prises.\na) Quel calcul donne le nombre de places libres ? A) 38 − 29  B) 38 + 29  C) 38 × 29\nb) Combien de places sont libres ?",
          reponses: [
            { question: "a)", attendu: ["A", "38 − 29", "38 - 29"], exact: true },
            { question: "b)", attendu: "9" },
          ],
          correction:
            "a) Je cherche ce qui RESTE : j'enlève les places prises. Le calcul est $38 - 29$ : c'est le A.\nb) De 29 à 30 : 1. De 30 à 38 : 8. 1 + 8 = 9.\nIl reste 9 places libres.\n⭐ Je vérifie : $29 + 9 = 38$.\n⛔ Le piège : faire $38 + 29 = 67$. Un bus de 38 places n'a pas 67 places libres.\nRéponse : a) A ; b) 9 places.",
          micros: ["probleme_choisir_operation", "probleme_une_etape"],
        },
        {
          enonce:
            "Trouve chaque réponse.\na) Une fleuriste fait 7 bouquets de 5 roses. Combien de roses ?\nb) Un livre a 120 pages. Sara en a lu 45. Combien de pages lui reste-t-il ?\nc) Une classe a 13 filles et 14 garçons. Combien d'élèves ?\nd) Un cuisinier range 54 œufs par boîtes de 6. Combien de boîtes ?",
          reponses: [
            { question: "a)", attendu: "35" },
            { question: "b)", attendu: "75" },
            { question: "c)", attendu: "27" },
            { question: "d)", attendu: "9" },
          ],
          correction:
            "Pour chaque problème, je choisis d'abord l'opération.\na) 7 bouquets de 5 : on RÉPÈTE. $7 \\times 5 = 35$ roses.\nb) On cherche ce qui RESTE : $120 - 45 = 75$ pages.\nc) On RÉUNIT les filles et les garçons : $13 + 14 = 27$ élèves.\nd) On fait des paquets de 6 : on PARTAGE. $6 \\times 9 = 54$, donc $54 \\div 6 = 9$ boîtes.\n⛔ Le piège : faire une addition partout. Chaque histoire a son opération.\nRéponse : a) 35 roses ; b) 75 pages ; c) 27 élèves ; d) 9 boîtes.",
          micros: ["probleme_choisir_operation", "probleme_une_etape"],
        },
        {
          enonce:
            "Chloé a 12 boîtes de 5 crayons. Elle calcule : 12 × 5 = 60.\na) Quelle phrase réponse est la bonne ? A) Chloé a 17 crayons.  B) Chloé a 60 boîtes.  C) Chloé a 60 crayons.\nb) Combien de crayons a-t-elle ?",
          reponses: [
            { question: "a)", attendu: ["C", "Chloé a 60 crayons"] },
            { question: "b)", attendu: "60" },
          ],
          correction:
            "La question porte sur les CRAYONS. La phrase réponse doit parler de crayons.\na) A) 17, c'est $12 + 5$ : ce n'est pas le bon calcul. B) Elle a 12 boîtes, pas 60. C) $12 \\times 5 = 60$ crayons. C'est le C.\nb) Elle a 60 crayons.\n⛔ Le piège : choisir B. Le nombre 60 est juste, mais l'unité est fausse : ce sont des crayons.\nRéponse : a) C ; b) 60 crayons.",
          micros: ["probleme_rediger"],
        },
        {
          enonce:
            "Tom achète 5 places de cinéma à 8 € chacune. Il trouve 400 €.\na) Ce résultat est-il possible ? Réponds oui ou non.\nb) Combien coûtent les 5 places, en € ?",
          reponses: [
            { question: "a)", attendu: ["non", "faux"] },
            { question: "b)", attendu: "40" },
          ],
          correction:
            "Je me demande si le résultat est possible dans la vraie vie.\na) Une place coûte 8 €. 5 places coûtent moins de 5 × 10 = 50 €. 400 €, c'est beaucoup trop. Non.\nb) $5 \\times 8 = 40$. Les 5 places coûtent 40 €.\n⛔ Le piège : garder un résultat sans le regarder. Tom a ajouté un zéro de trop.\nRéponse : a) non ; b) 40 €.",
          micros: ["probleme_verifier", "probleme_une_etape"],
        },
        {
          enonce:
            "Lina achète 3 cahiers à 2 € chacun et 1 livre à 7 €.\na) Combien coûtent les 3 cahiers, en € ?\nb) Combien paie-t-elle en tout, en € ?",
          reponses: [
            { question: "a)", attendu: "6" },
            { question: "b)", attendu: "13" },
          ],
          correction:
            "Je découpe en deux petites questions.\na) 3 cahiers à 2 € : $3 \\times 2 = 6$ €.\nb) J'ajoute le livre : $6 + 7 = 13$ €.\n⛔ Le piège : faire $3 + 2 + 7 = 12$ €. Il y a 3 FOIS 2 €, pas 3 € de plus.\nRéponse : a) 6 € ; b) 13 €.",
          micros: ["probleme_plusieurs_etapes"],
        },
        {
          enonce:
            "Un randonneur marche 12 km le matin et 9 km l'après-midi.\na) Combien de km marche-t-il dans la journée ?\nb) Combien de km de plus marche-t-il le matin ?",
          reponses: [
            { question: "a)", attendu: "21" },
            { question: "b)", attendu: "3" },
          ],
          correction:
            "a) « Dans la journée » : je réunis les deux marches. $12 + 9 = 21$ km.\nb) « De plus » : je cherche l'ÉCART entre 12 et 9. $12 - 9 = 3$ km.\n⛔ Le piège du b) : faire $12 + 9$. « Combien de plus » se calcule avec une soustraction.\nRéponse : a) 21 km ; b) 3 km.",
          micros: ["probleme_une_etape"],
        },
        {
          enonce:
            "Un apiculteur vend 21 pots de miel à 9 € le pot.\na) Quel résultat est possible ? A) 30 €  B) 189 €  C) 1 890 €\nb) Calcule le prix des 21 pots, en €.",
          reponses: [
            { question: "a)", attendu: ["B", "189 €"] },
            { question: "b)", attendu: "189" },
          ],
          correction:
            "a) J'estime : 21, c'est presque 20. $20 \\times 9 = 180$. Le résultat est proche de 180 : c'est le B.\nA) 30 €, c'est $21 + 9$. C) $1\\,890$ €, c'est dix fois trop.\nb) $21 \\times 9 = 20 \\times 9 + 1 \\times 9 = 180 + 9 = 189$ €.\n⛔ Le piège : choisir A en ajoutant 21 et 9. On répète 9 € vingt et une fois.\nRéponse : a) B ; b) 189 €.",
          micros: ["probleme_verifier", "probleme_une_etape"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux ou trois étapes par problème. Je note chaque étape au brouillon.",
      rappel: [
        "Je découpe le problème en petites questions. Une étape à la fois.",
        "« Fois plus » : je multiplie. « De plus » : j'ajoute.",
        "Dans une division, le reste est toujours plus petit que le diviseur.",
        "À la fin, je vérifie que le résultat est possible.",
      ],
      exercices: [
        {
          enonce:
            "Un car scolaire emmène 3 classes de 26 élèves et 6 adultes.\na) Combien d'élèves y a-t-il ?\nb) Combien de personnes y a-t-il en tout ?\nc) Le car a 90 places. Combien de places restent libres ?",
          reponses: [
            { question: "a)", attendu: "78" },
            { question: "b)", attendu: "84" },
            { question: "c)", attendu: "6" },
          ],
          correction:
            "a) 3 classes de 26 : $3 \\times 26 = 78$ élèves. (3 × 20 = 60 et 3 × 6 = 18.)\nb) J'ajoute les adultes : $78 + 6 = 84$ personnes.\nc) J'enlève les places prises : $90 - 84 = 6$ places libres.\n⛔ Le piège : oublier les 6 adultes. Ils prennent aussi une place.\nRéponse : a) 78 élèves ; b) 84 personnes ; c) 6 places.",
          micros: ["probleme_plusieurs_etapes"],
        },
        {
          enonce:
            "Un boulanger a 154 croissants. Il les met en sachets de 6.\na) Combien de sachets pleins peut-il faire ?\nb) Combien de croissants restent hors des sachets ?",
          reponses: [
            { question: "a)", attendu: "25" },
            { question: "b)", attendu: "4" },
          ],
          correction:
            "Je fais des paquets de 6 : c'est une division, $154 \\div 6$.\nJe cherche le plus grand multiple de 6 sous 154. $6 \\times 25 = 150$, et $6 \\times 26 = 156$, trop grand.\na) Il fait 25 sachets pleins.\nb) $154 - 150 = 4$ croissants restent.\n⭐ Je vérifie : $6 \\times 25 + 4 = 154$, et 4 < 6.\n⛔ Le piège : répondre 4 sachets. 4, c'est le reste, ce qui ne remplit pas un sachet.\nRéponse : a) 25 sachets ; b) 4 croissants.",
          micros: ["probleme_une_etape"],
        },
        {
          enonce:
            "Lou et Max ont 30 cartes à eux deux. Max a 6 cartes de plus que Lou.\na) Combien de cartes a Lou ?\nb) Combien de cartes a Max ?",
          figure: schemaBarres(
            [
              { nom: "Lou", morceaux: [{ n: 12, texte: "?" }] },
              { nom: "Max", morceaux: [{ n: 12, texte: "?" }, { n: 6, texte: "6" }] },
            ],
            "30",
          ),
          reponses: [
            { question: "a)", attendu: "12" },
            { question: "b)", attendu: "18" },
          ],
          correction:
            "Je regarde le schéma. Max a la même part que Lou, plus 6 cartes.\nJ'enlève d'abord les 6 cartes en plus : $30 - 6 = 24$.\nIl reste deux parts égales : $24 \\div 2 = 12$.\na) Lou a 12 cartes.\nb) Max a $12 + 6 = 18$ cartes.\n⭐ Je vérifie : $12 + 18 = 30$, et $18 - 12 = 6$.\n⛔ Le piège : faire $30 \\div 2 = 15$ chacun. Max en a 6 de plus que Lou.\nRéponse : a) 12 cartes ; b) 18 cartes.",
          micros: ["probleme_defi"],
        },
        {
          enonce:
            "Au marché de Saint-Paul, Mme Payet vend des barquettes de letchis à 3 € la barquette. Elle en a 48. Elle en vend 35.\na) Combien d'argent gagne-t-elle, en € ?\nb) Combien de barquettes lui reste-t-il ?",
          reponses: [
            { question: "a)", attendu: "105" },
            { question: "b)", attendu: "13" },
          ],
          correction:
            "a) Elle vend 35 barquettes à 3 € : $35 \\times 3 = 105$ €. (30 × 3 = 90 et 5 × 3 = 15.)\nb) Elle en avait 48 et en vend 35 : $48 - 35 = 13$ barquettes.\n⛔ Le piège du a) : calculer $48 \\times 3 = 144$. Elle n'a pas vendu les 48 barquettes, seulement 35.\nRéponse : a) 105 € ; b) 13 barquettes.",
          micros: ["probleme_plusieurs_etapes"],
        },
        {
          enonce:
            "Un maraîcher a planté 4 rangées de 12 salades. Il en vend 15.\na) Quel calcul donne le nombre de salades qui restent ? A) 4 + 12 − 15  B) 4 × 15 − 12  C) 4 × 12 − 15\nb) Combien de salades restent ?",
          reponses: [
            { question: "a)", attendu: ["C", "4 × 12 − 15", "4 × 12 - 15"], exact: true },
            { question: "b)", attendu: "33" },
          ],
          correction:
            "D'abord, je compte les salades plantées. Puis j'enlève celles vendues.\na) 4 rangées de 12 : $4 \\times 12$. Puis on enlève 15 : $4 \\times 12 - 15$. C'est le C.\nb) $4 \\times 12 = 48$, puis $48 - 15 = 33$ salades.\n⛔ Le piège : choisir A. Il y a 4 FOIS 12 salades, pas 4 + 12.\nRéponse : a) C ; b) 33 salades.",
          micros: ["probleme_choisir_operation", "probleme_plusieurs_etapes"],
        },
        {
          enonce:
            "Une nageuse fait 8 longueurs de 25 m chaque jour. Elle nage 5 jours dans la semaine.\na) Combien de mètres nage-t-elle par jour ?\nb) Combien de mètres nage-t-elle dans la semaine ?",
          reponses: [
            { question: "a)", attendu: "200" },
            { question: "b)", attendu: "1000" },
          ],
          correction:
            "a) 8 longueurs de 25 m : $8 \\times 25 = 200$ m. (4 × 25 = 100, donc 8 × 25 = 200.)\nb) 5 jours de 200 m : $5 \\times 200 = 1\\,000$ m.\n⛔ Le piège : faire $8 \\times 25 = 200$ et s'arrêter. La question b) demande toute la semaine.\nRéponse : a) 200 m ; b) $1\\,000$ m.",
          micros: ["probleme_plusieurs_etapes"],
        },
        {
          enonce:
            "Un musée reçoit 1 250 visiteurs le samedi et 980 le dimanche.\na) Combien de visiteurs pendant le week-end ?\nb) Quelle phrase réponse est la bonne ? A) Le musée a reçu 2 230 visiteurs pendant le week-end.  B) Le musée a reçu 270 visiteurs pendant le week-end.  C) Le week-end dure 2 230 jours.",
          reponses: [
            { question: "a)", attendu: "2230" },
            { question: "b)", attendu: ["A"] },
          ],
          correction:
            "a) Je réunis samedi et dimanche : $1\\,250 + 980$.\n$1\\,250 + 1\\,000 = 2\\,250$, puis j'enlève les 20 de trop : $2\\,230$ visiteurs.\nb) A) parle de visiteurs, avec le bon nombre. B) 270, c'est l'écart, $1\\,250 - 980$. C) n'a pas de sens. C'est le A.\n⛔ Le piège : choisir B. La question demande le TOTAL, pas l'écart.\nRéponse : a) $2\\,230$ visiteurs ; b) A.",
          micros: ["probleme_rediger", "probleme_verifier"],
        },
        {
          enonce:
            "Inès a 15 € d'argent de poche. Son frère a 3 fois plus d'argent qu'elle. Sa sœur a 3 € de plus qu'Inès.\na) Combien a son frère, en € ?\nb) Combien a sa sœur, en € ?\nc) Combien ont-ils à eux trois, en € ?",
          reponses: [
            { question: "a)", attendu: "45" },
            { question: "b)", attendu: "18" },
            { question: "c)", attendu: "78" },
          ],
          correction:
            "a) « 3 fois plus » : je multiplie. $15 \\times 3 = 45$ €.\nb) « 3 € de plus » : j'ajoute. $15 + 3 = 18$ €.\nc) $15 + 45 + 18 = 78$ €.\n⛔ Le piège : confondre « 3 fois plus » et « 3 de plus ». Le frère n'a pas 18 €.\nRéponse : a) 45 € ; b) 18 € ; c) 78 €.",
          micros: ["probleme_plusieurs_etapes"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le problème. Je cherche les étapes, puis je calcule une étape à la fois.",
      rappel: [
        "Je souligne la question. Je garde les nombres utiles.",
        "Un schéma en barres m'aide à voir les parts.",
        "À la fin, je vérifie avec l'opération contraire.",
      ],
      exercices: [
        {
          titre: "Les macarons du chef pâtissier",
          enonce:
            "Le chef pâtissier prépare 8 plateaux de 24 macarons. Il en vend 150. Il range ceux qui restent dans des boîtes de 6.\na) Combien de macarons a-t-il préparés ?\nb) Combien de macarons restent après la vente ?\nc) Combien de boîtes remplit-il ?",
          reponses: [
            { question: "a)", attendu: "192" },
            { question: "b)", attendu: "42" },
            { question: "c)", attendu: "7" },
          ],
          correction:
            "a) 8 plateaux de 24 : $8 \\times 24 = 192$ macarons. (8 × 20 = 160 et 8 × 4 = 32.)\nb) Il en vend 150 : $192 - 150 = 42$ macarons.\nc) Boîtes de 6 : $42 \\div 6 = 7$ boîtes, car $6 \\times 7 = 42$.\n⛔ Le piège : diviser les 192 macarons par 6. On ne range que ceux qui RESTENT.\nRéponse : a) 192 macarons ; b) 42 macarons ; c) 7 boîtes.",
          micros: ["probleme_plusieurs_etapes", "probleme_defi"],
        },
        {
          titre: "La sortie au zoo",
          enonce:
            "Nadia organise une sortie au zoo pour 28 élèves et 4 adultes. Un billet enfant coûte 9 €. Un billet adulte coûte 14 €.\na) Combien coûtent les billets des élèves, en € ?\nb) Combien coûtent les billets des adultes, en € ?\nc) Combien coûte la sortie en tout, en € ?\nd) L'école a 350 €. Combien d'euros restera-t-il ?",
          reponses: [
            { question: "a)", attendu: "252" },
            { question: "b)", attendu: "56" },
            { question: "c)", attendu: "308" },
            { question: "d)", attendu: "42" },
          ],
          correction:
            "a) 28 billets à 9 € : $28 \\times 9 = 252$ €. (28 × 10 = 280, moins 28 : 252.)\nb) 4 billets à 14 € : $4 \\times 14 = 56$ €.\nc) $252 + 56 = 308$ €.\nd) $350 - 308 = 42$ €.\n⭐ Je vérifie : $308 + 42 = 350$.\n⛔ Le piège : oublier les adultes, et croire qu'il reste $350 - 252 = 98$ €.\nRéponse : a) 252 € ; b) 56 € ; c) 308 € ; d) 42 €.",
          micros: ["probleme_plusieurs_etapes", "probleme_defi"],
        },
        {
          titre: "Les billes de Ravi et Noé",
          enonce:
            "Ravi et Noé ont 50 billes à eux deux. Ravi a 10 billes de plus que Noé.\na) Combien de billes a Noé ?\nb) Combien de billes a Ravi ?\nc) Ravi donne 5 billes à Noé. Combien de billes a Noé maintenant ?",
          reponses: [
            { question: "a)", attendu: "20" },
            { question: "b)", attendu: "30" },
            { question: "c)", attendu: "25" },
          ],
          correction:
            "Je dessine un schéma en barres : Ravi a la part de Noé, plus 10.\nJ'enlève les 10 billes en plus : $50 - 10 = 40$.\nIl reste deux parts égales : $40 \\div 2 = 20$.\na) Noé a 20 billes.\nb) Ravi a $20 + 10 = 30$ billes.\nc) Noé reçoit 5 billes : $20 + 5 = 25$ billes.\n⭐ Je vérifie : $20 + 30 = 50$.\n⛔ Le piège : faire $50 \\div 2 = 25$ chacun dès le début. Ils n'ont pas la même chose.\nRéponse : a) 20 billes ; b) 30 billes ; c) 25 billes.",
          schema: ecranSeulement(
            schemaBarres(
              [
                { nom: "Noé", morceaux: [{ n: 20, texte: "20" }] },
                { nom: "Ravi", morceaux: [{ n: 20, texte: "20" }, { n: 10, texte: "10" }] },
              ],
              "50",
            ),
          ),
          micros: ["probleme_defi"],
        },
        {
          titre: "Le chantier de l'électricienne",
          enonce:
            "Sofia est électricienne. Elle pose 6 lampes dans chacune des 9 pièces d'une maison. Une lampe coûte 12 €.\na) Combien de lampes pose-t-elle ?\nb) Combien coûtent toutes les lampes, en € ?\nc) Elle avait commandé 60 lampes. Combien lui en reste-t-il ?",
          reponses: [
            { question: "a)", attendu: "54" },
            { question: "b)", attendu: "648" },
            { question: "c)", attendu: "6" },
          ],
          correction:
            "a) 9 pièces de 6 lampes : $9 \\times 6 = 54$ lampes.\nb) 54 lampes à 12 € : $54 \\times 12 = 54 \\times 10 + 54 \\times 2 = 540 + 108 = 648$ €.\nc) $60 - 54 = 6$ lampes.\n⭐ Je vérifie le b) : 54 lampes, c'est presque 50. $50 \\times 12 = 600$ : 648 est possible.\n⛔ Le piège : calculer le prix des 60 lampes commandées. On paie les lampes posées.\nRéponse : a) 54 lampes ; b) 648 € ; c) 6 lampes.",
          micros: ["probleme_plusieurs_etapes", "probleme_defi"],
        },
      ],
    },
  ],
};
