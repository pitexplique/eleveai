import { permanentRedirect } from "next/navigation";

// La carte mentale a sa propre adresse depuis le 27/10/2026 (hub /cartes-mentales).
export default async function AncienneAdresse({ params }: { params: Promise<{ classe: string; notion: string }> }) {
  const { classe, notion } = await params;
  permanentRedirect(`/cartes-mentales/maths/${classe}/${notion}`);
}
