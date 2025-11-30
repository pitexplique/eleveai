import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://eleveai.vercel.app/", lastModified: new Date() },
    { url: "https://eleveai.vercel.app/espace-prof" },
    { url: "https://eleveai.vercel.app/espace-eleve" },
    { url: "https://eleveai.vercel.app/parents" },
    { url: "https://eleveai.vercel.app/espace-administration" },
    { url: "https://eleveai.vercel.app/offre-pilote" },
  ];
}
