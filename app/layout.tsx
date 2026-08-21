// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";
import { Analytics } from "@vercel/analytics/next";
import DevBanner from "@/components/DevBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MasqueSurEmbed from "@/components/MasqueSurEmbed";
import { EleveProvider } from "@/context/EleveContext";
import MasqueSurGuide from "@/components/MasqueSurGuide";
import EcrireAuProf from "@/components/EcrireAuProf";
import PageViewTracker from "@/components/PageViewTracker";
import {
  PRIX_ETABLISSEMENT_ELEVE_AN,
  PRIX_FAMILLE_AN,
  PRIX_PROF_AN,
} from "@/lib/tarifs";
import { VENTE } from "@/lib/legal/editeur";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ⚠️ AVEC LE www, ET C'EST OBLIGATOIRE (corrigé le 06/08/2026).
// `https://eleveai.fr` répond 308 vers `https://www.eleveai.fr` — c'est Vercel
// qui le décide, et le www est donc la VRAIE adresse du site. Tant que cette
// constante disait « eleveai.fr », chaque URL canonique et chaque ligne du
// sitemap désignait une adresse qui redirige : on demandait aux moteurs
// d'indexer une porte au lieu de la pièce.
const SITE_URL = "https://www.eleveai.fr";

export const viewport: Viewport = {
  themeColor: "#020617",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  manifest: "/manifest.webmanifest",

  appleWebApp: {
    capable: true,
    title: "EleveAI",
    statusBarStyle: "black-translucent",
  },

  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },

  // ⛔ « JOURNAL » RETIRÉ PARTOUT LE 06/08/2026. Ce titre-ci est le défaut de
  // TOUTES les pages du site : tant qu'il annonçait un journal, chaque page
  // sans metadata propre continuait de le dire — y compris après la refonte de
  // l'accueil. Frédéric, le même jour : « je me fiche du journal scientifique ».
  title: {
    default: "EleveAI — exercices, coach et cahiers gratuits, du CP au Bac",
    template: "%s — EleveAI",
  },

  // ⚠️ C'EST LA DESCRIPTION DE TOUTE PAGE QUI N'EN DÉCLARE PAS. Elle voyage
  // donc bien plus loin que l'accueil, et elle annonçait encore « des
  // ressources vérifiées » alors que la promesse est devenue « conçues,
  // sélectionnées et vérifiées » le 07/08. Le verbe manquant était le premier :
  // « vérifiées » seul laisse croire qu'EleveAI ne fait que relire ce que
  // d'autres ont écrit — les coachs, les parcours, les cahiers et les guides
  // sont écrits ici.
  //
  // ⭐ LA MARQUE DANS LES TROIS PREMIERS MOTS (08/08). Forme reprise de
  // ChatGPT, Claude et IXL, comparés le matin même : « Use ChatGPT to… »,
  // « Claude is… », « IXL is… ». 149 signes ; Google coupe autour de 155.
  description:
    "EleveAI te propose des ressources pédagogiques conçues, sélectionnées et vérifiées : maths, français, anglais, espagnol et IA. Du CP au Bac, gratuit.",

  keywords: [
    "EleveAI",
    "exercices corrigés",
    "cahier de vacances gratuit",
    "aide aux devoirs",
    "soutien scolaire gratuit",
    "mathématiques",
    "coach maths",
    "parcours progression",
    "brevet des collèges",
    "bac spé maths",
    "calcul rapide",
    "révision maths",
    "suivi élèves",
    "collège",
    "6e", "5e", "4e", "3e",
    "brevet 2026",
    "La Réunion",
    "english maths",
    "coach IA",
    "coach français",
    "coach anglais",
    "coach espagnol",
    "espagnol",
    "anglais collège",
    "français collège",
    "dictée du jour",
  ],

  // ⛔ PAS DE CANONIQUE ICI, PLUS JAMAIS (retirée le 06/08/2026).
  // Elle valait `/accueil` et le layout la donne à TOUTES les pages qui n'en
  // déclarent pas. Six pages disaient donc à Google « je suis une copie de
  // l'accueil, indexe-le à ma place » : les quatre coachs, /parcours et
  // /dictee-du-jour — celles-là mêmes que le sitemap annonce en priorité 0,95.
  // Le site se contredisait, et c'est la balise qui gagne.
  // Sans canonique déclarée, chaque page se désigne elle-même : c'est le bon
  // comportement par défaut. Une canonique ne se pose QUE sur une page qui sait
  // vraiment être le double d'une autre.

  openGraph: {
    title: "EleveAI — exercices, coach et cahiers gratuits, du CP au Bac",
    description:
      "EleveAI te propose des ressources pédagogiques conçues, sélectionnées et vérifiées par un enseignant. Dis qui tu es et ce que tu cherches, du CP au Bac.",
    url: "/accueil",
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",
    images: [
      {
        url: "/preview.jpg",
        width: 1200,
        height: 630,
        // ⛔ « le journal » retiré de ce texte alternatif le 06/08 : il décrivait
        // encore une page qui n'existe plus, et c'est lui que lisent les
        // lecteurs d'écran comme les IA quand elles décrivent l'aperçu.
        alt: "EleveAI — dis qui tu es, ta classe, ta matière, puis écris ce que tu cherches",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "EleveAI — exercices, coach et cahiers gratuits, du CP au Bac",
    description:
      "EleveAI te propose des ressources pédagogiques conçues, sélectionnées et vérifiées par un enseignant — maths, français, anglais, espagnol et IA, du CP au Bac.",
    images: ["/preview.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "EleveAI",
      // ⛔ Les trois alternateName « journal » sont partis le 06/08. Le dernier,
      // « Le journal scientifique de La Réunion », était gardé pour un rang
      // gagné devant le CNRS — Frédéric l'a explicitement lâché le même jour.
      // Tant qu'il était là, on continuait de dire à Google qu'on est un
      // journal, sur toutes les pages du site.
      url: SITE_URL,
      // ⚠️ LE LOGO N'EST PAS L'APERÇU DE PARTAGE (corrigé le 08/08). Ce champ
      // pointait vers `/preview.jpg`, qui RENVOYAIT 404 : le logo qu'une IA ou
      // Google lisent pour représenter EleveAI menait nulle part. L'aperçu
      // existe maintenant, mais c'est une bannière 1200×630 avec une phrase
      // dedans — schema.org attend une MARQUE, pas une affiche. On donne donc
      // l'icône de l'application, carrée, lisible en vignette.
      logo: `${SITE_URL}/icons/icon-512.png`,
      description:
        "EleveAI propose à chaque élève, parent ou enseignant les ressources pédagogiques conçues, sélectionnées et vérifiées qui correspondent à sa demande : un coach qui explique sans faire à sa place en maths, français, anglais, espagnol et IA, des exercices corrigés, des cahiers de vacances et des activités ancrées dans le réel de La Réunion.",
      areaServed: { "@type": "Place", name: "La Réunion" },
      foundingLocation: { "@type": "Place", name: "La Réunion, France" },
      // La chaîne officielle, confirmée par Frédéric le 06/08. C'est ce lien
      // qu'une IA cite quand on lui demande « la chaîne d'EleveAI ».
      sameAs: ["https://www.youtube.com/@eleveai974"],
    },
    // ⛔ LE BLOC `Periodical` EST PARTI LE 06/08. Il déclarait EleveAI comme un
    // périodique — un journal — sur toutes les pages du site. Invisible pour un
    // visiteur, mais c'est exactement ce qu'on venait de retirer de la page.
    // Le type qui dit ce qu'on est vraiment, `EducationalApplication`, est déjà
    // là plus bas.
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "EleveAI",
      url: SITE_URL,
      inLanguage: "fr-FR",
    },
    {
      "@context": "https://schema.org",
      "@type": "EducationalApplication",
      name: "EleveAI",
      url: SITE_URL,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      educationalLevel: ["École élémentaire", "Collège", "Lycée"],
      learningResourceType: [
        "Calcul rapide",
        "Leçon du jour",
        "Parcours guidé",
        "Dictée du jour",
        "Entraînement corrigé",
      ],
      teaches: [
        "Mathématiques",
        "Français",
        "Anglais",
        "Espagnol",
        "Intelligence artificielle",
        "Résolution de problèmes",
      ],
      inLanguage: "fr-FR",
      /* ⭐ LE PRIX EST LA SEULE CHOSE QUI NOUS DISTINGUE VRAIMENT AUX YEUX D'UNE
         IA (21/08/2026). Mesuré le jour même : sur « coach IA élève collège
         gratuit », les assistants citent Galac6, LeProfIA, Khanmigo — tous
         annoncent « 100 % gratuit ». Ce mot ne discrimine plus rien : quand
         huit outils disent la même chose, aucun ne se détache, et le nôtre
         encore moins que les autres puisque personne n'en parle.

         Ce que nous disons, personne d'autre ne le dit : l'élève ne paie
         JAMAIS, et ce qui se paie est de VOIR et de GARDER. Deux offres,
         donc, et elles racontent le modèle à elles seules.

         ⛔ AUCUN PRIX RECOPIÉ : `PRIX_FAMILLE_AN` vient de lib/tarifs.ts, comme
         la carte de /tarifs et sa FAQ. La règle est écrite en tête de ce
         fichier-là, et elle est née d'une SERP qui a annoncé « 4,90 €/mois »
         des semaines après que la page eut cessé de le dire.

         ⚠️ ET LA DISPONIBILITÉ SUIT LE VERROU DE VENTE, elle ne l'anticipe pas.
         Tant que `VENTE.ouverte` est faux, Stripe n'encaisse pas : l'offre
         famille est donc `PreOrder` et non `InStock`. Annoncer une offre
         achetable dont la caisse ne répond pas est pire que le silence — un
         modèle qui l'apprend nous présente comme l'outil dont le paiement est
         cassé. Le jour où le booléen passe à true, cette ligne bascule seule. */
      /* ⛔ L'ÉLÈVE N'EST PAS UNE OFFRE À 0 € (corrigé le 21/08, Frédéric :
         « l'offre élève n'est pas à zéro euros »). Une première version en
         déclarait une, en tête, nommée « toujours gratuit ». Deux fautes.

         La première est factuelle : le catalogue a TROIS offres — famille,
         classe, établissement. L'élève n'y figure pas parce qu'il n'achète
         rien ; il est le bénéficiaire, pas une ligne commerciale. En inventer
         une, c'est décrire un catalogue qui n'existe pas.

         La seconde est éditoriale, et elle est plus grave : le mot « gratuit »
         a quitté /tarifs le matin même, où il apparaissait sept fois sur une
         page qui demande de l'argent. Le remettre ici, en tête et à zéro euro,
         c'était rétablir par la porte des machines ce qu'on venait de retirer
         par celle des lecteurs — et présenter EleveAI aux moteurs comme un
         produit gratuit dont trois offres payantes dépassent.

         ⭐ LA PROPRIÉTÉ JUSTE EXISTE, c'est `isAccessibleForFree`. Elle dit
         exactement ce qu'on veut dire — le contenu s'atteint sans payer — sans
         inventer de transaction. Les `offers` ne portent alors que ce qui se
         vend vraiment. */
      isAccessibleForFree: true,
      offers: [
        {
          "@type": "Offer",
          name: "Famille — par foyer, jamais par enfant",
          description:
            "Le coach, les exercices et les évaluations ne se paient pas, et l'élève garde ses résultats. Ce qui se paie, c'est que ça se souvienne de votre enfant : bulletin, travail de la semaine, historique. Un seul abonnement couvre tous les enfants du foyer.",
          price: PRIX_FAMILLE_AN,
          priceCurrency: "EUR",
          /* ⚠️ LA DISPONIBILITÉ SUIT LE VERROU DE VENTE, elle ne l'anticipe
             pas. Tant que `VENTE.ouverte` est faux, Stripe n'encaisse pas :
             annoncer une offre achetable dont la caisse ne répond pas est pire
             que le silence — un modèle qui l'apprend nous présente ensuite
             comme l'outil dont le paiement est cassé. Le jour où le booléen
             passe à true, ces trois lignes basculent seules. */
          availability: VENTE.ouverte
            ? "https://schema.org/InStock"
            : "https://schema.org/PreOrder",
          url: `${SITE_URL}/tarifs#famille`,
        },
        {
          "@type": "Offer",
          name: "Professeur — forfait, quel que soit le nombre d'élèves",
          description:
            "Le professeur suit sa classe compétence par compétence, sans corriger. Forfait annuel : 25 élèves ou 35, c'est le même prix, et il n'a pas à passer par la coopérative pour le payer. Les familles de cette classe ne paient rien.",
          price: PRIX_PROF_AN,
          priceCurrency: "EUR",
          unitText: "an",
          availability: VENTE.ouverte
            ? "https://schema.org/InStock"
            : "https://schema.org/PreOrder",
          url: `${SITE_URL}/tarifs#classe`,
        },
        {
          "@type": "Offer",
          name: "Établissement — tous les professeurs, plus la direction",
          description:
            "Tous les niveaux, toutes les classes, tous les professeurs, et la vue complète du chef d'établissement. Facturé à l'établissement — rien aux familles, et aucun élève ne paie.",
          price: PRIX_ETABLISSEMENT_ELEVE_AN,
          priceCurrency: "EUR",
          unitText: "élève et par an",
          availability: VENTE.ouverte
            ? "https://schema.org/InStock"
            : "https://schema.org/PreOrder",
          url: `${SITE_URL}/tarifs#etablissement`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Frédéric Lacoste",
      jobTitle: "Enseignant de mathématiques — Fondateur d’EleveAI",
      description: "Enseignant au Collège du Dimitile à La Réunion. DESS de mathématiques appliquées, spécialiste de la théorie du plus proche voisin.",
      worksFor: {
        "@type": "EducationalOrganization",
        name: "Collège du Dimitile",
        address: { "@type": "PostalAddress", addressRegion: "La Réunion", addressCountry: "FR" },
      },
    },
  ];

  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        <EleveProvider>
          <PageViewTracker />
          {/* Les pages /embed/* (widgets pour les médias) vivent sans
              l'habillage du site — seul le contenu embarqué s'affiche. */}
          <MasqueSurEmbed>
            <DevBanner />
            <Header />
          </MasqueSurEmbed>

          {children}

          <MasqueSurEmbed>
            {/* Les guides de survie (imprimables) finissent sur leur propre
                CTA coach : pas de footer là-bas.
                14/08 — la barre des remerciements élèves, qui vivait ici sous
                le footer, est retirée de TOUTES les pages : elle s'invitait
                dans chaque capture d'écran, et son extrait polluait les
                résultats de recherche (l'initiale de la pastille collée au
                prénom donnait « MMaëlle », « KKeïla »). Les élèves restent
                remerciés là où c'est leur place : la section « À l'honneur »
                de l'accueil et la page /remerciements. */}
            <MasqueSurGuide>
              <Footer />
            </MasqueSurGuide>
            <EcrireAuProf />
          </MasqueSurEmbed>
        </EleveProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <Analytics />
      </body>
    </html>
  );
}