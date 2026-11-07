# decimal_arrondir.py
# EleveAI — Maths 6e — série « Nombres décimaux », épisode 04 : ARRONDIR UN DÉCIMAL
# (micro decimal_arrondir, notion decimal_nombre), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : film Ti Margo (prototypes/ti-margo/films/decimaux-arrondir.js).
# Décor et métier : Sami, MÉTÉOROLOGUE (centres : météo-climat).
# Écrans : garde (00), situation (01), droite (02), règle (03), garder (04),
# QUESTION 1 (05), au dixième (06), piège du 9 (07), QUESTION 2 (08), défi (09)
# et correction (09b), appris (10), fin (11).
# Voix : manim/voix/6e-decimal-arrondir.json (Julie, débit −6) ; marques : decimal_arrondir_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/decimal_arrondir.py DecimalArrondir6e
# python -m manim render -qh --disable_caching manim/scripts/6e/decimal_arrondir.py DecimalArrondir6e -o eleveai-maths-6e-decimal-arrondir --media_dir manim/scripts/6e/media-dec-04
# Sortie : manim/sorties/6e/maths/decimaux/04-arrondir/eleveai-maths-6e-decimal-arrondir.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from decimal_commun import *  # noqa: E402,F403

GARDE_C = BLEU_D       # « on garde »
MONTE_C = "#fb923c"    # « on monte »


class Droite(VGroup):
    """Une droite graduée de a à b, coupée en n parts (graduations sans nombres).
    .x(v) : le point de la valeur v ; .nombre(v, s) : l'étiquette (non ajoutée) sous v."""

    def __init__(self, a, b, n=10, larg=6.0, couleur=WHITE, **kw):
        super().__init__(**kw)
        self.a, self.b, self.larg = a, b, larg
        self.ligne = Line(P(-larg / 2 - 0.25, 0), P(larg / 2 + 0.25, 0), color=couleur, stroke_width=5)
        self.grads = VGroup(*[Line(P(-larg / 2 + larg * i / n, -0.13), P(-larg / 2 + larg * i / n, 0.13), color=couleur,
                                   stroke_width=3) for i in range(1, n)])
        self.bouts = VGroup(*[Line(P(x, -0.26), P(x, 0.26), color=couleur, stroke_width=6) for x in (-larg / 2, larg / 2)])
        self.add(self.ligne, self.grads, self.bouts)
        hors_audit(self)

    def x(self, v):
        return self.ligne.get_center() + RIGHT * (self.larg * ((v - self.a) / (self.b - self.a) - 0.5))

    def nombre(self, v, s=None, fs=34, couleur=WHITE, audit=False):
        t = Text(s if s is not None else str(v), font_size=fs, color=couleur, weight=BOLD)
        if not audit:  # une graduation n'est pas « dite » : elle n'attend pas la voix
            hors_audit(t)
        return t.next_to(self.x(v), DOWN, buff=0.35)


def fixe(m):
    """Posé AU MOT par la scène : n'attend pas le retour du même nombre dans la voix
    (« 24 », redit trois secondes plus tard), mais reste contrôlé par l'audit."""
    for f in m.get_family():
        f.sans_synchro = True
    return m


def repere(droite, v, s, couleur=AMBRE_D, fs=34, haut=0.55):
    """Le nombre placé : un triangle sur la droite et son écriture au-dessus."""
    tri = Triangle(fill_color=couleur, fill_opacity=1, stroke_width=0).scale(0.14).rotate(PI)
    tri.move_to(droite.x(v) + UP * 0.2)
    t = Text(s, font_size=fs, color=couleur, weight=BOLD).next_to(tri, UP, buff=0.1)
    g = VGroup(tri, t)
    g.tri, g.txt = tri, t
    return g


def ecart(droite, v1, v2, couleur, h=-0.55):
    """Un trait d'écart sous la droite, de v1 à v2 (la distance, sans nombre)."""
    a, b = droite.x(v1) + UP * h, droite.x(v2) + UP * h
    return hors_audit(VGroup(Line(a, b, color=couleur, stroke_width=8),
                             Line(a + UP * 0.12, a + DOWN * 0.12, color=couleur, stroke_width=5),
                             Line(b + UP * 0.12, b + DOWN * 0.12, color=couleur, stroke_width=5)))


def thermometre(s=1.0, niveau=0.75, valeur="23,7 °C"):
    tube = RoundedRectangle(width=0.42 * s, height=2.8 * s, corner_radius=0.21 * s, fill_color="#e2e8f0", fill_opacity=1,
                            stroke_color=WHITE, stroke_width=3)
    boule = Circle(radius=0.38 * s, fill_color=ROUGE_ERREUR, fill_opacity=1, stroke_color=WHITE, stroke_width=3)
    boule.next_to(tube, DOWN, buff=-0.22 * s)
    h = 2.5 * s * niveau
    liq = RoundedRectangle(width=0.2 * s, height=h, corner_radius=0.08 * s, fill_color=ROUGE_ERREUR, fill_opacity=1,
                           stroke_width=0).move_to(tube.get_bottom() + UP * (0.15 * s + h / 2))
    grad = VGroup(*[Line(tube.get_left() + UP * (0.4 + 0.3 * k) * s + DOWN * 1.4 * s + RIGHT * 0.02,
                         tube.get_left() + UP * (0.4 + 0.3 * k) * s + DOWN * 1.4 * s + RIGHT * 0.14 * s, color="#475569",
                         stroke_width=2) for k in range(8)])
    g = VGroup(tube, grad, liq, boule)
    return hors_audit(g)


def soleil(s=1.0):
    c = Circle(radius=0.42 * s, fill_color=AMBRE_D, fill_opacity=1, stroke_width=0)
    rayons = VGroup(*[Line(P(0, 0.58 * s), P(0, 0.85 * s), color=AMBRE_D, stroke_width=6).rotate(k * PI / 4, about_point=ORIGIN)
                      for k in range(8)])
    return hors_audit(VGroup(rayons, c))


def nuage(s=1.0, couleur="#cbd5e1"):
    g = VGroup(*[Circle(radius=r * s, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(P(x * s, y * s))
                 for x, y, r in ((-0.45, 0, 0.32), (0, 0.18, 0.42), (0.45, 0, 0.32), (0, -0.1, 0.33))])
    return hors_audit(g)


def pluviometre(s=1.0, niveau=0.45):
    """Le pluviomètre de Sami : un tube gradué, de l'eau et des gouttes."""
    tube = Rectangle(width=0.9 * s, height=2.2 * s, stroke_color=WHITE, stroke_width=4, fill_color=CASE, fill_opacity=0.4)
    ent = Polygon(tube.get_corner(UL), tube.get_corner(UR), tube.get_corner(UR) + P(0.35 * s, 0.45 * s),
                  tube.get_corner(UL) + P(-0.35 * s, 0.45 * s), stroke_color=WHITE, stroke_width=4, fill_opacity=0)
    h = 2.2 * s * niveau
    eau = Rectangle(width=0.86 * s, height=h, stroke_width=0, fill_color=BLEU_D, fill_opacity=0.85)
    eau.move_to(tube.get_bottom() + UP * h / 2)
    grad = VGroup(*[Line(tube.get_left() + P(0, -1.0 + 0.25 * k) * s, tube.get_left() + P(0.25, -1.0 + 0.25 * k) * s,
                         color=WHITE, stroke_width=2) for k in range(9)])
    gouttes = VGroup(*[Dot(radius=0.07 * s, color=BLEU_D).move_to(tube.get_top() + P(dx, 0.8 + dy) * s)
                       for dx, dy in ((-0.25, 0.3), (0.2, 0.0), (0.0, 0.55), (0.35, 0.45))])
    return hors_audit(VGroup(eau, tube, ent, grad, gouttes))


def manche_a_air(s=1.0):
    mat = Line(P(0, -1.4 * s), P(0, 1.2 * s), color="#cbd5e1", stroke_width=7)
    anneaux = VGroup()
    for k in range(4):
        x0 = 0.05 + 0.55 * k
        h0, h1 = 0.55 - 0.06 * k, 0.49 - 0.06 * k
        anneaux.add(Polygon(P(x0, 1.2 + h0 / 2) * s, P(x0 + 0.55, 1.2 + h1 / 2 - 0.05) * s,
                            P(x0 + 0.55, 1.2 - h1 / 2 - 0.05) * s, P(x0, 1.2 - h0 / 2) * s,
                            fill_color=ROUGE_ERREUR if k % 2 == 0 else WHITE, fill_opacity=1, stroke_width=0))
    return hors_audit(VGroup(mat, anneaux))


def sami(s=1.0):
    """Sami, météorologue : chemise bleue, un micro de radio."""
    p = visage(personne(peau="#8d5524", tenue="#2563eb", cheveux="#111827", s=s))
    c = p.corps.get_center()
    micro = VGroup(Line(c + P(0.45, -0.1) * s, c + P(0.75, 0.55) * s, color="#1f2937", stroke_width=7),
                   Circle(radius=0.14 * s, fill_color="#334155", fill_opacity=1, stroke_color="#94a3b8",
                          stroke_width=2).move_to(c + P(0.8, 0.66) * s))
    p.add(micro)
    return p


def tuiles_chiffres(cote=0.62, fs=36):
    """Les dix chiffres 0 à 9 : 0-4 en bleu (on garde), 5-9 en orange (on monte)."""
    g = VGroup()
    for k in range(10):
        c = GARDE_C if k < 5 else MONTE_C
        sq = RoundedRectangle(width=cote, height=cote, corner_radius=0.1, stroke_color=c, stroke_width=4, fill_color=CASE,
                              fill_opacity=0.7)
        g.add(VGroup(sq, Text(str(k), font_size=fs, color=c, weight=BOLD).move_to(sq)))
    g.arrange(RIGHT, buff=0.1)
    g.garde, g.monte = g[:5], g[5:]
    return hors_audit(g)


class DecimalArrondirBase(PaysageDecimal):
    nom_voix = "6e-decimal-arrondir"
    fichier_marques = "decimal_arrondir_marques.json"

    def nombre_rangs(self, s, rang, couleur=AMBRE_D, fs=80):
        """Le nombre écrit en grand, le chiffre du rang `rang` (0 = 1er après la virgule) prêt à briller."""
        t = Text(s, font_size=fs, color=WHITE, weight=BOLD)
        i = s.index(",") + 1 + rang
        return t, t[i] if i < len(t) else None

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Arrondir un nombre décimal", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Arrondir")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        d = Droite(0, 1, 10, larg=5.2).move_to(P(2.7, 0.1))
        bouts = hors_audit(VGroup(*[Dot(d.x(v), radius=0.13, color=GARDE_C if v == 0 else MONTE_C) for v in (0, 1)]))
        pt = hors_audit(Triangle(fill_color=AMBRE_D, fill_opacity=1, stroke_width=0).scale(0.16).rotate(PI)
                        .move_to(d.x(0.7) + UP * 0.22))
        fl = hors_audit(CurvedArrow(d.x(0.7) + UP * 0.5, d.x(1) + UP * 0.35, angle=-1.2, color=MONTE_C, stroke_width=6))
        q = self.bloc(["Le nombre rond", "le plus proche ?"], 44).move_to(P(-3.5, 0.35))
        self.au_mot("le nombre rond")
        self.play(FadeIn(q, shift=UP * 0.2), FadeIn(d), FadeIn(bouts), FadeIn(pt, shift=DOWN * 0.2), run_time=0.4)
        self.play(Create(fl), Indicate(bouts[1], scale_factor=1.6), run_time=0.8)
        self.attendre_voix(marge=0.6)

    # ── 01 : Sami, météorologue ─────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        sa = sami(1.05).move_to(P(-4.8, -0.3))
        self.au_mot("Voici Sami")
        nom = self.t("Sami", 44, BLEU_CALCUL).next_to(sa, UP, buff=0.2)
        self.play(FadeIn(sa, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("météorologue")
        met = self.t("météorologue", 32, BLEU_CALCUL).next_to(sa, DOWN, buff=0.18)
        so, nu = soleil(0.8).move_to(P(-4.3, 2.75)), nuage(0.9).move_to(P(-3.3, 2.45))
        self.play(FadeIn(met, shift=DOWN * 0.1), FadeIn(so), FadeIn(nu, shift=LEFT * 0.3), run_time=0.45)
        self.au_mot("Son thermomètre")
        th = thermometre(1.0).move_to(P(-2.1, -0.3))
        l1 = self.t("Son thermomètre affiche :", 36)
        self.col(l1, 2.3)
        self.play(FadeIn(th, shift=UP * 0.2), FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("23,7 degrés")
        g = self.gros("23,7 °C", couleur=ROUGE_ERREUR, fs=66)
        self.col(g, 1.2, xl=1.4)
        self.play(FadeIn(g, scale=1.3), run_time=0.4)
        self.au_mot("À la radio")
        l2 = self.bloc(["À la radio, il annonce", "un nombre entier."], 36)
        self.col(l2, -0.35)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("un nombre entier")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Lequel")
        q = self.t("Lequel ?", 48, JAUNE_TITRE)
        self.col(q, -1.6, xl=2.2)
        self.play(FadeIn(q, scale=1.2), run_time=0.35)
        self.attendre_voix()

    # ── 02 : sur la droite ──────────────────────────────────────────────────
    def ecran_droite(self):
        self.ecran("02-droite")
        d = Droite(23, 24, 10, larg=5.6).move_to(P(-3.3, 0.4))
        self.au_mot("On place")
        l1 = self.t("On place 23,7 sur une droite,", 34)
        self.col(l1, 2.4)
        self.play(FadeIn(d), run_time=0.35)
        self.au_mot("23,7")
        r = repere(d, 23.7, "23,7")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(r, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("entre 23")
        l2 = self.ligne([("entre", WHITE), ("23", GARDE_C), ("et", WHITE), ("24.", MONTE_C)], 34, buff=0.16)
        self.col(l2, 1.7)
        n23 = d.nombre(23, couleur=GARDE_C)
        self.play(FadeIn(l2[0]), FadeIn(l2[1]), FadeIn(n23, scale=1.3), run_time=0.3)
        self.au_mot("et 24")
        n24 = d.nombre(24, couleur=MONTE_C)
        fixe(l2[3])
        self.play(FadeIn(l2[2]), FadeIn(l2[3]), FadeIn(n24, scale=1.3), run_time=0.3)
        self.au_mot("Il est plus près")
        e1 = ecart(d, 23, 23.7, GARDE_C, h=-1.3)
        e2 = ecart(d, 23.7, 24, MONTE_C, h=-1.3)
        l3 = self.ligne([("Il est plus près de", WHITE), ("24.", MONTE_C)], 36, buff=0.16)
        hors_audit(l3[1])  # le 24 est déjà écrit : l'audit le comparait au premier « 24 » dit
        self.col(l3, 0.6)
        self.play(FadeIn(l3[0], shift=UP * 0.1), Create(e1), Create(e2), run_time=0.45)
        self.au_mot("de 24")
        self.play(FadeIn(l3[1], scale=1.2), e2.animate.set_stroke(width=12), Indicate(n24, color=MONTE_C, scale_factor=1.5),
                  run_time=0.45)
        self.au_mot("L'arrondi")
        l4 = self.t("L'arrondi à l'unité :", 36, JAUNE_TITRE)
        self.col(l4, -0.5)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.3)
        self.au_mot("est 24")
        g = self.gros("24", couleur=VERT_OK, fs=80)
        self.col(g, -1.75, xl=2.6)
        fl = hors_audit(CurvedArrow(r.tri.get_top() + UP * 0.65, d.x(24) + UP * 0.3, angle=-1.3, color=MONTE_C,
                                    stroke_width=6))
        self.play(FadeIn(g, scale=1.3), Create(fl), run_time=0.45)
        self.insister(g, 1.2, 0.25)
        self.attendre_voix()

    # ── 03 : la règle ───────────────────────────────────────────────────────
    def ecran_regle(self):
        self.ecran("03-regle")
        self.au_mot("La règle")
        tit = self.t("La règle", 46, JAUNE_TITRE)
        self.col(tit, 2.9)
        self.play(Write(tit), run_time=0.35)
        tb = TableauNum(("Dizaines", "Unités", "Dixièmes"), larg=1.75, h=1.0, virgule_apres=1).move_to(P(-3.6, 1.6))
        tuiles = tuiles_chiffres(0.53, 34).move_to(P(-3.2, -0.95))
        self.au_mot("pour arrondir")
        l1 = self.bloc(["Pour arrondir à l'unité,", "on regarde le chiffre", "des dixièmes."], 34)
        self.col(l1, 1.75)
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(tb), run_time=0.35)
        self.au_mot("on regarde")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("des dixièmes")
        self.play(FadeIn(l1[2], shift=UP * 0.1), Indicate(tb.colonne(2), color=AMBRE_D, scale_factor=1.12), run_time=0.45)
        self.au_mot("De 0 à 4")
        l2 = self.ligne([("De 0 à 4 :", GARDE_C), ("on garde l'unité.", WHITE)], 34, buff=0.16)
        self.col(l2, 0.2)
        cg = SurroundingRectangle(tuiles.garde, color=GARDE_C, buff=0.1, corner_radius=0.1)
        tg = hors_audit(self.t("on garde", 30, GARDE_C).next_to(cg, DOWN, buff=0.15))
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(tuiles.garde, lag_ratio=0.2), Create(cg), run_time=0.5)
        self.au_mot("on garde l'unité")
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(tg), run_time=0.3)
        self.au_mot("De 5 à 9")
        l3 = self.bloc(["De 5 à 9 : on monte", "à l'unité suivante."], 34)
        l3[0][:8].set_color(MONTE_C)
        self.col(l3, -0.75)
        cm = SurroundingRectangle(tuiles.monte, color=MONTE_C, buff=0.1, corner_radius=0.1)
        tm = hors_audit(self.t("on monte", 30, MONTE_C).next_to(cm, DOWN, buff=0.15))
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeIn(tuiles.monte, lag_ratio=0.2), Create(cm), run_time=0.5)
        self.au_mot("à l'unité suivante")
        self.play(FadeIn(l3[1], shift=UP * 0.1), FadeIn(tm), run_time=0.3)
        self.au_mot("Ici")
        ch = [tb.chiffre(0, 2, "#34d399"), tb.chiffre(1, 3, BLEU_D), tb.chiffre(2, 7, AMBRE_D)]
        self.play(*[FadeIn(c, scale=1.5) for c in ch], run_time=0.3)
        self.au_mot("c'est 7")
        l4 = VGroup(self.t("Ici, c'est 7 :", 36, AMBRE_D), self.t("on monte à 24.", 36, MONTE_C))
        self.col(l4[0], -1.6)
        self.col(l4[1], -2.2, xl=1.6)
        self.play(FadeIn(l4[0], shift=UP * 0.1), Indicate(ch[2], color=AMBRE_D, scale_factor=1.8),
                  Indicate(tuiles[7], color=MONTE_C, scale_factor=1.5), run_time=0.45)
        self.au_mot("on monte à 24")
        self.play(FadeIn(l4[1], scale=1.1), run_time=0.35)
        self.attendre_voix()

    # ── 04 : on garde ───────────────────────────────────────────────────────
    def ecran_garder(self):
        self.ecran("04-garder")
        nu = nuage(1.2).move_to(P(-3.3, 2.55))
        self.au_mot("Demain")
        l1 = self.ligne([("Demain :", WHITE), ("18,3 °C", AMBRE_D)], 40, buff=0.25)
        self.col(l1, 2.3)
        self.play(FadeIn(nu, shift=LEFT * 0.3), FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("18,3 degrés")
        d = Droite(18, 19, 10, larg=5.6).move_to(P(-3.3, 0.2))
        r = repere(d, 18.3, "18,3", couleur=AMBRE_D)
        self.play(FadeIn(l1[1], scale=1.2), FadeIn(d), FadeIn(r, shift=DOWN * 0.2),
                  FadeIn(d.nombre(18, couleur=GARDE_C)), FadeIn(d.nombre(19, couleur=MONTE_C)), run_time=0.45)
        self.au_mot("Le chiffre des dixièmes")
        l2 = self.bloc(["Le chiffre des dixièmes", "est 3."], 36)
        self.col(l2, 1.1)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("est 3")
        self.play(FadeIn(l2[1], shift=UP * 0.1), r.txt[-1].animate.set_color(GARDE_C).scale(1.4), run_time=0.4)
        self.au_mot("On garde")
        l3 = self.t("On garde :", 38, GARDE_C)
        self.col(l3, -0.35)
        e1 = ecart(d, 18, 18.3, GARDE_C, h=-1.3)
        fl = hors_audit(CurvedArrow(r.tri.get_top() + UP * 0.65, d.x(18) + UP * 0.3, angle=1.3, color=GARDE_C,
                                    stroke_width=6))
        self.play(FadeIn(l3, shift=UP * 0.1), Create(e1), Create(fl), run_time=0.45)
        g = self.gros("18", couleur=VERT_OK, fs=80)
        self.col(g, -1.6, xl=2.6)
        self.play(FadeIn(g, scale=1.3), run_time=0.4)
        self.attendre_voix()

    # ── 05 : QUESTION 1 ─────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        d = Droite(12, 13, 10, larg=5.6).move_to(P(-3.4, 0.2))

        def avant(sc):
            sc.play(FadeIn(d), run_time=0.35)

        def apres(sc):
            sc.au_mot("Le chiffre des dixièmes")
            r = repere(d, 12.5, "12,5")
            hors_audit(r)
            l1 = sc.ligne([("Le chiffre des dixièmes", VERT_OK), ("est 5.", VERT_OK)], 30, buff=0.12)
            l1.move_to(P(0, -1.2)).align_to(P(-6.3, 0), LEFT)
            fixe(l1[1])
            sc.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(r, shift=DOWN * 0.2), FadeIn(d.nombre(12, couleur=GARDE_C)),
                    FadeIn(d.nombre(13, couleur=MONTE_C)), run_time=0.3)
            sc.au_mot("5. De")
            sc.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
            lg = sc.ligne([("De 5 à 9,", VERT_OK), ("on monte : 13.", VERT_OK)], 30, buff=0.12)
            lg.move_to(P(0, -1.9)).align_to(P(-6.3, 0), LEFT)
            sc.au_mot("De 5 à 9")
            sc.play(FadeIn(lg[0], shift=UP * 0.1), run_time=0.3)
            sc.au_mot("on monte")
            fl = hors_audit(CurvedArrow(r.tri.get_top() + UP * 0.65, d.x(13) + UP * 0.3, angle=-1.3, color=MONTE_C,
                                        stroke_width=6))
            sc.play(FadeIn(lg[1], scale=1.2), Create(fl), run_time=0.4)
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse", ["Quel est l'arrondi", "à l'unité de 12,5 ?"],
                            [self.t("12", 36), self.t("13", 36), self.t("12,5", 36)], 1,
                            ["Le chiffre des dixièmes est 5.", "De 5 à 9, on monte : 13."], mot_q="Quel",
                            avant_q=avant, autres_r=apres)

    # ── 06 : au dixième ─────────────────────────────────────────────────────
    def ecran_dixieme(self):
        self.ecran("06-dixieme")
        pv = pluviometre(1.0).move_to(P(-5.6, 1.5))
        tb = TableauNum(("Unités", "Dixièmes", "Centièmes", "Millièmes"), larg=1.45, h=0.95, fs_ent=22).move_to(P(-3.1, -1.1))
        self.au_mot("Sami mesure la pluie")
        l1 = self.t("La pluie :", 36)
        self.col(l1, 2.6)
        self.play(FadeIn(pv, shift=DOWN * 0.2), FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("4,382 millimètres")
        g0 = self.gros("4,382 mm", couleur=BLEU_D, fs=54)
        g0.move_to(P(-2.35, 1.85))
        ch = [tb.chiffre(i, v, (BLEU_D, AMBRE_D, ROSE_D, VIOLET_D)[i]) for i, v in enumerate((4, 3, 8, 2))]
        self.play(FadeIn(g0, scale=1.2), FadeIn(tb), *[FadeIn(c, scale=1.4) for c in ch], run_time=0.45)
        self.au_mot("Il arrondit au dixième")
        l2 = self.t("Arrondi au dixième :", 36, AMBRE_D)
        self.col(l2, 1.75)
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(tb.colonne(1), color=AMBRE_D, scale_factor=1.12), run_time=0.45)
        self.au_mot("On regarde le chiffre juste après")
        l3 = self.bloc(["on regarde le chiffre", "juste après, celui", "des centièmes : 8."], 34)
        self.col(l3, 0.55)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("juste après")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("des centièmes")
        self.play(FadeIn(l3[2], shift=UP * 0.1), Indicate(tb.colonne(2), color=ROSE_D, scale_factor=1.12),
                  Indicate(ch[2], color=MONTE_C, scale_factor=1.8), run_time=0.4)
        self.au_mot("On monte")
        l4 = self.t("On monte :", 36, MONTE_C)
        self.col(l4, -0.75)
        self.play(FadeIn(l4, shift=UP * 0.1), ch[1].animate.set_color(MONTE_C), run_time=0.3)
        self.au_mot("4,4 millimètres")
        g = self.gros("4,4 mm", fs=60)
        self.col(g, -1.75, xl=1.8)
        self.play(FadeIn(g, scale=1.3), FadeOut(ch[2]), FadeOut(ch[3]),
                  Transform(ch[1], tb.chiffre(1, 4, VERT_OK)), run_time=0.45)
        self.insister(g, 1.2, 0.25)
        self.attendre_voix()

    # ── 07 : le piège du 9 ──────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        self.au_mot("Attention au 9")
        tit = self.t("Attention au 9 !", 46, ROUGE_ERREUR)
        self.col(tit, 2.9)
        self.play(Write(tit), run_time=0.4)
        tb = TableauNum(larg=1.75, h=0.95).move_to(P(-3.4, 2.0))
        self.au_mot("Arrondis 3,96")
        l1 = self.t("Arrondis 3,96 au dixième.", 34)
        self.col(l1, 2.1)
        ch = [tb.chiffre(0, 3, BLEU_D), tb.chiffre(1, 9, AMBRE_D), tb.chiffre(2, 6, ROSE_D)]
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(tb), *[FadeIn(c, scale=1.4) for c in ch], run_time=0.4)
        self.au_mot("Le chiffre des centièmes")
        l2 = self.t("Le chiffre des centièmes", 34)
        self.col(l2, 1.45)
        l2b = self.ligne([("est 6 :", WHITE), ("on monte.", MONTE_C)], 34, buff=0.16)
        self.col(l2b, 0.95)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("est 6")
        self.play(FadeIn(l2b[0], shift=UP * 0.1), Indicate(ch[2], color=ROSE_D, scale_factor=1.8), run_time=0.4)
        self.au_mot("on monte")
        self.play(FadeIn(l2b[1], shift=UP * 0.1), run_time=0.3)
        b = barre_unite(10, larg=5.4, h=0.6, colories=9).move_to(P(-3.4, -0.3))
        self.au_mot("9 dixièmes, plus")
        self.play(FadeIn(b), run_time=0.3)
        self.ligne_au_mot([("9 dixièmes", AMBRE_D), ("+ 1 dixième", MONTE_C)], ["9 dixièmes, plus", "1 dixième"], 0.2,
                          fs=34)
        self.play(b.parts[9].animate.set_fill(MONTE_C, 1), run_time=0.35)
        self.au_mot("font 10 dixièmes")
        l4 = self.t("= 10 dixièmes = 1 unité", 34, BLEU_D)
        self.col(l4, -0.45)
        self.play(FadeIn(l4[:11], shift=UP * 0.1), run_time=0.3)
        self.au_mot("donc une unité")
        self.play(FadeIn(l4[11:], shift=UP * 0.1), b.cadre.animate.set_stroke(BLEU_D, 10), run_time=0.4)
        self.au_mot("On obtient")
        l5 = self.t("On obtient :", 34)
        self.col(l5, -1.35)
        self.play(FadeIn(l5, shift=UP * 0.1), run_time=0.25)
        self.au_mot("4,0")
        g = self.gros("4,0", fs=56)
        g.next_to(l5, RIGHT, buff=0.35)
        self.play(FadeIn(g, scale=1.3), run_time=0.35)
        self.au_mot("c'est-à-dire 4")
        g2 = self.gros("= 4", couleur=VERT_OK, fs=56)
        g2.next_to(g, DOWN, buff=0.2).align_to(l5, LEFT)
        self.play(FadeIn(g2, scale=1.3), run_time=0.4)
        self.insister(g2, 1.2, 0.25)
        self.attendre_voix()

    # ── 08 : QUESTION 2 ─────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        tb = TableauNum(larg=1.85, h=1.0).move_to(P(-3.5, 0.6))
        ch = [tb.chiffre(0, 7, BLEU_D), tb.chiffre(1, 6, AMBRE_D), tb.chiffre(2, 4, ROSE_D)]

        def avant(sc):
            sc.play(FadeIn(tb), run_time=0.3)

        def apres(sc):
            sc.au_mot("Le chiffre des centièmes")
            l1 = sc.ligne([("Le chiffre des centièmes", VERT_OK), ("est 4.", VERT_OK)], 30, buff=0.12)
            l1.move_to(P(0, -0.9)).align_to(P(-6.3, 0), LEFT)
            fixe(l1[1])
            sc.play(FadeIn(l1[0], shift=UP * 0.1), *[FadeIn(c, scale=1.5) for c in ch], run_time=0.3)
            sc.au_mot("4. On")
            sc.play(FadeIn(l1[1], shift=UP * 0.1), Indicate(ch[2], color=GARDE_C, scale_factor=1.8), run_time=0.4)
            lg = sc.ligne([("On garde", VERT_OK), ("7,6.", VERT_OK)], 40, buff=0.2)
            lg.move_to(P(0, -1.7)).align_to(P(-6.3, 0), LEFT)
            sc.au_mot("On garde")
            sc.play(FadeIn(lg[0], shift=UP * 0.1), run_time=0.3)
            sc.au_mot("7,6")
            sc.play(FadeIn(lg[1], scale=1.3), FadeOut(ch[2]), run_time=0.35)
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse", ["Quel est l'arrondi", "au dixième de 7,64 ?"],
                            [self.t("7,6", 36), self.t("7,7", 36), self.t("8", 36)], 0,
                            ["Le chiffre des centièmes est 4.", "On garde 7,6."], mot_q="Quel",
                            avant_q=avant, autres_r=apres)

    # ── 09 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        ma = manche_a_air(1.1).move_to(P(-4.4, 0.3))
        self.au_mot("Le vent souffle")
        l1 = self.t("Le vent souffle à", 36)
        self.col(l1, 2.0, xl=0.0)
        self.play(FadeIn(ma, shift=LEFT * 0.3), FadeIn(l1), run_time=0.35)
        self.au_mot("45,58")
        g = self.gros("45,58 km/h", couleur=BLEU_D, fs=56)
        self.col(g, 1.05, xl=0.6)
        self.play(FadeIn(g, scale=1.2), run_time=0.35)
        self.au_mot("Arrondis ce nombre")
        l2 = hors_audit(self.t("1. Arrondis à l'unité.", 36, ORANGE_RETENUE))
        self.col(l2, -0.1, xl=0.0)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("puis au dixième")
        l3 = hors_audit(self.t("2. Puis au dixième.", 36, ORANGE_RETENUE))
        self.col(l3, -0.95, xl=0.0)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        self.pause_defi(y=-2.2)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        rg = ("Dizaines", "Unités", "Dixièmes", "Centièmes")
        t1 = TableauNum(rg, larg=1.4, h=0.85, fs_ent=22, virgule_apres=1).move_to(P(-3.6, 1.35))
        t2 = TableauNum(rg, larg=1.4, h=0.85, fs_ent=22, virgule_apres=1).move_to(P(-3.6, -1.3))
        coul = ("#34d399", BLEU_D, AMBRE_D, ROSE_D)
        c1 = [t1.chiffre(i, v, coul[i]) for i, v in enumerate((4, 5, 5, 8))]
        c2 = [t2.chiffre(i, v, coul[i]) for i, v in enumerate((4, 5, 5, 8))]
        self.au_mot("À l'unité")
        l1 = self.t("À l'unité :", 34, BLEU_D)
        self.col(l1, 2.3)
        self.play(FadeIn(t1), *[FadeIn(c, scale=1.4) for c in c1], FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("le chiffre des dixièmes est 5")
        l2 = self.bloc(["le chiffre des dixièmes est 5,", "on monte :"], 30)
        self.col(l2, 1.45)
        self.play(FadeIn(l2[0], shift=UP * 0.1), Indicate(c1[2], color=MONTE_C, scale_factor=1.8), run_time=0.4)
        self.au_mot("on monte : 46")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("46")
        g1 = self.gros("46", fs=50)
        g1.next_to(l2[1], RIGHT, buff=0.35).shift(DOWN * 0.3)
        self.play(FadeIn(g1, scale=1.3), run_time=0.35)
        self.au_mot("Au dixième")
        l3 = self.t("Au dixième :", 34, AMBRE_D)
        self.col(l3, -0.2)
        self.play(FadeIn(t2), *[FadeIn(c, scale=1.4) for c in c2], FadeIn(l3, shift=UP * 0.1), run_time=0.4)
        self.au_mot("le chiffre des centièmes est 8")
        l4 = self.bloc(["le chiffre des centièmes est 8,", "on monte :"], 30)
        self.col(l4, -1.05)
        self.play(FadeIn(l4[0], shift=UP * 0.1), Indicate(c2[3], color=MONTE_C, scale_factor=1.8), run_time=0.4)
        self.au_mot("on monte : 45,6")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("45,6")
        g2 = self.gros("45,6", fs=50)
        g2.next_to(l4[1], RIGHT, buff=0.35).shift(DOWN * 0.3)
        self.play(FadeIn(g2, scale=1.3), run_time=0.35)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        fig = tuiles_chiffres(0.62, 38)
        VGroup(fig.garde, fig.monte).arrange(DOWN, buff=0.7)
        cg = SurroundingRectangle(fig.garde, color=GARDE_C, buff=0.1, corner_radius=0.1)
        cm = SurroundingRectangle(fig.monte, color=MONTE_C, buff=0.1, corner_radius=0.1)
        tg = hors_audit(Text("on garde", font_size=30, color=GARDE_C).next_to(cg, DOWN, buff=0.12))
        tm = hors_audit(Text("on monte", font_size=30, color=MONTE_C).next_to(cm, DOWN, buff=0.12))
        fig = VGroup(fig, cg, cm, tg, tm)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Pour arrondir, on regarde le chiffre", "juste après le rang voulu."),
            ("De 0 à 4 :", "on garde."),
            ("De 5 à 9 :", "on monte.")], fs=36)
        self.au_mot("Pour arrondir")
        self.montrer_ligne(lignes[0])
        self.au_mot("De 0 à 4")
        self.montrer_ligne(lignes[1], Indicate(fig[0].garde, color=GARDE_C, scale_factor=1.1))
        self.au_mot("De 5 à 9")
        self.montrer_ligne(lignes[2], Indicate(fig[0].monte, color=MONTE_C, scale_factor=1.1))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_droite()
        self.ecran_regle()
        self.ecran_garder()
        self.ecran_question1()
        self.ecran_dixieme()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class DecimalArrondir6e(DecimalArrondirBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
