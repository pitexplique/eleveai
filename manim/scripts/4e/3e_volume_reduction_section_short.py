# 3e_volume_reduction_section_short.py
# EleveAI — Maths 3e — SHORT de l'épisode T2 « la réduction par une section »
# (micro 3e volume_pyramide_cone_reduction).
# ⛔ EN MANIM, PAS EN DESSIN ANIMÉ (REGLES.md 09/11 ; Frédéric, 16/11), et avec un DÉFI.
# CEINTURE BLANCHE, 9:16. Le défi : ton gobelet conique est rempli à mi-hauteur, tu as payé plein
# tarif — as-tu la moitié de la boisson ? Réponse B (un huitième : le volume est divisé par 2 × 2 × 2).
# ⛔ La voix de réponse n'a AUCUN nombre après son premier point : la phrase de réponse n'en porte
#    aucun non plus (sinon AUDIT-TARD), et sa 2ᵉ ligne se cale sur le mot « huitième » de la fin.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/3e_volume_reduction_section_short.py ShortVolumeReductionSection3e
# ⛔ Contrôler le COMPTEUR sur le MP4 (barre de 3 s entière, dans la carte, rien par-dessus).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_short_commun import *  # noqa: E402,F403
from volume_4e_short_commun import Short4e, sans_audit, Y_ACCROCHE  # noqa: E402

GOB_C, GOB_D, GOB_B = "#e2e8f0", "#f8fafc", "#64748b"
SODA_C, SODA_B = "#b45309", "#78350f"


def gobelet(r, h, o=ORIGIN, sw=4):
    """Un gobelet CONIQUE : la pointe en bas (o), l'ouverture en haut."""
    ch = o + UP * h
    flancs = Polygon(ch + P(-r, 0), ch + P(r, 0), o, fill_color=GOB_C, fill_opacity=0.35,
                     stroke_width=0)
    ouv = Ellipse(width=2 * r, height=2 * r * 0.32, fill_color=GOB_D, fill_opacity=0.18,
                  stroke_color=GOB_B, stroke_width=sw).move_to(ch)
    gen = VGroup(Line(ch + P(-r, 0), o), Line(ch + P(r, 0), o)).set_stroke(GOB_B, sw)
    g = VGroup(flancs, ouv, gen)
    g.pointe, g.centre_haut, g.ouverture = o, ch, ouv
    g.hh = DashedLine(ch, o, color=HAUTEUR_C, stroke_width=5, dash_length=0.1)
    g.r, g.h = r, h
    return g


def liquide(g, k, couleur=SODA_C, sw=3):
    """Le liquide rempli jusqu'à la fraction k de la HAUTEUR : un petit cône de rapport k."""
    o = g.pointe
    ch = o + UP * k * g.h
    rk = k * g.r
    flancs = Polygon(ch + P(-rk, 0), ch + P(rk, 0), o, fill_color=couleur, fill_opacity=1,
                     stroke_width=0)
    surf = Ellipse(width=2 * rk, height=2 * rk * 0.32, fill_color=couleur, fill_opacity=1,
                   stroke_color=SODA_B, stroke_width=sw).move_to(ch)
    v = VGroup(flancs, surf)
    v.surface, v.centre_haut = surf, ch
    return v


class ShortVolumeReductionSection3e(Short4e):
    nom_voix = "3e-volume-reduction-section-short"
    fichier_marques = "3e_volume_reduction_section_short_marques.json"

    def construct(self):
        self.margo_bas()

        # ── 00 : le gobelet rempli à mi-hauteur ────────────────────────────
        self.dire("00-accroche")
        self.ouverture("La moitié du gobelet", fs=30)
        g = gobelet(0.8, 2.1, P(0, -1.5))
        self.play(FadeIn(g, scale=0.85), run_time=0.6)
        self.au_mot("rempli jusqu'à la moitié")
        li = liquide(g, 0.5)
        self.play(FadeIn(li, shift=UP * 0.3), run_time=0.7)
        self.au_mot("de sa hauteur")
        self.play(FadeIn(g.hh), run_time=0.45)
        self.attendre_voix(marge=0.2)

        # ── 01 : le défi ────────────────────────────────────────────────────
        self.dire("01-defi")
        self.au_mot("payé plein tarif")
        prix = self.t("plein tarif", 28, ORANGE_RETENUE).move_to(P(0, -2.65))
        self.play(FadeIn(prix, scale=1.15), run_time=0.5)
        self.au_mot("vraiment la moitié")
        q = self.accroche("la moitié de la boisson ?", fs=26, couleur=JAUNE_TITRE, y=Y_ACCROCHE)
        self.play(FadeIn(q), Indicate(li, color=SODA_C, scale_factor=1.1), run_time=0.8)
        self.attendre_voix(marge=0.25)

        # ── 02 : la question-pause (3 s) — réponse B ───────────────────────
        # ⛔ Le mot de la carte (« vraiment ») est ABSENT de la voix : elle se pose juste après
        #    « Question ! », sans attendre un choix.
        self.ecran_question("02-question", "02b-reponse",
                            ["Vraiment la moitié ?"],
                            ["oui, la moitié", "non, un huitième", "non, un quart"], 1,
                            ["La moitié de la hauteur,", "un huitième de la boisson."],
                            x_col=0.0)

        # ── 03 : moitié de la hauteur, huitième de la boisson ──────────────
        self.clear()
        self.margo_bas()
        self.dire("03-visuel")
        tit = self.grand("Moitié ≠ moitié", font_size=34, color=JAUNE_TITRE).move_to(P(0, 3.3))
        self.add(tit)
        g = gobelet(0.8, 2.2, P(-0.9, 0.2))
        li = liquide(g, 0.5)
        self.add(g, li)
        self.au_mot("La moitié de la hauteur")
        fl = VGroup(DoubleArrow(g.pointe, li.centre_haut, color=HAUTEUR_C, buff=0,
                                stroke_width=5, tip_length=0.16),
                    sans_audit(self.t("½", 30, HAUTEUR_C)))
        fl[1].next_to(fl[0], LEFT, buff=0.12)
        self.play(FadeIn(fl), run_time=0.7)
        # ⭐ Huit cases, UNE coloriée : le gobelet plein vaut huit gobelets remplis à mi-hauteur.
        cases = VGroup(*[Square(0.4, fill_color=SODA_C if k == 0 else GOB_C,
                                fill_opacity=0.95 if k == 0 else 0.25, stroke_color=WHITE,
                                stroke_width=2) for k in range(8)])
        cases.arrange_in_grid(rows=2, buff=0.08).move_to(P(0, -1.6))
        self.au_mot("un huitième de la boisson")
        self.play(LaggedStart(*[FadeIn(c, scale=0.8) for c in cases], lag_ratio=0.1), run_time=1.0)
        res = self.t("un huitième !", 30, VERT_OK).move_to(P(0, -2.6))
        self.play(FadeIn(res, scale=1.15), run_time=0.5)
        self.attendre_voix(marge=0.3)

        # ── 04 : la question en commentaire ────────────────────────────────
        self.clear()
        self.margo_bas()
        self.dire("04-commentaire")
        self.play(FadeIn(self.grand("À toi !", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.2))),
                  run_time=0.4)
        g = gobelet(0.85, 2.3, P(0, -0.5))
        self.play(FadeIn(g, scale=0.85), run_time=0.5)
        self.au_mot("rempli au tiers")
        li = liquide(g, 1 / 3)
        t3 = self.t("au tiers de la hauteur", 28, SODA_C).move_to(P(0, 2.1))
        self.play(FadeIn(li, shift=UP * 0.25), FadeIn(t3, shift=UP * 0.1), run_time=0.8)
        self.au_mot("quelle part du volume")
        vq = self.t("quelle part du volume ?", 28, JAUNE_TITRE).move_to(P(0, -1.9))
        self.play(FadeIn(vq, scale=1.1), run_time=0.5)
        self.au_mot("Réponds en commentaire")
                # ⛔ Rien ne descend sous y = −3,0 dans un short : Ti-Margo occupe la bande basse
        #    Ses PIXELS s'arrêtent à y = −3,02 (sa boîte, elle, monte à −2,92 : elle a du
        #    vide en haut). Le commentaire fait 0,852 de haut, donc −2,45 ; une phrase
        #    seule fait 0,36, donc −2,65. ⛔ À −2,6 le commentaire TOUCHE encore.
        self.play(FadeIn(self.commentaire(y=-2.45)), run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 05 ──────────────────────────────────────────────────────────────
        self.page_abonnement("05-abonne")
