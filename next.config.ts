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
    ];
  },
};

export default nextConfig;
