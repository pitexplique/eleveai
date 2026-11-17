# 4e_aire_disque_short.py
# EleveAI — Maths 4e — SHORT de l'épisode A2 « l'aire d'un disque » (micro 3e aire_disque).
# ⛔ EN MANIM, PAS EN DESSIN ANIMÉ (REGLES.md 09/11 ; Frédéric, 16/11), et avec un DÉFI.
# CEINTURE BLANCHE, 9:16. Le défi : un tambour deux fois plus large, la peau coûte combien de
# fois plus cher ? Réponse C (quatre fois : l'aire dépend du rayon multiplié par lui-même).
# ⛔ La phrase de réponse ne porte que les nombres dits APRÈS le premier point de la voix (2 et 4).
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/4e_aire_disque_short.py ShortAireDisque4e
# ⛔ Contrôler le COMPTEUR sur le MP4 (barre de 3 s entière, dans la carte, rien par-dessus).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_short_commun import *  # noqa: E402,F403
from volume_4e_short_commun import Short4e, sans_audit, Y_ACCROCHE  # noqa: E402

PEAU_C, PEAU_B = "#fde68a", "#92400e"
BOIS_C = "#7c2d12"


def tambour(r, o=ORIGIN, sw=4):
    """Un tambour vu de dessus : le fût en bois, et la peau tendue dessus."""
    fut = Annulus(inner_radius=r, outer_radius=r * 1.16, fill_color=BOIS_C, fill_opacity=1,
                  stroke_width=0).move_to(o)
    peau = Circle(radius=r, fill_color=PEAU_C, fill_opacity=0.75, stroke_color=PEAU_B,
                  stroke_width=sw).move_to(o)
    g = VGroup(peau, fut)
    g.peau, g.fut, g.r, g.o = peau, fut, r, o
    return g


class ShortAireDisque4e(Short4e):
    nom_voix = "4e-aire-disque-short"
    fichier_marques = "4e_aire_disque_short_marques.json"

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

        # ── 00 : deux tambours ─────────────────────────────────────────────
        self.dire("00-accroche")
        self.au_mot("Nina fabrique")
        tit = self.grand("Deux fois plus large", font_size=30, color=JAUNE_TITRE).move_to(P(0, 3.3))
        petit = tambour(0.5, P(0, 1.6))
        self.play(FadeIn(tit), FadeIn(self.echelle_short()), FadeIn(petit, scale=0.9), run_time=0.8)
        self.au_mot("deux fois plus large")
        grand = tambour(1.0, P(0, -0.8))
        self.play(FadeIn(grand, scale=0.9), run_time=0.8)
        rr = VGroup(Line(P(0, 1.6), P(0.5, 1.6)).set_stroke(BASE_C, 6),
                    Line(P(0, -0.8), P(1.0, -0.8)).set_stroke(BASE_C, 6))
        self.play(Create(rr), run_time=0.5)
        self.attendre_voix(marge=0.2)

        # ── 01 : le défi ────────────────────────────────────────────────────
        self.dire("01-defi")
        self.au_mot("La peau coûte")
        self.play(Indicate(grand.peau, color=PEAU_C, scale_factor=1.08), run_time=0.8)
        self.au_mot("combien de fois plus cher")
        q = self.accroche("× combien ?", fs=30, couleur=JAUNE_TITRE, y=-2.4)
        self.play(FadeIn(q, scale=1.15), run_time=0.45)
        self.attendre_voix(marge=0.25)

        # ── 02 : la question-pause (3 s) — réponse C ───────────────────────
        self.ecran_question("02-question", "02b-reponse",
                            ["La peau coûte × …"],
                            ["2 fois", "3 fois", "4 fois"], 2,
                            ["L'aire vaut π × rayon × rayon.",
                             ["Rayon doublé :", "2 × 2", "= 4."]],
                            x_col=0.0)

        # ── 03 : deux fois plus large, quatre fois plus de peau ────────────
        self.clear()
        self.margo_bas()
        self.dire("03-visuel")
        tit = self.grand("Deux fois plus large", font_size=30, color=JAUNE_TITRE).move_to(P(0, 3.3))
        self.add(tit)
        petit = tambour(0.45, P(0, 1.9))
        grand = tambour(0.9, P(0, -0.5))
        self.add(petit, grand)
        self.au_mot("Deux fois plus large")
        self.play(Indicate(petit, color=PEAU_C, scale_factor=1.1),
                  Indicate(grand, color=PEAU_C, scale_factor=1.06), run_time=0.9)
        self.au_mot("quatre fois plus de peau")
        quarts = VGroup(*[AnnularSector(inner_radius=0, outer_radius=0.9, angle=PI / 2,
                                        start_angle=k * PI / 2, fill_color=PEAU_C,
                                        fill_opacity=0.45 + 0.2 * (k % 2), stroke_color=PEAU_B,
                                        stroke_width=3).move_arc_center_to(P(0, -0.5))
                          for k in range(4)])
        self.play(LaggedStart(*[FadeIn(c, scale=0.8) for c in quarts], lag_ratio=0.25), run_time=1.1)
        res = self.t("quatre fois plus de peau", 26, VERT_OK).move_to(P(0, -2.3))
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
        t = tambour(0.95, P(0, 0.7))
        self.au_mot("un tambour trois fois plus large")
        ray = Line(P(0, 0.7), P(0.95, 0.7)).set_stroke(BASE_C, 6)
        self.play(FadeIn(t, scale=0.9), Create(ray), run_time=0.8)
        r3 = self.t("rayon × trois", 30, BASE_C).move_to(P(0, -1.0))
        self.play(FadeIn(r3, scale=1.15), run_time=0.45)
        self.au_mot("Combien de fois plus de peau")
        pq = self.t("peau × ?", 30, PEAU_C).move_to(P(0, -1.9))
        self.play(FadeIn(pq, scale=1.15), run_time=0.45)
        self.au_mot("Réponds en commentaire")
        self.play(FadeIn(self.commentaire(y=-2.9)), run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 05 ──────────────────────────────────────────────────────────────
        self.page_abonnement("05-abonne")
