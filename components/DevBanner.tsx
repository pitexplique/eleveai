"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, Brain, ShieldCheck } from "lucide-react";

type DevBannerProps = {
  message?: string;
  storageKey?: string;
  className?: string;
};

export default function DevBanner({
  message = "En cours  : Tutor — tuteur adaptatif EleveAI. Diagnostic des notions, progression pas à pas et supervision pédagogique.",
  storageKey = "eleveai_dev_banner_closed_v6",
  className = "",
}: DevBannerProps) {
  const [open, setOpen] = useState(false);

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
      <div className="mx-auto max-w-[1400px] flex items-center justify-between gap-3">

        {/* Message */}
        <div className="flex items-center gap-2">
          <Brain className="h-4 w-4 text-purple-400" />
          <p className="text-sm leading-snug font-medium tracking-wide">
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">

          {/* Tutor */}
          <Link
            href="/tutor"
            className="inline-flex h-8 items-center gap-1 rounded-full px-3 text-xs font-semibold
                       bg-purple-600 hover:bg-purple-500 transition"
          >
            <Brain className="h-4 w-4" />
            Essayer Tutor
          </Link>

          {/* Gouvernance */}
          <Link
            href="/tutor-developpement/iso"
            className="inline-flex h-8 items-center gap-1 rounded-full px-3 text-xs font-semibold
                       bg-emerald-700 hover:bg-emerald-600 transition"
          >
            <ShieldCheck className="h-4 w-4" />
            Gouvernance
          </Link>

          {/* Fermer */}
          <button
            type="button"
            onClick={close}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full
                       hover:bg-slate-800 active:bg-slate-700 transition"
            aria-label="Fermer le bandeau"
          >
            <X className="h-4 w-4" />
          </button>

        </div>
      </div>
    </div>
  );
}