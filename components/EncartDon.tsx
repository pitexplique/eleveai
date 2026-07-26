"use client";

// Encart « Participez à l'aventure » réutilisable — à poser en bas d'un contenu
// gratuit (guides de survie, cahiers…). On demande le soutien APRÈS avoir rendu
// le service (même principe que la capture post-téléchargement).
//
// TROIS PORTES, pour LAISSER LA LIBERTÉ (demande de Frédéric, 26/07) : le QR du
// don est posé À CÔTÉ de celui du coach et de celui du journal — le lecteur
// choisit sans pression (esprit « sans jugement »). Sur un guide IMPRIMÉ, ces
// trois QR sont trois portes qu'on scanne hors ligne ; le numéro Wero est aussi
// imprimé (les boutons d'action, eux, sont masqués au print). Transparence des
// coûts sur la page /faire-un-don.

import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";

// Le numéro Wero — déjà public sur /entreprises et /faire-un-don.
const NUMERO = "06 92 74 29 58";
const URL_DON = "https://eleveai.fr/faire-un-don";
const URL_ACCUEIL = "https://eleveai.fr";

// Une porte = un QR + son libellé. Composant interne pour ne pas répéter.
function PorteQR({
  href,
  emoji,
  label,
}: {
  href: string;
  emoji: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="rounded-lg bg-white p-1.5 ring-1 ring-slate-200">
        <QRCodeSVG value={href} size={82} aria-label={`QR code : ${label}`} />
      </div>
      <p className="text-center text-[12px] font-bold leading-tight text-slate-700">
        <span aria-hidden="true">{emoji}</span> {label}
      </p>
    </div>
  );
}

export default function EncartDon({
  className = "",
  // Le coach est contextuel (matière + niveau) : le parent le passe. Défaut
  // générique si l'encart est réutilisé hors d'un guide.
  coachUrl = "https://eleveai.fr/coach-ia/maths",
}: {
  className?: string;
  coachUrl?: string;
}) {
  const [copie, setCopie] = useState(false);

  async function copier() {
    try {
      await navigator.clipboard.writeText(NUMERO);
      setCopie(true);
      // Retour à l'état neutre après 2 s, sans setInterval.
      setTimeout(() => setCopie(false), 2000);
    } catch {
      // Presse-papiers indisponible : on ne casse rien.
      setCopie(false);
    }
  }

  return (
    <aside
      className={`rounded-2xl border-2 border-amber-300 bg-amber-50 p-5 text-left print:shadow-none ${className}`}
    >
      <p className="text-[11px] font-black uppercase tracking-widest text-amber-700">
        💛 Participez à l&apos;aventure
      </p>
      <h3 className="mt-1.5 text-lg font-black text-slate-900">
        Ce guide est gratuit. À toi de choisir la suite.
      </h3>
      <p className="mt-1.5 text-[13.5px] leading-snug text-slate-700">
        EleveAI ne coûte rien à l&apos;élève, et ça ne changera pas. Faire
        tourner la machine coûte ≈&nbsp;128&nbsp;€/mois — on l&apos;affiche, sans
        rien cacher. Liberté totale&nbsp;: soutiens si tu veux, entraîne-toi, ou
        explore le journal. Scanne la porte qui te parle.
      </p>

      {/* Les trois portes, côte à côte — le don n'est pas au-dessus des autres. */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        <PorteQR href={URL_DON} emoji="💛" label="Faire un don" />
        <PorteQR href={coachUrl} emoji="🧠" label="M'entraîner" />
        <PorteQR href={URL_ACCUEIL} emoji="📰" label="Le journal" />
      </div>

      {/* Le numéro Wero en clair (s'imprime) + actions écran (masquées au print). */}
      <div className="mt-4 flex flex-wrap items-center gap-2.5 border-t border-amber-200 pt-3">
        <span className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-[15px] font-black tracking-wide text-slate-900">
          Wero · {NUMERO}
        </span>
        <button
          type="button"
          onClick={copier}
          className="rounded-full border-2 border-slate-300 px-3 py-1.5 text-[13px] font-bold text-slate-700 transition hover:bg-white print:hidden"
        >
          {copie ? "✅ Copié" : "📋 Copier"}
        </button>
        <Link
          href="/faire-un-don"
          className="rounded-full bg-amber-500 px-4 py-1.5 text-[13px] font-black text-white transition hover:bg-amber-600 print:hidden"
        >
          Faire un don →
        </Link>
      </div>
    </aside>
  );
}
