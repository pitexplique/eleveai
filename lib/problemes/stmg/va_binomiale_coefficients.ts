// Énigmes à projeter — STMG (Tle), coefficients binomiaux et triangle de
// Pascal (le sommelier, le télévendeur, le courtier en assurances, les
// chouchous de Salazie, piège du vendeur de vérandas, défi du
// commissaire-priseur). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r } from "../dessins-ecole";

/** Une carte : trois lignes (la première en grand) et la question. */
const carte = (aria: string, lignes: string[], question: string, coul: string = C.bleu) =>
  svg(aria,
    r(50, 40, 380, 240, coul, 0.1, 3, 14) +
    lignes.map((s, k) => t(240, 105 + k * 70, s, k ? C.pale : C.craie, k ? 24 : 32)).join("") +
    t(240, 365, question, C.rose, 28));

const sommelier = carte("Le sommelier : 4 vins goûtés, chemins avec un seul vin reconnu",
  ["4 vins goûtés", "S = vin reconnu", "chemins avec 1 seul S"], `combien${NB}?`);

/** Le triangle de Pascal jusqu'à la ligne n = 5, deux cases à trouver. */
const lignesPascal: (number | string)[][] = [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1], [1, 5, "?", "…", 5, 1]];
const televendeur = svg("Le triangle de Pascal des lignes 0 à 5 ; dans la ligne 5, la troisième case est à trouver",
  lignesPascal.map((ligne, n) =>
    t(16, 62 + n * 50, `n${NB}=${NB}${n}`, C.pale, 18, "start") +
    ligne.map((v, k) => {
      const x = 240 + (k - n / 2) * 58;
      return t(x, 62 + n * 50, String(v), v === "?" ? C.rose : n === 5 ? C.jaune : C.craie, 26);
    }).join("")).join("") +
  t(240, 390, `2 parmi 5${NB}=${NB}?`, C.rose, 28));

const courtier = carte("Le courtier : 2 parmi 6 égale 15, 3 parmi 6 égale 20, 3 parmi 7 à trouver",
  ["2 parmi 6 = 15", "3 parmi 6 = 20", "formule de Pascal"], `3 parmi 7${NB}=${NB}?`, C.jaune);

const chouchous = carte("Les chouchous de Salazie : 4 marchés, chemins avec exactement 2 ventes",
  ["4 marchés", "S = tout vendu", "chouchous de Salazie"], `chemins avec 2 S${NB}?`);

const verandas = carte("Le vendeur de vérandas : 5 devis, aucun signé ; 0 parmi 5",
  ["5 devis", "0 signé", "0 parmi 5"], `combien${NB}?`, C.jaune);

const encheres = carte("Le commissaire-priseur : 10 lots, 8 vendus ; 2 parmi 10 égale 45",
  ["10 lots", "2 parmi 10 = 45", "8 vendus"], `8 parmi 10${NB}=${NB}?`);

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "va_binomiale_coefficients",
  titre: "Énigmes sur les coefficients binomiaux",
  description: "Le sommelier, le télévendeur, le courtier en assurances, les chouchous de Salazie, le piège du vendeur de vérandas, le défi du commissaire-priseur : compter les chemins à k succès, lire le triangle de Pascal, la formule de Pascal, 0 parmi n et la symétrie.",
  problemes: [
    {
      tag: "Énigme 1 · Le sommelier",
      titre: "Les chemins à un succès",
      question: `Un sommelier goûte 4 vins, sans voir l'étiquette.<br>Chaque fois : il reconnaît le vin (S) ou non (E).<br><br><b>Combien de chemins de l'arbre ont un seul S</b> ?`,
      reponse: `Le S peut être au 1er, 2e, 3e ou 4e vin :<br>SEEE, ESEE, EESE, EEES.<br>Il y a <span class="big">4</span> chemins : 1 parmi 4 = 4.`,
      consigne: "Combien de chemins ont un seul S ?",
      verification: { type: "courte", attendus: ["4"] },
      dessin: sommelier,
    },
    {
      tag: "Énigme 2 · Le télévendeur",
      titre: "Le triangle de Pascal",
      question: `Un télévendeur passe 5 appels.<br>Il compte les chemins avec 2 ventes : c'est « 2 parmi 5 ».<br>Chaque nombre du triangle est la somme des deux nombres au-dessus.<br><br><b>Combien vaut 2 parmi 5</b> ?`,
      reponse: `Au-dessus de la case : 4 et 6.<br>4 + 6 = <span class="big">10</span>.<br>La ligne 5 est 1 5 10 10 5 1.`,
      consigne: "Combien vaut 2 parmi 5 ?",
      verification: { type: "qcm", choix: ["10", "5", "20"], bonne: 0 },
      dessin: televendeur,
    },
    {
      tag: "Énigme 3 · Le courtier en assurances",
      titre: "La formule de Pascal",
      question: `Un courtier en assurances a ses tables :<br>2 parmi 6 = 15 et 3 parmi 6 = 20.<br>La formule de Pascal : 2 parmi 6 + 3 parmi 6 = 3 parmi 7.<br><br><b>Combien vaut 3 parmi 7</b> ?`,
      reponse: `On ajoute les deux voisins de la ligne 6 :<br>15 + 20 = <span class="big">35</span>.`,
      consigne: "Combien vaut 3 parmi 7 ?",
      verification: { type: "courte", attendus: ["35"] },
      dessin: courtier,
    },
    {
      tag: "Énigme 4 · Les chouchous de Salazie",
      titre: "Dénombrer sur l'arbre",
      question: `Un maraîcher de Salazie livre ses chouchous à 4 marchés.<br>À chaque marché : tout est vendu (S) ou non (E).<br><br><b>Combien de chemins ont exactement 2 S</b> ?`,
      reponse: `SSEE, SESE, SEES, ESSE, ESES, EESS.<br>Il y a <span class="big">6</span> chemins : 2 parmi 4 = 6.`,
      consigne: "Combien de chemins ont exactement 2 S ?",
      verification: { type: "qcm", choix: ["4", "8", "6"], bonne: 2 },
      dessin: chouchous,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le vendeur de vérandas",
      sorte: "piege",
      question: `Un vendeur de vérandas envoie 5 devis.<br>Aucun n'est signé.<br>Son stagiaire dit : « 0 parmi 5 = 0, il n'y a aucun chemin. »<br><br><b>Combien vaut 0 parmi 5</b> ?`,
      reponse: `Un chemin a 0 succès : EEEEE.<br>Il existe, et il est seul.<br>0 parmi 5 = <span class="big">1</span>.`,
      consigne: "Combien vaut 0 parmi 5 ?",
      verification: { type: "qcm", choix: ["0", "1", "5"], bonne: 1 },
      dessin: verandas,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le commissaire-priseur",
      sorte: "defi",
      question: `Un commissaire-priseur met 10 lots aux enchères.<br>Chaque lot : vendu (S) ou invendu (E).<br>On sait que 2 parmi 10 = 45.<br><br><b>Combien de chemins ont 8 lots vendus</b> ?`,
      reponse: `8 vendus, c'est 2 invendus.<br>Choisir les 2 invendus revient au même.<br>8 parmi 10 = 2 parmi 10 = <span class="big">45</span>.`,
      consigne: "Combien de chemins ont 8 lots vendus ?",
      verification: { type: "courte", attendus: ["45"] },
      dessin: encheres,
    },
  ],
};

export default problemes;
