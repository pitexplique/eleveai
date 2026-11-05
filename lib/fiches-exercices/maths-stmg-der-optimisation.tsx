// ─── Fiche d'exercices : problèmes d'optimisation (STMG) — 20 exercices ────────
//
// Notion der_optimisation du coach (banque
// `lib/tutor-v4/questionBank/stmg/maths/derivation.bank.ts` et son renfort
// `derivation-renfort.ts`). Le coach demande : la quantité ou le prix qui rend un
// bénéfice ou une recette maximal, la quantité qui rend un coût minimal, la valeur
// de cet optimum, le bénéfice recette moins coût, la dérivée factorisée DONNÉE
// (avec la racine hors de l'intervalle), et la phrase de conclusion dans le
// contexte. Ici, la phrase se vérifie par ses deux nombres ou par son numéro.
//
// Aucune donnée réelle : tout est un modèle ou une situation visiblement fictive.
// La consommation automobile (ex. 15) est un modèle, pas une mesure.
//
// Domaines et métiers : calculs (1 à 6), couture (couturier, 7), torréfaction
// (torréfactrice, 8) ; savonnerie (savonnière, 9), salle d'escalade (gérant, 10),
// surf (fabricante de planches, 11), informatique (administratrice réseau, 12),
// confiserie (confiseur, 13), librairie (libraire, 14), automobile (ingénieure, 15),
// agriculture (agricultrice, 16) ; concert (programmatrice, 17), ski (atelier, 18),
// logistique (logisticien, 19), RH (responsable de formation, 20).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-stmg-derivation.mjs`.
//
// Micro-compétences : der_o_benefice (1, 2, 6, 9, 10, 11, 14, 16, 17, 18), der_o_cout
// (3, 4, 5, 12, 13, 15, 19, 20), der_o_conclure (7, 8, 11, 14, 15, 16, 17, 20). 3/3.

import { CanvasRenderer } from "@/lib/canvas";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { tableauSignes } from "@/lib/fiches-exercices/figures";

const nb = (n: number) => String(n).replace("-", "−").replace(".", ",");

/** Le tableau de variations : signe de la dérivée en haut, valeurs en bas. Chaque
 *  borne intérieure annule la dérivée (le « 0 » écrit sous elle). */
function tableauDerivee(bornes: number[], signes: ("+" | "-")[], valeurs: number[], f = "B", variable = "x") {
  return (
    <div className="mx-auto w-full max-w-[22rem] print:max-w-[14rem]">
      <CanvasRenderer
        figure={{
          kind: "tableau_variations",
          variable,
          bornes: bornes.map(nb),
          derivee: { label: `${f} ′(${variable})`, signes, marques: Array(bornes.length - 2).fill("0") },
          variations: { label: `${f}(${variable})`, valeurs: valeurs.map(nb) },
          size: { width: 380, height: 200 },
        }}
      />
    </div>
  );
}

export const exercicesDerOptimisationStmg: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "stmg",
  notion: "der-optimisation",
  titre: "Problèmes d'optimisation",
  accroche:
    "Vingt exercices pour répondre à la vraie question : combien produire, à quel prix vendre, pour gagner le plus ou dépenser le moins ? On dérive, on trouve où la dérivée s'annule, on vérifie le signe, on calcule, et on conclut par une phrase. Des savons, une salle d'escalade, un concert, des skis, la consommation d'une voiture. Un rappel de cours avant chaque niveau, une correction étape par étape avec le tableau et le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=stmg",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice : trouver la quantité, calculer la valeur, ou écrire la conclusion.",
      rappel: [
        "On cherche où la dérivée s'annule : on résout $B'(x) = 0$ ou $C'(x) = 0$.",
        "Dérivée qui passe de + à $-$ : la grandeur monte puis descend, c'est un MAXIMUM. De $-$ à + : c'est un MINIMUM.",
        "La quantité, c'est $x$. La valeur de l'optimum, c'est l'image : on remplace $x$ dans $B$ ou dans $C$.",
        "La conclusion donne les deux, dans le contexte : « Pour 12 vélos, le bénéfice est maximal et vaut 900 €. »",
      ],
      exercices: [
        {
          enonce:
            "Le bénéfice, en euros, pour $x$ objets vendus est $B(x) = -x^2 + 40x - 100$.\na) Donne l'expression de $B'(x)$.\nb) Pour quelle quantité le bénéfice est-il maximal ?",
          reponses: [
            { question: "a)", attendu: ["-2x + 40", "B'(x) = -2x + 40"] },
            { question: "b)", attendu: "20" },
          ],
          correction:
            "a) $B'(x) = -2x + 40$.\nb) $-2x + 40 = 0$, donc $x = 20$. Avant 20, $B'$ est positive ; après, négative : c'est bien un maximum.\n⛔ Le piège au b) : répondre 40, le nombre de la dérivée. On résout l'équation.\nRéponse : a) $-2x + 40$ ; b) 20.",
          micros: ["der_o_benefice"],
        },
        {
          enonce:
            "Le bénéfice, en euros, pour $x$ objets vendus est $B(x) = -3x^2 + 240x - 1000$. Le maximum est atteint pour $x = 40$. Combien vaut ce bénéfice maximal ?",
          reponses: [{ attendu: "3800 €" }],
          correction:
            "On remplace $x$ par 40 dans $B$.\n$B(40) = -3 \\times 1\\,600 + 240 \\times 40 - 1\\,000 = -4\\,800 + 9\\,600 - 1\\,000 = 3\\,800$ €.\n⛔ Le piège : répondre 40. Ce nombre est la quantité, pas le bénéfice.\nRéponse : 3 800 €.",
          micros: ["der_o_benefice"],
        },
        {
          enonce:
            "Pour une série de $x$ pièces, le coût unitaire est $C(x) = x^2 - 60x + 1200$, en centimes. Quelle valeur de $x$ rend ce coût minimal ?",
          reponses: [{ attendu: "30" }],
          correction:
            "$C'(x) = 2x - 60$.\n$2x - 60 = 0$, donc $x = 30$.\nAvant 30, $C'$ est négative ; après, positive : c'est bien un minimum.\n⛔ Le piège : oublier de diviser par 2 et répondre 60.\nRéponse : 30.",
          micros: ["der_o_cout"],
        },
        {
          enonce:
            "Le coût est $C(x) = 0{,}5x^2 - 20x + 300$, en euros. Il est minimal pour $x = 20$. Combien vaut ce coût minimal ?",
          reponses: [{ attendu: "100 €" }],
          correction:
            "On remplace $x$ par 20 dans $C$.\n$C(20) = 0{,}5 \\times 400 - 400 + 300 = 200 - 400 + 300 = 100$ €.\n⛔ Le piège : remplacer dans $C'$. On trouverait 0, ce qui est normal : c'est la dérivée qui s'annule, pas le coût.\nRéponse : 100 €.",
          micros: ["der_o_cout"],
        },
        {
          enonce:
            "On a trouvé $C'(20) = 0$. De plus, $C'(x) < 0$ avant 20 et $C'(x) > 0$ après 20. En $x = 20$, le coût a-t-il un maximum ou un minimum ? Réponds maximum ou minimum.",
          reponses: [{ attendu: "minimum" }],
          correction:
            "Avant 20, $C'$ est négative : le coût descend.\nAprès 20, $C'$ est positive : le coût remonte.\nIl descend puis remonte : c'est un minimum.\n⛔ Le piège : croire que $C'(20) = 0$ suffit. C'est le changement de signe qui prouve le minimum.\nRéponse : minimum.",
          micros: ["der_o_cout"],
        },
        {
          enonce:
            "Le tableau donne le signe de la dérivée d'un bénéfice $B$.\na) Le bénéfice a-t-il un maximum ou un minimum ? Réponds maximum ou minimum.\nb) Pour quelle quantité ?",
          figure: tableauSignes(["0", "25", "50"], [["$B'(x)$", ["+", "-"], ["0"]]]),
          reponses: [
            { question: "a)", attendu: "maximum" },
            { question: "b)", attendu: "25" },
          ],
          correction:
            "a) $B'$ passe de + à $-$ : le bénéfice monte puis descend, c'est un maximum.\nb) Le changement de signe a lieu en $x = 25$.\n⛔ Le piège au b) : répondre 50, la plus grande valeur de la ligne. Ce n'est que le bout de l'intervalle.\nRéponse : a) maximum ; b) 25.",
          micros: ["der_o_benefice"],
        },
        {
          enonce:
            "Un couturier étudie son bénéfice $B(x)$ pour $x$ robes. L'étude donne un maximum en $x = 15$, avec $B(15) = 2250$. Complète la phrase : « Pour … robes, le bénéfice est maximal et vaut … €. » Donne les deux nombres dans cet ordre.",
          reponses: [{ attendu: "15 ; 2250", ordre: true }],
          correction:
            "Le premier blanc attend la quantité : 15 robes.\nLe second attend le bénéfice : 2 250 €.\nPour 15 robes, le bénéfice est maximal et vaut 2 250 €.\n⛔ Le piège : échanger les deux nombres. « 2 250 robes pour 15 € » n'a aucun sens : on relit sa phrase.\nRéponse : 15 ; 2 250.",
          micros: ["der_o_conclure"],
        },
        {
          enonce:
            "Une torréfactrice cherche la taille de série qui rend le coût unitaire minimal. Le calcul donne un minimum en $x = 50$, avec $C(50) = 38$ €. Quelle phrase répond au problème ? Écris son numéro.\n1. En fabriquant des séries de 38 sacs de café, le coût unitaire est minimal : 50 €.\n2. En fabriquant des séries de 50 sacs de café, le coût unitaire est minimal : 38 €.\n3. En fabriquant des séries de 50 sacs de café, le coût unitaire est maximal : 38 €.",
          reponses: [{ attendu: "2" }],
          correction:
            "$x = 50$ est la taille de la série, en sacs.\n$C(50) = 38$ est le coût, en euros.\nC'est un minimum : le mot « maximal » de la phrase 3 est faux.\nLa bonne phrase est la phrase 2.\n⛔ Le piège : choisir la phrase 1, qui échange la quantité et la valeur.\nRéponse : 2.",
          micros: ["der_o_conclure"],
        },
      ],
    },
    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Une situation à lire : on écrit la fonction, on dérive, on trouve l'optimum, on conclut.",
      rappel: [
        "Le bénéfice est la recette moins le coût : $B(x) = R(x) - C(x)$. Si chaque unité se vend $p$ euros, $R(x) = px$.",
        "Si on choisit un prix $p$, la recette est le prix multiplié par le nombre de ventes, et on dérive par rapport à $p$.",
        "Une dérivée factorisée donnée : on ne garde que les solutions qui sont dans l'intervalle.",
        "Le tableau de variations prouve l'optimum : on y lit où la flèche change de sens.",
      ],
      exercices: [
        {
          enonce:
            "Une savonnière vend chaque coffret de savons 30 €. Le coût de production de $x$ coffrets est $C(x) = x^2 + 10x + 50$, en euros (modèle).\na) Donne l'expression du bénéfice $B(x)$.\nb) Donne l'expression de $B'(x)$.\nc) Combien de coffrets faut-il vendre pour un bénéfice maximal ?\nd) Quel est ce bénéfice ?",
          reponses: [
            { question: "a)", attendu: ["-x^2 + 20x - 50", "B(x) = -x^2 + 20x - 50"] },
            { question: "b)", attendu: ["-2x + 20", "B'(x) = -2x + 20"] },
            { question: "c)", attendu: "10" },
            { question: "d)", attendu: "50 €" },
          ],
          correction:
            "a) $B(x) = 30x - (x^2 + 10x + 50) = -x^2 + 20x - 50$.\nb) $B'(x) = -2x + 20$.\nc) $-2x + 20 = 0$, donc $x = 10$.\nd) $B(10) = -100 + 200 - 50 = 50$ €.\n⛔ Le piège au a) : oublier la parenthèse, et ne soustraire que $x^2$. Tout le coût se soustrait.\nRéponse : a) $-x^2 + 20x - 50$ ; b) $-2x + 20$ ; c) 10 ; d) 50 €.",
          schema: tableauDerivee([0, 10, 20], ["+", "-"], [-50, 50, -50]),
          micros: ["der_o_benefice"],
        },
        {
          enonce:
            "Le gérant d'une salle d'escalade fixe le prix $p$ d'une entrée, en euros. Une étude prévoit $300 - 20p$ entrées par jour (modèle). La recette est donc $R(p) = -20p^2 + 300p$.\na) Donne l'expression de $R'(p)$.\nb) Pour quel prix la recette est-elle maximale ?\nc) Combien d'entrées vend-il à ce prix ?\nd) Quelle est la recette maximale ?",
          reponses: [
            { question: "a)", attendu: ["-40p + 300", "R'(p) = -40p + 300"] },
            { question: "b)", attendu: "7,5 €" },
            { question: "c)", attendu: "150" },
            { question: "d)", attendu: "1125 €" },
          ],
          correction:
            "a) $R'(p) = -40p + 300$.\nb) $-40p + 300 = 0$, donc $p = 300 \\div 40 = 7{,}5$ €.\nc) $300 - 20 \\times 7{,}5 = 300 - 150 = 150$ entrées.\nd) $150 \\times 7{,}5 = 1\\,125$ €.\nVérification : $R(7{,}5) = -1\\,125 + 2\\,250 = 1\\,125$. ✔\n⛔ Le piège au c) : répondre 300. Le nombre d'entrées dépend du prix : on remplace $p$.\nRéponse : a) $-40p + 300$ ; b) 7,5 € ; c) 150 ; d) 1 125 €.",
          schema: tableauDerivee([0, 7.5, 15], ["+", "-"], [0, 1125, 0], "R", "p"),
          micros: ["der_o_benefice"],
        },
        {
          enonce:
            "Une fabricante de planches de surf produit $x$ centaines de planches, avec $x$ entre 0 et 10. Le bénéfice, en milliers d'euros, est $B(x) = -x^3 + 75x - 20$ (modèle). On admet que $B'(x) = -3(x - 5)(x + 5)$.\na) Quelle valeur de $x$, dans l'intervalle, annule $B'(x)$ ?\nb) Calcule le bénéfice pour cette valeur.\nc) Calcule $B(10)$.\nd) Complète : « Pour … centaines de planches, le bénéfice est maximal et vaut … milliers d'euros. » Donne les deux nombres dans cet ordre.",
          reponses: [
            { question: "a)", attendu: "5" },
            { question: "b)", attendu: "230" },
            { question: "c)", attendu: "-270" },
            { question: "d)", attendu: "5 ; 230", ordre: true },
          ],
          correction:
            "a) $B'(x) = 0$ pour $x = 5$ ou $x = -5$. Seul 5 est entre 0 et 10.\nb) $B(5) = -125 + 375 - 20 = 230$.\nc) $B(10) = -1\\,000 + 750 - 20 = -270$.\nd) Au départ, $B(0) = -20$. La plus grande valeur du tableau est 230.\nPour 5 centaines de planches, le bénéfice est maximal et vaut 230 milliers d'euros.\n⛔ Le piège au a) : garder $-5$. Une production négative n'a pas de sens, et $-5$ n'est pas dans l'intervalle.\nRéponse : a) 5 ; b) 230 ; c) $-270$ ; d) 5 ; 230.",
          schema: tableauDerivee([0, 5, 10], ["+", "-"], [-20, 230, -270]),
          micros: ["der_o_benefice", "der_o_conclure"],
        },
        {
          enonce:
            "Une administratrice réseau modélise la dépense d'énergie d'un serveur, en kWh par jour, selon sa charge $x$, en dizaines de pourcents, par $D(x) = x^3 - 15x^2 + 63x + 20$, pour $x$ entre 3 et 10. On admet que $D'(x) = 3(x - 3)(x - 7)$.\na) Quel est le signe de $D'(x)$ entre 3 et 7 ? Réponds positif ou négatif.\nb) Pour quelle charge $x$ la dépense est-elle minimale ?\nc) Quelle est cette dépense minimale ?",
          reponses: [
            { question: "a)", attendu: ["négatif", "négative"] },
            { question: "b)", attendu: "7" },
            { question: "c)", attendu: "69" },
          ],
          correction:
            "a) Entre 3 et 7 : $x - 3$ est positif et $x - 7$ est négatif, donc le produit est négatif.\nb) $D'$ passe de $-$ à + en $x = 7$ : la dépense est minimale.\nc) $D(7) = 343 - 735 + 441 + 20 = 69$.\nAux bornes : $D(3) = 101$ et $D(10) = 150$, plus grands.\n⛔ Le piège au b) : choisir $x = 3$, parce que la dérivée s'y annule aussi. C'est la borne de départ, et la dépense y est plus élevée.\nRéponse : a) négatif ; b) 7 ; c) 69.",
          schema: tableauDerivee([3, 7, 10], ["-", "+"], [101, 69, 150], "D"),
          micros: ["der_o_cout"],
        },
        {
          enonce:
            "Un confiseur fabrique ses bocaux par séries. Pour une série de $x$ bocaux, le coût unitaire est $C(x) = 0{,}1x^2 - 12x + 500$, en centimes, sur $[0\\,;120]$ (modèle).\na) Donne l'expression de $C'(x)$.\nb) Quelle taille de série rend ce coût minimal ?\nc) Combien vaut le coût unitaire minimal, en centimes ?\nd) Écris ce coût en euros.",
          reponses: [
            { question: "a)", attendu: ["0,2x - 12", "C'(x) = 0,2x - 12"] },
            { question: "b)", attendu: "60" },
            { question: "c)", attendu: "140" },
            { question: "d)", attendu: "1,4 €" },
          ],
          correction:
            "a) $C'(x) = 0{,}2x - 12$.\nb) $0{,}2x = 12$, donc $x = 12 \\div 0{,}2 = 60$.\nc) $C(60) = 360 - 720 + 500 = 140$ centimes.\nd) $140 \\div 100 = 1{,}4$, soit 1,40 €.\n⛔ Le piège au c) : confondre centimes et euros. Le modèle compte en centimes, l'unité se relit dans l'énoncé.\nRéponse : a) $0{,}2x - 12$ ; b) 60 ; c) 140 ; d) 1,4 €.",
          schema: tableauDerivee([0, 60, 120], ["-", "+"], [500, 140, 500], "C"),
          micros: ["der_o_cout"],
        },
        {
          enonce:
            "Un libraire a dressé le tableau de variations de son bénéfice $B(x)$, en euros, pour $x$ livres entre 0 et 60.\na) Pour combien de livres le bénéfice est-il maximal ?\nb) Combien vaut ce bénéfice ?\nc) Quelle phrase est juste ? Écris son numéro.\n1. Pour 60 livres, le bénéfice est maximal : 700 €.\n2. Pour 1 500 livres, le bénéfice est maximal : 40 €.\n3. Pour 40 livres, le bénéfice est maximal : 1 500 €.",
          figure: tableauDerivee([0, 40, 60], ["+", "-"], [-100, 1500, 700]),
          reponses: [
            { question: "a)", attendu: "40" },
            { question: "b)", attendu: "1500 €" },
            { question: "c)", attendu: "3" },
          ],
          correction:
            "a) La flèche monte jusqu'en 40, puis descend : le maximum est en $x = 40$.\nb) Sous cette abscisse, on lit 1 500 € : $B(40) = 1\\,500$.\nc) La phrase 3 donne la bonne quantité et la bonne valeur.\n⛔ Le piège au a) : répondre 60, le dernier nombre de la ligne des $x$. Le bénéfice y est déjà retombé à 700 €.\nRéponse : a) 40 ; b) 1 500 € ; c) 3.",
          micros: ["der_o_benefice", "der_o_conclure"],
        },
        {
          enonce:
            "Une ingénieure automobile modélise la consommation d'une voiture par $C(v) = 0{,}001v^2 - 0{,}16v + 12$, en litres aux 100 km, où $v$ est la vitesse en km/h, sur $[40\\,;120]$ (modèle).\na) Donne l'expression de $C'(v)$.\nb) Pour quelle vitesse la consommation est-elle minimale ?\nc) Quelle est cette consommation ?\nd) Complète : « À … km/h, la consommation est minimale et vaut … litres aux 100 km. » Donne les deux nombres dans cet ordre.",
          reponses: [
            { question: "a)", attendu: ["0,002v - 0,16", "C'(v) = 0,002v - 0,16"] },
            { question: "b)", attendu: "80 km/h" },
            { question: "c)", attendu: "5,6" },
            { question: "d)", attendu: "80 ; 5,6", ordre: true },
          ],
          correction:
            "a) $C'(v) = 0{,}002v - 0{,}16$.\nb) $0{,}002v = 0{,}16$, donc $v = 0{,}16 \\div 0{,}002 = 80$ km/h.\nc) $C(80) = 6{,}4 - 12{,}8 + 12 = 5{,}6$ litres aux 100 km.\nd) À 80 km/h, la consommation est minimale et vaut 5,6 litres aux 100 km.\nAux bornes : $C(40) = C(120) = 7{,}2$.\n⛔ Le piège au c) : calculer $0{,}001 \\times 80$ sans le carré. D'abord $80^2 = 6\\,400$.\nRéponse : a) $0{,}002v - 0{,}16$ ; b) 80 km/h ; c) 5,6 ; d) 80 ; 5,6.",
          schema: tableauDerivee([40, 80, 120], ["-", "+"], [7.2, 5.6, 7.2], "C", "v"),
          micros: ["der_o_cout", "der_o_conclure"],
        },
        {
          enonce:
            "Une agricultrice étudie son bénéfice par hectare selon la quantité d'engrais : $B(x) = -0{,}5x^2 + 20x + 100$, en euros, où $x$ est en kg d'engrais par hectare, sur $[0\\,;40]$ (modèle).\na) Donne l'expression de $B'(x)$.\nb) Quelle quantité d'engrais rend le bénéfice maximal ?\nc) Quel est ce bénéfice ?\nd) Complète : « Avec … kg par hectare, le bénéfice est maximal et vaut … €. » Donne les deux nombres dans cet ordre.",
          reponses: [
            { question: "a)", attendu: ["-x + 20", "B'(x) = -x + 20"] },
            { question: "b)", attendu: "20 kg" },
            { question: "c)", attendu: "300 €" },
            { question: "d)", attendu: "20 ; 300", ordre: true },
          ],
          correction:
            "a) $B'(x) = -x + 20$.\nb) $-x + 20 = 0$, donc $x = 20$ kg.\nc) $B(20) = -200 + 400 + 100 = 300$ €.\nd) Avec 20 kg par hectare, le bénéfice est maximal et vaut 300 €.\nAux bornes : $B(0) = 100$ et $B(40) = 100$.\n⛔ Le piège au b) : croire qu'il faut toujours plus d'engrais. Au-delà de 20 kg, le bénéfice baisse.\nRéponse : a) $-x + 20$ ; b) 20 kg ; c) 300 € ; d) 20 ; 300.",
          schema: tableauDerivee([0, 20, 40], ["+", "-"], [100, 300, 100]),
          micros: ["der_o_benefice", "der_o_conclure"],
        },
      ],
    },
    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Le problème entier : poser la fonction, l'étudier, vérifier, et répondre à la question posée.",
      rappel: [
        "On répond à la question posée : une quantité, un prix, un montant, ou la phrase entière.",
        "On relit la conclusion avec les unités. Une phrase absurde signale deux nombres échangés.",
        "Comparer à la situation actuelle : l'économie est l'écart entre le coût actuel et le coût minimal.",
      ],
      exercices: [
        {
          titre: "Le prix du concert",
          enonce:
            "Une programmatrice fixe le prix $p$ d'un billet de concert, en euros, dans une salle de 800 places. Une étude prévoit $800 - 20p$ spectateurs (modèle).\na) Écris la recette $R(p)$, sous forme développée.\nb) Donne l'expression de $R'(p)$.\nc) Pour quel prix la recette est-elle maximale ?\nd) Combien de spectateurs viendront à ce prix ?\ne) Quelle est la recette maximale ?",
          reponses: [
            { question: "a)", attendu: ["-20p^2 + 800p", "800p - 20p^2"], exact: true },
            { question: "b)", attendu: ["-40p + 800", "R'(p) = -40p + 800"] },
            { question: "c)", attendu: "20 €" },
            { question: "d)", attendu: "400" },
            { question: "e)", attendu: "8000 €" },
          ],
          correction:
            "a) Recette = prix × nombre de spectateurs : $R(p) = p(800 - 20p) = -20p^2 + 800p$.\nb) $R'(p) = -40p + 800$.\nc) $-40p + 800 = 0$, donc $p = 20$ €.\nd) $800 - 20 \\times 20 = 400$ spectateurs.\ne) $400 \\times 20 = 8\\,000$ €.\nConclusion : à 20 € le billet, la recette est maximale et vaut 8 000 €, avec une salle à moitié pleine.\n⛔ Le piège : croire que remplir la salle rapporte le plus. À 800 spectateurs, le billet est à 0 € : la recette est nulle.\nRéponse : a) $-20p^2 + 800p$ ; b) $-40p + 800$ ; c) 20 € ; d) 400 ; e) 8 000 €.",
          schema: tableauDerivee([0, 20, 40], ["+", "-"], [0, 8000, 0], "R", "p"),
          micros: ["der_o_benefice", "der_o_conclure"],
        },
        {
          titre: "L'atelier de skis",
          enonce:
            "Un atelier produit $x$ paires de skis, avec $x$ entre 0 et 15. Le coût est $C(x) = x^3 - 12x^2 + 60x + 100$, en euros, et chaque paire se vend 120 € (modèle).\na) Donne l'expression du bénéfice $B(x)$.\nb) Donne l'expression de $B'(x)$.\nc) On propose $B'(x) = -3(x - 10)(x + 2)$. Est-ce exact ? Réponds oui ou non.\nd) Combien de paires faut-il produire pour un bénéfice maximal ?\ne) Quel est ce bénéfice ?",
          reponses: [
            { question: "a)", attendu: ["-x^3 + 12x^2 + 60x - 100", "B(x) = -x^3 + 12x^2 + 60x - 100"] },
            { question: "b)", attendu: ["-3x^2 + 24x + 60", "B'(x) = -3x^2 + 24x + 60"] },
            { question: "c)", attendu: "oui" },
            { question: "d)", attendu: "10" },
            { question: "e)", attendu: "700 €" },
          ],
          correction:
            "a) $B(x) = 120x - C(x) = -x^3 + 12x^2 - 60x + 120x - 100 = -x^3 + 12x^2 + 60x - 100$.\nb) $B'(x) = -3x^2 + 24x + 60$.\nc) $(x - 10)(x + 2) = x^2 - 8x - 20$, et $-3(x^2 - 8x - 20) = -3x^2 + 24x + 60$ : oui.\nd) $B'(x) = 0$ pour $x = 10$ ou $x = -2$. Seul 10 est dans l'intervalle, et $B'$ y passe de + à $-$.\ne) $B(10) = -1\\,000 + 1\\,200 + 600 - 100 = 700$ €.\nAux bornes : $B(0) = -100$ et $B(15) = 125$.\n⛔ Le piège au a) : oublier de changer les signes en soustrayant le coût : $-(-12x^2) = +12x^2$.\nRéponse : a) $-x^3 + 12x^2 + 60x - 100$ ; b) $-3x^2 + 24x + 60$ ; c) oui ; d) 10 ; e) 700 €.",
          schema: tableauDerivee([0, 10, 15], ["+", "-"], [-100, 700, 125]),
          micros: ["der_o_benefice"],
        },
        {
          titre: "La bonne taille de commande",
          enonce:
            "Un logisticien modélise le coût annuel de stockage d'un entrepôt par $C(x) = 2x^2 - 120x + 2500$, en euros, où $x$ est la taille des commandes, en centaines d'unités. Il commande aujourd'hui par lots de 40 centaines.\na) Donne l'expression de $C'(x)$.\nb) Quelle taille de commande rend le coût minimal ?\nc) Quel est ce coût minimal ?\nd) Quel est le coût aujourd'hui ?\ne) Combien d'euros par an économiserait-il en changeant ?",
          reponses: [
            { question: "a)", attendu: ["4x - 120", "C'(x) = 4x - 120"] },
            { question: "b)", attendu: "30" },
            { question: "c)", attendu: "700 €" },
            { question: "d)", attendu: "900 €" },
            { question: "e)", attendu: "200 €" },
          ],
          correction:
            "a) $C'(x) = 4x - 120$.\nb) $4x = 120$, donc $x = 30$ centaines. $C'$ passe de $-$ à + : c'est un minimum.\nc) $C(30) = 1\\,800 - 3\\,600 + 2\\,500 = 700$ €.\nd) $C(40) = 3\\,200 - 4\\,800 + 2\\,500 = 900$ €.\ne) $900 - 700 = 200$ € par an.\n⛔ Le piège au e) : répondre $40 - 30 = 10$. L'économie se compte en euros, entre les deux coûts.\nRéponse : a) $4x - 120$ ; b) 30 ; c) 700 € ; d) 900 € ; e) 200 €.",
          micros: ["der_o_cout"],
        },
        {
          titre: "La phrase du rapport",
          enonce:
            "Une responsable de formation modélise le coût d'un plan de formation par $C(t) = t^2 - 24t + 200$, en milliers d'euros, où $t$ est le nombre d'heures par salarié. Un rapport écrit : « Le coût est minimal pour 56 heures, et il vaut 12 milliers d'euros. »\na) Pour combien d'heures le coût est-il minimal ?\nb) Quel est ce coût minimal, en milliers d'euros ?\nc) La phrase du rapport est-elle juste ? Réponds vrai ou faux.\nd) Complète la bonne phrase : « Le coût est minimal pour … heures, et il vaut … milliers d'euros. » Donne les deux nombres dans cet ordre.",
          reponses: [
            { question: "a)", attendu: "12" },
            { question: "b)", attendu: "56" },
            { question: "c)", attendu: "faux" },
            { question: "d)", attendu: "12 ; 56", ordre: true },
          ],
          correction:
            "a) $C'(t) = 2t - 24$, qui s'annule en $t = 12$, et passe de $-$ à + : minimum.\nb) $C(12) = 144 - 288 + 200 = 56$.\nc) Faux : le rapport a échangé les deux nombres.\nd) Le coût est minimal pour 12 heures, et il vaut 56 milliers d'euros.\n⛔ Le piège : écrire la bonne quantité et la bonne valeur au mauvais endroit. On relit la phrase avec ses unités.\nRéponse : a) 12 ; b) 56 ; c) faux ; d) 12 ; 56.",
          schema: tableauDerivee([0, 12, 24], ["-", "+"], [200, 56, 200], "C", "t"),
          micros: ["der_o_cout", "der_o_conclure"],
        },
      ],
    },
  ],
};
