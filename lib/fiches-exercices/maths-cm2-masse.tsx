// ─── Fiche d'exercices : les masses (CM2) — 20 exercices corrigés ─────────────
//
// 10/11/2026 : feuille INTERACTIVE du CM2 (une réponse à taper par sous-question,
// vérifiée sans IA), sur la forme de `maths-cm2-tableau.tsx` et de la feuille
// sœur `maths-cm2-longueur.tsx` : 8 ★, 7 ★★, 5 ★★★, un rappel avant chaque
// niveau, corrigés à la première personne, étape par étape, avec le piège nommé.
//
// Alignée sur la fiche de cours `lib/fiches/maths-cm2-masses.tsx`, la banque
// `lib/tutor-v4/questionBank/cm2/maths/masses.bank.ts` et la carte mentale
// remplie `lib/cartes/remplies/cm2.json` (clé cm2/masse) : comparer (même unité
// d'abord), convertir (t, kg, g, mg ; le tableau kg | hg | dag | g), estimer
// (une masse connue en tête), défis (tout en kg ou tout en g, puis calculer).
// ⭐ Règle de Frédéric : ×1 000 expliqué par la VALEUR DES CHIFFRES (le tableau
// de conversion), le « × 1 000 » seulement en raccourci, après.
// ⛔ AUCUNE question ouverte (CM2). Bonnes réponses des QCM : C, B, A, C
// (ex. 4), A, C (ex. 8), B (ex. 20).
// ⛔ Aucun exemple de la fiche de cours ni de la carte mentale n'est repris
// (1,5 kg, 1,2 kg + 350 g, 500 g et 1 kg, le cartable de 3 kg, le crayon de
// 10 g, la pomme de 150 g, la mangue, 1,2 kg et 900 g, 2,5 kg, 750 g, 3 t,
// 0,5 kg, le chat de 4 kg, la valise de 20 kg).
//
// Les pièges nommés : 3 kg = 300 g (1), diviser par 100 (2), comparer sans la
// même unité (3, 8, 11), petit = très léger (4), oublier une masse marquée (5,
// 20), 4 kg 50 g = 450 g (6), 35 g pour un enfant (7), 3,5 kg = 3 005 g (9),
// 80 g = 0,8 kg (10), se fier au nombre sans l'unité (12), additionner des kg
// et des g (13, 16), 3,5 t lu comme 3,5 kg (14), 500 mg = 5 g (15), diviser
// sans convertir (17), oublier le chariot (18), retirer des barquettes à des
// kilos (19), une pomme = les trois pommes (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : cuisine (5, 13), nature (4, 12, baleine),
// sport (16, randonnée), transport (14, camion), santé (15, 12), boulangerie
// (17), technique (18, ascenseur), marché (19), énigme (20).
// Les métiers : pâtissier (13), chauffeur de camion (14), infirmier (15),
// sage-femme (12), boulangère (17), marchand (19).
// ⭐ Un seul décor de La Réunion (ex. 19, les letchis du marché de Saint-Paul).
//
// ⭐ FAITS RÉELS : la baleine bleue peut dépasser 100 t (jusqu'à environ 150 t,
// Muséum national d'histoire naturelle) ; une pièce de 1 euro pèse 7,5 g
// (Banque centrale européenne) ; 1 L d'eau pèse environ 1 kg ; un bébé pèse
// environ 3 kg à la naissance (Santé publique France). Tout le reste est un
// MODÈLE, à des ordres de grandeur vraisemblables.
//
// ⭐ LES DESSINS (aides locales, SVG de viewBox 300, police 14, sans `min-w`) :
//   · `tableau` — le TABLEAU DE CONVERSION kg | hg | dag | g, un chiffre par
//     case, la virgule en orange après la colonne kg ;
//   · `balance` — une balance de Roberval EN ÉQUILIBRE : les objets à gauche,
//     les masses marquées à droite (deux par rangée).
//
// Micro-compétences : masse_comparer (3, 5, 8, 11, 12, 14), masse_convertir
// (1, 2, 5, 6, 8, 9, 10, 11, 13, 14, 15, 16, 17, 19, 20), masse_estimer (4, 7,
// 12), masse_defi (14, 16, 17, 18, 19, 20). 4/4.

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
 * chiffre par case (`chiffres`, EN CLAIR : { kg: "3", hg: "5" }) ; la virgule
 * en orange après la colonne `virgule` ; les colonnes `cible` surlignées.
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

/** Une pile d'étiquettes posée sur un plateau centré en `cx` (deux par rangée). */
const pile = (items: string[], cx: number, couleur: string, bord: string) =>
  items.map((t, i) => {
    const rang = Math.floor(i / 2);
    const seulSurRang = i === items.length - 1 && i % 2 === 0;
    const w = items.length === 1 ? 90 : 50;
    const x = seulSurRang ? cx - w / 2 : cx + (i % 2 === 0 ? -51 : 1);
    const y = 84 - 26 * (rang + 1);
    return (
      <g key={`${cx}-${i}`}>
        <rect x={x} y={y} width={w} height={24} rx={4} fill={couleur} stroke={bord} strokeWidth={1.5} />
        <text x={x + w / 2} y={y + 17} textAnchor="middle" fontSize={14} fill={NOIR}>
          {t}
        </text>
      </g>
    );
  });

/**
 * UNE BALANCE DE ROBERVAL EN ÉQUILIBRE : à gauche les objets (en orange), à
 * droite les masses marquées (en gris), deux par rangée, quatre au plus de
 * chaque côté. ⭐ Les masses sont écrites EN CLAIR dans l'appel.
 */
const balance = (objets: string[], masses: string[]) => (
  <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
    <svg viewBox="0 0 300 160" className="block h-auto w-full" role="img" aria-label={`Une balance en équilibre. À gauche : ${objets.join(", ")}. À droite : ${masses.join(", ")}.`}>
      {pile(objets, 75, "#fed7aa", ORANGE)}
      {pile(masses, 225, "#e2e8f0", "#475569")}
      <rect x={15} y={84} width={120} height={5} rx={2} fill="#475569" />
      <rect x={165} y={84} width={120} height={5} rx={2} fill="#475569" />
      <rect x={72} y={89} width={6} height={13} fill="#475569" />
      <rect x={222} y={89} width={6} height={13} fill="#475569" />
      <rect x={50} y={100} width={200} height={6} rx={3} fill="#334155" />
      <path d="M 120 140 L 132 104 L 168 104 L 180 140 Z" fill="#94a3b8" stroke="#334155" strokeWidth={1.5} />
      <line x1={150} y1={104} x2={150} y2={124} stroke={ORANGE} strokeWidth={2.5} />
      <rect x={40} y={140} width={220} height={12} rx={3} fill="#334155" />
    </svg>
  </div>
);

const UNITES = ["kg", "hg", "dag", "g"];

export const exercicesMasseCm2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "masse",
  titre: "Les masses",
  accroche:
    "Vingt exercices, du geste seul au problème. Convertir des tonnes, des kilos, des grammes et des milligrammes avec le tableau. Comparer deux masses. Lire une balance. Estimer la bonne masse. Un melon, un camion, une baleine, un sac de farine, un ascenseur, des letchis. Un rappel avant chaque niveau. Cherche d'abord au brouillon, tape ta réponse, puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/cm2/masse", titre: "Les masses" }],
  coachHref: "/coach-ia/maths?classe=cm2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je regarde bien l'unité avant de répondre.",
      rappel: [
        "1 kg = 1 000 g.",
        "1 t = 1 000 kg et 1 g = 1 000 mg.",
        "Pour comparer deux masses, je les écris d'abord dans la même unité.",
        "Lourd ou léger ? Je pense à une masse connue : un paquet de sucre pèse 1 kg.",
      ],
      exercices: [
        {
          enonce: "Complète.\na) 3 kg = … g\nb) 6 t = … kg\nc) 2 g = … mg\nd) 40 kg = … g",
          reponses: [
            { question: "a)", attendu: "3000", unite: "g" },
            { question: "b)", attendu: "6000", unite: "kg" },
            { question: "c)", attendu: "2000", unite: "mg" },
            { question: "d)", attendu: "40000", unite: "g" },
          ],
          correction:
            "Je passe à une unité plus petite : il en faut plus, le nombre grandit.\na) 1 kg = 1 000 g. Dans le tableau, le 3 va dans la colonne kg.\nPuis un 0 en hg, un 0 en dag, un 0 en g : 3 0 0 0. Donc 3 kg = 3 000 g.\nb) 1 t = 1 000 kg. 6 t = 6 000 kg.\nc) 1 g = 1 000 mg. 2 g = 2 000 mg.\nd) 40 kg, ce sont 40 fois 1 000 g : 40 000 g.\n⭐ Le raccourci, après : × 1 000.\n⛔ Le piège : écrire 3 kg = 300 g. Entre kg et g, il y a TROIS colonnes : hg, dag et g. Donc trois 0.\nRéponse : a) 3 000 g ; b) 6 000 kg ; c) 2 000 mg ; d) 40 000 g.",
          schema: ecranSeulement(tableau(UNITES, [{ label: "a)", chiffres: { kg: "3", hg: "0", dag: "0", g: "0" } }], ["g"])),
          micros: ["masse_convertir"],
        },
        {
          enonce: "Complète.\na) 5 000 g = … kg\nb) 9 000 kg = … t\nc) 4 000 mg = … g\nd) 12 000 g = … kg",
          reponses: [
            { question: "a)", attendu: "5", unite: "kg" },
            { question: "b)", attendu: "9", unite: "t" },
            { question: "c)", attendu: "4", unite: "g" },
            { question: "d)", attendu: "12", unite: "kg" },
          ],
          correction:
            "Je passe à une unité plus grande : il en faut moins, le nombre devient plus petit.\na) 1 000 g font 1 kg. 5 000 g, ce sont 5 paquets de 1 000 g : 5 kg.\nb) 1 000 kg font 1 t. 9 000 kg = 9 t.\nc) 1 000 mg font 1 g. 4 000 mg = 4 g.\nd) 12 000 g, ce sont 12 paquets de 1 000 g : 12 kg.\n⭐ Le raccourci, après : ÷ 1 000.\n⛔ Le piège : diviser par 100 et écrire 5 000 g = 50 kg. Entre g et kg, c'est 1 000.\nRéponse : a) 5 kg ; b) 9 t ; c) 4 g ; d) 12 kg.",
          micros: ["masse_convertir"],
        },
        {
          enonce: "Écris <, > ou =.\na) 2 kg … 1 800 g\nb) 650 g … 1 kg\nc) 3 000 kg … 3 t\nd) 1 kg … 999 g",
          reponses: [
            { question: "a)", attendu: ">" },
            { question: "b)", attendu: "<" },
            { question: "c)", attendu: "=" },
            { question: "d)", attendu: ">" },
          ],
          correction:
            "Je mets les deux masses dans la même unité, puis je compare.\na) 2 kg = 2 000 g. 2 000 > 1 800, donc 2 kg > 1 800 g.\nb) 1 kg = 1 000 g. 650 < 1 000, donc 650 g < 1 kg.\nc) 3 t = 3 000 kg : les deux masses sont égales.\nd) 1 kg = 1 000 g. 1 000 > 999, donc 1 kg > 999 g. De très peu : 1 g !\n⛔ Le piège : croire que 650 g est plus lourd que 1 kg, parce que 650 > 1. Sans la même unité, on ne compare pas.\nRéponse : a) > ; b) < ; c) = ; d) >.",
          micros: ["masse_comparer"],
        },
        {
          enonce:
            "Choisis la masse qui convient. Réponds par A, B ou C.\na) Un œuf : A) 6 g   B) 60 kg   C) 60 g\nb) Un vélo d'enfant : A) 10 g   B) 10 kg   C) 10 t\nc) Un éléphant d'Afrique : A) 5 t   B) 5 kg   C) 500 g\nd) Une feuille de papier : A) 50 g   B) 5 kg   C) 5 g",
          reponses: [
            { question: "a)", attendu: "C" },
            { question: "b)", attendu: "B" },
            { question: "c)", attendu: "A" },
            { question: "d)", attendu: "C" },
          ],
          correction:
            "Je compare à des masses que je connais : un paquet de sucre pèse 1 kg, une voiture environ 1 t.\na) Un œuf tient dans la main : environ 60 g. 60 kg, c'est un adulte !\nb) Un vélo d'enfant se soulève à deux mains : environ 10 kg.\nc) Un éléphant pèse plus que plusieurs voitures : environ 5 t.\nd) Une feuille ne pèse presque rien : environ 5 g.\n⛔ Le piège : choisir 6 g pour l'œuf parce qu'il est petit. Petit ne veut pas dire très léger.\nRéponse : a) C ; b) B ; c) A ; d) C.",
          micros: ["masse_estimer"],
        },
        {
          enonce:
            "La balance est en équilibre. À gauche, un melon. À droite, des masses marquées.\na) Combien de grammes pèse le melon ?\nb) Le melon pèse-t-il plus ou moins de 1 kg ? Écris plus ou moins.\nc) Combien de grammes faudrait-il ajouter au melon pour arriver à 1 kg ?",
          figure: balance(["melon"], ["500 g", "200 g", "100 g", "50 g"]),
          reponses: [
            { question: "a)", attendu: "850", unite: "g" },
            { question: "b)", attendu: "moins" },
            { question: "c)", attendu: "150", unite: "g" },
          ],
          correction:
            "La balance est en équilibre : les deux plateaux ont la même masse.\na) J'additionne les masses marquées : 500 + 200 + 100 + 50 = 850 g.\nb) 1 kg = 1 000 g. 850 < 1 000 : le melon pèse moins de 1 kg.\nc) 1 000 − 850 = 150 g.\n⛔ Le piège : oublier une des masses. Je les compte une par une, en les barrant.\nRéponse : a) 850 g ; b) moins ; c) 150 g.",
          micros: ["masse_comparer", "masse_convertir"],
        },
        {
          enonce: "Complète.\na) 2 kg 300 g = … g\nb) 1 t 500 kg = … kg\nc) 4 kg 50 g = … g",
          reponses: [
            { question: "a)", attendu: "2300", unite: "g" },
            { question: "b)", attendu: "1500", unite: "kg" },
            { question: "c)", attendu: "4050", unite: "g" },
          ],
          correction:
            "Je convertis d'abord la grande unité, puis j'ajoute le reste.\na) 2 kg = 2 000 g. 2 000 + 300 = 2 300 g.\nb) 1 t = 1 000 kg. 1 000 + 500 = 1 500 kg.\nc) 4 kg = 4 000 g. 4 000 + 50 = 4 050 g.\nDans le tableau : 4 en kg, 0 en hg, 5 en dag, 0 en g.\n⛔ Le piège : écrire 4 kg 50 g = 450 g. Le 4 vaut 4 000 g : il faut le 0 des hg, 4 050 g.\nRéponse : a) 2 300 g ; b) 1 500 kg ; c) 4 050 g.",
          schema: ecranSeulement(tableau(UNITES, [{ label: "c)", chiffres: { kg: "4", hg: "0", dag: "5", g: "0" } }], ["g"])),
          micros: ["masse_convertir"],
        },
        {
          enonce: "Complète avec la bonne unité : mg, g, kg ou t.\na) Un camion chargé pèse 12 …\nb) Une fraise pèse 15 …\nc) Un enfant de CM2 pèse 35 …\nd) Un grain de riz pèse 20 …",
          reponses: [
            { question: "a)", attendu: ["t", "tonne"] },
            { question: "b)", attendu: ["g", "gramme"] },
            { question: "c)", attendu: ["kg", "kilogramme", "kilo", "kilos"] },
            { question: "d)", attendu: ["mg", "milligramme"] },
          ],
          correction:
            "Je pense à une masse que je connais, et je cherche l'unité qui va avec.\na) Un camion est bien plus lourd qu'une voiture, qui pèse environ 1 t : 12 t.\nb) Une fraise est légère, elle tient sur un doigt : 15 g.\nc) Un enfant se pèse en kilogrammes : 35 kg.\nd) Un grain de riz pèse moins de 1 g : 20 mg.\n⛔ Le piège : écrire 35 g pour un enfant. 35 g, c'est la masse de quelques morceaux de sucre !\nRéponse : a) t ; b) g ; c) kg ; d) mg.",
          micros: ["masse_estimer"],
        },
        {
          enonce:
            "Réponds par A, B ou C.\na) Quelle masse est la plus lourde ? A) 2 300 g   B) 2,1 kg   C) 2 kg 250 g\nb) Quelle masse est la plus légère ? A) 0,8 kg   B) 850 g   C) 790 g",
          reponses: [
            { question: "a)", attendu: "A" },
            { question: "b)", attendu: "C" },
          ],
          correction:
            "Je mets tout en grammes.\na) 2 300 g ; 2,1 kg = 2 100 g ; 2 kg 250 g = 2 250 g.\nLe plus grand est 2 300 g : c'est A.\nb) 0,8 kg = 800 g ; 850 g ; 790 g.\nLe plus petit est 790 g : c'est C.\n⛔ Le piège : choisir 0,8 kg comme le plus léger, parce que 0,8 est un petit nombre. 0,8 kg, c'est 800 g.\nRéponse : a) A ; b) C.",
          micros: ["masse_comparer", "masse_convertir"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "J'utilise le tableau de conversion, puis je calcule dans une seule unité.",
      rappel: [
        "Tableau des masses : kg | hg | dag | g. Puis, plus petit : dg | cg | mg.",
        "Le chiffre des unités va dans la colonne de l'unité. La virgule se place juste après.",
        "Exemple : 4,2 kg → 4 en kg, 2 en hg, puis 0 en dag et 0 en g. Donc 4,2 kg = 4 200 g.",
        "On n'additionne que des masses écrites dans la même unité.",
      ],
      exercices: [
        {
          enonce: "Complète.\na) 3,5 kg = … g\nb) 1,25 kg = … g\nc) 0,4 kg = … g\nd) 2,8 t = … kg",
          reponses: [
            { question: "a)", attendu: "3500", unite: "g" },
            { question: "b)", attendu: "1250", unite: "g" },
            { question: "c)", attendu: "400", unite: "g" },
            { question: "d)", attendu: "2800", unite: "kg" },
          ],
          correction:
            "Je place le chiffre des unités dans la colonne de l'unité, puis je complète par des 0.\na) 3,5 kg : 3 en kg, 5 en hg, 0 en dag, 0 en g : 3 500 g.\nb) 1,25 kg : 1 en kg, 2 en hg, 5 en dag, 0 en g : 1 250 g.\nc) 0,4 kg : 0 en kg, 4 en hg, 0 en dag, 0 en g : 400 g.\nd) 1 t = 1 000 kg. 2,8 t = 2 800 kg.\n⭐ Le raccourci, après : × 1 000. 3,5 × 1 000 = 3 500.\n⛔ Le piège : écrire 3,5 kg = 3 005 g ou 350 g. Le 5 est le chiffre des hg : il vaut 500 g.\nRéponse : a) 3 500 g ; b) 1 250 g ; c) 400 g ; d) 2 800 kg.",
          schema: ecranSeulement(
            tableau(UNITES, [
              { label: "a)", chiffres: { kg: "3", hg: "5", dag: "0", g: "0" }, virgule: "kg" },
              { label: "b)", chiffres: { kg: "1", hg: "2", dag: "5", g: "0" }, virgule: "kg" },
            ], ["g"]),
          ),
          micros: ["masse_convertir"],
        },
        {
          enonce: "Complète.\na) 4 500 g = … kg\nb) 650 g = … kg\nc) 1 200 kg = … t\nd) 80 g = … kg",
          reponses: [
            { question: "a)", attendu: "4,5", unite: "kg" },
            { question: "b)", attendu: "0,65", unite: "kg" },
            { question: "c)", attendu: "1,2", unite: "t" },
            { question: "d)", attendu: "0,08", unite: "kg" },
          ],
          correction:
            "J'écris le nombre, son dernier chiffre dans la colonne g. Puis je mets la virgule juste après la colonne kg.\na) 4 500 g : 4 en kg, 5 en hg, 0, 0. Virgule après le 4 : 4,500 kg, soit 4,5 kg.\nb) 650 g : 6 en hg, 5 en dag, 0 en g. Rien en kg : j'écris 0. Donc 0,65 kg.\nc) 1 000 kg font 1 t. 1 200 kg = 1,2 t.\nd) 80 g : 8 en dag, 0 en g. J'écris 0 en kg et 0 en hg : 0,08 kg.\n⛔ Le piège : écrire 80 g = 0,8 kg. Mais 0,8 kg = 800 g ! Le 8 de 80 g est le chiffre des dag : il va au 2e rang après la virgule.\nRéponse : a) 4,5 kg ; b) 0,65 kg ; c) 1,2 t ; d) 0,08 kg.",
          schema: ecranSeulement(
            tableau(UNITES, [
              { label: "b)", chiffres: { kg: "0", hg: "6", dag: "5", g: "0" }, virgule: "kg" },
              { label: "d)", chiffres: { kg: "0", hg: "0", dag: "8", g: "0" }, virgule: "kg" },
            ], ["kg"]),
          ),
          micros: ["masse_convertir"],
        },
        {
          enonce:
            "Un facteur range quatre colis.\nA : 1,6 kg. B : 1 450 g. C : 1 kg 700 g. D : 1,05 kg.\na) Écris les quatre masses en g, dans l'ordre A, B, C, D.\nb) Range les lettres du plus léger au plus lourd.\nc) Quel écart, en g, entre le plus lourd et le plus léger ?",
          reponses: [
            { question: "a)", attendu: "1600 ; 1450 ; 1700 ; 1050", ordre: true },
            { question: "b)", attendu: "D ; B ; A ; C", ordre: true },
            { question: "c)", attendu: "650", unite: "g" },
          ],
          correction:
            "Une seule unité : le gramme.\na) A : 1,6 kg = 1 600 g. B : 1 450 g.\nC : 1 kg 700 g = 1 000 + 700 = 1 700 g.\nD : 1,05 kg : 1 en kg, 0 en hg, 5 en dag, 0 en g. Donc 1 050 g.\nb) Je range : 1 050 < 1 450 < 1 600 < 1 700. Donc D, B, A, C.\nc) 1 700 − 1 050 = 650 g.\n⛔ Le piège : lire 1,05 kg comme 1 500 g. Le 0 est le chiffre des hg : 1,05 kg, c'est 1 kg et 50 g.\nRéponse : a) 1 600 ; 1 450 ; 1 700 ; 1 050 ; b) D, B, A, C ; c) 650 g.",
          micros: ["masse_comparer", "masse_convertir"],
        },
        {
          enonce:
            "Vrai ou faux ?\na) Une baleine bleue peut peser plus de 100 t.\nb) Une pièce de 1 euro pèse environ 2 kg.\nc) Un litre d'eau pèse environ 1 kg.\nd) La sage-femme pèse un bébé qui vient de naître : il pèse environ 35 kg.",
          reponses: [
            { question: "a)", attendu: "vrai" },
            { question: "b)", attendu: "faux" },
            { question: "c)", attendu: "vrai" },
            { question: "d)", attendu: "faux" },
          ],
          correction:
            "a) La baleine bleue est le plus gros animal du monde : elle peut peser environ 150 t. Vrai.\nb) Une pièce de 1 euro pèse 7,5 g. 2 kg, c'est deux paquets de sucre ! Faux.\nc) Une bouteille de 1 L d'eau pèse environ 1 kg. Vrai.\nd) Un bébé pèse environ 3 kg à la naissance. 35 kg, c'est un enfant de CM2 ! Faux.\n⛔ Le piège : se fier au nombre. 35 est un petit nombre, mais 35 kg, c'est beaucoup trop pour un bébé.\nRéponse : a) vrai ; b) faux ; c) vrai ; d) faux.",
          micros: ["masse_estimer", "masse_comparer"],
        },
        {
          enonce:
            "Un pâtissier prépare une pâte. Il pèse 0,3 kg de farine, 180 g de sucre, 3 œufs de 60 g chacun et 0,1 kg de beurre.\na) Combien de grammes de farine ?\nb) Combien de grammes pèsent les 3 œufs ?\nc) Quelle est la masse totale de la pâte, en g ?",
          reponses: [
            { question: "a)", attendu: "300", unite: "g" },
            { question: "b)", attendu: "180", unite: "g" },
            { question: "c)", attendu: "760", unite: "g" },
          ],
          correction:
            "Je mets tout en grammes.\na) 0,3 kg : 0 en kg, 3 en hg, 0 en dag, 0 en g. Donc 300 g.\nb) 3 × 60 = 180 g.\nLe beurre : 0,1 kg = 100 g.\nc) Farine, sucre, œufs, beurre : 300 + 180 + 180 + 100 = 760 g.\n⛔ Le piège : additionner 0,3 + 180 + 180 + 0,1. Les kg et les g ne s'additionnent pas.\nRéponse : a) 300 g ; b) 180 g ; c) 760 g.",
          micros: ["masse_convertir"],
        },
        {
          enonce:
            "Un camion peut porter 3,5 t au plus. Le chauffeur charge 2 400 kg de sable et 900 kg de ciment.\na) Quelle masse a-t-il chargée, en kg ?\nb) Le camion est-il trop chargé ? Réponds oui ou non.\nc) Combien de kg peut-il encore ajouter ?",
          reponses: [
            { question: "a)", attendu: "3300", unite: "kg" },
            { question: "b)", attendu: "non" },
            { question: "c)", attendu: "200" },
          ],
          correction:
            "Je mets tout en kg. 1 t = 1 000 kg, donc 3,5 t = 3 500 kg.\na) 2 400 + 900 = 3 300 kg.\nb) 3 300 < 3 500 : le camion n'est pas trop chargé. Non.\nc) 3 500 − 3 300 = 200 kg.\n⛔ Le piège : comparer 3 300 et 3,5, et croire que c'est trop. 3,5 t, c'est 3 500 kg.\nRéponse : a) 3 300 kg ; b) non ; c) 200 kg.",
          micros: ["masse_comparer", "masse_convertir", "masse_defi"],
        },
        {
          enonce:
            "Un infirmier donne des comprimés de vitamine C. Chaque comprimé contient 500 mg de vitamine.\na) 500 mg = … g\nb) Combien de comprimés faut-il pour 2 g de vitamine ?\nc) Combien de grammes de vitamine dans 3 comprimés ?",
          reponses: [
            { question: "a)", attendu: "0,5", unite: "g" },
            { question: "b)", attendu: "4" },
            { question: "c)", attendu: "1,5", unite: "g" },
          ],
          correction:
            "1 g = 1 000 mg.\na) 500 mg, c'est la moitié de 1 000 mg : 0,5 g.\nb) 2 g = 2 000 mg. 2 000 ÷ 500 = 4 comprimés.\nc) 3 × 500 = 1 500 mg. 1 500 mg = 1,5 g.\n⛔ Le piège : écrire 500 mg = 5 g. Il faut 1 000 mg pour faire 1 g.\nRéponse : a) 0,5 g ; b) 4 comprimés ; c) 1,5 g.",
          micros: ["masse_convertir"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout l'énoncé. Je mets toutes les masses dans la même unité, puis je calcule.",
      rappel: [
        "Je souligne chaque masse et son unité.",
        "Je choisis UNE unité, le g ou le kg, et j'y convertis tout.",
        "Je calcule, puis je vérifie que ma réponse est vraisemblable.",
      ],
      exercices: [
        {
          titre: "Le sac de randonnée",
          enonce:
            "Le sac de randonnée de Yanis ne doit pas dépasser 6 kg. Le sac vide pèse 1,4 kg. Yanis y met une gourde de 1,1 kg, un pique-nique de 850 g et une veste de 600 g.\na) Quelle est la masse du sac rempli, en g ?\nb) Écris-la en kg.\nc) Combien de grammes peut-il encore ajouter ?",
          reponses: [
            { question: "a)", attendu: "3950", unite: "g" },
            { question: "b)", attendu: "3,95", unite: "kg" },
            { question: "c)", attendu: "2050", unite: "g" },
          ],
          correction:
            "Je mets tout en grammes.\nSac vide : 1,4 kg = 1 400 g. Gourde : 1,1 kg = 1 100 g. Pique-nique : 850 g. Veste : 600 g.\na) 1 400 + 1 100 + 850 + 600 = 3 950 g.\nb) 3 950 g : 3 en kg, 9 en hg, 5 en dag, 0 en g. Donc 3,95 kg.\nc) 6 kg = 6 000 g. 6 000 − 3 950 = 2 050 g.\n⛔ Le piège : oublier le sac vide. Il pèse, lui aussi !\nRéponse : a) 3 950 g ; b) 3,95 kg ; c) 2 050 g.",
          micros: ["masse_defi", "masse_convertir"],
        },
        {
          titre: "Le sac de farine",
          enonce:
            "Une boulangère ouvre un sac de farine de 25 kg. Pour une baguette, il lui faut 200 g de farine.\na) Combien de grammes de farine contient le sac ?\nb) Combien de baguettes peut-elle faire avec tout le sac ?\nc) Elle fait 100 baguettes. Combien de kg de farine reste-t-il ?",
          reponses: [
            { question: "a)", attendu: "25000", unite: "g" },
            { question: "b)", attendu: "125" },
            { question: "c)", attendu: "5" },
          ],
          correction:
            "a) 1 kg = 1 000 g. 25 kg = 25 000 g.\nb) 1 000 g font 5 baguettes de 200 g. 25 kg font donc 25 × 5 = 125 baguettes.\n⭐ Je vérifie : 125 × 200 = 25 000 g.\nc) 100 baguettes : 100 × 200 = 20 000 g, soit 20 kg. 25 − 20 = 5 kg.\n⛔ Le piège : faire 25 ÷ 200. Je mets d'abord les 25 kg en g.\nRéponse : a) 25 000 g ; b) 125 baguettes ; c) 5 kg.",
          micros: ["masse_defi", "masse_convertir"],
        },
        {
          titre: "L'ascenseur",
          enonce:
            "Un ascenseur peut porter 630 kg au plus. Sept adultes de 75 kg chacun y montent, avec un chariot de 80 kg.\na) Quelle masse font les 7 adultes ?\nb) Quelle masse en tout, avec le chariot ?\nc) L'ascenseur peut-il monter ? Réponds oui ou non.\nd) Un enfant de 30 kg veut monter aussi. Est-ce possible ? Réponds oui ou non.",
          reponses: [
            { question: "a)", attendu: "525" },
            { question: "b)", attendu: "605" },
            { question: "c)", attendu: "oui" },
            { question: "d)", attendu: "non" },
          ],
          correction:
            "a) 7 × 75 = 525 kg.\nb) 525 + 80 = 605 kg.\nc) 605 < 630 : oui, l'ascenseur peut monter.\nd) 605 + 30 = 635 kg. 635 > 630 : non, c'est trop lourd.\n⛔ Le piège : oublier le chariot. Tout ce qui est dans l'ascenseur compte.\nRéponse : a) 525 kg ; b) 605 kg ; c) oui ; d) non.",
          micros: ["masse_defi", "masse_comparer"],
        },
        {
          titre: "Les letchis du marché",
          enonce:
            "Au marché de Saint-Paul, à La Réunion, un marchand a 18 kg de letchis. Il les met en barquettes de 500 g.\na) Combien de grammes de letchis a-t-il ?\nb) Combien de barquettes peut-il remplir ?\nc) Il vend 30 barquettes. Combien de kg de letchis lui reste-t-il ?",
          reponses: [
            { question: "a)", attendu: "18000", unite: "g" },
            { question: "b)", attendu: "36" },
            { question: "c)", attendu: "3" },
          ],
          correction:
            "a) 18 kg = 18 000 g.\nb) 500 g, c'est la moitié de 1 kg : 1 kg remplit 2 barquettes. 18 kg remplissent 18 × 2 = 36 barquettes.\n⭐ Je vérifie : 36 × 500 = 18 000 g.\nc) Il reste 36 − 30 = 6 barquettes. 6 × 500 = 3 000 g, soit 3 kg.\n⛔ Le piège : faire 18 − 30. On ne retire pas des barquettes à des kilos.\nRéponse : a) 18 000 g ; b) 36 barquettes ; c) 3 kg.",
          micros: ["masse_defi", "masse_convertir"],
        },
        {
          titre: "L'énigme de la balance",
          enonce:
            "La balance est en équilibre. Les 3 pommes ont toutes la même masse.\na) Combien pèsent les 3 pommes ensemble, en g ?\nb) Combien pèse une pomme ?\nc) Combien pèsent 5 pommes ? A) 800 g   B) 1 kg   C) 1,2 kg. Réponds par A, B ou C.",
          figure: balance(["pomme", "pomme", "pomme"], ["500 g", "100 g"]),
          reponses: [
            { question: "a)", attendu: "600", unite: "g" },
            { question: "b)", attendu: "200" },
            { question: "c)", attendu: "B" },
          ],
          correction:
            "a) La balance est en équilibre : les 3 pommes pèsent autant que les masses. 500 + 100 = 600 g.\nb) 3 pommes égales pour 600 g : 600 ÷ 3 = 200 g.\nc) 5 × 200 = 1 000 g. Et 1 000 g = 1 kg.\n⛔ Le piège : croire qu'une pomme pèse 600 g. 600 g, c'est la masse des TROIS pommes.\nRéponse : a) 600 g ; b) 200 g ; c) B.",
          micros: ["masse_defi", "masse_convertir"],
        },
      ],
    },
  ],
};
