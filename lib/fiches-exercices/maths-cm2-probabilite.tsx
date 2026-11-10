// ─── Fiche d'exercices : les probabilités (CM2) — 20 exercices corrigés ───────
//
// 10/11/2026 (session fiches-cm2), sur le modèle des feuilles CM2 du tableau et
// du graphique : texte simple, sans KaTeX, phrases courtes.
//
// Alignée sur la fiche de cours `lib/fiches/maths-cm2-probabilite` (« Les
// probabilités »), sur la banque `lib/tutor-v4/questionBank/cm2/maths/
// probabilites.bank.ts` et sur la carte mentale remplie (`cm2/probabilite`),
// notionId probabilite : les mots certain, possible, impossible ; reconnaître
// une situation de hasard ; comparer des chances ; raisonner avec une roue, un
// dé, un sac ; recenser les issues de deux épreuves ; défis.
// ⛔ LIMITES DU CM2, lues dans la banque : pas de fraction de probabilité ni de
// « P(A) ». On dit « 2 chances sur 8 » ; la réponse attendue est le nombre de
// chances (« combien de chances sur 8 ? » → 2), un mot ou une lettre de QCM.
// ⛔ Aucun exemple de la carte mentale n'est repris (dé : 7, moins de 7, 3 ;
// sacs 3 sur 10 et 6 sur 10 ; roue de 8 cases dont 2 bleues ; deux pièces ;
// deux dés et la somme 12 ou 7).
//
// Les pièges nommés : « possible » pris pour « sûr » (1, 10), un nombre hors du
// dé (2), le certain pris pour du hasard (3), compter les billes d'une seule
// couleur (4, 9), « 1 chance sur 2 » parce que c'est bleu ou pas (5), oublier
// une face (6), la pièce qui aurait de la mémoire (7), une issue oubliée dans
// un tableau (8, 18), le dé truqué lu comme un dé normal (12), une seule roue
// regardée (13), la somme 4 comptée une fois (14), un jeu cru juste parce que
// chacun peut gagner (15), 5 + 5 compté une fois au lieu de 4 + 6 et 6 + 4
// (16), les rouges ajoutées sans recompter le total (17), comparer 1 et 3 sans
// le même total (19), oublier les égalités (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : loto de la kermesse (1), jeu de l'oie (2),
// sport (3, le capitaine tiré au sort), bonbons (4), roue de la fête (5), dé à
// jouer (6), pile ou face (7), jeu de la récré (8), billes (9), cartes animaux
// (10), roue de la radio (11), bricolage (12), stand de jeu (13), deux roues
// de la classe (14), jeu de dé (15), jeu de plateau (16), tombola (17),
// vêtements (18), fête foraine (19), pierre-feuille-ciseaux (20).
// Aucun décor de La Réunion sur cette feuille.
// Les métiers : animatrice (5), animateur radio (11), forain (13, 19).
// Tout est un MODÈLE : aucun fait réel à vérifier.
//
// ⭐ LES DESSINS : trois aides locales. `sacs` dessine un ou plusieurs sacs de
// billes, chaque bille avec la LETTRE de sa couleur (lisible imprimé en noir
// et blanc) ; `roues` dessine une ou deux roues à secteurs égaux, lettre dans
// chaque secteur ; `grille` est un tableau HTML (deux épreuves). Les billes et
// les secteurs sont écrits EN CLAIR dans chaque appel : le script de contrôle
// (scratchpad) les recompte et refait chaque dénombrement.
//
// Micro-compétences : probabilite_vocabulaire (1, 2, 10, 12), probabilite_hasard
// (3, 7, 15), probabilite_comparer (4, 9, 13, 15, 19), probabilite_roue_de_sac
// (5, 6, 11, 12, 13), probabilite_deux_etapes (8, 14, 16, 18, 20),
// probabilite_defi (16, 17, 18, 19, 20). 6/6.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

const NOIR = "#0f172a";

/** Les couleurs, et la lettre écrite sur la bille ou le secteur. */
const COULEURS: Record<string, [string, string, string]> = {
  R: ["#ef4444", "#ffffff", "rouge"],
  B: ["#3b82f6", "#ffffff", "bleu"],
  V: ["#22c55e", "#0f172a", "vert"],
  J: ["#facc15", "#0f172a", "jaune"],
  G: ["#ffffff", "#0f172a", "gagnant"],
  P: ["#e2e8f0", "#0f172a", "perdant"],
};

const f = (x: number) => Math.round(x * 10) / 10;

const cadre = (h: number, label: string, enfants: ReactNode) => (
  <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
    <svg viewBox={`0 0 300 ${h}`} className="block h-auto w-full" role="img" aria-label={label}>
      <rect x="0" y="0" width="300" height={h} rx="10" fill="#fff" />
      {enfants}
    </svg>
  </div>
);

/**
 * Des SACS DE BILLES côte à côte. `billes` : une lettre par bille (R rouge,
 * B bleu, V vert, J jaune). Cinq billes par rangée au plus, moins quand les sacs sont serrés.
 * ⭐ Le script de contrôle relit ces lettres : les écrire en clair.
 */
const sacs = (liste: { nom?: string; billes: string }[]) => {
  const n = liste.length;
  const larg = 300 / n;
  // Autant de billes par rangée que la place le permet (5 au plus).
  const PR = Math.min(5, Math.floor((larg - 24) / 26));
  const rangees = Math.max(...liste.map((s) => Math.ceil(s.billes.length / PR)));
  const H = 70 + rangees * 26;
  return cadre(
    H,
    liste.map((s) => `${s.nom ?? "Le sac"} : ${s.billes.split("").map((c) => COULEURS[c][2]).join(", ")}`).join(" ; "),
    <>
      {liste.map((s, i) => {
        const cx = larg * i + larg / 2;
        const parRang = Math.min(PR, s.billes.length);
        const w = Math.max(70, parRang * 26 + 20);
        const x0 = cx - w / 2;
        const yb = 30;
        const hb = rangees * 26 + 14;
        return (
          <g key={i}>
            <path
              d={`M ${f(x0 + 8)} ${yb} L ${f(x0 + w - 8)} ${yb} Q ${f(x0 + w + 4)} ${yb + hb / 2} ${f(x0 + w - 4)} ${yb + hb} L ${f(x0 + 4)} ${yb + hb} Q ${f(x0 - 4)} ${yb + hb / 2} ${f(x0 + 8)} ${yb} Z`}
              fill="#fef3c7"
              stroke="#92400e"
              strokeWidth={2}
            />
            <path d={`M ${f(cx - 14)} ${yb} L ${f(cx - 8)} ${yb - 10} L ${f(cx + 8)} ${yb - 10} L ${f(cx + 14)} ${yb}`} fill="#fde68a" stroke="#92400e" strokeWidth={2} />
            {s.billes.split("").map((c, k) => {
              const r = Math.floor(k / PR);
              const dansRang = Math.min(PR, s.billes.length - r * PR);
              const bx = cx + ((k % PR) - (dansRang - 1) / 2) * 26;
              const by = yb + 20 + r * 26;
              const [fond, encre] = COULEURS[c];
              return (
                <g key={k}>
                  <circle cx={f(bx)} cy={by} r={11} fill={fond} stroke={NOIR} strokeWidth={1.5} />
                  <text x={f(bx)} y={by + 5} textAnchor="middle" fontSize="14" fontWeight="800" fill={encre}>
                    {c}
                  </text>
                </g>
              );
            })}
            {s.nom ? (
              <text x={f(cx)} y={H - 10} textAnchor="middle" fontSize="14" fontWeight="800" fill={NOIR}>
                {s.nom}
              </text>
            ) : null}
          </g>
        );
      })}
    </>,
  );
};

/**
 * Une ou deux ROUES à secteurs égaux, lues dans le sens des aiguilles d'une
 * montre à partir du haut. `secteurs` : une lettre par secteur (R, B, V, J, ou
 * G gagnant / P perdant), ou un chiffre (écrit tel quel sur fond blanc).
 * La flèche, en haut, montre la case lue.
 * ⭐ Le script de contrôle relit ces secteurs : les écrire en clair.
 */
const roues = (liste: { nom?: string; secteurs: string[] }[]) => {
  const n = liste.length;
  const r = n === 1 ? 62 : 52;
  const H = 2 * r + (liste.some((l) => l.nom) ? 56 : 36);
  return cadre(
    H,
    liste.map((l) => `${l.nom ?? "La roue"} : ${l.secteurs.length} secteurs égaux, ${l.secteurs.map((c) => COULEURS[c]?.[2] ?? c).join(", ")}`).join(" ; "),
    <>
      {liste.map((l, i) => {
        const cx = (300 / n) * i + 150 / n;
        const cy = r + 22;
        const k = l.secteurs.length;
        const pt = (a: number, rr = r): [number, number] => [cx + rr * Math.sin(a), cy - rr * Math.cos(a)];
        return (
          <g key={i}>
            {l.secteurs.map((c, j) => {
              const a0 = (2 * Math.PI * j) / k;
              const a1 = (2 * Math.PI * (j + 1)) / k;
              const [p, q] = [pt(a0), pt(a1)];
              const m = pt((a0 + a1) / 2, r * 0.62);
              const [fond, encre] = COULEURS[c] ?? ["#ffffff", NOIR];
              return (
                <g key={j}>
                  <path d={`M ${f(cx)} ${f(cy)} L ${f(p[0])} ${f(p[1])} A ${r} ${r} 0 0 1 ${f(q[0])} ${f(q[1])} Z`} fill={fond} stroke={NOIR} strokeWidth={1.5} />
                  <text x={f(m[0])} y={f(m[1] + 5)} textAnchor="middle" fontSize="14" fontWeight="800" fill={encre}>
                    {c}
                  </text>
                </g>
              );
            })}
            <circle cx={f(cx)} cy={f(cy)} r={4} fill={NOIR} />
            <polygon points={`${f(cx - 8)},4 ${f(cx + 8)},4 ${f(cx)},${f(cy - r + 8)}`} fill={NOIR} />
            {l.nom ? (
              <text x={f(cx)} y={H - 10} textAnchor="middle" fontSize="14" fontWeight="800" fill={NOIR}>
                {l.nom}
              </text>
            ) : null}
          </g>
        );
      })}
    </>,
  );
};

/** Un TABLEAU HTML (deux épreuves) : une ligne d'en-tête, puis les lignes. Texte NU. */
const grille = (entetes: string[], lignes: string[][], surligne: [number, number][] = []) => (
  <div className="mx-auto w-full max-w-[18rem] print:max-w-[13rem]">
    <table className="w-full border-collapse text-center text-[13px] print:text-[10px]">
      <thead>
        <tr>
          {entetes.map((e, i) => (
            <th key={i} className="border border-slate-300 bg-slate-100 px-1 py-1 font-bold text-slate-700">
              {e}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {lignes.map((l, i) => (
          <tr key={i}>
            {l.map((c, j) => {
              const s = surligne.some(([a, b]) => a === i && b === j);
              return (
                <td key={j} className={`border px-1 py-0.5 ${j === 0 ? "bg-slate-100 font-bold text-slate-700" : "text-slate-800"} ${s ? "border-orange-400 bg-orange-100 font-black text-orange-900" : "border-slate-300"}`}>
                  {c}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/** Les 6 faces d'un dé fabriqué, en carrés numérotés. */
const facesDe = (faces: number[]) =>
  cadre(
    70,
    `Les 6 faces du dé : ${faces.join(", ")}`,
    <>
      {faces.map((v, i) => (
        <g key={i}>
          <rect x={18 + i * 46} y={14} width={38} height={38} rx={6} fill="#fff7ed" stroke={NOIR} strokeWidth={2} />
          <text x={37 + i * 46} y={39} textAnchor="middle" fontSize="14" fontWeight="800" fill={NOIR}>
            {v}
          </text>
        </g>
      ))}
    </>,
  );

export const exercicesProbabiliteCm2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "probabilite",
  titre: "Les probabilités",
  accroche:
    "Vingt exercices, du geste seul au problème. Dire si c'est certain, possible ou impossible. Reconnaître le hasard. Compter les chances avec un sac de billes, une roue, un dé. Comparer deux jeux, même quand ils n'ont pas le même nombre de billes. Lister toutes les issues de deux épreuves dans un tableau. Une kermesse, une roue de fête foraine, un dé fabriqué à la main, pierre-feuille-ciseaux. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/cm2/probabilite", titre: "Les probabilités" }],
  coachHref: "/coach-ia/maths?classe=cm2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une question, un geste. Je regarde ce qui peut sortir, puis je réponds.",
      rappel: [
        "Certain : ça arrive à coup sûr. Impossible : ça n'arrive jamais. Possible : ça peut arriver, ou pas.",
        "C'est le hasard quand on ne peut pas savoir le résultat à l'avance.",
        "Pour compter les chances : les cases gagnantes, sur toutes les cases.",
      ],
      exercices: [
        {
          enonce:
            "Au loto de la kermesse, on tire une bille au hasard dans ce sac. Il y a 4 billes vertes et 2 billes jaunes.\nRéponds par certain, possible ou impossible.\na) Tirer une bille verte.\nb) Tirer une bille bleue.\nc) Tirer une bille verte ou jaune.",
          figure: sacs([{ billes: "VVJVJV" }]),
          correction:
            "Je regarde ce qu'il y a dans le sac : seulement du vert et du jaune.\na) Il y a des vertes, mais aussi des jaunes. La verte peut sortir, ou pas. C'est possible.\nb) Il n'y a aucune bille bleue. Elle ne peut jamais sortir. C'est impossible.\nc) Toutes les billes sont vertes ou jaunes. À coup sûr, la bille sera verte ou jaune. C'est certain.\n⛔ Le piège : dire « certain » au a) parce qu'il y a beaucoup de vertes. Une jaune peut quand même sortir.\nRéponse : a) possible ; b) impossible ; c) certain.",
          micros: ["probabilite_vocabulaire"],
          reponses: [
            { question: "a)", attendu: "possible" },
            { question: "b)", attendu: "impossible" },
            { question: "c)", attendu: "certain" },
          ],
        },
        {
          enonce:
            "Au jeu de l'oie, on lance un dé à 6 faces, numérotées de 1 à 6.\nRéponds par certain, possible ou impossible.\na) Obtenir 0.\nb) Obtenir un nombre entre 1 et 6.\nc) Obtenir un nombre pair.",
          correction:
            "Les résultats possibles sont : 1, 2, 3, 4, 5, 6.\na) 0 n'est sur aucune face. C'est impossible.\nb) Toutes les faces portent un nombre entre 1 et 6. C'est certain.\nc) Les faces paires sont 2, 4 et 6. Elles peuvent sortir, ou pas. C'est possible.\n⛔ Le piège : oublier que le dé commence à 1. Le 0 n'existe pas sur un dé.\nRéponse : a) impossible ; b) certain ; c) possible.",
          micros: ["probabilite_vocabulaire"],
          reponses: [
            { question: "a)", attendu: "impossible" },
            { question: "b)", attendu: "certain" },
            { question: "c)", attendu: "possible" },
          ],
        },
        {
          enonce:
            "Est-ce une situation de hasard ? Réponds oui ou non.\na) L'arbitre lance une pièce pour savoir quelle équipe commence.\nb) Demain matin, le soleil se lève.\nc) On tire au sort le nom du capitaine dans un chapeau.\nd) On calcule 2 + 2.",
          correction:
            "C'est le hasard quand on ne peut pas savoir le résultat à l'avance.\na) Pile ou face : on ne peut pas savoir. Oui, c'est le hasard.\nb) Le soleil se lève tous les matins. On le sait à l'avance. Non.\nc) On ne sait pas quel nom sortira. Oui, c'est le hasard.\nd) 2 + 2 = 4, toujours. Non.\n⛔ Le piège : croire que tout ce qui arrive demain est du hasard. Le lever du soleil est certain.\nRéponse : a) oui ; b) non ; c) oui ; d) non.",
          micros: ["probabilite_hasard"],
          reponses: [
            { question: "a)", attendu: "oui" },
            { question: "b)", attendu: "non" },
            { question: "c)", attendu: "oui" },
            { question: "d)", attendu: "non" },
          ],
        },
        {
          enonce:
            "Tom adore les bonbons rouges. Il pioche au hasard dans un sac.\na) Dans quel sac a-t-il le plus de chances de tirer un rouge ? Réponds A ou B.\nb) Dans quel sac a-t-il le plus de chances de tirer un bleu ?",
          figure: sacs([{ nom: "Sac A", billes: "RRBR" }, { nom: "Sac B", billes: "BRBB" }]),
          correction:
            "Les deux sacs ont 4 bonbons. Je compare les rouges.\nSac A : 3 rouges sur 4. Sac B : 1 rouge sur 4.\na) 3, c'est plus que 1. Le sac A est le meilleur pour le rouge.\nb) Sac A : 1 bleu sur 4. Sac B : 3 bleus sur 4. Le sac B est le meilleur pour le bleu.\n⛔ Le piège : choisir au hasard. Je compte d'abord les bonbons de chaque couleur.\nRéponse : a) A ; b) B.",
          micros: ["probabilite_comparer"],
          reponses: [
            { question: "a)", attendu: ["A", "sac A"] },
            { question: "b)", attendu: ["B", "sac B"] },
          ],
        },
        {
          enonce:
            "À la fête, une animatrice fait tourner cette roue. Elle a 8 cases pareilles : J jaune, B bleu, R rouge.\na) Combien y a-t-il de cases en tout ?\nb) Combien de chances sur 8 de tomber sur bleu ?\nc) Quelle couleur a le moins de chances ?",
          figure: roues([{ secteurs: ["J", "B", "J", "B", "R", "B", "J", "B"] }]),
          correction:
            "Je compte les cases de chaque couleur.\na) 8 cases en tout.\nb) Les cases bleues : 4. Il y a 4 chances sur 8 de tomber sur bleu.\nc) Jaune : 3 cases. Rouge : 1 case. Le rouge a le moins de cases : il a le moins de chances.\nVérification : 4 + 3 + 1 = 8.\n⛔ Le piège : dire « 1 chance sur 2 » parce que c'est bleu ou pas bleu. Il faut compter les cases.\nRéponse : a) 8 ; b) 4 ; c) le rouge.",
          micros: ["probabilite_roue_de_sac"],
          reponses: [
            { question: "a)", attendu: ["8", "8 cases"] },
            { question: "b)", attendu: ["4", "4 chances"] },
            { question: "c)", attendu: ["rouge", "le rouge"] },
          ],
        },
        {
          enonce:
            "On lance un dé à 6 faces, numérotées de 1 à 6.\na) Combien de faces donnent un nombre plus grand que 4 ?\nb) Combien de faces donnent un nombre impair ?\nc) Obtenir 6 ou obtenir 1 : A : autant de chances ; B : 6 a plus de chances ; C : 1 a plus de chances. Réponds A, B ou C.",
          correction:
            "J'écris toutes les faces : 1, 2, 3, 4, 5, 6.\na) Plus grand que 4 : 5 et 6. Cela fait 2 faces. (4 n'est pas plus grand que 4.)\nb) Impairs : 1, 3 et 5. Cela fait 3 faces.\nc) Le 6 est sur 1 face, le 1 aussi. Ils ont autant de chances. Réponse A.\n⛔ Le piège : compter le 4 dans « plus grand que 4 ». Il est égal, pas plus grand.\nRéponse : a) 2 ; b) 3 ; c) A.",
          micros: ["probabilite_roue_de_sac"],
          reponses: [
            { question: "a)", attendu: ["2", "2 faces"] },
            { question: "b)", attendu: ["3", "3 faces"] },
            { question: "c)", attendu: "A" },
          ],
        },
        {
          enonce:
            "Léo lance une pièce. Il obtient pile, puis pile, puis encore pile.\na) Avec une pièce, combien de résultats sont possibles ?\nb) Au 4e lancer : A : face est obligé ; B : pile a plus de chances ; C : pile et face ont autant de chances. Réponds A, B ou C.",
          correction:
            "a) Une pièce a 2 côtés : pile ou face. 2 résultats.\nb) La pièce ne se souvient pas des lancers d'avant.\nÀ chaque lancer, pile et face ont autant de chances. Réponse C.\n⛔ Le piège : croire que face « doit » sortir après 3 piles. La pièce n'a pas de mémoire.\nRéponse : a) 2 ; b) C.",
          micros: ["probabilite_hasard"],
          reponses: [
            { question: "a)", attendu: ["2", "2 résultats"] },
            { question: "b)", attendu: "C" },
          ],
        },
        {
          enonce:
            "Jeu de la récré : on lance une pièce (pile ou face), puis on fait tourner une roue à 3 cases : rouge, bleu, vert.\na) Combien y a-t-il de résultats en tout ?\nb) Combien de résultats commencent par pile ?\nc) Combien de résultats donnent « face et vert » ?",
          figure: grille(["", "rouge", "bleu", "vert"], [
            ["pile", "pile, rouge", "pile, bleu", "?"],
            ["face", "?", "?", "?"],
          ]),
          correction:
            "Je complète le tableau : une ligne pour la pièce, une colonne pour la roue.\nLigne pile : pile-rouge, pile-bleu, pile-vert.\nLigne face : face-rouge, face-bleu, face-vert.\na) 2 lignes et 3 colonnes : 2 × 3 = 6 résultats.\nb) La ligne pile a 3 cases : 3 résultats.\nc) Face et vert : une seule case. 1 résultat.\n⛔ Le piège : oublier une case. Le tableau aide à tout écrire, sans oubli.\nRéponse : a) 6 ; b) 3 ; c) 1.",
          schema: grille(["", "rouge", "bleu", "vert"], [
            ["pile", "pile, rouge", "pile, bleu", "pile, vert"],
            ["face", "face, rouge", "face, bleu", "face, vert"],
          ], [[1, 3]]),
          micros: ["probabilite_deux_etapes"],
          reponses: [
            { question: "a)", attendu: ["6", "6 résultats"] },
            { question: "b)", attendu: ["3", "3 résultats"] },
            { question: "c)", attendu: ["1", "1 résultat"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux ou trois étapes. Je compte les cas gagnants ET tous les cas.",
      rappel: [
        "« 3 chances sur 10 » : 3 cas gagnants, sur 10 cas en tout.",
        "Pour comparer deux sacs, je regarde les gagnantes ET le total.",
        "Avec le même total, plus il y a de cas gagnants, plus il y a de chances.",
        "Un dé ou une roue peut être truqué : je compte les vraies faces, les vraies cases.",
      ],
      exercices: [
        {
          enonce:
            "Sami veut tirer une bille rouge.\nSac A : 2 rouges et 2 bleues.\nSac B : 3 rouges et 7 bleues.\nSac C : 5 rouges et 5 bleues.\na) Entre le sac A et le sac B, lequel donne le plus de chances ? Réponds A ou B.\nb) Les sacs A et C donnent-ils autant de chances ? Réponds oui ou non.",
          figure: sacs([{ nom: "Sac A", billes: "RBRB" }, { nom: "Sac B", billes: "RBBRBBBRBB" }, { nom: "Sac C", billes: "RBRBRBRBRB" }]),
          correction:
            "Je compare les rouges avec le total de chaque sac.\nSac A : 2 rouges sur 4. C'est la moitié des billes.\nSac B : 3 rouges sur 10. C'est moins que la moitié (la moitié de 10, c'est 5).\na) Le sac A donne le plus de chances.\nb) Sac C : 5 rouges sur 10. C'est aussi la moitié.\nA et C : la moitié des billes sont rouges. Oui, autant de chances.\n⛔ Le piège : choisir le sac B parce qu'il a plus de rouges (3). Il a aussi beaucoup plus de bleues.\nRéponse : a) A ; b) oui.",
          micros: ["probabilite_comparer"],
          reponses: [
            { question: "a)", attendu: ["A", "sac A"] },
            { question: "b)", attendu: "oui" },
          ],
        },
        {
          enonce:
            "Un paquet a 8 cartes d'animaux : 5 chats et 3 chiens. Nora en tire une au hasard.\na) Tirer un chat : certain, possible ou impossible ?\nb) Tirer un chat est-il plus probable que tirer un chien ? Réponds oui ou non.\nc) Tirer un lapin : certain, possible ou impossible ?",
          correction:
            "Dans le paquet : 5 chats, 3 chiens, rien d'autre.\na) Un chat peut sortir, mais un chien aussi. C'est possible.\nb) 5 cartes chat contre 3 cartes chien. Le chat a plus de chances. Oui.\nc) Il n'y a aucune carte lapin. C'est impossible.\n⛔ Le piège : dire « certain » au a). Plus probable ne veut pas dire sûr.\nRéponse : a) possible ; b) oui ; c) impossible.",
          micros: ["probabilite_vocabulaire", "probabilite_comparer"],
          reponses: [
            { question: "a)", attendu: "possible" },
            { question: "b)", attendu: "oui" },
            { question: "c)", attendu: "impossible" },
          ],
        },
        {
          enonce:
            "Un animateur radio fait tourner cette roue de 4 cases pareilles : 2 rouges (R), 1 bleue (B), 1 verte (V).\na) Quelle couleur a le plus de chances ?\nb) Le bleu et le vert ont-ils autant de chances ? Réponds oui ou non.\nc) Combien de chances sur 4 de tomber sur rouge ?",
          figure: roues([{ secteurs: ["R", "R", "B", "V"] }]),
          correction:
            "Je compte les cases : 4 en tout.\na) Rouge : 2 cases. Bleu : 1 case. Vert : 1 case. Le rouge a le plus de chances.\nb) Bleu : 1 case. Vert : 1 case. Oui, autant de chances.\nc) 2 cases rouges sur 4 : 2 chances sur 4. C'est la moitié de la roue.\n⛔ Le piège : croire que chaque couleur a autant de chances. Ici, le rouge prend 2 cases.\nRéponse : a) le rouge ; b) oui ; c) 2.",
          micros: ["probabilite_roue_de_sac"],
          reponses: [
            { question: "a)", attendu: ["rouge", "le rouge"] },
            { question: "b)", attendu: "oui" },
            { question: "c)", attendu: ["2", "2 chances"] },
          ],
        },
        {
          enonce:
            "Lina fabrique un dé en carton. Elle écrit sur ses 6 faces : 1, 1, 2, 2, 2, 3.\na) Combien de chances sur 6 d'obtenir 2 ?\nb) Quel nombre a le plus de chances de sortir ?\nc) Obtenir 4 : certain, possible ou impossible ?",
          figure: facesDe([1, 1, 2, 2, 2, 3]),
          correction:
            "Je compte les faces de chaque nombre.\nLe 1 : 2 faces. Le 2 : 3 faces. Le 3 : 1 face. 2 + 3 + 1 = 6.\na) Le 2 est sur 3 faces : 3 chances sur 6.\nb) Le 2 a le plus de faces : c'est lui qui a le plus de chances.\nc) Aucune face ne porte 4. C'est impossible.\n⛔ Le piège : lire ce dé comme un dé normal, de 1 à 6. Je regarde les vraies faces.\nRéponse : a) 3 ; b) le 2 ; c) impossible.",
          micros: ["probabilite_roue_de_sac", "probabilite_vocabulaire"],
          reponses: [
            { question: "a)", attendu: ["3", "3 chances"] },
            { question: "b)", attendu: ["2", "le 2"] },
            { question: "c)", attendu: "impossible" },
          ],
        },
        {
          enonce:
            "Au stand d'un forain, il y a deux roues de 6 cases. G : gagné. P : perdu.\na) Roue A : combien de chances sur 6 de gagner ?\nb) Roue B : combien de chances sur 6 de gagner ?\nc) Quelle roue choisir ? A : la roue A ; B : la roue B ; C : c'est pareil. Réponds A, B ou C.",
          figure: roues([
            { nom: "Roue A", secteurs: ["G", "P", "P", "G", "P", "P"] },
            { nom: "Roue B", secteurs: ["G", "P", "G", "P", "G", "P"] },
          ]),
          correction:
            "Les deux roues ont 6 cases. Je compte les cases G.\na) Roue A : 2 cases G. 2 chances sur 6.\nb) Roue B : 3 cases G. 3 chances sur 6.\nc) Même total, 6 cases. 3, c'est plus que 2 : la roue B donne plus de chances. Réponse B.\n⛔ Le piège : ne regarder qu'une roue. Il faut compter les cases G des deux.\nRéponse : a) 2 ; b) 3 ; c) B.",
          micros: ["probabilite_comparer", "probabilite_roue_de_sac"],
          reponses: [
            { question: "a)", attendu: ["2", "2 chances"] },
            { question: "b)", attendu: ["3", "3 chances"] },
            { question: "c)", attendu: "B" },
          ],
        },
        {
          enonce:
            "En classe, on a deux petites roues. Chacune a 3 cases : 1, 2 et 3. On les fait tourner, puis on additionne les deux nombres.\na) Combien y a-t-il de résultats possibles (une case de chaque roue) ?\nb) Combien de résultats donnent une somme de 4 ?\nc) Quelle somme a le plus de chances ?",
          figure: roues([
            { nom: "Roue 1", secteurs: ["1", "2", "3"] },
            { nom: "Roue 2", secteurs: ["1", "2", "3"] },
          ]),
          correction:
            "Je fais un tableau : roue 1 en ligne, roue 2 en colonne. J'écris la somme dans chaque case.\na) 3 lignes et 3 colonnes : 3 × 3 = 9 résultats.\nb) Somme 4 : 1 + 3, 2 + 2, 3 + 1. Cela fait 3 résultats.\nc) Somme 2 : 1 case. Somme 3 : 2. Somme 4 : 3. Somme 5 : 2. Somme 6 : 1.\nLa somme 4 a le plus de cases : elle a le plus de chances.\nVérification : 1 + 2 + 3 + 2 + 1 = 9.\n⛔ Le piège : compter 1 + 3 et 3 + 1 comme un seul résultat. Ce sont 2 cases différentes du tableau.\nRéponse : a) 9 ; b) 3 ; c) 4.",
          schema: grille(["+", "1", "2", "3"], [
            ["1", "2", "3", "4"],
            ["2", "3", "4", "5"],
            ["3", "4", "5", "6"],
          ], [[0, 3], [1, 2], [2, 1]]),
          micros: ["probabilite_deux_etapes"],
          reponses: [
            { question: "a)", attendu: ["9", "9 résultats"] },
            { question: "b)", attendu: ["3", "3 résultats"] },
            { question: "c)", attendu: ["4", "la somme 4"] },
          ],
        },
        {
          enonce:
            "Tom et Léa jouent avec un dé à 6 faces. Si le dé donne 1 ou 2, Tom gagne. Sinon, Léa gagne.\na) Combien de chances sur 6 Tom a-t-il de gagner ?\nb) Combien de chances sur 6 pour Léa ?\nc) Ce jeu est-il juste pour les deux ? Réponds oui ou non.\nd) Quelle règle rend le jeu juste ? A : Tom gagne avec 1, 2 ou 3 ; B : Tom gagne avec 1 seulement ; C : Léa gagne aussi avec 2. Réponds A, B ou C.",
          correction:
            "a) Tom gagne avec 1 ou 2 : 2 faces. 2 chances sur 6.\nb) Léa gagne avec 3, 4, 5 ou 6 : 4 faces. 4 chances sur 6.\nc) 4, c'est plus que 2 : Léa a plus de chances. Le jeu n'est pas juste. Non.\nd) Pour être juste, chacun doit avoir 3 faces sur 6.\nRègle A : Tom 1, 2, 3 ; Léa 4, 5, 6. 3 faces chacun. Juste.\nRègle B : Tom n'a plus qu'1 face. Règle C : Léa aurait 5 faces. Réponse A.\n⛔ Le piège : croire qu'un jeu est juste parce que chacun peut gagner. Il faut autant de chances.\nRéponse : a) 2 ; b) 4 ; c) non ; d) A.",
          micros: ["probabilite_hasard", "probabilite_comparer"],
          reponses: [
            { question: "a)", attendu: ["2", "2 chances"] },
            { question: "b)", attendu: ["4", "4 chances"] },
            { question: "c)", attendu: "non" },
            { question: "d)", attendu: "A" },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un problème en plusieurs étapes. Je liste tout, je compte, je compare.",
      rappel: [
        "Deux épreuves : je fais un tableau, une case par résultat.",
        "Nombre de résultats = nombre de lignes × nombre de colonnes.",
        "Pour comparer « 1 sur 5 » et « 3 sur 10 », je les écris sur le même total.",
        "1 chance sur 2 : la moitié des cas sont gagnants.",
      ],
      exercices: [
        {
          titre: "Les deux dés",
          enonce:
            "Dans un jeu de plateau, on lance deux dés à 6 faces et on additionne.\na) Combien y a-t-il de résultats possibles (un nombre sur chaque dé) ?\nb) Combien de résultats donnent une somme de 10 ?\nc) Combien de résultats donnent une somme de 2 ?",
          correction:
            "Je fais un tableau : 6 lignes pour le 1er dé, 6 colonnes pour le 2e.\na) 6 × 6 = 36 résultats.\nb) Somme 10 : 4 + 6, 5 + 5 et 6 + 4. Cela fait 3 résultats.\nc) Somme 2 : seulement 1 + 1. Cela fait 1 résultat.\nLa somme 10 a 3 fois plus de chances que la somme 2.\n⛔ Le piège : compter 4 + 6 et 6 + 4 une seule fois. Le 1er dé fait 4 OU le 1er dé fait 6 : ce sont 2 résultats.\nRéponse : a) 36 ; b) 3 ; c) 1.",
          micros: ["probabilite_defi", "probabilite_deux_etapes"],
          reponses: [
            { question: "a)", attendu: ["36", "36 résultats"] },
            { question: "b)", attendu: ["3", "3 résultats"] },
            { question: "c)", attendu: ["1", "1 résultat"] },
          ],
        },
        {
          titre: "La tombola",
          enonce:
            "Pour la tombola, un sac contient 6 billes bleues. On veut ajouter des billes rouges (gagnantes).\na) Combien de rouges faut-il ajouter pour avoir 1 chance sur 2 de tirer une rouge ?\nb) On recommence avec les 6 bleues. Combien de rouges faut-il ajouter pour avoir 1 chance sur 3 ?",
          correction:
            "a) 1 chance sur 2 : la moitié des billes doivent être rouges.\nIl faut autant de rouges que de bleues : 6 rouges.\nVérification : 6 rouges sur 6 + 6 = 12 billes. 6 sur 12, c'est la moitié.\nb) 1 chance sur 3 : sur 3 billes, 1 rouge et 2 bleues.\n6 bleues, c'est 3 paquets de 2 bleues. Il faut 3 paquets avec 1 rouge : 3 rouges.\nVérification : 3 rouges sur 3 + 6 = 9 billes. 3 × 3 = 9 : c'est bien 1 sur 3.\n⛔ Le piège : ajouter 2 rouges au b), en lisant « 1 sur 3 » comme « 1 rouge pour 3 bleues ». Il faut 1 rouge sur 3 billes EN TOUT.\nRéponse : a) 6 ; b) 3.",
          micros: ["probabilite_defi"],
          reponses: [
            { question: "a)", attendu: ["6", "6 rouges"] },
            { question: "b)", attendu: ["3", "3 rouges"] },
          ],
        },
        {
          titre: "La tenue au hasard",
          enonce:
            "Noé a 3 tee-shirts (rouge, blanc, vert) et 2 shorts (noir, bleu). Il prend un tee-shirt et un short au hasard.\na) Combien de tenues différentes peut-il avoir ?\nb) Combien de tenues ont le tee-shirt rouge ?\nc) Combien de chances sur 6 d'avoir « tee-shirt rouge et short noir » ?",
          correction:
            "Je fais un tableau : les tee-shirts en ligne, les shorts en colonne.\nrouge-noir, rouge-bleu ; blanc-noir, blanc-bleu ; vert-noir, vert-bleu.\na) 3 × 2 = 6 tenues.\nb) Avec le tee-shirt rouge : rouge-noir et rouge-bleu. 2 tenues.\nc) « rouge et noir » : une seule case sur 6. 1 chance sur 6.\n⛔ Le piège : additionner 3 + 2 = 5. Chaque tee-shirt va avec CHAQUE short : il faut multiplier.\nRéponse : a) 6 ; b) 2 ; c) 1.",
          schema: grille(["", "noir", "bleu"], [
            ["rouge", "rouge-noir", "rouge-bleu"],
            ["blanc", "blanc-noir", "blanc-bleu"],
            ["vert", "vert-noir", "vert-bleu"],
          ], [[0, 1]]),
          micros: ["probabilite_defi", "probabilite_deux_etapes"],
          reponses: [
            { question: "a)", attendu: ["6", "6 tenues"] },
            { question: "b)", attendu: ["2", "2 tenues"] },
            { question: "c)", attendu: ["1", "1 chance"] },
          ],
        },
        {
          titre: "Le meilleur jeu de la fête foraine",
          enonce:
            "Un forain propose deux jeux.\nJeu A : un sac de 5 billes, dont 1 gagnante.\nJeu B : une roue de 10 cases, dont 3 gagnantes.\na) « 1 chance sur 5 », c'est combien de chances sur 10 ?\nb) Quel jeu choisir ? A : c'est pareil ; B : le jeu A ; C : le jeu B. Réponds A, B ou C.",
          figure: roues([{ nom: "Jeu B", secteurs: ["G", "P", "P", "P", "G", "P", "P", "G", "P", "P"] }]),
          correction:
            "Pour comparer, j'écris les deux jeux sur le même total : 10.\na) Le jeu A a 5 billes, dont 1 gagnante. Avec 2 sacs pareils : 10 billes, dont 2 gagnantes.\n1 chance sur 5, c'est 2 chances sur 10.\nb) Jeu A : 2 chances sur 10. Jeu B : 3 chances sur 10.\n3, c'est plus que 2 : le jeu B est meilleur. Réponse C.\n⛔ Le piège : comparer 1 et 3 directement. Les totaux (5 et 10) ne sont pas les mêmes.\nRéponse : a) 2 ; b) C.",
          micros: ["probabilite_defi", "probabilite_comparer"],
          reponses: [
            { question: "a)", attendu: ["2", "2 chances"] },
            { question: "b)", attendu: "C" },
          ],
        },
        {
          titre: "Pierre, feuille, ciseaux",
          enonce:
            "Zoé et Malik jouent à pierre-feuille-ciseaux. Chacun choisit au hasard. La pierre bat les ciseaux, les ciseaux battent la feuille, la feuille bat la pierre.\na) Combien y a-t-il de parties possibles (un choix pour chacun) ?\nb) Combien de parties sont des égalités ?\nc) Combien de parties Zoé gagne-t-elle ?",
          correction:
            "Je fais un tableau : Zoé en ligne, Malik en colonne. 3 choix chacun.\na) 3 × 3 = 9 parties.\nb) Égalité quand les deux choisissent pareil : pierre-pierre, feuille-feuille, ciseaux-ciseaux. 3 parties.\nc) Il reste 9 − 3 = 6 parties avec un gagnant.\nZoé gagne : pierre contre ciseaux, ciseaux contre feuille, feuille contre pierre. 3 parties.\nMalik gagne les 3 autres. C'est juste : 3 et 3.\n⛔ Le piège : oublier les égalités et dire que Zoé gagne 1 fois sur 2. Elle gagne 3 parties sur 9.\nRéponse : a) 9 ; b) 3 ; c) 3.",
          schema: grille(["Zoé / Malik","pierre", "feuille", "ciseaux"], [
            ["pierre", "égal", "Malik", "Zoé"],
            ["feuille", "Zoé", "égal", "Malik"],
            ["ciseaux", "Malik", "Zoé", "égal"],
          ], [[0, 3], [1, 1], [2, 2]]),
          micros: ["probabilite_defi", "probabilite_deux_etapes"],
          reponses: [
            { question: "a)", attendu: ["9", "9 parties"] },
            { question: "b)", attendu: ["3", "3 parties"] },
            { question: "c)", attendu: ["3", "3 parties"] },
          ],
        },
      ],
    },
  ],
};
