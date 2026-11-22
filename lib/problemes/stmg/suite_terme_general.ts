// Énigmes à projeter — STMG (1re), notion terme général d'une suite
// (l'élevage de poules pondeuses, la franchise de burgers, la cotisation du
// club de crossfit, le compteur d'eau de la fabrique de glaçons, piège de
// l'installateur de pompes à chaleur, défi des bénévoles du Sakifo (974)).
// 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";

const carte = (y: number, haut: string, bas: string, c: string) =>
  r(90, y, 300, 110, c, 0.15, 3, 12) + t(240, y + 45, haut, C.pale, 22) + t(240, y + 90, bas, C.craie, 32);

const poules = svg("L'élevage de poules pondeuses : 120 poules au départ, 15 poules de plus chaque année ; u indice n en fonction de n ?",
  carte(50, "poules au départ", "u₀ = 120", C.bleu) + t(240, 230, "+ 15 poules chaque année", C.jaune, 26) +
    t(240, 330, `uₙ${NB}=${NB}?`, C.rose, 32));

const burgers = svg("La franchise de burgers : 5 restaurants au départ, leur nombre double chaque année ; u indice n égale 5 fois 2 puissance n ; u indice 6 ?",
  carte(50, "restaurants", "u₀ = 5", C.bleu) + t(240, 230, "× 2 chaque année", C.jaune, 26) +
    t(240, 290, "uₙ = 5 × 2ⁿ", C.craie, 30) + t(240, 370, `u₆${NB}=${NB}?`, C.rose, 32));

const crossfit = svg("La cotisation du club de crossfit : 400 euros en 2025, plus 3 pour cent par an ; u indice n en fonction de n ?",
  carte(50, "cotisation en 2025", "u₀ = 400 €", C.bleu) + t(240, 230, "+ 3 % par an", C.jaune, 26) +
    t(240, 330, `uₙ${NB}=${NB}?`, C.rose, 32));

const glacons = svg("Le compteur d'eau de la fabrique de glaçons : trois mois de suite, 40, 60 et 90 mètres cubes",
  [["janvier", "40 m³"], ["février", "60 m³"], ["mars", "90 m³"]].map(([m, v], k) =>
    r(30 + k * 145, 90, 130, 120, C.bleu, 0.15, 3, 10) + t(95 + k * 145, 135, m, C.pale, 22) + t(95 + k * 145, 185, v, C.craie, 28)).join("") +
    t(240, 290, "trois termes qui se suivent", C.pale, 22) + t(240, 360, `arithmétique${NB}? géométrique${NB}?`, C.rose, 24));

const pac = svg("L'installateur de pompes à chaleur : 50 pompes la première année, u indice 1 égale 50 ; 20 de plus chaque année ; Hugo écrit u indice n égale 50 plus 20 n",
  carte(40, "1re année", "u₁ = 50", C.bleu) + t(240, 210, "+ 20 chaque année", C.jaune, 26) +
    t(240, 275, "Hugo : uₙ = 50 + 20n", C.pale, 24) + t(240, 360, `u₅${NB}=${NB}?`, C.rose, 32));

const sakifo = svg("Les bénévoles du Sakifo : 200 bénévoles l'année 0, 15 de plus chaque année ; u indice n égale 200 plus 15 n ; 350 bénévoles quand ?",
  carte(40, "bénévoles", "uₙ = 200 + 15n", C.bleu) +
    t(240, 240, "uₙ = 350", C.jaune, 30) + t(240, 340, `n${NB}=${NB}?`, C.rose, 32));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "suite_terme_general",
  titre: "Énigmes du terme général d'une suite",
  description: "L'élevage de poules pondeuses, la franchise de burgers, la cotisation du club de crossfit, le compteur d'eau de la fabrique de glaçons, le piège des pompes à chaleur, le défi des bénévoles du Sakifo : écrire uₙ en fonction de n, calculer un terme lointain, reconnaître trois termes qui se suivent.",
  problemes: [
    {
      tag: "Énigme 1 · Les poules pondeuses",
      titre: "Suite arithmétique : uₙ = ?",
      question: `Un élevage a 120 poules pondeuses l'année 0.<br>Chaque année, il en ajoute 15.<br>u<sub>n</sub> est le nombre de poules l'année n.<br><br><b>Quelle formule donne</b> u<sub>n</sub> ?`,
      reponse: `On ajoute 15, n fois : suite arithmétique.<br>u<sub>n</sub> = u<sub>0</sub> + n × r.<br><span class="big">u<sub>n</sub> = 120 + 15n</span>.`,
      consigne: "u₀ = 120, + 15 par an. Quelle formule pour uₙ ?",
      verification: { type: "qcm", choix: ["uₙ = 120 + 15n", "uₙ = 15 + 120n", "uₙ = 120 × 15ⁿ"], bonne: 0 },
      dessin: poules,
    },
    {
      tag: "Énigme 2 · Les burgers",
      titre: "Suite géométrique : un terme lointain",
      question: `Une franchise de burgers a 5 restaurants l'année 0.<br>Chaque année, leur nombre double.<br>Donc u<sub>n</sub> = 5 × 2<sup>n</sup>.<br><br><b>Combien de restaurants</b> l'année 6 ?`,
      reponse: `2<sup>6</sup> = 2 × 2 × 2 × 2 × 2 × 2 = 64.<br>u<sub>6</sub> = 5 × 64 = <span class="big">320 restaurants</span>.`,
      consigne: "uₙ = 5 × 2ⁿ. Combien vaut u₆ ?",
      verification: { type: "courte", attendus: ["320"] },
      dessin: burgers,
    },
    {
      tag: "Énigme 3 · Le club de crossfit",
      titre: "Trouver la raison du modèle",
      question: `La cotisation d'un club de crossfit est de 400 € en 2025 : u<sub>0</sub> = 400.<br>Elle augmente de 3 % chaque année.<br><br><b>Quelle formule donne</b> u<sub>n</sub> ?`,
      reponse: `+ 3 %, c'est × 1,03 : suite géométrique de raison 1,03.<br>u<sub>n</sub> = u<sub>0</sub> × q<sup>n</sup>.<br><span class="big">u<sub>n</sub> = 400 × 1,03<sup>n</sup></span>.`,
      consigne: "u₀ = 400 €, + 3 % par an. Quelle formule pour uₙ ?",
      verification: { type: "qcm", choix: ["uₙ = 400 + 3n", "uₙ = 400 × 1,03ⁿ", "uₙ = 400 × 3ⁿ"], bonne: 1 },
      dessin: crossfit,
    },
    {
      tag: "Énigme 4 · La fabrique de glaçons",
      titre: "Trois termes qui se suivent",
      question: `Une fabrique de glaçons relève son compteur d'eau.<br>Elle consomme 40 m³ en janvier, 60 m³ en février et 90 m³ en mars.<br><br><b>Ces trois nombres sont les termes</b> de quelle suite ?`,
      reponse: `Écarts : + 20, puis + 30. Pas arithmétique.<br>Quotients : 60 ÷ 40 = 1,5 et 90 ÷ 60 = 1,5.<br><span class="big">Une suite géométrique</span> de raison 1,5.`,
      consigne: "40 ; 60 ; 90. Quelle suite ?",
      verification: { type: "qcm", choix: ["arithmétique", "ni l'une ni l'autre", "géométrique"], bonne: 2 },
      dessin: glacons,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les pompes à chaleur",
      sorte: "piege",
      question: `Un installateur pose 50 pompes à chaleur la 1re année : u<sub>1</sub> = 50.<br>Chaque année, il en pose 20 de plus.<br>Hugo écrit : « u<sub>n</sub> = 50 + 20n ».<br><br><b>Combien de pompes</b> pose-t-il vraiment l'année 5 ?`,
      reponse: `La suite commence à u<sub>1</sub>, pas à u<sub>0</sub>. Avec Hugo, u<sub>1</sub> = 70 : faux.<br>De u<sub>1</sub> à u<sub>5</sub>, on ajoute 4 fois 20.<br>u<sub>5</sub> = 50 + 4 × 20 = <span class="big">130 pompes</span>.`,
      consigne: "u₁ = 50, + 20 par an. Combien vaut u₅ ?",
      verification: { type: "courte", attendus: ["130"] },
      dessin: pac,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les bénévoles du Sakifo",
      sorte: "defi",
      question: `Le Sakifo, festival de musique de Saint-Pierre, recrute des bénévoles.<br>Imaginons 200 bénévoles l'année 0, puis 15 de plus chaque année.<br>Donc u<sub>n</sub> = 200 + 15n.<br><br><b>Quelle année</b> (quel rang n) y aura-t-il 350 bénévoles ?`,
      reponse: `On cherche n tel que 200 + 15n = 350.<br>15n = 350 − 200 = 150, donc n = 150 ÷ 15.<br><span class="big">n = 10</span> : dans 10 ans.`,
      consigne: "uₙ = 200 + 15n. Pour quel n a-t-on uₙ = 350 ?",
      verification: { type: "courte", attendus: ["10"] },
      dessin: sakifo,
    },
  ],
};

export default problemes;
