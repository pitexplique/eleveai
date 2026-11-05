// /suivi/exemple — ce que voit un parent, sur une élève fictive (05/11/2026).
import type { Metadata } from "next";
import Link from "next/link";
import RapportVue from "@/components/suivi/RapportVue";
import { rapportExemple } from "@/lib/suivi/exemple";

export const metadata: Metadata = { title: "Un exemple de suivi", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <main className="min-h-screen bg-white px-4 py-10 text-slate-900 [color-scheme:light]">
      <div className="mx-auto max-w-4xl">
        <p className="inline-flex rounded-full bg-amber-100 px-4 py-1.5 text-xs font-black uppercase tracking-wide text-amber-900 ring-1 ring-amber-200">
          Exemple avec une élève fictive
        </p>
        <h1 className="mt-3 text-3xl font-black sm:text-4xl">Ce que vous voyez, comme parent</h1>
        <div className="mt-6">
          <RapportVue r={rapportExemple()} liens={false} />
        </div>
        <div className="mt-10 text-center">
          <Link href="/abonnement" className="inline-flex rounded-full bg-sky-700 px-6 py-3 font-black text-white hover:bg-sky-800">
            Voir le suivi famille
          </Link>
        </div>
      </div>
    </main>
  );
}
