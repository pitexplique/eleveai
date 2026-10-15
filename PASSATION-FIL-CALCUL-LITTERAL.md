# Reprise : fil « calcul littéral » et vidéos du 08 au 12/10/2026

Tu reprends une session de production vidéo (Manim) pour Frédéric. Lis d'abord ta
mémoire : `fil-calcul-litteral-5e-au-lycee.md`, `video-5e-relatifs-parlee.md`,
`paysage-tvi-modele-qui-plait.md`, `apercu-seulement-la-derniere-video.md`,
`script-video-se-valide-a-deux.md`, `les-maths-ca-sert-a-rien-sauf-a.md`.

## Règles (ne pas redécouvrir)
- La VOIX d'une vidéo se valide à deux : écrire `manim/voix/<nom>.json`, la coller EN ENTIER, attendre « go ».
- Voix : `powershell -File scripts/generer-voix.ps1 -Fichier manim/voix/<nom>.json -Debit <d>` (5e −8, 4e −7, 3e −6, lycée −4/−5).
- Rendu : contrôle `-ql` + planche (`python scripts/planche-video.py <mp4> <png> 3`), corriger les chevauchements, puis `-qh` (shorts : `-r 1080,1920`).
- Ranger mp4 + png dans `manim/sorties/<classe>/maths/{paysage|shorts}/fr/<notion>/`. Miniatures paysage : `manim/miniature_essai_v2.py` ; shorts : `manim/miniature_short_6e_nombres.py`.
- Entrée au `manim/manifeste-youtube.json` (jamais de « < » ni « > » dans titre/description).
- Aperçu : SEULEMENT les dernières vidéos générées, dans `manim/sorties/apercu.html`, servi par la config `sorties-video` (port 3900), jamais d'autoplay.
- Quand Frédéric donne un lien : url au manifeste, ligne(s) `notion_ressources` (scripts `.tmp-ressource-*.mjs` à la racine, modèle à copier), entrée `VIDEOS_FICHES` dans `app/sitemap.ts` (fiche de cours, sinon feuille d'exercices), commit PAR CHEMIN, push à son signal.
- ⛔ Rien de `manim/` dans un commit. Répondre en français. Tout short finit par une question en commentaire.
- « Les maths, ça sert à rien… sauf à » : il en doute (12/10) → plus par réflexe, jamais en ouverture de short.

## Déjà EN LIGNE et branché
Relatifs 5e (paysage + 7 shorts + Diagonale) · Calcul littéral 5e `c8ScGIErxJM` · TVI terminale `GWVlbZyiME4` ·
« Une formule = 3 formules » `j-vrDltO9vA` · Factoriser `x2n_wQ9d0AY` · short Maïdo 3e `jgKPDpsNqA8`.
Commit à pousser à son signal : `186d352e` (sitemap Factoriser).

## RENDU, À PUBLIER PAR LUI puis à brancher dès qu'il donne le lien
| Vidéo | Fichier (sous manim/sorties/) | Branchement coach |
|---|---|---|
| Développer (4e) | 4e/maths/paysage/fr/litteral-developper/ | 4e `litteral_distributivite` + `litteral_identite_remarquable` (micro vide) ; sitemap fiche 4e/litteral-distributivite |
| Résoudre une équation (4e) | 4e/maths/paysage/fr/equation-resolution/ | 4e `equation_resolution` (vide) ; sitemap fiche 4e/equation-resolution |
| Produit nul et x² = a (3e) | 3e/maths/paysage/fr/equation-resolution/ | 3e `equation_resolution` (vide) ; sitemap fiche 3e/equation-resolution |
| Second degré forme factorisée (1re, STMG) | premiere/maths/paysage/fr/degre2-forme-factorisee/ | `premiere`/`quad_racines_signe` + `stmg`/`fct_degre2_factorisee` ; sitemap feuille premiere/quad-racines-signe |
| 7 shorts calcul littéral (5e) | 5e/maths/shorts/fr/litteral-calcul/ | micro 5e `litteral_<x>` ET micro 4e `litteral_expression_<x>` (comprendre, traduire, substituer, reduire, defi ; tester et distributivite : 5e seule) |
| 5 shorts TVI (terminale) | terminale/maths/shorts/fr/continuite-tvi/ | `terminale-spe`/`continuite_tvi`, microId dans le manifeste |
Titres, descriptions, tags : dans le manifeste (champ `accroche`) ; `node scripts/page-publication.mjs` les met en page.
Playlists : Maths 4e, Maths 3e, Maths 1re et STMG (à créer s'il ne l'a pas fait), Maths terminale spé.

## RESTE À FAIRE
1. Paysage 6 du fil : « le tableau de signes » (seconde `signes_expression_2de`, 1re/STMG `auto_signe*`, signe de f′ en 1re spé). Modèle = la paysage TVI (image vécue avant la règle, piège, rédaction). Écrire la voix, la coller, attendre « go ».
2. Les shorts des paysages (un par micro) : Développer, Équations 4e, Produit nul 3e, Factoriser, Second degré 1re, Une formule = 3 formules.
3. 3 shorts « Diagonale des Fous » → micros défis (note `shorts-diagonale-des-fous-2026.md`), à publier avant le 14/10.
