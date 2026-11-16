# 4e_volume_defi_short.py
# EleveAI — Maths 4e — SHORT de l'épisode V4 « défis sur les volumes » (micro volume_defi, 4e et 3e).
# ⛔ En MANIM (REGLES.md, 09/11) et avec un DÉFI (Frédéric, 15/11). CEINTURE BLANCHE, 9:16.
# Le défi : la citerne pleine fait 10 000 L, la famille en utilise 400 par jour — combien de jours ?
# Réponse A (25 jours) : 10 000 ÷ 400.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/4e_volume_defi_short.py ShortVolumeDefi4e

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_short_commun import *  # noqa: E402,F403
from volume_4e_short_commun import Short4e, sans_audit, Y_ACCROCHE  # noqa: E402

CUVE_C, CUVE_D, CUVE_B = "#0ea5e9", "#7dd3fc", "#0c4a6e"
CONE_C, CONE_B = "#f59e0b", "#78350f"
EAU = "#38bdf8"


def citerne_simple(r, h_cyl, h_cone, u, o, sw=3):
    """La citerne du paysage, en plus petit : cylindre sur fond conique. o = la pointe du cône."""
    base = o + UP * h_cone * u
    cy = cylindre(r, h_cyl, u, base, corps=CUVE_C, dessus=CUVE_D, bord=CUVE_B, sw=sw)
    flancs = Polygon(base + P(-r * u, 0), base + P(r * u, 0), o, fill_color=CONE_C, fill_opacity=1,
                     stroke_width=0)
    gen = VGroup(Line(base + P(-r * u, 0), o), Line(base + P(r * u, 0), o)).set_stroke(CONE_B, sw)
    co = VGroup(flancs, gen)
    g = VGroup(co, cy)
    g.cyl, g.cone, g.base, g.r, g.u = cy, co, base, r, u
    return g


class ShortVolumeDefi4e(Short4e):
    nom_voix = "4e-volume-defi-short"
    fichier_marques = "4e_volume_defi_short_marques.json"

    def construct(self):
        self.margo_bas()

        # ── 00 : la citerne pleine ──────────────────────────────────────────
        self.dire("00-accroche")
        self.ouverture("La citerne et la sécheresse", fs=26)
        c = citerne_simple(0.8, 2.0, 0.55, 0.52, P(0, -1.9))
        self.au_mot("La citerne d'Elsa")
        self.play(FadeIn(c, shift=UP * 0.2), run_time=0.5)
        self.au_mot("est pleine")
        eau = VGroup(c.cyl.corps.copy().set_fill(EAU, 0.85), c.cone[0].copy().set_fill(EAU, 0.85))
        self.play(FadeIn(eau), run_time=0.4)
        self.au_mot("10 000 litres")
        e = self.m2a("10 000 L", 32, VERT_OK).move_to(P(0, 1.35))
        self.play(FadeIn(e, scale=1.2), run_time=0.45)
        self.attendre_voix(marge=0.2)

        # ── 01 : le défi ────────────────────────────────────────────────────
        self.dire("01-defi")
        self.au_mot("400 litres par jour")
        d = sans_audit(self.t("− 400 L / jour", 26, ORANGE_Q)).move_to(P(0, -2.55))
        self.play(FadeIn(d), run_time=0.45)
        self.au_mot("Combien de jours")
        q = self.accroche("Combien de jours ?", fs=28, couleur=JAUNE_TITRE, y=Y_ACCROCHE)
        self.play(FadeIn(q), run_time=0.4)
        self.attendre_voix(marge=0.25)

        # ── 02 : la question-pause (3 s) — réponse A ───────────────────────
        self.ecran_question("02-question", "02b-reponse",
                            ["La citerne : 10 000 L.", "400 L par jour.", "Combien de jours ?"],
                            ["25 jours", "40 jours", "2,5 jours"], 0,
                            [["10 000", "÷ 400", "= 25 jours."]])

        # ── 03 : 25 jours, et plus rien ─────────────────────────────────────
        self.clear()
        self.margo_bas()
        self.dire("03-visuel")
        tit = self.grand("25 jours", font_size=40, color=JAUNE_TITRE).move_to(P(0, 3.3))
        self.add(tit)
        c2 = citerne_simple(0.8, 2.0, 0.55, 0.5, P(0, -0.4))
        self.add(c2)
        eau2 = VGroup(c2.cyl.corps.copy().set_fill(EAU, 0.85), c2.cone[0].copy().set_fill(EAU, 0.85))
        self.add(eau2)
        self.au_mot("25 jours sans pluie")
        jours = VGroup(*[Square(side_length=0.22, fill_color=EAU, fill_opacity=0.9, stroke_color=CUVE_B,
                               stroke_width=1.5) for _ in range(25)]).arrange_in_grid(rows=5, buff=0.07)
        jours.move_to(P(0, 1.55))
        self.play(LaggedStart(*[FadeIn(j, scale=0.7) for j in jours], lag_ratio=0.03), run_time=0.9)
        self.au_mot("il ne reste plus rien")
        self.play(FadeOut(eau2), *[j.animate.set_fill("#334155", 0.6) for j in jours], run_time=0.8)
        vide = sans_audit(self.grand("vide", font_size=34, color=ORANGE_Q)).move_to(P(0, -2.6))
        self.play(FadeIn(vide, scale=1.2), run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 04 : la question en commentaire ────────────────────────────────
        self.clear()
        self.margo_bas()
        self.dire("04-commentaire")
        self.play(FadeIn(self.grand("À toi !", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.2))), run_time=0.4)
        c3 = citerne_simple(0.8, 1.9, 0.5, 0.5, P(0, -1.1))
        eau3 = VGroup(c3.cyl.corps.copy().set_fill(EAU, 0.85), c3.cone[0].copy().set_fill(EAU, 0.85))
        self.au_mot("la même citerne")
        e1 = self.m2a("10 000 L", 28, VERT_OK).move_to(P(0, 1.9))
        self.play(FadeIn(c3), FadeIn(eau3), FadeIn(e1, scale=1.15), run_time=0.55)
        self.au_mot("250 litres par jour")
        e2 = sans_audit(self.t("− 250 L / jour", 28, ORANGE_Q)).move_to(P(0, 1.2))
        self.play(FadeIn(e2, scale=1.15), run_time=0.45)
        self.au_mot("Réponds en commentaire")
        self.play(FadeIn(self.commentaire(y=-2.75)), run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 05 ──────────────────────────────────────────────────────────────
        self.page_abonnement("05-abonne")
