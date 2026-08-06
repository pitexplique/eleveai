/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      // /ia a été le banc d'essai de la nouvelle entrée (05/08/2026), le temps
      // de la comparer à l'ancien accueil sans y toucher. Le 06/08 l'entrée EST
      // devenue l'accueil : garder les deux, c'était deux pages à faire vivre
      // pour un seul geste, et celle du test n'avait même plus la colonne.
      // 301 plutôt qu'une 404 : la page était en noindex, donc rien à sauver
      // côté moteurs, mais elle a tourné deux jours et quelqu'un peut l'avoir
      // en marque-page ou l'avoir passée à un collègue.
      {
        source: "/ia",
        destination: "/",
        permanent: true,
      },
      // Renommage kit-de-survie → guide-de-survie (26/07/2026) : l'ancienne
      // URL a vécu ~1 jour dans le sitemap et l'accueil — 301 pour préserver
      // l'indexation et les liens déjà partagés (même règle que cartes-vacances).
      {
        source: "/kit-de-survie",
        destination: "/guide-de-survie",
        permanent: true,
      },
      {
        source: "/kit-de-survie/:slug*",
        destination: "/guide-de-survie/:slug*",
        permanent: true,
      },
      {
        source: "/coach-maths-ia",
        destination: "/coach-ia/maths",
        permanent: true,
      },
      // Vieille page « Mode Coach » (janvier 2026), indexée par Bing/Google
      // mais dépassée par le vrai coach : 301 vers la destination actuelle
      // (constat du 25/07 en analysant la SERP de marque).
      {
        source: "/espace-eleves/coach",
        destination: "/coach-ia/maths",
        permanent: true,
      },
      // Nettoyage SERP de marque (25/07) — Google servait en sitelinks deux
      // pages d'un autre âge : /eleves (page « générateur » sans aucun lien
      // interne entrant) et /concours-ia (pilote de décembre 2025, sans
      // metadata — Google improvisait le libellé « Connexion » — et avec un
      // lien mort vers /concours). Une seule vitrine élève : /espace-eleves.
      {
        source: "/eleves",
        destination: "/espace-eleves",
        permanent: true,
      },
      {
        source: "/concours-ia",
        destination: "/espace-eleves",
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
      // L'hôtel (05/08) — née d'une rencontre à Terre-Sainte : le métier
      // d'hôtelier en pourcentages. L'adresse se dit à voix haute au comptoir
      // d'une réception.
      {
        source: "/hotel",
        destination: "/simulateur-hotel",
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
      // /effort = l'adresse du Reel « à deux » avec le coach sportif de
      // Saint-Pierre (24/07). Elle visait la Diagonale faute de mieux ; depuis
      // que la salle de sport a SA machine, elle y va directement.
      // utm_source=instagram : c'est SON réseau, on mesure ce qu'il apporte.
      {
        source: "/effort",
        destination:
          "/simulateur-energie?utm_source=instagram&utm_medium=video&utm_campaign=effort",
        permanent: false,
      },
      // L'adresse qui se dit à voix haute dans la salle.
      {
        source: "/muscle",
        destination: "/simulateur-energie",
        permanent: false,
      },
      // L'anglais du jour (25/07) — « 5 mots par jour », niveaux A1→B2, puisé
      // dans le coach. Adresses courtes pour le dire à voix haute.
      { source: "/mots", destination: "/anglais-du-jour", permanent: false },
      { source: "/anglais", destination: "/anglais-du-jour", permanent: false },
      { source: "/repertoire-anglais", destination: "/anglais-du-jour", permanent: false },
      { source: "/espagnol", destination: "/espagnol-du-jour", permanent: false },
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
