"use client";

import { useState } from "react";

export default function ParentsPage() {
  const [prenom, setPrenom] = useState("");
  const [niveau, setNiveau] = useState("collège");
  const [matiere, setMatiere] = useState("maths");
  const [objectif, setObjectif] = useState(
    "Lui redonner confiance et l’aider à comprendre le cours sur : les fractions et la cuisine"
  );

  // Nouvelle zone "Vous qui connaissez votre marmaille"
  const [maitrise, setMaitrise] = useState<"besoin" | "satisfaisant" | "expert">(
    "besoin"
  );
  const [hasDys, setHasDys] = useState(false);
  const [dysTypes, setDysTypes] = useState<string[]>([]);
  const [hyperactif, setHyperactif] = useState(false);

  const [generatedPrompt, setGeneratedPrompt] = useState("");

  const toggleDysType = (type: string) => {
    setDysTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleGenerate = () => {
    const nomEleve = prenom.trim() || "mon enfant";

    let maitrisePhrase = "";
    if (maitrise === "besoin") {
      maitrisePhrase =
        `${nomEleve} a plutôt besoin d’aide en ce moment dans cette matière : certaines bases ne sont pas complètement installées et la confiance est fragile.`;
    } else if (maitrise === "satisfaisant") {
      maitrisePhrase =
        `${nomEleve} a un niveau globalement satisfaisant : il/elle réussit beaucoup de choses mais a besoin d’être rassuré·e et de consolider certaines notions.`;
    } else {
      maitrisePhrase =
        `${nomEleve} est plutôt à l’aise / expert dans cette matière et a besoin d’être stimulé·e, d’aller un peu plus loin sans perdre le plaisir d’apprendre.`;
    }

    const base = `Tu es une IA pédagogique bienveillante qui s’adresse à ${nomEleve}, élève de ${niveau}, en ${matiere}, dans le système scolaire français.

${maitrisePhrase}

Ta mission :
- aider ${nomEleve} à COMPRENDRE et à S’ENTRAÎNER,
- sans jamais faire les exercices à sa place,
- en respectant les programmes officiels (Eduscol / BO),
- en expliquant avec des mots simples et des exemples concrets.

Objectif principal demandé par le parent : ${objectif}`;

    // Bloc besoins spécifiques
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
${listeDys ? `- ${listeDys}` : ""}${
        hyperactifTexte ? `\n- ${hyperactifTexte}` : ""
      }`;
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
  };

  const handleCopy = async () => {
    if (!generatedPrompt) return;
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      alert("Prompt copié dans le presse-papiers ✅");
    } catch (e) {
      alert(
        "Impossible de copier le texte automatiquement. Vous pouvez le sélectionner à la main."
      );
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-emerald-50">
      <div className="mx-auto max-w-5xl px-4 py-10 lg:py-14">
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

        {/* PHILOSOPHIE */}
        <section className="mb-10 grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <h2 className="text-lg font-semibold text-slate-900">
              Notre philosophie pédagogique
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Nous souhaitons que chaque enfant puisse{" "}
              <span className="font-semibold">apprendre à son rythme</span>,
              avec des explications claires et rassurantes.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li>• Alignement avec Eduscol et le Bulletin Officiel.</li>
              <li>
                • Appui sur les neurosciences : répétition espacée, test actif,
                reformulation, encouragements.
              </li>
              <li>
                • L’IA pose des questions, guide et explique au lieu de
                simplement donner les réponses.
              </li>
              <li>
                • Objectif : compréhension durable, autonomie et{" "}
                <span className="font-semibold">confiance en soi</span>.
              </li>
            </ul>
          </div>

          <div className="rounded-3xl bg-emerald-50/80 p-6 shadow-sm ring-1 ring-emerald-100">
            <h3 className="text-sm font-semibold text-emerald-900">
              Et pour vous, parents ?
            </h3>
            <p className="mt-2 text-sm text-emerald-900">
              Cet espace est là pour vous aider à :
            </p>
            <ul className="mt-3 space-y-2 text-sm text-emerald-900">
              <li>• Encadrer l’usage de l’IA à la maison.</li>
              <li>• Poser un cadre clair : on apprend, on ne triche pas.</li>
              <li>
                • Adapter l’accompagnement si votre enfant a des besoins
                spécifiques.
              </li>
            </ul>
            <p className="mt-4 text-xs text-emerald-900/80">
              Vous gardez toujours la main : le prompt est écrit par vous, pour
              votre enfant.
            </p>
          </div>
        </section>

        {/* CARTE MARMAILLE + GENERATEUR */}
        <section className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-slate-100 lg:p-8">
          {/* VOUS QUI CONNAISSEZ VOTRE MARMAILLE */}
          <div className="mb-8 space-y-4 rounded-2xl bg-slate-50 px-4 py-4 shadow-inner border border-slate-100">
            <h2 className="text-base font-semibold text-slate-900">
              Vous qui connaissez votre marmaille 💛
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Avant de créer le prompt, prenez une minute pour décrire{" "}
              <span className="font-semibold">comment est votre enfant</span>{" "}
              dans ses apprentissages. Ces informations seront intégrées
              discrètement dans le message à l’IA.
            </p>

            {/* Niveau de maitrise */}
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-slate-700">
                Comment vous décririez son niveau dans cette matière ?
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
                    Mon enfant a un <strong>profil DYS</strong> (diagnostiqué ou
                    en cours).
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
                        className="inline-flex items-center gap-1.5 rounded-lg bg-white px-2 py-1.5 ring-1 ring-slate-200"
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
                    Profil <strong>hyperactif / TDAH</strong>.
                  </label>
                </div>
                <p className="text-[11px] text-slate-500">
                  L’IA pourra alors proposer des activités plus courtes, rythmées
                  et très guidées.
                </p>
              </div>
            </div>
          </div>

          {/* GENERATEUR DE PROMPTS */}
          <header className="mb-6 space-y-2">
            <h2 className="text-lg font-semibold text-slate-900">
              Créez votre prompt personnalisé en 4 petites étapes
            </h2>
            <p className="text-sm text-slate-600">
              Remplissez les champs ci-dessous, cliquez sur{" "}
              <span className="font-semibold">« Générer le prompt »</span> puis
              copiez-collez le texte dans EleveAI (ou un autre outil).  
              L’IA utilisera alors vos consignes, dans un cadre sécurisé.
            </p>
          </header>

          {/* FORMULAIRE PRINCIPAL */}
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Prénom de l’enfant (facultatif)
                </label>
                <input
                  type="text"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  placeholder="Ex : Léa, Yanis…"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Niveau scolaire
                </label>
                <select
                  value={niveau}
                  onChange={(e) => setNiveau(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                >
                  <option value="CM2">CM2</option>
                  <option value="6e">6e</option>
                  <option value="5e">5e</option>
                  <option value="4e">4e</option>
                  <option value="3e">3e</option>
                  <option value="2de">2de</option>
                  <option value="1re">1re</option>
                  <option value="Tle">Terminale</option>
                  <option value="collège">Collège (niveau mixte)</option>
                  <option value="lycée">Lycée (niveau mixte)</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Matière principale
                </label>
                <select
                  value={matiere}
                  onChange={(e) => setMatiere(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                >
                  <option value="maths">Mathématiques</option>
                  <option value="français">Français</option>
                  <option value="histoire-géographie">
                    Histoire-Géographie
                  </option>
                  <option value="SVT">SVT</option>
                  <option value="physique-chimie">Physique-Chimie</option>
                  <option value="langues">Langues vivantes</option>
                  <option value="philosophie">Philosophie</option>
                  <option value="toutes les matières">
                    Toutes les matières
                  </option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-700">
                  Objectif souhaité pour votre enfant
                </label>
                <textarea
                  value={objectif}
                  onChange={(e) => setObjectif(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 shadow-inner focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  rows={3}
                  placeholder="Ex : L’aider à réviser un contrôle, reprendre les bases, préparer le brevet, retrouver confiance…"
                />
                <p className="text-xs text-slate-500">
                  Écrivez simplement, comme si vous expliquiez la situation à un
                  enseignant.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={handleGenerate}
                className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-emerald-50"
              >
                Générer le prompt
              </button>
              <p className="text-xs text-slate-500">
                Vous pourrez ensuite le copier-coller dans EleveAI ou dans
                l’outil de votre choix.
              </p>
            </div>
          </div>

          {/* RESULTAT */}
          <div className="mt-8 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-slate-900">
                Prompt généré
              </h3>
              <button
                onClick={handleCopy}
                disabled={!generatedPrompt}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-100 disabled:opacity-50"
              >
                Copier le prompt
              </button>
            </div>
            <textarea
              readOnly
              value={generatedPrompt}
              className="w-full min-h-[220px] rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-mono text-slate-900 shadow-inner"
              placeholder="Remplissez le formulaire ci-dessus puis cliquez sur « Générer le prompt »."
            />
          </div>
        </section>
      </div>
    </main>
  );
}
