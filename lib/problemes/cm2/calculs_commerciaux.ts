// Énigmes à projeter — CM2, notion calculs_commerciaux (Belgique, Sénégal,
// Côte d'Ivoire ; micros masquées en France) : la facture de la papeterie, le
// bénéfice du ballon, les mangues au marché de Dakar en francs CFA, l'intérêt
// d'un an, le piège de la perte, le défi des pommes achetées 4 pour 1 €.
// 20/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, fleche } from "../dessins-ecole";

const facture = svg(
  "Une facture : 3 cahiers à 2,50 € et 2 stylos à 1,20 €",
  r(80, 40, 320, 320, C.craie, 0.04, 3, 4) + t(240, 80, "FACTURE", C.pale, 24) +
    t(100, 140, "3 cahiers × 2,50 €", C.craie, 22, "start") + t(380, 140, "… €", C.craie, 22, "end") +
    t(100, 190, "2 stylos × 1,20 €", C.craie, 22, "start") + t(380, 190, "… €", C.craie, 22, "end") +
    l(100, 230, 380, 230, C.pale, 2, "6 5") + t(100, 280, "TOTAL", C.rose, 24, "start") + t(380, 280, "? €", C.rose, 26, "end")
);

const ballon = svg(
  "Un ballon acheté 12 € et revendu 18 €",
  t(240, 170, "⚽", C.craie, 90) + r(40, 230, 160, 70, C.bleu, 0.15, 3, 8) + t(120, 260, "achat", C.pale, 18) + t(120, 288, "12 €", C.craie, 26) +
    fleche(210, 265, 270, 265, C.craie, 3) + r(280, 230, 160, 70, C.jaune, 0.2, 3, 8) + t(360, 260, "vente", C.pale, 18) + t(360, 288, "18 €", C.craie, 26) +
    t(240, 370, `bénéfice${NB}?`, C.rose, 28)
);

const dakar = svg(
  "Au marché de Dakar : 50 mangues achetées 5 000 FCFA, revendues 150 FCFA l'une",
  t(240, 120, "🥭 🥭 🥭 🥭 🥭", C.craie, 46) + t(240, 180, "× 10", C.pale, 24) +
    t(240, 240, `achat${NB}: 50 mangues pour 5${NB}000 FCFA`, C.craie, 22) + t(240, 280, `vente${NB}: 150 FCFA la mangue`, C.craie, 22) + t(240, 360, `bénéfice${NB}?`, C.rose, 28)
);

const banque = svg(
  "200 € placés à 5 % par an",
  r(120, 90, 240, 150, C.jaune, 0.15, 4, 12) + t(240, 150, "🏦 200 €", C.craie, 34) + t(240, 205, "5 % par an", C.craie, 24) + t(240, 320, `intérêts après 1 an${NB}?`, C.rose, 26)
);

const velo = svg(
  "Un vélo acheté 30 € et revendu 25 €",
  t(240, 170, "🚲", C.craie, 90) + r(40, 230, 160, 70, C.bleu, 0.15, 3, 8) + t(120, 260, "achat", C.pale, 18) + t(120, 288, "30 €", C.craie, 26) +
    fleche(210, 265, 270, 265, C.craie, 3) + r(280, 230, 160, 70, C.rose, 0.2, 3, 8) + t(360, 260, "vente", C.pale, 18) + t(360, 288, "25 €", C.craie, 26) +
    t(240, 370, `«${NB}je gagne 5 €${NB}», dit Bob`, C.craie, 22)
);

const pommes = svg(
  "Un marchand achète 4 pommes pour 1 € et vend 3 pommes pour 1 €",
  t(240, 90, "achat : 🍎🍎🍎🍎 = 1 €", C.bleu, 28).replace(" :", `${NB}:`) + t(240, 170, "vente : 🍎🍎🍎 = 1 €", C.jaune, 28).replace(" :", `${NB}:`) +
    t(240, 270, "pour gagner 10 €", C.craie, 26) + t(240, 320, `combien de pommes vendues${NB}?`, C.rose, 24)
);

const problemes: ProblemesNotion = {
  classe: "cm2",
  notionId: "calculs_commerciaux",
  titre: "Énigmes : prix, bénéfices, intérêts et factures",
  description: "La facture de la papeterie, le bénéfice du ballon, les mangues du marché de Dakar, l'intérêt d'une année, le piège du vélo revendu, le défi des pommes du marchand.",
  problemes: [
    {
      tag: "Énigme 1 · À la papeterie",
      titre: "La facture",
      question: `Sur la facture : <b>3 cahiers</b> à <b>2,50 €</b> et <b>2 stylos</b> à <b>1,20 €</b>.<br><br><b>Quel est le total</b> ?`,
      reponse: `Cahiers : 3 × 2,50 = 7,50 €. Stylos : 2 × 1,20 = 2,40 €.<br>7,50 + 2,40 = <span class="big">9,90 €</span>.`,
      consigne: "Quel est le total de la facture ?",
      verification: { type: "courte", attendus: ["9,90", "9,9", "9.90", "9.9"], unite: "€" },
      dessin: facture,
    },
    {
      tag: "Énigme 2 · Au magasin de sport",
      titre: "Le bénéfice du ballon",
      question: `Un marchand achète un ballon <b>12 €</b>.<br>Il le revend <b>18 €</b>.<br><br>Quel est son <b>bénéfice</b> ?`,
      reponse: `Bénéfice = prix de vente − prix d'achat.<br>18 − 12 = <span class="big">6 €</span>.`,
      consigne: "Quel est le bénéfice du marchand ?",
      verification: { type: "courte", attendus: ["6"], unite: "€" },
      dessin: ballon,
    },
    {
      tag: "Énigme 3 · Au marché de Dakar",
      titre: "Les mangues",
      question: `Awa achète <b>50 mangues</b> pour <b>5 000 FCFA</b>.<br>Elle revend chaque mangue <b>150 FCFA</b>.<br>Elle vend toutes ses mangues.<br><br>Quel est son <b>bénéfice</b> ?`,
      reponse: `Vente : 50 × 150 = 7 500 FCFA.<br>Bénéfice : 7 500 − 5 000 = <span class="big">2 500 FCFA</span>.`,
      consigne: "Quel est le bénéfice d'Awa, en FCFA ?",
      verification: { type: "courte", attendus: ["2500"], unite: "FCFA" },
      dessin: dakar,
    },
    {
      tag: "Énigme 4 · À la banque",
      titre: "Les intérêts",
      question: `Lucie place <b>200 €</b> à la banque.<br>La banque donne <b>5 % par an</b>.<br><br>Combien d'<b>intérêts</b> reçoit-elle après 1 an ?`,
      reponse: `5 %, c'est 5 € pour 100 €.<br>Pour 200 € : 2 × 5 = <span class="big">10 €</span>.<br>Elle a alors 210 €.`,
      consigne: "Combien d'intérêts après 1 an ?",
      verification: { type: "qcm", choix: ["10 €", "5 €", "205 €"], bonne: 0 },
      dessin: banque,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le vélo de Bob",
      sorte: "piege",
      question: `Bob achète un vieux vélo <b>30 €</b>.<br>Il le revend <b>25 €</b>.<br>Il dit : « 30 − 25 = 5, je gagne 5 €. »<br><br><b>A-t-il raison</b> ?`,
      reponse: `Non ! Il revend <b>moins cher</b> qu'il n'a acheté.<br>Il ne gagne pas : <span class="big">il perd 5 €</span>.`,
      consigne: "Que se passe-t-il pour Bob ?",
      verification: { type: "qcm", choix: ["Il gagne 5 €", "Il perd 5 €", "Il ne gagne ni ne perd"], bonne: 1 },
      dessin: velo,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les pommes du marchand",
      sorte: "defi",
      question: `Un marchand achète ses pommes <b>4 pour 1 €</b>.<br>Il les vend <b>3 pour 1 €</b>.<br><br>Combien de pommes doit-il vendre pour gagner <b>10 €</b> ?`,
      reponse: `Prenons 12 pommes : achat 12 ÷ 4 = 3 €, vente 12 ÷ 3 = 4 €.<br>Il gagne 1 € toutes les 12 pommes.<br>Pour 10 € : 10 × 12 = <span class="big">120 pommes</span>.`,
      consigne: "Combien de pommes pour gagner 10 € ?",
      verification: { type: "courte", attendus: ["120"], unite: "pommes" },
      dessin: pommes,
    },
  ],
};

export default problemes;
