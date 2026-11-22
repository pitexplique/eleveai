// Énigmes à projeter — première (sans spé maths), notion alea_independance
// (l'atelier de t-shirts, les deux feux tricolores, le site de recettes, la roue
// de la fortune, piège des imprimantes du CDI, défi du yoga et de la poterie). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, o } from "../dessins-ecole";
import { tableau } from "../dessins-2de";
import { secteur, dansSecteur } from "../dessins-1re";

const coul = (cible: [number, number][]) => (i: number, j: number) =>
  cible.some(([a, b]) => a === i && b === j) ? C.jaune : i === 0 || j === 0 ? C.pale : C.craie;

const cadre = (y: number, lignes: string[], c: string = C.craie, taille = 19) =>
  r(30, y, 420, 22 + 30 * lignes.length, c, 0.08, 2, 12) + lignes.map((s, k) => t(240, y + 32 + 30 * k, s, c, taille)).join("");

const tshirts = svg("Tableau de 1 000 t-shirts : blancs 40 avec défaut, 360 sans, total 400 ; couleur 60 et 540, total 600 ; totaux 100, 900, 1 000",
  tableau(20, 60, [130, 100, 130, 80], 56, [["", "défaut", "sans défaut", "total"], ["blancs", 40, 360, 400], ["couleur", 60, 540, 600], ["total", 100, 900, "1 000"]], coul([[1, 1], [2, 1], [3, 1]]), 20) +
    t(240, 330, "40 sur 400 · 60 sur 600 · 100 sur 1 000", C.craie, 20) +
    t(240, 385, `le défaut dépend-il de la couleur${NB}?`, C.rose, 22));

const feu = (x: number, p: string) =>
  r(x - 40, 40, 80, 200, C.craie, 0.1, 3, 14) + o(x, 80, 24, C.rose, 0.2, 3) + o(x, 140, 24, C.jaune, 0.2, 3) + o(x, 200, 24, C.bleu, 0.7, 3) +
  t(x, 280, `vert${NB}: ${p}`, C.bleu, 22);
const feux = svg("Deux feux tricolores indépendants : le premier est vert avec la probabilité 0,6, le second avec la probabilité 0,5",
  feu(140, "0,6") + feu(340, "0,5") + t(240, 325, "ils sont indépendants", C.pale, 20) +
    t(240, 385, `les deux au vert${NB}?`, C.rose, 24));

const recettes = svg("Trois nombres d'un site de recettes : 50 % regardent la vidéo V, 40 % laissent une note N, 25 % font les deux",
  cadre(30, ["V · 50 % regardent la vidéo"]) + cadre(105, ["N · 40 % laissent une note"]) + cadre(180, ["V ∩ N · 25 % font les deux"], C.jaune) +
    t(240, 300, "0,5 × 0,4 = …", C.pale, 22) +
    t(240, 385, `V et N indépendants${NB}?`, C.rose, 24));

const roue = (() => {
  const cx = 240, cy = 180, R = 140;
  let s = "";
  for (let k = 0; k < 10; k++) {
    const n = k + 1, c = n <= 3 ? C.bleu : n >= 8 ? C.jaune : C.pale;
    s += secteur(cx, cy, R, 36 * k, 36 * (k + 1), c, n <= 3 || n >= 8 ? 0.45 : 0.1);
    const [x, y] = dansSecteur(cx, cy, 100, 36 * k, 36 * (k + 1));
    s += t(x, y + 9, n, C.craie, 26);
  }
  return svg("Une roue de 10 cases numérotées de 1 à 10 ; A : 1, 2 ou 3 en bleu ; B : 8, 9 ou 10 en jaune",
    s + o(cx, cy, 8, C.craie, 1, 2) +
      t(240, 352, "A : 1, 2 ou 3 · B : 8, 9 ou 10", C.craie, 20) +
      t(240, 400, `P(A ∩ B)${NB}?`, C.rose, 26));
})();

const imprimante = (x: number, nom: string, p: string) =>
  r(x - 80, 50, 160, 90, C.craie, 0.1, 3, 10) + r(x - 50, 30, 100, 24, C.craie, 0.05, 2, 4) + t(x, 105, nom, C.craie, 22) +
  t(x, 180, `en panne${NB}: ${p}`, C.bleu, 21);
const imprimantes = svg("Deux imprimantes indépendantes : la n° 1 est en panne avec la probabilité 0,3, la n° 2 avec 0,4 ; Léa dit 0,3 + 0,4 = 0,7",
  imprimante(130, "n° 1", "0,3") + imprimante(350, "n° 2", "0,4") + t(240, 230, "indépendantes", C.pale, 20) +
    t(240, 290, "Léa : « 0,3 + 0,4 = 0,7 »", C.jaune, 22) +
    t(240, 385, `au moins une en panne${NB}?`, C.rose, 24));

const mjc = svg("Tableau de 300 adhérents : yoga 120 au total, pas yoga 180 ; poterie 100 au total, pas poterie 200 ; la case yoga et poterie est inconnue",
  tableau(20, 60, [130, 100, 130, 80], 56, [["", "poterie", "pas poterie", "total"], ["yoga", "?", "…", 120], ["pas yoga", "…", "…", 180], ["total", 100, 200, 300]], coul([[1, 1]]), 20) +
    t(240, 330, "pour que yoga et poterie soient indépendants", C.craie, 19) +
    t(240, 385, `«${NB}?${NB}»${NB}=${NB}?`, C.rose, 26));

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "alea_independance",
  titre: "Énigmes de l'indépendance",
  description: "L'atelier de t-shirts, les deux feux tricolores, le site de recettes, la roue de la fortune, le piège des imprimantes du CDI, le défi du yoga et de la poterie : reconnaître deux évènements indépendants, utiliser P(A ∩ B) = P(A) × P(B), ne pas confondre indépendants et incompatibles.",
  problemes: [
    {
      tag: "Énigme 1 · L'atelier de t-shirts",
      titre: "La condition ne change rien",
      question: `Un atelier fabrique 1 000 t-shirts, blancs ou de couleur. Certains ont un défaut.<br><br><b>Le défaut dépend-il</b> de la couleur ?`,
      reponse: `P<sub>blanc</sub>(défaut) = 40 ÷ 400 = 0,1 ; P<sub>couleur</sub>(défaut) = 60 ÷ 600 = 0,1 ; P(défaut) = 100 ÷ 1 000 = 0,1.<br>Savoir la couleur ne change rien : <span class="big">indépendants</span>.`,
      consigne: "40 défauts sur 400 blancs, 60 sur 600 de couleur : le défaut dépend-il de la couleur ?",
      verification: { type: "qcm", choix: ["Non : 10 % de défauts dans les deux cas", "Oui : il y a plus de défauts en couleur", "On ne peut pas savoir"], bonne: 0 },
      dessin: tshirts,
    },
    {
      tag: "Énigme 2 · Les deux feux tricolores",
      titre: "Multiplier",
      question: `Sur le trajet du lycée, deux feux tricolores marchent de façon indépendante. Le premier est vert avec la probabilité 0,6, le second avec 0,5.<br><br><b>Quelle est la probabilité</b> d'avoir les deux feux au vert ?`,
      reponse: `Les évènements sont indépendants : on multiplie.<br>P(V₁ ∩ V₂) = 0,6 × 0,5 = <span class="big">0,3</span>.`,
      consigne: "Deux feux indépendants, verts avec 0,6 et 0,5 : quelle probabilité d'avoir les deux au vert ?",
      verification: { type: "courte", attendus: ["0,3", "0.3", "30%"] },
      dessin: feux,
    },
    {
      tag: "Énigme 3 · Le site de recettes",
      titre: "Justifier par un calcul",
      question: `Sur un site de recettes, 50 % des visiteurs regardent la vidéo (V), 40 % laissent une note (N), et 25 % font les deux.<br><br>V et N <b>sont-ils indépendants</b> ?`,
      reponse: `S'ils l'étaient, on aurait P(V ∩ N) = 0,5 × 0,4 = 0,2. Or P(V ∩ N) = 0,25.<br><span class="big">Pas indépendants</span> : ceux qui regardent la vidéo notent plus souvent.`,
      consigne: "P(V) = 0,5, P(N) = 0,4, P(V ∩ N) = 0,25 : V et N sont-ils indépendants ?",
      verification: { type: "qcm", choix: ["Oui, car 25 % font les deux", "Non, car 0,5 × 0,4 = 0,2 et pas 0,25", "Oui, car ils sont incompatibles"], bonne: 1 },
      dessin: recettes,
    },
    {
      tag: "Énigme 4 · La roue de la fortune",
      titre: "Incompatibles, pas indépendants",
      question: `Une roue a 10 cases, de 1 à 10. A : « on tombe sur 1, 2 ou 3 » ; B : « on tombe sur 8, 9 ou 10 ».<br><br>Pour savoir si A et B sont indépendants, <b>que vaut</b> P(A ∩ B) ?`,
      reponse: `A et B ne peuvent pas arriver ensemble : P(A ∩ B) = <span class="big">0</span>. Ils sont <b>incompatibles</b>.<br>Mais P(A) × P(B) = 0,3 × 0,3 = 0,09 : ils ne sont pas indépendants. Si A arrive, B devient impossible.`,
      consigne: "Une roue de 1 à 10 ; A : 1, 2 ou 3 ; B : 8, 9 ou 10. Que vaut P(A ∩ B) ?",
      verification: { type: "courte", attendus: ["0"] },
      dessin: roue,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les imprimantes du CDI",
      sorte: "piege",
      question: `Le CDI a deux imprimantes. La n° 1 est en panne avec la probabilité 0,3, la n° 2 avec 0,4, de façon indépendante.<br>Léa dit : « 0,3 + 0,4 = 0,7. »<br><br><b>Quelle est la probabilité</b> qu'au moins une soit en panne ?`,
      reponse: `On ne peut pas ajouter : les deux pannes peuvent arriver ensemble. On passe par le contraire : « les deux marchent ».<br>0,7 × 0,6 = 0,42, donc 1 − 0,42 = <span class="big">0,58</span>.`,
      consigne: "Pannes indépendantes de probabilités 0,3 et 0,4 : quelle probabilité qu'au moins une imprimante soit en panne ?",
      verification: { type: "qcm", choix: ["0,7", "0,12", "0,58"], bonne: 2 },
      dessin: imprimantes,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le yoga et la poterie",
      sorte: "defi",
      question: `Une maison des jeunes a 300 adhérents. 120 font du yoga, 100 font de la poterie.<br><br><b>Combien d'adhérents</b> doivent faire les deux pour que « yoga » et « poterie » soient indépendants ?`,
      reponse: `Il faut P(Y ∩ P) = P(Y) × P(P) = 0,4 × 1/3 = 2/15.<br>Sur 300 adhérents : 300 × 2/15 = <span class="big">40</span>. Alors 40 sur 120 yogis font de la poterie : 1/3, comme dans tout le club.`,
      consigne: "300 adhérents, 120 au yoga, 100 à la poterie : combien font les deux pour que ce soit indépendant ?",
      verification: { type: "courte", attendus: ["40"], unite: "adhérents" },
      dessin: mjc,
    },
  ],
};

export default problemes;
