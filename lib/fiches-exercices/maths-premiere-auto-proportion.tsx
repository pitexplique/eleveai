// ─── Fiche d'exercices : proportions et pourcentages (1re, automatismes) ──────
//                              20 exercices corrigés
//
// Feuille des automatismes de première (épreuve anticipée, première partie,
// SANS CALCULATRICE), sur le modèle de l'étalon `maths-premiere-auto-comparer.tsx`.
// Alignée sur `lib/tutor-v4/questionBank/premiere/maths/automatismes-proportions-stats.bank.ts`.
// Deux questions des sujets de juin 2026 : « 30 % de 150 » (Métropole,
// exercice 4) et « 25 % de 250 » (Centres étrangers, exercice 5).
//
// ⭐⭐ LE FIL : UNE PROPORTION, C'EST TOUJOURS « SUR COMBIEN ? ». Le même
// nombre de voix, de femmes ou de jeunes ne dit rien tant qu'on ne sait pas de
// quel TOUT il est la part. Les exercices 14, 17 et 19 sont bâtis là-dessus :
// la liste qui a 55 % des exprimés n'a qu'un inscrit sur trois ; un pays peut
// avoir plus de jeunes et une part de jeunes plus petite.
//
// ⭐ Frédéric, 28/09 : les élèves de première « détestent tous les maths » —
// un lien GRAPHIQUE (une BARRE DE PARTAGE, définie ici : le tout en une barre,
// coupée en parts ; diagrammes ; droite graduée) et un lien à l'ÉCONOMIE ou à
// l'HISTOIRE-GÉO (élections, budget d'un ménage, soldes, TVA, parité, empreinte
// carbone, vieillissement, prix du carburant). Les chiffres sont des MODÈLES
// arrondis, jamais présentés comme des données officielles.
//
// ⛔ PDF ≤ 12 pages : les dessins qui redisent le corrigé passent à l'écran
// seulement (`ecranSeulement`) ; ceux qu'on LIT restent imprimés.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-auto-proportion.mjs`
// (il vérifie aussi que chaque part « 40 % » d'une barre en fait bien 40 %).
//
// Micro-compétences : auto_prop_calculer (1, 6, 9, 12, 14, 17, 19, 20),
// auto_prop_formes (2, 3, 8, 9, 12, 15, 17, 20),
// auto_prop_appliquer (4, 5, 7, 10, 11, 13, 15, 16, 17, 18, 20). 3/3.

import type { ReactNode } from "react";
import { CanvasRenderer } from "@/lib/canvas";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { diagramme, tableau } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** Une droite graduée avec des nombres placés dessus (texte NU : SVG). */
const droiteGraduee = (min: number, max: number, step: number, points: { value: number; label: string }[]) => (
  <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
    <CanvasRenderer
      figure={{
        kind: "number_line",
        min,
        max,
        step,
        size: { width: 260, height: 80 },
        points: points.map((p) => ({ ...p, color: "#dc2626" })),
        display: { showPoints: true, showPointLabels: true },
      }}
    />
  </div>
);

const COULEURS = ["#2563eb", "#ea580c", "#16a34a", "#9333ea", "#64748b"];

/**
 * Une BARRE DE PARTAGE : le tout dessiné en une seule barre, coupée en parts
 * proportionnelles à `value`. L'étiquette s'écrit DANS sa part : courte
 * (« 40 % », « Remise 30 % »). ⛔ Texte NU (SVG). ⛔ Pas de part sous 15 % :
 * son étiquette déborderait. `legende` s'écrit sous la barre.
 * ⭐ Le script de recalcul vérifie qu'une part étiquetée « 40 % » fait bien
 * 40 % de la barre.
 */
const barre = (parts: { label: string; value: number }[], legende?: string) => {
  const tout = parts.reduce((t, p) => t + p.value, 0);
  const debuts = parts.map((_, i) => 4 + (292 * parts.slice(0, i).reduce((t, p) => t + p.value, 0)) / tout);
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 300 ${legende ? 78 : 56}`} className="block h-auto w-full" role="img" aria-label="Barre de partage">
        {parts.map((p, i) => {
          const w = (292 * p.value) / tout;
          return (
            <g key={i}>
              <rect x={debuts[i]} y="6" width={w} height="42" fill={COULEURS[i % COULEURS.length]} fillOpacity="0.85" stroke="#fff" strokeWidth="2" />
              <text x={debuts[i] + w / 2} y="32" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">
                {p.label}
              </text>
            </g>
          );
        })}
        {legende ? (
          <text x="150" y="70" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0f172a">
            {legende}
          </text>
        ) : null}
      </svg>
    </div>
  );
};

export const exercicesAutoProportionPremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "auto-proportion",
  titre: "Proportions et pourcentages",
  accroche:
    "Vingt exercices sans calculatrice, comme à l'épreuve anticipée : calculer une proportion, l'écrire en fraction, en décimal ou en pourcentage, prendre un pourcentage d'une quantité. Un rappel de cours de trois lignes avant chaque niveau, et une correction écrite étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Sans calculatrice.",
      rappel: [
        "Une proportion, c'est $\\dfrac{\\text{partie}}{\\text{tout}}$. Elle est toujours comprise entre $0$ et $1$.",
        "Elle s'écrit de trois façons : $\\dfrac{1}{4} = 0{,}25 = 25$ %. Du décimal au pourcentage, on multiplie par $100$.",
        "Prendre $t$ % d'une quantité, c'est la multiplier par $\\dfrac{t}{100}$. De tête : $10$ %, c'est diviser par $10$.",
      ],
      exercices: [
        {
          enonce: "Dans une classe de $25$ élèves, $10$ sont demi-pensionnaires. Quelle proportion cela représente-t-il ? Donner la réponse en fraction, en décimal et en pourcentage.",
          correction:
            "La partie : $10$ élèves. Le tout : $25$ élèves.\nProportion : $\\dfrac{10}{25}$. On simplifie par $5$ : $\\dfrac{2}{5}$.\nEn décimal : $\\dfrac{2}{5} = \\dfrac{4}{10} = 0{,}4$.\nEn pourcentage : $0{,}4 \\times 100 = 40$ %.\n⚠️ Le piège : $\\dfrac{25}{10}$. On divise la PARTIE par le TOUT, jamais l'inverse : une proportion ne dépasse pas $1$.",
          schema: barre([{ label: "40 %", value: 10 }, { label: "60 %", value: 15 }], "25 élèves : 10 demi-pensionnaires"),
          micros: ["auto_prop_calculer"],
        },
        {
          enonce: "a) Écrire $\\dfrac{3}{4}$ en décimal, puis en pourcentage.\nb) Écrire $0{,}05$ en fraction irréductible, puis en pourcentage.\nc) Écrire $12$ % en décimal, puis en fraction irréductible.",
          correction:
            "a) $\\dfrac{3}{4} = \\dfrac{75}{100} = 0{,}75$, soit $75$ %.\nb) $0{,}05 = \\dfrac{5}{100} = \\dfrac{1}{20}$, soit $5$ %.\nc) $12$ % $= \\dfrac{12}{100} = 0{,}12$. On simplifie par $4$ : $\\dfrac{3}{25}$.\n⭐ Le passage par « sur $100$ » relie les trois écritures : un pourcentage EST une fraction de dénominateur $100$.",
          schema: tableau(["fraction", "3/4", "1/20", "3/25"], ["pourcentage", "75 %", "5 %", "12 %"]),
          micros: ["auto_prop_formes"],
        },
        {
          enonce: "Parmi $0{,}6$ ; $60$ % ; $\\dfrac{6}{10}$ et $60$, quelle écriture n'est PAS égale à $\\dfrac{3}{5}$ ?",
          correction:
            "$\\dfrac{3}{5} = \\dfrac{6}{10} = 0{,}6$.\n$60$ % $= \\dfrac{60}{100} = 0{,}6$ : égal aussi.\nMais $60$ tout seul, SANS le symbole %, vaut $60$ : c'est $100$ fois trop.\nL'intruse est $60$.\n⚠️ Le symbole % fait partie du nombre : il veut dire « divisé par $100$ ».",
          micros: ["auto_prop_formes"],
        },
        {
          enonce: "Calculer $30$ % de $150$.",
          correction:
            "De tête : $10$ % de $150$, c'est $150 \\div 10 = 15$.\n$30$ %, c'est trois fois plus : $3 \\times 15 = 45$.\nAutre chemin : $150 \\times 0{,}3 = 45$.\n⭐ C'est la question du sujet de Métropole, en juin 2026.",
          micros: ["auto_prop_appliquer"],
        },
        {
          enonce: "Calculer $25$ % de $250$.",
          correction:
            "$25$ %, c'est $\\dfrac{25}{100} = \\dfrac{1}{4}$ : un quart.\nUn quart de $250$ : $250 \\div 4 = 62{,}5$.\n✔️ De tête : la moitié de $250$ est $125$, la moitié de $125$ est $62{,}5$.\n⭐ C'est la question du sujet des Centres étrangers, en juin 2026.\n⚠️ Le résultat n'est pas entier : ce n'est pas une erreur.",
          schema: ecranSeulement(
            barre(
              [
                { label: "25 %", value: 62.5 },
                { label: "25 %", value: 62.5 },
                { label: "25 %", value: 62.5 },
                { label: "25 %", value: 62.5 },
              ],
              "250 = 4 parts de 62,5",
            ),
          ),
          micros: ["auto_prop_appliquer"],
        },
        {
          enonce: "Sur $60$ salariés d'une entreprise, $18$ viennent au travail à vélo. Quel pourcentage cela représente-t-il ?",
          correction:
            "Proportion : $\\dfrac{18}{60}$.\nOn simplifie par $6$ : $\\dfrac{3}{10} = 0{,}3$.\nEn pourcentage : $30$ %.\n⭐ Simplifier la fraction d'abord rend le calcul de tête facile.",
          micros: ["auto_prop_calculer"],
        },
        {
          enonce: "Calculer : a) $5$ % de $80$ ; b) $1$ % de $350$ ; c) $150$ % de $40$.",
          correction:
            "a) $10$ % de $80$ vaut $8$ ; $5$ %, c'est la moitié : $4$.\nb) $1$ %, c'est diviser par $100$ : $350 \\div 100 = 3{,}5$.\nc) $150$ % $= 1{,}5$ : $40 \\times 1{,}5 = 60$. Autre chemin : $100$ % de $40$ plus $50$ % de $40$, soit $40 + 20 = 60$.\n⚠️ Un pourcentage au-dessus de $100$ % donne PLUS que la quantité de départ : c'est normal.",
          micros: ["auto_prop_appliquer"],
        },
        {
          enonce: "Ranger dans l'ordre croissant : $\\dfrac{1}{4}$ ; $0{,}3$ ; $28$ % ; $\\dfrac{1}{5}$.",
          correction:
            "On écrit tout en décimal pour comparer.\n$\\dfrac{1}{4} = 0{,}25$ ; $28$ % $= 0{,}28$ ; $\\dfrac{1}{5} = 0{,}2$.\nDonc $\\dfrac{1}{5} < \\dfrac{1}{4} < 28$ % $< 0{,}3$.\n⭐ Pour comparer, on choisit UNE écriture, la même pour tous.",
          schema: droiteGraduee(0.15, 0.35, 0.05, [
            { value: 0.2, label: "1/5" },
            { value: 0.25, label: "1/4" },
            { value: 0.28, label: "28 %" },
            { value: 0.3, label: "0,3" },
          ]),
          micros: ["auto_prop_formes"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Repérer le tout, calculer, puis conclure par une phrase. Sans calculatrice.",
      rappel: [
        "Avant tout calcul, on se demande « sur COMBIEN ? » : c'est le tout.",
        "Une proportion permet de comparer des groupes de tailles différentes.",
        "$t$ % d'une quantité $Q$ : $Q \\times \\dfrac{t}{100}$. On passe par $10$ %, $5$ % ou $1$ % pour calculer de tête.",
      ],
      exercices: [
        {
          titre: "La participation",
          enonce:
            "Dans une commune, $1\\,200$ personnes sont inscrites sur les listes électorales. Le jour du vote, $900$ votent (chiffres de modèle).\na) Calculer le taux de participation, en fraction puis en pourcentage.\nb) Quel est le taux d'abstention ?",
          correction:
            "a) La partie : $900$ votants. Le tout : $1\\,200$ inscrits.\n$\\dfrac{900}{1\\,200} = \\dfrac{9}{12} = \\dfrac{3}{4} = 0{,}75$, soit $75$ %.\nb) Les abstentionnistes sont les autres inscrits : $100$ % $- 75$ % $= 25$ %.\n✔️ En nombre : $1\\,200 - 900 = 300$, et $\\dfrac{300}{1\\,200} = \\dfrac{1}{4}$.\n⭐ Participation et abstention se partagent les inscrits : elles font $100$ % à elles deux.",
          schema: diagramme("camembert", [
            { label: "Votants", value: 75 },
            { label: "Abstention", value: 25 },
          ]),
          micros: ["auto_prop_calculer", "auto_prop_formes"],
        },
        {
          titre: "Le budget d'un ménage",
          enonce:
            "Un ménage dispose de $2\\,000$ € par mois. Il consacre $30$ % au logement, $15$ % à l'alimentation et $12$ % aux transports (modèle).\na) Calculer chacune de ces dépenses.\nb) Combien reste-t-il pour le reste du budget ? Quel pourcentage ?",
          correction:
            "a) $10$ % de $2\\,000$ € valent $200$ €, et $1$ % vaut $20$ €.\nLogement : $30$ % $= 3 \\times 200 = 600$ €.\nAlimentation : $15$ % $= 200 + 100 = 300$ €.\nTransports : $12$ % $= 200 + 2 \\times 20 = 240$ €.\nb) $600 + 300 + 240 = 1\\,140$ €. Il reste $2\\,000 - 1\\,140 = 860$ €.\nEn pourcentage : $100 - 30 - 15 - 12 = 43$ %. ✔️ $43$ % de $2\\,000$ € $= 860$ €.",
          schema: ecranSeulement(
            diagramme("barres", [
              // ⛔ Libellés courts : à 375 px, « Alimentation » chevauchait ses voisins.
              { label: "Loyer", value: 600 },
              { label: "Repas", value: 300 },
              { label: "Transport", value: 240 },
              { label: "Reste", value: 860 },
            ]),
          ),
          micros: ["auto_prop_appliquer"],
        },
        {
          titre: "La forêt d'un département",
          enonce: "Un département de $6\\,000$ km² est couvert à $35$ % par la forêt (modèle). Quelle surface de forêt cela représente-t-il ?",
          correction:
            "On cherche $35$ % de $6\\,000$ km².\n$10$ % : $600$ km². Donc $30$ % : $1\\,800$ km².\n$5$ %, la moitié de $10$ % : $300$ km².\n$35$ % $= 1\\,800 + 300 = 2\\,100$ km².\n⭐ Décomposer $35$ % en $30$ % $+ 5$ % : c'est le geste du calcul de tête.",
          schema: ecranSeulement(barre([{ label: "Forêt 35 %", value: 2100 }, { label: "65 %", value: 3900 }], "6 000 km²")),
          micros: ["auto_prop_appliquer"],
        },
        {
          titre: "Comment vient-on au lycée ?",
          enonce:
            "Le diagramme donne le moyen de transport des $40$ élèves d'une classe.\na) Quelle proportion des élèves vient en bus ? Répondre en fraction, en décimal et en pourcentage.\nb) Quel pourcentage des élèves vient sans moteur (vélo ou à pied) ?",
          figure: diagramme("barres", [
            { label: "Bus", value: 18 },
            { label: "Vélo", value: 6 },
            { label: "Voiture", value: 10 },
            { label: "À pied", value: 6 },
          ]),
          correction:
            "On lit les hauteurs : bus $18$, vélo $6$, voiture $10$, à pied $6$. ✔️ $18 + 6 + 10 + 6 = 40$.\na) $\\dfrac{18}{40} = \\dfrac{9}{20} = \\dfrac{45}{100} = 0{,}45$, soit $45$ %.\nb) Sans moteur : $6 + 6 = 12$ élèves. $\\dfrac{12}{40} = \\dfrac{3}{10} = 30$ %.\n⚠️ Le tout est la CLASSE ($40$), pas la barre la plus haute ($18$).",
          schema: ecranSeulement(
            diagramme("camembert", [
              { label: "Bus", value: 45 },
              { label: "Vélo", value: 15 },
              { label: "Voiture", value: 25 },
              { label: "À pied", value: 15 },
            ]),
          ),
          micros: ["auto_prop_calculer", "auto_prop_formes"],
        },
        {
          titre: "Les soldes",
          enonce: "Une veste à $80$ € est soldée à $-30$ %. Calculer le montant de la remise, puis le prix payé.",
          correction:
            "La remise : $30$ % de $80$ €. $10$ % font $8$ €, donc $30$ % font $24$ €.\nLe prix payé : $80 - 24 = 56$ €.\n✔️ Autre chemin : on paie $70$ % du prix, $80 \\times 0{,}7 = 56$ €.\n⚠️ $-30$ % n'est pas $-30$ € : la remise dépend du prix de départ.",
          schema: barre([{ label: "Payé : 70 %", value: 56 }, { label: "−30 %", value: 24 }], "80 € = 56 € payés + 24 € de remise"),
          micros: ["auto_prop_appliquer"],
        },
        {
          titre: "La parité chez les cadres",
          enonce:
            "Une entreprise compte $250$ salariés, dont $100$ femmes. Parmi ses $20$ cadres, il y a $6$ femmes.\na) Calculer la proportion de femmes dans l'entreprise, puis parmi les cadres.\nb) Les femmes sont-elles autant représentées chez les cadres que dans l'entreprise ?",
          correction:
            "a) Dans l'entreprise : $\\dfrac{100}{250} = \\dfrac{2}{5} = 40$ %.\nParmi les cadres : $\\dfrac{6}{20} = \\dfrac{3}{10} = 30$ %.\nb) Non : $30$ % $< 40$ %. Les femmes sont moins représentées chez les cadres que dans l'entreprise.\n⚠️ Comparer $100$ et $6$ ne veut rien dire : les deux groupes n'ont pas la même taille. On compare des PROPORTIONS.",
          schema: ecranSeulement(
            diagramme("barres", [
              { label: "Tous (%)", value: 40 },
              { label: "Cadres (%)", value: 30 },
            ]),
          ),
          micros: ["auto_prop_calculer"],
        },
        {
          titre: "Le sondage",
          enonce:
            "Un sondage (modèle) interroge $1\\,200$ personnes sur un projet d'éoliennes. $0{,}45$ des personnes sont pour, $\\dfrac{2}{5}$ sont contre, et $15$ % sont sans avis.\na) Écrire les trois proportions en pourcentage.\nb) Vérifier que tout le monde a été compté.\nc) Combien de personnes sont pour ? contre ? sans avis ?",
          correction:
            "a) $0{,}45 = 45$ % ; $\\dfrac{2}{5} = \\dfrac{4}{10} = 40$ % ; $15$ %.\nb) $45 + 40 + 15 = 100$ % : tout le monde est compté.\nc) $10$ % de $1\\,200$ font $120$.\nPour : $45$ % $= 4 \\times 120 + 60 = 540$. Contre : $40$ % $= 4 \\times 120 = 480$. Sans avis : $15$ % $= 120 + 60 = 180$.\n✔️ $540 + 480 + 180 = 1\\,200$.\n⭐ Trois écritures différentes, une seule façon de les additionner : les ramener toutes en pourcentage.",
          schema: diagramme("camembert", [
            { label: "Pour", value: 45 },
            { label: "Contre", value: 40 },
            { label: "Sans avis", value: 15 },
          ]),
          micros: ["auto_prop_formes", "auto_prop_appliquer"],
        },
        {
          titre: "La TVA d'un achat",
          enonce: "En France, la TVA la plus courante est de $20$ % du prix hors taxes. Un jeu vidéo coûte $45$ € HT. Calculer la TVA, puis le prix TTC.",
          correction:
            "La TVA : $20$ % de $45$ €. $10$ % font $4{,}50$ €, donc $20$ % font $9$ €.\nLe prix TTC : $45 + 9 = 54$ €.\n✔️ Autre chemin : $45 \\times 1{,}2 = 54$ €.\n⚠️ La TVA se calcule sur le prix HORS taxes.",
          schema: ecranSeulement(barre([{ label: "HT : 45 €", value: 45 }, { label: "TVA", value: 9 }], "prix TTC : 54 €")),
          micros: ["auto_prop_appliquer"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un problème complet, avec ses questions qui s'enchaînent. Sans calculatrice.",
      rappel: [
        "Chaque pourcentage a SON tout : « $55$ % des exprimés » n'est pas « $55$ % des inscrits ».",
        "On nomme le tout à chaque étape, on calcule, on conclut par une phrase.",
      ],
      exercices: [
        {
          titre: "Une élection municipale",
          enonce:
            "Une commune compte $2\\,000$ inscrits (chiffres de modèle). La participation est de $60$ %. Parmi les votants, $5$ % votent blanc ou nul ; les autres votes sont les suffrages exprimés.\na) Combien de personnes ont voté ?\nb) Combien de votes blancs ou nuls ? Combien de suffrages exprimés ?\nc) La liste $A$ obtient $55$ % des exprimés, la liste $B$ $30$ %, la liste $C$ le reste. Quel pourcentage pour $C$ ? Combien de voix pour chaque liste ?\nd) Quelle proportion des INSCRITS a voté pour la liste $A$ ?",
          correction:
            "a) $60$ % de $2\\,000$ : $10$ % font $200$, donc $60$ % font $1\\,200$ votants.\nb) $5$ % de $1\\,200$ : $10$ % font $120$, donc $5$ % font $60$ votes blancs ou nuls.\nExprimés : $1\\,200 - 60 = 1\\,140$.\nc) $C$ : $100 - 55 - 30 = 15$ %.\n$A$ : $55$ % de $1\\,140$ $= 570 + 57 = 627$ voix ($50$ % plus $5$ %).\n$B$ : $30$ % de $1\\,140$ $= 3 \\times 114 = 342$ voix. $C$ : $15$ % $= 114 + 57 = 171$ voix.\n✔️ $627 + 342 + 171 = 1\\,140$.\nd) $\\dfrac{627}{2\\,000} = \\dfrac{313{,}5}{1\\,000} = 0{,}3135$, soit environ $31$ % des inscrits.\n⭐ La liste qui gagne avec $55$ % des exprimés a été choisie par moins d'un inscrit sur trois : tout dépend du tout choisi.",
          schema: diagramme("barres", [
            { label: "Inscrits", value: 2000 },
            { label: "Votants", value: 1200 },
            { label: "Exprimés", value: 1140 },
            { label: "Liste A", value: 627 },
          ]),
          micros: ["auto_prop_appliquer", "auto_prop_calculer", "auto_prop_formes"],
        },
        {
          titre: "L'empreinte carbone",
          enonce:
            "Dans un modèle arrondi, l'empreinte carbone d'une personne est de $10$ tonnes de CO₂ par an, réparties ainsi : transports $30$ %, alimentation $25$ %, logement $20$ %, biens et services $25$ %.\na) Calculer chaque part en tonnes, et vérifier le total.\nb) Un objectif souvent cité est d'environ $2$ tonnes par personne. Quel pourcentage de l'empreinte actuelle cela représente-t-il ? De combien de pour cent faudrait-il la réduire ?\nc) Supprimer TOUS les transports suffirait-il ?",
          correction:
            "a) $10$ % de $10$ t, c'est $1$ t.\nTransports $3$ t, alimentation $2{,}5$ t, logement $2$ t, biens et services $2{,}5$ t.\n✔️ $3 + 2{,}5 + 2 + 2{,}5 = 10$ t.\nb) $\\dfrac{2}{10} = 0{,}2 = 20$ %. Il faudrait la réduire de $100 - 20 = 80$ %.\nc) Sans les transports, il resterait $10 - 3 = 7$ t : bien plus que $2$ t. Non, il faut agir sur tous les postes.\n⭐ Un pourcentage de réduction se lit sur ce qu'on RETIRE ; le pourcentage restant, sur ce qu'on garde.",
          schema: diagramme("barres", [
            { label: "Trajets", value: 3 },
            { label: "Repas", value: 2.5 },
            { label: "Maison", value: 2 },
            { label: "Achats", value: 2.5 },
          ]),
          micros: ["auto_prop_appliquer"],
        },
        {
          titre: "Un pays qui vieillit",
          enonce:
            "Un pays (modèle) comptait $40$ millions d'habitants, dont $12$ millions de moins de $20$ ans. Cinquante ans plus tard, il en compte $60$ millions, dont $15$ millions de moins de $20$ ans.\na) Calculer la proportion de moins de $20$ ans aux deux dates.\nb) Un journaliste écrit : « Il y a plus de jeunes, donc le pays rajeunit. » A-t-il raison ?\nc) Combien de jeunes aurait-il fallu, à la seconde date, pour garder la même proportion qu'au départ ?",
          correction:
            "a) Au départ : $\\dfrac{12}{40} = \\dfrac{3}{10} = 30$ %.\nCinquante ans plus tard : $\\dfrac{15}{60} = \\dfrac{1}{4} = 25$ %.\nb) Non. Le NOMBRE de jeunes a augmenté ($+3$ millions), mais leur PART a baissé, de $30$ % à $25$ %. Le pays vieillit.\nc) $30$ % de $60$ millions $= 18$ millions de jeunes : il en manque $3$ millions.\n⭐ Un nombre qui monte et une proportion qui baisse : les deux sont vrais, ils ne répondent pas à la même question.",
          schema: (
            <>
              {barre([{ label: "30 %", value: 12 }, { label: "70 %", value: 28 }], "au départ : 12 M de jeunes sur 40 M")}
              {barre([{ label: "25 %", value: 15 }, { label: "75 %", value: 45 }], "50 ans après : 15 M de jeunes sur 60 M")}
            </>
          ),
          micros: ["auto_prop_calculer"],
        },
        {
          titre: "Le prix d'un litre de carburant",
          enonce:
            "Dans un modèle arrondi, un litre de carburant coûte $1{,}80$ €, qui se partagent en : taxes $50$ %, production du carburant $30$ %, transport et distribution $20$ %.\na) Écrire chaque part en fraction irréductible, puis calculer son montant.\nb) Un automobiliste fait un plein de $40$ litres. Combien paie-t-il ? Combien de taxes ?\nc) Le prix monte à $2$ € le litre, et les taxes restent à $0{,}90$ € par litre. Quelle part du prix représentent-elles maintenant ?",
          correction:
            "a) Taxes : $50$ % $= \\dfrac{1}{2}$, soit $1{,}80 \\div 2 = 0{,}90$ €.\nProduction : $30$ % $= \\dfrac{3}{10}$, soit $3 \\times 0{,}18 = 0{,}54$ €.\nDistribution : $20$ % $= \\dfrac{1}{5}$, soit $1{,}80 \\div 5 = 0{,}36$ €.\n✔️ $0{,}90 + 0{,}54 + 0{,}36 = 1{,}80$ €.\nb) Le plein : $40 \\times 1{,}80 = 72$ €. Les taxes : la moitié, $36$ €.\nc) $\\dfrac{0{,}90}{2} = 0{,}45$, soit $45$ %.\n⭐ Les taxes n'ont pas bougé en euros, mais leur PART a baissé : le tout a grandi.",
          schema: ecranSeulement(
            barre(
              [
                { label: "50 %", value: 0.9 },
                { label: "30 %", value: 0.54 },
                { label: "20 %", value: 0.36 },
              ],
              "taxes, production, distribution",
            ),
          ),
          micros: ["auto_prop_formes", "auto_prop_appliquer", "auto_prop_calculer"],
        },
      ],
    },
  ],
};
