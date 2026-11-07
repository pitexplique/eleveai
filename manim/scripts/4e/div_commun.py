# div_commun.py
# EleveAI — Maths 4e — série « Divisibilité et nombres premiers » (07/11/2026) : les OUTILS
# COMMUNS des paysages, sortis du pilote div_diviseurs.py (épisode 05) sans changer son rendu.
# Réexporte relatif_commun (PaysageRel, F, E, T, P, couleurs…).
# massif(l, c) : un rectangle de rosiers ; en_vrac(n, …) : n fleurs au hasard ;
# colorer_paire(F("2 × 18")) : petit nombre jaune, grand bleu ciel ;
# PaysageDiv : PaysageRel + table_paires, liste, arcs.

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))

from relatif_commun import *  # noqa: E402,F403

ROSE = "#f472b6"
TIGE = "#22c55e"
TULIPE = "#facc15"
PETIT = JAUNE_TITRE   # le petit nombre d'une paire
GRAND = "#7dd3fc"     # le grand nombre d'une paire


def rose_paysagiste(s=0.72):
    """Rose : la salopette verte et le chapeau de paysagiste."""
    p = personne(peau="#8d5524", tenue="#16a34a", cheveux="#1f2937", longs=True, s=s)
    chapeau = Ellipse(width=1.05 * s, height=0.22 * s, fill_color="#d97706", fill_opacity=1, stroke_width=0)
    chapeau.move_to(p.get_top() + UP * 0.04 * s)
    return VGroup(p, chapeau)


def fleur(r=0.1, c=ROSE):
    """Un rosier vu d'en haut : la fleur et son cœur."""
    return VGroup(Circle(radius=r, fill_color=c, fill_opacity=1, stroke_color=WHITE, stroke_width=1),
                  Circle(radius=r * 0.38, fill_color="#9d174d" if c == ROSE else "#a16207", fill_opacity=1, stroke_width=0))


def massif(lignes, colonnes, pas=0.3, r=0.1, centre=ORIGIN, c=ROSE):
    """Un rectangle de rosiers : `lignes` rangées de `colonnes` rosiers."""
    g = VGroup()
    for i in range(lignes):
        for j in range(colonnes):
            g.add(fleur(r, c).move_to(P((j - (colonnes - 1) / 2) * pas, ((lignes - 1) / 2 - i) * pas)))
    return g.move_to(centre)


def en_vrac(n, x0, x1, y0, y1, r=0.1, c=ROSE, graine=5):
    """n fleurs posées au hasard, sans se toucher."""
    rng = np.random.default_rng(graine)
    pts = []
    while len(pts) < n:
        p = (rng.uniform(x0, x1), rng.uniform(y0, y1))
        if all((p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 > (3 * r) ** 2 for q in pts):
            pts.append(p)
    return VGroup(*[fleur(r, c).move_to(P(*p)) for p in pts])


def colorer_paire(e):
    """« 2 × 18 » : le petit nombre en jaune, le grand en bleu ciel."""
    e.atomes[0].set_color(PETIT)
    e.atomes[-1].set_color(GRAND)
    return e


class PaysageDiv(PaysageRel):
    """PaysageRel + les outils des listes de diviseurs."""

    def table_paires(self, lignes, y0=2.45, pas=0.72):
        """Les paires en deux colonnes : petit nombre à gauche, grand à droite."""
        g = VGroup()
        for k, (a, b) in enumerate(lignes):
            y = y0 - k * pas
            g.add(VGroup(T(str(a), 46, PETIT, audit=False).move_to(P(-4.6, y)),
                         T("×", 40, WHITE, audit=False).move_to(P(-3.7, y)),
                         T(str(b), 46, GRAND, audit=False).move_to(P(-2.8, y))))
        return g

    def liste(self, nombres, y, fs=58, buff=0.55):
        e = F(", ".join(str(n) for n in nombres), fs)
        e.move_to(P(0, y))
        return e

    def arcs(self, e, nombres, paires, hauteur=1.0):
        """Les arcs qui relient les deux nombres d'une paire, au-dessus de la liste."""
        pos = {n: a for n, a in zip(nombres, [a for a in e.atomes if a.original_text != ","])}
        g = VGroup()
        couleurs = [VERT_OK, CIEL, ORANGE_RETENUE, ROSE, JAUNE_TITRE]
        for k, (a, b) in enumerate(paires):
            if a == b:
                g.add(ArcBetweenPoints(pos[a].get_corner(UL) + UP * 0.12, pos[a].get_corner(UR) + UP * 0.12, angle=-2.6, color=couleurs[k % 5], stroke_width=4))
            else:
                g.add(ArcBetweenPoints(pos[a].get_top() + UP * 0.12, pos[b].get_top() + UP * 0.12,
                                       angle=-1.25, color=couleurs[k % 5], stroke_width=4))
        return g
