"use client";

// L'écran d'entrée : « Qui es-tu ? », puis « Que veux-tu faire aujourd'hui ? ».
// Rien d'autre au-dessus de la ligne de flottaison.
//
// Aucun appel d'API : tout se joue dans lib/matrice/moteur.ts. La page est
// donc statique, instantanée, et ne coûte rien — ni en euros, ni en quota.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { PROFILS, chipsPour, exemplesPour, getProfil } from "@/lib/matrice/profils";
import { chercher, libelleIntention } from "@/lib/matrice/moteur";
import type { ProfilId, ResultatMatrice } from "@/lib/matrice/types";

const CLE_PROFIL = "eleveai.ia.profil";
const CLE_HISTORIQUE = "eleveai.ia.historique";
const MAX_HISTORIQUE = 8;

type EntreeHistorique = { question: string; profil: ProfilId; quand: number };

export default function IAClient() {
  const [profil, setProfil] = useState<ProfilId>("6e");
  const [profilChoisi, setProfilChoisi] = useState(false);
  const [question, setQuestion] = useState("");
  const [chip, setChip] = useState<string | null>(null);
  const [resultat, setResultat] = useState<ResultatMatrice | null>(null);
  const [demandeProfil, setDemandeProfil] = useState(false);
  const [historique, setHistorique] = useState<EntreeHistorique[]>([]);
  const champ = useRef<HTMLInputElement>(null);

  // Le profil se retient : on ne redemande pas à un élève qui il est chaque matin.
  useEffect(() => {
    try {
      const p = localStorage.getItem(CLE_PROFIL);
      if (p && PROFILS.some((x) => x.id === p)) {
        setProfil(p as ProfilId);
        setProfilChoisi(true);
      }
      const h = localStorage.getItem(CLE_HISTORIQUE);
      if (h) setHistorique(JSON.parse(h) as EntreeHistorique[]);
    } catch {
      /* navigation privée : on s'en passe */
    }
  }, []);

  const p = useMemo(() => getProfil(profil), [profil]);
  const chips = useMemo(() => chipsPour(profil), [profil]);
  const exemples = useMemo(() => exemplesPour(profil), [profil]);

  const lancer = useCallback(
    (texte: string, chipChoisie: string | null, profilForce?: ProfilId) => {
      const quiEsTu = profilForce ?? profil;
      const vecteur = { quiEsTu, question: texte.trim(), chip: chipChoisie };
      if (!vecteur.question && !vecteur.chip) return;

      // Sans profil, on ne devine pas : la même phrase ne veut pas dire la même
      // chose en CP et en Terminale. On demande le geste qui rend tout le reste
      // juste, plutôt que de servir du 6e à un CP.
      if (!profilChoisi && !profilForce) {
        setDemandeProfil(true);
        setResultat(null);
        return;
      }

      const res = chercher(vecteur);
      setResultat(res);

      if (vecteur.question) {
        setHistorique((prec) => {
          const suite = [
            { question: vecteur.question, profil: quiEsTu, quand: Date.now() },
            ...prec.filter((e) => e.question !== vecteur.question),
          ].slice(0, MAX_HISTORIQUE);
          try {
            localStorage.setItem(CLE_HISTORIQUE, JSON.stringify(suite));
          } catch {
            /* tant pis */
          }
          return suite;
        });
      }

      // Mesure. On envoie le PROFIL et le NOMBRE de résultats, jamais le texte
      // de la question : ce que quelqu'un tape ne part nulle part.
      track("ia_demande", {
        profil: quiEsTu,
        trouve: res.recommandations.length,
        notion: res.lecture.notionId ?? "aucune",
        intention: res.lecture.intention ?? "aucune",
      });

      if (res.recommandations.length === 0) {
        // Une question sans réponse vaut de l'or : c'est ce qui manque au
        // catalogue. On la compte (sans le texte) pour la retrouver dans le
        // suivi des pages.
        try {
          fetch("/api/track", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ page: "/ia", source: "sans-reponse" }),
            keepalive: true,
          }).catch(() => {});
        } catch {
          /* fire and forget */
        }
      }
    },
    [profil, profilChoisi],
  );

  function choisirProfil(id: ProfilId) {
    setProfil(id);
    setProfilChoisi(true);
    setDemandeProfil(false);
    setChip(null);
    try {
      localStorage.setItem(CLE_PROFIL, id);
    } catch {
      /* tant pis */
    }
    track("ia_profil", { profil: id });
    // La question déjà tapée repart aussitôt : on ne fait pas retaper.
    if (question.trim()) lancer(question, null, id);
    else setResultat(null);
    champ.current?.focus();
  }

  function cliquerChip(label: string) {
    const suivante = chip === label ? null : label;
    setChip(suivante);
    lancer(question, suivante);
  }

  const eleve = p.groupe === "eleve";

  return (
    <main className="min-h-screen bg-[#f5fafb] px-4 pb-24 pt-10 text-slate-900 sm:pt-16">
      <div className="mx-auto w-full max-w-2xl">
        <header className="mb-10 text-center">
          <p className="text-2xl font-semibold tracking-[0.14em] sm:text-3xl">ELEVEAI</p>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            L&apos;IA éducative conçue à La Réunion
          </p>
        </header>

        {/* ── Qui es-tu ? ─────────────────────────────────────────────── */}
        <section aria-labelledby="qui" className="mb-8">
          <h2 id="qui" className="mb-3 text-sm font-medium text-slate-700">
            Qui es-tu ?
          </h2>
          <div className="flex flex-wrap gap-2">
            {PROFILS.map((x) => {
              const actif = profilChoisi && x.id === profil;
              return (
                <button
                  key={x.id}
                  type="button"
                  onClick={() => choisirProfil(x.id)}
                  aria-pressed={actif}
                  className={`rounded-full border px-3.5 py-1.5 text-sm transition ${
                    actif
                      ? "border-teal-700 bg-teal-700 text-white"
                      : "border-slate-300 bg-white text-slate-700 hover:border-slate-500"
                  }`}
                >
                  {x.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* ── Que veux-tu faire aujourd'hui ? ─────────────────────────── */}
        <section aria-labelledby="quoi">
          <h2 id="quoi" className="mb-3 text-sm font-medium text-slate-700">
            {eleve ? "Que veux-tu faire aujourd'hui ?" : "Que voulez-vous faire aujourd'hui ?"}
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              lancer(question, chip);
            }}
            className="flex gap-2"
          >
            <input
              ref={champ}
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={
                eleve
                  ? "Écris ta question ou explique ce qui coince…"
                  : "Décrivez votre besoin…"
              }
              aria-label="Ta question"
              className="min-w-0 flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-base outline-none placeholder:text-slate-400 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20"
            />
            <button
              type="submit"
              aria-label="Chercher"
              className="shrink-0 rounded-xl bg-teal-700 px-4 py-3 text-white transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-700/40"
            >
              <span aria-hidden="true">→</span>
            </button>
          </form>

          {demandeProfil && (
            <p
              role="alert"
              className="mt-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900"
            >
              Dis-moi d&apos;abord qui tu es — « les fractions » ne veulent pas dire la même chose
              en CP et en Terminale.
            </p>
          )}

          {/* Une barre vide, c'est la page blanche. On souffle trois départs. */}
          {!resultat && !demandeProfil && (
            <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500">
              <span>Par exemple :</span>
              {exemples.map((ex) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => {
                    setQuestion(ex);
                    lancer(ex, null);
                  }}
                  className="underline decoration-slate-300 underline-offset-2 hover:text-slate-800 hover:decoration-slate-500"
                >
                  « {ex} »
                </button>
              ))}
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {chips.map((c) => {
              const actif = chip === c.label;
              return (
                <button
                  key={c.label}
                  type="button"
                  onClick={() => cliquerChip(c.label)}
                  aria-pressed={actif}
                  className={`rounded-full border px-3.5 py-1.5 text-sm transition ${
                    actif
                      ? "border-teal-700 bg-teal-50 text-teal-900"
                      : "border-slate-300 bg-white text-slate-600 hover:border-slate-500"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* ── Ce qu'on a trouvé ───────────────────────────────────────── */}
        {resultat && (
          <section className="mt-10" aria-live="polite">
            <p className="mb-3 text-xs text-slate-500">
              Ce que j&apos;ai compris :{" "}
              <span className="text-slate-700">
                {[
                  p.label,
                  resultat.lecture.intention ? libelleIntention(resultat.lecture.intention) : null,
                  resultat.lecture.notionLabel,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </span>
            </p>

            {resultat.lecture.intention === "humain" ? (
              // Chercher quelqu'un, ce n'est pas chercher une ressource. On n'a
              // pas encore d'annuaire — on le dit, et on ouvre la seule porte
              // qui existe vraiment : un prof qui répond.
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-sm text-slate-800">
                  {p.tutoie ? "Tu cherches" : "Vous cherchez"} quelqu&apos;un, pas un exercice.
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  EleveAI n&apos;a pas encore d&apos;annuaire de professeurs — je ne vais pas{" "}
                  {p.tutoie ? "te" : "vous"} faire croire le contraire. En attendant, c&apos;est un
                  vrai enseignant qui lit les messages.
                </p>
                <Link
                  href="/contact?from=ia"
                  onClick={() => track("ia_ressource", { id: "contact-humain", rang: 1, profil })}
                  className="mt-4 inline-block rounded-xl bg-teal-700 px-4 py-2 text-sm text-white hover:bg-teal-800"
                >
                  Écrire à un enseignant
                </Link>
              </div>
            ) : resultat.recommandations.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-sm text-slate-800">
                  Je n&apos;ai rien de vérifié à {p.tutoie ? "te" : "vous"} proposer là-dessus pour{" "}
                  {p.label}.
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  C&apos;est noté — c&apos;est comme ça qu&apos;on sait quoi construire ensuite.
                  Essaie de le dire autrement, ou choisis une entrée ci-dessus.
                </p>
                {resultat.lecture.motsInconnus.length > 0 && (
                  <p className="mt-3 text-xs text-slate-400">
                    Mots que je n&apos;ai pas reconnus : {resultat.lecture.motsInconnus.join(", ")}
                  </p>
                )}
              </div>
            ) : (
              <ul className="space-y-3">
                {resultat.recommandations.map((r, i) => (
                  <li key={r.ressource.id}>
                    <Link
                      href={`${r.ressource.url}${r.ressource.url.includes("?") ? "&" : "?"}from=ia`}
                      onClick={() =>
                        track("ia_ressource", { id: r.ressource.id, rang: i + 1, profil })
                      }
                      className={`block rounded-2xl border bg-white p-5 transition hover:border-teal-700 ${
                        i === 0 ? "border-teal-700 ring-1 ring-teal-700/20" : "border-slate-200"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="font-medium text-slate-900">{r.ressource.titre}</p>
                        <span
                          className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] ${
                            r.ressource.statut === "testee_eleves"
                              ? "bg-emerald-50 text-emerald-800"
                              : "bg-sky-50 text-sky-800"
                          }`}
                        >
                          {r.ressource.statut === "testee_eleves" ? "testée en classe" : "vérifiée"}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-slate-600">{r.ressource.promesse}</p>
                      <p className="mt-2 text-xs text-slate-400">{r.raison}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {/* ── Tes dernières demandes ──────────────────────────────────── */}
        {historique.length > 0 && (
          <section className="mt-12 border-t border-slate-200 pt-6">
            <h2 className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-400">
              {eleve ? "Tes dernières demandes" : "Vos dernières demandes"}
            </h2>
            <ul className="space-y-1">
              {historique.map((h) => (
                <li key={`${h.quand}-${h.question}`}>
                  <button
                    type="button"
                    onClick={() => {
                      setQuestion(h.question);
                      lancer(h.question, null);
                    }}
                    className="text-left text-sm text-slate-600 hover:text-teal-800 hover:underline"
                  >
                    {h.question}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        <footer className="mt-14 text-center text-xs text-slate-400">
          <p>
            EleveAI tient compte de {eleve ? "ton" : "votre"} profil et cherche, parmi des
            ressources relues par un enseignant, celles qui peuvent le mieux{" "}
            {eleve ? "t'aider" : "vous aider"}.
          </p>
          <p className="mt-3">
            <Link href="/accueil" className="underline underline-offset-2 hover:text-slate-600">
              Revenir au journal
            </Link>
          </p>
        </footer>
      </div>
    </main>
  );
}
