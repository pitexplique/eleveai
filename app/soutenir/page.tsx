// /soutenir — le bouton de don (05/11/2026). Frédéric : « si j'avais à vouloir
// encourager un site, je ferais un don ». Sans compte, sans abonnement.
// ⛔ Aucun lien depuis le coach ni le pied de page : le coach sert en classe, et
// un professeur ne sollicite pas ses élèves ni leurs familles.
import type { Metadata } from "next";
import { donDisponible } from "@/lib/stripe/serveur";
import { DONS_MONTANTS, DON_MAX, DON_MIN } from "@/lib/tarifs";
import SoutenirClient from "./SoutenirClient";

export const metadata: Metadata = {
  title: "Soutenir EleveAI",
  description: "Encourager EleveAI par un don, sans compte et sans abonnement.",
  robots: { index: false, follow: false },
};

export default async function Page({ searchParams }: { searchParams: Promise<{ merci?: string }> }) {
  const { merci } = await searchParams;
  return (
    <SoutenirClient ouvert={donDisponible()} merci={merci === "1"} montants={DONS_MONTANTS} min={DON_MIN} max={DON_MAX} />
  );
}
