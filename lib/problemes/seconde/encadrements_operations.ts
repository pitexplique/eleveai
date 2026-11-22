// Énigmes à projeter — seconde, notion encadrements_operations (la valise et
// le sac, la marge du vendeur, le carrelage mesuré au millimètre, la vitesse
// du car, piège du carré d'un encadrement, défi de la crêpe). 21/11/2026.
// Notion hors programme français : masquée en France, utile ailleurs.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, o, p } from "../dessins-ecole";

// Un encadrement écrit « a ≤ x ≤ b » dans une étiquette.
const etiquette = (x: number, y: number, s: string, c: string) => r(x - 110, y - 32, 220, 48, c, 0.1, 2, 10) + t(x, y, s, c, 24);

const valise = svg(
  "Une valise entre 18 et 19 kilos et un sac entre 4 et 6 kilos",
  r(60, 80, 140, 120, C.bleu, 0.2, 3, 12) + p("M105 80 v-20 h50 v20", C.bleu, 3) + r(300, 120, 100, 80, C.jaune, 0.2, 3, 12) + p("M325 120 q25 -40 50 0", C.jaune, 3) +
    etiquette(130, 260, "18 ≤ v ≤ 19", C.bleu) + etiquette(350, 260, "4 ≤ s ≤ 6", C.jaune) + t(240, 360, `au plus, en tout${NB}?`, C.rose, 28)
);

const marge = svg(
  "Prix d'achat entre 1 et 3 euros, prix de vente entre 5 et 7 euros",
  t(130, 90, "achat", C.pale, 22) + etiquette(130, 150, "1 ≤ a ≤ 3", C.bleu) + t(350, 90, "vente", C.pale, 22) + etiquette(350, 150, "5 ≤ v ≤ 7", C.jaune) +
    t(240, 260, "marge = v − a", C.craie, 28) + t(240, 340, `encadrement de la marge${NB}?`, C.rose, 24)
);

const carrelage = svg(
  "Une salle de bains rectangulaire : longueur entre 4,9 et 5,1 mètres, largeur entre 2,9 et 3,1 mètres",
  r(70, 60, 340, 200, C.bleu, 0.08, 3) + Array.from({ length: 7 }, (_, k) => p(`M${70 + 42.5 * (k + 1)} 60 v200`, C.pale, 1)).join("") +
    Array.from({ length: 4 }, (_, k) => p(`M70 ${60 + 40 * (k + 1)} h340`, C.pale, 1)).join("") +
    t(240, 295, "4,9 m ≤ L ≤ 5,1 m", C.craie, 22) + t(240, 330, "2,9 m ≤ ℓ ≤ 3,1 m", C.craie, 22) +
    t(240, 390, `l'aire au plus${NB}?`, C.rose, 28)
);

const car = svg(
  "Un car : distance entre 99 et 101 kilomètres, durée entre 1,9 et 2 heures",
  r(110, 90, 240, 90, C.jaune, 0.25, 3, 14) + o(160, 185, 20, C.craie, 0.6, 3) + o(300, 185, 20, C.craie, 0.6, 3) +
    [0, 1, 2, 3].map((k) => r(130 + 52 * k, 105, 40, 32, C.bleu, 0.2, 2, 4)).join("") +
    etiquette(130, 270, "99 ≤ d ≤ 101", C.bleu) + etiquette(350, 270, "1,9 ≤ t ≤ 2", C.jaune) + t(240, 370, `vitesse au moins${NB}?`, C.rose, 28)
);

const carre = svg(
  "Au tableau : moins 2 inférieur ou égal à x inférieur ou égal à 3, donc 4 inférieur ou égal à x carré inférieur ou égal à 9, question",
  etiquette(240, 120, "−2 ≤ x ≤ 3", C.bleu) + p("M240 150 v50", C.pale, 3) + t(240, 260, "donc 4 ≤ x² ≤ 9", C.craie, 28) + t(240, 340, `vrai${NB}?`, C.rose, 30)
);

const crepe = svg(
  "Une crêpe de rayon entre 9,9 et 10,1 centimètres",
  o(240, 150, 110, C.jaune, 0.3, 3) + p("M240 150 h110", C.craie, 3) + t(295, 140, "r", C.craie, 24) +
    t(240, 305, "9,9 ≤ r ≤ 10,1 et 3,14 ≤ π ≤ 3,15", C.craie, 20) + t(240, 365, `l'aire peut dépasser 320 cm²${NB}?`, C.rose, 22)
);

const problemes: ProblemesNotion = {
  classe: "seconde",
  notionId: "encadrements_operations",
  titre: "Énigmes des encadrements",
  description: "La valise et le sac, la marge du vendeur, le carrelage, la vitesse du car, le piège du carré, le défi de la crêpe : encadrer une somme, une différence, un produit, un quotient, un carré.",
  problemes: [
    {
      tag: "Énigme 1 · La valise et le sac",
      titre: "Encadrer une somme",
      question: `La balance n'est pas précise : la valise pèse entre <b>18 et 19 kg</b>, le sac entre <b>4 et 6 kg</b>.<br><br><b>Combien de kg au plus</b> en tout ?`,
      reponse: `On additionne les bornes : 18 + 4 ≤ v + s ≤ 19 + 6.<br>22 ≤ v + s ≤ 25 : au plus <span class="big">25 kg</span>.`,
      consigne: "18 ≤ v ≤ 19 et 4 ≤ s ≤ 6 : combien de kg au plus pour v + s ?",
      verification: { type: "courte", attendus: ["25"], unite: "kg" },
      dessin: valise,
    },
    {
      tag: "Énigme 2 · La marge",
      titre: "Encadrer une différence",
      question: `Un vendeur achète un objet entre <b>1 et 3 €</b> et le revend entre <b>5 et 7 €</b>.<br><br><b>Quel encadrement</b> pour sa marge v − a ?`,
      reponse: `Pour une différence, on croise : la plus petite marge, c'est 5 − 3 ; la plus grande, 7 − 1.<br><span class="big">2 ≤ v − a ≤ 6</span>, donc [2 ; 6].`,
      consigne: "1 ≤ a ≤ 3 et 5 ≤ v ≤ 7 : encadrement de v − a ?",
      verification: { type: "qcm", choix: ["[2 ; 6]", "[4 ; 4]", "[4 ; 6]"], bonne: 0 },
      dessin: marge,
    },
    {
      tag: "Énigme 3 · Le carrelage",
      titre: "Encadrer un produit",
      question: `Une salle de bains mesure entre <b>4,9 et 5,1 m</b> de long, et entre <b>2,9 et 3,1 m</b> de large.<br><br><b>Quelle aire au plus</b>, pour commander assez de carrelage ?`,
      reponse: `Les longueurs sont positives : on multiplie les bornes.<br>Au plus : 5,1 × 3,1 = <span class="big">15,81 m²</span> (au moins 4,9 × 2,9 = 14,21 m²).`,
      consigne: "4,9 ≤ L ≤ 5,1 et 2,9 ≤ ℓ ≤ 3,1 : aire maximale, en m² ?",
      verification: { type: "courte", attendus: ["15,81", "15.81"], unite: "m²" },
      dessin: carrelage,
    },
    {
      tag: "Énigme 4 · Le car",
      titre: "Encadrer un quotient",
      question: `Un car parcourt entre <b>99 et 101 km</b> en une durée entre <b>1,9 et 2 h</b>.<br><br><b>Quelle est sa vitesse moyenne au moins</b> ?`,
      reponse: `v = d ÷ t. La plus petite vitesse : la plus petite distance divisée par la plus <b>grande</b> durée.<br>99 ÷ 2 = <span class="big">49,5 km/h</span>.`,
      consigne: "99 ≤ d ≤ 101 et 1,9 ≤ t ≤ 2 : vitesse moyenne minimale, en km/h ?",
      verification: { type: "courte", attendus: ["49,5", "49.5"], unite: "km/h" },
      dessin: car,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le carré d'un encadrement",
      sorte: "piege",
      question: `On sait que −2 ≤ x ≤ 3. Ali écrit : « donc 4 ≤ x² ≤ 9 ».<br><br><b>Quel est le bon encadrement</b> de x² ?`,
      reponse: `x peut valoir 0, et alors x² = 0, qui n'est pas ≥ 4 !<br>Sur [−2 ; 3], x² va de 0 (pour x = 0) à 9 (pour x = 3) : <span class="big">0 ≤ x² ≤ 9</span>.`,
      consigne: "−2 ≤ x ≤ 3 : quel est l'encadrement de x² ?",
      verification: { type: "qcm", choix: ["[4 ; 9]", "[−4 ; 9]", "[0 ; 9]"], bonne: 2 },
      dessin: carre,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La crêpe",
      sorte: "defi",
      question: `Une crêpe a un rayon entre <b>9,9 et 10,1 cm</b>. On prend 3,14 ≤ π ≤ 3,15.<br><br>Son aire πr² <b>peut-elle dépasser 320 cm²</b> ?`,
      reponse: `Au plus : 3,15 × 10,1² = 3,15 × 102,01 ≈ 321,3 cm². Au moins : 3,14 × 9,9² ≈ 307,8 cm².<br><span class="big">Oui, c'est possible</span>, mais ce n'est pas sûr.`,
      consigne: "9,9 ≤ r ≤ 10,1 et 3,14 ≤ π ≤ 3,15 : l'aire peut-elle dépasser 320 cm² ?",
      verification: { type: "qcm", choix: ["Non, jamais", "Oui, c'est possible", "Oui, toujours"], bonne: 1 },
      dessin: crepe,
    },
  ],
};

export default problemes;
