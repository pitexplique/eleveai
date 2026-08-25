# Prompt — annoter les micro-compétences de la 5ᵉ maths

> Écrit le 25/08/2026 par la session qui a fait la 6ᵉ. **Autonome.** À coller tel
> quel. (`docs/*` est ignoré par git : ce fichier a été ajouté avec `git add -f`.)

```
Tu travailles sur eleveai (C:\Users\FRED\Documents\eleveai). Tâche unique :
annoter les 20 fiches de MATHS 5e avec leurs micro-compétences, comme les
18 fiches de 6e l'ont été le 25/08/2026.

── LE PRINCIPE ───────────────────────────────────────────────────────
Chaque bloc d'une fiche (propriété, méthode, usage, exemple, exercice)
porte les micro-compétences qu'il enseigne :

    { titre: "Tracer", texte: "…", micros: ["angle_tracer"] }

Le champ existe déjà (FicheMicros, lib/fiches/types.ts) et il est
OPTIONNEL : rien ne casse là où il manque.

── LA SOURCE, ET ELLE SEULE ──────────────────────────────────────────
lib/tutor-v4/knowledge/maths/5e/microSkills.ts
   → 107 micros sur 19 notions.

⛔ PAS les commentaires d'en-tête des fiches : ils peuvent être périmés.
⛔ PAS lib/tutor-v4/knowledge/*.knowledge.json : c'est l'ANCIEN tuteur
   (lib/tutor/), figé au 14/08, et ses identifiants divergent
   (fraction_compare vs fraction_comparer, fraction_quantite vs
   fraction_mixte). La chaîne vive est :
   catalog.ts → buildKnowledge5eMaths() → microSkills.ts

⚠️ La route écrit des TIRETS, la banque des SOULIGNÉS :
   notion: "angle-mesure" (fiche)  ↔  notionId: "angle_mesure" (banque)

── LE CONTRÔLE ───────────────────────────────────────────────────────
    npm run verifier:micros           (tout le site)
    node scripts/verifier-micros.mjs maths 5e

Il dit trois choses : une micro de la banque sans aucun bloc (un TROU,
signalé, n'échoue pas), un bloc citant une micro inexistante (ERREUR),
un bloc citant une micro d'une autre notion (ERREUR).
Le relancer APRÈS CHAQUE FICHE, pas à la fin.

── ⭐ LA RÈGLE QUI A TENU 105 FOIS : ON N'ANNOTE PAS TOUT ─────────────
Quand la banque n'a pas de micro pour ce qu'un bloc enseigne, le bloc
reste SANS micro. Coller la plus proche produit exactement ce que le
contrôle est censé empêcher : une annotation qui a l'air juste.
UN BLOC SANS MICRO SE LIT ; UN BLOC MAL ÉTIQUETÉ TROMPE.

Et si une micro de la banque n'a aucun bloc, c'est peut-être un manque
de CONTENU, pas d'annotation. En 6e, `fraction_mixte` (« encadrer,
écriture mixte ») n'avait pas de bloc parce que la fiche ne l'enseignait
pas : il a fallu écrire une propriété, pas coller une étiquette.
Signaler à Frédéric, ne pas inventer.

── ⚠️ UNE ANOMALIE À ÉLUCIDER AVANT DE COMMENCER ─────────────────────
lib/fiches/maths-5e-pourcentages.tsx porte  notion: "pourcentages".
Aucune notion de ce nom dans la banque de 5e — la notion voisine s'appelle
`prop_ratio_pourcentage`. Sur les 20 fiches, c'est la seule dans ce cas.

⛔ NE PAS RENOMMER SANS DEMANDER. Le champ `notion` sert au badge
« 📖 Fiche » du coach ET le dossier de route porte le même nom
(app/fiches-cours/maths/5e/pourcentages/). Le changer touche l'URL, donc
l'indexation. Poser la question à Frédéric, annoter les 19 autres en
attendant.

── LES PIÈGES D'ÉCRITURE, RENCONTRÉS SUR LES 18 FICHES DE 6e ─────────
1. DEUX FORMES DE BLOC dans les mêmes fichiers. Propriétés et exemples
   sur plusieurs lignes ; méthodes et usages tantôt sur plusieurs,
   tantôt sur UNE seule :
       { titre: "J'aligne", texte: "…" },
   Un script d'insertion qui ne prévoit que la forme longue s'arrête net
   — sans rien écrire, ce qui est le bon comportement, mais il faut le
   savoir avant de lancer.
2. LES EXERCICES N'ONT PAS DE `titre` : on les repère au début de leur
   `question`.
3. PLUSIEURS BLOCS PARTAGENT LE MÊME TITRE dans une même fiche :
   « Comparer » en propriété ET en exemple, « Convertir » en méthode ET
   en usage. Il faut compter les occurrences — et se souvenir qu'une
   insertion n'en crée pas de nouvelle.

Un rapport utile à écrire d'abord (vingt lignes) : pour chaque fiche, sa
notion, les micros de la banque avec leur `label`, et les titres de ses
blocs. On annote ensuite en lisant ce rapport.

── CE QU'IL NE FAUT PAS FAIRE ────────────────────────────────────────
⛔ Ne pas toucher aux dessins : la 5e est déjà à 100 % (chaque propriété
   et chaque étape de méthode porte son visuel).
⛔ Ne pas reconstruire les PDF : ajouter un champ `micros` ne change rien
   de visible. (Si le texte affiché change, alors oui.)
⛔ Ne pas toucher au graphe des PRÉREQUIS : reporté par Frédéric.
⛔ Ne pas annoter le français : une autre session s'en charge.

── LES RÈGLES DE CE DÉPÔT ────────────────────────────────────────────
• git commit -F message.txt -- <fichiers>  ⭐ TOUJOURS par chemin. Un
  commit ordinaire emporte ce qu'une autre session a laissé dans l'index.
• Une seule session à la fois dans ce dossier.
• `docs/*` est ignoré : `git add -f` pour y ajouter un fichier.
• Lire docs/note-du-matin.md avant de commencer.

── L'ÉTAT AU DÉPART ──────────────────────────────────────────────────
20 fiches de maths 5e · 107 micros · 19 notions.
Attendu à l'arrivée : 20 fiches annotées, et le contrôle qui sort en 0.
```
