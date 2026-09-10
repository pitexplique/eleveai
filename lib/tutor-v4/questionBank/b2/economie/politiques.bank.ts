import { banqueEconomie, type ConceptEco } from "@/lib/tutor-v4/questionBank/economieBanque";

// ── B2 · Les choix de l'État : dette, relance, élections ────────────────────
// ⛔ AUCUNE MESURE N'EST PRÉSENTÉE COMME LA BONNE. Relance et austérité sont
// définies l'une comme l'autre, sans qu'un adjectif ne tranche : ce sont deux
// choix politiques réels, et une fiche d'exercices n'a pas à voter. Le rôle du
// coach s'arrête à rendre les deux compréhensibles — c'est déjà ce qui manque
// le plus souvent devant un débat télévisé.
const CONCEPTS: readonly ConceptEco[] = [
  {
    slug: "budget-etat",
    term: "Le budget de l'État",
    definition: "Le texte voté chaque année qui fixe ce que l'État encaissera et ce qu'il dépensera",
    situation: "À l'automne, les députés discutent article par article ce que l'année suivante coûtera et rapportera.",
  },
  {
    slug: "depense-publique",
    term: "La dépense publique",
    definition: "L'ensemble de ce que dépensent l'État, les collectivités et la protection sociale",
    situation: "Les salaires des professeurs, les routes et les remboursements de soins sont dans le même total.",
  },
  {
    slug: "deficit-public",
    term: "Le déficit public",
    definition: "L'écart d'une année entre ce que les administrations dépensent et ce qu'elles encaissent",
    situation: "Sur l'année écoulée, il a été dépensé 150 milliards de plus qu'il n'a été perçu.",
  },
  {
    slug: "dette-publique",
    term: "La dette publique",
    definition: "Le total de tout ce qui a été emprunté au fil des années et n'a pas encore été remboursé",
    situation: "Ce n'est pas le trou de cette année, c'est la pile de tous les trous des années passées.",
  },
  {
    slug: "politique-relance",
    term: "La politique de relance",
    definition: "Le choix d'augmenter la dépense publique ou de baisser les impôts pour réveiller l'activité",
    situation: "Face au chômage, le gouvernement lance un plan de travaux et distribue une prime aux ménages.",
  },
  {
    slug: "politique-austerite",
    term: "La politique d'austérité",
    definition: "Le choix de réduire la dépense publique ou d'augmenter les impôts pour combler le déficit",
    situation: "Face à la dette, le gouvernement gèle les embauches, réduit les aides et relève une taxe.",
  },
  {
    slug: "subvention",
    term: "La subvention",
    definition: "Une aide financière versée par la puissance publique à une entreprise ou à une association",
    situation: "Le club de foot du quartier reçoit 8 000 € de la mairie pour acheter ses équipements.",
  },
  {
    slug: "nationalisation",
    term: "La nationalisation",
    definition: "Le passage d'une entreprise privée sous le contrôle de l'État, qui en devient propriétaire",
    situation: "L'État rachète la totalité des parts de l'électricien et en prend la direction.",
  },
  {
    slug: "privatisation",
    term: "La privatisation",
    definition: "La vente d'une entreprise publique à des investisseurs privés",
    situation: "L'État met en vente les parts qu'il détenait dans l'aéroport, et ne décide plus rien à son conseil.",
  },
  {
    slug: "programme-economique",
    term: "Le programme économique",
    definition: "L'ensemble des mesures qu'un candidat s'engage à appliquer s'il est élu",
    situation: "Avant l'élection, chaque camp publie un document chiffré : ce qu'il baissera, ce qu'il financera, et comment.",
  },
];

export const politiquesB2EcoBank = banqueEconomie({
  niveau: "b2",
  notionId: "eco_b2_politiques",
  concepts: CONCEPTS,
  tags: ["economie", "politique-economique", "b2"],
});
