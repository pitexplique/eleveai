# miniature_analyse_terminale.py
# LES 5 MINIATURES de la série « CONTINUITÉ ET TVI », terminale spé (27/11/2026).
# Copie adaptée de `miniature_espace_terminale.py` : même charte, mêmes helpers, même
# endroit d'écriture. Seuls le dossier, la ceinture et le contenu changent.
#
#   python manim/miniature_analyse_terminale.py [filtre]
#
# ⭐ CE QU'ELLES COUVRENT. Les 5 paysages de `continuite_tvi`, rendus en HD le 27/11.
# Ce sont les vignettes que la galerie `/video` sert à l'élève : la PREMIÈRE chose
# qu'il lit, avant d'avoir cliqué.
#
# ⚠️ OÙ ELLES VONT. `construire()` écrit à côté de la vidéo dès qu'on lui passe
# `dossier` — choix de Frédéric du 25/09 (« comme ça la vidéo est avec sa miniature »),
# et c'est ce chemin-là que le registre déclarera :
# `terminale/maths/analyse/<slug>/eleveai-maths-terminale-<slug>.png`.
# ⛔ Le dossier doit EXISTER, sinon `construire` ne sauve rien et ne dit rien. Les cinq
# existent, puisqu'ils contiennent les cinq MP4.
#
# ⚠️ « EN N MIN » est LU dans le MP4 (`minutes()`), jamais écrit à la main : une durée
# recopiée se périme au premier re-rendu. Relancer ce script après tout rendu HD.
#
# ⛔⛔ UNE VIGNETTE NE DOIT PAS DONNER LA RÉPONSE D'UNE QUESTION-PAUSE. C'est la même
# faute que le rappel de E1 `07`, simplement déplacée en couverture — et elle est pire,
# puisqu'elle se lit AVANT la vidéo. Contrôlé une par une ci-dessous, contre les dix
# bonnes réponses de la série :
#   · aucune ne nomme un NOMBRE DE SOLUTIONS (E5 `04` répond « exactement deux ») ;
#   · aucune n'écrit un intervalle de continuité (E1 `07` répond « sur ]0 ; +∞[ ») ;
#   · aucune ne nomme l'hypothèse manquante (E3 `07` répond « strictement monotone »)
#     — ⚠️ sauf E3, dont c'est le SUJET annoncé, et dont la question porte sur une copie
#     incomplète, pas sur le mot lui-même. C'est le point le plus serré des cinq.
#
# ⛔⛔ ET CE QUI S'ÉCRIT ICI NE S'INVENTE PAS : chaque ligne de maths vient de la VOIX de
# son épisode (`manim/voix/terminale-*.json`), contrôlée par
# `manim/poste2/controler-maths-continuite-tvi.py` (73 contrôles, 0 erreur). Une formule
# fausse en couverture est pire qu'une formule absente.
#
# ⚠️ PAS DE GLYPHE EXOTIQUE ICI. `ariblk.ttf` n'a ni « ⟹ », ni « ∞ », ni « ′ », et un
# caractère absent sort en CARRÉ VIDE sans que rien ne le dise — la série a payé ce
# défaut deux fois le 27/11 (⩽ / ⩾). On écrit donc « entraîne » et « f '(x) », et on
# REGARDE les cinq images.

import sys
from pathlib import Path

from PIL import Image, ImageDraw

sys.path.insert(0, str(Path(__file__).resolve().parent))

from miniature import BLEU, ROUGE, VERT, police  # noqa: E402
from miniature_espace_terminale import ajuste, ecrire  # noqa: E402
from miniature_essai_v2 import construire as construire_paysage  # noqa: E402
from miniature_puissances import minutes  # noqa: E402
from miniature_short_expression import echelle  # noqa: E402

RACINE = Path(__file__).resolve().parents[1]
SORTIES = RACINE / "manim" / "sorties"
DOSSIER = "terminale/maths/analyse"
BADGE = "MATHS · TLE SPÉ"

# ⭐ Les cinq ceintures sont VERTES : c'est la ceinture de la série, déclarée dans les
# cinq scènes. Une miniature qui en annoncerait une autre contredirait sa vidéo.
CEINTURE = "verte"

# slug · titre sur DEUX lignes · la maths (bleu) · la ligne du bas : « + … » ou « = … »
# la met en VERT (ce qui est juste), sinon en ROUGE (ce qui est le piège).
EP = [
    ("continuite-reconnaitre",
     ["RECONNAÎTRE UNE", "FONCTION CONTINUE"],
     "lim f(x) = f(a)", "dérivable entraîne continue, pas l'inverse"),
    ("tvi-appliquer",
     ["APPLIQUER LE TVI", "SANS CALCULER"],
     "f(a) < 0 < f(b)", "+ une solution existe, sans la calculer"),
    ("tvi-unicite",
     ["JUSTIFIER L'UNICITÉ", "D'UNE SOLUTION"],
     "f '(x) > 0 sur [a ; b]", "le TVI seul ne donne jamais l'unicité"),
    # ⛔ La ligne du bas disait « croissante ne suffit pas : STRICTEMENT ». La bonne
    # réponse de E3 `07` est « que f soit strictement monotone » : le mot y était, en
    # couverture, avant la vidéo. 25 % par les mots, donc sous le seuil de
    # `colonne-ne-donne-pas-la-reponse.py` — mais un instrument qui compare des MOTS
    # ne voit pas qu'une couverture installe une réponse. Remplacée par l'AUTRE piège
    # de l'épisode, que la voix dit aussi (« le théorème tout seul ne donne jamais
    # l'unicité, jamais ») : aussi vrai, aussi utile, et sans le mot de la réponse.
    # ⚠️ La ligne du haut reste « f '(x) > 0 » : elle justifie la monotonie sans la
    # nommer, et elle pousse plutôt vers le LEURRE A (« que f soit dérivable »).
    ("tvi-rediger",
     ["RÉDIGER LE TVI", "AU BAC"],
     "d'après le COROLLAIRE du TVI", "une hypothèse non citée, des points perdus"),
    ("tvi-defi",
     ["L'EXERCICE DE BAC", "CONTINUITÉ ET TVI"],
     "les variations d'abord", "+ le théorème sur chaque morceau monotone"),
]


def acc_paysage(haut, bas, y0):
    """La maths en bleu, la ligne du bas en vert (juste) ou en rouge (le piège), et
    l'échelle des ceintures.

    ⚠️ Recopié de `miniature_espace_terminale` plutôt qu'importé, pour une raison :
    cette fonction porte la CEINTURE, et la ceinture appartient à la série. Les helpers
    de dessin purs (`ajuste`, `ecrire` : exposants, flèches, rétrécissement) sont
    importés, eux — ce sont des outils, pas du contenu.
    ⚠️ `lmax` = 860 : au-delà, le texte passerait sous Ti-Margo, qui occupe toute la
    colonne de droite."""
    def f(d):
        lmax = 860
        th = ajuste(d, haut, 92, lmax)
        vert = bas.startswith(("=", "+ "))
        texte = bas[2:] if bas.startswith("+ ") else bas
        tb = ajuste(d, texte, 58, lmax)
        ecrire(d, 56, y0, haut, th, BLEU)
        ecrire(d, 60, y0 + th + 40, texte, tb, VERT if vert else ROUGE)
        echelle(d, 690, 592, CEINTURE, s=0.5)
    return f


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    filtre = sys.argv[1] if len(sys.argv) > 1 else ""
    sonde = ImageDraw.Draw(Image.new("RGB", (1280, 10)))
    faites = 0
    for slug, titre, haut, bas in EP:
        nom = f"eleveai-maths-terminale-{slug}"
        if filtre and filtre not in nom:
            continue
        dossier = SORTIES / DOSSIER / slug
        mp4 = dossier / f"{nom}.mp4"
        # ⛔ ON NE FABRIQUE PAS UNE MINIATURE SANS SA VIDÉO : le nom du PNG doit être
        # celui que le registre déclare, et la durée se lit dans le MP4.
        if not mp4.exists():
            print(f"⛔ {nom} : MP4 absent, miniature non faite")
            continue
        # ⚠️ Un titre trop long serait rétréci EN SILENCE : on le mesure avant.
        for ligne in titre:
            if sonde.textlength(ligne, font=police("ariblk.ttf", 72)) > 880:
                print(f"⚠️ {nom} : titre large — « {ligne} »")
        construire_paysage(nom, {
            "badge": BADGE,
            "duree": f"EN {minutes(mp4)} MIN",
            "titre": titre,
            "accroche": acc_paysage(haut, bas, 352),
            "dossier": f"{DOSSIER}/{slug}",
        })
        faites += 1
    print(f"\n{faites} miniature(s) faite(s) sur {len(EP)}")


if __name__ == "__main__":
    main()
