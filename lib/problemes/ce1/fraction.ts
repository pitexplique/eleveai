// Énigmes à projeter — CE1, notion fractions simples (la pomme coupée en
// deux, la fenêtre en quatre carreaux, la moitié des 10 bonbons, le ruban en
// trois, le piège du quart plus grand que le demi, le défi des quarts dans
// une moitié). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, o, l, p, bande } from "../dessins-ecole";
import { frac, svgFrac } from "../outils";

const pomme = svg(
  "Une pomme coupée en 2 parts égales ; une part est rose",
  `<path d="M240 110 Q160 80 130 170 Q120 280 230 300 L240 300 Z" fill="${C.rose}" fill-opacity="0.4" stroke="${C.rose}" stroke-width="4"/>` +
    `<path d="M240 110 Q320 80 350 170 Q360 280 250 300 L240 300 Z" fill="none" stroke="${C.craie}" stroke-width="4"/>` +
    l(240, 100, 240, 310, C.craie, 3, "8 6") + p("M240 110 Q245 80 260 70", C.craie, 4) +
    t(240, 375, `La part rose${NB}?`, C.rose, 30)
);

const fenetre = svg(
  "Une fenêtre de 4 carreaux égaux, un carreau est jaune",
  r(140, 70, 200, 200, C.craie, 0, 6, 4) + r(140, 70, 100, 100, C.jaune, 0.5, 0) + l(240, 70, 240, 270, C.craie, 5) + l(140, 170, 340, 170, C.craie, 5) +
    t(240, 350, `Le carreau jaune${NB}?`, C.rose, 30)
);

const bonbons = svg(
  "10 bonbons ; une ligne les coupe en deux groupes égaux",
  [...Array(10)].map((_, i) => o(50 + (i % 5) * 40 + (i >= 5 ? 220 : 0), 170, 16, i < 5 ? C.bleu : C.rose, 0.4, 3)).join("") +
    l(240, 110, 240, 230, C.craie, 3, "8 6") +
    t(240, 320, "La moitié pour Ana", C.pale, 24) + t(240, 380, `Combien pour Ana${NB}?`, C.rose, 30)
);

const ruban = svg(
  "Un ruban coupé en 3 parts égales ; une part bleue",
  bande(60, 150, 360, 70, 3, 1, C.bleu) + t(240, 320, `La part bleue${NB}?`, C.rose, 30)
);

const piege = svg(
  "Deux tablettes pareilles : l'une en 2 parts (1 colorée), l'autre en 4 parts (1 colorée)",
  bande(60, 90, 360, 60, 2, 1, C.jaune) + svgFrac(450, 115, 1, 2, C.craie, 24) +
    bande(60, 210, 360, 60, 4, 1, C.rose) + svgFrac(450, 235, 1, 4, C.craie, 24) +
    t(240, 360, `La plus grande part${NB}?`, C.rose, 30)
);

const quarts = svg(
  "Une tablette en 4 parts égales ; la moitié est coloriée",
  bande(60, 130, 360, 80, 4, 2, C.bleu) + l(240, 110, 240, 230, C.rose, 4, "8 6") +
    t(150, 270, "la moitié", C.bleu, 24) + t(240, 350, `Combien de quarts${NB}?`, C.rose, 30)
);

const problemes: ProblemesNotion = {
  classe: "ce1",
  notionId: "fraction",
  titre: "Énigmes sur les fractions simples",
  description: "La pomme coupée en deux, la fenêtre en quatre carreaux, la moitié des 10 bonbons, le ruban en trois, le piège du quart plus grand que le demi, le défi des quarts dans une moitié.",
  problemes: [
    {
      tag: "Énigme 1 · La récré",
      titre: "La pomme",
      question: `Maé coupe une pomme en <b>2 parts égales</b>.<br><br>Quelle part est rose ?`,
      reponse: `2 parts égales : chaque part est un demi.<br>La part rose : <span class="big">${frac(1, 2)}</span> (la moitié).`,
      consigne: "Quelle part de la pomme est rose ?",
      verification: { type: "qcm", choix: ["Un demi", "Un tiers", "Un quart"], bonne: 0 },
      dessin: pomme,
    },
    {
      tag: "Énigme 2 · La maison",
      titre: "La fenêtre",
      question: `La fenêtre a <b>4 carreaux égaux</b>.<br>Un carreau est jaune.<br><br>Quelle part est jaune ?`,
      reponse: `4 parts égales : chaque part est un quart.<br>Le carreau jaune : <span class="big">${frac(1, 4)}</span>.`,
      consigne: "Quelle part de la fenêtre est jaune ?",
      verification: { type: "qcm", choix: ["Un demi", "Un quart", "Un tiers"], bonne: 1 },
      dessin: fenetre,
    },
    {
      tag: "Énigme 3 · Le partage",
      titre: "Les bonbons",
      question: `Il y a <b>10 bonbons</b>.<br>Ana en prend <b>la moitié</b>.<br><br>Combien en a Ana ?`,
      reponse: `La moitié : 2 parts égales.<br>5 + 5 = 10.<br>Ana a <span class="big">5 bonbons</span>.`,
      consigne: "Combien de bonbons pour Ana ?",
      verification: { type: "courte", attendus: ["5"], unite: "bonbons" },
      dessin: bonbons,
    },
    {
      tag: "Énigme 4 · La couture",
      titre: "Le ruban",
      question: `Le ruban a <b>3 parts égales</b>.<br>Une part est bleue.<br><br>Quelle part est bleue ?`,
      reponse: `3 parts égales : chaque part est un tiers.<br>La part bleue : <span class="big">${frac(1, 3)}</span>.`,
      consigne: "Quelle part du ruban est bleue ?",
      verification: { type: "qcm", choix: ["Un quart", "Un demi", "Un tiers"], bonne: 2 },
      dessin: ruban,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Demi ou quart",
      sorte: "piege",
      question: `Deux tablettes pareilles.<br>Paul prend <b>${frac(1, 2)}</b>. Zoé prend <b>${frac(1, 4)}</b>.<br><br>Qui a la plus grande part ?`,
      reponse: `Le piège : 4 est plus grand que 2.<br>Mais en 4 parts, chaque part est plus <b>petite</b>.<br>La plus grande part : <span class="big">${frac(1, 2)}</span>, celle de Paul.`,
      consigne: "Quelle part est la plus grande ?",
      verification: { type: "qcm", choix: ["Un demi", "Un quart", "Elles sont pareilles"], bonne: 0 },
      dessin: piege,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les quarts",
      sorte: "defi",
      question: `La tablette a <b>4 parts égales</b>.<br>On colorie la <b>moitié</b>.<br><br>Combien de quarts sont coloriés ?`,
      reponse: `La moitié de la tablette, c'est 2 parts sur 4.<br>Dans une moitié, il y a <span class="big">2 quarts</span>.`,
      consigne: "Combien de quarts dans une moitié ?",
      verification: { type: "courte", attendus: ["2"], unite: "quarts" },
      dessin: quarts,
    },
  ],
};

export default problemes;
