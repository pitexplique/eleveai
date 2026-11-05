# angle_comparer.py
# EleveAI — Maths 6e — série « Angles », épisode 03 : COMPARER DES ANGLES
# (micro angle_comparer, notion angle_mesure), AVEC VOIX. Paysage 16:9, CEINTURE
# VERTE. Short jumeau : angle_comparer_short.py (blanche, la loupe).
# Décor et métier : Jade, ANALYSTE VIDÉO dans un club de foot (centre : sport).
# Échelle juste : but de 7,32 m, points de tir à 11 m et à 5,5 m ; les angles
# dessinés valent vraiment 37° et 67° (arrondis, « environ »).
# Micro → écrans : situation (01), les deux angles (02), comparer les mesures (03),
# QUESTION 1 (04), superposer (05), repère angle droit (06), QUESTION 2 (07),
# défi (08) et correction (08b), appris (09), fin (10).
# Voix : manim/voix/6e-angle-comparer.json (validée, débit −6) ; WAV :
# public/sons/6e-angle-comparer/ ; marques : angle_comparer_marques.json.
# Outils : prop_commun.py + manim/canvas_angles.py. Ajouté ICI : terrain(), balle(),
# jade(), mini_but(), ang(), montrer(), muet(), tampon2().
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/angle_comparer.py AngleComparer6e
# python -m manim render -qh --disable_caching manim/scripts/6e/angle_comparer.py AngleComparer6e -o eleveai-maths-6e-angle-comparer --media_dir manim/scripts/6e/media-angle-03
# Sortie : manim/sorties/6e/maths/angles/03-comparer/eleveai-maths-6e-angle-comparer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403
from canvas_angles import *  # noqa: E402,F403

PELOUSE = "#14532d"
K_M = 0.46  # unités par mètre : tout le terrain est à l'échelle
X_BUT = 4.7
DEMI_BUT = 3.66 * K_M
P_PEN = P(X_BUT - 11 * K_M, 0)
P_PRES = P(X_BUT - 5.5 * K_M, 0)
X_G = -4.25  # le centre de la colonne de gauche (à côté du terrain)
PALE = "#fde68a"  # l'angle qu'on déplace, pour le distinguer de l'autre


def demi_angle(p):
    return np.degrees(np.arctan2(DEMI_BUT, X_BUT - p[0]))


def terrain():
    """Le terrain vu de dessus (échelle K_M), derrière tout le reste."""
    t = VGroup()
    t.add(Rectangle(width=7.1, height=6.2, fill_color=PELOUSE, fill_opacity=1, stroke_color="#bbf7d0",
                    stroke_width=3).move_to(P(1.65, 0)))
    t.add(Line(P(X_BUT, -3.1), P(X_BUT, 3.1), color="#bbf7d0", stroke_width=3))
    filet = VGroup(Rectangle(width=0.36, height=2 * DEMI_BUT, stroke_color=WHITE, stroke_width=2).move_to(P(X_BUT + 0.18, 0)))
    for k in range(1, 8):
        y = -DEMI_BUT + k * 2 * DEMI_BUT / 8
        filet.add(Line(P(X_BUT, y), P(X_BUT + 0.36, y), color=WHITE, stroke_width=1, stroke_opacity=0.6))
    t.add(filet)
    t.poteaux = VGroup(*[Dot(P(X_BUT, s * DEMI_BUT), radius=0.09, color=WHITE) for s in (-1, 1)])
    t.add(t.poteaux)
    t.set_z_index(-2)
    t.poteaux.set_z_index(1)
    return t


def balle(p, r=0.13):
    b = VGroup(Circle(radius=r, fill_color=WHITE, fill_opacity=1, stroke_color="#0f172a", stroke_width=2),
               RegularPolygon(5, radius=r * 0.42, fill_color="#0f172a", fill_opacity=1, stroke_width=0))
    return b.move_to(p)


def jade(s=1.0):
    """Jade, analyste vidéo : une tablette où un mini-terrain s'affiche."""
    p = visage(personne(peau="#c68642", tenue="#2563eb", cheveux="#111827", longs=True, s=s))
    tab = RoundedRectangle(width=1.0 * s, height=0.7 * s, corner_radius=0.05 * s, fill_color="#0f172a", fill_opacity=1,
                           stroke_color=WHITE, stroke_width=3).move_to(p.corps.get_center() + P(0.12, -0.05) * s)
    pel = Rectangle(width=0.8 * s, height=0.5 * s, fill_color="#166534", fill_opacity=1, stroke_width=0).move_to(tab)
    pt = Dot(pel.get_center() + LEFT * 0.2 * s, radius=0.04 * s, color=SOMMET)
    tr = VGroup(*[Line(pt.get_center(), pel.get_right() + UP * y * s, color=COTE, stroke_width=2.5) for y in (-0.12, 0.12)])
    p.add(tab, pel, tr, pt)
    return p


def mini_but(l, h=0.62, centre=ORIGIN):
    """Le but vu de face, de largeur l : ce que voit le tireur."""
    g = VGroup()
    for k in range(1, 5):
        x = -l / 2 + k * l / 5
        g.add(Line(P(x, 0), P(x, h), color=WHITE, stroke_width=1, stroke_opacity=0.5))
    g.add(VMobject(stroke_color=WHITE, stroke_width=6).set_points_as_corners([P(-l / 2, 0), P(-l / 2, h), P(l / 2, h), P(l / 2, 0)]))
    return g.move_to(centre)


def ang(*a, **k):
    """Un Angle dont l'arc passe DERRIÈRE les côtés (leçon 16 du pilote)."""
    an = Angle(*a, **k)
    an.arc.set_z_index(-1)
    an.fond.set_z_index(-1)
    return an


def montrer(a, cotes=True):
    """Les animations qui font entrer l'angle, morceau par morceau (sans étiquette)."""
    a.maj()
    mor = [FadeIn(a.point, scale=2)]
    if cotes:
        mor += [FadeIn(a.cote1), FadeIn(a.cote2)]
    return mor


def arc_de(a):
    a.maj()
    return [FadeIn(a.fond), Create(a.arc)]


def couleur_arc(a, c):
    return [a.arc.animate.set_stroke(c), a.fond.animate.set_fill(c)]


def muet(m):
    """Pas d'attente de synchro pour ces textes (ils sont posés AU MOT par le script)."""
    for f in m.get_family():
        if isinstance(f, Text):
            f.sans_synchro = True
    return m


def meme_base(lg):
    """Les morceaux d'une ligne sur la MÊME ligne de base (arrange les centre : « et » ou
    « DEF » ne tombaient pas au niveau du reste). Renvoie la ligne."""
    base = lambda l: float(np.median([m.get_bottom()[1] for m in (l.submobjects or [l])]))
    b0 = base(lg[0])
    for l in lg:
        l.shift(UP * (b0 - base(l)))
    return lg


def tampon2(lignes, couleur, fs=38):
    """Un verdict sur 2 lignes : VGroup de Text + rectangle, même centre (leçon 14)."""
    txt = interligne_regulier(VGroup(*[Text(s, font_size=fs, color=couleur, weight=BOLD) for s in lignes]).arrange(DOWN, buff=0.14))
    return VGroup(SurroundingRectangle(txt, color=couleur, buff=0.2, corner_radius=0.12, stroke_width=5), txt)


class AngleComparerBase(PaysageProp):
    nom_voix = "6e-angle-comparer"
    fichier_marques = "angle_comparer_marques.json"
    _crochet_a = None

    def au_mot(self, extrait, n=1):
        if extrait == "A :" and self._crochet_a:  # un dessin juste avant le choix A
            f, self._crochet_a = self._crochet_a, None
            f()
        super().au_mot(extrait, n)

    def _disposer_q(self, question, choix, phrase):
        res = super()._disposer_q(question, choix, phrase)
        self.q_ = res[1]
        if len(question) == 1:  # une seule ligne : les cartes montent, la réponse a sa place
            for m in res[2], res[3], res[5]:
                m.shift(UP * 0.3)
        return res

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Comparer des angles", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Comparer")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Le plus grand angle", "a-t-il les plus longs côtés ?"], 38).move_to(P(-3.05, 0.45))
        loin = ang(P(1.0, -1.25), 0, 22, longueur=3.7, rayon_arc=1.1, sw=7)
        court = ang(P(3.95, 0.45), 0, 112, longueur=1.45, rayon_arc=0.55, sw=7)
        self.au_mot("Le plus grand")
        self.play(FadeIn(q[0], shift=UP * 0.2), *montrer(loin), *montrer(court), run_time=0.4)
        self.play(*arc_de(loin), *arc_de(court), run_time=0.35)
        self.au_mot("a-t-il")
        self.play(FadeIn(q[1], shift=UP * 0.2), run_time=0.3)
        self.play(Indicate(loin.cote1, color=WHITE), Indicate(loin.cote2, color=WHITE), run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 01 : Jade, analyste vidéo ───────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        j = jade(1.15).move_to(P(X_G, 0.3))
        self.au_mot("Voici Jade")
        nom = self.t("Jade", 44, BLEU_CALCUL).next_to(j, UP, buff=0.18).set_x(X_G)
        self.play(FadeIn(j, shift=UP * 0.3), FadeIn(nom), run_time=0.5)
        self.au_mot("analyste")
        m1 = self.t("analyste vidéo", 30, BLEU_CALCUL).next_to(j, DOWN, buff=0.15).set_x(X_G)
        self.play(FadeIn(m1, shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("club de foot")
        m2 = self.t("club de foot", 30, BLEU_CALCUL).next_to(m1, DOWN, buff=0.1).set_x(X_G)
        ter = terrain()
        self.play(FadeIn(m2, shift=DOWN * 0.1), FadeIn(ter), run_time=0.5)
        self.au_mot("deux tirs")
        dt = self.t("deux tirs", 34, AMBRE).next_to(m2, DOWN, buff=0.18).set_x(X_G)
        self.play(FadeIn(dt, scale=1.2), run_time=0.3)
        # le premier tir : la balle au point de penalty
        self.au_mot("Le premier")
        pt1, b1 = Dot(P_PEN, radius=0.1, color=SOMMET), balle(P_PEN)
        self.play(FadeIn(pt1), FadeIn(b1, scale=2), run_time=0.3)
        self.au_mot("point de penalty")
        lp = VGroup(self.t("point de", 26), self.t("penalty", 26)).arrange(DOWN, buff=0.08)
        interligne_regulier(lp).next_to(P_PEN, DOWN, buff=0.28)
        self.play(FadeIn(lp, shift=UP * 0.1), run_time=0.3)
        self.au_mot("à 11")
        d1 = DoubleArrow(P(P_PEN[0], -2.3), P(X_BUT, -2.3), buff=0, color=WHITE, stroke_width=3, tip_length=0.18)
        l1 = self.t("11 m", 32).next_to(d1, DOWN, buff=0.12)
        self.play(GrowFromCenter(d1), FadeIn(l1, scale=1.3), run_time=0.35)
        self.au_mot("du but")
        self.play(b1.animate.move_to(P(X_BUT + 0.17, 0.75)), run_time=0.45, rate_func=rush_into)
        self.play(Flash(b1, color=WHITE, line_length=0.2, flash_radius=0.3), run_time=0.35)
        # le second tir : plus près
        self.au_mot("Le second")
        pt2, b2 = Dot(P_PRES, radius=0.1, color=SOMMET), balle(P_PRES)
        self.play(FadeIn(pt2), FadeIn(b2, scale=2), run_time=0.3)
        self.au_mot("de plus près")
        lq = self.t("de plus près", 26).next_to(P_PRES, DOWN, buff=0.28)
        self.play(FadeIn(lq, shift=UP * 0.1), run_time=0.3)
        self.au_mot("à 5")
        d2 = DoubleArrow(P(P_PRES[0], 2.3), P(X_BUT, 2.3), buff=0, color=WHITE, stroke_width=3, tip_length=0.18)
        l2 = self.ligne([("5 m", WHITE), ("et demi", WHITE)], 28, buff=0.12)
        meme_base(l2).next_to(d2, UP, buff=0.12)
        self.play(GrowFromCenter(d2), FadeIn(l2[0], scale=1.3), run_time=0.35)
        self.au_mot("et demi")
        self.play(FadeIn(l2[1], shift=LEFT * 0.1), b2.animate.move_to(P(X_BUT + 0.17, -0.75)), run_time=0.4)
        self.play(Flash(b2, color=WHITE, line_length=0.2, flash_radius=0.3), run_time=0.3)
        self.attendre_voix()

    # ── 02 : les deux angles, vers les poteaux ──────────────────────────────
    def ecran_angles(self):
        self.ecran("02-angles")
        ter = terrain()
        self.add(ter)
        d1, d2 = demi_angle(P_PEN), demi_angle(P_PRES)
        a1 = ang(P_PEN, -d1, d1, longueur=float(np.hypot(X_BUT - P_PEN[0], DEMI_BUT)), rayon_arc=1.05, sw=7)
        a2 = ang(P_PRES, -d2, d2, longueur=float(np.hypot(X_BUT - P_PRES[0], DEMI_BUT)), rayon_arc=0.72, sw=7)
        self.au_mot("Depuis chaque point")
        self.play(FadeIn(a1.point, scale=2.5), FadeIn(a2.point, scale=2.5), run_time=0.35)
        self.au_mot("deux traits")
        lt = self.t("deux traits vers les poteaux", 28).move_to(P(1.65, 2.62))
        self.play(FadeIn(lt, shift=DOWN * 0.1), Create(a1.cote1[0]), Create(a1.cote2[0]), Create(a2.cote1[0]),
                  Create(a2.cote2[0]), run_time=0.7)
        self.add(a1.cote1, a1.cote2, a2.cote1, a2.cote2)
        self.au_mot("poteaux")
        self.play(*[Flash(p, color=WHITE, line_length=0.18, flash_radius=0.22) for p in ter.poteaux], run_time=0.45)
        self.au_mot("Au penalty")
        g1 = self.t("Au penalty :", 34).move_to(P(X_G, 2.55))
        self.play(FadeIn(g1, shift=UP * 0.1), FadeOut(lt), a2.cote1[0].animate.set_opacity(0.2),
                  a2.cote2[0].animate.set_opacity(0.2), a2.point.animate.set_opacity(0.2), run_time=0.35)
        self.au_mot("l'angle mesure")
        self.play(*arc_de(a1), run_time=0.45)
        self.au_mot("environ 37")
        v1 = self.t("environ 37°", 44, ARC).move_to(P(X_G, 1.9))
        e1 = self.t("37°", 34, ARC).move_to(P_PEN + RIGHT * 1.72)
        self.play(FadeIn(v1, scale=1.25), FadeIn(e1, scale=1.25), run_time=0.3)
        self.au_mot("De plus près")
        g2 = self.t("De plus près :", 34).move_to(P(X_G, 0.85))
        self.play(FadeIn(g2, shift=UP * 0.1), a2.cote1[0].animate.set_opacity(1), a2.cote2[0].animate.set_opacity(1),
                  a2.point.animate.set_opacity(1), a1.cote1[0].animate.set_opacity(0.3), a1.cote2[0].animate.set_opacity(0.3),
                  run_time=0.35)
        self.play(*arc_de(a2), run_time=0.4)
        self.au_mot("environ 67")
        v2 = self.t("environ 67°", 44, ARC).move_to(P(X_G, 0.2))
        e2 = self.t("67°", 34, ARC).move_to(P_PRES + RIGHT * 1.3)
        self.play(FadeIn(v2, scale=1.25), FadeIn(e2, scale=1.25), run_time=0.3)
        self.au_mot("L'angle est")
        o = self.t("L'angle est plus ouvert :", 25).move_to(P(X_G, -0.85))
        self.play(FadeIn(o, shift=UP * 0.1), run_time=0.3)
        self.play(e2.animate.scale(1.4), v2.animate.scale(1.15), run_time=0.22)
        self.play(e2.animate.scale(1 / 1.4), v2.animate.scale(1 / 1.15), run_time=0.22)
        self.au_mot("le but paraît")
        l_ = self.t("le but paraît plus large.", 25).move_to(P(X_G, -1.35))
        petit = mini_but(0.95, centre=P(X_G - 1.4, -2.4))
        grand = mini_but(1.72, centre=P(X_G + 0.95, -2.4))
        fl = Arrow(petit.get_right(), grand.get_left(), buff=0.12, color=AMBRE, stroke_width=4, tip_length=0.18)
        self.play(FadeIn(l_, shift=UP * 0.1), FadeIn(petit), run_time=0.3)
        self.play(GrowArrow(fl), FadeIn(grand, scale=0.5), run_time=0.45)
        self.attendre_voix()

    # ── 03 : comparer les mesures ───────────────────────────────────────────
    def ecran_methode(self):
        self.ecran("03-methode")
        a1 = ang(P(-6.0, -1.2), 0, 6, longueur=2.7, rayon_arc=1.15, sw=8, mesure="30°", fs=40)
        a2 = ang(P(-2.9, -1.2), 0, 6, longueur=2.7, rayon_arc=0.75, sw=8, mesure="80°", fs=40)
        xl = 0.3
        lg = self.bloc(["Pour comparer deux angles,", "on compare leurs mesures."], 34)
        self.col(lg, 2.45, xl=xl)
        self.au_mot("Pour comparer")
        self.play(FadeIn(lg[0], shift=UP * 0.15), run_time=0.3)
        self.au_mot("deux angles")
        self.play(*montrer(a1), *montrer(a2), run_time=0.3)
        self.play(a1.ouvrir(30), a2.ouvrir(80), run_time=0.5)
        self.au_mot("on compare")
        a1.maj(); a2.maj()
        self.play(FadeIn(lg[1], shift=UP * 0.15), *arc_de(a1), *arc_de(a2), run_time=0.4)
        l30 = meme_base(self.ligne([("30°", ARC), ("et", WHITE), ("80°", ARC)], 46, buff=0.28))
        self.col(l30, 1.1, xl=xl)
        self.au_mot("30")
        self.play(FadeIn(l30[0], scale=1.3), FadeIn(a1.etiquette, scale=1.3), run_time=0.3)
        self.au_mot("et 80")
        self.play(FadeIn(l30[1]), run_time=0.12)
        self.au_mot("80")
        self.play(FadeIn(l30[2], scale=1.3), FadeIn(a2.etiquette, scale=1.3), run_time=0.3)
        self.au_mot("80", 2)
        c = self.t("80 est plus grand que 30.", 36)
        self.col(c, 0.25, xl=xl)
        self.play(FadeIn(c, shift=UP * 0.15), run_time=0.35)
        self.play(a2.etiquette.animate.scale(1.5), l30[2].animate.scale(1.3), run_time=0.22)
        self.play(a2.etiquette.animate.scale(1 / 1.5), l30[2].animate.scale(1 / 1.3), run_time=0.22)
        self.au_mot("L'angle de")
        v = tampon2(["L'angle de 80°", "est le plus grand."], VERT_OK, 36)
        self.col(v, -1.1, xl=xl)
        self.play(FadeIn(v, scale=1.2), *couleur_arc(a2, VERT_OK), run_time=0.4)
        self.insister(v, 1.06, 0.2)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (70° à longs côtés, 120° à côtés courts) ────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        a = ang(P(-6.0, -1.95), 0, 70, longueur=3.8, rayon_arc=0.8, sw=8, mesure="70°", fs=38)
        b = ang(P(-1.55, -1.95), 0, 120, longueur=1.3, rayon_arc=0.5, sw=8, mesure="120°", fs=34)
        tl = self.t("longs côtés", 30, COTE).move_to(P(-4.1, -2.5))
        tc = self.t("côtés courts", 30, COTE).move_to(P(-1.2, -2.5))

        def avant(sc):
            sc.play(*montrer(a), *montrer(b), run_time=0.35)
            sc.au_mot("L'un mesure")
            sc.play(*arc_de(a), run_time=0.35)
            sc.au_mot("70")
            sc.play(FadeIn(a.etiquette, scale=1.3), run_time=0.3)
            sc.au_mot("longs côtés")
            sc.play(FadeIn(tl, shift=UP * 0.1), Indicate(a.cote1, color=WHITE), Indicate(a.cote2, color=WHITE), run_time=0.45)
            sc.au_mot("L'autre mesure")
            sc.play(*arc_de(b), run_time=0.35)
            sc.au_mot("120")
            sc.play(FadeIn(b.etiquette, scale=1.3), run_time=0.3)
            sc.au_mot("côtés courts")
            sc.play(FadeIn(tc, shift=UP * 0.1), Indicate(b.cote1, color=WHITE), Indicate(b.cote2, color=WHITE), run_time=0.45)
            sc.au_mot("Lequel")

        def apres(sc):
            sc.play(*couleur_arc(b, VERT_OK), run_time=0.3)
            sc.au_mot("La longueur")
            sc.rep(0, avec=[FadeOut(tl), FadeOut(tc), a.t_long.animate.set_value(0.55), b.t_long.animate.set_value(1.5)])
            sc.au_mot("ne compte")
            sc.rep(1)
            sc.au_mot("Seule")
            sc.rep(2, avec=[a.arc.animate.set_stroke(width=13), b.arc.animate.set_stroke(width=13)])
            sc.play(a.arc.animate.set_stroke(width=8), b.arc.animate.set_stroke(width=8), run_time=0.3)
            sc.rep_fin()

        self.question_pause("04-question", "04b-reponse", ["Lequel est le plus grand ?"],
                            [self.t("70°", 34), self.t("120°", 34), self.t("ils sont égaux", 34)], 1,
                            ["La longueur des côtés", "ne compte pas.", "Seule l'ouverture compte."], mot_q="Voici",
                            avant_q=avant, autres_r=apres)

    # ── 05 : sans mesure : superposer ───────────────────────────────────────
    def ecran_superposer(self):
        self.ecran("05-superposer")
        s = P(-5.8, -2.3)
        grand = ang(s, 0, 85, longueur=4.3, rayon_arc=1.25, sw=9)
        petit = ang(P(-2.6, -1.5), 22, 72, longueur=3.0, rayon_arc=0.8, sw=9, couleur=PALE, couleur_arc=PALE)
        xl = 0.6
        self.au_mot("Et sans mesure")
        tit = self.t("Et sans mesure ?", 46, JAUNE_TITRE)
        self.col(tit, 2.7, xl=xl)
        self.play(Write(tit), *montrer(grand), *montrer(petit), run_time=0.45)
        self.play(*arc_de(grand), *arc_de(petit), run_time=0.4)
        self.au_mot("On pose")
        l1 = self.t("On pose un angle sur l'autre :", 32)
        self.col(l1, 1.8, xl=xl)
        self.play(FadeIn(l1, shift=UP * 0.12), run_time=0.3)
        self.au_mot("sommet sur sommet")
        l2 = self.t("sommet sur sommet,", 36, SOMMET)
        self.col(l2, 1.1, xl=xl)
        self.play(FadeIn(l2, shift=UP * 0.12), petit.tx.animate.set_value(s[0]), petit.ty.animate.set_value(s[1]), run_time=0.75)
        self.play(Flash(s, color=SOMMET, line_length=0.25), run_time=0.3)
        self.au_mot("un côté sur")
        l3 = self.t("un côté sur un côté.", 36, COTE)
        self.col(l3, 0.45, xl=xl)
        self.play(FadeIn(l3, shift=UP * 0.12), petit.t1.animate.set_value(0), petit.t2.animate.set_value(50), run_time=0.75)
        self.au_mot("Celui qui")
        # le côté qui dépasse s'allume, avec le morceau d'ouverture en plus
        plus = AnnularSector(inner_radius=0, outer_radius=3.0, start_angle=np.deg2rad(50), angle=np.deg2rad(35), arc_center=s,
                             fill_color=VERT_OK, fill_opacity=0.32, stroke_width=0).set_z_index(-1)
        v = tampon2(["Celui qui dépasse", "est le plus grand."], VERT_OK, 36)
        self.col(v, -0.85, xl=xl)
        # la 1re ligne seule, puis le cadre avec la 2e, à son mot : jamais de cadre à moitié vide
        self.play(FadeIn(plus), grand.cote2[0].animate.set_color(VERT_OK), FadeIn(v[1][0], shift=UP * 0.12), run_time=0.45)
        self.play(grand.cote2[0].animate.set_stroke(width=15), run_time=0.22)
        self.play(grand.cote2[0].animate.set_stroke(width=9), run_time=0.22)
        self.au_mot("est le plus")
        self.play(FadeIn(v[1][1], shift=UP * 0.12), Create(v[0]), run_time=0.4)
        self.attendre_voix()

    # ── 06 : le repère : l'angle droit ──────────────────────────────────────
    def ecran_repere(self):
        self.ecran("06-repere")
        s = P(-2.6, -2.4)
        a = ang(s, 0, 90, longueur=3.7, rayon_arc=0.95, sw=9)
        rep = DashedLine(s, polaire(90, 3.7, s), color=FAMILLE["droit"], stroke_width=5).set_z_index(1)
        xl = 1.35
        self.au_mot("Autre repère")
        l0 = self.t("Autre repère :", 36)
        self.col(l0, 2.6, xl=xl)
        self.play(FadeIn(l0, shift=UP * 0.12), *montrer(a), run_time=0.35)
        self.au_mot("l'angle droit")
        l1 = self.t("l'angle droit", 44, FAMILLE["droit"])
        self.col(l1, 1.95, xl=xl)
        self.play(FadeIn(l1, scale=1.2), FadeIn(a.coin), run_time=0.35)
        self.insister(l1, 1.15, 0.15)
        self.au_mot("Plus petit")
        zone_a = AnnularSector(inner_radius=0, outer_radius=3.7, start_angle=0, angle=PI / 2, arc_center=s,
                               fill_color=FAMILLE["aigu"], fill_opacity=0.14, stroke_width=0).set_z_index(-2)
        l2 = muet(self.t("Plus petit que 90°", 36))
        self.col(l2, 0.85, xl=xl)
        self.add(rep)
        self.add(a.arc, a.fond)
        self.play(a.ouvrir(52), FadeIn(zone_a), run_time=0.8)
        self.au_mot("90")
        self.play(FadeIn(l2, shift=UP * 0.12), run_time=0.3)
        self.au_mot("aigu")
        n1 = self.t("aigu", 48, FAMILLE["aigu"])
        self.col(n1, 0.15, xl=xl)
        self.play(FadeIn(n1, scale=1.3), *couleur_arc(a, FAMILLE["aigu"]), run_time=0.3)
        self.insister(n1, 1.2, 0.15)
        self.au_mot("Plus grand")
        zone_o = AnnularSector(inner_radius=0, outer_radius=3.7, start_angle=PI / 2, angle=PI / 2, arc_center=s,
                               fill_color=FAMILLE["obtus"], fill_opacity=0.14, stroke_width=0).set_z_index(-2)
        l3 = muet(self.t("Plus grand que 90°", 36))
        self.col(l3, -0.85, xl=xl)
        self.play(a.ouvrir(128), FadeOut(zone_a), FadeIn(zone_o), *couleur_arc(a, FAMILLE["obtus"]), run_time=0.8)
        self.au_mot("90", 2)
        self.play(FadeIn(l3, shift=UP * 0.12), run_time=0.3)
        self.au_mot("obtus")
        n2 = self.t("obtus", 48, FAMILLE["obtus"])
        self.col(n2, -1.55, xl=xl)
        self.play(FadeIn(n2, scale=1.3), run_time=0.3)
        self.insister(n2, 1.2, 0.15)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (118° comparé à l'angle droit) ──────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        s = P(-3.0, -1.9)
        a = ang(s, 0, 25, longueur=3.3, rayon_arc=0.85, sw=8, mesure="118°", fs=38)
        rep = DashedLine(s, polaire(90, 3.3, s), color=FAMILLE["droit"], stroke_width=5).set_z_index(1)
        l90 = self.t("90°", 34, FAMILLE["droit"]).next_to(rep.get_end(), UP, buff=0.12)

        def avant(sc):
            sc.play(*montrer(a), run_time=0.25)
            sc.add(a.arc, a.fond)
            sc.play(a.ouvrir(118), run_time=0.6)
            sc.au_mot("118")
            q0 = muet(self.q_[0])
            self.q_.remove(q0)  # la 1re ligne arrive ici, au nombre ; la suite par question_pause
            sc.play(FadeIn(a.etiquette, scale=1.3), FadeIn(q0, shift=UP * 0.15), run_time=0.3)

        def droit():
            self.play(Create(rep), run_time=0.4)

        def apres(sc):
            # même taille pour les deux lignes, jusqu'à Ti-Margo sans le toucher
            l1 = meme_base(sc.ligne_rep(0, ["118", "est plus grand", "que 90."], fs=27))
            naturel = self.ligne([(x, VERT_OK) for x in ("118", "est plus grand", "que 90.")], 27, buff=0.14).width
            g = l1.get_left()[0]
            l1.scale_to_fit_width(5.4 - g).align_to(P(g, 0), LEFT)
            l2 = sc.ligne_rep(1, ["Cet angle est obtus."], fs=27 * l1.width / naturel)
            sc.au_mot("118")
            sc.play(FadeIn(l1[0], scale=1.3), a.etiquette.animate.scale(1.25), run_time=0.3)
            sc.au_mot("plus grand")
            sc.play(FadeIn(l1[1]), a.etiquette.animate.scale(1 / 1.25), run_time=0.25)
            sc.au_mot("que 90")
            sc.play(FadeIn(l1[2]), FadeIn(l90, scale=1.3), run_time=0.3)
            sc.au_mot("Cet angle")
            sc.play(FadeIn(l2[0], shift=UP * 0.12), *couleur_arc(a, FAMILLE["obtus"]), run_time=0.3)
            sc.rep_fini()

        self._crochet_a = droit
        self.question_pause("07-question", "07b-reponse", ["Un angle mesure 118°.", "Comparé à un angle droit,", "il est :"],
                            [self.t("plus petit", 34), self.t("égal", 34), self.t("plus grand", 34)], 2,
                            ["118 est plus grand que 90.", "Cet angle est obtus."], mot_q="Un angle", avant_q=avant,
                            autres_r=apres)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    Y_DEFI = 0.45
    X_ABC, X_DEF, X_GHI = -5.5, -2.2, 2.9

    def figures_defi(self):
        y = self.Y_DEFI
        a = ang(P(self.X_ABC, y), 0, 95, longueur=2.2, noms=("A", "B", "C"), rayon_arc=0.6, sw=8, fs=36)
        d = ang(P(self.X_DEF, y), 8, 48, longueur=2.6, noms=("D", "E", "F"), rayon_arc=0.8, sw=8, fs=36)
        g = ang(P(self.X_GHI, y), 0, 120, longueur=2.2, noms=("G", "H", "I"), rayon_arc=0.55, sw=8, fs=36)
        for x in (a, d, g):
            muet(x.lettres)
        return a, d, g

    def legende_angle(self, n, val, x):
        """« ABC 95° » sous la figure : le nom puis la mesure."""
        nom = muet(nom_angle(*n, 38))
        v = self.t(val, 38, ARC)
        return VGroup(nom, v).arrange(RIGHT, buff=0.28).move_to(P(x, -0.75))

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        a, d, g = self.figures_defi()
        la = self.legende_angle("ABC", "95°", self.X_ABC + 0.95)
        ld = self.legende_angle("DEF", "40°", self.X_DEF + 1.25)
        lg_ = self.legende_angle("GHI", "120°", self.X_GHI + 0.5)
        for x, lx, mot, mot2 in ((a, la, "A B C", "95"), (d, ld, "D E F", "40"), (g, lg_, "G H I", "120")):
            self.au_mot(mot)
            self.play(*montrer(x), *arc_de(x), FadeIn(x.lettres, scale=1.3), FadeIn(lx[0], shift=UP * 0.1), run_time=0.35)
            self.au_mot(mot2)
            self.play(FadeIn(lx[1], scale=1.3), run_time=0.25)
        self.au_mot("Range-les")
        r = self.t("Range-les du plus petit au plus grand.", 36, ORANGE_RETENUE).move_to(P(-0.4, -1.45))
        self.play(FadeIn(r, shift=UP * 0.12), run_time=0.35)
        self.au_mot("Lequel")
        q = self.t("Lequel est aigu ?", 36, ORANGE_RETENUE).move_to(P(-0.4, -2.05))
        self.play(FadeIn(q, shift=UP * 0.12), run_time=0.35)
        self.au_mot("Mets pause")
        p = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE).move_to(P(-0.4, -2.75))
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        a, d, g = self.figures_defi()
        la = self.legende_angle("ABC", "95°", self.X_ABC + 0.95)
        ld = self.legende_angle("DEF", "40°", self.X_DEF + 1.25)
        lg_ = self.legende_angle("GHI", "120°", self.X_GHI + 0.5)
        lg_[1]._pas_audit = True
        la_v, ld_v = VGroup(la), VGroup(ld)
        for t in (la[1], ld[1]):
            t._pas_audit = True
        for x in (a, d, g):
            x.maj()
            self.add(x.fond, x.arc, x.cote1, x.cote2, x.point, x.lettres)
        self.add(la, ld, lg_)
        self.play(Write(tit), run_time=0.4)
        # les deux premiers échangent leur place : DEF passe devant ABC (voix : 40)
        self.au_mot("40")
        x_d, x_a = -5.7, -1.7
        ld2 = self.legende_angle("DEF", "40°", x_d + 1.25)
        la2 = self.legende_angle("ABC", "95°", x_a + 0.95)
        x0_d, x0_a, y = self.X_DEF, self.X_ABC, self.Y_DEFI

        def passe(m, al):
            d.tx.set_value(x0_d + (x_d - x0_d) * al)
            d.ty.set_value(y + 0.42 * np.sin(PI * al))
            a.tx.set_value(x0_a + (x_a - x0_a) * al)
            a.ty.set_value(y - 0.42 * np.sin(PI * al))

        self.play(FadeOut(la), FadeOut(ld), FadeIn(ld2[1], scale=1.4), FadeIn(ld2[0]),
                  UpdateFromAlphaFunc(VGroup(), passe), run_time=0.75)
        self.au_mot("95")
        self.play(FadeIn(la2[1], scale=1.4), FadeIn(la2[0]), run_time=0.3)
        self.au_mot("120")
        self.play(lg_.animate.scale(1.25), run_time=0.2)
        self.play(lg_.animate.scale(1 / 1.25), run_time=0.2)
        # le rangement écrit
        fleches = VGroup()
        n1, n2, n3 = [nom_angle(*n, 46) for n in ("DEF", "ABC", "GHI")]
        rang = VGroup(n1, n2, n3).arrange(RIGHT, buff=1.25).move_to(P(-0.4, -1.6))
        for k in (0, 1):
            fleches.add(Arrow(rang[k].get_right(), rang[k + 1].get_left(), buff=0.2, color=VERT_OK, stroke_width=4, tip_length=0.2))
        for n, mot in ((n1, "D E F"), (n2, "A B C"), (n3, "G H I")):
            muet(n)
        self.au_mot("D E F")
        self.play(FadeIn(n1, scale=1.3), run_time=0.25)
        self.au_mot("A B C")
        self.play(GrowArrow(fleches[0]), FadeIn(n2, scale=1.3), run_time=0.22)
        self.au_mot("G H I")
        self.play(GrowArrow(fleches[1]), FadeIn(n3, scale=1.3), run_time=0.22)
        # seul DEF est aigu
        self.au_mot("Seul")
        v = meme_base(self.ligne([("Seul", WHITE), ("DEF", FAMILLE["aigu"]), ("est aigu,", WHITE)], 32, buff=0.18))
        v2 = self.ligne([("car 40 est plus petit que 90.", WHITE)], 32)
        muet(v[1])
        bloc = VGroup(v, v2).arrange(RIGHT, buff=0.22).move_to(P(-0.7, -2.55))
        v2.shift(UP * (float(np.median([m.get_bottom()[1] for m in v[0]])) - float(np.median([m.get_bottom()[1] for m in v2[0]]))))
        self.play(FadeIn(v[0], shift=UP * 0.1), FadeIn(v[1], shift=UP * 0.1), *couleur_arc(d, FAMILLE["aigu"]), run_time=0.3)
        self.au_mot("est aigu")
        self.play(FadeIn(v[2], shift=UP * 0.1), run_time=0.25)
        self.play(n1.animate.scale(1.3), run_time=0.15)
        self.play(n1.animate.scale(1 / 1.3), run_time=0.15)
        self.au_mot("car 40")
        self.play(FadeIn(v2, shift=UP * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        long_ = Angle(P(0, 2.2), 0, 30, longueur=3.0, rayon_arc=0.8, sw=7).figer()
        court = Angle(P(3.5, 2.2), 0, 80, longueur=1.45, rayon_arc=0.5, sw=7).figer()
        m1 = Angle(P(0, 0), 0, 50, longueur=1.9, rayon_arc=0.6, sw=7, couleur_arc=FAMILLE["aigu"]).figer()
        m2 = Angle(P(3.5, 0), 0, 130, longueur=1.9, rayon_arc=0.6, sw=7, couleur_arc=FAMILLE["obtus"]).figer()
        r1 = DashedLine(P(0, 0), P(0, 1.75), color=FAMILLE["droit"], stroke_width=4)
        r2 = DashedLine(P(3.5, 0), P(3.5, 1.75), color=FAMILLE["droit"], stroke_width=4)
        fig = VGroup(long_, court, m1, m2, r1, r2)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Pour comparer deux angles,", "on compare leurs mesures", "ou leurs ouvertures."),
            ("La longueur des côtés", "ne compte pas."),
            ("L'angle droit sert de repère :", "aigu en dessous,", "obtus au-dessus.")], fs=34)
        self.au_mot("Pour comparer")
        self.montrer_ligne(lignes[0])
        self.au_mot("La longueur")
        self.montrer_ligne(lignes[1], Indicate(long_.cote1, color=WHITE), Indicate(court.cote1, color=WHITE))
        self.au_mot("L'angle droit")
        self.montrer_ligne(lignes[2], Indicate(r1, color=WHITE), Indicate(r2, color=WHITE))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_angles()
        self.ecran_methode()
        self.ecran_question1()
        self.ecran_superposer()
        self.ecran_repere()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class AngleComparer6e(AngleComparerBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
