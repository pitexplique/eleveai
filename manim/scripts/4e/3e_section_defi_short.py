# 3e_section_defi_short.py
# EleveAI — Maths 3e — SHORT de l'épisode T8 « défis sur les sections » (micro 3e section_defi).
# ⛔ EN MANIM, PAS EN DESSIN ANIMÉ (REGLES.md 09/11 ; Frédéric, 16/11), et avec un DÉFI.
# CEINTURE BLANCHE, 9:16. Le défi : trois tranches — un carré, un carré plus petit, un point.
# Quel solide ? Réponse B (une pyramide ; le cône donnerait des disques, le cube des carrés égaux).
# ⛔ La voix de réponse n'a aucun nombre : la phrase de réponse n'en porte aucun, et sa 2ᵉ ligne
#    se cale sur « cône », le seul mot dit APRÈS le premier point (leçon 28).
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/3e_section_defi_short.py ShortSectionDefi3e
# ⛔ Contrôler le COMPTEUR sur le MP4 (barre de 3 s entière, dans la carte, rien par-dessus).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_short_commun import *  # noqa: E402,F403
from volume_4e_short_commun import Short4e, sans_audit, Y_ACCROCHE  # noqa: E402
from volume_4e_commun import point3, pyramide, cylindre  # noqa: E402

PYR_C = "#c084fc"
CYL_C = "#38bdf8"
SCAN_C = "#a78bfa"


def carre_cavaliere(c, o=ORIGIN, couleur=PYR_C, sw=4, op=0.35):
    """Un carré de côté c vu en cavalière, CENTRÉ sur o."""
    coin = o + P(-(c + c * 0.41) / 2, -(c * 0.29) / 2)
    q = lambda x, y: point3(coin, 1.0, x, y, 0)  # noqa: E731
    return Polygon(q(0, 0), q(c, 0), q(c, c), q(0, c), fill_color=couleur, fill_opacity=op,
                   stroke_color=couleur, stroke_width=sw)


def disque_cav(r, o=ORIGIN, couleur=CYL_C, sw=4, op=0.35):
    """Un disque vu en cavalière : une ellipse."""
    return Ellipse(width=2 * r, height=2 * r * 0.32, fill_color=couleur, fill_opacity=op,
                   stroke_color=couleur, stroke_width=sw).move_to(o)


class ShortSectionDefi3e(Short4e):
    nom_voix = "3e-section-defi-short"
    fichier_marques = "3e_section_defi_short_marques.json"

    def construct(self):
        self.margo_bas()

        # ── 00 : trois tranches ────────────────────────────────────────────
        self.dire("00-accroche")
        self.ouverture("Trois tranches, un solide", fs=28)
        self.au_mot("un carré en bas")
        c1 = carre_cavaliere(1.5, P(0, -1.9))
        self.play(FadeIn(c1, scale=0.8), run_time=0.6)
        self.au_mot("un carré plus petit")
        c2 = carre_cavaliere(0.78, P(0, -0.5))
        self.play(FadeIn(c2, scale=0.8), run_time=0.6)
        self.au_mot("un point en haut")
        pt = Dot(P(0, 0.8), radius=0.1, color=PYR_C)
        self.play(FadeIn(pt, scale=0.5), run_time=0.5)
        self.attendre_voix(marge=0.2)

        # ── 01 : le défi ────────────────────────────────────────────────────
        self.dire("01-defi")
        self.au_mot("Quel solide")
        q = self.accroche("quel solide ?", fs=30, couleur=JAUNE_TITRE, y=-2.9)
        self.play(FadeIn(q, scale=1.15), run_time=0.6)
        self.au_mot("a-t-il scanné")
        self.play(Indicate(VGroup(c1, c2, pt), color=SCAN_C, scale_factor=1.06), run_time=0.8)
        self.attendre_voix(marge=0.25)

        # ── 02 : la question-pause (3 s) — réponse B ───────────────────────
        # ⛔ Le mot de la carte (« quel ») est ABSENT de la voix : elle se pose juste après
        #    « Question ! », sans attendre un choix.
        self.ecran_question("02-question", "02b-reponse",
                            ["Quel solide ?"],
                            ["un cube", "une pyramide", "un cône"], 1,
                            ["Ils rétrécissent jusqu'à un point.", "Le cône donnerait des disques."],
                            x_col=0.0)

        # ── 03 : trois tranches suffisent ──────────────────────────────────
        self.clear()
        self.margo_bas()
        self.dire("03-visuel")
        tit = self.grand("La même histoire", font_size=32, color=JAUNE_TITRE).move_to(P(0, 3.3))
        self.add(tit)
        self.au_mot("Trois tranches suffisent")
        tr = VGroup(carre_cavaliere(1.4, P(0, 0.4)), carre_cavaliere(0.72, P(0, 1.5)),
                    Dot(P(0, 2.4), radius=0.1, color=PYR_C))
        self.play(LaggedStart(*[FadeIn(m, scale=0.8) for m in tr], lag_ratio=0.2), run_time=1.0)
        self.au_mot("la même histoire")
        py = pyramide(1.3, 1.5, 0.85, P(-0.9, -2.6))
        self.play(FadeIn(py, scale=0.85), run_time=0.9)
        res = self.t("une pyramide", 30, VERT_OK).move_to(P(0, -0.6))
        self.play(FadeIn(res, scale=1.15), run_time=0.5)
        self.attendre_voix(marge=0.3)

        # ── 04 : la question en commentaire ────────────────────────────────
        self.clear()
        self.margo_bas()
        self.dire("04-commentaire")
        self.play(FadeIn(self.grand("À toi !", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.2))),
                  run_time=0.4)
        self.au_mot("des disques tous égaux")
        ds = VGroup(*[disque_cav(0.65, P(0, 1.9 - k * 0.6)) for k in range(5)])
        self.play(LaggedStart(*[FadeIn(d, scale=0.8) for d in ds], lag_ratio=0.14), run_time=1.1)
        self.au_mot("du bas jusqu'en haut")
        fl = DoubleArrow(P(1.3, -0.5), P(1.3, 1.9), color=SCAN_C, buff=0, stroke_width=5,
                         tip_length=0.15)
        self.play(Create(fl), run_time=0.6)
        self.au_mot("Quel solide")
        sq = self.t("quel solide ?", 30, JAUNE_TITRE).move_to(P(0, -1.6))
        self.play(FadeIn(sq, scale=1.12), run_time=0.5)
        self.au_mot("Réponds en commentaire")
        self.play(FadeIn(self.commentaire(y=-2.8)), run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 05 ──────────────────────────────────────────────────────────────
        self.page_abonnement("05-abonne")
