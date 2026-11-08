# Codes Ulule : mise en ligne (préparée le 08/11/2026)

Tout est prêt et committé, rien n'est poussé. À faire **quand Ulule accepte le projet**, dans cet ordre.

## 1. La base (Supabase → éditeur SQL), une fois

1. `supabase/abonnements.sql` — si ce n'est pas déjà fait (table de l'abonnement, commune avec Stripe).
2. `supabase/suivi_parent.sql` — sans elle, la page `/suivi` ne marche pas.
3. `supabase/codes_abonnement.sql` — la table des codes et la fonction qui les utilise.
4. `supabase/rate_limit.sql` — si ce n'est pas déjà fait (limite les essais de codes au hasard).

Contrôle : `select count(*) from codes_abonnement;` répond 0.

## 2. Pousser le code

Le push du soir habituel suffit : `/code`, `/api/code/*`, le lien « Activer mon code » dans Mon abonnement.
Aucune variable Vercel à ajouter. `/code` ne dépend pas de `VENTE.ouverte` : Ulule encaisse, on ne vend rien.

## 3. Après la collecte : un lot de codes par contrepartie

```
node scripts/codes-ulule.mjs --nombre 40 --duree 1 --type famille --lot ulule-famille-1m
node scripts/codes-ulule.mjs --nombre 20 --duree 3 --type famille --lot ulule-famille-3m
node scripts/codes-ulule.mjs --nombre 15 --duree 12 --type cadeau --lot ulule-cadeau-1an
node scripts/codes-ulule.mjs --nombre 1 --duree 12 --type classe --eleves 30 --lot ulule-classe-college-x
```

Chaque commande écrit `docs/codes-ulule/<lot>.csv` (pour l'envoi) et `<lot>.sql` (à coller dans Supabase).
Ou ajouter `--inserer` : les codes partent directement dans Supabase.
⛔ Un code n'existe qu'une fois inséré : coller le `.sql` AVANT d'envoyer le CSV.

## 4. Les cartes « à offrir »

```
python scripts/carte-cadeau-code.py --csv docs/codes-ulule/ulule-cadeau-1an.csv
```

Une carte PNG par code (A6, 300 ppp) et un PDF du lot, dans `docs/codes-ulule/cartes/`.
Une seule carte, avec le nom : `--code MARGO-… --duree 12 --de "Papi et Mamie"`.

## 5. Vérifier en ligne

Insérer un code d'essai, l'activer sur son propre compte sur eleveai.fr/code, puis l'effacer :

```sql
insert into codes_abonnement (code, duree_mois, type, origine, lot) values ('MARGO-TEST-FAM2', 1, 'famille', 'essai', 'essai');
-- après l'essai :
delete from codes_abonnement where origine = 'essai';
update abonnements set acces_jusquau = now() where statut = 'code' and email = '<votre adresse>';
```

## À savoir

- Deux codes sur le même compte s'additionnent. Un code ne sert qu'une fois.
- Un compte qui paie déjà au mois par Stripe ne peut pas utiliser de code avant la fin du mois payé :
  le code n'est pas consommé, la page l'explique.
- Licence classe : le code est enregistré au compte du prof, mais rien ne s'ouvre tout seul. La page lui
  demande d'écrire par /contact.
- Essai local sans base : configuration `eleveai-codes` de `.claude/launch.json` (port 3600, `CODES_ESSAI=1`),
  codes MARGO-TEST-FAM2 (1 mois), -TR3M (3 mois), -CAD6, -UNAN, -KAZ3 (classe 30), -PR57 (déjà utilisé). Jamais actif en production.
