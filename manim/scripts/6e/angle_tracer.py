# angle_tracer.py
# EleveAI — Maths 6e — série « Angles », épisode 05 : TRACER UN ANGLE
# (micro angle_tracer, notion angle_mesure), AVEC VOIX. Paysage 16:9, CEINTURE
# VERTE. Short jumeau : angle_tracer_short.py (blanche, le flocon).
# Décor et métier : Inès, GAME DESIGNER (centre d'intérêt : jeux-video) : une catapulte
# de son invention lance des boules de peinture (aucun jeu réel imité).
# ⭐ Le geste est VRAI : centre sur le sommet, 0 sur le côté, repère à la graduation,
# trait qui passe par le repère. Toutes les mesures dessinées sont les vraies.
# Micro → écrans : situation (01), l'outil (02), les 4 gestes (03 à 06), QUESTION 1 (07),
# le piège (08), le contrôle (09), QUESTION 2 (10), défi (11) et correction (11b),
# appris (12), fin (13).
# Voix : manim/voix/6e-angle-tracer.json (validée, débit −6) ; WAV :
# public/sons/6e-angle-tracer/ ; marques : angle_tracer_marques.json.
# Outils : prop_commun.py + manim/canvas_angles.py. Ajouté ICI : EcranJeu, tache(), ines(),
# Crayon, regle_sur(), repere(), Etapes, arc_de(), RapporteurT, Doigt, lu(), halo(), cahier()
# (ces 5 derniers repris de angle_mesurer.py, recopiés pour ne pas dépendre de son script).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/angle_tracer.py AngleTracer6e
# python -m manim render -qh --disable_caching manim/scripts/6e/angle_tracer.py AngleTracer6e -o eleveai-maths-6e-angle-tracer --media_dir manim/scripts/6e/media-angle-05
# Sortie : manim/sorties/6e/maths/angles/05-tracer/eleveai-maths-6e-angle-tracer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403
from canvas_angles import *  # noqa: E402,F403

AIGU = FAMILLE["aigu"]
OBTUS = FAMILLE["obtus"]
DROIT_C = FAMILLE["droit"]
PEINTURE = "#ec4899"
BOIS = "#b45309"
# LA figure des gestes : le rapporteur est le plus grand objet possible
O_T, R_T, LG_T, X_COL = P(-2.85, -2.0), 3.8, 4.5, 4.36
K_REP = 1.035  # le repère : juste DEHORS du bord, dans l'axe de la graduation


def halo(t, w=7):
    """Un contour noir derrière un nombre posé sur un trait : il reste lisible."""
    t.set_stroke(BLACK, w, background=True)
    for m in t.family_members_with_points():
        m.joint_type = LineJointType.ROUND  # sans ça, le contour du 3 fait une pointe
    return t


def lu(r, v, rg, fs=30, couleur=None):
    """Le nombre lu, à sa place exacte dans SA rangée (le module n'écrit que les dizaines)."""
    rr = {"int": 0.695, "ext": 0.835}[rg]
    t = Text(str(v), font_size=fs, color=couleur or RANGEE[rg], weight=BOLD)
    t.move_to(polaire(r.direction(v, rg), r.rayon * rr, r.c))
    t.sans_synchro = t._pas_audit = True
    return halo(t).set_z_index(2)


class RapporteurT(Rapporteur):
    """Les nombres à 3 chiffres de la rangée intérieure se touchent (signalé à l'épisode
    04) : ils sont un peu plus petits ici."""

    def __init__(self, *a, **k):
        super().__init__(*a, **k)
        for v in range(100, 181, 10):
            self.nombres["int"][v].scale(0.82)
        for rg in ("int", "ext"):
            halo(self.nombres[rg][0]).set_z_index(2)  # le 0 reste lisible sur le côté


def cahier():
    """La page du cahier, à carreaux discrets : tout juste visible, le rapporteur domine."""
    x0, x1, y0, y1 = -6.62, 1.98, -3.5, 3.5
    g = VGroup(Rectangle(width=x1 - x0, height=y1 - y0, fill_color="#0f172a", fill_opacity=1, stroke_color="#334155", stroke_width=2).move_to(P((x0 + x1) / 2, 0)))
    for x in np.arange(x0 + 0.6, x1, 0.6):
        g.add(Line(P(x, y0), P(x, y1), color="#1e293b", stroke_width=1.5))
    for y in np.arange(y0 + 0.5, y1, 0.6):
        g.add(Line(P(x0, y), P(x1, y), color="#1e293b", stroke_width=1.5))
    return g.set_z_index(-2)


class Doigt(VGroup):
    """Le doigt qui suit une rangée depuis son 0 : un anneau, une trace, les nombres passés
    changent de couleur. d.v = où il est."""

    def __init__(self, r, rg, couleur=VERT_OK, **kw):
        super().__init__(**kw)
        self.r, self.rg, self.coul = r, rg, couleur
        self.v = ValueTracker(0.0)
        self.rho = r.rayon * {"int": 0.695, "ext": 0.835}[rg]
        self.rho_t = r.rayon * {"int": 0.61, "ext": 0.768}[rg]
        self.anneau = Circle(radius=0.25 * r.rayon / 3.8, stroke_color=AMBRE, stroke_width=6)
        self.trace = VMobject(stroke_color=couleur, stroke_width=7, fill_opacity=0)
        self.add(self.trace, self.anneau)
        self._maj()
        self.add_updater(lambda m: m._maj())

    def _maj(self):
        v, r = self.v.get_value(), self.r
        d0, d = r.direction(0, self.rg), r.direction(v, self.rg)
        self.anneau.move_to(polaire(d, self.rho, r.c))
        ang_ = np.deg2rad(d - d0)
        self.trace.set_points(Arc(radius=self.rho_t, start_angle=np.deg2rad(d0), angle=ang_ if abs(ang_) > 1e-3 else 1e-3, arc_center=r.c).get_points())
        for x, t in r.nombres[self.rg].items():
            if x <= v + 0.5:
                t.set_color(self.coul)

    def aller(self, v):
        return self.v.animate.set_value(v)


class Crayon(VGroup):
    """Le crayon qui dessine : c.bout() = sa mine ; c.vers(p) et c.trace(a, b)."""

    def __init__(self, bout=ORIGIN, s=1.0, d=52, **kw):
        super().__init__(**kw)
        b = np.array(bout, dtype=float)
        u, v = polaire(d), polaire(d + 90)
        w, t, L = 0.12 * s, 0.26 * s, 1.15 * s
        q = lambda a, l: b + u * a + v * l  # noqa: E731
        self.mine = Polygon(b, q(t * 0.4, w * 0.4), q(t * 0.4, -w * 0.4), fill_color="#e2e8f0", fill_opacity=1, stroke_width=0)
        self.bois = Polygon(q(t * 0.4, w * 0.4), q(t, w), q(t, -w), q(t * 0.4, -w * 0.4), fill_color="#fde68a", fill_opacity=1, stroke_width=0)
        self.corps = Polygon(q(t, w), q(t + L, w), q(t + L, -w), q(t, -w), fill_color="#f59e0b", fill_opacity=1, stroke_width=0)
        self.gomme = Polygon(q(t + L, w), q(t + L + 0.2 * s, w), q(t + L + 0.2 * s, -w), q(t + L, -w), fill_color="#f472b6", fill_opacity=1, stroke_width=0)
        self._b = VectorizedPoint(b)
        self.add(self.corps, self.gomme, self.bois, self.mine, self._b)
        self.set_z_index(6)

    def bout(self):
        return self._b.get_center()

    def vers(self, p):
        return self.animate.shift(np.array(p, dtype=float) - self.bout())

    def trace(self, a, b):
        a, b = np.array(a, dtype=float), np.array(b, dtype=float)
        return UpdateFromAlphaFunc(self, lambda m, al: m.shift(a + (b - a) * al - m.bout()))


def regle_sur(o, d, lg=5.05, lar=0.55):
    """La règle posée le long de la direction d, juste sous le trait qu'on va tirer."""
    u, v = polaire(d), polaire(d - 90)
    o = np.array(o, dtype=float) - u * 0.1
    g = VGroup(Polygon(o, o + u * lg, o + u * lg + v * lar, o + v * lar, fill_color="#fef3c7", fill_opacity=0.3, stroke_color="#fef3c7", stroke_width=3))
    for i in range(1, int(lg / 0.25)):
        h = 0.2 if i % 4 == 0 else 0.11
        g.add(Line(o + u * i * 0.25, o + u * i * 0.25 + v * h, color="#fef3c7", stroke_width=2))
    return g.set_z_index(0)


def repere(r, v, rg="int", couleur=AMBRE):
    """Le petit repère, tout près du bord, dans l'axe de la graduation (vraie mesure)."""
    p = polaire(r.direction(v, rg), r.rayon * K_REP, r.c)
    m = Dot(p, radius=0.1, color=couleur, stroke_color=BLACK, stroke_width=3)
    return m.set_z_index(4)


def arc_de(s, d1, d2, r=0.9, couleur=ARC, sw=7, fond=0.2):
    """L'arc de la vraie mesure, DERRIÈRE les côtés (leçon 16 du pilote) ; g[0] secteur, g[1] arc."""
    a = np.deg2rad(d2 - d1)
    sec = AnnularSector(inner_radius=0, outer_radius=r, start_angle=np.deg2rad(d1), angle=a, arc_center=s, fill_color=couleur, fill_opacity=fond, stroke_width=0)
    arc = Arc(radius=r, start_angle=np.deg2rad(d1), angle=a, arc_center=s, stroke_color=couleur, stroke_width=sw)
    return VGroup(sec, arc).set_z_index(-1)


def tache(c, r, couleur=PEINTURE, germe=3):
    """La tache de peinture, irrégulière et toujours la même (germe), avec ses gouttes."""
    rng = np.random.default_rng(germe)
    c = np.array(c, dtype=float)
    n = 16
    pts = [polaire(360 * i / n, r * (0.78 + 0.32 * rng.random()), c) for i in range(n)]
    v = VMobject(fill_color=couleur, fill_opacity=1, stroke_width=0)
    v.set_points_smoothly(pts + [pts[0]])
    g = VGroup(v)
    for _ in range(6):
        d = r * (1.18 + 0.14 * rng.random())
        g.add(Circle(radius=r * (0.05 + 0.06 * rng.random()), fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(polaire(rng.random() * 360, d, c)))
    return g


class EcranJeu(VGroup):
    """L'écran du jeu d'Inès : ciel, sol, mur et cible à droite, catapulte au milieu.
    k = la taille ; e.tirer(scene, theta, T) lance la boule, à la direction de départ theta
    (VRAIE) ; e.angle_tir(theta) dessine l'angle du tir au point de départ."""

    PHI0, PHI1 = 190.0, 130.0  # le bras au repos, le bras au lâcher (tangente à 40°)

    def __init__(self, c, L=5.6, **kw):
        super().__init__(**kw)
        c = np.array(c, dtype=float)
        k = self.k = L / 5.6
        H = self.H = 3.1 * k
        self.x0, self.y0, self.L = c[0] - L / 2, c[1] - H / 2, L
        self.sol = self.y0 + 0.5 * k
        x = lambda v: self.x0 + v * k  # noqa: E731
        y = lambda v: self.sol + v * k  # noqa: E731
        self.P_ = lambda a, b: np.array([x(a), y(b), 0.0])  # noqa: E731
        self.cadre = RoundedRectangle(width=L + 0.2 * k, height=H + 0.2 * k, corner_radius=0.12 * k, fill_color="#334155", fill_opacity=1, stroke_color="#94a3b8", stroke_width=3).move_to(c)
        self.ciel = Rectangle(width=L, height=H, fill_color="#0b2545", fill_opacity=1, stroke_width=0).move_to(c)
        self.terre = Rectangle(width=L, height=0.5 * k, fill_color="#166534", fill_opacity=1, stroke_width=0).move_to(self.P_(2.8, -0.25))
        nuages = VGroup(*[Ellipse(width=w * k, height=0.26 * k, fill_color=WHITE, fill_opacity=0.16, stroke_width=0).move_to(self.P_(a, b))
                          for a, b, w in ((0.9, 2.25, 1.0), (1.3, 2.05, 0.7), (4.1, 2.3, 0.9))])
        self.mur = Rectangle(width=0.22 * k, height=1.75 * k, fill_color="#64748b", fill_opacity=1, stroke_width=0).move_to(self.P_(5.25, 0.875))
        self.cible_c = self.P_(4.95, 1.0)
        self.cible = VGroup(*[Circle(radius=ra * k, fill_color=co, fill_opacity=1, stroke_width=0).move_to(self.cible_c)
                              for ra, co in ((0.42, "#ef4444"), (0.28, "#f8fafc"), (0.14, "#ef4444"))])
        xc = 2.58
        self.pivot = self.P_(xc, 0.72)
        s = 8 * k
        self.pieds = VGroup(Rectangle(width=1.1 * k, height=0.16 * k, fill_color=BOIS, fill_opacity=1, stroke_width=0).move_to(self.P_(xc, 0.22)),
                            Line(self.P_(xc - 0.36, 0.22), self.pivot, color=BOIS, stroke_width=s),
                            Line(self.P_(xc + 0.36, 0.22), self.pivot, color=BOIS, stroke_width=s))
        self.roues = VGroup(*[Circle(radius=0.13 * k, fill_color="#451a03", fill_opacity=1, stroke_color="#fde68a", stroke_width=2).move_to(self.P_(xc + d, 0.13)) for d in (-0.4, 0.4)])
        self.lg_bras = 0.75 * k
        self.bras = Line(self.pivot, self._bout(self.PHI0), color="#fbbf24", stroke_width=9 * k)
        self.boule = Circle(radius=0.14 * k, fill_color=PEINTURE, fill_opacity=1, stroke_color=WHITE, stroke_width=1.5).move_to(self._bout(self.PHI0))
        self.axe = Dot(self.pivot, radius=0.07 * k, color=WHITE)
        self.add(self.cadre, self.ciel, self.terre, nuages, self.mur, self.cible, self.pieds, self.roues, self.bras, self.axe, self.boule)
        self.depart = self._bout(self.PHI1)

    def _bout(self, phi):
        return polaire(phi, self.lg_bras, self.pivot)

    def lever(self):
        def f(m, a):
            b = self._bout(self.PHI0 + (self.PHI1 - self.PHI0) * a)
            self.bras.put_start_and_end_on(self.pivot, b)
            self.boule.move_to(b)
        return UpdateFromAlphaFunc(VGroup(self.bras, self.boule), f)

    def recharger(self):
        """Remet le bras au repos et une boule neuve (sans animation) ; à montrer ensuite."""
        self.bras.put_start_and_end_on(self.pivot, self._bout(self.PHI0))
        self.boule.move_to(self._bout(self.PHI0))
        return self.boule

    def tirer(self, sc, theta, T, r_t=0.3, rt=1.0, germe=2):
        """Le bras se lève, la boule part selon theta et tombe en T : parabole, trace, tache."""
        k = self.k
        T = np.array(T, dtype=float)
        sc.play(self.lever(), run_time=0.25, rate_func=rush_into)
        D = self.depart
        t = np.tan(np.deg2rad(theta))
        dx = T[0] - D[0]
        a = (D[1] + t * dx - T[1]) / dx ** 2
        pt = lambda u: D + np.array([u * dx, t * u * dx - a * (u * dx) ** 2, 0.0])  # noqa: E731
        tr = VMobject(stroke_color=WHITE, stroke_width=3 * max(k, 0.8), stroke_opacity=0.6, fill_opacity=0)
        tr.set_points_as_corners([D, D + RIGHT * 0.001])
        sc.add(tr)

        def f(m, al):
            m.move_to(pt(al))
            if al > 0.01:
                tr.set_points_as_corners([pt(al * i / 24) for i in range(25)])
        sc.play(UpdateFromAlphaFunc(self.boule, f), run_time=rt, rate_func=linear)
        s = tache(T, r_t * k, germe=germe)
        sc.play(FadeIn(s, scale=0.3), FadeOut(self.boule), run_time=0.16)
        return VGroup(s, tr)

    def angle_tir(self, theta, lg=1.05, couleur=ARC):
        """L'angle du tir, à sa vraie mesure : l'horizontale et la direction de départ."""
        k, D = self.k, self.depart
        g = VGroup(Line(D, D + RIGHT * lg * k, color=COTE, stroke_width=5), Line(D, polaire(theta, lg * k, D), color=COTE, stroke_width=5),
                   Dot(D, radius=0.07, color=SOMMET))
        a = arc_de(D, 0, theta, r=0.48 * k, couleur=couleur, sw=5).set_z_index(0)
        return VGroup(a, g)


def ines(s=1.0):
    """Inès, game designer : une manette dans les mains."""
    p = visage(personne(peau="#a16e4b", tenue="#7c3aed", cheveux="#111827", longs=True, s=s))
    c = p.corps.get_center() + P(0.0, -0.08) * s
    man = VGroup(RoundedRectangle(width=0.82 * s, height=0.34 * s, corner_radius=0.14 * s, fill_color="#0f172a", fill_opacity=1, stroke_color=WHITE, stroke_width=3).move_to(c),
                 Dot(c + P(-0.22, 0) * s, radius=0.05 * s, color=COTE), Dot(c + P(0.2, 0.05) * s, radius=0.04 * s, color=PEINTURE),
                 Dot(c + P(0.28, -0.05) * s, radius=0.04 * s, color=VERT_OK))
    p.add(man)
    return p


class Etapes(VGroup):
    """Les quatre gestes, quatre ronds : le chiffre n'arrive qu'à son geste (0 s d'avance)."""

    def __init__(self, x, y, r=0.27, pas=0.82, **kw):
        super().__init__(**kw)
        self.ronds, self.nums = [], []
        for i in range(4):
            p = P(x + (i - 1.5) * pas, y)
            c = Circle(radius=r, fill_color="#0b1220", fill_opacity=1, stroke_color="#475569", stroke_width=3).move_to(p)
            n = Text(str(i + 1), font_size=30, color=BLACK, weight=BOLD).move_to(p)
            n.sans_synchro = n._pas_audit = True
            self.ronds.append(c), self.nums.append(n)
            self.add(c)

    def allumer(self, i):
        return [self.ronds[i].animate.set_fill(AMBRE).set_stroke(AMBRE), FadeIn(self.nums[i], scale=1.6)]

    def fini(self, i):
        return [self.ronds[i].animate.set_fill(VERT_OK).set_stroke(VERT_OK)]


def muet(m):
    """Pas d'attente de synchro pour ces textes (ils sont posés AU MOT par le script)."""
    for f in m.get_family():
        if isinstance(f, Text):
            f.sans_synchro = True
    return m


class AngleTracerBase(PaysageProp):
    nom_voix = "6e-angle-tracer"
    fichier_marques = "angle_tracer_marques.json"
    x_col = X_COL

    def cc(self, mob, y, x=None):
        """La colonne de droite : tout y a le MÊME CENTRE."""
        return mob.move_to(P(self.x_col if x is None else x, y))

    def _disposer_q(self, question, choix, phrase):
        res = super()._disposer_q(question, choix, phrase)
        if len(question) == 1:  # une seule ligne : les cartes montent, la réponse a sa place
            for m in res[2], res[3], res[5]:
                m.shift(UP * 0.35)
        return res

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Tracer un angle", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Tracer")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = VGroup(self.t("Quels sont", 38), self.t("les quatre gestes,", 38), self.t("dans le bon ordre ?", 38)).arrange(DOWN, buff=0.14)
        interligne_regulier(q)
        q.move_to(P(-3.5, 0.45))
        c = P(2.9, -0.85)
        r = RapporteurT(c, 2.65)
        c1 = Line(c, c + RIGHT * 3.0, color=COTE, stroke_width=6)
        c2 = Line(c, polaire(40, 3.0, c), color=COTE, stroke_width=6)
        pt = Dot(c, radius=0.09, color=SOMMET).set_z_index(3)
        rp = repere(r, 40)
        a = arc_de(c, 0, 40, r=0.6)
        self.au_mot("Quels")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(pt, scale=2), Create(c1), run_time=0.4)
        self.au_mot("quatre")
        self.play(FadeIn(q[1], shift=UP * 0.2), FadeIn(r, shift=UP * 0.3), run_time=0.45)
        self.play(FadeIn(rp, scale=2.5), run_time=0.25)
        self.au_mot("dans le")
        self.play(FadeIn(q[2], shift=UP * 0.2), FadeOut(r), run_time=0.4)
        self.play(Create(c2), run_time=0.45)
        self.play(FadeIn(a), run_time=0.25)
        self.attendre_voix(marge=0.6)

    # ── 01 : Inès, game designer ────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        i_ = ines(1.15).move_to(P(-4.95, 0.1))
        self.au_mot("Voici")
        nom = self.t("Inès", 44, BLEU_CALCUL).next_to(i_, UP, buff=0.18)
        self.play(FadeIn(i_, shift=UP * 0.3), FadeIn(nom), run_time=0.5)
        self.au_mot("game")
        met = self.t("game designer", 30, BLEU_CALCUL).next_to(i_, DOWN, buff=0.15)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        xe, ye = 1.5, -0.8
        e = EcranJeu(P(xe, ye), 7.0)
        self.au_mot("Dans son")
        l1 = self.t("Dans son jeu, une catapulte", 36).move_to(P(xe, 2.75))
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(e, scale=0.92), run_time=0.45)
        self.play(Wiggle(e.bras, scale_value=1.05, rotation_angle=0.05), run_time=0.3)
        self.au_mot("lance")
        l2 = self.t("lance des boules de peinture.", 36, PEINTURE).move_to(P(xe, 2.15))
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        rate = e.tirer(self, 62, e.P_(4.05, 0.03), r_t=0.3, rt=0.75, germe=5)
        self.au_mot("Elle veut")
        self.play(FadeOut(l1), FadeOut(l2), FadeOut(rate[1]), run_time=0.12)
        l3 = self.t("Elle veut un tir à 40°.", 40, ARC).move_to(P(xe, 2.5))
        self.play(FadeIn(e.recharger(), scale=0.4), e.bras.animate.set_opacity(1), FadeIn(l3, shift=UP * 0.1), run_time=0.25)
        at = e.angle_tir(40)
        n40 = halo(self.t("40°", 38, ARC)).move_to(polaire(20, 1.75, e.depart))
        n40._pas_audit = True
        self.play(FadeIn(at), FadeIn(n40, scale=1.3), run_time=0.25)
        e.tirer(self, 40, e.cible_c, r_t=0.32, rt=0.95)
        self.play(Flash(e.cible_c, color=PEINTURE, line_length=0.3, flash_radius=0.7), run_time=0.3)
        self.au_mot("Elle dessine")
        fe = Rectangle(width=7.2, height=4.1, fill_color=BLACK, fill_opacity=0.72, stroke_width=0).move_to(e)
        s = P(-0.45, -2.15)
        c1, c2 = Line(s, s + RIGHT * 3.7, color=COTE, stroke_width=8), Line(s, polaire(40, 3.7, s), color=COTE, stroke_width=8)
        cr = Crayon(s + RIGHT * 3.7, 1.2)
        ar = arc_de(s, 0, 40, r=1.1)
        pt = Dot(s, radius=0.1, color=SOMMET).set_z_index(3)
        self.play(FadeOut(l3), run_time=0.1)
        l4 = self.t("Elle dessine d'abord cet angle.", 36).move_to(P(xe, 2.5))
        self.play(FadeIn(l4, shift=UP * 0.1), FadeIn(fe), FadeOut(n40), FadeOut(at), FadeIn(pt), FadeIn(cr), run_time=0.25)
        self.play(Create(c1), cr.trace(s, s + RIGHT * 3.7), run_time=0.4)
        self.play(cr.trace(s + RIGHT * 3.7, s), run_time=0.15)
        self.play(Create(c2), cr.trace(s, polaire(40, 3.7, s)), run_time=0.4)
        self.play(FadeOut(cr), FadeIn(ar), run_time=0.2)
        self.attendre_voix(marge=0.3)

    # ── 02 : l'outil ────────────────────────────────────────────────────────
    def ecran_outil(self):
        self.ecran("02-outil")
        self.au_mot("Quel")
        tit = self.t("Quel outil prend-elle ?", 46, JAUNE_TITRE).move_to(P(0, 3.1))
        self.play(Write(tit), run_time=0.5)
        s = P(-6.05, -1.5)
        eq = Equerre(s, 0, taille=3.1)
        self.au_mot("L'équerre")
        l1 = self.t("L'équerre", 38, EQUERRE).move_to(P(-4.1, -2.2))
        self.play(FadeIn(eq, shift=RIGHT * 0.3), FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("ne donne")
        l2 = self.t("ne donne que 90°", 38).move_to(P(-4.1, -2.8))
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        n90 = self.t("90°", 44, DROIT_C).move_to(s + P(1.05, 0.72))
        n90._pas_audit = True
        self.play(FadeIn(n90, scale=1.3), eq.coin.animate.set_stroke(DROIT_C), run_time=0.25)
        self.play(n90.animate.scale(1.45), run_time=0.2)
        self.play(n90.animate.scale(1 / 1.45), run_time=0.2)
        c = P(2.55, -1.3)
        self.au_mot("Pour")
        pp = self.t("Pour 40°,", 40, ARC).move_to(P(2.55, 2.25))
        self.play(FadeIn(pp, scale=1.2), eq.triangle.animate.set_opacity(0.1), eq.coin.animate.set_stroke(opacity=0.3), n90.animate.set_opacity(0.3), run_time=0.3)
        x = croix(n90.copy().scale(1.3), sw=6)
        self.play(Create(x), run_time=0.2)
        self.au_mot("il faut")
        l3 = self.t("il faut un rapporteur.", 38, RAPPORTEUR).move_to(P(2.35, -2.45))
        r = RapporteurT(c, 3.3)
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(r, shift=UP * 0.5), run_time=0.5)
        c1 = Line(c, c + RIGHT * 3.3, color=VERT_OK, stroke_width=7)
        c2 = Line(c, polaire(40, 3.3 * K_REP, c), color=ARC, stroke_width=7)
        self.play(Create(c1), run_time=0.2)
        halo(r.nombres["int"][40]).set_z_index(2)
        c2.set_z_index(1)
        self.play(Create(c2), r.allumer_graduation(40, ARC), r.allumer_nombre(40, "int", ARC, 1.5), r.rangees["ext"].animate.set_opacity(0.28), run_time=0.35)
        self.attendre_voix(marge=0.4)

    # ── 03 à 06 : les quatre gestes (le cœur), la même figure qui se construit ──
    def ecran_gestes(self):
        self.ecran("03-geste1")
        O, B = O_T, O_T + RIGHT * LG_T
        page, et = cahier(), Etapes(X_COL, 3.05)
        self.add(page, et)
        pt = Dot(O, radius=0.1, color=SOMMET).set_z_index(3)
        c1 = Line(O, B, color=COTE, stroke_width=7).set_z_index(1)
        cr = Crayon(O + P(0.5, 0.5))
        # ── geste 1 : un côté ──
        self.au_mot("Premier")
        tete = self.t("Premier geste :", 32, AMBRE)
        self.cc(tete, 2.25)
        self.play(*et.allumer(0), FadeIn(tete, shift=UP * 0.1), run_time=0.35)
        self.au_mot("tracer un")
        l1 = self.t("tracer un côté.", 40, COTE)
        self.cc(l1, 1.45)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(pt, scale=2), FadeIn(cr), cr.vers(O), run_time=0.3)
        self.play(Create(c1), cr.trace(O, B), run_time=0.75)
        self.play(FadeOut(cr), run_time=0.12)
        self.au_mot("C'est")
        l2 = self.t("C'est la demi-droite", 32)
        self.cc(l2, 0.55)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.25)
        self.au_mot("O B")
        dd = muet(demi_droite("O", "B", 50))
        self.cc(dd, -0.1)
        lo = muet(Text("O", font_size=38, color=SOMMET, weight=BOLD)).move_to(O + P(-0.05, -0.68))
        lb = muet(Text("B", font_size=38, color=WHITE, weight=BOLD)).move_to(B + P(0.05, -0.45))
        self.play(FadeIn(dd, scale=1.3), FadeIn(lo, scale=1.3), FadeIn(lb, scale=1.3), run_time=0.3)
        self.au_mot("Le point")
        l3 = VGroup(self.t("Le point O", 36), self.t("sera le sommet.", 36, SOMMET)).arrange(DOWN, buff=0.14)
        interligne_regulier(l3)
        self.cc(l3, -1.15)
        muet(l3[0])
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("sera")
        self.play(FadeIn(l3[1], shift=UP * 0.1), pt.animate.scale(2.4), lo.animate.scale(1.5), run_time=0.3)
        self.play(pt.animate.scale(1 / 2.4), lo.animate.scale(1 / 1.5), run_time=0.25)
        self.attendre_voix(marge=0.25)
        col = VGroup(tete, l1, l2, dd, l3)

        # ── geste 2 : le centre sur O, le 0 sur le côté ──
        self.dire("04-geste2")
        self.au_mot("Deuxième")
        self.play(FadeOut(col), run_time=0.12)
        tete = self.t("Deuxième geste :", 32, AMBRE)
        self.cc(tete, 2.25)
        self.play(*et.fini(0), *et.allumer(1), FadeIn(tete, shift=UP * 0.1), run_time=0.3)
        r = RapporteurT(O, R_T)
        r._placer(O + P(0.75, 0.95), -14)  # à côté du sommet, de travers
        self.au_mot("poser le")
        g = VGroup(self.t("poser le centre", 38), self.t("du rapporteur", 38), self.t("sur O,", 38, SOMMET)).arrange(DOWN, buff=0.14)
        interligne_regulier(g)
        self.cc(g, 0.85)
        self.play(FadeIn(g[0], shift=UP * 0.1), FadeIn(r, shift=DOWN * 0.3), run_time=0.3)
        self.play(r.centre_marque.animate.scale(1.8), run_time=0.15)
        self.play(r.centre_marque.animate.scale(1 / 1.8), run_time=0.15)
        self.au_mot("du rapporteur")
        self.play(FadeIn(g[1], shift=UP * 0.1), run_time=0.22)
        self.au_mot("sur O")
        muet(g[2])
        self.play(FadeIn(g[2], shift=UP * 0.1), r.poser(O, -14), run_time=0.45)
        self.play(Flash(O, color=SOMMET, line_length=0.28), run_time=0.2)
        self.au_mot("0")
        z = self.t("et le 0", 38, VERT_OK)
        self.cc(z, -0.55)
        muet(z)
        self.play(FadeIn(z, shift=UP * 0.1), r.allumer_nombre(0, "int", k=1.25), run_time=0.25)
        self.au_mot("sur le côté")
        z2 = self.t("sur le côté.", 38, COTE)
        self.cc(z2, -1.15)
        self.play(FadeIn(z2, shift=UP * 0.1), r.poser(O, 0), run_time=0.55)
        trait = Line(O, O + RIGHT * R_T, color=VERT_OK, stroke_width=9).set_z_index(1)
        self.play(Create(trait), run_time=0.25)
        self.attendre_voix(marge=0.3)
        col = VGroup(tete, g, z, z2)

        # ── geste 3 : compter, le repère ──
        self.dire("05-geste3")
        self.au_mot("Troisième")
        self.play(FadeOut(col), run_time=0.12)
        tete = self.t("Troisième geste :", 32, AMBRE)
        self.cc(tete, 2.25)
        self.play(*et.fini(1), *et.allumer(2), FadeIn(tete, shift=UP * 0.1), FadeOut(trait), run_time=0.3)
        d = Doigt(r, "int")
        self.au_mot("compter")
        g = VGroup(self.t("compter à partir", 38), self.t("de ce 0,", 38, VERT_OK)).arrange(DOWN, buff=0.14)
        interligne_regulier(g)
        self.cc(g, 1.15)
        self.play(FadeIn(g[0], shift=UP * 0.1), r.rangees["ext"].animate.set_opacity(0.28), FadeIn(d, scale=1.6), run_time=0.3)
        self.au_mot("de ce 0")
        self.play(FadeIn(g[1], shift=UP * 0.1), r.nombres["int"][0].animate.scale(1.25), run_time=0.25)
        self.play(r.nombres["int"][0].animate.scale(1 / 1.25), run_time=0.15)
        self.au_mot("jusqu'à")
        self.play(d.aller(40), run_time=max(0.3, self.t_mot("40")), rate_func=linear)
        self.au_mot("40")
        n = self.t("jusqu'à 40.", 44, VERT_OK)
        self.cc(n, -0.1)
        muet(n)
        halo(r.nombres["int"][40]).set_z_index(2)
        self.play(FadeIn(n, scale=1.2), r.allumer_graduation(40), r.allumer_nombre(40, "int", k=1.7), d.anneau.animate.set_stroke(opacity=0), run_time=0.3)
        self.play(r.nombres["int"][40].animate.scale(1.25), run_time=0.2)
        self.play(r.nombres["int"][40].animate.scale(1 / 1.25), run_time=0.2)
        self.au_mot("On fait")
        cr = Crayon(O + P(2.4, 3.5))
        rp = repere(r, 40)
        l = VGroup(self.t("On fait", 38), self.t("un petit repère.", 38, AMBRE)).arrange(DOWN, buff=0.14)
        interligne_regulier(l)
        self.cc(l, -1.15)
        self.play(FadeIn(l[0], shift=UP * 0.1), FadeIn(cr), run_time=0.2)
        self.au_mot("repère")
        self.play(FadeIn(l[1], shift=UP * 0.1), cr.vers(rp.get_center()), run_time=0.3)
        self.play(FadeIn(rp, scale=2), run_time=0.15)
        self.play(FadeOut(cr), rp.animate.scale(2), run_time=0.2)
        self.play(rp.animate.scale(0.5), run_time=0.2)
        self.attendre_voix(marge=0.25)
        d.clear_updaters()
        col = VGroup(tete, g, n, l)
        self.geste4(et, r, d, rp, col, O)

    def geste4(self, et, r, d, rp, col, O):
        self.dire("06-geste4")
        E = polaire(40, LG_T, O)
        self.au_mot("Quatrième")
        self.play(FadeOut(col), run_time=0.12)
        tete = self.t("Quatrième geste :", 32, AMBRE)
        self.cc(tete, 2.25)
        self.play(*et.fini(2), *et.allumer(3), FadeIn(tete, shift=UP * 0.1), run_time=0.3)
        self.au_mot("enlever")
        pile = VGroup(self.t("enlever", 34), self.t("le rapporteur,", 34), self.t("et tracer le côté", 34), self.t("qui part de O", 34, SOMMET),
                      self.t("et passe", 34, AMBRE), self.t("par le repère.", 34, AMBRE)).arrange(DOWN, buff=0.14)
        interligne_regulier(pile)
        self.cc(pile, 0.32)
        for i, m in enumerate(pile):  # chaque ligne garde le centre de la colonne
            self.cc(m, m.get_center()[1])
        l1 = VGroup(pile[0], pile[1])
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.2)
        self.au_mot("le rapporteur")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.2)
        self.play(FadeOut(r, shift=UP * 0.5 + RIGHT * 0.3), FadeOut(d), run_time=0.45)
        self.au_mot("et tracer")
        l2 = pile[2]
        rg = regle_sur(O, 40)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(rg, shift=DOWN * 0.15), run_time=0.3)
        self.au_mot("qui part")
        l3 = pile[3]
        cr = Crayon(O + P(0.6, 0.9))
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(cr), cr.vers(O), run_time=0.2)
        self.au_mot("et passe")
        c2 = Line(O, E, color=COTE, stroke_width=7).set_z_index(1)
        l4 = muet(VGroup(pile[4], pile[5]))
        self.play(FadeIn(l4[0], shift=UP * 0.1), Create(c2), cr.trace(O, E), run_time=0.45)
        self.au_mot("par le")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.2)
        self.play(FadeOut(cr), FadeOut(rg), Flash(rp, color=AMBRE, line_length=0.25, flash_radius=0.3), run_time=0.3)
        self.au_mot("L'angle mesure")
        self.play(FadeOut(VGroup(tete, l1, l2, l3, l4)), run_time=0.12)
        l5 = self.t("L'angle mesure", 38)
        self.cc(l5, 2.25)
        ar = arc_de(O, 0, 40, r=1.0)
        self.play(FadeIn(l5, shift=UP * 0.1), FadeIn(ar), *et.fini(3), run_time=0.3)
        self.au_mot("40")
        v = self.t("40°", 64, VERT_OK)
        self.cc(v, 1.45)
        n40 = self.t("40°", 44, ARC).move_to(polaire(20, 1.65, O))
        n40._pas_audit = True
        self.play(FadeIn(v, scale=1.4), FadeIn(n40, scale=1.3), run_time=0.3)
        self.insister(v, 1.2, 0.15)
        e = EcranJeu(P(X_COL, -0.55), 4.1)
        at = e.angle_tir(40)
        self.play(FadeIn(e, scale=0.92), FadeIn(at), run_time=0.25)
        e.tirer(self, 40, e.cible_c, r_t=0.32, rt=0.85)
        self.play(Flash(e.cible_c, color=PEINTURE, line_length=0.12, flash_radius=0.3), run_time=0.3)
        self.wait(0.5)
        self.attendre_voix(marge=0.2)

    # ── 07 : QUESTION 1 (que fais-tu en premier ?) ──────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        c, O = P(-3.05, -1.45), P(-3.05, -2.2)
        r = RapporteurT(c, 3.2)
        r._placer(c, -12)
        marque = self.t("?", 90, ORANGE_RETENUE).move_to(P(-3.05, 2.75))
        marque._pas_audit = True

        def avant(sc):
            sc.play(FadeIn(r, shift=DOWN * 0.3), FadeIn(marque, scale=1.4), run_time=0.3)

        def apres(sc):
            ph = sc.ph_q
            sc.au_mot("Sans")
            sc.play(FadeIn(ph[0], shift=UP * 0.15), r.poser(c, 10), run_time=0.45)
            sc.play(r.poser(c + P(0.25, 0), -8), run_time=0.45)
            sc.au_mot("on ne")
            sc.play(FadeIn(ph[1], shift=UP * 0.15), r.poser(c + P(-0.2, 0), 7), run_time=0.45)
            sc.au_mot("où poser")
            sc.play(FadeIn(ph[2], shift=UP * 0.15), FadeOut(marque), r.allumer_nombre(0, "int", AMBRE, 1.5), run_time=0.45)
            c1 = Line(O, O + RIGHT * 3.6, color=COTE, stroke_width=7).set_z_index(1)
            pt = Dot(O, radius=0.1, color=SOMMET).set_z_index(3)
            sc.play(FadeIn(pt, scale=2), Create(c1), run_time=0.35)
            sc.play(r.poser(O, 0), run_time=0.5)
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse", ["Que fais-tu en premier ?"],
                            [self.t("poser le rapporteur", 32), self.t("tracer un côté", 32), self.t("faire un repère à 40", 32)], 1,
                            ["Sans premier côté,", "on ne sait pas", "où poser le 0."], mot_q="Que fais", avant_q=avant, autres_r=apres)

    # ── 08 : le piège : la mauvaise rangée, la boule part en arrière ────────
    def ecran_piege(self):
        self.ecran("08-piege")
        O, B = O_T, O_T + RIGHT * LG_T
        page = cahier()
        c1 = Line(O, B, color=COTE, stroke_width=7).set_z_index(1)
        pt = Dot(O, radius=0.1, color=SOMMET).set_z_index(3)
        lo = muet(Text("O", font_size=38, color=SOMMET, weight=BOLD)).move_to(O + P(-0.05, -0.68))
        lb = muet(Text("B", font_size=38, color=WHITE, weight=BOLD)).move_to(B + P(0.05, -0.45))
        r = RapporteurT(O, R_T)
        self.add(page, c1, pt, lo, lb, r)
        self.au_mot("Le piège")
        tete = self.t("Le piège :", 46, PIEGE)
        self.cc(tete, 3.0)
        self.play(FadeIn(tete, shift=UP * 0.1), run_time=0.3)
        self.au_mot("compter")
        l1 = VGroup(self.t("compter depuis", 36), self.t("le mauvais 0.", 36, PIEGE)).arrange(DOWN, buff=0.14)
        interligne_regulier(l1)
        self.cc(l1, 1.95)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("le mauvais")
        self.play(FadeIn(l1[1], shift=UP * 0.1), r.allumer_nombre(0, "ext", PIEGE, 1.5), run_time=0.3)
        d = Doigt(r, "ext", couleur=PIEGE)
        self.au_mot("Inès a")
        l2 = VGroup(self.t("Inès a pris", 36), self.t("l'autre rangée.", 36, PIEGE)).arrange(DOWN, buff=0.14)
        interligne_regulier(l2)
        self.cc(l2, 0.7)
        muet(l2[0])
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(d, scale=1.6), r.rangees["int"].animate.set_opacity(0.28), run_time=0.25)
        self.au_mot("l'autre")
        self.play(FadeIn(l2[1], shift=UP * 0.1), d.aller(40), run_time=1.0, rate_func=linear)
        rp = repere(r, 40, "ext", PIEGE)
        self.play(FadeIn(rp, scale=2.5), r.nombres["ext"][40].animate.scale(1.4), run_time=0.2)
        self.au_mot("Son angle")
        d.clear_updaters()
        self.play(FadeOut(VGroup(tete, l1, l2)), FadeOut(d), run_time=0.12)
        l3 = self.t("Son angle mesure", 34)
        self.cc(l3, 3.0)
        E = polaire(140, LG_T, O)
        c2 = Line(O, E, color=PIEGE, stroke_width=7).set_z_index(1)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.25)
        n140 = r.nombres["int"][140]
        n140.set_z_index(2)
        r.nombres["ext"][40].set_z_index(2)
        halo(n140), halo(r.nombres["ext"][40])
        self.play(Create(c2), r.graduations[140].animate.set_stroke(PIEGE, width=7), run_time=0.4)
        self.au_mot("140")
        v = self.t("140°", 58, PIEGE)
        self.cc(v, 2.25)
        ar = arc_de(O, 0, 140, r=0.9, couleur=PIEGE)
        n = halo(self.t("140°", 42, PIEGE)).move_to(polaire(70, 1.45, O))
        n._pas_audit = True
        self.play(FadeIn(v, scale=1.3), FadeIn(ar), FadeIn(n, scale=1.3), n140.animate.set_color(PIEGE).set_opacity(1).scale(1.5), run_time=0.3)
        self.play(n140.animate.scale(1.25), run_time=0.2)
        self.play(n140.animate.scale(1 / 1.25), run_time=0.2)
        self.au_mot("et la boule")
        l4 = VGroup(self.t("et la boule part", 34), self.t("en arrière !", 40, PEINTURE)).arrange(DOWN, buff=0.12)
        interligne_regulier(l4)
        self.cc(l4, 1.15)
        e = EcranJeu(P(X_COL, -0.72), 3.75)
        at = e.angle_tir(140, couleur=PIEGE)
        self.play(FadeIn(l4[0], shift=UP * 0.1), FadeIn(e, scale=0.92), FadeIn(at), run_time=0.22)
        self.au_mot("en arrière")
        self.play(FadeIn(l4[1], scale=1.2), run_time=0.15)
        # la boule revient vers la gauche et s'écrase contre la vitre : c'est raté, et c'est drôle
        s = e.tirer(self, 140, e.P_(1.05, 1.5), r_t=0.14, rt=0.5, germe=7)
        grosse = tache(e.P_(1.05, 1.5), 0.8 * e.k, germe=4).set_z_index(1)
        self.play(FadeIn(grosse, scale=0.2), FadeOut(s), Wiggle(VGroup(e.pieds, e.roues, e.bras), scale_value=1.03, rotation_angle=0.12), run_time=0.45)
        goutte = VGroup(*[Line(grosse.get_bottom() + P(x, 0.12), grosse.get_bottom() + P(x, -l_), color=PEINTURE, stroke_width=6).set_z_index(1)
                          for x, l_ in ((-0.28, 0.32), (0.05, 0.16), (0.3, 0.25))])
        self.play(*[Create(g_) for g_ in goutte], run_time=0.5)
        self.attendre_voix(marge=0.4)

    # ── 09 : le contrôle : on prévoit ───────────────────────────────────────
    def ecran_controle(self):
        self.ecran("09-controle")
        O = O_T
        page = cahier()
        a = Angle(O, 0, 40, longueur=LG_T, rayon_arc=1.0, sw=7, couleur_arc=ARC)
        a.arc.set_z_index(-1), a.fond.set_z_index(-1)
        a._a_arc = False  # jamais de petit carré au passage de 90°
        self.add(page, a)
        self.au_mot("Pour éviter")
        l1 = VGroup(self.t("Pour éviter ça,", 36), self.t("on prévoit.", 40, AMBRE)).arrange(DOWN, buff=0.14)
        interligne_regulier(l1)
        self.cc(l1, 2.75)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("on prévoit")
        self.play(FadeIn(l1[1], scale=1.2), run_time=0.25)
        self.au_mot("40")
        l2 = self.t("40°,", 46, ARC)
        self.cc(l2, 1.68)
        self.play(FadeIn(l2, scale=1.3), a.arc.animate.set_stroke(width=12), run_time=0.3)
        self.play(a.arc.animate.set_stroke(width=7), run_time=0.2)
        self.au_mot("c'est plus")
        l3 = VGroup(self.t("c'est plus petit", 32), self.t("qu'un angle droit :", 32, DROIT_C)).arrange(DOWN, buff=0.14)
        interligne_regulier(l3)
        self.cc(l3, 0.85)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("qu'un angle")
        dv = DashedLine(O, O + UP * 3.9, color=DROIT_C, stroke_width=6, dash_length=0.2).set_z_index(1)
        u, v_ = polaire(0), polaire(90)
        cp = VMobject(stroke_color=DROIT_C, stroke_width=5, fill_opacity=0)
        cp.set_points_as_corners([O + u * 0.5, O + (u + v_) * 0.5, O + v_ * 0.5])
        zone = AnnularSector(inner_radius=0, outer_radius=3.9, angle=PI / 2, start_angle=0, arc_center=O, fill_color=AIGU, fill_opacity=0.13, stroke_width=0).set_z_index(-1)
        self.play(FadeIn(l3[1], shift=UP * 0.1), Create(dv), Create(cp), FadeIn(zone), run_time=0.45)
        self.au_mot("l'angle doit")
        tl = interligne_regulier(VGroup(Text("l'angle doit", font_size=34, color=AIGU, weight=BOLD), Text("être aigu.", font_size=34, color=AIGU, weight=BOLD)).arrange(DOWN, buff=0.12))
        tp = VGroup(SurroundingRectangle(tl, color=AIGU, buff=0.18, corner_radius=0.12, stroke_width=5), tl)
        self.cc(tp, -0.72)
        self.play(FadeIn(tp, scale=1.15), a.arc.animate.set_stroke(AIGU), a.fond.animate.set_fill(AIGU), run_time=0.35)
        self.au_mot("S'il")
        self.play(FadeOut(VGroup(l1, l2, l3, tp)), run_time=0.12)
        l4 = VGroup(self.t("S'il est", 38), self.t("très ouvert,", 38, PIEGE)).arrange(DOWN, buff=0.14)
        interligne_regulier(l4)
        self.cc(l4, 1.95)
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.2)
        self.au_mot("très ouvert")
        a.cote2[0].set_color(PIEGE)
        self.play(FadeIn(l4[1], shift=UP * 0.1), a.t2.animate.set_value(140), a.arc.animate.set_stroke(PIEGE), a.fond.animate.set_fill(PIEGE), run_time=0.55)
        self.au_mot("on recommence")
        l5 = self.t("on recommence.", 36, VERT_OK)
        self.cc(l5, 0.6)
        ok = self.coche(VERT_OK, 0.26).next_to(l5, DOWN, buff=0.2)
        self.play(FadeIn(l5, scale=1.15), run_time=0.25)
        a.cote2[0].set_color(COTE)
        self.play(a.t2.animate.set_value(40), a.arc.animate.set_stroke(AIGU), a.fond.animate.set_fill(AIGU), run_time=0.7)
        self.play(Create(ok), run_time=0.2)
        self.attendre_voix(marge=0.4)
        a.figer()

    # ── 10 : QUESTION 2 (130°) ──────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        O, R = P(-2.95, -2.2), 3.55
        r = RapporteurT(O, R)
        c1 = Line(O, O + RIGHT * R, color=COTE, stroke_width=7).set_z_index(1)
        pt = Dot(O, radius=0.1, color=SOMMET).set_z_index(3)

        def avant(sc):
            sc.play(FadeIn(r), FadeIn(c1), FadeIn(pt), run_time=0.3)

        def apres(sc):
            lg = sc.ligne_rep(0, ["130", "est entre", "90", "et 180."])
            l2 = sc.ligne_rep(1, ["L'angle sera obtus."])
            n130, n90, n180 = r.nombres["int"][130], r.nombres["int"][90], r.nombres["int"][180]
            for n_ in (n130, n90, n180):
                halo(n_).set_z_index(2)
            sc.au_mot("130")
            rp = repere(r, 130, "int", OBTUS)
            sc.play(FadeIn(lg[0], scale=1.3), r.rangees["ext"].animate.set_opacity(0.28), n130.animate.set_color(OBTUS).scale(1.4), FadeIn(rp, scale=2), run_time=0.3)
            sc.au_mot("entre")
            sc.play(FadeIn(lg[1]), run_time=0.2)
            sc.au_mot("90")
            d9 = DashedLine(O, O + UP * R, color=DROIT_C, stroke_width=6, dash_length=0.2).set_z_index(1)
            sc.play(FadeIn(lg[2], scale=1.3), Create(d9), n90.animate.set_color(DROIT_C).scale(1.3), run_time=0.35)
            sc.au_mot("180")
            d18 = Line(O, O + LEFT * R, color=FAMILLE["plat"], stroke_width=7).set_z_index(1)
            sc.play(FadeIn(lg[3]), Create(d18), n180.animate.set_color(FAMILLE["plat"]).scale(1.3), run_time=0.35)
            sc.au_mot("L'angle")
            c2 = Line(O, polaire(130, R * 1.12, O), color=COTE, stroke_width=7).set_z_index(1)
            ar = arc_de(O, 0, 130, r=0.9, couleur=OBTUS)
            sc.play(Create(c2), run_time=0.45)
            sc.play(FadeIn(l2[0], shift=UP * 0.12), FadeIn(ar), run_time=0.3)
            sc.rep_fini()

        self.question_pause("10-question", "10b-reponse", ["Tu traces un angle de 130°.", "Il sera :"],
                            [self.t("aigu", 34), self.t("droit", 34), self.t("obtus", 34)], 2,
                            ["130 est entre 90 et 180.", "L'angle sera obtus."], mot_q="Tu traces", avant_q=avant, autres_r=apres)

    # ── 11 : le défi : on laisse la pause ───────────────────────────────────
    def ecran_defi(self):
        self.ecran("11-defi")
        O = O_T
        page = cahier()
        self.add(page)
        r = RapporteurT(O, R_T)
        r._placer(O + P(0.75, 0.95), -14)
        self.au_mot("À toi")
        tit = self.t("À toi de jouer !", 42, JAUNE_TITRE)
        self.cc(tit, 3.0)
        self.play(Write(tit), run_time=0.4)
        self.au_mot("Prends")
        l1 = VGroup(self.t("Prends ton", 36), self.t("rapporteur.", 36, RAPPORTEUR)).arrange(DOWN, buff=0.14)
        interligne_regulier(l1)
        self.cc(l1, 1.95)
        muet(l1[0])
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.2)
        self.au_mot("rapporteur")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(r, shift=DOWN * 0.4), run_time=0.45)
        self.au_mot("Trace un")
        l2 = VGroup(self.t("Trace un angle", 36), self.t("de 115°,", 44, ARC)).arrange(DOWN, buff=0.14)
        interligne_regulier(l2)
        self.cc(l2, 0.6)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("115")
        self.play(FadeIn(l2[1], scale=1.25), run_time=0.3)
        self.au_mot("de sommet")
        l3 = self.t("de sommet K.", 38, SOMMET)
        self.cc(l3, -0.3)
        pt = Dot(O, radius=0.12, color=SOMMET).set_z_index(3)
        lk = muet(Text("K", font_size=38, color=SOMMET, weight=BOLD)).move_to(O + P(-0.05, -0.68))
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(pt, scale=2.5), FadeIn(lk, scale=1.4), run_time=0.25)
        self.au_mot("Mets pause")
        pz = VGroup(self.t("Mets pause,", 34, ORANGE_RETENUE), self.t("et trace-le !", 34, ORANGE_RETENUE)).arrange(DOWN, buff=0.14)
        interligne_regulier(pz)
        self.cc(pz, -1.2)
        self.play(FadeIn(pz[0], scale=1.1), run_time=0.25)
        self.au_mot("et trace")
        self.play(FadeIn(pz[1], scale=1.1), run_time=0.25)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("11b-correction")
        O, B = O_T, O_T + RIGHT * LG_T
        page = cahier()
        pt = Dot(O, radius=0.12, color=SOMMET).set_z_index(3)
        lk = muet(Text("K", font_size=38, color=SOMMET, weight=BOLD)).move_to(O + P(-0.05, -0.68))
        lk._pas_audit = True
        r = RapporteurT(O, R_T)
        r._placer(O + P(0.75, 0.95), -14)
        self.add(page, pt, lk)
        tit = self.t("Correction", 46, JAUNE_TITRE)
        self.cc(tit, 3.05)
        self.play(Write(tit), run_time=0.35)
        # un côté
        self.au_mot("Un côté")
        l1 = interligne_regulier(VGroup(self.t("Un côté", 36, COTE), self.t("qui part de K.", 36, COTE)).arrange(DOWN, buff=0.12))
        self.cc(l1, 2.05)
        c1 = Line(O, B, color=COTE, stroke_width=7).set_z_index(1)
        cr = Crayon(O + P(0.5, 0.5))
        self.play(FadeIn(cr), cr.vers(O), run_time=0.2)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.15)
        self.au_mot("qui part")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.15)
        self.play(Create(c1), cr.trace(O, B), run_time=0.6)
        self.play(FadeOut(cr), run_time=0.1)
        # le rapporteur
        self.au_mot("Le centre")
        l2 = self.t("Le centre sur K,", 32, SOMMET)
        self.cc(l2, 1.0)
        self.play(FadeIn(r, shift=DOWN * 0.25), run_time=0.2)
        self.play(FadeIn(l2, shift=UP * 0.1), r.poser(O, -14), run_time=0.3)
        self.au_mot("0")
        l3 = VGroup(self.t("le 0", 36, VERT_OK), self.t("sur le côté.", 36, COTE)).arrange(DOWN, buff=0.12)
        interligne_regulier(l3)
        self.cc(l3, 0.2)
        self.play(FadeIn(l3[0], shift=UP * 0.1), r.allumer_nombre(0, "int", k=1.25), run_time=0.25)
        self.au_mot("sur le côté")
        self.play(FadeIn(l3[1], shift=UP * 0.1), r.poser(O, 0), run_time=0.45)
        # le repère
        self.au_mot("repère")
        self.play(FadeOut(VGroup(l1, l2, l3)), run_time=0.08)
        l4 = VGroup(self.t("Un repère à", 36), self.t("115.", 44, VERT_OK)).arrange(RIGHT, buff=0.18)
        self.cc(l4, 2.1)
        muet(l4)
        d = Doigt(r, "int")
        self.play(FadeIn(l4[0], shift=UP * 0.1), FadeIn(d, scale=1.6), r.rangees["ext"].animate.set_opacity(0.28), run_time=0.1)
        self.play(d.aller(115), run_time=max(0.35, self.t_mot("115")), rate_func=linear)
        self.au_mot("115")
        n115 = lu(r, 115, "int", 26, VERT_OK)
        rp = repere(r, 115)
        self.play(FadeIn(l4[1], scale=1.1), FadeIn(n115, scale=1.5), d.anneau.animate.set_stroke(opacity=0), r.nombres["int"][110].animate.set_opacity(0.3), r.nombres["int"][120].animate.set_opacity(0.3),
                  r.allumer_graduation(115), FadeIn(rp, scale=2), run_time=0.3)
        self.play(n115.animate.scale(1.5), run_time=0.2)
        self.play(n115.animate.scale(1 / 1.5), run_time=0.2)
        # le second côté
        self.au_mot("Puis")
        d.clear_updaters()
        self.play(FadeOut(r, shift=UP * 0.4), FadeOut(d), FadeOut(n115), run_time=0.3)
        l5 = self.t("Puis le second côté.", 30, COTE)
        self.cc(l5, 1.3)
        E = polaire(115, LG_T, O)
        c2 = Line(O, E, color=COTE, stroke_width=7).set_z_index(1)
        cr = Crayon(O + P(0.4, 0.6))
        self.play(FadeIn(l5, shift=UP * 0.1), FadeIn(cr), cr.vers(O), run_time=0.2)
        self.play(Create(c2), cr.trace(O, E), run_time=0.65)
        self.play(FadeOut(cr), Flash(rp, color=AMBRE, line_length=0.22, flash_radius=0.28), run_time=0.2)
        # obtus : il dépasse le coin d'une équerre
        self.au_mot("L'angle est")
        self.play(FadeOut(VGroup(l4, l5)), run_time=0.12)
        l6 = self.t("L'angle est obtus :", 32, OBTUS)
        self.cc(l6, 2.1)
        ar = arc_de(O, 0, 115, r=0.95, couleur=OBTUS)
        n = halo(self.t("115°", 40, OBTUS)).move_to(polaire(57.5, 1.5, O))
        n._pas_audit = n.sans_synchro = True
        self.play(FadeIn(l6, shift=UP * 0.1), FadeIn(ar), FadeIn(n, scale=1.3), run_time=0.25)
        self.au_mot("il dépasse")
        l7 = VGroup(self.t("il dépasse le coin", 32), self.t("d'une équerre.", 32, EQUERRE)).arrange(DOWN, buff=0.14)
        interligne_regulier(l7)
        self.cc(l7, 1.0)
        muet(l7[0])
        self.play(FadeIn(l7[0], shift=UP * 0.1), run_time=0.2)
        self.au_mot("d'une")
        eq = Equerre(O + P(2.3, 0.6), 0, taille=3.0)
        muet(l7[1])
        self.play(FadeIn(l7[1], shift=UP * 0.1), FadeIn(eq), run_time=0.2)
        self.play(eq.poser(O, 0), n.animate.move_to(O + P(2.6, 2.7)), run_time=0.4)
        plus = AnnularSector(inner_radius=0, outer_radius=3.0, start_angle=PI / 2, angle=np.deg2rad(25), arc_center=O, fill_color=OBTUS, fill_opacity=0.4, stroke_width=0).set_z_index(-1)
        self.play(FadeIn(plus), c2.animate.set_stroke(OBTUS, width=11), run_time=0.3)
        self.play(c2.animate.set_stroke(width=7), run_time=0.2)
        self.attendre_voix(marge=0.6)

    # ── 12 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("12-finale")
        self.XL = -0.55
        s = P(0, 0)
        r = RapporteurT(s, 3.0)
        c1 = Line(s, s + RIGHT * 3.5, color=COTE, stroke_width=7)
        c2 = Line(s, polaire(40, 3.5, s), color=COTE, stroke_width=7)
        rp = repere(r, 40)
        ar = arc_de(s, 0, 40, r=0.6)
        pt = Dot(s, radius=0.09, color=SOMMET).set_z_index(3)
        r.graduations[40].set_stroke(VERT_OK, width=6)
        halo(r.nombres["int"][40].set_color(VERT_OK)).set_z_index(2)
        r.rangees["ext"].set_opacity(0.28)
        fig = VGroup(ar, c1, c2, r, rp, pt)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Pour tracer un angle :", "un côté,", "le rapporteur sur le sommet,", "un repère, le second côté."),
            ("On compte depuis le 0", "posé sur le côté."),
            ("On vérifie :", "aigu ou obtus ?")], fs=30)
        # même pas de ligne de base partout : les jambages et les « : » faussaient arrange
        for _, bloc in lignes:
            ref = float(np.median([m.get_bottom()[1] for m in bloc[0].submobjects]))
            for i, l in enumerate(bloc):
                l.shift(UP * (ref - i * 0.48 - float(np.median([m.get_bottom()[1] for m in l.submobjects]))))
        self.au_mot("Pour tracer")
        bl = lignes[0][1]
        self.play(Create(lignes[0][0]), FadeIn(bl[0], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("un côté")
        self.play(FadeIn(bl[1], shift=RIGHT * 0.2), Indicate(c1, color=WHITE, scale_factor=1), run_time=0.3)
        self.au_mot("le rapporteur")
        self.play(FadeIn(bl[2], shift=RIGHT * 0.2), Flash(pt, color=SOMMET, line_length=0.2), run_time=0.3)
        self.au_mot("un repère")
        bl[3].sans_synchro = True
        self.play(FadeIn(bl[3], shift=RIGHT * 0.2), rp.animate.scale(2), run_time=0.3)
        self.play(rp.animate.scale(0.5), Indicate(c2, color=WHITE, scale_factor=1), run_time=0.4)
        self.au_mot("On compte")
        self.montrer_ligne(lignes[1], Indicate(r.nombres["int"][0], color=VERT_OK, scale_factor=1.8))
        self.au_mot("On vérifie")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_outil()
        self.ecran_gestes()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_controle()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("13-abonne")


class AngleTracer6e(AngleTracerBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
