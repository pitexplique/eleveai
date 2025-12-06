// data/vieScolairePresets.ts

export type CategorieVieScolaire =
  | "conflit"
  | "harcelement"
  | "retards_absences"
  | "sanction_educative"
  | "encouragement"
  | "suivi_eleve"
  | "communication_famille"
  | "protocole";

export type PublicCibleVieScolaire = "eleve" | "famille" | "equipe_educative";

export type Tonalite =
  | "bienveillant"
  | "ferme"
  | "neutre"
  | "apaisant"
  | "valorisant";

export type ObjectifTexte =
  | "rappel_reglement"
  | "mediation"
  | "compte_rendu"
  | "information"
  | "signalement"
  | "felicitation"
  | "plan_suivi";

export type VieScolairePreset = {
  id: string;
  titre: string;
  categorie: CategorieVieScolaire;
  publicCible: PublicCibleVieScolaire;
  tonalite: Tonalite;
  objectif: ObjectifTexte;
  description: string;
  canevas: string; // prompt modèle avec variables
  tags?: string[];
};

// Pour alimenter les menus déroulants facilement
export const CATEGORIES_VIE_SCOLAIRE: { value: CategorieVieScolaire; label: string }[] = [
  { value: "conflit", label: "Conflit entre élèves" },
  { value: "harcelement", label: "Suspicion / signalement de harcèlement" },
  { value: "retards_absences", label: "Retards / absences" },
  { value: "sanction_educative", label: "Sanction éducative" },
  { value: "encouragement", label: "Encouragement / félicitations" },
  { value: "suivi_eleve", label: "Suivi d'un élève" },
  { value: "communication_famille", label: "Communication avec la famille" },
  { value: "protocole", label: "Protocole / cadre institutionnel" },
];

export const PUBLICS_VIE_SCOLAIRE: { value: PublicCibleVieScolaire; label: string }[] = [
  { value: "eleve", label: "Élève" },
  { value: "famille", label: "Famille / responsables légaux" },
  { value: "equipe_educative", label: "Équipe éducative / vie scolaire" },
];

export const TONALITES: { value: Tonalite; label: string }[] = [
  { value: "bienveillant", label: "Bienveillant" },
  { value: "apaisant", label: "Apaisant" },
  { value: "ferme", label: "Ferme mais respectueux" },
  { value: "neutre", label: "Neutre / factuel" },
  { value: "valorisant", label: "Valorisant / positif" },
];

export const VIE_SCOLAIRE_PRESETS: VieScolairePreset[] = [
  {
    id: "conflit-eleve-mediation",
    titre: "Message de médiation après un conflit",
    categorie: "conflit",
    publicCible: "eleve",
    tonalite: "apaisant",
    objectif: "mediation",
    description:
      "Formuler un message pour un élève après un conflit afin de l’apaiser, rappeler le cadre et proposer une médiation.",
    canevas: `
Tu es CPE dans un collège/lycée en France. 
Tu rédiges un message à destination d'un élève après un conflit.

Contexte de la situation :
{{contexte}}

Contraintes :
- Ton {{tonalite}} et respectueux.
- Rappeler le cadre de façon claire mais non humiliante.
- Proposer un temps d'échange ou de médiation.
- Valoriser la possibilité de réparer et d'améliorer la situation.

Structure :
1. Rappel bref et factuel de la situation, sans juger les personnes.
2. Rappel des règles de l'établissement en lien avec la situation.
3. Proposition concrète de médiation ou de rendez-vous.
4. Message de confiance dans la capacité de l'élève à évoluer positivement.

Rédige le message complet, prêt à être copié-collé.`,
    tags: ["conflit", "médiation", "CPE", "collège", "lycée"],
  },
  {
    id: "harcelement-famille-signalement",
    titre: "Courriel aux familles – suspicion de harcèlement",
    categorie: "harcelement",
    publicCible: "famille",
    tonalite: "bienveillant",
    objectif: "signalement",
    description:
      "Informer une famille d’une situation préoccupante sans accuser, rappeler le cadre légal, proposer un rendez-vous.",
    canevas: `
Tu es membre de l'équipe de vie scolaire dans un établissement scolaire français.

Tu rédiges un courriel aux responsables légaux d'un élève au sujet d'une situation de possible harcèlement.

Contexte de la situation :
{{contexte}}

Contraintes :
- Ton {{tonalite}}, prudent et professionnel.
- Ne jamais accuser directement un élève nommément sans éléments établis.
- Rappeler le cadre de la lutte contre le harcèlement et le rôle de l'établissement.
- Proposer un rendez-vous ou un temps d'échange avec la famille.
- Mentionner l'importance de la collaboration famille/école.

Structure du courriel :
1. Formule d'appel et contextualisation.
2. Présentation factuelle des préoccupations (sans dramatiser ni minimiser).
3. Rappel du cadre réglementaire concernant le harcèlement scolaire.
4. Proposition concrète de rencontre ou d’échange.
5. Formule de politesse.

Rédige le courriel complet, avec un objet pertinent.`,
    tags: ["harcèlement", "famille", "courriel", "prévention"],
  },
  {
    id: "retards-eleve-rappel-cadre",
    titre: "Rappel des règles sur les retards",
    categorie: "retards_absences",
    publicCible: "eleve",
    tonalite: "ferme",
    objectif: "rappel_reglement",
    description:
      "Message pour rappeler à un élève les règles sur les retards, sans le rabaisser.",
    canevas: `
Tu es assistant d'éducation dans un établissement scolaire.

Tu dois rédiger un message à un élève qui accumule les retards.

Contexte :
{{contexte}}

Contraintes :
- Ton {{tonalite}} mais respectueux.
- Rappel clair des conséquences des retards (pédagogiques et réglementaires).
- Proposer une solution (prise de rendez-vous, point sur l'organisation).
- Éviter les jugements sur la personne, se concentrer sur les faits et les comportements.

Rédige un message court (10 à 15 lignes), prêt à être communiqué à l'élève.`,
    tags: ["retards", "vie scolaire", "rappel des règles"],
  },
  {
    id: "sanction-famille-compte-rendu",
    titre: "Compte-rendu d’une sanction éducative",
    categorie: "sanction_educative",
    publicCible: "famille",
    tonalite: "neutre",
    objectif: "compte_rendu",
    description:
      "Informer la famille d’une sanction éducative en expliquant le sens pédagogique.",
    canevas: `
Tu es CPE dans un collège ou un lycée.

Tu rédiges un compte-rendu destiné aux responsables légaux après une sanction éducative.

Contexte :
{{contexte}}

Contraintes :
- Ton {{tonalite}}, clair et professionnel.
- Présenter les faits de manière factuelle, sans exagération.
- Expliquer le choix de la sanction comme mesure éducative (et non punitive seulement).
- Évoquer les objectifs de la sanction (réparation, prise de conscience, cadre).
- Ouvrir sur une collaboration avec la famille si nécessaire.

Rédige un texte structuré avec :
1. Rappel du contexte.
2. Description de la sanction éducative.
3. Sens pédagogique de la mesure.
4. Invitation à contacter l'établissement si besoin.`,
    tags: ["sanction éducative", "famille", "compte-rendu"],
  },
  {
    id: "encouragement-eleve-progres",
    titre: "Message d’encouragement pour un élève en progrès",
    categorie: "encouragement",
    publicCible: "eleve",
    tonalite: "valorisant",
    objectif: "felicitation",
    description:
      "Mettre en avant les progrès d’un élève qui revenait souvent en vie scolaire.",
    canevas: `
Tu es membre de l'équipe de vie scolaire.

Tu écris un message d'encouragement à un élève qui a fait des efforts récents (moins de retards, meilleure attitude, conflits apaisés, etc.).

Contexte :
{{contexte}}

Contraintes :
- Ton {{tonalite}}.
- Être précis sur les progrès constatés.
- Mettre en avant les effets positifs pour l’élève et pour le climat de classe.
- Encourager à poursuivre ces efforts.

Rédige un message positif, court et motivant (8 à 12 lignes).`,
    tags: ["encouragement", "progrès", "climat scolaire"],
  },
  {
    id: "suivi-eleve-equipe",
    titre: "Compte rendu de suivi pour équipe éducative",
    categorie: "suivi_eleve",
    publicCible: "equipe_educative",
    tonalite: "neutre",
    objectif: "plan_suivi",
    description:
      "Synthèse de suivi d’un élève fragile pour un conseil de classe ou une réunion éducative.",
    canevas: `
Tu es CPE et tu rédiges une synthèse de suivi pour présenter un élève lors d'une réunion d'équipe éducative ou d'un conseil de classe.

Contexte :
{{contexte}}

Contraintes :
- Ton {{tonalite}}, factuel et professionnel.
- Respect absolu de la confidentialité (pas de détails inutiles sur la vie privée).
- Mettre en avant : 
  - faits observables (retards, absences, comportements),
  - mesures mises en place,
  - effets observés,
  - pistes de travail.

Structure :
1. Brève présentation de l’élève (niveau, contexte scolaire).
2. Faits marquants de la période.
3. Mesures / aménagements déjà mis en place.
4. Effets observés.
5. Propositions ou besoins pour la suite.

Rédige un texte clair et synthétique (20 à 30 lignes).`,
    tags: ["suivi", "équipe éducative", "conseil de classe"],
  },
  {
    id: "communication-famille-info-generale",
    titre: "Information générale aux familles – rappel du cadre de vie scolaire",
    categorie: "communication_famille",
    publicCible: "famille",
    tonalite: "bienveillant",
    objectif: "information",
    description:
      "Note générale aux familles pour rappeler quelques règles clés de vie scolaire.",
    canevas: `
Tu es chef d'établissement adjoint ou CPE.

Tu rédiges une information générale aux familles concernant le cadre de la vie scolaire.

Contexte :
{{contexte}}

Contraintes :
- Ton {{tonalite}}, clair, lisible, non culpabilisant.
- Se concentrer sur quelques règles clés (retards, absences, respect, usage du téléphone, etc.).
- Rappeler que le but est de créer un climat serein pour les apprentissages.
- Inviter les familles à dialoguer avec l'établissement en cas de difficulté.

Rédige un texte utilisable comme note aux familles (ou message ENT), avec un titre et des paragraphes courts.`,
    tags: ["note familles", "règlement intérieur", "vie scolaire"],
  },
  {
    id: "protocole-equipe-reglement",
    titre: "Rédaction d’un protocole interne de vie scolaire",
    categorie: "protocole",
    publicCible: "equipe_educative",
    tonalite: "neutre",
    objectif: "rappel_reglement",
    description:
      "Canevas pour écrire un protocole interne (retards, exclusions ponctuelles, passages en vie scolaire).",
    canevas: `
Tu es membre de l'équipe de direction et tu rédiges un projet de protocole interne de vie scolaire.

Contexte :
{{contexte}}

Objectif :
Proposer un texte structuré qui pourra être retravaillé en équipe, décrivant les étapes de prise en charge :
- retards,
- exclusions ponctuelles de cours,
- conduites en vie scolaire,
- information aux familles,
- traçabilité.

Contraintes :
- Ton {{tonalite}}, institutionnel et clair.
- Utiliser une structure avec titres et sous-titres.
- Rester conforme à l'esprit du règlement intérieur et du cadre réglementaire.

Rédige un projet de protocole détaillé, avec une structure claire (titres, sous-titres, puces).`,
    tags: ["protocole", "règlement", "direction", "vie scolaire"],
  },
];
