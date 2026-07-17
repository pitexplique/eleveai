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
    label: "La Une du matin (le rituel du rédac' chef)",
    detail:
      "Avec le café : le chiffre du jour, le carrousel, la réclame — rien de périmé, rien de cassé. 5 minutes.",
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
  // — Le bouclage du rédacteur en chef (le journal) —
  {
    id: "regie-bouclage",
    label: "Le bouclage de la régie (la Une de la semaine)",
    detail:
      "Réordonner les slides, masquer le périmé : un événement passé (ex. Rendez-vous des Baleines après le 26/07), un « merci » qui a fait son temps. Publication immédiate.",
    href: "/admin/journal",
  },
  {
    id: "honneur-rotation",
    label: "Faire tourner les prénoms à l'honneur",
    detail:
      "Les 3 mis à l'honneur de la semaine (idée, bug, détail) — la liste est en code (lib/ameliorations/aLHonneur.ts) : donner les nouveaux prénoms à l'assistant.",
  },
  {
    id: "newsletter-dossier",
    label: "Envoyer le dossier de la semaine",
    detail:
      "La newsletter aux abonnés du coupon : l'épisode + le défi + une nouveauté. Test à soi-même d'abord, puis envoi.",
    href: "/admin/newsletter",
  },
  {
    id: "instagram-posts",
    label: "Programmer 2-3 posts Instagram",
    detail:
      "Le chiffre du jour, le défi, la Une en visuel — lien de bio : eleveai.fr/insta (mesurable dans l'onglet UTM de Vercel).",
  },
  {
    id: "edito-fraicheur",
    label: "L'édito est-il encore juste ?",
    detail:
      "Relire « Pourquoi ce journal » : toujours vrai, toujours à jour ? Le rafraîchir quand il vieillit.",
    href: "/accueil",
  },
  // — La maintenance générale —
  {
    id: "contenu-saisonnier",
    label: "Fraîcheur des contenus saisonniers",
    detail:
      "Thème des défis, bannières et messages d'accueil : aucun libellé périmé (ex. « Grand Raid » resté après un changement de thème). À la RENTRÉE : repasser le drapeau EN_VACANCES à false (lib/profil-eleve/computeProfil.ts) — sinon la reco propose encore le cahier de vacances.",
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
    id: "funnel-cahier",
    label: "Suivre le funnel cahier de vacances",
    detail:
      "KPI « Inscrits via le cahier » (source=cahier-vacances) + consentements newsletter, ci-dessus sur ce dashboard. Doit décoller depuis que le QR est en couverture des cahiers. Si ça reste à 0 malgré des scans / du trafic cahier, le tracking ?from=cahier est peut-être cassé — à vérifier.",
    href: "/admin/dashboard",
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
