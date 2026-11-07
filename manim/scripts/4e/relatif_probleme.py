# relatif_probleme.py
# EleveAI — Maths 4e — série « Relatifs », épisode 06 : RÉSOUDRE UN PROBLÈME.
# Paysage 16:9, AVEC VOIX, ceinture VERTE. Micro : relatif_probleme.
# Décor et métier : Clara, guide de haute montagne. Centres : sport, nature-ecologie.
# Écrans (micro relatif_probleme partout) : garde (00) ; le refuge (01) ; traduire (02) ; calculer (03) ;
# répondre (04) ; QUESTION 1 (04q) ; la baisse répétée (05) ; la variation (06) ; QUESTION 2 (06q) ;
# le piège (07) ; défi (08) et correction (08b) ; ce que tu as appris (09) ; fin (10).
# Voix : manim/voix/4e-relatif-probleme.json ; marques : relatif_probleme_marques.json.
#
# L'idée rendue visible : les 3 étapes restent en haut de l'écran et se cochent au fur et à mesure ;
# le thermomètre suit les calculs de température, la montagne en coupe suit ceux d'altitude.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/relatif_probleme.py RelatifProbleme4e
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/relatif_probleme.py RelatifProbleme4e -o eleveai-maths-4e-relatif-probleme --media_dir manim/scripts/4e/media-rel-06
# Sortie : manim/sorties/4e/maths/relatifs/06-probleme/eleveai-maths-4e-relatif-probleme.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))

from relatif_commun import *  # noqa: E402,F403

ROCHE_FONCEE = "#334155"
BOIS = "#92400e"
SOLEIL = "#fde047"


def en_orange(e):
    """Tout nombre négatif de la ligne est orange, grands nombres compris (« −1 900 »)."""
    a = e.atomes
    for i, x in enumerate(a):
        if x.original_text == "−" and i + 1 < len(a) and (i == 0 or not (a[i - 1].original_text.isdigit() or a[i - 1].original_text == ")")):
            x.set_color(NEG)
            a[i + 1].set_color(NEG)
            if i + 2 < len(a) and len(a[i + 2].original_text) == 3 and a[i + 2].original_text.isdigit():
                a[i + 2].set_color(NEG)
    return e


def Fr(s, fs=56, c=WHITE, audit=True):
    return en_orange(E(s, fs, c, lettres="", audit=audit))


def lr(s, x, y, fs=34, c=WHITE, maxw=None):
    """Une ligne posée en (x, y), bornée à maxw."""
    e = Fr(s, fs, c)
    if maxw is None and x > 1:  # la colonne de droite : jamais au bord
        maxw = 2 * (6.35 - x)
    if maxw and e.width > maxw:
        e.scale_to_fit_width(maxw)
    return e.move_to(P(x, y))


def clara(s=0.72, equipee=True):
    """Clara : la veste rouge, le casque, la corde en bandoulière et le piolet de la guide.
    equipee=False : la petite veste bleue d'un jour de beau temps."""
    p = personne(peau="#e0ac69", tenue="#dc2626" if equipee else "#38bdf8", cheveux="#7c2d12", longs=True, s=1.0)
    if not equipee:
        fermeture = Line(p.corps.get_top(), p.corps.get_bottom(), color=WHITE, stroke_width=3)
        return VGroup(p, fermeture).scale(s)
    t = p.tete.get_center()
    casque = AnnularSector(inner_radius=0, outer_radius=0.5, angle=PI, start_angle=0, fill_color="#f59e0b", fill_opacity=1, stroke_width=0).move_to(t + UP * 0.25)
    corde = VGroup(Line(P(-0.42, -0.55), P(0.58, -1.45), color="#fde68a", stroke_width=6), Line(P(-0.5, -0.68), P(0.5, -1.58), color="#fde68a", stroke_width=6))
    manche = Line(P(0.72, -1.9), P(1.0, -0.15), color="#cbd5e1", stroke_width=7)
    tete_pio = VGroup(Line(P(0.68, -0.22), P(1.32, -0.08), color="#e2e8f0", stroke_width=8),
                      Line(P(1.32, -0.08), P(1.42, -0.32), color="#e2e8f0", stroke_width=6))
    return VGroup(manche, tete_pio, p, casque, corde).scale(s)


def cordee(s=0.3):
    """Deux alpinistes encordés, pour la montagne en coupe."""
    a, b = clara(s), personne(peau="#8d5524", tenue="#16a34a", cheveux="#111827", s=s)
    b.next_to(a, LEFT, buff=0.12).align_to(a, DOWN)
    fil = Line(a.get_center(), b.get_center(), color="#fde68a", stroke_width=3)
    return VGroup(fil, a, b)


def refuge(s=1.0):
    """Le refuge : les murs de bois, le toit, la fenêtre allumée, la cheminée qui fume."""
    murs = Rectangle(width=1.5, height=0.85, fill_color=BOIS, fill_opacity=1, stroke_color="#451a03", stroke_width=2)
    toit = Polygon(P(-0.95, 0.42), P(0.95, 0.42), P(0, 1.1), fill_color="#e2e8f0", fill_opacity=1, stroke_color="#64748b", stroke_width=2)
    chem = Rectangle(width=0.2, height=0.5, fill_color="#57534e", fill_opacity=1, stroke_width=0).move_to(P(0.5, 0.95))
    porte = Rectangle(width=0.32, height=0.56, fill_color="#451a03", fill_opacity=1, stroke_width=0).move_to(P(-0.35, -0.145))
    fen = Rectangle(width=0.36, height=0.32, fill_color=SOLEIL, fill_opacity=1, stroke_color="#451a03", stroke_width=2).move_to(P(0.33, 0.03))
    fumee = VGroup(*[Circle(radius=r, fill_color="#cbd5e1", fill_opacity=0.6, stroke_width=0).move_to(P(x, y)) for x, y, r in ((0.52, 1.32, 0.07), (0.6, 1.5, 0.1), (0.72, 1.72, 0.13))])
    return VGroup(fumee, chem, murs, toit, porte, fen).scale(s)


def decor(w=3.7, h=3.4, centre=ORIGIN):
    """Un massif : deux sommets enneigés sur un fond sombre."""
    g, d, b, t = -w / 2, w / 2, -h / 2, h / 2
    fond = Polygon(P(0.05 * w, b), P(0.3 * w, 0.32 * h), P(d, b), fill_color="#1e3a5f", fill_opacity=1, stroke_width=0)
    neige2 = Polygon(P(0.3 * w, 0.32 * h), P(0.22 * w, 0.12 * h), P(0.3 * w, 0.17 * h), P(0.38 * w, 0.12 * h), fill_color=WHITE, fill_opacity=0.85, stroke_width=0)
    avant = Polygon(P(g, b), P(-0.12 * w, t), P(0.34 * w, b), fill_color=ROCHE_FONCEE, fill_opacity=1, stroke_width=0)
    neige = Polygon(P(-0.12 * w, t), P(-0.23 * w, 0.2 * h), P(-0.15 * w, 0.26 * h), P(-0.1 * w, 0.17 * h), P(-0.02 * w, 0.2 * h), fill_color=WHITE, fill_opacity=1, stroke_width=0)
    sol = Rectangle(width=w, height=0.1, fill_color="#94a3b8", fill_opacity=1, stroke_width=0).move_to(P(0, b))
    return VGroup(fond, neige2, avant, neige, sol).move_to(centre)


class Thermometre(VGroup):
    """Le thermomètre vertical, de −10 à 10 : .y(v) ; .aller(v) les animations du mercure ;
    .repere(v) le triangle et la valeur écrite à droite du tube (renvoyé, à poser au mot)."""

    def __init__(self, x=-5.6, y_bas=-2.3, h=4.8, v=None, fs=26, **kw):
        super().__init__(**kw)
        self.xx, self.y_bas, self.h = x, y_bas, h
        self.tube = RoundedRectangle(width=0.36, height=h + 0.5, corner_radius=0.18, stroke_color=WHITE, stroke_width=3, fill_color=FOND_CARTE, fill_opacity=1).move_to(P(x, y_bas + h / 2))
        self.boule = Circle(radius=0.32, stroke_color=WHITE, stroke_width=3, fill_color=self._c(v), fill_opacity=1).move_to(P(x, y_bas - 0.42))
        grad = VGroup()
        for n in range(-10, 11):
            major = n % 5 == 0
            grad.add(Line(P(x - 0.18 - (0.2 if major else 0.09), self.y(n)), P(x - 0.18, self.y(n)), color=WHITE, stroke_width=3 if major else 2))
            if major:
                grad.add(T(str(n).replace("-", "−"), fs, NEG if n < 0 else WHITE, audit=False).move_to(P(x - 0.72, self.y(n))))
        self.grad = grad
        self.mercure = self._m(v if v is not None else -10)
        self.add(self.tube, grad, self.boule, self.mercure)

    def y(self, v):
        return self.y_bas + (v + 10) / 20 * self.h

    def _c(self, v):
        return "#64748b" if v is None else (NEG if v < 0 else POS)

    def _m(self, v):
        bas, haut = self.y_bas - 0.25, self.y(v)
        return Rectangle(width=0.18, height=haut - bas, fill_color=self._c(v), fill_opacity=1, stroke_width=0).move_to(P(self.xx, (haut + bas) / 2))

    def aller(self, v):
        return [Transform(self.mercure, self._m(v)), self.boule.animate.set_fill(self._c(v), 1)]

    def repere(self, v, fs=30):
        tri = Triangle(fill_color=JAUNE_TITRE, fill_opacity=1, stroke_width=0).scale(0.09).rotate(PI / 2).move_to(P(self.xx + 0.3, self.y(v)))
        s = (str(v).replace("-", "−")) + " °C"
        t = T(s, fs, NEG if v < 0 else POS, audit=False, gras=True).next_to(tri, RIGHT, buff=0.08)
        return VGroup(tri, t)


class Montagne(VGroup):
    """La montagne en coupe, l'échelle d'altitude à sa gauche : .y(alt), .pied(alt) le point de la
    pente à cette altitude, .lab(alt) son étiquette (renvoyée, à poser au mot), .fleche(u, v, x)."""

    def __init__(self, a=1200, b=3100, x0=-4.7, y0=-2.3, y1=1.9, pied_x=0.85, sommet_x=2.9, fin_x=4.2, pas=100, **kw):
        super().__init__(**kw)
        self.a, self.b, self.x0, self.y0, self.y1 = a, b, x0, y0, y1
        self.pied_x, self.sommet_x = x0 + pied_x, x0 + sommet_x
        fond = y0 - 0.35
        d = x0 + fin_x
        self.corps = Polygon(P(x0, fond), P(x0, y0), P(self.pied_x, y0), P(self.sommet_x, y1), P(d, y0), P(d, fond),
                             fill_color=ROCHE_FONCEE, fill_opacity=1, stroke_color="#64748b", stroke_width=2)
        h = (y1 - y0) * 0.17
        t = h / (y1 - y0)
        gx = self.sommet_x - (self.sommet_x - self.pied_x) * t
        dx = self.sommet_x + (d - self.sommet_x) * t
        self.neige = Polygon(P(self.sommet_x, y1), P(gx, y1 - h), P(self.sommet_x - 0.12, y1 - h * 0.75), P(self.sommet_x + 0.05, y1 - h * 1.05), P(dx, y1 - h),
                             fill_color=WHITE, fill_opacity=1, stroke_width=0)
        self.axe = Line(P(x0, y0), P(x0, y1), color=WHITE, stroke_width=4)
        self.grad = VGroup(*[Line(P(x0 - 0.07, self.y(n)), P(x0 + 0.07, self.y(n)), color=WHITE, stroke_width=2) for n in range(a, b + 1, pas)])
        self.add(self.corps, self.neige, self.axe, self.grad)

    def y(self, alt):
        return self.y0 + (alt - self.a) / (self.b - self.a) * (self.y1 - self.y0)

    def pied(self, alt):
        t = (alt - self.a) / (self.b - self.a)
        return P(self.pied_x + t * (self.sommet_x - self.pied_x), self.y(alt))

    def sur(self, m, alt):
        return m.copy().move_to(self.pied(alt) + UP * m.height / 2)

    def lab(self, alt, fs=25, dy=0.0):
        t = Fr(f"{alt // 1000} {alt % 1000:03d} m", fs, WHITE, audit=False)
        t.move_to(P(self.x0 - 0.14 - t.width / 2, self.y(alt) + dy))
        trait = Line(P(self.x0 - 0.11, self.y(alt)), P(self.x0 + 0.11, self.y(alt)), color=JAUNE_TITRE, stroke_width=4)
        return VGroup(t, trait)

    def fleche(self, u, v, x, c=None, sw=7):
        return Arrow(P(x, self.y(u)), P(x, self.y(v)), color=c or (POS if v > u else NEG), buff=0, stroke_width=sw, max_tip_length_to_length_ratio=0.3, max_stroke_width_to_length_ratio=20)


class Etapes(VGroup):
    """Les 3 étapes, en haut : .pil[i] la pastille, cocher(i) les animations de la coche."""

    NOMS = ("Traduire", "Calculer", "Répondre")

    def __init__(self, y=3.15, **kw):
        super().__init__(**kw)
        self.pil, self.coches = [], []
        for i, nom in enumerate(self.NOMS):
            x = -4.3 + 4.3 * i
            fond = RoundedRectangle(width=3.7, height=0.62, corner_radius=0.16, stroke_color="#64748b", stroke_width=3, fill_color=FOND_CARTE, fill_opacity=1).move_to(P(x, y))
            rond = Circle(radius=0.2, stroke_width=0, fill_color=JAUNE_TITRE, fill_opacity=1).move_to(P(x - 1.45, y))
            num = T(str(i + 1), 24, "#0f172a", audit=False, gras=True).move_to(rond)
            txt = T(nom, 26, WHITE, audit=False, gras=True).move_to(P(x - 0.05, y))
            g = VGroup(fond, rond, num, txt)
            self.pil.append(g)
            self.add(g)
            k = VMobject(stroke_color=VERT_OK, stroke_width=7)
            k.set_points_as_corners([P(-0.17, 0), P(-0.04, -0.13), P(0.18, 0.15)])
            self.coches.append(k.move_to(P(x + 1.45, y)))

    def cocher(self, i):
        return [self.pil[i][0].animate.set_stroke(VERT_OK, width=4).set_fill("#052e16", 1), Create(self.coches[i])]

    def cochees(self, n):
        """Les n premières déjà cochées, sans animation (au début d'un écran)."""
        for i in range(n):
            self.pil[i][0].set_stroke(VERT_OK, width=4).set_fill("#052e16", 1)
        return VGroup(*self.pil[:n], *self.coches[:n])


class RelatifProbleme4e(PaysageRel):
    nom_voix = "4e-relatif-probleme"
    fichier_marques = "relatif_probleme_marques.json"
    ceinture = "verte"

    # ── outils de l'épisode ─────────────────────────────────────────────────
    def _disposer_q(self, question, choix, phrase):
        """Trois lignes de question et deux ou trois de réponse : les cartes se resserrent."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        cartes.scale(0.82, about_point=cartes.get_corner(UL))
        pause.next_to(cartes, DOWN, buff=0.2).align_to(P(self.XL, 0), LEFT)
        ph.scale_to_fit_width(min(Text(max(phrase, key=len), font_size=36).width, 7.6))
        ph.arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        ph.next_to(cartes, DOWN, buff=0.18).align_to(P(self.XL, 0), LEFT)
        return tete, q, cartes, pause, rebours, ph

    def eq_dans_q(self, i, s, phrase, n=1, lettres=""):
        """La ligne i de la question, posée au mot : même largeur que sa référence, nombres négatifs en orange."""
        ref = self.q_q[i]
        e = Fr(s, 34).scale_to_fit_width(ref.width).move_to(ref)
        self.q_q.remove(ref)
        self.dire_eq(e, phrase, n)
        return e

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Résoudre un problème avec des relatifs", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Résoudre", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        d = decor(3.9, 2.5, P(-4.3, 0.05))
        r = refuge(0.5).move_to(P(-3.3, -0.72))
        c = clara(0.5).move_to(P(-5.45, -0.5))
        l1 = self.lg("Comment passer de l'histoire", 2.0, 0.75, 40, maxw=8)
        self.dit(l1, "Comment passer de l'histoire", avec=[FadeIn(d), FadeIn(r), FadeIn(c)])
        l2 = self.lg("au calcul ?", 2.0, -0.1, 50, JAUNE_TITRE, maxw=8)
        self.dit(l2, "au calcul ?")
        self.insister(l2, 1.15, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : le refuge ──────────────────────────────────────────────────────
    def ecran_refuge(self):
        self.ecran("01-refuge")
        th = Thermometre()
        sol = -2.72
        d = decor(3.7, 4.2, P(-1.95, sol + 2.1))
        sol_l = Line(P(-3.8, sol), P(-0.1, sol), color="#94a3b8", stroke_width=4)
        soleil = Circle(radius=0.3, fill_color=SOLEIL, fill_opacity=1, stroke_width=0).move_to(P(-0.55, -0.15))
        d.set_z_index(1)
        sol_l.set_z_index(1)
        r = refuge(0.72)
        r.next_to(P(-1.2, sol), UP, buff=0).set_z_index(2)
        c = clara(0.72).next_to(P(-3.0, sol), UP, buff=0).set_z_index(3)
        self.dit(lr("Clara est guide", 3.25, 3.1, 36, CIEL), "Clara est guide", avec=[FadeIn(c, shift=UP * 0.3)])
        self.dit(lr("de haute montagne.", 3.25, 2.6, 36, CIEL), "de haute montagne.", avec=[FadeIn(soleil), FadeIn(d), FadeIn(sol_l), FadeIn(r)])
        self.dit(lr("Elle prépare", 3.25, 2.0, 36), "Elle prépare")
        self.dit(lr("la course de demain.", 3.25, 1.5, 36), "la course de demain.")
        self.dit(lr("Au petit matin,", 3.25, 0.9, 36), "Au petit matin,")
        rep = th.repere(-2)
        e = lr("il fait −2 degrés au refuge.", 3.25, 0.4, 36)
        th.mercure.become(th._m(-2))
        th.boule.set_fill(NEG, 1)
        self.poser_avec(e, "il fait moins 2 degrés au refuge.", {2: lambda: [FadeIn(th), FadeIn(rep)]})
        self.dit(lr("Dans la journée,", 3.25, -0.2, 36), "Dans la journée,", avec=[soleil.animate.move_to(P(-0.55, 1.1))])
        self.dit(lr("la température", 3.25, -0.7, 36), "la température")
        self.dit(lr("monte de 7 degrés.", 3.25, -1.2, 36), "monte de 7 degrés.")
        self.play(soleil.animate.move_to(P(-0.6, 2.3)), run_time=0.3)
        q = T("?", 90, JAUNE_TITRE, audit=False, gras=True).move_to(P(-4.3, 1.7))
        l = lr("Combien fera-t-il ?", 2.9, -2.15, 44, JAUNE_TITRE)
        self.dit(l, "Combien fera-t-il ?", avec=[FadeIn(q, scale=0.4)])
        self.insister(l, 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 02 : traduire ───────────────────────────────────────────────────────
    def ecran_traduire(self):
        self.ecran("02-traduire")
        et = Etapes()
        self.au("Première", rt=0.1)
        t = lr("Première étape :", 0, 2.45, 36, CIEL)
        self.dit(t, "Première étape :")
        self.au("traduire", FadeIn(et.pil[0], scale=1.15), rt=0.3)
        c1 = RoundedRectangle(width=5.5, height=4.9, corner_radius=0.16, stroke_color=POS, stroke_width=4, fill_color=FOND_CARTE, fill_opacity=1).move_to(P(-3.45, -0.55))
        c2 = RoundedRectangle(width=5.5, height=4.9, corner_radius=0.16, stroke_color=NEG, stroke_width=4, fill_color=FOND_CARTE, fill_opacity=1).move_to(P(2.35, -0.55))
        fl1 = Arrow(P(-5.45, -0.3), P(-5.45, 1.5), color=POS, buff=0, stroke_width=11, max_tip_length_to_length_ratio=0.25, max_stroke_width_to_length_ratio=20)
        fl2 = Arrow(P(0.35, 1.5), P(0.35, -0.3), color=NEG, buff=0, stroke_width=11, max_tip_length_to_length_ratio=0.25, max_stroke_width_to_length_ratio=20)
        for x, xf, fl, c, mots, ccl, s in ((-3.0, -3.45, fl1, c1, ("Une hausse,", "une montée,", "un gain :"), "un nombre positif.", "+"),
                                           (2.8, 2.35, fl2, c2, ("Une baisse,", "une descente,", "une perte :"), "un nombre négatif.", "−")):
            couleur = POS if s == "+" else NEG
            for k, (m, y) in enumerate(zip(mots, (1.3, 0.6, -0.1))):
                self.dit(lr(m, x, y, 40), m, avec=[FadeIn(c), GrowArrow(fl)] if k == 0 else [])
            j = signe(s, 0.42, 60).move_to(P(xf, -2.3))
            self.dit(lr(ccl, xf, -1.25, 36, couleur, maxw=4.9), ccl, avec=[FadeIn(j, scale=1.4)])
        self.play(*et.cocher(0), run_time=0.3)
        self.attendre_voix(marge=0.8)

    # ── 03 : calculer ───────────────────────────────────────────────────────
    def ecran_calculer(self):
        self.ecran("03-calculer")
        et = Etapes()
        self.add(et.cochees(1))
        th = Thermometre(v=-2)
        self.add(th)
        self.dit(lr("Deuxième étape :", 1.6, 2.3, 40, CIEL), "Deuxième étape :")
        self.au("calculer", FadeIn(et.pil[1], scale=1.15), rt=0.3)
        rep = th.repere(-2)
        self.dit(lr("On part de −2", 1.6, 1.2, 46), "On part de moins 2", avec=[FadeIn(rep)])
        self.dit(lr("et on ajoute 7.", 1.6, 0.45, 46), "et on ajoute 7.")
        e = Fr("−2 + 7 = 5", 72).move_to(P(1.6, -1.1))
        self.dire_eq(e, "Moins 2 plus 7 : 5.", sauf=e.atomes[-2:], echelle=1.15)
        fl = Arrow(P(-3.45, th.y(-2)), P(-3.45, th.y(5)), color=POS, buff=0, stroke_width=8, max_tip_length_to_length_ratio=0.15, max_stroke_width_to_length_ratio=20)
        tg = T("+7", 34, POS, audit=False, gras=True).next_to(fl, RIGHT, buff=0.1)
        self.play(GrowArrow(fl), FadeIn(tg), *th.aller(5), run_time=0.6)
        self.au_mot("5.")
        rep5 = th.repere(5)
        self.play(FadeIn(e.atomes[-2]), FadeIn(e.atomes[-1], scale=1.3), FadeOut(rep), FadeIn(rep5, scale=1.3), run_time=0.22)
        self.play(Create(self.cadre_ok(e, 0.2)), *et.cocher(1), run_time=0.3)
        self.attendre_voix(marge=0.8)

    # ── 04 : répondre ───────────────────────────────────────────────────────
    def ecran_repondre(self):
        self.ecran("04-repondre")
        et = Etapes()
        self.add(et.cochees(2))
        th = Thermometre(v=5)
        fl = Arrow(P(-3.45, th.y(-2)), P(-3.45, th.y(5)), color=POS, buff=0, stroke_width=8, max_tip_length_to_length_ratio=0.15, max_stroke_width_to_length_ratio=20)
        tg = T("+7", 34, POS, audit=False, gras=True).next_to(fl, RIGHT, buff=0.1)
        self.add(th, th.repere(5), fl, tg)
        self.dit(lr("Dernière étape :", 1.6, 2.3, 40, CIEL), "Dernière étape :")
        self.au("répondre", FadeIn(et.pil[2], scale=1.15), rt=0.2)
        self.dit(lr("répondre avec l'unité, et contrôler.", 1.6, 1.65, 36), "répondre avec l'unité, et contrôler.")
        r = lr("Il fera 5 degrés.", 1.6, 0.45, 62, VERT_OK)
        self.dit(r, "Il fera 5 degrés.")
        self.play(Create(self.cadre_ok(r, 0.2)), run_time=0.25)
        zero = Line(P(-5.6 - 0.45, th.y(0)), P(-3.9, th.y(0)), color=JAUNE_TITRE, stroke_width=5)
        self.dit(lr("On est passé au-dessus de zéro :", 1.6, -0.85, 36), "On est passé au-dessus de zéro :")
        self.play(Create(zero), run_time=0.3)
        self.dit(lr("c'est normal,", 1.6, -1.45, 36, VERT_OK), "c'est normal,")
        self.dit(lr("avec une hausse de 7 degrés.", 1.6, -2.05, 36), "avec une hausse de 7 degrés.", avec=[Indicate(VGroup(fl, tg), color=WHITE, scale_factor=1.1)])
        self.play(*et.cocher(2), run_time=0.3)
        self.attendre_voix(marge=0.8)

    # ── 04q : QUESTION 1 ────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = -2.4
        th = Thermometre(v=3)
        rep = th.repere(3)
        fl = Arrow(P(-3.45, th.y(3)), P(-3.45, th.y(-5)), color=NEG, buff=0, stroke_width=8, max_tip_length_to_length_ratio=0.15, max_stroke_width_to_length_ratio=20)
        tg = T("−8", 34, NEG, audit=False, gras=True).next_to(fl, RIGHT, buff=0.1)

        def avant(sc):
            sc.eq_dans_q(0, "Il fait 3 degrés,", "Il fait 3 degrés,")
            sc.play(FadeIn(th), FadeIn(rep), run_time=0.3)
            sc.eq_dans_q(0, "et la température baisse de 8 degrés.", "et la température baisse de 8 degrés.")
            sc.play(GrowArrow(fl), FadeIn(tg), run_time=0.35)

        def apres(sc):
            sc.ph_eq(0, "Réponse B : 3 + (−8) = −5.", "Réponse B : 3 plus moins 8, moins 5.", premier=True)
            sc.ph_eq(1, "Il fait −5 degrés.", "Il fait moins 5 degrés.", avec=[*th.aller(-5), FadeOut(rep), FadeIn(th.repere(-5))])
            sc.rep_fini()

        self.question_pause("04q-question", "04r-reponse", ["Il fait 3 degrés,", "et la température baisse de 8 degrés.", "Quel calcul faut-il faire ?"],
                            [E("3 + 8", 40, lettres=""), Fr("3 + (−8)", 40), Fr("−3 + 8", 40)], 1,
                            ["Réponse B : 3 + (−8) = −5.", "Il fait −5 degrés."], avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 05 : la baisse répétée ──────────────────────────────────────────────
    def ecran_repetee(self):
        self.ecran("05-repetee")
        et = Etapes()
        self.add(*et.pil)
        th = Thermometre()
        th.mercure.become(th._m(5))
        th.boule.set_fill(POS, 1)
        rep = th.repere(5)
        x = 1.9
        e = lr("Le soir, il fait 5 degrés,", x, 2.35, 36)
        self.poser_avec(e, "Le soir, il fait 5 degrés,", {5: lambda: [FadeIn(th), FadeIn(rep)]})
        self.dit(lr("et ça baisse de 3 degrés par heure,", x, 1.75, 36), "et ça baisse de 3 degrés par heure,")
        self.dit(lr("pendant 4 heures.", x, 1.15, 36), "pendant 4 heures.")
        self.dit(lr("Une baisse qui se répète,", x, 0.45, 36, CIEL), "Une baisse qui se répète,", avec=et.cocher(0))
        self.dit(lr("c'est une multiplication :", x, -0.1, 36, CIEL), "c'est une multiplication :")
        e1 = Fr("(−3) × 4 = −12", 48).move_to(P(x, -0.85))
        self.dire_eq(e1, "moins 3 fois 4, moins 12.", echelle=1.15)
        for v in (5, 2, -1, -4):
            f = Arrow(P(-3.45, th.y(v)), P(-3.45, th.y(v - 3)), color=NEG, buff=0, stroke_width=6, max_tip_length_to_length_ratio=0.28, max_stroke_width_to_length_ratio=20)
            tg = T("−3", 26, NEG, audit=False, gras=True).next_to(f, RIGHT, buff=0.08)
            self.play(GrowArrow(f), FadeIn(tg), *th.aller(v - 3), run_time=0.27)
        e2 = Fr("5 + (−12) = −7", 48).move_to(P(x, -1.65))
        self.dire_eq(e2, "5 plus moins 12 : moins 7.", echelle=1.15)
        self.play(FadeOut(rep), FadeIn(th.repere(-7), scale=1.3), *et.cocher(1), run_time=0.3)
        r = lr("Il fera −7 degrés.", 1.0, -2.55, 44, VERT_OK)
        self.dit(r, "Il fera moins 7 degrés.")
        r.set_color(VERT_OK)
        self.play(Create(self.cadre_ok(r, 0.14)), *et.cocher(2), run_time=0.3)
        self.attendre_voix(marge=0.8)

    # ── 06 : la variation ───────────────────────────────────────────────────
    def ecran_variation(self):
        self.ecran("06-variation")
        et = Etapes()
        self.add(*et.pil)
        m = Montagne(pied_x=1.15, sommet_x=2.85, fin_x=3.6)
        c0 = clara(0.32)
        c = m.sur(c0, 1200)
        x = 2.75
        l = lr("Et une variation ?", x, 2.3, 40, JAUNE_TITRE)
        self.dit(l, "Et une variation ?", avec=[FadeIn(m)])
        l1 = m.lab(1200, dy=-0.24)
        e = lr("Au départ, Clara est à 1 200 mètres.", x, 1.72, 32, maxw=7.1)
        i = e.atomes.index(next(a for a in e.atomes if a.original_text == "1"))
        self.poser_avec(e, "Au départ, Clara est à 1 200 mètres.", {i: lambda: [FadeIn(l1), FadeIn(c)]})
        l3 = m.lab(3100, dy=0.24)
        e = lr("Au sommet, à 3 100 mètres.", x, 1.22, 32, maxw=7.1)
        i = e.atomes.index(next(a for a in e.atomes if a.original_text == "3"))
        self.poser_avec(e, "Au sommet, à 3 100 mètres.", {i: lambda: [FadeIn(l3)]})
        self.play(c.animate.move_to(m.sur(c0, 3100).get_center()), run_time=0.8)
        self.dit(lr("Une variation, c'est", x, 0.67, 32, CIEL), "Une variation, c'est", avec=et.cocher(0))
        self.dit(lr("l'arrivée moins le départ.", x, 0.2, 32, CIEL), "l'arrivée moins le départ.")
        e1 = lr("3 100 − 1 200 = +1 900 mètres", x, -0.5, 38, maxw=7.1)
        for a in e1.atomes[-4:-1]:
            a.set_color(POS)
        self.dire_eq(e1, "3 100 moins 1 200 : plus 1 900 mètres.", echelle=1.1)
        fm = m.fleche(1200, 3100, m.x0 - 0.42)
        tm = Fr("+1 900", 25, POS, audit=False).next_to(fm, LEFT, buff=0.1)
        self.play(GrowArrow(fm), FadeIn(tm), *et.cocher(1), run_time=0.5)
        self.dit(lr("Au retour,", x, -1.05, 32), "Au retour,")
        e2 = lr("1 200 − 3 100 = −1 900 mètres", x, -1.55, 38, maxw=7.1)
        self.dire_eq(e2, "1 200 moins 3 100 : moins 1 900 mètres.", echelle=1.1)
        fd = m.fleche(3100, 1200, m.x0 + 0.38)
        td = Fr("−1 900", 25, NEG, audit=False).next_to(m.fleche(3100, 2300, m.x0 + 0.38), RIGHT, buff=0.1).set_y(m.y(2500))
        self.play(GrowArrow(fd), FadeIn(td), c.animate.move_to(m.sur(c0, 1200).get_center()), run_time=0.8)
        s = lr("Le signe dit le sens.", 2.5, -2.5, 40, JAUNE_TITRE)
        self.dit(s, "Le signe dit le sens.", avec=et.cocher(2))
        self.play(Indicate(tm, color=WHITE, scale_factor=1.15), Indicate(td, color=WHITE, scale_factor=1.15), run_time=0.5)
        self.attendre_voix(marge=0.8)

    # ── 06q : QUESTION 2 ────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = -2.4
        th = Thermometre(v=-6)
        r1, r2 = th.repere(-6), th.repere(2)
        fl = Arrow(P(-3.45, th.y(-6)), P(-3.45, th.y(2)), color=VERT_OK, buff=0, stroke_width=8, max_tip_length_to_length_ratio=0.15, max_stroke_width_to_length_ratio=20)
        tg = T("+8", 34, VERT_OK, audit=False, gras=True).next_to(fl, RIGHT, buff=0.1)

        def avant(sc):
            sc.eq_dans_q(0, "Le matin, il fait −6 degrés.", "Le matin, il fait moins 6 degrés.")
            sc.play(FadeIn(th), FadeIn(r1), run_time=0.3)
            sc.eq_dans_q(0, "À midi, 2 degrés.", "À midi, 2 degrés.")
            sc.play(*th.aller(2), FadeIn(r2), run_time=0.4)

        def apres(sc):
            sc.ph_eq(0, "Réponse B : 8.", "Réponse B : 8.", premier=True)
            sc.ph_eq(1, "Arrivée moins départ : 2 − (−6).", "Arrivée moins départ : 2 moins, entre parenthèses, moins 6.")
            sc.ph_eq(2, "Donc 2 + 6, 8 degrés de hausse.", "Donc 2 plus 6, 8 degrés de hausse.")
            sc.play(GrowArrow(fl), FadeIn(tg), run_time=0.4)
            sc.rep_fini()

        self.question_pause("06q-question", "06r-reponse", ["Le matin, il fait −6 degrés.", "À midi, 2 degrés.", "Quelle est la variation ?"],
                            [Fr("−4", 40), E("8", 40, lettres=""), Fr("−8", 40)], 1,
                            ["Réponse B : 8.", "Arrivée moins départ : 2 − (−6).", "Donc 2 + 6, 8 degrés de hausse."], avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 07 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        self.dit(lr("Le piège : oublier le signe dans la réponse.", -0.3, 3.05, 40, PIEGE, maxw=11.5), "Le piège : oublier le signe dans la réponse.")
        l = lr("Répondre 7 degrés au lieu de −7 degrés.", -0.3, 2.35, 38, maxw=11)
        self.dit(l, "Répondre 7 degrés au lieu de moins 7 degrés.")
        sous = Line(l.atomes[1].get_corner(DL) + DOWN * 0.08, l.atomes[2].get_corner(DR) + DOWN * 0.08, color=PIEGE, stroke_width=5)
        self.play(Create(sous), run_time=0.25)
        self.dit(lr("Pour Clara, ça change tout :", -0.3, 1.6, 38, JAUNE_TITRE), "Pour Clara, ça change tout :")
        c1 = RoundedRectangle(width=5.5, height=3.9, corner_radius=0.16, stroke_color=POS, stroke_width=4, fill_color=FOND_CARTE, fill_opacity=1).move_to(P(-3.45, -0.95))
        c2 = RoundedRectangle(width=5.5, height=3.9, corner_radius=0.16, stroke_color=NEG, stroke_width=4, fill_color=FOND_CARTE, fill_opacity=1).move_to(P(2.35, -0.95))
        p1 = clara(0.85, equipee=False).move_to(P(-5.35, -1.55))
        soleil = VGroup(Circle(radius=0.32, fill_color=SOLEIL, fill_opacity=1, stroke_width=0),
                        *[Line(UP * 0.42, UP * 0.58, color=SOLEIL, stroke_width=4).rotate(k * PI / 4, about_point=ORIGIN) for k in range(8)]).move_to(P(-1.35, 0.25))
        self.dit(lr("à 7 degrés,", -2.55, -0.75, 38, POS), "à 7 degrés,", avec=[FadeIn(c1), FadeIn(p1, shift=UP * 0.2), FadeIn(soleil)])
        self.dit(lr("une veste suffit.", -2.55, -1.4, 34, maxw=3.5), "une veste suffit.")
        p2 = clara(0.85).move_to(P(0.5, -1.55))
        flocons = VGroup(*[Star(n=6, outer_radius=0.13, inner_radius=0.04, fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(P(x, y))
                           for x, y in ((2.2, 0.55), (3.0, 0.25), (3.7, 0.6), (4.4, 0.25), (4.75, 0.65))])
        self.dit(lr("À −7 degrés,", 3.3, -0.75, 38, maxw=3.3), "À moins 7 degrés,", avec=[FadeIn(c2), FadeIn(p2, shift=UP * 0.2), FadeIn(flocons)])
        self.dit(lr("il faut tout", 3.3, -1.4, 34), "il faut tout")
        l2 = lr("l'équipement.", 3.3, -1.95, 34, JAUNE_TITRE)
        self.dit(l2, "l'équipement.")
        self.attendre_voix(marge=0.8)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi")
        tit = T("À toi de jouer !", 56, JAUNE_TITRE).move_to(P(0, 3.05))
        self.au("À toi", Write(tit), rt=0.5)
        m = Montagne(a=1200, b=2000, y1=1.95, sommet_x=2.95, fin_x=3.9)
        co0 = cordee()
        co = m.sur(co0, 1500)
        x = 2.75
        l15 = m.lab(1500)
        e = lr("Une cordée part de 1 500 mètres.", x, 2.0, 34, maxw=7.1)
        i = e.atomes.index(next(a for a in e.atomes if a.original_text == "1"))
        self.play(FadeIn(m), run_time=0.3)
        self.poser_avec(e, "Une cordée part de 1 500 mètres.", {i: lambda: [FadeIn(l15), FadeIn(co)]})
        self.dit(lr("Elle monte de 400 mètres,", x, 1.35, 34), "Elle monte de 400 mètres,")
        fu = m.fleche(1500, 1900, m.x0 + 0.32)
        tu = T("+400", 26, POS, audit=False, gras=True).next_to(fu, RIGHT, buff=0.08).shift(DOWN * 0.65)  # sous la pointe de la première flèche −200
        self.play(GrowArrow(fu), FadeIn(tu), co.animate.move_to(m.sur(co0, 1900).get_center()), run_time=0.7)
        self.dit(lr("puis elle redescend de 200 mètres", x, 0.75, 34, maxw=7.1), "puis elle redescend de 200 mètres")
        self.dit(lr("par heure pendant 3 heures.", x, 0.15, 34), "par heure pendant 3 heures.")
        for k, u in enumerate((1900, 1700, 1500)):
            f = m.fleche(u, u - 200, m.x0 + 1.3 + 0.65 * k, sw=6)
            tg = T("−200", 24, NEG, audit=False, gras=True).next_to(f, UP, buff=0.05)
            self.play(GrowArrow(f), FadeIn(tg), run_time=0.2)
        l = lr("À quelle altitude arrive-t-elle ?", x, -0.65, 36, JAUNE_TITRE, maxw=7.1)
        q = T("?", 80, JAUNE_TITRE, audit=False, gras=True).move_to(P(m.x0 - 0.75, m.y(1250)))
        self.dit(l, "À quelle altitude arrive-t-elle ?", avec=[FadeIn(q, scale=0.4)])
        pz = T("Mets pause, et cherche !", 40, ORANGE_RETENUE).move_to(P(2.75, -1.65))
        self.au("Mets pause", Write(pz), rt=0.5)
        self.attendre_voix(marge=2.0)

    # ── 08b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        self.ecran("08b-correction")
        et = Etapes()
        self.add(*et.pil)
        m = Montagne(a=1200, b=2000, x0=-4.95, y1=1.85, pied_x=0.75, sommet_x=3.0, fin_x=3.95)
        co0 = cordee()
        co = m.sur(co0, 1500)
        self.add(m)
        x = 2.75
        self.au("Correction", FadeIn(T("Correction", 42, JAUNE_TITRE).move_to(P(x, 2.4))), rt=0.25)
        l15 = m.lab(1500)
        e = Fr("1 500 + 400 + (−200) × 3", 46).move_to(P(x, 1.55))
        if e.width > 7.0:
            e.scale_to_fit_width(7.0)
        self.dire_eq(e, "1 500 plus 400, plus moins 200 fois 3.", echelle=1.1, avec=[FadeIn(l15), FadeIn(co)])
        self.play(*et.cocher(0), run_time=0.25)
        a = e.atomes
        i = next(k for k, t in enumerate(a) if t.original_text == "(")
        gr = VGroup(*a[i:])
        sl = RoundedRectangle(width=gr.width + 0.2, height=gr.height + 0.18, corner_radius=0.08, stroke_color=JAUNE_TITRE, stroke_width=3, fill_color=JAUNE_TITRE, fill_opacity=0.2).move_to(gr)
        l2 = lr("La multiplication d'abord : −600.", x, 0.55, 38, maxw=7.0)
        self.dit(l2, "La multiplication d'abord : moins 600.", avec=[FadeIn(sl)])
        fu = m.fleche(1500, 1900, m.x0 + 0.3)
        tu = T("+400", 26, POS, audit=False, gras=True).next_to(fu, RIGHT, buff=0.08).shift(DOWN * 0.65)  # sous la pointe de la première flèche −200
        fds = VGroup(*[m.fleche(u, u - 200, m.x0 + 1.55 + 0.42 * k, sw=6) for k, u in enumerate((1900, 1700, 1500))])
        td = T("−600", 28, NEG, audit=False, gras=True).next_to(fds[2], RIGHT, buff=0.1)
        self.play(GrowArrow(fu), FadeIn(tu), co.animate.move_to(m.sur(co0, 1900).get_center()), run_time=0.45)
        self.play(LaggedStart(*[GrowArrow(f) for f in fds], lag_ratio=0.5), FadeIn(td), run_time=0.5)
        l3 = lr("Puis 1 900 + (−600) = 1 300.", x, -0.4, 44, maxw=7.0)
        i = l3.atomes.index(next(t for t in l3.atomes if t.original_text == "1"))
        l19 = m.lab(1900)
        self.poser_avec(l3, "Puis 1 900 plus moins 600 : 1 300.", {i: lambda: [FadeIn(l19)]})
        l13 = m.lab(1300, dy=-0.02)
        self.play(FadeIn(l13), co.animate.move_to(m.sur(co0, 1300).get_center()), *et.cocher(1), run_time=0.5)
        r = lr("La cordée arrive à 1 300 mètres.", 2.75, -1.45, 38, VERT_OK, maxw=7.0)
        self.dit(r, "La cordée arrive à 1 300 mètres.")
        self.play(Create(self.cadre_ok(r, 0.18)), *et.cocher(2), run_time=0.3)
        self.attendre_voix(marge=1.0)

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.5)
        self.XL = -1.5
        d = decor(3.2, 3.3, P(-4.7, -0.3))
        r = refuge(0.5).next_to(d, DOWN, buff=-0.75).shift(RIGHT * 0.95)
        c = clara(0.72).next_to(d, DOWN, buff=-1.65).shift(LEFT * 1.0)
        th = Thermometre(x=-1.75, y_bas=-1.7, h=3.6, v=5)
        fig = VGroup(d, r, c, th)
        lignes = self.finale_colonne([["On traduit :", "une hausse est positive,", "une baisse est négative."],
                                      ["On calcule dans le bon ordre."],
                                      ["On répond avec l'unité,", "et on contrôle."]], fs=40, figure=fig)
        self.XL = type(self).XL
        self.play(FadeIn(fig), run_time=0.25)
        for lg in lignes:
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_refuge()
        self.ecran_traduire()
        self.ecran_calculer()
        self.ecran_repondre()
        self.ecran_question1()
        self.ecran_repetee()
        self.ecran_variation()
        self.ecran_question2()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
