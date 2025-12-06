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
  typeSituation: string;
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
      "Formuler un message apaisant à un élève après un conflit (entretien, ENT, médiation).",
    valeurs: {
      typeDoc: "message_eleve",
      publicCible: "eleve",
      titreDoc: "Message de suivi après un conflit entre élèves",
      objectif:
        "Apaiser la situation, rappeler les règles, proposer une médiation.",
      ton: "bienveillant, calme, ferme mais respectueux",
      typeSituation: "Conflit (insultes, tensions, altercation).",
    },
  },

  harcelement_mail_famille: {
    label: "🛡️ Suspicion de harcèlement – Courriel aux familles",
    description:
      "Informer une famille d’une situation préoccupante, sans accuser, en rassurant.",
    valeurs: {
      typeDoc: "courrier_famille",
      publicCible: "famille",
      titreDoc: "Information aux familles – Situation préoccupante",
      objectif:
        "Informer de manière factuelle et proposer une rencontre sans stigmatiser.",
      ton: "professionnel, prudent, rassurant",
      typeSituation: "Suspicion ou début de harcèlement.",
    },
  },

  retards_rappel_regles: {
    label: "⏰ Retards répétés – Message à l’élève",
    description: "Rappeler le cadre, comprendre la difficulté, éviter la sanction sèche.",
    valeurs: {
      typeDoc: "message_eleve",
      publicCible: "eleve",
      titreDoc: "Rappel du cadre concernant les retards",
      objectif:
        "Rappeler le cadre, expliquer l’impact, proposer un échange.",
      ton: "ferme mais empathique",
      typeSituation: "Retards fréquents.",
    },
  },

  sanction_compte_rendu: {
    label: "📄 Sanction éducative – Compte rendu aux familles",
    description: "Expliquer la mesure éducative, les faits, le sens.",
    valeurs: {
      typeDoc: "compte_rendu_sanction",
      publicCible: "famille",
      titreDoc: "Compte rendu d’une mesure éducative",
      objectif:
        "Présenter clairement les faits, la sanction éducative et son objectif.",
      ton: "neutre, professionnel, explicatif",
      typeSituation:
        "Non-respect du règlement, comportement perturbateur.",
    },
  },

  suivi_reunion_equipe: {
    label: "📋 Fiche de suivi – Réunion équipe éducative",
    description:
      "Synthèse pour suivi d’élève fragile, difficultés scolaires ou comportementales.",
    valeurs: {
      typeDoc: "fiche_suivi",
      publicCible: "equipe_educative",
      titreDoc: "Fiche de suivi éducatif",
      objectif:
        "Présenter les faits, les mesures, les observations, les propositions.",
      ton: "factuel, structuré, collaboratif",
      typeSituation: "Élève en difficulté nécessitant un suivi.",
    },
  },

  climat_note_generale: {
    label: "🌈 Climat scolaire – Note générale aux familles",
    description:
      "Rappel du cadre : respect, téléphone, retards, absences.",
    valeurs: {
      typeDoc: "note_regles",
      publicCible: "famille",
      titreDoc: "Rappel des règles de vie scolaire",
      objectif:
        "Rappeler calmement 3–4 règles clés pour améliorer le climat scolaire.",
      ton: "positif, clair, non culpabilisant",
      typeSituation: "Rappel général.",
    },
  },

  protocole_retards_exclusions: {
    label: "📘 Protocole retards / exclusions – Document interne",
    description:
      "Créer un protocole pour AED/CPE : retards, exclusions ponctuelles, traçabilité.",
    valeurs: {
      typeDoc: "protocole_vie_scolaire",
      publicCible: "equipe_vie_scolaire",
      titreDoc: "Protocole interne – Retards et exclusions",
      objectif:
        "Structurer les étapes : prise en charge, écrits, communication familles.",
      ton: "institutionnel, clair, opérationnel",
      typeSituation: "Protocole interne vie scolaire.",
    },
  },
};

/* ----------------------------------------
   CAROUSEL ITEMS
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

export default function EspaceVieScolairePage() {
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

  /* -------- Helpers -------- */

  function handleChange<K extends keyof VieScoPromptState>(
    field: K,
    value: VieScoPromptState[K],
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function appliquerPreset(key: VieScoPresetKey) {
    const preset = VIESCO_PRESETS[key];
    setForm((prev) => ({ ...prev, ...preset.valeurs }));
  }

  /* -------- Génération du prompt -------- */

  function genererPrompt() {
    const prompt =
      `Tu es un assistant IA spécialisé en vie scolaire.\n\n` +
      `Contexte établissement :\n` +
      `- Nom : ${form.nomEtab || "Établissement scolaire"}\n` +
      `- Ville : ${form.ville || "non précisé"}\n` +
      `- Type : ${form.typeEtab}\n` +
      `- Élèves : ${form.nbEleves || "non précisé"}\n` +
      `- Professeurs : ${form.nbProfs || "non précisé"}\n` +
      `- Contexte : ${form.contexte || "non précisé"}\n\n` +
      `Situation : ${form.typeSituation || "situation de vie scolaire"}\n\n` +
      `Document à produire : ${form.typeDoc}\n` +
      `Public cible : ${form.publicCible}\n` +
      `Titre : ${form.titreDoc || "Document de vie scolaire"}\n` +
      `Objectif : ${form.objectif || "Clarifier, aider, apaiser, cadrer."}\n` +
      `Ton attendu : ${form.ton}\n\n` +
      `Contraintes :\n${form.contraintes || "Aucune contrainte supplémentaire."}\n\n` +
      `Rédige :\n` +
      `1. Un plan clair et lisible\n` +
      `2. Le document complet\n` +
      `3. Une section finale : "Points de vigilance vie scolaire"\n`;

    setPromptFinal(prompt);
    setCopied(false);
  }

  async function copierPrompt() {
    if (!promptFinal) return;
    await navigator.clipboard.writeText(promptFinal);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  /* ----------------------------------------
     RENDER
  ---------------------------------------- */

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-10 lg:py-14 space-y-8">

        {/* HERO */}
        <section className="rounded-3xl bg-white p-6 lg:p-8 shadow-sm ring-1 ring-emerald-100">
          <h1 className="text-3xl font-bold mb-2">
            Espace Vie Scolaire – EleveAI
          </h1>
          <p className="text-slate-700 max-w-2xl">
            Générateur de prompts pour la vie scolaire : conflits, retards, harcèlement,
            suivi, sanctions éducatives, protocoles AED/CPE, communication familles.
          </p>
        </section>

        {/* PRESETS */}
        <PresetCarousel
          title="1️⃣ Choisis un modèle (facultatif)"
          subtitle="Retards, sanctions, conflits, harcèlement, protocoles... sélectionne une situation courante."
          items={VIESCO_PRESET_ITEMS}
          onSelect={(id) => appliquerPreset(id as VieScoPresetKey)}
        />

        {/* FORM + PROMPT */}
        <section className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          
          {/* FORM */}
          <div className="rounded-3xl bg-white p-6 lg:p-7 shadow-md ring-1 ring-slate-100 space-y-4">
            <h2 className="text-lg font-semibold">2️⃣ Décris ta situation</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                placeholder="Nom établissement"
                value={form.nomEtab}
                onChange={(e) => handleChange("nomEtab", e.target.value)}
                className="border rounded-xl px-3 py-2 bg-slate-50"
              />
              <input
                placeholder="Ville"
                value={form.ville}
                onChange={(e) => handleChange("ville", e.target.value)}
                className="border rounded-xl px-3 py-2 bg-slate-50"
              />
            </div>

            <textarea
              placeholder="Contexte (facultatif)"
              value={form.contexte}
              onChange={(e) => handleChange("contexte", e.target.value)}
              className="border rounded-xl px-3 py-2 bg-slate-50 min-h-[60px]"
            />

            <textarea
              placeholder="Type de situation (conflit, retards, harcèlement...)"
              value={form.typeSituation}
              onChange={(e) => handleChange("typeSituation", e.target.value)}
              className="border rounded-xl px-3 py-2 bg-slate-50 min-h-[60px]"
            />

            <select
              value={form.typeDoc}
              onChange={(e) =>
                handleChange("typeDoc", e.target.value as TypeDocVieSco)
              }
              className="border rounded-xl px-3 py-2 bg-slate-50"
            >
              <option value="message_eleve">Message élève</option>
              <option value="courrier_famille">Courrier famille</option>
              <option value="rapport_incident">Rapport d'incident</option>
              <option value="fiche_suivi">Fiche de suivi</option>
              <option value="compte_rendu_sanction">Compte rendu sanction</option>
              <option value="note_regles">Note règles</option>
              <option value="protocole_vie_scolaire">Protocole vie scolaire</option>
            </select>

            <input
              placeholder="Titre du document"
              value={form.titreDoc}
              onChange={(e) => handleChange("titreDoc", e.target.value)}
              className="border rounded-xl px-3 py-2 bg-slate-50"
            />

            <textarea
              placeholder="Objectif"
              value={form.objectif}
              onChange={(e) => handleChange("objectif", e.target.value)}
              className="border rounded-xl px-3 py-2 bg-slate-50 min-h-[70px]"
            />

            <textarea
              placeholder="Contraintes (facultatif)"
              value={form.contraintes}
              onChange={(e) => handleChange("contraintes", e.target.value)}
              className="border rounded-xl px-3 py-2 bg-slate-50 min-h-[60px]"
            />

            <input
              placeholder="Ton souhaité"
              value={form.ton}
              onChange={(e) => handleChange("ton", e.target.value)}
              className="border rounded-xl px-3 py-2 bg-slate-50"
            />

            <button
              onClick={genererPrompt}
              className="rounded-full bg-emerald-600 text-white px-5 py-2.5 text-sm font-semibold hover:bg-emerald-700"
            >
              ⚙️ Générer le prompt vie scolaire
            </button>
          </div>

          {/* PROMPT */}
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-sm">
                3️⃣ Prompt final
              </h3>
              <button
                onClick={copierPrompt}
                disabled={!promptFinal}
                className="text-xs rounded-full border px-3 py-1.5 hover:bg-slate-100"
              >
                {copied ? "✅ Copié" : "📋 Copier"}
              </button>
            </div>

            <textarea
              readOnly
              value={promptFinal}
              className="w-full min-h-[260px] rounded-xl border bg-slate-50 px-3 py-2 text-xs font-mono"
              placeholder="Le prompt apparaîtra ici"
            />
          </div>
        </section>
      </div>
    </main>
  );
}

