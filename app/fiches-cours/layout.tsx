import PrintCorrections from "@/components/fiches/PrintCorrections";

/**
 * Layout commun à toutes les fiches de cours (maths, IA, …). Monte le gestionnaire
 * qui ouvre les corrections avant impression/PDF (voir PrintCorrections).
 */
export default function FichesCoursLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <PrintCorrections />
    </>
  );
}
