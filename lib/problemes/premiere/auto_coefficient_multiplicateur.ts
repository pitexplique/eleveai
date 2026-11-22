// Énigmes à projeter — première (sans spé maths), notion
// auto_coefficient_multiplicateur (le loyer + 5 %, la voiture − 12 %, le
// pourboire à New York, l'abonnement de la salle de jeux, piège de la console
// soldée à − 20 %, défi de la TVA cachée dans le prix). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, fleche, p, o } from "../dessins-ecole";

/** Deux boîtes reliées par une flèche « × coefficient ». */
const passage = (label: string, a: string, b: string, coef: string, question: string, ca: string = C.bleu, cb: string = C.jaune) =>
  svg(label,
    r(30, 110, 150, 90, ca, 0.15, 3, 12) + t(105, 167, a, C.craie, 26) +
      r(300, 110, 150, 90, cb, 0.15, 3, 12) + t(375, 167, b, C.craie, 26) +
      fleche(190, 155, 290, 155, C.rose, 4) + t(240, 135, coef, C.rose, 22) +
      t(240, 385, question, C.rose, 26));

const loyer = passage("Un loyer de 640 euros augmente de 5 % : multiplié par quoi ?", "640 €", "?", "+ 5 %", `quel coefficient${NB}?`);
const voiture = passage("Une voiture perd 12 % de sa valeur : multipliée par quoi ?", "valeur", "?", "− 12 %", `quel coefficient${NB}?`);

const pourboire = svg("Une note de restaurant de 80 dollars avec 15 % de pourboire",
  p("M150 50 H330 V330 L310 315 L290 330 L270 315 L250 330 L230 315 L210 330 L190 315 L170 330 L150 315 Z", C.craie, 3, 0.05) +
    t(240, 100, "New York", C.pale, 20) + t(170, 160, "repas", C.craie, 20, "start") + t(310, 160, "80 $", C.craie, 20, "end") +
    t(162, 210, "pourboire", C.craie, 18, "start") + t(322, 210, "+ 15 %", C.rose, 18, "end") + t(170, 270, "total", C.craie, 22, "start") + t(310, 270, "?", C.rose, 26, "end") +
    t(240, 390, `le total${NB}?`, C.rose, 28));

const abonnement = passage("Après une hausse de 25 %, l'abonnement coûte 50 euros ; combien coûtait-il avant ?", "?", "50 €", "+ 25 %", `le prix d'avant${NB}?`);

const consoleJeu = svg("Une console soldée à moins 20 % coûte 64 euros ; on remonte de 20 % : faux",
  r(140, 70, 200, 110, C.bleu, 0.2, 4, 20) + o(190, 125, 16, C.craie, 0, 3) + r(270, 113, 30, 24, C.craie, 0, 3, 4) +
    t(240, 220, "− 20 % : 64 €", C.craie, 24) + t(240, 270, "64 × 1,20 = 76,80 € ?", C.pale, 22) +
    t(240, 385, `le vrai prix de départ${NB}?`, C.rose, 26));

const tva = svg("Un prix de 90 euros toutes taxes comprises, dont 20 % de TVA calculée sur le prix hors taxe",
  r(40, 120, 300, 70, C.bleu, 0.25, 3) + r(340, 120, 60, 70, C.rose, 0.35, 3) +
    t(190, 162, "prix HT", C.craie, 22) + t(370, 162, "TVA", C.craie, 16) + t(370, 220, "20 % du HT", C.rose, 16) +
    t(220, 100, "TTC = 90 €", C.craie, 24) + t(240, 385, `le montant de la TVA${NB}?`, C.rose, 26));

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "auto_coefficient_multiplicateur",
  titre: "Énigmes du coefficient multiplicateur",
  description: "Le loyer qui monte, la voiture qui perd de la valeur, le pourboire à New York, l'abonnement, le piège de la console soldée, le défi de la TVA : traduire un pourcentage par un coefficient, calculer une valeur finale, retrouver une valeur initiale.",
  problemes: [
    {
      tag: "Énigme 1 · Le loyer",
      titre: "Une hausse en multiplication",
      question: `Le loyer d'un appartement augmente de <b>5 %</b>.<br><br><b>Par quel nombre</b> est-il multiplié ?`,
      reponse: `Augmenter de 5 %, c'est garder 100 % et ajouter 5 % : 1 + 0,05.<br>Le loyer est multiplié par <span class="big">1,05</span>. 640 € deviennent 672 €.`,
      consigne: "Une hausse de 5 % : par quel coefficient multiplie-t-on ?",
      verification: { type: "qcm", choix: ["× 0,05", "× 1,5", "× 1,05"], bonne: 2 },
      dessin: loyer,
    },
    {
      tag: "Énigme 2 · La voiture",
      titre: "Une baisse en multiplication",
      question: `En un an, une voiture perd <b>12 %</b> de sa valeur.<br><br><b>Par quel nombre</b> sa valeur est-elle multipliée ?`,
      reponse: `Il reste 100 % − 12 % = 88 % de la valeur.<br>Le coefficient est <span class="big">0,88</span>.`,
      consigne: "Une baisse de 12 % : par quel coefficient multiplie-t-on ?",
      verification: { type: "qcm", choix: ["× 0,88", "× 1,12", "× 0,12"], bonne: 0 },
      dessin: voiture,
    },
    {
      tag: "Énigme 3 · Le pourboire",
      titre: "La valeur finale",
      question: `À New York, on laisse souvent <b>15 %</b> de pourboire. Le repas coûte <b>80 $</b>.<br><br><b>Combien paie-t-on</b> en tout ?`,
      reponse: `+ 15 % : coefficient 1,15.<br>80 × 1,15 = <span class="big">92 $</span>.`,
      consigne: "80 $ plus 15 % de pourboire : combien en tout ?",
      verification: { type: "courte", attendus: ["92"], unite: "$" },
      dessin: pourboire,
    },
    {
      tag: "Énigme 4 · L'abonnement",
      titre: "La valeur de départ",
      question: `Après une hausse de <b>25 %</b>, l'abonnement d'une salle de jeux coûte <b>50 €</b> par mois.<br><br><b>Combien coûtait-il</b> avant ?`,
      reponse: `Avant × 1,25 = 50, donc avant = 50 ÷ 1,25 = <span class="big">40 €</span>.<br>Vérification : 40 × 1,25 = 50.`,
      consigne: "Après + 25 %, l'abonnement coûte 50 € : combien coûtait-il avant ?",
      verification: { type: "qcm", choix: ["37,50 €", "40 €", "62,50 €"], bonne: 1 },
      dessin: abonnement,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La console soldée",
      sorte: "piege",
      question: `Soldée à <b>− 20 %</b>, une console coûte <b>64 €</b>.<br>Malik dit : « avant, elle coûtait 64 + 20 % = 76,80 € ».<br><br><b>Quel était le vrai prix</b> ?`,
      reponse: `Les 20 % portent sur le prix de départ, pas sur 64 € !<br>Départ × 0,80 = 64, donc départ = 64 ÷ 0,80 = <span class="big">80 €</span>.`,
      consigne: "Après − 20 %, la console coûte 64 € : quel était son prix ?",
      verification: { type: "courte", attendus: ["80"], unite: "€" },
      dessin: consoleJeu,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La TVA cachée",
      sorte: "defi",
      question: `Un casque audio coûte <b>90 €</b> TTC. La TVA est de <b>20 %</b> du prix hors taxe.<br><br><b>Combien d'euros de TVA</b> y a-t-il dans ce prix ?`,
      reponse: `HT × 1,20 = 90, donc HT = 90 ÷ 1,20 = 75 €.<br>TVA = 90 − 75 = <span class="big">15 €</span>. Pas 20 % de 90 = 18 € !`,
      consigne: "90 € TTC avec 20 % de TVA sur le prix HT : combien d'euros de TVA ?",
      verification: { type: "courte", attendus: ["15"], unite: "€" },
      dessin: tva,
    },
  ],
};

export default problemes;
