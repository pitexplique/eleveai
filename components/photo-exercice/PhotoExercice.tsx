"use client";

// components/photo-exercice/PhotoExercice.tsx
//
// LA BRIQUE : une feuille d'exercices (photo ou PDF) → les chemins du coach.
//
// ⭐ 13/09/2026, Frédéric : « sur mobile l'appareil photo ou un fichier, ça
// indique les coachs ». Elle se pose telle quelle dans la colonne de gauche de
// l'accueil (256 px) et sur /photo-exercice : une seule colonne, pas de
// largeur supposée.
//
// Ce qu'elle ne fait PAS, et c'est voulu : pas d'écran de relecture, pas de
// production. La feuille de l'élève n'est pas un document dont on répond — on
// ne fabrique rien à partir d'elle, on montre où s'entraîner. Le seul garde-fou
// est côté serveur : un identifiant hors sommaire n'ouvre rien.
//
// ⚠️ La photo est compressée dans le navigateur (lib/photo-cours/compresser),
// ce qui efface au passage les coordonnées GPS. Le PDF part tel quel, plafonné.

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Camera, FileUp, Play, RotateCcw } from "lucide-react";
import { track } from "@vercel/analytics";
import { useEleve } from "@/context/EleveContext";
import { compresserPhoto } from "@/lib/photo-cours/compresser";
import { displayParamForClasse } from "@/lib/tutor-v4/displayMode";
import {
  MATIERES_PHOTO,
  classesPour,
  classeValide,
  matiereValide,
} from "@/lib/photo-exercice/catalogue";
import type { Matiere } from "@/lib/tutor-v4/catalog";
import type { ReponsePhotoExercice } from "@/app/api/photo-exercice/route";

const PDF_MAX_OCTETS = 3_000_000;

type Props = {
  /** Une clé d'entrée (« stmg-premiere ») ou une classe du coach (« stmg » + `anneeInitiale`). */
  classeInitiale?: string | null;
  anneeInitiale?: string | null;
  matiereInitiale?: string | null;
  /** Dans la colonne : titres plus petits, pas de paragraphe d'explication. */
  compact?: boolean;
};

export default function PhotoExercice({
  classeInitiale,
  anneeInitiale,
  matiereInitiale,
  compact = false,
}: Props) {
  const { eleve } = useEleve();
  const [matiere, setMatiere] = useState<Matiere>(matiereValide(matiereInitiale) ?? "maths");
  // `classe` est la CLÉ d'entrée du sélecteur (« 4e », « stmg-premiere »), pas
  // toujours la classe du coach : voir EntreeClasse dans le catalogue.
  const [classe, setClasse] = useState<string>(
    classeValide(classeInitiale, matiereValide(matiereInitiale) ?? "maths", anneeInitiale)?.cle ?? ""
  );
  const [nomFichier, setNomFichier] = useState<string | null>(null);
  const [enCours, setEnCours] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const [resultat, setResultat] = useState<ReponsePhotoExercice | null>(null);
  const [glisse, setGlisse] = useState(false);
  const entreePhoto = useRef<HTMLInputElement>(null);
  const entreeFichier = useRef<HTMLInputElement>(null);

  // Le doigt, pas le nom du système (même test que PhotoCours) : sur
  // téléphone on propose l'appareil photo ET le fichier ; sur ordinateur,
  // `capture` ouvrirait la webcam, qui ne photographie pas une feuille.
  const [surMobile, setSurMobile] = useState(false);
  useEffect(() => {
    setSurMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  // La classe du compte, si la page n'en a pas donné une. Elle arrive en
  // différé (localStorage puis /api/ma-classe). ⛔ On ne remplace jamais un
  // choix déjà fait.
  useEffect(() => {
    if (!classe && eleve?.classe) {
      const c = classeValide(eleve.classe, matiere);
      if (c) setClasse(c.cle);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eleve?.classe]);

  // Coller une capture d'écran (Ctrl+V) : le geste du bureau.
  useEffect(() => {
    function auCollage(e: ClipboardEvent) {
      const f = [...(e.clipboardData?.files ?? [])].find(
        (x) => x.type.startsWith("image/") || x.type === "application/pdf"
      );
      if (f) {
        e.preventDefault();
        void envoyer(f);
      }
    }
    window.addEventListener("paste", auCollage);
    return () => window.removeEventListener("paste", auCollage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [classe, matiere]);

  function changerMatiere(m: Matiere) {
    setMatiere(m);
    // Une classe qui n'existe pas dans la nouvelle matière se vide plutôt que
    // de rester affichée pour rien.
    if (classe && !classeValide(classe, m)) setClasse("");
    setResultat(null);
  }

  async function envoyer(fichier: File) {
    setErreur(null);
    setResultat(null);
    if (!classe) {
      setErreur("Choisis d'abord ta classe : le coach n'a pas les mêmes séries en 5e et en 4e.");
      return;
    }
    setNomFichier(fichier.name);
    setEnCours(true);
    try {
      const corps: Record<string, string> = { classe, matiere };
      let type: "image" | "pdf";
      if (fichier.type === "application/pdf") {
        if (fichier.size > PDF_MAX_OCTETS) throw new Error("Ce PDF dépasse 3 Mo. Photographie plutôt la page.");
        corps.pdf = await lireEnDataUri(fichier);
        type = "pdf";
      } else if (fichier.type.startsWith("image/")) {
        corps.image = (await compresserPhoto(fichier)).dataUri;
        type = "image";
      } else {
        throw new Error("Il faut une photo ou un PDF.");
      }

      const r = await fetch("/api/photo-exercice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(corps),
      });
      const data = (await r.json().catch(() => ({}))) as Partial<ReponsePhotoExercice> & { error?: string };
      if (!r.ok || !data.exercices) throw new Error(data.error || "Impossible de lire cette feuille.");

      const rep = data as ReponsePhotoExercice;
      setResultat(rep);
      // Ce qui se mesure : d'où ça part, et si ça ouvre quelque chose. La
      // feuille, elle, ne part nulle part.
      track("photo_exercice", {
        classe,
        matiere,
        type,
        reconnus: rep.exercices.length,
        horsCatalogue: rep.horsCatalogue.length,
        depuis: compact ? "colonne" : "page",
      });
    } catch (e) {
      setErreur(e instanceof Error ? e.message : "Impossible de lire cette feuille.");
    } finally {
      setEnCours(false);
      if (entreePhoto.current) entreePhoto.current.value = "";
      if (entreeFichier.current) entreeFichier.current.value = "";
    }
  }

  function recommencer() {
    setResultat(null);
    setErreur(null);
    setNomFichier(null);
  }

  const classes = classesPour(matiere);
  const titre = compact ? "text-sm" : "text-base";
  const bouton =
    "flex w-full items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-bold transition disabled:opacity-50";

  return (
    <section
      onDragOver={(e) => {
        e.preventDefault();
        setGlisse(true);
      }}
      onDragLeave={() => setGlisse(false)}
      onDrop={(e) => {
        e.preventDefault();
        setGlisse(false);
        const f = e.dataTransfer.files?.[0];
        if (f) void envoyer(f);
      }}
      className={[
        "rounded-2xl border bg-orange-50/60 p-3 transition",
        glisse ? "border-orange-500 bg-orange-100" : "border-orange-200",
      ].join(" ")}
      aria-busy={enCours}
    >
      <p className={`flex items-center gap-2 font-bold text-orange-900 ${titre}`}>
        <Camera className="h-5 w-5 shrink-0 text-orange-700" aria-hidden="true" />
        Photographier un exercice
      </p>
      {!compact && (
        <p className="mt-1 text-sm text-slate-600">
          Une photo ou un PDF de ta feuille d&apos;exercices, et tu vois quelles séries du coach
          s&apos;entraînent dessus. La feuille est lue, puis oubliée : rien n&apos;est conservé.
        </p>
      )}

      {/* ── Classe et matière : le coach n'a pas les mêmes séries partout ── */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <label className="block">
          <span className="sr-only">Matière</span>
          <select
            value={matiere}
            onChange={(e) => changerMatiere(e.target.value as Matiere)}
            className="w-full rounded-lg border border-slate-300 bg-white px-2 py-2 text-sm text-slate-800"
          >
            {MATIERES_PHOTO.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="sr-only">Classe</span>
          <select
            value={classe}
            onChange={(e) => {
              setClasse(e.target.value);
              setResultat(null);
            }}
            className={[
              "w-full rounded-lg border bg-white px-2 py-2 text-sm text-slate-800",
              classe ? "border-slate-300" : "border-orange-400",
            ].join(" ")}
          >
            <option value="">Ta classe…</option>
            {classes.map((c) => (
              <option key={c.cle} value={c.cle}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* ── Les entrées ─────────────────────────────────────────────────── */}
      {!resultat && (
        <div className="mt-3 flex flex-col gap-2">
          {surMobile && (
            <>
              <input
                ref={entreePhoto}
                type="file"
                accept="image/*"
                capture="environment"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void envoyer(f);
                }}
              />
              <button
                type="button"
                disabled={enCours}
                onClick={() => entreePhoto.current?.click()}
                className={`${bouton} border-orange-700 bg-orange-700 text-white hover:bg-orange-800`}
              >
                <Camera className="h-4 w-4" aria-hidden="true" />
                Prendre la feuille en photo
              </button>
            </>
          )}
          <input
            ref={entreeFichier}
            type="file"
            accept="image/*,application/pdf"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void envoyer(f);
            }}
          />
          <button
            type="button"
            disabled={enCours}
            onClick={() => entreeFichier.current?.click()}
            className={
              surMobile
                ? `${bouton} border-orange-300 bg-white text-orange-900 hover:bg-orange-100`
                : `${bouton} border-orange-700 bg-orange-700 text-white hover:bg-orange-800`
            }
          >
            <FileUp className="h-4 w-4" aria-hidden="true" />
            {surMobile ? "Un fichier ou un PDF" : "Choisir une photo ou un PDF"}
          </button>
          {!surMobile && !compact && (
            <p className="text-center text-xs text-slate-500">
              Tu peux aussi glisser le fichier ici, ou coller une capture d&apos;écran.
            </p>
          )}
          {enCours && (
            <p className="text-center text-sm text-orange-900" role="status">
              Lecture de {nomFichier ?? "la feuille"}…
            </p>
          )}
        </div>
      )}

      {erreur && (
        <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
          {erreur}
        </p>
      )}

      {/* ── Les chemins ─────────────────────────────────────────────────── */}
      {resultat && (
        <div className="mt-3">
          {resultat.remarque && (
            <p className="mb-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900">
              {resultat.remarque}
            </p>
          )}
          {resultat.exercices.length === 0 && resultat.horsCatalogue.length === 0 && (
            <p className="text-sm text-slate-700">
              Aucun exercice reconnu sur cette feuille. Essaie une photo plus nette, à plat, bien éclairée.
            </p>
          )}
          <ol className="space-y-2">
            {resultat.exercices.map((ex) => (
              <li key={`${ex.numero}-${ex.notionId}`} className="rounded-xl border border-slate-200 bg-white p-2.5">
                <p className="text-xs text-slate-500">
                  Exercice {ex.numero} · {ex.resume}
                </p>
                <Link
                  href={`/coach-ia/${resultat.matiere}?classe=${encodeURIComponent(resultat.classe)}${resultat.annee ? `&annee=${encodeURIComponent(resultat.annee)}` : ""}&notion=${encodeURIComponent(ex.notionLabel)}`}
                  prefetch={false}
                  className="mt-0.5 block text-sm font-bold text-teal-800 hover:underline"
                >
                  {ex.notionLabel}
                </Link>
                {ex.micros.length > 0 && (
                  <ul className="mt-1.5 space-y-1">
                    {ex.micros.map((m) => (
                      <li key={m.id}>
                        <Link
                          href={`/tutor-v4?classe=${encodeURIComponent(resultat.classe)}&matiere=${encodeURIComponent(resultat.matiere)}&notion=${encodeURIComponent(ex.notionId)}&microId=${encodeURIComponent(m.id)}&${displayParamForClasse(resultat.classe)}`}
                          prefetch={false}
                          className="flex items-start gap-1.5 rounded-lg px-1.5 py-1 text-sm text-slate-700 transition hover:bg-teal-50 hover:text-teal-900"
                        >
                          <Play className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-700" aria-hidden="true" />
                          <span>{m.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
          {resultat.horsCatalogue.length > 0 && (
            <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-600">
              <p className="font-bold text-slate-700">Pas de série du coach pour :</p>
              <ul className="mt-1 list-disc space-y-0.5 pl-4">
                {resultat.horsCatalogue.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>
          )}
          <button
            type="button"
            onClick={recommencer}
            className="mt-3 flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Une autre feuille
          </button>
        </div>
      )}
    </section>
  );
}

function lireEnDataUri(fichier: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const lecteur = new FileReader();
    lecteur.onload = () => resolve(String(lecteur.result));
    lecteur.onerror = () => reject(new Error("Fichier illisible."));
    lecteur.readAsDataURL(fichier);
  });
}
