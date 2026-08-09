// lib/tutor-v4/questionBank/cp/maths/addition-soustraction.bank.ts
//
// Les opérations du CP, écrites à la main.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours préparatoire) :
//   — comprendre le sens de l'addition et de la soustraction, et comprendre
//     que « la soustraction est l'opération inverse de l'addition » : on a
//     32 + 15 = 47, donc 47 - 32 = 15 et 47 - 15 = 32 ;
//   — comprendre que « l'ordre des termes n'a pas d'importance pour
//     l'addition, mais qu'il n'en est pas de même pour la soustraction » ;
//   — utiliser les symboles « + », « - » et « = » ;
//   — POSER une addition de deux ou trois nombres à un ou deux chiffres, en
//     positionnant les unités sous les unités et les dizaines sous les
//     dizaines. ⚠️ « Au CP, l'addition posée n'est introduite qu'en période 4
//     ou 5 » : c'est le dernier attendu de l'année ;
//   — comprendre le SENS de la multiplication, par des additions itérées et
//     par le mot « fois ». ⛔ Aucune table à savoir, aucune multiplication à
//     poser : cela commence au CE1.
//   — tous les nombres en jeu restent inférieurs ou égaux à cent.
//
// LE PIÈGE DE LA NOTION, et le BO l'écrit noir sur blanc : « L'élève sait que
// le symbole "=" ne peut être placé qu'entre deux termes égaux. Ainsi, il
// comprend que, pour calculer 47 + 8 en décomposant 8 en 3 + 5, l'écriture
// "47 + 3 = 50 + 5 = 55" est incorrecte. » L'élève lit « = » comme « ça
// donne », une flèche qui avance — et il écrit une suite de calculs faux.
// Le même malentendu bloque « 5 + ... = 8 » : il additionne tout ce qu'il voit
// et répond 13.
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CP clique, il ne tape pas.

import type { CalculPoseCanvasData, TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function calculPose(numbers: string[]): CalculPoseCanvasData {
  return {
    kind: "calcul_pose",
    operation: "addition",
    numbers,
    // ⛔ Le résultat resterait affiché sous la barre : la question n'aurait
    // plus d'objet.
    display: { showResult: false, showRetenues: false },
  };
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

export const additionSoustractionBank: TutorBankItemV4[] = [
  /* =========================================================
     CP_ADD_SENS — ce que veut dire additionner
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_add_sens_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "cp_add_sens",
    difficulty: 2,
    theme: "neutral",
    text: "Mila a 12 images. Elle en gagne 5. Quel calcul faut-il faire ?",
    format: "qcm",
    choices: ["12 + 5", "12 - 5", "5 - 12", "12 + 12"],
    expected: ["12 + 5"],
    comparator: "mcq_exact",
    hint: "Elle en gagne : elle en a plus qu'avant.",
    explanation: exp(
      "Additionner, c'est réunir deux quantités, ou en ajouter une à une autre.",
      "On se demande si la quantité augmente ou diminue.",
      "Elle GAGNE des images : elle en a plus à la fin qu'au début. C'est donc une addition, 12 + 5.",
      "Le calcul est 12 + 5.",
    ),
    tags: ["cp", "addition_soustraction", "sens", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_add_sens_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "cp_add_sens",
    difficulty: 3,
    theme: "neutral",
    text: "Est-ce que 7 + 3 donne le même résultat que 3 + 7 ?",
    format: "qcm",
    choices: [
      "oui, l'ordre ne change rien pour une addition",
      "non, il faut toujours commencer par le plus grand",
      "non, cela donne 10 et 4",
      "on ne peut pas savoir",
    ],
    expected: ["oui, l'ordre ne change rien pour une addition"],
    comparator: "mcq_exact",
    hint: "Imagine deux tas de billes qu'on réunit : peu importe lequel on pousse en premier.",
    explanation: exp(
      "Dans une addition, on peut échanger les deux nombres sans changer le résultat.",
      "On calcule les deux façons et on compare.",
      "7 + 3 = 10 et 3 + 7 = 10. Réunir un tas de 7 et un tas de 3, ou un tas de 3 et un tas de 7, cela donne le même tas. ⚠️ Attention : cela ne marche PAS pour la soustraction.",
      "Oui, l'ordre ne change rien pour une addition.",
    ),
    tags: ["cp", "addition_soustraction", "sens", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_add_sens_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "cp_add_sens",
    difficulty: 2,
    theme: "neutral",
    hint: "La quantité augmente-t-elle ou diminue-t-elle ?",
    tags: ["cp", "addition_soustraction", "sens", "template"],
    generate: () => {
      const a = randomInt(8, 40);
      // ⚠️ b doit rester strictement plus petit que a. Quand les deux nombres
      // tombaient égaux, « a + a » et « b + b » se confondaient avec la bonne
      // réponse, « a - b » et « b - a » se confondaient entre eux, et le QCM
      // se présentait à DEUX lignes : une chance sur deux au hasard.
      const b = randomInt(2, Math.min(15, a - 2));
      const histoires = [
        { texte: `Ryan a ${a} billes. Il en gagne ${b}.`, ajoute: true },
        { texte: `Léa a ${a} images. On lui en donne ${b}.`, ajoute: true },
        { texte: `Il y a ${a} livres sur l'étagère. On en ajoute ${b}.`, ajoute: true },
        { texte: `Naïla a ${a} bonbons. Elle en mange ${b}.`, ajoute: false },
        { texte: `Il y a ${a} oiseaux dans l'arbre. ${b} s'envolent.`, ajoute: false },
      ];
      const h = randomChoice(histoires);
      const bonne = h.ajoute ? `${a} + ${b}` : `${a} - ${b}`;
      return {
        text: `${h.texte} Quel calcul faut-il faire ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          h.ajoute ? `${a} - ${b}` : `${a} + ${b}`,
          `${b} - ${a}`,
          `${a} + ${a}`,
          `${b} + ${b}`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "On choisit l'opération d'après ce qui arrive à la quantité.",
          "On se demande s'il y en a plus ou moins à la fin qu'au début.",
          h.ajoute
            ? `Ici la quantité augmente : on ajoute, donc on écrit ${a} + ${b}.`
            : `Ici la quantité diminue : on enlève, donc on écrit ${a} - ${b}. On commence toujours par le nombre du début.`,
          `Le calcul est ${bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_SOUS_SENS — enlever, et l'opération inverse
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_sous_sens_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "cp_sous_sens",
    difficulty: 4,
    theme: "neutral",
    text: "On sait que 32 + 15 = 47. Que vaut alors 47 - 15 ?",
    format: "short",
    expected: ["32"],
    comparator: "number_equal",
    hint: "La soustraction défait ce que l'addition a fait.",
    explanation: exp(
      "La soustraction est l'opération inverse de l'addition : elle défait l'ajout.",
      "On repart du total et on enlève ce qu'on avait ajouté.",
      "On était parti de 32, on avait ajouté 15 et on avait obtenu 47. En enlevant les 15, on revient forcément à 32. Pas besoin de calculer : l'addition connue donne la réponse.",
      "47 - 15 = 32.",
    ),
    tags: ["cp", "addition_soustraction", "sens", "piege"],
  },
  {
    kind: "fixed",
    id: "cp_sous_sens_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "cp_sous_sens",
    difficulty: 4,
    theme: "neutral",
    text: "Est-ce que 9 - 4 donne le même résultat que 4 - 9 ?",
    format: "qcm",
    choices: [
      "non, l'ordre compte pour une soustraction",
      "oui, comme pour l'addition",
      "oui, cela donne 5 les deux fois",
      "on ne peut pas savoir",
    ],
    expected: ["non, l'ordre compte pour une soustraction"],
    comparator: "mcq_exact",
    hint: "Peut-on enlever 9 objets d'un tas qui n'en a que 4 ?",
    explanation: exp(
      "Dans une soustraction, on ne peut pas échanger les deux nombres.",
      "On regarde ce que veut dire chaque écriture.",
      "9 - 4, c'est enlever 4 objets à un tas de 9 : il en reste 5. 4 - 9, ce serait enlever 9 objets à un tas qui n'en a que 4 : c'est impossible au CP. L'ordre change tout.",
      "Non : l'ordre compte pour une soustraction.",
    ),
    tags: ["cp", "addition_soustraction", "sens", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_sous_sens_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "cp_sous_sens",
    difficulty: 4,
    theme: "neutral",
    hint: "L'addition donnée contient déjà la réponse.",
    tags: ["cp", "addition_soustraction", "sens", "template"],
    generate: () => {
      const a = randomInt(10, 50);
      const b = randomInt(5, 40);
      const total = a + b;
      const cherche = randomChoice([a, b]);
      const enleve = cherche === a ? b : a;
      return {
        text: `On sait que ${a} + ${b} = ${total}. Que vaut ${total} - ${enleve} ?`,
        format: "short",
        expected: [String(cherche)],
        comparator: "number_equal",
        explanation: exp(
          "La soustraction défait l'addition : elle est son opération inverse.",
          "On repart du total et on retire l'un des deux nombres de départ.",
          `${a} et ${b} réunis font ${total}. Si on retire ${enleve} de ${total}, il reste l'autre nombre : ${cherche}.`,
          `${total} - ${enleve} = ${cherche}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_SIGNE_EGAL — LE piège de la notion
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_signe_egal_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "cp_signe_egal",
    difficulty: 4,
    theme: "neutral",
    text: "Que veut dire le signe = entre deux écritures ?",
    format: "qcm",
    choices: [
      "que les deux côtés valent exactement la même chose",
      "que le résultat arrive juste après",
      "qu'il faut calculer",
      "que le calcul est fini",
    ],
    expected: ["que les deux côtés valent exactement la même chose"],
    comparator: "mcq_exact",
    hint: "Pense à une balance en équilibre : les deux plateaux se valent.",
    explanation: exp(
      "Le signe = dit que ce qui est écrit à sa gauche et ce qui est écrit à sa droite valent la même chose.",
      "On vérifie que les deux côtés ont bien la même valeur.",
      "Ce n'est pas une flèche qui veut dire « ça donne ». C'est une balance : 5 + 3 = 8 parce que 5 + 3 vaut 8, et on pourrait tout aussi bien écrire 8 = 5 + 3.",
      "Le signe = dit que les deux côtés valent la même chose.",
    ),
    tags: ["cp", "addition_soustraction", "signe_egal", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_signe_egal_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "cp_signe_egal",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève calcule 47 + 8 et écrit : « 47 + 3 = 50 + 5 = 55 ». Son résultat est bon, mais son écriture est-elle correcte ?",
    format: "qcm",
    choices: [
      "non, car 47 + 3 ne vaut pas 50 + 5",
      "oui, puisque le résultat est juste",
      "non, car il fallait écrire 47 + 8 au début",
      "oui, c'est comme cela qu'on écrit un calcul",
    ],
    expected: ["non, car 47 + 3 ne vaut pas 50 + 5"],
    comparator: "mcq_exact",
    hint: "Calcule ce que vaut chaque morceau : 47 + 3, puis 50 + 5.",
    explanation: exp(
      "Le signe = ne se place qu'entre deux écritures qui valent la même chose.",
      "On calcule chaque morceau séparément et on compare.",
      "47 + 3 vaut 50, et 50 + 5 vaut 55. Or 50 n'est pas égal à 55 : le premier signe = est donc faux. L'élève s'est servi du = comme d'une flèche « et ensuite ». Il fallait écrire deux lignes : 47 + 3 = 50, puis 50 + 5 = 55.",
      "Non : l'écriture est incorrecte, même si 55 est le bon résultat.",
    ),
    tags: ["cp", "addition_soustraction", "signe_egal", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_signe_egal_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "cp_signe_egal",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule les deux côtés et compare-les.",
    tags: ["cp", "addition_soustraction", "signe_egal", "piege", "template"],
    generate: () => {
      const a = randomInt(3, 12);
      const b = randomInt(2, 10);
      const total = a + b;
      const vrai = randomChoice([true, false]);
      const droite = vrai ? total : total + randomInt(1, 5);
      return {
        text: `Cette écriture est-elle correcte : ${a} + ${b} = ${droite} ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [vrai ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Le signe = n'est correct que si les deux côtés valent la même chose.",
          "On calcule le côté gauche, puis on le compare au côté droit.",
          vrai
            ? `${a} + ${b} = ${total}, et il y a bien ${droite} écrit à droite : les deux côtés se valent.`
            : `${a} + ${b} = ${total}, mais il y a ${droite} écrit à droite. ${total} n'est pas égal à ${droite} : le signe = est mal placé.`,
          vrai ? "Oui, l'écriture est correcte." : "Non, l'écriture est incorrecte.",
        ),
      };
    },
  },

  /* =========================================================
     CP_ADD_CALCULER — calculer une addition
  ========================================================= */
  {
    kind: "template",
    id: "cp_add_calculer_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "cp_add_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "Pars du plus grand nombre et avance.",
    tags: ["cp", "addition_soustraction", "calculer", "template"],
    generate: () => {
      const a = randomInt(11, 60);
      const b = randomInt(2, 9);
      const total = a + b;
      return {
        text: `Calcule : ${a} + ${b}`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Additionner, c'est réunir deux quantités.",
          "On part du plus grand nombre et on avance du nombre d'unités du second.",
          `On part de ${a} et on avance de ${b} : ${a} + ${b} = ${total}.`,
          `La réponse est ${total}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_add_calculer_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "cp_add_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Ajoute les dizaines entre elles, puis les unités.",
    tags: ["cp", "addition_soustraction", "calculer", "template"],
    generate: () => {
      const dizA = randomInt(1, 4);
      const uniA = randomInt(1, 4);
      const dizB = randomInt(1, 4);
      const uniB = randomInt(1, 5 - uniA);
      const a = dizA * 10 + uniA;
      const b = dizB * 10 + uniB;
      const total = a + b;
      return {
        text: `Calcule : ${a} + ${b}`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Pour ajouter deux nombres à deux chiffres, on peut les décomposer.",
          "On additionne les dizaines entre elles, les unités entre elles, puis on réunit.",
          `${dizA * 10} + ${dizB * 10} = ${(dizA + dizB) * 10}, et ${uniA} + ${uniB} = ${uniA + uniB}. En réunissant : ${(dizA + dizB) * 10} + ${uniA + uniB} = ${total}.`,
          `La réponse est ${total}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "cp_add_calculer_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "cp_add_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Calcule : 25 + 4",
    format: "short",
    expected: ["29"],
    comparator: "number_equal",
    hint: "Les dizaines ne changent pas : seul le chiffre des unités bouge.",
    explanation: exp(
      "Ajouter un petit nombre à un nombre à deux chiffres ne touche souvent que les unités.",
      "On regarde si les unités dépassent dix avant d'agir.",
      "5 + 4 = 9, et 9 ne dépasse pas dix : les 2 dizaines restent. On obtient 29.",
      "25 + 4 = 29.",
    ),
    tags: ["cp", "addition_soustraction", "calculer"],
  },

  /* =========================================================
     CP_SOUS_CALCULER — calculer une soustraction
  ========================================================= */
  {
    kind: "template",
    id: "cp_sous_calculer_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "cp_sous_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "Pars du grand nombre et recule.",
    tags: ["cp", "addition_soustraction", "calculer", "template"],
    generate: () => {
      const a = randomInt(12, 60);
      const b = randomInt(2, 9);
      const reste = a - b;
      return {
        text: `Calcule : ${a} - ${b}`,
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation: exp(
          "Soustraire, c'est enlever une quantité à une autre.",
          "On part du grand nombre et on recule du nombre d'unités à retirer.",
          `On part de ${a} et on recule de ${b} : ${a} - ${b} = ${reste}.`,
          `La réponse est ${reste}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_sous_calculer_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "cp_sous_calculer",
    difficulty: 4,
    theme: "neutral",
    hint: "Il faut casser une dizaine pour pouvoir enlever.",
    tags: ["cp", "addition_soustraction", "calculer", "piege", "template"],
    generate: () => {
      // Le cassage de dizaine, que le BO installe dès la période 3.
      const dizaines = randomInt(2, 8);
      const depart = dizaines * 10;
      const b = randomInt(2, 9);
      const reste = depart - b;
      return {
        text: `Calcule : ${depart} - ${b}`,
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation: exp(
          "Quand il n'y a pas assez d'unités pour enlever, on casse une dizaine.",
          "On transforme une dizaine en dix unités, puis on retire.",
          `${depart}, c'est ${dizaines} dizaines. On casse une dizaine : il reste ${dizaines - 1} dizaines et 10 unités. On enlève ${b} unités aux 10 : il en reste ${10 - b}. Cela fait ${dizaines - 1} dizaines et ${10 - b} unités, soit ${reste}.`,
          `${depart} - ${b} = ${reste}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_ADD_SOUS_LIGNE — l'égalité à trou
     Là où le malentendu sur le « = » se voit tout de suite.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_add_sous_ligne_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "cp_add_sous_ligne",
    difficulty: 4,
    theme: "neutral",
    text: "Complète : 5 + … = 8",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Le trou n'est pas le résultat : on cherche ce qui manque pour arriver à 8.",
    explanation: exp(
      "Dans une égalité à trou, les deux côtés du signe = doivent avoir la même valeur.",
      "On cherche le nombre qui, ajouté à celui de gauche, donne celui de droite.",
      "De 5 à 8, il manque 3 : 5 + 3 = 8. Répondre 13 reviendrait à additionner 5 et 8 sans regarder où est le trou.",
      "Le nombre manquant est 3.",
    ),
    tags: ["cp", "addition_soustraction", "egalite_trou", "piege"],
  },
  {
    kind: "template",
    id: "cp_add_sous_ligne_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "cp_add_sous_ligne",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche ce qui manque, pas la somme de ce que tu vois.",
    tags: ["cp", "addition_soustraction", "egalite_trou", "piege", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const manque = randomInt(1, 10 - a);
      const total = a + manque;
      const trouADroite = randomChoice([true, false]);
      return {
        text: trouADroite
          ? `Complète : ${a} + … = ${total}`
          : `Complète : … + ${manque} = ${total}`,
        format: "short",
        expected: [String(trouADroite ? manque : a)],
        comparator: "number_equal",
        explanation: exp(
          "Une égalité à trou demande le nombre qui rend les deux côtés égaux.",
          "On part du nombre connu et on cherche ce qui manque pour atteindre le total.",
          trouADroite
            ? `De ${a} à ${total}, il manque ${manque} : ${a} + ${manque} = ${total}.`
            : `De ${manque} à ${total}, il manque ${a} : ${a} + ${manque} = ${total}.`,
          `Le nombre manquant est ${trouADroite ? manque : a}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_add_sous_ligne_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "cp_add_sous_ligne",
    difficulty: 5,
    theme: "neutral",
    hint: "Le résultat est écrit à GAUCHE cette fois. Le signe = fonctionne dans les deux sens.",
    tags: ["cp", "addition_soustraction", "egalite_trou", "piege", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const b = randomInt(2, 9);
      const total = a + b;
      return {
        text: `Complète : ${total} = ${a} + …`,
        format: "short",
        expected: [String(b)],
        comparator: "number_equal",
        explanation: exp(
          "Le signe = est une balance : elle se lit aussi bien de gauche à droite que de droite à gauche.",
          "On cherche ce qu'il faut ajouter à droite pour retrouver le nombre de gauche.",
          `À droite, on a déjà ${a}. Pour atteindre ${total}, il faut ajouter ${b} : ${total} = ${a} + ${b}.`,
          `Le nombre manquant est ${b}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_ADD_POSE — l'addition en colonnes
     Le BO la place en période 4 ou 5 : c'est le dernier
     apprentissage de l'année.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_add_pose_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "cp_add_pose",
    difficulty: 4,
    theme: "neutral",
    text: "Pour poser l'addition 45 + 37 en colonnes, que faut-il aligner ?",
    format: "qcm",
    choices: [
      "les unités sous les unités et les dizaines sous les dizaines",
      "les nombres à gauche, l'un sous l'autre",
      "le plus grand nombre en haut, peu importe le reste",
      "les chiffres dans l'ordre où on les écrit",
    ],
    expected: ["les unités sous les unités et les dizaines sous les dizaines"],
    comparator: "mcq_exact",
    hint: "Chaque colonne ne doit contenir qu'une seule sorte de chiffres.",
    explanation: exp(
      "Poser une addition, c'est ranger les chiffres par colonnes selon leur valeur.",
      "On écrit les unités sous les unités, les dizaines sous les dizaines.",
      "Dans 45 + 37, le 5 et le 7 vont dans la même colonne : ce sont les unités. Le 4 et le 3 vont dans la colonne d'à côté : ce sont les dizaines. Aligner les nombres à gauche mélangerait les dizaines et les unités, et le résultat serait faux.",
      "On aligne les unités sous les unités et les dizaines sous les dizaines.",
    ),
    tags: ["cp", "addition_soustraction", "pose", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_add_pose_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "cp_add_pose",
    difficulty: 4,
    theme: "neutral",
    hint: "Commence par la colonne des unités, à droite.",
    tags: ["cp", "addition_soustraction", "pose", "template", "canvas"],
    generate: () => {
      const dizA = randomInt(1, 4);
      const uniA = randomInt(1, 4);
      const dizB = randomInt(1, 4);
      const uniB = randomInt(1, 5);
      const a = dizA * 10 + uniA;
      const b = dizB * 10 + uniB;
      const total = a + b;
      return {
        text: "Calcule cette addition posée.",
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Dans une addition posée, on calcule colonne par colonne, en commençant par les unités.",
          "On additionne d'abord les unités, puis les dizaines.",
          `Unités : ${uniA} + ${uniB} = ${uniA + uniB}. Dizaines : ${dizA} + ${dizB} = ${dizA + dizB}. Cela donne ${dizA + dizB} dizaines et ${uniA + uniB} unités, soit ${total}.`,
          `${a} + ${b} = ${total}.`,
        ),
        canvas: calculPose([String(a), String(b)]),
      };
    },
  },
  {
    kind: "template",
    id: "cp_add_pose_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "cp_add_pose",
    difficulty: 3,
    theme: "neutral",
    hint: "Trois nombres, une seule addition : on les empile.",
    tags: ["cp", "addition_soustraction", "pose", "template", "canvas"],
    generate: () => {
      const a = randomInt(11, 30);
      const b = randomInt(2, 9);
      const c = randomInt(11, 40);
      const total = a + b + c;
      return {
        text: "Calcule cette addition posée.",
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Une addition posée peut réunir deux ou trois nombres.",
          "On empile les nombres en alignant les unités, puis on additionne colonne par colonne.",
          `${a} + ${b} = ${a + b}, puis ${a + b} + ${c} = ${total}.`,
          `La réponse est ${total}.`,
        ),
        canvas: calculPose([String(a), String(b), String(c)]),
      };
    },
  },

  /* =========================================================
     CP_MULT_SENS — le sens de la multiplication
     ⛔ Aucune table à savoir au CP : on additionne encore.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_mult_sens_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "cp_mult_sens",
    difficulty: 3,
    theme: "neutral",
    text: "Jan a 3 paquets de biscuits. Chaque paquet contient 20 biscuits. Quel calcul donne le nombre de biscuits ?",
    format: "qcm",
    choices: ["20 + 20 + 20", "20 + 3", "20 - 3", "3 + 3 + 3"],
    expected: ["20 + 20 + 20"],
    comparator: "mcq_exact",
    hint: "Chaque paquet apporte 20 biscuits, et il y a 3 paquets.",
    explanation: exp(
      "Quand plusieurs groupes contiennent la même quantité, on additionne cette quantité autant de fois qu'il y a de groupes.",
      "On compte combien de groupes, et combien il y a dans chaque groupe.",
      "3 paquets de 20 biscuits, cela fait « trois fois vingt biscuits » : 20 + 20 + 20. Écrire 20 + 3 reviendrait à ajouter 3 biscuits, pas 3 paquets.",
      "Le calcul est 20 + 20 + 20.",
    ),
    tags: ["cp", "addition_soustraction", "multiplication", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_mult_sens_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "cp_mult_sens",
    difficulty: 3,
    theme: "neutral",
    text: "Que veut dire « 4 fois 5 » ?",
    format: "qcm",
    choices: [
      "5 + 5 + 5 + 5",
      "4 + 5",
      "5 - 4",
      "4 + 4 + 4 + 4 + 4 + 4",
    ],
    expected: ["5 + 5 + 5 + 5"],
    comparator: "mcq_exact",
    hint: "« 4 fois », c'est quatre paquets. Chaque paquet contient 5.",
    explanation: exp(
      "« Tant de fois » indique le nombre de groupes égaux à réunir.",
      "On écrit la quantité d'un groupe, autant de fois qu'il y a de groupes.",
      "« 4 fois 5 », c'est quatre groupes de 5 : 5 + 5 + 5 + 5, ce qui fait 20.",
      "« 4 fois 5 » veut dire 5 + 5 + 5 + 5.",
    ),
    tags: ["cp", "addition_soustraction", "multiplication", "qcm"],
  },
  {
    kind: "template",
    id: "cp_mult_sens_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "cp_mult_sens",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne la quantité d'un groupe autant de fois qu'il y a de groupes.",
    tags: ["cp", "addition_soustraction", "multiplication", "template"],
    generate: () => {
      const groupes = randomInt(2, 5);
      const parGroupe = randomInt(2, 6);
      const total = groupes * parGroupe;
      const contexte = randomChoice([
        { contenant: "paquets", contenu: "biscuits" },
        { contenant: "boites", contenu: "billes" },
        { contenant: "sachets", contenu: "bonbons" },
        { contenant: "cages", contenu: "poules" },
      ]);
      return {
        text: `Il y a ${groupes} ${contexte.contenant}. Chaque ${contexte.contenant.slice(0, -1)} contient ${parGroupe} ${contexte.contenu}. Combien y a-t-il de ${contexte.contenu} en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Des groupes qui contiennent tous la même quantité se comptent en additions répétées.",
          "On additionne la quantité d'un groupe autant de fois qu'il y a de groupes.",
          `${Array.from({ length: groupes }, () => parGroupe).join(" + ")} = ${total}. On dit aussi « ${groupes} fois ${parGroupe} ».`,
          `Il y a ${total} ${contexte.contenu}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_ADD_SOUS_DEFI
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_add_sous_defi_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "cp_add_sous_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Dans la boite, j'ai mangé 6 bonbons et il en reste encore 21. Combien y avait-il de bonbons dans la boite au départ ?",
    format: "short",
    expected: ["27"],
    comparator: "number_equal",
    hint: "Ce qui reste plus ce qui a été mangé, cela redonne le début.",
    explanation: exp(
      "Quand on cherche l'état de départ, on remonte le temps : on remet ce qui a été enlevé.",
      "On additionne ce qui reste et ce qui a été pris.",
      "Il reste 21 bonbons et 6 ont été mangés : 21 + 6 = 27. Le mot « mangé » fait penser à une soustraction, mais c'est le DÉPART qu'on cherche, pas ce qui reste.",
      "Il y avait 27 bonbons au départ.",
    ),
    tags: ["cp", "addition_soustraction", "defi", "piege"],
  },
  {
    kind: "template",
    id: "cp_add_sous_defi_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "cp_add_sous_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "On cherche le DÉPART : remets ce qui a été enlevé.",
    tags: ["cp", "addition_soustraction", "defi", "piege", "template"],
    generate: () => {
      const reste = randomInt(10, 40);
      const pris = randomInt(3, 15);
      const depart = reste + pris;
      const histoire = randomChoice([
        { objet: "bonbons", verbe: "mangé" },
        { objet: "billes", verbe: "perdu" },
        { objet: "images", verbe: "donné" },
        { objet: "letchis", verbe: "mangé" },
      ]);
      return {
        text: `J'avais des ${histoire.objet}. J'en ai ${histoire.verbe} ${pris}, et il m'en reste ${reste}. Combien en avais-je au départ ?`,
        format: "short",
        expected: [String(depart)],
        comparator: "number_equal",
        explanation: exp(
          "Pour retrouver l'état de départ, on remet ce qui a été enlevé.",
          "On additionne ce qui reste et ce qui est parti.",
          `${reste} + ${pris} = ${depart}. Le verbe « ${histoire.verbe} » fait penser à une soustraction, mais ici c'est le départ qu'on cherche.`,
          `J'en avais ${depart} au départ.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_add_sous_defi_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "addition_soustraction",
    microId: "cp_add_sous_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Fais les deux étapes dans l'ordre.",
    tags: ["cp", "addition_soustraction", "defi", "template"],
    generate: () => {
      const depart = randomInt(15, 29);
      const descendent = randomInt(3, 10);
      const montent = randomInt(2, 8);
      const total = depart - descendent + montent;
      return {
        text: `Il y avait ${depart} enfants dans le bus. Au premier arrêt, ${descendent} enfants sont descendus. Au deuxième arrêt, ${montent} enfants sont montés. Combien y a-t-il d'enfants dans le bus maintenant ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Un problème en deux étapes se résout dans l'ordre où les choses arrivent.",
          "On traite le premier arrêt, on note le résultat, puis le second.",
          `Après le premier arrêt : ${depart} - ${descendent} = ${depart - descendent}. Après le second : ${depart - descendent} + ${montent} = ${total}.`,
          `Il y a maintenant ${total} enfants.`,
        ),
      };
    },
  },
];
