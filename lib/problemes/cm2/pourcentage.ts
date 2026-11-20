// Énigmes à projeter — CM2, notion pourcentage (50 % = la moitié, 25 % = le
// quart, 10 % = le dixième, lire 75 % sur 100 carreaux, le piège « 25 % = 25 € »,
// le défi + 10 % puis − 10 %). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, grille, bande } from "../dessins-ecole";

const jean = svg(
  "Un jean à 40 €, soldé à moins 50 %",
  t(150, 200, "👖", C.craie, 120) + r(270, 110, 170, 90, C.rose, 0.2, 4, 10) + t(355, 170, "− 50 %", C.rose, 40) +
    t(355, 250, "avant : 40 €", C.craie, 24) + t(355, 300, `après${NB}: ? €`, C.rose, 26)
);

const chiens = svg(
  "Une classe de 20 élèves en 4 groupes de 5 : 25 % ont un chien",
  bande(40, 150, 400, 80, 4, 1, C.jaune) + t(90, 200, "🐶", C.craie, 34) + t(240, 120, "20 élèves", C.craie, 28) +
    t(240, 300, "25 % ont un chien", C.craie, 28) + t(240, 360, `Combien d'élèves${NB}?`, C.rose, 26)
);

const velo = svg(
  "Un vélo à 350 € avec une remise de 10 %",
  t(150, 210, "🚲", C.craie, 120) + r(280, 110, 160, 80, C.bleu, 0.2, 4, 10) + t(360, 162, "350 €", C.craie, 34) +
    t(360, 250, "remise 10 %", C.rose, 26) + t(360, 300, "= ? €", C.rose, 28)
);

// 100 carreaux de 26 px, 75 coloriés.
const carreaux = () => {
  let s = "";
  for (let k = 0; k < 75; k++) s += r(110 + (k % 10) * 26, 40 + Math.floor(k / 10) * 26, 26, 26, C.bleu, 0.45, 0);
  return svg("Un carré de 100 carreaux, dont 75 sont coloriés", s + grille(110, 40, 10, 10, 26, C.craie, 1.5) + t(240, 350, "100 carreaux", C.pale, 22) + t(240, 395, `Quel pourcentage est colorié${NB}?`, C.rose, 24));
};

const jeu = svg(
  "Un jeu à 80 € soldé à moins 25 % ; Sam pense payer 55 €",
  t(130, 190, "🎲", C.craie, 100) + r(260, 100, 170, 90, C.rose, 0.2, 4, 10) + t(345, 160, "− 25 %", C.rose, 40) +
    t(345, 240, "prix : 80 €", C.craie, 24) + t(240, 330, `«${NB}je paierai 55 €${NB}»`, C.craie, 26) + t(240, 370, "dit Sam", C.pale, 20)
);

const montagnes = svg(
  "Un prix de 100 € qui monte de 10 %, puis baisse de 10 %",
  r(40, 170, 100, 60, C.bleu, 0.2, 4, 8) + t(90, 210, "100 €", C.craie, 26) + t(170, 150, "+ 10 %", C.jaune, 22) +
    r(190, 110, 100, 60, C.jaune, 0.2, 4, 8) + t(240, 150, "? €", C.craie, 26) + t(320, 150, "− 10 %", C.rose, 22) +
    r(340, 170, 100, 60, C.rose, 0.2, 4, 8) + t(390, 210, "? €", C.rose, 28) + t(240, 320, "revient-on à 100 € ?", C.pale, 24).replace(" ?", `${NB}?`)
);

const problemes: ProblemesNotion = {
  classe: "cm2",
  notionId: "pourcentage",
  titre: "Énigmes sur les pourcentages",
  description: "Le jean à moins 50 %, les chiens de la classe, la remise du vélo, les 100 carreaux, le piège du jeu de Sam, le défi du prix qui monte puis descend.",
  problemes: [
    {
      tag: "Énigme 1 · Les soldes",
      titre: "Le jean à moins 50 %",
      question: `Un jean coûte <b>40 €</b>.<br>Il est soldé à <b>− 50 %</b>.<br><br><b>Quel est son nouveau prix</b> ?`,
      reponse: `50 %, c'est la moitié : 50 sur 100.<br>La moitié de 40 €, c'est 20 €.<br>Le jean coûte <span class="big">20 €</span>.`,
      consigne: "Quel est le nouveau prix du jean ?",
      verification: { type: "courte", attendus: ["20"], unite: "€" },
      dessin: jean,
    },
    {
      tag: "Énigme 2 · En classe",
      titre: "Les élèves qui ont un chien",
      question: `Une classe a <b>20 élèves</b>.<br><b>25 %</b> des élèves ont un chien.<br><br><b>Combien d'élèves</b> ont un chien ?`,
      reponse: `25 %, c'est le quart.<br>20 ÷ 4 = <span class="big">5 élèves</span>.`,
      consigne: "Combien d'élèves ont un chien ?",
      verification: { type: "courte", attendus: ["5"], unite: "élèves" },
      dessin: chiens,
    },
    {
      tag: "Énigme 3 · Au magasin de sport",
      titre: "La remise du vélo",
      question: `Un vélo coûte <b>350 €</b>.<br>Le vendeur fait une remise de <b>10 %</b>.<br><br><b>Combien d'euros</b> de remise ?`,
      reponse: `10 %, c'est le dixième : on divise par 10.<br>350 ÷ 10 = <span class="big">35 €</span> de remise.<br>Le vélo coûte alors 315 €.`,
      consigne: "Combien d'euros de remise ?",
      verification: { type: "courte", attendus: ["35"], unite: "€" },
      dessin: velo,
    },
    {
      tag: "Énigme 4 · Le carré coloré",
      titre: "Les 100 carreaux",
      question: `Un grand carré a <b>100 carreaux</b>.<br><b>75 carreaux</b> sont coloriés.<br><br><b>Quel pourcentage</b> du carré est colorié ?`,
      reponse: `« Pour cent », c'est « sur 100 ».<br>75 carreaux sur 100 : <span class="big">75 %</span>.<br>C'est aussi les trois quarts.`,
      consigne: "Quel pourcentage du carré est colorié ?",
      verification: { type: "qcm", choix: ["25 %", "7,5 %", "75 %"], bonne: 2 },
      dessin: carreaux(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le jeu de Sam",
      sorte: "piege",
      question: `Un jeu coûte <b>80 €</b>. Il est soldé à <b>− 25 %</b>.<br>Sam dit : « 80 − 25 = 55. Je paierai 55 €. »<br><br><b>Combien va-t-il payer</b> ?`,
      reponse: `Non ! 25 %, ce n'est pas 25 €. C'est le quart du prix.<br>80 ÷ 4 = 20 € de remise.<br>80 − 20 = <span class="big">60 €</span>.`,
      consigne: "Combien Sam va-t-il payer ?",
      verification: { type: "qcm", choix: ["55 €", "60 €", "20 €"], bonne: 1 },
      dessin: jeu,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Monter puis descendre",
      sorte: "defi",
      question: `Un objet coûte <b>100 €</b>.<br>Son prix monte de <b>10 %</b>. Puis le nouveau prix baisse de <b>10 %</b>.<br><br><b>Quel est le prix final</b> ?`,
      reponse: `+ 10 % de 100 € : 100 + 10 = 110 €.<br>− 10 % de 110 € : 110 − 11 = <span class="big">99 €</span>.<br>On ne revient pas à 100 € !`,
      consigne: "Quel est le prix final ?",
      verification: { type: "courte", attendus: ["99"], unite: "€" },
      dessin: montagnes,
    },
  ],
};

export default problemes;
