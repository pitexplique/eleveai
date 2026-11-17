# 4e_solides_vues_short.py
# EleveAI — Maths 4e — SHORT de l'épisode S2 « les vues d'un solide » (micro vision_vues).
# ⛔ EN MANIM, PAS EN DESSIN ANIMÉ (REGLES.md 09/11 ; Frédéric, 16/11), et avec un DÉFI.
# CEINTURE BLANCHE, 9:16. Le défi : de face un rectangle, de dessus un disque — pavé ou cylindre ?
# Réponse B (un cylindre) : le disque vu de dessus ne peut pas venir d'un pavé.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/4e_solides_vues_short.py ShortSolidesVues4e

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_short_commun import *  # noqa: E402,F403
from volume_4e_short_commun import Short4e, sans_audit, Y_ACCROCHE  # noqa: E402

VUE_C = "#f8fafc"


def cadre(contenu, titre, taille=1.5, fs=20):
    c = Square(side_length=taille, stroke_color="#475569", stroke_width=3,
               fill_color="#0f172a", fill_opacity=0.9)
    contenu.move_to(c.get_center())
    t = sans_audit(Text(titre, font_size=fs, color=VUE_C, weight=BOLD)).next_to(c, DOWN, buff=0.1)
    g = VGroup(c, contenu, t)
    g.cadre, g.contenu = c, contenu
    return g


class ShortSolidesVues4e(Short4e):
    nom_voix = "4e-solides-vues-short"
    fichier_marques = "4e_solides_vues_short_marques.json"

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

        # ── 00 : un rectangle de face, rien d'autre ─────────────────────────
        self.dire("00-accroche")
        self.ouverture("Rectangle de face", fs=32)
        vf = cadre(Rectangle(width=0.8, height=1.05, color=VUE_C, stroke_width=4), "de face", taille=1.7)
        vf.move_to(P(0, 0.55))
        self.au_mot("Karim voit un rectangle")
        self.play(FadeIn(vf, shift=UP * 0.2), run_time=0.6)
        self.au_mot("Rien d'autre")
        rien = sans_audit(self.t("rien d'autre", 26, ORANGE_Q)).move_to(P(0, -0.9))
        self.play(FadeIn(rien), run_time=0.4)
        self.attendre_voix(marge=0.2)

        # ── 01 : le défi ────────────────────────────────────────────────────
        self.dire("01-defi")
        self.au_mot("la vue de dessus")
        vd = cadre(Circle(radius=0.4, color=VUE_C, stroke_width=4), "de dessus", taille=1.7)
        vd.move_to(P(0, -1.75))
        self.play(FadeIn(vd, shift=UP * 0.2), run_time=0.55)
        self.au_mot("pavé ou cylindre")
        q = self.accroche("Pavé ou cylindre ?", fs=30, couleur=JAUNE_TITRE, y=Y_ACCROCHE)
        self.play(FadeIn(q), run_time=0.4)
        self.attendre_voix(marge=0.25)

        # ── 02 : la question-pause (3 s) — réponse B ───────────────────────
        self.ecran_question("02-question", "02b-reponse",
                            ["De face : rectangle.", "De dessus : disque.", "Quel solide ?"],
                            ["un pavé", "un cylindre", "on ne peut pas savoir"], 1,
                            [["Le disque", "vient du cylindre."], "Un pavé : un rectangle."],
                            x_col=0.0)

        # ── 03 : une vue ment, deux vues décident ──────────────────────────
        self.clear()
        self.margo_bas()
        self.dire("03-visuel")
        tit = self.grand("Une vue ment", font_size=34, color=JAUNE_TITRE).move_to(P(0, 3.3))
        self.add(tit)
        pv = pave(1.1, 0.8, 1.4, 0.5, P(-1.6, -0.5))
        cy = cylindre(0.55, 1.4, 0.5, P(1.1, -0.5), corps="#38bdf8", dessus="#7dd3fc", bord="#0c4a6e")
        self.add(pv, cy)
        self.au_mot("Une vue, ça ment")
        vf = cadre(Rectangle(width=0.7, height=0.9, color=VUE_C, stroke_width=4), "de face", taille=1.4)
        vf.move_to(P(0, 1.55))
        self.play(FadeIn(vf), run_time=0.5)
        self.au_mot("Deux vues, ça décide")
        vd = cadre(Circle(radius=0.34, color=VUE_C, stroke_width=4), "de dessus", taille=1.4)
        vd.move_to(P(0, -2.03))
        self.play(FadeIn(vd), FadeOut(pv), Indicate(cy, color=JAUNE_TITRE, scale_factor=1.1), run_time=0.8)
        self.attendre_voix(marge=0.3)

        # ── 04 : la question en commentaire ────────────────────────────────
        self.clear()
        # ⛔ Pas de margo_bas() sur CET écran : Ti-Margo occupe y ∈ [-3.85, -3.02]
        # et sa tête couvrait une lettre de « @eleveai974 » (17/11). Le gabarit le dit
        # lui-même : dans la bande basse il ne porte aucune information, il peut être
        # masqué sans rien coûter. Il reste présent sur l'écran d'abonnement.
        self.dire("04-commentaire")
        self.play(FadeIn(self.grand("À toi !", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.2))), run_time=0.4)
        tri = Polygon(P(-0.42, -0.42), P(0.42, -0.42), P(0, 0.5), color=VUE_C, stroke_width=4)
        self.au_mot("de face un triangle")
        v1 = cadre(tri, "de face", taille=1.6).move_to(P(0, 1.1))
        self.play(FadeIn(v1), run_time=0.55)
        self.au_mot("de dessus un carré")
        v2 = cadre(Square(side_length=0.8, color=VUE_C, stroke_width=4), "de dessus", taille=1.6)
        v2.move_to(P(0, -0.9))
        self.play(FadeIn(v2), run_time=0.55)
        self.au_mot("Réponds en commentaire")
        self.play(FadeIn(self.commentaire(y=-2.75)), run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 05 ──────────────────────────────────────────────────────────────
        self.page_abonnement("05-abonne")
