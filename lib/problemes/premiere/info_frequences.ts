// Énigmes à projeter — première (sans spé maths), notion info_frequences
// (le magasin de vélos, les urgences de l'hôpital, l'appli de méditation, les
// repas végétariens de l'avion, piège des conducteurs de nuit, défi des colis
// abîmés). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t } from "../dessins-ecole";
import { frac } from "../outils";
import { tableau } from "../dessins-2de";

const coul = (cible: [number, number][]) => (i: number, j: number) =>
  cible.some(([a, b]) => a === i && b === j) ? C.jaune : i === 0 || j === 0 ? C.pale : C.craie;

const velos = svg("Un tableau de 400 vélos vendus : VTT 160, route 90, ville 150, selon hommes et femmes",
  tableau(20, 60, [120, 80, 80, 80, 80], 56, [["", "VTT", "route", "ville", "total"], ["hommes", 110, 65, 75, 250], ["femmes", 50, 25, 75, 150], ["total", 160, 90, 150, 400]], coul([[3, 1], [3, 4]]), 20) +
    t(240, 385, `la fréquence des VTT${NB}?`, C.rose, 26));

const urgences = svg("Un tableau de 250 patients des urgences : 80 venus en ambulance dont 48 hospitalisés ; 170 par leurs moyens dont 34 hospitalisés",
  tableau(20, 60, [150, 110, 90, 70], 56, [["", "hospitalisé", "rentré", "total"], ["ambulance", 48, 32, 80], ["seul", 34, 136, 170], ["total", 82, 168, 250]], coul([[1, 1], [1, 3]]), 20) +
    t(240, 330, "parmi les patients en ambulance", C.craie, 20) + t(240, 385, `quelle fréquence d'hospitalisés${NB}?`, C.rose, 22));

const meditation = svg("Un tableau de 300 utilisateurs : 120 chaque jour dont 84 dorment mieux ; 180 parfois dont 72 dorment mieux",
  tableau(20, 60, [150, 110, 90, 70], 56, [["", "dort mieux", "pareil", "total"], ["chaque jour", 84, 36, 120], ["parfois", 72, 108, 180], ["total", 156, 144, 300]], coul([[1, 1], [2, 1]]), 20) +
    t(240, 385, `qui dort le mieux${NB}?`, C.rose, 26));

const avion = svg("Un tableau de 800 passagers : affaires 80 dont 12 végétariens ; économique 720 dont 108 végétariens",
  tableau(20, 60, [150, 110, 90, 70], 56, [["", "végétarien", "autre", "total"], ["affaires", 12, 68, 80], ["économique", 108, 612, 720], ["total", 120, 680, 800]], coul([[3, 1]]), 20) +
    t(240, 385, `la fréquence des végétariens${NB}?`, C.rose, 24));

const nuit = svg("Un tableau de 1 000 conducteurs : 200 de nuit dont 20 accidents ; 800 de jour dont 30 accidents",
  tableau(30, 60, [130, 110, 100, 80], 56, [["", "accident", "aucun", "total"], ["nuit", 20, 180, 200], ["jour", 30, 770, 800], ["total", 50, 950, "1 000"]], coul([[1, 1], [1, 3]]), 20) +
    t(240, 320, "« 40 % des accidents ont lieu de nuit »", C.pale, 18) + t(240, 385, `et parmi les conducteurs de nuit${NB}?`, C.rose, 22));

const colis = svg("Des colis : 60 % en camion dont 10 % abîmés ; 40 % en avion dont 5 % abîmés ; 2 000 colis",
  tableau(30, 60, [130, 100, 100, 80], 56, [["", "abîmé", "intact", "total"], ["camion", "?", "…", "60 %"], ["avion", "?", "…", "40 %"], ["total", "?", "…", "2 000"]], coul([]), 20) +
    t(240, 320, "10 % des camions, 5 % des avions", C.craie, 20) + t(240, 385, `combien de colis abîmés${NB}?`, C.rose, 24));

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "info_frequences",
  titre: "Énigmes des fréquences marginales et conditionnelles",
  description: "Le magasin de vélos, les urgences de l'hôpital, l'appli de méditation, les repas végétariens de l'avion, le piège des conducteurs de nuit, le défi des colis abîmés : calculer une fréquence marginale, une fréquence conditionnelle, et les comparer.",
  problemes: [
    {
      tag: "Énigme 1 · Le magasin de vélos",
      titre: "Une fréquence marginale",
      question: `Un magasin a vendu 400 vélos cette année : VTT, vélos de route et vélos de ville.<br><br><b>Quelle est la fréquence</b> des VTT parmi les ventes, en pourcentage ?`,
      reponse: `On lit la marge : 160 VTT sur 400 vélos.<br>${frac(160, 400)} = 0,4 = <span class="big">40 %</span>.`,
      consigne: "160 VTT sur 400 vélos vendus : quelle fréquence, en % ?",
      verification: { type: "courte", attendus: ["40"], unite: "%" },
      dessin: velos,
    },
    {
      tag: "Énigme 2 · Les urgences",
      titre: "Une fréquence conditionnelle",
      question: `Un hôpital a reçu 250 patients aux urgences. Certains sont venus en ambulance.<br><br>Parmi les patients venus en ambulance, <b>quelle est la fréquence</b> des hospitalisés ?`,
      reponse: `On ne garde que la ligne « ambulance » : 48 hospitalisés sur 80.<br>${frac(48, 80)} = 0,6 = <span class="big">60 %</span>. (48 ÷ 250 = 19,2 % serait la fréquence de l'intersection.)`,
      consigne: "48 hospitalisés parmi les 80 patients en ambulance : quelle fréquence ?",
      verification: { type: "qcm", choix: ["32 %", "60 %", "19,2 %"], bonne: 1 },
      dessin: urgences,
    },
    {
      tag: "Énigme 3 · L'appli de méditation",
      titre: "Comparer deux groupes",
      question: `Une appli de méditation interroge 300 utilisateurs : certains méditent chaque jour, d'autres parfois.<br><br><b>Quel groupe</b> déclare le plus souvent mieux dormir ?`,
      reponse: `On compare les fréquences, pas les effectifs (84 et 72) : chaque jour, ${frac(84, 120)} = 70 % ; parfois, ${frac(72, 180)} = 40 %.<br><span class="big">Ceux qui méditent chaque jour</span>.`,
      consigne: "84 sur 120 chaque jour, 72 sur 180 parfois : quel groupe dort le mieux ?",
      verification: { type: "qcm", choix: ["Ceux qui méditent parfois", "Aucune différence", "Ceux qui méditent chaque jour"], bonne: 2 },
      dessin: meditation,
    },
    {
      tag: "Énigme 4 · Le repas dans l'avion",
      titre: "La même fréquence partout",
      question: `Dans un avion de 800 passagers, on compte les repas végétariens en classe affaires et en classe économique.<br><br><b>Quelle est la fréquence</b> des repas végétariens sur tout l'avion, en pourcentage ?`,
      reponse: `${frac(120, 800)} = 0,15 = <span class="big">15 %</span>.<br>Surprise : c'est aussi 15 % en affaires (12 sur 80) et en économique (108 sur 720).`,
      consigne: "120 repas végétariens sur 800 passagers : quelle fréquence, en % ?",
      verification: { type: "courte", attendus: ["15"], unite: "%" },
      dessin: avion,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Rouler de nuit",
      sorte: "piege",
      question: `Un journal titre : « 40 % des accidents ont lieu de nuit ! » (20 accidents sur 50).<br><br>Parmi les 200 conducteurs de nuit, <b>quelle part</b> a eu un accident ?`,
      reponse: `40 % est la part de la nuit <b>parmi les accidents</b>. La question est l'inverse : ${frac(20, 200)} = <span class="big">10 %</span>.<br>De jour : ${frac(30, 800)} ≈ 3,75 %. Rouler de nuit est bien plus risqué, mais pas « 40 % ».`,
      consigne: "20 accidents parmi 200 conducteurs de nuit : quelle part, en % ?",
      verification: { type: "qcm", choix: ["10 %", "40 %", "20 %"], bonne: 0 },
      dessin: nuit,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les colis abîmés",
      sorte: "defi",
      question: `Un transporteur envoie 2 000 colis : 60 % en camion, 40 % en avion. 10 % des colis en camion et 5 % des colis en avion arrivent abîmés.<br><br><b>Combien de colis</b> arrivent abîmés ?`,
      reponse: `Camion : 1 200 colis, dont 10 % = 120 abîmés. Avion : 800 colis, dont 5 % = 40.<br>En tout : <span class="big">160 colis</span>, soit 8 % (et pas (10 + 5) ÷ 2 = 7,5 %).`,
      consigne: "2 000 colis, 60 % en camion (10 % abîmés), 40 % en avion (5 % abîmés) : combien d'abîmés ?",
      verification: { type: "courte", attendus: ["160"], unite: "colis" },
      dessin: colis,
    },
  ],
};

export default problemes;
