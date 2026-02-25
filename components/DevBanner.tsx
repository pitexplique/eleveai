"use client";

import { useEffect, useState } from "react";
import { X, Image as ImageIcon, ShieldCheck } from "lucide-react";

type DevBannerProps = {
  message?: string;
  storageKey?: string;
  className?: string;
};

export default function DevBanner({
  message = "Valeria : optimisation mesurable de prompts IA (/20) avec supervision humaine, traçabilité et amélioration continue (inspiré ISO/IEC 42001).",
  storageKey = "eleveai_dev_banner_closed_v3",
  className = "",
}: DevBannerProps) {
  const [open, setOpen] = useState(false);
  const [showImage, setShowImage] = useState(false);

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
            <p className="text-sm leading-snug font-medium tracking-wide">
              {message}
            </p>
          </div>

          <div className="flex items-center gap-1">
            {/* Bouton image */}
            <button
              type="button"
              onClick={() => setShowImage((v) => !v)}
              className="inline-flex h-8 items-center gap-1 rounded-full px-2 text-xs font-semibold
                         hover:bg-slate-800 active:bg-slate-700 transition"
              aria-label="Afficher la notation"
              title="Voir le détail"
            >
              <ImageIcon className="h-4 w-4" />
              Détail
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

        {/* Image */}
        {showImage && (
          <div className="pt-2">
            <img
              src="/notationgpt.png"
              alt="Détail de la notation IA"
              className="max-h-[240px] rounded-md border border-slate-700 shadow-sm"
            />
          </div>
        )}
      </div>
    </div>
  );
}

