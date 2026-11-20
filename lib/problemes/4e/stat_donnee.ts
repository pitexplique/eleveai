// Énigmes à projeter — 4e, notion stat_donnee (le festival de BD : tableau à
// double entrée, effectif retrouvé par le total, les vélos en libre-service :
// lire un diagramme en barres, la fête des citrouilles : lire un histogramme
// (effectifs de classes, sans classe modale), le nettoyage de la rivière :
// fréquence lue sur un diagramme circulaire, piège des gauchers : comparer
// des effectifs au lieu des fréquences, défi de la cantine : retrouver
// l'effectif total à partir d'une fréquence).
// Effectifs vérifiés (sommes = totaux). Barres des vélos : 4 px par vélo ;
// histogramme : 20 px par citrouille, 9 px par kg ; secteurs calculés depuis
// les effectifs (44, 16, 12, 8 sur 80 → 198°, 72°, 54°, 36°) ; bande de la
// cantine à 4 px par point de %. Pas de La Réunion, pas de prix. 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const NB = " ";
const r1 = (v: number) => Math.round(v * 10) / 10;
const txt = (x: number, y: number, t: string, coul: string = C.craie, taille = 22, ancre = "middle") =>
  `<text x="${r1(x)}" y="${r1(y)}" fill="${coul}" font-size="${taille}" text-anchor="${ancre}">${t}</text>`;

// Le festival : tableau 4 colonnes (130, 110, 120, 100 px), 4 lignes de 56 px.
const festival = () => {
  const xs = [10, 140, 250, 370, 470];
  const ys = [110, 166, 222, 278, 334];
  const cases = [
    ["", "samedi", "dimanche", "total"],
    ["enfants", "145", "210", "355"],
    ["adultes", "?", "190", "365"],
    ["total", "320", "400", `720`],
  ];
  let traits = "";
  for (const x of xs) traits += `M${x} ${ys[0]} L${x} ${ys[4]} `;
  for (const y of ys) traits += `M${xs[0]} ${y} L${xs[4]} ${y} `;
  let textes = "";
  cases.forEach((ligne, i) =>
    ligne.forEach((t, j) => {
      const coul = t === "?" ? C.rose : i === 0 || j === 0 ? C.pale : C.craie;
      textes += txt((xs[j] + xs[j + 1]) / 2, ys[i] + 36, t, coul, t === "?" ? 30 : 22);
    })
  );
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Tableau des visiteurs du festival : enfants 145 le samedi et 210 le dimanche, adultes inconnu le samedi et 190 le dimanche ; totaux 320 le samedi, 400 le dimanche, 355 enfants, 365 adultes, 720 en tout">
  <text x="240" y="70" font-size="40" text-anchor="middle">📚</text>
  <rect x="10" y="278" width="460" height="56" fill="${C.bleu}" fill-opacity=".1"/>
  <rect x="370" y="110" width="100" height="224" fill="${C.bleu}" fill-opacity=".1"/>
  <path d="${traits}" stroke="${C.craie}" stroke-width="2" fill="none"/>
  ${textes}
  ${txt(240, 385, "visiteurs du festival", C.pale, 22)}
  </svg>`;
};

// Les vélos : 4 px par vélo, base y = 350 (0) → y = 70 (70).
// 35 → 140 px, 50 → 200, 45 → 180, 60 → 240, 30 → 120.
const velos = () => {
  const Y = (v: number) => 350 - 4 * v;
  let fines = "";
  let fortes = "";
  let nombres = "";
  for (let v = 5; v <= 70; v += 5) {
    if (v % 10 === 0) {
      fortes += `M90 ${Y(v)} L440 ${Y(v)} `;
      nombres += txt(82, Y(v) + 7, String(v), C.pale, 20, "end");
    } else fines += `M90 ${Y(v)} L440 ${Y(v)} `;
  }
  const jours: [string, number][] = [["lun", 35], ["mar", 50], ["mer", 45], ["jeu", 60], ["ven", 30]];
  let barres = "";
  jours.forEach(([j, v], k) => {
    const x = 130 + 70 * k;
    barres += `<rect x="${x - 25}" y="${Y(v)}" width="50" height="${4 * v}" fill="${C.bleu}" fill-opacity=".4" stroke="${C.bleu}" stroke-width="3"/>`;
    barres += txt(x, 378, j, C.craie, 22);
  });
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Diagramme en barres des vélos loués : lundi 35, mardi 50, mercredi 45, jeudi 60, vendredi 30">
  ${txt(90, 45, "vélos loués", C.craie, 22, "start")}
  <text x="430" y="50" font-size="36" text-anchor="middle">🚲</text>
  <path d="${fines}" stroke="${C.pale}" stroke-width="1" stroke-opacity=".35" stroke-dasharray="4 6" fill="none"/>
  <path d="${fortes}" stroke="${C.pale}" stroke-width="1" stroke-opacity=".6" fill="none"/>
  ${barres}
  <path d="M90 350 L440 350 M90 350 L90 62" stroke="${C.craie}" stroke-width="3" fill="none"/>
  ${txt(82, 357, "0", C.pale, 20, "end")}
  ${nombres}
  </svg>`;
};

// Les citrouilles : histogramme, 9 px par kg (0 kg → x = 80, 40 kg → x = 440),
// 20 px par citrouille (base y = 340). Effectifs 6, 11, 8, 5 → total 30.
const citrouilles = () => {
  const Y = (n: number) => 340 - 20 * n;
  let grille = "";
  let nombres = "";
  for (let n = 1; n <= 12; n++) {
    grille += `M80 ${Y(n)} L440 ${Y(n)} `;
    if (n % 2 === 0) nombres += txt(72, Y(n) + 7, String(n), C.pale, 20, "end");
  }
  const eff = [6, 11, 8, 5];
  let barres = "";
  eff.forEach((n, k) => {
    barres += `<rect x="${80 + 90 * k}" y="${Y(n)}" width="90" height="${20 * n}" fill="${C.jaune}" fill-opacity=".35" stroke="${C.jaune}" stroke-width="3"/>`;
  });
  let bornes = "";
  for (let k = 0; k <= 4; k++) bornes += txt(80 + 90 * k, 366, String(10 * k), C.craie, 20);
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Histogramme des masses de 30 citrouilles : 6 de 0 à 10 kilos, 11 de 10 à 20 kilos, 8 de 20 à 30 kilos, 5 de 30 à 40 kilos">
  ${txt(80, 50, "nombre de citrouilles", C.craie, 22, "start")}
  <text x="430" y="54" font-size="36" text-anchor="middle">🎃</text>
  <path d="${grille}" stroke="${C.pale}" stroke-width="1" stroke-opacity=".45" stroke-dasharray="4 6" fill="none"/>
  ${barres}
  <path d="M80 340 L450 340 M80 340 L80 84" stroke="${C.craie}" stroke-width="3" fill="none"/>
  ${txt(72, 347, "0", C.pale, 20, "end")}
  ${nombres}
  ${bornes}
  ${txt(260, 400, "masse (kg)", C.pale, 22)}
  </svg>`;
};

// Les déchets : diagramme circulaire, centre (130, 225), rayon 115.
// Angles = effectif ÷ 80 × 360 : 198°, 72°, 54°, 36° (somme 360°).
const dechets = () => {
  const cx = 130, cy = 225, r = 115;
  const pt = (a: number) => {
    const t = (a * Math.PI) / 180;
    return `${r1(cx + r * Math.sin(t))} ${r1(cy - r * Math.cos(t))}`;
  };
  const parts: [string, number, string][] = [["plastique", 44, C.jaune], ["métal", 16, C.bleu], ["verre", 12, C.pale], ["papier", 8, C.rose]];
  let a0 = 0;
  let secteurs = "";
  let legende = "";
  parts.forEach(([nom, n, coul], k) => {
    const a1 = a0 + (n / 80) * 360;
    secteurs += `<path d="M${cx} ${cy} L${pt(a0)} A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${pt(a1)} Z" fill="${coul}" fill-opacity=".4" stroke="${C.craie}" stroke-width="2"/>`;
    const y = 150 + 50 * k;
    legende += `<rect x="270" y="${y - 18}" width="22" height="22" fill="${coul}" fill-opacity=".4" stroke="${C.craie}" stroke-width="2"/>`;
    legende += txt(300, y, `${nom}${NB}: ${n}`, C.craie, 20, "start");
    a0 = a1;
  });
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Diagramme circulaire de 80 déchets ramassés : plastique 44, métal 16, verre 12, papier 8">
  ${txt(240, 60, "80 déchets ramassés", C.craie, 24)}
  ${secteurs}
  ${legende}
  ${txt(370, 380, `plastique${NB}: ? %`, C.rose, 22)}
  </svg>`;
};

// Les gauchers : un rond par élève, rangées de 10. 4e A : 6 sur 30 ; 4e B : 5 sur 20.
const gauchers = () => {
  const ronds = (y0: number, total: number, pleins: number) => {
    let s = "";
    for (let k = 0; k < total; k++) {
      const x = 78 + 36 * (k % 10);
      const y = y0 + 36 * Math.floor(k / 10);
      s += k < pleins
        ? `<circle cx="${x}" cy="${y}" r="13" fill="${C.jaune}" fill-opacity=".9"/>`
        : `<circle cx="${x}" cy="${y}" r="12" fill="none" stroke="${C.pale}" stroke-width="2.5"/>`;
    }
    return s;
  };
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un rond par élève : en 4e A, 6 gauchers sur 30 élèves ; en 4e B, 5 gauchers sur 20 élèves">
  ${txt(60, 66, `4e A${NB}: 6 gauchers sur 30`, C.craie, 22, "start")}
  ${ronds(96, 30, 6)}
  ${txt(60, 226, `4e B${NB}: 5 gauchers sur 20`, C.craie, 22, "start")}
  ${ronds(256, 20, 5)}
  <rect x="40" y="340" width="400" height="56" rx="16" fill="${C.rose}" fill-opacity=".12" stroke="${C.rose}" stroke-width="3"/>
  ${txt(240, 376, `Malik${NB}: «${NB}plus en 4e A${NB}!${NB}»`, C.rose, 24)}
  </svg>`;
};

// La cantine : bande de 400 px pour 100 % (4 px par point).
// Italien 40 % → 160 px, mexicain 35 % → 140 px, japonais 25 % → 100 px.
const cantine = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une bande partagée selon les votes : italien 40 pour cent, mexicain 35 pour cent, japonais le reste, soit 30 votes">
  <text x="240" y="75" font-size="44" text-anchor="middle">🍝</text>
  ${txt(240, 130, "les votes pour le menu à thème", C.pale, 22)}
  <rect x="40" y="160" width="160" height="60" fill="${C.jaune}" fill-opacity=".35"/>
  <rect x="200" y="160" width="140" height="60" fill="${C.bleu}" fill-opacity=".3"/>
  <rect x="340" y="160" width="100" height="60" fill="${C.rose}" fill-opacity=".3"/>
  <rect x="40" y="160" width="400" height="60" fill="none" stroke="${C.craie}" stroke-width="3"/>
  <path d="M200 160 L200 220 M340 160 L340 220" stroke="${C.craie}" stroke-width="3" fill="none"/>
  ${txt(120, 252, "italien", C.craie, 20)}
  ${txt(120, 278, "40 %", C.craie, 22)}
  ${txt(270, 252, "mexicain", C.craie, 20)}
  ${txt(270, 278, "35 %", C.craie, 22)}
  ${txt(390, 252, "japonais", C.craie, 20)}
  ${txt(390, 278, "30 votes", C.rose, 20)}
  ${txt(240, 350, `combien de votants${NB}?`, C.rose, 26)}
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "4e",
  notionId: "stat_donnee",
  titre: "Énigmes sur la lecture de données",
  description: "Le festival de BD, les vélos en libre-service, la fête des citrouilles, le nettoyage de la rivière, le piège des gauchers, le défi de la cantine : lire un tableau, un diagramme en barres, un histogramme et un diagramme circulaire, calculer un effectif et une fréquence.",
  problemes: [
    {
      tag: "Énigme 1 · Le festival de BD",
      titre: "La case effacée",
      question: `Le festival de BD compte ses visiteurs sur deux jours.<br>Le tableau donne les enfants, les adultes et les totaux.<br>Une case a été effacée.<br><br>Combien d'adultes sont venus le <b>samedi</b> ?`,
      reponse: `Le total du samedi est de 320 visiteurs.<br>Parmi eux, 145 enfants.<br>320 − 145 = 175.<br>Le samedi, il y avait <span class="big">175 adultes</span>.<br>Contrôle par la ligne : 365 adultes en tout, dont 190 le dimanche.<br>365 − 190 = 175. Les deux calculs tombent juste.`,
      consigne: "Combien d'adultes sont venus le samedi ?",
      verification: { type: "courte", attendus: ["175"], unite: "adultes" },
      dessin: festival(),
    },
    {
      tag: "Énigme 2 · Les vélos en libre-service",
      titre: "La semaine des vélos",
      question: `Une station de vélos compte ses locations du lundi au vendredi.<br>Le diagramme en barres donne les résultats.<br><br>Quel jour a-t-on loué <b>deux fois moins</b> de vélos que le jeudi ?`,
      reponse: `On lit la barre du jeudi : 60 vélos.<br>Deux fois moins : 60 ÷ 2 = 30 vélos.<br>On cherche la barre qui s'arrête à 30.<br>C'est <span class="big">le vendredi</span>.<br>⚠ Le lundi s'arrête à 35, entre deux graduations : ce n'est pas 30.`,
      consigne: "Quel jour a-t-on loué deux fois moins de vélos que le jeudi ?",
      verification: { type: "qcm", choix: ["Le lundi", "Le mercredi", "Le vendredi"], bonne: 2 },
      dessin: velos(),
    },
    {
      tag: "Énigme 3 · La fête des citrouilles",
      titre: "Les grosses citrouilles",
      question: `À la fête du village, on pèse 30 citrouilles.<br>L'histogramme range leurs masses par tranches de 10 kg.<br><br>Combien de citrouilles pèsent <b>au moins 20 kg</b> ?`,
      reponse: `« Au moins 20 kg » : les tranches de 20 à 30 kg et de 30 à 40 kg.<br>On lit leurs barres : 8 et 5.<br>8 + 5 = 13.<br><span class="big">13 citrouilles</span> pèsent au moins 20 kg.<br>Contrôle : 6 + 11 + 8 + 5 = 30 citrouilles en tout.<br>⚠ La tranche de 10 à 20 kg ne compte pas : ces citrouilles pèsent moins de 20 kg.`,
      consigne: "Combien de citrouilles pèsent au moins 20 kg ?",
      verification: { type: "qcm", choix: ["13", "8", "19"], bonne: 0 },
      dessin: citrouilles(),
    },
    {
      tag: "Énigme 4 · Le nettoyage de la rivière",
      titre: "Le plastique de la rivière",
      question: `Une classe nettoie les berges d'une rivière.<br>Elle ramasse 80 déchets et les trie.<br>Le diagramme circulaire montre le tri.<br><br>Quelle est la <b>fréquence</b> du plastique, en pourcentage ?`,
      reponse: `Fréquence = effectif du plastique ÷ effectif total.<br>44 ÷ 80 = 0,55.<br>0,55 × 100 = 55.<br>La fréquence du plastique est de <span class="big">55 %</span>.<br>Contrôle : 44 + 16 + 12 + 8 = 80 déchets.<br>Le secteur du plastique dépasse la moitié du disque : 55 % est plausible.`,
      consigne: "Quelle est la fréquence du plastique, en pourcentage ?",
      verification: { type: "courte", attendus: ["55"], unite: "%" },
      dessin: dechets(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les gauchers",
      sorte: "piege",
      question: `En 4e A, 6 élèves sur 30 sont gauchers.<br>En 4e B, 5 élèves sur 20 sont gauchers.<br>Malik dit : « La part des gauchers est plus grande en 4e A ! »<br><br><b>Dans quelle classe la part des gauchers est-elle la plus grande ?</b>`,
      reponse: `Malik s'est trompé ! Il compare des effectifs : 6 et 5.<br>Les classes n'ont pas la même taille : on compare les fréquences.<br>4e A : 6 ÷ 30 = 0,2, soit 20 %.<br>4e B : 5 ÷ 20 = 0,25, soit 25 %.<br>La part la plus grande est en <span class="big">4e B</span>.<br>Il y a plus de gauchers en 4e A, mais une plus petite part.`,
      consigne: "Dans quelle classe la part des gauchers est-elle la plus grande ?",
      verification: { type: "qcm", choix: ["En 4e A", "En 4e B", "La même dans les deux classes"], bonne: 1 },
      dessin: gauchers(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le menu à thème",
      sorte: "defi",
      question: `Les élèves votent pour le menu à thème de la cantine.<br>40 % choisissent l'italien, 35 % le mexicain.<br>Tous les autres choisissent le japonais : 30 votes.<br>Chaque élève vote une seule fois.<br><br>Combien d'élèves ont voté ?`,
      reponse: `Le japonais : 100 − 40 − 35 = 25 % des votes.<br>25 %, c'est un quart.<br>Un quart des votants, c'est 30 élèves.<br>Le total : 30 × 4 = 120.<br><span class="big">120 élèves</span> ont voté.<br>Contrôle : 40 % de 120 = 48 et 35 % de 120 = 42.<br>48 + 42 + 30 = 120.`,
      consigne: "Combien d'élèves ont voté ?",
      verification: { type: "courte", attendus: ["120"], unite: "élèves" },
      dessin: cantine(),
    },
  ],
};

export default problemes;
