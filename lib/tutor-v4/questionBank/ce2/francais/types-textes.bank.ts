// lib/tutor-v4/questionBank/ce2/francais/types-textes.bank.ts
//
// Les types de textes au CE2.
//
// NOTION NEUVE : `types_textes` a été créée le 09/08/2026 en relisant le BO, et
// le repli l'envoyait sur un générateur hors sujet.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, CE2) : « lire et comprendre en
// autonomie un texte narratif, poétique, documentaire ou théâtral », et
// reconnaitre un texte prescriptif — recette, règle du jeu, consigne.
//
// L'IDÉE DE LA NOTION : un texte ne se reconnait pas à son sujet mais à sa
// FORME et à son BUT. Un texte sur les baleines peut être documentaire,
// poétique ou théâtral ; ce sont les marques qui changent, pas la baleine.
//
// ⚠️ Chaque extrait est écrit à la main, court, et porte les marques de son
// type sans caricature : le théâtre a ses noms de personnages en capitales et
// ses didascalies entre virgules ; la poésie va à la ligne avant la fin de la
// phrase ; le prescriptif enchaine des verbes à l'infinitif ou à l'impératif ;
// le documentaire donne des chiffres et n'a pas de personnage.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function choix(correct: string, ...reserves: readonly (readonly string[])[]): string[] {
  const vus = new Set<string>([correct]);
  const faux: string[] = [];
  for (const mot of shuffle(reserves.flat())) {
    if (vus.has(mot)) continue;
    vus.add(mot);
    faux.push(mot);
    if (faux.length === 3) break;
  }
  return shuffle([correct, ...faux]);
}

function exp(definition: string, methode: string, exemple: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Exemple : ${exemple}

Conclusion : ${conclusion}`;
}

type TypeTexte = "narratif" | "informatif" | "prescriptif" | "poetique" | "theatral";

const LABEL: Record<TypeTexte, string> = {
  narratif: "un texte narratif",
  informatif: "un texte informatif",
  prescriptif: "un texte prescriptif",
  poetique: "un texte poétique",
  theatral: "un texte de théâtre",
};

const BUT: Record<TypeTexte, string> = {
  narratif: "raconter une histoire",
  informatif: "donner des informations vraies sur un sujet",
  prescriptif: "dire comment faire quelque chose, dans l'ordre",
  poetique: "jouer avec les mots, les images et les sons",
  theatral: "être joué, par des personnages qui parlent",
};

const TOUS_TYPES: readonly TypeTexte[] = [
  "narratif",
  "informatif",
  "prescriptif",
  "poetique",
  "theatral",
];

type Echantillon = {
  readonly type: TypeTexte;
  readonly extrait: string;
  /** La marque qui permet de reconnaitre le type, écrite pour un enfant. */
  readonly marque: string;
};

const ECHANTILLONS: readonly Echantillon[] = [
  /* ── NARRATIF ───────────────────────────────────────────────────────────── */
  {
    type: "narratif",
    extrait:
      "Ce matin-là, Léa se leva avant tout le monde. Elle enfila ses sandales et sortit sans bruit. Le sentier était encore mouillé de rosée. Au bout de dix minutes, elle entendit un cri qu'elle ne connaissait pas.",
    marque: "il y a un personnage, et les évènements se suivent dans le temps",
  },
  {
    type: "narratif",
    extrait:
      "Le vieux pêcheur poussa sa barque à l'eau. Il n'avait rien pris depuis trois jours. Cette fois, se dit-il, ce sera la bonne. La mer était plate comme une table.",
    marque: "un personnage vit quelque chose, et les verbes sont au passé",
  },
  {
    type: "narratif",
    extrait:
      "Tom ouvrit la boite avec précaution. À l'intérieur, il ne restait qu'un bouton et un papier plié en quatre. Il déplia le papier. L'écriture était celle de son grand-père.",
    marque: "une suite d'actions qui font avancer une histoire",
  },
  {
    type: "narratif",
    extrait:
      "Il pleuvait depuis trois jours quand le camion s'arrêta devant l'école. Les élèves collèrent leur nez aux fenêtres. Deux hommes descendirent et déchargèrent une grande caisse en bois.",
    marque: "des personnages, un lieu, un moment : c'est une histoire",
  },
  {
    type: "narratif",
    extrait:
      "Nina avait promis de ne rien dire. Elle tint parole jusqu'au jeudi. Puis, à la récréation, les mots sortirent tout seuls, et il fut trop tard pour les rattraper.",
    marque: "on suit un personnage, et quelque chose change au milieu",
  },

  /* ── INFORMATIF (documentaire) ──────────────────────────────────────────── */
  {
    type: "informatif",
    extrait:
      "Le margouillat est un petit lézard. Il mesure entre dix et quinze centimètres. Il vit près des maisons et se nourrit d'insectes. Ses pattes portent des milliers de poils minuscules qui lui permettent de grimper aux murs.",
    marque: "des chiffres, le présent, et aucun personnage",
  },
  {
    type: "informatif",
    extrait:
      "Le Piton de la Fournaise est l'un des volcans les plus actifs du monde. Il entre en éruption environ une fois par an. Sa dernière grande coulée a atteint la route du littoral.",
    marque: "des faits vrais et vérifiables, pas une histoire",
  },
  {
    type: "informatif",
    extrait:
      "Le letchi est un fruit originaire de Chine. Il pousse sur un arbre qui peut atteindre quinze mètres. La récolte a lieu en novembre et en décembre. On le mange frais, ou en confiture.",
    marque: "on explique ce qu'est une chose, avec des mesures et des dates",
  },
  {
    type: "informatif",
    extrait:
      "Une baleine à bosse adulte pèse environ trente tonnes. Elle remonte à la surface toutes les dix minutes pour respirer. Chaque année, elle parcourt des milliers de kilomètres entre les eaux froides et les eaux chaudes.",
    marque: "des mesures et des faits, valables pour toutes les baleines",
  },
  {
    type: "informatif",
    extrait:
      "La canne à sucre est cultivée sur l'ile depuis plus de deux siècles. Elle occupe la moitié des terres agricoles. Après la coupe, les tiges sont broyées à l'usine pour en extraire le jus.",
    marque: "on informe sur un sujet, sans raconter ni demander de faire",
  },

  /* ── PRESCRIPTIF ────────────────────────────────────────────────────────── */
  {
    type: "prescriptif",
    extrait:
      "Pour préparer un rougail tomate : couper les tomates en petits dés. Émincer l'oignon. Ajouter le piment, le sel, un filet d'huile. Mélanger et laisser reposer une heure au frais.",
    marque: "des verbes à l'infinitif, et des étapes dans l'ordre",
  },
  {
    type: "prescriptif",
    extrait:
      "Règle du jeu : chaque joueur reçoit sept cartes. À ton tour, pose une carte de la même couleur ou du même chiffre. Si tu ne peux pas jouer, pioche. Le premier qui n'a plus de carte a gagné.",
    marque: "on te dit ce que tu dois faire, et dans quel ordre",
  },
  {
    type: "prescriptif",
    extrait:
      "En cas d'alerte cyclonique : ferme les volets. Remplis des bouteilles d'eau. Range ce qui traine dehors. Ne sors pas tant que l'alerte n'est pas levée.",
    marque: "des verbes à l'impératif : on te donne des consignes",
  },
  {
    type: "prescriptif",
    extrait:
      "Pour planter un letchi : creuse un trou de cinquante centimètres. Mélange la terre avec du compost. Place le jeune arbre bien droit. Arrose abondamment, puis tous les deux jours le premier mois.",
    marque: "une suite d'actions à faire, l'une après l'autre",
  },
  {
    type: "prescriptif",
    extrait:
      "Avant de rendre ta dictée : relis les accords du groupe nominal. Vérifie ensuite l'accord de chaque verbe avec son sujet. Termine par les mots difficiles. Regarde ta feuille, jamais le modèle.",
    marque: "une marche à suivre, adressée à celui qui lit",
  },

  /* ── POÉTIQUE ───────────────────────────────────────────────────────────── */
  {
    type: "poetique",
    extrait:
      "Le vent du soir\ndescend du piton\nen cherchant la mer.\nIl passe sous les portes,\net personne ne le voit.",
    marque: "on va à la ligne avant la fin de la phrase : ce sont des vers",
  },
  {
    type: "poetique",
    extrait:
      "Un margouillat sur le mur blanc,\nimmobile comme une virgule,\nattend que la nuit bascule\net que passe un moucheron blanc.",
    marque: "des vers, des rimes, et une image (immobile comme une virgule)",
  },
  {
    type: "poetique",
    extrait:
      "La pluie tambourine, tambourine,\nsur les tôles de la cuisine.\nElle joue, elle recommence,\nc'est la saison qui danse.",
    marque: "des rimes et des répétitions qui font une musique",
  },
  {
    type: "poetique",
    extrait: "Mangue mûre, mangue d'or,\ntombée dans l'herbe qui dort,\nqui te ramassera d'abord ?",
    marque: "des vers courts qui riment, et une question posée au fruit",
  },
  {
    type: "poetique",
    extrait:
      "La mer respire,\nla mer soupire,\nla mer ne dort jamais.\nElle compte les bateaux\nque le port lui a prêtés.",
    marque: "la mer fait des choses humaines : c'est une image",
  },

  /* ── THÉÂTRAL ───────────────────────────────────────────────────────────── */
  {
    type: "theatral",
    extrait:
      "LÉA. — Tu as vu ce qui est écrit sur la porte ?\nTOM, s'approchant. — Non. Qu'est-ce que ça dit ?\nLÉA. — « Fermé jusqu'à nouvel ordre. »\nTOM. — Encore !",
    marque: "le nom du personnage devant chaque réplique",
  },
  {
    type: "theatral",
    extrait:
      "LE MARCHAND. — Trois euros le kilo.\nMAMIE. — Deux euros cinquante, et je prends tout.\nLE MARCHAND, souriant. — Vous me ruinez.",
    marque: "des répliques, et une indication de jeu (souriant)",
  },
  {
    type: "theatral",
    extrait:
      "LE MAITRE. — Qui peut me donner l'infinitif de « nous sommes » ?\nKARIM, levant la main. — Sommer ?\nLE MAITRE. — Réfléchis. Récite le verbe en entier.\nKARIM. — Ah… être !",
    marque: "on lit ce que chacun dit, sans « dit-il »",
  },
  {
    type: "theatral",
    extrait:
      "NINA. — Il y a trois œufs dans le nid.\nSOFIA. — Tu es sûre ? Tu les as comptés ?\nNINA, les jumelles aux yeux. — Trois. Bleu pâle.",
    marque: "un dialogue écrit pour être joué",
  },
  {
    type: "theatral",
    extrait:
      "LE PÊCHEUR. — La mer monte plus vite que d'habitude.\nL'ENFANT. — On rentre ?\nLE PÊCHEUR, pliant son filet. — On rentre.",
    marque: "le nom en capitales, un tiret, puis les paroles",
  },
];

function echantillonsDe(type: TypeTexte): readonly Echantillon[] {
  return ECHANTILLONS.filter((e) => e.type === type);
}

/* Les quatre questions sont les mêmes pour les cinq types : seul le type
   change. Le CORPS est donc factorisé en quatre fonctions, mais les ITEMS
   restent écrits un par un.
   ⚠️ C'est indispensable : `verifier-banque.mjs` LIT LE SOURCE. Une fabrique
   qui produisait les vingt items d'un coup lui cachait les `microId`, et il
   rangeait les cinq micro-compétences dans « aucun item » — puis refusait de
   vérifier le fichier. Un fichier élégant qui ne se vérifie pas ne vaut pas un
   fichier long qui se vérifie. */

function questionDuType(type: TypeTexte) {
  const e = randomChoice(echantillonsDe(type));
  return {
    text: `Lis cet extrait :

${e.extrait}

De quel type de texte s'agit-il ?`,
    format: "qcm" as const,
    choices: TOUS_TYPES.map((t) => LABEL[t]),
    expected: [LABEL[type]],
    comparator: "mcq_exact" as const,
    explanation: exp(
      `${LABEL[type].charAt(0).toUpperCase()}${LABEL[type].slice(1)} sert à ${BUT[type]}.`,
      "Ne regarde pas le sujet du texte : regarde sa forme et ce qu'il veut de toi.",
      `Ici, ${e.marque}.`,
      `C'est ${LABEL[type]}.`,
    ),
  };
}

function questionDeLaMarque(type: TypeTexte) {
  const e = randomChoice(echantillonsDe(type));
  const autres = shuffle(ECHANTILLONS.filter((x) => x.type !== type)).map((x) => x.marque);
  return {
    text: `Lis cet extrait :

${e.extrait}

Qu'est-ce qui montre que c'est ${LABEL[type]} ?`,
    format: "qcm" as const,
    choices: choix(e.marque, autres),
    expected: [e.marque],
    comparator: "mcq_exact" as const,
    explanation: exp(
      "Chaque type de texte a ses marques : on les reconnait de l'œil, avant même de lire.",
      "Regarde la mise en page d'abord — retours à la ligne, noms en capitales, listes — puis les verbes.",
      `Ici, ${e.marque}.`,
      `C'est ${e.marque}.`,
    ),
  };
}

function questionDuBut(type: TypeTexte) {
  const e = randomChoice(echantillonsDe(type));
  return {
    text: `Lis cet extrait :

${e.extrait}

À quoi sert ce texte ?`,
    format: "qcm" as const,
    choices: TOUS_TYPES.map((t) => `à ${BUT[t]}`),
    expected: [`à ${BUT[type]}`],
    comparator: "mcq_exact" as const,
    explanation: exp(
      "Le type d'un texte se devine à son but : ce que son auteur veut obtenir de toi.",
      "Demande-toi ce que tu es censé faire après l'avoir lu : imaginer, savoir, agir, rêver, ou jouer.",
      `Celui-ci sert à ${BUT[type]} — ${e.marque}.`,
      `Il sert à ${BUT[type]}.`,
    ),
  };
}


/* ═══════════════════════════════════════════════════════════════════════════
   LA BANQUE
   ═══════════════════════════════════════════════════════════════════════════ */

export const typesTextesBank: TutorBankItemV4[] = [
  /* =========================================================
     CE2_TYPE_NARRATIF
  ========================================================= */
  {
    kind: "template",
    id: "ce2_type_narratif_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "types_textes",
    microId: "ce2_type_narratif",
    difficulty: 2,
    theme: "neutral",
    hint: "Demande-toi à quoi sert ce texte : raconter, informer, faire faire, jouer avec les mots, ou être joué ?",
    tags: ["ce2", "types-textes", "narratif", "template"],
    generate: () => questionDuType("narratif"),
  },
  {
    kind: "template",
    id: "ce2_type_narratif_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "types_textes",
    microId: "ce2_type_narratif",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche la marque qu'on ne trouve que dans ce type de texte.",
    tags: ["ce2", "types-textes", "narratif", "template"],
    generate: () => questionDeLaMarque("narratif"),
  },
  {
    kind: "template",
    id: "ce2_type_narratif_tpl_3",
    niveau: "ce2",
    matiere: "francais",
    notionId: "types_textes",
    microId: "ce2_type_narratif",
    difficulty: 2,
    theme: "neutral",
    hint: "À quoi sert ce texte ? Que veut-il de celui qui le lit ?",
    tags: ["ce2", "types-textes", "narratif", "template"],
    generate: () => questionDuBut("narratif"),
  },
  {
    kind: "template",
    id: "ce2_type_narratif_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "types_textes",
    microId: "ce2_type_narratif",
    difficulty: 3,
    theme: "neutral",
    hint: "Dis ce que tu vois AVANT de lire, puis ce que tu comprends en lisant.",
    tags: ["ce2", "types-textes", "narratif", "ouverte"],
    generate: () => {
      // ⚠️ Ce corps-là est écrit ici, et non appelé depuis une fonction
      // partagée comme ses trois voisins : `verifier-banque.mjs` LIT LE SOURCE
      // et cherche `format: "open"` dans l'item. Factorisé, il ne le voyait
      // plus et rangeait les cinq types dans « sans question ouverte ».
      const e = randomChoice(echantillonsDe("narratif"));
      return {
        text: `Lis cet extrait :

${e.extrait}

De quel type de texte s'agit-il, et à quoi l'as-tu vu ? Explique.`,
        format: "open" as const,
        expected: ["narratif", ...e.marque.split(" ").filter((m) => m.length > 5)],
        comparator: "contains_keyword" as const,
        explanation: exp(
          `${LABEL["narratif"].charAt(0).toUpperCase()}${LABEL["narratif"].slice(1)} sert à ${BUT["narratif"]}.`,
          "Regarde d'abord la forme — la mise en page, les retours à la ligne, les noms — puis vérifie avec le sens.",
          `Ici, ${e.marque}.`,
          `C'est ${LABEL["narratif"]} : ${e.marque}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_TYPE_INFORMATIF
  ========================================================= */
  {
    kind: "template",
    id: "ce2_type_informatif_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "types_textes",
    microId: "ce2_type_informatif",
    difficulty: 2,
    theme: "neutral",
    hint: "Demande-toi à quoi sert ce texte : raconter, informer, faire faire, jouer avec les mots, ou être joué ?",
    tags: ["ce2", "types-textes", "informatif", "template"],
    generate: () => questionDuType("informatif"),
  },
  {
    kind: "template",
    id: "ce2_type_informatif_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "types_textes",
    microId: "ce2_type_informatif",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche la marque qu'on ne trouve que dans ce type de texte.",
    tags: ["ce2", "types-textes", "informatif", "template"],
    generate: () => questionDeLaMarque("informatif"),
  },
  {
    kind: "template",
    id: "ce2_type_informatif_tpl_3",
    niveau: "ce2",
    matiere: "francais",
    notionId: "types_textes",
    microId: "ce2_type_informatif",
    difficulty: 2,
    theme: "neutral",
    hint: "À quoi sert ce texte ? Que veut-il de celui qui le lit ?",
    tags: ["ce2", "types-textes", "informatif", "template"],
    generate: () => questionDuBut("informatif"),
  },
  {
    kind: "template",
    id: "ce2_type_informatif_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "types_textes",
    microId: "ce2_type_informatif",
    difficulty: 3,
    theme: "neutral",
    hint: "Dis ce que tu vois AVANT de lire, puis ce que tu comprends en lisant.",
    tags: ["ce2", "types-textes", "informatif", "ouverte"],
    generate: () => {
      // ⚠️ Ce corps-là est écrit ici, et non appelé depuis une fonction
      // partagée comme ses trois voisins : `verifier-banque.mjs` LIT LE SOURCE
      // et cherche `format: "open"` dans l'item. Factorisé, il ne le voyait
      // plus et rangeait les cinq types dans « sans question ouverte ».
      const e = randomChoice(echantillonsDe("informatif"));
      return {
        text: `Lis cet extrait :

${e.extrait}

De quel type de texte s'agit-il, et à quoi l'as-tu vu ? Explique.`,
        format: "open" as const,
        expected: ["informatif", ...e.marque.split(" ").filter((m) => m.length > 5)],
        comparator: "contains_keyword" as const,
        explanation: exp(
          `${LABEL["informatif"].charAt(0).toUpperCase()}${LABEL["informatif"].slice(1)} sert à ${BUT["informatif"]}.`,
          "Regarde d'abord la forme — la mise en page, les retours à la ligne, les noms — puis vérifie avec le sens.",
          `Ici, ${e.marque}.`,
          `C'est ${LABEL["informatif"]} : ${e.marque}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_TYPE_PRESCRIPTIF
  ========================================================= */
  {
    kind: "template",
    id: "ce2_type_prescriptif_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "types_textes",
    microId: "ce2_type_prescriptif",
    difficulty: 2,
    theme: "neutral",
    hint: "Demande-toi à quoi sert ce texte : raconter, informer, faire faire, jouer avec les mots, ou être joué ?",
    tags: ["ce2", "types-textes", "prescriptif", "template"],
    generate: () => questionDuType("prescriptif"),
  },
  {
    kind: "template",
    id: "ce2_type_prescriptif_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "types_textes",
    microId: "ce2_type_prescriptif",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche la marque qu'on ne trouve que dans ce type de texte.",
    tags: ["ce2", "types-textes", "prescriptif", "template"],
    generate: () => questionDeLaMarque("prescriptif"),
  },
  {
    kind: "template",
    id: "ce2_type_prescriptif_tpl_3",
    niveau: "ce2",
    matiere: "francais",
    notionId: "types_textes",
    microId: "ce2_type_prescriptif",
    difficulty: 2,
    theme: "neutral",
    hint: "À quoi sert ce texte ? Que veut-il de celui qui le lit ?",
    tags: ["ce2", "types-textes", "prescriptif", "template"],
    generate: () => questionDuBut("prescriptif"),
  },
  {
    kind: "template",
    id: "ce2_type_prescriptif_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "types_textes",
    microId: "ce2_type_prescriptif",
    difficulty: 3,
    theme: "neutral",
    hint: "Dis ce que tu vois AVANT de lire, puis ce que tu comprends en lisant.",
    tags: ["ce2", "types-textes", "prescriptif", "ouverte"],
    generate: () => {
      // ⚠️ Ce corps-là est écrit ici, et non appelé depuis une fonction
      // partagée comme ses trois voisins : `verifier-banque.mjs` LIT LE SOURCE
      // et cherche `format: "open"` dans l'item. Factorisé, il ne le voyait
      // plus et rangeait les cinq types dans « sans question ouverte ».
      const e = randomChoice(echantillonsDe("prescriptif"));
      return {
        text: `Lis cet extrait :

${e.extrait}

De quel type de texte s'agit-il, et à quoi l'as-tu vu ? Explique.`,
        format: "open" as const,
        expected: ["prescriptif", ...e.marque.split(" ").filter((m) => m.length > 5)],
        comparator: "contains_keyword" as const,
        explanation: exp(
          `${LABEL["prescriptif"].charAt(0).toUpperCase()}${LABEL["prescriptif"].slice(1)} sert à ${BUT["prescriptif"]}.`,
          "Regarde d'abord la forme — la mise en page, les retours à la ligne, les noms — puis vérifie avec le sens.",
          `Ici, ${e.marque}.`,
          `C'est ${LABEL["prescriptif"]} : ${e.marque}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_TYPE_POETIQUE
  ========================================================= */
  {
    kind: "template",
    id: "ce2_type_poetique_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "types_textes",
    microId: "ce2_type_poetique",
    difficulty: 2,
    theme: "neutral",
    hint: "Demande-toi à quoi sert ce texte : raconter, informer, faire faire, jouer avec les mots, ou être joué ?",
    tags: ["ce2", "types-textes", "poetique", "template"],
    generate: () => questionDuType("poetique"),
  },
  {
    kind: "template",
    id: "ce2_type_poetique_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "types_textes",
    microId: "ce2_type_poetique",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche la marque qu'on ne trouve que dans ce type de texte.",
    tags: ["ce2", "types-textes", "poetique", "template"],
    generate: () => questionDeLaMarque("poetique"),
  },
  {
    kind: "template",
    id: "ce2_type_poetique_tpl_3",
    niveau: "ce2",
    matiere: "francais",
    notionId: "types_textes",
    microId: "ce2_type_poetique",
    difficulty: 2,
    theme: "neutral",
    hint: "À quoi sert ce texte ? Que veut-il de celui qui le lit ?",
    tags: ["ce2", "types-textes", "poetique", "template"],
    generate: () => questionDuBut("poetique"),
  },
  {
    kind: "template",
    id: "ce2_type_poetique_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "types_textes",
    microId: "ce2_type_poetique",
    difficulty: 3,
    theme: "neutral",
    hint: "Dis ce que tu vois AVANT de lire, puis ce que tu comprends en lisant.",
    tags: ["ce2", "types-textes", "poetique", "ouverte"],
    generate: () => {
      // ⚠️ Ce corps-là est écrit ici, et non appelé depuis une fonction
      // partagée comme ses trois voisins : `verifier-banque.mjs` LIT LE SOURCE
      // et cherche `format: "open"` dans l'item. Factorisé, il ne le voyait
      // plus et rangeait les cinq types dans « sans question ouverte ».
      const e = randomChoice(echantillonsDe("poetique"));
      return {
        text: `Lis cet extrait :

${e.extrait}

De quel type de texte s'agit-il, et à quoi l'as-tu vu ? Explique.`,
        format: "open" as const,
        expected: ["poétique", "poesie", "poeme", "vers", ...e.marque.split(" ").filter((m) => m.length > 5)],
        comparator: "contains_keyword" as const,
        explanation: exp(
          `${LABEL["poetique"].charAt(0).toUpperCase()}${LABEL["poetique"].slice(1)} sert à ${BUT["poetique"]}.`,
          "Regarde d'abord la forme — la mise en page, les retours à la ligne, les noms — puis vérifie avec le sens.",
          `Ici, ${e.marque}.`,
          `C'est ${LABEL["poetique"]} : ${e.marque}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_TYPE_THEATRAL
  ========================================================= */
  {
    kind: "template",
    id: "ce2_type_theatral_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "types_textes",
    microId: "ce2_type_theatral",
    difficulty: 2,
    theme: "neutral",
    hint: "Demande-toi à quoi sert ce texte : raconter, informer, faire faire, jouer avec les mots, ou être joué ?",
    tags: ["ce2", "types-textes", "theatral", "template"],
    generate: () => questionDuType("theatral"),
  },
  {
    kind: "template",
    id: "ce2_type_theatral_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "types_textes",
    microId: "ce2_type_theatral",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche la marque qu'on ne trouve que dans ce type de texte.",
    tags: ["ce2", "types-textes", "theatral", "template"],
    generate: () => questionDeLaMarque("theatral"),
  },
  {
    kind: "template",
    id: "ce2_type_theatral_tpl_3",
    niveau: "ce2",
    matiere: "francais",
    notionId: "types_textes",
    microId: "ce2_type_theatral",
    difficulty: 2,
    theme: "neutral",
    hint: "À quoi sert ce texte ? Que veut-il de celui qui le lit ?",
    tags: ["ce2", "types-textes", "theatral", "template"],
    generate: () => questionDuBut("theatral"),
  },
  {
    kind: "template",
    id: "ce2_type_theatral_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "types_textes",
    microId: "ce2_type_theatral",
    difficulty: 3,
    theme: "neutral",
    hint: "Dis ce que tu vois AVANT de lire, puis ce que tu comprends en lisant.",
    tags: ["ce2", "types-textes", "theatral", "ouverte"],
    generate: () => {
      // ⚠️ Ce corps-là est écrit ici, et non appelé depuis une fonction
      // partagée comme ses trois voisins : `verifier-banque.mjs` LIT LE SOURCE
      // et cherche `format: "open"` dans l'item. Factorisé, il ne le voyait
      // plus et rangeait les cinq types dans « sans question ouverte ».
      const e = randomChoice(echantillonsDe("theatral"));
      return {
        text: `Lis cet extrait :

${e.extrait}

De quel type de texte s'agit-il, et à quoi l'as-tu vu ? Explique.`,
        format: "open" as const,
        expected: ["théâtre", "theatre", "réplique", "replique", "personnage", ...e.marque.split(" ").filter((m) => m.length > 5)],
        comparator: "contains_keyword" as const,
        explanation: exp(
          `${LABEL["theatral"].charAt(0).toUpperCase()}${LABEL["theatral"].slice(1)} sert à ${BUT["theatral"]}.`,
          "Regarde d'abord la forme — la mise en page, les retours à la ligne, les noms — puis vérifie avec le sens.",
          `Ici, ${e.marque}.`,
          `C'est ${LABEL["theatral"]} : ${e.marque}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_TYPE_DEFI — les cinq types mélangés
  ========================================================= */
  {
    kind: "template",
    id: "ce2_type_defi_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "types_textes",
    microId: "ce2_type_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde la forme du texte avant d'en lire le sujet.",
    tags: ["ce2", "types-textes", "defi", "template"],
    generate: () => {
      const e = randomChoice(ECHANTILLONS);
      return {
        text: `Lis cet extrait :\n\n${e.extrait}\n\nDe quel type de texte s'agit-il ?`,
        format: "qcm" as const,
        choices: TOUS_TYPES.map((t) => LABEL[t]),
        expected: [LABEL[e.type]],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Il y a cinq types à reconnaitre au CE2 : narratif, informatif, prescriptif, poétique, théâtral.",
          "Regarde la mise en page d'abord, puis demande-toi à quoi le texte sert.",
          `${e.marque} : c'est ${LABEL[e.type]}, qui sert à ${BUT[e.type]}.`,
          `C'est ${LABEL[e.type]}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_type_defi_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "types_textes",
    microId: "ce2_type_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Le sujet ne fait pas le type : un même sujet peut se traiter de cinq façons.",
    tags: ["ce2", "types-textes", "defi", "template"],
    generate: () => {
      const cible = randomChoice(TOUS_TYPES);
      const bon = randomChoice(echantillonsDe(cible));
      const autres = shuffle(TOUS_TYPES.filter((t) => t !== cible))
        .slice(0, 3)
        .map((t) => randomChoice(echantillonsDe(t)).extrait);
      return {
        text: `Lequel de ces extraits est ${LABEL[cible]} ?`,
        format: "qcm" as const,
        choices: shuffle([bon.extrait, ...autres]),
        expected: [bon.extrait],
        comparator: "mcq_exact" as const,
        explanation: exp(
          `${LABEL[cible].charAt(0).toUpperCase()}${LABEL[cible].slice(1)} sert à ${BUT[cible]}.`,
          "Compare les quatre extraits : leur forme te renseigne avant même leur contenu.",
          `Le bon extrait : ${bon.marque}.`,
          `C'est celui où ${bon.marque}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_type_defi_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "types_textes",
    microId: "ce2_type_defi",
    difficulty: 3,
    theme: "neutral",
    text: "On peut écrire sur les baleines un texte documentaire, un poème, ou une scène de théâtre.\n\nQu'est-ce qui changerait dans les trois textes ? Explique.",
    format: "open",
    expected: ["forme", "but", "sert", "chiffres", "vers", "personnage", "réplique", "replique", "rime", "présentation", "presentation"],
    comparator: "contains_keyword",
    hint: "Le sujet serait le même dans les trois. Alors, qu'est-ce qui les distingue ?",
    explanation: exp(
      "Un texte ne se reconnait pas à son sujet, mais à sa forme et à son but.",
      "Devant un texte inconnu, regarde d'abord comment il est posé sur la page, puis demande-toi ce qu'il veut de toi.",
      "Le documentaire donnerait des chiffres et des faits. Le poème irait à la ligne, chercherait des images et des rimes. La scène de théâtre mettrait des noms en capitales, avec des répliques à jouer. Trois textes sur les mêmes baleines, trois formes, trois buts.",
      "Ce sont la forme et le but qui changent, pas le sujet.",
    ),
    tags: ["ce2", "types-textes", "defi", "definition", "ouverte"],
  },
];
