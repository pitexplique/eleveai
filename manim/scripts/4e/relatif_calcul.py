# relatif_calcul.py
# EleveAI — Maths 4e — série « Relatifs », épisode 05 : ENCHAÎNER LES CALCULS.
# Paysage 16:9, AVEC VOIX, ceinture VERTE. Micro : relatif_calcul.
# Décor et métier : Sami, ingénieur en robotique. Centre : technologie-ia.
# Écrans (micro relatif_calcul partout) : garde (00) ; le concours (01) ; l'ordre (02) ; le calcul (03) ;
# le piège (04) ; QUESTION 1 (04q) ; réécrire (05) ; parenthèses (06) ; division (07) ; QUESTION 2 (07q) ;
# défi (08) et correction (08b) ; ce que tu as appris (09) ; fin (10).
# Voix : manim/voix/4e-relatif-calcul.json ; marques : relatif_calcul_marques.json.
#
# L'idée rendue visible : on réécrit le calcul ENTIER à chaque étape, l'une sous l'autre, les signes
# égaux alignés ; l'opération prioritaire est surlignée, puis son cadre descend sur son résultat.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/relatif_calcul.py RelatifCalcul4e
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/relatif_calcul.py RelatifCalcul4e -o eleveai-maths-4e-relatif-calcul --media_dir manim/scripts/4e/media-rel-05
# Sortie : manim/sorties/4e/maths/relatifs/05-calcul/eleveai-maths-4e-relatif-calcul.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))

from relatif_commun import *  # noqa: E402,F403

SOL = "#334155"
SARCELLE = "#14b8a6"


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


def etape(s, x, y, fs=52):
    """Une ligne du calcul : son signe = est en (x, y), toutes les lignes s'alignent dessus.
    Sans « = » au début, c'est la première ligne : même place, sans le signe."""
    if s.startswith("="):
        return Fr(s, fs).mis_sur_egal(x, y)
    e = Fr("= " + s, fs).mis_sur_egal(x, y)
    e.remove(e.egal)
    e.atomes = e.atomes[1:]
    e.egal = None
    return e


def surligne(atomes, c=JAUNE_TITRE, mx=0.1, my=0.09):
    """Le surlignage d'une opération : un cadre teinté autour des atomes."""
    g = VGroup(*atomes)
    return RoundedRectangle(width=g.width + 2 * mx, height=g.height + 2 * my, corner_radius=0.08, stroke_color=c, stroke_width=3,
                            fill_color=c, fill_opacity=0.2).move_to(g)


def cadre_res(atomes):
    """Le cadre vert d'un résultat, assez serré pour ne pas toucher le signe = voisin."""
    return surligne(atomes, VERT_OK, 0.09, 0.08).set_fill(opacity=0).set_stroke(width=4)


def croix(centre, t=0.2, sw=8):
    o = np.array(centre)
    return VGroup(Line(o + P(-t, t), o + P(t, -t)), Line(o + P(-t, -t), o + P(t, t))).set_stroke(PIEGE, sw)


def sami(s=0.72):
    """Sami : la blouse, les lunettes et la télécommande de l'ingénieur en robotique."""
    p = personne(peau="#8d5524", tenue="#e2e8f0", cheveux="#111827", s=1.0)
    col = Polygon(P(-0.2, -0.45), P(0.2, -0.45), P(0, -0.85), fill_color="#0f766e", fill_opacity=1, stroke_width=0)
    t = p.tete.get_center()
    lun = VGroup(*[Circle(radius=0.13, stroke_color="#111827", stroke_width=3).move_to(t + P(dx, 0.02)) for dx in (-0.17, 0.17)],
                 Line(t + P(-0.04, 0.02), t + P(0.04, 0.02), color="#111827", stroke_width=3))
    boitier = RoundedRectangle(width=0.62, height=0.42, corner_radius=0.07, fill_color="#0f172a", fill_opacity=1, stroke_color=SARCELLE, stroke_width=3)
    boitier.move_to(p.corps.get_center() + DOWN * 0.15)
    ant = Line(boitier.get_corner(UR) + LEFT * 0.08, boitier.get_corner(UR) + P(0.12, 0.42), color="#cbd5e1", stroke_width=3)
    bout = Dot(ant.get_end(), radius=0.05, color=NEG)
    leds = VGroup(Dot(boitier.get_center() + LEFT * 0.14, radius=0.05, color=POS), Dot(boitier.get_center() + RIGHT * 0.14, radius=0.05, color=VERT_OK))
    return VGroup(p, col, lun, ant, bout, boitier, leds).scale(s)


def robot(s=1.0):
    """Le robot du concours : deux roues, un corps, une tête et son antenne."""
    corps = RoundedRectangle(width=0.62, height=0.4, corner_radius=0.06, fill_color=SARCELLE, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    tete = RoundedRectangle(width=0.44, height=0.28, corner_radius=0.06, fill_color="#99f6e4", fill_opacity=1, stroke_color=WHITE, stroke_width=2).next_to(corps, UP, buff=0.0)
    yeux = VGroup(*[Dot(tete.get_center() + RIGHT * dx, radius=0.04, color="#0f172a") for dx in (-0.1, 0.1)])
    ant = Line(tete.get_top(), tete.get_top() + UP * 0.14, color=WHITE, stroke_width=3)
    bout = Dot(ant.get_end(), radius=0.04, color=JAUNE_TITRE)
    roues = VGroup(*[Circle(radius=0.11, fill_color="#0f172a", fill_opacity=1, stroke_color=WHITE, stroke_width=2).move_to(corps.get_bottom() + P(dx, -0.05)) for dx in (-0.2, 0.2)])
    g = VGroup(roues, corps, tete, yeux, ant, bout).scale(s)
    g.set_z_index(3)
    return g


def plot(c=0.46):
    """Un plot de la piste : le toucher est une faute, orange comme tout ce qui est négatif."""
    corps = Polygon(P(-c * 0.42, 0), P(c * 0.42, 0), P(0, c), fill_color=NEG, fill_opacity=1, stroke_color=WHITE, stroke_width=1.5)
    bande = Line(P(-c * 0.21, c * 0.5), P(c * 0.21, c * 0.5), color=WHITE, stroke_width=3)
    base = Rectangle(width=c * 1.05, height=c * 0.12, fill_color="#c2410c", fill_opacity=1, stroke_width=0).move_to(P(0, -c * 0.06))
    return VGroup(base, corps, bande)


def bonus(r=0.26):
    """Le bonus : une étoile, bleu ciel comme tout ce qui est positif."""
    return Star(n=5, outer_radius=r, inner_radius=r * 0.45, fill_color=POS, fill_opacity=1, stroke_color=WHITE, stroke_width=2)


class Piste(VGroup):
    """La piste du concours, vue de côté : .sur_sol(m, f, haut) pose m à la fraction f (−1 à 1)."""

    def __init__(self, w=4.8, h=2.0, centre=ORIGIN, **kw):
        super().__init__(**kw)
        self.cadre = RoundedRectangle(width=w, height=h, corner_radius=0.14, stroke_color=SARCELLE, stroke_width=5, fill_color=FOND_CARTE, fill_opacity=1)
        self.sol = Rectangle(width=w - 0.1, height=0.3, fill_color=SOL, fill_opacity=1, stroke_width=0).move_to(P(0, -h / 2 + 0.2))
        self.bord = Line(self.sol.get_corner(UL), self.sol.get_corner(UR), color="#94a3b8", stroke_width=4)
        cotes = VGroup()
        c = 0.16
        for i in range(2):
            for j in range(5):
                cotes.add(Rectangle(width=c, height=c, stroke_width=0, fill_opacity=1, fill_color=WHITE if (i + j) % 2 else "#0f172a").move_to(P(w / 2 - 0.18 - i * c, -h / 2 + 0.35 + (j + 0.5) * c)))
        self.damier = cotes
        self.add(self.cadre, self.sol, self.bord, self.damier)
        self.move_to(centre)

    def sur_sol(self, m, f, haut=0.0):
        h = self.bord.get_center()
        return m.move_to(np.array([h[0] + f * (self.bord.width / 2), h[1] + m.height / 2 + haut, 0.0]))


class TableauScore(VGroup):
    """Le tableau de score : « SCORE », une rangée de jetons (−3, +5) et la valeur à droite."""

    def __init__(self, w=6.0, h=1.5, centre=ORIGIN, **kw):
        super().__init__(**kw)
        self.cadre = RoundedRectangle(width=w, height=h, corner_radius=0.12, stroke_color="#94a3b8", stroke_width=4, fill_color="#111827", fill_opacity=1)
        self.tete = T("SCORE", 28, JAUNE_TITRE, audit=False, gras=True).move_to(P(-w / 2 + 0.95, h / 2 - 0.34))
        self.add(self.cadre, self.tete)
        self.move_to(centre)
        self.val = None

    def jeton(self, k, s, c):
        """Le jeton k de la rangée : une faute ou un bonus (déjà dit : pas d'audit)."""
        gauche = self.cadre.get_left()
        bas = self.cadre.get_bottom()[1]
        boite = RoundedRectangle(width=0.66, height=0.5, corner_radius=0.07, stroke_color=c, stroke_width=3, fill_color=FOND_CARTE, fill_opacity=1)
        t = T(s, 26, c, audit=False, gras=True).move_to(boite)
        return VGroup(boite, t).move_to(np.array([gauche[0] + 0.5 + k * 0.72, bas + 0.42, 0.0]))

    def ecrit(self, s, c, fs=44):
        """La valeur à droite du tableau."""
        anims = [FadeOut(self.val)] if self.val is not None else []
        self.val = T(s, fs, c, audit=False, gras=True).move_to(self.cadre.get_right() + LEFT * 0.72 + DOWN * 0.1)
        return anims + [FadeIn(self.val, scale=1.4)]


class DroiteCalc(VGroup):
    """Une droite graduée : un trait par entier, une étiquette seulement pour `labels`."""

    def __init__(self, a, b, x0, x1, y, labels=None, fs=34, **kw):
        super().__init__(**kw)
        self.a, self.b, self.x0, self.x1, self.yy = a, b, x0, x1, y
        labels = list(range(a, b + 1)) if labels is None else list(labels)
        self.add(Line(P(x0 - 0.2, y), P(x1 + 0.2, y), color=WHITE, stroke_width=3))
        for v in range(a, b + 1):
            h = 0.11 if v in labels else 0.06
            self.add(Line(P(self.x(v), y - h), P(self.x(v), y + h), color=WHITE, stroke_width=3))
            if v in labels:
                self.add(T(str(v).replace("-", "−"), fs, NEG if v < 0 else WHITE, audit=False).move_to(P(self.x(v), y - 0.42)))

    def x(self, v):
        return self.x0 + (v - self.a) * (self.x1 - self.x0) / (self.b - self.a)


class Escalier(VGroup):
    """L'ordre des opérations : trois marches qu'on descend. .sur(k, m) pose m sur la marche k."""

    def __init__(self, w=1.65, h=1.0, centre=ORIGIN, **kw):
        super().__init__(**kw)
        self.marches, self.lab = [], []
        for k, s in enumerate(("( )", "× ÷", "+ −")):
            haut = h * (3 - k)
            m = Rectangle(width=w, height=haut, stroke_color="#94a3b8", stroke_width=3, fill_color="#1e293b", fill_opacity=1)
            m.move_to(P(k * w, haut / 2))
            lab = T(s, 46, JAUNE_TITRE, audit=False, gras=True).move_to(P(k * w, haut - h / 2))
            self.marches.append(m)
            self.lab.append(lab)
            self.add(m, lab)
        self.move_to(centre)

    def sur(self, k, m):
        return m.move_to(self.marches[k].get_top() + UP * (m.height / 2))

    def allume(self, k, c=VERT_OK):
        return [self.marches[k].animate.set_fill("#052e16", 1).set_stroke(c, 5)]


class RelatifCalcul4e(PaysageRel):
    nom_voix = "4e-relatif-calcul"
    fichier_marques = "relatif_calcul_marques.json"
    ceinture = "verte"

    # ── outils de l'épisode ─────────────────────────────────────────────────
    def _disposer_q(self, question, choix, phrase):
        """Trois ou quatre lignes de réponse : les cartes se resserrent pour leur laisser la place."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        cartes.scale(0.82, about_point=cartes.get_corner(UL))
        pause.next_to(cartes, DOWN, buff=0.2).align_to(P(self.XL, 0), LEFT)
        ph.scale_to_fit_width(6.05)
        ph.arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        ph.next_to(cartes, DOWN, buff=0.16).align_to(P(self.XL, 0), LEFT)
        return tete, q, cartes, pause, rebours, ph

    def eq_dans_q(self, i, s, phrase, n=1, fs=None, lettres="", couleur=WHITE):
        """La ligne i de la question, au mot : alignée à gauche, les négatifs en orange."""
        ref = self.q_q[i]
        e = Fr(s, fs or 34, couleur)
        e.scale_to_fit_height(ref.height).move_to(ref).align_to(ref, LEFT)
        self.q_q.remove(ref)
        self.dire_eq(e, phrase, n)
        return e

    def _y_r(self, d, r):
        return d.yy + 0.08 + r.height / 2

    def poser_r(self, d, r, v):
        return r.move_to(P(d.x(v), self._y_r(d, r)))

    def bond(self, d, r, u, v, c=POS, angle=None):
        """Le robot saute de u à v sur la droite : son arc, et la flèche qui reste."""
        a = angle if angle is not None else (-0.9 if v > u else 0.9)
        y = self._y_r(d, r)
        arc = ArcBetweenPoints(P(d.x(u), y), P(d.x(v), y), angle=a)
        fl = CurvedArrow(P(d.x(u), d.yy + 0.08), P(d.x(v), d.yy + 0.08), angle=a, color=c, stroke_width=5, tip_length=0.17)
        return fl, [MoveAlongPath(r, arc), Create(fl)]

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Calculer avec des relatifs", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Calculer", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        pi = Piste(w=4.7, h=2.4, centre=P(-2.75, 0.2))
        pers = sami(0.72).move_to(P(-5.9, -0.05))
        r = pi.sur_sol(robot(1.1), -0.72)
        cones = VGroup(*[pi.sur_sol(plot(0.46), f) for f in (-0.28, -0.02, 0.24)])
        et = pi.sur_sol(bonus(0.28), 0.56, haut=0.75)
        l1 = self.lg("Par quelle opération", 3.15, 0.65, 42, maxw=6.2)
        self.dit(l1, "Par quelle opération", avec=[FadeIn(pi), FadeIn(pers, shift=UP * 0.2), FadeIn(r), FadeIn(cones), FadeIn(et)])
        l2 = self.lg("commencer ?", 3.15, -0.2, 50, JAUNE_TITRE, maxw=6.2)
        self.dit(l2, "commencer ?")
        self.insister(l2, 1.15, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : le concours de robots ──────────────────────────────────────────
    def ecran_robot(self):
        self.ecran("01-robot")
        pers = sami(0.72).move_to(P(-5.9, 1.3))
        tb = TableauScore(w=5.0, h=1.5, centre=P(-2.75, 2.55))
        pi = Piste(w=6.1, h=2.15, centre=P(-3.4, -0.75))
        r = pi.sur_sol(robot(1.1), -0.84)
        cones = [pi.sur_sol(plot(0.46), f) for f in (-0.52, -0.26, 0.0, 0.26)]
        et = pi.sur_sol(bonus(0.28), 0.56, haut=0.6)
        fs = 34
        self.dit(lr("Sami est ingénieur", 3.35, 3.05, 40, CIEL, maxw=6.0), "Sami est ingénieur", avec=[FadeIn(pers, shift=UP * 0.3)])
        self.dit(lr("en robotique.", 3.35, 2.45, 40, CIEL, maxw=6.0), "en robotique.")
        self.dit(lr("Au concours de robots,", 3.35, 1.65, fs, maxw=6.0), "Au concours de robots,", avec=[FadeIn(pi), FadeIn(r), FadeIn(tb)])
        l = lr("chaque faute coûte 3 points,", 3.35, 1.1, fs, maxw=6.0)
        self.poser_avec(l, "chaque faute coûte 3 points,", {ix(l, "faute"): lambda: [FadeIn(VGroup(*cones), shift=UP * 0.1)]}, rt=0.2)
        l = lr("et un bonus en rapporte 5.", 3.35, 0.55, fs, maxw=6.0)
        self.poser_avec(l, "et un bonus en rapporte 5.", {ix(l, "bonus"): lambda: [GrowFromCenter(et)]}, rt=0.2)

        jetons = [tb.jeton(k, "−3", NEG) for k in range(4)]
        faute = {"k": 0}

        def touche():
            k = faute["k"]
            faute["k"] = k + 1
            cible = pi.sur_sol(r.copy(), (-0.52, -0.26, 0.0, 0.26)[k] + 0.11)
            return [r.animate.move_to(cible.get_center()), cones[k].animate.rotate(-0.6, about_point=cones[k].get_corner(DR)), FadeIn(jetons[k], scale=1.3)]

        l = lr("Son robot fait 4 fautes", 3.35, -0.25, fs, maxw=6.0)
        self.poser_avec(l, "Son robot fait 4 fautes", {ix(l, "4"): touche, ix(l, "fautes"): touche}, rt=0.3)
        l = lr("et gagne un bonus.", 3.35, -0.8, fs, maxw=6.0)
        j5 = tb.jeton(4, "+5", POS)

        def attrape():
            cible = pi.sur_sol(r.copy(), 0.56)
            return [r.animate.move_to(cible.get_center()), FadeIn(j5, scale=1.3), FadeOut(et, scale=1.6)]

        self.poser_avec(l, "et gagne un bonus.", {ix(l, "et"): touche, ix(l, "gagne"): touche, ix(l, "bonus"): attrape}, rt=0.3)
        c = lr("Son score : (−3) × 4 + 5", 0, -2.65, 56)
        gestes = {ix(c, "score"): lambda: tb.ecrit("?", JAUNE_TITRE)}
        self.poser_avec(c, "Son score : moins 3 fois 4, plus 5.", gestes, rt=0.22)
        self.insister(c, 1.06, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 02 : l'ordre ────────────────────────────────────────────────────────
    def ecran_ordre(self):
        self.ecran("02-ordre")
        es = Escalier(w=1.65, h=1.0, centre=P(-3.75, -0.4))
        r = robot(1.0)
        es.sur(0, r)
        self.dit(self.lg("L'ordre est toujours le même.", 0, 3.1, 44, JAUNE_TITRE, maxw=12), "L'ordre est toujours le même.", avec=[FadeIn(es)])
        fs = 36
        self.dit(lr("D'abord les parenthèses.", 3.15, 1.75, fs, maxw=6.2), "D'abord les parenthèses.", avec=[FadeIn(r, scale=0.5), *es.allume(0)])

        def descend(k):
            cible = es.sur(k, r.copy()).get_center()
            return [MoveAlongPath(r, ArcBetweenPoints(r.get_center(), cible, angle=-1.0)), *es.allume(k)]

        self.dit(lr("Puis les multiplications", 3.15, 0.75, fs, maxw=6.2), "Puis les multiplications", avec=descend(1), rt=0.3)
        self.dit(lr("et les divisions.", 3.15, 0.2, fs, maxw=6.2), "et les divisions.")
        self.dit(lr("Enfin les additions", 3.15, -0.8, fs, maxw=6.2), "Enfin les additions", avec=descend(2), rt=0.3)
        self.dit(lr("et les soustractions.", 3.15, -1.35, fs, maxw=6.2), "et les soustractions.")
        fl = Arrow(P(-6.1, -2.75), P(-4.95, -2.75), color=PIEGE, buff=0, stroke_width=7, max_tip_length_to_length_ratio=0.3)
        non = croix(fl.get_center(), 0.2)
        l = lr("On ne lit pas de gauche à droite sans réfléchir.", -0.2, -2.75, 34, maxw=8.9)
        self.poser_avec(l, "On ne lit pas de gauche à droite sans réfléchir.", {ix(l, "gauche"): lambda: [GrowArrow(fl)], ix(l, "droite"): lambda: [Create(non)]}, rt=0.2)
        self.attendre_voix(marge=0.8)

    # ── 03 : le calcul ──────────────────────────────────────────────────────
    def ecran_calcul(self):
        self.ecran("03-calcul")
        X, Y = -5.75, (2.2, 1.2, 0.2)
        d = DroiteCalc(-14, 2, -5.0, 5.0, -1.45, labels=range(-14, 3, 2))
        r = self.poser_r(d, robot(0.9), 0)
        l1 = etape("(−3) × 4 + 5", X, Y[0]).sans_audit()
        self.play(FadeIn(l1), FadeIn(d), FadeIn(r), run_time=0.25)
        self.dit(self.lg("Ici, la multiplication passe d'abord.", 0, 3.12, 42, JAUNE_TITRE, maxw=12), "Ici, la multiplication passe d'abord.")
        b1 = surligne(l1.atomes[:6])
        self.au("Moins 3 fois", FadeIn(b1), rt=0.15)
        self.au("3 fois 4", rt=0.1)
        fleches = []
        for k in range(4):
            fl, an = self.bond(d, r, -3 * k, -3 * (k + 1), NEG, 0.9)
            tag = Fr("−3", 26, audit=False).move_to(P((d.x(-3 * k) + d.x(-3 * (k + 1))) / 2, d.yy + 0.62))
            self.play(*an, FadeIn(tag), run_time=0.27)
            fleches += [fl, tag]
        l2 = etape("= (−12) + 5", X, Y[1])
        b2 = surligne(l2.atomes[1:5], VERT_OK)
        self.dire_eq(l2, "moins 12.", sauf=[l2.egal, *l2.atomes[5:]], avec=[FadeIn(l2.egal), TransformFromCopy(b1, b2)])
        self.dire_eq(l2, "plus 5.", sauf=l2.atomes[:5], echelle=1.0)
        b3 = surligne(l2.atomes[1:7])
        self.play(FadeOut(b1), Transform(b2, b3), FadeOut(VGroup(*fleches)), run_time=0.2)
        self.dit(lr("Signes contraires :", 3.3, 2.2, 36, CIEL, maxw=6.0), "Signes contraires :")
        e = Fr("12 − 5 = 7,", 44).move_to(P(2.7, 1.45))
        jeton = signe("−", 0.3, 42).move_to(P(5.3, 1.45))

        def monte():
            fl, an = self.bond(d, r, -12, -7, POS, -0.9)
            return an

        self.poser_avec(e, "12 moins 5, 7,", {ix(e, "5"): monte}, rt=0.45)
        self.dit(lr("avec le signe", 3.3, 0.75, 36, maxw=6.0), "avec le signe")
        self.dit(lr("du plus éloigné de zéro.", 3.3, 0.2, 36, maxw=6.0), "du plus éloigné de zéro.", avec=[FadeIn(jeton, scale=1.4)])
        l3 = etape("= −7", X, Y[2])
        b4 = surligne(l3.atomes[1:], VERT_OK)
        cadre = cadre_res(l3.atomes[1:])
        l = lr("Le robot finit à −7.", -0.3, -2.75, 44, VERT_OK)
        self.poser_avec(l, "Le robot finit à moins 7.", {ix(l, "7"): lambda: [FadeIn(l3, scale=1.2), TransformFromCopy(b2, b4), Flash(r, color=VERT_OK, line_length=0.2)]}, rt=0.25)
        self.play(FadeOut(b4), Create(cadre), run_time=0.2)
        self.attendre_voix(marge=0.8)

    # ── 04 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("04-piege")
        X, Y = -5.75, (1.95, 0.95, -0.05)
        l1 = etape("(−3) × 4 + 5", X, Y[0]).sans_audit()
        self.play(FadeIn(l1), run_time=0.2)
        b1 = surligne(l1.atomes[-3:], PIEGE)
        l2 = etape("= (−3) × 9", X, Y[1])
        b2 = surligne(l2.atomes[-1:], PIEGE)
        t = Fr("Le piège : ajouter d'abord 4 + 5 = 9.", 46, PIEGE, audit=True).move_to(P(0, 3.1))
        self.poser_avec(t, "Le piège : ajouter d'abord 4 plus 5, 9.",
                        {ix(t, "4"): lambda: [FadeIn(b1)], ix(t, "9"): lambda: [FadeIn(l2.atomes[-1], scale=1.3), TransformFromCopy(b1, b2)]}, rt=0.2)
        self.dire_eq(l2, "Puis moins 3 fois", sauf=[l2.egal, l2.atomes[-1]], echelle=1.0, avec=[FadeIn(l2.egal)])
        l3 = etape("= −27", X, Y[2])
        self.dire_eq(l3, "moins 27.", echelle=1.1)
        faux = T("Faux !", 62, PIEGE, gras=True).move_to(P(-3.45, -1.45))
        non = croix(VGroup(*l3.atomes).get_right() + RIGHT * 0.6, 0.22)
        self.au("Faux", FadeIn(faux, scale=1.5), Create(non), rt=0.3)
        cones = VGroup(*[plot(0.62) for _ in range(9)]).arrange(RIGHT, buff=0.1).move_to(P(3.35, -0.35))
        l = lr("Ça voudrait dire 9 fautes,", 3.35, 1.95, 36, maxw=6.1)
        self.poser_avec(l, "Ça voudrait dire 9 fautes,", {ix(l, "fautes"): lambda: [LaggedStart(*[FadeIn(c, shift=UP * 0.15) for c in cones], lag_ratio=0.08)]}, rt=0.4)
        l = lr("et le robot n'en a fait que 4.", 3.35, 1.35, 36, VERT_OK, maxw=6.1)
        ac = BraceBetweenPoints(cones[0].get_corner(DL) + DOWN * 0.1, cones[3].get_corner(DR) + DOWN * 0.1, direction=DOWN, color=VERT_OK)
        r = robot(0.95).next_to(ac, DOWN, buff=0.12)
        self.poser_avec(l, "et le robot n'en a fait que 4.", {ix(l, "robot"): lambda: [FadeIn(r, scale=0.5)],
                                                                 ix(l, "4"): lambda: [GrowFromCenter(ac), *[c.animate.set_opacity(0.22) for c in cones[4:]]]}, rt=0.25)
        self.attendre_voix(marge=0.8)

    # ── 04q : QUESTION 1 ────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.2
        tb = TableauScore(w=5.9, h=1.45, centre=P(-3.45, 1.05))
        pi = Piste(w=5.9, h=2.1, centre=P(-3.45, -0.95))
        r = pi.sur_sol(robot(1.1), -0.84)
        cs = VGroup(*[pi.sur_sol(plot(0.46), f) for f in (-0.4, 0.0, 0.4)])
        jetons = VGroup(*[tb.jeton(k, "−2", NEG) for k in range(3)])

        def avant(sc):
            sc.eq_dans_q(0, "Que vaut 10 + (−2) × 3 ?", "Que vaut 10 plus moins 2 fois 3 ?", lettres="")
            sc.play(FadeIn(tb), *tb.ecrit("10", WHITE), FadeIn(pi), FadeIn(r), FadeIn(cs), FadeIn(jetons), run_time=0.3)

        def apres(sc):
            sc.ph_eq(0, "Réponse B : 4.", "Réponse B : 4.", premier=True)
            sc.ph_eq(1, "La multiplication d'abord :", "La multiplication d'abord :")
            sc.ph_eq(2, "(−2) × 3 = −6.", "moins 2 fois 3, moins 6.",
                     avec=[r.animate.move_to(pi.sur_sol(r.copy(), 0.62).get_center()), *[c.animate.rotate(-0.6, about_point=c.get_corner(DR)) for c in cs]])
            sc.ph_eq(3, "Puis 10 + (−6) = 4.", "Puis 10 plus moins 6, 4.")
            sc.play(*tb.ecrit("4", VERT_OK), run_time=0.2)
            sc.rep_fini()

        self.question_pause("04q-question", "04r-reponse", ["Que vaut 10 + (−2) × 3 ?"],
                            [E("24", 40, lettres=""), E("4", 40, lettres=""), E("16", 40, lettres="")], 1,
                            ["Réponse B : 4.", "La multiplication d'abord :", "(−2) × 3 = −6.", "Puis 10 + (−6) = 4."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 05 : réécrire ───────────────────────────────────────────────────────
    def ecran_reecrire(self):
        self.ecran("05-reecrire")
        X, Y = -3.6, (2.15, 1.2, 0.25)
        self.dit(self.lg("Autre calcul, avec plusieurs moins :", 0, 3.12, 42, JAUNE_TITRE, maxw=12), "Autre calcul, avec plusieurs moins :")
        l1 = etape("(−2) × (−3) + (−4)", X, Y[0])
        self.dire_eq(l1, "moins 2 fois moins 3, plus moins 4.", echelle=1.1)
        self.dit(lr("On réécrit le calcul entier à chaque étape.", -0.3, -2.75, 40, CIEL, maxw=10.4), "On réécrit le calcul entier à chaque étape.")
        d = DroiteCalc(-1, 7, -5.0, 5.0, -1.45)
        r = self.poser_r(d, robot(0.9), 6)
        b1 = surligne(l1.atomes[:9])
        s1, s2 = signe("−").move_to(P(2.0, 0.75)), signe("−").move_to(P(2.9, 0.75))
        fl = Arrow(P(3.4, 0.75), P(4.3, 0.75), color=WHITE, buff=0, stroke_width=5)
        s3 = signe("+", 0.4, 56).move_to(P(4.9, 0.75))
        self.au("Moins 2", FadeIn(b1), FadeIn(s1, scale=1.3), FadeIn(d), rt=0.2)
        self.au("moins 3 :", FadeIn(s2, scale=1.3), rt=0.15)
        l2 = etape("= 6 + (−4)", X, Y[1])
        b2 = surligne(l2.atomes[1:2], VERT_OK, mx=0.1)
        self.dire_eq(l2, ": 6.", sauf=l2.atomes[2:], avec=[TransformFromCopy(b1, b2), GrowArrow(fl), FadeIn(s3, scale=1.4), FadeIn(r, scale=0.5)])
        fleche, an = self.bond(d, r, 6, 2, NEG, 0.9)
        self.play(FadeOut(b1), run_time=0.1)
        self.dire_eq(l2, "plus moins 4.", n=2, sauf=l2.atomes[:2], echelle=1.0, avec=an, rt=0.3)
        b3 = surligne(l2.atomes[1:], JAUNE_TITRE)
        self.play(Transform(b2, b3), run_time=0.15)
        res = self.lg("Résultat :", 0, Y[2], 36, VERT_OK)
        res.shift(RIGHT * (X - 0.42 - res.get_right()[0]))
        self.dit(res, "Résultat :")
        l3 = etape("= 2", X, Y[2])
        self.dire_eq(l3, "2.", echelle=1.2, avec=[FadeOut(b2)])
        self.play(Create(cadre_res(l3.atomes[1:])), run_time=0.2)
        self.attendre_voix(marge=0.8)

    # ── 06 : les parenthèses ────────────────────────────────────────────────
    def ecran_parentheses(self):
        self.ecran("06-parentheses")
        X, Y = -5.75, (2.2, 1.2, 0.2)
        self.dit(self.lg("Et avec des parenthèses ?", 0, 3.12, 44, JAUNE_TITRE, maxw=12), "Et avec des parenthèses ?")
        l1 = etape("3 × (−2 + 6)", X, Y[0])
        self.dire_eq(l1, "3 fois, entre parenthèses, moins 2 plus 6.", echelle=1.1)
        d = DroiteCalc(-3, 13, -5.0, 5.0, -1.85, labels=range(-2, 13, 2))
        r = self.poser_r(d, robot(0.9), -2)
        b1 = surligne(l1.atomes[2:])
        self.dit(lr("La parenthèse d'abord :", 3.4, 2.2, 36, CIEL, maxw=5.9), "La parenthèse d'abord :", avec=[FadeIn(b1), FadeIn(d)])
        self.au("moins 2 plus 6, 4", FadeIn(r, scale=0.5), rt=0.2)
        fl, an = self.bond(d, r, -2, 4, POS, -0.75)
        self.au("plus 6, 4", *an, rt=0.5)
        l2 = etape("= 3 × 4", X, Y[1])
        b2 = surligne(l2.atomes[-1:], VERT_OK, mx=0.1)
        yb = d.yy + 0.2
        barre = lambda u, v: Line(P(d.x(u) + 0.03, yb), P(d.x(v) - 0.03, yb), color=VERT_OK, stroke_width=12)  # noqa: E731
        self.dire_eq(l2, ", 4.", sauf=l2.atomes[:-1], avec=[TransformFromCopy(b1, b2), FadeOut(fl), Create(barre(0, 4))])

        def pousse(v):
            cible = self.poser_r(d, r.copy(), v).get_center()
            return [r.animate.move_to(cible), Create(barre(v - 4, v))]

        self.dire_eq(l2, "Puis 3 fois", sauf=l2.atomes[-1:], echelle=1.0, avec=[FadeOut(b1)])
        self.au("4, 12", *pousse(8), Transform(b2, surligne(l2.atomes[1:], JAUNE_TITRE)), rt=0.28)
        l3 = etape("= 12", X, Y[2])
        self.dire_eq(l3, "12.", echelle=1.2, avec=pousse(12))
        self.play(FadeOut(b2), Create(cadre_res(l3.atomes[1:])), run_time=0.2)
        c = RoundedRectangle(width=5.9, height=1.95, corner_radius=0.14, stroke_color=PIEGE, stroke_width=4, fill_color=FOND_CARTE, fill_opacity=1).move_to(P(3.4, 0.55))
        self.dit(lr("Sans les parenthèses,", 3.4, 1.1, 36, PIEGE, maxw=5.4), "Sans les parenthèses,", avec=[FadeIn(c)])
        e = Fr("3 × (−2) + 6 = 0", 44).move_to(P(3.4, 0.2))
        self.dire_eq(e, "3 fois moins 2, plus 6, ça donnerait zéro.", echelle=1.1)
        self.attendre_voix(marge=0.8)

    # ── 07 : la division ────────────────────────────────────────────────────
    def ecran_division(self):
        self.ecran("07-division")
        X, Y = -5.75, (2.15, 1.15, 0.15)
        self.dit(self.lg("Une division aussi passe avant l'addition.", 0, 3.12, 42, JAUNE_TITRE, maxw=12), "Une division aussi passe avant l'addition.")
        l1 = etape("8 + (−12) ÷ 4", X, Y[0])
        self.dire_eq(l1, "8 plus moins 12 divisé par 4.", echelle=1.1)
        d = DroiteCalc(0, 10, -5.0, 5.0, -1.7)
        r = self.poser_r(d, robot(0.9), 8)
        b1 = surligne(l1.atomes[2:])
        w = 0.42
        cubes = VGroup(*[Square(side_length=w, fill_color=NEG, fill_opacity=1, stroke_color=WHITE, stroke_width=2) for _ in range(12)]).arrange(RIGHT, buff=0).move_to(P(3.5, 1.45))
        tag = Fr("−12", 34, audit=False).next_to(cubes, UP, buff=0.14)
        self.au("Moins 12", FadeIn(b1), FadeIn(d), FadeIn(cubes), FadeIn(tag), rt=0.25)
        l2 = etape("= 8 + (−3)", X, Y[1])
        b2 = surligne(l2.atomes[3:], VERT_OK)
        paquets = [VGroup(*cubes[3 * k:3 * k + 3]) for k in range(4)]
        ecarts = [p.animate.shift(RIGHT * (k - 1.5) * 0.2) for k, p in enumerate(paquets)]
        tags = VGroup(*[Fr("−3", 34, audit=False).move_to(paquets[k].get_center() + RIGHT * (k - 1.5) * 0.2 + DOWN * 0.56) for k in range(4)])
        self.dire_eq(l2, ": moins 3.", sauf=l2.atomes[:3], avec=[TransformFromCopy(b1, b2), *ecarts, FadeIn(tags), FadeOut(tag)], rt=0.25)
        self.dire_eq(l2, "Puis 8 plus", sauf=l2.atomes[3:], echelle=1.0, avec=[FadeOut(b1), FadeIn(r, scale=0.5)])
        self.au("moins 3 : 5", Transform(b2, surligne(l2.atomes[1:], JAUNE_TITRE)), *self.bond(d, r, 8, 5, NEG, 0.9)[1], rt=0.4)
        l3 = etape("= 5", X, Y[2])
        self.dire_eq(l3, ": 5.", echelle=1.2, avec=[FadeOut(b2)])
        self.play(Create(cadre_res(l3.atomes[1:])), run_time=0.2)
        self.attendre_voix(marge=0.8)

    # ── 07q : QUESTION 2 ────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.2
        es = Escalier(w=1.65, h=1.05, centre=P(-3.8, -0.35))

        def avant(sc):
            sc.eq_dans_q(0, "Dans −6 − 2 × (−5),", "Dans moins 6 moins 2 fois moins 5,", lettres="")
            sc.play(FadeIn(es), run_time=0.3)

        def apres(sc):
            r = es.sur(1, robot(1.0))
            sc.ph_eq(0, "Réponse B : 2 × (−5) = −10.", "Réponse B : 2 fois moins 5, moins 10.", premier=True, avec=[FadeIn(r, scale=0.5), *es.allume(1)])
            sc.ph_eq(1, "Il reste −6 − (−10).", "Il reste moins 6 moins, entre parenthèses, moins 10.")
            sc.ph_eq(2, "Donc −6 + 10 = 4.", "Donc moins 6 plus 10 : 4.")
            sc.rep_fini()

        self.question_pause("07q-question", "07r-reponse", ["Dans −6 − 2 × (−5),", "par quoi commence-t-on ?"],
                            [E("−6 − 2", 40, lettres=""), E("2 × (−5)", 40, lettres=""), E("−5 − 6", 40, lettres="")], 1,
                            ["Réponse B : 2 × (−5) = −10.", "Il reste −6 − (−10).", "Donc −6 + 10 = 4."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi")
        tit = T("À toi de jouer !", 56, JAUNE_TITRE).move_to(P(0, 2.9))
        self.au("À toi", Write(tit), rt=0.4)
        c1 = RoundedRectangle(width=6.0, height=1.8, corner_radius=0.14, stroke_color=SARCELLE, stroke_width=4, fill_color=FOND_CARTE, fill_opacity=1).move_to(P(-3.3, 0.8))
        c2 = RoundedRectangle(width=6.0, height=1.8, corner_radius=0.14, stroke_color=SARCELLE, stroke_width=4, fill_color=FOND_CARTE, fill_opacity=1).move_to(P(3.3, 0.8))
        e1, e2 = Fr("(−4) × 5 + 8", 44), Fr("6 − 3 × (−2)", 44)
        q1, q2 = T("= ?", 44, JAUNE_TITRE, audit=False), T("= ?", 44, JAUNE_TITRE, audit=False)
        VGroup(e1, q1).arrange(RIGHT, buff=0.25).move_to(c1)
        VGroup(e2, q2).arrange(RIGHT, buff=0.25).move_to(c2)
        self.dire_eq(e1, "Moins 4 fois 5, plus 8.", echelle=1.1, avec=[FadeIn(c1)])
        self.play(FadeIn(q1), run_time=0.12)
        self.dire_eq(e2, "6 moins 3 fois, entre parenthèses, moins 2.", echelle=1.1, avec=[FadeIn(c2)])
        self.play(FadeIn(q2), run_time=0.12)
        pers = sami(0.7).move_to(P(-5.6, -1.75))
        r = robot(1.2).move_to(P(-4.25, -2.3))
        pz = T("Mets pause, et cherche !", 50, ORANGE_RETENUE).move_to(P(0.95, -1.6))
        self.au("Mets pause", Write(pz), FadeIn(pers, shift=UP * 0.2), FadeIn(r, scale=0.5), rt=0.5)
        self.attendre_voix(marge=2.0)

    # ── 08b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        self.ecran("08b-correction")
        Y = (2.1, 1.0, -0.1, -1.2)
        XA, XB = -5.75, 0.9
        a1 = etape("(−4) × 5 + 8", XA, Y[0]).sans_audit()
        b1 = etape("6 − 3 × (−2)", XB, Y[0]).sans_audit()
        self.au("Correction", FadeIn(T("Correction", 46, JAUNE_TITRE).move_to(P(0, 3.12))), FadeIn(a1), FadeIn(b1), rt=0.25)
        # à gauche
        h1 = surligne(a1.atomes[:6])
        self.au("Moins 4", FadeIn(h1), rt=0.15)
        a2 = etape("= (−20) + 8", XA, Y[1])
        h2 = surligne(a2.atomes[1:5], VERT_OK)
        self.dire_eq(a2, "moins 20.", sauf=[a2.egal, *a2.atomes[5:]], avec=[FadeIn(a2.egal), TransformFromCopy(h1, h2)])
        self.dire_eq(a2, "plus 8 :", sauf=a2.atomes[:5], echelle=1.0)
        self.play(FadeOut(h1), Transform(h2, surligne(a2.atomes[1:], JAUNE_TITRE)), run_time=0.12)
        a3 = etape("= −12", XA, Y[2])
        self.dire_eq(a3, "moins 12.", echelle=1.2, avec=[FadeOut(h2)])
        self.play(Create(cadre_res(a3.atomes[1:])), run_time=0.15)
        # à droite
        h3 = surligne(b1.atomes[2:])
        self.au("3 fois moins 2", FadeIn(h3), rt=0.15)
        b2 = etape("= 6 − (−6)", XB, Y[1])
        h4 = surligne(b2.atomes[3:], VERT_OK)
        self.dire_eq(b2, "moins 6.", sauf=b2.atomes[:3], avec=[TransformFromCopy(h3, h4)])
        self.dire_eq(b2, "Et 6 moins,", sauf=b2.atomes[3:], echelle=1.0, avec=[FadeOut(h3)])
        b3 = etape("= 6 + 6", XB, Y[2])
        self.au("entre parenthèses", FadeOut(h4), rt=0.1)
        self.dire_eq(b3, "6 plus 6,", echelle=1.1)
        b4 = etape("= 12", XB, Y[3])
        self.dire_eq(b4, ", 12.", echelle=1.2)
        self.play(Create(cadre_res(b4.atomes[1:])), run_time=0.15)
        self.attendre_voix(marge=1.0)

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.5)
        self.XL = -1.5
        es = Escalier(w=1.3, h=0.9)
        fig = VGroup(es, es.sur(0, robot(0.9)))
        lignes = self.finale_colonne([["D'abord les parenthèses."],
                                      ["Puis les multiplications", "et les divisions."],
                                      ["Enfin les additions", "et les soustractions."],
                                      ["Et on réécrit tout le calcul", "à chaque étape."]], fs=38, figure=fig)
        lignes.scale(1.14, about_point=lignes.get_corner(UL))
        self.XL = type(self).XL
        self.play(FadeIn(fig), run_time=0.25)
        for lg in lignes:
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_robot()
        self.ecran_ordre()
        self.ecran_calcul()
        self.ecran_piege()
        self.ecran_question1()
        self.ecran_reecrire()
        self.ecran_parentheses()
        self.ecran_division()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
