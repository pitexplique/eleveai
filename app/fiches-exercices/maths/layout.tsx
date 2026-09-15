import BoiteAOutils from "@/components/BoiteAOutils";

/** La calculatrice flottante sur toutes les feuilles d'exercices de maths —
 *  les problèmes demandent une valeur approchée de e^{-2} ou de e^{0,5}. */
export default function FichesExercicesMathsLayout({
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
