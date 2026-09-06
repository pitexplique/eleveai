# Les vignettes des Shorts — une image verticale par vidéo, à téléverser.
#
# ── POURQUOI (04/09/2026) ─────────────────────────────────────────────────────
# ⭐⭐ Sur un Short, YouTube ne montre PAS le PNG 1280×720 du générateur de
# miniatures : le fil lance la vidéo. La seule image qui compte est celle qu'il
# prélève lui-même, vers 1 à 1,5 s — et elle décide de tout. Rappel du chiffre
# qui commande ce chantier : **126 vues pour un Short contre 2 pour la même
# vidéo en paysage**.
#
# ⛔ CE PRÉLÈVEMENT A DÉJÀ RATÉ. Trois Shorts (`a`, `i`, `o`) sont partis en
# ligne avec une vignette NOIRE : la page de garde s'arrêtait pile au moment du
# prélèvement. Le réglage a bougé trois fois (0,75 → 1,30 → 1,80 → 1,50) sans
# jamais être sûr, parce qu'on devinait le moment exact.
#
# ⭐ LA VIGNETTE TÉLÉVERSÉE À LA MAIN SUPPRIME LA DEVINETTE. On ne dépend plus
# de l'instant choisi par YouTube : on lui donne l'image. C'est ce qui permet de
# revenir à 1,50 s de garde — la durée redevient une question de rythme, et sur
# un Short 0,3 s au démarrage ne sont pas rien (Frédéric, 04/09 : « on revient à
# 1,5 s et on crée miniature »).
#
# ⚠️ L'IMAGE EST PRISE DANS LA VIDÉO, pas redessinée. Une vignette qui ne serait
# pas exactement la première image ferait une promesse que la vidéo ne tient
# pas — et c'est le genre d'écart que personne ne revérifie ensuite.
#
# ── USAGE ─────────────────────────────────────────────────────────────────────
#   python scripts/vignettes-shorts.py            → toutes les vidéos trouvées
#   python scripts/vignettes-shorts.py lettre_u   → un seul dossier
#
# Sortie : manim/sorties/cp/<matiere>/shorts/<langue>/
#            eleveai-....mp4        ← le fichier à téléverser
#            vignette-....png       ← l'image à lui associer
#
# ⭐⭐ POURQUOI UN NIVEAU « fr / gb », ET POURQUOI LA VIDÉO VOYAGE AVEC SON IMAGE
# (Frédéric, 05/09/2026 : « fait attention de bien les mettre sous le bon
# répertoire cp/shorts/francais/fr ou gb », « idem pour les miniatures »).
# ⛔ L'anglais s'était déjà glissé au milieu du français : `vignette-short-
# eleveai-english-cursive-letter-u-left.png` dormait dans le dossier des lettres
# françaises. À une langue près on ne le voit pas ; à cinq, on téléverse la
# mauvaise vignette sur la mauvaise vidéo — et sur un Short la vignette EST la
# décision de regarder.
# ⭐ Et les deux fichiers vivent CÔTE À CÔTE parce qu'on ne les manipule jamais
# séparément : téléverser, c'est ouvrir un dossier et prendre les deux. Les
# laisser dans deux arbres différents (`media/videos/…/1920p60/` d'un côté,
# `miniatures/` de l'autre) obligeait à faire la correspondance à la main.

import shutil
import sys
from pathlib import Path

# ⚠️ La console Windows est en cp1252 : un ⛔ dans un message d'alerte y lève
# UnicodeEncodeError et FAIT PLANTER LE SCRIPT. Un garde-fou qui casse au moment
# où il a quelque chose à dire ne protège de rien.
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")

import av

RACINE = Path(__file__).resolve().parents[1]
VIDEOS = RACINE / "manim" / "scripts" / "cp" / "media" / "videos"
SORTIES = RACINE / "manim" / "sorties" / "cp"

# ⭐ La matière ET la langue se lisent dans le NOM DU FICHIER, pas dans le
# dossier de rendu. C'est voulu : le nom est aussi le titre du fichier téléversé,
# donc il est déjà vérifié à l'œil à chaque publication. Un dossier, non.
# ⛔ Rien ne se devine ici : un préfixe inconnu ARRÊTE le rangement au lieu de
# choisir « francais » par défaut. C'est exactement le défaut par défaut qui a
# fait dormir l'anglais chez le français.
# ⚠️ L'ORDRE COMPTE : le plus spécifique d'abord. « eleveai-english-number- »
# doit être reconnu AVANT « eleveai-english- », sinon un chiffre anglais se
# rangerait chez le français — exactement la faute que ce tableau existe pour
# empêcher.
PREFIXES = {
    "eleveai-english-number-": ("maths", "gb"),
    "eleveai-english-": ("francais", "gb"),
    "eleveai-francais-cp-": ("francais", "fr"),
    "eleveai-maths-cp-": ("maths", "fr"),
}


class PrefixeInconnu(Exception):
    """Le nom du fichier ne dit ni sa matière ni sa langue."""


def route(nom: str) -> tuple[Path, str]:
    """(dossier de destination, nom court) — ou une exception.

    ⭐ Le FORMAT se lit dans le nom, comme la matière et la langue : un fichier
    « …-paysage » va dans `paysage/`, tout le reste dans `shorts/`. Le plan
    d'expérience du 06/09 compare les deux formats — les mélanger dans un même
    dossier rendrait la comparaison impossible à tenir.
    """
    for prefixe, (matiere, langue) in PREFIXES.items():
        if nom.startswith(prefixe):
            format_ = "paysage" if nom.endswith("-paysage") else "shorts"
            court = (nom[len(prefixe):]
                     .replace("-portrait", "").replace("-paysage", ""))
            return SORTIES / matiere / format_ / langue, court
    raise PrefixeInconnu(
        f"« {nom} » ne commence par aucun préfixe connu : "
        f"{', '.join(PREFIXES)}. Renommer la vidéo, ou ajouter le préfixe ici."
    )

# ⚠️ 0,60 s et non 1,00 : on veut être au MILIEU de la page de garde, loin du
# fondu de sortie quel que soit le réglage en vigueur. L'image y est identique —
# la garde ne bouge pas — mais la marge, elle, protège des futurs changements.
INSTANT = 0.60


# ⛔⛔ LE FICHIER PÉRIMÉ, ET COMMENT IL EST ARRIVÉ JUSQU'À LA PUBLICATION.
# Le 05/09, deux rendus anglais ont échoué (`verifier()` a arrêté sur un texte
# trop large — il a fait son travail). Manim n'a donc rien écrit, l'ANCIEN MP4
# est resté en place, et ce script l'a rangé et vignetté comme s'il était neuf.
# La vidéo annoncée comme corrigée était la précédente.
# 👉 Un rendu qui échoue ne laisse pas de trace dans le dossier de sortie : il
# laisse le fichier d'AVANT, qui est bien plus difficile à repérer qu'un fichier
# absent. D'où l'invariant, vérifié ici : **une vidéo doit être plus récente que
# le code qui l'a produite.**
SOURCES = RACINE / "manim" / "scripts" / "cp"


# ⛔ ON COMPARE À SON PROPRE CODE, PAS À TOUT LE DOSSIER. Première version :
# `max()` sur tous les `.py` de `scripts/cp/`. Elle a déclaré périmée une vidéo
# française parfaitement fraiche, simplement parce qu'un fichier ANGLAIS avait
# été modifié après son rendu. Un garde-fou qui crie à tort finit désactivé, et
# ne sert alors plus qu'à donner l'illusion d'une vérification.
# ⚠️ Les modules PARTAGÉS comptent, eux : une correction dans `lettre_commune`
# périme bien toutes les vidéos, puisqu'elles en dépendent.
PARTAGES = ("lettre_commune.py", "chiffre_commune.py", "mascotte.py", "charte.py")


def _perime(mp4: Path) -> float:
    """De combien de secondes la vidéo est-elle plus VIEILLE que SON code ?

    Manim range chaque rendu sous `media/videos/<nom du script>/…` : le nom du
    script se lit donc dans le chemin, sans qu'on ait à le deviner.
    """
    scene = mp4.parent.parent.name
    codes = [SOURCES / f"{scene}.py"]
    codes += [SOURCES / n for n in PARTAGES]
    codes += [SOURCES.parent.parent / n for n in ("charte.py", "mascotte.py")]
    dates = [c.stat().st_mtime for c in codes if c.exists()]
    if not dates:
        return 0.0
    return max(dates) - mp4.stat().st_mtime


def vignette(mp4: Path) -> Path | None:
    retard = _perime(mp4)
    if retard > 0:
        print(
            f"⛔ {mp4.name} : PÉRIMÉ de {retard / 60:.0f} min — le code a changé "
            f"depuis ce rendu. Le rendu a probablement échoué : relire son "
            f"journal, corriger, refaire. RIEN N'A ÉTÉ RANGÉ."
        )
        return None
    conteneur = av.open(str(mp4))
    for image in conteneur.decode(video=0):
        if image.time >= INSTANT:
            sortie, court = route(mp4.stem)
            sortie.mkdir(parents=True, exist_ok=True)
            chemin = sortie / f"vignette-short-{court}.png"
            im = image.to_image()
            im.save(chemin, "PNG")
            # ⭐ La vidéo suit sa vignette dans le même dossier. `copy2` et non
            # `move` : Manim doit garder son fichier, sinon un nouveau rendu
            # partiel croirait devoir tout refaire.
            copie = sortie / mp4.name
            shutil.copy2(mp4, copie)
            print(f"{chemin}  {im.width}x{im.height}")
            print(f"{copie}  {copie.stat().st_size / 1e6:.1f} Mo")
            return chemin
    print(f"⚠️  {mp4.name} : aucune image à {INSTANT} s")
    return None


def main():
    filtre = sys.argv[1] if len(sys.argv) > 1 else None
    # ⚠️ 1920p60 UNIQUEMENT : c'est le dossier des portraits (Manim range par
    # HAUTEUR d'image). Le paysage vit dans 1080p60 et n'a pas de vignette à
    # téléverser — sa miniature 1280×720 est faite par `manim/miniature.py`.
    # ⚠️ 1920p60 = portrait, 1080p60 = paysage (Manim range par HAUTEUR
    # d'image). Les deux sont désormais rangés : le paysage n'est plus écarté
    # depuis que Frédéric le remet à l'épreuve (06/09, « deux formats pour
    # tester »).
    trouves = sorted(VIDEOS.glob("*/1920p60/*.mp4")) + sorted(VIDEOS.glob("*/1080p60/*.mp4"))
    if not trouves:
        print("Aucun Short rendu. Rendre d'abord en -qh -r 1080,1920.")
        return
    for mp4 in trouves:
        if filtre and filtre not in str(mp4):
            continue
        try:
            vignette(mp4)
        except PrefixeInconnu as e:
            print(f"⛔ {e}")


if __name__ == "__main__":
    main()
