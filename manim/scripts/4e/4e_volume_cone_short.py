# 4e_volume_cone_short.py
# EleveAI — Maths 4e — SHORT de l'épisode V3 « le volume d'un cône » (micro volume_cone, 4e et 3e).
# ⛔ En MANIM (REGLES.md, 09/11) et avec un DÉFI (Frédéric, 15/11). CEINTURE BLANCHE, 9:16.
# Le défi : même prix, un cornet (r = 3, h = 12) ou un pot (r = 3, h = 4) — lequel contient le plus ?
# Réponse C : les deux font 36π. Trois fois plus haut, mais divisé par 3 : ça s'annule.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/4e_volume_cone_short.py ShortVolumeCone4e

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_short_commun import *  # noqa: E402,F403
from volume_4e_short_commun import Short4e, sans_audit, Y_ACCROCHE  # noqa: E402

CONE_C, CONE_D, CONE_B = "#fb923c", "#fdba74", "#7c2d12"
GLACE_C = "#fda4af"


def cornet_simple(r, h, u, o, sw=3, glace=True):
    """Un cornet : cône pointe en bas, o = la pointe."""
    S = o
    haut = o + UP * h * u
    w, e = 2 * r * u, 2 * r * u * 0.32
    flancs = Polygon(haut + P(-r * u, 0), haut + P(r * u, 0), S, fill_color=CONE_C, fill_opacity=1,
                     stroke_width=0)
    bord = Ellipse(width=w, height=e, fill_color=CONE_D, fill_opacity=1, stroke_color=CONE_B,
                   stroke_width=sw).move_to(haut)
    gen = VGroup(Line(haut + P(-r * u, 0), S), Line(haut + P(r * u, 0), S)).set_stroke(CONE_B, sw)
    g = VGroup(flancs, bord, gen)
    if glace:
        g.add(Circle(radius=r * u * 0.9, fill_color=GLACE_C, fill_opacity=1, stroke_color="#9f1239",
                     stroke_width=sw).move_to(haut + UP * r * u * 0.5))
    g.haut, g.pointe, g.r, g.h, g.u = haut, S, r, h, u
    return g


def pot(r, h, u, o, sw=3):
    """Un pot de glace : un cylindre, o = le centre du disque du bas."""
    c = cylindre(r, h, u, o, corps="#f8fafc", dessus=GLACE_C, bord="#9f1239", sw=sw)
    return c


class ShortVolumeCone4e(Short4e):
    nom_voix = "4e-volume-cone-short"
    fichier_marques = "4e_volume_cone_short_marques.json"

    def construct(self):
        self.margo_bas()

        # ── 00 : le cornet et le pot, même prix ─────────────────────────────
        self.dire("00-accroche")
        self.ouverture("Le cornet ou le pot ?", fs=30)
        co = cornet_simple(0.75, 2.6, 0.42, P(-1.05, -0.95))
        po = pot(0.75, 1.1, 0.42, P(1.05, -0.95))
        self.au_mot("Même prix")
        prix = sans_audit(self.t("même prix", 26, JAUNE_TITRE)).move_to(P(0, 1.6))
        self.play(FadeIn(prix), run_time=0.35)
        self.au_mot("3 centimètres de rayon et 12 de haut")
        ec = sans_audit(self.t("r = 3, h = 12", 22, CONE_C)).move_to(P(-0.95, -1.75))
        self.play(FadeIn(co, shift=UP * 0.2), FadeIn(ec), run_time=0.5)
        self.au_mot("3 centimètres de rayon et 4 de haut")
        ep = sans_audit(self.t("r = 3, h = 4", 22, GLACE_C)).move_to(P(1.05, -1.75))
        self.play(FadeIn(po, shift=UP * 0.2), FadeIn(ep), run_time=0.5)
        self.attendre_voix(marge=0.2)

        # ── 01 : le défi ────────────────────────────────────────────────────
        self.dire("01-defi")
        self.au_mot("bien plus haut")
        fl = DoubleArrow(P(-1.95, -0.95), P(-1.95, 0.15), color=HAUTEUR_C, stroke_width=5, buff=0)
        self.play(Create(fl), run_time=0.4)
        self.au_mot("lequel contient le plus")
        q = self.accroche("Lequel en contient le plus ?", fs=26, couleur=JAUNE_TITRE, y=Y_ACCROCHE)
        self.play(FadeIn(q), run_time=0.4)
        self.attendre_voix(marge=0.25)

        # ── 02 : la question-pause (3 s) — réponse C ───────────────────────
        self.ecran_question("02-question", "02b-reponse",
                            ["Cornet : r = 3, h = 12.", "Pot : r = 3, h = 4.", "Lequel contient le plus ?"],
                            ["le cornet", "le pot", "les deux pareil"], 2,
                            [["Cornet :", "9π", "× 12", "÷ 3", "= 36π."], ["Pot :", "9π", "× 4", "= 36π."]])

        # ── 03 : ça s'annule ────────────────────────────────────────────────
        self.clear()
        self.margo_bas()
        self.dire("03-visuel")
        tit = self.grand("Ça s'annule", font_size=34, color=JAUNE_TITRE).move_to(P(0, 3.3))
        self.add(tit)
        co2 = cornet_simple(0.7, 2.4, 0.4, P(-1.0, -0.3), glace=False)
        po2 = pot(0.7, 0.8, 0.4, P(1.0, -0.3))
        self.add(co2, po2)
        self.au_mot("Trois fois plus haut")
        h3 = sans_audit(self.t("3 fois plus haut", 24, HAUTEUR_C)).move_to(P(0, 1.5))
        self.play(FadeIn(h3), run_time=0.4)
        self.au_mot("mais divisé par 3")
        d3 = sans_audit(self.t("mais ÷ 3", 28, JAUNE_TITRE)).move_to(P(0, -1.5))
        self.play(FadeIn(d3, scale=1.2), run_time=0.45)
        self.au_mot("ça s'annule")
        eg = sans_audit(self.grand("36π = 36π", font_size=36, color=VERT_OK)).move_to(P(0, -2.4))
        self.play(FadeIn(eg, scale=1.2), run_time=0.5)
        self.attendre_voix(marge=0.3)

        # ── 04 : la question en commentaire ────────────────────────────────
        self.clear()
        self.margo_bas()
        self.dire("04-commentaire")
        self.play(FadeIn(self.grand("À toi !", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.2))), run_time=0.4)
        co3 = cornet_simple(0.7, 2.0, 0.45, P(-1.0, 0.2), glace=False)
        self.au_mot("2 centimètres de rayon et 6 de haut")
        e = sans_audit(self.t("r = 2, h = 6", 26, CONE_C)).move_to(P(0, -0.75))
        self.play(FadeIn(co3), FadeIn(e, scale=1.15), run_time=0.5)
        self.au_mot("Quelle hauteur doit avoir le pot")
        po3 = pot(0.7, 0.7, 0.45, P(1.05, -0.1))
        inc = sans_audit(self.t("h = ?", 28, GLACE_C)).move_to(P(1.05, -1.45))
        self.play(FadeIn(po3), FadeIn(inc, scale=1.2), run_time=0.5)
        self.au_mot("Réponds en commentaire")
        self.play(FadeIn(self.commentaire()), run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 05 ──────────────────────────────────────────────────────────────
        self.page_abonnement("05-abonne")
