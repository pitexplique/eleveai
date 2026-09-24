// ─── Fiche d'exercices : la racine carrée (3e) — 20 exercices corrigés ─────────
//
// Alignée sur la fiche de cours `lib/fiches/maths-3e-racine-carree.tsx` et sur
// les micros du coach de 3e (notionId entier_racine_carree). On reste dans le
// programme de 3e : définition, carrés parfaits, calcul d'une racine simple,
// encadrement entre deux entiers (puis au dixième), équation x² = a, et la
// racine au service de Pythagore. ⛔ Pas de simplification a√b ni de règles de
// calcul sur les radicaux en général : c'est la feuille de seconde
// (`maths-seconde-racines.tsx`).
// ⛔ Aucun calcul de la fiche de cours n'est repris : ni √144, √169, √49, √20,
// √50, √60, ni √9 + √16 contre √(9 + 16), ni le triangle 6-8-10.
//
// Les deux pièges qui reviennent : √(a + b) ≠ √a + √b (exercices 9, 14, 18, 19)
// et √x ≠ x ÷ 2 (exercices 6, 7, 14).
//
// Les chiffres du monde, et d'où ils viennent :
// - hectare = 10 000 m² (définition légale, Système international) — ex. 17 ;
// - terrain de handball : 40 m × 20 m (IHF, Règles du jeu, règle 1) — ex. 18 ;
// - écran « 15,6 pouces » au format 16:9 : 34,5 cm × 19,4 cm, 1 pouce = 2,54 cm
//   (15,6 × 2,54 = 39,6 cm de diagonale ; 39,6 × 16/√337 ≈ 34,5) — ex. 19 ;
// - chute libre sans air : h = ½ g t², g ≈ 9,8 m/s², d'où t = √(h ÷ 4,9) — ex. 20.
//
// Les corrigés sont écrits à la première personne (« je cherche »), comme la
// feuille de proportionnalité de 3e.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-racine-carree-3e.mjs` —
// chaque racine est retrouvée par une recherche de l'entier, chaque encadrement
// par un balayage des carrés, et relu dans la phrase du corrigé.
//
// Micro-compétences : entier_racine_comprendre (1, 2, 10, 16, 20),
// entier_racine_carre_parfait (3, 4, 12), entier_racine_calculer (5, 6, 9, 13,
// 16, 17, 18, 19), entier_racine_encadrer (7, 8, 11, 15, 17, 18, 19),
// entier_racine_defi (12, 14, 15, 17, 19, 20). 5/5.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, intervalles, repere, triangle } from "@/lib/fiches-exercices/figures";

// ⭐ LE CARRÉ ET SON AIRE (exercices 13 et 17) : l'aire écrite DEDANS, le côté
// écrit DESSOUS — la racine carrée se lit comme « le côté du carré ». Plusieurs
// carrés sont dessinés à la même échelle : deux hectares ne font pas un côté
// double, et ça se VOIT. Du SVG simple, texte nu (pas de `$`).
// ⭐ Le script de recalcul relit `cote` et les textes : les écrire en clair.
const carres = (liste: { cote: number; aire: string; coteTexte: string }[]) => {
  const echelle = 110 / Math.max(...liste.map((c) => c.cote));
  const ecart = 24;
  const largeur = liste.reduce((s, c) => s + c.cote * echelle, 0) + ecart * (liste.length + 1);
  let x = ecart;
  return (
    <svg
      viewBox={`0 0 ${largeur.toFixed(0)} 150`}
      role="img"
      aria-label={liste.map((c) => `Un carré d'aire ${c.aire}, de côté ${c.coteTexte}`).join(". ")}
      className="mx-auto w-full max-w-[18rem] print:max-w-[13rem]"
    >
      {liste.map((c, i) => {
        const s = c.cote * echelle;
        const x0 = x;
        x += s + ecart;
        const y0 = 118 - s;
        return (
          <g key={i}>
            <rect x={x0} y={y0} width={s} height={s} fill="#dbeafe" stroke="#2563eb" strokeWidth={1.5} />
            <text x={x0 + s / 2} y={y0 + s / 2 + 4} textAnchor="middle" fontSize={11} fill="#1e3a8a">
              {c.aire}
            </text>
            <text x={x0 + s / 2} y={136} textAnchor="middle" fontSize={11} fill="#b91c1c">
              {c.coteTexte}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export const exercicesRacineCarree3e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  notion: "entier-racine-carree",
  titre: "La racine carrée",
  accroche:
    "Vingt exercices, du calcul seul au problème : retrouver une racine, reconnaître un carré parfait, encadrer une racine qui ne tombe pas juste, puis mesurer un champ, un terrain ou un écran. Un rappel de cours de trois lignes avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le pourquoi de chaque étape et le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/3e/entier-racine-carree", titre: "La racine carrée" }],
  coachHref: "/coach-ia/maths?classe=3e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Je vérifie toujours en élevant au carré.",
      rappel: [
        "$\\sqrt{a}$ (on lit « racine carrée de $a$ ») est le nombre POSITIF dont le carré vaut $a$. Elle n'existe que si $a \\geqslant 0$.",
        "Le carré et la racine s'annulent : $\\left(\\sqrt{a}\\right)^2 = a$, et $\\sqrt{a^2} = a$ quand $a \\geqslant 0$.",
        "Les carrés parfaits à connaître : $1$, $4$, $9$, $16$, $25$, $36$, $49$, $64$, $81$, $100$, puis $121$, $144$, $169$, $196$, $225$.",
        "ENCADRER : si $a$ n'est pas un carré parfait, je cherche les deux carrés qui l'entourent. $36 < 40 < 49$ donne $6 < \\sqrt{40} < 7$.",
      ],
      exercices: [
        {
          enonce:
            "a) Quel nombre positif a pour carré $36$ ?\nb) En déduire $\\sqrt{36}$.\nc) $-6$ a lui aussi pour carré $36$. Pourquoi $\\sqrt{36}$ ne vaut-il pas $-6$ ?\nd) $\\sqrt{-36}$ existe-t-il ?",
          correction:
            "a) Je cherche un nombre positif qui, multiplié par lui-même, donne $36$ : $6 \\times 6 = 36$. C'est $6$.\nb) $\\sqrt{36}$ est justement le nombre POSITIF dont le carré vaut $36$ : $\\sqrt{36} = 6$.\nc) $(-6)^2 = 36$, c'est vrai. Mais la racine carrée choisit toujours le nombre positif : $\\sqrt{36}$ vaut $6$, jamais $-6$.\nd) Non. Un carré n'est jamais négatif : aucun nombre n'a pour carré $-36$, donc $\\sqrt{-36}$ n'existe pas.\n⛔ Le piège : écrire « $\\sqrt{36} = 6$ ou $-6$ ». Le symbole désigne UN seul nombre, le positif.\nRéponse : $\\sqrt{36} = 6$, et $\\sqrt{-36}$ n'existe pas.",
          micros: ["entier_racine_comprendre"],
        },
        {
          enonce:
            "Calculer sans calculatrice.\na) $\\left(\\sqrt{13}\\right)^2$\nb) $\\sqrt{11^2}$\nc) $\\sqrt{3} \\times \\sqrt{3}$\nd) $\\left(\\sqrt{0{,}7}\\right)^2$",
          correction:
            "La racine carrée défait le carré, et le carré défait la racine : les deux gestes s'annulent.\na) $\\sqrt{13}$ est le nombre dont le carré vaut $13$. Donc $\\left(\\sqrt{13}\\right)^2 = 13$.\nb) Je calcule d'abord le carré : $11^2 = 121$. Puis sa racine : $\\sqrt{121} = 11$. Donc $\\sqrt{11^2} = 11$.\nc) Multiplier un nombre par lui-même, c'est l'élever au carré : $\\sqrt{3} \\times \\sqrt{3} = \\left(\\sqrt{3}\\right)^2 = 3$.\nd) Même règle avec un décimal : $\\left(\\sqrt{0{,}7}\\right)^2 = 0{,}7$.\n⛔ Le piège : chercher à calculer $\\sqrt{13}$ d'abord. Inutile : le carré efface la racine, sans aucune valeur approchée.\nRéponse : $13$ ; $11$ ; $3$ ; $0{,}7$.",
          micros: ["entier_racine_comprendre"],
        },
        {
          enonce:
            "Parmi ces nombres, lesquels sont des carrés parfaits ? Pour chacun, donner sa racine carrée.\n$64$ ; $90$ ; $121$ ; $150$ ; $196$ ; $225$ ; $250$",
          correction:
            "Un carré parfait est le carré d'un nombre entier. Je parcours les carrés des entiers : $8^2 = 64$, $9^2 = 81$, $10^2 = 100$, $11^2 = 121$, $12^2 = 144$, $13^2 = 169$, $14^2 = 196$, $15^2 = 225$, $16^2 = 256$.\n$64 = 8^2$, donc $\\sqrt{64} = 8$.\n$121 = 11^2$, donc $\\sqrt{121} = 11$.\n$196 = 14^2$, donc $\\sqrt{196} = 14$.\n$225 = 15^2$, donc $\\sqrt{225} = 15$.\n$90$ tombe entre $81$ et $100$, $150$ entre $144$ et $169$, $250$ entre $225$ et $256$ : ce ne sont pas des carrés parfaits.\nRéponse : les carrés parfaits sont $64$, $121$, $196$ et $225$.",
          micros: ["entier_racine_carre_parfait"],
        },
        {
          enonce:
            "Le chiffre des unités d'un carré parfait n'est jamais $2$, $3$, $7$ ou $8$.\na) Vérifier cette règle sur les carrés des entiers de $0$ à $9$.\nb) Parmi $2\\,023$ ; $1\\,764$ ; $578$ ; $3\\,600$, lesquels peuvent être des carrés parfaits ? Le sont-ils ?",
          correction:
            "a) Le chiffre des unités d'un carré ne dépend que du chiffre des unités du nombre. Les carrés de $0$ à $9$ sont $0$, $1$, $4$, $9$, $16$, $25$, $36$, $49$, $64$, $81$ : ils finissent par $0$, $1$, $4$, $5$, $6$ ou $9$. Jamais par $2$, $3$, $7$ ou $8$.\nb) $2\\,023$ finit par $3$ et $578$ finit par $8$ : ils ne peuvent pas être des carrés parfaits, sans aucun calcul.\n$1\\,764$ et $3\\,600$ passent le test. Je cherche leur racine : $42^2 = 1\\,764$ et $60^2 = 3\\,600$.\n⛔ Le piège : croire que le test suffit dans l'autre sens. Finir par $1$ ne prouve rien : $41$ finit par $1$ et n'est pas un carré parfait.\nRéponse : $1\\,764 = 42^2$ et $3\\,600 = 60^2$ sont des carrés parfaits ; $2\\,023$ et $578$ n'en sont pas.",
          micros: ["entier_racine_carre_parfait"],
        },
        {
          enonce:
            "Calculer sans calculatrice.\na) $\\sqrt{81}$\nb) $\\sqrt{400}$\nc) $\\sqrt{0{,}25}$\nd) $\\sqrt{1}$\ne) $\\sqrt{0{,}04}$",
          correction:
            "Pour chaque racine, je cherche le nombre positif dont le carré vaut le nombre sous la racine, puis je vérifie en l'élevant au carré.\na) $9^2 = 81$, donc $\\sqrt{81} = 9$.\nb) $20^2 = 400$, donc $\\sqrt{400} = 20$.\nc) $0{,}5^2 = 0{,}25$, donc $\\sqrt{0{,}25} = 0{,}5$.\nd) $1^2 = 1$, donc $\\sqrt{1} = 1$.\ne) $0{,}2^2 = 0{,}04$, donc $\\sqrt{0{,}04} = 0{,}2$.\n⛔ Le piège au e) : répondre $0{,}02$. Je vérifie : $0{,}02^2 = 0{,}0004$, pas $0{,}04$.\nRéponse : $9$ ; $20$ ; $0{,}5$ ; $1$ ; $0{,}2$.",
          micros: ["entier_racine_calculer"],
        },
        {
          enonce:
            "Un élève écrit : « $\\sqrt{64} = 32$, car la racine, c'est la moitié. »\na) Montrer qu'il se trompe.\nb) Calculer $\\sqrt{64}$.\nc) Pour quel nombre $x$, autre que $0$, a-t-on vraiment $\\sqrt{x} = x \\div 2$ ?",
          correction:
            "a) Je vérifie en élevant au carré : $32^2 = 1\\,024$, pas $64$. Donc $\\sqrt{64} \\neq 32$.\nb) $8^2 = 64$, donc $\\sqrt{64} = 8$.\nc) J'essaie les petits carrés parfaits : $\\sqrt{1} = 1$ et $1 \\div 2 = 0{,}5$ ; $\\sqrt{4} = 2$ et $4 \\div 2 = 2$ ; $\\sqrt{9} = 3$ et $9 \\div 2 = 4{,}5$. Ça marche pour $x = 4$, et seulement pour lui : ensuite, la moitié grandit bien plus vite que la racine.\n⛔ Le piège : $\\sqrt{x}$ n'est pas $x \\div 2$. Prendre la moitié, c'est défaire « fois $2$ » ; prendre la racine, c'est défaire le CARRÉ, « $x \\times x$ ».\nRéponse : $\\sqrt{64} = 8$, et $\\sqrt{x} = x \\div 2$ seulement pour $x = 4$.",
          // En bleu la racine (points (x ; √x) écrits en clair), en orange la
          // moitié : elles ne se croisent qu'en 0 et en 4.
          schema: repere(
            [-1, 7, -1, 4],
            [
              { pts: [[0, 0], [0.25, 0.5], [0.5625, 0.75], [1, 1], [1.5625, 1.25], [2.25, 1.5], [3.0625, 1.75], [4, 2], [5.0625, 2.25], [6.25, 2.5], [7, 2.6458]] },
              { q: [0, 0.5, 0], couleur: ORANGE },
            ],
            [{ x: 4, y: 2, label: "4 ; 2" }],
          ),
          micros: ["entier_racine_calculer"],
        },
        {
          enonce: "Encadrer chaque racine entre deux entiers consécutifs.\na) $\\sqrt{30}$\nb) $\\sqrt{85}$\nc) $\\sqrt{3}$",
          correction:
            "Je cherche les deux carrés parfaits qui entourent le nombre : celui juste en dessous et celui juste au-dessus.\na) $25 < 30 < 36$, c'est-à-dire $5^2 < 30 < 6^2$. Donc $5 < \\sqrt{30} < 6$.\nb) $81 < 85 < 100$, c'est-à-dire $9^2 < 85 < 10^2$. Donc $9 < \\sqrt{85} < 10$.\nc) $1 < 3 < 4$, c'est-à-dire $1^2 < 3 < 2^2$. Donc $1 < \\sqrt{3} < 2$.\n⛔ Le piège : encadrer $\\sqrt{30}$ par $15$ et $16$, parce que $30 \\div 2 = 15$. On cherche des CARRÉS, pas une moitié.\nRéponse : $5 < \\sqrt{30} < 6$ ; $9 < \\sqrt{85} < 10$ ; $1 < \\sqrt{3} < 2$.",
          // Une seule droite : les trois encadrements sans étiquette, et chaque
          // racine placée par son point (valeur approchée au centième).
          schema: intervalles(
            0,
            10,
            [
              { de: 1, a: 2, deInclus: false, aInclus: false },
              { de: 5, a: 6, deInclus: false, aInclus: false },
              { de: 9, a: 10, deInclus: false, aInclus: false },
            ],
            1,
            [
              { value: 1.73, label: "√3" },
              { value: 5.48, label: "√30" },
              { value: 9.22, label: "√85" },
            ],
          ),
          micros: ["entier_racine_encadrer"],
        },
        {
          enonce: "Sans calculatrice, ranger du plus petit au plus grand : $4$ ; $\\sqrt{17}$ ; $4{,}2$ ; $\\sqrt{15}$.",
          correction:
            "Ces nombres sont tous positifs. Pour les comparer, je compare leurs CARRÉS : entre deux nombres positifs, le plus grand a le plus grand carré.\n$4^2 = 16$ ; $\\left(\\sqrt{17}\\right)^2 = 17$ ; $4{,}2^2 = 17{,}64$ ; $\\left(\\sqrt{15}\\right)^2 = 15$.\nJe range les carrés : $15 < 16 < 17 < 17{,}64$.\nDonc $\\sqrt{15} < 4 < \\sqrt{17} < 4{,}2$.\n⛔ Le piège : croire que $\\sqrt{17}$ dépasse $4{,}2$ parce que $17$ est « gros ». Seul le carré permet de trancher : $4{,}2^2 = 17{,}64$, plus que $17$.\nRéponse : $\\sqrt{15} < 4 < \\sqrt{17} < 4{,}2$.",
          micros: ["entier_racine_encadrer"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au brevet. Je calcule sous la racine d'abord, je vérifie en élevant au carré.",
      rappel: [
        "La barre du radical couvre TOUT ce qui est dessous : je calcule d'abord sous la racine. Et $\\sqrt{a + b} \\neq \\sqrt{a} + \\sqrt{b}$.",
        "$\\sqrt{25} = 5$, un seul nombre. Mais l'équation $x^2 = 25$ a deux solutions, $5$ et $-5$.",
        "Pour comparer deux nombres positifs, je compare leurs carrés : le plus grand nombre a le plus grand carré.",
      ],
      exercices: [
        {
          enonce: "Calculer sans calculatrice.\n$A = 3\\sqrt{25} - \\sqrt{36}$\n$B = \\sqrt{8^2 + 15^2}$\n$C = \\sqrt{100 - 36}$",
          correction:
            "Je calcule chaque racine seule, puis j'applique les priorités.\n$A$ : $\\sqrt{25} = 5$ et $\\sqrt{36} = 6$. Donc $A = 3 \\times 5 - 6 = 9$.\n$B$ : sous la racine d'abord, $8^2 + 15^2 = 64 + 225 = 289$. Or $17^2 = 289$, donc $B = \\sqrt{289} = 17$.\n$C$ : sous la racine d'abord, $100 - 36 = 64$, donc $C = \\sqrt{64} = 8$.\n⛔ Le piège au $B$ : écrire $\\sqrt{8^2 + 15^2} = 8 + 15 = 23$. La barre du radical couvre toute la somme : je calcule la somme AVANT de prendre la racine.\n⛔ Même piège au $C$ : $\\sqrt{100} - \\sqrt{36} = 10 - 6 = 4$, pas $8$.\nRéponse : $A = 9$ ; $B = 17$ ; $C = 8$.",
          micros: ["entier_racine_calculer"],
        },
        {
          enonce: "Résoudre chaque équation.\na) $x^2 = 81$\nb) $x^2 = 7$\nc) $x^2 = -4$\nd) $x^2 = 0$",
          correction:
            "Je cherche TOUS les nombres dont le carré vaut le nombre de droite, positifs et négatifs.\na) $9^2 = 81$ et $(-9)^2 = 81$ : deux solutions, $x = 9$ ou $x = -9$.\nb) $7$ n'est pas un carré parfait, mais $\\left(\\sqrt{7}\\right)^2 = 7$ et $\\left(-\\sqrt{7}\\right)^2 = 7$ : $x = \\sqrt{7}$ ou $x = -\\sqrt{7}$.\nc) Un carré n'est jamais négatif : pas de solution.\nd) Seul $0$ a pour carré $0$ : une seule solution, $x = 0$.\n⛔ Le piège : oublier la solution négative. $\\sqrt{81}$ vaut $9$ tout court, mais l'équation $x^2 = 81$ a DEUX solutions.\nRéponse : a) $9$ et $-9$ ; b) $\\sqrt{7}$ et $-\\sqrt{7}$ ; c) aucune ; d) $0$.",
          // La parabole y = x² coupée par la droite y = 7 : deux points, deux
          // solutions, symétriques. La racine carrée n'en nomme qu'une.
          schema: repere([-4, 4, -1, 8], [{ q: [1, 0, 0] }], [{ x: -2.65, y: 7, label: "−√7" }, { x: 2.65, y: 7, label: "√7" }], 7),
          micros: ["entier_racine_comprendre"],
        },
        {
          enonce:
            "a) Encadrer $\\sqrt{200}$ entre deux entiers consécutifs.\nb) Encadrer $\\sqrt{200}$ au dixième près, sans la touche racine de la calculatrice.",
          correction:
            "a) $14^2 = 196$ et $15^2 = 225$. Comme $196 < 200 < 225$, j'ai $14 < \\sqrt{200} < 15$.\nb) J'essaie les dixièmes à partir de $14$, en les élevant au carré : $14{,}1^2 = 198{,}81$ ; $14{,}2^2 = 201{,}64$.\n$198{,}81 < 200 < 201{,}64$, donc $14{,}1 < \\sqrt{200} < 14{,}2$.\n⭐ $200$ est bien plus près de $196$ que de $225$ : je commence donc par les petits dixièmes, pas par $14{,}5$.\nRéponse : $14 < \\sqrt{200} < 15$, et au dixième $14{,}1 < \\sqrt{200} < 14{,}2$.",
          schema: intervalles(
            14,
            15,
            [{ de: 14.1, a: 14.2, deInclus: false, aInclus: false }],
            0.1,
            [{ value: 14.14, label: "√200" }],
          ),
          micros: ["entier_racine_encadrer"],
        },
        {
          enonce:
            "a) Par quel plus petit entier $n$ faut-il multiplier $12$ pour obtenir un carré parfait ?\nb) Même question avec $50$.\nc) Même question avec $45$.",
          correction:
            "Je décompose en produit de facteurs premiers : dans un carré parfait, chaque facteur premier apparaît un nombre PAIR de fois.\na) $12 = 2 \\times 2 \\times 3$. Le $2$ est en double, le $3$ est seul : il manque un $3$. $n = 3$, et $12 \\times 3 = 36 = 6^2$.\nb) $50 = 2 \\times 5 \\times 5$. Il manque un $2$ : $n = 2$, et $50 \\times 2 = 100 = 10^2$.\nc) $45 = 3 \\times 3 \\times 5$. Il manque un $5$ : $n = 5$, et $45 \\times 5 = 225 = 15^2$.\n⛔ Le piège : multiplier par le nombre lui-même. $12 \\times 12 = 144$ est bien un carré, mais $3$ est plus petit que $12$.\nRéponse : $n = 3$ ; $n = 2$ ; $n = 5$.",
          micros: ["entier_racine_carre_parfait", "entier_racine_defi"],
        },
        {
          enonce:
            "Un carreau carré a une aire de $0{,}09$ m².\na) Quelle est la longueur de son côté, en mètres puis en centimètres ?\nb) Combien de ces carreaux faut-il, alignés, pour couvrir une bande de $3{,}6$ m de long ?\nc) Une pièce carrée de $12{,}96$ m² est carrelée avec ces carreaux. Combien en faut-il ?",
          correction:
            "a) L'aire d'un carré est côté × côté. Je cherche le nombre positif dont le carré vaut $0{,}09$ : $0{,}3^2 = 0{,}09$, donc le côté mesure $\\sqrt{0{,}09} = 0{,}3$ m, soit $30$ cm.\nb) $3{,}6 \\div 0{,}3 = 12$ : il faut $12$ carreaux.\nc) Le côté de la pièce mesure $\\sqrt{12{,}96}$. Or $3{,}6^2 = 12{,}96$, donc le côté mesure $3{,}6$ m : $12$ carreaux par rangée, et $12$ rangées. Il faut $12 \\times 12 = 144$ carreaux.\n⭐ Contrôle par les aires : $12{,}96 \\div 0{,}09 = 144$.\n⛔ Le piège au a) : répondre $0{,}03$ m. Je vérifie : $0{,}03^2 = 0{,}0009$.\nRéponse : le côté mesure $30$ cm, la bande demande $12$ carreaux, la pièce $144$.",
          schema: carres([{ cote: 0.3, aire: "0,09 m²", coteTexte: "√0,09 = 0,3 m" }]),
          micros: ["entier_racine_calculer"],
        },
        {
          enonce:
            "Vrai ou faux ? Justifier par un calcul.\na) $\\sqrt{36 + 64} = \\sqrt{36} + \\sqrt{64}$\nb) $\\sqrt{4 \\times 25} = \\sqrt{4} \\times \\sqrt{25}$\nc) La racine carrée d'un nombre positif est toujours plus petite que ce nombre.\nd) $\\sqrt{16} = 16 \\div 2$",
          correction:
            "Je calcule les deux côtés séparément, puis je compare.\na) FAUX. $\\sqrt{36 + 64} = \\sqrt{100} = 10$, mais $\\sqrt{36} + \\sqrt{64} = 6 + 8 = 14$.\nb) VRAI. $\\sqrt{4 \\times 25} = \\sqrt{100} = 10$, et $\\sqrt{4} \\times \\sqrt{25} = 2 \\times 5 = 10$.\nc) FAUX. Un contre-exemple suffit : $\\sqrt{0{,}25} = 0{,}5$, et $0{,}5$ est plus grand que $0{,}25$. Entre $0$ et $1$, la racine est plus GRANDE que le nombre.\nd) FAUX. $\\sqrt{16} = 4$, alors que $16 \\div 2 = 8$.\n⛔ Le piège au a) : la racine d'une somme n'est pas la somme des racines. Pour le produit, au b), ça marche ; pour la somme, non.\nRéponse : faux, vrai, faux, faux.",
          micros: ["entier_racine_defi"],
        },
        {
          enonce:
            "a) Combien d'entiers $n$ vérifient $6 < \\sqrt{n} < 7$ ?\nb) Quel est le plus grand entier $n$ tel que $\\sqrt{n} < 10$ ?",
          correction:
            "a) Tout est positif : je peux élever au carré sans changer le sens des inégalités. $6 < \\sqrt{n} < 7$ revient à $36 < n < 49$.\nLes entiers de $37$ à $48$ conviennent : il y en a $48 - 37 + 1 = 12$.\nb) $\\sqrt{n} < 10$ revient à $n < 100$. Le plus grand entier est $n = 99$.\n⛔ Le piège au a) : compter $49 - 36 = 13$. Les bornes $36$ et $49$ sont exclues, car $\\sqrt{36} = 6$ et $\\sqrt{49} = 7$ ne sont pas strictement entre $6$ et $7$.\nRéponse : $12$ entiers ; $n = 99$.",
          micros: ["entier_racine_encadrer", "entier_racine_defi"],
        },
        {
          enonce:
            "Calculer.\n$A = \\left(\\sqrt{6}\\right)^2 + \\sqrt{7^2}$\n$B = \\left(\\sqrt{3}\\right)^2 \\times \\left(\\sqrt{3}\\right)^2$\n$C = \\sqrt{\\sqrt{81}}$\n$D = \\left(2\\sqrt{5}\\right)^2$",
          correction:
            "Je me sers de ce que le carré et la racine s'annulent.\n$A = 6 + 7 = 13$.\n$B = 3 \\times 3 = 9$.\n$C$ : je calcule de l'intérieur vers l'extérieur. $\\sqrt{81} = 9$, puis $\\sqrt{9} = 3$. Donc $C = 3$.\n$D$ : $\\left(2\\sqrt{5}\\right)^2 = 2\\sqrt{5} \\times 2\\sqrt{5} = 2 \\times 2 \\times \\sqrt{5} \\times \\sqrt{5} = 4 \\times 5 = 20$.\n⛔ Le piège au $D$ : répondre $2 \\times 5 = 10$. Le $2$ aussi est au carré.\nRéponse : $A = 13$ ; $B = 9$ ; $C = 3$ ; $D = 20$.",
          micros: ["entier_racine_comprendre", "entier_racine_calculer"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles. Valeur exacte, encadrement, valeur approchée, puis une phrase de réponse.",
      rappel: [
        "PYTHAGORE : dans un triangle rectangle, le carré de l'hypoténuse est la somme des carrés des deux autres côtés. J'additionne les CARRÉS, puis je prends la racine.",
        "Un carré d'aire $A$ a pour côté $\\sqrt{A}$. Une valeur approchée s'écrit avec le signe $\\approx$ et un arrondi.",
      ],
      exercices: [
        {
          titre: "Deux hectares",
          enonce:
            "Un hectare, c'est une aire de $10\\,000$ m².\na) Un champ carré mesure un hectare. Quelle est la longueur de son côté ?\nb) Un champ carré mesure deux hectares. Encadrer son côté entre deux entiers consécutifs, puis en donner une valeur arrondie au mètre.\nc) L'aire a doublé. Le côté a-t-il doublé ?",
          correction:
            "a) Le côté $c$ vérifie $c^2 = 10\\,000$. Or $100^2 = 10\\,000$, donc $c = \\sqrt{10\\,000} = 100$ m.\nb) Cette fois $c^2 = 20\\,000$, donc $c = \\sqrt{20\\,000}$. Ce n'est pas un carré parfait. J'encadre : $141^2 = 19\\,881$ et $142^2 = 20\\,164$, donc $141 < \\sqrt{20\\,000} < 142$.\nPour arrondir, je teste le milieu : $141{,}5^2 = 20\\,022{,}25$, plus que $20\\,000$. Donc $\\sqrt{20\\,000} < 141{,}5$ : au mètre, le côté mesure environ $141$ m.\nc) Non : le côté passe de $100$ m à environ $141$ m. Il est multiplié par environ $1{,}41$, pas par $2$.\n⛔ Le piège : croire qu'une aire double donne un côté double. Un côté de $200$ m donnerait $200^2 = 40\\,000$ m², soit QUATRE hectares.\nRéponse : le côté mesure $100$ m pour un hectare, environ $141$ m pour deux.",
          schema: carres([
            { cote: 100, aire: "1 ha", coteTexte: "100 m" },
            { cote: 141.42, aire: "2 ha", coteTexte: "≈ 141 m" },
          ]),
          micros: ["entier_racine_calculer", "entier_racine_encadrer", "entier_racine_defi"],
        },
        {
          titre: "La diagonale du terrain de handball",
          enonce:
            "Un terrain de handball est un rectangle de $40$ m sur $20$ m. Un joueur le traverse en ligne droite, d'un coin au coin opposé.\na) Montrer que la longueur de cette diagonale est $\\sqrt{2\\,000}$ m.\nb) Encadrer cette longueur entre deux entiers consécutifs.\nc) En donner une valeur arrondie au centimètre, à la calculatrice.\nd) Combien de mètres gagne-t-il par rapport au trajet qui longe deux côtés ?",
          correction:
            "a) La diagonale coupe le rectangle en deux triangles rectangles. Par le théorème de Pythagore : $d^2 = 40^2 + 20^2 = 1\\,600 + 400 = 2\\,000$. Donc $d = \\sqrt{2\\,000}$ m.\nb) $44^2 = 1\\,936$ et $45^2 = 2\\,025$. Comme $1\\,936 < 2\\,000 < 2\\,025$, j'ai $44 < d < 45$.\nc) À la calculatrice, $\\sqrt{2\\,000} \\approx 44{,}72$ m. C'est bien entre $44$ et $45$.\nd) En longeant deux côtés : $40 + 20 = 60$ m. Il gagne $60 - 44{,}72 = 15{,}28$ m.\n⛔ Le piège : écrire $\\sqrt{40^2 + 20^2} = 40 + 20 = 60$. C'est justement le trajet qu'il évite : la racine d'une somme de carrés n'est pas la somme.\nRéponse : la diagonale mesure $\\sqrt{2\\,000} \\approx 44{,}72$ m, soit $15{,}28$ m de moins que le tour par les côtés.",
          schema: triangle(
            { A: [0, 0], B: [40, 0], C: [40, 20] },
            { cotes: { AB: "40 m", BC: "20 m", CA: "√2000 m" }, droit: "B" },
          ),
          micros: ["entier_racine_calculer", "entier_racine_encadrer"],
        },
        {
          titre: "La taille d'un écran",
          enonce:
            "L'écran d'un ordinateur portable mesure $34{,}5$ cm de large et $19{,}4$ cm de haut. Les fabricants annoncent la taille d'un écran par sa DIAGONALE, en pouces ($1$ pouce $= 2{,}54$ cm).\na) Calculer la diagonale, arrondie au millimètre.\nb) La convertir en pouces, au dixième.\nc) Un vendeur dit : « la diagonale, c'est la largeur plus la hauteur ». Qu'en penser ?",
          correction:
            "a) La diagonale est l'hypoténuse du triangle rectangle formé par la largeur et la hauteur. $d^2 = 34{,}5^2 + 19{,}4^2 = 1\\,190{,}25 + 376{,}36 = 1\\,566{,}61$.\nDonc $d = \\sqrt{1\\,566{,}61} \\approx 39{,}6$ cm.\n⭐ Contrôle sans la touche racine : $39^2 = 1\\,521$ et $40^2 = 1\\,600$, donc $39 < d < 40$.\nb) $39{,}6 \\div 2{,}54 \\approx 15{,}6$ pouces : c'est un écran « 15,6 pouces », une taille courante.\nc) $34{,}5 + 19{,}4 = 53{,}9$ cm : bien plus que $39{,}6$ cm. Dans un triangle, un côté est toujours plus court que la somme des deux autres.\n⛔ Le piège : $\\sqrt{34{,}5^2 + 19{,}4^2} \\neq 34{,}5 + 19{,}4$. J'additionne les CARRÉS, puis je prends la racine.\nRéponse : la diagonale mesure environ $39{,}6$ cm, soit $15{,}6$ pouces.",
          schema: triangle(
            { A: [0, 0], B: [34.5, 0], C: [34.5, 19.4] },
            { cotes: { AB: "34,5 cm", BC: "19,4 cm", CA: "≈ 39,6 cm" }, droit: "B" },
          ),
          micros: ["entier_racine_calculer", "entier_racine_encadrer", "entier_racine_defi"],
        },
        {
          titre: "Deux fois plus longtemps",
          enonce:
            "Si on néglige la résistance de l'air, un objet lâché d'une hauteur $h$ (en mètres) touche le sol au bout de $t = \\sqrt{h \\div 4{,}9}$ secondes.\na) Calculer $t$ pour $h = 19{,}6$ m.\nb) Calculer $t$ pour une hauteur quatre fois plus grande, $h = 78{,}4$ m.\nc) De quelle hauteur faut-il lâcher l'objet pour qu'il tombe pendant $3$ secondes ?\nd) Pour tomber deux fois plus longtemps, faut-il partir deux fois plus haut ?",
          correction:
            "a) $19{,}6 \\div 4{,}9 = 4$, donc $t = \\sqrt{4} = 2$ s.\nb) $78{,}4 \\div 4{,}9 = 16$, donc $t = \\sqrt{16} = 4$ s.\nc) Je remonte le calcul à l'envers : $\\sqrt{h \\div 4{,}9} = 3$, donc $h \\div 4{,}9 = 3^2 = 9$, et $h = 9 \\times 4{,}9 = 44{,}1$ m.\nd) Non. Aux a) et b), la hauteur est multipliée par $4$ et le temps seulement par $2$ : pour tomber deux fois plus longtemps, il faut partir QUATRE fois plus haut, parce que $2^2 = 4$.\n⛔ Le piège au c) : calculer $3 \\times 4{,}9 = 14{,}7$ m, en oubliant le carré. Je vérifie : $\\sqrt{14{,}7 \\div 4{,}9} = \\sqrt{3} \\approx 1{,}73$ s, pas $3$ s.\nRéponse : $2$ s ; $4$ s ; il faut lâcher l'objet de $44{,}1$ m pour $3$ secondes.",
          micros: ["entier_racine_comprendre", "entier_racine_defi"],
        },
      ],
    },
  ],
};
