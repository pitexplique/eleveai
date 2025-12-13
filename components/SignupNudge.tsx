"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { LogIn, UserPlus, X } from "lucide-react";

type SignupNudgeProps = {
  storageKey?: string;
  delayMs?: number;
  minInteractions?: number;
  disabled?: boolean;
  signupHref?: string;
  signinHref?: string;
  title?: string;
  message?: string;
  variant?: "bottom" | "toast";

  /** Option test (facultatif) : force l’affichage en prod pour vérifier le rendu */
  debugForceShow?: boolean;
};

export default function SignupNudge({
  storageKey = "eleveai_nudge_v1",
  delayMs = 5 * 60 * 10,
  minInteractions = 3,
  disabled = false,
  signupHref = "/auth/signup",
  signinHref = "/auth/signin",
  title = "Sauvegarder et personnaliser ?",
  message = "Crée un compte pour retrouver tes ressources, gagner du temps et adapter finement aux besoins de tes élèves.",
  variant = "bottom",
  debugForceShow = false,
}: SignupNudgeProps) {
  const [show, setShow] = useState(false);

  // ✅ interactions stockées en ref (pas de closure figée)
  const interactionsRef = useRef(0);

  const canUseStorage = useMemo(() => typeof window !== "undefined", []);

  const dismiss = useCallback(() => {
    try {
      if (canUseStorage) localStorage.setItem(storageKey, "1");
    } catch {}
    setShow(false);
  }, [canUseStorage, storageKey]);

  // 1) Ne rien faire si déjà vu
  const isAlreadySeen = useCallback(() => {
    if (!canUseStorage) return false;
    try {
      return localStorage.getItem(storageKey) === "1";
    } catch {
      return false;
    }
  }, [canUseStorage, storageKey]);

  // 2) Écoute des interactions (ne déclenche pas de re-render)
  useEffect(() => {
    if (disabled) return;
    if (!canUseStorage) return;
    if (isAlreadySeen()) return;

    const bump = () => {
      interactionsRef.current = Math.min(interactionsRef.current + 1, 50);
    };

    const onClick = () => bump();
    const onScroll = () => bump();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.length === 1 || e.key === "Enter" || e.key === "Backspace") bump();
    };

    window.addEventListener("click", onClick);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [disabled, canUseStorage, isAlreadySeen]);

  // 3) Timer UNIQUE (ne se réinitialise pas)
  useEffect(() => {
    if (disabled) return;
    if (!canUseStorage) return;
    if (isAlreadySeen()) return;

    if (debugForceShow) {
      setShow(true);
      return;
    }

    const t = window.setTimeout(() => {
      // Re-check (au cas où la clé a été posée entre-temps)
      if (isAlreadySeen()) return;

      if (interactionsRef.current >= minInteractions) {
        setShow(true);
      }
    }, delayMs);

    return () => window.clearTimeout(t);
  }, [disabled, canUseStorage, delayMs, minInteractions, isAlreadySeen, debugForceShow]);

  if (!show) return null;

  const containerClass =
    variant === "toast"
      ? "fixed bottom-4 right-4 z-50 w-[min(460px,calc(100vw-2rem))]"
      : "fixed inset-x-0 bottom-0 z-50";

  const innerWrapClass = variant === "toast" ? "" : "max-w-6xl mx-auto px-4 pb-4";

  return (
    <div className={containerClass}>
      <div className={innerWrapClass}>
        {/* ✅ Visible mais non agressif */}
        <div className="bg-sky-100 border border-sky-300 shadow-md rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 w-9 h-9 rounded-xl bg-white/80 border border-sky-200 flex items-center justify-center">
              <span className="text-sky-700 text-base">💡</span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-slate-900">{title}</p>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/70 border border-slate-200 text-slate-600">
                  optionnel
                </span>
              </div>

              <p className="text-xs text-slate-700">{message}</p>

              <p className="text-[11px] text-slate-600">
                Vous pouvez continuer sans créer de compte.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 justify-end">
            <button
              type="button"
              onClick={dismiss}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium bg-white border border-slate-200 hover:bg-slate-50"
            >
              Continuer sans compte
            </button>

            <Link
              href={signupHref}
              onClick={dismiss}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold bg-[#0047B6] text-white hover:bg-[#003894] shadow-sm"
            >
              <UserPlus className="w-4 h-4" />
              Créer un compte
            </Link>

            <Link
              href={signinHref}
              onClick={dismiss}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium bg-slate-100 text-slate-800 hover:bg-slate-200"
            >
              <LogIn className="w-4 h-4" />
              Connexion
            </Link>

            <button
              type="button"
              onClick={dismiss}
              className="p-2 rounded-lg hover:bg-white/70"
              aria-label="Fermer"
              title="Fermer"
            >
              <X className="w-4 h-4 text-slate-700" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

