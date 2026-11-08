# Reprise : codes Ulule (contreparties à activer sur eleveai.fr/code)

État au 08/11/2026. Commits `2540ac7a` (construction) et `f49c9054` (3 mois, classe 30) ; la session Ulule a
ajouté la durée de 3 mois dans `e6ab665d`. **Rien n'est poussé** (push du soir par le chef d'orchestre),
**le SQL n'est pas exécuté**. On attend qu'Ulule accepte le projet (lancement prévu le 24/11).

## Ce qui existe

- `supabase/codes_abonnement.sql` : table `codes_abonnement` + fonction `utiliser_code_abonnement`
  (une transaction, ligne verrouillée). Elle prolonge `abonnements.acces_jusquau` (statut `code`,
  fin_programmee = true), la même table que Stripe. Durées 1, 2, 3, 6, 12 mois ; types famille, cadeau, classe.
- `/code` (`app/code/`), `/api/code/verifier`, `/api/code/activer`, `lib/codes-abonnement.ts`,
  `lib/server/codes-abonnement.ts`. Lien « Activer mon code » dans `/dashboard/abonnement`.
- `scripts/codes-ulule.mjs` : lots de codes MARGO-XXXX-XXXX (sans 0 O 1 I L) → `docs/codes-ulule/<lot>.csv` + `.sql`
  (docs/ ignoré par git), option `--inserer`.
- `scripts/carte-cadeau-code.py` : carte A6 Ti Margo, PNG 300 ppp + PDF par lot.
- `scripts/codes-ulule-mise-en-ligne.md` : LA procédure à suivre quand Ulule accepte.

## Grille Ulule (de la session Ulule)

4,95 € = 1 mois, 12 € = 3 mois, 22 € = 6 mois, 39 € = 1 an, chacune aussi « à offrir » ;
licence classe 60 € = 30 élèves, 1 an.

## Choix faits, à ne pas défaire

- Un compte avec un abonnement Stripe au mois vivant ne peut pas utiliser de code (le webhook réécrirait la
  date) : le code n'est pas consommé, la page l'explique.
- Licence classe : enregistrée sur le compte du prof, rien ne s'ouvre seul ; la page renvoie vers /contact.
- `/code` ne dépend pas de `VENTE.ouverte` (Ulule encaisse).

## Tester

- Essai local sans base : configuration `eleveai-codes` de `.claude/launch.json` (port 3600, `CODES_ESSAI=1`,
  dossier `.next-6`). Codes en mémoire : MARGO-TEST-FAM2 (1 mois), -TR3M (3 mois), -CAD6, -UNAN (1 an),
  -KAZ3 (classe 30), -PR57 (déjà utilisé). Ils se consomment : redémarrer le serveur pour les retrouver.
- Le panneau du navigateur masqué ne rend pas la page : piloter Chrome en headless avec
  `node_modules/playwright-core` (`executablePath` = Chrome installé).
- SQL : validé dans PGlite (base Postgres jetable, installée dans le scratchpad, pas dans le projet).
- Un serveur de dev ou un build avec `NEXT_DIST_DIR` ajoute une ligne à `tsconfig.json` : la retirer
  (`git checkout -- tsconfig.json` si seule cette ligne a changé).

## Reste à faire (rien d'urgent)

1. L'avis de Frédéric sur la carte cadeau (exemples dans `docs/codes-ulule/cartes/exemples/`).
2. Quand Ulule accepte : suivre `scripts/codes-ulule-mise-en-ligne.md` (SQL, essai en ligne).
3. Après la collecte : lots de codes, cartes, envoi aux contributeurs.
4. Non testé faute de tables en base : la vraie connexion et l'écriture Supabase (étape 5 de la procédure).
