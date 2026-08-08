// app/accueil/metadata.ts — les métadonnées de la page d'entrée.
//
// ⚠️ CE FICHIER A ÉTÉ DU CODE MORT pendant des mois : il existait, il annonçait
// « EleveAI - Comprendre, s'entraîner, progresser », et personne ne l'importait.
// La page portait ses propres métadonnées en dur, à côté. Deux vérités pour un
// seul écran, dont une fausse — et c'est toujours la fausse qu'on lit quand on
// cherche à comprendre. Refait et branché le 06/08/2026 : `page.tsx` réexporte
// ce qui suit, il n'y a plus qu'un endroit à corriger.

import type { Metadata } from "next";

const HERO = "/images/accueil-eleveai-reunion.webp";

// Le titre tel qu'il doit apparaître dans Google, au caractère près.
const TITRE = "EleveAI — exercices, coach et cahiers gratuits, du CP au Bac";

export const metadata: Metadata = {
  // ⭐ `absolute` ET NON une simple chaîne. Le layout applique le gabarit
  // « %s — EleveAI » à tout titre de page ; ce titre-ci commençant déjà par
  // EleveAI, Google recevait « EleveAI — … du CP au Bac — EleveAI », soit
  // 70 caractères dont neuf de répétition pure. Or Google coupe autour de 60 :
  // la marque était écrite deux fois et la fin du titre passait à la trappe.
  // `absolute` dit au gabarit de ne pas s'appliquer ici.
  title: { absolute: TITRE },

  // ⭐ RÉÉCRITE LE 08/08, ET VOICI CE QUI L'A DÉCLENCHÉ.
  //
  // Google a re-crawlé l'entrée refondue en deux jours — c'est rapide, et c'est
  // vérifiable : le résultat de recherche affiche « Qui es-tu ? Élève Parent
  // Enseignant Chef d'établissement. Ta matière. Mathématiques Français… ».
  // Autrement dit, IL A JETÉ CETTE DESCRIPTION ET PRIS LE TEXTE DES BOUTONS.
  //
  // Pourquoi : elle ne disait plus la même chose que la page. Elle annonçait
  // « des ressources vérifiées » quand le titre de la page dit « conçues,
  // sélectionnées et vérifiées ». Quand la description ne colle pas au contenu
  // visible, Google la remplace par ce qu'il trouve à l'écran — et sur une page
  // de 68 mots, ce qu'il trouve, ce sont des libellés de pastilles.
  //
  // ⚠️ RIEN NE GARANTIT QU'IL LA REPRENNE. L'aligner sur la promesse est le
  // seul levier qu'on tient ; le choix final lui appartient. Ce qui est sûr,
  // c'est qu'une description qui contredit la page ne sera jamais retenue.
  //
  // La forme suit ChatGPT, Claude et IXL, comparés le 08/08 : « Use ChatGPT
  // to… », « Claude is… », « IXL is… ». Les trois mettent LA MARQUE DANS LES
  // TROIS PREMIERS MOTS, puis un verbe, puis du concret. Ici : « EleveAI te
  // propose… ». La phrase d'action — « Dis qui tu es et ce que tu cherches » —
  // vient en deuxième, parce qu'elle ne veut rien dire tant qu'on n'a pas dit
  // de qui elle vient. 143 signes : Google coupe autour de 155.
  description:
    "EleveAI te propose des ressources pédagogiques conçues, sélectionnées et vérifiées. Dis qui tu es et ce que tu cherches. Du CP au Bac, gratuit.",

  // ⭐ La SEULE canonique du site posée à la main, et elle est légitime :
  // la racine `/` répond 308 vers `/accueil`, donc deux adresses mènent
  // réellement ici et il faut désigner la bonne. Partout ailleurs, ne rien
  // déclarer — une page se désigne elle-même. Voir la note dans app/layout.tsx.
  alternates: { canonical: "/accueil" },

  keywords: [
    "EleveAI",
    "coach scolaire IA",
    "exercices corrigés gratuits",
    "cahier de vacances à imprimer",
    "soutien scolaire gratuit",
    "maths",
    "français",
    "anglais",
    "espagnol",
    "du CP au Bac",
    "la réunion",
  ],

  openGraph: {
    title: TITRE,
    // Même promesse, au mot près. Trois formulations du même engagement sur
    // trois surfaces, c'est l'engagement qu'on cesse de croire — et celle-ci
    // est lue quand quelqu'un PARTAGE le lien, donc quand il en répond.
    description:
      "EleveAI te propose des ressources pédagogiques conçues, sélectionnées et vérifiées. Dis qui tu es et ce que tu cherches. Du CP au Bac, gratuit.",
    url: "/accueil",
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",
    images: [
      {
        url: HERO,
        width: 1680,
        height: 945,
        alt: "EleveAI — l'entrée du site : dis qui tu es et ce que tu cherches",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: TITRE,
    description:
      "Dis qui tu es et ce que tu veux faire aujourd'hui : EleveAI cherche parmi des ressources relues par un enseignant celles qui peuvent vraiment t'aider.",
    images: [HERO],
  },
};
