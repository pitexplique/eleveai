# manim/poste2/chercher-decal-e11.py
# ⭐⭐ LA RECHERCHE EN GRILLE D'UN `decal` — la recette de la PASSE DES FLÈCHES (22/11),
# appliquée ici aux deux étiquettes que le gros plan a trouvées fautives sur l'écran 02.
#
# ⛔ ON NE CHOISIT PLUS UN `decal` À VUE : trois essais à la main ont posé le nom de la
# normale successivement sur le nom de l'axe des y (RIGHT), sur son propre fût (RIGHT),
# puis sur l'axe des z (UL). Chaque essai coûtait un rendu.
# ⛔⛔ ET LE CONTRÔLE PORTE SUR LES POINTS TRACÉS, PAS SUR LES BOÎTES : la boîte d'une
# flèche en diagonale est un grand rectangle presque vide, et testée ainsi elle interdit
# tout un quadrant (leçon payée sur l'épisode 1 de la passe des flèches).
#
#   python -X utf8 manim/poste2/chercher-decal-e11.py
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(1, str(Path(__file__).resolve().parents[1] / "scripts" / "terminale"))
sys.path.insert(2, str(Path(__file__).resolve().parents[1]))

from manim import *  # noqa: E402,F403
import numpy as np  # noqa: E402

from espace3d import C_NORMALE, C_PLAN  # noqa: E402
from espace_ecrans import EcransEspace  # noqa: E402
from ps_espace_plan_normal import (D02, N02, PsEspacePlanNormalBase, norme2)  # noqa: E402

E = EcransEspace.__new__(PsEspacePlanNormalBase)


def pts_segment(a, b, n=60):
    return [np.array(a) + (np.array(b) - np.array(a)) * (k / n) for k in range(n + 1)]


def dist_pts_boite(points, mob):
    x0, x1 = float(mob.get_left()[0]), float(mob.get_right()[0])
    y0, y1 = float(mob.get_bottom()[1]), float(mob.get_top()[1])
    d = 1e9
    for p in points:
        dx = max(x0 - float(p[0]), 0.0, float(p[0]) - x1)
        dy = max(y0 - float(p[1]), 0.0, float(p[1]) - y1)
        d = min(d, (dx * dx + dy * dy) ** 0.5)
    return d


def ecart_boites(m1, m2):
    dx = max(0.0, max(float(m1.get_left()[0]) - float(m2.get_right()[0]),
                      float(m2.get_left()[0]) - float(m1.get_right()[0])))
    dy = max(0.0, max(float(m1.get_bottom()[1]) - float(m2.get_top()[1]),
                      float(m2.get_bottom()[1]) - float(m1.get_top()[1])))
    return (dx * dx + dy * dy) ** 0.5


# ── l'écran 02, rebâti exactement comme le script le pose ──
# ⛔⛔ LA GÉOMÉTRIE A ÉTÉ REFAITE APRÈS LE DEUXIÈME GROS PLAN. Premier jet : un plan
# large (demi 1,55) sur des axes courts, et une normale de 0,88 unité — à l'écran, le
# plan RECOUVRAIT les trois axes et leurs noms (le « z » disparaissait sous son bord),
# et la normale se réduisait à un TIRET vert de 0,43 sans pointe visible, dont le nom
# flottait à 0,85 de distance sans qu'on puisse dire ce qu'il nommait.
# ⭐ Une étiquette bien placée ne sauve pas une figure trop petite : on allonge la
# normale (2,2 unités), on rétrécit le plan (demi 1,0) et on rallonge les axes.
r, ax = EcransEspace.repere(E, o=(-4.35, -1.15), u=0.52, portee=3)
pl = r.plan(N02, d=D02, centre=(0, 0, 0), demi=1.00, couleur=C_PLAN, op=0.30, sw=3)
pied = tuple(float(x) for x in pl.centre_plan)
bout = tuple(pied[i] + 2.2 * N02[i] / norme2(N02) ** 0.5 for i in range(3))
nf = r.vecteur(pied, bout, "n", couleur=C_NORMALE, sw=7)
milieu = (nf.a + nf.b) / 2

# TOUT ce qui est tracé sur cet écran, échantillonné en POINTS.
traces = []
for i in (0, 2, 4):
    traces += pts_segment(ax[i].get_start(), ax[i].get_end())
traces += pts_segment(nf.a, nf.b)
coins = [r.pt(*k) for k in pl.coins]
for i in range(4):
    traces += pts_segment(coins[i], coins[(i + 1) % 4])
autres = [("x", ax[1]), ("y", ax[3]), ("z", ax[5])]

MARGE_X, MARGE_Y = 6.68, 3.573
bons = []
for dx in np.arange(-2.5, 2.51, 0.25):
    for dy in np.arange(-2.5, 2.51, 0.25):
        if abs(dx) < 1e-9 and abs(dy) < 1e-9:
            continue
        essai = r.vecteur(pied, bout, "n", couleur=C_NORMALE, sw=7,
                          decal=np.array([dx, dy, 0.0]))
        etq = essai.nom
        if (float(etq.get_left()[0]) < -MARGE_X or float(etq.get_right()[0]) > MARGE_X
                or float(etq.get_bottom()[1]) < -MARGE_Y or float(etq.get_top()[1]) > MARGE_Y):
            continue
        d_trace = dist_pts_boite(traces, etq)
        d_noms = min(ecart_boites(etq, m) for _, m in autres)
        if d_trace < 0.11 or d_noms < 0.22:
            continue
        # ⭐ la plus PROCHE du fût gagne : on doit savoir à qui l'étiquette appartient.
        d_mil = float(np.linalg.norm(np.array(etq.get_center())[:2] - np.array(milieu)[:2]))
        bons.append((d_mil, dx, dy, d_trace, d_noms))

bons.sort()
print(f"écran 02 — nom de la normale : {len(bons)} décalages libres sur 440 essayés")
for d_mil, dx, dy, d_t, d_n in bons[:8]:
    print(f"  decal ({dx:+.2f} ; {dy:+.2f})   dist. au milieu {d_mil:.2f}   "
          f"au tracé {d_t:.2f}   aux noms d'axes {d_n:.2f}")
if not bons:
    print("  ⛔ AUCUN décalage libre — il faut changer la figure, pas l'étiquette.")
