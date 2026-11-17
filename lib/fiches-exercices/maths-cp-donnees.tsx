// ─── Fiche d'exercices : tableaux et diagrammes (CP) — 20 exercices ──────────
//
// 17/11/2026 : la feuille interactive de la notion `donnees` du coach CP,
// « Tableaux et diagrammes » (5 micros). Sur la forme de `maths-cm1-masse.tsx` :
// 8 ★, 8 ★★, 4 ★★★, un rappel avant chaque niveau, corrigés à la première
// personne, étape par étape, avec le piège nommé. Alignée sur la banque du
// coach (`lib/tutor-v4/questionBank/cp/maths/donnees.bank.ts`).
// ⛔ LIMITES DU CP (BO n° 41 du 31/10/2024) : une enquête sur un caractère
// qualitatif de 2 à 5 valeurs, moins de 40 enfants ; bâtons, tableau,
// diagramme en barres à l'axe gradué DE UN EN UN ; tableau à double entrée ;
// les mots « le plus », « le moins », « autant que », « plus que », « moins
// que ». Des nombres jusqu'à 100.
// ⛔ Aucune question à rédiger : QCM par lettre, un nombre, un mot.
// ⛔ Phrases de 14 mots au plus, une idée par phrase.
//
// Les pièges nommés : lire la ligne d'à côté (1), compter un paquet de cinq
// comme 1 (2, 9), lire la barre voisine (3, 7), confondre le plus et le moins
// (4, 20), la case du croisement (5, 11, 14), « autant » pris pour « plus »
// (6, 13), oublier une ligne dans le total (8, 16), soustraire dans le mauvais
// sens (10, 20), croire le diagramme sans le vérifier (12), compter les jours
// au lieu de les nommer (15), oublier le reste dans le total (17), oublier une
// barre (18), deux cases à trouver (19).
//
// ⭐ LES MATHS SONT TRANSVERSALES : fruits (1, 12), animaux (2, 3, 9, 18),
// couleurs (4, 5), goûter (6), sport (7), trajets (8), jeux (10, 14),
// glaces (11), musique (13), météo (15), oiseaux (16), boulangerie (17),
// peinture (19), potager (20). Les métiers : boulangère (17), vétérinaire
// (18), peintre (19), jardinier (20). AUCUN contexte réunionnais sur cette
// feuille (il est sur la feuille « monnaie » du même lot).
//
// ⭐ FAITS RÉELS : aucun. Toutes les enquêtes sont des MODÈLES.
//
// ⭐ LES DESSINS : `barres` (local : axe gradué de un en un, 22 px par unité,
// AUCUNE valeur écrite sur les barres), `grille` (tableau) et `croise`
// (tableau à double entrée) de figures-donnees, des bâtons groupés par cinq
// (`batons`), des formes à compter (`formes`), la météo de la semaine
// (`semaine`). Le dessin porte les données ; la question les fait lire.
//
// Micro-compétences : cp_donnees_lire_tableau (1, 2, 6, 8, 9, 15, 17),
// cp_donnees_barres (3, 7, 12, 16, 18), cp_donnees_completer_tableau (5, 11,
// 14, 19), cp_donnees_interpreter (4, 6, 10, 13, 16, 17, 20), cp_donnees_defi
// (17, 18, 19, 20). 5/5.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { croise, grille } from "@/lib/fiches-exercices/figures-donnees";

const NOIR = "#0f172a";
const GRIS = "#64748b";
const ROUGE = "#dc2626";
const BLEU = "#2563eb";

/**
 * Diagramme en BARRES du CP : l'axe vertical gradué DE UN EN UN (BO), assez
 * haut pour que chaque graduation se lise (22 px par unité ; le `barres` de
 * figures-donnees serre ses neuf graduations dans 122 px). AUCUNE valeur
 * écrite sur les barres : on lit la hauteur.
 */
const barres = (data: { label: string; value: number }[]) => {
  const max = Math.max(1, ...data.map((d) => d.value));
  const [G, D, HAUT, U] = [34, 10, 14, 22];
  const BAS = HAUT + max * U;
  const W = 300;
  const H = BAS + 30;
  const slot = (W - G - D) / data.length;
  const bw = Math.min(42, slot * 0.6);
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Diagramme en barres">
        <rect x={0} y={0} width={W} height={H} rx={10} fill="#ffffff" />
        {Array.from({ length: max + 1 }, (_, g) => (
          <g key={g}>
            <line x1={G - 4} y1={BAS - g * U} x2={W - D} y2={BAS - g * U} stroke="#cbd5e1" strokeWidth={1} />
            <text x={G - 9} y={BAS - g * U + 5} textAnchor="end" fontSize="14" fontWeight="700" fill="#334155">
              {g}
            </text>
          </g>
        ))}
        <line x1={G - 4} y1={HAUT - 8} x2={G - 4} y2={BAS} stroke={NOIR} strokeWidth={1.5} />
        <line x1={G - 4} y1={BAS} x2={W - D} y2={BAS} stroke={NOIR} strokeWidth={1.5} />
        {data.map((d, i) => {
          const x = G + i * slot + (slot - bw) / 2;
          return (
            <g key={i}>
              <rect x={x} y={BAS - d.value * U} width={bw} height={d.value * U} rx={3} fill="#bfdbfe" stroke={BLEU} strokeWidth={1.5} />
              <text x={x + bw / 2} y={BAS + 20} textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/** La météo de la semaine : une case par jour, le nom du jour et un dessin (emoji). */
const semaine = (jours: { jour: string; temps: string }[]) => (
  <div className="mx-auto w-full max-w-[21rem] print:max-w-[15rem]">
    <svg viewBox={`0 0 ${jours.length * 62 + 4} 84`} className="block h-auto w-full" role="img" aria-label="La météo de la semaine">
      {jours.map((j, i) => (
        <g key={i}>
          <rect x={2 + i * 62} y={2} width={62} height={80} fill="#ffffff" stroke="#94a3b8" strokeWidth={1.5} />
          <rect x={2 + i * 62} y={2} width={62} height={24} fill="#e0f2fe" stroke="#94a3b8" strokeWidth={1.5} />
          <text x={33 + i * 62} y={19} textAnchor="middle" fontSize="12" fontWeight="800" fill={NOIR}>
            {j.jour}
          </text>
          <text x={33 + i * 62} y={66} textAnchor="middle" fontSize="28">
            {j.temps}
          </text>
        </g>
      ))}
    </svg>
  </div>
);

/** Des bâtons de comptage, groupés par cinq (quatre bâtons barrés d'un cinquième). */
const batons = (lignes: { label: string; n: number }[]) => (
  <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
    <svg viewBox={`0 0 300 ${lignes.length * 44 + 8}`} className="block h-auto w-full" role="img" aria-label="Des bâtons de comptage">
      {lignes.map((l, k) => {
        const y = 8 + k * 44;
        const traits = [];
        for (let i = 0; i < l.n; i++) {
          const paquet = Math.floor(i / 5);
          const r = i % 5;
          const x0 = 104 + paquet * 58;
          if (r < 4) traits.push(<line key={i} x1={x0 + r * 10} y1={y + 4} x2={x0 + r * 10} y2={y + 32} stroke={NOIR} strokeWidth={2.6} strokeLinecap="round" />);
          else traits.push(<line key={i} x1={x0 - 6} y1={y + 28} x2={x0 + 36} y2={y + 8} stroke={NOIR} strokeWidth={2.6} strokeLinecap="round" />);
        }
        return (
          <g key={k}>
            <text x={6} y={y + 24} fontSize="15" fontWeight="700" fill={GRIS}>
              {l.label}
            </text>
            {traits}
          </g>
        );
      })}
    </svg>
  </div>
);

/** Des formes à compter, posées en vrac : ronds et carrés, rouges ou bleus. */
const formes = (liste: { f: "rond" | "carre"; c: "r" | "b"; x: number; y: number }[]) => (
  <div className="mx-auto w-full max-w-[18rem] print:max-w-[12rem]">
    <svg viewBox="0 0 300 130" className="block h-auto w-full" role="img" aria-label="Des ronds et des carrés">
      <rect x={2} y={2} width={296} height={126} rx={10} fill="#ffffff" stroke="#cbd5e1" />
      {liste.map((o, i) =>
        o.f === "rond" ? (
          <circle key={i} cx={o.x} cy={o.y} r={15} fill={o.c === "r" ? ROUGE : BLEU} />
        ) : (
          <rect key={i} x={o.x - 14} y={o.y - 14} width={28} height={28} rx={2} fill={o.c === "r" ? ROUGE : BLEU} />
        ),
      )}
    </svg>
  </div>
);

export const exercicesDonneesCp: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cp",
  notion: "donnees",
  titre: "Tableaux et diagrammes",
  accroche:
    "Vingt exercices pour lire une enquête. Compter des bâtons, lire un tableau, lire un diagramme en barres. Trouver la case où une ligne et une colonne se croisent. Dire qui a le plus, le moins, autant. Une boulangère, un vétérinaire, un peintre et le potager de l'école. Un rappel avant chaque niveau. Cherche d'abord. Puis ouvre la correction.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=cp",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Je lis le tableau ou le diagramme. J'écris un nombre ou un mot.",
      rappel: [
        "Dans un tableau, je suis la ligne avec le doigt jusqu'au nombre.",
        "Un paquet de bâtons barrés vaut 5.",
        "Dans un diagramme, je lis le nombre en face du haut de la barre.",
      ],
      exercices: [
        {
          enonce: "Inès demande à sa classe : « Quel fruit préfères-tu ? »\na) Combien d'enfants préfèrent la banane ?\nb) Combien d'enfants préfèrent la pomme ?",
          figure: grille(["Fruit", "Nombre d'enfants"], [["pomme", 5], ["banane", 8], ["fraise", 6]]),
          correction:
            "Je cherche le fruit, puis je suis sa ligne jusqu'au nombre.\na) Ligne « banane » : 8. Donc 8 enfants préfèrent la banane.\nb) Ligne « pomme » : 5. Donc 5 enfants préfèrent la pomme.\n⛔ Le piège : lire le nombre de la ligne d'à côté. Je garde le doigt sur la bonne ligne.\nRéponse : a) 8 ; b) 5.",
          micros: ["cp_donnees_lire_tableau"],
          reponses: [
            { question: "a)", attendu: ["8", "huit"] },
            { question: "b)", attendu: ["5", "cinq"] },
          ],
        },
        {
          enonce: "Malo a compté les animaux de la ferme avec des bâtons.\na) Combien de poules ?\nb) Combien de vaches ?",
          figure: batons([
            { label: "poules", n: 7 },
            { label: "vaches", n: 11 },
          ]),
          correction:
            "Un paquet barré vaut 5. Je compte de 5 en 5, puis j'ajoute les bâtons seuls.\na) Poules : 1 paquet et 2 bâtons. 5 + 2 = 7.\nb) Vaches : 2 paquets et 1 bâton. 5 + 5 + 1 = 11.\n⛔ Le piège : compter un paquet comme 1 bâton. Un paquet barré, ce sont 5 bâtons.\nRéponse : a) 7 ; b) 11.",
          micros: ["cp_donnees_lire_tableau"],
          reponses: [
            { question: "a)", attendu: ["7", "sept"] },
            { question: "b)", attendu: ["11", "onze"] },
          ],
        },
        {
          enonce: "Voici l'animal préféré des enfants d'une classe.\nCombien d'enfants ont choisi le chat ?",
          figure: barres(
            [
              { label: "chien", value: 6 },
              { label: "chat", value: 4 },
              { label: "lapin", value: 2 },
              { label: "poisson", value: 3 },
            ],
          ),
          correction:
            "Je trouve la barre du chat. Je regarde où arrive son haut.\nJe suis la ligne vers la gauche jusqu'au nombre : 4.\nDonc 4 enfants ont choisi le chat.\n⛔ Le piège : lire la barre voisine, celle du chien, qui monte à 6.\nRéponse : 4.",
          micros: ["cp_donnees_barres"],
          reponses: [{ attendu: ["4", "quatre"] }],
        },
        {
          enonce: "Les enfants ont choisi une couleur pour la fresque.\na) Quelle couleur a été choisie le plus ?\nb) Quelle couleur a été choisie le moins ?",
          figure: barres(
            [
              { label: "rouge", value: 3 },
              { label: "bleu", value: 7 },
              { label: "vert", value: 5 },
            ],
          ),
          correction:
            "Je compare la hauteur des barres.\na) La barre la plus haute est celle du bleu : 7. Le bleu est choisi le plus.\nb) La barre la plus basse est celle du rouge : 3. Le rouge est choisi le moins.\n⛔ Le piège : confondre le plus et le moins. Le plus, c'est la barre la plus HAUTE.\nRéponse : a) bleu ; b) rouge.",
          micros: ["cp_donnees_interpreter"],
          reponses: [
            { question: "a)", attendu: ["bleu", "le bleu"] },
            { question: "b)", attendu: ["rouge", "le rouge"] },
          ],
        },
        {
          enonce: "Compte les formes du dessin.\nPuis complète la case « ? » du tableau.",
          figure: (
            <div className="space-y-2">
              {formes([
                { f: "rond", c: "r", x: 30, y: 34 },
                { f: "carre", c: "b", x: 80, y: 90 },
                { f: "rond", c: "b", x: 124, y: 36 },
                { f: "carre", c: "b", x: 166, y: 92 },
                { f: "rond", c: "r", x: 204, y: 40 },
                { f: "carre", c: "r", x: 250, y: 86 },
                { f: "carre", c: "b", x: 270, y: 32 },
                { f: "rond", c: "b", x: 36, y: 96 },
                { f: "rond", c: "r", x: 120, y: 98 },
                { f: "carre", c: "b", x: 210, y: 100 },
              ])}
              {croise(["", "rouge", "bleu"], [["rond", 3, 2], ["carré", 1, "?"]])}
            </div>
          ),
          correction:
            "La case « ? » est sur la ligne « carré » et dans la colonne « bleu ».\nJe cherche donc les carrés bleus, et je les compte : 1, 2, 3, 4.\nJe vérifie le reste : 3 ronds rouges, 2 ronds bleus, 1 carré rouge.\n⛔ Le piège : compter tous les carrés, et écrire 5. Le carré rouge n'est pas bleu.\nRéponse : 4.",
          micros: ["cp_donnees_completer_tableau"],
          reponses: [{ attendu: ["4", "quatre"] }],
        },
        {
          enonce: "Voici le goûter préféré de la classe.\nVrai ou faux ?\na) Le gâteau est le plus choisi.\nb) Le fruit et le yaourt ont autant de voix.\nc) Le yaourt a plus de voix que le gâteau.",
          figure: grille(["Goûter", "Nombre d'enfants"], [["gâteau", 9], ["fruit", 6], ["yaourt", 6]]),
          correction:
            "Je lis les trois nombres : gâteau 9, fruit 6, yaourt 6.\na) 9 est le plus grand nombre. Le gâteau est le plus choisi. Vrai.\nb) Le fruit a 6 voix, le yaourt aussi 6. Autant. Vrai.\nc) Le yaourt a 6 voix, le gâteau 9. 6 est moins que 9. Faux.\n⛔ Le piège du b) : chercher une différence. « Autant » veut dire le même nombre.\nRéponse : a) vrai ; b) vrai ; c) faux.",
          micros: ["cp_donnees_interpreter", "cp_donnees_lire_tableau"],
          reponses: [
            { question: "a)", attendu: ["vrai", "oui"] },
            { question: "b)", attendu: ["vrai", "oui"] },
            { question: "c)", attendu: ["faux", "non"] },
          ],
        },
        {
          enonce: "Voici le sport préféré des enfants.\na) Combien d'enfants préfèrent la danse ?\nb) Combien d'enfants préfèrent le vélo ?",
          figure: barres(
            [
              { label: "foot", value: 7 },
              { label: "danse", value: 5 },
              { label: "judo", value: 3 },
              { label: "vélo", value: 6 },
            ],
          ),
          correction:
            "Pour chaque sport, je suis le haut de la barre jusqu'au nombre à gauche.\na) La barre « danse » monte jusqu'au 5. Donc 5 enfants.\nb) La barre « vélo » monte jusqu'au 6. Donc 6 enfants.\n⛔ Le piège : lire la barre d'à côté. Je pose le doigt sous le bon nom.\nRéponse : a) 5 ; b) 6.",
          micros: ["cp_donnees_barres"],
          reponses: [
            { question: "a)", attendu: ["5", "cinq"] },
            { question: "b)", attendu: ["6", "six"] },
          ],
        },
        {
          enonce: "Comment les enfants viennent-ils à l'école ?\nCombien d'enfants ont répondu en tout ?",
          figure: grille(["Trajet", "Nombre d'enfants"], [["à pied", 6], ["en voiture", 8], ["en bus", 4]]),
          correction:
            "J'additionne les nombres de toutes les lignes.\n6 + 8 = 14.\n14 + 4 = 18.\nDonc 18 enfants ont répondu.\n⛔ Le piège : oublier la ligne « en bus ». Tous les enfants comptent.\nRéponse : 18.",
          micros: ["cp_donnees_lire_tableau"],
          reponses: [{ attendu: ["18", "dix-huit"] }],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux petites étapes. Je lis les nombres, puis je compare ou je calcule.",
      rappel: [
        "Tableau à double entrée : un doigt sur la ligne, un doigt sur la colonne.",
        "La case cherchée est là où les deux doigts se rencontrent.",
        "Combien de plus : le grand nombre moins le petit.",
        "Autant : le même nombre.",
      ],
      exercices: [
        {
          enonce: "Léa a noté les animaux de ses amis avec des bâtons.\nÉcris le nombre de chaque animal.\na) chats b) chiens c) poissons",
          figure: batons([
            { label: "chats", n: 6 },
            { label: "chiens", n: 4 },
            { label: "poissons", n: 8 },
          ]),
          correction:
            "Je compte de 5 en 5 pour chaque paquet barré, puis j'ajoute les bâtons seuls.\na) Chats : 1 paquet et 1 bâton. 5 + 1 = 6.\nb) Chiens : 4 bâtons seuls, pas de paquet. 4.\nc) Poissons : 1 paquet et 3 bâtons. 5 + 3 = 8.\n⛔ Le piège : compter le bâton qui barre le paquet à part. Il fait partie du paquet de 5.\nRéponse : a) 6 ; b) 4 ; c) 8.",
          micros: ["cp_donnees_lire_tableau"],
          reponses: [
            { question: "a)", attendu: ["6", "six"] },
            { question: "b)", attendu: ["4", "quatre"] },
            { question: "c)", attendu: ["8", "huit"] },
          ],
        },
        {
          enonce: "Voici les jeux préférés de la récré.\na) Combien d'enfants de plus pour le ballon que pour la marelle ?\nb) Quel jeu a moins de voix que la corde ? Un seul jeu.",
          figure: barres(
            [
              { label: "marelle", value: 4 },
              { label: "ballon", value: 9 },
              { label: "corde", value: 6 },
              { label: "billes", value: 7 },
            ],
          ),
          correction:
            "Je lis d'abord chaque barre : marelle 4, ballon 9, corde 6, billes 7.\na) Ballon : 9. Marelle : 4. Je compte de 4 jusqu'à 9 : 5 de plus.\nb) La corde a 6 voix. Seule la marelle a moins : 4.\n⛔ Le piège du a) : répondre 9 ou 4. La question demande l'ÉCART entre les deux.\nRéponse : a) 5 ; b) la marelle.",
          micros: ["cp_donnees_interpreter", "cp_donnees_barres"],
          reponses: [
            { question: "a)", attendu: ["5", "cinq"] },
            { question: "b)", attendu: ["marelle", "la marelle"] },
          ],
        },
        {
          enonce: "Les filles et les garçons ont choisi une glace.\na) Combien de filles ont choisi la vanille ?\nb) Combien d'enfants ont choisi le chocolat ?",
          figure: croise(["", "chocolat", "vanille"], [["filles", 5, 4], ["garçons", 6, 3]]),
          correction:
            "a) Je suis la ligne « filles » et la colonne « vanille ». Elles se croisent sur 4.\nDonc 4 filles ont choisi la vanille.\nb) Dans la colonne « chocolat » : 5 filles et 6 garçons.\n5 + 6 = 11 enfants.\n⛔ Le piège du a) : lire 5, la case « filles, chocolat ». Je garde un doigt sur la ligne, l'autre sur la colonne.\nRéponse : a) 4 ; b) 11.",
          micros: ["cp_donnees_completer_tableau", "cp_donnees_lire_tableau"],
          reponses: [
            { question: "a)", attendu: ["4", "quatre"] },
            { question: "b)", attendu: ["11", "onze"] },
          ],
        },
        {
          enonce: "Voici le tableau et le diagramme des fruits du goûter.\nUne barre est fausse. Laquelle ?",
          figure: (
            <div className="space-y-2">
              {grille(["Fruit", "Nombre"], [["pomme", 3], ["poire", 6], ["kiwi", 4]])}
              {barres(
                [
                  { label: "pomme", value: 3 },
                  { label: "poire", value: 6 },
                  { label: "kiwi", value: 5 },
                ],
              )}
            </div>
          ),
          correction:
            "Je compare chaque ligne du tableau avec sa barre.\nPomme : 3 dans le tableau, la barre monte à 3. Juste.\nPoire : 6 dans le tableau, la barre monte à 6. Juste.\nKiwi : 4 dans le tableau, mais la barre monte à 5. Fausse.\n⛔ Le piège : croire le diagramme sans vérifier. Je compare chaque barre au tableau.\nRéponse : le kiwi.",
          micros: ["cp_donnees_barres", "cp_donnees_lire_tableau"],
          reponses: [{ attendu: ["kiwi", "le kiwi", "la barre du kiwi"] }],
        },
        {
          enonce: "Voici l'instrument préféré de la classe.\na) Quel instrument a autant de voix que le piano ?\nb) Combien d'enfants ont répondu en tout ?",
          figure: barres(
            [
              { label: "piano", value: 4 },
              { label: "guitare", value: 6 },
              { label: "tambour", value: 4 },
              { label: "flûte", value: 2 },
            ],
          ),
          correction:
            "Je lis chaque barre : piano 4, guitare 6, tambour 4, flûte 2.\na) Le piano a 4 voix. Le tambour aussi a 4 voix. Ils en ont autant.\nb) J'additionne : 4 + 6 + 4 + 2 = 16.\n⛔ Le piège du a) : répondre « la guitare », la barre la plus haute. « Autant » veut dire la même hauteur.\nRéponse : a) le tambour ; b) 16.",
          micros: ["cp_donnees_interpreter"],
          reponses: [
            { question: "a)", attendu: ["tambour", "le tambour"] },
            { question: "b)", attendu: ["16", "seize"] },
          ],
        },
        {
          enonce: "Tom range ses billes dans un tableau.\nIl a 6 billes bleues en tout.\nCombien a-t-il de grosses billes bleues ?",
          figure: croise(["", "rouges", "bleues"], [["petites", 4, 3], ["grosses", 2, "?"]]),
          correction:
            "La case « ? » est sur la ligne « grosses », dans la colonne « bleues ».\nDans la colonne « bleues », il y a déjà 3 petites billes.\nEn tout, Tom a 6 billes bleues. Je compte de 3 jusqu'à 6 : 3.\nIl a 3 grosses billes bleues. Je vérifie : 3 + 3 = 6.\n⛔ Le piège : écrire 6. Le 6 compte TOUTES les billes bleues, petites et grosses.\nRéponse : 3.",
          micros: ["cp_donnees_completer_tableau"],
          reponses: [{ attendu: ["3", "trois"] }],
        },
        {
          enonce: "Voici la météo de la semaine.\na) Combien de jours de pluie ?\nb) Quel jour a-t-il plu pour la première fois ?",
          figure: semaine([
            { jour: "lundi", temps: "☀️" },
            { jour: "mardi", temps: "🌧️" },
            { jour: "mercredi", temps: "☀️" },
            { jour: "jeudi", temps: "🌧️" },
            { jour: "vendredi", temps: "☀️" },
          ]),
          correction:
            "Je lis le tableau de gauche à droite, du lundi au vendredi.\na) Je compte les nuages de pluie : mardi et jeudi. 2 jours de pluie.\nb) Le lundi, il y a du soleil. Le premier jour de pluie est mardi.\n⛔ Le piège du b) : écrire « jeudi », le dernier jour de pluie. Je cherche le PREMIER.\nRéponse : a) 2 ; b) mardi.",
          micros: ["cp_donnees_lire_tableau"],
          reponses: [
            { question: "a)", attendu: ["2", "deux"] },
            { question: "b)", attendu: ["mardi", "le mardi"] },
          ],
        },
        {
          enonce: "Ti Margo a compté les oiseaux du jardin.\na) Combien d'oiseaux a-t-elle vus en tout ?\nb) Combien de moineaux de plus que de merles ?",
          figure: barres(
            [
              { label: "moineaux", value: 8 },
              { label: "merles", value: 3 },
              { label: "pigeons", value: 5 },
            ],
          ),
          correction:
            "Je lis chaque barre : moineaux 8, merles 3, pigeons 5.\na) J'additionne : 8 + 3 + 5 = 16 oiseaux.\nb) Moineaux 8, merles 3. Je compte de 3 jusqu'à 8 : 5 de plus.\n⛔ Le piège du a) : oublier les pigeons. Toutes les barres comptent.\nRéponse : a) 16 ; b) 5.",
          micros: ["cp_donnees_barres", "cp_donnees_interpreter"],
          reponses: [
            { question: "a)", attendu: ["16", "seize"] },
            { question: "b)", attendu: ["5", "cinq"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le problème. Je lis les données, puis je calcule pas à pas.",
      rappel: [
        "Je lis d'abord TOUS les nombres du tableau ou du diagramme.",
        "Ce qui manque : le total moins ce que je connais.",
        "Je vérifie avec une addition.",
      ],
      exercices: [
        {
          titre: "Les ventes de la boulangère",
          enonce: "Voici ce que la boulangère a vendu ce matin.\na) Quels produits ont autant de ventes ?\nA) baguettes et croissants\nB) croissants et pains au chocolat\nC) baguettes et pains au chocolat\nb) L'après-midi, elle vend 3 croissants de plus. Combien de croissants en tout ?",
          figure: grille(["Produit", "Vendus le matin"], [["baguettes", 9], ["croissants", 7], ["pains au chocolat", 7]]),
          correction:
            "a) Je lis les nombres : baguettes 9, croissants 7, pains au chocolat 7.\nLes croissants et les pains au chocolat ont tous les deux 7. Réponse B.\nb) Le matin : 7 croissants. L'après-midi : 3 de plus.\n7 + 3 = 10 croissants.\n⛔ Le piège du b) : répondre 3. Il faut ajouter les croissants du matin.\nRéponse : a) B ; b) 10.",
          micros: ["cp_donnees_interpreter", "cp_donnees_lire_tableau", "cp_donnees_defi"],
          reponses: [
            { question: "a)", attendu: ["B", "B) croissants et pains au chocolat"] },
            { question: "b)", attendu: ["10", "dix"] },
          ],
        },
        {
          titre: "Les animaux du vétérinaire",
          enonce: "Cette semaine, le vétérinaire a soigné 20 animaux.\nLa barre des oiseaux est effacée.\nCombien d'oiseaux a-t-il soignés ?",
          figure: barres(
            [
              { label: "chiens", value: 6 },
              { label: "chats", value: 8 },
              { label: "lapins", value: 2 },
              { label: "oiseaux", value: 0 },
            ],
          ),
          correction:
            "Je lis les barres que je vois : chiens 6, chats 8, lapins 2.\nJ'additionne : 6 + 8 + 2 = 16 animaux.\nEn tout, il y a 20 animaux. Je compte de 16 jusqu'à 20 : 4.\nIl a soigné 4 oiseaux. Je vérifie : 16 + 4 = 20.\n⛔ Le piège : oublier une barre dans l'addition, par exemple les lapins.\nRéponse : 4.",
          micros: ["cp_donnees_barres", "cp_donnees_defi"],
          reponses: [{ attendu: ["4", "quatre"] }],
        },
        {
          titre: "Les formes du peintre",
          enonce: "Un peintre range ses formes dans un tableau. Deux cases sont effacées.\na) Combien de ronds bleus ?\nb) Combien de carrés rouges ?",
          figure: croise(["", "rouge", "bleu", "Total"], [["rond", 2, "?", 5], ["carré", "?", 4, 6]]),
          correction:
            "La colonne « Total » donne le nombre de formes de chaque ligne.\na) Ligne « rond » : 2 rouges, et 5 en tout. Je compte de 2 jusqu'à 5 : 3. Il y a 3 ronds bleus.\nb) Ligne « carré » : 4 bleus, et 6 en tout. Je compte de 4 jusqu'à 6 : 2. Il y a 2 carrés rouges.\nJe vérifie : 2 + 3 = 5 et 2 + 4 = 6.\n⛔ Le piège : recopier le total, 5 ou 6, dans la case.\nRéponse : a) 3 ; b) 2.",
          micros: ["cp_donnees_completer_tableau", "cp_donnees_defi"],
          reponses: [
            { question: "a)", attendu: ["3", "trois"] },
            { question: "b)", attendu: ["2", "deux"] },
          ],
        },
        {
          titre: "Le potager de l'école",
          enonce: "Le jardinier et la classe ont récolté des légumes.\na) Combien de légumes en tout ?\nb) Quel légume a été récolté le moins ?\nc) Combien de carottes de moins que de radis ?",
          figure: grille(["Légume", "Nombre récolté"], [["radis", 12], ["carottes", 9], ["salades", 4]]),
          correction:
            "Je lis les trois nombres : radis 12, carottes 9, salades 4.\na) 12 + 9 = 21. 21 + 4 = 25 légumes.\nb) Le plus petit nombre est 4 : les salades.\nc) Radis 12, carottes 9. Je compte de 9 jusqu'à 12 : 10, 11, 12. 3 de moins.\n⛔ Le piège du c) : répondre 21, en additionnant. « De moins » demande l'écart.\nRéponse : a) 25 ; b) les salades ; c) 3.",
          micros: ["cp_donnees_interpreter", "cp_donnees_defi"],
          reponses: [
            { question: "a)", attendu: ["25", "vingt-cinq"] },
            { question: "b)", attendu: ["salades", "les salades", "salade", "la salade"] },
            { question: "c)", attendu: ["3", "trois"] },
          ],
        },
      ],
    },
  ],
};
