// Énigmes à projeter — terminale spé maths, notion denombrement_combinatoire
// (le digicode de l'immeuble, le podium de karting, le poke bowl, les poignées
// de main du volley, piège des aquarelles, défi du smoothie). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l, r, o } from "../dessins-ecole";

const digicode = (() => {
  let s = r(150, 40, 180, 50, C.craie, 0.06, 3, 8) + t(240, 76, "_ _ _ ·  _", C.bleu, 30);
  const touches = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "0", "B"];
  touches.forEach((k, i) => {
    const x = 150 + (i % 3) * 64, y = 110 + Math.floor(i / 3) * 56;
    s += r(x, y, 52, 44, k === "A" || k === "B" ? C.jaune : C.craie, 0.08, 2.5, 8) + t(x + 26, y + 31, k, k === "A" || k === "B" ? C.jaune : C.craie, 24);
  });
  s += r(214, 334, 52, 44, C.jaune, 0.08, 2.5, 8) + t(240, 365, "C", C.jaune, 24);
  return svg("Clavier d'un digicode : trois chiffres puis une lettre A, B ou C", s + t(240, 408, `combien de codes${NB}?`, C.rose, 22));
})();

const podium = svg("Podium d'une course de karting à 8 pilotes : trois marches 1, 2 et 3",
  r(175, 150, 130, 170, C.jaune, 0.25) + r(45, 210, 130, 110, C.bleu, 0.2) + r(305, 245, 130, 75, C.bleu, 0.2) +
    t(240, 250, "1er", C.jaune, 34) + t(110, 280, "2e", C.bleu, 30) + t(370, 295, "3e", C.bleu, 28) +
    t(240, 130, "?", C.rose, 34) + t(110, 190, "?", C.rose, 34) + t(370, 225, "?", C.rose, 34) +
    t(240, 60, "8 pilotes au départ", C.craie, 26) + t(240, 385, `combien de podiums${NB}?`, C.rose, 24));

const bowl = (() => {
  let s = "";
  for (let i = 0; i < 10; i++) {
    const x = 60 + (i % 5) * 90, y = 90 + Math.floor(i / 5) * 100, choisi = i === 1 || i === 5 || i === 8;
    s += o(x, y, 32, choisi ? C.jaune : C.craie, choisi ? 0.25 : 0.06, 3) + t(x, y + 9, i + 1, choisi ? C.jaune : C.craie, 24);
  }
  return svg("Dix garnitures numérotées de 1 à 10 ; trois sont choisies (2, 6 et 9)",
    s + t(240, 300, "3 garnitures parmi 10", C.craie, 24) + t(240, 340, "l'ordre ne compte pas", C.pale, 20) + t(240, 395, `combien de bowls${NB}?`, C.rose, 24));
})();

const volley = (() => {
  const pts = Array.from({ length: 6 }, (_, k) => [240 + 130 * Math.cos((k * Math.PI) / 3 - Math.PI / 2), 185 + 130 * Math.sin((k * Math.PI) / 3 - Math.PI / 2)]);
  let s = "";
  for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) s += l(+pts[i][0].toFixed(1), +pts[i][1].toFixed(1), +pts[j][0].toFixed(1), +pts[j][1].toFixed(1), C.bleu, 2.5);
  pts.forEach(([x, y]) => (s += o(+x.toFixed(1), +y.toFixed(1), 18, C.craie, 0.9, 3)));
  return svg("Six joueurs de volley aux sommets d'un hexagone ; chaque paire est reliée par un trait (une poignée de main)",
    s + t(240, 395, `combien de poignées de main${NB}?`, C.rose, 24));
})();

const aquarelles = (() => {
  let s = r(30, 40, 420, 170, C.craie, 0.05, 3, 12);
  for (let i = 0; i < 12; i++) {
    const x = 75 + (i % 6) * 66, y = 90 + Math.floor(i / 6) * 70, choisi = i === 2 || i === 9;
    s += o(x, y, 24, choisi ? C.bleu : C.pale, choisi ? 0.5 : 0.15, 3);
  }
  return svg("Boîte de 12 pastilles d'aquarelle ; deux sont mélangées",
    s + t(240, 270, "Tom : « 12 × 11 = 132 mélanges »", C.jaune, 22) + t(240, 380, `combien de mélanges${NB}?`, C.rose, 24));
})();

const smoothie = (() => {
  const fruits = ["mangue", "fraise", "banane", "kiwi", "ananas", "pomme"];
  let s = "";
  fruits.forEach((f, i) => {
    const y = 50 + i * 50;
    s += t(150, y + 8, f, C.craie, 22, "end") + r(180, y - 16, 80, 34, C.bleu, 0.15, 2.5, 8) + t(220, y + 8, "oui", C.bleu, 20) +
      r(280, y - 16, 80, 34, C.pale, 0.08, 2.5, 8) + t(320, y + 8, "non", C.pale, 20);
  });
  return svg("Six fruits : pour chacun, oui ou non dans le smoothie", s + t(240, 390, `au moins un fruit${NB}: combien${NB}?`, C.rose, 22));
})();

const problemes: ProblemesNotion = {
  classe: "terminale-spe",
  notionId: "denombrement_combinatoire",
  titre: "Énigmes de dénombrement et de combinatoire",
  description: "Le digicode de l'immeuble, le podium de karting, le poke bowl, les poignées de main du volley, le piège des aquarelles, le défi du smoothie : principe multiplicatif, arrangements, combinaisons, coefficients binomiaux et parties d'un ensemble.",
  problemes: [
    {
      tag: "Énigme 1 · Le digicode de l'immeuble",
      titre: "Le principe multiplicatif",
      question: `Le code d'un immeuble s'écrit avec trois chiffres (de 0 à 9), puis une lettre : A, B ou C.<br><br><b>Combien de codes</b> différents existe-t-il ?`,
      reponse: `On multiplie les choix de chaque case : 10 × 10 × 10 × 3.<br>Il y a <span class="big">3 000 codes</span>.`,
      consigne: "Trois chiffres de 0 à 9 puis une lettre A, B ou C : combien de codes différents ?",
      verification: { type: "courte", attendus: ["3000", "3 000"], unite: "codes" },
      dessin: digicode,
    },
    {
      tag: "Énigme 2 · Le podium de karting",
      titre: "Un arrangement",
      question: `Huit pilotes font une course de karting. On note le 1er, le 2e et le 3e.<br><br><b>Combien de podiums</b> différents sont possibles ?`,
      reponse: `L'ordre compte : 8 choix pour le 1er, puis 7, puis 6.<br>8 × 7 × 6 = <span class="big">336 podiums</span>.`,
      consigne: "8 pilotes, on note le 1er, le 2e et le 3e : combien de podiums possibles ?",
      verification: { type: "qcm", choix: ["56", "336", "512"], bonne: 1 },
      dessin: podium,
    },
    {
      tag: "Énigme 3 · Le poke bowl",
      titre: "Une combinaison",
      question: `Un restaurant propose 10 garnitures. Chaque bowl en contient exactement 3, différentes. L'ordre ne compte pas.<br><br><b>Combien de bowls</b> différents peut-on composer ?`,
      reponse: `On choisit 3 garnitures parmi 10, sans ordre : (10 × 9 × 8) ÷ (3 × 2 × 1).<br>C'est le coefficient binomial « 3 parmi 10 » : <span class="big">120 bowls</span>.`,
      consigne: "3 garnitures différentes parmi 10, sans ordre : combien de bowls ?",
      verification: { type: "courte", attendus: ["120"], unite: "bowls" },
      dessin: bowl,
    },
    {
      tag: "Énigme 4 · Les poignées de main du volley",
      titre: "Le coefficient binomial",
      question: `Avant un match, les 6 joueurs d'une équipe de volley se serrent la main, chacun une fois avec chacun.<br><br><b>Combien de poignées de main</b> y a-t-il ?`,
      reponse: `Une poignée de main = 2 joueurs parmi 6, sans ordre : (6 × 5) ÷ 2.<br>Il y en a <span class="big">15</span>. On compte aussi les traits du dessin : 15.`,
      consigne: "6 joueurs, chacun serre la main de chacun une fois : combien de poignées de main ?",
      verification: { type: "qcm", choix: ["15", "30", "36"], bonne: 0 },
      dessin: volley,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les aquarelles",
      sorte: "piege",
      question: `Léa a une boîte de 12 aquarelles. Elle en mélange 2, différentes, pour créer une teinte.<br>Tom dit : « 12 × 11 = 132 mélanges. »<br><br><b>Combien de mélanges</b> différents existe-t-il ?`,
      reponse: `Bleu puis jaune donne le même vert que jaune puis bleu : l'ordre ne compte pas.<br>Tom compte chaque mélange deux fois : 132 ÷ 2 = <span class="big">66 mélanges</span>.`,
      consigne: "Mélanger 2 aquarelles différentes parmi 12 : combien de mélanges ?",
      verification: { type: "qcm", choix: ["132", "144", "66"], bonne: 2 },
      dessin: aquarelles,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le smoothie",
      sorte: "defi",
      question: `Un bar à jus a 6 fruits. Pour chaque fruit, on le met ou non dans le smoothie. Il faut au moins un fruit.<br><br><b>Combien de smoothies</b> différents existe-t-il ?`,
      reponse: `Chaque fruit : 2 choix (oui ou non). 2<sup>6</sup> = 64 façons, dont une sans aucun fruit.<br>64 − 1 = <span class="big">63 smoothies</span>. C'est aussi la somme des « k parmi 6 » pour k de 1 à 6.`,
      consigne: "6 fruits, chacun dedans ou non, au moins un fruit : combien de smoothies ?",
      verification: { type: "courte", attendus: ["63"], unite: "smoothies" },
      dessin: smoothie,
    },
  ],
};

export default problemes;
