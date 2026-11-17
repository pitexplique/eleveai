# 4e_aire_probleme_short.py
# EleveAI — Maths 4e — SHORT de l'épisode A4 « un problème d'aire » (micro aire_probleme).
# ⛔ EN MANIM, PAS EN DESSIN ANIMÉ (REGLES.md 09/11 ; Frédéric, 16/11), et avec un DÉFI.
# CEINTURE BLANCHE, 9:16. Le défi : une terrasse carrée de 8 m de côté, un bassin rond de 4 m de
# diamètre au milieu — combien de mètres carrés à carreler ? Réponse B (environ 51,4 m²).
# ⛔ La phrase de réponse ne porte que les nombres dits APRÈS le premier point de la voix.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/4e_aire_probleme_short.py ShortAireProbleme4e
# ⛔ Contrôler le COMPTEUR sur le MP4 (barre de 3 s entière, dans la carte, rien par-dessus).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_short_commun import *  # noqa: E402,F403
from volume_4e_short_commun import Short4e, sans_audit, Y_ACCROCHE  # noqa: E402

CARRELAGE_C, CARRELAGE_B = "#d6d3d1", "#57534e"
EAU_C, EAU_B = "#38bdf8", "#0c4a6e"


def chantier(cote, diam, u, o=ORIGIN, sw=4):
    """Une terrasse carrée avec un bassin rond au milieu. o = le centre.
    Attributs : .sol .bassin .diam_trait"""
    sol = Square(side_length=cote * u, fill_color=CARRELAGE_C, fill_opacity=0.45,
                 stroke_color=CARRELAGE_B, stroke_width=sw).move_to(o)
    ba = Circle(radius=diam * u / 2, fill_color=EAU_C, fill_opacity=0.75, stroke_color=EAU_B,
                stroke_width=sw).move_to(o)
    g = VGroup(sol, ba)
    g.sol, g.bassin, g.o = sol, ba, o
    g.diam_trait = Line(o + P(-diam * u / 2, 0), o + P(diam * u / 2, 0), color=BASE_C,
                        stroke_width=6)
    return g


class ShortAireProbleme4e(Short4e):
    nom_voix = "4e-aire-probleme-short"
    fichier_marques = "4e_aire_probleme_short_marques.json"

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

        # ── 00 : la terrasse et le bassin ──────────────────────────────────
        self.dire("00-accroche")
        self.au_mot("Une terrasse carrée")
        tit = self.grand("Le bassin dans la terrasse", font_size=28,
                         color=JAUNE_TITRE).move_to(P(0, 3.3))
        u = 0.22
        ch = chantier(8, 4, u, P(0, 0.3))
        self.play(FadeIn(tit), FadeIn(self.echelle_short()), FadeIn(ch.sol, scale=0.9), run_time=0.9)
        self.au_mot("8 mètres")
        c8 = self.t("8 m", 26, BASE_C).next_to(ch.sol, DOWN, buff=0.15)
        self.play(FadeIn(c8), run_time=0.4)
        self.au_mot("un bassin rond")
        self.play(FadeIn(ch.bassin, scale=0.9), run_time=0.6)
        self.au_mot("4 mètres")
        c4 = self.t("4 m", 26, EAU_C).move_to(P(0, Y_ACCROCHE))
        self.play(Create(ch.diam_trait), FadeIn(c4), run_time=0.55)
        self.attendre_voix(marge=0.2)

        # ── 01 : le défi ────────────────────────────────────────────────────
        self.dire("01-defi")
        self.au_mot("Combien de mètres carrés")
        q = self.accroche("combien de m² ?", fs=30, couleur=JAUNE_TITRE, y=-2.3)
        self.play(FadeIn(q), Indicate(ch.sol, color=CARRELAGE_C, scale_factor=1.05), run_time=0.8)
        self.attendre_voix(marge=0.25)

        # ── 02 : la question-pause (3 s) — réponse B ───────────────────────
        self.ecran_question("02-question", "02b-reponse",
                            ["La surface à carreler ?"],
                            ["64 m²", "environ 51,4 m²", "environ 12,6 m²"], 1,
                            [["Le bassin :", "π × 2", "× 2", "≈ 12,6."],
                             ["64", "− 12,6", "≈ 51,4 m²."]],
                            x_col=0.0)

        # ── 03 : on carrelle tout, sauf le rond ────────────────────────────
        self.clear()
        self.margo_bas()
        self.dire("03-visuel")
        tit = self.grand("Tout, sauf le rond", font_size=32, color=JAUNE_TITRE).move_to(P(0, 3.3))
        self.add(tit)
        u = 0.26
        ch = chantier(8, 4, u, P(0, 0.4))
        self.add(ch.sol)
        self.au_mot("On carrelle tout")
        carreaux = VGroup()
        c = 8 * u / 8
        for i in range(8):
            for j in range(8):
                carreaux.add(Square(side_length=c, fill_color=CARRELAGE_C, fill_opacity=0.5,
                                    stroke_color=WHITE, stroke_width=1.2)
                             .move_to(ch.o + P(-4 * u + (i + 0.5) * c, -4 * u + (j + 0.5) * c)))
        self.play(FadeIn(carreaux), run_time=0.9)
        self.au_mot("sauf le rond")
        self.play(FadeIn(ch.bassin, scale=0.85), run_time=0.8)
        res = sans_audit(self.t("64 − 12,6 ≈ 51,4 m²", 26, VERT_OK)).move_to(P(0, -2.4))
        self.play(FadeIn(res, scale=1.15), run_time=0.6)
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
        u = 0.2
        ch2 = chantier(10, 6, u, P(0, 0.5))
        self.au_mot("terrasse de 10 mètres")
        self.play(FadeIn(ch2.sol, scale=0.9), run_time=0.7)
        c10 = self.t("10 m", 26, BASE_C).next_to(ch2.sol, DOWN, buff=0.15)
        self.play(FadeIn(c10), run_time=0.35)
        self.au_mot("bassin rond")
        self.play(FadeIn(ch2.bassin, scale=0.9), Create(ch2.diam_trait), run_time=0.6)
        self.au_mot("6 mètres")
        c6 = self.t("6 m", 26, EAU_C).move_to(P(0, 2.2))
        self.play(FadeIn(c6), run_time=0.35)
        self.au_mot("Combien de mètres carrés")
        qa = self.t("combien de m² ?", 28, CARRELAGE_C).move_to(P(0, -1.9))
        self.play(FadeIn(qa, scale=1.15), run_time=0.45)
        self.au_mot("Réponds en commentaire")
        self.play(FadeIn(self.commentaire(y=-2.9)), run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 05 ──────────────────────────────────────────────────────────────
        self.page_abonnement("05-abonne")
