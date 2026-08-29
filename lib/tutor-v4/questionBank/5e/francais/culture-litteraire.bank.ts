// lib/tutor-v4/questionBank/5e/francais/culture-litteraire.bank.ts
//
// LES QUATRE ENTRÉES DE CULTURE LITTÉRAIRE EN 5e — écrit le 12/08/2026.
//
// ⚠️ RÉFÉRENCE NEUVE : BO n° 10 du 5 mars 2026. Applicable en 5e À LA RENTRÉE
// 2026 seulement. ⛔ Ne pas étendre à la 4e (2027) ni à la 3e (2028) : leurs
// entrées ne sont pas les mêmes.
//
// PERSPECTIVE ANNUELLE : « Éprouver, expérimenter : la découverte de soi,
// d'autrui et du monde », et sous elle quatre entrées que le BO nomme :
//   1. Devenir héroïne/héros : destins romanesques (récit, fiction)
//   2. Voyager en poésie : « Du monde entier au cœur du monde » (poésie)
//   3. Expérimenter et jouer au théâtre : la société sens dessus dessous
//   4. Imaginer, sentir, raisonner : des histoires pour plaire et instruire
//
// Le coach n'en nommait aucune : `culture_litteraire` ne portait que quatre
// gestes génériques — reconnaitre un genre, situer, mettre en réseau, garder
// une trace —, identiques de la 5e à la 3e.
//
// ⛔ ON N'INTERROGE JAMAIS UNE ŒUVRE PRÉCISE. Les œuvres intégrales sont
// choisies par le professeur ; le coach n'a rien fait lire et ne peut pas
// demander ce qu'il y avait au chapitre 4. Ce qui s'interroge, c'est ce qui se
// transporte d'une œuvre à l'autre : ce qui fait une figure héroïque et
// comment elle change d'époque en époque, ce qui fait voyager dans un vers,
// les ressorts du renversement comique, ce qu'un personnage de fable incarne.
// Les figures convoquées sont celles que tout élève a croisées — le renard, le
// loup, le valet —, jamais un titre.
//
// ⚠️ Les vers de la table POESIE sont écrits ici, pour ce fichier. Aucun texte
// d'auteur n'est reproduit.
//
// ⛔ QCM uniquement, quatre propositions.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function exp(definition: string, methode: string, exemple: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Exemple : ${exemple}

Conclusion : ${conclusion}`;
}

type Trait = { readonly trait: string; readonly rep: string };

/* =============================================================================
   1. DEVENIR HÉROÏNE, HÉROS
   ---------------------------------------------------------------------------
   Le BO fait tenir l'entrée sur une ligne de temps : « des récits
   mythologiques ou bibliques jusqu'aux superhéroïnes et superhéros modernes »,
   « de l'épopée au roman moderne où le héros perd en superbe et gagne en
   banalité ». On interroge donc la FIGURE et son évolution, jamais un récit.
   ========================================================================== */

const HEROS: readonly Trait[] = [
  { trait: "Il descend d'un dieu, il met dix ans à rentrer chez lui, et le récit est en vers.", rep: "un héros d'épopée" },
  { trait: "Elle cache un pouvoir sous un costume, et une ville entière compte sur elle.", rep: "un super-héros moderne" },
  { trait: "C'est le plus jeune de trois frères, personne ne mise sur lui, et une vieille femme l'aide en chemin.", rep: "un héros de conte" },
  { trait: "Il va à l'usine chaque matin, n'accomplit aucun exploit, et pourtant on suit sa vie entière.", rep: "un héros ordinaire du roman moderne" },
  { trait: "Il affronte un monstre devant une armée qui le regarde faire.", rep: "un héros d'épopée" },
  { trait: "Elle rate son examen, doute d'elle-même, et c'est cela qui nous la rend proche.", rep: "un héros ordinaire du roman moderne" },
  { trait: "Un objet reçu en chemin le sauve au dernier moment.", rep: "un héros de conte" },
  { trait: "Sa force lui vient d'un accident, et il apprend à la maitriser.", rep: "un super-héros moderne" },
  { trait: "Il fonde une cité et lui donne ses lois.", rep: "un héros d'épopée" },
  { trait: "Après trois épreuves, elle épouse celui qu'on lui avait refusé.", rep: "un héros de conte" },
  { trait: "Il porte un masque, et personne autour de lui ne connait son vrai nom.", rep: "un super-héros moderne" },
  { trait: "Son seul exploit aura été de tenir, sans que personne ne le remarque.", rep: "un héros ordinaire du roman moderne" },
  { trait: "Les dieux se disputent à son sujet et interviennent dans ses combats.", rep: "un héros d'épopée" },
  { trait: "Un animal qu'il avait épargné revient l'aider au moment le plus difficile.", rep: "un héros de conte" },
];

const TOUS_HEROS: readonly string[] = [...new Set(HEROS.map((h) => h.rep))];

/* =============================================================================
   2. VOYAGER EN POÉSIE
   ---------------------------------------------------------------------------
   « le dépaysement langagier » : ce n'est pas le sujet du poème qui fait
   voyager, c'est la langue. On interroge donc CE QUI, dans le vers, produit le
   voyage — les sonorités, l'image, le rythme, les noms de lieux.
   ⚠️ Vers écrits pour ce fichier.
   ========================================================================== */

const POESIE: readonly Trait[] = [
  { trait: "Le roulis des rails roule et déroule la nuit", rep: "les sonorités, qui imitent ce dont on parle" },
  { trait: "La mer est un champ labouré par le vent", rep: "une image, qui fait voir une chose à travers une autre" },
  { trait: "Bombay, Zanzibar, Valparaiso, Karikal", rep: "les noms de lieux, qui suffisent à déplacer le lecteur" },
  { trait: "Je pars, je pars, je pars — et je reste", rep: "le rythme, qui fait entendre le mouvement" },
  { trait: "Le sable siffle sous les semelles", rep: "les sonorités, qui imitent ce dont on parle" },
  { trait: "Mon île est un radeau amarré au ciel", rep: "une image, qui fait voir une chose à travers une autre" },
  { trait: "Un pas, deux pas, mille pas, et la crête", rep: "le rythme, qui fait entendre le mouvement" },
  { trait: "Tananarive, Mahajanga, Antsirabe", rep: "les noms de lieux, qui suffisent à déplacer le lecteur" },
  { trait: "Le vent verse et déverse un vertige de vagues", rep: "les sonorités, qui imitent ce dont on parle" },
  { trait: "La route est un fil que le jour dévide", rep: "une image, qui fait voir une chose à travers une autre" },
  { trait: "Partir. Rester. Partir.", rep: "le rythme, qui fait entendre le mouvement" },
  { trait: "Colombo, Djakarta, Papeete, Nouméa", rep: "les noms de lieux, qui suffisent à déplacer le lecteur" },
  { trait: "Chaque chose chuchote au creux du chemin", rep: "les sonorités, qui imitent ce dont on parle" },
  { trait: "La nuit tombe comme un rideau de pluie", rep: "une image, qui fait voir une chose à travers une autre" },
];

const TOUTES_POESIES: readonly string[] = [...new Set(POESIE.map((p) => p.rep))];

/* =============================================================================
   3. LE THÉÂTRE : LA SOCIÉTÉ SENS DESSUS DESSOUS
   ---------------------------------------------------------------------------
   « la dynamique du comique », « les relations entre dominants et dominés,
   lorsqu'elles sont incarnées sur scène – et renversées », « la scène en folie
   n'est jamais non-sens, mais miroir grossissant tendu aux spectateurs ».
   On interroge les RESSORTS, qui se retrouvent d'une pièce à l'autre.
   ========================================================================== */

const THEATRE: readonly Trait[] = [
  { trait: "Le valet donne les ordres, et le maitre obéit sans s'en apercevoir.", rep: "le renversement des rôles : celui d'en bas commande" },
  { trait: "Elle croit qu'il parle du chien ; il parle de son fiancé.", rep: "le quiproquo : chacun croit parler de la même chose" },
  { trait: "Il jure de se taire, et il le répète six fois de suite.", rep: "la répétition : le même geste revient et finit par faire rire" },
  { trait: "Le serviteur enfile l'habit du docteur, et on le prend au sérieux.", rep: "le déguisement : quelqu'un se fait passer pour un autre" },
  { trait: "« Vous êtes un sot. — Et vous, monsieur, un expert. »", rep: "le mot d'esprit : la réplique retourne l'attaque" },
  { trait: "La servante mène toute l'intrigue, et les maitres n'y comprennent rien.", rep: "le renversement des rôles : celui d'en bas commande" },
  { trait: "Il croit signer un contrat ; elle croit qu'il demande sa main.", rep: "le quiproquo : chacun croit parler de la même chose" },
  { trait: "À chaque entrée, il trébuche sur le même tapis.", rep: "la répétition : le même geste revient et finit par faire rire" },
  { trait: "Une jeune fille se fait passer pour son frère pour entrer au palais.", rep: "le déguisement : quelqu'un se fait passer pour un autre" },
  { trait: "Le paysan explique la politique aux nobles — et il a raison.", rep: "le renversement des rôles : celui d'en bas commande" },
  { trait: "« Je vous trouve bien pâle. — C'est l'effet de votre conversation. »", rep: "le mot d'esprit : la réplique retourne l'attaque" },
  { trait: "Deux personnages emploient le même mot en lui donnant deux sens.", rep: "le quiproquo : chacun croit parler de la même chose" },
  { trait: "Il annonce « pour la dernière fois » à chaque scène.", rep: "la répétition : le même geste revient et finit par faire rire" },
  { trait: "Le maitre s'habille en valet pour observer sa promise.", rep: "le déguisement : quelqu'un se fait passer pour un autre" },
];

const TOUS_RESSORTS: readonly string[] = [...new Set(THEATRE.map((t) => t.rep))];

/* =============================================================================
   4. DES HISTOIRES POUR PLAIRE ET INSTRUIRE
   ---------------------------------------------------------------------------
   « les personnages incarnent différentes facettes de l'être humain, interroge
   leur conduite et le fonctionnement social qu'ils dévoilent ». Ces figures
   sont celles de la fable et du conte : tout élève les a croisées, et aucune
   n'exige d'avoir lu un texte précis.
   ========================================================================== */

const FIGURES: readonly Trait[] = [
  { trait: "le renard", rep: "la ruse, qui obtient par les mots ce qu'elle n'aurait pas par la force" },
  { trait: "le lion", rep: "le pouvoir, qui n'a pas à justifier ses décisions" },
  { trait: "l'âne", rep: "celui qu'on charge et à qui l'on ne demande jamais son avis" },
  { trait: "la fourmi", rep: "la prévoyance, qui prépare — et qui ne partage pas" },
  { trait: "la cigale", rep: "l'insouciance, qui vit l'instant sans penser à demain" },
  { trait: "le loup", rep: "la force, qui invente ses raisons après coup" },
  { trait: "l'agneau", rep: "l'innocence, qui n'a aucun moyen de se défendre" },
  { trait: "le corbeau", rep: "la vanité, qu'un compliment suffit à acheter" },
  { trait: "le chêne", rep: "l'orgueil de ce qui refuse de plier" },
  { trait: "le roseau", rep: "la souplesse, qui plie et qui survit" },
  { trait: "la tortue", rep: "la persévérance, qui avance sans jamais s'arrêter" },
  { trait: "le lièvre", rep: "la vitesse, qui se croit dispensée de l'effort" },
  { trait: "le rat des villes", rep: "le confort, payé d'inquiétude" },
  { trait: "le rat des champs", rep: "la simplicité, payée de tranquillité" },
];

const TOUTES_FIGURES: readonly string[] = [...new Set(FIGURES.map((f) => f.rep))];

/* ⭐⭐ LE GABARIT INVERSE — AJOUTÉ LE 29/08/2026, ET IL RÉPARE UNE PANNE RÉELLE.
   Mesuré par `scripts/verifier-demarrage.ts` : cliquer « Voyager en poésie »
   servait une question sur LES HÉROS. C'est le cas que ce script décrit comme le
   plus traitre — « une ligne qui en ouvre une autre n'est pas une ligne qui
   marche » — parce que rien ne le signale à l'élève.

   ⛔ LA CAUSE : `5e_cult_voyage_poesie` était la seule des quatre micros à
   n'avoir QU'UN item. Les trois autres ont un gabarit ET un item figé ; elle
   n'avait que son gabarit, et `buildQuestionPair`, qui propose deux énoncés au
   choix, ne trouvait pas de quoi faire la paire — il repliait donc sur une micro
   voisine de la même notion.

   ⭐ Et `scripts/verifier-renouvellement.ts` signalait la même chose autrement :
   les QUATRE micros n'avaient qu'un seul gabarit. On ne comble pas cela avec des
   questions figées — elles ne se renouvellent jamais. On écrit un SECOND
   GABARIT, et l'on prend la question par l'autre bout : au lieu de donner le cas
   et de demander la catégorie, on donne la catégorie et l'on demande le cas.

   ⚠️ Les quatre propositions sortent toutes de la MÊME table de traits : elles
   ont donc des longueurs comparables par construction, et la bonne réponse n'est
   pas systématiquement la plus longue. */
function inverse(table: readonly Trait[]) {
  const rep = randomChoice([...new Set(table.map((t) => t.rep))]);
  const bon = randomChoice(table.filter((t) => t.rep === rep));
  const faux = shuffle(table.filter((t) => t.rep !== rep))
    .slice(0, 3)
    .map((t) => t.trait);
  return { rep, correct: bon.trait, faux };
}

export const cultureLitteraire5eBank: TutorBankItemV4[] = [
  /* ── 1. DEVENIR HÉROÏNE, HÉROS ──────────────────────────────────────────── */
  {
    kind: "template",
    id: "5e_cult_heros_tpl_1",
    niveau: "5e",
    matiere: "francais",
    notionId: "culture_litteraire",
    microId: "5e_cult_heros",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde d'où lui vient sa force, et qui le regarde agir.",
    tags: ["5e", "culture-litteraire", "heros", "template"],
    generate: () => {
      const h = randomChoice(HEROS);
      return {
        // Le trait commence par une majuscule : on le met en citation sur sa
        // propre ligne plutôt qu'après deux-points.
        text: `Dans un récit, on lit d'un personnage :\n« ${h.trait} »\n\nQuelle sorte de figure héroïque est-ce ?`,
        format: "qcm" as const,
        choices: makeChoices(h.rep, TOUS_HEROS),
        expected: [h.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La figure héroïque traverse toute la littérature, et elle change avec les époques. Dans l'épopée, le héros dépasse l'humanité moyenne et fonde les valeurs d'une communauté. Le conte lui donne un aidant et des épreuves. Le super-héros moderne hérite de l'épopée, avec un masque. Et le roman moderne fait un héros de celui à qui rien d'extraordinaire n'arrive.",
          "Demande-toi d'où vient sa force — des dieux, d'un objet magique, d'un accident, ou de rien du tout — et devant qui il agit.",
          `${h.trait} C'est ${h.rep}.`,
          `C'est ${h.rep}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "5e_cult_heros_fixed_1",
    niveau: "5e",
    matiere: "francais",
    notionId: "culture_litteraire",
    microId: "5e_cult_heros",
    difficulty: 3,
    theme: "neutral",
    text: "De l'épopée au roman moderne, la figure du héros s'est transformée.\n\nQu'est-ce qui a changé ?",
    format: "qcm",
    choices: [
      "il perd en grandeur ce qu'il gagne en ressemblance avec nous",
      "il devient de plus en plus fort à mesure que les siècles passent",
      "il cesse d'exister : le roman moderne n'a plus de personnage principal",
      "il ne change pas : un héros est un héros à toutes les époques",
    ],
    expected: ["il perd en grandeur ce qu'il gagne en ressemblance avec nous"],
    comparator: "mcq_exact",
    hint: "Demande-toi ce qui te rend un personnage proche.",
    explanation: exp(
      "Le héros d'épopée surclasse l'humanité moyenne : il descend des dieux, il accomplit des exploits, il fonde une civilisation. Le héros du roman moderne, lui, doute, échoue, et mène une vie que nous reconnaissons.",
      "Pour situer une figure héroïque, demande-toi si elle est au-dessus de nous, ou à côté de nous.",
      "Un guerrier que les dieux protègent nous impressionne ; un élève qui rate son examen nous ressemble. Le second n'est pas moins un héros de récit — il l'est autrement, et ce déplacement est ce que le programme demande de percevoir.",
      "Il perd en grandeur ce qu'il gagne en ressemblance avec nous.",
    ),
    tags: ["5e", "culture-litteraire", "heros", "methode", "qcm"],
  },

  /* ── 2. VOYAGER EN POÉSIE ───────────────────────────────────────────────── */
  {
    kind: "template",
    id: "5e_cult_voyage_poesie_tpl_1",
    niveau: "5e",
    matiere: "francais",
    notionId: "culture_litteraire",
    microId: "5e_cult_voyage_poesie",
    difficulty: 3,
    theme: "neutral",
    hint: "Ce n'est pas le sujet du vers qui fait voyager, c'est sa langue.",
    tags: ["5e", "culture-litteraire", "poesie", "voyage", "template"],
    generate: () => {
      const p = randomChoice(POESIE);
      return {
        text: `« ${p.trait} »\n\nQu'est-ce qui fait voyager dans ce vers ?`,
        format: "qcm" as const,
        choices: makeChoices(p.rep, TOUTES_POESIES),
        expected: [p.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "En poésie, le voyage ne tient pas au pays dont on parle : il tient à la langue. Les sonorités imitent, l'image fait voir, le rythme fait avancer, et les noms de lieux déplacent à eux seuls. C'est ce que le programme appelle le dépaysement langagier.",
          "Lis le vers à voix basse. Ce que tu entends d'abord — un son qui revient, une comparaison, une cadence, une liste de noms — est ce qui te déplace.",
          `« ${p.trait} » : ce sont ${p.rep}.`,
          `Ce sont ${p.rep}.`,
        ),
      };
    },
  },

  /* ── 3. LE THÉÂTRE, LA SOCIÉTÉ SENS DESSUS DESSOUS ──────────────────────── */
  {
    kind: "template",
    id: "5e_cult_theatre_tpl_1",
    niveau: "5e",
    matiere: "francais",
    notionId: "culture_litteraire",
    microId: "5e_cult_theatre",
    difficulty: 3,
    theme: "neutral",
    hint: "Le rire au théâtre a des mécaniques, et elles reviennent de pièce en pièce.",
    tags: ["5e", "culture-litteraire", "theatre", "comique", "template"],
    generate: () => {
      const t = randomChoice(THEATRE);
      return {
        text: `Sur scène :\n« ${t.trait} »\n\nQuel ressort comique est à l'œuvre ?`,
        format: "qcm" as const,
        choices: makeChoices(t.rep, TOUS_RESSORTS),
        expected: [t.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le théâtre comique secoue l'ordre établi le temps d'une représentation : le valet commande, le paysan a raison, la servante mène l'intrigue. Ses ressorts reviennent d'une pièce à l'autre — renversement, quiproquo, répétition, déguisement, mot d'esprit.",
          "Demande-toi ce qui produit le rire : une place échangée, un malentendu, un retour, un habit, ou une réplique.",
          `${t.trait} Le ressort est ${t.rep}.`,
          `C'est ${t.rep}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "5e_cult_theatre_fixed_1",
    niveau: "5e",
    matiere: "francais",
    notionId: "culture_litteraire",
    microId: "5e_cult_theatre",
    difficulty: 3,
    theme: "neutral",
    text: "Dans une comédie, un valet se moque de son maitre et prend sa place le temps d'un acte.\n\nÀ quoi sert ce renversement ?",
    format: "qcm",
    choices: [
      "à tendre au public un miroir grossissant de sa propre société",
      "à faire rire, et rien de plus : une comédie ne dit rien du monde",
      "à montrer que les valets sont plus intelligents que les maitres",
      "à respecter une règle d'écriture obligatoire au théâtre",
    ],
    expected: ["à tendre au public un miroir grossissant de sa propre société"],
    comparator: "mcq_exact",
    hint: "Le programme dit : « la scène en folie n'est jamais non-sens ».",
    explanation: exp(
      "Le théâtre renverse pour faire voir. En mettant celui d'en bas à la place de celui d'en haut, la scène rend visibles des rapports de force qu'on ne remarquait plus.",
      "Devant une scène qui met tout à l'envers, demande-toi ce qu'elle rend visible, et à qui.",
      "Si le renversement ne servait qu'à rire, il pourrait durer trois secondes. S'il tient une pièce entière, c'est qu'il montre quelque chose — et ce quelque chose concerne les spectateurs.",
      "Il sert à tendre au public un miroir grossissant de sa propre société.",
    ),
    tags: ["5e", "culture-litteraire", "theatre", "methode", "qcm"],
  },

  /* ── 4. DES HISTOIRES POUR PLAIRE ET INSTRUIRE ──────────────────────────── */
  {
    kind: "template",
    id: "5e_cult_plaire_instruire_tpl_1",
    niveau: "5e",
    matiere: "francais",
    notionId: "culture_litteraire",
    microId: "5e_cult_plaire_instruire",
    difficulty: 3,
    theme: "neutral",
    hint: "Ces personnages ne parlent pas des animaux : ils parlent de nous.",
    tags: ["5e", "culture-litteraire", "fable", "apologue", "template"],
    generate: () => {
      const f = randomChoice(FIGURES);
      return {
        text: `Dans les fables, ${f.trait} revient sans cesse.\n\nQuelle facette de l'être humain incarne-t-il ?`,
        format: "qcm" as const,
        choices: makeChoices(f.rep, TOUTES_FIGURES),
        expected: [f.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le conte et la fable allient les charmes du récit à la réflexion morale : on lit d'abord pour le plaisir, et la leçon vient par-dessus le marché. Leurs personnages ne sont pas des animaux : ce sont des facettes de l'être humain, mises à distance pour qu'on ose les regarder.",
          "Demande-toi ce que le personnage fait toujours, dans toutes les histoires où il apparait. C'est cela qu'il incarne.",
          `${f.trait.charAt(0).toUpperCase()}${f.trait.slice(1)} incarne ${f.rep}.`,
          `Il incarne ${f.rep}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "5e_cult_plaire_instruire_fixed_1",
    niveau: "5e",
    matiere: "francais",
    notionId: "culture_litteraire",
    microId: "5e_cult_plaire_instruire",
    difficulty: 2,
    theme: "neutral",
    text: "Pourquoi les fables mettent-elles en scène des animaux plutôt que des personnes ?",
    format: "qcm",
    choices: [
      "parce qu'on accepte d'un animal une leçon qu'on refuserait ailleurs",
      "parce que les animaux sont bien plus faciles à dessiner",
      "parce que les fables s'adressent uniquement aux jeunes enfants",
      "parce qu'il était interdit d'écrire sur les personnes",
    ],
    expected: ["parce qu'on accepte d'un animal une leçon qu'on refuserait ailleurs"],
    comparator: "mcq_exact",
    hint: "Pense à ce que tu ressens quand quelqu'un te fait la morale directement.",
    explanation: exp(
      "La fable met à distance pour mieux atteindre : en prêtant nos défauts à un renard ou à un corbeau, elle nous permet de les reconnaitre sans nous sentir visés.",
      "Devant une fable, demande-toi : de qui parle-t-elle vraiment ? La réponse n'est jamais l'animal.",
      "Un texte qui dirait « tu es vaniteux » se ferait refuser. Un corbeau qui lâche son fromage pour un compliment fait rire — puis réfléchir, ce qui est exactement le but.",
      "Parce qu'on accepte d'un animal une leçon qu'on refuserait d'un semblable.",
    ),
    tags: ["5e", "culture-litteraire", "fable", "methode", "qcm"],
  },

  /* ══ SECONDS GABARITS (29/08/2026) — voir la note sur `inverse` ══════════ */
  {
    kind: "template",
    id: "5e_cult_heros_tpl_2",
    niveau: "5e",
    matiere: "francais",
    notionId: "culture_litteraire",
    microId: "5e_cult_heros",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque figure a ses marques : l'ascendance, l'aide reçue, le masque, ou l'absence d'exploit.",
    tags: ["5e", "culture-litteraire", "heros", "inverse", "template"],
    generate: () => {
      const { rep, correct, faux } = inverse(HEROS);
      return {
        text: `Lequel de ces traits est celui ${rep} ?`,
        format: "qcm" as const,
        choices: makeChoices(correct, faux),
        expected: [correct],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une figure héroïque se reconnait à un seul trait : d'où lui vient sa force, et devant qui il agit.",
          "Prends chaque proposition et demande-toi d'où vient la force du personnage.",
          `${correct}`,
          `C'est ${rep}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "5e_cult_voyage_poesie_tpl_2",
    niveau: "5e",
    matiere: "francais",
    notionId: "culture_litteraire",
    microId: "5e_cult_voyage_poesie",
    difficulty: 3,
    theme: "neutral",
    hint: "Lis les quatre à voix basse : l'un d'eux emploie ce procédé, les autres non.",
    tags: ["5e", "culture-litteraire", "poesie", "voyage", "inverse", "template"],
    generate: () => {
      const { rep, correct, faux } = inverse(POESIE);
      return {
        text: `Dans lequel de ces vers le voyage vient-il ${rep} ?`,
        format: "qcm" as const,
        choices: makeChoices(correct, faux),
        expected: [correct],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le voyage d'un poème tient à sa langue, pas à son sujet : les sonorités imitent, l'image fait voir, le rythme fait avancer, et les noms de lieux déplacent seuls.",
          "Dis chaque vers tout bas. Le procédé cherché s'entend avant de se raisonner.",
          `${correct}`,
          `C'est ${rep}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "5e_cult_theatre_tpl_2",
    niveau: "5e",
    matiere: "francais",
    notionId: "culture_litteraire",
    microId: "5e_cult_theatre",
    difficulty: 3,
    theme: "neutral",
    hint: "Les ressorts du comique se retrouvent d'une pièce à l'autre : cherche celui qu'on te nomme.",
    tags: ["5e", "culture-litteraire", "theatre", "inverse", "template"],
    generate: () => {
      const { rep, correct, faux } = inverse(THEATRE);
      return {
        text: `Dans laquelle de ces scènes reconnait-on ${rep} ?`,
        format: "qcm" as const,
        choices: makeChoices(correct, faux),
        expected: [correct],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La comédie renverse la société avec quelques ressorts qui reviennent toujours : le renversement des rôles, le quiproquo, la répétition, le déguisement, le mot d'esprit.",
          "Demande-toi qui commande dans la scène, et qui sait quoi.",
          `${correct}`,
          `C'est ${rep}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "5e_cult_plaire_instruire_tpl_2",
    niveau: "5e",
    matiere: "francais",
    notionId: "culture_litteraire",
    microId: "5e_cult_plaire_instruire",
    difficulty: 3,
    theme: "neutral",
    hint: "Un animal de fable n'est pas un animal : c'est une facette de l'être humain.",
    tags: ["5e", "culture-litteraire", "fable", "figures", "inverse", "template"],
    generate: () => {
      const { rep, correct, faux } = inverse(FIGURES);
      return {
        text: `Quelle figure de fable incarne ${rep} ?`,
        format: "qcm" as const,
        choices: makeChoices(correct, faux),
        expected: [correct],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Les personnages de fable incarnent chacun une facette de l'être humain, et ils ne valent que les uns contre les autres.",
          "Ne cherche pas l'animal : cherche la personne qu'il représente.",
          `${correct}`,
          `C'est ${rep}.`,
        ),
      };
    },
  },
];
