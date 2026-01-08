// app/espace-eleves/coach/CoachElevesClient.tsx
"use client";

import React, { useMemo, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  ClipboardCopy,
  Check,
  ShieldCheck,
  ChevronRight,
  HelpCircle,
  MessageCircle,
  BookOpenCheck,
} from "lucide-react";

import { CLASSES, MATIERES } from "@/lib/constants/scolaire";
import type { ClasseValue, MatiereValue } from "@/lib/constants/scolaire";

export const dynamic = "force-dynamic";

type NiveauCoach = "ulis" | "remediation" | "faible" | "standard" | "expert";
type ObjectifCoach = "comprendre" | "entrainer" | "corriger" | "reviser" | "bloque";

const NIVEAUX: { value: NiveauCoach; label: string; hint: string }[] = [
  { value: "ulis", label: "ULIS", hint: "Très guidé, phrases très courtes, étapes numérotées." },
  { value: "remediation", label: "Remédiation", hint: "On reconstruit les bases sans stress." },
  { value: "faible", label: "Faible", hint: "Pas à pas, beaucoup d’indices, droit à l’erreur." },
  { value: "standard", label: "Standard", hint: "Explication + entraînement progressif." },
  { value: "expert", label: "Expert", hint: "Justifier, repérer les pièges, approfondir." },
];

const OBJECTIFS: { value: ObjectifCoach; label: string; desc: string; emoji: string }[] = [
  { value: "comprendre", label: "Comprendre", desc: "Exemple → règle → application guidée", emoji: "💡" },
  { value: "entrainer", label: "M’entraîner", desc: "Exercices progressifs + correction", emoji: "✍️" },
  { value: "corriger", label: "Me corriger", desc: "Je tente → tu guides → tu corriges", emoji: "✅" },
  { value: "reviser", label: "Réviser", desc: "Résumé + questions + mini quiz", emoji: "📌" },
  { value: "bloque", label: "Je bloque", desc: "On revient au plus simple", emoji: "🆘" },
];

const TEMPS = ["10 min", "20 min", "30 min", "45 min", "60 min"] as const;

function niveauStyle(n: NiveauCoach) {
  switch (n) {
    case "ulis":
    case "remediation":
      return "border-violet-300 bg-violet-50 text-violet-900";
    case "faible":
      return "border-rose-300 bg-rose-50 text-rose-900";
    case "standard":
      return "border-emerald-300 bg-emerald-50 text-emerald-900";
    case "expert":
      return "border-sky-300 bg-sky-50 text-sky-900";
  }
}

function objectifLabel(o: ObjectifCoach) {
  const it = OBJECTIFS.find((x) => x.value === o);
  return it ? `${it.emoji} ${it.label}` : "Objectif";
}

export default function CoachElevesClient() {
  const router = useRouter();

  // Toast simple
  const [toast, setToast] = useState<string | null>(null);
  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 1700);
  }, []);

  // Form
  const [prenom, setPrenom] = useState("");
  const [classe, setClasse] = useState<ClasseValue | "">("");
  const [matiere, setMatiere] = useState<MatiereValue | "">("");
  const [niveau, setNiveau] = useState<NiveauCoach>("standard");
  const [objectif, setObjectif] = useState<ObjectifCoach>("comprendre");
  const [temps, setTemps] = useState<(typeof TEMPS)[number] | "">("20 min");

  const [theme, setTheme] = useState("");
  const [enonce, setEnonce] = useState("");

  const [modeAntiTriche, setModeAntiTriche] = useState(true);
  const [showPrompt, setShowPrompt] = useState(false);

  const [prompt, setPrompt] = useState("");
  const [copied, setCopied] = useState(false);

  const canStart = Boolean(classe && matiere && theme.trim().length >= 2);

  const promptCoach = useMemo(() => {
    if (!canStart) return "";

    const p = prenom.trim() ? prenom.trim() : "un élève";

    const blocCadre =
      `Tu es un COACH D’APPRENTISSAGE bienveillant (style professeur).\n` +
      `But : aider l’élève à comprendre le cours SANS remplacer son professeur.\n` +
      `Tu dois encourager l’élève à formuler des questions.\n\n` +
      `Règle importante : si une question dépend des choix du professeur (méthode attendue, barème, consigne ambiguë), tu dois dire :\n` +
      `👉 "Ça, c’est une question à poser à ton professeur." puis proposer une formulation claire de la question.\n\n`;

    const niveauTxt =
      niveau === "ulis"
        ? "Niveau : ULIS. Phrases très courtes. Une seule idée à la fois. Questions fermées (A/B, oui/non)."
        : niveau === "remediation"
        ? "Niveau : remédiation. Rythme lent. Exemples concrets. Étapes numérotées."
        : niveau === "faible"
        ? "Niveau : faible. Pas à pas. Beaucoup d’indices. Droit à l’erreur explicite."
        : niveau === "standard"
        ? "Niveau : standard. Explication + exercices progressifs. Questions simples."
        : "Niveau : expert. Justifications courtes. Pièges fréquents. Approfondissement.";

    const objectifTxt: Record<ObjectifCoach, string> = {
      comprendre:
        "Objectif : COMPRENDRE. Déroulé : exemple concret → règle → application guidée → mini vérification.",
      entrainer:
        "Objectif : S’ENTRAÎNER. Déroulé : rappel rapide → 4 à 8 exercices progressifs → correction expliquée → mini vérification.",
      corriger:
        "Objectif : CORRIGER. Déroulé : demander ma tentative → questionner → corriger pas à pas → me faire refaire seul.",
      reviser:
        "Objectif : RÉVISER. Déroulé : résumé court → questions flash → 3 exercices → mini quiz final.",
      bloque:
        "Objectif : DÉBLOQUER. Déroulé : revenir au plus simple → une étape à la fois → mini victoire → vérification.",
    };

    const antiTriche = modeAntiTriche
      ? `\nMODE ANTI-TRICHE (obligatoire) :\n` +
        `- Ne donne pas la solution tout de suite.\n` +
        `- Commence par un DIAGNOSTIC (2 à 4 questions).\n` +
        `- Puis : indices → correction étape par étape.\n` +
        `- Demande une tentative à chaque étape.\n`
      : "";

    const blocContexte =
      `Contexte :\n` +
      `- Élève : ${p}\n` +
      `- Classe : ${classe}\n` +
      `- Matière : ${matiere}\n` +
      `- Thème : ${theme.trim()}\n` +
      `- Durée : ${temps || "non précisé"}\n` +
      `- ${niveauTxt}\n` +
      `- ${objectifTxt[objectif]}\n\n`;

    const blocEnonce = enonce.trim()
      ? `Énoncé / question / exercice :\n${enonce.trim()}\n\n`
      : "";

    // ✅ Déroulé imposé (notre “contrat”)
    const deroule =
      `DÉROULÉ OBLIGATOIRE DE LA SÉANCE (6 temps) :\n` +
      `TEMPS 1 — Diagnostic rapide : pose 2 à 4 questions simples adaptées au niveau.\n` +
      `TEMPS 2 — Travail guidé : avance étape par étape, numérote les étapes.\n` +
      `TEMPS 3 — Vérification : fais refaire un mini-exercice ou pose 2–3 questions de vérification.\n` +
      `TEMPS 4 — Pause compréhension : demande "résume en 1 phrase" OU "qu’est-ce qui reste flou ?".\n` +
      `TEMPS 5 — Double sortie :\n` +
      `  A) 1 question à me poser à moi-même (métacognition)\n` +
      `  B) 1 question à poser à mon professeur (formulée clairement)\n` +
      `TEMPS 6 — Prochaine action : propose 1 mini tâche (2 minutes) à faire avant le prochain cours.\n\n` +
      `Contraintes de style : phrases courtes, pas de pavés, ton bienveillant, aucune moquerie.\n`;

    return blocCadre + blocContexte + blocEnonce + antiTriche + deroule;
  }, [canStart, prenom, classe, matiere, niveau, objectif, temps, theme, enonce, modeAntiTriche]);

  const startSession = () => {
    if (!canStart) {
      alert("Indique au minimum : classe, matière, thème.");
      return;
    }
    setPrompt(promptCoach);
    setCopied(false);
    showToast("🧠 Séance coach prête !");
  };

  const copyPrompt = async () => {
    if (!prompt) return;
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      showToast("✅ Copié !");
      setTimeout(() => setCopied(false), 1100);
    } catch {
      alert("Copie auto impossible. Sélectionne le texte puis Ctrl+C.");
    }
  };

  const goTchat = () => {
    if (!prompt) return;
    router.push(`/tchat?prompt=${encodeURIComponent(prompt)}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-50 text-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-10 space-y-6 sm:space-y-8">
        {/* Header */}
        <header className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-xs font-semibold text-emerald-800">
              🧠 Mode Coach (séance guidée)
            </span>
            <Link
              href="/espace-eleves"
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              ← Retour espace élèves
            </Link>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0047B6] leading-tight">
            On travaille ensemble, étape par étape
          </h1>

          <p className="text-sm sm:text-base text-gray-700 max-w-2xl">
            Ce mode sert à <b>comprendre</b>, <b>s’entraîner</b> et surtout à <b>formuler tes questions</b>.  
            L’IA peut aussi dire : <i>“Ça, c’est une question à poser à ton professeur.”</i>
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Col gauche: paramètres */}
          <section className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-5 sm:p-6 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-extrabold text-[#0047B6]">1️⃣ Préparer ta séance</h2>
                <p className="text-xs text-slate-600 mt-1">
                  Remplis l’essentiel. Le coach s’adapte au niveau et suit un déroulé fixe.
                </p>
              </div>
              <div className={`px-3 py-1 rounded-full border text-xs font-semibold ${niveauStyle(niveau)}`}>
                {NIVEAUX.find((n) => n.value === niveau)?.label}
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold">Prénom (facultatif)</label>
                <input
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="Ex : Lina"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold">Classe</label>
                <select
                  value={classe}
                  onChange={(e) => {
                    setClasse(e.target.value as any);
                    showToast("✅ Classe choisie");
                  }}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
                >
                  <option value="">Choisir…</option>
                  {CLASSES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold">Matière</label>
                <select
                  value={matiere}
                  onChange={(e) => {
                    setMatiere(e.target.value as any);
                    showToast("✅ Matière choisie");
                  }}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
                >
                  <option value="">Choisir…</option>
                  {MATIERES.map((m) => (
                    <option key={`${m.label}-${m.value}`} value={m.value} disabled={!!m.disabled}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold">Thème / chapitre</label>
              <input
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm"
                placeholder="Ex : fractions / Thalès / conjugaison…"
              />
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold">Niveau</label>
                <select
                  value={niveau}
                  onChange={(e) => setNiveau(e.target.value as NiveauCoach)}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
                >
                  {NIVEAUX.map((n) => (
                    <option key={n.value} value={n.value}>
                      {n.label}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-600">{NIVEAUX.find((n) => n.value === niveau)?.hint}</p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold">Objectif</label>
                <select
                  value={objectif}
                  onChange={(e) => setObjectif(e.target.value as ObjectifCoach)}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
                >
                  {OBJECTIFS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.emoji} {o.label}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-600">
                  {OBJECTIFS.find((o) => o.value === objectif)?.desc}
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold">Temps</label>
                <select
                  value={temps}
                  onChange={(e) => setTemps(e.target.value as any)}
                  className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
                >
                  <option value="">Choisir…</option>
                  {TEMPS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                Exercice / consigne (facultatif)
              </label>
              <textarea
                value={enonce}
                onChange={(e) => setEnonce(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm min-h-[90px] bg-white"
                placeholder="Colle l’exercice ici si tu en as un."
              />
            </div>

            {/* Anti-triche */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-extrabold text-amber-900 inline-flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    Mode anti-triche
                  </p>
                  <p className="text-xs text-amber-800 mt-1">
                    Le coach doit te faire chercher : questions → indices → correction.
                  </p>
                </div>
                <label className="inline-flex items-center gap-2 text-xs font-semibold text-amber-900">
                  <input
                    type="checkbox"
                    checked={modeAntiTriche}
                    onChange={(e) => {
                      setModeAntiTriche(e.target.checked);
                      showToast(e.target.checked ? "🛡️ Anti-triche activé" : "⚠️ Anti-triche désactivé");
                    }}
                    className="rounded border-gray-400"
                  />
                  Activer
                </label>
              </div>
            </div>

            <button
              type="button"
              disabled={!canStart}
              onClick={startSession}
              className={`w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold shadow transition ${
                canStart
                  ? "bg-emerald-600 text-white hover:bg-emerald-700"
                  : "bg-emerald-100 text-emerald-500 cursor-not-allowed"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Démarrer la séance Coach
            </button>

            <button
              type="button"
              onClick={() => setShowPrompt((v) => !v)}
              className="w-full inline-flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <span>{showPrompt ? "Masquer le prompt" : "Voir le prompt (avancé)"}</span>
              <ChevronRight className={`w-4 h-4 transition ${showPrompt ? "rotate-90" : ""}`} />
            </button>
          </section>

          {/* Col droite: séance prête */}
          <section className="space-y-4">
            <div className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-base font-extrabold text-[#0047B6]">2️⃣ Lance le coach dans le tchat</h2>
                  <p className="text-xs text-slate-600 mt-1">
                    Le coach suit : diagnostic → étapes → vérification → questions.
                  </p>
                </div>
                <div className="px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700">
                  {objectifLabel(objectif)}
                </div>
              </div>

              {!prompt && (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                  👇 Remplis à gauche puis clique <b>Démarrer la séance Coach</b>.
                </div>
              )}

              {showPrompt && (
                <textarea
                  readOnly
                  value={prompt || promptCoach}
                  className="w-full border rounded-lg px-3 py-2 text-xs font-mono bg-slate-50 min-h-[220px]"
                  placeholder="Le prompt apparaîtra ici."
                />
              )}

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={copyPrompt}
                  disabled={!prompt}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                    prompt ? "bg-slate-900 text-white hover:bg-slate-950" : "bg-slate-200 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  <ClipboardCopy className="w-4 h-4" />
                  {copied ? "Copié" : "Copier"}
                </button>

                <button
                  type="button"
                  onClick={goTchat}
                  disabled={!prompt}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                    prompt ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-emerald-200 text-emerald-700 cursor-not-allowed"
                  }`}
                >
                  <MessageCircle className="w-4 h-4" />
                  Ouvrir dans Tchat EleveAI
                </button>

                <Link
                  href="/espace-eleves"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                >
                  <BookOpenCheck className="w-4 h-4" />
                  Revenir aux presets
                </Link>
              </div>

              {prompt && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-900">
                  <span className="inline-flex items-center gap-2 font-semibold">
                    <Check className="w-4 h-4" /> Séance prête
                  </span>
                  <div className="mt-1 text-emerald-900/90">
                    Astuce : réponds honnêtement au diagnostic, même si c’est “je ne sais pas”.
                  </div>
                </div>
              )}
            </div>

            {/* Mini rappel pédagogique */}
            <div className="bg-white/95 border border-slate-200 rounded-2xl shadow-sm p-5 space-y-2">
              <h3 className="text-sm font-extrabold text-slate-900">🧩 Le coach est fait pour…</h3>
              <ul className="text-xs text-slate-700 space-y-1">
                <li>• t’aider à comprendre ce que tu n’as pas compris en cours,</li>
                <li>• t’entraîner avec des étapes,</li>
                <li>• et surtout à formuler <b>une question à poser à ton professeur</b>.</li>
              </ul>
              <p className="text-[11px] text-slate-600">
                Si une consigne dépend du prof, le coach dira explicitement : <i>“Ça, c’est une question à poser à ton professeur.”</i>
              </p>
            </div>
          </section>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-xl bg-slate-900 text-white px-4 py-2 text-sm shadow-lg">
          {toast}
        </div>
      )}
    </main>
  );
}
