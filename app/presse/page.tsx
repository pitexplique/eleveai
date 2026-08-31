// app/presse/page.tsx
"use client";

import Link from "next/link";
import { ECHELLE, PLAFOND_ETABLISSEMENT_AN, PRIX_FAMILLE_MOIS, euros, montant } from "@/lib/tarifs";

export default function PressePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      {/* HERO */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900/70 to-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-200">
            📰 Presse & Kit média
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            EleveAI
          </div>

          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold leading-tight">
            Presse : informations officielles, chiffres clés, logos, contact.
          </h1>

          <p className="mt-3 max-w-3xl text-sm sm:text-base text-slate-200">
            Cette page regroupe tout ce qu’il faut pour parler d’EleveAI : pitch, description,
            FAQ, éléments de langage, et ressources (à télécharger quand tu voudras).
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-950 px-5 py-3 text-sm font-semibold text-slate-200 hover:bg-slate-900"
            >
              📚 Lire les articles
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-500"
            >
              ✉️ Contacter
            </Link>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* LEFT */}
          <div className="lg:col-span-8 space-y-6">
            {/* Pitch */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <h2 className="text-lg font-bold">🎯 Pitch (1 phrase)</h2>
              <p className="mt-2 text-sm text-slate-200">
                EleveAI aide élèves, professeurs et parents à utiliser l’IA de façon pédagogique
                grâce à des prompts encadrés (questions → indices → correction) et une charte anti-triche.
              </p>
            </div>

            {/* Description */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <h2 className="text-lg font-bold">🧩 Description (court)</h2>
              <p className="mt-2 text-sm text-slate-200">
                EleveAI n’est pas un “robot qui fait les devoirs”.
                C’est un cadre clair pour apprendre à poser de bonnes questions et obtenir une aide utile :
                reformulation, étapes, entraînement, vérification.
                L’ambition : rendre l’usage de l’IA compatible avec l’école et rassurant pour les adultes.
              </p>

              <h3 className="mt-4 text-sm font-semibold text-slate-100">🧠 Ce que ça change</h3>
              <ul className="mt-2 space-y-2 text-sm text-slate-200">
                <li className="flex gap-2">
                  <span className="text-emerald-300">➤</span>
                  <span>Moins de flou : l’élève part d’un prompt propre et structuré.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-300">➤</span>
                  <span>Moins de triche : l’IA guide avant de “donner”.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-emerald-300">➤</span>
                  <span>Plus de confiance : parents et profs comprennent l’usage.</span>
                </li>
              </ul>
            </div>

            {/* FAQ presse */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <h2 className="text-lg font-bold">❓ FAQ presse</h2>

              <div className="mt-3 space-y-4">
                <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                  <p className="text-sm font-semibold">“Pourquoi EleveAI maintenant ?”</p>
                  <p className="mt-1 text-sm text-slate-200">
                    Parce que l’IA est déjà utilisée par les élèves. L’enjeu n’est plus de l’interdire,
                    mais d’apprendre à l’utiliser correctement, avec des traces et un cadre éducatif.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                  <p className="text-sm font-semibold">“Comment vous luttez contre la triche ?”</p>
                  <p className="mt-1 text-sm text-slate-200">
                    Par une charte claire et des prompts “anti-triche” : questions d’abord, indices,
                    correction étape par étape, mini-test final. L’objectif est l’apprentissage, pas la réponse.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                  {/* ⛔ CE PARAGRAPHE ANNONÇAIT « autour de 5 € », AU FUTUR
                      (corrigé le 22/08/2026) — un montant qui n'a jamais été
                      celui de la grille, sur la page que lit un journaliste,
                      c'est-à-dire à l'endroit précis où un chiffre se recopie
                      et se met à circuler tout seul. Un prix cité dans un
                      article ne se corrige plus jamais.
                      ⛔ Aucun montant écrit à la main : ils viennent tous de
                      `lib/tarifs.ts`, comme sur /tarifs et dans le llms.txt. */}
                  <p className="text-sm font-semibold">“Quel est le modèle économique ?”</p>
                  <p className="mt-1 text-sm text-slate-200">
                    L’élève ne paie jamais : le coach, les exercices, les parcours et
                    les évaluations restent ouverts, sans publicité. Ce qui se paie,
                    c’est de VOIR et de GARDER. Le prix suit une échelle, et
                    c’est le payeur qui la descend : {montant(PRIX_FAMILLE_MOIS)}{" "}
                    par élève et par mois pour une famille seule, moins quand sa
                    classe s’en charge, moins encore quand c’est
                    l’établissement — jamais plus de{" "}
                    {euros(PLAFOND_ETABLISSEMENT_AN)} par an. Pour{" "}
                    {ECHELLE.eleves} élèves : {euros(ECHELLE.siLesFamillesPaient)},{" "}
                    {euros(ECHELLE.siLesClassesPaient)} ou{" "}
                    {euros(ECHELLE.siLEtablissementPaie)}. On paie une fois, jamais
                    deux.
                  </p>
                </div>
              </div>
            </div>

            {/* Ressources */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <h2 className="text-lg font-bold">📦 Ressources (kit média)</h2>
              <p className="mt-2 text-sm text-slate-200">
                Tu peux ajouter ici des fichiers à télécharger (logo PNG/SVG, captures, dossier de presse PDF).
                Pour l’instant, on met des placeholders propres.
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                  <p className="text-sm font-semibold">🟩 Logo</p>
                  <p className="mt-1 text-xs text-slate-400">PNG / SVG (bientôt)</p>
                  <button
                    onClick={() => alert("Ajoute un fichier plus tard (logo).")}
                    className="mt-3 w-full rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-900"
                  >
                    Télécharger 
                  </button>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
                  <p className="text-sm font-semibold">📄 Dossier de presse</p>
                  <p className="mt-1 text-xs text-slate-400">PDF (bientôt)</p>
                  <button
                    onClick={() => alert("Ajoute un fichier plus tard (dossier de presse).")}
                    className="mt-3 w-full rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-900"
                  >
                    Télécharger (placeholder)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="lg:col-span-4 space-y-6">
            {/* Chiffres clés */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <h3 className="text-lg font-bold">📌 Infos clés</h3>
              <div className="mt-3 space-y-2 text-sm text-slate-200">
                <p>
                  <span className="text-slate-400">Nom :</span> <span className="font-semibold">EleveAI</span>
                </p>
                <p>
                  <span className="text-slate-400">Positionnement :</span>{" "}
                  <span className="font-semibold">IA encadrée, anti-triche</span>
                </p>
                <p>
                  <span className="text-slate-400">Public :</span>{" "}
                  <span className="font-semibold">Élèves · Profs · Parents · Établissements</span>
                </p>
                <p>
                  <span className="text-slate-400">Promesse :</span>{" "}
                  <span className="font-semibold">mieux questionner, mieux apprendre</span>
                </p>
              </div>

              <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                <p className="text-sm font-semibold text-emerald-200">🛡️ Charte</p>
                <p className="mt-1 text-sm text-slate-200">
                  Usage IA autorisé mais encadré : prompt, réponse, correction personnelle, analyse critique.
                </p>
                <Link
                  href="/charte"
                  className="mt-3 inline-flex text-sm font-semibold text-emerald-200 hover:text-emerald-100"
                >
                  Lire la charte →
                </Link>
              </div>
            </div>

            {/* Contact presse */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <h3 className="text-lg font-bold">✉️ Contact</h3>
              <p className="mt-2 text-sm text-slate-200">
                Pour interview, partenariat, démonstration établissement, etc.
              </p>
              {/* ⛔ Le second bouton « 🤝 Devenir partenaire » menait à
                  /partenaires, supprimée le 31/08/2026. Il n'est pas remplacé :
                  le paragraphe ci-dessus dit déjà « interview, partenariat,
                  démonstration », et /contact les reçoit tous les trois. Deux
                  boutons vers la même page n'auraient rien ajouté. */}
              <div className="mt-4 flex flex-col gap-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
                >
                  Contacter EleveAI
                </Link>
              </div>
            </div>

            {/* Navigation rapide */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
              <h3 className="text-lg font-bold">🧭 Accès rapide</h3>
              <div className="mt-3 grid gap-2">
                <Link href="/articles/prompts-pedagogiques" className="rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-3 text-sm font-semibold hover:bg-slate-950/60">
                  ✍️ Prompts pédagogiques
                </Link>
                <Link href="/articles/profs" className="rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-3 text-sm font-semibold hover:bg-slate-950/60">
                  👩‍🏫 Profs
                </Link>
                <Link href="/articles/eleves" className="rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-3 text-sm font-semibold hover:bg-slate-950/60">
                  🎒 Élèves
                </Link>
                <Link href="/articles/parents" className="rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-3 text-sm font-semibold hover:bg-slate-950/60">
                  👨‍👩‍👧 Parents
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-slate-400 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <p>🇫🇷 Hébergé en France · 🔒 Données chiffrées</p>
          <div className="flex gap-3">
            <Link href="/mentions-legales" className="hover:text-slate-200">
              Mentions légales
            </Link>
            <Link href="/contact" className="hover:text-slate-200">
              Contact
            </Link>
            <Link href="/blog" className="hover:text-slate-200">
              Articles
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
