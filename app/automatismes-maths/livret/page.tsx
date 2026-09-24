import { redirect } from "next/navigation";

// L'ancienne adresse `?classe=3e` renvoie vers la page de la classe
// (/automatismes-maths/livret/3e), qui porte le titre et l'indexation.
export default async function LivretPage({
  searchParams,
}: {
  searchParams: Promise<{ classe?: string; edition?: string }>;
}) {
  const { classe, edition } = await searchParams;
  redirect(`/automatismes-maths/livret/${classe ?? "3e"}${edition ? `?edition=${edition}` : ""}`);
}
