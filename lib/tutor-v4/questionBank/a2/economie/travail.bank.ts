import { banqueEconomie, type ConceptEco } from "@/lib/tutor-v4/questionBank/economieBanque";

// ── A2 · Le travail : salaire et contrat ────────────────────────────────────
// ⚠️ Les cotisations sociales sont nommées dans la définition du salaire net,
// mais elles ne s'apprennent qu'en B1, avec ce qu'elles paient : la santé, la
// retraite, le chômage. Ici on constate le prélèvement, là-bas on l'explique.
const CONCEPTS: readonly ConceptEco[] = [
  {
    slug: "salaire-brut",
    term: "Le salaire brut",
    definition: "Le salaire annoncé dans le contrat, avant que les cotisations n'en soient retirées",
    situation: "Le contrat annonce 2 000 € par mois — c'est le chiffre écrit avant toute retenue.",
  },
  {
    slug: "salaire-net",
    term: "Le salaire net",
    definition: "La somme qui arrive réellement sur le compte du salarié à la fin du mois",
    situation: "Le contrat annonçait 2 000 €, et 1 560 € sont arrivés sur le compte.",
  },
  {
    slug: "smic",
    term: "Le SMIC",
    definition: "Le salaire horaire minimum en dessous duquel aucun employeur n'a le droit de descendre",
    situation: "Le patron voulait payer 8 € de l'heure : la loi le lui interdit.",
  },
  {
    slug: "cdi",
    term: "Le CDI",
    definition: "Un contrat de travail sans date de fin prévue à l'avance",
    situation: "Elle est embauchée sans qu'aucune date de départ ne figure nulle part.",
  },
  {
    slug: "cdd",
    term: "Le CDD",
    definition: "Un contrat de travail dont la date de fin est fixée dès la signature",
    situation: "Il est embauché du 1er juillet au 31 août pour la saison, et cela est écrit noir sur blanc.",
  },
  {
    slug: "employeur",
    term: "L'employeur",
    definition: "Celui qui embauche, donne le travail à faire et verse le salaire",
    situation: "C'est lui qui a signé le contrat de l'autre côté, et qui paie à la fin du mois.",
  },
  {
    slug: "salarie",
    term: "Le salarié",
    definition: "Celui qui travaille pour quelqu'un d'autre, contre un salaire et selon ses consignes",
    situation: "Il arrive à 8 heures, fait le travail qu'on lui demande, et reçoit 1 560 € à la fin du mois.",
  },
  {
    slug: "chomage",
    term: "Le chômage",
    definition: "La situation d'une personne sans emploi, disponible, et qui en cherche activement un",
    situation: "Depuis la fermeture du magasin, elle envoie des candidatures chaque semaine et n'a toujours rien.",
  },
  {
    slug: "syndicat",
    term: "Le syndicat",
    definition: "Une organisation qui défend les intérêts des travailleurs face aux employeurs",
    situation: "Les salariés se regroupent pour aller négocier ensemble les horaires du dimanche.",
  },
  {
    slug: "alternance",
    term: "L'alternance",
    definition: "Une formation qui partage la semaine entre l'école et l'entreprise, avec un salaire",
    situation: "Elle est trois jours au lycée et deux jours au garage, et reçoit une paie chaque mois.",
  },
];

export const travailA2EcoBank = banqueEconomie({
  niveau: "a2",
  notionId: "eco_a2_travail",
  concepts: CONCEPTS,
  tags: ["economie", "travail", "a2"],
});
