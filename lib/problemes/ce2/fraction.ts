// Énigmes à projeter — CE2, notion fractions inférieures ou égales à 1 (la
// tarte aux pommes, le drapeau en trois bandes, le ruban en 8, les galettes
// entières, le piège du gâteau mal coupé, le défi de la crêpe). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { frac } from "../outils";
import { C, NB, svg, t, r, l, secteurs, bande } from "../dessins-ecole";

const tarte = svg(
  "Une tarte coupée en 4 parts égales ; 1 part est mangée",
  secteurs(240, 190, 140, 4, 1, C.jaune) + t(240, 385, `Quelle part est mangée${NB}?`, C.rose, 28)
);

const drapeau = svg(
  "Un drapeau en 3 bandes égales ; 2 bandes sont coloriées",
  l(70, 60, 70, 360, C.craie, 6) + bande(76, 70, 330, 200, 3, 2, C.bleu) + t(240, 330, `Quelle part est coloriée${NB}?`, C.rose, 28)
);

const ruban = svg(
  "Un ruban en 8 parts égales ; 3 parts sont bleues",
  bande(40, 140, 400, 70, 8, 3, C.bleu) + t(240, 290, "8 parts égales", C.craie, 26) + t(240, 360, `La part bleue${NB}?`, C.rose, 28)
);

const galettes = svg(
  "Trois galettes en 4 parts : A 3 parts coloriées, B 4 parts coloriées, C 1 part coloriée",
  [3, 4, 1].map((k, i) => secteurs(85 + i * 155, 170, 65, 4, k, C.jaune) + t(85 + i * 155, 275, ["A", "B", "C"][i], C.craie, 30)).join("") +
    t(240, 370, `Laquelle est une galette entière${NB}?`, C.rose, 26)
);

const gateau = svg(
  "Un gâteau rectangulaire coupé en 4 parts de tailles différentes ; une part coloriée",
  r(60, 100, 360, 180, C.craie, 0, 4) + l(120, 100, 120, 280, C.craie, 4) + l(200, 100, 200, 280, C.craie, 4) + l(300, 100, 300, 280, C.craie, 4) +
    r(60, 100, 60, 180, C.rose, 0.4, 4) + t(240, 360, `Est-ce un quart${NB}?`, C.rose, 30)
);

const crepe = svg(
  "Une crêpe : Papa mange la moitié, puis la moitié de ce qui reste",
  secteurs(240, 180, 130, 4, 0, C.jaune) +
    `<path d="M240 180 L240 50 A130 130 0 0 1 240 310 Z" fill="${C.bleu}" fill-opacity="0.35" stroke="${C.craie}" stroke-width="3"/>` +
    `<path d="M240 180 L240 310 A130 130 0 0 1 110 180 Z" fill="${C.rose}" fill-opacity="0.35" stroke="${C.craie}" stroke-width="3"/>` +
    t(330, 190, "1", C.craie, 30) + t(190, 245, "2", C.craie, 30) + t(240, 375, `Que reste-t-il${NB}?`, C.rose, 28)
);

const problemes: ProblemesNotion = {
  classe: "ce2",
  notionId: "fraction",
  titre: "Énigmes sur les fractions",
  description: "La tarte en quatre parts, le drapeau aux deux tiers colorié, le ruban en huitièmes, la galette entière, le piège du gâteau mal coupé, le défi de la crêpe partagée deux fois.",
  problemes: [
    {
      tag: "Énigme 1 · Le dessert",
      titre: "La tarte aux pommes",
      question: `La tarte est coupée en <b>4 parts égales</b>.<br>On mange <b>1 part</b>.<br><br>Quelle part de la tarte est mangée ?`,
      reponse: `1 part sur 4 parts égales : ${frac(1, 4)}.<br>On a mangé <span class="big">un quart</span>.`,
      consigne: "Quelle part de la tarte est mangée ?",
      verification: { type: "qcm", choix: ["un demi", "un tiers", "un quart"], bonne: 2 },
      dessin: tarte,
    },
    {
      tag: "Énigme 2 · Le drapeau",
      titre: "Les trois bandes",
      question: `Le drapeau a <b>3 bandes égales</b>.<br><b>2 bandes</b> sont bleues.<br><br>Quelle part du drapeau est bleue ?`,
      reponse: `2 bandes sur 3 bandes égales.<br>${frac(2, 3)} : <span class="big">deux tiers</span>.`,
      consigne: "Quelle part du drapeau est bleue ?",
      verification: { type: "qcm", choix: ["deux tiers", "un tiers", "trois demis"], bonne: 0 },
      dessin: drapeau,
    },
    {
      tag: "Énigme 3 · La couture",
      titre: "Le ruban",
      question: `Le ruban a <b>8 parts égales</b>.<br><b>3 parts</b> sont bleues.<br><br>Quelle fraction du ruban est bleue ?`,
      reponse: `3 parts sur 8 parts égales :<br><span class="big">${frac(3, 8)}</span>, trois huitièmes.`,
      consigne: "Quelle fraction du ruban est bleue ? (écris 3/8 par exemple)",
      verification: { type: "courte", attendus: ["3/8"] },
      dessin: ruban,
    },
    {
      tag: "Énigme 4 · Les galettes",
      titre: "La galette entière",
      question: `Chaque galette a <b>4 parts égales</b>.<br>On colorie les parts mangées.<br><br>Quelle fraction fait <b>une galette entière</b> ?`,
      reponse: `Une galette entière : toutes les parts, 4 sur 4.<br><span class="big">${frac(4, 4)} = 1</span>, c'est la galette B.`,
      consigne: "Quelle fraction est égale à une galette entière ?",
      verification: { type: "qcm", choix: ["3/4", "4/4", "1/4"], bonne: 1 },
      dessin: galettes,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le gâteau mal coupé",
      sorte: "piege",
      question: `Le gâteau est coupé en <b>4 parts</b>.<br>Une part est rose.<br><br>La part rose est-elle <b>un quart</b> du gâteau ?`,
      reponse: `Le piège : il y a bien 4 parts…<br>Mais elles ne sont pas égales !<br><span class="big">Non</span> : un quart, c'est 1 part sur 4 parts <b>égales</b>.`,
      consigne: "La part rose est-elle un quart du gâteau ?",
      verification: { type: "qcm", choix: ["Oui, 1 part sur 4", "Non, les parts ne sont pas égales", "Oui, c'est un demi"], bonne: 1 },
      dessin: gateau,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La crêpe",
      sorte: "defi",
      question: `Papa mange <b>la moitié</b> de la crêpe (1).<br>Puis il mange <b>la moitié de ce qui reste</b> (2).<br><br>Quelle part de la crêpe reste-t-il ?`,
      reponse: `La moitié = 2 quarts. Puis la moitié du reste = 1 quart.<br>Il a mangé 3 quarts.<br>Il reste <span class="big">un quart</span> (${frac(1, 4)}).`,
      consigne: "Quelle part de la crêpe reste-t-il ?",
      verification: { type: "qcm", choix: ["un quart", "un demi", "rien"], bonne: 0 },
      dessin: crepe,
    },
  ],
};

export default problemes;
