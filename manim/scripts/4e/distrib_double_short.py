# distrib_double_short.py
# EleveAI — Maths 4e — série DISTRIBUTIVITÉ, épisode 02, le SHORT ceinture ORANGE
# « Les 4 morceaux » : l'aire d'un potager de 12 m sur 13 m de tête. Le potager, vu de dessus,
# se coupe en 4 : 10 × 10 = 100, 10 × 3 = 30, 2 × 10 = 20, 2 × 3 = 6, en tout 156.
#   · 1 question-pause (3 s) : (x + 1)(x + 3), bonne réponse C (x² + 4x + 3) ;
#   · fin : 11 × 14 de tête, réponse en commentaire, fin du 05/11.
# Micro : litteral_distributivite_double.
# Voix : manim/voix/4e-distrib-double-short.json ; marques : distrib_double_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/distrib_double_short.py DistribDoubleShort4e
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/distrib_double_short.py DistribDoubleShort4e -o eleveai-maths-4e-distrib-double-short --media_dir manim/scripts/4e/media-dist-02-short
# Sortie : manim/sorties/4e/maths/distributivite/02-double/eleveai-maths-4e-distrib-double-short.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from equation_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402
from equation_defi import E, _OutilsDefi  # noqa: E402
from equation_probleme import _OutilsProbleme  # noqa: E402

PAROLE["²"] = "carré"  # « x au carré » : le ² se pose sur « carré »

DIX = BLEU_CALCUL
PETIT = OPERATION
TERRE = "#78350f"
PLANTE = "#4ade80"
COUL = {"aa": "#0369a1", "ab": "#7c3aed", "ba": "#0f766e", "bb": "#c2410c"}


class Potager(VGroup):
    """Le potager vu de dessus : (10 + 2) rangs de haut, (10 + 3) de large, découpé en 4.
    .p["aa"] (10 × 10), .p["ab"] (10 × 3, à droite), .p["ba"] (2 × 10, en bas), .p["bb"] (2 × 3)."""

    def __init__(self, u=0.19, centre=ORIGIN, **kw):
        super().__init__(**kw)
        W, H = 13 * u, 12 * u
        tl = P(-W / 2, H / 2)
        self.u = u
        self.terre = Rectangle(width=W, height=H, fill_color=TERRE, fill_opacity=1, stroke_color="#a16207", stroke_width=4)
        self.plantes = VGroup(*[Dot(tl + P((c + 0.5) * u, -(r + 0.5) * u), radius=u * 0.28, color=PLANTE)
                                for r in range(12) for c in range(13)])
        self.p = {
            "aa": Rectangle(width=10 * u, height=10 * u).move_to(tl + P(5 * u, -5 * u)),
            "ab": Rectangle(width=3 * u, height=10 * u).move_to(tl + P(11.5 * u, -5 * u)),
            "ba": Rectangle(width=10 * u, height=2 * u).move_to(tl + P(5 * u, -11 * u)),
            "bb": Rectangle(width=3 * u, height=2 * u).move_to(tl + P(11.5 * u, -11 * u)),
        }
        for r in self.p.values():
            r.set_stroke(WHITE, 2, opacity=0).set_fill(WHITE, 0)
        self.coupes = VGroup(DashedLine(tl + P(10 * u, 0), tl + P(10 * u, -H), color=WHITE, stroke_width=4, dash_length=0.1),
                             DashedLine(tl + P(0, -10 * u), tl + P(W, -10 * u), color=WHITE, stroke_width=4, dash_length=0.1))
        self.add(self.terre, self.plantes, *self.p.values())
        c0 = self.get_center()
        self.move_to(centre)
        self.coupes.shift(self.get_center() - c0)  # les coupes ne sont pas dans le groupe

    def remplir(self, k):
        return self.p[k].animate.set_fill(COUL[k], 0.85).set_stroke(WHITE, 2, opacity=1)

    def etiquette(self, k, s, fs):
        t = T(s, fs, WHITE, audit=False, gras=True)
        r = self.p[k]
        if t.width > r.width - 0.1:
            t.scale_to_fit_width(r.width - 0.1)
        if t.height > r.height - 0.1:
            t.scale_to_fit_height(r.height - 0.1)
        return t.move_to(r)


class DistribDoubleShort4e(_OutilsProbleme, _OutilsDefi, ShortEq):
    nom_voix = "4e-distrib-double-short"
    fichier_marques = "distrib_double_short_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "orange"

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
        titre, badge = self.entete_short("Les 4 morceaux", self.ceinture)
        titre.sans_synchro = True
        titre._pas_audit = True
        self.add(badge)
        garder = [badge, titre, margo]

        # ── 00 : l'accroche : un potager de 12 m sur 13 m ──
        self.dire("00-accroche")
        pot = Potager(0.19, centre=P(0.15, -0.1))
        l1 = self.l("Un potager de", 1.95, 40, CIEL)
        self.dit(l1, "Un potager de", avec=[FadeIn(titre), FadeIn(pot.terre), LaggedStart(*[FadeIn(d) for d in pot.plantes], lag_ratio=0.004)])
        l2 = self.l("12 mètres sur 13.", 1.4, 40)
        c12 = T("12 m", 26, CIEL, audit=False).next_to(pot.terre, LEFT, buff=0.1)
        c13 = T("13 m", 26, CIEL, audit=False).next_to(pot.terre, DOWN, buff=0.1)
        self.dit(l2, "12 mètres sur 13.")
        self.play(FadeIn(c12), FadeIn(c13), run_time=0.2)
        l3 = self.l("Son aire, de tête ?", -1.95, 36)
        self.dit(l3, "Son aire, de tête ?")
        l4 = self.l("Facile, avec 4 morceaux.", -2.45, 34, JAUNE_TITRE)
        self.dit(l4, "Facile, avec 4 morceaux.")
        self.insister(l4.atomes[-3], 1.3, 0.15)
        self.attendre_voix(marge=0.3)

        # ── 01 : les 4 morceaux ──
        self.dire("01-morceaux")
        self.play(FadeOut(VGroup(l1, l2, l3, l4)), run_time=0.25)
        e1 = self.l("12 = 10 + 2", 2.0, 42)
        e1.atomes[2].set_color(DIX)
        e1.atomes[4].set_color(PETIT)
        self.dire_eq(e1, "12, c'est 10 plus 2.")
        e2 = self.l("13 = 10 + 3", 1.45, 42)
        e2.atomes[2].set_color(DIX)
        e2.atomes[4].set_color(PETIT)
        self.dire_eq(e2, "13, c'est 10 plus 3.")
        # les côtés coupés : 10 et 2 à gauche, 10 et 3 en bas
        g10 = T("10", 24, DIX, audit=False).next_to(pot.p["aa"], LEFT, buff=0.1)
        g2 = T("2", 24, PETIT, audit=False).next_to(pot.p["ba"], LEFT, buff=0.1)
        b10 = T("10", 24, DIX, audit=False).next_to(pot.p["ba"], DOWN, buff=0.1)
        b3 = T("3", 24, PETIT, audit=False).next_to(pot.p["bb"], DOWN, buff=0.1)
        b3.align_to(b10, UP)
        l5 = self.l("On coupe le potager en 4.", -1.95, 32, CIEL)
        self.dit(l5, "On coupe le potager en 4.", avec=[Create(pot.coupes), ReplacementTransform(c12, VGroup(g10, g2)),
                                                       ReplacementTransform(c13, VGroup(b10, b3))])
        prods = [("10 × 10 = 100", "10 fois 10 : 100.", "aa", "100", 40),
                 ("10 × 3 = 30", "10 fois 3 : 30.", "ab", "30", 30),
                 ("2 × 10 = 20", "2 fois 10 : 20.", "ba", "20", 28),
                 ("2 × 3 = 6", "2 fois 3 : 6.", "bb", "6", 28)]
        prec = l5
        for s, phrase, k, lab, fs in prods:
            c = self.l(s, -2.1, 40)
            self.dire_eq(c, phrase, avec=[FadeOut(prec), pot.remplir(k)])
            self.play(FadeIn(pot.etiquette(k, lab, fs), scale=1.3), run_time=0.15)
            prec = c
        t = self.l("En tout :", 2.0, 40, CIEL)
        self.dit(t, "En tout :", avec=[FadeOut(VGroup(e1, e2)), FadeOut(prec)])
        tot = self.l("156 mètres carrés.", 1.45, 40, VERT_OK)
        self.dit(tot, "156 mètres carrés.")
        self.insister(tot.atomes[0], 1.3, 0.15)
        self.attendre_voix(marge=1.0)
        self.vider(garder)

        # ── 01q : la question-pause (3 s) ──
        def avant(sc):
            sc.eq_dans_q(0, "Et avec une lettre ?", "Et avec une lettre ?", lettres="", fs=34)
            sc.eq_dans_q(0, "(x + 1)(x + 3) ?", "Entre parenthèses x plus 1, fois, entre parenthèses x plus 3 ?",
                         lettres="x", fs=34, couleur=JAUNE_TITRE)

        def apres(sc):
            sc.ph_eq(0, "Réponse C : x² + 4x + 3", "Réponse C : x au carré plus 4 x plus 3", lettres="x", premier=True)
            sc.ph_eq(1, "4 morceaux :", "4 morceaux :")
            sc.ph_eq(2, "x², 3x, x et 3.", "x au carré, 3 x, x et 3.", lettres="x")
            sc.rep_fini()

        self.question_pause("01q-question", "01r-reponse", ["Et avec une lettre ?", "(x + 1)(x + 3) ?"],
                            [Eq("x² + 3", 34), Eq("x² + 4x + 4", 34), Eq("x² + 4x + 3", 34)], 2,
                            ["Réponse C : x² + 4x + 3", "4 morceaux :", "x², 3x, x et 3."],
                            avant_q=avant, autres_r=apres)
        self.vider(garder)

        # ── 02 : la question en commentaire ──
        self.dire("02-question")
        t = self.l("À toi.", 1.85, 46, CIEL)
        self.dit(t, "À toi.")
        q = self.l("Calcule 11 × 14", 1.0, 44)
        self.dire_eq(q, "Calcule 11 fois 14")
        self.insister(q.atomes[-1], 1.25, 0.15)
        u1 = self.l("de tête, avec", 0.2, 36)
        self.dit(u1, "de tête, avec")
        u2 = self.l("les 4 morceaux.", -0.35, 36, JAUNE_TITRE)
        mini = VGroup()
        for w, h, x, y, c in ((0.9, 0.9, -0.2, 0.2, COUL["aa"]), (0.36, 0.9, 0.43, 0.2, COUL["ab"]),
                              (0.9, 0.3, -0.2, -0.4, COUL["ba"]), (0.36, 0.3, 0.43, -0.4, COUL["bb"])):
            r = Rectangle(width=w, height=h, fill_color=c, fill_opacity=0.85, stroke_color=WHITE, stroke_width=2).move_to(P(x, y))
            mini.add(VGroup(r, T("?", 22 if h < 0.5 else 30, WHITE, audit=False, gras=True).move_to(r)))
        mini.move_to(P(0, -1.2))
        self.dit(u2, "les 4 morceaux.", avec=[LaggedStart(*[FadeIn(m, scale=0.6) for m in mini], lag_ratio=0.2)])
        self.appel_commentaire(-2.2)

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
