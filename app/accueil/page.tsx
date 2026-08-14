// app/accueil/page.tsx
//
// REFONTE DU 06/08/2026 — l'accueil n'est plus un journal, c'est une entrée.
//
// Ce que cette page ne fait plus, et c'est tout l'objet du changement : elle
// lançait SEPT requêtes Supabase avant d'afficher quoi que ce soit (les avis,
// maths_974, le catalogue, la Une, les articles deux fois, les élèves à
// l'honneur), puis montait 3 400 lignes de journal — manchette, oreilles, Une,
// courrier, édito, machines, dictée, défis, témoignages, offres. Un visiteur
// qui voulait réviser les fractions téléchargeait tout ça d'abord.
//
// Maintenant : zéro requête, zéro donnée distante, une seule question.
// La page devient statique et légère — ce qui compte double, puisque le quota
// Vercel se paie au poids du HTML relu (1 unité = 8 Ko, par visite servie).
//
// AccueilClient.tsx est resté sur le disque du 06/08 au 14/08, plus importé mais
// toujours relu à chaque typecheck. Supprimé le 14/08 : les rubriques gardent
// leurs routes, et leurs entrées dans lib/matrice/ressources.ts les rendent
// trouvables par « Dis-nous ce que tu cherches ». Elles ne sont plus imposées à
// tout le monde : elles sont proposées à qui les demande.
//
// ⚠️ CE QUI EST PARTI AVEC LUI ET N'A PAS D'AUTRE ÉCRAN — à ressortir de
// l'historique (git show 03aec7ac:<chemin> — le dernier état où tout existait
// encore) le jour où on leur refait une place :
//   — le formulaire public d'abonnement à la newsletter (AbonnementJournal →
//     POST /api/newsletter/subscribe, route toujours vivante mais sans appelant :
//     un visiteur non inscrit ne peut plus s'abonner) ;
//   — « le chiffre du jour » (19 chiffres vérifiés, lib/chiffre-du-jour.ts) ;
//   — la reco du jour (RecoDuJourAccueil ; /api/profil-eleve calcule toujours) ;
//   — l'affichage public de la régie : l'édito, la Une (journal_une) et « un peu
//     de maths » (journal_articles) s'écrivent encore dans /admin/journal et
//     /admin/articles, mais plus aucune page ne les lit.

import AccueilIA from "./AccueilIA";

// ⭐ LES MÉTADONNÉES VIVENT DANS ./metadata.ts, ET NULLE PART AILLEURS.
// Elles étaient écrites ici en dur pendant qu'un fichier metadata.ts existait à
// côté, jamais importé, annonçant un autre titre. Deux vérités pour un seul
// écran, dont une fausse. Un seul endroit désormais — et c'est là qu'on lit
// pourquoi le titre est en `absolute` et pourquoi cette page porte la seule
// canonique posée à la main du site.
export { metadata } from "./metadata";

export default function AccueilPage() {
  return <AccueilIA />;
}
