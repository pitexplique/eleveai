"use client";

import { useEffect, useState } from "react";
import { X, Sparkles, Smartphone } from "lucide-react";
import InstallPwaModal from "./InstallPwaModal";

type DevBannerProps = {
  message?: string;
  storageKey?: string;
  className?: string;
};

export default function DevBanner({
  message = "Ajoute EleveAI sur ton téléphone pour accéder à la leçon du jour en 1 clic.",
  storageKey = "eleveai_dev_banner_seen_lecon_du_jour_daily_v1",
  className = "",
}: DevBannerProps) {
  const [open, setOpen] = useState(false);
  const [installModalOpen, setInstallModalOpen] = useState(false);

  useEffect(() => {
    try {
      const today = new Date().toDateString();
      const lastSeen = localStorage.getItem(storageKey);

      if (lastSeen !== today) {
        setOpen(true);
      }
    } catch {
      setOpen(true);
    }
  }, [storageKey]);

  const close = () => {
    setOpen(false);

    try {
      const today = new Date().toDateString();
      localStorage.setItem(storageKey, today);
    } catch {}
  };

  if (!open) return null;

  return (
    <>
      <div
        className={[
          "w-full border-b px-4 py-2 print:hidden",
          "bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950",
          "text-slate-100 border-blue-900/60",
          className,
        ].join(" ")}
        role="status"
        aria-live="polite"
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3">
          {/* Message */}
          <div className="flex min-w-0 items-center gap-2">
            <Sparkles className="h-4 w-4 shrink-0 text-yellow-300" />
            <p className="truncate text-sm font-medium leading-snug tracking-wide">
              {message}
            </p>
          </div>

          {/* Bouton unique */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setInstallModalOpen(true)}
              className="inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg border border-white/25 bg-white px-3 text-xs font-black text-slate-950 shadow-sm transition hover:-translate-y-0.5 hover:bg-yellow-100 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-300/80 active:translate-y-0 sm:px-4 sm:text-sm"
            >
              <Smartphone className="h-4 w-4 text-blue-700" />
              <span className="hidden sm:inline">Installer l&apos;app</span>
              <span className="sm:hidden">Installer</span>
            </button>

            {/* Fermer */}
            <button
              type="button"
              onClick={close}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-white/10"
              aria-label="Fermer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      <InstallPwaModal
        autoOpen={false}
        open={installModalOpen}
        onOpenChange={setInstallModalOpen}
      />
    </>
  );
}
