// data/adminPrompts.ts

export type AdminPrompt = {
  id: string;
  title: string;
  subtitle?: string;
  body: string;
  accent: "emerald" | "sky" | "amber" | "violet" | "rose" | "indigo" | "red" | "cyan";
};

export type AdminPromptSection = {
  id: string;
  title: string;
  description: string;
  prompts: AdminPrompt[];
};

export const ADMIN_PROMPT_SECTIONS: AdminPromptSection[] = [
  {
    id: "documents",
    title: "1. Résumer et adapter les documents pour les familles et les élèves",
    description:
      "Pour transformer un texte administratif long (circulaire, note de 10 pages, compte rendu…) en une version compréhensible pour les familles ou exploitable par les élèves avec une IA.",
    prompts: [
      {
        id: "resume-long",
        title: "✅ Résumer un document long (jusqu’à 10 pages) pour les familles",
        subtitle:
          "Pour transformer un document officiel très long en un message clair, court et actionnable pour les parents.",
        accent: "emerald",
        body: `Tu es un assistant spécialisé en communication scolaire.
À partir du texte suivant (qui peut faire plusieurs pages), produis un message à destination des familles :

- commence par un court résumé en 5 lignes maximum ;
- liste ensuite en puces les informations essentielles (dates, lieux, démarches, personnes concernées) ;
- indique clairement ce que les familles doivent faire (ou ne pas faire) ;
- utilise des phrases courtes et un vocabulaire simple ;
- ton bienveillant et professionnel.

Texte à résumer puis adapter :
"COLLER ICI LE TEXTE COMPLET DU DOCUMENT (NOTE / CIRCULAIRE / COURRIER OFFICIEL)"`,
      },
      {
        id: "families-dys",
        title: "✅ Message aux familles – version claire & DYS-friendly",
        subtitle:
          "Copier-coller ce prompt, puis ajouter votre texte brut à la fin.",
        accent: "emerald",
        body: `Tu es un assistant spécialisé en communication scolaire.
Réécris le texte suivant pour des familles :
- phrases courtes ;
- vocabulaire simple, sans jargon administratif ;
- structure claire : objet, informations essentielles, démarches à suivre ;
- mise en forme avec des puces si nécessaire ;
- ton bienveillant et professionnel.

Texte à simplifier :
"COLLER ICI VOTRE TEXTE DE DÉPART"`,
      },
      {
        id: "ia-friendly-eleves",
        title:
          "✅ Version IA-friendly pour que les élèves puissent le faire expliquer par l’IA",
        subtitle:
          "Pour produire un texte bien structuré et facile à résumer ou à questionner avec une IA.",
        accent: "sky",
        body: `Réécris le texte suivant pour qu'il soit facile à traiter par une IA utilisée par un élève :
- structure le texte avec des titres et sous-titres clairs ;
- numérote les étapes importantes ;
- mets en évidence les dates, horaires, lieux et personnes clés ;
- évite les phrases de plus de 20 mots.

Texte à restructurer :
"COLLER ICI VOTRE TEXTE DE DÉPART"`,
      },
      {
        id: "convocation-double-version",
        title: "✅ Convocation officielle + version simplifiée pour les familles",
        subtitle:
          "Pour obtenir automatiquement une version formelle + une version simplifiée.",
        accent: "amber",
        body: `À partir des informations ci-dessous, produis deux versions d'un même message :
1) Une version "courrier officiel" pour les archives de l'établissement.
2) Une version "explication simple pour les familles" :
   - phrases courtes,
   - informations essentielles d'abord,
   - ton bienveillant.

Informations à utiliser :
"COLLER ICI LES INFORMATIONS (date, lieu, motif, personne concernée, etc.)"`,
      },
    ],
  },
  {
    id: "messages-familles",
    title: "2. Messages aux familles (Pronote / ENT / mails)",
    description:
      "Modèles pour les sorties, rappels de règlement, incidents, félicitations et communication officielle sur l’IA.",
    prompts: [
      {
        id: "sortie-scolaire",
        title: "✅ Information aux familles pour une sortie scolaire",
        subtitle:
          "Pour annoncer clairement une sortie ou un projet (collège / lycée).",
        accent: "violet",
        body: `Rédige un message aux familles pour annoncer une sortie scolaire.
Contraintes :
- préciser le niveau de classe, la date, le lieu, le coût éventuel, l'organisation pratique ;
- indiquer les objectifs pédagogiques en 2 ou 3 points simples ;
- rappeler les documents à rendre (autorisation, règlement, paiement, etc.) ;
- ton positif, rassurant et professionnel ;
- texte adapté à être collé dans un courrier Pronote / École directe.

Informations à utiliser :
"NIVEAU / CLASSE : ..."
"DATE ET HORAIRES : ..."
"LIEU / ACTIVITÉ : ..."
"OBJECTIFS PÉDAGOGIQUES : ..."
"DOCUMENTS À RENDRE : ..."`,
      },
      {
        id: "rappel-reglement",
        title: "✅ Message de rappel du règlement / comportement",
        subtitle:
          "Pour rappeler une règle sans stigmatiser les élèves ou les familles.",
        accent: "rose",
        body: `Rédige un message de rappel du règlement intérieur.
Objectif : rappeler fermement mais calmement une règle importante.

Contraintes :
- pas de jugement sur les familles ou les élèves ;
- rappeler le cadre légal ou réglementaire en quelques lignes ;
- proposer, si possible, une solution ou un accompagnement ;
- ton ferme, clair, mais respectueux.

Contexte :
"RÈGLE CONCERNÉE (ex : retards, tenue vestimentaire, usage du portable, sécurité, etc.) : ..."
"POURQUOI C'EST IMPORTANT : ..."
"CE QUE L'ÉTABLISSEMENT ATTEND : ..."
"AIDE PROPOSÉE PAR L'ÉTABLISSEMENT : ..."`,
      },
      {
        id: "felicitations",
        title:
          "✅ Message de félicitations / valorisation d’un élève ou d’une classe",
        subtitle:
          "Pour renforcer le lien positif avec les familles et les élèves.",
        accent: "emerald",
        body: `Rédige un message de félicitations à destination d'une famille ou d'une classe.
Objectif : valoriser un effort, un projet ou une attitude positive.

Contraintes :
- ton chaleureux et sincère ;
- préciser ce qui est félicité (effort, progrès, réussite, comportement citoyen, etc.) ;
- montrer que l'établissement a remarqué le travail de l'élève / de la classe ;
- texte court, pouvant être envoyé par mail ou via l'ENT.

Contexte :
"QUI EST CONCERNÉ (prénom élève / classe / groupe) : ..."
"CE QUI EST FÉLICITÉ : ..."
"CONTEXTE (projet, évaluation, sortie, engagement, etc.) : ..."
"PROCHAINES ÉTAPES / ENCOURAGEMENTS : ..."`,
      },
      {
        id: "incident",
        title: "🚨 Message aux familles après un incident / événement sensible",
        subtitle:
          "Pour communiquer de manière responsable après un incident (bagarre, malaise, intrusion…).",
        accent: "red",
        body: `Rédige un message destiné aux familles après un incident survenu au collège.
Contraintes :
- aucune information nominative ;
- rassurer sans minimiser ;
- préciser ce qui s'est passé avec des termes neutres ;
- expliquer les mesures prises immédiatement ;
- préciser si un suivi est prévu ;
- ton calme, professionnel, non alarmiste.

Contexte à utiliser :
"TYPE D'INCIDENT : ..."
"LIEU/HEURE : ..."
"MESURES PRISES IMMÉDIATEMENT : ..."
"ACTEURS IMPLIQUÉS (infirmerie, AED, police, etc.) : ..."
"SUIVI PRÉVU : ..."
"ATTENTE VIS-À-VIS DES FAMILLES : ..."`,
      },
      {
        id: "communication-ia",
        title: "🤖 Communication officielle : usage de l’IA au collège",
        subtitle:
          "Pour informer les familles de manière claire sur l’utilisation de l’IA.",
        accent: "cyan",
        body: `Rédige une communication aux familles expliquant l’usage éducatif de l’IA dans l’établissement.
Contraintes :
- rappeler la position de l’Éducation nationale ;
- expliquer les bénéfices pédagogiques ;
- insister sur la sécurité et l’encadrement ;
- préciser ce qui est autorisé / non autorisé ;
- ton rassurant, institutionnel et clair ;
- proposer une FAQ en 5 questions.

Informations à utiliser :
"OBJECTIF DU MESSAGE : ..."
"OUTILS UTILISÉS (EleveAI, outils internes, etc.) : ..."
"CADRE OFFICIEL (Eduscol, circulaires) : ..."
"RÈGLES APPLIQUÉES AUX ÉLÈVES : ..."
"QUESTIONS DES FAMILLES À TRAITER : ..."`,
      },
      {
        id: "coach-english-maths-pronote",
        title: "🇬🇧 Message Pronote — Présentation du Coach English-Maths",
        subtitle:
          "Pour informer les familles de la mise en place du coach IA anglais-maths et les inviter à le tester.",
        accent: "sky",
        body: `Rédige un message Pronote à destination des familles pour présenter le Coach English-Maths d’EleveAI.

Contraintes :
- message court (15 lignes maximum), directement copiable dans Pronote ou un ENT ;
- expliquer en 2-3 phrases ce qu’est le coach (entraînement au vocabulaire anglais lié aux mathématiques, niveaux A1 à B2, questions audio) ;
- mentionner les bénéfices concrets pour l’élève (autonomie, écoute, préparation aux examens, pratique à la maison) ;
- préciser que l’accès est gratuit / depuis la plateforme EleveAI ;
- inviter les familles à encourager leur enfant à utiliser l’outil 5 à 10 minutes par jour ;
- ton chaleureux, rassurant, sans jargon technique ;
- terminer par une invitation à contacter l’enseignant en cas de question.

Informations à personnaliser :
"NOM DE L’ENSEIGNANT : ..."
"CLASSE(S) CONCERNÉE(S) : ..."
"NIVEAU(X) ENGLISH-MATHS (A1 / A2 / B1 / B2) : ..."
"LIEN D’ACCÈS (si différent de eleveai.fr) : ..."
"DATE DE DÉBUT D’UTILISATION RECOMMANDÉE : ..."`,
      },
    ],
  },
  {
    id: "reunions",
    title: "3. Réunions, conseils de classe & comptes rendus",
    description:
      "Pour transformer vos notes en comptes rendus lisibles, objectifs et utilisables pour l’équipe comme pour les familles.",
    prompts: [
      {
        id: "compte-rendu",
        title:
          "📝 Compte rendu synthétique d’un conseil de classe ou d’un conseil d’administration",
        subtitle:
          "Pour produire un résumé clair, objectif et structuré à partir de vos notes.",
        accent: "indigo",
        body: `À partir des informations fournies, rédige un compte-rendu synthétique :
- structure en 4 parties : faits marquants, réussites, points d’attention, décisions ;
- ton objectif, neutre, sans jugement ;
- pas de phrases longues ;
- utilisable pour les familles ou l'équipe pédagogique ;
- ajouter un encadré "à retenir en 5 points" à la fin.

Informations :
"CLASSE / GROUPE : ..."
"POINTS POSITIFS : ..."
"POINTS D’ATTENTION : ..."
"DÉCISIONS / ACTIONS : ..."
"CALENDRIER / SUIVI : ..."`,
      },
    ],
  },
];
