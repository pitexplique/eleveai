// app/espace-eleves/VieScolaireClient.tsx
"use client";

import { useMemo, useState } from "react";
import {
  PresetCarousel,
  PresetCarouselItem,
} from "@/components/PresetCarousel";

export { metadata } from "./metadata";


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
      objectif: "Apaiser la situation, rappeler les règles, proposer une médiation.",
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
    description:
      "Rappeler le cadre, comprendre la difficulté, éviter la sanction sèche.",
    valeurs: {
      typeDoc: "message_eleve",
      publicCible: "eleve",
      titreDoc: "Rappel du cadre concernant les retards",
      objectif: "Rappeler le cadre, expliquer l’impact, proposer un échange.",
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
      objectif: "Présenter clairement les faits, la sanction éducative et son objectif.",
      ton: "neutre, professionnel, explicatif",
      typeSituation: "Non-respect du règlement, comportement perturbateur.",
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
      objectif: "Présenter les faits, les mesures, les observations, les propositions.",
      ton: "factuel, structuré, collaboratif",
      typeSituation: "Élève en difficulté nécessitant un suivi.",
    },
  },

  climat_note_generale: {
    label: "🌈 Climat scolaire – Note générale aux familles",
    description: "Rappel du cadre : respect, téléphone, retards, absences.",
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
   UI HELPERS
---------------------------------------- */

function FieldLabel({
  title,
  hint,
  required,
}: {
  title: string;
  hint?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-0.5">
      <p className="text-sm font-semibold text-slate-900">
        {title} {required ? <span className="text-rose-600">*</span> : null}
      </p>
      {hint ? <p className="text-xs text-slate-500">{hint}</p> : null}
    </div>
  );
}

/* ----------------------------------------
   “COLLER DANS …” (comme la photo)
---------------------------------------- */

function CollerDansBar({
  promptFinal,
  onCopy,
}: {
  promptFinal: string;
  onCopy: () => Promise<void>;
}) {
  const encoded = useMemo(
    () => encodeURIComponent(promptFinal || ""),
    [promptFinal],
  );

  const disabled = !promptFinal;

  const baseBtn =
    "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-sm transition active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed";

  async function openEleveAI() {
    if (!promptFinal) return;
    await onCopy();
    window.open("/tchat", "_blank");
  }

  function openChatGPT() {
    if (!promptFinal) return;
    // selon versions, ChatGPT peut ignorer ?q= ; le copy reste l’essentiel
    window.open(`https://chat.openai.com/?q=${encoded}`, "_blank");
  }

  function openGemini() {
    if (!promptFinal) return;
    window.open(`https://gemini.google.com/app?q=${encoded}`, "_blank");
  }

  function openClaude() {
    if (!promptFinal) return;
    // Claude : souvent pas de pré-remplissage via URL → on ouvre, l’utilisateur colle
    window.open("https://claude.ai/new", "_blank");
  }

  function openMistral() {
    if (!promptFinal) return;
    // Mistral : idem
    window.open("https://chat.mistral.ai/", "_blank");
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-slate-700">Coller dans :</p>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={openEleveAI}
          disabled={disabled}
          className={`${baseBtn} bg-emerald-600 hover:bg-emerald-700`}
          title="Copie le prompt puis ouvre /tchat"
        >
          🚀 Tchat EleveAI
        </button>

        <button
          onClick={openChatGPT}
          disabled={disabled}
          className={`${baseBtn} bg-slate-800 hover:bg-slate-900`}
          title="Ouvre ChatGPT"
        >
          <span className="inline-block h-3 w-3 rounded-sm bg-sky-400" />
          ChatGPT
        </button>

        <button
          onClick={openGemini}
          disabled={disabled}
          className={`${baseBtn} bg-emerald-500 hover:bg-emerald-600`}
          title="Ouvre Gemini"
        >
          <span className="inline-block h-3 w-3 rounded-sm bg-emerald-200" />
          Gemini
        </button>

        <button
          onClick={openClaude}
          disabled={disabled}
          className={`${baseBtn} bg-indigo-500 hover:bg-indigo-600`}
          title="Ouvre Claude (puis colle le prompt)"
        >
          <span className="inline-block h-3 w-3 rounded-sm bg-indigo-200" />
          Claude
        </button>

        <button
          onClick={openMistral}
          disabled={disabled}
          className={`${baseBtn} bg-orange-500 hover:bg-orange-600`}
          title="Ouvre Mistral (puis colle le prompt)"
        >
          <span className="inline-block h-3 w-3 rounded-sm bg-orange-200" />
          Mistral
        </button>
      </div>
    </div>
  );
}

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
        {/* HEADER */}
        <section className="rounded-3xl bg-white p-6 lg:p-8 shadow-sm ring-1 ring-sky-100">
          <div className="space-y-4">
            <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-xs font-semibold text-[#0047B6]">
              🧭 Espace vie scolaire · Communication & suivi éducatif
            </p>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0047B6]">
              Générateur de prompts pour la vie scolaire
            </h1>

            <p className="text-sm sm:text-base text-slate-700 max-w-2xl">
              Décris une situation (retards, conflit, sanction, suivi, harcèlement).
              EleveAI t’aide à rédiger un <b>message</b>, un <b>courrier</b>, un
              <b> compte rendu</b> ou un <b>protocole</b>, avec un ton adapté et professionnel.
            </p>
          </div>
        </section>


        {/* PRESETS */}
        <PresetCarousel
          title="1️⃣ Choisis un modèle (facultatif)"
          subtitle="Retards, sanctions, conflits, harcèlement, protocoles... sélectionne une situation courante."
          items={VIESCO_PRESET_ITEMS}
          onSelect={(id) => appliquerPreset(id as VieScoPresetKey)}
        />

        {/* FORM + PROMPT */}
        <section className="grid gap-6 lg:grid-cols-[1.15fr,0.85fr]">
          {/* FORM */}
          <div className="rounded-3xl bg-white p-6 lg:p-7 shadow-md ring-1 ring-slate-100 space-y-6">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">2️⃣ Décris ta situation</h2>
              <p className="text-sm text-slate-600">
                Renseigne l’essentiel, puis ajuste pour obtenir un document plus juste.
              </p>
            </div>

            {/* ÉTABLISSEMENT */}
            <div className="rounded-2xl border bg-slate-50/60 p-4 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-slate-900">🏫 Établissement</p>
                <p className="text-xs text-slate-500">optionnel</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <FieldLabel title="Nom" hint="Ex. Collège …" />
                  <input
                    placeholder="Nom établissement"
                    value={form.nomEtab}
                    onChange={(e) => handleChange("nomEtab", e.target.value)}
                    className="w-full border rounded-2xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  />
                </div>

                <div className="space-y-2">
                  <FieldLabel title="Ville / Commune" hint="Ex. Saint-Pierre" />
                  <input
                    placeholder="Ville"
                    value={form.ville}
                    onChange={(e) => handleChange("ville", e.target.value)}
                    className="w-full border rounded-2xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  />
                </div>

                <div className="space-y-2">
                  <FieldLabel title="Type d’établissement" />
                  <select
                    value={form.typeEtab}
                    onChange={(e) =>
                      handleChange("typeEtab", e.target.value as TypeEtab)
                    }
                    className="w-full border rounded-2xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  >
                    <option value="college">Collège</option>
                    <option value="lycee">Lycée</option>
                    <option value="lycee_pro">Lycée pro</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <FieldLabel title="Nb élèves" hint="approx." />
                    <input
                      inputMode="numeric"
                      placeholder="Ex. 520"
                      value={form.nbEleves}
                      onChange={(e) => handleChange("nbEleves", e.target.value)}
                      className="w-full border rounded-2xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <FieldLabel title="Nb profs" hint="approx." />
                    <input
                      inputMode="numeric"
                      placeholder="Ex. 45"
                      value={form.nbProfs}
                      onChange={(e) => handleChange("nbProfs", e.target.value)}
                      className="w-full border rounded-2xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <FieldLabel
                  title="Contexte"
                  hint="Éléments factuels (période, classe, contexte général…)."
                />
                <textarea
                  placeholder="Ex. Depuis la rentrée, tensions au sein de la 4e2…"
                  value={form.contexte}
                  onChange={(e) => handleChange("contexte", e.target.value)}
                  className="w-full border rounded-2xl px-3 py-2 bg-white min-h-[80px] resize-y focus:outline-none focus:ring-2 focus:ring-emerald-200"
                />
              </div>
            </div>

            {/* SITUATION & DOCUMENT */}
            <div className="rounded-2xl border bg-white p-4 space-y-4">
              <p className="text-sm font-bold text-slate-900">🧩 Situation & document</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <FieldLabel
                    title="Type de document"
                    required
                    hint="Message, courrier, rapport, protocole…"
                  />
                  <select
                    value={form.typeDoc}
                    onChange={(e) =>
                      handleChange("typeDoc", e.target.value as TypeDocVieSco)
                    }
                    className="w-full border rounded-2xl px-3 py-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  >
                    <option value="message_eleve">Message élève</option>
                    <option value="courrier_famille">Courrier famille</option>
                    <option value="rapport_incident">Rapport d’incident</option>
                    <option value="fiche_suivi">Fiche de suivi</option>
                    <option value="compte_rendu_sanction">Compte rendu sanction</option>
                    <option value="note_regles">Note règles</option>
                    <option value="protocole_vie_scolaire">
                      Protocole vie scolaire
                    </option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <FieldLabel
                    title="Public cible"
                    required
                    hint="Élève, famille, équipe…"
                  />
                  <select
                    value={form.publicCible}
                    onChange={(e) =>
                      handleChange(
                        "publicCible",
                        e.target.value as PublicCibleVieSco,
                      )
                    }
                    className="w-full border rounded-2xl px-3 py-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  >
                    <option value="eleve">Élève</option>
                    <option value="famille">Famille</option>
                    <option value="equipe_vie_scolaire">Équipe vie scolaire</option>
                    <option value="equipe_educative">Équipe éducative</option>
                    <option value="direction">Direction</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <FieldLabel
                  title="Type de situation"
                  required
                  hint="1–2 phrases : faits, date, lieu, personnes (sans noms si besoin)."
                />
                <textarea
                  placeholder="Ex. Altercation entre deux élèves à la sortie du cours…"
                  value={form.typeSituation}
                  onChange={(e) => handleChange("typeSituation", e.target.value)}
                  className="w-full border rounded-2xl px-3 py-2 bg-slate-50 min-h-[90px] resize-y focus:outline-none focus:ring-2 focus:ring-emerald-200"
                />
                <p className="text-xs text-slate-500">{form.typeSituation.length}/500</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <FieldLabel title="Titre du document" hint="Court et clair." />
                  <input
                    placeholder="Ex. Rappel du cadre – retards"
                    value={form.titreDoc}
                    onChange={(e) => handleChange("titreDoc", e.target.value)}
                    className="w-full border rounded-2xl px-3 py-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  />
                </div>

                <div className="space-y-2">
                  <FieldLabel
                    title="Ton souhaité"
                    hint="Ex. neutre, apaisant, ferme, institutionnel…"
                  />
                  <input
                    placeholder="Ex. ferme mais empathique"
                    value={form.ton}
                    onChange={(e) => handleChange("ton", e.target.value)}
                    className="w-full border rounded-2xl px-3 py-2 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <FieldLabel
                  title="Objectif"
                  required
                  hint="Ce que tu veux obtenir (apaiser, cadrer, informer…)."
                />
                <textarea
                  placeholder="Ex. Apaiser, rappeler les règles, proposer une médiation…"
                  value={form.objectif}
                  onChange={(e) => handleChange("objectif", e.target.value)}
                  className="w-full border rounded-2xl px-3 py-2 bg-slate-50 min-h-[90px] resize-y focus:outline-none focus:ring-2 focus:ring-emerald-200"
                />
              </div>

              <div className="space-y-2">
                <FieldLabel
                  title="Contraintes"
                  hint="Mentions obligatoires, anonymisation, longueur, prudence…"
                />
                <textarea
                  placeholder="Ex. Ne pas citer de noms, rester factuel, 10 lignes max…"
                  value={form.contraintes}
                  onChange={(e) => handleChange("contraintes", e.target.value)}
                  className="w-full border rounded-2xl px-3 py-2 bg-slate-50 min-h-[80px] resize-y focus:outline-none focus:ring-2 focus:ring-emerald-200"
                />
              </div>
            </div>

            <button
              onClick={genererPrompt}
              className="rounded-full bg-emerald-600 text-white px-5 py-2.5 text-sm font-semibold hover:bg-emerald-700 active:scale-[0.99]"
            >
              ⚙️ Générer le prompt vie scolaire
            </button>
          </div>

          {/* PROMPT */}
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100 space-y-3">
            <div className="flex justify-between items-start gap-3">
              <div>
                <h3 className="font-semibold text-sm">3️⃣ Prompt final</h3>
                <p className="text-xs text-slate-500">
                  Génère puis clique sur un bouton “Coller dans …”
                </p>
              </div>

              <button
                onClick={copierPrompt}
                disabled={!promptFinal}
                className="text-xs rounded-full border px-3 py-1.5 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {copied ? "✅ Copié" : "📋 Copier"}
              </button>
            </div>

            {/* ✅ BARRE “COLLER DANS …” (comme la photo) */}
            <CollerDansBar promptFinal={promptFinal} onCopy={copierPrompt} />

            <textarea
              readOnly
              value={promptFinal}
              className="w-full min-h-[300px] rounded-2xl border bg-slate-50 px-3 py-3 text-xs font-mono"
              placeholder="Le prompt apparaîtra ici"
            />

            <div className="rounded-2xl border bg-emerald-50/60 p-4">
              <p className="text-sm font-semibold text-emerald-900">
                ✅ Points de vigilance
              </p>
              <ul className="mt-2 text-xs text-emerald-900/80 space-y-1 list-disc pl-4">
                <li>Rester factuel, sans accusation.</li>
                <li>Anonymiser si besoin.</li>
                <li>Adapter le ton au destinataire.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
