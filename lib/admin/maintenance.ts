// lib/admin/maintenance.ts
//
// Checklist de maintenance affichée dans le dashboard admin. Source de vérité
// versionnée : édite cette liste pour ajouter/retirer une tâche. Le rendu (cases
// à cocher qui se remettent à zéro chaque jour / semaine) est dans
// app/admin/dashboard/MaintenanceChecklist.tsx.
//
// Esprit : attraper tôt les petites dérives (contenu saisonnier périmé, messages
// sans réponse, SQL non exécuté, élèves qui décrochent…) avant qu'elles ne
// deviennent des bugs visibles — cf. le libellé « Grand Raid » resté figé.

export type TacheMaintenance = {
  id: string; // stable : sert de clé de cochage (ne pas réutiliser un id supprimé)
  label: string;
  detail?: string;
  href?: string; // lien direct vers l'endroit à vérifier (optionnel)
};

// ── À faire CHAQUE JOUR (se recoche à zéro à minuit) ──────────────────────────
export const MAINTENANCE_QUOTIDIEN: TacheMaintenance[] = [
  {
    id: "messages",
    label: "Lire et répondre aux messages",
    detail: "Élèves (« Écris-moi »), parents, contacts — répondre aux nouveaux.",
  },
  {
    id: "defi-du-jour",
    label: "Vérifier le défi du jour",
    detail: "Il s'affiche, le bon thème, pas d'erreur, l'énoncé se lit bien.",
    href: "/defis-du-jour",
  },
  {
    id: "dictee-du-jour",
    label: "Vérifier la dictée du jour",
    detail: "Les mots se prononcent (TTS) et le score fonctionne.",
    href: "/dictee-du-jour",
  },
  {
    id: "accueil",
    label: "Jeter un œil à l'accueil",
    detail: "Rien de cassé, bannières et « ta journée » OK.",
    href: "/accueil",
  },
  {
    id: "stats",
    label: "Regarder l'activité du jour",
    detail: "Élèves connectés / actifs — repérer une chute anormale.",
  },
];

// ── À vérifier CHAQUE SEMAINE (se recoche à zéro le lundi) ─────────────────────
export const MAINTENANCE_HEBDO: TacheMaintenance[] = [
  {
    id: "contenu-saisonnier",
    label: "Fraîcheur des contenus saisonniers",
    detail:
      "Thème des défis, bannières et messages d'accueil : aucun libellé périmé (ex. « Grand Raid » resté après le passage à un autre thème).",
  },
  {
    id: "nouveaute",
    label: "Mettre en avant une nouveauté",
    detail: "Le « chaque semaine, une nouveauté » de l'accueil : en publier une.",
  },
  {
    id: "avis",
    label: "Relire les nouveaux avis / retours",
    detail: "Modérer, valoriser, corriger les bugs remontés.",
    href: "/admin/retours",
  },
  {
    id: "inactifs",
    label: "Repérer les élèves qui décrochent",
    detail: "Statut 🟠 ralenti / 🔴 inactif sur le dashboard prof — ré-engager.",
  },
  {
    id: "sql-en-attente",
    label: "SQL en attente ?",
    detail:
      "Une nouvelle feature livrée attend-elle un script SQL à exécuter en base (dossier supabase/) ?",
  },
  {
    id: "catalogue",
    label: "Contrôler le catalogue /explorer",
    detail: "Liens actifs, descriptions à jour, rien de cassé.",
    href: "/explorer",
  },
  {
    id: "export-retours",
    label: "Exporter les retours (sauvegarde)",
    detail: "Export CSV des retours élèves depuis la page dédiée.",
    href: "/admin/retours",
  },
];
