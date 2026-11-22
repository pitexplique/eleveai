// Énigmes à projeter — première (sans spé maths), notion info_filtre_donnees
// (le comparateur de smartphones, le gîte de Mafate (974), le sport et la
// musique au lycée, le site de vélos d'occasion, piège des chiens et des
// chats du quartier, défi du vélo et du scooter). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l } from "../dessins-ecole";
import { tableau } from "../dessins-2de";

const coul = (cible: [number, number][]) => (i: number, j: number) =>
  cible.some(([a, b]) => a === i && b === j) ? C.jaune : i === 0 || j === 0 ? C.pale : C.craie;

const smartphones = svg("Tableau de six smartphones : P1 250 € 20 h, P2 480 € 30 h, P3 190 € 15 h, P4 320 € 26 h, P5 600 € 22 h, P6 280 € 28 h",
  tableau(80, 20, [100, 120, 140], 44, [["modèle", "prix", "autonomie"], ["P1", "250 €", "20 h"], ["P2", "480 €", "30 h"], ["P3", "190 €", "15 h"], ["P4", "320 €", "26 h"], ["P5", "600 €", "22 h"], ["P6", "280 €", "28 h"]], (i, j) => (i === 0 ? C.pale : j === 1 ? C.jaune : C.craie), 20) +
    t(240, 385, `combien à moins de 300 €${NB}?`, C.rose, 24));

const mafate = svg("Tableau croisé de 200 randonneurs d'un gîte de Mafate : par le col des Bœufs 70 pour 1 nuit et 50 pour 2 nuits ; par la rivière des Galets 60 et 20",
  tableau(20, 60, [170, 90, 90, 80], 56, [["arrivée", "1 nuit", "2 nuits", "total"], ["col des Bœufs", 70, 50, 120], ["rivière", 60, 20, 80], ["total", 130, 70, 200]], coul([[1, 2]]), 20) +
    t(240, 330, "col des Bœufs ET 2 nuits", C.craie, 20) + t(240, 385, `combien de randonneurs${NB}?`, C.rose, 24));

const lycee = svg("Tableau croisé de 500 lycéens : sport et instrument 60, sport sans instrument 240, instrument sans sport 40, ni l'un ni l'autre 160",
  tableau(20, 60, [150, 110, 110, 70], 56, [["", "instrument", "pas d'instr.", "total"], ["sport", 60, 240, 300], ["pas de sport", 40, 160, 200], ["total", 100, 400, 500]], coul([]), 19) +
    t(240, 330, "sport OU instrument", C.craie, 20) + t(240, 385, `combien de lycéens${NB}?`, C.rose, 24));

const occasion = svg("Un filtre de site de vente : « prix inférieur à 300 € », et le bouton NON pour garder le contraire",
  r(70, 70, 340, 70, C.bleu, 0.12, 3, 12) + t(240, 115, "filtre : prix &lt; 300 €", C.bleu, 26) +
    r(170, 175, 140, 56, C.rose, 0.15, 3, 12) + t(240, 212, "NON", C.rose, 28) +
    l(240, 140, 240, 175, C.craie, 3) + l(240, 231, 240, 268, C.craie, 3) +
    r(110, 268, 260, 56, C.craie, 0, 3, 12) + t(240, 305, "prix … ?", C.craie, 24) +
    t(240, 385, `quel est le filtre contraire${NB}?`, C.rose, 24));

const animaux = (() => {
  const s = `<circle cx="190" cy="185" r="120" fill="${C.bleu}" fill-opacity="0.2" stroke="${C.bleu}" stroke-width="3"/>` +
    `<circle cx="300" cy="185" r="105" fill="${C.jaune}" fill-opacity="0.2" stroke="${C.jaune}" stroke-width="3"/>` +
    t(120, 48, "chien : 150", C.bleu, 20) + t(370, 62, "chat : 110", C.jaune, 20) +
    t(245, 193, "40", C.craie, 26) + t(245, 222, "les deux", C.pale, 15);
  return svg("Deux ensembles qui se chevauchent : 150 foyers avec un chien, 110 avec un chat, 40 avec les deux",
    s + t(240, 385, `combien ont un chien OU un chat${NB}?`, C.rose, 23));
})();

const trajet = (() => {
  const s = r(30, 40, 420, 290, C.craie, 0, 3, 10) + t(50, 70, "30 élèves", C.pale, 18, "start") +
    `<circle cx="190" cy="185" r="110" fill="${C.bleu}" fill-opacity="0.2" stroke="${C.bleu}" stroke-width="3"/>` +
    `<circle cx="300" cy="185" r="95" fill="${C.jaune}" fill-opacity="0.2" stroke="${C.jaune}" stroke-width="3"/>` +
    t(130, 185, "vélo : 18", C.bleu, 20) + t(352, 180, "scooter", C.jaune, 20) + t(352, 208, "12", C.jaune, 20) + t(245, 195, "?", C.rose, 30) +
    t(420, 315, "ni l'un ni l'autre : 5", C.pale, 17, "end");
  return svg("Une classe de 30 élèves : 18 ont un vélo, 12 un scooter, 5 ni l'un ni l'autre ; le nombre d'élèves qui ont les deux est inconnu",
    s + t(240, 385, `combien ont les deux${NB}?`, C.rose, 24));
})();

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "info_filtre_donnees",
  titre: "Énigmes pour filtrer des données",
  description: "Le comparateur de smartphones, le gîte de Mafate à La Réunion, le sport et la musique au lycée, le site de vélos d'occasion, le piège des chiens et des chats du quartier, le défi du vélo et du scooter : filtrer avec ET, OU, NON et retrouver un effectif.",
  problemes: [
    {
      tag: "Énigme 1 · Les smartphones",
      titre: "Un sous-ensemble",
      question: `Un comparateur en ligne liste six smartphones avec leur prix et leur autonomie.<br><br><b>Combien</b> coûtent moins de 300 € ?`,
      reponse: `On parcourt la colonne des prix et on garde ceux sous 300 € : P1 (250 €), P3 (190 €), P6 (280 €).<br>Soit <span class="big">3 smartphones</span>.`,
      consigne: "Prix 250, 480, 190, 320, 600 et 280 € : combien coûtent moins de 300 € ?",
      verification: { type: "courte", attendus: ["3"], unite: "smartphones" },
      dessin: smartphones,
    },
    {
      tag: "Énigme 2 · Le gîte de Mafate",
      titre: "Un filtre avec ET",
      question: `À La Réunion, un gîte du cirque de Mafate, sans route, accueille 200 randonneurs. Ils arrivent à pied par le col des Bœufs ou par la rivière des Galets.<br><br><b>Combien</b> sont arrivés par le col des Bœufs ET restent 2 nuits ?`,
      reponse: `ET : les deux critères à la fois. On lit la case au croisement de la ligne « col des Bœufs » et de la colonne « 2 nuits ».<br><span class="big">50 randonneurs</span>.`,
      consigne: "Ligne « col des Bœufs », colonne « 2 nuits » : combien de randonneurs ?",
      verification: { type: "courte", attendus: ["50"], unite: "randonneurs" },
      dessin: mafate,
    },
    {
      tag: "Énigme 3 · Sport et musique",
      titre: "Un filtre avec OU",
      question: `On interroge 500 lycéens : font-ils du sport ? jouent-ils d'un instrument ?<br><br><b>Combien</b> font du sport OU jouent d'un instrument ?`,
      reponse: `OU : au moins un des deux. On enlève ceux qui n'ont aucun des deux : 500 − 160 = 340.<br>Ou : 300 + 100 − 60 = <span class="big">340 lycéens</span> (les 60 qui font les deux ne comptent qu'une fois).`,
      consigne: "300 sportifs, 100 musiciens, 60 font les deux : combien font du sport OU de la musique ?",
      verification: { type: "qcm", choix: ["400", "340", "60"], bonne: 1 },
      dessin: lycee,
    },
    {
      tag: "Énigme 4 · Les vélos d'occasion",
      titre: "Un filtre avec NON",
      question: `Sur un site de vélos d'occasion, on a filtré « prix &lt; 300 € ». On clique sur NON pour voir les autres vélos.<br><br><b>Quel est</b> le filtre contraire ?`,
      reponse: `Le contraire de « strictement moins de 300 € » garde tous les autres, <b>y compris</b> ceux à 300 € pile.<br><span class="big">prix ≥ 300 €</span>.`,
      consigne: "Quel est le contraire du filtre « prix < 300 € » ?",
      verification: { type: "qcm", choix: ["prix ≥ 300 €", "prix > 300 €", "prix ≤ 300 €"], bonne: 0 },
      dessin: occasion,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Chiens et chats",
      sorte: "piege",
      question: `Dans un quartier, 150 foyers ont un chien, 110 ont un chat, et 40 ont les deux.<br><br><b>Combien de foyers</b> ont un chien OU un chat ?`,
      reponse: `150 + 110 = 260 compte deux fois les 40 foyers qui ont les deux !<br>260 − 40 = <span class="big">220 foyers</span>.`,
      consigne: "150 avec un chien, 110 avec un chat, 40 avec les deux : combien avec un chien OU un chat ?",
      verification: { type: "qcm", choix: ["260 foyers", "110 foyers", "220 foyers"], bonne: 2 },
      dessin: animaux,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le vélo et le scooter",
      sorte: "defi",
      question: `Dans une classe de 30 élèves, 18 ont un vélo, 12 ont un scooter, et 5 n'ont ni l'un ni l'autre.<br><br><b>Combien d'élèves</b> ont les deux ?`,
      reponse: `Vélo OU scooter : 30 − 5 = 25 élèves. Or 18 + 12 = 30 : on a compté deux fois ceux qui ont les deux.<br>30 − 25 = <span class="big">5 élèves</span> ont un vélo ET un scooter.`,
      consigne: "30 élèves, 18 vélos, 12 scooters, 5 sans rien : combien ont les deux ?",
      verification: { type: "courte", attendus: ["5"], unite: "élèves" },
      dessin: trajet,
    },
  ],
};

export default problemes;
