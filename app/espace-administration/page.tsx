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

type PublicCibleVieSco =
  | "eleve"
  | "famille"
  | "equipe_vie_scolaire"
  | "equipe_educative"
  | "direction";

type TypeDocVieSco =
  | "courrier_famille"
  | "message_eleve"
  | "rapport_incident"
  | "fiche_suivi"
  | "compte_rendu_sanction"
  | "note_regles"
  | "protocole_vie_scolaire"
  | "autre";

type VieScoPromptState = {
  nomEtab: string;
  typeEtab: TypeEtab;
  ville: string;
  contexte: string;
  nbEleves: string;
  nbProfs: string;
  publicCible: PublicCibleVieSco;
  typeDoc: TypeDocVieSco;
  titreDoc: string;
  objectif: string;
  contraintes: string;
  ton: string;
  typeSituation: string; // ex : conflit, harcèlement, retards...
};

type VieScoPresetKey =
  | "conflit_message_eleve"
  | "harcelement_mail_famille"
  | "retards_rappel_regles"
  | "sanction_compte_rendu"
  | "suivi_reunion_equipe"
  | "climat_note_generale"
  | "protocole_retards_exclusions";

type VieScoPreset = {
  label: string;
  description: string;
  valeurs: Partial<VieScoPromptState>;
};

/* ----------------------------------------
   PRESETS VIE SCOLAIRE
---------------------------------------- */

const VIESCO_PRESETS: Record<VieScoPresetKey, VieScoPreset> = {
  conflit_message_eleve: {
    label: "🤝 Conflit entre élèves – Message à un élève",
    description:
      "Formuler un message apaisant à un élève après un conflit (rappel du cadre + proposition de médiation).",
    valeurs: {
      typeDoc: "message_eleve",
      publicCible: "eleve",
      titreDoc: "Message de suivi après un conflit entre élèves",
      objectif:
        "Apaiser la situation, rappeler le cadre de respect, proposer une médiation et valoriser la possibilité de réparer.",
      ton: "bienveillant, apaisant, respectueux",
      typeSituation: "Conflit entre élèves (insultes, tensions, altercation).",
    },
  },
  harcelement_mail_famille: {
    label: "🛡️ Suspicion de harcèlement – Courriel aux familles",
    description:
      "Informer une famille d’une situation préoccupante sans accuser, rassurer, proposer un rendez-vous.",
    valeurs: {
      typeDoc: "courrier_famille",
      publicCible: "famille",
      titreDoc: "Information aux responsables légaux – Situation préoccupante",
      objectif:
        "Informer les responsables légaux d’éléments préoccupants pouvant relever du harcèlement scolaire et proposer un échange.",
      ton: "prudent, professionnel, rassurant",
      typeSituation:
        "Suspicion de harcèlement (répétition de faits, isolement, propos blessants, cyberharcèlement).",
    },
  },
  retards_rappel_regles: {
    label: "⏰ Retards répétés – Rappel du cadre",
    description:
      "Message pour rappeler les règles sur les retards et proposer un accompagnement si besoin.",
    valeurs: {
      typeDoc: "message_eleve",
      publicCible: "eleve",
      titreDoc: "Rappel des règles sur les retards et accompagnement possible",
      objectif:
        "Rappeler les conséquences des retards, proposer un échange pour comprendre les difficultés et éviter la stigmatisation.",
      ton: "ferme mais bienveillant, centré sur les faits",
      typeSituation: "Retards répétés en cours ou à l’arrivée au collège/lycée.",
    },
  },
  sanction_compte_rendu: {
    label: "📄 Sanction éducative – Compte rendu aux familles",
    description:
      "Expliquer une mesure éducative (par ex. retenue, travail d’intérêt scolaire) en mettant en avant son sens pédagogique.",
    valeurs: {
      typeDoc: "compte_rendu_sanction",
      publicCible: "famille",
      titreDoc: "Compte rendu d’une mesure éducative",
      objectif:
        "Présenter la sanction comme une mesure éducative, expliquer les faits et les objectifs de la mesure.",
      ton: "neutre, clair, pédagogique",
      typeSituation:
        "Non-respect répété du règlement, comportement perturbateur, non-respect d’un adulte ou d’un camarade.",
    },
  },
  suivi_reunion_equipe: {
    label: "📋 Fiche de suivi – Réunion d’équipe éducative",
    description:
      "Synthèse de suivi d’un élève fragile ou en difficulté pour partager avec l’équipe.",
    valeurs: {
      typeDoc: "fiche_suivi",
      publicCible: "equipe_educative",
      titreDoc: "Synthèse de suivi d’un élève pour l’équipe éducative",
      objectif:
        "Présenter les faits observés, les mesures mises en place, les effets constatés et les pistes de travail.",
      ton: "professionnel, factuel, collaboratif",
      typeSituation:
        "Élève en grande difficulté scolaire, comportementale ou sociale, accompagné par plusieurs adultes.",
    },
  },
  climat_note_generale: {
    label: "🌈 Climat scolaire – Note générale aux familles",
    description:
      "Rappeler quelques règles de vie scolaire et la volonté de construire un climat serein.",
    valeurs: {
      typeDoc: "note_regles",
      publicCible: "famille",
      titreDoc: "Note aux familles – Rappel du cadre de vie scolaire",
      objectif:
        "Rappeler des règles clés (respect, usage du téléphone, retards, absences) pour améliorer le climat scolaire.",
      ton: "positif, clair, non culpabilisant",
      typeSituation:
        "Rappel général du règlement ou après une période tendue dans l’établissement.",
    },
  },
  protocole_retards_exclusions: {
    label: "📘 Protocole interne – Retards, exclusions, conduites en vie scolaire",
    description:
      "Proposer un protocole clair pour l’équipe sur la gestion des retards, exclusions ponctuelles et passages en vie scolaire.",
    valeurs: {
      typeDoc: "protocole_vie_scolaire",
      publicCible: "equipe_vie_scolaire",
      titreDoc: "Projet de protocole interne de vie scolaire",
      objectif:
        "Structurer les étapes de prise en charge (retards, exclusions ponctuelles, passages en vie scolaire, traçabilité, information aux familles).",
      ton: "institutionnel, structuré, clair",
      typeSituation:
        "Construction ou révision d’un protocole de vie scolaire en interne.",
    },
  },
};

/* ----------------------------------------
   ITEMS POUR LE CARROUSEL
---------------------------------------- */

const VIESCO_PRESET_ITEMS: PresetCarouselItem[] = (
  Object.entries(VIESCO_PRESETS) as [VieScoPresetKey, VieScoPreset][]
).map(([key, preset]) => ({
  id: key,
  label: preset.label,
  description: preset.description,
  badge: "Vie scolaire",
}));

/* ----------------------------------------
   PAGE
---------------------------------------- */

export default function VieScolairePage() {
  const [form, setForm] = useState<VieScoPromptState>({
    nomEtab: "",
    typeEtab: "college",
    ville: "",
    contexte: "",
    nbEleves: "",
    nbProfs: "",
    publicCible: "eleve",
    typeDoc: "message_eleve",
    titreDoc: "",
    objectif: "",
    contraintes: "",
    ton: "bienveillant, clair et professionnel",
    typeSituation: "",
  });

  const [promptFinal, setPromptFinal] = useState("");
  const [copied, setCopied] = useState(false);

  /* --------- helpers --------- */

  function handleChange<K extends keyof VieScoPromptState>(
    field: K,
    value: VieScoPromptState[K],
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function appliquerPreset(key: VieScoPresetKey) {
    const preset = VIESCO_PRESETS[key];
    setForm((prev) => ({
      ...prev,
      ...preset.valeurs,
    }));
  }

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

  function descriptionPublic(p: PublicCibleVieSco) {
    switch (p) {
      case "eleve":
        return "principalement à un élève ou à un petit groupe d’élèves";
      case "famille":
        return "principalement aux parents ou responsables légaux de l’élève";
      case "equipe_vie_scolaire":
        return "à l’équipe de vie scolaire (CPE, AED, assistants pédagogiques)";
      case "equipe_educative":
        return "à l’équipe éducative (enseignants, CPE, direction, psychologue, etc.)";
      case "direction":
      default:
        return "à la direction ou aux instances internes de l’établissement";
    }
  }

  function descriptionTypeDoc(t: TypeDocVieSco) {
    switch (t) {
      case "courrier_famille":
        return "un courrier ou courriel aux familles, clair et respectueux";
      case "message_eleve":
        return "un message à destination d’un élève, utilisable en entretien, sur l’ENT ou par écrit";
      case "rapport_incident":
        return "un rapport d’incident factuel, structuré et traçable";
      case "fiche_suivi":
        return "une fiche de suivi d’élève pour les réunions d’équipe éducative";
      case "compte_rendu_sanction":
        return "un compte rendu de sanction éducative à transmettre à la famille et/ou à l’équipe";
      case "note_regles":
        return "une note générale rappelant des règles de vie scolaire";
      case "protocole_vie_scolaire":
        return "un protocole interne décrivant les étapes de prise en charge en vie scolaire";
      case "autre":
      default:
        return "un document lié à la vie scolaire et au climat de l’établissement";
    }
  }

  /* --------- génération du prompt --------- */

  function genererPrompt() {
    const nomEtab = form.nomEtab.trim() || "un établissement scolaire";
    const ville = form.ville.trim();
    const contexte =
      form.contexte.trim() ||
      "contexte ordinaire d’un établissement public français";
    const typeEtabLibelle = libelleTypeEtab(form.typeEtab);
    const publicDesc = descriptionPublic(form.publicCible);
    const typeDocDesc = descriptionTypeDoc(form.typeDoc);
    const titreDoc =
      form.titreDoc.trim() ||
      "Document de vie scolaire en lien avec le climat scolaire et le respect du règlement";

    const nbEleves =
      form.nbEleves.trim() !== "" ? form.nbEleves.trim() : "non précisé";
    const nbProfs =
      form.nbProfs.trim() !== "" ? form.nbProfs.trim() : "non précisé";

    const typeSituation =
      form.typeSituation.trim() ||
      "Situation de vie scolaire (conflit, retards, harcèlement présumé, climat de classe, etc.).";

    const objectif =
      form.objectif.trim() ||
      "apaiser la situation, rappeler le cadre de manière éducative et favoriser le dialogue entre les acteurs (élève, famille, équipe).";

    const contraintes = form.contraintes.trim();
    const ton =
      form.ton.trim() ||
      "bienveillant, clair, professionnel, non stigmatisant";

    const contexteEtab =
      `Contexte de l’établissement :\n` +
      `- Nom : ${nomEtab}\n` +
      `- Type : ${typeEtabLibelle}\n` +
      (ville ? `- Localisation : ${ville}\n` : "") +
      `- Nombre approximatif d’élèves : ${nbEleves}\n` +
      `- Nombre approximatif d’enseignants : ${nbProfs}\n` +
      `- Contexte particulier : ${contexte}\n\n`;

    const blocSituation =
      `Situation de vie scolaire à traiter :\n` +
      `- Type de situation : ${typeSituation}\n` +
      `- Type de document souhaité : ${typeDocDesc}.\n` +
      `- Public cible : ${publicDesc}.\n` +
      `- Titre envisagé : « ${titreDoc} ».\n` +
      `- Objectif principal du document : ${objectif}\n\n`;

    const blocContraintesAdditionnelles =
      contraintes.length > 0
        ? `Contraintes / points de vigilance fournis par l’équipe de vie scolaire :\n${contraintes}\n\n`
        : "";

    const blocContraintesFixes =
      `Contraintes générales à respecter impérativement :\n` +
      `- Le document doit respecter le cadre de l’Éducation nationale et la réglementation en vigueur (dont la lutte contre le harcèlement scolaire, la laïcité, le RGPD).\n` +
      `- Le ton doit être ${ton}.\n` +
      `- Le document doit rester factuel : décrire des faits observables, éviter les jugements sur les personnes.\n` +
      `- Le document ne doit pas poser de diagnostic médical ou psychologique : ne pas utiliser de termes médicaux sans avis d’un professionnel de santé.\n` +
      `- Le texte doit préserver la confidentialité et la dignité des élèves mentionnés.\n` +
      `- Le style doit être compréhensible par les familles et réutilisable dans un ENT, un mail ou un traitement de texte.\n\n`;

    const blocMission =
      `Ta mission en tant qu’IA assistant un CPE ou un membre de la vie scolaire :\n` +
      `1. Proposer d’abord un plan ou une structure du document (titres, sous-titres, parties) adapté au type de document.\n` +
      `2. Puis rédiger le document complet en français, en respectant le ton demandé et le contexte fourni.\n` +
      `3. Lorsque c’est un message à un élève ou aux familles, veiller à ce que le texte soit à la fois clair sur le cadre et respectueux des personnes.\n` +
      `4. Lorsque c’est un protocole ou une fiche de suivi, veiller à ce que les étapes soient claires, opérationnelles et faciles à appliquer par l’équipe.\n` +
      `5. Terminer par 3 à 5 « points de vigilance » à vérifier par l’équipe de vie scolaire avant diffusion (confidentialité, cohérence avec le règlement intérieur, mention éventuelle à retirer ou adapter, etc.).\n`;

    const prompt =
      `Tu es une IA assistant un CPE ou un membre de la vie scolaire dans un établissement scolaire français.\n\n` +
      contexteEtab +
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
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-10 lg:py-14 space-y-8">
        {/* HERO */}
        <section className="rounded-3xl bg-white/90 p-6 lg:p-8 shadow-sm ring-1 ring-sky-100">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-4">
              <p className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 ring-1 ring-emerald-100">
                Espace vie scolaire · CPE / AED / équipes éducatives
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
                Générateur de prompts vie scolaire – EleveAI
              </h1>
              <p className="max-w-2xl text-sm sm:text-base text-slate-700">
                Cette page t’aide à formuler des prompts pour rédiger des messages,
                comptes rendus et protocoles de vie scolaire : conflits, retards,
                harcèlement présumé, sanctions éducatives, climat scolaire, suivi d’élèves.
              </p>
            </div>

            <div className="max-w-xs rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-xs text-slate-900 shadow-inner">
              <p className="mb-1 font-semibold">Pour quoi faire ?</p>
              <ul className="space-y-1">
                <li>• Messages à un élève après un conflit.</li>
                <li>• Courriels aux familles (retards, harcèlement présumé…).</li>
                <li>• Fiches de suivi, comptes rendus, protocoles de vie scolaire.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 1️⃣ PRESETS – CARROUSEL */}
        <PresetCarousel
          title="1️⃣ Choisir un modèle de situation (facultatif)"
          subtitle="Tu peux partir d’un exemple proche de ta réalité de terrain : conflit, harcèlement présumé, retards, sanction éducative, climat scolaire, etc."
          items={VIESCO_PRESET_ITEMS}
          onSelect={(id) => appliquerPreset(id as VieScoPresetKey)}
        />

        {/* 2️⃣ FORMULAIRE + PROMPT */}
        <section className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          {/* FORMULAIRE */}
          <div className="rounded-3xl bg-white p-6 lg:p-7 shadow-md ring-1 ring-slate-100 space-y-5">
            <h2 className="text-base font-semibold text-slate-900 mb-1">
              2️⃣ Décrire le contexte de ton établissement et de la situation
            </h2>

            {/* ÉTABLISSEMENT */}
            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700">
                    Nom de l’établissement
                  </label>
                  <input
                    type="text"
                    value={form.nomEtab}
                    onChange={(e) => handleChange("nomEtab", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
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
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
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
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  >
                    <option value="college">Collège</option>
                    <option value="lycee">Lycée général / technologique</option>
                    <option value="lycee_pro">Lycée professionnel</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700">
                    Nombre d’élèves (approx.)
                  </label>
                  <input
                    type="text"
                    value={form.nbEleves}
                    onChange={(e) => handleChange("nbEleves", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                    placeholder="Ex : 438"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700">
                    Nombre d’enseignants (approx.)
                  </label>
                  <input
                    type="text"
                    value={form.nbProfs}
                    onChange={(e) => handleChange("nbProfs", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                    placeholder="Ex : 35"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Contexte particulier de l’établissement (facultatif)
                </label>
                <textarea
                  value={form.contexte}
                  onChange={(e) => handleChange("contexte", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 shadow-inner min-h-[60px] focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  placeholder="Ex : Établissement enclavé, REP / REP+, forte proportion de boursiers, projets autour du climat scolaire, etc."
                />
              </div>
            </div>

            {/* SITUATION VIE SCOLAIRE */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h3 className="text-sm font-semibold text-slate-900">
                Situation de vie scolaire
              </h3>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Type de situation
                </label>
                <input
                  type="text"
                  value={form.typeSituation}
                  onChange={(e) =>
                    handleChange("typeSituation", e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  placeholder="Ex : Conflit entre deux élèves de 4e à la sortie du collège, retards répétés d’un élève de 2de, suspicion de cyberharcèlement, etc."
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
                      handleChange("typeDoc", e.target.value as TypeDocVieSco)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  >
                    <option value="message_eleve">Message à un élève</option>
                    <option value="courrier_famille">
                      Courrier / mail aux familles
                    </option>
                    <option value="rapport_incident">Rapport d’incident</option>
                    <option value="fiche_suivi">Fiche de suivi d’élève</option>
                    <option value="compte_rendu_sanction">
                      Compte rendu de sanction éducative
                    </option>
                    <option value="note_regles">
                      Note générale sur les règles de vie scolaire
                    </option>
                    <option value="protocole_vie_scolaire">
                      Protocole interne de vie scolaire
                    </option>
                    <option value="autre">Autre document de vie scolaire</option>
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
                        e.target.value as PublicCibleVieSco,
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  >
                    <option value="eleve">Élève / groupe d’élèves</option>
                    <option value="famille">
                      Familles / responsables légaux
                    </option>
                    <option value="equipe_vie_scolaire">
                      Équipe de vie scolaire
                    </option>
                    <option value="equipe_educative">
                      Équipe éducative élargie
                    </option>
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
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  placeholder='Ex : "Courriel aux familles – Rappel des règles sur les retards"'
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Objectif principal du document
                </label>
                <textarea
                  value={form.objectif}
                  onChange={(e) => handleChange("objectif", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 shadow-inner min-h-[70px] focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  placeholder="Ex : Expliquer aux familles la situation de manière factuelle, rappeler le cadre, proposer un rendez-vous, éviter toute stigmatisation."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Contraintes ou points à intégrer (facultatif)
                </label>
                <textarea
                  value={form.contraintes}
                  onChange={(e) => handleChange("contraintes", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 shadow-inner min-h-[70px] focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  placeholder="Ex : Ne pas citer tel élève, insister sur le fait qu’aucun élève n’est désigné comme harceleur à ce stade, rappeler la procédure interne EN si nécessaire, etc."
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
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  placeholder="Ex : bienveillant et apaisant, ferme mais respectueux, factuel et professionnel…"
                />
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button
                  onClick={genererPrompt}
                  className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                >
                  ⚙️ Générer le prompt vie scolaire
                </button>
                <p className="text-xs text-slate-500">
                  Tu pourras ensuite coller ce prompt dans EleveAI ou dans l’IA
                  de ton choix pour rédiger le message ou le document.
                </p>
              </div>
            </div>
          </div>

          {/* PROMPT FINAL */}
          <div className="rounded-3xl bg-white/95 p-5 lg:p-6 shadow-sm ring-1 ring-slate-100 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-slate-900">
                3️⃣ Prompt final pour la vie scolaire
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
              className="w-full min-h-[260px] rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-mono text-slate-900 shadow-inner"
              placeholder="Renseigne le formulaire puis clique sur « Générer le prompt vie scolaire » : il apparaîtra ici, prêt à être collé dans une IA."
            />
          </div>
        </section>
      </div>
    </main>
  );
}

