/** @type {import('next').NextConfig} */
const nextConfig = {
  // ⛔ DEUX SERVEURS DE DÉVELOPPEMENT, UN SEUL DOSSIER `.next` (24/08/2026).
  //
  // Deux postes travaillent sur ce dépôt en même temps — les maths le matin, le
  // français le soir. Chacun lance `npm run dev`, et le second prend un autre
  // port parce que le 3000 est occupé : jusque-là tout va bien. Mais les deux
  // écrivent leurs modules compilés dans le MÊME `.next`, et se les écrasent.
  //
  // Ce que ça donne, mesuré aujourd'hui : des 404 sur des routes qui existent,
  // des 500 sur `/favicon.ico` et `/_document`, un « Cannot read properties of
  // undefined (reading 'call') » au fond d'un chunk webpack — et tout cela par
  // intermittence, donc impossible à rapporter à sa cause. Une fournée de PDF
  // s'y est arrêtée deux fois, et a même écrit le PDF d'une page 404.
  //
  // NEXT_DIST_DIR donne au second serveur son propre dossier :
  //     NEXT_DIST_DIR=.next-francais npm run dev
  // Sans la variable, rien ne change pour personne.
  distDir: process.env.NEXT_DIST_DIR || ".next",

  eslint: {
    ignoreDuringBuilds: true,
  },

  // ⚠️ LES POLICES DE PDFKIT, SANS QUOI LE PDF MARCHE EN LOCAL ET CASSE EN
  // PRODUCTION — ce qui est la pire des deux situations (13/08/2026).
  //
  // `/api/photo-cours/livre` fabrique le PDF du cours photographié avec pdfkit.
  // Celui-ci lit les métriques de ses polices standard (Helvetica, Times) dans
  // des fichiers .afm livrés avec le paquet, via un `readFileSync` calculé À
  // L'EXÉCUTION. Or le tracing de Next ne suit que les `import` : il ne peut
  // pas deviner ce chemin, n'embarque pas le dossier, et la fonction serverless
  // se retrouve sans police — « ENOENT Helvetica.afm » à la première requête.
  //
  // 636 Ko pour cette seule route. C'est le prix d'un PDF qui s'ouvre.
  outputFileTracingIncludes: {
    "/api/photo-cours/livre": ["./node_modules/pdfkit/js/data/**"],
  },
  async redirects() {
    return [
      // ─── Les fiches de maths de 4e et de 3e, éteintes le 21/08/2026 ───────
      // Cinq fiches de juin (Pythagore, cosinus, statistiques, probabilités,
      // Thalès), restées seules de leur niveau et jamais reprises au standard
      // du 19/08 : aucune propriété illustrée, aucun dessin hors des exemples.
      // Frédéric : « on éteint toute la 4e et la 3e, on repart au propre ».
      // 308 vers le hub des maths plutôt que cinq 404 : elles étaient au
      // sitemap depuis juillet. `permanent: false` — ces adresses reviendront
      // quand les deux classes seront réécrites.
      //
      // ⭐ ET ELLES REVIENNENT, UNE PAR UNE (25/08/2026). Une notion réécrite au
      // standard sort de cette liste le jour où sa fiche est publiée, sinon
      // l'adresse continue de rediriger et la fiche neuve est invisible.
      // ✅ 26/08/2026 — LES QUATRE ADRESSES DE 4e SONT TOUTES REVENUES :
      // pythagore-theoreme, trigo-cosinus, stat-statistique, proba-experience.
      // Il ne reste plus que la 3e, qui n'a pas encore été réécrite.
      {
        source: "/fiches-cours/maths/3e/thales-theoreme",
        destination: "/fiches-cours/maths",
        permanent: false,
      },
      // /presets était une bibliothèque de prompts guidés. Frédéric, 06/08 :
      // « ne sert plus à rien, plus aucun intérêt ». Elle était orpheline —
      // absente du sitemap, aucun lien du site n'y menait — donc elle ne vivait
      // plus que pour qui avait gardé l'adresse. 301 vers /enseignants, la page
      // qui parle aujourd'hui à ceux qu'elle visait.
      // ⚠️ La TABLE Supabase des presets n'est pas touchée : seule l'interface
      // s'en va. Si le sujet revient, les données sont là.
      {
        source: "/presets",
        destination: "/espace-profs",
        permanent: true,
      },
      // /ia a été le banc d'essai de la nouvelle entrée (05/08/2026), le temps
      // de la comparer à l'ancien accueil sans y toucher. Le 06/08 l'entrée EST
      // devenue l'accueil : garder les deux, c'était deux pages à faire vivre
      // pour un seul geste, et celle du test n'avait même plus la colonne.
      // 301 plutôt qu'une 404 : la page était en noindex, donc rien à sauver
      // côté moteurs, mais elle a tourné deux jours et quelqu'un peut l'avoir
      // en marque-page ou l'avoir passée à un collègue.
      {
        source: "/ia",
        destination: "/",
        permanent: true,
      },
      // ⭐ TROIS PORTES POUR LES ENSEIGNANTS, IL N'EN RESTE QU'UNE (08/08/2026).
      // `/enseignants`, `/espace-profs` et `/profs` existaient en parallèle,
      // sans aucune redirection entre elles. Ce n'était pas qu'un désordre
      // interne : Google en affichait DEUX comme rubriques du site sous le
      // résultat de marque — « Espace professeurs » et « Enseignants » — soit
      // deux emplacements sur cinq pour le même public. Rien ne lui disait
      // laquelle est la bonne, puisque rien ne le disait nulle part.
      //
      // `/espace-profs` gagne : c'est celle du sitemap, et la plus fournie.
      // ⚠️ Ce commentaire disait « /enseignants gagne » alors que les deux
      // redirections ci-dessous font l'inverse — corrigé le 21/08, en
      // constatant que Google affiche TOUJOURS les deux rubriques. Le 301 est
      // en place depuis le 08/08 : il n'y a rien de plus à faire que patienter,
      // les rubriques de marque sont ce qu'un moteur met le plus longtemps à
      // recalculer.
      //
      // ⚠️ CE QU'ON PERD, ET OÙ LE RETROUVER : `/profs` racontait « vous
      // formulez une consigne → l'IA propose → vous jugez ». C'est exactement
      // l'outil « Écrire un prompt pédagogique » qui reste à construire (point
      // 12 de la refonte). Frédéric, 08/08 : « EleveAI n'est plus une machine à
      // presets, sauf si après on veut se servir du générateur de prompts
      // pédagogique Valeria ». Le texte est dans l'historique git — chercher
      // `app/profs/page.tsx` avant ce commit.
      {
        source: "/enseignants",
        destination: "/espace-profs",
        permanent: true,
      },
      {
        source: "/profs",
        destination: "/espace-profs",
        permanent: true,
      },
      // ⭐ VALERIA S'EN VA, L'OPTIMISEUR RESTE (Frédéric, 08/08 : « enlever tous
      // valeria et rediriger vers optimiseur, qui est nettement mieux »).
      // Les deux pages portaient une offre de conseil en IA qui n'a rien à voir
      // avec ce que fait EleveAI aujourd'hui, et `/valeria-consulting` traînait
      // depuis des mois avec un `metadata.ts` mort — elle affichait donc le
      // titre de l'accueil dans Google, c'est-à-dire qu'elle lui prenait sa
      // place sur le nom de la marque.
      // ⚠️ `/optimiseur` n'est pas un remplacement de façade : c'est l'outil qui
      // fait vraiment le travail (app/api/optimiseur/*), et il est déjà en
      // ligne. Le seul lien interne vers Valeria était dans la Sidebar.
      {
        source: "/valeria",
        destination: "/prompt-pedagogique",
        permanent: true,
      },
      {
        source: "/valeria-consulting",
        destination: "/prompt-pedagogique",
        permanent: true,
      },
      // `/optimiseur` est devenue `/prompt-pedagogique` le meme jour : personne
      // ne TAPE « optimiseur » pour trouver ca, alors que « prompt pedagogique »
      // se cherche. Le NOM, lui, reste sur la page — les eleves de Frederic
      // l'appellent l'optimiseur, et un nom que de vrais utilisateurs ont
      // adopte ne se jette pas. L'adresse et le nom ne sont pas le meme metier.
      {
        source: "/optimiseur",
        destination: "/prompt-pedagogique",
        permanent: true,
      },
      // Renommage kit-de-survie → guide-de-survie (26/07/2026) : l'ancienne
      // URL a vécu ~1 jour dans le sitemap et l'accueil — 301 pour préserver
      // l'indexation et les liens déjà partagés (même règle que cartes-vacances).
      {
        source: "/kit-de-survie",
        destination: "/guide-de-survie",
        permanent: true,
      },
      {
        source: "/kit-de-survie/:slug*",
        destination: "/guide-de-survie/:slug*",
        permanent: true,
      },
      {
        source: "/coach-maths-ia",
        destination: "/coach-ia/maths",
        permanent: true,
      },
      // Vieille page « Mode Coach » (janvier 2026), indexée par Bing/Google
      // mais dépassée par le vrai coach : 301 vers la destination actuelle
      // (constat du 25/07 en analysant la SERP de marque).
      {
        source: "/espace-eleves/coach",
        destination: "/coach-ia/maths",
        permanent: true,
      },
      // Nettoyage SERP de marque (25/07) — Google servait en sitelinks deux
      // pages d'un autre âge : /eleves (page « générateur » sans aucun lien
      // interne entrant) et /concours-ia (pilote de décembre 2025, sans
      // metadata — Google improvisait le libellé « Connexion » — et avec un
      // lien mort vers /concours). Une seule vitrine élève : /espace-eleves.
      {
        source: "/eleves",
        destination: "/espace-eleves",
        permanent: true,
      },
      {
        source: "/concours-ia",
        destination: "/espace-eleves",
        permanent: true,
      },
      // Renommage cartes-vacances → cahier-vacances-cartes (09/07/2026) :
      // 301 pour préserver l'indexation et les liens déjà partagés/imprimés.
      {
        source: "/cartes-vacances",
        destination: "/cahier-vacances-cartes",
        permanent: true,
      },
      {
        source: "/cartes-vacances/:slug*",
        destination: "/cahier-vacances-cartes/:slug*",
        permanent: true,
      },
      // ── Adresses courtes « dites à voix haute » (15/07/2026) ──────────────
      // Le public YouTube TAPE l'adresse (les Shorts n'ont plus de liens
      // cliquables) → une adresse courte par épisode/destination, avec UTM
      // pour ENFIN mesurer ce que les vidéos amènent (sinon tout finit en
      // trafic « Direct » invisible). 302 (pas 301) : on peut repointer une
      // campagne sans se battre avec le cache des navigateurs.
      // Épisodes « en vrai » → la Une du journal (l'article les attend).
      // ⚠️ Destination /accueil DIRECT (pas /) : la redirection / → /accueil de
      // app/page.tsx perdait les UTM en route (constaté en prod le 16/07).
      ...["eau", "lait", "cyclones", "volcan", "requins", "canne"].map(
        (ep) => ({
          source: `/${ep}`,
          destination: `/accueil?utm_source=youtube&utm_medium=video&utm_campaign=${ep}`,
          permanent: false,
        }),
      ),
      // Le simulateur : l'adresse qui se dit à voix haute (radio, vidéos,
      // quotidiens). Sans UTM : c'est un raccourci d'usage, pas une campagne.
      {
        source: "/cyclone",
        destination: "/simulateur-cyclone",
        permanent: false,
      },
      {
        source: "/sucre",
        destination: "/simulateur-sucre",
        permanent: false,
      },
      // ⚠️ /lait est déjà pris (adresse YouTube de l'épisode, avec UTM) →
      // la fromagerie se dit « eleveai.fr/fromage ».
      {
        source: "/fromage",
        destination: "/simulateur-fromage",
        permanent: false,
      },
      // ⚠️ /eau est déjà pris (adresse YouTube de l'épisode) → le barrage se
      // dit « eleveai.fr/barrage ».
      {
        source: "/barrage",
        destination: "/simulateur-barrage",
        permanent: false,
      },
      // ⚠️ /volcan est déjà pris (adresse YouTube de l'épisode) → la machine
      // se dit « eleveai.fr/fournaise ».
      {
        source: "/fournaise",
        destination: "/simulateur-volcan",
        permanent: false,
      },
      // Le lagon de l'Ermitage : l'adresse libre (aucun épisode YouTube ne
      // l'occupe) → la machine se dit « eleveai.fr/lagon ».
      {
        source: "/lagon",
        destination: "/simulateur-lagon",
        permanent: false,
      },
      // La machine des epsilons (7e) — née du dessin du fondateur (20/07) :
      // « activer des epsilons peut engendrer des infinis ».
      {
        source: "/epsilon",
        destination: "/simulateur-epsilon",
        permanent: false,
      },
      // L'hôtel (05/08) — née d'une rencontre à Terre-Sainte : le métier
      // d'hôtelier en pourcentages. L'adresse se dit à voix haute au comptoir
      // d'une réception.
      {
        source: "/hotel",
        destination: "/simulateur-hotel",
        permanent: false,
      },
      // Instagram ne donne qu'un lien (la bio) et le public tape l'adresse :
      // /insta = la porte Instagram, mesurable (lancement du journal, 16/07).
      {
        source: "/insta",
        destination:
          "/accueil?utm_source=instagram&utm_medium=social&utm_campaign=journal",
        permanent: false,
      },
      // /effort = l'adresse du Reel « à deux » avec le coach sportif de
      // Saint-Pierre (24/07). Elle visait la Diagonale faute de mieux ; depuis
      // que la salle de sport a SA machine, elle y va directement.
      // utm_source=instagram : c'est SON réseau, on mesure ce qu'il apporte.
      {
        source: "/effort",
        destination:
          "/simulateur-energie?utm_source=instagram&utm_medium=video&utm_campaign=effort",
        permanent: false,
      },
      // L'adresse qui se dit à voix haute dans la salle.
      {
        source: "/muscle",
        destination: "/simulateur-energie",
        permanent: false,
      },
      // L'anglais du jour (25/07) — « 5 mots par jour », niveaux A1→B2, puisé
      // dans le coach. Adresses courtes pour le dire à voix haute.
      { source: "/mots", destination: "/anglais-du-jour", permanent: false },
      { source: "/anglais", destination: "/anglais-du-jour", permanent: false },
      { source: "/repertoire-anglais", destination: "/anglais-du-jour", permanent: false },
      { source: "/espagnol", destination: "/espagnol-du-jour", permanent: false },
      // Les deux destinations phares à dire dans TOUTES les vidéos.
      {
        source: "/cahier",
        destination:
          "/cahier-vacances?utm_source=youtube&utm_medium=video&utm_campaign=cahier",
        permanent: false,
      },
      {
        source: "/coach",
        destination:
          "/coach-ia/maths?utm_source=youtube&utm_medium=video&utm_campaign=coach",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
