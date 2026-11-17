// ─── Fiche d'exercices : lire l'heure (CP) — 20 exercices corrigés ────────────
//
// 17/11/2026 : la feuille interactive de la notion `duree` du coach CP,
// « Repérage dans le temps » (5 micros). Sur la forme de `maths-cm1-masse.tsx` :
// 8 ★, 8 ★★, 4 ★★★, un rappel avant chaque niveau, corrigés à la première
// personne, étape par étape, avec le piège nommé. Alignée sur la banque du
// coach (`lib/tutor-v4/questionBank/cp/maths/duree.bank.ts`).
// ⛔ LIMITES DU CP (BO n° 41 du 31/10/2024) : des HEURES ENTIÈRES seulement,
// jusqu'à 12 sur le cadran. Pas de demi-heure, pas de minute, aucune durée à
// calculer (tout cela arrive au CE1). « L'heure juste après / juste avant »
// reste permise : c'est ranger les heures, comme la banque.
// ⛔ Aucune question à rédiger : QCM par lettre, un nombre, un mot.
// ⛔ Phrases de 14 mots au plus, une idée par phrase : un CP lit mal.
//
// Les pièges nommés : lire la grande aiguille (1, 10, 16), croire que la
// grande aiguille donne l'heure (2, 7), les aiguilles inversées (3, 20),
// « se coucher le matin » (4), ranger dans l'ordre de la liste (5, 13), écrire
// 13 sur le cadran (6), oublier la petite aiguille (8), la plus grande heure
// arrive la première (9), la petite sur le 12 (11), le même 7 matin et soir
// (12, 18), juste avant = juste après (14), 9 heures du soir = école (15),
// l'horloge qui avance (17), une heure après = la même heure (19).
//
// ⭐ LES MATHS SONT TRANSVERSALES : boulangerie (8), piscine (9), maison
// (12, 15), jardin (13), cinéma (14), salon (17), école (18),
// caserne (19), réveil (20). Les métiers : boulangère (8), jardinier (13),
// pompière (19). AUCUN contexte réunionnais sur cette feuille (règle : ≈ 1 sur
// 20, il est sur la feuille « monnaie » du même lot).
//
// ⭐ FAITS RÉELS : à midi (et à minuit), les deux aiguilles sont sur le 12 ;
// la petite aiguille fait deux tours par jour, donc chaque heure du cadran
// revient deux fois. Tout le reste (horaires, journées) est un MODÈLE.
//
// ⭐ LES DESSINS : des horloges à aiguilles (`horloges`), petite aiguille
// ORANGE et épaisse, grande aiguille BLEUE et fine, AUCUNE heure écrite en
// chiffres sous le cadran ; des cartes de moments de la journée (`moments`).
//
// Micro-compétences : cp_duree_lire_heure (1, 7, 8, 9, 10, 13, 16, 17),
// cp_duree_placer_aiguilles (2, 3, 7, 11, 20), cp_duree_jour_semaine (4, 8, 12,
// 15, 18), cp_duree_ordonner (5, 6, 9, 13, 14, 19), cp_duree_defi (17, 18, 19,
// 20). 5/5.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE } from "@/lib/fiches-exercices/figures";

const NOIR = "#0f172a";
const GRIS = "#64748b";

/**
 * Des horloges à aiguilles côte à côte. `petite` : le nombre que montre la
 * petite aiguille (1 à 12) ; `grande` : celui de la grande (12 par défaut,
 * l'heure pile). Une `grande` autre que 12 ne sert qu'aux aiguilles INVERSÉES
 * (le piège). `nom` : la lettre ou le prénom sous le cadran. ⛔ Jamais l'heure
 * écrite en chiffres : elle donnerait la réponse.
 */
const horloges = (liste: { petite: number; grande?: number; nom?: string }[]) => {
  const [CW, CH, R] = [120, 134, 48];
  const pt = (cx: number, cy: number, L: number, n: number) => {
    const a = ((n % 12) * 30 * Math.PI) / 180;
    return { x: cx + L * Math.sin(a), y: cy - L * Math.cos(a) };
  };
  const largeur = ["max-w-[9rem]", "max-w-[15rem]", "max-w-[21rem]", "max-w-[24rem]"][Math.min(liste.length, 4) - 1];
  return (
    <div className={`mx-auto w-full ${largeur} print:max-w-[14rem]`}>
      <svg viewBox={`0 0 ${CW * liste.length} ${CH}`} className="block h-auto w-full" role="img" aria-label="Horloges à aiguilles">
        {liste.map((c, i) => {
          const [cx, cy] = [CW / 2 + i * CW, 58];
          const p = pt(cx, cy, 21, c.petite);
          const g = pt(cx, cy, 30, c.grande ?? 12);
          return (
            <g key={i}>
              <circle cx={cx} cy={cy} r={R} fill="#ffffff" stroke={NOIR} strokeWidth={2.5} />
              {Array.from({ length: 12 }, (_, k) => {
                const a = pt(cx, cy, R - 6, k + 1);
                const b = pt(cx, cy, R, k + 1);
                const t = pt(cx, cy, R - 13, k + 1);
                return (
                  <g key={k}>
                    <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={NOIR} strokeWidth={1.6} />
                    <text x={t.x} y={t.y + 4.5} textAnchor="middle" fontSize="12.5" fontWeight="800" fill={NOIR}>
                      {k + 1}
                    </text>
                  </g>
                );
              })}
              <line x1={cx} y1={cy} x2={g.x} y2={g.y} stroke={BLEU} strokeWidth={3} strokeLinecap="round" />
              <line x1={cx} y1={cy} x2={p.x} y2={p.y} stroke={ORANGE} strokeWidth={6} strokeLinecap="round" />
              <circle cx={cx} cy={cy} r={3.5} fill={NOIR} />
              {c.nom ? (
                <text x={cx} y={126} textAnchor="middle" fontSize="15" fontWeight="800" fill={GRIS}>
                  {c.nom}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/** Des cartes de moments : un dessin (emoji), un mot, une lettre. */
const moments = (liste: { lettre: string; dessin: string; mot: string }[]) => (
  <div className="mx-auto w-full max-w-[21rem] print:max-w-[14rem]">
    <svg viewBox={`0 0 ${liste.length * 104} 112`} className="block h-auto w-full" role="img" aria-label="Cartes des moments de la journée">
      {liste.map((m, i) => (
        <g key={i}>
          <rect x={6 + i * 104} y={6} width={92} height={100} rx={12} fill="#f8fafc" stroke={NOIR} strokeWidth={1.8} />
          <text x={52 + i * 104} y={30} textAnchor="middle" fontSize="17" fontWeight="900" fill={ORANGE}>
            {m.lettre}
          </text>
          <text x={52 + i * 104} y={66} textAnchor="middle" fontSize="30">
            {m.dessin}
          </text>
          <text x={52 + i * 104} y={94} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={NOIR}>
            {m.mot}
          </text>
        </g>
      ))}
    </svg>
  </div>
);

export const exercicesDureeCp: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cp",
  notion: "duree",
  titre: "Lire l'heure",
  accroche:
    "Vingt exercices pour lire l'heure. La petite aiguille montre l'heure. La grande aiguille est sur le 12. On place les aiguilles, on range les moments de la journée. Une boulangère, un jardinier, une pompière et un réveil mal réglé. Un rappel avant chaque niveau. Cherche d'abord. Puis ouvre la correction.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=cp",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Je regarde d'abord la petite aiguille. J'écris le nombre seul.",
      rappel: [
        "La petite aiguille (orange) montre l'heure.",
        "La grande aiguille (bleue) est sur le 12 : c'est l'heure pile.",
        "Le matin, on se lève. À midi, on mange. Le soir, on se couche.",
      ],
      exercices: [
        {
          enonce: "Quelle heure est-il ?\nÉcris le nombre d'heures sous chaque horloge.",
          figure: horloges([
            { petite: 3, nom: "a" },
            { petite: 9, nom: "b" },
            { petite: 6, nom: "c" },
          ]),
          correction:
            "Je regarde la petite aiguille, l'orange. La grande est sur le 12.\na) La petite aiguille est sur le 3. Il est 3 heures.\nb) La petite aiguille est sur le 9. Il est 9 heures.\nc) La petite aiguille est sur le 6. Il est 6 heures.\n⛔ Le piège : lire la grande aiguille, et dire « 12 heures ». La grande aiguille ne donne pas l'heure.\nRéponse : a) 3 ; b) 9 ; c) 6.",
          micros: ["cp_duree_lire_heure"],
          reponses: [
            { question: "a)", attendu: ["3", "trois"] },
            { question: "b)", attendu: ["9", "neuf"] },
            { question: "c)", attendu: ["6", "six"] },
          ],
        },
        {
          enonce: "a) Quelle aiguille montre l'heure ?\nA) la petite aiguille\nB) la grande aiguille\nb) À 5 heures pile, la grande aiguille est sur quel nombre ?",
          correction:
            "a) C'est la petite aiguille qui montre l'heure. Réponse A.\nb) À une heure pile, la grande aiguille est toujours sur le 12.\nÀ 5 heures, la petite est sur le 5, la grande sur le 12.\n⛔ Le piège : croire que la grande aiguille va sur le 5. C'est la petite qui va sur le 5.\nRéponse : a) A ; b) 12.",
          micros: ["cp_duree_placer_aiguilles"],
          reponses: [
            { question: "a)", attendu: ["A", "A) la petite aiguille", "la petite", "petite"] },
            { question: "b)", attendu: ["12", "douze"] },
          ],
        },
        {
          enonce: "Quelle horloge montre 4 heures ?\nÉcris la lettre.",
          figure: horloges([
            { petite: 12, grande: 4, nom: "A" },
            { petite: 4, nom: "B" },
            { petite: 5, nom: "C" },
          ]),
          correction:
            "Pour 4 heures, la petite aiguille va sur le 4. La grande va sur le 12.\nHorloge A : la petite est sur le 12. Ce n'est pas 4 heures.\nHorloge B : la petite est sur le 4, la grande sur le 12. C'est 4 heures.\nHorloge C : la petite est sur le 5. Il est 5 heures.\n⛔ Le piège : choisir A, parce qu'une aiguille touche le 4. Sur A, les aiguilles sont inversées.\nRéponse : B.",
          micros: ["cp_duree_placer_aiguilles"],
          reponses: [{ attendu: ["B"] }],
        },
        {
          enonce: "Écris matin, midi, après-midi ou soir.\na) Léo se lève.\nb) Léo mange à la cantine.\nc) Léo prend son goûter.\nd) Léo se couche.",
          correction:
            "Je pense à une journée d'école, du réveil au coucher.\na) On se lève le matin.\nb) On mange à la cantine à midi.\nc) Le goûter, c'est l'après-midi, après l'école.\nd) On se couche le soir.\n⛔ Le piège : se tromper de moment. Le soir, il fait nuit : on va dormir.\nRéponse : a) matin ; b) midi ; c) après-midi ; d) soir.",
          micros: ["cp_duree_jour_semaine"],
          reponses: [
            { question: "a)", attendu: ["matin", "le matin"] },
            { question: "b)", attendu: ["midi", "à midi"] },
            { question: "c)", attendu: ["après-midi", "l'après-midi", "apres midi"] },
            { question: "d)", attendu: ["soir", "le soir"] },
          ],
        },
        {
          enonce: "Range la journée de Léna dans l'ordre.\nÉcris les lettres séparées par « ; ».",
          figure: moments([
            { lettre: "A", dessin: "🍽️", mot: "dîner" },
            { lettre: "B", dessin: "⏰", mot: "se lever" },
            { lettre: "C", dessin: "🏫", mot: "aller à l'école" },
          ]),
          correction:
            "Je pars du réveil et j'avance jusqu'au soir.\nD'abord, Léna se lève : B.\nEnsuite, elle va à l'école : C.\nLe soir, elle dîne : A.\n⛔ Le piège : recopier l'ordre des cartes, A puis B puis C. Je range selon la journée.\nRéponse : B ; C ; A.",
          micros: ["cp_duree_ordonner"],
          reponses: [{ attendu: ["B ; C ; A", "B, C, A"], ordre: true }],
        },
        {
          enonce: "Quelle heure sera-t-il juste après ?\nÉcris le nombre.",
          figure: horloges([
            { petite: 8, nom: "a" },
            { petite: 12, nom: "b" },
          ]),
          correction:
            "Les heures se suivent sur le cadran, comme les nombres.\na) Il est 8 heures. Juste après 8, il y a 9. Il sera 9 heures.\nb) Il est 12 heures, midi. Juste après le 12, le cadran revient au 1.\nIl sera 1 heure de l'après-midi. On dit aussi 13 heures.\n⛔ Le piège du b) : chercher un 13 sur le cadran. Il n'y a que 12 nombres.\nRéponse : a) 9 ; b) 1.",
          micros: ["cp_duree_ordonner"],
          reponses: [
            { question: "a)", attendu: ["9", "neuf"] },
            { question: "b)", attendu: ["1", "13", "une"] },
          ],
        },
        {
          enonce: "Vrai ou faux ?\na) À 3 heures, la petite aiguille est sur le 3.\nb) La grande aiguille montre les heures.\nc) À midi, les deux aiguilles sont sur le 12.",
          correction:
            "Je relis le rappel.\na) À 3 heures, la petite aiguille est sur le 3. Vrai.\nb) C'est la petite aiguille qui montre les heures, pas la grande. Faux.\nc) À midi, il est 12 heures pile. La petite est sur le 12, la grande aussi. Vrai.\n⛔ Le piège du b) : la grande aiguille est plus longue, mais elle ne montre pas l'heure.\nRéponse : a) vrai ; b) faux ; c) vrai.",
          micros: ["cp_duree_lire_heure", "cp_duree_placer_aiguilles"],
          reponses: [
            { question: "a)", attendu: ["vrai", "oui"] },
            { question: "b)", attendu: ["faux", "non"] },
            { question: "c)", attendu: ["vrai", "oui"] },
          ],
        },
        {
          enonce: "La boulangère ouvre sa boutique. Regarde l'horloge.\na) Quelle heure est-il ?\nb) Est-ce le matin ou le soir ?",
          figure: horloges([{ petite: 7 }]),
          correction:
            "a) La petite aiguille est sur le 7. La grande est sur le 12. Il est 7 heures.\nb) La boulangère ouvre tôt, avant l'école. C'est 7 heures du matin.\n⛔ Le piège : oublier la petite aiguille et répondre 12. Je lis toujours la petite d'abord.\nRéponse : a) 7 ; b) matin.",
          micros: ["cp_duree_lire_heure", "cp_duree_jour_semaine"],
          reponses: [
            { question: "a)", attendu: ["7", "sept"] },
            { question: "b)", attendu: ["matin", "le matin"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux petites étapes. Je lis l'heure, puis je réfléchis.",
      rappel: [
        "Le matin, la plus petite heure arrive en premier : 8 heures avant 9 heures.",
        "Juste après 12, le cadran revient au 1.",
        "Une même heure revient deux fois : le matin, puis l'après-midi ou le soir.",
      ],
      exercices: [
        {
          enonce: "Ce matin, Inès et Tom vont à la piscine.\nRegarde les horloges. Qui arrive le premier ?",
          figure: horloges([
            { petite: 10, nom: "Inès" },
            { petite: 9, nom: "Tom" },
          ]),
          correction:
            "Je lis la petite aiguille de chaque horloge.\nInès arrive à 10 heures. Tom arrive à 9 heures.\nLe matin, 9 heures vient avant 10 heures.\nDonc Tom arrive le premier.\n⛔ Le piège : choisir Inès, parce que 10 est plus grand. La plus petite heure arrive en premier.\nRéponse : Tom.",
          micros: ["cp_duree_lire_heure", "cp_duree_ordonner"],
          reponses: [{ attendu: ["Tom"] }],
        },
        {
          enonce: "Tom regarde l'horloge. Il dit : « Il est 12 heures. »\na) A-t-il raison ? Écris oui ou non.\nb) Quelle heure est-il ?",
          figure: horloges([{ petite: 2 }]),
          correction:
            "a) Tom a lu la grande aiguille, sur le 12. Il se trompe. Non.\nb) La petite aiguille est sur le 2. Il est 2 heures.\n⛔ Le piège : lire l'aiguille la plus longue. Tom a fait cette erreur.\nRéponse : a) non ; b) 2.",
          micros: ["cp_duree_lire_heure"],
          reponses: [
            { question: "a)", attendu: ["non", "faux"] },
            { question: "b)", attendu: ["2", "deux"] },
          ],
        },
        {
          enonce: "Mia veut montrer 8 heures.\na) La petite aiguille va sur quel nombre ?\nb) La grande aiguille va sur quel nombre ?",
          correction:
            "Pour une heure pile, je place deux aiguilles.\na) La petite aiguille montre l'heure : elle va sur le 8.\nb) La grande aiguille va sur le 12 : c'est l'heure pile.\n⛔ Le piège : mettre la petite sur le 12 et la grande sur le 8. Ce n'est pas 8 heures.\nRéponse : a) 8 ; b) 12.",
          micros: ["cp_duree_placer_aiguilles"],
          reponses: [
            { question: "a)", attendu: ["8", "huit"] },
            { question: "b)", attendu: ["12", "douze"] },
          ],
        },
        {
          enonce: "Sami pense à sa journée.\na) Sami se lève à 7 heures. Matin ou soir ?\nb) Sami dîne à 7 heures. Matin ou soir ?",
          correction:
            "Le 7 revient deux fois dans la journée. Je pense à ce que fait Sami.\na) On se lève le matin. C'est 7 heures du matin.\nb) On dîne le soir. C'est 7 heures du soir.\n⛔ Le piège : croire que 7 heures, c'est toujours le même moment. Le même 7 revient le matin et le soir.\nRéponse : a) matin ; b) soir.",
          micros: ["cp_duree_jour_semaine"],
          reponses: [
            { question: "a)", attendu: ["matin", "le matin"] },
            { question: "b)", attendu: ["soir", "le soir"] },
          ],
        },
        {
          enonce: "Ce matin, le jardinier arrose quatre parterres.\nRange les horloges de la plus tôt à la plus tard.\nÉcris les lettres séparées par « ; ».",
          figure: horloges([
            { petite: 11, nom: "A" },
            { petite: 8, nom: "B" },
            { petite: 9, nom: "C" },
            { petite: 10, nom: "D" },
          ]),
          correction:
            "Je lis la petite aiguille de chaque horloge.\nA : 11 heures. B : 8 heures. C : 9 heures. D : 10 heures.\nLe matin, je range les heures comme les nombres : 8, 9, 10, 11.\nDonc B, puis C, puis D, puis A.\n⛔ Le piège : garder l'ordre des lettres A, B, C, D. Je range selon l'heure.\nRéponse : B ; C ; D ; A.",
          micros: ["cp_duree_lire_heure", "cp_duree_ordonner"],
          reponses: [{ attendu: ["B ; C ; D ; A", "B, C, D, A"], ordre: true }],
        },
        {
          enonce: "Au cinéma, le film commence à cette heure.\na) Quelle heure était-il juste avant ?\nb) Quelle heure sera-t-il juste après ?",
          figure: horloges([{ petite: 4 }]),
          correction:
            "Je lis d'abord l'horloge : la petite aiguille est sur le 4. Il est 4 heures.\na) Juste avant 4, il y a 3. Il était 3 heures.\nb) Juste après 4, il y a 5. Il sera 5 heures.\n⛔ Le piège : confondre avant et après. Avant, je recule d'un nombre. Après, j'avance.\nRéponse : a) 3 ; b) 5.",
          micros: ["cp_duree_ordonner"],
          reponses: [
            { question: "a)", attendu: ["3", "trois"] },
            { question: "b)", attendu: ["5", "cinq"] },
          ],
        },
        {
          enonce: "Que fait Noé ? Écris la lettre.\na) Il est midi.\nA) il se couche B) il déjeune C) il se lève\nb) Il est 9 heures du soir.\nA) il va à l'école B) il dort C) il goûte",
          correction:
            "Je pense à ce que l'on fait à ce moment-là.\na) À midi, on mange : Noé déjeune. Réponse B.\nb) À 9 heures du soir, il fait nuit. Noé dort. Réponse B.\n⛔ Le piège du b) : penser à l'école, qui commence vers 9 heures du MATIN. Ici, c'est le soir.\nRéponse : a) B ; b) B.",
          micros: ["cp_duree_jour_semaine"],
          reponses: [
            { question: "a)", attendu: ["B", "B) il déjeune", "il déjeune"] },
            { question: "b)", attendu: ["B", "B) il dort", "il dort"] },
          ],
        },
        {
          enonce: "Devinettes sans dessin.\na) La petite aiguille est sur le 11. La grande est sur le 12. Quelle heure ?\nb) Les deux aiguilles sont sur le 12. Quelle heure ?",
          correction:
            "Je cherche toujours où est la petite aiguille.\na) La petite aiguille est sur le 11. Il est 11 heures.\nb) La petite aiguille est sur le 12. Il est 12 heures : c'est midi.\n⛔ Le piège du a) : répondre 12, le nombre de la grande aiguille.\nRéponse : a) 11 ; b) 12.",
          micros: ["cp_duree_lire_heure"],
          reponses: [
            { question: "a)", attendu: ["11", "onze"] },
            { question: "b)", attendu: ["12", "midi", "douze"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le défi. Je lis l'horloge, puis je réfléchis.",
      rappel: [
        "Une horloge qui avance montre une heure de trop.",
        "Chaque heure du cadran revient deux fois par jour.",
        "Une heure après, j'avance la petite aiguille d'un nombre.",
      ],
      exercices: [
        {
          titre: "L'horloge qui avance",
          enonce: "L'horloge du salon avance d'une heure.\nElle montre l'heure du dessin.\nQuelle est la vraie heure ?",
          figure: horloges([{ petite: 5 }]),
          correction:
            "Je lis l'horloge : la petite aiguille est sur le 5. Elle montre 5 heures.\nElle avance d'une heure : elle montre une heure de trop.\nLa vraie heure est juste avant 5 : 4 heures.\n⛔ Le piège : répondre 6 heures. Une horloge qui avance est en avance : la vraie heure est plus tôt.\nRéponse : 4.",
          micros: ["cp_duree_defi", "cp_duree_lire_heure"],
          reponses: [{ attendu: ["4", "quatre"] }],
        },
        {
          titre: "Deux fois 3 heures",
          enonce: "a) Combien de fois par jour l'horloge montre-t-elle 3 heures ?\nb) À 3 heures de l'après-midi, où est Zoé ?\nA) au lit B) à l'école C) au petit-déjeuner",
          figure: horloges([{ petite: 3 }]),
          correction:
            "a) La petite aiguille fait deux tours par jour.\nElle passe sur le 3 la nuit, puis l'après-midi. Donc 2 fois.\nb) À 3 heures de l'après-midi, Zoé est en classe. Réponse B.\n⛔ Le piège du b) : choisir « au lit ». À 3 heures du matin, oui. Mais ici, c'est l'après-midi.\nRéponse : a) 2 ; b) B.",
          micros: ["cp_duree_defi", "cp_duree_jour_semaine"],
          reponses: [
            { question: "a)", attendu: ["2", "deux"] },
            { question: "b)", attendu: ["B", "B) à l'école", "à l'école", "école"] },
          ],
        },
        {
          titre: "La journée de la pompière",
          enonce: "Voici le matin de Karima, pompière.\na) À quelle heure fait-elle du sport ?\nb) Une heure après le sport, elle lave le camion. À quelle heure ?",
          figure: horloges([
            { petite: 6, nom: "réveil" },
            { petite: 9, nom: "sport" },
            { petite: 12, nom: "repas" },
          ]),
          correction:
            "a) Sous « sport », la petite aiguille est sur le 9. Karima fait du sport à 9 heures.\nb) Une heure après 9 heures, j'avance d'un nombre : 10 heures.\nJe vérifie : 10 heures vient bien avant le repas de midi.\n⛔ Le piège du b) : répondre encore 9. Une heure après, la petite aiguille avance d'un nombre.\nRéponse : a) 9 ; b) 10.",
          micros: ["cp_duree_defi", "cp_duree_ordonner"],
          reponses: [
            { question: "a)", attendu: ["9", "neuf"] },
            { question: "b)", attendu: ["10", "dix"] },
          ],
        },
        {
          titre: "Le réveil mal réglé",
          enonce: "Malo veut se lever à 7 heures. Voici son réveil.\na) Est-il bien réglé ? Écris oui ou non.\nb) Pour 7 heures, la petite aiguille va sur quel nombre ?\nc) Et la grande aiguille ?",
          figure: horloges([{ petite: 12, grande: 7 }]),
          correction:
            "Je regarde chaque aiguille.\na) La petite aiguille est sur le 12 et la grande sur le 7. Les aiguilles sont inversées. Non.\nb) La petite aiguille montre l'heure : pour 7 heures, elle va sur le 7.\nc) La grande aiguille va sur le 12 : c'est l'heure pile.\n⛔ Le piège : croire que le réveil est bon, parce qu'une aiguille touche le 7. C'est la mauvaise aiguille.\nRéponse : a) non ; b) 7 ; c) 12.",
          micros: ["cp_duree_defi", "cp_duree_placer_aiguilles"],
          reponses: [
            { question: "a)", attendu: ["non", "faux"] },
            { question: "b)", attendu: ["7", "sept"] },
            { question: "c)", attendu: ["12", "douze"] },
          ],
        },
      ],
    },
  ],
};
