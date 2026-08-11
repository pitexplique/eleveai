"use client";

// LE MODE PRÉSENTATION — pour un principal qui projette devant son équipe.
//
// ⚠️ CE N'EST PAS LA MÊME PAGE EN PLUS GROS. Une page se lit assis, seul, en
// revenant en arrière quand on n'a pas compris. Une projection s'accompagne
// d'une voix : c'est le principal qui explique, l'écran ne fait que soutenir.
// D'où des ÉCRANS qu'on fait défiler — un écran, une idée — et non un long
// document qu'il faudrait faire défiler en parlant, en cherchant où on en est.
//
// ⛔ LES NOMS RESTENT, ET C'EST DÉLIBÉRÉ : le public, ce sont les PROFESSEURS.
// Un conseil nomme les élèves, c'est son objet même. Mais un bouton les masque
// en un clic — une porte s'ouvre, un élève entre rendre une copie, la réunion
// se poursuit dans un couloir. Devant des élèves, cette projection n'a rien à
// faire : afficher au tableau qui est en difficulté se retient toute l'année
// et n'apprend rien à personne.

import { useEffect, useState } from "react";

import { GROUPES, type GroupeMaitrise } from "@/lib/eval-nationale/moteur";

import {
  Anneau,
  COULEUR_GROUPE,
  couleurPct,
  type EleveDeLaClasse,
  type SavoirFaire,
} from "./_bilan";

const ECRANS = ["Où en est la classe", "Ce qui coince", "Ce que ça appelle"];

export default function Presentation({
  fermer,
  classe,
  matiere,
  groupe,
  etab,
  passes,
  enAttente,
  repartition,
  savoirs,
  groupeDeBesoins,
  coupes,
  simule,
  accent,
}: {
  fermer: () => void;
  classe: string;
  matiere: string;
  groupe: string;
  etab: string;
  passes: EleveDeLaClasse[];
  enAttente: EleveDeLaClasse[];
  repartition: { groupe: GroupeMaitrise; n: number }[];
  savoirs: SavoirFaire[];
  groupeDeBesoins: string[];
  coupes: number;
  simule: boolean;
  accent: string;
}) {
  const [ecran, setEcran] = useState(0);
  const [sansNoms, setSansNoms] = useState(false);
  const dernier = ECRANS.length - 1;

  // ⚠️ LE CLAVIER AVANT LA SOURIS. Un présentateur a une télécommande dans la
  // main — elle envoie flèche droite et barre d'espace, rien d'autre. Sans ça
  // il devrait revenir à l'ordinateur entre deux écrans, et personne ne
  // reprend la parole après avoir traversé la salle.
  useEffect(() => {
    function touche(e: KeyboardEvent) {
      if (e.key === "Escape") fermer();
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        setEcran((n) => Math.min(n + 1, dernier));
      }
      if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        setEcran((n) => Math.max(n - 1, 0));
      }
    }
    window.addEventListener("keydown", touche);
    return () => window.removeEventListener("keydown", touche);
  }, [fermer, dernier]);

  const nommer = (nom: string, i: number) =>
    sansNoms ? `Élève ${i + 1}` : nom;

  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-white p-6 sm:p-10">
      {/* La barre de service : petite, grise, elle n'est pas le sujet. */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-bold text-[#1d1c16]/55">
        <span>
          {etab || "Établissement"} · {classe.replace(/e$/, "ᵉ")}
          {groupe && ` ${groupe}`} ·{" "}
          {matiere === "maths" ? "Mathématiques" : "Français"}
          {simule && " · démonstration"}
        </span>
        <span className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSansNoms((v) => !v)}
            className="rounded-lg border-2 border-[#1d1c16]/20 px-3 py-1.5 font-black hover:bg-[#1d1c16]/5"
          >
            {sansNoms ? "Afficher les noms" : "Masquer les noms"}
          </button>
          <button
            type="button"
            onClick={fermer}
            className="rounded-lg border-2 border-[#1d1c16]/20 px-3 py-1.5 font-black hover:bg-[#1d1c16]/5"
          >
            Quitter ✕
          </button>
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-center py-8">
        <p
          className="text-sm font-black uppercase tracking-[0.16em]"
          style={{ color: accent }}
        >
          {ECRANS[ecran]}
        </p>

        {/* ── 1. OÙ EN EST LA CLASSE ─────────────────────────────────────── */}
        {ecran === 0 && (
          <>
            <div className="mt-6 flex flex-wrap items-center gap-x-12 gap-y-8">
              <Anneau parts={repartition} total={passes.length} />
              <div className="flex flex-wrap gap-x-12 gap-y-6">
                {repartition.map(({ groupe: g, n }) => (
                  <div key={g}>
                    <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.1em]">
                      <span
                        aria-hidden
                        className="inline-block h-3 w-3 rounded-full"
                        style={{ backgroundColor: COULEUR_GROUPE[g] }}
                      />
                      {GROUPES[g].label}
                    </p>
                    <p className="font-serif text-6xl font-black leading-none">
                      {n}
                    </p>
                    <p className="text-sm font-medium text-[#1d1c16]/60">
                      {passes.length
                        ? Math.round((n / passes.length) * 100)
                        : 0}{" "}
                      % de ceux qui ont passé l&apos;épreuve
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {enAttente.length > 0 && (
              <p className="mt-10 text-lg font-medium text-[#1d1c16]/70">
                {enAttente.length} élève{enAttente.length > 1 ? "s" : ""} n&apos;
                {enAttente.length > 1 ? "ont" : "a"} pas encore passé
                l&apos;épreuve : ces chiffres peuvent encore bouger.
              </p>
            )}
          </>
        )}

        {/* ── 2. CE QUI COINCE ───────────────────────────────────────────── */}
        {/* Six lignes au plus. Au-delà, on ne lit plus depuis le fond d'une
            salle, et surtout on ne retient plus rien. */}
        {ecran === 1 && (
          <ul className="mt-6 space-y-4">
            {savoirs.slice(0, 6).map((sf) => (
              <li key={sf.microId} className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                <span
                  className={`inline-block rounded-lg px-3 py-1 font-serif text-3xl font-black ${couleurPct(sf.pct)}`}
                >
                  {sf.pct} %
                </span>
                <span>
                  <span className="text-2xl font-black">{sf.label}</span>
                  <span className="ml-3 text-base font-medium text-[#1d1c16]/55">
                    {sf.reussites}/{sf.sur} élèves
                  </span>
                </span>
              </li>
            ))}
            {savoirs.length === 0 && (
              <li className="text-xl font-medium text-[#1d1c16]/60">
                Pas encore assez de passages pour dégager des compétences.
              </li>
            )}
          </ul>
        )}

        {/* ── 3. CE QUE ÇA APPELLE ───────────────────────────────────────── */}
        {ecran === 2 && (
          <ul className="mt-6 space-y-7 text-2xl font-medium leading-snug">
            {groupeDeBesoins.length > 0 && (
              <li>
                <span className="font-black">Le groupe de besoins</span> —{" "}
                {groupeDeBesoins.length} élève
                {groupeDeBesoins.length > 1 ? "s" : ""}
                <span className="mt-1.5 block text-lg text-[#1d1c16]/70">
                  {groupeDeBesoins.map(nommer).join(", ")}
                </span>
              </li>
            )}
            {savoirs.length > 0 && (
              <li>
                <span className="font-black">À reprendre en priorité</span>
                <span className="mt-1.5 block text-lg text-[#1d1c16]/70">
                  {savoirs
                    .slice(0, 3)
                    .map((sf) => sf.label.toLowerCase())
                    .join(" · ")}
                </span>
              </li>
            )}
            {coupes > 0 && (
              <li>
                <span className="font-black">Le rythme</span> — {coupes} élève
                {coupes > 1 ? "s" : ""} {coupes > 1 ? "arrêtés" : "arrêté"} par
                le chrono
                <span className="mt-1.5 block text-lg text-[#1d1c16]/70">
                  Le jour J laisse moins de cinquante secondes par question.
                </span>
              </li>
            )}
            {groupeDeBesoins.length === 0 && savoirs.length === 0 && (
              <li className="text-xl text-[#1d1c16]/60">
                Rien à signaler pour l&apos;instant.
              </li>
            )}
          </ul>
        )}
      </div>

      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setEcran((n) => Math.max(n - 1, 0))}
          disabled={ecran === 0}
          className="rounded-xl border-2 border-[#1d1c16]/20 px-5 py-2.5 text-sm font-black disabled:opacity-30"
        >
          ← Précédent
        </button>
        <span className="flex gap-2" aria-hidden>
          {ECRANS.map((titre, i) => (
            <span
              key={titre}
              className="h-2.5 w-2.5 rounded-full"
              style={{
                backgroundColor: i === ecran ? accent : "rgba(29,28,22,0.18)",
              }}
            />
          ))}
        </span>
        <button
          type="button"
          onClick={() => setEcran((n) => Math.min(n + 1, dernier))}
          disabled={ecran === dernier}
          className="rounded-xl px-5 py-2.5 text-sm font-black text-white disabled:opacity-30"
          style={{ backgroundColor: accent }}
        >
          Suivant →
        </button>
      </div>
    </div>
  );
}
