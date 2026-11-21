// Énigmes à projeter — STMG (1re), notion fluctuation d'échantillonnage (le
// fabricant de fusibles, le fabricant de piles, le fabricant de chewing-gums,
// le fabricant de pinces à linge, piège du numismate, défi des puces
// électroniques). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, l, r, svg, t } from "../dessins-ecole";

const fr = ["0,03", "0,06", "0,04", "0,07", "0,05"];
const fusibles = svg("Fusibles : 5 échantillons de 100 fusibles ; fréquences de fusibles défectueux 0,03 ; 0,06 ; 0,04 ; 0,07 ; 0,05",
  t(240, 50, "5 échantillons de 100 fusibles", C.pale, 22) +
    fr.map((f, k) => r(28 + 88 * k, 80, 72, 70, C.bleu, 0.15, 3, 8) + t(64 + 88 * k, 126, f, C.craie, 24)).join("") +
    t(240, 200, "fréquence des fusibles défectueux", C.pale, 20) +
    t(240, 330, `pourquoi pas toujours pareil${NB}?`, C.rose, 26));

const piles = svg("Piles : p = 0,04 ; échantillon de 200 piles, 12 piles faibles ; écart entre f et p ?",
  r(70, 50, 340, 170, C.bleu, 0.15, 3, 10) +
    t(240, 100, "modèle : p = 0,04", C.craie, 25) + t(240, 145, "échantillon : 200 piles", C.craie, 24) + t(240, 188, "12 piles faibles", C.craie, 24) +
    t(240, 320, `écart entre f et p${NB}?`, C.rose, 30));

const X = (v: number) => 60 + (v - 0.1) * 900;
const gommes = svg("Chewing-gums : 95 % des fréquences simulées entre 0,21 et 0,39 ; un magasin observe 0,45",
  r(X(0.21), 120, X(0.39) - X(0.21), 40, C.bleu, 0.3, 0, 4) +
    l(50, 160, 430, 160, C.craie, 3) +
    [0.1, 0.2, 0.3, 0.4, 0.5].map((v) => l(X(v), 152, X(v), 168, C.craie, 3) + t(X(v), 200, String(v).replace(".", ","), C.pale, 20)).join("") +
    t(240, 105, "95 % des fréquences simulées", C.bleu, 20) +
    `<circle cx="${X(0.45)}" cy="160" r="9" fill="${C.rose}"/>` + t(X(0.45), 135, "0,45", C.rose, 22) +
    t(240, 250, "zone bleue : de 0,21 à 0,39", C.pale, 22) +
    t(240, 340, `rare ou fréquent${NB}?`, C.rose, 30));

const pinces = svg("Pinces à linge : échantillons de 100 pinces ; pour diviser la dispersion par 2, quelle taille ?",
  r(70, 50, 340, 170, C.jaune, 0.15, 3, 10) +
    t(240, 100, "échantillons de 100 pinces", C.craie, 24) + t(240, 150, "on veut diviser", C.craie, 24) + t(240, 192, "la dispersion par 2", C.craie, 24) +
    t(240, 320, `taille de l'échantillon${NB}?`, C.rose, 28));

const piece = svg("Numismate : 10 lancers, 7 fois pile ; plus de 95 % des fréquences simulées entre 0,2 et 0,8 ; il dit que la pièce est truquée",
  `<circle cx="240" cy="105" r="55" fill="${C.jaune}" fill-opacity="0.25" stroke="${C.jaune}" stroke-width="4"/>` + t(240, 115, "1 F", C.craie, 30) +
    t(240, 200, "10 lancers : 7 fois pile", C.craie, 24) +
    t(240, 245, "plus de 95 % des simulations :", C.pale, 20) + t(240, 275, "entre 0,2 et 0,8", C.pale, 20) +
    t(240, 350, `truquée${NB}?`, C.rose, 32));

const puces = svg("Puces électroniques : échantillons de 50 puces ; pour diviser la dispersion par 3, quelle taille ?",
  r(70, 50, 340, 170, C.bleu, 0.15, 3, 10) +
    t(240, 100, "échantillons de 50 puces", C.craie, 24) + t(240, 150, "on veut diviser", C.craie, 24) + t(240, 192, "la dispersion par 3", C.craie, 24) +
    t(240, 320, `taille de l'échantillon${NB}?`, C.rose, 28));

const problemes: ProblemesNotion = {
  classe: "stmg",
  notionId: "va_echantillonnage",
  titre: "Énigmes de la fluctuation d'échantillonnage",
  description: "Le fabricant de fusibles, le fabricant de piles, le fabricant de chewing-gums, le fabricant de pinces à linge, le piège du numismate, le défi des puces électroniques : voir que la fréquence change d'un échantillon à l'autre, mesurer l'écart à p, dire si une observation est rare, et choisir la taille de l'échantillon.",
  problemes: [
    {
      tag: "Énigme 1 · Le fabricant de fusibles",
      titre: "Des fréquences qui bougent",
      question: `Un fabricant contrôle 5 échantillons de 100 fusibles.<br>La machine est la même chaque jour.<br>Les fréquences de fusibles défectueux ne sont pas égales.<br><br><b>Pourquoi</b> ?`,
      reponse: `Chaque échantillon est tiré au hasard.<br>La fréquence change d'un échantillon à l'autre : c'est la <span class="big">fluctuation d'échantillonnage</span>.`,
      consigne: "Pourquoi les fréquences ne sont-elles pas égales ?",
      verification: { type: "qcm", choix: ["la machine change chaque jour", "le hasard de l'échantillon : c'est la fluctuation", "on s'est trompé dans les calculs"], bonne: 1 },
      dessin: fusibles,
    },
    {
      tag: "Énigme 2 · Le fabricant de piles",
      titre: "L'écart entre f et p",
      question: `Un fabricant de piles annonce 4 % de piles faibles : p = 0,04.<br>Un magasin teste 200 piles.<br>Il trouve 12 piles faibles.<br><br><b>De combien la fréquence f s'écarte-t-elle de p</b> ?`,
      reponse: `f = 12 ÷ 200 = 0,06.<br>Écart : 0,06 − 0,04 = <span class="big">0,02</span>.`,
      consigne: "De combien f s'écarte-t-elle de p ?",
      verification: { type: "courte", attendus: ["0,02", "0.02", "2 %", "2%"] },
      dessin: piles,
    },
    {
      tag: "Énigme 3 · Le fabricant de chewing-gums",
      titre: "Rare ou fréquent ?",
      question: `30 % des clients choisissent le goût menthe : p = 0,3.<br>On simule 1${NB}000 échantillons de 100 clients.<br>95 % des fréquences sont entre 0,21 et 0,39.<br>Un magasin observe 0,45.<br><br><b>Cette observation est-elle rare ou fréquente</b> ?`,
      reponse: `0,45 est en dehors de 0,21 à 0,39.<br>Cela arrive dans moins de 5 % des cas : l'observation est <span class="big">rare</span> dans ce modèle.`,
      consigne: "L'observation 0,45 est-elle rare ou fréquente ?",
      verification: { type: "qcm", choix: ["fréquente : elle est proche de 0,3", "impossible avec ce modèle", "rare : elle est hors de 0,21 à 0,39"], bonne: 2 },
      dessin: gommes,
    },
    {
      tag: "Énigme 4 · Le fabricant de pinces à linge",
      titre: "Grossir l'échantillon",
      question: `Un fabricant contrôle des échantillons de 100 pinces à linge.<br>Il veut diviser la dispersion des fréquences par 2.<br>Règle : diviser par k, c'est multiplier la taille par k².<br><br><b>Combien de pinces</b> doit compter un échantillon ?`,
      reponse: `k = 2, donc k² = 4.<br>100 × 4 = <span class="big">400 pinces</span>.`,
      consigne: "Combien de pinces dans un échantillon ?",
      verification: { type: "courte", attendus: ["400", "400 pinces"] },
      dessin: pinces,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le numismate",
      sorte: "piege",
      question: `Un numismate lance 10 fois une pièce ancienne.<br>Il obtient 7 fois pile.<br>Il dit : « la pièce est truquée ».<br>Avec une pièce équilibrée, plus de 95 % des fréquences simulées sont entre 0,2 et 0,8.<br><br><b>A-t-il raison</b> ?`,
      reponse: `7 ÷ 10 = 0,7, et 0,7 est entre 0,2 et 0,8.<br><span class="big">Non</span> : sur 10 lancers, 0,7 est fréquent.<br>10 lancers, c'est trop peu pour conclure.`,
      consigne: "La pièce est-elle truquée ?",
      verification: { type: "qcm", choix: ["non : 0,7 est entre 0,2 et 0,8, c'est fréquent", "oui : 0,7 est loin de 0,5", "oui : il fallait 5 fois pile"], bonne: 0 },
      dessin: piece,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les puces électroniques",
      sorte: "defi",
      question: `Une usine contrôle des échantillons de 50 puces électroniques.<br>Elle veut diviser la dispersion des fréquences par 3.<br><br><b>Combien de puces</b> doit compter un échantillon ?`,
      reponse: `Diviser par 3, c'est multiplier la taille par 3² = 9.<br>50 × 9 = <span class="big">450 puces</span>.<br>Tripler la taille ne suffit pas.`,
      consigne: "Combien de puces dans un échantillon ?",
      verification: { type: "courte", attendus: ["450", "450 puces"] },
      dessin: puces,
    },
  ],
};

export default problemes;
