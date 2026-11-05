# angle_comparer_short.py
# EleveAI — Maths 6e — short jumeau de l'épisode 03 « Comparer des angles »
# (micro angle_comparer). CEINTURE BLANCHE : on VOIT que l'ouverture ne change pas.
# Il AMUSE : « Une loupe grossit tout. Vraiment tout ? »
#   · EN HAUT, la loupe dessinée passe sur un angle de 30° : les côtés s'allongent ×3 ;
#   · EN BAS, au même instant, le même angle : les côtés poussent, l'arc et « 30° » restent ;
#   · 1 question-pause (3 s) : combien mesure l'angle sous la loupe ? ;
#   · fin : 45° sous une loupe ×10, sans donner la réponse, réponse en commentaire.
# Centre d'intérêt : sport (celui de la paysage).
# Voix : manim/voix/6e-angle-comparer-short.json (validée, débit −6) ; WAV :
# public/sons/6e-angle-comparer-short/ ; marques : angle_comparer_short_marques.json.
# Ajouté ICI : Loupe, coccinelle(), ang(), cartes étroites de la question (la loupe à côté).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/6e/angle_comparer_short.py AngleComparerShort
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/angle_comparer_short.py AngleComparerShort -o eleveai-maths-6e-angle-comparer-short --media_dir manim/scripts/6e/media-angle-03-short
# Sortie : manim/sorties/6e/maths/angles/03-comparer/eleveai-maths-6e-angle-comparer-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403
from canvas_angles import *  # noqa: E402,F403

C_L = P(0, 1.45)  # le centre de la loupe
R_L = 0.8
S_BAS = P(-1.85, -2.35)  # le sommet de l'angle du bas
ECRIT = [0.3, -0.15]  # les deux lignes écrites entre la loupe et l'angle du bas


class Loupe(VGroup):
    """La loupe dessinée : verre translucide, cerclage, manche. On la déplace d'un
    bloc (.animate.move_to sur le verre : l.vers(p))."""

    def __init__(self, centre=C_L, r=R_L, **kw):
        super().__init__(**kw)
        c = np.array(centre, dtype=float)
        self.verre = Circle(radius=r, fill_color="#7dd3fc", fill_opacity=0.14, stroke_width=0).move_to(c)
        self.anneau = Circle(radius=r, stroke_color="#e2e8f0", stroke_width=9).move_to(c)
        d = polaire(-22)
        self.manche = Line(c + d * (r + 0.03), c + d * (r + 0.72), color=AMBRE, stroke_width=15)
        self.add(self.manche, self.verre, self.anneau)


def coccinelle(p, k=1.0):
    corps = Circle(radius=0.17, fill_color=SOMMET, fill_opacity=1, stroke_color="#0f172a", stroke_width=1.5)
    tete = Circle(radius=0.08, fill_color="#475569", fill_opacity=1, stroke_width=0).move_to(LEFT * 0.17)
    raie = Line(UP * 0.17, DOWN * 0.17, color="#0f172a", stroke_width=1.5)
    pts = VGroup(*[Dot(P(x, y), radius=0.03, color="#0f172a") for x, y in ((-0.07, 0.08), (0.07, 0.08), (-0.07, -0.08), (0.07, -0.08))])
    return VGroup(tete, corps, raie, pts).scale(k).move_to(p)


def ang(*a, **k):
    an = Angle(*a, **k)
    an.arc.set_z_index(-1)
    an.fond.set_z_index(-1)
    return an


def poser(a):
    a.maj()
    return [FadeIn(a.fond), FadeIn(a.arc), FadeIn(a.cote1), FadeIn(a.cote2), FadeIn(a.point, scale=2)]


def meme_base(lg):
    """Les morceaux d'une ligne sur la MÊME ligne de base (arrange les centre : « et » ou
    « DEF » ne tombaient pas au niveau du reste). Renvoie la ligne."""
    base = lambda l: float(np.median([m.get_bottom()[1] for m in (l.submobjects or [l])]))
    b0 = base(lg[0])
    for l in lg:
        l.shift(UP * (b0 - base(l)))
    return lg


class AngleComparerShort(ShortProp):
    nom_voix = "6e-angle-comparer-short"
    fichier_marques = "angle_comparer_short_marques.json"
    ceinture = "blanche"

    def _disposer_q(self, question, choix, phrase):
        """Trois cartes étroites à gauche : la loupe reste à côté d'elles."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        neuves = VGroup(*[self._carte_choix(l, c, 2.15, 28) for l, c in zip("ABC", choix)])
        neuves.arrange(DOWN, buff=0.1).next_to(q, DOWN, buff=0.22).set_x(-0.89)
        self.cartes_q = neuves
        pause.next_to(neuves, DOWN, buff=0.15).set_x(0)
        ph.next_to(neuves, DOWN, buff=0.15).set_x(0)
        return tete, q, neuves, pause, rebours, ph

    def legende(self, s, couleur=WHITE, fs=32, y=ECRIT[0]):
        return self.ligne([(s, couleur)], fs).move_to(P(0, y))

    def angle_haut(self, k=1):
        """L'angle sous la loupe ; k = 1 : petit, k = 3 : côtés 3 fois plus longs."""
        a = ang(C_L + P(-0.62, -0.2), 0, 30, longueur=0.45, rayon_arc=0.4, sw=7)
        a.t_long.set_value(k)
        return a.maj()

    def angle_bas(self, k=1):
        a = ang(S_BAS, 0, 30, longueur=1.1, rayon_arc=0.85, sw=9)
        a.t_long.set_value(k)
        return a.maj()

    def ecrire_30(self):
        return self.t("30°", 38, ARC).move_to(S_BAS + P(0.72, 0.98))

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Sous la loupe", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.au_mot("Une loupe")
        lp = Loupe()
        bete = coccinelle(C_L, 0.8)
        self.play(Write(titre), FadeIn(bete, scale=0.4), run_time=0.45)
        l1 = self.legende("Une loupe grossit tout.")
        self.play(FadeIn(lp, shift=LEFT * 0.55), FadeIn(l1, shift=UP * 0.1), run_time=0.45)
        self.au_mot("tout.")
        self.play(bete.animate.scale(3), run_time=0.4)
        self.au_mot("Vraiment")
        q = self.t("Vraiment tout ?", 32, JAUNE_TITRE).move_to(P(0, -1.2))
        self.play(FadeIn(q, scale=1.3), run_time=0.3)
        self.insister(q, 1.15)
        self.attendre_voix(marge=0.1)
        self.vider(garder)

        # ── 01 : la loupe sur l'angle ──
        self.dire("01-loupe")
        h, b = self.angle_haut(), self.angle_bas()
        e30 = self.ecrire_30()
        self.au_mot("Voici un angle")
        l0 = meme_base(self.ligne([("Un angle de", WHITE), ("30°", ARC)], 32)).move_to(P(0, ECRIT[0]))
        self.play(*poser(h), *poser(b), FadeIn(l0[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("30")
        self.play(FadeIn(l0[1], scale=1.3), FadeIn(e30, scale=1.3), run_time=0.3)
        self.au_mot("tout petit")
        l1 = self.legende("tout petit", AMBRE, 36)
        self.play(FadeOut(l0), run_time=0.12)
        self.play(FadeIn(l1, scale=1.2), run_time=0.2)
        self.au_mot("On le passe")
        lp = Loupe()
        self.play(FadeIn(lp, shift=LEFT * 0.55), FadeOut(l1), run_time=0.5)
        self.play(lp.animate.shift(LEFT * 0.3), run_time=0.25)
        self.play(lp.animate.shift(RIGHT * 0.3), run_time=0.25)
        self.au_mot("grossit 3")
        l2 = self.legende("grossit 3 fois", AMBRE, 36)
        self.play(FadeIn(l2, shift=UP * 0.1), lp.anneau.animate.set_stroke(AMBRE), run_time=0.3)
        self.play(lp.anneau.animate.set_stroke("#e2e8f0"), run_time=0.3)
        self.au_mot("Les côtés")
        self.play(FadeOut(l2), run_time=0.12)
        self.play(Indicate(h.cote1, color=WHITE), Indicate(h.cote2, color=WHITE), Indicate(b.cote1, color=WHITE, scale_factor=1),
                  Indicate(b.cote2, color=WHITE, scale_factor=1), run_time=0.5)
        self.au_mot("3 fois plus")
        l3 = self.legende("3 fois plus longs", COTE, 36)
        self.play(FadeIn(l3, shift=UP * 0.1), h.t_long.animate.set_value(3), b.t_long.animate.set_value(3), run_time=1.0)
        self.insister(e30, 1.25)
        self.attendre_voix(marge=0.1)
        self.vider(garder)

        # ── 02 : la question-pause (3 s) ──
        cq = P(1.22, -0.5)
        lq = Loupe(cq, 0.82)
        lq.manche.put_start_and_end_on(cq + polaire(-68, 0.85), cq + polaire(-68, 1.5))
        aq = ang(cq + P(-0.62, -0.2), 0, 30, longueur=1.35, rayon_arc=0.4, sw=7)
        reponse = self.t("30°", 26, VERT_OK).move_to(cq + P(-0.15, 0.48))

        def avant(sc):
            sc.play(FadeIn(lq, scale=0.8), *poser(aq), run_time=0.35)

        def apres(sc):
            sc.au_mot("Toujours")
            sc.play(aq.arc.animate.set_stroke(width=13), run_time=0.2)
            sc.au_mot("30")
            sc.rep(0, avec=[FadeIn(reponse, scale=1.4), aq.arc.animate.set_stroke(width=7)])
            sc.rep_fin()

        self.question_pause("02-question", "02b-reponse", ["Sous la loupe, combien", "mesure l'angle ?"],
                            [self.t("30°", 24), self.t("33°", 24), self.t("90°", 24)], 0, ["Toujours 30° !"],
                            mot_q="Sous", avant_q=avant, autres_r=apres)
        self.vider(garder)

        # ── 03 : pourquoi ──
        self.dire("03-pourquoi")
        lp, h, b = Loupe(), self.angle_haut(3), self.angle_bas(3)
        e30 = self.ecrire_30()
        e30._pas_audit = True
        self.add(lp, *[m for m in (h.fond, h.arc, h.cote1, h.cote2, h.point, b.fond, b.arc, b.cote1, b.cote2, b.point, e30)])
        self.au_mot("Les côtés")
        l1 = self.legende("Les côtés sont", WHITE, 32)
        l1b = self.legende("plus longs,", COTE, 32, ECRIT[1])
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(b.cote1, color=WHITE, scale_factor=1), Indicate(b.cote2, color=WHITE, scale_factor=1), run_time=0.4)
        self.au_mot("plus longs")
        self.play(FadeIn(l1b, shift=UP * 0.1), run_time=0.25)
        self.au_mot("mais l'ouverture")
        l2 = self.legende("mais l'ouverture", ARC, 32)
        self.play(FadeOut(VGroup(l1, l1b)), run_time=0.1)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.2)
        self.au_mot("ne change")
        l3 = self.legende("ne change pas.", ARC, 32, ECRIT[1])
        # les côtés reculent puis repoussent : l'arc, lui, ne bouge pas
        self.play(FadeIn(l3, shift=UP * 0.1), h.t_long.animate.set_value(1.4), b.t_long.animate.set_value(1.4),
                  b.arc.animate.set_stroke(width=14), h.arc.animate.set_stroke(width=11), run_time=0.5)
        self.play(h.t_long.animate.set_value(3), b.t_long.animate.set_value(3), b.arc.animate.set_stroke(width=9),
                  h.arc.animate.set_stroke(width=7), run_time=0.5)
        self.au_mot("Un angle")
        m1 = self.legende("Un angle ne", WHITE, 32)
        self.play(FadeOut(VGroup(l2, l3)), run_time=0.1)
        self.play(FadeIn(m1, shift=UP * 0.1), run_time=0.2)
        self.au_mot("se mesure")
        m1b = self.legende("se mesure pas", WHITE, 32, ECRIT[1])
        self.play(FadeIn(m1b, shift=UP * 0.1), run_time=0.25)
        self.au_mot("avec la longueur")
        m2 = self.legende("avec la longueur", COTE, 32)
        self.play(FadeOut(VGroup(m1, m1b)), run_time=0.1)
        self.play(FadeIn(m2, shift=UP * 0.1), run_time=0.2)
        self.au_mot("de ses côtés")
        m3 = self.legende("de ses côtés.", COTE, 32, ECRIT[1])
        self.play(FadeIn(m3, shift=UP * 0.1), Indicate(b.cote1, color=WHITE, scale_factor=1), Indicate(b.cote2, color=WHITE, scale_factor=1), run_time=0.4)
        self.attendre_voix(marge=0.1)
        self.vider(garder)

        # ── 04 : la question en commentaire ──
        self.dire("04-commentaire")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 46, JAUNE_TITRE).move_to(C_L)
        self.play(FadeIn(et, scale=1.3), run_time=0.3)
        self.au_mot("Un angle")
        lp = Loupe()
        a45 = ang(C_L + P(-0.5, -0.32), 0, 45, longueur=1.05, rayon_arc=0.32, sw=7)
        c1 = meme_base(self.ligne([("Un angle de", WHITE), ("45°,", ARC)], 32)).move_to(P(0, 0.25))
        self.play(FadeOut(et), FadeIn(lp, scale=0.8), *poser(a45), FadeIn(c1[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("45")
        self.play(FadeIn(c1[1], scale=1.3), run_time=0.3)
        self.au_mot("sous une loupe")
        c2 = self.legende("sous une loupe", WHITE, 32, -0.25)
        self.play(FadeIn(c2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("qui grossit")
        c3 = self.legende("qui grossit 10 fois :", AMBRE, 32, -0.75)
        self.play(FadeIn(c3, shift=UP * 0.1), run_time=0.3)
        self.au_mot("combien")
        c4 = self.legende("combien de degrés ?", ORANGE_RETENUE, 34, -1.25)
        self.play(FadeIn(c4, shift=UP * 0.1), run_time=0.3)
        self.appel_commentaire(y=-2.05)
