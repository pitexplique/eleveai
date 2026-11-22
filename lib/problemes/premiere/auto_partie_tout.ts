// Énigmes à projeter — première (sans spé maths), notion auto_partie_tout (le
// marathon à 30 %, la batterie du téléphone, la danse au lycée, la ristourne,
// piège du vélo électrique 30 % de 20 %, défi du salaire du job d'été).
// 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, o } from "../dessins-ecole";

const marathon = svg("Le parcours du marathon : 42 kilomètres, un coureur à 30 %",
  l(40, 180, 440, 180, C.craie, 6) + r(40, 172, 120, 16, C.bleu, 0.6, 0) + o(160, 180, 12, C.rose, 1, 0) +
    t(40, 150, "départ", C.pale, 18, "start") + t(440, 150, "arrivée", C.pale, 18, "end") + t(240, 230, "42 km", C.craie, 24) +
    t(160, 130, "30 %", C.bleu, 24) + t(240, 380, `combien de km parcourus${NB}?`, C.rose, 24));

const batterie = svg("Une batterie de téléphone à 18 % qui contient 900 milliampères-heure",
  r(150, 60, 180, 280, C.craie, 0, 5, 18) + r(210, 40, 60, 20, C.craie, 0.2, 4, 4) + r(160, 285, 160, 45, C.rose, 0.4, 0, 6) +
    t(240, 315, "18 %", C.craie, 22) + t(240, 260, "= 900 mAh", C.rose, 22) + t(240, 180, "100 % = ?", C.pale, 26) +
    t(240, 395, `la capacité totale${NB}?`, C.rose, 26));

const danse = svg("Un carré de 100 élèves : 40 % font du sport, et parmi eux 25 % font de la danse",
  r(90, 50, 300, 300, C.craie, 0, 3) + r(90, 50, 120, 300, C.bleu, 0.2, 3) + r(90, 50, 120, 75, C.rose, 0.4, 3) +
    t(150, 100, "danse", C.craie, 18) + t(150, 240, "sport", C.bleu, 20) + t(150, 270, "40 %", C.bleu, 20) + t(300, 210, "les autres", C.pale, 20) +
    t(240, 395, `quelle part du lycée${NB}?`, C.rose, 26));

const ristourne = svg("Une ristourne de 12 euros, qui représente 15 % du prix",
  r(60, 100, 360, 70, C.jaune, 0.15, 3, 8) + r(60, 100, 54, 70, C.rose, 0.4, 3, 8) +
    t(87, 145, "15 %", C.craie, 16) + t(87, 200, "12 €", C.rose, 22) + t(240, 240, "prix total = ?", C.craie, 24) +
    t(240, 385, `le prix avant ristourne${NB}?`, C.rose, 24));

const velo = svg("Dans la ville, 20 % des habitants ont un vélo électrique ; 30 % d'entre eux vont au travail avec",
  r(40, 60, 400, 100, C.craie, 0, 3) + r(40, 60, 80, 100, C.bleu, 0.25, 3) + r(40, 60, 24, 100, C.rose, 0.5, 3) +
    t(240, 190, "20 % des habitants, puis 30 % d'entre eux", C.craie, 18) +
    t(240, 260, "20 % + 30 % = 50 % ?", C.pale, 24) + t(240, 385, `la vraie part${NB}?`, C.rose, 28));

const salaire = svg("Le salaire du job d'été : 35 % pour l'ordinateur, 25 % pour le vélo, le reste fait 480 euros",
  r(40, 120, 140, 70, C.bleu, 0.35, 3) + r(180, 120, 100, 70, C.jaune, 0.35, 3) + r(280, 120, 160, 70, C.rose, 0.3, 3) +
    t(110, 162, "35 %", C.craie, 20) + t(230, 162, "25 %", C.craie, 20) + t(360, 162, "480 €", C.craie, 22) +
    t(110, 225, "ordinateur", C.bleu, 18) + t(230, 225, "vélo", C.jaune, 18) + t(360, 225, "reste", C.rose, 18) +
    t(240, 385, `le salaire${NB}?`, C.rose, 28));

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "auto_partie_tout",
  titre: "Énigmes de la partie et du tout",
  description: "Le marathon à 30 %, la batterie du téléphone, la danse au lycée, la ristourne, le piège du vélo électrique, le défi du job d'été : calculer une partie, retrouver le tout, prendre un pourcentage d'un pourcentage.",
  problemes: [
    {
      tag: "Énigme 1 · Le marathon",
      titre: "La partie connaissant le tout",
      question: `Un marathon fait environ <b>42 km</b>. Une coureuse a parcouru <b>30 %</b> du trajet.<br><br><b>Combien de km</b> a-t-elle parcourus ?`,
      reponse: `Partie = proportion × tout : 0,30 × 42 = <span class="big">12,6 km</span>.`,
      consigne: "30 % de 42 km : combien de km ?",
      verification: { type: "courte", attendus: ["12,6"], unite: "km" },
      dessin: marathon,
    },
    {
      tag: "Énigme 2 · La batterie",
      titre: "Le tout connaissant la partie",
      question: `La batterie d'un téléphone est à <b>18 %</b>. Il lui reste <b>900 mAh</b>.<br><br><b>Quelle est la capacité</b> de la batterie pleine ?`,
      reponse: `Tout = partie ÷ proportion : 900 ÷ 0,18 = <span class="big">5 000 mAh</span>.<br>Vérification : 18 % de 5 000 = 900.`,
      consigne: "18 % de la batterie = 900 mAh : quelle est la capacité totale ?",
      verification: { type: "qcm", choix: ["5 000 mAh", "162 mAh", "1 800 mAh"], bonne: 0 },
      dessin: batterie,
    },
    {
      tag: "Énigme 3 · La danse",
      titre: "Un pourcentage d'un pourcentage",
      question: `Dans un lycée, <b>40 %</b> des élèves font du sport en club. Parmi eux, <b>25 %</b> font de la danse.<br><br><b>Quel pourcentage</b> des élèves du lycée font de la danse en club ?`,
      reponse: `25 % de 40 % : 0,25 × 0,40 = 0,10 = <span class="big">10 %</span>.<br>Sur 100 élèves : 40 font du sport, et 10 d'entre eux de la danse.`,
      consigne: "25 % de 40 % des élèves : quel pourcentage du lycée ?",
      verification: { type: "qcm", choix: ["65 %", "10 %", "15 %"], bonne: 1 },
      dessin: danse,
    },
    {
      tag: "Énigme 4 · La ristourne",
      titre: "Retrouver le prix",
      question: `Un magasin de sport fait une ristourne de <b>12 €</b> sur une paire de chaussures. C'est <b>15 %</b> du prix.<br><br><b>Quel était le prix</b> avant la ristourne ?`,
      reponse: `12 ÷ 0,15 = <span class="big">80 €</span>.<br>Vérification : 15 % de 80 = 12.`,
      consigne: "12 € = 15 % du prix : quel était le prix ?",
      verification: { type: "courte", attendus: ["80"], unite: "€" },
      dessin: ristourne,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le vélo électrique",
      sorte: "piege",
      question: `Dans une ville, <b>20 %</b> des habitants ont un vélo électrique. <b>30 %</b> d'entre eux vont au travail avec.<br><br><b>Quel pourcentage des habitants</b> va au travail en vélo électrique ?`,
      reponse: `On n'additionne pas : on prend 30 % <b>de</b> 20 %.<br>0,30 × 0,20 = 0,06 = <span class="big">6 %</span> des habitants.`,
      consigne: "30 % de 20 % des habitants : quel pourcentage des habitants ?",
      verification: { type: "qcm", choix: ["50 %", "10 %", "6 %"], bonne: 2 },
      dessin: velo,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le job d'été",
      sorte: "defi",
      question: `Avec le salaire de son job d'été, Rayan dépense <b>35 %</b> pour un ordinateur et <b>25 %</b> pour un vélo. Il lui reste <b>480 €</b>.<br><br><b>Combien a-t-il gagné</b> ?`,
      reponse: `Il a dépensé 35 % + 25 % = 60 % : il reste 40 %.<br>40 % = 480 €, donc le tout vaut 480 ÷ 0,40 = <span class="big">1 200 €</span>.`,
      consigne: "Il dépense 35 % puis 25 % de son salaire et il reste 480 € : combien a-t-il gagné ?",
      verification: { type: "courte", attendus: ["1200"], unite: "€" },
      dessin: salaire,
    },
  ],
};

export default problemes;
