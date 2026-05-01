"use client";

import { useEffect, useMemo, useState } from "react";
import { X, Smartphone, MonitorDown, Share2, MoreVertical } from "lucide-react";

const MODAL_KEY = "eleveai_install_modal_seen_daily_v1";

type DeviceType = "ios" | "android" | "desktop-chrome" | "other";

function detectDevice(): DeviceType {
  if (typeof window === "undefined") return "other";

  const ua = window.navigator.userAgent.toLowerCase();

  const isIOS =
    /iphone|ipad|ipod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  const isAndroid = /android/.test(ua);
  const isChrome = /chrome|crios/.test(ua) && !/edg|opr|opera/.test(ua);

  if (isIOS) return "ios";
  if (isAndroid) return "android";
  if (isChrome) return "desktop-chrome";

  return "other";
}

export default function InstallPwaModal() {
  const [open, setOpen] = useState(false);
  const [device, setDevice] = useState<DeviceType>("other");

  useEffect(() => {
    setDevice(detectDevice());

    try {
      const today = new Date().toDateString();
      const lastSeen = localStorage.getItem(MODAL_KEY);

      if (lastSeen !== today) {
        setOpen(true);
      }
    } catch {
      setOpen(true);
    }
  }, []);

  function closeModal() {
    setOpen(false);

    try {
      const today = new Date().toDateString();
      localStorage.setItem(MODAL_KEY, today);
    } catch {}
  }

  const content = useMemo(() => {
    if (device === "ios") {
      return {
        title: "Installer EleveAI sur iPhone",
        icon: <Share2 className="h-6 w-6" />,
        steps: [
          "Ouvre EleveAI avec Safari.",
          "Appuie sur le bouton Partager.",
          "Choisis “Ajouter à l’écran d’accueil”.",
          "Appuie sur “Ajouter”.",
        ],
      };
    }

    if (device === "android") {
      return {
        title: "Installer EleveAI sur Android",
        icon: <MoreVertical className="h-6 w-6" />,
        steps: [
          "Ouvre EleveAI avec Chrome.",
          "Appuie sur ⋮ en haut à droite.",
          "Choisis “Ajouter à l’écran d’accueil” ou “Installer l’application”.",
          "Valide l’installation.",
        ],
      };
    }

    if (device === "desktop-chrome") {
      return {
        title: "Installer EleveAI sur Chrome",
        icon: <MonitorDown className="h-6 w-6" />,
        steps: [
          "Regarde la barre d’adresse.",
          "Clique sur l’icône d’installation.",
          "Valide “Installer”.",
        ],
      };
    }

    return {
      title: "Installer EleveAI",
      icon: <Smartphone className="h-6 w-6" />,
      steps: [
        "Sur iPhone : Safari → Partager → Ajouter à l’écran d’accueil.",
        "Sur Android : Chrome → ⋮ → Ajouter à l’écran d’accueil.",
        "Ensuite, EleveAI apparaît comme une application.",
      ],
    };
  }, [device]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-3xl border border-white/20 bg-white p-6 text-slate-900 shadow-2xl">
        <button
          type="button"
          onClick={closeModal}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          aria-label="Fermer"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
            {content.icon}
          </div>

          <div>
            <h2 className="text-xl font-black">{content.title}</h2>
            <p className="text-sm text-slate-600">
              Une leçon de maths par jour, en 1 clic.
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-blue-50 p-4">
          <p className="mb-3 flex items-center gap-2 font-bold text-blue-900">
            <Smartphone className="h-5 w-5" />
            Télécharger EleveAI
          </p>

          <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
            {content.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>

        <button
          type="button"
          onClick={closeModal}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-black text-white shadow hover:bg-blue-500"
        >
          J’ai compris
        </button>
      </div>
    </div>
  );
}
