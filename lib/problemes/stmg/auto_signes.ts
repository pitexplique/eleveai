// Énigmes à projeter — STMG (1re), notion signe d'une expression
// (les sacs de la créatrice, l'atelier de céramique, la stagiaire du cabinet
// comptable, le fabricant de luminaires, piège du réservoir du poids lourd,
// défi du concours d'école de commerce). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l } from "../dessins-ecole";

const sacs = svg("Le résultat de la créatrice de sacs : R de x égale 25x moins 400",
  r(60, 100, 360, 100, C.jaune, 0.2, 3, 10) + t(240, 165, "R(x) = 25x − 400", C.craie, 32) +
    t(240, 270, "R(x) ≥ 0", C.pale, 28) + t(240, 340, `à partir de x${NB}=${NB}?`, C.rose, 26));

const ceramique = svg("Le bénéfice de l'atelier de céramique : x moins 2 fois 8 moins x, x entre 0 et 10",
  r(40, 100, 400, 100, C.bleu, 0.15, 3, 10) + t(240, 165, "B(x) = (x − 2)(8 − x)", C.craie, 30) +
    t(240, 265, "x entre 0 et 10", C.pale, 24) + t(240, 335, `B(x) > 0${NB}?`, C.rose, 28));

// Tableau de signes dessiné à la main : colonnes −∞ (175), −1 (255), 3 (355), +∞ (445).
const ligneSignes = (y: number, vals: [number, string, string][]) =>
  vals.map(([x, v, c]) => t(x, y, v, c, 24)).join("");
const stagiaire = svg("Tableau de signes de x plus 1 fois x moins 3, la dernière ligne est à compléter",
  r(20, 70, 440, 260, C.craie, 0, 3) + l(140, 70, 140, 330, C.craie, 2) +
    [130, 195, 260].map((y) => l(20, y, 460, y, C.craie, 2)).join("") +
    t(80, 108, "x", C.pale, 24) + t(80, 172, "x + 1", C.pale, 22) + t(80, 237, "x − 3", C.pale, 22) + t(80, 302, "produit", C.pale, 22) +
    ligneSignes(108, [[170, "−∞", C.craie], [255, "−1", C.craie], [355, "3", C.craie], [440, "+∞", C.craie]]) +
    ligneSignes(172, [[205, "−", C.craie], [255, "0", C.craie], [305, "+", C.craie], [400, "+", C.craie]]) +
    ligneSignes(237, [[205, "−", C.craie], [305, "−", C.craie], [355, "0", C.craie], [400, "+", C.craie]]) +
    t(300, 302, "?", C.rose, 30));

const luminaires = svg("L'écart du fabricant de luminaires : E de x égale x moins 2 fois x moins 5",
  r(50, 100, 380, 100, C.jaune, 0.2, 3, 10) + t(240, 165, "E(x) = (x − 2)(x − 5)", C.craie, 30) +
    t(240, 290, `E(x) &lt; 0${NB}?`, C.rose, 30) + t(240, 345, "un x entier", C.pale, 24));

const reservoir = svg("Le réservoir du poids lourd : G de x égale 12 moins 3x. Léo dit positif quand x plus grand que 4",
  r(60, 80, 360, 100, C.bleu, 0.15, 3, 10) + t(240, 142, "G(x) = 12 − 3x", C.craie, 32) +
    t(240, 250, "Léo : « G(x) > 0 si x > 4 »", C.pale, 24) + t(240, 330, "?", C.rose, 34));

const concours = svg("Le concours : combien d'entiers x vérifient x au carré plus petit que 9",
  r(80, 110, 320, 100, C.jaune, 0.2, 3, 10) + t(240, 175, "x² &lt; 9", C.craie, 40) +
    t(240, 290, "x entier", C.pale, 24) + t(240, 345, `combien${NB}?`, C.rose, 28));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "auto_signes",
  titre: "Énigmes sur le signe d'une expression",
  description: "Les sacs de la créatrice, l'atelier de céramique, la stagiaire du cabinet comptable, le fabricant de luminaires, le piège du réservoir du poids lourd, le défi du concours d'école de commerce : signe d'une expression du premier degré, d'un produit, tableau de signes.",
  problemes: [
    {
      tag: "Énigme 1 · La créatrice de sacs",
      titre: "Le signe de ax + b",
      question: `Une créatrice vend des sacs en tissu.<br>Pour x sacs vendus, son résultat vaut R(x) = 25x − 400 (en €).<br><br><b>À partir de combien de sacs</b> son résultat est-il positif ou nul ?`,
      reponse: `25x − 400 ≥ 0 donne 25x ≥ 400, donc x ≥ 16.<br>À partir de <span class="big">16 sacs</span>.<br>Vérification : 25 × 16 = 400, le résultat vaut 0.`,
      consigne: "25x − 400 ≥ 0. À partir de quelle valeur de x ?",
      verification: { type: "courte", attendus: ["16"], unite: "sacs" },
      dessin: sacs,
    },
    {
      tag: "Énigme 2 · L'atelier de céramique",
      titre: "Le signe d'un produit",
      question: `Un atelier de céramique fabrique x centaines de bols (x entre 0 et 10).<br>Son bénéfice vaut B(x) = (x − 2)(8 − x), en milliers d'euros.<br><br><b>Quand le bénéfice est-il positif</b> ?`,
      reponse: `x − 2 est positif après 2. 8 − x est positif avant 8.<br>Le produit est positif quand les deux sont positifs : <span class="big">entre 2 et 8</span>.<br>Test : B(5) = 3 × 3 = 9 > 0 ; B(1) = −1 × 7 = −7 &lt; 0.`,
      consigne: "Quand (x − 2)(8 − x) est-il positif ?",
      verification: { type: "qcm", choix: ["entre 2 et 8", "avant 2", "après 8"], bonne: 0 },
      dessin: ceramique,
    },
    {
      tag: "Énigme 3 · La stagiaire du cabinet",
      titre: "Un tableau de signes",
      question: `Dans un cabinet comptable, une stagiaire dresse le tableau de signes de (x + 1)(x − 3).<br>Il lui reste la dernière ligne.<br><br><b>Quelle suite de signes</b> doit-elle écrire, de gauche à droite ?`,
      reponse: `Avant −1 : − × − = +.<br>Entre −1 et 3 : + × − = −.<br>Après 3 : + × + = +.<br>La ligne est <span class="big">+ 0 − 0 +</span>.`,
      consigne: "Quels signes pour (x + 1)(x − 3), de gauche à droite ?",
      verification: { type: "qcm", choix: ["− + −", "+ − +", "+ + −"], bonne: 1 },
      dessin: stagiaire,
    },
    {
      tag: "Énigme 4 · Le fabricant de luminaires",
      titre: "Lire le signe",
      question: `Un fabricant de luminaires produit x centaines de lampes.<br>L'écart entre son objectif et sa production vaut E(x) = (x − 2)(x − 5).<br><br><b>Donne un nombre entier x</b> pour lequel E(x) est négatif.`,
      reponse: `E(x) s'annule en 2 et en 5.<br>Entre 2 et 5, x − 2 est positif et x − 5 négatif : le produit est négatif.<br>Les entiers qui marchent : <span class="big">3 ou 4</span>.<br>E(3) = 1 × (−2) = −2.`,
      consigne: "Donne un entier x pour lequel (x − 2)(x − 5) < 0.",
      verification: { type: "courte", attendus: ["3", "4"] },
      dessin: luminaires,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le réservoir du poids lourd",
      sorte: "piege",
      question: `Après x heures de route, il reste G(x) = 12 − 3x dizaines de litres dans le réservoir d'un poids lourd.<br>Léo : « 12 − 3x s'annule en 4, donc c'est positif quand x > 4. »<br><br><b>Quand G(x) est-il vraiment positif</b> ?`,
      reponse: `Le coefficient de x vaut −3 : il est négatif, l'expression DIMINUE.<br>Elle est positive avant 4 : <span class="big">x &lt; 4</span>.<br>Test : G(0) = 12 > 0 et G(6) = −6 &lt; 0.`,
      consigne: "Quand 12 − 3x est-il positif ?",
      verification: { type: "qcm", choix: ["x > 4", "x > −4", "x < 4"], bonne: 2 },
      dessin: reservoir,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le concours d'école de commerce",
      sorte: "defi",
      question: `Au concours d'entrée d'une école de commerce, une question dit :<br>« Combien de nombres entiers x vérifient x² &lt; 9 ? »<br><br><b>Combien y en a-t-il</b> ? Pense à factoriser x² − 9.`,
      reponse: `x² − 9 = (x − 3)(x + 3) est négatif entre −3 et 3 (bornes exclues).<br>Les entiers : −2, −1, 0, 1, 2. Il y en a <span class="big">5</span>.<br>Attention : 3² = 9 n'est pas plus petit que 9.`,
      consigne: "Combien d'entiers x vérifient x² < 9 ?",
      verification: { type: "courte", attendus: ["5"] },
      dessin: concours,
    },
  ],
};

export default problemes;
