import Link from "next/link";

const CREATE_TABLE_SQL = `-- Table minimale pour suivre les paiements EleveAI
create table if not exists public.user_payments (
  user_id uuid primary key,
  has_paid boolean default false,
  checked_at timestamptz default now(),
  constraint user_payments_user_id_fkey foreign key (user_id) references auth.users(id)
);`;

const TYPESCRIPT_EXAMPLE = `import { fetchPaymentStatus, upsertPaymentStatus } from "@/lib/supabase/paymentStatusScript";

// Marquer un utilisateur comme payant ou non payant
await upsertPaymentStatus(userId, "payant");
await upsertPaymentStatus(userId, "non_payant");

// Vérifier le statut avant d'afficher une page premium
const status = await fetchPaymentStatus(userId);
if (status?.has_paid) {
  console.log("Accès premium actif");
} else {
  console.log("Redirection vers l'offre gratuite");
}`;

export default function SupabasePaiementPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <section className="mx-auto max-w-4xl px-4 py-12 space-y-6">
        <div className="text-xs text-slate-500 flex items-center gap-2">
          <Link href="/" className="hover:text-emerald-300 transition">
            Accueil
          </Link>
          <span>/</span>
          <Link href="/tarifs" className="hover:text-emerald-300 transition">
            Tarifs
          </Link>
          <span>/</span>
          <span>Suivi des paiements Supabase</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-emerald-200">
            Script Supabase : marquer un compte payant ou non payant
          </h1>
          <p className="text-sm text-slate-200">
            Ce guide rapide montre comment stocker un statut <strong>payant / non payant</strong>
            dans Supabase et le réutiliser dans vos pages Next.js. Aucune dépendance
            supplémentaire n’est nécessaire : tout passe par <code>lib/supabase/paymentStatusScript.ts</code>.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-2">
            <h2 className="text-lg font-semibold text-slate-100">1. Créer la table</h2>
            <p className="text-sm text-slate-300">
              Exécutez ce SQL dans le SQL Editor Supabase pour créer la table
              <code className="text-emerald-300"> user_payments</code>.
            </p>
            <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950 p-3 text-[11px] text-emerald-200">
              {CREATE_TABLE_SQL}
            </pre>
          </div>

          <div className="rounded-2xl border border-emerald-600/70 bg-emerald-500/10 p-4 space-y-2">
            <h2 className="text-lg font-semibold text-emerald-200">2. Utiliser le helper</h2>
            <p className="text-sm text-slate-200">
              Les fonctions <code>upsertPaymentStatus</code> et <code>fetchPaymentStatus</code>
              sont prêtes à l’emploi pour vos pages client ou vos actions serveur.
            </p>
            <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-950 p-3 text-[11px] text-emerald-100">
              {TYPESCRIPT_EXAMPLE}
            </pre>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 space-y-3">
          <h2 className="text-lg font-semibold text-slate-100">Notes pratiques</h2>
          <ul className="text-sm text-slate-200 space-y-1">
            <li>• Statut booléen <code>has_paid</code> pour distinguer payant / non payant.</li>
            <li>• Colonne <code>checked_at</code> pour tracer la dernière vérification.</li>
            <li>• Le helper renvoie une erreur claire si les variables d’environnement Supabase manquent.</li>
            <li>• Peut être combiné avec un middleware pour rediriger les utilisateurs non payants.</li>
          </ul>
          <Link
            href="/tarifs"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
          >
            Revenir aux offres
          </Link>
        </div>
      </section>
    </main>
  );
}