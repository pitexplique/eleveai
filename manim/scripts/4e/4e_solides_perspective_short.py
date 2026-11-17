# 4e_solides_perspective_short.py
# EleveAI — Maths 4e — SHORT de l'épisode S3 « la perspective cavalière » (micro vision_representation).
# ⛔ EN MANIM, PAS EN DESSIN ANIMÉ (REGLES.md 09/11 ; Frédéric, 16/11), et avec un DÉFI.
# CEINTURE BLANCHE, 9:16. Le défi : les fuyantes d'un cube — parallèles, perpendiculaires,
# ou en vraie longueur ? Réponse A (parallèles entre elles, de même longueur, et réduites).
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/4e_solides_perspective_short.py ShortSolidesPerspective4e
# ⛔ Contrôler le COMPTEUR sur le MP4 (barre de 3 s entière, dans la carte, rien par-dessus).

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_short_commun import *  # noqa: E402,F403
from volume_4e_short_commun import Short4e, sans_audit, Y_ACCROCHE  # noqa: E402

ARETE_C = "#f8fafc"
FACE_C = "#38bdf8"
FUY_C = "#facc15"
CACHE_C = "#f472b6"

# la fuyante de la cavalière : 35°, coefficient 0,5 (le même que point3 du commun)
_DIR = np.array([math.cos(math.radians(35)), math.sin(math.radians(35)), 0.0])


def cube_fil(cote, fuyante, o=ORIGIN, sw=3, face=FACE_C, arete=ARETE_C, fuy=FUY_C, cache=CACHE_C,
             op=0.2, fuyantes=None):
    """Un cube en fil de fer : le carré de devant EN VRAIE GRANDEUR (o = son coin bas-gauche) et
    ses quatre fuyantes. `fuyante` = le vecteur d'une fuyante, le même pour les quatre ;
    `fuyantes` = quatre vecteurs différents, pour montrer un cube QUI SE TORD.
    Attributs : .carre .fuy (les 3 visibles) .arr (le fond) .caches (les 3 pointillées)"""
    c = cote
    A, B, C, D = o, o + P(c, 0), o + P(c, c), o + P(0, c)
    vs = list(fuyantes) if fuyantes is not None else [fuyante] * 4
    Ap, Bp, Cp, Dp = A + vs[0], B + vs[1], C + vs[2], D + vs[3]
    carre = Polygon(A, B, C, D, fill_color=face, fill_opacity=op, stroke_color=arete, stroke_width=sw + 1)
    fu = VGroup(Line(B, Bp), Line(C, Cp), Line(D, Dp)).set_stroke(fuy, sw)
    arr = VGroup(Line(Bp, Cp), Line(Cp, Dp)).set_stroke(arete, sw)
    ca = VGroup(DashedLine(A, Ap, dash_length=0.08), DashedLine(Ap, Bp, dash_length=0.08),
                DashedLine(Ap, Dp, dash_length=0.08)).set_stroke(cache, sw * 0.8)
    g = VGroup(carre, ca, fu, arr)
    g.carre, g.fuy, g.arr, g.caches = carre, fu, arr, ca
    return g


def rangee(cube, mot, y, fs=22, couleur=WHITE):
    """Un mini-cube à gauche et le mot à droite, sur une même ligne (x dans [−2,1 ; 2,1])."""
    cube.move_to(P(-1.35, y))
    t = Text(mot, font_size=fs, color=couleur, weight=BOLD)
    if t.width > 2.2:
        t.scale_to_fit_width(2.2)
    t.move_to(P(0.65, y))
    g = VGroup(cube, t)
    g.cube, g.mot = cube, t
    return g


class ShortSolidesPerspective4e(Short4e):
    nom_voix = "4e-solides-perspective-short"
    fichier_marques = "4e_solides_perspective_short_marques.json"

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

        # ── 00 : le carré bien droit, puis les fuyantes ─────────────────────
        self.dire("00-accroche")
        self.ouverture("Le cube qui penche", fs=32)
        cu = cube_fil(1.5, _DIR * 0.75, P(-1.1, -0.45))
        self.au_mot("un carré bien droit")
        d1 = self.accroche("un carré bien droit", fs=26, couleur=FACE_C, y=Y_ACCROCHE)
        self.play(Create(cu.carre), FadeIn(d1), run_time=0.7)
        self.au_mot("puis les fuyantes")
        d2 = self.t("puis les fuyantes", 26, FUY_C).move_to(P(0, -1.75))
        self.play(Create(cu.fuy), Create(cu.arr), FadeIn(cu.caches), FadeIn(d2), run_time=0.8)
        self.attendre_voix(marge=0.2)

        # ── 01 : le défi (trois façons de tracer les fuyantes) ──────────────
        self.dire("01-defi")
        self.play(FadeOut(cu), FadeOut(d1), FadeOut(d2), run_time=0.3)
        r1 = rangee(cube_fil(0.78, _DIR * 0.39, sw=2.5), "parallèles", 1.25, couleur=FUY_C)
        r2 = rangee(cube_fil(0.78, UP * 0.39, sw=2.5), "perpendiculaires", 0.0)
        r3 = rangee(cube_fil(0.78, _DIR * 0.78, sw=2.5), "vraie longueur", -1.3)
        self.au_mot("parallèles")
        self.play(FadeIn(r1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("perpendiculaires")
        self.play(FadeIn(r2, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("en vraie longueur")
        self.play(FadeIn(r3, shift=RIGHT * 0.2), run_time=0.5)
        self.attendre_voix(marge=0.25)

        # ── 02 : la question-pause (3 s) — réponse A ────────────────────────
        # ⛔ Une SEULE ligne de question, et aucun mot dont les 3 premières lettres se retrouvent
        #    dans un mot de la voix : « Les fuyantes » attendait le « les » de « paral-LÈS-…»
        #    (_cue cherche par sous-chaîne) et la carte A arrivait 0,9 s en retard.
        self.ecran_question("02-question", "02b-reponse",
                            ["Quelles fuyantes ?"],
                            ["parallèles entre elles", "perpendiculaires au carré",
                             "de la vraie longueur"], 0,
                            ["Toutes parallèles,", "de même longueur, réduites.",
                             "Sinon le cube se tord."],
                            x_col=0.0)

        # ── 03 : parallèles, il tient ; pas parallèles, il se tord ──────────
        self.clear()
        self.margo_bas()
        self.dire("03-visuel")
        self.au_mot("Parallèles")
        tit = self.grand("Parallèles", font_size=34, color=JAUNE_TITRE).move_to(P(0, 3.3))
        ok = cube_fil(1.25, _DIR * 0.62, P(-0.95, 0.85))
        self.play(FadeIn(tit), Create(ok), run_time=0.8)
        self.au_mot("le cube tient")
        t1 = self.t("le cube tient", 26, VERT_OK).move_to(P(0, 0.2))
        self.play(FadeIn(t1, scale=1.15), run_time=0.4)
        self.au_mot("Pas parallèles")
        tordu = cube_fil(1.25, _DIR * 0.62, P(-0.95, -1.95),
                         fuyantes=[_DIR * 0.62, np.array([0.25, 0.72, 0.0]),
                                   np.array([0.80, 0.18, 0.0]), np.array([0.12, 0.80, 0.0])])
        self.play(Create(tordu), run_time=0.8)
        self.au_mot("il se tord")
        t2 = self.t("il se tord", 26, ROUGE_ERREUR).move_to(P(0, -2.6))
        self.play(FadeIn(t2, scale=1.15), Wiggle(tordu, scale_value=1.05), run_time=0.7)
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
        cu2 = cube_fil(1.5, _DIR * 0.75, P(-1.1, -0.1))
        self.au_mot("dans un cube en perspective cavalière")
        self.play(Create(cu2.carre), Create(cu2.fuy), Create(cu2.arr), run_time=0.8)
        self.au_mot("combien d'arêtes sont en pointillés")
        self.play(Create(cu2.caches), run_time=0.6)
        cb = self.t("combien en pointillés ?", 26, CACHE_C).move_to(P(0, -1.65))
        self.play(FadeIn(cb), run_time=0.4)
        self.au_mot("Réponds en commentaire")
        self.play(FadeIn(self.commentaire(y=-2.85)), run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 05 ──────────────────────────────────────────────────────────────
        self.page_abonnement("05-abonne")
