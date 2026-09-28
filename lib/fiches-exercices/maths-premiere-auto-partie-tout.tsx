// ─── Fiche d'exercices : la partie et le tout (1re, automatismes) ─────────────
//                              20 exercices corrigés
//
// Feuille des automatismes de première (épreuve anticipée, première partie,
// SANS CALCULATRICE), sur le modèle de l'étalon `maths-premiere-auto-comparer.tsx`.
// Alignée sur `lib/tutor-v4/questionBank/premiere/maths/automatismes-proportions-stats.bank.ts`
// (le lycée et ses terminales, ses demi-pensionnaires, ses secondes sportifs :
// exercices 1, 2 et 3).
//
// ⭐⭐ LE FIL : TROIS QUESTIONS, TROIS GESTES. On connaît le tout et on cherche
// la partie : on MULTIPLIE. On connaît la partie et on cherche le tout : on
// DIVISE (et le résultat est PLUS GRAND que la partie). Une partie d'une partie :
// on MULTIPLIE les deux proportions. Les exercices 12 et 20 sont bâtis sur le
// piège central : prendre le pourcentage du mauvais tout (20 % de 120 € TTC).
//
// ⭐ Frédéric, 28/09 : les élèves de première « détestent tous les maths » —
// un lien GRAPHIQUE (BARRE DE PARTAGE, définie ici ; arbres ; diagrammes) et un
// lien à l'ÉCONOMIE ou à l'HISTOIRE-GÉO (loyer et salaire, élections, TVA,
// budget d'une commune, forêts protégées, chômage, vieillissement, soldes).
// Les chiffres sont des MODÈLES arrondis, jamais présentés comme des données
// officielles.
//
// ⛔ PDF ≤ 12 pages : les dessins qui redisent le corrigé passent à l'écran
// seulement (`ecranSeulement`) ; ceux qu'on LIT restent imprimés.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-auto-partie-tout.mjs`.
//
// Micro-compétences : auto_prop_partie_connaissant_tout (1, 4, 8, 13, 14, 16,
// 17, 19), auto_prop_tout_connaissant_partie (2, 5, 7, 9, 10, 12, 13, 15, 18,
// 20), auto_prop_pourcentage_de_pourcentage (3, 6, 11, 14, 16, 17, 18, 19). 3/3.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { arbre, diagramme, tableau } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

const COULEURS = ["#2563eb", "#ea580c", "#16a34a", "#9333ea", "#64748b"];

/**
 * Une BARRE DE PARTAGE : le tout dessiné en une seule barre, coupée en parts
 * proportionnelles à `value`. L'étiquette s'écrit DANS sa part : courte
 * (« 30 % », « HT »). ⛔ Texte NU (SVG). ⛔ Pas de part sous 15 % : son
 * étiquette déborderait. `legende` s'écrit sous la barre.
 * ⭐ Le script de recalcul vérifie qu'une part étiquetée « 30 % » fait bien
 * 30 % de la barre.
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

export const exercicesAutoPartieToutPremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "auto-partie-tout",
  titre: "La partie et le tout",
  accroche:
    "Vingt exercices sans calculatrice, comme à l'épreuve anticipée : calculer une partie connaissant le tout, retrouver le tout connaissant une partie, prendre un pourcentage d'un pourcentage. Un rappel de cours de trois lignes avant chaque niveau, et une correction écrite étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Sans calculatrice.",
      rappel: [
        "La PARTIE, connaissant le tout : $\\text{partie} = \\text{tout} \\times \\text{proportion}$. On multiplie.",
        "Le TOUT, connaissant une partie : $\\text{tout} = \\dfrac{\\text{partie}}{\\text{proportion}}$. On divise, et le tout est plus grand que la partie.",
        "Une partie d'une partie : on MULTIPLIE les deux proportions. $50$ % de $40$ %, c'est $0{,}5 \\times 0{,}4 = 0{,}2$, soit $20$ %.",
      ],
      exercices: [
        {
          enonce: "Un lycée compte $800$ élèves, dont $35$ % sont en terminale. Combien d'élèves de terminale y a-t-il ?",
          correction:
            "On connaît le tout ($800$) et la proportion ($35$ %) : on cherche la partie, on multiplie.\n$10$ % de $800$ font $80$ ; $30$ % font $240$ ; $5$ % font $40$.\n$35$ % $= 240 + 40 = 280$ élèves.\n✔️ Autre chemin : $800 \\times 0{,}35 = 280$.",
          micros: ["auto_prop_partie_connaissant_tout"],
        },
        {
          enonce: "Dans un lycée, $20$ % des élèves sont demi-pensionnaires, soit $80$ élèves. Combien le lycée compte-t-il d'élèves ?",
          correction:
            "Ici, c'est le TOUT qu'on cherche : on divise la partie par la proportion.\n$\\dfrac{80}{0{,}2} = \\dfrac{800}{2} = 400$ élèves.\nDe tête : $20$ %, c'est $\\dfrac{1}{5}$. Si un cinquième vaut $80$, le tout vaut $5 \\times 80 = 400$.\n✔️ Vérification : $20$ % de $400$ $= 80$.\n⚠️ Le piège : $80 \\times 0{,}2 = 16$. Un tout PLUS PETIT que sa partie, c'est impossible.",
          schema: barre(
            [
              { label: "20 %", value: 80 },
              { label: "20 %", value: 80 },
              { label: "20 %", value: 80 },
              { label: "20 %", value: 80 },
              { label: "20 %", value: 80 },
            ],
            "20 % = 80 élèves, donc 100 % = 400",
          ),
          micros: ["auto_prop_tout_connaissant_partie"],
        },
        {
          enonce: "Dans un lycée, $40$ % des élèves sont en seconde, et $25$ % de ces élèves de seconde font du sport en club. Quel pourcentage des élèves DU LYCÉE sont des élèves de seconde sportifs ?",
          correction:
            "Une partie ($25$ %) d'une partie ($40$ %) : on multiplie les deux proportions.\n$0{,}4 \\times 0{,}25 = 0{,}1$, soit $10$ %.\nDe tête : $25$ %, c'est un quart ; le quart de $40$ %, c'est $10$ %.\n⚠️ Ni $40 + 25 = 65$ %, ni $40 - 25 = 15$ %. Une partie d'une partie est PLUS PETITE que chacune des deux.",
          schema: arbre([
            {
              label: "Seconde",
              proba: "0,4",
              enfants: [
                { label: "Sport", proba: "0,25" },
                { label: "Pas de sport", proba: "0,75" },
              ],
            },
            { label: "Autres", proba: "0,6" },
          ]),
          micros: ["auto_prop_pourcentage_de_pourcentage"],
        },
        {
          enonce: "Calculer les $\\dfrac{3}{5}$ de $45$.",
          correction:
            "Prendre les $\\dfrac{3}{5}$, c'est partager en $5$, puis prendre $3$ parts.\nUne part : $45 \\div 5 = 9$.\nTrois parts : $3 \\times 9 = 27$.\n⭐ On divise d'abord : les nombres restent petits.",
          micros: ["auto_prop_partie_connaissant_tout"],
        },
        {
          enonce: "$30$ % d'un nombre valent $12$. Quel est ce nombre ?",
          correction:
            "On cherche le tout. On redescend d'abord à $10$ % : $30$ % $\\div 3$, donc $12 \\div 3 = 4$.\nPuis on remonte à $100$ % : $10 \\times 4 = 40$.\nLe nombre est $40$.\n✔️ Vérification : $30$ % de $40$ $= 12$.",
          schema: tableau(["pourcentage", "10 %", "30 %", "100 %"], ["valeur", 4, 12, 40]),
          micros: ["auto_prop_tout_connaissant_partie"],
        },
        {
          enonce: "Combien font $50$ % de $60$ % ?",
          correction:
            "On multiplie les deux proportions : $0{,}5 \\times 0{,}6 = 0{,}3$, soit $30$ %.\nDe tête : $50$ %, c'est la moitié ; la moitié de $60$ %, c'est $30$ %.\n⚠️ Pas $110$ %, pas $10$ % : on ne fait ni la somme ni la différence.",
          micros: ["auto_prop_pourcentage_de_pourcentage"],
        },
        {
          enonce: "Les $\\dfrac{3}{4}$ d'un groupe représentent $18$ personnes. Combien de personnes compte le groupe ?",
          correction:
            "Trois quarts valent $18$ : un quart vaut $18 \\div 3 = 6$.\nLe groupe entier, quatre quarts : $4 \\times 6 = 24$ personnes.\n✔️ Vérification : les $\\dfrac{3}{4}$ de $24$ font $18$.",
          schema: ecranSeulement(
            barre(
              [
                { label: "1/4", value: 6 },
                { label: "1/4", value: 6 },
                { label: "1/4", value: 6 },
                { label: "1/4", value: 6 },
              ],
              "3 quarts = 18, donc 1 quart = 6",
            ),
          ),
          micros: ["auto_prop_tout_connaissant_partie"],
        },
        {
          enonce: "Calculer $15$ % de $240$.",
          correction:
            "$10$ % de $240$ font $24$ ; $5$ %, la moitié, font $12$.\n$15$ % $= 24 + 12 = 36$.\n⭐ $15$ % $= 10$ % $+ 5$ % : le geste le plus utile du calcul de tête.",
          micros: ["auto_prop_partie_connaissant_tout"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Dire si l'on cherche une partie, un tout, ou une partie d'une partie, puis conclure par une phrase. Sans calculatrice.",
      rappel: [
        "Première question à se poser : le nombre donné est-il le TOUT, ou une PARTIE ?",
        "On cherche le tout : on divise. ✔️ Le résultat doit être plus grand que la partie.",
        "« $25$ % DE CES élèves » : le tout a changé, c'est une partie d'une partie.",
      ],
      exercices: [
        {
          titre: "Le loyer",
          enonce: "Une salariée consacre $30$ % de son salaire à son loyer, qui est de $750$ € par mois. Quel est son salaire ?",
          correction:
            "Le loyer est une PARTIE du salaire : on cherche le tout, on divise.\n$10$ % du salaire : $750 \\div 3 = 250$ €.\n$100$ % : $10 \\times 250 = 2\\,500$ €.\n✔️ $30$ % de $2\\,500$ € $= 750$ €.\n⚠️ $30$ % de $750$ € ($225$ €) ne répond pas à la question : ce n'est pas le bon tout.",
          schema: ecranSeulement(barre([{ label: "30 %", value: 750 }, { label: "70 %", value: 1750 }], "loyer 750 € ; salaire 2 500 €")),
          micros: ["auto_prop_tout_connaissant_partie"],
        },
        {
          titre: "Combien de suffrages ?",
          enonce: "À une élection (modèle), la liste $A$ a obtenu $45$ % des suffrages exprimés, soit $900$ voix. Combien y a-t-il eu de suffrages exprimés ?",
          correction:
            "On connaît une partie ($900$ voix) et sa proportion ($45$ %) : on cherche le tout.\n$\\dfrac{900}{0{,}45} = \\dfrac{90\\,000}{45} = 2\\,000$ suffrages exprimés.\nDe tête : $45$ % valent $900$, donc $5$ % valent $100$, et $100$ % valent $2\\,000$.\n✔️ $45$ % de $2\\,000$ $= 900$.",
          micros: ["auto_prop_tout_connaissant_partie"],
        },
        {
          titre: "Les transports en commun",
          enonce: "Dans une région (modèle), $60$ % des habitants vivent en ville. Parmi les habitants des villes, $25$ % prennent les transports en commun chaque jour. Quel pourcentage des habitants de la région cela représente-t-il ?",
          correction:
            "« $25$ % des habitants DES VILLES » : le tout n'est plus la région, c'est une partie d'une partie.\nOn multiplie : $0{,}6 \\times 0{,}25 = 0{,}15$, soit $15$ %.\nDe tête : le quart de $60$ %, c'est $15$ %.\n⚠️ Répondre $25$ % serait confondre les deux touts : les citadins et toute la région.",
          schema: arbre([
            {
              label: "En ville",
              proba: "0,6",
              enfants: [
                { label: "Transports", proba: "0,25" },
                { label: "Autre", proba: "0,75" },
              ],
            },
            { label: "Hors ville", proba: "0,4" },
          ]),
          micros: ["auto_prop_pourcentage_de_pourcentage"],
        },
        {
          titre: "Retrouver le prix hors taxes",
          enonce: "Avec une TVA à $20$ %, une paire de chaussures coûte $120$ € TTC. Quel est son prix hors taxes ? Combien de TVA l'État perçoit-il ?",
          correction:
            "La TVA s'ajoute au prix HT : le TTC vaut $100$ % $+ 20$ % $= 120$ % du prix HT.\nLe prix HT est le tout : on divise. $\\dfrac{120}{1{,}2} = 100$ €.\nLa TVA : $120 - 100 = 20$ €.\n⚠️ Le piège : $20$ % de $120$ € $= 24$ €, puis $120 - 24 = 96$ €. Faux : les $20$ % portent sur le HT, pas sur le TTC.",
          schema: ecranSeulement(barre([{ label: "HT : 100 €", value: 100 }, { label: "TVA", value: 20 }], "TTC : 120 € = 120 % du HT")),
          micros: ["auto_prop_tout_connaissant_partie"],
        },
        {
          titre: "Le budget d'une commune",
          enonce:
            "Le diagramme donne la répartition du budget d'une commune (en %, modèle). Les écoles reçoivent $1{,}2$ million d'euros.\na) Quel est le budget total de la commune ?\nb) Combien reçoit la culture ?",
          figure: diagramme("camembert", [
            { label: "Écoles", value: 40 },
            { label: "Voirie", value: 25 },
            { label: "Social", value: 20 },
            { label: "Culture", value: 15 },
          ]),
          correction:
            "a) On lit : les écoles ont $40$ % du budget. $1{,}2$ million est une PARTIE : on cherche le tout.\n$10$ % du budget : $1\\,200\\,000 \\div 4 = 300\\,000$ €. Le budget : $10 \\times 300\\,000 = 3$ millions d'euros.\nb) La culture a $15$ % de $3$ millions : $300\\,000 + 150\\,000 = 450\\,000$ €.\n⭐ Deux gestes à la suite : de la partie au tout, puis du tout à une autre partie.",
          schema: ecranSeulement(
            diagramme("barres", [
              { label: "Écoles", value: 1200 },
              { label: "Voirie", value: 750 },
              { label: "Social", value: 600 },
              { label: "Culture", value: 450 },
            ]),
          ),
          micros: ["auto_prop_tout_connaissant_partie", "auto_prop_partie_connaissant_tout"],
        },
        {
          titre: "Les forêts protégées",
          enonce:
            "Un département de $6\\,000$ km² est couvert à $35$ % par la forêt, et $20$ % de cette forêt est protégée (modèle).\na) Quel pourcentage du département est en forêt protégée ?\nb) Quelle surface cela représente-t-il ?",
          correction:
            "a) Une partie d'une partie : $0{,}35 \\times 0{,}2 = 0{,}07$, soit $7$ %.\nDe tête : $20$ %, c'est un cinquième ; $35 \\div 5 = 7$.\nb) $7$ % de $6\\,000$ km² : $1$ % vaut $60$, donc $7$ % valent $420$ km².\n✔️ Autre chemin : forêt $= 2\\,100$ km², et $20$ % de $2\\,100$ $= 420$ km².",
          schema: ecranSeulement(
            arbre([
              {
                label: "Forêt",
                proba: "0,35",
                enfants: [
                  { label: "Protégée", proba: "0,2" },
                  { label: "Non protégée", proba: "0,8" },
                ],
              },
              { label: "Autre sol", proba: "0,65" },
            ]),
          ),
          micros: ["auto_prop_pourcentage_de_pourcentage", "auto_prop_partie_connaissant_tout"],
        },
        {
          titre: "Le chômage",
          enonce: "Dans un pays (modèle), le taux de chômage est de $12$ % de la population active, ce qui représente $3{,}6$ millions de chômeurs. Quelle est la population active de ce pays ?",
          correction:
            "Les chômeurs sont une PARTIE de la population active : on cherche le tout.\n$1$ % : $3{,}6 \\div 12 = 0{,}3$ million.\n$100$ % : $100 \\times 0{,}3 = 30$ millions.\n✔️ $12$ % de $30$ millions $= 3{,}6$ millions.\n⭐ Le taux de chômage se calcule sur les ACTIFS (ceux qui travaillent ou cherchent un emploi), pas sur toute la population.",
          schema: tableau(["part des actifs", "1 %", "12 %", "100 %"], ["millions", "0,3", "3,6", 30]),
          micros: ["auto_prop_tout_connaissant_partie"],
        },
        {
          titre: "Les écrans",
          enonce:
            "Une enquête (modèle) interroge $1\\,000$ lycéens. $70$ % ont un smartphone depuis le collège, et parmi eux, $40$ % l'utilisent plus de trois heures par jour.\na) Quel pourcentage de TOUS les lycéens interrogés cela représente-t-il ?\nb) Combien de lycéens ?",
          correction:
            "a) Une partie d'une partie : $0{,}7 \\times 0{,}4 = 0{,}28$, soit $28$ %.\nb) $28$ % de $1\\,000$ $= 280$ lycéens.\n✔️ Autre chemin : $70$ % de $1\\,000$ $= 700$, puis $40$ % de $700$ $= 280$.\n⚠️ $40$ % n'est pas la réponse : c'est une part des $700$, pas des $1\\,000$.",
          micros: ["auto_prop_pourcentage_de_pourcentage", "auto_prop_partie_connaissant_tout"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un problème complet, avec ses questions qui s'enchaînent. Sans calculatrice.",
      rappel: [
        "À chaque étape, on nomme le tout : « $75$ % DES INSCRITS », « $90$ % DES VOTANTS »…",
        "Une chaîne de parties se calcule en multipliant les proportions ; un tout retrouvé se vérifie en remultipliant.",
      ],
      exercices: [
        {
          titre: "Du bureau de vote au résultat",
          enonce:
            "Une ville compte $40\\,000$ inscrits (modèle). La participation est de $75$ % ; $90$ % des votants s'expriment (les autres votent blanc ou nul) ; la candidate $A$ obtient $40$ % des suffrages exprimés.\na) Calculer le nombre de votants, de suffrages exprimés, puis de voix pour $A$.\nb) Quel pourcentage des INSCRITS a voté pour $A$ ? Le calculer de deux façons.",
          correction:
            "a) Votants : $75$ % de $40\\,000$, les trois quarts, soit $30\\,000$.\nExprimés : $90$ % de $30\\,000$ $= 30\\,000 - 3\\,000 = 27\\,000$.\nVoix pour $A$ : $40$ % de $27\\,000$ $= 4 \\times 2\\,700 = 10\\,800$.\nb) Premier chemin : $\\dfrac{10\\,800}{40\\,000} = \\dfrac{108}{400} = \\dfrac{27}{100} = 27$ %.\nSecond chemin, en chaîne : $0{,}75 \\times 0{,}9 \\times 0{,}4 = 0{,}675 \\times 0{,}4 = 0{,}27$.\n⭐ « $40$ % des voix » et « $27$ % des inscrits » décrivent le même vote, avec deux touts différents.",
          schema: diagramme("barres", [
            { label: "Inscrits", value: 40000 },
            { label: "Votants", value: 30000 },
            { label: "Exprimés", value: 27000 },
            { label: "Voix A", value: 10800 },
          ]),
          micros: ["auto_prop_partie_connaissant_tout", "auto_prop_pourcentage_de_pourcentage"],
        },
        {
          titre: "La cantine et le budget",
          enonce:
            "Une commune (modèle) dépense $180\\,000$ € par an pour la cantine scolaire, soit $12$ % de son budget. Les écoles dans leur ensemble (cantine comprise) représentent $30$ % du budget.\na) Quel est le budget de la commune ?\nb) Combien reçoivent les écoles ?\nc) Quelle part du budget des écoles la cantine représente-t-elle ?\nd) Vérifier le résultat avec un pourcentage de pourcentage.",
          correction:
            "a) $180\\,000$ € est une partie : $1$ % du budget vaut $180\\,000 \\div 12 = 15\\,000$ €, donc le budget vaut $1\\,500\\,000$ €.\nb) $30$ % de $1\\,500\\,000$ € $= 450\\,000$ €.\nc) $\\dfrac{180\\,000}{450\\,000} = \\dfrac{18}{45} = \\dfrac{2}{5} = 40$ %.\nd) $40$ % de $30$ % : $0{,}4 \\times 0{,}3 = 0{,}12 = 12$ %. On retrouve bien la part de la cantine dans le budget. ✔️\n⭐ La même cantine pèse $12$ % du budget, et $40$ % du budget des écoles : ce n'est pas le même tout.",
          schema: diagramme("barres", [
            { label: "Budget (k€)", value: 1500 },
            { label: "Écoles (k€)", value: 450 },
            { label: "Cantine (k€)", value: 180 },
          ]),
          micros: ["auto_prop_tout_connaissant_partie", "auto_prop_pourcentage_de_pourcentage"],
        },
        {
          titre: "Une population qui vieillit",
          enonce:
            "Un pays (modèle) compte $60$ millions d'habitants, dont $16$ % ont $65$ ans ou plus. Quarante ans plus tard, selon une projection, il en compte $64$ millions, dont $25$ % ont $65$ ans ou plus.\na) Combien de personnes de $65$ ans ou plus aux deux dates ?\nb) À la seconde date, $40$ % des $65$ ans ou plus ont $80$ ans ou plus. Quel pourcentage de la population totale cela représente-t-il ? Combien de personnes ?",
          correction:
            "a) Première date : $16$ % de $60$ millions. $1$ % vaut $0{,}6$ million, donc $16 \\times 0{,}6 = 9{,}6$ millions.\nSeconde date : $25$ % de $64$ millions, le quart, soit $16$ millions.\nb) Une partie d'une partie : $0{,}4 \\times 0{,}25 = 0{,}1$, soit $10$ % de la population.\n$10$ % de $64$ millions $= 6{,}4$ millions de personnes.\n✔️ Autre chemin : $40$ % de $16$ millions $= 6{,}4$ millions.\n⭐ C'est ainsi qu'on prévoit, des années à l'avance, les places en maison de retraite.",
          schema: diagramme("barres", [
            { label: "65 ans et + (avant)", value: 9.6 },
            { label: "65 ans et + (après)", value: 16 },
          ]),
          micros: ["auto_prop_partie_connaissant_tout", "auto_prop_pourcentage_de_pourcentage"],
        },
        {
          titre: "Soldes et TVA",
          enonce:
            "Pendant les soldes, un manteau est vendu $90$ € TTC après une remise de $25$ %. La TVA est de $20$ %.\na) Quel était le prix TTC avant la remise ?\nb) Quel est le prix hors taxes du manteau soldé ? Combien de TVA contient-il ?\nc) Un client dit : « Avant la remise, il coûtait $90 + 25$ % de $90$. » Calculer ce prix et expliquer l'erreur.",
          correction:
            "a) Après une remise de $25$ %, on paie $75$ % du prix de départ : $90$ € sont une PARTIE.\n$25$ % du prix de départ : $90 \\div 3 = 30$ €. Le prix de départ : $4 \\times 30 = 120$ € TTC.\nb) $90$ € TTC $= 120$ % du prix HT : le HT est le tout. $\\dfrac{90}{1{,}2} = \\dfrac{900}{12} = 75$ € HT.\nLa TVA : $90 - 75 = 15$ €.\nc) $90 + 22{,}50 = 112{,}50$ €. Faux : les $25$ % se prennent sur le prix de DÉPART ($120$ €), pas sur le prix soldé.\n⚠️ Retrouver un prix d'avant, c'est toujours chercher un tout : on divise.",
          schema: tableau(["manteau soldé", "TTC (€)", "HT (€)", "TVA (€)"], ["montant", 90, 75, 15]),
          micros: ["auto_prop_tout_connaissant_partie"],
        },
      ],
    },
  ],
};
