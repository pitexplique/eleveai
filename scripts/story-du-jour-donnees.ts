// Les données de la STORY DU JOUR (19/10/2026), lues dans le Journal de l'accueil :
// la même Une et le même défi que eleveai.fr ce jour-là. Écrit du JSON sur la
// sortie standard ; c'est scripts/pub-story-du-jour.py qui dessine.
//   npx tsx scripts/story-du-jour-donnees.ts [décalage en jours, 0 = aujourd'hui]
import { donneesDuJournal } from "../app/accueil-journal/donnees";
import { genererDefi } from "../lib/accueil/defis";
import { jourParis } from "../lib/accueil/journal";

const jour = jourParis() + Number(process.argv[2] ?? 0);
const d = donneesDuJournal(jour);
const defi = genererDefi(d.jour);
const iso = new Date(jour * 86400000).toISOString().slice(0, 10);
process.stdout.write(
  JSON.stringify({
    iso,
    date: d.date,
    numero: d.numero,
    une: { titre: d.une.paysage?.titre, classe: d.une.classe, utile: d.une.utile, vignette: d.une.paysage?.vignette },
    defi: { classe: defi.classe, question: defi.question, choix: defi.choix, bonne: defi.bonne, explication: defi.explication },
  }),
);
