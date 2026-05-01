"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Sparkles, Smartphone, BookOpen } from "lucide-react";

type DevBannerProps = {
  message?: string;
  storageKey?: string;
  className?: string;
};

export default function DevBanner({
  message = "Nouveau : une leçon de maths par jour sur EleveAI. Ajoute le site à ton écran d’accueil pour y accéder en 1 clic.",
  storageKey = "eleveai_dev_banner_seen_lecon_du_jour_daily_v1",
  className = "",
}: DevBannerProps) {
  const [open, setOpen] = useState(false);

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
    <div
      className={[
        "w-full border-b px-4 py-2",
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

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/lecon-du-jour"
            className="inline-flex h-8 items-center gap-1 rounded-full bg-yellow-400 px-3 text-xs font-bold text-slate-950 transition hover:bg-yellow-300"
          >
            <BookOpen className="h-4 w-4" />
            Leçon du jour
          </Link>

          <Link
            href="/accueil#installer"
            className="hidden h-8 items-center gap-1 rounded-full bg-blue-600 px-3 text-xs font-semibold text-white transition hover:bg-blue-500 sm:inline-flex"
          >
            <Smartphone className="h-4 w-4" />
            Installer
          </Link>

          {/* Fermer */}
          <button
            type="button"
            onClick={close}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-white/10 active:bg-white/15"
            aria-label="Fermer le bandeau"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}