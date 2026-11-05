// LE DÉCLENCHEMENT PAR UN ÉVÉNEMENT EN 5e (05/11/2026).
//
// Trou du programme (BO 2020, p. 137 : « déclenchement d'une action par un événement » ;
// repères de progressivité : 5e). Le drapeau vert n'était cité qu'une fois, et aucune
// micro ne traitait des touches ni du clic.
//
// ⛔ Règles du collège : ★1-★2 phrase courte, sans prénom ni contexte.
// ⚠️ Pour le correcteur : le script se relit DANS LA FIGURE (blocs « event » et leurs
// `children`). Une suite d'actions s'écrit « Actions : drapeau, espace, espace. » ou
// « On clique sur le drapeau, puis on appuie 3 fois sur espace. »

import type { TutorBankItemV4, DifficultyLevel } from "@/lib/tutor-v4/types";

const entre = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;
const un = <T,>(l: readonly T[]): T => l[Math.floor(Math.random() * l.length)];
const melange = <T,>(l: T[]): T[] => l.map((x) => [Math.random(), x] as const).sort((a, b) => a[0] - b[0]).map((x) => x[1]);

const expl = (def: string, meth: string, calc: string, concl: string) =>
  `Définition : ${def}\n\nMéthode : ${meth}\n\nCalcul : ${calc}\n\nConclusion : ${concl}`;
function qcm(juste: string, faux: string[]) {
  const d = melange([...new Set(faux)].filter((x) => x !== juste)).slice(0, 3);
  return melange([juste, ...d]);
}
const court = (n: number) => ({ format: "short" as const, expected: [String(n)], comparator: "number_equal" as const });
const choix = (juste: string, faux: string[]) => ({ format: "qcm" as const, choices: qcm(juste, faux), expected: [juste], comparator: "mcq_exact" as const });

const DEF = "un événement (drapeau vert, touche pressée, clic sur le lutin) déclenche les blocs placés sous son chapeau.";

/* ───────────────────────── événements et blocs ───────────────────────── */

const TOUCHES = ["espace", "flèche droite", "flèche gauche", "flèche haut", "flèche bas", "a", "b"] as const;
type Ev = string; // "drapeau", "clic" ou le nom de la touche
const EVENEMENTS: Ev[] = ["drapeau", "clic", ...TOUCHES];

const nomEv = (e: Ev) => (e === "drapeau" ? "le drapeau vert" : e === "clic" ? "un clic sur le lutin" : `la touche ${e}`);
const blocEv = (e: Ev) => (e === "drapeau" ? "quand drapeau vert cliqué" : e === "clic" ? "quand ce lutin est cliqué" : `quand la touche ${e} est pressée`);
const geste = (e: Ev) => (e === "drapeau" ? "On clique sur le drapeau vert" : e === "clic" ? "On clique sur le lutin" : `On appuie sur la touche ${e}`);

const script = (e: Ev, actions: any[]) => (e === "drapeau" ? { type: "event", children: actions } : { type: "event", text: blocEv(e), children: actions });
const figure = (...scripts: any[]) => ({
  kind: "scratch" as const,
  title: scripts.length > 1 ? "Les scripts du lutin" : "Le script du lutin",
  description: "",
  blocks: scripts,
});

/* Les actions du lutin : un bloc, et la phrase qui le dit. */
const MOTS = ["Bonjour", "Salut", "Bravo", "Merci", "Allons-y", "Attention", "Gagné", "Encore"];
type Action = { bloc: any; phrase: string };
function action(): Action {
  const g = un(["move", "move", "turn", "say", "say"]);
  if (g === "move") {
    const v = 10 * entre(1, 9);
    return { bloc: { type: "move", value: v }, phrase: `Il avance de ${v} pas.` };
  }
  if (g === "turn") {
    const v = 15 * entre(1, 6);
    return { bloc: { type: "turn", value: v }, phrase: `Il tourne de ${v}°.` };
  }
  const t = un(MOTS);
  return { bloc: { type: "say", text: `« ${t} »` }, phrase: `Il dit « ${t} ».` };
}
function deuxActions(): [Action, Action] {
  for (;;) {
    const a = action();
    const b = action();
    if (a.phrase !== b.phrase) return [a, b];
  }
}
const RIEN = "Il ne fait rien.";
const AUTRES = (): string[] => [`Il avance de ${10 * entre(1, 9)} pas.`, `Il tourne de ${15 * entre(1, 6)}°.`, `Il dit « ${un(MOTS)} ».`];

const deuxEv = (avecDrapeau = true): [Ev, Ev] => {
  const l = melange(avecDrapeau ? [...EVENEMENTS] : [...TOUCHES]);
  return [l[0], l[1]];
};

/* ───────────────────────── contextes (★3 et plus) ───────────────────────── */

const PRENOMS = ["Inès", "Noah", "Maëlle", "Yanis", "Chloé", "Sacha", "Lina", "Tom", "Awa", "Mathis", "Jade", "Ilyes"];
/** Un compteur qui ne fait qu'augmenter. */
const COMPTEURS = [
  { truc: "un jeu de pêche", v: "poissons" },
  { truc: "un jeu de fléchettes", v: "points" },
  { truc: "un podomètre", v: "compteur" },
  { truc: "un jeu de cueillette", v: "fruits" },
  { truc: "un quiz de géographie", v: "bonnes" },
  { truc: "une tirelire virtuelle", v: "euros" },
  { truc: "un compteur à l’entrée d’un musée", v: "visiteurs" },
  { truc: "un compteur de voitures", v: "voitures" },
  { truc: "un tableau de score de handball", v: "buts" },
  { truc: "un simulateur de ruche", v: "abeilles" },
  { truc: "un carnet de lecture", v: "pages" },
  { truc: "un jeu de course", v: "tours" },
];
/** Quelque chose qui va dans les deux sens. */
const PILOTES = [
  { truc: "un drone", v: "altitude", k: ["flèche haut", "flèche bas"] },
  { truc: "un ascenseur", v: "étage", k: ["flèche haut", "flèche bas"] },
  { truc: "un robot aspirateur", v: "x", k: ["flèche droite", "flèche gauche"] },
  { truc: "une grue de chantier", v: "hauteur", k: ["flèche haut", "flèche bas"] },
  { truc: "un personnage de jeu", v: "x", k: ["flèche droite", "flèche gauche"] },
  { truc: "un tapis de course", v: "vitesse", k: ["flèche haut", "flèche bas"] },
  { truc: "un sous-marin miniature", v: "profondeur", k: ["flèche bas", "flèche haut"] },
  { truc: "le volume d’une enceinte", v: "volume", k: ["flèche haut", "flèche bas"] },
];
/** Une touche, un son. */
const SONS = [
  { truc: "un petit piano", m: ["do", "ré", "mi"] },
  { truc: "une batterie", m: ["boum", "tchac", "ding"] },
  { truc: "un traducteur", m: ["bonjour", "hello", "hola"] },
  { truc: "une ferme sonore", m: ["meuh", "cocorico", "bêê"] },
  { truc: "un feu tricolore", m: ["vert", "orange", "rouge"] },
  { truc: "une boussole parlante", m: ["nord", "sud", "est"] },
];
/** Deux états. */
const ETATS = [
  { truc: "une lampe", v: "lampe", oui: "allumée", non: "éteinte" },
  { truc: "une porte de garage", v: "porte", oui: "ouverte", non: "fermée" },
  { truc: "une alarme", v: "alarme", oui: "active", non: "coupée" },
  { truc: "un volet roulant", v: "volet", oui: "ouvert", non: "fermé" },
  { truc: "un ventilateur", v: "ventilateur", oui: "allumé", non: "arrêté" },
  { truc: "une radio", v: "radio", oui: "allumée", non: "éteinte" },
];

const VARIABLES = ["score", "points", "compteur", "total", "n", "vies"];
const tpl = (n: number, difficulty: DifficultyLevel, hint: string, generate: () => any): TutorBankItemV4 =>
  ({
    kind: "template",
    id: `algo_evenement_tpl_${n}`,
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_evenement",
    difficulty,
    theme: "neutral",
    hint,
    tags: ["algorithmique", "scratch", "evenement", "template"],
    generate,
  }) as TutorBankItemV4;

/* ───────────────────────── les gabarits ───────────────────────── */

export const algoEvenementBank: TutorBankItemV4[] = [
  // ★1 : quel événement ?
  tpl(1, 1, "Regarde le tout premier bloc, le chapeau jaune.", () => {
    const e = un(EVENEMENTS);
    const { bloc } = action();
    const juste = nomEv(e);
    return {
      text: un(["Quel événement déclenche ce script ?", "Qu’est-ce qui lance ce script ?", "Qu’est-ce qui fait démarrer ce script ?", "Quel événement lance ce script ?", "Ce script démarre grâce à quoi ?", "Lis le premier bloc. Qu’est-ce qui lance le script ?"]),
      ...choix(juste, melange(EVENEMENTS).map(nomEv)),
      canvas: figure(script(e, [bloc])),
      explanation: expl(DEF, "on lit le premier bloc du script.", `le bloc est « ${blocEv(e)} ».`, `c’est ${juste}.`),
    };
  }),

  // ★1 : le script démarre-t-il ?
  tpl(2, 1, "Compare ce qu’on fait et ce qu’écrit le premier bloc.", () => {
    const e = un(EVENEMENTS);
    const oui = Math.random() < 0.5;
    const g = oui ? e : un(EVENEMENTS.filter((x) => x !== e));
    const { bloc } = action();
    return {
      text: `${geste(g)}. ${un(["Ce script démarre-t-il ?", "Le script se lance-t-il ?", "Ce script se déclenche-t-il ?", "Le lutin réagit-il ?", "Le script s’exécute-t-il ?"])}`,
      format: "qcm",
      choices: ["oui", "non"],
      expected: [oui ? "oui" : "non"],
      comparator: "mcq_exact",
      canvas: figure(script(e, [bloc])),
      explanation: expl(DEF, "on compare le geste au premier bloc.", `le premier bloc est « ${blocEv(e)} ».`, oui ? "c’est le bon geste : le script démarre." : "ce n’est pas ce geste : le script ne démarre pas."),
    };
  }),

  // ★1 : quel bloc choisir ?
  tpl(3, 1, "Le bloc nomme ce qui le déclenche.", () => {
    const e = un(EVENEMENTS);
    const juste = `« ${blocEv(e)} »`;
    return {
      text: un([
        `Quel bloc lance un script avec ${nomEv(e)} ?`,
        `Pour démarrer avec ${nomEv(e)}, quel bloc utiliser ?`,
        `Quel bloc placer en haut pour réagir à ${nomEv(e)} ?`,
        `Quel chapeau choisir pour ${nomEv(e)} ?`,
        `Quel bloc réagit à ${nomEv(e)} ?`,
      ]),
      ...choix(juste, melange(EVENEMENTS).map((x) => `« ${blocEv(x)} »`)),
      explanation: expl(DEF, "on cherche le bloc qui nomme cet événement.", `l’événement est ${nomEv(e)}.`, `c’est le bloc ${juste}.`),
    };
  }),

  // ★1 : que fait le lutin ?
  tpl(4, 1, "D’abord : ce geste lance-t-il le script ? Ensuite, lis les blocs.", () => {
    const e = un(EVENEMENTS);
    const oui = Math.random() < 0.7;
    const g = oui ? e : un(EVENEMENTS.filter((x) => x !== e));
    const A = action();
    const juste = oui ? A.phrase : RIEN;
    return {
      text: `${geste(g)}. ${un(["Que fait le lutin ?", "Que se passe-t-il ?", "Comment réagit le lutin ?", "Quelle est la réaction du lutin ?"])}`,
      ...choix(juste, [RIEN, A.phrase, ...AUTRES()]),
      canvas: figure(script(e, [A.bloc])),
      explanation: expl(DEF, "on vérifie que le geste lance le script, puis on lit ses blocs.", `le script commence par « ${blocEv(e)} ».`, juste),
    };
  }),

  // ★2 : deux scripts.
  tpl(5, 2, "Seul le script dont le chapeau correspond au geste s’exécute.", () => {
    const [e1, e2] = deuxEv();
    const [A, B] = deuxActions();
    const g = un([e1, e1, e2, e2, un(EVENEMENTS.filter((x) => x !== e1 && x !== e2))]);
    const juste = g === e1 ? A.phrase : g === e2 ? B.phrase : RIEN;
    return {
      text: `${geste(g)}. ${un(["Que fait le lutin ?", "Que se passe-t-il ?", "Quelle est la réaction du lutin ?", "Comment réagit le lutin ?"])}`,
      ...choix(juste, [A.phrase, B.phrase, RIEN, ...AUTRES()]),
      canvas: figure(script(e1, [A.bloc]), script(e2, [B.bloc])),
      explanation: expl(DEF, "on cherche le script dont le chapeau correspond au geste.", `les chapeaux sont « ${blocEv(e1)} » et « ${blocEv(e2)} ».`, juste),
    };
  }),

  // ★2 : plusieurs appuis.
  tpl(6, 2, "Le drapeau donne la valeur de départ ; chaque appui relance le script.", () => {
    const k = un(TOUCHES);
    const v = un(VARIABLES);
    const d = entre(0, 5);
    const a = entre(2, 10);
    const n = entre(2, 6);
    const r = d + n * a;
    return {
      text: `${un([`On clique sur le drapeau, puis on appuie ${n} fois sur ${k}.`, `On clique sur le drapeau. Puis on appuie ${n} fois sur ${k}.`])} ${un([`Que vaut ${v} ?`, `Combien vaut ${v} ?`, `Quelle est la valeur de ${v} ?`])}`,
      ...court(r),
      canvas: figure(script("drapeau", [{ type: "set_variable", variable: v, value: d }]), script(k, [{ type: "change_variable", variable: v, value: a }])),
      explanation: expl(DEF, "le drapeau met la valeur de départ, puis chaque appui ajoute le même nombre.", `${d} + ${n} × ${a} = ${r}.`, `${v} vaut ${r}.`),
    };
  }),

  // ★2 : deux touches, une suite courte.
  tpl(7, 2, "Suis les actions une par une, en notant la variable.", () => {
    for (;;) {
      const [k1, k2] = deuxEv(false);
      const v = un(["x", "y", "position", "score", "n"]);
      const d = entre(0, 10);
      const a = entre(2, 9);
      const b = entre(2, 9);
      const suite = Array.from({ length: entre(2, 3) }, () => un([k1, k2]));
      const r = suite.reduce((s, k) => (k === k1 ? s + a : s - b), d);
      if (r < 0) continue;
      return {
        text: `Actions : drapeau, ${suite.join(", ")}. ${un([`Que vaut ${v} ?`, `Combien vaut ${v} ?`, `Quelle est la valeur de ${v} ?`])}`,
        ...court(r),
        canvas: figure(
          script("drapeau", [{ type: "set_variable", variable: v, value: d }]),
          script(k1, [{ type: "change_variable", variable: v, value: a }]),
          script(k2, [{ type: "change_variable", variable: v, value: -b }]),
        ),
        explanation: expl(DEF, "on part de la valeur du drapeau, puis on applique chaque touche.", `départ : ${d} ; ${suite.map((k) => (k === k1 ? `+ ${a}` : `− ${b}`)).join(" ")} = ${r}.`, `${v} vaut ${r}.`),
      };
    }
  }),

  // ★2 : retrouver l'événement.
  tpl(8, 2, "Cherche le script qui contient ce bloc, puis lis son chapeau.", () => {
    const [e1, e2] = deuxEv();
    const [A, B] = deuxActions();
    const cible = Math.random() < 0.5;
    const [ev, ac] = cible ? [e1, A] : [e2, B];
    const quoi = ac.phrase.replace(/^Il /, "").replace(/\.$/, "");
    const juste = nomEv(ev);
    return {
      text: un([`Qu’est-ce qui fait que le lutin ${quoi} ?`, `Le lutin ${quoi}. Quel événement a déclenché cela ?`, `Quel événement fait que le lutin ${quoi} ?`]),
      ...choix(juste, [nomEv(e1), nomEv(e2), ...melange(EVENEMENTS).map(nomEv)]),
      canvas: figure(script(e1, [A.bloc]), script(e2, [B.bloc])),
      explanation: expl(DEF, "on cherche le script qui contient ce bloc, puis on lit son chapeau.", `ce bloc est sous « ${blocEv(ev)} ».`, `c’est ${juste}.`),
    };
  }),

  // ★3 : un compteur, en situation.
  tpl(9, 3, "Départ donné par le drapeau, puis même ajout à chaque appui.", () => {
    const C = un(COMPTEURS);
    const P = un(PRENOMS);
    const k = un(TOUCHES);
    const d = entre(0, 8);
    const a = entre(2, 12);
    const n = entre(3, 9);
    const r = d + n * a;
    return {
      text: `${P} programme ${C.truc}. On clique sur le drapeau, puis on appuie ${n} fois sur ${k}. ${un([`Que vaut la variable ${C.v} ?`, `Combien vaut la variable ${C.v} à la fin ?`, `Quelle est la valeur de la variable ${C.v} ?`])}`,
      ...court(r),
      canvas: figure(script("drapeau", [{ type: "set_variable", variable: C.v, value: d }]), script(k, [{ type: "change_variable", variable: C.v, value: a }])),
      explanation: expl(DEF, "le drapeau met le départ, puis chaque appui ajoute le même nombre.", `${d} + ${n} × ${a} = ${r}.`, `${C.v} vaut ${r}.`),
    };
  }),

  // ★3 : deux sens, une suite plus longue.
  tpl(10, 3, "Suis les actions une par une. Une valeur négative enlève.", () => {
    for (;;) {
      const C = un(PILOTES);
      const [k1, k2] = C.k;
      const d = entre(2, 20);
      const a = entre(1, 9);
      const b = entre(1, 9);
      const suite = Array.from({ length: entre(4, 6) }, () => un([k1, k2]));
      const r = suite.reduce((s, k) => (k === k1 ? s + a : s - b), d);
      if (r < 0 || !suite.includes(k1) || !suite.includes(k2)) continue;
      return {
        text: `Ce programme pilote ${C.truc}. Actions : drapeau, ${suite.join(", ")}. ${un([`Que vaut la variable ${C.v} à la fin ?`, `Quelle est la valeur finale de la variable ${C.v} ?`, `Combien vaut la variable ${C.v} après ces actions ?`])}`,
        ...court(r),
        canvas: figure(
          script("drapeau", [{ type: "set_variable", variable: C.v, value: d }]),
          script(k1, [{ type: "change_variable", variable: C.v, value: a }]),
          script(k2, [{ type: "change_variable", variable: C.v, value: -b }]),
        ),
        explanation: expl(DEF, "on part de la valeur du drapeau, puis on applique chaque touche, dans l’ordre.", `départ : ${d} ; ${suite.map((k) => (k === k1 ? `+ ${a}` : `− ${b}`)).join(" ")} = ${r}.`, `${C.v} vaut ${r}.`),
      };
    }
  }),

  // ★3 : une touche, un son.
  tpl(11, 3, "Chaque touche lance son script : lis-les dans l’ordre des actions.", () => {
    const C = un(SONS);
    const P = un(PRENOMS);
    const touches = ["a", "b", "espace"];
    const suite = Array.from({ length: entre(3, 4) }, () => entre(0, 2));
    const dit = (s: number[]) => s.map((i) => C.m[i]).join(", ");
    const juste = dit(suite);
    const faux = [dit([...suite].reverse()), dit(suite.map((i) => (i + 1) % 3)), dit(suite.map((i) => (i + 2) % 3)), dit([suite[0], ...suite.slice(0, -1)]), dit([...suite.slice(1), suite[0]])];
    return {
      text: `${P} programme ${C.truc}. Actions : ${suite.map((i) => touches[i]).join(", ")}. ${un(["Que dit le lutin, dans l’ordre ?", "Qu’entend-on, dans l’ordre ?", "Quelle suite entend-on ?"])}`,
      ...choix(juste, faux),
      canvas: figure(...[0, 1, 2].map((i) => script(touches[i], [{ type: "say", text: `« ${C.m[i]} »` }]))),
      explanation: expl(DEF, "chaque touche lance son propre script : on les suit dans l’ordre.", suite.map((i) => `${touches[i]} donne « ${C.m[i]} »`).join(" ; ") + ".", `on entend : ${juste}.`),
    };
  }),

  // ★3 : deux états.
  tpl(12, 3, "Seule la dernière action compte, puisque chaque touche écrase la valeur.", () => {
    const C = un(ETATS);
    const [k1, k0] = deuxEv(false);
    const suite = Array.from({ length: entre(3, 5) }, () => un([k1, k0]));
    const dernier = suite[suite.length - 1];
    const juste = dernier === k1 ? C.oui : C.non;
    return {
      text: `Ce programme commande ${C.truc}. La variable ${C.v} vaut 1 : ${C.oui} ; 0 : ${C.non}. Actions : ${suite.join(", ")}. ${un(["Quel est l’état à la fin ?", "Quel état à la fin des actions ?", "Quel état obtient-on ?"])}`,
      format: "qcm",
      choices: melange([C.oui, C.non]),
      expected: [juste],
      comparator: "mcq_exact",
      canvas: figure(script(k1, [{ type: "set_variable", variable: C.v, value: 1 }]), script(k0, [{ type: "set_variable", variable: C.v, value: 0 }])),
      explanation: expl(DEF, "le bloc « mettre » remplace la valeur : seule la dernière action compte.", `la dernière action est ${dernier}, qui met ${C.v} à ${dernier === k1 ? 1 : 0}.`, `à la fin : ${juste}.`),
    };
  }),

  // ★4 : le drapeau remet à zéro au milieu de la partie.
  tpl(13, 4, "Quand on clique sur le drapeau, tout repart de sa valeur.", () => {
    for (;;) {
      const C = un(COMPTEURS);
      const [k1, k2] = deuxEv(false);
      const d = entre(0, 5);
      const a = entre(2, 9);
      const b = entre(1, 5);
      const avant = Array.from({ length: entre(1, 3) }, () => un([k1, k2]));
      const apres = Array.from({ length: entre(2, 4) }, () => un([k1, k2]));
      const r = apres.reduce((s, k) => (k === k1 ? s + a : s - b), d);
      if (r < 0) continue;
      return {
        text: `Voici ${C.truc}. Actions : drapeau, ${avant.join(", ")}, drapeau, ${apres.join(", ")}. ${un([`Que vaut la variable ${C.v} à la fin ?`, `Quelle est la valeur finale de la variable ${C.v} ?`])}`,
        ...court(r),
        canvas: figure(
          script("drapeau", [{ type: "set_variable", variable: C.v, value: d }]),
          script(k1, [{ type: "change_variable", variable: C.v, value: a }]),
          script(k2, [{ type: "change_variable", variable: C.v, value: -b }]),
        ),
        explanation: expl(DEF, "le deuxième drapeau remet la variable à sa valeur de départ : ce qui vient avant ne compte plus.", `après le drapeau : ${d} ; ${apres.map((k) => (k === k1 ? `+ ${a}` : `− ${b}`)).join(" ")} = ${r}.`, `${C.v} vaut ${r}.`),
      };
    }
  }),

  // ★4 : corriger le chapeau.
  tpl(14, 4, "Compare ce qu’on veut avec le premier bloc.", () => {
    const P = un(PRENOMS);
    const voulu = un(EVENEMENTS);
    const juste_ok = Math.random() < 0.3;
    const ecrit = juste_ok ? voulu : un(EVENEMENTS.filter((x) => x !== voulu));
    const A = action();
    const quoi = A.phrase.replace(/^Il /, "").replace(/\.$/, "");
    const RIEN_A_CHANGER = "Rien : le script est correct.";
    const rempl = (e: Ev) => `Remplacer le premier bloc par « ${blocEv(e)} ».`;
    const juste = juste_ok ? RIEN_A_CHANGER : rempl(voulu);
    const autre = un(EVENEMENTS.filter((x) => x !== voulu && x !== ecrit));
    return {
      text: `${P} veut que le lutin ${quoi} avec ${nomEv(voulu)}. Voici son script. ${un(["Que faut-il changer ?", "Quelle correction faut-il faire ?", "Que doit-on modifier ?"])}`,
      ...choix(juste, [RIEN_A_CHANGER, rempl(autre), rempl(voulu), "Ajouter un bloc « répéter » autour de l’action."]),
      canvas: figure(script(ecrit, [A.bloc])),
      explanation: expl(DEF, "le premier bloc doit nommer l’événement voulu.", `on veut ${nomEv(voulu)} ; le script commence par « ${blocEv(ecrit)} ».`, juste),
    };
  }),

  // ★4 : deux scripts sur la même touche.
  tpl(15, 4, "Tous les scripts qui ont ce chapeau s’exécutent à chaque appui.", () => {
    const C = un(COMPTEURS);
    const k = un(TOUCHES);
    const d = entre(0, 6);
    const a = entre(2, 9);
    const b = entre(2, 9);
    const n = entre(2, 6);
    const r = d + n * (a + b);
    return {
      text: `Dans ${C.truc}, deux scripts réagissent à la même touche. On clique sur le drapeau, puis on appuie ${n} fois sur ${k}. ${un([`Que vaut la variable ${C.v} ?`, `Quelle est la valeur de la variable ${C.v} ?`])}`,
      ...court(r),
      canvas: figure(
        script("drapeau", [{ type: "set_variable", variable: C.v, value: d }]),
        script(k, [{ type: "change_variable", variable: C.v, value: a }]),
        script(k, [{ type: "change_variable", variable: C.v, value: b }]),
      ),
      explanation: expl(DEF, "les deux scripts s’exécutent à chaque appui.", `à chaque appui : ${a} + ${b} = ${a + b} ; ${d} + ${n} × ${a + b} = ${r}.`, `${C.v} vaut ${r}.`),
    };
  }),

  // ★4 : le nombre d'appuis.
  tpl(16, 4, "Écart à combler ÷ ajout à chaque appui.", () => {
    const C = un(COMPTEURS);
    const k = un(TOUCHES);
    const d = entre(0, 8);
    const a = entre(2, 12);
    const n = entre(3, 12);
    const T = d + n * a;
    return {
      text: `Voici ${C.truc}. Après le drapeau, ${un([`combien d’appuis sur ${k} faut-il pour que la variable ${C.v} vaille ${T} ?`, `combien de fois faut-il appuyer sur ${k} pour que la variable ${C.v} vaille ${T} ?`])}`,
      ...court(n),
      canvas: figure(script("drapeau", [{ type: "set_variable", variable: C.v, value: d }]), script(k, [{ type: "change_variable", variable: C.v, value: a }])),
      explanation: expl(DEF, "on calcule l’écart à combler, puis on divise par l’ajout.", `${T} − ${d} = ${T - d} ; ${T - d} ÷ ${a} = ${n}.`, `il faut ${n} appuis.`),
    };
  }),
];
