// ─── Fiche d'exercices : les durées (CM2) — 20 exercices corrigés ─────────────
//
// 10/11/2026 : feuille INTERACTIVE du CM2 (une réponse à taper par sous-question,
// vérifiée sans IA), sur la forme de `maths-cm2-tableau.tsx` et de la 6e
// `maths-6e-duree-temps.tsx` (sa ligne du temps `frise`, reprise telle quelle,
// et ses réponses de durée en `exact` avec variantes) : 8 ★, 7 ★★, 5 ★★★, un
// rappel avant chaque niveau, corrigés à la première personne.
//
// Alignée sur la fiche de cours `lib/fiches/maths-cm2-durees.tsx`, la banque
// `lib/tutor-v4/questionBank/cm2/maths/durees.bank.ts` et la carte mentale
// remplie `lib/cartes/remplies/cm2.json` (clé cm2/duree) : lire l'heure sur une
// horloge à aiguilles et sur un écran, placer les aiguilles, convertir (h, min,
// s, jours, semaines), calculer une durée ou un horaire (jusqu'à l'heure pile),
// problèmes, défis (passer minuit, les tours de la grande aiguille).
// ⭐ LA DIFFICULTÉ : le temps ne se compte pas en base dix. 9 h 60 et 15 h 80
// n'existent pas. Chaque niveau y revient.
// ⛔ LIMITES DU CM2 : pas d'écriture décimale des durées (1,5 h), pas de vitesse.
// ⛔ AUCUNE question ouverte (CM2). Bonnes réponses des QCM : C (ex. 2), B
// (ex. 4), A (ex. 20).
// ⛔ Aucun exemple de la fiche de cours ni de la carte mentale n'est repris
// (le gâteau de 16 h 20, 7 h 15 avec la grande aiguille sur le 3, 14:30,
// 90 min, le film de 17 h 40, 3 h 30, 8 h 45 sur l'horloge, 2 h = 120 min,
// 3 min = 180 s, 9 h 40 → 11 h 15, le match de 14 h 30, le train de 7 h 50).
//
// Les pièges nommés : la petite aiguille lue pour les minutes (1), compter les
// minutes de 1 en 1 (2, 3), la petite aiguille pile sur l'heure (4), × 100 au
// lieu de × 60 (5), 125 min = 1 h 25 (6), lire 19 h comme 7 h du matin (7),
// écrire 9 h 60 (8), soustraire des horaires comme des nombres (9), écrire
// 15 h 85 (10), comparer sans convertir (11), 4 min 12 s = 412 s (12), reculer
// sans passer par l'heure pile (13), oublier le temps de repos (14), 24 h
// prises pour 1 jour de stage (15), oublier l'heure d'arrivée (16), 22 h 65
// (17), oublier minuit (18), 225 min = 2 h 25 (19), un tour par heure (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : vie quotidienne (1, 7), sport (8, 12, 15,
// 19), télévision (8), musique (9, répétition), voyage (10, 18), cuisine (14),
// transport (13, 16), cinéma (17), horlogerie (20).
// Les métiers : maître-nageur (8), cheffe d'orchestre (9), pâtissier (14),
// entraîneuse de foot (15), conductrice de car (16), pilote (18), horloger (20).
// ⭐ Un seul décor de La Réunion (ex. 18, le vol Paris – La Réunion).
//
// ⭐ FAITS RÉELS : un vol direct Paris – La Réunion dure environ 11 h (ex. 18,
// horaires des compagnies) ; la grande aiguille fait un tour par heure (ex. 20).
// Tout le reste est un MODÈLE, à des ordres de grandeur vraisemblables.
//
// ⭐ LES DESSINS (aides locales, SVG de viewBox 300, police 14 au moins, sans
// `min-w`) :
//   · `horloge` — une horloge à aiguilles, ses 12 nombres, ses 60 traits ; la
//     petite aiguille (heures) en bleu, la grande (minutes) en orange ;
//   · `troisHorloges` — trois petites horloges A, B, C (les nombres 12, 3, 6,
//     9 et un trait par heure) ; `petite` force l'angle de la petite aiguille
//     (une horloge FAUSSE à reconnaître) ;
//   · `ecran` — l'affichage d'un réveil numérique ;
//   · `frise` — la ligne du temps de la 6e : un bond par étape jusqu'aux
//     heures pile, la durée de chaque bond au-dessus, le total en haut.
//
// Micro-compétences : duree_lire (1, 2, 4, 7), duree_positionner_aiguilles (1,
// 3, 4, 20), duree_convertir (5, 6, 7, 11, 12, 15, 19), duree_calculer (8, 9,
// 10, 13, 14, 16, 17), duree_probleme (12, 14, 15, 16, 17, 18, 19),
// duree_defi (17, 18, 19, 20). 6/6.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

const BLEU = "#2563eb";
const ORANGE = "#ea580c";
const NOIR = "#0f172a";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** Les aiguilles d'une horloge. `petite` force l'angle (en degrés depuis le 12) de la petite aiguille. */
type Aiguilles = { h: number; m: number; petite?: number };

const rad = (deg: number) => (deg * Math.PI) / 180;

/**
 * UN CADRAN : cercle, traits, nombres, aiguilles. `tous` : les 12 nombres et
 * les 60 traits (grande horloge) ; sinon 12, 3, 6, 9 et un trait par heure.
 */
const cadran = (cx: number, cy: number, r: number, a: Aiguilles, tous: boolean) => {
  const aH = a.petite ?? ((a.h % 12) + a.m / 60) * 30;
  const aM = a.m * 6;
  const nombres = tous ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] : [12, 3, 6, 9];
  const rn = r - (tous ? 19 : 17);
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#fff" stroke={NOIR} strokeWidth={2.5} />
      {Array.from({ length: 60 }, (_, k) => k).map((k) => {
        const long = k % 5 === 0;
        if (!tous && !long) return null;
        const t = rad(k * 6);
        const r1 = r - (long ? 8 : 4);
        return (
          <line
            key={k}
            x1={cx + r1 * Math.sin(t)}
            y1={cy - r1 * Math.cos(t)}
            x2={cx + (r - 1.5) * Math.sin(t)}
            y2={cy - (r - 1.5) * Math.cos(t)}
            stroke={NOIR}
            strokeWidth={long ? 2 : 1}
          />
        );
      })}
      {nombres.map((n) => (
        <text key={n} x={cx + rn * Math.sin(rad(n * 30))} y={cy - rn * Math.cos(rad(n * 30)) + 5} textAnchor="middle" fontSize={14} fontWeight={700} fill={NOIR}>
          {n}
        </text>
      ))}
      <line x1={cx} y1={cy} x2={cx + r * 0.48 * Math.sin(rad(aH))} y2={cy - r * 0.48 * Math.cos(rad(aH))} stroke={BLEU} strokeWidth={6} strokeLinecap="round" />
      <line x1={cx} y1={cy} x2={cx + r * 0.78 * Math.sin(rad(aM))} y2={cy - r * 0.78 * Math.cos(rad(aM))} stroke={ORANGE} strokeWidth={3.5} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={4.5} fill={NOIR} />
    </g>
  );
};

/** UNE HORLOGE à aiguilles, grande. ⛔ L'étiquette ne dit pas l'heure : c'est la question. */
const horloge = (h: number, m: number) => (
  <div className="mx-auto w-full max-w-[14rem] print:max-w-[10rem]">
    <svg viewBox="0 0 300 172" className="block h-auto w-full" role="img" aria-label="Une horloge à aiguilles : la petite aiguille bleue, la grande aiguille orange.">
      {cadran(150, 86, 80, { h, m }, true)}
    </svg>
  </div>
);

/** TROIS PETITES HORLOGES A, B, C. ⛔ L'étiquette ne dit pas les heures. */
const troisHorloges = (horloges: [Aiguilles, Aiguilles, Aiguilles]) => (
  <div className="mx-auto w-full max-w-[22rem] print:max-w-[15rem]">
    <svg viewBox="0 0 300 140" className="block h-auto w-full" role="img" aria-label="Trois horloges à aiguilles, A, B et C : la petite aiguille bleue, la grande aiguille orange.">
      {horloges.map((a, i) => (
        <g key={i}>
          {cadran(52 + i * 98, 62, 46, a, false)}
          <text x={52 + i * 98} y={132} textAnchor="middle" fontSize={16} fontWeight={800} fill={NOIR}>
            {["A", "B", "C"][i]}
          </text>
        </g>
      ))}
    </svg>
  </div>
);

/** L'ÉCRAN d'un réveil numérique. */
const ecran = (affichage: string) => (
  <div className="mx-auto w-full max-w-[12rem] print:max-w-[9rem]">
    <svg viewBox="0 0 300 110" className="block h-auto w-full" role="img" aria-label={`Un réveil numérique affiche ${affichage}.`}>
      <rect x={40} y={10} width={220} height={90} rx={14} fill="#0f172a" />
      <text x={150} y={74} textAnchor="middle" fontSize={52} fontWeight={800} fill="#4ade80" fontFamily="monospace">
        {affichage}
      </text>
    </svg>
  </div>
);

/**
 * LA LIGNE DU TEMPS (reprise de `maths-6e-duree-temps.tsx`). Les horaires sur
 * une ligne, également espacés (ce n'est PAS une échelle) ; entre deux
 * horaires, un bond en arc avec sa durée au-dessus ; le total en haut.
 * Les horaires passent sur deux rangs quand ils sont trop serrés.
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

export const exercicesDureeCm2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "duree",
  titre: "Les durées",
  accroche:
    "Vingt exercices, du geste seul au problème. Lire l'heure sur une horloge à aiguilles et sur un réveil. Placer les aiguilles. Convertir des heures, des minutes et des secondes. Calculer une durée ou une heure de fin, en avançant jusqu'à l'heure pile. Une piscine, une répétition, un car scolaire, un film, un vol de nuit, un entraînement. Un rappel avant chaque niveau. Cherche d'abord au brouillon, tape ta réponse, puis ouvre la correction : étape par étape, avec la ligne du temps dessinée.",

  fichesCours: [{ href: "/fiches-cours/maths/cm2/duree", titre: "Les durées" }],
  coachHref: "/coach-ia/maths?classe=cm2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Sur l'horloge, je lis la petite aiguille, puis la grande.",
      rappel: [
        "La petite aiguille (bleue) montre les heures. La grande aiguille (orange) montre les minutes.",
        "La grande aiguille sur le 1 : 5 min ; sur le 2 : 10 min… On compte de 5 en 5.",
        "1 h = 60 min ; 1 min = 60 s ; 1 jour = 24 h.",
        "Un horaire dit QUAND. Une durée dit COMBIEN DE TEMPS.",
      ],
      exercices: [
        {
          enonce: "Lis l'horloge.\na) Quelle heure est-il, le matin ?\nb) Quelle heure est-il, si c'est le soir ?\nc) Sur quel nombre est la grande aiguille ?",
          figure: horloge(10, 25),
          reponses: [
            { question: "a)", attendu: ["10h25", "10:25", "10h25min"], exact: true },
            { question: "b)", attendu: ["22h25", "22:25", "22h25min"], exact: true },
            { question: "c)", attendu: "5" },
          ],
          correction:
            "La petite aiguille est passée après le 10, mais pas encore au 11 : il est 10 h et quelque chose.\nLa grande aiguille est sur le 5. Je compte de 5 en 5 : 5, 10, 15, 20, 25. Donc 25 minutes.\na) Le matin : 10 h 25.\nb) Le soir, j'ajoute 12 heures : 10 + 12 = 22. Il est 22 h 25.\nc) La grande aiguille est sur le 5.\n⛔ Le piège : lire la grande aiguille comme une heure, et dire « 5 h 50 ». La grande aiguille donne les MINUTES.\nRéponse : a) 10 h 25 ; b) 22 h 25 ; c) le 5.",
          micros: ["duree_lire", "duree_positionner_aiguilles"],
        },
        {
          enonce: "Lis les trois horloges.\na) Quelle horloge montre 9 h 15 ? Réponds A, B ou C.\nb) Quelle heure montre l'horloge A ?\nc) Quelle heure montre l'horloge B ?",
          figure: troisHorloges([{ h: 2, m: 45 }, { h: 6, m: 40 }, { h: 9, m: 15 }]),
          reponses: [
            { question: "a)", attendu: "C" },
            { question: "b)", attendu: ["2h45", "2:45", "14h45", "14:45", "2h45min", "14h45min"], exact: true },
            { question: "c)", attendu: ["6h40", "6:40", "18h40", "18:40", "6h40min", "18h40min"], exact: true },
          ],
          correction:
            "Un trait par heure. Pour la grande aiguille, chaque trait vaut 5 minutes.\na) Horloge C : la petite aiguille est juste après le 9, la grande est sur le 3. 3 × 5 = 15 min. Il est 9 h 15.\nb) Horloge A : la grande aiguille est sur le 9. 9 × 5 = 45 min.\nLa petite aiguille est presque sur le 3 : elle n'y est pas encore. Il est donc 2 h 45 (ou 14 h 45).\nc) Horloge B : la grande aiguille est 2 traits après le 6, sur le 8. 8 × 5 = 40 min.\nLa petite aiguille est entre le 6 et le 7. Il est 6 h 40 (ou 18 h 40).\n⛔ Le piège : lire 3 h 45 sur l'horloge A. La petite aiguille approche du 3, mais il n'est pas encore 3 h.\nRéponse : a) C ; b) 2 h 45 ; c) 6 h 40.",
          micros: ["duree_lire"],
        },
        {
          enonce: "Sur quel nombre places-tu la grande aiguille pour montrer cette heure ?\na) 5 h 10\nb) 11 h 35\nc) 3 h 50\nd) 8 h 00",
          reponses: [
            { question: "a)", attendu: "2" },
            { question: "b)", attendu: "7" },
            { question: "c)", attendu: "10" },
            { question: "d)", attendu: "12" },
          ],
          correction:
            "La grande aiguille avance de 5 minutes à chaque nombre. Je divise les minutes par 5.\na) 10 min : 10 ÷ 5 = 2. Sur le 2.\nb) 35 min : 35 ÷ 5 = 7. Sur le 7.\nc) 50 min : 50 ÷ 5 = 10. Sur le 10.\nd) 00 min : l'heure pile. La grande aiguille est en haut, sur le 12.\n⛔ Le piège : mettre la grande aiguille sur le 10 pour 10 minutes. Le nombre 10 de l'horloge veut dire 50 minutes.\nRéponse : a) 2 ; b) 7 ; c) 10 ; d) 12.",
          micros: ["duree_positionner_aiguilles"],
        },
        {
          enonce: "Une seule horloge montre 7 h 30.\na) Laquelle ? Réponds A, B ou C.\nb) Quelle heure montre l'horloge C ?",
          figure: troisHorloges([{ h: 7, m: 30, petite: 210 }, { h: 7, m: 30 }, { h: 6, m: 30 }]),
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: ["6h30", "6:30", "18h30", "18:30", "6h30min", "18h30min"], exact: true },
          ],
          correction:
            "À 7 h 30, la grande aiguille est sur le 6 : 6 × 5 = 30 min.\nLa petite aiguille a fait la moitié du chemin entre le 7 et le 8.\na) A : la petite aiguille est pile sur le 7. C'est faux : à 7 h 30, elle a déjà avancé.\nB : la petite aiguille est au milieu, entre le 7 et le 8. C'est juste.\nC : la petite aiguille est entre le 6 et le 7.\nb) L'horloge C montre donc 6 h 30 (ou 18 h 30).\n⛔ Le piège : choisir A. La petite aiguille avance en même temps que la grande : à la demie, elle est entre deux nombres.\nRéponse : a) B ; b) 6 h 30.",
          micros: ["duree_positionner_aiguilles", "duree_lire"],
        },
        {
          enonce: "Complète.\na) 3 h = … min\nb) 5 min = … s\nc) 2 jours = … h\nd) 1 h 20 min = … min",
          reponses: [
            { question: "a)", attendu: "180" },
            { question: "b)", attendu: "300" },
            { question: "c)", attendu: "48" },
            { question: "d)", attendu: "80" },
          ],
          correction:
            "Une heure, c'est 60 minutes. Une minute, c'est 60 secondes. Un jour, c'est 24 heures.\na) 3 × 60 = 180 min.\nb) 5 × 60 = 300 s.\nc) 2 × 24 = 48 h.\nd) 1 h = 60 min. 60 + 20 = 80 min.\n⛔ Le piège : compter 100 minutes dans une heure, et écrire 3 h = 300 min. Une heure n'a que 60 minutes.\nRéponse : a) 180 min ; b) 300 s ; c) 48 h ; d) 80 min.",
          micros: ["duree_convertir"],
        },
        {
          enonce: "Écris ces durées en heures et minutes.\na) 70 min\nb) 125 min\nc) Et 180 s, combien de minutes ?",
          reponses: [
            { question: "a)", attendu: ["1h10", "1h10min"], exact: true },
            { question: "b)", attendu: ["2h05", "2h5", "2h05min", "2h5min"], exact: true },
            { question: "c)", attendu: "3" },
          ],
          correction:
            "Je fais des paquets de 60 minutes : ce sont les heures.\na) 70 = 60 + 10 : 1 h 10 min.\nb) 125 = 60 + 60 + 5 : 2 h 05 min.\nc) 60 s font 1 min. 180 = 60 + 60 + 60 : 3 min.\n⛔ Le piège : écrire 125 min = 1 h 25 min. Une heure a 60 minutes, pas 100 !\nRéponse : a) 1 h 10 min ; b) 2 h 05 min ; c) 3 min.",
          micros: ["duree_convertir"],
        },
        {
          enonce: "Le réveil de Maëlle affiche cette heure.\na) Est-ce le matin ou le soir ? Écris matin ou soir.\nb) Combien de minutes avant 20 h ?\nc) Trois quarts d'heure, c'est combien de minutes ?",
          figure: ecran("19:45"),
          reponses: [
            { question: "a)", attendu: "soir" },
            { question: "b)", attendu: "15" },
            { question: "c)", attendu: "45" },
          ],
          correction:
            "Avant les deux points : les heures, 19. Après : les minutes, 45. Il est 19 h 45.\na) 19 h, c'est après midi, et 19 − 12 = 7 : 7 h du soir.\nb) De 19 h 45 à 20 h : 60 − 45 = 15 min.\nc) Un quart d'heure, c'est 60 ÷ 4 = 15 min. Trois quarts : 3 × 15 = 45 min.\n⛔ Le piège : lire 19 h comme 7 h du matin. Après 12 h, c'est l'après-midi ou le soir.\nRéponse : a) soir ; b) 15 min ; c) 45 min.",
          micros: ["duree_lire", "duree_convertir"],
        },
        {
          enonce:
            "a) Le cours du maître-nageur commence à 9 h 15 et finit à 10 h 00. Combien de minutes dure-t-il ?\nb) Un dessin animé commence à 17 h 05 et dure 25 min. À quelle heure finit-il ?",
          reponses: [
            { question: "a)", attendu: "45" },
            { question: "b)", attendu: ["17h30", "17:30", "17h30min"], exact: true },
          ],
          correction:
            "a) De 9 h 15 à 10 h, j'avance jusqu'à l'heure pile : 60 − 15 = 45 min.\nb) J'ajoute les minutes : 05 + 25 = 30. Il est 17 h 30.\n⛔ Le piège : écrire « 9 h 60 » pour 10 h. Dès qu'on arrive à 60 minutes, on change d'heure.\nRéponse : a) 45 min ; b) 17 h 30.",
          micros: ["duree_calculer"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Je fais une ligne du temps. J'avance d'abord jusqu'à l'heure pile.",
      rappel: [
        "Pour une durée : je vais du début jusqu'à l'heure pile, puis d'heure en heure, puis le reste.",
        "Je n'écris jamais 60 minutes ou plus : 75 min = 1 h 15 min.",
        "Pour comparer des durées, je les écris toutes en minutes.",
      ],
      exercices: [
        {
          enonce: "La répétition de la cheffe d'orchestre commence à 13 h 45 et finit à 15 h 10. Combien de temps dure-t-elle ?",
          reponses: [
            { attendu: ["1h25", "1h25min", "85min"], exact: true },
          ],
          correction:
            "Je fais une ligne du temps, et j'avance jusqu'aux heures pile.\nDe 13 h 45 à 14 h : 15 min.\nDe 14 h à 15 h : 1 h.\nDe 15 h à 15 h 10 : 10 min.\nEn tout : 1 h et 15 + 10 = 25 min. C'est 1 h 25 min, soit 85 min.\n⛔ Le piège : calculer 15,10 − 13,45. Un horaire n'est pas un nombre à virgule : une heure a 60 minutes.\nRéponse : la répétition dure 1 h 25 min.",
          schema: frise(["13 h 45", "14 h", "15 h", "15 h 10"], ["15 min", "1 h", "10 min"], "1 h 25 min"),
          micros: ["duree_calculer"],
        },
        {
          enonce: "Un bateau part à 14 h 50. La traversée dure 1 h 35 min. À quelle heure arrive-t-il ?",
          reponses: [
            { attendu: ["16h25", "16:25", "16h25min"], exact: true },
          ],
          correction:
            "J'avance par bonds, jusqu'aux heures pile.\nDe 14 h 50 à 15 h : 10 min. Il reste 35 − 10 = 25 min, et 1 h.\nDe 15 h à 16 h : 1 h.\nPuis encore 25 min : 16 h 25.\n⛔ Le piège : ajouter 50 + 35 = 85, et écrire « 15 h 85 ». 85 min, c'est 1 h 25 min.\nRéponse : le bateau arrive à 16 h 25.",
          schema: frise(["14 h 50", "15 h", "16 h", "16 h 25"], ["10 min", "1 h", "25 min"], "1 h 35 min"),
          micros: ["duree_calculer"],
        },
        {
          enonce:
            "Quatre activités du centre de loisirs.\nA : 1 h 15 min. B : 80 min. C : 1 h 05 min. D : trois quarts d'heure.\na) Écris les quatre durées en minutes, dans l'ordre A, B, C, D.\nb) Range les lettres de la plus courte à la plus longue.",
          reponses: [
            { question: "a)", attendu: "75 ; 80 ; 65 ; 45", ordre: true },
            { question: "b)", attendu: "D ; C ; A ; B", ordre: true },
          ],
          correction:
            "Une seule unité : la minute.\na) A : 1 h 15 min = 60 + 15 = 75 min.\nB : 80 min.\nC : 1 h 05 min = 60 + 5 = 65 min.\nD : un quart d'heure = 15 min, donc trois quarts = 3 × 15 = 45 min.\nb) Je range : 45 < 65 < 75 < 80. Donc D, C, A, B.\n⛔ Le piège : croire que A est plus long que B, parce que « 1 h 15 » a l'air grand. En minutes, 75 < 80.\nRéponse : a) 75 ; 80 ; 65 ; 45 ; b) D, C, A, B.",
          micros: ["duree_convertir"],
        },
        {
          enonce:
            "Au cross de l'école, Lina court le 1 000 m en 4 min 12 s. Tom met 250 s.\na) Écris le temps de Lina en secondes.\nb) Qui a été le plus rapide ?",
          reponses: [
            { question: "a)", attendu: "252" },
            { question: "b)", attendu: "Tom" },
          ],
          correction:
            "a) 1 min = 60 s. 4 min = 4 × 60 = 240 s. Puis 240 + 12 = 252 s.\nb) Le plus rapide met le MOINS de temps. 250 < 252 : c'est Tom, de 2 secondes.\n⛔ Le piège : écrire 4 min 12 s = 412 s. Une minute a 60 secondes, pas 100.\nRéponse : a) 252 s ; b) Tom.",
          micros: ["duree_convertir", "duree_probleme"],
        },
        {
          enonce: "Le train arrive à 11 h 10. Le voyage a duré 2 h 25 min. À quelle heure le train est-il parti ?",
          reponses: [
            { attendu: ["8h45", "8:45", "8h45min"], exact: true },
          ],
          correction:
            "Je recule sur la ligne du temps, en passant par les heures pile.\nDe 11 h 10, je recule de 10 min : 11 h.\nJe recule de 2 h : 9 h.\nIl reste 25 − 10 = 15 min à reculer : 8 h 45.\n⭐ Je vérifie en avançant : de 8 h 45 à 11 h 10, il y a 15 min + 2 h + 10 min = 2 h 25 min.\n⛔ Le piège : enlever 25 de 10 sans passer par l'heure pile. Je recule d'abord jusqu'à 11 h.\nRéponse : le train est parti à 8 h 45.",
          schema: frise(["8 h 45", "9 h", "11 h", "11 h 10"], ["15 min", "2 h", "10 min"], "2 h 25 min"),
          micros: ["duree_calculer"],
        },
        {
          enonce:
            "Un pâtissier met un gâteau au four à 10 h 40. La cuisson dure 55 min. Puis le gâteau repose 20 min.\na) À quelle heure le gâteau sort-il du four ?\nb) À quelle heure est-il prêt ?",
          reponses: [
            { question: "a)", attendu: ["11h35", "11:35", "11h35min"], exact: true },
            { question: "b)", attendu: ["11h55", "11:55", "11h55min"], exact: true },
          ],
          correction:
            "a) De 10 h 40 à 11 h : 20 min. Il reste 55 − 20 = 35 min. Le gâteau sort à 11 h 35.\nb) J'ajoute le repos : 11 h 35 + 20 min. 35 + 20 = 55 : il est prêt à 11 h 55.\n⛔ Le piège : oublier le temps de repos. Le gâteau n'est prêt qu'après les deux étapes.\nRéponse : a) 11 h 35 ; b) 11 h 55.",
          micros: ["duree_calculer", "duree_probleme"],
        },
        {
          enonce:
            "L'entraîneuse organise un stage de foot de 5 jours, avec 3 h d'entraînement par jour.\na) Combien d'heures d'entraînement en tout ?\nb) Écris ce total en minutes.\nc) Et 5 jours entiers, combien d'heures ?",
          reponses: [
            { question: "a)", attendu: "15" },
            { question: "b)", attendu: "900" },
            { question: "c)", attendu: "120" },
          ],
          correction:
            "a) 5 jours de 3 h : 5 × 3 = 15 h.\nb) 1 h = 60 min. 15 × 60 = 900 min.\nc) Un jour entier, c'est 24 h. 5 × 24 = 120 h.\n⛔ Le piège : au a), compter 24 h par jour. On ne s'entraîne que 3 h : le reste du jour, on dort, on mange, on va à l'école !\nRéponse : a) 15 h ; b) 900 min ; c) 120 h.",
          micros: ["duree_convertir", "duree_probleme"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je repère le début, la durée ou la fin. Puis je fais la ligne du temps.",
      rappel: [
        "Je souligne les horaires (quand) et les durées (combien de temps).",
        "J'avance jusqu'à l'heure pile, puis j'ajoute le reste.",
        "Après 23 h 59 vient 0 h : c'est minuit, un nouveau jour commence.",
      ],
      exercices: [
        {
          titre: "Le car scolaire",
          enonce:
            "La conductrice du car part à 7 h 35. Le trajet jusqu'à l'école dure 48 min. L'école commence à 8 h 30.\na) À quelle heure le car arrive-t-il à l'école ?\nb) Arrive-t-il à l'heure ? Réponds oui ou non.\nc) Combien de minutes d'avance a-t-il ?",
          reponses: [
            { question: "a)", attendu: ["8h23", "8:23", "8h23min"], exact: true },
            { question: "b)", attendu: "oui" },
            { question: "c)", attendu: "7" },
          ],
          correction:
            "a) De 7 h 35 à 8 h : 25 min. Il reste 48 − 25 = 23 min. Le car arrive à 8 h 23.\nb) 8 h 23, c'est avant 8 h 30 : oui, il est à l'heure.\nc) De 8 h 23 à 8 h 30 : 30 − 23 = 7 min d'avance.\n⛔ Le piège : comparer 48 min et 8 h 30. On compare deux HORAIRES : l'arrivée et le début de l'école.\nRéponse : a) 8 h 23 ; b) oui ; c) 7 min.",
          schema: frise(["7 h 35", "8 h", "8 h 23"], ["25 min", "23 min"], "48 min"),
          micros: ["duree_probleme", "duree_calculer"],
        },
        {
          titre: "La séance de cinéma",
          enonce:
            "Un film commence à 20 h 50. Il dure 2 h 15 min. Juliette se couche 15 min après la fin du film.\na) À quelle heure le film finit-il ?\nb) À quelle heure Juliette se couche-t-elle ?",
          reponses: [
            { question: "a)", attendu: ["23h05", "23h5", "23:05", "23h05min"], exact: true },
            { question: "b)", attendu: ["23h20", "23:20", "23h20min"], exact: true },
          ],
          correction:
            "a) De 20 h 50 à 21 h : 10 min.\nDe 21 h à 23 h : 2 h.\nIl reste 15 − 10 = 5 min : 23 h 05.\nb) 23 h 05 + 15 min : 05 + 15 = 20. Juliette se couche à 23 h 20.\n⛔ Le piège : ajouter 50 + 15 = 65, et écrire « 22 h 65 ». 65 min, c'est 1 h 05 min.\nRéponse : a) 23 h 05 ; b) 23 h 20.",
          schema: frise(["20 h 50", "21 h", "23 h", "23 h 05"], ["10 min", "2 h", "5 min"], "2 h 15 min"),
          micros: ["duree_probleme", "duree_calculer", "duree_defi"],
        },
        {
          titre: "Le vol de nuit",
          enonce:
            "Un avion décolle de Paris à 22 h 40, vers La Réunion. La pilote annonce un vol de 11 h 20 min.\na) Combien de temps de vol avant minuit ?\nb) À quelle heure de Paris l'avion se pose-t-il ?",
          reponses: [
            { question: "a)", attendu: ["1h20", "1h20min", "80min"], exact: true },
            { question: "b)", attendu: ["10h", "10h00", "10:00", "10h00min"], exact: true },
          ],
          correction:
            "a) De 22 h 40 à 23 h : 20 min. De 23 h à minuit : 1 h. Avant minuit : 1 h 20 min, soit 80 min.\nb) Il reste à voler 11 h 20 − 1 h 20 = 10 h.\nMinuit, c'est 0 h : 0 h + 10 h = 10 h du matin, le lendemain.\n⛔ Le piège : écrire 22 h 40 + 11 h 20 = 34 h. Une journée n'a que 24 heures : après minuit, on repart de 0 h.\nRéponse : a) 1 h 20 min ; b) 10 h 00, le lendemain matin.",
          schema: frise(["22 h 40", "0 h", "10 h"], ["1 h 20 min", "10 h"], "11 h 20 min"),
          micros: ["duree_probleme", "duree_defi"],
        },
        {
          titre: "L'entraînement de natation",
          enonce:
            "Emma s'entraîne 45 min par jour, 5 jours par semaine.\na) Combien de minutes s'entraîne-t-elle par semaine ?\nb) Écris ce temps en heures et minutes.\nc) Elle veut s'entraîner 4 h par semaine. Combien de minutes de plus lui faut-il ?",
          reponses: [
            { question: "a)", attendu: "225" },
            { question: "b)", attendu: ["3h45", "3h45min"], exact: true },
            { question: "c)", attendu: "15" },
          ],
          correction:
            "a) 5 × 45 = 225 min.\nb) Je fais des paquets de 60 : 225 = 60 + 60 + 60 + 45. Donc 3 h 45 min.\nc) 4 h = 240 min. 240 − 225 = 15 min.\n⛔ Le piège : lire 225 min comme 2 h 25 min. Je compte les paquets de 60, pas de 100.\nRéponse : a) 225 min ; b) 3 h 45 min ; c) 15 min.",
          micros: ["duree_probleme", "duree_convertir", "duree_defi"],
        },
        {
          titre: "Les tours de la grande aiguille",
          enonce:
            "Chez l'horloger, une horloge indique 9 h 50.\na) Quelle heure sera-t-il dans 25 min ?\nb) Sur quel nombre sera alors la grande aiguille ?\nc) De 8 h à 11 h, combien de tours complets fait la grande aiguille ? A) 3   B) 12   C) 36. Réponds par A, B ou C.",
          reponses: [
            { question: "a)", attendu: ["10h15", "10:15", "10h15min"], exact: true },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: "A" },
          ],
          correction:
            "a) De 9 h 50 à 10 h : 10 min. Il reste 25 − 10 = 15 min : 10 h 15.\nb) 15 min : 15 ÷ 5 = 3. La grande aiguille est sur le 3.\nc) La grande aiguille fait un tour complet en 60 min, donc un tour par heure.\nDe 8 h à 11 h, il y a 3 h : elle fait 3 tours.\n⛔ Le piège : choisir B, 12 tours. 12, ce sont les nombres du cadran, pas les tours.\nRéponse : a) 10 h 15 ; b) le 3 ; c) A.",
          micros: ["duree_defi", "duree_positionner_aiguilles"],
        },
      ],
    },
  ],
};
