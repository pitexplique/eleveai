# angle_droit.py
# EleveAI — Maths 6e — série « Angles », épisode 02 : L'ANGLE DROIT
# (micro angle_droit, notion angle_mesure), AVEC VOIX. Paysage 16:9, CEINTURE
# VERTE. Short jumeau : angle_droit_short.py (blanche, l'équerre en papier).
# Décor et métier : Mehdi, CARRELEUR (centre d'intérêt : art-design) : un carreau
# de travers, et toute la rangée part de travers.
# Micro → écrans : situation (01), le coin (02), carré et rectangle (03), l'équerre
# (04), le petit carré (05), QUESTION 1 (06), le piège 85/90 (07), QUESTION 2 (08),
# deux droits font un plat (09), défi (10) et correction (10b), appris (11), fin (12).
# Voix : manim/voix/6e-angle-droit.json (validée, débit −6) ; WAV :
# public/sons/6e-angle-droit/ ; marques : angle_droit_marques.json.
# Outils : prop_commun.py + manim/canvas_angles.py. Ajouté ICI : carreau(), mehdi(),
# Coins (rectangle aux 4 coins allumés, redimensionnable), coin_carre(), cuisine().
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/angle_droit.py AngleDroit6e
# python -m manim render -qh --disable_caching manim/scripts/6e/angle_droit.py AngleDroit6e -o eleveai-maths-6e-angle-droit --media_dir manim/scripts/6e/media-angle-02
# Sortie : manim/sorties/6e/maths/angles/02-droit/eleveai-maths-6e-angle-droit.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403
from canvas_angles import *  # noqa: E402,F403

CARREAU = "#115e59"
JOINT = "#99f6e4"
DROIT = FAMILLE["droit"]
PLAT = FAMILLE["plat"]


def carreau(cote, centre, rot=0.0):
    """Un carreau de cuisine, tourné de rot degrés autour de son centre."""
    c = Square(cote, fill_color=CARREAU, fill_opacity=1, stroke_color=JOINT, stroke_width=3).move_to(centre)
    return c.rotate(np.deg2rad(rot))


def rangee_carreaux(depart, n, cote, rot=0.0, lignes=2):
    """Des carreaux posés depuis le premier, à la suite : tous prennent SON angle."""
    u, v = polaire(rot), polaire(rot + 90)
    g = VGroup()
    for j in range(lignes):
        for i in range(n):
            g.add(carreau(cote * 0.97, np.array(depart) + u * i * cote + v * j * cote, rot))
    return g


def coin_carre(s, dir1, dir2, c=0.42, couleur=ARC, sw=6):
    """Le petit carré d'angle droit, au sommet s, entre deux directions."""
    u, v = polaire(dir1), polaire(dir2)
    m = VMobject(stroke_color=couleur, stroke_width=sw, fill_opacity=0)
    m.set_points_as_corners([np.array(s) + u * c, np.array(s) + (u + v) * c, np.array(s) + v * c])
    return m


class Coins(VGroup):
    """Un rectangle et ses 4 petits carrés (.coins[i], à montrer au mot). f.k est sa
    taille : f.k.animate.set_value(1.3) l'agrandit, les coins gardent leur taille."""

    def __init__(self, l, h, centre, c=0.27, sw=6, **kw):
        super().__init__(**kw)
        self.l, self.h, self.ctr, self.c = l, h, np.array(centre, dtype=float), c
        self.k = ValueTracker(1.0)
        self.rect = Rectangle(width=l, height=h, fill_color=CARREAU, fill_opacity=1, stroke_color=JOINT,
                              stroke_width=4).move_to(self.ctr)
        self.signes = [(1, 1), (-1, 1), (-1, -1), (1, -1)]
        self.coins = VGroup(*[VMobject(stroke_color=ARC, stroke_width=sw, fill_opacity=0) for _ in self.signes])
        self.add(self.rect)
        self._maj()
        self.rect.add_updater(lambda m: self._maj())

    def sommet(self, i):
        k, (sx, sy) = self.k.get_value(), self.signes[i]
        return self.ctr + P(sx * self.l * k / 2, sy * self.h * k / 2)

    def _maj(self):
        k, c = self.k.get_value(), self.c
        self.rect.stretch_to_fit_width(self.l * k).stretch_to_fit_height(self.h * k).move_to(self.ctr)
        for i, (sx, sy) in enumerate(self.signes):
            s = self.sommet(i)
            self.coins[i].set_points_as_corners([s + P(-sx * c, 0), s + P(-sx * c, -sy * c), s + P(0, -sy * c)])


def mehdi(s=1.0):
    """Mehdi, carreleur : casquette, un carreau à la main."""
    p = visage(personne(peau="#c68642", tenue="#ea580c", cheveux="#111827", s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    visiere = RoundedRectangle(width=r * 2.5, height=r * 0.26, corner_radius=r * 0.1, fill_color="#1d4ed8",
                               fill_opacity=1, stroke_width=0).move_to(c + P(r * 0.25, r * 0.62))
    bonnet = AnnularSector(inner_radius=0, outer_radius=r * 1.08, angle=PI, start_angle=0, fill_color="#1d4ed8",
                           fill_opacity=1, stroke_width=0).move_to(c + P(0, r * 1.0))
    outil = carreau(0.62 * s, p.corps.get_center() + P(0.12, -0.05) * s, 0)
    p.add(bonnet, visiere, outil)
    return p


def cuisine(x0=-1.95, x1=6.1, y0=-1.25, y1=2.3):
    """Le mur de la cuisine, le plan de travail et les placards."""
    mur = Rectangle(width=x1 - x0, height=y1 - y0, fill_color="#1e293b", fill_opacity=1, stroke_color="#64748b",
                    stroke_width=3).move_to(P((x0 + x1) / 2, (y0 + y1) / 2))
    x2 = 4.75  # s'arrête avant Ti-Margo
    plan = Rectangle(width=x2 - x0, height=0.26, fill_color="#92400e", fill_opacity=1, stroke_width=0).move_to(P((x0 + x2) / 2, y0 - 0.13))
    g = VGroup(mur, plan)
    nb = 4
    w = (x2 - x0) / nb
    for i in range(nb):
        cx = x0 + w * (i + 0.5)
        g.add(RoundedRectangle(width=w - 0.08, height=1.05, corner_radius=0.05, fill_color="#334155", fill_opacity=1,
                               stroke_color="#64748b", stroke_width=2).move_to(P(cx, y0 - 0.26 - 0.55)))
        g.add(Dot(P(cx + w * 0.3, y0 - 0.26 - 0.3), radius=0.05, color="#cbd5e1"))
    return g


class AngleDroitBase(PaysageProp):
    nom_voix = "6e-angle-droit"
    fichier_marques = "angle_droit_marques.json"
    _avec = None

    def play(self, *a, **k):
        """Ce qui doit partir AVEC l'animation suivante (la figure d'un choix)."""
        if self._avec:
            a, self._avec = (*a, *self._avec), None
        return super().play(*a, **k)

    x_col = 3.75

    def cc(self, mob, y):
        """La colonne de droite : tout y a le MÊME CENTRE (titre, phrase, tampon)."""
        return mob.move_to(P(self.x_col, y))

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("L'angle droit", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("L'angle")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Comment savoir si un coin", "est vraiment droit ?"], 40)
        q.move_to(P(-2.55, 0.5))
        s = P(3.0, -1.0)
        a = Angle(s, 0, 70, longueur=2.5, arc=True, rayon_arc=0.6, sw=9)
        self.au_mot("Comment")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(a, shift=UP * 0.2), run_time=0.4)
        self.au_mot("vraiment")
        self.play(FadeIn(q[1], shift=UP * 0.2), a.ouvrir(115), run_time=0.8)
        self.play(a.ouvrir(90), run_time=0.8)
        a.figer()
        self.attendre_voix(marge=0.6)

    # ── 01 : Mehdi, carreleur ───────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        me = mehdi(1.12).move_to(P(-4.7, 0.2))
        self.au_mot("Voici Mehdi")
        nom = self.t("Mehdi", 44, BLEU_CALCUL).next_to(me, UP, buff=0.2)
        self.play(FadeIn(me, shift=UP * 0.3), FadeIn(nom), run_time=0.5)
        self.au_mot("carreleur")
        met = self.t("carreleur", 34, BLEU_CALCUL).next_to(me, DOWN, buff=0.18)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        decor = cuisine()
        self.au_mot("Il pose")
        lg = self.t("Il pose des carreaux", 34).move_to(P(2.05, 2.92))
        depart = P(-1.1, -0.6)
        droits = rangee_carreaux(depart, 7, 1.08, 0, 2)
        self.play(FadeIn(decor), FadeIn(lg, shift=UP * 0.1), run_time=0.45)
        self.play(LaggedStart(*[FadeIn(c, shift=DOWN * 0.35, scale=1.15) for c in droits], lag_ratio=0.45), run_time=2.2)
        self.au_mot("Si le premier")
        premier = carreau(1.05, depart, 8)
        lg2 = self.t("Si le premier carreau", 32).move_to(P(2.05, 3.18))
        self.play(FadeOut(droits), FadeOut(lg), run_time=0.15)
        self.play(FadeIn(lg2), run_time=0.2)
        self.au_mot("de travers")
        lg3 = self.t("est de travers,", 32, ROUGE_ERREUR).next_to(lg2, DOWN, buff=0.1)
        self.play(FadeIn(premier, scale=1.4), FadeIn(lg3), run_time=0.4)
        self.insister(premier, 1.15, 0.15)
        self.au_mot("tous les autres")
        tous = rangee_carreaux(depart, 7, 1.08, 8, 2)
        reste = VGroup(*[c for i, c in enumerate(tous) if i != 0])
        self.play(FadeOut(lg2), FadeOut(lg3), run_time=0.15)
        lg4 = self.t("tous les autres le seront aussi.", 32, ROUGE_ERREUR).move_to(P(2.05, 2.92))
        self.play(FadeIn(lg4), LaggedStart(*[FadeIn(c, scale=1.2) for c in reste], lag_ratio=0.3), run_time=1.5)
        b0 = depart + polaire(8, -0.54) + polaire(98, -0.54)
        coin = Polygon(b0, b0 + polaire(8, 7 * 1.08), P(b0[0] + 7 * 1.08 * np.cos(np.deg2rad(8)), b0[1]),
                       fill_color=ROUGE_ERREUR, fill_opacity=0.65, stroke_width=0)
        self.play(FadeIn(coin), run_time=0.3)
        self.attendre_voix()

    # ── 02 : le coin ────────────────────────────────────────────────────────
    def ecran_coin(self):
        self.ecran("02-coin")
        self.x_col = 3.0
        s = P(-5.3, -2.2)
        cote = 4.4
        tuile = Square(cote, fill_color=CARREAU, fill_opacity=1, stroke_color=JOINT, stroke_width=4)
        tuile.move_to(s + P(cote / 2, cote / 2))
        self.play(FadeIn(tuile, scale=0.85), run_time=0.35)
        a = Angle(s, 0, 90, longueur=cote, rayon_arc=0.8, sw=10, arc=False)
        self.au_mot("le coin")
        anneau = Circle(radius=0.75, stroke_color=AMBRE, stroke_width=6).move_to(s + P(0.28, 0.28))
        self.play(Create(a.cote1[0]), Create(a.cote2[0]), FadeIn(a.point, scale=2.5), Create(anneau), run_time=0.6)
        self.play(anneau.animate.scale(1.3), run_time=0.22)
        self.play(anneau.animate.scale(1 / 1.3), run_time=0.22)
        self.au_mot("Cet angle")
        l1 = self.t("Cet angle a un nom :", 40)
        self.cc(l1, 2.3)
        self.play(FadeIn(l1, shift=UP * 0.15), FadeOut(anneau), run_time=0.3)
        self.au_mot("c'est un angle droit")
        v = self.tampon("C'est un angle droit.", DROIT, 40)
        self.cc(v, 1.15)
        carre = coin_carre(s, 0, 90, c=0.6, sw=8)
        self.play(FadeIn(v, scale=1.2), Create(carre), run_time=0.45)
        self.play(carre.animate.scale(1.6, about_point=s), run_time=0.25)
        self.play(carre.animate.scale(1 / 1.6, about_point=s), run_time=0.25)
        self.au_mot("Il mesure")
        l2 = self.t("Il mesure toujours", 40)
        self.cc(l2, -0.05)
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.3)
        self.au_mot("90")
        n = self.t("90°", 90, DROIT).move_to(P(3.0, -1.3))
        self.play(FadeIn(n, scale=1.5), run_time=0.3)
        self.insister(n, 1.4, 0.22)
        self.attendre_voix()

    # ── 03 : carré et rectangle ─────────────────────────────────────────────
    def ecran_partout(self):
        self.ecran("03-partout")
        self.x_col = 3.75
        ca = Coins(2.0, 2.0, P(-4.7, 0.35))
        re_ = Coins(3.0, 1.5, P(-1.4, 0.35))
        self.au_mot("Un carré")
        l1 = self.t("Un carré a", 40)
        self.cc(l1, 2.85)
        self.play(FadeIn(ca, scale=0.7), FadeIn(l1, shift=UP * 0.15), run_time=0.35)
        self.au_mot("4 angles")
        l2 = self.t("4 angles droits.", 40, DROIT)
        self.cc(l2, 2.25)
        self.play(FadeIn(l2, scale=1.2), LaggedStart(*[FadeIn(c, scale=2.2) for c in ca.coins], lag_ratio=0.55), run_time=0.9)
        self.au_mot("Un rectangle")
        l3 = self.t("Un rectangle aussi.", 40)
        self.cc(l3, 1.35)
        self.play(FadeIn(re_, scale=0.7), FadeIn(l3, shift=UP * 0.15), run_time=0.35)
        self.play(LaggedStart(*[FadeIn(c, scale=2.2) for c in re_.coins], lag_ratio=0.55), run_time=0.8)
        self.au_mot("Petit")
        l4 = self.t("Petit ou grand,", 40)
        self.cc(l4, 0.45)
        self.play(FadeIn(l4, shift=UP * 0.15), ca.k.animate.set_value(0.55), re_.k.animate.set_value(0.55), run_time=0.55)
        self.au_mot("grand")
        self.play(ca.k.animate.set_value(1.2), re_.k.animate.set_value(1.2), run_time=0.7)
        self.au_mot("c'est toujours")
        l5 = self.t("c'est toujours", 40)
        self.cc(l5, -0.15)
        self.play(FadeIn(l5, shift=UP * 0.15), ca.k.animate.set_value(0.8), run_time=0.3)
        self.au_mot("90")
        n = self.t("90°", 64, DROIT).move_to(P(3.75, -1.15))
        self.play(FadeIn(n, scale=1.5), LaggedStart(*[Indicate(c, color=WHITE, scale_factor=1.6) for c in [*ca.coins, *re_.coins]],
                                                     lag_ratio=0.1), run_time=0.7)
        self.insister(n, 1.3, 0.2)
        ca.rect.clear_updaters()
        re_.rect.clear_updaters()
        self.attendre_voix()

    # ── 04 : l'équerre ──────────────────────────────────────────────────────
    def ecran_equerre(self):
        self.ecran("04-equerre")
        self.x_col = 3.5
        s = P(-5.5, -2.3)
        a = Angle(s, 0, 90, longueur=3.9, arc=False, sw=9)
        self.add(a.cote1, a.cote2, a.point)
        me = mehdi(0.72).move_to(P(-0.25, -1.45))
        self.au_mot("Pour vérifier")
        l1 = self.t("Pour vérifier :", 40)
        self.cc(l1, 3.0)
        self.play(FadeIn(l1, shift=UP * 0.15), FadeIn(me, shift=UP * 0.2), run_time=0.35)
        self.au_mot("Mehdi prend")
        l2 = self.ligne([("Mehdi prend", WHITE), ("une équerre.", EQUERRE)], 30, buff=0.14)
        self.cc(l2, 2.3)
        e = Equerre(P(-1.75, 0.2), 18, taille=2.3)
        self.play(FadeIn(l2[0], shift=UP * 0.15), run_time=0.25)
        self.au_mot("une équerre")
        self.play(FadeIn(l2[1], shift=UP * 0.15), FadeIn(e, scale=0.6), run_time=0.45)
        self.insister(e, 1.12, 0.2)
        self.au_mot("Il pose")
        l3 = VGroup(self.t("Il pose son coin", 36), self.t("sur le sommet.", 36, SOMMET)).arrange(DOWN, buff=0.1)
        interligne_regulier(l3)
        self.cc(l3, 1.25)
        self.play(FadeIn(l3[0], shift=UP * 0.15), e.poser(s + P(0.9, 0.9), 0), run_time=0.9)
        self.au_mot("sur le sommet")
        self.play(FadeIn(l3[1], shift=UP * 0.15), e.poser(s, 0), run_time=0.7)
        self.play(Flash(s, color=SOMMET, line_length=0.28), a.point.animate.scale(1.6), run_time=0.4)
        self.play(a.point.animate.scale(1 / 1.6), run_time=0.2)
        self.au_mot("Si les deux")
        l4 = VGroup(self.t("Si les deux côtés", 36), self.t("collent à l'équerre,", 36, VERT_OK)).arrange(DOWN, buff=0.1)
        interligne_regulier(l4)
        self.cc(l4, -0.05)
        self.play(FadeIn(l4[0], shift=UP * 0.15), run_time=0.3)
        self.au_mot("collent")
        c1 = Line(s, s + RIGHT * 2.875, color=VERT_OK, stroke_width=11)
        c2 = Line(s, s + UP * 2.3, color=VERT_OK, stroke_width=11)
        self.play(FadeIn(l4[1], shift=UP * 0.15), Create(c1), Create(c2), run_time=0.45)
        self.au_mot("l'angle est droit")
        v = self.tampon("l'angle est droit.", DROIT, 38)
        self.cc(v, -1.2)
        self.play(FadeIn(v, scale=1.25), run_time=0.35)
        self.insister(v, 1.08, 0.2)
        self.attendre_voix()

    # ── 05 : le petit carré ─────────────────────────────────────────────────
    def ecran_code(self):
        self.ecran("05-code")
        self.x_col = 3.2
        s = P(-5.3, -2.3)
        tri = Polygon(s, s + RIGHT * 5.2, s + UP * 4.2, fill_color=CARREAU, fill_opacity=0.55, stroke_color=COTE, stroke_width=9)
        self.au_mot("Sur une figure")
        l1 = self.t("Sur une figure,", 40)
        self.cc(l1, 3.05)
        self.play(FadeIn(l1, shift=UP * 0.15), Create(tri), run_time=0.5)
        self.au_mot("petit carré")
        l2 = VGroup(self.t("un petit carré", 36, ARC), self.t("dans le coin.", 36)).arrange(DOWN, buff=0.12)
        interligne_regulier(l2)
        self.cc(l2, 2.15)
        pt = Dot(s, radius=0.11, color=SOMMET)
        carre = coin_carre(s, 0, 90, c=0.62, sw=8)
        self.play(FadeIn(l2[0], shift=UP * 0.15), Create(carre), FadeIn(pt), run_time=0.6)
        self.au_mot("dans le coin")
        self.play(FadeIn(l2[1], shift=UP * 0.15), run_time=0.3)
        self.play(carre.animate.scale(1.8, about_point=s), run_time=0.3)
        self.play(carre.animate.scale(1 / 1.8, about_point=s), run_time=0.3)
        self.au_mot("Ce petit")
        l3 = self.ligne([("Ce petit carré", WHITE), ("veut dire :", WHITE)], 36, buff=0.16)
        self.cc(l3, 0.95)
        self.play(FadeIn(l3[0], shift=UP * 0.15), run_time=0.3)
        self.au_mot("veut dire")
        self.play(FadeIn(l3[1], shift=UP * 0.15), run_time=0.25)
        self.au_mot("angle droit")
        v = self.tampon("angle droit", DROIT, 44)
        self.cc(v, 0.2)
        self.play(FadeIn(v, scale=1.25), Indicate(carre, color=DROIT, scale_factor=1.3), run_time=0.45)
        self.au_mot("Pas besoin")
        l4 = self.t("Pas besoin d'écrire", 36)
        self.cc(l4, -0.7)
        self.play(FadeIn(l4, shift=UP * 0.15), run_time=0.3)
        self.au_mot("90")
        n = self.t("90°", 54, WHITE).move_to(P(3.2, -1.6))
        self.play(FadeIn(n, scale=1.3), run_time=0.25)
        x = croix(n.copy().scale(1.25), sw=6)
        self.play(Create(x), run_time=0.3)
        self.attendre_voix()

    # ── 06 : QUESTION 1 (le carreau sur la pointe) ──────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        c = P(-3.1, 0.55)
        cote = 2.7
        tuile = carreau(cote, c, 0)
        bas = c + DOWN * cote / np.sqrt(2)  # le coin du bas, une fois le carreau sur sa pointe
        coin = coin_carre(c + P(cote / 2, -cote / 2), 90, 180, c=0.42, sw=7)
        leg1 = self.t("un carreau penché,", 34).move_to(P(-3.1, -2.1))
        leg2 = self.t("sur la pointe", 34).next_to(leg1, DOWN, buff=0.12)
        tourne = VGroup(tuile, coin)

        def avant(sc):
            sc.play(FadeIn(tuile, scale=0.8), run_time=0.3)
            sc.au_mot("penché")
            sc.play(FadeIn(leg1, shift=UP * 0.1), Rotate(tuile, -PI / 8), Rotate(coin, -PI / 8, about_point=c), run_time=0.6)
            sc.au_mot("sur la pointe")
            sc.play(FadeIn(leg2, shift=UP * 0.1), Rotate(tuile, -PI / 8), Rotate(coin, -PI / 8, about_point=c), run_time=0.6)
            sc.au_mot("Son coin")
            sc.play(Create(coin), Flash(bas, color=AMBRE, line_length=0.25), run_time=0.45)

        e = Equerre(bas, 45, taille=1.45)
        n = self.t("90°", 48, DROIT).move_to(c)
        n._pas_audit = n.sans_synchro = True
        n.set_z_index(5)
        vt = VGroup(self.t("L'angle droit", 32, DROIT), self.t("peut être penché.", 32, DROIT)).arrange(DOWN, buff=0.1)
        interligne_regulier(vt)
        v = VGroup(SurroundingRectangle(vt, color=DROIT, buff=0.16, corner_radius=0.12, stroke_width=5), vt).move_to(P(-3.1, -2.45))

        def apres(sc):
            sc.play(FadeOut(leg1), FadeOut(leg2), FadeOut(coin), FadeIn(e, scale=0.7), FadeIn(n, scale=1.4), run_time=0.3)
            bloc = VGroup(tuile, e)
            sc.au_mot("tourné")
            sc.play(FadeIn(sc.ph_q[0], shift=UP * 0.15), Rotate(bloc, PI / 4, about_point=c), run_time=0.8)
            sc.play(Rotate(bloc, -PI / 4, about_point=c), run_time=0.6)
            sc.au_mot("on n'a pas")
            sc.play(FadeIn(sc.ph_q[1], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("son ouverture")
            sc.play(FadeIn(sc.ph_q[2], shift=UP * 0.15), run_time=0.3)
            sc.insister(n, 1.4, 0.22)
            sc.au_mot("L'angle droit")
            sc.play(FadeIn(v, scale=1.2), run_time=0.35)
            sc.rep_fini()

        self.question_pause("06-question", "06b-reponse", ["Son coin est-il encore", "un angle droit ?"],
                            [self.t("oui, 90°", 34), self.t("non, moins de 90°", 34), self.t("non, plus de 90°", 34)], 0,
                            ["On a tourné le carreau,", "on n'a pas changé", "son ouverture."], mot_q="Mehdi pose",
                            avant_q=avant, autres_r=apres)

    # ── 07 : le piège : 85° et 90° ──────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        self.au_mot("Le piège")
        tit = self.t("Le piège :", 50, ROUGE_ERREUR).move_to(P(-3.85, 3.1))
        self.play(Write(tit), run_time=0.35)
        self.au_mot("à l'œil")
        oeil = VGroup(Ellipse(width=0.95, height=0.5, stroke_color=WHITE, stroke_width=5),
                      Dot(radius=0.14, color=COTE)).move_to(P(-1.4, 3.1))
        l1 = self.t("tout semble droit.", 42).next_to(oeil, RIGHT, buff=0.3)
        self.play(FadeIn(oeil, scale=1.5), run_time=0.3)
        self.au_mot("tout semble")
        self.play(FadeIn(l1, shift=UP * 0.12), run_time=0.3)
        s1, s2 = P(-5.2, -2.45), P(0.5, -2.45)
        a1 = Angle(s1, 0, 85, longueur=3.3, rayon_arc=0.75, sw=9)
        a2 = Angle(s2, 0, 90, longueur=3.3, rayon_arc=0.75, sw=9, arc=False)
        a1.figer(), a2.figer()
        arc2 = Arc(radius=0.75, start_angle=0, angle=PI / 2, arc_center=s2, stroke_color=ARC, stroke_width=9).set_z_index(-1)
        a1.arc.set_z_index(-1)
        self.au_mot("Cet angle")
        self.play(FadeIn(a1), run_time=0.35)
        self.au_mot("85")
        n1 = self.t("85°", 62, ARC).move_to(s1 + P(1.75, 1.15))
        self.play(FadeIn(n1, scale=1.4), run_time=0.3)
        self.au_mot("celui-ci")
        self.play(FadeIn(a2), FadeIn(arc2), run_time=0.35)
        self.au_mot("90")
        n2 = self.t("90°", 62, ARC).move_to(s2 + P(1.75, 1.15))
        self.play(FadeIn(n2, scale=1.4), run_time=0.3)
        self.au_mot("Ils se")
        l2 = self.t("Ils se ressemblent !", 40, ORANGE_RETENUE).move_to(P(-0.1, 2.3))
        self.play(FadeIn(l2, scale=1.2), run_time=0.3)
        self.au_mot("Seule")
        l3 = self.t("Seule l'équerre le dit.", 40, EQUERRE).move_to(P(-0.1, 1.6))
        e1 = Equerre(s1 + P(1.2, 1.2), 12, taille=2.2)
        e2 = Equerre(s2 + P(1.2, 1.2), 12, taille=2.2)
        self.play(FadeIn(l3, shift=UP * 0.12), FadeOut(n1), FadeOut(n2), FadeIn(e1, scale=0.7), FadeIn(e2, scale=0.7), run_time=0.3)
        self.play(e1.poser(s1, 0), e2.poser(s2, 0), run_time=0.7)
        ecart = Polygon(s1, polaire(85, 3.3, s1), polaire(90, 3.3, s1), fill_color=ROUGE_ERREUR, fill_opacity=0.85, stroke_width=0)
        n1b, n2b = n1.copy().scale(0.8).move_to(s1 + P(2.05, 2.2)), n2.copy().scale(0.8).move_to(s2 + P(2.05, 2.2))
        n1b._pas_audit = n2b._pas_audit = n1b.sans_synchro = n2b.sans_synchro = True
        ko = croix(Square(0.5).move_to(s1 + P(3.25, 2.2)), sw=9)
        ok = self.coche(VERT_OK, 0.32).move_to(s2 + P(3.25, 2.2))
        c1 = Line(s2, s2 + RIGHT * 2.75, color=VERT_OK, stroke_width=11)
        c2 = Line(s2, s2 + UP * 2.2, color=VERT_OK, stroke_width=11)
        self.play(FadeIn(ecart), Create(ko), Create(ok), Create(c1), Create(c2), FadeIn(n1b), FadeIn(n2b), run_time=0.5)
        self.attendre_voix(marge=1.6)

    # ── 08 : QUESTION 2 (89°, 90°, 100°) ────────────────────────────────────
    def au_mot(self, extrait, n=1):
        super().au_mot(extrait, n)
        crochet = getattr(self, "_crochets", {}).pop(extrait, None) if hasattr(self, "_crochets") else None
        if crochet:
            self._avec = crochet

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        y = -0.55
        xs = (-5.9, -3.7, -1.2)
        mesures = (89, 90, 100)
        figs, lettres, arcs = [], [], []
        for x, m, nom in zip(xs, mesures, "ABC"):
            a = Angle(P(x, y), 0, m, longueur=1.75, arc=False, sw=8).figer()
            arc = Arc(radius=0.48, start_angle=0, angle=np.deg2rad(m), arc_center=P(x, y), stroke_color=ARC, stroke_width=7).set_z_index(-1)
            rond = Circle(radius=0.27, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=0).move_to(P(x + 0.6, y - 0.55))
            let = Text(nom, font_size=32, color=WHITE, weight=BOLD).move_to(rond)
            let.sans_synchro = let._pas_audit = True
            figs.append(VGroup(a, arc))
            lettres.append(VGroup(rond, let))
            arcs.append(arc)
        self._crochets = {"A :": [FadeIn(figs[0]), FadeIn(lettres[0])], "B :": [FadeIn(figs[1]), FadeIn(lettres[1])],
                          "C :": [FadeIn(figs[2]), FadeIn(lettres[2])]}
        s = P(xs[1], y)

        def pale(i):  # les traits et l'arc seuls : les pointes et le secteur restent invisibles
            return VGroup(figs[i][0].cote1[0], figs[i][0].cote2[0], figs[i][1])

        def apres(sc):
            e = Equerre(s + P(0.9, 1.0), 14, taille=1.45)
            sc.play(FadeIn(e, scale=0.7), run_time=0.2)
            sc.au_mot("Droit")
            sc.play(FadeIn(sc.ph_q[0], shift=UP * 0.15), e.poser(s, 0), FadeOut(arcs[1]), run_time=0.6)
            sc.play(figs[1][0].cote1.animate.set_color(VERT_OK), figs[1][0].cote2.animate.set_color(VERT_OK), run_time=0.3)
            sc.au_mot("Ni un peu moins")
            kA = croix(Square(0.42).move_to(P(xs[0] + 1.1, y + 1.3)), sw=7)
            sc.play(FadeIn(sc.ph_q[1], shift=UP * 0.15), Create(kA), pale(0).animate.set_opacity(0.45), run_time=0.35)
            sc.au_mot("ni un peu plus")
            sc.play(FadeIn(sc.ph_q[2], shift=UP * 0.15), run_time=0.2)
            kC = croix(Square(0.42).move_to(P(xs[2] + 0.75, y + 1.3)), sw=7)
            sc.play(Create(kC), pale(2).animate.set_opacity(0.45), run_time=0.35)
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse", ["Lequel est un angle droit ?"],
                            [self.t("89°", 34), self.t("90°", 34), self.t("100°", 34)], 1,
                            ["Droit, c'est 90° pile.", "Ni un peu moins,", "ni un peu plus."], mot_q="Lequel",
                            autres_r=apres)

    # ── 09 : deux angles droits font un angle plat ──────────────────────────
    def ecran_plat(self):
        self.ecran("09-plat")
        self.x_col = 3.55
        o = P(-2.65, -1.6)
        g = Angle(o + LEFT * 0.75, 90, 180, longueur=2.9, arc=False, sw=9)
        d = Angle(o + RIGHT * 0.75, 0, 90, longueur=2.9, arc=False, sw=9)
        cg = coin_carre(o + LEFT * 0.75, 90, 180)
        cd = coin_carre(o + RIGHT * 0.75, 0, 90)
        g.figer(), d.figer()
        self.au_mot("Deux angles")
        l1 = VGroup(self.t("Deux angles droits", 38, DROIT), self.t("côte à côte", 38)).arrange(DOWN, buff=0.1)
        interligne_regulier(l1)
        self.cc(l1, 2.45)
        self.play(FadeIn(l1[0], shift=UP * 0.15), FadeIn(g), FadeIn(d), FadeIn(cg), FadeIn(cd), run_time=0.4)
        self.au_mot("côte à côte")
        self.play(FadeIn(l1[1], shift=UP * 0.15), *[m.animate.shift(RIGHT * 0.75) for m in (g, cg)],
                  *[m.animate.shift(LEFT * 0.75) for m in (d, cd)], run_time=0.65)
        self.au_mot("ligne droite")
        l2 = self.t("font une ligne droite.", 38)
        self.cc(l2, 1.1)
        ligne = Line(o + LEFT * 2.9, o + RIGHT * 2.9, color=PLAT, stroke_width=13)
        self.play(FadeIn(l2, shift=UP * 0.15), Create(ligne), FadeOut(g.point), FadeOut(d.point), run_time=0.6)
        pt = Dot(o, radius=0.12, color=SOMMET)
        self.add(pt)
        self.play(Flash(o, color=PLAT, line_length=0.3), run_time=0.4)
        l3 = self.ligne([("90°", DROIT), ("+", WHITE), ("90°", DROIT), ("=", WHITE), ("180°", PLAT)], 44, buff=0.16)
        self.cc(l3, -0.1)
        l3[1]._pas_audit = l3[3]._pas_audit = True
        self.au_mot("90 plus")
        self.play(FadeIn(l3[0], scale=1.3), Indicate(cg, color=WHITE, scale_factor=1.4), run_time=0.3)
        self.au_mot("plus")
        self.play(FadeIn(l3[1]), run_time=0.15)
        self.au_mot("90,")
        self.play(FadeIn(l3[2], scale=1.3), Indicate(cd, color=WHITE, scale_factor=1.4), run_time=0.3)
        self.au_mot("égale")
        self.play(FadeIn(l3[3]), run_time=0.15)
        self.au_mot("180")
        arc = Arc(radius=1.05, start_angle=0, angle=PI, arc_center=o, stroke_color=PLAT, stroke_width=8)
        self.play(FadeIn(l3[4], scale=1.3), Create(arc), run_time=0.6)
        self.insister(l3[4], 1.3, 0.2)
        self.au_mot("c'est un angle plat")
        v = self.tampon("C'est un angle plat.", PLAT, 32)
        self.cc(v, -1.25)
        self.play(FadeIn(v, scale=1.25), run_time=0.35)
        self.attendre_voix()

    # ── 10 : le défi ────────────────────────────────────────────────────────
    def morceaux_defi(self):
        """Le carreau de 3,6, coupé en deux rectangles (renvoyés côte à côte, un peu écartés)."""
        cx, cy = -3.1, -0.25
        return (Coins(1.8, 3.6, P(cx - 1.15, cy), c=0.27), Coins(1.8, 3.6, P(cx + 1.15, cy), c=0.27))

    def ecran_defi(self):
        self.ecran("10-defi", 0.65)
        self.x_col = 3.0
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        c = P(-3.1, -0.25)
        entier = carreau(3.6, c)
        self.au_mot("Mehdi coupe")
        l1 = VGroup(self.t("Mehdi coupe", 34), self.t("un carreau carré", 34)).arrange(DOWN, buff=0.1)
        interligne_regulier(l1)
        self.cc(l1, 2.05)
        self.play(FadeIn(l1[0], shift=UP * 0.15), run_time=0.25)
        self.au_mot("un carreau")
        self.play(FadeIn(l1[1], shift=UP * 0.15), FadeIn(entier, scale=0.8), run_time=0.35)
        self.au_mot("en deux")
        l2 = self.t("en deux, par le milieu.", 34)
        self.cc(l2, 1.1)
        trait = DashedLine(c + UP * 1.95, c + DOWN * 1.95, color=AMBRE, stroke_width=6)
        self.play(FadeIn(l2, shift=UP * 0.15), Create(trait), run_time=0.7)
        self.au_mot("Il obtient")
        g, d = self.morceaux_defi()
        for m, x in ((g, -0.9), (d, 0.9)):
            m.rect.clear_updaters()
            m.rect.move_to(c + RIGHT * x)
        self.add(g.rect, d.rect)
        self.remove(entier, trait)
        self.au_mot("2 rectangles")
        l3 = self.t("Il obtient 2 rectangles.", 34, BLEU_CALCUL)
        self.cc(l3, 0.45)
        self.play(FadeIn(l3, shift=UP * 0.15), g.rect.animate.shift(LEFT * 0.25), d.rect.animate.shift(RIGHT * 0.25), run_time=0.5)
        self.au_mot("Combien")
        q = self.bloc(["Combien d'angles droits", "en tout ?"], 36, ORANGE_RETENUE)
        q[1].set_x(q[0].get_x())
        self.cc(q, -0.4)
        self.play(FadeIn(q[0], shift=UP * 0.15), run_time=0.3)
        self.au_mot("en tout")
        self.play(FadeIn(q[1], shift=UP * 0.15), run_time=0.3)
        self.au_mot("Mets pause")
        pz = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE).move_to(P(3.0, -1.6))
        self.play(Write(pz), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("10b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        g, d = self.morceaux_defi()
        g.rect.clear_updaters(), d.rect.clear_updaters()
        self.add(g, d)
        self.play(Write(tit), run_time=0.4)
        l1 = self.t("Un rectangle a", 40)
        self.cc(l1, 2.25)
        self.au_mot("Un rectangle")
        self.play(FadeIn(l1, shift=UP * 0.15), Indicate(g.rect, color=COTE, scale_factor=1.04), run_time=0.45)
        self.au_mot("4 angles")
        l2 = self.t("4 angles droits.", 40, DROIT)
        self.cc(l2, 1.35)
        self.play(FadeIn(l2, scale=1.2), LaggedStart(*[FadeIn(c, scale=2.2) for c in g.coins], lag_ratio=0.5), run_time=0.8)
        l3 = self.ligne([("2 × 4", WHITE), ("= 8", VERT_OK)], 62, buff=0.25)
        self.cc(l3, -0.15)
        self.au_mot("2 fois")
        self.play(FadeIn(l3[0], shift=UP * 0.15), run_time=0.3)
        self.play(LaggedStart(*[FadeIn(c, scale=2.2) for c in d.coins], lag_ratio=0.3), run_time=0.45)
        self.au_mot("8 angles")
        l4 = self.t("8 angles droits", 44, VERT_OK)
        self.cc(l4, -1.25)
        self.play(FadeIn(l3[1], scale=1.3), FadeIn(l4, scale=1.2), run_time=0.35)
        self.play(LaggedStart(*[Indicate(c, color=VERT_OK, scale_factor=1.6) for c in [*g.coins, *d.coins]], lag_ratio=0.12), run_time=0.9)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("11-finale", 0.65)
        c = P(0, 0)
        tuile = carreau(2.2, c, 45)
        bas = c + DOWN * 2.2 / np.sqrt(2)
        coin = coin_carre(bas, 45, 135, c=0.34, sw=6)
        e = Equerre(P(-3.6, -1.55), 0, taille=2.0)
        fig = VGroup(tuile, coin, e)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Un angle droit mesure 90°,", "même s'il est penché."),
            ("On le vérifie avec l'équerre.",),
            ("Sur une figure,", "un petit carré le montre.")], fs=36)
        self.au_mot("Un angle droit")
        self.montrer_ligne(lignes[0], Indicate(tuile, color=DROIT, scale_factor=1.05))
        self.au_mot("On le vérifie")
        self.montrer_ligne(lignes[1], Indicate(e, color=WHITE, scale_factor=1.1))
        self.au_mot("Sur une figure")
        self.montrer_ligne(lignes[2], Indicate(coin, color=WHITE, scale_factor=1.6))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_coin()
        self.ecran_partout()
        self.ecran_equerre()
        self.ecran_code()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_plat()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")


class AngleDroit6e(AngleDroitBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
