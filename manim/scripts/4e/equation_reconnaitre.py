# equation_reconnaitre.py
# EleveAI — Maths 4e — série « Équations », épisode 01 : RECONNAÎTRE UNE ÉQUATION.
# Paysage 16:9, AVEC VOIX, ceinture BLANCHE. Micro : equation_reconnaitre.
# Décor et métier : JEUX (Salma, conceptrice d'escape games, le coffre et son
# cadenas qui s'ouvre au bon code). Centres : jeux-defis.
# Écrans : garde (00) ; le coffre (01) ; égalité + inconnue (02) ; les 3 écritures
# (03) ; QUESTION 1 (03q) ; les membres (04) ; QUESTION 2 (04q) ; résoudre, essais
# x = 2 puis x = 3, le coffre s'ouvre (05) ; le piège (06) ; défi (07) et correction
# (07b) ; ce que tu as appris (08) ; fin (09).
# Voix : manim/voix/4e-equation-reconnaitre.json (validée, débit −6) ; marques :
# equation_reconnaitre_marques.json.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/equation_reconnaitre.py EquationReconnaitre4e
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/equation_reconnaitre.py EquationReconnaitre4e -o eleveai-maths-4e-equation-reconnaitre --media_dir manim/scripts/4e/media-eq-01
# Sortie : manim/sorties/4e/maths/equations/01-reconnaitre/eleveai-maths-4e-equation-reconnaitre.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from equation_commun import *  # noqa: E402,F403

BOIS, BOIS2, OR = "#92400e", "#78350f", "#fbbf24"
GRIS_V = "#cbd5e1"   # verdict « pas équation »
SERRURE_SOMBRE = "#0f172a"   # cadenas sombre : le ?, le x et le 3 s'y lisent en projection
PAPIER = "#fef3c7"
ENCRE_N = "#1f2937"


def allumer_lettre(m, couleur, k=1.5):
    """Le zoom d'une lettre collée à son coefficient (3x, 7n) : elle grandit depuis
    son coin bas-gauche, vers la droite et vers le haut, sans empiéter sur le chiffre."""
    return m.animate(rate_func=there_and_back).scale(k, about_point=m.get_corner(DL)).set_color(couleur)


class Coffre(VGroup):
    """Le coffre : .caisse .couvercle .lueur, le cadenas (.anse .serrure .symbole).
    coffre.ouvrir() : les animations qui l'ouvrent (couvercle, anse, lueur).
    sombre=True : cadenas sombre à bord clair (la paysage) ; le short garde le cadenas clair."""

    def __init__(self, w=2.8, symbole="?", sombre=False, **kw):
        super().__init__(**kw)
        h = w * 0.5
        self.w = w
        self.lueur = Polygon(P(-w * 0.42, h * 0.5), P(w * 0.42, h * 0.5), P(w * 0.52, h * 1.5), P(-w * 0.52, h * 1.5),
                             fill_color=OR, fill_opacity=0.0, stroke_width=0)
        self.caisse = RoundedRectangle(width=w, height=h, corner_radius=0.06 * w, fill_color=BOIS, fill_opacity=1,
                                       stroke_color=OR, stroke_width=4)
        bandes = VGroup(*[Rectangle(width=0.09 * w, height=h, fill_color=OR, fill_opacity=0.8, stroke_width=0)
                          .move_to(P(x * w, 0)) for x in (-0.33, 0.33)])
        self.couvercle = VGroup(
            RoundedRectangle(width=w * 1.03, height=h * 0.46, corner_radius=0.09 * w, fill_color=BOIS2, fill_opacity=1,
                             stroke_color=OR, stroke_width=4),
            *[Rectangle(width=0.09 * w, height=h * 0.46, fill_color=OR, fill_opacity=0.8, stroke_width=0)
              .move_to(P(x * w, 0)) for x in (-0.33, 0.33)])
        self.couvercle.move_to(P(0, h * 0.73))
        l = 0.32 * w
        self.serrure = RoundedRectangle(width=l, height=l * 0.85, corner_radius=0.05 * w,
                                        fill_color=SERRURE_SOMBRE if sombre else GRIS_V, fill_opacity=1,
                                        stroke_color=GRIS_V if sombre else "#475569", stroke_width=3).move_to(P(0, h * 0.14))
        self.anse = Arc(radius=l * 0.3, start_angle=0, angle=PI, stroke_color="#94a3b8", stroke_width=7,
                        arc_center=self.serrure.get_top())
        self.symbole = Text(symbole, font_size=64 * w / 2.8, color=OPERATION, weight=BOLD).move_to(self.serrure)
        self.symbole._pas_audit = True
        self.symbole.sans_synchro = True
        self.add(self.lueur, self.caisse, bandes, self.couvercle, self.anse, self.serrure, self.symbole)

    def ouvrir(self, angle=0.75):
        h = self.charniere_pos()
        return [Rotate(self.couvercle, angle=angle, about_point=h), self.lueur.animate.set_fill(opacity=0.55),
                self.anse.animate.shift(UP * 0.14 * self.w / 2.8).rotate(0.7, about_point=self.anse.get_end())]

    def en(self, x, y):
        """Place le coffre : (x, y) = le centre de la CAISSE (la boîte englobante
        compte aussi la lueur, au-dessus)."""
        return self.shift(P(x, y) - self.caisse.get_center())

    def charniere_pos(self):
        return self.caisse.get_corner(UL) + RIGHT * 0.02

    def afficher(self, s, couleur):
        """Le symbole du cadenas devient s (animation)."""
        t = T(s, 40, couleur, audit=False, gras=True)
        t.scale_to_fit_height(self.serrure.height * 0.55).move_to(self.serrure)
        return ReplacementTransform(self.symbole, t), t


class EquationReconnaitre4e(PaysageEq):
    nom_voix = "4e-equation-reconnaitre"
    fichier_marques = "equation_reconnaitre_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "blanche"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Reconnaître une équation", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Reconnaître", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        c = Coffre(2.2, sombre=True).en(-5.0, 0.1)
        q = VGroup(T("Comment savoir qu'une écriture", 42), T("est une équation ?", 42, BLEU_CALCUL))
        q.arrange(DOWN, buff=0.18).move_to(P(1.3, 0.35))
        self.au("Comment", FadeIn(q[0], shift=RIGHT * 0.2), FadeIn(c, scale=0.7), rt=0.4)
        self.au("est une", FadeIn(q[1], shift=RIGHT * 0.2), rt=0.35)
        self.insister(c.symbole, 1.5, 0.25, about=c.symbole.get_center())
        self.attendre_voix(marge=0.6)

    # ── 01 : le coffre de Salma ─────────────────────────────────────────────
    def ecran_coffre(self):
        self.ecran("01-coffre")
        m = Metier(["Salma", "conçoit des", "escape games"], fs=30, peau="#8d5524", tenue="#7c3aed", longs=True, s=0.95)
        m.perso.move_to(P(-5.45, -2.0))
        m.nom.arrange(DOWN, buff=0.2)  # la cédille de « conçoit » ne frôle plus la ligne du dessous
        m.nom.next_to(m.perso, UP, buff=0.12)
        m.nom.set_x(-5.2)
        c = Coffre(3.1, sombre=True).en(-2.3, -2.3)
        self.au("Salma", FadeIn(m.perso, shift=UP * 0.3), FadeIn(m.nom[0], shift=UP * 0.1), rt=0.4)
        self.au("conçoit", FadeIn(m.nom[1], shift=UP * 0.1), rt=0.3)
        self.au("escape", FadeIn(m.nom[2], shift=UP * 0.1), rt=0.3)
        self.au("coffre,", FadeIn(c, scale=0.7), rt=0.45)
        # le message, sur un papier
        papier = RoundedRectangle(width=5.5, height=1.5, corner_radius=0.1, fill_color=PAPIER, fill_opacity=1,
                                  stroke_width=0).move_to(P(3.65, 2.5))
        l1 = Eq("3 fois le code,", 40, ENCRE_N, lettres="")
        l2 = Eq("plus 2, ça fait 11.", 40, ENCRE_N, lettres="")
        VGroup(l1, l2).arrange(DOWN, buff=0.16).move_to(papier)
        self.au("message", FadeIn(papier, shift=RIGHT * 0.4), rt=0.4)
        self.dire_eq(l1, "3 fois le code,", echelle=1.0)
        self.dire_eq(l2, "plus 2, ça fait 11.", echelle=1.0)
        # ce que les joueurs écrivent
        j = T("Les joueurs écrivent :", 34, CIEL)
        self.col(j, 1.2)
        self.au("Les joueurs", FadeIn(j, shift=RIGHT * 0.2), rt=0.3)
        e = Eq("3x + 2 = 11", 68).move_to(P(3.55, 0.3))
        self.dire_eq(e, "3 x plus 2 égale 11")
        self.play(e.egal.animate.set_color(EGAL), run_time=0.2)
        c1 = T("Le code, on ne le connaît pas :", 34)
        self.col(c1, -0.85)
        self.au("Le code", FadeIn(c1, shift=RIGHT * 0.2), rt=0.35)
        c2 = Eq("c'est la lettre x.", 40, lettres="x")
        self.col(c2, -1.5)
        self.dire_eq(c2, "c'est la lettre x.", echelle=1.0)
        an, nv = c.afficher("x", INCONNUE)
        self.play(an, run_time=0.3)
        self.insister(VGroup(e.x[0]), 1.45, 0.25, about=e.x[0].get_corner(DL))
        self.attendre_voix(marge=0.4)

    # ── 02 : une égalité ET une inconnue ───────────────────────────────────
    def ecran_deux_choses(self):
        self.ecran("02-deux-choses")
        e = Eq("3x + 2 = 11", 92).sans_audit().move_to(P(-0.2, 2.6))
        self.play(FadeIn(e), run_time=0.3)
        carte_g = RoundedRectangle(width=5.7, height=2.95, corner_radius=0.14, stroke_color=EGAL, stroke_width=3,
                                   fill_color="#0b1220", fill_opacity=1).move_to(P(-3.3, -0.1))
        carte_d = carte_g.copy().set_stroke(INCONNUE).move_to(P(3.0, -0.1))
        g1 = T("=", 90, EGAL).move_to(carte_g.get_center() + UP * 0.8)
        g2 = T("une égalité :", 36).move_to(carte_g.get_center() + DOWN * 0.15)
        g3 = T("un signe égal", 36).move_to(carte_g.get_center() + DOWN * 0.8)
        d1 = T("x", 90, INCONNUE).move_to(carte_d.get_center() + UP * 0.85)
        d2 = T("une inconnue :", 34).move_to(carte_d.get_center() + DOWN * 0.02)
        d3 = T("une lettre dont on", 32).move_to(carte_d.get_center() + DOWN * 0.56)
        d4 = T("cherche la valeur", 32).move_to(carte_d.get_center() + DOWN * 1.04)
        self.au("égalité", FadeIn(carte_g), FadeIn(g2, shift=UP * 0.15), rt=0.35)
        self.au("signe égal", FadeIn(g3, shift=UP * 0.15), e.egal.animate.set_color(EGAL),
                TransformFromCopy(e.egal, g1), rt=0.5)
        self.insister(g1, 1.3, 0.2)
        self.au("inconnue", FadeIn(carte_d), FadeIn(d2, shift=UP * 0.15), rt=0.35)
        self.au("lettre", FadeIn(d3, shift=UP * 0.15), TransformFromCopy(e.x[0], d1), rt=0.45)
        self.au("cherche", FadeIn(d4, shift=UP * 0.15), rt=0.3)
        self.insister(d1, 1.3, 0.2)
        fin = T("Il faut les deux.", 44, VERT_OK).move_to(P(-0.4, -2.65))
        cg, cd = self.coche(VERT_OK, 0.26).move_to(g1.get_center() + RIGHT * 1.0), \
            self.coche(VERT_OK, 0.26).move_to(d1.get_center() + RIGHT * 1.0)
        self.au("Il faut", FadeIn(fin, scale=0.8), rt=0.3)
        self.au("deux.", Create(cg), Create(cd), carte_g.animate.set_stroke(VERT_OK, width=6),
                carte_d.animate.set_stroke(VERT_OK, width=6), rt=0.45)
        self.attendre_voix(marge=0.5)

    # ── 03 : les trois écritures ────────────────────────────────────────────
    def ecran_trois(self):
        self.ecran("03-trois")
        X_EG, X_S, X_L, X_V = -3.45, 0.55, 2.25, 4.65
        YS = (1.45, 0.05, -1.35)
        tit = T("Regarde ces trois écritures.", 38, JAUNE_TITRE).move_to(P(-0.4, 3.2))
        self.au("Regarde", FadeIn(tit, shift=DOWN * 0.2), rt=0.4)
        h1 = T("signe égal", 28, EGAL).move_to(P(X_S, 2.45))
        h2 = T("lettre", 28, INCONNUE).move_to(P(X_L, 2.45))
        fil = VGroup(*[Line(P(-6.2, y), P(6.2, y), color="#334155", stroke_width=2) for y in (2.1, 0.75, -0.65)])
        self.play(Create(fil), run_time=0.3)

        # 1) 3x + 2 = 11 : les deux
        e1 = Eq("3x + 2 = 11", 56).mis_sur_egal(X_EG, YS[0])
        self.dire_eq(e1, "3 x plus 2 égale 11")
        k1 = self.coche(VERT_OK, 0.26).move_to(P(X_S, YS[0]))
        k2 = self.coche(VERT_OK, 0.26).move_to(P(X_L, YS[0]))
        self.au("signe", FadeIn(h1, shift=DOWN * 0.1), Create(k1), e1.egal.animate.set_color(EGAL), rt=0.35)
        self.au("lettre.", FadeIn(h2, shift=DOWN * 0.1), Create(k2), allumer_lettre(e1.x[0], INCONNUE), rt=0.35)
        t1 = self.tampon("Équation", VERT_OK, 34).move_to(P(X_V, YS[0]))
        self.au("équation", FadeIn(t1, scale=1.4), rt=0.3)
        self.insister(t1, 1.15, 0.2)

        # 2) 2 + 7 = 9 : pas de lettre
        e2 = Eq("2 + 7 = 9", 56).mis_sur_egal(X_EG, YS[1])
        self.dire_eq(e2, "2 plus 7 égale 9")
        k3 = self.coche(VERT_OK, 0.26).move_to(P(X_S, YS[1]))
        self.au("signe", Create(k3), e2.egal.animate.set_color(EGAL), n=2, rt=0.35)
        vide = Square(0.5, stroke_color=PIEGE, stroke_width=3).move_to(P(X_L, YS[1]))
        cr = croix(vide.copy().scale(0.7), PIEGE)
        self.au("lettre.", FadeIn(vide), Create(cr), n=2, rt=0.35)
        tc = VGroup(T("Tout est", 28, GRIS_V), T("connu", 28, GRIS_V)).arrange(DOWN, buff=0.16).move_to(P(-1.05, YS[1]))
        self.au("Tout", FadeIn(tc, shift=UP * 0.1), rt=0.3)
        t2 = self.tampon("Calcul", GRIS_V, 34).move_to(P(X_V, YS[1]))
        self.au("calcul", FadeIn(t2, scale=1.4), rt=0.3)

        # 3) 3x + 5 : pas de signe égal
        e3 = Eq("3x + 5", 56)
        e3.move_to(P(0, YS[2])).align_to(e1, LEFT)
        self.dire_eq(e3, "3 x plus 5")
        k4 = self.coche(VERT_OK, 0.26).move_to(P(X_L, YS[2]))
        self.au("lettre,", Create(k4), allumer_lettre(e3.x[0], INCONNUE), rt=0.35)
        vide2 = Square(0.5, stroke_color=PIEGE, stroke_width=3).move_to(P(X_S, YS[2]))
        cr2 = croix(vide2.copy().scale(0.7), PIEGE)
        self.au("signe égal. C'est", FadeIn(vide2), Create(cr2), rt=0.35)
        t3 = self.tampon("Expression", GRIS_V, 34).move_to(P(X_V, YS[2]))
        self.au("expression", FadeIn(t3, scale=1.4), rt=0.3)
        self.attendre_voix(marge=0.6)

    # ── 03q : QUESTION 1 ─────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        c = Coffre(3.2, sombre=True).move_to(P(-3.3, -0.9))
        self.add(c)
        eg = T("=", 110, EGAL).move_to(P(-4.5, 1.75))
        plus = T("et", 44, audit=False).move_to(P(-3.3, 1.7))
        x = T("x", 110, INCONNUE).move_to(P(-2.1, 1.85))

        def apres(sc):
            sc.rep(0)
            sc.rep(1)
            sc.rep(2, avec=[FadeIn(eg, scale=1.5), sc.cartes_q[1][1][1].egal.animate.set_color(EGAL)])
            sc.au("et une", FadeIn(plus), rt=0.2)
            sc.au("lettre.", FadeIn(x, scale=1.5), rt=0.3)
            sc.insister(VGroup(eg, plus, x), 1.15, 0.25)
            sc.rep_fin()

        self.question_pause("03q-question", "03r-reponse", ["Laquelle est une équation ?"],
                            [Eq("5 − 2", 34), Eq("5x − 2 = 8", 34), Eq("5x − 2", 34)], 1,
                            ["Réponse B.", "C'est la seule qui a", "un signe égal et une lettre."],
                            autres_r=apres)

    # ── 04 : les deux membres ───────────────────────────────────────────────
    def ecran_membres(self):
        self.ecran("04-membres")
        tit = T("Deux mots à connaître", 42, JAUNE_TITRE).move_to(P(-0.2, 3.2))
        self.au("Deux", FadeIn(tit, shift=DOWN * 0.2), rt=0.4)
        e = Eq("4x + 1 = 13", 92).mis_sur_egal(0.0, 2.05)
        e.egal.set_color(EGAL)
        yf = 1.05
        fg = Arrow(P(-0.35, yf), P(-3.5, yf), color=CIEL, stroke_width=7, buff=0)
        fd = Arrow(P(0.35, yf), P(3.5, yf), color=OR, stroke_width=7, buff=0)
        lg1 = T("à gauche", 30, CIEL).move_to(P(-1.95, yf) + DOWN * 0.38)
        lg2 = T("premier membre", 38, CIEL).move_to(P(-2.45, -0.05))
        ld1 = T("à droite", 30, OR).move_to(P(1.95, yf) + DOWN * 0.38)
        ld2 = T("second membre", 38, OR).move_to(P(2.45, -0.05))
        self.au("gauche", GrowArrow(fg), FadeIn(lg1, shift=LEFT * 0.2), rt=0.35)
        self.au("signe", FadeIn(e.egal, scale=1.6), rt=0.3)
        self.au("premier", FadeIn(lg2, shift=UP * 0.15), rt=0.3)
        self.au("droite,", GrowArrow(fd), FadeIn(ld1, shift=RIGHT * 0.2), rt=0.35)
        self.au("second", FadeIn(ld2, shift=UP * 0.15), rt=0.3)
        self.dire_eq(e, "4 x plus 1 égale 13", sauf=[e.egal])
        # les membres : premier = 4x + 1 ; second = 13
        s1 = Line(e.gauche.get_corner(DL) + DOWN * 0.34, e.gauche.get_corner(DR) + DOWN * 0.34, color=CIEL, stroke_width=7)
        s2 = Line(e.droite.get_corner(DL) + DOWN * 0.34, e.droite.get_corner(DR) + DOWN * 0.34, color=OR, stroke_width=7)
        self.au("premier", Indicate(lg2, color=CIEL, scale_factor=1.15), n=2, rt=0.3)
        self.au("4 x plus 1,", Create(s1), rt=0.4)
        self.au("second", Indicate(ld2, color=OR, scale_factor=1.15), n=2, rt=0.3)
        self.au("13. Et", Create(s2), e.droite.animate.set_color(OR), rt=0.35)
        self.insister(e.droite, 1.2, 0.18)
        # la lettre peut changer
        c1 = T("Et la lettre peut changer :", 34).move_to(P(-3.3, -0.95))
        self.au("Et la lettre", FadeIn(c1, shift=RIGHT * 0.2), rt=0.3)
        xs = [-5.3, -4.0, -2.7, -1.4]
        ltr = VGroup(*[T(s, 76, INCONNUE).move_to(P(xx, -1.9)) for s, xx in zip("xytn", xs)])
        cur = e.x[0]
        # la lettre qui remplace x garde sa ligne de base (y descend) et son bord gauche
        ref = T("xytn", 92, audit=False)
        bas, gauche = cur.get_bottom()[1], cur.get_left()[0]

        def lettre(mot, k):
            if k:
                n = T("xytn"[k], 92, INCONNUE, audit=False)
                n.shift(UP * (bas + ref[k].get_bottom()[1] - ref[0].get_bottom()[1] - n.get_bottom()[1])
                        + RIGHT * (gauche - n.get_left()[0]))
                self.au(mot, FadeIn(ltr[k], scale=1.5), Transform(cur, n), rt=0.25)
            else:
                self.au(mot, FadeIn(ltr[k], scale=1.5), allumer_lettre(cur, INCONNUE, 1.4), rt=0.25)

        lettre("x, y", 0)
        lettre("y, t", 1)
        lettre("t ou", 2)
        lettre("n. C'est", 3)
        c2 = T("C'est toujours l'inconnue.", 36, INCONNUE).move_to(P(2.5, -1.9))
        self.au("C'est toujours", FadeIn(c2, shift=RIGHT * 0.2), rt=0.35)
        self.attendre_voix(marge=0.6)

    # ── 04q : QUESTION 2 ─────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        e = Eq("4x + 1 = 13", 64).move_to(P(-3.3, 0.6))
        e.egal.set_color(EGAL)
        fl = Arrow(P(e.egal.get_x(), e.egal.get_y() - 0.8), P(e.droite.get_right()[0], e.egal.get_y() - 0.8),
                   color=VERT_OK, stroke_width=7, buff=0)

        def avant(sc):
            sc.dire_eq(e, "4 x plus 1 égale 13")
            sc.eq_dans_q(0, "Comment s'appelle le 13 ?", "comment s'appelle le 13 ?", lettres="", fs=36)
            sc.play(Indicate(e.droite, color=OPERATION, scale_factor=1.3), run_time=0.3)

        def apres(sc):
            sc.rep(0, avec=[e.droite.animate.set_color(VERT_OK)])
            sc.rep(1)
            sc.rep(2)
            sc.au("droite", Create(fl), rt=0.35)
            sc.insister(e.droite, 1.25, 0.25)
            sc.rep_fin()

        self.question_pause("04q-question", "04r-reponse", ["Comment s'appelle le 13 ?"],
                            [T("l'inconnue", 34), T("le premier membre", 34), T("le second membre", 34)], 2,
                            ["Réponse C :", "le second membre.", "Il est à droite du signe égal."],
                            avant_q=avant, autres_r=apres)

    # ── 05 : résoudre : les essais, le coffre s'ouvre ───────────────────────
    def ecran_resoudre(self):
        self.ecran("05-resoudre")
        tit = T("Et résoudre ?", 38, JAUNE_TITRE).move_to(P(0, 3.2)).align_to(P(-6.3, 0), LEFT)
        self.au("Et résoudre", FadeIn(tit, shift=RIGHT * 0.2), rt=0.35)
        d = Eq("C'est trouver la valeur de l'inconnue", 34, lettres="")
        d.move_to(P(0, 3.2)).align_to(P(-2.6, 0), LEFT)
        for a in d.atomes:
            if a.original_text in ("valeur", "inconnue"):
                a.set_color(INCONNUE)
        d2 = Eq("qui rend l'égalité vraie.", 34, lettres="").move_to(P(0, 2.6)).align_to(P(-2.6, 0), LEFT)
        self.dire_eq(d, "C'est trouver la valeur de l'inconnue", echelle=1.0, rt=0.16)
        self.dire_eq(d2, "qui rend l'égalité vraie.", echelle=1.0, rt=0.16)
        # à gauche : l'équation à vérifier et le coffre
        qui = T("Salma teste.", 32, CIEL).move_to(P(-4.55, 1.65))
        rappel = Eq("3x + 2 = 11", 48).sans_audit().move_to(P(-4.55, 0.85))
        c = Coffre(2.6, sombre=True).en(-4.55, -2.2)
        self.au("Salma", FadeIn(qui, shift=DOWN * 0.1), FadeIn(rappel), FadeIn(c, scale=0.8), rt=0.4)
        # à droite : le tableau d'essais
        tb = TableauEssais(["On essaie", "On calcule", "Égal à 11 ?"], [2.15, 4.0, 2.3], n=2, h=0.85, fs=26,
                           centre=P(2.325, 0.75), audit=False)
        self.play(FadeIn(tb), run_time=0.3)
        # essai 1 : x = 2
        x2 = tb.placer(Eq("x = 2", 34), 0, 0)
        cal1 = Eq("3 × 2 + 2 = 8", 34)
        cal1.atomes[2].set_color(INCONNUE)
        tb.placer(cal1, 0, 1)
        self.dire_eq(x2, "x égale 2")
        self.dire_eq(cal1, "3 fois 2 plus 2, 8")
        v1 = tb.placer(Eq("pas 11", 30, PIEGE, lettres=""), 0, 2).shift(LEFT * 0.35 + DOWN * 0.05)  # le jambage du p remontait le texte : même ligne que le calcul
        self.dire_eq(v1, "pas 11.", avec=[Create(tb.non(0))])
        # essai 2 : x = 3
        x3 = tb.placer(Eq("x = 3", 34), 1, 0)
        cal2 = Eq("3 × 3 + 2 = 11", 34)
        cal2.atomes[2].set_color(INCONNUE)
        tb.placer(cal2, 1, 1)
        self.dire_eq(x3, "x égale 3")
        self.dire_eq(cal2, "3 fois 3 plus 2, 11")
        v2 = tb.placer(T("vraie", 30, VERT_OK), 1, 2).shift(LEFT * 0.35)
        self.au("vraie :", FadeIn(v2, scale=1.3), Create(tb.oui(1)), cal2.atomes[-1].animate.set_color(VERT_OK), rt=0.3)
        # le coffre s'ouvre
        an, nv = c.afficher("3", VERT_OK)
        self.au("s'ouvre", *c.ouvrir(0.5), an, rt=0.7)
        self.play(Flash(c.lueur, color=OR, line_length=0.35, flash_radius=1.2), run_time=0.4)
        code = Eq("Le code est 3.", 54, VERT_OK, lettres="").move_to(P(2.2, -1.8))
        self.dire_eq(code, "Le code est 3.", echelle=1.0)
        cad = self.encadrer(code, buff=0.18)
        self.play(Create(cad), run_time=0.25)
        self.insister(VGroup(code, cad), 1.12, 0.22)
        self.attendre_voix(marge=0.5)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        tit = T("Le piège :", 46, PIEGE).move_to(P(-0.2, 3.15))
        self.au("Le piège", FadeIn(tit, scale=1.3), rt=0.3)
        d = Eq("croire que tout signe égal fait une équation.", 38, lettres="").move_to(P(-0.2, 2.35))
        self.dire_eq(d, "croire que tout signe égal fait une équation.", echelle=1.0, rt=0.16)
        e = Eq("2 + 7 = 9", 100).move_to(P(-1.5, 0.45))
        e.egal.set_color(EGAL)
        self.dire_eq(e, "2 plus 7 égale 9")
        vr = self.tampon("vrai", VERT_OK, 40).next_to(e, RIGHT, buff=0.9)
        self.au("vrai,", FadeIn(vr, scale=1.4), rt=0.3)
        fin = Eq("mais il n'y a rien à chercher.", 42, lettres="").move_to(P(-0.2, -1.45))
        self.dire_eq(fin, "mais il n'y a rien à chercher.", echelle=1.0, rt=0.15)
        # la loupe passe sur l'écriture et ne trouve aucune lettre
        # verre SANS remplissage, CENTRÉ sur le chiffre et plus grand que lui : il l'entoure sans le masquer
        verre = Circle(radius=0.72, stroke_color=WHITE, stroke_width=5)
        manche = Line(P(0.51, -0.51), P(0.98, -0.98), color=WHITE, stroke_width=9)
        loupe = VGroup(verre, manche)
        loupe.shift(e.atomes[0].get_center() - verre.get_center())
        self.play(FadeIn(loupe), run_time=0.15)
        self.play(loupe.animate.shift(e.atomes[-1].get_center() - e.atomes[0].get_center()), run_time=0.9)
        mot = next(a for a in d.atomes if a.original_text == "équation")
        ba = self.barrer(mot)
        self.play(Create(ba), FadeOut(loupe), run_time=0.3)
        self.attendre_voix(marge=0.7)

    # ── 07 : le défi ────────────────────────────────────────────────────────
    YR = (1.75, 0.55, -0.65, -1.85)

    def ecran_defi(self):
        self.ecran("07-defi", 0.5)
        tit = T("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(1.2, 3.1))
        self.au("À toi", Write(tit), rt=0.5)
        q4 = T("Quatre écritures :", 32, CIEL).move_to(P(-4.0, 2.55))
        self.au("Quatre", FadeIn(q4, shift=DOWN * 0.1), rt=0.3)
        ecr = [("4 × 6 = 24", "4 fois 6 égale 24"), ("7n + 1", "7 n plus 1"),
               ("7n + 1 = 15", "7 n plus 1 égale 15"), ("10 − 3", "10 moins 3")]
        self.cartes_d, self.eq_d = [], []
        for k, (s, ph) in enumerate(ecr):
            ca = RoundedRectangle(width=4.6, height=1.0, corner_radius=0.12, stroke_color="#64748b", stroke_width=3,
                                  fill_color="#0b1220", fill_opacity=1).move_to(P(-4.0, self.YR[k]))
            e = Eq(s, 46).move_to(ca)
            self.play(FadeIn(ca, shift=RIGHT * 0.2), run_time=0.15)
            self.dire_eq(e, ph)
            self.cartes_d.append(ca)
            self.eq_d.append(e)
        q1 = T("Laquelle est une équation ?", 38).move_to(P(2.45, 1.75))
        q2 = T("Quelle est son inconnue ?", 38, INCONNUE).move_to(P(2.45, 0.85))
        self.au("Laquelle", FadeIn(q1, shift=RIGHT * 0.2), rt=0.35)
        self.au("Quelle", FadeIn(q2, shift=RIGHT * 0.2), rt=0.35)
        c = Coffre(2.1, sombre=True).move_to(P(2.45, -1.75))
        self.play(FadeIn(c, scale=0.8), run_time=0.3)
        pz = T("Mets pause, et cherche !", 34, ORANGE_RETENUE).move_to(P(2.45, -0.15))
        self.au("Mets pause", Write(pz), rt=0.8)
        self.q_defi = VGroup(q1, q2, pz, c, q4)
        self.tit_defi = tit
        self.attendre_voix(marge=2.0)

    # ── 07b : la correction, sur les mêmes cartes ───────────────────────────
    def ecran_correction(self):
        self.dire("07b-correction")
        tit = T("Correction", 50, JAUNE_TITRE).move_to(P(1.2, 3.1))
        self.au("Correction", FadeOut(self.q_defi), ReplacementTransform(self.tit_defi, tit), rt=0.4)
        X = -1.2
        e3, ca3 = self.eq_d[2], self.cartes_d[2]
        self.au("7 n plus 1 égale", ca3.animate.set_stroke(VERT_OK, width=6).set_fill("#052e16", 1), rt=0.3)
        self.play(e3.egal.animate.set_color(EGAL), run_time=0.2)
        a1 = T("un signe égal et une lettre.", 36, VERT_OK)
        a1.move_to(P(0, self.YR[2] + 0.27)).align_to(P(X, 0), LEFT)
        self.au("un signe", FadeIn(a1, shift=RIGHT * 0.2), rt=0.3)
        self.play(allumer_lettre(e3.x[0], INCONNUE), run_time=0.3)
        a2 = Eq("Son inconnue est n.", 36, lettres="n").move_to(P(0, self.YR[2] - 0.27)).align_to(P(X, 0), LEFT)
        self.dire_eq(a2, "Son inconnue est n.", echelle=1.0)
        b1 = T("un calcul.", 36, GRIS_V).move_to(P(0, self.YR[0])).align_to(P(X, 0), LEFT)
        self.au("4 fois", Indicate(self.eq_d[0], color=WHITE, scale_factor=1.1), rt=0.3)
        self.au("un calcul", FadeIn(b1, shift=RIGHT * 0.2), rt=0.3)
        b2 = T("une expression.", 36, GRIS_V).move_to(P(0, self.YR[1])).align_to(P(X, 0), LEFT)
        self.au("7 n plus 1 est", Indicate(self.eq_d[1], color=WHITE, scale_factor=1.1), rt=0.3)
        self.au("une expression", FadeIn(b2, shift=RIGHT * 0.2), rt=0.3)
        b3 = T("ni lettre, ni signe égal.", 36, GRIS_V).move_to(P(0, self.YR[3])).align_to(P(X, 0), LEFT)
        self.au("10 moins", Indicate(self.eq_d[3], color=WHITE, scale_factor=1.1), rt=0.3)
        self.au("ni lettre", FadeIn(b3, shift=RIGHT * 0.2), rt=0.3)
        self.attendre_voix(marge=0.6)

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.5)
        c = Coffre(2.8, symbole="3", sombre=True)
        c.symbole.set_color(VERT_OK).scale_to_fit_height(c.serrure.height * 0.6).move_to(c.serrure)
        c.couvercle.rotate(0.75, about_point=c.charniere_pos())
        c.lueur.set_fill(opacity=0.55)
        c.anse.shift(UP * 0.14).rotate(0.7, about_point=c.anse.get_end())
        e = Eq("3x + 2 = 11", 44).sans_audit()
        fig = VGroup(c, e).arrange(DOWN, buff=0.45)
        lignes = self.finale_colonne([["Une équation est une égalité", "avec une inconnue."],
                                      ["À gauche, le premier membre.", "À droite, le second membre."],
                                      ["Résoudre, c'est trouver la valeur", "qui rend l'égalité vraie."]], fs=36,
                                     figure=fig)
        self.play(FadeIn(fig), run_time=0.3)
        for lg in lignes:
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_coffre()
        self.ecran_deux_choses()
        self.ecran_trois()
        self.ecran_question1()
        self.ecran_membres()
        self.ecran_question2()
        self.ecran_resoudre()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")
