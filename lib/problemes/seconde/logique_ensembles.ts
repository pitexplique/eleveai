// Énigmes à projeter — seconde, notion logique_ensembles (sport et musique,
// le sol mouillé, le contre-exemple, la négation du devoir, piège du « ou »
// des horaires, défi de l'île des sincères et des menteurs). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, ell, p } from "../dessins-ecole";

const venn = svg(
  "Diagramme : 30 élèves, 18 font du sport, 12 de la musique, 5 les deux",
  r(20, 40, 440, 280, C.craie, 0, 3, 12) + ell(185, 205, 120, 90, C.bleu, 0.12, 3) + ell(295, 205, 120, 90, C.jaune, 0.12, 3) +
    t(130, 95, "sport 18", C.bleu, 22) + t(350, 95, "musique 12", C.jaune, 22) +
    t(130, 215, "13", C.craie, 28) + t(240, 215, "5", C.craie, 28) + t(350, 215, "7", C.craie, 28) + t(435, 310, "?", C.rose, 30) +
    t(60, 30, "30 élèves", C.pale, 20) + t(240, 375, `ni l'un ni l'autre${NB}?`, C.rose, 28)
);

// Un nuage, des gouttes, et un arroseur à côté.
const sol = svg(
  "Un nuage de pluie et un arroseur : les deux mouillent le sol",
  p("M70 110 q0 -40 40 -40 q20 -30 55 -10 q35 -10 45 25 q30 5 25 30 Z", C.bleu, 3, 0.15) +
    [80, 115, 150, 185].map((x) => p(`M${x} 140 l-6 18`, C.bleu, 3)).join("") +
    p("M330 200 v-60 M330 140 q-30 -40 -70 -30 M330 140 q30 -40 70 -30 M330 140 q0 -50 0 -60", C.bleu, 3) + r(310, 200, 40, 20, C.craie, 0.2, 3, 4) +
    p("M30 240 h420", C.craie, 4) + p("M60 250 q40 14 80 0 M250 250 q50 14 110 0", C.bleu, 3) +
    t(240, 310, "le sol est mouillé", C.craie, 24) + t(240, 365, `donc il pleut${NB}?`, C.rose, 28)
);

const premiers = svg(
  "Les nombres premiers 2, 3, 5, 7, 11, 13 et la phrase tout nombre premier est impair",
  [2, 3, 5, 7, 11, 13].map((v, k) => r(40 + 70 * k, 110, 56, 56, C.bleu, 0.12, 2, 8) + t(68 + 70 * k, 148, v, C.craie, 26)).join("") +
    t(240, 70, "nombres premiers", C.pale, 22) + t(240, 240, `«${NB}tout nombre premier est impair${NB}»`, C.craie, 22) + t(240, 320, `un contre-exemple${NB}?`, C.rose, 28)
);

const devoir = svg(
  "La phrase : tous les élèves ont rendu le devoir, et la question de sa négation",
  r(40, 90, 400, 90, C.bleu, 0.1, 3, 12) + t(240, 145, `«${NB}Tous les élèves ont rendu le devoir.${NB}»`, C.craie, 20) +
    t(240, 240, "c'est faux.", C.craie, 24) + t(240, 320, `que peut-on dire${NB}?`, C.rose, 28)
);

// Deux bandes horaires de 8 h à 18 h (1 h = 36 px, 8 h en x = 60).
const H = (h: number) => 60 + 36 * (h - 8);
const horaires = svg(
  "Paul disponible de 9 h à 13 h, Inès de 11 h à 17 h, sur un axe de 8 h à 18 h",
  r(H(9), 90, H(13) - H(9), 40, C.bleu, 0.25, 3, 6) + t(H(9) - 8, 118, "Paul", C.bleu, 20, "end") +
    r(H(11), 160, H(17) - H(11), 40, C.jaune, 0.25, 3, 6) + t(H(11) - 8, 188, "Inès", C.jaune, 20, "end") +
    p(`M${H(8)} 240 H${H(18)}`, C.craie, 3) + [8, 10, 12, 14, 16, 18].map((h) => p(`M${H(h)} 232 v16`, C.craie, 2) + t(H(h), 272, `${h} h`, C.pale, 17)).join("") +
    t(240, 345, `au moins l'un des deux${NB}?`, C.rose, 26)
);

const ile = svg(
  "Deux habitants de l'île, Alix et Bo ; Alix dit : nous sommes deux menteurs",
  `<circle cx="140" cy="200" r="36" fill="${C.bleu}" fill-opacity="0.2" stroke="${C.bleu}" stroke-width="3"/>` + p("M95 300 q45 -70 90 0", C.bleu, 3, 0.2) + t(140, 335, "Alix", C.bleu, 22) +
    `<circle cx="340" cy="200" r="36" fill="${C.jaune}" fill-opacity="0.2" stroke="${C.jaune}" stroke-width="3"/>` + p("M295 300 q45 -70 90 0", C.jaune, 3, 0.2) + t(340, 335, "Bo", C.jaune, 22) +
    r(40, 40, 260, 80, C.craie, 0.05, 2, 14) + t(170, 88, `«${NB}On est 2 menteurs.${NB}»`, C.craie, 20) + t(240, 395, `Bo : sincère ou menteur${NB}?`, C.rose, 24)
);

const problemes: ProblemesNotion = {
  classe: "seconde",
  notionId: "logique_ensembles",
  titre: "Énigmes de logique et d'ensembles",
  description: "Sport et musique, le sol mouillé, le contre-exemple, la négation, le piège du « ou » des horaires, le défi de l'île des menteurs : intersection, réunion, implication et réciproque, négation, contre-exemple.",
  problemes: [
    {
      tag: "Énigme 1 · Sport et musique",
      titre: "Ne pas compter deux fois",
      question: `Dans une classe de <b>30 élèves</b>, 18 font du sport, 12 font de la musique, et <b>5</b> font les deux.<br><br><b>Combien</b> ne font ni l'un ni l'autre ?`,
      reponse: `Sport ou musique : 18 + 12 − 5 = 25 (les 5 étaient comptés deux fois).<br>Ni l'un ni l'autre : 30 − 25 = <span class="big">5</span> élèves.`,
      consigne: "Combien d'élèves ne font ni sport ni musique ?",
      verification: { type: "courte", attendus: ["5"], unite: "élèves" },
      dessin: venn,
    },
    {
      tag: "Énigme 2 · Le sol mouillé",
      titre: "La réciproque",
      question: `On sait : « S'il pleut, alors le sol est mouillé. »<br>Ce matin, le sol est mouillé.<br><br><b>Peut-on conclure</b> qu'il a plu ?`,
      reponse: `La phrase dit pleut ⇒ mouillé, pas mouillé ⇒ pleut. C'est la <b>réciproque</b>, et elle est fausse : un arroseur mouille aussi le sol.<br><span class="big">Non, pas forcément.</span>`,
      consigne: "Le sol est mouillé : peut-on conclure qu'il a plu ?",
      verification: { type: "qcm", choix: ["Oui, forcément", "Non, pas forcément", "Non : il n'a pas plu"], bonne: 1 },
      dessin: sol,
    },
    {
      tag: "Énigme 3 · Le contre-exemple",
      titre: "Un seul suffit",
      question: `Malo affirme : « Tout nombre premier est impair. »<br><br><b>Quel nombre</b> prouve qu'il a tort ?`,
      reponse: `2 est premier (ses seuls diviseurs sont 1 et 2) et il est pair.<br><span class="big">2</span> est un contre-exemple : un seul suffit pour montrer qu'une phrase « pour tout » est fausse.`,
      consigne: "Quel nombre premier est un contre-exemple à « tout nombre premier est impair » ?",
      verification: { type: "courte", attendus: ["2"] },
      dessin: premiers,
    },
    {
      tag: "Énigme 4 · Le devoir",
      titre: "La négation de « tous »",
      question: `La prof dit : « Ce n'est pas vrai que <b>tous</b> les élèves ont rendu le devoir. »<br><br><b>Que peut-on en déduire</b> ?`,
      reponse: `Le contraire de « tous l'ont rendu » n'est pas « aucun ne l'a rendu ».<br>C'est : <span class="big">au moins un élève ne l'a pas rendu</span>.`,
      consigne: "« Tous les élèves ont rendu le devoir » est faux. Que peut-on en déduire ?",
      verification: { type: "qcm", choix: ["Au moins un élève ne l'a pas rendu", "Aucun élève ne l'a rendu", "La moitié ne l'a pas rendu"], bonne: 0 },
      dessin: devoir,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le « ou »",
      sorte: "piege",
      question: `Paul est disponible de <b>9 h à 13 h</b>, Inès de <b>11 h à 17 h</b>.<br><br><b>Quand</b> au moins l'un des deux est-il disponible ?`,
      reponse: `« L'un <b>ou</b> l'autre » : c'est la réunion, pas l'intersection (11 h – 13 h, quand les deux sont là).<br>[9 ; 13] ∪ [11 ; 17] = [9 ; 17] : <span class="big">de 9 h à 17 h</span>.`,
      consigne: "Paul : 9 h – 13 h ; Inès : 11 h – 17 h. Quand au moins l'un des deux est-il disponible ?",
      verification: { type: "qcm", choix: ["De 11 h à 13 h", "De 9 h à 13 h", "De 9 h à 17 h"], bonne: 2 },
      dessin: horaires,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "L'île des menteurs",
      sorte: "defi",
      question: `Sur une île, les sincères disent toujours vrai, les menteurs toujours faux.<br>Alix dit : « Bo et moi, nous sommes <b>deux menteurs</b>. »<br><br><b>Bo est-il sincère ou menteur</b> ?`,
      reponse: `Si Alix était sincère, sa phrase serait vraie… et Alix serait menteuse : impossible. Donc Alix ment.<br>Sa phrase est fausse : ils ne sont pas tous les deux menteurs. Bo est donc <span class="big">sincère</span>.`,
      consigne: "Alix dit « Bo et moi sommes deux menteurs ». Bo est-il sincère ou menteur ?",
      verification: { type: "courte", attendus: ["sincère", "sincere"] },
      dessin: ile,
    },
  ],
};

export default problemes;
