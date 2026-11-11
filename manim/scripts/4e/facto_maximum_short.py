# facto_maximum_short.py
# EleveAI — Maths 4e — série FACTORISATION, épisode 04, le SHORT ceinture ORANGE
# « Tout sortir » : 4x² + 8x. Beaucoup d'élèves s'arrêtent trop tôt (la barre de progression
# bloquée à mi-chemin). Le secret : le plus grand nombre commun (4) ET la lettre (x) sortent
# ensemble : 4x² + 8x = 4x(x + 2), les flèches orange de 4x vers x et vers 2.
#   · 1 question-pause (3 s) : 6x² + 9x, bonne réponse C (3x(2x + 3)) ;
#   · fin : factoriser au maximum 10x² + 15x, réponse en commentaire (5x(2x + 3)), fin du 05/11.
# Micro : litteral_factoriser.
# Voix : manim/voix/4e-facto-maximum-short.json (validée le 11/11) ;
# marques : facto_maximum_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/facto_maximum_short.py FactoMaximumShort4e
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/facto_maximum_short.py FactoMaximumShort4e -o eleveai-maths-4e-facto-maximum-short --media_dir manim/scripts/4e/media-facto-04-short
# Sortie : manim/sorties/4e/maths/factorisation/04-maximum/eleveai-maths-4e-facto-maximum-short.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from equation_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402
from equation_defi import E, _OutilsDefi  # noqa: E402
from equation_probleme import _OutilsProbleme  # noqa: E402
from distrib_simple_short import DistribSimpleShort4e  # noqa: E402
from facto_commun_short import FactoCommunShort4e  # noqa: E402

PAROLE["²"] = "carré"

FACTEUR = OPERATION  # le facteur commun


def fleche(a, b, angle=-1.4, couleur=None):
    """Une flèche orange du facteur vers un terme de la parenthèse."""
    return CurvedArrow(a.get_top() + UP * 0.06, b.get_top() + UP * 0.08, angle=angle, color=couleur or FACTEUR,
                       stroke_width=4, tip_length=0.13)


def fleche_bas(a, b, angle=1.1, couleur=None):
    """La même, par en dessous : elle ne passe pas sur la ligne du haut."""
    return CurvedArrow(a.get_bottom() + DOWN * 0.06, b.get_bottom() + DOWN * 0.08, angle=angle, color=couleur or FACTEUR,
                       stroke_width=4, tip_length=0.13)


class FactoMaximumShort4e(_OutilsProbleme, _OutilsDefi, ShortEq):
    nom_voix = "4e-facto-maximum-short"
    fichier_marques = "facto_maximum_short_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "orange"

    l = DistribSimpleShort4e.l

    def _disposer_q(self, question, choix, phrase):
        """Comme le pilote : cartes à 85 % (une seule réduction : les choix sont longs), la réponse ne descend pas sur Ti-Margo."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        cartes.next_to(q, DOWN, buff=0.14).set_x(0)
        pause.next_to(cartes, DOWN, buff=0.14).set_x(0)
        for c in cartes:  # des cartes plus larges : la bonne réponse garde sa taille une fois cochée
            g = c[0].get_left()[0]
            c[0].stretch_to_fit_width(3.8)
            c[0].shift(RIGHT * (g - c[0].get_left()[0]))
        cartes.set_x(0)
        ph.arrange(DOWN, buff=0.08).next_to(cartes, DOWN, buff=0.1).set_x(0)
        return tete, q, cartes, pause, rebours, ph

    eq_dans_q = FactoCommunShort4e.eq_dans_q
    fin_05_11 = DistribSimpleShort4e.fin_05_11  # la fin du 05/11, telle quelle

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Tout sortir", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [badge, titre, margo]

        # ── 00 : l'accroche : beaucoup s'arrêtent trop tôt ──
        self.dire("00-accroche")
        f0 = self.l("Factorise", 1.85, 44, CIEL)
        self.dit(f0, "Factorise", avec=[FadeIn(titre)])
        e0 = Eq("4x² + 8x", 72)
        e0.scale_to_fit_width(min(e0.width, 3.4)).move_to(P(0, 1.0))
        self.dire_eq(e0, "4 x au carré plus 8 x.")
        cadre = RoundedRectangle(width=3.4, height=0.42, corner_radius=0.1, stroke_color="#cbd5e1", stroke_width=3)
        cadre.move_to(P(0, 0.05))
        plein = RoundedRectangle(width=1.45, height=0.32, corner_radius=0.08, fill_color=FACTEUR, fill_opacity=1,
                                 stroke_width=0)
        plein.align_to(cadre, LEFT).shift(RIGHT * 0.05).set_y(0.05)
        mur = Line(P(plein.get_right()[0] + 0.06, 0.38), P(plein.get_right()[0] + 0.06, -0.28), color=PIEGE,
                   stroke_width=8)
        l1 = self.l("Beaucoup d'élèves", -0.75, 40)
        self.dit(l1, "Beaucoup d'élèves", avec=[Create(cadre)])
        l2 = self.l("s'arrêtent trop tôt.", -1.3, 40, PIEGE)
        self.dit(l2, "s'arrêtent trop tôt.", avec=[GrowFromEdge(plein, LEFT)])
        self.play(Create(mur), Wiggle(plein), run_time=0.5)
        l3 = self.l("Et toi ?", -2.15, 54, JAUNE_TITRE)
        self.dit(l3, "Et toi ?")
        self.insister(l3, 1.2, 0.15)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 01 : le secret : on sort TOUT ce qui est commun ──
        self.dire("01-secret")
        s0 = self.l("Le secret :", 2.1, 40, CIEL)
        self.dit(s0, "Le secret :")
        s1 = self.l("on sort tout", 1.6, 33)
        self.dit(s1, "on sort tout")
        s1b = self.l("ce qui est commun.", 1.14, 33)
        self.dit(s1b, "ce qui est commun.")
        n1 = Eq("Le plus grand", 33, lettres="").move_to(P(0, 0.62))
        self.dire_eq(n1, "Le plus grand", echelle=1.0, rt=0.12)
        n1b = Eq("nombre : 4.", 33, lettres="").move_to(P(0, 0.16))
        n1b.atomes[-2].set_color(FACTEUR)
        self.dire_eq(n1b, "nombre : 4.", echelle=1.0, rt=0.12)
        n2 = Eq("La lettre : x.", 33, lettres="").move_to(P(0, -0.3))
        n2.atomes[-2].set_color(FACTEUR)
        self.dire_eq(n2, "La lettre : x.", echelle=1.0, rt=0.12)
        n3 = Eq("Donc 4x.", 44, lettres="").move_to(P(0, -0.85))
        VGroup(n3.atomes[1], n3.atomes[2]).set_color(FACTEUR)
        n3.atomes[3].shift(RIGHT * 0.1)
        self.dire_eq(n3, "Donc 4 x.", echelle=1.0, rt=0.12)
        c3 = SurroundingRectangle(VGroup(n3.atomes[1], n3.atomes[2]), color=FACTEUR, buff=0.07, stroke_width=4,
                                  corner_radius=0.06)
        self.play(Create(c3), run_time=0.2)
        self.insister(VGroup(n3.atomes[1], n3.atomes[2], c3), 1.25, 0.15)
        g1 = Eq("4x² + 8x", 46).move_to(P(0, -1.5))
        self.dire_eq(g1, "4 x au carré plus 8 x égale", echelle=1.15)
        g2 = Eq("= 4x(x + 2)", 46).move_to(P(0, -2.15))
        VGroup(g2.atomes[1], g2.atomes[2]).set_color(FACTEUR)
        self.dire_eq(g2, "égale 4 x fois, entre parenthèses, x plus 2.", echelle=1.15)
        quatre = VGroup(g2.atomes[1], g2.atomes[2])
        f1 = fleche_bas(quatre, g2.atomes[4], 1.1)
        f2 = fleche_bas(quatre, g2.atomes[6], 0.8)
        self.play(Create(f1), Create(f2), run_time=0.4)
        self.play(Circumscribe(VGroup(g1, g2), color=VERT_OK, buff=0.1), run_time=0.6)
        self.attendre_voix(marge=1.2)
        self.vider(garder)

        # ── 01q : la question-pause (3 s) ──
        def avant(sc):
            sc.eq_dans_q(0, "Factorise au maximum", "Factorise au maximum", lettres="", fs=34)
            sc.eq_dans_q(0, "6x² + 9x.", "6 x au carré plus 9 x.", lettres="x", fs=34, couleur=JAUNE_TITRE)

        def apres(sc):
            sc.ph_eq(0, "Réponse C : 3x(2x + 3).", "Réponse C : 3 x fois, entre parenthèses, 2 x plus 3.", lettres="x",
                     premier=True)
            sc.ph_eq(1, "Le 3 et le x sortent", "Le 3 et le x sortent", lettres="x")
            sc.ph_eq(2, "tous les deux.", "tous les deux.")
            sc.rep_fini()

        self.question_pause("01q-question", "01r-reponse", ["Factorise au maximum", "6x² + 9x."],
                            [Eq("3(2x² + 3x)", 34), Eq("x(6x + 9)", 34), Eq("3x(2x + 3)", 34)], 2,
                            ["Réponse C : 3x(2x + 3).", "Le 3 et le x sortent", "tous les deux."],
                            avant_q=avant, autres_r=apres)
        self.vider(garder)

        # ── 02 : la question en commentaire ──
        self.dire("02-question")
        t = self.l("À toi.", 1.75, 46, CIEL)
        self.dit(t, "À toi.")
        q1 = self.l("Factorise au maximum", 0.85, 38)
        self.dit(q1, "Factorise au maximum")
        q2 = Eq("10x² + 15x", 56)
        if q2.width > 3.4:
            q2.scale_to_fit_width(3.4)
        q2.move_to(P(0, 0.0))
        self.dire_eq(q2, "10 x au carré plus 15 x.")
        boite = RoundedRectangle(width=0.8, height=0.8, corner_radius=0.1, color=FACTEUR, stroke_width=5)
        pt = T("?", 50, FACTEUR, gras=True, audit=False).move_to(boite)
        par = T("( ? + ? )", 46, WHITE, audit=False)
        egal = T("=", 46, EGAL, audit=False)
        ligne = VGroup(egal, VGroup(boite, pt), par).arrange(RIGHT, buff=0.15).move_to(P(0, -1.0))
        pt.move_to(boite)
        self.play(FadeIn(egal), Create(boite), FadeIn(pt, scale=1.4), FadeIn(par), run_time=0.2)
        self.appel_commentaire(-2.0)

        # ── 03 : la fin du 05/11 ──
        self.fin_05_11("03-abonne", [x for x in self.mobjects if x is not margo])
