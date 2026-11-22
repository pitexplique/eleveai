// Énigmes à projeter — STMG (1re), notion proportions et pourcentages
// (le centre d'appels, la friperie, l'agence d'intérim, l'opticien,
// piège du pressing, défi du télétravail). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, o, bande } from "../dessins-ecole";
import { secteur } from "../dessins-1re";

const centreAppels = svg("Le centre d'appels : 240 appels, dont 60 réclamations",
  t(240, 140, "240 appels", C.craie, 26) +
    bande(60, 170, 360, 70, 4, 1, C.rose) +
    t(60, 280, "60 réclamations", C.rose, 22, "start") +
    t(240, 370, `proportion =${NB}?`, C.rose, 28));

const friperie = svg("La friperie : 400 articles, dont 150 vestes",
  t(240, 140, "400 articles", C.craie, 26) +
    bande(40, 170, 400, 70, 8, 3, C.bleu) +
    t(115, 280, "150 vestes", C.bleu, 22) +
    t(240, 370, `proportion en % =${NB}?`, C.rose, 28));

const interim = svg("L'agence d'intérim : 350 missions, dont 18 % durent plus d'un mois",
  o(240, 200, 130, C.craie, 0, 3) + secteur(240, 200, 130, 0, 64.8, C.jaune, 0.45) +
    t(326, 66, "18 %", C.jaune, 24) +
    t(40, 40, "350 missions", C.craie, 22, "start") +
    t(240, 385, `plus d'un mois :${NB}?${NB}missions`, C.rose, 24));

const opticien = svg("L'opticien : 40 % des clients achètent des lunettes, et 30 % de ceux-là prennent des verres anti-lumière bleue",
  t(240, 130, "tous les clients", C.craie, 22) +
    r(40, 150, 400, 60, C.craie, 0, 3) + r(40, 150, 160, 60, C.jaune, 0.35, 3) +
    t(120, 244, "40 % : lunettes", C.jaune, 20) +
    r(40, 260, 160, 60, C.jaune, 0.35, 3) + r(40, 260, 48, 60, C.rose, 0.5, 3) +
    t(40, 350, "30 % de ces 40 % : anti-lumière bleue", C.rose, 20, "start") +
    t(240, 400, `part des clients :${NB}?`, C.rose, 24));

const pressing = svg("Le pressing : lundi 80 vêtements dont 25 % de chemises, mardi 20 vêtements dont 50 % de chemises",
  t(60, 95, "lundi : 80 vêtements, 25 % de chemises", C.craie, 20, "start") +
    r(60, 110, 320, 50, C.craie, 0, 3) + r(60, 110, 80, 50, C.bleu, 0.4, 3) +
    t(60, 235, "mardi : 20 vêtements, 50 % de chemises", C.craie, 20, "start") +
    r(60, 250, 80, 50, C.craie, 0, 3) + r(60, 250, 40, 50, C.bleu, 0.4, 3) +
    t(240, 380, `le plus de chemises :${NB}?`, C.rose, 26));

const teletravail = svg("L'entreprise : 60 % de femmes dont 25 % en télétravail, 40 % d'hommes dont 40 % en télétravail",
  t(176, 75, "60 % femmes", C.craie, 20) + t(336, 75, "40 % hommes", C.craie, 20) +
    r(80, 270, 192, 60, C.bleu, 0.4, 0) + r(272, 234, 128, 96, C.bleu, 0.4, 0) +
    r(80, 90, 192, 240, C.craie, 0, 3) + r(272, 90, 128, 240, C.craie, 0, 3) +
    t(176, 308, "25 %", C.craie, 22) + t(336, 290, "40 %", C.craie, 22) +
    t(240, 385, `en télétravail :${NB}?`, C.rose, 26));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "auto_proportion",
  titre: "Énigmes de proportions et pourcentages",
  description: "Le centre d'appels, la friperie, l'agence d'intérim, l'opticien, le piège du pressing, le défi du télétravail : calculer une proportion, l'écrire en pourcentage, appliquer un pourcentage, la proportion d'une proportion.",
  problemes: [
    {
      tag: "Énigme 1 · Le centre d'appels",
      titre: "Les réclamations",
      question: `Ce matin, un centre d'appels a reçu 240 appels.<br>60 de ces appels sont des réclamations.<br><br><b>Quelle est la proportion de réclamations</b> ?`,
      reponse: `Proportion = partie ÷ total = 60 ÷ 240 = 0,25.<br><span class="big">25 %</span> des appels sont des réclamations : un appel sur quatre.`,
      consigne: "240 appels, dont 60 réclamations. Quelle est la proportion de réclamations ?",
      verification: { type: "qcm", choix: ["25 %", "60 %", "4 %"], bonne: 0 },
      dessin: centreAppels,
    },
    {
      tag: "Énigme 2 · La friperie",
      titre: "Les vestes",
      question: `Une friperie vend 400 articles. Parmi eux, il y a 150 vestes.<br><br><b>Quelle part des articles sont des vestes</b>, en pourcentage ?`,
      reponse: `150 ÷ 400 = 0,375.<br>0,375 = 37,5 ÷ 100, donc <span class="big">37,5 %</span>.<br>C'est aussi la fraction 3/8.`,
      consigne: "400 articles, dont 150 vestes. Quel pourcentage des articles sont des vestes ?",
      verification: { type: "courte", attendus: ["37,5", "37,5%"], unite: "%" },
      dessin: friperie,
    },
    {
      tag: "Énigme 3 · L'agence d'intérim",
      titre: "Les longues missions",
      question: `Une agence d'intérim a proposé 350 missions cette année.<br>18 % de ces missions durent plus d'un mois.<br><br><b>Combien de missions durent plus d'un mois</b> ?`,
      reponse: `18 % de 350, c'est 0,18 × 350.<br>0,18 × 350 = <span class="big">63 missions</span>.`,
      consigne: "18 % de 350 missions durent plus d'un mois. Combien de missions ?",
      verification: { type: "courte", attendus: ["63"], unite: "missions" },
      dessin: interim,
    },
    {
      tag: "Énigme 4 · L'opticien",
      titre: "Un pourcentage de pourcentage",
      question: `Chez un opticien, 40 % des clients achètent des lunettes.<br>Parmi eux, 30 % prennent des verres anti-lumière bleue.<br><br><b>Quelle part de tous les clients</b> prend ces verres ?`,
      reponse: `30 % de 40 %, c'est 0,30 × 0,40 = 0,12.<br><span class="big">12 %</span> des clients.<br>On multiplie les proportions, on ne les ajoute pas.`,
      consigne: "40 % des clients achètent des lunettes, 30 % d'entre eux prennent l'anti-lumière bleue. Quelle part des clients ?",
      verification: { type: "qcm", choix: ["70 %", "12 %", "10 %"], bonne: 1 },
      dessin: opticien,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le pressing",
      sorte: "piege",
      question: `Au pressing, lundi : 80 vêtements, dont 25 % de chemises.<br>Mardi : 20 vêtements, dont 50 % de chemises.<br>Tom : « Mardi, il y a eu plus de chemises, 50 % c'est plus que 25 %. »<br><br><b>Quel jour y a-t-il eu le plus de chemises</b> ?`,
      reponse: `Lundi : 25 % de 80 = 20 chemises.<br>Mardi : 50 % de 20 = 10 chemises.<br><span class="big">Le lundi</span>. Un pourcentage plus grand d'un total plus petit peut donner moins.`,
      consigne: "Lundi 25 % de 80 vêtements, mardi 50 % de 20 vêtements. Quel jour y a-t-il eu le plus de chemises ?",
      verification: { type: "qcm", choix: ["le mardi", "autant les deux jours", "le lundi"], bonne: 2 },
      dessin: pressing,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le télétravail",
      sorte: "defi",
      question: `Dans une entreprise, 60 % des salariés sont des femmes et 40 % des hommes.<br>25 % des femmes et 40 % des hommes sont en télétravail.<br><br><b>Quelle part de tous les salariés</b> est en télétravail ?`,
      reponse: `Femmes : 25 % de 60 % = 0,25 × 0,60 = 0,15.<br>Hommes : 40 % de 40 % = 0,40 × 0,40 = 0,16.<br>0,15 + 0,16 = 0,31, soit <span class="big">31 %</span>.`,
      consigne: "60 % de femmes dont 25 % en télétravail, 40 % d'hommes dont 40 % en télétravail. Quelle part en télétravail ?",
      verification: { type: "courte", attendus: ["31", "31%"], unite: "%" },
      dessin: teletravail,
    },
  ],
};

export default problemes;
