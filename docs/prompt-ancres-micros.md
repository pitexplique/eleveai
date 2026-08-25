# Prompt — poser une ancre par micro-compétence

> Écrit le 25/08/2026 par la session maths, pour la session qui prendra ce
> chantier. **Autonome** : elle n'aura rien de la conversation qui l'a produit.
> À coller tel quel.

```
Tu travailles sur eleveai (C:\Users\FRED\Documents\eleveai). Tâche unique :
poser une ANCRE par micro-compétence sur les fiches de cours, pour que
chaque bloc devienne adressable.

── CE QUI EXISTE DÉJÀ ────────────────────────────────────────────────
Depuis le 25/08/2026, les blocs d'une fiche portent les micro-compétences
qu'ils enseignent :

    // lib/fiches/types.ts
    export type FicheMicros = { micros?: string[] };
    // ajouté à FichePropriete, FicheMethode, FicheUsage, FicheExemple,
    // FicheExercice — optionnel, 89 fiches sur 109 ne l'ont pas encore.

    // lib/fiches/maths-6e-angles.tsx
    { titre: "Tracer", texte: "…", micros: ["angle_tracer"] }

Les identifiants viennent de la banque vive :
lib/tutor-v4/knowledge/<matière>/<classe>/microSkills.ts
⛔ PAS des fichiers lib/tutor-v4/knowledge/*.knowledge.json — ce sont
ceux de l'ANCIEN tuteur (lib/tutor/), figés au 14/08, et leurs
identifiants divergent (fraction_compare vs fraction_comparer).

Contrôle existant : npm run verifier:micros
État : 20 fiches annotées sur 109 (les 18 de maths 6e + 2 de français).

── CE QU'IL FAUT FAIRE ───────────────────────────────────────────────
Dans components/fiches/FicheCoursClient.tsx, poser sur chaque bloc un
    id="micro-<identifiant>"
pour que /fiches-cours/maths/6e/angle-mesure#micro-angle_tracer amène
directement au bloc.

── LA DÉCISION, DÉJÀ PRISE ───────────────────────────────────────────
UNE MICRO = UNE SEULE ANCRE, sur le PREMIER bloc qui la cite dans
l'ORDRE CANONIQUE (ORDRE_CANONIQUE, lib/fiches/types.ts).

Pourquoi pas « le bloc de méthode en priorité » : l'ancre ferait sauter
le lecteur par-dessus la définition qui explique la chose. Et il faudrait
maintenir une règle d'exception (pas de méthode ? deux méthodes ?).
Pourquoi pas des ancres suffixées (#angle_tracer-methode) : ça crée
plusieurs adresses pour une notion, donc ça repousse le choix vers Google
au lieu de le trancher, et ça expose un nom de rubrique interne dans une
URL publique.

── DEUX PIÈGES, MESURÉS ──────────────────────────────────────────────
1. UNE MICRO EST SUR PLUSIEURS BLOCS — sur les 20 fiches annotées, SANS
   EXCEPTION. Mesures réelles : angle_reconnaitre ×5, aire_rectangle ×4,
   5e_discours_direct_indirect ×13. Un id={micro} naïf produirait treize
   identifiants HTML identiques : invalide, et le navigateur saute au
   premier. C'est toute la raison de la décision ci-dessus.

2. L'ORDRE CANONIQUE, PAS L'ORDRE AFFICHÉ. Un prof peut réordonner ses
   rubriques dans le composeur (la composition est enregistrée par
   appareil). Si l'ancre suivait l'affichage, la même URL désignerait un
   bloc différent selon l'utilisateur, et le lien qu'un prof envoie à un
   élève ne mènerait pas où il l'a envoyé. Ça casserait en silence.

── À AJOUTER AU CONTRÔLE ─────────────────────────────────────────────
Dans scripts/verifier-micros.mjs : « une ancre par micro et par fiche,
jamais deux ». C'est vérifiable, donc ça doit l'être — sinon le doublon
reviendra sans qu'on le voie.

── CE QU'IL NE FAUT PAS FAIRE ────────────────────────────────────────
⛔ Ne pas toucher au graphe des PRÉREQUIS des micro-compétences. Il
   existe (3 426 micros, 3 618 liens, 0 cycle, 0 référence cassée) mais
   il s'arrête à la frontière de chaque classe : 0 lien inter-classes.
   Frédéric a décidé de le traiter plus tard.
⛔ Ne pas changer les URL des fiches. Le slug est un notionId interne
   (decimal-nombre au lieu de nombres-decimaux) : c'est un défaut connu,
   mais le corriger sans redirections 301 perdrait l'indexation acquise.
⛔ Ne pas annoter les fiches de français : une autre session s'en charge
   au fil de son générateur.

── LES RÈGLES DE CE DÉPÔT ────────────────────────────────────────────
• git commit -F message.txt -- <fichiers>  ⭐ TOUJOURS par chemin. Un
  commit ordinaire emporte ce qu'une autre session a laissé dans l'index
  (c'est arrivé : neuf fichiers avalés).
• Une seule session à la fois dans ce dossier.
• Vérifier en RENDANT, pas en lisant : mesurer la page à 375 ET 1280 px.
• Pas besoin de reconstruire les 92 PDF : un attribut id ne change rien
  de visible. (Si un jour le texte affiché change, alors oui — un PDF est
  une photo de la page.)
• Lire docs/note-du-matin.md avant de commencer.
```
