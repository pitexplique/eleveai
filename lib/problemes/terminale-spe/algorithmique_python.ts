// Énigmes à projeter — terminale spé maths, notion algorithmique_python
// (la pyramide d'oranges du primeur, la patinoire, les mangas de Hugo, la
// sculpture de glace, piège de la caisse de déménagement, défi des confettis
// du carnaval). 21/11/2026. Le programme est dans le dessin (bloc Python).
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t } from "../dessins-ecole";
import { code } from "../dessins-2de";
import { frac } from "../outils";

const oranges = svg("Programme Python : s = 0 ; pour k dans range(1, 5), s = s + k*k ; afficher s",
  code([["s = 0", 0], ["for k in range(1, 5):", 0], ["s = s + k*k", 1], ["print(s)", 0]], { y: 40, pas: 44, taille: 24 }) +
    t(240, 290, "étage k : k × k oranges", C.jaune, 22) + t(240, 380, `affichage${NB}?`, C.rose, 28));

const patinoire = svg("Fonction Python tarif(age) : si age est strictement inférieur à 12, renvoie 5 ; sinon si age est strictement inférieur à 18, renvoie 8 ; sinon renvoie 12",
  code([["def tarif(age):", 0], ["if age &lt; 12:", 1], ["return 5", 2], ["elif age &lt; 18:", 1], ["return 8", 2], ["else:", 1], ["return 12", 2]], { y: 20, pas: 38, taille: 22 }) +
    t(240, 385, `tarif(12)${NB}?`, C.rose, 28));

const mangas = svg("Programme Python : u = 200 ; deux fois, u = 0.8*u + 30 ; afficher u",
  code([["u = 200", 0], ["for i in range(2):", 0], ["u = 0.8*u + 30", 1], ["print(u)", 0]], { y: 40, pas: 44, taille: 24 }) +
    t(240, 290, "chaque mois : −20 %, puis +30", C.jaune, 22) + t(240, 380, `affichage${NB}?`, C.rose, 28));

const glace = svg("Programme Python : m = 20 ; n = 0 ; tant que m est strictement supérieur à 10, m = 0.85*m et n = n + 1 ; afficher n",
  code([["m = 20", 0], ["n = 0", 0], ["while m > 10:", 0], ["m = 0.85*m", 1], ["n = n + 1", 1], ["print(n)", 0]], { y: 30, pas: 42, taille: 24 }) +
    t(240, 385, `affichage${NB}?`, C.rose, 28));

const caisse = svg("Programme Python de Malo : c = 2 ; v = c^3 ; afficher v ; il pense obtenir le volume 8",
  code([["c = 2", 0], ["v = c^3", 0], ["print(v)", 0]], { y: 40, pas: 48, taille: 26 }) +
    t(240, 250, "Malo : « ça affiche 8 m³ »", C.bleu, 24) + t(240, 380, `Python affiche${NB}?`, C.rose, 28));

const confettis = svg("Programme Python : on tire 10 000 points (x ; y) au hasard dans le carré unité, on compte ceux qui vérifient x² + y² strictement inférieur à 1, et on affiche 4 fois cette proportion",
  code([["from random import random", 0], ["c = 0", 0], ["for i in range(10000):", 0], ["x = random()", 1], ["y = random()", 1], ["if x*x + y*y &lt; 1:", 1], ["c = c + 1", 2], ["print(4*c/10000)", 0]], { y: 16, pas: 36, taille: 21 }) +
    t(240, 390, `affichage environ${NB}?`, C.rose, 26));

const problemes: ProblemesNotion = {
  classe: "terminale-spe",
  notionId: "algorithmique_python",
  titre: "Énigmes d'algorithmique et Python",
  description: "La pyramide d'oranges du primeur, les tarifs de la patinoire, les mangas de Hugo, la sculpture de glace, le piège de la caisse de déménagement, le défi des confettis du carnaval : lire une boucle, une condition, les termes d'une suite, un seuil avec while, simuler le hasard.",
  problemes: [
    {
      tag: "Énigme 1 · La pyramide d'oranges",
      titre: "Lire une boucle for",
      question: `Un primeur empile des oranges en pyramide : l'étage k compte k × k oranges. Ce programme compte les oranges d'une pyramide de 4 étages.<br><br><b>Qu'affiche-t-il</b> ?`,
      reponse: `range(1, 5) donne k = 1, 2, 3, 4 (le 5 est exclu). s = 1 + 4 + 9 + 16.<br>Le programme affiche <span class="big">30</span> : 30 oranges.`,
      consigne: "s = 0, puis s = s + k*k pour k dans range(1, 5) : qu'affiche print(s) ?",
      verification: { type: "courte", attendus: ["30"] },
      dessin: oranges,
    },
    {
      tag: "Énigme 2 · La patinoire",
      titre: "Lire une condition",
      question: `La patinoire calcule ses tarifs avec la fonction tarif (au tableau). Lou a 12 ans.<br><br><b>Que renvoie tarif(12)</b> ?`,
      reponse: `12 &lt; 12 est faux : on passe au elif. 12 &lt; 18 est vrai : la fonction renvoie <span class="big">8</span> (€).<br>Le « return » arrête la fonction : le else n'est pas lu.`,
      consigne: "if age < 12 : 5 ; elif age < 18 : 8 ; else : 12. Que renvoie tarif(12) ?",
      verification: { type: "qcm", choix: ["5", "8", "12"], bonne: 1 },
      dessin: patinoire,
    },
    {
      tag: "Énigme 3 · Les mangas de Hugo",
      titre: "Les termes d'une suite",
      question: `Hugo a 200 mangas. Chaque mois, il en donne 20 % puis en achète 30. Ce programme calcule son nombre de mangas.<br><br><b>Qu'affiche-t-il</b> ?`,
      reponse: `C'est la suite u<sub>n+1</sub> = 0,8 u<sub>n</sub> + 30, avec u<sub>0</sub> = 200. range(2) fait 2 tours.<br>u<sub>1</sub> = 160 + 30 = 190, u<sub>2</sub> = 152 + 30 = <span class="big">182</span> (Python écrit 182.0) : 182 mangas après 2 mois.`,
      consigne: "u = 200, puis 2 fois u = 0.8*u + 30 : qu'affiche print(u) ?",
      verification: { type: "courte", attendus: ["182", "182.0", "182,0"] },
      dessin: mangas,
    },
    {
      tag: "Énigme 4 · La sculpture de glace",
      titre: "Un seuil avec while",
      question: `Au festival, une sculpture de glace de 20 kg perd 15 % de sa masse chaque heure. Ce programme cherche quand elle passe sous 10 kg.<br><br><b>Qu'affiche-t-il</b> ?`,
      reponse: `Tour par tour : 17 (n = 1) ; 14,45 (n = 2) ; 12,28 (n = 3) ; 10,44 (n = 4) ; 8,87 (n = 5). Là, m > 10 est faux : la boucle s'arrête.<br>Il affiche <span class="big">5</span> : moins de 10 kg au bout de 5 heures (0,85⁴ ≈ 0,52 et 0,85⁵ ≈ 0,44).`,
      consigne: "m = 20, n = 0 ; tant que m > 10 : m = 0.85*m et n = n + 1. Qu'affiche print(n) ?",
      verification: { type: "courte", attendus: ["5"] },
      dessin: glace,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La caisse de déménagement",
      sorte: "piege",
      question: `Malo veut le volume d'une caisse de déménagement cubique de 2 m de côté. Il écrit v = c^3.<br>Malo : « Le programme affiche 8. »<br><br><b>Qu'affiche Python</b> ?`,
      reponse: `En Python, ^ n'est pas la puissance : c'est le « ou exclusif » bit à bit. 2 s'écrit 10 en binaire, 3 s'écrit 11 : 10 ^ 11 = 01.<br>Python affiche <span class="big">1</span>. La puissance s'écrit ** : c**3 donne bien 8.`,
      consigne: "c = 2, puis v = c^3 en Python : qu'affiche print(v) ?",
      verification: { type: "qcm", choix: ["1", "8", "6"], bonne: 0 },
      dessin: caisse,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les confettis du carnaval",
      sorte: "defi",
      question: `Des confettis tombent au hasard sur un plateau carré de 1 m de côté. Un quart de disque de rayon 1 m y est peint, centré sur un coin. Le programme simule 10 000 confettis.<br><br><b>Quel nombre affiche-t-il, environ</b> ?`,
      reponse: `Un confetti tombe dans le quart de disque (x² + y² &lt; 1) avec une probabilité égale à son aire : ${frac("π", 4)} ≈ 0,785.<br>Par la loi des grands nombres, ${frac("c", "10 000")} ≈ ${frac("π", 4)}, donc le programme affiche environ <span class="big">π ≈ 3,14</span>.`,
      consigne: "On compte les points (x ; y) au hasard tels que x² + y² < 1, puis on affiche 4*c/10000. Environ combien ?",
      verification: { type: "qcm", choix: ["0,785", "4", "environ 3,14"], bonne: 2 },
      dessin: confettis,
    },
  ],
};

export default problemes;
