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
// ⭐⭐ REFONTE DU 18/10/2026 — L'ACCUEIL DEVIENT UN JOURNAL POUR LA JEUNESSE.
// Frédéric, à 72 % de rebond : « refonder la page d'accueil comme un journal,
// avec vidéos, coach », « pour la jeunesse », « et les adultes », pour « qu'un
// jeune, un prof se dise : je vais apprendre une chose utile, ou m'entraîner »,
// et « avoir une perspective d'avenir ». Trois mises en page proposées sur
// /accueil-journal ; il a choisi le QUOTIDIEN.
// 👉 RETOUR ARRIÈRE = UNE LIGNE : `<AccueilMatieres />` au lieu de
// `<JournalClient … accueil />` (le fichier est resté, avec son import).
// ⚠️ La page n'est plus statique : elle est régénérée toutes les heures
// (`revalidate`), pour que la Une, le défi, le chiffre et le métier changent
// chaque jour. 24 rendus par jour, pas un par visiteur.
// ⚠️ Les liens portent toujours `?from=accueil` : la mesure des départs
// continue. Les clics se lisent aussi dans l'événement Vercel `journal_clic`
// {rubrique, page: "accueil"}.
// ⭐⭐⭐ REFONTE DU 23/10/2026 — « LE COACH QUI SUIT TON PROGRAMME ET TES PROGRÈS ».
// Après le business plan, Frédéric : « propose une page d'accueil valable dans
// 2 ans », « comme si les 3 500 vidéos étaient déjà faites ». Maquette sur
// /accueil-nouveau, puis : « on avait appelé ça le Journal d'EleveAI, il faut
// le renommer, ça n'a plus rien à voir », et « tu remplaces carrément la page
// accueil ». Dans deux ans, l'explication sera offerte par toutes les IA :
// l'accueil vend le PROGRAMME DU PAYS, des vidéos VÉRIFIÉES PAR UN PROFESSEUR
// et un coach qui SUIT l'élève. Le journal se plie en trois cases (Une, défi,
// métier) — mêmes données que lui, donc il change toujours chaque jour.
// 👉 RETOUR ARRIÈRE = UNE LIGNE : `<JournalClient {...donneesDuJournal()} accueil />`
// (le journal reste aussi en maquette sur /accueil-journal).
// ⭐ Les compteurs sont CALCULÉS : « 900+ vidéos » aujourd'hui, « 3 500 » le
// jour où elles seront sur R2, sans retoucher la page.
// ⛔ Fond blanc forcé dans AccueilCoach : en mode sombre, sans fond posé, le
// navigateur peignait la page en noir (Frédéric, 23/10 : « on voit rien »).
// ⭐⭐⭐⭐ REFONTE DU 31/10/2026 — « LE COACH QUI SUIT CHAQUE ÉLÈVE ».
// Frédéric : « quand je tape dans Google "fais-moi une fiche de cours sur
// Pythagore en PDF", il me la génère » → on ne met plus les fiches en vitrine,
// on met le SUIVI (micro-compétences, vidéos, résultats gardés, le prof qui voit
// les erreurs de ses classes), façon IXL. Maquette sur /accueil/nouvelle, puis :
// « change accueil comme nouvelle, sauf que tu enlèves "en préparation" tant
// que je n'ai pas le feu vert du rectorat ».
// 👉 LE CONTENU VIT DANS ./AccueilSuivi.tsx ; `offresFamille={false}` ici.
// ⛔ Ne passer `offresFamille` à vrai qu'avec l'accord ÉCRIT du rectorat (cumul).
// 👉 RETOUR ARRIÈRE : l'accueil du 23/10 (AccueilCoach + journal plié) est
// entier dans le commit 3104f1c2 :
//     git show 3104f1c2:app/accueil/page.tsx > app/accueil/page.tsx
// (AccueilCoach.tsx, AccueilMatieres.tsx et le journal restent sur le disque).
// ⚠️ Les liens ne portent plus `?from=accueil` : la mesure des départs depuis
// l'accueil s'arrête avec cette version (à remettre si on veut la suivre).
import AccueilSuivi from "./AccueilSuivi";

// ⭐ LES MÉTADONNÉES VIVENT DANS ./metadata.ts, ET NULLE PART AILLEURS.
export { metadata } from "./metadata";

// Les compteurs (micro-compétences, vidéos) se recalculent toutes les heures.
export const revalidate = 3600;

export default function AccueilPage() {
  return <AccueilSuivi offresFamille={false} />;
}
