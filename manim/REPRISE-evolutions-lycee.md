# REPRISE — série ÉVOLUTIONS EN POURCENTAGE, automatismes 1re + STMG (+ garde 2de) — 23/11/2026

Session « automatismes première », lancée par le chef d'orchestre du 23/11 (classes à examen d'abord).

## Inventaire (fait)
- 1re, série Proportionnalité : épisodes 01 à 06 finis (calculer, formes, appliquer, partie-tout, tout-partie, pourcentage de pourcentage). AUCUNE vidéo sur les 8 micros d'évolution.
- Les 8 micros (mêmes id en 1re et en STMG) : `auto_evo_additif_multiplicatif`, `auto_evo_diminution`, `auto_evo_valeur_finale`, `auto_evo_valeur_initiale` (1re : notion `auto_coefficient_multiplicateur` ; STMG : `auto_evo_coefficient`) ; `auto_evo_calculer_taux`, `auto_evo_successives`, `auto_evo_reciproque`, `auto_evo_piege_compensation` (1re : `auto_taux_evolution` ; STMG : `auto_evo_taux` / `auto_evo_enchainees`).
- Déjà en vidéo ailleurs : 4e coefficient, évolution, défi ; 1re spé `suite_evolution` (+10 % puis −10 %) ; STMG nature du pourcentage et taux équivalent.

## Découpage : 8 épisodes COMMUNS 1re + STMG, numéros 07 à 14, paysage Manim + short Manim
07 additif (jaune) · 08 diminution (jaune) · 09 valeur-finale (jaune) · 10 valeur-initiale (orange) · 11 calculer-taux (jaune) · 12 successives (orange) · 13 reciproque (bleue) · 14 compensation (orange) ; shorts blanche.
Garde 2de en plus pour 11, 12, 13 (`info_taux_evolution`, `info_evolutions_successives`, `info_evolution_reciproque`).
Liens possibles au coach (même vidéo, sans garde) : 3e `prop_evolution` (08, 09, 11) ; 4e `prop_pourcentage_defi` (12, 14) ; 2de `info_variation_absolue_relative` ; STMG `auto_evo_chaine_coefficients` (12).
Métier : pas un personnage par vidéo. Une scène de la vie d'un ado, puis 2 ou 3 autres contextes, et une phrase qui cite plusieurs métiers (Frédéric, 23/11 : « s'il est utile, il faut plusieurs exemples », « comme tu veux, le plus adapté à l'élève »).

## Voix
`manim/voix/lycee-evo-<slug>[-short].json` (16 fichiers). Sources : `scratchpad/evo/episodes.py` + `episodes2.py` de la session (voix + écran prévu + source + ceinture), page `scratchpad/evo/page-ecrans-evolutions.html` envoyée à Frédéric le 23/11. Il a répondu « go ». Bonnes réponses : 8 A, 8 B, 8 C.

## Fabrication
- Brief agents : `manim/brief-agent-evolutions-lycee.md`. 3 agents, brouillons -ql seulement : (07, 08, 09), (10, 11, 12), (13, 14).
- Scripts `manim/scripts/premiere/prop_lycee_evo_<slug>[_short].py`, classes `PropLyceeEvo<Slug>Premiere|Stmg|Seconde|Short`.
- Sorties prévues : `manim/sorties/<premiere|stmg|seconde>/maths/proportionnalite/<NN>-evo-<slug>/eleveai-maths-<classe>-prop-evo-<slug>[-short].mp4` ; ids manifeste `<classe>-prop-evo-<slug>[-short]`. (2de : numéros 03, 04, 05 à fixer.)

## Reste à faire
1. Relire les brouillons -ql (planches). 2. PLANCHE DES ÉCRANS (ouverture, chaque question, réponse, fin ; paysages ET shorts), envoyée à Frédéric avec SendUserFile « render » ; ATTENDRE son accord visuel. 3. HD un par un (RAM ≥ 2,5 Go), gardes STMG / 2de collées. 4. Passe finale comme 19f9ee085 / fbb6dbc5d : manifeste (ajouter seulement, compter avant/après), miniatures (gabarit A pour les shorts), R2, `videos-r2.json`, coach `notion_ressources`. 5. Corriger le coach si l'audit de robustesse trouve des défauts. 6. Commit par chemin, pas de push.

## Coach (audit du 23/11)
Le coach tient sur les évolutions, sauf deux points rouges : la valeur initiale (énoncés trop répétés, surtout en STMG) et la compensation ★3 (la bonne réponse est toujours la même). Il y a aussi des générateurs mal branchés sur la réciproque, un leurre « 1222,2222 € » et l'exercice type « + 15 % = × ? » absent. Un agent corrige : evolutions-lycee-renfort.ts, premiere/evolutions.bank.ts, stmg/proportions-evolutions.bank.ts, 4e/proportionnalite.bank.ts (genTauxGlobal). Rien n'est commité ; à relire puis à commiter par chemin.

## État au 23/11, fin de bloc
Coupure réseau : les 4 agents (brouillons 07-09, 10-12, 13-14, correction du coach) se sont arrêtés, puis ils ont été relancés. Si la session change, regarder ce qui existe déjà : `public/sons/lycee-evo-*`, `manim/scripts/premiere/prop_lycee_evo_*`, `media-prop-lycee-evo-*`, et `git diff` sur les 4 fichiers du coach.
Point exact après la 2e panne (agents bloqués, puis arrêtés) : les 16 WAV (`public/sons/lycee-evo-*`) et les 16 `*_marques.json` existent. AUCUN script `.py` écrit, aucun rendu. Coach : aucune modification ; la mesure « avant » a été faite par l'agent (scratchpad `evo/audit/`). CE SOIR : relancer 3 agents NEUFS de brouillons avec le brief (en précisant que WAV et marques sont faits), et 1 agent neuf pour le coach (le prompt complet est dans l'audit ci-dessus, points 1 à 9).

## 23/11 soir : relance
4 agents NEUFS lancés (brouillons 07-09, 10-12, 13-14 ; coach points 1-9). Leurs rapports arrivent dans la session « automatismes première » : elle les recopie ci-dessous (section « Rapports des agents ») avant de passer la main à 65 % de contexte. La relève vérifie d'abord ce qui existe (scripts `prop_lycee_evo_*.py`, `media-prop-lycee-evo-*`, `git diff` du coach).

## Rapports des agents
- ✅ COACH (23/11 soir) : les 9 défauts sont corrigés, commit « Coach évolutions ». genCompensation est réécrit (accords, formes variées) ; nouveaux genReciproque (1 ÷ k) et genCoeffQcm (« + 15 % = × ? »). genValeurInitiale passe de 6 à 8 tournures ; le leurre STMG est arrondi ; les leurres 4e de genTauxGlobal sont revus. Répétitions sur 20 : valeur initiale 1re 4,5 → 0,5, STMG 7,7 → 0,8, compensation STMG 3,5 → 0,6. Plus aucun rouge au script des squelettes. Reste : des leurres de réciproque volontairement absurdes (« − 200 % ») à juger en classe.
- Relève proposée (carte « Évolutions 1re + STMG : planche, HD, passe finale », task_b7943914). Elle n'a pas pu démarrer seule pendant un tour automatique : Frédéric la démarre d'un clic. Les 3 agents des brouillons tournaient encore (07-09 : rendus -ql ; 10-12 : chaîne -ql 12, 10, 11 ; 13-14 : en cours).
- ✅ 07, 08, 09 : brouillons -ql finis, rapport complet dans `manim/RAPPORT-evolutions-07-09.md` (temps, questions JSON).
- ✅ 13, 14 : brouillons -ql finis, rapport dans `manim/RAPPORT-evolutions-13-14.md`.
- ✅ 10, 11, 12 : brouillons -ql finis, rapport dans `manim/RAPPORT-evolutions-10-12.md`. TOUS LES BROUILLONS SONT FAITS. Prochaine étape : la planche des écrans pour Frédéric.

## 23/11 après-midi : relecture des 16 brouillons (session « Évolutions 1re + STMG : planche, HD, passe finale »)
- Dry runs AUDIT=1 BORDS=1 des 16 classes Premiere + Short : 0 AVANCE, 0 RETARD, 0 BORD. `verifier-bords-video.py` sur les 16 -ql : 0 instant.
- Outil de planche : `scratchpad/planche_evo.py` de la session (lit les CLE / ECRAN des logs de dry run, PNG par vidéo + page HTML `manim/sorties/planche-evolutions-1re.html`, ne pas commiter : images en base64). ⚠️ Les épisodes 10-12 (EvoLyceeBase) n'écrivent que « ECRAN … t=MM:SS » arrondi : les temps exacts des questions sont dans les lignes « QUESTION … (xx.xx) » des logs.
- Défauts corrigés (scripts modifiés, re-rendus -ql) :
  · espacement des morceaux de calcul (« De nouveau50 € », « 50× 1,2 », « 0,15[+ 15 %] ») : `lc` à buff 0,32 (copie de 07-09) ajouté dans EvoLyceeBase (10, 11, 12), 13 et 14 ; `ligne_rep` paysage buff 0,14 → 0,22 ; short `ligne_rep` (EvoShortBase) 0,14 → 0,2 ;
  · 10 : les trois métiers se touchaient (« comptable biologiste ») ; 11 : « Livret A » débordait du livret, « conseillère journaliste économiste » collés, « + 15 % » collé à « 0,15 » ; 14 : « sa sortie » posé sur la flèche, « agente immobilière gérant » serrés ;
  · shorts : 07 « + 8 %= × ? » (fs 56 → 46), 08 « − 30 % » et cadre « 50 × 0,7 = 35 € » près du bord, 09 « 80 €,− 25 % » et « = ? € » serrés contre « Réponds en commentaire », 10 « HT =96 € » et « 1,2=100 € », 11 boîtes « 20 € → 25 € » collées (flèche invisible), 12 cadre « − 75 % » qui touchait le signe, 14 « × 0,75 » contre son cadre.
- Vérifiés et bons : coche ✓ du short 13 (23 px, `verifier-coche-carte.py`, à lancer SANS -I : numpy introuvable sinon), zone Ti-Margo du short 14 (0 instant). Le trait au-dessus de « − 50 % ? » (12, écran 02) est l'animation Circumscribe en vol, pas un défaut.
- Sources vérifiées : Smic 11,65 → 11,88 € au 01/11/2024 (+ 2 %) ; Livret A 3 % → 2,4 % au 01/02/2025 ; Insee inflation + 5,2 % (2022), + 4,9 % (2023) ; TVA 20 %.
- Classes Stmg (07-14) et Seconde (11, 12, 13) : toujours ni dry run ni rendu.
- ⚠️ Shorts : TOUJOURS `-r 480,854` au rendu -ql et `-r 1080,1920` au dry run (sinon le mp4 sort en 854×480 dans un dossier 480p15 : fait par erreur puis effacé le 23/11). Pour le HD : `-qh -r 1080,1920`.
- 23/11 15h40 : les 12 vidéos corrigées sont re-rendues en -ql (dry runs 0 alerte, `verifier-bords` 0 instant). PLANCHE envoyée à Frédéric : `manim/sorties/planche-evolutions-1re.html` (ne pas commiter). On ATTEND son accord visuel avant tout HD.
- Après l'accord : HD un par un (Premiere puis Short, RAM ≥ 2,5 Go), puis gardes Stmg (07-14) et Seconde (11, 12, 13) : dry run d'abord, garde seule + `frac_cm_commun.py coller` (modèle : `prop_lycee_formes.py`). Passe finale : copier `manim/passe_affines_3e.py` en `manim/passe_evolutions_lycee.py` (temps mesurés à l'audio, manifeste en AJOUT seul).

## 23/11 soir : HD en cours, relève de la passe finale
- Frédéric a validé la planche (« Ok, lance le HD »). Les HD tournent dans la session fille « hd-evolutions-1re » (local_547cd788-f5c6-4b45-a9f9-ba0a769be957) : 16 HD un par un via `scratchpad/hd.sh` de la session précédente (logs `C:/Users/FRED/AppData/Local/Temp/claude/e03fd876cfac5b2e/dd74ae24-d993-4d90-881e-b9bf1e7472bf/scratchpad/hd/*.hd.log`), puis gardes Stmg / Seconde collées + contrôles. Elle ne commite rien et ne touche pas au manifeste. Elle écrit ici les chemins finaux et les numéros 2de. Paysage 07 HD : 0 bord, planche bonne.
- Reste pour la relève : attendre la fin des HD, puis faire la passe finale (copier `manim/passe_affines_3e.py` → `manim/passe_evolutions_lycee.py` : temps mesurés à l'audio, chapitres, questions JSON des rapports RAPPORT-evolutions-*.md re-mesurées, manifeste en AJOUT seul en comptant les entrées avant/après, miniatures (gabarit A pour les shorts), fiches YouTube, R2, `lib/videos/videos-r2.json`, coupes du lecteur, coach `notion_ressources` (1re, STMG, 2de + liens 3e/4e de la section « Découpage »)). Puis commits PAR CHEMIN : scripts `prop_lycee_evo_*` (+ marques), voix `manim/voix/lycee-evo-*`, `public/sons/lycee-evo-*`, notes REPRISE/RAPPORT/brief, passe et données. Jamais `media-*` ni `manim/sorties/planche-evolutions-1re.html`. Pas de push.

## 23/11 16h20 : relève de la passe finale (session « passe finale évolutions »), puis 2e relève à 60 %
- HD (session hd-evolutions-1re) : 12/16 finis à 16:19 (07 → 12, paysages + shorts), 0 échec. Restent 13, 14, puis gardes Stmg / Seconde collées + copies en `manim/sorties/<classe>/maths/proportionnalite/<NN>-evo-<slug>/`. Journal : `.../dd74ae24-.../scratchpad/hd/lot.out` (« TOUT FINI » à la fin du lot 1re). La session HD a été priée d'envoyer son rapport final à la session de la passe (attribut « from »). ⚠️ Ses sorties manim s'appellent `eleveai-maths-premiere-evo-<slug>` : vérifier les noms finaux dans sorties (`…-prop-evo-…` attendu par la passe) avant de mesurer.
- ÉCRITS, PAS ENCORE LANCÉS (rien commité) :
  · `manim/passe_evolutions_lycee.py` : 38 entrées (16 1re prioritaires du 11/07 au 18/07/2027 ; 16 STMG + 6 2de `plus_tard`, short = copie du short 1re). Testé à blanc avec des temps fictifs : titres ≤ 98 car., clés de voix toutes présentes, centres vérifiés par âge (mode → art-design, cuisine → sport). Ordre : `temps` → `voir` → `manifeste` (le manifeste se relit à l'identique : indent 2, CRLF en copie de travail ; compter avant/après, attendu 1740 + 38 si rien d'autre n'a bougé) → `coupes`.
  · `manim/miniature_evolutions_lycee.py` (paysages, badge par classe).
  · `scripts/miniatures-shorts-grille.json` : 8 entrées `premiere-prop-evo-<slug>-short` ajoutées (64 lignes, rien d'autre). La grille exige un PNG déjà présent au chemin `miniature` : poser d'abord une image (ffmpeg à 1 s), puis `python scripts/miniatures-shorts-grille.py premiere-prop-evo --planche` ; copier ensuite le PNG vers les shorts stmg / seconde.
  · `.tmp-ress-evolutions-lycee.mjs` (coach notion_ressources : nos 38 + liens 3e prop_evolution ×3, 4e prop_pourcentage_defi ×2, 2de info_variation_absolue_relative, STMG auto_evo_chaine_coefficients ; paysage + short). Lancer sans argument d'abord, regarder « classes vues », puis `ecrire`.
  · Commit des fichiers PARTAGÉS (manifeste, videos-r2, bilans, déjà modifiés par d'autres) : `python <scratchpad de la session passe>/blobs.py voir|indexer` (`C:/Users/FRED/AppData/Local/Temp/claude/e03fd876cfac5b2e/2dc8f6e6-ea62-4e0c-adfd-85ff1f168b36/scratchpad/blobs.py`) = HEAD + nos clés seulement, puis `git diff --cached --name-only` et commit NU (mémoire manifeste-partage-modifs-non-commitees). LecteurVideo.tsx et la grille ne sont pas modifiés par d'autres : commit par chemin.
- Reste aussi : `python scripts/fiches-youtube.py -prop-evo-`, `python scripts/vignettes-videos.py`, `scripts/r2-videos.ps1` (à blanc puis -Envoyer), `node scripts/generer-videos-r2.mjs` (sauvegarder videos-r2 et bilans avant, ne garder que nos clés), coupes dans `components/LecteurVideo.tsx`, `node scripts/verifier-centres-age.mjs`.

## 23-24/11 : HD + gardes FAITS (session « HD évolutions »)
- 16 HD rendus (-qh ; shorts -r 1080,1920), un seul à la fois, dry run AUDIT=1 BORDS=1 avant chacun (0 alerte). Logs : `scratchpad/hd/<slug>[_short].hd.log` de la session mère (dd74ae24…).
- Défauts vus en HD et corrigés (puis vidéo re-rendue seule) :
  · cadre du résultat des paysages (`cadre` du 4e, buff 0,08) : le « = » et le « % » touchaient le trait (net en 11) → `cadre` surchargé à buff 0,14 dans les bases 07, 08, 09, EvoLyceeBase (10-12), 13, 14. Là où la ligne est réduite par `lc`, le morceau encadré est décalé de 0,12 (08 correction ; 10 écrans 04, 07 et correction ; 11 correction). 12, 13, 14 ont été rendus directement avec le nouveau cadre ;
  · short 10 : « 120 ÷ 1,2 =[100 €] » et « 110 ÷ 1,1 =[100 €] » collés (ligne espacée, `ligne_rep` prend un `buff`, cadre 0,14) ;
  · short 11 : réponse sur UNE ligne réduite à 3,85 (minuscule, « 0,25 » collé au cadre) → deux lignes « 10 ÷ 40 = 0,25 » / « = + 25 % » ; cadres 0,14 ;
  · short 12 : cadre « − 75 % » contre Ti-Margo (fs 54 → 50, y −2,55 → −2,45), « 0,5= » et « soit[− 36 % » collés ;
  · short 14 : « au total : × 0,75 » contre son cadre (largeur 3,3, buff 0,16).
- Contrôles sur les 16 HD finaux : `verifier-bords-video.py` 0 instant partout ; coche des shorts (02b + 4 s) : 07 382 px, 08 374, 09 315, 10 222, 11 135, 12 135, 13 46, 14 260, tous ok ; planches basse déf regardées + zooms des cadres.
- Gardes : dry run de chaque classe Stmg / Seconde (0 alerte), garde seule GARDE_SEULE=1 -qh, collée par `frac_cm_commun.py coller`. Même durée que la 1re, 0 bord, raccord vérifié à l'image.
- Numéros 2de : 03 calculer-taux, 04 successives, 05 reciproque.
- MP4 FINAUX (`manim/sorties/…/maths/proportionnalite/`) :
  · premiere/07-evo-additif … 14-evo-compensation : `eleveai-maths-premiere-prop-evo-<slug>.mp4` + `…-short.mp4` (le short sert aux 3 classes) — copies des HD de `manim/scripts/premiere/media-prop-lycee-evo-<slug>[-short]/videos/…/1080p60|1920p60/` ;
  · stmg/07-evo-additif … 14-evo-compensation : `eleveai-maths-stmg-prop-evo-<slug>.mp4` ;
  · seconde/03-evo-calculer-taux, 04-evo-successives, 05-evo-reciproque : `eleveai-maths-seconde-prop-evo-<slug>.mp4`.
  slugs : additif, diminution, valeur-finale, valeur-initiale, calculer-taux, successives, reciproque, compensation.
- ⚠️ Les mp4 des sorties sont des COPIES (cp) : leur mtime ne coïncide pas avec un log de rendu ; la preuve de rendu est le mp4 du dossier media + son `.hd.log`.
- Reste (session mère) : passe finale (manifeste en ajout, miniatures, R2, videos-r2.json, coach), commit par chemin. Scripts modifiés (non commités) : les 8 `prop_lycee_evo_<slug>.py` sauf successives, et les shorts valeur_initiale, calculer_taux, successives, compensation.

## 24/11 matin : PASSE FINALE FAITE (session « passe finale évolutions », 2e relève)
- HD : 16 Premiere + Short (3 lots, lot.out / lot2.out / lot3.out) ; 11 gardes collées (8 STMG, 2de 03-04-05), la dernière à 06:57 après la veille du PC. Shorts STMG / 2de = copies du short 1re (cp). 38 mp4 aux noms `eleveai-maths-<classe>-prop-evo-<slug>[-short].mp4`.
- Temps mesurés à l'audio (38) → `manim/sorties/premiere/maths/proportionnalite/temps-evolutions.json`. Manifeste : 1740 → 1778 (+38), 0 ligne retirée par rapport à la sauvegarde. ⚠️ La passe réécrivait en LF un manifeste CRLF : corrigé (lecture `newline=""`), CRLF remis.
- Miniatures : 30 paysages (`miniature_evolutions_lycee.py`), 8 shorts 1re au gabarit A (image à 1 s puis grille), copiées vers STMG / 2de. Fiches YouTube (19 dossiers), vignettes.
- R2 : envoi FILTRÉ sur nos dossiers (130 fichiers, 38 mp4) via `r2-videos.ps1 -Rclone "copy … --include /{premiere,stmg,seconde}/maths/proportionnalite/*-evo-*/*.{mp4,png,webp}"` : l'envoi complet aurait poussé 1 517 fichiers d'autres sessions (brouillons Saphir…). Astuce : `RCLONE_CONFIG` = fichier vide, sinon la notice « config not found » arrête le script ($ErrorActionPreference Stop), et lancer par `powershell.exe -File` depuis Bash.
- `videos-r2.json` 2095 → 2133, `bilans-videos.json` 1324 → 1362 (+38 chacun, rien d'autre). Coupes : 38 dans LecteurVideo.tsx (8,4 s paysage, 4,7 s short). `verifier-centres-age` : 0 alerte sur nos vidéos. Coach `notion_ressources` : 52 lignes insérées (38 + 14 liens 3e / 4e / 2de / STMG).
- Reste : publication YouTube des 16 vidéos 1re (dates 11/07 → 18/07/2027 au manifeste) ; STMG / 2de en `plus_tard`. Push par le chef d'orchestre.
