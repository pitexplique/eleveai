import PrintCorrections from "@/components/fiches/PrintCorrections";
import PontCoachFiches from "@/components/fiches/PontCoachFiches";

/**
 * Layout commun à toutes les fiches de cours (maths, IA, …). Monte le gestionnaire
 * qui ouvre les corrections avant impression/PDF (voir PrintCorrections) et le
 * pont vers le coach au pied de chaque fiche (règle 24/07 : la fiche est une
 * porte, le coach est la destination).
 */
export default function FichesCoursLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <PontCoachFiches />
      <PrintCorrections />
    </>
  );
}
