// Les réservoirs des notions MAISON — ce que Pix ne demande pas.
//
// Voir ./maison.ts pour la raison d'être de cette séparation. Ici, seulement du
// contenu, écrit avec les mêmes helpers que le reste du coach : un cas concret,
// quatre réactions de longueur comparable, et des distracteurs qui sont des
// erreurs qu'un élève fait vraiment.
//
// ⚠️ Ces gabarits déclarent EUX-MÊMES leur niveau et leur difficulté. Ceux de
// Pix les déduisent du palier du savoir-faire (`pixMicroskill`) — impossible
// ici, puisque ces savoir-faire n'existent pas au référentiel. Sans cette
// déclaration explicite, la conversion les écarterait en silence.

import { classer, corriger, situation, type PixGabarit } from "@/lib/pix-ia/gabarits/socle";
import type { DifficultyLevel } from "@/lib/tutor-v4/types";
import type { PixNiveauCoach } from "@/lib/tutor-v4/knowledge/ia/pix/socle";

export type GabaritMaison = {
  gabarit: PixGabarit;
  niveaux: PixNiveauCoach[];
  difficulty: DifficultyLevel;
};

export const GABARITS_MAISON: GabaritMaison[] = [
  // ── m.1.1 Aide autorisée, aide limite, triche ────────────────────────────
  {
    niveaux: ["college", "lycee"],
    difficulty: 2,
    gabarit: classer({
      id: "g_m_1_1_limite",
      microskillId: "m.1.1",
      consigne: "Dans ce cas précis, de quoi s'agit-il ?",
      familles: [
        "une aide autorisée : je comprends mieux, le travail reste le mien",
        "une aide limite : à ne faire que si le professeur l'autorise",
        "de la triche : je rends un travail que je n'ai pas fait",
        "aucune aide : l'IA n'apporte rien ici",
      ],
      pool: [
        {
          cas: "Je demande à l'IA d'expliquer autrement une règle que je n'ai pas comprise en cours.",
          famille: "une aide autorisée : je comprends mieux, le travail reste le mien",
          pourquoi: "Comprendre reste le but de l'école. Personne ne fait le travail à ma place.",
        },
        {
          cas: "Je fais rédiger par l'IA la conclusion de ma rédaction, et je la rends telle quelle.",
          famille: "de la triche : je rends un travail que je n'ai pas fait",
          pourquoi: "Le devoir doit montrer ce que JE sais écrire. Ici il montre autre chose.",
        },
        {
          cas: "Je rédige mon devoir, puis je demande à l'IA de corriger mes fautes d'orthographe.",
          famille: "une aide limite : à ne faire que si le professeur l'autorise",
          pourquoi:
            "Sur un devoir de français, l'orthographe EST évaluée. Ailleurs c'est souvent accepté : la limite dépend de ce qui est noté.",
        },
        {
          cas: "Je demande à l'IA de me poser cinq questions sur le chapitre pour vérifier mes révisions.",
          famille: "une aide autorisée : je comprends mieux, le travail reste le mien",
          pourquoi: "Se faire interroger est une méthode de travail, pas une délégation.",
        },
        {
          cas: "Je copie l'énoncé d'un exercice noté à faire à la maison et je rends la réponse de l'IA.",
          famille: "de la triche : je rends un travail que je n'ai pas fait",
          pourquoi: "L'exercice sert à mesurer ce que je sais faire. La réponse rendue n'est pas la mienne.",
        },
        {
          cas: "Je demande à l'IA de reformuler MON paragraphe pour qu'il soit plus clair, et je choisis ce que je garde.",
          famille: "une aide limite : à ne faire que si le professeur l'autorise",
          pourquoi:
            "L'idée est de moi, l'écriture devient partagée. Selon ce qui est évalué, c'est accepté ou non — donc on demande.",
        },
        {
          cas: "Je demande à l'IA de m'expliquer POURQUOI ma réponse était fausse, après la correction.",
          famille: "une aide autorisée : je comprends mieux, le travail reste le mien",
          pourquoi: "Comprendre son erreur après coup est exactement ce qu'on attend d'un élève.",
        },
        {
          cas: "Pendant un contrôle sur table, je consulte l'IA sur mon téléphone.",
          famille: "de la triche : je rends un travail que je n'ai pas fait",
          pourquoi: "Un contrôle mesure ce que je sais seul, à cet instant. Il n'y a pas de zone grise ici.",
        },
      ],
    }),
  },

  // ── m.1.2 Dire ce que l'IA a fait ────────────────────────────────────────
  {
    niveaux: ["college", "lycee"],
    difficulty: 2,
    gabarit: situation({
      id: "g_m_1_2_dire",
      microskillId: "m.1.2",
      consigne: "Qu'est-ce que tu écris, et où ?",
      pool: [
        {
          cas: "Tu as demandé un plan à l'IA, puis tu as tout rédigé toi-même.",
          bonne: "le dire en une ligne : « plan proposé par une IA, texte rédigé par moi »",
          pieges: [
            "ne rien dire : le texte est de toi, c'est ce qui compte",
            "écrire seulement « fait avec l'IA », sans préciser quoi",
            "citer l'IA comme on cite un auteur, dans la bibliographie",
          ],
          pourquoi:
            "Ce qui est utile au professeur, c'est de savoir CE QUE l'outil a fait. « Fait avec l'IA » ne dit rien.",
        },
        {
          cas: "Tu as fait traduire un paragraphe en anglais pour un exposé.",
          bonne: "indiquer que ce paragraphe est une traduction automatique que tu as relue",
          pieges: [
            "ne rien dire : une traduction n'est pas une production personnelle",
            "l'indiquer seulement si le professeur pose la question",
            "réécrire quelques mots pour ne plus avoir à le signaler",
          ],
          pourquoi:
            "Réécrire quelques mots pour masquer l'origine, c'est le geste qui transforme une aide en tricherie.",
        },
        {
          cas: "L'IA t'a donné une idée que tu as ensuite entièrement développée et vérifiée.",
          bonne: "le mentionner : d'où vient l'idée fait partie du travail",
          pieges: [
            "ne rien dire : l'idée seule ne compte pas, c'est le développement qui vaut",
            "présenter l'idée comme la tienne, puisque tu l'as développée",
            "signaler l'IA sans dire ce qu'elle a apporté précisément",
          ],
          pourquoi:
            "Dire d'où vient une idée est une habitude de travail, et elle ne coûte rien à celui qui a fait le reste.",
        },
        {
          cas: "Tu as utilisé l'IA pour réviser, mais rien de ce qu'elle a écrit n'apparaît dans ton devoir.",
          bonne: "rien à signaler : elle ne figure pas dans ce que tu rends",
          pieges: [
            "le signaler quand même, par honnêteté envers le professeur",
            "le signaler si tu as passé plus d'une heure à réviser avec elle",
            "le signaler, car tout usage de l'IA doit être déclaré",
          ],
          pourquoi:
            "On déclare ce qui entre dans le travail rendu. Tout déclarer noierait ce qui compte vraiment.",
        },
        {
          cas: "Une image générée par IA illustre ton exposé.",
          bonne: "l'écrire sous l'image : sans mention, elle passe pour une photo",
          pieges: [
            "ne rien dire : c'est une illustration, pas un argument",
            "indiquer le nom du service utilisé, ce qui suffit comme mention",
            "l'indiquer seulement si l'image représente une scène réaliste",
          ],
          pourquoi:
            "Une image non signalée est prise pour un document. C'est exactement ce que la mention empêche.",
        },
        {
          cas: "Un camarade te dit que personne ne vérifie, donc que ça ne sert à rien de le dire.",
          bonne: "le dire n'est pas fait pour le contrôle : c'est ce qui distingue ton travail d'un copié-collé",
          pieges: [
            "il a raison : sans vérification, la mention n'a aucune utilité",
            "il a raison, mais il vaut mieux le dire pour éviter les ennuis",
            "il a tort : les professeurs détectent toujours l'usage de l'IA",
          ],
          pourquoi:
            "⚠️ Les outils de détection se trompent souvent, dans les deux sens. La raison de le dire n'est pas la peur d'être pris.",
        },
      ],
    }),
  },

  // ── m.1.3 Ce qu'on perd à déléguer ───────────────────────────────────────
  {
    niveaux: ["college", "lycee"],
    difficulty: 3,
    gabarit: corriger({
      id: "g_m_1_3_deleguer",
      microskillId: "m.1.3",
      pool: [
        {
          affirmation: "Si l'IA écrit mon devoir aussi bien que moi, le résultat est le même.",
          bonne: "le devoir sert à t'entraîner : le résultat visé n'est pas la copie, c'est ce que tu sais après",
          pieges: [
            "c'est exact, à condition de relire attentivement ce qu'elle a écrit",
            "c'est exact pour un devoir maison, faux pour un contrôle en classe",
            "c'est faux : une IA n'écrit jamais aussi bien qu'un élève",
          ],
          pourquoi:
            "Confondre le devoir et son objet est l'erreur de fond. On ne fait pas des pompes pour que les pompes soient faites.",
        },
        {
          affirmation: "Utiliser l'IA pour tout me fait gagner du temps que j'emploie mieux ailleurs.",
          bonne: "le temps gagné sur un exercice est justement celui où l'on apprenait",
          pieges: [
            "c'est exact : le temps libéré permet de travailler d'autres matières",
            "c'est exact si l'on relit et comprend ce que l'IA a produit",
            "c'est faux : utiliser l'IA prend en réalité plus de temps",
          ],
          pourquoi:
            "Chercher, se tromper, recommencer : c'est le moment inconfortable qui fait apprendre. C'est celui-là qu'on supprime.",
        },
        {
          affirmation: "Je comprends très bien quand je lis l'explication de l'IA.",
          bonne: "comprendre en lisant et savoir refaire sont deux choses : c'est l'illusion de maîtrise",
          pieges: [
            "c'est exact : si l'explication est claire, la notion est acquise",
            "c'est exact, à condition de relire l'explication plusieurs fois",
            "c'est faux : on ne comprend jamais rien sans son professeur",
          ],
          pourquoi:
            "Ce piège est documenté et très courant : la fluidité de la lecture se prend pour de la compréhension. La preuve, c'est de refaire sans le texte.",
        },
        {
          affirmation: "Puisque l'IA existera toujours, apprendre à faire sans elle ne sert plus.",
          bonne: "juger ce qu'elle produit demande de savoir le faire : sans quoi on ne peut plus la contrôler",
          pieges: [
            "c'est exact : ce qui compte désormais est de savoir s'en servir",
            "c'est exact pour le calcul, faux pour la rédaction",
            "c'est faux : l'IA ne sera pas toujours disponible",
          ],
          pourquoi:
            "Un élève qui ne sait pas rédiger ne voit pas qu'un texte est creux. La compétence est ce qui permet de juger l'outil.",
        },
        {
          affirmation: "Déléguer une tâche à l'IA est comme utiliser une calculatrice.",
          bonne: "la comparaison tient quand la compétence est acquise, pas quand elle est en train de s'acquérir",
          pieges: [
            "c'est exact : les deux sont des outils qui font gagner du temps",
            "c'est faux : une calculatrice ne se trompe jamais, contrairement à l'IA",
            "c'est exact, et c'est pourquoi les deux devraient être autorisés partout",
          ],
          pourquoi:
            "On donne une calculatrice APRÈS avoir appris à poser une multiplication. L'ordre n'est pas un détail.",
        },
        {
          affirmation: "Si je relis et corrige ce que l'IA écrit, j'ai fait le travail.",
          bonne: "relire est plus facile que produire : ce n'est pas le même effort, ni le même apprentissage",
          pieges: [
            "c'est exact : corriger demande de maîtriser la notion",
            "c'est exact si l'on modifie une part importante du texte",
            "c'est faux : relire ne sert absolument à rien",
          ],
          pourquoi:
            "Relire est utile, et ce n'est pas produire. Reconnaître une bonne phrase demande moins que la trouver.",
        },
      ],
    }),
  },
];
