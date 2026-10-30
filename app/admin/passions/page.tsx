// app/admin/passions/page.tsx — LE TABLEAU DES PASSIONS des élèves connectés.
// 30/10/2026. Frédéric : « on établira un tableau de centres d'intérêt, parce que
// j'ai un élève de 6e qui adore la lutte ». Ici : combien d'élèves par passion
// (précisions comprises : « Sport › Lutte »), par classe, et la liste élève par
// élève. C'est ce qui dit quelle vidéo écrire ensuite.
// Les élèves non connectés gardent leurs passions dans leur navigateur : ils
// n'apparaissent pas ici (supabase/passions_eleves.sql).
export const dynamic = "force-dynamic";

import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { verifyAdminCookieValue } from "@/lib/server/adminAuth";
import { CENTRE_PAR_ID, libellePassion } from "@/lib/videos/centres-interet";
import TAGS_VIDEOS from "@/lib/videos/centres-interet-videos.json";

type Ligne = {
  code_etablissement: string;
  code_utilisateur: string;
  classe: string | null;
  passions: string[];
  updated_at: string;
};

const db = () => createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function estAdmin() {
  const cookieStore = await cookies();
  return verifyAdminCookieValue(cookieStore.get("admin-auth")?.value);
}

async function lire(): Promise<Ligne[] | null> {
  const { data, error } = await db()
    .from("passions_eleves")
    .select("code_etablissement, code_utilisateur, classe, passions, updated_at")
    .order("updated_at", { ascending: false })
    .limit(5000);
  if (error) return null; // table absente : SQL pas encore joué
  return (data ?? []) as Ligne[];
}

function nomComplet(passion: string) {
  const [centre, precision] = passion.split(":");
  const { nom, emoji } = libellePassion(passion);
  if (!precision || centre === "autre") return `${emoji} ${centre === "autre" ? `Autre › ${nom}` : nom}`;
  return `${emoji} ${CENTRE_PAR_ID.get(centre)?.nom ?? centre} › ${nom}`;
}

export default async function AdminPassionsPage() {
  if (!(await estAdmin())) redirect("/admin");

  const lignes = await lire();

  // Vidéos déjà étiquetées par centre : met en regard la demande et l'offre.
  const videosParCentre = new Map<string, number>();
  for (const centres of Object.values(TAGS_VIDEOS as Record<string, string[]>))
    for (const c of centres) videosParCentre.set(c, (videosParCentre.get(c) ?? 0) + 1);

  const parPassion = new Map<string, { total: number; classes: Map<string, number> }>();
  for (const l of lignes ?? []) {
    for (const p of l.passions ?? []) {
      const e = parPassion.get(p) ?? { total: 0, classes: new Map() };
      e.total += 1;
      const c = l.classe ?? "?";
      e.classes.set(c, (e.classes.get(c) ?? 0) + 1);
      parPassion.set(p, e);
    }
  }
  const passions = [...parPassion.entries()].sort((a, b) => b[1].total - a[1].total);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-slate-100">
      <div className="mx-auto max-w-5xl space-y-6">
        <Link href="/admin/dashboard" className="text-sm font-bold text-slate-400 hover:text-white">
          ← Tableau de bord
        </Link>
        <h1 className="text-2xl font-black">⭐ Les passions des élèves</h1>
        <p className="text-sm text-slate-400">
          Ce que les élèves connectés ont choisi sur <code>/passions</code> (3 au plus). À droite : combien de vidéos
          parlent déjà de ce centre. Une passion très demandée et peu de vidéos = la prochaine vidéo à écrire.
        </p>

        {lignes === null ? (
          <p className="rounded-xl border border-amber-700 bg-amber-900/30 p-4 text-amber-200">
            La table n&apos;existe pas encore : exécuter <code>supabase/passions_eleves.sql</code> dans Supabase.
          </p>
        ) : lignes.length === 0 ? (
          <p className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-slate-300">
            Aucun élève connecté n&apos;a encore choisi ses passions.
          </p>
        ) : (
          <>
            <p className="text-sm font-bold text-slate-300">{lignes.length} élèves ont choisi leurs passions.</p>
            <table className="w-full overflow-hidden rounded-xl border border-slate-800 text-sm">
              <thead className="bg-slate-900 text-left text-slate-400">
                <tr>
                  <th className="p-2">Passion</th>
                  <th className="p-2 text-right">Élèves</th>
                  <th className="p-2">Par classe</th>
                  <th className="p-2 text-right">Vidéos</th>
                </tr>
              </thead>
              <tbody>
                {passions.map(([p, e]) => (
                  <tr key={p} className="border-t border-slate-800">
                    <td className="p-2 font-bold">{nomComplet(p)}</td>
                    <td className="p-2 text-right font-black">{e.total}</td>
                    <td className="p-2 text-slate-400">
                      {[...e.classes.entries()].map(([c, n]) => `${c} : ${n}`).join(" · ")}
                    </td>
                    <td className="p-2 text-right text-slate-400">{videosParCentre.get(p.split(":")[0]) ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2 className="pt-4 text-lg font-black">Élève par élève</h2>
            <table className="w-full overflow-hidden rounded-xl border border-slate-800 text-sm">
              <thead className="bg-slate-900 text-left text-slate-400">
                <tr>
                  <th className="p-2">Classe</th>
                  <th className="p-2">Code</th>
                  <th className="p-2">Passions</th>
                  <th className="p-2">Le</th>
                </tr>
              </thead>
              <tbody>
                {lignes.map((l) => (
                  <tr key={`${l.code_etablissement}·${l.code_utilisateur}`} className="border-t border-slate-800">
                    <td className="p-2">{l.classe ?? "?"}</td>
                    <td className="p-2 font-mono text-xs text-slate-400">
                      {l.code_etablissement} · {l.code_utilisateur}
                    </td>
                    <td className="p-2">{l.passions.map(nomComplet).join(" · ") || "—"}</td>
                    <td className="p-2 text-xs text-slate-500">
                      {new Date(l.updated_at).toLocaleDateString("fr-FR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </main>
  );
}
