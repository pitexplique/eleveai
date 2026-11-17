// ─── Fiche d'exercices : se repérer dans l'espace (CP) — 20 exercices ────────
//
// 17/11/2026 : la feuille interactive de la notion `reperage` du coach CP,
// « Repérage dans l'espace » (6 micros). Sur la forme de `maths-cm1-masse.tsx` :
// 8 ★, 8 ★★, 4 ★★★, un rappel avant chaque niveau, corrigés à la première
// personne, étape par étape, avec le piège nommé. Alignée sur la banque du
// coach (`lib/tutor-v4/questionBank/cp/maths/reperage.bank.ts`).
// ⛔ LIMITES DU CP (BO n° 41 du 31/10/2024) : l'espace de la classe, un plan,
// une maquette ; le vocabulaire du BO (sur, sous, entre, devant, derrière,
// au-dessus, en dessous, gauche, droite). AUCUNE COORDONNÉE : des cases,
// « vers la droite », « vers le haut ».
// ⛔ Aucune question à rédiger : QCM par lettre, un nombre, un mot.
// ⛔ Phrases de 14 mots au plus, une idée par phrase.
//
// Les pièges nommés : confondre sur et sous (1, 6), oublier un voisin (2, 10),
// la gauche et la droite inversées (3, 10), la file lue à l'envers (4), le haut
// et le bas de l'étagère (5, 15), lire la classe à l'envers (7), la gauche de
// celui qui nous fait face (9, 18), compter la case de départ (11, 16), une
// seule indication suivie (12, 17), compter les colonnes, pas les cubes (8,
// 13, 19), lire le chemin dans le désordre (14), foncer tout droit (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : maison (1), fruits (2, 16), animaux (3, 11,
// 14, 20), récréation (4), chambre (5, 15), classe (6, 7, 12, 17), transports
// (10), spectacle (18), chantier (19), ferme (20). Les métiers : chanteuse
// (18), maçon (19), fermière (20). AUCUN contexte réunionnais sur cette
// feuille (règle : ≈ 1 sur 20, il est sur la feuille « monnaie » du lot).
//
// ⭐ FAITS RÉELS : quand deux personnes se font face, la droite de l'une est
// du côté gauche de l'autre (ex. 9, 18). Tout le reste est un MODÈLE.
//
// ⭐ LES DESSINS : une rangée d'objets lue de gauche à droite (`rangee`), une
// table avec des objets dessus et dessous (`scene`), une étagère (`etagere`),
// le plan de la classe en quadrillage NU (`grille` de dessins-cm1-geometrie :
// aucun nombre, aucune lettre de colonne), des tours de cubes (`tours`). Le
// chemin n'est dessiné que quand on demande de le LIRE (14).
//
// Micro-compétences : cp_reperage_vocabulaire (1, 2, 4, 5, 6, 15),
// cp_reperage_gauche_droite (3, 9, 10, 15, 18), cp_reperage_quadrillage (7,
// 12, 17), cp_reperage_deplacement (11, 14, 16, 20), cp_reperage_assemblage
// (8, 13, 19), cp_reperage_defi (17, 18, 19, 20). 6/6.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU_CLAIR, ORANGE, ORANGE_CLAIR, grille, type Grille, type P2 } from "@/lib/fiches-exercices/dessins-cm1-geometrie";

const NOIR = "#0f172a";
const GRIS = "#64748b";
const BOIS = "#b45309";
const GRIS_CLAIR = "#e2e8f0";

/**
 * Le quadrillage NU de dessins-cm1-geometrie, mais les dessins (emoji) des
 * cases sont écrits en GRAND (la case les limite à 16 px : illisible au
 * vidéoprojecteur). Les lettres et les prénoms restent dans leur case.
 */
const plan = (g: Grille) => {
  const u = Math.min(g.taille ?? 34, 280 / g.col, 230 / g.lig);
  const estDessin = (t?: string) => !!t && /\p{Extended_Pictographic}/u.test(t);
  return grille({
    ...g,
    cases: (g.cases ?? []).map((c) => (estDessin(c.texte) ? { ...c, texte: undefined } : c)),
    textes: [
      ...(g.textes ?? []),
      ...(g.cases ?? []).filter((c) => estDessin(c.texte)).map((c) => ({ en: [c.c + 0.5, c.l + 0.5] as P2, t: c.texte as string, taille: Math.round(u * 0.62) })),
    ],
  });
};

type Objet = { e: string; nom: string };

/** Une rangée d'objets, lue de gauche à droite : un dessin (emoji), son nom dessous. */
const rangee = (objets: Objet[]) => (
  <div className="mx-auto w-full max-w-[21rem] print:max-w-[15rem]">
    <svg viewBox={`0 0 ${objets.length * 70 + 6} 90`} className="block h-auto w-full" role="img" aria-label="Une rangée d'objets">
      {objets.map((o, i) => (
        <g key={i}>
          <rect x={6 + i * 70} y={4} width={64} height={82} rx={10} fill="#f8fafc" stroke="#cbd5e1" strokeWidth={1.5} />
          <text x={38 + i * 70} y={46} textAnchor="middle" fontSize="32">
            {o.e}
          </text>
          <text x={38 + i * 70} y={76} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={NOIR}>
            {o.nom}
          </text>
        </g>
      ))}
    </svg>
  </div>
);

/** Une table vue de face : un objet dessus, un objet dessous, une lampe au-dessus. */
const scene = (dessus: Objet, dessous: Objet, plafond: Objet) => (
  <div className="mx-auto w-full max-w-[17rem] print:max-w-[12rem]">
    <svg viewBox="0 0 260 210" className="block h-auto w-full" role="img" aria-label="Une table et des objets">
      <line x1={130} y1={0} x2={130} y2={18} stroke={GRIS} strokeWidth={2} />
      <text x={130} y={46} textAnchor="middle" fontSize="28">
        {plafond.e}
      </text>
      <text x={182} y={40} fontSize="12.5" fontWeight="700" fill={NOIR}>
        {plafond.nom}
      </text>
      <text x={130} y={104} textAnchor="middle" fontSize="30">
        {dessus.e}
      </text>
      <text x={168} y={100} fontSize="12.5" fontWeight="700" fill={NOIR}>
        {dessus.nom}
      </text>
      <rect x={40} y={114} width={180} height={12} rx={3} fill={BOIS} />
      <rect x={52} y={126} width={10} height={70} fill={BOIS} />
      <rect x={198} y={126} width={10} height={70} fill={BOIS} />
      <text x={130} y={186} textAnchor="middle" fontSize="30">
        {dessous.e}
      </text>
      <text x={154} y={184} fontSize="12.5" fontWeight="700" fill={NOIR}>
        {dessous.nom}
      </text>
      <line x1={10} y1={197} x2={250} y2={197} stroke={GRIS} strokeWidth={2} />
    </svg>
  </div>
);

/** Une étagère : `etages[0]` est la planche du HAUT. Les objets alignés en colonnes. */
const etagere = (etages: Objet[][]) => {
  const n = Math.max(...etages.map((e) => e.length));
  const W = 30 + n * 76;
  const H = etages.length * 80 + 8;
  return (
    <div className="mx-auto w-full max-w-[17rem] print:max-w-[12rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Une étagère">
        <rect x={4} y={4} width={W - 8} height={H - 8} rx={4} fill="#fffbeb" stroke={BOIS} strokeWidth={4} />
        {etages.map((etage, k) => (
          <g key={k}>
            {k < etages.length - 1 ? <line x1={4} y1={4 + (k + 1) * 80} x2={W - 4} y2={4 + (k + 1) * 80} stroke={BOIS} strokeWidth={4} /> : null}
            {etage.map((o, i) => (
              <g key={i}>
                <text x={53 + i * 76} y={4 + k * 80 + 48} textAnchor="middle" fontSize="30">
                  {o.e}
                </text>
                <text x={53 + i * 76} y={4 + k * 80 + 72} textAnchor="middle" fontSize="12" fontWeight="700" fill={NOIR}>
                  {o.nom}
                </text>
              </g>
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
};

/**
 * Des assemblages de cubes vus de face, sur une seule épaisseur : tous les
 * cubes se voient. `colonnes` : la hauteur de chaque pile, de gauche à droite.
 */
const tours = (modeles: { nom: string; colonnes: number[] }[]) => {
  const [s, d] = [26, 9];
  const largeurs = modeles.map((m) => m.colonnes.length * s + d + 24);
  const hmax = Math.max(...modeles.flatMap((m) => m.colonnes));
  const H = hmax * s + d + 40;
  const W = largeurs.reduce((a, b) => a + b, 0) + 10;
  let x0 = 10;
  return (
    <div className="mx-auto w-full max-w-[18rem] print:max-w-[13rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Des assemblages de cubes">
        {modeles.map((m, k) => {
          const depart = x0;
          x0 += largeurs[k];
          const base = H - 26;
          return (
            <g key={k}>
              {m.colonnes.map((h, i) =>
                Array.from({ length: h }, (_, j) => {
                  const x = depart + i * s;
                  const y = base - (j + 1) * s;
                  return (
                    <g key={`${i}-${j}`}>
                      <polygon points={`${x},${y} ${x + d},${y - d} ${x + s + d},${y - d} ${x + s},${y}`} fill={ORANGE_CLAIR} stroke={NOIR} strokeWidth={1.2} />
                      <polygon points={`${x + s},${y} ${x + s + d},${y - d} ${x + s + d},${y + s - d} ${x + s},${y + s}`} fill="#fdba74" stroke={NOIR} strokeWidth={1.2} />
                      <rect x={x} y={y} width={s} height={s} fill="#fff7ed" stroke={NOIR} strokeWidth={1.5} />
                    </g>
                  );
                }),
              )}
              <text x={depart + (m.colonnes.length * s) / 2} y={H - 6} textAnchor="middle" fontSize="15" fontWeight="800" fill={GRIS}>
                {m.nom}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const exercicesReperageCp: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cp",
  notion: "reperage",
  titre: "Se repérer dans l'espace",
  accroche:
    "Vingt exercices pour dire où sont les choses. Sur, sous, entre, devant, derrière. La gauche et la droite. Le plan de la classe, des chemins sur un quadrillage, des tours de cubes. Un trésor caché, une chanteuse, un maçon et une fermière. Un rappel avant chaque niveau. Cherche d'abord. Puis ouvre la correction.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=cp",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Je regarde bien le dessin. J'écris un mot ou un nombre.",
      rappel: [
        "Sur : posé dessus. Sous : en dessous. Entre : au milieu de deux choses.",
        "Une rangée se lit de gauche à droite, comme une ligne du livre.",
        "Ma main gauche est du côté de mon cœur.",
      ],
      exercices: [
        {
          enonce: "Regarde la table. Écris le bon mot.\na) Le chat est sur ou sous la table ?\nb) Le vase est sur ou sous la table ?\nc) La lampe est au-dessus ou en dessous de la table ?",
          figure: scene({ e: "🏺", nom: "vase" }, { e: "🐱", nom: "chat" }, { e: "💡", nom: "lampe" }),
          correction:
            "Je regarde la place de chaque chose par rapport à la table.\na) Le chat est par terre, en bas de la table. Il est sous la table.\nb) Le vase est posé sur le plateau. Il est sur la table.\nc) La lampe pend du plafond, plus haut que la table. Elle est au-dessus.\n⛔ Le piège : confondre sur et sous. « Sur », on touche le dessus de la table.\nRéponse : a) sous ; b) sur ; c) au-dessus.",
          micros: ["cp_reperage_vocabulaire"],
          reponses: [
            { question: "a)", attendu: ["sous"] },
            { question: "b)", attendu: ["sur"] },
            { question: "c)", attendu: ["au-dessus", "au dessus", "dessus"] },
          ],
        },
        {
          enonce: "Regarde la rangée de fruits.\nQuel fruit est entre la banane et le raisin ?",
          figure: rangee([
            { e: "🍎", nom: "pomme" },
            { e: "🍌", nom: "banane" },
            { e: "🍐", nom: "poire" },
            { e: "🍇", nom: "raisin" },
          ]),
          correction:
            "Je pose un doigt sur la banane, un autre sur le raisin.\nAu milieu de mes deux doigts, il y a la poire.\n⛔ Le piège : répondre « la pomme ». La pomme est à côté de la banane, mais pas entre la banane et le raisin.\nRéponse : la poire.",
          micros: ["cp_reperage_vocabulaire"],
          reponses: [{ attendu: ["poire", "la poire"] }],
        },
        {
          enonce: "Regarde la rangée d'animaux.\na) Quel animal est tout à gauche ?\nb) Quel animal est tout à droite ?",
          figure: rangee([
            { e: "🐶", nom: "chien" },
            { e: "🐱", nom: "chat" },
            { e: "🐰", nom: "lapin" },
            { e: "🐢", nom: "tortue" },
          ]),
          correction:
            "Je lis la rangée comme une ligne du livre : de gauche à droite.\na) Le premier, tout à gauche, c'est le chien.\nb) Le dernier, tout à droite, c'est la tortue.\n⛔ Le piège : inverser gauche et droite. Je pense à la main qui tient mon crayon, ou à mon cœur à gauche.\nRéponse : a) le chien ; b) la tortue.",
          micros: ["cp_reperage_gauche_droite"],
          reponses: [
            { question: "a)", attendu: ["chien", "le chien"] },
            { question: "b)", attendu: ["tortue", "la tortue"] },
          ],
        },
        {
          enonce: "À la récré, les enfants font la queue au toboggan.\nZoé est devant Max. Max est devant Lili.\nQui est le premier de la file ?",
          correction:
            "Je place les enfants l'un après l'autre.\nZoé est devant Max : Zoé, puis Max.\nMax est devant Lili : Max, puis Lili.\nLa file est : Zoé, Max, Lili. La première, c'est Zoé.\n⛔ Le piège : répondre Lili, la dernière nommée. Être devant, c'est passer avant.\nRéponse : Zoé.",
          micros: ["cp_reperage_vocabulaire"],
          reponses: [{ attendu: ["Zoé", "Zoe"] }],
        },
        {
          enonce: "Regarde l'étagère de la chambre.\na) Qu'y a-t-il en bas ?\nb) Qu'est-ce qui est au-dessus des livres ?",
          figure: etagere([[{ e: "🧸", nom: "ours" }], [{ e: "📚", nom: "livres" }], [{ e: "⚽", nom: "ballon" }]]),
          correction:
            "L'étagère a trois planches : en haut, au milieu, en bas.\na) Sur la planche du bas, il y a le ballon.\nb) Les livres sont au milieu. Juste au-dessus, en haut, il y a l'ours.\n⛔ Le piège du b) : répondre « le ballon ». Le ballon est en dessous des livres, pas au-dessus.\nRéponse : a) le ballon ; b) l'ours.",
          micros: ["cp_reperage_vocabulaire"],
          reponses: [
            { question: "a)", attendu: ["ballon", "le ballon"] },
            { question: "b)", attendu: ["ours", "l'ours", "nounours"] },
          ],
        },
        {
          enonce: "En classe, la trousse est sur le cahier.\nDonc le cahier est … la trousse.\nA) sur B) sous C) entre",
          correction:
            "La trousse est posée sur le cahier : la trousse en haut, le cahier en bas.\nVu depuis le cahier, la trousse est au-dessus. Le cahier est donc sous la trousse.\nRien n'a bougé : seule la phrase change.\n⛔ Le piège : répondre « sur », le mot de la première phrase.\nRéponse : B.",
          micros: ["cp_reperage_vocabulaire"],
          reponses: [{ attendu: ["B", "B) sous", "sous"] }],
        },
        {
          enonce: "Voici le plan de la classe. Le tableau est en haut.\na) Qui est assis entre Léo et Inès ?\nb) Qui est assis le plus près de la porte ?",
          figure: plan({
            col: 4,
            lig: 4,
            taille: 52,
            cases: [
              { c: 0, l: 3, couleur: GRIS_CLAIR },
              { c: 1, l: 3, couleur: GRIS_CLAIR },
              { c: 2, l: 3, couleur: GRIS_CLAIR },
              { c: 3, l: 3, couleur: GRIS_CLAIR },
              { c: 0, l: 2, couleur: BLEU_CLAIR, texte: "Ana" },
              { c: 1, l: 2, couleur: BLEU_CLAIR, texte: "Léo" },
              { c: 2, l: 2, couleur: BLEU_CLAIR, texte: "Tom" },
              { c: 3, l: 2, couleur: BLEU_CLAIR, texte: "Inès" },
              { c: 0, l: 1, couleur: BLEU_CLAIR, texte: "Sami" },
              { c: 1, l: 1, couleur: BLEU_CLAIR, texte: "Lou" },
              { c: 2, l: 1, couleur: BLEU_CLAIR, texte: "Zoé" },
              { c: 3, l: 1, couleur: BLEU_CLAIR, texte: "Max" },
              { c: 3, l: 0, texte: "🚪" },
            ],
            textes: [{ en: [2, 3.5], t: "tableau", taille: 16 }],
          }),
          correction:
            "Je lis le plan comme si j'étais au fond de la classe, face au tableau.\na) Sur la rangée du haut : Ana, Léo, Tom, Inès. Entre Léo et Inès, il y a Tom.\nb) La porte est en bas, à droite. Juste au-dessus de la porte, il y a Max.\n⛔ Le piège : lire le plan à l'envers. Le tableau est en haut, la porte en bas.\nRéponse : a) Tom ; b) Max.",
          micros: ["cp_reperage_quadrillage"],
          reponses: [
            { question: "a)", attendu: ["Tom"] },
            { question: "b)", attendu: ["Max"] },
          ],
        },
        {
          enonce: "Combien de cubes y a-t-il dans chaque construction ?",
          figure: tours([
            { nom: "a", colonnes: [3] },
            { nom: "b", colonnes: [2, 2, 1] },
          ]),
          correction:
            "Je compte les cubes pile par pile, de bas en haut.\na) Une seule pile de 3 cubes : 3.\nb) Trois piles : 2 cubes, 2 cubes, 1 cube. 2 + 2 + 1 = 5.\n⛔ Le piège du b) : compter les piles, et répondre 3. Je compte chaque cube.\nRéponse : a) 3 ; b) 5.",
          micros: ["cp_reperage_assemblage"],
          reponses: [
            { question: "a)", attendu: ["3", "trois"] },
            { question: "b)", attendu: ["5", "cinq"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux petites étapes. Je cherche un repère, puis je réponds.",
      rappel: [
        "Quand quelqu'un me fait face, sa droite est de mon côté gauche.",
        "Sur un quadrillage, je compte les cases sans compter la case de départ.",
        "Juste à droite : la case collée, du côté droit.",
      ],
      exercices: [
        {
          enonce: "Naïla est en face de toi. Elle lève sa main droite.\nDe ton côté, tu vois cette main à gauche ou à droite ?",
          correction:
            "Naïla me regarde : elle est tournée vers moi.\nJe me mets à sa place : sa main droite est en face de ma main gauche.\nDonc je vois sa main droite de mon côté gauche.\n⛔ Le piège : répondre « à droite », comme si Naïla me tournait le dos.\nRéponse : à gauche.",
          micros: ["cp_reperage_gauche_droite"],
          reponses: [{ attendu: ["gauche", "à gauche"] }],
        },
        {
          enonce: "Voici une rangée de véhicules.\na) Qu'y a-t-il juste à droite du bus ?\nb) Qu'y a-t-il juste à gauche du vélo ?",
          figure: rangee([
            { e: "🚗", nom: "voiture" },
            { e: "🚲", nom: "vélo" },
            { e: "🚌", nom: "bus" },
            { e: "🚂", nom: "train" },
            { e: "🛴", nom: "trottinette" },
          ]),
          correction:
            "Je pose le doigt sur l'objet nommé, puis je regarde la case collée.\na) Le bus est au milieu. Juste à droite du bus, il y a le train.\nb) Juste à gauche du vélo, il y a la voiture.\n⛔ Le piège : aller du mauvais côté, et répondre « le vélo » au a). Le vélo est à gauche du bus.\nRéponse : a) le train ; b) la voiture.",
          micros: ["cp_reperage_gauche_droite"],
          reponses: [
            { question: "a)", attendu: ["train", "le train"] },
            { question: "b)", attendu: ["voiture", "la voiture"] },
          ],
        },
        {
          enonce: "Le lapin va tout droit jusqu'à la carotte.\na) Combien de cases fait-il ?\nb) Il va vers la gauche ou vers la droite ?",
          figure: plan({
            col: 6,
            lig: 3,
            cases: [
              { c: 0, l: 1, texte: "🐰" },
              { c: 4, l: 1, texte: "🥕" },
            ],
          }),
          correction:
            "Le lapin est dans la case de départ. Je ne la compte pas.\na) J'avance d'une case à la fois : 1, 2, 3, 4. La carotte est sur la 4e case. Il fait 4 cases.\nb) La carotte est du côté droit du lapin. Il va vers la droite.\n⛔ Le piège : compter la case du lapin, et trouver 5.\nRéponse : a) 4 ; b) vers la droite.",
          micros: ["cp_reperage_deplacement"],
          reponses: [
            { question: "a)", attendu: ["4", "quatre"] },
            { question: "b)", attendu: ["droite", "vers la droite", "à droite"] },
          ],
        },
        {
          enonce: "Le trésor est sous une table.\nCette table est près de la fenêtre. Elle est aussi près du tableau.\nSous quelle table est le trésor ?",
          figure: plan({
            col: 5,
            lig: 4,
            taille: 46,
            cases: [
              { c: 0, l: 3, couleur: GRIS_CLAIR },
              { c: 1, l: 3, couleur: GRIS_CLAIR },
              { c: 2, l: 3, couleur: GRIS_CLAIR },
              { c: 3, l: 3, couleur: GRIS_CLAIR },
              { c: 4, l: 3, couleur: GRIS_CLAIR },
              { c: 0, l: 0, couleur: "#e0f2fe", texte: "🪟" },
              { c: 0, l: 1, couleur: "#e0f2fe", texte: "🪟" },
              { c: 0, l: 2, couleur: "#e0f2fe", texte: "🪟" },
              { c: 1, l: 0, couleur: ORANGE_CLAIR, texte: "A" },
              { c: 1, l: 2, couleur: ORANGE_CLAIR, texte: "B" },
              { c: 3, l: 2, couleur: ORANGE_CLAIR, texte: "C" },
              { c: 4, l: 0, texte: "🚪" },
            ],
            textes: [{ en: [2.5, 3.5], t: "tableau", taille: 16 }],
          }),
          correction:
            "Je suis les deux indices, l'un après l'autre.\nPrès de la fenêtre, à gauche : les tables A et B.\nPrès du tableau, en haut : les tables B et C.\nUne seule table est près des deux : la table B.\n⛔ Le piège : suivre un seul indice, et choisir A ou C.\nRéponse : B.",
          micros: ["cp_reperage_quadrillage"],
          reponses: [{ attendu: ["B", "la table B"] }],
        },
        {
          enonce: "Voici deux constructions.\na) Laquelle a le plus de cubes ? Écris A ou B.\nb) Combien de cubes a la construction B ?",
          figure: tours([
            { nom: "A", colonnes: [3, 1] },
            { nom: "B", colonnes: [2, 2, 1] },
          ]),
          correction:
            "Je compte les cubes de chaque construction.\nA : 3 + 1 = 4 cubes.\nB : 2 + 2 + 1 = 5 cubes.\na) 5 est plus que 4 : la construction B a le plus de cubes.\nb) B a 5 cubes.\n⛔ Le piège : choisir A parce qu'elle est plus haute. Je compte tous les cubes.\nRéponse : a) B ; b) 5.",
          micros: ["cp_reperage_assemblage"],
          reponses: [
            { question: "a)", attendu: ["B"] },
            { question: "b)", attendu: ["5", "cinq"] },
          ],
        },
        {
          enonce: "Le chemin du chat est dessiné. Que fait-il ? Écris la lettre.\nA) 3 cases vers la droite, puis 2 cases vers le haut\nB) 2 cases vers la droite, puis 3 cases vers le haut\nC) 3 cases vers le haut, puis 2 cases vers la droite",
          figure: plan({
            col: 5,
            lig: 4,
            cases: [
              { c: 0, l: 0, texte: "🐱" },
              { c: 3, l: 2, texte: "🧶" },
            ],
            chemins: [
              {
                pts: [
                  [0.5, 0.5],
                  [3.5, 0.5],
                  [3.5, 2.5],
                ],
              },
            ],
          }),
          correction:
            "Je suis le chemin orange depuis le chat.\nD'abord, il va vers la droite : 1, 2, 3 cases.\nEnsuite, il monte : 1, 2 cases vers le haut. Il arrive sur la pelote.\nC'est 3 cases vers la droite, puis 2 vers le haut.\n⛔ Le piège : choisir C, les bons nombres dans le mauvais ordre. Le chat commence par la droite.\nRéponse : A.",
          micros: ["cp_reperage_deplacement"],
          reponses: [{ attendu: ["A"] }],
        },
        {
          enonce: "Regarde l'étagère des jouets.\na) En haut, qu'y a-t-il à droite de l'ours ?\nb) Qu'y a-t-il juste sous l'ours ?",
          figure: etagere([
            [
              { e: "⚽", nom: "ballon" },
              { e: "🧸", nom: "ours" },
              { e: "🚗", nom: "voiture" },
            ],
            [
              { e: "📚", nom: "livres" },
              { e: "🎲", nom: "dé" },
              { e: "🥁", nom: "tambour" },
            ],
          ]),
          correction:
            "Je trouve d'abord l'ours : planche du haut, au milieu.\na) Juste à sa droite, sur la même planche, il y a la voiture.\nb) Juste en dessous de l'ours, sur la planche du bas, il y a le dé.\n⛔ Le piège du b) : répondre « le tambour ». Le tambour est en bas, mais à droite, pas sous l'ours.\nRéponse : a) la voiture ; b) le dé.",
          micros: ["cp_reperage_vocabulaire", "cp_reperage_gauche_droite"],
          reponses: [
            { question: "a)", attendu: ["voiture", "la voiture"] },
            { question: "b)", attendu: ["dé", "le dé", "de"] },
          ],
        },
        {
          enonce: "Pars de l'étoile.\nVa 2 cases vers le haut. Puis va 1 case vers la droite.\nSur quel fruit arrives-tu ?",
          figure: plan({
            col: 4,
            lig: 4,
            cases: [
              { c: 0, l: 0, texte: "⭐" },
              { c: 0, l: 2, texte: "🍇" },
              { c: 1, l: 2, texte: "🍎" },
              { c: 1, l: 1, texte: "🍌" },
              { c: 2, l: 0, texte: "🍐" },
            ],
          }),
          correction:
            "Je pars de l'étoile, sans compter sa case.\nJe monte : 1, 2. J'arrive sur la case du raisin.\nPuis 1 case vers la droite : j'arrive sur la pomme.\n⛔ Le piège : compter la case de l'étoile. On monte d'une seule case, et on arrive sur la banane.\nRéponse : la pomme.",
          micros: ["cp_reperage_deplacement"],
          reponses: [{ attendu: ["pomme", "la pomme"] }],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le défi. Je suis chaque indice, l'un après l'autre.",
      rappel: [
        "Plusieurs indices : la bonne réponse les respecte TOUS.",
        "Face à moi, la droite de l'autre est de mon côté gauche.",
        "Pour un chemin, je vérifie chaque case.",
      ],
      exercices: [
        {
          titre: "Le trésor de la classe",
          enonce: "Le trésor est sous une table.\nCette table est entre deux autres tables.\nElle est plus près de la fenêtre que de la porte.\nQuelle table est-ce ?",
          figure: plan({
            col: 6,
            lig: 2,
            taille: 46,
            cases: [
              { c: 0, l: 0, couleur: "#e0f2fe", texte: "🪟" },
              { c: 0, l: 1, couleur: "#e0f2fe", texte: "🪟" },
              { c: 1, l: 0, couleur: ORANGE_CLAIR, texte: "A" },
              { c: 2, l: 0, couleur: ORANGE_CLAIR, texte: "B" },
              { c: 3, l: 0, couleur: ORANGE_CLAIR, texte: "C" },
              { c: 4, l: 0, couleur: ORANGE_CLAIR, texte: "D" },
              { c: 5, l: 0, texte: "🚪" },
            ],
          }),
          correction:
            "Premier indice : entre deux tables.\nLa table A a une seule table à côté : elle est entre la fenêtre et B. La table D est entre C et la porte.\nIl reste B et C.\nDeuxième indice : plus près de la fenêtre.\nB est plus près de la fenêtre que C. C'est la table B.\n⛔ Le piège : s'arrêter au premier indice. B et C sont toutes deux entre deux tables.\nRéponse : B.",
          micros: ["cp_reperage_quadrillage", "cp_reperage_defi"],
          reponses: [{ attendu: ["B", "la table B"] }],
        },
        {
          titre: "La chanteuse sur scène",
          enonce: "Lina chante sur scène. Elle regarde le public.\nElle tient le micro dans sa main droite.\na) Pour le public, le micro est à gauche ou à droite ?\nb) Lina se retourne : elle tourne le dos au public. Et maintenant ?",
          correction:
            "a) Lina est face au public. Sa droite est du côté gauche du public.\nLe public voit le micro à gauche.\nb) Lina tourne le dos au public : elle regarde dans le même sens que lui.\nSa droite est alors aussi la droite du public. Le micro est à droite.\n⛔ Le piège : donner la même réponse deux fois. Tout change quand Lina se retourne.\nRéponse : a) à gauche ; b) à droite.",
          micros: ["cp_reperage_gauche_droite", "cp_reperage_defi"],
          reponses: [
            { question: "a)", attendu: ["gauche", "à gauche"] },
            { question: "b)", attendu: ["droite", "à droite"] },
          ],
        },
        {
          titre: "Le mur du maçon",
          enonce: "Un maçon veut construire ce modèle.\nIl a déjà 6 cubes.\na) Combien de cubes faut-il pour le modèle ?\nb) Combien de cubes lui manque-t-il ?",
          figure: tours([{ nom: "modèle", colonnes: [3, 3, 2] }]),
          correction:
            "a) Je compte pile par pile : 3 + 3 + 2 = 8 cubes.\nb) Il a 6 cubes. Il en faut 8.\nJe compte de 6 jusqu'à 8 : 7, 8. Il manque 2 cubes.\nJe vérifie : 6 + 2 = 8.\n⛔ Le piège : compter les 3 piles, et croire qu'il faut 3 cubes.\nRéponse : a) 8 ; b) 2.",
          micros: ["cp_reperage_assemblage", "cp_reperage_defi"],
          reponses: [
            { question: "a)", attendu: ["8", "huit"] },
            { question: "b)", attendu: ["2", "deux"] },
          ],
        },
        {
          titre: "La poule de la fermière",
          enonce: "La fermière veut faire rentrer la poule au poulailler.\nUn rocher bloque le passage.\nQuel chemin mène au poulailler sans toucher le rocher ?\nA) → → → →\nB) ↑ → → → → ↓\nC) → ↑ → → →",
          figure: plan({
            col: 5,
            lig: 3,
            cases: [
              { c: 0, l: 0, texte: "🐔" },
              { c: 2, l: 0, couleur: GRIS_CLAIR, texte: "🪨" },
              { c: 4, l: 0, texte: "🏠" },
            ],
          }),
          correction:
            "Je suis chaque chemin, case par case, avec le doigt.\nA : tout droit vers la droite. À la 2e flèche, la poule tombe sur le rocher. Non.\nB : la poule monte d'une case. Elle passe au-dessus du rocher. Puis elle redescend sur le poulailler. Oui.\nC : la poule passe bien au-dessus du rocher. Mais elle finit au-dessus du poulailler, pas dedans. Non.\n⛔ Le piège : choisir A, le chemin le plus court. Il passe par le rocher.\nRéponse : B.",
          micros: ["cp_reperage_deplacement", "cp_reperage_defi"],
          reponses: [{ attendu: ["B"] }],
        },
      ],
    },
  ],
};
