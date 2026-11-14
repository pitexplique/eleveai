// lib/tutor-v4/questionBank/cycle2/maths/animaux.ts
//
// ─── LES ANIMAUX DANS LES BANQUES DU CYCLE 2 (14/11/2026) ─────────────────────
// Frédéric, devant la bibliothèque d'animaux : « on pourra s'en servir pour le
// coach ! ». Ce fichier est la boite à outils des banques CP / CE1 :
//   • `animauxCanvas({...})` — le canvas `kind: "animaux"`, graine tirée UNE fois ;
//   • `sceneAnimale()` — un animal du MONDE et un lieu qui lui va ;
//   • des familles de questions toutes faites (dénombrer, comparer, ordinal,
//     ajouter-retirer, rangées, pattes, partage), réutilisées par
//     `cp/maths/animaux.bank.ts` et `ce1/maths/animaux.bank.ts`.
//
// ⛔ LA RÉUNION N'EST PAS SERVIE PAR DÉFAUT (≈ 4 % des contextes au plus, cf.
// mémoire) : margouillat, tangue, paille-en-queue et tortue marine restent
// hors des tirages ; une banque qui les veut les nomme.
// ⛔ LE DESSIN NE DONNE JAMAIS LA RÉPONSE ÉCRITE : aucun nombre à l'écran, et
// la `description` (lue par les lecteurs d'écran) ne dit pas « 7 poules ».
// ⭐ Petites réponses entières → `saisie: "pave"` (pavé numérique enfant,
// commit 30c18679) : on compte, on touche le nombre.

import type {
  AnimalCanvasId,
  AnimauxCanvasData,
  AnimauxCollection,
  AnimauxGroupe,
  TutorGeneratedQuestionV4,
} from "@/lib/tutor-v4/types";
import { FICHES } from "@/lib/canvas/animaux/dessins";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";

type Q = TutorGeneratedQuestionV4;

// ─── Le hasard ────────────────────────────────────────────────────────────────

export const entre = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
export const unParmi = <T>(t: readonly T[]): T => t[Math.floor(Math.random() * t.length)];
const melange = <T>(t: readonly T[]): T[] => melangeEnPlace([...t]);

// ─── Le canvas ────────────────────────────────────────────────────────────────

type OptionsCanvas = Omit<AnimauxCanvasData, "kind">;

/** Le canvas « animaux » d'une question. La graine est tirée ici, une fois :
 *  la question ré-affichée garde exactement le même dessin. */
export function animauxCanvas(o: OptionsCanvas): AnimauxCanvasData {
  return {
    kind: "animaux",
    graine: o.graine ?? entre(1, 999_999),
    description: o.description ?? "des animaux à compter",
    ...o,
  };
}

// ─── Les animaux du monde, chacun avec ses lieux ──────────────────────────────

/** Les lieux où l'on voit chaque animal. ⛔ Pas d'animal de La Réunion ici. */
export const LIEUX: Partial<Record<AnimalCanvasId, readonly string[]>> = {
  chat: ["sur le muret", "dans le jardin", "devant la maison"],
  chien: ["au parc", "dans la cour de la ferme", "au concours canin"],
  poule: ["dans le poulailler", "dans la cour de la ferme"],
  poussin: ["dans la paille", "autour de la poule"],
  canard: ["sur la mare", "au bord de l'étang"],
  oiseau: ["sur le fil", "dans l'arbre", "sur le toit"],
  poisson: ["dans l'aquarium", "dans la rivière", "dans le bassin"],
  papillon: ["dans le jardin", "sur les fleurs"],
  coccinelle: ["sur la feuille", "dans le potager"],
  abeille: ["autour de la ruche", "sur les fleurs"],
  fourmi: ["sur le chemin", "près du goûter"],
  escargot: ["sur la salade", "après la pluie"],
  tortue: ["au zoo", "dans l'herbe"],
  lapin: ["dans le clapier", "dans le pré"],
  souris: ["dans la grange", "au grenier"],
  grenouille: ["sur les nénuphars", "au bord de la mare"],
  vache: ["dans le pré", "à la ferme"],
  cochon: ["dans la porcherie", "à la ferme"],
  mouton: ["dans la prairie", "dans la bergerie"],
};
/** L'araignée n'a pas de lieu ici : elle sert de PIÈGE (8 pattes) ailleurs. */
export const ANIMAUX_MONDE = Object.keys(LIEUX) as AnimalCanvasId[];

/** Ceux qui s'envolent quand ils partent. */
const VOLANTS = new Set<AnimalCanvasId>(["canard", "oiseau", "papillon", "coccinelle", "abeille"]);

export type Scene = { animal: AnimalCanvasId; mots: string; lieu: string };

/** Un animal du monde (jamais un de `sauf`) et un lieu qui lui va. */
export function sceneAnimale(sauf: readonly AnimalCanvasId[] = []): Scene {
  const animal = unParmi(ANIMAUX_MONDE.filter((a) => !sauf.includes(a)));
  return { animal, mots: FICHES[animal].pluriel, lieu: unParmi(LIEUX[animal]!) };
}

// ─── Les mots ─────────────────────────────────────────────────────────────────

const VOYELLE = /^[aeiouyàâéèêëîïôœh]/i;
/** « de poules », « d'abeilles ». */
export const de = (mots: string) => (VOYELLE.test(mots) ? `d'${mots}` : `de ${mots}`);
/** « la poule », « l'abeille », « le chat ». */
export function le(animal: AnimalCanvasId): string {
  const un = FICHES[animal].un;
  const nom = un.replace(/^une? /, "");
  if (VOYELLE.test(nom)) return `l'${nom}`;
  return un.startsWith("une ") ? `la ${nom}` : `le ${nom}`;
}
const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
export const PRENOMS = ["Lou", "Téo", "Inès", "Malo", "Jade", "Yanis", "Naïa", "Sacha", "Emma", "Noé", "Lina", "Amir"];

export function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

/** Une petite réponse entière, au pavé numérique enfant. */
export function auPave(text: string, n: number, explanation: string, canvas: AnimauxCanvasData): Q {
  return { text, format: "short", expected: [String(n)], comparator: "number_equal", saisie: "pave", explanation, canvas };
}

/** Un QCM, choix mélangés. */
export function enQcm(text: string, bonne: string, pieges: readonly string[], explanation: string, canvas: AnimauxCanvasData): Q {
  const autres = [...new Set(pieges)].filter((p) => p !== bonne).slice(0, 3);
  return { text, format: "qcm", choices: melange([bonne, ...autres]), expected: [bonne], comparator: "mcq_exact", explanation, canvas };
}

// ─── Les familles de questions ────────────────────────────────────────────────

/** Dénombrer une collection : « Compte les poules dans le poulailler. »
 *  `parDix` range par lignes de dix (au-delà de 20). */
export function denombrer(min: number, max: number, o: { parDix?: boolean; vrac?: boolean } = {}): Q {
  const s = sceneAnimale();
  const n = entre(min, max);
  const p = unParmi(PRENOMS);
  const text = unParmi([
    `Compte les ${s.mots} ${s.lieu}. Combien y en a-t-il ?`,
    `Combien ${de(s.mots)} vois-tu ${s.lieu} ?`,
    `${p} compte les ${s.mots} ${s.lieu}. Combien y en a-t-il ?`,
    `Regarde bien ${s.lieu}. Combien y a-t-il ${de(s.mots)} ?`,
  ]);
  const colonnes = o.parDix ? 10 : 5;
  const pleines = Math.floor(n / colonnes);
  return auPave(
    text,
    n,
    exp(
      "Le dernier nombre dit en comptant donne la quantité.",
      `On compte ligne par ligne : chaque ligne pleine en a ${colonnes === 10 ? "dix" : "cinq"}${o.vrac ? " ; on pointe chaque animal pour ne pas l'oublier" : ""}.`,
      pleines ? `${pleines} ligne${pleines > 1 ? "s" : ""} de ${colonnes} font ${pleines * colonnes}, il en reste ${n - pleines * colonnes} : cela fait ${n}.` : `On en compte ${n}.`,
      `Il y a ${n} ${s.mots}.`,
    ),
    animauxCanvas({ groupes: [{ animal: s.animal, nombre: n }], colonnes, disposition: o.vrac ? "vrac" : "grille", taille: o.parDix ? 40 : 48 }),
  );
}

/** Compter SEULEMENT un animal dans un mélange (en vrac) : on trie avant de compter. */
export function compterParmi(min: number, max: number): Q {
  const cible = sceneAnimale();
  const autre = sceneAnimale([cible.animal]);
  const n = entre(min, max);
  const m = entre(2, 5);
  const text = unParmi([
    `Dans le dessin, il y a des ${cible.mots} et des ${autre.mots}. Combien y a-t-il ${de(cible.mots)} ?`,
    `Compte seulement les ${cible.mots}. Combien y en a-t-il ?`,
    `Attention : ne compte que les ${cible.mots} ! Combien en vois-tu ?`,
  ]);
  return auPave(
    text,
    n,
    exp(
      "Compter une seule sorte d'objets, c'est laisser les autres de côté.",
      `On pointe chaque ${FICHES[cible.animal].un.replace(/^une? /, "")} une seule fois, et on saute les ${autre.mots}.`,
      `On compte ${n} ${cible.mots} (et ${m} ${autre.mots}, qu'on ne compte pas).`,
      `Il y a ${n} ${cible.mots}.`,
    ),
    animauxCanvas({
      groupes: [{ animal: cible.animal, nombre: n }, { animal: autre.animal, nombre: m }],
      colonnes: 4,
      disposition: "vrac",
      taille: 44,
    }),
  );
}

/** Comparer deux collections : plus, moins, autant (CP, QCM). */
export function comparerCollections(max: number): Q {
  const a = sceneAnimale();
  const b = sceneAnimale([a.animal]);
  const na = entre(3, max);
  // Autant : une fois sur huit environ ; sinon deux nombres différents.
  let nb = na;
  if (Math.random() >= 0.12) while (nb === na) nb = entre(3, max);
  const plusA = `Il y a plus ${de(a.mots)}.`;
  const plusB = `Il y a plus ${de(b.mots)}.`;
  const autant = `Il y a autant ${de(a.mots)} que ${de(b.mots)}.`;
  const bonne = na > nb ? plusA : nb > na ? plusB : autant;
  const text = unParmi([
    `Y a-t-il plus ${de(a.mots)} ou plus ${de(b.mots)} ?`,
    `Compare les ${a.mots} et les ${b.mots}. Que remarques-tu ?`,
    `À la ferme de ${unParmi(PRENOMS)}, qui sont les plus nombreux : les ${a.mots} ou les ${b.mots} ?`,
  ]);
  return enQcm(
    text,
    bonne,
    [plusA, plusB, autant],
    exp(
      "Pour comparer deux collections, on compte chacune (ou on les met une à une en face).",
      "On compte les animaux de chaque côté, puis on compare les deux nombres.",
      `${maj(a.mots)} : ${na}. ${maj(b.mots)} : ${nb}. ${na === nb ? `${na} = ${nb}` : na > nb ? `${na} > ${nb}` : `${na} < ${nb}`}.`,
      bonne,
    ),
    animauxCanvas({
      collections: [
        { nom: `les ${a.mots}`, groupes: [{ animal: a.animal, nombre: na }] },
        { nom: `les ${b.mots}`, groupes: [{ animal: b.animal, nombre: nb }] },
      ],
      taille: 40,
      description: `des ${a.mots} et des ${b.mots} à comparer`,
    }),
  );
}

/** Combien de plus (CE1, au pavé). */
export function combienDePlus(min: number, max: number): Q {
  const a = sceneAnimale();
  const b = sceneAnimale([a.animal]);
  const grand = entre(min + 2, max);
  const p2 = entre(Math.max(2, min), grand - 1);
  const text = unParmi([
    `Combien y a-t-il ${de(a.mots)} de plus que ${de(b.mots)} ?`,
    `Il y a plus ${de(a.mots)} que ${de(b.mots)}. Combien en plus ?`,
    `Quel est l'écart entre le nombre ${de(a.mots)} et le nombre ${de(b.mots)} ?`,
  ]);
  return auPave(
    text,
    grand - p2,
    exp(
      "« Combien de plus », c'est l'écart entre deux nombres.",
      "On compte chaque collection, puis on cherche ce qu'il faut ajouter au plus petit nombre pour avoir le plus grand.",
      `${maj(a.mots)} : ${grand}. ${maj(b.mots)} : ${p2}. ${grand} - ${p2} = ${grand - p2}.`,
      `Il y a ${grand - p2} ${a.mots} de plus.`,
    ),
    animauxCanvas({
      collections: [
        { nom: `les ${a.mots}`, groupes: [{ animal: a.animal, nombre: grand }] },
        { nom: `les ${b.mots}`, groupes: [{ animal: b.animal, nombre: p2 }] },
      ],
      taille: 36,
      description: `des ${a.mots} et des ${b.mots} à comparer`,
    }),
  );
}

/** Une file d'animaux tous différents : le rang (ordinal). */
export function fileOrdinal(o: { reponse: "animal" | "rang" }): Q {
  const n = entre(5, 7);
  const file = melange(ANIMAUX_MONDE).slice(0, n);
  const k = entre(2, n - 1);
  const cible = file[k - 1];
  const rangs = ["premier", "deuxième", "troisième", "quatrième", "cinquième", "sixième", "septième"];
  const canvas = animauxCanvas({
    groupes: file.map((animal) => ({ animal, nombre: 1 })),
    colonnes: n,
    melange: false,
    taille: 44,
    description: "une file d'animaux, de gauche à droite",
  });
  const sens = "en partant de la gauche";
  if (o.reponse === "animal") {
    const nom = (a: AnimalCanvasId) => maj(le(a)) + ".";
    const depuisDroite = file[n - k];
    return enQcm(
      unParmi([
        `Les animaux font la queue. Qui est ${rangs[k - 1]} ${sens} ?`,
        `Quel animal est à la ${rangs[k - 1]} place ${sens} ?`,
      ]),
      nom(cible),
      [nom(depuisDroite), nom(file[k - 2]), nom(file[k])],
      exp(
        "Le rang dit la place dans une file : premier, deuxième, troisième…",
        `On part de la gauche et on compte les places une à une jusqu'à ${k}.`,
        `1, 2, … ${k} : on s'arrête sur ${le(cible)}.`,
        `C'est ${le(cible)}.`,
      ),
      canvas,
    );
  }
  const ilElle = FICHES[cible].un.startsWith("une ") ? "elle" : "lui";
  if (Math.random() < 0.5)
    return auPave(
      `${maj(le(cible))} attend son tour. Combien d'animaux sont devant ${ilElle}, ${sens} ?`,
      k - 1,
      exp(
        "Les animaux « devant » sont ceux qui passent avant, sans compter celui qu'on regarde.",
        `On compte depuis la gauche jusqu'à ${le(cible)}, sans ${ilElle === "elle" ? "la" : "le"} compter.`,
        `${maj(le(cible))} est à la place ${k} : ${k} - 1 = ${k - 1}.`,
        `Il y a ${k - 1} animaux devant.`,
      ),
      canvas,
    );
  return auPave(
    `À quelle place est ${le(cible)} dans la file, ${sens} ? Tape le nombre.`,
    k,
    exp(
      "Le rang dit la place dans une file : premier, deuxième, troisième…",
      `On compte les animaux depuis la gauche jusqu'à ${le(cible)}, ${ilElle} compris${ilElle === "elle" ? "e" : ""}.`,
      `1, 2, … ${k}.`,
      `${maj(le(cible))} est à la place ${k}.`,
    ),
    canvas,
  );
}

/** Deux étapes : il en arrive, puis il en part (CP ★5). */
export function arriventPuisPartent(): Q {
  const s = sceneAnimale();
  const a = entre(4, 9);
  const b = entre(2, 6);
  const c = entre(2, Math.min(7, a + b - 1));
  const partir = VOLANTS.has(s.animal) ? "s'envolent" : "s'en vont";
  const r = a + b - c;
  return auPave(
    `Il y a ${a} ${s.mots} ${s.lieu}. ${b} autres arrivent. Puis ${c} ${partir}. Combien ${de(s.mots)} reste-t-il ${s.lieu} ?`,
    r,
    exp(
      "Quand il en arrive, le nombre augmente ; quand il en part, il diminue.",
      "On fait les étapes dans l'ordre de l'histoire : d'abord l'arrivée, puis le départ.",
      `${a} + ${b} = ${a + b}, puis ${a + b} - ${c} = ${r}.`,
      `Il reste ${r} ${s.mots}.`,
    ),
    animauxCanvas({
      collections: [
        { nom: "au début", groupes: [{ animal: s.animal, nombre: a }] },
        { nom: "ceux qui arrivent", groupes: [{ animal: s.animal, nombre: b }] },
      ],
      taille: 38,
      description: `des ${s.mots} : ceux du début et ceux qui arrivent`,
    }),
  );
}

/** r rangées de c : le total (addition répétée, multiplication). */
export function rangees(rMax: number, cMax: number) {
  const s = sceneAnimale();
  const r = entre(2, rMax);
  let c = entre(2, cMax);
  if (c === r) c = c === cMax ? c - 1 : c + 1;
  const canvas = animauxCanvas({
    groupes: [{ animal: s.animal, nombre: r * c }],
    colonnes: c,
    taille: c > 5 ? 36 : 44,
    description: `des ${s.mots} rangés en lignes`,
  });
  return { s, r, c, canvas };
}

export function rangeesTotal(rMax: number, cMax: number): Q {
  const { s, r, c, canvas } = rangees(rMax, cMax);
  return auPave(
    unParmi([
      `Il y a ${r} lignes de ${c} ${s.mots}. Combien y en a-t-il en tout ?`,
      `${s.lieu.charAt(0).toUpperCase() + s.lieu.slice(1)}, il y a ${r} rangées de ${c} ${s.mots}. Combien ${de(s.mots)} en tout ?`,
    ]),
    r * c,
    exp(
      "Quand on a plusieurs fois le même nombre, on peut multiplier.",
      `${r} lignes de ${c}, c'est ${c} répété ${r} fois.`,
      `${Array.from({ length: r }, () => c).join(" + ")} = ${r} × ${c} = ${r * c}.`,
      `Il y a ${r * c} ${s.mots}.`,
    ),
    canvas,
  );
}

export function rangeesAddition(rMax: number, cMax: number): Q {
  const { s, r, c, canvas } = rangees(rMax, cMax);
  const rep = (n: number, f: number) => Array.from({ length: f }, () => n).join(" + ");
  return enQcm(
    unParmi([
      `Il y a ${r} lignes de ${c} ${s.mots}. Quelle addition donne le nombre ${de(s.mots)} ?`,
      `Regarde les lignes ${de(s.mots)}. Quel calcul permet de les compter toutes ?`,
    ]),
    rep(c, r),
    // ⚠️ Jamais « r répété c fois » : même total, ce serait une 2e bonne réponse.
    [`${r} + ${c}`, rep(c, r + 1), rep(c + 1, r), rep(r, r)],
    exp(
      "Une addition répétée ajoute plusieurs fois le même nombre.",
      `Chaque ligne a ${c} ${s.mots}, et il y a ${r} lignes.`,
      `${rep(c, r)} = ${r * c}.`,
      `On ajoute ${r} fois ${c}.`,
    ),
    canvas,
  );
}

export function rangeesMultiplication(rMax: number, cMax: number): Q {
  const { s, r, c, canvas } = rangees(rMax, cMax);
  return enQcm(
    unParmi([
      `Il y a ${r} lignes de ${c} ${s.mots}. Quelle multiplication donne le nombre ${de(s.mots)} ?`,
      `Quel calcul avec × permet de compter les ${s.mots} rangés en ${r} lignes de ${c} ?`,
    ]),
    `${r} × ${c}`,
    // ⚠️ « c × r » est aussi juste (commutativité) : jamais parmi les pièges.
    [`${r} + ${c}`, `${r} × ${c + 1}`, `${r + 1} × ${c}`, `${c} × ${c}`],
    exp(
      "« 3 × 4 » se lit « 3 fois 4 » : 3 groupes de 4.",
      `${r} lignes, ${c} ${s.mots} dans chaque ligne.`,
      `${r} × ${c} = ${r * c}.`,
      `La multiplication est ${r} × ${c}.`,
    ),
    canvas,
  );
}

export function rangeesCommutativite(rMax: number, cMax: number): Q {
  const { s, r, c, canvas } = rangees(rMax, cMax);
  return enQcm(
    `Il y a ${r} lignes de ${c} ${s.mots} : on fait ${r} × ${c}. Si on compte par COLONNES, quelle multiplication trouve-t-on ?`,
    `${c} × ${r}`,
    [`${c} + ${r}`, `${c} × ${c}`, `${r} × ${r}`, `${c} × ${r + 1}`],
    exp(
      "On peut multiplier dans n'importe quel ordre : le résultat ne change pas.",
      `Il y a ${c} colonnes, et chacune a ${r} ${s.mots}.`,
      `${c} × ${r} = ${r} × ${c} = ${r * c}.`,
      `On trouve ${c} × ${r}, le même nombre ${de(s.mots)}.`,
    ),
    canvas,
  );
}

/** Combien de pattes pour k animaux (4, 6 ou 8 pattes : la multiplication). */
const A_PATTES: readonly AnimalCanvasId[] = ["poule", "canard", "oiseau", "chat", "chien", "vache", "lapin", "mouton", "coccinelle", "fourmi", "abeille", "araignee"];
export function pattes(kMax: number): Q {
  const animal = unParmi(A_PATTES);
  const f = FICHES[animal];
  const k = entre(2, kMax);
  const total = k * f.pattes;
  return auPave(
    unParmi([
      `Combien de pattes ont ces ${k} ${f.pluriel} en tout ?`,
      `${unParmi(PRENOMS)} compte les pattes des ${f.pluriel}. Combien en trouve-t-on ?`,
    ]),
    total,
    exp(
      `${maj(f.un)} a ${f.pattes} pattes.`,
      `${k} animaux de ${f.pattes} pattes : on ajoute ${k} fois ${f.pattes}.`,
      `${Array.from({ length: k }, () => f.pattes).join(" + ")} = ${k} × ${f.pattes} = ${total}.`,
      `Il y a ${total} pattes.`,
    ),
    animauxCanvas({
      groupes: [{ animal, nombre: k }],
      colonnes: Math.min(k, 5),
      taille: 56,
      description: `des ${f.pluriel}`,
    }),
  );
}

/** Partager en parts égales (CE1, division). */
const RANGES: Partial<Record<AnimalCanvasId, [string, string]>> = {
  poisson: ["aquarium", "aquariums"],
  poule: ["poulailler", "poulaillers"],
  lapin: ["clapier", "clapiers"],
  mouton: ["enclos", "enclos"],
  cochon: ["enclos", "enclos"],
  vache: ["pré", "prés"],
  tortue: ["bassin", "bassins"],
  canard: ["mare", "mares"],
  escargot: ["terrarium", "terrariums"],
  poussin: ["panier", "paniers"],
};
export function partager(): Q {
  const animal = unParmi(Object.keys(RANGES) as AnimalCanvasId[]);
  const [sg, pl] = RANGES[animal]!;
  const p = entre(2, 5);
  const q = entre(2, 5);
  const n = p * q;
  const mots = FICHES[animal].pluriel;
  const fem = sg === "mare";
  return auPave(
    unParmi([
      `Le soigneur répartit ces ${n} ${mots} dans ${p} ${pl}, autant dans chacun${fem ? "e" : ""}. Combien ${de(mots)} dans chaque ${sg} ?`,
      `On partage les ${n} ${mots} en ${p} groupes égaux. Combien ${de(mots)} dans chaque groupe ?`,
    ]),
    q,
    exp(
      "Partager en parts égales, c'est donner autant à chaque part.",
      `On distribue les ${mots} un par un dans les ${p} parts, jusqu'à ce qu'il n'en reste plus.`,
      `${p} × ${q} = ${n}, donc ${n} : ${p} = ${q}.`,
      `Il y a ${q} ${mots} dans chaque part.`,
    ),
    animauxCanvas({ groupes: [{ animal, nombre: n }], colonnes: 5, taille: 40, description: `des ${mots} à partager` }),
  );
}

export type { AnimauxCollection, AnimauxGroupe };
