"use client";

// LES DÉFIS DES MACHINES « DANS TA MAIN » — le composant partagé.
// Règle éditoriale (Frédéric, 18/07) : CHAQUE simulateur intègre ses défis.
// Le principe qui fait tout : les nombres des questions sont DIFFÉRENTS du
// curseur — la réponse n'est pas affichée à l'écran, mais l'élève peut
// RÉGLER LA MACHINE pour vérifier lui-même (la machine = l'outil de
// correction). Rappel actif, indice après erreur (jamais la réponse),
// correction repliable façon fiches.
//
// À terme (vision « Comprendre son île ») : ces défis compteront dans
// l'évaluation de l'élève — garder les ids stables.

import { useState } from "react";

export type DefiSimulateur = {
  id: string;
  question: string;
  reponse: number;
  unite: string;
  indice: string;
  calcul: string;
  /** Marge d'erreur acceptée (± ; défaut 0,5 pour les valeurs exactes). */
  tolerance?: number;
};

/** La palette suit chaque machine (fromagerie bleue, usine ambre, vigie cyan). */
export type CouleursDefis = {
  fond: string;        // fond des cartes
  fondProfond: string; // fond des champs de saisie
  bord: string;        // bordures
  accent: string;      // numéro du défi, bouton Vérifier, calcul
  texte: string;       // texte principal
  sousTexte: string;   // légendes
  ok: string;          // bonne réponse
  rate: string;        // indice après erreur
};

// « 1 200 », « 1200 », « 2 000,0 »... → nombre (espaces fines comprises).
function lireReponse(brut: string): number | null {
  const n = parseFloat(brut.replace(/[\s  ]/g, "").replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

function DefiCard({
  numero,
  defi,
  c,
}: {
  numero: number;
  defi: DefiSimulateur;
  c: CouleursDefis;
}) {
  const [saisie, setSaisie] = useState("");
  const [statut, setStatut] = useState<"attente" | "bon" | "rate">("attente");

  const verifier = () => {
    const n = lireReponse(saisie);
    if (n === null) return;
    setStatut(Math.abs(n - defi.reponse) <= (defi.tolerance ?? 0.5) ? "bon" : "rate");
  };

  return (
    <div className="rounded border px-3 py-2.5" style={{ borderColor: c.bord, backgroundColor: c.fond }}>
      <p className="text-[11px] font-black uppercase tracking-[0.14em]" style={{ color: c.accent }}>
        Défi {numero}
      </p>
      <p className="mt-1 text-[13px] leading-5" style={{ color: c.texte }}>{defi.question}</p>
      <form
        className="mt-2 flex flex-wrap items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          verifier();
        }}
      >
        <input
          type="text"
          inputMode="decimal"
          value={saisie}
          onChange={(e) => {
            setSaisie(e.target.value);
            setStatut("attente");
          }}
          placeholder="Ta réponse"
          aria-label={`Réponse au défi ${numero}, en ${defi.unite}`}
          className="w-32 rounded border px-2.5 py-1.5 font-mono text-sm outline-none"
          style={{ borderColor: c.bord, backgroundColor: c.fondProfond, color: c.texte }}
        />
        <span className="font-mono text-[11px]" style={{ color: c.sousTexte }}>{defi.unite}</span>
        <button
          type="submit"
          className="rounded px-3 py-1.5 text-[12px] font-bold hover:brightness-110"
          style={{ backgroundColor: c.accent, color: c.fondProfond }}
        >
          Vérifier
        </button>
      </form>
      {statut === "bon" && (
        <p className="mt-2 text-[12.5px] font-semibold leading-5" style={{ color: c.ok }}>
          ✅ C&apos;est ça. {defi.calcul}
        </p>
      )}
      {statut === "rate" && (
        <p className="mt-2 text-[12.5px] leading-5" style={{ color: c.rate }}>
          Pas encore — indice : {defi.indice}
        </p>
      )}
      <details className="mt-1.5">
        <summary className="cursor-pointer text-[11.5px] font-semibold hover:brightness-125" style={{ color: c.sousTexte }}>
          Voir le calcul
        </summary>
        <p
          className="mt-1 rounded border border-dashed px-2.5 py-1.5 font-mono text-[12px] leading-relaxed"
          style={{ borderColor: c.accent + "66", color: c.accent }}
        >
          {defi.calcul}
        </p>
      </details>
    </div>
  );
}

export default function DefisSimulateur({
  titre,
  coupDePouce,
  defis,
  couleurs,
}: {
  titre: string;
  coupDePouce: string;
  defis: DefiSimulateur[];
  couleurs: CouleursDefis;
}) {
  return (
    <div className="mt-4 rounded border p-4" style={{ borderColor: couleurs.bord, backgroundColor: couleurs.fond }}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: couleurs.accent }}>
          🎯 {titre}
        </p>
        <p className="text-[11.5px]" style={{ color: couleurs.sousTexte }}>{coupDePouce}</p>
      </div>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {defis.map((d, i) => (
          <DefiCard key={d.id} numero={i + 1} defi={d} c={couleurs} />
        ))}
      </div>
    </div>
  );
}
