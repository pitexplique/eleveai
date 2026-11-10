"use client";

// 10/11/2026 — Frédéric : « crée un bandeau en haut de header avec un lien vers
// le journal », « avec un Ti Margo qui lit un magazine pour comprendre le
// monde », puis « comprendre le monde et le changer ». Un bandeau fin, au-dessus de l'en-tête, sur toutes les pages, qui
// mène au Journal d'EleveAI (/accueil-journal, mis à jour chaque dimanche).
// L'image public/ti-margo/ti-margo-magazine.png est composée à partir de
// public/cahier-vacances/ti-margo.png (magazine « MAG » avec un globe).
// ⛔ Volontairement CALME (bleu nuit, pas rouge) : la banderole rouge a été
// retirée le 06/11 parce qu'elle « détourne l'attention sur la page centrale ».
// Caché sur la page du journal elle-même (le lien y serait inutile).
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BandeauJournal() {
  const pathname = usePathname();
  if (pathname === "/accueil-journal") return null;

  return (
    <div className="bg-[#0b1d3a] px-3 py-1 text-white/90 print:hidden">
      <Link
        href="/accueil-journal?from=bandeau"
        className="mx-auto flex max-w-fit items-center justify-center gap-2 text-[12px] font-semibold leading-tight hover:text-white sm:text-[13px]"
      >
        <Image
          src="/ti-margo/ti-margo-magazine.png"
          alt="Ti Margo lit un magazine"
          width={40}
          height={38}
          className="h-[34px] w-auto shrink-0 sm:h-[38px]"
        />
        <span className="text-left sm:text-center">
          <span className="text-[#FFD60A]">Le Journal d&apos;EleveAI</span>
          <span> : comprendre le monde et le changer</span>
          <span aria-hidden="true" className="ml-1">→</span>
        </span>
      </Link>
    </div>
  );
}
