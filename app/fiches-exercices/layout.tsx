import PrintCorrections from "@/components/fiches/PrintCorrections";
import PontCoachFiches from "@/components/fiches/PontCoachFiches";

/**
 * Layout commun aux fiches d'EXERCICES (15/09/2026) — le même que celui des
 * fiches de cours : le pont vers le coach au pied de page (la feuille est une
 * porte, le coach est la destination), et le gestionnaire d'impression.
 * `PontCoachFiches` lit la matière et la classe dans l'adresse, aux mêmes
 * positions que sous /fiches-cours : il sert donc ici sans rien changer.
 */
export default function FichesExercicesLayout({
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
