# 4e_perimetre_cercle_short.py
# EleveAI — Maths 4e — SHORT de l'épisode P2 « la longueur d'un cercle » (micro 3e aire_perimetre_cercle).
# ⛔ EN MANIM, PAS EN DESSIN ANIMÉ (REGLES.md 09/11 ; Frédéric, 16/11), et avec un DÉFI.
# CEINTURE BLANCHE, 9:16. Le défi : un bassin de 4 m de diamètre, une margelle à 40 € le mètre —
# combien coûte-t-elle ? Réponse A (environ 504 €, parce que le tour fait 12,6 m et pas 4 m).
# ⛔ La phrase de réponse ne porte que les nombres dits APRÈS le premier point de la voix
#    (160, 4, 12,6) : « 504 » et « 40 » sont dits avant, ils s'écriraient en avance.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/4e_perimetre_cercle_short.py ShortPerimetreCercle4e
# ⛔ Contrôler le COMPTEUR sur le MP4 (barre de 3 s entière, dans la carte, rien par-dessus).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_short_commun import *  # noqa: E402,F403
from volume_4e_short_commun import Short4e, sans_audit, Y_ACCROCHE  # noqa: E402

TOUR_C = ORANGE_RETENUE
EAU_C, EAU_B = "#38bdf8", "#0c4a6e"
MARGELLE_C = "#d6b98c"


def bassin(r, o=ORIGIN, sw=4):
    """Un bassin rond vu de dessus : l'eau, et la margelle autour. Attributs : .eau .margelle"""
    eau = Circle(radius=r, fill_color=EAU_C, fill_opacity=0.55, stroke_color=EAU_B,
                 stroke_width=sw * 0.6).move_to(o)
    marg = Annulus(inner_radius=r, outer_radius=r * 1.16, fill_color=MARGELLE_C,
                   fill_opacity=0.95, stroke_width=0).move_to(o)
    g = VGroup(eau, marg)
    g.eau, g.margelle, g.r = eau, marg, r
    return g


class ShortPerimetreCercle4e(Short4e):
    nom_voix = "4e-perimetre-cercle-short"
    fichier_marques = "4e_perimetre_cercle_short_marques.json"

    def _carte(self, lettre, contenu, fs):
        """⛔ La carte d'un choix, avec la PLACE DU ✓ au bout. Le gabarit étire le libellé
        jusqu'à 0,8 du bord de la carte, or le ✓ de la bonne réponse se pose à 0,38 du bord
        DROIT : sur un libellé long il TOUCHE la dernière lettre (« le deuxièm✓e »,
        « environ 51,4 m✓² » — mesuré à l'image, 10 des 20 shorts de 4e, écarts de -8 à
        -27 px). `BORDS=1` ne voit rien : rien ne sort du cadre. Même remède qu'en CM2
        (`manim/scripts/cm2/aire_comprendre.py`). Les libellés courts ne bougent pas : la
        condition ne les atteint jamais."""
        g = super()._carte(lettre, contenu, fs)
        cadre, ligne = g
        if ligne.width > self.LARG - 1.2:
            ligne.scale_to_fit_width(self.LARG - 1.2)
            ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.2, LEFT)
        return g

    def construct(self):
        self.margo_bas()

        # ── 00 : le bassin, son diamètre, le prix au mètre ─────────────────
        self.dire("00-accroche")
        self.au_mot("Le bassin de Marc")
        tit = self.grand("La margelle au mètre", font_size=30, color=JAUNE_TITRE).move_to(P(0, 3.3))
        b = bassin(1.0, P(0, 0.5))
        self.play(FadeIn(tit), FadeIn(self.echelle_short()), FadeIn(b, scale=0.9), run_time=0.8)
        dia = Line(P(-1.0, 0.5), P(1.0, 0.5)).set_stroke(BASE_C, 7)
        self.au_mot("4 mètres de diamètre")
        e4 = self.t("4 m", 26, BASE_C).move_to(P(0, Y_ACCROCHE))
        self.play(Create(dia), FadeIn(e4), run_time=0.6)
        self.au_mot("40 euros le mètre")
        prix = self.t("40 € le mètre", 28, JAUNE_TITRE).move_to(P(0, -1.3))
        self.play(FadeIn(prix, scale=1.1), run_time=0.5)
        self.attendre_voix(marge=0.2)

        # ── 01 : le défi ────────────────────────────────────────────────────
        self.dire("01-defi")
        self.au_mot("Le tour du bassin")
        tour = Circle(radius=1.16, color=TOUR_C, stroke_width=7).move_to(P(0, 0.5))
        self.play(Create(tour), run_time=0.8)
        # ⛔ le nombre attend SON mot : sur la phrase entière, « 12,6 » s'écrivait 1,2 s trop tôt.
        self.au_mot("12,6 mètres")
        e126 = self.t("tour ≈ 12,6 m", 26, TOUR_C).move_to(P(0, -2.1))
        self.play(FadeIn(e126, scale=1.1), run_time=0.45)
        self.au_mot("Combien va coûter la margelle")
        q = self.accroche("Combien va-t-elle coûter ?", fs=24, couleur=JAUNE_TITRE, y=-2.8)
        self.play(FadeIn(q), run_time=0.45)
        self.attendre_voix(marge=0.25)

        # ── 02 : la question-pause (3 s) — réponse A ───────────────────────
        self.ecran_question("02-question", "02b-reponse",
                            ["Le prix de la margelle ?"],
                            ["environ 504 €", "environ 160 €", "environ 50 €"], 0,
                            ["Le prix au mètre, fois le tour.", ["160 :", "4 m comptés,"],
                             "au lieu de 12,6 m."],
                            x_col=0.0)

        # ── 03 : 4 mètres de large, plus de 12 mètres de tour ──────────────
        self.clear()
        self.margo_bas()
        self.dire("03-visuel")
        tit = self.grand("Quatre mètres de large", font_size=28, color=JAUNE_TITRE).move_to(P(0, 3.3))
        self.add(tit)
        u = 0.25
        b2 = bassin(2 * u, P(0, 1.5))
        self.au_mot("Un bassin de 4 mètres de large")
        dia2 = Line(P(-2 * u, 1.5), P(2 * u, 1.5)).set_stroke(BASE_C, 6)
        lab = sans_audit(self.t("4 m", 22, BASE_C)).next_to(b2, UP, buff=0.15)
        self.play(FadeIn(b2, scale=0.9), Create(dia2), FadeIn(lab), run_time=0.8)
        self.au_mot("12 mètres de tour")   # ⛔ « plus de… » part 0,4 s avant le nombre
        g = P(-12.6 * u / 2, -0.4)
        droit = Line(g, g + RIGHT * 12.6 * u).set_stroke(TOUR_C, 8)
        # ⛔ le texte chiffré part AVEC le tracé : posé après les trois diamètres, il arrivait 1,5 s
        #    après le mot (AUDIT-TARD).
        res = self.t("plus de 12 m", 28, VERT_OK).move_to(P(0, -2.1))
        self.play(Create(droit), FadeIn(res, scale=1.15), run_time=0.9)
        diam = VGroup(*[Line(g + RIGHT * k * 4 * u + DOWN * 0.45, g + RIGHT * (k + 1) * 4 * u + DOWN * 0.45)
                        .set_stroke(BASE_C, 6) for k in range(3)])
        self.play(LaggedStart(*[Create(s) for s in diam], lag_ratio=0.3), run_time=0.9)
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
        b3 = bassin(1.1, P(0, 0.6))
        self.au_mot("un bassin")
        d3 = Line(P(-1.1, 0.6), P(1.1, 0.6)).set_stroke(BASE_C, 7)
        self.play(FadeIn(b3, scale=0.9), Create(d3), run_time=0.7)
        self.au_mot("6 mètres")
        e6 = self.t("6 m", 26, BASE_C).move_to(P(0, 2.2))
        self.play(FadeIn(e6, scale=1.1), run_time=0.4)
        self.au_mot("la longueur de sa margelle")
        qm = self.t("sa margelle ?", 28, MARGELLE_C).move_to(P(0, -1.5))
        self.play(FadeIn(qm, scale=1.15), run_time=0.45)
        self.au_mot("Réponds en commentaire")
        self.play(FadeIn(self.commentaire(y=-2.85)), run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 05 ──────────────────────────────────────────────────────────────
        self.page_abonnement("05-abonne")
