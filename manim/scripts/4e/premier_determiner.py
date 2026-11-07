# premier_determiner.py
# EleveAI — Maths 4e — série « Divisibilité et nombres premiers », épisode 09 : RECONNAÎTRE UN NOMBRE PREMIER.
# Paysage 16:9, AVEC VOIX, ceinture VERTE. Micro : premier_determiner.
# Décor et métier : Salomé, entomologiste (les cigales de 13 et 17 ans). Centres : animaux, sciences.
# Écrans : garde (00) ; les cigales de Salomé (01) ; pourquoi 13 et 17 (02) ; le crible
# d'Ératosthène (03) ; on s'arrête à 7 (04) ; QUESTION 1 (04q) ; le piège de 91 (05) ;
# QUESTION 2 (05q) ; défi (06) et correction (06b) ; ce que tu as appris (07) ; fin (08).
# Voix : manim/voix/4e-premier-determiner.json ; marques : premier_determiner_marques.json.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/premier_determiner.py PremierDeterminer4e
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/premier_determiner.py PremierDeterminer4e -o eleveai-maths-4e-premier-determiner --media_dir manim/scripts/4e/media-div-09
# Sortie : manim/sorties/4e/maths/divisibilite/09-determiner/eleveai-maths-4e-premier-determiner.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))

from div_commun import *  # noqa: E402,F403

# Les couleurs du crible : chaque nombre gardé barre ses multiples dans SA couleur.
C2 = ORANGE_RETENUE
C3 = "#7dd3fc"
C5 = "#f472b6"
C7 = "#a78bfa"
TERRE = "#5b3a1e"
HERBE = "#16a34a"
PREMIERS = [n for n in range(2, 101) if all(n % d for d in range(2, int(n ** 0.5) + 1))]


# ── Les objets de l'épisode (propres à ce script) ───────────────────────────
def cigale(s=1.0, adulte=True):
    """Une cigale vue de dessus, tête en haut : corps sombre, yeux rouges, ailes
    transparentes aux nervures orange (les cigales périodiques). adulte=False : la larve."""
    if not adulte:
        corps = Ellipse(width=0.3 * s, height=0.46 * s, fill_color="#b45309", fill_opacity=1, stroke_color="#fcd34d", stroke_width=1.5)
        tete = Circle(radius=0.11 * s, fill_color="#92400e", fill_opacity=1, stroke_width=0).move_to(corps.get_top() + DOWN * 0.04 * s)
        pattes = VGroup(*[Line(corps.get_center() + P(sx * 0.12 * s, dy * s), corps.get_center() + P(sx * 0.24 * s, (dy - 0.06) * s),
                               color="#fcd34d", stroke_width=2) for sx in (-1, 1) for dy in (0.08, -0.04, -0.14)])
        return VGroup(pattes, corps, tete)
    ailes = VGroup(*[Ellipse(width=0.24 * s, height=0.62 * s, fill_color="#fde68a", fill_opacity=0.32, stroke_color="#f59e0b",
                             stroke_width=2).rotate(sx * 0.32).move_to(P(sx * 0.13 * s, -0.12 * s)) for sx in (-1, 1)])
    corps = Ellipse(width=0.26 * s, height=0.5 * s, fill_color="#3f3f46", fill_opacity=1, stroke_color="#a1a1aa", stroke_width=1.5)
    tete = Ellipse(width=0.3 * s, height=0.16 * s, fill_color="#27272a", fill_opacity=1, stroke_width=0).move_to(P(0, 0.25 * s))
    yeux = VGroup(*[Circle(radius=0.045 * s, fill_color="#ef4444", fill_opacity=1, stroke_width=0).move_to(P(sx * 0.14 * s, 0.26 * s))
                    for sx in (-1, 1)])
    return VGroup(corps, ailes, tete, yeux)


def salome_entomologiste(s=0.72):
    """Salomé : la tenue de terrain, le chapeau de brousse et sa loupe."""
    p = personne(peau="#e0ac69", tenue="#0f766e", cheveux="#7c2d12", longs=True, s=s)
    bord = Ellipse(width=1.15 * s, height=0.2 * s, fill_color="#a3a35a", fill_opacity=1, stroke_width=0)
    bord.move_to(p.tete.get_top() + DOWN * 0.1 * s)
    calotte = RoundedRectangle(width=0.66 * s, height=0.28 * s, corner_radius=0.08 * s, fill_color="#bdb76b", fill_opacity=1,
                               stroke_width=0).next_to(bord, UP, buff=-0.04 * s)
    verre = Circle(radius=0.2 * s, color="#e5e7eb", stroke_width=5, fill_color="#bae6fd", fill_opacity=0.35)
    verre.move_to(p.corps.get_right() + P(0.25 * s, 0.55 * s))
    manche = Line(verre.get_bottom() + P(0.02 * s, 0), verre.get_bottom() + P(0.16 * s, -0.36 * s), color="#92400e", stroke_width=7)
    return VGroup(p, bord, calotte, manche, verre)


def carte_nombre(n, c=WHITE, w=1.9, h=1.2, fs=72):
    """Un nombre dans une carte, comme sur le carnet de Salomé."""
    r = RoundedRectangle(width=w, height=h, corner_radius=0.16, stroke_color=c, stroke_width=4, fill_color=FOND_CARTE, fill_opacity=1)
    return VGroup(r, T(str(n), fs, c, audit=False).move_to(r))


def tampon_croix(m, c=None):
    c = c or PIEGE
    t = 0.2
    o = m.get_corner(UR) + P(-0.05, -0.05)
    return VGroup(Line(o + P(-t, t), o + P(t, -t)), Line(o + P(-t, -t), o + P(t, t))).set_stroke(c, 7)


def tampon_coche(m, c=None):
    c = c or VERT_OK
    k = VMobject(stroke_color=c, stroke_width=7)
    k.set_points_as_corners([P(-0.2, 0), P(-0.05, -0.15), P(0.22, 0.17)])
    return k.move_to(m.get_corner(UR) + P(-0.05, -0.05))


class Crible(VGroup):
    """Le tableau de 2 à 100 : .case[n], .num[n] (la case de 1 reste vide)."""

    def __init__(self, cote=0.5, centre=ORIGIN, fs=19, **kw):
        super().__init__(**kw)
        self.cote, self.case, self.num = cote, {}, {}
        for n in range(2, 101):
            i, j = (n - 1) // 10, (n - 1) % 10
            r = Square(side_length=cote, stroke_color="#475569", stroke_width=2, fill_color=FOND_CARTE, fill_opacity=1)
            r.move_to(P((j - 4.5) * cote, (4.5 - i) * cote))
            t = T(str(n), fs, WHITE, audit=False).move_to(r)
            self.case[n], self.num[n] = r, t
            self.add(r, t)
        self.move_to(centre)
        self.barres = set()

    def barrer(self, n, c):
        self.barres.add(n)
        return [self.case[n].animate.set_fill(c, 0.33), self.num[n].animate.set_opacity(0.3)]

    def barrer_net(self, n, c):
        self.barres.add(n)
        self.case[n].set_fill(c, 0.33)
        self.num[n].set_opacity(0.3)

    def rond(self, n, c):
        return Circle(radius=self.cote * 0.43, color=c, stroke_width=4).move_to(self.case[n])

    def multiples(self, p):
        return [n for n in range(2 * p, 101, p) if n not in self.barres]


class PremierDeterminer4e(PaysageDiv):
    nom_voix = "4e-premier-determiner"
    fichier_marques = "premier_determiner_marques.json"
    ceinture = "verte"

    def index(self, e, s, n=1):
        """La place du n-ième atome « s » d'une ligne."""
        k = 0
        for i, a in enumerate(e.atomes):
            if a.original_text == s:
                k += 1
                if k == n:
                    return i
        raise ValueError(f"{s} absent de {e.s}")

    def _disposer_q(self, question, choix, phrase):
        """Les choix sont des phrases : des cartes de 6,6 de large (celles de div_multiple.py)."""
        hauteurs = [c.height for c in choix]
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        for c, h in zip(choix, hauteurs):
            c.scale_to_fit_height(h * 34 / 40)
        neuves = VGroup(*[self._carte_choix(l, c, 6.6, 34) for l, c in zip("ABC", choix)])
        for n, o in zip(neuves, cartes):
            n.move_to(o).align_to(o, LEFT)
        # des cartes plus hautes que celles d'origine : on les range sans chevauchement
        haut = cartes.get_top()[1]
        neuves.arrange(DOWN, buff=0.16, aligned_edge=LEFT).align_to(cartes, LEFT).align_to(P(0, haut), UP)
        pause.next_to(neuves, DOWN, buff=0.22).align_to(neuves, LEFT)
        ph.next_to(neuves, DOWN, buff=0.22).align_to(P(self.XL, 0), LEFT)
        self.cartes_q = neuves
        return tete, q, neuves, pause, rebours, ph

    def eq_dans_q(self, i, s, phrase, n=1, fs=None, lettres="xytn", couleur=WHITE):
        """Celle de div_probleme.py : la ligne ne dépasse jamais x = 6,3 et se retient (_lq)."""
        ref = self.q_q[i]
        e = Eq(s, fs or 34, couleur=couleur, lettres=lettres)
        e.scale_to_fit_height(ref.height).move_to(ref)
        if e.get_right()[0] > 6.3:
            c = e.get_center()[0]
            e.scale(2 * (6.3 - c) / e.width)
        self.q_q.remove(ref)
        self.dire_eq(e, phrase, n)
        self._lq.append(e)
        return e

    def ph_dans_cadre(self, bas=-3.25):
        """Celle de div_probleme.py : la question s'efface, les cartes montent sous
        « Question ! », la phrase de réponse se range dessous."""
        cartes = self.cartes_q
        dy = 2.45 - cartes.get_top()[1]
        fam = cartes.get_family()
        coche = [m for m in self.mobjects[-3:] if m not in fam
                 and cartes.get_left()[0] < m.get_center()[0] < cartes.get_right()[0]
                 and cartes.get_bottom()[1] < m.get_center()[1] < cartes.get_top()[1]]
        self.play(*[FadeOut(l) for l in self._lq], cartes.animate.shift(UP * dy),
                  *[c.animate.shift(UP * dy) for c in coche], run_time=0.35)
        ph = self.ph_q
        ph.arrange(DOWN, aligned_edge=LEFT, buff=0.17)
        ph.next_to(cartes, DOWN, buff=0.3).align_to(P(self.XL, 0), LEFT)
        if ph.get_right()[0] > 6.4:
            ph.scale_to_fit_width(6.4 - self.XL).align_to(P(self.XL, 0), LEFT)
        if ph.get_bottom()[1] < bas:
            ph.scale((ph.get_top()[1] - bas) / ph.height, about_edge=UL)

    def echelle_tests(self, n, x, y0, pas=0.66):
        """Les quatre tests d'un nombre : « ÷ 2 », « ÷ 3 », « ÷ 5 », « ÷ 7 » (données de figure)."""
        g = VGroup()
        for k, (d, c) in enumerate(((2, C2), (3, C3), (5, C5), (7, C7))):
            r = RoundedRectangle(width=1.5, height=0.52, corner_radius=0.1, stroke_color=c, stroke_width=3,
                                 fill_color=FOND_CARTE, fill_opacity=1).move_to(P(x, y0 - k * pas))
            g.add(VGroup(r, T(f"÷ {d}", 30, c, audit=False).move_to(r)))
        return g

    def marque_test(self, case, juste):
        """✗ rouge (ne tombe pas juste) ou ✓ verte (tombe juste) à droite d'un test."""
        o = case.get_right() + RIGHT * 0.38
        if juste:
            k = VMobject(stroke_color=PIEGE, stroke_width=7)
            k.set_points_as_corners([P(-0.18, 0), P(-0.05, -0.14), P(0.2, 0.16)])
            return k.move_to(o)
        t = 0.14
        return VGroup(Line(o + P(-t, t), o + P(t, -t)), Line(o + P(-t, -t), o + P(t, t))).set_stroke("#94a3b8", 6)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Trouver les nombres premiers", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Trouver", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        cg = cigale(2.6).move_to(P(-4.4, 0.25))
        l0 = self.lg("jusqu'à 100.", 2.0, 0.95, 46, CIEL, maxw=8)
        self.dit(l0, "jusqu'à 100.", avec=[FadeIn(cg, scale=0.6)])
        l1 = self.lg("Quels tests", 2.0, 0.1, 48, maxw=8)
        self.dit(l1, "Quels tests")
        l2 = self.lg("faut-il faire ?", 2.0, -0.75, 54, JAUNE_TITRE, maxw=8)
        self.dit(l2, "faut-il faire ?")
        self.insister(l2, 1.15, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : les cigales de Salomé ──────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        p = salome_entomologiste().move_to(P(-5.85, 2.3))
        sol = Rectangle(width=4.7, height=2.45, fill_color=TERRE, fill_opacity=1, stroke_width=0).move_to(P(-3.05, -1.78))
        herbe = Rectangle(width=4.7, height=0.14, fill_color=HERBE, fill_opacity=1, stroke_width=0).move_to(P(-3.05, -0.55))
        rng = np.random.default_rng(9)
        pos13 = [P(-4.55 + rng.uniform(-0.7, 0.7), -1.25 - k * 0.38) for k in range(4)]
        pos17 = [P(-1.75 + rng.uniform(-0.7, 0.7), -1.25 - k * 0.38) for k in range(4)]
        larves = VGroup(*[cigale(0.62, adulte=False).rotate(rng.uniform(-0.6, 0.6)).move_to(q) for q in pos13 + pos17])
        sep = DashedLine(P(-3.05, -0.7), P(-3.05, -2.95), color="#d6a46b", stroke_width=2)
        lab13 = T("13 ans", 28, JAUNE_TITRE, audit=False).move_to(P(-4.55, -2.78))
        lab17 = T("17 ans", 28, JAUNE_TITRE, audit=False).move_to(P(-1.75, -2.78))
        self.dit(self.lg("Salomé est entomologiste :", 3.2, 3.15, 40, CIEL, maxw=5.9), "Salomé est entomologiste :",
                 avec=[FadeIn(p, shift=UP * 0.3)])
        self.dit(self.lg("elle étudie les insectes.", 3.2, 2.5, 34), "elle étudie les insectes.")
        self.dit(self.lg("En Amérique du Nord,", 3.2, 1.75, 34), "En Amérique du Nord,", avec=[FadeIn(sol), FadeIn(herbe)])
        self.dit(self.lg("certaines cigales restent", 3.2, 1.08, 34), "certaines cigales restent",
                 avec=[LaggedStart(*[FadeIn(l, scale=0.5) for l in larves], lag_ratio=0.1)])
        e = self.lg("sous terre 13 ans, ou 17 ans,", 3.2, 0.41, 34)
        self.poser_avec(e, "sous terre 13 ans, ou 17 ans,",
                        {self.index(e, "13"): lambda: [FadeIn(lab13, scale=1.3), Create(sep)],
                         self.index(e, "17"): lambda: [FadeIn(lab17, scale=1.3)]})
        self.dit(self.lg("puis sortent toutes ensemble.", 3.2, -0.26, 34), "puis sortent toutes ensemble.")
        vol = [P(-4.9 + 0.55 * k, 0.15 + 0.55 * ((k * 5) % 3)) for k in range(8)]
        self.play(*[Transform(l, cigale(0.8).rotate(0.25 * ((k % 3) - 1)).move_to(q)) for k, (l, q) in enumerate(zip(larves, vol))],
                  run_time=1.0)
        l1 = self.lg("13 et 17 :", 3.0, -0.95, 46, JAUNE_TITRE)
        self.dit(l1, "13 et 17 :", avec=[Indicate(lab13, color=JAUNE_TITRE), Indicate(lab17, color=JAUNE_TITRE)])
        l2 = self.lg("deux nombres", 3.0, -1.6, 44, JAUNE_TITRE)
        self.dit(l2, "deux nombres")
        l3 = self.lg("premiers.", 3.0, -2.25, 44, JAUNE_TITRE)
        self.dit(l3, "premiers.")
        self.insister(VGroup(l1, l2, l3), 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 02 : pourquoi 13 et 17 ──────────────────────────────────────────────
    def ecran_pourquoi(self):
        self.ecran("02-pourquoi")
        y0, x0, u = -0.05, -5.55, 0.62
        X = lambda v: x0 + v * u  # noqa: E731
        axe = Arrow(P(x0 - 0.15, y0), P(X(18.6), y0), buff=0, color="#cbd5e1", stroke_width=4, max_tip_length_to_length_ratio=0.02)
        tics = VGroup(*[Line(P(X(v), y0 - 0.09), P(X(v), y0 + 0.09), color="#cbd5e1", stroke_width=2) for v in range(19)])
        labs = VGroup(*[T(str(v), 24, "#cbd5e1", audit=False).move_to(P(X(v), y0 - 0.33)) for v in range(19)])
        ans = T("ans", 24, "#94a3b8", audit=False).move_to(P(X(18.55), y0 + 0.32))
        rangs = {}
        for d, c, h in ((2, C2, 0.5), (3, C3, 0.92), (4, C5, 1.34)):
            pts = VGroup(*[Dot(P(X(v), y0 + h), radius=0.1, color=c) for v in range(d, 19, d)])
            lab = T(str(d), 30, c, audit=False).move_to(P(X(0), y0 + h))
            rangs[d] = (pts, lab)
        e1 = self.lg("Un prédateur qui revient tous les 2, 3 ou 4 ans", 0, 3.15, 38, maxw=12.4)
        self.play(GrowArrow(axe), FadeIn(tics), FadeIn(labs), FadeIn(ans), run_time=0.4)
        ges = {}
        for d in (2, 3, 4):
            pts, lab = rangs[d]
            ges[self.index(e1, str(d))] = (lambda pts=pts, lab=lab: [FadeIn(lab, scale=1.3),
                                                                      LaggedStart(*[FadeIn(q, scale=0.4) for q in pts], lag_ratio=0.1)])
        self.poser_avec(e1, "Un prédateur qui revient tous les 2, 3 ou 4 ans", ges)
        self.dit(self.lg("les croise rarement :", 0, 2.5, 38), "les croise rarement :")
        bandes = {v: DashedLine(P(X(v), y0 + 0.2), P(X(v), y0 + 1.6), color=VERT_OK, stroke_width=3) for v in (13, 17)}
        cig = {v: cigale(0.9).move_to(P(X(v), y0 - 0.95)) for v in (13, 17)}
        e2 = self.lg("13 et 17 n'ont aucun diviseur,", -0.6, -1.65, 40, VERT_OK, maxw=10)
        self.poser_avec(e2, "13 et 17 n'ont aucun diviseur,",
                        {self.index(e2, "13"): lambda: [Create(bandes[13]), FadeIn(cig[13], scale=0.5)],
                         self.index(e2, "17"): lambda: [Create(bandes[17]), FadeIn(cig[17], scale=0.5)]})
        self.dit(self.lg("à part 1 et eux-mêmes.", -0.6, -2.25, 38, VERT_OK, maxw=10), "à part 1 et eux-mêmes.")
        q = self.lg("Mais 59, 77 ou 91 : premiers, ou pas ?", -0.6, -3.0, 42, JAUNE_TITRE, maxw=10.2)
        self.dit(q, "Mais 59, 77 ou 91 : premiers, ou pas ?")
        self.insister(q, 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 03 : le crible d'Ératosthène ────────────────────────────────────────
    def ecran_crible(self):
        self.ecran("03-crible")
        cr = Crible(0.5, centre=P(-3.6, -0.4))
        self.dit(self.lg("La méthode d'Ératosthène, un savant grec :", 0, 3.2, 40, JAUNE_TITRE, maxw=12.4),
                 "La méthode d'Ératosthène, un savant grec :")
        self.dit(self.lg("on écrit les nombres", 3.2, 2.2, 38), "on écrit les nombres")
        self.play(LaggedStart(*[FadeIn(VGroup(cr.case[n], cr.num[n]), scale=0.6) for n in range(2, 101)], lag_ratio=0.02),
                  run_time=0.3)
        self.dit(self.lg("de 2 à 100.", 3.2, 1.6, 40), "de 2 à 100.",
                 avec=[Indicate(cr.num[2], color=JAUNE_TITRE), Indicate(cr.num[100], color=JAUNE_TITRE)])
        r2 = cr.rond(2, C2)
        self.dit(self.lg("On garde 2,", 3.2, 0.7, 40, C2), "On garde 2,", avec=[Create(r2), cr.num[2].animate.set_color(C2)])
        self.dit(self.lg("et on barre ses multiples.", 3.2, 0.1, 36), "et on barre ses multiples.")
        self.play(LaggedStart(*[AnimationGroup(*cr.barrer(n, C2)) for n in cr.multiples(2)], lag_ratio=0.03), run_time=1.2)
        r3 = cr.rond(3, C3)
        self.dit(self.lg("Puis on garde 3,", 3.2, -0.8, 40, C3), "Puis on garde 3,", avec=[Create(r3), cr.num[3].animate.set_color(C3)])
        self.dit(self.lg("et on barre les siens.", 3.2, -1.4, 36), "et on barre les siens.")
        self.play(LaggedStart(*[AnimationGroup(*cr.barrer(n, C3)) for n in cr.multiples(3)], lag_ratio=0.05), run_time=0.9)
        self.dit(self.lg("Puis 5,", 2.2, -2.3, 40, C5), "Puis 5,")
        self.play(Create(cr.rond(5, C5)), cr.num[5].animate.set_color(C5),
                  LaggedStart(*[AnimationGroup(*cr.barrer(n, C5)) for n in cr.multiples(5)], lag_ratio=0.1), run_time=0.5)
        self.dit(self.lg("puis 7.", 4.0, -2.3, 40, C7), "puis 7.")
        self.play(Create(cr.rond(7, C7)), cr.num[7].animate.set_color(C7),
                  LaggedStart(*[AnimationGroup(*cr.barrer(n, C7)) for n in cr.multiples(7)], lag_ratio=0.15), run_time=0.6)
        self.attendre_voix(marge=0.8)

    # ── 04 : on s'arrête à 7 ────────────────────────────────────────────────
    def ecran_stop(self):
        self.ecran("04-stop")
        cr = Crible(0.5, centre=P(-3.6, -0.4))
        ronds = VGroup()
        for p, c in ((2, C2), (3, C3), (5, C5), (7, C7)):
            cr.num[p].set_color(c)
            ronds.add(cr.rond(p, c))
            for n in cr.multiples(p):
                cr.barrer_net(n, c)
        self.add(cr, ronds)
        l1 = self.lg("Et on s'arrête à 7.", 3.2, 3.0, 42, C7)
        self.dit(l1, "Et on s'arrête à 7.", avec=[Indicate(cr.num[7], color=C7, scale_factor=1.5)])
        self.dit(self.lg("Car 11 × 11 = 121 :", 3.2, 2.1, 44), "Car 11 fois 11 égale 121 :",
                 avec=[Indicate(cr.num[11], color=JAUNE_TITRE, scale_factor=1.6)])
        l3 = self.lg("ça dépasse 100.", 3.2, 1.4, 40, PIEGE)
        self.dit(l3, "ça dépasse 100.", avec=[Indicate(cr.num[100], color=PIEGE, scale_factor=1.5)])
        self.dit(self.lg("Tout ce qui n'est pas barré", 3.2, 0.3, 38), "Tout ce qui n'est pas barré")
        self.dit(self.lg("est premier.", 3.2, -0.3, 42, VERT_OK), "est premier.")
        self.play(LaggedStart(*[cr.case[n].animate.set_fill(VERT_OK, 0.45) for n in PREMIERS], lag_ratio=0.03), run_time=0.8)
        fin = self.lg("Il en reste 25.", 3.2, -1.45, 52, JAUNE_TITRE)
        self.dit(fin, "Il en reste 25.")
        self.insister(fin, 1.15, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 04q : QUESTION 1 ────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = -2.2
        self._lq = []
        carte = carte_nombre(59, CIEL, w=2.0, h=1.15, fs=66).move_to(P(-4.6, 2.0))
        tests = self.echelle_tests(59, -4.95, 0.75)

        def avant(sc):
            ref = sc.q_q[0]
            e = Eq("Pour savoir si 59 est premier,", 34, lettres="")
            e.scale_to_fit_height(ref.height).move_to(ref)
            sc.q_q.remove(ref)
            sc.dire_eq(e, "Pour savoir si 59 est premier,", avec=[FadeIn(carte, scale=0.6)])
            sc._lq.append(e)
            sc.eq_dans_q(0, "quels nombres faut-il tester ?", "quels nombres faut-il tester ?", lettres="")

        def apres(sc):
            sc.ph_dans_cadre()
            sc.ph_eq(0, "Réponse A : 2, 3, 5 et 7.", "Réponse A : 2, 3, 5 et 7.", premier=True,
                     avec=[LaggedStart(*[FadeIn(t, shift=RIGHT * 0.2) for t in tests], lag_ratio=0.15)])
            sc.ph_eq(1, "59 est impair. 5 + 9 = 14.", "59 est impair. 5 plus 9 égale 14.",
                     avec=[Create(sc.marque_test(tests[0], False))])
            sc.play(Create(sc.marque_test(tests[1], False)), run_time=0.2)
            sc.ph_eq(2, "Il ne finit ni par 0 ni par 5.", "Il ne finit ni par 0 ni par 5.",
                     avec=[Create(sc.marque_test(tests[2], False))])
            sc.ph_eq(3, "Et 59 ÷ 7 laisse 3.", "Et 59 divisé par 7 laisse 3.", avec=[Create(sc.marque_test(tests[3], False))])
            sc.ph_eq(4, "59 est premier.", "59 est premier.",
                     avec=[carte[0].animate.set_stroke(VERT_OK, 6), carte[1].animate.set_color(VERT_OK)])
            sc.rep_fini()

        self.question_pause("04q-question", "04r-reponse", ["Pour savoir si 59 est premier,", "quels nombres faut-il tester ?"],
                            [E("2, 3, 5 et 7", 40, lettres=""), E("tous les nombres jusqu'à 59", 40, lettres=""),
                             E("seulement 2", 40, lettres="")], 0,
                            ["Réponse A : 2, 3, 5 et 7.", "59 est impair. 5 + 9 = 14.", "Il ne finit ni par 0 ni par 5.",
                             "Et 59 ÷ 7 laisse 3.", "59 est premier."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 05 : le piège de 91 ─────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        self.dit(self.lg("Le piège : s'arrêter trop tôt.", 0, 3.2, 44, PIEGE, maxw=11.5), "Le piège : s'arrêter trop tôt.")
        carte = carte_nombre(91, WHITE, w=1.7, h=0.95, fs=56).move_to(P(-4.85, 2.05))
        tests = self.echelle_tests(91, -5.2, 1.0, pas=0.62)
        self.dit(self.lg("91 est impair.", 2.4, 2.2, 38), "91 est impair.",
                 avec=[FadeIn(carte, scale=0.6), FadeIn(tests[0], shift=RIGHT * 0.2)])
        self.play(Create(self.marque_test(tests[0], False)), run_time=0.2)
        self.dit(self.lg("9 + 1 = 10 :", 2.4, 1.55, 40), "9 plus 1 égale 10 :", avec=[FadeIn(tests[1], shift=RIGHT * 0.2)])
        self.dit(self.lg("pas divisible par 3.", 2.4, 0.95, 38), "pas divisible par 3.",
                 avec=[Create(self.marque_test(tests[1], False))])
        self.dit(self.lg("Il ne finit pas par 5.", 2.4, 0.3, 38), "Il ne finit pas par 5.", avec=[FadeIn(tests[2], shift=RIGHT * 0.2)])
        self.play(Create(self.marque_test(tests[2], False)), run_time=0.2)
        cr = self.lg("On croit qu'il est premier…", 2.6, -0.4, 40, CIEL, maxw=6.6)
        susp = cr.atomes[-1]
        self.dit(cr, "On croit qu'il est premier")
        self.play(FadeIn(susp), run_time=0.15)
        e = self.lg("mais 91 ÷ 7 = 13.", 2.4, -1.25, 46, JAUNE_TITRE)
        self.dit(e, "mais 91 divisé par 7 égale 13.", avec=[FadeIn(tests[3], shift=RIGHT * 0.2)])
        self.play(Create(self.marque_test(tests[3], True)), Indicate(tests[3], color=PIEGE), run_time=0.4)
        grille = VGroup(*[Dot(P(-5.3 + j * 0.2, -1.75 - i * 0.19), radius=0.065, color=C7 if i == 0 else "#cbd5e1")
                          for i in range(7) for j in range(13)])
        f1 = self.lg("91 = 7 × 13 :", 1.8, -2.05, 48, PIEGE, maxw=6)
        self.dit(f1, "91 égale 7 fois 13 :",
                 avec=[LaggedStart(*[FadeIn(d, scale=0.4) for d in grille], lag_ratio=0.005),
                       carte[0].animate.set_stroke(PIEGE, 6), carte[1].animate.set_color(PIEGE)])
        f2 = self.lg("pas premier !", 1.8, -2.78, 48, PIEGE, maxw=6)
        self.dit(f2, "pas premier !")
        self.insister(VGroup(f1, f2), 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 05q : QUESTION 2 ────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = -2.2
        self._lq = []
        carte = carte_nombre(77, CIEL, w=2.0, h=1.15, fs=66).move_to(P(-4.6, 1.5))
        grille = VGroup(*[Dot(P(-5.6 + j * 0.2, -0.2 - i * 0.2), radius=0.07, color=C7 if i == 0 else "#cbd5e1")
                          for i in range(7) for j in range(11)])

        def avant(sc):
            ref = sc.q_q[0]
            e = Eq("77 est-il premier ?", 34, lettres="")
            e.scale_to_fit_height(ref.height).move_to(ref)
            sc.q_q.remove(ref)
            sc.dire_eq(e, "77 est-il premier ?", avec=[FadeIn(carte, scale=0.6)])
            sc._lq.append(e)

        def apres(sc):
            sc.ph_eq(0, "Réponse B : non.", "Réponse B : non.", premier=True,
                     avec=[carte[0].animate.set_stroke(PIEGE, 6), carte[1].animate.set_color(PIEGE)])
            sc.ph_eq(1, "77 ÷ 7 = 11.", "77 divisé par 7 égale 11.",
                     avec=[LaggedStart(*[FadeIn(d, scale=0.4) for d in grille], lag_ratio=0.005)])
            sc.ph_eq(2, "Le test par 7 le démasque.", "Le test par 7 le démasque.")
            sc.rep_fini()

        self.question_pause("05q-question", "05r-reponse", ["77 est-il premier ?"],
                            [E("oui, il est impair", 40, lettres=""), E("non, 77 = 7 × 11", 40, lettres=""),
                             E("oui, 7 + 7 = 14", 40, lettres="")], 1,
                            ["Réponse B : non.", "77 ÷ 7 = 11.", "Le test par 7 le démasque."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 06 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("06-defi")
        tit = T("À toi de jouer !", 56, JAUNE_TITRE).move_to(P(0, 3.0))
        self.au("À toi", Write(tit), rt=0.5)
        p = salome_entomologiste().move_to(P(-5.7, 0.7))
        carnet = RoundedRectangle(width=3.2, height=3.0, corner_radius=0.12, fill_color="#fef3c7", fill_opacity=1,
                                  stroke_color="#b45309", stroke_width=4).move_to(P(-2.65, 0.55))
        spirale = VGroup(*[Circle(radius=0.07, color="#78350f", stroke_width=3).move_to(carnet.get_top() + P(-1.2 + 0.4 * k, 0))
                           for k in range(7)])
        nums = [T(s, 60, "#1e293b", audit=False, gras=True).move_to(carnet.get_center() + P(0, 0.85 - 0.85 * k))
                for k, s in enumerate(("49", "83", "87"))]
        self.dit(self.lg("Salomé note trois nombres :", 3.2, 1.75, 38, maxw=5.8), "Salomé note trois nombres :",
                 avec=[FadeIn(p), FadeIn(carnet), FadeIn(spirale)])
        e = self.lg("49, 83 et 87.", 3.2, 1.0, 52, JAUNE_TITRE)
        self.poser_avec(e, "49, 83 et 87.", {self.index(e, s): (lambda m=m: [FadeIn(m, scale=1.4)])
                                            for s, m in zip(("49", "83", "87"), nums)})
        q = self.lg("Lesquels sont premiers ?", 3.2, 0.0, 44, JAUNE_TITRE, maxw=5.8)
        self.dit(q, "Lesquels sont premiers ?")
        self.insister(q, 1.1, 0.2)
        pz = T("Mets pause, et cherche !", 50, ORANGE_RETENUE).move_to(P(-0.4, -2.05))
        self.au("Mets pause", Write(pz), rt=0.5)
        self.attendre_voix(marge=2.0)

    # ── 06b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        self.ecran("06b-correction")
        self.au("Correction", FadeIn(T("Correction", 46, JAUNE_TITRE).move_to(P(0, 3.2))), rt=0.25)
        XG = -4.0
        c49 = carte_nombre(49, WHITE, w=1.35, h=0.8, fs=46).move_to(P(-5.3, 2.15))
        c87 = carte_nombre(87, WHITE, w=1.35, h=0.8, fs=46).move_to(P(-5.3, 0.45))
        c83 = carte_nombre(83, WHITE, w=1.35, h=0.8, fs=46).move_to(P(-5.3, -1.6))
        self.play(FadeIn(c49), FadeIn(c87), FadeIn(c83), run_time=0.3)

        def ligne(s, y, c=WHITE, fs=40):
            return self.lg(s, 0, y, fs, c, maxw=10.2).align_to(P(XG, 0), LEFT)

        self.dit(ligne("49 = 7 × 7 : pas premier.", 2.15), "49 égale 7 fois 7 : pas premier.")
        self.play(Create(tampon_croix(c49[0])), c49[0].animate.set_stroke(PIEGE), run_time=0.25)
        self.dit(ligne("87 : 8 + 7 = 15, divisible par 3 ;", 0.78), "87 : 8 plus 7 égale 15, divisible par 3 ;")
        self.dit(ligne("87 = 3 × 29, pas premier.", 0.12), "87 égale 3 fois 29, pas premier.")
        self.play(Create(tampon_croix(c87[0])), c87[0].animate.set_stroke(PIEGE), run_time=0.25)
        self.dit(ligne("83 : ni 2, ni 3, ni 5, ni 7 ne le divisent.", -1.28, fs=38), "83 : ni 2, ni 3, ni 5, ni 7 ne le divisent.")
        ok = ligne("83 est premier.", -2.05, VERT_OK, 46)
        self.dit(ok, "83 est premier.", avec=[c83[0].animate.set_stroke(VERT_OK), c83[1].animate.set_color(VERT_OK)])
        self.play(Create(self.cadre_ok(ok, 0.16)), Create(tampon_coche(c83[0])), run_time=0.25)
        self.attendre_voix(marge=1.0)

    # ── 07 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("07-finale", 0.5)
        self.XL = -1.5
        fig = VGroup(cigale(1.7), F("91 = 7 × 13", 40).sans_audit())
        fig[1].next_to(fig[0], DOWN, buff=0.35)
        lignes = self.finale_colonne([["Pour un nombre inférieur à 100,", "on teste 2, 3, 5 et 7."],
                                      ["Une seule division juste suffit :", "il n'est pas premier."],
                                      ["N'oublie jamais le test par 7."]], fs=40, figure=fig)
        self.XL = type(self).XL
        self.play(FadeIn(fig), run_time=0.25)
        for lg in lignes:
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_pourquoi()
        self.ecran_crible()
        self.ecran_stop()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("08-abonne")
