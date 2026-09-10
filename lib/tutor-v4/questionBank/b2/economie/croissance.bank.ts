import { banqueEconomie, type ConceptEco } from "@/lib/tutor-v4/questionBank/economieBanque";

// ── B2 · Croissance, PIB et emploi ──────────────────────────────────────────
// ⚠️ « PIB » et « PIB par habitant » sont volontairement voisins : c'est la
// confusion la plus fréquente, et la seule façon de la travailler est de les
// mettre côte à côte dans la même liste de propositions.
const CONCEPTS: readonly ConceptEco[] = [
  {
    slug: "pib",
    term: "Le PIB",
    definition: "La somme des richesses créées en un an sur le territoire d'un pays",
    situation: "En additionnant ce que chaque entreprise, administration et association a réellement créé, on obtient 2 800 milliards d'euros.",
  },
  {
    slug: "pib-habitant",
    term: "Le PIB par habitant",
    definition: "La richesse créée en un an dans un pays, divisée par le nombre de personnes qui y vivent",
    situation: "Deux pays produisent autant, mais l'un compte 5 millions d'habitants et l'autre 60 : c'est ce calcul qui les sépare.",
  },
  {
    slug: "croissance",
    term: "La croissance économique",
    definition: "L'augmentation, d'une année sur l'autre, des richesses produites par un pays",
    situation: "Le pays a produit 1,3 % de plus cette année que l'an dernier.",
  },
  {
    slug: "recession",
    term: "La récession",
    definition: "Le recul de la production d'un pays pendant au moins six mois consécutifs",
    situation: "Deux trimestres de suite, le pays a produit moins que le trimestre précédent.",
  },
  {
    slug: "niveau-de-vie",
    term: "Le niveau de vie",
    definition: "Ce qu'un habitant peut se procurer avec ses revenus, une fois les prix pris en compte",
    situation: "Son salaire a augmenté de 2 %, mais tout coûte 4 % de plus : il peut s'offrir moins qu'avant.",
  },
  {
    slug: "population-active",
    term: "La population active",
    definition: "L'ensemble des personnes qui travaillent ou qui cherchent un emploi",
    situation: "On y compte les salariés et ceux qui cherchent, mais ni les collégiens ni les retraités.",
  },
  {
    slug: "taux-chomage",
    term: "Le taux de chômage",
    definition: "La part de ceux qui cherchent un emploi parmi ceux qui travaillent ou en cherchent",
    situation: "Sur 100 personnes qui travaillent ou cherchent du travail, 7 n'ont rien trouvé.",
  },
  {
    slug: "exportations",
    term: "Les exportations",
    definition: "Ce qu'un pays vend à l'étranger",
    situation: "Le sucre et le rhum de l'île partent en conteneurs vers l'Europe et sont payés de là-bas.",
  },
  {
    slug: "importations",
    term: "Les importations",
    definition: "Ce qu'un pays achète à l'étranger",
    situation: "Les céréales, les voitures et les téléphones arrivent au port et sont payés à l'extérieur.",
  },
  {
    slug: "balance-commerciale",
    term: "La balance commerciale",
    definition: "La différence entre ce qu'un pays vend à l'étranger et ce qu'il lui achète",
    situation: "Le pays a vendu pour 500 milliards et acheté pour 580 : l'écart est de 80 milliards, en sa défaveur.",
  },
];

export const croissanceB2EcoBank = banqueEconomie({
  niveau: "b2",
  notionId: "eco_b2_croissance",
  concepts: CONCEPTS,
  tags: ["economie", "croissance", "b2"],
});
