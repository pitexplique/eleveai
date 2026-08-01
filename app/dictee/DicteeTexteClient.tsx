"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";

import { saveResultat } from "@/lib/resultats";
import { useEleve } from "@/context/EleveContext";
import {
  TEXTES,
  corriger,
  textesPourNiveau,
  type NiveauDictee,
  type TexteDictee,
} from "@/lib/dictee-texte/textes";

const PAPER = "#f6f1e4";
const INK = "#1d1c16";

const NIVEAUX: { slug: NiveauDictee; label: string }[] = [
  { slug: "cm2", label: "CM2" },
  { slug: "6e", label: "6ᵉ" },
  { slug: "5e", label: "5ᵉ" },
  { slug: "4e", label: "4ᵉ" },
  { slug: "3e", label: "3ᵉ" },
];

/**
 * Lecture par la synthèse vocale du navigateur — comme la dictée du jour, donc
 * aucun mp3 à produire. Débit ralenti : on dicte, on ne récite pas.
 */
function lire(texte: string, vitesse = 0.75) {
  if (typeof window === "undefined" || !window.speechSynthesis) return false;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(texte);
  u.lang = "fr-FR";
  u.rate = vitesse;
  window.speechSynthesis.speak(u);
  return true;
}

export default function DicteeTexteClient() {
  const { eleve } = useEleve();
  const [niveau, setNiveau] = useState<NiveauDictee>("cm2");
  const [texte, setTexte] = useState<TexteDictee | null>(null);
  const [saisies, setSaisies] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [corrige, setCorrige] = useState(false);
  const [sansVoix, setSansVoix] = useState(false);
  const [enregistrement, setEnregistrement] = useState<string | null>(null);
  const zoneRef = useRef<HTMLTextAreaElement | null>(null);

  const disponibles = useMemo(() => textesPourNiveau(niveau), [niveau]);

  const bilan = useMemo(() => {
    if (!texte || !corrige) return null;
    const lignes = texte.segments.map((s, i) => corriger(s, saisies[i] ?? ""));
    const mots = lignes.flat();
    const justes = mots.filter((m) => m.juste).length;
    return { lignes, justes, total: mots.filter((m) => m.attendu).length };
  }, [texte, corrige, saisies]);

  function demarrer(t: TexteDictee) {
    setTexte(t);
    setSaisies(Array(t.segments.length).fill(""));
    setIndex(0);
    setCorrige(false);
    setEnregistrement(null);
    setSansVoix(!lire(t.segments[0]));
  }

  function terminer() {
    setCorrige(true);
    if (!texte) return;
    const lignes = texte.segments.map((s, i) => corriger(s, saisies[i] ?? ""));
    const mots = lignes.flat();
    const justes = mots.filter((m) => m.juste).length;
    const total = mots.filter((m) => m.attendu).length;

    if (!eleve?.token) {
      setEnregistrement("non-connecte");
      return;
    }
    saveResultat(eleve, "dictee", {
      classe: niveau,
      score: justes,
      total,
      details: {
        texte: texte.id,
        titre: texte.titre,
        auteur: texte.auteur,
        // Les mots ratés, pour que le professeur voie sur quoi ça bute.
        rates: mots
          .filter((m) => !m.juste && m.attendu)
          .map((m) => ({ attendu: m.attendu, ecrit: m.ecrit })),
      },
    }).then(({ error }) => setEnregistrement(error ? error.message : "ok"));
  }

  return (
    <main
      className="min-h-screen px-4 pb-16 pt-8 sm:px-6 lg:px-8"
      style={{ backgroundColor: PAPER, color: INK }}
    >
      <div className="mx-auto max-w-3xl">
        <Link
          href="/accueil"
          className="text-[11px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55 hover:text-cyan-800"
        >
          ← Le journal
        </Link>

        <header className="mt-3 border-b-4 border-double border-[#1d1c16] pb-5">
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-cyan-800">
            ✍️ La dictée
          </p>
          <h1 className="mt-1 font-serif text-4xl font-black leading-none tracking-tight sm:text-5xl">
            On écoute, on écrit, on compare
          </h1>
          <p className="mt-3 max-w-2xl text-sm font-medium leading-6 text-[#1d1c16]/70">
            Chaque groupe de mots se réécoute autant de fois que tu veux. Ce
            n&apos;est pas un contrôle : personne ne te chronomètre, et la
            correction te montre chaque mot, pas une note.
          </p>
        </header>

        {/* ══ CHOISIR ══════════════════════════════════════════════════════ */}
        {!texte && (
          <>
            <div className="mt-5 flex flex-wrap items-center gap-1.5">
              <span className="mr-1 text-[11px] font-black uppercase tracking-[0.16em] text-[#1d1c16]/55">
                🎓 Ta classe :
              </span>
              {NIVEAUX.map((n) => (
                <button
                  key={n.slug}
                  type="button"
                  onClick={() => setNiveau(n.slug)}
                  aria-pressed={niveau === n.slug}
                  className={`rounded-sm border px-2.5 py-1 text-xs font-black transition ${
                    niveau === n.slug
                      ? "border-[#1d1c16] bg-[#1d1c16] text-[#f6f1e4]"
                      : "border-[#1d1c16]/25 text-[#1d1c16]/70 hover:border-[#1d1c16]"
                  }`}
                >
                  {n.label}
                </button>
              ))}
            </div>

            <div className="mt-5 space-y-4">
              {disponibles.map((t) => (
                <div key={t.id} className="border-2 border-[#1d1c16] p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">
                    {t.auteur}
                  </p>
                  <p className="mt-1 font-serif text-xl font-black leading-tight">
                    {t.titre}
                  </p>
                  <p className="mt-1 text-sm font-medium leading-6 text-[#1d1c16]/70">
                    <span className="font-black text-[#1d1c16]">
                      Ce qui piège :
                    </span>{" "}
                    {t.pieges}
                  </p>
                  <p className="mt-1 text-[11px] font-medium italic text-[#1d1c16]/55">
                    {t.source} · {t.segments.length} groupes de mots
                  </p>
                  <button
                    type="button"
                    onClick={() => demarrer(t)}
                    className="mt-3 inline-flex items-center gap-2 rounded-sm bg-cyan-800 px-5 py-2.5 text-sm font-black text-[#f0fafc] transition hover:bg-[#1d1c16]"
                  >
                    Commencer cette dictée →
                  </button>
                </div>
              ))}
            </div>

            <p className="mt-6 border-t border-[#1d1c16]/25 pt-3 text-xs font-medium italic leading-5 text-[#1d1c16]/70">
              Les textes sont de Jean de La Fontaine, mort en 1695 : ils
              appartiennent à tout le monde. {TEXTES.length} dictées pour
              l&apos;instant — d&apos;autres auteurs viendront.
            </p>
          </>
        )}

        {/* ══ DICTER ═══════════════════════════════════════════════════════ */}
        {texte && !corrige && (
          <>
            <div className="mt-5 flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-[#1d1c16] pb-2">
              <p className="font-serif text-lg font-black leading-tight">
                {texte.titre}{" "}
                <span className="text-sm font-medium italic text-[#1d1c16]/70">
                  — {texte.auteur}
                </span>
              </p>
              <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">
                Groupe {index + 1} / {texte.segments.length}
              </p>
            </div>

            {sansVoix && (
              <p className="mt-3 border-l-4 border-red-800 pl-3 text-sm font-medium leading-6 text-[#1d1c16]/70">
                Ton navigateur ne sait pas lire à voix haute. Tu peux quand même
                t&apos;entraîner en demandant à quelqu&apos;un de te dicter le
                texte.
              </p>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSansVoix(!lire(texte.segments[index]))}
                className="inline-flex items-center gap-2 rounded-sm bg-cyan-800 px-5 py-2.5 text-sm font-black text-[#f0fafc] transition hover:bg-[#1d1c16]"
              >
                🔊 Écouter ce groupe
              </button>
              <button
                type="button"
                onClick={() => setSansVoix(!lire(texte.segments[index], 0.5))}
                className="inline-flex items-center gap-2 rounded-sm border-2 border-cyan-800 px-4 py-2.5 text-sm font-black text-cyan-800 transition hover:bg-cyan-800 hover:text-[#f0fafc]"
              >
                🐢 Plus lentement
              </button>
            </div>

            <textarea
              ref={zoneRef}
              value={saisies[index] ?? ""}
              onChange={(e) => {
                const s = [...saisies];
                s[index] = e.target.value;
                setSaisies(s);
              }}
              rows={2}
              placeholder="Écris ce que tu entends…"
              className="mt-4 w-full border-2 border-[#1d1c16] bg-white p-3 font-serif text-lg leading-8 outline-none focus:border-cyan-800"
            />

            <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-[#1d1c16]/25 pt-4">
              {index + 1 < texte.segments.length ? (
                <button
                  type="button"
                  onClick={() => {
                    const suivant = index + 1;
                    setIndex(suivant);
                    setSansVoix(!lire(texte.segments[suivant]));
                    zoneRef.current?.focus();
                  }}
                  className="inline-flex items-center gap-2 rounded-sm bg-cyan-800 px-5 py-2.5 text-sm font-black text-[#f0fafc] transition hover:bg-[#1d1c16]"
                >
                  Groupe suivant →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={terminer}
                  className="inline-flex items-center gap-2 rounded-sm bg-cyan-800 px-5 py-2.5 text-sm font-black text-[#f0fafc] transition hover:bg-[#1d1c16]"
                >
                  Corriger ma dictée →
                </button>
              )}
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    const p = index - 1;
                    setIndex(p);
                    setSansVoix(!lire(texte.segments[p]));
                  }}
                  className="text-sm font-black text-cyan-800 hover:underline"
                >
                  ← Revenir au groupe précédent
                </button>
              )}
            </div>

            {/* Ici on PEUT revenir en arrière — contrairement à l'épreuve
                blanche. Une dictée de classe se relit avant d'être rendue. */}
            <p className="mt-3 text-xs font-medium italic text-[#1d1c16]/70">
              Tu peux revenir en arrière et te réécouter autant de fois que tu
              veux : c&apos;est ce qu&apos;on fait en classe avant de rendre.
            </p>
          </>
        )}

        {/* ══ CORRIGER ═════════════════════════════════════════════════════ */}
        {texte && corrige && bilan && (
          <>
            <div className="mt-5 border-y-2 border-[#1d1c16] py-3">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">
                {texte.titre} — {texte.auteur}
              </p>
              <p className="mt-1 font-serif text-3xl font-black leading-none text-cyan-800">
                {bilan.justes} mots justes sur {bilan.total}
              </p>
              <p className="mt-2 text-sm font-medium leading-6 text-[#1d1c16]/70">
                Chaque mot est comparé au texte de l&apos;auteur. Les accents
                comptent — c&apos;est le principe d&apos;une dictée.
              </p>
              {enregistrement === "ok" && (
                <p className="mt-2 text-xs font-black uppercase tracking-[0.14em] text-cyan-800">
                  ✅ Résultat enregistré
                </p>
              )}
              {enregistrement === "non-connecte" && (
                <p className="mt-2 text-sm font-medium leading-6 text-[#1d1c16]/70">
                  Tu n&apos;es pas connecté : ce résultat ne sera pas gardé.{" "}
                  <Link
                    href="/auth/signin-eleve"
                    className="font-black text-cyan-800 underline underline-offset-2"
                  >
                    Se connecter
                  </Link>
                  .
                </p>
              )}
            </div>

            <div className="mt-5 space-y-4">
              {bilan.lignes.map((ligne, i) => (
                <div key={i} className="border-t border-[#1d1c16]/25 pt-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1d1c16]/55">
                    Groupe {i + 1}
                  </p>
                  <p className="mt-1 font-serif text-lg leading-8">
                    {ligne.map((m, k) => (
                      <span key={k}>
                        {/* L'espace après chaque groupe est EXPLICITE : la
                            marge CSS se voyait à l'écran mais disparaissait à
                            la copie et pour un lecteur d'écran, qui lisait
                            « Maître Corbeau » collé en un seul mot. */}
                        {m.juste ? (
                          <span>{m.attendu} </span>
                        ) : m.attendu ? (
                          <>
                            <span className="whitespace-nowrap">
                              <span className="bg-red-100 px-1 line-through decoration-red-800/60">
                                {m.ecrit ?? "—"}
                              </span>{" "}
                              <span className="font-black text-cyan-800">
                                {m.attendu}
                              </span>
                            </span>{" "}
                          </>
                        ) : (
                          <>
                            <span className="bg-red-100 px-1 line-through decoration-red-800/60">
                              {m.ecrit}
                            </span>{" "}
                          </>
                        )}
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3 border-t-2 border-[#1d1c16] pt-4">
              <button
                type="button"
                onClick={() => demarrer(texte)}
                className="inline-flex items-center gap-2 rounded-sm bg-cyan-800 px-5 py-2.5 text-sm font-black text-[#f0fafc] transition hover:bg-[#1d1c16]"
              >
                Refaire cette dictée →
              </button>
              <button
                type="button"
                onClick={() => {
                  setTexte(null);
                  setCorrige(false);
                }}
                className="inline-flex items-center gap-2 rounded-sm border-2 border-cyan-800 px-5 py-2.5 text-sm font-black text-cyan-800 transition hover:bg-cyan-800 hover:text-[#f0fafc]"
              >
                Choisir une autre dictée →
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
