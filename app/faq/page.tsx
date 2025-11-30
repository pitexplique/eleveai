export default function FAQPage() {
  const faq = [
    {
      title: "Qu’est-ce qu’EleveAI ?",
      content:
        "EleveAI est une plateforme d’intelligence artificielle scolaire destinée aux professeurs, élèves et équipes de direction. Elle génère des contenus conformes aux programmes Eduscol et optimisés avec les neurosciences de l’apprentissage.",
    },
    {
      title: "EleveAI est-il conforme au RGPD ?",
      content:
        "Oui. Toutes les données sont hébergées en Europe, aucune information d’élève n’est utilisée pour entraîner les modèles, et les conversations peuvent être anonymisées.",
    },
    {
      title: "L’IA ne va-t-elle pas encourager les élèves à tricher ?",
      content:
        "Non. EleveAI inclut un mode élève sécurisé, une charte anti-triche, des prompts pédagogiques contrôlés et des outils pour reconnaître les productions IA.",
    },
    {
      title: "EleveAI remplace-t-il les enseignants ?",
      content:
        "Jamais. EleveAI est un assistant pédagogique : préparation de cours, exercices, remédiation, adaptation DYS. Le professeur reste au centre.",
    },
    {
      title: "Les contenus sont-ils conformes Eduscol ?",
      content:
        "Oui. Tous les générateurs utilisent les programmes officiels, compétences cycle 3/4 et lycée, attendus, et vocabulaire institutionnel.",
    },
    {
      title: "Les prompts sont-ils adaptés à toutes les disciplines ?",
      content:
        "Oui : maths, français, langues, physique-chimie, SES, histoire-géographie, sciences, etc. Chaque prompt inclut aussi une version DYS-friendly.",
    },
    {
      title: "Proposez-vous une offre pilote ?",
      content:
        "Oui, pour les établissements souhaitant tester l’IA de manière encadrée. La page est protégée par mot de passe et réservée aux équipes de direction.",
    },
    {
      title: "Proposez-vous de la formation ?",
      content:
        "Oui : initiation IA, prompts disciplinaires, sécurité et anti-triche, ateliers pratiques, mise en place d’espaces IA pour enseignants et élèves.",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-black text-slate-50 px-4 py-16">
      <div className="max-w-3xl mx-auto space-y-12">
        <header className="space-y-3 text-center">
          <h1 className="text-4xl font-extrabold text-emerald-300">
            FAQ – EleveAI
          </h1>
          <p className="text-slate-300 text-sm">
            Les réponses aux questions les plus fréquentes des professeurs et
            des établissements.
          </p>
        </header>

        <section className="space-y-4">
          {faq.map((item, i) => (
            <details
              key={i}
              className="group rounded-xl border border-slate-700 bg-slate-900/60 p-4"
            >
              <summary className="cursor-pointer text-emerald-300 font-semibold text-lg">
                {item.title}
              </summary>
              <p className="mt-3 text-slate-200 text-sm leading-relaxed">
                {item.content}
              </p>
            </details>
          ))}
        </section>

        <footer className="pt-6 text-center text-slate-400 text-sm">
          Une autre question ?{" "}
          <a
            href="/contact"
            className="text-emerald-300 font-semibold hover:text-emerald-200"
          >
            Contactez-nous
          </a>
        </footer>
      </div>
    </main>
  );
}
