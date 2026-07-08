"use client";

// Capter APRÈS avoir donné la valeur, jamais avant : cette modale n'apparaît
// qu'une fois le cahier imprimé/téléchargé (événement `afterprint`). Aucun mur —
// entièrement refermable (croix / « Plus tard » / Échap / clic hors-carte).
// C'est le point de fuite du funnel : le cahier circule, mais on ne captait rien
// entre le téléchargement et la création de compte.

import { useEffect, useState } from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { Sparkles, X } from "lucide-react";

const SIGNUP_URL = "https://eleveai.fr/auth/signin?from=cahier";

export default function CaptureApresTelechargement({
  coachHref,
}: {
  coachHref: string;
}) {
  const [open, setOpen] = useState(false);
  const [dejaVu, setDejaVu] = useState(false);

  // Apparaît au premier `afterprint` (dialogue d'impression fermé), une seule fois.
  useEffect(() => {
    const onAfterPrint = () => {
      if (dejaVu) return;
      setOpen(true);
      setDejaVu(true);
    };
    window.addEventListener("afterprint", onAfterPrint);
    return () => window.removeEventListener("afterprint", onAfterPrint);
  }, [dejaVu]);

  // Échap pour fermer.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="screen-only fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Recevez la suite du cahier"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-teal-200 bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Fermer"
          className="absolute right-3 top-3 rounded-full p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          <X className="h-5 w-5" />
        </button>

        <p className="text-2xl font-black text-slate-900">Profite bien du cahier&nbsp;! 🎉</p>
        <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
          <span className="font-black text-slate-800">Parents&nbsp;:</span> créez un
          espace <span className="font-black">gratuit</span> pour recevoir les
          prochains cahiers, et débloquer le coach IA qui{" "}
          <span className="font-black">explique</span> à votre enfant quand il
          bloque. Rien à installer, sans publicité.
        </p>

        {/* Preuve sociale : un vrai avis d'élève (retours_eleves). Prénom seul
           (RGPD : jamais relié à une classe/établissement). */}
        <figure className="mt-3 rounded-xl border border-amber-200 bg-amber-50/60 p-3">
          <div className="text-xs tracking-wide text-amber-500">★★★★★</div>
          <blockquote className="mt-1 text-xs font-semibold italic leading-5 text-slate-700">
            « Franchement, j&apos;ai adoré faire ça le soir, quand j&apos;avais un
            moment. Ça ne peut être que bénéfique sur le long terme. »
          </blockquote>
          <figcaption className="mt-1 text-[11px] font-black text-slate-500">
            — Pierre, spécialité maths à Valence
          </figcaption>
        </figure>

        <div className="mt-4 flex items-center gap-4">
          <div className="flex-1 space-y-2">
            <Link
              href="/auth/signin?from=cahier"
              className="flex items-center justify-center gap-2 rounded-full bg-teal-500 px-5 py-3 text-sm font-black text-white shadow-lg shadow-teal-500/30 transition hover:bg-teal-400"
            >
              <Sparkles className="h-4 w-4" />
              Créer mon espace gratuit
            </Link>
            <Link
              href={coachHref}
              className="flex items-center justify-center gap-2 rounded-full border border-teal-300 bg-white px-5 py-2.5 text-sm font-black text-teal-700 transition hover:bg-teal-50"
            >
              Découvrir le coach IA
            </Link>
          </div>
          <div className="shrink-0 text-center">
            <div className="inline-block rounded-lg border border-slate-200 bg-white p-1.5">
              <QRCodeSVG value={SIGNUP_URL} size={72} level="M" marginSize={1} />
            </div>
            <p className="mt-1 text-[10px] font-black text-slate-500">Scannez</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen(false)}
          className="mt-3 w-full text-center text-xs font-bold text-slate-400 transition hover:text-slate-600"
        >
          Plus tard
        </button>
      </div>
    </div>
  );
}
