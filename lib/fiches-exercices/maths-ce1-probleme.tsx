// ─── Fiche d'exercices : les problèmes (CE1) — 20 exercices corrigés ──────────
//
// 17/11/2026 : la feuille interactive de la notion `probleme` du coach CE1
// (9 micros). Sur la forme de `maths-cm1-probleme.tsx` : 8 ★, 8 ★★, 4 ★★★, un
// rappel avant chaque niveau, corrigés à la première personne, étape par
// étape, avec le piège nommé. Alignée sur la banque du coach
// (`lib/tutor-v4/questionBank/ce1/maths/probleme.bank.ts`) : les cinq
// structures du programme (parties-tout, comparaison, deux étapes,
// multiplicatif — partages compris —, mixte), et le SCHÉMA EN BARRE.
// ⛔ LIMITES DU CE1 : nombres dans le millier, prix en euros ENTIERS ; ni
// comparaison multiplicative (« 3 fois plus que »), ni produit cartésien.
// Les partages s'écrivent avec « ÷ », jamais 20/4.
// ⛔ Aucune question à rédiger : « Rédiger une réponse avec l'unité » se joue
// en QCM (quelle phrase répond ?). Un nombre, une lettre.
// ⛔ 6-7 ans : phrases de 16 mots au plus, une idée par phrase.
//
// Les pièges nommés : le mot « gagne » mal lu (1), additionner au lieu
// d'enlever (3), soustraire à l'envers (4), compter les boîtes (5), donner le
// nombre d'enfants (6), la phrase sans unité (7, 16), additionner deux
// parties seulement (8), le mot « plus » qui cache une soustraction (9),
// faire une seule étape (10, 17), 19 − 6 au lieu de 19 + 6 (11), 7 + 5 (12),
// 36 − 4 (13), le prix d'un seul cahier (14), additionner les deux hauteurs
// (15), oublier les absents (18), deux pattes pour les vaches (19), répondre
// en macarons au lieu de boîtes (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : jeux (1, 4, 11), boulangerie (1), ferme
// (2, 19), transports (3, 10), cuisine (5, 20), goûter (6), jardin (7),
// cinéma (8), images (9), fleuriste (12), sport (13, 16), école (14, 17,
// 18), monuments (15). Les métiers : boulanger (1), conducteur de car (10),
// fleuriste (12), maître-nageur (16), cuisinière de cantine (18), fermier
// (19), pâtissier (20).
// UN SEUL contexte réunionnais (3, le car de Cilaos, MODÈLE).
//
// ⭐ FAITS RÉELS, et leurs sources :
//   · ex. 15 — la tour Eiffel mesure 330 m depuis 2022 (Société
//     d'exploitation de la tour Eiffel, toureiffel.paris, « Les chiffres
//     clés ») ; la tour Montparnasse, 210 m (tourmontparnasse56.com).
//   · ex. 16 — une piscine de 25 m est le « petit bassin » réglementaire
//     (World Aquatics, règles des installations, FR 2.1 : bassins de 25 m
//     et de 50 m).
// Tout le reste est un MODÈLE.
//
// ⭐ LES DESSINS : le schéma en barre du programme (`schemaBarres` : le tout,
// les parties, le « ? »), des boîtes d'œufs (`boites`), des bonbons à
// partager (`jetons`). Le dessin ne donne jamais la réponse : le nombre
// cherché est toujours un « ? ».
//
// Micro-compétences : ce1_probleme_operation (1, 9, 11), ce1_probleme_add_sous
// (2, 3, 8, 11), ce1_probleme_comparaison (4, 9, 15), ce1_probleme_deux_etapes
// (10, 17), ce1_probleme_multiplicatif (5, 6, 12, 13, 16, 20),
// ce1_probleme_mixte (14, 18, 19), ce1_probleme_schema (2, 3, 8),
// ce1_probleme_reponse (7, 16), ce1_probleme_defi (17, 19, 20). 9/9.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE } from "@/lib/fiches-exercices/figures";

const NOIR = "#0f172a";

/**
 * Un SCHÉMA EN BARRE : une barre par ligne, faite de morceaux de longueur `n`
 * (relative), chacun avec son texte (« ? » pour le nombre cherché). Le texte
 * `total` est écrit à droite, sous une accolade. Texte NU (SVG).
 */
const schemaBarres = (lignes: { nom: string; morceaux: { n: number; texte: string; couleur?: string }[] }[], total?: string) => {
  // Sans noms de lignes, la barre prend toute la largeur.
  const avecNoms = lignes.some((l) => l.nom);
  const [x0, L, h, pas] = [avecNoms ? 70 : 10, avecNoms ? 180 : 240, 28, 38];
  const max = Math.max(...lignes.map((l) => l.morceaux.reduce((s, m) => s + m.n, 0)));
  const H = lignes.length * pas + 8;
  return (
    <div className="mx-auto w-full max-w-[21rem] print:max-w-[15rem]">
      <svg viewBox={`0 0 310 ${H}`} className="block h-auto w-full" role="img" aria-label="Schéma en barre">
        {lignes.map((l, i) => {
          const y = 6 + i * pas;
          let x = x0;
          return (
            <g key={i}>
              <text x={x0 - 8} y={y + h / 2 + 5} textAnchor="end" fontSize="14" fontWeight="800" fill={NOIR}>
                {l.nom}
              </text>
              {l.morceaux.map((m, k) => {
                const w = (m.n * L) / max;
                const g = (
                  <g key={k}>
                    <rect x={x} y={y} width={w} height={h} fill={m.couleur ?? (k === 0 ? BLEU : ORANGE)} fillOpacity={0.25} stroke={NOIR} strokeWidth={1.4} />
                    <text x={x + w / 2} y={y + h / 2 + 5} textAnchor="middle" fontSize="15" fontWeight="900" fill={NOIR}>
                      {m.texte}
                    </text>
                  </g>
                );
                x += w;
                return g;
              })}
            </g>
          );
        })}
        {total ? (
          <g>
            <path d={`M ${x0 + L + 8} 6 Q ${x0 + L + 16} 6 ${x0 + L + 16} ${H / 2} Q ${x0 + L + 16} ${H - 2} ${x0 + L + 8} ${H - 2}`} fill="none" stroke={NOIR} strokeWidth={1.6} />
            <text x={x0 + L + 22} y={H / 2 + 5} fontSize="15" fontWeight="900" fill={NOIR}>
              {total}
            </text>
          </g>
        ) : null}
      </svg>
    </div>
  );
};

/** `n` boîtes de `par` œufs (deux rangées), vues d'en haut. */
const boites = (n: number, par: number) => {
  const col = Math.ceil(par / 2);
  const [w, hb, r] = [col * 20 + 8, 48, 7.5];
  const W = n * (w + 10) + 4;
  return (
    <div className="mx-auto w-full" style={{ maxWidth: `${Math.min(22, n * 5.2)}rem` }}>
      <svg viewBox={`0 0 ${W} ${hb + 8}`} className="block h-auto w-full" role="img" aria-label="Boîtes d'œufs">
        {Array.from({ length: n }, (_, b) => {
          const x = 4 + b * (w + 10);
          return (
            <g key={b}>
              <rect x={x} y={4} width={w} height={hb} rx={6} fill="#d6d3d1" stroke={NOIR} strokeWidth={1.4} />
              {Array.from({ length: par }, (_, k) => (
                <ellipse key={k} cx={x + 14 + (k % col) * 20} cy={4 + 14 + Math.floor(k / col) * 20} rx={r} ry={r + 1.5} fill="#fffbeb" stroke={NOIR} strokeWidth={1} />
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/** `n` bonbons ronds en rangées de 10, à partager (aucun groupe n'est fait). */
const jetons = (n: number) => {
  const lignes = Math.ceil(n / 10);
  return (
    <div className="mx-auto w-full max-w-[18rem] print:max-w-[13rem]">
      <svg viewBox={`0 0 ${10 * 26 + 6} ${lignes * 26 + 6}`} className="block h-auto w-full" role="img" aria-label="Des bonbons à partager">
        {Array.from({ length: n }, (_, k) => (
          <circle key={k} cx={16 + (k % 10) * 26} cy={16 + Math.floor(k / 10) * 26} r={10} fill={k % 2 ? ORANGE : "#f472b6"} stroke={NOIR} strokeWidth={1} />
        ))}
      </svg>
    </div>
  );
};

export const exercicesProblemeCe1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "ce1",
  notion: "probleme",
  titre: "Les problèmes",
  accroche:
    "Vingt problèmes, du plus simple au plus long. Choisir le bon calcul : +, −, × ou ÷. Dessiner un schéma en barre. Trouver le tout, une partie, l'écart. Faire deux étapes. Une ferme, un car, un goûter, un cinéma, une kermesse, une cantine et un pâtissier. Un rappel avant chaque niveau. Cherche d'abord. Puis ouvre la correction, étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=ce1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul calcul",
      consigne: "Un calcul par problème. J'écris le nombre seul, ou la lettre.",
      rappel: [
        "Je cherche le tout : j'additionne les parties.",
        "Je cherche une partie : j'enlève l'autre partie au tout.",
        "Des paquets tous pareils : je multiplie. Un partage en parts égales : je divise (÷).",
      ],
      exercices: [
        {
          enonce: "Quel calcul faut-il faire ? Écris la lettre.\na) Lou a 12 billes. Elle en gagne 5. A) 12 + 5 B) 12 − 5 C) 12 × 5\nb) Le boulanger a 30 croissants. Il en vend 8. A) 30 + 8 B) 30 − 8 C) 30 × 8",
          correction:
            "Je me demande : le nombre augmente ou diminue ?\na) Lou gagne des billes : elle en a plus. J'ajoute : $12 + 5$. Réponse A.\nb) Le boulanger vend des croissants : il en a moins. J'enlève : $30 - 8$. Réponse B.\n⛔ Le piège : choisir × parce qu'il y a deux nombres. La multiplication, c'est pour des paquets pareils.\nRéponse : a) A ; b) B.",
          micros: ["ce1_probleme_operation"],
          reponses: [
            { question: "a)", attendu: ["A", "A) 12 + 5"] },
            { question: "b)", attendu: ["B", "B) 30 − 8"] },
          ],
        },
        {
          enonce: "À la ferme, il y a 14 poules et 9 canards.\nCombien d'animaux y a-t-il en tout ?",
          figure: schemaBarres([
            { nom: "", morceaux: [{ n: 23, texte: "?", couleur: "#94a3b8" }] },
            { nom: "", morceaux: [{ n: 14, texte: "14" }, { n: 9, texte: "9" }] },
          ]),
          correction:
            "Je cherche le tout : les poules ET les canards.\nLe schéma montre deux parties, 14 et 9. Le tout est la grande barre.\nJ'additionne : $14 + 9 = 23$ animaux.\n⛔ Le piège : enlever 9. Ici, on réunit les deux groupes.\nRéponse : 23.",
          micros: ["ce1_probleme_add_sous", "ce1_probleme_schema"],
          reponses: [{ attendu: "23" }],
        },
        {
          enonce: "Dans le car pour Cilaos, il y a 35 enfants.\n20 enfants sont des garçons.\nCombien y a-t-il de filles ?",
          figure: schemaBarres(
            [
              { nom: "", morceaux: [{ n: 35, texte: "35", couleur: "#94a3b8" }] },
              { nom: "", morceaux: [{ n: 20, texte: "20" }, { n: 15, texte: "?" }] },
            ],
          ),
          correction:
            "Je connais le tout : 35 enfants.\nJe connais une partie : 20 garçons.\nJe cherche l'autre partie : $35 - 20 = 15$ filles.\nJe vérifie : $20 + 15 = 35$.\n⛔ Le piège : additionner $35 + 20$. Les garçons sont déjà dans les 35 enfants.\nRéponse : 15.",
          micros: ["ce1_probleme_add_sous", "ce1_probleme_schema"],
          reponses: [{ attendu: "15" }],
        },
        {
          enonce: "Léo a 18 cartes. Inès a 25 cartes.\nCombien de cartes Inès a-t-elle de plus que Léo ?",
          correction:
            "Je compare deux nombres : je cherche l'écart.\nJe calcule le grand moins le petit : $25 - 18 = 7$.\nJe vérifie en avançant : de 18 à 20, il y a 2 ; de 20 à 25, il y a 5. $2 + 5 = 7$.\n⛔ Le piège : calculer $18 - 25$, à l'envers. On enlève toujours le petit au grand.\nRéponse : 7.",
          micros: ["ce1_probleme_comparaison"],
          reponses: [{ attendu: ["7", "sept"] }],
        },
        {
          enonce: "Papa achète 4 boîtes de 6 œufs pour un gâteau.\nCombien d'œufs y a-t-il ?",
          figure: boites(4, 6),
          correction:
            "Il y a 4 paquets tous pareils, de 6 œufs chacun.\nJe multiplie : $4 \\times 6 = 24$ œufs.\nJe vérifie : $6 + 6 + 6 + 6 = 24$.\n⛔ Le piège : répondre 4, le nombre de boîtes. On demande les œufs.\nRéponse : 24.",
          micros: ["ce1_probleme_multiplicatif"],
          reponses: [{ attendu: "24" }],
        },
        {
          enonce: "Pour le goûter, Mia partage 20 bonbons entre 4 enfants.\nChacun reçoit autant.\nCombien de bonbons a chaque enfant ?",
          figure: jetons(20),
          correction:
            "C'est un partage en 4 parts égales : je divise.\n$20 \\div 4 = 5$, car $4 \\times 5 = 20$.\nJe peux aussi distribuer un bonbon à chacun, encore et encore : 5 tours.\n⛔ Le piège : répondre 4, le nombre d'enfants. On demande les bonbons de chacun.\nRéponse : 5.",
          micros: ["ce1_probleme_multiplicatif"],
          reponses: [{ attendu: ["5", "cinq"] }],
        },
        {
          enonce: "Le jardinier plante 15 rosiers et 10 tulipes. Combien de fleurs en tout ?\nQuelle phrase répond à la question ?\nA) Il a planté 25 fleurs. B) 25. C) Il a planté 15 fleurs.",
          correction:
            "Je calcule d'abord : $15 + 10 = 25$ fleurs.\nA) « Il a planté 25 fleurs. » Le bon nombre, avec le mot « fleurs ». Juste.\nB) « 25. » Le nombre est bon, mais on ne sait pas de quoi.\nC) « 15 fleurs » : ce ne sont que les rosiers.\nRéponse A.\n⛔ Le piège : répondre B. Une réponse dit toujours de quoi on parle.\nRéponse : A.",
          micros: ["ce1_probleme_reponse"],
          reponses: [{ attendu: ["A", "A) Il a planté 25 fleurs."] }],
        },
        {
          enonce: "Au cinéma, il y a 32 adultes et 15 enfants.\nRegarde le schéma. Quel nombre faut-il mettre à la place du « ? » ?",
          figure: schemaBarres([
            { nom: "", morceaux: [{ n: 47, texte: "?", couleur: "#94a3b8" }] },
            { nom: "", morceaux: [{ n: 32, texte: "32" }, { n: 15, texte: "15" }] },
          ]),
          correction:
            "Le « ? » est sur la grande barre du haut : c'est le tout, tout le monde dans la salle.\nJ'additionne les deux parties : $32 + 15 = 47$.\nJe calcule : $30 + 10 = 40$ et $2 + 5 = 7$. Donc 47.\n⛔ Le piège : enlever $32 - 15$. La grande barre est aussi longue que les deux morceaux réunis.\nRéponse : 47.",
          micros: ["ce1_probleme_schema", "ce1_probleme_add_sous"],
          reponses: [{ attendu: "47" }],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Je lis deux fois. Je dessine un schéma au brouillon, puis je calcule.",
      rappel: [
        "« De plus » ne veut pas toujours dire + : je me demande qui a le plus.",
        "Deux étapes : je fais le premier calcul, puis le deuxième.",
        "Je vérifie avec le calcul inverse : 25 − 6 = 19, donc 19 + 6 = 25.",
      ],
      exercices: [
        {
          enonce: "Tom a 42 images. Il a 15 images de plus que Sami.\nCombien d'images Sami a-t-il ?",
          figure: schemaBarres([
            { nom: "Tom", morceaux: [{ n: 42, texte: "42", couleur: "#94a3b8" }] },
            { nom: "Sami", morceaux: [{ n: 27, texte: "?" }, { n: 15, texte: "15", couleur: "#ffffff" }] },
          ]),
          correction:
            "Tom a PLUS que Sami. Donc Sami a MOINS que Tom.\nSami a 15 images de moins : $42 - 15 = 27$.\nJe vérifie : $27 + 15 = 42$. Tom a bien 15 de plus.\n⛔ Le piège : voir « plus » et additionner $42 + 15$. C'est Tom qui a le plus.\nRéponse : 27.",
          micros: ["ce1_probleme_comparaison", "ce1_probleme_operation"],
          reponses: [{ attendu: "27" }],
        },
        {
          enonce: "Dans le car, il y a 25 passagers.\nÀ l'arrêt, 8 personnes descendent et 12 montent.\nCombien de passagers y a-t-il maintenant ?",
          correction:
            "Je fais les deux étapes dans l'ordre.\n1re étape : 8 descendent. $25 - 8 = 17$.\n2e étape : 12 montent. $17 + 12 = 29$.\n⛔ Le piège : s'arrêter après la 1re étape et répondre 17.\nRéponse : 29.",
          micros: ["ce1_probleme_deux_etapes"],
          reponses: [{ attendu: "29" }],
        },
        {
          enonce: "Lina a perdu 6 billes à la récré.\nIl lui en reste 19.\nCombien de billes avait-elle avant la récré ?",
          correction:
            "Avant, elle avait plus de billes : je cherche le début de l'histoire.\nLes 19 qui restent + les 6 perdues = toutes les billes du début.\n$19 + 6 = 25$ billes.\nJe vérifie : $25 - 6 = 19$.\n⛔ Le piège : voir « perdu » et enlever, $19 - 6 = 13$. On cherche ce qu'elle avait AVANT.\nRéponse : 25.",
          micros: ["ce1_probleme_add_sous", "ce1_probleme_operation"],
          reponses: [{ attendu: "25" }],
        },
        {
          enonce: "La fleuriste fait 5 bouquets.\nDans chaque bouquet, elle met 7 roses.\nCombien de roses utilise-t-elle ?",
          correction:
            "5 bouquets tous pareils, de 7 roses : je multiplie.\n$5 \\times 7 = 35$ roses.\nJe vérifie : $7 + 7 + 7 + 7 + 7 = 35$.\n⛔ Le piège : additionner $5 + 7 = 12$. Il y a 7 roses dans CHAQUE bouquet.\nRéponse : 35.",
          micros: ["ce1_probleme_multiplicatif"],
          reponses: [{ attendu: "35" }],
        },
        {
          enonce: "En sport, 36 élèves font des équipes de 4.\nCombien d'équipes y a-t-il ?",
          correction:
            "Je fais des groupes de 4 : je cherche combien de fois 4 dans 36.\n$36 \\div 4 = 9$, car $9 \\times 4 = 36$.\nIl y a 9 équipes.\n⛔ Le piège : calculer $36 - 4 = 32$. On fait plusieurs équipes, pas une seule.\nRéponse : 9.",
          micros: ["ce1_probleme_multiplicatif"],
          reponses: [{ attendu: ["9", "neuf"] }],
        },
        {
          enonce: "Pour la rentrée, Adam achète 3 cahiers à 2 € et une trousse à 5 €.\nCombien d'euros paie-t-il ?",
          correction:
            "1re étape : les cahiers. 3 cahiers à 2 € : $3 \\times 2 = 6$ €.\n2e étape : j'ajoute la trousse. $6 + 5 = 11$ €.\n⛔ Le piège : compter un seul cahier, $2 + 5 = 7$. Il en achète 3.\nRéponse : 11.",
          micros: ["ce1_probleme_mixte"],
          reponses: [{ attendu: "11" }],
        },
        {
          enonce: "La tour Eiffel mesure 330 m. La tour Montparnasse mesure 210 m.\nDe combien de mètres la tour Eiffel est-elle plus haute ?",
          correction:
            "Je compare deux hauteurs : je cherche l'écart.\n$330 - 210 = 120$ m.\nJe calcule les centaines : $300 - 200 = 100$. Puis les dizaines : $30 - 10 = 20$. $100 + 20 = 120$.\n⛔ Le piège : additionner $330 + 210$. On ne met pas les tours l'une sur l'autre.\nRéponse : 120.",
          micros: ["ce1_probleme_comparaison"],
          reponses: [{ attendu: "120" }],
        },
        {
          enonce: "La piscine mesure 25 m. Max nage 4 longueurs. Combien de mètres nage-t-il ?\nQuelle phrase répond ?\nA) Max a nagé 100 m. B) Max a nagé 100 longueurs. C) Max a nagé 29 m.",
          correction:
            "Je calcule : 4 longueurs de 25 m. $4 \\times 25 = 100$ m.\nA) « 100 m » : le bon nombre et la bonne unité. Juste.\nB) Il n'a pas nagé 100 longueurs, mais 4.\nC) 29, c'est $25 + 4$ : le mauvais calcul.\nRéponse A.\n⛔ Le piège : choisir B. L'unité doit répondre à la question : des mètres.\nRéponse : A.",
          micros: ["ce1_probleme_reponse", "ce1_probleme_multiplicatif"],
          reponses: [{ attendu: ["A", "A) Max a nagé 100 m."] }],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le problème. Je cherche les étapes, puis je calcule.",
      rappel: [
        "Je cherche d'abord ce qu'on me demande.",
        "Je fais une étape à la fois, et j'écris chaque résultat.",
        "À la fin, je relis la question et je vérifie.",
      ],
      exercices: [
        {
          titre: "La kermesse de l'école",
          enonce: "Pour la kermesse, les parents ont fait 100 gâteaux.\nLe matin, ils en vendent 45. L'après-midi, ils en vendent 38.\na) Combien de gâteaux ont-ils vendus ?\nb) Combien de gâteaux reste-t-il ?",
          correction:
            "a) J'additionne les ventes : $45 + 38 = 83$ gâteaux.\nJe calcule : $40 + 30 = 70$ et $5 + 8 = 13$. $70 + 13 = 83$.\nb) J'enlève les gâteaux vendus : $100 - 83 = 17$.\nJe vérifie : $83 + 17 = 100$.\n⛔ Le piège : enlever seulement les ventes du matin. Il y a deux ventes.\nRéponse : a) 83 ; b) 17.",
          micros: ["ce1_probleme_deux_etapes", "ce1_probleme_defi"],
          reponses: [
            { question: "a)", attendu: "83" },
            { question: "b)", attendu: "17" },
          ],
        },
        {
          titre: "La cantine",
          enonce: "Dans la cantine, il y a 6 tables de 8 places.\nToutes les places sont prises, sauf 5.\na) Combien de places y a-t-il ?\nb) Combien de repas la cuisinière sert-elle ?",
          correction:
            "a) 6 tables de 8 places : $6 \\times 8 = 48$ places.\nb) 5 places sont vides. Je les enlève : $48 - 5 = 43$ repas.\n⛔ Le piège : répondre 48 au b). Les 5 places vides n'ont pas de repas.\nRéponse : a) 48 ; b) 43.",
          micros: ["ce1_probleme_mixte"],
          reponses: [
            { question: "a)", attendu: "48" },
            { question: "b)", attendu: "43" },
          ],
        },
        {
          titre: "Les pattes de la ferme",
          enonce: "Dans la cour de la ferme, il y a 3 vaches et 5 poules.\na) Combien de pattes en tout ?\nb) Le fermier ajoute des poules. Maintenant, il y a 30 pattes. Combien de poules a-t-il ajoutées ?",
          correction:
            "a) Une vache a 4 pattes : $3 \\times 4 = 12$ pattes.\nUne poule a 2 pattes : $5 \\times 2 = 10$ pattes.\n$12 + 10 = 22$ pattes.\nb) Il y a $30 - 22 = 8$ pattes de plus.\nChaque poule a 2 pattes : $8 \\div 2 = 4$ poules.\n⛔ Le piège : donner 2 pattes à tous les animaux. Une vache en a 4.\nRéponse : a) 22 ; b) 4.",
          micros: ["ce1_probleme_mixte", "ce1_probleme_defi"],
          reponses: [
            { question: "a)", attendu: "22" },
            { question: "b)", attendu: ["4", "quatre"] },
          ],
        },
        {
          titre: "Les macarons du pâtissier",
          enonce: "Le pâtissier fait 60 macarons. Il les range par boîtes de 6.\na) Combien de boîtes remplit-il ?\nb) Il vend 7 boîtes. Combien de boîtes lui reste-t-il ?",
          correction:
            "a) Des groupes de 6 dans 60 : $60 \\div 6 = 10$, car $10 \\times 6 = 60$.\nIl remplit 10 boîtes.\nb) $10 - 7 = 3$ boîtes.\n⛔ Le piège du b) : calculer $60 - 7 = 53$. Il vend des boîtes, pas des macarons.\nRéponse : a) 10 ; b) 3.",
          micros: ["ce1_probleme_multiplicatif", "ce1_probleme_defi"],
          reponses: [
            { question: "a)", attendu: ["10", "dix"] },
            { question: "b)", attendu: ["3", "trois"] },
          ],
        },
      ],
    },
  ],
};
