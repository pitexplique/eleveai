"use client";

import { useState } from "react";
import {
  PresetCarousel,
  PresetCarouselItem,
} from "@/components/PresetCarousel";

/* ----------------------------------------
   TYPES
---------------------------------------- */

type TypeEtab = "college" | "lycee" | "lycee_pro" | "autre";

type PublicCibleAesh =
  | "eleve"
  | "famille"
  | "enseignant"
  | "equipe_suivi"
  | "direction";

type TypeDocAesh =
  | "message_eleve"
  | "rapport_incident"
  | "carnet_liaison"
  | "mail_enseignant"
  | "fiche_observation"
  | "compte_rendu_reunion"
  | "synthese_adaptations"
  | "autre";

type AeshPromptState = {
  nomEtab: string;
  typeEtab: TypeEtab;
  ville: string;
  niveauEleve: string;
  profilEleve: string; // ex : DYS, TSA, TDAH…
  disciplineConcernee: string;
  contexte: string;
  publicCible: PublicCibleAesh;
  typeDoc: TypeDocAesh;
  titreDoc: string;
  objectif: string;
  contraintes: string;
  ton: string;
  typeSituation: string;
};

type AeshPresetKey =
  | "adaptation_consigne"
  | "rapport_incident_direction"
  | "message_valorisation"
  | "carnet_liaison_famille"
  | "retour_enseignant"
  | "fiche_observation_classe"
  | "synthese_adaptations_reunion";


type AeshPreset = {
  label: string;
  description: string;
  valeurs: Partial<AeshPromptState>;
};

/* ----------------------------------------
   PRESETS AESH
---------------------------------------- */

const AESH_PRESETS: Record<AeshPresetKey, AeshPreset> = {
  adaptation_consigne: {
    label: "✏️ Adapter une consigne pour un élève accompagné",
    description:
      "Demander à l’IA d’aider à reformuler une consigne de travail pour un élève avec besoins particuliers.",
    valeurs: {
      typeDoc: "message_eleve",
      publicCible: "eleve",
      titreDoc: "Consigne adaptée pour un élève accompagné par une AESH",
      objectif:
        "Proposer une formulation plus simple, découpée, visuelle ou guidée d’une consigne de travail.",
      ton: "encourageant, clair, bienveillant",
      typeSituation:
        "L’élève a du mal à comprendre ou à se repérer dans les consignes données en classe.",
    },
  },
  rapport_incident_direction: {
  label: "🚨 Rapport d’incident pour la direction",
  description:
    "Rédiger un rapport factuel destiné à la direction suite à l’exclusion ou au renvoi d’un élève.",
  valeurs: {
    typeDoc: "rapport_incident",
    publicCible: "direction",
    titreDoc: "Rapport d’incident – Élève accompagné",
    objectif:
      "Décrire de manière factuelle et professionnelle les faits ayant conduit au renvoi de l’élève, sans jugement ni interprétation.",
    ton: "factuel, neutre, professionnel",
    typeSituation:
      "Un élève accompagné par une AESH a été renvoyé de cours ou de l’établissement et un rapport écrit est demandé par la direction.",
  },
},

  message_valorisation: {
    label: "🌟 Message de valorisation à l’élève",
    description:
      "Rédiger un petit mot positif à l’élève pour souligner ses efforts.",
    valeurs: {
      typeDoc: "message_eleve",
      publicCible: "eleve",
      titreDoc: "Message positif à un élève accompagné",
      objectif:
        "Mettre en avant les progrès, la persévérance ou un comportement positif récent.",
      ton: "très bienveillant, simple, motivant",
      typeSituation:
        "L’élève a fait des efforts ou a réussi quelque chose qu’il faut valoriser.",
    },
  },
  carnet_liaison_famille: {
    label: "📘 Carnet de liaison famille – retour de journée",
    description:
      "Structurer un message aux familles : ce qui s’est bien passé, les difficultés, les points à surveiller.",
    valeurs: {
      typeDoc: "carnet_liaison",
      publicCible: "famille",
      titreDoc: "Message aux familles – Bilan de journée / de semaine",
      objectif:
        "Informer les familles de manière rassurante, factuelle et constructive.",
      ton: "calme, respectueux, rassurant",
      typeSituation:
        "Faire un retour régulier aux familles sur la scolarité de l’élève accompagné.",
    },
  },
  retour_enseignant: {
    label: "🤝 Retour à l’enseignant après une séance",
    description:
      "Faire un petit point rapide à l’enseignant sur le vécu de l’élève (compréhension, fatigue, besoins).",
    valeurs: {
      typeDoc: "mail_enseignant",
      publicCible: "enseignant",
      titreDoc: "Retour d’une AESH à l’enseignant",
      objectif:
        "Partager quelques observations utiles pour adapter les séances suivantes.",
      ton: "professionnel, concis, coopératif",
      typeSituation:
        "L’enseignant demande un retour sur la manière dont l’élève a vécu une séance ou une activité.",
    },
  },
  fiche_observation_classe: {
    label: "👀 Fiche d’observation en classe",
    description:
      "Structurer une petite fiche pour observer l’élève : attention, participation, autonomie, interactions.",
    valeurs: {
      typeDoc: "fiche_observation",
      publicCible: "equipe_suivi",
      titreDoc: "Fiche d’observation en classe pour un élève accompagné",
      objectif:
        "Aider à consigner des observations simples qui pourront être partagées en équipe.",
      ton: "factuel, neutre, orienté sur les comportements observables",
      typeSituation:
        "Préparation d’une réunion de suivi ou d’une équipe éducative.",
    },
  },
  synthese_adaptations_reunion: {
    label: "📋 Synthèse des adaptations pour une réunion de suivi",
    description:
      "Préparer un document qui résume les adaptations utiles, les points de vigilance et les réussites.",
    valeurs: {
      typeDoc: "compte_rendu_reunion",
      publicCible: "equipe_suivi",
      titreDoc: "Synthèse des adaptations pour un élève accompagné",
      objectif:
        "Présenter les aménagements qui fonctionnent, ceux à tester, et les besoins particuliers.",
      ton: "professionnel, structuré, collaboratif",
      typeSituation:
        "Réunion de suivi (PPS, PAP, équipe éducative, rendez-vous famille).",
    },
  },
};

/* ----------------------------------------
   CAROUSEL ITEMS
---------------------------------------- */

const AESH_PRESET_ITEMS: PresetCarouselItem[] = (
  Object.entries(AESH_PRESETS) as [AeshPresetKey, AeshPreset][]
).map(([key, preset]) => ({
  id: key,
  label: preset.label,
  description: preset.description,
  badge: "AESH",
}));

/* ----------------------------------------
   HELPERS
---------------------------------------- */

function libelleTypeEtab(t: TypeEtab) {
  switch (t) {
    case "college":
      return "collège";
    case "lycee":
      return "lycée général et technologique";
    case "lycee_pro":
      return "lycée professionnel";
    default:
      return "établissement scolaire";
  }
}

function descriptionPublicAesh(p: PublicCibleAesh) {
  switch (p) {
    case "eleve":
      return "directement à l’élève accompagné (ou à un petit groupe)";
    case "famille":
      return "aux parents ou responsables légaux de l’élève";
    case "enseignant":
      return "à un ou plusieurs enseignants de la classe";
    case "equipe_suivi":
      return "à l’équipe de suivi (enseignants, AESH, CPE, direction, médecin/psychologue scolaire selon les cas)";
    case "direction":
    default:
      return "à la direction ou aux responsables de l’établissement";
  }
}

function descriptionTypeDocAesh(t: TypeDocAesh) {
  switch (t) {
    case "message_eleve":
      return "un message simple, adressé à l’élève, que l’AESH peut lire ou écrire avec lui";
    case "carnet_liaison":
      return "un message pour le carnet de liaison ou l’ENT à destination des familles";
    case "mail_enseignant":
      return "un court mail / message à l’enseignant pour partager des observations";
    case "fiche_observation":
      return "une fiche d’observation structurée, avec des rubriques lisibles";
    case "compte_rendu_reunion":
      return "un court compte rendu ou une synthèse pour une réunion de suivi";
    case "synthese_adaptations":
      return "une synthèse des adaptations pédagogiques et des aides mises en place";
    case "autre":
    default:
      return "un document lié au suivi d’un élève accompagné par une AESH";
  }
}

/* ----------------------------------------
   PAGE
---------------------------------------- */

export default function EspaceAeshPage() {
  const [form, setForm] = useState<AeshPromptState>({
    nomEtab: "",
    typeEtab: "college",
    ville: "",
    niveauEleve: "",
    profilEleve: "",
    disciplineConcernee: "",
    contexte: "",
    publicCible: "eleve",
    typeDoc: "message_eleve",
    titreDoc: "",
    objectif: "",
    contraintes: "",
    ton: "bienveillant, simple, professionnel",
    typeSituation: "",
  });

  const [promptFinal, setPromptFinal] = useState("");
  const [copied, setCopied] = useState(false);

  function handleChange<K extends keyof AeshPromptState>(
    field: K,
    value: AeshPromptState[K],
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function appliquerPreset(key: AeshPresetKey) {
    const preset = AESH_PRESETS[key];
    setForm((prev) => ({
      ...prev,
      ...preset.valeurs,
    }));
  }

  /* -------- Génération du prompt -------- */

  function genererPrompt() {
    const nomEtab = form.nomEtab.trim() || "un établissement scolaire";
    const ville = form.ville.trim();
    const typeEtabLibelle = libelleTypeEtab(form.typeEtab);
    const niveauEleve =
      form.niveauEleve.trim() || "niveau scolaire non précisé (ex : 5e, 2de…)";
    const profilEleve =
      form.profilEleve.trim() ||
      "profil non précisé (troubles DYS, TSA, TDAH, handicap moteur, autre…).";
    const discipline =
      form.disciplineConcernee.trim() ||
      "discipline principale non précisée (ex : maths, français, histoire-géographie…).";
    const contexte =
      form.contexte.trim() ||
      "contexte habituel d’un élève accompagné par une AESH en classe.";
    const publicDesc = descriptionPublicAesh(form.publicCible);
    const typeDocDesc = descriptionTypeDocAesh(form.typeDoc);
    const titreDoc =
      form.titreDoc.trim() ||
      "Document en lien avec l’accompagnement d’un élève par une AESH";
    const typeSituation =
      form.typeSituation.trim() ||
      "situation de classe ou de vie scolaire nécessitant un accompagnement ou une adaptation particulière.";
    const objectif =
      form.objectif.trim() ||
      "soutenir l’élève, favoriser sa compréhension et son inclusion, et améliorer la communication avec l’équipe et/ou la famille.";
    const contraintes = form.contraintes.trim();
    const ton =
      form.ton.trim() ||
      "bienveillant, simple, respectueux de l’élève et de sa famille.";

    const blocContexteEleve =
      `Contexte général :\n` +
      `- Établissement : ${nomEtab} (${typeEtabLibelle})` +
      (ville ? `, situé à ${ville}` : "") +
      `.\n` +
      `- Niveau de classe de l’élève : ${niveauEleve}\n` +
      `- Profil de l’élève : ${profilEleve}\n` +
      `- Discipline / matière principalement concernée : ${discipline}\n` +
      `- Contexte : ${contexte}\n\n`;

    const blocSituation =
      `Situation à traiter :\n` +
      `- Type de situation : ${typeSituation}\n` +
      `- Type de document souhaité : ${typeDocDesc}.\n` +
      `- Ce document s’adresse ${publicDesc}.\n` +
      `- Titre envisagé : « ${titreDoc} ».\n` +
      `- Objectif principal : ${objectif}\n\n`;

    const blocContraintesAdditionnelles =
      contraintes.length > 0
        ? `Contraintes / points de vigilance indiqués par l’AESH :\n${contraintes}\n\n`
        : "";

    const blocContraintesFixes =
      `Contraintes générales à respecter :\n` +
      `- Le document doit respecter la confidentialité et ne pas donner d’informations médicales détaillées.\n` +
      `- Le ton doit être ${ton}.\n` +
      `- Le texte doit rester factuel : décrire des comportements ou situations observables, éviter les jugements sur la personne.\n` +
      `- Le document doit pouvoir être relu facilement par l’AESH, l’enseignant et, le cas échéant, la famille.\n` +
      `- Ne pas se substituer à un diagnostic médical ou psychologique.\n\n`;

    const blocMission =
      `Ta mission en tant qu’IA assistant une AESH :\n` +
      `1. Proposer un plan ou une structure adaptée au type de document (message élève, carnet de liaison, mail enseignant, fiche d’observation, synthèse de réunion, etc.).\n` +
      `2. Rédiger ensuite le document complet en français, avec un langage clair et accessible.\n` +
      `3. Si le texte est pour l’élève, utiliser des phrases courtes, positives et simples.\n` +
      `4. Si le texte est pour l’enseignant, l’équipe ou la famille, être factuel, rassurant et orienté vers la coopération.\n` +
      `5. Terminer par 3 à 5 « points de vigilance » pour l’AESH (ce qu’il/elle doit relire ou adapter avant de partager le texte).\n`;

    const prompt =
      `Tu es une IA assistant une AESH (Accompagnant·e d’Élève en Situation de Handicap) dans un établissement scolaire français.\n\n` +
      blocContexteEleve +
      blocSituation +
      blocContraintesAdditionnelles +
      blocContraintesFixes +
      blocMission;

    setPromptFinal(prompt);
    setCopied(false);
  }

  async function copierPrompt() {
    if (!promptFinal) return;
    try {
      await navigator.clipboard.writeText(promptFinal);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      alert(
        "Impossible de copier automatiquement. Sélectionne le texte et copie-le manuellement.",
      );
    }
  }

  /* ----------------------------------------
     RENDER
  ---------------------------------------- */

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-10 lg:py-14 space-y-8">
        {/* HERO */}
        <section className="rounded-3xl bg-white/90 p-6 lg:p-8 shadow-sm ring-1 ring-indigo-100">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="space-y-4">
              <p className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700 ring-1 ring-indigo-100">
                Espace AESH · accompagnement des élèves en situation de handicap
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
                Générateur de prompts pour les AESH – EleveAI
              </h1>
              <p className="max-w-2xl text-sm sm:text-base text-slate-700">
                Une aide pour formuler des messages, observations et adaptations :
                consignes simplifiées, carnets de liaison, retours aux enseignants,
                fiches d’observation, synthèses pour les réunions de suivi, toujours
                dans une démarche bienveillante et inclusive.
              </p>
            </div>

            <div className="max-w-xs rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-xs text-indigo-950 shadow-inner space-y-1.5">
              <p className="font-semibold">Rappels importants</p>
              <ul className="space-y-1">
                <li>• L’IA ne remplace pas ton regard d’AESH.</li>
                <li>• Tu restes libre d’adapter, couper, reformuler.</li>
                <li>• Évite de mettre le nom complet de l’élève dans le prompt.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* PRESETS – CARROUSEL */}
        <PresetCarousel
          title="1️⃣ Choisir un modèle (facultatif)"
          subtitle="Tu peux partir d’un exemple proche de ta situation : adaptation de consigne, carnet de liaison, observation en classe, synthèse pour une réunion…"
          items={AESH_PRESET_ITEMS}
          onSelect={(id) => appliquerPreset(id as AeshPresetKey)}
        />

        {/* FORM + PROMPT */}
        <section className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          {/* FORMULAIRE */}
          <div className="rounded-3xl bg-white p-6 lg:p-7 shadow-md ring-1 ring-slate-100 space-y-5">
            <h2 className="text-base font-semibold text-slate-900 mb-1">
              2️⃣ Décrire le contexte et le document à produire
            </h2>

            {/* Bloc établissement & élève */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Établissement & élève
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700">
                    Nom de l’établissement
                  </label>
                  <input
                    type="text"
                    value={form.nomEtab}
                    onChange={(e) => handleChange("nomEtab", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-inner focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    placeholder="Ex : Collège Capitaine Dimitile"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700">
                    Ville / commune
                  </label>
                  <input
                    type="text"
                    value={form.ville}
                    onChange={(e) => handleChange("ville", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-inner focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    placeholder="Ex : Entre-Deux, Saint-Pierre…"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700">
                    Type d’établissement
                  </label>
                  <select
                    value={form.typeEtab}
                    onChange={(e) =>
                      handleChange("typeEtab", e.target.value as TypeEtab)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 shadow-inner focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  >
                    <option value="college">Collège</option>
                    <option value="lycee">Lycée général / technologique</option>
                    <option value="lycee_pro">Lycée professionnel</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700">
                    Niveau de classe de l’élève
                  </label>
                  <input
                    type="text"
                    value={form.niveauEleve}
                    onChange={(e) =>
                      handleChange("niveauEleve", e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 shadow-inner focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    placeholder="Ex : 6e, 4e, 2de, 1re…"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700">
                    Discipline principale concernée
                  </label>
                  <input
                    type="text"
                    value={form.disciplineConcernee}
                    onChange={(e) =>
                      handleChange("disciplineConcernee", e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 shadow-inner focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    placeholder="Ex : maths, français, histoire-géo…"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Profil de l’élève (sans détail médical)
                </label>
                <textarea
                  value={form.profilEleve}
                  onChange={(e) => handleChange("profilEleve", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 shadow-inner min-h-[60px] focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  placeholder="Ex : difficultés de lecture, besoin de temps supplémentaire, besoin d’aide pour se repérer dans la page, tendance à se fatiguer vite, etc."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Contexte général (facultatif)
                </label>
                <textarea
                  value={form.contexte}
                  onChange={(e) => handleChange("contexte", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 shadow-inner min-h-[60px] focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  placeholder="Ex : élève accompagné sur plusieurs matières, classe plutôt calme, besoins d’aide pour s’organiser, etc."
                />
              </div>
            </div>

            {/* Bloc situation & document */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Situation & document
              </h3>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Situation à traiter
                </label>
                <textarea
                  value={form.typeSituation}
                  onChange={(e) =>
                    handleChange("typeSituation", e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 shadow-inner min-h-[70px] focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  placeholder="Décris la situation (sans donner le nom complet de l’élève) : difficulté de compréhension, conflit, grande fatigue, changement récent, etc."
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700">
                    Type de document
                  </label>
                  <select
                    value={form.typeDoc}
                    onChange={(e) =>
                      handleChange("typeDoc", e.target.value as TypeDocAesh)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 shadow-inner focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  >
                    <option value="message_eleve">Message à l’élève</option>
                    <option value="carnet_liaison">
                      Carnet de liaison / message familles
                    </option>
                    <option value="mail_enseignant">
                      Mail / message à l’enseignant
                    </option>
                    <option value="fiche_observation">
                      Fiche d’observation en classe
                    </option>
                    <option value="compte_rendu_reunion">
                      Compte rendu / synthèse pour une réunion
                    </option>
                    <option value="synthese_adaptations">
                      Synthèse des adaptations utiles
                    </option>
                    <option value="autre">Autre document</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700">
                    Public cible principal
                  </label>
                  <select
                    value={form.publicCible}
                    onChange={(e) =>
                      handleChange(
                        "publicCible",
                        e.target.value as PublicCibleAesh,
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 shadow-inner focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  >
                    <option value="eleve">Élève</option>
                    <option value="famille">Famille / responsables légaux</option>
                    <option value="enseignant">Enseignant(s)</option>
                    <option value="equipe_suivi">Équipe de suivi</option>
                    <option value="direction">Direction / pilotage</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Titre souhaité (facultatif)
                </label>
                <input
                  type="text"
                  value={form.titreDoc}
                  onChange={(e) => handleChange("titreDoc", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-inner focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  placeholder='Ex : "Bilan de la semaine pour l’élève accompagné"'
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Objectif principal du document
                </label>
                <textarea
                  value={form.objectif}
                  onChange={(e) => handleChange("objectif", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 shadow-inner min-h-[70px] focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  placeholder="Ex : expliquer les progrès, signaler une difficulté, proposer une adaptation, préparer une réunion, etc."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Contraintes ou points à intégrer (facultatif)
                </label>
                <textarea
                  value={form.contraintes}
                  onChange={(e) => handleChange("contraintes", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 shadow-inner min-h-[70px] focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  placeholder="Ex : ne pas parler de tel sujet, rester très bref, insister sur les points positifs, etc."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Ton souhaité
                </label>
                <input
                  type="text"
                  value={form.ton}
                  onChange={(e) => handleChange("ton", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 shadow-inner focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  placeholder="Ex : très bienveillant et positif, factuel et rassurant, etc."
                />
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button
                  onClick={genererPrompt}
                  className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                >
                  ⚙️ Générer le prompt AESH
                </button>
                <p className="text-xs text-slate-500">
                  Tu pourras ensuite coller ce prompt dans EleveAI ou dans une
                  autre IA de ton choix pour générer le texte.
                </p>
              </div>
            </div>
          </div>

          {/* PROMPT FINAL */}
          <div className="rounded-3xl bg-white/95 p-5 lg:p-6 shadow-sm ring-1 ring-slate-100 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-slate-900">
                3️⃣ Prompt final pour l’AESH
              </h2>
              <button
                onClick={copierPrompt}
                disabled={!promptFinal}
                className={`inline-flex items-center justify-center rounded-full border px-3 py-1.5 text-xs font-medium shadow-sm transition ${
                  promptFinal
                    ? "border-slate-300 bg-slate-50 text-slate-800 hover:bg-slate-100"
                    : "border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed"
                }`}
              >
                {copied ? "✅ Copié" : "📋 Copier le prompt"}
              </button>
            </div>

            <textarea
              readOnly
              value={promptFinal}
              className="w-full min-h-[280px] rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-mono text-slate-900 shadow-inner"
              placeholder="Renseigne le formulaire puis clique sur « Générer le prompt AESH » : il apparaîtra ici, prêt à être collé dans une IA."
            />
          </div>
        </section>
      </div>
    </main>
  );
}
