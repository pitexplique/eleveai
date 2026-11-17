# 4e_perimetre_probleme_short.py
# EleveAI — Maths 4e — SHORT de l'épisode P4 « un problème de périmètre » (micro aire_perimetre_probleme).
# ⛔ EN MANIM, PAS EN DESSIN ANIMÉ (REGLES.md 09/11 ; Frédéric, 16/11), et avec un DÉFI.
# CEINTURE BLANCHE, 9:16. Le défi : cinq tours de piste de 400 m, ça fait combien de kilomètres ?
# Réponse B (2 km : 400 × 5 = 2 000 m).
# ⛔ La phrase de réponse ne porte que les nombres dits APRÈS le premier point de la voix
#    (2 000 et 2) : « 400 » et « 5 » sont dits avant, ils s'écriraient en retard.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/4e_perimetre_probleme_short.py ShortPerimetreProbleme4e
# ⛔ Contrôler le COMPTEUR sur le MP4 (barre de 3 s entière, dans la carte, rien par-dessus).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_short_commun import *  # noqa: E402,F403
from volume_4e_short_commun import Short4e, sans_audit, Y_ACCROCHE  # noqa: E402

TOUR_C = ORANGE_RETENUE
PISTE_C = "#b91c1c"
PELOUSE = "#15803d"


def stade(droit, r, o=ORIGIN, couleur=PISTE_C, sw=5, op=0.45):
    """Une piste d'athlétisme vue de dessus. o = le centre. Attributs : .contour .pelouse"""
    L = droit / 2
    pel = VGroup(Rectangle(width=2 * L, height=2 * r, fill_color=PELOUSE, fill_opacity=op,
                           stroke_width=0).move_to(o),
                 Circle(radius=r, fill_color=PELOUSE, fill_opacity=op, stroke_width=0).move_to(o + P(-L, 0)),
                 Circle(radius=r, fill_color=PELOUSE, fill_opacity=op, stroke_width=0).move_to(o + P(L, 0)))
    contour = VGroup(Line(o + P(-L, -r), o + P(L, -r)), Line(o + P(-L, r), o + P(L, r)),
                     Arc(radius=r, start_angle=PI / 2, angle=PI).move_arc_center_to(o + P(-L, 0)),
                     Arc(radius=r, start_angle=-PI / 2, angle=PI).move_arc_center_to(o + P(L, 0)))
    contour.set_stroke(couleur, sw)
    g = VGroup(pel, contour)
    g.pelouse, g.contour, g.L, g.r, g.o = pel, contour, L, r, o
    return g


class ShortPerimetreProbleme4e(Short4e):
    nom_voix = "4e-perimetre-probleme-short"
    fichier_marques = "4e_perimetre_probleme_short_marques.json"

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

        # ── 00 : cinq tours de 400 m ───────────────────────────────────────
        self.dire("00-accroche")
        self.au_mot("Sonia fait courir")
        tit = self.grand("Cinq tours", font_size=34, color=JAUNE_TITRE).move_to(P(0, 3.3))
        st = stade(2.0, 0.75, P(0, 0.3))
        self.play(FadeIn(tit), FadeIn(self.echelle_short()), FadeIn(st, scale=0.9), run_time=0.8)
        self.au_mot("cinq tours de piste")
        c5 = self.t("cinq tours", 28, TOUR_C).move_to(P(0, Y_ACCROCHE))
        self.play(Create(st.contour.copy().set_stroke(TOUR_C, 7)), FadeIn(c5), run_time=0.9)
        self.au_mot("400 mètres")
        c400 = self.t("un tour = 400 m", 28, BASE_C).move_to(P(0, -1.5))
        self.play(FadeIn(c400, scale=1.1), run_time=0.5)
        self.attendre_voix(marge=0.2)

        # ── 01 : le défi ────────────────────────────────────────────────────
        self.dire("01-defi")
        self.au_mot("combien de kilomètres")
        q = self.accroche("combien de kilomètres ?", fs=28, couleur=JAUNE_TITRE, y=-2.4)
        self.play(FadeIn(q), run_time=0.45)
        self.attendre_voix(marge=0.25)

        # ── 02 : la question-pause (3 s) — réponse B ───────────────────────
        self.ecran_question("02-question", "02b-reponse",
                            ["Cinq tours, ça fait…"],
                            ["20 km", "2 km", "200 m"], 1,
                            ["Cinq tours de piste :", "2 km."],
                            x_col=0.0)

        # ── 03 : le compteur affiche 2 kilomètres ──────────────────────────
        self.clear()
        self.margo_bas()
        self.dire("03-visuel")
        tit = self.grand("Le compteur", font_size=34, color=JAUNE_TITRE).move_to(P(0, 3.3))
        self.add(tit)
        st2 = stade(2.0, 0.75, P(0, 1.1))
        self.add(st2)
        self.au_mot("Cinq tours")
        tours = VGroup()
        for k in range(5):
            t = sans_audit(self.t(str(k + 1), 24, TOUR_C))
            t.move_to(P(-1.6 + k * 0.8, -0.6))
            tours.add(t)
        self.play(Create(st2.contour.copy().set_stroke(TOUR_C, 7)),
                  LaggedStart(*[FadeIn(t, scale=1.3) for t in tours], lag_ratio=0.25), run_time=1.4)
        self.au_mot("2 kilomètres")
        cadre = RoundedRectangle(width=2.6, height=0.95, corner_radius=0.14, stroke_color=VERT_OK,
                                 stroke_width=4, fill_color="#052e16", fill_opacity=0.7)
        cadre.move_to(P(0, -1.9))
        cpt = self.grand("2 km", font_size=42, color=VERT_OK).move_to(cadre.get_center())
        self.play(FadeIn(cadre), FadeIn(cpt, scale=1.2), run_time=0.7)
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
        st3 = stade(2.0, 0.75, P(0, 0.9))
        self.au_mot("combien de tours")
        self.play(FadeIn(st3, scale=0.9), Create(st3.contour.copy().set_stroke(TOUR_C, 7)),
                  run_time=0.9)
        qt = self.t("combien de tours ?", 28, TOUR_C).move_to(P(0, -0.6))
        self.play(FadeIn(qt), run_time=0.4)
        self.au_mot("10 kilomètres")
        c10 = self.t("pour 10 km", 32, BASE_C).move_to(P(0, -1.6))
        self.play(FadeIn(c10, scale=1.15), run_time=0.5)
        self.au_mot("Réponds en commentaire")
        self.play(FadeIn(self.commentaire(y=-2.9)), run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 05 ──────────────────────────────────────────────────────────────
        self.page_abonnement("05-abonne")
