// Énigmes à projeter — CP, notion duree (repérage dans le temps) : la graine
// qui pousse, le jour avant mercredi, les 7 jours de la semaine, ce qui dure
// le plus longtemps, le piège de « hier », le défi des dodos avant la
// piscine. 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";

const cadre = (x: number, lettre: string, e: string) => r(x - 65, 90, 130, 130, C.craie, 0, 3, 12) + t(x, 185, e, C.craie, 64) + t(x, 260, lettre, C.craie, 30);
const plante = svg(
  "Trois images dans le désordre : A une fleur, B une graine, C une petite pousse",
  cadre(90, "A", "🌻") + cadre(240, "B", "🌰") + cadre(390, "C", "🌱") +
    t(240, 360, `Quelle image en premier${NB}?`, C.rose, 30)
);

const JOURS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
const semaine = (y: number, marque: Record<number, string> = {}, cache: number[] = []) =>
  JOURS.map((j, i) => {
    const x = 40 + i * 67;
    const c = marque[i] ?? C.craie;
    return r(x - 31, y - 30, 62, 60, c, marque[i] ? 0.25 : 0, 3, 8) + t(x, y + 8, cache.includes(i) ? "?" : j.slice(0, 3), c, 20);
  }).join("");

const avant = svg(
  "La semaine ; le mercredi est colorié, le jour d'avant est caché",
  semaine(170, { 2: C.jaune, 1: C.rose }, [1]) + t(240, 340, `Le jour avant mercredi${NB}?`, C.rose, 30)
);

const sept = svg(
  "Les jours de la semaine, de lundi à dimanche",
  semaine(170) + t(240, 340, `Combien de jours${NB}?`, C.rose, 30)
);

const duree = svg(
  "Trois images : se brosser les dents, une nuit de sommeil, un éternuement",
  cadre(90, "", "🪥") + cadre(240, "", "🛌") + cadre(390, "", "🤧") +
    t(90, 260, "les dents", C.pale, 20) + t(240, 260, "la nuit", C.pale, 20) + t(390, 260, "atchoum", C.pale, 20) +
    t(240, 360, `Le plus long${NB}?`, C.rose, 30)
);

const piege = svg(
  "La semaine ; hier, c'était mercredi (colorié) ; aujourd'hui est caché",
  semaine(170, { 2: C.jaune }) + t(174, 240, "hier", C.jaune, 22) +
    t(240, 340, `Aujourd'hui${NB}?`, C.rose, 30)
);

const defi = svg(
  "La semaine ; aujourd'hui mercredi (en jaune) ; la piscine samedi (en bleu)",
  semaine(170, { 2: C.jaune, 5: C.bleu }) + t(174, 240, "aujourd'hui", C.jaune, 18) + t(375, 240, "🏊", C.craie, 34) +
    t(240, 340, `Combien de dodos${NB}?`, C.rose, 30)
);

const problemes: ProblemesNotion = {
  classe: "cp",
  notionId: "duree",
  titre: "Énigmes sur le temps",
  description: "Remettre dans l'ordre la graine qui pousse, le jour avant mercredi, les 7 jours de la semaine, ce qui dure le plus longtemps, le piège de « hier », le défi des dodos avant la piscine.",
  problemes: [
    {
      tag: "Énigme 1 · Le jardin",
      titre: "La graine qui pousse",
      question: `Les images sont mélangées.<br><br>Laquelle vient en premier ?`,
      reponse: `D'abord la graine,<br>puis la pousse, puis la fleur.<br><span class="big">B, la graine</span>.`,
      consigne: "Quelle image vient en premier ?",
      verification: { type: "qcm", choix: ["A, la fleur", "B, la graine", "C, la pousse"], bonne: 1 },
      dessin: plante,
    },
    {
      tag: "Énigme 2 · La semaine",
      titre: "Avant mercredi",
      question: `Quel jour vient juste avant mercredi ?`,
      reponse: `Lundi, mardi, mercredi.<br><span class="big">Mardi</span>.`,
      consigne: "Quel jour vient juste avant mercredi ?",
      verification: { type: "qcm", choix: ["Jeudi", "Lundi", "Mardi"], bonne: 2 },
      dessin: avant,
    },
    {
      tag: "Énigme 3 · Le calendrier",
      titre: "Les jours de la semaine",
      question: `Combien de jours dans une semaine ?`,
      reponse: `De lundi à dimanche.<br><span class="big">7 jours</span>.`,
      consigne: "Combien de jours dans une semaine ?",
      verification: { type: "courte", attendus: ["7"] },
      dessin: sept,
    },
    {
      tag: "Énigme 4 · Le plus long",
      titre: "Qu'est-ce qui dure longtemps ?",
      question: `Qu'est-ce qui dure le plus longtemps ?`,
      reponse: `Une nuit, c'est très long.<br><span class="big">La nuit de sommeil</span>.`,
      consigne: "Qu'est-ce qui dure le plus longtemps ?",
      verification: { type: "qcm", choix: ["Se brosser les dents", "Une nuit de sommeil", "Un éternuement"], bonne: 1 },
      dessin: duree,
    },
    {
      tag: "Énigme 5 · Le piège",
      titre: "Hier",
      question: `Hier, c'était <b>mercredi</b>.<br><br>Quel jour sommes-nous ?`,
      reponse: `Hier, c'est avant.<br>Après mercredi : <span class="big">jeudi</span>.`,
      consigne: "Hier, c'était mercredi. Quel jour sommes-nous ?",
      verification: { type: "qcm", choix: ["Jeudi", "Mardi", "Mercredi"], bonne: 0 },
      dessin: piege,
      sorte: "piege",
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Bientôt la piscine",
      question: `Aujourd'hui : <b>mercredi</b>.<br>Piscine : <b>samedi</b>.<br><br>Combien de dodos avant ?`,
      reponse: `Dodo 1 : jeudi.<br>Dodo 2 : vendredi.<br>Dodo 3 : samedi.<br><span class="big">3 dodos</span>.`,
      consigne: "Aujourd'hui mercredi, piscine samedi : combien de dodos avant ?",
      verification: { type: "courte", attendus: ["3"] },
      dessin: defi,
      sorte: "defi",
    },
  ],
};

export default problemes;
