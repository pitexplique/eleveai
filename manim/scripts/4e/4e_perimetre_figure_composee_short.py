# 4e_perimetre_figure_composee_short.py
# EleveAI — Maths 4e — SHORT de l'épisode P3 « le périmètre d'une figure composée ».
# ⛔ EN MANIM, PAS EN DESSIN ANIMÉ (REGLES.md 09/11 ; Frédéric, 16/11), et avec un DÉFI.
# CEINTURE BLANCHE, 9:16. Le défi : la piste de BMX, trois côtés de 20 m et un virage en
# demi-cercle de 20 m de diamètre — combien mesure le tour ? Réponse B (environ 91,4 m).
# ⛔ La phrase de réponse ne porte que les nombres dits APRÈS le premier point de la voix
#    (20, 2, 31,4, 91,4) : « 60 » est dit avant, il s'écrirait en avance.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/4e_perimetre_figure_composee_short.py ShortPerimetreFigureComposee4e
# ⛔ Contrôler le COMPTEUR sur le MP4 (barre de 3 s entière, dans la carte, rien par-dessus).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_short_commun import *  # noqa: E402,F403
from volume_4e_short_commun import Short4e, sans_audit, Y_ACCROCHE  # noqa: E402
from volume_4e_commun import piste, demi_disque  # noqa: E402

TOUR_C = ORANGE_RETENUE
PISTE_C, PISTE_B = "#fb923c", "#7c2d12"


class ShortPerimetreFigureComposee4e(Short4e):
    nom_voix = "4e-perimetre-figure-composee-short"
    fichier_marques = "4e_perimetre_figure_composee_short_marques.json"

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

        # ── 00 : la piste ──────────────────────────────────────────────────
        self.dire("00-accroche")
        self.au_mot("La piste de Zahia")
        tit = self.grand("Le virage compte", font_size=32, color=JAUNE_TITRE).move_to(P(0, 3.3))
        pi_ = piste(2.0, 1.0, 0.62, P(-1.0, -0.1), couleur=PISTE_C, bord=PISTE_B)
        self.play(FadeIn(tit), FadeIn(self.echelle_short()), FadeIn(pi_, scale=0.9), run_time=0.8)
        self.au_mot("trois côtés droits de 20 mètres")
        d20 = sans_audit(self.t("3 × 20 m", 24, BASE_C)).move_to(P(0, Y_ACCROCHE))
        self.play(Create(pi_.droits.copy().set_stroke(TOUR_C, 7)), FadeIn(d20), run_time=0.9)
        self.au_mot("un virage en demi-cercle de 20 mètres")
        v20 = sans_audit(self.t("demi-cercle 20 m", 24, PISTE_C)).move_to(P(0, -1.6))
        self.play(Create(pi_.arc.copy().set_stroke(TOUR_C, 7)), FadeIn(v20), run_time=0.9)
        self.attendre_voix(marge=0.2)

        # ── 01 : le défi ────────────────────────────────────────────────────
        self.dire("01-defi")
        self.au_mot("Combien mesure le tour complet")
        q = self.accroche("Le tour complet ?", fs=28, couleur=JAUNE_TITRE, y=-2.4)
        self.play(FadeIn(q), run_time=0.45)
        self.attendre_voix(marge=0.25)

        # ── 02 : la question-pause (3 s) — réponse B ───────────────────────
        self.ecran_question("02-question", "02b-reponse",
                            ["Le tour de la piste ?"],
                            ["80 m", "environ 91,4 m", "environ 123 m"], 1,
                            [["Le demi-cercle :", "π × 20"], ["÷ 2", "≈ 31,4 m."],
                             "En tout ≈ 91,4 m."],
                            x_col=0.0)

        # ── 03 : le virage ajoute 31 mètres, pas 20 ────────────────────────
        self.clear()
        self.margo_bas()
        self.dire("03-visuel")
        tit = self.grand("Le virage", font_size=34, color=JAUNE_TITRE).move_to(P(0, 3.3))
        self.add(tit)
        dd = demi_disque(1.0, 1.0, P(0, 0.4), couleur=PISTE_C, bord=PISTE_B)
        self.add(dd)
        self.au_mot("31 mètres")   # ⛔ au_mot sur LE NOMBRE, pas sur le début de la phrase
        arc = dd.arc.copy().set_stroke(TOUR_C, 9)
        a31 = self.t("+ 31 m", 32, VERT_OK).move_to(P(0, 2.2))
        self.play(Create(arc), FadeIn(a31, scale=1.15), run_time=0.9)
        self.au_mot("20.")
        diam = dd.diam.copy().set_stroke(BASE_C, 9)
        a20 = self.t("pas 20 m", 30, ROUGE_ERREUR).move_to(P(0, -1.3))
        self.play(Create(diam), FadeIn(a20, scale=1.15), run_time=0.8)
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
        dd2 = demi_disque(1.1, 1.0, P(0, 0.2), couleur=PISTE_C, bord=PISTE_B)
        self.au_mot("14 mètres")
        e14 = self.t("14 m", 28, BASE_C).move_to(P(0, -1.0))
        self.play(FadeIn(dd2, scale=0.9), FadeIn(e14), run_time=0.8)
        self.au_mot("la longueur de son arc")
        qa = self.t("son arc ?", 30, TOUR_C).move_to(P(0, -1.9))
        self.play(Create(dd2.arc.copy().set_stroke(TOUR_C, 9)), FadeIn(qa, scale=1.15), run_time=0.8)
        self.au_mot("Réponds en commentaire")
        self.play(FadeIn(self.commentaire(y=-2.9)), run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 05 ──────────────────────────────────────────────────────────────
        self.page_abonnement("05-abonne")
