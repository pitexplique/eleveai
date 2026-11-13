# aire_cm1_commun.py
# EleveAI — Maths CM1 — série « Aire » (13/11/2026, semaine PÉRIMÈTRE, AIRE, VOLUME) :
# ce qui sert aux paysages aire_comprendre, aire_unite, aire_carre_rectangle (puis composer, défi).
# Base : PaysageCalculPose (6e/calcul_pose_commun : synchro par jetons, audit, question-pause,
# finale « Ce que tu as appris », fin du 05/11), IMPORTÉE sans la modifier.
# Ici : les carreaux (grille, figure en cases), les personnages-métiers du lot.
# Voix : manim/voix/cm1-aire-<slug>.json (Julie, débit −6) ; marques : aire_marques.py.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

from calcul_pose_commun import *  # noqa: E402,F401,F403

CARREAU = "#38bdf8"      # le carreau bleu ciel = l'unité d'aire
CARREAU_B = "#0c4a6e"    # son bord
PLINTHE = ORANGE_RETENUE  # le tour (périmètre), toujours orange dans la série
VERT_F = "#4ade80"
ROUGE_F = "#f87171"


def carreau(c=0.5, couleur=CARREAU, bord=CARREAU_B, sw=2.5):
    return Square(c, fill_color=couleur, fill_opacity=1, stroke_color=bord, stroke_width=sw)


def figure_cases(cases, c=0.5, couleur=CARREAU, bord=CARREAU_B):
    """Une figure faite de carreaux : cases = liste de (colonne, rangée), rangée 0 en haut.
    Renvoie un VGroup de carreaux, dans l'ordre donné (rangée par rangée en général)."""
    g = VGroup()
    for (i, j) in cases:
        g.add(carreau(c, couleur, bord).move_to(P(i * c, -j * c)))
    return g


def rect_cases(n_col, n_rang, c=0.5, couleur=CARREAU, bord=CARREAU_B):
    return figure_cases([(i, j) for j in range(n_rang) for i in range(n_col)], c, couleur, bord)


def grande_case(c=1.0, couleur="#94a3b8", bord="#334155"):
    """Une GRANDE case (côté c = 2 petites). Ses traits (coupée en 4 petites) : traits_de(g), au moment voulu."""
    g = VGroup(carreau(c, couleur, bord, 3))
    g.bord = bord
    return g


def traits_de(g):
    """Les deux traits qui coupent une grande case en 4 petites, là où elle est MAINTENANT."""
    q = g[0]
    return VGroup(DashedLine(q.get_top(), q.get_bottom(), color=g.bord, stroke_width=3, dash_length=0.08),
                  DashedLine(q.get_left(), q.get_right(), color=g.bord, stroke_width=3, dash_length=0.08))


def petites_de(*gs):
    """Les petites cases (invisibles, pour les numéros) de grandes cases, rangée par rangée, de gauche à droite."""
    res = []
    for g in gs:
        q = g[0]
        c = q.width / 2
        res += [Square(c, stroke_width=0, fill_opacity=0).move_to(q.get_center() + P(dx * c / 2, dy * c / 2))
                for dy in (1, -1) for dx in (-1, 1)]
    res.sort(key=lambda s: (-round(s.get_center()[1], 2), s.get_center()[0]))
    return VGroup(*res)


def rangee(g, j, n_col):
    """La rangée j d'un rect_cases (n_col carreaux par rangée)."""
    return VGroup(*g[j * n_col:(j + 1) * n_col])


def contour(g, couleur=PLINTHE, sw=9):
    """Le tour d'un rectangle de carreaux (la plinthe, le périmètre)."""
    return Rectangle(width=g.width, height=g.height, stroke_color=couleur, stroke_width=sw).move_to(g)


def numeros(g, fs=22, couleur=WHITE):
    """Un numéro sur chaque carreau (le comptage) : hors audit, ces nombres ne sont pas dits un à un."""
    return hors_audit(VGroup(*[Text(str(k + 1), font_size=fs, color=couleur, weight=BOLD).move_to(q)
                               for k, q in enumerate(g)]))


def casquette(p, couleur="#f59e0b"):
    c, r = p.tete.get_center(), p.tete.width / 2
    vis = RoundedRectangle(width=r * 1.6, height=r * 0.28, corner_radius=r * 0.12, fill_color=couleur,
                           fill_opacity=1, stroke_width=0).move_to(c + P(r * 0.55, r * 0.55))
    dome = AnnularSector(inner_radius=0, outer_radius=r * 1.02, angle=PI, start_angle=0, fill_color=couleur,
                         fill_opacity=1, stroke_width=0).move_to(c + P(0, r * 0.62))
    return VGroup(dome, vis)


def mathis(s=1.0):
    """Mathis, carreleur : tenue de travail grise, casquette orange, genouillère."""
    p = personne(peau="#a16207", tenue="#475569", cheveux="#1f2937", s=s)
    p.add(casquette(p))
    return p


def awa(s=1.0):
    """Awa, créatrice de jeux vidéo : sweat violet, casque audio."""
    p = personne(peau="#8d5524", tenue="#7c3aed", cheveux="#111827", longs=True, s=s)
    p.add(casque_audio(p))
    return p


def lina(s=1.0):
    """Lina, maraîchère : chemise verte, chapeau de paille."""
    p = personne(peau="#f1c27d", tenue="#15803d", cheveux="#78350f", longs=True, s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    bord = Ellipse(width=r * 3.0, height=r * 0.55, fill_color="#eab308", fill_opacity=1, stroke_width=0)
    dome = AnnularSector(inner_radius=0, outer_radius=r * 0.85, angle=PI, start_angle=0, fill_color="#eab308",
                         fill_opacity=1, stroke_width=0)
    bord.move_to(c + UP * r * 0.75)
    dome.move_to(c + UP * r * 1.1)
    p.add(dome, bord)
    return p


class PaysageAireCM1(PaysageCalculPose):
    identite = "Maths CM1 — EleveAI"
    ceinture = "jaune"

    def pile(self, morceaux, fs=36, buff=0.14):
        """Deux (ou plus) morceaux colorés, l'un SOUS l'autre, alignés à gauche : pile[i] = i-ème morceau
        (comme ligne(), mais sans réduire une phrase trop longue pour la colonne de droite)."""
        return VGroup(*[self.t(m, fs, c) for m, c in morceaux]).arrange(DOWN, aligned_edge=LEFT, buff=buff)

    def _disposer_q(self, question, choix, phrase):
        """Le compte à rebours n'est pas un nombre dit : hors synchro."""
        r = super()._disposer_q(question, choix, phrase)
        for f in r[4].get_family():
            f.sans_synchro = True
        return r
