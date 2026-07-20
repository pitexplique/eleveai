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
      // Le simulateur : l'adresse qui se dit à voix haute (radio, vidéos,
      // quotidiens). Sans UTM : c'est un raccourci d'usage, pas une campagne.
      {
        source: "/cyclone",
        destination: "/simulateur-cyclone",
        permanent: false,
      },
      {
        source: "/sucre",
        destination: "/simulateur-sucre",
        permanent: false,
      },
      // ⚠️ /lait est déjà pris (adresse YouTube de l'épisode, avec UTM) →
      // la fromagerie se dit « eleveai.fr/fromage ».
      {
        source: "/fromage",
        destination: "/simulateur-fromage",
        permanent: false,
      },
      // ⚠️ /eau est déjà pris (adresse YouTube de l'épisode) → le barrage se
      // dit « eleveai.fr/barrage ».
      {
        source: "/barrage",
        destination: "/simulateur-barrage",
        permanent: false,
      },
      // ⚠️ /volcan est déjà pris (adresse YouTube de l'épisode) → la machine
      // se dit « eleveai.fr/fournaise ».
      {
        source: "/fournaise",
        destination: "/simulateur-volcan",
        permanent: false,
      },
      // Le lagon de l'Ermitage : l'adresse libre (aucun épisode YouTube ne
      // l'occupe) → la machine se dit « eleveai.fr/lagon ».
      {
        source: "/lagon",
        destination: "/simulateur-lagon",
        permanent: false,
      },
      // La machine des epsilons (7e) — née du dessin du fondateur (20/07) :
      // « activer des epsilons peut engendrer des infinis ».
      {
        source: "/epsilon",
        destination: "/simulateur-epsilon",
        permanent: false,
      },
      // Instagram ne donne qu'un lien (la bio) et le public tape l'adresse :
      // /insta = la porte Instagram, mesurable (lancement du journal, 16/07).
      {
        source: "/insta",
        destination:
          "/accueil?utm_source=instagram&utm_medium=social&utm_campaign=journal",
        permanent: false,
      },
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
