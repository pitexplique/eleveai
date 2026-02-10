"use client";

import { useEffect, useState } from "react";
import { X, Image as ImageIcon } from "lucide-react";

type DevBannerProps = {
  message?: string;
  storageKey?: string;
  className?: string;
};

export default function DevBanner({
  message = "🚧 Derniers prompts espace prof notés : 19:20 par chatgpt, perplexity , ... A bientôt pour le 20/20 ... du coup l'ambiance de classe s'améliore",
  storageKey = "eleveai_dev_banner_closed_v1",
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
        "bg-amber-100 text-amber-950 border-amber-200",
        className,
      ].join(" ")}
      role="status"
      aria-live="polite"
    >
      <div className="mx-auto max-w-[1400px] space-y-2">
        {/* Ligne principale */}
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm leading-snug">{message}</p>

          <div className="flex items-center gap-1">
            {/* Bouton image */}
            <button
              type="button"
              onClick={() => setShowImage((v) => !v)}
              className="inline-flex h-8 items-center gap-1 rounded-full px-2 text-xs font-semibold
                         hover:bg-amber-200/70 active:bg-amber-200"
              aria-label="Afficher la notation"
              title="Voir la notation"
            >
              <ImageIcon className="h-4 w-4" />
              Notation
            </button>

            {/* Bouton fermer */}
            <button
              type="button"
              onClick={close}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full
                         hover:bg-amber-200/70 active:bg-amber-200"
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
              alt="Notation GPT"
              className="max-h-[240px] rounded-md border border-amber-300 shadow-sm"
            />
          </div>
        )}
      </div>
    </div>
  );
}

