// app/espace-parents/EspaceParentsClient.tsx
"use client";

import Link from "next/link";
import { useMemo, useState, useCallback, useEffect, useRef } from "react";
import { PresetCarousel } from "@/components/PresetCarousel";
import { createClient } from "@/lib/supabase/client";


import {
  CLASSES,
  MATIERES,
  type ClasseValue,
  type MatiereValue,
} from "@/lib/constants/scolaire";
import {
  METHODES,
  DEFAULT_METHODE,
  type MethodePedagogique,
  getMethodePromptBlock,
} from "@/lib/pedagogie/methodes";

import {
  PARENTS_PRESETS,
  PARENTS_PRESET_ITEMS,
  type Maitrise,
  type ParentsPresetKey,
  isParentsPresetKey,
} from "@/data/parentsPresets";

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
      <p className="text-xs font-semibold text-slate-700">
        {title}
        {required ? <span className="ml-1 text-rose-600">*</span> : null}
      </p>
      {hint ? (
        <p className="text-[11px] text-slate-500 leading-tight">{hint}</p>
      ) : null}
    </div>
  );
}

function Tag({
  label,
  onClick,
  disabled,
  variant = "default",
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: "default" | "dark" | "green" | "purple" | "orange";
}) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition border";
  const styles: Record<typeof variant, string> = {
    default: "bg-white text-slate-700 border-slate-200 hover:bg-slate-50",
    dark: "bg-slate-900 text-white border-slate-900 hover:bg-slate-800",
    green: "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700",
    purple: "bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700",
    orange: "bg-orange-500 text-white border-orange-500 hover:bg-orange-600",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        base,
        styles[variant],
        disabled ? "opacity-50 cursor-not-allowed hover:bg-inherit" : "",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function CollerDansTags({
  prompt,
  onCopy,
}: {
  prompt: string;
  onCopy: () => Promise<void>;
}) {
  const encoded = useMemo(() => encodeURIComponent(prompt || ""), [prompt]);
  const disabled = !prompt;

  async function openEleveAI() {
    if (!prompt) return;
    await onCopy();
    window.open("/tchat", "_blank");
  }

  function openChatGPT() {
    if (!prompt) return;
    window.open(`https://chat.openai.com/?q=${encoded}`, "_blank");
  }

  function openMistral() {
    if (!prompt) return;
    window.open("https://chat.mistral.ai/", "_blank");
  }

  function openGemini() {
    if (!prompt) return;
    window.open(`https://gemini.google.com/app?q=${encoded}`, "_blank");
  }

  function openClaude() {
    if (!prompt) return;
    window.open("https://claude.ai/new", "_blank");
  }

  function openPerplexity() {
    if (!prompt) return;
    window.open("https://www.perplexity.ai/", "_blank");
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-slate-700">Coller dans :</p>
      <div className="flex flex-wrap gap-2">
        <Tag
          label="⬛ ChatGPT"
          onClick={openChatGPT}
          disabled={disabled}
          variant="dark"
        />
        <Tag
          label="🟩 Perplexity"
          onClick={openPerplexity}
          disabled={disabled}
          variant="green"
        />
        <Tag
          label="🚀 Tchat EleveAI"
          onClick={openEleveAI}
          disabled={disabled}
          variant="green"
        />
      </div>
      <p className="text-[11px] text-slate-500">
        Astuce : clique sur “🚀 Tchat EleveAI” → le prompt est copié et /tchat
        s’ouvre dans un nouvel onglet.
      </p>
    </div>
  );
}

/* ----------------------------------------
   PAGE PARENTS
---------------------------------------- */

export default function EspaceParentsClient() {
  const supabase = useMemo(() => createClient(), []);

  // ✅ Auth state (pour afficher le bloc connexion)
  const [authLoading, setAuthLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const isLoggedIn = !!userEmail;
  const topRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    let mounted = true;

    async function init() {
      const { data } = await supabase.auth.getUser();
      if (!mounted) return;
      setUserEmail(data.user?.email ?? null);
      setAuthLoading(false);
    }

    init();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
      setAuthLoading(false);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [supabase]);

  const [prenom, setPrenom] = useState("");

  // ✅ alignés sur tes constantes
  const [classe, setClasse] = useState<ClasseValue>("college");
  const [matiere, setMatiere] = useState<MatiereValue>("maths");

  const [objectif, setObjectif] = useState(
    "Lui redonner confiance et l’aider à comprendre le cours sur : les fractions et la cuisine",
  );

  // ✅ Méthode pédagogique
  const [methode, setMethode] = useState<MethodePedagogique>(DEFAULT_METHODE);

  // Profil enfant
  const [maitrise, setMaitrise] = useState<Maitrise>("besoin");
  const [hasDys, setHasDys] = useState(false);
  const [dysTypes, setDysTypes] = useState<string[]>([]);
  const [hyperactif, setHyperactif] = useState(false);

  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [copied, setCopied] = useState(false);

  const toggleDysType = (type: string) => {
    setDysTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const appliquerPreset = (key: ParentsPresetKey) => {
    const preset = PARENTS_PRESETS[key];
    const v = preset.valeurs;

    if (v.classe !== undefined) setClasse(v.classe);
    if (v.matiere !== undefined) setMatiere(v.matiere);
    if (v.objectif !== undefined) setObjectif(v.objectif);
    if (v.maitrise !== undefined) setMaitrise(v.maitrise);
    if (v.methode !== undefined) setMethode(v.methode);

    if (v.hasDys !== undefined) {
      setHasDys(v.hasDys);
      if (!v.hasDys) setDysTypes([]);
    }
    if (v.dysTypes !== undefined) setDysTypes(v.dysTypes);
    if (v.hyperactif !== undefined) setHyperactif(v.hyperactif);
  };

  const handleGenerate = useCallback(() => {
    const nomEleve = prenom.trim() || "mon enfant";

    let maitrisePhrase = "";
    if (maitrise === "besoin") {
      maitrisePhrase = `${nomEleve} a plutôt besoin d’aide en ce moment : certaines bases ne sont pas complètement installées et la confiance est fragile.`;
    } else if (maitrise === "satisfaisant") {
      maitrisePhrase = `${nomEleve} a un niveau globalement satisfaisant : il/elle réussit beaucoup de choses mais a besoin d’être rassuré·e et de consolider certaines notions.`;
    } else {
      maitrisePhrase = `${nomEleve} est plutôt à l’aise / expert et a besoin d’être stimulé·e, d’aller un peu plus loin sans perdre le plaisir d’apprendre.`;
    }

    const methodeBlock = getMethodePromptBlock(methode);

    const base = `Tu es une IA pédagogique bienveillante qui s’adresse à ${nomEleve}, élève en classe de ${classe}, en ${matiere}, dans le système scolaire français.

${maitrisePhrase}

${methodeBlock}Ta mission :
- aider ${nomEleve} à COMPRENDRE et à S’ENTRAÎNER,
- sans jamais faire les exercices à sa place,
- en respectant les programmes officiels,
- en expliquant avec des mots simples et des exemples concrets.

Objectif principal demandé par le parent : ${objectif}`;

    let besoinsBloc = "";

    if (hasDys || hyperactif) {
      const listeDys =
        hasDys && dysTypes.length > 0
          ? `Profil DYS indiqué par le parent : ${dysTypes.join(", ")}.`
          : hasDys
          ? `Profil DYS indiqué par le parent (type non précisé).`
          : "";

      const hyperactifTexte = hyperactif
        ? `Le parent signale aussi un profil hyperactif / TDAH : prévois des activités courtes, très guidées, avec des changements réguliers de rythme.`
        : "";

      besoinsBloc = `

Prise en compte des besoins spécifiques :
- Présentation très aérée, phrases courtes.
- Tu évites les gros blocs de texte.
- Tu relis les consignes en les reformulant avec des mots simples.
- Tu fais souvent des petites pauses ("On récapitule en une phrase ?").
${listeDys ? `- ${listeDys}` : ""}${hyperactifTexte ? `\n- ${hyperactifTexte}` : ""}`;
    }

    const suite = `

Règles importantes :
- Tu poses d’abord quelques questions simples pour vérifier ce que ${nomEleve} sait déjà.
- Tu donnes ensuite une seule nouvelle difficulté à la fois.
- Quand ${nomEleve} se trompe, tu expliques calmement l’erreur et proposes un exemple similaire.
- Tu termines chaque échange par un petit récapitulatif et une question :
  "Peux-tu me réexpliquer avec tes mots ce que tu as retenu ?"
- Tu refuses de donner directement la solution complète d’un devoir maison ou d’une évaluation à venir. À la place, tu guides pas à pas.`;

    setGeneratedPrompt(base + besoinsBloc + suite);
    setCopied(false);
  }, [
    prenom,
    classe,
    matiere,
    objectif,
    maitrise,
    hasDys,
    dysTypes,
    hyperactif,
    methode,
  ]);

  const handleCopy = useCallback(async () => {
    if (!generatedPrompt) return;
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      alert("Copie impossible automatiquement. Sélectionnez le texte à la main.");
    }
  }, [generatedPrompt]);

  
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-emerald-50">
    <div
      ref={topRef}
      className="w-full max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6 pt-0 pb-6 lg:pb-10"
    >

      

        {/* HERO */}
        <section className="mb-10 rounded-3xl bg-white/80 p-6 shadow-sm ring-1 ring-sky-100 lg:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-4">
              <p className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 ring-1 ring-emerald-100">
                Espace parents · Accompagnement serein
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
                Générateur de prompts parents – EleveAI
              </h1>
              <p className="max-w-2xl text-sm sm:text-base text-slate-700">
                EleveAI est pensé pour{" "}
                <span className="font-semibold">
                  soutenir votre enfant, pas le remplacer
                </span>
                . Cette page vous aide à formuler des messages clairs et
                sécurisés pour que l’IA l’accompagne avec bienveillance et dans
                le respect de l’école.
              </p>
            </div>

            <div className="max-w-xs rounded-2xl border border-sky-100 bg-sky-50 px-4 py-3 text-xs text-sky-900 shadow-inner">
              <p className="mb-1 font-semibold">Notre promesse :</p>
              <ul className="space-y-1">
                <li>• Respect des programmes officiels.</li>
                <li>• Pas de triche, pas de “copié-collé”.</li>
                <li>• Priorité à la confiance et à l’autonomie.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 1️⃣ VOUS QUI CONNAISSEZ VOTRE ENFANT */}
        <section className="mb-8 rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-100 lg:p-8">
          <div className="mb-4 space-y-2">
            <h2 className="text-base font-semibold text-slate-900">
              Vous qui connaissez votre enfant 💛
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Décrivez brièvement son profil : l’IA adaptera la façon d’expliquer
              et le rythme.
            </p>
          </div>

          <div className="space-y-5">
            {/* Niveau de maîtrise */}
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-slate-700">
                Comment décririez-vous son niveau dans cette matière ?
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setMaitrise("besoin")}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    maitrise === "besoin"
                      ? "bg-rose-100 text-rose-900 ring-1 ring-rose-300"
                      : "bg-white text-slate-700 ring-1 ring-slate-200"
                  }`}
                >
                  A besoin d’aide
                </button>
                <button
                  type="button"
                  onClick={() => setMaitrise("satisfaisant")}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    maitrise === "satisfaisant"
                      ? "bg-amber-100 text-amber-900 ring-1 ring-amber-300"
                      : "bg-white text-slate-700 ring-1 ring-slate-200"
                  }`}
                >
                  Satisfaisant
                </button>
                <button
                  type="button"
                  onClick={() => setMaitrise("expert")}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    maitrise === "expert"
                      ? "bg-emerald-100 text-emerald-900 ring-1 ring-emerald-300"
                      : "bg-white text-slate-700 ring-1 ring-slate-200"
                  }`}
                >
                  Très à l’aise / expert
                </button>
              </div>
            </div>

            {/* Profil DYS & hyperactif */}
            <div className="grid gap-4 sm:grid-cols-[2fr,1fr]">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    id="hasDys"
                    type="checkbox"
                    checked={hasDys}
                    onChange={(e) => setHasDys(e.target.checked)}
                    className="h-4 w-4"
                  />
                  <label
                    htmlFor="hasDys"
                    className="text-xs sm:text-sm text-slate-700"
                  >
                    Profil <strong>DYS</strong>
                  </label>
                </div>

                {hasDys && (
                  <div className="mt-1 grid grid-cols-2 gap-2 text-xs text-slate-700 sm:text-[13px]">
                    {[
                      "Dyslexie",
                      "Dysorthographie",
                      "Dyscalculie",
                      "Dyspraxie",
                      "Dysphasie",
                      "Autre DYS",
                    ].map((type) => (
                      <label
                        key={type}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-2 py-1.5 ring-1 ring-slate-200"
                      >
                        <input
                          type="checkbox"
                          className="h-3.5 w-3.5"
                          checked={dysTypes.includes(type)}
                          onChange={() => toggleDysType(type)}
                        />
                        <span>{type}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    id="hyperactif"
                    type="checkbox"
                    checked={hyperactif}
                    onChange={(e) => setHyperactif(e.target.checked)}
                    className="h-4 w-4"
                  />
                  <label
                    htmlFor="hyperactif"
                    className="text-xs sm:text-sm text-slate-700"
                  >
                    Profil <strong>hyperactif / TDAH</strong>
                  </label>
                </div>
                <p className="text-[11px] text-slate-500">
                  Activités plus courtes, rythmées, très guidées.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2️⃣ PRESETS – CARROUSEL */}
        <PresetCarousel
          title="Choisir un modèle rapide (facultatif)"
          subtitle="Partir d’un exemple proche de votre situation, puis ajuster."
          items={PARENTS_PRESET_ITEMS}
          onSelect={(id) => {
            // ✅ robuste si jamais on clique un id non prévu
            if (isParentsPresetKey(id)) appliquerPreset(id);
          }}
        />

        {/* 3️⃣ FORMULAIRE PRINCIPAL + GÉNÉRATION */}
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-100 lg:p-8">
          {/* ... tout le reste IDENTIQUE à ton code (inchangé) ... */}

          <header className="mb-6 space-y-2">
            <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-xs font-semibold text-indigo-800">
              👨‍👩‍👧‍👦 Espace parents · Accompagnement scolaire encadré
            </p>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0047B6]">
              Aider votre enfant à apprendre avec l’IA (sans tricher)
            </h2>

            <p className="text-sm sm:text-base text-slate-700 max-w-2xl">
              Indiquez la situation de votre enfant (niveau, difficulté,
              objectif). EleveAI génère un <b>prompt clair et encadré</b> pour
              l’aider à comprendre, réviser ou s’entraîner, dans le respect du
              cadre scolaire.
            </p>

            {!authLoading && !isLoggedIn && (
              <div className="pt-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-900">
                    Sauvegarder vos presets parents
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                    Connectez-vous pour sauvegarder vos réglages, les retrouver
                    plus tard et accéder à votre historique.
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link
                      href="/auth/signin"
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
                    >
                      Connexion
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-500/15"
                    >
                      Inscription
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </header>

          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <FieldLabel title="Prénom (facultatif)" hint="Ex : Léa, Yanis…" />
                <input
                  type="text"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  placeholder="Ex : Léa, Yanis…"
                />
              </div>

              <div className="space-y-2">
                <FieldLabel title="Classe" required />
                <select
                  value={classe}
                  onChange={(e) => setClasse(e.target.value as ClasseValue)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                >
                  {CLASSES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <FieldLabel title="Matière" required />
                <select
                  value={matiere}
                  onChange={(e) => setMatiere(e.target.value as MatiereValue)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                >
                  {MATIERES.map((m) => (
                    <option
                      key={`${m.label}-${m.value}`}
                      value={m.value}
                      disabled={!!m.disabled}
                    >
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <FieldLabel
                  title="Méthode (facultatif)"
                  hint="Le style d’accompagnement (rythme, guidage…)."
                />
                <select
                  value={methode}
                  onChange={(e) =>
                    setMethode(e.target.value as MethodePedagogique)
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                >
                  {METHODES.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <FieldLabel
                  title="Objectif"
                  required
                  hint="Écrivez simplement, comme à un enseignant."
                />
                <textarea
                  value={objectif}
                  onChange={(e) => setObjectif(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  rows={3}
                  placeholder="Ex : réviser un contrôle, reprendre les bases, retrouver confiance…"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={handleGenerate}
                className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.99]"
              >
                Générer le prompt
              </button>

              <button
                type="button"
                onClick={handleCopy}
                disabled={!generatedPrompt}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 disabled:opacity-50"
              >
                {copied ? "✅ Copié" : "📋 Copier"}
              </button>
            </div>

            <div className="mt-6 space-y-3">
              <h3 className="text-sm font-semibold text-slate-900">
                Prompt généré
              </h3>

              <CollerDansTags prompt={generatedPrompt} onCopy={handleCopy} />

              <textarea
                readOnly
                value={generatedPrompt}
                className="w-full min-h-[240px] rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-mono text-slate-900 shadow-inner"
                placeholder="Remplissez le formulaire puis cliquez sur « Générer le prompt »."
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
