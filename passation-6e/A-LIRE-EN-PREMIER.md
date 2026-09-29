# Passation 6e — reprise (écrit le 30/09/2026 au soir, limite d'usage atteinte)

Lire aussi : `PASSATION-FEUILLES-EXERCICES-6E.md` (racine), puis dans ce dossier
`CONSIGNES-6E-AGENTS.md` (feuilles), `CONSIGNES-6E-FICHES-COURS.md` (fiches de
cours, section CORRECTIF Ti Margo), `SUIVI-6E.md` (lignes de registre et doutes
déjà reçus).

## Fait (sur disque, RIEN de committé, rien au registre)
- 35/35 fichiers de feuilles `lib/fiches-exercices/maths-6e-*.tsx` + pages +
  scripts `scripts/verifier-exercices-6e-*.mjs` (certains agents n'avaient pas
  fini à l'arrêt : les RELANCER tous, doivent finir « 0 fausses »).
  Rapport reçu : lot A (entiers) 0 fausses ×3.
- 16/16 fiches de cours `lib/fiches/maths-6e-*.tsx` + pages
  `app/fiches-cours/maths/6e/<slug>/`. `tiMargo` ajouté sur 9 (nombres,
  grandeurs, stats) ; à vérifier sur bissectrice, triangle-propriete,
  quadrilatere-propriete, distance, mediatrice, cercle-circonscrit, vision.
- Ti Margo en mode classe : `components/fiches/TiMargoBulle.tsx` + champ
  `tiMargo` dans `lib/fiches/types.ts` + `lib/fiches/slidesDepuisFiche.tsx`
  (le mode classe est ENGENDRÉ depuis la fiche ; `slides[]` n'est pas projeté).

## Reste à faire
1. Relancer les 35 scripts ; `npx tsc --noEmit -p .` (≈ 12 min, ignorer `.next-*`).
2. Registre des feuilles (`lib/fiches-exercices/registre.ts`) : lignes dans
   SUIVI-6E.md ou à tirer de `titre`/`accroche` de chaque feuille ; puis
   `node scripts/generer-chargeurs-fiches-exercices.mjs`.
3. Registre des fiches de cours (`lib/fiches/registre.ts`) : 16 lignes.
4. `fichesCours` des 16 feuilles sans fiche → pointer vers la nouvelle fiche.
5. Serveur REDÉMARRÉ (eleveai-3, port 3300 ; 3000/3100 = autres sessions),
   `node scripts/mesurer-feuilles-375.mjs 3300 6e <slugs…>`, + mode classe à
   l'œil (Ti Margo) sur 2-3 fiches.
6. PDF un par un ; relire `lib/fiches/pdf-disponibles.ts`.
7. Commit PAR CHEMIN (registres partagés avec la terminale : ses lignes hors
   du commit). Push au signal de Frédéric.
8. Donner à Frédéric les doutes de SUIVI-6E.md d'un bloc.

Outil cassé signalé par les agents : `scripts/apercu-canvas.mjs` plante sur
l'import CSS de KaTeX (contourné par un `--import` qui neutralise les .css).
