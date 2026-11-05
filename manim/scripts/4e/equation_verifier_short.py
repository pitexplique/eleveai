# equation_verifier_short.py
# EleveAI — Maths 4e — série ÉQUATIONS, épisode 06, le SHORT ceinture BLANCHE
# « Détecteur de mensonges » : EN HAUT le détecteur (aiguille + voyant rouge ou vert),
# EN BAS, au même instant, le calcul qui le fait basculer.
#   · 1 question-pause (3 s) : 3x = 0, donc x = 0 ;
#   · fin : x = 6 solution de 2x − 5 = 7 ? réponse en commentaire, fin standard.
# Micro : equation_verifier. Centres : espace, sciences (ceux de l'épisode).
#
# Voix : manim/voix/4e-equation-verifier-short.json (validée, débit −6) ;
# marques : equation_verifier_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/equation_verifier_short.py EquationVerifierShort
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/equation_verifier_short.py EquationVerifierShort -o eleveai-maths-4e-equation-verifier-short --media_dir manim/scripts/4e/media-eq-06-short
# Sortie : manim/sorties/4e/maths/equations/06-verifier/eleveai-maths-4e-equation-verifier-short.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from equation_commun import *  # noqa: E402,F403
from equation_verifier import _OutilsVerif, Voyant  # noqa: E402


class Detecteur(VGroup):
    """Le boîtier : un cadran à aiguille (vert à gauche, rouge à droite), un grand voyant."""

    def __init__(self, s=1.0, **kw):
        super().__init__(**kw)
        self.boite = RoundedRectangle(width=3.7, height=1.62, corner_radius=0.16, fill_color="#111827", fill_opacity=1,
                                      stroke_color="#64748b", stroke_width=3)
        c = P(-0.75, -0.5)
        self.arc_v = Arc(radius=1.08, start_angle=PI * 0.54, angle=PI * 0.4, arc_center=c, stroke_color=VERT_OK, stroke_width=11)
        self.arc_r = Arc(radius=1.08, start_angle=PI * 0.06, angle=PI * 0.4, arc_center=c, stroke_color=PIEGE, stroke_width=11)
        self.aig = Line(c, c + P(0, 0.98), color=WHITE, stroke_width=6)
        self.axe = Dot(c, radius=0.09, color=WHITE)
        self.voyant = Voyant(0.52, "?", 44).move_to(P(1.05, 0))
        self.add(self.boite, self.arc_v, self.arc_r, self.aig, self.axe, self.voyant)
        self.a = 0.0
        self.scale(s)

    def demasque(self):
        """Le « ? » du voyant devient un « ! » : le mensonge est démasqué."""
        n = T("!", 44, WHITE, audit=False, gras=True).move_to(self.voyant.rond)
        return ReplacementTransform(self.voyant.txt, n)

    def viser(self, a, run_time=0.3):
        """L'aiguille va à l'angle a (> 0 : vers le rouge, à droite)."""
        d = self.a - a
        self.a = a
        return Rotate(self.aig, d, about_point=self.axe.get_center(), run_time=run_time)

    def etiquettes(self):
        v = T("vrai", 18, VERT_OK, audit=False, gras=True).move_to(self.axe.get_center() + P(-0.64, 0.14))
        f = T("faux", 18, PIEGE, audit=False, gras=True).move_to(self.axe.get_center() + P(0.64, 0.14))
        return v, f


class EquationVerifierShort(_OutilsVerif, ShortEq):
    nom_voix = "4e-equation-verifier-short"
    fichier_marques = "equation_verifier_short_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "blanche"

    def ligne_eq(self, s, y, fs=30, couleur=WHITE, lettres=""):
        e = Eq(s, fs, couleur, lettres=lettres)
        if e.width > 3.9:
            e.scale_to_fit_width(3.9)
        return e.move_to(P(0, y))

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Détecteur de mensonges", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [badge, titre, margo]

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        det = Detecteur().move_to(P(0, 1.35))
        self.au("Détecteur", Write(titre), FadeIn(det, scale=0.9), rt=0.4)
        a0 = self.tx("Quelqu'un affirme :", 30, CIEL).move_to(P(0, 0.22))  # « ff », « fi » : Eq plante, T au mot
        self.au("Quelqu'un", FadeIn(a0, shift=UP * 0.1), rt=0.25)
        e1 = self.ligne_eq("5x = 8,", -0.42, 48, lettres="x")
        self.dire_eq(e1, "5 x égale 8,")
        e2 = self.ligne_eq("donc x = 3", -1.12, 48, lettres="x")
        self.dire_eq(e2, "donc x égale 3")
        q = self.ligne_eq("Vrai ou faux ?", -1.95, 42, JAUNE_TITRE)
        ev, ef = det.etiquettes()
        self.dire_eq(q, "Vrai ou faux ?", echelle=1.0, rt=0.13, avec=[det.voyant.orange(), FadeIn(ev), FadeIn(ef)])
        self.play(det.viser(-0.5, 0.22))
        self.play(det.viser(0.5, 0.26))
        self.play(det.viser(0.0, 0.18))
        self.attendre_voix(marge=0.1)

        # ── 01 : le test ──
        self.dire("01-test")
        l0 = self.ligne_eq("On remplace.", 0.22, 32, OPERATION)
        self.dire_eq(l0, "On remplace.", echelle=1.0, rt=0.12, avec=[FadeOut(VGroup(a0, e1, e2, q))])
        c1 = Eq("5 × 3 = 15", 46).move_to(P(0, -0.4))
        c1.atomes[2].set_color(OPERATION)
        self.dire_eq(c1, "5 fois 3, 15", avec=[det.viser(0.25, 0.2)])
        c2 = Eq("15 ≠ 8", 46).move_to(P(0, -1.14))
        c2.atomes[1].set_color(PIEGE)
        c2.atomes[0]._pas_audit = True  # le 15 vient d'être dit
        self.au("Ce n'est", FadeIn(c2.atomes[0]), FadeIn(c2.atomes[1], scale=1.5), rt=0.2)
        self.dire_eq(c2, "pas 8", sauf=[c2.atomes[0], c2.atomes[1]], avec=[det.viser(0.75, 0.3), det.voyant.rouge(), det.demasque()])
        v = self.verdict("Mensonge démasqué !", PIEGE, 32)
        v.scale_to_fit_width(3.95).move_to(P(0, -1.92))
        self.au("Mensonge", FadeIn(v, scale=1.4), rt=0.25)
        self.insister(det.voyant, 1.25, 0.14)
        f = self.ligne_eq("Dix secondes, et on sait.", -2.64, 30)
        self.dire_eq(f, "Dix secondes, et on sait.", echelle=1.0, rt=0.12)
        self.attendre_voix(marge=0.4)
        self.vider(garder)

        # ── 01q : la question-pause (3 s) ──
        def avant(sc):
            sc.eq_dans_q(0, "3x = 0, donc x = 0.", "3 x égale 0, donc x égale 0.", fs=36)
            sc.eq_dans_q(0, "Vrai ou faux ?", "Vrai ou faux ?", lettres="", fs=36)

        def apres(sc):
            sc.ph_eq(0, "Réponse A : vrai.", "Réponse A : vrai.", premier=True)
            sc.ph_eq(1, "3 × 0 = 0.", "3 fois 0, 0.")
            sc.ph_eq(2, "Zéro est une vraie solution.", "Zéro est une vraie solution.")
            sc.rep_fini()

        self.question_pause("01q-question", "01r-reponse", ["3x = 0, donc x = 0.", "Vrai ou faux ?"],
                            [Eq("vrai", 28, lettres=""), Eq("faux", 28, lettres=""), Eq("impossible à savoir", 28, lettres="")], 0,
                            ["Réponse A : vrai.", "3 × 0 = 0.", "Zéro est une vraie solution."],
                            avant_q=avant, autres_r=apres)
        self.vider(garder)

        # ── 02 : la question en commentaire ──
        self.dire("02-question")
        det2 = Detecteur(0.72).move_to(P(0, 1.6))
        l1 = self.tx("Quelqu'un affirme que", 28, CIEL).move_to(P(0, 0.72))
        self.au("Quelqu'un", FadeIn(l1, shift=UP * 0.1), FadeIn(det2), det2.voyant.orange(), rt=0.25)
        e6 = self.ligne_eq("x = 6", 0.2, 44, lettres="x")
        self.dire_eq(e6, "x égale 6")
        l2 = self.ligne_eq("est solution de", -0.32, 28, CIEL)
        self.dire_eq(l2, "est solution de", echelle=1.0, rt=0.12)
        e7 = Eq("2x − 5 = 7", 46).move_to(P(0, -0.88))
        self.dire_eq(e7, "2 x moins 5 égale 7")
        self.play(e7.egal.animate.set_color(EGAL), run_time=0.08)
        q2 = self.ligne_eq("Vrai ou faux ?", -1.55, 38, JAUNE_TITRE)
        self.dire_eq(q2, "Vrai ou faux ?", echelle=1.0, rt=0.13)
        self.appel_commentaire(-2.25)

        # ── 03 : la fin standard ──
        self.fin_short("03-abonne", [m for m in self.mobjects if m is not margo])
