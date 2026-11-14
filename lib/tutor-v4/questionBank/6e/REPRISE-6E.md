# Reprise — règle 6e ★1-★2 : ✅ TERMINÉE le 03/11/2026

Règle : `REGLES-6E.md`. Brief des agents : `BRIEF-AGENT-6E.md`.
Mesure : `node scripts/mesure-contexte-coach-6e.mjs` → 141 micros sur 147 à 0 % ;
les 6 restantes sont des faux positifs (« Scratch », « euros » en proportionnalité).
Correcteurs : `npx tsx scripts/verifier-correcteurs-maths-6e.ts` → 715 gabarits justes.

Commits du 03/11 après-midi (pas tous poussés) : entiers `033e6c31`, volumes +
algorithmique `c41d84e5`, calcul mental + posé `5b255c70`, triangles `7a6f4b84`,
angles + cercle `1860d66b` ; le matin : fractions, données, probabilités,
décimaux, pourcentages, aires, etc.

## À surveiller (non bloquant)
- Notation Ĉ (`$\widehat{C}$`) nouvelle en 6e (triangles) : déjà utilisée en 4e
  (cosinus), pas encore vue dans le navigateur en 6e.
- Angles ★2 : « ABC = 40° » sans chapeau pour tenir en 15 mots (à valider).
- Quelques gabarits ★3 hérités à 26-33 mots (triangles, cercle_proportionnel_tpl_1,
  cercle_ensemble_tpl_1).
- Algorithmique : les lignes du programme comptent comme la figure (énoncés 14-23 mots).

## 14/11/2026 — Plus de figures dans la géométrie du coach (canvas existants seulement)

Constat de `docs/etude-images-cm1-6e.md` : la 6e était la classe la moins dessinée
(33 % d'énoncés avec figure, CM1 66 %, CM2 60 %) alors que ses élèves lisent mal.
Aucun nouveau canvas ni objet : `triangle`, `quadrilatere`, `cercle`, `droites`,
`angle`, `construction`, `figure_libre`, `solide_3d`, calculés dans `generate()`.

Mesure (part d'énoncés avec dessin, 30 tirages par gabarit) — avant → après :

| Notion | Avant | Après |
|---|---|---|
| quadrilatere_propriete | 4 % | 61-62 % |
| cercle_circonscrit | 13 % | 90 % |
| volume_solide | 13 % | 60-61 % |
| mediatrice_segment | 17 % | 68 % |
| aire_perimetre | 19 % | 82 % |
| aire_surface | 23 % | 70 % |
| aire_unite | 28 % | 69 % |
| aire_longueur | 0 % | 74 % |
| distance_segment | 27 % | 70 % |
| triangle_propriete | 28 % | 63 % |
| cercle_disque | 29 % | 70 % |
| angle_mesure | 36 % | 67 % |
| **toute la 6e** | **32 %** | **54 %** |

`quadrilatere_figure` (49 %) et `triangle_figure` (69 %) n'ont pas bougé.

Règles tenues : la figure ne porte JAMAIS la réponse (« ? » sur la longueur ou
l'angle cherché, pas de nom de figure cherché, codage seulement des propriétés
données) ; figures à l'échelle des nombres tirés.

**Laissé sans figure, exprès** : vocabulaire pur (le dessin trahirait), vrai/faux
qu'un dessin trancherait, comparaisons de nombres (volume_comparer, comparer
deux longueurs : à l'échelle, l'œil répond), « est-il forcément un carré ? »
(`genQuadConclusion` : une figure qui ressemble à la nature affirmée pousse
vers « oui » quand la réponse est « non » — retirée), horloges, graduations.

**Correcteurs** : `correcteurs/cercle-circonscrit.ts` relit maintenant le canvas
`construction` (`constructionRelue` : points existants, angle codé droit à 1°,
segments codés égaux à 2 %, centre équidistant, sommets sur le cercle, lettres
de l'énoncé, longueurs à la même échelle, pas de réponse écrite). Cas de refus
`casRefusConstruction()` branché dans `scripts/verifier-correcteurs-maths-6e.ts`
(refusé avec 6 motifs). Ailleurs, des figures ont été mises en `construction`
plutôt qu'en `quadrilatere` / `angle` quand le correcteur relisait les cotes
écrites comme des données en plus.

**Rendu** : `lib/canvas/CercleCanvas.tsx` — l'étiquette d'un DIAMÈTRE se posait
sur le centre (le point O la cachait) ; elle s'écarte de 26 px quand le milieu du
segment tombe sur un point. Défaut ancien, devenu fréquent avec les figures.

Vérifié : correcteurs 1 219 ✅ ; squelettes 6e sans nouvelle ❌ (restent les 14
micros d'entiers, déjà ❌) ; contexte 6e inchangé ; `tsc` sur `lib/` propre ;
~65 figures rendues relues (aperçu → planche PNG via sharp).

### À surveiller
- volume_solide et quadrilatere_propriete sont tout juste au-dessus de 60 % :
  les gabarits restants sont des comparaisons de nombres ou du vocabulaire.
- ✅ Angles (fait le même jour) : `eventail()` en `construction` remplace les
  demi-droites fléchées sans arc. L'angle DONNÉ porte sa mesure en bleu, le
  cherché un « ? » rouge. Le croisement est fait de deux vraies droites. La
  tarte est un disque dont les parts prises sont colorées. Le coin droit
  partagé a ses deux bords épais et son petit carré. 12 endroits, correcteurs
  127 ✅, squelettes ✅. Restent en flèches les croisements NOMMÉS
  (`figureRayons` avec lettres : opposés/adjacents, `genDefiCroixSomme`), où
  les lettres désignent déjà les angles.
- Objets de volume_unite / volume_lire : pavé sans mesure, surtout décoratif.
- Le script d'aperçu `scripts/apercu-canvas.mjs` plante sur l'import CSS de
  katex (contourné par un `--import` qui vide les `.css`).
