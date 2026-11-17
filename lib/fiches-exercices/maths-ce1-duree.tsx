// ─── Fiche d'exercices : le temps et les durées (CE1) — 20 exercices corrigés ─
//
// 17/11/2026 : la feuille interactive de la notion `duree` du coach CE1
// (« Temps et durées », 8 micros). Sur la forme de `maths-cm1-duree.tsx` :
// 8 ★, 8 ★★, 4 ★★★, un rappel avant chaque niveau, corrigés à la première
// personne, étape par étape, avec le piège nommé. Alignée sur la banque du
// coach (`lib/tutor-v4/questionBank/ce1/maths/duree.bank.ts`).
// ⛔ LIMITES DU CE1 : l'heure entière, la demi-heure et le quart d'heure
// SEULEMENT (pas de minutes de 5 en 5, c'est le CE2) ; h et min ; des durées
// dans la même journée ; le calendrier (semaine, mois).
// ⛔ Aucune question à rédiger : QCM, vrai ou faux, un nombre, un mot.
// ⛔ 6-7 ans : phrases de 16 mots au plus, une idée par phrase.
//
// ⛔ UNE HEURE NE SE TAPE PAS EN TEXTE : le vérificateur lit « 7 h 15 » comme
// le PRODUIT 7 × h × 15 (« 3 h 35 » passerait pour « 7 h 15 »). Les heures se
// répondent donc par la LETTRE d'un QCM, ou par un nombre seul (« sur le … »).
// Une durée demandée « en minutes » se tape en un seul nombre.
//
// Les pièges nommés : les deux aiguilles inversées (1, 2), 1 h = 100 min (3,
// 15), la petite aiguille pile sur le 4 à 4 h 30 (4, 16), 16 h lu comme le
// matin (5, 6), compter 10 − 15 (7), le jour d'après pris pour celui d'avant
// (8), lire 4 h 45 à 3 h 45 (9), compter le jour de départ (10, 19), les
// minutes comptées comme des heures (11), additionner 15 et 30 en heures
// (12), 6 h 75 (13), 2 × 45 = 80 (14), la petite aiguille en retard (16),
// oublier l'après-midi (18), 50 min plus long que 1 h (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : école (5, 7), maison (1, 9), cinéma (7),
// cuisine (11, 17), jardin (12), transports (13), sport (14, 18, 19),
// lecture (20). Les métiers : boulangère (17), maître-nageur (18).
// UN SEUL contexte réunionnais (13, le car jaune, MODÈLE d'horaire).
//
// ⭐ FAITS RÉELS, et leurs sources :
//   · ex. 10 — le 1er décembre 2026 est un mardi, le 25 un vendredi
//     (calendrier grégorien, vérifié par calcul).
//   · ex. 14 — un match de football : deux mi-temps de 45 minutes (Lois du
//     jeu de l'IFAB, loi 7 « Durée du match »).
//   · ex. 13 — le « Car jaune » est le réseau de cars de La Réunion (Région
//     Réunion) ; l'horaire de l'exercice est INVENTÉ.
// Tout le reste est un MODÈLE.
//
// ⭐ LES DESSINS : des horloges à aiguilles (`horloges`), la petite aiguille
// placée EXACTEMENT entre deux nombres selon les minutes ; un cadran sans
// aiguilles quand l'élève doit les placer ; un calendrier de décembre 2026.
//
// Micro-compétences : ce1_duree_lire_heure_demi (1, 2, 9), ce1_duree_positionner_
// aiguilles (4, 16), ce1_duree_matin_apres_midi (5, 6, 15, 18),
// ce1_duree_unites_h_min (2, 3, 14, 15, 20), ce1_duree_calculer_simple (7, 11,
// 17), ce1_duree_ajouter (12, 13, 14, 17, 18), ce1_duree_calendrier (8, 10,
// 19), ce1_duree_defi (17, 18, 19, 20). 8/8.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE } from "@/lib/fiches-exercices/figures";

const NOIR = "#0f172a";
const GRIS = "#64748b";

/**
 * Des horloges à aiguilles côte à côte. `h` et `m` : la petite aiguille avance
 * avec les minutes (à 3 h 45, presque sur le 4). `vide` : le cadran seul, sans
 * aiguilles (pour une question « place les aiguilles »).
 */
const horloges = (liste: { h: number; m: number; label?: string; vide?: boolean }[]) => {
  const [r, larg] = [48, 124];
  const point = (cx: number, cy: number, L: number, deg: number) => {
    const t = (deg * Math.PI) / 180;
    return { x: cx + L * Math.sin(t), y: cy - L * Math.cos(t) };
  };
  return (
    <div className="mx-auto w-full" style={{ maxWidth: `${liste.length * 8}rem` }}>
      <svg viewBox={`0 0 ${liste.length * larg} 138`} className="block h-auto w-full" role="img" aria-label="Horloges à aiguilles">
        {liste.map((c, i) => {
          const [cx, cy] = [larg / 2 + i * larg, 58];
          const petite = point(cx, cy, 26, ((c.h % 12) + c.m / 60) * 30);
          const grande = point(cx, cy, 40, c.m * 6);
          return (
            <g key={i}>
              <circle cx={cx} cy={cy} r={r} fill="#ffffff" stroke={NOIR} strokeWidth={2.5} />
              {Array.from({ length: 60 }, (_, k) => {
                const a = point(cx, cy, r - (k % 5 === 0 ? 6 : 3), k * 6);
                const b = point(cx, cy, r, k * 6);
                return <line key={k} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={NOIR} strokeWidth={k % 5 === 0 ? 1.6 : 0.7} />;
              })}
              {Array.from({ length: 12 }, (_, k) => {
                const p = point(cx, cy, r - 15, (k + 1) * 30);
                return (
                  <text key={k} x={p.x} y={p.y + 4} textAnchor="middle" fontSize="12" fontWeight="700" fill={NOIR}>
                    {k + 1}
                  </text>
                );
              })}
              {c.vide ? null : (
                <>
                  <line x1={cx} y1={cy} x2={petite.x} y2={petite.y} stroke={ORANGE} strokeWidth={5} strokeLinecap="round" />
                  <line x1={cx} y1={cy} x2={grande.x} y2={grande.y} stroke={BLEU} strokeWidth={2.6} strokeLinecap="round" />
                </>
              )}
              <circle cx={cx} cy={cy} r={3.5} fill={NOIR} />
              {c.label ? (
                <text x={cx} y={128} textAnchor="middle" fontSize="13" fontWeight="800" fill={NOIR}>
                  {c.label}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/** Le calendrier de décembre 2026 (le 1er est un mardi), semaine du lundi au dimanche. */
const decembre2026 = (entoure: number[] = []) => {
  const jours = ["lun", "mar", "mer", "jeu", "ven", "sam", "dim"];
  const [larg, haut, x0, y0] = [40, 28, 6, 52];
  const premier = 1; // colonne du 1er : mardi (0 = lundi)
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[15rem]">
      <svg viewBox="0 0 292 222" className="block h-auto w-full" role="img" aria-label="Calendrier de décembre 2026">
        <text x={146} y={18} textAnchor="middle" fontSize="15" fontWeight="900" fill={NOIR}>
          Décembre 2026
        </text>
        {jours.map((j, k) => (
          <text key={j} x={x0 + k * larg + larg / 2} y={42} textAnchor="middle" fontSize="12" fontWeight="800" fill={k >= 5 ? ORANGE : GRIS}>
            {j}
          </text>
        ))}
        {Array.from({ length: 31 }, (_, k) => {
          const pos = premier + k;
          const [c, l] = [pos % 7, Math.floor(pos / 7)];
          const x = x0 + c * larg;
          const y = y0 + l * (haut + 4);
          const n = k + 1;
          return (
            <g key={n}>
              <rect x={x + 2} y={y} width={larg - 4} height={haut} rx={5} fill={entoure.includes(n) ? "#fde68a" : "#f1f5f9"} stroke={entoure.includes(n) ? ORANGE : "#cbd5e1"} strokeWidth={entoure.includes(n) ? 2 : 1} />
              <text x={x + larg / 2} y={y + 19} textAnchor="middle" fontSize="13" fontWeight="800" fill={NOIR}>
                {n}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const exercicesDureeCe1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "ce1",
  notion: "duree",
  titre: "Le temps et les durées",
  accroche:
    "Vingt exercices, du plus simple au problème. Lire l'heure sur une horloge à aiguilles. Placer les aiguilles. Le matin ou l'après-midi. Une heure, c'est 60 minutes. Calculer une durée, lire un calendrier. Une récréation, un gâteau au four, un car, un match, une piscine et des vacances. Un rappel avant chaque niveau. Cherche d'abord. Puis ouvre la correction, étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=ce1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. J'écris la lettre, un nombre ou un mot.",
      rappel: [
        "La petite aiguille montre les heures. La grande aiguille montre les minutes.",
        "Grande aiguille sur le 12 : heure pile. Sur le 6 : et demie. Sur le 3 : et quart.",
        "1 h = 60 min. Une demi-heure = 30 min. Un quart d'heure = 15 min.",
      ],
      exercices: [
        {
          enonce: "Quelle heure est-il ? Écris la lettre.\na) Horloge 1 : A) 3 h B) 12 h 15 C) 12 h\nb) Horloge 2 : A) 6 h 30 B) 7 h 30 C) 7 h",
          figure: horloges([
            { h: 3, m: 0, label: "Horloge 1" },
            { h: 7, m: 30, label: "Horloge 2" },
          ]),
          correction:
            "Je regarde d'abord la grande aiguille, puis la petite.\na) La grande aiguille est sur le 12 : c'est une heure pile. La petite est sur le 3. Il est 3 h. Réponse A.\nb) La grande aiguille est sur le 6 : c'est « et demie ». La petite est entre le 7 et le 8. Il est 7 h 30. Réponse B.\n⛔ Le piège : lire les aiguilles à l'envers, et dire 12 h 15. La petite aiguille donne les heures.\nRéponse : a) A ; b) B.",
          micros: ["ce1_duree_lire_heure_demi"],
          reponses: [
            { question: "a)", attendu: ["A", "A) 3 h"] },
            { question: "b)", attendu: ["B", "B) 7 h 30"] },
          ],
        },
        {
          enonce: "Petite ou grande ?\na) Quelle aiguille montre les heures ?\nb) Quelle aiguille montre les minutes ?",
          figure: horloges([{ h: 10, m: 0 }]),
          correction:
            "Je relis le rappel.\na) La petite aiguille montre les heures. Elle avance lentement.\nb) La grande aiguille montre les minutes. Elle fait le tour en une heure.\n⛔ Le piège : croire que la grande aiguille est la plus importante, donc les heures. C'est l'inverse.\nRéponse : a) la petite ; b) la grande.",
          micros: ["ce1_duree_lire_heure_demi", "ce1_duree_unites_h_min"],
          reponses: [
            { question: "a)", attendu: ["petite", "la petite"] },
            { question: "b)", attendu: ["grande", "la grande"] },
          ],
        },
        {
          enonce: "Complète. Écris seulement le nombre.\na) 1 h = … min\nb) Une demi-heure = … min\nc) Un quart d'heure = … min",
          correction:
            "J'utilise le rappel.\na) 1 h = 60 min.\nb) Une demi-heure, c'est la moitié de 60 : $30 + 30 = 60$. Donc 30 min.\nc) Un quart d'heure, c'est un quart de 60 : $15 + 15 + 15 + 15 = 60$. Donc 15 min.\n⛔ Le piège : croire que 1 h = 100 min. Une heure, c'est 60 minutes.\nRéponse : a) 60 ; b) 30 ; c) 15.",
          micros: ["ce1_duree_unites_h_min"],
          reponses: [
            { question: "a)", attendu: "60" },
            { question: "b)", attendu: "30" },
            { question: "c)", attendu: "15" },
          ],
        },
        {
          enonce: "Il est 4 h 30. Je place les aiguilles.\na) La grande aiguille va sur le …\nb) La petite aiguille va entre le 4 et le …",
          figure: horloges([{ h: 4, m: 30, vide: true }]),
          correction:
            "4 h 30, c'est 4 heures et demie.\na) « Et demie » : la grande aiguille est sur le 6.\nb) La petite aiguille a fait la moitié du chemin entre le 4 et le 5.\n⛔ Le piège : mettre la petite aiguille pile sur le 4. Elle avance pendant l'heure : à 4 h 30, elle est au milieu.\nRéponse : a) 6 ; b) 5.",
          micros: ["ce1_duree_positionner_aiguilles"],
          reponses: [
            { question: "a)", attendu: ["6", "six"] },
            { question: "b)", attendu: ["5", "cinq"] },
          ],
        },
        {
          enonce: "Le matin ou l'après-midi ?\na) Le petit-déjeuner à 7 h\nb) Le goûter à 16 h\nc) L'école commence à 8 h 30.",
          correction:
            "Le matin va de minuit à midi. L'après-midi commence à midi, 12 h.\na) 7 h, c'est avant midi : le matin.\nb) 16 h, c'est après 12 h : l'après-midi.\nc) 8 h 30, c'est avant midi : le matin.\n⛔ Le piège : croire que 16 h est le matin parce qu'il n'y a pas 16 sur l'horloge. Après 12 h, c'est l'après-midi.\nRéponse : a) le matin ; b) l'après-midi ; c) le matin.",
          micros: ["ce1_duree_matin_apres_midi"],
          reponses: [
            { question: "a)", attendu: ["matin", "le matin"] },
            { question: "b)", attendu: ["après-midi", "après midi", "l'après-midi"] },
            { question: "c)", attendu: ["matin", "le matin"] },
          ],
        },
        {
          enonce: "15 h, c'est aussi : A) 3 h de l'après-midi B) 5 h du matin C) 3 h du matin.\nÉcris la lettre.",
          correction:
            "15 h, c'est après midi (12 h).\nDe 12 h à 15 h, il y a 3 heures : $12 + 3 = 15$.\nDonc 15 h, c'est 3 h de l'après-midi. Réponse A.\n⛔ Le piège : choisir 3 h du matin. À 3 h du matin, on dort !\nRéponse : A.",
          micros: ["ce1_duree_matin_apres_midi"],
          reponses: [{ attendu: ["A", "A) 3 h de l'après-midi"] }],
        },
        {
          enonce: "a) La récréation va de 10 h à 10 h 15. Combien de minutes dure-t-elle ?\nb) Le film va de 14 h à 16 h. Combien d'heures dure-t-il ?",
          figure: horloges([
            { h: 10, m: 0, label: "début récré" },
            { h: 10, m: 15, label: "fin récré" },
          ]),
          correction:
            "Je compte du début à la fin.\na) De 10 h à 10 h 15 : la grande aiguille va du 12 au 3. C'est un quart d'heure : 15 min.\nb) De 14 h à 15 h : 1 heure. De 15 h à 16 h : 1 heure. $1 + 1 = 2$ heures.\n⛔ Le piège du a) : répondre 10. Je compte les minutes passées, pas l'heure.\nRéponse : a) 15 ; b) 2.",
          micros: ["ce1_duree_calculer_simple"],
          reponses: [
            { question: "a)", attendu: "15" },
            { question: "b)", attendu: ["2", "deux"] },
          ],
        },
        {
          enonce: "Complète.\na) Une semaine a … jours.\nb) Une année a … mois.\nc) Le jour après mardi, c'est …",
          correction:
            "Je récite les jours : lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche.\na) Je les compte : 7 jours.\nb) Les mois vont de janvier à décembre : 12 mois.\nc) Après mardi vient mercredi.\n⛔ Le piège du c) : répondre lundi. Lundi, c'est le jour AVANT mardi.\nRéponse : a) 7 ; b) 12 ; c) mercredi.",
          micros: ["ce1_duree_calendrier"],
          reponses: [
            { question: "a)", attendu: ["7", "sept"] },
            { question: "b)", attendu: ["12", "douze"] },
            { question: "c)", attendu: ["mercredi"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux étapes. Je compte les minutes avec la grande aiguille.",
      rappel: [
        "Et quart : la grande aiguille sur le 3. Moins le quart : sur le 9.",
        "La petite aiguille avance pendant l'heure. À 3 h 45, elle est presque sur le 4.",
        "Pour une durée, je compte de l'heure de début à l'heure de fin.",
      ],
      exercices: [
        {
          enonce: "Quelle heure est-il ? Écris la lettre.\na) Horloge 1 : A) 4 h 45 B) 3 h 45 C) 9 h 15\nb) Horloge 2 : A) 6 h 15 B) 3 h 30 C) 6 h 45",
          figure: horloges([
            { h: 3, m: 45, label: "Horloge 1" },
            { h: 6, m: 15, label: "Horloge 2" },
          ]),
          correction:
            "a) La grande aiguille est sur le 9 : 45 minutes.\nLa petite aiguille est presque sur le 4, mais pas encore. Il est donc 3 heures passées.\nIl est 3 h 45. Réponse B.\nb) La grande aiguille est sur le 3 : 15 minutes. La petite vient de passer le 6.\nIl est 6 h 15. Réponse A.\n⛔ Le piège du a) : lire 4 h 45. La petite aiguille n'a pas encore atteint le 4.\nRéponse : a) B ; b) A.",
          micros: ["ce1_duree_lire_heure_demi"],
          reponses: [
            { question: "a)", attendu: ["B", "B) 3 h 45"] },
            { question: "b)", attendu: ["A", "A) 6 h 15"] },
          ],
        },
        {
          enonce: "Regarde le calendrier.\na) Quel jour de la semaine est le 25 décembre ?\nb) Aujourd'hui, c'est le 18. Dans combien de jours est le 25 ?",
          figure: decembre2026([18, 25]),
          correction:
            "a) Je trouve le 25 et je monte jusqu'au nom du jour : ven. Le 25 décembre 2026 est un vendredi.\nb) Je compte les bonds du 18 au 25 : 19, 20, 21, 22, 23, 24, 25. Sept bonds.\nOu bien : $25 - 18 = 7$ jours.\n⛔ Le piège du b) : compter les cases avec le 18. Je compte les bonds, pas le jour où je suis.\nRéponse : a) vendredi ; b) 7.",
          micros: ["ce1_duree_calendrier"],
          reponses: [
            { question: "a)", attendu: ["vendredi", "le vendredi"] },
            { question: "b)", attendu: ["7", "sept"] },
          ],
        },
        {
          enonce: "Le gâteau entre au four à 15 h. Il sort à 15 h 45.\nCombien de minutes a-t-il cuit ?",
          figure: horloges([
            { h: 15, m: 0, label: "entrée" },
            { h: 15, m: 45, label: "sortie" },
          ]),
          correction:
            "Je compte de 15 h à 15 h 45.\nLa grande aiguille va du 12 au 9 : trois quarts d'heure.\n$15 + 15 + 15 = 45$ min.\n⛔ Le piège : répondre 15, l'heure. Je compte les minutes passées.\nRéponse : 45.",
          micros: ["ce1_duree_calculer_simple"],
          reponses: [{ attendu: "45" }],
        },
        {
          enonce: "Au jardin, Mamie taille les rosiers un quart d'heure.\nPuis elle arrose une demi-heure.\nCombien de minutes en tout ?",
          correction:
            "Je change chaque durée en minutes.\nUn quart d'heure = 15 min. Une demi-heure = 30 min.\nJ'additionne : $15 + 30 = 45$ min.\n⛔ Le piège : additionner « un quart » et « une demie » sans les changer en minutes.\nRéponse : 45.",
          micros: ["ce1_duree_ajouter"],
          reponses: [{ attendu: "45" }],
        },
        {
          enonce: "Le car jaune part de Saint-Denis à 6 h 45.\nLe trajet dure 30 minutes.\nÀ quelle heure arrive-t-il ? A) 7 h 15 B) 6 h 75 C) 7 h 45",
          correction:
            "Je coupe les 30 minutes en deux morceaux.\nDe 6 h 45 à 7 h : 15 minutes.\nIl reste $30 - 15 = 15$ minutes. De 7 h à 7 h 15 : 15 minutes.\nLe car arrive à 7 h 15. Réponse A.\n⛔ Le piège : écrire 6 h 75. Une heure n'a que 60 minutes : après 6 h 59, c'est 7 h.\nRéponse : A.",
          micros: ["ce1_duree_ajouter"],
          reponses: [{ attendu: ["A", "A) 7 h 15"] }],
        },
        {
          enonce: "Un match de football a deux mi-temps de 45 minutes.\na) Combien de minutes dure le match ?\nb) C'est plus ou moins qu'une heure ?",
          correction:
            "a) J'additionne les deux mi-temps : $45 + 45 = 90$ min.\nb) 1 h = 60 min. 90 est plus que 60.\nLe match dure plus qu'une heure.\n⛔ Le piège : calculer $45 + 45 = 80$. Je compte : $40 + 40 = 80$, puis $5 + 5 = 10$, donc 90.\nRéponse : a) 90 ; b) plus.",
          micros: ["ce1_duree_ajouter", "ce1_duree_unites_h_min"],
          reponses: [
            { question: "a)", attendu: "90" },
            { question: "b)", attendu: ["plus", "plus qu'une heure"] },
          ],
        },
        {
          enonce: "Vrai ou faux ?\na) 1 h = 100 min.\nb) 20 h, c'est le soir.\nc) 13 h, c'est 1 h de l'après-midi.",
          correction:
            "a) 1 h = 60 min, pas 100. Faux.\nb) 20 h, c'est après 12 h, et la nuit tombe : c'est le soir. Vrai.\nc) $12 + 1 = 13$. 13 h, c'est 1 h de l'après-midi. Vrai.\n⛔ Le piège du a) : compter les minutes comme des centimes. Il y a 100 centimes dans 1 €, mais 60 minutes dans 1 h.\nRéponse : a) faux ; b) vrai ; c) vrai.",
          micros: ["ce1_duree_unites_h_min", "ce1_duree_matin_apres_midi"],
          reponses: [
            { question: "a)", attendu: ["faux", "non"] },
            { question: "b)", attendu: ["vrai", "oui"] },
            { question: "c)", attendu: ["vrai", "oui"] },
          ],
        },
        {
          enonce: "Il est 2 h 15. Je place les aiguilles.\na) La grande aiguille va sur le …\nb) La petite aiguille va : A) juste après le 2 B) sur le 3 C) juste avant le 2",
          figure: horloges([{ h: 2, m: 15, vide: true }]),
          correction:
            "2 h 15, c'est 2 heures et quart.\na) « Et quart » : la grande aiguille est sur le 3.\nb) Il est un peu plus de 2 h. La petite aiguille a juste dépassé le 2. Réponse A.\n⛔ Le piège : mettre la petite aiguille sur le 3, à côté de la grande. Le 3 donne les minutes, pas l'heure.\nRéponse : a) 3 ; b) A.",
          micros: ["ce1_duree_positionner_aiguilles"],
          reponses: [
            { question: "a)", attendu: ["3", "trois"] },
            { question: "b)", attendu: ["A", "A) juste après le 2"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le problème. Je coupe la durée en morceaux faciles.",
      rappel: [
        "Je passe par l'heure pile : de 6 h 45 à 7 h, il y a 15 min.",
        "1 h = 60 min. Donc 1 h 30 min = 60 min + 30 min = 90 min.",
        "Sur un calendrier, je compte les bonds d'un jour à l'autre.",
      ],
      exercices: [
        {
          titre: "Le pain de la boulangère",
          enonce: "La boulangère pétrit la pâte de 4 h à 5 h 30.\na) Combien de minutes pétrit-elle ?\nb) Puis le pain cuit 45 minutes. Il sort à : A) 6 h 15 B) 5 h 75 C) 6 h 45",
          correction:
            "a) De 4 h à 5 h : 60 min. De 5 h à 5 h 30 : 30 min.\n$60 + 30 = 90$ min.\nb) Je pars de 5 h 30. De 5 h 30 à 6 h : 30 min.\nIl reste $45 - 30 = 15$ min. De 6 h à 6 h 15.\nLe pain sort à 6 h 15. Réponse A.\n⛔ Le piège du a) : écrire 130 min, en collant 1 et 30. Une heure, c'est 60 minutes.\nRéponse : a) 90 ; b) A.",
          micros: ["ce1_duree_defi", "ce1_duree_ajouter", "ce1_duree_calculer_simple"],
          reponses: [
            { question: "a)", attendu: "90" },
            { question: "b)", attendu: ["A", "A) 6 h 15"] },
          ],
        },
        {
          titre: "La leçon de natation",
          enonce: "Le maître-nageur commence la leçon à 17 h 15.\nElle dure 45 minutes.\na) Elle finit à : A) 17 h 60 B) 18 h C) 18 h 15\nb) C'est le matin ou l'après-midi ?",
          correction:
            "a) De 17 h 15 à 17 h 30 : 15 min. De 17 h 30 à 18 h : 30 min.\n$15 + 30 = 45$ min. La leçon finit à 18 h. Réponse B.\nb) 18 h, c'est après 12 h : l'après-midi.\n⛔ Le piège du a) : écrire 17 h 60. Soixante minutes, c'est une heure de plus : 18 h.\nRéponse : a) B ; b) l'après-midi.",
          micros: ["ce1_duree_defi", "ce1_duree_ajouter", "ce1_duree_matin_apres_midi"],
          reponses: [
            { question: "a)", attendu: ["B", "B) 18 h"] },
            { question: "b)", attendu: ["après-midi", "après midi", "l'après-midi"] },
          ],
        },
        {
          titre: "Le stage de foot",
          enonce: "Le stage de foot commence le lundi 7 décembre.\nIl finit le dimanche 20 décembre.\na) Combien de jours dure le stage ?\nb) Combien de semaines ?",
          figure: decembre2026([7, 20]),
          correction:
            "a) Le stage dure du 7 au 20, et les deux jours comptent.\nPremière semaine : du lundi 7 au dimanche 13, 7 jours.\nDeuxième semaine : du lundi 14 au dimanche 20, 7 jours.\n$7 + 7 = 14$ jours.\nb) 14 jours, c'est 2 semaines de 7 jours.\n⛔ Le piège : calculer $20 - 7 = 13$. Le 7 est un jour de stage, il compte aussi.\nRéponse : a) 14 ; b) 2.",
          micros: ["ce1_duree_calendrier", "ce1_duree_defi"],
          reponses: [
            { question: "a)", attendu: "14" },
            { question: "b)", attendu: ["2", "deux"] },
          ],
        },
        {
          titre: "Qui lit le plus longtemps ?",
          enonce: "Le soir, Lou lit 1 h. Sam lit trois quarts d'heure. Inès lit 50 minutes.\nRange-les du plus long au plus court.\nÉcris les prénoms séparés par « ; ».",
          correction:
            "Je mets toutes les durées en minutes.\nLou : 1 h = 60 min.\nSam : trois quarts d'heure = $15 + 15 + 15 = 45$ min.\nInès : 50 min.\nJe range : 60 > 50 > 45.\nDonc Lou, puis Inès, puis Sam.\n⛔ Le piège : croire que 50 min dure plus que 1 h, parce que 50 est plus grand que 1.\nRéponse : Lou ; Inès ; Sam.",
          micros: ["ce1_duree_defi", "ce1_duree_unites_h_min"],
          reponses: [{ attendu: ["Lou ; Inès ; Sam", "Lou, Inès, Sam", "Lou > Inès > Sam"], ordre: true }],
        },
      ],
    },
  ],
};
