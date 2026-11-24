# REPRISE — tableau de bord élève, 24/11 (soir)

## Déjà fait (commit b9b344cc4, NON poussé)
- Coach : choix « 📝 Ma séance compte / 🏋️ Entraînement » EN HAUT.
  Composant `ChoixSeance` dans `app/coach/serie/EtatEnregistrementSeance.tsx` ;
  branché dans `TutorV4Client.tsx` (`choixSeance()`), `TutorSimpleView.tsx` (prop `choixSeance`).
- Fiches maths : `components/fiches-exercices/SeanceExercices.tsx`
  (`useSeanceExercices`, `ChoixSeanceExercices` en haut, `EnregistrerSeanceExercices` en bas),
  branché dans `FicheExercicesClient.tsx`. `ReponseExercice.tsx` émet l'événement `eleveai:reponse-exercice`.
  Envoi `saveResultat(eleve, "exercices", …)` → `/api/resultats` → table `resultats_tutor`,
  mode = "exercices", details.source = "exercices", details.entrainement = bool.
  notion_id = slug de la fiche avec « _ » (ex. aire_perimetre).
- Cockpit (`app/dashboard-eleve/CarteCockpit.tsx`) : `estEntrainement`, `estExercices` ; « Mes notes » affiche 🎯 coach / 📄 exercices.
- Jardin : `/api/mes-notions` ajoute le pseudo-micro `_fiches_exercices`.
- `CarteSimulateurs.tsx` dans le Cockpit et le Jardin.
- Test : élève 6ETEST-01 (DIMITILE, classe 5e). Jeton signé à la main (HMAC de ELEVEAI_SESSION_SECRET
  ou SUPABASE_SERVICE_ROLE_KEY, voir `lib/server/session.ts`), mis dans localStorage `eleveai_eleve`.
  ⚠️ Ne JAMAIS renvoyer le `textContent` d'une fiche entière dans le navigateur : 25 000 jetons perdus.

## À FAIRE — 5e demande (chef d'orchestre, 24/11)
Frédéric : « parfois les 6e vont sur la 4e pour tester, et ils enregistrent ».
RÈGLE :
1. Seules les séances de la classe de l'ÉLÈVE comptent dans la moyenne (classe du compte, ou sa classe chez le prof).
   Coach ET exercices. Cockpit, Jardin, ligne du prof, bulletins.
2. Séance dans une AUTRE classe : enregistrée, mais traitée comme Entraînement.
   Dans « Mes notes » : étiquette courte « 4e · hors moyenne ».
3. Coach et fiches : si la classe choisie ≠ classe de l'élève, « Ma séance compte » est grisé,
   avec « Ce n'est pas ta classe : ta séance est un entraînement ».
4. Classe de l'élève inconnue : tout compte (comme aujourd'hui).
5. Côté SERVEUR aussi, pas seulement l'affichage :
   - `lib/server/bulletinClasse.ts` (filtres `details?.entrainement !== true`, l. ~142 et ~292)
   - `lib/bulletin/computeBulletin.ts` (l. ~141-158, colonne `entrainement:details->entrainement`)
   - snapshot `bulletins` : `app/api/bulletin/route.ts`, `lib/server/suiviParent.ts`
   - `/api/dashboard` et Cockpit (`estEntrainement`), `/api/prof/classes/bilan`.
   Idée : une fonction commune `compteDansLaMoyenne(seance, classeEleve)` (lib), utilisée partout.
   Côté client, la classe vient de `useEleve().eleve.classe` (lue par /api/ma-classe) ;
   côté serveur, de `acces_etablissement.classe` ou de la classe chez le prof.
   Attention aux formats de classe (« 6e », « 6E », « sixieme »…) : normaliser.
6. Puis : vérifier au navigateur (6ETEST-01 est en 5e : faire une fiche 6e → « hors moyenne »),
   commit PAR CHEMIN, NE PAS POUSSER, ne pas toucher aux JSON non commités.

## ✅ 5e demande FAITE — commit bb84ba1bb (NON poussé), relève du 24/11 soir
- Règle unique : `lib/moyenne/compteDansLaMoyenne.ts` (`niveauClasse`, `horsClasse`,
  `compteDansLaMoyenne`). Classe de l'élève côté serveur : `lib/server/classeEleve.ts`
  (acces_etablissement.classe → classes_prof.niveau → repli).
- `details.entrainement` = le CHOIX de l'élève seulement ; la classe se juge au calcul,
  avec la classe d'AUJOURD'HUI (un élève qui passe en 4e retrouve ses séances de 4e).
- Serveur : computeBulletin (snapshot `regle: 2`, un ancien snapshot se recalcule dans
  /api/bulletin et le suivi parent), bulletinClasse (ligne + podium), bilan prof
  (séances hors classe exclues), /api/dashboard (`compte_moyenne`, `hors_classe`).
- Jardin : pas de moyenne dedans ; /api/mes-notions INCHANGÉ (les entraînements font
  déjà pousser les plantes). La « ligne du prof » sous le Jardin suit la règle.
- Vérifié au navigateur (6ETEST-01, 5e) : fiche 6e et coach 4e grisés + phrase ;
  coach 5e normal ; Cockpit « 6e · hors moyenne » ; /api/bulletin regle 2, aucune note.
- PAS testé en vrai : ligne du prof (DIMITILE n'est pas dans classes_prof).

- ⏰ Seuil de relève : 65 % de contexte (correction de Frédéric, 24/11 ; pas 35 %).

## ✅ Vérifié au navigateur, 24/11 après-midi — commit 9a8580909 (NON poussé)
- Ligne du prof testée EN VRAI (classe de test ZZQATEST6, supprimée ensuite) : un 6e avec une séance de 4e garde 14/20 chez lui ET chez le prof (bulletin, ma-ligne, bilan).
- Médailles (établissement) et trophées (e-mail) : OK. Inscription e-mail seul : OK.
- Corrigé : flash « Tu dois être connecté » (EleveContext.pret), onglets de /auth/signin qui n'écrivaient pas l'URL, légende du bulletin.
- Reste : SQL supabase/messages_classe.sql à lancer (session « message à la classe »).
