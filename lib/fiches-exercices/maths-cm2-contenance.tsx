// ─── Fiche d'exercices : les contenances (CM2) — 20 exercices corrigés ────────
//
// 10/11/2026 : feuille INTERACTIVE du CM2 (une réponse à taper par sous-question,
// vérifiée sans IA), sur la forme de `maths-cm2-tableau.tsx` et des feuilles
// sœurs `maths-cm2-longueur.tsx` et `maths-cm2-masse.tsx` : 8 ★, 7 ★★, 5 ★★★,
// un rappel avant chaque niveau, corrigés à la première personne, étape par
// étape, avec le piège nommé.
//
// Alignée sur la fiche de cours `lib/fiches/maths-cm2-contenances.tsx`, la
// banque `lib/tutor-v4/questionBank/cm2/maths/contenance.bank.ts` et la carte
// mentale remplie `lib/cartes/remplies/cm2.json` (clé cm2/contenance) :
// comparer (même unité d'abord), convertir (L, dL, cL, mL ; le tableau),
// estimer (un récipient connu en tête), défis (même unité, puis multiplier ou
// diviser).
// ⭐ Règle de Frédéric : ×10, ×100 expliqués par la VALEUR DES CHIFFRES (le
// tableau de conversion), le « × 100 » seulement en raccourci, après.
// ⛔ AUCUNE question ouverte (CM2). Bonnes réponses des QCM : A, B, C, B
// (ex. 4), B, A (ex. 8), A (ex. 20).
// ⛔ Aucun exemple de la fiche de cours ni de la carte mentale n'est repris
// (1,5 L = 1 500 mL, le sirop de 750 mL, 500 mL et 1 L, la tasse de 200 mL,
// le verre de 250 mL ou de 20 cL, le seau de 10 L, 1,5 L et 75 cL, 2 L =
// 200 cL, 33 cL = 330 mL, 250 mL = 0,25 L, la canette, la baignoire de 150 L,
// la carafe de 1 L et ses verres de 25 cL).
//
// Les pièges nommés : 4 L = 400 mL (1), diviser par 10 au lieu de 100 (2),
// comparer sans la même unité (3, 8, 11), 5 000 mL pris pour beaucoup (4),
// lire un trait pour 10 mL (5), 3 L 5 cL = 35 cL (6), 60 mL pour un aquarium
// (7), 0,6 L = 6 mL (9), 40 cL = 0,04 L (10), lire le nombre sans l'unité
// (12), additionner trois unités (13), diviser sans convertir (14), enlever 15
// litres au lieu de 15 arrosoirs (15), compter les cuillères pour des jours
// (16), répondre en seaux au lieu de litres (17), une semaine de 5 jours (18),
// acheter 3,6 bouteilles (19), × 1 000 au lieu de × 100 (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : cuisine (5, 13), maison (7, 12), santé (12,
// 16), sport (14, gymnase), jardinage (15), animaux (17, aquarium), écologie
// (18), fête (19), agriculture (20).
// Les métiers : cuisinier (5, 13), infirmière (7), médecin (16), jardinier
// (15), maraîchère (20).
// Aucun décor de La Réunion sur cette feuille.
//
// ⭐ FAITS RÉELS : une cuillère à soupe contient 15 mL et une cuillère à café
// 5 mL (mesures de cuisine) ; il faut environ 20 gouttes d'eau pour faire 1 mL
// (pharmacopée) ; un adulte a environ 5 L de sang (Établissement français du
// sang). Tout le reste est un MODÈLE, à des ordres de grandeur vraisemblables.
//
// ⭐ LES DESSINS (aides locales, SVG de viewBox 300, police 14, sans `min-w`) :
//   · `tableau` — le TABLEAU DE CONVERSION L | dL | cL | mL, un chiffre par
//     case, la virgule en orange après la colonne L ;
//   · `doseur` — un verre doseur gradué en mL, un trait tous les 50 mL, un
//     nombre tous les 100 mL, le liquide jusqu'à son niveau.
//
// Micro-compétences : contenance_comparer (3, 5, 8, 11, 12), contenance_convertir
// (1, 2, 5, 6, 8, 9, 10, 11, 13, 14, 16, 19, 20), contenance_estimer (4, 7,
// 12), contenance_defi (14, 15, 16, 17, 18, 19, 20). 4/4.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

const BLEU = "#2563eb";
const ORANGE = "#ea580c";
const NOIR = "#0f172a";
const GRIS = "#94a3b8";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

type LigneTableau = { label?: string; chiffres: Record<string, string>; virgule?: string };

/**
 * LE TABLEAU DE CONVERSION. Une colonne par unité ; une ligne par nombre, un
 * chiffre par case (`chiffres`, EN CLAIR : { L: "2", dL: "5" }) ; la virgule en
 * orange après la colonne `virgule` ; les colonnes `cible` surlignées.
 */
const tableau = (unites: string[], lignes: LigneTableau[], cible: string[] = []) => {
  const avecLabel = lignes.some((l) => l.label);
  const wL = avecLabel ? 30 : 0;
  const x0 = 4 + wL;
  const w = (296 - x0) / unites.length;
  const H = 28 + lignes.length * 30 + 4;
  const X = (u: string) => x0 + unites.indexOf(u) * w;
  return (
    <div className="mx-auto w-full max-w-[18rem] print:max-w-[13rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label={`Tableau de conversion, colonnes ${unites.join(", ")}.`}>
        {unites.map((u, i) => {
          const c = cible.includes(u);
          return (
            <g key={u}>
              <rect x={x0 + i * w} y={2} width={w} height={26} fill={c ? "#ffedd5" : "#f1f5f9"} stroke={c ? ORANGE : GRIS} strokeWidth={c ? 2 : 1} />
              <text x={x0 + i * w + w / 2} y={20} textAnchor="middle" fontSize={14} fontWeight={700} fill={c ? ORANGE : NOIR}>
                {u}
              </text>
            </g>
          );
        })}
        {lignes.map((l, j) => {
          const y = 28 + j * 30;
          return (
            <g key={j}>
              {l.label ? (
                <text x={4 + wL / 2} y={y + 20} textAnchor="middle" fontSize={14} fontWeight={700} fill={NOIR}>
                  {l.label}
                </text>
              ) : null}
              {unites.map((u, i) => (
                <g key={u}>
                  <rect x={x0 + i * w} y={y} width={w} height={30} fill="#fff" stroke={GRIS} strokeWidth={1} />
                  {l.chiffres[u] ? (
                    <text x={x0 + i * w + w / 2} y={y + 20} textAnchor="middle" fontSize={14} fontWeight={700} fill={BLEU}>
                      {l.chiffres[u]}
                    </text>
                  ) : null}
                </g>
              ))}
              {l.virgule ? (
                <text x={X(l.virgule) + w} y={y + 25} textAnchor="middle" fontSize={18} fontWeight={900} fill={ORANGE}>
                  ,
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/**
 * UN VERRE DOSEUR gradué de 0 à `max` mL : un trait tous les `pas` mL, un
 * nombre tous les 2 traits ; le liquide monte jusqu'à `niveau`. ⛔ L'étiquette
 * d'accessibilité ne donne pas le niveau : c'est la question.
 */
const doseur = (max: number, pas: number, niveau: number) => {
  const yBas = 190;
  const yHaut = 30;
  const Y = (v: number) => yBas - ((yBas - yHaut) * v) / max;
  const traits = Array.from({ length: Math.round(max / pas) + 1 }, (_, k) => k * pas);
  return (
    <div className="mx-auto w-full max-w-[16rem] print:max-w-[12rem]">
      <svg viewBox="0 0 300 200" className="block h-auto w-full" role="img" aria-label={`Un verre doseur gradué de 0 à ${max} mL, un trait tous les ${pas} mL. Il contient du lait.`}>
        <path d="M 100 60 C 60 60 60 140 100 140" fill="none" stroke="#475569" strokeWidth={6} />
        <rect x={100} y={Y(niveau)} width={80} height={yBas - Y(niveau)} fill="#e0f2fe" />
        <line x1={100} y1={Y(niveau)} x2={180} y2={Y(niveau)} stroke="#0284c7" strokeWidth={2} />
        <path d={`M 100 16 L 100 ${yBas} L 180 ${yBas} L 180 16`} fill="none" stroke="#334155" strokeWidth={3} />
        {traits.map((v, k) => (
          <g key={v}>
            <line x1={k % 2 === 0 ? 156 : 166} y1={Y(v)} x2={180} y2={Y(v)} stroke={NOIR} strokeWidth={k % 2 === 0 ? 2 : 1.2} />
            {k % 2 === 0 && v > 0 ? (
              <text x={188} y={Y(v) + 5} fontSize={14} fontWeight={700} fill={NOIR}>
                {`${v} mL`}
              </text>
            ) : null}
          </g>
        ))}
      </svg>
    </div>
  );
};

const UNITES = ["L", "dL", "cL", "mL"];

export const exercicesContenanceCm2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "contenance",
  titre: "Les contenances",
  accroche:
    "Vingt exercices, du geste seul au problème. Convertir des litres, des centilitres et des millilitres avec le tableau. Comparer deux contenances. Lire un verre doseur. Estimer la bonne contenance. Une pâte à crêpes, un aquarium, une fontaine, une douche, un anniversaire, une citerne. Un rappel avant chaque niveau. Cherche d'abord au brouillon, tape ta réponse, puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/cm2/contenance", titre: "Les contenances" }],
  coachHref: "/coach-ia/maths?classe=cm2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je regarde bien l'unité avant de répondre.",
      rappel: [
        "1 L = 10 dL = 100 cL = 1 000 mL.",
        "1 cL = 10 mL.",
        "Pour comparer deux contenances, je les écris d'abord dans la même unité.",
        "Une grande bouteille d'eau contient 1,5 L ; une cuillère à café, 5 mL.",
      ],
      exercices: [
        {
          enonce: "Complète.\na) 3 L = … cL\nb) 4 L = … mL\nc) 5 cL = … mL\nd) 2 L = … dL",
          reponses: [
            { question: "a)", attendu: "300" },
            { question: "b)", attendu: "4000" },
            { question: "c)", attendu: "50" },
            { question: "d)", attendu: "20" },
          ],
          correction:
            "Je passe à une unité plus petite : il en faut plus, le nombre grandit.\na) Le 3 va dans la colonne L du tableau. Puis un 0 en dL et un 0 en cL : 3 0 0. Donc 3 L = 300 cL.\nb) Le 4 va dans la colonne L. Puis trois 0, en dL, cL et mL : 4 L = 4 000 mL.\nc) 1 cL = 10 mL. 5 cL = 50 mL.\nd) 1 L = 10 dL. 2 L = 20 dL.\n⭐ Le raccourci, après : vers une unité plus petite, × 10, × 100 ou × 1 000.\n⛔ Le piège : écrire 4 L = 400 mL. 100, c'est pour les cL. Pour les mL, c'est 1 000.\nRéponse : a) 300 cL ; b) 4 000 mL ; c) 50 mL ; d) 20 dL.",
          schema: ecranSeulement(
            tableau(UNITES, [
              { label: "a)", chiffres: { L: "3", dL: "0", cL: "0" } },
              { label: "b)", chiffres: { L: "4", dL: "0", cL: "0", mL: "0" } },
            ], ["cL", "mL"]),
          ),
          micros: ["contenance_convertir"],
        },
        {
          enonce: "Complète.\na) 600 cL = … L\nb) 7 000 mL = … L\nc) 80 mL = … cL\nd) 30 dL = … L",
          reponses: [
            { question: "a)", attendu: "6" },
            { question: "b)", attendu: "7" },
            { question: "c)", attendu: "8" },
            { question: "d)", attendu: "3" },
          ],
          correction:
            "Je passe à une unité plus grande : il en faut moins, le nombre devient plus petit.\na) 100 cL font 1 L. 600 cL, ce sont 6 centaines de cL : 6 L.\nb) 1 000 mL font 1 L. 7 000 mL = 7 L.\nc) 10 mL font 1 cL. 80 mL, ce sont 8 dizaines de mL : 8 cL.\nd) 10 dL font 1 L. 30 dL = 3 L.\n⛔ Le piège : diviser par 10 au lieu de 100, et écrire 600 cL = 60 L. Entre cL et L, il y a deux colonnes.\nRéponse : a) 6 L ; b) 7 L ; c) 8 cL ; d) 3 L.",
          micros: ["contenance_convertir"],
        },
        {
          enonce: "Écris <, > ou =.\na) 1 L … 90 cL\nb) 400 mL … 1 L\nc) 50 cL … 500 mL\nd) 2 L … 2 100 mL",
          reponses: [
            { question: "a)", attendu: ">" },
            { question: "b)", attendu: "<" },
            { question: "c)", attendu: "=" },
            { question: "d)", attendu: "<" },
          ],
          correction:
            "Je mets les deux contenances dans la même unité, puis je compare.\na) 1 L = 100 cL. 100 > 90, donc 1 L > 90 cL.\nb) 1 L = 1 000 mL. 400 < 1 000, donc 400 mL < 1 L.\nc) 1 cL = 10 mL, donc 50 cL = 500 mL : c'est égal.\nd) 2 L = 2 000 mL. 2 000 < 2 100, donc 2 L < 2 100 mL.\n⛔ Le piège : croire que 400 mL est plus que 1 L, parce que 400 > 1. Sans la même unité, on ne compare pas.\nRéponse : a) > ; b) < ; c) = ; d) <.",
          micros: ["contenance_comparer"],
        },
        {
          enonce:
            "Choisis la contenance qui convient. Réponds par A, B ou C.\na) Une cuillère à soupe : A) 15 mL   B) 15 L   C) 15 cL\nb) Un arrosoir : A) 8 mL   B) 8 L   C) 8 cL\nc) Une piscine gonflable de jardin : A) 5 000 mL   B) 5 000 cL   C) 5 000 L\nd) Un bol de soupe : A) 30 L   B) 30 cL   C) 30 mL",
          reponses: [
            { question: "a)", attendu: "A" },
            { question: "b)", attendu: "B" },
            { question: "c)", attendu: "C" },
            { question: "d)", attendu: "B" },
          ],
          correction:
            "Je compare à des récipients que je connais : une grande bouteille d'eau contient 1,5 L.\na) Une cuillère à soupe, c'est une petite gorgée : 15 mL.\nb) Un arrosoir, c'est plusieurs grandes bouteilles : 8 L.\nc) Une piscine contient énormément d'eau : 5 000 L. 5 000 mL, ce n'est que 5 L, un petit seau.\nd) Un bol de soupe, c'est un peu moins d'une demi-bouteille : 30 cL.\n⛔ Le piège : choisir 5 000 mL pour la piscine, parce que 5 000 est grand. 5 000 mL = 5 L seulement.\nRéponse : a) A ; b) B ; c) C ; d) B.",
          micros: ["contenance_estimer"],
        },
        {
          enonce: "Le cuisinier verse du lait dans un verre doseur gradué en mL.\na) Combien de mL de lait contient le verre ?\nb) Écris cette quantité en cL.\nc) Combien de mL faut-il ajouter pour avoir 500 mL ?",
          figure: doseur(500, 50, 350),
          reponses: [
            { question: "a)", attendu: "350" },
            { question: "b)", attendu: "35" },
            { question: "c)", attendu: "150" },
          ],
          correction:
            "Je regarde d'abord ce que vaut un trait. Entre deux nombres, il y a 100 mL et deux sauts : un trait vaut 50 mL.\na) Le lait arrive au petit trait entre 300 et 400 : 350 mL.\nb) 10 mL font 1 cL. 350 mL, ce sont 35 dizaines de mL : 35 cL.\nc) 500 − 350 = 150 mL.\n⛔ Le piège : lire 310 ou 305, en croyant qu'un trait vaut 10 ou 5. Je cherche d'abord la valeur d'un trait : ici 50 mL.\nRéponse : a) 350 mL ; b) 35 cL ; c) 150 mL.",
          micros: ["contenance_comparer", "contenance_convertir"],
        },
        {
          enonce: "Complète.\na) 1 L 25 cL = … cL\nb) 2 L 300 mL = … mL\nc) 3 L 5 cL = … cL",
          reponses: [
            { question: "a)", attendu: "125" },
            { question: "b)", attendu: "2300" },
            { question: "c)", attendu: "305" },
          ],
          correction:
            "Je convertis d'abord les litres, puis j'ajoute le reste.\na) 1 L = 100 cL. 100 + 25 = 125 cL.\nb) 2 L = 2 000 mL. 2 000 + 300 = 2 300 mL.\nc) 3 L = 300 cL. 300 + 5 = 305 cL.\n⛔ Le piège : écrire 3 L 5 cL = 35 cL. Les 3 L valent 300 cL : il faut le 0 des dL, 305 cL.\nRéponse : a) 125 cL ; b) 2 300 mL ; c) 305 cL.",
          schema: ecranSeulement(tableau(UNITES, [{ label: "c)", chiffres: { L: "3", dL: "0", cL: "5" } }], ["cL"])),
          micros: ["contenance_convertir"],
        },
        {
          enonce:
            "Complète avec la bonne unité : mL, cL ou L.\na) Un flacon de parfum contient 50 …\nb) Un aquarium contient 60 …\nc) Une bouteille de jus de fruits contient 70 …\nd) La seringue de l'infirmière contient 5 …",
          reponses: [
            { question: "a)", attendu: ["mL", "millilitre"] },
            { question: "b)", attendu: ["L", "litre"] },
            { question: "c)", attendu: ["cL", "centilitre"] },
            { question: "d)", attendu: ["mL", "millilitre"] },
          ],
          correction:
            "Je pense à un récipient que je connais, et je cherche l'unité qui va avec.\na) Un flacon de parfum tient dans la main, il est tout petit : 50 mL.\nb) Un aquarium contient plusieurs seaux d'eau : 60 L.\nc) Une bouteille de jus contient un peu moins de 1 L : 70 cL.\nd) Une seringue contient très peu, comme une cuillère à café : 5 mL.\n⛔ Le piège : écrire 60 mL pour l'aquarium. 60 mL, c'est 4 cuillères à soupe !\nRéponse : a) mL ; b) L ; c) cL ; d) mL.",
          micros: ["contenance_estimer"],
        },
        {
          enonce:
            "Réponds par A, B ou C.\na) Quelle bouteille contient le plus ? A) 1,2 L   B) 130 cL   C) 1 100 mL\nb) Quel verre contient le moins ? A) 45 cL   B) 0,5 L   C) 480 mL",
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: "A" },
          ],
          correction:
            "Je mets tout en mL.\na) 1,2 L = 1 200 mL ; 130 cL = 1 300 mL ; et 1 100 mL.\nLe plus grand est 1 300 mL : c'est B.\nb) 45 cL = 450 mL ; 0,5 L = 500 mL ; et 480 mL.\nLe plus petit est 450 mL : c'est A.\n⛔ Le piège : choisir C au a), parce que 1 100 est le plus grand nombre écrit. Il est en mL : il ne vaut que 1,1 L.\nRéponse : a) B ; b) A.",
          micros: ["contenance_comparer", "contenance_convertir"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "J'utilise le tableau de conversion, puis je calcule dans une seule unité.",
      rappel: [
        "Tableau des contenances : L | dL | cL | mL.",
        "Le chiffre des unités va dans la colonne de l'unité. La virgule se place juste après.",
        "Exemple : 2,4 L → 2 en L, 4 en dL, 0 en cL. Donc 2,4 L = 240 cL.",
        "Même unité d'abord, puis je calcule.",
      ],
      exercices: [
        {
          enonce: "Complète.\na) 2,5 L = … cL\nb) 0,6 L = … mL\nc) 3,2 L = … cL\nd) 4,5 cL = … mL",
          reponses: [
            { question: "a)", attendu: "250" },
            { question: "b)", attendu: "600" },
            { question: "c)", attendu: "320" },
            { question: "d)", attendu: "45" },
          ],
          correction:
            "Je place le chiffre des unités dans la colonne de l'unité, puis je complète par des 0.\na) 2,5 L : 2 en L, 5 en dL, 0 en cL : 250 cL.\nb) 0,6 L : 0 en L, 6 en dL, 0 en cL, 0 en mL : 600 mL.\nc) 3,2 L : 3 en L, 2 en dL, 0 en cL : 320 cL.\nd) 4,5 cL : 4 en cL, 5 en mL : 45 mL.\n⭐ Le raccourci, après : des L aux cL, × 100. 2,5 × 100 = 250.\n⛔ Le piège : écrire 0,6 L = 6 mL ou 60 mL. Le 6 est le chiffre des dL : il vaut 600 mL.\nRéponse : a) 250 cL ; b) 600 mL ; c) 320 cL ; d) 45 mL.",
          schema: ecranSeulement(
            tableau(UNITES, [
              { label: "a)", chiffres: { L: "2", dL: "5", cL: "0" }, virgule: "L" },
              { label: "b)", chiffres: { L: "0", dL: "6", cL: "0", mL: "0" }, virgule: "L" },
            ], ["cL", "mL"]),
          ),
          micros: ["contenance_convertir"],
        },
        {
          enonce: "Complète.\na) 350 cL = … L\nb) 1 800 mL = … L\nc) 25 mL = … cL\nd) 40 cL = … L",
          reponses: [
            { question: "a)", attendu: "3,5" },
            { question: "b)", attendu: "1,8" },
            { question: "c)", attendu: "2,5" },
            { question: "d)", attendu: "0,4" },
          ],
          correction:
            "J'écris le nombre : son dernier chiffre va dans la colonne de son unité. Puis la virgule va juste après la colonne de la nouvelle unité.\na) 350 cL : 3 en L, 5 en dL, 0 en cL. Virgule après les L : 3,50 L, soit 3,5 L.\nb) 1 800 mL : 1 en L, 8 en dL, 0 en cL, 0 en mL. Donc 1,8 L.\nc) 25 mL : 2 en cL, 5 en mL. Virgule après les cL : 2,5 cL.\nd) 40 cL : 4 en dL, 0 en cL, rien en L. J'écris 0 en L : 0,4 L.\n⛔ Le piège : écrire 40 cL = 0,04 L. Le 4 est le chiffre des dL, juste après la virgule : 0,4 L.\nRéponse : a) 3,5 L ; b) 1,8 L ; c) 2,5 cL ; d) 0,4 L.",
          schema: ecranSeulement(
            tableau(UNITES, [
              { label: "a)", chiffres: { L: "3", dL: "5", cL: "0" }, virgule: "L" },
              { label: "d)", chiffres: { L: "0", dL: "4", cL: "0" }, virgule: "L" },
            ], ["L"]),
          ),
          micros: ["contenance_convertir"],
        },
        {
          enonce:
            "Quatre bouteilles de jus de fruits.\nA : 1,25 L. B : 130 cL. C : 1 200 mL. D : 1 L 10 cL.\na) Écris les quatre contenances en cL, dans l'ordre A, B, C, D.\nb) Range les lettres de la plus petite à la plus grande bouteille.\nc) Quel écart, en cL, entre la plus grande et la plus petite ?",
          reponses: [
            { question: "a)", attendu: "125 ; 130 ; 120 ; 110", ordre: true },
            { question: "b)", attendu: "D ; C ; A ; B", ordre: true },
            { question: "c)", attendu: "20" },
          ],
          correction:
            "Une seule unité : le cL.\na) A : 1,25 L = 125 cL. B : 130 cL.\nC : 1 200 mL. 10 mL font 1 cL, donc 1 200 mL = 120 cL.\nD : 1 L 10 cL = 100 + 10 = 110 cL.\nb) Je range : 110 < 120 < 125 < 130. Donc D, C, A, B.\nc) 130 − 110 = 20 cL.\n⛔ Le piège : croire que C est la plus grande, avec son 1 200. Elle est en mL : elle vaut 120 cL.\nRéponse : a) 125 ; 130 ; 120 ; 110 ; b) D, C, A, B ; c) 20 cL.",
          micros: ["contenance_comparer", "contenance_convertir"],
        },
        {
          enonce:
            "Vrai ou faux ?\na) Un évier plein contient environ 20 L.\nb) Un pot de yaourt contient environ 125 L.\nc) Une goutte d'eau, c'est environ 1 cL.\nd) Le corps d'un adulte contient environ 5 L de sang.",
          reponses: [
            { question: "a)", attendu: "vrai" },
            { question: "b)", attendu: "faux" },
            { question: "c)", attendu: "faux" },
            { question: "d)", attendu: "vrai" },
          ],
          correction:
            "a) Un évier plein, c'est environ deux seaux d'eau : 20 L. Vrai.\nb) Un pot de yaourt contient 125 mL, pas 125 L. 125 L, c'est presque une baignoire ! Faux.\nc) Une goutte est minuscule : il en faut environ 20 pour faire 1 mL. Et 1 cL = 10 mL, soit environ 200 gouttes. Faux.\nd) Un adulte a environ 5 L de sang. Vrai.\n⛔ Le piège : lire le nombre sans l'unité. 125 mL et 125 L, ce n'est pas du tout la même chose.\nRéponse : a) vrai ; b) faux ; c) faux ; d) vrai.",
          micros: ["contenance_estimer", "contenance_comparer"],
        },
        {
          enonce:
            "Un cuisinier prépare une pâte à crêpes. Il verse 0,5 L de lait, 20 cL d'eau et 30 mL d'huile.\na) Combien de cL de lait ?\nb) Combien de cL d'huile ?\nc) Combien de cL de liquide en tout ?",
          reponses: [
            { question: "a)", attendu: "50" },
            { question: "b)", attendu: "3" },
            { question: "c)", attendu: "73" },
          ],
          correction:
            "Je mets tout en cL.\na) 0,5 L : 0 en L, 5 en dL, 0 en cL. Donc 50 cL.\nb) 10 mL font 1 cL. 30 mL = 3 cL.\nc) Lait, eau, huile : 50 + 20 + 3 = 73 cL.\n⛔ Le piège : additionner 0,5 + 20 + 30. Trois unités différentes : je convertis d'abord.\nRéponse : a) 50 cL ; b) 3 cL ; c) 73 cL.",
          micros: ["contenance_convertir"],
        },
        {
          enonce:
            "La fontaine à eau du gymnase contient 18 L. Les gobelets contiennent 15 cL chacun.\na) Combien de cL d'eau contient la fontaine ?\nb) Combien de gobelets peut-on remplir ?",
          reponses: [
            { question: "a)", attendu: "1800" },
            { question: "b)", attendu: "120" },
          ],
          correction:
            "a) 1 L = 100 cL. 18 L = 1 800 cL.\nb) Combien de fois 15 cL dans 1 800 cL ? 1 800 ÷ 15 = 120 gobelets.\n⭐ Je vérifie : 120 × 15 = 1 800.\n⛔ Le piège : faire 18 ÷ 15. Les deux contenances doivent être dans la même unité.\nRéponse : a) 1 800 cL ; b) 120 gobelets.",
          micros: ["contenance_convertir", "contenance_defi"],
        },
        {
          enonce:
            "Le jardinier a un récupérateur d'eau de pluie de 200 L. Son arrosoir contient 8 L.\na) Combien d'arrosoirs peut-il remplir avec le récupérateur plein ?\nb) Il en remplit 15. Combien de litres reste-t-il dans le récupérateur ?",
          reponses: [
            { question: "a)", attendu: "25" },
            { question: "b)", attendu: "80" },
          ],
          correction:
            "a) Combien de fois 8 L dans 200 L ? 200 ÷ 8 = 25 arrosoirs.\n⭐ Je vérifie : 25 × 8 = 200.\nb) 15 arrosoirs : 15 × 8 = 120 L. 200 − 120 = 80 L.\n⛔ Le piège : faire 200 − 15. On enlève 15 arrosoirs de 8 L, pas 15 L.\nRéponse : a) 25 arrosoirs ; b) 80 L.",
          micros: ["contenance_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout l'énoncé. Je mets toutes les contenances dans la même unité, puis je calcule.",
      rappel: [
        "Je souligne chaque contenance et son unité.",
        "Je choisis UNE unité, et j'y convertis tout.",
        "Je calcule, puis je vérifie que ma réponse est vraisemblable.",
      ],
      exercices: [
        {
          titre: "Le flacon de sirop",
          enonce:
            "Le médecin prescrit un sirop : une cuillère de 5 mL, 3 fois par jour. Le flacon contient 120 mL.\na) Combien de mL de sirop par jour ?\nb) Combien de jours dure le flacon ?\nc) Écris la contenance du flacon en cL.",
          reponses: [
            { question: "a)", attendu: "15" },
            { question: "b)", attendu: "8" },
            { question: "c)", attendu: "12" },
          ],
          correction:
            "a) 3 cuillères de 5 mL : 3 × 5 = 15 mL par jour.\nb) 120 ÷ 15 = 8 jours.\n⭐ Je vérifie : 8 × 15 = 120.\nc) 10 mL font 1 cL. 120 mL = 12 cL.\n⛔ Le piège : faire 120 ÷ 5 = 24, et dire 24 jours. 24, c'est le nombre de cuillères, et il y en a 3 par jour.\nRéponse : a) 15 mL ; b) 8 jours ; c) 12 cL.",
          micros: ["contenance_defi", "contenance_convertir"],
        },
        {
          titre: "L'aquarium",
          enonce:
            "Un aquarium contient 54 L. Pour le remplir, Sacha utilise un seau de 6 L.\na) Combien de seaux faut-il pour le remplir ?\nb) Sacha a déjà versé 4 seaux. Combien de litres manque-t-il ?\nc) La pompe filtre 3 L d'eau chaque minute. Combien de minutes pour filtrer tout l'aquarium ?",
          reponses: [
            { question: "a)", attendu: "9" },
            { question: "b)", attendu: "30" },
            { question: "c)", attendu: "18" },
          ],
          correction:
            "a) Combien de fois 6 L dans 54 L ? 54 ÷ 6 = 9 seaux.\nb) 4 seaux : 4 × 6 = 24 L. 54 − 24 = 30 L.\nc) 54 ÷ 3 = 18 minutes.\n⛔ Le piège : au b), répondre 5 seaux. La question demande des LITRES : 30 L, c'est 5 seaux.\nRéponse : a) 9 seaux ; b) 30 L ; c) 18 min.",
          micros: ["contenance_defi"],
        },
        {
          titre: "Douche ou bain ?",
          enonce:
            "Une douche de 5 minutes utilise 60 L d'eau. Un bain en utilise 180 L.\na) Combien de litres économise-t-on avec une douche au lieu d'un bain ?\nb) Léo prend une douche chaque jour pendant une semaine. Combien de litres utilise-t-il ?\nc) Avec un bain chaque jour, combien de litres en plus sur la semaine ?",
          reponses: [
            { question: "a)", attendu: "120" },
            { question: "b)", attendu: "420" },
            { question: "c)", attendu: "840" },
          ],
          correction:
            "a) 180 − 60 = 120 L.\nb) Une semaine, c'est 7 jours. 7 × 60 = 420 L.\nc) 7 bains : 7 × 180 = 1 260 L. 1 260 − 420 = 840 L.\n⭐ Autre chemin : 120 L de plus chaque jour, 7 × 120 = 840 L.\n⛔ Le piège : compter 5 jours dans une semaine. Une semaine a 7 jours.\nRéponse : a) 120 L ; b) 420 L ; c) 840 L.",
          micros: ["contenance_defi"],
        },
        {
          titre: "Le jus de l'anniversaire",
          enonce:
            "Pour un anniversaire, 24 enfants boivent chacun 2 verres de 15 cL.\na) Combien de cL de jus faut-il en tout ?\nb) Écris cette quantité en L.\nc) Le jus est vendu en bouteilles de 2 L. Combien de bouteilles faut-il acheter, au moins ?",
          reponses: [
            { question: "a)", attendu: "720" },
            { question: "b)", attendu: "7,2" },
            { question: "c)", attendu: "4" },
          ],
          correction:
            "a) 24 × 2 = 48 verres. 48 × 15 = 720 cL.\nb) 100 cL font 1 L. 720 cL : 7 en L, 2 en dL, 0 en cL. Donc 7,2 L.\nc) 3 bouteilles : 3 × 2 = 6 L. Ce n'est pas assez.\n4 bouteilles : 4 × 2 = 8 L. C'est assez.\n⛔ Le piège : répondre 3,6 bouteilles. On n'achète pas un bout de bouteille : il en faut 4.\nRéponse : a) 720 cL ; b) 7,2 L ; c) 4 bouteilles.",
          micros: ["contenance_defi", "contenance_convertir"],
        },
        {
          titre: "La citerne de la maraîchère",
          enonce:
            "Une maraîchère a une citerne de 1 000 L. Elle arrose ses salades avec 40 L chaque jour.\na) Combien de jours dure la citerne pleine ?\nb) Combien de litres reste-t-il après une semaine ?\nc) 720 L, c'est : A) 72 000 cL   B) 7 200 cL   C) 720 000 cL. Réponds par A, B ou C.",
          reponses: [
            { question: "a)", attendu: "25" },
            { question: "b)", attendu: "720" },
            { question: "c)", attendu: "A" },
          ],
          correction:
            "a) 1 000 ÷ 40 = 25 jours.\n⭐ Je vérifie : 25 × 40 = 1 000.\nb) Une semaine : 7 × 40 = 280 L. 1 000 − 280 = 720 L.\nc) 1 L = 100 cL. Le chiffre des unités de L devient le chiffre des centaines de cL.\n720 L = 72 000 cL.\n⛔ Le piège : multiplier par 1 000 et choisir C. × 1 000, c'est pour les mL. Pour les cL, c'est × 100.\nRéponse : a) 25 jours ; b) 720 L ; c) A.",
          micros: ["contenance_defi", "contenance_convertir"],
        },
      ],
    },
  ],
};
