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

// ⭐ REFONTE DU 23/09/2026 — L'ACCUEIL PASSE À LA CONSTRUCTION D'IXL.
// Frédéric, après avoir regardé la maquette sur /accueil-2 : « bcp plus clair »,
// « remplace accueil par accueil 2 ». Une ligne de matières, une ligne
// d'actions, un bandeau dessiné, et le coach de maths ouvert par défaut.
// ✅ ET AccueilIA.tsx EST SUPPRIMÉ (23/09/2026, le soir même). Frédéric :
// « tu peux supprimer AccueilIA.tsx, on reste sur notre version » — après le
// verdict qui compte, celui de sa fille devant l'écran : « là on comprend de
// suite ». La même qui disait le 09/09 « je voulais réviser les pourcentages,
// je ne savais pas où aller ».
// ⚠️ LE RETOUR ARRIÈRE N'EST DONC PLUS UNE LIGNE : il passe par l'historique,
//     git show 0925f01f:app/accueil/AccueilIA.tsx > app/accueil/AccueilIA.tsx
// (n'importe quel commit antérieur à la suppression fait l'affaire). C'est la
// même manœuvre que pour AccueilClient.tsx, supprimé le 14/08 — et la raison
// est la même : un fichier que plus personne ne monte est relu à chaque
// typecheck et se périme en silence.
import AccueilMatieres from "./AccueilMatieres";

// ⭐ LES MÉTADONNÉES VIVENT DANS ./metadata.ts, ET NULLE PART AILLEURS.
// Elles étaient écrites ici en dur pendant qu'un fichier metadata.ts existait à
// côté, jamais importé, annonçant un autre titre. Deux vérités pour un seul
// écran, dont une fausse. Un seul endroit désormais — et c'est là qu'on lit
// pourquoi le titre est en `absolute` et pourquoi cette page porte la seule
// canonique posée à la main du site.
export { metadata } from "./metadata";

export default function AccueilPage() {
  return <AccueilMatieres />;
}
