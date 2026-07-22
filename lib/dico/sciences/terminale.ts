import type { FamilleDico, MotDico } from "../types";

// ⚡ Dico Sciences Terminale (CARTES) — enseignement scientifique et spés :
// le vocabulaire neuf de terminale, à l'orthographe qui pique.

function carte(id: string, mot: string, famille: FamilleDico, definition: string, aide?: string): MotDico {
  return { id, mot, famille, definition, defi: { geste: "saisie", question: definition, reponse: mot, aide } };
}

export const motsSciencesTerminale: MotDico[] = [
  carte("term-s-entropie", "Entropie", "sciences-matiere", "La grandeur qui mesure le désordre d'un système."),
  carte("term-s-catalyseur", "Catalyseur", "sciences-matiere", "Il accélère une réaction chimique sans être consommé."),
  carte("term-s-electrolyse", "Électrolyse", "sciences-matiere", "Forcer une réaction chimique grâce au courant électrique."),
  carte("term-s-isotope", "Isotope", "sciences-matiere", "Même élément chimique, nombre de neutrons différent."),
  carte("term-s-radioactivite", "Radioactivité", "sciences-matiere", "La désintégration spontanée de noyaux instables."),
  carte("term-s-photovoltaique", "Photovoltaïque", "sciences-matiere", "Qui transforme la lumière en électricité.", "Attention au tréma sur le ï."),
  carte("term-s-mutation", "Mutation", "sciences-vivant", "Une modification de la séquence d'ADN."),
  carte("term-s-ribosome", "Ribosome", "sciences-vivant", "La machine cellulaire qui fabrique les protéines."),
  carte("term-s-synapse", "Synapse", "sciences-vivant", "La zone de communication entre deux neurones."),
  carte("term-s-immunite", "Immunité", "sciences-vivant", "La capacité de l'organisme à se défendre contre les agents pathogènes."),
  carte("term-s-mitochondrie", "Mitochondrie", "sciences-vivant", "La centrale énergétique de la cellule."),
  carte("term-s-datation", "Datation", "sciences-matiere", "Déterminer l'âge d'une roche ou d'un fossile (ex. au carbone 14)."),
];
