"use client";

// 10/11/2026 — Frédéric : « crée un bandeau en haut de header avec un lien vers
// le journal », « avec un Ti Margo qui lit un magazine pour comprendre le
// monde », puis « comprendre le monde et le changer ». Un bandeau au-dessus de l'en-tête, sur toutes les pages, qui
// mène au Journal d'EleveAI (/accueil-journal, mis à jour chaque dimanche).
// L'image public/ti-margo/ti-margo-magazine.png est composée à partir de
// public/cahier-vacances/ti-margo.png (magazine « MAG » avec un globe).
// ⭐ 10/11 : « mets de la hauteur dans le bandeau pour que le lien soit
// visible », puis « avec une calligraphie et un fond d'écran qui correspond au
// journal » → papier crème (#faf6ec), titre en serif noir, sous-titre en
// italique, double filet comme la manchette, bouton « Lire » noir (les mêmes
// classes que app/accueil-journal/JournalClient.tsx).
// ⛔ Pas de rouge vif en aplat : la banderole rouge a été retirée le 06/11
// parce qu'elle « détourne l'attention sur la page centrale ». Le rouge reste
// en petit, comme la rubrique du journal.
// ⛔ 11/11 : « tu le mets que dans la page d'accueil, pas sur tout le site » →
// affiché seulement sur « / ».
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BandeauJournal() {
  const pathname = usePathname();
  if (pathname !== "/") return null;

  return (
    <div className="border-b-[4px] border-double border-stone-900 bg-[#faf6ec] px-3 py-2 text-stone-900 print:hidden sm:py-2.5">
      <Link
        href="/accueil-journal?from=bandeau"
        className="group mx-auto flex max-w-fit items-center justify-center gap-3"
      >
        <Image
          src="/ti-margo/ti-margo-magazine.png"
          alt="Ti Margo lit un magazine"
          width={64}
          height={60}
          className="h-[48px] w-auto shrink-0 sm:h-[58px]"
        />
        <span className="text-left leading-tight sm:text-center">
          <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-red-700 sm:text-[11px]">
            Du CP aux adultes
          </span>
          <span className="block font-serif text-[18px] font-black tracking-tight sm:text-[24px]">
            Le Journal d&apos;EleveAI
          </span>
          <span className="block font-serif text-[13px] italic text-stone-700 sm:text-[15px]">
            Comprendre le monde, et le changer
          </span>
        </span>
        <span className="shrink-0 rounded-full bg-stone-900 px-3 py-1.5 font-serif text-[14px] font-bold text-white group-hover:bg-stone-700 sm:px-4 sm:text-[16px]">
          Lire <span aria-hidden="true">→</span>
        </span>
      </Link>
    </div>
  );
}
