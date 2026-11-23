# miniature_ps_espace.py
# LES MINIATURES des PAYSAGES de la seconde moitié de la série « GÉOMÉTRIE DANS L'ESPACE »
# (23/11/2026, poste 2) : les six épisodes de la notion `produit_scalaire_espace`, Tle spé.
#
# Rangées À CÔTÉ DE LEUR VIDÉO : manim/sorties/terminale/maths/geometrie/<slug>/<nom>.png,
# et c'est EXACTEMENT le chemin que `manim/manifeste-youtube.json` déclare déjà dans le
# champ `miniature` de chaque entrée — vérifié entrée par entrée, pas déduit.
#
# ⭐ LE GABARIT VIENT DU CODE EXISTANT, PAS D'UNE INVENTION. Le lot « loi binomiale Tle
# spé » (miniature_essai_v2.py, 20/10/2026) fixe les trois choses qu'on pourrait croire
# libres :
#   - le badge s'écrit « MATHS · TLE SPÉ ». ⛔ `classe.upper()` donnerait « TERMINALE » :
#     aucune autre miniature du registre ne l'écrit comme ça.
#   - la ceinture dessinée est NOIRE : c'est le cran de la CLASSE sur l'échelle, pas la
#     difficulté de l'épisode.
#     ⚠️ ÉCART MESURÉ LE 23/11 : les 12 entrées `espace` du manifeste portent
#     `"ceinture": "verte"`, alors que les terminales déjà publiées (proba-arbre,
#     bin-reconnaitre, conc-defi) portent toutes `"noire"`. Le manifeste n'est pas mon
#     fichier : l'écart est signalé, pas corrigé ici.
#   - l'accroche est le PIÈGE de l'épisode (en bleu) puis sa correction (en rouge).
#
# ⭐⭐ LES FLÈCHES DES VECTEURS (Frédéric, 23/11). Ces miniatures parlent de vecteurs, et
# un « u » nu n'est pas un vecteur. Le texte d'une miniature est dessiné par PIL, sans
# LaTeX : la flèche ne peut pas venir d'une notation, elle doit être TRACÉE. On ne compte
# pas non plus sur le caractère combinant U+20D7 — `ariblk.ttf` ne le compose pas, et il
# disparaîtrait sans rien dire. D'où `~` : dans les textes ci-dessous, `~u` veut dire « la
# lettre u, surmontée d'une flèche dessinée ». La barre est posée sur le sommet RÉEL de
# l'encre (`textbbox`), pas à une hauteur devinée, pour que la flèche de `~n` et celle de
# `~u` soient à la même place quelle que soit la lettre.
#
# La durée « EN N MIN » est LUE dans le mp4 : relancer après un re-rendu.
#
# Usage : python manim/miniature_ps_espace.py [filtre]   (ex. « calculer »)

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from miniature import BLEU, ROUGE, police  # noqa: E402
from miniature_angles import minutes  # noqa: E402
from miniature_essai_v2 import construire as construire_paysage  # noqa: E402
from miniature_short_expression import echelle  # noqa: E402

RACINE = Path(__file__).resolve().parents[1]
SORTIES = RACINE / "manim" / "sorties"

CEINTURE = "noire"   # le cran de la Tle spé sur l'échelle
BADGE = "MATHS · TLE SPÉ"

# slug (= dossier ET fin du nom de fichier), titre sur 2 lignes, le piège, sa correction
EP = [
    ("ps-espace-calculer",
     ["UN PRODUIT SCALAIRE", "EST UN NOMBRE"],
     "~u · ~v, un vecteur ?",
     "NON : un seul NOMBRE !"),
    ("ps-espace-orthogonalite",
     ["DÉMONTRER UNE", "ORTHOGONALITÉ"],
     "Un produit scalaire nul…",
     "pour un PLAN, il en faut DEUX !"),
    ("ps-espace-norme-distance",
     ["NORME ET DISTANCE", "DANS L'ESPACE"],
     "√(3² + 4²) = 3 + 4 ?",
     "NON : la racine ne se distribue pas !"),
    ("ps-espace-angle",
     ["CALCULER UN ANGLE", "DANS L'ESPACE"],
     "La grande diagonale : 45° ?",
     "non : on divise par le PRODUIT des normes"),
    ("ps-espace-plan-normal",
     ["UTILISER UN", "VECTEUR NORMAL"],
     "2x − y + 3z − 5 = 0",
     "~n (2 ; −1 ; 3) est écrit dedans !"),
    ("ps-espace-defi",
     ["SUJET TYPE BAC :", "PRODUIT SCALAIRE"],
     "(BDE) coupe la diagonale au milieu ?",
     "non : à son PREMIER TIERS !"),
]


def morceaux(texte):
    """Découpe « ~u · ~v » en [(u, flèche), (' · ', non), (v, flèche)]."""
    out, i = [], 0
    while i < len(texte):
        if texte[i] == "~" and i + 1 < len(texte):
            out.append((texte[i + 1], True))
            i += 2
        else:
            j = texte.find("~", i)
            j = len(texte) if j < 0 else j
            out.append((texte[i:j], False))
            i = j
    return out


def largeur(d, mor, f):
    return sum(d.textlength(t, font=f) for t, _ in mor)


def ecrire(d, x, y, mor, f, fill):
    """Écrit les morceaux bout à bout, et SURMONTE d'une flèche ceux qui sont des vecteurs."""
    for t, vecteur in mor:
        d.text((x, y), t, font=f, fill=fill)
        w = d.textlength(t, font=f)
        if vecteur and t.strip():
            sommet = d.textbbox((x, y), t, font=f)[1]      # le haut réel de l'encre
            yf = sommet - max(8, round(f.size * 0.17))
            ep = max(3, round(f.size * 0.06))
            x0, x1 = x - ep, x + w + ep
            d.line([(x0, yf), (x1, yf)], fill=fill, width=ep)
            p = max(9, round(f.size * 0.18))               # la pointe
            d.polygon([(x1 + p * 0.6, yf),
                       (x1 - p * 0.3, yf - p * 0.45),
                       (x1 - p * 0.3, yf + p * 0.45)], fill=fill)
        x += w
    return x


def accroche(haut, bas, t_haut=66, t_bas=54):
    def f(d):
        mh, mb = morceaux(haut), morceaux(bas)
        th, tb = t_haut, t_bas
        while th > 40 and largeur(d, mh, police("ariblk.ttf", th)) > 880:
            th -= 2
        while tb > 34 and largeur(d, mb, police("ariblk.ttf", tb)) > 880:
            tb -= 2
        ecrire(d, 56, 350, mh, police("ariblk.ttf", th), BLEU)
        ecrire(d, 64, 490, mb, police("ariblk.ttf", tb), ROUGE)
        echelle(d, 640, 592, CEINTURE, s=0.5)
    return f


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    filtre = sys.argv[1] if len(sys.argv) > 1 else ""
    for slug, titre, haut, bas in EP:
        nom = f"eleveai-maths-terminale-{slug}"
        if filtre and filtre not in nom:
            continue
        rel = f"terminale/maths/geometrie/{slug}"
        mp4 = SORTIES / rel / (nom + ".mp4")
        if not mp4.exists():
            print("pas encore de vidéo :", nom)
            continue
        construire_paysage(nom, {
            "badge": BADGE, "duree": f"EN {minutes(mp4)} MIN",
            "titre": titre, "accroche": accroche(haut, bas), "dossier": rel,
        })


if __name__ == "__main__":
    main()
