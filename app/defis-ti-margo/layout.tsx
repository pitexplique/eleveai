// app/defis-ti-margo/layout.tsx
//
// ⭐ La rubrique a SA présentation, « comme une BD » (Frédéric, 26/09 : « le CSS
// doit être différent ») : un fond clair de prairie, l'encre brune, et deux
// polices —
// - Andika, dessinée pour les enfants qui apprennent à lire (le « a » et le « g »
//   s'écrivent comme à l'école) : le texte des bulles ;
// - Fredoka, ronde et joyeuse : les titres, les touches, les étiquettes.

import { Andika, Fredoka } from "next/font/google";

const andika = Andika({ subsets: ["latin"], weight: ["400", "700"], variable: "--police-texte" });
const fredoka = Fredoka({ subsets: ["latin"], weight: ["500", "700"], variable: "--police-titre" });

export default function DefisLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${andika.variable} ${fredoka.variable} min-h-screen`} style={{ background: "#f4fbef", fontFamily: "var(--police-texte), system-ui, sans-serif" }}>
      <style>{`
        .defis .font-titre { font-family: var(--police-titre), system-ui, sans-serif; }
        /* La pointe de la bulle : vers le haut sur téléphone (la bulle est sous le dessin), vers la gauche ailleurs. */
        .bulle-bd::before { content: ''; position: absolute; left: 28px; top: -26px; border: 12px solid transparent; border-bottom: 22px solid #3b2a1a; }
        .bulle-bd::after { content: ''; position: absolute; left: 32px; top: -15px; border: 8px solid transparent; border-bottom: 16px solid #fff; }
        @media (min-width: 640px) {
          .bulle-bd::before { left: -24px; top: 38px; border: 14px solid transparent; border-right: 22px solid #3b2a1a; }
          .bulle-bd::after { left: -15px; top: 42px; border: 10px solid transparent; border-right: 16px solid #fff; }
        }
      `}</style>
      {children}
    </div>
  );
}
