/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: "/coach-maths-ia",
        destination: "/coach-ia/maths",
        permanent: true,
      },
      // Renommage cartes-vacances → cahier-vacances-cartes (09/07/2026) :
      // 301 pour préserver l'indexation et les liens déjà partagés/imprimés.
      {
        source: "/cartes-vacances",
        destination: "/cahier-vacances-cartes",
        permanent: true,
      },
      {
        source: "/cartes-vacances/:slug*",
        destination: "/cahier-vacances-cartes/:slug*",
        permanent: true,
      },
      // ── Adresses courtes « dites à voix haute » (15/07/2026) ──────────────
      // Le public YouTube TAPE l'adresse (les Shorts n'ont plus de liens
      // cliquables) → une adresse courte par épisode/destination, avec UTM
      // pour ENFIN mesurer ce que les vidéos amènent (sinon tout finit en
      // trafic « Direct » invisible). 302 (pas 301) : on peut repointer une
      // campagne sans se battre avec le cache des navigateurs.
      // Épisodes « en vrai » → la Une du journal (l'article les attend).
      // ⚠️ Destination /accueil DIRECT (pas /) : la redirection / → /accueil de
      // app/page.tsx perdait les UTM en route (constaté en prod le 16/07).
      ...["eau", "lait", "cyclones", "volcan", "requins", "canne"].map(
        (ep) => ({
          source: `/${ep}`,
          destination: `/accueil?utm_source=youtube&utm_medium=video&utm_campaign=${ep}`,
          permanent: false,
        }),
      ),
      // Les deux destinations phares à dire dans TOUTES les vidéos.
      {
        source: "/cahier",
        destination:
          "/cahier-vacances?utm_source=youtube&utm_medium=video&utm_campaign=cahier",
        permanent: false,
      },
      {
        source: "/coach",
        destination:
          "/coach-ia/maths?utm_source=youtube&utm_medium=video&utm_campaign=coach",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
