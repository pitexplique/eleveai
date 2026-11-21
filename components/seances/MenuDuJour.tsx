// LE « MENU DU JOUR » D'UNE SÉANCE RESTAURANT (17/11/2026).
// ⭐ 18/11, Frédéric : « les élèves ont adoré », puis « cette section doit être
// sur la page d'accueil » → sorti de app/seances/page.tsx pour servir aux deux :
// la page /seances (descriptif de chaque séance) et l'accueil.
import Image from "next/image";
import Link from "next/link";
import type { Seance } from "@/lib/seances/seances";

export default function MenuDuJour({ menu }: { menu: NonNullable<Seance["menu"]> }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border-4 border-double border-amber-700/60 bg-[#fffaf0] px-5 py-5 shadow-inner sm:px-8">
      <div className="flex items-center justify-center gap-3">
        <Image src="/ti-margo/animations/salut.png" alt="" width={320} height={320} sizes="56px" className="h-14 w-14 shrink-0" />
        <div className="text-center">
          <p className="font-serif text-2xl font-black italic text-amber-900">Menu du jour</p>
          <p className="text-sm font-bold text-amber-800">Servi par Ti Margo</p>
        </div>
      </div>
      <div className="mt-4 space-y-4 font-serif">
        {menu.entree && menu.entree.length > 0 && (
          <>
            <div>
              <p className="flex items-center justify-center gap-2 text-center text-sm font-black uppercase tracking-widest text-amber-900">
                L&apos;entrée <span className="rounded-full bg-sky-600 px-2 py-0.5 font-sans text-xs tracking-normal text-white">au choix</span>
                <span className="font-sans text-xs font-bold normal-case tracking-normal text-amber-800">· 5 min</span>
              </p>
              <ul className="mt-1 space-y-0.5 text-center text-base font-bold text-slate-800 sm:text-lg">
                {menu.entree.map((e) => (
                  <li key={e.texte}>
                    {e.href ? (
                      <Link href={e.href} className="underline decoration-amber-400 decoration-2 underline-offset-4 hover:text-amber-900">
                        {e.texte}
                      </Link>
                    ) : (
                      e.texte
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <p aria-hidden="true" className="text-center text-amber-700">· · ·</p>
          </>
        )}
        <div>
          <p className="flex items-center justify-center gap-2 text-center text-sm font-black uppercase tracking-widest text-amber-900">
            Le plat <span className="rounded-full bg-violet-700 px-2 py-0.5 font-sans text-xs tracking-normal text-white">imposé</span>
          </p>
          <ul className="mt-1 space-y-0.5 text-center text-base font-bold text-slate-800 sm:text-lg">
            {menu.impose.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </div>
        <p aria-hidden="true" className="text-center text-amber-700">· · ·</p>
        <div>
          <p className="flex items-center justify-center gap-2 text-center text-sm font-black uppercase tracking-widest text-amber-900">
            À la carte <span className="rounded-full bg-sky-600 px-2 py-0.5 font-sans text-xs tracking-normal text-white">au choix</span>
          </p>
          <ul className="mt-1 space-y-0.5 text-center text-base font-bold text-slate-800 sm:text-lg">
            {menu.carte.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </div>
        <p aria-hidden="true" className="text-center text-amber-700">· · ·</p>
        <div>
          <p className="text-center text-sm font-black uppercase tracking-widest text-amber-900">Le dessert 🍨</p>
          <p className="mt-1 text-center text-base font-bold text-slate-800 sm:text-lg">{menu.dessert}</p>
        </div>
      </div>
      <p className="mt-4 rounded-xl bg-white/80 px-3 py-2 font-sans text-sm font-semibold leading-snug text-slate-700 ring-1 ring-amber-200">
        <span className="font-black text-slate-900">Le conseil : </span>
        {menu.conseil}
      </p>
    </div>
  );
}
