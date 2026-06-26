import PrintCorrections from "@/components/fiches/PrintCorrections";

/**
 * Layout commun aux cahiers de vacances. Réutilise le gestionnaire des fiches
 * de cours qui ouvre réellement les corrigés (`.fiche-correction`) avant
 * impression / export PDF, puis les referme après.
 */
export default function CahierVacancesLayout({
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
