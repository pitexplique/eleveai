import BoiteAOutils from "@/components/BoiteAOutils";

/**
 * Layout des fiches de cours de maths : ajoute la boîte à outils flottante
 * (calculatrice) sur toutes les fiches maths d'un seul coup. Toutes les pages
 * sous fiches-cours/maths/ sont des maths → pas besoin de filtrer la matière.
 */
export default function FichesMathsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <BoiteAOutils />
    </>
  );
}
