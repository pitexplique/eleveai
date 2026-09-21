// ─── Fiche d'exercices : proportionnalité et pourcentages (3e) — 20 exercices corrigés ─
//
// ⭐ LA PREMIÈRE FEUILLE DE 3e (21/09/2026). Elle ferme le trio de la Une du
// collège : le short « +20 % puis −20 % : tu n'es pas revenu au départ » (la
// tablette de 100 carrés), la fiche de cours, et cette feuille. Frédéric a
// choisi le paradoxe (« j'aime bien +20 % et −20 % »), puis ses deux objets :
// « un verre doseur est parfait », « tablette de chocolat parfait ». La
// tablette porte le short ; le verre doseur est l'exercice 14, la tablette
// l'exercice 17, et le défi du short (les abonnés) l'exercice 18.
//
// Alignée sur la fiche de cours `lib/fiches/maths-3e-proportionnalite.tsx` et sur
// la banque `lib/tutor-v4/questionBank/3e/maths/proportionnalite.bank.ts`,
// notionId prop_proportionnalite. Lu AVANT d'écrire : le coach de 3e va jusqu'au
// COEFFICIENT MULTIPLICATEUR (« augmenter de 25 %, c'est multiplier par 1,25 »),
// enchaîne deux évolutions, et remonte à un prix d'avant la hausse. La feuille
// ne va pas plus loin : ni taux réciproque en formule, ni points de pourcentage
// (c'est la feuille de seconde, `maths-seconde-information-chiffree.tsx`).
//
// ⛔ Aucun calcul de la fiche de cours n'est repris. UNE exception, voulue :
// +20 % puis −20 %, à l'exercice 17. C'est le paradoxe du short et l'exemple
// central de la fiche ; ici il se COMPTE, carré par carré.
//
// ⛔ PAS DE CHAMP `figure` : il existe dans l'arbre de travail (bloc « Fonctions »
// de seconde, 21/09) mais pas encore dans le dépôt — l'utiliser ferait échouer
// le build tant que l'autre chantier n'est pas poussé. Les tableaux des énoncés
// s'écrivent donc en paires « 2 kg → 7 € », et les dessins vivent dans `schema`.
//
// Les corrigés sont écrits à la première personne (« je divise »), comme la
// feuille de 5e : c'est la voix du cahier, pas celle du manuel.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-proportionnalite-3e.mjs`.
//
// Micro-compétences : prop_reconnaitre (1, 9), prop_table (2), prop_quatrieme
// (3, 10), prop_pourcentage (4, 5, 11, 12), prop_evolution (6, 7, 12-14, 17-19),
// prop_vitesse_debit (8, 15, 16, 20), prop_defi (17-20). 7/7.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

// Le tableau de proportionnalité d'un corrigé. Du HTML, pas un canvas : trois
// colonnes de nombres tiennent à 360 px sans rien mesurer.
// ⚠️ Pas de formule dans les cases : elles ne traversent pas KaTeX.
const tableauProp = (lignes: [string, ...string[]][]) => (
  <div className="overflow-x-auto">
    <table className="mx-auto border-collapse text-sm">
      <tbody>
        {lignes.map(([entete, ...cases]) => (
          <tr key={entete}>
            <th className="border border-slate-400 bg-slate-100 px-2 py-1 text-left font-semibold text-slate-800">
              {entete}
            </th>
            {cases.map((c, i) => (
              <td key={i} className="border border-slate-400 px-3 py-1 text-center text-slate-900">
                {c}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ⭐ LA TABLETTE, CARRÉ PAR CARRÉ (exercice 17) — le dessin du short. Un carré
// vaut 1 % de la tablette d'origine : les 4 carrés qui manquent à la fin se
// COMPTENT dans le cadre de départ, sans aucun calcul.
//   plein = un carré présent · vert = ajouté par le +20 % · pointillé = retiré
//   par le −20 % · rouge = retiré ALORS QU'IL ÉTAIT DANS LA TABLETTE D'ORIGINE.
const PAS = 8;
const COTE = 7;
type Etat = "plein" | "ajoute" | "retire" | "manque";
const STYLE: Record<Etat, { fill: string; stroke: string; tirets?: string }> = {
  plein: { fill: "#7c4a21", stroke: "#7c4a21" },
  ajoute: { fill: "#16a34a", stroke: "#16a34a" },
  retire: { fill: "none", stroke: "#94a3b8", tirets: "2 1.5" },
  manque: { fill: "#fecaca", stroke: "#dc2626" },
};
const tablette = (x0: number, etatDe: (k: number) => Etat | null, legende: string, couleur: string) => (
  <g>
    {Array.from({ length: 120 }, (_, k) => {
      const etat = etatDe(k);
      if (!etat) return null;
      const s = STYLE[etat];
      // Les rangées se remplissent du BAS vers le haut : les 20 carrés ajoutés
      // se posent au-dessus de la tablette, comme un étage de plus.
      const x = x0 + (k % 10) * PAS;
      const y = 4 + (11 - Math.floor(k / 10)) * PAS;
      return (
        <rect key={k} x={x} y={y} width={COTE} height={COTE} rx={1} fill={s.fill} stroke={s.stroke} strokeWidth={0.8} strokeDasharray={s.tirets} />
      );
    })}
    <text x={x0 + 39.5} y={119} textAnchor="middle" fontSize={15} fontWeight={700} fill={couleur}>
      {legende}
    </text>
  </g>
);
// ⚠️ MESURÉ À 375 px (21/09) : le dessin ne dispose que de 226 px dans un
// corrigé. En 300 de large et 11,5 de corps, les légendes tombaient à 8,7 px.
// Resserré à 276 et corps 15 : 12,3 px à 375, 11,5 px à 360 (211 px de dessin)
// — au-dessus du seuil de 11. Le corps 14 essayé d'abord donnait 10,7 px à 360.
const tablettes = (
  <svg viewBox="0 0 276 126" role="img" aria-label="Trois tablettes : 100 carrés, puis 120 carrés, puis 96 carrés. Dans le cadre de la tablette d'origine, 4 carrés manquent." className="mx-auto w-full max-w-sm">
    {tablette(2, (k) => (k < 100 ? "plein" : null), "100 carrés", "#7c4a21")}
    {tablette(98, (k) => (k < 100 ? "plein" : "ajoute"), "+20 % : 120", "#15803d")}
    {tablette(194, (k) => (k < 96 ? "plein" : k < 100 ? "manque" : "retire"), "−20 % : 96", "#b91c1c")}
  </svg>
);

export const exercicesProportionnalite3e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  notion: "prop-proportionnalite",
  titre: "Proportionnalité et pourcentages",
  accroche:
    "Vingt exercices, du calcul seul au problème, avec un rappel de cours de trois lignes avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le pourquoi de chaque étape et le piège nommé.",

  fichesCours: [
    {
      href: "/fiches-cours/maths/3e/prop-proportionnalite",
      titre: "Proportionnalité, pourcentages et grandeurs quotients",
    },
  ],
  coachHref: "/coach-ia/maths?classe=3e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Tu appliques, tu calcules, tu écris la réponse avec son unité.",
      rappel: [
        "Deux grandeurs sont proportionnelles quand on passe de l'une à l'autre en multipliant toujours par le MÊME nombre : le coefficient.",
        "Pour le vérifier, je divise chaque valeur de la seconde ligne par celle de la première. Si tous les quotients sont égaux, c'est proportionnel.",
        "Prendre $15\\,\\%$ d'un nombre, c'est le multiplier par $\\dfrac{15}{100} = 0{,}15$.",
        "Augmenter de $20\\,\\%$, c'est multiplier par $1{,}20$. Diminuer de $20\\,\\%$, c'est multiplier par $0{,}80$.",
      ],
      exercices: [
        {
          enonce:
            "Au marché, $2$ kg de tomates coûtent $7$ €, $5$ kg coûtent $17{,}50$ € et $8$ kg coûtent $28$ €. Le prix est-il proportionnel à la masse ?",
          correction:
            "Je divise chaque prix par la masse qui lui correspond.\n$7 \\div 2 = 3{,}5$ ; $17{,}5 \\div 5 = 3{,}5$ ; $28 \\div 8 = 3{,}5$.\nLes trois quotients sont égaux : le prix est proportionnel à la masse.\nLe coefficient est $3{,}5$ : c'est le prix d'un kilo, $3{,}50$ €.\n⛔ Le piège : ne tester que deux colonnes. Il faut que TOUS les quotients soient égaux.",
          schema: tableauProp([
            ["Masse (kg)", "2", "5", "8"],
            ["Prix (€)", "7", "17,50", "28"],
            ["Prix ÷ masse", "3,5", "3,5", "3,5"],
          ]),
          micros: ["prop_reconnaitre"],
        },
        {
          enonce:
            "Dans un tableau de proportionnalité, on lit : $4 \\to 10$ ; $6 \\to a$ ; $b \\to 35$. Calcule $a$ et $b$.",
          correction:
            "Je cherche le coefficient sur la colonne complète : $10 \\div 4 = 2{,}5$.\nPour passer de la première ligne à la seconde, je multiplie par $2{,}5$ : $a = 6 \\times 2{,}5 = 15$.\nPour revenir de la seconde à la première, je divise par $2{,}5$ : $b = 35 \\div 2{,}5 = 14$.\n⭐ Contrôle : $14 \\times 2{,}5 = 35$.",
          schema: tableauProp([
            ["Ligne 1", "4", "6", "14"],
            ["Ligne 2", "10", "15", "35"],
          ]),
          micros: ["prop_table"],
        },
        {
          enonce: "$3$ kg de letchis coûtent $13{,}50$ €. Combien coûtent $5$ kg, au même prix au kilo ?",
          correction:
            "Le prix est proportionnel à la masse : $3 \\to 13{,}50$ et $5 \\to x$.\nProduit en croix : $x = \\dfrac{13{,}50 \\times 5}{3}$.\n$13{,}50 \\times 5 = 67{,}50$, puis $67{,}50 \\div 3 = 22{,}50$.\nRéponse : $5$ kg coûtent $22{,}50$ €.\n⭐ Autre chemin : un kilo coûte $13{,}50 \\div 3 = 4{,}50$ €, donc $5$ kg coûtent $5 \\times 4{,}50 = 22{,}50$ €.",
          micros: ["prop_quatrieme"],
        },
        {
          enonce: "Calcule $15\\,\\%$ de $240$.",
          correction:
            "$15\\,\\%$, c'est $\\dfrac{15}{100} = 0{,}15$.\n$0{,}15 \\times 240 = 36$.\nRéponse : $15\\,\\%$ de $240$ font $36$.\n⭐ De tête : $10\\,\\%$ de $240$ font $24$, et $5\\,\\%$ font la moitié, $12$. $24 + 12 = 36$.",
          micros: ["prop_pourcentage"],
        },
        {
          enonce: "Dans une classe de $25$ élèves, $8$ viennent en bus. Quel pourcentage de la classe vient en bus ?",
          correction:
            "La proportion est $\\dfrac{8}{25}$.\nJe la ramène à $100$ : $25 \\times 4 = 100$, donc $\\dfrac{8}{25} = \\dfrac{32}{100}$.\nRéponse : $32\\,\\%$ de la classe vient en bus.\n⭐ Avec la calculatrice : $8 \\div 25 = 0{,}32$, c'est-à-dire $32\\,\\%$.\n⛔ Le piège : répondre « $8\\,\\%$ ». $8$ est un nombre d'élèves, pas un pourcentage : il faut le rapporter au total.",
          micros: ["prop_pourcentage"],
        },
        {
          enonce: "Un article coûte $60$ €. Son prix augmente de $20\\,\\%$. Quel est le nouveau prix ?",
          correction:
            "Augmenter de $20\\,\\%$, c'est multiplier par $1 + 0{,}20 = 1{,}20$.\n$60 \\times 1{,}20 = 72$.\nRéponse : le nouveau prix est $72$ €.\n⭐ Autre chemin : $20\\,\\%$ de $60$ font $12$, et $60 + 12 = 72$.\n⛔ Le piège : ajouter $20$ et répondre $80$ €. $20\\,\\%$ n'est pas $20$ € : c'est $20$ pour $100$.",
          micros: ["prop_evolution"],
        },
        {
          enonce:
            "a) Par quel nombre multiplie-t-on pour diminuer une quantité de $35\\,\\%$ ?\nb) Un sac à $80$ € est soldé à $-35\\,\\%$. Quel est son prix soldé ?",
          correction:
            "a) Diminuer de $35\\,\\%$, c'est garder $100 - 35 = 65$ pour cent : on multiplie par $0{,}65$.\nb) $80 \\times 0{,}65 = 52$. Réponse : le sac soldé coûte $52$ €.\n⛔ Le piège : multiplier par $0{,}35$. On obtiendrait $28$ € : c'est le montant de la réduction, pas le prix à payer.",
          micros: ["prop_evolution"],
        },
        {
          enonce: "Une voiture parcourt $150$ km en $2$ h $30$ min. Quelle est sa vitesse moyenne ?",
          correction:
            "La vitesse est la distance divisée par la durée, et la durée doit être en heures.\n$2$ h $30$ min, c'est $2{,}5$ h : $30$ min sont une DEMI-heure.\n$150 \\div 2{,}5 = 60$.\nRéponse : la vitesse moyenne est $60$ km/h.\n⛔ Le piège : diviser par $2{,}30$. Une heure compte $60$ minutes, pas $100$.",
          micros: ["prop_vitesse_debit"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au contrôle. Tu justifies chaque réponse par un calcul.",
      rappel: [
        "Une situation n'est PAS proportionnelle dès qu'il y a une part fixe (un abonnement, une prise en charge) : doubler l'une ne double pas l'autre.",
        "Retrouver un pourcentage d'évolution : je divise la valeur d'arrivée par la valeur de départ. $1{,}15$ veut dire $+15\\,\\%$ ; $0{,}70$ veut dire $-30\\,\\%$.",
        "Deux évolutions à la suite : je MULTIPLIE les deux coefficients. Je n'additionne jamais deux pourcentages.",
        "Vitesse $=$ distance $\\div$ durée, débit $=$ volume $\\div$ durée. Je convertis d'abord la durée : $36$ min $= 36 \\div 60 = 0{,}6$ h.",
      ],
      exercices: [
        {
          enonce:
            "Un taxi facture $3$ € de prise en charge, puis $2$ € par kilomètre.\na) Calcule le prix d'une course de $1$ km, de $2$ km, puis de $5$ km.\nb) Le prix est-il proportionnel à la distance ? Justifie.\nc) Un client dit : « pour $10$ km, je paierai le double de $5$ km ». A-t-il raison ?",
          correction:
            "a) $3 + 2 \\times 1 = 5$ € ; $3 + 2 \\times 2 = 7$ € ; $3 + 2 \\times 5 = 13$ €.\nb) Je compare les quotients : $5 \\div 1 = 5$, mais $7 \\div 2 = 3{,}5$. Ils sont différents : le prix n'est PAS proportionnel à la distance.\nc) Pour $10$ km : $3 + 2 \\times 10 = 23$ €. Le double de $13$ € serait $26$ €. Réponse : il a tort.\n⭐ Pourquoi : la prise en charge de $3$ € ne se paie qu'une fois. Seule la partie « $2$ € par kilomètre » est proportionnelle.",
          micros: ["prop_reconnaitre"],
        },
        {
          enonce:
            "Une voiture consomme $12$ L d'essence pour $200$ km. À consommation constante, combien consommera-t-elle pour $350$ km ?",
          correction:
            "La consommation est proportionnelle à la distance : $200 \\to 12$ et $350 \\to x$.\nProduit en croix : $x = \\dfrac{12 \\times 350}{200}$.\n$12 \\times 350 = 4\\,200$, puis $4\\,200 \\div 200 = 21$.\nRéponse : elle consommera $21$ L.\n⭐ Contrôle : $350$ km, c'est un peu moins du double de $200$ km, et $21$ L un peu moins du double de $12$ L. C'est cohérent.",
          micros: ["prop_quatrieme"],
        },
        {
          enonce:
            "Un élève écrit : « $40\\,\\%$ de $150$, ça fait $40$ ».\na) Explique son erreur.\nb) Calcule la bonne réponse.",
          correction:
            "a) $40\\,\\%$ veut dire $40$ POUR $100$. Sa réponse ne serait juste que si le total valait $100$. Ici le total est $150$ : la part doit être plus grande que $40$.\nb) $40\\,\\% = 0{,}40$ et $0{,}40 \\times 150 = 60$. Réponse : $40\\,\\%$ de $150$ font $60$.\n⭐ De tête : $10\\,\\%$ de $150$ font $15$, donc $40\\,\\%$ font $4 \\times 15 = 60$.",
          micros: ["prop_pourcentage"],
        },
        {
          enonce:
            "Un jean coûte $45$ €. En solde, son prix baisse de $30\\,\\%$.\na) Quel est le montant de la réduction ?\nb) Quel est le prix soldé ?",
          correction:
            "a) $30\\,\\%$ de $45$ : $0{,}30 \\times 45 = 13{,}50$. Réponse : la réduction est de $13{,}50$ €.\nb) $45 - 13{,}50 = 31{,}50$. Réponse : le jean soldé coûte $31{,}50$ €.\n⭐ En un seul calcul : baisser de $30\\,\\%$, c'est multiplier par $0{,}70$, et $45 \\times 0{,}70 = 31{,}50$.",
          micros: ["prop_pourcentage", "prop_evolution"],
        },
        {
          enonce: "Le prix d'un abonnement passe de $80$ € à $92$ €. Quel est le pourcentage d'augmentation ?",
          correction:
            "Je cherche par combien le prix a été multiplié : $92 \\div 80 = 1{,}15$.\n$1{,}15 = 1 + 0{,}15$. Réponse : le prix a augmenté de $15\\,\\%$.\n⭐ Autre chemin : la hausse est de $92 - 80 = 12$ €, et $12 \\div 80 = 0{,}15$, soit $15\\,\\%$.\n⛔ Le piège : diviser $12$ par $92$. Une évolution se rapporte toujours à la valeur de DÉPART.",
          micros: ["prop_evolution"],
        },
        {
          enonce:
            "Un verre doseur contient $80$ cL de lait.\na) On en verse $25\\,\\%$ dans un bol. Combien de centilitres reste-t-il dans le verre ?\nb) On rajoute dans le verre $25\\,\\%$ DE CE QU'IL CONTIENT. Combien contient-il maintenant ?\nc) Est-on revenu aux $80$ cL de départ ? Combien manque-t-il ?\nd) Par quel nombre la quantité de lait a-t-elle été multipliée en tout ?",
          correction:
            "a) $25\\,\\%$ de $80$ : $0{,}25 \\times 80 = 20$. Réponse : il reste $80 - 20 = 60$ cL.\nb) Les $25\\,\\%$ se prennent maintenant sur $60$ cL : $0{,}25 \\times 60 = 15$. Réponse : le verre contient $60 + 15 = 75$ cL.\nc) Non : $75$ cL, pas $80$. Réponse : il manque $5$ cL.\nd) $-25\\,\\%$, c'est $\\times 0{,}75$ ; $+25\\,\\%$, c'est $\\times 1{,}25$. En tout : $0{,}75 \\times 1{,}25 = 0{,}9375$.\n⭐ Contrôle : $80 \\times 0{,}9375 = 75$.\n⛔ Le piège : croire que $-25\\,\\%$ puis $+25\\,\\%$ s'annulent. Les deux pourcentages ne portent pas sur la même quantité : $25\\,\\%$ de $80$ font $20$, mais $25\\,\\%$ de $60$ ne font que $15$.",
          micros: ["prop_evolution"],
        },
        {
          enonce:
            "Un robinet verse $18$ L en $1$ min $30$ s.\na) Quel est son débit, en litres par minute ?\nb) Combien de temps faut-il pour remplir une cuve de $150$ L ?",
          correction:
            "a) $1$ min $30$ s, c'est $1{,}5$ min. Débit $= 18 \\div 1{,}5 = 12$. Réponse : le débit est de $12$ L/min.\nb) Durée $=$ volume $\\div$ débit $= 150 \\div 12 = 12{,}5$ min.\n$0{,}5$ min, c'est $30$ s. Réponse : il faut $12$ min $30$ s.\n⛔ Le piège : lire $12{,}5$ min comme « $12$ min $5$ s ». La partie décimale est une fraction de minute : $0{,}5 \\times 60 = 30$ s.",
          micros: ["prop_vitesse_debit"],
        },
        {
          enonce: "Un bus parcourt $27$ km en $36$ min. Quelle est sa vitesse moyenne, en km/h ?",
          correction:
            "La durée doit être en heures : $36$ min $= 36 \\div 60 = 0{,}6$ h.\nVitesse $= 27 \\div 0{,}6 = 45$.\nRéponse : la vitesse moyenne du bus est $45$ km/h.\n⭐ Autre chemin, par proportionnalité : en $36$ min il fait $27$ km, donc en $12$ min il fait $9$ km, et en $60$ min il fait $5 \\times 9 = 45$ km.\n⛔ Le piège : calculer $27 \\div 36 = 0{,}75$ et répondre « $0{,}75$ km/h ». Ce nombre est en kilomètres par MINUTE.",
          micros: ["prop_vitesse_debit"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions qui s'enchaînent. Le piège est toujours le même : pour cent de quoi ?",
      rappel: [
        "Dans un problème, j'écris chaque évolution comme une multiplication : $+20\\,\\%$ devient $\\times 1{,}20$, et $-20\\,\\%$ devient $\\times 0{,}80$.",
        "Un pourcentage porte toujours sur une quantité précise. À chaque étape, je me demande : « pour cent DE QUOI ? »",
        "Une vitesse moyenne se calcule avec la distance TOTALE et la durée TOTALE, jamais en faisant la moyenne de deux vitesses.",
      ],
      exercices: [
        {
          titre: "La tablette de 100 carrés",
          enonce:
            "Une tablette de chocolat compte $100$ carrés. La marque sort un grand format : $+20\\,\\%$ de carrés. L'année suivante, elle réduit CE grand format de $20\\,\\%$.\na) Combien de carrés compte le grand format ?\nb) Combien de carrés retire-t-on l'année suivante ? Combien en reste-t-il ?\nc) La marque annonce : « nous sommes revenus à la tablette d'origine ». Est-ce vrai ?\nd) Par quel nombre le nombre de carrés a-t-il été multiplié en tout ? Quel pourcentage de baisse cela fait-il ?",
          correction:
            "a) $20\\,\\%$ de $100$ font $20$ carrés. Réponse : le grand format compte $100 + 20 = 120$ carrés.\nb) Les $20\\,\\%$ se prennent sur $120$ carrés : $0{,}20 \\times 120 = 24$. Réponse : on retire $24$ carrés, il en reste $120 - 24 = 96$.\nc) C'est faux : il reste $96$ carrés, pas $100$. Réponse : il en manque $4$.\nd) $1{,}20 \\times 0{,}80 = 0{,}96$. Réponse : multiplier par $0{,}96$, c'est baisser de $4\\,\\%$.\n⛔ Le piège : dire « $+20$ puis $-20$, ça fait $0$ ». On a ajouté $20\\,\\%$ de $100$, mais retiré $20\\,\\%$ de $120$ : la seconde part est plus grosse.",
          schema: tablettes,
          micros: ["prop_evolution", "prop_defi"],
        },
        {
          titre: "Les abonnés perdus",
          enonce:
            "Une chaîne de vidéos a $1\\,000$ abonnés. En janvier, elle en perd $20\\,\\%$. En février, son nombre d'abonnés augmente de $20\\,\\%$.\na) Combien d'abonnés a-t-elle fin janvier ?\nb) Combien en a-t-elle fin février ?\nc) Combien d'abonnés lui manque-t-il pour retrouver ses $1\\,000$ abonnés ?\nd) De quel pourcentage aurait-il fallu augmenter en février pour revenir à $1\\,000$ ?",
          correction:
            "a) $1\\,000 \\times 0{,}80 = 800$. Réponse : elle a $800$ abonnés fin janvier.\nb) Les $20\\,\\%$ de février portent sur $800$ : $800 \\times 1{,}20 = 960$. Réponse : elle a $960$ abonnés fin février.\nc) $1\\,000 - 960 = 40$. Réponse : il lui manque $40$ abonnés.\nd) Il faut passer de $800$ à $1\\,000$ : $1\\,000 \\div 800 = 1{,}25$. Réponse : il aurait fallu une hausse de $25\\,\\%$.\n⭐ À retenir : pour effacer une baisse de $20\\,\\%$, il faut une hausse de $25\\,\\%$. La hausse part de plus bas : elle doit être plus forte.\n⭐ Dans l'autre ordre, $+20\\,\\%$ puis $-20\\,\\%$, on arrive aussi à $960$ : $1{,}20 \\times 0{,}80$ et $0{,}80 \\times 1{,}20$ donnent le même produit.",
          micros: ["prop_evolution", "prop_defi"],
        },
        {
          titre: "La deuxième démarque",
          enonce:
            "Un blouson coûte $90$ €. Première démarque : $-30\\,\\%$. Deuxième démarque : $-20\\,\\%$ sur le prix déjà soldé. Le vendeur affiche « $-50\\,\\%$ au total ».\na) Calcule le prix après la première démarque.\nb) Calcule le prix final.\nc) Quel serait le prix avec une vraie remise de $50\\,\\%$ ?\nd) Quel est le vrai pourcentage de baisse au total ?",
          correction:
            "a) $90 \\times 0{,}70 = 63$. Réponse : après la première démarque, le blouson coûte $63$ €.\nb) La deuxième remise porte sur $63$ € : $63 \\times 0{,}80 = 50{,}40$. Réponse : le prix final est $50{,}40$ €.\nc) $90 \\times 0{,}50 = 45$. Réponse : avec une vraie remise de $50\\,\\%$, il coûterait $45$ €, soit $5{,}40$ € de moins.\nd) $0{,}70 \\times 0{,}80 = 0{,}56$. Réponse : multiplier par $0{,}56$, c'est baisser de $44\\,\\%$, pas de $50\\,\\%$.\n⛔ Le piège : additionner $30 + 20$. La deuxième remise s'applique à un prix plus petit : elle enlève moins d'euros que si elle portait sur $90$ €.",
          micros: ["prop_evolution", "prop_defi"],
        },
        {
          titre: "L'aller-retour",
          enonce:
            "Un automobiliste fait un trajet de $80$ km. À l'aller, il roule à $80$ km/h. Au retour, dans les bouchons, il roule à $40$ km/h.\na) Combien de temps dure l'aller ? Et le retour ?\nb) Quelle est sa vitesse moyenne sur l'aller-retour ?\nc) Un ami répond « $60$ km/h, la moyenne de $80$ et de $40$ ». Pourquoi est-ce faux ?",
          correction:
            "a) Durée $=$ distance $\\div$ vitesse. Aller : $80 \\div 80 = 1$ h. Retour : $80 \\div 40 = 2$ h.\nb) Distance totale : $160$ km. Durée totale : $3$ h. $160 \\div 3 \\approx 53{,}3$. Réponse : sa vitesse moyenne est d'environ $53{,}3$ km/h.\nc) Il passe DEUX fois plus de temps à $40$ km/h qu'à $80$ km/h : la vitesse lente pèse plus lourd. On ne fait jamais la moyenne de deux vitesses : on divise la distance totale par la durée totale.\n⭐ Contrôle : à $60$ km/h, $160$ km prendraient $2$ h $40$ min, pas $3$ h.",
          micros: ["prop_vitesse_debit", "prop_defi"],
        },
      ],
    },
  ],
};
