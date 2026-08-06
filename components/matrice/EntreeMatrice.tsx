"use client";

// L'ENTRÉE D'ELEVEAI : « Qui es-tu ? », puis « Que veux-tu faire aujourd'hui ? ».
//
// Le même composant sert à deux endroits, et c'est voulu — une seule entrée,
// pas deux qui divergeraient :
//   — variante « page »    : /ia, l'écran complet, avec l'historique ;
//   — variante « accueil » : en tête du journal, compacte, sans historique.
//
// Aucun appel d'API : tout se joue dans lib/matrice/moteur.ts. La même phrase
// donne toujours la même réponse, et on peut dire pourquoi.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { PROFILS, exemplesPour, getProfil } from "@/lib/matrice/profils";
import { CHIPS_VISIBLES, chipsDisponibles, composerChip, matieresDisponibles } from "@/lib/matrice/chips";
import { chercher, libelleIntention } from "@/lib/matrice/moteur";
import type { ProfilId, ResultatMatrice } from "@/lib/matrice/types";

const CLE_PROFIL = "eleveai.ia.profil";
const CLE_HISTORIQUE = "eleveai.ia.historique";
const MAX_HISTORIQUE = 8;

type EntreeHistorique = { question: string; profil: ProfilId; quand: number };

export default function EntreeMatrice({
  variante = "page",
  onProfil,
}: {
  variante?: "page" | "accueil";
  /**
   * Prévenu à chaque choix de profil. C'est par là que l'accueil se réordonne :
   * depuis le 05/08 cette barre REMPLACE les huit tuiles « Qui est-ce ? », donc
   * c'est elle qui doit dire au journal pour qui il se range.
   */
  onProfil?: (profil: ProfilId) => void;
}) {
  const surAccueil = variante === "accueil";

  const [profil, setProfil] = useState<ProfilId>("6e");
  const [profilChoisi, setProfilChoisi] = useState(false);
  const [question, setQuestion] = useState("");
  // Deux sélections à l'écran, UNE SEULE chip dans le vecteur : elles se
  // composent en « Mathématiques · M'entraîner ». Le vecteur reste à trois
  // champs — c'est une règle du produit, pas une contrainte technique.
  const [matiereChoisie, setMatiereChoisie] = useState<string | null>(null);
  const [intentionChoisie, setIntentionChoisie] = useState<string | null>(null);
  const chip = useMemo(
    () => composerChip(matiereChoisie, intentionChoisie),
    [matiereChoisie, intentionChoisie],
  );
  const [resultat, setResultat] = useState<ResultatMatrice | null>(null);
  const [demandeProfil, setDemandeProfil] = useState(false);
  const [plusDOptions, setPlusDOptions] = useState(false);
  const [historique, setHistorique] = useState<EntreeHistorique[]>([]);
  const champ = useRef<HTMLInputElement>(null);

  // Le profil se retient : on ne redemande pas à un élève qui il est chaque
  // matin. Et il est PARTAGÉ entre /ia et l'accueil — même clé, même personne.
  useEffect(() => {
    try {
      const p = localStorage.getItem(CLE_PROFIL);
      if (p && PROFILS.some((x) => x.id === p)) {
        setProfil(p as ProfilId);
        setProfilChoisi(true);
        // Une demande rappelée depuis la colonne de gauche (?q=…) repart
        // aussitôt : cliquer dans l'historique doit refaire la recherche, pas
        // seulement remplir le champ.
        const q = new URLSearchParams(window.location.search).get("q");
        if (q) {
          setQuestion(q);
          setResultat(chercher({ quiEsTu: p as ProfilId, question: q, chip: null }));
        }
      }
      if (!surAccueil) {
        const h = localStorage.getItem(CLE_HISTORIQUE);
        if (h) setHistorique(JSON.parse(h) as EntreeHistorique[]);
      }
    } catch {
      /* navigation privée : on s'en passe */
    }
  }, [surAccueil]);

  const p = useMemo(() => getProfil(profil), [profil]);
  // Les chips viennent des ressources réellement publiables pour ce profil —
  // pas d'une liste de fonctionnalités souhaitées. Une intention sans ressource
  // n'apparaît pas.
  const toutesLesChips = useMemo(() => chipsDisponibles(profil), [profil]);
  const chips = useMemo(
    () => (plusDOptions ? toutesLesChips : toutesLesChips.slice(0, CHIPS_VISIBLES)),
    [toutesLesChips, plusDOptions],
  );
  const matieres = useMemo(() => matieresDisponibles(profil), [profil]);
  const exemples = useMemo(() => exemplesPour(profil), [profil]);

  const lancer = useCallback(
    (texte: string, chipChoisie: string | null, profilForce?: ProfilId) => {
      const quiEsTu = profilForce ?? profil;
      const vecteur = { quiEsTu, question: texte.trim(), chip: chipChoisie };
      if (!vecteur.question && !vecteur.chip) return;

      // Sans profil, on ne devine pas : la même phrase ne veut pas dire la même
      // chose en CP et en Terminale.
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
        ou: variante,
        trouve: res.recommandations.length,
        notion: res.lecture.notionId ?? "aucune",
        intention: res.lecture.intention ?? "aucune",
      });

      // LA PHRASE ELLE-MÊME part en base — sans aucune identité. Compter les
      // questions sans réponse disait COMBIEN ; il faut savoir LESQUELLES, sinon
      // on ne sait pas quoi construire ensuite.
      try {
        fetch("/api/questions-entree", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: vecteur.question,
            profil: quiEsTu,
            chip: chipChoisie,
            notion: res.lecture.notionId,
            intention: res.lecture.intention,
            trouves: res.recommandations.length,
            ou: variante,
          }),
          keepalive: true,
        }).catch(() => {});
      } catch {
        /* fire and forget : jamais bloquant */
      }

      if (res.recommandations.length === 0) {
        // Le compteur reste : il vit dans le suivi des pages, à côté du reste.
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
    [profil, profilChoisi, variante],
  );

  function choisirProfil(id: ProfilId) {
    setProfil(id);
    setProfilChoisi(true);
    setDemandeProfil(false);
    setMatiereChoisie(null);
    setIntentionChoisie(null);
    setPlusDOptions(false);
    try {
      localStorage.setItem(CLE_PROFIL, id);
    } catch {
      /* tant pis */
    }
    track("ia_profil", { profil: id, ou: variante });
    onProfil?.(id);
    if (question.trim()) lancer(question, null, id);
    else setResultat(null);
    champ.current?.focus();
  }

  function cliquerMatiere(label: string) {
    const suivante = matiereChoisie === label ? null : label;
    setMatiereChoisie(suivante);
    lancer(question, composerChip(suivante, intentionChoisie));
  }

  function cliquerChip(label: string) {
    const suivante = intentionChoisie === label ? null : label;
    setIntentionChoisie(suivante);
    lancer(question, composerChip(matiereChoisie, suivante));
  }

  const eleve = p.groupe === "eleve";

  // Sur le journal on emprunte l'encre et le papier de la page ; sur /ia on a
  // notre propre calme. Deux habillages, un seul comportement.
  const bouton = (actif: boolean) =>
    surAccueil
      ? actif
        ? "border-2 border-[#1d1c16] bg-[#1d1c16] text-[#f5fafb]"
        : "border-2 border-[#1d1c16]/40 bg-white/70 text-[#1d1c16] hover:border-[#1d1c16]"
      : actif
        ? "border border-teal-700 bg-teal-700 text-white"
        : "border border-slate-300 bg-white text-slate-700 hover:border-slate-500";

  return (
    <section
      aria-label="Que veux-tu faire aujourd'hui ?"
      className={
        surAccueil
          ? "mx-auto mb-6 w-full min-w-0 max-w-6xl border-2 border-[#1d1c16] bg-white/60 px-4 py-5 sm:px-6"
          : ""
      }
    >
      {surAccueil && (
        <p className="mb-3 text-[11px] font-black uppercase tracking-[0.22em] text-[#0e7490]">
          Dis-nous ce que tu cherches
        </p>
      )}

      {/* ── Qui es-tu ? ─────────────────────────────────────────────────── */}
      <h2
        className={
          surAccueil
            ? "mb-2 text-sm font-bold text-[#1d1c16]"
            : "mb-3 text-sm font-medium text-slate-700"
        }
      >
        Qui es-tu ?
      </h2>
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {PROFILS.map((x) => {
          const actif = profilChoisi && x.id === profil;
          return (
            <button
              key={x.id}
              type="button"
              onClick={() => choisirProfil(x.id)}
              aria-pressed={actif}
              className={`rounded-full px-3 py-1.5 text-[13px] transition sm:px-3.5 ${bouton(actif)}`}
            >
              {x.label}
            </button>
          );
        })}
      </div>

      {/* ── Que veux-tu faire aujourd'hui ? ─────────────────────────────── */}
      <h2
        className={
          surAccueil
            ? "mb-2 mt-5 text-sm font-bold text-[#1d1c16]"
            : "mb-3 mt-8 text-sm font-medium text-slate-700"
        }
      >
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
            eleve ? "Écris ta question ou explique ce qui coince…" : "Décrivez votre besoin…"
          }
          aria-label="Ta question"
          // ⚠️ ARRONDIE AUX QUATRE COINS, seule de toute la page (Frédéric,
          // 05/08). Le journal est carré partout — filets, tuiles, encadrés —
          // et c'est justement pour ça : une zone de saisie d'IA se reconnaît à
          // sa forme avant d'être lue. La rondeur dit « écris ici » là où un
          // rectangle dirait « encore un encadré ».
          className={
            surAccueil
              ? "min-w-0 flex-1 rounded-2xl border-2 border-[#1d1c16] bg-white px-4 py-3 text-base text-[#1d1c16] outline-none placeholder:text-[#1d1c16]/45 focus:ring-2 focus:ring-[#0e7490]/30"
              : "min-w-0 flex-1 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base outline-none placeholder:text-slate-400 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20"
          }
        />
        <button
          type="submit"
          aria-label="Chercher"
          className={
            surAccueil
              ? "shrink-0 rounded-2xl border-2 border-[#1d1c16] bg-[#1d1c16] px-4 py-3 font-bold text-[#f5fafb] transition hover:border-[#0e7490] hover:bg-[#0e7490]"
              : "shrink-0 rounded-2xl bg-teal-700 px-4 py-3 text-white transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-700/40"
          }
        >
          <span aria-hidden="true">→</span>
        </button>
      </form>

      {demandeProfil && (
        <p
          role="alert"
          className={
            surAccueil
              ? "mt-3 border-2 border-[#a34c07] bg-[#a34c07]/10 px-3 py-2 text-sm text-[#1d1c16]"
              : "mt-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900"
          }
        >
          Dis-moi d&apos;abord qui tu es — « les fractions » ne veulent pas dire la même chose en
          CP et en Terminale.
        </p>
      )}

      {/* Une barre vide, c'est la page blanche. On souffle trois départs. */}
      {!resultat && !demandeProfil && (
        <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#1d1c16]/60">
          <span>Par exemple :</span>
          {exemples.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => {
                setQuestion(ex);
                lancer(ex, null);
              }}
              className="underline decoration-[#1d1c16]/30 underline-offset-2 hover:decoration-[#1d1c16]"
            >
              « {ex} »
            </button>
          ))}
        </p>
      )}

      {/* ── LES MATIÈRES ─────────────────────────────────────────────────
          Sous le champ, pas au-dessus : la question et sa réponse doivent se
          toucher, et les matières sont un raccourci pour qui ne sait pas quoi
          écrire — pas un préalable à la saisie.
          En pastilles PLEINES, là où les intentions sont à contour : sans cette
          différence, on aurait douze boutons sur deux lignes et personne ne
          verrait qu'ils ne répondent pas à la même question.
          La matière ne s'écrit jamais dans le champ : le texte tapé reste celui
          de la personne, et la pastille allumée dit le filtre. */}
      {matieres.length > 1 && (
        <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
          {matieres.map((m) => {
            const actif = matiereChoisie === m.label;
            return (
              <button
                key={m.matiere}
                type="button"
                onClick={() => cliquerMatiere(m.label)}
                aria-pressed={actif}
                className={`rounded-full px-3 py-1.5 text-[13px] font-medium transition ${
                  surAccueil
                    ? actif
                      ? "bg-[#0e7490] text-white"
                      : "bg-[#1d1c16]/[0.07] text-[#1d1c16] hover:bg-[#1d1c16]/15"
                    : actif
                      ? "bg-teal-700 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {m.label}
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-2 flex flex-wrap gap-1.5 sm:gap-2">
        {chips.map((c) => {
          const actif = intentionChoisie === c.label;
          return (
            <button
              key={c.label}
              type="button"
              onClick={() => cliquerChip(c.label)}
              aria-pressed={actif}
              className={`rounded-full px-3 py-1.5 text-[13px] transition ${
                surAccueil
                  ? actif
                    ? "border-2 border-[#0e7490] bg-[#0e7490]/10 text-[#0e7490]"
                    : "border-2 border-[#1d1c16]/25 bg-white/70 text-[#1d1c16]/80 hover:border-[#1d1c16]/60"
                  : actif
                    ? "border border-teal-700 bg-teal-50 text-teal-900"
                    : "border border-slate-300 bg-white text-slate-600 hover:border-slate-500"
              }`}
            >
              {c.label}
            </button>
          );
        })}
        {toutesLesChips.length > CHIPS_VISIBLES && (
          <button
            type="button"
            onClick={() => setPlusDOptions((v) => !v)}
            className={`rounded-full px-3 py-1.5 text-[13px] underline underline-offset-2 transition ${
              surAccueil ? "text-[#1d1c16]/60 hover:text-[#1d1c16]" : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {plusDOptions
              ? "Moins d'options"
              : `Plus d'options (${toutesLesChips.length - CHIPS_VISIBLES})`}
          </button>
        )}
      </div>

      {/* ── Ce qu'on a trouvé ───────────────────────────────────────────── */}
      {resultat && (
        <div className={surAccueil ? "mt-5" : "mt-10"} aria-live="polite">
          {/* Quand NI notion NI intention n'ont été lues, on n'a rien compris —
              et écrire « Ce que j'ai compris : 4e » au-dessus de trois ressources
              choisies au niveau seul serait un mensonge poli. On le dit, et les
              ressources deviennent une proposition de départ, pas une réponse.
              (Vu le 05/08 sur une frappe au hasard : « df » ressortait avec
              trois recommandations et l'air de les avoir méritées.) */}
          {!resultat.lecture.notionId && !resultat.lecture.intention && !matiereChoisie ? (
            <p className="mb-2 text-xs text-[#1d1c16]/55">
              Je n&apos;ai pas bien compris la demande — voici par où{" "}
              {p.tutoie ? "tu peux" : "vous pouvez"} commencer en{" "}
              <span className="text-[#1d1c16]">{p.label}</span>.
            </p>
          ) : (
            <p className="mb-2 text-xs text-[#1d1c16]/55">
              Ce que j&apos;ai compris :{" "}
              <span className="text-[#1d1c16]">
                {[
                  p.label,
                  matiereChoisie,
                  resultat.lecture.intention ? libelleIntention(resultat.lecture.intention) : null,
                  resultat.lecture.notionLabel,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </span>
            </p>
          )}

          {resultat.lecture.intention === "humain" ? (
            // Chercher quelqu'un, ce n'est pas chercher une ressource. On n'a
            // pas d'annuaire — on le dit, et on ouvre la porte qui existe.
            <div className="border-2 border-[#1d1c16] bg-white p-4">
              <p className="text-sm text-[#1d1c16]">
                {p.tutoie ? "Tu cherches" : "Vous cherchez"} quelqu&apos;un, pas un exercice.
              </p>
              <p className="mt-2 text-sm text-[#1d1c16]/70">
                EleveAI n&apos;a pas encore d&apos;annuaire de professeurs — je ne vais pas{" "}
                {p.tutoie ? "te" : "vous"} faire croire le contraire. En attendant, c&apos;est un
                vrai enseignant qui lit les messages.
              </p>
              <Link
                href="/contact?from=ia"
                prefetch={false}
                onClick={() => track("ia_ressource", { id: "contact-humain", rang: 1, profil })}
                className="mt-3 inline-block border-2 border-[#1d1c16] bg-[#1d1c16] px-3 py-1.5 text-sm font-bold text-[#f5fafb] hover:bg-[#0e7490] hover:border-[#0e7490]"
              >
                Écrire à un enseignant
              </Link>
            </div>
          ) : resultat.recommandations.length === 0 ? (
            <div className="border-2 border-[#1d1c16] bg-white p-4">
              <p className="text-sm text-[#1d1c16]">
                Je n&apos;ai rien de vérifié à {p.tutoie ? "te" : "vous"} proposer là-dessus pour{" "}
                {p.label}.
              </p>
              <p className="mt-2 text-sm text-[#1d1c16]/70">
                C&apos;est noté — c&apos;est comme ça qu&apos;on sait quoi construire ensuite.
                Essaie de le dire autrement, ou choisis une entrée ci-dessus.
              </p>
              {resultat.lecture.motsInconnus.length > 0 && (
                <p className="mt-2 text-xs text-[#1d1c16]/45">
                  Mots que je n&apos;ai pas reconnus : {resultat.lecture.motsInconnus.join(", ")}
                </p>
              )}
            </div>
          ) : (
            <ul className={surAccueil ? "grid gap-2 sm:grid-cols-3" : "space-y-3"}>
              {resultat.recommandations.map((r, i) => (
                <li key={r.ressource.id}>
                  <Link
                    // Une ressource externe s'ouvre dans un nouvel onglet et ne
                    // porte pas `?from=ia` : ce paramètre ne sert qu'à notre
                    // suivi interne, et on ne renvoie personne d'un clic hors
                    // du site sans qu'il puisse revenir.
                    href={
                      r.ressource.externe
                        ? r.url
                        : `${r.url}${r.url.includes("?") ? "&" : "?"}from=ia`
                    }
                    target={r.ressource.externe ? "_blank" : undefined}
                    rel={r.ressource.externe ? "noopener noreferrer" : undefined}
                    // ⚠️ PAS DE PRÉCHARGEMENT. Un <Link> d'App Router va
                    // chercher la charge RSC de sa destination dès qu'il entre
                    // dans le champ de vision, et sur une route statique c'est
                    // une LECTURE du cache durable — le quota ISR Reads du
                    // compte. Ces cartes changent à chaque question : les
                    // laisser précharger ferait payer des destinations que
                    // personne n'ouvre.
                    prefetch={false}
                    onClick={() => track("ia_ressource", { id: r.ressource.id, rang: i + 1, profil })}
                    className={`block h-full border-2 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#1d1c16] ${
                      i === 0 ? "border-[#0e7490]" : "border-[#1d1c16]/30"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-bold text-[#1d1c16]">{r.ressource.titre}</p>
                      <span
                        className={`shrink-0 whitespace-nowrap px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                          r.ressource.statut === "testee_eleves"
                            ? "bg-[#3f6b0c]/12 text-[#3f6b0c]"
                            : "bg-[#0e7490]/12 text-[#0e7490]"
                        }`}
                      >
                        {r.ressource.statut === "testee_eleves" ? "testée en classe" : "vérifiée"}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-[#1d1c16]/75">{r.ressource.promesse}</p>
                    <p className="mt-2 text-xs text-[#1d1c16]/50">
                      {r.ciblee && resultat.lecture.notionLabel ? (
                        <span className="text-[#0e7490]">
                          s&apos;ouvre sur {resultat.lecture.notionLabel} —{" "}
                        </span>
                      ) : null}
                      {r.raison}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* ── Tes dernières demandes (seulement sur /ia) ──────────────────── */}
      {!surAccueil && historique.length > 0 && (
        <div className="mt-12 border-t border-slate-200 pt-6">
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
        </div>
      )}
    </section>
  );
}
