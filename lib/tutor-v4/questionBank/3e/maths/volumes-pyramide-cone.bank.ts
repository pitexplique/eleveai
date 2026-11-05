// VOLUME D'UNE PYRAMIDE ET D'UN CÔNE EN 3e (05/11/2026).
//
// Les mêmes gabarits qu'en 4e (réinvestissement), plus la RÉDUCTION par une
// section parallèle à la base : le petit solide au sommet est une réduction du
// grand, son volume est multiplié par k³. Tombe au brevet (verre conique rempli
// à mi-hauteur, tronc de cône).
// ⚠️ Rapports écrits en mots ou en décimal : pas de barre de fraction ici.

import type { TutorBankItemV4, Solide3DCanvasData } from "@/lib/tutor-v4/types";
import { fabriquerPyramideCone, frVol } from "../../4e/maths/volumes-pyramide-cone.bank";

const entre = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;
const un = <T,>(l: readonly T[]): T => l[Math.floor(Math.random() * l.length)];
const melange = <T,>(l: T[]): T[] => l.map((x) => [Math.random(), x] as const).sort((a, b) => a[0] - b[0]).map((x) => x[1]);

function avecUnite(x: number, u: string): string[] {
  const f = frVol(x);
  const l = [`${f} ${u}`];
  if (f.includes(" ")) l.push(`${f.replace(/ /g, "")} ${u}`, f);
  if (u.includes("³")) l.push(`${f} ${u.replace("³", "3")}`);
  if (u === "L") l.push(`${f} litres`);
  return [...new Set(l)];
}

/** Les rapports usuels : le texte, la valeur, et le dénominateur dont le cube divise le volume. */
const RAPPORTS = [
  { mot: "0,5", k: 1 / 2, d: 2, cube: "0,5 × 0,5 × 0,5 = 0,125" },
  { mot: "un demi", k: 1 / 2, d: 2, cube: "0,5 × 0,5 × 0,5 = 0,125" },
  { mot: "un tiers", k: 1 / 3, d: 3, cube: "le volume est divisé par 3 × 3 × 3 = 27" },
  { mot: "un quart", k: 1 / 4, d: 4, cube: "le volume est divisé par 4 × 4 × 4 = 64" },
  { mot: "0,2", k: 1 / 5, d: 5, cube: "0,2 × 0,2 × 0,2 = 0,008" },
] as const;

const SOLIDES = [
  { nom: "une pyramide", petit: "la petite pyramide", p: "pyramide" as const },
  { nom: "un cône", petit: "le petit cône", p: "cone" as const },
];
const fig = (solide: "pyramide" | "cone", hauteur: number, u: string): Solide3DCanvasData => ({
  kind: "solide_3d",
  solide,
  dimensions: { hauteur },
  labels: { hauteur: `${hauteur} ${u}`, aireBase: "base" },
  highlight: { hauteur: true },
  display: { showLabels: true },
});

const tpl = (n: number, difficulty: number, hint: string, generate: () => any): TutorBankItemV4 =>
  ({
    kind: "template",
    id: `3e_volume_pyramide_cone_reduction_tpl_${n}`,
    niveau: "3e",
    matiere: "maths",
    notionId: "volume_solide",
    microId: "volume_pyramide_cone_reduction",
    difficulty,
    theme: "neutral",
    hint,
    tags: ["volume", "reduction", "section", "template"],
    generate,
  }) as TutorBankItemV4;

const DEF = "Définition : une section parallèle à la base coupe une petite pyramide (ou un petit cône) qui est une réduction du grand ; les volumes sont multipliés par k³.";

const reduction: TutorBankItemV4[] = [
  // ★2 : rapport et volume donnés.
  tpl(1, 2, "Dans une réduction de rapport k, le volume est multiplié par k × k × k.", () => {
    const S = un(SOLIDES);
    const R = un(RAPPORTS);
    const u = un(["cm", "dm", "m"]);
    const nouveau = entre(2, 12);
    const V = nouveau * R.d ** 3;
    const text = un([
      `On coupe ${S.nom} de ${frVol(V)} ${u}³ parallèlement à sa base. Le petit solide au sommet est une réduction de rapport ${R.mot}. Quel est son volume ?`,
      `${S.nom === "un cône" ? "Un cône" : "Une pyramide"} a un volume de ${frVol(V)} ${u}³. Une section parallèle à la base donne une réduction de rapport ${R.mot}. Calcule le volume du petit solide.`,
      `Volume de départ : ${frVol(V)} ${u}³ (${S.nom}). Réduction de rapport ${R.mot}. Quel est le volume réduit ?`,
      `Quel est le volume de ${S.petit}, réduction de rapport ${R.mot} d’${S.nom} de ${frVol(V)} ${u}³ ?`,
    ]);
    return {
      text,
      format: "short",
      expected: avecUnite(nouveau, `${u}³`),
      comparator: "number_equal",
      explanation:
        `${DEF}\n\nMéthode : on applique k³ au volume de départ.\n\n` +
        `Calcul : ${R.cube}, donc ${frVol(V)} ÷ ${R.d ** 3} = ${nouveau}.\n\nConclusion : le petit solide a un volume de ${nouveau} ${u}³.`,
    };
  }),

  // ★2 : par combien est multiplié le volume.
  tpl(2, 2, "k × k × k : les longueurs comptent trois fois dans un volume.", () => {
    const d = un([2, 3, 4, 5, 10]);
    const S = un(SOLIDES);
    const texteK = { 2: "divisées par 2", 3: "divisées par 3", 4: "divisées par 4", 5: "divisées par 5", 10: "divisées par 10" }[d as 2];
    const juste = `divisé par ${d ** 3}`;
    const text = un([
      `Les longueurs d’${S.nom} sont ${texteK}. Par combien le volume est-il divisé ?`,
      `On réduit ${S.nom} : toutes ses longueurs sont ${texteK}. Que devient son volume ?`,
      `Dans une section parallèle à la base d’${S.nom}, les longueurs du petit solide sont ${texteK}. Que devient le volume ?`,
      `Si les longueurs d’${S.nom} sont ${texteK}, le volume est :`,
      `Réduction d’${S.nom} : les longueurs sont ${texteK}. Le volume est alors :`,
      `Toutes les longueurs d’${S.nom} sont ${texteK}. Quel est l’effet sur le volume ?`,
      `Quand les longueurs d’${S.nom} sont ${texteK}, comment change son volume ?`,
      `Choisis la bonne réponse : les longueurs d’${S.nom} sont ${texteK}, donc le volume est :`,
    ]);
    return {
      text,
      format: "qcm",
      choices: melange([juste, `divisé par ${d}`, `divisé par ${d * d}`, `divisé par ${d * 3}`].filter((x, i, t) => t.indexOf(x) === i)),
      expected: [juste],
      comparator: "mcq_exact",
      explanation:
        `${DEF}\n\nMéthode : les longueurs comptent trois fois dans un volume.\n\n` +
        `Calcul : ${d} × ${d} × ${d} = ${d ** 3}.\n\nConclusion : le volume est ${juste}.`,
    };
  }),

  // ★3 : section à une hauteur donnée depuis le sommet.
  tpl(3, 3, "Le rapport est la petite hauteur ÷ la grande hauteur.", () => {
    const S = un(SOLIDES);
    const u = un(["cm", "dm", "m"]);
    const d = un([2, 3, 4, 5]);
    const petite = entre(2, 6);
    const H = petite * d;
    const nouveau = entre(2, 10);
    const V = nouveau * d ** 3;
    const text = un([
      `${S.nom === "un cône" ? "Un cône" : "Une pyramide"} de hauteur ${H} ${u} a un volume de ${frVol(V)} ${u}³. On la coupe parallèlement à la base, à ${petite} ${u} du sommet. Quel est le volume du petit solide obtenu ?`.replace("On la coupe", S.p === "cone" ? "On le coupe" : "On la coupe"),
      `Hauteur : ${H} ${u}. Volume : ${frVol(V)} ${u}³ (${S.nom}). Une section parallèle à la base passe à ${petite} ${u} du sommet. Calcule le volume du petit solide au sommet.`,
      `On coupe ${S.nom} de hauteur ${H} ${u} et de volume ${frVol(V)} ${u}³ par un plan parallèle à la base, à ${petite} ${u} du sommet. Quel volume a la partie du haut ?`,
    ]);
    return {
      text,
      format: "short",
      expected: avecUnite(nouveau, `${u}³`),
      comparator: "number_equal",
      canvas: fig(S.p, H, u),
      explanation:
        `${DEF}\n\nMéthode : le rapport de réduction est ${petite} ÷ ${H}, soit ${d} fois plus petit.\n\n` +
        `Calcul : ${d} × ${d} × ${d} = ${d ** 3}, puis ${frVol(V)} ÷ ${d ** 3} = ${nouveau}.\n\nConclusion : le petit solide a un volume de ${nouveau} ${u}³.`,
    };
  }),

  // ★3 : le verre conique, le classique du brevet.
  tpl(4, 3, "Le liquide forme un petit cône, réduction du verre.", () => {
    const contenant = un(["Un verre conique", "Une flûte conique", "Un entonnoir bouché", "Un cornet de papier", "Un verre à cocktail conique", "Un récipient conique"]);
    const d = un([2, 3, 4]);
    const fraction = { 2: "la moitié", 3: "le tiers", 4: "le quart" }[d as 2];
    const nouveau = entre(2, 9);
    const V = nouveau * d ** 3;
    const liquide = un(["d’eau", "de jus de letchi", "de sirop", "de lait", "de jus d’orange", "d’huile"]);
    const f = contenant.startsWith("Une");
    const text = un([
      `${contenant} a une contenance de ${frVol(V)} cL. On ${f ? "la" : "le"} remplit ${liquide} jusqu’à ${fraction} de sa hauteur. Quel volume de liquide contient-${f ? "elle" : "il"} ?`,
      `${contenant} peut contenir ${frVol(V)} cL. Le liquide monte jusqu’à ${fraction} de sa hauteur. Combien de cL y a-t-il dedans ?`,
    ]);
    return {
      text,
      format: "short",
      expected: avecUnite(nouveau, "cL"),
      comparator: "number_equal",
      explanation:
        `${DEF}\n\nMéthode : le liquide forme un petit cône de rapport ${fraction === "la moitié" ? "un demi" : fraction === "le tiers" ? "un tiers" : "un quart"}. Attention : ce n’est pas ${fraction} du volume.\n\n` +
        `Calcul : ${d} × ${d} × ${d} = ${d ** 3}, puis ${frVol(V)} ÷ ${d ** 3} = ${nouveau}.\n\nConclusion : il y a ${nouveau} cL de liquide.`,
    };
  }),

  // ★4 : le tronc = grand − petit.
  tpl(5, 4, "Volume du tronc = volume du grand solide − volume du petit.", () => {
    const S = un(SOLIDES);
    const objet = un(["un abat-jour", "un seau", "un pot de fleurs", "un gobelet", "une lampe", "une jardinière"]);
    const u = un(["cm", "dm"]);
    const d = un([2, 3, 4, 5]);
    const petit = entre(2, 12);
    const V = petit * d ** 3;
    const tronc = V - petit;
    const text = un([
      `On retire le haut d’${S.nom} de ${frVol(V)} ${u}³ pour fabriquer ${objet}. La partie retirée est une réduction de rapport ${{ 2: "un demi", 3: "un tiers", 4: "un quart", 5: "0,2" }[d as 2]}. Quel est le volume de la partie qui reste ?`,
      `Pour fabriquer ${objet}, on coupe ${S.nom} de ${frVol(V)} ${u}³ parallèlement à sa base. Le petit solide enlevé est une réduction de rapport ${{ 2: "un demi", 3: "un tiers", 4: "un quart", 5: "0,2" }[d as 2]}. Calcule le volume restant.`,
    ]);
    return {
      text,
      format: "short",
      expected: avecUnite(tronc, `${u}³`),
      comparator: "number_equal",
      explanation:
        `${DEF}\n\nMéthode : on calcule le volume enlevé, puis on le soustrait.\n\n` +
        `Calcul : ${frVol(V)} ÷ ${d ** 3} = ${petit}, puis ${frVol(V)} − ${petit} = ${frVol(tronc)}.\n\nConclusion : il reste ${frVol(tronc)} ${u}³.`,
    };
  }),

  // ★4 : retrouver le rapport.
  tpl(6, 4, "Cherche le nombre qui, multiplié trois fois par lui-même, donne le quotient des volumes.", () => {
    const S = un(SOLIDES);
    const u = un(["cm", "dm", "m"]);
    const d = un([2, 3, 4, 5]);
    const petit = entre(2, 9);
    const V = petit * d ** 3;
    const text = un([
      `${S.nom === "un cône" ? "Un cône" : "Une pyramide"} a un volume de ${frVol(V)} ${u}³. Une section parallèle à la base donne un petit solide de ${petit} ${u}³. Par combien les longueurs sont-elles divisées ?`,
      `Grand solide : ${frVol(V)} ${u}³. Petit solide obtenu par une section parallèle à la base : ${petit} ${u}³. Par combien les longueurs ont-elles été divisées ?`,
      `On coupe ${S.nom} de ${frVol(V)} ${u}³ parallèlement à sa base et on obtient un solide de ${petit} ${u}³. Par quel nombre les longueurs sont-elles divisées ?`,
    ]);
    return {
      text,
      format: "short",
      expected: [String(d)],
      comparator: "number_equal",
      explanation:
        `${DEF}\n\nMéthode : le volume est divisé par ${d ** 3} ; on cherche le nombre dont le cube vaut ${d ** 3}.\n\n` +
        `Calcul : ${frVol(V)} ÷ ${petit} = ${d ** 3} et ${d} × ${d} × ${d} = ${d ** 3}.\n\nConclusion : les longueurs sont divisées par ${d}.`,
    };
  }),
];

export const volumesPyramideConeBank: TutorBankItemV4[] = [...fabriquerPyramideCone("3e"), ...reduction];
