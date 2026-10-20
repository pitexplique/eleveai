// app/admin/videos/page.tsx — combien de fois chaque vidéo R2 a été lue.
// Lu dans `video_vues` (un compteur par vidéo et par jour, supabase/video_vues.sql),
// alimenté par le lecteur du site. Une vue = une lecture lancée sur eleveai.fr ;
// les vues YouTube, elles, restent dans YouTube Studio.
export const dynamic = "force-dynamic";

import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { verifyAdminCookieValue } from "@/lib/server/adminAuth";
import { toutesLesVideos } from "@/lib/videos/r2";

type Ligne = { video_id: string; jour: string; vues: number };

// Jour à La Réunion, comme la fonction compter_vue_video.
const jourReunion = (decalage = 0) =>
  new Date(Date.now() - decalage * 86400000).toLocaleDateString("en-CA", { timeZone: "Indian/Reunion" });

async function lireCompteurs(): Promise<Ligne[] | null> {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const out: Ligne[] = [];
  for (let debut = 0; debut < 2_000_000; debut += 1000) {
    const { data, error } = await supabase
      .from("video_vues")
      .select("video_id, jour, vues")
      .order("jour", { ascending: false })
      .range(debut, debut + 999);
    if (error) return debut === 0 ? null : out; // table absente : SQL pas encore joué
    out.push(...((data ?? []) as Ligne[]));
    if (!data || data.length < 1000) break;
  }
  return out;
}

export default async function AdminVideosPage() {
  const cookieStore = await cookies();
  if (!verifyAdminCookieValue(cookieStore.get("admin-auth")?.value)) redirect("/admin");

  const lignes = await lireCompteurs();
  const auj = jourReunion();
  const il7 = jourReunion(6);

  const parVideo = new Map<string, { total: number; semaine: number; jour: number }>();
  for (const l of lignes ?? []) {
    const c = parVideo.get(l.video_id) ?? { total: 0, semaine: 0, jour: 0 };
    c.total += l.vues;
    if (l.jour >= il7) c.semaine += l.vues;
    if (l.jour === auj) c.jour += l.vues;
    parVideo.set(l.video_id, c);
  }

  const videos = toutesLesVideos()
    .map((v) => ({ ...v, classe: v.fichier.split("/")[0], ...(parVideo.get(v.id) ?? { total: 0, semaine: 0, jour: 0 }) }))
    .sort((a, b) => b.total - a.total || b.semaine - a.semaine || a.id.localeCompare(b.id, "fr"));
  const vues = videos.filter((v) => v.total > 0);
  const somme = (k: "total" | "semaine" | "jour") => videos.reduce((s, v) => s + v[k], 0);

  // Par classe : ce qui marche, à l'échelle d'un niveau.
  const parClasse = new Map<string, { total: number; semaine: number }>();
  for (const v of vues) {
    const c = parClasse.get(v.classe) ?? { total: 0, semaine: 0 };
    c.total += v.total;
    c.semaine += v.semaine;
    parClasse.set(v.classe, c);
  }
  const classes = [...parClasse.entries()].sort((a, b) => b[1].total - a[1].total);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-slate-100">
      <div className="mx-auto max-w-5xl space-y-6">
        <Link href="/admin/dashboard" className="text-sm font-bold text-slate-400 hover:text-white">
          ← Tableau de bord
        </Link>
        <h1 className="text-2xl font-black">▶ Vues des vidéos (lecteur EleveAI, R2)</h1>

        {lignes === null ? (
          <p className="rounded-xl border border-amber-700 bg-amber-900/30 p-4 text-amber-200">
            La table n&apos;existe pas encore : exécuter <code>supabase/video_vues.sql</code> dans
            l&apos;éditeur SQL de Supabase.
          </p>
        ) : null}

        <div className="grid grid-cols-3 gap-3">
          {[
            ["Aujourd'hui", somme("jour")],
            ["7 derniers jours", somme("semaine")],
            ["Depuis le début", somme("total")],
          ].map(([l, n]) => (
            <div key={l} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
              <p className="text-xs font-bold uppercase text-slate-400">{l}</p>
              <p className="mt-1 text-3xl font-black tabular-nums">{n}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-slate-400">
          {vues.length} vidéos vues au moins une fois sur {videos.length}. Une vue = une lecture lancée
          (rejouer ou reprendre après une pause ne recompte pas). Les vues YouTube sont dans YouTube Studio.
        </p>

        {classes.length ? (
          <section>
            <h2 className="mb-2 text-sm font-bold text-slate-300">Par classe</h2>
            <div className="flex flex-wrap gap-2">
              {classes.map(([c, n]) => (
                <span key={c} className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm ring-1 ring-slate-800">
                  <b>{c}</b> · {n.total} <span className="text-slate-500">({n.semaine} en 7 j)</span>
                </span>
              ))}
            </div>
          </section>
        ) : null}

        <section className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase text-slate-400">
              <tr>
                <th className="py-2 pr-2">Vidéo</th>
                <th className="py-2 pr-2">Classe</th>
                <th className="py-2 pr-2 text-right">Auj.</th>
                <th className="py-2 pr-2 text-right">7 j</th>
                <th className="py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {vues.map((v) => (
                <tr key={v.id} className="border-t border-slate-800">
                  <td className="py-1.5 pr-2">
                    <Link href={`/video/${v.id}`} className="hover:text-rose-300">
                      {v.short ? "📱 " : "🎬 "}
                      {v.titre}
                    </Link>
                  </td>
                  <td className="py-1.5 pr-2 text-slate-400">{v.classe}</td>
                  <td className="py-1.5 pr-2 text-right tabular-nums">{v.jour || ""}</td>
                  <td className="py-1.5 pr-2 text-right tabular-nums">{v.semaine || ""}</td>
                  <td className="py-1.5 text-right font-bold tabular-nums">{v.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}
