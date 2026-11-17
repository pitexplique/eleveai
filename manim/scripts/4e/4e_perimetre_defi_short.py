# 4e_perimetre_defi_short.py
# EleveAI — Maths 4e — SHORT de l'épisode P5 « défis sur les périmètres » (micro aire_perimetre_defi).
# ⛔ EN MANIM, PAS EN DESSIN ANIMÉ (REGLES.md 09/11 ; Frédéric, 16/11), et avec un DÉFI.
# CEINTURE BLANCHE, 9:16. Le défi : Thierry double le rayon de son enclos rond — le grillage est
# multiplié par combien ? Réponse A (par 2 : le tour vaut 2 × π × rayon ; c'est l'AIRE qui ×4).
# ⛔ La phrase de réponse ne porte que les nombres dits APRÈS le premier point de la voix (4).
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/4e_perimetre_defi_short.py ShortPerimetreDefi4e
# ⛔ Contrôler le COMPTEUR sur le MP4 (barre de 3 s entière, dans la carte, rien par-dessus).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_short_commun import *  # noqa: E402,F403
from volume_4e_short_commun import Short4e, sans_audit, Y_ACCROCHE  # noqa: E402

TOUR_C = ORANGE_RETENUE
HERBE_C = "#4d7c0f"


def enclos(r, o=ORIGIN, sw=6):
    """Un enclos rond : l'herbe, et le grillage autour."""
    herbe = Circle(radius=r, fill_color=HERBE_C, fill_opacity=0.45, stroke_width=0).move_to(o)
    gril = Circle(radius=r, stroke_color=TOUR_C, stroke_width=sw, fill_opacity=0).move_to(o)
    g = VGroup(herbe, gril)
    g.herbe, g.grillage, g.r, g.o = herbe, gril, r, o
    return g


class ShortPerimetreDefi4e(Short4e):
    nom_voix = "4e-perimetre-defi-short"
    fichier_marques = "4e_perimetre_defi_short_marques.json"

    def construct(self):
        self.margo_bas()

        # ── 00 : Thierry double le rayon ───────────────────────────────────
        self.dire("00-accroche")
        self.au_mot("Thierry double le rayon")
        tit = self.grand("Deux fois plus grand ?", font_size=30, color=JAUNE_TITRE).move_to(P(0, 3.3))
        petit = enclos(0.5, P(0, 1.5))
        self.play(FadeIn(tit), FadeIn(self.echelle_short()), FadeIn(petit, scale=0.9), run_time=0.8)
        grand = enclos(1.0, P(0, -0.9))
        self.au_mot("de son enclos rond")
        self.play(FadeIn(grand, scale=0.9), run_time=0.7)
        rr = VGroup(Line(P(0, 1.5), P(0.5, 1.5)).set_stroke(BASE_C, 6),
                    Line(P(0, -0.9), P(1.0, -0.9)).set_stroke(BASE_C, 6))
        self.play(Create(rr), run_time=0.5)
        self.attendre_voix(marge=0.2)

        # ── 01 : le défi ────────────────────────────────────────────────────
        self.dire("01-defi")
        self.au_mot("Le grillage qui en fait le tour")
        self.play(Indicate(petit.grillage, color=TOUR_C, scale_factor=1.12),
                  Indicate(grand.grillage, color=TOUR_C, scale_factor=1.08), run_time=0.9)
        self.au_mot("multiplié par combien")
        q = self.accroche("× combien ?", fs=30, couleur=JAUNE_TITRE, y=-2.5)
        self.play(FadeIn(q, scale=1.15), run_time=0.45)
        self.attendre_voix(marge=0.25)

        # ── 02 : la question-pause (3 s) — réponse A ───────────────────────
        self.ecran_question("02-question", "02b-reponse",
                            ["Le grillage est × …"],
                            ["2", "4", "3"], 0,
                            ["Rayon doublé, tour doublé.", ["C'est l'aire", "qui serait × 4."]],
                            x_col=0.0)

        # ── 03 : grillage doublé, place multipliée par quatre ──────────────
        self.clear()
        self.margo_bas()
        self.dire("03-visuel")
        tit = self.grand("Rayon doublé", font_size=34, color=JAUNE_TITRE).move_to(P(0, 3.3))
        self.add(tit)
        petit = enclos(0.45, P(0, 1.8))
        grand = enclos(0.9, P(0, -0.5))
        self.add(petit, grand)
        self.au_mot("grillage doublé")
        g1 = Line(P(-1.4, 0.6), P(-1.4 + 2 * PI * 0.45 * 0.35, 0.6)).set_stroke(TOUR_C, 8)
        g2 = Line(P(-1.4, 0.3), P(-1.4 + 2 * PI * 0.9 * 0.35, 0.3)).set_stroke(TOUR_C, 8)
        self.play(Create(g1), run_time=0.4)
        self.play(Create(g2), run_time=0.6)
        self.au_mot("mais place multipliée par quatre")
        quarts = VGroup(*[AnnularSector(inner_radius=0, outer_radius=0.9, angle=PI / 2,
                                        start_angle=k * PI / 2, fill_color=HERBE_C,
                                        fill_opacity=0.35 + 0.15 * (k % 2), stroke_color=WHITE,
                                        stroke_width=3).move_arc_center_to(P(0, -0.5))
                          for k in range(4)])
        self.play(LaggedStart(*[FadeIn(c, scale=0.8) for c in quarts], lag_ratio=0.25), run_time=1.1)
        res = self.t("la place, par quatre", 26, VERT_OK).move_to(P(0, -2.3))
        self.play(FadeIn(res, scale=1.15), run_time=0.5)
        self.attendre_voix(marge=0.3)

        # ── 04 : la question en commentaire ────────────────────────────────
        self.clear()
        # ⛔ Pas de margo_bas() sur CET écran : Ti-Margo occupe y ∈ [-3.85, -3.02]
        # et sa tête couvrait une lettre de « @eleveai974 » (17/11). Le gabarit le dit
        # lui-même : dans la bande basse il ne porte aucune information, il peut être
        # masqué sans rien coûter. Il reste présent sur l'écran d'abonnement.
        self.dire("04-commentaire")
        self.play(FadeIn(self.grand("À toi !", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.2))),
                  run_time=0.4)
        en = enclos(0.9, P(0, 0.8))
        self.au_mot("si le rayon est multiplié")
        ray = Line(P(0, 0.8), P(0.9, 0.8)).set_stroke(BASE_C, 7)
        self.play(FadeIn(en, scale=0.9), Create(ray), run_time=0.8)
        self.au_mot("3,")
        r3 = self.t("rayon × 3", 30, BASE_C).move_to(P(0, -0.8))
        self.play(FadeIn(r3, scale=1.15), run_time=0.45)
        self.au_mot("le grillage est-il multiplié")
        gq = self.t("grillage × ?", 30, TOUR_C).move_to(P(0, -1.8))
        self.play(FadeIn(gq, scale=1.15), run_time=0.45)
        self.au_mot("Réponds en commentaire")
        self.play(FadeIn(self.commentaire(y=-2.9)), run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 05 ──────────────────────────────────────────────────────────────
        self.page_abonnement("05-abonne")
