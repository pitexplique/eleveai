"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { X, Smartphone, MonitorDown, Share2, MoreVertical } from "lucide-react";

const MODAL_KEY = "eleveai_install_modal_seen_daily_v2";

type DeviceType = "ios" | "android" | "desktop-chrome" | "other";

function isStandalonePwa() {
  if (typeof window === "undefined") return false;

  const nav = window.navigator as Navigator & {
    standalone?: boolean;
  };

  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    nav.standalone === true
  );
}

function detectDevice(): DeviceType {
  if (typeof window === "undefined") return "other";

  const ua = window.navigator.userAgent.toLowerCase();

  const isIOS =
    /iphone|ipad|ipod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  const isAndroid = /android/.test(ua);

  const isChrome =
    /chrome|crios/.test(ua) && !/edg|opr|opera|firefox|fxios/.test(ua);

  if (isIOS) return "ios";
  if (isAndroid) return "android";
  if (isChrome) return "desktop-chrome";

  return "other";
}

function todayKey() {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

type InstallPwaModalProps = {
  autoOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export default function InstallPwaModal({
  autoOpen = true,
  open: controlledOpen,
  onOpenChange,
}: InstallPwaModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [device, setDevice] = useState<DeviceType>("other");
  const open = controlledOpen ?? internalOpen;

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      onOpenChange?.(nextOpen);

      if (controlledOpen === undefined) {
        setInternalOpen(nextOpen);
      }
    },
    [controlledOpen, onOpenChange],
  );

  useEffect(() => {
    const detectedDevice = detectDevice();
    setDevice(detectedDevice);

    if (!autoOpen) {
      return;
    }

    // Si EleveAI est déjà ouvert comme une app, on n'affiche rien
    if (isStandalonePwa()) {
      return;
    }

    try {
      const today = todayKey();
      const lastSeen = localStorage.getItem(MODAL_KEY);

      if (lastSeen !== today) {
        const timer = window.setTimeout(() => {
          setOpen(true);
        }, 1200);

        return () => window.clearTimeout(timer);
      }
    } catch {
      setOpen(true);
    }
  }, [autoOpen, setOpen]);

  function closeModal() {
    setOpen(false);

    try {
      localStorage.setItem(MODAL_KEY, todayKey());
    } catch {
      // rien
    }
  }

  const content = useMemo(() => {
    if (device === "ios") {
      return {
        title: "Ajouter EleveAI sur iPhone",
        icon: <Share2 className="h-6 w-6" />,
        intro:
          "Sur iPhone, EleveAI s’ajoute depuis Safari, comme une application.",
        steps: [
          "Ouvre EleveAI avec Safari.",
          "Appuie sur le bouton Partager en bas de l’écran.",
          "Fais défiler les options.",
          "Choisis “Ajouter à l’écran d’accueil”.",
          "Appuie sur “Ajouter”.",
        ],
        note: "Si tu es dans Chrome sur iPhone, ouvre d’abord le site dans Safari.",
      };
    }

    if (device === "android") {
      return {
        title: "Installer EleveAI sur Android",
        icon: <MoreVertical className="h-6 w-6" />,
        intro:
          "Sur Android, EleveAI peut être installé depuis le menu du navigateur.",
        steps: [
          "Ouvre EleveAI avec Chrome.",
          "Appuie sur ⋮ en haut à droite.",
          "Choisis “Ajouter à l’écran d’accueil” ou “Installer l’application”.",
          "Valide l’installation.",
        ],
        note: "EleveAI apparaîtra ensuite comme une application.",
      };
    }

    if (device === "desktop-chrome") {
      return {
        title: "Installer EleveAI sur Chrome",
        icon: <MonitorDown className="h-6 w-6" />,
        intro: "Sur ordinateur, Chrome peut proposer une icône d’installation.",
        steps: [
          "Regarde la barre d’adresse.",
          "Clique sur l’icône d’installation si elle apparaît.",
          "Valide “Installer”.",
        ],
        note: "Tu pourras ouvrir EleveAI depuis ton ordinateur comme une app.",
      };
    }

    return {
      title: "Installer EleveAI",
      icon: <Smartphone className="h-6 w-6" />,
      intro:
        "Tu peux ajouter EleveAI sur ton téléphone pour y accéder rapidement.",
      steps: [
        "Sur iPhone : Safari → Partager → Ajouter à l’écran d’accueil.",
        "Sur Android : Chrome → ⋮ → Ajouter à l’écran d’accueil.",
        "Ensuite, EleveAI apparaît comme une application.",
      ],
      note: "L’installation fonctionne mieux avec Safari sur iPhone et Chrome sur Android.",
    };
  }, [device]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex min-h-[100dvh] items-center justify-center bg-slate-950/75 px-4 py-6 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-3xl border border-white/20 bg-white p-5 text-slate-900 shadow-2xl sm:p-6">
        <button
          type="button"
          onClick={closeModal}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
          aria-label="Fermer"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-4 flex items-start gap-3 pr-9">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow">
            {content.icon}
          </div>

          <div>
            <h2 className="text-lg font-black leading-tight sm:text-xl">
              {content.title}
            </h2>
            <p className="mt-1 text-sm font-semibold text-slate-600">
              Une leçon de maths par jour, en 1 clic.
            </p>
          </div>
        </div>

        <p className="mb-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold leading-relaxed text-slate-700">
          {content.intro}
        </p>

        <div className="rounded-2xl bg-blue-50 p-4">
          <p className="mb-3 flex items-center gap-2 font-black text-blue-900">
            <Smartphone className="h-5 w-5" />
            Accès rapide à EleveAI
          </p>

          <ol className="list-decimal space-y-2 pl-5 text-sm font-semibold leading-relaxed text-slate-700">
            {content.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>

        <p className="mt-4 rounded-2xl bg-amber-50 px-4 py-3 text-xs font-bold leading-relaxed text-amber-900">
          {content.note}
        </p>

        <button
          type="button"
          onClick={closeModal}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-black text-white shadow transition hover:bg-blue-500 active:scale-[0.99]"
        >
          J’ai compris
        </button>
      </div>
    </div>
  );
}
