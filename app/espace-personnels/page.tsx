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

type PublicCiblePersonnel =
  | "agents_entretien"
  | "cuisine"
  | "maintenance_espaces_verts"
  | "direction"
  | "toute_equipe";

type TypeDocPersonnel =
  | "consigne_travail"
  | "note_equipe"
  | "courrier_direction"
  | "fiche_securite"
  | "protocole"
  | "affiche"
  | "remerciement"
  | "autre";

type PersonnelPromptState = {
  nomEtab: string;
  typeEtab: TypeEtab;
  ville: string;
  contexte: string;
  nbEleves: string;
  nbProfs: string;
  publicCible: PublicCiblePersonnel;
  typeDoc: TypeDocPersonnel;
  titreDoc: string;
  objectif: string;
  contraintes: string;
  ton: string;
  typeService: string; // ex : ménage, cantine, espaces verts…
};

type PersonnelPresetKey =
  | "consignes_nettoyage_classes"
  | "organisation_menage_vacances"
  | "affiche_cantine_respect"
  | "note_tris_dechets"
  | "protocole_tonte_arbres_securite"
  | "remerciements_agents"
  | "info_travaux_cour_equipe";

/* ----------------------------------------
   PRESETS
---------------------------------------- */

type PersonnelPreset = {
  label: string;
  description: string;
  valeurs: Partial<PersonnelPromptState>;
};

const PERSONNEL_PRESETS: Record<PersonnelPresetKey, PersonnelPreset> = {
  consignes_nettoyage_classes: {
    label: "🧹 Nettoyage des salles de classe",
    description:
      "Clarifier les priorités de nettoyage, les zones sensibles et l’organisation quotidienne.",
    valeurs: {
      typeDoc: "protocole",
      publicCible: "agents_entretien",
      titreDoc: "Consignes de nettoyage des salles de classe",
      objectif:
        "Donner un cadre clair pour le nettoyage des salles (sols, tables, poignées, sanitaires), en tenant compte des contraintes de temps.",
      ton: "simple, concret, respectueux du travail des agents",
      typeService: "Service d’entretien / agents de ménage.",
    },
  },
  organisation_menage_vacances: {
    label: "📅 Grand ménage – Vacances scolaires",
    description:
      "Préparer un plan de ménage pendant les vacances (vitres, murs, salles spécifiques…).",
    valeurs: {
      typeDoc: "protocole",
      publicCible: "agents_entretien",
      titreDoc: "Organisation du grand ménage pendant les vacances scolaires",
      objectif:
        "Organiser les tâches de ménage sur plusieurs jours, en identifiant les priorités et les locaux concernés.",
      ton: "organisé, clair, opérationnel",
      typeService: "Entretien des locaux pendant les périodes sans élèves.",
    },
  },
  affiche_cantine_respect: {
    label: "🍽️ Affiche cantine – Respect & propreté",
    description:
      "Créer une petite affiche pour aider à garder la cantine propre et agréable.",
    valeurs: {
      typeDoc: "affiche",
      publicCible: "toute_equipe",
      titreDoc: "Affiche – Bien vivre ensemble à la cantine",
      objectif:
        "Inviter les élèves à respecter le travail du personnel de cantine, à débarrasser leur plateau, à ne pas gaspiller.",
      ton: "positif, simple, adapté aux élèves",
      typeService: "Service de restauration scolaire.",
    },
  },
  note_tris_dechets: {
    label: "♻️ Note sur le tri des déchets",
    description:
      "Expliquer comment trier les déchets au self, dans la cour ou les couloirs.",
    valeurs: {
      typeDoc: "note_equipe",
      publicCible: "toute_equipe",
      titreDoc: "Note – Organisation du tri des déchets dans l’établissement",
      objectif:
        "Expliquer le tri (poubelles, bacs spécifiques) et le rôle de chacun (élèves, adultes, agents).",
      ton: "pédagogique, clair, encourageant",
      typeService: "Tri des déchets, propreté de l’établissement.",
    },
  },
  protocole_tonte_arbres_securite: {
    label: "🌳 Entretien des espaces verts – Sécurité",
    description:
      "Rappeler les règles de sécurité pour la tonte, la taille des arbres, l’utilisation du matériel.",
    valeurs: {
      typeDoc: "fiche_securite",
      publicCible: "maintenance_espaces_verts",
      titreDoc: "Fiche sécurité – Entretien des espaces verts et des arbres",
      objectif:
        "Lister les règles de sécurité (EPI, périmètre de sécurité, signalisation) pour la tonte, la taille, l’élagage.",
      ton: "précis, simple, orienté sécurité",
      typeService: "Entretien des espaces verts et des arbres de l’établissement.",
    },
  },
  remerciements_agents: {
    label: "💚 Message de remerciements aux équipes",
    description:
      "Préparer un texte de remerciement pour les agents (nettoyage, cantine, espaces verts…).",
    valeurs: {
      typeDoc: "remerciement",
      publicCible: "toute_equipe",
      titreDoc: "Message de remerciements aux personnels techniques et de service",
      objectif:
        "Valoriser le travail souvent invisible des agents : propreté, repas, entretien des espaces extérieurs.",
      ton: "chaleureux, sincère, valorisant",
      typeService: "Tous les services (entretien, cantine, espaces verts…).",
    },
  },
  info_travaux_cour_equipe: {
    label: "🚧 Information travaux dans la cour",
    description:
      "Informer les équipes sur des travaux prévus (élagage, réfection, nettoyage haute pression…).",
    valeurs: {
      typeDoc: "courrier_direction",
      publicCible: "direction",
      titreDoc: "Information interne sur des travaux dans la cour",
      objectif:
        "Informer la direction et/ou l’équipe éducative des travaux, de la durée, des zones fermées et des mesures de sécurité.",
      ton: "professionnel, informatif, clair",
      typeService: "Intervention technique / espaces verts / maintenance.",
    },
  },
};

/* ----------------------------------------
   CAROUSEL ITEMS
---------------------------------------- */

const PERSONNEL_PRESET_ITEMS: PresetCarouselItem[] = (
  Object.entries(PERSONNEL_PRESETS) as [PersonnelPresetKey, PersonnelPreset][]
).map(([key, preset]) => ({
  id: key,
  label: preset.label,
  description: preset.description,
  badge: "Personnels & services",
}));

/* ----------------------------------------
   PAGE
---------------------------------------- */

export default function EspacePersonnelsPage() {
  const [form, setForm] = useState<PersonnelPromptState>({
    nomEtab: "",
    typeEtab: "college",
    ville: "",
    contexte: "",
    nbEleves: "",
    nbProfs: "",
    publicCible: "agents_entretien",
    typeDoc: "consigne_travail",
    titreDoc: "",
    objectif: "",
    contraintes: "",
    ton: "simple, clair, respectueux",
    typeService: "",
  });

  const [promptFinal, setPromptFinal] = useState("");
  const [copied, setCopied] = useState(false);

  /* -------- Helpers -------- */

  function handleChange<K extends keyof PersonnelPromptState>(
    field: K,
    value: PersonnelPromptState[K],
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function appliquerPreset(key: PersonnelPresetKey) {
    const preset = PERSONNEL_PRESETS[key];
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

  function descriptionPublic(p: PublicCiblePersonnel) {
    switch (p) {
      case "agents_entretien":
        return "aux agents d’entretien et de nettoyage de l’établissement";
      case "cuisine":
        return "aux personnels de cuisine et de la restauration scolaire";
      case "maintenance_espaces_verts":
        return "aux agents chargés de la maintenance, des bâtiments et des espaces verts";
      case "direction":
        return "à la direction ou aux responsables administratifs";
      case "toute_equipe":
      default:
        return "à l’ensemble des personnels non enseignants (entretien, cantine, espaces verts, maintenance)";
    }
  }

  function descriptionTypeDoc(t: TypeDocPersonnel) {
    switch (t) {
      case "consigne_travail":
        return "une consigne de travail simple et claire pour l’équipe";
      case "note_equipe":
        return "une note interne courte à destination d’une équipe";
      case "courrier_direction":
        return "un message plus formel pour la direction ou la hiérarchie";
      case "fiche_securite":
        return "une fiche rappelant les règles de sécurité et les bons réflexes";
      case "protocole":
        return "un protocole détaillant des étapes de travail";
      case "affiche":
        return "une petite affiche lisible par les élèves et les adultes";
      case "remerciement":
        return "un message de remerciement et de valorisation du travail réalisé";
      case "autre":
      default:
        return "un document simple lié à l’organisation du travail des personnels";
    }
  }

  /* -------- Génération du prompt -------- */

  function genererPrompt() {
    const nomEtab = form.nomEtab.trim() || "un établissement scolaire";
    const ville = form.ville.trim();
    const contexte =
      form.contexte.trim() ||
      "contexte habituel d’un établissement scolaire public français";
    const typeEtabLibelle = libelleTypeEtab(form.typeEtab);
    const publicDesc = descriptionPublic(form.publicCible);
    const typeDocDesc = descriptionTypeDoc(form.typeDoc);
    const titreDoc =
      form.titreDoc.trim() ||
      "Document à destination des personnels techniques et de service";

    const nbEleves =
      form.nbEleves.trim() !== "" ? form.nbEleves.trim() : "non précisé";
    const nbProfs =
      form.nbProfs.trim() !== "" ? form.nbProfs.trim() : "non précisé";

    const typeService =
      form.typeService.trim() ||
      "Service d’entretien, de restauration scolaire ou d’espaces verts.";

    const objectif =
      form.objectif.trim() ||
      "donner un cadre clair, respectueux et réaliste au travail des personnels.";

    const contraintes = form.contraintes.trim();
    const ton =
      form.ton.trim() ||
      "simple, clair, respectueux du travail des agents, sans jargon administratif complexe";

    const contexteEtab =
      `Contexte de l’établissement :\n` +
      `- Nom : ${nomEtab}\n` +
      `- Type : ${typeEtabLibelle}\n` +
      (ville ? `- Localisation : ${ville}\n` : "") +
      `- Nombre approximatif d’élèves : ${nbEleves}\n` +
      `- Nombre approximatif d’enseignants : ${nbProfs}\n` +
      `- Contexte particulier : ${contexte}\n\n`;

    const blocService =
      `Service concerné :\n` +
      `- Type de service : ${typeService}\n` +
      `- Public cible : ce document s’adresse ${publicDesc}.\n` +
      `- Type de document souhaité : ${typeDocDesc}.\n` +
      `- Titre envisagé : « ${titreDoc} ».\n` +
      `- Objectif principal : ${objectif}\n\n`;

    const blocContraintesAdditionnelles =
      contraintes.length > 0
        ? `Contraintes ou points à intégrer :\n${contraintes}\n\n`
        : "";

    const blocContraintesFixes =
      `Contraintes générales à respecter :\n` +
      `- Le document doit utiliser un vocabulaire simple, compréhensible par tous les membres de l’équipe.\n` +
      `- Le ton doit être ${ton}.\n` +
      `- Le texte doit respecter le travail des personnels et éviter toute formulation culpabilisante.\n` +
      `- Le document doit tenir compte de la réalité du terrain (temps disponible, matériel réellement présent).\n` +
      `- S’il s’agit de sécurité (produits, machines, outils), rappeler les points essentiels sans se substituer aux notices officielles.\n\n`;

    const blocMission =
      `Ta mission en tant qu’IA assistant la direction ou le responsable de service :\n` +
      `1. Proposer un plan ou une structure du document, adaptée au type de document (note, protocole, fiche sécurité, affiche, etc.).\n` +
      `2. Rédiger ensuite le document complet en français, avec des phrases courtes et simples.\n` +
      `3. Si c’est une affiche, proposer un texte clair, lisible, éventuellement avec des listes à puces.\n` +
      `4. Si c’est un protocole ou une consigne de travail, détailler les étapes dans un ordre logique, avec des puces ou des numéros.\n` +
      `5. Terminer par 3 à 5 « points à vérifier » pour la direction ou le responsable de service (réalisme, matériel disponible, sécurité, etc.).\n`;

    const prompt =
      `Tu es une IA assistant la direction ou le responsable de service d’un établissement scolaire pour communiquer avec les personnels non enseignants (agents d’entretien, personnels de cantine, agents des espaces verts, maintenance…).\n\n` +
      contexteEtab +
      blocService +
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
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-10 lg:py-14 space-y-8">
        {/* HERO */}
        <section className="rounded-3xl bg-white/90 p-6 lg:p-8 shadow-sm ring-1 ring-emerald-100">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="space-y-4">
              <p className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 ring-1 ring-emerald-100">
                Espace personnels & services · entretien · cantine · espaces verts
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
                Générateur de prompts pour les personnels techniques et de service
              </h1>
              <p className="max-w-2xl text-sm sm:text-base text-slate-700">
                Un assistant pour t’aider à préparer des consignes, notes internes,
                fiches sécurité, protocoles ou messages de remerciement à destination
                des personnes qui font vivre l’établissement au quotidien :
                nettoyage, cantine, espaces verts, maintenance.
              </p>
            </div>

            <div className="max-w-xs rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-xs text-emerald-950 shadow-inner space-y-1.5">
              <p className="font-semibold">Idées d’usage</p>
              <ul className="space-y-1">
                <li>• Planifier un grand ménage.</li>
                <li>• Préparer une fiche sécurité pour l’élagage.</li>
                <li>• Créer une affiche pour la cantine.</li>
                <li>• Rédiger un message de remerciement aux équipes.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* PRESETS – CARROUSEL */}
        <PresetCarousel
          title="1️⃣ Choisir un modèle (facultatif)"
          subtitle="Tu peux partir d’un modèle proche de ton besoin, puis adapter les informations dans le formulaire."
          items={PERSONNEL_PRESET_ITEMS}
          onSelect={(id) => appliquerPreset(id as PersonnelPresetKey)}
        />

        {/* FORM + PROMPT */}
        <section className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          {/* FORMULAIRE */}
          <div className="rounded-3xl bg-white p-6 lg:p-7 shadow-md ring-1 ring-slate-100 space-y-5">
            <h2 className="text-base font-semibold text-slate-900 mb-1">
              2️⃣ Décrire le contexte et le document
            </h2>

            {/* Bloc établissement */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Établissement
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
                    placeholder="Ex : 450"
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
                  Contexte particulier (facultatif)
                </label>
                <textarea
                  value={form.contexte}
                  onChange={(e) => handleChange("contexte", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 shadow-inner min-h-[60px] focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  placeholder="Ex : Nombreux bâtiments, internat, grande cour à entretenir, restauration sur plusieurs services, etc."
                />
              </div>
            </div>

            {/* Bloc service & document */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Service & document
              </h3>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Type de service concerné
                </label>
                <input
                  type="text"
                  value={form.typeService}
                  onChange={(e) => handleChange("typeService", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  placeholder="Ex : ménage des salles, plonge et service cantine, tonte et taille des arbres, etc."
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
                      handleChange(
                        "typeDoc",
                        e.target.value as TypeDocPersonnel,
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  >
                    <option value="consigne_travail">
                      Consigne de travail / organisation
                    </option>
                    <option value="note_equipe">Note interne à l’équipe</option>
                    <option value="courrier_direction">
                      Message / note à la direction
                    </option>
                    <option value="fiche_securite">Fiche sécurité</option>
                    <option value="protocole">Protocole / procédure</option>
                    <option value="affiche">Affiche simple</option>
                    <option value="remerciement">Message de remerciement</option>
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
                        e.target.value as PublicCiblePersonnel,
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  >
                    <option value="agents_entretien">
                      Agents d’entretien / ménage
                    </option>
                    <option value="cuisine">
                      Personnels de cuisine / cantine
                    </option>
                    <option value="maintenance_espaces_verts">
                      Agents de maintenance / espaces verts
                    </option>
                    <option value="toute_equipe">
                      Tous les personnels techniques et de service
                    </option>
                    <option value="direction">Direction / hiérarchie</option>
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
                  placeholder='Ex : "Consignes pour l’entretien des salles après les examens"'
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
                  placeholder="Ex : organiser les tâches, clarifier qui fait quoi, rappeler quelques règles de sécurité, remercier l’équipe pour son travail, etc."
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
                  placeholder="Ex : temps limité, matériel disponible, besoin de faire simple, consignes sur les produits chimiques, etc."
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
                  placeholder="Ex : simple et concret, chaleureux et reconnaissant, clair et ferme sur la sécurité, etc."
                />
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button
                  onClick={genererPrompt}
                  className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                >
                  ⚙️ Générer le prompt personnels & services
                </button>
                <p className="text-xs text-slate-500">
                  Tu pourras ensuite coller ce prompt dans EleveAI ou dans
                  l’IA de ton choix pour générer le document.
                </p>
              </div>
            </div>
          </div>

          {/* PROMPT FINAL */}
          <div className="rounded-3xl bg-white/95 p-5 lg:p-6 shadow-sm ring-1 ring-slate-100 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-slate-900">
                3️⃣ Prompt final pour les personnels techniques et de service
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
              placeholder="Renseigne le formulaire puis clique sur « Générer le prompt personnels & services » : il apparaîtra ici, prêt à être collé dans une IA."
            />
          </div>
        </section>
      </div>
    </main>
  );
}
