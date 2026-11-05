# angle_mesurer.py
# EleveAI — Maths 6e — série « Angles », épisode 04 : MESURER UN ANGLE
# (micro angle_mesurer, notion angle_mesure), AVEC VOIX. Paysage 16:9, CEINTURE
# VERTE. Short jumeau : angle_mesurer_short.py (blanche, l'horloge).
# Décor et métier : Yanis, KINÉSITHÉRAPEUTE (centres d'intérêt : corps-sante, sport) :
# le genou de Manon, blessée au basket, l'angle cuisse-mollet réellement à 55°.
# Micro → écrans : situation (01), le goniomètre (02), le rapporteur (03), les 3 gestes
# (04), QUESTION 1 (05), les deux rangées (06), le contrôle aigu (07), QUESTION 2 (08),
# défi (09) et correction (09b), appris (10), fin (11).
# Voix : manim/voix/6e-angle-mesurer.json (validée, débit −6) ; WAV :
# public/sons/6e-angle-mesurer/ ; marques : angle_mesurer_marques.json.
# Outils : prop_commun.py + manim/canvas_angles.py. Ajouté ICI : Jambe, manon(), yanis(),
# Goniometre, table(), ballon(), cahier(), regle(), lu() (les nombres 55, 125, 35, 145 :
# le rapporteur du module n'écrit que les dizaines), halo(), Doigt.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/angle_mesurer.py AngleMesurer6e
# python -m manim render -qh --disable_caching manim/scripts/6e/angle_mesurer.py AngleMesurer6e -o eleveai-maths-6e-angle-mesurer --media_dir manim/scripts/6e/media-angle-04
# Sortie : manim/sorties/6e/maths/angles/04-mesurer/eleveai-maths-6e-angle-mesurer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403
from canvas_angles import *  # noqa: E402,F403

AIGU = FAMILLE["aigu"]
OBTUS = FAMILLE["obtus"]
DROIT_C = FAMILLE["droit"]
PEAU = "#e0ac69"
MAILLOT = "#f97316"
# LA figure des écrans de mesure : le rapporteur est le plus grand objet possible
O_M, R_M, LG_M, X_COL = P(-2.85, -2.0), 3.8, 4.5, 4.36


def halo(t, w=7):
    """Un contour noir derrière un nombre posé sur un trait : il reste lisible."""
    t.set_stroke(BLACK, w, background=True)
    for m in t.family_members_with_points():
        m.joint_type = LineJointType.ROUND  # sans ça, le contour du 3 fait une pointe
    return t


def lu(r, v, rg, fs=30, couleur=None):
    """Le nombre lu, à sa place exacte dans SA rangée (⚠️ le module n'écrit que les
    dizaines : 55, 125, 35, 145 n'existent pas dans r.nombres)."""
    rr = {"int": 0.695, "ext": 0.835}[rg]
    t = Text(str(v), font_size=fs, color=couleur or RANGEE[rg], weight=BOLD)
    t.move_to(polaire(r.direction(v, rg), r.rayon * rr, r.c))
    t.sans_synchro = True
    return halo(t)


class RapporteurM(Rapporteur):
    """⚠️ Défaut du module : les nombres à 3 chiffres de la rangée intérieure se touchent
    (100 et 90, 110 et 100). Corrigé ICI : ils sont un peu plus petits."""

    def __init__(self, *a, **k):
        super().__init__(*a, **k)
        for v in range(100, 181, 10):
            self.nombres["int"][v].scale(0.82)


def coin_pointille(s, dir1, dir2, c=0.42, couleur=WHITE, sw=5):
    u, v = polaire(dir1), polaire(dir2)
    m = VMobject(stroke_color=couleur, stroke_width=sw, fill_opacity=0)
    m.set_points_as_corners([np.array(s) + u * c, np.array(s) + (u + v) * c, np.array(s) + v * c])
    return m


def table(x0, x1, y, pieds=1.0):
    """La table de soin : y = le dessus."""
    g = VGroup(Rectangle(width=x1 - x0, height=0.16, fill_color="#94a3b8", fill_opacity=1, stroke_width=0).move_to(P((x0 + x1) / 2, y - 0.08)))
    for x in (x0 + 0.35, x1 - 0.35):
        g.add(Rectangle(width=0.16, height=pieds, fill_color="#64748b", fill_opacity=1, stroke_width=0).move_to(P(x, y - 0.16 - pieds / 2)))
    return g


def ballon(r=0.42):
    c = Circle(radius=r, fill_color=MAILLOT, fill_opacity=1, stroke_color="#7c2d12", stroke_width=3)
    tr = VGroup(Line(UP * r, DOWN * r), Line(LEFT * r, RIGHT * r), Arc(radius=r * 0.75, start_angle=-0.9, angle=1.8).shift(LEFT * r * 0.95),
                Arc(radius=r * 0.75, start_angle=PI - 0.9, angle=1.8).shift(RIGHT * r * 0.95)).set_stroke("#7c2d12", 3)
    return VGroup(c, tr)


def yanis(s=1.0):
    """Yanis, kinésithérapeute : la blouse blanche."""
    p = visage(personne(peau="#8d5524", tenue="#0ea5e9", cheveux="#111827", s=s))
    b = blouse(p)
    p.add(b)
    return p


def manon(h, s=1.0):
    """Manon allongée sur le dos, tête à gauche ; h = la hanche, le corps part vers la gauche."""
    h = np.array(h, dtype=float)
    buste = RoundedRectangle(width=2.05 * s, height=0.6 * s, corner_radius=0.22 * s, fill_color=MAILLOT, fill_opacity=1,
                             stroke_width=0).move_to(h + P(-0.92 * s, 0.1 * s))
    c = h + P(-2.32 * s, 0.14 * s)
    coussin = RoundedRectangle(width=0.95 * s, height=0.2 * s, corner_radius=0.08 * s, fill_color="#e2e8f0", fill_opacity=1,
                               stroke_width=0).move_to(c + P(-0.05 * s, -0.42 * s))
    cheveux = Circle(radius=0.38 * s, fill_color="#1f2937", fill_opacity=1, stroke_width=0).move_to(c + P(-0.07 * s, 0))
    natte = RoundedRectangle(width=0.55 * s, height=0.2 * s, corner_radius=0.09 * s, fill_color="#1f2937", fill_opacity=1,
                             stroke_width=0).move_to(c + P(-0.5 * s, -0.16 * s))
    tete = Circle(radius=0.34 * s, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(c)
    oeil = Dot(c + P(0.13 * s, 0.1 * s), radius=0.045 * s, color=BLACK)
    oeil2 = Dot(c + P(-0.07 * s, 0.14 * s), radius=0.045 * s, color=BLACK)
    bouche = Arc(radius=0.13 * s, start_angle=-2.3, angle=1.6, arc_center=c + P(0.1 * s, 0.02 * s), color=BLACK, stroke_width=3)
    bras = Line(h + P(-1.6 * s, 0.14 * s), h + P(-0.35 * s, 0.05 * s), color=PEAU, stroke_width=15 * s)
    return VGroup(coussin, natte, cheveux, tete, oeil, oeil2, bouche, buste, bras)


class Jambe(VGroup):
    """La jambe pliée de Manon : la hanche fixe, le pied glisse sur la table.
    j.th = l'angle au genou, EN DEGRÉS, vrai. j.a = l'Angle (côtés bleus, arc) posé
    dessus, à montrer quand on veut (hors du groupe). Tout suit j.th."""

    def __init__(self, h, L=2.4, theta=55, s=1.0, **kw):
        super().__init__(**kw)
        self.h, self.L, self.th = np.array(h, dtype=float), L, ValueTracker(float(theta))
        self.mollet = Line(self.h, self.h + RIGHT, color=PEAU, stroke_width=32 * s)
        self.cuisse = Line(self.h, self.h + RIGHT, color=PEAU, stroke_width=38 * s)
        self.short = Line(self.h, self.h + RIGHT, color="#1d4ed8", stroke_width=42 * s)
        self.rotule = Dot(self.h, radius=0.19 * s, color=PEAU)
        self.pied = RoundedRectangle(width=0.72 * s, height=0.26 * s, corner_radius=0.1 * s, fill_color="#f8fafc", fill_opacity=1, stroke_width=0)
        self.add(self.mollet, self.cuisse, self.short, self.rotule, self.pied)
        self.a = Angle(self.genou, self.d1, self.d2, longueur=L, rayon_arc=0.72, sw=7)
        self._maj()
        self.add_updater(lambda m: m._maj())

    @property
    def alpha(self):
        return (180 - self.th.get_value()) / 2

    @property
    def genou(self):
        return polaire(self.alpha, self.L, self.h)

    @property
    def d1(self):  # du genou vers la hanche
        return 180 + self.alpha

    @property
    def d2(self):  # du genou vers le pied
        return 360 - self.alpha

    def _maj(self):
        g = self.genou
        p = polaire(self.d2, self.L, g)
        self.cuisse.put_start_and_end_on(self.h, g)
        self.short.put_start_and_end_on(self.h, self.h + (g - self.h) * 0.42)
        self.mollet.put_start_and_end_on(g, p)
        self.rotule.move_to(g)
        self.pied.move_to(p + P(0.2, -0.03))
        self.a.tx.set_value(g[0]), self.a.ty.set_value(g[1]), self.a.t1.set_value(self.d1), self.a.t2.set_value(self.d2)

    def plier(self, v):
        return self.th.animate.set_value(v)


class Goniometre(VGroup):
    """Un rapporteur rond avec deux grands bras, posé sur la jambe j : il suit j.th."""

    def __init__(self, j, **kw):
        super().__init__(**kw)
        self.j = j
        self.disque = Circle(radius=0.68, fill_color=EQUERRE, fill_opacity=0.35, stroke_color=EQUERRE, stroke_width=4)
        self.traits = VGroup(*[Line(UP * 0.5, UP * 0.68, color=WHITE, stroke_width=3).rotate(np.deg2rad(a), about_point=ORIGIN) for a in range(0, 360, 30)])
        self.bras1 = Line(LEFT, RIGHT, color="#fde68a", stroke_width=13)
        self.bras2 = Line(LEFT, RIGHT, color="#fde68a", stroke_width=13)
        self.axe = Dot(radius=0.11, color=SOMMET)
        self.add(self.disque, self.traits, self.bras1, self.bras2, self.axe)
        self._o = ORIGIN.copy()
        self._maj()
        self.add_updater(lambda m: m._maj())

    def _maj(self):
        g, L = self.j.genou, self.j.L * 0.98
        self.disque.move_to(g), self.traits.shift(g - self._o), self.axe.move_to(g)
        self._o = g.copy()
        self.bras1.put_start_and_end_on(g, polaire(self.j.d1, L, g))
        self.bras2.put_start_and_end_on(g, polaire(self.j.d2, L, g))


def cahier():
    """La page du cahier, à carreaux discrets : TOUT JUSTE visible, le rapporteur domine."""
    x0, x1, y0, y1 = -6.62, 1.98, -3.5, 3.5
    g = VGroup(Rectangle(width=x1 - x0, height=y1 - y0, fill_color="#0f172a", fill_opacity=1, stroke_color="#334155", stroke_width=2).move_to(P((x0 + x1) / 2, 0)))
    for x in np.arange(x0 + 0.6, x1, 0.6):
        g.add(Line(P(x, y0), P(x, y1), color="#1e293b", stroke_width=1.5))
    for y in np.arange(y0 + 0.5, y1, 0.6):
        g.add(Line(P(x0, y), P(x1, y), color="#1e293b", stroke_width=1.5))
    return g.set_z_index(-2)


def regle(centre, cm=12, u=0.5):
    """Une règle graduée en cm (nombres sans synchro : c'est un objet qu'on lit)."""
    g = VGroup(RoundedRectangle(width=cm * u + 0.5, height=0.85, corner_radius=0.06, fill_color="#fef3c7", fill_opacity=1, stroke_width=0))
    x0 = -cm * u / 2
    for i in range(cm + 1):
        g.add(Line(P(x0 + i * u, 0.425), P(x0 + i * u, 0.14), color="#451a03", stroke_width=3))
        if i % 2 == 0:
            n = Text(str(i), font_size=20, color="#451a03")
            n.sans_synchro = n._pas_audit = True
            g.add(n.move_to(P(x0 + i * u, -0.1)))
    return g.move_to(centre)


class Doigt(VGroup):
    """Le doigt qui suit une rangée depuis son 0 : un anneau, une trace verte, les nombres
    passés deviennent verts. d.v = où il est. À mettre sur la scène puis d.v.animate…"""

    def __init__(self, r, rg, couleur=VERT_OK, **kw):
        super().__init__(**kw)
        self.r, self.rg, self.coul = r, rg, couleur
        self.v = ValueTracker(0.0)
        self.rho = r.rayon * {"int": 0.695, "ext": 0.835}[rg]
        self.rho_t = r.rayon * {"int": 0.61, "ext": 0.768}[rg]
        self.anneau = Circle(radius=0.23 * r.rayon / 3.8, stroke_color=AMBRE, stroke_width=6)
        self.trace = VMobject(stroke_color=couleur, stroke_width=7, fill_opacity=0)
        self.add(self.trace, self.anneau)
        self._maj()
        self.add_updater(lambda m: m._maj())

    def _maj(self):
        v, r = self.v.get_value(), self.r
        d0, d = r.direction(0, self.rg), r.direction(v, self.rg)
        sens = 1 if r.direction(10, self.rg) > d0 else -1
        self.anneau.move_to(polaire(d + sens * 3.5 * max(0.0, 1 - v / 10), self.rho, r.c))
        ang = np.deg2rad(d - d0)
        self.trace.set_points(Arc(radius=self.rho_t, start_angle=np.deg2rad(d0), angle=ang if abs(ang) > 1e-3 else 1e-3, arc_center=r.c).get_points())
        for x, t in r.nombres[self.rg].items():
            if x <= v + 0.5:
                t.set_color(self.coul)

    def aller(self, v):
        return self.v.animate.set_value(v)


class AngleMesurerBase(PaysageProp):
    nom_voix = "6e-angle-mesurer"
    fichier_marques = "angle_mesurer_marques.json"
    _avec = None
    x_col = 3.75

    def play(self, *a, **k):
        """Ce qui doit partir AVEC l'animation suivante (la figure d'un choix)."""
        if self._avec:
            a, self._avec = (*a, *self._avec), None
        return super().play(*a, **k)

    def au_mot(self, extrait, n=1):
        super().au_mot(extrait, n)
        crochet = getattr(self, "_crochets", {}).pop(extrait, None) if hasattr(self, "_crochets") else None
        if crochet:
            self._avec = crochet

    def cc(self, mob, y, x=None):
        """La colonne de droite : tout y a le MÊME CENTRE."""
        return mob.move_to(P(self.x_col if x is None else x, y))

    def figure_mesure(self, mesure=55):
        """L'angle et le rapporteur POSÉ : le 0 intérieur sur le côté horizontal."""
        a = Angle(O_M, 0, mesure, longueur=LG_M, rayon_arc=0.75, sw=7)
        r = RapporteurM(O_M, R_M)
        return a, r

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Mesurer un angle", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Mesurer")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = VGroup(self.t("Comment lire", 38), self.t("un rapporteur", 38), self.t("sans se tromper", 38), self.t("de rangée ?", 38)).arrange(DOWN, buff=0.14)
        interligne_regulier(q)
        q.move_to(P(-3.5, 0.4))
        c = P(3.3, -0.85)
        a = Angle(c, 0, 55, longueur=3.0, rayon_arc=0.5, sw=6)
        r = RapporteurM(c, 2.65)
        self.au_mot("Comment")
        self.play(FadeIn(q[0], shift=UP * 0.2), run_time=0.3)
        self.au_mot("un rapporteur")
        self.play(FadeIn(q[1], shift=UP * 0.2), FadeIn(a), FadeIn(r, shift=UP * 0.2), run_time=0.4)
        self.au_mot("sans se")
        self.play(FadeIn(q[2], shift=UP * 0.2), run_time=0.3)
        self.au_mot("rangée")
        self.play(FadeIn(q[3], shift=UP * 0.2), r.allumer_rangee("int", AMBRE), run_time=0.4)
        self.play(r.eteindre_rangees(), run_time=0.2)
        self.play(r.allumer_rangee("ext", AMBRE), run_time=0.4)
        self.play(r.eteindre_rangees(), run_time=0.2)
        a.figer()
        self.attendre_voix(marge=0.6)

    # ── 01 : Yanis, Manon ───────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        ya = yanis(1.0).move_to(P(-4.9, -0.55))
        self.au_mot("Voici Yanis")
        nom = self.t("Yanis", 44, BLEU_CALCUL).next_to(ya, UP, buff=0.2)
        self.play(FadeIn(ya, shift=UP * 0.3), FadeIn(nom), run_time=0.5)
        self.au_mot("kinésithérapeute")
        met = self.t("kinésithérapeute", 28, BLEU_CALCUL).next_to(ya, DOWN, buff=0.18)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        y_t = -1.2
        tb = table(-3.2, 4.75, y_t)
        h = P(-0.35, y_t + 0.2)
        j = Jambe(h, L=2.3, theta=118)
        mn = manon(h, 1.0)
        self.au_mot("Manon")
        nm = self.t("Manon", 40, MAILLOT).move_to(P(-1.7, 0.1))
        l1 = self.t("Manon s'est blessée au genou,", 36).move_to(P(1.1, 3.0))
        self.play(FadeIn(tb), FadeIn(mn), FadeIn(j), FadeIn(nm), FadeIn(l1, shift=UP * 0.1), run_time=0.45)
        self.au_mot("au genou")
        rond = Circle(radius=0.42, stroke_color=SOMMET, stroke_width=7).move_to(j.genou)
        self.play(Create(rond), Flash(j.genou, color=SOMMET, line_length=0.3), run_time=0.45)
        self.au_mot("au basket")
        l2 = self.t("au basket.", 36, MAILLOT).move_to(P(1.1, 2.4))
        b = ballon(0.45).move_to(P(4.2, 1.5))
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(b, scale=0.5), run_time=0.3)
        self.play(b.animate.move_to(P(4.2, y_t + 0.45)), run_time=0.3, rate_func=rush_into)
        self.play(b.animate.move_to(P(4.2, 1.2)), run_time=0.3, rate_func=rush_from)
        self.play(b.animate.move_to(P(4.2, y_t + 0.45)), run_time=0.3, rate_func=rush_into)
        self.au_mot("Yanis veut")
        self.play(FadeOut(l1), FadeOut(l2), FadeOut(b), FadeOut(rond), run_time=0.12)
        l3 = self.t("Yanis veut savoir", 36).move_to(P(1.1, 3.0))
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.25)
        self.au_mot("si son genou")
        l4 = self.t("si son genou plie mieux.", 36, VERT_OK).move_to(P(1.1, 2.4))
        self.play(FadeIn(l4, shift=UP * 0.1), j.plier(55), run_time=1.5)
        self.attendre_voix()
        j.clear_updaters()

    # ── 02 : l'angle, le goniomètre ─────────────────────────────────────────
    def ecran_outil(self):
        self.ecran("02-outil")
        self.x_col = 3.75
        y_t = -2.1
        tb = table(-6.6, 0.65, y_t, pieds=0.95)
        h = P(-3.45, y_t + 0.2)
        j = Jambe(h, L=3.0, theta=55)
        mn = manon(h, 1.0)
        self.add(tb, mn, j)
        a = j.a
        self.au_mot("Il regarde")
        l1 = self.t("Il regarde l'angle", 40)
        self.cc(l1, 2.75)
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.3)
        self.au_mot("la cuisse")
        cu = self.t("la cuisse", 34, COTE).move_to(P(-4.75, -0.4))
        l_c = Line(cu.get_right() + RIGHT * 0.08, P(-2.92, -0.4), color=COTE, stroke_width=3)
        a.maj()
        self.play(FadeIn(a.cote1), FadeIn(cu), Create(l_c), run_time=0.4)
        self.au_mot("le mollet")
        mo = self.t("le mollet", 34, COTE).move_to(P(0.08, -0.4))
        l_m = Line(P(-1.2, -0.4), mo.get_left() + LEFT * 0.08, color=COTE, stroke_width=3)
        self.play(FadeIn(a.cote2), FadeIn(mo), Create(l_m), run_time=0.4)
        self.play(FadeIn(a.arc), FadeIn(a.fond), run_time=0.3)
        self.au_mot("Le sommet")
        l2 = VGroup(self.t("Le sommet,", 40), self.t("c'est le genou.", 40, SOMMET)).arrange(DOWN, buff=0.12)
        interligne_regulier(l2)
        self.cc(l2, 1.45)
        self.play(FadeIn(l2[0], shift=UP * 0.15), FadeIn(a.point, scale=3), run_time=0.35)
        self.au_mot("c'est le genou")
        self.play(FadeIn(l2[1], shift=UP * 0.15), a.point.animate.scale(2.2), run_time=0.3)
        self.play(a.point.animate.scale(1 / 2.2), Flash(j.genou, color=SOMMET, line_length=0.3), run_time=0.35)
        self.au_mot("Son outil")
        go = Goniometre(j)
        self.play(FadeOut(l1), FadeOut(l2), run_time=0.12)
        l3 = self.t("Son outil :", 38)
        self.cc(l3, 2.5)
        self.play(FadeIn(l3, shift=UP * 0.15), run_time=0.25)
        self.au_mot("goniomètre")
        l4 = self.t("un goniomètre", 44, "#fde68a")
        self.cc(l4, 1.7)
        self.play(FadeIn(l4, scale=1.2), FadeIn(go, scale=0.8), FadeOut(a.arc), FadeOut(a.fond), run_time=0.45)
        self.au_mot("un rapporteur")
        l5 = VGroup(self.t("un rapporteur", 36), self.t("avec deux grands bras.", 32)).arrange(DOWN, buff=0.12)
        interligne_regulier(l5)
        self.cc(l5, 0.55)
        self.play(FadeIn(l5[0], shift=UP * 0.15), Indicate(go.disque, color=WHITE, scale_factor=1.3), run_time=0.4)
        self.au_mot("avec deux")
        self.play(FadeIn(l5[1], shift=UP * 0.15), run_time=0.3)
        self.au_mot("bras")
        self.play(j.plier(66), run_time=0.45)
        self.play(j.plier(55), run_time=0.45)
        self.attendre_voix()
        j.clear_updaters(), go.clear_updaters(), a.figer()

    # ── 03 : le rapporteur, la règle ────────────────────────────────────────
    def ecran_rapporteur(self):
        self.ecran("03-rapporteur")
        self.x_col = X_COL
        page = cahier()
        self.add(page)
        c = P(-2.4, -0.45)
        r = RapporteurM(c, 3.6)
        self.au_mot("Toi")
        l1 = VGroup(self.t("Toi,", 36), self.t("sur ton cahier,", 36)).arrange(DOWN, buff=0.16)
        interligne_regulier(l1)
        self.cc(l1, 2.75)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.2)
        self.au_mot("sur ton cahier")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("tu prends")
        l2 = VGroup(self.t("tu prends", 36), self.t("un rapporteur.", 36, RAPPORTEUR)).arrange(DOWN, buff=0.16)
        interligne_regulier(l2)
        self.cc(l2, 1.45)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.2)
        self.au_mot("un rapporteur")
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(r, shift=UP * 0.6), run_time=0.55)
        self.au_mot("Il est")
        l3 = VGroup(self.t("Il est gradué", 36), self.t("en degrés : °", 36, AMBRE)).arrange(DOWN, buff=0.16)
        interligne_regulier(l3)
        self.cc(l3, 0.15)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.2)
        self.play(LaggedStart(*[Indicate(r.graduations[v], color=AMBRE, scale_factor=1.5) for v in range(0, 181, 10)], lag_ratio=0.2), run_time=0.5)
        self.au_mot("en degrés")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.25)
        self.insister(l3[1], 1.2, 0.15)
        self.au_mot("Une règle")
        self.play(FadeOut(VGroup(l1, l2, l3)), run_time=0.12)
        gr = regle(P(-2.4, -2.2), 12, 0.6)
        l4 = VGroup(self.t("Une règle mesure", 36), self.t("des longueurs.", 36, COTE)).arrange(DOWN, buff=0.16)
        interligne_regulier(l4)
        self.cc(l4, 2.1)
        self.play(FadeIn(l4[0], shift=UP * 0.1), FadeIn(gr, shift=UP * 0.3), run_time=0.4)
        self.au_mot("des longueurs")
        seg = Line(gr.get_left() + P(0.25, 0.53), gr.get_left() + P(0.25 + 0.6 * 9, 0.53), color=COTE, stroke_width=9)
        self.play(FadeIn(l4[1], shift=UP * 0.1), Create(seg), run_time=0.5)
        self.au_mot("Un rapporteur")
        l5 = VGroup(self.t("Un rapporteur", 36), self.t("mesure des angles.", 32, ARC)).arrange(DOWN, buff=0.16)
        interligne_regulier(l5)
        self.cc(l5, 0.5)
        self.play(FadeOut(seg), run_time=0.12)
        self.play(FadeIn(l5[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("mesure des angles")
        a = Angle(c, 0, 8, longueur=3.6, rayon_arc=0.7, sw=7)
        self.remove(r)
        self.add(a, r)
        self.play(FadeIn(l5[1], shift=UP * 0.1), a.ouvrir(70), run_time=0.9)
        self.attendre_voix()
        a.figer()

    # ── 04 : les trois gestes (le cœur) ─────────────────────────────────────
    def geste(self, tete, lignes, mots, y=1.2, fs=38):
        """Un geste à la fois, en grand : le mot (Un, Deux, Trois) puis ses lignes, au mot."""
        g = VGroup(self.t(tete, 52, AMBRE), *[self.t(s, fs, c) for s, c in lignes]).arrange(DOWN, buff=0.16)
        interligne_regulier(g[1:])
        self.cc(g, y)
        return g

    def ecran_methode(self):
        self.ecran("04-methode")
        self.x_col = X_COL
        page = cahier()
        a = Angle(O_M, 0, 55, longueur=LG_M, rayon_arc=0.75, sw=7)
        self.add(page, a)
        r = RapporteurM(O_M, R_M)
        r._placer(O_M + P(1.25, 1.0), -10)  # posé de travers, à côté du sommet
        tit = self.t("Trois gestes", 46, JAUNE_TITRE).move_to(P(X_COL, 3.05))
        self.au_mot("Trois")
        self.play(Write(tit), run_time=0.45)
        # ── Un : le centre sur le sommet ──
        self.au_mot("Un :")
        g = self.geste("Un :", [("le centre", WHITE), ("du rapporteur", WHITE), ("sur le sommet.", SOMMET)], None, y=0.9)
        self.play(FadeIn(g[0], scale=1.3), FadeIn(r, shift=DOWN * 0.3), run_time=0.35)
        self.au_mot("le centre")
        self.play(FadeIn(g[1], shift=UP * 0.1), r.centre_marque.animate.scale(1.8), run_time=0.3)
        self.play(r.centre_marque.animate.scale(1 / 1.8), run_time=0.2)
        self.au_mot("du rapporteur")
        self.play(FadeIn(g[2], shift=UP * 0.1), run_time=0.25)
        self.au_mot("sur le sommet")
        lb_s = self.t("sommet", 30, SOMMET).move_to(O_M + P(0, -1.05))
        lb_s.sans_synchro = True
        fl = Line(lb_s.get_top(), O_M + P(0, -0.42), color=SOMMET, stroke_width=3)
        self.play(FadeIn(g[3], shift=UP * 0.1), r.poser(O_M, -10), FadeIn(lb_s), Create(fl), run_time=0.9)
        self.play(Flash(O_M, color=SOMMET, line_length=0.3), run_time=0.35)
        # ── Deux : le 0 sur un côté ──
        self.au_mot("Deux")
        self.play(FadeOut(g), run_time=0.12)
        g = self.geste("Deux :", [("le 0", VERT_OK), ("sur un côté.", COTE)], None, y=1.2)
        self.play(FadeIn(g[0], scale=1.3), run_time=0.25)
        self.au_mot("le 0")
        self.play(FadeIn(g[1], shift=UP * 0.1), r.allumer_nombre(0, "int", k=1.35), run_time=0.3)
        self.au_mot("sur un côté")
        self.play(FadeIn(g[2], shift=UP * 0.1), r.poser(O_M, 0), run_time=0.9)
        trait = Line(O_M, O_M + RIGHT * R_M, color=VERT_OK, stroke_width=9)
        self.play(Create(trait), run_time=0.3)
        lb_c = self.t("un côté", 30, COTE).move_to(O_M + P(3.45, -0.68))
        lb_c.sans_synchro = True
        self.play(FadeIn(lb_c), run_time=0.2)
        # ── Trois : on lit ──
        self.au_mot("Trois :")
        self.play(FadeOut(g), run_time=0.12)
        g = self.geste("Trois :", [("on lit le nombre", WHITE), ("sur l'autre côté.", COTE)], None, y=1.2, fs=36)
        self.play(FadeIn(g[0], scale=1.3), run_time=0.25)
        self.au_mot("on lit")
        self.play(FadeIn(g[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("sur l'autre")
        trait2 = Line(O_M, polaire(55, LG_M, O_M), color=AMBRE, stroke_width=9)
        lb_a = self.t("l'autre côté", 30, COTE).move_to(polaire(55, LG_M, O_M) + P(0.25, 0.4))
        self.play(FadeIn(g[2], shift=UP * 0.1), Create(trait2), FadeIn(lb_a), run_time=0.5)
        # ── Ici, 55 ──
        self.au_mot("Ici")
        ici = VGroup(self.t("Ici,", 44), self.t("55", 44, VERT_OK)).arrange(RIGHT, buff=0.18)
        self.cc(ici, -0.2)
        n55 = lu(r, 55, "int", 26, VERT_OK)
        self.play(FadeIn(ici[0]), r.allumer_graduation(55), *[r.nombres["int"][v].animate.set_opacity(0) for v in (50, 60)],
                  *[r.rangees["ext"].animate.set_opacity(0.35)], run_time=0.4)
        self.au_mot("55")
        self.play(FadeIn(n55, scale=1.5), FadeIn(ici[1], scale=1.5), run_time=0.3)
        self.play(n55.animate.scale(1.5), run_time=0.25)
        self.play(n55.animate.scale(1 / 1.5), run_time=0.25)
        self.au_mot("L'angle")
        fin = self.t("L'angle mesure", 36)
        self.cc(fin, -0.95)
        self.play(FadeIn(fin, shift=UP * 0.1), run_time=0.3)
        self.au_mot("55 degrés")
        v = self.t("55°", 64, VERT_OK)
        self.cc(v, -1.65)
        self.play(FadeIn(v, scale=1.4), Indicate(a.arc, color=VERT_OK, scale_factor=1.0), run_time=0.35)
        self.insister(v, 1.25, 0.2)
        self.attendre_voix()
        a.figer()

    # ── 05 : QUESTION 1 (où poser le centre ?) ──────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        s = P(-3.55, -1.75)
        a = Angle(s, 0, 55, longueur=4.1, rayon_arc=0.7, sw=7)
        def rond(l, p):
            c = Circle(radius=0.3, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=0).move_to(p)
            t = Text(l, font_size=32, color=WHITE, weight=BOLD).move_to(c)
            t.sans_synchro = t._pas_audit = True
            return VGroup(c, t)
        bout = s + RIGHT * 4.1
        mil = polaire(27.5, 2.0, s)
        ra, rb, rc = rond("A", s + P(-0.2, -0.62)), rond("B", bout + P(-0.1, -0.62)), rond("C", mil)
        self._crochets = {"A :": [FadeIn(ra, scale=1.5), Flash(s, color=AMBRE, line_length=0.25)],
                          "B :": [FadeIn(rb, scale=1.5), Flash(bout, color=AMBRE, line_length=0.25)],
                          "C :": [FadeIn(rc, scale=1.5)]}
        self.add(a)
        r = RapporteurM(s + P(0.5, 1.1), 3.0)
        r._placer(s + P(0.5, 1.1), -14)

        def apres(sc):
            sc.au_mot("Le centre")
            sc.play(FadeOut(rb), FadeOut(rc), FadeOut(ra), FadeIn(r), run_time=0.25)
            sc.play(FadeIn(sc.ph_q[0], shift=UP * 0.15), r.poser(s, 0), run_time=0.85)
            sc.au_mot("sur le sommet")
            sc.play(FadeIn(sc.ph_q[1], shift=UP * 0.15), Flash(s, color=VERT_OK, line_length=0.3), run_time=0.35)
            sc.au_mot("Sinon")
            faux = sc.t("Sinon, la mesure est fausse.", 32, ROUGE_ERREUR).move_to(P(-3.0, -2.85))
            sc.play(FadeIn(faux, shift=UP * 0.15), r.poser(s + RIGHT * 0.95, 0), run_time=0.55)
            # le côté coupe le bord du rapporteur décalé ailleurs qu'à 55 : on le montre
            cx = r.c
            u = polaire(55)
            b = np.dot(s - cx, u)
            t_c = -b + np.sqrt(b * b - (np.dot(s - cx, s - cx) - r.rayon ** 2))
            p_c = s + u * t_c
            k = Circle(radius=0.26, stroke_color=ROUGE_ERREUR, stroke_width=7).move_to(p_c)
            sc.play(Create(k), run_time=0.35)
            sc.rep_fini()
            a.figer()

        self.question_pause("05-question", "05b-reponse", ["Où poses-tu le centre", "du rapporteur ?"],
                            [self.t("sur le sommet", 32), self.t("au bout d'un côté", 32), self.t("au milieu de l'angle", 32)], 0,
                            ["Le centre va pile", "sur le sommet."], mot_q="Où",
                            autres_r=apres)

    # ── 06 : les deux rangées ───────────────────────────────────────────────
    def ecran_rangees(self):
        self.ecran("06-rangees")
        self.x_col = X_COL
        page = cahier()
        a, r = self.figure_mesure()
        self.add(page, a, r)
        trait = Line(O_M, polaire(55, LG_M, O_M), color=COTE, stroke_width=9)
        self.au_mot("Mais")
        l1 = VGroup(self.t("Mais le rapporteur", 32), self.t("a deux rangées", 36, AMBRE), self.t("de nombres.", 36)).arrange(DOWN, buff=0.16)
        interligne_regulier(l1)
        self.cc(l1, 2.5)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("deux rangées")
        self.play(FadeIn(l1[1], shift=UP * 0.1), r.rangees["int"].animate.set_color(AMBRE), run_time=0.35)
        self.au_mot("de nombres")
        self.play(FadeIn(l1[2], shift=UP * 0.1), r.rangees["int"].animate.set_color(RANGEE["int"]), r.rangees["ext"].animate.set_color(AMBRE), run_time=0.4)
        self.play(r.rangees["ext"].animate.set_color(RANGEE["ext"]), run_time=0.3)
        self.au_mot("Au même")
        self.play(FadeOut(l1), run_time=0.12)
        l2 = self.t("Au même endroit,", 36)
        self.cc(l2, 2.5)
        self.play(FadeIn(l2, shift=UP * 0.1), Create(trait), run_time=0.45)
        self.au_mot("on lit")
        lit = VGroup(self.t("on lit", 36), self.t("55", 36), self.t("et", 36), self.t("125", 36, RANGEE["ext"])).arrange(RIGHT, buff=0.16)
        self.cc(lit, 1.85)
        n55, n125 = lu(r, 55, "int", 26), lu(r, 125, "ext", 26)
        self.play(FadeIn(lit[0]), *[r.nombres["int"][v].animate.set_opacity(0) for v in (50, 60)],
                  *[r.nombres["ext"][v].animate.set_opacity(0) for v in (120, 130)], r.allumer_graduation(55, AMBRE), run_time=0.25)
        self.au_mot("55 et")
        self.play(FadeIn(lit[1], scale=1.3), FadeIn(lit[2]), FadeIn(n55, scale=1.6), run_time=0.3)
        self.au_mot("125")
        self.play(FadeIn(lit[3], scale=1.3), FadeIn(n125, scale=1.6), run_time=0.3)
        self.au_mot("Laquelle")
        q = VGroup(self.t("Laquelle", 34, ORANGE_RETENUE), self.t("est la bonne ?", 34, ORANGE_RETENUE)).arrange(DOWN, buff=0.16)
        interligne_regulier(q)
        self.cc(q, 0.95)
        self.play(FadeIn(q[0], scale=1.2), run_time=0.25)
        self.au_mot("est la bonne")
        self.play(FadeIn(q[1], scale=1.2), run_time=0.25)
        self.play(n55.animate.scale(1.2), n125.animate.scale(1.2), run_time=0.25)
        self.play(n55.animate.scale(1 / 1.2), n125.animate.scale(1 / 1.2), run_time=0.25)
        self.au_mot("Celle")
        self.play(FadeOut(VGroup(l2, lit, q)), run_time=0.12)
        l3 = VGroup(self.t("Celle qui part", 38, VERT_OK), self.t("du 0 posé", 38, VERT_OK), self.t("sur le côté.", 38, VERT_OK)).arrange(DOWN, buff=0.16)
        interligne_regulier(l3)
        self.cc(l3, 1.6)
        d = Doigt(r, "int")
        # 120 et 130 restent cachés sous le 125 (sinon, fantôme de nombres superposés)
        self.play(FadeIn(l3[0], shift=UP * 0.1), *[r.nombres["ext"][v].animate.set_opacity(0.3) for v in range(0, 181, 10) if v not in (120, 130)],
                  n125.animate.set_opacity(0.3), run_time=0.35)
        self.au_mot("du 0")
        z = Line(O_M, O_M + RIGHT * R_M, color=VERT_OK, stroke_width=9)
        # le 10 s'efface le temps que l'anneau entoure le 0 (ils se toucheraient)
        self.play(FadeIn(l3[1], shift=UP * 0.1), FadeIn(d, scale=1.6), r.allumer_nombre(0, "int", k=1.35), r.nombres["int"][10].animate.set_opacity(0), Create(z), run_time=0.4)
        self.au_mot("sur le côté")
        self.play(FadeIn(l3[2], shift=UP * 0.1), d.aller(55), r.nombres["int"][10].animate.set_opacity(1), run_time=1.2, rate_func=linear)
        # arrivé : l'anneau s'efface, le nombre lu reste seul et lisible (fill seul : son halo reste noir)
        self.play(n55.animate.set_fill(VERT_OK).scale(1.4), d.anneau.animate.set_stroke(opacity=0), r.allumer_graduation(55), run_time=0.25)
        self.play(n55.animate.scale(1 / 1.4), run_time=0.25)
        self.attendre_voix(marge=0.5)
        d.clear_updaters(), a.figer()

    # ── 07 : le contrôle : aigu ─────────────────────────────────────────────
    def ecran_controle(self):
        self.ecran("07-controle")
        self.x_col = X_COL
        page = cahier()
        a, r = self.figure_mesure()
        self.add(page, a, r)
        self.au_mot("Pour")
        l1 = VGroup(self.t("Pour vérifier,", 36), self.t("regarde l'angle.", 36)).arrange(DOWN, buff=0.16)
        interligne_regulier(l1)
        self.cc(l1, 2.65)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("regarde")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeOut(r), a.arc.animate.set_stroke(width=10), run_time=0.45)
        self.au_mot("Il est plus")
        l2 = VGroup(self.t("Il est plus petit", 36), self.t("qu'un coin :", 36, DROIT_C)).arrange(DOWN, buff=0.16)
        interligne_regulier(l2)
        self.cc(l2, 1.15)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("qu'un coin")
        dv = DashedLine(O_M, O_M + UP * 3.8, color=DROIT_C, stroke_width=6, dash_length=0.2)
        dh = DashedLine(O_M, O_M + RIGHT * 3.8, color=DROIT_C, stroke_width=6, dash_length=0.2)
        cp = coin_pointille(O_M, 0, 90, c=0.5, couleur=DROIT_C, sw=5)
        self.play(FadeIn(l2[1], shift=UP * 0.1), Create(dv), Create(dh), Create(cp), run_time=0.55)
        self.au_mot("il est aigu")
        v = self.tampon("il est aigu.", AIGU, 38)
        self.cc(v, 0.0)
        ecart = AnnularSector(inner_radius=0, outer_radius=3.0, angle=np.deg2rad(35), start_angle=np.deg2rad(55), arc_center=O_M,
                              fill_color=DROIT_C, fill_opacity=0.22, stroke_width=0)
        self.play(FadeIn(v, scale=1.25), FadeIn(ecart), a.arc.animate.set_stroke(AIGU), run_time=0.4)
        self.au_mot("Donc")
        l3 = self.t("Donc c'est", 36)
        self.cc(l3, -0.8)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.25)
        self.au_mot("55 degrés")
        n = self.t("55°", 54, VERT_OK)
        ok = self.coche(VERT_OK, 0.2).next_to(n, LEFT, buff=0.15)
        self.cc(VGroup(ok, n), -1.55)
        self.play(FadeIn(n, scale=1.4), Create(ok), run_time=0.3)
        self.au_mot("pas 125")
        pas = VGroup(self.t("pas", 34), self.t("125", 40, ROUGE_ERREUR)).arrange(RIGHT, buff=0.14)
        self.cc(pas, -2.4, 3.95)
        x = croix(pas[1].copy().scale(1.2), sw=6)
        self.play(FadeIn(pas, scale=1.2), run_time=0.2)
        self.play(Create(x), run_time=0.2)
        self.attendre_voix()
        a.figer()

    # ── 08 : QUESTION 2 (un mois plus tôt : 60 et 120) ──────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        y_t = -1.05
        tb = table(-6.5, 0.6, y_t, pieds=0.9)
        h = P(-3.3, y_t + 0.2)
        j = Jambe(h, L=1.75, theta=55, s=0.85)
        mn = manon(h, 0.85)
        cap1 = self.t("Un mois plus tôt,", 32).move_to(P(-3.0, 3.1))
        cap2 = self.t("le genou de Manon pliait moins.", 30).move_to(P(-3.0, 2.55))
        s = P(-3.1, -2.0)
        a = Angle(s, 0, 120, longueur=3.55, rayon_arc=0.6, sw=7, couleur_arc=OBTUS)
        r = RapporteurM(s, 3.15)
        for rg, v in (("int", 120), ("ext", 60)):
            halo(r.nombres[rg][v])

        def avant(sc):
            sc.au_mot("Un mois")
            sc.play(FadeIn(tb), FadeIn(mn), FadeIn(j), FadeIn(cap1, shift=UP * 0.1), run_time=0.35)
            sc.au_mot("le genou")
            sc.play(FadeIn(cap2, shift=UP * 0.1), run_time=0.3)
            sc.au_mot("pliait")
            sc.play(j.plier(120), run_time=0.9)
            sc.au_mot("L'angle était")
            j.a.maj()
            arc_j = j.a.copie()
            arc_j.arc.set_stroke(OBTUS), arc_j.fond.set_fill(OBTUS)
            cap3 = sc.t("L'angle était obtus.", 32, OBTUS).move_to(P(-3.0, 2.0))
            sc.play(FadeIn(arc_j), FadeIn(cap3, shift=UP * 0.1), run_time=0.35)
            sc.au_mot("Le rapporteur")
            j.clear_updaters()
            sc.play(FadeOut(tb), FadeOut(mn), FadeOut(j), FadeOut(arc_j), run_time=0.15)
            sc.play(FadeIn(a), FadeIn(r), run_time=0.3)
            sc.au_mot("60 et")
            sc.play(*[r.nombres["int"][v].animate.set_opacity(0.45) for v in range(0, 181, 10) if v != 120],
                    *[r.nombres["ext"][v].animate.set_opacity(0.45) for v in range(0, 181, 10) if v != 60],
                    r.allumer_nombre(60, "ext", AMBRE, 1.4), run_time=0.3)
            sc.au_mot("120")
            sc.play(r.allumer_nombre(120, "int", AMBRE, 1.4), run_time=0.3)
            sc.au_mot("Quelle")
            sc._cap3 = cap3

        def apres(sc):
            sc.au_mot("Un angle")
            sc.play(FadeOut(cap1), FadeOut(cap2), FadeOut(sc._cap3), run_time=0.12)
            sc.play(FadeIn(sc.ph_q[0], shift=UP * 0.15), run_time=0.25)
            sc.au_mot("plus grand")
            d = DashedLine(s, s + UP * 3.0, color=DROIT_C, stroke_width=6, dash_length=0.2)
            sc.play(FadeIn(sc.ph_q[1], shift=UP * 0.15), Create(d), FadeIn(coin_pointille(s, 0, 90, c=0.42, couleur=DROIT_C)), run_time=0.45)
            sc.au_mot("Donc")
            sc.play(FadeIn(sc.ph_q[2], shift=UP * 0.15), r.nombres["int"][120].animate.set_color(VERT_OK).scale(1.3), run_time=0.3)
            sc.play(r.nombres["int"][120].animate.scale(1 / 1.3), run_time=0.2)
            sc.au_mot("Aujourd'hui")
            c1 = sc.t("Aujourd'hui, 55° :", 32, VERT_OK).move_to(P(-3.0, 3.1))
            c2 = VGroup(sc.t("le genou de Manon", 32, VERT_OK), sc.t("plie bien mieux !", 32, VERT_OK)).arrange(DOWN, buff=0.16)
            interligne_regulier(c2)
            c2.move_to(P(-3.0, 2.2))
            n55 = lu(r, 55, "int", 22, VERT_OK)
            n55._pas_audit = True  # la ligne « Aujourd'hui, 55° » est posée au mot ; ici, la lecture sur la figure
            sc.play(FadeIn(c1, shift=UP * 0.1), a.ouvrir(55), a.arc.animate.set_stroke(ARC), a.fond.animate.set_fill(ARC), r.nombres["int"][120].animate.set_opacity(0.3).set_color(RANGEE["int"]).scale(1 / 1.4),
                    r.nombres["ext"][60].animate.set_opacity(0.3).set_color(RANGEE["ext"]).scale(1 / 1.4), run_time=1.0)
            sc.play(FadeIn(n55, scale=1.5), r.nombres["int"][50].animate.set_opacity(0), r.nombres["int"][60].animate.set_opacity(0), run_time=0.2)
            sc.au_mot("le genou")
            sc.play(FadeIn(c2[0], shift=UP * 0.1), run_time=0.25)
            sc.au_mot("plie bien")
            sc.play(FadeIn(c2[1], shift=UP * 0.1), run_time=0.25)
            sc.rep_fini()
            a.figer()

        self.question_pause("08-question", "08b-reponse", ["Quelle est la mesure ?"],
                            [self.t("60°", 34), self.t("120°", 34), self.t("180°", 34)], 1,
                            ["Un angle obtus est", "plus grand que 90°.", "Donc 120."], mot_q="Un mois",
                            avant_q=avant, autres_r=apres)

    # ── 09 : le défi : le 0 à gauche ────────────────────────────────────────
    def figure_defi(self):
        s = P(-2.15, -2.0)
        a = Angle(s, 180, 145, longueur=4.45, rayon_arc=1.0, sw=7)
        r = RapporteurM(s, R_M)
        return s, a, r

    def ecran_defi(self):
        self.ecran("09-defi")
        self.x_col = X_COL
        page = cahier()
        self.add(page)
        s, a, r = self.figure_defi()
        self.au_mot("À toi")
        tit = self.t("À toi de jouer !", 38, JAUNE_TITRE).move_to(P(X_COL, 3.05))
        self.play(Write(tit), FadeIn(a), FadeIn(r), run_time=0.45)
        self.au_mot("0 est")
        l1 = VGroup(self.t("Le 0 est posé", 36), self.t("à gauche,", 36, AMBRE), self.t("sur un côté.", 36, COTE)).arrange(DOWN, buff=0.16)
        interligne_regulier(l1)
        self.cc(l1, 1.75)
        l1[0].sans_synchro = True  # posée au mot « 0 », sans attendre « posé »
        anneau = Circle(radius=0.25, stroke_color=AMBRE, stroke_width=6).move_to(r.nombres["ext"][0])
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("à gauche")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Create(anneau), r.allumer_nombre(0, "ext", AMBRE, 1.35), r.nombres["ext"][10].animate.set_opacity(0), run_time=0.35)
        self.au_mot("sur un côté")
        z = Line(s, s + LEFT * R_M, color=AMBRE, stroke_width=9)
        self.play(FadeIn(l1[2], shift=UP * 0.1), Create(z), run_time=0.4)
        self.au_mot("L'autre")
        l2 = VGroup(self.t("L'autre côté", 36), self.t("passe par", 36)).arrange(DOWN, buff=0.26)
        interligne_regulier(l2)
        self.cc(l2, 1.95)
        t2 = Line(s, polaire(145, 4.45, s), color=AMBRE, stroke_width=9)
        self.play(FadeOut(l1), FadeOut(anneau), r.nombres["ext"][10].animate.set_opacity(1), run_time=0.12)
        self.play(FadeIn(l2[0], shift=UP * 0.1), Create(t2), run_time=0.35)
        self.au_mot("passe")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("35 et")
        lit = VGroup(self.t("35", 40, RANGEE["ext"]), self.t("et", 36), self.t("145", 40)).arrange(RIGHT, buff=0.16)
        self.cc(lit, 0.95)
        n35, n145 = lu(r, 35, "ext", 24), lu(r, 145, "int", 22)
        self.play(FadeIn(lit[0], scale=1.3), FadeIn(lit[1]), FadeIn(n35, scale=1.5), r.nombres["ext"][30].animate.set_opacity(0), r.nombres["ext"][40].animate.set_opacity(0), run_time=0.3)
        self.au_mot("145")
        self.play(FadeIn(lit[2], scale=1.3), FadeIn(n145, scale=1.5), r.nombres["int"][140].animate.set_opacity(0), r.nombres["int"][150].animate.set_opacity(0), run_time=0.3)
        self.au_mot("Combien")
        q = VGroup(self.t("Combien mesure", 34, ORANGE_RETENUE), self.t("l'angle ?", 34, ORANGE_RETENUE)).arrange(DOWN, buff=0.16)
        interligne_regulier(q)
        self.cc(q, -0.05)
        self.play(FadeIn(q[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("l'angle")
        self.play(FadeIn(q[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("Mets pause")
        pz = VGroup(self.t("Mets pause,", 32, ORANGE_RETENUE), self.t("et cherche !", 32, ORANGE_RETENUE)).arrange(DOWN, buff=0.16)
        interligne_regulier(pz)
        self.cc(pz, -1.2)
        self.play(FadeIn(pz[0], scale=1.1), run_time=0.3)
        self.au_mot("et cherche")
        self.play(FadeIn(pz[1], scale=1.1), run_time=0.3)
        self.attendre_voix(marge=2.0)
        a.figer()

    def ecran_correction(self):
        self.ecran("09b-correction")
        self.x_col = X_COL
        page = cahier()
        s, a, r = self.figure_defi()
        self.add(page, a, r)
        tit = self.t("Correction", 46, JAUNE_TITRE).move_to(P(X_COL, 3.05))
        self.play(Write(tit), run_time=0.35)
        n35 = lu(r, 35, "ext", 24)
        r.rangees["int"].set_opacity(0.3)
        self.au_mot("On part")
        l1 = VGroup(self.t("On part du 0", 36), self.t("de gauche,", 36, VERT_OK)).arrange(DOWN, buff=0.16)
        interligne_regulier(l1)
        self.cc(l1, 2.05)
        d = Doigt(r, "ext")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(d, scale=1.5), r.nombres["ext"][10].animate.set_opacity(0), run_time=0.3)
        self.au_mot("de gauche")
        self.play(FadeIn(l1[1], shift=UP * 0.1), r.allumer_nombre(0, "ext", VERT_OK, 1.35), run_time=0.3)
        self.au_mot("on monte")
        l2 = self.t("et on monte :", 36)
        self.cc(l2, 1.15)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.25)
        rang = VGroup(*[self.t(x, 40, VERT_OK) for x in ("10,", "20,", "30,", "35")]).arrange(RIGHT, buff=0.16)
        self.cc(rang, 0.45)
        for i, (mot, v) in enumerate((("10,", 10), ("20,", 20), ("30,", 30))):
            self.au_mot(mot)
            self.play(FadeIn(rang[i], scale=1.4), d.aller(v), r.nombres["ext"][v].animate.set_opacity(1).scale(1.5), run_time=0.3)
            self.play(r.nombres["ext"][v].animate.scale(1 / 1.5), run_time=0.12)
        self.au_mot("35.")
        self.play(FadeIn(rang[3], scale=1.4), d.aller(35), FadeIn(n35.set_fill(VERT_OK), scale=1.5), r.nombres["ext"][40].animate.set_opacity(0), r.nombres["ext"][30].animate.set_opacity(0),
                  r.allumer_graduation(145), run_time=0.3)
        self.play(n35.animate.scale(1.4), d.anneau.animate.set_stroke(opacity=0), run_time=0.25)
        self.play(n35.animate.scale(1 / 1.4), run_time=0.25)
        self.au_mot("L'angle")
        l3 = self.t("L'angle mesure", 36)
        self.cc(l3, -0.3)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.25)
        self.au_mot("35 degrés")
        v = self.t("35°", 60, VERT_OK)
        self.cc(v, -1.1)
        self.play(FadeIn(v, scale=1.4), run_time=0.3)
        self.insister(v, 1.25, 0.2)
        self.au_mot("Il est")
        vt = VGroup(self.t("Il est aigu :", 28, AIGU), self.t("c'est cohérent.", 28, AIGU)).arrange(DOWN, buff=0.08)
        interligne_regulier(vt)
        t = VGroup(SurroundingRectangle(vt, color=AIGU, buff=0.14, corner_radius=0.12, stroke_width=5), vt)
        self.cc(t, -2.2, 3.72)
        self.play(FadeIn(t[0]), FadeIn(vt[0], scale=1.15), a.arc.animate.set_stroke(AIGU), run_time=0.3)
        self.au_mot("c'est cohérent")
        self.play(FadeIn(vt[1], scale=1.15), run_time=0.25)
        self.attendre_voix()
        d.clear_updaters(), a.figer()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale")
        self.XL = -0.55
        s = P(0, 0)
        a = Angle(s, 0, 55, longueur=3.5, rayon_arc=0.55, sw=7).figer()
        r = RapporteurM(s, 3.0)
        n = lu(r, 55, "int", 20, VERT_OK)
        r.nombres["int"][50].set_opacity(0), r.nombres["int"][60].set_opacity(0)
        r.graduations[55].set_stroke(VERT_OK, width=6)
        n._pas_audit = True
        fig = VGroup(a, r, n)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Un angle se mesure en degrés,", "avec un rapporteur."),
            ("Le centre sur le sommet,", "le 0 sur un côté,", "on lit sur l'autre côté."),
            ("On part du bon 0,", "puis on vérifie :", "aigu ou obtus ?")], fs=30)
        self.au_mot("Un angle")
        self.montrer_ligne(lignes[0], Indicate(r.fond[2], color=WHITE, scale_factor=1.02))
        self.au_mot("Le centre")
        bl = lignes[1][1]
        self.play(Create(lignes[1][0]), FadeIn(bl[0], shift=RIGHT * 0.2), Flash(a.point.get_center(), color=SOMMET, line_length=0.25), run_time=0.35)
        self.au_mot("0 sur")
        bl[1].sans_synchro = True  # posée au mot « 0 », sans attendre « côté »
        self.wait(0.12)
        self.play(FadeIn(bl[1], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("on lit")
        self.play(FadeIn(bl[2], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("On part")
        self.montrer_ligne(lignes[2], Indicate(r.nombres["int"][0], color=VERT_OK, scale_factor=1.8))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_outil()
        self.ecran_rapporteur()
        self.ecran_methode()
        self.ecran_question1()
        self.ecran_rangees()
        self.ecran_controle()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class AngleMesurer6e(AngleMesurerBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
