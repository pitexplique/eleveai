// LES UNITÉS D'AIRE (05/11/2026). Trous du programme de CM2 : cm2-M-aires-3
// (cm², dm², m² selon l'objet, le carré-unité) et cm2-M-aires-4 (convertir).

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import type { CanvasFigure } from "@/lib/tutor-v4/types_canvas";
import { entre, exp, fr, gabarits, net, qcm, qcmN, un, v } from "./trous-outils";

/** Le carré de 10 × 10 : 100 petits carrés. */
const grille10 = (pleins = 100): CanvasFigure => ({
  kind: "figure_libre",
  size: { cellSize: 16 },
  grid: { rows: 10, cols: 10, filledCells: Array.from({ length: pleins }, (_, i) => [Math.floor(i / 10), i % 10] as [number, number]) },
  display: { showGrid: true, showFilled: true },
} as CanvasFigure);

/* ───────────────────────── aire_unites ───────────────────────── */
const au = gabarits("aire_unites", "aire", ["unites"]);
const UNITES = ["cm²", "dm²", "m²", "km²"];
const OBJETS: Record<string, readonly string[]> = {
  "cm²": ["un timbre", "une carte à jouer", "une gomme", "une pièce de monnaie", "un ticket de bus", "un post-it", "un carré de chocolat", "une photo d'identité"],
  "dm²": ["une feuille de cahier", "un livre de poche", "une ardoise", "une assiette", "un sous-main", "une tablette", "une boîte à chaussures", "un plateau repas"],
  "m²": ["une chambre", "une salle de classe", "une cour de récréation", "un garage", "un terrain de tennis", "une porte de garage", "un tatami de judo", "un tableau de classe"],
  "km²": ["une île", "une grande ville", "un département", "une forêt immense", "un parc national", "un grand lac", "un pays", "une mer intérieure"],
};
const expU = (o: string, u: string) => exp(
  "une aire se mesure avec des carrés-unités : cm², dm², m², km².",
  "on choisit le carré-unité adapté à la taille de l'objet.",
  `${o} : on compte en ${u}.`,
  `pour ${o}, l'unité adaptée est le ${u}.`,
);
/** Côté du carré-unité : la phrase qui donne son sens à l'unité. */
const SENS: readonly (readonly [string, string, readonly string[]])[] = [
  ["1 cm²", "1 cm", ["10 cm", "1 mm", "1 dm", "100 cm"]],
  ["1 dm²", "10 cm", ["1 cm", "100 cm", "1 m", "2 dm"]],
  ["1 m²", "1 m", ["10 cm", "1 dm", "100 m", "1 km"]],
  ["1 m²", "10 dm", ["1 dm", "100 dm", "10 cm", "1 dm²"]],
];
const expSens = (u: string, c: string) => exp(`${u} est l'aire d'un carré-unité.`, "on regarde le côté de ce carré.", `${u} = un carré de ${c} de côté.`, `le côté mesure ${c}.`);
const OUVRE = ["", "Pense au carré-unité.", "Imagine l'objet.", "Pense à la taille réelle."];
const aireUnites: TutorBankItemV4[] = [
  au(1, "Imagine des carrés posés sur l'objet : quelle taille convient ?", () => {
    const u = un(UNITES.slice(0, 3));
    const o = un(OBJETS[u]);
    return qcm(u, UNITES.filter((x) => x !== u), expU(o, u), v(OUVRE, [`Quelle unité pour l'aire d'${o} ?`, `Avec quelle unité mesurer l'aire d'${o} ?`, `On mesure l'aire d'${o}. Quelle unité choisir ?`, `Quelle unité convient pour l'aire d'${o} ?`]));
  }),
  au(1, "Un cm² est un petit carré de 1 cm sur 1 cm. Un dm², un carré de 10 cm sur 10 cm.", () => {
    const [u, c, f] = un(SENS);
    return qcm(c, f, expSens(u, c), v(OUVRE, [`${u}, c'est un carré de quel côté ?`, `Quel est le côté d'un carré de ${u} ?`, `Un carré d'aire ${u} a quel côté ?`, `Quel carré a une aire de ${u} ? Son côté mesure :`]));
  }),
  au(1, "Compte les petits carrés : 10 rangées de 10.", () => {
    return qcm("100 cm²", ["10 cm²", "40 cm²", "1 cm²", "1 000 cm²"], exp("un cm² est un carré de 1 cm de côté.", "on compte les rangées et les carrés par rangée.", "10 × 10 = 100.", "le grand carré a une aire de 100 cm², soit 1 dm²."), v(["Chaque petit carré mesure 1 cm².", "Un petit carré vaut 1 cm².", "Ici, un petit carré fait 1 cm²."], ["Quelle est l'aire du grand carré ?", "Combien mesure le grand carré ?", "Que vaut toute la grille ?", "Quelle est l'aire de toute la figure ?", "Quelle aire fait le grand carré ?"]), grille10());
  }),
  au(2, "Une table : ni un timbre, ni une ville. Choisis ce qui est possible.", () => {
    const C = un([
      { o: "une table d'école", j: "1 m²", f: ["1 cm²", "1 dm²", "1 km²", "100 m²"] }, { o: "un timbre", j: "6 cm²", f: ["6 dm²", "6 m²", "6 km²", "60 m²"] }, { o: "une feuille de cahier", j: "6 dm²", f: ["6 cm²", "6 m²", "6 km²", "60 m²"] }, { o: "une chambre", j: "12 m²", f: ["12 cm²", "12 dm²", "12 km²", "120 km²"] },
      { o: "un terrain de tennis", j: "260 m²", f: ["260 cm²", "260 dm²", "260 km²", "26 cm²"] }, { o: "une carte à jouer", j: "50 cm²", f: ["50 dm²", "50 m²", "50 km²", "5 m²"] }, { o: "une île", j: "2 500 km²", f: ["2 500 cm²", "2 500 dm²", "2 500 m²", "25 cm²"] }, { o: "une serviette de table", j: "16 dm²", f: ["16 cm²", "16 m²", "16 km²", "160 m²"] },
      { o: "une salle de classe", j: "60 m²", f: ["60 cm²", "60 dm²", "60 km²", "6 cm²"] }, { o: "une tablette", j: "4 dm²", f: ["4 cm²", "4 m²", "4 km²", "40 m²"] },
    ]);
    return qcm(C.j, C.f, exp("une aire doit rester possible pour l'objet.", "on imagine l'objet et les carrés-unités.", `${C.o} : environ ${C.j}.`, `la bonne réponse est ${C.j}.`), v(["", "Une seule réponse est possible.", "Imagine l'objet.", "Pense à sa taille."], [`Quelle aire peut avoir ${C.o} ?`, `Quelle est l'aire possible d'${C.o} ?`, `Quelle aire convient pour ${C.o} ?`, `Laquelle est une aire possible pour ${C.o} ?`]));
  }),
  au(2, "Range les carrés-unités : cm², puis dm², puis m², puis km².", () => {
    const l = ["1 cm²", "1 dm²", "1 m²", "1 km²"];
    const grand = Math.random() < 0.5;
    const debut = un([0, 1]);
    const sous = l.slice(debut, debut + 3);
    const j = grand ? sous[2] : sous[0];
    return qcm(j, sous.filter((x) => x !== j), exp("plus le carré-unité a un grand côté, plus son aire est grande.", "on compare le côté de chaque carré.", "1 cm² < 1 dm² < 1 m² < 1 km².", `${grand ? "la plus grande" : "la plus petite"} est ${j}.`), v(OUVRE, [`Quelle est l'aire la plus ${grand ? "grande" : "petite"} : ${sous.join(", ")} ?`, `Laquelle est la plus ${grand ? "grande" : "petite"} : ${sous.join(", ")} ?`, `Parmi ${sous.join(", ")}, laquelle est la plus ${grand ? "grande" : "petite"} ?`, `Choisis l'aire la plus ${grand ? "grande" : "petite"} : ${sous.join(", ")}.`]));
  }),
  au(2, "Aire d'un carré : côté × côté. L'unité suit l'unité du côté.", () => {
    const c = entre(2, 12);
    const u = un(["cm", "dm", "m", "km"]);
    return qcmN(c * c, [c * 4, c * 2, c * c + 1, c * c - 1, c * 10], exp(`un carré de 1 ${u} de côté a une aire de 1 ${u}².`, "on multiplie le côté par lui-même.", `${c} × ${c} = ${c * c}.`, `l'aire est ${c * c} ${u}².`), v(["", "Compte les carrés-unités.", "Côté × côté.", "Pense aux rangées."], [`Un carré a ${c} ${u} de côté. Quelle est son aire ?`, `Quelle est l'aire d'un carré de ${c} ${u} de côté ?`, `Calcule l'aire d'un carré de côté ${c} ${u}.`, `Un carré de ${c} ${u} de côté : quelle aire ?`]), undefined, `${u}²`);
  }),
  au(3, "Choisis une unité adaptée : on ne mesure pas un mur en cm², ni un timbre en m².", () => {
    const u = un(UNITES);
    const o = un(OBJETS[u]);
    const P = un(["Une scientifique", "Un élève", "Une élève", "Un curieux", "Une journaliste", "Un inventeur", "Une enseignante", "Un enquêteur"]);
    return qcm(u, UNITES.filter((x) => x !== u), expU(o, u), `${P} ${v(["mesure", "calcule", "note"])} l'aire d'${o}. ${v(["Quelle unité choisir ?", "Quelle unité convient ?", "Quelle unité est adaptée ?"])}`);
  }),
  au(3, "Longueur × largeur donne le nombre de dalles de 1 m².", () => {
    const L = entre(3, 12);
    const l = entre(2, 8);
    const C = un(["une terrasse", "une cuisine", "une salle de danse", "un garage", "une chambre", "une scène", "un patio", "un hangar", "une véranda", "un atelier"]);
    return qcmN(L * l, [2 * (L + l), L + l, L * l + L, L * l - 1, L * l + 10], exp("une dalle de 1 m² est un carré de 1 m de côté.", "on compte les rangées et les dalles par rangée.", `${L} × ${l} = ${L * l}.`, `il faut ${L * l} dalles.`), `On couvre ${C} de ${L} m sur ${l} m avec des dalles de 1 m². ${v(["Combien de dalles faut-il ?", "Combien de dalles pose-t-on ?", "Quel est le nombre de dalles ?"])}`, undefined, "dalles");
  }),
  au(3, "Convertis tout dans la même unité avant de comparer.", () => {
    const n = entre(2, 9);
    const O = un(["une affiche", "une nappe", "un tapis de bain", "un set de table", "un poster", "un drapeau", "un plateau", "un miroir"]);
    const dm = n * 100;
    return qcmN(n, [dm, n * 10, n + 100, n * 1000], exp("1 dm² = 100 cm², car un carré de 10 cm de côté contient 10 × 10 petits carrés.", "on cherche combien de fois 100 cm² dans le total.", `${fr(dm)} ÷ 100 = ${n}.`, `il faut ${n} carrés de 1 dm².`), `${cap1(O)} a une aire de ${fr(dm)} cm². ${v(["Combien de carrés de 1 dm² faut-il pour couvrir cette aire ?", "Combien de carrés-unités de 1 dm² cela fait-il ?", "À combien de carrés de 1 dm² cela correspond-il ?"])}`);
  }),
];
function cap1(t: string) { return t.charAt(0).toUpperCase() + t.slice(1); }

/* ───────────────────────── aire_convertir_unites ───────────────────────── */
const ac = gabarits("aire_convertir_unites", "aire", ["conversion"]);
const POURQUOI_DM = "1 dm² = 100 cm² : un carré de 10 cm de côté contient 10 rangées de 10 petits carrés";
const POURQUOI_M = "1 m² = 100 dm² : un carré de 10 dm de côté contient 10 rangées de 10 carrés de 1 dm²";
const expC = (raison: string, a: number, u: string, k: number, b: string) => exp(raison + ".", `chaque ${u} vaut ${fr(k)} ${b}, donc on multiplie par ${fr(k)}.`, `${fr(a)} × ${fr(k)} = ${fr(a * k)}.`, `${fr(a)} ${u} = ${fr(a * k)} ${b}.`);
const expI = (raison: string, n: number, u: string, k: number, b: string) => exp(raison + ".", `on cherche combien de fois ${fr(k)} ${u} dans ${fr(n)} ${u}.`, `${fr(n)} ÷ ${fr(k)} = ${fr(n / k)}.`, `${fr(n)} ${u} = ${fr(n / k)} ${b}.`);
const fauxC = (x: number, k: number) => [net(x * 10), x, net(x + k), net((x * k) / 10), net(x * k * 10), net(x * k + 10)];
const fauxI = (r: number) => [net(r * 10), net(r * 100), net(r / 10), net(r + 1), net(r * 1000)];
const EGAL = (g: string, u: string) => [`${g} = … ${u}. Quel nombre manque ?`, `Combien font ${g} en ${u} ?`, `Convertis ${g} en ${u}.`, `Écris ${g} en ${u}.`, `Que vaut ${g} en ${u} ?`];
const OUV = ["", "Pense au carré de 10 sur 10.", "Sans tableau.", "Pense aux 100 petits carrés."];
const aireConvertirUnites: TutorBankItemV4[] = [
  ac(1, "Un dm², c'est 100 petits carrés de 1 cm².", () => {
    const a = entre(2, 12);
    return qcmN(a * 100, fauxC(a, 100), expC(POURQUOI_DM, a, "dm²", 100, "cm²"), v(OUV, EGAL(`${a} dm²`, "cm²")), undefined, "cm²");
  }),
  ac(1, "Un m², c'est 100 carrés de 1 dm².", () => {
    const a = entre(2, 12);
    return qcmN(a * 100, fauxC(a, 100), expC(POURQUOI_M, a, "m²", 100, "dm²"), v(OUV, EGAL(`${a} m²`, "dm²")), undefined, "dm²");
  }),
  ac(1, "Regarde la grille : chaque petit carré fait 1 cm².", () => {
    const k = un([25, 50, 75, 100, 20, 40, 60, 80, 30, 70]);
    const pl = k === 100;
    return qcmN(k, [k * 10, net(k / 10), k + 10, 100 - k || 10, k - 10], exp("un petit carré vaut 1 cm², et la grille entière vaut 1 dm².", "on compte les carrés coloriés.", `${k} carrés coloriés.`, `${k} cm²${pl ? ", soit 1 dm²" : ""}.`), v(["La grille entière vaut 1 dm².", "Toute la grille fait 1 dm².", "Ce carré-grille mesure 1 dm²."], ["Quelle est l'aire de la partie coloriée ?", "Combien mesure la partie coloriée ?", "Que vaut la partie coloriée ?", "Quelle aire est coloriée ?", "Combien de cm² sont coloriés ?"]), grille10(k), "cm²");
  }),
  ac(2, "Chaque m² vaut 100 dm², et chaque dm² vaut 100 cm².", () => {
    const a = entre(2, 9);
    return qcmN(a * 10000, [a * 100, a * 1000, a * 100000, a * 10, a * 10000 + 100], exp("1 m² = 100 dm², et 1 dm² = 100 cm².", "on passe par les dm² : on multiplie par 100, puis encore par 100.", `${a} × 100 = ${a * 100} dm² ; ${a * 100} × 100 = ${fr(a * 10000)} cm².`, `${a} m² = ${fr(a * 10000)} cm².`), v(OUV, EGAL(`${a} m²`, "cm²")), undefined, "cm²");
  }),
  ac(2, "2,5 dm², c'est 2 dm² et la moitié d'un dm².", () => {
    const paire = un([["dm²", "cm²", POURQUOI_DM], ["m²", "dm²", POURQUOI_M]] as const);
    const a = net(entre(1, 9) + un([0.5, 0.25, 0.2, 0.4, 0.75, 0.1]));
    return qcmN(a * 100, fauxC(a, 100), expC(paire[2], a, paire[0], 100, paire[1]), v(["", "Pense au carré de 10 sur 10.", "Sans tableau.", "Multiplie par 100."], EGAL(`${fr(a)} ${paire[0]}`, paire[1])), undefined, paire[1]);
  }),
  ac(2, "Cent petits carrés en font un grand : divise par 100.", () => {
    const paire = un([["cm²", "dm²", POURQUOI_DM], ["dm²", "m²", POURQUOI_M]] as const);
    const r = entre(2, 12);
    const n = r * 100;
    return qcmN(r, fauxI(r), expI(paire[2], n, paire[0], 100, paire[1]), v(OUV, EGAL(`${fr(n)} ${paire[0]}`, paire[1])), undefined, paire[1]);
  }),
  ac(3, "Convertis pour que les deux aires soient dans la même unité.", () => {
    const a = entre(2, 9);
    const b = a * 100 + un([-100, 100, -50, 50]);
    const C = un([["Une nappe", "Un drap"], ["Un poster", "Une carte"], ["Un miroir", "Un cadre"], ["Une ardoise", "Un plateau"], ["Un tapis", "Une serviette"], ["Une affiche", "Une toile"], ["Un set de table", "Un napperon"], ["Un drapeau", "Un fanion"]]);
    const g = a * 100 > b;
    return qcm(g ? C[0] : C[1], [g ? C[1] : C[0], "Ils ont la même aire"], exp(POURQUOI_DM + ".", "on écrit les deux aires en cm².", `${a} dm² = ${a * 100} cm², à comparer à ${b} cm².`, `${g ? C[0] : C[1]} a la plus grande aire.`), `${C[0]} a une aire de ${a} dm². ${C[1]} a une aire de ${fr(b)} cm². ${v(["Qui a la plus grande aire ?", "Lequel des deux objets a la plus grande aire ?", "Quel objet a la plus grande aire ?"])}`);
  }),
  ac(3, "Un m², c'est 100 dm² : combien de carreaux de 1 dm² ?", () => {
    const a = entre(2, 9);
    const C = un(["une crédence de cuisine", "un mur de douche", "un coin de terrasse", "un mur d'école", "un mur de salle de bains", "un panneau de mosaïque", "un plafond de cabane", "une fresque de quartier"]);
    return qcmN(a * 100, fauxC(a, 100), expC(POURQUOI_M, a, "m²", 100, "dm²"), `${v(["On couvre", "Un artisan couvre", "Une carreleuse pose des carreaux sur"])} ${C} de ${a} m². ${v(["Il faut des carreaux de 1 dm².", "Les carreaux font 1 dm² chacun."])} ${v(["Combien de carreaux ?", "Combien en faut-il ?", "Quel est le nombre de carreaux ?"])}`, undefined, "carreaux");
  }),
  ac(3, "Compte l'aire totale en cm², puis divise par 100 pour avoir des dm².", () => {
    const n = entre(3, 15);
    const O = un(["photos", "images", "cartes postales", "gravures", "affichettes", "étiquettes", "tuiles de décor", "feuilles"]);
    const k = un([100, 200, 300, 400, 500]);
    const t = n * k;
    return qcmN(t / 100, [t, t / 10, n, t / 1000, t / 100 + 1], exp(POURQUOI_DM + ".", "on calcule l'aire totale en cm², puis on divise par 100.", `${n} × ${k} = ${fr(t)} cm² ; ${fr(t)} ÷ 100 = ${fr(t / 100)}.`, `cela fait ${fr(t / 100)} dm².`), `Sur un mur, on colle ${n} ${O} de ${k} cm² chacune. ${v(["Quelle aire couvrent-elles, en dm² ?", "Quelle est l'aire totale, en dm² ?", "En dm², quelle aire est couverte ?"])}`, undefined, "dm²");
  }),
];

export const airesUnitesBank: TutorBankItemV4[] = [...aireUnites, ...aireConvertirUnites];
