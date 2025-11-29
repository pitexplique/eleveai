// app/parents/page.tsx
export default function ParentsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 space-y-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">Espace Parents – EleveAI</h1>
        <p className="text-lg text-gray-700">
          EleveAI est un assistant pédagogique pensé pour{" "}
          <strong>aider votre enfant à apprendre</strong>, pas pour faire les
          devoirs à sa place.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Notre philosophie</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
          <li>Respect des programmes officiels Eduscol.</li>
          <li>
            Appui sur les neurosciences de l’apprentissage : répétition espacée,
            test actif, reformulation.
          </li>
          <li>
            L’IA pose des questions, guide et explique, au lieu de donner
            directement les réponses.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Bientôt : présentation gratuite</h2>
        <p className="text-sm text-gray-700">
          Une séance de présentation gratuite en ligne sera prochainement
          proposée pour expliquer comment utiliser EleveAI à la maison avec
          votre enfant (collège / lycée).
        </p>
        <p className="text-sm text-gray-700">
          Vous pourrez y poser toutes vos questions : sécurité, données,
          pédagogie, accompagnement au long cours.
        </p>
      </section>
    </main>
  );
}
