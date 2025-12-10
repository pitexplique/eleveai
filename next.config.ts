/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Autorise le build même si ESLint trouve des erreurs
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
