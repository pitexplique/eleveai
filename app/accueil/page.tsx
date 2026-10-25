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
import AccueilMatieres from "./AccueilMatieres";
import JournalClient from "../accueil-journal/JournalClient";
import { donneesDuJournal } from "../accueil-journal/donnees";
import AccueilCoach, { type VideoVitrine } from "./AccueilCoach";
import { toutesLesVideos, urlR2, type VideoR2 } from "@/lib/videos/r2";
import { CLASSES_PAYS, PAYS, programmesDuPays } from "@/lib/programmes-pays/pays";

// ⭐ LES MÉTADONNÉES VIVENT DANS ./metadata.ts, ET NULLE PART AILLEURS.
// Elles étaient écrites ici en dur pendant qu'un fichier metadata.ts existait à
// côté, jamais importé, annonçant un autre titre. Deux vérités pour un seul
// écran, dont une fausse. Un seul endroit désormais — et c'est là qu'on lit
// pourquoi le titre est en `absolute` et pourquoi cette page porte la seule
// canonique posée à la main du site.
export { metadata } from "./metadata";

export const revalidate = 3600;

/** Le dossier de R2 → la classe du coach (`/coach-ia/maths?classe=…`). */
const CLASSE_DU_DOSSIER: Record<string, string> = {
  terminale: "terminale-spe",
  premiere: "premiere-spe",
  "premiere-commun": "premiere",
  seconde: "seconde",
  stmg: "stmg",
  "3e": "3e",
  "4e": "4e",
  "5e": "5e",
  "6e": "6e",
  cm2: "cm2",
  cm1: "cm1",
  cp: "cp",
};
const DEHORS = new Set(["974", "maths-en-vrai"]);

/* Comme sur le journal : seulement des paysages AVEC miniature (sinon la
   vignette est souvent un écran noir). */
const vitrine = (v: VideoR2): VideoVitrine => ({ id: v.id, titre: v.titre, vignette: urlR2(v.vignette!) });
const montrable = (v: VideoR2) => !v.short && Boolean(v.poster) && Boolean(v.vignette);

/** `n` vidéos qui avancent chaque jour dans la liste, en boucle. */
function duJour(liste: VideoR2[], jour: number, n: number): VideoVitrine[] {
  if (liste.length === 0) return [];
  const debut = (jour * n) % liste.length;
  return Array.from({ length: Math.min(n, liste.length) }, (_, i) => vitrine(liste[(debut + i) % liste.length]));
}

export default function AccueilPage() {
  const journal = donneesDuJournal();
  const toutes = toutesLesVideos();
  const parClasse: Record<string, VideoVitrine[]> = {};
  for (const [dossier, classe] of Object.entries(CLASSE_DU_DOSSIER)) {
    const liste = toutes.filter((v) => v.fichier.split("/")[0] === dossier && montrable(v));
    parClasse[classe] = duJour(liste, journal.jour, 4);
  }
  const dehors = duJour(
    toutes.filter((v) => DEHORS.has(v.fichier.split("/")[0]) && montrable(v)),
    journal.jour,
    4,
  );
  const totalVideos = toutes.filter((v) => v.vignette && !v.fichier.startsWith("atelier-video-essais")).length;

  // Les classes de chaque pays proposé, calculées ICI (serveur) : les matrices
  // sont lourdes, le navigateur ne reçoit que la clé, le nom court et la classe
  // française qui correspond (null = pas encore de matrice → grisée).
  const classesPays = Object.fromEntries(
    PAYS.map((info) => {
      const programmes = programmesDuPays(info.slug);
      return [
        info.slug,
        CLASSES_PAYS[info.slug].map((g) => ({
          titre: g.titre,
          classes: g.classes.map((c) => ({
            cle: c.cle,
            court: c.court,
            eq: programmes.find((p) => p.cle === c.cle)?.equivalentFrance ?? null,
          })),
        })),
      ];
    }),
  );

  return (
    <AccueilCoach
      totalVideos={totalVideos}
      parClasse={parClasse}
      classesPays={classesPays}
      dehors={dehors}
      une={journal.une.paysage ? { ...journal.une.paysage, classe: journal.une.classe } : null}
      defi={journal.defi}
      metier={journal.metier}
    />
  );
}