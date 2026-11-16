# 4e_solides_defi_short.py
# EleveAI — Maths 4e — SHORT de l'épisode S6 « défis sur les solides » (micro vision_defi).
# ⛔ EN MANIM, PAS EN DESSIN ANIMÉ (REGLES.md 09/11 ; Frédéric, 16/11), et avec un DÉFI.
# CEINTURE BLANCHE, 9:16. Le défi : le drone voit un rectangle de dessus et un rectangle surmonté
# d'un triangle de face — quel solide est le toit ? Réponse A (une pyramide).
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/4e_solides_defi_short.py ShortSolidesDefi4e
# ⛔ Contrôler le COMPTEUR sur le MP4 (barre de 3 s entière, dans la carte, rien par-dessus).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_short_commun import *  # noqa: E402,F403
from volume_4e_short_commun import Short4e, sans_audit, Y_ACCROCHE  # noqa: E402
from volume_4e_commun import pave, pyramide  # noqa: E402

VUE_C = "#f8fafc"
MUR_C, MUR_D, MUR_B = "#e2e8f0", "#cbd5e1", "#475569"
TOIT_C = "#c084fc"
DRONE_C = "#22d3ee"


def drone(s=1.0, couleur=DRONE_C):
    """Un drone vu de face : le corps, quatre bras, quatre hélices."""
    corps = RoundedRectangle(width=0.55 * s, height=0.22 * s, corner_radius=0.06 * s,
                             fill_color="#334155", fill_opacity=1, stroke_color=couleur, stroke_width=3)
    g = VGroup(corps)
    for sx in (-1, 1):
        for sy in (-1, 1):
            bout = P(sx * 0.45 * s, sy * 0.2 * s)
            g.add(Line(ORIGIN, bout).set_stroke("#64748b", 4))
            g.add(Ellipse(width=0.42 * s, height=0.08 * s, fill_color=couleur, fill_opacity=0.65,
                          stroke_width=0).move_to(bout + UP * 0.05 * s))
    g.add(corps)
    return g


def cadre(contenu, titre, taille=1.6, fs=20):
    c = Square(side_length=taille, stroke_color="#475569", stroke_width=3,
               fill_color="#0f172a", fill_opacity=0.9)
    contenu.move_to(c.get_center())
    t = sans_audit(Text(titre, font_size=fs, color=VUE_C, weight=BOLD)).next_to(c, DOWN, buff=0.1)
    g = VGroup(c, contenu, t)
    g.cadre, g.contenu = c, contenu
    return g


def vue_face():
    r = Rectangle(width=1.0, height=0.55, color=VUE_C, stroke_width=4)
    t = Polygon(r.get_corner(UL), r.get_corner(UR), r.get_top() + UP * 0.4, color=VUE_C, stroke_width=4)
    g = VGroup(r, t)
    g.mur, g.toit = r, t
    return g


class ShortSolidesDefi4e(Short4e):
    nom_voix = "4e-solides-defi-short"
    fichier_marques = "4e_solides_defi_short_marques.json"

    def construct(self):
        self.margo_bas()

        # ── 00 : le drone, et la vue de dessus ─────────────────────────────
        self.dire("00-accroche")
        # ⛔ La voix parle du drone DÈS le premier mot : le drone entre dans le même play que le
        #    titre, sinon l'ouverture (0,7 s) le met 0,6 s en retard.
        self.au_mot("Le drone")
        d = drone(1.4).move_to(P(0, 1.2))
        tit = self.grand("Ce que voit le drone", font_size=30, color=JAUNE_TITRE).move_to(P(0, 3.3))
        self.play(FadeIn(tit), FadeIn(self.echelle_short()), FadeIn(d, shift=DOWN * 0.3), run_time=0.7)
        self.au_mot("De dessus : un rectangle")
        vd = cadre(Rectangle(width=1.0, height=0.6, color=VUE_C, stroke_width=4), "de dessus")
        vd.move_to(P(0, -0.8))
        self.play(FadeIn(vd, shift=UP * 0.2), run_time=0.7)
        self.attendre_voix(marge=0.2)

        # ── 01 : le défi ────────────────────────────────────────────────────
        self.dire("01-defi")
        self.play(FadeOut(d), vd.animate.move_to(P(-1.0, -0.3)), run_time=0.4)
        self.au_mot("De face : un rectangle surmonté d'un triangle")
        vf = cadre(vue_face(), "de face").move_to(P(1.0, -0.3))
        self.play(FadeIn(vf, shift=UP * 0.2), run_time=0.8)
        self.au_mot("Quel solide est le toit")
        q = self.accroche("Quel solide est le toit ?", fs=26, couleur=JAUNE_TITRE, y=Y_ACCROCHE)
        self.play(FadeIn(q), run_time=0.45)
        self.attendre_voix(marge=0.25)

        # ── 02 : la question-pause (3 s) — réponse A ───────────────────────
        # ⛔ Les mots de la carte sont ABSENTS de la voix (« quel », « solide », « toit ») :
        #    avec « pyramide », _cue attendrait le choix A et les cartes arriveraient en retard.
        self.ecran_question("02-question", "02b-reponse",
                            ["Quel solide pour le toit ?"],
                            ["une pyramide", "un cylindre", "une boule"], 0,
                            ["Triangle de face,", "rectangle de dessus :",
                             "une pyramide sur le pavé."],
                            x_col=0.0)

        # ── 03 : deux vues, deux solides ───────────────────────────────────
        self.clear()
        self.margo_bas()
        self.dire("03-visuel")
        tit = self.grand("Deux vues", font_size=34, color=JAUNE_TITRE).move_to(P(0, 3.3))
        self.add(tit)
        v1 = cadre(Rectangle(width=0.9, height=0.55, color=VUE_C, stroke_width=4), "de dessus", taille=1.4)
        v2 = cadre(vue_face(), "de face", taille=1.4)
        VGroup(v1, v2).arrange(RIGHT, buff=0.4).move_to(P(0, 1.6))
        self.au_mot("Deux vues")
        self.play(FadeIn(v1, shift=UP * 0.2), FadeIn(v2, shift=UP * 0.2), run_time=0.7)
        u = 0.6
        corps = pave(1.9, 1.1, 1.0, u, P(-0.9, -2.3), face=MUR_C, dessus=MUR_D, cote="#94a3b8",
                     bord=MUR_B, sw=3)
        toit = pyramide(1.9, 0.9, u, corps.pt(0, 0, 1.0), prof=1.1, face=TOIT_C, cote_c="#7e22ce", sw=3)
        self.au_mot("le bâtiment devient deux solides")
        self.play(FadeIn(corps, shift=UP * 0.2), run_time=0.5)
        self.play(FadeIn(toit, shift=UP * 0.2), run_time=0.5)
        self.attendre_voix(marge=0.3)

        # ── 04 : la question en commentaire ────────────────────────────────
        self.clear()
        self.margo_bas()
        self.dire("04-commentaire")
        self.play(FadeIn(self.grand("À toi !", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.2))),
                  run_time=0.4)
        self.au_mot("de dessus un disque")
        w1 = cadre(Circle(radius=0.38, color=VUE_C, stroke_width=4), "de dessus").move_to(P(0, 1.5))
        self.play(FadeIn(w1, shift=UP * 0.2), run_time=0.6)
        self.au_mot("de face un triangle")
        tri = Polygon(P(-0.45, -0.4), P(0.45, -0.4), P(0, 0.5), color=VUE_C, stroke_width=4)
        w2 = cadre(tri, "de face").move_to(P(0, -0.6))
        self.play(FadeIn(w2, shift=UP * 0.2), run_time=0.6)
        self.au_mot("Quel toit")
        qt = self.t("quel toit ?", 28, TOIT_C).move_to(P(0, -1.9))
        self.play(FadeIn(qt, scale=1.15), run_time=0.4)
        self.au_mot("Réponds en commentaire")
        self.play(FadeIn(self.commentaire(y=-2.9)), run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 05 ──────────────────────────────────────────────────────────────
        self.page_abonnement("05-abonne")
