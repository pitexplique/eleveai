// Énigmes à projeter — STMG (1re), notion ordre de grandeur et conversions
// (le caviste, la jardinerie, la baby-sitter, la station de lavage, piège du
// dépanneur, défi de l'huile du snack). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, fleche } from "../dessins-ecole";

/** Une étiquette de prix avec sa quantité. */
const lot = (qte: string, prix: string) =>
  r(50, 120, 160, 110, C.bleu, 0.15, 3, 10) + t(130, 188, qte, C.craie, 30) +
    t(240, 190, "×", C.craie, 34) +
    r(270, 120, 160, 110, C.jaune, 0.25, 3, 10) + t(350, 188, prix, C.craie, 30);

const caviste = svg("Le caviste : 12 bouteilles à 8,50 €",
  lot("12", "8,50 €") + t(130, 260, "bouteilles", C.pale, 20) + t(350, 260, "l'une", C.pale, 20) +
    t(240, 350, `de tête :${NB}?`, C.rose, 28));

const jardinerie = svg("La jardinerie : 1 960 pots vendus à 4,95 €",
  lot("1 960", "4,95 €") + t(130, 260, "pots", C.pale, 20) + t(350, 260, "l'un", C.pale, 20) +
    t(240, 350, `environ${NB}?`, C.rose, 28));

const babysitter = svg("La baby-sitter : 2 h 45 min, en heures décimales",
  r(90, 120, 300, 100, C.bleu, 0.15, 3, 10) + t(240, 186, "2 h 45 min", C.craie, 38) +
    fleche(240, 240, 240, 290, C.craie, 4) + t(240, 350, `?${NB}h`, C.rose, 36));

const lavage = svg("La station de lavage : une cuve de 2,4 mètres cubes",
  r(110, 110, 260, 170, C.bleu, 0.25, 4, 12) + t(240, 210, "2,4 m³", C.craie, 40) +
    t(240, 350, `en litres :${NB}?`, C.rose, 28));

const depanneur = svg("Le dépanneur : 60 € de l'heure, 1 h 20 min de travail. Tom calcule 1,20 fois 60",
  r(40, 90, 190, 100, C.jaune, 0.2, 3, 10) + t(135, 152, "60 € / h", C.craie, 30) +
    r(250, 90, 190, 100, C.bleu, 0.15, 3, 10) + t(345, 152, "1 h 20 min", C.craie, 30) +
    t(240, 270, "Tom : 1,20 × 60 = 72 €", C.pale, 24) + t(240, 350, `la facture :${NB}?`, C.rose, 28));

const snack = svg("Le snack : 0,15 mètre cube d'huile par mois, en bidons de 5 litres",
  r(40, 100, 190, 110, C.jaune, 0.25, 3, 10) + t(135, 152, "0,15 m³", C.craie, 30) + t(135, 188, "par mois", C.pale, 20) +
    r(250, 100, 190, 110, C.bleu, 0.15, 3, 10) + t(345, 152, "bidon", C.craie, 26) + t(345, 188, "5 L", C.craie, 26) +
    t(240, 320, `bidons en un an${NB}?`, C.rose, 28));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "auto_ordres_unites",
  titre: "Énigmes d'ordres de grandeur et de conversions",
  description: "Le caviste, la jardinerie, la baby-sitter, la station de lavage, le piège du dépanneur, le défi de l'huile du snack : calcul mental, ordre de grandeur, heures décimales, mètres cubes et litres.",
  problemes: [
    {
      tag: "Énigme 1 · Le caviste",
      titre: "De tête",
      question: `Un caviste vend 12 bouteilles à 8,50 € l'une.<br><br><b>Combien le client paie-t-il</b> ? Calcule de tête.`,
      reponse: `12 × 8 = 96 et 12 × 0,50 = 6.<br>96 + 6 = <span class="big">102 €</span>.`,
      consigne: "12 bouteilles à 8,50 €. Combien paie-t-on ?",
      verification: { type: "courte", attendus: ["102"], unite: "€" },
      dessin: caviste,
    },
    {
      tag: "Énigme 2 · La jardinerie",
      titre: "Un ordre de grandeur",
      question: `Une jardinerie a vendu 1 960 pots de fleurs à 4,95 € l'un.<br><br><b>Quel est l'ordre de grandeur</b> de la recette ?`,
      reponse: `1 960 ≈ 2 000 et 4,95 ≈ 5.<br>2 000 × 5 = <span class="big">10 000 €</span> environ.<br>(Le calcul exact donne 9 702 €.)`,
      consigne: "1 960 pots à 4,95 €. Quel est l'ordre de grandeur de la recette ?",
      verification: { type: "qcm", choix: ["10 000 €", "1 000 €", "100 000 €"], bonne: 0 },
      dessin: jardinerie,
    },
    {
      tag: "Énigme 3 · La baby-sitter",
      titre: "Des heures décimales",
      question: `Une baby-sitter a travaillé 2 h 45 min.<br>Son patron doit l'écrire en heures décimales.<br><br><b>Combien d'heures</b> écrit-il ?`,
      reponse: `45 min = 45 ÷ 60 h = 0,75 h (trois quarts d'heure).<br>2 h 45 min = <span class="big">2,75 h</span>.`,
      consigne: "2 h 45 min. Combien d'heures en écriture décimale ?",
      verification: { type: "courte", attendus: ["2,75", "2.75"], unite: "h" },
      dessin: babysitter,
    },
    {
      tag: "Énigme 4 · La station de lavage",
      titre: "Des mètres cubes",
      question: `Une station de lavage récupère l'eau de pluie dans une cuve.<br>La cuve fait 2,4 m³.<br><br><b>Combien de litres</b> peut-elle contenir ?`,
      reponse: `1 m³ = 1 000 L.<br>2,4 × 1 000 = <span class="big">2 400 L</span>.`,
      consigne: "Une cuve de 2,4 m³. Combien de litres ?",
      verification: { type: "qcm", choix: ["24 L", "240 L", "2 400 L"], bonne: 2 },
      dessin: lavage,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le dépanneur",
      sorte: "piege",
      question: `Un dépanneur facture 60 € de l'heure.<br>Il a travaillé 1 h 20 min.<br>Tom : « 1 h 20, c'est 1,20 h. 1,20 × 60 = 72 €. »<br><br><b>Combien coûte vraiment</b> la réparation ?`,
      reponse: `Une heure fait 60 minutes, pas 100.<br>1 h = 60 € et 20 min = un tiers d'heure = 20 €.<br>60 + 20 = <span class="big">80 €</span>.`,
      consigne: "60 € de l'heure, 1 h 20 min de travail. Combien coûte la réparation ?",
      verification: { type: "qcm", choix: ["72 €", "80 €", "120 €"], bonne: 1 },
      dessin: depanneur,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "L'huile du snack",
      sorte: "defi",
      question: `Un snack utilise 0,15 m³ d'huile de friture par mois.<br>Il achète l'huile en bidons de 5 L.<br><br><b>Combien de bidons</b> achète-t-il en un an ?`,
      reponse: `0,15 m³ = 0,15 × 1 000 = 150 L par mois.<br>150 ÷ 5 = 30 bidons par mois.<br>30 × 12 = <span class="big">360 bidons</span> par an.`,
      consigne: "0,15 m³ d'huile par mois, en bidons de 5 L. Combien de bidons en un an ?",
      verification: { type: "courte", attendus: ["360"], unite: "bidons" },
      dessin: snack,
    },
  ],
};

export default problemes;
