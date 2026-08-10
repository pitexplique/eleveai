// lib/tutor-v4/questionBank/cp/francais/conscience-phonologique.bank.ts
//
// La conscience phonologique du CP, écrite à la main.
//
// CE QU'ELLE REMPLACE : dans `buildCycle2FrancaisBank`, les SIX
// micro-compétences de cette notion recevaient les deux mêmes questions —
// compter les syllabes, et « est-ce que chat et rat riment ? ». « Identifier un
// son dans un mot » ne demandait jamais d'identifier un son. Et le tableau des
// rimes affirmait que « maison » et « garçon » ne riment pas : ils finissent
// tous les deux par le son [ɔ̃].
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours préparatoire) :
//   — la conscience phonologique construite en maternelle est « consolidée »
//     au CP et sert de base aux correspondances graphophonémiques ;
//   — « L'assemblage de ces phonèmes constitue des mots, des phrases,
//     porteurs de sens. »
//   ⛔ On travaille sur ce qu'on ENTEND. Pas de lettre, pas d'orthographe :
//     ça, c'est la notion `grapheme_phoneme` et `orthographe_lexicale`.
//
// LE PIÈGE DE LA NOTION : la syllabe qu'on entend n'est pas ce qu'on voit.
// « chat » s'écrit avec quatre lettres et s'entend en une seule syllabe ;
// « ou », « an » et « ch » sont deux lettres pour un seul son. Un enfant qui
// compte les lettres au lieu d'écouter trouve toujours trop.
//
// ⚠️ AUCUN MOT À « E » MUET FINAL dans les listes de syllabes. « porte » se
// dit en une syllabe à Paris et souvent en deux à La Réunion : compter ces
// mots-là punirait un enfant d'ici pour son accent. On ne garde que des mots
// dont le découpage est le même partout.
//
// ⚠️ Les mots de l'île sont dans les listes au même titre que les autres : un
// CP de Saint-Pierre compte les syllabes de « mar-gouil-lat » aussi bien que
// celles de « ca-na-pé ».

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

// Découpage oral, valable partout : aucun « e » muet final.
const MOTS = [
  { mot: "chat", coupe: "chat", syl: 1, lettres: 4 },
  { mot: "riz", coupe: "riz", syl: 1, lettres: 3 },
  { mot: "pain", coupe: "pain", syl: 1, lettres: 4 },
  { mot: "loup", coupe: "loup", syl: 1, lettres: 4 },
  { mot: "chou", coupe: "chou", syl: 1, lettres: 4 },
  { mot: "nid", coupe: "nid", syl: 1, lettres: 3 },
  { mot: "chien", coupe: "chien", syl: 1, lettres: 5 },
  { mot: "banc", coupe: "banc", syl: 1, lettres: 4 },

  { mot: "lagon", coupe: "la-gon", syl: 2, lettres: 5 },
  { mot: "piton", coupe: "pi-ton", syl: 2, lettres: 5 },
  { mot: "letchi", coupe: "let-chi", syl: 2, lettres: 6 },
  { mot: "cari", coupe: "ca-ri", syl: 2, lettres: 4 },
  { mot: "boucan", coupe: "bou-can", syl: 2, lettres: 6 },
  { mot: "requin", coupe: "re-quin", syl: 2, lettres: 6 },
  { mot: "bateau", coupe: "ba-teau", syl: 2, lettres: 6 },
  { mot: "soleil", coupe: "so-leil", syl: 2, lettres: 6 },
  { mot: "lapin", coupe: "la-pin", syl: 2, lettres: 5 },
  { mot: "mouton", coupe: "mou-ton", syl: 2, lettres: 6 },
  { mot: "jardin", coupe: "jar-din", syl: 2, lettres: 6 },
  { mot: "tapis", coupe: "ta-pis", syl: 2, lettres: 5 },
  { mot: "souris", coupe: "sou-ris", syl: 2, lettres: 6 },
  { mot: "vélo", coupe: "vé-lo", syl: 2, lettres: 4 },
  { mot: "marché", coupe: "mar-ché", syl: 2, lettres: 6 },

  { mot: "tamarin", coupe: "ta-ma-rin", syl: 3, lettres: 7 },
  { mot: "margouillat", coupe: "mar-gouil-lat", syl: 3, lettres: 11 },
  { mot: "samoussa", coupe: "sa-mous-sa", syl: 3, lettres: 8 },
  { mot: "papillon", coupe: "pa-pil-lon", syl: 3, lettres: 8 },
  { mot: "canapé", coupe: "ca-na-pé", syl: 3, lettres: 6 },
  { mot: "domino", coupe: "do-mi-no", syl: 3, lettres: 6 },
  { mot: "éléphant", coupe: "é-lé-phant", syl: 3, lettres: 8 },
  { mot: "chocolat", coupe: "cho-co-lat", syl: 3, lettres: 8 },
  { mot: "parapluie", coupe: "pa-ra-pluie", syl: 3, lettres: 9 },
  { mot: "animal", coupe: "a-ni-mal", syl: 3, lettres: 6 },
  { mot: "hôpital", coupe: "hô-pi-tal", syl: 3, lettres: 7 },
] as const;

// Paires vérifiées à l'oreille, pas à l'œil : c'est le SON de la fin qui compte.
const PAIRES_RIMENT = [
  { a: "chat", b: "rat", son: "[a]" },
  { a: "lapin", b: "sapin", son: "[ɛ̃]" },
  { a: "main", b: "pain", son: "[ɛ̃]" },
  { a: "requin", b: "tamarin", son: "[ɛ̃]" },
  { a: "bateau", b: "gâteau", son: "[o]" },
  { a: "vélo", b: "domino", son: "[o]" },
  { a: "souris", b: "tapis", son: "[i]" },
  { a: "cari", b: "letchi", son: "[i]" },
  { a: "chou", b: "genou", son: "[u]" },
  { a: "mouton", b: "piton", son: "[ɔ̃]" },
  { a: "lagon", b: "wagon", son: "[ɔ̃]" },
  { a: "maison", b: "garçon", son: "[ɔ̃]" },
  { a: "soleil", b: "oreille", son: "[ɛj]" },
] as const;

const PAIRES_NE_RIMENT_PAS = [
  { a: "chat", b: "chien", fa: "[a]", fb: "[jɛ̃]" },
  { a: "lagon", b: "lapin", fa: "[ɔ̃]", fb: "[ɛ̃]" },
  { a: "souris", b: "mouton", fa: "[i]", fb: "[ɔ̃]" },
  { a: "bateau", b: "banc", fa: "[o]", fb: "[ɑ̃]" },
  { a: "cari", b: "canard", fa: "[i]", fb: "[aʁ]" },
  { a: "piton", b: "pilote", fa: "[ɔ̃]", fb: "[ɔt]" },
  { a: "letchi", b: "lagon", fa: "[i]", fb: "[ɔ̃]" },
  { a: "chou", b: "chat", fa: "[u]", fb: "[a]" },
] as const;

// Un seul exemplaire du son dans le mot : sinon la position n'a pas de réponse.
const POSITIONS = [
  { mot: "lagon", son: "[l]", position: "au début" },
  { mot: "margouillat", son: "[m]", position: "au début" },
  { mot: "tamarin", son: "[t]", position: "au début" },
  { mot: "requin", son: "[ʁ] (r)", position: "au début" },
  { mot: "cari", son: "[ʁ] (r)", position: "au milieu" },
  { mot: "bateau", son: "[t]", position: "au milieu" },
  { mot: "souris", son: "[ʁ] (r)", position: "au milieu" },
  { mot: "domino", son: "[m]", position: "au milieu" },
  { mot: "letchi", son: "[i]", position: "à la fin" },
  { mot: "chocolat", son: "[a]", position: "à la fin" },
  { mot: "vélo", son: "[o]", position: "à la fin" },
  { mot: "chat", son: "[a]", position: "à la fin" },
  { mot: "tapis", son: "[i]", position: "à la fin" },
  { mot: "tapis", son: "[t]", position: "au début" },
  { mot: "mouton", son: "[m]", position: "au début" },
  { mot: "piton", son: "[p]", position: "au début" },
  { mot: "chocolat", son: "[ʃ] (ch)", position: "au début" },
  { mot: "lapin", son: "[l]", position: "au début" },
  { mot: "lagon", son: "[g]", position: "au milieu" },
  { mot: "tapis", son: "[p]", position: "au milieu" },
  { mot: "mouton", son: "[t]", position: "au milieu" },
  { mot: "requin", son: "[k] (qu)", position: "au milieu" },
  { mot: "canapé", son: "[n]", position: "au milieu" },
  { mot: "papillon", son: "[j] (ill)", position: "au milieu" },
  { mot: "lagon", son: "[ɔ̃] (on)", position: "à la fin" },
  { mot: "mouton", son: "[ɔ̃] (on)", position: "à la fin" },
  { mot: "requin", son: "[ɛ̃] (in)", position: "à la fin" },
  { mot: "tamarin", son: "[ɛ̃] (in)", position: "à la fin" },
  { mot: "cari", son: "[i]", position: "à la fin" },
  { mot: "souris", son: "[i]", position: "à la fin" },
] as const;

const SONS_PRESENTS = [
  { son: "[u] (ou)", avec: ["chou", "boucan", "loup", "mouton", "souris"], sans: ["chat", "lagon", "vélo", "tapis", "piton"] },
  { son: "[ɔ̃] (on)", avec: ["lagon", "piton", "mouton", "papillon", "maison"], sans: ["chat", "letchi", "tapis", "cari", "vélo"] },
  { son: "[ɛ̃] (in)", avec: ["lapin", "requin", "tamarin", "jardin", "pain"], sans: ["chocolat", "vélo", "chou", "bateau", "souris"] },
  { son: "[ʃ] (ch)", avec: ["chat", "chou", "chocolat", "letchi", "chien"], sans: ["lagon", "tapis", "vélo", "requin", "domino"] },
  { son: "[a]", avec: ["chat", "lagon", "chocolat", "tamarin", "canapé"], sans: ["letchi", "vélo", "souris", "chou", "piton"] },
  { son: "[i]", avec: ["letchi", "cari", "tapis", "souris", "domino"], sans: ["chat", "lagon", "chou", "banc", "bateau"] },
  { son: "[m]", avec: ["margouillat", "domino", "tamarin", "mouton", "marché"], sans: ["chat", "lagon", "riz", "tapis", "chou"] },
  { son: "[ʁ] (r)", avec: ["cari", "souris", "tamarin", "requin", "riz"], sans: ["chat", "chou", "lagon", "mouton", "vélo"] },
  { son: "[l]", avec: ["lagon", "letchi", "lapin", "chocolat", "soleil"], sans: ["chat", "souris", "requin", "mouton", "tapis"] },
  { son: "[t]", avec: ["tapis", "tamarin", "bateau", "piton", "mouton"], sans: ["lagon", "chou", "souris", "riz", "vélo"] },
  { son: "[p]", avec: ["papillon", "piton", "lapin", "tapis", "parapluie"], sans: ["lagon", "chat", "souris", "mouton", "vélo"] },
] as const;

export const consciencePhonologiqueBank: TutorBankItemV4[] = [
  /* =========================================================
     CP_PHONO_SYLLABE_COMPTER — LE piège : on compte ce qu'on
     entend, pas ce qu'on voit.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_phono_syllabe_compter_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "conscience_phonologique",
    microId: "cp_phono_syllabe_compter",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de syllabes entends-tu dans le mot « chat » ?",
    format: "qcm",
    choices: ["1", "2", "3", "4"],
    expected: ["1"],
    comparator: "mcq_exact",
    hint: "Frappe dans tes mains en disant le mot. Une seule fois ?",
    explanation: exp(
      "Une syllabe, c'est un morceau de mot qu'on dit d'un seul souffle.",
      "Frappe dans tes mains à chaque morceau que tu entends.",
      "« chat » se dit d'un coup : une seule frappe. Il a quatre LETTRES, mais on ne compte pas les lettres — on écoute.",
      "« chat » a 1 syllabe.",
    ),
    tags: ["cp", "phonologie", "syllabe", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_phono_syllabe_compter_fixed_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "conscience_phonologique",
    microId: "cp_phono_syllabe_compter",
    difficulty: 3,
    theme: "neutral",
    text: "Léo dit : « margouillat a onze syllabes, parce qu'il a onze lettres. » A-t-il raison ?",
    format: "qcm",
    choices: [
      "Non : on compte ce qu'on entend, et on entend 3 syllabes",
      "Oui : une lettre, une syllabe",
      "Non : il a 11 syllabes mais 3 lettres",
      "On ne peut pas savoir",
    ],
    expected: ["Non : on compte ce qu'on entend, et on entend 3 syllabes"],
    comparator: "mcq_exact",
    hint: "Dis le mot à voix haute et frappe dans tes mains.",
    explanation: exp(
      "Les lettres, ça se voit. Les syllabes, ça s'entend.",
      "Ferme les yeux et frappe dans tes mains en disant le mot. Les yeux fermés, on ne peut plus compter les lettres.",
      "mar — gouil — lat : trois frappes. Onze lettres, mais trois syllabes seulement, parce que « ou », « ill » et « at » ne font qu'un son chacun.",
      "Léo se trompe : « margouillat » a 3 syllabes.",
    ),
    tags: ["cp", "phonologie", "syllabe", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_phono_syllabe_compter_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "conscience_phonologique",
    microId: "cp_phono_syllabe_compter",
    difficulty: 1,
    theme: "neutral",
    hint: "Frappe dans tes mains à chaque morceau du mot.",
    tags: ["cp", "phonologie", "syllabe", "template"],
    generate: () => {
      const item = randomChoice(MOTS);
      return {
        text: `Combien de syllabes entends-tu dans le mot « ${item.mot} » ?`,
        format: "qcm" as const,
        choices: ["1", "2", "3", "4"],
        expected: [String(item.syl)],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une syllabe, c'est un morceau de mot qu'on dit d'un seul souffle.",
          "Frappe dans tes mains à chaque morceau. Ta main compte mieux que tes yeux.",
          `${item.coupe} → ${item.syl} frappe${item.syl > 1 ? "s" : ""}. Attention : le mot a ${item.lettres} lettres, et ce n'est pas la même chose.`,
          `« ${item.mot} » a ${item.syl} syllabe${item.syl > 1 ? "s" : ""}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_phono_syllabe_compter_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "conscience_phonologique",
    microId: "cp_phono_syllabe_compter",
    difficulty: 2,
    theme: "neutral",
    hint: "Frappe les deux mots dans tes mains, l'un après l'autre.",
    tags: ["cp", "phonologie", "syllabe", "template"],
    generate: () => {
      const court = randomChoice(MOTS.filter((m) => m.syl === 1));
      const long = randomChoice(MOTS.filter((m) => m.syl === 3));
      const paire = shuffle([court, long]);
      return {
        text: `Quel mot a le PLUS de syllabes : « ${paire[0].mot} » ou « ${paire[1].mot} » ?`,
        format: "qcm" as const,
        choices: makeChoices(long.mot, [court.mot, "les deux pareil"]),
        expected: [long.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Pour comparer deux mots, on frappe chacun dans ses mains.",
          "On compte les frappes de l'un, puis celles de l'autre.",
          `${court.coupe} → ${court.syl} frappe. ${long.coupe} → ${long.syl} frappes.`,
          `« ${long.mot} » a le plus de syllabes.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_PHONO_SYLLABE_DECOUPER — dire OÙ ça se coupe
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_phono_syllabe_decouper_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "conscience_phonologique",
    microId: "cp_phono_syllabe_decouper",
    difficulty: 2,
    theme: "neutral",
    text: "Quel découpage en syllabes est le bon pour « papillon » ?",
    format: "qcm",
    choices: ["pa-pil-lon", "pap-il-lon", "p-api-llon", "papi-llon"],
    expected: ["pa-pil-lon"],
    comparator: "mcq_exact",
    hint: "Chaque morceau doit pouvoir se dire tout seul.",
    explanation: exp(
      "Découper un mot, c'est le séparer aux endroits où la voix s'arrête.",
      "On dit le mot lentement, morceau par morceau, et chaque morceau doit se dire d'un souffle.",
      "pa — pil — lon : chacun se dit tout seul. « pap » et « il » ne s'entendent pas quand on dit le mot.",
      "Le bon découpage est pa-pil-lon.",
    ),
    tags: ["cp", "phonologie", "syllabe", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "cp_phono_syllabe_decouper_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "conscience_phonologique",
    microId: "cp_phono_syllabe_decouper",
    difficulty: 2,
    theme: "neutral",
    hint: "Dis le mot lentement : où est-ce que ta voix s'arrête ?",
    tags: ["cp", "phonologie", "syllabe", "template"],
    generate: () => {
      const item = randomChoice(MOTS.filter((m) => m.syl >= 2));
      const lettres = item.mot.split("");
      const faux1 = `${lettres.slice(0, 1).join("")}-${lettres.slice(1).join("")}`;
      const faux2 = `${lettres.slice(0, item.mot.length - 1).join("")}-${lettres.slice(-1).join("")}`;
      const faux3 = item.mot.split("").join("-");
      return {
        text: `Quel découpage en syllabes est le bon pour « ${item.mot} » ?`,
        format: "qcm" as const,
        choices: makeChoices(item.coupe, [faux1, faux2, faux3]),
        expected: [item.coupe],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "On coupe le mot là où la voix marque un temps.",
          "On dit le mot lentement et on écoute les morceaux.",
          `${item.coupe} : chaque morceau se dit d'un seul souffle.`,
          `Le bon découpage est ${item.coupe}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_phono_syllabe_decouper_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "conscience_phonologique",
    microId: "cp_phono_syllabe_decouper",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les morceaux depuis le début.",
    tags: ["cp", "phonologie", "syllabe", "template"],
    generate: () => {
      // ⚠️ On écarte les mots dont deux syllabes sont identiques : « samoussa »
      // se découpe sa-mous-sa, et l'élève verrait deux fois la même
      // proposition. Attrapé par `verifier-generateurs.mjs`.
      const item = randomChoice(
        MOTS.filter((m) => m.syl === 3 && new Set(m.coupe.split("-")).size === 3),
      );
      const morceaux = item.coupe.split("-");
      const rang = randomChoice([0, 1, 2]);
      const nom = ["première", "deuxième", "dernière"][rang];
      return {
        text: `Dans « ${item.mot} », quelle est la ${nom} syllabe ?`,
        format: "qcm" as const,
        choices: shuffle([...morceaux]),
        expected: [morceaux[rang]],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Les syllabes se comptent dans l'ordre, du début à la fin du mot.",
          "On découpe d'abord, puis on cherche celle qu'on demande.",
          `${item.coupe} : la première est « ${morceaux[0]} », la deuxième « ${morceaux[1]} », la dernière « ${morceaux[2]} ».`,
          `La ${nom} syllabe de « ${item.mot} » est « ${morceaux[rang]} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CP_PHONO_RIME_RECONNAITRE
     ⚠️ Deux mots riment quand leur FIN se prononce pareil.
     « maison » et « garçon » riment : tous deux en [ɔ̃].
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_phono_rime_reconnaitre_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "conscience_phonologique",
    microId: "cp_phono_rime_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Est-ce que « maison » et « garçon » riment ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Écoute seulement la fin des deux mots, pas leur écriture.",
    explanation: exp(
      "Deux mots riment quand leur fin chante pareil.",
      "Dis les deux mots tout haut, et n'écoute que la fin.",
      "mais-ON, gar-ÇON : on entend le même son [ɔ̃] à la fin, même si ça ne s'écrit pas de la même façon. C'est l'oreille qui décide, pas l'œil.",
      "Oui, « maison » et « garçon » riment.",
    ),
    tags: ["cp", "phonologie", "rime", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_phono_rime_reconnaitre_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "conscience_phonologique",
    microId: "cp_phono_rime_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    hint: "Dis les deux mots et écoute seulement leur fin.",
    tags: ["cp", "phonologie", "rime", "template"],
    generate: () => {
      const rime = randomChoice([true, false]);
      if (rime) {
        const p = randomChoice(PAIRES_RIMENT);
        return {
          text: `Est-ce que « ${p.a} » et « ${p.b} » riment ?`,
          format: "qcm" as const,
          choices: ["oui", "non"],
          expected: ["oui"],
          comparator: "mcq_exact" as const,
          explanation: exp(
            "Deux mots riment quand leur fin chante pareil.",
            "Dis les deux mots tout haut, et n'écoute que la fin.",
            `« ${p.a} » et « ${p.b} » finissent tous les deux par le son ${p.son}.`,
            "Oui, ces deux mots riment.",
          ),
        };
      }
      const p = randomChoice(PAIRES_NE_RIMENT_PAS);
      return {
        text: `Est-ce que « ${p.a} » et « ${p.b} » riment ?`,
        format: "qcm" as const,
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Deux mots riment quand leur fin chante pareil.",
          "Dis les deux mots tout haut, et n'écoute que la fin.",
          `« ${p.a} » finit par ${p.fa}, « ${p.b} » finit par ${p.fb}. Ce n'est pas le même son.`,
          "Non, ces deux mots ne riment pas.",
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_phono_rime_reconnaitre_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "conscience_phonologique",
    microId: "cp_phono_rime_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche celui dont la fin sonne comme le premier mot.",
    tags: ["cp", "phonologie", "rime", "template"],
    generate: () => {
      const p = randomChoice(PAIRES_RIMENT);
      const intrus = shuffle(
        PAIRES_NE_RIMENT_PAS.filter((q) => q.a !== p.a && q.b !== p.b),
      ).slice(0, 3).map((q) => q.b);
      return {
        text: `Quel mot rime avec « ${p.a} » ?`,
        format: "qcm" as const,
        choices: makeChoices(p.b, intrus),
        expected: [p.b],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Deux mots riment quand leur fin chante pareil.",
          "On dit chaque proposition après le mot de départ et on écoute la fin.",
          `« ${p.a} » finit par le son ${p.son}. « ${p.b} » aussi.`,
          `« ${p.b} » rime avec « ${p.a} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CP_PHONO_SON_IDENTIFIER — enfin une question qui demande
     vraiment d'identifier un son.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_phono_son_identifier_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "conscience_phonologique",
    microId: "cp_phono_son_identifier",
    difficulty: 2,
    theme: "neutral",
    text: "Dans lequel de ces mots entends-tu le son [u], celui de « chou » ?",
    format: "qcm",
    choices: ["boucan", "lagon", "letchi", "vélo"],
    expected: ["boucan"],
    comparator: "mcq_exact",
    hint: "Dis chaque mot lentement et écoute s'il y a « ou » dedans.",
    explanation: exp(
      "Identifier un son, c'est le retrouver à l'intérieur d'un mot qu'on entend.",
      "Dis chaque mot tout doucement, comme au ralenti, et guette le son.",
      "bou-can : on entend bien [u] au début. Dans « lagon », « letchi » et « vélo », il n'y est pas.",
      "Le son [u] est dans « boucan ».",
    ),
    tags: ["cp", "phonologie", "son", "qcm"],
  },
  {
    kind: "template",
    id: "cp_phono_son_identifier_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "conscience_phonologique",
    microId: "cp_phono_son_identifier",
    difficulty: 1,
    theme: "neutral",
    hint: "Dis chaque mot lentement et écoute.",
    tags: ["cp", "phonologie", "son", "template"],
    generate: () => {
      const s = randomChoice(SONS_PRESENTS);
      const bon = randomChoice(s.avec);
      return {
        text: `Dans quel mot entends-tu le son ${s.son} ?`,
        format: "qcm" as const,
        choices: makeChoices(bon, shuffle(s.sans).slice(0, 3)),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Identifier un son, c'est le retrouver dans un mot qu'on entend.",
          "Dis chaque mot tout doucement, comme au ralenti, et guette le son.",
          `On entend bien ${s.son} dans « ${bon} ». Dans les autres, non.`,
          `Le son ${s.son} est dans « ${bon} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_phono_son_identifier_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "conscience_phonologique",
    microId: "cp_phono_son_identifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Trois mots ont le son, un seul ne l'a pas.",
    tags: ["cp", "phonologie", "son", "template"],
    generate: () => {
      const s = randomChoice(SONS_PRESENTS);
      const intrus = randomChoice(s.sans);
      const avec = shuffle(s.avec).slice(0, 3);
      return {
        text: `Dans quel mot n'entends-tu PAS le son ${s.son} ?`,
        format: "qcm" as const,
        choices: shuffle([intrus, ...avec]),
        expected: [intrus],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Ici on cherche l'intrus : celui où le son n'est pas.",
          "Dis les quatre mots l'un après l'autre. Trois vont sonner pareil, un va détonner.",
          `${avec.map((m) => `« ${m} »`).join(", ")} contiennent ${s.son}. « ${intrus} », non.`,
          `L'intrus est « ${intrus} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CP_PHONO_SON_POSITION — début, milieu ou fin
     ⚠️ Un seul exemplaire du son dans le mot, sinon la
     question n'a pas de réponse unique.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_phono_son_position_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "conscience_phonologique",
    microId: "cp_phono_son_position",
    difficulty: 2,
    theme: "neutral",
    text: "Où entends-tu le son [l] dans le mot « lagon » ?",
    format: "qcm",
    choices: ["au début", "au milieu", "à la fin", "on ne l'entend pas"],
    expected: ["au début"],
    comparator: "mcq_exact",
    hint: "Dis le mot doucement : le son arrive-t-il tout de suite ?",
    explanation: exp(
      "Un son se cache au début, au milieu ou à la fin d'un mot.",
      "Dis le mot au ralenti et repère le moment où le son arrive.",
      "l-a-gon : le [l] est la toute première chose qu'on entend.",
      "Le son [l] est au début de « lagon ».",
    ),
    tags: ["cp", "phonologie", "position", "qcm"],
  },
  {
    kind: "template",
    id: "cp_phono_son_position_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "conscience_phonologique",
    microId: "cp_phono_son_position",
    difficulty: 2,
    theme: "neutral",
    hint: "Dis le mot lentement et repère le moment où le son arrive.",
    tags: ["cp", "phonologie", "position", "template"],
    generate: () => {
      const item = randomChoice(POSITIONS);
      return {
        text: `Où entends-tu le son ${item.son} dans le mot « ${item.mot} » ?`,
        format: "qcm" as const,
        choices: ["au début", "au milieu", "à la fin", "on ne l'entend pas"],
        expected: [item.position],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un son se cache au début, au milieu ou à la fin d'un mot.",
          "Dis le mot au ralenti et repère le moment où le son arrive.",
          `Dans « ${item.mot} », le son ${item.son} s'entend ${item.position}.`,
          `Le son ${item.son} est ${item.position} de « ${item.mot} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_phono_son_position_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "conscience_phonologique",
    microId: "cp_phono_son_position",
    difficulty: 3,
    theme: "neutral",
    hint: "Écoute la première chose que tu entends dans chaque mot.",
    tags: ["cp", "phonologie", "position", "template"],
    generate: () => {
      const debuts = POSITIONS.filter((p) => p.position === "au début");
      const item = randomChoice(debuts);
      // ⚠️ Un même mot figure plusieurs fois dans POSITIONS, une fois par son.
      // Sans ce dédoublonnage, deux pièges tombaient sur le même mot et le QCM
      // perdait une ligne. Attrapé par `verifier-generateurs.mjs`.
      const autres = shuffle([
        ...new Set(
          POSITIONS.filter((p) => p.position !== "au début" && p.mot !== item.mot)
            .map((p) => p.mot),
        ),
      ]).slice(0, 3);
      return {
        text: `Dans quel mot le son ${item.son} est-il au DÉBUT ?`,
        format: "qcm" as const,
        choices: makeChoices(item.mot, autres),
        expected: [item.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un son est au début quand c'est la première chose qu'on entend.",
          "Dis chaque mot et écoute la toute première chose qui sort de ta bouche.",
          `« ${item.mot} » commence par ${item.son}.`,
          `Le son ${item.son} est au début de « ${item.mot} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CP_PHONO_DEFI — deux étapes : découper PUIS chercher
  ========================================================= */
  {
    kind: "template",
    id: "cp_phono_defi_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "conscience_phonologique",
    microId: "cp_phono_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "D'abord compte les syllabes, ensuite écoute la fin.",
    tags: ["cp", "phonologie", "defi", "template"],
    generate: () => {
      const p = randomChoice(PAIRES_RIMENT);
      const motA = MOTS.find((m) => m.mot === p.a);
      const syl = motA ? motA.syl : 2;
      const coupe = motA ? motA.coupe : p.a;
      return {
        text: `Le mot « ${p.a} » a-t-il le même nombre de syllabes que « ${p.b} », et riment-ils ?`,
        format: "qcm" as const,
        choices: [
          `Ils riment, et « ${p.a} » a ${syl} syllabe${syl > 1 ? "s" : ""}`,
          `Ils ne riment pas, et « ${p.a} » a ${syl} syllabe${syl > 1 ? "s" : ""}`,
          `Ils riment, et « ${p.a} » a ${syl + 1} syllabes`,
          "Ils ne riment pas et n'ont pas le même nombre de syllabes",
        ],
        expected: [`Ils riment, et « ${p.a} » a ${syl} syllabe${syl > 1 ? "s" : ""}`],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Deux questions en une : compter les syllabes, puis écouter la fin.",
          "On frappe d'abord dans ses mains, ensuite on écoute la rime.",
          `${coupe} → ${syl} syllabe${syl > 1 ? "s" : ""}. Et « ${p.a} » comme « ${p.b} » finissent par ${p.son}.`,
          `Ils riment, et « ${p.a} » a ${syl} syllabe${syl > 1 ? "s" : ""}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_phono_defi_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "conscience_phonologique",
    microId: "cp_phono_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche le mot qui a le son ET le bon nombre de syllabes.",
    tags: ["cp", "phonologie", "defi", "template"],
    generate: () => {
      const s = randomChoice(SONS_PRESENTS);
      const candidats = MOTS.filter((m) => (s.avec as readonly string[]).includes(m.mot));
      const bon = randomChoice(candidats.length ? candidats : MOTS.filter((m) => m.syl === 2));
      const faux = shuffle(
        MOTS.filter((m) => m.mot !== bon.mot && (m.syl !== bon.syl || !(s.avec as readonly string[]).includes(m.mot))),
      ).slice(0, 3).map((m) => m.mot);
      return {
        text: `Quel mot contient le son ${s.son} ET a ${bon.syl} syllabe${bon.syl > 1 ? "s" : ""} ?`,
        format: "qcm" as const,
        choices: makeChoices(bon.mot, faux),
        expected: [bon.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Il faut vérifier DEUX choses : le son, et le nombre de syllabes.",
          "On écoute d'abord le son, puis on frappe dans ses mains.",
          `${bon.coupe} → ${bon.syl} syllabe${bon.syl > 1 ? "s" : ""}, et on y entend ${s.son}.`,
          `Le mot est « ${bon.mot} ».`,
        ),
      };
    },
  },
];
