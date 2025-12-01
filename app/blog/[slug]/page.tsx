// app/atelier-IA/[slug]/page.tsx
import { notFound } from "next/navigation";

type Seance = {
  titre: string;
  objectifs: string[];
  contenu: string[];
};

type Semaine = {
  titre: string;
  seances: Seance[];
};

type Atelier = {
  slug: string;
  titre: string;
  sousTitre: string;
  accroche: string;
  objectifs: string[];
  organisation: {
    duree: string;
    frequence: string;
    public: string;
    cadre: string;
  };
  semaines: Semaine[];
};

const ateliers: Atelier[] = [
  {
    slug: "atelier-ia-entre-deux-6e",
    titre: "Atelier IA – Imagine & Apprends",
    sousTitre: "« Entre deux – 6e »",
    accroche:
      "Un atelier pour découvrir l’intelligence artificielle de manière ludique, sécurisée et encadrée, à destination des élèves de 6e.",
    objectifs: [
      "Comprendre ce qu’est vraiment une intelligence artificielle (ce n’est pas magique).",
      "Apprendre à formuler de bonnes consignes (prompts) pour l’IA.",
      "Utiliser l’IA comme outil pour apprendre (français, maths, EMI…).",
      "Développer la créativité et l’expression écrite.",
      "Renforcer l’esprit critique face aux informations générées par l’IA.",
    ],
    organisation: {
      duree: "Séances de 50 minutes",
      frequence: "1 à 2 fois par semaine pendant 3 semaines",
      public: "Élèves de 6e volontaires (groupe restreint pour un bon suivi)",
      cadre:
        "Atelier encadré par un enseignant, dans le respect des recommandations de l’Éducation nationale et des règles de protection des données.",
    },
    semaines: [
      {
        titre: "Semaine 1 – Comprendre ce qu’est (vraiment) une IA",
        seances: [
          {
            titre: "Séance 1 – C’est quoi une IA ?",
            objectifs: [
              "Distinguer ordinateur, robot et intelligence artificielle.",
              "Comprendre que l’IA apprend à partir de nombreux exemples.",
              "Commencer à développer l’esprit critique face aux réponses de l’IA.",
            ],
            contenu: [
              "Échange guidé avec les élèves : ce qu’ils pensent déjà de l’IA.",
              "Petit jeu « le robot qui comprend mal » pour montrer les limites d’une machine.",
              "Exemples d’erreurs simples commises par des IA (adaptés au niveau 6e).",
              "Écriture d’une première question simple à une IA et analyse de la réponse (vrai / faux / incomplet).",
            ],
          },
        ],
      },
      {
        titre: "Semaine 2 – Bien parler à une IA & créer avec elle",
        seances: [
          {
            titre: "Séance 2 – Bien parler à une IA",
            objectifs: [
              "Découvrir ce qu’est un prompt (consigne donnée à l’IA).",
              "Apprendre à formuler des consignes claires et précises.",
              "Rappeler les règles de sécurité : aucune donnée personnelle.",
            ],
            contenu: [
              "Comparaison entre une consigne vague et une consigne précise.",
              "Atelier en binômes : améliorer des prompts pour obtenir de meilleures réponses.",
              "Mini-défis : faire reformuler une leçon de maths niveau 6e ou expliquer un mot compliqué avec des mots simples.",
            ],
          },
          {
            titre: "Séance 3 – Créer avec l’IA",
            objectifs: [
              "Utiliser l’IA comme outil de créativité et non comme simple générateur de réponses.",
              "S’approprier et retravailler les propositions de l’IA.",
            ],
            contenu: [
              "Choix d’un thème : mini-histoire, poème court, description d’une figure géométrique, slogan pour le vivre ensemble…",
              "Production d’un premier texte avec l’IA.",
              "Travail de réécriture : corriger, enrichir, supprimer ce qui ne convient pas.",
            ],
          },
        ],
      },
      {
        titre: "Semaine 3 – Esprit critique & mini-projet final",
        seances: [
          {
            titre: "Séance 4 – Distinguer le vrai du faux",
            objectifs: [
              "Comprendre que l’IA peut se tromper ou inventer des informations.",
              "Apprendre à vérifier une information grâce aux sources.",
            ],
            contenu: [
              "Étude de quelques exemples simples de fausses informations.",
              "Jeu « vrai ou inventé ? » en petits groupes.",
              "Discussion : pourquoi l’IA peut se tromper ? Comment vérifier ?",
            ],
          },
          {
            titre: "Séance 5 – Mon mini-projet IA",
            objectifs: [
              "Mettre en pratique tout ce qui a été vu dans l’atelier.",
              "Produire une trace finale valorisante pour l’élève.",
            ],
            contenu: [
              "Chaque élève choisit un mini-projet : histoire courte, poème, idée d’exposé, fiche de révision…",
              "Utilisation de l’IA pour générer une première version, puis travail de correction et mise en forme.",
              "Impression ou affichage d’une sélection de productions (CDI, couloir, salle).",
            ],
          },
        ],
      },
    ],
  },
];

type PageProps = {
  params: {
    slug: string;
  };
};

export default function AtelierPage({ params }: PageProps) {
  const atelier = ateliers.find((a) => a.slug === params.slug);

  if (!atelier) {
    return notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <p className="text-sm uppercase tracking-wide text-emerald-400 mb-2">
        Atelier IA
      </p>

      <h1 className="text-3xl md:text-4xl font-bold text-slate-50 mb-2">
        {atelier.titre}
      </h1>

      <p className="text-lg text-emerald-300 mb-6">{atelier.sousTitre}</p>

      <p className="text-slate-200 mb-6">{atelier.accroche}</p>

      {/* Objectifs */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-slate-50 mb-2">
          Objectifs pédagogiques
        </h2>
        <ul className="list-disc list-inside text-slate-200 space-y-1">
          {atelier.objectifs.map((obj, i) => (
            <li key={i}>{obj}</li>
          ))}
        </ul>
      </section>

      {/* Organisation */}
      <section className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
        <h2 className="text-xl font-semibold text-slate-50 mb-3">
          Organisation de l’atelier
        </h2>
        <dl className="space-y-2 text-slate-200">
          <div>
            <dt className="font-semibold">Durée :</dt>
            <dd>{atelier.organisation.duree}</dd>
          </div>
          <div>
            <dt className="font-semibold">Fréquence :</dt>
            <dd>{atelier.organisation.frequence}</dd>
          </div>
          <div>
            <dt className="font-semibold">Public concerné :</dt>
            <dd>{atelier.organisation.public}</dd>
          </div>
          <div>
            <dt className="font-semibold">Cadre :</dt>
            <dd>{atelier.organisation.cadre}</dd>
          </div>
        </dl>
      </section>

      {/* Détail par semaine */}
      <section className="space-y-6">
        {atelier.semaines.map((semaine, i) => (
          <div
            key={i}
            className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4"
          >
            <h2 className="text-lg font-semibold text-slate-50 mb-3">
              {semaine.titre}
            </h2>

            <div className="space-y-4">
              {semaine.seances.map((seance, j) => (
                <article key={j}>
                  <h3 className="font-semibold text-emerald-300 mb-1">
                    {seance.titre}
                  </h3>

                  <p className="text-sm text-slate-300 mb-1">
                    Objectifs de la séance :
                  </p>
                  <ul className="list-disc list-inside text-sm text-slate-200 mb-2">
                    {seance.objectifs.map((obj, k) => (
                      <li key={k}>{obj}</li>
                    ))}
                  </ul>

                  <p className="text-sm text-slate-300 mb-1">Déroulement :</p>
                  <ul className="list-disc list-inside text-sm text-slate-200">
                    {seance.contenu.map((ligne, k) => (
                      <li key={k}>{ligne}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
