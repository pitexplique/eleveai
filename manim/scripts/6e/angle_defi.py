# angle_defi.py
# EleveAI — Maths 6e — série « Angles », épisode 06 : DÉFIS (micro angle_defi,
# notion angle_mesure), AVEC VOIX. Paysage 16:9, CEINTURE VERTE. Short jumeau :
# angle_defi_short.py (blanche, l'éolienne).
# Décor et métier : Tom, URBANISTE (centres d'intérêt : transports, histoire-geographie) :
# le plan d'un nouveau quartier vu de dessus, les rues dessinées, les angles réels.
# Micro → écrans : situation (01), rue droite 180° (02, 03), QUESTION 1 (04), croisement,
# angles opposés (05), QUESTION 2 (06), tour complet 360° (07), défi du rond-point (08)
# et correction (08b), appris (09), fin (10).
# Voix : manim/voix/6e-angle-defi.json (validée, débit −6) ; WAV : public/sons/6e-angle-defi/ ;
# marques : angle_defi_marques.json.
# Outils : prop_commun.py + manim/canvas_angles.py. Ajouté ICI : plan_quartier, rue_*,
# Voiture, ouverture, etiq, sommet, tom, FigureRondPoint.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run --progress_bar none manim/scripts/6e/angle_defi.py AngleDefi6e
# python -m manim render -qh --progress_bar none manim/scripts/6e/angle_defi.py AngleDefi6e -o eleveai-maths-6e-angle-defi --media_dir manim/scripts/6e/media-angle-06
# Sortie : manim/sorties/6e/maths/angles/06-defi/eleveai-maths-6e-angle-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403
from canvas_angles import *  # noqa: E402,F403

PLAT = FAMILLE["plat"]
OBTUS = FAMILLE["obtus"]
BANDE = "#475569"
X0, X1, Y0, Y1 = -6.6, 0.95, -3.5, 3.5  # le plan, à gauche
C_PLAN = P((X0 + X1) / 2, 0)
JARDIN = "#14532d"


def bout(s, deg, retrait=0.14):
    """Là où la rue partie de s dans la direction deg sort du plan."""
    u = polaire(deg)
    ts = []
    for v, a, i in ((X0 + retrait, s[0], 0), (X1 - retrait, s[0], 0), (Y0 + retrait, s[1], 1), (Y1 - retrait, s[1], 1)):
        if abs(u[i]) > 1e-6:
            t = (v - a) / u[i]
            if t > 0:
                ts.append(t)
    return np.array(s, dtype=float) + u * min(ts)


def plan_quartier(sans=()):
    """Le fond du plan : les îlots du quartier et quelques arbres, très discrets.
    sans : les arbres à ne pas planter (ceux qui passeraient sous une légende)."""
    g = VGroup(RoundedRectangle(width=X1 - X0, height=Y1 - Y0, corner_radius=0.1, fill_color="#0c1a14", fill_opacity=1,
                                stroke_color="#334155", stroke_width=3).move_to(C_PLAN))
    pas = 1.26
    for i in range(6):
        for j in range(5):
            g.add(RoundedRectangle(width=pas - 0.2, height=pas - 0.2, corner_radius=0.06, fill_color="#14261d", fill_opacity=1,
                                   stroke_width=0).move_to(P(X0 + 0.63 + i * pas, Y0 + 0.97 + j * pas)))
    for x, y in ((-5.9, 2.7), (-4.5, 1.1), (-1.0, 2.6), (0.3, 1.2), (-5.7, -2.7), (-0.4, -2.8), (-3.6, 2.9), (0.4, -1.0)):
        if (x, y) in sans:
            continue
        g.add(Circle(radius=0.14, fill_color="#166534", fill_opacity=1, stroke_width=0).move_to(P(x, y)))
    return g


def rue(a, b, sw=30):
    """Une rue : la chaussée grise et, dessus, le côté de l'angle en bleu."""
    bande = Line(a, b, color=BANDE, stroke_width=sw)
    axe = Line(a, b, color=COTE, stroke_width=6).set_z_index(2)
    g = VGroup(bande, axe)
    g.bande, g.axe = bande, axe
    return g


def rue_depuis(s, deg):
    return rue(s, bout(s, deg))


def rue_droite(s, deg):
    return rue(bout(s, deg + 180), bout(s, deg))


def ouverture(s, d1, d2, r=1.0, couleur=ARC, sw=7, op=0.22):
    """L'arc et son secteur, à la vraie mesure : de d1 à d2, en degrés."""
    an, d = np.deg2rad(d2 - d1), np.deg2rad(d1)
    sect = AnnularSector(inner_radius=0, outer_radius=r, angle=an, start_angle=d, arc_center=s, fill_color=couleur,
                         fill_opacity=op, stroke_width=0)
    arc = Arc(radius=r, start_angle=d, angle=an, arc_center=s, stroke_color=couleur, stroke_width=sw)
    g = VGroup(sect, arc).set_z_index(1)
    g.sect, g.arc_ = sect, arc
    return g


def etiq(txt, s, deg, r, couleur=ARC, fs=38):
    """Une mesure posée sur le plan, sur la bissectrice, détourée de noir."""
    t = Text(txt, font_size=fs, color=couleur, weight=BOLD).move_to(polaire(deg, r, s))
    t.set_stroke(BLACK, 6, background=True)
    for m in t.family_members_with_points():
        m.joint_type = LineJointType.ROUND
    t.sans_synchro = True
    return t.set_z_index(4)


def sommet(s, r=0.11):
    return Dot(s, radius=r, color=SOMMET).set_z_index(3)


class Voiture(VGroup):
    """Une petite voiture vue de dessus. v.placer(p, deg) la pose ; v.rouler(s, deg, vitesse,
    fin) la fait avancer toute seule pendant la voix, jusqu'au bout de la rue."""

    def __init__(self, couleur="#f59e0b", **kw):
        super().__init__(**kw)
        self.deg = 0.0
        self.add(RoundedRectangle(width=0.5, height=0.25, corner_radius=0.07, fill_color=couleur, fill_opacity=1, stroke_width=0),
                 Rectangle(width=0.09, height=0.18, fill_color="#e0f2fe", fill_opacity=1, stroke_width=0).shift(RIGHT * 0.1))
        self.set_z_index(2.5)

    def placer(self, p, deg):
        self.rotate(np.deg2rad(deg - self.deg))
        self.deg = deg
        return self.move_to(p)

    def rouler(self, fin, vitesse=1.6):
        fin = np.array(fin, dtype=float)

        def maj(m, dt):
            d = fin - m.get_center()
            n = np.linalg.norm(d)
            if n > 1e-3:
                m.shift(d / n * min(n, vitesse * dt))

        self.add_updater(maj)
        return self


def tom(s=1.0):
    """Tom, urbaniste : le casque de chantier et le plan roulé sous le bras."""
    p = visage(personne(peau="#c68642", tenue="#0f766e", cheveux="#3f2a14", s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    casque = AnnularSector(inner_radius=0, outer_radius=r * 1.14, angle=PI, start_angle=0, arc_center=c + UP * r * 0.32,
                           fill_color="#facc15", fill_opacity=1, stroke_width=0)
    visiere = Rectangle(width=r * 2.5, height=r * 0.14, fill_color="#eab308", fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.3)
    rouleau = RoundedRectangle(width=0.26 * s, height=1.1 * s, corner_radius=0.08 * s, fill_color="#bfdbfe", fill_opacity=1,
                               stroke_width=0).rotate(0.4).move_to(p.corps.get_center() + P(0.3, 0.05) * s)
    p.add(casque, visiere, rouleau)
    return p


def tampon2(l1, l2, couleur, fs=34):
    """Un verdict encadré sur deux lignes (renvoyé : cadre, ligne 1, ligne 2)."""
    a, b = Text(l1, font_size=fs, color=couleur, weight=BOLD), Text(l2, font_size=fs, color=couleur, weight=BOLD)
    g = VGroup(a, b).arrange(DOWN, buff=0.14)
    interligne_regulier(g)
    return VGroup(SurroundingRectangle(g, color=couleur, buff=0.18, corner_radius=0.12, stroke_width=5), a, b)


class FigureRondPoint(VGroup):
    """Le rond-point du défi : 4 rues aux angles RÉELS 120, 90, 80 et 70. L'île au centre,
    la chaussée autour ; chaque angle a son arc, sa mesure (posés par la scène, au mot)."""

    DIRS = (20, 140, 230, 310, 380)

    def __init__(self, s=P(-2.82, -0.1), **kw):
        super().__init__(**kw)
        self.s = s
        self.anneau = Annulus(inner_radius=0.4, outer_radius=0.82, fill_color=BANDE, fill_opacity=1, stroke_width=0).move_to(s)
        self.ile = Circle(radius=0.4, fill_color=JARDIN, fill_opacity=1, stroke_width=0).move_to(s).set_z_index(0.5)
        self.rues = VGroup(*[rue_depuis(s, d) for d in self.DIRS[:4]])
        self.pt = sommet(s)
        self.add(self.anneau, self.rues, self.ile, self.pt)
        d = self.DIRS
        self.arcs = VGroup(ouverture(s, d[0], d[1], 1.2), ouverture(s, d[1], d[2], 1.2), ouverture(s, d[2], d[3], 1.2),
                           ouverture(s, d[3], d[4], 1.2, ORANGE_RETENUE))
        u, v = polaire(d[1]), polaire(d[2])
        # l'angle de 90° : le petit carré remplace l'arc, comme dans toute la série
        self.arcs[1].arc_.set_stroke(opacity=0)
        self.coin = VMobject(stroke_color=ARC, stroke_width=6).set_points_as_corners([s + u * 0.8, s + (u + v) * 0.8, s + v * 0.8]).set_z_index(1)
        self.arcs[1].add(self.coin)
        self.lab = {120: etiq("120°", s, 80, 1.85), 90: etiq("90°", s, 185, 1.85), 80: etiq("80°", s, 270, 1.85),
                    "?": etiq("?", s, 345, 2.05, ORANGE_RETENUE, 50), 70: etiq("70°", s, 345, 2.05, VERT_OK, 42)}
        self.lab["?"]._pas_audit = True


class AngleDefiBase(PaysageProp):
    nom_voix = "6e-angle-defi"
    fichier_marques = "angle_defi_marques.json"
    XL = 1.25
    x_col = 3.85
    _avec = None
    _ensuite = None

    def play(self, *a, **k):
        """Ce qui doit partir AVEC l'animation suivante (une figure avec sa ligne)."""
        if self._avec:
            a, self._avec, self._ensuite = (*a, *self._avec), self._ensuite, None
        return super().play(*a, **k)

    def au_mot(self, extrait, n=1):
        super().au_mot(extrait, n)
        r = self.t_mot(extrait, n)
        if r > 0:  # le module tolère 0,05 s d'avance : ici, 0 s
            self.wait(r + 1 / 60)

    def _disposer_q(self, question, choix, phrase):
        """« Mets pause » lisible : au-dessus de Ti-Margo, sans être rétréci par col()."""
        res = super()._disposer_q(question, choix, phrase)
        res[3].scale_to_fit_width(4.9).move_to(P(self.x_col, res[2].get_bottom()[1] - 0.33))
        return res

    def cc(self, mob, y, x=None):
        """La colonne de droite : tout y a le MÊME CENTRE."""
        if x is None and mob.width > 5.2:  # la colonne : 1,25 à 6,45, jamais sur le plan
            mob.scale_to_fit_width(5.2)
        return mob.move_to(P(self.x_col if x is None else x, y))

    def lignes(self, textes, fs=36, couleur=WHITE, buff=0.16):
        g = VGroup(*[self.t(s, fs, couleur) for s in textes]).arrange(DOWN, buff=buff)
        return interligne_regulier(g) if len(textes) > 1 else g

    def calcul(self, morceaux, y, mots, fs=44, couleur=WHITE, avec=None):
        """Un calcul au centre de la colonne, morceau par morceau, chacun à son mot.
        mots[i] = l'extrait (ou (extrait, n)) ; None = avec le morceau d'avant. avec[i] : ses gestes."""
        lg = self.ligne([(m, couleur) for m in morceaux], fs, buff=0.16)
        self.cc(lg, y)
        self.poser_morceaux(lg, mots, avec)
        return lg

    def poser_morceaux(self, lg, mots, avec=None):
        avec = avec or {}
        i = 0
        while i < len(lg):
            if mots[i] is not None:
                self.au_mot(*mots[i]) if isinstance(mots[i], tuple) else self.au_mot(mots[i])
            lot, gestes = [lg[i]], list(avec.get(i, []))
            j = i + 1
            while j < len(lg) and mots[j] is None:
                lot.append(lg[j])
                gestes += list(avec.get(j, []))
                j += 1
            self.play(*[FadeIn(x, scale=1.15) for x in lot], *gestes, run_time=0.25)
            i = j

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défis sur les angles", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Défis")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.lignes(["Peut-on trouver", "un angle", "sans rapporteur ?"], 40).move_to(P(-3.4, 0.35))
        s = P(3.3, -0.95)
        a = Angle(s, 0, 62, longueur=3.0, rayon_arc=0.7, sw=7).figer()
        inter = etiq("?", s, 31, 1.45, ORANGE_RETENUE, 72).set_z_index(6)
        inter._pas_audit = True
        r = Rapporteur(s, 2.6)
        for v in range(100, 181, 10):
            r.nombres["int"][v].scale(0.82)  # comme angle_mesurer.py : ils se touchaient
        self.au_mot("Peut-on")
        self.play(FadeIn(q[0], shift=UP * 0.2), run_time=0.3)
        self.au_mot("un angle")
        self.play(FadeIn(q[1], shift=UP * 0.2), FadeIn(a), run_time=0.35)
        self.au_mot("sans rapporteur")
        self.play(FadeIn(q[2], shift=UP * 0.2), FadeIn(r, shift=UP * 0.2), run_time=0.35)
        x = croix(r.fond[2].copy(), sw=9).set_z_index(5)
        self.play(Create(x), run_time=0.4)
        self.play(r.animate.set_opacity(0.22), x.animate.set_opacity(0.4), FadeIn(inter, scale=1.3), run_time=0.35)
        self.insister(inter, 1.25, 0.2)
        self.attendre_voix(marge=0.6)

    # ── 01 : Tom, urbaniste ─────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pl = plan_quartier()
        self.add(pl)
        t = tom(0.9).move_to(P(2.3, -1.45))
        self.au_mot("Voici Tom")
        nom = self.t("Tom", 40, BLEU_CALCUL).next_to(t, UP, buff=0.14)
        self.play(FadeIn(t, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("urbaniste")
        met = self.t("urbaniste", 30, BLEU_CALCUL).next_to(t, DOWN, buff=0.12)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.3)
        self.au_mot("Il dessine")
        l1 = self.lignes(["Il dessine les rues", "d'un nouveau quartier."], 36)
        self.cc(l1, 2.75)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.25)
        s1, s2 = P(-1.2, -1.3), P(-4.5, -1.3)
        r0, r1, r2 = rue_droite(s1, 0), rue_depuis(s1, 68), rue_depuis(s2, 118)
        self.au_mot("les rues")
        self.play(Create(r0), run_time=0.45)
        self.au_mot("d'un nouveau")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Create(r1), run_time=0.4)
        self.play(Create(r2), run_time=0.4)
        self.au_mot("Sur son plan")
        l2 = self.lignes(["Sur son plan, il doit", "connaître les angles."], 36)
        self.cc(l2, 1.3)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.25)
        a1, a2 = ouverture(s1, 0, 68, 0.95), ouverture(s2, 0, 118, 0.95)
        p1, p2 = sommet(s1), sommet(s2)
        self.au_mot("connaître")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Create(a1.arc_), FadeIn(a1.sect), Create(a2.arc_), FadeIn(a2.sect), FadeIn(p1, scale=2), FadeIn(p2, scale=2), run_time=0.45)
        self.au_mot("Mais parfois")
        l3 = self.lignes(["Mais parfois,", "il ne peut pas", "les mesurer."], 32, ORANGE_RETENUE)
        self.cc(l3, -1.05, 4.75)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.25)
        i1, i2 = etiq("?", s1, 34, 1.42, ORANGE_RETENUE, 50), etiq("?", s2, 59, 1.42, ORANGE_RETENUE, 50)
        i1._pas_audit = i2._pas_audit = True
        self.au_mot("il ne peut")
        self.play(FadeIn(l3[1], shift=UP * 0.1), FadeIn(i1, scale=1.5), FadeIn(i2, scale=1.5), run_time=0.3)
        self.au_mot("les mesurer")
        self.play(FadeIn(l3[2], shift=UP * 0.1), run_time=0.25)
        self.play(i1.animate.scale(1.4), i2.animate.scale(1.4), run_time=0.2)
        self.play(i1.animate.scale(1 / 1.4), i2.animate.scale(1 / 1.4), run_time=0.2)
        self.attendre_voix()

    # ── 02 : la rue droite, l'angle plat, la petite rue à 110° ──────────────
    S_RUE = P(-2.82, -1.45)

    def ecran_plat(self):
        self.ecran("02-plat")
        s = self.S_RUE
        self.add(plan_quartier())
        self.au_mot("Premier")
        tit = self.t("Premier cas", 44, JAUNE_TITRE)
        self.cc(tit, 3.0)
        self.play(FadeIn(tit, shift=UP * 0.15), run_time=0.3)
        self.au_mot("Une rue")
        r0 = rue_droite(s, 0)
        v = Voiture().placer(r0.bande.get_start(), 0)
        l1 = self.t("Une rue bien droite :", 36)
        self.cc(l1, 2.05)
        self.play(FadeIn(l1, shift=UP * 0.1), Create(r0), run_time=0.4)
        self.add(v)
        v.rouler(r0.bande.get_end() + LEFT * 0.35, 1.9)
        self.au_mot("c'est un angle")
        l2 = self.t("c'est un angle plat,", 36, PLAT)
        self.cc(l2, 1.45)
        pt = sommet(s)
        plat = ouverture(s, 0, 180, 1.0, PLAT)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(pt, scale=2), Create(plat.arc_), FadeIn(plat.sect), run_time=0.5)
        self.au_mot("180")
        n = self.t("180°", 56, PLAT)
        self.cc(n, 0.65)
        lb = etiq("180°", s, 90, 1.4, PLAT, 40)
        self.play(FadeIn(n, scale=1.3), FadeIn(lb, scale=1.2), run_time=0.3)
        self.insister(n, 1.25, 0.2)
        self.au_mot("Une petite")
        l3 = self.t("Une petite rue en part,", 36)
        self.cc(l3, -0.3)
        r1 = rue_depuis(s, 110)
        self.play(FadeIn(l3, shift=UP * 0.1), Create(r1), FadeOut(plat), FadeOut(lb), run_time=0.45)
        self.au_mot("et fait")
        l4 = self.t("et fait un angle de", 36)
        self.cc(l4, -0.95)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.25)
        self.au_mot("110")
        n2 = self.t("110°", 56, ARC)
        self.cc(n2, -1.6)
        a = ouverture(s, 0, 110, 1.0)
        lb2 = etiq("110°", s, 55, 2.0)
        self.play(FadeIn(n2, scale=1.3), Create(a.arc_), FadeIn(a.sect), FadeIn(lb2, scale=1.2), run_time=0.4)
        self.insister(lb2, 1.3, 0.2)
        self.attendre_voix()

    # ── 03 : l'autre angle : 180 − 110 = 70 ─────────────────────────────────
    def ecran_plat_calcul(self):
        self.ecran("03-plat-calcul")
        s = self.S_RUE
        r0, r1 = rue_droite(s, 0), rue_depuis(s, 110)
        a = ouverture(s, 0, 110, 1.0)
        lb = etiq("110°", s, 55, 2.0)
        lb._pas_audit = True
        self.add(plan_quartier(), r0, r1, a, lb, sommet(s))
        manque = ouverture(s, 110, 180, 1.0, ORANGE_RETENUE)
        inter = etiq("?", s, 145, 2.0, ORANGE_RETENUE, 50)
        inter._pas_audit = True
        self.au_mot("Combien")
        q = self.lignes(["Combien mesure", "l'autre angle ?"], 38, ORANGE_RETENUE)
        self.cc(q, 2.75)
        self.play(FadeIn(q[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("l'autre angle")
        self.play(FadeIn(q[1], shift=UP * 0.1), Create(manque.arc_), FadeIn(manque.sect), FadeIn(inter, scale=1.5), run_time=0.4)
        self.insister(inter, 1.35, 0.2)
        self.au_mot("Les deux")
        l1 = self.lignes(["Les deux ensemble", "font 180°."], 36)
        self.cc(l1, 1.3)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        plat = ouverture(s, 0, 180, 1.28, PLAT, op=0).set_z_index(1)
        lb180 = etiq("180°", s, 270, 0.62, PLAT, 36)
        self.au_mot("font 180")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Create(plat.arc_), FadeIn(lb180, scale=1.2), run_time=0.5)
        n70 = etiq("70°", s, 145, 2.0, VERT_OK, 42)
        lg = self.ligne([("180", WHITE), ("−", WHITE), ("110", ARC), ("=", WHITE), ("70", VERT_OK)], 50, buff=0.2)
        self.cc(lg, 0.05)
        self.poser_morceaux(lg, ["180 moins", None, "110", "égale", "70"],
                            {4: [FadeOut(inter), FadeIn(n70, scale=1.5), manque.arc_.animate.set_stroke(VERT_OK), manque.sect.animate.set_fill(VERT_OK)]})
        self.insister(lg[4], 1.35, 0.2)
        self.au_mot("L'autre angle")
        v = tampon2("L'autre angle", "mesure 70°.", VERT_OK, 36)
        self.cc(v, -1.05)
        self.play(FadeIn(v[0]), FadeIn(v[1], scale=1.1), run_time=0.3)
        self.au_mot("70 degrés")
        self.play(FadeIn(v[2], scale=1.1), run_time=0.25)
        self.insister(n70, 1.3, 0.2)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (125 → 55) ──────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        s = self.S_RUE
        self.add(plan_quartier(sans=((-1.0, 2.6), (-3.6, 2.9))))
        cap = self.t("Sur une rue droite", 34).move_to(P(-2.82, 2.95)).set_z_index(4)
        r0, r1 = rue_droite(s, 0), rue_depuis(s, 125)
        a = ouverture(s, 0, 125, 1.0)
        lb = etiq("125°", s, 62.5, 2.0)
        manque = ouverture(s, 125, 180, 1.0, ORANGE_RETENUE)
        inter = etiq("?", s, 152.5, 2.15, ORANGE_RETENUE, 50)
        inter._pas_audit = True
        n55 = etiq("55°", s, 152.5, 2.15, VERT_OK, 40)
        n55._pas_audit = True
        pt = sommet(s)

        def avant(sc):
            sc.play(FadeIn(cap, shift=UP * 0.1), Create(r0), FadeIn(pt, scale=2), run_time=0.4)
            sc.au_mot("un angle")
            sc.play(Create(r1), run_time=0.3)
            sc._avec = [Create(a.arc_), FadeIn(a.sect), FadeIn(lb, scale=1.2)]
            sc._ensuite = [Create(manque.arc_), FadeIn(manque.sect), FadeIn(inter, scale=1.5)]

        def apres(sc):
            lg = sc.ligne_rep(0, ["180", "−", "125", "=", "55°"])
            sc.poser_morceaux(lg, ["180 moins", None, "125", "égale", "55 degrés"],
                              {4: [FadeOut(inter), FadeIn(n55, scale=1.5), manque.arc_.animate.set_stroke(VERT_OK), manque.sect.animate.set_fill(VERT_OK)]})
            sc.insister(n55, 1.3, 0.2)
            sc.au_mot("On vérifie")
            sc.play(FadeIn(sc.ph_q[1], shift=UP * 0.1), run_time=0.25)
            lg2 = sc.ligne_rep(2, ["125", "+", "55", "=", "180"])
            plat = ouverture(s, 0, 180, 1.28, PLAT, op=0)
            sc.poser_morceaux(lg2, ["125 plus", None, "55,", ("égale", 2), "180."], {4: [Create(plat.arc_)]})
            sc.rep_fini()

        self.question_pause("04-question", "04b-reponse", ["Un angle mesure 125°.", "Combien mesure l'autre ?"],
                            [self.t("55°", 34), self.t("65°", 34), self.t("235°", 34)], 0,
                            ["180 − 125 = 55°", "On vérifie :", "125 + 55 = 180"], mot_q="Sur une", avant_q=avant, autres_r=apres)

    # ── 05 : le croisement : angles opposés par le sommet ───────────────────
    S_X = P(-2.82, -0.1)

    def ecran_croisement(self):
        self.ecran("05-croisement")
        s = self.S_X
        self.add(plan_quartier())
        self.au_mot("Deuxième")
        tit = self.t("Deuxième cas", 44, JAUNE_TITRE)
        self.cc(tit, 3.05)
        self.play(FadeIn(tit, shift=UP * 0.15), run_time=0.3)
        self.au_mot("Deux rues")
        l1 = self.lignes(["Deux rues droites", "se croisent."], 32)
        self.cc(l1, 2.15)
        r1, r2 = rue_droite(s, 15), rue_droite(s, 65)
        pt = sommet(s)
        self.play(FadeIn(l1[0], shift=UP * 0.1), Create(r1), run_time=0.4)
        self.au_mot("se croisent")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Create(r2), FadeIn(pt, scale=2), run_time=0.4)
        self.au_mot("Regarde")
        l2 = self.lignes(["Regarde les deux angles", "qui se font face."], 32)
        self.cc(l2, 1.0)
        a1, a2 = ouverture(s, 15, 65, 1.25), ouverture(s, 195, 245, 1.25)
        self.play(FadeIn(l2[0], shift=UP * 0.1), Create(a1.arc_), FadeIn(a1.sect), run_time=0.4)
        self.au_mot("qui se font")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Create(a2.arc_), FadeIn(a2.sect), run_time=0.4)
        self.au_mot("Ils sont")
        l3 = self.t("Ils sont opposés", 32, ARC)
        l3b = self.t("par le sommet.", 32, SOMMET)
        g3 = VGroup(l3, l3b).arrange(DOWN, buff=0.16)
        interligne_regulier(g3)
        self.cc(g3, -0.2)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        self.au_mot("par le sommet")
        self.play(FadeIn(l3b, shift=UP * 0.1), pt.animate.scale(2.2), run_time=0.3)
        self.play(pt.animate.scale(1 / 2.2), Flash(s, color=SOMMET, line_length=0.3), run_time=0.35)
        self.au_mot("Ils ont")
        tourne = a1.copy().set_z_index(1.5)
        tourne.sect.set_fill(VERT_OK, 0.5), tourne.arc_.set_stroke(VERT_OK)
        self.au_mot("même mesure")
        v = self.tampon("la même mesure.", VERT_OK, 32)
        self.cc(v, -1.2)
        self.add(tourne)
        self.play(FadeIn(v, scale=1.1), Rotate(tourne, PI, about_point=s), run_time=1.1)
        self.attendre_voix(marge=0.6)

    # ── 06 : QUESTION 2 (35 → 35) ───────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        s = self.S_X
        self.add(plan_quartier(sans=((-5.9, 2.7), (-3.6, 2.9))))
        cap = self.t("Deux rues se croisent.", 30).move_to(P(-3.6, 3.05)).set_z_index(4)
        cap2 = self.t("Un angle mesure 35°.", 30).move_to(P(-3.6, 2.55)).set_z_index(4)
        cap2.sans_synchro = True  # « angle » revient plus loin : posée à son nombre, au mot
        r1, r2 = rue_droite(s, 10), rue_droite(s, 45)
        a = ouverture(s, 10, 45, 1.25)
        lb = etiq("35°", s, 27.5, 2.2)
        face = ouverture(s, 190, 225, 1.25, ORANGE_RETENUE)
        inter = etiq("?", s, 207.5, 2.1, ORANGE_RETENUE, 50)
        inter._pas_audit = True
        n35 = etiq("35°", s, 207.5, 2.2, VERT_OK, 38)
        n35._pas_audit = True
        pt = sommet(s)

        def avant(sc):
            sc.play(FadeIn(cap, shift=UP * 0.1), Create(r1), Create(r2), FadeIn(pt, scale=2), run_time=0.4)
            sc.au_mot("35")
            sc.play(FadeIn(cap2, shift=UP * 0.1), Create(a.arc_), FadeIn(a.sect), FadeIn(lb, scale=1.2), run_time=0.3)
            sc.au_mot("Combien")
            sc._ensuite = [Create(face.arc_), FadeIn(face.sect), FadeIn(inter, scale=1.5)]

        def apres(sc):
            tourne = a.copy().set_z_index(1.5)
            sc.ph_q[2].scale(1.5, about_edge=UL)
            sc.au_mot("En face")
            sc.add(tourne)
            sc.play(FadeIn(sc.ph_q[0], shift=UP * 0.1), Rotate(tourne, PI, about_point=s), run_time=0.8)
            sc.au_mot("la même")
            sc.play(FadeIn(sc.ph_q[1], shift=UP * 0.1), run_time=0.25)
            sc.au_mot("35 degrés")
            sc.play(FadeIn(sc.ph_q[2], scale=1.3), FadeOut(inter), FadeOut(face), FadeIn(n35, scale=1.5),
                    tourne.sect.animate.set_fill(VERT_OK), tourne.arc_.animate.set_stroke(VERT_OK), run_time=0.3)
            sc.insister(n35, 1.3, 0.2)
            sc.rep_fini()

        self.question_pause("06-question", "06b-reponse", ["Combien mesure", "l'angle en face ?"],
                            [self.t("35°", 34), self.t("145°", 34), self.t("325°", 34)], 0,
                            ["En face, c'est", "la même mesure :", "35°"], mot_q="Deux rues", avant_q=avant, autres_r=apres)

    # ── 07 : le tour complet : 360° ─────────────────────────────────────────
    def ecran_tour(self):
        self.ecran("07-tour")
        s = self.S_X
        self.add(plan_quartier())
        anneau = Annulus(inner_radius=1.75, outer_radius=2.2, fill_color=BANDE, fill_opacity=1, stroke_width=0).move_to(s)
        pt = sommet(s)
        self.add(anneau, pt)
        self.au_mot("Troisième")
        tit = self.t("Troisième cas", 44, JAUNE_TITRE)
        self.cc(tit, 3.0)
        self.play(FadeIn(tit, shift=UP * 0.15), run_time=0.3)
        th = ValueTracker(0.01)
        rayon = Line(s, s + RIGHT * 1.97, color=COTE, stroke_width=7).set_z_index(2)
        arc = VMobject(stroke_color=ARC, stroke_width=8, fill_opacity=0).set_z_index(1)
        v = Voiture().placer(s + RIGHT * 1.97, 90)

        def maj_arc(m):
            m.set_points(Arc(radius=1.25, start_angle=0, angle=np.deg2rad(th.get_value()), arc_center=s).get_points())

        def maj_ray(m):
            m.put_start_and_end_on(s, polaire(th.get_value(), 1.97, s))

        def maj_v(m):
            m.placer(polaire(th.get_value(), 1.97, s), th.get_value() + 90)

        arc.add_updater(maj_arc), rayon.add_updater(maj_ray), v.add_updater(maj_v)
        self.au_mot("Un tour")
        l1 = self.t("Un tour complet.", 38, ARC)
        self.cc(l1, 2.05)
        self.add(arc, rayon, v)
        self.play(FadeIn(l1, shift=UP * 0.1), th.animate.set_value(359.9), run_time=1.75, rate_func=linear)
        arc.clear_updaters(), rayon.clear_updaters(), v.clear_updaters()
        self.au_mot("C'est")
        l2 = self.t("C'est 2 angles plats :", 36, PLAT)
        self.cc(l2, 1.15)
        h = Line(s + LEFT * 1.97, s + RIGHT * 1.97, color=PLAT, stroke_width=8).set_z_index(2)
        haut, bas = ouverture(s, 0, 180, 1.25, PLAT), ouverture(s, 180, 360, 1.25, "#fb7185")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeOut(rayon), FadeOut(arc), Create(h), run_time=0.35)
        lb1, lb2 = etiq("180°", s + UP * 0.62, 0, 0, PLAT, 36), etiq("180°", s + DOWN * 0.62, 0, 0, "#fb7185", 36)
        lg = self.ligne([("180", PLAT), ("+", WHITE), ("180", "#fb7185"), ("=", WHITE), ("360°", VERT_OK)], 46, buff=0.18)
        self.cc(lg, 0.25)
        for x in lg:
            x.sans_synchro = True
        tout = Circle(radius=1.25, stroke_color=VERT_OK, stroke_width=9).move_to(s).set_z_index(1.5)
        self.poser_morceaux(lg, ["180 plus", None, ("180", 2), "égale", "360 degrés"],
                            {0: [FadeIn(haut), FadeIn(lb1, scale=1.2)], 2: [FadeIn(bas), FadeIn(lb2, scale=1.2)], 4: [Create(tout)]})
        self.insister(lg[4], 1.25, 0.18)
        self.au_mot("Autour")
        l3 = self.lignes(["Autour d'un point,", "tous les angles", "font 360°."], 36)
        self.cc(l3, -1.2)
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeOut(h), FadeOut(lb1), FadeOut(lb2), FadeOut(haut), FadeOut(bas), run_time=0.2)
        self.au_mot("tous les")
        ds = [15, 75, 175, 225, 315, 375]
        cs = [ARC, FAMILLE["aigu"], OBTUS, PLAT, FAMILLE["droit"]]
        secteurs = VGroup(*[ouverture(s, ds[i], ds[i + 1], 1.25, cs[i], op=0.5, sw=0) for i in range(5)])
        rays = VGroup(*[Line(s, polaire(d, 1.75, s), color=COTE, stroke_width=6).set_z_index(2) for d in ds[:5]])
        self.play(FadeIn(l3[1], shift=UP * 0.1), LaggedStart(*[FadeIn(VGroup(x, y)) for x, y in zip(secteurs, rays)], lag_ratio=0.45), run_time=0.75)
        self.au_mot("font 360")
        self.play(FadeIn(l3[2], scale=1.15), run_time=0.25)
        self.insister(tout, 1.08, 0.2)
        self.attendre_voix()

    # ── 08 : le défi : le rond-point ────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi")
        self.add(plan_quartier())
        f = FigureRondPoint()
        self.au_mot("À toi")
        tit = self.t("À toi de jouer !", 44, JAUNE_TITRE)
        self.cc(tit, 3.05)
        self.play(Write(tit), run_time=0.4)
        self.au_mot("À un")
        l1 = self.lignes(["À un rond-point,", "4 rues se rejoignent."], 34)
        self.cc(l1, 2.15)
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(f.anneau), FadeIn(f.ile), FadeIn(f.pt, scale=2), run_time=0.35)
        self.au_mot("4 rues")
        self.play(FadeIn(l1[1], shift=UP * 0.1), LaggedStart(*[Create(x) for x in f.rues], lag_ratio=0.3), run_time=0.7)
        self.au_mot("Trois")
        l2 = self.t("Trois angles mesurent", 36)
        self.cc(l2, 1.15)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        lg = self.ligne([("120°,", ARC), ("90°", ARC), ("et", WHITE), ("80°.", ARC)], 44, buff=0.2)
        self.cc(lg, 0.5)
        self.poser_morceaux(lg, ["120,", "90 et", None, "80 degrés"],
                            {i: [FadeIn(f.arcs[k]), FadeIn(f.lab[v], scale=1.2)] for i, k, v in ((0, 0, 120), (1, 1, 90), (3, 2, 80))})
        self.au_mot("Combien")
        q = self.lignes(["Combien mesure", "le quatrième ?"], 36, ORANGE_RETENUE)
        self.cc(q, -0.42)
        self.play(FadeIn(q[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("le quatrième")
        self.play(FadeIn(q[1], shift=UP * 0.1), FadeIn(f.arcs[3]), FadeIn(f.lab["?"], scale=1.5), run_time=0.3)
        self.insister(f.lab["?"], 1.35, 0.2)
        self.au_mot("Mets pause")
        g = self.lignes(["Mets pause,", "et cherche !"], 30, ORANGE_RETENUE, buff=0.14)
        self.cc(g, -1.45)
        pz, pz2 = g
        self.play(FadeIn(pz, scale=1.1), run_time=0.25)
        self.au_mot("et cherche")
        self.play(FadeIn(pz2, scale=1.1), run_time=0.25)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("08b-correction")
        f = FigureRondPoint()
        for k in (120, 90, 80):
            f.lab[k]._pas_audit = True
        self.add(plan_quartier(), f.anneau, f.rues, f.ile, f.pt, f.arcs, *[f.lab[k] for k in (120, 90, 80, "?")])
        tit = self.t("Correction", 44, JAUNE_TITRE)
        self.cc(tit, 3.0)
        self.au_mot("Correction")
        self.play(Write(tit), run_time=0.35)
        self.au_mot("D'abord")
        l1 = self.t("D'abord, on additionne :", 34)
        self.cc(l1, 2.2)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        vert = lambda k: [f.arcs[k].sect.animate.set_fill(VERT_OK, 0.4), f.lab[{0: 120, 1: 90, 2: 80}[k]].animate.set_color(VERT_OK)]  # noqa: E731
        lg = self.ligne([("120", ARC), ("+", WHITE), ("90", ARC), ("+", WHITE), ("80", ARC), ("=", WHITE), ("290", VERT_OK)], 42, buff=0.13)
        self.cc(lg, 1.45)
        self.poser_morceaux(lg, ["120 plus", None, "90 plus", None, "80,", "égale", "290"], {0: vert(0), 2: vert(1), 4: vert(2)})
        self.insister(lg[6], 1.25, 0.18)
        self.au_mot("Puis")
        l2 = self.t("Puis,", 34)
        self.cc(l2, 0.65)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.25)
        lg2 = self.ligne([("360", WHITE), ("−", WHITE), ("290", VERT_OK), ("=", WHITE), ("70", VERT_OK)], 46, buff=0.18)
        self.cc(lg2, -0.05)
        tour = Circle(radius=1.2, stroke_color=WHITE, stroke_width=5).move_to(f.s).set_z_index(1.5)
        self.poser_morceaux(lg2, ["360 moins", None, ("290", 2), ("égale", 2), "70."],
                            {0: [Create(tour)], 4: [FadeOut(tour), FadeOut(f.lab["?"]), FadeIn(f.lab[70], scale=1.5), f.arcs[3].arc_.animate.set_stroke(VERT_OK), f.arcs[3].sect.animate.set_fill(VERT_OK, 0.4)]})
        self.insister(f.lab[70], 1.3, 0.2)
        self.au_mot("Le quatrième")
        v = tampon2("Le quatrième angle", "mesure 70°.", VERT_OK, 34)
        self.cc(v, -1.2)
        self.play(FadeIn(v[0]), FadeIn(v[1], scale=1.1), run_time=0.3)
        self.au_mot("70 degrés")
        self.play(FadeIn(v[2], scale=1.1), run_time=0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.5)
        self.XL = -1.7
        a0, a1, a2 = P(0, 0), P(0, -2.5), P(0, -5.5)
        haut = VGroup(Line(a0 + LEFT * 1.5, a0 + RIGHT * 1.5, color=COTE, stroke_width=6), Line(a0, polaire(110, 1.5, a0), color=COTE, stroke_width=6),
                      ouverture(a0, 0, 110, 0.55).set_z_index(0), ouverture(a0, 110, 180, 0.55, VERT_OK).set_z_index(0), sommet(a0).set_z_index(0))
        mil = VGroup(Line(polaire(195, 1.4, a1), polaire(15, 1.4, a1), color=COTE, stroke_width=6), Line(polaire(245, 1.4, a1), polaire(65, 1.4, a1), color=COTE, stroke_width=6),
                     ouverture(a1, 15, 65, 0.65).set_z_index(0), ouverture(a1, 195, 245, 0.65).set_z_index(0), sommet(a1).set_z_index(0))
        ds = [15, 135, 225, 305, 375]
        cs = [ARC, FAMILLE["aigu"], OBTUS, PLAT]
        bas = VGroup(*[ouverture(a2, ds[i], ds[i + 1], 0.9, cs[i], op=0.45, sw=5).set_z_index(0) for i in range(4)],
                     *[Line(a2, polaire(d, 1.2, a2), color=COTE, stroke_width=6) for d in ds[:4]], sommet(a2).set_z_index(0))
        for m in (*haut, *mil, *bas):
            m.set_z_index(0)
        fig = VGroup(haut, mil, bas)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Sur une ligne droite,", "les angles font 180°."),
            ("Deux angles opposés", "par le sommet sont égaux."),
            ("Autour d'un point,", "les angles font 360°."),
            ("On trouve l'angle manquant", "sans le mesurer.")], fs=36)
        lignes.scale(1.24).align_to(P(self.XL, 0), LEFT).align_to(P(0, 2.45), UP)
        self.au_mot("Sur une")
        self.montrer_ligne(lignes[0], Indicate(haut[3], color=WHITE, scale_factor=1.05))
        self.au_mot("Deux angles")
        self.montrer_ligne(lignes[1], Indicate(mil[2], color=WHITE, scale_factor=1.05), Indicate(mil[3], color=WHITE, scale_factor=1.05))
        self.au_mot("Autour")
        self.montrer_ligne(lignes[2], Indicate(bas, color=WHITE, scale_factor=1.0))
        self.au_mot("On trouve")
        self.montrer_ligne(lignes[3])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_plat()
        self.ecran_plat_calcul()
        self.ecran_question1()
        self.ecran_croisement()
        self.ecran_question2()
        self.ecran_tour()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class AngleDefi6e(AngleDefiBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
