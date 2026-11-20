// Énigmes à projeter — CM2, notion nombre_entier (écrire en lettres, valeur
// d'un chiffre, comparer, arrondir ; le piège « 9 est plus grand que 1 » ; le
// défi des cartes avec un zéro). 20/11/2026. Phrases courtes (CM2).
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, o, l, ell } from "../dessins-ecole";

const stade = svg(
  "Un stade vu de haut, avec le nombre 45 080 places",
  ell(240, 200, 200, 130, C.pale, 0.12, 4) +
    r(110, 140, 260, 120, C.jaune, 0.25, 4, 50) +
    l(240, 140, 240, 260, C.craie, 3) +
    o(240, 200, 30, C.craie, 0, 3) +
    t(240, 60, "Le stade", C.pale, 24) +
    t(240, 380, `45${NB}080 places`, C.rose, 40)
);

const tableau = () => {
  const ch = ["2", "3", "6", "5", "4", "0", "0"];
  const noms = ["u", "c", "d", "u", "c", "d", "u"];
  let s = t(40, 80, "millions", C.bleu, 20) + t(175, 80, "mille", C.jaune, 22) + t(365, 80, "unités", C.pale, 22);
  ch.forEach((c, i) => {
    const x = 40 + i * 55 + (i >= 1 ? 25 : 0) + (i >= 4 ? 25 : 0);
    const coul = i === 0 ? C.bleu : i < 4 ? C.jaune : C.pale;
    s += r(x - 25, 130, 50, 50, coul, 0.12, 3) + t(x, 112, noms[i], C.pale, 18) + t(x, 168, c, C.craie, 34);
  });
  return svg(
    "Un tableau de numération : millions, mille, unités, avec le nombre 2 365 400",
    s + t(240, 260, `2${NB}365${NB}400 habitants`, C.craie, 32) + t(240, 330, `chiffre des centaines de mille${NB}?`, C.rose, 26)
  );
};

const jeux = svg(
  "Trois boîtes de jeux vidéo et leurs ventes",
  [["A", `1${NB}205${NB}000`, C.bleu, 80], ["B", `1${NB}250${NB}000`, C.jaune, 240], ["C", `1${NB}025${NB}000`, C.rose, 400]]
    .map(([n, v, c, x]) => r((x as number) - 65, 90, 130, 170, c as string, 0.15, 4, 10) + t(x as number, 190, `🎮`, C.craie, 50) + t(x as number, 80, `Jeu ${n}`, c as string, 26) + t(x as number, 300, v as string, C.craie, 24))
    .join("") + t(240, 380, `Lequel s'est le plus vendu${NB}?`, C.rose, 26)
);

const soleil = svg(
  "Le Soleil et la Terre, avec la distance 149 597 870 km (pas à l'échelle)",
  o(70, 190, 55, C.jaune, 0.5, 4) +
    o(420, 190, 18, C.bleu, 0.5, 4) +
    l(135, 190, 390, 190, C.pale, 3, "10 8") +
    t(260, 160, `149${NB}597${NB}870 km`, C.craie, 28) +
    t(260, 260, `au million près${NB}?`, C.rose, 28) +
    t(240, 390, "pas à l'échelle", C.pale, 20)
);

const voitures = svg(
  "Deux compteurs de voitures : 98 999 km et 102 000 km",
  r(40, 120, 180, 80, C.bleu, 0.12, 4, 10) + t(130, 175, `98${NB}999`, C.craie, 40) + t(130, 100, "voiture rouge 🚗", C.pale, 22) +
    r(260, 120, 180, 80, C.jaune, 0.15, 4, 10) + t(350, 175, `102${NB}000`, C.craie, 40) + t(350, 100, "voiture verte 🚙", C.pale, 22) +
    t(130, 240, "km", C.pale, 22) + t(350, 240, "km", C.pale, 22) +
    t(240, 330, `«${NB}9 est plus grand que 1${NB}»`, C.rose, 26) + t(240, 375, "dit Tom", C.pale, 22)
);

const cartes = svg(
  "Cinq cartes : 3, 0, 7, 5 et 1",
  ["3", "0", "7", "5", "1"].map((c, i) => r(30 + i * 88, 130, 72, 100, C.bleu, 0.12, 4, 8) + t(66 + i * 88, 198, c, C.craie, 50)).join("") +
    t(240, 300, "le plus petit nombre", C.craie, 26) + t(240, 340, `de 5 chiffres${NB}?`, C.rose, 26)
);

const problemes: ProblemesNotion = {
  classe: "cm2",
  notionId: "nombre_entier",
  titre: "Énigmes sur les grands nombres",
  description: "Les places du stade en lettres, le chiffre des centaines de mille, le jeu le plus vendu, la Terre et le Soleil au million près, le piège des compteurs, le défi des cartes.",
  problemes: [
    {
      tag: "Énigme 1 · Au stade",
      titre: "Les places du stade",
      question: `Un stade a <b>45 080 places</b>.<br><br>Comment écrit-on ce nombre <b>en lettres</b> ?`,
      reponse: `45 080, c'est 45 mille et 80.<br><span class="big">quarante-cinq-mille-quatre-vingts</span>.<br>Le 0 des centaines ne se dit pas.`,
      consigne: "Comment écrit-on 45 080 en lettres ?",
      verification: { type: "qcm", choix: ["quarante-cinq-mille-huit-cents", "quarante-cinq-mille-quatre-vingts", "quatre-mille-cinq-cent-huit"], bonne: 1 },
      dessin: stade,
    },
    {
      tag: "Énigme 2 · En ville",
      titre: "Le chiffre caché",
      question: `Une grande ville compte <b>2 365 400 habitants</b>.<br><br>Quel est le <b>chiffre des centaines de mille</b> ?`,
      reponse: `On range dans le tableau : 2 millions, 365 mille, 400 unités.<br>Dans la classe des mille : 3 centaines, 6 dizaines, 5 unités.<br>Le chiffre des centaines de mille est <span class="big">3</span>.`,
      consigne: "Quel est le chiffre des centaines de mille de 2 365 400 ?",
      verification: { type: "courte", attendus: ["3"] },
      dessin: tableau(),
    },
    {
      tag: "Énigme 3 · Au magasin de jeux",
      titre: "Le jeu le plus vendu",
      question: `Jeu A : <b>1 205 000</b> ventes.<br>Jeu B : <b>1 250 000</b> ventes.<br>Jeu C : <b>1 025 000</b> ventes.<br><br><b>Quel jeu s'est le plus vendu</b> ?`,
      reponse: `Les trois ont 1 million. On compare les centaines de mille : 2, 2 et 0.<br>Puis les dizaines de mille : A a 0, B a 5.<br><span class="big">Le jeu B</span> s'est le plus vendu.`,
      consigne: "Quel jeu s'est le plus vendu ?",
      verification: { type: "qcm", choix: ["Le jeu A", "Le jeu C", "Le jeu B"], bonne: 2 },
      dessin: jeux,
    },
    {
      tag: "Énigme 4 · Dans l'espace",
      titre: "La Terre et le Soleil",
      question: `La Terre est à <b>149 597 870 km</b> du Soleil.<br><br><b>Arrondis</b> ce nombre au <b>million près</b>.`,
      reponse: `149 597 870 est entre 149 millions et 150 millions.<br>597 mille, c'est plus que la moitié d'un million.<br>On arrondit à <span class="big">150 000 000 km</span>.`,
      consigne: "Arrondis 149 597 870 au million près.",
      verification: { type: "courte", attendus: ["150000000", "150millions"], unite: "km" },
      dessin: soleil,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les compteurs des voitures",
      sorte: "piege",
      question: `La voiture rouge a roulé <b>98 999 km</b>. La verte a roulé <b>102 000 km</b>.<br><br>Tom dit : « La rouge a roulé plus, car 9 est plus grand que 1. »<br><b>A-t-il raison</b> ?`,
      reponse: `Non ! On compte d'abord les chiffres.<br>98 999 a 5 chiffres, 102 000 en a 6.<br><span class="big">102 000 est le plus grand</span> : la verte a roulé plus.`,
      consigne: "Quel nombre est le plus grand ?",
      verification: { type: "qcm", choix: ["102 000", "98 999", "Ils sont égaux"], bonne: 0 },
      dessin: voitures,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les cinq cartes",
      sorte: "defi",
      question: `Tu as cinq cartes : <b>3, 0, 7, 5, 1</b>.<br>Tu les utilises toutes, une seule fois.<br><br>Quel est le <b>plus petit nombre</b> de 5 chiffres ?`,
      reponse: `On met les petits chiffres devant. Mais un nombre ne commence pas par 0 !<br>On commence par 1, puis 0, 3, 5, 7.<br><span class="big">10 357</span>.`,
      consigne: "Quel est le plus petit nombre de 5 chiffres avec les cartes 3, 0, 7, 5, 1 ?",
      verification: { type: "courte", attendus: ["10357"] },
      dessin: cartes,
    },
  ],
};

export default problemes;
