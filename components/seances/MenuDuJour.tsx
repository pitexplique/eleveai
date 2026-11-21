// LE « MENU DU JOUR » D'UNE SÉANCE RESTAURANT (17/11/2026).
// ⭐ 18/11, Frédéric : « les élèves ont adoré », puis « cette section doit être
// sur la page d'accueil » → sorti de app/seances/page.tsx pour servir aux deux :
// la page /seances (descriptif de chaque séance) et l'accueil.
// 21/11, Frédéric : « une belle carte pour chaque prof et une autre pour chaque
// élève, l'une à côté de l'autre », puis « ou alors un seul menu ? » → un seul
// menu à l'écran ; les DEUX côte à côte sur la page à imprimer /seances/menu/<id>.
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

function EnTete({ titre, pour }: { titre: string; pour: string }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <Image src="/ti-margo/animations/salut.png" alt="" width={320} height={320} sizes="56px" className="h-14 w-14 shrink-0" />
      <div className="text-center">
        <p className="font-sans text-xs font-black uppercase tracking-widest text-amber-700">{pour}</p>
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
      <EnTete titre="Menu du jour" pour="Pour le prof" />
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
        <div>
          <p className={TITRE_PARTIE}>
            Le plat <Badge couleur="bg-violet-700">imposé</Badge>
          </p>
          <ul className={LIGNES}>
            {menu.impose.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </div>
        <Separateur />
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

/** La carte de l'ÉLÈVE : tutoiement, cases à cocher, et sa connexion. */
export function CarteEleve({ menu }: { menu: Menu }) {
  return (
    <div className={CADRE}>
      <EnTete titre="Mon menu du jour" pour="Pour l'élève" />
      <div className="mt-4 space-y-4 font-serif">
        {menu.entreeEleve && (
          <>
            <div>
              <p className={TITRE_PARTIE}>
                L&apos;entrée <Badge couleur="bg-amber-600">tous ensemble</Badge>
              </p>
              <p className={LIGNES}>{menu.entreeEleve}</p>
            </div>
            <Separateur />
          </>
        )}
        <div>
          <p className={TITRE_PARTIE}>
            Le plat <Badge couleur="bg-violet-700">pour tous</Badge>
          </p>
          <ul className={LIGNES}>
            {menu.impose.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </div>
        <Separateur />
        <div>
          <p className={TITRE_PARTIE}>
            À la carte <Badge couleur="bg-sky-600">je choisis</Badge>
          </p>
          <ul className="mx-auto mt-1 w-fit space-y-1 text-base font-bold text-slate-800 sm:text-lg">
            {menu.carte.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span aria-hidden="true" className="inline-block h-4 w-4 shrink-0 rounded border-2 border-amber-700 bg-white" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <Separateur />
        <div>
          <p className={TITRE_PARTIE}>Le dessert 🍨</p>
          <p className="mt-1 text-center text-base font-bold text-slate-800 sm:text-lg">{menu.dessert}</p>
        </div>
      </div>
      <div className="mt-4 rounded-xl bg-white/80 px-3 py-2 font-sans text-sm font-semibold leading-snug text-slate-700 ring-1 ring-amber-200">
        <p>
          <span className="font-black text-slate-900">Je me connecte sur eleveai.fr : </span>
          Ti Margo garde mes progrès.
        </p>
        <p className="mt-2 font-black text-slate-900">
          Mon code : <span className="inline-block w-32 border-b-2 border-dotted border-slate-400 align-bottom" />
        </p>
      </div>
    </div>
  );
}

/** À l'ÉCRAN : un seul menu (celui du prof) ; avecEleve = les deux côte à côte
 *  (page à imprimer). 21/11, Frédéric : « ou alors un seul menu ? » → un seul à
 *  l'écran, les deux sur papier : la carte élève sert EN CLASSE (cases, code). */
export default function MenuDuJour({
  menu,
  imprimerHref,
  avecEleve = false,
}: {
  menu: Menu;
  imprimerHref?: string;
  avecEleve?: boolean;
}) {
  return (
    <div>
      {avecEleve ? (
        <div className="grid gap-5 md:grid-cols-2 print:grid-cols-2">
          <CarteProf menu={menu} />
          <CarteEleve menu={menu} />
        </div>
      ) : (
        <CarteProf menu={menu} />
      )}
      {imprimerHref && (
        <p className="mt-3 text-center print:hidden">
          <Link href={imprimerHref} className="inline-flex items-center gap-1.5 font-black text-amber-900 underline">
            Imprimer la carte du prof et celle de l&apos;élève
          </Link>
        </p>
      )}
    </div>
  );
}
