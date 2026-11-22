# ident_developper.py
# EleveAI — Maths 4e — série IDENTITÉS REMARQUABLES, épisode 03 : DÉVELOPPER avec une identité.
# Paysage 16:9, AVEC VOIX, ceinture ORANGE. Micro : litteral_identite_developper (tous les écrans).
# Métier : Lina, paysagiste (un bassin carré de x m, une allée de 1 m tout autour, le grand carré x + 2 ;
# aire de l'allée = (x + 2)² − x² = 4x + 4, 24 m² pour x = 5 ; défi : allée de 2 m, 8x + 16).
# Centres : nature-ecologie, art-design.
# Écrans : garde (00) ; le jardin de Lina (01) ; (x + 2)² par le gabarit a², 2ab, b² et le carré découpé (02) ;
# l'aire de l'allée, 24 m² (03) ; QUESTION 1 (03q, réponse C : x² + 20x + 100) ; (x − 4)² (04) ;
# (3x + 1)², le piège 3x² (05) ; (2x + 5)(2x − 5) (05b) ; QUESTION 2 (05q, réponse B : x² − 81) ;
# défi allée de 2 m (06) et correction 8x + 16 (06b) ; ce que tu as appris (07) ; fin commune (08).
# Code couleur : x bleu (comme distributivité / factorisation) ; dans le carré découpé et le gabarit,
# a² bleu, les bandes 2ab ORANGE, b² violet ; juste vert ; piège rouge. Bassin = eau, allée = dalles.
# ⛔ Pas de factorisation par une identité (3e).
# Voix : manim/voix/4e-identites-developper.json (validée) ; marques : ident_developper_marques.json.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/ident_developper.py IdentDevelopper4e --media_dir manim/scripts/4e/media-ident-03-audit
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/ident_developper.py IdentDevelopper4e -o eleveai-maths-4e-identites-developper --media_dir manim/scripts/4e/media-ident-03
# Sortie : manim/sorties/4e/maths/identites/03-developper/eleveai-maths-4e-identites-developper.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))

from relatif_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402
from fin_commune import ecran_fin  # noqa: E402

PAROLE["²"] = "carré"
PAROLE["ab"] = "a b"  # « 2ab » se dit « 2 a b »

A2 = "#2563eb"       # le carré a²
AB = OPERATION       # les bandes ab (orange)
B2 = "#8b5cf6"       # le carré b²
EAU = "#0ea5e9"
DALLE = "#a8a29e"
JOINT = "#78716c"
HERBE = "#166534"


def X(s, fs=40, couleur=WHITE, audit=True):
    """Une expression : les x en bleu."""
    return E(s, fs, couleur, lettres="x", audit=audit)


def changer(vieux, neuf):
    """Une étiquette en remplace une autre, sur place."""
    return [FadeOut(vieux, scale=0.7), FadeIn(neuf, scale=1.25)]


def boite(s, couleur, fs=38, audit=True):
    """Une case du gabarit (« a² », « 2ab », « b² »)."""
    t = T(s, fs, WHITE, audit=audit)
    r = RoundedRectangle(width=max(1.15, t.width + 0.45), height=0.72, corner_radius=0.12, stroke_color=couleur,
                         stroke_width=4, fill_color=couleur, fill_opacity=0.22)
    t.move_to(r)
    return VGroup(r, t)


def pastille(signe, couleur, r=0.2):
    rond = Circle(radius=r, fill_color="#0b1220", fill_opacity=1, stroke_color=couleur, stroke_width=4)
    return VGroup(rond, T(signe, 30, couleur, audit=False, gras=True).move_to(rond))


def croix(m, couleur=None, k=0.3):
    c = m.get_center()
    return VGroup(Line(c + P(-k, -k), c + P(k, k)), Line(c + P(-k, k), c + P(k, -k))).set_stroke(couleur or PIEGE, 7)


class Carre(VGroup):
    """Le carré découpé (ou la grille d'un produit) : .cases[k], .noms[k] (k = 0 : a², 1 et 2 : les bandes,
    3 : b²), .haut[0|1] et .gauche[0|1] (les côtés). plein=False : cases vides, à remplir."""

    def __init__(self, wa, wb, ha=None, hb=None, haut=("a", "b"), gauche=("a", "b"),
                 noms=("a²", "ab", "ab", "b²"), fs=34, plein=True, **kw):
        super().__init__(**kw)
        ha = wa if ha is None else ha
        hb = wb if hb is None else hb
        self.fs = fs
        geo = [(0, 0, wa, ha), (wa, 0, wb, ha), (0, -ha, wa, hb), (wa, -ha, wb, hb)]
        self.cases, self.noms = VGroup(), VGroup()
        for (x0, y0, w, h), c, s in zip(geo, (A2, AB, AB, B2), noms):
            r = Rectangle(width=w, height=h, stroke_color=WHITE, stroke_width=3, fill_color=c,
                          fill_opacity=0.55 if plein else 0)
            r.move_to(P(x0 + w / 2, y0 - h / 2))
            self.cases.add(r)
            self.noms.add(self._dans(X(s, fs), r) if s else VGroup())
        self.haut = VGroup(*[X(s, fs, CIEL).move_to(P(x, 0.3)) if s else VGroup()
                             for s, x in zip(haut, (wa / 2, wa + wb / 2))])
        self.gauche = VGroup(*[X(s, fs, CIEL).next_to(P(0, y), LEFT, buff=0.15) if s else VGroup()
                               for s, y in zip(gauche, (-ha / 2, -ha - hb / 2))])
        self.add(self.cases, self.noms, self.haut, self.gauche)

    @staticmethod
    def _dans(e, r):
        if e.width > r.width - 0.2:
            e.scale_to_fit_width(r.width - 0.2)
        if e.height > r.height - 0.16:
            e.scale_to_fit_height(r.height - 0.16)
        return e.move_to(r)

    def nom(self, k, s, couleur=WHITE):
        return self._dans(X(s, self.fs, couleur), self.cases[k])

    def entete(self, cote, k, s):
        vieux = (self.haut if cote == "haut" else self.gauche)[k]
        e = X(s, self.fs, CIEL).move_to(vieux)
        if cote == "gauche":
            e.align_to(vieux, RIGHT)
        return vieux, e

    def changer_nom(self, k, s, couleur=WHITE):
        return changer(self.noms[k], self.nom(k, s, couleur))

    def changer_entetes(self, k, s):
        anims = []
        for cote in ("haut", "gauche"):
            anims += changer(*self.entete(cote, k, s))
        return anims

    def remplir(self, *ks):
        return [self.cases[k].animate.set_fill(opacity=0.55) for k in ks]

    def coin(self, k, m):
        """Pose m dans le coin haut droit de la case k."""
        r = self.cases[k]
        return m.move_to(r.get_corner(UR) + P(-0.27, -0.27))


class Jardin(VGroup):
    """Le jardin public de Lina : l'herbe, l'allée en dalles, le bassin d'eau au milieu.
    .bandes (4 bandes de a × x) et .coins (4 carrés a × a), vides, à colorer ; .eau, .bassin."""

    def __init__(self, x=5, a=1, cote=3.4, **kw):
        super().__init__(**kw)
        n = x + 2 * a
        u = cote / n
        self.u, self.xv, self.av, self.cote = u, x, a, cote
        s, w = x * u, a * u
        self.s, self.w = s, w
        self.herbe = RoundedRectangle(width=cote + 0.5, height=cote + 0.5, corner_radius=0.18, fill_color=HERBE,
                                      fill_opacity=1, stroke_width=0)
        self.allee = Square(cote, fill_color=DALLE, fill_opacity=1, stroke_color="#e7e5e4", stroke_width=3)
        pas = u / 2
        self.joints = VGroup()
        for i in range(1, 2 * n):
            v = -cote / 2 + i * pas
            self.joints.add(Line(P(v, -cote / 2), P(v, cote / 2)), Line(P(-cote / 2, v), P(cote / 2, v)))
        self.joints.set_stroke(JOINT, 1.5)
        self.bandes = VGroup(Rectangle(width=s, height=w).move_to(P(0, (s + w) / 2)),
                             Rectangle(width=s, height=w).move_to(P(0, -(s + w) / 2)),
                             Rectangle(width=w, height=s).move_to(P(-(s + w) / 2, 0)),
                             Rectangle(width=w, height=s).move_to(P((s + w) / 2, 0)))
        self.coins = VGroup(*[Square(w).move_to(P(sx * (s + w) / 2, sy * (s + w) / 2)) for sx in (-1, 1) for sy in (-1, 1)])
        for m in [*self.bandes, *self.coins]:
            m.set_fill(WHITE, opacity=0).set_stroke(WHITE, width=0)
        self.eau = Square(s, fill_color=EAU, fill_opacity=1, stroke_color="#e0f2fe", stroke_width=3)
        self.vagues = VGroup(*[ArcBetweenPoints(P(dx - s * 0.12, dy), P(dx + s * 0.12, dy), angle=-PI / 2.5)
                               for dx, dy in ((-s * 0.18, s * 0.05), (s * 0.2, -s * 0.12), (-s * 0.05, -s * 0.3))])
        self.vagues.set_stroke("#e0f2fe", 3, opacity=0.8)
        self.bassin = VGroup(self.eau, self.vagues)
        for m, z in ((self.herbe, 0), (self.allee, 1), (self.joints, 2), (self.bandes, 3), (self.coins, 3),
                     (self.eau, 4), (self.vagues, 5)):
            m.set_z_index(z)
        self.add(self.herbe, self.allee, self.joints, self.bandes, self.coins, self.bassin)

    def _c(self):
        return self.allee.get_center()

    def cote_x(self, s="x", audit=True):
        """La flèche dans l'eau, le long du bord du haut, et « x » dessous."""
        c, s2 = self._c(), self.s / 2
        fl = DoubleArrow(c + P(-s2 + 0.08, s2 - 0.2), c + P(s2 - 0.08, s2 - 0.2), buff=0, stroke_width=3,
                         tip_length=0.14, max_tip_length_to_length_ratio=0.2, color=WHITE)
        lab = X(s, 36, audit=audit).next_to(fl, DOWN, buff=0.08)
        for m in (fl, lab):
            m.set_z_index(6)
        return fl, lab

    def cote_a(self, audit=True):
        """La largeur de l'allée, à gauche, au milieu."""
        c, d = self._c(), self.cote / 2
        fl = DoubleArrow(c + P(-d, 0), c + P(-d + self.w, 0), buff=0, stroke_width=3, tip_length=0.1,
                         max_tip_length_to_length_ratio=0.45, color="#0f172a")
        lab = T(str(self.av), 32, WHITE, audit=audit).next_to(c + P(-d, 0), LEFT, buff=0.05)
        for m in (fl, lab):
            m.set_z_index(6)
        return fl, lab

    def cote_n(self, s, audit=True):
        """Le côté du grand carré, au-dessus."""
        c, d = self._c(), self.cote / 2
        y = d + 0.42
        fl = DoubleArrow(c + P(-d, y), c + P(d, y), buff=0, stroke_width=3, tip_length=0.15, color=WHITE)
        lab = X(s, 36, audit=audit).next_to(fl, UP, buff=0.08)
        for m in (fl, lab):
            m.set_z_index(6)
        return fl, lab


def lina(s=0.78):
    """Lina, paysagiste : tenue verte, chapeau de soleil, une plante en pot."""
    m = Metier(["Lina", "paysagiste"], fs=30, peau="#c68642", tenue="#15803d", cheveux="#3f2a14", longs=True, s=s)
    m.nom.arrange(DOWN, buff=0.1)
    p = m.perso
    bord = Ellipse(width=1.25 * s, height=0.22 * s, fill_color="#fbbf24", fill_opacity=1, stroke_width=0)
    bord.move_to(p.tete.get_top() + DOWN * 0.12 * s)
    calotte = ArcBetweenPoints(bord.get_center() + LEFT * 0.36 * s, bord.get_center() + RIGHT * 0.36 * s, angle=-PI)
    calotte.set_fill("#f59e0b", 1).set_stroke(width=0)
    pot = Polygon(P(-0.2, 0), P(0.2, 0), P(0.15, -0.32), P(-0.15, -0.32), fill_color="#b45309", fill_opacity=1,
                  stroke_width=0).scale(s)
    feuilles = VGroup(*[Ellipse(width=0.16 * s, height=0.4 * s, fill_color="#22c55e", fill_opacity=1, stroke_width=0)
                        .rotate(a).move_to(pot.get_top() + P(dx, 0.17) * s) for a, dx in ((0.5, -0.1), (0, 0), (-0.5, 0.1))])
    plante = VGroup(feuilles, pot).next_to(p.corps, RIGHT, buff=0.05).align_to(p.corps, DOWN)
    p.add(calotte, bord, plante)
    return m


class _Gestes:
    """La pose au mot, avec des gestes sur la figure accrochés aux atomes (paysage ET short)."""

    def poser_gestes(self, e, phrase, gestes=None, n=1, rt=0.18, echelle=1.0, sauf=()):
        gestes = gestes or {}
        voix, debut = self._texte_voix, -1
        for _ in range(n):
            debut = voix.find(phrase, debut + 1)
            if debut < 0:
                raise ValueError(f"« {phrase} » (n = {n}) absent de la voix {self._cle_voix}")
        lots = self._plan_eq(e, debut, debut + len(phrase), sauf)
        if not lots:
            raise ValueError(f"rien de dit pour {e.s} dans « {phrase} »")
        for k, (pos, atomes) in enumerate(lots):
            self._attendre_pos(pos)
            d = rt
            if k + 1 < len(lots):
                gap = self._debut_voix + self._t_pos(lots[k + 1][0]) - self.renderer.time
                d = max(0.08, min(rt, gap - 0.01))
            ex = []
            for a in atomes:
                i = next(j for j, b in enumerate(e.atomes) if b is a)
                if i in gestes:
                    ex += list(gestes[i]())
            self.play(*[FadeIn(a, scale=echelle) for a in atomes], *ex, run_time=d)
        return e


class IdentDevelopper4e(_Gestes, PaysageRel):
    nom_voix = "4e-identites-developper"
    fichier_marques = "ident_developper_marques.json"
    ceinture = "orange"

    def ld(self, s, y, fs=34, c=WHITE, x0=0.25, maxw=6.2, lettres="x"):
        """Une ligne de la colonne de droite, calée à gauche en x0."""
        e = E(s, fs, c, lettres=lettres)
        if e.width > maxw:
            e.scale_to_fit_width(maxw)
        return e.move_to(P(0, y)).align_to(P(x0, 0), LEFT)

    def rangee(self, termes, xs, y, signes, fs=38, audit=True):
        """Le gabarit : les cases (texte, couleur) centrées en xs, les signes entre elles."""
        bx = [boite(s, c, fs, audit).move_to(P(x, y)) for (s, c), x in zip(termes, xs)]
        sg = [T(s, 40, WHITE, audit=False).move_to(P((xs[i] + xs[i + 1]) / 2, y)) for i, s in enumerate(signes)]
        return bx, sg

    def valeur(self, s, x, yb, fs=44, couleur=WHITE, audit=True):
        """Un terme du résultat, sous sa case : son nombre centré en x, posé sur la ligne yb."""
        e = X(s, fs, couleur, audit)
        corps = [a for a in e.atomes if a.original_text not in "+−"]
        e.shift(RIGHT * (x - VGroup(*corps).get_center()[0]))
        e.shift(UP * (yb - corps[0].get_bottom()[1]))
        return e

    def rappel(self, s, v1, fs=44):
        """« (x + 2)² = » devant le premier terme, sur la même ligne (déjà dit : sans audit)."""
        e = X(s, fs, audit=False)
        x0 = [a for a in e.atomes if a.original_text == "x"][0]
        e.shift(UP * (v1.atomes[0].get_bottom()[1] - x0.get_bottom()[1]))
        e.shift(RIGHT * (v1.get_left()[0] - 0.3 - e.get_right()[0]))
        return e

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Développer avec une identité", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Développer", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        fig = Carre(1.6, 0.75, noms=("", "", "", ""), haut=("", ""), gauche=("", "")).move_to(P(-4.1, 0.25))
        l1 = self.lg("Comment écrire le résultat", 2.4, 0.85, 40, maxw=6.6)
        self.dit(l1, "Comment écrire le résultat", avec=[FadeIn(fig.cases, scale=0.8)])
        l2 = self.lg("en une seule ligne ?", 2.4, 0.1, 48, JAUNE_TITRE, maxw=6.6)
        self.dit(l2, "en une seule ligne ?")
        bx = [RoundedRectangle(width=1.0, height=0.55, corner_radius=0.1, stroke_color=c, stroke_width=4,
                               fill_color=c, fill_opacity=0.55) for c in (A2, AB, B2)]
        pl = [T("+", 40, WHITE, audit=False) for _ in range(2)]
        ligne = VGroup(bx[0], pl[0], bx[1], pl[1], bx[2]).arrange(RIGHT, buff=0.22).move_to(P(2.4, -0.95))
        self.play(TransformFromCopy(fig.cases[0], bx[0]), TransformFromCopy(VGroup(fig.cases[1], fig.cases[2]), bx[1]),
                  TransformFromCopy(fig.cases[3], bx[2]), FadeIn(pl[0]), FadeIn(pl[1]), run_time=0.8)
        assert ligne is not None
        self.insister(l2, 1.1, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : le jardin de Lina ──────────────────────────────────────────────
    def ecran_paysagiste(self):
        self.ecran("01-paysagiste")
        m = lina()
        m.perso.move_to(P(-5.5, 0.3))
        m.nom.next_to(m.perso, UP, buff=0.14).set_x(-5.5)
        self.au("Lina", FadeIn(m.perso, shift=UP * 0.3), FadeIn(m.nom[0], shift=UP * 0.1), rt=0.35)
        self.au("paysagiste", FadeIn(m.nom[1], shift=UP * 0.1), rt=0.3)
        j = Jardin(5, 1, 3.4).move_to(P(-2.3, -0.45))
        self.au("jardin", FadeIn(j.herbe), rt=0.3)
        fx, lx = j.cote_x()
        fa, la = j.cote_a()
        fn, ln = j.cote_n("x + 2")
        l1 = self.ld("Un bassin carré,", 2.55, 36)
        self.poser_gestes(l1, "un bassin carré,", {1: lambda: [FadeIn(j.bassin, scale=0.8)]})
        l2 = self.ld("de x mètres de côté.", 1.95, 36)
        self.poser_gestes(l2, "de x mètres de côté.", {1: lambda: [GrowFromCenter(fx), FadeIn(lx)]})
        l3 = self.ld("Tout autour, une allée", 1.0, 36)
        self.poser_gestes(l3, "Tout autour, une allée", {4: lambda: [FadeIn(j.allee), FadeIn(j.joints)]})
        l4 = self.ld("de 1 mètre de large.", 0.4, 36)
        self.poser_gestes(l4, "de 1 mètre de large.", {1: lambda: [GrowFromCenter(fa), FadeIn(la)]})
        l5 = self.ld("Grand carré : côté x + 2.", -0.55, 36)
        self.poser_gestes(l5, "Le grand carré, bassin et allée, a pour côté x plus 2.",
                          {4: lambda: [GrowFromCenter(fn), FadeIn(ln.atomes[0])], 5: lambda: [FadeIn(ln.atomes[1])],
                           6: lambda: [FadeIn(ln.atomes[2])]})
        l6 = self.ld("Quelle est l'aire de l'allée ?", -1.55, 40, JAUNE_TITRE, maxw=5.7)
        self.dit(l6, "Quelle est l'aire de l'allée ?")
        self.play(*[b.animate.set_fill(JAUNE_TITRE, opacity=0.7) for b in [*j.bandes, *j.coins]], run_time=0.35)
        self.play(*[b.animate.set_fill(opacity=0) for b in [*j.bandes, *j.coins]], run_time=0.35)
        self.insister(l6, 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 02 : (x + 2)², le gabarit qui se remplit ─────────────────────────────
    def ecran_somme(self):
        self.ecran("02-somme")
        C = Carre(2.6, 1.0, fs=36)
        C.shift(P(-3.9, -0.5) - C.cases.get_center())
        l0 = self.ld("L'aire du grand carré :", 2.95, 32, x0=-1.6)
        self.dit(l0, "l'aire du grand carré :")
        e0 = X("(x + 2)²", 44).next_to(l0, RIGHT, buff=0.3)
        e0.shift(UP * (l0.atomes[0].get_bottom()[1] - e0.atomes[1].get_bottom()[1]))
        self.dire_eq(e0, "x plus 2, au carré.", echelle=1.15)
        l1 = self.ld("C'est la forme (a + b)²,", 2.2, 34, x0=-1.3)
        self.poser_gestes(l1, "C'est la forme a plus b au carré,",
                          {0: lambda: [FadeIn(C.cases), FadeIn(C.noms)],
                           6: lambda: [FadeIn(C.haut[0]), FadeIn(C.gauche[0])],
                           8: lambda: [FadeIn(C.haut[1]), FadeIn(C.gauche[1])]})
        l2 = self.ld("avec a = x, et b = 2.", 1.5, 34, x0=-1.3)
        self.poser_gestes(l2, "avec a égale x, et b égale 2.", {3: lambda: C.changer_entetes(0, "x"),
                                                                    8: lambda: C.changer_entetes(1, "2")})
        xs = [1.65, 3.4, 5.15]
        bx, sg = self.rangee([("a²", A2), ("2ab", AB), ("b²", B2)], xs, 0.5, ["+", "+"])
        yb = -1.05
        v1 = self.valeur("x²", xs[0], yb)
        v2 = self.valeur("+ 4x", xs[1], yb)
        v3 = self.valeur("+ 4", xs[2], yb)
        rap = self.rappel("(x + 2)² =", v1)
        self.au("a au carré :", FadeIn(bx[0], scale=1.2), Indicate(C.cases[0], scale_factor=1.05), rt=0.3)
        self.poser_gestes(v1, "a au carré : x au carré.", {0: lambda: [FadeIn(rap), *C.changer_nom(0, "x²")]})
        self.au("2 a b", FadeIn(sg[0]), FadeIn(bx[1], scale=1.2),
                Indicate(VGroup(C.cases[1], C.cases[2]), color=AB, scale_factor=1.05), rt=0.3)
        d = X("2 × x × 2", 30, "#e2e8f0").move_to(P(xs[1], -0.25))
        self.poser_gestes(d, "2 fois x fois 2,", {4: lambda: [*C.changer_nom(1, "2x"), *C.changer_nom(2, "2x")]})
        self.dire_eq(v2, "2, 4 x.", echelle=1.2)
        self.au("b au carré :", FadeIn(sg[1]), FadeIn(bx[2], scale=1.2), Indicate(C.cases[3], scale_factor=1.05), rt=0.3)
        self.poser_gestes(v3, "b au carré : 4.", {1: lambda: C.changer_nom(3, "4")}, echelle=1.2)
        res = VGroup(rap, v1, v2, v3)
        cr = self.cadre_ok(res, 0.16)
        self.au("Le grand carré vaut", Create(cr), Circumscribe(C.cases, color=VERT_OK, buff=0.05), rt=0.5)
        self.insister(VGroup(v1, v2, v3), 1.1, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 03 : l'aire de l'allée ──────────────────────────────────────────────
    def ecran_allee(self):
        self.ecran("03-allee")
        j = Jardin(5, 1, 3.4).move_to(P(-3.95, -0.45))
        fx, lx = j.cote_x(audit=False)
        fa, la = j.cote_a(audit=False)
        fn, ln = j.cote_n("x + 2", audit=False)
        rap = X("(x + 2)² = x² + 4x + 4", 40, audit=False).move_to(P(0, 2.95)).align_to(P(-1.2, 0), LEFT)
        self.add(j, fx, lx, fa, la, fn, ln)
        self.play(FadeIn(rap), run_time=0.1)
        moins = X("− x²", 40, PIEGE, audit=False).move_to(j.eau).shift(DOWN * 0.2).set_z_index(6)
        l1 = self.ld("On enlève le bassin, x².", 1.95, 36, x0=-1.2, maxw=7.4)
        self.poser_gestes(l1, "On enlève le bassin, x au carré.",
                          {3: lambda: [j.eau.animate.set_fill(opacity=0.25), j.vagues.animate.set_stroke(opacity=0.2)],
                           5: lambda: [FadeIn(moins, scale=1.3)]})
        l2 = self.ld("L'allée vaut 4x + 4.", 1.0, 42, x0=-1.2, maxw=7.4)
        self.poser_gestes(l2, "L'allée vaut 4 x plus 4.",
                          {4: lambda: [b.animate.set_fill(AB, opacity=0.8) for b in j.bandes],
                           7: lambda: [c.animate.set_fill(B2, opacity=0.85) for c in j.coins]})
        self.play(Circumscribe(l2, color=CIEL, buff=0.1), run_time=0.5)
        l3 = self.ld("Pour un bassin de 5 mètres :", 0.0, 36, x0=-1.2, maxw=7.4)
        cinq = X("5", 36).move_to(lx).set_z_index(6)
        self.poser_gestes(l3, "Pour un bassin de 5 mètres :", {4: lambda: changer(lx, cinq)})
        l4 = self.ld("20 + 4 = 24 m² de dalles.", -0.95, 42, VERT_OK, x0=-1.2, maxw=7.4)
        self.poser_gestes(l4, "20 plus 4, 24 mètres carrés de dalles.",
                          {4: lambda: [Indicate(VGroup(j.bandes, j.coins), color=JAUNE_TITRE, scale_factor=1.03)]},
                          echelle=1.15)
        self.play(Create(self.cadre_ok(l4, 0.15)), run_time=0.25)
        self.insister(VGroup(*l4.atomes[4:7]), 1.25, 0.18)
        self.attendre_voix(marge=0.8)

    # ── questions : la figure de gauche ─────────────────────────────────────
    def figure_q(self, haut, gauche, wa=2.0, wb=1.3, noms=("", "", "", "")):
        C = Carre(wa, wb, haut=haut, gauche=gauche, noms=noms, fs=34, plein=False)
        C.shift(P(-3.6, -0.55) - C.cases.get_center())
        return C

    def ph_gestes(self, i, s, phrase, gestes, premier=False):
        """La ligne i de la phrase de réponse, posée au mot, avec ses gestes sur la figure."""
        ref = self.ph_q[i]
        e = X(s, 30, VERT_OK)
        e.scale_to_fit_width(ref.width).move_to(ref).align_to(ref, LEFT)
        sauf = []
        if premier:
            self.play(FadeIn(e.atomes[0]), run_time=0.08)
            sauf = [e.atomes[0]]
        return self.poser_gestes(e, phrase, gestes, rt=0.16, sauf=sauf)

    def ligne_q(self, s, phrase, gestes):
        """Dans avant_q : la ligne 0 de la question, posée au mot, avec ses gestes."""
        ref = self.q_q[0]
        e = X(s, 34)
        e.scale_to_fit_height(ref.height).move_to(ref)
        self.q_q.remove(ref)
        return self.poser_gestes(e, phrase, gestes, echelle=1.2, rt=0.2)

    # ── 03q : QUESTION 1 (réponse C) ────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        C = self.figure_q(("x", "10"), ("x", "10"))

        def avant(sc):
            sc.ligne_q("Développe (x + 10)².", "Développe x plus 10, au carré.",
                       {0: lambda: [FadeIn(C.cases)], 2: lambda: [FadeIn(C.haut[0]), FadeIn(C.gauche[0])],
                        4: lambda: [FadeIn(C.haut[1]), FadeIn(C.gauche[1])]})

        def apres(sc):
            sc.ph_gestes(0, "Réponse C : x² + 20x + 100.", "Réponse C : x au carré plus 20 x plus 100.",
                         {3: lambda: [*C.remplir(0), FadeIn(C.nom(0, "x²"))],
                          9: lambda: [*C.remplir(3), FadeIn(C.nom(3, "100"))]}, premier=True)
            sc.ph_gestes(1, "Le double produit :", "Le double produit :", {0: lambda: C.remplir(1, 2)})
            sc.ph_gestes(2, "2 × x × 10 = 20x.", "2 fois x fois 10, 20 x.",
                         {4: lambda: [FadeIn(C.nom(1, "10x")), FadeIn(C.nom(2, "10x"))],
                          6: lambda: [Circumscribe(VGroup(C.cases[1], C.cases[2]), color=AB, buff=0.04)]})
            sc.rep_fini()

        self.question_pause("03q-question", "03r-reponse", ["Développe (x + 10)²."],
                            [X("x² + 100", 34), X("x² + 10x + 100", 34), X("x² + 20x + 100", 34)], 2,
                            ["Réponse C : x² + 20x + 100.", "Le double produit :", "2 × x × 10 = 20x."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 04 : (x − 4)² ────────────────────────────────────────────────────────
    def ecran_difference(self):
        self.ecran("04-difference")
        C = Carre(2.4, 1.2, fs=36)
        C.shift(P(-4.15, -0.55) - C.cases.get_center())
        x0 = -1.6
        l0 = self.ld("La deuxième forme : (x − 4)².", 2.95, 36, x0=x0, maxw=8.0)
        self.poser_gestes(l0, "La deuxième forme : x moins 4, au carré.", {0: lambda: [FadeIn(C)]})
        l1 = self.ld("a = x, b = 4.", 2.2, 36, x0=x0)
        self.poser_gestes(l1, "a vaut x, b vaut 4.", {2: lambda: C.changer_entetes(0, "x"),
                                                         6: lambda: C.changer_entetes(1, "4")})
        xs = [1.35, 3.2, 5.05]
        bx, sg = self.rangee([("a²", A2), ("2ab", AB), ("b²", B2)], xs, 1.2, ["−", "+"])
        sg[0].set_color(PIEGE)
        yb = 0.2
        v1 = self.valeur("x²", xs[0], yb)
        v2 = self.valeur("− 8x", xs[1], yb)
        v3 = self.valeur("+ 16", xs[2], yb)
        rap = self.rappel("(x − 4)² =", v1)
        m1, m2 = C.coin(1, pastille("−", PIEGE)), C.coin(2, pastille("−", PIEGE))
        p3 = C.coin(3, pastille("+", VERT_OK, 0.18))
        self.au("a au carré :", FadeIn(bx[0], scale=1.2), Indicate(C.cases[0], scale_factor=1.05), rt=0.3)
        self.poser_gestes(v1, "a au carré : x au carré.", {0: lambda: [FadeIn(rap)]}, echelle=1.2)
        self.au("2 a b", FadeIn(sg[0], scale=1.4), FadeIn(bx[1], scale=1.2), FadeIn(m1, scale=1.4),
                FadeIn(m2, scale=1.4), rt=0.3)
        v2.atomes[0].set_color(PIEGE)
        self.dire_eq(v2, "moins 8 x.", echelle=1.2)
        self.au("Plus b au carré", FadeIn(sg[1], scale=1.4), FadeIn(bx[2], scale=1.2), FadeIn(p3, scale=1.4), rt=0.3)
        self.dire_eq(v3, "plus 16.", echelle=1.2)
        l2 = self.ld("Le dernier terme reste positif :", -0.85, 34, x0=x0)
        self.dit(l2, "Le dernier terme reste positif :")
        l3 = self.ld("(−4) × (−4) = +16", -1.65, 44, VERT_OK, x0=x0)
        self.poser_gestes(l3, "moins 4 fois moins 4, plus 16.",
                          {11: lambda: [Indicate(bx[2], color=VERT_OK), Indicate(v3, color=VERT_OK)]}, echelle=1.15)
        self.play(Create(self.cadre_ok(VGroup(rap, v1, v2, v3), 0.16)), run_time=0.3)
        self.attendre_voix(marge=0.8)

    # ── 05 : (3x + 1)², le piège 3x² ─────────────────────────────────────────
    def ecran_coefficient(self):
        self.ecran("05-coefficient")
        C = Carre(2.4, 1.0, fs=36)
        C.shift(P(-4.15, -0.55) - C.cases.get_center())
        x0 = -1.6
        l0 = self.ld("Et si a contient un nombre ?", 2.95, 36, x0=x0, maxw=8.0)
        self.poser_gestes(l0, "Et si a contient un nombre ?", {0: lambda: [FadeIn(C)]})
        e1 = X("(3x + 1)²", 46).move_to(P(0, 2.15)).align_to(P(x0, 0), LEFT)
        self.dire_eq(e1, "3 x plus 1, au carré.", echelle=1.15)
        e2 = X("a = 3x.", 40).next_to(e1, RIGHT, buff=0.9)
        e2.shift(UP * (e1.atomes[1].get_bottom()[1] - e2.atomes[2].get_bottom()[1]))
        self.poser_gestes(e2, "a vaut 3 x.", {2: lambda: C.changer_entetes(0, "3x")})
        xs = [1.35, 3.2, 5.05]
        bx, sg = self.rangee([("a²", A2), ("2ab", AB), ("b²", B2)], xs, -0.3, ["+", "+"])
        yb = -1.85
        v1 = self.valeur("9x²", xs[0], yb)
        v2 = self.valeur("+ 6x", xs[1], yb)
        v3 = self.valeur("+ 1", xs[2], yb)
        rap = self.rappel("(3x + 1)² =", v1)
        l3 = self.ld("a² = 3x × 3x = 9x²", 1.35, 40, x0=x0)
        self.poser_gestes(l3, "a au carré, c'est 3 x fois 3 x : 9 x au carré,",
                          {0: lambda: [FadeIn(bx[0], scale=1.2), Indicate(C.cases[0], scale_factor=1.05)],
                           9: lambda: [*C.changer_nom(0, "9x²"), FadeIn(v1), FadeIn(rap)]})
        l4 = self.ld("et pas 3x² !", 0.6, 40, PIEGE, x0=x0)
        self.dit(l4, "et pas 3 x au carré !")
        self.play(Create(croix(VGroup(*l4.atomes[2:5]), k=0.32)), run_time=0.25)
        self.au("2 a b", FadeIn(sg[0]), FadeIn(bx[1], scale=1.2),
                Indicate(VGroup(C.cases[1], C.cases[2]), color=AB, scale_factor=1.05), rt=0.3)
        d = X("2 × 3x × 1", 30, "#e2e8f0").move_to(P(xs[1], -1.05))
        self.poser_gestes(d, "2 fois 3 x fois 1,", {3: lambda: [*C.changer_nom(1, "3x"), *C.changer_nom(2, "3x")]})
        self.dire_eq(v2, "6 x.", echelle=1.2)
        self.au("b au carré :", FadeIn(sg[1]), FadeIn(bx[2], scale=1.2), Indicate(C.cases[3], scale_factor=1.05), rt=0.3)
        self.poser_gestes(v3, "b au carré : 1.", {1: lambda: [*C.changer_nom(3, "1"), *C.changer_entetes(1, "1")]},
                          echelle=1.2)
        self.au("Résultat", Create(self.cadre_ok(VGroup(rap, v1, v2, v3), 0.16)), rt=0.3)
        self.insister(VGroup(v1, v2, v3), 1.1, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 05b : (2x + 5)(2x − 5) ───────────────────────────────────────────────
    def ecran_produit(self):
        self.ecran("05b-produit")
        C = Carre(2.4, 1.0, gauche=("a", "−b"), noms=("a²", "ab", "−ab", "−b²"), fs=36)
        C.shift(P(-4.15, -0.55) - C.cases.get_center())
        x0 = -1.6
        l0 = self.ld("La troisième forme :", 2.95, 36, x0=x0)
        self.poser_gestes(l0, "La troisième forme :", {0: lambda: [FadeIn(C)]})
        e1 = X("(2x + 5)(2x − 5)", 46).move_to(P(0, 2.15)).align_to(P(x0, 0), LEFT)

        def ent(cote, k, s):
            return changer(*C.entete(cote, k, s))

        self.poser_gestes(e1, "2 x plus 5, fois 2 x moins 5.",
                          {1: lambda: ent("haut", 0, "2x"), 4: lambda: ent("haut", 1, "5"),
                           7: lambda: ent("gauche", 0, "2x"), 10: lambda: ent("gauche", 1, "−5")}, echelle=1.15)
        xs = [2.1, 4.1]
        bx, sg = self.rangee([("a²", A2), ("b²", B2)], xs, 1.15, ["−"])
        yb = 0.15
        v1 = self.valeur("4x²", xs[0], yb)
        v2 = self.valeur("− 25", xs[1], yb)
        rap = self.rappel("(2x + 5)(2x − 5) =", v1, fs=40)
        self.au("a au carré moins", FadeIn(bx[0], scale=1.2), Indicate(C.cases[0], scale_factor=1.05), rt=0.3)
        self.au("moins b au carré", FadeIn(sg[0], scale=1.3), FadeIn(bx[1], scale=1.2),
                Indicate(C.cases[3], scale_factor=1.05), rt=0.3)
        self.poser_gestes(v1, "4 x au carré moins 25.", {0: lambda: [FadeIn(rap), *C.changer_nom(0, "4x²")]}, echelle=1.2)
        self.poser_gestes(v2, "moins 25.", {1: lambda: C.changer_nom(3, "−25")}, echelle=1.2)
        l2 = self.ld("Il ne reste que deux termes :", -0.85, 36, x0=x0)
        self.dit(l2, "Il ne reste que deux termes :")
        l3 = self.ld("+10x et −10x s'annulent.", -1.65, 40, x0=x0)
        c1, c2 = croix(C.cases[1], k=0.3), croix(C.cases[2], k=0.3)
        self.poser_gestes(l3, "plus 10 x et moins 10 x s'annulent.",
                          {1: lambda: C.changer_nom(1, "10x"), 5: lambda: C.changer_nom(2, "−10x"),
                           9: lambda: [Create(c1), Create(c2)]})
        self.play(Create(self.cadre_ok(VGroup(rap, v1, v2), 0.16)), run_time=0.3)
        self.insister(VGroup(v1, v2), 1.12, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 05q : QUESTION 2 (réponse B) ────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        C = self.figure_q(("x", "9"), ("x", "−9"), wb=1.15)
        cr = [croix(C.cases[1], k=0.28), croix(C.cases[2], k=0.28)]

        def avant(sc):
            sc.ligne_q("Développe (x + 9)(x − 9).", "Développe x plus 9, fois x moins 9.",
                       {0: lambda: [FadeIn(C.cases)], 2: lambda: [FadeIn(C.haut[0])], 4: lambda: [FadeIn(C.haut[1])],
                        7: lambda: [FadeIn(C.gauche[0])], 9: lambda: [FadeIn(C.gauche[1])]})

        def apres(sc):
            sc.ph_gestes(0, "Réponse B : x² − 81.", "Réponse B : x au carré moins 81.",
                         {3: lambda: [*C.remplir(0), FadeIn(C.nom(0, "x²"))],
                          6: lambda: [*C.remplir(3), FadeIn(C.nom(3, "−81"))]}, premier=True)
            sc.ph_gestes(1, "Les termes du milieu,", "Les termes du milieu,", {0: lambda: C.remplir(1, 2)})
            sc.ph_gestes(2, "9x et −9x, s'annulent.", "9 x et moins 9 x, s'annulent.",
                         {0: lambda: [FadeIn(C.nom(1, "9x"))], 4: lambda: [FadeIn(C.nom(2, "−9x"))],
                          9: lambda: [Create(cr[0]), Create(cr[1])]})
            sc.rep_fini()

        self.question_pause("05q-question", "05r-reponse", ["Développe (x + 9)(x − 9)."],
                            [X("x² − 18x − 81", 34), X("x² − 81", 34), X("x² + 81", 34)], 1,
                            ["Réponse B : x² − 81.", "Les termes du milieu,", "9x et −9x, s'annulent."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 06 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("06-defi")
        j1 = Jardin(5, 1, 3.4).move_to(P(-3.95, -0.45))
        fx1, lx1 = j1.cote_x()
        self.add(j1, fx1, lx1)
        j2 = Jardin(5, 2, 3.4).move_to(P(-3.95, -0.45))
        fx2, lx2 = j2.cote_x()
        fa, la = j2.cote_a()
        fn, ln = j2.cote_n("x + 4")
        x0 = -0.9
        tit = T("À toi de jouer !", 52, JAUNE_TITRE).move_to(P(0, 2.95)).align_to(P(x0, 0), LEFT)
        self.au("À toi", Write(tit), rt=0.5)
        l1 = self.ld("Lina élargit l'allée :", 1.95, 38, x0=x0, maxw=7.0)
        self.poser_gestes(l1, "Lina élargit l'allée :",
                          {1: lambda: [FadeOut(VGroup(j1, fx1, lx1)), FadeIn(VGroup(j2, fx2, lx2))]}, rt=0.3)
        l2 = self.ld("2 mètres de large, tout autour.", 1.3, 38, x0=x0, maxw=7.0)
        self.poser_gestes(l2, "2 mètres de large, tout autour.", {0: lambda: [GrowFromCenter(fa), FadeIn(la)]})
        l3 = self.ld("Grand carré : côté x + 4.", 0.35, 38, x0=x0, maxw=7.0)
        self.poser_gestes(l3, "Le grand carré a pour côté x plus 4.",
                          {4: lambda: [GrowFromCenter(fn), FadeIn(ln.atomes[0])], 5: lambda: [FadeIn(ln.atomes[1])],
                           6: lambda: [FadeIn(ln.atomes[2])]})
        l4 = self.ld("Quelle est l'aire de l'allée ?", -0.6, 42, JAUNE_TITRE, x0=x0, maxw=7.0)
        self.dit(l4, "Quelle est l'aire de l'allée ?")
        q = T("?", 60, JAUNE_TITRE, audit=False).move_to(j2.bandes[0]).set_z_index(7)
        self.play(FadeIn(q, scale=1.4), run_time=0.25)
        pz = T("Mets pause, et cherche !", 44, ORANGE_RETENUE).move_to(P(0, -1.65)).align_to(P(x0, 0), LEFT)
        self.au("Mets pause", Write(pz), rt=0.5)
        self.defi = dict(j=j2, tit=tit, autres=VGroup(l1, l2, l3, l4, pz, q))
        self.attendre_voix(marge=2.0)

    # ── 06b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        d = self.defi
        j = d["j"]
        self.dire("06b-correction")
        x0 = -0.9
        tit = T("Correction", 50, JAUNE_TITRE).move_to(P(0, 2.95)).align_to(P(x0, 0), LEFT)
        xs = [1.45, 3.25, 5.05]
        bx, sg = self.rangee([("a²", A2), ("2ab", AB), ("b²", B2)], xs, 2.0, ["+", "+"], audit=False)
        self.au("Correction", ReplacementTransform(d["tit"], tit), FadeOut(d["autres"]), rt=0.35)
        self.play(*[FadeIn(m, shift=DOWN * 0.1) for m in [*bx, *sg]], run_time=0.3)
        yb = 0.95
        v1 = self.valeur("x²", xs[0], yb)
        v2 = self.valeur("+ 8x", xs[1], yb)
        v3 = self.valeur("+ 16", xs[2], yb)
        eg = T("=", 44, WHITE, audit=False)
        e0 = X("(x + 4)²", 44)
        x_e0 = [a for a in e0.atomes if a.original_text == "x"][0]
        e0.shift(UP * (v1.atomes[0].get_bottom()[1] - x_e0.get_bottom()[1]))
        eg.next_to(v1, LEFT, buff=0.3).set_y(v1.atomes[0].get_y() + 0.02)
        e0.shift(RIGHT * (eg.get_left()[0] - 0.25 - e0.get_right()[0]))
        self.dire_eq(e0, "x plus 4, au carré :", echelle=1.15)
        self.poser_gestes(v1, "x au carré plus 8 x plus 16.", {0: lambda: [FadeIn(eg)]}, echelle=1.2)
        self.dire_eq(v2, "plus 8 x plus 16.", echelle=1.2)
        self.dire_eq(v3, "plus 16.", echelle=1.2)
        moins = X("− x²", 40, PIEGE, audit=False).move_to(j.eau).shift(DOWN * 0.2).set_z_index(6)
        l1 = self.ld("On enlève le bassin, x².", -0.05, 38, x0=x0, maxw=7.0)
        self.poser_gestes(l1, "On enlève le bassin, x au carré.",
                          {3: lambda: [j.eau.animate.set_fill(opacity=0.25), j.vagues.animate.set_stroke(opacity=0.2)],
                           5: lambda: [FadeIn(moins, scale=1.3)]})
        l2 = self.ld("L'allée vaut 8x + 16.", -1.0, 46, VERT_OK, x0=x0, maxw=7.0)
        self.poser_gestes(l2, "L'allée vaut 8 x plus 16.",
                          {4: lambda: [b.animate.set_fill(AB, opacity=0.8) for b in j.bandes],
                           7: lambda: [c.animate.set_fill(B2, opacity=0.85) for c in j.coins]}, echelle=1.15)
        self.play(Create(self.cadre_ok(l2, 0.16)), run_time=0.25)
        self.insister(l2, 1.1, 0.2)
        self.attendre_voix(marge=1.2)

    # ── 07 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("07-finale", 0.5)
        tit = T("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        fig = Carre(1.9, 0.9, fs=32)
        fig.shift(P(-4.7, -0.5) - fig.cases.get_center())
        self.play(Write(tit), FadeIn(fig), run_time=0.6)
        x0 = -1.75
        lignes = [("On repère a et b, puis on écrit", "On repère a et b, puis on écrit", 2.25, None),
                  ("les trois termes : a², 2ab, b².", "les trois termes : a au carré, 2 a b, b au carré.", 1.7,
                   {7: lambda: [Indicate(VGroup(fig.cases[1], fig.cases[2]), color=AB, scale_factor=1.05)]}),
                  ("Dans (a − b)², le double produit", "Dans a moins b au carré, le double produit", 0.7, None),
                  ("est négatif, le dernier positif.", "est négatif, et le dernier terme positif.", 0.15, None),
                  ("(a + b)(a − b) ne garde", "a plus b, fois a moins b, ne garde", -0.85, None),
                  ("que deux termes.", "que deux termes.", -1.4, None)]
        for k, (s, ph, y, g) in enumerate(lignes):
            e = self.ld(s, y, 34, x0=x0 + 0.6, maxw=7.5)
            g = dict(g or {})
            if k % 2 == 0:
                ok = self.coche(VERT_OK, 0.22).move_to(P(x0 + 0.2, e.get_y()))
                g.setdefault(0, lambda ok=ok: [Create(ok)])
            self.poser_gestes(e, ph, g)
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_paysagiste()
        self.ecran_somme()
        self.ecran_allee()
        self.ecran_question1()
        self.ecran_difference()
        self.ecran_coefficient()
        self.ecran_produit()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        ecran_fin(self, "paysage", voix="08-abonne")
