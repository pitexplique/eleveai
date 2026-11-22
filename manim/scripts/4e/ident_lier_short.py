# ident_lier_short.py
# EleveAI — Maths 4e — série IDENTITÉS REMARQUABLES, épisode 01, le SHORT ceinture JAUNE
# « Seulement 25 ? » : un carré de côté x, chaque côté allongé de 5. Son aire ne gagne pas seulement
# le coin 25 : il y a aussi deux bandes de 5x. (x + 5)² = x² + 10x + 25, le carré découpé.
#   · 1 question-pause (3 s) : (x + 1)², bonne réponse A (x² + 2x + 1) ;
#   · fin : « Développe (x + 7)² », réponse en commentaire (x² + 14x + 49), puis la fin commune.
# Micro : litteral_identite_lier_distributivite (tous les écrans).
# Code couleur : x bleu ; le carré x² bleu, les deux bandes orange, le coin violet.
# Voix : manim/voix/4e-identites-lier-short.json (validée) ; marques : ident_lier_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/ident_lier_short.py IdentLierShort4e --media_dir manim/scripts/4e/media-ident-01s-audit
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/ident_lier_short.py IdentLierShort4e -o eleveai-maths-4e-identites-lier-short --media_dir manim/scripts/4e/media-ident-01s
# Sortie : manim/sorties/4e/maths/identites/01-lier/eleveai-maths-4e-identites-lier-short.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE
sys.path.insert(0, str(ICI.parents[1]))  # manim/ : fin_commune

from equation_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402
from equation_defi import E, _OutilsDefi  # noqa: E402
from equation_probleme import _OutilsProbleme  # noqa: E402
from distrib_simple_short import DistribSimpleShort4e  # noqa: E402
from facto_commun_short import FactoCommunShort4e  # noqa: E402
from facto_simple_short import FactoSimpleShort4e  # noqa: E402
from ident_lier import Terrasse, D, idx  # noqa: E402
from fin_commune import ecran_fin, appel_commentaire  # noqa: E402

PAROLE["²"] = "carré"


class IdentLierShort4e(_OutilsProbleme, _OutilsDefi, ShortEq):
    nom_voix = "4e-identites-lier-short"
    fichier_marques = "ident_lier_short_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "jaune"

    l = DistribSimpleShort4e.l
    eq_dans_q = FactoCommunShort4e.eq_dans_q

    def _disposer_q(self, question, choix, phrase):
        """Comme la factorisation 04 : cartes larges (la bonne garde sa taille), la réponse au-dessus de Ti-Margo."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        cartes.next_to(q, DOWN, buff=0.14).set_x(0)
        pause.next_to(cartes, DOWN, buff=0.14).set_x(0)
        for c in cartes:
            g = c[0].get_left()[0]
            c[0].stretch_to_fit_width(3.8)
            c[0].shift(RIGHT * (g - c[0].get_left()[0]))
        cartes.set_x(0)
        ph.arrange(DOWN, buff=0.08).next_to(cartes, DOWN, buff=0.1).set_x(0)
        return tete, q, cartes, pause, rebours, ph

    def dit_avec(self, e, phrase, gestes, n=1, rt=0.12):
        """Comme dit (sans zoom), mais l'atome i joue en plus les animations gestes[i]()."""
        debut = -1
        for _ in range(n):
            debut = self._texte_voix.find(phrase, debut + 1)
        if debut < 0:
            raise ValueError(f"« {phrase} » absent de la voix {self._cle_voix}")
        lots = self._plan_eq(e, debut, debut + len(phrase))
        for k, (pos, atomes) in enumerate(lots):
            self._attendre_pos(pos)
            d = rt
            if k + 1 < len(lots):
                gap = self._debut_voix + self._t_pos(lots[k + 1][0]) - self.renderer.time
                d = max(0.08, min(rt, gap - 0.01))
            ex = []
            for a in atomes:
                f = gestes.get(e.atomes.index(a))
                if f:
                    ex += f()
            self.play(*[FadeIn(a) for a in atomes], *ex, run_time=max(d, 0.2) if ex else d)
        return e

    monter_reponse = FactoSimpleShort4e.monter_reponse  # la bonne carte monte, la réponse grandit

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Seulement 25 ?", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [badge, titre, margo]

        # ── 00 : l'accroche : seulement 25 ? ──
        self.dire("00-accroche")
        fig = Terrasse(1.55, 0.74, centre=P(0.2, 1.3))
        hx = fig.accolade(DOWN, ("bx",), "x", 30)
        h5 = fig.accolade(DOWN, ("bb",), "5", 30)
        gx = fig.accolade(LEFT, ("xx",), "x", 30)
        g5 = fig.accolade(LEFT, ("bx",), "5", 30)
        coupes = fig.coupes
        e25 = fig.etiquette("bb", "25", 30)
        trous = VGroup(*[T("?", 40, WHITE, audit=False, gras=True).move_to(fig.p[k]) for k in ("xb", "bx")])
        l1 = self.l("Un carré de côté x.", -0.85, 42, lettres="x")
        self.dit_avec(l1, "Un carré de côté x.", {idx(l1, "x"): lambda: [
            FadeIn(fig.p["xx"], scale=0.8), GrowFromCenter(gx[0]), FadeIn(gx[1])]})
        l2 = self.l("On allonge chaque côté de 5.", -1.5, 38)
        self.dit_avec(l2, "On allonge chaque côté de 5.", {idx(l2, "5"): lambda: [
            GrowFromEdge(fig.p["xb"], LEFT), GrowFromEdge(fig.p["bx"], UP), GrowFromEdge(fig.p["bb"], UP),
            GrowFromCenter(hx[0]), FadeIn(hx[1]), GrowFromCenter(h5[0]), FadeIn(h5[1]),
            GrowFromCenter(g5[0]), FadeIn(g5[1])]})
        self.play(Create(fig.bord), run_time=0.25)
        l3 = self.l("Son aire gagne", -2.15, 42)
        self.dit(l3, "Son aire gagne")
        self.au("25 ?", FadeIn(titre, scale=1.2), FadeIn(e25, scale=1.4), rt=0.3)
        self.insister(e25, 1.3, 0.15)
        l4 = self.l("Tu paries ?", -2.75, 46, JAUNE_TITRE)
        self.dit(l4, "Tu paries ?", avec=[FadeIn(trous, scale=1.4)])
        self.insister(l4, 1.15, 0.15)
        self.attendre_voix(marge=0.3)
        figure = [fig.p[k] for k in ("xx", "xb", "bx", "bb")] + [fig.bord, hx, h5, gx, g5, e25]
        self.vider(garder + figure)

        # ── 01 : on découpe : x², le coin 25, et les deux bandes de 5x ──
        self.dire("01-decoupe")
        self.au("Découpons", Create(coupes), *[r.animate.set_fill(opacity=0.22) for r in fig.p.values()],
                e25.animate.set_opacity(0.3), rt=0.4)
        exx = fig.etiquette("xx", "x²", 44)
        e1 = fig.etiquette("xb", "5x", 28)
        e2 = fig.etiquette("bx", "5x", 28)
        d1 = self.l("Le carré de départ : x².", -0.85, 40, lettres="x")
        self.dit_avec(d1, "Le carré de départ : x au carré.", {idx(d1, "²"): lambda: [
            fig.remplir("xx"), FadeIn(exx, scale=1.3)]})
        d2 = self.l("Le coin : 5 × 5 = 25.", -1.5, 40)
        self.dit_avec(d2, "Le coin : 5 fois 5, 25.", {idx(d2, "25"): lambda: [
            fig.remplir("bb"), e25.animate.set_opacity(1)]})
        d3 = self.l("Et deux bandes de 5x,", -2.15, 40, lettres="x")
        self.dit_avec(d3, "Et deux bandes de 5 x,", {idx(d3, "5"): lambda: [
            fig.remplir("xb"), fig.remplir("bx"), FadeIn(e1, scale=1.3), FadeIn(e2, scale=1.3)]})
        d4 = self.l("qu'on oublie souvent !", -2.8, 42, PIEGE)
        self.dit(d4, "qu'on oublie souvent !")
        self.play(Wiggle(VGroup(fig.p["xb"], e1)), Wiggle(VGroup(fig.p["bx"], e2)), run_time=0.5)
        self.play(FadeOut(VGroup(d1, d2, d3, d4)), run_time=0.3)
        r1 = Eq("(x + 5)² =", 50)
        if r1.width > 3.9:
            r1.scale_to_fit_width(3.9)
        r1.move_to(P(0, -0.95))
        self.dire_eq(r1, "x plus 5, au carré, égale", echelle=1.15)
        r2 = Eq("x² + 10x + 25", 50, couleur=VERT_OK)
        if r2.width > 3.7:
            r2.scale_to_fit_width(3.7)
        r2.move_to(P(0, -1.75))
        self.dire_eq(r2, "x au carré plus 10 x plus 25.", echelle=1.15)
        cr = SurroundingRectangle(r2, color=VERT_OK, buff=0.12, stroke_width=4, corner_radius=0.08)
        self.play(Create(cr), Indicate(VGroup(e1, e2), color=JAUNE_TITRE), run_time=0.4)
        self.insister(VGroup(r2, cr), 1.06, 0.15)
        self.attendre_voix(marge=1.0)
        self.vider(garder)

        # ── 01q : la question-pause (3 s) ──
        def avant(sc):
            sc.eq_dans_q(0, "(x + 1)²,", "x plus 1, au carré,", lettres="x", fs=36, couleur=JAUNE_TITRE)
            sc.eq_dans_q(0, "ça fait combien ?", "ça fait combien ?", lettres="", fs=36)

        def apres(sc):
            sc.monter_reponse(0)
            sc.ph_eq(0, "Réponse A :", "Réponse A :", premier=True)
            sc.ph_eq(1, "x² + 2x + 1.", "x au carré plus 2 x plus 1.", lettres="x")
            sc.ph_eq(2, "Deux bandes de x : 2x.", "Deux bandes de x : 2 x.", lettres="x")
            sc.rep_fini()

        self.question_pause("01q-question", "01r-reponse", ["(x + 1)²,", "ça fait combien ?"],
                            [Eq("x² + 2x + 1", 34), Eq("x² + 1", 34), Eq("x² + x + 1", 34)], 0,
                            ["Réponse A :", "x² + 2x + 1.", "Deux bandes de x : 2x."],
                            avant_q=avant, autres_r=apres)

        # ── 02 : la question en commentaire (fin commune, sans Ti-Margo) ──
        # Dessinée ici (fin_commune le permet) : ecran_commentaire pose la question d'un bloc, et
        # « Développe » arrivait 1,2 s après son mot. Ici chaque morceau tombe sur son mot.
        self.dire("02-question")
        self.play(FadeOut(Group(*self.mobjects)), run_time=0.25)
        self.remove(*self.mobjects)
        tit = T("À toi !", 52, JAUNE_TITRE).move_to(P(0, 2.6))
        self.au("À toi", FadeIn(tit, shift=DOWN * 0.1), rt=0.35)
        q1 = self.l("Développe", 1.45, 46, CIEL)
        self.dit(q1, "Développe")
        q2 = self.l("(x + 7)²", 0.55, 64, lettres="x")
        q2.scale_to_fit_width(min(q2.width, 3.4)).move_to(P(0, 0.55))
        self.dire_eq(q2, "x plus 7, au carré.", echelle=1.15)
        appel_commentaire(self, y=-1.0)
        self.attendre_voix(marge=0.6)

        # ── 03 : la fin commune ──
        ecran_fin(self, "short", voix="03-abonne")
