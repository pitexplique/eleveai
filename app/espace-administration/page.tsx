"use client";

import { useState } from "react";

export default function AdministrationPage() {
  // État pour les boutons "copier"
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 px-4 py-10">
      <div className="mx-auto max-w-4xl space-y-12">
        {/* ------------------------ */}
        {/* SECTION 1 : HERO / INTRO */}
        {/* ------------------------ */}
        <header className="space-y-3">
          <p className="inline-flex items-center rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-emerald-300">
            Espace administratif · Collèges & Lycées
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-50">
            Aider les secrétariats et les équipes de direction au quotidien
          </h1>
          <p className="text-sm text-slate-300">
            Cet espace propose des modèles de prompts pour rédiger rapidement
            des messages clairs, bienveillants et adaptés aux familles, aux élèves
            et aux partenaires de l&apos;établissement.
          </p>
        </header>

        {/* ------------------------ */}
        {/* SECTION 2 : GENERATEUR   */}
        {/* ------------------------ */}
        <section className="space-y-5 rounded-2xl bg-slate-900/50 border border-slate-800 p-6">
          <h2 className="text-xl font-semibold text-slate-50">
            2. Générateur de prompts pour textes administratifs DYS-friendly & IA-friendly
          </h2>

          <div className="space-y-4">
            {/* PROMPT 1 */}
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 space-y-2">
              <h3 className="text-sm font-semibold text-emerald-300">
                ✅ Message aux familles – version claire & DYS-friendly
              </h3>

              <p className="text-xs text-slate-300">
                Copier-coller ce prompt, puis ajouter votre texte brut à la fin :
              </p>

              <pre className="mt-2 whitespace-pre-wrap rounded-lg bg-slate-950/80 p-3 text-[11px] text-slate-200 border border-slate-800">
{`Tu es un assistant spécialisé en communication scolaire.
Réécris le texte suivant pour des familles :
- phrases courtes ;
- vocabulaire simple, sans jargon administratif ;
- structure claire : objet, informations essentielles, démarches à suivre ;
- mise en forme avec des puces si nécessaire ;
- ton bienveillant et professionnel.

Texte à simplifier :
"COLLER ICI VOTRE TEXTE DE DÉPART"`}
              </pre>

              <button
                onClick={() =>
                  handleCopy(
                    "prompt1",
                    `Tu es un assistant spécialisé en communication scolaire.
Réécris le texte suivant pour des familles :
- phrases courtes ;
- vocabulaire simple, sans jargon administratif ;
- structure claire : objet, informations essentielles, démarches à suivre ;
- mise en forme avec des puces si nécessaire ;
- ton bienveillant et professionnel.

Texte à simplifier :
"COLLER ICI VOTRE TEXTE DE DÉPART"`
                  )
                }
                className="mt-2 rounded-md bg-slate-800 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-700 transition"
              >
                {copied === "prompt1" ? "✔ Copié !" : "📋 Copier"}
              </button>
            </div>

            {/* PROMPT 2 */}
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 space-y-2">
              <h3 className="text-sm font-semibold text-sky-300">
                ✅ Version IA-friendly pour que les élèves puissent le faire expliquer par l’IA
              </h3>

              <p className="text-xs text-slate-300">
                Pour produire un texte bien structuré et facile à résumer :
              </p>

              <pre className="mt-2 whitespace-pre-wrap rounded-lg bg-slate-950/80 p-3 text-[11px] text-slate-200 border border-slate-800">
{`Réécris le texte suivant pour qu'il soit facile à traiter par une IA utilisée par un élève :
- structure le texte avec des titres et sous-titres clairs ;
- numérote les étapes importantes ;
- mets en évidence les dates, horaires, lieux et personnes clés ;
- évite les phrases de plus de 20 mots.

Texte à restructurer :
"COLLER ICI VOTRE TEXTE DE DÉPART"`}
              </pre>

              <button
                onClick={() =>
                  handleCopy(
                    "prompt2",
                    `Réécris le texte suivant pour qu'il soit facile à traiter par une IA utilisée par un élève :
- structure le texte avec des titres et sous-titres clairs ;
- numérote les étapes importantes ;
- mets en évidence les dates, horaires, lieux et personnes clés ;
- évite les phrases de plus de 20 mots.

Texte à restructurer :
"COLLER ICI VOTRE TEXTE DE DÉPART"`
                  )
                }
                className="mt-2 rounded-md bg-slate-800 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-700 transition"
              >
                {copied === "prompt2" ? "✔ Copié !" : "📋 Copier"}
              </button>
            </div>

            {/* PROMPT 3 */}
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 space-y-2">
              <h3 className="text-sm font-semibold text-amber-300">
                ✅ Convocation officielle + version simplifiée
              </h3>

              <p className="text-xs text-slate-300">
                Pour obtenir automatiquement une version formelle + une version simplifiée :
              </p>

              <pre className="mt-2 whitespace-pre-wrap rounded-lg bg-slate-950/80 p-3 text-[11px] text-slate-200 border border-slate-800">
{`À partir des informations ci-dessous, produis deux versions d'un même message :
1) Une version "courrier officiel" pour les archives de l'établissement.
2) Une version "explication simple pour les familles" :
   - phrases courtes,
   - informations essentielles d'abord,
   - ton bienveillant.

Informations à utiliser :
"COLLER ICI LES INFORMATIONS (date, lieu, motif, personne concernée, etc.)"`}
              </pre>

              <button
                onClick={() =>
                  handleCopy(
                    "prompt3",
                    `À partir des informations ci-dessous, produis deux versions d'un même message :
1) Une version "courrier officiel" pour les archives de l'établissement.
2) Une version "explication simple pour les familles" :
   - phrases courtes,
   - informations essentielles d'abord,
   - ton bienveillant.

Informations à utiliser :
"COLLER ICI LES INFORMATIONS (date, lieu, motif, personne concernée, etc.)"`
                  )
                }
                className="mt-2 rounded-md bg-slate-800 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-700 transition"
              >
                {copied === "prompt3" ? "✔ Copié !" : "📋 Copier"}
              </button>
            </div>
          </div>
        </section>

        {/* -------------------------------------------- */}
        {/* SECTION 3 : AUTRES MODELES POUR LE QUOTIDIEN */}
        {/* -------------------------------------------- */}
        <section className="space-y-5 rounded-2xl bg-slate-900/40 border border-slate-800 p-6">
          <h2 className="text-xl font-semibold text-slate-50">
            3. Autres modèles utiles pour le secrétariat et la direction
          </h2>

          <p className="text-xs text-slate-300">
            Ces prompts peuvent être utilisés tels quels dans une IA (EleveAI, ChatGPT, etc.)
            en complétant les informations entre guillemets.
          </p>

          <div className="space-y-4">
            {/* PROMPT 4 : SORTIE SCOLAIRE */}
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 space-y-2">
              <h3 className="text-sm font-semibold text-violet-300">
                ✅ Information aux familles pour une sortie scolaire
              </h3>
              <p className="text-xs text-slate-300">
                Pour annoncer clairement une sortie ou un projet (collège / lycée) :
              </p>

              <pre className="mt-2 whitespace-pre-wrap rounded-lg bg-slate-950/80 p-3 text-[11px] text-slate-200 border border-slate-800">
{`Rédige un message aux familles pour annoncer une sortie scolaire.
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
"DOCUMENTS À RENDRE : ..."`}
              </pre>

              <button
                onClick={() =>
                  handleCopy(
                    "prompt4",
                    `Rédige un message aux familles pour annoncer une sortie scolaire.
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
"DOCUMENTS À RENDRE : ..."`
                  )
                }
                className="mt-2 rounded-md bg-slate-800 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-700 transition"
              >
                {copied === "prompt4" ? "✔ Copié !" : "📋 Copier"}
              </button>
            </div>

            {/* PROMPT 5 : RAPPEL REGLEMENT / COMPORTEMENT */}
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 space-y-2">
              <h3 className="text-sm font-semibold text-rose-300">
                ✅ Message de rappel du règlement / comportement
              </h3>
              <p className="text-xs text-slate-300">
                Pour rappeler une règle sans stigmatiser les élèves ou les familles :
              </p>

              <pre className="mt-2 whitespace-pre-wrap rounded-lg bg-slate-950/80 p-3 text-[11px] text-slate-200 border border-slate-800">
{`Rédige un message de rappel du règlement intérieur.
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
"AIDE PROPOSÉE PAR L'ÉTABLISSEMENT : ..."`}
              </pre>

              <button
                onClick={() =>
                  handleCopy(
                    "prompt5",
                    `Rédige un message de rappel du règlement intérieur.
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
"AIDE PROPOSÉE PAR L'ÉTABLISSEMENT : ..."`
                  )
                }
                className="mt-2 rounded-md bg-slate-800 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-700 transition"
              >
                {copied === "prompt5" ? "✔ Copié !" : "📋 Copier"}
              </button>
            </div>

            {/* PROMPT 6 : FELICITATIONS / VALORISATION */}
            <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 space-y-2">
              <h3 className="text-sm font-semibold text-emerald-200">
                ✅ Message de félicitations / valorisation d’un élève ou d’une classe
              </h3>
              <p className="text-xs text-slate-300">
                Pour renforcer le lien positif avec les familles et les élèves :
              </p>

              <pre className="mt-2 whitespace-pre-wrap rounded-lg bg-slate-950/80 p-3 text-[11px] text-slate-200 border border-slate-800">
{`Rédige un message de félicitations à destination d'une famille ou d'une classe.
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
"PROCHAINES ÉTAPES / ENCOURAGEMENTS : ..."`}
              </pre>

              <button
                onClick={() =>
                  handleCopy(
                    "prompt6",
                    `Rédige un message de félicitations à destination d'une famille ou d'une classe.
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
"PROCHAINES ÉTAPES / ENCOURAGEMENTS : ..."`
                  )
                }
                className="mt-2 rounded-md bg-slate-800 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-700 transition"
              >
                {copied === "prompt6" ? "✔ Copié !" : "📋 Copier"}
              </button>
            </div>
          </div>
        </section>
        {/* PROMPT 7 : INCIDENT / CRISE */}
<div className="rounded-xl bg-slate-900 border border-slate-800 p-4 space-y-2">
  <h3 className="text-sm font-semibold text-red-300">
    🚨 Message aux familles après un incident / événement sensible
  </h3>
  <p className="text-xs text-slate-300">
    Pour communiquer de manière responsable après un incident (bagarre, malaise, intrusion…).
  </p>

  <pre className="mt-2 whitespace-pre-wrap rounded-lg bg-slate-950/80 p-3 text-[11px] text-slate-200 border border-slate-800">
{`Rédige un message destiné aux familles après un incident survenu au collège.
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
"ATTENTE VIS-À-VIS DES FAMILLES : ..."`}
  </pre>

  <button
    onClick={() =>
      handleCopy(
        "prompt7",
        `Rédige un message destiné aux familles après un incident survenu au collège.
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
"ACTEURS IMPLIQUÉS : ..."
"SUIVI PRÉVU : ..."
"ATTENTE VIS-À-VIS DES FAMILLES : ..."`
      )
    }
    className="mt-2 rounded-md bg-slate-800 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-700 transition"
  >
    {copied === "prompt7" ? "✔ Copié !" : "📋 Copier"}
  </button>
</div>

{/* PROMPT 8 : COMPTE-RENDU CONSEIL DE CLASSE / CA */}
<div className="rounded-xl bg-slate-900 border border-slate-800 p-4 space-y-2">
  <h3 className="text-sm font-semibold text-indigo-300">
    📝 Compte-rendu synthétique d’un conseil de classe / CA
  </h3>
  <p className="text-xs text-slate-300">
    Pour produire un résumé clair, objectif et utilisable pour l’ENT.
  </p>

  <pre className="mt-2 whitespace-pre-wrap rounded-lg bg-slate-950/80 p-3 text-[11px] text-slate-200 border border-slate-800">
{`À partir des informations fournies, rédige un compte-rendu synthétique :
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
"CALENDRIER / SUIVI : ..."`}
  </pre>

  <button
    onClick={() =>
      handleCopy(
        "prompt8",
        `À partir des informations fournies, rédige un compte-rendu synthétique :
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
"CALENDRIER / SUIVI : ..."`
      )
    }
    className="mt-2 rounded-md bg-slate-800 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-700 transition"
  >
    {copied === "prompt8" ? "✔ Copié !" : "📋 Copier"}
  </button>
</div>

{/* PROMPT 9 : COMMUNICATION IA */}
<div className="rounded-xl bg-slate-900 border border-slate-800 p-4 space-y-2">
  <h3 className="text-sm font-semibold text-cyan-300">
    🤖 Communication officielle : usage de l’IA au collège
  </h3>
  <p className="text-xs text-slate-300">
    Pour informer les familles de manière claire sur l'utilisation de l’IA.
  </p>

  <pre className="mt-2 whitespace-pre-wrap rounded-lg bg-slate-950/80 p-3 text-[11px] text-slate-200 border border-slate-800">
{`Rédige une communication aux familles expliquant l’usage éducatif de l’IA dans l’établissement.
Contraintes :
- rappeler la position de l'Éducation nationale ;
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
"QUESTIONS DES FAMILLES À TRAITER : ..."`}
  </pre>

  <button
    onClick={() =>
      handleCopy(
        "prompt9",
        `Rédige une communication aux familles expliquant l’usage éducatif de l’IA dans l’établissement.
Contraintes :
- rappeler la position de l'Éducation nationale ;
- expliquer les bénéfices pédagogiques ;
- insister sur la sécurité et l’encadrement ;
- préciser ce qui est autorisé / non autorisé ;
- ton rassurant, institutionnel et clair ;
- proposer une FAQ en 5 questions.

Informations à utiliser :
"OBJECTIF DU MESSAGE : ..."
"OUTILS UTILISÉS : ..."
"CADRE OFFICIEL : ..."
"RÈGLES APPLIQUÉES AUX ÉLÈVES : ..."
"QUESTIONS DES FAMILLES À TRAITER : ..."`
      )
    }
    className="mt-2 rounded-md bg-slate-800 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-700 transition"
  >
    {copied === "prompt9" ? "✔ Copié !" : "📋 Copier"}
  </button>
</div>

      </div>
    </main>
  );
}


