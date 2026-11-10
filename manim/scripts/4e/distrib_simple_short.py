# distrib_simple_short.py
# EleveAI — Maths 4e — série DISTRIBUTIVITÉ, épisode 01, le SHORT ceinture JAUNE
# « Le calcul éclair » : 7 × 13 de tête en 5 secondes. Une grille de 7 rangées de 13 points
# se coupe en 10 (bleu) et 3 (orange) : 70 + 21 = 91, puis 7(10 + 3) = 7 × 10 + 7 × 3.
#   · 1 question-pause (3 s) : 7(x + 3), bonne réponse A (7x + 21) ;
#   · fin : 8 × 12 de tête, réponse en commentaire, fin du 05/11.
# Micro : litteral_distributivite_simple.
# Voix : manim/voix/4e-distrib-simple-short.json (validée le 10/11, débit −6) ;
# marques : distrib_simple_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/distrib_simple_short.py DistribSimpleShort4e
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/distrib_simple_short.py DistribSimpleShort4e -o eleveai-maths-4e-distrib-simple-short --media_dir manim/scripts/4e/media-dist-01-short
# Sortie : manim/sorties/4e/maths/distributivite/01-simple/eleveai-maths-4e-distrib-simple-short.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from equation_commun import *  # noqa: E402,F403
from equation_defi import E, _OutilsDefi  # noqa: E402
from equation_probleme import _OutilsProbleme  # noqa: E402

DIX = BLEU_CALCUL
TROIS = OPERATION
GRIS = "#cbd5e1"


def grille(rangs=7, cols=13, pas=0.24, r=0.065):
    """7 rangées de 13 points ; .points[c] = la colonne c."""
    g = VGroup()
    g.cols = []
    for c in range(cols):
        col = VGroup(*[Dot(P((c - (cols - 1) / 2) * pas, ((rangs - 1) / 2 - k) * pas), radius=r, color=GRIS)
                       for k in range(rangs)])
        g.cols.append(col)
        g.add(col)
    return g


def horloge(rayon=0.38):
    """Un petit chrono : un cadran et son aiguille (renvoyés à part)."""
    cadran = Circle(radius=rayon, color=JAUNE_TITRE, stroke_width=4)
    bouton = Rectangle(width=0.14, height=0.1, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_width=0)
    bouton.next_to(cadran, UP, buff=0.02)
    aiguille = Line(ORIGIN, UP * rayon * 0.78, color=WHITE, stroke_width=5)
    return VGroup(cadran, bouton), aiguille


class DistribSimpleShort4e(_OutilsProbleme, _OutilsDefi, ShortEq):
    nom_voix = "4e-distrib-simple-short"
    fichier_marques = "distrib_simple_short_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "jaune"

    def l(self, s, y, fs=32, c=WHITE, lettres=""):
        e = E(s, fs, c, lettres=lettres)
        if e.width > 3.95:
            e.scale_to_fit_width(3.95)
        return e.move_to(P(0, y))

    def _disposer_q(self, question, choix, phrase):
        """Trois lignes de réponse : les cartes restent à 85 %, la réponse ne descend pas sur Ti-Margo."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        cartes.next_to(q, DOWN, buff=0.16).set_x(0)
        pause.next_to(cartes, DOWN, buff=0.14).set_x(0)
        ph.arrange(DOWN, buff=0.1).next_to(cartes, DOWN, buff=0.12).set_x(0)
        return tete, q, cartes, pause, rebours, ph

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Le calcul éclair", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [badge, titre, margo]

        # ── 00 : l'accroche : 7 × 13 en 5 secondes ──
        self.dire("00-accroche")
        e0 = self.l("7 × 13", 1.45, 80)
        self.dire_eq(e0, "7 fois 13", avec=[FadeIn(titre)])
        l1 = self.l("de tête,", 0.35, 42, CIEL)
        self.dit(l1, "de tête,")
        l2 = self.l("en 5 secondes.", -0.2, 42, CIEL)
        cadran, aig = horloge()
        VGroup(cadran, aig).move_to(P(0, -1.08))
        aig.shift(cadran[0].get_center() - aig.get_start())
        self.dit(l2, "en 5 secondes.")
        self.play(FadeIn(cadran, scale=0.6), FadeIn(aig), run_time=0.25)
        self.play(Rotate(aig, -TAU, about_point=cadran[0].get_center()), run_time=1.0, rate_func=linear)
        l3 = self.l("Tu paries que", -1.85, 34, JAUNE_TITRE)
        self.dit(l3, "Tu paries que")
        l4 = self.l("tu n'y arrives pas ?", -2.38, 34, JAUNE_TITRE)
        self.dit(l4, "tu n'y arrives pas ?")
        self.insister(l4.atomes[-2], 1.3, 0.15)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 01 : le secret : la grille se coupe en 10 et 3 ──
        self.dire("01-secret")
        s0 = self.l("Le secret :", 2.05, 38, CIEL)
        g = grille().move_to(P(0.12, 0.3))
        sept = T("7", 34, CIEL, audit=False).next_to(g, LEFT, buff=0.16)
        self.dit(s0, "Le secret :", avec=[LaggedStart(*[FadeIn(c) for c in g.cols], lag_ratio=0.08), FadeIn(sept)])
        e1 = self.l("13 = 10 + 3", 1.45, 46)
        e1.atomes[2].set_color(DIX)
        e1.atomes[4].set_color(TROIS)
        self.dire_eq(e1, "13, c'est 10 plus 3")
        bleu = VGroup(*g.cols[:10])
        orange = VGroup(*g.cols[10:])
        self.play(bleu.animate.set_color(DIX).shift(LEFT * 0.11), orange.animate.set_color(TROIS).shift(RIGHT * 0.11),
                  run_time=0.4)
        a = self.l("7 × 10 = 70", -0.85, 40)
        for k in (2, 4):
            a.atomes[k].set_color(DIX)
        self.dire_eq(a, "7 fois 10 : 70")
        self.play(Circumscribe(bleu, color=DIX, buff=0.08), run_time=0.5)
        b = self.l("7 × 3 = 21", -1.42, 40)
        for k in (2, 4):
            b.atomes[k].set_color(TROIS)
        self.dire_eq(b, "7 fois 3 : 21")
        self.play(Circumscribe(orange, color=TROIS, buff=0.08), run_time=0.5)
        c = self.l("70 + 21 = 91", -2.05, 38, VERT_OK)
        self.dire_eq(c, "70 plus 21 : 91")
        cc = self.cadre_ok(c, 0.12)
        self.play(Create(cc), run_time=0.15)
        self.insister(c.atomes[-1], 1.3, 0.15)
        # la règle : on retire la grille, la phrase s'écrit en grand
        self.play(FadeOut(VGroup(g, sept, e1, a, b)), run_time=0.3)
        d1 = self.l("7(10 + 3)", 0.45, 56)
        d1.atomes[2].set_color(DIX)
        d1.atomes[4].set_color(TROIS)
        self.dire_eq(d1, "7 fois, entre parenthèses, 10 plus 3,")
        d2 = self.l("= 7 × 10 + 7 × 3", -0.45, 40)
        d2.atomes[3].set_color(DIX)
        d2.atomes[7].set_color(TROIS)
        f1 = CurvedArrow(d1.atomes[0].get_top() + UP * 0.06, d1.atomes[2].get_top() + UP * 0.06, angle=-PI / 2.2,
                         color=JAUNE_TITRE, stroke_width=4, tip_length=0.14)
        f2 = CurvedArrow(d1.atomes[0].get_top() + UP * 0.06, d1.atomes[4].get_top() + UP * 0.06, angle=-PI / 2.4,
                         color=JAUNE_TITRE, stroke_width=4, tip_length=0.14)
        self.dire_eq(d2, "égale 7 fois 10, plus 7 fois 3", avec=[Create(f1), Create(f2)])
        self.play(Create(self.cadre_ok(VGroup(d1, d2), 0.12).set_color(CIEL)), run_time=0.2)
        self.attendre_voix(marge=1.6)
        self.vider(garder)

        # ── 01q : la question-pause (3 s) ──
        def avant(sc):
            sc.eq_dans_q(0, "Et avec une lettre ?", "Et avec une lettre ?", lettres="", fs=34)
            sc.eq_dans_q(0, "7(x + 3) ?", "7 fois, entre parenthèses, x plus 3 ?", lettres="x", fs=34, couleur=JAUNE_TITRE)

        def apres(sc):
            sc.ph_eq(0, "Réponse A : 7x + 21", "Réponse A : 7 x plus 21", lettres="x", premier=True)
            sc.ph_eq(1, "Le 7 multiplie x,", "Le 7 multiplie x,", lettres="x")
            sc.ph_eq(2, "et il multiplie aussi le 3.", "et il multiplie aussi le 3.")
            sc.rep_fini()

        self.question_pause("01q-question", "01r-reponse", ["Et avec une lettre ?", "7(x + 3) ?"],
                            [Eq("7x + 21", 34), Eq("7x + 3", 34), Eq("x + 21", 34)], 0,
                            ["Réponse A : 7x + 21", "Le 7 multiplie x,", "et il multiplie aussi le 3."],
                            avant_q=avant, autres_r=apres)
        self.vider(garder)

        # ── 02 : la question en commentaire ──
        self.dire("02-question")
        t = self.l("À toi.", 1.75, 46, CIEL)
        self.dit(t, "À toi.")
        q = self.l("Calcule 8 × 12", 0.8, 44)
        self.dire_eq(q, "Calcule 8 fois 12")
        self.insister(q.atomes[-1], 1.25, 0.15)
        u = self.l("de tête, avec le secret.", -0.05, 36)
        self.dit(u, "de tête, avec le secret.")
        cadran, aig = horloge(0.32)
        VGroup(cadran, aig).move_to(P(0, -0.95))
        aig.shift(cadran[0].get_center() - aig.get_start())
        self.play(FadeIn(cadran, scale=0.6), FadeIn(aig), run_time=0.2)
        self.play(Rotate(aig, -TAU, about_point=cadran[0].get_center()), run_time=0.8, rate_func=linear)
        self.appel_commentaire(-2.0)

        # ── 03 : la fin du 05/11 ──
        self.fin_05_11("03-abonne", [x for x in self.mobjects if x is not margo])

    def fin_05_11(self, voix, a_effacer):
        """La fin du 05/11 : ce que dit la voix est écrit, « Un pouce · La cloche » en plus."""
        self.dire(voix)
        entraine = self.tx("Entraîne-toi sur", 40, JAUNE_TITRE).move_to(P(0, 2.5))
        site = self.tx("eleveai.fr", 54, BLEU_CALCUL).move_to(P(0, 1.55))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.2, stroke_width=3)
        abonne = self.tx("Abonne-toi !", 42, VERT_OK).move_to(P(0, 0.1))
        poignee = self.tx("@eleveai974", 44, VERT_OK, audit=False).move_to(P(0, -0.72))
        g1 = self.tx("Un pouce", 26)
        p = self.tx("·", 26, "#94a3b8")
        g2 = self.tx("La cloche", 26)
        VGroup(g1, p, g2).arrange(RIGHT, buff=0.16).move_to(P(0, -1.95))
        g2.align_to(g1, UP)
        self.play(FadeOut(Group(*a_effacer)), run_time=0.25)
        self.play(Write(entraine), run_time=0.35)
        self.au("éleveai", GrowFromCenter(site), Create(cadre), rt=0.4)
        self.au("pouce", FadeIn(g1, scale=1.3), rt=0.22)
        self.au("abonne-toi", FadeIn(abonne, shift=UP * 0.15), GrowFromCenter(poignee), rt=0.3)
        self.au("cloche", FadeIn(p), FadeIn(g2, scale=1.3), rt=0.22)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.25), run_time=0.45)
        self.attendre_voix(marge=1.0)
