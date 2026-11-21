// LE « MENU DU JOUR » D'UNE SÉANCE RESTAURANT (17/11/2026).
// ⭐ 18/11, Frédéric : « les élèves ont adoré », puis « cette section doit être
// sur la page d'accueil » → sorti de app/seances/page.tsx pour servir aux deux :
// la page /seances (descriptif de chaque séance) et l'accueil.
// 21/11 : L'ENTRÉE ajoutée avant le plat, et les liens du prof sous le conseil.
import Image from "next/image";
import Link from "next/link";
import type { Seance } from "@/lib/seances/seances";

type Menu = NonNullable<Seance["menu"]>;

const CADRE =
  "relative overflow-hidden rounded-2xl border-4 border-double border-amber-700/60 bg-[#fffaf0] px-5 py-5 shadow-inner sm:px-8 print:break-inside-avoid print:shadow-none";
const TITRE_PARTIE =
  "flex flex-wrap items-center justify-center gap-2 text-center text-sm font-black uppercase tracking-widest text-amber-900";
const LIGNES = "mt-1 space-y-0.5 text-center text-base font-bold text-slate-800 sm:text-lg";

function Badge({ children, couleur }: { children: React.ReactNode; couleur: string }) {
  return <span className={`rounded-full ${couleur} px-2 py-0.5 font-sans text-xs tracking-normal text-white`}>{children}</span>;
}

function Separateur() {
  return <p aria-hidden="true" className="text-center text-amber-700">· · ·</p>;
}

function EnTete({ titre }: { titre: string }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <Image src="/ti-margo/animations/salut.png" alt="" width={320} height={320} sizes="56px" className="h-14 w-14 shrink-0" />
      <div className="text-center">
        <p className="font-serif text-2xl font-black italic text-amber-900">{titre}</p>
        <p className="text-sm font-bold text-amber-800">Servi par Ti Margo</p>
      </div>
    </div>
  );
}

/** La carte du PROF : ce qu'il projette, impose, propose, avec ses PDF. */
export function CarteProf({ menu }: { menu: Menu }) {
  return (
    <div className={CADRE}>
      <EnTete titre="Menu du jour" />
      <div className="mt-4 space-y-4 font-serif">
        {menu.entree && menu.entree.length > 0 && (
          <>
            <div>
              <p className={TITRE_PARTIE}>
                L&apos;entrée <Badge couleur="bg-sky-600">au choix</Badge>
                <span className="font-sans text-xs font-bold normal-case tracking-normal text-amber-800">· 5 min</span>
              </p>
              <ul className={LIGNES}>
                {menu.entree.map((e) => (
                  <li key={e.texte}>
                    {e.href ? (
                      <Link href={e.href} className="underline decoration-amber-400 decoration-2 underline-offset-4 hover:text-amber-900 print:no-underline">
                        {e.texte}
                      </Link>
                    ) : (
                      e.texte
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <Separateur />
          </>
        )}
        {menu.impose.length > 0 && (
          <>
            <div>
              <p className={TITRE_PARTIE}>
                Le plat <Badge couleur="bg-violet-700">imposé</Badge>
              </p>
              <ul className={LIGNES}>
                {menu.impose.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
            <Separateur />
          </>
        )}
        <div>
          <p className={TITRE_PARTIE}>
            À la carte <Badge couleur="bg-sky-600">au choix</Badge>
          </p>
          <ul className={LIGNES}>
            {menu.carte.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </div>
        <Separateur />
        <div>
          <p className={TITRE_PARTIE}>Le dessert 🍨</p>
          <p className="mt-1 text-center text-base font-bold text-slate-800 sm:text-lg">{menu.dessert}</p>
        </div>
      </div>
      <p className="mt-4 rounded-xl bg-white/80 px-3 py-2 font-sans text-sm font-semibold leading-snug text-slate-700 ring-1 ring-amber-200">
        <span className="font-black text-slate-900">Le conseil : </span>
        {menu.conseil}
      </p>
      {menu.ressources && menu.ressources.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2 font-sans print:hidden">
          {menu.ressources.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="rounded-full bg-white px-3 py-1 text-sm font-bold text-slate-800 shadow-sm ring-1 ring-amber-300 hover:bg-amber-50"
            >
              {r.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/** UNE seule carte, comme avant (21/11, Frédéric : « on garde une seule image
 *  comme avant ») : la carte élève et la page à imprimer sont retirées. */
export default function MenuDuJour({ menu }: { menu: Menu }) {
  return <CarteProf menu={menu} />;
}
