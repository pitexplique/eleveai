// lib/tutor-v4/questionBank/ce1/maths/division-partage.bank.ts
//
// Les partages et les groupements du CE1, écrits à la main.
//
// PÉRIMÈTRE BO (Annexe 4, programme de mathématiques du cycle 2). ⚠️ La
// division n'est PAS une opération du CE1 : elle n'apparaît pas dans les
// quatre opérations. Mais le partage équitable et le groupement sont des
// STRUCTURES DE PROBLÈME nommées par le programme, dans les problèmes
// multiplicatifs en une étape :
//   — chercher le NOMBRE DE PARTS à partir du total et de la valeur d'une
//     part : « Un fermier a 75 œufs à vendre au marché. Il les vend par boites
//     de 6. Combien de boites va-t-il pouvoir vendre ? » ;
//   — chercher la VALEUR D'UNE PART : « Trois enfants se partagent
//     18 images » ;
//   — et, dans ces situations, un RESTE qu'il faut interpréter.
// On ne pose donc aucune division : on distribue, on groupe, on compte. On dit
// « partager », jamais « 18/3 » ni « 18 ÷ 3 » (le signe arrive au CE2).
//
// LE PIÈGE DE LA NOTION : le reste qu'on jette. 26 élèves, des voitures de
// 5 places : 5 voitures ne suffisent pas, il en faut 6 — la sixième ne
// transporte qu'un enfant, mais on ne le laisse pas à l'école. Selon
// l'histoire, le reste s'arrondit vers le haut ou se laisse de côté.
//
// ⭐ 10/11/2026 — LE SCHÉMA DE BILLES. Frédéric adore les schémas de billes
// pour × et partage : le total est DESSINÉ (jetons dans des cadres de dix, ou
// les objets de la bibliothèque), l'enfant le distribue du doigt. Le dessin
// montre le tout, jamais les parts déjà faites. Et chaque gabarit tire une
// histoire × une tournure × un prénom (les squelettes revenaient 13 à 16 fois
// sur 20). Outils : ./calcul-outils-ce1.ts.
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CE1 clique, il ne tape pas.

import type { DifficultyLevel, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import {
  type Q,
  ri,
  rc,
  pile,
  maj,
  pl,
  exp,
  court,
  qcmTexte,
  nombreOuQcm,
  enfant,
  deuxEnfants,
  chose,
  dessinJetons,
  dessinQuantite,
  dessinUnPaquet,
  dessinArgent,
} from "./calcul-outils-ce1";

function gab(
  id: string,
  microId: string,
  difficulty: DifficultyLevel,
  hint: string,
  tags: string[],
  generate: () => Q,
): TutorBankItemV4 {
  return {
    kind: "template",
    id,
    niveau: "ce1",
    matiere: "maths",
    notionId: "division_partage",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["ce1", "division_partage", ...tags, "template"],
    generate,
  };
}

/** Qui se partage : « 3 enfants », « Nina et ses 2 amis »… */
function partageurs(n: number) {
  const p = enfant();
  return rc([
    { qui: `${n} enfants`, chacun: "chaque enfant" },
    { qui: `${n} amis`, chacun: "chaque ami" },
    { qui: `les ${n} pirates du bateau`, chacun: "chaque pirate" },
    { qui: `${n} copains de la classe de ${p.nom}`, chacun: "chaque copain" },
    { qui: `les ${n} lutins de la forêt`, chacun: "chaque lutin" },
    { qui: `${n} astronautes de la fusée`, chacun: "chaque astronaute" },
    { qui: `les ${n} joueurs de l'équipe`, chacun: "chaque joueur" },
    { qui: `${n} petits dragons`, chacun: "chaque petit dragon" },
  ]);
}

/** Les paquets qu'on remplit (groupements). */
const CONTENANTS = [
  { un: "sachet", des: "sachets", quoi: "billes" },
  { un: "boîte", des: "boîtes", quoi: "œufs" },
  { un: "panier", des: "paniers", quoi: "pommes", objet: "pomme" as const },
  { un: "vase", des: "vases", quoi: "fleurs", objet: "fleur" as const },
  { un: "bocal", des: "bocaux", quoi: "poissons", objet: "poisson" as const },
  { un: "filet", des: "filets", quoi: "ballons", objet: "ballon" as const },
  { un: "pochette", des: "pochettes", quoi: "images" },
  { un: "assiette", des: "assiettes", quoi: "crêpes" },
  { un: "coffre", des: "coffres", quoi: "pièces d'or" },
  { un: "pot", des: "pots", quoi: "crayons" },
  { un: "étagère", des: "étagères", quoi: "livres", objet: "livre" as const },
  { un: "bouquet", des: "bouquets", quoi: "tulipes" },
];

/** Le total à partager, dessiné : objets si on sait, sinon jetons. */
function dessinTotal(quoi: string, objet: Parameters<typeof dessinUnPaquet>[0] | undefined, n: number) {
  if (objet && n <= 15) return dessinQuantite({ pl: quoi, sg: quoi, objet }, n);
  if (n <= 40) return dessinJetons(n);
  return undefined;
}

export const divisionPartageBank: TutorBankItemV4[] = [
  /* =========================================================
     CE1_DIVISION_PARTAGE — chercher la valeur d'une part
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_division_partage_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "division_partage",
    microId: "ce1_division_partage",
    difficulty: 3,
    theme: "neutral",
    text: "Trois enfants se partagent 18 images. Tous doivent avoir le même nombre d'images. Combien chaque enfant en aura-t-il ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Distribue les images une à une, à tour de rôle.",
    explanation: exp(
      "Partager équitablement, c'est donner autant à chacun, sans favoriser personne.",
      "On distribue les objets un par un, à tour de rôle, jusqu'à ce qu'il n'en reste plus.",
      "18 images pour 3 enfants : chacun en reçoit 6, car 3 × 6 = 18.",
      "Chaque enfant aura 6 images.",
    ),
    tags: ["ce1", "division_partage", "partage"],
  },
  {
    kind: "fixed",
    id: "ce1_division_partage_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "division_partage",
    microId: "ce1_division_partage",
    difficulty: 4,
    theme: "neutral",
    text: "Enzo veut partager 9 € entre ses deux sœurs et lui, à parts égales. Combien chacun recevra-t-il ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Attention : Enzo se compte aussi.",
    explanation: exp(
      "Partager équitablement, c'est donner la même somme à chacun.",
      "On compte d'abord combien de personnes se partagent, en n'oubliant personne.",
      "Enzo et ses deux sœurs font 3 personnes. 9 € pour 3 personnes : 3 € chacun, car 3 × 3 = 9.",
      "Chacun recevra 3 €.",
    ),
    tags: ["ce1", "division_partage", "partage", "piege"],
  },
  gab(
    "ce1_division_partage_tpl_1",
    "ce1_division_partage",
    3,
    "Distribue un par un, à tour de rôle : chacun en reçoit autant.",
    ["partage"],
    () => {
      const n = ri(2, 5);
      const chacun = ri(2, 8);
      const total = n * chacun;
      const c = chose();
      const p = enfant();
      const s = partageurs(n);
      const dessin = pile(0.75) ? dessinQuantite(c, total) : undefined;
      const voici = dessin ? "Regarde le dessin. " : "";
      const explication = exp(
        "Partager équitablement, c'est donner autant à chacun.",
        "On distribue les objets un par un, à tour de rôle, jusqu'à ce qu'il n'en reste plus. Ou on cherche le nombre qui, répété autant de fois qu'il y a de parts, redonne le total.",
        `${n} × ${chacun} = ${total} : ${s.chacun} reçoit ${chacun} ${c.pl}.`,
        `Chacun en reçoit ${chacun}.`,
      );
      if (pile(0.2)) {
        const juste = pile();
        const dit = juste ? chacun : chacun + rc([1, -1]);
        return qcmTexte(
          `${voici}${p.nom} partage ${total} ${c.pl} entre ${s.qui}. ${maj(p.il)} dit : « ${maj(s.chacun)} en aura ${dit}. » A-t-${p.il} raison ?`,
          juste ? "oui" : "non",
          [juste ? "non" : "oui"],
          exp(
            "Partager équitablement, c'est donner autant à chacun.",
            "On vérifie : le nombre de parts fois la part doit redonner le total.",
            `${n} × ${dit} = ${n * dit}${juste ? ` : c'est bien ${total}.` : `, et pas ${total}. Le bon partage donne ${chacun} à chacun.`}`,
            juste ? "Oui, il a raison." : `Non : chacun en aura ${chacun}.`,
          ),
          dessin,
        );
      }
      return nombreOuQcm(
        `${voici}${rc([
          `${maj(s.qui)} se partagent ${total} ${c.pl}, à parts égales. Combien de ${c.pl} pour ${s.chacun} ?`,
          `${p.nom} partage ${total} ${c.pl} entre ${s.qui}. Tous doivent en avoir autant. Combien ${s.chacun} en reçoit-il ?`,
          `${p.nom} distribue ${total} ${c.pl} à ${s.qui}, un par un, à tour de rôle. Combien ${s.chacun} en a-t-il à la fin ?`,
          `On partage ${total} ${c.pl} en ${n} parts égales pour ${s.qui}. Combien dans chaque part ? Aide ${p.nom} !`,
        ])}`,
        chacun,
        [chacun + 1, chacun - 1, total - n, n],
        explication,
        dessin,
      );
    },
  ),
  gab(
    "ce1_division_partage_tpl_2",
    "ce1_division_partage",
    4,
    "Compte bien combien de personnes se partagent, sans oublier personne.",
    ["partage", "piege"],
    () => {
      const p = enfant();
      const famille = rc(["lui_aussi", "argent", "grand"] as const);
      if (famille === "lui_aussi") {
        const amis = ri(1, 4);
        const n = amis + 1;
        const chacun = ri(2, 8);
        const total = n * chacun;
        const c = chose();
        return nombreOuQcm(
          rc([
            `${p.nom} partage ${total} ${c.pl} entre ${p.il === "il" ? "lui" : "elle"} et ${pl(amis, "ami", "amis")}, à parts égales. Combien de ${c.pl} chacun aura-t-il ?`,
            `${p.nom} et ${pl(amis, "copain", "copains")} se partagent ${total} ${c.pl}. Tous en ont autant. Combien chacun en a-t-il ?`,
            `Pour le goûter, ${p.nom} partage ${total} ${c.pl} avec ${pl(amis, "ami", "amis")}. ${maj(p.il)} en garde autant que les autres. Combien chacun en a-t-il ?`,
          ]),
          chacun,
          [Math.floor(total / amis) === total / amis ? total / amis : chacun + 1, chacun + 1, chacun - 1, n],
          exp(
            "Partager équitablement, c'est donner la même chose à chacun, en n'oubliant personne.",
            `On compte d'abord les personnes : ${p.nom} se compte aussi.`,
            `${p.nom} et ${pl(amis, "ami", "amis")}, cela fait ${n} personnes. ${n} × ${chacun} = ${total} : chacun en a ${chacun}.`,
            `Chacun aura ${chacun} ${c.pl}.`,
          ),
          dessinQuantite(c, total),
        );
      }
      if (famille === "argent") {
        const n = ri(2, 4);
        const piece = rc([1, 2, 5] as const);
        const parPersonne = piece * ri(1, piece === 5 ? 2 : 3);
        const total = n * parPersonne;
        const nbPieces = total / piece;
        const [x, y] = deuxEnfants();
        return nombreOuQcm(
          rc([
            `${x.nom} et ${pl(n - 1, "ami", "amis")} ont gagné ces pièces à la kermesse. Ils se les partagent à parts égales. Combien d'euros pour chacun ?`,
            `Mamie donne ces pièces à ${n} petits-enfants, dont ${x.nom} et ${y.nom}. Chacun doit avoir autant. Combien d'euros chacun reçoit-il ?`,
            `Voici ${total} €. ${x.nom} les partage entre ${n} enfants, à parts égales. Combien d'euros pour chacun ?`,
          ]),
          parPersonne,
          [parPersonne + 1, parPersonne - 1, nbPieces, total].filter((v) => v !== parPersonne && v > 0),
          exp(
            "Partager une somme, c'est donner autant d'euros à chacun.",
            "On distribue les pièces une par une, ou on cherche le nombre qui, répété, redonne le total.",
            `Il y a ${total} €. ${n} × ${parPersonne} = ${total} : chacun reçoit ${parPersonne} €.`,
            `Chacun reçoit ${parPersonne} €.`,
          ),
          nbPieces <= 10 ? { kind: "monnaie", elements: [{ valeur: piece === 1 ? "1e" : piece === 2 ? "2e" : "5e", nombre: nbPieces }] } : dessinArgent(total),
          "€",
        );
      }
      const n = rc([2, 3, 4, 5, 10] as const);
      const chacun = ri(3, 10);
      const total = n * chacun;
      const k = rc(CONTENANTS);
      return nombreOuQcm(
        rc([
          `${p.nom} doit ranger ${total} ${k.quoi} dans ${n} ${k.des}, autant dans chacun. Combien de ${k.quoi} par ${k.un} ?`,
          `La maîtresse de ${p.nom} partage ${total} ${k.quoi} entre ${n} groupes, à parts égales. Combien pour chaque groupe ?`,
          `Le jardinier plante ${total} ${k.quoi === "tulipes" || k.quoi === "fleurs" ? k.quoi : "graines"} en ${n} rangs égaux. ${p.nom} veut savoir combien par rang. Combien ?`,
        ]),
        chacun,
        [chacun + 1, chacun - 1, total - n, n],
        exp(
          "Partager équitablement, c'est donner autant à chaque part.",
          "On cherche le nombre qui, répété autant de fois qu'il y a de parts, redonne le total.",
          `${n} × ${chacun} = ${total}.`,
          `Il y en a ${chacun} dans chaque part.`,
        ),
        total <= 40 && pile(0.7) ? dessinJetons(total) : undefined,
      );
    },
  ),

  /* =========================================================
     CE1_DIVISION_GROUPEMENT — chercher le nombre de parts
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_division_groupement_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "division_partage",
    microId: "ce1_division_groupement",
    difficulty: 4,
    theme: "neutral",
    text: "Je veux ranger 180 photos dans un album. Je peux ranger 10 photos par page. Combien de pages me faut-il ?",
    format: "short",
    expected: ["18"],
    comparator: "number_equal",
    hint: "Combien de fois 10 tient-il dans 180 ?",
    explanation: exp(
      "Grouper, c'est faire des paquets de taille connue et compter les paquets.",
      "On cherche combien de fois le contenu d'une page tient dans le total.",
      "10 × 18 = 180 : il faut 18 pages pour ranger toutes les photos.",
      "Il me faut 18 pages.",
    ),
    tags: ["ce1", "division_partage", "groupement"],
  },
  gab(
    "ce1_division_groupement_tpl_1",
    "ce1_division_groupement",
    4,
    "Fais des paquets pleins et compte les paquets.",
    ["groupement"],
    () => {
      const k = rc(CONTENANTS);
      const taille = rc([2, 3, 4, 5, 10] as const);
      const paquets = ri(3, taille === 10 ? 12 : 9);
      const total = taille * paquets;
      const p = enfant();
      const dessin = pile(0.75) ? dessinTotal(k.quoi, k.objet, total) ?? ("objet" in k && k.objet && taille <= 5 ? dessinUnPaquet(k.objet, taille, `1 ${k.un}`) : undefined) : undefined;
      return nombreOuQcm(
        `${dessin ? "Regarde le dessin. " : ""}${rc([
          `${p.nom} a ${total} ${k.quoi}. ${maj(p.il)} les range par ${k.des} de ${taille}. Combien de ${k.des} remplit-${p.il} ?`,
          `On met ${taille} ${k.quoi} dans chaque ${k.un}. Il y a ${total} ${k.quoi}. Combien de ${k.des} faut-il ? Aide ${p.nom} !`,
          `Avec ${total} ${k.quoi}, ${p.nom} fait des ${k.des} de ${taille}. Combien de ${k.des} pleins fait-${p.il} ?`,
          `Un marchand range ${total} ${k.quoi} par ${k.des} de ${taille}. ${p.nom} compte les ${k.des}. Combien en trouve-t-${p.il} ?`,
        ])}`,
        paquets,
        [paquets + 1, paquets - 1, total - taille, taille],
        exp(
          "Grouper, c'est faire des paquets de taille connue et compter les paquets.",
          "On entoure des paquets pleins jusqu'à épuiser le total, ou on cherche combien de fois la taille d'un paquet tient dans le total.",
          `${taille} × ${paquets} = ${total} : il y a ${paquets} ${k.des}.`,
          `Il faut ${paquets} ${k.des}.`,
        ),
        dessin,
      );
    },
  ),
  gab(
    "ce1_division_groupement_tpl_2",
    "ce1_division_groupement",
    4,
    "Combien de fois la même quantité tient-elle dans le total ?",
    ["groupement"],
    () => {
      const p = enfant();
      const taille = rc([2, 3, 4, 5, 10] as const);
      const groupes = ri(2, 9);
      const total = taille * groupes;
      const histoires = [
        { t: `${total} enfants font des équipes de ${taille} pour le match. ${p.nom} compte les équipes.`, q: "Combien y a-t-il d'équipes ?", u: "équipes" },
        { t: `Au cirque, ${total} spectateurs s'assoient sur des bancs de ${taille} places, tous pleins. ${p.nom} les compte.`, q: "Combien de bancs sont occupés ?", u: "bancs" },
        { t: `La cantine a ${total} élèves. Chaque table accueille ${taille} élèves. ${p.nom} aide à placer tout le monde.`, q: "Combien de tables faut-il ?", u: "tables" },
        { t: `${p.nom} colle ${total} autocollants, ${taille} par page.`, q: `Combien de pages remplit-${p.il} ?`, u: "pages" },
        { t: `Le petit train emmène ${total} enfants, ${taille} par wagon. ${p.nom} est dans le dernier.`, q: "Combien de wagons y a-t-il ?", u: "wagons" },
        { t: `${p.nom} a ${total} € en ${taille === 10 ? "billets" : "pièces"} de ${taille} €.`, q: `Combien de ${taille === 10 ? "billets" : "pièces"} a-t-${p.il} ?`, u: taille === 10 ? "billets" : "pièces" },
        { t: `La poule pond ${taille} œufs par semaine. ${p.nom} a ramassé ${total} œufs.`, q: "Pendant combien de semaines a-t-elle pondu ?", u: "semaines" },
        { t: `Pic le paille-en-queue mange ${taille} graines à chaque repas. ${p.nom} lui a donné ${total} graines.`, q: "Combien de repas cela fait-il ?", u: "repas" },
      ];
      // La pièce de 3 € ou de 4 € n'existe pas : l'histoire d'argent ne sert
      // qu'avec 2, 5 et 10 €.
      const argentPossible = taille === 2 || taille === 5 || taille === 10;
      const h = rc(histoires.filter((x) => argentPossible || (x.u !== "pièces" && x.u !== "billets")));
      const piece = h.u === "pièces" || h.u === "billets";
      const v = taille;
      const g = groupes;
      return nombreOuQcm(
        `${h.t} ${h.q}`,
        g,
        [g + 1, g - 1, total - v, v],
        exp(
          "Grouper, c'est faire des paquets de même taille et les compter.",
          `On cherche combien de fois ${v} tient dans ${total}.`,
          `${v} × ${g} = ${total} : cela fait ${g} ${h.u}.`,
          `Cela fait ${g} ${h.u}.`,
        ),
        piece
          ? undefined
          : total <= 40 && pile(0.75)
            ? dessinJetons(total)
            : undefined,
      );
    },
  ),

  /* =========================================================
     CE1_DIVISION_RESTE — le reste, et ce qu'on en fait
     LE piège : le reste qu'on jette alors qu'il compte.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_division_reste_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "division_partage",
    microId: "ce1_division_reste",
    difficulty: 4,
    theme: "neutral",
    text: "Un fermier a 75 œufs. Il les vend par boites de 6. Combien de boites PLEINES peut-il vendre ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Fais des paquets de 6 jusqu'à ne plus pouvoir en remplir un entier.",
    explanation: exp(
      "Quand on groupe, il reste parfois des objets qui ne suffisent pas à faire un paquet de plus.",
      "On compte les paquets pleins, puis on regarde ce qui reste.",
      "6 × 12 = 72. Il reste 75 - 72 = 3 œufs, pas assez pour une treizième boite. Il vend donc 12 boites pleines.",
      "Il peut vendre 12 boites pleines.",
    ),
    tags: ["ce1", "division_partage", "reste"],
  },
  {
    kind: "fixed",
    id: "ce1_division_reste_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "division_partage",
    microId: "ce1_division_reste",
    difficulty: 5,
    theme: "reunion",
    text: "26 élèves partent en sortie. Chaque voiture transporte 5 élèves. Combien faut-il de voitures pour que TOUS partent ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Cinq voitures suffisent-elles vraiment pour tout le monde ?",
    explanation: exp(
      "Quand on groupe, le reste change la réponse selon la question posée.",
      "On compte les voitures pleines, puis on se demande ce qu'on fait de ceux qui restent.",
      "5 × 5 = 25 : cinq voitures emmènent 25 élèves. Il reste 1 élève. On ne le laisse pas à l'école : il faut une sixième voiture.",
      "Il faut 6 voitures.",
    ),
    tags: ["ce1", "division_partage", "reste", "piege", "reunion"],
  },
  gab(
    "ce1_division_reste_tpl_1",
    "ce1_division_reste",
    5,
    "Fais les paquets pleins, puis regarde ce qui reste.",
    ["reste"],
    () => {
      const taille = rc([2, 3, 4, 5] as const);
      const paquets = ri(2, 7);
      const reste = ri(1, taille - 1);
      const total = taille * paquets + reste;
      const k = rc(CONTENANTS);
      const p = enfant();
      const dessin = pile(0.75) ? dessinTotal(k.quoi, k.objet, total) : undefined;
      const voici = dessin ? "Regarde le dessin. " : "";
      const explication = exp(
        "Quand on groupe, il reste parfois des objets qui ne suffisent pas à remplir un paquet de plus.",
        "On compte les paquets pleins, puis on enlève ce qu'ils contiennent au total.",
        `${taille} × ${paquets} = ${taille * paquets}. Il reste ${total} - ${taille * paquets} = ${reste} ${k.quoi}, pas assez pour un paquet de plus.`,
        `${paquets} ${k.des} pleins, et il reste ${reste} ${k.quoi}.`,
      );
      if (pile()) {
        return nombreOuQcm(
          `${voici}${rc([
            `${p.nom} range ${total} ${k.quoi} par ${k.des} de ${taille}. Combien de ${k.quoi} restent en dehors des ${k.des} pleins ?`,
            `On fait des ${k.des} de ${taille} avec ${total} ${k.quoi}. Combien de ${k.quoi} reste-t-il à la fin ? Aide ${p.nom}.`,
            `${p.nom} a ${total} ${k.quoi}. ${maj(p.il)} remplit des ${k.des} de ${taille}. Combien lui en reste-t-il de côté ?`,
          ])}`,
          reste,
          [reste + 1, taille, 0, paquets].filter((v) => v !== reste),
          explication,
          dessin,
        );
      }
      return nombreOuQcm(
        `${voici}${rc([
          `${p.nom} range ${total} ${k.quoi} par ${k.des} de ${taille}. Combien de ${k.des} PLEINS remplit-${p.il} ?`,
          `Avec ${total} ${k.quoi}, ${p.nom} fait des ${k.des} de ${taille}. Combien de ${k.des} bien pleins obtient-${p.il} ?`,
          `Le marchand vend ses ${k.quoi} par ${k.des} de ${taille}. Il en a ${total}. Combien de ${k.des} pleins peut-il vendre à ${p.nom} et aux autres ?`,
        ])}`,
        paquets,
        [paquets + 1, paquets - 1, reste, total - taille].filter((v) => v !== paquets),
        explication,
        dessin,
      );
    },
  ),
  gab(
    "ce1_division_reste_tpl_2",
    "ce1_division_reste",
    5,
    "Ceux qui restent doivent partir aussi.",
    ["reste", "piege"],
    () => {
      const parVehicule = rc([2, 3, 4, 5] as const);
      const pleins = ri(2, 7);
      const reste = ri(1, parVehicule - 1);
      const total = parVehicule * pleins + reste;
      const p = enfant();
      const h = rc([
        { qui: "élèves", vehicule: "voiture", un: "Une", vehicules: "voitures", verbe: "transporte" },
        { qui: "enfants", vehicule: "barque", un: "Une", vehicules: "barques", verbe: "emmène" },
        { qui: "joueurs", vehicule: "minibus", un: "Un", vehicules: "minibus", verbe: "transporte" },
        { qui: "astronautes", vehicule: "fusée", un: "Une", vehicules: "fusées", verbe: "emporte" },
        { qui: "enfants", vehicule: "nacelle de la grande roue", un: "Une", vehicules: "nacelles", verbe: "accueille" },
        { qui: "lutins", vehicule: "traîneau", un: "Un", vehicules: "traîneaux", verbe: "emmène" },
        { qui: "pirates", vehicule: "chaloupe", un: "Une", vehicules: "chaloupes", verbe: "emporte" },
      ]);
      const dessin = total <= 40 && pile(0.75) ? dessinJetons(total, undefined, `Un jeton = un des ${h.qui}`) : undefined;
      const explication = exp(
        "Le reste ne se jette pas : il faut décider ce qu'on en fait, selon l'histoire.",
        "On compte les véhicules pleins, puis on en ajoute un pour ceux qui restent.",
        `${parVehicule} × ${pleins} = ${parVehicule * pleins}. Il reste ${reste} ${h.qui} : il faut un véhicule de plus, donc ${pleins + 1} en tout.`,
        `Il faut ${pleins + 1} ${h.vehicules}.`,
      );
      if (pile(0.25)) {
        return qcmTexte(
          `${total} ${h.qui} partent. Chaque ${h.vehicule} ${h.verbe} ${parVehicule} ${h.qui}. ${p.nom} dit : « Il faut ${pleins} ${h.vehicules}. » A-t-${p.il} raison ?`,
          `non, il en faut ${pleins + 1} pour que tous partent`,
          ["oui, c'est juste", `non, il en faut ${pleins - 1}`, `non, il en faut ${total}`],
          explication,
          dessin,
        );
      }
      return nombreOuQcm(
        rc([
          `${total} ${h.qui} partent avec ${p.nom}. Chaque ${h.vehicule} ${h.verbe} ${parVehicule} ${h.qui}. Combien faut-il de ${h.vehicules} pour que tous partent ?`,
          `${p.nom} organise le départ de ${total} ${h.qui}. ${h.un} ${h.vehicule} ${h.verbe} ${parVehicule} ${h.qui}. Combien de ${h.vehicules} faut-il, au moins ?`,
          `Il y a ${total} ${h.qui}. On en met ${parVehicule} par ${h.vehicule}. ${p.nom} veut que personne ne reste. Combien de ${h.vehicules} faut-il ?`,
        ]),
        pleins + 1,
        [pleins, pleins + 2, reste, total - parVehicule].filter((v) => v !== pleins + 1),
        explication,
        dessin,
      );
    },
  ),

  /* =========================================================
     CE1_DIVISION_DEFI — les défis
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_division_defi_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "division_partage",
    microId: "ce1_division_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Dans l'école, il y a 200 élèves. On veut faire 40 équipes qui ont toutes le même nombre d'élèves. Combien y aura-t-il d'élèves par équipe ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Cherche le nombre qui, répété 40 fois, fait 200.",
    explanation: exp(
      "Chercher la valeur d'une part, c'est partager équitablement le total entre toutes les parts.",
      "On cherche le nombre qui, répété autant de fois qu'il y a d'équipes, redonne le total.",
      "40 × 5 = 200 : chaque équipe compte 5 élèves.",
      "Il y aura 5 élèves par équipe.",
    ),
    tags: ["ce1", "division_partage", "defi"],
  },
  gab(
    "ce1_division_defi_tpl_1",
    "ce1_division_defi",
    5,
    "Deux étapes : partage d'abord, puis la suite de l'histoire.",
    ["defi"],
    () => {
      const p = enfant();
      const n = ri(2, 5);
      const chacun = ri(3, 8);
      const total = n * chacun;
      const enPlus = ri(1, 6);
      const c = chose();
      const plus = pile(0.6);
      const fin = plus ? chacun + enPlus : chacun - Math.min(enPlus, chacun - 1);
      const k = plus ? enPlus : Math.min(enPlus, chacun - 1);
      const dessin = pile(0.7) ? dessinQuantite(c, total) : undefined;
      return nombreOuQcm(
        `${dessin ? "Regarde le dessin. " : ""}${rc([
          `${p.nom} partage ${total} ${c.pl} entre ${n} enfants, à parts égales. Puis chaque enfant en ${plus ? `reçoit ${k} de plus` : `perd ${k}`}. Combien chacun en a-t-il à la fin ?`,
          `${p.nom} partage ${total} ${c.pl} entre ${n} amis, autant à chacun. Puis ${p.il} ${plus ? `donne encore ${k} ${c.pl} à chacun` : `reprend ${k} ${c.pl} à chacun`}. Combien chaque ami en a-t-il ?`,
          `Les ${n} pirates de ${p.nom} se partagent ${total} ${c.pl}. Ensuite, chacun en ${plus ? `trouve ${k} autres` : `perd ${k}`}. Combien chaque pirate en a-t-il maintenant ?`,
        ])}`,
        fin,
        [chacun, total + k, fin + 1, fin - 1].filter((v) => v !== fin && v >= 0),
        exp(
          "Un problème à deux étapes se résout dans l'ordre où les choses se passent.",
          `On partage d'abord, puis on ${plus ? "ajoute" : "enlève"}.`,
          `${total} pour ${n} : chacun en reçoit ${chacun}, car ${n} × ${chacun} = ${total}. Puis ${chacun} ${plus ? "+" : "-"} ${k} = ${fin}.`,
          `Chacun en a ${fin}.`,
        ),
        dessin,
      );
    },
  ),
  gab(
    "ce1_division_defi_tpl_2",
    "ce1_division_defi",
    5,
    "Le partage tombe-t-il juste ?",
    ["defi", "piege"],
    () => {
      const p = enfant();
      const n = rc([2, 3, 4, 5] as const);
      const chacun = ri(2, 7);
      const juste = pile();
      const r = juste ? 0 : ri(1, n - 1);
      const total = n * chacun + r;
      const c = chose();
      const dessin = pile(0.75) ? dessinQuantite(c, total) : undefined;
      const famille = rc(["juste", "combien_ajouter"] as const);
      if (famille === "combien_ajouter" && !juste) {
        const ajout = n - r;
        return nombreOuQcm(
          `${dessin ? "Regarde le dessin. " : ""}${rc([
            `${p.nom} veut partager ${total} ${c.pl} entre ${n} amis, sans reste. Combien de ${c.pl} doit-${p.il} ajouter, au moins ?`,
            `${n} enfants se partagent ${total} ${c.pl}, mais ça ne tombe pas juste. ${p.nom} en apporte quelques-uns. Combien, au moins, pour que tout tombe juste ?`,
          ])}`,
          ajout,
          [r, ajout + 1, n, ajout + n].filter((v) => v !== ajout),
          exp(
            "Un partage tombe juste quand le total se répartit sans reste.",
            "On cherche le nombre juste au-dessus qui se partage exactement.",
            `${n} × ${chacun} = ${n * chacun}, il reste ${r}. Le nombre suivant qui tombe juste est ${n * (chacun + 1)} = ${n} × ${chacun + 1}. Il faut ajouter ${n * (chacun + 1)} - ${total} = ${ajout}.`,
            `Il faut en ajouter ${ajout}.`,
          ),
          dessin,
        );
      }
      const bonne = juste ? `oui, chacun en aura ${chacun}` : `non, il en restera ${r}`;
      return qcmTexte(
        `${dessin ? "Regarde le dessin. " : ""}${rc([
          `${n} enfants veulent se partager ${total} ${c.pl} de façon équitable. Le partage tombe-t-il juste ?`,
          `${p.nom} veut donner autant de ${c.pl} à chacun de ses ${n} amis. ${maj(p.il)} en a ${total}. Ça tombe juste ?`,
          `Les ${n} lutins de ${p.nom} se partagent ${total} ${c.pl}, à parts égales. Le partage tombe-t-il juste ?`,
        ])}`,
        bonne,
        juste
          ? [`non, il en restera 1`, `oui, chacun en aura ${chacun + 1}`, "on ne peut pas savoir"]
          : [`oui, chacun en aura ${chacun}`, `non, il en restera ${r === 1 ? 2 : r - 1}`, "on ne peut pas savoir"],
        exp(
          "Un partage tombe juste quand le total se répartit exactement, sans reste.",
          "On cherche des parts égales jusqu'à épuiser le total.",
          juste
            ? `${n} × ${chacun} = ${total} : chacun en reçoit ${chacun} et il ne reste rien.`
            : `${n} × ${chacun} = ${n * chacun}, et il reste ${r} : le partage ne tombe pas juste.`,
          maj(bonne) + ".",
        ),
        dessin,
      );
    },
  ),
];
