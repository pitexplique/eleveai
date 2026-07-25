import PrintCorrections from "@/components/fiches/PrintCorrections";

/**
 * Layout commun aux kits de survie. Monte le gestionnaire qui ouvre les
 * corrections (<details class="fiche-correction">) avant impression/PDF —
 * même mécanique que les fiches de cours et les cahiers de vacances.
 */
export default function KitDeSurvieLayout({
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
