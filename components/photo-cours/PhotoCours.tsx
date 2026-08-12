"use client";

// components/photo-cours/PhotoCours.tsx
//
// LA BRIQUE. Autonome : elle ne connaît que /api/photo-cours/* et le contexte
// élève. On la pose où on veut — <PhotoCours /> — sans rien câbler d'autre.
//
// Le parcours en deux temps est VOLONTAIREMENT visible : on photographie, on
// RELIT, puis on produit. Le professeur passe par l'écran de relecture même
// quand la lecture est bonne — c'est le prix d'une fiche dont il répond.

import { useState } from "react";
import { useEleve } from "@/context/EleveContext";
import { compresserPhoto } from "@/lib/photo-cours/compresser";
import { PRODUCTIONS, type LectureCours, type TypeProduction } from "@/lib/photo-cours/types";

type Etape = "photo" | "relecture" | "resultat";

export default function PhotoCours() {
  const { eleve } = useEleve();

  const [etape, setEtape] = useState<Etape>("photo");
  const [apercu, setApercu] = useState<string | null>(null);
  const [poidsKo, setPoidsKo] = useState<number | null>(null);
  const [lecture, setLecture] = useState<LectureCours | null>(null);
  const [texte, setTexte] = useState("");
  const [type, setType] = useState<TypeProduction>("exercices");
  const [precisions, setPrecisions] = useState("");
  const [latexMode, setLatexMode] = useState(false);
  const [sortie, setSortie] = useState("");
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);

  // Ouvert à tout compte connecté (12/08). La restriction par rôle se rallume
  // côté serveur dans lib/photo-cours/auth.ts, pas ici : une porte qui ne tient
  // que dans le navigateur ne tient pas.
  if (!eleve) {
    return (
      <Cadre>
        <p className="text-sm text-slate-600">
          Connectez-vous pour photographier un cours.
        </p>
      </Cadre>
    );
  }

  async function choisirPhoto(fichier: File | undefined) {
    if (!fichier) return;
    setErreur(null);
    setSortie("");
    try {
      const photo = await compresserPhoto(fichier);
      setApercu(photo.dataUri);
      setPoidsKo(photo.poidsKo);
    } catch (e) {
      setErreur(e instanceof Error ? e.message : "Photo illisible.");
    }
  }

  async function lire() {
    if (!apercu || !eleve) return;
    setEnCours(true);
    setErreur(null);
    try {
      const r = await fetch("/api/photo-cours/lire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          codeEtablissement: eleve.code_etablissement,
          codeUtilisateur: eleve.code_eleve,
          image: apercu,
        }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.error || "Lecture impossible.");
      setLecture(data.lecture);
      setTexte(data.lecture.texte);
      setEtape("relecture");
    } catch (e) {
      setErreur(e instanceof Error ? e.message : "Lecture impossible.");
    } finally {
      setEnCours(false);
    }
  }

  async function produire() {
    if (!eleve) return;
    setEnCours(true);
    setErreur(null);
    try {
      const r = await fetch("/api/photo-cours/produire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          codeEtablissement: eleve.code_etablissement,
          codeUtilisateur: eleve.code_eleve,
          texte,
          type,
          niveau: lecture?.niveau ?? "",
          notion: lecture?.notion ?? "",
          precisions,
          latexMode,
        }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.error || "Production impossible.");
      setSortie(data.output);
      setEtape("resultat");
    } catch (e) {
      setErreur(e instanceof Error ? e.message : "Production impossible.");
    } finally {
      setEnCours(false);
    }
  }

  function recommencer() {
    setEtape("photo");
    setApercu(null);
    setPoidsKo(null);
    setLecture(null);
    setTexte("");
    setSortie("");
    setPrecisions("");
    setErreur(null);
  }

  return (
    <Cadre>
      <Fil etape={etape} />

      {erreur && (
        <p className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800">
          {erreur}
        </p>
      )}

      {/* ── 1. La photo ─────────────────────────────────────────────────── */}
      {etape === "photo" && (
        <div className="space-y-4">
          <label className="block cursor-pointer rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center transition hover:border-sky-300 hover:bg-sky-50">
            <input
              type="file"
              accept="image/*"
              // Sur téléphone, ouvre directement l'appareil photo arrière :
              // le geste visé est « je photographie mon tableau », pas
              // « je cherche un fichier ».
              capture="environment"
              className="hidden"
              onChange={(e) => choisirPhoto(e.target.files?.[0])}
            />
            <span className="block text-sm font-semibold text-slate-700">
              Photographier le cours
            </span>
            <span className="mt-1 block text-xs text-slate-500">
              Le tableau, le cahier, le polycopié. Bien à plat, bien éclairé.
            </span>
          </label>

          {apercu && (
            <div className="space-y-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={apercu}
                alt="Aperçu du cours photographié"
                className="max-h-80 w-full rounded-lg border border-slate-200 object-contain"
              />
              <p className="text-xs text-slate-500">
                {poidsKo} Ko envoyés. La photo n&apos;est pas conservée : elle est
                lue, puis oubliée.
              </p>
              <Bouton onClick={lire} enCours={enCours}>
                {enCours ? "Lecture en cours…" : "Lire ce cours"}
              </Bouton>
            </div>
          )}
        </div>
      )}

      {/* ── 2. La relecture — le garde-fou ──────────────────────────────── */}
      {etape === "relecture" && lecture && (
        <div className="space-y-4">
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
            <p className="text-sm font-semibold text-amber-900">
              Relisez avant de produire.
            </p>
            <p className="mt-1 text-xs text-amber-800">
              Ce texte est ce que la machine a cru voir. Tout ce qui sera produit
              en découle — une erreur laissée ici se retrouvera dans la fiche.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <Etiquette>
              Confiance de lecture : {lecture.confiance}/100
            </Etiquette>
            {lecture.niveau && <Etiquette>Niveau : {lecture.niveau}</Etiquette>}
            {lecture.notion && <Etiquette>Notion : {lecture.notion}</Etiquette>}
          </div>

          {lecture.confiance < 60 && (
            <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-800">
              La photo est difficile à lire. Une reprise avec plus de lumière
              donnera un bien meilleur résultat qu&apos;une correction à la main.
            </p>
          )}

          {lecture.zonesIllisibles.length > 0 && (
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
              <p className="text-xs font-semibold text-slate-700">
                Passages non lus, à compléter vous-même :
              </p>
              <ul className="mt-1 list-inside list-disc text-xs text-slate-600">
                {lecture.zonesIllisibles.map((z, i) => (
                  <li key={i}>{z}</li>
                ))}
              </ul>
            </div>
          )}

          <textarea
            value={texte}
            onChange={(e) => setTexte(e.target.value)}
            rows={14}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm leading-relaxed focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-200"
          />

          <div>
            <p className="mb-2 text-sm font-semibold text-slate-700">
              À partir de ce cours, produire :
            </p>
            <div className="flex flex-wrap gap-2">
              {PRODUCTIONS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setType(p.id)}
                  title={p.aide}
                  aria-pressed={type === p.id}
                  className={[
                    "rounded-full border px-3 py-1 text-[11px] font-semibold transition",
                    type === p.id
                      ? "border-sky-200 bg-sky-100 text-sky-800"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100",
                  ].join(" ")}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-500">
              {PRODUCTIONS.find((p) => p.id === type)?.aide}
            </p>
          </div>

          <input
            type="text"
            value={precisions}
            onChange={(e) => setPrecisions(e.target.value)}
            placeholder="Une précision ? (ex. : classe difficile, 30 min, sans calculatrice)"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-200"
          />

          <label className="flex items-center gap-2 text-xs text-slate-600">
            <input
              type="checkbox"
              checked={latexMode}
              onChange={(e) => setLatexMode(e.target.checked)}
            />
            Réponse en LaTeX (pour un document ou un script Manim)
          </label>

          <div className="flex flex-wrap gap-2">
            <Bouton onClick={produire} enCours={enCours}>
              {enCours ? "Production en cours…" : "Produire"}
            </Bouton>
            <BoutonPlat onClick={recommencer}>Reprendre la photo</BoutonPlat>
          </div>
        </div>
      )}

      {/* ── 3. Le résultat ──────────────────────────────────────────────── */}
      {etape === "resultat" && (
        <div className="space-y-3">
          <pre className="max-h-[32rem] overflow-auto whitespace-pre-wrap rounded-lg border border-slate-200 bg-white px-4 py-3 font-sans text-sm leading-relaxed text-slate-800">
            {sortie}
          </pre>
          <div className="flex flex-wrap gap-2">
            <BoutonPlat onClick={() => navigator.clipboard.writeText(sortie)}>
              Copier
            </BoutonPlat>
            <BoutonPlat onClick={() => setEtape("relecture")}>
              Changer la demande
            </BoutonPlat>
            <BoutonPlat onClick={recommencer}>Un autre cours</BoutonPlat>
          </div>
        </div>
      )}
    </Cadre>
  );
}

/* ── Petites pièces ─────────────────────────────────────────────────────── */

function Cadre({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      {children}
    </div>
  );
}

function Fil({ etape }: { etape: Etape }) {
  const etapes: [Etape, string][] = [
    ["photo", "1. Photographier"],
    ["relecture", "2. Relire"],
    ["resultat", "3. Produire"],
  ];
  return (
    <div className="mb-4 flex flex-wrap gap-2 text-[11px] font-semibold">
      {etapes.map(([id, label]) => (
        <span
          key={id}
          className={[
            "rounded-full px-3 py-1",
            etape === id ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-500",
          ].join(" ")}
        >
          {label}
        </span>
      ))}
    </div>
  );
}

function Etiquette({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-600">
      {children}
    </span>
  );
}

function Bouton({
  onClick,
  enCours,
  children,
}: {
  onClick: () => void;
  enCours: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={enCours}
      className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-900 disabled:opacity-50"
    >
      {children}
    </button>
  );
}

function BoutonPlat({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
    >
      {children}
    </button>
  );
}
