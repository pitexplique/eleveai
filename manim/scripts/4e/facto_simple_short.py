# facto_simple_short.py
# EleveAI — Maths 4e — série FACTORISATION, épisode 02, le SHORT ceinture JAUNE
# « Le raccourci » : 17 × 6 + 17 × 4 de tête, sans poser l'opération. Le 17 est dans les deux
# produits : on le sort devant, 17 × (6 + 4) = 17 × 10 = 170.
#   · 1 question-pause (3 s) : factorise 3x + 15, bonne réponse C (3(x + 5)) ;
#   · fin : 23 × 7 + 23 × 3 de tête, réponse en commentaire (230), fin du 05/11.
# Micro : litteral_factoriser.
# Voix : manim/voix/4e-facto-simple-short.json (validée le 11/11, débit −6) ;
# marques : facto_simple_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/facto_simple_short.py FactoSimpleShort4e --media_dir manim/scripts/4e/media-facto-02s-audit
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/facto_simple_short.py FactoSimpleShort4e -o eleveai-maths-4e-facto-simple-short --media_dir manim/scripts/4e/media-facto-02-short
# Sortie : manim/sorties/4e/maths/factorisation/02-simple/eleveai-maths-4e-facto-simple-short.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from equation_commun import *  # noqa: E402,F403
from equation_defi import E, _OutilsDefi  # noqa: E402
from equation_probleme import _OutilsProbleme  # noqa: E402
from distrib_simple_short import DistribSimpleShort4e  # noqa: E402

FACTEUR = OPERATION  # le facteur commun


class FactoSimpleShort4e(_OutilsProbleme, _OutilsDefi, ShortEq):
    nom_voix = "4e-facto-simple-short"
    fichier_marques = "facto_simple_short_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "jaune"

    l = DistribSimpleShort4e.l

    def _disposer_q(self, question, choix, phrase):
        """Trois lignes de question ET trois de réponse : cartes à 85 %, la réponse ne descend pas sur Ti-Margo."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        cartes.scale(0.85).next_to(q, DOWN, buff=0.14).set_x(0)
        # 12/11 relecture HD : la bonne carte rétrécissait son texte pour loger la coche (carte trop étroite) :
        # on allonge les cartes vers la droite (au plus 4,0 de large), pour que le texte garde sa taille
        gauche = min(c[0].get_left()[0] for c in cartes)
        besoin = max(c[1][1].get_right()[0] for c in cartes) + 1.0 - gauche
        larg = min(4.0, max(besoin, cartes[0][0].width))
        for c in cartes:
            c[0].stretch_to_fit_width(larg, about_edge=LEFT)
        cartes.set_x(0)
        pause.next_to(cartes, DOWN, buff=0.14).set_x(0)
        ph.arrange(DOWN, buff=0.08).next_to(cartes, DOWN, buff=0.1).set_x(0)
        return tete, q, cartes, pause, rebours, ph
    fin_05_11 = DistribSimpleShort4e.fin_05_11  # la fin du 05/11, telle quelle

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

    def operation_posee(self):
        """La multiplication posée qu'on ne fera PAS : 17 au-dessus de × 6, et le trait."""
        a = T("17", 40, "#cbd5e1", audit=False)
        b = T("× 6", 40, "#cbd5e1", audit=False)
        g = VGroup(a, b).arrange(DOWN, aligned_edge=RIGHT, buff=0.12)
        trait = Line(g.get_corner(DL) + P(-0.1, -0.1), g.get_corner(DR) + P(0.1, -0.1), color="#cbd5e1", stroke_width=3)
        cadre = RoundedRectangle(width=1.75, height=1.6, corner_radius=0.1, color="#64748b", stroke_width=3)
        op = VGroup(g, trait)
        cadre.move_to(op).shift(DOWN * 0.05)
        return VGroup(cadre, op)

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Le raccourci", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [badge, titre, margo]

        # ── 00 : l'accroche : 17 × 6 + 17 × 4 de tête ──
        self.dire("00-accroche")
        e0 = self.l("17 × 6 + 17 × 4", 1.5, 58)
        e0.scale_to_fit_width(min(e0.width, 3.5)).move_to(P(0, 1.5))
        self.dire_eq(e0, "17 fois 6, plus 17 fois 4.", avec=[FadeIn(titre)])
        l1 = self.l("De tête,", 0.78, 42, CIEL)
        self.dit(l1, "De tête,")
        l2 = self.l("sans poser", 0.12, 42, CIEL)
        l2b = self.l("l'opération.", -0.46, 42, CIEL)
        op = self.operation_posee().scale(0.84).move_to(P(0, -1.5))  # 12/11 : plus lisible (était à 70 %)
        croix = VGroup(Line(op.get_corner(DL), op.get_corner(UR)), Line(op.get_corner(UL), op.get_corner(DR)))
        croix.set_stroke(PIEGE, 7)
        self.dit(l2, "sans poser")
        self.dit(l2b, "l'opération.", avec=[FadeIn(op, scale=0.8)])
        self.play(Create(croix), run_time=0.3)
        l3 = self.l("Tu y arrives ?", -2.38, 36, JAUNE_TITRE)
        l3.scale_to_fit_width(min(l3.width, 3.4)).move_to(P(0, -2.38))
        self.dit(l3, "Tu y arrives ?")
        self.insister(l3, 1.1, 0.15)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 01 : le raccourci : on sort le 17 devant ──
        self.dire("01-secret")
        s0 = self.l("Le raccourci :", 1.95, 42, CIEL)
        self.dit(s0, "Le raccourci :")
        e1 = self.l("17 × 6 + 17 × 4", 1.25, 50).sans_audit()
        self.play(FadeIn(e1, shift=UP * 0.15), run_time=0.3)
        dixsept = VGroup(e1.atomes[0], e1.atomes[4])
        l1 = self.l("le 17 est dans", 0.6, 32)
        self.dit(l1, "le 17 est dans", avec=[dixsept.animate.set_color(FACTEUR)])
        l1b = self.l("les deux produits.", 0.08, 32)
        self.dit(l1b, "les deux produits.", avec=[Circumscribe(VGroup(*e1.atomes[0:3]), color=CIEL, buff=0.06),
                                                  Circumscribe(VGroup(*e1.atomes[4:7]), color=CIEL, buff=0.06)])
        l2 = self.l("On le sort devant :", -0.62, 32, JAUNE_TITRE)
        self.dit(l2, "On le sort devant :")
        d1 = self.l("17 × (6 + 4)", -1.38, 50)
        d1.scale_to_fit_width(3.45).move_to(P(0, -1.38))
        d1.atomes[0].set_color(FACTEUR)
        self.dire_eq(d1, "17 fois, entre parenthèses, 6 plus 4.")
        d2 = self.l("= 17 × 10 = 170", -2.1, 44, VERT_OK)
        d2.scale_to_fit_width(3.45).move_to(P(0, -2.1))
        self.dire_eq(d2, "C'est 17 fois 10 : 170.")
        self.play(Create(self.cadre_ok(VGroup(d1, d2), 0.16).set_color(CIEL)), run_time=0.2)
        self.insister(d2.atomes[-1], 1.3, 0.15)
        self.attendre_voix(marge=1.2)
        self.vider(garder)

        # ── 01q : la question-pause (3 s) ──
        def avant(sc):
            sc.eq_dans_q(0, "Et avec une lettre ?", "Et avec une lettre ?", lettres="", fs=34)
            sc.eq_dans_q(0, "Factorise 3x + 15.", "Factorise 3 x plus 15.", lettres="x", fs=34, couleur=JAUNE_TITRE)

        def apres(sc):
            sc.ph_eq(0, "Réponse C : 3(x + 5).", "Réponse C : 3 fois, entre parenthèses, x plus 5.", lettres="x",
                     premier=True)
            sc.ph_eq(1, "15 = 3 × 5.", "15, c'est 3 fois 5.")
            sc.rep_fini()

        self.question_pause("01q-question", "01r-reponse", ["Et avec une lettre ?", "Factorise 3x + 15."],
                            [Eq("3(x + 15)", 34), Eq("x(3 + 15)", 34), Eq("3(x + 5)", 34)], 2,
                            ["Réponse C : 3(x + 5).", "15 = 3 × 5."],
                            avant_q=avant, autres_r=apres)
        self.vider(garder)

        # ── 02 : la question en commentaire ──
        self.dire("02-question")
        t = self.l("À toi.", 1.75, 46, CIEL)
        self.dit(t, "À toi.")
        q1 = self.l("Calcule de tête", 0.9, 40)
        self.dit(q1, "Calcule de tête")
        q2 = Eq("23 × 7 + 23 × 3", 46, lettres="")
        if q2.width > 3.5:
            q2.scale_to_fit_width(3.5)
        q2.move_to(P(0, 0.1))
        self.dire_eq(q2, "23 fois 7, plus 23 fois 3.")
        self.insister(q2, 1.1, 0.15)
        boite = RoundedRectangle(width=0.8, height=0.8, corner_radius=0.1, color=FACTEUR, stroke_width=5).move_to(P(0, -0.95))
        pt = T("?", 50, FACTEUR, gras=True, audit=False).move_to(boite)
        self.play(Create(boite), FadeIn(pt, scale=1.4), run_time=0.3)
        # 12/11 relecture HD : comme aux shorts 04 et 05, sur 2 lignes, gros et gras (il était minuscule)
        self.au_mot("Réponds en commentaire")
        a1 = T("Réponds", 44, VERT_OK, gras=True)
        a2 = T("en commentaire !", 44, VERT_OK, gras=True)
        appel = VGroup(a1, a2).arrange(DOWN, buff=0.12)
        if appel.width > 3.5:
            appel.scale_to_fit_width(3.5)
        appel.move_to(P(0, -2.05))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.06, 0.25)
        self.attendre_voix(marge=1.0)

        # ── 03 : la fin du 05/11 ──
        self.fin_05_11("03-abonne", [x for x in self.mobjects if x is not margo])
