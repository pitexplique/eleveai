import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPlanche, PLANCHES } from "@/lib/defis-ti-margo/planches";
import PlancheClient from "./PlancheClient";

export function generateStaticParams() {
  return PLANCHES.map((p) => ({ planche: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ planche: string }> }): Promise<Metadata> {
  const { planche } = await params;
  const p = getPlanche(planche);
  if (!p) return {};
  return {
    title: p.titreSeo,
    description: p.description,
    alternates: { canonical: `/defis-ti-margo/${p.slug}` },
  };
}

export default async function PlanchePage({ params }: { params: Promise<{ planche: string }> }) {
  const { planche } = await params;
  if (!getPlanche(planche)) notFound();
  return <PlancheClient slug={planche} />;
}
