import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion",
  description: "Connexion a l'espace EleveAI.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
