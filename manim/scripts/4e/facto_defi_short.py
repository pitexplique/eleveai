# facto_defi_short.py
# EleveAI — Maths 4e — série FACTORISATION, épisode 05, le SHORT ceinture ORANGE
# « L'erreur cachée » : au tableau, x² + 6x = x(x + 6x). On développe : x² + 6x², faux !
# Le x est déjà sorti, il ne reste que 6 : x(x + 6).
#   · 1 question-pause (3 s) : −2 en facteur dans −2x − 10, bonne réponse B (−2(x + 5)) ;
#   · fin : factorise 4x² + 4x, réponse en commentaire (4x(x + 1)), fin du 05/11.
# Micro : litteral_factoriser.
# Voix : manim/voix/4e-facto-defi-short.json (validée le 11/11, débit −6) ;
# marques : facto_defi_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/facto_defi_short.py FactoDefiShort4e
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/facto_defi_short.py FactoDefiShort4e -o eleveai-maths-4e-facto-defi-short --media_dir manim/scripts/4e/media-facto-05-short
# Sortie : manim/sorties/4e/maths/factorisation/05-defi/eleveai-maths-4e-facto-defi-short.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from equation_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402
from equation_defi import E, _OutilsDefi  # noqa: E402
from equation_probleme import _OutilsProbleme  # noqa: E402
from distrib_simple_short import DistribSimpleShort4e  # noqa: E402

PAROLE["²"] = "carré"

FACTEUR = OPERATION  # le facteur commun
TABLEAU = "#14532d"


class FactoDefiShort4e(_OutilsProbleme, _OutilsDefi, ShortEq):
    nom_voix = "4e-facto-defi-short"
    fichier_marques = "facto_defi_short_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "orange"

    l = DistribSimpleShort4e.l
    fin_05_11 = DistribSimpleShort4e.fin_05_11  # la fin du 05/11, telle quelle

    def le(self, s, y, fs=40, c=WHITE, lettres="x", maxw=3.6):
        """Une ligne mot + expression : en Eq (E colle parfois un mot à un nombre), bornée à maxw."""
        e = Eq(s, fs, couleur=c, lettres=lettres)
        if e.width > maxw:
            e.scale_to_fit_width(maxw)
        return e.move_to(P(0, y))

    def fleche(self, a, b, angle=-1.6):
        return CurvedArrow(a.get_top() + UP * 0.06, b.get_top() + UP * 0.08, angle=angle, color=FACTEUR,
                           stroke_width=4, tip_length=0.13)

    def _disposer_q(self, question, choix, phrase):
        """Cartes à 85 %, la réponse ne descend pas sur Ti-Margo."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        cartes.scale(0.85).next_to(q, DOWN, buff=0.14).set_x(0)
        pause.next_to(cartes, DOWN, buff=0.14).set_x(0)
        for c in cartes:  # des cartes plus larges : le choix juste garde sa taille à côté de la coche
            dx = c[1].get_left()[0] - c[0].get_left()[0]
            c[0].stretch_to_fit_width(3.5)
            c[0].set_x(0)
            c[1].shift(RIGHT * (c[0].get_left()[0] + dx - c[1].get_left()[0]))
        ph.arrange(DOWN, buff=0.08).next_to(cartes, DOWN, buff=0.1).set_x(0)
        return tete, q, cartes, pause, rebours, ph

    def eq_dans_q(self, i, s, phrase, n=1, fs=None, lettres="xytn", couleur=WHITE):
        """Comme le module commun, mais la ligne ne dépasse jamais 3,8 de large (marge de 3 %)."""
        ref = self.q_q[i]
        e = Eq(s, fs or 34, couleur=couleur, lettres=lettres)
        e.scale_to_fit_height(ref.height)
        if e.width > 3.8:
            e.scale_to_fit_width(3.8)
        e.move_to(ref)
        self.q_q.remove(ref)
        self.dire_eq(e, phrase, n)
        return e

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("L'erreur cachée", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [badge, titre, margo]

        # ── 00 : l'accroche : l'erreur au tableau ──
        self.dire("00-accroche")
        l1 = self.l("Un élève écrit", 2.0, 38, CIEL)
        self.dit(l1, "Un élève écrit", avec=[FadeIn(titre)])
        l2 = self.l("au tableau :", 1.5, 38, CIEL)
        tab = RoundedRectangle(width=3.9, height=1.6, corner_radius=0.08, fill_color=TABLEAU, fill_opacity=1,
                               stroke_color="#a16207", stroke_width=6).move_to(P(0, 0.3))
        self.dit(l2, "au tableau :", avec=[FadeIn(tab, scale=0.9)])
        ea = Eq("x² + 6x", 50, lettres="x").move_to(P(0, 0.68))
        eb = Eq("= x(x + 6x)", 50, lettres="x").move_to(P(0, -0.08))
        if eb.width > 3.4:
            eb.scale_to_fit_width(3.4)
        self.dire_eq(ea, "x au carré plus 6 x égale")
        self.dire_eq(eb, "égale x fois, entre parenthèses, x plus 6 x.")
        l3 = self.l("Il s'est trompé.", -0.95, 42, PIEGE)
        self.dit(l3, "Il s'est trompé.")
        l4 = self.l("Tu vois où ?", -1.65, 44, JAUNE_TITRE)
        if l4.width > 3.2:
            l4.scale_to_fit_width(3.2)
        loupe = VGroup(Circle(radius=0.24, color=JAUNE_TITRE, stroke_width=5),
                       Line(P(0.17, -0.17), P(0.38, -0.38), color=JAUNE_TITRE, stroke_width=7)).move_to(P(0, -2.3))
        self.dit(l4, "Tu vois où ?", avec=[Create(loupe)])
        self.play(loupe.animate.shift(RIGHT * 0.6), run_time=0.35)
        self.play(loupe.animate.shift(LEFT * 1.2), run_time=0.45)
        self.play(loupe.animate.shift(RIGHT * 0.6), run_time=0.35)
        self.insister(l4, 1.1, 0.15)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 01 : le secret : on développe ──
        self.dire("01-secret")
        s0 = self.l("On développe :", 1.95, 40, CIEL)
        e = Eq("x(x + 6x)", 56, lettres="x", audit=False)
        e.move_to(P(0, 0.92))
        self.dit(s0, "On développe :", avec=[FadeIn(e, shift=UP * 0.15)])
        self.play(e.atomes[0].animate.set_color(FACTEUR), run_time=0.15)
        f1 = self.fleche(e.atomes[0], e.atomes[2], angle=-1.7)
        a = self.le("x × x = x²", 0.15, 44)
        self.dire_eq(a, "x fois x, x au carré.", avec=[Create(f1)])
        f2 = self.fleche(e.atomes[0], VGroup(e.atomes[4], e.atomes[5]), angle=-1.3)
        b = self.le("x × 6x = 6x²", -0.5, 44)
        self.dire_eq(b, "x fois 6 x, 6 x au carré.", avec=[Create(f2)])
        c0 = self.l("On trouve", -1.1, 38)
        self.dit(c0, "On trouve")
        c1 = self.le("x² + 6x² :", -1.65, 44)
        self.dire_eq(c1, "x au carré plus 6 x au carré :")
        c2 = self.l("faux !", -2.25, 46, PIEGE)
        self.dit(c2, "faux !", avec=[VGroup(*c1.atomes[-4:-1]).animate.set_color(PIEGE)])
        self.play(Circumscribe(VGroup(*c1.atomes[-4:-1]), color=PIEGE, buff=0.06), run_time=0.45)
        self.play(FadeOut(VGroup(a, b, c0, c1, c2, f1, f2)), run_time=0.3)
        d1 = self.l("Le x est sorti,", 0.1, 36)
        d1.atomes[1].set_color(FACTEUR)
        self.dit(d1, "Le x est sorti,", avec=[Circumscribe(e.atomes[0], color=FACTEUR, buff=0.08)])
        d2 = self.l("il ne reste que 6 :", -0.5, 36)
        ba = self.barrer(e.atomes[5])
        self.dit(d2, "il ne reste que 6 :", avec=[Create(ba), e.atomes[5].animate.set_color(PIEGE)])
        r = self.le("x(x + 6)", -1.5, 60, VERT_OK)
        self.dire_eq(r, "x fois, entre parenthèses, x plus 6.")
        r.atomes[0].set_color(FACTEUR)
        self.play(Create(self.cadre_ok(r, 0.14)), run_time=0.2)
        self.insister(r, 1.12, 0.15)
        self.attendre_voix(marge=1.2)
        self.vider(garder)

        # ── 01q : la question-pause (3 s) ──
        def avant(sc):
            sc.eq_dans_q(0, "Mets −2 en facteur", "Mets moins 2 en facteur", lettres="", fs=34)
            sc.eq_dans_q(0, "dans −2x − 10.", "dans moins 2 x moins 10.", lettres="x", fs=34, couleur=JAUNE_TITRE)

        def apres(sc):
            sc.ph_eq(0, "Réponse B : −2(x + 5).", "Réponse B : moins 2 fois, entre parenthèses, x plus 5.", lettres="x",
                     premier=True)
            sc.ph_eq(1, "−2 × 5 = −10.", "Moins 2 fois 5 : moins 10.")
            sc.rep_fini()

        self.question_pause("01q-question", "01r-reponse", ["Mets −2 en facteur", "dans −2x − 10."],
                            [Eq("−2(x − 5)", 34), Eq("−2(x + 5)", 34), Eq("2(x + 5)", 34)], 1,
                            ["Réponse B : −2(x + 5).", "−2 × 5 = −10."],
                            avant_q=avant, autres_r=apres)
        self.vider(garder)

        # ── 02 : la question en commentaire ──
        self.dire("02-question")
        t = self.l("À toi.", 1.75, 46, CIEL)
        self.dit(t, "À toi.")
        q1 = self.l("Factorise", 0.9, 42)
        self.dit(q1, "Factorise")
        q2 = self.le("4x² + 4x", 0.05, 64, maxw=3.2)
        boite = RoundedRectangle(width=0.8, height=0.8, corner_radius=0.1, color=FACTEUR, stroke_width=5).move_to(P(0, -1.0))
        pt = T("?", 50, FACTEUR, gras=True, audit=False).move_to(boite)
        self.dire_eq(q2, "4 x au carré plus 4 x.", avec=[Create(boite), FadeIn(pt, scale=1.4)])
        self.au_mot("Réponds en commentaire")
        a1 = T("Réponds", 44, VERT_OK, gras=True)
        a2 = T("en commentaire !", 44, VERT_OK, gras=True)
        appel = VGroup(a1, a2).arrange(DOWN, buff=0.12)
        if appel.width > 3.5:
            appel.scale_to_fit_width(3.5)
        appel.move_to(P(0, -2.0))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.06, 0.25)
        self.attendre_voix(marge=1.0)

        # ── 03 : la fin du 05/11 ──
        self.fin_05_11("03-abonne", [x for x in self.mobjects if x is not margo])
