// Énigmes à projeter — seconde, notion geometrie_problemes_plan (le terrain
// 9-12-15, la voile du bateau, l'arroseur, le quadrilatère mystère, piège du
// drone 6 + 8, défi du cercle des trois lampadaires). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l, p, o } from "../dessins-ecole";
import { repere } from "../dessins-2de";

// Terrain 9-12-15 (1 m = 20 px).
const terrain = svg(
  "Un terrain triangulaire de côtés 9 mètres, 12 mètres et 15 mètres",
  p("M100 320 L340 320 L100 140 Z", C.jaune, 4, 0.15) + t(220, 355, "12 m", C.craie, 24) + t(85, 235, "9 m", C.craie, 24, "end") + t(235, 215, "15 m", C.craie, 24, "start") +
    t(240, 400, `rectangle${NB}?`, C.rose, 26)
);

const voile = (() => {
  const R = repere(0, 8, 0, 6, { gl: 360, gh: 270, gy: 40, gx: 70 });
  return svg("Une voile triangulaire A de coordonnées 1 et 1, B de coordonnées 7 et 1, C de coordonnées 4 et 5",
    R.fond + p(`M${R.X(1)} ${R.Y(1)} L${R.X(7)} ${R.Y(1)} L${R.X(4)} ${R.Y(5)} Z`, C.bleu, 4, 0.2) +
      t(R.X(1) - 8, R.Y(1) + 26, "A", C.craie, 22) + t(R.X(7) + 8, R.Y(1) + 26, "B", C.craie, 22) + t(R.X(4), R.Y(5) - 12, "C", C.craie, 22) + t(240, 395, `aire${NB}?`, C.rose, 26));
})();

const arroseur = (() => {
  const R = repere(0, 6, 0, 6, { gl: 300, gh: 300, gy: 40, gx: 90 });
  const ray = R.X(5) - R.X(0);
  return svg("Un arroseur à l'origine qui arrose à 5 mètres, et trois points A, B, C",
    R.fond + `<path d="M${R.X(5)} ${R.Y(0)} A${ray} ${ray} 0 0 0 ${R.X(0)} ${R.Y(5)}" fill="none" stroke="${C.bleu}" stroke-width="3" stroke-dasharray="10 6"/>` +
      R.point(3, 4, C.jaune, 9) + R.point(4, 4, C.jaune, 9) + R.point(5, 1, C.jaune, 9) +
      t(R.X(3) - 12, R.Y(4) - 10, "A", C.craie, 20, "end") + t(R.X(4) + 12, R.Y(4) - 10, "B", C.craie, 20, "start") + t(R.X(5) + 12, R.Y(1) - 8, "C", C.craie, 20, "start"));
})();

const mystere = (() => {
  const R = repere(-1, 6, 0, 6, { gl: 350, gh: 300, gy: 40, gx: 65 });
  return svg("Un quadrilatère A de coordonnées 1 et 1, B 5 et 3, C 4 et 5, D 0 et 3",
    R.fond + p(`M${R.X(1)} ${R.Y(1)} L${R.X(5)} ${R.Y(3)} L${R.X(4)} ${R.Y(5)} L${R.X(0)} ${R.Y(3)} Z`, C.jaune, 4, 0.2) +
      t(R.X(1), R.Y(1) + 28, "A", C.craie, 22) + t(R.X(5) + 16, R.Y(3) + 6, "B", C.craie, 22, "start") + t(R.X(4), R.Y(5) - 12, "C", C.craie, 22) + t(R.X(0) - 14, R.Y(3) - 8, "D", C.craie, 22, "end") +
      t(240, 395, `quelle nature${NB}?`, C.rose, 24));
})();

const drone = (() => {
  const R = repere(0, 10, 0, 9, { gl: 330, gh: 300, gy: 40, gx: 80, pas: 1, pasE: 2 });
  return svg("Un drone part de l'origine, va 6 mètres à l'est puis 8 mètres au nord",
    R.fond + l(R.X(0), R.Y(0), R.X(6), R.Y(0), C.bleu, 5) + l(R.X(6), R.Y(0), R.X(6), R.Y(8), C.bleu, 5) + l(R.X(0), R.Y(0), R.X(6), R.Y(8), C.rose, 3, "10 8") +
      R.point(6, 8, C.jaune, 11) + t(R.X(3), R.Y(0) - 12, "6 m", C.bleu, 22) + t(R.X(6) + 12, R.Y(4), "8 m", C.bleu, 22, "start") + t(R.X(2.4), R.Y(4.6), `?`, C.rose, 30));
})();

const lampadaires = (() => {
  const R = repere(-2, 8, -1, 9, { gl: 330, gh: 330, gy: 30, gx: 80 });
  const ray = R.X(5) - R.X(0);
  return svg("Trois lampadaires en O, en B de coordonnées 6 et 0, en C de coordonnées 0 et 8, et le cercle qui passe par les trois",
    R.fond + o(R.X(3), R.Y(4), ray, C.bleu, 0, 3).replace("/>", ` stroke-dasharray="10 6"/>`) + R.point(0, 0, C.jaune, 10) + R.point(6, 0, C.jaune, 10) + R.point(0, 8, C.jaune, 10) +
      t(R.X(6) + 6, R.Y(0) + 28, "B", C.craie, 22) + t(R.X(0) + 14, R.Y(8) + 2, "C", C.craie, 22, "start") + t(R.X(3), R.Y(4), `rayon${NB}?`, C.rose, 24));
})();

const problemes: ProblemesNotion = {
  classe: "seconde",
  notionId: "geometrie_problemes_plan",
  titre: "Énigmes de géométrie plane",
  description: "Le terrain 9-12-15, la voile du bateau, l'arroseur de jardin, le quadrilatère mystère, le piège du drone, le défi du cercle des trois lampadaires : démontrer avec des longueurs, des milieux et des coordonnées.",
  problemes: [
    {
      tag: "Énigme 1 · Le terrain",
      titre: "9, 12, 15",
      question: `Un terrain triangulaire a des côtés de <b>9 m</b>, <b>12 m</b> et <b>15 m</b>.<br><br><b>Est-il rectangle</b> ?`,
      reponse: `Le plus grand côté : 15² = 225. Les deux autres : 9² + 12² = 81 + 144 = 225.<br>Égalité : d'après la réciproque de Pythagore, <span class="big">oui</span>, rectangle en l'angle opposé au côté de 15 m.`,
      consigne: "Un triangle de côtés 9, 12, 15 est-il rectangle ?",
      verification: { type: "qcm", choix: ["Oui, en face du côté de 15 m", "Non", "On ne peut pas savoir"], bonne: 0 },
      dessin: terrain,
    },
    {
      tag: "Énigme 2 · La voile",
      titre: "Une voile triangulaire",
      question: `Sur un plan en mètres, une voile a pour sommets <b>A(1 ; 1)</b>, <b>B(7 ; 1)</b> et <b>C(4 ; 5)</b>.<br><br><b>Quelle est son aire</b> ?`,
      reponse: `Base [AB] horizontale : AB = 7 − 1 = 6. Hauteur : la distance de C à (AB), 5 − 1 = 4.<br>Aire = 6 × 4 ÷ 2 = <span class="big">12 m²</span>.`,
      consigne: "Aire du triangle A(1 ; 1), B(7 ; 1), C(4 ; 5) ?",
      verification: { type: "courte", attendus: ["12"], unite: "m²" },
      dessin: voile,
    },
    {
      tag: "Énigme 3 · L'arroseur",
      titre: "Arrosé ou pas ?",
      question: `Un arroseur en O(0 ; 0) arrose tout ce qui est à <b>5 m ou moins</b>.<br><br><b>Lequel</b> de ces points est arrosé ?<br>A(3 ; 4), B(4 ; 4), C(5 ; 1)`,
      reponse: `OA = √(9 + 16) = √25 = 5 ✓. OB = √(16 + 16) = √32 ≈ 5,7 ✗. OC = √(25 + 1) = √26 ≈ 5,1 ✗.<br>Seul <span class="big">A(3 ; 4)</span> est arrosé, tout juste au bord.`,
      consigne: "Lequel des trois points est à 5 m ou moins de O ?",
      verification: { type: "qcm", choix: ["B(4 ; 4)", "A(3 ; 4)", "C(5 ; 1)"], bonne: 1 },
      dessin: arroseur,
    },
    {
      tag: "Énigme 4 · Le quadrilatère mystère",
      titre: "Quelle nature ?",
      question: `<b>A(1 ; 1)</b>, <b>B(5 ; 3)</b>, <b>C(4 ; 5)</b>, <b>D(0 ; 3)</b>.<br>On sait que ABCD est un parallélogramme, et que ses diagonales AC et BD mesurent toutes deux 5.<br><br><b>Quelle est sa nature</b> ?`,
      reponse: `AC = √(3² + 4²) = 5 et BD = √(5² + 0²) = 5.<br>Un parallélogramme aux diagonales de même longueur est un <span class="big">rectangle</span>.<br>Pas un carré : AB = √20 et AD = √5 ne sont pas égaux.`,
      consigne: "Quelle est la nature de ABCD ?",
      verification: { type: "qcm", choix: ["un losange", "un carré", "un rectangle"], bonne: 2 },
      dessin: mystere,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le drone",
      sorte: "piege",
      question: `Un drone part de O. Il vole <b>6 m vers l'est</b>, puis <b>8 m vers le nord</b>.<br><br><b>À combien de mètres</b> est-il de son point de départ ?`,
      reponse: `Pas 6 + 8 = 14 : ça, c'est le chemin parcouru !<br>En ligne droite : √(6² + 8²) = √(36 + 64) = √100 = <span class="big">10 m</span>.`,
      consigne: "À quelle distance du départ est le drone, en mètres ?",
      verification: { type: "courte", attendus: ["10"], unite: "m" },
      dessin: drone,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les trois lampadaires",
      sorte: "defi",
      question: `Trois lampadaires sont en <b>O(0 ; 0)</b>, <b>B(6 ; 0)</b> et <b>C(0 ; 8)</b>. On trace une allée circulaire qui passe par les trois.<br><br><b>Quel est son rayon</b> ?`,
      reponse: `Le triangle OBC est rectangle en O : son cercle circonscrit a pour diamètre l'hypoténuse [BC].<br>BC = √(36 + 64) = 10, donc rayon <span class="big">5</span>, centre (3 ; 4), le milieu de [BC].`,
      consigne: "Rayon du cercle passant par O(0 ; 0), B(6 ; 0), C(0 ; 8) ?",
      verification: { type: "courte", attendus: ["5"] },
      dessin: lampadaires,
    },
  ],
};

export default problemes;
