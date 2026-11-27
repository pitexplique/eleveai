# Reprise — « ce qui tombe en silence dans le coach »

Session du 27/11/2026, branche `poste2`. Rien n'a été poussé : Frédéric pousse.

---

## ⚠️ Le correctif des 42 micros est FAIT, il n'est PAS EN LIGNE

Mesuré le 27/11 sur la production : `/api/notion-videos?matiere=maths&classe=4e` ne renvoie
**pas** le champ `short`. Le correctif est dans le commit, pas sur Vercel — **les 42 micros
qui reçoivent un short à la place de leur cours le reçoivent encore aujourd'hui, et le
recevront jusqu'au déploiement.** Rien n'est poussé : c'est Frédéric qui pousse.

Ça ne gêne pas les 6 lignes écrites le même jour : leurs trois shorts portent `?format=short`,
la seule forme que la production sache lire aujourd'hui.

## ⛔ Deux bugs à part entière, non corrigés

Ils ne sont pas des « replis » parmi d'autres : ce sont deux pannes que l'élève subit sans
qu'aucun signal n'existe, ni pour lui, ni pour le prof, ni dans le dépôt.
Reproduits sur **www.eleveai.fr**, pas en local.

### Bug 1 — « Commencer » ne fait rien, et `POST /api/coach/start` rend 500 sans un mot

Sur `/coach/serie?classe=terminale-spe&matiere=francais`, le coach s'affiche, l'élève appuie
sur **« Commencer »**, et il ne se passe **rien** : aucune question, aucun message d'erreur,
aucune roue qui tourne. Dans le réseau : `POST /api/coach/start` → **500**.

Ce n'est pas « Chargement du tutor… sans fin » comme je l'avais d'abord écrit — c'est pire,
parce qu'un chargement qui dure finit par alerter, alors qu'un bouton inerte passe pour un
clic raté. **Un 500 de `/api/coach/start` doit se voir à l'écran.**
Le `catch` responsable est à chercher autour de l'appel dans `app/coach/serie/TutorV4Client.tsx`.

### Bug 2 — le fil d'Ariane annonce une classe qui n'est pas celle du catalogue affiché

Même adresse : le fil d'Ariane affiche **« Terminale spé > Français > Langage oral »**
au-dessus de la liste de notions du **CE1** (fluence, écriture cursive, « Devenir lecteur »).
Avec `?classe=cp&matiere=economie` : **« Classe : cp »** au-dessus du catalogue de l'A1 économie.

L'étiquette ne se contente pas de taire le repli : elle affirme le contraire de ce qui est
servi. Ni l'élève ni le prof qui a partagé le lien ne peuvent voir que ce n'est pas le bon
programme. **Le fil d'Ariane doit nommer la classe RÉELLEMENT servie** — comme il le fait
déjà, correctement, pour une classe inconnue (`?classe=4eme` affiche bien « Classe : 6e »).

⚠️ `/coach/serie` n'a pas été touché : la correction change le comportement d'anciens liens
déjà distribués, et c'est la décision de Frédéric.

---

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
8. ⭐⭐ **Une sonde en Node dit ce que le CODE fait, pas ce que l'ÉLÈVE voit.** Ma mesure des
   88 combinaisons repliées était juste sur le catalogue servi, et fausse sur deux symptômes :
   ce n'est pas « Chargement du tutor… sans fin » (c'est un bouton qui ne fait rien, et
   `POST /api/coach/start` répond 500), et la classe inconnue n'est pas muette (le fil
   d'Ariane annonce « Classe : 6e »). **Reproduire dans le navigateur, en partant de
   l'accueil, avant de conclure.** Les portes du coach depuis l'accueil sont
   `/coach-ia/<matiere>?classe=…` — la matière est dans le CHEMIN —, et leurs sélecteurs
   n'offrent que les classes qui ont un paquet.

## Ce qui reste ouvert

Tout est détaillé dans `scripts/RAPPORT-COACH-SILENCIEUX.md`, section « Ce qui attend une
décision ». En résumé :

- **3 lignes de `notion_ressources` à corriger** (1 notion fantôme, 1 micro fantôme sur
  2 lignes). Écriture en base = décision de Frédéric, rien n'a été touché.
- ✅ **6 lignes écrites le 27/11** : les trois micros de Pythagore 4e
  (`pythagore_defi`, `pythagore_reciproque_conclure`, `pythagore_rediger`), chacune avec son
  paysage **et** son short. `notion_ressources` : 2 095 → **2 101**. Contrôlé sur l'état
  final : en 4e, **149 micros servies, 149 avec un paysage** — aucune n'est couverte par un
  short seul. Les 6 URL répondent 200, et les boutons sont visibles sur
  `www.eleveai.fr/coach-ia/maths?classe=4e`.
  Pour défaire : supprimer les lignes
  `a817fed4-ada6-4779-ad14-aff23abb6cdb`, `ca83c118-7247-4a62-af18-150cbb4da3bf`,
  `23940300-3225-4148-8cd9-27aa8f3a7db2`, `5af0410a-f05e-4e99-8e48-9cfa3fa4d158`,
  `ea6d392d-c9a0-4a6c-9301-cdcd1e415cbe`, `1bca99d4-187d-4e1c-91bc-b3dfd879c094`.
- ⛔ **Deux micros de 3e n'ont AUCUNE vidéo** — vérifié ligne à ligne, pas sur parole :
  la notion `pythagore_theoreme` de 3e a 7 micros, cinq sont servis (par les vidéos de 4e,
  et c'est délibéré), `pythagore_solide` a les siennes, et **`pythagore_rediger` et
  `pythagore_defi` ont zéro ligne**. Ça appartient au chantier vidéo, pas à l'audit.
  ⭐ Avant de produire : la 3e réutilise déjà les vidéos de 4e sur cinq de ses sept micros,
  et `4e-pythagore-rediger` et `4e-pythagore-defi-cube` existent, avec les mêmes
  identifiants de micro. Les rattacher coûterait deux lignes au lieu de deux tournages —
  c'est une décision de contenu, à poser à Frédéric avant de lancer un rendu.
- ⏳ **Les 49 autres clés orphelines attendent la parole de Frédéric.** Elles complètent des
  micros déjà pourvus : le gain est réel, il n'est pas urgent. Le script les retient mais ne
  les écrira pas sans `--cles=` nommant chacune. Les 10 de première spé sont bloquées tant
  que leurs titres affichent leur identifiant (« maths premiere second degre signe »), ce
  qui s'afficherait tel quel à l'élève.
- ⭐ **`--cles=` est une garde de périmètre, pas un confort.** Un accord porte sur une liste
  nommée, jamais sur « tout ce que le script retient ce jour-là » : le registre bouge, et une
  clé ajoutée entre l'accord et l'exécution serait écrite sans que personne l'ait lue. Le
  script s'arrête si une clé demandée n'est pas candidate.
- ✅ **Les 22 lignes de micros masquées : gardées** (décision du 27/11). Le vérificateur les
  classe à part ; ne pas les resignaler comme un reste à traiter.
- **`/coach/serie` ne s'affiche pas sur le serveur de dev local** (port 3500, config
  `eleveai-5`) : la page reste sur « Chargement du coach… ». La prod, elle, l'affiche.
  Cause non établie, non imputable aux modifications de cette session (la frontière
  `Suspense` qui bloque est au-dessus de tous les fichiers touchés, et `/coach-ia` rend
  normalement sur le même serveur). **À reproduire avant de conclure quoi que ce soit.**
- **88 combinaisons `?classe=…&matiere=…` sur 132**, confirmées par le chemin de l'élève :
  aucune n'est atteignable depuis l'accueil, mais par une adresse écrite à la main le fil
  d'Ariane affiche « Terminale spé > Français » au-dessus du catalogue du CE1. Le correctif
  évident serait de refuser une combinaison inconnue au lieu de la replier ; ça touche
  `normalizeClasse`/`normalizeMatiere` et les cinq `default:` de `catalog.ts`, et ça change
  le comportement d'anciens liens. Pas fait sans l'accord de Frédéric, et **`/coach/serie`
  n'a pas été touché**.
