// app/page.tsx
import { redirect } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  // La page d'entrée du site est l'accueil-journal. On TRANSMET la query :
  // les liens de campagne (?utm_source=...) arrivaient sur / et perdaient
  // leurs UTM dans ce redirect → trafic YouTube invisible dans les stats.
  const params = (await searchParams) ?? {};
  const qs = new URLSearchParams(
    Object.entries(params).flatMap(([k, v]) =>
      v === undefined ? [] : Array.isArray(v) ? v.map((x) => [k, x]) : [[k, v]],
    ) as [string, string][],
  ).toString();
  redirect(qs ? `/accueil?${qs}` : "/accueil");
}

