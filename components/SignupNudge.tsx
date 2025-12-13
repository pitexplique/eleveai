// /components/SignupNudge.tsx
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { LogIn, UserPlus, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type TriggerMode = "action" | "delay" | "both";

type SignupNudgeProps = {
  /** (Optionnel) Incrémente ce nombre pour signaler une action "métier" (générer, copier, etc.) */
  actionSignal?: number;

  /** Clé localStorage (ne s’affiche qu’une fois par navigateur) */
  storageKey?: string;

  /** Mode de déclenchement */
  trigger?: TriggerMode;

  /** Délai avant affichage (ms) si trigger inclut "delay" */
  delayMs?: number;

  /** Nombre minimum d’interactions (clic/scroll/touches/actions) avant affichage */
  minInteractions?: number;

  /** Nb d'actions min (si trigger inclut "action") */
  minActionCount?: number;

  /** Désactiver totalement */
  disabled?: boolean;

  /** Routes auth */
  signupHref?: string;
  signinHref?: string;

  /** Texte */
  title?: string;
  message?: string;

  /** Variante visuelle */
  variant?: "bottom" | "toast";
};

export default function SignupNudge({
  actionSignal = 0,
  storageKey = "eleveai_nudge_v1",
  trigger = "both",
  delayMs = 5 * 60 * 1000,
  minInteractions = 3,
  minActionCount = 1,
  disabled = false,
  signupHref = "/auth/signup",
  signinHref = "/auth/signin",
  title = "Vous utilisez EleveAI depuis quelques minutes.",
  message = "Un compte permet de sauvegarder vos essais, personnaliser l’aide et gagner du temps.",
  variant = "bottom",
}: SignupNudgeProps) {
  const [show, setShow] = useState(false);

  // Connexion
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  // Engagement
  const [interactions, setInteractions] = useState(0);
  const [actionCount, setActionCount] = useState(0);

  const canUseStorage = useMemo(() => typeof window !== "undefined", []);

  const alreadySeen = useCallback(() => {
    if (!canUseStorage) return false;
    try {
      return localStorage.getItem(storageKey) === "1";
    } catch {
      return false;
    }
  }, [canUseStorage, storageKey]);

  const dismiss = useCallback(() => {
    try {
      if (canUseStorage) localStorage.setItem(storageKey, "1");
    } catch {}
    setShow(false);
  }, [canUseStorage, storageKey]);

  // ----------------------------------------
  // 1) Supabase session : NE JAMAIS afficher si connecté
  // ----------------------------------------
  useEffect(() => {
    if (disabled) return;

    const supabase = createClient();
    let unsub: { data?: { subscription?: { unsubscribe: () => void } } } | null = null;

    const init = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setIsLoggedIn(!!data.session);
      } catch {
        // En cas d'erreur, on suppose non connecté pour ne pas bloquer le produit
        setIsLoggedIn(false);
      }

      unsub = supabase.auth.onAuthStateChange((_event, session) => {
        const logged = !!session;
        setIsLoggedIn(logged);
        if (logged) setShow(false);
      });
    };

    init();

    return () => {
      try {
        unsub?.data?.subscription?.unsubscribe?.();
      } catch {}
    };
  }, [disabled]);

  // ----------------------------------------
  // 2) Interactions "réelles" (clic/scroll/touches)
  // ----------------------------------------
  useEffect(() => {
    if (disabled) return;
    if (!canUseStorage) return;
    if (alreadySeen()) return;

    const bump = () => setInteractions((n) => Math.min(n + 1, 100));

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
  }, [disabled, canUseStorage, alreadySeen]);

  // ----------------------------------------
  // 3) Actions "métier" (générer/coller/copie...)
  // ----------------------------------------
  useEffect(() => {
    if (disabled) return;
    if (actionSignal <= 0) return;

    setActionCount((c) => c + 1);

    // Compte aussi comme "interaction" (utile pour le mode delay)
    setInteractions((n) => Math.min(n + 1, 100));
  }, [actionSignal, disabled]);

  // ----------------------------------------
  // 4) Trigger DELAY (style IXL) : timer + interactions
  // ----------------------------------------
  useEffect(() => {
    if (disabled) return;
    if (!canUseStorage) return;
    if (trigger === "action") return;

    // On attend la session connue (évite flash)
    if (isLoggedIn === null) return;

    // Jamais si connecté / déjà vu
    if (isLoggedIn) return;
    if (alreadySeen()) return;

    const t = window.setTimeout(() => {
      // Re-check au moment du timer
      if (isLoggedIn) return;
      if (alreadySeen()) return;
      if (interactions >= minInteractions) setShow(true);
    }, delayMs);

    return () => window.clearTimeout(t);
  }, [
    disabled,
    canUseStorage,
    trigger,
    delayMs,
    minInteractions,
    interactions,
    isLoggedIn,
    alreadySeen,
  ]);

  // ----------------------------------------
  // 5) Trigger ACTION (optionnel) : après N actions métier
  // ----------------------------------------
  useEffect(() => {
    if (disabled) return;
    if (!canUseStorage) return;
    if (trigger === "delay") return;

    if (isLoggedIn === null) return;
    if (isLoggedIn) return;
    if (alreadySeen()) return;

    if (actionCount >= minActionCount) setShow(true);
  }, [
    disabled,
    canUseStorage,
    trigger,
    actionCount,
    minActionCount,
    isLoggedIn,
    alreadySeen,
  ]);

  if (!show) return null;

  const containerClass =
    variant === "toast"
      ? "fixed bottom-4 right-4 z-50 w-[min(420px,calc(100vw-2rem))]"
      : "fixed inset-x-0 bottom-0 z-50";

  const innerWrapClass = variant === "toast" ? "" : "max-w-6xl mx-auto px-4 pb-4";

  return (
    <div className={containerClass}>
      <div className={innerWrapClass}>
        <div className="bg-white border border-slate-200 shadow-lg rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 text-sky-600">💡</div>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-slate-900">{title}</p>
              <p className="text-xs text-slate-600">{message}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 justify-end">
            <button
              type="button"
              onClick={dismiss}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-50"
            >
              Continuer sans compte
            </button>

            <Link
              href={signupHref}
              onClick={dismiss}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold bg-[#0047B6] text-white hover:bg-[#003894]"
            >
              <UserPlus className="w-4 h-4" />
              Créer un compte
            </Link>

            <Link
              href={signinHref}
              onClick={dismiss}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-950"
            >
              <LogIn className="w-4 h-4" />
              Connexion
            </Link>

            <button
              type="button"
              onClick={dismiss}
              className="p-2 rounded-lg hover:bg-slate-100"
              aria-label="Fermer"
              title="Fermer"
            >
              <X className="w-4 h-4 text-slate-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
