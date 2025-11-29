"use client";

import { useState } from "react";

const PUBLIC_PASSWORD =
  process.env.NEXT_PUBLIC_PILOTE_PASSWORD || "235711-IA!";

export const metadata = {
  title: "Offre Établissement Pilote – EleveAI",
  description:
    "Présentation confidentielle de l’offre EleveAI pour les établissements pilotes.",
  robots: "noindex, nofollow", // très important : pas d'indexation Google
};

export default function OffrePilotePage() {
  const [password, setPassword] = useState("");
  const [accesOK, setAccesOK] = useState(false);
  const [erreur, setErreur] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === PUBLIC_PASSWORD) {
      setAccesOK(true);
      setErreur("");
    } else {
      setErreur("Mot de passe incorrect.");
      setAccesOK(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-slate-50">
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        {/* En-tête */}
        <header className="space-y-3">
          <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 text-xs font-semibold text-emerald-300 border border-slate-700">
            <span>🔒</span>
            <span>Accès réservé – Offre Établissement Pilote EleveAI</span>
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-emerald-300">
            Espace confidentiel – Chefs d’établissement
          </h1>
          <p className="text-sm sm:text-base text-slate-200/80 max-w-2xl">
            Cette page présente l&apos;offre EleveAI pour les établissements pilotes.
            Elle est réservée aux équipes de direction et ne doit pas être diffusée
            publiquement. Merci de ne pas partager le contenu sans accord préalable.
          </p>
        </header>

        {/* Si pas encore accès : formulaire mot de passe */}
        {!accesOK && (
          <section className="bg-slate-900/80 border border-slate-700 rounded-2xl shadow-lg shadow-black/40 p-6 space-y-4">
            <h2 className="text-lg font-semibold text-slate-50">
              Saisir le mot de passe
            </h2>
            <p className="text-sm text-slate-300">
              Le lien vers cette page et le mot de passe vous ont été transmis par
              email. Si ce n&apos;est pas le cas, vous pouvez contacter{" "}
              <span className="font-semibold text-emerald-300">
                Frédéric – EleveAI
              </span>{" "}
              pour obtenir un accès.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3 max-w-sm">
              <label className="block text-xs font-medium text-slate-200 mb-1">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-slate-600 bg-slate-950/70 rounded-lg px-3 py-2 text-sm text-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-400/80"
                placeholder="••••••••"
              />
              {erreur && (
                <p className="text-xs text-red-400 mt-1">{erreur}</p>
              )}
              <button
                type="submit"
                className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 text-sm font-semibold hover:bg-emerald-400 transition"
              >
                ✅ Valider l&apos;accès
              </button>
            </form>

            <p className="text-[11px] text-slate-400 pt-2">
              Pour des raisons de confidentialité, merci de ne pas transmettre ce mot
              de passe à des personnes extérieures à votre établissement.
            </p>
          </section>
        )}

        {/* Contenu confidentiel une fois le bon mot de passe entré */}
        {accesOK && (
          <section className="bg-slate-900/90 border border-emerald-500/40 rounded-2xl shadow-xl shadow-black/50 p-6 sm:p-7 space-y-6">
            <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-[11px] font-semibold text-emerald-300 border border-emerald-500/40">
              <span>✅</span>
              <span>Accès confirmé – Document confidentiel EleveAI</span>
            </p>

            <h2 className="text-2xl font-bold text-emerald-300">
              Programme d&apos;accompagnement – Établissement Pilote EleveAI
            </h2>

            <p className="text-sm text-slate-200/90">
              Ce document présente la proposition EleveAI pour un accompagnement
              structuré de votre établissement autour de l&apos;intelligence
              artificielle : pédagogie, prévention de la triche, formation des équipes
              et mise en place d&apos;espaces IA sécurisés.
            </p>

            {/* 1. Projet d'établissement */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-emerald-200">
                1. Intégrer l&apos;IA dans votre projet d&apos;établissement
              </h3>
              <p className="text-sm text-slate-200/80">
                Nous vous accompagnons pour inscrire l&apos;IA dans une{" "}
                <span className="font-semibold">
                  dynamique globale d&apos;établissement
                </span>{" "}
                : projet d&apos;établissement, plan numérique, axes pédagogiques,
                innovation.
              </p>
              <ul className="list-disc pl-5 text-sm text-slate-200/80 space-y-1">
                <li>Clarifier les objectifs pédagogiques liés à l&apos;IA.</li>
                <li>
                  Identifier les niveaux, disciplines et équipes prioritaires.
                </li>
                <li>
                  Donner un cadre rassurant aux enseignants, aux élèves et aux parents.
                </li>
              </ul>
            </div>

            {/* 2. Charte anti-triche */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-emerald-200">
                2. Charte IA & anti-triche
              </h3>
              <p className="text-sm text-slate-200/80">
                Co-construction d&apos;une{" "}
                <span className="font-semibold">charte simple et opérationnelle</span>{" "}
                sur l&apos;usage de l&apos;IA :
              </p>
              <ul className="list-disc pl-5 text-sm text-slate-200/80 space-y-1">
                <li>Définir ce qui est autorisé ou interdit (DM, exposés, oraux…).</li>
                <li>
                  Sécuriser les évaluations écrites (brevet, bac blanc, contrôles).
                </li>
                <li>
                  Aider les équipes à reconnaître une copie générée par IA et à
                  réagir de façon pédagogique.
                </li>
              </ul>
            </div>

            {/* 3. Formation des équipes */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-emerald-200">
                3. Formation des équipes pédagogiques
              </h3>
              <p className="text-sm text-slate-200/80">
                Des sessions de formation modulables pour :
              </p>
              <ul className="list-disc pl-5 text-sm text-slate-200/80 space-y-1">
                <li>Enseignants (toutes disciplines et niveaux).</li>
                <li>Équipe de direction, vie scolaire, professeurs documentalistes.</li>
                <li>
                  Référents numériques / coordinateurs de projets pédagogiques.
                </li>
              </ul>
              <p className="text-sm text-slate-200/80">
                Objectif : rendre l&apos;IA{" "}
                <span className="font-semibold">utile, maîtrisée et éthique</span> dans
                le quotidien de l&apos;établissement.
              </p>
            </div>

            {/* 4. Espaces IA pédagogiques */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-emerald-200">
                4. Mise en place d&apos;espaces IA pédagogiques
              </h3>
              <p className="text-sm text-slate-200/80">
                Construction avec vos équipes de :
              </p>
              <ul className="list-disc pl-5 text-sm text-slate-200/80 space-y-1">
                <li>Un espace IA élèves (révisions, remédiation, projets).</li>
                <li>Un espace IA enseignants (préparation, mutualisation).</li>
                <li>
                  Une bibliothèque de prompts adaptée à vos niveaux et vos disciplines.
                </li>
              </ul>
            </div>

            {/* 5. Accompagnement 3 à 6 mois */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-emerald-200">
                5. Accompagnement sur 3 ou 6 mois
              </h3>
              <p className="text-sm text-slate-200/80">
                Un suivi régulier pour ancrer les usages :
              </p>
              <ul className="list-disc pl-5 text-sm text-slate-200/80 space-y-1">
                <li>1 à 2 réunions de suivi par mois.</li>
                <li>Analyse des besoins et des retours des équipes.</li>
                <li>
                  Ajustement progressif des pratiques et des outils proposés aux
                  enseignants et aux élèves.
                </li>
              </ul>
            </div>

            {/* CTA contact */}
            <div className="pt-4 border-t border-slate-700 mt-4">
              <p className="text-sm text-slate-200/90 mb-2">
                Pour recevoir un devis détaillé ou échanger sur l&apos;adaptation de ce
                dispositif à votre établissement, vous pouvez répondre au mail qui vous
                a transmis ce lien ou écrire à :
              </p>
              <p className="text-sm font-semibold text-emerald-300">
                frederic [at] eleveai.com
              </p>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
