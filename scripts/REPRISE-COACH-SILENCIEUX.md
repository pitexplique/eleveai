# Reprise — « ce qui tombe en silence dans le coach »

Session du 27/11/2026, branche `poste2`. Rien n'a été poussé : Frédéric pousse.

## L'outil

```powershell
npx tsx scripts/verifier-coach-silencieux.ts --sortie=scripts/RAPPORT-COACH-SILENCIEUX.md
```

Lecture seule, relançable chaque semaine. Options utiles :

| option | à quoi ça sert |
| --- | --- |
| `--sans-reseau` | sections 2 → 6 seulement (quelques secondes au lieu de ~20 min) |
| `--registre=origin/main` | **le défaut** : lit le registre R2 **déployé**, pas la copie de travail |
| `--registre=travail` | lit `lib/videos/videos-r2.json` du disque |
| `--base=http://localhost:3500` | mesurer un serveur de dev au lieu de la prod |
| `--concurrence=4` | 4 par défaut ; ne pas monter, c'est la prod |

## Les pièges rencontrés, pour ne pas les repayer

1. **La copie de travail n'est pas ce qui est en ligne.** `main` local était 452 commits
   derrière `origin/main`, et `poste2` est 38 clés derrière le registre déployé. Comparer
   les deux registres sur le fichier du disque fabriquait 32 « clés manquantes » qui
   n'existaient pas : les mêmes URL répondaient 200 en prod. D'où `--registre=origin/main`
   par défaut. **Un chiffre tiré d'un fichier local n'est pas une mesure du site.**
2. **Supabase rend 1 000 lignes au plus.** Sans pagination, `notion_ressources` (2 095
   lignes) se lit à moitié, sans erreur et sans avertissement.
3. **Un bouton mort ne renvoie pas 404 à l'élève.** Le modal du coach appelle
   `/api/video-lecteur/<id>` ; sur un 404 il affiche « Cette vidéo n'est pas encore sur le
   site » et un lien « L'ouvrir à part ». C'est l'adresse qu'il faut appeler pour mesurer,
   pas seulement `/video/<id>`.
4. **`/video/<11 caractères>` inconnu du registre redirige vers YouTube**
   (`app/video/[id]/page.tsx`). Un test qui suit les redirections verrait 200 et conclurait
   que tout va bien, alors que l'élève est parti chez YouTube. Le vérificateur appelle en
   `redirect: "manual"` et lit l'en-tête `Location`.
5. **Le format d'une vidéo n'est PAS dans son URL.** Ni le suffixe `-short` de la clé, ni
   `?format=short` : `?format=short` n'est lu par aucune page. Le lecteur et le modal lisent
   le champ `short` de `videos-r2.json`. Toute mesure de « short vs paysage » doit partir
   de là.
6. **`npx tsc --noEmit` manque de mémoire** sur ce dépôt : `NODE_OPTIONS=--max-old-space-size=8192`.
7. **`npx tsx` ne supporte pas le `await` de haut niveau** dans un script : envelopper dans
   `async function main()`.

## Ce qui reste ouvert

Tout est détaillé dans `scripts/RAPPORT-COACH-SILENCIEUX.md`, section « Ce qui attend une
décision ». En résumé :

- **3 lignes de `notion_ressources` à corriger** (1 notion fantôme, 1 micro fantôme sur
  2 lignes). Écriture en base = décision de Frédéric, rien n'a été touché.
- **22 lignes servent des micros masquées** : elles ne s'affichent nulle part. À garder ou
  à supprimer, c'est une décision éditoriale.
- **`/coach/serie` ne s'affiche pas sur le serveur de dev local** (port 3500, config
  `eleveai-5`) : la page reste sur « Chargement du coach… ». La prod, elle, l'affiche.
  Cause non établie, non imputable aux modifications de cette session (la frontière
  `Suspense` qui bloque est au-dessus de tous les fichiers touchés, et `/coach-ia` rend
  normalement sur le même serveur). **À reproduire avant de conclure quoi que ce soit.**
- **88 combinaisons `?classe=…&matiere=…` sur 132** reçoivent le catalogue d'une autre
  classe avant que l'API n'échoue. Le correctif évident serait de refuser une combinaison
  inconnue au lieu de la replier ; ça touche `normalizeClasse`/`normalizeMatiere` et les
  cinq `default:` de `catalog.ts`, et ça change le comportement d'anciens liens. Pas fait
  sans l'accord de Frédéric.
