// ─── Fiche d'exercices : la factorisation (4e) — 20 exercices corrigés ────────
//
// RÉÉCRITE le 04/10/2026 au standard de la 5e (étalons de la 4e :
// `maths-4e-relatifs.tsx`, `maths-4e-proportionnalite.tsx`). Un dessin qui aide
// dans CHAQUE exercice, 14 imprimés, aides de dessin locales écrites EN CLAIR et
// relues par le script de recalcul. L'ancienne feuille du 25/09 n'a servi que
// de réservoir ; aucun exercice n'en est recopié.
//
// ⛔⛔ PROGRAMME (Frédéric, 30/09) : en 4e, factorisation par FACTEUR COMMUN
// SEULEMENT — un nombre, une lettre, ou les deux — et contrôle en
// redéveloppant. AUCUNE identité remarquable lue à l'envers (ni x² − 9, ni
// x² + 6x + 9, ni a² − b² : c'est la 3e ; l'ancienne feuille les avait aux
// exercices 6, 11 et 18, c'est la raison de la réécriture). Pas de parenthèse
// commune, pas d'équation produit.
// ⭐ FACTEUR NÉGATIF (Frédéric, 04/10 : « il faut des facteurs négatifs, c'est
// le 5 étoiles ») : exercice 16, en fin de ★★, consigne explicite (« en mettant
// −5 en facteur »), tableau de division « ÷ (−5) » ; il remplace l'exercice à
// deux lettres (3ab + 6a…).
// « Factorise » veut dire factoriser LE PLUS POSSIBLE, avec le plus grand
// facteur commun entier : le piège est nommé aux exercices 3, 5, 11, 14, 19, 20.
//
// Alignée sur la fiche de cours `lib/fiches/maths-4e-factorisation.tsx` (son
// vocabulaire : « facteur commun », « diviser CHAQUE terme », « on vérifie
// toujours en développant », le 1 caché) et sur la banque
// `lib/tutor-v4/questionBank/4e/maths/factorisation.bank.ts`, notionId
// litteral_factorisation.
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni 3x + 12, 6x + 9,
// x² + 5x, 5x − 20, 2x² + 6x, 4x + 12, 3x + 15, 5x + 20, ni 17 × 25 + 3 × 25.
// Ni ceux de l'ancienne feuille (6x + 42, 9x − 36, x² + 8x, 7x + 7, 99 × 7 + 7,
// handball, potager à bande fleurie, forêt, étang), ni ceux de la feuille de 3e
// (8x + 20, 9x² − 15x, x² + x, 10x + 25), ni les développements de la feuille
// de 5e (5x + 20, 6a + 3, 4x + 20, 6x + 60, potager et pelouse).
//
// Les pièges nommés : le 1 caché qu'on ne voit pas (1), le second terme non
// divisé (2, 8, 15), s'arrêter au premier facteur trouvé ou prendre un
// décimal (3), la lettre gardée dans le second terme (4), s'arrêter au nombre
// quand la lettre est encore commune (5), le terme qui disparaît au lieu de
// devenir 1 (6, 10), le nombre seul oublié en calcul mental (7), un terme perdu
// avec trois termes et la lettre prise pour commune (9), factoriser avant de
// réduire (10), un facteur trop petit (11), chercher le facteur avec un seul
// terme (12), deux essais pris pour une preuve (13, 18), une seule
// factorisation possible (14), le signe gardé quand on divise par un nombre
// négatif, −5(x − 3) au lieu de −5(x + 3) (16), une longueur lue comme une aire (17), 4 qui ne divise pas 6 (19), les
// 250 m enlevés une seule fois (20).
//
// Pas de fait réel : tout (club de basket, fresque, jardin, relais) est un
// MODÈLE, à des tailles vraisemblables.
//
// ⭐ LES DESSINS : le RECTANGLE DÉCOUPÉ (`rectangle` : aire k × a + k × b =
// k × (a + b), la hauteur est le facteur commun, la longueur la parenthèse), le
// TABLEAU DE DIVISION par le facteur commun (`division`), les FLÈCHES du
// redéveloppement (`fleches`), des TUILES rangées en paquets identiques
// (`paquets`), des BANDES répétées (`bandes`), le triangle équilatéral
// (commun) et des tableaux. 14 dessins imprimés ; ceux qui redisent le corrigé
// sont `ecranSeulement`.
//
// Les corrigés sont écrits à la première personne (« je divise chaque terme »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-4e-litteral-factorisation.mjs`.
//
// Micro-compétences : litteral_facteur_commun (1, 3, 4, 5, 8, 10, 11, 14, 16),
// litteral_factoriser_simple (2, 3, 4, 5, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17,
// 18, 19, 20), litteral_factoriser_verifier (3, 6, 8, 9, 12, 13, 16, 17, 19, 20),
// litteral_factorisation_defi (3, 7, 8, 13, 14, 16, 18, 20). 4/4.

import type { ReactNode } from "react";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE, triangle } from "@/lib/fiches-exercices/figures";

const ROUGE = "#dc2626";
const VERT = "#16a34a";
const NOIR = "#0f172a";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** Un tableau à plusieurs lignes. ⛔ Trois colonnes courtes au plus. */
const table = (entete: string[], lignes: string[][]) => (
  <div className="mx-auto w-full max-w-[22rem] print:max-w-[15rem]">
    <CanvasRenderer figure={{ kind: "tableau_donnees", headers: entete, rows: lignes.map((values) => ({ values })), display: { compact: true, striped: true } }} />
  </div>
);

/**
 * ⭐ LE RECTANGLE DÉCOUPÉ : un rectangle de hauteur `k` coupé en morceaux de
 * longueurs `parts`, l'aire de chaque morceau écrite dedans (`aires`, « ? » pour
 * une aire à trouver). L'aire totale se lit morceau par morceau (k × a + k × b)
 * ou d'un coup (k × (a + b)) : factoriser, c'est lire la hauteur et la longueur.
 * Largeurs : proportionnelles aux nombres ; une lettre compte comme 6 fois son
 * coefficient (elle n'a pas de valeur). `legende` (facultative) dessous.
 */
const rectangle = (k: string, parts: string[], aires: string[], legende?: string) => {
  const poids = parts.map((p) => {
    const n = Number(p.replace(",", "."));
    return Number.isFinite(n) ? n : (parseFloat(p) || 1) * 6;
  });
  const total = poids.reduce((s, p) => s + p, 0);
  const L = 236;
  // Une aire longue (« 17 × 23 ») demande un morceau plus large, sinon elle touche les bords.
  const larges = poids.map((p, i) => Math.max(aires[i].length > 4 ? 86 : 62, (p / total) * L));
  const echelle = L / larges.reduce((s, w) => s + w, 0);
  const w = larges.map((x) => x * echelle);
  const [x0, y0, h] = [54, 30, 80];
  const xs = w.map((_, i) => x0 + w.slice(0, i).reduce((s, v) => s + v, 0));
  const fonds = ["#dbeafe", "#ffedd5", "#dcfce7"];
  const traits = [BLEU, ORANGE, VERT];
  const H = y0 + h + (legende ? 34 : 10);
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label={`Rectangle de hauteur ${k}, découpé en morceaux de longueurs ${parts.join(", ")}`}>
        {parts.map((p, i) => (
          <g key={i}>
            <rect x={xs[i]} y={y0} width={w[i]} height={h} fill={fonds[i % 3]} stroke={NOIR} strokeWidth={2} />
            <text x={xs[i] + w[i] / 2} y={y0 - 10} textAnchor="middle" fontSize="15" fontWeight="800" fill={traits[i % 3]}>
              {p}
            </text>
            <text x={xs[i] + w[i] / 2} y={y0 + h / 2 + 6} textAnchor="middle" fontSize={aires[i].length > 4 ? 14 : 18} fontWeight="900" fill={aires[i] === "?" ? ROUGE : NOIR}>
              {aires[i]}
            </text>
          </g>
        ))}
        <text x={x0 - 10} y={y0 + h / 2 + 5} textAnchor="end" fontSize="15" fontWeight="800" fill={NOIR}>
          {k}
        </text>
        {legende && (
          <text x={150} y={H - 10} textAnchor="middle" fontSize="14" fontWeight="800" fill={VERT}>
            {legende}
          </text>
        )}
      </svg>
    </div>
  );
};

/**
 * ⭐ LE TABLEAU DE DIVISION : chaque terme (avec son signe, sauf le premier)
 * dans une case, une flèche « ÷ facteur », et ce qui reste, en vert, dans la
 * case du dessous. La ligne du bas recolle le tout : la somme = le produit.
 * Un facteur NÉGATIF (« −5 ») s'écrit « ÷ (−5) » sur les flèches.
 * ⛔ Deux ou trois termes ; 6 signes au plus par case.
 */
const division = (facteur: string, termes: string[], quotients: string[]) => {
  const n = termes.length;
  const cw = 300 / n;
  const bw = Math.min(88, cw - 12);
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox="0 0 300 156" className="block h-auto w-full" role="img" aria-label={`Chaque terme de ${termes.join(" ")} divisé par ${facteur}`}>
        {termes.map((t, i) => {
          const cx = cw * i + cw / 2;
          return (
            <g key={i}>
              <rect x={cx - bw / 2} y={6} width={bw} height={30} rx={6} fill="#eff6ff" stroke={BLEU} strokeWidth={2} />
              <text x={cx} y={27} textAnchor="middle" fontSize="15" fontWeight="800" fill={NOIR}>
                {t}
              </text>
              <line x1={cx} y1={38} x2={cx} y2={78} stroke={NOIR} strokeWidth={2} />
              <path d={`M ${cx - 6} ${71} L ${cx} ${79} L ${cx + 6} ${71}`} fill="none" stroke={NOIR} strokeWidth={2} />
              <text x={cx + 7} y={63} fontSize="14" fontWeight="900" fill={ORANGE}>
                {facteur.startsWith("−") ? `÷ (${facteur})` : `÷ ${facteur}`}
              </text>
              <rect x={cx - bw / 2} y={82} width={bw} height={30} rx={6} fill="#dcfce7" stroke={VERT} strokeWidth={2} />
              <text x={cx} y={103} textAnchor="middle" fontSize="15" fontWeight="800" fill={NOIR}>
                {quotients[i]}
              </text>
            </g>
          );
        })}
        <text x={150} y={142} textAnchor="middle" fontSize="14" fontWeight="900" fill={VERT}>
          {`${termes.join(" ")} = ${facteur}(${quotients.join(" ")})`}
        </text>
      </svg>
    </div>
  );
};

/**
 * ⭐ LES FLÈCHES DU REDÉVELOPPEMENT : le produit `k(…)` écrit en grand, une
 * flèche orange de `k` vers CHAQUE terme de la parenthèse, puis les produits,
 * puis le résultat `developpe`, en vert. Les termes après le premier portent
 * leur signe (« + 1 », « − 3 »).
 */
const fleches = (k: string, termes: string[], developpe: string) => {
  // Chaque morceau est écrit à part, centré sur SA place : la flèche tombe
  // juste sur le terme, quelle que soit la police.
  const cw = 13;
  const morceaux: { texte: string; centre: number; terme?: boolean }[] = [];
  let pos = 0;
  const poser = (texte: string, terme?: boolean) => {
    morceaux.push({ texte, centre: pos + texte.length / 2, terme });
    pos += texte.length;
  };
  poser(k);
  poser("(");
  termes.forEach((t, i) => {
    if (i > 0) {
      pos += 0.6;
      poser(t.slice(0, 1));
      pos += 0.6;
    }
    poser(i > 0 ? t.slice(2) : t, true);
  });
  poser(")");
  const kCentre = k.length / 2;
  const pieces = morceaux.filter((m) => m.terme);
  const ligne = `${k}(${termes.join(" ")})`;
  const x0 = 150 - (pos * cw) / 2;
  const X = (c: number) => x0 + c * cw;
  const produits = termes.map((t, i) => (i > 0 ? `${t.slice(0, 1)} ${k} × ${t.slice(2)}` : `${k} × ${t}`)).join(" ");
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox="0 0 300 140" className="block h-auto w-full" role="img" aria-label={`${ligne} développé : ${developpe}`}>
        {pieces.map((p, i) => {
          const [xa, xb] = [X(kCentre), X(p.centre)];
          const yc = Math.max(4, 18 - 8 * i);
          return (
            <g key={i}>
              <path d={`M ${xa} 50 Q ${(xa + xb) / 2} ${yc} ${xb} 50`} fill="none" stroke={ORANGE} strokeWidth={2.2} />
              <path d={`M ${xb - 6} ${44} L ${xb} ${51} L ${xb + 5} ${43}`} fill="none" stroke={ORANGE} strokeWidth={2.2} />
            </g>
          );
        })}
        {morceaux.map((m, i) => (
          <text key={i} x={X(m.centre)} y={74} textAnchor="middle" fontSize="20" fontWeight="800" fill={NOIR}>
            {m.texte}
          </text>
        ))}
        <text x={150} y={104} textAnchor="middle" fontSize="15" fontWeight="700" fill={NOIR}>
          {`= ${produits}`}
        </text>
        <text x={150} y={130} textAnchor="middle" fontSize="17" fontWeight="900" fill={VERT}>
          {`= ${developpe}`}
        </text>
      </svg>
    </div>
  );
};

/**
 * ⭐ LES TUILES EN PAQUETS : `k` paquets identiques (cadres en pointillé), chacun
 * avec `barres` barres bleues (une par `lettre`) et `carres` petits carrés
 * orange (un par unité). Ce qui se répète saute aux yeux : c'est le facteur
 * commun. La légende dessous.
 */
const paquets = (lettre: string, k: number, barres: number, carres: number, legende: string) => {
  const pw = 8 + barres * 32 + carres * 18;
  const parLigne = Math.max(1, Math.floor(292 / (pw + 8)));
  const lignes = Math.ceil(k / parLigne);
  const H = 8 + lignes * 44 + 26;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label={`${k} paquets identiques : ${legende}`}>
        {Array.from({ length: k }, (_, p) => {
          const [li, co] = [Math.floor(p / parLigne), p % parLigne];
          const n = Math.min(parLigne, k - li * parLigne);
          const x = (300 - n * (pw + 8) + 8) / 2 + co * (pw + 8);
          const y = 8 + li * 44;
          return (
            <g key={p}>
              <rect x={x} y={y} width={pw} height={36} rx={8} fill="none" stroke="#64748b" strokeWidth={1.5} strokeDasharray="4 3" />
              {Array.from({ length: barres }, (_, b) => (
                <g key={`b${b}`}>
                  <rect x={x + 6 + b * 32} y={y + 8} width={28} height={20} rx={3} fill={BLEU} stroke={NOIR} strokeWidth={1.2} />
                  <text x={x + 20 + b * 32} y={y + 23} textAnchor="middle" fontSize="14" fontWeight="800" fill="#fff">
                    {lettre}
                  </text>
                </g>
              ))}
              {Array.from({ length: carres }, (_, c) => (
                <rect key={`c${c}`} x={x + 6 + barres * 32 + c * 18} y={y + 11} width={14} height={14} rx={2} fill={ORANGE} stroke={NOIR} strokeWidth={1.2} />
              ))}
            </g>
          );
        })}
        <text x={150} y={H - 8} textAnchor="middle" fontSize="14" fontWeight="800" fill={NOIR}>
          {legende}
        </text>
      </svg>
    </div>
  );
};

/**
 * ⭐ DES BANDES RÉPÉTÉES : `k` bandes identiques, chacune coupée en morceaux
 * `parts` (une lettre en bleu, un nombre en orange). La légende dessous.
 */
const bandes = (k: number, parts: string[], legende: string) => {
  const poids = parts.map((p) => (/[a-z]/.test(p) ? 150 : 80));
  const tot = poids.reduce((s, p) => s + p, 0);
  const w = poids.map((p) => (p / tot) * 264);
  const H = 10 + k * 34 + 28;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label={`${k} bandes de ${parts.join(" + ")}`}>
        {Array.from({ length: k }, (_, r) => {
          let x = 18;
          return (
            <g key={r}>
              {parts.map((p, i) => {
                const xi = x;
                x += w[i];
                const lettre = /[a-z]/.test(p);
                return (
                  <g key={i}>
                    <rect x={xi} y={10 + r * 34} width={w[i]} height={26} fill={lettre ? "#dbeafe" : "#ffedd5"} stroke={NOIR} strokeWidth={1.5} />
                    <text x={xi + w[i] / 2} y={28 + r * 34} textAnchor="middle" fontSize="14" fontWeight="800" fill={lettre ? BLEU : ORANGE}>
                      {p}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}
        <text x={150} y={H - 8} textAnchor="middle" fontSize="14" fontWeight="800" fill={NOIR}>
          {legende}
        </text>
      </svg>
    </div>
  );
};

export const exercicesFactorisation4e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "litteral-factorisation",
  titre: "La factorisation",
  accroche:
    "Vingt exercices, du geste seul au problème : repérer le facteur commun, factoriser par un nombre, par une lettre ou par les deux, factoriser le plus possible, mettre un nombre négatif en facteur, et toujours vérifier en développant. Du calcul mental, les maillots d'un club de basket, des périmètres, une fresque, trois nombres qui se suivent, un jardin agrandi, un relais. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé, et un dessin.",

  fichesCours: [{ href: "/fiches-cours/maths/4e/litteral-factorisation", titre: "La factorisation" }],
  coachHref: "/coach-ia/maths?classe=4e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Je cherche d'abord ce qui est commun à tous les termes.",
      rappel: [
        "Factoriser, c'est écrire une somme sous la forme d'un PRODUIT : c'est le développement lu à l'envers.",
        "$ka + kb = k(a + b)$ : le facteur commun $k$ peut être un nombre, une lettre, ou les deux.",
        "Le facteur commun divise TOUS les termes. « Factorise » veut dire : avec le plus grand possible.",
        "Je vérifie toujours en développant : je dois retrouver l'expression de départ.",
      ],
      exercices: [
        {
          enonce: "Pour chaque expression, écris chaque terme comme un produit, puis donne le plus grand facteur commun aux deux termes.\na) $7a + 7b$\nb) $4y + 28$\nc) $11t - 11$\nd) $ab + 6a$",
          correction:
            "Un facteur commun est un nombre, ou une lettre, qui multiplie CHAQUE terme. J'écris chaque terme comme un produit.\na) $7a = 7 \\times a$ et $7b = 7 \\times b$ : le facteur commun est $7$.\nb) $4y = 4 \\times y$ et $28 = 4 \\times 7$ : le plus grand facteur commun est $4$. Le dessin le montre : un rectangle de hauteur $4$, coupé en deux morceaux d'aires $4y$ et $28$.\nc) $11t = 11 \\times t$ et $11 = 11 \\times 1$ : le facteur commun est $11$.\nd) $ab = a \\times b$ et $6a = 6 \\times a$ : la lettre $a$ est dans les deux termes, le facteur commun est $a$.\n⛔ Le piège du c) : croire que le $11$ tout seul n'a pas de partenaire. Un nombre est toujours égal à lui-même fois $1$ : $11 = 11 \\times 1$.\nRéponse : a) $7$ ; b) $4$ ; c) $11$ ; d) $a$.",
          schema: rectangle("4", ["y", "7"], ["4y", "28"], "4y + 28 = 4(y + 7)"),
          micros: ["litteral_facteur_commun"],
        },
        {
          enonce: "Factorise.\na) $5x + 35$\nb) $8y - 24$\nc) $21 + 7t$\nd) $9n - 45$",
          correction:
            "Je trouve le facteur commun, puis je divise CHAQUE terme par lui : ce qui reste va dans la parenthèse.\na) $5x \\div 5 = x$ et $35 \\div 5 = 7$ : $5x + 35 = 5(x + 7)$.\nb) $8y \\div 8 = y$ et $24 \\div 8 = 3$ ; le signe moins reste dans la parenthèse : $8y - 24 = 8(y - 3)$.\nc) $21 \\div 7 = 3$ et $7t \\div 7 = t$ : $21 + 7t = 7(3 + t)$.\nd) $9n \\div 9 = n$ et $45 \\div 9 = 5$ : $9n - 45 = 9(n - 5)$.\n⭐ Contrôle du b) : $8 \\times y - 8 \\times 3 = 8y - 24$.\n⛔ Le piège : écrire $8(y - 24)$, en oubliant de diviser le second terme. En développant, on trouverait $8y - 192$.\nRéponse : a) $5(x + 7)$ ; b) $8(y - 3)$ ; c) $7(3 + t)$ ; d) $9(n - 5)$.",
          schema: division("8", ["8y", "− 24"], ["y", "− 3"]),
          micros: ["litteral_factoriser_simple"],
        },
        {
          enonce: "Quatre élèves ont factorisé $18x + 24$.\nInès : $2(9x + 12)$. Malo : $3(6x + 8)$. Yanis : $6(3x + 4)$. Léa : $1{,}5(12x + 16)$.\na) Développe chaque écriture. Sont-elles toutes égales à $18x + 24$ ?\nb) La consigne était « factorise ». Qui a vraiment terminé ? Pourquoi ?\nc) Factorise le plus possible : $20t - 30$, puis $24n + 16$.",
          correction:
            "a) Je développe : $2(9x + 12) = 18x + 24$ ; $3(6x + 8) = 18x + 24$ ; $6(3x + 4) = 18x + 24$ ; $1{,}5(12x + 16) = 18x + 24$. Les quatre écritures sont égales à $18x + 24$.\nb) « Factorise » veut dire : factorise LE PLUS POSSIBLE, avec le plus grand facteur commun entier. Dans $9x + 12$, il reste le facteur $3$ ; dans $6x + 8$, il reste $2$. Dans $3x + 4$, plus rien n'est commun : seul Yanis a terminé. Léa a pris un nombre décimal : on met en facteur un nombre entier, le plus grand qui divise $18$ et $24$, c'est-à-dire $6$.\nc) Le plus grand nombre qui divise $20$ et $30$ est $10$ : $20t - 30 = 10(2t - 3)$. Le plus grand nombre qui divise $24$ et $16$ est $8$ : $24n + 16 = 8(3n + 2)$.\n⛔ Le piège : s'arrêter au premier facteur trouvé, comme Inès avec $2$. Son écriture est juste, mais pas finie : je vérifie toujours que plus rien n'est commun dans la parenthèse.\nRéponse : a) oui, toutes ; b) seul Yanis, avec $6(3x + 4)$ ; c) $10(2t - 3)$ et $8(3n + 2)$.",
          schema: table(["écriture", "développée", "finie ?"], [
            ["2(9x + 12)", "18x + 24", "non"],
            ["3(6x + 8)", "18x + 24", "non"],
            ["6(3x + 4)", "18x + 24", "oui"],
            ["1,5(12x + 16)", "18x + 24", "non"],
          ]),
          micros: ["litteral_facteur_commun", "litteral_factoriser_simple", "litteral_factoriser_verifier", "litteral_factorisation_defi"],
        },
        {
          enonce: "Cette fois, le facteur commun est une lettre. Factorise.\na) $x^2 + 9x$\nb) $y^2 - 4y$\nc) $7t + t^2$\nd) $ab - 3b$",
          correction:
            "$x^2$, c'est $x \\times x$ : au a), la lettre $x$ est dans les deux termes. Je divise chaque terme par la lettre commune.\na) $x^2 \\div x = x$ et $9x \\div x = 9$ : $x^2 + 9x = x(x + 9)$. Sur le dessin, le rectangle a pour hauteur $x$ et pour longueur $x + 9$.\nb) $y^2 \\div y = y$ et $4y \\div y = 4$ : $y^2 - 4y = y(y - 4)$.\nc) $7t \\div t = 7$ et $t^2 \\div t = t$ : $7t + t^2 = t(7 + t)$.\nd) $ab \\div b = a$ et $3b \\div b = 3$ : $ab - 3b = b(a - 3)$.\n⭐ Contrôle du a) : $x \\times x + x \\times 9 = x^2 + 9x$.\n⛔ Le piège : écrire $x(x + 9x)$, en gardant la lettre dans le second terme. En développant, on trouverait $x^2 + 9x^2$ : ce n'est pas l'expression de départ.\nRéponse : a) $x(x + 9)$ ; b) $y(y - 4)$ ; c) $t(7 + t)$ ; d) $b(a - 3)$.",
          schema: rectangle("x", ["x", "9"], ["x²", "9x"], "x² + 9x = x(x + 9)"),
          micros: ["litteral_facteur_commun", "litteral_factoriser_simple"],
        },
        {
          enonce: "Le facteur commun est un nombre ET une lettre. Factorise le plus possible.\na) $4x^2 + 10x$\nb) $9y^2 - 12y$\nc) $15t + 5t^2$\nd) $8a^2 - 8a$",
          correction:
            "Je cherche d'abord le plus grand nombre qui divise les coefficients, puis la lettre présente dans tous les termes. Le facteur commun est leur produit.\na) $2$ divise $4$ et $10$ ; $x$ est dans les deux termes : le facteur commun est $2x$. $4x^2 \\div 2x = 2x$ et $10x \\div 2x = 5$ : $4x^2 + 10x = 2x(2x + 5)$.\nb) $3$ et $y$ : le facteur commun est $3y$. $9y^2 \\div 3y = 3y$ et $12y \\div 3y = 4$ : $9y^2 - 12y = 3y(3y - 4)$.\nc) $5$ et $t$ : $15t \\div 5t = 3$ et $5t^2 \\div 5t = t$ : $15t + 5t^2 = 5t(3 + t)$.\nd) $8$ et $a$ : $8a^2 \\div 8a = a$ et $8a \\div 8a = 1$ : $8a^2 - 8a = 8a(a - 1)$.\n⛔ Le piège du b) : s'arrêter à $3(3y^2 - 4y)$. C'est juste, mais $y$ est encore dans les deux termes de la parenthèse : ce n'est pas fini.\nRéponse : a) $2x(2x + 5)$ ; b) $3y(3y - 4)$ ; c) $5t(3 + t)$ ; d) $8a(a - 1)$.",
          schema: division("3y", ["9y²", "− 12y"], ["3y", "− 4"]),
          micros: ["litteral_facteur_commun", "litteral_factoriser_simple"],
        },
        {
          enonce: "Vérifie chaque factorisation en développant. Corrige celles qui sont fausses.\na) $15x + 20 = 5(3x + 4)$\nb) $7y + 7 = 7y$\nc) $x^2 - 6x = x(x - 6x)$\nd) $16a - 8 = 8(2a - 8)$",
          correction:
            "Pour vérifier, je DÉVELOPPE le produit, puis je compare à l'expression de départ.\na) $5 \\times 3x + 5 \\times 4 = 15x + 20$ : c'est l'expression de départ. Juste.\nb) $7y$ n'est pas l'expression de départ : pour $y = 1$, $7y + 7$ vaut $14$ alors que $7y$ vaut $7$. Faux. Le second terme est $7 = 7 \\times 1$ : $7y + 7 = 7(y + 1)$.\nc) Je développe : $x \\times x - x \\times 6x$ donne $x^2 - 6x^2$, pas $x^2 - 6x$. Faux. $6x \\div x = 6$ : $x^2 - 6x = x(x - 6)$.\nd) Je développe : $8 \\times 2a - 8 \\times 8$ donne $16a - 64$. Faux. $8 \\div 8 = 1$ : $16a - 8 = 8(2a - 1)$.\n⛔ Le piège du b) et du d) : faire disparaître le terme qui EST le facteur commun. Il ne disparaît pas : il devient $1$ dans la parenthèse.\nRéponse : a) juste ; b) $7(y + 1)$ ; c) $x(x - 6)$ ; d) $8(2a - 1)$.",
          schema: fleches("7", ["y", "+ 1"], "7y + 7"),
          micros: ["litteral_factoriser_verifier"],
        },
        {
          enonce: "Calcule de tête, en mettant en facteur le nombre qui se répète.\na) $17 \\times 23 + 17 \\times 77$\nb) $2{,}8 \\times 64 + 2{,}8 \\times 36$\nc) $46 \\times 13 - 46 \\times 3$\nd) $25 \\times 39 + 25$",
          correction:
            "$k \\times a + k \\times b = k \\times (a + b)$ : je mets en facteur le nombre qui se répète, et la parenthèse donne un nombre rond.\na) $17 \\times 23 + 17 \\times 77 = 17 \\times (23 + 77) = 17 \\times 100 = 1\\,700$. Le dessin le montre : deux rectangles de hauteur $17$ collés font un rectangle de longueur $100$.\nb) $2{,}8 \\times 64 + 2{,}8 \\times 36 = 2{,}8 \\times (64 + 36) = 2{,}8 \\times 100 = 280$.\nc) $46 \\times 13 - 46 \\times 3 = 46 \\times (13 - 3) = 46 \\times 10 = 460$.\nd) $25 = 25 \\times 1$, donc $25 \\times 39 + 25 = 25 \\times (39 + 1) = 25 \\times 40 = 1\\,000$.\n⛔ Le piège du d) : croire que le $25$ tout seul n'a pas de partenaire, et compter $39$ fois $25$. Le $25$ seul compte pour $25 \\times 1$ : c'est $40$ fois $25$.\nRéponse : a) $1\\,700$ ; b) $280$ ; c) $460$ ; d) $1\\,000$.",
          schema: rectangle("17", ["23", "77"], ["17 × 23", "17 × 77"], "17 × 100 = 1 700"),
          micros: ["litteral_factoriser_simple", "litteral_factorisation_defi"],
        },
        {
          enonce: "Vrai ou faux ? Justifie.\na) $5x + 3$ peut se factoriser par un nombre entier autre que $1$.\nb) Dans $10x + 15$, le plus grand facteur commun est $5$.\nc) $x^2 + 4x$ et $x(x + 4)$ sont égaux pour toutes les valeurs de $x$.\nd) La factorisation de $2x + 10y$ est $2(x + 10y)$.",
          correction:
            "a) Faux. Les nombres qui divisent $5$ sont $1$ et $5$, et $5$ ne divise pas $3$. Il n'y a pas de facteur commun autre que $1$ : $5x + 3$ ne se factorise pas.\nb) Vrai. $10 = 5 \\times 2$ et $15 = 5 \\times 3$, et dans $2x + 3$ plus rien n'est commun : $10x + 15 = 5(2x + 3)$. Sur le dessin : $5$ paquets identiques de $2$ barres et $3$ carrés.\nc) Vrai. Je développe : $x(x + 4) = x^2 + 4x$. Un développement juste prouve l'égalité pour TOUTES les valeurs.\nd) Faux. Le $2$ doit diviser les DEUX termes : $10y \\div 2 = 5y$, donc $2x + 10y = 2(x + 5y)$. En développant $2(x + 10y)$, on trouve $2x + 20y$.\n⛔ Le piège du d) : mettre $2$ en facteur sans diviser le second terme.\nRéponse : a) faux ; b) vrai ; c) vrai ; d) faux, c'est $2(x + 5y)$.",
          schema: ecranSeulement(paquets("x", 5, 2, 3, "5 × (2x + 3) = 10x + 15")),
          micros: ["litteral_facteur_commun", "litteral_factoriser_verifier", "litteral_factorisation_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je trouve le plus grand facteur commun, je factorise, puis je développe pour vérifier.",
      rappel: [
        "Le facteur commun : le plus grand nombre qui divise tous les coefficients, fois les lettres présentes dans TOUS les termes.",
        "Je divise chaque terme par le facteur commun : autant de termes dans la parenthèse qu'au départ, et un $1$ quand un terme est le facteur lui-même.",
        "Je contrôle : plus rien n'est commun dans la parenthèse, et le développement redonne l'expression de départ.",
        "Avec un facteur NÉGATIF, chaque terme change de signe dans la parenthèse : $-2a - 6 = -2(a + 3)$.",
      ],
      exercices: [
        {
          enonce: "Factorise le plus possible, puis vérifie en développant.\na) $8x + 12y - 4$\nb) $7x^2 - 14x + 21$\nc) $10t^2 + 25t$",
          correction:
            "Avec trois termes, le facteur commun doit diviser les TROIS.\na) $4$ divise $8$, $12$ et $4$ ; aucune lettre n'est dans les trois termes. $8x \\div 4 = 2x$, $12y \\div 4 = 3y$ et $4 \\div 4 = 1$ : $8x + 12y - 4 = 4(2x + 3y - 1)$.\nVérification : $4 \\times 2x + 4 \\times 3y - 4 \\times 1 = 8x + 12y - 4$.\nb) $7$ divise $7$, $14$ et $21$ ; le dernier terme n'a pas de $x$, donc $x$ n'est pas commun. $7x^2 - 14x + 21 = 7(x^2 - 2x + 3)$.\nVérification : $7 \\times x^2 - 7 \\times 2x + 7 \\times 3 = 7x^2 - 14x + 21$.\nc) $5$ divise $10$ et $25$, et $t$ est dans les deux termes : le facteur commun est $5t$. $10t^2 + 25t = 5t(2t + 5)$.\nVérification : $5t \\times 2t + 5t \\times 5 = 10t^2 + 25t$.\n⛔ Le piège du a) : écrire $4(2x + 3y)$, en perdant le dernier terme. Il y a trois termes au départ : il en faut trois dans la parenthèse.\n⛔ Le piège du b) : mettre $7x$ en facteur. $21$ n'a pas de $x$ : la lettre n'est pas commune aux trois termes.\nRéponse : a) $4(2x + 3y - 1)$ ; b) $7(x^2 - 2x + 3)$ ; c) $5t(2t + 5)$.",
          schema: ecranSeulement(division("4", ["8x", "+ 12y", "− 4"], ["2x", "+ 3y", "− 1"])),
          micros: ["litteral_factoriser_simple", "litteral_factoriser_verifier"],
        },
        {
          enonce: "Réduis d'abord, puis factorise le plus possible.\na) $3x + 9 + 5x + 15$\nb) $2y^2 + 7y + 3y^2 - 2y$\nc) $11a + 4 - 2a + 14$",
          correction:
            "Je factorise une expression rangée : je regroupe d'abord les termes semblables.\na) $3x + 5x = 8x$ et $9 + 15 = 24$. Puis $8$ divise $8x$ et $24$ : $3x + 9 + 5x + 15 = 8x + 24 = 8(x + 3)$.\nb) $2y^2 + 3y^2 = 5y^2$ et $7y - 2y = 5y$. Le facteur commun est $5y$ : $2y^2 + 7y + 3y^2 - 2y = 5y^2 + 5y = 5y(y + 1)$.\nc) $11a - 2a = 9a$ et $4 + 14 = 18$ : $11a + 4 - 2a + 14 = 9a + 18 = 9(a + 2)$.\n⭐ Contrôle du a) avec $x = 1$ : au départ, $3 + 9 + 5 + 15 = 32$ ; à la fin, $8 \\times (1 + 3) = 32$.\n⛔ Le piège : factoriser trop tôt, morceau par morceau, par exemple $3(x + 3) + 5x + 15$. C'est juste, mais ce n'est pas un produit : la somme est toujours là.\n⛔ Le piège du b) : oublier le $1$ dans la parenthèse, quand $5y$ est le facteur commun lui-même.\nRéponse : a) $8(x + 3)$ ; b) $5y(y + 1)$ ; c) $9(a + 2)$.",
          schema: ecranSeulement(paquets("x", 8, 1, 3, "8x + 24 = 8 × (x + 3)")),
          micros: ["litteral_factoriser_simple", "litteral_facteur_commun"],
        },
        {
          enonce: "Un club de basket équipe ses $12$ joueuses. Pour chacune, il achète un maillot à $x$ € et une paire de chaussettes à $6$ €. Le trésorier écrit la dépense : $12x + 72$.\na) Que représentent $12x$ et $72$ ?\nb) Factorise $12x + 72$. Que représente la parenthèse ?\nc) Un maillot coûte $25$ €. Calcule la dépense avec chacune des deux écritures.",
          correction:
            "a) $12x$, c'est $12$ maillots à $x$ € : le prix des maillots. $72$, c'est $12 \\times 6$ : le prix des $12$ paires de chaussettes.\nb) Le plus grand nombre qui divise $12$ et $72$ est $12$, car $72 = 12 \\times 6$. Donc $12x + 72 = 12(x + 6)$.\nLa parenthèse $x + 6$, c'est le prix de l'équipement d'UNE joueuse : un maillot et une paire de chaussettes.\nc) Avec la somme : $12 \\times 25 + 72 = 300 + 72 = 372$. Avec le produit : $12 \\times (25 + 6) = 12 \\times 31 = 372$. Les deux donnent $372$ €.\n⛔ Le piège du b) : mettre seulement $6$ en facteur, et écrire $6(2x + 12)$. C'est juste, mais $2x + 12$ a encore $2$ en commun ; et la parenthèse ne dit plus rien de la situation.\nRéponse : a) le prix des maillots et celui des chaussettes ; b) $12(x + 6)$, le prix pour une joueuse ; c) $372$ €.",
          schema: rectangle("12", ["x", "6"], ["12x", "72"], "12x + 72 = 12(x + 6)"),
          micros: ["litteral_facteur_commun", "litteral_factoriser_simple"],
        },
        {
          enonce: "Complète chaque factorisation, puis vérifie en développant.\na) $18x + 30 = 6(\\dots + \\dots)$\nb) $14y - 21 = \\dots(2y - 3)$\nc) $x^2 - 10x = x(\\dots)$\nd) $20a^2 + 8a = 4a(\\dots)$",
          correction:
            "a) Je divise chaque terme par $6$ : $18x \\div 6 = 3x$ et $30 \\div 6 = 5$. Donc $18x + 30 = 6(3x + 5)$.\nb) Je cherche le nombre qui, multiplié par $2y$, donne $14y$ : c'est $7$. Et $7 \\times 3 = 21$ : ça marche aussi pour le second terme. $14y - 21 = 7(2y - 3)$.\nc) $x^2 \\div x = x$ et $10x \\div x = 10$ : $x^2 - 10x = x(x - 10)$.\nd) $20a^2 \\div 4a = 5a$ et $8a \\div 4a = 2$ : $20a^2 + 8a = 4a(5a + 2)$.\nVérification du d) : $4a \\times 5a + 4a \\times 2 = 20a^2 + 8a$.\n⛔ Le piège du b) : chercher le facteur avec un seul terme. Je contrôle toujours avec l'autre : $7 \\times 3 = 21$.\nRéponse : a) $3x + 5$ ; b) $7$ ; c) $x - 10$ ; d) $5a + 2$.",
          schema: ecranSeulement(division("4a", ["20a²", "+ 8a"], ["5a", "+ 2"])),
          micros: ["litteral_factoriser_simple", "litteral_factoriser_verifier"],
        },
        {
          enonce: "Programme A : choisir un nombre ; le multiplier par $6$ ; ajouter $15$.\nProgramme B : choisir un nombre ; le multiplier par $2$ ; ajouter $5$ ; multiplier le résultat par $3$.\na) Applique les deux programmes à $4$, puis à $10$.\nb) On choisit un nombre $x$. Écris le résultat du programme A.\nc) Factorise ce résultat, et explique pourquoi les deux programmes donnent toujours le même nombre.",
          correction:
            "a) Avec $4$ : A donne $4 \\times 6 + 15 = 39$ ; B donne $(4 \\times 2 + 5) \\times 3 = 13 \\times 3 = 39$.\nAvec $10$ : A donne $10 \\times 6 + 15 = 75$ ; B donne $(10 \\times 2 + 5) \\times 3 = 25 \\times 3 = 75$.\nb) $x$ multiplié par $6$, puis $15$ de plus : $6x + 15$.\nc) $3$ divise $6$ et $15$ : $6x + 15 = 3(2x + 5)$. Or le programme B calcule exactement $3 \\times (2x + 5)$ : d'abord $2x + 5$, puis fois $3$. Les deux programmes donnent le même nombre, pour TOUT nombre $x$.\n⛔ Le piège : croire que les deux essais du a) prouvent la règle. Ils donnent une idée ; c'est la factorisation qui la prouve pour tous les nombres.\nRéponse : a) $39$ et $39$, puis $75$ et $75$ ; b) $6x + 15$ ; c) $6x + 15 = 3(2x + 5)$, c'est le programme B.",
          schema: ecranSeulement(
            table(["x", "programme A", "programme B"], [
              ["4", "39", "39"],
              ["10", "75", "75"],
            ]),
          ),
          micros: ["litteral_factoriser_simple", "litteral_factoriser_verifier", "litteral_factorisation_defi"],
        },
        {
          enonce: "L'aire d'un rectangle est $3x^2 + 21x$ (en cm²).\na) Sa largeur est $3x$. Quelle est sa longueur ?\nb) Un autre rectangle a la même aire et une largeur de $3$. Quelle est sa longueur ?\nc) Un troisième a la même aire et une largeur de $x$. Quelle est sa longueur ?\nd) Laquelle des trois écritures est factorisée le plus possible ?",
          correction:
            "L'aire d'un rectangle est largeur × longueur : je trouve la longueur en divisant chaque terme de l'aire par la largeur.\na) $3x^2 \\div 3x = x$ et $21x \\div 3x = 7$ : $3x^2 + 21x = 3x(x + 7)$. La longueur est $x + 7$.\nb) $3x^2 \\div 3 = x^2$ et $21x \\div 3 = 7x$ : $3x^2 + 21x = 3(x^2 + 7x)$. La longueur est $x^2 + 7x$.\nc) $3x^2 \\div x = 3x$ et $21x \\div x = 21$ : $3x^2 + 21x = x(3x + 21)$. La longueur est $3x + 21$.\nd) Dans $x^2 + 7x$, il reste $x$ en commun ; dans $3x + 21$, il reste $3$. Dans $x + 7$, plus rien : $3x(x + 7)$ est factorisée le plus possible.\n⭐ Contrôle pour $x = 3$ : l'aire vaut $3 \\times 9 + 21 \\times 3 = 90$, et le rectangle du a) mesure $9$ sur $10$ : $9 \\times 10 = 90$.\n⛔ Le piège : croire qu'une expression n'a qu'une seule factorisation. Elle en a plusieurs ; « factorise » demande la plus poussée.\nRéponse : a) $x + 7$ ; b) $x^2 + 7x$ ; c) $3x + 21$ ; d) $3x(x + 7)$.",
          schema: rectangle("3x", ["x", "7"], ["3x²", "21x"], "3x² + 21x = 3x(x + 7)"),
          micros: ["litteral_factoriser_simple", "litteral_facteur_commun", "litteral_factorisation_defi"],
        },
        {
          enonce: "Les côtés d'un polygone régulier sont tous égaux.\na) Un triangle équilatéral a pour périmètre $9x + 6$ (en cm). Quelle est la longueur d'un côté ?\nb) Un carré a pour périmètre $12x + 28$. Quelle est la longueur d'un côté ?\nc) Un hexagone régulier (six côtés) a pour périmètre $24x + 30$. Quelle est la longueur d'un côté ?\nd) Calcule le côté du carré pour $x = 2$.",
          correction:
            "Le périmètre d'un polygone régulier, c'est le nombre de côtés FOIS un côté. Je mets donc en facteur le nombre de côtés : la parenthèse est le côté.\na) $9x \\div 3 = 3x$ et $6 \\div 3 = 2$ : $9x + 6 = 3(3x + 2)$. Un côté mesure $3x + 2$.\nb) $12x \\div 4 = 3x$ et $28 \\div 4 = 7$ : $12x + 28 = 4(3x + 7)$. Un côté mesure $3x + 7$.\nc) $24x \\div 6 = 4x$ et $30 \\div 6 = 5$ : $24x + 30 = 6(4x + 5)$. Un côté mesure $4x + 5$.\n⭐ Ici, le nombre de côtés est justement le plus grand facteur commun.\nd) Pour $x = 2$ : $3 \\times 2 + 7 = 13$. Le côté mesure $13$ cm. Contrôle : $12 \\times 2 + 28 = 52$ et $4 \\times 13 = 52$.\n⛔ Le piège : diviser seulement le premier terme, et répondre $3x + 6$ pour le triangle. Le périmètre serait alors $3 \\times (3x + 6)$, soit $9x + 18$.\nRéponse : a) $3x + 2$ ; b) $3x + 7$ ; c) $4x + 5$ ; d) $13$ cm.",
          schema: ecranSeulement(triangle({ A: [2, 3.4641], B: [0, 0], C: [4, 0] }, { cotes: { AB: "3x + 2", BC: "3x + 2", CA: "3x + 2" } })),
          micros: ["litteral_factoriser_simple"],
        },
        {
          enonce: "Cette fois, on met un nombre NÉGATIF en facteur.\na) Factorise $-5x - 15$ en mettant $-5$ en facteur.\nb) Factorise $-4x + 12$ en mettant $-4$ en facteur.\nc) Factorise $-6x^2 - 9x$ en mettant $-3x$ en facteur.\nd) Factorise $-2y + 14$ en mettant un nombre négatif en facteur.\nVérifie chaque réponse en redéveloppant.",
          correction:
            "Je divise CHAQUE terme par le facteur négatif, avec la règle des signes : diviser par un nombre négatif change le signe de chaque terme.\na) $-5x \\div (-5) = x$ et $-15 \\div (-5) = 3$ : $-5x - 15 = -5(x + 3)$. Les deux termes étaient négatifs ; dans la parenthèse, ils deviennent positifs.\nb) $-4x \\div (-4) = x$ et $12 \\div (-4) = -3$ : $-4x + 12 = -4(x - 3)$.\nc) $-6x^2 \\div (-3x) = 2x$ et $-9x \\div (-3x) = 3$ : $-6x^2 - 9x = -3x(2x + 3)$.\nd) Je prends $-2$, qui divise $-2$ et $14$ : $-2y \\div (-2) = y$ et $14 \\div (-2) = -7$, donc $-2y + 14 = -2(y - 7)$.\nVérification du b) en redéveloppant : $(-4) \\times x + (-4) \\times (-3) = -4x + 12$. Et du a) : $(-5) \\times x + (-5) \\times 3 = -5x - 15$.\n⛔ Le piège du a) : écrire $-5(x - 3)$, en gardant le signe moins du $-15$. Or $-15 \\div (-5) = 3$ : moins divisé par moins donne plus. En redéveloppant $-5(x - 3)$, on trouverait $-5x + 15$, pas l'expression de départ.\nRéponse : a) $-5(x + 3)$ ; b) $-4(x - 3)$ ; c) $-3x(2x + 3)$ ; d) $-2(y - 7)$.",
          schema: division("−5", ["−5x", "− 15"], ["x", "+ 3"]),
          micros: ["litteral_facteur_commun", "litteral_factoriser_simple", "litteral_factoriser_verifier", "litteral_factorisation_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions. J'écris la somme, je la factorise, et je réponds par une phrase.",
      rappel: [
        "Je traduis la situation par une somme, puis je la réduis.",
        "Je factorise pour faire apparaître ce qui se répète : la parenthèse a souvent un sens, une longueur ou un prix pour un.",
        "Je vérifie en développant, ou en calculant avec un nombre.",
      ],
      exercices: [
        {
          titre: "La fresque du collège",
          enonce:
            "Des élèves peignent une fresque sur un mur de $3$ m de haut. Elle a trois panneaux côte à côte, de même hauteur : un de $x$ m de long, un de $2x$ m, et un de $4$ m.\na) Écris l'aire de chaque panneau, puis l'aire totale, réduite.\nb) Factorise l'aire totale. Que représente la parenthèse ?\nc) Pour $x = 2{,}5$, calcule la longueur de la fresque, puis son aire de deux façons.\nd) Un pot de peinture couvre $6$ m². Combien de pots faut-il pour $x = 2{,}5$ ?",
          figure: rectangle("3", ["x", "2x", "4"], ["?", "?", "?"]),
          correction:
            "a) L'aire d'un rectangle, c'est hauteur × longueur. Les panneaux : $3 \\times x = 3x$ ; $3 \\times 2x = 6x$ ; $3 \\times 4 = 12$ (en m²). L'aire totale : $3x + 6x + 12 = 9x + 12$.\nb) $3$ divise $9$ et $12$ : $9x + 12 = 3(3x + 4)$. La hauteur est $3$ m, donc la parenthèse $3x + 4$ est la longueur totale de la fresque : $x + 2x + 4$.\nc) La longueur : $3 \\times 2{,}5 + 4 = 11{,}5$ m. L'aire avec la somme : $9 \\times 2{,}5 + 12 = 34{,}5$. Avec le produit : $3 \\times 11{,}5 = 34{,}5$. L'aire est $34{,}5$ m².\nd) $34{,}5 \\div 6 = 5{,}75$ : $5$ pots ne suffisent pas, il en faut $6$.\n⛔ Le piège du b) : lire $3x + 4$ comme une aire. C'est une longueur : l'aire, c'est $3$ fois cette longueur.\nRéponse : a) $3x$, $6x$ et $12$ ; $9x + 12$ ; b) $3(3x + 4)$, la longueur ; c) $11{,}5$ m et $34{,}5$ m² ; d) $6$ pots.",
          micros: ["litteral_factoriser_simple", "litteral_factoriser_verifier"],
        },
        {
          titre: "Trois nombres qui se suivent",
          enonce:
            "Hugo choisit trois nombres entiers qui se suivent, et les additionne.\na) Fais-le avec $8$, $9$ et $10$, puis avec $41$, $42$ et $43$. Divise chaque somme par $3$ : que remarques-tu ?\nb) On appelle $n$ le plus petit des trois nombres. Écris les deux autres, puis la somme, réduite.\nc) Factorise la somme. Explique pourquoi elle est toujours un multiple de $3$, et égale à $3$ fois le nombre du milieu.\nd) Trois nombres qui se suivent ont pour somme $132$. Lesquels ?",
          correction:
            "a) $8 + 9 + 10 = 27$ et $27 \\div 3 = 9$. $41 + 42 + 43 = 126$ et $126 \\div 3 = 42$. Chaque fois, la somme divisée par $3$ donne le nombre du milieu.\nb) Les deux autres sont $n + 1$ et $n + 2$. La somme : $n + n + 1 + n + 2 = 3n + 3$.\nc) $3n + 3 = 3(n + 1)$. C'est $3$ fois un nombre entier : un multiple de $3$. Et $n + 1$ est le nombre du milieu.\nLe dessin le montre : les trois barres et les trois carrés se rangent en $3$ paquets identiques d'une barre et d'un carré.\nd) $132 \\div 3 = 44$ : le nombre du milieu est $44$. Les nombres sont $43$, $44$ et $45$. Contrôle : $43 + 44 + 45 = 132$.\n⛔ Le piège : croire que deux exemples prouvent la règle. C'est la factorisation qui la prouve, pour tous les nombres $n$.\nRéponse : a) $27$ et $126$, le nombre du milieu ; b) $3n + 3$ ; c) $3(n + 1)$ ; d) $43$, $44$ et $45$.",
          schema: paquets("n", 3, 1, 1, "3n + 3 = 3 × (n + 1)"),
          micros: ["litteral_factoriser_simple", "litteral_factorisation_defi"],
        },
        {
          titre: "Le jardin agrandi",
          enonce:
            "Un jardin carré a des côtés de $x$ m. On l'agrandit d'une bande de $3$ m de large, le long d'un de ses côtés, pour y planter des framboisiers.\na) Écris l'aire du carré, celle de la bande, puis l'aire totale.\nb) Factorise l'aire totale. Quelles sont les dimensions du nouveau jardin ?\nc) Pour $x = 12$, calcule l'aire totale avec les deux écritures.\nd) Écris le périmètre du nouveau jardin, puis factorise-le.",
          correction:
            "a) Le carré : $x \\times x = x^2$. La bande : un rectangle de $x$ m sur $3$ m, d'aire $3x$. L'aire totale : $x^2 + 3x$ (en m²).\nb) $x$ est dans les deux termes : $x^2 + 3x = x(x + 3)$. Le nouveau jardin est un rectangle de $x$ m sur $x + 3$ m : c'est ce que montre le dessin.\nc) Avec la somme : $12^2 + 3 \\times 12 = 144 + 36 = 180$. Avec le produit : $12 \\times (12 + 3) = 12 \\times 15 = 180$. L'aire est $180$ m².\nd) Le périmètre : $x + (x + 3) + x + (x + 3) = 4x + 6$. Puis $4x + 6 = 2(2x + 3)$ : c'est deux fois la somme de la largeur $x$ et de la longueur $x + 3$.\n⛔ Le piège du d) : écrire $4(x + 6)$. Le $4$ ne divise pas $6$ : le plus grand facteur commun de $4$ et de $6$ est $2$.\nRéponse : a) $x^2$, $3x$ et $x^2 + 3x$ ; b) $x(x + 3)$, un rectangle de $x$ m sur $x + 3$ m ; c) $180$ m² ; d) $4x + 6 = 2(2x + 3)$.",
          schema: rectangle("x", ["x", "3"], ["x²", "3x"], "x² + 3x = x(x + 3)"),
          micros: ["litteral_factoriser_simple", "litteral_factoriser_verifier"],
        },
        {
          titre: "Le relais solidaire",
          enonce:
            "Pour une course solidaire, chaque équipe compte $4$ relayeurs. Chacun court la même distance : $x$ m sur la piste, puis $250$ m dans le parc.\na) Écris la distance parcourue par l'équipe de deux façons : développée, puis factorisée.\nb) Vérifie en développant.\nc) L'équipe parcourt $5\\,000$ m en tout. Quelle distance court chaque relayeur ? Combien de mètres sur la piste ?\nd) Mila écrit la distance $2(2x + 500)$. A-t-elle raison ? Sa factorisation est-elle finie ?",
          figure: bandes(4, ["x", "250"], "4 relayeurs : la même distance chacun"),
          correction:
            "a) Chaque relayeur court $x + 250$ m, et ils sont $4$ : la distance est $4(x + 250)$. Développée : $4x + 1\\,000$.\nb) $4 \\times x + 4 \\times 250 = 4x + 1\\,000$ : c'est bien la même distance.\nc) Les $5\\,000$ m, c'est $4$ fois la distance d'un relayeur : $5\\,000 \\div 4 = 1\\,250$ m par relayeur. Sur la piste : $1\\,250 - 250 = 1\\,000$ m.\nd) $2(2x + 500) = 4x + 1\\,000$ : son écriture est juste. Mais $2x + 500$ a encore $2$ en commun : $2(2x + 500) = 4(x + 250)$. Sa factorisation n'est pas finie.\n⭐ Le dessin montre les $4$ bandes identiques : la factorisation fait voir ce qui se répète.\n⛔ Le piège du c) : enlever les $250$ m une seule fois, sur le total. Les $250$ m du parc reviennent pour CHAQUE relayeur.\nRéponse : a) $4x + 1\\,000$ et $4(x + 250)$ ; c) $1\\,250$ m par relayeur, dont $1\\,000$ m sur la piste ; d) juste, mais pas finie : $4(x + 250)$.",
          micros: ["litteral_factoriser_simple", "litteral_factoriser_verifier", "litteral_factorisation_defi"],
        },
      ],
    },
  ],
};
