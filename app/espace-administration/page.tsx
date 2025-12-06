"use client";

import { useState } from "react";

/* ----------------------------------------
   TYPES
---------------------------------------- */

type TypeEtab = "college" | "lycee" | "lycee_pro" | "autre";
type PublicCible = "parents" | "profs" | "eleves" | "ca" | "toute_communaute";
type TypeDoc =
  | "charte"
  | "note_parents"
  | "projet_pilote"
  | "protocole_triche"
  | "plan_formation"
  | "autre";

type AdminPromptState = {
  nomEtab: string;
  typeEtab: TypeEtab;
  ville: string;
  contexte: string;
  nbEleves: string;
  nbProfs: string;
  publicCible: PublicCible;
  typeDoc: TypeDoc;
  titreDoc: string;
  objectif: string;
  contraintes: string;
  ton: string;
};

type AdminPresetKey =
  | "charte_usage_ia"
  | "mail_parents_pilote"
  | "projet_pilote_CA"
  | "protocole_triche"
  | "plan_formation_profs";

type AdminPreset = {
  label: string;
  description: string;
  valeurs: Partial<AdminPromptState>;
};

/* ----------------------------------------
   PRESETS ADMINISTRATION
---------------------------------------- */

const ADMIN_PRESETS: Record<AdminPresetKey, AdminPreset> = {
  charte_usage_ia: {
    label: "📜 Charte d’usage de l’IA",
    description:
      "Rédiger une charte à intégrer au règlement intérieur ou au projet d’établissement.",
    valeurs: {
      typeDoc: "charte",
      publicCible: "toute_communaute",
      titreDoc: "Charte d’usage de l’intelligence artificielle dans l’établissement",
      objectif:
        "Poser un cadre clair et rassurant pour l’utilisation de l’IA par les élèves et les adultes, en lien avec le projet d’établissement.",
      ton: "institutionnel, clair et accessible",
    },
  },
  mail_parents_pilote: {
    label: "📧 Mail aux parents – Phase pilote IA",
    description:
      "Informer les parents d’un test d’outils IA (comme EleveAI) en classe.",
    valeurs: {
      typeDoc: "note_parents",
      publicCible: "parents",
      titreDoc:
        "Information aux familles – Mise en place d’un projet pilote autour de l’intelligence artificielle",
      objectif:
        "Expliquer le projet IA, rassurer sur les objectifs pédagogiques et les protections mises en place.",
      ton: "rassurant, pédagogique, respectueux",
    },
  },
  projet_pilote_CA: {
    label: "🏫 Projet pilote IA pour le CA",
    description:
      "Présenter un projet structuré au conseil d’administration ou conseil pédagogique.",
    valeurs: {
      typeDoc: "projet_pilote",
      publicCible: "ca",
      titreDoc:
        "Projet pilote : usages pédagogiques de l’intelligence artificielle dans l’établissement",
      objectif:
        "Présenter les objectifs, les bénéfices attendus, les étapes et les modalités d’évaluation du projet IA.",
      ton: "structuré, institutionnel, argumenté",
    },
  },
  protocole_triche: {
    label: "🛡️ Protocole anti-triche avec l’IA",
    description:
      "Clarifier la position de l’établissement sur la triche liée à l’IA.",
    valeurs: {
      typeDoc: "protocole_triche",
      publicCible: "toute_communaute",
      titreDoc:
        "Protocole de prévention et de gestion de la triche liée à l’usage de l’intelligence artificielle",
      objectif:
        "Définir ce qui est considéré comme triche, les usages autorisés, les sanctions et les actions de prévention.",
      ton: "ferme mais éducatif",
    },
  },
  plan_formation_profs: {
    label: "🎓 Plan de formation des professeurs",
    description:
      "Organiser un plan de formation des enseignants à l’IA pédagogique.",
    valeurs: {
      typeDoc: "plan_formation",
      publicCible: "profs",
      titreDoc:
        "Plan de formation des enseignants aux usages pédagogiques de l’intelligence artificielle",
      objectif:
        "Proposer un plan progressif de formation, de mutualisation et d’accompagnement des équipes pédagogiques.",
      ton: "coopératif, motivant, réaliste",
    },
  },
};

/* ----------------------------------------
   PAGE
---------------------------------------- */

export default function EspaceAdministrationPage() {
  const [form, setForm] = useState<AdminPromptState>({
    nomEtab: "",
    typeEtab: "college",
    ville: "",
    contexte: "",
    nbEleves: "",
    nbProfs: "",
    publicCible: "toute_communaute",
    typeDoc: "charte",
    titreDoc: "",
    objectif: "",
    contraintes: "",
    ton: "institutionnel, clair et accessible",
  });

  const [promptFinal, setPromptFinal] = useState("");
  const [copied, setCopied] = useState(false);

  /* --------- helpers --------- */

  function handleChange<K extends keyof AdminPromptState>(
    field: K,
    value: AdminPromptState[K],
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function appliquerPreset(key: AdminPresetKey) {
    const preset = ADMIN_PRESETS[key];
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

  function descriptionPublic(p: PublicCible) {
    switch (p) {
      case "parents":
        return "principalement aux parents et responsables légaux des élèves";
      case "profs":
        return "principalement à l’équipe pédagogique (enseignants, CPE, documentalistes)";
      case "eleves":
        return "principalement aux élèves de l’établissement";
      case "ca":
        return "au conseil d’administration et aux instances de pilotage de l’établissement";
      case "toute_communaute":
      default:
        return "à l’ensemble de la communauté éducative (élèves, parents, personnels)";
    }
  }

  function descriptionTypeDoc(t: TypeDoc) {
    switch (t) {
      case "charte":
        return "une charte formalisée, structurée en articles et principes clairs";
      case "note_parents":
        return "une note d’information / un courrier adressé aux parents";
      case "projet_pilote":
        return "un document de présentation de projet avec objectifs, étapes et évaluation";
      case "protocole_triche":
        return "un protocole décrivant les règles, les exemples de triche et les réponses éducatives";
      case "plan_formation":
        return "un plan de formation progressif pour les enseignants";
      case "autre":
      default:
        return "un document institutionnel en lien avec l’usage de l’IA";
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
      "Document institutionnel sur les usages de l’intelligence artificielle";

    const nbEleves =
      form.nbEleves.trim() !== "" ? form.nbEleves.trim() : "non précisé";
    const nbProfs =
      form.nbProfs.trim() !== "" ? form.nbProfs.trim() : "non précisé";

    const objectif =
      form.objectif.trim() ||
      "clarifier les objectifs, bénéfices et limites de l’utilisation de l’IA dans l’établissement.";
    const contraintes = form.contraintes.trim();
    const ton = form.ton.trim() || "institutionnel, clair et accessible";

    const contexteEtab =
      `Contexte de l’établissement :\n` +
      `- Nom : ${nomEtab}\n` +
      `- Type : ${typeEtabLibelle}\n` +
      (ville ? `- Localisation : ${ville}\n` : "") +
      `- Nombre approximatif d’élèves : ${nbEleves}\n` +
      `- Nombre approximatif d’enseignants : ${nbProfs}\n` +
      `- Contexte particulier : ${contexte}\n\n`;

    const blocObjectif =
      `Objectif du document à produire :\n` +
      `- Ce document doit être ${typeDocDesc}.\n` +
      `- Il est destiné ${publicDesc}.\n` +
      `- Titre proposé : « ${titreDoc} ».\n` +
      `- Objectif principal : ${objectif}\n\n`;

    const blocContraintesAdditionnelles =
      contraintes.length > 0
        ? `Contraintes / points de vigilance indiqués par le chef d’établissement :\n${contraintes}\n\n`
        : "";

    const blocContraintesFixes =
      `Contraintes générales à respecter impérativement :\n` +
      `- Le document doit respecter le cadre de l’Éducation nationale française (programmes, réglementations, RGPD).\n` +
      `- Le ton doit être ${ton}.\n` +
      `- Le document ne doit pas promettre d’éléments qui sortent des missions de l’école ou des moyens réalistes de l’établissement.\n` +
      `- Le document doit être compréhensible par des non-spécialistes (parents, élèves, membres du CA).\n` +
      `- Le style doit pouvoir être facilement copié-collé dans un traitement de texte (Word, LibreOffice, etc.).\n\n`;

    const blocMission =
      `Ta mission en tant qu’IA assistante de direction :\n` +
      `1. Proposer d’abord un plan structuré du document (titres, sous-titres, grandes parties).\n` +
      `2. Puis rédiger le document complet en français, en suivant ce plan, avec des paragraphes clairs et des formulations professionnelles.\n` +
      `3. À la fin, ajouter une rubrique « Points de vigilance pour le chef d’établissement » listant 4 à 6 points à vérifier avant diffusion (cadre légal, cohérence avec les règlements existants, clarté pour les familles, etc.).\n` +
      `4. Tu peux suggérer, si pertinent, des annexes éventuelles (ex : exemples de scénarios d’usage, fiches pratiques, versions courtes à afficher dans l’ENT).\n`;

    const prompt =
      `Tu es une IA assistant un chef d’établissement (principal, proviseur, adjoint·e) dans le système scolaire français.\n\n` +
      contexteEtab +
      blocObjectif +
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
        "Impossible de copier automatiquement. Sélectionnez le texte et copiez-le à la main.",
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
              <p className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700 ring-1 ring-indigo-100">
                Espace administration · Direction / pilotage
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
                Générateur de prompts pour la direction – EleveAI
              </h1>
              <p className="max-w-2xl text-sm sm:text-base text-slate-700">
                Cette page t’aide à formuler des messages clairs et
                institutionnels pour rédiger une charte, informer les parents,
                présenter un projet IA au conseil d’administration ou organiser
                un plan de formation des enseignants.
              </p>
            </div>

            <div className="max-w-xs rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-xs text-slate-900 shadow-inner">
              <p className="mb-1 font-semibold">Pour quoi faire ?</p>
              <ul className="space-y-1">
                <li>• Charte d’usage de l’IA.</li>
                <li>• Notes aux parents, au CA, aux équipes.</li>
                <li>• Projets pilotes et plans de formation.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 1️⃣ PRESETS */}
        <section className="rounded-3xl bg-white/95 p-6 lg:p-7 shadow-sm ring-1 ring-emerald-100 space-y-4">
          <div className="space-y-1">
            <h2 className="text-base font-semibold text-slate-900">
              1️⃣ Choisir un modèle rapide (facultatif)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Tu peux gagner du temps en partant d’un exemple proche de ta
              situation. Tu pourras ensuite adapter tous les champs dans le
              formulaire.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {(Object.entries(ADMIN_PRESETS) as [
              AdminPresetKey,
              AdminPreset,
            ][]).map(([key, preset]) => (
              <button
                key={key}
                type="button"
                onClick={() => appliquerPreset(key)}
                className="h-full rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-3 text-left text-xs shadow-sm hover:bg-emerald-100"
              >
                <div className="font-semibold text-emerald-900 mb-1">
                  {preset.label}
                </div>
                <div className="text-[11px] text-emerald-900/90">
                  {preset.description}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* 2️⃣ FORMULAIRE + PROMPT */}
        <section className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          {/* FORMULAIRE */}
          <div className="rounded-3xl bg-white p-6 lg:p-7 shadow-md ring-1 ring-slate-100 space-y-5">
            <h2 className="text-base font-semibold text-slate-900 mb-1">
              2️⃣ Décrire ton établissement et le document à produire
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
                    Nombre d’élèves (approx.)
                  </label>
                  <input
                    type="text"
                    value={form.nbEleves}
                    onChange={(e) => handleChange("nbEleves", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 shadow-inner focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
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
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 shadow-inner focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
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
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 shadow-inner min-h-[60px] focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  placeholder="Ex : Établissement rural / enclavé, REP / REP+, projet numérique en cours, forte proportion de boursiers, etc."
                />
              </div>
            </div>

            {/* DOCUMENT */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <h3 className="text-sm font-semibold text-slate-900">
                Document à produire
              </h3>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700">
                    Type de document
                  </label>
                  <select
                    value={form.typeDoc}
                    onChange={(e) =>
                      handleChange("typeDoc", e.target.value as TypeDoc)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 shadow-inner focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  >
                    <option value="charte">Charte d’usage</option>
                    <option value="note_parents">Note / courrier aux parents</option>
                    <option value="projet_pilote">Présentation de projet pilote</option>
                    <option value="protocole_triche">
                      Protocole anti-triche / usages interdits
                    </option>
                    <option value="plan_formation">Plan de formation des professeurs</option>
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
                      handleChange("publicCible", e.target.value as PublicCible)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 shadow-inner focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  >
                    <option value="toute_communaute">
                      Toute la communauté éducative
                    </option>
                    <option value="parents">Parents / responsables légaux</option>
                    <option value="profs">Équipe pédagogique</option>
                    <option value="eleves">Élèves</option>
                    <option value="ca">Conseil d’administration / instances</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Titre souhaité du document (facultatif)
                </label>
                <input
                  type="text"
                  value={form.titreDoc}
                  onChange={(e) => handleChange("titreDoc", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-inner focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  placeholder='Ex : "Charte d’usage de l’intelligence artificielle au collège…"'
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
                  placeholder="Ex : Expliquer aux familles comment l’IA sera utilisée dans l’établissement, dans quel cadre, et ce qui restera interdit."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Contraintes ou points à absolument intégrer (facultatif)
                </label>
                <textarea
                  value={form.contraintes}
                  onChange={(e) => handleChange("contraintes", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm text-slate-900 shadow-inner min-h-[70px] focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  placeholder="Ex : Mention obligatoire du RGPD, nécessité de parler du règlement intérieur, cohérence avec un projet déjà voté, etc."
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
                  placeholder="Ex : institutionnel et rassurant, clair et pédagogique, motivant, etc."
                />
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                <button
                  onClick={genererPrompt}
                  className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                >
                  ⚙️ Générer le prompt direction
                </button>
                <p className="text-xs text-slate-500">
                  Tu pourras ensuite coller ce prompt dans EleveAI ou dans l’IA
                  de ton choix pour générer le document.
                </p>
              </div>
            </div>
          </div>

          {/* PROMPT FINAL */}
          <div className="rounded-3xl bg-white/95 p-5 lg:p-6 shadow-sm ring-1 ring-slate-100 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-slate-900">
                3️⃣ Prompt final pour la direction
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
              placeholder="Renseigne le formulaire puis clique sur « Générer le prompt direction » : il apparaîtra ici, prêt à être collé dans une IA."
            />
          </div>
        </section>
      </div>
    </main>
  );
}




