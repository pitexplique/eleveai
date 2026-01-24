"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

type DevBannerProps = {
  message?: string;
  storageKey?: string;
  className?: string;
};

export default function DevBanner({
  message = "🚧 Site en cours de développement — Dernière MAJ: Prompt Profs - LV1 : Anglais - Espagnol  - LVE : Allemand Italien - collège -24-01-2026",
  storageKey = "eleveai_dev_banner_closed_v1",
  className = "",
}: DevBannerProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const closed = localStorage.getItem(storageKey);
      setOpen(closed !== "1");
    } catch {
      // si localStorage est bloqué, on affiche quand même
      setOpen(true);
    }
  }, [storageKey]);

  const close = () => {
    setOpen(false);
    try {
      localStorage.setItem(storageKey, "1");
    } catch {
      // ignore
    }
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
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3">
        <p className="text-sm leading-snug">{message}</p>

        <button
          type="button"
          onClick={close}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-amber-200/70 active:bg-amber-200"
          aria-label="Fermer le bandeau"
          title="Fermer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
