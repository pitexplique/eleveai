// Énigmes à projeter — première (sans spé maths), notion alea_arbre_calcul
// (la location d'utilitaires, les graines du jardinier, l'escape game, le
// concours photo, piège des fraises sous serre, défi du tri postal). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t } from "../dessins-ecole";
import { arbre2, tableau } from "../dessins-2de";

const Ps = (cond: string, ev: string) => `P<tspan dy="7" font-size="15">${cond}</tspan><tspan dy="-7">(${ev})</tspan>`;

const coul = (cible: [number, number][]) => (i: number, j: number) =>
  cible.some(([a, b]) => a === i && b === j) ? C.jaune : i === 0 || j === 0 ? C.pale : C.craie;

const location = svg("Arbre pondéré : utilitaire U 0,4, non U 0,6 ; sachant U, rendu en retard R 0,25, non R 0,75 ; sachant non U, R 0,1, non R 0,9",
  arbre2([["U", "0,4"], ["non U", "0,6"]], [[["R", "0,25"], ["non R", "0,75"]], [["R", "0,1"], ["non R", "0,9"]]], { yb: 300 }) +
    t(240, 350, "U : utilitaire · R : rendu en retard", C.pale, 18) +
    t(240, 400, `P(U ∩ R)${NB}?`, C.rose, 26));

const graines = svg("Arbre pondéré : sachet A 0,7, sachet B 0,3 ; sachant A, la graine germe G 0,9, non G 0,1 ; sachant B, G 0,6, non G 0,4",
  arbre2([["A", "0,7"], ["B", "0,3"]], [[["G", "0,9"], ["non G", "0,1"]], [["G", "0,6"], ["non G", "0,4"]]], { yb: 300 }) +
    t(240, 350, "A, B : les deux sachets · G : la graine germe", C.pale, 18) +
    t(240, 400, `P(G)${NB}?`, C.rose, 26));

const escape = svg("Arbre pondéré : famille F 0,6, non F 0,4 ; sachant F, sort à temps S 0,75, non S 0,25 ; sachant non F, S 0,5, non S 0,5 ; 400 groupes",
  arbre2([["F", "0,6"], ["non F", "0,4"]], [[["S", "0,75"], ["non S", "0,25"]], [["S", "0,5"], ["non S", "0,5"]]], { yb: 300 }) +
    t(240, 350, "F : famille · S : sort à temps · 400 groupes", C.pale, 18) +
    t(240, 400, `familles sorties à temps${NB}?`, C.rose, 24));

const photo = svg("Tableau de 200 photos d'un concours : couleur 36 primées, 84 non primées, total 120 ; noir et blanc 20 et 60, total 80 ; totaux 56, 144, 200",
  tableau(10, 60, [170, 100, 120, 70], 56, [["", "primée", "non primée", "total"], ["couleur", 36, 84, 120], ["noir et blanc", 20, 60, 80], ["total", 56, 144, 200]], coul([[2, 1], [2, 3]]), 19) +
    t(240, 330, "dans l'arbre : branche « noir et blanc → primée »", C.craie, 19) + t(240, 390, `quel nombre${NB}?`, C.rose, 26));

const fraises = svg("Arbre pondéré : serre 1 S1 0,8, serre 2 S2 0,2 ; sachant S1, fraise abîmée A 0,1, non A 0,9 ; sachant S2, A 0,3, non A 0,7",
  arbre2([["S1", "0,8"], ["S2", "0,2"]], [[["A", "0,1"], ["non A", "0,9"]], [["A", "0,3"], ["non A", "0,7"]]], { yb: 300 }) +
    t(240, 350, "Tom : « 10 % + 30 % = 40 % d'abîmées »", C.jaune, 19) +
    t(240, 400, `P(A)${NB}?`, C.rose, 26));

const postal = svg("Arbre pondéré : machine A 0,7, machine B 0,3 ; sachant A, erreur E 0,02, non E 0,98 ; sachant B, E 0,04, non E 0,96",
  arbre2([["A", "0,7"], ["B", "0,3"]], [[["E", "0,02"], ["non E", "0,98"]], [["E", "0,04"], ["non E", "0,96"]]], { yb: 300 }) +
    t(240, 350, "A, B : les deux machines · E : lettre mal triée", C.pale, 18) +
    t(240, 400, `${Ps("E", "B")}${NB}?`, C.rose, 26));

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "alea_arbre_calcul",
  titre: "Énigmes des calculs sur un arbre pondéré",
  description: "La location d'utilitaires, les graines du jardinier, l'escape game, le concours photo, le piège des fraises sous serre, le défi du tri postal : multiplier le long d'un chemin, ajouter des chemins, passer d'un arbre à un tableau et inversement.",
  problemes: [
    {
      tag: "Énigme 1 · La location d'utilitaires",
      titre: "Le long d'un chemin",
      question: `Une agence loue 40 % d'utilitaires (U). Parmi eux, 25 % sont rendus en retard (R).<br><br><b>Quelle est la probabilité</b> qu'une location soit un utilitaire ET rendue en retard ?`,
      reponse: `On suit le chemin U puis R, et on multiplie les branches.<br>P(U ∩ R) = 0,4 × 0,25 = <span class="big">0,1</span>.`,
      consigne: "Chemin U puis R sur l'arbre : que vaut P(U ∩ R) ?",
      verification: { type: "courte", attendus: ["0,1", "0.1", "10%"] },
      dessin: location,
    },
    {
      tag: "Énigme 2 · Les graines du jardinier",
      titre: "Ajouter des chemins",
      question: `Un jardinier sème des graines de deux sachets. 70 % viennent du sachet A : 90 % d'entre elles germent. Les autres viennent du sachet B : 60 % germent.<br><br><b>Quelle est la probabilité</b> qu'une graine germe ?`,
      reponse: `Deux chemins mènent à G : 0,7 × 0,9 = 0,63 et 0,3 × 0,6 = 0,18.<br>P(G) = 0,63 + 0,18 = <span class="big">0,81</span>.`,
      consigne: "Deux chemins mènent à G : quelle est la probabilité qu'une graine germe ?",
      verification: { type: "qcm", choix: ["0,81", "1,5", "0,75"], bonne: 0 },
      dessin: graines,
    },
    {
      tag: "Énigme 3 · L'escape game",
      titre: "De l'arbre au tableau",
      question: `Un escape game reçoit 400 groupes. 60 % sont des familles (F). 75 % des familles sortent à temps (S), contre 50 % des autres groupes.<br><br><b>Combien de familles</b> sortent à temps ?`,
      reponse: `P(F ∩ S) = 0,6 × 0,75 = 0,45.<br>Sur 400 groupes : 0,45 × 400 = <span class="big">180 familles</span>. C'est la case « familles · sorties à temps » du tableau.`,
      consigne: "400 groupes, 60 % de familles, 75 % des familles sortent à temps : combien de familles sortent à temps ?",
      verification: { type: "courte", attendus: ["180"], unite: "familles" },
      dessin: escape,
    },
    {
      tag: "Énigme 4 · Le concours photo",
      titre: "Du tableau à l'arbre",
      question: `Un concours reçoit 200 photos, en couleur ou en noir et blanc. On veut dessiner l'arbre « type de photo, puis primée ou non ».<br><br><b>Quel nombre</b> écrire sur la branche « noir et blanc → primée » ?`,
      reponse: `Sur la branche, on se place <b>parmi</b> les 80 photos en noir et blanc : 20 sont primées.<br>20 ÷ 80 = <span class="big">0,25</span>.`,
      consigne: "20 photos primées parmi les 80 en noir et blanc : quel nombre sur la branche ?",
      verification: { type: "qcm", choix: ["0,1", "0,36", "0,25"], bonne: 2 },
      dessin: photo,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les fraises sous serre",
      sorte: "piege",
      question: `Une ferme cueille 80 % de ses fraises dans la serre 1 (10 % abîmées) et 20 % dans la serre 2 (30 % abîmées).<br>Tom dit : « 10 % + 30 % = 40 % des fraises sont abîmées. »<br><br><b>Quelle est la probabilité</b> qu'une fraise soit abîmée ?`,
      reponse: `On n'ajoute pas les branches : on ajoute les <b>chemins</b>.<br>0,8 × 0,1 + 0,2 × 0,3 = 0,08 + 0,06 = <span class="big">0,14</span>. Seulement 14 % : la serre 2 donne peu de fraises.`,
      consigne: "Serre 1 : 80 %, dont 10 % abîmées ; serre 2 : 20 %, dont 30 % abîmées. Quelle probabilité qu'une fraise soit abîmée ?",
      verification: { type: "qcm", choix: ["0,4", "0,14", "0,2"], bonne: 1 },
      dessin: fraises,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le tri postal",
      sorte: "defi",
      question: `Un centre postal a deux machines. A trie 70 % des lettres et se trompe 2 fois sur 100. B trie le reste et se trompe 4 fois sur 100.<br><br>Une lettre est mal triée. <b>Quelle est la probabilité</b> qu'elle vienne de la machine B ?`,
      reponse: `P(E) = 0,7 × 0,02 + 0,3 × 0,04 = 0,014 + 0,012 = 0,026.<br>P<sub>E</sub>(B) = 0,012 ÷ 0,026 = <span class="big">6/13</span>, environ 0,46. B trie peu, mais fait presque la moitié des erreurs.`,
      consigne: "P(E ∩ B) = 0,012 et P(E) = 0,026 : quelle probabilité que la lettre vienne de B ? (fraction ou arrondi au centième)",
      verification: { type: "courte", attendus: ["6/13", "0,46", "0.46", "0,462"] },
      dessin: postal,
    },
  ],
};

export default problemes;
