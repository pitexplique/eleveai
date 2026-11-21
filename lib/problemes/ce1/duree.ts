// Énigmes à projeter — CE1, notion temps et durées (l'horloge à 3 h,
// l'horloge à 7 h 30, dans deux jours, la sieste, le piège des deux aiguilles,
// le défi du calendrier de mai). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, o, l, grille } from "../dessins-ecole";

/** Une horloge : h = heure (petite aiguille, peut être 7.5), m = minutes (grande aiguille). */
const horloge = (cx: number, cy: number, R: number, h: number, m: number) => {
  let s = o(cx, cy, R, C.craie, 0.05, 5);
  for (let k = 1; k <= 12; k++) {
    const a = (k / 12) * 2 * Math.PI - Math.PI / 2;
    s += t(cx + Math.cos(a) * (R - 26), cy + Math.sin(a) * (R - 26) + 9, k, C.craie, 24);
  }
  const aig = (frac: number, long: number, c: string, ep: number) => {
    const a = frac * 2 * Math.PI - Math.PI / 2;
    return l(cx, cy, cx + Math.cos(a) * long, cy + Math.sin(a) * long, c, ep);
  };
  return s + aig(m / 60, R - 30, C.bleu, 5) + aig(h / 12, R * 0.5, C.rose, 8) + o(cx, cy, 6, C.craie, 1, 2);
};

const troisH = svg(
  "Une horloge : petite aiguille sur 3, grande aiguille sur 12",
  horloge(240, 180, 140, 3, 0) + t(240, 380, `Quelle heure est-il${NB}?`, C.rose, 30)
);

const septH = svg(
  "Une horloge : petite aiguille entre 7 et 8, grande aiguille sur 6",
  horloge(240, 180, 140, 7.5, 30) + t(240, 380, `Quelle heure est-il${NB}?`, C.rose, 30)
);

const JOURS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
const semaine = svg(
  "Les jours de la semaine ; aujourd'hui : mardi",
  JOURS.map((j, i) => r(20 + i * 64, 150, 60, 60, i === 1 ? C.jaune : C.pale, i === 1 ? 0.4 : 0.05, 3, 6) + t(50 + i * 64, 188, j.slice(0, 3), C.craie, 18)).join("") +
    t(84, 130, "aujourd'hui", C.jaune, 18) + t(240, 290, "+ 2 jours", C.bleu, 30) + t(240, 360, `Quel jour${NB}?`, C.rose, 30)
);

const sieste = svg(
  "Deux horloges : 1 h et 3 h",
  horloge(125, 170, 95, 1, 0) + horloge(355, 170, 95, 3, 0) + t(125, 300, "elle s'endort", C.pale, 22) + t(355, 300, "elle se réveille", C.pale, 22) +
    t(240, 380, `Combien de temps${NB}?`, C.rose, 30)
);

const piege = svg(
  "Une horloge : petite aiguille sur 6, grande aiguille sur 12",
  horloge(240, 180, 140, 6, 0) + t(240, 380, `Quelle heure est-il${NB}?`, C.rose, 30)
);

const mai = svg(
  "Un calendrier de mai : le 1er est un lundi",
  t(240, 60, "MAI", C.craie, 30) + ["lu", "ma", "me", "je", "ve", "sa", "di"].map((j, i) => t(86 + i * 52, 105, j, C.pale, 20)).join("") +
    grille(60, 115, 7, 2, 52, C.pale, 2) + [1, 2, 3, 4, 5, 6, 7].map((n, i) => t(86 + i * 52, 150, n, n === 1 ? C.jaune : C.craie, 24)).join("") +
    r(60, 115, 52, 52, C.jaune, 0.25, 0) +
    t(240, 300, "Le 1er mai est un lundi.", C.craie, 24) + t(240, 360, `Le 8 mai${NB}?`, C.rose, 30)
);

const problemes: ProblemesNotion = {
  classe: "ce1",
  notionId: "duree",
  titre: "Énigmes sur le temps et les durées",
  description: "Lire 3 h et 7 h 30 sur l'horloge, le jour dans deux jours, la durée de la sieste, le piège des deux aiguilles, le défi du calendrier de mai.",
  problemes: [
    {
      tag: "Énigme 1 · L'horloge de la classe",
      titre: "Trois heures",
      question: `La <b>petite aiguille</b> montre les heures.<br>La <b>grande aiguille</b> est sur le 12.<br><br>Quelle heure est-il ?`,
      reponse: `La petite aiguille est sur le 3.<br>La grande sur le 12 : heure pile.<br>Il est <span class="big">3 h</span>.`,
      consigne: "Quelle heure montre l'horloge ?",
      verification: { type: "qcm", choix: ["12 h", "3 h", "9 h"], bonne: 1 },
      dessin: troisH,
    },
    {
      tag: "Énigme 2 · Le petit-déjeuner",
      titre: "Sept heures et demie",
      question: `La petite aiguille est entre le <b>7</b> et le <b>8</b>.<br>La grande aiguille est sur le <b>6</b>.<br><br>Quelle heure est-il ?`,
      reponse: `Grande aiguille sur le 6 : 30 minutes, la demie.<br>La petite a passé le 7.<br>Il est <span class="big">7 h 30</span>.`,
      consigne: "Quelle heure montre l'horloge ?",
      verification: { type: "qcm", choix: ["6 h 30", "7 h 6", "7 h 30"], bonne: 2 },
      dessin: septH,
    },
    {
      tag: "Énigme 3 · Le calendrier",
      titre: "Dans deux jours",
      question: `Aujourd'hui, c'est <b>mardi</b>.<br>Le cirque vient <b>dans 2 jours</b>.<br><br>Quel jour ?`,
      reponse: `Mardi, puis mercredi (1 jour), puis jeudi (2 jours).<br>Le cirque vient <span class="big">jeudi</span>.`,
      consigne: "Quel jour vient le cirque ?",
      verification: { type: "qcm", choix: ["jeudi", "mercredi", "vendredi"], bonne: 0 },
      dessin: semaine,
    },
    {
      tag: "Énigme 4 · La sieste",
      titre: "La sieste du bébé",
      question: `Le bébé s'endort à <b>1 h</b> de l'après-midi.<br>Il se réveille à <b>3 h</b>.<br><br>Combien de temps a-t-il dormi ?`,
      reponse: `De 1 h à 2 h : 1 heure.<br>De 2 h à 3 h : 1 heure.<br>Il a dormi <span class="big">2 heures</span>.`,
      consigne: "Combien d'heures a dormi le bébé ?",
      verification: { type: "courte", attendus: ["2"], unite: "heures" },
      dessin: sieste,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les deux aiguilles",
      sorte: "piege",
      question: `La <b>grande aiguille</b> est sur le 12.<br>La <b>petite aiguille</b> est sur le 6.<br><br>Quelle heure est-il ?`,
      reponse: `Le piège : lire la grande aiguille et dire « 12 h ».<br>Les heures, c'est la <b>petite</b> aiguille : le 6.<br>Il est <span class="big">6 h</span>.`,
      consigne: "Quelle heure montre l'horloge ?",
      verification: { type: "qcm", choix: ["12 h", "6 h", "6 h 12"], bonne: 1 },
      dessin: piege,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le calendrier de mai",
      sorte: "defi",
      question: `Le <b>1<sup>er</sup> mai</b> est un <b>lundi</b>.<br><br>Quel jour est le <b>8 mai</b> ?`,
      reponse: `Une semaine = 7 jours.<br>1 + 7 = 8 : le 8 mai, c'est une semaine plus tard.<br>Le même jour : <span class="big">lundi</span>.`,
      consigne: "Quel jour est le 8 mai ?",
      verification: { type: "qcm", choix: ["mardi", "dimanche", "lundi"], bonne: 2 },
      dessin: mai,
    },
  ],
};

export default problemes;
