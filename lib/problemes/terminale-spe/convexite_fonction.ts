// Énigmes à projeter — terminale spé maths, notion convexite_fonction
// (le hamac, la fabrique de surfs, la bande-annonce d'un film, le cerf-volant,
// piège du saladier, défi des dunes du Sahara). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l, p } from "../dessins-ecole";
import { repereXY } from "../dessins-1re";

const hamac = svg("Un hamac tendu entre deux arbres : la toile pend en creux, sous le segment pointillé qui relie ses deux attaches",
  l(60, 60, 60, 330, C.jaune, 10) + l(420, 60, 420, 330, C.jaune, 10) + l(30, 330, 450, 330, C.pale, 3) +
    l(66, 140, 414, 140, C.rose, 3, "8 6") + p("M66 140 Q240 360 414 140", C.bleu, 6) +
    t(240, 120, "la corde entre les attaches", C.rose, 20) + t(240, 290, "la toile", C.bleu, 22) +
    t(240, 395, `convexe ou concave${NB}?`, C.rose, 24));

const surfs = (() => {
  const R = repereXY(0, 8, 0, 180, { gx: 80, gy: 70, gl: 350, gh: 250, px: 1, py: 20, ex: 1, ey: 40 });
  const f = (x: number) => x ** 3 - 9 * x ** 2 + 30 * x;
  return svg("Courbe du coût C(x) = x³ − 9x² + 30x pour x de 0 à 8 ; elle change de courbure au point d'abscisse 3",
    R.fond + R.courbe(f, 0, 8, C.bleu, 4) + R.point(3, 36, C.rose, 7) +
      t(R.X(0) + 12, 32, "C(x) = x³ − 9x² + 30x", C.bleu, 22, "start") + t(R.X(0) + 12, 58, "C″(x) = 6x − 18", C.pale, 20, "start") +
      t(240, 405, `convexe à partir de x =${NB}?`, C.rose, 22));
})();

const bande = (() => {
  const R = repereXY(0, 6, 0, 120, { gx: 80, gy: 70, gl: 350, gh: 250, px: 1, py: 20, ex: 1, ey: 20 });
  const f = (x: number) => -(x ** 3) + 9 * x ** 2;
  return svg("Courbe des vues V(t) = −t³ + 9t² en milliers, pour t de 0 à 6 jours : elle monte, d'abord en creux puis en bosse",
    R.fond + R.courbe(f, 0, 6, C.bleu, 4) +
      t(R.X(0) + 12, 32, "V(t) = −t³ + 9t² (milliers)", C.bleu, 22, "start") + t(R.X(0) + 12, 58, "t en jours", C.pale, 20, "start") +
      t(240, 405, `quel jour la hausse est la plus forte${NB}?`, C.rose, 21));
})();

const cerf = (() => {
  const R = repereXY(0, 3, 0, 10, { gx: 80, gy: 50, gl: 340, gh: 280, px: 0.5, py: 1, ex: 1, ey: 2 });
  return svg("La courbe f(x) = x² + 1 pour x de 0 à 3, et sa tangente en 1, la droite y = 2x, en pointillés",
    R.fond + R.courbe((x) => x * x + 1, 0, 3, C.bleu, 4) + l(R.X(0), R.Y(0), R.X(3), R.Y(6), C.rose, 3, "8 6") + R.point(1, 2, C.jaune, 7) +
      t(R.X(2.3), R.Y(9), "f(x) = x² + 1", C.bleu, 22, "end") + t(R.X(2.95), R.Y(3.7), "y = 2x", C.rose, 22, "end") +
      t(240, 405, `au-dessus ou en dessous${NB}?`, C.rose, 22));
})();

const saladier = (() => {
  const R = repereXY(-1.2, 1.2, 0, 2.2, { gx: 80, gy: 70, gl: 340, gh: 250, px: 0.4, py: 0.5, ex: 0.4, ey: 0.5 });
  return svg("Profil du saladier : f(x) = x⁴ pour x de −1,2 à 1,2, une cuvette au fond très plat en 0",
    R.fond + R.courbe((x) => x ** 4, -1.2, 1.2, C.bleu, 5) + R.point(0, 0, C.rose, 7) +
      t(R.X(-1.15), 40, "f(x) = x⁴ · f″(x) = 12x²", C.bleu, 22, "start") +
      t(240, 405, `un point d'inflexion en 0${NB}?`, C.rose, 22));
})();

const dunes = (() => {
  const R = repereXY(-2.5, 2.5, 0, 12, { gx: 70, gy: 70, gl: 360, gh: 250, px: 0.5, py: 2, ex: 1, ey: 4 });
  return svg("Profil de deux dunes : h(x) = −x⁴ + 6x² + 1 pour x de −2,4 à 2,4, deux sommets à 10 m séparés par un creux à 1 m",
    R.fond + R.courbe((x) => -(x ** 4) + 6 * x * x + 1, -2.4, 2.4, C.jaune, 5) +
      t(240, 40, "h(x) = −x⁴ + 6x² + 1", C.bleu, 24) +
      t(240, 405, `combien de points d'inflexion${NB}?`, C.rose, 22));
})();

const problemes: ProblemesNotion = {
  classe: "terminale-spe",
  notionId: "convexite_fonction",
  titre: "Énigmes de convexité",
  description: "Le hamac, la fabrique de surfs, la bande-annonce d'un film, le cerf-volant, le piège du saladier, le défi des dunes : fonction convexe ou concave, signe de la dérivée seconde, point d'inflexion, position par rapport à une tangente.",
  problemes: [
    {
      tag: "Énigme 1 · Le hamac",
      titre: "Convexe ou concave ?",
      question: `Un hamac est tendu entre deux arbres. La toile pend en creux, <b>sous</b> la corde tirée entre ses deux attaches.<br><br>La courbe de la toile est-elle <b>convexe ou concave</b> ?`,
      reponse: `Une courbe convexe est sous ses cordes (en creux, comme un U). Ici, la toile est sous la corde.<br>Elle est <span class="big">convexe</span>.`,
      consigne: "La toile du hamac pend sous la corde entre ses attaches : sa courbe est-elle convexe ou concave ?",
      verification: { type: "qcm", choix: ["Convexe : elle est sous ses cordes", "Concave : elle est sous ses cordes", "Ni l'un ni l'autre"], bonne: 0 },
      dessin: hamac,
    },
    {
      tag: "Énigme 2 · La fabrique de surfs",
      titre: "Le signe de la dérivée seconde",
      question: `Une fabrique fait x centaines de planches de surf, x entre 0 et 8. Son coût est C(x) = x³ − 9x² + 30x, en milliers d'euros.<br><br><b>À partir de quelle valeur de x</b> la fonction C est-elle convexe ?`,
      reponse: `C′(x) = 3x² − 18x + 30 et C″(x) = 6x − 18.<br>C″(x) ≥ 0 quand x ≥ 3 : C est convexe à partir de <span class="big">x = 3</span> (300 planches).`,
      consigne: "C(x) = x³ − 9x² + 30x : à partir de quelle valeur de x la fonction C est-elle convexe ?",
      verification: { type: "courte", attendus: ["3", "x=3", "300"] },
      dessin: surfs,
    },
    {
      tag: "Énigme 3 · La bande-annonce",
      titre: "Le point d'inflexion",
      question: `La bande-annonce d'un film est en ligne depuis t jours, t entre 0 et 6. Elle a V(t) = −t³ + 9t² milliers de vues.<br><br><b>Quel jour</b> le nombre de vues augmente-t-il le plus vite ?`,
      reponse: `V′(t) = −3t² + 18t et V″(t) = −6t + 18 : V″ s'annule et change de signe en t = 3. C'est le point d'inflexion : V′ y est maximale.<br>Au <span class="big">jour 3</span>, avec 54 000 vues.`,
      consigne: "V(t) = −t³ + 9t² : pour quelle valeur de t les vues augmentent-elles le plus vite ?",
      verification: { type: "courte", attendus: ["3", "t=3", "jour 3"], unite: "jours" },
      dessin: bande,
    },
    {
      tag: "Énigme 4 · Le cerf-volant",
      titre: "La courbe et sa tangente",
      question: `Un cerf-volant suit la courbe de f(x) = x² + 1. La tangente en x = 1 est la droite y = 2x.<br><br>La courbe est-elle <b>au-dessus ou en dessous</b> de cette tangente ?`,
      reponse: `f″(x) = 2 > 0 : f est convexe, donc sa courbe est au-dessus de toutes ses tangentes.<br>En effet, f(x) − 2x = (x − 1)² ≥ 0. <span class="big">Au-dessus</span>.`,
      consigne: "f(x) = x² + 1, tangente en 1 : y = 2x. La courbe est-elle au-dessus ou en dessous ?",
      verification: { type: "qcm", choix: ["En dessous", "Elle la traverse en x = 1", "Au-dessus : f est convexe"], bonne: 2 },
      dessin: cerf,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le saladier",
      sorte: "piege",
      question: `Le profil d'un saladier est la courbe de f(x) = x⁴. Alors f″(x) = 12x², et f″(0) = 0.<br>Lina : « f″ s'annule en 0, donc la courbe a un point d'inflexion en 0. »<br><br><b>A-t-elle raison</b> ?`,
      reponse: `Un point d'inflexion demande que f″ <b>change de signe</b>. Or 12x² ≥ 0 partout : f est convexe sur tout ℝ.<br><span class="big">Non</span> : pas de point d'inflexion en 0.`,
      consigne: "f(x) = x⁴, f″(0) = 0 : la courbe a-t-elle un point d'inflexion en 0 ?",
      verification: { type: "qcm", choix: ["Oui, car f″(0) = 0", "Non : f″(x) = 12x² ne change pas de signe", "Oui, car f′(0) = 0"], bonne: 1 },
      dessin: saladier,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les dunes du Sahara",
      sorte: "defi",
      question: `Le profil de deux dunes du Sahara est h(x) = −x⁴ + 6x² + 1, en mètres, pour x entre −2,4 et 2,4 (en dizaines de mètres).<br><br><b>Combien de points d'inflexion</b> a ce profil ?`,
      reponse: `h″(x) = −12x² + 12 = 12(1 − x)(1 + x). Elle s'annule et change de signe en x = −1 et en x = 1.<br><span class="big">2 points d'inflexion</span>, à 6 m de haut.`,
      consigne: "h(x) = −x⁴ + 6x² + 1 sur [−2,4 ; 2,4] : combien de points d'inflexion ?",
      verification: { type: "courte", attendus: ["2", "deux"], unite: "points" },
      dessin: dunes,
    },
  ],
};

export default problemes;
