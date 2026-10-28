// app/admin/reponses-fausses/page.tsx — ce que les élèves ont tapé de FAUX au coach.
// 28/10/2026. Le compteur montrait 2 justes sur 21 en decimal_lire_ecrire :
// vraie difficulté, ou correction trop stricte (format d'écriture refusé) ?
// Ici, on lit les réponses tapées, question par question ; une fois la
// question vue ou corrigée, « Corrigé, supprimer » efface ses réponses.
// Aucune identité (supabase/coach_reponses_fausses.sql) ; purge à 30 jours.
export const dynamic = "force-dynamic";

import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@supabase/supabase-js";
import { verifyAdminCookieValue } from "@/lib/server/adminAuth";

type Ligne = {
  classe: string;
  matiere: string;
  micro_id: string;
  question_id: string;
  enonce: string;
  attendu: string | null;
  reponse: string;
  created_at: string;
};

const db = () => createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

async function estAdmin() {
  const cookieStore = await cookies();
  return verifyAdminCookieValue(cookieStore.get("admin-auth")?.value);
}

async function lire(): Promise<Ligne[] | null> {
  const out: Ligne[] = [];
  for (let debut = 0; debut < 100_000; debut += 1000) {
    const { data, error } = await db()
      .from("coach_reponses_fausses")
      .select("classe, matiere, micro_id, question_id, enonce, attendu, reponse, created_at")
      .order("created_at", { ascending: false })
      .range(debut, debut + 999);
    if (error) return debut === 0 ? null : out; // table absente : SQL pas encore joué
    out.push(...((data ?? []) as Ligne[]));
    if (!data || data.length < 1000) break;
  }
  return out;
}

// « Corrigé, supprimer » : une question (toutes ses réponses) ou une micro entière.
async function supprimer(formData: FormData) {
  "use server";
  if (!(await estAdmin())) return;
  const classe = String(formData.get("classe") ?? "");
  const micro = String(formData.get("micro") ?? "");
  const enonce = formData.get("enonce");
  if (!classe || !micro) return;
  let req = db().from("coach_reponses_fausses").delete().eq("classe", classe).eq("micro_id", micro);
  // Un gabarit change ses nombres à chaque tirage : on regroupe par ÉNONCÉ.
  if (typeof enonce === "string") req = req.eq("enonce", enonce);
  await req;
  revalidatePath("/admin/reponses-fausses");
}

export default async function AdminReponsesFaussesPage() {
  if (!(await estAdmin())) redirect("/admin");

  const lignes = await lire();

  // Micro → énoncé → réponses tapées (avec leur nombre).
  const parMicro = new Map<string, { classe: string; micro: string; total: number; questions: Map<string, { attendu: string | null; reponses: Map<string, number>; total: number }> }>();
  for (const l of lignes ?? []) {
    const cle = `${l.classe}·${l.micro_id}`;
    const m = parMicro.get(cle) ?? { classe: l.classe, micro: l.micro_id, total: 0, questions: new Map() };
    const q = m.questions.get(l.enonce) ?? { attendu: l.attendu, reponses: new Map(), total: 0 };
    q.reponses.set(l.reponse, (q.reponses.get(l.reponse) ?? 0) + 1);
    q.total += 1;
    m.total += 1;
    m.questions.set(l.enonce, q);
    parMicro.set(cle, m);
  }
  const micros = [...parMicro.values()].sort((a, b) => b.total - a.total);

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-slate-100">
      <div className="mx-auto max-w-5xl space-y-6">
        <Link href="/admin/dashboard" className="text-sm font-bold text-slate-400 hover:text-white">
          ← Tableau de bord
        </Link>
        <h1 className="text-2xl font-black">✗ Réponses fausses au coach</h1>
        <p className="text-sm text-slate-400">
          Ce que les élèves ont tapé, sans aucune identité. Une réponse juste mal acceptée = un format à corriger
          dans la banque. Une fois vu ou corrigé : « Corrigé, supprimer ». Tout s&apos;efface seul au bout de 30 jours.
        </p>

        {lignes === null ? (
          <p className="rounded-xl border border-amber-700 bg-amber-900/30 p-4 text-amber-200">
            La table n&apos;existe pas encore : exécuter <code>supabase/coach_reponses_fausses.sql</code> dans Supabase.
          </p>
        ) : micros.length === 0 ? (
          <p className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-slate-300">Aucune réponse fausse enregistrée.</p>
        ) : (
          micros.map((m) => (
            <section key={`${m.classe}·${m.micro}`} className="rounded-xl border border-slate-800 bg-slate-900 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg font-black">
                  {m.classe} · {m.micro} <span className="text-sm font-bold text-slate-400">({m.total} réponses fausses)</span>
                </h2>
                <form action={supprimer}>
                  <input type="hidden" name="classe" value={m.classe} />
                  <input type="hidden" name="micro" value={m.micro} />
                  <button className="rounded-md border border-rose-700 px-3 py-1 text-xs font-bold text-rose-300 hover:bg-rose-900/40">
                    Toute la micro : corrigé, supprimer
                  </button>
                </form>
              </div>
              <ul className="mt-3 space-y-3">
                {[...m.questions.entries()]
                  .sort((a, b) => b[1].total - a[1].total)
                  .map(([enonce, q]) => (
                    <li key={enonce} className="rounded-lg border border-slate-800 bg-slate-950 p-3">
                      <p className="text-sm text-slate-200">{enonce}</p>
                      <p className="mt-1 text-xs text-emerald-300">Attendu : {q.attendu ?? "—"}</p>
                      <p className="mt-2 flex flex-wrap gap-2">
                        {[...q.reponses.entries()]
                          .sort((a, b) => b[1] - a[1])
                          .map(([r, n]) => (
                            <span key={r} className="rounded bg-rose-900/40 px-2 py-0.5 font-mono text-sm text-rose-200">
                              « {r} »{n > 1 ? ` × ${n}` : ""}
                            </span>
                          ))}
                      </p>
                      <form action={supprimer} className="mt-2">
                        <input type="hidden" name="classe" value={m.classe} />
                        <input type="hidden" name="micro" value={m.micro} />
                        <input type="hidden" name="enonce" value={enonce} />
                        <button className="rounded-md border border-slate-700 px-3 py-1 text-xs font-bold text-slate-300 hover:bg-slate-800">
                          Corrigé, supprimer
                        </button>
                      </form>
                    </li>
                  ))}
              </ul>
            </section>
          ))
        )}
      </div>
    </main>
  );
}
