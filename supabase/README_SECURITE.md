# Sécurisation RLS — ordre de déploiement

Contexte : les tables `resultats_*` (7 tables, « Unrestricted » au dashboard)
étaient lisibles et modifiables par n'importe qui avec la clé anon publique.
`acces_etablissement` (codes + **mots de passe en clair**) a le RLS « activé »
au dashboard **mais une policy permissive laisse tout passer** — la preuve :
la page de connexion lisait `mot_de_passe` depuis le navigateur. Désormais,
tous les accès passent par des routes API Next.js (clé service role) et le
RLS bloque la clé anon.

## ⚠️ Contrainte du jour : élèves sur le site cet après-midi

- **Exécutable tout de suite, zéro risque** :
  [`securite_rls_quickwins.sql`](securite_rls_quickwins.sql) — verrouille
  `retours_eleves` (utilisée par /votre-avis cet après-midi) et
  `questions_ia_parcours`. Aucun code navigateur ne les touche, seulement
  des routes service role.
- **Le reste attend la fin de la séance** (ou se fait avant si les élèves ne
  sont pas encore connectés) : le déploiement du code invalide les sessions
  localStorage existantes pour l'enregistrement des résultats et les
  dashboards (message « reconnecte-toi »). Des élèves qui se connectent
  APRÈS le déploiement ne verront aucune différence.

## Ordre à respecter

1. `securite_rls_quickwins.sql` — **maintenant** (avant ou après déploiement,
   peu importe).
2. **Déployer le code** (Vercel). Tout fonctionne encore sans les scripts
   suivants : `/api/code-login` a un fallback tant que la fonction SQL
   n'existe pas, et les policies permissives n'ont pas encore été retirées.
3. [`acces_etablissement_mot_de_passe.sql`](acces_etablissement_mot_de_passe.sql) :
   hash bcrypt des mots de passe + fonction de login
   `verifier_acces_etablissement` (réservée à la service role).
4. Tester une connexion par codes sur le site.
5. [`securite_rls.sql`](securite_rls.sql) : supprime les policies permissives
   d'`acces_etablissement` et active le RLS (sans policy) sur les 7 tables
   `resultats_*`.
6. Vérifier : connexion, enregistrement d'un résultat, les 3 dashboards.
7. [`securite_policies_comptes.sql`](securite_policies_comptes.sql) :
   remplace les policies des tables comptes e-mail / presets par des policies
   strictes (`auth.uid()`). Indépendant du déploiement, mais lancer d'abord
   l'audit inclus en tête de script.
8. Plus tard (optionnel) : purger la colonne `mot_de_passe` en clair — étape
   commentée à la fin de `acces_etablissement_mot_de_passe.sql`. Attention :
   les mots de passe ne seront alors plus consultables pour les redonner aux
   élèves qui les oublient.

## Effet sur les utilisateurs

- Les sessions existantes (localStorage) n'ont pas de jeton signé : pour
  enregistrer un résultat ou ouvrir un dashboard, ces utilisateurs verront un
  message leur demandant de se reconnecter (une seule fois).
- Le jeton est valable 30 jours, ensuite reconnexion.
- Cas limite signup : l'upsert `users_email` sur conflit d'email ne peut plus
  écraser le profil d'un autre compte (c'est voulu).

## Variables d'environnement

- `SUPABASE_SERVICE_ROLE_KEY` : déjà requise (routes API).
- `ELEVEAI_SESSION_SECRET` (recommandé) : secret dédié à la signature des
  jetons de session. À défaut, la clé service role sert de secret de
  signature. Définir une longue chaîne aléatoire, p. ex. :
  `node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"`
  ⚠️ En changer invalide toutes les sessions en cours (simple reconnexion).

## Ce qui a changé dans le code

- `lib/server/session.ts` : jetons de session signés (HMAC-SHA256, 30 j).
- `/api/code-login` : vérifie le mot de passe côté serveur (plus jamais lu
  dans le navigateur) et délivre le jeton.
- `/api/email-session` : délivre le même jeton aux comptes e-mail (OTP).
- `/api/resultats` : enregistre les résultats des 7 activités ; l'identité
  (codes + nom) est forcée depuis le jeton.
- `/api/dashboard` : lectures scopées par rôle (élève → ses résultats ;
  prof/principal/boss → son établissement).
- Les pages activités et les 3 dashboards n'utilisent plus le client
  Supabase anon pour ces tables.

## Rate-limiting `/api/code-login` (anti brute-force)

- [`rate_limit.sql`](rate_limit.sql) : table `rate_limits` + fonction
  `rate_limit_hit` (fenêtre fixe, réservée à la service role). **À exécuter
  une fois en base.** Le code (`lib/server/rateLimit.ts`) est *fail-open* :
  tant que le script n'est pas lancé, la connexion fonctionne normalement
  (aucune régression au déploiement).
- Une fois lancé : `/api/code-login` bloque (HTTP 429) au-delà de 20
  tentatives/min par IP **ou** 10 tentatives/10 min sur un même couple de
  codes (anti-devinette de mot de passe sur un compte précis).
- L'envoi d'OTP e-mail reste navigateur → Supabase et profite du
  rate-limiting intégré de Supabase (par projet / par adresse).

## Sign-in / sign-up e-mail : flux unifié (anti-énumération)

- L'inscription et la connexion par e-mail passent par **une seule page**
  (`/auth/signin`). `/auth/signup` ne fait que rediriger.
- L'ancien `/api/auth/check-email` (qui révélait à un inconnu si une adresse
  était inscrite) a été **supprimé**. Le navigateur n'apprend l'existence d'un
  compte qu'**après** validation du code (preuve de possession de la boîte
  mail) ; pour un nouveau compte, une étape « complète ton profil » collecte
  nom / type / consentement CGV.

## Reste à faire (hors périmètre)

- Purger la colonne `mot_de_passe` en clair (étape commentée).
- Supprimer les fichiers morts `EspaceProfsClient copy.tsx` /
  `copy 2.tsx` / `AtelierIAClient copy.tsx` (seuls « utilisateurs » des
  écritures sur `presets_eleveai` / `presets_email`).
