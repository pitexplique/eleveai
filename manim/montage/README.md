# Montage vidéo EleveAI — `montage.py`

Outil ffmpeg (piloté en Python, comme Manim) pour **sonoriser** un rendu Manim muet
et le **préparer pour YouTube / les Shorts**, sans passer par un logiciel de montage.

Il fait, en une commande :
- **Voix** (iPhone) collée sur la vidéo, avec réglage de synchro ;
- **Fond musical dosé** (ducking : la musique baisse toute seule quand tu parles) ;
- **Normalisation à -14 LUFS** (standard YouTube) ;
- **Version verticale 9:16** (1080×1920) pour les Shorts ;
- **Sous-titres incrustés** (fichier `.srt`).

> Le montage répétitif est mécanique → on l'automatise. Il ne te reste que l'humain :
> enregistrer la voix et penser le hook.

---

## Prérequis
- **ffmpeg + ffprobe** dans le PATH (déjà installés, Manim en dépend).
- **Musique / bruitages gratuits** : YouTube Studio → *Audio library* (libres de droits, monétisables).

## Le workflow complet
1. **Rendre la vidéo muette** avec Manim (comme d'habitude, cf `../REGLES.md`).
2. **Enregistrer la voix** au téléphone (app Dictaphone) en regardant la vidéo :
   pièce calme et *mate* (rideaux/canapé), téléphone à ~20-30 cm, dire **« top »** pile
   quand le titre d'accueil apparaît (repère de synchro). Transférer le fichier (câble/Drive).
3. **Monter** avec `montage.py` (voir recettes ci-dessous).
4. **Uploader** le mp4 sur YouTube.

## Recettes

```bash
# 1) Notion 16:9 : rendu Manim muet + ta voix, son normalisé -14 LUFS
python manim/montage/montage.py \
  --video eleveai-maths-6e-entier-calcul-pose.mp4 \
  --voice voix-calcul-pose.m4a
```

```bash
# 2) + fond musical (baisse tout seul sous la voix)
python manim/montage/montage.py --video ...mp4 --voice voix.m4a --music bed.mp3
```

```bash
# 3) Caler la voix : couper les 3,5 s de blabla + « top » du début de l'enregistrement
python manim/montage/montage.py --video ...mp4 --voice voix.m4a --voice-start 3.5
```

```bash
# 4) Short vertical 9:16 + sous-titres incrustés
python manim/montage/montage.py --video ...mp4 --voice voix.m4a --srt sous-titres.srt --vertical
```

```bash
# Voir la commande ffmpeg sans l'exécuter
python manim/montage/montage.py --video ...mp4 --voice voix.m4a --dry-run
```

## Options

| Option | Défaut | Rôle |
|---|---|---|
| `--video` | *(requis)* | Le rendu Manim muet. |
| `--voice` | — | La voix enregistrée (m4a/mp3/wav). |
| `--music` | — | Fond musical (bouclé + baissé sous la voix). |
| `--srt` | — | Sous-titres `.srt` à incruster. |
| `--vertical` | off | Sortir en **9:16** (Short) au lieu de 16:9. |
| `--voice-start N` | 0 | Couper les **N premières secondes** de la voix (le « top »). |
| `--delay N` | 0 | Ajouter **N s de silence AVANT** la voix (pour finir de caler). |
| `--music-vol V` | 0.18 | Volume du fond musical (0 à 1). |
| `--lufs L` | -14 | Cible de normalisation (laisser -14 pour YouTube). |
| `--out F` | `<video>-sonorise.mp4` / `-short.mp4` | Nom de sortie. |
| `--crf N` | 18 | Qualité vidéo au ré-encodage (18 = très bon). |
| `--dry-run` | off | Affiche la commande ffmpeg sans lancer. |

## Caler la voix
`--voice-start` coupe le début raté (blabla + « top »), `--delay` ajoute du silence
si la voix part encore trop tôt. Exemple : « top » à 3,2 s → `--voice-start 3.2`.
Si la voix **déborde** sur un écran, ne recoupe pas l'audio : rallonge le `wait()` dans le
script Manim et re-rends (règle de `../REGLES.md` : la vidéo s'adapte à la voix, jamais l'inverse).

## Générer un `.srt` (sous-titres)
- **CapCut** (gratuit) : sous-titres automatiques FR → exporter en `.srt`.
- ou **Whisper** (local) : `pip install -U openai-whisper` puis
  `whisper voix.m4a --language French --model small --output_format srt`.

## Notes techniques
- L'**horizontal sans sous-titres copie la vidéo** (pas de ré-encodage → rapide et sans perte) ;
  dès qu'il y a sous-titres ou vertical, la vidéo est ré-encodée (x264, CRF 18, yuv420p, faststart).
- La sortie est **bornée à la durée de la vidéo** (`-t`) : la musique bouclée ne fait jamais déborder.
- Le **vertical** met la vidéo 16:9 centrée sur fond noir (1080×1920), sous-titres gros et lisibles
  (pour un rendu Short optimal, un vrai rendu 9:16 dans Manim — comme la série « en vrai » — reste supérieur).
- Loudness **-14 LUFS / true peak -1 dBTP** en une passe (YouTube re-normalise de toute façon).
