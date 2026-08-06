// Encart accueil « Les maths en vrai » — la série « en vrai 974 » : des vidéos
// simulation (façon reel) qui expliquent l'île avec des maths dedans (l'eau, le
// lait...). L'ancrage hyper-local, c'est le moat : personne d'autre ne fait ça.
//
// Série éditoriale courte → épisodes en dur ici (pas de table) : pour publier un
// épisode, coller son URL YouTube dans EPISODES (url: null = carte « bientôt »).

const CHAINE_SABONNER = "https://www.youtube.com/@eleveai974?sub_confirmation=1";

type Episode = {
  emoji: string;
  titre: string;
  accroche: string;
  /** URL YouTube (youtu.be/…) — null tant que l'épisode n'est pas publié. */
  url: string | null;
};

const EPISODES: Episode[] = [
  {
    emoji: "💧",
    titre: "L'eau de La Réunion",
    accroche: "Il pleut 20 fois plus à l'Est qu'à l'Ouest. Pourquoi ? De l'océan jusqu'à ton robinet... et ta lampe.",
    url: "https://youtu.be/zLpqiueEIEc",
  },
  {
    emoji: "🥛",
    titre: "Le lait de la Plaine des Cafres",
    accroche: "10 litres de lait pour 1 seul kg de fromage. Du pré des hauts jusqu'à ton yaourt.",
    url: "https://youtu.be/UjblKadInPw",
  },
  {
    emoji: "🌀",
    titre: "Les cyclones",
    accroche: "L'œil, les vents, et le record du monde de pluie... à La Réunion ! Un cyclone à 900 km : quand touche-t-il l'île ?",
    url: "https://youtu.be/0WUIzfICz4o",
  },
  {
    emoji: "🌋",
    titre: "Le Piton de la Fournaise",
    accroche: "Un des volcans les plus actifs du monde ! La lave à 1 100 °C, et un volcan qui fabrique de la terre neuve.",
    url: "https://youtu.be/4f2U1RAgk_A",
  },
  {
    emoji: "🦈",
    titre: "Les requins",
    accroche: "Faut-il vraiment avoir peur ? Requins : ~10 morts/an ; la route : ~1 300 000. Et le requin garde le récif qui fait le lagon qui te protège.",
    url: "https://youtu.be/3bPBjYsRciA",
  },
  {
    emoji: "🌾",
    titre: "La canne à sucre",
    accroche: "Suis un planteur : sa canne devient du sucre... ET de la lumière (la bagasse fait de l'électricité). Et derrière, il y a des hommes.",
    url: "https://youtu.be/hH2N0Cvx-AI",
  },
  {
    emoji: "⚡",
    titre: "Le barrage de Takamaka",
    accroche: "L'eau tombe de 500 m et éclaire 48 000 familles — puis ressort intacte vers la rivière. Joue avec sur eleveai.fr/barrage !",
    url: "https://youtu.be/oyjfPzC4sKY",
  },
  {
    emoji: "🎬",
    titre: "Le principe du barrage (film d'animation)",
    accroche: "Le schéma s'anime dans l'ordre : la vanne, la chute de 500 m, la turbine, le générateur, les lignes — et 8 × 5 × 500 = 20 000 kW.",
    url: "https://youtu.be/yHCtKaj8TPw",
  },
];

// youtu.be/ID, youtube.com/watch?v=ID, /embed/ID… → l'identifiant seul.
function youtubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|v=|embed\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : null;
}

export default function MathsEtReunion() {
  return (
    <section className="px-4 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-cyan-300/25 bg-gradient-to-br from-emerald-400/[0.12] via-white/[0.03] to-sky-400/[0.06] p-6 sm:p-8">
        {/* En-tête */}
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="inline-flex flex-wrap items-center gap-2 rounded-full bg-cyan-300/20 px-3 py-1.5 text-xs font-black uppercase tracking-[0.15em] text-emerald-200">
              <span aria-hidden>🌋</span> La Réunion, en vrai
            </p>
            <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">
              Les maths <span className="text-cyan-300">en vrai</span>
            </h2>
            <p className="mt-1.5 max-w-2xl text-sm font-semibold leading-6 text-white/75">
              L&apos;île comme salle de classe : des vidéos animées qui expliquent
              ce qu&apos;on a <strong className="text-white">sous les yeux</strong>{" "}
              — la pluie, le lait, le volcan — avec des vraies maths dedans.
              Faites main à La Réunion, sans pub. 🦎
            </p>
          </div>
          <a
            href={CHAINE_SABONNER}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-black text-white shadow-lg transition hover:scale-105 hover:bg-red-500"
          >
            <span aria-hidden>▶</span> S&apos;abonner
          </a>
        </div>

        {/* Les épisodes */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {EPISODES.map((ep) => {
            const id = ep.url ? youtubeId(ep.url) : null;
            return id ? (
              <a
                key={ep.titre}
                href={`https://youtu.be/${id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-2xl border border-white/10 bg-black/40 transition hover:-translate-y-0.5 hover:border-cyan-300/40"
              >
                <div className="relative aspect-video w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
                    alt={ep.titre}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600/90 text-xl text-white shadow-xl transition group-hover:scale-110">
                      ▶
                    </span>
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-base font-black leading-snug text-white">
                    {ep.emoji} {ep.titre}
                  </p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-white/65">
                    {ep.accroche}
                  </p>
                </div>
              </a>
            ) : (
              <div
                key={ep.titre}
                className="overflow-hidden rounded-2xl border border-dashed border-white/20 bg-white/[0.04]"
              >
                <div className="flex aspect-video w-full items-center justify-center bg-gradient-to-br from-emerald-400/10 to-sky-400/10">
                  <div className="text-center">
                    <p className="text-4xl" aria-hidden>
                      {ep.emoji}
                    </p>
                    <p className="mt-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-black uppercase tracking-wide text-white/80">
                      🎬 Bientôt en ligne
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-base font-black leading-snug text-white">
                    {ep.emoji} {ep.titre}
                  </p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-white/65">
                    {ep.accroche}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pied */}
        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-bold text-white/80">
            🗺️ Épisodes suivants :{" "}
            <span className="text-white">le volcan, le lagon, le requin...</span>
          </p>
          <a
            href="/maths-974"
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-black text-white transition hover:bg-white/20"
          >
            🌋 Voir aussi : Maths Réel · 974
          </a>
        </div>
      </div>
    </section>
  );
}
