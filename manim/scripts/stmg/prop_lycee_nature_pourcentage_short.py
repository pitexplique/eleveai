# prop_lycee_nature_pourcentage_short.py
# EleveAI — Maths STMG — short jumeau de l'épisode 05 « Proportion ou
# évolution ? » (micro auto_evo_nature_pourcentage, notion auto_evo_taux).
# CEINTURE BLANCHE (règle du short blanc, REGLES.md) : on VOIT l'écart d'un
# point. Il SURPREND : « + 1 point, mais + 10 % ! »
#   · EN HAUT, l'image : l'ordinateur et le chariot du commerce en ligne ;
#   · EN BAS, au même instant, deux barres côte à côte (le commerce de détail
#     = 100 %, la part du commerce en ligne en bleu) : 10 % en 2023, 11 % en
#     2024 ; la loupe GROSSIT l'écart d'un point (ambre) ; code couleur
#     partagé : bleu = la part de départ, ambre = le point gagné ;
#   · 1 question-pause (3 s) : 20 % → 30 % = 10 points, soit + 50 %
#     (leurres : 10 %, 30 %) ;
#   · fin : 20 % → 25 % : combien de points ? de combien de pour cent ?
#     (5 points, + 25 %) en commentaire.
# Centre d'intérêt : argent-budget.
# Source : Fevad, bilan 2024 : part du e-commerce dans le commerce de détail
# 11 % en 2024 (10 % en 2023). Calcul : (11 − 10) ÷ 10 = 0,1 = + 10 %.
#
# Voix : manim/voix/stmg-prop-nature-pourcentage-short.json (validée par
# Frédéric le 02/11, débit −10) ; WAV : public/sons/stmg-prop-nature-pourcentage-short/ ;
# marques : manim/scripts/stmg/prop_lycee_nature_pourcentage_short_marques.json.
# Outils (non modifiés) : prop_commun.py (ShortProp), canvas_proportion.py.
# Ajouté ICI : ordinateur(), chariot(), BarreV (barre verticale de 100 %).
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/stmg/prop_lycee_nature_pourcentage_short.py PropLyceeNaturePourcentageShort
# PYTHONIOENCODING=utf-8 python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/prop_lycee_nature_pourcentage_short.py PropLyceeNaturePourcentageShort -o eleveai-maths-stmg-prop-nature-pourcentage-short --media_dir manim/scripts/stmg/media-prop-lycee-nature-short
# Sortie : manim/sorties/stmg/maths/proportionnalite/05-nature-pourcentage/eleveai-maths-stmg-prop-nature-pourcentage-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))
sys.path.insert(0, str(Path(__file__).resolve().parent))  # le dossier du script EN TÊTE

from prop_commun import *  # noqa: E402,F403

PART = "#38bdf8"       # la part du commerce en ligne (bleu)
GAIN = "#f59e0b"       # le point gagné (ambre)
EVO_C = "#22c55e"      # le pourcentage d'évolution (vert)
TOUT = "#334155"       # le reste du commerce de détail
PISTE = "#1e293b"


def pas_audit(m):
    for f in m.get_family():
        f._pas_audit = True
        f.sans_synchro = True
    return m


def ordinateur(s=1.0):
    """Un ordinateur portable ouvert : une boutique en ligne à l'écran."""
    ecran = RoundedRectangle(width=1.5, height=0.95, corner_radius=0.06, fill_color="#0b1220", fill_opacity=1,
                             stroke_color="#94a3b8", stroke_width=3).move_to(P(0, 0.5))
    cases = VGroup(*[RoundedRectangle(width=0.38, height=0.3, corner_radius=0.04, fill_color=c, fill_opacity=1,
                                      stroke_width=0).move_to(P(x, y))
                     for x, y, c in ((-0.45, 0.68, PART), (0, 0.68, "#f472b6"), (0.45, 0.68, "#a78bfa"),
                                     (-0.45, 0.3, "#34d399"), (0, 0.3, PART), (0.45, 0.3, "#f472b6"))])
    clavier = Polygon(P(-0.85, 0.0), P(0.85, 0.0), P(1.0, -0.18), P(-1.0, -0.18), fill_color="#94a3b8",
                      fill_opacity=1, stroke_width=0)
    return VGroup(ecran, cases, clavier).scale(s)


def chariot(s=1.0, couleur=PART):
    """Un chariot de courses : panier, poignée, deux roues."""
    panier = Polygon(P(-0.45, 0.35), P(0.5, 0.35), P(0.38, -0.15), P(-0.35, -0.15), fill_color=couleur,
                     fill_opacity=0.25, stroke_color=couleur, stroke_width=5)
    poignee = Line(P(-0.45, 0.35), P(-0.62, 0.6), color=couleur, stroke_width=6)
    roues = VGroup(*[Circle(radius=0.08, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(P(x, -0.32))
                     for x in (-0.25, 0.28)])
    return VGroup(panier, poignee, roues).scale(s)


class BarreV(VGroup):
    """Une barre VERTICALE de 100 % (le commerce de détail) ; .part(k, depuis)
    → le rectangle de k (0 à 1) de la hauteur, depuis le bas ; rien n'est ajouté."""

    def __init__(self, x, bas=-2.3, h=2.0, l=0.95, **kw):
        super().__init__(**kw)
        self.h, self.l, self.bas = h, l, bas
        self.cadre = Rectangle(width=l, height=h, fill_color=TOUT, fill_opacity=1, stroke_color=WHITE,
                               stroke_width=3).move_to(P(x, bas + h / 2))
        self.add(self.cadre)

    def part(self, k, couleur=PART, depuis=0.0):
        r = Rectangle(width=self.l - 0.06, height=max(self.h * (k - depuis), 1e-3), fill_color=couleur,
                      fill_opacity=1, stroke_width=0)
        return r.move_to(P(self.cadre.get_x(), self.bas + self.h * (depuis + k) / 2))


class PropLyceeNaturePourcentageShort(ShortProp):
    nom_voix = "stmg-prop-nature-pourcentage-short"
    fichier_marques = "prop_lycee_nature_pourcentage_short_marques.json"
    ceinture = "blanche"

    def mini_barre(self, k, y=-2.72, largeur=3.6):
        """Une barre horizontale de 100 % (pendant la question), remplie à k."""
        piste = RoundedRectangle(width=largeur, height=0.36, corner_radius=0.06, fill_color=TOUT, fill_opacity=1,
                                 stroke_color=WHITE, stroke_width=2).move_to(P(0, y))
        li = largeur - 0.08
        r = Rectangle(width=li * k, height=0.28, stroke_width=0, fill_color=PART, fill_opacity=1)
        r.move_to(piste).align_to(P(piste.get_left()[0] + 0.04, 0), LEFT)
        return piste, r, li

    def choix_figes(self, textes):
        """Les choix : audités à leur entrée par la synchro (ils attendent leur
        mot), plus par l'audit quand la carte juste grandit à la réponse."""
        out = []
        for s in textes:
            t = self.t(s, 28 if len(s) > 8 else 30)
            t._pas_audit = True
            out.append(t)
        return out

    def _rep_q(self, sc):
        piste, r, li = self.mb
        g = Rectangle(width=li * 0.1, height=0.28, stroke_width=0, fill_color=GAIN, fill_opacity=1)
        g.next_to(r, RIGHT, buff=0)
        l0 = sc.ligne_rep(0, ["30 −", "20", "= 10 points."])
        sc.au_mot("30 moins")
        sc.play(FadeIn(l0[0], shift=UP * 0.12), run_time=0.3)
        sc.au_mot("moins 20")
        sc.play(FadeIn(l0[1], shift=UP * 0.12), run_time=0.3)
        sc.au_mot("égale 10")
        sc.play(FadeIn(l0[2], scale=1.3), GrowFromEdge(g, LEFT), run_time=0.4)
        l1 = sc.ligne_rep(1, ["10 ÷ 20", "= 0,5 :", "+ 50 %."])
        sc.au_mot("10 divisé")
        sc.play(FadeIn(l1[0], shift=UP * 0.12), Indicate(r, color=WHITE), run_time=0.35)
        sc.au_mot("égale 0,5")
        sc.play(FadeIn(l1[1], shift=UP * 0.12), run_time=0.3)
        sc.au_mot("plus 50")
        sc.play(FadeIn(l1[2], scale=1.3), Indicate(g, color=GAIN, scale_factor=1.4), run_time=0.4)
        sc.rep_fini()

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Points ou pour cent ?", self.ceinture)
        titre.sans_synchro = True  # le titre de la vidéo : posé d'un bloc
        pas_audit(titre)
        self.add(badge)
        garder = [margo, titre, badge]
        ordi = ordinateur(0.75).move_to(P(-0.9, 1.75))
        ch = chariot(0.7).move_to(P(1.05, 1.65))
        b1, b2 = BarreV(-1.3), BarreV(0.0)
        a1 = self.t("2023", 28, WHITE).next_to(b1.cadre, DOWN, buff=0.1)
        a2 = self.t("2024", 28, WHITE).next_to(b2.cadre, DOWN, buff=0.1)
        tout = pas_audit(self.t("le tout : commerce de détail", 16, GREY_B)).next_to(VGroup(b1, b2), UP, buff=0.1).set_x(-0.3)
        p1, p2 = b1.part(0.10), b2.part(0.10)
        g2 = b2.part(0.11, GAIN, depuis=0.10)
        t1 = Text("10 %", font_size=24, color=PART, weight=BOLD).next_to(p1, UP, buff=0.12)
        t2 = Text("11 %", font_size=24, color=PART, weight=BOLD).next_to(p2, UP, buff=0.12)
        src = pas_audit(Text("Source : Fevad, 2024", font_size=10, color=GREY_B)).move_to(P(1.15, -2.75))

        # ── 00 : l'accroche : 10 % en 2023, 11 % en 2024 : + 1 % ? ──
        self.dire("00-accroche")
        self.au_mot("En 2023")
        self.play(Write(titre), FadeIn(b1, shift=UP * 0.2), FadeIn(a1), run_time=0.5)
        self.au_mot("le commerce en ligne")
        self.play(FadeIn(ordi, shift=DOWN * 0.2), FadeIn(ch, shift=LEFT * 0.3), run_time=0.5)
        self.au_mot("10 %")
        self.play(GrowFromEdge(p1, DOWN), FadeIn(t1, scale=1.3), run_time=0.4)
        self.au_mot("commerce de détail")
        self.play(FadeIn(tout), Indicate(b1.cadre, color=WHITE, scale_factor=1.04), FadeIn(src), run_time=0.5)
        self.au_mot("En 2024")
        self.play(FadeIn(b2, shift=UP * 0.2), FadeIn(a2), FadeIn(p2), run_time=0.45)
        self.au_mot("11 %")
        self.play(GrowFromEdge(g2, DOWN), FadeIn(t2, scale=1.3), run_time=0.45)
        q = self.ligne([("+ 1 %", AMBRE), ("?", AMBRE)], 44).move_to(P(-0.55, 0.75))
        self.au_mot("Il a augmenté")
        self.play(FadeIn(q, scale=1.2), run_time=0.4)
        self.insister(q, 1.15)
        self.attendre_voix(marge=0.2)

        # ── 01 : non : + 1 point, et 1 ÷ 10 = 0,1 : + 10 % ; la loupe ──
        self.dire("01-image")
        x = Cross(q, stroke_color=ROUGE_ERREUR, stroke_width=7)
        non = self.t("Non !", 34, ROUGE_ERREUR).move_to(P(1.3, 0.75))
        self.au_mot("Non")
        self.play(Create(x), FadeIn(non, scale=1.3), run_time=0.4)
        self.play(FadeOut(VGroup(q, x, non)), FadeOut(VGroup(ordi, ch)), run_time=0.35)
        l1 = self.ligne([("De 10 % à 11 % :", WHITE), ("+ 1 point", GAIN)], 30).move_to(P(0, 1.9))
        self.borne(l1)
        self.au_mot("De 10")
        self.play(FadeIn(l1[0], shift=RIGHT * 0.12), run_time=0.35)
        petit = Circle(radius=0.22, color=GAIN, stroke_width=4).move_to(g2)
        loupe = Circle(radius=0.62, color=GAIN, stroke_width=5, fill_color=PISTE, fill_opacity=1).move_to(P(1.3, -1.1))
        bleu = Rectangle(width=0.9, height=0.45, fill_color=PART, fill_opacity=1, stroke_width=0)
        bleu.move_to(loupe.get_center() + DOWN * 0.3)
        ambre = Rectangle(width=0.9, height=0.4, fill_color=GAIN, fill_opacity=1, stroke_width=0)
        ambre.next_to(bleu, UP, buff=0)
        lien = Line(petit.get_right(), loupe.get_left(), color=GAIN, stroke_width=3)
        tp = Text("+ 1 point", font_size=20, color=GAIN, weight=BOLD).next_to(loupe, DOWN, buff=0.1)
        self.au_mot("1 point")
        self.play(FadeIn(l1[1], scale=1.3), Create(petit), Create(lien), GrowFromCenter(loupe), FadeIn(bleu),
                  GrowFromEdge(ambre, DOWN), FadeIn(tp, scale=1.3), run_time=0.5)
        l2 = self.ligne([("1 ÷ 10", WHITE), ("= 0,1", WHITE)], 34).move_to(P(0, 1.25))
        self.au_mot("Et 1")
        self.play(FadeIn(l2[0], shift=RIGHT * 0.12), Indicate(p2, color=WHITE), run_time=0.35)
        self.au_mot("égale 0,1")
        self.play(FadeIn(l2[1], shift=RIGHT * 0.12), run_time=0.3)
        l3 = self.ligne([("+ 10 %", EVO_C)], 48).move_to(P(0, 0.55))
        cad = SurroundingRectangle(l3, color=EVO_C, buff=0.12, corner_radius=0.1)
        self.au_mot("augmenté de 10")
        self.play(FadeIn(l3, scale=1.3), Create(cad), run_time=0.45)
        self.insister(VGroup(l3, cad), 1.15)
        self.attendre_voix(marge=0.3)
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.4)

        # ── 02 : la question-pause (3 s) : 20 % → 30 % ──
        self.mb = piste, r, li = self.mini_barre(0.2, y=-2.98, largeur=1.6)
        piste.set_x(-1.25)
        r.align_to(P(piste.get_left()[0] + 0.04, 0), LEFT)

        def avant(sc):
            sc.play(FadeIn(piste), GrowFromEdge(r, LEFT), run_time=0.3)

        self.question_pause("02-question", "02b-reponse", ["Une part passe de 20 % à 30 %.",
                                                           "Elle a augmenté de :"],
                            self.choix_figes(["10 %", "10 points, soit 50 %", "30 %"]), 1,
                            ["30 − 20 = 10 points.", "10 ÷ 20 = 0,5 : + 50 %."], mot_q="Une part",
                            avant_q=avant, autres_r=self._rep_q)
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.4)

        # ── 03 : la question en commentaire : 20 % → 25 % ──
        self.dire("03-commentaire")
        l1 = self.ligne([("Une part :", WHITE), ("20 %", PART), ("→ 25 %", GAIN)], 36).move_to(P(0, 1.75))
        self.borne(l1)
        self.au_mot("À toi")
        self.play(FadeIn(l1[0], shift=RIGHT * 0.12), run_time=0.3)
        h1, r1, li = self.mini_barre(0.2, y=1.0)
        h2, r2, _ = self.mini_barre(0.2, y=0.45)
        g = Rectangle(width=li * 0.05, height=0.28, stroke_width=0, fill_color=GAIN, fill_opacity=1).next_to(r2, RIGHT,
                                                                                                         buff=0)
        self.au_mot("de 20")
        self.play(FadeIn(l1[1], scale=1.2), FadeIn(h1), GrowFromEdge(r1, LEFT), FadeIn(h2), FadeIn(r2), run_time=0.4)
        self.au_mot("à 25")
        self.play(FadeIn(l1[2], scale=1.2), GrowFromEdge(g, LEFT), run_time=0.4)
        q1 = self.ligne([("?", AMBRE), ("points", GAIN)], 44).move_to(P(0, -0.35))
        self.au_mot("Combien de points")
        self.play(FadeIn(q1, scale=1.2), run_time=0.4)
        q2 = self.ligne([("+ ?", AMBRE), ("%", EVO_C)], 44).move_to(P(0, -1.15))
        self.au_mot("Et de combien")
        self.play(FadeIn(q2, scale=1.2), run_time=0.4)
        self.insister(VGroup(q1, q2), 1.12)
        self.appel_commentaire(y=-2.1)
