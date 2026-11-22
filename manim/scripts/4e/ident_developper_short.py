# ident_developper_short.py
# EleveAI — Maths 4e — série IDENTITÉS REMARQUABLES, épisode 03, le SHORT ceinture ORANGE
# « Le carré piégé » : (2x + 3)² ne commence pas par 2x² ! a = 2x, a² = 2x × 2x = 4x² (le carré de côté 2x
# se découpe en 4 carrés x²) ; puis le gabarit a², 2ab, b² se remplit : 4x² + 12x + 9.
#   · 1 question-pause (3 s) : (5x)², bonne réponse B (25x²) ;
#   · fin : écran commentaire « Développe (3x − 2)² » (réponse 9x² − 12x + 4), puis la fin commune.
# Micro : litteral_identite_developper. Centres : nature-ecologie, art-design.
# Voix : manim/voix/4e-identites-developper-short.json (validée) ; marques : ident_developper_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/ident_developper_short.py IdentDevelopperShort4e --media_dir manim/scripts/4e/media-ident-03s-audit
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/ident_developper_short.py IdentDevelopperShort4e -o eleveai-maths-4e-identites-developper-short --media_dir manim/scripts/4e/media-ident-03s
# Sortie : manim/sorties/4e/maths/identites/03-developper/eleveai-maths-4e-identites-developper-short.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from equation_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402
from equation_defi import E, _OutilsDefi  # noqa: E402
from equation_probleme import _OutilsProbleme  # noqa: E402
from distrib_simple_short import DistribSimpleShort4e  # noqa: E402
from facto_simple_short import FactoSimpleShort4e  # noqa: E402
from ident_developper import A2, AB, B2, X, boite, _Gestes  # noqa: E402
from fin_commune import ecran_fin, appel_commentaire  # noqa: E402

PAROLE["²"] = "carré"
PAROLE["ab"] = "a b"


class IdentDevelopperShort4e(_Gestes, _OutilsProbleme, _OutilsDefi, ShortEq):
    nom_voix = "4e-identites-developper-short"
    fichier_marques = "ident_developper_short_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "orange"

    l = DistribSimpleShort4e.l
    def _disposer_q(self, question, choix, phrase):
        """Celui de facto_simple_short (recopié : il appelle super()) : cartes à 85 %, allongées vers la
        droite (au plus 4,0) pour que la coche ne touche jamais le texte de la bonne carte."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        cartes.scale(0.85).next_to(q, DOWN, buff=0.14).set_x(0)
        gauche = min(c[0].get_left()[0] for c in cartes)
        besoin = max(c[1][1].get_right()[0] for c in cartes) + 1.0 - gauche
        larg = min(4.0, max(besoin, cartes[0][0].width))
        for c in cartes:
            c[0].stretch_to_fit_width(larg, about_edge=LEFT)
        cartes.set_x(0)
        pause.next_to(cartes, DOWN, buff=0.14).set_x(0)
        ph.arrange(DOWN, buff=0.08).next_to(cartes, DOWN, buff=0.1).set_x(0)
        return tete, q, cartes, pause, rebours, ph

    monter_reponse = FactoSimpleShort4e.monter_reponse  # la bonne carte monte, la réponse grandit
    eq_dans_q = FactoSimpleShort4e.eq_dans_q          # la ligne de question bornée à 3,8 de large

    def lx(self, s, y, fs=40, c=WHITE):
        return self.l(s, y, fs, c, lettres="x")

    def valeur(self, s, x, yb, fs=36, couleur=WHITE):
        e = X(s, fs, couleur)
        corps = [a for a in e.atomes if a.original_text not in "+−"]
        e.shift(RIGHT * (x - e.get_center()[0]))  # le terme ENTIER (signe compris) : « 4x² + » ne colle plus
        e.shift(UP * (yb - corps[0].get_bottom()[1]))
        return e

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Le carré piégé", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [badge, titre, margo]

        # ── 00 : l'accroche : (2x + 3)² commence par 2x² ? ──
        self.dire("00-accroche")
        e0 = self.lx("(2x + 3)²", 1.55, 72)
        e0.scale_to_fit_width(min(e0.width, 3.3)).move_to(P(0, 1.55))
        self.dire_eq(e0, "2 x plus 3, au carré.", avec=[FadeIn(titre)])
        l1 = self.l("Ça commence par", 0.6, 40, CIEL)
        self.dit(l1, "Ça commence par")
        l2 = self.lx("2x² ?", -0.15, 64)
        self.dit(l2, "2 x au carré ?")
        tri = Triangle(fill_color="#0b1220", fill_opacity=1, stroke_color=JAUNE_TITRE, stroke_width=6)
        tri.scale_to_fit_height(0.8).move_to(P(0, -1.25))
        pt = T("!", 48, JAUNE_TITRE, gras=True, audit=False).move_to(tri.get_center() + DOWN * 0.08)
        l3 = self.l("Attention au piège !", -2.2, 44, PIEGE)
        l3.scale_to_fit_width(min(l3.width, 3.6)).move_to(P(0, -2.2))
        self.dit(l3, "Attention au piège !", avec=[DrawBorderThenFill(tri), FadeIn(pt)])
        self.play(Wiggle(VGroup(tri, pt)), run_time=0.45)
        self.insister(l3, 1.1, 0.15)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 01 : a = 2x, a² = 4x², puis le gabarit a², 2ab, b² ──
        self.dire("01-calcul")
        rap = X("(2x + 3)²", 42, audit=False)
        la = X("a = 2x.", 42)
        haut_l = VGroup(rap, la).arrange(RIGHT, buff=0.45)
        haut_l.scale_to_fit_width(min(haut_l.width, 3.9)).move_to(P(0, 2.05))
        la.shift(UP * (rap.atomes[2].get_bottom()[1] - la.atomes[3].get_bottom()[1]))
        self.play(FadeIn(rap), run_time=0.1)
        self.dire_eq(la, "a vaut 2 x.", echelle=1.15)
        # le carré de côté 2x : 4 carrés x²
        c = 0.68
        cases = VGroup(*[Square(c, stroke_color=WHITE, stroke_width=3, fill_color=A2, fill_opacity=0)
                         .move_to(P((i - 0.5) * c, (0.5 - k) * c)) for k in range(2) for i in range(2)])
        cases.move_to(P(0.2, -0.05))
        haut = X("2x", 32, CIEL).next_to(cases, UP, buff=0.08)
        gauche = X("2x", 32, CIEL).next_to(cases, LEFT, buff=0.12)
        noms = VGroup(*[X("x²", 28).move_to(q) for q in cases])
        xs = [-1.5, 0.0, 1.5]
        bx = [boite(s, cl, 30).move_to(P(x, -1.78)) for (s, cl), x in zip((("a²", A2), ("2ab", AB), ("b²", B2)), xs)]
        for b in bx:
            b[0].stretch_to_fit_height(0.58)
        sg = [T("+", 32, WHITE, audit=False).move_to(P((xs[i] + xs[i + 1]) / 2, -1.78)) for i in range(2)]
        yb = -2.5
        v1 = self.valeur("4x²", xs[0], yb)
        v2 = self.valeur("+ 12x", xs[1], yb)
        v3 = self.valeur("+ 9", xs[2], yb)
        l2 = self.lx("a² = 2x × 2x = 4x²", 1.4, 40)
        self.poser_gestes(l2, "a au carré, c'est 2 x fois 2 x : 4 x au carré.",
                          {0: lambda: [FadeIn(bx[0], scale=1.2)],
                           3: lambda: [Create(cases), FadeIn(haut)], 6: lambda: [FadeIn(gauche)],
                           9: lambda: [*[q.animate.set_fill(opacity=0.6) for q in cases], FadeIn(noms), FadeIn(v1)]})
        self.au("2 a b", FadeIn(sg[0]), FadeIn(bx[1], scale=1.2), rt=0.25)
        d = X("2 × 2x × 3", 36, "#e2e8f0").move_to(P(0, -1.07))
        self.dire_eq(d, "2 fois 2 x fois 3,", echelle=1.1)
        self.dire_eq(v2, "12 x.", echelle=1.2)
        self.au("b au carré", FadeIn(sg[1]), FadeIn(bx[2], scale=1.2), rt=0.25)
        self.dire_eq(v3, "b au carré : 9.", echelle=1.2)
        res = VGroup(v1, v2, v3)
        self.au("Résultat", Create(self.cadre_ok(res, 0.1)), rt=0.3)
        self.insister(res, 1.08, 0.15)
        self.attendre_voix(marge=1.0)
        self.vider(garder)

        # ── 01q : la question-pause (3 s) ──
        def avant(sc):
            sc.eq_dans_q(0, "(5x)², ça fait combien ?", "5 x, au carré, ça fait combien ?", lettres="x", fs=34,
                         couleur=JAUNE_TITRE)

        def apres(sc):
            sc.monter_reponse(1)
            sc.ph_eq(0, "Réponse B : 25x².", "Réponse B : 25 x au carré.", lettres="x", premier=True)
            sc.ph_eq(1, "5x × 5x :", "5 x fois 5 x :", lettres="x")
            sc.ph_eq(2, "5 × 5, et x × x.", "5 fois 5, et x fois x.", lettres="x")
            sc.rep_fini()

        self.question_pause("01q-question", "01r-reponse", ["(5x)², ça fait combien ?"],
                            [Eq("5x²", 34), Eq("25x²", 34), Eq("10x", 34)], 1,
                            ["Réponse B : 25x².", "5x × 5x :", "5 × 5, et x × x."],
                            avant_q=avant, autres_r=apres)

        # ── 02 : la question en commentaire, SANS Ti-Margo (17/11), puis la fin commune ──
        # Dessinée ici (fin_commune le permet) : ecran_commentaire pose « (3x − 2)² » d'un bloc, et le 3 ou
        # le 2 arrivait alors à 1 s de son mot (AUDIT-TARD). Ici chaque nombre tombe sur son mot.
        self.dire("02-question")
        self.play(FadeOut(Group(*self.mobjects)), run_time=0.25)
        self.remove(*self.mobjects)
        tit = T("À toi !", 52, JAUNE_TITRE).move_to(P(0, 2.6))
        self.au("À toi", FadeIn(tit, shift=DOWN * 0.1), rt=0.35)
        q1 = self.l("Développe", 1.45, 46)
        self.dit(q1, "Développe")
        q2 = self.lx("(3x − 2)²", 0.55, 64)
        q2.scale_to_fit_width(min(q2.width, 3.4)).move_to(P(0, 0.55))
        self.dire_eq(q2, "3 x moins 2, au carré.", echelle=1.15)
        appel_commentaire(self, y=-1.0)
        self.attendre_voix(marge=0.6)
        ecran_fin(self, "short", voix="03-abonne")
