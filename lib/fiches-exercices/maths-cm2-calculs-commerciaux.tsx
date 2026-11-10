// ─── Fiche d'exercices : les calculs commerciaux (CM2) — 20 exercices corrigés ─
//
// 10/11/2026 : feuille NOUVELLE, sur la forme des feuilles CM2
// (`maths-cm2-fraction.tsx`, `maths-cm2-tableau.tsx`) : 8 ★, 7 ★★, 5 ★★★, un
// rappel avant chaque niveau, corrigés à la première personne. Pas de fiche de
// cours pour cette notion : `fichesCours: []`.
//
// Alignée sur la carte mentale remplie (`lib/cartes/remplies/cm2.json`, clé
// `cm2/calculs_commerciaux`) et sur la banque `commerce-prix.bank.ts` : prix
// d'achat, frais, prix de revient, prix de vente, bénéfice et perte ; capital,
// taux, durée et intérêt simple (sur un an, plusieurs années, quelques mois) ;
// facture (prix × quantité, total), prix hors taxe, TVA, prix TTC.
// ⭐ Notion des programmes de Belgique, du Sénégal et de Côte d'Ivoire (micros
// masquées en France, voir microSkills.ts) : la feuille est prête pour eux.
// ⛔ LIMITES DU CM2 : un pourcentage se calcule « pour 100 € » (3 % = 3 € pour
// 100 €) ; la TVA est à 20 % ; aucun taux à virgule.
// ⛔ CM2 = AUCUNE question ouverte : nombres, QCM A/B/C (réponses A : 3 b),
// 8 a), 20 c) ; B : 3 a), 9 c) ; C : 3 c), 14 a)), un mot (perte, Soleil),
// vrai/faux.
// ⛔ Aucun exemple de la carte mentale n'est repris (vélo 200 € + 30 € vendu
// 300 € ; Nina 200 € à 3 % ; 3 cahiers à 2 € et TVA de 1,20 €).
//
// Les pièges nommés : oublier les frais (1, 9, 10, 16, 19, 20), vente − achat
// au lieu de vente − revient (2, 9), confondre les mots (3, 5), confondre
// intérêt et total (4, 11, 17), prendre 4 % de 300 pour 4 € (4), un seul
// article par ligne (6, 13), enlever la TVA au lieu de l'ajouter (7, 8, 13,
// 18), une perte appelée bénéfice (2, 9), multiplier au lieu de diviser pour
// des mois (12), comparer les taux sans les capitaux (15), le prix d'un bol
// pris pour le bénéfice (19).
//
// ⭐ LES MATHS SONT TRANSVERSALES ET LES MÉTIERS NOMBREUX : réparateur de
// vélos (9), fleuriste (10), banquière (11, 15), papeterie (6), club de sport
// (13), kermesse (16), mécanicienne (18), potière (19), brocanteur (20).
// Aucun contexte réunionnais sur cette feuille. Tout est un MODÈLE.
//
// ⭐ LES DESSINS : la BANDE (le revient = achat + frais, la vente = revient +
// bénéfice) en SVG de 300 de large, police 14, et la FACTURE en tableau HTML
// de quatre colonnes courtes (rien ne déborde à 375 px).
//
// Micro-compétences : prix_revient_vente_benefice (1, 2, 3, 9, 10, 16, 19, 20),
// interet_simple (4, 5, 11, 12, 15, 17, 20), facture_tva (6, 7, 8, 13, 14, 18).
// 3/3.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

const BLEU = "#2563eb";
const ORANGE = "#ea580c";
const VERT = "#16a34a";
const NOIR = "#0f172a";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/**
 * LA BANDE : chaque ligne est une barre faite de morceaux (le nombre écrit
 * dedans), à la même échelle. Ex. revient = [achat 90][pneus 24][chaîne 16],
 * vente = [revient 130][bénéfice 45]. Les valeurs sont écrites EN CLAIR.
 */
type Morceau = { v: number; label: string; couleur?: string };
const bandes = (lignes: { nom: string; morceaux: Morceau[] }[]) => {
  const W = 300;
  const gauche = 78;
  const total = Math.max(...lignes.map((l) => l.morceaux.reduce((s, m) => s + m.v, 0)));
  const k = (W - gauche - 6) / total;
  const H = lignes.length * 40 + 6;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Bandes des prix">
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

/**
 * LA FACTURE : article, quantité, prix d'un article, montant. « ? » = à
 * trouver. `pied` : les lignes du bas (Total HT, TVA, TTC).
 */
const facture = (lignes: [string, string, string, string][], pied: [string, string][] = []) => (
  <div className="mx-auto w-full max-w-[20rem]">
    <table className="mx-auto w-full border-collapse text-sm">
      <thead>
        <tr className="bg-slate-100 text-slate-800">
          {["Article", "Qté", "Prix", "Montant"].map((t) => (
            <th key={t} className="border border-slate-400 px-1.5 py-1 font-semibold">
              {t}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {lignes.map((l, i) => (
          <tr key={i}>
            {l.map((c, j) => (
              <td key={j} className={`border border-slate-400 px-1.5 py-1 ${j === 0 ? "text-left" : "text-right"} ${c === "?" ? "font-bold text-blue-700" : "text-slate-900"}`}>
                {c}
              </td>
            ))}
          </tr>
        ))}
        {pied.map(([nom, val], i) => (
          <tr key={`p${i}`} className="bg-slate-50">
            <td colSpan={3} className="border border-slate-400 px-1.5 py-1 text-right font-semibold text-slate-800">
              {nom}
            </td>
            <td className={`border border-slate-400 px-1.5 py-1 text-right ${val === "?" ? "font-bold text-blue-700" : "font-semibold text-slate-900"}`}>{val}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const exercicesCalculsCommerciauxCm2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "calculs-commerciaux",
  titre: "Les calculs commerciaux",
  accroche:
    "Vingt exercices, du geste seul au problème. Calculer un prix de revient, un bénéfice ou une perte. Trouver l'intérêt d'une somme placée. Lire et compléter une facture, ajouter la TVA. Un réparateur de vélos, une fleuriste, une banque, un club de sport, une kermesse, un garage, un atelier de poterie et une brocante. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=cm2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un calcul par question. Je repère d'abord le bon mot : achat, frais, revient, vente.",
      rappel: [
        "Prix de revient = prix d'achat + frais.",
        "Bénéfice = prix de vente − prix de revient. Si la vente est plus petite, c'est une perte.",
        "Un taux de 3 %, c'est 3 € pour 100 €. La TVA à 20 %, c'est 20 € pour 100 € hors taxe.",
      ],
      exercices: [
        {
          enonce: "Calcule le prix de revient.\na) Prix d'achat : 150 €. Frais : 25 €.\nb) Prix d'achat : 80 €. Frais : 12 €.\nc) Prix d'achat : 1 200 €. Frais : 300 €.",
          reponses: [
            { question: "a)", attendu: "175" },
            { question: "b)", attendu: "92" },
            { question: "c)", attendu: "1500" },
          ],
          correction:
            "Le prix de revient, c'est tout ce que l'objet a coûté au commerçant : l'achat ET les frais.\na) 150 + 25 = 175 €.\nb) 80 + 12 = 92 €.\nc) 1 200 + 300 = 1 500 €.\n⛔ Le piège : oublier les frais. Le transport, les réparations, l'emballage coûtent aussi de l'argent.\nRéponse : a) 175 € ; b) 92 € ; c) 1 500 €.",
          micros: ["prix_revient_vente_benefice"],
        },
        {
          enonce: "a) Prix de revient : 60 €. Prix de vente : 85 €. Quel est le bénéfice ?\nb) Prix de revient : 340 €. Prix de vente : 400 €. Quel est le bénéfice ?\nc) Prix de revient : 95 €. Prix de vente : 80 €. Est-ce un bénéfice ou une perte ?\nd) De combien d'euros ?",
          reponses: [
            { question: "a)", attendu: "25" },
            { question: "b)", attendu: "60" },
            { question: "c)", attendu: "perte" },
            { question: "d)", attendu: "15" },
          ],
          correction:
            "Bénéfice = prix de vente − prix de revient.\na) 85 − 60 = 25 €.\nb) 400 − 340 = 60 €.\nc) La vente (80 €) est plus PETITE que le revient (95 €) : le commerçant perd de l'argent. C'est une perte.\nd) 95 − 80 = 15 €. La perte est de 15 €.\n⛔ Le piège du c) : faire 80 − 95 sans réfléchir, ou appeler ça un bénéfice. Quand on vend moins cher que ce que l'objet a coûté, on perd.\nRéponse : a) 25 € ; b) 60 € ; c) une perte ; d) 15 €.",
          micros: ["prix_revient_vente_benefice"],
        },
        {
          enonce: "Choisis le bon mot.\na) Le prix que le commerçant paie à son fournisseur s'appelle :\nA : le prix de vente ; B : le prix d'achat ; C : le bénéfice\nb) Ce que le commerçant gagne sur une vente s'appelle :\nA : le bénéfice ; B : les frais ; C : le prix de revient\nc) Prix d'achat + frais, c'est :\nA : le prix de vente ; B : la perte ; C : le prix de revient",
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: "A" },
            { question: "c)", attendu: "C" },
          ],
          correction:
            "Je suis le chemin d'un objet : le commerçant l'ACHÈTE, il paie des FRAIS, puis il le VEND.\na) Payer le fournisseur, c'est acheter : le prix d'achat. Choix B.\nb) Ce qu'il gagne, c'est la différence entre la vente et le revient : le bénéfice. Choix A.\nc) L'achat et les frais ensemble : le prix de revient. Choix C.\n⛔ Le piège : confondre prix de vente (payé par le client) et prix d'achat (payé par le commerçant).\nRéponse : a) B ; b) A ; c) C.",
          micros: ["prix_revient_vente_benefice"],
        },
        {
          enonce: "On place de l'argent pendant 1 an. Calcule l'intérêt.\na) 100 € à 4 %\nb) 300 € à 4 %\nc) 500 € à 2 %\nd) Au b), quelle somme a-t-on au bout d'un an ?",
          reponses: [
            { question: "a)", attendu: "4" },
            { question: "b)", attendu: "12" },
            { question: "c)", attendu: "10" },
            { question: "d)", attendu: "312" },
          ],
          correction:
            "Un taux de 4 %, c'est 4 € gagnés pour 100 € placés, en un an.\na) 100 € : une fois 100. L'intérêt est 4 €.\nb) 300 €, c'est 3 fois 100 €. 3 × 4 = 12 €.\nc) 500 €, c'est 5 fois 100 €. 5 × 2 = 10 €.\nd) Au bout d'un an, j'ai la somme placée ET l'intérêt : 300 + 12 = 312 €.\n⛔ Le piège du b) : répondre 4 €. 4 €, c'est pour 100 € seulement ; ici, il y a 3 fois 100 €.\nRéponse : a) 4 € ; b) 12 € ; c) 10 € ; d) 312 €.",
          micros: ["interet_simple"],
        },
        {
          enonce: "Nina place 400 € à 3 % pendant 2 ans.\na) Quel est le capital, en euros ?\nb) Quel est le taux, en % ?\nc) Quelle est la durée, en années ?\nd) Quel est l'intérêt d'un an ?\ne) Quel est l'intérêt pour les 2 ans ?",
          reponses: [
            { question: "a)", attendu: "400" },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: "2" },
            { question: "d)", attendu: "12" },
            { question: "e)", attendu: "24" },
          ],
          correction:
            "Le capital est la somme placée. Le taux dit ce qu'elle rapporte en un an, en %. La durée est le temps du placement.\na) Le capital : 400 €.\nb) Le taux : 3 %.\nc) La durée : 2 ans.\nd) 3 % : 3 € pour 100 €. 400 €, c'est 4 fois 100 €. 4 × 3 = 12 €.\ne) Chaque année rapporte 12 €. 2 × 12 = 24 €.\n⛔ Le piège : confondre le taux (3 %) et l'intérêt (12 € par an). Le taux est un pourcentage, l'intérêt est une somme en euros.\nRéponse : a) 400 € ; b) 3 % ; c) 2 ans ; d) 12 € ; e) 24 €.",
          micros: ["interet_simple"],
        },
        {
          enonce: "À la papeterie, complète la facture.\na) Montant des stylos\nb) Montant des classeurs\nc) Montant des trousses\nd) Total à payer",
          figure: facture(
            [
              ["Stylo", "4", "1,50 €", "?"],
              ["Classeur", "3", "3,20 €", "?"],
              ["Trousse", "2", "7,45 €", "?"],
            ],
            [["Total", "?"]],
          ),
          reponses: [
            { question: "a)", attendu: "6" },
            { question: "b)", attendu: "9,6" },
            { question: "c)", attendu: "14,9" },
            { question: "d)", attendu: "30,5" },
          ],
          correction:
            "Sur chaque ligne : montant = quantité × prix d'un article.\na) 4 × 1,50 = 6 €.\nb) 3 × 3,20 = 9,60 €. (3 × 3 = 9 et 3 × 0,20 = 0,60.)\nc) 2 × 7,45 = 14,90 €. (le double de 7,45.)\nd) J'ajoute les trois montants : 6 + 9,60 + 14,90 = 30,50 €.\n⛔ Le piège : recopier le prix d'un seul article dans la colonne Montant. Il faut multiplier par la quantité.\nRéponse : a) 6 € ; b) 9,60 € ; c) 14,90 € ; d) 30,50 €.",
          micros: ["facture_tva"],
        },
        {
          enonce: "La TVA est de 20 % du prix hors taxe (HT).\na) Un objet coûte 50 € HT. Combien fait la TVA ?\nb) Quel est son prix TTC ?\nc) Un autre objet coûte 120 € HT. Combien fait la TVA ?\nd) Quel est son prix TTC ?",
          reponses: [
            { question: "a)", attendu: "10" },
            { question: "b)", attendu: "60" },
            { question: "c)", attendu: "24" },
            { question: "d)", attendu: "144" },
          ],
          correction:
            "20 %, c'est 20 € de TVA pour 100 € HT. Prix TTC = prix HT + TVA.\na) 50 €, c'est la moitié de 100 €. La TVA est la moitié de 20 € : 10 €.\nb) 50 + 10 = 60 € TTC.\nc) 120 € = 100 € + 20 €. Pour 100 € : 20 €. Pour 20 € (un cinquième de 100) : 4 €. TVA : 20 + 4 = 24 €.\nd) 120 + 24 = 144 € TTC.\n⛔ Le piège : enlever la TVA au lieu de l'ajouter. Le prix TTC (toutes taxes comprises) est toujours le plus grand.\nRéponse : a) 10 € ; b) 60 € ; c) 24 € ; d) 144 €.",
          micros: ["facture_tva"],
        },
        {
          enonce: "a) Le prix TTC d'un objet est :\nA : plus grand que son prix HT ; B : égal à son prix HT ; C : plus petit que son prix HT\nb) Un jeu coûte 80 € HT. La TVA est de 16 €. Quel est son prix TTC ?\nc) Vrai ou faux : prix TTC − TVA = prix HT.",
          reponses: [
            { question: "a)", attendu: "A" },
            { question: "b)", attendu: "96" },
            { question: "c)", attendu: "vrai" },
          ],
          correction:
            "TTC veut dire « toutes taxes comprises » : on ajoute la TVA au prix HT.\na) Prix TTC = prix HT + TVA. On ajoute, donc le prix TTC est plus grand. Choix A.\nb) 80 + 16 = 96 € TTC.\nc) Si j'enlève la TVA au prix TTC, je retrouve le prix HT : 96 − 16 = 80. C'est vrai.\n⛔ Le piège : croire que « hors taxe » est le prix le plus cher. Hors taxe, c'est SANS la taxe : le moins cher.\nRéponse : a) A ; b) 96 € ; c) vrai.",
          micros: ["facture_tva"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je calcule d'abord le prix de revient, puis le reste.",
      rappel: [
        "D'abord le prix de revient (achat + tous les frais), puis le bénéfice (vente − revient).",
        "Intérêt de plusieurs années = intérêt d'un an × nombre d'années. Pour des mois : intérêt d'un an ÷ 12 × nombre de mois.",
        "Facture : quantité × prix sur chaque ligne, puis le total HT, la TVA, et le prix TTC.",
      ],
      exercices: [
        {
          enonce: "Karim, réparateur de vélos, achète un vélo d'occasion 90 €. Il change les pneus pour 24 € et la chaîne pour 16 €. Il le vend 175 €.\na) Quel est le prix de revient du vélo ?\nb) Quel est son bénéfice ?\nc) S'il l'avait vendu 120 €, qu'aurait-il eu ?\nA : un bénéfice de 10 € ; B : une perte de 10 € ; C : ni bénéfice ni perte",
          reponses: [
            { question: "a)", attendu: "130" },
            { question: "b)", attendu: "45" },
            { question: "c)", attendu: "B" },
          ],
          correction:
            "a) Revient = achat + frais. Les frais, ce sont les pneus et la chaîne : 90 + 24 + 16 = 130 €.\nb) Bénéfice = vente − revient : 175 − 130 = 45 €.\nc) 120 € est plus petit que 130 € : c'est une perte. 130 − 120 = 10 €. Choix B.\n⛔ Le piège : faire 175 − 90 = 85 €. On oublie les frais : le vrai bénéfice est 45 €.\nRéponse : a) 130 € ; b) 45 € ; c) B.",
          schema: bandes([
            { nom: "revient", morceaux: [{ v: 90, label: "90" }, { v: 24, label: "24", couleur: ORANGE }, { v: 16, label: "16", couleur: ORANGE }] },
            { nom: "vente", morceaux: [{ v: 130, label: "130" }, { v: 45, label: "45", couleur: VERT }] },
          ]),
          micros: ["prix_revient_vente_benefice"],
        },
        {
          enonce: "Clara est fleuriste. Elle achète 40 roses à 0,75 € la rose. Le transport coûte 6 €. Elle revend chaque rose 1,50 €.\na) Combien paie-t-elle les 40 roses ?\nb) Quel est le prix de revient des roses ?\nc) Combien gagne-t-elle en vendant les 40 roses ?\nd) Quel est son bénéfice ?",
          reponses: [
            { question: "a)", attendu: "30" },
            { question: "b)", attendu: "36" },
            { question: "c)", attendu: "60" },
            { question: "d)", attendu: "24" },
          ],
          correction:
            "a) 40 × 0,75 : 0,75, c'est trois quarts. Un quart de 40 = 10, trois quarts = 30 €.\nb) Revient = achat + transport : 30 + 6 = 36 €.\nc) 40 × 1,50 = 40 + 20 = 60 €. (40 × 1 = 40 et 40 × 0,50 = 20.)\nd) Bénéfice = vente − revient : 60 − 36 = 24 €.\n⛔ Le piège : oublier le transport et trouver 30 € de bénéfice. Le transport fait partie du prix de revient.\nRéponse : a) 30 € ; b) 36 € ; c) 60 € ; d) 24 €.",
          micros: ["prix_revient_vente_benefice"],
        },
        {
          enonce: "Une banquière propose à Léa de placer 600 € à 5 % pendant 3 ans.\na) Quel est l'intérêt d'un an ?\nb) Quel est l'intérêt pour les 3 ans ?\nc) Quelle somme Léa aura-t-elle au bout des 3 ans ?",
          reponses: [
            { question: "a)", attendu: "30" },
            { question: "b)", attendu: "90" },
            { question: "c)", attendu: "690" },
          ],
          correction:
            "a) 5 % : 5 € pour 100 €. 600 €, c'est 6 fois 100 €. 6 × 5 = 30 € par an.\nb) Chaque année rapporte 30 €. 3 × 30 = 90 €.\nc) À la fin, Léa a son capital ET les intérêts : 600 + 90 = 690 €.\n⛔ Le piège du c) : répondre 90 €. 90 €, c'est ce que l'argent a rapporté, pas tout ce que Léa a.\nRéponse : a) 30 € ; b) 90 € ; c) 690 €.",
          micros: ["interet_simple"],
        },
        {
          enonce: "On place 1 200 € à 3 % par an.\na) Quel est l'intérêt d'un an ?\nb) Quel est l'intérêt pour 6 mois ?\nc) Quel est l'intérêt pour 4 mois ?",
          reponses: [
            { question: "a)", attendu: "36" },
            { question: "b)", attendu: "18" },
            { question: "c)", attendu: "12" },
          ],
          correction:
            "a) 3 % : 3 € pour 100 €. 1 200 €, c'est 12 fois 100 €. 12 × 3 = 36 € par an.\nb) Une année a 12 mois. Pour 1 mois : 36 ÷ 12 = 3 €. Pour 6 mois : 6 × 3 = 18 €. (C'est aussi la moitié de l'année.)\nc) Pour 4 mois : 4 × 3 = 12 €.\n⛔ Le piège : multiplier l'intérêt d'un an par 6. 6 mois, ce n'est pas 6 ans : c'est une demi-année.\nRéponse : a) 36 € ; b) 18 € ; c) 12 €.",
          micros: ["interet_simple"],
        },
        {
          enonce: "Le club de sport reçoit cette facture. La TVA est de 20 %.\na) Montant des ballons\nb) Montant des plots\nc) Total HT\nd) TVA\ne) Prix TTC",
          figure: facture(
            [
              ["Ballon", "8", "12,50 €", "?"],
              ["Plot", "20", "2,50 €", "?"],
            ],
            [
              ["Total HT", "?"],
              ["TVA 20 %", "?"],
              ["Prix TTC", "?"],
            ],
          ),
          reponses: [
            { question: "a)", attendu: "100" },
            { question: "b)", attendu: "50" },
            { question: "c)", attendu: "150" },
            { question: "d)", attendu: "30" },
            { question: "e)", attendu: "180" },
          ],
          correction:
            "a) 8 × 12,50 = 100 €. (8 × 12 = 96 et 8 × 0,50 = 4.)\nb) 20 × 2,50 = 50 €.\nc) Total HT : 100 + 50 = 150 €.\nd) 20 % : 20 € pour 100 €. Pour 50 €, la moitié : 10 €. Pour 150 € : 20 + 10 = 30 €.\ne) Prix TTC : 150 + 30 = 180 €.\n⛔ Le piège : calculer la TVA sur un seul article. La TVA se calcule sur le total HT.\nRéponse : a) 100 € ; b) 50 € ; c) 150 € ; d) 30 € ; e) 180 €.",
          micros: ["facture_tva"],
        },
        {
          enonce: "Une ligne de cette facture est fausse.\nLigne A : 3 × 4,50 € = 13,50 €\nLigne B : 5 × 1,80 € = 9 €\nLigne C : 2 × 6,25 € = 12 €\na) Quelle ligne est fausse ? Écris sa lettre.\nb) Quel est le bon montant de cette ligne ?\nc) Quel est le bon total de la facture ?",
          reponses: [
            { question: "a)", attendu: "C" },
            { question: "b)", attendu: "12,5" },
            { question: "c)", attendu: "35" },
          ],
          correction:
            "Je refais chaque ligne.\nLigne A : 3 × 4,50 = 13,50. Juste.\nLigne B : 5 × 1,80 = 9. Juste (5 × 1 = 5 et 5 × 0,80 = 4).\nLigne C : 2 × 6,25, c'est le double de 6,25 : 12 + 0,50 = 12,50. La facture dit 12 € : c'est faux.\na) La ligne C.\nb) Le bon montant : 12,50 €.\nc) Total : 13,50 + 9 + 12,50 = 35 €.\n⛔ Le piège : oublier de doubler les 25 centimes. Le double de 0,25, c'est 0,50.\nRéponse : a) C ; b) 12,50 € ; c) 35 €.",
          micros: ["facture_tva"],
        },
        {
          enonce: "Deux banques. La banque Soleil : 500 € placés à 4 %. La banque Lune : 800 € placés à 2 %.\na) Quel intérêt rapporte la banque Soleil en un an ?\nb) Quel intérêt rapporte la banque Lune en un an ?\nc) Quelle banque rapporte le plus ? Écris Soleil ou Lune.",
          reponses: [
            { question: "a)", attendu: "20" },
            { question: "b)", attendu: "16" },
            { question: "c)", attendu: ["Soleil", "banque Soleil", "la banque Soleil"] },
          ],
          correction:
            "a) Soleil : 4 € pour 100 €. 500 €, c'est 5 fois 100 €. 5 × 4 = 20 €.\nb) Lune : 2 € pour 100 €. 800 €, c'est 8 fois 100 €. 8 × 2 = 16 €.\nc) 20 € > 16 € : la banque Soleil rapporte le plus.\n⛔ Le piège : choisir Lune parce que 800 € est plus grand. Il faut calculer l'intérêt, avec le capital ET le taux.\nRéponse : a) 20 € ; b) 16 € ; c) Soleil.",
          micros: ["interet_simple"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une histoire, plusieurs étapes. J'écris ce que je cherche avant de calculer.",
      rappel: [
        "Le chemin : achat + frais = revient ; vente − revient = bénéfice.",
        "Intérêt : je calcule d'abord pour 100 €, puis pour le capital, puis pour la durée.",
        "Facture : les lignes, puis le total HT, puis la TVA, puis le prix TTC.",
      ],
      exercices: [
        {
          titre: "Le stand de jus d'orange",
          enonce: "À la kermesse, la classe tient un stand de jus d'orange. Elle achète 12 kg d'oranges à 2,50 € le kg et des gobelets pour 6 €. Elle vend 60 gobelets à 1,50 €.\na) Combien coûtent les oranges ?\nb) Quel est le prix de revient du stand ?\nc) Combien rapporte la vente des gobelets ?\nd) Quel est le bénéfice du stand ?",
          reponses: [
            { question: "a)", attendu: "30" },
            { question: "b)", attendu: "36" },
            { question: "c)", attendu: "90" },
            { question: "d)", attendu: "54" },
          ],
          correction:
            "a) 12 × 2,50 : 12 × 2 = 24 et 12 × 0,50 = 6. 24 + 6 = 30 €.\nb) Revient = oranges + gobelets : 30 + 6 = 36 €.\nc) 60 × 1,50 : 60 × 1 = 60 et 60 × 0,50 = 30. 60 + 30 = 90 €.\nd) Bénéfice = vente − revient : 90 − 36 = 54 €.\n⛔ Le piège : oublier les gobelets dans le prix de revient. On trouverait 60 € de bénéfice.\nRéponse : a) 30 € ; b) 36 € ; c) 90 € ; d) 54 €.",
          schema: ecranSeulement(
            bandes([
              { nom: "revient", morceaux: [{ v: 30, label: "30" }, { v: 6, label: "6", couleur: ORANGE }] },
              { nom: "vente", morceaux: [{ v: 36, label: "36" }, { v: 54, label: "54", couleur: VERT }] },
            ]),
          ),
          micros: ["prix_revient_vente_benefice"],
        },
        {
          titre: "La tirelire de Malo",
          enonce: "Malo place 250 € sur un livret à 2 % par an.\na) Combien rapporte son livret en un an ?\nb) Combien rapporte-t-il en 4 ans ?\nc) Quelle somme Malo aura-t-il au bout de 4 ans ?\nd) Combien d'années faut-il pour gagner 15 € d'intérêts ?",
          reponses: [
            { question: "a)", attendu: "5" },
            { question: "b)", attendu: "20" },
            { question: "c)", attendu: "270" },
            { question: "d)", attendu: "3" },
          ],
          correction:
            "a) 2 % : 2 € pour 100 €. 250 € = 100 + 100 + 50. 2 + 2 + 1 = 5 € par an.\nb) 4 × 5 = 20 €.\nc) Capital + intérêts : 250 + 20 = 270 €.\nd) Chaque année rapporte 5 €. Combien de fois 5 dans 15 ? 15 ÷ 5 = 3 ans.\n⛔ Le piège du a) : oublier les 50 € et trouver 4 €. Pour 50 €, la moitié de 100 €, l'intérêt est la moitié de 2 € : 1 €.\nRéponse : a) 5 € ; b) 20 € ; c) 270 € ; d) 3 ans.",
          micros: ["interet_simple"],
        },
        {
          titre: "La facture du garage",
          enonce: "Jessica, mécanicienne, répare une voiture. Les pièces coûtent 180 € HT. Elle travaille 2 heures, à 45 € HT l'heure. La TVA est de 20 %.\na) Combien coûtent les 2 heures de travail, HT ?\nb) Quel est le total HT ?\nc) Combien fait la TVA ?\nd) Quel est le prix TTC de la facture ?",
          reponses: [
            { question: "a)", attendu: "90" },
            { question: "b)", attendu: "270" },
            { question: "c)", attendu: "54" },
            { question: "d)", attendu: "324" },
          ],
          correction:
            "a) 2 × 45 = 90 €.\nb) Pièces + travail : 180 + 90 = 270 € HT.\nc) 20 %, c'est 2 fois 10 %. 10 % de 270, c'est 270 ÷ 10 = 27 €. Donc 20 % : 2 × 27 = 54 €.\nd) Prix TTC = HT + TVA : 270 + 54 = 324 €.\n⛔ Le piège : oublier la TVA sur le travail. Elle se calcule sur TOUT le total HT : pièces et travail.\nRéponse : a) 90 € ; b) 270 € ; c) 54 € ; d) 324 €.",
          schema: ecranSeulement(
            facture(
              [
                ["Pièces", "1", "180 €", "180 €"],
                ["Travail", "2 h", "45 €", "90 €"],
              ],
              [
                ["Total HT", "270 €"],
                ["TVA 20 %", "54 €"],
                ["Prix TTC", "324 €"],
              ],
            ),
          ),
          micros: ["facture_tva"],
        },
        {
          titre: "L'atelier de poterie",
          enonce: "Anaïs est potière. Pour fabriquer 30 bols, elle paie 45 € d'argile et 75 € de cuisson au four. Elle vend chaque bol 7 €.\na) Quel est le prix de revient des 30 bols ?\nb) Quel est le prix de revient d'un bol ?\nc) Quel est le bénéfice sur un bol ?\nd) Quel est le bénéfice sur les 30 bols ?",
          reponses: [
            { question: "a)", attendu: "120" },
            { question: "b)", attendu: "4" },
            { question: "c)", attendu: "3" },
            { question: "d)", attendu: "90" },
          ],
          correction:
            "a) Argile + cuisson : 45 + 75 = 120 €.\nb) Je partage entre les 30 bols : 120 ÷ 30 = 4 € par bol. (30 × 4 = 120.)\nc) Bénéfice sur un bol : 7 − 4 = 3 €.\nd) Sur 30 bols : 30 × 3 = 90 €.\n⭐ Je vérifie autrement : vente des 30 bols, 30 × 7 = 210 € ; 210 − 120 = 90 €.\n⛔ Le piège : prendre le prix de vente (7 €) pour le bénéfice. Le bol a coûté 4 € à fabriquer.\nRéponse : a) 120 € ; b) 4 € ; c) 3 € ; d) 90 €.",
          micros: ["prix_revient_vente_benefice"],
        },
        {
          titre: "Le défi du brocanteur",
          enonce: "Paul, brocanteur, achète une vieille horloge 140 €. Il paie 10 € pour la nettoyer.\na) Il veut gagner 50 €. À quel prix doit-il la vendre ?\nb) Il la vend finalement 180 €. Quel est son bénéfice ?\nc) Pour gagner plus sur une vente, il peut :\nA : vendre plus cher ; B : payer plus de frais ; C : acheter plus cher\nd) Il place 200 € à 3 % pendant un an. Quel intérêt reçoit-il ?",
          reponses: [
            { question: "a)", attendu: "200" },
            { question: "b)", attendu: "30" },
            { question: "c)", attendu: "A" },
            { question: "d)", attendu: "6" },
          ],
          correction:
            "D'abord le prix de revient : 140 + 10 = 150 €.\na) Vente = revient + bénéfice : 150 + 50 = 200 €.\nb) Bénéfice = vente − revient : 180 − 150 = 30 €.\nc) Le bénéfice grandit quand la vente grandit, ou quand le revient diminue. Vendre plus cher : choix A.\nd) 3 % : 3 € pour 100 €. 200 €, c'est 2 fois 100 €. 2 × 3 = 6 €.\n⛔ Le piège du a) : faire 140 + 50 = 190 €. Sans les frais de nettoyage, il ne gagnerait que 40 €.\nRéponse : a) 200 € ; b) 30 € ; c) A ; d) 6 €.",
          micros: ["prix_revient_vente_benefice", "interet_simple"],
        },
      ],
    },
  ],
};
