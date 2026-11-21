// Énigmes à projeter — STMG (Tle), sommes : emprunts et placements (l'apprenti
// mécanicien, le soudeur, la sage-femme, le bouquiniste, piège du beatmaker,
// défi de l'aide-soignante). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l } from "../dessins-ecole";

/** Une rangée de cases (en-tête en haut, valeur dedans), une règle jaune et la question. */
const cases = (aria: string, tetes: string[], vals: string[], regle: string, question: string, w = 84, taille = 20) => {
  const x0 = 240 - (tetes.length * w) / 2;
  return svg(aria,
    tetes.map((h, k) => t(x0 + k * w + w / 2, 70, h, C.pale, 18) +
      r(x0 + k * w + 4, 88, w - 8, 70, vals[k] === "?" ? C.rose : C.bleu, 0.12, 3) +
      t(x0 + k * w + w / 2, 132, vals[k], vals[k] === "?" ? C.rose : C.craie, vals[k] === "?" ? 30 : taille)).join("") +
      r(40, 200, 400, 60, C.jaune, 0.12, 3) + t(240, 239, regle, C.craie, 22) +
      t(240, 360, question, C.rose, 27));
};

/** Un contrat de prêt : trois lignes et la question. */
const pret = (aria: string, lignes: string[], question: string) =>
  svg(aria,
    r(70, 40, 340, 230, C.bleu, 0.1, 3, 14) + t(240, 85, "prêt", C.pale, 22) +
    lignes.map((s, k) => t(240, 140 + k * 50, s, C.craie, 25)).join("") +
    t(240, 360, question, C.rose, 27));

const mecanicien = cases("L'apprenti mécanicien : 50 euros le mois 1, 10 euros de plus chaque mois, jusqu'au mois 12 ; quelle question demande une somme ?",
  ["mois 1", "mois 2", "mois 3", "…", "mois 12"], ["50 €", "60 €", "70 €", "…", "160 €"],
  "+ 10 € chaque mois", `une somme${NB}?`);

const soudeur = svg("Le soudeur : 1 000 euros versés à la fin de chaque année à 5 % ; valeur juste après le 3e versement ?",
  [0, 1, 2].map((k) => t(110 + k * 130, 70, `fin année ${k + 1}`, C.pale, 18) +
    r(55 + k * 130, 88, 110, 64, C.bleu, 0.12, 3) + t(110 + k * 130, 129, `+${NB}1${NB}000${NB}€`, C.craie, 21)).join("") +
    l(165, 120, 185, 120, C.craie, 3) + l(295, 120, 315, 120, C.craie, 3) +
    r(40, 200, 400, 60, C.jaune, 0.12, 3) + t(240, 239, "placement à 5 % par an", C.craie, 23) +
    t(240, 360, `après le 3e versement${NB}?`, C.rose, 27));

const sageFemme = pret("La sage-femme : elle emprunte 9 000 euros, rembourse 2 000 euros par an pendant 5 ans ; coût du crédit ?",
  [`emprunt${NB}: 9${NB}000 €`, `annuité${NB}: 2${NB}000 €`, `durée${NB}: 5 ans`], `coût du crédit${NB}?`);

const bouquiniste = pret("Le bouquiniste : il emprunte 10 000 euros à 4 % par an, rembourse 2 500 euros à la fin de l'année 1 ; reste dû ?",
  [`emprunt${NB}: 10${NB}000 €`, `taux${NB}: 4 % par an`, `annuité${NB}: 2${NB}500 €`], `reste dû après 1 an${NB}?`);

const beatmaker = pret("Le beatmaker : il emprunte 20 000 euros, rembourse 4 500 euros par an pendant 5 ans ; coût du crédit ?",
  [`emprunt${NB}: 20${NB}000 €`, `annuité${NB}: 4${NB}500 €`, `durée${NB}: 5 ans`], `coût du crédit${NB}?`);

const aideSoignante = cases("L'aide-soignante : 1 000 euros versés à la fin de chaque année à 10 % ; 1 000, 2 100, 3 310 ; plus de 5 000 euros après combien de versements ?",
  ["1", "2", "3", "4", "5"], [`1${NB}000`, `2${NB}100`, `3${NB}310`, "…", "…"],
  "placement à 10 % par an", `plus de 5${NB}000${NB}€${NB}?`, 84, 19);

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "suite_somme_situations",
  titre: "Énigmes des emprunts et des placements",
  description: "L'apprenti mécanicien, le soudeur, la sage-femme, le bouquiniste, le piège du beatmaker, le défi de l'aide-soignante : reconnaître une somme de termes, calculer la valeur d'un placement à versements réguliers et lire un emprunt à annuités constantes.",
  problemes: [
    {
      tag: "Énigme 1 · L'apprenti mécanicien",
      titre: "Reconnaître une somme",
      question: `Un apprenti mécanicien met 50 € de côté le premier mois.<br>Chaque mois, il met 10 € de plus que le mois d'avant.<br><br><b>Quelle question</b> demande d'additionner les termes ?`,
      reponse: `Le total épargné en 12 mois, c'est la somme des 12 premiers termes.<br>Le 12e mois : 50 + 11 × 10 = 160 €.<br>Total : 12 × (50 + 160) ÷ 2 = <span class="big">1 260 €</span>.`,
      consigne: "Quelle question demande une somme de termes ?",
      verification: { type: "qcm", choix: ["le total épargné en 12 mois", "l'épargne du 12e mois", "l'augmentation chaque mois"], bonne: 0 },
      dessin: mecanicien,
    },
    {
      tag: "Énigme 2 · Le soudeur",
      titre: "Des versements réguliers",
      question: `Un soudeur verse 1 000 € sur un placement à la fin de chaque année.<br>Le placement rapporte 5 % par an (intérêts composés).<br><br><b>Combien a-t-il</b> juste après le 3e versement ?`,
      reponse: `1er versement : 1 000 × 1,05² = 1 102,50 €. 2e : 1 000 × 1,05 = 1 050 €. 3e : 1 000 €.<br>1 102,50 + 1 050 + 1 000 = <span class="big">3 152,50 €</span>.<br>Formule : 1 000 × (1,05³ − 1) ÷ 0,05 = 3 152,50.`,
      consigne: "Combien a-t-il juste après le 3e versement ?",
      verification: { type: "qcm", choix: ["3 000 €", "3 152,50 €", "3 157,63 €"], bonne: 1 },
      dessin: soudeur,
    },
    {
      tag: "Énigme 3 · La sage-femme",
      titre: "Le coût d'un crédit",
      question: `Une sage-femme emprunte 9 000 € pour acheter une voiture.<br>Elle rembourse 2 000 € par an pendant 5 ans.<br><br><b>Combien lui coûte</b> le crédit ?`,
      reponse: `Elle rembourse en tout 5 × 2 000 = 10 000 €.<br>Coût du crédit : 10 000 − 9 000 = <span class="big">1 000 €</span> d'intérêts.`,
      consigne: "Combien coûte le crédit, en euros ?",
      verification: { type: "courte", attendus: ["1000", "1 000", "1000 €", "1 000 €"] },
      dessin: sageFemme,
    },
    {
      tag: "Énigme 4 · Le bouquiniste",
      titre: "Ce qui reste à rembourser",
      question: `Un bouquiniste emprunte 10 000 € à 4 % par an.<br>À la fin de la première année, il rembourse 2 500 €.<br><br><b>Combien doit-il encore</b> ?`,
      reponse: `Avec les intérêts, la dette passe à 10 000 × 1,04 = 10 400 €.<br>Il rembourse 2 500 € : 10 400 − 2 500 = <span class="big">7 900 €</span>.`,
      consigne: "Combien doit-il encore après un an ?",
      verification: { type: "qcm", choix: ["7 500 €", "10 400 €", "7 900 €"], bonne: 2 },
      dessin: bouquiniste,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le beatmaker",
      sorte: "piege",
      question: `Un beatmaker emprunte 20 000 € pour son studio.<br>Il rembourse 4 500 € par an pendant 5 ans.<br>Il dit : « 4 500 − 4 000 = 500, le crédit me coûte 500 € ».<br><br><b>Combien coûte</b> vraiment le crédit ?`,
      reponse: `500 €, c'est le surcoût d'une seule année.<br>Il rembourse en tout 5 × 4 500 = 22 500 €.<br>Coût du crédit : 22 500 − 20 000 = <span class="big">2 500 €</span>.`,
      consigne: "Combien coûte le crédit, en euros ?",
      verification: { type: "courte", attendus: ["2500", "2 500", "2500 €", "2 500 €"] },
      dessin: beatmaker,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "L'aide-soignante",
      sorte: "defi",
      question: `Une aide-soignante verse 1 000 € à la fin de chaque année sur un placement à 10 %.<br>Juste après chaque versement, elle a : 1 000 €, puis 2 100 €, puis 3 310 €…<br><br><b>Après combien de versements</b> a-t-elle plus de 5 000 € ?`,
      reponse: `Chaque année : on multiplie par 1,1 puis on ajoute 1 000.<br>3 310 × 1,1 + 1 000 = 4 641 €. Puis 4 641 × 1,1 + 1 000 = 6 105,10 €.<br>Plus de 5 000 € après <span class="big">5 versements</span>.`,
      consigne: "Après combien de versements ?",
      verification: { type: "courte", attendus: ["5", "5 versements"] },
      dessin: aideSoignante,
    },
  ],
};

export default problemes;
