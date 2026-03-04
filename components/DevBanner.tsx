"use client";

import { useEffect, useState } from "react";
import { X, Image as ImageIcon, ShieldCheck, ClipboardCheck } from "lucide-react";

type DevBannerProps = {
  message?: string;
  storageKey?: string;
  className?: string;
};

export default function DevBanner({
  message = "Valeria : qualité mesurable des ressources IA (pas seulement du prompt) — supervision humaine, traçabilité, amélioration continue (inspiré ISO/IEC 42001).",
  storageKey = "eleveai_dev_banner_closed_v4",
  className = "",
}: DevBannerProps) {
  const [open, setOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    try {
      const closed = localStorage.getItem(storageKey);
      setOpen(closed !== "1");
    } catch {
      setOpen(true);
    }
  }, [storageKey]);

  const close = () => {
    setOpen(false);
    try {
      localStorage.setItem(storageKey, "1");
    } catch {}
  };

  if (!open) return null;

  return (
    <div
      className={[
        "w-full border-b px-4 py-2",
        "bg-slate-900 text-slate-100 border-slate-800",
        className,
      ].join(" ")}
      role="status"
      aria-live="polite"
    >
      <div className="mx-auto max-w-[1400px] space-y-2">
        {/* Ligne principale */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <p className="text-sm leading-snug font-medium tracking-wide">{message}</p>
          </div>

          <div className="flex items-center gap-1">
            {/* Bouton détails */}
            <button
              type="button"
              onClick={() => setShowDetails((v) => !v)}
              className="inline-flex h-8 items-center gap-1 rounded-full px-2 text-xs font-semibold
                         hover:bg-slate-800 active:bg-slate-700 transition"
              aria-label="Afficher la grille"
              title="Voir la grille"
            >
              <ClipboardCheck className="h-4 w-4" />
              Grille
            </button>

            {/* Bouton fermer */}
            <button
              type="button"
              onClick={close}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full
                         hover:bg-slate-800 active:bg-slate-700 transition"
              aria-label="Fermer le bandeau"
              title="Fermer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Détails */}
        {showDetails && (
          <div className="pt-2 space-y-2">
            <div className="text-xs text-slate-300 leading-relaxed">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                <span>
                  Objectif : produire des ressources <span className="text-slate-100 font-semibold">exploitables en classe</span>
                  (données, tâches, traces), avec validation humaine.
                </span>
              </div>
            </div>

            {/* Image (optionnel, en attendant une UI plus riche) */}
            <img
              src="/notationgpt.png"
              alt="Grille / Détail de l'évaluation"
              className="max-h-[240px] rounded-md border border-slate-700 shadow-sm"
            />
          </div>
        )}
      </div>
    </div>
  );
}
