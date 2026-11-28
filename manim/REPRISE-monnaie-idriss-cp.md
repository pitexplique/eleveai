# REPRISE — Monnaie Idriss, CP (épisodes 07 → 11), 28/11/2026

Voix VALIDÉES par Frédéric (ne pas les changer sans lui) : `manim/SCRIPTS-monnaie-idriss.md` (section CP) et `manim/voix/idriss-cp-*-{paysage,short}.json`.
Règles communes aux trois sessions (CP, CE1, CE2) : note `monnaie-idriss-regles-communes.md` du dossier de notes partagé (verrou HD `hd-verrou.txt`, RAM ≥ 2,5 Go).

## Épisodes (bonnes réponses du script)
| N° | Épisode | Short | Paysage |
|---|---|---|---|
| 07 | cp-reconnaitre | « Les trois trésors de la mouette » (C) | « Le soir, la caisse d'Idriss » (A, C) |
| 08 | cp-valeur | « La vieille boîte à hameçons » (C) | « Combien m'a-t-on donné ? » (C, B) |
| 09 | cp-comparer | « La mouette et le crabe » (A) | « Qui a le plus ? » (C, B) |
| 10 | cp-rendre | « Le filet du voisin » (A) | « La sardine du petit garçon » (C, B) |
| 11 | cp-defi | « Deux glaces pour Idriss » (B) | « Les défis d'Idriss » (A, A) |

## Fichiers (ceux du CP seulement)
- Films : `prototypes/ti-margo/films/idriss-cp-<ep>.js` (short) et `idriss-paysage-cp-<ep>.js` (paysage).
- Dessins CP : `films/idriss-dessins-cp.js` — coquilleRondeE (coquillage rond doré, sans nombre), loupeE, boiteHameconsE (rouillée, secouée, couvercle),
  filetRouleE, glaceE (option moitie), chariotGlacesE (parasol), goutteE (sueur), tasE (rangée de pièces/billets).
- Sons : `public/sons/idriss-cp-<ep>-{short,paysage}/` (ignorés par git). Sorties : `manim/sorties/idriss/<num>-cp-<ep>/`.

## ⚠️ Leçons
- `ti-margo-cues.py` réécrit tout `idriss-cues.js` / `idriss-paysage-cues.js` : deux sessions en même temps → l'une efface les épisodes de l'autre.
  Après un passage, vérifier que les 5 épisodes CP sont dans LES DEUX fichiers (sinon relancer `python scripts/ti-margo-cues.py idriss[-paysage] cp-<ep>`).
- Titres longs des shorts : `#titre{font-size:60px}` dans le film (07, 08).
- `phraseE(txt, ts)` : autant d'instants que de mots (séparés par des espaces) dans txt.

## Commandes
- Contrôle -ql : `CONTROLE=<dossier> node scripts/ti-margo-short.mjs idriss[-paysage] cp-<ep> controle $(seq 1 2.5 130)` puis
  `python scripts/ti-margo-planche.py <dossier> <planche.png>`.
- HD (sous le verrou) : `node scripts/ti-margo-short.mjs idriss[-paysage] cp-<ep> film` ; miniature : `... miniature`.

## État
- [x] 10 WAV + instants (28/11).
- [x] 10 films écrits (commit 3b03bb352).
- [x] Planches -ql 07 short + 07 paysage contrôlées et corrigées (commit e6d98ed09) : prêtes pour la HD.
- [ ] Planches -ql 08 → 11 (shorts + paysages) : JAMAIS regardées. Leçon du 07 paysage : dessiner plus GRAND (pièces t ≥ 80, billets t ≥ 52),
  textes de réponse aérés, rien sous Ti Margo (x < 120 en bas à gauche), rien à droite de x = 480 pendant les questions.
- 28/11 : Frédéric a fait arrêter les 4 `next dev` (≈ 4 Go) → 5,3 Go libres. Il préfère : UNE chose à la fois, petit à petit.
- [ ] HD une à la fois, planches HD, miniatures (gabarit A, « Dessin animé »).
- R2, manifeste, coach, YouTube : PAS sans l'accord de Frédéric. Pas de push.
