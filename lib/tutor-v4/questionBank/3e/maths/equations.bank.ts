// lib/tutor-v4/question-banks/maths/3e/equations.bank.ts

/**
 * =========================================================
 * EQUATIONS.BANK.TS
 * =========================================================
 *
 * Banque de questions Tutor V4 - Mathématiques 3e
 * Notion : Équations
 *
 * Micro-compétences :
 * - equation_reconnaitre
 * - equation_resoudre_simple
 * - equation_resoudre_developper
 * - equation_produit_nul
 * - equation_verifier
 * - equation_probleme
 * - equation_defis
 *
 * Choix pédagogiques :
 * - progression très guidée ;
 * - nombreux templates ;
 * - erreurs fréquentes intégrées ;
 * - rédaction mathématique ;
 * - préparation Brevet + lycée.
 */

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: string[]) {
  return shuffle([correct, ...wrongs]).slice(0, 4);
}

export const equationsBank: TutorBankItemV4[] = [

{
  kind: "fixed",
  id: "3e_equation_reconnaitre_fixed_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_reconnaitre",
  difficulty: 1,
  theme: "neutral",
  text: "Parmi les écritures suivantes, laquelle est une équation ?",
  format: "qcm",
  choices: ["2x + 5 = 13", "2x + 5", "13", "x²"],
  expected: ["2x + 5 = 13"],
  comparator: "mcq_exact",
  hint: "Une équation contient une inconnue et un signe égal.",
  explanation:
    "Définition : une équation est une égalité qui contient une inconnue.\n\n" +
    "Méthode : on cherche une écriture avec un signe égal et une lettre.\n\n" +
    "Calcul : 2x + 5 = 13 contient l’inconnue x et le signe égal.\n\n" +
    "Conclusion : 2x + 5 = 13 est une équation.",
  tags: ["equation", "reconnaitre", "qcm"],
},

{
  kind: "fixed",
  id: "3e_equation_reconnaitre_fixed_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_reconnaitre",
  difficulty: 1,
  theme: "neutral",
  text: "Dans l’équation 3x + 4 = 19, quelle est l’inconnue ?",
  format: "qcm",
  choices: ["x", "3", "4", "19"],
  expected: ["x"],
  comparator: "mcq_exact",
  hint: "L’inconnue est souvent représentée par une lettre.",
  explanation:
    "Définition : l’inconnue est le nombre que l’on cherche dans une équation.\n\n" +
    "Méthode : on repère la lettre présente dans l’égalité.\n\n" +
    "Calcul : dans 3x + 4 = 19, la lettre est x.\n\n" +
    "Conclusion : l’inconnue est x.",
  tags: ["equation", "inconnue", "qcm"],
},

{
  kind: "template",
  id: "3e_equation_reconnaitre_tpl_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_reconnaitre",
  difficulty: 1,
  theme: "neutral",
  hint: "Cherche le signe égal.",
  tags: ["equation", "reconnaitre", "template"],
  generate: () => {
    const a = randomInt(2, 9);
    const b = randomInt(1, 12);
    const c = randomInt(10, 40);
    const equation = `${a}x + ${b} = ${c}`;

    return {
      text: "Quelle écriture est une équation ?",
      format: "qcm",
      choices: shuffle([
        equation,
        `${a}x + ${b}`,
        `${c} - ${b}`,
        `${a}x`,
      ]),
      expected: [equation],
      comparator: "mcq_exact",
      explanation:
        "Définition : une équation est une égalité contenant une inconnue.\n\n" +
        "Méthode : on cherche une écriture avec un signe égal.\n\n" +
        `Calcul : ${equation} contient une inconnue et un signe égal.\n\n` +
        `Conclusion : ${equation} est une équation.`,
    };
  },
},

{
  kind: "template",
  id: "3e_equation_reconnaitre_tpl_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_reconnaitre",
  difficulty: 2,
  theme: "neutral",
  hint: "Une solution est une valeur qui rend l’égalité vraie.",
  tags: ["equation", "solution", "template"],
  generate: () => {
    const x = randomInt(2, 10);
    const a = randomInt(2, 6);
    const b = randomInt(1, 10);
    const result = a * x + b;

    return {
      text: `Dans l’équation ${a}x + ${b} = ${result}, que signifie « résoudre l’équation » ?`,
      format: "qcm",
      choices: [
        "trouver la valeur de x qui rend l’égalité vraie",
        "remplacer x par n’importe quel nombre",
        "additionner tous les nombres",
        "supprimer le signe égal",
      ],
      expected: ["trouver la valeur de x qui rend l’égalité vraie"],
      comparator: "mcq_exact",
      explanation:
        "Définition : résoudre une équation signifie trouver la ou les valeurs de l’inconnue qui rendent l’égalité vraie.\n\n" +
        "Méthode : on cherche la valeur de x qui vérifie l’égalité.\n\n" +
        `Calcul : ici, x = ${x} rend l’égalité vraie car ${a} × ${x} + ${b} = ${result}.\n\n` +
        "Conclusion : résoudre l’équation, c’est trouver la bonne valeur de x.",
    };
  },
},

{
  kind: "fixed",
  id: "3e_equation_reconnaitre_open_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_reconnaitre",
  difficulty: 2,
  theme: "neutral",
  text: "Explique avec tes mots ce qu’est une équation.",
  format: "open",
  expected: ["égalité", "inconnue"],
  comparator: "contains_keyword",
  hint: "Utilise les mots égalité et inconnue.",
  explanation:
    "Définition : une équation est une égalité qui contient une inconnue.\n\n" +
    "Méthode : pour reconnaître une équation, on cherche un signe égal et une lettre.\n\n" +
    "Calcul : par exemple, 2x + 3 = 11 est une équation car elle contient x et =.\n\n" +
    "Conclusion : une équation sert à chercher une valeur inconnue.",
  tags: ["equation", "reconnaitre", "open"],
},
{
  kind: "fixed",
  id: "3e_equation_simple_fixed_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_resoudre_simple",
  difficulty: 1,
  theme: "neutral",
  text: "Résoudre : x + 7 = 12",
  format: "short",
  expected: ["5"],
  comparator: "number_equal",
  hint: "On enlève 7 des deux côtés.",
  explanation:
    "Définition : résoudre une équation, c’est trouver la valeur de l’inconnue.\n\n" +
    "Méthode : on isole x en effectuant la même opération des deux côtés.\n\n" +
    "Calcul : x + 7 = 12 donc x = 12 - 7 = 5.\n\n" +
    "Conclusion : la solution est x = 5.",
  tags: ["equation", "simple", "addition"],
},

{
  kind: "fixed",
  id: "3e_equation_simple_fixed_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_resoudre_simple",
  difficulty: 1,
  theme: "neutral",
  text: "Résoudre : 4x = 28",
  format: "short",
  expected: ["7"],
  comparator: "number_equal",
  hint: "On divise par 4.",
  explanation:
    "Définition : résoudre une équation, c’est trouver la valeur de x.\n\n" +
    "Méthode : pour isoler x dans 4x = 28, on divise les deux côtés par 4.\n\n" +
    "Calcul : x = 28 ÷ 4 = 7.\n\n" +
    "Conclusion : la solution est x = 7.",
  tags: ["equation", "simple", "multiplication"],
},

{
  kind: "template",
  id: "3e_equation_simple_tpl_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_resoudre_simple",
  difficulty: 1,
  theme: "neutral",
  hint: "Enlève le nombre ajouté.",
  tags: ["equation", "simple", "addition", "template"],
  generate: () => {
    const x = randomInt(1, 20);
    const b = randomInt(2, 15);
    const c = x + b;

    return {
      text: `Résoudre : x + ${b} = ${c}`,
      format: "short",
      expected: [String(x)],
      comparator: "number_equal",
      explanation:
        `Définition : résoudre une équation, c’est trouver la valeur de l’inconnue.\n\n` +
        `Méthode : on isole x en retirant ${b} des deux côtés.\n\n` +
        `Calcul : x = ${c} - ${b} = ${x}.\n\n` +
        `Conclusion : la solution est x = ${x}.`,
    };
  },
},

{
  kind: "template",
  id: "3e_equation_simple_tpl_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_resoudre_simple",
  difficulty: 2,
  theme: "neutral",
  hint: "Ajoute le nombre soustrait.",
  tags: ["equation", "simple", "soustraction", "template"],
  generate: () => {
    const x = randomInt(5, 25);
    const b = randomInt(2, 12);
    const c = x - b;

    return {
      text: `Résoudre : x - ${b} = ${c}`,
      format: "short",
      expected: [String(x)],
      comparator: "number_equal",
      explanation:
        `Définition : résoudre une équation, c’est trouver la valeur de x.\n\n` +
        `Méthode : on isole x en ajoutant ${b} des deux côtés.\n\n` +
        `Calcul : x = ${c} + ${b} = ${x}.\n\n` +
        `Conclusion : la solution est x = ${x}.`,
    };
  },
},

{
  kind: "template",
  id: "3e_equation_simple_tpl_3",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_resoudre_simple",
  difficulty: 2,
  theme: "neutral",
  hint: "Divise par le coefficient de x.",
  tags: ["equation", "simple", "multiplication", "template"],
  generate: () => {
    const x = randomInt(2, 15);
    const a = randomInt(2, 9);
    const c = a * x;

    return {
      text: `Résoudre : ${a}x = ${c}`,
      format: "short",
      expected: [String(x)],
      comparator: "number_equal",
      explanation:
        `Définition : résoudre une équation, c’est trouver la valeur de l’inconnue.\n\n` +
        `Méthode : comme x est multiplié par ${a}, on divise les deux côtés par ${a}.\n\n` +
        `Calcul : x = ${c} ÷ ${a} = ${x}.\n\n` +
        `Conclusion : la solution est x = ${x}.`,
    };
  },
},

{
  kind: "template",
  id: "3e_equation_simple_tpl_4",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_resoudre_simple",
  difficulty: 3,
  theme: "neutral",
  hint: "Commence par enlever le nombre ajouté ou soustrait.",
  tags: ["equation", "simple", "deux_etapes", "template"],
  generate: () => {
    const x = randomInt(2, 12);
    const a = randomInt(2, 8);
    const b = randomInt(1, 10);
    const c = a * x + b;

    return {
      text: `Résoudre : ${a}x + ${b} = ${c}`,
      format: "short",
      expected: [String(x)],
      comparator: "number_equal",
      explanation:
        `Définition : une équation du premier degré simple peut se résoudre en isolant progressivement x.\n\n` +
        `Méthode : on enlève d’abord ${b}, puis on divise par ${a}.\n\n` +
        `Calcul : ${a}x + ${b} = ${c}, donc ${a}x = ${c} - ${b} = ${a * x}. Puis x = ${a * x} ÷ ${a} = ${x}.\n\n` +
        `Conclusion : la solution est x = ${x}.`,
    };
  },
},

{
  kind: "template",
  id: "3e_equation_simple_tpl_5",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_resoudre_simple",
  difficulty: 3,
  theme: "neutral",
  hint: "Regroupe les x d’un côté et les nombres de l’autre.",
  tags: ["equation", "simple", "x_deux_cotes", "template"],
  generate: () => {
    const x = randomInt(2, 12);
    const a = randomInt(4, 9);
    const b = randomInt(1, 5);
    const c = randomInt(1, 10);
    const d = (a - b) * x + c;

    return {
      text: `Résoudre : ${a}x + ${c} = ${b}x + ${d}`,
      format: "short",
      expected: [String(x)],
      comparator: "number_equal",
      explanation:
        `Définition : quand x apparaît des deux côtés, on regroupe les termes en x du même côté.\n\n` +
        `Méthode : on retire ${b}x des deux côtés, puis on isole x.\n\n` +
        `Calcul : ${a}x + ${c} = ${b}x + ${d}. Donc ${a - b}x + ${c} = ${d}. Puis ${a - b}x = ${d - c}. Enfin x = ${d - c} ÷ ${a - b} = ${x}.\n\n` +
        `Conclusion : la solution est x = ${x}.`,
    };
  },
},

{
  kind: "fixed",
  id: "3e_equation_simple_erreur_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_resoudre_simple",
  difficulty: 3,
  theme: "neutral",
  text: "Un élève résout x + 6 = 14 et écrit x = 14 + 6. A-t-il raison ?",
  format: "qcm",
  choices: ["oui", "non"],
  expected: ["non"],
  comparator: "mcq_exact",
  hint: "Pour enlever +6, il faut faire l’opération inverse.",
  explanation:
    "Définition : résoudre une équation consiste à isoler l’inconnue.\n\n" +
    "Méthode : pour enlever +6, on soustrait 6 des deux côtés.\n\n" +
    "Calcul : x + 6 = 14 donc x = 14 - 6 = 8.\n\n" +
    "Conclusion : l’élève a tort ; la solution est x = 8.",
  tags: ["equation", "erreur", "addition"],
},

{
  kind: "fixed",
  id: "3e_equation_simple_open_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_resoudre_simple",
  difficulty: 3,
  theme: "neutral",
  text: "Explique pourquoi on doit faire la même opération des deux côtés d’une équation.",
  format: "open",
  expected: ["égalité", "deux côtés", "conserver"],
  comparator: "contains_keyword",
  hint: "Une équation est une égalité : il faut garder l’équilibre.",
  explanation:
    "Définition : une équation est une égalité entre deux expressions.\n\n" +
    "Méthode : pour conserver l’égalité, on effectue la même opération sur les deux membres.\n\n" +
    "Calcul : si on enlève 5 à gauche, on doit aussi enlever 5 à droite.\n\n" +
    "Conclusion : faire la même opération des deux côtés permet de garder une équation équivalente.",
  tags: ["equation", "raisonnement", "open"],
},
{
  kind: "fixed",
  id: "3e_equation_developper_fixed_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_resoudre_developper",
  difficulty: 3,
  theme: "neutral",
  text: "Résoudre : 2(x + 3) = 14",
  format: "short",
  expected: ["4"],
  comparator: "number_equal",
  hint: "Développe d’abord 2(x + 3).",
  explanation:
    "Définition : certaines équations nécessitent de développer avant de résoudre.\n\n" +
    "Méthode : on développe le membre de gauche, puis on isole x.\n\n" +
    "Calcul : 2(x + 3) = 14 donne 2x + 6 = 14. Donc 2x = 8, puis x = 4.\n\n" +
    "Conclusion : la solution est x = 4.",
  tags: ["equation", "developper", "fixed"],
},

{
  kind: "fixed",
  id: "3e_equation_developper_erreur_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_resoudre_developper",
  difficulty: 3,
  theme: "neutral",
  text: "Un élève écrit : 3(x + 4) = 3x + 4. A-t-il raison ?",
  format: "qcm",
  choices: ["oui", "non"],
  expected: ["non"],
  comparator: "mcq_exact",
  hint: "Le 3 multiplie tous les termes entre parenthèses.",
  explanation:
    "Définition : développer signifie distribuer le facteur devant la parenthèse à chaque terme de la parenthèse.\n\n" +
    "Méthode : 3 doit multiplier x et aussi 4.\n\n" +
    "Calcul : 3(x + 4) = 3x + 12, et non 3x + 4.\n\n" +
    "Conclusion : l’élève a tort.",
  tags: ["equation", "developper", "erreur"],
},

{
  kind: "template",
  id: "3e_equation_developper_tpl_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_resoudre_developper",
  difficulty: 3,
  theme: "neutral",
  hint: "Développe puis enlève le nombre constant.",
  tags: ["equation", "developper", "template"],
  generate: () => {
    const x = randomInt(2, 12);
    const a = randomInt(2, 6);
    const b = randomInt(1, 8);
    const right = a * (x + b);

    return {
      text: `Résoudre : ${a}(x + ${b}) = ${right}`,
      format: "short",
      expected: [String(x)],
      comparator: "number_equal",
      explanation:
        `Définition : résoudre une équation avec parenthèses peut nécessiter un développement.\n\n` +
        `Méthode : on développe ${a}(x + ${b}), puis on isole x.\n\n` +
        `Calcul : ${a}(x + ${b}) = ${a}x + ${a * b}. Donc ${a}x + ${a * b} = ${right}. Puis ${a}x = ${right - a * b}. Enfin x = ${right - a * b} ÷ ${a} = ${x}.\n\n` +
        `Conclusion : la solution est x = ${x}.`,
    };
  },
},

{
  kind: "template",
  id: "3e_equation_developper_tpl_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_resoudre_developper",
  difficulty: 3,
  theme: "neutral",
  hint: "Attention au signe moins dans la parenthèse.",
  tags: ["equation", "developper", "signe_moins", "template"],
  generate: () => {
    const x = randomInt(3, 15);
    const a = randomInt(2, 7);
    const b = randomInt(1, 6);
    const right = a * (x - b);

    return {
      text: `Résoudre : ${a}(x - ${b}) = ${right}`,
      format: "short",
      expected: [String(x)],
      comparator: "number_equal",
      explanation:
        `Définition : développer une expression avec une soustraction demande de respecter le signe moins.\n\n` +
        `Méthode : on distribue ${a} sur x et sur -${b}.\n\n` +
        `Calcul : ${a}(x - ${b}) = ${a}x - ${a * b}. Donc ${a}x - ${a * b} = ${right}. Puis ${a}x = ${right + a * b}. Enfin x = ${right + a * b} ÷ ${a} = ${x}.\n\n` +
        `Conclusion : la solution est x = ${x}.`,
    };
  },
},

{
  kind: "template",
  id: "3e_equation_developper_tpl_3",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_resoudre_developper",
  difficulty: 4,
  theme: "neutral",
  hint: "Développe les deux membres avant de regrouper.",
  tags: ["equation", "developper", "deux_membres", "template"],
  generate: () => {
    const x = randomInt(2, 10);
    const a = randomInt(2, 5);
    const b = randomInt(1, 6);
    const c = randomInt(2, 5);
    const d = randomInt(1, 6);

    const leftConst = a * b;
    const rightConst = c * d;
    const rightAdjustment = (a - c) * x + leftConst - rightConst;

    return {
      text: `Résoudre : ${a}(x + ${b}) = ${c}(x + ${d}) + ${rightAdjustment}`,
      format: "short",
      expected: [String(x)],
      comparator: "number_equal",
      explanation:
        `Définition : une équation avec des parenthèses peut se résoudre en développant puis en regroupant les termes.\n\n` +
        `Méthode : on développe les deux membres, puis on regroupe les x d’un côté et les nombres de l’autre.\n\n` +
        `Calcul : ${a}(x + ${b}) = ${a}x + ${leftConst}. Et ${c}(x + ${d}) + ${rightAdjustment} = ${c}x + ${rightConst + rightAdjustment}. On obtient ${a}x + ${leftConst} = ${c}x + ${rightConst + rightAdjustment}. Donc ${a - c}x = ${(rightConst + rightAdjustment) - leftConst}. Ainsi x = ${x}.\n\n` +
        `Conclusion : la solution est x = ${x}.`,
    };
  },
},

{
  kind: "template",
  id: "3e_equation_developper_tpl_4",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_resoudre_developper",
  difficulty: 4,
  theme: "neutral",
  hint: "Réduis les termes en x avant de résoudre.",
  tags: ["equation", "reduire", "template"],
  generate: () => {
    const x = randomInt(2, 12);
    const a = randomInt(2, 7);
    const b = randomInt(2, 7);
    const c = randomInt(1, 10);
    const right = (a + b) * x + c;

    return {
      text: `Résoudre : ${a}x + ${b}x + ${c} = ${right}`,
      format: "short",
      expected: [String(x)],
      comparator: "number_equal",
      explanation:
        `Définition : réduire une expression consiste à regrouper les termes de même nature.\n\n` +
        `Méthode : on regroupe les termes en x, puis on isole x.\n\n` +
        `Calcul : ${a}x + ${b}x = ${a + b}x. Donc ${a + b}x + ${c} = ${right}. Puis ${a + b}x = ${right - c}. Enfin x = ${right - c} ÷ ${a + b} = ${x}.\n\n` +
        `Conclusion : la solution est x = ${x}.`,
    };
  },
},

{
  kind: "fixed",
  id: "3e_equation_developper_open_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_resoudre_developper",
  difficulty: 4,
  theme: "neutral",
  text: "Explique pourquoi il faut développer 2(x + 5) avant de résoudre 2(x + 5) = 18.",
  format: "open",
  expected: ["développer", "2x", "10", "isoler"],
  comparator: "contains_keyword",
  hint: "Le 2 multiplie toute la parenthèse.",
  explanation:
    "Définition : développer permet de supprimer une parenthèse en distribuant le facteur à chaque terme.\n\n" +
    "Méthode : on transforme 2(x + 5) en une expression sans parenthèses.\n\n" +
    "Calcul : 2(x + 5) = 2x + 10. L’équation devient 2x + 10 = 18, puis 2x = 8, donc x = 4.\n\n" +
    "Conclusion : développer aide à obtenir une équation plus simple à résoudre.",
  tags: ["equation", "developper", "open", "raisonnement"],
},
{
  kind: "fixed",
  id: "3e_equation_produit_nul_fixed_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_produit_nul",
  difficulty: 3,
  theme: "neutral",
  text: "Résoudre : (x - 3)(x + 5) = 0",
  format: "open",
  expected: ["3", "-5"],
  comparator: "contains_keyword",
  hint: "Un produit est nul si au moins un facteur est nul.",
  explanation:
    "Définition : un produit est nul si au moins un de ses facteurs est nul.\n\n" +
    "Méthode : on résout séparément x - 3 = 0 puis x + 5 = 0.\n\n" +
    "Calcul : x - 3 = 0 donne x = 3. Et x + 5 = 0 donne x = -5.\n\n" +
    "Conclusion : les solutions sont x = 3 et x = -5.",
  tags: ["equation", "produit_nul", "fixed"],
},

{
  kind: "fixed",
  id: "3e_equation_produit_nul_fixed_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_produit_nul",
  difficulty: 3,
  theme: "neutral",
  text: "Quelle propriété utilise-t-on pour résoudre (x - 2)(x + 7) = 0 ?",
  format: "qcm",
  choices: [
    "un produit est nul si au moins un facteur est nul",
    "une somme est nulle si tous les termes sont positifs",
    "on additionne les deux facteurs",
    "on multiplie les solutions"
  ],
  expected: ["un produit est nul si au moins un facteur est nul"],
  comparator: "mcq_exact",
  hint: "On travaille avec un produit égal à 0.",
  explanation:
    "Définition : la propriété du produit nul dit qu’un produit est nul si au moins un facteur est nul.\n\n" +
    "Méthode : on reconnaît que l’équation est écrite sous la forme produit = 0.\n\n" +
    "Calcul : dans (x - 2)(x + 7) = 0, les deux facteurs sont x - 2 et x + 7.\n\n" +
    "Conclusion : on utilise la propriété du produit nul.",
  tags: ["equation", "produit_nul", "propriete", "qcm"],
},

{
  kind: "template",
  id: "3e_equation_produit_nul_tpl_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_produit_nul",
  difficulty: 3,
  theme: "neutral",
  hint: "Annule chaque facteur séparément.",
  tags: ["equation", "produit_nul", "template"],
  generate: () => {
    const a = randomInt(1, 9);
    const b = randomInt(1, 9);

    return {
      text: `Résoudre : (x - ${a})(x - ${b}) = 0`,
      format: "open",
      expected: [String(a), String(b)],
      comparator: "contains_keyword",
      explanation:
        `Définition : un produit est nul si au moins un facteur est nul.\n\n` +
        `Méthode : on annule chaque facteur séparément.\n\n` +
        `Calcul : x - ${a} = 0 donne x = ${a}. Et x - ${b} = 0 donne x = ${b}.\n\n` +
        `Conclusion : les solutions sont x = ${a} et x = ${b}.`,
    };
  },
},

{
  kind: "template",
  id: "3e_equation_produit_nul_tpl_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_produit_nul",
  difficulty: 3,
  theme: "neutral",
  hint: "Attention au signe dans x + a = 0.",
  tags: ["equation", "produit_nul", "signe", "template"],
  generate: () => {
    const a = randomInt(1, 9);
    const b = randomInt(1, 9);

    return {
      text: `Résoudre : (x - ${a})(x + ${b}) = 0`,
      format: "open",
      expected: [String(a), String(-b)],
      comparator: "contains_keyword",
      explanation:
        `Définition : un produit est nul si au moins un facteur est nul.\n\n` +
        `Méthode : on résout séparément x - ${a} = 0 et x + ${b} = 0.\n\n` +
        `Calcul : x - ${a} = 0 donne x = ${a}. Et x + ${b} = 0 donne x = -${b}.\n\n` +
        `Conclusion : les solutions sont x = ${a} et x = -${b}.`,
    };
  },
},

{
  kind: "template",
  id: "3e_equation_produit_nul_tpl_3",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_produit_nul",
  difficulty: 4,
  theme: "neutral",
  hint: "Un facteur peut être de la forme ax + b.",
  tags: ["equation", "produit_nul", "ax_plus_b", "template"],
  generate: () => {
    const a = randomChoice([2, 3, 4, 5]);
    const solution1 = randomInt(1, 8);
    const b = a * solution1;

    const solution2 = randomInt(1, 8);

    return {
      text: `Résoudre : (${a}x - ${b})(x - ${solution2}) = 0`,
      format: "open",
      expected: [String(solution1), String(solution2)],
      comparator: "contains_keyword",
      explanation:
        `Définition : pour qu’un produit soit nul, il suffit qu’un de ses facteurs soit nul.\n\n` +
        `Méthode : on annule chaque facteur séparément.\n\n` +
        `Calcul : ${a}x - ${b} = 0 donne ${a}x = ${b}, donc x = ${solution1}. Et x - ${solution2} = 0 donne x = ${solution2}.\n\n` +
        `Conclusion : les solutions sont x = ${solution1} et x = ${solution2}.`,
    };
  },
},

{
  kind: "template",
  id: "3e_equation_produit_nul_tpl_4",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_produit_nul",
  difficulty: 4,
  theme: "neutral",
  hint: "Même si un facteur est répété, la solution ne s’écrit qu’une fois.",
  tags: ["equation", "produit_nul", "solution_double", "template"],
  generate: () => {
    const a = randomInt(1, 9);

    return {
      text: `Résoudre : (x - ${a})² = 0`,
      format: "short",
      expected: [String(a)],
      comparator: "number_equal",
      explanation:
        `Définition : (x - ${a})² signifie (x - ${a})(x - ${a}).\n\n` +
        `Méthode : on utilise la propriété du produit nul.\n\n` +
        `Calcul : x - ${a} = 0 donne x = ${a}.\n\n` +
        `Conclusion : la seule solution est x = ${a}.`,
    };
  },
},

{
  kind: "fixed",
  id: "3e_equation_produit_nul_erreur_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_produit_nul",
  difficulty: 4,
  theme: "neutral",
  text: "Un élève résout (x - 4)(x + 2) = 0 et écrit : x = 4 et x = 2. A-t-il raison ?",
  format: "qcm",
  choices: ["oui", "non"],
  expected: ["non"],
  comparator: "mcq_exact",
  hint: "Attention : x + 2 = 0 donne une solution négative.",
  explanation:
    "Définition : un produit est nul si au moins un facteur est nul.\n\n" +
    "Méthode : on annule chaque facteur séparément.\n\n" +
    "Calcul : x - 4 = 0 donne x = 4. Et x + 2 = 0 donne x = -2.\n\n" +
    "Conclusion : l’élève a tort ; les solutions sont x = 4 et x = -2.",
  tags: ["equation", "produit_nul", "erreur", "signe"],
},

{
  kind: "fixed",
  id: "3e_equation_produit_nul_erreur_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_produit_nul",
  difficulty: 4,
  theme: "neutral",
  text: "Un élève écrit : (x - 3)(x + 1) = 0 donc x - 3 = x + 1. A-t-il raison ?",
  format: "qcm",
  choices: ["oui", "non"],
  expected: ["non"],
  comparator: "mcq_exact",
  hint: "On ne rend pas les deux facteurs égaux entre eux.",
  explanation:
    "Définition : la propriété du produit nul dit qu’un des facteurs doit être égal à 0.\n\n" +
    "Méthode : on ne compare pas les facteurs entre eux ; on les annule séparément.\n\n" +
    "Calcul : il faut résoudre x - 3 = 0 ou x + 1 = 0.\n\n" +
    "Conclusion : l’élève a tort.",
  tags: ["equation", "produit_nul", "erreur", "raisonnement"],
},

{
  kind: "fixed",
  id: "3e_equation_produit_nul_open_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_produit_nul",
  difficulty: 4,
  theme: "neutral",
  text: "Explique pourquoi l’équation (x - 5)(x + 3) = 0 a deux solutions.",
  format: "open",
  expected: ["produit", "nul", "facteur", "5", "-3"],
  comparator: "contains_keyword",
  hint: "Chaque facteur peut être nul.",
  explanation:
    "Définition : un produit est nul si au moins un facteur est nul.\n\n" +
    "Méthode : on cherche les valeurs qui annulent chacun des deux facteurs.\n\n" +
    "Calcul : x - 5 = 0 donne x = 5. Et x + 3 = 0 donne x = -3.\n\n" +
    "Conclusion : l’équation a deux solutions : 5 et -3.",
  tags: ["equation", "produit_nul", "open", "raisonnement"],
},
{
  kind: "fixed",
  id: "3e_equation_verifier_fixed_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_verifier",
  difficulty: 2,
  theme: "neutral",
  text: "Le nombre 4 est-il solution de l’équation 3x + 2 = 14 ?",
  format: "qcm",
  choices: ["oui", "non"],
  expected: ["oui"],
  comparator: "mcq_exact",
  hint: "Remplace x par 4.",
  explanation:
    "Définition : vérifier une solution consiste à remplacer l’inconnue par la valeur proposée.\n\n" +
    "Méthode : on remplace x par 4 dans le membre de gauche.\n\n" +
    "Calcul : 3 × 4 + 2 = 12 + 2 = 14.\n\n" +
    "Conclusion : 4 est bien solution de l’équation.",
  tags: ["equation", "verifier", "qcm"],
},

{
  kind: "fixed",
  id: "3e_equation_verifier_fixed_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_verifier",
  difficulty: 2,
  theme: "neutral",
  text: "Le nombre 5 est-il solution de l’équation 2x + 1 = 12 ?",
  format: "qcm",
  choices: ["oui", "non"],
  expected: ["non"],
  comparator: "mcq_exact",
  hint: "Remplace x par 5 et compare avec 12.",
  explanation:
    "Définition : vérifier une solution consiste à tester si l’égalité devient vraie.\n\n" +
    "Méthode : on remplace x par 5 dans l’équation.\n\n" +
    "Calcul : 2 × 5 + 1 = 11, et 11 ≠ 12.\n\n" +
    "Conclusion : 5 n’est pas solution de l’équation.",
  tags: ["equation", "verifier", "qcm"],
},

{
  kind: "template",
  id: "3e_equation_verifier_tpl_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_verifier",
  difficulty: 2,
  theme: "neutral",
  hint: "Remplace x par la valeur proposée.",
  tags: ["equation", "verifier", "template"],
  generate: () => {
    const x = randomInt(2, 12);
    const a = randomInt(2, 7);
    const b = randomInt(1, 10);
    const c = a * x + b;

    return {
      text: `${x} est-il solution de l’équation ${a}x + ${b} = ${c} ?`,
      format: "qcm",
      choices: ["oui", "non"],
      expected: ["oui"],
      comparator: "mcq_exact",
      explanation:
        `Définition : vérifier une solution consiste à remplacer l’inconnue par la valeur proposée.\n\n` +
        `Méthode : on remplace x par ${x} dans le membre de gauche.\n\n` +
        `Calcul : ${a} × ${x} + ${b} = ${a * x} + ${b} = ${c}.\n\n` +
        `Conclusion : ${x} est bien solution de l’équation.`,
    };
  },
},

{
  kind: "template",
  id: "3e_equation_verifier_tpl_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_verifier",
  difficulty: 2,
  theme: "neutral",
  hint: "Teste la valeur dans l’équation.",
  tags: ["equation", "verifier", "fausse_solution", "template"],
  generate: () => {
    const proposed = randomInt(2, 12);
    const realX = proposed + randomChoice([1, 2, 3]);
    const a = randomInt(2, 6);
    const b = randomInt(1, 9);
    const c = a * realX + b;
    const tested = a * proposed + b;

    return {
      text: `${proposed} est-il solution de l’équation ${a}x + ${b} = ${c} ?`,
      format: "qcm",
      choices: ["oui", "non"],
      expected: ["non"],
      comparator: "mcq_exact",
      explanation:
        `Définition : une valeur est solution si elle rend l’égalité vraie.\n\n` +
        `Méthode : on remplace x par ${proposed} et on compare le résultat avec ${c}.\n\n` +
        `Calcul : ${a} × ${proposed} + ${b} = ${tested}, et ${tested} ≠ ${c}.\n\n` +
        `Conclusion : ${proposed} n’est pas solution de l’équation.`,
    };
  },
},

{
  kind: "template",
  id: "3e_equation_verifier_tpl_3",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_verifier",
  difficulty: 3,
  theme: "neutral",
  hint: "Calcule séparément le membre de gauche et le membre de droite.",
  tags: ["equation", "verifier", "deux_membres", "template"],
  generate: () => {
    const x = randomInt(2, 10);
    const a = randomInt(2, 5);
    const b = randomInt(1, 8);
    const c = randomInt(1, 4);
    const left = a * x + b;
    const d = left - c * x;

    return {
      text: `${x} est-il solution de l’équation ${a}x + ${b} = ${c}x + ${d} ?`,
      format: "qcm",
      choices: ["oui", "non"],
      expected: ["oui"],
      comparator: "mcq_exact",
      explanation:
        `Définition : une valeur est solution si les deux membres de l’équation sont égaux.\n\n` +
        `Méthode : on calcule le membre de gauche et le membre de droite avec x = ${x}.\n\n` +
        `Calcul : gauche = ${a} × ${x} + ${b} = ${left}. Droite = ${c} × ${x} + ${d} = ${left}.\n\n` +
        `Conclusion : les deux membres sont égaux, donc ${x} est solution.`,
    };
  },
},

{
  kind: "template",
  id: "3e_equation_verifier_tpl_4",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_verifier",
  difficulty: 3,
  theme: "neutral",
  hint: "Attention : une seule erreur de calcul peut rendre l’égalité fausse.",
  tags: ["equation", "verifier", "deux_membres", "template"],
  generate: () => {
    const proposed = randomInt(2, 10);
    const realX = proposed + randomChoice([1, 2]);
    const a = randomInt(2, 5);
    const b = randomInt(1, 8);
    const c = randomInt(1, 4);
    const d = (a - c) * realX + b;

    const left = a * proposed + b;
    const right = c * proposed + d;

    return {
      text: `${proposed} est-il solution de l’équation ${a}x + ${b} = ${c}x + ${d} ?`,
      format: "qcm",
      choices: ["oui", "non"],
      expected: ["non"],
      comparator: "mcq_exact",
      explanation:
        `Définition : une valeur est solution si elle rend l’égalité vraie.\n\n` +
        `Méthode : on remplace x par ${proposed} dans les deux membres.\n\n` +
        `Calcul : gauche = ${a} × ${proposed} + ${b} = ${left}. Droite = ${c} × ${proposed} + ${d} = ${right}. Les deux résultats sont différents.\n\n` +
        `Conclusion : ${proposed} n’est pas solution.`,
    };
  },
},

{
  kind: "fixed",
  id: "3e_equation_verifier_open_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_verifier",
  difficulty: 3,
  theme: "neutral",
  text: "Explique comment vérifier si un nombre est solution d’une équation.",
  format: "open",
  expected: ["remplace", "égalité", "vraie"],
  comparator: "contains_keyword",
  hint: "On remplace l’inconnue par le nombre proposé.",
  explanation:
    "Définition : vérifier une solution consiste à savoir si une valeur rend l’équation vraie.\n\n" +
    "Méthode : on remplace l’inconnue par la valeur proposée dans l’équation.\n\n" +
    "Calcul : si les deux membres donnent le même résultat, l’égalité est vraie.\n\n" +
    "Conclusion : le nombre est solution seulement s’il rend l’égalité vraie.",
  tags: ["equation", "verifier", "open", "methode"],
},

{
  kind: "fixed",
  id: "3e_equation_verifier_erreur_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_verifier",
  difficulty: 4,
  theme: "neutral",
  text: "Un élève dit : « x = 3 est solution de 5x - 1 = 20 car 5 × 3 = 15. » A-t-il raison ?",
  format: "qcm",
  choices: ["oui", "non"],
  expected: ["non"],
  comparator: "mcq_exact",
  hint: "Il a oublié le -1.",
  explanation:
    "Définition : vérifier une solution impose de remplacer x dans toute l’expression.\n\n" +
    "Méthode : on ne calcule pas seulement 5 × 3 ; il faut aussi tenir compte du -1.\n\n" +
    "Calcul : 5 × 3 - 1 = 15 - 1 = 14, et 14 ≠ 20.\n\n" +
    "Conclusion : l’élève a tort ; x = 3 n’est pas solution.",
  tags: ["equation", "verifier", "erreur"],
},
{
  kind: "fixed",
  id: "3e_equation_probleme_fixed_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_probleme",
  difficulty: 3,
  theme: "neutral",
  text: "Un nombre augmenté de 7 vaut 20. Quel est ce nombre ?",
  format: "short",
  expected: ["13"],
  comparator: "number_equal",
  hint: "Appelle x le nombre cherché.",
  explanation:
    "Définition : résoudre un problème avec une équation consiste à traduire l’énoncé avec une inconnue.\n\n" +
    "Méthode : on appelle x le nombre cherché, puis on écrit l’équation.\n\n" +
    "Calcul : x + 7 = 20, donc x = 20 - 7 = 13.\n\n" +
    "Conclusion : le nombre cherché est 13.",
  tags: ["equation", "probleme", "traduire"],
},

{
  kind: "fixed",
  id: "3e_equation_probleme_fixed_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_probleme",
  difficulty: 3,
  theme: "neutral",
  text: "Le triple d’un nombre vaut 27. Quel est ce nombre ?",
  format: "short",
  expected: ["9"],
  comparator: "number_equal",
  hint: "Le triple d’un nombre x s’écrit 3x.",
  explanation:
    "Définition : une équation permet de traduire une phrase mathématique avec une inconnue.\n\n" +
    "Méthode : on appelle x le nombre cherché. Le triple de x s’écrit 3x.\n\n" +
    "Calcul : 3x = 27, donc x = 27 ÷ 3 = 9.\n\n" +
    "Conclusion : le nombre cherché est 9.",
  tags: ["equation", "probleme", "triple"],
},

{
  kind: "template",
  id: "3e_equation_probleme_tpl_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_probleme",
  difficulty: 3,
  theme: "neutral",
  hint: "Traduis la phrase par une équation.",
  tags: ["equation", "probleme", "template"],
  generate: () => {
    const x = randomInt(5, 30);
    const b = randomInt(2, 15);
    const total = x + b;

    return {
      text: `Un nombre augmenté de ${b} vaut ${total}. Quel est ce nombre ?`,
      format: "short",
      expected: [String(x)],
      comparator: "number_equal",
      explanation:
        `Définition : résoudre un problème avec une équation consiste à transformer l’énoncé en égalité.\n\n` +
        `Méthode : on appelle x le nombre cherché. « augmenté de ${b} » se traduit par x + ${b}.\n\n` +
        `Calcul : x + ${b} = ${total}, donc x = ${total} - ${b} = ${x}.\n\n` +
        `Conclusion : le nombre cherché est ${x}.`,
    };
  },
},

{
  kind: "template",
  id: "3e_equation_probleme_tpl_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_probleme",
  difficulty: 3,
  theme: "neutral",
  hint: "Le produit d’un nombre par a s’écrit ax.",
  tags: ["equation", "probleme", "multiplication", "template"],
  generate: () => {
    const x = randomInt(2, 20);
    const a = randomInt(2, 9);
    const total = a * x;

    return {
      text: `Le produit d’un nombre par ${a} vaut ${total}. Quel est ce nombre ?`,
      format: "short",
      expected: [String(x)],
      comparator: "number_equal",
      explanation:
        `Définition : une équation permet de trouver une valeur inconnue dans un problème.\n\n` +
        `Méthode : on appelle x le nombre cherché. Le produit par ${a} se traduit par ${a}x.\n\n` +
        `Calcul : ${a}x = ${total}, donc x = ${total} ÷ ${a} = ${x}.\n\n` +
        `Conclusion : le nombre cherché est ${x}.`,
    };
  },
},

{
  kind: "template",
  id: "3e_equation_probleme_tpl_3",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_probleme",
  difficulty: 4,
  theme: "neutral",
  hint: "Traduis « le double d’un nombre augmenté de... » en 2x + ...",
  tags: ["equation", "probleme", "double", "template"],
  generate: () => {
    const x = randomInt(3, 20);
    const b = randomInt(2, 12);
    const total = 2 * x + b;

    return {
      text: `Le double d’un nombre augmenté de ${b} vaut ${total}. Quel est ce nombre ?`,
      format: "short",
      expected: [String(x)],
      comparator: "number_equal",
      explanation:
        `Définition : résoudre un problème avec une équation consiste à représenter le nombre inconnu par une lettre.\n\n` +
        `Méthode : on appelle x le nombre cherché. Le double du nombre s’écrit 2x, puis on ajoute ${b}.\n\n` +
        `Calcul : 2x + ${b} = ${total}. Donc 2x = ${total - b}, puis x = ${total - b} ÷ 2 = ${x}.\n\n` +
        `Conclusion : le nombre cherché est ${x}.`,
    };
  },
},

{
  kind: "template",
  id: "3e_equation_probleme_tpl_4",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_probleme",
  difficulty: 4,
  theme: "reunion",
  hint: "Choisis x pour le nombre d’objets achetés.",
  tags: ["equation", "probleme", "reunion", "prix", "template"],
  generate: () => {
    const x = randomInt(4, 20);
    const prix = randomChoice([2, 3, 4, 5]);
    const fixe = randomChoice([1, 2, 3]);
    const total = prix * x + fixe;

    return {
      text: `À La Réunion, un élève achète des samoussas à ${prix} € chacun et paie aussi ${fixe} € pour une boisson. Au total, il paie ${total} €. Combien de samoussas a-t-il achetés ?`,
      format: "short",
      expected: [String(x)],
      comparator: "number_equal",
      explanation:
        `Définition : une équation permet de modéliser une situation avec une inconnue.\n\n` +
        `Méthode : on appelle x le nombre de samoussas. Le prix total est ${prix}x + ${fixe}.\n\n` +
        `Calcul : ${prix}x + ${fixe} = ${total}. Donc ${prix}x = ${total - fixe}, puis x = ${total - fixe} ÷ ${prix} = ${x}.\n\n` +
        `Conclusion : l’élève a acheté ${x} samoussas.`,
    };
  },
},

{
  kind: "template",
  id: "3e_equation_probleme_tpl_5",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_probleme",
  difficulty: 4,
  theme: "sport",
  hint: "Écris une équation avec le nombre de tours.",
  tags: ["equation", "probleme", "sport", "template"],
  generate: () => {
    const tours = randomInt(3, 12);
    const distanceTour = randomChoice([200, 250, 300, 400]);
    const depart = randomChoice([50, 100, 150]);
    const total = tours * distanceTour + depart;

    return {
      text: `Un sportif court d’abord ${depart} m, puis fait plusieurs tours de ${distanceTour} m. Il parcourt au total ${total} m. Combien de tours a-t-il faits ?`,
      format: "short",
      expected: [String(tours)],
      comparator: "number_equal",
      explanation:
        `Définition : une équation permet de retrouver une quantité inconnue dans une situation concrète.\n\n` +
        `Méthode : on appelle x le nombre de tours. La distance totale est ${depart} + ${distanceTour}x.\n\n` +
        `Calcul : ${depart} + ${distanceTour}x = ${total}. Donc ${distanceTour}x = ${total - depart}, puis x = ${total - depart} ÷ ${distanceTour} = ${tours}.\n\n` +
        `Conclusion : le sportif a fait ${tours} tours.`,
    };
  },
},

{
  kind: "fixed",
  id: "3e_equation_probleme_open_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_probleme",
  difficulty: 4,
  theme: "neutral",
  text: "Explique les étapes pour résoudre un problème avec une équation.",
  format: "open",
  expected: ["inconnue", "équation", "résoudre", "vérifier"],
  comparator: "contains_keyword",
  hint: "Pense aux étapes : choisir x, traduire, résoudre, conclure.",
  explanation:
    "Définition : résoudre un problème avec une équation consiste à utiliser une inconnue pour traduire une situation.\n\n" +
    "Méthode : on choisit une inconnue, on écrit une équation, on la résout, puis on répond à la question.\n\n" +
    "Calcul : par exemple, si 3x + 2 = 17, alors 3x = 15, donc x = 5.\n\n" +
    "Conclusion : il faut toujours terminer par une phrase qui répond au problème.",
  tags: ["equation", "probleme", "open", "methode"],
},

{
  kind: "fixed",
  id: "3e_equation_probleme_erreur_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "equation_resolution",
  microId: "equation_probleme",
  difficulty: 4,
  theme: "neutral",
  text: "Un élève lit : « Le triple d’un nombre augmenté de 4 vaut 25 » et écrit x + 3 + 4 = 25. A-t-il bien traduit l’énoncé ?",
  format: "qcm",
  choices: ["oui", "non"],
  expected: ["non"],
  comparator: "mcq_exact",
  hint: "Le triple d’un nombre s’écrit 3x, pas x + 3.",
  explanation:
    "Définition : traduire un problème en équation demande de respecter le sens des mots.\n\n" +
    "Méthode : « le triple d’un nombre » signifie 3x.\n\n" +
    "Calcul : la bonne équation est 3x + 4 = 25, et non x + 3 + 4 = 25.\n\n" +
    "Conclusion : l’élève a mal traduit l’énoncé.",
  tags: ["equation", "probleme", "erreur", "traduction"],
},

];