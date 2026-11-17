# 4e_patron_pyramide_short.py
# EleveAI — Maths 4e — SHORT de l'épisode S4 « le patron d'une pyramide » (micro patron_pyramide).
# ⛔ EN MANIM, PAS EN DESSIN ANIMÉ (REGLES.md 09/11 ; Frédéric, 16/11), et avec un DÉFI.
# CEINTURE BLANCHE, 9:16. Le défi : trois patrons sur la table de Tiago, lequel se referme en
# pyramide à base carrée ? Réponse C (un carré et quatre triangles).
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/4e_patron_pyramide_short.py ShortPatronPyramide4e
# ⛔ Contrôler le COMPTEUR sur le MP4 (barre de 3 s entière, dans la carte, rien par-dessus).

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_4e_short_commun import *  # noqa: E402,F403
from volume_4e_short_commun import Short4e, sans_audit, Y_ACCROCHE  # noqa: E402
from volume_4e_commun import pyramide, patron_pyramide_carree, PYR_FACE, PYR_BORD  # noqa: E402


def _sym(pt, p1, p2):
    d = p2 - p1
    d = d / np.linalg.norm(d)
    v = pt - p1
    return p1 + 2 * float(v @ d) * d - v


def patron_tetra(cote, o=ORIGIN, tri_c=PYR_FACE, base_c=BASE_C, bord=PYR_BORD, sw=3):
    """Le patron du dé à quatre faces : un triangle au milieu, trois rabattus autour."""
    h = cote * math.sqrt(3) / 2
    # ⭐ Le triangle du milieu pointe vers le BAS : ses trois symétriques forment alors les trois
    #    coins d'un GRAND triangle partagé en quatre (sinon on obtient une étoile, pas un patron).
    A, B, S = o + P(-cote / 2, h / 3), o + P(cote / 2, h / 3), o + P(0, -2 * h / 3)
    base = Polygon(A, B, S, fill_color=base_c, fill_opacity=0.45, stroke_color=bord, stroke_width=sw)
    tris = VGroup(*[Polygon(p1, p2, _sym(p3, p1, p2), fill_color=tri_c, fill_opacity=0.85,
                            stroke_color=bord, stroke_width=sw)
                    for p1, p2, p3 in ((A, B, S), (B, S, A), (A, S, B))])
    g = VGroup(base, tris)
    g.base, g.triangles = base, tris
    return g


def patron_cinq_carres(c, o=ORIGIN, couleur=BASE_C, bord=PYR_BORD, sw=3):
    """Cinq carrés en croix : le leurre A (ça ferait une boîte, pas une pointe)."""
    g = VGroup(*[Square(side_length=c, fill_color=couleur, fill_opacity=0.5, stroke_color=bord,
                        stroke_width=sw).move_to(o + P(dx * c, dy * c))
                 for dx, dy in ((0, 0), (-1, 0), (1, 0), (0, 1), (0, -1))])
    return g


def rangee(lettre, patron, y, x_lettre=-1.6, x_patron=0.15):
    """La lettre dans son rond, et le patron à côté : l'élève relie la carte au dessin."""
    rond = Circle(radius=0.22, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=0)
    lt = Text(lettre, font_size=26, color=WHITE, weight=BOLD).move_to(rond)
    g = VGroup(sans_audit(VGroup(rond, lt)).move_to(P(x_lettre, y)), patron.move_to(P(x_patron, y)))
    g.patron = patron
    return g


class ShortPatronPyramide4e(Short4e):
    nom_voix = "4e-patron-pyramide-short"
    fichier_marques = "4e_patron_pyramide_short_marques.json"

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

        # ── 00 : la pyramide voulue, puis les trois patrons ─────────────────
        self.dire("00-accroche")
        self.ouverture("Trois patrons", fs=34)
        py = pyramide(1.5, 1.5, 0.62, P(-0.47, -0.55), sw=3)
        self.au_mot("une pyramide à base carrée")
        self.play(FadeIn(py, shift=UP * 0.2), run_time=0.6)
        self.au_mot("Trois patrons sont posés")
        a = rangee("A", patron_cinq_carres(0.34), 1.35)
        b = rangee("B", patron_tetra(0.62), 0.05)
        c = rangee("C", patron_pyramide_carree(0.42, 0.34, 1.0), -1.3)
        self.play(FadeOut(py), run_time=0.25)
        self.play(LaggedStart(FadeIn(a, shift=RIGHT * 0.2), FadeIn(b, shift=RIGHT * 0.2),
                              FadeIn(c, shift=RIGHT * 0.2), lag_ratio=0.25), run_time=1.0)
        self.attendre_voix(marge=0.2)

        # ── 01 : le défi ────────────────────────────────────────────────────
        self.dire("01-defi")
        self.au_mot("Lequel se referme vraiment")
        q = self.accroche("Lequel se referme ?", fs=28, couleur=JAUNE_TITRE, y=Y_ACCROCHE)
        self.play(FadeIn(q), run_time=0.45)
        self.attendre_voix(marge=0.25)

        # ── 02 : la question-pause (3 s) — réponse C ───────────────────────
        # ⭐ « un carré » s'écrit en toutes lettres : la voix DIT « un », et deux nombres dans une
        #    même carte (« 1 … 4 … ») feraient écrire le premier bien avant qu'il soit dit.
        self.ecran_question("02-question", "02b-reponse",
                            ["Lequel se referme ?"],
                            ["5 carrés", "4 triangles", ["un carré", "et 4 triangles"]], 2,
                            # ⛔ « 4 » seul dans son morceau : collé à « seuls », il s'écrivait
                            #    1,4 s après avoir été dit (AUDIT-TARD).
                            ["Un carré pour la base,", "quatre triangles pour les côtés.",
                             ["4", "seuls : base triangulaire."]],
                            x_col=0.0)

        # ── 03 : on plie, la pointe se referme ─────────────────────────────
        self.clear()
        self.margo_bas()
        self.dire("03-visuel")
        tit = self.grand("On plie", font_size=34, color=JAUNE_TITRE).move_to(P(0, 3.3))
        self.add(tit)
        pa = patron_pyramide_carree(0.95, 0.75, 1.0, P(0, 0.6))
        self.au_mot("On plie les quatre triangles")
        self.play(FadeIn(pa), run_time=0.5)
        self.play(Indicate(pa.triangles, color=PYR_FACE, scale_factor=1.08), run_time=0.6)
        py = pyramide(1.6, 1.7, 0.62, P(-0.5, -0.3), sw=3)
        self.au_mot("la pointe se referme")
        self.play(ReplacementTransform(pa, py), run_time=1.0)
        fin = self.t("la pointe se referme", 26, VERT_OK).move_to(P(0, -2.3))
        self.play(FadeIn(fin, scale=1.15), Flash(py.S, color=JAUNE_TITRE, line_length=0.18), run_time=0.5)
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
        self.au_mot("combien de triangles")
        cb = self.t("combien de triangles ?", 28, PYR_FACE).move_to(P(0, 2.3))
        self.play(FadeIn(cb), run_time=0.4)
        self.au_mot("dans le patron d'un dé à quatre faces")
        pt = patron_tetra(1.5, P(0, 0.2))
        self.play(FadeIn(pt, scale=0.9), run_time=0.8)
        self.au_mot("Réponds en commentaire")
        self.play(FadeIn(self.commentaire(y=-2.85)), run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 05 ──────────────────────────────────────────────────────────────
        self.page_abonnement("05-abonne")
