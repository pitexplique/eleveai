# decimal_diviser_par_entier.py
# EleveAI — Maths 6e — série « Nombres décimaux », épisode 11 : DIVISER UN DÉCIMAL PAR UN ENTIER
# (micro decimal_diviser_par_entier, notion decimal_calcul), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : film Ti Margo (prototypes/ti-margo/films/decimaux-diviser-par-entier.js).
# Décor et métier : Yasmine, RÉGISSEUSE DE CONCERTS (centres : musique, argent-budget).
# Écrans : garde (00), situation (01), le sens (02), la potence (03), QUESTION 1 (04),
# continuer après la virgule (05), vérifier (06), ÷ 10 (07), QUESTION 2 (08), défi (09) et correction (09b),
# appris (10), fin (11).
# Voix : manim/voix/6e-decimal-diviser-par-entier.json (Julie, débit −6) ;
# marques : decimal_diviser_par_entier_marques.json (python manim/scripts/6e/decimal_marques.py).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/decimal_diviser_par_entier.py DecimalDiviserParEntier6e
# python -m manim render -qh --disable_caching manim/scripts/6e/decimal_diviser_par_entier.py DecimalDiviserParEntier6e -o eleveai-maths-6e-decimal-diviser-par-entier --media_dir manim/scripts/6e/media-dec-11
# Sortie : manim/sorties/6e/maths/decimaux/11-diviser-par-entier/eleveai-maths-6e-decimal-diviser-par-entier.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from decimal_commun import *  # noqa: E402,F403

VERT_D = "#34d399"
GRIS = "#94a3b8"
COUL_RANG = {"Centaines": "#f87171", "Dizaines": VERT_D, "Unités": BLEU_D, "Dixièmes": AMBRE_D,
             "Centièmes": ROSE_D, "Millièmes": VIOLET_D}


def yasmine(s=1.0):
    """Yasmine, régisseuse de concerts : son casque."""
    p = visage(personne(peau="#c68642", tenue="#7c3aed", cheveux="#1f2937", longs=True, s=s))
    p.add(casque_audio(p))
    return p


def cable(longueur=5.6, couleur="#f59e0b", ep=12):
    """Un câble (trait épais) terminé par deux prises."""
    l = Line(P(-longueur / 2, 0), P(longueur / 2, 0), color=couleur, stroke_width=ep)
    prises = VGroup(*[RoundedRectangle(width=0.28, height=0.22, corner_radius=0.05, fill_color="#334155",
                                       fill_opacity=1, stroke_width=0).move_to(P(x, 0))
                      for x in (-longueur / 2 - 0.12, longueur / 2 + 0.12)])
    g = VGroup(l, prises)
    g.ligne = l
    return g


def coupes(c, n, couleur=WHITE):
    """Les n − 1 coups de ciseaux qui coupent le câble c en n morceaux égaux."""
    a, b = c.ligne.get_start(), c.ligne.get_end()
    return VGroup(*[DashedLine(a + (b - a) * k / n + UP * 0.32, a + (b - a) * k / n + DOWN * 0.32, color=couleur,
                               stroke_width=4) for k in range(1, n)])


class Potence(VGroup):
    """La division posée, à la française. Colonnes de largeur w ; la ligne 0 porte le dividende.
    .chiffre(ligne, col, s) : un chiffre (non ajouté, hors audit) ; .virgule(ligne, col) : une virgule
    juste après la colonne col ; .q(k, s) : le k-ième chiffre du quotient ; .qvirgule(k) ; .trait(ligne, c0, c1)."""

    def __init__(self, ncol, diviseur, x0=-5.6, y0=2.3, w=0.78, dy=0.78, fs=60, nlig=6, **kw):
        super().__init__(**kw)
        self.x0, self.y0, self.w, self.dy, self.fs = x0, y0, w, dy, fs
        self.xb = x0 + ncol * w + 0.15
        haut = y0 + 0.45
        self.barre_v = Line(P(self.xb, haut), P(self.xb, y0 - dy * (nlig - 0.4)), color=WHITE, stroke_width=5)
        self.barre_h = Line(P(self.xb, y0 - 0.45), P(self.xb + 2.4, y0 - 0.45), color=WHITE, stroke_width=5)
        self.div = self._t(str(diviseur), BLEU_CALCUL).move_to(P(self.xb + 0.5, y0))
        self.add(self.barre_v, self.barre_h, self.div)

    def _t(self, s, c):
        return hors_audit(Text(s, font_size=self.fs, color=c, weight=BOLD))

    def pos(self, ligne, col):
        return P(self.x0 + (col + 0.5) * self.w, self.y0 - ligne * self.dy)

    def chiffre(self, ligne, col, s, c=WHITE):
        return self._t(str(s), c).move_to(self.pos(ligne, col))

    def virgule(self, ligne, col, c=ROUGE_ERREUR):
        p = self.pos(ligne, col) + P(self.w / 2, -0.24)
        return self._t(",", c).move_to(p)

    def moins(self, ligne, col):
        return self._t("−", GRIS).scale(0.8).move_to(self.pos(ligne, col) + LEFT * self.w * 0.62)

    def trait(self, ligne, c0, c1):
        y = self.y0 - ligne * self.dy - 0.4
        return Line(P(self.x0 + c0 * self.w - 0.3, y), P(self.x0 + (c1 + 1) * self.w + 0.02, y), color=GRIS,
                    stroke_width=3)

    def q(self, k, s, c=VERT_OK):
        return self._t(str(s), c).move_to(P(self.xb + 0.45 + k * self.w, self.y0 - self.dy - 0.12))

    def qvirgule(self, k, c=ROUGE_ERREUR):
        return self._t(",", c).move_to(P(self.xb + 0.45 + (k + 0.5) * self.w, self.y0 - self.dy - 0.36))

    def abaisse(self, ligne, col):
        """La flèche qui abaisse le chiffre de la colonne col (ligne 0) jusqu'à la ligne donnée."""
        a = self.pos(0, col) + DOWN * 0.38
        b = self.pos(ligne, col) + UP * 0.38
        return Arrow(a, b, color=AMBRE_D, buff=0.02, stroke_width=4, max_tip_length_to_length_ratio=0.15)


class Tableau(TableauNum):
    def __init__(self, rangs, virgule_apres, **kw):
        super().__init__(rangs, virgule_apres=virgule_apres, couleurs=COUL_RANG, **kw)


def fleche_case(haut, bas, i_haut, i_bas, couleur=VERT_OK):
    return Arrow(haut.cases[i_haut].get_bottom() + DOWN * 0.04, bas.cases[i_bas].get_top() + UP * 0.04, color=couleur,
                 buff=0.04, stroke_width=5, max_tip_length_to_length_ratio=0.25)


class DecimalDiviserParEntierBase(PaysageDecimal):
    nom_voix = "6e-decimal-diviser-par-entier"
    fichier_marques = "decimal_diviser_par_entier_marques.json"

    def rep_gauche(self, i, y, avec=(), fs=32):
        """La ligne i de la réponse, écrite en grand SOUS la figure, à gauche (sous les cartes,
        la colonne la rapetissait) ; chaque nombre à son mot. rep_fini() à la fin."""
        t = Text(self.ph_q[i].original_text, font_size=fs, color=VERT_OK)
        t.move_to(P(0, y)).align_to(P(-6.3, 0), LEFT)
        if t.get_right()[0] > 0.6:
            t.scale_to_fit_width(6.9).align_to(P(-6.3, 0), LEFT)
        self.play(FadeIn(t, shift=UP * 0.1), *avec, run_time=0.35)
        return t

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Diviser un décimal par un entier", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Diviser")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        c = cable(3.6).move_to(P(3.3, 0.35))
        q = self.bloc(["Comment partager quand", "ça ne tombe pas juste ?"], 38).move_to(P(-2.75, 0.35))
        self.au_mot("Comment partager")
        self.play(FadeIn(q, shift=UP * 0.2), FadeIn(c), run_time=0.35)
        self.play(LaggedStart(*[Create(x) for x in coupes(c, 4)], lag_ratio=0.3), run_time=0.8)
        self.attendre_voix(marge=0.6)

    # ── 01 : Yasmine, régisseuse de concerts ────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        ya = yasmine(1.05).move_to(P(-5.2, 0.6))
        self.au_mot("Voici Yasmine")
        nom = self.t("Yasmine", 44, BLEU_CALCUL).next_to(ya, UP, buff=0.2)
        self.play(FadeIn(ya, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("régisseuse")
        met = self.bloc(["régisseuse", "de concerts"], 30, BLEU_CALCUL).next_to(ya, DOWN, buff=0.18)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        c = cable(5.0).move_to(P(-2.2, -2.3))
        c.ligne.set_stroke(width=12)
        c.rotate(0)
        c.move_to(P(-3.4, -2.55))
        self.au_mot("Elle a")
        l1 = self.ligne([("Elle a", WHITE), ("7,5 m", AMBRE_D), ("de câble.", WHITE)], 40)
        self.col(l1, 2.3)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(c, shift=RIGHT * 0.3), run_time=0.35)
        self.au_mot("Elle le coupe")
        l2 = self.bloc(["Elle le coupe en", "5 morceaux égaux."], 38)
        self.col(l2, 1.05)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("5 morceaux")
        self.play(FadeIn(l2[1], shift=UP * 0.1), LaggedStart(*[Create(x) for x in coupes(c, 5)], lag_ratio=0.2),
                  run_time=0.6)
        self.au_mot("Combien mesure")
        q = self.bloc(["Combien mesure", "chaque morceau ?"], 42, JAUNE_TITRE)
        self.col(q, -0.65)
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.35)
        self.attendre_voix()

    # ── 02 : le sens : rang par rang ────────────────────────────────────────
    def ecran_sens(self):
        self.ecran("02-sens")
        cu = 0.62
        unites = VGroup(*[Square(cu, fill_color=BLEU_D, fill_opacity=0.95, stroke_color=WHITE, stroke_width=2)
                          for _ in range(7)]).arrange(RIGHT, buff=0.1).move_to(P(-3.7, 2.2))
        bat = lambda: Rectangle(width=0.12, height=cu, fill_color=AMBRE_D, fill_opacity=0.95,  # noqa: E731
                                stroke_color=WHITE, stroke_width=1.5)
        dix = VGroup(*[bat() for _ in range(5)]).arrange(RIGHT, buff=0.06).next_to(unites, DOWN, buff=0.35)
        dix.align_to(unites, LEFT)
        self.au_mot("7,5, ce sont")
        l1 = self.ligne([("7,5 :", WHITE), ("7 unités", BLEU_D), ("et", WHITE), ("5 dixièmes", AMBRE_D)], 34, buff=0.16)
        self.col(l1, 2.85)
        self.play(FadeIn(l1[0]), run_time=0.25)
        self.au_mot("7 unités")
        self.play(FadeIn(l1[1]), LaggedStart(*[FadeIn(u, scale=0.5) for u in unites], lag_ratio=0.1), run_time=0.45)
        self.au_mot("5 dixièmes")
        self.play(FadeIn(l1[2]), FadeIn(l1[3]), LaggedStart(*[FadeIn(d, scale=0.5) for d in dix], lag_ratio=0.1),
                  run_time=0.45)
        self.au_mot("On partage")
        l2 = self.t("D'abord les unités :", 34, BLEU_D)
        self.col(l2, 2.1)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("7 divisé par 5")
        l3 = self.t("7 ÷ 5 = 1, il reste 2.", 34)
        self.col(l3, 1.4)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        # les 5 morceaux : 5 lignes ; chaque morceau reçoit 1 unité, puis 5 dixièmes
        ys = [0.75 - 0.62 * k for k in range(5)]
        etiq = VGroup(*[hors_audit(Text(f"morceau {k + 1}", font_size=27, color=GRIS)).move_to(P(-4.35, y), aligned_edge=RIGHT)
                        for k, y in enumerate(ys)])
        self.play(FadeIn(etiq), run_time=0.3)
        self.au_mot("1, et il reste")
        self.play(*[unites[k].animate.scale(0.75).move_to(P(-4.0, ys[k])) for k in range(5)], run_time=0.6)
        self.au_mot("il reste 2")
        self.play(Indicate(VGroup(unites[5], unites[6]), color=ROUGE_ERREUR, scale_factor=1.2), run_time=0.5)
        self.au_mot("Les 2 unités")
        l4 = self.t("2 unités = 20 dixièmes.", 34, AMBRE_D)
        self.col(l4, 0.7)
        vingt = VGroup(*[bat() for _ in range(20)]).arrange(RIGHT, buff=0.06)
        vingt.next_to(dix, RIGHT, buff=0.06)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.3)
        self.au_mot("20 dixièmes")
        self.play(ReplacementTransform(VGroup(unites[5], unites[6]), vingt), run_time=0.6)
        self.au_mot("Avec les 5")
        l5 = self.bloc(["Avec les 5 dixièmes :", "25 dixièmes."], 34, AMBRE_D)
        self.col(l5, -0.05)
        self.play(FadeIn(l5, shift=UP * 0.1), run_time=0.3)
        tous = VGroup(*dix, *vingt)
        self.au_mot("25 divisé")
        l6 = self.t("25 ÷ 5 = 5.", 34)
        self.col(l6, -0.95)
        self.play(FadeIn(l6, shift=UP * 0.1), run_time=0.3)
        anims = []
        for k in range(5):
            for j in range(5):
                b = tous[5 * k + j]
                anims.append(b.animate.scale(0.75).move_to(P(-3.4 + 0.15 * j, ys[k])))
        self.play(*anims, run_time=0.8)
        self.au_mot("Chaque morceau")
        lg = self.t("Chaque morceau :", 34)
        self.col(lg, -1.6)
        g = self.gros("1,5 m", fs=54)
        self.col(g, -2.5, xl=1.4)
        self.play(FadeIn(lg), run_time=0.3)
        self.au_mot("1,5 mètre")
        self.play(FadeIn(g, scale=1.3), run_time=0.4)
        self.attendre_voix()

    # ── 03 : la potence ─────────────────────────────────────────────────────
    def ecran_potence(self):
        self.ecran("03-potence")
        po = Potence(2, 5, x0=-5.6, y0=2.2, nlig=5)
        d7, d5 = po.chiffre(0, 0, 7, BLEU_D), po.chiffre(0, 1, 5, AMBRE_D)
        vg = po.virgule(0, 0)
        self.au_mot("On le pose")
        l0 = self.t("On le pose.", 38, JAUNE_TITRE)
        self.col(l0, 2.75)
        self.play(FadeIn(l0, shift=UP * 0.1), Create(po.barre_v), Create(po.barre_h), FadeIn(po.div), FadeIn(d7),
                  FadeIn(vg), FadeIn(d5), run_time=0.45)
        self.au_mot("7 divisé par 5")
        l1 = self.t("7 ÷ 5 = 1, il reste 2.", 36)
        self.col(l1, 1.85)
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(d7, color=BLEU_D), run_time=0.35)
        self.au_mot("1, il reste")
        self.play(FadeIn(po.q(0, 1), scale=1.4), run_time=0.3)
        self.play(FadeIn(po.moins(1, 0)), FadeIn(po.chiffre(1, 0, 5, GRIS)), Create(po.trait(1, 0, 0)), run_time=0.3)
        self.au_mot("il reste 2")
        self.play(FadeIn(po.chiffre(2, 0, 2, ROUGE_ERREUR), scale=1.4), run_time=0.3)
        self.au_mot("On abaisse")
        l2 = self.t("On abaisse le 5.", 36, AMBRE_D)
        self.col(l2, 1.05)
        cinq = po.chiffre(2, 1, 5, AMBRE_D)
        self.play(FadeIn(l2, shift=UP * 0.1), GrowArrow(po.abaisse(2, 1)), FadeIn(cinq, shift=DOWN * 0.5), run_time=0.45)
        self.au_mot("Quand on passe")
        l3 = self.bloc(["On passe la virgule :", "virgule au résultat."], 36, ROUGE_ERREUR)
        self.col(l3, 0.0)
        self.play(FadeIn(l3[0], shift=UP * 0.1), Indicate(vg, color=ROUGE_ERREUR, scale_factor=2.0), run_time=0.4)
        self.au_mot("on met la virgule")
        qv = po.qvirgule(0)
        self.play(FadeIn(l3[1], shift=UP * 0.1), FadeIn(qv, scale=2.0), run_time=0.35)
        self.au_mot("25 divisé")
        l4 = self.t("25 ÷ 5 = 5.", 36)
        self.col(l4, -1.0)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(po.q(1, 5), scale=1.4), run_time=0.3)
        self.play(FadeIn(po.moins(3, 0)), FadeIn(po.chiffre(3, 0, 2, GRIS)), FadeIn(po.chiffre(3, 1, 5, GRIS)),
                  Create(po.trait(3, 0, 1)), run_time=0.3)
        self.play(FadeIn(po.chiffre(4, 1, 0, VERT_OK)), run_time=0.25)
        self.au_mot("Résultat")
        g = self.gros("Résultat : 1,5", fs=50)
        self.col(g, -2.0, xl=1.0)
        self.play(FadeIn(g, scale=1.2), run_time=0.4)
        self.attendre_voix()

    # ── 04 : QUESTION 1 ─────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        po = Potence(2, 2, x0=-5.9, y0=2.5, dy=0.62, fs=50, nlig=5)
        base = [po.barre_v, po.barre_h, po.div, po.chiffre(0, 0, 3, BLEU_D), po.virgule(0, 0), po.chiffre(0, 1, 6, AMBRE_D)]

        def avant(sc):
            sc.play(*[FadeIn(m) for m in base], run_time=0.35)

        def apres(sc):
            sc.au_mot("3 divisé")
            sc.rep_gauche(0, -0.9, avec=[FadeIn(po.q(0, 1), scale=1.4), FadeIn(po.moins(1, 0)), FadeIn(po.chiffre(1, 0, 2, GRIS)),
                            Create(po.trait(1, 0, 0)), FadeIn(po.chiffre(2, 0, 1, ROUGE_ERREUR), scale=1.4)])
            sc.au_mot("1 unité")
            sc.rep_gauche(1, -1.55, avec=[GrowArrow(po.abaisse(2, 1)), FadeIn(po.chiffre(2, 1, 6, AMBRE_D), shift=DOWN * 0.4),
                            FadeIn(po.qvirgule(0), scale=2.0)])
            sc.au_mot("16 divisé")
            sc.rep_gauche(2, -2.2, avec=[FadeIn(po.q(1, 8), scale=1.4), FadeIn(po.moins(3, 0)), FadeIn(po.chiffre(3, 0, 1, GRIS)),
                            FadeIn(po.chiffre(3, 1, 6, GRIS)), Create(po.trait(3, 0, 1)),
                            FadeIn(po.chiffre(4, 1, 0, VERT_OK))])
            sc.rep_fini()

        self.question_pause("04-question", "04b-reponse", ["Combien font", "3,6 ÷ 2 ?"],
                            [self.t("1,3", 36), self.t("1,8", 36), self.t("18", 36)], 1,
                            ["3 ÷ 2 = 1, il reste 1.", "1 unité et 6 dixièmes : 16 dixièmes.", "16 ÷ 2 = 8 : 1,8."],
                            mot_q="Combien", avant_q=avant, autres_r=apres)

    # ── 05 : continuer après la virgule ─────────────────────────────────────
    def ecran_continuer(self):
        self.ecran("05-continuer")
        po = Potence(3, 4, x0=-5.9, y0=2.6, dy=0.66, fs=54, nlig=7)
        d7 = po.chiffre(0, 0, 7, BLEU_D)
        self.au_mot("Et si")
        tit = self.t("Et si ça ne tombe pas juste ?", 38, JAUNE_TITRE)
        self.col(tit, 2.9)
        self.play(FadeIn(tit, shift=UP * 0.1), Create(po.barre_v), Create(po.barre_h), FadeIn(po.div), FadeIn(d7),
                  run_time=0.4)
        self.au_mot("7 divisé par 4")
        l1 = self.t("7 ÷ 4 = 1, il reste 3.", 34)
        self.col(l1, 2.2)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("1, il reste")
        self.play(FadeIn(po.q(0, 1), scale=1.4), FadeIn(po.moins(1, 0)), FadeIn(po.chiffre(1, 0, 4, GRIS)),
                  Create(po.trait(1, 0, 0)), run_time=0.35)
        self.au_mot("il reste 3")
        self.play(FadeIn(po.chiffre(2, 0, 3, ROUGE_ERREUR), scale=1.4), run_time=0.3)
        self.au_mot("On continue")
        l2 = self.t("On continue après la virgule.", 34, ROUGE_ERREUR)
        self.col(l2, 1.5)
        zeros = VGroup(po.virgule(0, 0), po.chiffre(0, 1, 0, GRIS), po.chiffre(0, 2, 0, GRIS))
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(zeros, shift=LEFT * 0.2), FadeIn(po.qvirgule(0), scale=2.0),
                  run_time=0.4)
        self.au_mot("3 unités, ce sont")
        l3 = self.t("3 unités = 30 dixièmes.", 34, AMBRE_D)
        self.col(l3, 0.8)
        self.play(FadeIn(l3, shift=UP * 0.1), GrowArrow(po.abaisse(2, 1)),
                  FadeIn(po.chiffre(2, 1, 0, AMBRE_D), shift=DOWN * 0.4), run_time=0.3)
        self.au_mot("30 divisé")
        l4 = self.t("30 ÷ 4 = 7, il reste 2.", 34)
        self.col(l4, 0.1)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.3)
        self.au_mot("7, il reste")
        self.play(FadeIn(po.q(1, 7), scale=1.4), FadeIn(po.moins(3, 0)), FadeIn(po.chiffre(3, 0, 2, GRIS)),
                  FadeIn(po.chiffre(3, 1, 8, GRIS)), Create(po.trait(3, 0, 1)), run_time=0.35)
        self.au_mot("il reste 2")
        self.play(FadeIn(po.chiffre(4, 1, 2, ROUGE_ERREUR), scale=1.4), run_time=0.3)
        self.au_mot("2 dixièmes, ce sont")
        l5 = self.t("2 dixièmes = 20 centièmes.", 34, ROSE_D)
        self.col(l5, -0.6)
        self.play(FadeIn(l5, shift=UP * 0.1), GrowArrow(po.abaisse(4, 2)),
                  FadeIn(po.chiffre(4, 2, 0, ROSE_D), shift=DOWN * 0.4), run_time=0.3)
        self.au_mot("20 divisé")
        l6 = self.t("20 ÷ 4 = 5.", 34)
        self.col(l6, -1.3)
        self.play(FadeIn(l6, shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(po.q(2, 5), scale=1.4), FadeIn(po.moins(5, 1)), FadeIn(po.chiffre(5, 1, 2, GRIS)),
                  FadeIn(po.chiffre(5, 2, 0, GRIS)), Create(po.trait(5, 1, 2)), run_time=0.35)
        self.play(FadeIn(po.chiffre(6, 2, 0, VERT_OK)), run_time=0.25)
        self.au_mot("Résultat")
        g = self.gros("Résultat : 1,75", fs=48)
        self.col(g, -2.3, xl=1.0)
        self.play(FadeIn(g, scale=1.2), run_time=0.4)
        self.attendre_voix()

    # ── 06 : on vérifie ─────────────────────────────────────────────────────
    def ecran_verif(self):
        self.ecran("06-verif")
        c = cable(5.6).move_to(P(-3.3, 0.2))
        cp = coupes(c, 4)
        a, b = c.ligne.get_start(), c.ligne.get_end()
        etq = VGroup(*[hors_audit(Text("1,75", font_size=28, color=VERT_OK)).move_to(a + (b - a) * (k + 0.5) / 4 + UP * 0.45)
                       for k in range(4)])
        tot = BraceBetweenPoints(b + DOWN * 0.55, a + DOWN * 0.55, color=BLEU_D)
        sept = hors_audit(Text("7", font_size=40, color=BLEU_D, weight=BOLD)).next_to(tot, DOWN, buff=0.2)
        self.add(c, cp)
        self.au_mot("On vérifie")
        l1 = self.t("On vérifie :", 40, JAUNE_TITRE)
        self.col(l1, 1.9)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("1,75 fois 4")
        g = self.gros("1,75 × 4 = 7", fs=54)
        self.col(g, 0.7, xl=1.2)
        self.play(FadeIn(g, scale=1.2), LaggedStart(*[FadeIn(e) for e in etq], lag_ratio=0.15), run_time=0.5)
        self.play(GrowFromCenter(tot), FadeIn(sept), run_time=0.4)
        self.au_mot("C'est juste")
        l2 = self.t("C'est juste !", 42, VERT_OK)
        self.col(l2, -0.6, xl=1.6)
        ok = self.coche().next_to(l2, RIGHT, buff=0.25)
        self.play(FadeIn(l2, scale=1.2), Create(ok), run_time=0.4)
        self.attendre_voix()

    # ── 07 : diviser par 10 ─────────────────────────────────────────────────
    def ecran_par10(self):
        self.ecran("07-par10")
        rangs = ("Dizaines", "Unités", "Dixièmes", "Centièmes")
        kw = dict(larg=1.55, h=0.95, fs_ent=32)
        t1 = Tableau(rangs, 1, **kw).move_to(P(-3.5, 1.5))
        t2 = Tableau(rangs, 1, **kw)
        t2.shift(t1.cases.get_center() + DOWN * 2.0 - t2.cases.get_center())
        t2.remove(t2.entetes)
        h1 = [t1.chiffre(0, 4, VERT_D), t1.chiffre(1, 5, BLEU_D), t1.chiffre(2, 3, AMBRE_D)]
        self.au_mot("Diviser par 10")
        l0 = self.t("÷ 10", 56, BLEU_CALCUL)
        self.col(l0, 2.85)
        self.play(FadeIn(l0, scale=1.2), FadeIn(t1), run_time=0.35)
        self.au_mot("chaque chiffre")
        l1 = self.bloc(["Chaque chiffre devient", "dix fois plus petit :"], 36)
        self.col(l1, 2.0)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("il descend")
        l2 = self.t("il descend d'un rang.", 36, VERT_OK)
        self.col(l2, 1.15)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("45,3 divisé")
        g1 = self.t("45,3 ÷ 10 =", 44)
        self.col(g1, 0.15)
        self.play(FadeIn(g1, shift=UP * 0.1), *[FadeIn(c, scale=1.4) for c in h1], FadeIn(t2), run_time=0.4)
        self.play(*[GrowArrow(fleche_case(t1, t2, i, i + 1)) for i in range(3)], run_time=0.45)
        self.au_mot("4,53")
        g2 = self.gros("4,53", fs=60)
        self.col(g2, -0.95, xl=1.6)
        self.play(FadeIn(g2, scale=1.3), FadeIn(t2.chiffre(1, 4, BLEU_D), scale=1.4),
                  FadeIn(t2.chiffre(2, 5, AMBRE_D), scale=1.4), FadeIn(t2.chiffre(3, 3, ROSE_D), scale=1.4),
                  run_time=0.4)
        self.attendre_voix()

    # ── 08 : QUESTION 2 ─────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        # 814,6 → 8,146 : la virgule saute de deux rangs vers la gauche (nombres de la question, hors audit)
        chiffres = "8146"
        cs = VGroup(*[hors_audit(Text(ch, font_size=96, color=c, weight=BOLD))
                      for ch, c in zip(chiffres, ("#f87171", VERT_D, BLEU_D, AMBRE_D))]).arrange(RIGHT, buff=0.42)
        cs.move_to(P(-3.6, 1.2))
        y_v = cs.get_bottom()[1] + 0.02
        x_v = lambda k: (cs[k].get_right()[0] + cs[k + 1].get_left()[0]) / 2  # noqa: E731
        v = hors_audit(Text(",", font_size=96, color=ROUGE_ERREUR, weight=BOLD)).move_to(P(x_v(2), y_v))
        sous = hors_audit(Text("÷ 100", font_size=48, color=BLEU_CALCUL, weight=BOLD)).next_to(cs, UP, buff=0.5)

        def avant(sc):
            sc.play(FadeIn(cs), FadeIn(v), FadeIn(sous), run_time=0.35)

        def apres(sc):
            sc.au_mot("Chaque chiffre")
            sc.rep_gauche(0, -0.6)
            a1 = CurvedArrow(P(x_v(2), cs.get_top()[1] + 0.15), P(x_v(1), cs.get_top()[1] + 0.15), angle=1.5,
                             color=ROUGE_ERREUR, stroke_width=5)
            a2 = CurvedArrow(P(x_v(1), cs.get_top()[1] + 0.15), P(x_v(0), cs.get_top()[1] + 0.15), angle=1.5,
                             color=ROUGE_ERREUR, stroke_width=5)
            sc.play(FadeOut(sous), Create(a1), v.animate.move_to(P(x_v(1), y_v)), run_time=0.45)
            sc.play(Create(a2), v.animate.move_to(P(x_v(0), y_v)), run_time=0.45)
            sc.au_mot("8 centaines")
            sc.rep_gauche(1, -1.25, avec=[Indicate(cs[0], color="#f87171", scale_factor=1.5)])
            sc.au_mot("8,146")
            sc.rep_gauche(2, -1.9)
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse", ["Combien font", "814,6 ÷ 100 ?"],
                            [self.t("81,46", 36), self.t("8,146", 36), self.choix("81 460", 36)], 1,
                            ["Chaque chiffre descend de deux rangs :", "8 centaines deviennent 8 unités.", "8,146."],
                            mot_q="Combien", avant_q=avant, autres_r=apres)

    # ── 09 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        ya = yasmine(0.95).move_to(P(-5.0, 0.3))
        bouteilles = VGroup(*[VGroup(RoundedRectangle(width=0.42, height=0.95, corner_radius=0.1, fill_color="#38bdf8",
                                                      fill_opacity=0.85, stroke_color=WHITE, stroke_width=2),
                                     Rectangle(width=0.18, height=0.18, fill_color=WHITE, fill_opacity=1, stroke_width=0)
                                     .shift(UP * 0.56)) for _ in range(4)]).arrange(RIGHT, buff=0.3)
        bouteilles.move_to(P(-2.4, -0.6))
        self.au_mot("Yasmine partage")
        l1 = self.bloc(["9 litres d'eau", "entre 4 musiciens."], 40)
        l1[0].set_color(BLEU_CALCUL)
        self.col(l1, 1.75, xl=0.6)
        self.play(FadeIn(ya, shift=UP * 0.2), run_time=0.3)
        self.au_mot("9 litres")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("4 musiciens")
        self.play(FadeIn(l1[1], shift=UP * 0.1), LaggedStart(*[FadeIn(b, shift=UP * 0.3) for b in bouteilles],
                                                             lag_ratio=0.2), run_time=0.6)
        self.au_mot("Combien de litres")
        l2 = self.bloc(["Combien de litres", "pour chacun ?"], 40, ORANGE_RETENUE)
        hors_audit(l2)
        self.col(l2, 0.2, xl=0.6)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        self.pause_defi(y=-1.05)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        po = Potence(3, 4, x0=-6.0, y0=2.1, dy=0.62, fs=50, nlig=7)
        self.play(Create(po.barre_v), Create(po.barre_h), FadeIn(po.div), FadeIn(po.chiffre(0, 0, 9, BLEU_D)),
                  run_time=0.35)
        self.au_mot("9 divisé")
        l1 = self.t("9 ÷ 4 = 2, il reste 1.", 32)
        self.col(l1, 2.35)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("2, il reste")
        self.play(FadeIn(po.q(0, 2), scale=1.4), FadeIn(po.moins(1, 0)), FadeIn(po.chiffre(1, 0, 8, GRIS)),
                  Create(po.trait(1, 0, 0)), run_time=0.35)
        self.au_mot("il reste 1")
        self.play(FadeIn(po.chiffre(2, 0, 1, ROUGE_ERREUR), scale=1.4), run_time=0.3)
        self.au_mot("1 unité")
        l2 = self.t("1 unité = 10 dixièmes.", 32, AMBRE_D)
        self.col(l2, 1.7)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(VGroup(po.virgule(0, 0), po.chiffre(0, 1, 0, GRIS),
                                                            po.chiffre(0, 2, 0, GRIS))),
                  FadeIn(po.qvirgule(0), scale=2.0), GrowArrow(po.abaisse(2, 1)),
                  FadeIn(po.chiffre(2, 1, 0, AMBRE_D), shift=DOWN * 0.4), run_time=0.35)
        self.au_mot("10 divisé")
        l3 = self.t("10 ÷ 4 = 2, il reste 2.", 32)
        self.col(l3, 1.05)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        self.au_mot("2, il reste 2")
        self.play(FadeIn(po.q(1, 2), scale=1.4), FadeIn(po.moins(3, 1)), FadeIn(po.chiffre(3, 1, 8, GRIS)),
                  Create(po.trait(3, 0, 1)), run_time=0.35)
        self.au_mot("il reste 2")
        self.play(FadeIn(po.chiffre(4, 1, 2, ROUGE_ERREUR), scale=1.4), run_time=0.3)
        self.au_mot("2 dixièmes")
        l4 = self.t("2 dixièmes = 20 centièmes.", 32, ROSE_D)
        self.col(l4, 0.4)
        self.play(FadeIn(l4, shift=UP * 0.1), GrowArrow(po.abaisse(4, 2)),
                  FadeIn(po.chiffre(4, 2, 0, ROSE_D), shift=DOWN * 0.4), run_time=0.3)
        self.au_mot("20 divisé")
        l5 = self.t("20 ÷ 4 = 5.", 32)
        self.col(l5, -0.25)
        self.play(FadeIn(l5, shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(po.q(2, 5), scale=1.4), FadeIn(po.moins(5, 1)), FadeIn(po.chiffre(5, 1, 2, GRIS)),
                  FadeIn(po.chiffre(5, 2, 0, GRIS)), Create(po.trait(5, 1, 2)), run_time=0.35)
        self.play(FadeIn(po.chiffre(6, 2, 0, VERT_OK)), run_time=0.25)
        self.au_mot("Chacun reçoit")
        g = self.gros("Chacun : 2,25 L", fs=46)
        self.col(g, -1.25, xl=1.0)
        self.play(FadeIn(g, scale=1.2), run_time=0.4)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        po = Potence(2, 5, x0=0, y0=0, nlig=5, fs=60)
        fig = VGroup(po, po.chiffre(0, 0, 7, BLEU_D), po.virgule(0, 0), po.chiffre(0, 1, 5, AMBRE_D),
                     po.q(0, 1), po.qvirgule(0), po.q(1, 5), po.moins(1, 0), po.chiffre(1, 0, 5, GRIS),
                     po.trait(1, 0, 0), po.chiffre(2, 0, 2, ROUGE_ERREUR), po.chiffre(2, 1, 5, AMBRE_D),
                     po.moins(3, 0), po.chiffre(3, 0, 2, GRIS), po.chiffre(3, 1, 5, GRIS), po.trait(3, 0, 1),
                     po.chiffre(4, 1, 0, VERT_OK))
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("On divise rang par rang.",),
            ("On passe la virgule :", "on la met au résultat."),
            ("Si ça ne tombe pas juste,", "on continue avec les dixièmes,", "puis les centièmes.")], fs=36)
        self.au_mot("On divise")
        self.montrer_ligne(lignes[0])
        self.au_mot("Quand on passe")
        self.montrer_ligne(lignes[1], Indicate(VGroup(fig[2], fig[5]), color=ROUGE_ERREUR, scale_factor=1.6))
        self.au_mot("Si ça ne tombe")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_sens()
        self.ecran_potence()
        self.ecran_question1()
        self.ecran_continuer()
        self.ecran_verif()
        self.ecran_par10()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class DecimalDiviserParEntier6e(DecimalDiviserParEntierBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
