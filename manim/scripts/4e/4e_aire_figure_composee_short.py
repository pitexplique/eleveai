# 4e_aire_figure_composee_short.py
# EleveAI — Maths 4e — SHORT de l'épisode A3 « l'aire d'une figure composée » (micro aire_figure).
# ⛔ EN MANIM, PAS EN DESSIN ANIMÉ (REGLES.md 09/11 ; Frédéric, 16/11), et avec un DÉFI.
# CEINTURE BLANCHE, 9:16. Le défi : une terrasse en L, un rectangle 8 × 5 et un autre 3 × 2 —
# combien de mètres carrés de gazon ? Réponse A (46 m² : 40 + 6).
# ⛔ La phrase de réponse ne porte que les nombres dits APRÈS le premier point de la voix
#    (3, 2, 6, 40, 46) : le premier « 8 × 5 = 40 » est dit avant.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/4e_aire_figure_composee_short.py ShortAireFigureComposee4e
# ⛔ Contrôler le COMPTEUR sur le MP4 (barre de 3 s entière, dans la carte, rien par-dessus).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_short_commun import *  # noqa: E402,F403
from volume_4e_short_commun import Short4e, sans_audit, Y_ACCROCHE  # noqa: E402
from volume_4e_commun import figure_L  # noqa: E402

GAZON_C, GAZON_B = "#4ade80", "#15803d"
AIRE2_C = "#38bdf8"


def terrasse(a, b, c, d, u, o=ORIGIN, sw=4):
    """Une terrasse en L (rectangle a × b moins c × d au coin haut-droit), avec son trait de
    découpe horizontal et les deux rectangles coloriés. Attributs : .trait .bas .haut"""
    L = figure_L(a, b, c, d, u, o, couleur=GAZON_C, bord=GAZON_B, sw=sw, op=0.6)
    hb = b - d
    L.trait = DashedLine(o + P(0, hb * u), o + P((a - c) * u, hb * u), color=WHITE,
                         stroke_width=3, dash_length=0.1)
    L.bas = Rectangle(width=a * u, height=hb * u, fill_color=AIRE2_C, fill_opacity=0.35,
                      stroke_width=0).move_to(o + P(a * u / 2, hb * u / 2))
    L.haut = Rectangle(width=(a - c) * u, height=d * u, fill_color=JAUNE_TITRE, fill_opacity=0.35,
                       stroke_width=0).move_to(o + P((a - c) * u / 2, (hb + d / 2) * u))
    return L


class ShortAireFigureComposee4e(Short4e):
    nom_voix = "4e-aire-figure-composee-short"
    fichier_marques = "4e_aire_figure_composee_short_marques.json"

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

        # ── 00 : la terrasse en L ──────────────────────────────────────────
        self.dire("00-accroche")
        self.au_mot("Hugo pose du gazon")
        tit = self.grand("La terrasse en L", font_size=32, color=JAUNE_TITRE).move_to(P(0, 3.3))
        u = 0.23
        L = terrasse(8, 7, 5, 2, u, P(-0.92, -0.8))
        self.play(FadeIn(tit), FadeIn(self.echelle_short()), FadeIn(L, scale=0.9), run_time=0.9)
        self.au_mot("un rectangle de 8 mètres sur 5")
        e1 = sans_audit(self.t("8 × 5", 26, AIRE2_C)).move_to(L.bas.get_center())
        self.play(FadeIn(L.bas), FadeIn(e1), run_time=0.7)
        self.au_mot("et un autre de 3 mètres sur 2")
        e2 = sans_audit(self.t("3 × 2", 22, JAUNE_TITRE)).move_to(L.haut.get_center())
        self.play(FadeIn(L.haut), FadeIn(e2), run_time=0.7)
        self.attendre_voix(marge=0.2)

        # ── 01 : le défi ────────────────────────────────────────────────────
        self.dire("01-defi")
        self.au_mot("Combien de mètres carrés")
        q = self.accroche("combien de m² ?", fs=30, couleur=JAUNE_TITRE, y=Y_ACCROCHE)
        self.play(FadeIn(q), run_time=0.45)
        self.attendre_voix(marge=0.25)

        # ── 02 : la question-pause (3 s) — réponse A ───────────────────────
        self.ecran_question("02-question", "02b-reponse",
                            ["Le gazon à commander ?"],
                            ["46 m²", "40 m²", "52 m²"], 0,
                            # ⛔ un nombre par morceau : « 3 × 2 » attendait le 2 et écrivait
                            # le 3 en retard ; « 40 : … » attendait « petit », dit 2 s plus loin.
                            [["3", "× 2", "= 6."], ["40", "+ 6", "= 46 m²."],
                             ["40 :", "le petit morceau oublié."]],
                            x_col=0.0)

        # ── 03 : un trait, deux rectangles, une addition ───────────────────
        self.clear()
        self.margo_bas()
        self.dire("03-visuel")
        tit = self.grand("Un trait", font_size=34, color=JAUNE_TITRE).move_to(P(0, 3.3))
        self.add(tit)
        u = 0.26
        L = terrasse(8, 7, 5, 2, u, P(-1.04, -0.9))
        self.add(L)
        self.au_mot("Un trait")
        self.play(Create(L.trait), run_time=0.7)
        self.au_mot("deux rectangles")
        self.play(FadeIn(L.bas), FadeIn(L.haut), run_time=0.7)
        self.au_mot("une addition")
        calc = sans_audit(self.t("40 + 6 = 46 m²", 30, VERT_OK)).move_to(P(0, -2.3))
        self.play(FadeIn(calc, scale=1.15), run_time=0.6)
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
        u = 0.22
        L2 = terrasse(9, 6, 4, 2, u, P(-0.99, -0.5))
        self.au_mot("un L fait d'un rectangle")
        self.play(FadeIn(L2, scale=0.9), run_time=0.7)
        # ⛔ Un nombre par morceau, posé à SON mot (sinon le second s'écrit avant d'être dit).
        e1 = VGroup(self.t("9", 26, AIRE2_C), self.t("× 4", 26, AIRE2_C)).arrange(RIGHT, buff=0.1)
        e1.move_to(L2.bas.get_center())
        self.au_mot("9 sur")
        self.play(FadeIn(L2.bas), FadeIn(e1[0]), run_time=0.5)
        self.au_mot("4 et")
        self.play(FadeIn(e1[1]), run_time=0.3)
        e2 = VGroup(self.t("5", 22, JAUNE_TITRE), self.t("× 2", 22, JAUNE_TITRE)).arrange(RIGHT, buff=0.08)
        e2.move_to(L2.haut.get_center())
        self.au_mot("5 sur")
        self.play(FadeIn(L2.haut), FadeIn(e2[0]), run_time=0.5)
        self.au_mot("2.")
        self.play(FadeIn(e2[1]), run_time=0.3)
        self.au_mot("Son aire")
        qa = self.t("son aire ?", 30, GAZON_C).move_to(P(0, -2.1))
        self.play(FadeIn(qa, scale=1.15), run_time=0.45)
        self.au_mot("Réponds en commentaire")
        self.play(FadeIn(self.commentaire(y=-2.9)), run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 05 ──────────────────────────────────────────────────────────────
        self.page_abonnement("05-abonne")
