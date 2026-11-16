# 4e_section_comprendre_short.py
# EleveAI — Maths 4e — SHORT de l'épisode S5 « la section plane » (micro vision_section).
# ⛔ EN MANIM, PAS EN DESSIN ANIMÉ (REGLES.md 09/11 ; Frédéric, 16/11), et avec un DÉFI.
# CEINTURE BLANCHE, 9:16. Le défi : un muscle deux fois plus large, sa section est combien de
# fois plus grande ? Réponse C (quatre fois : l'aire dépend du rayon multiplié par lui-même).
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/4e_section_comprendre_short.py ShortSectionComprendre4e
# ⛔ Contrôler le COMPTEUR sur le MP4 (barre de 3 s entière, dans la carte, rien par-dessus).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_short_commun import *  # noqa: E402,F403
from volume_4e_short_commun import Short4e, sans_audit, Y_ACCROCHE  # noqa: E402
from volume_4e_commun import point3, cylindre  # noqa: E402

PLAN_C = "#facc15"
SECTION_C = "#22d3ee"
PEAU_C, PEAU_D = "#e8b48c", "#f3d2bb"
MUSCLE_C, MUSCLE_B = "#e11d48", "#881337"


def tranche(r, o=ORIGIN, muscle=0.6, sw=4):
    """La section vue à plat : le disque de la coupe, et dedans le disque du muscle."""
    peau = Circle(radius=r, fill_color=SECTION_C, fill_opacity=0.3, stroke_color=SECTION_C,
                  stroke_width=sw).move_to(o)
    mus = Circle(radius=r * muscle, fill_color=MUSCLE_C, fill_opacity=0.8, stroke_color=MUSCLE_B,
                 stroke_width=sw * 0.6).move_to(o)
    g = VGroup(peau, mus)
    g.peau, g.muscle, g.r = peau, mus, r
    return g


def plan_coupe(l, p, u, o=ORIGIN, couleur=PLAN_C, op=0.3, sw=3):
    q = lambda x, y: point3(o, u, x, y, 0)  # noqa: E731
    return Polygon(q(0, 0), q(l, 0), q(l, p), q(0, p), fill_color=couleur, fill_opacity=op,
                   stroke_color=couleur, stroke_width=sw)


class ShortSectionComprendre4e(Short4e):
    nom_voix = "4e-section-comprendre-short"
    fichier_marques = "4e_section_comprendre_short_marques.json"

    def construct(self):
        self.margo_bas()

        # ── 00 : le scanner coupe en travers ───────────────────────────────
        self.dire("00-accroche")
        self.ouverture("Deux fois plus large", fs=30)
        u = 0.75
        br = cylindre(0.7, 2.2, u, P(-0.9, -0.6), corps=PEAU_C, dessus=PEAU_D, bord="#7c2d12", sw=3)
        self.au_mot("coupe un bras en travers")
        pl = plan_coupe(1.7, 1.4, u, P(-1.55, 0.35))
        self.play(FadeIn(br, shift=UP * 0.2), run_time=0.5)
        self.play(FadeIn(pl, shift=DOWN * 0.3), run_time=0.5)
        self.au_mot("La section du muscle est un disque")
        t1 = tranche(0.5, P(0, -2.1))
        self.play(FadeIn(t1, scale=0.8), run_time=0.6)
        self.attendre_voix(marge=0.2)

        # ── 01 : le défi ────────────────────────────────────────────────────
        self.dire("01-defi")
        self.play(FadeOut(br), FadeOut(pl), run_time=0.3)
        self.au_mot("deux fois plus large")
        t2 = tranche(1.0, P(0, 0.6))
        self.play(t1.animate.move_to(P(0, -1.9)), FadeIn(t2, scale=0.8), run_time=0.7)
        self.au_mot("combien de fois plus grande")
        q = self.accroche("combien de fois plus grande ?", fs=24, couleur=JAUNE_TITRE, y=Y_ACCROCHE)
        self.play(FadeIn(q), run_time=0.45)
        self.attendre_voix(marge=0.25)

        # ── 02 : la question-pause (3 s) — réponse C ───────────────────────
        # ⛔ Les mots de la carte sont ABSENTS de la voix (« muscle », « aire ») : avec « deux »
        #    ou « fois », _cue attendrait le choix A et les cartes arriveraient en retard.
        self.ecran_question("02-question", "02b-reponse",
                            ["Le muscle double.", "L'aire ?"],
                            ["deux fois plus grande", "la même", "quatre fois plus grande"], 2,
                            ["Le rayon double,", "l'aire dépend du rayon",
                             "multiplié par lui-même."],
                            x_col=0.0)

        # ── 03 : rayon doublé, aire multipliée par quatre ──────────────────
        self.clear()
        self.margo_bas()
        self.dire("03-visuel")
        tit = self.grand("Rayon doublé", font_size=34, color=JAUNE_TITRE).move_to(P(0, 3.3))
        self.add(tit)
        petit = tranche(0.45, P(0, 2.0))
        self.au_mot("Rayon doublé")
        self.play(FadeIn(petit, scale=0.8), run_time=0.5)
        grand = tranche(0.9, P(0, -0.6))
        self.play(FadeIn(grand, scale=0.8), run_time=0.6)
        # ⭐ Quatre quarts du GRAND disque, et pas quatre petits disques posés dessus : un quart
        #    du disque de rayon 2r a exactement l'aire du disque de rayon r, et ça se voit.
        self.au_mot("aire multipliée par quatre")
        quarts = VGroup(*[AnnularSector(inner_radius=0, outer_radius=0.9, angle=PI / 2,
                                        start_angle=k * PI / 2, fill_color=SECTION_C,
                                        fill_opacity=0.25 + 0.12 * (k % 2), stroke_color=WHITE,
                                        stroke_width=3).move_arc_center_to(P(0, -0.6))
                          for k in range(4)])
        self.play(LaggedStart(*[FadeIn(c, scale=0.8) for c in quarts], lag_ratio=0.25), run_time=1.1)
        fois4 = self.t("quatre fois plus grande", 26, VERT_OK).move_to(P(0, -2.4))
        self.play(FadeIn(fois4, scale=1.15), run_time=0.5)
        self.attendre_voix(marge=0.3)

        # ── 04 : la question en commentaire ────────────────────────────────
        self.clear()
        self.margo_bas()
        self.dire("04-commentaire")
        self.play(FadeIn(self.grand("À toi !", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.2))),
                  run_time=0.4)
        t = tranche(0.75, P(0, 0.9))
        self.au_mot("si le rayon est multiplié")
        ray = Line(t.muscle.get_center(), t.muscle.get_right(), color=BASE_C, stroke_width=6)
        self.play(FadeIn(t, scale=0.85), Create(ray), run_time=0.7)
        # ⛔ au_mot sur « 3, » et pas sur la phrase entière : sinon le 3 s'écrit 1,1 s trop tôt.
        self.au_mot("3,")
        r3 = self.t("rayon × 3", 30, BASE_C).move_to(P(0, -0.6))
        self.play(FadeIn(r3, scale=1.15), run_time=0.4)
        self.au_mot("par combien l'aire est-elle multipliée")
        ai = self.t("aire × ?", 30, SECTION_C).move_to(P(0, -1.5))
        self.play(FadeIn(ai, scale=1.15), run_time=0.45)
        self.au_mot("Réponds en commentaire")
        self.play(FadeIn(self.commentaire(y=-2.85)), run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 05 ──────────────────────────────────────────────────────────────
        self.page_abonnement("05-abonne")
