// lib/tutor-v4/question-banks/maths/6e/algorithmique.bank.ts

import type { TutorBankItemV4, ScratchCanvasData, ScratchBlockData } from "@/lib/tutor-v4/types";
import { PRENOMS, pick, de, type Prenom } from "./entiers.bank";

/* =========================
   HELPERS
========================= */

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  // Jamais deux fois la même ligne. Un gabarit dont le piège coïncide avec la
  // bonne réponse (les coordonnées inversées quand x = y, un arrondi égal à la
  // valeur de départ…) affichait la même proposition deux fois, et l'élève
  // voyait deux réponses justes. Dédupliquer AVANT de couper à quatre laisse
  // aussi une chance aux distracteurs surnuméraires de prendre la place.
  // ⚠️ 04/08/2026 — la bonne réponse était jetée dans le même chapeau que les
  // pièges : à cinq pièges écrits, le mélange pouvait la laisser au fond et
  // le découpage à quatre l'emportait. L'élève voyait alors quatre pièges et
  // rien d'autre. On la met de côté, on tire trois distracteurs, on mélange.
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function scratchCanvas(title: string, blocks: ScratchCanvasData["blocks"]): ScratchCanvasData {
  return {
    kind: "scratch",
    title,
    blocks,
  };
}

function ae(def: string, meth: string, obs: string, ccl: string) {
  return `Définition : ${def}\n\nMéthode : ${meth}\n\nExécution : ${obs}\n\nConclusion : ${ccl}`;
}

/* =========================
   LE MOTEUR DES GABARITS (07/10/2026)
   ⭐ Pourquoi : mesuré le 07/10, 10 à 12 squelettes par micro et 14 à 18
   répétitions sur 20 — « Quelle distance totale le lutin avance-t-il ? »
   revenait à l'identique. Chaque gabarit compose maintenant une SITUATION
   (qui exécute le programme, où) × un PRÉNOM × une TOURNURE, et le programme
   est ÉCRIT DANS LE TEXTE, une instruction par ligne commençant par « – » :
   le correcteur (correcteurs/algorithmique.ts) le relit et l'exécute.
   Notation des lignes (le correcteur la lit, ne pas la changer sans lui) :
     avancer de 30 cm · tourner de 90° · tourner à gauche de 90° ·
     répéter 4 fois : avancer de 20 pas puis tourner de 90° · dire « Bravo » ·
     poser le stylo · choisir le nombre 7 · ajouter 3 · soustraire 2 ·
     multiplier par 4 · diviser par 2 · mettre « score » à 0 · ajouter 5 à « score »
   « tourner de 90° » sans précision = vers la droite, comme le bloc ↻ de Scratch.
========================= */

type Unite = "pas" | "cm" | "m" | "cases";
type Ins =
  | { t: "av"; n: number }
  | { t: "tg"; a: number; sens?: "d" | "g" }
  | { t: "rep"; k: number; corps: Ins[] }
  | { t: "dire"; s: string }
  | { t: "stylo" }
  | { t: "act"; s: string }
  | { t: "calc"; op: "=" | "+" | "-" | "×" | "÷"; n: number }
  | { t: "var"; nom: string; op: "=" | "+"; n: number };

type Acteur = { nom: string; f: boolean; u: Unite; lieu: string };

/** Qui exécute le programme : 16 situations, une seule à La Réunion. */
const ACTEURS: Acteur[] = [
  { nom: "le lutin de Scratch", f: false, u: "pas", lieu: "sur l’écran" },
  { nom: "la tortue du logiciel de dessin", f: true, u: "pas", lieu: "sur l’écran de l’ordinateur" },
  { nom: "le robot aspirateur", f: false, u: "cm", lieu: "dans le salon" },
  { nom: "le drone", f: false, u: "m", lieu: "au-dessus du stade" },
  { nom: "la voiture téléguidée", f: true, u: "cm", lieu: "dans le couloir" },
  { nom: "le robot de la classe", f: false, u: "cm", lieu: "sur la grande table" },
  { nom: "le héros du jeu vidéo", f: false, u: "cases", lieu: "dans le labyrinthe" },
  { nom: "la tondeuse robot", f: true, u: "m", lieu: "dans le jardin" },
  { nom: "le petit robot sous-marin", f: false, u: "m", lieu: "dans la piscine" },
  { nom: "le chien robot", f: false, u: "pas", lieu: "dans la cour" },
  { nom: "le bateau télécommandé", f: false, u: "m", lieu: "sur le lac" },
  { nom: "le robot ramasseur de balles", f: false, u: "m", lieu: "sur le court de tennis" },
  { nom: "la maquette du robot martien", f: true, u: "cm", lieu: "au club de sciences" },
  { nom: "le pion du jeu de plateau", f: false, u: "cases", lieu: "sur le plateau" },
  { nom: "le robot traceur de lignes", f: false, u: "m", lieu: "sur le terrain de football" },
  { nom: "le margouillat du jeu", f: false, u: "pas", lieu: "sur le mur de la case créole" },
];

/** Une ligne citée entre guillemets, sauf si elle en contient déjà (« dire « Hop ! » »). */
function cite(s: string) {
  return s.includes("«") ? s : `« ${s} »`;
}
/** « le drone » → « Le drone ». */
function maj(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
/** « le drone » → « du drone », « la tortue » → « de la tortue ». */
function duA(a: Acteur) {
  if (a.nom.startsWith("le ")) return `du ${a.nom.slice(3)}`;
  return `de ${a.nom}`;
}
function ilA(a: Acteur) {
  return a.f ? "elle" : "il";
}
/** « 3 cases », « 1 case », « 40 cm ». */
function uTxt(n: number, u: Unite) {
  if (u === "cases") return n >= 2 ? `${n} cases` : `${n} case`;
  return `${n} ${u}`;
}
const UNITE_MOT: Record<Unite, string> = { pas: "pas", cm: "centimètres", m: "mètres", cases: "cases" };
/** Une longueur plausible pour un déplacement, selon l'unité. */
function longueur(u: Unite): number {
  if (u === "pas") return randomChoice([10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 100]);
  if (u === "cm") return randomChoice([10, 15, 20, 25, 30, 40, 50, 60, 75, 80, 100, 120]);
  if (u === "m") return randomInt(2, 25);
  return randomInt(2, 8);
}

function ligne(i: Ins, u: Unite): string {
  switch (i.t) {
    case "av":
      return `avancer de ${uTxt(i.n, u)}`;
    case "tg":
      return i.sens ? `tourner à ${i.sens === "g" ? "gauche" : "droite"} de ${i.a}°` : `tourner de ${i.a}°`;
    case "rep":
      return `répéter ${i.k} fois : ${i.corps.map((c) => ligne(c, u)).join(" puis ")}`;
    case "dire":
      return `dire « ${i.s} »`;
    case "stylo":
      return "poser le stylo";
    case "act":
      return i.s;
    case "calc":
      return i.op === "="
        ? `choisir le nombre ${i.n}`
        : i.op === "+"
          ? `ajouter ${i.n}`
          : i.op === "-"
            ? `soustraire ${i.n}`
            : i.op === "×"
              ? `multiplier par ${i.n}`
              : `diviser par ${i.n}`;
    case "var":
      return i.op === "=" ? `mettre « ${i.nom} » à ${i.n}` : `ajouter ${i.n} à « ${i.nom} »`;
  }
}
/** Le programme écrit dans le texte : une ligne « – … » par instruction. */
function progTxt(prog: Ins[], u: Unite = "pas") {
  return prog.map((i) => `– ${ligne(i, u)}`).join("\n");
}
function bloc(i: Ins, u: Unite): ScratchBlockData | null {
  switch (i.t) {
    case "av":
      return { type: "move", value: u === "pas" ? i.n : uTxt(i.n, u) };
    case "tg":
      return { type: "turn", value: i.sens ? `${i.sens === "g" ? "↺" : "↻"} ${i.a}` : i.a };
    case "rep": {
      const enfants = i.corps.map((c) => bloc(c, u));
      return enfants.every((e) => e) ? { type: "repeat", times: i.k, children: enfants as ScratchBlockData[] } : null;
    }
    case "dire":
      return { type: "say", text: i.s };
    case "stylo":
      return { type: "pen", text: "stylo en position d’écriture" };
    case "var":
      return i.op === "="
        ? { type: "set_variable", variable: i.nom, value: i.n }
        : { type: "change_variable", variable: i.nom, value: i.n };
    default:
      return null;
  }
}
/** Les blocs Scratch du même programme (null s'il contient une action sans bloc). */
function canvasDe(prog: Ins[], u: Unite, titre: string, a?: Acteur): ScratchCanvasData | undefined {
  const bs = prog.map((i) => bloc(i, u));
  if (!bs.every((b) => b)) return undefined;
  const depart: ScratchBlockData =
    !a || a.nom === "le lutin de Scratch" ? { type: "event" } : { type: "event", text: `quand ${a.nom} démarre` };
  return scratchCanvas(titre, [depart, ...(bs as ScratchBlockData[])]);
}

/** L'exécution d'un programme : ce que les gabarits demandent. */
function executer(prog: Ins[], cap0 = 0, x0 = 0) {
  const e = { cap: cap0, x: x0, y: 0, dist: 0, angle: 0, actions: [] as string[], valeur: 0, vars: {} as Record<string, number> };
  const pas = (i: Ins) => {
    if (i.t === "rep") {
      for (let k = 0; k < i.k; k++) i.corps.forEach(pas);
      return;
    }
    e.actions.push(ligne(i, "pas"));
    if (i.t === "av") {
      e.dist += i.n;
      const r = (e.cap * Math.PI) / 180;
      e.x += i.n * Math.sin(r);
      e.y += i.n * Math.cos(r);
    } else if (i.t === "tg") {
      e.angle += i.a;
      e.cap = (((e.cap + (i.sens === "g" ? -i.a : i.a)) % 360) + 360) % 360;
    } else if (i.t === "calc") {
      if (i.op === "=") e.valeur = i.n;
      else if (i.op === "+") e.valeur += i.n;
      else if (i.op === "-") e.valeur -= i.n;
      else if (i.op === "×") e.valeur *= i.n;
      else e.valeur /= i.n;
    } else if (i.t === "var") {
      e.vars[i.nom] = i.op === "=" ? i.n : (e.vars[i.nom] ?? 0) + i.n;
    }
  };
  prog.forEach(pas);
  return e;
}

/** Une phrase d'ouverture : qui exécute le programme, et pour qui. */
function intro(p: Prenom, a: Acteur) {
  return randomChoice([
    `${p.nom} programme ${a.nom} ${a.lieu}.`,
    `Voici le programme ${duA(a)} ${de(p.nom)}.`,
    `${maj(a.nom)} ${de(p.nom)} exécute ce programme.`,
    `${p.nom} a écrit ce programme pour ${a.nom}.`,
    `${maj(a.lieu)}, ${a.nom} ${de(p.nom)} suit ce programme.`,
  ]);
}

const ORDINAUX = ["première", "deuxième", "troisième", "quatrième", "cinquième", "sixième", "septième", "huitième"];

/** Un programme de calcul de `nbOps` opérations, sans nombre négatif ni division qui tombe mal. */
function programmeCalcul(nbOps: number, ops: Array<"+" | "-" | "×" | "÷"> = ["+", "-", "×", "÷"]): Ins[] {
  for (;;) {
    const depart = randomInt(2, 12);
    const prog: Ins[] = [{ t: "calc", op: "=", n: depart }];
    let v = depart;
    let ok = true;
    for (let k = 0; k < nbOps; k++) {
      const op = randomChoice(ops);
      let n: number;
      if (op === "+") n = randomInt(1, 15);
      else if (op === "-") n = randomInt(1, Math.max(1, Math.min(9, v)));
      else if (op === "×") n = randomInt(2, 5);
      else {
        const diviseurs = [2, 3, 4, 5].filter((d) => v % d === 0 && v > 0);
        if (!diviseurs.length) {
          ok = false;
          break;
        }
        n = randomChoice(diviseurs);
      }
      v = op === "+" ? v + n : op === "-" ? v - n : op === "×" ? v * n : v / n;
      if (v < 0 || v > 200) {
        ok = false;
        break;
      }
      prog.push({ t: "calc", op, n });
    }
    if (ok) return prog;
  }
}

/** Les algorithmes de la vie de tous les jours (étapes distinctes, dans l'ordre). */
const ROUTINES: Array<{ titre: string; etapes: string[] }> = [
  { titre: "préparer un chocolat chaud", etapes: ["verser le lait dans une casserole", "faire chauffer le lait", "ajouter le cacao", "mélanger", "verser dans un bol"] },
  { titre: "planter une graine de tournesol", etapes: ["remplir le pot de terre", "faire un trou avec le doigt", "poser la graine dans le trou", "recouvrir de terre", "arroser"] },
  { titre: "réparer un pneu de vélo crevé", etapes: ["démonter la roue", "sortir la chambre à air", "trouver le trou", "coller une rustine", "remonter la roue", "gonfler le pneu"] },
  { titre: "faire une pâte à crêpes", etapes: ["verser la farine dans un saladier", "ajouter les œufs", "ajouter le lait petit à petit", "mélanger sans arrêt", "laisser reposer la pâte"] },
  { titre: "laver le chien", etapes: ["mouiller le chien", "mettre le shampoing", "frotter le pelage", "rincer à l’eau tiède", "sécher avec une serviette"] },
  { titre: "monter une tente", etapes: ["étaler la toile au sol", "assembler les arceaux", "glisser les arceaux dans la toile", "lever la tente", "planter les sardines"] },
  { titre: "faire une expérience avec du sel", etapes: ["remplir un verre d’eau", "verser une cuillère de sel", "mélanger l’eau", "attendre une minute", "observer le verre", "noter le résultat"] },
  { titre: "fabriquer une cabane à oiseaux", etapes: ["scier les planches", "poncer les bords", "clouer les planches", "peindre la cabane", "accrocher la cabane à l’arbre"] },
  { titre: "lancer une partie de jeu vidéo", etapes: ["allumer la console", "choisir le jeu", "créer son joueur", "lancer la partie"] },
  { titre: "préparer un smoothie", etapes: ["laver les fruits", "éplucher la banane", "couper les fruits", "mettre les fruits dans le mixeur", "mixer", "verser dans un verre"] },
  { titre: "prendre le train", etapes: ["regarder l’heure du départ", "trouver le bon quai", "monter dans le train", "s’asseoir à sa place"] },
  { titre: "nourrir les poules", etapes: ["remplir le seau de grains", "ouvrir le poulailler", "verser les grains", "changer l’eau", "ramasser les œufs", "fermer le poulailler"] },
  { titre: "jouer une chanson à la guitare", etapes: ["accorder la guitare", "poser la partition", "placer les doigts sur le premier accord", "gratter les cordes", "changer d’accord"] },
  { titre: "faire cuire du riz", etapes: ["rincer le riz", "verser le riz dans la casserole", "ajouter l’eau", "faire cuire à feu doux", "laisser gonfler le riz"] },
  { titre: "préparer une randonnée", etapes: ["préparer les sandwichs", "remplir la gourde", "ranger le tout dans le sac", "mettre ses chaussures de marche", "partir sur le sentier"] },
  { titre: "faire un gâteau au yaourt", etapes: ["vider le yaourt dans un saladier", "ajouter le sucre", "ajouter la farine", "mélanger la pâte", "verser dans le moule", "faire cuire au four"] },
];

const PAROLES = ["Bonjour !", "J’arrive !", "Fini !", "Bravo !", "C’est parti !", "Me voilà !", "Hop !", "Super !"];

/** Un programme sans boucle de `n` instructions TOUTES différentes (avancer, tourner, dire, stylo). */
function programmeSimple(u: Unite, n: number, avecDire = true): Ins[] {
  for (;;) {
    const prog: Ins[] = [];
    for (let k = 0; k < n; k++) {
      const r = Math.random();
      if (r < 0.45) prog.push({ t: "av", n: longueur(u) });
      else if (r < 0.8) prog.push({ t: "tg", a: randomChoice([30, 45, 60, 90, 120, 180]) });
      else if (avecDire) prog.push({ t: "dire", s: randomChoice(PAROLES) });
      else prog.push({ t: "av", n: longueur(u) });
    }
    const lignes = prog.map((i) => ligne(i, u));
    const collees = prog.some((i, k) => k > 0 && i.t === prog[k - 1].t);
    if (new Set(lignes).size === n && !collees && prog.some((i) => i.t === "av") && prog.some((i) => i.t === "tg"))
      return prog;
  }
}

/** Des situations de la vie où une action se répète (sans bloc Scratch). */
const REPETES: Array<{ ouverture: (p: Prenom) => string; act: string; question: string }> = [
  { ouverture: (p) => `${p.nom} programme la lampe de son vélo.`, act: "faire clignoter la lampe", question: "Combien de fois la lampe clignote-t-elle ?" },
  { ouverture: (p) => `${p.nom} programme un robot cuisinier.`, act: "casser un œuf", question: "Combien d’œufs le robot casse-t-il ?" },
  { ouverture: (p) => `${p.nom} programme le robot du jardin.`, act: "arroser une plante", question: "Combien de plantes sont arrosées ?" },
  { ouverture: (p) => `${p.nom} programme le héros de son jeu vidéo.`, act: "sauter", question: "Combien de fois le héros saute-t-il ?" },
  { ouverture: (p) => `${p.nom} programme une batterie électronique.`, act: "frapper le tambour", question: "Combien de coups de tambour entend-on ?" },
  { ouverture: (p) => `${p.nom} programme le robot de la bibliothèque.`, act: "ranger un livre", question: "Combien de livres sont rangés ?" },
  { ouverture: (p) => `${p.nom} programme la machine à lancer les balles de tennis.`, act: "lancer une balle", question: "Combien de balles la machine lance-t-elle ?" },
  { ouverture: (p) => `${p.nom} programme le distributeur de croquettes du chat.`, act: "donner une croquette", question: "Combien de croquettes le chat reçoit-il ?" },
  { ouverture: (p) => `${p.nom} programme une guirlande lumineuse.`, act: "allumer une étoile", question: "Combien d’étoiles s’allument ?" },
  { ouverture: (p) => `${p.nom} programme le robot de la classe.`, act: "taper dans les mains", question: "Combien de fois le robot tape-t-il dans les mains ?" },
  { ouverture: (p) => `${p.nom} programme le robot planteur de graines.`, act: "planter une graine", question: "Combien de graines sont plantées ?" },
  { ouverture: (p) => `${p.nom} programme un clavier de musique.`, act: "jouer la note do", question: "Combien de fois la note do est-elle jouée ?" },
  { ouverture: (p) => `${p.nom} programme la cloche de l’école.`, act: "faire sonner la cloche", question: "Combien de fois la cloche sonne-t-elle ?" },
  { ouverture: (p) => `${p.nom} programme la fontaine du parc.`, act: "lancer un jet d’eau", question: "Combien de jets d’eau la fontaine lance-t-elle ?" },
];

function introCalcul(p: Prenom) {
  const autre = pick(PRENOMS.filter((x) => x.nom !== p.nom));
  return randomChoice([
    `${p.nom} joue à « Devine mon nombre » avec ${autre.nom}.`,
    `${p.nom} prépare un tour de magie avec des nombres.`,
    `En classe, ${p.nom} teste ce programme de calcul.`,
    `${p.nom} invente un défi de calcul mental pour ${autre.nom}.`,
    `Au club de maths, ${p.nom} essaie ce programme.`,
    `Pendant la récréation, ${p.nom} lance ce défi à ${autre.nom}.`,
    `Pour un quiz de la fête de l’école, ${p.nom} écrit ce programme.`,
    `${p.nom} programme une calculatrice en carton pour son petit frère.`,
  ]);
}
/** Le déroulé d'un programme de calcul : « 7 + 3 = 10 ; 10 × 2 = 20 ». */
function derouleCalcul(prog: Ins[]) {
  let v = 0;
  const etapes: string[] = [];
  for (const i of prog) {
    if (i.t !== "calc") continue;
    if (i.op === "=") {
      v = i.n;
      continue;
    }
    const w = i.op === "+" ? v + i.n : i.op === "-" ? v - i.n : i.op === "×" ? v * i.n : v / i.n;
    etapes.push(`${v} ${i.op === "-" ? "−" : i.op} ${i.n} = ${w}`);
    v = w;
  }
  return etapes.join(" ; ");
}

/** Ceux qui dessinent : le stylo posé laisse un trait. */
const DESSINATEURS: Acteur[] = [
  { nom: "le lutin de Scratch", f: false, u: "pas", lieu: "sur l’écran" },
  { nom: "la tortue du logiciel de dessin", f: true, u: "pas", lieu: "sur l’écran de l’ordinateur" },
  { nom: "le robot traceur de lignes", f: false, u: "m", lieu: "sur le terrain de football" },
  { nom: "le robot dessinateur", f: false, u: "cm", lieu: "sur le sol du gymnase" },
  { nom: "le robot de la classe", f: false, u: "cm", lieu: "dans le préau" },
  { nom: "la craie robot", f: true, u: "m", lieu: "dans la cour" },
  { nom: "la fourmi du jeu de dessin", f: true, u: "pas", lieu: "sur la tablette" },
  { nom: "le robot peintre", f: false, u: "cm", lieu: "sur le mur de la classe" },
];

/** Les polygones qu'un « répéter » trace : nombre de côtés et angle à tourner. */
const POLYGONES = [
  { nom: "un triangle équilatéral", k: 3, a: 120 },
  { nom: "un carré", k: 4, a: 90 },
  { nom: "un pentagone", k: 5, a: 72 },
  { nom: "un hexagone", k: 6, a: 60 },
  { nom: "un octogone", k: 8, a: 45 },
];
const FIGURES_LEURRES = ["un carré", "un rectangle", "un triangle équilatéral", "un pentagone", "un hexagone", "un cercle", "un octogone"];

/** Un polygone régulier ou un rectangle, stylo posé. `nom` : le nom de la figure. */
function programmeFigure(u: Unite, choix: string[]) {
  const nom = randomChoice(choix);
  if (nom === "un rectangle") {
    const L = longueur(u);
    let l = longueur(u);
    while (l === L) l = longueur(u);
    const prog: Ins[] = [
      { t: "stylo" },
      { t: "rep", k: 2, corps: [{ t: "av", n: L }, { t: "tg", a: 90 }, { t: "av", n: l }, { t: "tg", a: 90 }] },
    ];
    return { nom, prog, cotes: 4, perimetre: 2 * (L + l), cote: 0, calcul: `2 × (${L} + ${l})` };
  }
  const f = POLYGONES.find((x) => x.nom === nom)!;
  const c = longueur(u);
  const prog: Ins[] = [{ t: "stylo" }, { t: "rep", k: f.k, corps: [{ t: "av", n: c }, { t: "tg", a: f.a }] }];
  return { nom, prog, cotes: f.k, perimetre: f.k * c, cote: c, calcul: `${f.k} × ${c}` };
}

const POINTS = ["Nord", "Est", "Sud", "Ouest"];
const VERS: Record<string, string> = { Nord: "le Nord", Est: "l’Est", Sud: "le Sud", Ouest: "l’Ouest" };

/** Orientation : un départ (Nord, Est…), des quarts et des demi-tours à droite ou à gauche, quelques pas. */
function questionOrientation(nbTg: number, nbAv: number, titre: string) {
  const p = pick(PRENOMS);
  const a = randomChoice(ACTEURS);
  const cap0 = randomInt(0, 3) * 90;
  const prog: Ins[] = [];
  for (let k = 0; k < nbTg; k++)
    prog.push(Math.random() < 0.2 ? { t: "tg", a: 180 } : { t: "tg", a: 90, sens: randomChoice(["d", "g"] as const) });
  for (let k = 0; k < nbAv; k++) prog.splice(randomInt(0, prog.length), 0, { t: "av", n: longueur(a.u) });
  const etapes = [POINTS[cap0 / 90]];
  let cap = cap0;
  for (const i of prog)
    if (i.t === "tg") {
      cap = (((cap + (i.sens === "g" ? -i.a : i.a)) % 360) + 360) % 360;
      etapes.push(POINTS[cap / 90]);
    }
  const fin = POINTS[executer(prog, cap0).cap / 90];
  const il = ilA(a);
  return {
    text:
      `${intro(p, a)}\nAu départ, ${a.nom} regarde vers ${VERS[POINTS[cap0 / 90]]}.\n${progTxt(prog, a.u)}\n` +
      randomChoice([
        `Vers où ${a.nom} regarde-t-${il} à la fin ?`,
        `À la fin, dans quelle direction ${a.nom} regarde-t-${il} ?`,
        `Quelle est la direction ${duA(a)} à la fin du programme ?`,
        `À la fin, ${a.nom} est tourné${a.f ? "e" : ""} vers quel point cardinal ?`,
      ]),
    format: "qcm" as const,
    choices: makeChoices(fin, POINTS),
    expected: [fin],
    comparator: "mcq_exact" as const,
    explanation: ae(
      "tourner change la direction ; avancer ne la change pas. Un quart de tour vaut 90°, un demi-tour 180°.",
      "on suit les blocs « tourner » un par un, à partir de la direction de départ. À droite : Nord → Est → Sud → Ouest ; à gauche, dans l’autre sens.",
      `${etapes.join(" → ")}.`,
      `à la fin, ${a.nom} regarde vers ${VERS[fin]}.`,
    ),
    canvas: canvasDe(prog, a.u, titre, a),
  };
}

/** La question « quelle instruction… » sur une liste de lignes distinctes : la question et la bonne ligne. */
function questionRang(lignes: string[]): { question: string; juste: string } {
  const n = lignes.length;
  const genre = randomChoice(["rang", "apres", "avant", "derniere"] as const);
  if (genre === "apres") {
    const k = randomInt(0, n - 2);
    return {
      question: randomChoice([
        `Quelle instruction vient juste après « ${lignes[k]} » ?`,
        `Que faut-il faire juste après « ${lignes[k]} » ?`,
      ]),
      juste: lignes[k + 1],
    };
  }
  if (genre === "avant") {
    const k = randomInt(1, n - 1);
    return {
      question: randomChoice([
        `Quelle instruction vient juste avant « ${lignes[k]} » ?`,
        `Qu’est-ce qui est fait juste avant « ${lignes[k]} » ?`,
      ]),
      juste: lignes[k - 1],
    };
  }
  if (genre === "derniere")
    return {
      question: randomChoice(["Quelle est la dernière instruction ?", "Par quelle instruction le programme se termine-t-il ?"]),
      juste: lignes[n - 1],
    };
  const k = randomInt(0, n - 2);
  return {
    question: randomChoice([
      `Quelle est la ${ORDINAUX[k]} instruction ?`,
      k === 0 ? "Quelle instruction est exécutée en premier ?" : `Quelle instruction est exécutée en ${ORDINAUX[k]} ?`,
    ]),
    juste: lignes[k],
  };
}

export const algorithmiqueBank: TutorBankItemV4[] = [
  /* =========================
     ALGO_SEQUENCE
  ========================= */

  {
    kind: "fixed",
    id: "6e_algo_sequence_fixed_1_definition",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_sequence",
    difficulty: 1,
    theme: "neutral",
    text: "En algorithmique, une suite d’instructions sert à...",
    format: "qcm",
    choices: [
      "donner des actions dans un ordre précis",
      "faire un calcul au hasard",
      "dessiner sans règle",
      "choisir toujours la réponse la plus longue",
    ],
    expected: ["donner des actions dans un ordre précis"],
    comparator: "mcq_exact",
    hint: "Un programme suit des étapes.",
    explanation:
      "Définition : un algorithme est une suite d’instructions à exécuter dans un ordre précis.\n\n" +
      "Méthode : on lit les instructions de haut en bas.\n\n" +
      "Exécution : chaque instruction est réalisée après la précédente.\n\n" +
      "Conclusion : une suite d’instructions sert à organiser des actions dans un ordre précis.",
    tags: ["algo_programmation", "sequence", "definition", "qcm"],
  },

  {
    kind: "fixed",
    id: "6e_algo_sequence_fixed_2_ordre",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_sequence",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un programme, l’ordre des instructions est-il important ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Changer l’ordre peut changer le résultat.",
    explanation:
      "Définition : un programme est une suite ordonnée d’instructions.\n\n" +
      "Méthode : on exécute les blocs dans l’ordre où ils apparaissent.\n\n" +
      "Exécution : si on tourne avant d’avancer, le déplacement final peut changer.\n\n" +
      "Conclusion : oui, l’ordre des instructions est important.",
    tags: ["algo_programmation", "sequence", "ordre", "qcm"],
  },

  {
    kind: "fixed",
    id: "6e_algo_sequence_fixed_3_lire_programme_simple",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_sequence",
    difficulty: 2,
    theme: "neutral",
    text: "Combien d’instructions sont exécutées après le drapeau vert ?",
    format: "qcm",
    choices: ["1", "2", "3", "4"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Ne compte pas seulement le drapeau vert.",
    explanation:
      "Définition : une instruction est une action que le programme exécute.\n\n" +
      "Méthode : on compte les blocs d’action après l’événement de départ.\n\n" +
      "Exécution : le programme avance, tourne, puis dit bonjour : cela fait 3 instructions.\n\n" +
      "Conclusion : 3 instructions sont exécutées.",
    tags: ["algo_programmation", "scratch", "sequence", "canvas", "qcm"],
    canvas: scratchCanvas("Programme Scratch", [
      { type: "event" },
      { type: "move", value: 10 },
      { type: "turn", value: 90 },
      { type: "say", text: "Bonjour !" },
    ]),
  },

  {
    kind: "template",
    id: "6e_algo_sequence_tpl_1_compter_instructions",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_sequence",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les blocs d’action après le départ.",
    tags: ["algo_programmation", "sequence", "scratch", "template", "canvas"],
    generate: () => {
      const p = pick(PRENOMS);
      const a = randomChoice(ACTEURS);
      const prog = programmeSimple(a.u, randomInt(3, 6));
      const nAv = prog.filter((i) => i.t === "av").length;
      const nTg = prog.filter((i) => i.t === "tg").length;
      const genre = randomChoice(["tout", "tout", "avance", "tourne"] as const);
      const [question, n, quoi] =
        genre === "tout"
          ? [
              randomChoice([
                "Combien d’instructions ce programme contient-il ?",
                "Combien d’instructions y a-t-il dans ce programme ?",
                "Compte les instructions de ce programme. Combien y en a-t-il ?",
              ]),
              prog.length,
              "toutes les lignes du programme",
            ]
          : genre === "avance"
            ? [
                randomChoice([
                  "Combien d’instructions « avancer » ce programme contient-il ?",
                  `Combien de fois ${a.nom} avance-t-${ilA(a)} ?`,
                ]),
                nAv,
                "les lignes « avancer »",
              ]
            : [
                randomChoice([
                  "Combien d’instructions « tourner » ce programme contient-il ?",
                  `Combien de fois ${a.nom} tourne-t-${ilA(a)} ?`,
                ]),
                nTg,
                "les lignes « tourner »",
              ];

      return {
        text: `${intro(p, a)}\n${progTxt(prog, a.u)}\n${question}`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: ae(
          "un programme est une suite d’instructions, une par ligne.",
          `on compte ${quoi}, de haut en bas, sans en oublier.`,
          `on trouve ${n}.`,
          `la réponse est ${n}.`,
        ),
        canvas: canvasDe(prog, a.u, "Programme", a),
      };
    },
  },

  {
    kind: "template",
    id: "6e_algo_sequence_tpl_2_premiere_action",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_sequence",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis le premier bloc placé sous le drapeau vert.",
    tags: ["algo_programmation", "sequence", "ordre", "template", "canvas"],
    generate: () => {
      const p = pick(PRENOMS);
      const a = randomChoice(ACTEURS);
      const prog = programmeSimple(a.u, randomInt(4, 5));
      const lignes = prog.map((i) => ligne(i, a.u));
      const { question, juste } = questionRang(lignes);

      return {
        text: `${intro(p, a)}\n${progTxt(prog, a.u)}\n${question}`,
        format: "qcm",
        choices: makeChoices(juste, lignes),
        expected: [juste],
        comparator: "mcq_exact",
        explanation: ae(
          "un programme s’exécute de haut en bas, une instruction après l’autre.",
          "on suit les lignes dans l’ordre, en les comptant.",
          `la bonne ligne est ${cite(juste)}.`,
          `la réponse est ${cite(juste)}.`,
        ),
        canvas: canvasDe(prog, a.u, "Programme", a),
      };
    },
  },

  {
    kind: "template",
    id: "6e_algo_sequence_tpl_3_etapes_routine",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_sequence",
    difficulty: 1,
    theme: "neutral",
    hint: "Lis les étapes de haut en bas, dans l’ordre.",
    tags: ["algo_programmation", "sequence", "ordre", "template"],
    generate: () => {
      const p = pick(PRENOMS);
      const r = randomChoice(ROUTINES);
      const E = r.etapes;
      const ouverture = randomChoice([
        `${p.nom} écrit l’algorithme pour ${r.titre}.`,
        `Voici l’algorithme ${de(p.nom)} pour ${r.titre}.`,
        `Pour ${r.titre}, ${p.nom} suit ces instructions dans l’ordre.`,
        `${p.nom} note les étapes pour ${r.titre}.`,
      ]);
      const texte = `${ouverture}\n${E.map((e) => `– ${e}`).join("\n")}\n`;
      if (Math.random() < 0.2) {
        return {
          text:
            texte +
            randomChoice([
              "Combien d’instructions compte cet algorithme ?",
              "Cet algorithme a combien d’étapes ?",
              "Combien d’étapes faut-il suivre ?",
            ]),
          format: "short",
          expected: [String(E.length)],
          comparator: "number_equal",
          explanation: ae(
            "un algorithme est une suite d’instructions, une par ligne.",
            "on compte les lignes.",
            `il y a ${E.length} lignes.`,
            `l’algorithme compte ${E.length} instructions.`,
          ),
        };
      }
      const { question, juste } = questionRang(E);
      return {
        text: texte + question,
        format: "qcm",
        choices: makeChoices(juste, E),
        expected: [juste],
        comparator: "mcq_exact",
        explanation: ae(
          "un algorithme est une suite d’instructions faites dans un ordre précis.",
          "on lit les lignes de haut en bas.",
          `la bonne ligne est ${cite(juste)}.`,
          `la réponse est ${cite(juste)}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "6e_algo_sequence_tpl_4_ordre_change_resultat",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_sequence",
    difficulty: 3,
    theme: "neutral",
    hint: "Fais les calculs dans l’ordre des lignes, un par un.",
    tags: ["algo_programmation", "sequence", "ordre", "programme_calcul", "template"],
    generate: () => {
      const p1 = pick(PRENOMS);
      let p2 = pick(PRENOMS);
      while (p2.nom === p1.nom) p2 = pick(PRENOMS);
      const memeQuestion = Math.random() < 0.3;
      let A: Ins[] = [];
      let B: Ins[] = [];
      let vA = 0;
      let vB = 0;
      for (;;) {
        const s = randomInt(2, 10);
        type Op = "+" | "-" | "×";
        const paires: Array<[Op, Op]> = memeQuestion
          ? [["+", "×"], ["-", "×"], ["+", "+"], ["+", "-"], ["×", "×"]]
          : [["+", "×"], ["-", "×"], ["×", "+"], ["×", "-"]];
        const paire = randomChoice(paires);
        const o1: Ins = { t: "calc", op: paire[0], n: paire[0] === "×" ? randomInt(2, 5) : randomInt(1, 9) };
        const o2: Ins = { t: "calc", op: paire[1], n: paire[1] === "×" ? randomInt(2, 5) : randomInt(1, 9) };
        A = [{ t: "calc", op: "=", n: s }, o1, o2];
        B = [{ t: "calc", op: "=", n: s }, o2, o1];
        vA = executer(A).valeur;
        vB = executer(B).valeur;
        const etapesOk = [A, B].every((P) => {
          let v = 0;
          return P.every((i) => {
            v = executer([...P.slice(0, P.indexOf(i) + 1)]).valeur;
            return v >= 0;
          });
        });
        const differents = ligne(o1, "pas") !== ligne(o2, "pas");
        if (etapesOk && differents && (memeQuestion || vA !== vB)) break;
      }
      const ouverture = randomChoice([
        `Au club de maths, ${p1.nom} et ${p2.nom} testent deux programmes de calcul.`,
        `${p1.nom} et ${p2.nom} jouent à un jeu de calcul mental.`,
        `Pendant un trajet en voiture, ${p1.nom} et ${p2.nom} inventent des programmes de calcul.`,
        `${p1.nom} et ${p2.nom} préparent un tour de magie avec des nombres.`,
        `En classe, ${p1.nom} et ${p2.nom} écrivent chacun un programme de calcul.`,
      ]);
      const texte = `${ouverture}\nProgramme ${de(p1.nom)} :\n${progTxt(A)}\nProgramme ${de(p2.nom)} :\n${progTxt(B)}\n`;
      const deroule = `${p1.nom} obtient ${vA} ; ${p2.nom} obtient ${vB}`;
      if (memeQuestion) {
        const juste = vA === vB ? "oui, le même nombre" : "non, deux nombres différents";
        return {
          text: texte + `${p1.nom} et ${p2.nom} obtiennent-ils le même nombre ?`,
          format: "qcm",
          choices: ["oui, le même nombre", "non, deux nombres différents"],
          expected: [juste],
          comparator: "mcq_exact",
          explanation: ae(
            "un programme s’exécute dans l’ordre de ses lignes.",
            "on fait les deux calculs, ligne par ligne.",
            `${deroule}.`,
            vA === vB
              ? "ici, changer l’ordre ne change pas le résultat."
              : "ici, changer l’ordre change le résultat : l’ordre est important.",
          ),
        };
      }
      const s = (A[0] as { n: number }).n;
      const n1 = (A[1] as { n: number }).n;
      const n2 = (A[2] as { n: number }).n;
      return {
        text:
          texte +
          randomChoice([
            `Quel nombre obtient ${p2.nom} ?`,
            `Quel est le résultat du programme ${de(p2.nom)} ?`,
            `Calcule le résultat ${de(p2.nom)}.`,
          ]),
        format: "qcm",
        choices: makeChoices(String(vB), [String(vA), String(s + n1 + n2), String(vB + 1), String(vA + n2)]),
        expected: [String(vB)],
        comparator: "mcq_exact",
        explanation: ae(
          "un programme s’exécute dans l’ordre de ses lignes.",
          `on suit les lignes ${de(p2.nom)}, une par une.`,
          `${deroule}.`,
          `${p2.nom} obtient ${vB} : le même calcul dans un autre ordre donne un autre nombre.`,
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_algo_sequence_open_1_expliquer_ordre",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_sequence",
    difficulty: 3,
    theme: "neutral",
    text: "Pourquoi l’ordre des instructions est-il important dans un programme ?",
    format: "qcm",
    choices: [
      "parce que changer l’ordre peut changer le résultat",
      "parce que l’ordinateur lit les lignes au hasard",
      "parce que la première ligne est toujours la plus longue",
      "parce qu’un programme a toujours trois lignes",
    ],
    expected: ["parce que changer l’ordre peut changer le résultat"],
    comparator: "mcq_exact",
    hint: "Changer l’ordre peut changer ce que fait le programme.",
    explanation:
      "Définition : un programme est une suite d’instructions ordonnées.\n\n" +
      "Méthode : on exécute les blocs dans l’ordre où ils sont écrits.\n\n" +
      "Exécution : si on inverse deux actions, le résultat peut être différent.\n\n" +
      "Conclusion : l’ordre est important car il peut changer le résultat du programme.",
    tags: ["algo_programmation", "sequence", "open", "raisonnement"],
  },

  {
    kind: "fixed",
    id: "6e_algo_sequence_fixed_4_erreur_ordre",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_sequence",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : “Dans Scratch, on peut lire les blocs dans n’importe quel ordre.” A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Les blocs s’exécutent dans l’ordre.",
    explanation:
      "Définition : dans un programme Scratch, les blocs sont exécutés dans un ordre précis.\n\n" +
      "Méthode : on lit la pile de blocs de haut en bas.\n\n" +
      "Exécution : changer l’ordre des blocs peut changer le déplacement ou le dessin.\n\n" +
      "Conclusion : l’élève a tort.",
    tags: ["algo_programmation", "sequence", "erreur", "qcm"],
  },
    /* =========================
     ALGO_DEPLACEMENT
  ========================= */

  {
    kind: "fixed",
    id: "6e_algo_deplacement_fixed_1_avancer",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_deplacement",
    difficulty: 1,
    theme: "neutral",
    text: "Dans Scratch, le bloc “avancer de 10” signifie que le lutin...",
    format: "qcm",
    choices: [
      "se déplace tout droit",
      "tourne à droite",
      "change de couleur",
      "efface le programme",
    ],
    expected: ["se déplace tout droit"],
    comparator: "mcq_exact",
    hint: "Avancer correspond à un déplacement.",
    explanation:
      "Définition : un déplacement permet au lutin de changer de position.\n\n" +
      "Méthode : on distingue les blocs qui déplacent et les blocs qui tournent.\n\n" +
      "Exécution : “avancer de 10” fait avancer le lutin tout droit.\n\n" +
      "Conclusion : le lutin se déplace tout droit.",
    tags: ["algo_programmation", "deplacement", "scratch", "qcm"],
    canvas: scratchCanvas("Déplacement Scratch", [
      { type: "event" },
      { type: "move", value: 10 },
    ]),
  },

  {
    kind: "fixed",
    id: "6e_algo_deplacement_fixed_2_tourner",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_deplacement",
    difficulty: 1,
    theme: "neutral",
    text: "Dans Scratch, le bloc “tourner de 90°” sert à...",
    format: "qcm",
    choices: [
      "changer de direction",
      "avancer de 90 pas",
      "répéter 90 fois",
      "écrire le nombre 90",
    ],
    expected: ["changer de direction"],
    comparator: "mcq_exact",
    hint: "90° est une mesure d’angle.",
    explanation:
      "Définition : tourner signifie changer de direction.\n\n" +
      "Méthode : on repère si le bloc contient un angle.\n\n" +
      "Exécution : tourner de 90° change l’orientation du lutin.\n\n" +
      "Conclusion : ce bloc sert à changer de direction.",
    tags: ["algo_programmation", "deplacement", "angle", "scratch", "qcm"],
    canvas: scratchCanvas("Tourner dans Scratch", [
      { type: "event" },
      { type: "turn", value: 90 },
    ]),
  },

  {
    kind: "template",
    id: "6e_algo_deplacement_tpl_1_distance_totale",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_deplacement",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne uniquement les blocs “avancer”.",
    tags: ["algo_programmation", "deplacement", "distance", "template", "canvas"],
    generate: () => {
      const p = pick(PRENOMS);
      const a = randomChoice(ACTEURS);
      let prog: Ins[];
      do prog = programmeSimple(a.u, randomInt(3, 6), false);
      while (prog.filter((i) => i.t === "av").length < 2);
      const avs = prog.filter((i): i is { t: "av"; n: number } => i.t === "av").map((i) => i.n);
      const total = avs.reduce((s, x) => s + x, 0);
      const il = ilA(a);

      return {
        text:
          `${intro(p, a)}\n${progTxt(prog, a.u)}\n` +
          randomChoice([
            `Quelle distance ${a.nom} parcourt-${il} en tout ?`,
            `Combien de ${UNITE_MOT[a.u]} ${a.nom} parcourt-${il} au total ?`,
            `Calcule la distance totale parcourue par ${a.nom}.`,
            `De combien ${a.nom} avance-t-${il} en tout ?`,
          ]),
        format: "short",
        expected: [uTxt(total, a.u)],
        comparator: "number_equal",
        explanation: ae(
          "la distance parcourue est la somme des blocs « avancer ».",
          "on additionne seulement les « avancer » : « tourner » change la direction, pas la distance.",
          `${avs.join(" + ")} = ${total}.`,
          `${a.nom} parcourt ${uTxt(total, a.u)} en tout.`,
        ),
        canvas: canvasDe(prog, a.u, "Déplacements", a),
      };
    },
  },

  {
    kind: "template",
    id: "6e_algo_deplacement_tpl_2_angle_total",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_deplacement",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne les angles des blocs “tourner”.",
    tags: ["algo_programmation", "deplacement", "angle", "template", "canvas"],
    generate: () => {
      const p = pick(PRENOMS);
      const a = randomChoice(ACTEURS);
      let prog: Ins[];
      do prog = programmeSimple(a.u, randomInt(3, 6), false);
      while (prog.filter((i) => i.t === "tg").length < 2);
      const angles = prog.filter((i): i is { t: "tg"; a: number } => i.t === "tg").map((i) => i.a);
      const total = angles.reduce((s, x) => s + x, 0);
      const il = ilA(a);

      return {
        text:
          `${intro(p, a)}\n${progTxt(prog, a.u)}\n` +
          randomChoice([
            `De combien de degrés ${a.nom} tourne-t-${il} en tout ?`,
            `Calcule l’angle total dont ${a.nom} a tourné.`,
            `Additionne les angles : de combien ${a.nom} a-t-${il} tourné au total ?`,
            `Quel est l’angle total des rotations ${duA(a)} ?`,
          ]),
        format: "short",
        expected: [`${total}°`],
        comparator: "number_equal",
        explanation: ae(
          "un bloc « tourner » change la direction ; son nombre est un angle en degrés.",
          "on additionne seulement les angles des blocs « tourner » : les « avancer » sont des distances.",
          `${angles.map((x) => `${x}°`).join(" + ")} = ${total}°.`,
          `${a.nom} tourne de ${total}° en tout.`,
        ),
        canvas: canvasDe(prog, a.u, "Rotations", a),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_algo_deplacement_fixed_3_piege_avancer_tourner",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_deplacement",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : “tourner de 90° fait avancer le lutin de 90 pas.” A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Tourner change la direction, avancer change la position.",
    explanation:
      "Définition : avancer et tourner sont deux actions différentes.\n\n" +
      "Méthode : on identifie si le bloc modifie la position ou l’orientation.\n\n" +
      "Exécution : tourner de 90° change seulement la direction du lutin.\n\n" +
      "Conclusion : l’élève a tort.",
    tags: ["algo_programmation", "deplacement", "erreur", "angle", "qcm"],
  },

  {
    kind: "template",
    id: "6e_algo_deplacement_tpl_3_completer_bloc",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_deplacement",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour parcourir une distance, on utilise un bloc avancer.",
    tags: ["algo_programmation", "deplacement", "completer", "template", "canvas"],
    generate: () => {
      const p = pick(PRENOMS);
      const a = randomChoice(ACTEURS);
      const surAngle = Math.random() < 0.35;
      const quoi = surAngle ? "tg" : "av";
      let prog: Ins[];
      do prog = programmeSimple(a.u, randomInt(3, 5), false);
      while (prog.filter((i) => i.t === quoi).length < 2);
      const places = prog.map((i, k) => (i.t === quoi ? k : -1)).filter((k) => k >= 0);
      const trou = randomChoice(places);
      const vals = prog.filter((i) => i.t === quoi).map((i) => (i.t === "av" ? i.n : i.t === "tg" ? i.a : 0));
      const total = vals.reduce((s, x) => s + x, 0);
      const cache = (prog[trou] as { n?: number; a?: number }).n ?? (prog[trou] as { a: number }).a;
      const connus = prog
        .filter((i, k) => i.t === quoi && k !== trou)
        .map((i) => (i.t === "av" ? i.n : i.t === "tg" ? i.a : 0));
      const lignes = prog.map((i, k) =>
        k !== trou ? `– ${ligne(i, a.u)}` : quoi === "av" ? `– avancer de … ${a.u}` : "– tourner de …°",
      );
      const blocs = canvasDe(prog, a.u, "Bloc à compléter", a);
      if (blocs) {
        const b = blocs.blocks[trou + 1];
        b.value = quoi === "av" && a.u !== "pas" ? `? ${a.u}` : "?";
      }
      const but = surAngle
        ? `${maj(a.nom)} doit tourner de ${total}° en tout.`
        : `${maj(a.nom)} doit parcourir ${uTxt(total, a.u)} en tout.`;
      const unite = surAngle ? "°" : ` ${a.u}`;

      return {
        text:
          `${intro(p, a)} ${but}\n${lignes.join("\n")}\n` +
          randomChoice([
            "Quel nombre faut-il écrire à la place de « … » ?",
            "Complète le bloc : quel nombre manque ?",
            "Quel nombre manque dans le programme ?",
          ]),
        format: "short",
        expected: [surAngle ? `${cache}°` : uTxt(cache, a.u)],
        comparator: "number_equal",
        explanation: ae(
          surAngle ? "les angles des blocs « tourner » s’additionnent." : "les distances des blocs « avancer » s’additionnent.",
          "on enlève du total ce que les autres blocs font déjà.",
          `${total} − ${connus.join(" − ")} = ${cache}.`,
          `il faut écrire ${cache}${unite}.`,
        ),
        canvas: blocs,
      };
    },
  },

  {
    kind: "template",
    id: "6e_algo_deplacement_tpl_4_orientation_simple",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_deplacement",
    difficulty: 1,
    theme: "neutral",
    hint: "Un quart de tour à droite : Nord → Est → Sud → Ouest.",
    tags: ["algo_programmation", "deplacement", "orientation", "template", "canvas"],
    generate: () => questionOrientation(randomInt(1, 2), randomInt(0, 1), "Tourner"),
  },

  {
    kind: "template",
    id: "6e_algo_deplacement_tpl_5_quel_bloc",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_deplacement",
    difficulty: 1,
    theme: "neutral",
    hint: "« avancer » change la place ; « tourner » change la direction.",
    tags: ["algo_programmation", "deplacement", "template", "canvas", "qcm"],
    generate: () => {
      const p = pick(PRENOMS);
      const a = randomChoice(ACTEURS);
      const direction = Math.random() < 0.5;
      const autres: Ins[] = [];
      const nb = randomInt(2, 3);
      while (autres.length < nb) {
        const i: Ins =
          Math.random() < 0.5
            ? { t: "dire", s: randomChoice(PAROLES) }
            : direction
              ? { t: "av", n: longueur(a.u) }
              : { t: "tg", a: randomChoice([45, 60, 90, 120, 180]) };
        if (!autres.some((x) => ligne(x, a.u) === ligne(i, a.u))) autres.push(i);
      }
      const cle: Ins = direction ? { t: "tg", a: randomChoice([45, 60, 90, 120, 180]) } : { t: "av", n: longueur(a.u) };
      const prog = shuffle([cle, ...autres]);
      const juste = ligne(cle, a.u);
      return {
        text:
          `${intro(p, a)}\n${progTxt(prog, a.u)}\n` +
          (direction
            ? randomChoice([
                `Quelle instruction change la direction ${duA(a)} ?`,
                `Quelle ligne fait tourner ${a.nom} ?`,
              ])
            : randomChoice([`Quelle instruction change la place ${duA(a)} ?`, `Quelle ligne fait avancer ${a.nom} ?`])),
        format: "qcm",
        choices: makeChoices(juste, prog.map((i) => ligne(i, a.u))),
        expected: [juste],
        comparator: "mcq_exact",
        explanation: ae(
          "« avancer » déplace : la place change. « tourner » fait pivoter : la direction change. « dire » affiche une bulle.",
          direction ? "on cherche la ligne avec un angle en degrés." : "on cherche la ligne avec une distance.",
          `c’est la ligne ${cite(juste)}.`,
          `la réponse est ${cite(juste)}.`,
        ),
        canvas: canvasDe(prog, a.u, "Programme", a),
      };
    },
  },

  {
    kind: "template",
    id: "6e_algo_deplacement_tpl_6_orientation_finale",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_deplacement",
    difficulty: 3,
    theme: "neutral",
    hint: "Suis les blocs « tourner » un par un ; « avancer » ne change pas la direction.",
    tags: ["algo_programmation", "deplacement", "orientation", "template", "canvas"],
    generate: () => questionOrientation(randomInt(3, 4), randomInt(1, 3), "Où regarde-t-il ?"),
  },

  {
    kind: "template",
    id: "6e_algo_deplacement_tpl_7_distance_au_depart",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_deplacement",
    difficulty: 4,
    theme: "neutral",
    hint: "Distance parcourue et distance au point de départ, ce n’est pas pareil.",
    tags: ["algo_programmation", "deplacement", "distance", "template", "canvas"],
    generate: () => {
      const p = pick(PRENOMS);
      const a = randomChoice(ACTEURS);
      const il = ilA(a);
      const genre = randomChoice(["depart", "depart", "parcourue", "retour"] as const);
      let prog: Ins[];
      if (genre === "retour") {
        // Un rectangle (retour au départ) ou un rectangle dont un côté est faux.
        const L1 = longueur(a.u);
        let L2 = longueur(a.u);
        while (L2 === L1) L2 = longueur(a.u);
        const ferme = Math.random() < 0.5;
        let L3 = L1;
        if (!ferme) while (L3 === L1) L3 = longueur(a.u);
        prog = [
          { t: "av", n: L1 },
          { t: "tg", a: 90 },
          { t: "av", n: L2 },
          { t: "tg", a: 90 },
          { t: "av", n: L3 },
          { t: "tg", a: 90 },
          { t: "av", n: L2 },
        ];
        const juste = ferme ? "oui" : "non";
        return {
          text:
            `${intro(p, a)}\n${progTxt(prog, a.u)}\n` +
            randomChoice([
              `À la fin, ${a.nom} revient-${il} exactement à son point de départ ?`,
              `${maj(a.nom)} finit-${il} au même endroit qu’au départ ?`,
            ]),
          format: "qcm",
          choices: ["oui", "non"],
          expected: [juste],
          comparator: "mcq_exact",
          explanation: ae(
            "pour revenir au départ en faisant un rectangle, les côtés opposés doivent avoir la même longueur.",
            "on compare les deux allers et les deux retours.",
            ferme
              ? `${uTxt(L1, a.u)} à l’aller et ${uTxt(L3, a.u)} au retour : c’est pareil, et ${uTxt(L2, a.u)} deux fois.`
              : `${uTxt(L1, a.u)} à l’aller mais ${uTxt(L3, a.u)} au retour : ce n’est pas pareil.`,
            ferme ? `oui, ${a.nom} revient à son point de départ.` : `non, ${a.nom} ne revient pas à son point de départ.`,
          ),
          canvas: canvasDe(prog, a.u, "Retour au départ ?", a),
        };
      }
      // En ligne droite, avec des demi-tours.
      for (;;) {
        const n1 = longueur(a.u);
        const n2 = longueur(a.u);
        const trois = Math.random() < 0.4;
        prog = [{ t: "av", n: n1 }, { t: "tg", a: 180 }, { t: "av", n: n2 }];
        if (trois) prog.push({ t: "tg", a: 180 }, { t: "av", n: longueur(a.u) });
        // Pas de nombre négatif en 6e : le retour est plus court que l'aller.
        const e = executer(prog);
        if (n2 < n1 && e.y > 0.5) break;
      }
      const e = executer(prog);
      const loin = Math.round(Math.abs(e.y));
      const demande = genre === "depart" ? loin : e.dist;
      const avs = prog.filter((i): i is { t: "av"; n: number } => i.t === "av").map((i) => i.n);
      return {
        text:
          `${intro(p, a)} « tourner de 180° », c’est faire demi-tour.\n${progTxt(prog, a.u)}\n` +
          (genre === "depart"
            ? randomChoice([
                `À la fin, à quelle distance de son point de départ ${a.nom} se trouve-t-${il} ?`,
                `À la fin, à combien de ${UNITE_MOT[a.u]} du départ est ${a.nom} ?`,
              ])
            : randomChoice([
                `Quelle distance ${a.nom} a-t-${il} parcourue en tout ?`,
                `Combien de ${UNITE_MOT[a.u]} ${a.nom} a-t-${il} ${a.u === "cases" ? "parcourues" : "parcourus"} en tout ?`,
              ])),
        format: "short",
        expected: [uTxt(demande, a.u)],
        comparator: "number_equal",
        explanation: ae(
          "la distance parcourue additionne tous les « avancer » ; la distance au départ tient compte des demi-tours, qui font revenir en arrière.",
          genre === "depart" ? "on avance, puis on retire ce qui est fait après un demi-tour." : "on additionne tous les « avancer », même après un demi-tour.",
          genre === "depart"
            ? `${avs.map((x, k) => (k === 0 ? `${x}` : k % 2 === 1 ? `− ${x}` : `+ ${x}`)).join(" ")} = ${loin}.`
            : `${avs.join(" + ")} = ${e.dist}.`,
          genre === "depart"
            ? `${a.nom} est à ${uTxt(loin, a.u)} de son point de départ.`
            : `${a.nom} a parcouru ${uTxt(e.dist, a.u)}.`,
        ),
        canvas: canvasDe(prog, a.u, "Aller et retour", a),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_algo_deplacement_open_1_expliquer_difference",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_deplacement",
    difficulty: 4,
    theme: "neutral",
    text: "Dans un programme Scratch, quelle est la différence entre « avancer » et « tourner » ?",
    format: "qcm",
    choices: [
      "« avancer » change la place, « tourner » change la direction",
      "« avancer » change la direction, « tourner » change la place",
      "les deux blocs font la même chose",
      "« tourner » fait avancer d’autant de pas que l’angle",
    ],
    expected: ["« avancer » change la place, « tourner » change la direction"],
    comparator: "mcq_exact",
    hint: "L’un change la position, l’autre change la direction.",
    explanation:
      "Définition : avancer modifie la position du lutin, tourner modifie son orientation.\n\n" +
      "Méthode : on regarde si le bloc parle d’une distance ou d’un angle.\n\n" +
      "Exécution : avancer fait bouger le lutin ; tourner le fait changer de direction.\n\n" +
      "Conclusion : ce sont deux instructions différentes.",
    tags: ["algo_programmation", "deplacement", "open", "raisonnement"],
  },
    /* =========================
     ALGO_REPETITION
  ========================= */

  {
    kind: "fixed",
    id: "6e_algo_repetition_fixed_1_definition",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_repetition",
    difficulty: 1,
    theme: "neutral",
    text: "Dans Scratch, le bloc “répéter 4 fois” sert à...",
    format: "qcm",
    choices: [
      "exécuter plusieurs fois les mêmes instructions",
      "effacer les instructions",
      "changer la couleur du lutin",
      "arrêter le programme",
    ],
    expected: ["exécuter plusieurs fois les mêmes instructions"],
    comparator: "mcq_exact",
    hint: "Répéter signifie refaire.",
    explanation:
      "Définition : une répétition permet d’exécuter plusieurs fois les mêmes instructions.\n\n" +
      "Méthode : on repère les blocs placés à l’intérieur de la répétition.\n\n" +
      "Exécution : si un bloc est dans “répéter 4 fois”, il est exécuté 4 fois.\n\n" +
      "Conclusion : ce bloc sert à répéter des instructions.",
    tags: ["algo_programmation", "repetition", "scratch", "qcm"],
    canvas: scratchCanvas("Boucle Scratch", [
      { type: "event" },
      {
        type: "repeat",
        times: 4,
        children: [{ type: "move", value: 10 }],
      },
    ]),
  },

  {
    kind: "template",
    id: "6e_algo_repetition_tpl_1_distance",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_repetition",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplie le nombre de répétitions par la distance avancée.",
    tags: ["algo_programmation", "repetition", "distance", "template", "canvas"],
    generate: () => {
      const p = pick(PRENOMS);
      const a = randomChoice(ACTEURS);
      const k = randomInt(2, 8);
      const d = longueur(a.u);
      const corps: Ins[] = [{ t: "av", n: d }];
      if (Math.random() < 0.5) corps.push({ t: "tg", a: randomChoice([45, 60, 90, 120]) });
      if (Math.random() < 0.3) corps.unshift({ t: "dire", s: randomChoice(PAROLES) });
      const prog: Ins[] = [{ t: "rep", k, corps }];
      const total = k * d;
      const il = ilA(a);
      return {
        text:
          `${intro(p, a)}\n${progTxt(prog, a.u)}\n` +
          randomChoice([
            `Quelle distance ${a.nom} parcourt-${il} en tout ?`,
            `Combien de ${UNITE_MOT[a.u]} ${a.nom} parcourt-${il} au total ?`,
            `Calcule la distance totale parcourue par ${a.nom}.`,
          ]),
        format: "short",
        expected: [uTxt(total, a.u)],
        comparator: "number_equal",
        explanation: ae(
          "une boucle « répéter » refait les instructions qu’elle contient.",
          "on multiplie la distance d’un tour de boucle par le nombre de répétitions.",
          `${k} × ${d} = ${total}.`,
          `${a.nom} parcourt ${uTxt(total, a.u)} en tout.`,
        ),
        canvas: canvasDe(prog, a.u, "Boucle", a),
      };
    },
  },

  {
    kind: "template",
    id: "6e_algo_repetition_tpl_2_nombre_actions",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_repetition",
    difficulty: 2,
    theme: "neutral",
    hint: "Chaque instruction dans la boucle est répétée le même nombre de fois.",
    tags: ["algo_programmation", "repetition", "actions", "template", "canvas"],
    generate: () => {
      const p = pick(PRENOMS);
      const a = randomChoice(ACTEURS);
      const k = randomInt(2, 6);
      const corps: Ins[] = shuffle([
        { t: "av", n: longueur(a.u) } as Ins,
        { t: "tg", a: randomChoice([45, 60, 90, 120]) } as Ins,
        ...(Math.random() < 0.5 ? [{ t: "dire", s: randomChoice(PAROLES) } as Ins] : []),
      ]);
      const prog: Ins[] = [{ t: "rep", k, corps }];
      const il = ilA(a);
      const genre = randomChoice(["tout", "tout", "tourne", "avance"] as const);
      const [question, parTour] =
        genre === "tout"
          ? [
              randomChoice([
                "Combien d’instructions sont exécutées en tout ?",
                "En tout, combien d’instructions le programme exécute-t-il ?",
              ]),
              corps.length,
            ]
          : genre === "tourne"
            ? [`Combien de fois ${a.nom} tourne-t-${il} ?`, 1]
            : [`Combien de fois ${a.nom} avance-t-${il} ?`, 1];
      const total = k * parTour;
      return {
        text: `${intro(p, a)}\n${progTxt(prog, a.u)}\n${question}`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: ae(
          "dans une boucle, toutes les instructions de la boucle sont refaites à chaque tour.",
          "on compte ce qu’il y a dans un tour, puis on multiplie par le nombre de tours.",
          `${parTour} par tour, ${k} tours : ${k} × ${parTour} = ${total}.`,
          `la réponse est ${total}.`,
        ),
        canvas: canvasDe(prog, a.u, "Compter les instructions", a),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_algo_repetition_fixed_2_piege_une_fois",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_repetition",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : “Dans répéter 5 fois, le bloc avancer n’est exécuté qu’une seule fois.” A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le bloc est dans une répétition.",
    explanation:
      "Définition : une boucle répète les instructions qu’elle contient.\n\n" +
      "Méthode : on regarde le nombre écrit dans le bloc “répéter”.\n\n" +
      "Exécution : dans “répéter 5 fois”, le bloc placé dedans est exécuté 5 fois.\n\n" +
      "Conclusion : l’élève a tort.",
    tags: ["algo_programmation", "repetition", "erreur", "qcm"],
    canvas: scratchCanvas("Piège de boucle", [
      { type: "event" },
      {
        type: "repeat",
        times: 5,
        children: [{ type: "move", value: 10 }],
      },
    ]),
  },

{
  kind: "template",
  id: "6e_algo_repetition_tpl_3_completer_repetition",
  niveau: "6e",
  matiere: "maths",
  notionId: "algo_programmation",
  microId: "algo_repetition",
  difficulty: 3,
  theme: "neutral",
  hint: "Cherche combien de fois il faut répéter le même déplacement.",
  tags: [
    "algo_programmation",
    "repetition",
    "completer",
    "template",
    "canvas",
  ],
  generate: () => {
    const p = pick(PRENOMS);
    const a = randomChoice(ACTEURS);
    const k = randomInt(2, 9);
    const surAngle = Math.random() < 0.35;
    const corps: Ins[] = surAngle
      ? [{ t: "av", n: longueur(a.u) }, { t: "tg", a: randomChoice([30, 40, 45, 60, 72, 90]) }]
      : Math.random() < 0.5
        ? [{ t: "av", n: longueur(a.u) }]
        : [{ t: "av", n: longueur(a.u) }, { t: "tg", a: 90 }];
    const parTour = surAngle ? (corps[1] as { a: number }).a : (corps[0] as { n: number }).n;
    const total = k * parTour;
    const prog: Ins[] = [{ t: "rep", k, corps }];
    const lignes = `– répéter … fois : ${corps.map((c) => ligne(c, a.u)).join(" puis ")}`;
    const blocs = canvasDe(prog, a.u, "Boucle à compléter", a);
    // Le nombre de tours est la réponse : le bloc l'affiche « ? ».
    if (blocs) (blocs.blocks[1] as { times?: unknown }).times = "?";
    const but = surAngle
      ? `${maj(a.nom)} doit tourner de ${total}° en tout.`
      : `${maj(a.nom)} doit parcourir ${uTxt(total, a.u)} en tout.`;
    return {
      text:
        `${intro(p, a)} ${but}\n${lignes}\n` +
        randomChoice([
          "Combien de fois faut-il répéter ?",
          "Quel nombre faut-il écrire à la place de « … » ?",
          "Complète la boucle : combien de tours faut-il ?",
        ]),
      format: "short",
      expected: [String(k)],
      comparator: "number_equal",
      explanation: ae(
        "une boucle refait le même déplacement à chaque tour.",
        surAngle
          ? "on divise l’angle total par l’angle d’un tour de boucle."
          : "on divise la distance totale par la distance d’un tour de boucle.",
        `${total} ÷ ${parTour} = ${k}.`,
        `il faut répéter ${k} fois.`,
      ),
      canvas: blocs,
    };
  },
},

  {
    kind: "template",
    id: "6e_algo_repetition_tpl_4_angle_total",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_repetition",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie le nombre de répétitions par l’angle tourné à chaque fois.",
    tags: ["algo_programmation", "repetition", "angle", "template", "canvas"],
    generate: () => {
      const p = pick(PRENOMS);
      const a = randomChoice(ACTEURS);
      const k = randomInt(2, 8);
      const angle = randomChoice([15, 20, 30, 36, 40, 45, 60, 72, 90, 120]);
      const corps: Ins[] = Math.random() < 0.5
        ? [{ t: "av", n: longueur(a.u) }, { t: "tg", a: angle }]
        : [{ t: "tg", a: angle }, { t: "av", n: longueur(a.u) }];
      const prog: Ins[] = [{ t: "rep", k, corps }];
      const total = k * angle;
      const il = ilA(a);
      return {
        text:
          `${intro(p, a)}\n${progTxt(prog, a.u)}\n` +
          randomChoice([
            `De combien de degrés ${a.nom} tourne-t-${il} en tout ?`,
            `Calcule l’angle total dont ${a.nom} a tourné.`,
            `Quel est l’angle total des rotations ${duA(a)} ?`,
          ]),
        format: "short",
        expected: [`${total}°`],
        comparator: "number_equal",
        explanation: ae(
          "une boucle refait toutes les instructions qu’elle contient.",
          "on multiplie l’angle d’un tour de boucle par le nombre de tours. Les distances ne comptent pas.",
          `${k} × ${angle}° = ${total}°.`,
          `${a.nom} tourne de ${total}° en tout.`,
        ),
        canvas: canvasDe(prog, a.u, "Boucle et rotation", a),
      };
    },
  },

  {
    kind: "template",
    id: "6e_algo_repetition_tpl_5_combien_de_fois",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_repetition",
    difficulty: 1,
    theme: "neutral",
    hint: "Le nombre écrit dans « répéter … fois » dit combien de fois on refait l’action.",
    tags: ["algo_programmation", "repetition", "template"],
    generate: () => {
      const p = pick(PRENOMS);
      const s = randomChoice(REPETES);
      const k = randomInt(2, 10);
      const sansBoucle = Math.random() < 0.25;
      return {
        text:
          `${s.ouverture(p)}\n– répéter ${k} fois : ${s.act}\n` +
          (sansBoucle ? `Sans boucle, combien de lignes « ${s.act} » faudrait-il écrire ?` : s.question),
        format: "short",
        expected: [String(k)],
        comparator: "number_equal",
        explanation: ae(
          "« répéter … fois » refait l’action le nombre de fois indiqué.",
          "on lit le nombre écrit dans la boucle.",
          `la boucle refait « ${s.act} » ${k} fois.`,
          `la réponse est ${k}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "6e_algo_repetition_tpl_6_avant_pendant_apres",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_repetition",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte ce qui est avant la boucle, ce qui est dedans (× le nombre de tours) et ce qui est après.",
    tags: ["algo_programmation", "repetition", "template", "canvas"],
    generate: () => {
      const p = pick(PRENOMS);
      const a = randomChoice(ACTEURS);
      const k = randomInt(2, 6);
      const d1 = longueur(a.u);
      const d2 = longueur(a.u);
      const d3 = longueur(a.u);
      const ang = randomChoice([30, 45, 60, 90, 120]);
      const apres = Math.random() < 0.6;
      const prog: Ins[] = [
        { t: "av", n: d1 },
        { t: "rep", k, corps: [{ t: "av", n: d2 }, { t: "tg", a: ang }] },
        ...(apres ? [{ t: "av", n: d3 } as Ins] : []),
      ];
      const il = ilA(a);
      const genre = randomChoice(["distance", "distance", "angle", "avance"] as const);
      let question: string;
      let rep: string;
      let calc: string;
      if (genre === "distance") {
        const total = d1 + k * d2 + (apres ? d3 : 0);
        question = randomChoice([
          `Quelle distance ${a.nom} parcourt-${il} en tout ?`,
          `Calcule la distance totale parcourue par ${a.nom}.`,
        ]);
        rep = uTxt(total, a.u);
        calc = `${d1} + ${k} × ${d2}${apres ? ` + ${d3}` : ""} = ${total}`;
      } else if (genre === "angle") {
        question = `De combien de degrés ${a.nom} tourne-t-${il} en tout ?`;
        rep = `${k * ang}°`;
        calc = `seul « tourner » compte : ${k} × ${ang}° = ${k * ang}°`;
      } else {
        const n = 1 + k + (apres ? 1 : 0);
        question = randomChoice([
          `Combien de fois ${a.nom} avance-t-${il} ?`,
          "Combien de fois une instruction « avancer » est-elle exécutée ?",
        ]);
        rep = String(n);
        calc = `1 avant la boucle + ${k} dans la boucle${apres ? " + 1 après" : ""} = ${n}`;
      }
      return {
        text: `${intro(p, a)}\n${progTxt(prog, a.u)}\n${question}`,
        format: "short",
        expected: [rep],
        comparator: "number_equal",
        explanation: ae(
          "une boucle refait ses instructions à chaque tour ; ce qui est avant ou après n’est fait qu’une fois.",
          "on lit le programme de haut en bas : avant la boucle, la boucle (× le nombre de tours), après la boucle.",
          `${calc}.`,
          `la réponse est ${rep}.`,
        ),
        canvas: canvasDe(prog, a.u, "Avant, pendant, après", a),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_algo_repetition_open_1_expliquer",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_repetition",
    difficulty: 4,
    theme: "neutral",
    text: "À quoi sert une boucle « répéter » dans un programme Scratch ?",
    format: "qcm",
    choices: [
      "à refaire plusieurs fois les mêmes instructions sans les réécrire",
      "à faire les instructions une seule fois, mais plus vite",
      "à effacer les instructions déjà faites",
      "à choisir une instruction au hasard",
    ],
    expected: ["à refaire plusieurs fois les mêmes instructions sans les réécrire"],
    comparator: "mcq_exact",
    hint: "Une boucle évite de réécrire plusieurs fois les mêmes blocs.",
    explanation:
      "Définition : une boucle “répéter” sert à exécuter plusieurs fois les mêmes instructions.\n\n" +
      "Méthode : on place à l’intérieur de la boucle les blocs à refaire.\n\n" +
      "Exécution : le programme répète ces blocs le nombre de fois indiqué.\n\n" +
      "Conclusion : une boucle rend le programme plus court et plus clair.",
    tags: ["algo_programmation", "repetition", "open", "raisonnement"],
  },
    /* =========================
     ALGO_LIRE_PROGRAMME
  ========================= */

  {
    kind: "fixed",
    id: "6e_algo_lire_programme_fixed_1_ordre_execution",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_lire_programme",
    difficulty: 2,
    theme: "neutral",
    text: "Dans ce programme, que fait le lutin juste après avoir avancé de 20 pas ?",
    format: "qcm",
    choices: ["il tourne de 90°", "il dit bonjour", "il répète 4 fois", "il s’arrête"],
    expected: ["il tourne de 90°"],
    comparator: "mcq_exact",
    hint: "Lis les blocs de haut en bas.",
    explanation:
      "Définition : lire un programme, c’est prévoir les actions dans l’ordre.\n\n" +
      "Méthode : on suit les blocs de haut en bas.\n\n" +
      "Exécution : après “avancer de 20”, le bloc suivant est “tourner de 90°”.\n\n" +
      "Conclusion : le lutin tourne de 90°.",
    tags: ["algo_programmation", "lire_programme", "scratch", "canvas", "qcm"],
    canvas: scratchCanvas("Lire un programme", [
      { type: "event" },
      { type: "move", value: 20 },
      { type: "turn", value: 90 },
      { type: "say", text: "Bonjour" },
    ]),
  },

  {
    kind: "template",
    id: "6e_algo_lire_programme_tpl_1_distance_totale",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_lire_programme",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne les blocs avancer, en tenant compte de la boucle.",
    tags: ["algo_programmation", "lire_programme", "distance", "boucle", "template", "canvas"],
    generate: () => {
      const p = pick(PRENOMS);
      const a = randomChoice(ACTEURS);
      const debut = longueur(a.u);
      const k = randomInt(2, 5);
      const pas = longueur(a.u);
      const corps: Ins[] = Math.random() < 0.5 ? [{ t: "av", n: pas }] : [{ t: "av", n: pas }, { t: "tg", a: 90 }];
      const enTete = Math.random() < 0.5;
      const prog: Ins[] = enTete
        ? [{ t: "av", n: debut }, { t: "rep", k, corps }]
        : [{ t: "rep", k, corps }, { t: "tg", a: randomChoice([90, 180]) }, { t: "av", n: debut }];
      const total = debut + k * pas;
      const il = ilA(a);
      return {
        text:
          `${intro(p, a)}\n${progTxt(prog, a.u)}\n` +
          randomChoice([
            `Quelle distance ${a.nom} parcourt-${il} en tout ?`,
            `Lis le programme : combien de ${UNITE_MOT[a.u]} ${a.nom} parcourt-${il} au total ?`,
            `Prévois la distance totale parcourue par ${a.nom}.`,
          ]),
        format: "short",
        expected: [uTxt(total, a.u)],
        comparator: "number_equal",
        explanation: ae(
          "lire un programme, c’est prévoir ce qu’il fait, ligne par ligne.",
          "on additionne les « avancer » ; ceux de la boucle comptent autant de fois qu’il y a de tours.",
          enTete ? `${debut} + ${k} × ${pas} = ${total}.` : `${k} × ${pas} + ${debut} = ${total}.`,
          `${a.nom} parcourt ${uTxt(total, a.u)} en tout.`,
        ),
        canvas: canvasDe(prog, a.u, "Lire le programme", a),
      };
    },
  },

  {
    kind: "template",
    id: "6e_algo_lire_programme_tpl_2_nombre_blocs_executés",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_lire_programme",
    difficulty: 3,
    theme: "neutral",
    hint: "Les blocs dans la boucle comptent plusieurs fois.",
    tags: ["algo_programmation", "lire_programme", "repetition", "template", "canvas"],
    generate: () => {
      const p = pick(PRENOMS);
      const a = randomChoice(ACTEURS);
      const k = randomInt(2, 6);
      const corps: Ins[] = shuffle([
        { t: "av", n: longueur(a.u) } as Ins,
        { t: "tg", a: randomChoice([45, 60, 90, 120]) } as Ins,
        ...(Math.random() < 0.4 ? [{ t: "dire", s: randomChoice(PAROLES) } as Ins] : []),
      ]);
      const avant = randomInt(0, 2);
      const prog: Ins[] = [];
      if (avant >= 1) prog.push({ t: "dire", s: randomChoice(["C’est parti !", "J’arrive !", "Me voilà !"]) });
      if (avant >= 2) prog.push({ t: "av", n: longueur(a.u) });
      prog.push({ t: "rep", k, corps });
      prog.push({ t: "dire", s: randomChoice(["Fini !", "Bravo !", "Super !"]) });
      const total = avant + k * corps.length + 1;
      return {
        text:
          `${intro(p, a)}\n${progTxt(prog, a.u)}\n` +
          randomChoice([
            "Combien d’instructions sont exécutées en tout ?",
            "En tout, combien d’instructions le programme exécute-t-il ?",
            "Compte les instructions exécutées, boucle comprise. Combien y en a-t-il ?",
          ]),
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: ae(
          "une instruction de la boucle est exécutée à chaque tour.",
          "on compte : avant la boucle, dans la boucle (× le nombre de tours), après la boucle.",
          `${avant} + ${k} × ${corps.length} + 1 = ${total}.`,
          `${total} instructions sont exécutées.`,
        ),
        canvas: canvasDe(prog, a.u, "Compter les instructions", a),
      };
    },
  },

  {
    kind: "template",
    id: "6e_algo_lire_programme_tpl_3_qcm_resultat",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_lire_programme",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule d’abord la distance dans la boucle.",
    tags: ["algo_programmation", "lire_programme", "qcm", "template", "canvas"],
    generate: () => {
      const p = pick(PRENOMS);
      if (Math.random() < 0.5) {
        // Un programme de calcul : les pièges sont « une ligne oubliée » et « dans le désordre ».
        let prog: Ins[];
        let v = 0;
        let pieges: string[] = [];
        for (;;) {
          prog = programmeCalcul(randomInt(2, 3), ["+", "-", "×"]);
          v = executer(prog).valeur;
          const sansDerniere = executer(prog.slice(0, -1)).valeur;
          const sansDeuxieme = executer([prog[0], ...prog.slice(2)]).valeur;
          const desordre = executer([prog[0], ...prog.slice(1).reverse()]).valeur;
          pieges = [sansDerniere, sansDeuxieme, desordre, v + 1, v + 10].filter((x) => x >= 0 && x !== v).map(String);
          if (new Set(pieges).size >= 3) break;
        }
        return {
          text:
            `${introCalcul(p)}\n${progTxt(prog)}\n` +
            randomChoice(["Quel nombre obtient-on à la fin ?", "Quel est le résultat du programme ?", "Choisis le résultat du programme."]),
          format: "qcm",
          choices: makeChoices(String(v), pieges),
          expected: [String(v)],
          comparator: "mcq_exact",
          explanation: ae(
            "un programme de calcul se fait ligne par ligne, dans l’ordre.",
            "on part du nombre choisi et on fait chaque calcul sur le résultat précédent.",
            `${derouleCalcul(prog)}.`,
            `on obtient ${v}.`,
          ),
        };
      }
      const a = randomChoice(ACTEURS);
      const k = randomInt(2, 5);
      const d1 = longueur(a.u);
      const d2 = longueur(a.u);
      const prog: Ins[] = [{ t: "av", n: d1 }, { t: "rep", k, corps: [{ t: "av", n: d2 }, { t: "tg", a: 90 }] }];
      const total = d1 + k * d2;
      const il = ilA(a);
      return {
        text:
          `${intro(p, a)}\n${progTxt(prog, a.u)}\n` +
          randomChoice([
            `Quelle distance ${a.nom} parcourt-${il} en tout ?`,
            `Choisis la distance totale parcourue par ${a.nom}.`,
          ]),
        format: "qcm",
        choices: makeChoices(uTxt(total, a.u), [
          uTxt(d1 + d2, a.u),
          uTxt(k * d2, a.u),
          uTxt((d1 + d2) * k, a.u),
          uTxt(total + d2, a.u),
        ]),
        expected: [uTxt(total, a.u)],
        comparator: "mcq_exact",
        explanation: ae(
          "lire un programme, c’est prévoir ce qu’il fait.",
          "le premier « avancer » est fait une fois ; celui de la boucle est fait à chaque tour.",
          `${d1} + ${k} × ${d2} = ${total}.`,
          `${a.nom} parcourt ${uTxt(total, a.u)}.`,
        ),
        canvas: canvasDe(prog, a.u, "Prévoir le résultat", a),
      };
    },
  },

  {
    kind: "template",
    id: "6e_algo_lire_programme_tpl_4_calcul_une_etape",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_lire_programme",
    difficulty: 1,
    theme: "neutral",
    hint: "Pars du nombre choisi, puis fais le calcul de la ligne suivante.",
    tags: ["algo_programmation", "lire_programme", "programme_calcul", "template"],
    generate: () => {
      const p = pick(PRENOMS);
      const prog = programmeCalcul(1);
      const v = executer(prog).valeur;
      return {
        text:
          `${introCalcul(p)}\n${progTxt(prog)}\n` +
          randomChoice([
            "Quel nombre obtient-on à la fin ?",
            "Quel est le résultat du programme ?",
            "Calcule le résultat.",
            `Quel nombre ${p.nom} trouve-t-${p.f ? "elle" : "il"} ?`,
          ]),
        format: "short",
        expected: [String(v)],
        comparator: "number_equal",
        explanation: ae(
          "un programme de calcul se fait ligne par ligne.",
          "on part du nombre choisi, puis on fait le calcul demandé.",
          `${derouleCalcul(prog)}.`,
          `on obtient ${v}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "6e_algo_lire_programme_tpl_5_calcul_plusieurs_etapes",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_lire_programme",
    difficulty: 2,
    theme: "neutral",
    hint: "Fais les calculs un par un, dans l’ordre des lignes.",
    tags: ["algo_programmation", "lire_programme", "programme_calcul", "template"],
    generate: () => {
      const p = pick(PRENOMS);
      const prog = programmeCalcul(randomInt(2, 3));
      const v = executer(prog).valeur;
      return {
        text:
          `${introCalcul(p)}\n${progTxt(prog)}\n` +
          randomChoice([
            "Quel nombre obtient-on à la fin ?",
            "Quel est le résultat du programme ?",
            "Calcule le résultat, ligne par ligne.",
            `Quel nombre ${p.nom} trouve-t-${p.f ? "elle" : "il"} à la fin ?`,
          ]),
        format: "short",
        expected: [String(v)],
        comparator: "number_equal",
        explanation: ae(
          "un programme de calcul se fait ligne par ligne, dans l’ordre.",
          "chaque calcul se fait sur le résultat de la ligne d’avant.",
          `${derouleCalcul(prog)}.`,
          `on obtient ${v}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "6e_algo_lire_programme_tpl_6_variable_et_boucle",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_lire_programme",
    difficulty: 4,
    theme: "neutral",
    hint: "Suis la valeur de la variable tour après tour.",
    tags: ["algo_programmation", "lire_programme", "variable", "boucle", "template"],
    generate: () => {
      const p = pick(PRENOMS);
      if (Math.random() < 0.35) {
        // À l'envers : quel nombre choisir au départ ?
        let prog: Ins[];
        do prog = programmeCalcul(2, ["+", "-", "×"]);
        while (prog.slice(1).every((i) => i.t === "calc" && i.op !== "×") || executer(prog).valeur <= 0);
        const depart = (prog[0] as { n: number }).n;
        const v = executer(prog).valeur;
        const lignes = [`– choisir un nombre`, ...progTxt(prog.slice(1)).split("\n")];
        return {
          text:
            `${introCalcul(p)}\n${lignes.join("\n")}\n` +
            randomChoice([
              `On obtient ${v}. Quel nombre a-t-on choisi au départ ?`,
              `${p.nom} obtient ${v} à la fin. Quel nombre a-t-${p.f ? "elle" : "il"} choisi ?`,
            ]),
          format: "short",
          expected: [String(depart)],
          comparator: "number_equal",
          explanation: ae(
            "pour remonter un programme, on part de la fin et on fait l’opération contraire.",
            "le contraire de « ajouter » est « soustraire », le contraire de « multiplier » est « diviser ».",
            `on vérifie dans le bon sens : ${derouleCalcul(prog)}.`,
            `on a choisi ${depart}.`,
          ),
        };
      }
      const nom = randomChoice(["score", "points", "pièces", "étoiles", "bonus"]);
      const ctx = randomChoice([
        `${p.nom} programme un jeu vidéo.`,
        `${p.nom} programme le tableau des scores de la kermesse.`,
        `Pour un quiz en classe, ${p.nom} programme un compteur.`,
        `${p.nom} crée un jeu de course dans Scratch.`,
        `${p.nom} programme un jeu de fléchettes électronique.`,
      ]);
      const s0 = randomChoice([0, 0, 5, 10, 20]);
      const k = randomInt(2, 6);
      const n = randomInt(2, 15);
      const fin = Math.random() < 0.5 ? randomInt(1, 20) : 0;
      const prog: Ins[] = [
        { t: "var", nom, op: "=", n: s0 },
        { t: "rep", k, corps: [{ t: "var", nom, op: "+", n }] },
        ...(fin ? [{ t: "var", nom, op: "+", n: fin } as Ins] : []),
      ];
      const v = s0 + k * n + fin;
      return {
        text:
          `${ctx}\n${progTxt(prog)}\n` +
          randomChoice([`Que vaut « ${nom} » à la fin ?`, `À la fin du programme, combien vaut « ${nom} » ?`]),
        format: "short",
        expected: [String(v)],
        comparator: "number_equal",
        explanation: ae(
          "une variable garde un nombre ; « ajouter … à » l’augmente.",
          "on part de la valeur de départ, on ajoute à chaque tour de boucle, puis ce qui vient après.",
          `${s0} + ${k} × ${n}${fin ? ` + ${fin}` : ""} = ${v}.`,
          `« ${nom} » vaut ${v} à la fin.`,
        ),
        canvas: canvasDe(prog, "pas", "Variable et boucle"),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_algo_lire_programme_fixed_2_piege_boucle",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_lire_programme",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève répond que ce programme fait avancer le lutin de 10 pas au total. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le bloc avancer est dans une boucle.",
    explanation:
      "Définition : une boucle répète les instructions placées à l’intérieur.\n\n" +
      "Méthode : on multiplie la distance par le nombre de répétitions.\n\n" +
      "Exécution : avancer de 10 est répété 4 fois, donc 4 × 10 = 40.\n\n" +
      "Conclusion : l’élève a tort, le lutin avance de 40 pas.",
    tags: ["algo_programmation", "lire_programme", "erreur", "boucle", "qcm"],
    canvas: scratchCanvas("Attention à la boucle", [
      { type: "event" },
      {
        type: "repeat",
        times: 4,
        children: [{ type: "move", value: 10 }],
      },
    ]),
  },

  {
    kind: "fixed",
    id: "6e_algo_lire_programme_open_1_methode",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_lire_programme",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la bonne méthode pour lire un programme Scratch avec une boucle ?",
    format: "qcm",
    choices: [
      "lire de haut en bas, et refaire les blocs de la boucle à chaque tour",
      "lire de bas en haut",
      "lire les blocs de la boucle une seule fois",
      "lire seulement le premier et le dernier bloc",
    ],
    expected: ["lire de haut en bas, et refaire les blocs de la boucle à chaque tour"],
    comparator: "mcq_exact",
    hint: "Lis de haut en bas et développe mentalement la répétition.",
    explanation:
      "Définition : lire un programme consiste à prévoir les actions exécutées.\n\n" +
      "Méthode : on lit les blocs de haut en bas, puis on répète mentalement les blocs dans la boucle.\n\n" +
      "Exécution : si une boucle répète 4 fois deux blocs, ces deux blocs sont exécutés 4 fois chacun.\n\n" +
      "Conclusion : il faut tenir compte de l’ordre et des répétitions.",
    tags: ["algo_programmation", "lire_programme", "open", "methode"],
  },
    /* =========================
     ALGO_FIGURES
  ========================= */

  {
    kind: "fixed",
    id: "6e_algo_figure_fixed_1_carre",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_figure",
    difficulty: 2,
    theme: "neutral",
    text: "Ce programme permet de tracer quelle figure ?",
    format: "qcm",
    choices: ["un carré", "un triangle", "un cercle", "une droite"],
    expected: ["un carré"],
    comparator: "mcq_exact",
    hint: "On répète 4 fois : avancer puis tourner de 90°.",
    explanation:
      "Définition : un carré possède 4 côtés et 4 angles droits.\n\n" +
      "Méthode : on observe le nombre de répétitions et l’angle de rotation.\n\n" +
      "Exécution : le lutin avance puis tourne de 90°, et cela est répété 4 fois.\n\n" +
      "Conclusion : le programme trace un carré.",
    tags: ["algo_programmation", "figures", "carre", "scratch", "canvas"],
    canvas: scratchCanvas("Tracer un carré", [
      { type: "event" },
      { type: "pen", text: "stylo en position d’écriture" },
      {
        type: "repeat",
        times: 4,
        children: [
          { type: "move", value: 50 },
          { type: "turn", value: 90 },
        ],
      },
    ]),
  },

  {
    kind: "fixed",
    id: "6e_algo_figure_fixed_2_rectangle",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_figure",
    difficulty: 2,
    theme: "neutral",
    text: "Ce programme alterne avancer de 80 puis avancer de 40, avec des rotations de 90°. Quelle figure peut-il tracer ?",
    format: "qcm",
    choices: ["un rectangle", "un triangle équilatéral", "un cercle", "un segment"],
    expected: ["un rectangle"],
    comparator: "mcq_exact",
    hint: "Un rectangle a 4 angles droits et des côtés opposés de même longueur.",
    explanation:
      "Définition : un rectangle possède 4 angles droits et deux longueurs différentes possibles.\n\n" +
      "Méthode : on lit les déplacements et les rotations.\n\n" +
      "Exécution : le programme alterne deux longueurs et tourne toujours de 90°.\n\n" +
      "Conclusion : il peut tracer un rectangle.",
    tags: ["algo_programmation", "figures", "rectangle", "scratch", "canvas"],
    canvas: scratchCanvas("Tracer un rectangle", [
      { type: "event" },
      { type: "pen", text: "stylo en position d’écriture" },
      { type: "move", value: 80 },
      { type: "turn", value: 90 },
      { type: "move", value: 40 },
      { type: "turn", value: 90 },
      { type: "move", value: 80 },
      { type: "turn", value: 90 },
      { type: "move", value: 40 },
      { type: "turn", value: 90 },
    ]),
  },

  {
    kind: "template",
    id: "6e_algo_figure_tpl_1_carre_cote",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_figure",
    difficulty: 3,
    theme: "neutral",
    hint: "Dans un carré, les 4 côtés ont la même longueur.",
    tags: ["algo_programmation", "figures", "carre", "template", "canvas"],
    generate: () => {
      const p = pick(PRENOMS);
      const a = randomChoice(DESSINATEURS);
      const f = programmeFigure(a.u, ["un carré", "un triangle équilatéral", "un pentagone", "un hexagone", "un octogone"]);
      const nbCotes = Math.random() < 0.5;
      return {
        text:
          `${intro(p, a)} Ce programme trace ${f.nom}.\n${progTxt(f.prog, a.u)}\n` +
          (nbCotes
            ? randomChoice(["Combien de côtés la figure a-t-elle ?", `Combien de côtés ${a.nom} trace-t-${ilA(a)} ?`])
            : randomChoice([
                "Quelle est la longueur d’un côté de la figure ?",
                "Combien mesure chaque côté de la figure ?",
                `Quelle longueur fait chaque côté tracé par ${a.nom} ?`,
              ])),
        format: "short",
        expected: [nbCotes ? String(f.cotes) : uTxt(f.cote, a.u)],
        comparator: "number_equal",
        explanation: ae(
          "dans la boucle, chaque tour trace un côté : « avancer » donne sa longueur.",
          nbCotes ? "le nombre de tours de la boucle donne le nombre de côtés." : "on lit le nombre du bloc « avancer ».",
          nbCotes ? `la boucle fait ${f.cotes} tours.` : `chaque côté mesure ${uTxt(f.cote, a.u)}.`,
          nbCotes ? `la figure a ${f.cotes} côtés.` : `un côté mesure ${uTxt(f.cote, a.u)}.`,
        ),
        canvas: canvasDe(f.prog, a.u, "Tracer une figure", a),
      };
    },
  },

  {
    kind: "template",
    id: "6e_algo_figure_tpl_2_perimetre_carre",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_figure",
    difficulty: 3,
    theme: "neutral",
    hint: "Le périmètre d’un carré vaut 4 × côté.",
    tags: ["algo_programmation", "figures", "carre", "perimetre", "template", "canvas"],
    generate: () => {
      const p = pick(PRENOMS);
      const a = randomChoice(DESSINATEURS);
      const f = programmeFigure(a.u, ["un carré", "un carré", "un rectangle", "un triangle équilatéral", "un pentagone", "un hexagone"]);
      const dit = Math.random() < 0.6;
      return {
        text:
          `${intro(p, a)}${dit ? ` Ce programme trace ${f.nom}.` : ""}\n${progTxt(f.prog, a.u)}\n` +
          randomChoice([
            "Quel est le périmètre de la figure tracée ?",
            `Quelle longueur de trait ${a.nom} trace-t-${ilA(a)} en tout ?`,
            "Calcule le périmètre de la figure.",
          ]),
        format: "short",
        expected: [uTxt(f.perimetre, a.u)],
        comparator: "number_equal",
        explanation: ae(
          "le périmètre est la longueur du tour de la figure : ici, toute la longueur du trait.",
          "on additionne les « avancer », en comptant chaque tour de boucle.",
          `${f.calcul} = ${f.perimetre}.`,
          `le périmètre est ${uTxt(f.perimetre, a.u)}.`,
        ),
        canvas: canvasDe(f.prog, a.u, "Périmètre", a),
      };
    },
  },

  {
    kind: "template",
    id: "6e_algo_figure_tpl_3_triangle_equilateral",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_figure",
    difficulty: 4,
    theme: "neutral",
    hint: "Un triangle équilatéral a 3 côtés. Dans ce programme, on répète 3 fois.",
    tags: ["algo_programmation", "figures", "triangle", "template", "canvas"],
    generate: () => {
      const p = pick(PRENOMS);
      const a = randomChoice(DESSINATEURS);
      const f = randomChoice(POLYGONES);
      const c = longueur(a.u);
      const angleManque = Math.random() < 0.6;
      const prog: Ins[] = [{ t: "stylo" }, { t: "rep", k: f.k, corps: [{ t: "av", n: c }, { t: "tg", a: f.a }] }];
      const lignes = angleManque
        ? `– poser le stylo\n– répéter ${f.k} fois : ${ligne({ t: "av", n: c }, a.u)} puis tourner de …°`
        : `– poser le stylo\n– répéter … fois : ${ligne({ t: "av", n: c }, a.u)} puis tourner de ${f.a}°`;
      const blocs = canvasDe(prog, a.u, "Compléter pour tracer", a);
      if (blocs) {
        const boucle = blocs.blocks[2] as { times?: unknown; children?: ScratchBlockData[] };
        if (angleManque) boucle.children![1].value = "?";
        else boucle.times = "?";
      }
      const veut = randomChoice([
        `${p.nom} veut que ${a.nom} trace ${f.nom}.`,
        `${p.nom} veut tracer ${f.nom} avec ${a.nom}.`,
        `Avec ${a.nom}, ${p.nom} doit dessiner ${f.nom}.`,
      ]);
      return {
        text:
          `${veut}\n${lignes}\n` +
          (angleManque
            ? randomChoice(["Quel angle faut-il écrire à la place de « … » ?", "De combien de degrés faut-il tourner à chaque tour ?"])
            : randomChoice(["Combien de fois faut-il répéter ?", "Quel nombre faut-il écrire à la place de « … » ?"])),
        format: "short",
        expected: [angleManque ? `${f.a}°` : String(f.k)],
        comparator: "number_equal",
        explanation: ae(
          `${f.nom} a ${f.k} côtés de même longueur ; pour revenir au départ, on fait un tour complet, soit 360°.`,
          angleManque ? "on partage 360° en autant de parts que de côtés." : "il faut autant de tours de boucle que de côtés.",
          angleManque ? `360 ÷ ${f.k} = ${f.a}.` : `${f.k} côtés, donc ${f.k} tours (et ${f.k} × ${f.a}° = 360°).`,
          angleManque ? `il faut tourner de ${f.a}°.` : `il faut répéter ${f.k} fois.`,
        ),
        canvas: blocs,
      };
    },
  },

  {
    kind: "template",
    id: "6e_algo_figure_tpl_4_quelle_figure",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_figure",
    difficulty: 2,
    theme: "neutral",
    hint: "Le nombre de tours donne le nombre de côtés ; l’angle dit comment on tourne.",
    tags: ["algo_programmation", "figures", "template", "canvas", "qcm"],
    generate: () => {
      const p = pick(PRENOMS);
      const a = randomChoice(DESSINATEURS);
      const f = programmeFigure(a.u, ["un carré", "un carré", "un rectangle", "un triangle équilatéral", "un triangle équilatéral", "un hexagone"]);
      // Un carré EST un rectangle : jamais les deux dans les propositions quand c'est un carré.
      const leurres = FIGURES_LEURRES.filter((x) => x !== f.nom && !(f.nom === "un carré" && x === "un rectangle"));
      return {
        text:
          `${intro(p, a)}\n${progTxt(f.prog, a.u)}\n` +
          randomChoice([
            `Quelle figure ${a.nom} trace-t-${ilA(a)} ?`,
            "Quelle figure ce programme dessine-t-il ?",
            `Que dessine ${a.nom} ?`,
          ]),
        format: "qcm",
        choices: makeChoices(f.nom, leurres),
        expected: [f.nom],
        comparator: "mcq_exact",
        explanation: ae(
          "chaque tour de boucle trace un côté puis tourne.",
          "on compte les côtés tracés et on regarde leurs longueurs et l’angle.",
          f.nom === "un rectangle"
            ? "2 tours de « longueur, quart de tour, largeur, quart de tour » : 4 côtés, 4 angles droits, deux longueurs différentes."
            : `${f.cotes} côtés de même longueur, et on tourne de ${360 / f.cotes}° à chaque fois.`,
          `le programme trace ${f.nom}.`,
        ),
        canvas: canvasDe(f.prog, a.u, "Quelle figure ?", a),
      };
    },
  },

  {
    kind: "template",
    id: "6e_algo_figure_tpl_5_escalier",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_figure",
    difficulty: 4,
    theme: "neutral",
    hint: "Chaque tour de boucle trace une marche : un trait qui monte et un trait à plat.",
    tags: ["algo_programmation", "figures", "escalier", "template", "canvas"],
    generate: () => {
      const p = pick(PRENOMS);
      const a = randomChoice(DESSINATEURS);
      const k = randomInt(2, 7);
      const h = longueur(a.u);
      let l = longueur(a.u);
      if (Math.random() < 0.4) l = h;
      const prog: Ins[] = [
        { t: "stylo" },
        { t: "rep", k, corps: [{ t: "av", n: h }, { t: "tg", a: 90, sens: "d" }, { t: "av", n: l }, { t: "tg", a: 90, sens: "g" }] },
      ];
      const genre = randomChoice(["marches", "trait", "trait"] as const);
      const total = k * (h + l);
      return {
        text:
          `${intro(p, a)} ${maj(a.nom)} dessine un escalier.\n${progTxt(prog, a.u)}\n` +
          (genre === "marches"
            ? randomChoice(["Combien de marches l’escalier a-t-il ?", "Combien de marches sont dessinées ?"])
            : randomChoice([
                "Quelle est la longueur totale du trait ?",
                `Quelle longueur de trait ${a.nom} trace-t-${ilA(a)} en tout ?`,
              ])),
        format: "short",
        expected: [genre === "marches" ? String(k) : uTxt(total, a.u)],
        comparator: "number_equal",
        explanation: ae(
          "un tour de boucle trace une marche : un trait qui monte, un quart de tour, un trait à plat, un quart de tour dans l’autre sens.",
          genre === "marches" ? "on compte les tours de boucle." : "on additionne les deux traits d’une marche, puis on multiplie par le nombre de marches.",
          genre === "marches" ? `la boucle fait ${k} tours.` : `${k} × (${h} + ${l}) = ${total}.`,
          genre === "marches" ? `l’escalier a ${k} marches.` : `le trait mesure ${uTxt(total, a.u)} en tout.`,
        ),
        canvas: canvasDe(prog, a.u, "Escalier", a),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_algo_figure_fixed_3_piege_carre_angle",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_figure",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève veut tracer un carré. Il répète 4 fois : avancer de 50 puis tourner de 60°. Son programme est-il correct ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Pour un carré, il faut tourner de 90°.",
    explanation:
      "Définition : un carré possède 4 angles droits.\n\n" +
      "Méthode : pour tracer un carré avec Scratch, on répète 4 côtés et on tourne de 90°.\n\n" +
      "Exécution : tourner de 60° ne correspond pas à l’angle nécessaire pour fermer un carré.\n\n" +
      "Conclusion : le programme n’est pas correct.",
    tags: ["algo_programmation", "figures", "carre", "erreur", "qcm"],
    canvas: scratchCanvas("Erreur de carré", [
      { type: "event" },
      { type: "pen", text: "stylo en position d’écriture" },
      {
        type: "repeat",
        times: 4,
        children: [
          { type: "move", value: 50 },
          { type: "turn", value: 60 },
        ],
      },
    ]),
  },

  {
    kind: "fixed",
    id: "6e_algo_figure_open_1_methode_carre",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_figure",
    difficulty: 4,
    theme: "neutral",
    text: "Quel programme trace un carré dans Scratch ?",
    format: "qcm",
    choices: [
      "répéter 4 fois : avancer de 50 puis tourner de 90°",
      "répéter 3 fois : avancer de 50 puis tourner de 90°",
      "répéter 4 fois : avancer de 50 puis tourner de 60°",
      "répéter 4 fois : avancer de 90 puis tourner de 50°",
    ],
    expected: ["répéter 4 fois : avancer de 50 puis tourner de 90°"],
    comparator: "mcq_exact",
    hint: "Un carré a 4 côtés et des angles droits.",
    explanation:
      "Définition : un carré possède 4 côtés égaux et 4 angles droits.\n\n" +
      "Méthode : on utilise une boucle pour répéter les mêmes actions.\n\n" +
      "Exécution : on répète 4 fois : avancer, puis tourner de 90°.\n\n" +
      "Conclusion : une bonne méthode est : répéter 4 fois avancer puis tourner de 90°.",
    tags: ["algo_programmation", "figures", "carre", "open", "methode"],
  },
    /* =========================
     ALGO_DEFIS
  ========================= */

  {
    kind: "fixed",
    id: "6e_algo_defi_fixed_1_carre_erreur_repetition",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève veut tracer un carré, mais il répète seulement 3 fois : avancer puis tourner de 90°. Son programme est-il correct ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Un carré a 4 côtés.",
    explanation:
      "Définition : un carré possède 4 côtés et 4 angles droits.\n\n" +
      "Méthode : pour tracer un carré, on doit répéter 4 fois le déplacement et la rotation.\n\n" +
      "Exécution : ici, le programme ne répète que 3 fois, donc il trace seulement 3 côtés.\n\n" +
      "Conclusion : le programme n’est pas correct.",
    tags: ["algo_programmation", "defi", "carre", "erreur", "qcm"],
    canvas: scratchCanvas("Défi : carré incomplet", [
      { type: "event" },
      { type: "pen", text: "stylo en position d’écriture" },
      {
        type: "repeat",
        times: 3,
        children: [
          { type: "move", value: 50 },
          { type: "turn", value: 90 },
        ],
      },
    ]),
  },

  {
    kind: "template",
    id: "6e_algo_defi_tpl_1_perimetre_rectangle",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Additionne les 4 déplacements.",
    tags: ["algo_programmation", "defi", "rectangle", "perimetre", "template", "canvas"],
    generate: () => {
      const p = pick(PRENOMS);
      const a = randomChoice(DESSINATEURS);
      const L = longueur(a.u);
      let l = longueur(a.u);
      while (l === L) l = longueur(a.u);
      const prog: Ins[] = [
        { t: "stylo" },
        { t: "av", n: L },
        { t: "tg", a: 90 },
        { t: "av", n: l },
        { t: "tg", a: 90 },
        { t: "av", n: L },
        { t: "tg", a: 90 },
        { t: "av", n: l },
      ];
      const aire = a.u === "cm" || a.u === "m" ? Math.random() < 0.45 : false;
      const [grand, petit] = L > l ? [L, l] : [l, L];
      const il = ilA(a);
      if (aire) {
        return {
          text:
            `Défi : ${p.nom} programme ${a.nom} ${a.lieu}.\n${progTxt(prog, a.u)}\n` +
            randomChoice(["Quelle est l’aire de la figure tracée ?", "Calcule l’aire du rectangle tracé."]),
          format: "short",
          expected: [`${L * l} ${a.u}²`],
          comparator: "number_equal",
          explanation: ae(
            "le programme trace un rectangle : 4 angles droits, côtés opposés égaux.",
            "aire d’un rectangle = longueur × largeur.",
            `${grand} × ${petit} = ${L * l}.`,
            `l’aire est ${L * l} ${a.u}².`,
          ),
          canvas: canvasDe(prog, a.u, "Défi rectangle", a),
        };
      }
      return {
        text:
          `Défi : ${p.nom} programme ${a.nom} ${a.lieu}.\n${progTxt(prog, a.u)}\n` +
          randomChoice([
            `Quelle distance ${a.nom} parcourt-${il} en tout ?`,
            "Quel est le périmètre de la figure tracée ?",
            `Quelle longueur de trait ${a.nom} trace-t-${il} ?`,
          ]),
        format: "short",
        expected: [uTxt(2 * (L + l), a.u)],
        comparator: "number_equal",
        explanation: ae(
          "la distance parcourue, stylo posé, est le périmètre du rectangle tracé.",
          "on additionne les quatre « avancer ».",
          `${L} + ${l} + ${L} + ${l} = ${2 * (L + l)}.`,
          `la réponse est ${uTxt(2 * (L + l), a.u)}.`,
        ),
        canvas: canvasDe(prog, a.u, "Défi rectangle", a),
      };
    },
  },

{
  kind: "template",
  id: "6e_algo_defi_tpl_2_boucle_optimisee",
  niveau: "6e",
  matiere: "maths",
  notionId: "algo_programmation",
  microId: "algo_defi",
  difficulty: 4,
  theme: "neutral",
  hint: "Cherche le nombre de côtés identiques à tracer.",
  tags: [
    "algo_programmation",
    "defi",
    "boucle",
    "optimisation",
    "template",
    "canvas",
  ],
  generate: () => {
    const p = pick(PRENOMS);
    const a = randomChoice(ACTEURS);
    const motif: Ins[] =
      Math.random() < 0.7
        ? [{ t: "av", n: longueur(a.u) }, { t: "tg", a: randomChoice([45, 60, 72, 90, 120]) }]
        : [{ t: "av", n: longueur(a.u) }, { t: "tg", a: randomChoice([60, 90, 120]) }, { t: "dire", s: randomChoice(PAROLES) }];
    const k = randomInt(3, Math.floor(12 / motif.length));
    const prog: Ins[] = [];
    for (let i = 0; i < k; i++) prog.push(...motif);
    const motifTxt = motif.map((i) => ligne(i, a.u)).join(" puis ");
    return {
      text:
        `Défi : ${intro(p, a)} Le programme est long !\n${progTxt(prog, a.u)}\n` +
        randomChoice([
          `On l’écrit plus court avec « répéter … fois : ${motifTxt} ». Quel nombre faut-il écrire à la place de « … » ?`,
          `Pour le raccourcir avec une boucle « ${motifTxt} », combien de fois faut-il répéter ?`,
        ]),
      format: "short",
      expected: [String(k)],
      comparator: "number_equal",
      explanation: ae(
        "une boucle remplace des lignes qui reviennent à l’identique.",
        `on repère le motif qui revient (${motif.length} lignes) et on compte combien de fois il revient.`,
        `${prog.length} lignes ÷ ${motif.length} = ${k}.`,
        `il faut répéter ${k} fois.`,
      ),
      canvas: canvasDe(prog, a.u, "Programme à raccourcir", a),
    };
  },
},

  {
    kind: "template",
    id: "6e_algo_defi_tpl_3_reunion_margouillat",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Une figure à n côtés : répéter n fois, et tourner de 360° ÷ n.",
    tags: ["algo_programmation", "defi", "corriger", "template", "canvas", "qcm"],
    // ⚠️ L'id garde « reunion_margouillat » (historique) : le défi est maintenant
    // « corriger un programme », le margouillat n'est plus qu'une situation parmi d'autres.
    generate: () => {
      const p = pick(PRENOMS);
      const a = randomChoice([...DESSINATEURS, { nom: "le margouillat du jeu", f: false, u: "pas", lieu: "sur le mur de la case créole" } as Acteur]);
      const f = randomChoice(POLYGONES.filter((x) => x.k <= 6));
      const c = longueur(a.u);
      const erreur = randomChoice(["tours", "angle", "longueur"] as const);
      const autresK = [3, 4, 5, 6, 8].filter((x) => x !== f.k);
      const autresA = [45, 60, 72, 90, 120].filter((x) => x !== f.a);
      let c2 = longueur(a.u);
      while (c2 === c) c2 = longueur(a.u);
      const kFaux = erreur === "tours" ? randomChoice(autresK) : f.k;
      const aFaux = erreur === "angle" ? randomChoice(autresA) : f.a;
      const cFaux = erreur === "longueur" ? c2 : c;
      const prog: Ins[] = [{ t: "stylo" }, { t: "rep", k: kFaux, corps: [{ t: "av", n: cFaux }, { t: "tg", a: aFaux }] }];
      const changer = (x: string, y: string) => `changer « ${x} » en « ${y} »`;
      const fixTours = changer(`répéter ${kFaux} fois`, `répéter ${f.k} fois`);
      const fixAngle = changer(`tourner de ${aFaux}°`, `tourner de ${f.a}°`);
      const fixLong = changer(`avancer de ${uTxt(cFaux, a.u)}`, `avancer de ${uTxt(c, a.u)}`);
      const juste = erreur === "tours" ? fixTours : erreur === "angle" ? fixAngle : fixLong;
      // Des corrections qui ne réparent pas : elles changent un bloc déjà juste.
      const kAutre = randomChoice(autresK.filter((x) => x !== kFaux));
      const aAutre = randomChoice(autresA.filter((x) => x !== aFaux));
      let cAutre = longueur(a.u);
      while (cAutre === cFaux || cAutre === c) cAutre = longueur(a.u);
      const leurres = [
        changer(`répéter ${kFaux} fois`, `répéter ${kAutre} fois`),
        changer(`tourner de ${aFaux}°`, `tourner de ${aAutre}°`),
        changer(`avancer de ${uTxt(cFaux, a.u)}`, `avancer de ${uTxt(cAutre, a.u)}`),
        // ⚠️ Pas « ajouter un bloc avancer » : après 5 côtés d'un hexagone, il le referme (le correcteur l'a vu).
        "ajouter un bloc « dire » à la fin",
      ];
      const nomCourt = f.nom.replace(/^un /, "").replace(/^(?=[aeiouh])/, "l’").replace(/^(?!l’)/, "le ");
      return {
        text:
          `Défi : ${p.nom} veut que ${a.nom} trace ${f.nom} de côté ${uTxt(c, a.u)}. Son programme ne marche pas.\n` +
          `${progTxt(prog, a.u)}\n` +
          randomChoice([
            "Quelle correction faut-il faire ?",
            `Comment corriger le programme pour obtenir ${nomCourt} ?`,
            "Quel changement répare le programme ?",
          ]),
        format: "qcm",
        choices: makeChoices(juste, leurres),
        expected: [juste],
        comparator: "mcq_exact",
        explanation: ae(
          `${f.nom} a ${f.k} côtés de ${uTxt(c, a.u)} ; on tourne de 360° ÷ ${f.k} = ${f.a}° à chaque coin.`,
          "on vérifie chaque bloc : le nombre de tours, la longueur, l’angle.",
          erreur === "tours"
            ? `la boucle fait ${kFaux} tours au lieu de ${f.k}.`
            : erreur === "angle"
              ? `l’angle est ${aFaux}° au lieu de ${f.a}°.`
              : `le côté mesure ${uTxt(cFaux, a.u)} au lieu de ${uTxt(c, a.u)}.`,
          `il faut ${juste}.`,
        ),
        canvas: canvasDe(prog, a.u, "Programme à corriger", a),
      };
    },
  },

  {
    kind: "template",
    id: "6e_algo_defi_tpl_4_calcul_en_boucle",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Fais le calcul de la boucle autant de fois qu’il y a de tours, en partant du résultat précédent.",
    tags: ["algo_programmation", "defi", "boucle", "programme_calcul", "template"],
    generate: () => {
      const p = pick(PRENOMS);
      let prog: Ins[];
      let v: number;
      for (;;) {
        const s = randomInt(1, 10);
        const k = randomInt(2, 5);
        const op = randomChoice(["+", "+", "×", "-"] as const);
        const n = op === "×" ? randomChoice([2, 2, 3]) : op === "+" ? randomInt(2, 12) : randomInt(1, 4);
        prog = [{ t: "calc", op: "=", n: s }, { t: "rep", k, corps: [{ t: "calc", op, n }] }];
        if (Math.random() < 0.4) prog.push({ t: "calc", op: randomChoice(["+", "-"] as const), n: randomInt(1, 9) });
        // Pas de nombre négatif, même en route.
        let w = 0;
        let ok = true;
        const pasAPas = (i: Ins) => {
          if (i.t === "rep") for (let r = 0; r < i.k; r++) i.corps.forEach(pasAPas);
          else if (i.t === "calc") {
            w = i.op === "=" ? i.n : i.op === "+" ? w + i.n : i.op === "-" ? w - i.n : w * i.n;
            if (w < 0) ok = false;
          }
        };
        prog.forEach(pasAPas);
        v = w;
        if (ok && v <= 300) break;
      }
      const etapes: string[] = [];
      let w = 0;
      const trace = (i: Ins) => {
        if (i.t === "rep") for (let r = 0; r < i.k; r++) i.corps.forEach(trace);
        else if (i.t === "calc") {
          if (i.op === "=") w = i.n;
          else {
            const x = i.op === "+" ? w + i.n : i.op === "-" ? w - i.n : w * i.n;
            etapes.push(`${w} ${i.op === "-" ? "−" : i.op} ${i.n} = ${x}`);
            w = x;
          }
        }
      };
      prog.forEach(trace);
      return {
        text:
          `Défi : ${introCalcul(p)}\n${progTxt(prog)}\n` +
          randomChoice(["Quel nombre obtient-on à la fin ?", "Quel est le résultat du programme ?", "Calcule le résultat, tour après tour."]),
        format: "short",
        expected: [String(v)],
        comparator: "number_equal",
        explanation: ae(
          "dans une boucle, le calcul est refait à chaque tour, sur le résultat du tour d’avant.",
          "on écrit les calculs les uns après les autres.",
          `${etapes.join(" ; ")}.`,
          `on obtient ${v}.`,
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "6e_algo_defi_fixed_2_triangle_piege_angle",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un programme répète 3 fois : avancer de 50 puis tourner de 90°. Trace-t-il un triangle équilatéral ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Pour un triangle équilatéral avec Scratch, on utilise une rotation de 120°.",
    explanation:
      "Définition : un triangle équilatéral possède 3 côtés égaux.\n\n" +
      "Méthode : pour le tracer avec Scratch, on répète 3 fois et on tourne de 120°.\n\n" +
      "Exécution : ici, la rotation est de 90°, donc ce n’est pas le bon programme.\n\n" +
      "Conclusion : il ne trace pas un triangle équilatéral.",
    tags: ["algo_programmation", "defi", "triangle", "erreur", "angle", "qcm"],
    canvas: scratchCanvas("Défi triangle", [
      { type: "event" },
      { type: "pen", text: "stylo en position d’écriture" },
      {
        type: "repeat",
        times: 3,
        children: [
          { type: "move", value: 50 },
          { type: "turn", value: 90 },
        ],
      },
    ]),
  },

  {
    kind: "fixed",
    id: "6e_algo_defi_open_1_corriger_programme",
    niveau: "6e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
    difficulty: 5,
    theme: "neutral",
    text:
      "Un programme veut tracer un carré mais il utilise « répéter 3 fois ». Comment le corriger ?",
    format: "qcm",
    choices: [
      "remplacer « répéter 3 fois » par « répéter 4 fois »",
      "remplacer « tourner de 90° » par « tourner de 120° »",
      "ajouter un bloc « dire »",
      "remplacer « répéter 3 fois » par « répéter 2 fois »",
    ],
    expected: ["remplacer « répéter 3 fois » par « répéter 4 fois »"],
    comparator: "mcq_exact",
    hint: "Un carré a 4 côtés.",
    explanation:
      "Définition : un carré possède 4 côtés.\n\n" +
      "Méthode : on vérifie que la boucle correspond au nombre de côtés.\n\n" +
      "Exécution : si le programme répète seulement 3 fois, il manque un côté.\n\n" +
      "Conclusion : il faut remplacer “répéter 3 fois” par “répéter 4 fois”.",
    tags: ["algo_programmation", "defi", "open", "correction", "carre"],
  },

  /* ========== TOP-UP — ALGO_SEQUENCE ========== */
  {
    kind: "fixed", id: "6e_algo_sequence_topup_1", niveau: "6e", matiere: "maths",
    notionId: "algo_programmation", microId: "algo_sequence", difficulty: 1, theme: "neutral",
    text: "Dans un programme, dans quel ordre les instructions s’exécutent-elles ?",
    format: "qcm", choices: ["de haut en bas, dans l’ordre", "de bas en haut", "au hasard", "seulement la première"],
    expected: ["de haut en bas, dans l’ordre"], comparator: "mcq_exact",
    hint: "Comme on lit un texte.",
    explanation: ae("un algorithme est une suite d’instructions ordonnées.", "on lit les instructions une à une.", "on commence par la première, tout en haut.", "les instructions s’exécutent de haut en bas, dans l’ordre."),
    tags: ["algo_programmation", "sequence", "qcm"],
  },
  {
    kind: "fixed", id: "6e_algo_sequence_topup_2", niveau: "6e", matiere: "maths",
    notionId: "algo_programmation", microId: "algo_sequence", difficulty: 1, theme: "neutral",
    text: "Programme : (1) Avancer (2) Tourner (3) Avancer. Quelle est la 2ᵉ instruction ?",
    format: "qcm", choices: ["Tourner", "Avancer", "Reculer", "S’arrêter"], expected: ["Tourner"], comparator: "mcq_exact",
    hint: "Compte dans l’ordre.",
    explanation: ae("chaque instruction a une position dans la séquence.", "on compte les instructions dans l’ordre.", "la 2ᵉ instruction est « Tourner ».", "la réponse est Tourner."),
    tags: ["algo_programmation", "sequence", "qcm"],
  },
  {
    kind: "fixed", id: "6e_algo_sequence_topup_3", niveau: "6e", matiere: "maths",
    notionId: "algo_programmation", microId: "algo_sequence", difficulty: 1, theme: "neutral",
    text: "Combien d’instructions contient ce programme : (1) Avancer (2) Tourner (3) Sauter (4) Dire ?",
    format: "short", expected: ["4"], comparator: "number_equal",
    hint: "Compte les lignes numérotées.",
    explanation: ae("une séquence est composée de plusieurs instructions.", "on compte les instructions numérotées.", "il y a 4 instructions de 1 à 4.", "le programme contient 4 instructions."),
    tags: ["algo_programmation", "sequence"],
  },

  /* ========== TOP-UP — ALGO_DEPLACEMENT ========== */
  {
    kind: "fixed", id: "6e_algo_deplacement_topup_1", niveau: "6e", matiere: "maths",
    notionId: "algo_programmation", microId: "algo_deplacement", difficulty: 1, theme: "neutral",
    text: "Un robot regarde vers le Nord. Il tourne à droite (quart de tour). Vers où regarde-t-il ?",
    format: "qcm", choices: ["Est", "Ouest", "Sud", "Nord"], expected: ["Est"], comparator: "mcq_exact",
    hint: "Un quart de tour à droite depuis le Nord.",
    explanation: ae("tourner à droite fait un quart de tour dans le sens des aiguilles d’une montre.", "on part du Nord.", "Nord → quart de tour à droite → Est.", "le robot regarde vers l’Est."),
    tags: ["algo_programmation", "deplacement", "qcm"],
  },
  {
    kind: "fixed", id: "6e_algo_deplacement_topup_2", niveau: "6e", matiere: "maths",
    notionId: "algo_programmation", microId: "algo_deplacement", difficulty: 1, theme: "neutral",
    text: "Un robot regarde vers l’Est. Il fait un demi-tour. Vers où regarde-t-il ?",
    format: "qcm", choices: ["Ouest", "Est", "Nord", "Sud"], expected: ["Ouest"], comparator: "mcq_exact",
    hint: "Un demi-tour = direction opposée.",
    explanation: ae("un demi-tour amène vers la direction opposée.", "on cherche l’opposé de l’Est.", "l’opposé de l’Est est l’Ouest.", "le robot regarde vers l’Ouest."),
    tags: ["algo_programmation", "deplacement", "qcm"],
  },
  {
    kind: "fixed", id: "6e_algo_deplacement_topup_3", niveau: "6e", matiere: "maths",
    notionId: "algo_programmation", microId: "algo_deplacement", difficulty: 2, theme: "neutral",
    text: "Un robot avance de 3 cases, puis avance encore de 2 cases. Combien de cases a-t-il parcourues ?",
    format: "short", expected: ["5"], comparator: "number_equal",
    hint: "Additionne les déplacements.",
    explanation: ae("les déplacements successifs s’additionnent.", "on additionne les cases.", "3 + 2 = 5.", "le robot a parcouru 5 cases."),
    tags: ["algo_programmation", "deplacement"],
  },

  /* ========== TOP-UP — ALGO_FIGURE ========== */
  {
    kind: "fixed", id: "6e_algo_figure_topup_1", niveau: "6e", matiere: "maths",
    notionId: "algo_programmation", microId: "algo_figure", difficulty: 2, theme: "neutral",
    text: "Pour dessiner un carré en répétant « Avancer · Tourner de 90° », combien de répétitions faut-il ?",
    format: "short", expected: ["4"], comparator: "number_equal",
    hint: "Un carré a 4 côtés.",
    explanation: ae("on répète autant de fois qu’il y a de côtés.", "un carré possède 4 côtés.", "il faut donc 4 répétitions.", "on répète 4 fois."),
    tags: ["algo_programmation", "figure"],
  },
  {
    kind: "fixed", id: "6e_algo_figure_topup_2", niveau: "6e", matiere: "maths",
    notionId: "algo_programmation", microId: "algo_figure", difficulty: 3, theme: "neutral",
    text: "Répéter 3 fois « Avancer · Tourner de 120° » dessine quelle figure ?",
    format: "qcm", choices: ["un triangle", "un carré", "un cercle", "un hexagone"], expected: ["un triangle"], comparator: "mcq_exact",
    hint: "3 côtés.",
    explanation: ae("le nombre de répétitions donne le nombre de côtés.", "on répète 3 fois avec un angle de 120°.", "3 côtés forment un triangle (équilatéral).", "le programme dessine un triangle."),
    tags: ["algo_programmation", "figure", "qcm"],
  },
  {
    kind: "fixed", id: "6e_algo_figure_topup_3", niveau: "6e", matiere: "maths",
    notionId: "algo_programmation", microId: "algo_figure", difficulty: 3, theme: "neutral",
    text: "Pour dessiner un hexagone (6 côtés), combien de fois faut-il répéter « Avancer · Tourner » ?",
    format: "short", expected: ["6"], comparator: "number_equal",
    hint: "Un hexagone a 6 côtés.",
    explanation: ae("on répète autant de fois qu’il y a de côtés.", "un hexagone possède 6 côtés.", "il faut donc 6 répétitions.", "on répète 6 fois."),
    tags: ["algo_programmation", "figure"],
  },

  /* ========== TOP-UP — ALGO_REPETITION ========== */
  {
    kind: "fixed", id: "6e_algo_repetition_topup_1", niveau: "6e", matiere: "maths",
    notionId: "algo_programmation", microId: "algo_repetition", difficulty: 2, theme: "neutral",
    text: "Programme : Répéter 4 fois « Avancer de 10 pas ». Combien de pas au total ?",
    format: "short", expected: ["40"], comparator: "number_equal",
    hint: "4 × 10.",
    explanation: ae("une boucle répète l’instruction plusieurs fois.", "on multiplie le nombre de pas par le nombre de répétitions.", "4 × 10 = 40.", "le robot avance de 40 pas."),
    tags: ["algo_programmation", "repetition"],
  },
  {
    kind: "fixed", id: "6e_algo_repetition_topup_2", niveau: "6e", matiere: "maths",
    notionId: "algo_programmation", microId: "algo_repetition", difficulty: 1, theme: "neutral",
    text: "À quoi sert une boucle « Répéter » dans un programme ?",
    format: "qcm", choices: ["à répéter plusieurs fois les mêmes instructions", "à effacer le dessin", "à changer de couleur", "à arrêter le programme"],
    expected: ["à répéter plusieurs fois les mêmes instructions"], comparator: "mcq_exact",
    hint: "Répéter = refaire.",
    explanation: ae("une boucle évite de réécrire plusieurs fois la même chose.", "on regarde ce que fait le bloc « Répéter ».", "il exécute les instructions le nombre de fois indiqué.", "la boucle sert à répéter plusieurs fois les mêmes instructions."),
    tags: ["algo_programmation", "repetition", "qcm"],
  },
  {
    kind: "fixed", id: "6e_algo_repetition_topup_3", niveau: "6e", matiere: "maths",
    notionId: "algo_programmation", microId: "algo_repetition", difficulty: 3, theme: "neutral",
    text: "Programme : Répéter 5 fois « Tourner de 72° ». Quel est l’angle total parcouru ?",
    format: "short", expected: ["360", "360°"], comparator: "number_equal",
    hint: "5 × 72.",
    explanation: ae("chaque répétition ajoute le même angle.", "on multiplie l’angle par le nombre de répétitions.", "5 × 72 = 360.", "l’angle total est 360° (un tour complet, utile pour un pentagone)."),
    tags: ["algo_programmation", "repetition"],
  },

  /* ========== TOP-UP — ALGO_LIRE_PROGRAMME ========== */
  {
    kind: "fixed", id: "6e_algo_lire_programme_topup_1", niveau: "6e", matiere: "maths",
    notionId: "algo_programmation", microId: "algo_lire_programme", difficulty: 1, theme: "neutral",
    text: "Quel bloc lance toujours un programme Scratch ?",
    format: "qcm", choices: ["Quand 🚩 est cliqué", "Avancer de 10 pas", "Répéter 10 fois", "Dire Bonjour"],
    expected: ["Quand 🚩 est cliqué"], comparator: "mcq_exact",
    hint: "C’est le bloc tout en haut.",
    explanation: ae("un programme a un bloc déclencheur.", "on cherche le bloc placé tout en haut.", "« Quand 🚩 est cliqué » démarre le programme.", "c’est le bloc déclencheur."),
    tags: ["algo_programmation", "lire_programme", "qcm"],
  },
  {
    kind: "fixed", id: "6e_algo_lire_programme_topup_2", niveau: "6e", matiere: "maths",
    notionId: "algo_programmation", microId: "algo_lire_programme", difficulty: 2, theme: "neutral",
    text: "Que dit le lutin à la fin de ce programme ?",
    format: "qcm", choices: ["Bonjour", "Au revoir", "Rien", "Bravo"], expected: ["Bonjour"], comparator: "mcq_exact",
    hint: "Lis le dernier bloc.",
    explanation: ae("on lit le programme de haut en bas.", "on repère la dernière instruction.", "le dernier bloc fait dire « Bonjour ».", "le lutin dit Bonjour."),
    tags: ["algo_programmation", "lire_programme", "qcm", "canvas"],
    canvas: scratchCanvas("Programme", [
      { type: "event", text: "Quand 🚩 est cliqué" },
      { type: "move", text: "Avancer de 10 pas", value: 10 },
      { type: "say", text: "Dire Bonjour" },
    ]),
  },
  {
    kind: "fixed", id: "6e_algo_lire_programme_topup_3", niveau: "6e", matiere: "maths",
    notionId: "algo_programmation", microId: "algo_lire_programme", difficulty: 2, theme: "neutral",
    text: "Dans ce programme, de combien de pas le lutin avance-t-il en tout ?",
    format: "short", expected: ["50"], comparator: "number_equal",
    hint: "Additionne les blocs Avancer.",
    explanation: ae("on additionne les déplacements du programme.", "on repère les blocs Avancer.", "20 + 30 = 50.", "le lutin avance de 50 pas."),
    tags: ["algo_programmation", "lire_programme", "canvas"],
    canvas: scratchCanvas("Programme", [
      { type: "event", text: "Quand 🚩 est cliqué" },
      { type: "move", text: "Avancer de 20 pas", value: 20 },
      { type: "move", text: "Avancer de 30 pas", value: 30 },
    ]),
  },
  {
    kind: "fixed", id: "6e_algo_lire_programme_topup_4", niveau: "6e", matiere: "maths",
    notionId: "algo_programmation", microId: "algo_lire_programme", difficulty: 2, theme: "neutral",
    text: "Combien d’instructions (sans le déclencheur) contient ce programme ?",
    format: "short", expected: ["3"], comparator: "number_equal",
    hint: "Ne compte pas le bloc « Quand 🚩 est cliqué ».",
    explanation: ae("on compte les instructions après le déclencheur.", "on ne compte pas le bloc de départ.", "il reste Avancer, Tourner et Dire : 3 instructions.", "il y a 3 instructions."),
    tags: ["algo_programmation", "lire_programme", "canvas"],
    canvas: scratchCanvas("Programme", [
      { type: "event", text: "Quand 🚩 est cliqué" },
      { type: "move", text: "Avancer de 10 pas", value: 10 },
      { type: "turn", text: "Tourner de 90°", value: 90 },
      { type: "say", text: "Dire Fini" },
    ]),
  },

  /* ========== TOP-UP — ALGO_DEFI ========== */
  {
    kind: "fixed", id: "6e_algo_defi_topup_1", niveau: "6e", matiere: "maths",
    notionId: "algo_programmation", microId: "algo_defi", difficulty: 3, theme: "neutral",
    text: "Défi : Répéter 3 fois « Avancer de 5 pas », puis Avancer de 4 pas. Combien de pas au total ?",
    format: "short", expected: ["19"], comparator: "number_equal",
    hint: "(3 × 5) + 4.",
    explanation: ae("on calcule la boucle, puis on ajoute le pas hors boucle.", "on multiplie puis on additionne.", "(3 × 5) + 4 = 15 + 4 = 19.", "le total est 19 pas."),
    tags: ["algo_programmation", "defi", "repetition"],
  },
  {
    kind: "fixed", id: "6e_algo_defi_topup_2", niveau: "6e", matiere: "maths",
    notionId: "algo_programmation", microId: "algo_defi", difficulty: 3, theme: "neutral",
    text: "Défi : un robot répète 4 fois « Avancer · Tourner de 90° ». Quelle figure dessine-t-il ?",
    format: "qcm", choices: ["un carré", "un triangle", "un cercle", "un hexagone"], expected: ["un carré"], comparator: "mcq_exact",
    hint: "4 côtés, angles de 90°.",
    explanation: ae("le nombre de répétitions donne le nombre de côtés.", "4 côtés avec des angles de 90°.", "cela forme un carré.", "le robot dessine un carré."),
    tags: ["algo_programmation", "defi", "figure", "qcm"],
  },
  {
    kind: "fixed", id: "6e_algo_defi_topup_3", niveau: "6e", matiere: "maths",
    notionId: "algo_programmation", microId: "algo_defi", difficulty: 3, theme: "neutral",
    text: "Défi : Répéter 2 fois « Avancer · Avancer ». Combien de fois l’instruction « Avancer » est-elle exécutée ?",
    format: "short", expected: ["4"], comparator: "number_equal",
    hint: "2 « Avancer » par tour, répétés 2 fois.",
    explanation: ae("on compte les exécutions à l’intérieur de la boucle.", "il y a 2 « Avancer » dans la boucle, répétés 2 fois.", "2 × 2 = 4.", "« Avancer » est exécuté 4 fois."),
    tags: ["algo_programmation", "defi", "repetition"],
  },
  {
    kind: "fixed", id: "6e_algo_defi_topup_4", niveau: "6e", matiere: "maths",
    notionId: "algo_programmation", microId: "algo_defi", difficulty: 4, theme: "neutral",
    text: "Défi : un robot regarde le Nord. Il tourne deux fois à droite. Vers où regarde-t-il ?",
    format: "qcm", choices: ["Sud", "Nord", "Est", "Ouest"], expected: ["Sud"], comparator: "mcq_exact",
    hint: "Deux quarts de tour à droite.",
    explanation: ae("chaque « tourner à droite » fait un quart de tour.", "on enchaîne les deux quarts de tour depuis le Nord.", "Nord → Est → Sud.", "le robot regarde vers le Sud."),
    tags: ["algo_programmation", "defi", "deplacement", "qcm"],
  },
];