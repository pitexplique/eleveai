// lib/tutor-v4/questionBank/ce1/maths/addition-soustraction.bank.ts
//
// Les additions et les soustractions posées du CE1, écrites à la main.
//
// PÉRIMÈTRE BO (Annexe 4, programme de mathématiques du cycle 2) :
//   — poser et effectuer des additions de deux ou trois nombres à un, deux ou
//     trois chiffres, unités sous unités, dizaines sous dizaines, centaines
//     sous centaines ;
//   — connaître un algorithme de soustraction posée — « par cassage » ou
//     « par compensation ». On n'en impose aucun ici : les questions portent
//     sur le résultat et sur la pose, pas sur la méthode ;
//   — les nombres restent dans le millier.
// 📅 Jalons : l'addition posée est utilisée dès le début de l'année ; la
// soustraction posée arrive en PÉRIODE 3 au plus tard.
//
// LE PIÈGE DE LA NOTION : aligner les chiffres à gauche au lieu des unités.
// 45 + 7 posé de travers donne 115 au lieu de 52. C'est l'erreur qui survit
// le plus longtemps, et elle ne se voit pas dans le résultat sans regarder la
// pose.
//
// ⛔ CANVAS : `calcul_pose` n'est utilisé qu'avec `showResult: false`. Avec le
// résultat affiché, il n'y a plus de question. Le schéma en barre porte les
// égalités à trou (le tout au-dessus, la partie connue, le « ? »).
//
// ⛔ 10/11/2026 — LES SQUELETTES. « Pose et effectue : # + # » revenait 17 à 18
// fois sur 20. Chaque gabarit tire maintenant une famille (le résultat, un
// chiffre du résultat, la retenue, l'erreur d'un camarade, une histoire) × une
// tournure × un enfant. Outils : ./calcul-outils-ce1.ts.
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
  exp,
  court,
  qcmTexte,
  qcmNombre,
  nombreOuQcm,
  enfant,
  deuxEnfants,
  chose,
  dessinPose,
  dessinBarre,
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
    notionId: "addition_soustraction",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["ce1", "addition_soustraction", ...tags, "template"],
    generate,
  };
}

/** Pour les anciens items figés. */
const calculPose = (data: { operation: "addition" | "soustraction"; numbers: string[]; display?: { showResult?: boolean; showRetenues?: boolean } }) =>
  dessinPose(data.operation, data.numbers, data.display ? { display: data.display } : {});

/** « Pose et effectue », dit de huit façons. */
function direPose(calc: string): string {
  const p = enfant();
  const operation = calc.includes("-") ? "la soustraction" : "l'addition";
  return rc([
    `Pose et effectue : ${calc}.`,
    `${p.nom} pose ${operation} ${calc}. Quel résultat doit-${p.il} trouver ?`,
    `Sur son cahier, ${p.nom} a posé ${calc}. Termine son calcul.`,
    `Aide ${p.nom} à finir l'opération posée : ${calc}.`,
    `${p.nom} te demande de poser ${calc}. Quel est le résultat ?`,
    `La maîtresse de ${p.nom} écrit ${calc} au tableau. Pose l'opération et trouve le résultat.`,
    `Pic le paille-en-queue a posé ${calc} pour ${p.nom}. Quel est le résultat ?`,
    `Défi de ${p.nom} : pose ${calc} sans te tromper de colonne. Combien trouves-tu ?`,
  ]);
}

/** Des retenues ? On les calcule pour l'explication. */
function retenuesAddition(nombres: number[]) {
  const etapes: string[] = [];
  let retenue = 0;
  for (let rang = 0; rang < 3; rang++) {
    const chiffres = nombres.map((n) => Math.floor(n / 10 ** rang) % 10);
    if (chiffres.every((c) => c === 0) && retenue === 0 && nombres.every((n) => n < 10 ** rang)) break;
    const s = chiffres.reduce((a, b) => a + b, 0) + retenue;
    const nom = ["unités", "dizaines", "centaines"][rang];
    etapes.push(`${nom} : ${chiffres.join(" + ")}${retenue ? ` + ${retenue} (retenue)` : ""} = ${s}${s >= 10 ? ` : on écrit ${s % 10}, on retient ${Math.floor(s / 10)}` : ""}`);
    retenue = Math.floor(s / 10);
  }
  return etapes.join(" ; ") + ".";
}

/** Les situations d'addition : deux quantités qu'on réunit. */
function histoireAddition(a: number, b: number) {
  const p = enfant();
  const c = chose();
  return rc([
    `Au zoo, ${p.nom} compte ${a} visiteurs le matin et ${b} l'après-midi. Combien de visiteurs en tout ?`,
    `La bibliothèque a ${a} livres de contes et ${b} livres de sciences. ${p.nom} veut savoir combien de livres il y a en tout.`,
    `${p.nom} a ${a} ${c.pl}. ${maj(p.il)} en reçoit ${b} pour son anniversaire. Combien en a-t-${p.il} maintenant ?`,
    `À la kermesse, ${p.nom} vend ${a} tickets le samedi et ${b} le dimanche. Combien de tickets en tout ?`,
    `La fusée de ${p.nom} monte de ${a} mètres, puis encore de ${b} mètres. De combien de mètres est-elle montée ?`,
    `${p.il === "elle" ? "La" : "Le"} pirate ${p.nom} a ${a} pièces d'or. ${maj(p.il)} en trouve ${b} sur l'île. Combien en a-t-${p.il} ?`,
    `Le jardinier plante ${a} tulipes et ${b} roses. ${p.nom} compte toutes les fleurs. Combien en trouve-t-${p.il} ?`,
  ]);
}

/** Les situations de soustraction : on enlève, ou on cherche l'écart. */
function histoireSoustraction(a: number, b: number) {
  const p = enfant();
  const c = chose();
  return rc([
    `${p.nom} a ${a} ${c.pl}. ${maj(p.il)} en donne ${b}. Combien lui en reste-t-il ?`,
    `Le train de ${p.nom} part avec ${a} voyageurs. ${b} descendent à la gare. Combien restent dans le train ?`,
    `La boulangère a fait ${a} croissants. Elle en vend ${b} à ${p.nom} et à ses amis. Combien en reste-t-il ?`,
    `Le livre de ${p.nom} a ${a} pages. ${maj(p.il)} en a lu ${b}. Combien de pages lui reste-t-il à lire ?`,
    `Le château de ${p.nom} a ${a} briques. Le dragon en fait tomber ${b}. Combien de briques restent debout ?`,
    `Au cirque, il y a ${a} places. ${p.nom} compte ${b} places prises. Combien de places sont libres ?`,
  ]);
}

export const additionSoustractionBank: TutorBankItemV4[] = [
  /* =========================================================
     CE1_ADDITION_POSEE — poser et effectuer une addition
     LE piège : l'alignement. On aligne les unités, jamais le
     bord gauche des nombres.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_addition_posee_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce1_addition_posee",
    difficulty: 2,
    theme: "neutral",
    text: "Pour poser l'addition 245 + 37, comment faut-il écrire les deux nombres l'un au-dessus de l'autre ?",
    format: "qcm",
    choices: [
      "le 7 sous le 5, le 3 sous le 4",
      "le 3 sous le 2, le 7 sous le 4",
      "les deux nombres collés à gauche",
      "peu importe, du moment qu'ils sont l'un sous l'autre",
    ],
    expected: ["le 7 sous le 5, le 3 sous le 4"],
    comparator: "mcq_exact",
    hint: "Les unités avec les unités, les dizaines avec les dizaines.",
    explanation: exp(
      "On pose une addition en rangeant chaque chiffre sous celui de même rang.",
      "On commence par aligner les unités, tout à droite, puis les dizaines, puis les centaines.",
      "Dans 245, le 5 est aux unités ; dans 37, c'est le 7. Ils vont donc l'un sous l'autre. Le 3 des dizaines se place sous le 4 des dizaines. Aligner à gauche donnerait 245 + 370, un tout autre calcul.",
      "Le 7 va sous le 5, et le 3 sous le 4.",
    ),
    tags: ["ce1", "addition_soustraction", "poser", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_addition_posee_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce1_addition_posee",
    difficulty: 3,
    theme: "neutral",
    text: "Dans l'addition posée 45 + 37, combien font les unités 5 + 7, et que fait-on du résultat ?",
    format: "qcm",
    choices: [
      "12 : on écrit 2 et on retient 1 dizaine",
      "12 : on écrit 12 sous les unités",
      "12 : on retient 2 et on écrit 1",
      "13 : on écrit 3 et on retient 1",
    ],
    expected: ["12 : on écrit 2 et on retient 1 dizaine"],
    comparator: "mcq_exact",
    hint: "Douze unités, c'est une dizaine et deux unités.",
    explanation: exp(
      "Une colonne ne peut contenir qu'un seul chiffre : dès qu'on atteint dix, on forme une dizaine.",
      "On additionne la colonne, on écrit le chiffre des unités du résultat, on retient le reste.",
      "5 + 7 = 12. Douze unités font 1 dizaine et 2 unités : on écrit 2 sous les unités et on reporte 1 sur la colonne des dizaines.",
      "On écrit 2 et on retient 1 dizaine.",
    ),
    canvas: calculPose({
      operation: "addition",
      numbers: ["45", "37"],
      display: { showResult: false, showRetenues: false },
    }),
    tags: ["ce1", "addition_soustraction", "poser", "methode", "qcm", "canvas"],
  },
  gab(
    "ce1_addition_posee_tpl_3",
    "ce1_addition_posee",
    2,
    "Unités sous unités, dizaines sous dizaines.",
    ["poser"],
    () => {
      const a = ri(21, 78);
      const b = pile(0.3) ? ri(2, 9) : ri(11, 99 - a);
      const s = a + b;
      const explication = exp(
        "On pose une addition en rangeant chaque chiffre sous celui de même rang.",
        "On aligne les unités à droite, puis on additionne colonne par colonne en partant des unités.",
        retenuesAddition([a, b]),
        `${a} + ${b} = ${s}.`,
      );
      if (pile(0.25)) {
        const p = enfant();
        return qcmTexte(
          rc([
            `${p.nom} pose ${a} + ${b}. Où écrit-${p.il} le chiffre ${b % 10} de ${b} ?`,
            `Pour poser ${a} + ${b}, sous quel chiffre de ${a} faut-il écrire le ${b % 10} ? Aide ${p.nom} !`,
          ]),
          `sous le ${a % 10}`,
          [`sous le ${Math.floor(a / 10)}`, "tout à gauche", "à côté du nombre"],
          exp(
            "On pose une addition en rangeant chaque chiffre sous celui de même rang.",
            "Les unités vont sous les unités, tout à droite.",
            `Le ${b % 10} est le chiffre des unités de ${b} : il va sous le ${a % 10}, chiffre des unités de ${a}.`,
            `Sous le ${a % 10}.`,
          ),
          dessinPose("addition", [String(a), String(b)]),
        );
      }
      return nombreOuQcm(direPose(`${a} + ${b}`), s, [s + 10, s - 10, s + 1, b < 10 ? a + b * 10 : s - 1], explication, pile(0.8) ? dessinPose("addition", [String(a), String(b)]) : undefined);
    },
  ),
  gab(
    "ce1_addition_posee_tpl_1",
    "ce1_addition_posee",
    3,
    "Commence par la colonne des unités, tout à droite.",
    ["poser", "canvas"],
    () => {
      const a = ri(120, 480);
      const b = ri(115, 390);
      const s = a + b;
      const p = enfant();
      const pose = dessinPose("addition", [String(a), String(b)]);
      const explication = exp(
        "On additionne colonne par colonne, en partant des unités.",
        "Dès qu'une colonne dépasse neuf, on écrit le chiffre des unités et on retient le reste sur la colonne suivante.",
        retenuesAddition([a, b]),
        `${a} + ${b} = ${s}.`,
      );
      const famille = rc(["resultat", "resultat", "histoire", "histoire", "unites", "retenue"] as const);
      if (famille === "resultat") return nombreOuQcm(direPose(`${a} + ${b}`), s, [s + 10, s - 10, s + 100, s - 1], explication, pile(0.8) ? pose : undefined);
      if (famille === "histoire") {
        return nombreOuQcm(histoireAddition(a, b), s, [s + 10, s - 10, s + 100, s - 1], explication, pile(0.6) ? pose : undefined);
      }
      if (famille === "unites") {
        const u = (a + b) % 10;
        return nombreOuQcm(
          rc([
            `${p.nom} pose ${a} + ${b}. Quel chiffre écrit-${p.il} dans la colonne des unités du résultat ?`,
            `Dans l'addition posée ${a} + ${b}, quel chiffre va aux unités du résultat ? Aide ${p.nom}.`,
          ]),
          u,
          [(a % 10) + (b % 10), (u + 1) % 10, (u + 9) % 10].filter((x) => x !== u),
          explication,
          pose,
        );
      }
      const r = (a % 10) + (b % 10) >= 10;
      return qcmTexte(
        rc([
          `${p.nom} pose ${a} + ${b}. Y a-t-il une retenue à mettre sur la colonne des dizaines ?`,
          `Dans ${a} + ${b} posée, ${p.nom} additionne les unités. Doit-${p.il} retenir une dizaine ?`,
        ]),
        r ? "oui, 1 dizaine" : "non, pas de retenue",
        [r ? "non, pas de retenue" : "oui, 1 dizaine", "oui, 2 dizaines"],
        exp(
          "On retient une dizaine quand la colonne des unités fait 10 ou plus.",
          "On additionne les deux chiffres des unités.",
          `${a % 10} + ${b % 10} = ${(a % 10) + (b % 10)}${r ? " : c'est 10 ou plus, on retient 1 dizaine." : " : c'est moins de 10, pas de retenue."}`,
          r ? "Oui, une retenue de 1 dizaine." : "Non, pas de retenue.",
        ),
        pose,
      );
    },
  ),
  gab(
    "ce1_addition_posee_tpl_2",
    "ce1_addition_posee",
    4,
    "Trois nombres : additionne les unités des trois d'un coup.",
    ["poser"],
    () => {
      const p = enfant();
      if (pile(0.35)) {
        // L'erreur d'alignement : le nombre à un chiffre collé à gauche.
        const a = ri(21, 89);
        const b = ri(2, 9);
        const faux = a + b * 10;
        return nombreOuQcm(
          rc([
            `${p.nom} a posé ${a} + ${b} en mettant le ${b} sous le ${Math.floor(a / 10)}. ${maj(p.il)} a trouvé ${faux}. Quel est le bon résultat ?`,
            `Pic le paille-en-queue a aligné ${a} + ${b} à gauche et trouvé ${faux}. Aide ${p.nom} à trouver le bon résultat.`,
            `${p.nom} trouve ${a} + ${b} = ${faux}. ${maj(p.il)} s'est trompé${p.il === "elle" ? "e" : ""} de colonne. Quel est le bon résultat ?`,
          ]),
          a + b,
          [faux, a + b + 10, a + b - 1],
          exp(
            "On aligne les unités sous les unités, jamais le bord gauche des nombres.",
            `Le ${b} est un chiffre des unités : il va sous le ${a % 10}.`,
            `Posé à gauche, le ${b} comptait pour ${b} dizaines : ${a} + ${b * 10} = ${faux}. Bien posé : ${a} + ${b} = ${a + b}.`,
            `Le bon résultat est ${a + b}.`,
          ),
          dessinPose("addition", [String(a), String(b)]),
        );
      }
      const a = ri(100, 300);
      const b = ri(20, 90);
      const c = ri(4, 9);
      const s = a + b + c;
      const explication = exp(
        "On peut poser une addition de trois nombres : chaque chiffre va dans la colonne de son rang.",
        "On aligne les unités, puis on additionne colonne par colonne en partant de la droite.",
        retenuesAddition([a, b, c]),
        `${a} + ${b} + ${c} = ${s}.`,
      );
      const text = pile(0.55)
        ? direPose(`${a} + ${b} + ${c}`)
        : rc([
            `Pour la fête, ${p.nom} compte ${a} ballons rouges, ${b} bleus et ${c} verts. Combien de ballons en tout ?`,
            `Le fermier ramasse ${a} œufs lundi, ${b} mardi et ${c} mercredi. ${p.nom} additionne. Combien d'œufs en tout ?`,
            `${p.nom} marche ${a} pas jusqu'au parc, ${b} jusqu'à la cabane et ${c} jusqu'au banc. Combien de pas en tout ?`,
            `Dans la bibliothèque de ${p.nom}, il y a ${a} livres, ${b} BD et ${c} dictionnaires. Combien de livres en tout ?`,
          ]);
      return nombreOuQcm(text, s, [s + 10, s - 10, a + b + c * 10, s + 1], explication, pile(0.75) ? dessinPose("addition", [String(a), String(b), String(c)]) : undefined);
    },
  ),

  /* =========================================================
     CE1_SOUSTRACTION_POSEE — poser et effectuer une soustraction
     📅 Elle arrive en période 3 au plus tard. Le programme
     laisse le choix de l'algorithme : on ne teste donc que le
     résultat et la pose.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_soustraction_posee_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce1_soustraction_posee",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une soustraction posée, quel nombre écrit-on en haut ?",
    format: "qcm",
    choices: [
      "le plus grand",
      "le plus petit",
      "celui qu'on préfère",
      "celui qui a le moins de chiffres",
    ],
    expected: ["le plus grand"],
    comparator: "mcq_exact",
    hint: "On enlève au grand nombre, pas l'inverse.",
    explanation: exp(
      "Soustraire, c'est enlever une quantité à une autre.",
      "On écrit d'abord le nombre de départ, puis en dessous celui qu'on enlève.",
      "On ne peut pas enlever 45 à 12 au CE1 : c'est le plus grand nombre qui va en haut, et on lui retire l'autre.",
      "On écrit le plus grand en haut.",
    ),
    tags: ["ce1", "addition_soustraction", "soustraire", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_soustraction_posee_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce1_soustraction_posee",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève calcule 52 - 27 et trouve 35. Il a fait 7 - 2 dans la colonne des unités. Quelle est la bonne réponse ?",
    format: "short",
    expected: ["25"],
    comparator: "number_equal",
    hint: "Dans la colonne des unités, c'est 2 - 7 qu'il fallait faire, pas 7 - 2.",
    explanation: exp(
      "Dans une soustraction, on enlève toujours le chiffre du bas à celui du haut, même quand il est plus grand.",
      "Quand le chiffre du haut est trop petit, on casse une dizaine du nombre de départ.",
      "52, c'est 4 dizaines et 12 unités. 12 - 7 = 5 aux unités, puis 4 - 2 = 2 aux dizaines : 52 - 27 = 25. En faisant 7 - 2, l'élève a inversé la colonne.",
      "La bonne réponse est 25.",
    ),
    tags: ["ce1", "addition_soustraction", "soustraire", "piege"],
  },
  gab(
    "ce1_soustraction_posee_tpl_3",
    "ce1_soustraction_posee",
    2,
    "Le grand nombre en haut, puis colonne par colonne.",
    ["soustraire"],
    () => {
      // Sans retenue : chaque chiffre du haut est plus grand.
      const dh = ri(3, 9);
      const db = ri(1, dh - 1);
      const uh = ri(3, 9);
      const ub = ri(0, uh - 1);
      const a = dh * 10 + uh;
      const b = db * 10 + ub;
      const r = a - b;
      const explication = exp(
        "On soustrait colonne par colonne, en partant des unités.",
        "Le grand nombre en haut, celui qu'on enlève en dessous, unités sous unités.",
        `Unités : ${uh} - ${ub} = ${uh - ub}. Dizaines : ${dh} - ${db} = ${dh - db}. Résultat : ${r}.`,
        `${a} - ${b} = ${r}.`,
      );
      if (pile(0.25)) {
        const p = enfant();
        return qcmTexte(
          rc([
            `${p.nom} veut poser une soustraction avec ${b} et ${a}. Quel nombre écrit-${p.il} en haut ?`,
            `Pour calculer ${a} - ${b}, quel nombre va en haut de l'opération posée ? Aide ${p.nom}.`,
          ]),
          String(a),
          [String(b), "peu importe", "les deux sur la même ligne"],
          exp(
            "Soustraire, c'est enlever une quantité à une autre.",
            "On écrit en haut le nombre de départ, le plus grand, et en dessous celui qu'on enlève.",
            `On enlève ${b} à ${a} : ${a} va en haut.`,
            `On écrit ${a} en haut.`,
          ),
        );
      }
      return nombreOuQcm(direPose(`${a} - ${b}`), r, [r + 10, r - 10, a + b, r + 1], explication, pile(0.8) ? dessinPose("soustraction", [String(a), String(b)]) : undefined);
    },
  ),
  gab(
    "ce1_soustraction_posee_tpl_1",
    "ce1_soustraction_posee",
    3,
    "Colonne par colonne, en partant des unités.",
    ["soustraire", "canvas"],
    () => {
      const b = ri(102, 340);
      const a = b + ri(120, 550);
      const r = a - b;
      const p = enfant();
      const pose = dessinPose("soustraction", [String(a), String(b)]);
      const explication = exp(
        "On soustrait colonne par colonne, en partant des unités.",
        "Quand le chiffre du haut est plus petit que celui du bas, on casse une dizaine ou une centaine.",
        `${a} - ${b} = ${r}. On vérifie en ajoutant : ${r} + ${b} = ${a}.`,
        `${a} - ${b} = ${r}.`,
      );
      const famille = rc(["resultat", "resultat", "histoire", "histoire", "verifier"] as const);
      if (famille === "resultat") return nombreOuQcm(direPose(`${a} - ${b}`), r, [r + 10, r - 10, r + 100, a + b], explication, pile(0.8) ? pose : undefined);
      if (famille === "histoire") return nombreOuQcm(histoireSoustraction(a, b), r, [r + 10, r - 10, r + 100], explication, pile(0.6) ? pose : undefined);
      return qcmTexte(
        rc([
          `${p.nom} a trouvé ${a} - ${b} = ${r}. Quel calcul lui permet de vérifier ?`,
          `Pour vérifier que ${a} - ${b} = ${r}, que peut faire ${p.nom} ?`,
        ]),
        `${r} + ${b}, qui doit faire ${a}`,
        [`${r} - ${b}, qui doit faire ${a}`, `${a} + ${b}, qui doit faire ${r}`, `${r} + ${a}, qui doit faire ${b}`],
        exp(
          "La soustraction défait l'addition : on vérifie en remontant.",
          "On ajoute le résultat et le nombre enlevé : on doit retrouver le nombre de départ.",
          `${r} + ${b} = ${a}. Le calcul était juste.`,
          `On calcule ${r} + ${b}.`,
        ),
      );
    },
  ),
  gab(
    "ce1_soustraction_posee_tpl_2",
    "ce1_soustraction_posee",
    4,
    "Casse une dizaine quand le chiffre du haut est trop petit.",
    ["soustraire", "piege"],
    () => {
      // On force le « cassage » : le chiffre des unités du haut est plus petit.
      const uHaut = ri(1, 4);
      const uBas = ri(uHaut + 1, 9);
      const dHaut = ri(3, 9);
      const dBas = ri(1, dHaut - 1);
      const a = dHaut * 10 + uHaut;
      const b = dBas * 10 + uBas;
      const r = a - b;
      const p = enfant();
      const pose = dessinPose("soustraction", [String(a), String(b)]);
      const explication = exp(
        "On enlève toujours le chiffre du bas à celui du haut, même quand il est plus grand.",
        "Quand le chiffre du haut est trop petit, on casse une dizaine du nombre de départ.",
        `${a}, c'est ${dHaut - 1} dizaines et ${uHaut + 10} unités. ${uHaut + 10} - ${uBas} = ${uHaut + 10 - uBas} aux unités, puis ${dHaut - 1} - ${dBas} = ${dHaut - 1 - dBas} aux dizaines.`,
        `${a} - ${b} = ${r}.`,
      );
      const inverse = (dHaut - dBas) * 10 + (uBas - uHaut);
      const famille = rc(["resultat", "histoire", "inverse", "casser"] as const);
      if (famille === "resultat") return nombreOuQcm(direPose(`${a} - ${b}`), r, [inverse, r + 10, r - 1, r + 1], explication, pile(0.8) ? pose : undefined);
      if (famille === "histoire") return nombreOuQcm(histoireSoustraction(a, b), r, [inverse, r + 10, r - 1], explication, pile(0.5) ? pose : undefined);
      if (famille === "inverse") {
        return nombreOuQcm(
          rc([
            `${p.nom} calcule ${a} - ${b}. Aux unités, ${p.il} fait ${uBas} - ${uHaut} et trouve ${inverse}. Quel est le bon résultat ?`,
            `Pic le paille-en-queue a trouvé ${a} - ${b} = ${inverse} : il a fait ${uBas} - ${uHaut} aux unités. Aide ${p.nom} à corriger.`,
          ]),
          r,
          [inverse, r + 10, r - 10],
          explication,
          pose,
        );
      }
      return court(
        rc([
          `${p.nom} pose ${a} - ${b}. ${maj(p.il)} casse une dizaine de ${a}. Combien d'unités a-t-${p.il} maintenant en haut ?`,
          `Dans ${a} - ${b}, on ne peut pas faire ${uHaut} - ${uBas}. ${p.nom} casse une dizaine : combien d'unités en haut ?`,
        ]),
        uHaut + 10,
        explication,
        pose,
      );
    },
  ),

  /* =========================================================
     CE1_ADD_SOUS_COMPLEMENT — le terme manquant
     Le programme le demande sous forme d'« égalités à trou ».
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_add_sous_complement_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce1_add_sous_complement",
    difficulty: 3,
    theme: "neutral",
    text: "Quel nombre manque : 40 + … = 100 ?",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "Compte de 40 jusqu'à 100.",
    explanation: exp(
      "Chercher un terme manquant, c'est chercher ce qu'il faut ajouter pour atteindre le total.",
      "On part du nombre connu et on avance jusqu'au total.",
      "De 40 à 100, il y a 60 : 40 + 60 = 100. On peut aussi calculer 100 - 40 = 60.",
      "Il manque 60.",
    ),
    tags: ["ce1", "addition_soustraction", "complement"],
  },
  {
    kind: "fixed",
    id: "ce1_add_sous_complement_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce1_add_sous_complement",
    difficulty: 4,
    theme: "neutral",
    text: "Quel nombre manque : … - 30 = 50 ?",
    format: "short",
    expected: ["80"],
    comparator: "number_equal",
    hint: "Le nombre de départ est plus grand que 50, pas plus petit.",
    explanation: exp(
      "Dans une soustraction à trou au début, le nombre cherché est le plus grand des trois.",
      "On remonte l'opération : on ajoute ce qui a été enlevé au résultat.",
      "50 + 30 = 80. On vérifie : 80 - 30 = 50.",
      "Il manque 80.",
    ),
    tags: ["ce1", "addition_soustraction", "complement", "piege"],
  },
  gab(
    "ce1_add_sous_complement_tpl_1",
    "ce1_add_sous_complement",
    3,
    "Ce qui manque, c'est le total moins ce qu'on a déjà.",
    ["complement"],
    () => {
      const rond = pile(0.4);
      const total = rond ? ri(2, 9) * 100 : ri(120, 800);
      const connu = rond ? ri(1, total / 10 - 1) * 10 : ri(30, total - 20);
      const manque = total - connu;
      const p = enfant();
      const c = chose();
      const explication = exp(
        "Chercher un terme manquant, c'est chercher ce qu'il faut ajouter pour atteindre le total.",
        "On enlève au total ce qu'on a déjà, ou on avance de ce qu'on a jusqu'au total.",
        `${total} - ${connu} = ${manque}. On vérifie : ${connu} + ${manque} = ${total}.`,
        `Il manque ${manque}.`,
      );
      const barre = dessinBarre({ total: String(total), parts: [{ label: "déjà", value: String(connu) }, { label: "manque", unknown: true }] });
      const famille = rc(["trou", "schema", "histoire", "histoire"] as const);
      if (famille === "trou") return court(rc([`Quel nombre manque : ${connu} + … = ${total} ?`, `Complète : ${connu} + … = ${total}.`, `${p.nom} a effacé un nombre : ${connu} + … = ${total}. Lequel ?`, `Sur l'ardoise de ${p.nom} : … + ${connu} = ${total}. Quel nombre manque ?`]), manque, explication, pile(0.5) ? barre : undefined);
      if (famille === "schema") {
        return nombreOuQcm(
          rc([
            `${p.nom} a dessiné ce schéma. Quel nombre remplace le point d'interrogation ?`,
            `Sur le schéma de ${p.nom}, la barre entière vaut ${total}. Que vaut la partie cachée ?`,
          ]),
          manque,
          [total + connu, manque + 10, manque - 10],
          explication,
          barre,
        );
      }
      return nombreOuQcm(
        rc([
          `${p.nom} veut ${total} ${c.pl}. ${maj(p.il)} en a déjà ${connu}. Combien lui en manque-t-il ?`,
          `L'album de ${p.nom} a ${total} places. ${connu} images sont collées. Combien de places sont vides ?`,
          `Le château de sable de ${p.nom} demande ${total} seaux. ${maj(p.il)} en a versé ${connu}. Combien en reste-t-il à verser ?`,
          `Le jardinier veut planter ${total} fleurs. ${p.nom} l'a aidé à en planter ${connu}. Combien de fleurs reste-t-il à planter ?`,
        ]),
        manque,
        [total + connu, manque + 10, manque - 10],
        explication,
        pile(0.6) ? barre : undefined,
      );
    },
  ),
  gab(
    "ce1_add_sous_complement_tpl_2",
    "ce1_add_sous_complement",
    4,
    "Remonte l'opération : ajoute ce qui a été enlevé.",
    ["complement", "piege"],
    () => {
      const enleve = ri(20, 200);
      const reste = ri(30, 400);
      const depart = enleve + reste;
      const p = enfant();
      const c = chose();
      const explication = exp(
        "Quand le trou est au début d'une soustraction, le nombre cherché est le plus grand des trois.",
        "On remonte l'opération : on rend ce qui a été enlevé.",
        `${reste} + ${enleve} = ${depart}. On vérifie : ${depart} - ${enleve} = ${reste}.`,
        `Il manque ${depart}.`,
      );
      const barre = dessinBarre({ total: "?", parts: [{ label: "parti", value: String(enleve) }, { label: "reste", value: String(reste) }] });
      const famille = rc(["trou", "schema", "histoire", "histoire", "milieu"] as const);
      if (famille === "trou") return court(rc([`Quel nombre manque : … - ${enleve} = ${reste} ?`, `Complète : … - ${enleve} = ${reste}.`, `${p.nom} a effacé le premier nombre : … - ${enleve} = ${reste}. Lequel était-ce ?`, `Devinette de ${p.nom} : … - ${enleve} = ${reste}. Quel nombre faut-il écrire ?`]), depart, explication, pile(0.4) ? barre : undefined);
      if (famille === "milieu") {
        const a = depart;
        return court(
          rc([`Quel nombre manque : ${a} - … = ${reste} ?`, `${p.nom} cherche le nombre caché : ${a} - … = ${reste}.`, `Sur l'ardoise de ${p.nom} : ${a} - … = ${reste}. Quel nombre manque ?`]),
          enleve,
          exp(
            "Dans une soustraction, le nombre enlevé est l'écart entre le départ et ce qui reste.",
            "On enlève ce qui reste au nombre de départ.",
            `${a} - ${reste} = ${enleve}. On vérifie : ${a} - ${enleve} = ${reste}.`,
            `Il manque ${enleve}.`,
          ),
        );
      }
      if (famille === "schema") {
        return nombreOuQcm(
          rc([`${p.nom} a dessiné ce schéma. Que vaut la barre entière ?`, `Sur ce schéma de ${p.nom}, quel nombre remplace le point d'interrogation ?`]),
          depart,
          [reste - enleve > 0 ? reste - enleve : depart + 10, depart + 10, depart - 10],
          explication,
          barre,
        );
      }
      return nombreOuQcm(
        rc([
          `${p.nom} a donné ${enleve} ${c.pl}. Il lui en reste ${reste}. Combien en avait-${p.il} au début ?`,
          `Le train de ${p.nom} s'arrête : ${enleve} voyageurs descendent. Il en reste ${reste}. Combien étaient dans le train ?`,
          `${p.nom} a dépensé ${enleve} points au jeu. Il lui en reste ${reste}. Combien de points avait-${p.il} ?`,
          `La boulangère a vendu ${enleve} pains à ${p.nom} et aux autres clients. Il en reste ${reste}. Combien en avait-elle cuit ?`,
        ]),
        depart,
        [reste - enleve > 0 ? reste - enleve : depart + 100, depart + 10, depart - 10],
        explication,
        pile(0.6) ? barre : undefined,
      );
    },
  ),

  /* =========================================================
     CE1_ADD_SOUS_ESTIMER — l'ordre de grandeur
     Estimer avant de calculer, c'est se donner un moyen de
     repérer un résultat absurde.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_add_sous_estimer_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce1_add_sous_estimer",
    difficulty: 3,
    theme: "neutral",
    text: "Sans calculer exactement, 198 + 203 est-il plus proche de 400 ou de 300 ?",
    format: "qcm",
    choices: ["de 400", "de 300", "de 200", "de 1 000"],
    expected: ["de 400"],
    comparator: "mcq_exact",
    hint: "Chaque nombre est tout près de 200.",
    explanation: exp(
      "Estimer un résultat, c'est remplacer les nombres par des nombres ronds proches.",
      "On arrondit chaque nombre à la centaine la plus proche, puis on calcule de tête.",
      "198 est presque 200, et 203 aussi. 200 + 200 = 400 : le résultat sera tout près de 400.",
      "C'est plus proche de 400.",
    ),
    tags: ["ce1", "addition_soustraction", "estimer", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_add_sous_estimer_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce1_add_sous_estimer",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève calcule 305 - 98 et trouve 407. Sans refaire le calcul, comment sait-on que c'est faux ?",
    format: "qcm",
    choices: [
      "parce qu'en enlevant, on doit trouver moins que 305",
      "parce que 407 n'est pas un nombre rond",
      "parce que 98 est plus petit que 100",
      "on ne peut pas le savoir sans calculer",
    ],
    expected: ["parce qu'en enlevant, on doit trouver moins que 305"],
    comparator: "mcq_exact",
    hint: "Une soustraction ne peut pas faire grandir le nombre de départ.",
    explanation: exp(
      "Enlever une quantité donne toujours un résultat plus petit que le nombre de départ.",
      "On compare le résultat trouvé au nombre de départ avant même de vérifier le calcul.",
      "407 est plus grand que 305 : impossible pour une soustraction. Le bon résultat est proche de 305 - 100 = 205, et vaut exactement 207.",
      "Parce qu'en enlevant, on doit trouver moins que 305.",
    ),
    tags: ["ce1", "addition_soustraction", "estimer", "piege", "qcm"],
  },
  gab(
    "ce1_add_sous_estimer_tpl_1",
    "ce1_add_sous_estimer",
    3,
    "Remplace chaque nombre par la centaine la plus proche.",
    ["estimer"],
    () => {
      const plus = pile(0.65);
      const c1 = plus ? ri(1, 4) : ri(4, 8);
      const c2 = plus ? ri(1, 4) : ri(1, c1 - 2);
      const a = c1 * 100 + rc([-3, -2, -1, 1, 2, 3]);
      const b = c2 * 100 + rc([-3, -2, -1, 1, 2, 3]);
      const arrondi = plus ? (c1 + c2) * 100 : (c1 - c2) * 100;
      const op = plus ? "+" : "-";
      const p = enfant();
      const [x, y] = deuxEnfants();
      const explication = exp(
        "Estimer, c'est remplacer chaque nombre par un nombre rond tout proche.",
        "On arrondit à la centaine la plus proche, puis on calcule de tête.",
        `${a} est presque ${c1 * 100}, et ${b} est presque ${c2 * 100}. ${c1 * 100} ${op} ${c2 * 100} = ${arrondi}.`,
        `Le résultat est proche de ${arrondi}.`,
      );
      const text = plus
        ? rc([
            `Sans calculer exactement, de quel nombre ${a} + ${b} est-il le plus proche ? Aide ${p.nom} !`,
            `${p.nom} doit deviner vite le résultat de ${a} + ${b}. De quel nombre est-il proche ?`,
            `Au zoo, ${p.nom} compte ${a} visiteurs le matin et ${b} l'après-midi. Environ combien de visiteurs en tout ?`,
            `${x.nom} a ${a} images, ${y.nom} en a ${b}. Environ combien d'images ont-ils à eux deux ?`,
            `Le chef cuisinier fait ${a} crêpes, puis ${b}. ${p.nom} veut savoir environ combien. Quelle est la bonne estimation ?`,
          ])
        : rc([
            `Sans calculer exactement, de quel nombre ${a} - ${b} est-il le plus proche ? Aide ${p.nom} !`,
            `${p.nom} a ${a} perles. ${maj(p.il)} en utilise ${b} pour un collier. Il en reste environ combien ?`,
            `Le train de ${p.nom} part avec ${a} voyageurs, ${b} descendent. Il en reste environ combien ?`,
          ]);
      return qcmNombre(text, arrondi, [arrondi + 100, arrondi - 100, arrondi * 2, arrondi + 500].filter((v) => v > 0 && v <= 1000), explication, "", pile(0.45) ? dessinPose(plus ? "addition" : "soustraction", [String(a), String(b)]) : undefined);
    },
  ),
  gab(
    "ce1_add_sous_estimer_tpl_2",
    "ce1_add_sous_estimer",
    4,
    "Le bon résultat est tout près du calcul avec des nombres ronds.",
    ["estimer", "piege"],
    () => {
      const plus = pile(0.6);
      const a = plus ? ri(110, 480) : ri(400, 900);
      const b = plus ? ri(105, 450) : ri(105, a - 150);
      const r = plus ? a + b : a - b;
      const op = plus ? "+" : "-";
      const p = enfant();
      const ordre = Math.round(a / 100) * 100 + (plus ? 1 : -1) * Math.round(b / 100) * 100;
      const explication = exp(
        "Avant de calculer, on prévoit l'ordre de grandeur du résultat.",
        "On arrondit les deux nombres à la centaine, puis on élimine les résultats trop loin.",
        `${a} ${op} ${b}, c'est environ ${Math.round(a / 100) * 100} ${op} ${Math.round(b / 100) * 100} = ${ordre}. Le seul résultat proche est ${r}.`,
        `Le résultat possible est ${r}.`,
      );
      if (pile(0.5)) {
        return qcmNombre(
          rc([
            `Un seul de ces résultats est possible pour ${a} ${op} ${b}. Lequel ? ${p.nom} ne pose pas le calcul.`,
            `${p.nom} hésite. Sans poser ${a} ${op} ${b}, quel résultat est possible ?`,
          ]),
          r,
          [r + 300, r - 200, r + 200, plus ? Math.abs(a - b) : a + b].filter((v) => v > 0 && v < 1000 && Math.abs(v - r) >= 100),
          explication,
          "",
          dessinPose(plus ? "addition" : "soustraction", [String(a), String(b)]),
        );
      }
      const faux = plus ? r + rc([100, 200, 300]) : r + rc([100, 200]);
      return qcmTexte(
        rc([
          `${p.nom} a calculé ${a} ${op} ${b} et trouvé ${faux}. Est-ce possible ?`,
          `Pic le paille-en-queue annonce : « ${a} ${op} ${b} = ${faux} ». ${p.nom} vérifie l'ordre de grandeur. Qu'en penses-tu ?`,
        ]),
        `non, cela doit faire environ ${ordre}`,
        [`oui, c'est juste`, `non, cela doit faire environ ${ordre + 300}`, `on ne peut pas savoir sans poser`],
        exp(
          "Avant de calculer, on prévoit l'ordre de grandeur du résultat.",
          "On arrondit les deux nombres à la centaine, puis on compare.",
          `${a} ${op} ${b}, c'est environ ${ordre}. ${faux} est trop loin : le calcul est faux (le bon résultat est ${r}).`,
          `Non, cela doit faire environ ${ordre}.`,
        ),
        pile(0.6) ? dessinPose(plus ? "addition" : "soustraction", [String(a), String(b)]) : undefined,
      );
    },
  ),

  /* =========================================================
     CE1_ADD_SOUS_DEFI — les défis
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_add_sous_defi_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "ce1_add_sous_defi",
    difficulty: 5,
    theme: "neutral",
    text: "On sait que 32 + 15 = 47. Que vaut 47 - 15, sans poser l'opération ?",
    format: "short",
    expected: ["32"],
    comparator: "number_equal",
    hint: "La soustraction défait ce que l'addition a fait.",
    explanation: exp(
      "La soustraction est l'opération inverse de l'addition : elle défait ce que l'addition a fait.",
      "On relit l'addition à l'envers au lieu de recalculer.",
      "Si 32 + 15 = 47, alors enlever 15 à 47 ramène au point de départ : 32. De même, 47 - 32 = 15.",
      "47 - 15 = 32.",
    ),
    tags: ["ce1", "addition_soustraction", "defi", "remarquable"],
  },
  gab(
    "ce1_add_sous_defi_tpl_1",
    "ce1_add_sous_defi",
    5,
    "Relis l'addition à l'envers, ne recalcule pas.",
    ["defi"],
    () => {
      const a = ri(120, 500);
      const b = ri(20, 300);
      const s = a + b;
      const cherche = pile() ? a : b;
      const autre = cherche === a ? b : a;
      const p = enfant();
      const explication = exp(
        "La soustraction défait l'addition : elle ramène au nombre de départ.",
        "On relit l'égalité connue à l'envers au lieu de recalculer.",
        `${a} + ${b} = ${s}, donc enlever ${autre} à ${s} redonne ${cherche}.`,
        `Cela vaut ${cherche}.`,
      );
      const text = rc([
        `On sait que ${a} + ${b} = ${s}. Que vaut ${s} - ${autre}, sans poser l'opération ? Aide ${p.nom}.`,
        `${p.nom} a trouvé ${a} + ${b} = ${s}. Sans recalculer, que vaut ${s} - ${autre} ?`,
        `Sur l'ardoise de ${p.nom} : ${a} + ${b} = ${s}. Pic demande combien font ${s} - ${autre}. Que réponds-tu ?`,
        `${p.nom} et ses amis ont ${s} cartes : ${a} à ${p.nom}, ${b} aux autres. Si on enlève les ${autre} cartes ${autre === a ? `de ${p.nom}` : "des autres"}, combien en reste-t-il ?`,
        `Défi de ${p.nom} : ${a} + ${b} = ${s}. Trouve vite ${s} - ${autre}.`,
      ]);
      return nombreOuQcm(text, cherche, [cherche + 10, cherche - 10, s + autre, autre], explication, pile(0.5) ? dessinBarre({ total: String(s), parts: [{ label: "enlevé", value: String(autre) }, { label: "reste", unknown: true }] }) : undefined);
    },
  ),
  gab(
    "ce1_add_sous_defi_tpl_2",
    "ce1_add_sous_defi",
    5,
    "Deux étapes : fais-les dans l'ordre de l'histoire.",
    ["defi"],
    () => {
      const p = enfant();
      const debut = ri(150, 400);
      const ajout = ri(40, 200);
      const retire = ri(30, debut);
      const fin = debut + ajout - retire;
      const explication = exp(
        "Un problème à deux étapes se résout dans l'ordre où les choses se passent.",
        "On ajoute d'abord ce qui arrive, on enlève ensuite ce qui part.",
        `${debut} + ${ajout} = ${debut + ajout}, puis ${debut + ajout} - ${retire} = ${fin}.`,
        `Il en reste ${fin}.`,
      );
      const contexte = rc([
        { lieu: "la bibliothèque de l'école", objet: "livres", arrive: "On en apporte", part: "puis on en prête" },
        { lieu: "le jardin de la classe", objet: "graines", arrive: `${p.nom} en ajoute`, part: "puis les oiseaux en mangent" },
        { lieu: "la réserve de la cantine", objet: "yaourts", arrive: "Le camion en livre", part: "puis les élèves en mangent" },
        { lieu: "le coffre des pirates", objet: "pièces d'or", arrive: `${p.nom} en trouve`, part: "puis le capitaine en dépense" },
        { lieu: "l'aquarium géant", objet: "poissons", arrive: "Le soigneur en ajoute", part: "puis il en déplace" },
        { lieu: "la boîte à jouets de " + p.nom, objet: "petites voitures", arrive: "Mamie en offre", part: `puis ${p.nom} en donne` },
        { lieu: "la ferme", objet: "œufs", arrive: "Les poules en pondent", part: `puis ${p.nom} en vend au marché` },
      ]);
      if (pile(0.3)) {
        const x = ri(100, 400);
        const k = ri(20, 300);
        const y = x + k;
        if (pile()) {
          return court(
            `${p.nom} pense à un nombre. ${maj(p.il)} lui ajoute ${k} et trouve ${y}. Quel est ce nombre ?`,
            x,
            exp("Pour retrouver un nombre mystère, on défait ce qui a été fait.", `On enlève ${k} au résultat.`, `${y} - ${k} = ${x}. On vérifie : ${x} + ${k} = ${y}.`, `Le nombre est ${x}.`),
            dessinBarre({ total: String(y), parts: [{ label: "mystère", unknown: true }, { label: "ajouté", value: String(k) }] }),
          );
        }
        return court(
          `Devinette de ${p.nom} : « Si j'enlève ${k} à mon nombre, je trouve ${x}. » Quel est son nombre ?`,
          y,
          exp("Pour retrouver un nombre mystère, on défait ce qui a été fait.", `On rajoute les ${k} enlevés.`, `${x} + ${k} = ${y}. On vérifie : ${y} - ${k} = ${x}.`, `Le nombre est ${y}.`),
          dessinBarre({ total: "?", parts: [{ label: "il reste", value: String(x) }, { label: "enlevé", value: String(k) }] }),
        );
      }
      return nombreOuQcm(
        `Dans ${contexte.lieu}, il y a ${debut} ${contexte.objet}. ${contexte.arrive} ${ajout}, ${contexte.part} ${retire}. Combien en reste-t-il ?`,
        fin,
        [debut + ajout + retire, fin + 10, fin - 10, debut - retire],
        explication,
      );
    },
  ),
];
