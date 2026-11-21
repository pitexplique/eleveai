// Énigmes à projeter — CM1, notion graphiques et diagrammes (les bouteilles
// recyclées par classe : lire une barre, comparer ; la courbe du haricot : lire,
// interpréter ; le piège des graduations de 2 en 2 ; le défi du pictogramme
// avec une demi-part). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p, o } from "../dessins-ecole";

// Les bouteilles : 7 px par bouteille, base à 330.
const CLASSES: [string, number][] = [["CP", 15], ["CE1", 25], ["CE2", 20], ["CM1", 35]];
const bouteilles = (q: string) => {
  let s = l(80, 330, 440, 330, C.craie, 3) + l(80, 330, 80, 70, C.craie, 3);
  for (let v = 5; v <= 35; v += 5) s += l(80, 330 - v * 7, 440, 330 - v * 7, C.pale, 1, "4 6") + t(70, 337 - v * 7, v, C.pale, 18, "end");
  CLASSES.forEach(([e, v], i) => (s += r(110 + i * 85, 330 - v * 7, 60, v * 7, C.bleu, 0.35, 3) + t(140 + i * 85, 360, e, C.craie, 22)));
  return svg("Diagramme en barres des bouteilles ramenées : CP 15, CE1 25, CE2 20, CM1 35", s + t(240, 45, "♻️ bouteilles ramenées", C.craie, 22) + t(240, 405, q, C.rose, 24));
};

// Le haricot : semaines 1 → 4 (90 px), 0 → 16 cm (16 px par cm).
const HARICOT: [number, number][] = [[1, 2], [2, 5], [3, 9], [4, 14]];
const X = (s: number) => 120 + (s - 1) * 90, Y = (cm: number) => 330 - cm * 16;
const haricot = (q: string) => {
  let s = l(80, 330, 430, 330, C.craie, 3) + l(80, 330, 80, 60, C.craie, 3);
  for (let cm = 1; cm <= 16; cm++) s += l(80, Y(cm), 430, Y(cm), C.pale, cm % 2 ? 0.6 : 1.2, "4 6") + (cm % 2 ? "" : t(70, Y(cm) + 7, cm, C.pale, 18, "end"));
  HARICOT.forEach(([w]) => (s += t(X(w), 360, `semaine ${w}`, C.craie, 16)));
  s += p("M" + HARICOT.map(([w, cm]) => `${X(w)} ${Y(cm)}`).join(" L"), C.rose, 4) + HARICOT.map(([w, cm]) => o(X(w), Y(cm), 6, C.rose, 1, 2)).join("");
  return svg("Courbe de la taille d'un haricot : 2 cm la semaine 1, 5 cm la semaine 2, 9 cm la semaine 3, 14 cm la semaine 4", s + t(90, 52, "cm 🌱", C.pale, 20, "start") + t(240, 405, q, C.rose, 24));
};

// Les paniers : graduations tous les 2, nombres tous les 4 (15 px par panier).
const paniers = (() => {
  let s = l(80, 330, 430, 330, C.craie, 3) + l(80, 330, 80, 70, C.craie, 3);
  for (let v = 2; v <= 16; v += 2) s += l(80, 330 - v * 15, 430, 330 - v * 15, C.pale, 1, "4 6") + l(74, 330 - v * 15, 86, 330 - v * 15, C.craie, 2) + (v % 4 ? "" : t(66, 337 - v * 15, v, C.pale, 18, "end"));
  s += t(66, 337, 0, C.pale, 18, "end");
  ([["Léa", 10, C.jaune], ["Noé", 6, C.bleu], ["Inès", 14, C.rose]] as [string, number, string][]).forEach(
    ([e, v, c], i) => (s += r(130 + i * 100, 330 - v * 15, 70, v * 15, c, 0.35, 3) + t(165 + i * 100, 362, e, C.craie, 22))
  );
  return svg("Diagramme des paniers marqués : graduations de 2 en 2, nombres écrits de 4 en 4 ; Léa 10, Noé 6, Inès 14", s + t(240, 50, "🏀 paniers marqués", C.craie, 22) + t(240, 405, `Léa${NB}?`, C.rose, 26));
})();

// Le pictogramme : un disque = 4 biscuits ; mardi finit par un demi-disque.
const disque = (x: number, y: number) => o(x, y, 22, C.jaune, 0.45, 3);
const demi = (x: number, y: number) => p(`M${x} ${y - 22} A22 22 0 0 0 ${x} ${y + 22} Z`, C.jaune, 3, 0.45);
const biscuits = svg(
  "Pictogramme des biscuits vendus : un disque vaut 4 biscuits ; lundi 3 disques, mardi 2 disques et un demi-disque",
  t(240, 50, "🍪 biscuits vendus à la kermesse", C.craie, 22) +
    t(110, 150, "lundi", C.craie, 24, "end") + disque(160, 142) + disque(220, 142) + disque(280, 142) +
    t(110, 240, "mardi", C.craie, 24, "end") + disque(160, 232) + disque(220, 232) + demi(280, 232) +
    r(120, 290, 240, 56, C.pale, 0, 2, 8) + disque(160, 318) + t(200, 327, "= 4 biscuits", C.craie, 22, "start") +
    t(240, 400, `En tout${NB}?`, C.rose, 26)
);

const problemes: ProblemesNotion = {
  classe: "cm1",
  notionId: "graphique",
  titre: "Énigmes sur les graphiques et diagrammes",
  description: "Les bouteilles recyclées par classe (lire une barre, comparer), la courbe du haricot qui pousse, le piège des graduations de 2 en 2, le défi du pictogramme des biscuits.",
  problemes: [
    {
      tag: "Énigme 1 · Le recyclage",
      titre: "Lire une barre",
      question: `Chaque classe ramène des bouteilles vides.<br>Le diagramme les compte.<br><br>Combien de bouteilles pour le <b>CE2</b> ?`,
      reponse: `On monte en haut de la barre du CE2.<br>On lit à gauche : <span class="big">20 bouteilles</span>.`,
      consigne: "Combien de bouteilles le CE2 a-t-il ramenées ?",
      verification: { type: "courte", attendus: ["20"], unite: "bouteilles" },
      dessin: bouteilles(`Le CE2${NB}?`),
    },
    {
      tag: "Énigme 2 · Le recyclage",
      titre: "Comparer deux barres",
      question: `Regarde encore le diagramme.<br><br>Combien de bouteilles le <b>CM1</b> a-t-il ramenées <b>de plus</b> que le <b>CE1</b> ?`,
      reponse: `CM1 : 35. CE1 : 25.<br>35 − 25 = <span class="big">10 bouteilles</span> de plus.`,
      consigne: "Combien de bouteilles le CM1 a-t-il ramenées de plus que le CE1 ?",
      verification: { type: "courte", attendus: ["10"], unite: "bouteilles" },
      dessin: bouteilles(`CM1 − CE1${NB}?`),
    },
    {
      tag: "Énigme 3 · Le haricot",
      titre: "Lire une courbe",
      question: `Sami mesure son haricot chaque semaine.<br>La courbe montre sa taille.<br><br>Combien mesure-t-il à la <b>semaine 3</b> ?`,
      reponse: `On monte depuis « semaine 3 » jusqu'au point.<br>On lit à gauche : <span class="big">9 cm</span>.`,
      consigne: "Combien mesure le haricot à la semaine 3 ?",
      verification: { type: "courte", attendus: ["9"], unite: "cm" },
      dessin: haricot(`Semaine 3${NB}?`),
    },
    {
      tag: "Énigme 4 · Le haricot",
      titre: "Quand pousse-t-il le plus ?",
      question: `Entre quelles semaines le haricot a-t-il le <b>plus grandi</b> ?`,
      reponse: `De 1 à 2 : 5 − 2 = 3 cm. De 2 à 3 : 9 − 5 = 4 cm.<br>De 3 à 4 : 14 − 9 = 5 cm.<br>Le plus : <span class="big">entre 3 et 4</span>.`,
      consigne: "Entre quelles semaines le haricot a-t-il le plus grandi ?",
      verification: { type: "qcm", choix: ["entre 1 et 2", "entre 2 et 3", "entre 3 et 4"], bonne: 2 },
      dessin: haricot(`Le plus grand saut${NB}?`),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les graduations",
      sorte: "piege",
      question: `Le diagramme compte les paniers marqués au basket.<br>Regarde bien les nombres à gauche.<br><br>Combien de paniers pour <b>Léa</b> ?`,
      reponse: `Le piège : croire qu'un trait vaut 1.<br>Les traits vont de 2 en 2 : 8, puis 10.<br>Léa a marqué <span class="big">10 paniers</span>.`,
      consigne: "Combien de paniers Léa a-t-elle marqués ?",
      verification: { type: "qcm", choix: ["9", "10", "5"], bonne: 1 },
      dessin: paniers,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le demi-biscuit",
      sorte: "defi",
      question: `Un disque vaut <b>4 biscuits</b>.<br>Mardi, il y a un <b>demi-disque</b>.<br><br>Combien de biscuits vendus <b>en tout</b> ?`,
      reponse: `Lundi : 3 × 4 = 12.<br>Mardi : 2 × 4 = 8, plus la moitié de 4 = 2. Donc 10.<br>12 + 10 = <span class="big">22 biscuits</span>.`,
      consigne: "Combien de biscuits ont été vendus lundi et mardi en tout ?",
      verification: { type: "courte", attendus: ["22"], unite: "biscuits" },
      dessin: biscuits,
    },
  ],
};

export default problemes;
