// L'écran d'attente du tutor : le même pour le chargement de la route
// (loading.tsx, affiché dès le clic sur GO) et pour le Suspense de la page.
export default function ChargementCoach() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#dbeafe,_#f8fafc_45%,_#eef2ff_70%,_#ffffff)] px-4 py-6">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-600 shadow-sm">
          Chargement du coach…
        </div>
      </div>
    </main>
  );
}
