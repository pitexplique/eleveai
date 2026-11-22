// Énigmes à projeter — seconde, notion composees_transformations (la porte
// tambour, les deux miroirs parallèles, la photocopieuse, les lambrequins des
// cases créoles (974), piège des deux miroirs en coin, défi du logo qui tourne
// et grandit). 21/11/2026.
// Notion hors programme français : masquée en France, utile ailleurs.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, o, p, fleche } from "../dessins-ecole";
import { repere } from "../dessins-2de";

const porte = (() => {
  const cx = 240, cy = 190, R = 130;
  const P = (a: number, k = R) => [+(cx + k * Math.cos((a * Math.PI) / 180)).toFixed(1), +(cy - k * Math.sin((a * Math.PI) / 180)).toFixed(1)];
  const arc = (a1: number, a2: number, k: number, c: string) => {
    const [x1, y1] = P(a1, k), [x2, y2] = P(a2, k);
    return p(`M${x1} ${y1} A${k} ${k} 0 0 0 ${x2} ${y2}`, c, 4);
  };
  const ailes = [0, 90, 180, 270].map((a) => { const [x, y] = P(a); return l(cx, cy, x, y, C.pale, 3); }).join("");
  const [x50, y50] = P(50), [x120, y120] = P(120);
  return svg("Une porte tambour vue de dessus ; un battant tourne de 50 degrés puis de 70 degrés autour du même axe",
    o(cx, cy, R, C.craie, 0, 3) + ailes + l(cx, cy, x50, y50, C.bleu, 4) + l(cx, cy, x120, y120, C.rose, 5) +
      arc(0, 50, 60, C.bleu) + arc(50, 120, 90, C.jaune) + t(...(P(25, 78) as [number, number]), "50°", C.bleu, 18) + t(...(P(80, 148) as [number, number]), "70°", C.jaune, 18) +
      o(cx, cy, 6, C.craie, 1, 0) + t(240, 395, `de combien a-t-il tourné${NB}?`, C.rose, 24));
})();

const miroirs = (() => {
  const drapeau = (xp: number, sens: number, c: string) =>
    l(xp, 120, xp, 220, c, 4) + p(`M${xp} 120 L${xp + 30 * sens} 140 L${xp} 160 Z`, c, 3, 0.4);
  return svg("Deux miroirs parallèles à 3 centimètres l'un de l'autre ; un drapeau, son image dans le premier miroir, puis l'image de l'image dans le second",
    l(180, 60, 180, 290, C.bleu, 5) + l(300, 60, 300, 290, C.bleu, 5) + t(180, 50, "miroir 1", C.bleu, 16) + t(300, 50, "miroir 2", C.bleu, 16) +
      drapeau(130, -1, C.jaune) + drapeau(230, 1, C.pale) + drapeau(370, -1, C.rose) +
      fleche(130, 260, 370, 260, C.rose, 3) + t(250, 285, "?", C.rose, 24) +
      l(180, 320, 300, 320, C.craie, 2) + l(180, 312, 180, 328, C.craie, 2) + l(300, 312, 300, 328, C.craie, 2) + t(240, 348, "3 cm", C.craie, 18) +
      t(240, 400, `quelle transformation${NB}?`, C.rose, 26));
})();

const photocopie = svg("Une photo, agrandie deux fois, puis réduite à 75 %",
  r(40, 220, 60, 40, C.jaune, 0.3, 3, 4) + r(170, 180, 120, 80, C.bleu, 0.2, 3, 4) + r(350, 200, 90, 60, C.rose, 0.2, 3, 4) +
    t(70, 290, "photo", C.craie, 18) + t(230, 290, "× 2", C.bleu, 22) + t(395, 290, "× 0,75", C.rose, 22) +
    fleche(110, 240, 160, 240, C.craie, 3) + fleche(300, 240, 340, 240, C.craie, 3) + t(240, 380, `en tout${NB}: × ?`, C.rose, 28)
);

const lambrequins = (() => {
  // Motif centré en (x ; 200) ; la symétrie centrale le retourne.
  const motif = (x: number, sens: number, c: string) =>
    p(`M${x - 20} ${200 - 40 * sens} L${x + 20} ${200 - 40 * sens} L${x + 20} ${200 + 10 * sens} L${x} ${200 + 40 * sens} L${x - 20} ${200 + 10 * sens} Z`, c, 3, 0.35) +
    o(x, 200 - 15 * sens, 6, c, 0, 2);
  return svg("Une frise de lambrequins : un motif, son symétrique par rapport à O, puis par rapport à O' ; O et O' sont à 10 centimètres",
    l(40, 140, 440, 140, C.craie, 3) + motif(140, 1, C.jaune) + motif(260, -1, C.pale) + motif(380, 1, C.rose) +
      o(200, 200, 6, C.bleu, 1, 0) + o(320, 200, 6, C.bleu, 1, 0) + t(200, 230, "O", C.bleu, 20) + t(320, 230, "O'", C.bleu, 20) +
      l(200, 272, 320, 272, C.bleu, 2) + t(260, 296, "10 cm", C.bleu, 18) +
      fleche(140, 330, 380, 330, C.rose, 3) + t(260, 360, "?", C.rose, 24) + t(240, 405, `quelle transformation${NB}?`, C.rose, 26));
})();

const coin = (() => {
  const R = repere(-4, 4, -4, 4, { gl: 300, gh: 300, gy: 20, gx: 90, pasE: 1 });
  return svg("Deux miroirs à angle droit le long des axes ; le point A en 2 ; 3, son image A1 par l'axe des abscisses, puis A2 par l'axe des ordonnées",
    R.fond + l(R.X(-4), R.Y(0), R.X(4), R.Y(0), C.bleu, 5) + l(R.X(0), R.Y(-4), R.X(0), R.Y(4), C.bleu, 5) +
      R.point(2, 3, C.jaune, 8) + R.point(2, -3, C.pale, 7) + R.point(-2, -3, C.rose, 8) +
      l(R.X(2), R.Y(3) + 10, R.X(2), R.Y(-3) - 10, C.pale, 2, "6 6") + l(R.X(2) - 10, R.Y(-3), R.X(-2) + 10, R.Y(-3), C.pale, 2, "6 6") +
      t(R.X(2) + 12, R.Y(3) - 8, "A(2 ; 3)", C.jaune, 18, "start") + t(R.X(2) + 12, R.Y(-3) + 6, "A1", C.pale, 18, "start") + t(R.X(-2) - 12, R.Y(-3) + 6, `A2${NB}?`, C.rose, 20, "end") +
      t(240, 400, `où arrive A${NB}?`, C.rose, 26));
})();

const logo = (() => {
  const carre = (c: number, k: number, couleur: string) => {
    const h = c / 2, x = 240, y = 200;
    const coin = [[-h, -h], [h, -h], [h, h], [-h, h]][k % 4];
    return r(x - h, y - h, c, c, couleur, 0, 2.5) + o(x + coin[0], y + coin[1], 6, couleur, 1, 0);
  };
  return svg("Cinq carrés de même centre : chacun est le précédent tourné d'un quart de tour et agrandi deux fois ; un coin marqué tourne",
    carre(12, 0, C.jaune) + carre(24, 1, C.jaune) + carre(48, 2, C.bleu) + carre(96, 3, C.bleu) + carre(192, 4, C.rose) +
      t(240, 335, "¼ de tour et × 2, quatre fois", C.craie, 20) + t(240, 390, `l'aire × combien${NB}?`, C.rose, 26));
})();

const problemes: ProblemesNotion = {
  classe: "seconde",
  notionId: "composees_transformations",
  titre: "Énigmes des composées de transformations",
  description: "La porte tambour, les deux miroirs parallèles, la photocopieuse, les lambrequins des cases créoles, le piège des miroirs en coin, le défi du logo qui tourne et grandit : enchaîner rotations, symétries, homothéties, similitudes.",
  problemes: [
    {
      tag: "Énigme 1 · La porte tambour",
      titre: "Deux rotations, un seul centre",
      question: `À l'entrée d'un hôtel, une porte tambour tourne de <b>50°</b>, puis de <b>70°</b>, toujours autour du même axe.<br><br><b>De quel angle</b> un battant a-t-il tourné en tout ?`,
      reponse: `Deux rotations de même centre donnent une rotation de ce centre ; les angles s'ajoutent.<br>50° + 70° = <span class="big">120°</span>.`,
      consigne: "Rotation de 50° puis de 70°, même centre : de quel angle en tout ?",
      verification: { type: "courte", attendus: ["120"], unite: "°" },
      dessin: porte,
    },
    {
      tag: "Énigme 2 · Les deux miroirs",
      titre: "L'image de l'image",
      question: `Chez le coiffeur, deux miroirs sont <b>parallèles</b>, à <b>3 cm</b> l'un de l'autre sur le plan. Un drapeau se reflète dans le 1er, puis son image se reflète dans le 2e.<br><br><b>Quelle transformation</b> envoie le drapeau sur l'image finale ?`,
      reponse: `Deux symétries d'axes parallèles donnent une translation, perpendiculaire aux axes, de <b>deux fois</b> la distance entre eux.<br><span class="big">Une translation de 6 cm</span> : l'image finale n'est plus retournée.`,
      consigne: "Deux symétries axiales d'axes parallèles distants de 3 cm : quelle transformation ?",
      verification: { type: "qcm", choix: ["Une translation de 6 cm", "Une translation de 3 cm", "Une symétrie centrale"], bonne: 0 },
      dessin: miroirs,
    },
    {
      tag: "Énigme 3 · La photocopieuse",
      titre: "Agrandir puis réduire",
      question: `Au CDI, on agrandit une photo <b>× 2</b>, puis on réduit la copie à <b>75 %</b> (× 0,75).<br><br><b>Par combien</b> les longueurs de la photo de départ sont-elles multipliées ?`,
      reponse: `Deux homothéties de même centre : les rapports se <b>multiplient</b>.<br>2 × 0,75 = <span class="big">× 1,5</span>.`,
      consigne: "Homothétie de rapport 2 puis de rapport 0,75 : quel rapport en tout ?",
      verification: { type: "qcm", choix: ["× 2,75", "× 1,5", "× 1,25"], bonne: 1 },
      dessin: photocopie,
    },
    {
      tag: "Énigme 4 · Les lambrequins",
      titre: "La frise de la case créole",
      question: `À La Réunion, les lambrequins décorent le bord du toit des cases créoles. Un menuisier découpe un motif, puis son symétrique par rapport à O, puis le symétrique de celui-ci par rapport à O'. OO' = <b>10 cm</b>.<br><br><b>Quelle transformation</b> envoie le 1er motif sur le 3e ?`,
      reponse: `Deux symétries centrales donnent une translation de vecteur 2 × OO'.<br><span class="big">Une translation de 20 cm</span> : c'est ainsi que la frise se répète.`,
      consigne: "Symétrie de centre O puis de centre O', avec OO' = 10 cm : quelle transformation ?",
      verification: { type: "qcm", choix: ["Une symétrie centrale", "Une rotation de 90°", "Une translation de 20 cm"], bonne: 2 },
      dessin: lambrequins,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les miroirs en coin",
      sorte: "piege",
      question: `Deux miroirs forment un angle droit, le long des axes du repère. Le point A(2 ; 3) se reflète dans l'axe des abscisses, puis son image dans l'axe des ordonnées.<br><br><b>Où arrive</b> A ?`,
      reponse: `On ne revient pas à A, et ce n'est pas une symétrie axiale !<br>(2 ; 3) → (2 ; −3) → <span class="big">(−2 ; −3)</span> : c'est la symétrie de centre O, une rotation de 180°.`,
      consigne: "A(2 ; 3) : symétrie d'axe (Ox) puis d'axe (Oy). Coordonnées de l'image ?",
      verification: { type: "courte", attendus: ["(-2;-3)", "-2;-3", "(-2,-3)", "(−2;−3)", "−2;−3"] },
      dessin: coin,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le logo qui tourne et grandit",
      sorte: "defi",
      question: `Dans l'animation d'un logo, un carré tourne d'<b>un quart de tour</b> et s'agrandit <b>× 2</b>, autour du même centre. On recommence <b>4 fois</b>.<br><br><b>Par combien</b> son aire est-elle multipliée ?`,
      reponse: `Chaque étape est une similitude : les longueurs × 2, donc l'aire × 4.<br>Après 4 étapes : 4 × 4 × 4 × 4 = <span class="big">256</span>. Les angles s'ajoutent : 4 quarts de tour = un tour complet.`,
      consigne: "Quart de tour et × 2, quatre fois : par combien l'aire est-elle multipliée ?",
      verification: { type: "courte", attendus: ["256"] },
      dessin: logo,
    },
  ],
};

export default problemes;
