import type { Metadata } from "next";

// ⭐ LA CONNEXION ENTRE DANS L'INDEX (21/08/2026).
//
// Elle était en `noindex`, et c'est pour ça que « Connexion » n'apparaissait
// dans aucune rubrique de marque, ni chez Google ni chez Bing. Frédéric l'a
// remarqué en comparant avec IXL — chez qui « Connexion » est la DEUXIÈME
// rubrique, avec une description qui vend le produit au lieu de dire
// « connectez-vous ». Une page de connexion peut donc parfaitement être une
// rubrique : elle est liée depuis toutes les pages du site, et c'est ce qui
// compte.
//
// ⚠️ Et il y avait une contradiction ouverte : `/auth/signin-eleve` est au
// sitemap (priorité 0,8) et redirige ici — le site annonçait donc à Google une
// adresse qui mène à une page interdite d'index.
//
// Rien de privé ne s'affiche ici : c'est un formulaire d'e-mail. Le contenu
// derrière la connexion, lui, reste hors index (voir `/dashboard-eleve`).
//
// La description suit la forme d'IXL, relevée le 21/08 : ce que c'est d'abord,
// puis les mots qu'on tape. ⚠️ Elle nomme ce que la page NE MONTRE PAS — c'est
// assumé ici, mais rien ne garantit que Google la retienne plutôt que le texte
// à l'écran (leçon du 08/08, voir `app/accueil/metadata.ts`).
export const metadata: Metadata = {
  title: "Se connecter",
  description:
    "EleveAI, des exercices corrigés du CP au Bac : coachs de maths, français, anglais, espagnol et IA, parcours, dictée du jour et suivi de la progression.",
  alternates: { canonical: "https://www.eleveai.fr/auth/signin" },
  robots: { index: true, follow: true },
};

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
