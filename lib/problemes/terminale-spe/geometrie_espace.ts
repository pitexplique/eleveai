// Énigmes à projeter — terminale spé maths, notion geometrie_espace
// (le crochet de la grue, les lasers du spectacle, l'avion de ligne, le toit du
// hangar, piège des câbles du téléphérique, défi du rayon de soleil). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, p, fleche } from "../dessins-ecole";
import { tableau } from "../dessins-2de";
import { espace, vec, vecS } from "../dessins-tle";

const grue = (() => {
  const E = espace(170, 300, 40);
  return svg("Repère de l'espace : le crochet d'une grue va de A(2 ; 0 ; 1) à B(6 ; 4 ; 5) ; le point du milieu est inconnu",
    E.axes(5, 7, 6) + E.seg([2, 0, 1], [6, 4, 5], C.bleu, 4, "10 7") + E.pt([2, 0, 1], "A", C.craie, -12, 20) + E.pt([6, 4, 5], "B", C.craie, 12, -8) +
      E.pt([4, 2, 3], "?", C.rose, -14, -10, 26) + t(240, 405, `le milieu de [AB]${NB}?`, C.rose, 24));
})();

const lasers = svg("Deux faisceaux laser de vecteurs directeurs u(2 ; −1 ; 3) et v(−4 ; 2 ; −6)",
  fleche(60, 90, 400, 50, C.bleu, 4) + fleche(400, 140, 60, 180, C.jaune, 4) +
    vecS(120, 260, "u", C.bleu, 30) + t(150, 260, "(2 ; −1 ; 3)", C.bleu, 28, "start") +
    vecS(120, 320, "v", C.jaune, 30) + t(150, 320, "(−4 ; 2 ; −6)", C.jaune, 28, "start") +
    t(240, 395, `parallèles${NB}?`, C.rose, 26));

const avion = svg("Tableau de la position d'un avion : x = 1 + 2t, y = 3 + t, z = 0,5t ; à t = 0 la position est (1 ; 3 ; 0), à t = 4 elle est inconnue",
  t(240, 50, "x = 1 + 2t  ·  y = 3 + t  ·  z = 0,5t", C.bleu, 24) +
    tableau(60, 90, [90, 90, 90, 90], 60, [["t", "x", "y", "z"], [0, 1, 3, 0], [4, "?", "?", "?"]], (i, j) => (i === 2 && j > 0 ? C.rose : i === 0 ? C.pale : C.craie), 26) +
    t(240, 320, "t en minutes, x, y, z en km", C.pale, 20) + t(240, 390, `la position à t = 4${NB}?`, C.rose, 24));

const hangar = svg("Le toit d'un hangar, dans le plan d'équation 2x + y − z − 4 = 0, et le point M(1 ; 3 ; 1)",
  t(240, 50, "toit : 2x + y − z − 4 = 0", C.bleu, 26) +
    p("M40 320 L300 320 L440 210 L180 210 Z", C.bleu, 3, 0.15) + `<circle cx="200" cy="262" r="7" fill="${C.rose}"/>` +
    t(214, 256, "M(1 ; 3 ; 1)", C.rose, 24, "start") + t(240, 390, `M sur le toit${NB}?`, C.rose, 26));

const telepherique = (() => {
  const E = espace(150, 320, 40);
  return svg("Deux câbles de téléphérique : câble 1 de points (t ; 1 ; 2), câble 2 de points (3 ; s ; 3) ; sur le dessin, ils semblent se croiser",
    E.axes(5, 7, 6) + E.seg([0, 1, 2], [6, 1, 2], C.bleu, 4) + E.seg([3, 0, 3], [3, 7, 3], C.jaune, 4) +
      t(210, 60, "câble 1 : (t ; 1 ; 2)", C.bleu, 22, "start") + t(210, 92, "câble 2 : (3 ; s ; 3)", C.jaune, 22, "start") +
      t(240, 405, `se croisent-ils${NB}?`, C.rose, 24));
})();

const soleil = (() => {
  const E = espace(150, 330, 25);
  return svg("Un rayon de soleil part de S(0 ; 0 ; 10) et suit x = t, y = 2t, z = 10 − 2t ; il touche le sol z = 0 en un point inconnu",
    E.axes(5, 11, 11) + E.seg([0, 0, 10], [5, 10, 0], C.jaune, 4, "10 7") + E.pt([0, 0, 10], "S", C.jaune, 14, 6) + E.pt([5, 10, 0], "?", C.rose, 12, -12, 26) +
      t(250, 120, "x = t", C.jaune, 22, "start") + t(250, 150, "y = 2t", C.jaune, 22, "start") + t(250, 180, "z = 10 − 2t", C.jaune, 22, "start") +
      t(240, 410, `où touche-t-il le sol${NB}?`, C.rose, 22));
})();

const problemes: ProblemesNotion = {
  classe: "terminale-spe",
  notionId: "geometrie_espace",
  titre: "Énigmes de géométrie dans l'espace",
  description: "Le crochet de la grue, les lasers du spectacle, l'avion de ligne, le toit du hangar, le piège des câbles du téléphérique, le défi du rayon de soleil : coordonnées, vecteurs colinéaires, représentation paramétrique d'une droite, équation cartésienne d'un plan, positions relatives.",
  problemes: [
    {
      tag: "Énigme 1 · Le crochet de la grue",
      titre: "Le milieu dans l'espace",
      question: `Le crochet d'une grue de chantier va de A(2 ; 0 ; 1) à B(6 ; 4 ; 5), en mètres, en ligne droite.<br><br><b>Quelles sont les coordonnées</b> du crochet à mi-chemin ?`,
      reponse: `Le milieu de [AB] : on fait la moyenne de chaque coordonnée.<br>((2 + 6) ÷ 2 ; (0 + 4) ÷ 2 ; (1 + 5) ÷ 2) = <span class="big">(4 ; 2 ; 3)</span>.`,
      consigne: "A(2 ; 0 ; 1) et B(6 ; 4 ; 5) : coordonnées du milieu de [AB] ? (écrire x;y;z)",
      verification: { type: "courte", attendus: ["(4;2;3)", "4;2;3", "(4,2,3)"] },
      dessin: grue,
    },
    {
      tag: "Énigme 2 · Les lasers du spectacle",
      titre: "Des vecteurs colinéaires",
      question: `Deux faisceaux laser d'un spectacle ont pour vecteurs directeurs ${vec("u")}(2 ; −1 ; 3) et ${vec("v")}(−4 ; 2 ; −6).<br><br><b>Les faisceaux sont-ils parallèles</b> ?`,
      reponse: `−4 = −2 × 2, 2 = −2 × (−1), −6 = −2 × 3 : ${vec("v")} = −2${vec("u")}.<br>Les vecteurs sont colinéaires : <span class="big">oui, parallèles</span> (en sens contraires).`,
      consigne: "u(2 ; −1 ; 3) et v(−4 ; 2 ; −6) : les faisceaux sont-ils parallèles ?",
      verification: { type: "qcm", choix: ["Oui : v = −2u", "Non : les signes changent", "Oui : v = 2u"], bonne: 0 },
      dessin: lasers,
    },
    {
      tag: "Énigme 3 · L'avion de ligne",
      titre: "Une représentation paramétrique",
      question: `Un avion vole en ligne droite. Sa position, en km, après t minutes : x = 1 + 2t, y = 3 + t, z = 0,5t.<br><br><b>Où est l'avion</b> au bout de 4 minutes ?`,
      reponse: `On remplace t par 4 : x = 1 + 8 = 9, y = 3 + 4 = 7, z = 0,5 × 4 = 2.<br>L'avion est en <span class="big">(9 ; 7 ; 2)</span>, à 2 km d'altitude.`,
      consigne: "x = 1 + 2t, y = 3 + t, z = 0,5t : position à t = 4 ? (écrire x;y;z)",
      verification: { type: "courte", attendus: ["(9;7;2)", "9;7;2", "(9,7,2)"] },
      dessin: avion,
    },
    {
      tag: "Énigme 4 · Le toit du hangar",
      titre: "Un point dans un plan",
      question: `Le toit d'un hangar est dans le plan d'équation 2x + y − z − 4 = 0. Un capteur est placé en M(1 ; 3 ; 1).<br><br><b>Le capteur est-il sur le toit</b> ?`,
      reponse: `On remplace : 2 × 1 + 3 − 1 − 4 = 0.<br>L'équation est vérifiée : <span class="big">oui, M est sur le toit</span>.`,
      consigne: "Plan 2x + y − z − 4 = 0 et M(1 ; 3 ; 1) : M est-il dans le plan ?",
      verification: { type: "qcm", choix: ["Non, M est au-dessus du toit", "On ne peut pas savoir", "Oui, M est sur le toit"], bonne: 2 },
      dessin: hangar,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les câbles du téléphérique",
      sorte: "piege",
      question: `Deux câbles de téléphérique sont droits. Câble 1 : les points (t ; 1 ; 2). Câble 2 : les points (3 ; s ; 3).<br>Leurs directions ne sont pas parallèles. Tom dit : « Donc ils se croisent. »<br><br><b>Les câbles se croisent-ils</b> ?`,
      reponse: `Pour se croiser, il faudrait t = 3, s = 1 et 2 = 3 : impossible !<br><span class="big">Non</span> : dans l'espace, deux droites non parallèles peuvent ne pas être coplanaires.`,
      consigne: "Droites (t ; 1 ; 2) et (3 ; s ; 3) : se coupent-elles ?",
      verification: { type: "qcm", choix: ["Oui, en (3 ; 1 ; 2)", "Non : elles ne sont pas coplanaires", "Oui, car elles ne sont pas parallèles"], bonne: 1 },
      dessin: telepherique,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le rayon de soleil",
      sorte: "defi",
      question: `Un rayon de soleil part du haut d'un mât S(0 ; 0 ; 10). Il suit la droite x = t, y = 2t, z = 10 − 2t.<br><br><b>En quel point</b> touche-t-il le sol, le plan z = 0 ?`,
      reponse: `Sur le sol, z = 0 : 10 − 2t = 0, donc t = 5.<br>Alors x = 5 et y = 10 : le rayon touche le sol en <span class="big">(5 ; 10 ; 0)</span>.`,
      consigne: "Droite x = t, y = 2t, z = 10 − 2t : point d'intersection avec le plan z = 0 ? (écrire x;y;z)",
      verification: { type: "courte", attendus: ["(5;10;0)", "5;10;0", "(5,10,0)"] },
      dessin: soleil,
    },
  ],
};

export default problemes;
