# equation_resoudre_simple_short.py
# EleveAI — Maths 4e — série ÉQUATIONS, épisode 03, le SHORT ceinture BLANCHE
# « Le sac mystère » : EN HAUT la balance, le sac et les billes ; EN BAS, au même
# instant, les phrases et l'équation qui se remplissent.
#   · on enlève 4 billes de chaque côté : la balance ne bouge pas ;
#   · 1 question-pause (3 s) : 3 sacs, 15 billes ;
#   · fin : un sac et 7 billes contre 15 billes, réponse en commentaire, fin standard.
# Micro : equation_resoudre_simple. Centres : animaux, chiens-chats (ceux de l'épisode).
#
# Voix : manim/voix/4e-equation-resoudre-simple-short.json (validée, débit −6) ;
# marques : equation_resoudre_simple_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/equation_resoudre_simple_short.py EquationResoudreSimpleShort
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/equation_resoudre_simple_short.py EquationResoudreSimpleShort -o eleveai-maths-4e-equation-resoudre-simple-short --media_dir manim/scripts/4e/media-eq-03-short
# Sortie : manim/sorties/4e/maths/equations/03-resoudre-simple/eleveai-maths-4e-equation-resoudre-simple-short.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from equation_commun import *  # noqa: E402,F403
from equation_resoudre_simple import BalanceVeto, _OutilsVeto  # noqa: E402

BILLE = "#38bdf8"


class BalanceShort(BalanceVeto):
    RATIO = 0.3


def sac(s=1.0):
    """Le sac mystère : .txt = ce qui est écrit dessus."""
    corps = RoundedRectangle(width=0.66, height=0.56, corner_radius=0.2, fill_color="#a16207", fill_opacity=1, stroke_width=0)
    col = Polygon(P(-0.13, 0.26), P(0.13, 0.26), P(0.2, 0.42), P(-0.2, 0.42), fill_color="#a16207", fill_opacity=1,
                  stroke_width=0)
    lien = Line(P(-0.15, 0.27), P(0.15, 0.27), color="#fde68a", stroke_width=5)
    g = VGroup(corps, col, lien)
    g.txt = T("?", 32, WHITE, audit=False, gras=True).move_to(corps)
    g.add(g.txt)
    return g.scale(s)


def billes(lignes, r=0.115):
    """Les billes en rangées (de bas en haut) : renvoie (groupe, liste à plat)."""
    g = VGroup()
    for n in lignes:
        g.add(VGroup(*[Circle(radius=r, fill_color=BILLE, fill_opacity=1, stroke_color=WHITE, stroke_width=1.5)
                       for _ in range(n)]).arrange(RIGHT, buff=0.02))
    g.arrange(UP, buff=0.02)
    return g, [c for rang in g for c in rang]


class EquationResoudreSimpleShort(_OutilsVeto, ShortEq):
    nom_voix = "4e-equation-resoudre-simple-short"
    fichier_marques = "equation_resoudre_simple_short_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "blanche"

    def ligne_eq(self, s, y, fs=30, couleur=WHITE):
        e = Eq(s, fs, couleur, lettres="")
        if e.width > 3.9:
            e.scale_to_fit_width(3.9)
        return e.move_to(P(0, y))

    def en_deux(self, e, k, p1, p2, avec1=(), avec2=(), rt=0.14):
        """Une ligne dite en deux temps, sur la même ligne de base : les k premiers
        atomes sur p1, le reste sur p2 (avec son geste, à son premier mot)."""
        a, b = e.atomes[:k], e.atomes[k:]
        self.dire_eq(e, p1, echelle=1.0, rt=rt, sauf=b, avec=avec1)
        self.dire_eq(e, p2, echelle=1.0, rt=rt, sauf=a, avec=avec2)

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Le sac mystère", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [badge, titre, margo]

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        b = BalanceShort(largeur=3.4, hauteur=2.1, centre=P(0, 0.95))
        s = b.charger("g", sac(0.92), -0.27)
        pg, lg = billes([2, 2])
        pg.next_to(b.plat["g"].plat, UP, buff=0.05).shift(RIGHT * 0.33)
        b.sur["g"] += lg
        tg = b.legender("g", T("4 billes", 22))
        a1 = self.ligne_eq("Un sac mystère", -0.4)
        self.dire_eq(a1, "Un sac mystère", echelle=1.0, rt=0.15, avec=[FadeIn(titre), FadeIn(b), FadeIn(s, shift=DOWN * 0.2)])
        a2 = self.ligne_eq("et 4 billes d'un côté", -0.8)
        self.en_deux(a2, 1, "et", "4 billes d'un côté", avec2=[FadeIn(pg, shift=DOWN * 0.2), FadeIn(tg)])
        a3 = self.ligne_eq("de la balance.", -1.2)
        self.dire_eq(a3, "de la balance.", echelle=1.0, rt=0.12)
        self.play(b.incliner(0.16, run_time=0.25))
        pd, ld = billes([3, 3, 3])
        pd.next_to(b.plat["d"].plat, UP, buff=0.05)
        b.sur["d"] += ld
        td = b.legender("d", T("9 billes", 22))
        a4 = self.ligne_eq("9 billes de l'autre.", -1.6)
        self.dire_eq(a4, "9 billes de l'autre.", echelle=1.0, rt=0.15, avec=[FadeIn(pd, shift=DOWN * 0.2), FadeIn(td)])
        self.play(b.incliner(0.0, run_time=0.3))
        a5 = self.ligne_eq("Combien de billes", -2.05, 34, JAUNE_TITRE)
        a6 = self.ligne_eq("dans le sac ?", -2.5, 34, JAUNE_TITRE)
        self.dire_eq(a5, "Combien de billes", echelle=1.0, rt=0.15)
        self.dire_eq(a6, "dans le sac ?", echelle=1.0, rt=0.15)
        self.insister(s.txt, 1.5, 0.2)
        self.attendre_voix(marge=0.3)
        lignes = VGroup(a1, a2, a3, a4, a5, a6)

        # ── 01 : on enlève des deux côtés ──
        self.dire("01-jeu")
        self.play(FadeOut(lignes), run_time=0.1)
        c1 = self.ligne_eq("On enlève 4 billes", -0.4)
        c2 = self.ligne_eq("de chaque côté.", -0.85)
        self.dire_eq(c1, "On enlève 4 billes", echelle=1.0, rt=0.15)
        self.dire_eq(c2, "de chaque côté.", echelle=1.0, rt=0.12)
        self.play(*b.retirer(lg + [tg], ld[-4:] + [td]), run_time=0.55)
        c3 = self.ligne_eq("La balance ne bouge pas.", -1.35, 30, VERT_OK)
        self.dire_eq(c3, "La balance ne bouge pas.", echelle=1.0, rt=0.12)
        self.insister(c3, 1.08, 0.15)
        self.au("Il reste", FadeOut(VGroup(c1, c2, c3)), rt=0.1)
        d1 = self.ligne_eq("Il reste le sac", -0.4)
        self.dire_eq(d1, "Il reste le sac", echelle=1.0, rt=0.11)
        d1b = self.ligne_eq("d'un côté,", -0.8)
        self.dire_eq(d1b, "d'un côté,", echelle=1.0, rt=0.11)
        t5 = b.legender("d", T("5 billes", 22, VERT_OK))
        d2 = self.ligne_eq("5 billes de l'autre.", -1.2)
        self.dire_eq(d2, "5 billes de l'autre.", echelle=1.0, rt=0.13, avec=[FadeIn(t5, scale=1.3)])
        e1 = Eq("x + 4 = 9", 44).mis_sur_egal(0.25, -1.75)
        nx = VGroup(Circle(radius=0.2, fill_color="#0b1220", fill_opacity=1, stroke_width=0),
                    T("x", 32, INCONNUE, audit=False, gras=True)).move_to(s.txt)
        self.dire_eq(e1, "x plus 4 égale 9", avec=[ReplacementTransform(s.txt, nx)])
        self.play(e1.egal.animate.set_color(EGAL), run_time=0.1)
        e2 = Eq("x = 5", 44).mis_sur_egal(0.25, -2.45)
        self.descendre(e1, e2, "x égale 5")
        cad = SurroundingRectangle(e2, color=VERT_OK, buff=0.1, corner_radius=0.1, stroke_width=4)
        self.play(e2.droite.animate.set_color(VERT_OK), Create(cad), run_time=0.2)
        self.insister(VGroup(e2, cad), 1.1, 0.15)
        self.attendre_voix(marge=0.4)
        self.vider(garder)

        # ── 01q : la question-pause (3 s) ──
        def avant(sc):
            sc.q_q.scale(0.9)
            sc.eq_dans_q(0, "3 sacs identiques d'un côté,", "3 sacs identiques d'un côté,", lettres="")
            sc.eq_dans_q(0, "15 billes de l'autre.", "15 billes de l'autre.", lettres="")

        def apres(sc):
            sc.ph_eq(0, "Réponse B : 5. 3x = 15.", "Réponse B : 5. 3 x égale 15.", lettres="x", premier=True)
            sc.ph_eq(1, "On divise par 3 des deux côtés.", "On divise par 3 des deux côtés.")
            sc.rep_fini()

        self.question_pause("01q-question", "01r-reponse",
                            ["3 sacs identiques d'un côté,", "15 billes de l'autre.", "Combien de billes par sac ?"],
                            [Eq("12", 28), Eq("5", 28), Eq("18", 28)], 1,
                            ["Réponse B : 5. 3x = 15.", "On divise par 3 des deux côtés."],
                            avant_q=avant, autres_r=apres)
        self.vider(garder)

        # ── 02 : la question en commentaire ──
        self.dire("02-question")
        b2 = BalanceShort(largeur=3.4, hauteur=2.1, centre=P(0, 0.95))
        s2 = b2.charger("g", sac(0.92), -0.27)
        pg2, _ = billes([3, 3, 1], r=0.08)
        pg2.next_to(b2.plat["g"].plat, UP, buff=0.05).shift(RIGHT * 0.32)
        pd2, _ = billes([5, 5, 5], r=0.085)
        pd2.next_to(b2.plat["d"].plat, UP, buff=0.05)
        a = self.ligne_eq("Un sac et 7 billes", -0.4)
        self.en_deux(a, 3, "Un sac et", "7 billes", avec1=[FadeIn(b2), FadeIn(s2)], avec2=[FadeIn(pg2, shift=DOWN * 0.2)])
        c = self.ligne_eq("d'un côté,", -0.8)
        self.dire_eq(c, "d'un côté,", echelle=1.0, rt=0.12)
        l2 = self.ligne_eq("15 billes de l'autre.", -1.2)
        self.dire_eq(l2, "15 billes de l'autre.", echelle=1.0, rt=0.12, avec=[FadeIn(pd2, shift=DOWN * 0.2)])
        l3 = self.ligne_eq("Combien de billes", -1.65, 34, JAUNE_TITRE)
        l4 = self.ligne_eq("dans le sac ?", -2.1, 34, JAUNE_TITRE)
        self.dire_eq(l3, "Combien de billes", echelle=1.0, rt=0.12)
        self.dire_eq(l4, "dans le sac ?", echelle=1.0, rt=0.12)
        self.appel_commentaire(-2.6)

        # ── 03 : la fin standard ──
        self.fin_short("03-abonne", [m for m in self.mobjects if m is not margo])
