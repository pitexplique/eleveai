"use client";

// Les CARTES DE CONNEXION d'une classe, à imprimer et découper : 10 par A4.
// Chaque carte porte le code de la classe, le code de l'élève, son mot de
// passe et un QR qui ouvre /auth/signin déjà rempli — il ne reste que le mot
// de passe à taper. Page sans habillage (components/MasqueSurEmbed.tsx).

import Link from "next/link";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useEleve } from "@/context/EleveContext";

type Carte = { code_utilisateur: string; nom: string | null; mot_de_passe: string | null };
export type Classe = {
  etablissement: string;
  nom_classe: string;
  code_etablissement: string;
  eleves: Carte[];
};

export default function CartesClient() {
  const { eleve: user } = useEleve();
  const [classe, setClasse] = useState<Classe | null>(null);
  const [erreur, setErreur] = useState<string | null>(null);
  const [origine, setOrigine] = useState("https://eleveai.fr");

  useEffect(() => {
    setOrigine(window.location.origin);
    const code = new URLSearchParams(window.location.search).get("code")?.toUpperCase() ?? "";
    if (!user?.token) return;
    fetch("/api/prof/classes", { headers: { Authorization: `Bearer ${user.token}` } })
      .then((r) => r.json())
      .then((d) => {
        if (!d?.ok) return setErreur(d?.error ?? "Impossible de charger la classe.");
        const c = (d.classes ?? []).find((x: Classe) => x.code_etablissement === code);
        if (!c) return setErreur("Classe introuvable.");
        setClasse(c);
      })
      .catch(() => setErreur("Impossible de charger la classe."));
  }, [user?.token]);

  const [pdfEnCours, setPdfEnCours] = useState(false);
  const [erreurPdf, setErreurPdf] = useState<string | null>(null);

  async function telecharger() {
    if (!user?.token || !classe) return;
    setPdfEnCours(true);
    setErreurPdf(null);
    try {
      const res = await fetch(
        `/api/prof/classes/cartes-pdf?code=${encodeURIComponent(classe.code_etablissement)}`,
        { headers: { Authorization: `Bearer ${user.token}` } },
      );
      if (!res.ok) throw new Error();
      const url = URL.createObjectURL(await res.blob());
      const a = document.createElement("a");
      a.href = url;
      a.download = `cartes-eleveai-${classe.nom_classe}-${classe.code_etablissement}.pdf`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 10_000);
    } catch {
      setErreurPdf("Le PDF n'a pas pu être fabriqué. Réessaie, ou utilise « Imprimer ».");
    } finally {
      setPdfEnCours(false);
    }
  }

  if (!user) {
    return <p className="p-8">Connecte-toi pour imprimer les cartes de ta classe.</p>;
  }
  if (erreur) return <p className="p-8 text-red-700">{erreur}</p>;
  if (!classe) return <p className="p-8 text-slate-500">Chargement…</p>;

  return (
    <main className="mx-auto max-w-[21cm] bg-white p-4 text-slate-950 print:p-0">
      {/* ⛔ 27/10/2026 — Frédéric : « où sont code établissement, code utilisateur
          et mot de passe ? non affichés lorsque je fais imprimer ». Les valeurs
          prenaient la couleur claire du site (fond sombre) : invisibles sur le
          papier blanc. Tout est forcé en noir ici. */}
      <div className="mb-4 flex items-center gap-3 print:hidden">
        <Link href="/prof/classes" className="text-sm font-semibold text-slate-600 hover:underline">
          ← Mes classes
        </Link>
        {/* ⭐ 28/10 « Télécharger en PDF » (Frédéric : « plus simple que
            imprimer en PDF ») : un clic, le fichier arrive. Le PDF est
            fabriqué par le serveur (lib/server/cartesPdf.ts). */}
        <button
          onClick={telecharger}
          disabled={pdfEnCours}
          className="ml-auto flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-500 disabled:cursor-wait"
        >
          {pdfEnCours && (
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.3" strokeWidth="4" />
              <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
          )}
          {pdfEnCours ? "Préparation du PDF…" : "📄 Télécharger en PDF"}
        </button>
        <button
          onClick={() => window.print()}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-slate-700"
        >
          🖨️ Imprimer
        </button>
      </div>
      {erreurPdf && <p className="mb-4 text-sm text-red-700 print:hidden">{erreurPdf}</p>}

      <PlancheCartes classe={classe} origine={origine} />
    </main>
  );
}

// La planche elle-même (séparée le 27/10/2026 pour pouvoir l'imprimer en test
// sans compte prof : scripts de contrôle de l'impression).
export function PlancheCartes({ classe, origine }: { classe: Classe; origine: string }) {
  const adresse = origine.replace(/^https?:\/\//, "");
  return (
        <div className="grid grid-cols-2 gap-0">
          {classe.eleves.map((e) => {
            const lien = `${origine}/auth/signin?etab=${encodeURIComponent(classe.code_etablissement)}&code=${encodeURIComponent(e.code_utilisateur)}`;
            const prenom = e.nom && !/^Élève \d+$/.test(e.nom) ? e.nom : null;
            return (
              <div
                key={e.code_utilisateur}
                className="flex h-[5.4cm] break-inside-avoid items-center gap-3 border border-dashed border-slate-400 p-3"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                    EleveAI · {classe.nom_classe}
                  </p>
                  <p className="truncate text-sm font-black text-slate-900">{prenom ?? " "}</p>
                  <dl className="mt-1 space-y-0.5 text-sm">
                    <div className="flex gap-2">
                      <dt className="w-24 text-slate-500">Établissement</dt>
                      <dd className="font-mono text-lg font-black text-slate-950">{classe.code_etablissement}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="w-24 text-slate-500">Mon code</dt>
                      <dd className="font-mono text-lg font-black text-slate-950">{e.code_utilisateur}</dd>
                    </div>
                    <div className="flex gap-2">
                      <dt className="w-24 text-slate-500">Mot de passe</dt>
                      <dd className="font-mono text-lg font-black text-slate-950">{e.mot_de_passe}</dd>
                    </div>
                  </dl>
                  <p className="mt-1 text-[10px] text-slate-500">{adresse} → Se connecter</p>
                </div>
                <QRCodeSVG value={lien} size={92} level="M" />
              </div>
            );
          })}
        </div>
  );
}
