import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

type Logo = {
  id: string;
  prenom: string | null;
  classe: string | null;
  image_url: string;
};

async function getLogos(): Promise<Logo[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("concours_logos")
    .select("id, prenom, classe, image_url")
    .eq("masque", false)
    .order("created_at", { ascending: false })
    .limit(300);
  return data ?? [];
}

export default async function GalerieConcoursLogoPage() {
  const logos = await getLogos();

  return (
    <main className="min-h-screen bg-[#041B33] text-white">
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="inline-flex rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-amber-200">
            Galerie du concours
          </p>
          <h1 className="mt-4 text-3xl font-black leading-tight sm:text-4xl">
            Les logos proposés par les élèves
          </h1>
          <p className="mt-3 max-w-2xl text-sm font-semibold text-white/70">
            Chaque proposition est affichée avec le prénom et la classe de l'élève,
            jamais le nom de famille.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/concours-logo"
              className="rounded-full bg-amber-300 px-5 py-2.5 text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:bg-amber-200"
            >
              Participer au concours
            </Link>
          </div>

          {logos.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
              <p className="text-sm font-semibold text-white/70">
                Aucun logo pour l'instant. Sois le premier à proposer le tien !
              </p>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {logos.map((logo) => (
                <figure
                  key={logo.id}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                >
                  <div className="flex aspect-square items-center justify-center bg-white/10 p-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={logo.image_url}
                      alt={`Logo proposé par ${logo.prenom ?? "un élève"}`}
                      className="max-h-full max-w-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <figcaption className="px-3 py-2 text-xs font-black text-white/80">
                    {logo.prenom || "Élève"}
                    {logo.classe ? (
                      <span className="text-white/50"> · {logo.classe}</span>
                    ) : null}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
