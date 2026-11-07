# relatif_soustraction.py
# EleveAI — Maths 4e — série « Relatifs », épisode 02 : SOUSTRAIRE.
# Paysage 16:9, AVEC VOIX, ceinture ORANGE. Micro : relatif_soustraction.
# Décor et métier : Mathis, météorologue. Centre : meteo-climat.
# Écrans (micro relatif_soustraction partout) : garde (00) ; la carte météo (01) ; le thermomètre (02) ;
# le calcul (03) ; la règle (04) ; les deux moins (05) ; QUESTION 1 (05q) ; la baisse (06) ; le piège (07) ;
# QUESTION 2 (07q) ; défi (08) et correction (08b) ; ce que tu as appris (09) ; fin (10).
# Voix : manim/voix/4e-relatif-soustraction.json ; marques : relatif_soustraction_marques.json.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/relatif_soustraction.py RelatifSoustraction4e
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/relatif_soustraction.py RelatifSoustraction4e -o eleveai-maths-4e-relatif-soustraction --media_dir manim/scripts/4e/media-rel-02
# Sortie : manim/sorties/4e/maths/relatifs/02-soustraction/eleveai-maths-4e-relatif-soustraction.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))

from relatif_commun import *  # noqa: E402,F403

MER = "#0c4a6e"
TERRE = "#3f6212"
SOLEIL = "#fbbf24"


def Fr(s, fs=56, c=WHITE, audit=True):
    """Une formule ou une phrase : tout nombre négatif est orange, où qu'il soit dans la ligne."""
    e = E(s, fs, c, lettres="", audit=audit)
    a = e.atomes
    for i, x in enumerate(a):
        if x.original_text == "−" and i + 1 < len(a) and (i == 0 or not (a[i - 1].original_text.isdigit() or a[i - 1].original_text == ")")):
            x.set_color(NEG)
            a[i + 1].set_color(NEG)
    return e


def lr(s, x, y, fs=36, c=WHITE, maxw=None):
    """Une ligne de Fr, posée en (x, y), bornée à maxw."""
    e = Fr(s, fs, c)
    if maxw and e.width > maxw:
        e.scale_to_fit_width(maxw)
    return e.move_to(P(x, y))


def ix(e, mot, n=1):
    """L'indice du n-ième atome `mot` de la ligne e."""
    k = [i for i, a in enumerate(e.atomes) if a.original_text == mot]
    return k[n - 1]


def mathis(s=0.72):
    """Mathis : le gilet du météorologue et son anémomètre à coupelles."""
    p = personne(peau="#e0ac69", tenue="#0f766e", cheveux="#4b2e14", s=1.0)
    bras = Line(P(0.42, -0.85), P(0.82, -0.95), color="#0f766e", stroke_width=12)
    mat = Line(P(0.82, -1.15), P(0.82, 0.45), color="#cbd5e1", stroke_width=5)
    tige = Line(P(0.47, 0.45), P(1.17, 0.45), color="#cbd5e1", stroke_width=4)
    coupes = VGroup(*[Dot(P(x, 0.45), radius=0.11, color=SOLEIL) for x in (0.47, 1.17)], Dot(P(0.82, 0.45), radius=0.07, color=WHITE))
    badge = Circle(radius=0.11, fill_color=SOLEIL, fill_opacity=1, stroke_width=0).move_to(P(-0.22, -0.85))
    return VGroup(p, mat, tige, coupes, bras, badge).scale(s)


class Thermometre(VGroup):
    """Le grand thermomètre vertical : .y(v) l'ordonnée de la graduation v, .lab[v] son étiquette.
    Le mercure bouge SANS bloquer les mots : .vers(v) le met en route, il continue pendant que
    la voix avance (orange sous zéro, bleu ciel au-dessus). .seg(u, v, c) : le segment d'un écart,
    .accolade(u, v) : l'accolade de l'écart total."""

    def __init__(self, a, b, x, y_bas, y_haut, fs=28, v=0, ecrit=1, **kw):
        super().__init__(**kw)
        self.a, self.b, self.tx, self.y0, self.y1 = a, b, x, y_bas, y_haut
        self.yb = y_bas - 0.42
        haut = y_haut + 0.24
        self.tube = RoundedRectangle(corner_radius=0.15, width=0.32, height=haut - self.yb, fill_color="#1e293b", fill_opacity=1,
                                     stroke_color=WHITE, stroke_width=3).move_to(P(x, (haut + self.yb) / 2))
        self.bulbe = Circle(radius=0.3, fill_color=POS, fill_opacity=1, stroke_color=WHITE, stroke_width=3).move_to(P(x, self.yb))
        self.col = Rectangle(width=0.18, height=1, fill_color=POS, fill_opacity=1, stroke_width=0)
        self.add(self.tube, self.col, self.bulbe)
        self.lab = {}
        for g in range(a, b + 1):
            zero = g == 0
            self.add(Line(P(x - (0.42 if zero else 0.28), self.y(g)), P(x + (0.42 if zero else -0.16), self.y(g)),
                          color=WHITE, stroke_width=4 if zero else 3))
            if g % ecrit == 0:
                t = T(str(g).replace("-", "−"), fs, NEG if g < 0 else WHITE, audit=False)
                t.next_to(P(x - 0.42, self.y(g)), LEFT, buff=0.1)
                self.lab[g] = t
                self.add(t)
        self.v, self.cible, self.vit, self._maj = v, v, 5.0, None
        self._regler()

    def y(self, v):
        return self.y0 + (v - self.a) * (self.y1 - self.y0) / (self.b - self.a)

    def _regler(self):
        c = NEG if self.v < 0 else POS
        yv = self.y(self.v)
        self.col.stretch_to_fit_height(yv - self.yb)
        self.col.move_to(P(self.tx, (yv + self.yb) / 2))
        self.col.set_fill(c, 1)
        self.bulbe.set_fill(c, 1)

    def vers(self, v, vitesse=5.0):
        """Le mercure part vers v (en degrés par seconde), sans retenir la phrase."""
        self.cible, self.vit = v, vitesse
        if self._maj is None:
            def maj(m, dt):
                d = self.cible - self.v
                pas = self.vit * dt
                self.v = self.cible if abs(d) <= pas else self.v + pas * (1 if d > 0 else -1)
                self._regler()
                if self.v == self.cible:
                    m.remove_updater(maj)
                    self._maj = None
            self._maj = maj
            self.col.add_updater(maj)

    def geste(self, v, *autres, vitesse=5.0):
        """Pour poser_avec : le mercure part vers v, avec d'autres animations."""
        def f():
            self.vers(v, vitesse)
            return [a() if callable(a) else a for a in autres]
        return f

    def seg(self, u, v, c, dx=0.52, sw=12):
        return Line(P(self.tx + dx, self.y(u)), P(self.tx + dx, self.y(v)), color=c, stroke_width=sw)

    def accolade(self, u, v, dx=0.82, c=None):
        return BraceBetweenPoints(P(self.tx + dx, self.y(v)), P(self.tx + dx, self.y(u)), direction=RIGHT, color=c or VERT_OK)

    def fleche(self, u, v, c=VERT_OK, dx=0.3, angle=None):
        a = angle if angle is not None else (1.0 if v > u else -1.0)
        return CurvedArrow(P(self.tx + dx, self.y(u)), P(self.tx + dx, self.y(v)), angle=a, color=c, stroke_width=5, tip_length=0.16)


class CarteMeteo(VGroup):
    """La carte météo : l'Atlantique, Montréal à gauche, Lyon à droite.
    .pin_m, .pin_l : les deux villes ; .temp(s, c, pin) : l'étiquette de température, à poser au mot."""

    def __init__(self, w=6.2, h=4.0, centre=ORIGIN, noms=True, fs=30, **kw):
        super().__init__(**kw)
        kx, ky = w / 6.2, h / 3.6
        Q = lambda x, y: P(x * kx, y * ky)  # noqa: E731
        self.fs = fs
        mer = RoundedRectangle(width=w, height=h, corner_radius=0.08, fill_color=MER, fill_opacity=1, stroke_color=POS, stroke_width=4)
        t1 = Polygon(Q(-3.07, 1.77), Q(-1.0, 1.77), Q(-0.72, 1.05), Q(-1.2, 0.55), Q(-1.0, -0.1), Q(-1.6, -0.8), Q(-1.45, -1.77), Q(-3.07, -1.77),
                     fill_color=TERRE, fill_opacity=1, stroke_color="#84cc16", stroke_width=2)
        t2 = Polygon(Q(3.07, 1.77), Q(1.5, 1.77), Q(1.2, 1.1), Q(1.5, 0.7), Q(1.0, 0.25), Q(1.15, -0.4), Q(1.6, -0.7), Q(1.3, -1.77), Q(3.07, -1.77),
                     fill_color=TERRE, fill_opacity=1, stroke_color="#84cc16", stroke_width=2)
        iso = VGroup(*[Arc(radius=r, start_angle=-0.75, angle=1.5, stroke_color="#bae6fd", stroke_width=2, stroke_opacity=0.4).move_arc_center_to(Q(-1.1, -0.3))
                       for r in (1.0 * kx, 1.45 * kx, 1.9 * kx)])
        rayons = VGroup(*[Line(Q(2.45, 1.22) + 0.3 * kx * np.array([np.cos(a), np.sin(a), 0]), Q(2.45, 1.22) + 0.44 * kx * np.array([np.cos(a), np.sin(a), 0]),
                               color=SOLEIL, stroke_width=4) for a in np.arange(0, TAU, TAU / 8)])
        soleil = VGroup(Circle(radius=0.23 * kx, fill_color=SOLEIL, fill_opacity=1, stroke_width=0).move_to(Q(2.45, 1.22)), rayons)
        nuage = VGroup(*[Circle(radius=r * kx, fill_color="#e2e8f0", fill_opacity=1, stroke_width=0).move_to(Q(x, y))
                         for x, y, r in ((-2.7, 1.15, 0.2), (-2.4, 1.27, 0.27), (-2.1, 1.15, 0.2))])
        flocons = VGroup(*[Text("*", font_size=int(36 * kx), color=WHITE).move_to(Q(x, 0.72)) for x in (-2.65, -2.4, -2.15)])
        for f in flocons:
            f.sans_synchro = True
            f._pas_audit = True
        self.pin_m = VGroup(Dot(Q(-1.95, 0.05), radius=0.1, color=WHITE), Circle(radius=0.17, stroke_color=WHITE, stroke_width=3).move_to(Q(-1.95, 0.05)))
        self.pin_l = VGroup(Dot(Q(2.15, -0.1), radius=0.1, color=WHITE), Circle(radius=0.17, stroke_color=WHITE, stroke_width=3).move_to(Q(2.15, -0.1)))
        self.add(mer, t1, t2, iso, soleil, nuage, flocons, self.pin_m, self.pin_l)
        self.nom_m, self.nom_l = None, None
        if noms:
            self.nom_m = T("Montréal", fs, WHITE, audit=False, gras=True).next_to(self.pin_m, UP, buff=0.1)
            self.nom_l = T("Lyon", fs, WHITE, audit=False, gras=True).next_to(self.pin_l, UP, buff=0.1)
            self.add(self.nom_m, self.nom_l)
        self.move_to(centre)

    def temp(self, s, c, pin):
        t = T(s, self.fs + 8, c, audit=False, gras=True)
        fond = RoundedRectangle(width=t.width + 0.26, height=t.height + 0.2, corner_radius=0.08, fill_color=FOND_CARTE, fill_opacity=1, stroke_color=c, stroke_width=3)
        return VGroup(fond, t).next_to(pin, DOWN, buff=0.14)


class Montagne(VGroup):
    """La montagne du défi : la neige au sommet, la vallée verte. .sommet, .vallee : les deux lieux."""

    def __init__(self, w=4.4, h=3.8, centre=ORIGIN, **kw):
        super().__init__(**kw)
        cadre = RoundedRectangle(width=w, height=h, corner_radius=0.12, fill_color="#0b2545", fill_opacity=1, stroke_color="#475569", stroke_width=3)
        roche = Polygon(P(-w / 2 + 0.25, -h / 2 + 0.55), P(0.1, h / 2 - 0.75), P(w / 2 - 0.25, -h / 2 + 0.55), fill_color=ROCHE, fill_opacity=1, stroke_width=0)
        k = 0.3
        sx, sy = 0.1, h / 2 - 0.75
        gx, gy = -w / 2 + 0.25, -h / 2 + 0.55
        dx, dy = w / 2 - 0.25, -h / 2 + 0.55
        neige = Polygon(P(sx, sy), P(sx + (gx - sx) * k, sy + (gy - sy) * k), P(sx + (dx - sx) * k, sy + (dy - sy) * k), fill_color=WHITE, fill_opacity=1, stroke_width=0)
        vallee = Rectangle(width=w - 0.1, height=0.5, fill_color=TERRE, fill_opacity=1, stroke_width=0).move_to(P(0, -h / 2 + 0.3))
        self.sommet = Dot(P(sx, sy), radius=0.001, fill_opacity=0)
        self.vallee = Dot(P(-w / 2 + 1.0, -h / 2 + 0.3), radius=0.001, fill_opacity=0)
        self.add(cadre, roche, neige, vallee, self.sommet, self.vallee)
        self.move_to(centre)


class RelatifSoustraction4e(PaysageRel):
    nom_voix = "4e-relatif-soustraction"
    fichier_marques = "relatif_soustraction_marques.json"
    ceinture = "orange"

    # ── outils de l'épisode ─────────────────────────────────────────────────
    def _disposer_q(self, question, choix, phrase):
        """Les cartes se resserrent pour laisser leur place aux lignes de réponse."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        cartes.scale(0.82, about_point=cartes.get_corner(UL))
        pause.next_to(cartes, DOWN, buff=0.2).align_to(P(self.XL, 0), LEFT)
        ph.scale_to_fit_width(5.2)
        ph.arrange(DOWN, aligned_edge=LEFT, buff=0.1)
        ph.next_to(cartes, DOWN, buff=0.14).align_to(P(self.XL, 0), LEFT)
        return tete, q, cartes, pause, rebours, ph

    def eq_q(self, s, phrase):
        """Dans avant_q : la première ligne restante de la question, en Fr, posée au mot."""
        ref = self.q_q[0]
        e = Fr(s, 34)
        e.scale_to_fit_height(ref.height).move_to(ref)
        self.q_q.remove(ref)
        self.dire_eq(e, phrase)
        return e

    def tags_villes(self, th):
        """Les villes en face de leur température, à gauche des graduations."""
        m = T("Montréal", 26, CIEL, audit=False).next_to(th.lab[-3], LEFT, buff=0.22)
        l = T("Lyon", 26, CIEL, audit=False).next_to(th.lab[5], LEFT, buff=0.22)
        return VGroup(m, l)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Soustraire des nombres relatifs", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Soustraire", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        c = CarteMeteo(w=3.5, h=2.2, centre=P(-4.55, 0.45), noms=False)
        th = Thermometre(-4, 8, -2.1, -1.5, 1.25, fs=24, v=-3, ecrit=4)
        pers = mathis(0.6).move_to(P(-5.75, -1.75))
        l1 = self.lg("Pourquoi enlever un nombre", 2.45, 0.9, 40, maxw=6.9)
        self.dit(l1, "Pourquoi enlever un nombre", avec=[FadeIn(c), FadeIn(th), FadeIn(pers, shift=UP * 0.2)])
        l2 = self.lg("peut-il faire augmenter ?", 2.45, 0.1, 46, JAUNE_TITRE, maxw=6.9)
        self.poser_avec(l2, "peut-il faire augmenter ?", {ix(l2, "augmenter"): th.geste(7, vitesse=9.0)}, rt=0.14)
        self.insister(l2, 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : la carte météo ─────────────────────────────────────────────────
    def ecran_meteo(self):
        self.ecran("01-meteo")
        c = CarteMeteo(w=6.3, h=4.3, centre=P(-3.2, 0.95))
        pers = mathis(0.62).move_to(P(-5.35, -2.2))
        self.dit(lr("Mathis est météorologue.", 3.3, 3.0, 40, CIEL, maxw=6.1), "Mathis est météorologue.", avec=[FadeIn(pers, shift=UP * 0.3)])
        self.dit(lr("Ce matin, il compare", 3.3, 2.25, 36, maxw=6.1), "Ce matin, il compare", avec=[FadeIn(c)])
        self.dit(lr("deux villes.", 3.3, 1.7, 36, maxw=6.1), "deux villes.")
        t5 = c.temp("5°", POS, c.pin_l)
        l = lr("À Lyon, il fait 5 degrés.", 3.3, 0.85, 36, maxw=6.1)
        self.poser_avec(l, "À Lyon, il fait 5 degrés.", {ix(l, "Lyon"): lambda: [Indicate(c.nom_l, color=POS, scale_factor=1.25)], ix(l, "5"): lambda: [FadeIn(t5, scale=1.4)]}, rt=0.2)
        t3 = c.temp("−3°", NEG, c.pin_m)
        l = lr("À Montréal, −3 degrés.", 3.3, 0.25, 36, maxw=6.1)
        self.poser_avec(l, "À Montréal, moins 3 degrés.", {ix(l, "Montréal"): lambda: [Indicate(c.nom_m, color=NEG, scale_factor=1.25)], ix(l, "3"): lambda: [FadeIn(t3, scale=1.4)]}, rt=0.2)
        ac = DoubleArrow(c.pin_m.get_right(), c.pin_l.get_left(), color=JAUNE_TITRE, buff=0.06, stroke_width=6, tip_length=0.2)
        q = T("?", 60, JAUNE_TITRE, audit=False, gras=True).next_to(ac, UP, buff=0.08)
        l = self.lg("Quel est l'écart", 3.3, -0.65, 44, JAUNE_TITRE, maxw=6.1)
        self.poser_avec(l, "Quel est l'écart", {ix(l, "écart"): lambda: [GrowFromCenter(ac), FadeIn(q, scale=0.5)]}, rt=0.25)
        l = self.lg("de température ?", 3.3, -1.35, 44, JAUNE_TITRE, maxw=6.1)
        self.dit(l, "de température ?")
        self.attendre_voix(marge=0.8)

    # ── 02 : le thermomètre ─────────────────────────────────────────────────
    def thermo_02(self, v):
        th = Thermometre(-4, 8, -3.7, -2.8, 3.1, v=v)
        return th, self.tags_villes(th)

    def ecran_thermo(self):
        self.ecran("02-thermometre")
        th, tags = self.thermo_02(-3)
        pers = mathis(0.6).move_to(P(-5.75, -0.35))
        self.play(FadeIn(th), FadeIn(tags), FadeIn(pers), run_time=0.1)
        self.dit(lr("Sur le thermomètre,", 3.0, 2.75, 42, CIEL, maxw=6.4), "Sur le thermomètre,")
        s1 = th.seg(-3, 0, NEG)
        s2 = th.seg(0, 5, POS)
        lab3 = F("3", 36, NEG, audit=False).next_to(s1, RIGHT, buff=0.14)
        lab5 = F("5", 36, POS, audit=False).next_to(s2, RIGHT, buff=0.14)
        l = lr("de −3 à 0, il y a 3 degrés.", 3.0, 1.55, 38, maxw=6.4)
        self.poser_avec(l, "de moins 3 à zéro, il y a 3 degrés.", {ix(l, "3"): lambda: [Indicate(th.lab[-3], color=NEG, scale_factor=1.5)],
                                                                            ix(l, "0"): th.geste(0, lambda: Create(s1), vitesse=4.0),
                                                                            ix(l, "3", 2): lambda: [FadeIn(lab3, scale=1.4)]}, rt=0.2)
        l = lr("De 0 à 5, il y a 5 degrés.", 3.0, 0.6, 38, maxw=6.4)
        self.poser_avec(l, "De zéro à 5, il y a 5 degrés.", {ix(l, "5"): th.geste(5, lambda: Create(s2), vitesse=6.0),
                                                                     ix(l, "5", 2): lambda: [FadeIn(lab5, scale=1.4)]}, rt=0.2)
        ac = th.accolade(-3, 5, dx=1.2)
        lab8 = F("8", 54, VERT_OK, audit=False).next_to(ac, RIGHT, buff=0.14)
        l = lr("En tout, 8 degrés d'écart.", 3.0, -0.9, 44, VERT_OK, maxw=6.4)
        self.poser_avec(l, "En tout, 8 degrés d'écart.", {ix(l, "8"): lambda: [GrowFromCenter(ac), FadeIn(lab8, scale=1.5)]}, rt=0.22)
        self.play(Create(self.cadre_ok(l, 0.16)), run_time=0.2)
        self.attendre_voix(marge=0.8)

    # ── 03 : le calcul ──────────────────────────────────────────────────────
    def ecran_calcul(self):
        self.ecran("03-calcul")
        th, tags = self.thermo_02(5)
        s1, s2 = th.seg(-3, 0, NEG), th.seg(0, 5, POS)
        lab3 = F("3", 36, NEG, audit=False).next_to(s1, RIGHT, buff=0.14)
        lab5 = F("5", 36, POS, audit=False).next_to(s2, RIGHT, buff=0.14)
        self.add(th, tags, s1, s2, lab3, lab5)
        self.dit(lr("Un écart se calcule", 3.0, 3.05, 38, CIEL, maxw=6.4), "Un écart se calcule")
        self.dit(lr("par une soustraction :", 3.0, 2.45, 38, CIEL, maxw=6.4), "par une soustraction :")
        e = F("5 − (−3)", 66).move_to(P(3.0, 1.45))
        self.dire_eq(e, "5 moins, entre parenthèses, moins 3.")
        ac = th.accolade(-3, 5, dx=1.2)
        lab8 = F("8", 54, VERT_OK, audit=False).next_to(ac, RIGHT, buff=0.14)
        l = lr("Et le résultat doit être 8.", 3.0, 0.4, 38, maxw=6.4)
        self.poser_avec(l, "Et le résultat doit être 8.", {ix(l, "8"): lambda: [GrowFromCenter(ac), FadeIn(lab8, scale=1.5)]}, rt=0.22)
        l.atomes[-2].set_color(VERT_OK)
        self.dit(lr("Donc enlever −3,", 3.0, -0.55, 42, maxw=6.4), "Donc enlever moins 3,")
        s3 = s1.copy()
        tag = F("+3", 36, POS, audit=False).move_to(P(th.tx + 0.95, th.y(6.5)))
        cible = th.seg(5, 8, POS)

        def bascule():
            th.vers(8, 3.5)
            return [s1.animate.set_opacity(0.3), lab3.animate.set_opacity(0.3), Transform(s3, cible), FadeIn(tag, shift=UP * 0.3)]

        l = lr("c'est comme ajouter 3.", 3.0, -1.2, 42, JAUNE_TITRE, maxw=6.4)
        self.poser_avec(l, "c'est comme ajouter 3.", {ix(l, "ajouter"): bascule}, rt=0.4)
        self.insister(l, 1.06, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 04 : la règle ───────────────────────────────────────────────────────
    def ecran_regle(self):
        self.ecran("04-regle")
        th = Thermometre(-4, 8, -5.2, -2.8, 3.1, v=5)
        self.add(th)
        xc = 1.3
        self.dit(lr("Voilà la règle :", xc, 3.1, 38, CIEL, maxw=9), "Voilà la règle :")
        r1 = lr("soustraire un nombre,", xc, 2.42, 46, JAUNE_TITRE, maxw=9)
        self.dit(r1, "soustraire un nombre,")
        r2 = lr("c'est ajouter son opposé.", xc, 1.76, 46, JAUNE_TITRE, maxw=9)
        self.dit(r2, "c'est ajouter son opposé.")
        cad = SurroundingRectangle(VGroup(r1, r2), color=JAUNE_TITRE, buff=0.18, stroke_width=4, corner_radius=0.1)
        self.play(Create(cad), run_time=0.2)
        l = lr("L'opposé de −3, c'est 3.", xc, 0.65, 42, maxw=9)
        self.poser_avec(l, "L'opposé de moins 3, c'est 3.", {ix(l, "3"): lambda: [Indicate(th.lab[-3], color=NEG, scale_factor=1.6)],
                                                                  ix(l, "3", 2): lambda: [Create(th.fleche(-3, 3, VERT_OK, dx=0.3, angle=1.0)), Indicate(th.lab[3], color=POS, scale_factor=1.6)]}, rt=0.3)
        l.atomes[-2].set_color(POS)
        e = Fr("5 − (−3) devient 5 + 3", 48).move_to(P(xc, -0.4))
        e.atomes[e.atomes.index(next(a for a in e.atomes if a.original_text == "devient"))].set_color(CIEL)
        e.atomes[-1].set_color(POS)
        ac = th.fleche(5, 8, POS, dx=0.3)
        tag = F("+3", 34, POS, audit=False).next_to(ac, RIGHT, buff=0.06)
        self.poser_avec(e, "5 moins, entre parenthèses, moins 3, devient 5 plus 3.",
                        {len(e.atomes) - 1: th.geste(8, lambda: Create(ac), lambda: FadeIn(tag, scale=1.3), vitesse=4.0)}, rt=0.2)
        r = F("Résultat : 8.", 56, VERT_OK).move_to(P(xc - 0.3, -1.65))
        self.dit(r, "Résultat : 8.")
        self.play(Create(self.cadre_ok(r, 0.18)), Indicate(th.lab[8], color=VERT_OK, scale_factor=1.6), run_time=0.3)
        self.insister(r, 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 05 : les deux moins ─────────────────────────────────────────────────
    def ecran_deux_moins(self):
        self.ecran("05-deux-moins")
        OPE, SIG = JAUNE_TITRE, NEG
        e = F("5 − (−3)", 130).sans_audit().move_to(P(-0.1, 1.45))
        m1, m2 = e.atomes[1], e.atomes[3]
        m1.set_color(OPE)
        self.add(e)
        self.dit(self.lg("Attention, ces deux moins ne disent pas la même chose.", 0, 3.12, 38, CIEL, maxw=12), "Attention, ces deux moins ne disent pas la même chose.")
        fl1 = Arrow(P(-3.3, -0.42), m1.get_bottom() + DOWN * 0.34, color=OPE, buff=0, stroke_width=8, max_tip_length_to_length_ratio=0.16)
        fl2 = Arrow(P(3.0, -0.42), m2.get_bottom() + DOWN * 0.34, color=SIG, buff=0, stroke_width=8, max_tip_length_to_length_ratio=0.16)
        rond1 = Circle(radius=0.56, stroke_color=OPE, stroke_width=5).move_to(m1)
        rond2 = SurroundingRectangle(VGroup(e.atomes[3], e.atomes[4]), color=SIG, buff=0.14, stroke_width=5, corner_radius=0.1)
        l = self.lg("Le premier", -3.3, -0.85, 42, OPE, maxw=5.8)
        self.poser_avec(l, "Le premier", {ix(l, "premier"): lambda: [GrowArrow(fl1), Create(rond1)]}, rt=0.28)
        self.dit(self.lg("est une opération :", -3.3, -1.5, 42, OPE, maxw=5.8), "est une opération :")
        self.dit(self.lg("on soustrait.", -3.3, -2.15, 42, WHITE, maxw=5.8), "on soustrait.")
        l = self.lg("Le second", 2.5, -0.85, 42, SIG, maxw=5.6)
        self.poser_avec(l, "Le second", {ix(l, "second"): lambda: [GrowArrow(fl2), Create(rond2)]}, rt=0.28)
        self.dit(self.lg("est un signe :", 2.5, -1.5, 42, SIG, maxw=5.6), "est un signe :")
        self.dit(lr("celui du nombre −3.", 2.5, -2.15, 42, WHITE, maxw=5.6), "celui du nombre moins 3.")
        self.attendre_voix(marge=0.8)

    # ── 05q : QUESTION 1 ────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.2
        th = Thermometre(-2, 11, -3.3, -2.8, 3.1, fs=26, v=4)

        def avant(sc):
            sc.eq_q("4 − (−6) :", "4 moins, entre parenthèses, moins 6 :")
            sc.play(FadeIn(th), run_time=0.2)
            sc.eq_q("ça revient à quel calcul ?", "ça revient à quel calcul ?")

        def apres(sc):
            ac = th.fleche(4, 10, POS, dx=0.3)
            tag = F("+6", 36, POS, audit=False).next_to(ac, RIGHT, buff=0.08)
            th.vers(10, 3.5)
            sc.play(Create(ac), FadeIn(tag), run_time=0.2)
            sc.ph_eq(0, "Réponse B : 4 + 6, donc 10.", "Réponse B : 4 plus 6, donc 10.", premier=True)
            sc.ph_eq(1, "On ajoute l'opposé de −6.", "On ajoute l'opposé de moins 6.")
            sc.rep_fini()

        self.question_pause("05q-question", "05r-reponse", ["4 − (−6) :", "ça revient à quel calcul ?"],
                            [F("4 − 6", 40), F("4 + 6", 40), F("−4 + 6", 40)], 1,
                            ["Réponse B : 4 + 6, donc 10.", "On ajoute l'opposé de −6."], avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 06 : la baisse ──────────────────────────────────────────────────────
    def ecran_baisse(self):
        self.ecran("06-baisse")
        th = Thermometre(-4, 7, -5.2, -2.8, 3.1, v=0)
        self.add(th)
        xc = 1.3
        self.dit(self.lg("Autre soustraction.", xc, 3.1, 42, JAUNE_TITRE, maxw=9), "Autre soustraction.")
        l = lr("Il fait 6 degrés,", xc, 2.42, 34, maxw=9)
        self.poser_avec(l, "Il fait 6 degrés,", {ix(l, "6"): th.geste(6, vitesse=7.0)}, rt=0.18)
        fl = Arrow(P(th.tx + 0.52, th.y(6) + 0.05), P(th.tx + 0.52, th.y(3.8)), color=NEG, buff=0, stroke_width=7, max_tip_length_to_length_ratio=0.28)
        tag = F("−9", 36, audit=False).next_to(fl, RIGHT, buff=0.1)
        l = lr("et la température baisse de 9 degrés.", xc, 1.92, 34, maxw=9)
        self.poser_avec(l, "et la température baisse de 9 degrés.", {ix(l, "baisse"): lambda: [GrowArrow(fl)], ix(l, "9"): lambda: [FadeIn(tag, scale=1.3)]}, rt=0.18)
        self.dire_eq(F("6 − 9", 48).move_to(P(xc, 1.2)), "6 moins 9.")
        self.dire_eq(Fr("On réécrit : 6 + (−9)", 44).move_to(P(xc, 0.45)), "On réécrit : 6 plus moins 9.", echelle=1.1)
        s1, s2 = th.seg(6, 0, NEG), th.seg(0, -3, NEG)
        lab6 = F("6", 34, NEG, audit=False).next_to(s1, RIGHT, buff=0.14)
        lab3 = F("3", 34, NEG, audit=False).next_to(s2, RIGHT, buff=0.14)
        l = lr("Signes contraires : 9 − 6 = 3.", xc, -0.3, 34, maxw=9)
        self.poser_avec(l, "Signes contraires : 9 moins 6, 3.",
                        {ix(l, "6"): th.geste(0, lambda: FadeOut(fl), lambda: FadeOut(tag), lambda: Create(s1), lambda: FadeIn(lab6), vitesse=8.0),
                         ix(l, "3"): th.geste(-3, lambda: Create(s2), lambda: FadeIn(lab3), vitesse=5.0)}, rt=0.2)
        self.dit(lr("Et 9 est le plus éloigné de zéro,", xc, -0.95, 34, maxw=9), "Et 9 est le plus éloigné de zéro,")
        l = self.lg("avec un signe moins.", xc - 0.3, -1.5, 34, maxw=9)
        j = signe("−", 0.28, 40).next_to(l, RIGHT, buff=0.3)
        self.poser_avec(l, "avec un signe moins.", {ix(l, "moins"): lambda: [FadeIn(j, scale=1.4)]}, rt=0.18)
        r = F("Résultat : −3.", 40, VERT_OK).move_to(P(-1.55, -2.5))
        self.dit(r, "Résultat : moins 3.")
        self.play(Create(self.cadre_ok(r, 0.14)), run_time=0.15)
        l = lr("Il fait −3 degrés.", 3.05, -2.5, 34)
        self.poser_avec(l, "Il fait moins 3 degrés.", {ix(l, "3"): lambda: [Indicate(th.lab[-3], color=NEG, scale_factor=1.6)]}, rt=0.2)
        self.attendre_voix(marge=0.8)

    # ── 07 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        th = Thermometre(-8, 2, -5.2, -2.8, 3.1, v=-4)
        self.add(th)
        xc = 1.3
        self.dit(self.lg("Le piège : changer le signe", xc, 3.1, 42, PIEGE, maxw=9), "Le piège : changer le signe")
        self.dit(self.lg("du premier nombre.", xc, 2.5, 42, PIEGE, maxw=9), "du premier nombre.")
        e1 = Fr("Dans −4 − 3,", 50).move_to(P(-0.7, 1.45))
        e1.atomes[-1].shift(RIGHT * 0.17)  # la virgule ne touche pas le cadre du « − 3 »
        self.dire_eq(e1, "Dans moins 4 moins 3,", echelle=1.1)
        e2 = Fr("−4 + (−3) = −7", 50)
        e2.shift(P(e1.atomes[1].get_left()[0] - e2.atomes[0].get_left()[0], 0.0 - e2.get_center()[1]))
        cad1 = SurroundingRectangle(VGroup(e1.atomes[3], e1.atomes[4]), color=POS, buff=0.1, stroke_width=4, corner_radius=0.08)
        l = self.lg("seul le second", 4.0, 1.75, 34, maxw=4.6)
        self.poser_avec(l, "seul le second", {ix(l, "second"): lambda: [Create(cad1)]}, rt=0.2)
        self.dit(self.lg("nombre change.", 4.0, 1.2, 34, maxw=4.6), "nombre change.")
        s = th.seg(-4, -7, NEG)
        lab = F("3", 34, NEG, audit=False).next_to(s, RIGHT, buff=0.14)
        self.poser_avec(e2, "Moins 4 plus moins 3 : moins 7.", {ix(e2, "7"): th.geste(-7, lambda: Create(s), lambda: FadeIn(lab), vitesse=3.5)}, rt=0.2)
        cad2 = SurroundingRectangle(VGroup(*e2.atomes[2:7]), color=POS, buff=0.1, stroke_width=4, corner_radius=0.08)
        self.play(Create(cad2), run_time=0.15)
        lien = DashedLine(e1.atomes[1].get_bottom() + P(0.32, -0.08), e2.atomes[0].get_top() + P(0.32, 0.08), color=VERT_OK, stroke_width=4)
        cad3 = SurroundingRectangle(VGroup(*e2.atomes[:2]), color=VERT_OK, buff=0.1, stroke_width=4, corner_radius=0.08)
        l = lr("Le −4, lui, ne bouge pas.", xc, -1.35, 44, VERT_OK, maxw=9)
        self.poser_avec(l, "Le moins 4, lui, ne bouge pas.", {ix(l, "4"): lambda: [Create(lien), Create(cad3), Indicate(th.lab[-4], color=VERT_OK, scale_factor=1.6)]}, rt=0.25)
        self.attendre_voix(marge=0.8)

    # ── 07q : QUESTION 2 ────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.2
        th = Thermometre(-4, 5, -3.3, -2.8, 3.1, fs=30, v=-2)

        def avant(sc):
            sc.eq_q("Que vaut −2 − (−5) ?", "Que vaut moins 2 moins, entre parenthèses, moins 5 ?")
            sc.play(FadeIn(th), run_time=0.2)

        def apres(sc):
            ac = th.fleche(-2, 3, POS, dx=0.3)
            tag = F("+5", 36, POS, audit=False).next_to(ac, RIGHT, buff=0.08)
            sc.ph_eq(0, "Réponse B : 3.", "Réponse B : 3.", premier=True)
            sc.ph_eq(1, "On ajoute l'opposé de −5 :", "On ajoute l'opposé de moins 5 :")
            th.vers(3, 3.5)
            sc.play(Create(ac), FadeIn(tag), run_time=0.15)
            sc.ph_eq(2, "−2 + 5 = 3.", "moins 2 plus 5, 3.")
            sc.ph_eq(3, "Le −7, c'est le piège.", "Le moins 7, c'est le piège.", couleur=PIEGE)
            sc.rep_fini()

        self.question_pause("07q-question", "07r-reponse", ["Que vaut −2 − (−5) ?"],
                            [F("−7", 40), F("3", 40), F("7", 40)], 1,
                            ["Réponse B : 3.", "On ajoute l'opposé de −5 :", "−2 + 5 = 3.", "Le −7, c'est le piège."], avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi")
        tit = T("À toi de jouer !", 56, JAUNE_TITRE).move_to(P(0, 3.08))
        self.au("À toi", Write(tit), rt=0.5)
        m = Montagne(w=4.4, h=4.0, centre=P(-4.1, 0.1))
        xc = 2.25
        b7 = Fr("−7°", 36, audit=False).next_to(m.sommet, LEFT, buff=0.32).shift(DOWN * 0.1)
        b4 = Fr("4°", 36, POS, audit=False).next_to(m.vallee, UP, buff=0.42)
        self.dit(self.lg("Au sommet d'une montagne,", xc, 2.15, 36, maxw=7.8), "Au sommet d'une montagne,", avec=[FadeIn(m)])
        l = lr("il fait −7 degrés.", xc, 1.6, 36, maxw=7.8)
        self.poser_avec(l, "il fait moins 7 degrés.", {ix(l, "7"): lambda: [FadeIn(b7, scale=1.4)]}, rt=0.2)
        l = lr("Dans la vallée, 4 degrés.", xc, 1.05, 36, maxw=7.8)
        self.poser_avec(l, "Dans la vallée, 4 degrés.", {ix(l, "4"): lambda: [FadeIn(b4, scale=1.4)]}, rt=0.2)
        self.dit(self.lg("Quel est l'écart ?", xc, 0.35, 44, JAUNE_TITRE, maxw=7.8), "Quel est l'écart ?")
        self.dire_eq(lr("Et combien font −1 − 6 ?", xc, -0.55, 44, JAUNE_TITRE, maxw=7.8), "Et combien font moins 1 moins 6 ?", echelle=1.1)
        pz = T("Mets pause, et cherche !", 44, ORANGE_RETENUE).move_to(P(2.1, -1.75))
        self.au("Mets pause", Write(pz), rt=0.5)
        self.attendre_voix(marge=2.0)

    # ── 08b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        self.ecran("08b-correction")
        self.au("Correction", FadeIn(T("Correction", 46, JAUNE_TITRE).move_to(P(0.9, 3.12))), rt=0.25)
        th = Thermometre(-7, 4, -5.5, -2.8, 3.1, fs=26, v=-7)
        self.play(FadeIn(th), run_time=0.1)
        xa, xb = -0.8, 3.75
        self.dire_eq(F("4 − (−7)", 48).move_to(P(xa, 1.9)), "4 moins, entre parenthèses, moins 7 :", echelle=1.1)
        self.dire_eq(F("4 + 7", 48).move_to(P(xa, 0.85)), "4 plus 7,", echelle=1.1)
        s = th.seg(-7, 4, VERT_OK)
        ac = th.accolade(-7, 4, dx=0.8)
        lab = F("11", 40, VERT_OK, audit=False).next_to(ac, RIGHT, buff=0.1)
        r1 = lr("11 degrés d'écart.", xa, -0.3, 38, VERT_OK, maxw=4.2)
        self.poser_avec(r1, "11 degrés d'écart.", {0: th.geste(4, lambda: Create(s), lambda: GrowFromCenter(ac), lambda: FadeIn(lab, scale=1.4), vitesse=6.0)}, rt=0.22)
        self.play(Create(self.cadre_ok(r1, 0.14)), run_time=0.15)
        self.dire_eq(F("−1 − 6", 48).move_to(P(xb, 1.9)), "Moins 1 moins 6 :", echelle=1.1)
        self.dire_eq(F("−1 + (−6)", 48).move_to(P(xb, 0.85)), "moins 1 plus moins 6,", echelle=1.1)
        r2 = F("−7", 72).move_to(P(xb, -0.3))
        self.dire_eq(r2, "moins 7.", echelle=1.3)
        r2.set_color(VERT_OK)
        self.play(Create(self.cadre_ok(r2, 0.14)), run_time=0.15)
        self.attendre_voix(marge=1.0)

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.5)
        self.XL = -1.5
        th = Thermometre(-4, 8, 0, -2.4, 2.4, fs=28, v=8)
        s1, s2 = th.seg(5, 8, POS), th.seg(0, 5, POS)
        fig = VGroup(th, s1, s2)
        lignes = self.finale_colonne([["Soustraire,", "c'est ajouter l'opposé."],
                                      ["Seul le second nombre", "change de signe."],
                                      ["Ensuite, c'est", "une addition."]], fs=40, figure=fig)
        self.XL = type(self).XL
        self.play(FadeIn(fig), run_time=0.25)
        for lg in lignes:
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_meteo()
        self.ecran_thermo()
        self.ecran_calcul()
        self.ecran_regle()
        self.ecran_deux_moins()
        self.ecran_question1()
        self.ecran_baisse()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
