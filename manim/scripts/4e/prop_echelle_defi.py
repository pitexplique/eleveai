# prop_echelle_defi.py
# EleveAI — Maths 4e — série « Proportionnalité », lot 2 (échelles), épisode
# 10 PROPRE À LA 4e : DÉFIS SUR LES ÉCHELLES (micro du coach : echelle_defi,
# notion prop_echelle), AVEC VOIX. Paysage 16:9, CEINTURE VERTE (« un défi
# garde la verte »). Short jumeau : prop_echelle_defi_short.py (blanche).
# ⭐ Méthode travaillée : l'échelle-fraction 1/25 000 (1 cm ↔ 25 000 cm),
# les CONVERSIONS cm → m → km (÷ 100 puis ÷ 1 000), RETROUVER une échelle
# (longueur réelle ÷ longueur de la carte, dans la MÊME unité). Pas de
# produit en croix (multiplication, conversions, division) ; « ÷ » écrit.
# ⭐ Le geste (canvas `echelle` du coach) : CARTE courte en bleu, RÉALITÉ
# longue en vert, flèche ambre avec l'opération.
# ⭐ Leurres (consigne-videos-proportionnalite.md, erreur 5 : oublier ou
# rater la conversion) : question 1 : 50 m (÷ 1 000 au lieu de ÷ 100),
# 5 km (÷ 10 000 au lieu de ÷ 100 000) ; question 2 : 1/5 (unités
# mélangées, 5 cm pour 1 km), 1/200 (km convertis en m au lieu de cm,
# 1 000 ÷ 5) ; écran 07 : « 1/2 » (6 cm pour 3 km) barré.
#
# Décor et métier : MONTAGNE, Mathis, GUIDE DE MONTAGNE, carte de randonnée
# au 1/25 000 (l'échelle des cartes de randonnée TOP 25 de l'IGN : fait
# connu, pas de chiffre réel dans la voix à part l'échelle elle-même). Le
# sentier de 12 cm, le lac de 2 cm, les refuges à 3 km, la sortie de 7,5 km
# sont inventés : rien à sourcer, rien de faux.
# Centres d'intérêt : course-trail, nature-ecologie.
#
# Écrans : 00 garde · 01 Mathis et le sentier de 12 cm · 02 12 × 25 000 =
# 300 000 cm · 03 on convertit (÷ 100, ÷ 1 000) : 3 km · 04 l'astuce 4 cm
# = 1 km · 05 QUESTION 1 (le lac) · 06 retrouver l'échelle 1/50 000 ·
# 07 le piège des unités · 08 QUESTION 2 (5 cm pour 1 km) · 09 défi 7,5 km ·
# 09b correction 30 cm · 10 ce que tu as appris · 11 fin.
#
# Voix : manim/voix/4e-prop-echelle-defi.json (validée par Frédéric, débit
# −10), WAV dans public/sons/4e-prop-echelle-defi/ ; marques mot à mot :
# manim/scripts/4e/prop_echelle_defi_marques.json (scripts/marques_dump.ps1
# puis scripts/cues2marques.py).
# Outils : manim/scripts/6e/prop_commun.py + manim/canvas_proportion.py (non
# modifiés). Ajouté ICI : Correspondance, cartouche(), gras(), sans()
# RECOPIÉES du défi 6e (prop_echelle_defi.py, lui-même de
# prop_echelle_reelle.py ; non modifiés) ; EchelleCarte du module n'est PAS
# utilisée (« 1 cm pour 25 000 cm » seulement, segment fixe, texte de
# l'échelle jamais ajouté au groupe) ; mathis(), montagne(), carte_rando().
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/prop_echelle_defi.py PropEchelleDefi4e
# PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/4e/prop_echelle_defi.py PropEchelleDefi4e -o eleveai-maths-4e-prop-echelle-defi --media_dir manim/media-prop-10-4e
# Sortie : manim/sorties/4e/maths/proportionnalite/10-echelle-defi/eleveai-maths-4e-prop-echelle-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

from prop_commun import *  # noqa: E402,F403

BLEU_P = "#2563eb"     # la CARTE (canvas echelle du coach)
BLEU_P2 = "#60a5fa"
VERT_R = "#16a34a"     # la RÉALITÉ
VERT_R2 = "#15803d"
AMBRE_F = "#f59e0b"    # la flèche
AMBRE_T = "#b45309"    # son étiquette, lisible sur la carte blanche
ARDOISE = "#475569"
ENCRE = "#0f172a"
ROCHE = "#78716c"
BRUN = "#a16207"


def gras(s, fs, couleur):
    return Text(s, font_size=fs, color=couleur, weight=BOLD)


def sans(m):
    """Un décor ou un libellé redit partout : ni attente de synchro, ni audit."""
    for f in m.get_family():
        if isinstance(f, Text):
            f.sans_synchro = True
            f._pas_audit = True
    return m


class Correspondance(VGroup):
    """RECOPIÉE du défi 6e (prop_echelle_defi.py ← prop_echelle_reelle.py) :
    la figure `echelle` du coach. Carte blanche, « CARTE » et sa ligne BLEUE
    (courte), « RÉALITÉ » et sa ligne VERTE (longue), flèche AMBRE avec
    l'opération. up / ur : longueur à l'écran d'une unité de la carte / de la
    réalité. (Seul changement : le libellé « PLAN » devient « CARTE ».)"""

    def __init__(self, up, ur, long_reel=4.2, centre=ORIGIN, hauteur=3.5, fs=30, lib_haut="CARTE", **kw):
        super().__init__(**kw)
        self.up, self.ur, self.fs = up, ur, fs
        larg = 2.0 + long_reel + 1.15
        self.carte = RoundedRectangle(width=larg, height=hauteur, corner_radius=0.22, fill_color=WHITE,
                                      fill_opacity=1, stroke_color="#cbd5e1", stroke_width=3)
        self.carte.move_to(centre)
        g = self.carte.get_left()[0]
        self.x0 = g + 1.85
        self.y_p = self.carte.get_top()[1] - 0.3 * hauteur
        self.y_r = self.carte.get_bottom()[1] + 0.3 * hauteur
        self.lib_p = gras(lib_haut, 22, ARDOISE).move_to(P(g + 0.85, self.y_p))
        self.lib_r = gras("RÉALITÉ", 22, ARDOISE).move_to(P(g + 0.85, self.y_r))
        for t in (self.lib_p, self.lib_r):
            t.sans_synchro = True
        self.fond = VGroup(self.carte, self.lib_p, self.lib_r)
        self.add(self.fond)

    def xp(self, a):
        return self.x0 + a * self.up

    def xr(self, a):
        return self.x0 + a * self.ur

    def _seg(self, x0, x1, y, couleur, sw=9, bouts=True):
        ligne = Line(P(x0, y), P(x1, y), color=couleur, stroke_width=sw)
        if not bouts:
            return VGroup(ligne)
        return VGroup(ligne, Dot(P(x0, y), radius=0.065, color=ENCRE), Dot(P(x1, y), radius=0.065, color=ENCRE))

    def plan(self, a, b, couleur=BLEU_P, bouts=True):
        return self._seg(self.xp(a), self.xp(b), self.y_p, couleur, bouts=bouts)

    def reel(self, a, b, couleur=VERT_R, bouts=True):
        return self._seg(self.xr(a), self.xr(b), self.y_r, couleur, bouts=bouts)

    def ticks(self, n, a=0):
        return VGroup(*[Line(P(self.xp(k), self.y_p + 0.14), P(self.xp(k), self.y_p - 0.14), color=ENCRE,
                             stroke_width=3) for k in range(a, n + 1)])

    def lab_p(self, a, b, s, couleur=BLEU_P, fs=None):
        return gras(s, fs or self.fs, couleur).move_to(P((self.xp(a) + self.xp(b)) / 2, self.y_p + 0.42))

    def lab_r(self, a, b, s, couleur=VERT_R, fs=None, dessus=False):
        dy = 0.38 if dessus else -0.42
        return gras(s, fs or self.fs, couleur).move_to(P((self.xr(a) + self.xr(b)) / 2, self.y_r + dy))

    def fleche(self, s, a_plan, a_reel, couleur=AMBRE_F, cote=RIGHT):
        d = P(self.xp(a_plan) + 0.25, self.y_p - 0.2)
        f = P(self.xr(a_reel) + 0.3, self.y_r + 0.2)
        fl = CurvedArrow(d, f, angle=-0.9, color=couleur, stroke_width=6, tip_length=0.22)
        et = gras(s, self.fs + 2, AMBRE_T)
        et.next_to(fl.point_from_proportion(0.55), cote, buff=0.12)
        droite = self.carte.get_right()[0] - 0.12
        if et.get_right()[0] > droite:
            et.shift(LEFT * (et.get_right()[0] - droite))
        g = VGroup(fl, et)
        g.fleche, g.etiquette = fl, et
        return g


def cartouche(cm, reel, fs=34, fl="→"):
    """RECOPIÉE du défi 6e : « 1 cm → 25 000 cm » encadré ; .cm, .fl, .reel,
    .cadre à montrer au mot."""
    a = gras(cm, fs, BLEU_CALCUL)
    f = Text(fl, font_size=fs, color=WHITE)
    b = gras(reel, fs, VERT_OK)
    lg = VGroup(a, f, b).arrange(RIGHT, buff=0.2)
    cadre = SurroundingRectangle(lg, color=AMBRE, buff=0.18, corner_radius=0.12, stroke_width=4)
    g = VGroup(cadre, lg)
    g.cm, g.fl, g.reel, g.cadre = a, f, b, cadre
    return g


# ── le décor : Mathis, guide de montagne ────────────────────────────────────
def mathis(s=1.0):
    """Mathis, guide : veste rouge, bonnet, sac à dos orange, bâton."""
    p = personne(peau="#8d5524", tenue="#dc2626", cheveux="#1e3a8a", s=1.0)
    sac = RoundedRectangle(width=0.55, height=0.95, corner_radius=0.12, fill_color="#f97316", fill_opacity=1,
                           stroke_color="#7c2d12", stroke_width=2).move_to(P(-0.72, -0.95))
    sangle = Line(P(-0.45, -0.5), P(-0.2, -1.2), color="#7c2d12", stroke_width=5)
    baton = Line(P(0.95, 0.1), P(1.1, -1.95), color="#e5e7eb", stroke_width=6)
    main = Circle(radius=0.11, fill_color="#8d5524", fill_opacity=1, stroke_width=0).move_to(P(0.96, -0.6))
    g = VGroup(sac, p, sangle, baton, main)
    g.corps = p.corps
    return g.scale(s)


def montagne(s=1.0):
    """Deux sommets, de la neige, un drapeau au plus haut."""
    st = dict(fill_opacity=1, stroke_color="#44403c", stroke_width=2)
    m1 = Polygon(P(-1.6, -0.8), P(-0.4, 0.9), P(0.6, -0.8), fill_color=ROCHE, **st)
    m2 = Polygon(P(-0.6, -0.8), P(0.6, 1.3), P(1.7, -0.8), fill_color="#57534e", **st)
    neige = Polygon(P(0.6, 1.3), P(0.32, 0.82), P(0.5, 0.92), P(0.62, 0.78), P(0.88, 0.82), fill_color=WHITE,
                    fill_opacity=1, stroke_width=0)
    mat = Line(P(0.6, 1.3), P(0.6, 1.75), color=WHITE, stroke_width=3)
    dra = Polygon(P(0.6, 1.75), P(0.95, 1.63), P(0.6, 1.5), fill_color="#ef4444", fill_opacity=1, stroke_width=0)
    return VGroup(m1, m2, neige, mat, dra).scale(s)


def carte_rando(l=4.4, h=3.2):
    """Une carte de randonnée vue de haut : courbes de niveau, un lac, le
    sommet, le sentier en pointillés (.sentier, .lac, .sommet, .fond)."""
    fond = RoundedRectangle(width=l, height=h, corner_radius=0.2, fill_color="#ecfccb", fill_opacity=1,
                            stroke_color="#84cc16", stroke_width=4)
    c = P(l * 0.22, h * 0.12)
    courbes = VGroup(*[Ellipse(width=l * k, height=h * k * 0.8, color="#b45309", stroke_width=2,
                               stroke_opacity=0.6).move_to(c) for k in (0.18, 0.34, 0.5)])
    sommet = Triangle(fill_color="#78350f", fill_opacity=1, stroke_width=0).scale(0.1).move_to(c)
    lac = Ellipse(width=l * 0.2, height=h * 0.14, fill_color="#38bdf8", fill_opacity=1, stroke_width=0).move_to(
        P(-l * 0.28, h * 0.22))
    sentier = DashedVMobject(VMobject(stroke_color="#dc2626", stroke_width=6).set_points_smoothly(
        [P(-l * 0.4, -h * 0.36), P(-l * 0.15, -h * 0.22), P(-l * 0.02, -h * 0.05), P(l * 0.1, -h * 0.05), c]),
        num_dashes=18)
    g = VGroup(fond, courbes, lac, sentier, sommet)
    g.fond, g.sentier, g.lac, g.sommet = fond, sentier, lac, sommet
    return g


def refuge(s=1.0):
    mur = Square(0.5, fill_color="#fde68a", fill_opacity=1, stroke_color=ENCRE, stroke_width=2)
    toit = Polygon(P(-0.33, 0.25), P(0.33, 0.25), P(0, 0.55), fill_color="#b91c1c", fill_opacity=1,
                   stroke_color=ENCRE, stroke_width=2)
    return VGroup(mur, toit).scale(s)


class PropEchelleDefiBase(PaysageProp):
    nom_voix = "4e-prop-echelle-defi"
    fichier_marques = "prop_echelle_defi_marques.json"

    def ligne_rep(self, i, morceaux, fs=None):
        """Celle de prop_tableau.py : la ligne de réponse garde la taille de la
        phrase qu'elle remplace, bornée à droite (BORD_X)."""
        lg = super().ligne_rep(i, morceaux, fs)
        ref = self.ph_q[i]
        lg.scale_to_fit_width(ref.width).move_to(ref).align_to(ref, LEFT)
        g = lg.get_left()[0]
        if lg.get_right()[0] > self.BORD_X - 0.05:
            lg.scale_to_fit_width(self.BORD_X - 0.05 - g).align_to(P(g, 0), LEFT)
        return lg

    def lc(self, morceaux, y, fs=40, xl=1.3):
        """Une ligne de la colonne de droite (non jouée)."""
        return self.col(self.ligne(morceaux, fs), y, xl)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défis sur les échelles", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Défis")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        mt = montagne(0.9).move_to(P(-3.6, 0.55))
        self.play(FadeIn(mt, shift=UP * 0.2), run_time=0.6)
        q = VGroup(self.t("Les cartes de randonnée", 38), self.t("au 1/25 000", 44, VERT_OK))
        q.arrange(DOWN, buff=0.16).move_to(P(2.9, 0.45))
        self.au_mot("Les cartes")
        self.play(FadeIn(q[0], shift=UP * 0.15), run_time=0.4)
        self.au_mot("25 000")
        self.play(FadeIn(q[1], scale=1.2), run_time=0.45)
        self.insister(q[1], 1.15, 0.25)
        self.attendre_voix(marge=0.6)

    # ── 01 : Mathis, guide ; le sentier mesure 12 cm sur la carte ───────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = mathis(0.9).move_to(P(-5.5, -0.85))
        nom = self.t("Mathis", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.25)
        self.au_mot("Voici Mathis")
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        met = self.t("guide de montagne", 28, BLEU_CALCUL).next_to(pers, DOWN, buff=0.15)
        met.shift(RIGHT * max(0, -6.45 - met.get_left()[0]))
        mt = montagne(0.55).move_to(P(-4.2, 2.35))
        self.au_mot("guide")
        self.play(FadeIn(met, shift=DOWN * 0.1), FadeIn(mt, shift=UP * 0.2), run_time=0.5)
        ca = carte_rando().move_to(P(-1.05, 0.35))
        self.au_mot("Ses cartes")
        self.play(FadeIn(ca, scale=0.9), run_time=0.6)
        L0 = self.lc([("Échelle :", WHITE), ("1/25 000", VERT_OK)], 2.2, xl=1.6)
        self.au_mot("l'échelle")
        self.play(FadeIn(L0[0], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("25 000")
        self.play(FadeIn(L0[1], scale=1.3), run_time=0.4)
        L1 = self.lc([("Sentier :", WHITE), ("12 cm", BLEU_CALCUL)], 1.3, xl=1.6)
        self.au_mot("Le sentier")
        self.play(FadeIn(L1[0], shift=RIGHT * 0.2), ca.sentier.animate.set_color(BLEU_P), run_time=0.5)
        l12 = gras("12 cm", 32, BLEU_P).next_to(ca.sentier, DOWN, buff=0.12).shift(RIGHT * 0.4)
        self.au_mot("12 cm")
        self.play(FadeIn(L1[1], scale=1.3), FadeIn(l12, scale=1.3), run_time=0.45)
        self.insister(l12, 1.2, 0.2)
        L2 = self.lc([("En vrai :", WHITE), ("? km", ORANGE_RETENUE)], 0.4, fs=44, xl=1.6)
        L2[1].sans_synchro = True
        self.au_mot("Combien")
        self.play(FadeIn(L2, shift=RIGHT * 0.2), Indicate(ca.sommet, color=ROUGE_P, scale_factor=2), run_time=0.5)
        self.play(Indicate(L2[1], color=ORANGE_RETENUE, scale_factor=1.3), run_time=0.6)
        self.attendre_voix()

    # ── 02 : 1 cm → 25 000 cm ; 12 × 25 000 = 300 000 cm ────────────────────
    def ecran_calcul(self):
        self.ecran("02-calcul")
        co = Correspondance(0.2, 0.35, centre=P(-2.9, 0.35))
        tit = self.col(sans(self.t("Au 1/25 000 :", 34, WHITE)), 2.6, 1.3)
        self.play(FadeIn(co.fond, shift=UP * 0.2), FadeIn(tit), run_time=0.4)
        car = cartouche("1 cm", "25 000 cm", 32)
        self.col(car, 1.75, 1.3)
        p1, r1 = co.plan(0, 1, BLEU_P2), co.reel(0, 1, "#86efac")
        lp1 = co.lab_p(0, 1, "1 cm", fs=24)
        lr1 = co.lab_r(0, 1, "25 000 cm", fs=22).align_to(P(co.xr(0) - 0.1, 0), LEFT)
        self.au_mot("1 cm")
        self.play(Create(car.cadre), FadeIn(car.cm, scale=1.3), Create(p1), FadeIn(lp1, scale=1.3), run_time=0.5)
        self.au_mot("25 000 cm")
        self.play(FadeIn(car.fl, shift=RIGHT * 0.2), FadeIn(car.reel, scale=1.3), Create(r1),
                  FadeIn(lr1, scale=1.3), run_time=0.5)
        self.insister(car, 1.06, 0.2)
        self.au_mot("12 cm")
        self.play(FadeOut(lp1), FadeOut(lr1), Create(co.plan(0, 12)), Create(co.ticks(12)),
                  FadeIn(co.lab_p(0, 12, "12 cm"), scale=1.3), run_time=0.6)
        L1 = self.lc([("12 ×", WHITE), ("25 000", WHITE)], 0.55, fs=44)
        fl = co.fleche("× 25 000", 12, 12, cote=LEFT)
        self.au_mot("12 fois")
        self.play(FadeIn(L1[0], shift=RIGHT * 0.2), Create(fl.fleche), run_time=0.4)
        self.au_mot("25 000", 3)
        self.play(FadeIn(L1[1], scale=1.2), FadeIn(fl.etiquette, scale=1.3), run_time=0.4)
        L2 = self.lc([("=", WHITE), ("300 000 cm", VERT_OK)], -0.35, fs=46)
        self.au_mot("égale")
        self.play(FadeIn(L2[0]), Create(co.reel(0, 12)), run_time=0.45)
        self.au_mot("300 000")
        self.play(FadeIn(L2[1], scale=1.3), FadeIn(co.lab_r(0, 12, "300 000 cm"), scale=1.3), run_time=0.45)
        self.insister(L2[1], 1.15, 0.25)
        self.attendre_voix()

    # ── 03 : on convertit : ÷ 100 puis ÷ 1 000 → 3 km ───────────────────────
    def boite(self, s, couleur, centre):
        t = gras(s, 40, couleur)
        cadre = SurroundingRectangle(t, color=couleur, buff=0.2, corner_radius=0.14, stroke_width=4)
        g = VGroup(cadre, t).move_to(centre)
        g.t = t
        return g

    def descente(self, a, b, s):
        """La flèche d'une marche de l'escalier (de la boîte a à la boîte b)."""
        fl = CurvedArrow(a.get_bottom() + DOWN * 0.05, b.get_left() + LEFT * 0.08, angle=0.9, color=AMBRE_F,
                         stroke_width=6, tip_length=0.22)
        et = gras(s, 34, AMBRE).next_to(fl.point_from_proportion(0.5), LEFT, buff=0.15)
        g = VGroup(fl, et)
        g.fleche, g.etiquette = fl, et
        return g

    def ecran_convertir(self):
        self.ecran("03-convertir")
        tit = self.t("On convertit", 46, JAUNE_TITRE).move_to(P(-3.0, 3.1))
        self.au_mot("On convertit")
        self.play(Write(tit), run_time=0.5)
        b1 = self.boite("300 000 cm", VERT_OK, P(-4.0, 1.75))
        b2 = self.boite("3 000 m", VERT_OK, P(-2.4, 0.05))
        b3 = self.boite("3 km", VERT_OK, P(-0.9, -1.65))
        d1, d2 = self.descente(b1, b2, "÷ 100"), self.descente(b2, b3, "÷ 1 000")
        sans(d1.etiquette), sans(d2.etiquette)
        R1 = self.lc([("100 cm", BLEU_CALCUL), ("=", WHITE), ("1 m", VERT_OK)], 2.2, fs=42, xl=1.8)
        self.au_mot("100 cm")
        self.play(FadeIn(R1[0], scale=1.3), run_time=0.35)
        self.au_mot("1 m")
        self.play(FadeIn(R1[1]), FadeIn(R1[2], scale=1.3), run_time=0.35)
        self.au_mot("300 000")
        self.play(FadeIn(b1, scale=1.2), run_time=0.4)
        self.au_mot("3 000 m")
        self.play(Create(d1.fleche), FadeIn(d1.etiquette, scale=1.3), FadeIn(b2, scale=1.2), run_time=0.55)
        R2 = self.lc([("1 000 m", BLEU_CALCUL), ("=", WHITE), ("1 km", VERT_OK)], 1.3, fs=42, xl=1.8)
        self.au_mot("1 000 m")
        self.play(FadeIn(R2[0], scale=1.3), run_time=0.35)
        self.au_mot("1 km")
        self.play(FadeIn(R2[1]), FadeIn(R2[2], scale=1.3), run_time=0.35)
        self.au_mot("3 000 m", 2)
        self.play(Indicate(b2, color=AMBRE, scale_factor=1.1), run_time=0.5)
        self.au_mot("3 km")
        self.play(Create(d2.fleche), FadeIn(d2.etiquette, scale=1.3), FadeIn(b3, scale=1.2), run_time=0.55)
        pers = mathis(0.6).move_to(P(3.1, -1.0))
        mt = montagne(0.55).move_to(P(4.6, -0.75))
        fin = self.col(self.t("Mathis marchera 3 km !", 38, VERT_OK), 0.25, 1.8)
        self.au_mot("Mathis marchera")
        self.play(FadeIn(fin, shift=UP * 0.15), FadeIn(pers, shift=RIGHT * 0.3), FadeIn(mt), run_time=0.5)
        self.insister(b3, 1.25, 0.25)
        self.attendre_voix()

    # ── 04 : l'astuce : 4 cm → 100 000 cm = 1 km ────────────────────────────
    def ecran_astuce(self):
        self.ecran("04-astuce")
        tit = self.t("Une astuce", 46, JAUNE_TITRE).move_to(P(-3.0, 3.1))
        self.au_mot("Une astuce")
        self.play(Write(tit), run_time=0.5)
        co = Correspondance(0.5, 0.95, centre=P(-2.9, 0.3))
        self.play(FadeIn(co.fond, shift=UP * 0.2), run_time=0.35)
        L0 = self.lc([("Au 1/25 000 :", WHITE)], 2.2, fs=38)
        self.au_mot("25 000")
        self.play(FadeIn(L0, shift=RIGHT * 0.2), run_time=0.35)
        L1 = self.lc([("4 cm", BLEU_CALCUL), ("→", WHITE), ("100 000 cm", VERT_OK)], 1.3, fs=44)
        self.au_mot("4 cm")
        self.play(FadeIn(L1[0], scale=1.3), Create(co.plan(0, 4)), Create(co.ticks(4)),
                  FadeIn(co.lab_p(0, 4, "4 cm"), scale=1.3), run_time=0.5)
        self.au_mot("100 000")
        self.play(FadeIn(L1[1]), FadeIn(L1[2], scale=1.3), Create(co.reel(0, 4)),
                  FadeIn(co.lab_r(0, 4, "100 000 cm"), scale=1.2), run_time=0.5)
        car = cartouche("4 cm", "1 km", 50)
        sans(car.cm)
        self.col(car, 0.1, 1.3)
        self.au_mot("1 km")
        self.play(Create(car.cadre), FadeIn(car.cm), FadeIn(car.fl), FadeIn(car.reel, scale=1.3), run_time=0.5)
        self.insister(car, 1.15, 0.25)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (le lac de 2 cm au 1/25 000) ────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        ca = carte_rando(5.0, 3.4).move_to(P(-3.0, 0.4))
        ca.lac.scale(1.8)
        self.add(ca)
        co = Correspondance(0.5, 2.0, centre=P(-2.9, 0.3))

        def apres(sc):
            sc.play(FadeOut(ca), FadeIn(co.fond), Create(co.plan(0, 2)), Create(co.ticks(2)),
                    FadeIn(sans(co.lab_p(0, 2, "2 cm")), scale=1.2), run_time=0.25)
            l0 = sc.ligne_rep(0, ["2 ×", "25 000 =", "50 000 cm"])
            l1 = sc.ligne_rep(1, ["c'est", "500 m."])
            sc.au_mot("2 fois")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("25 000")
            sc.play(FadeIn(l0[1], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("50 000")
            sc.play(FadeIn(l0[2], scale=1.3), Create(co.reel(0, 2)), run_time=0.4)
            sc.au_mot("500 m")
            sc.play(FadeIn(l1, scale=1.2), FadeIn(co.lab_r(0, 2, "500 m"), scale=1.3), run_time=0.4)
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse",
                            ["Carte au 1/25 000.", "Un lac mesure 2 cm", "sur la carte.", "Combien en vrai ?"],
                            [self.t("50 m", 34), self.t("500 m", 34), self.t("5 km", 34)], 1,
                            ["2 × 25 000 = 50 000 cm,", "c'est 500 m."], mot_q="Carte au", autres_r=apres)

    # ── 06 : défi : retrouver l'échelle (6 cm pour 3 km → 1/50 000) ─────────
    def ecran_retrouver(self):
        self.ecran("06-retrouver")
        tit = self.t("Retrouver l'échelle", 44, JAUNE_TITRE).move_to(P(-2.9, 3.1))
        self.au_mot("Défi")
        self.play(Write(tit), run_time=0.5)
        co = Correspondance(0.4, 0.7, centre=P(-2.9, 0.3))
        r1 = refuge(0.8).move_to(P(co.xr(0), co.y_r + 0.45))
        r2 = refuge(0.8).move_to(P(co.xr(6), co.y_r + 0.45))
        self.au_mot("Deux refuges")
        self.play(FadeIn(co.fond, shift=UP * 0.2), FadeIn(r1, shift=DOWN * 0.2), FadeIn(r2, shift=DOWN * 0.2),
                  run_time=0.5)
        l3 = co.lab_r(0, 6, "3 km")
        self.au_mot("3 km")
        self.play(Create(co.reel(0, 6)), FadeIn(l3, scale=1.3), run_time=0.5)
        self.au_mot("6 cm")
        self.play(Create(co.plan(0, 6)), Create(co.ticks(6)), FadeIn(co.lab_p(0, 6, "6 cm"), scale=1.3),
                  run_time=0.5)
        L1 = self.lc([("3 km", VERT_OK), ("=", WHITE), ("300 000 cm", VERT_OK)], 2.2, fs=40)
        self.au_mot("3 km, c'est")
        self.play(FadeIn(L1[0], scale=1.2), Indicate(l3, color=VERT_R2), run_time=0.4)
        l300 = co.lab_r(0, 6, "300 000 cm")
        self.au_mot("300 000 cm")
        self.play(FadeIn(L1[1]), FadeIn(L1[2], scale=1.3), Transform(l3, l300), run_time=0.45)
        L2 = self.lc([("300 000 ÷", WHITE), ("6 =", WHITE), ("50 000", VERT_OK)], 1.3, fs=42)
        self.au_mot("300 000 divisé")
        self.play(FadeIn(L2[0], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("par 6")
        self.play(FadeIn(L2[1], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("égale 50 000")
        self.play(FadeIn(L2[2], scale=1.3), run_time=0.4)
        fl = co.fleche("× 50 000", 6, 6, cote=LEFT)
        car = cartouche("Échelle", "1/50 000", 34, fl=":")
        car.cm.set_color(WHITE)
        self.col(car, 0.2, 1.3)
        self.au_mot("L'échelle est")
        self.play(Create(car.cadre), FadeIn(car.cm), FadeIn(car.fl), Create(fl.fleche), run_time=0.4)
        self.au_mot("1 sur 50 000")
        self.play(FadeIn(car.reel, scale=1.3), FadeIn(fl.etiquette, scale=1.3), run_time=0.4)
        self.insister(car, 1.06, 0.25)
        self.attendre_voix()

    # ── 07 : le piège : la même unité des deux côtés ────────────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        tit = self.t("Attention au piège !", 44, ROUGE_ERREUR).move_to(P(-2.9, 3.1))
        self.au_mot("Attention")
        self.play(Write(tit), run_time=0.5)
        L0 = self.lc([("Même unité", AMBRE)], 2.45, fs=38)
        L0b = self.lc([("des deux côtés !", AMBRE)], 1.8, fs=38)
        self.au_mot("la même unité")
        self.play(FadeIn(L0, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("des deux côtés")
        self.play(FadeIn(L0b, shift=RIGHT * 0.2), run_time=0.4)
        g1 = sans(gras("6 cm", 56, BLEU_P2)).move_to(P(-5.0, 1.3))
        g2 = sans(gras("3 km", 56, VERT_OK)).move_to(P(-1.6, 1.3))
        pour = sans(self.t("pour", 40))
        VGroup(g1, pour, g2).arrange(RIGHT, buff=0.35).move_to(P(-3.2, 1.3))
        self.au_mot("6 cm")
        self.play(FadeIn(g1, scale=1.3), FadeIn(pour), run_time=0.4)
        self.au_mot("3 km")
        self.play(FadeIn(g2, scale=1.3), run_time=0.4)
        cm = sans(gras("cm", 40, ROUGE_ERREUR)).next_to(g1, DOWN, buff=0.35)
        km = sans(gras("km", 40, ROUGE_ERREUR)).next_to(g2, DOWN, buff=0.35)
        neq = sans(gras("≠", 50, ROUGE_ERREUR)).move_to(P(pour.get_x(), cm.get_y()))
        faux = gras("1/2", 70, ROUGE_ERREUR).move_to(P(pour.get_x(), -1.2))
        self.au_mot("n'est pas")
        self.play(FadeIn(cm, scale=1.3), FadeIn(km, scale=1.3), FadeIn(neq, scale=1.4), run_time=0.4)
        self.au_mot("1 sur 2")
        self.play(FadeIn(faux, scale=1.3), run_time=0.35)
        cr = croix(faux, sw=8)
        self.play(Create(cr), run_time=0.35)
        L1 = self.lc([("D'abord :", WHITE), ("km", VERT_OK), ("→", WHITE), ("cm", BLEU_CALCUL)], 0.9, fs=38)
        self.au_mot("On convertit")
        self.play(FadeIn(L1[0], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("les km")
        self.play(FadeIn(L1[1], scale=1.3), FadeIn(L1[2]), run_time=0.35)
        self.au_mot("en cm")
        self.play(FadeIn(L1[3], scale=1.3), run_time=0.35)
        self.insister(L1, 1.12, 0.2)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (5 cm pour 1 km : quelle échelle ?) ─────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        deco = VGroup(carte_rando(5.0, 3.4).move_to(P(-3.0, 0.4)))
        self.add(deco)
        co = Correspondance(0.5, 0.84, centre=P(-2.9, 0.3))

        def apres(sc):
            sc.play(FadeOut(deco), FadeIn(co.fond), Create(co.plan(0, 5)), Create(co.ticks(5)),
                    FadeIn(sans(co.lab_p(0, 5, "5 cm")), scale=1.2), Create(co.reel(0, 5)), run_time=0.25)
            lr = co.lab_r(0, 5, "1 km")
            l0 = sc.ligne_rep(0, ["1 km", "= 100 000 cm ;"])
            sc.au_mot("1 km")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), FadeIn(lr, scale=1.3), run_time=0.3)
            sc.au_mot("100 000 cm")
            sc.play(FadeIn(l0[1], scale=1.2), Transform(lr, co.lab_r(0, 5, "100 000 cm")), run_time=0.4)
            l1 = sc.ligne_rep(1, ["100 000 ÷", "5 =", "20 000."])
            sc.au_mot("100 000 divisé")
            sc.play(FadeIn(l1[0], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("par 5")
            sc.play(FadeIn(l1[1], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("20 000")
            sc.play(FadeIn(l1[2], scale=1.3), run_time=0.35)
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse",
                            ["Sur une carte,", "5 cm représentent 1 km.", "Quelle est l'échelle ?"],
                            [sans(self.t("1/5", 34)), sans(self.t("1/20 000", 34)), sans(self.t("1/200", 34))], 1,
                            ["1 km = 100 000 cm ;", "100 000 ÷ 5 = 20 000."], mot_q="Sur une carte",
                            autres_r=apres)

    # ── 09 : défi : une sortie de 7,5 km, combien de cm sur la carte ? ──────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-2.6, 3.1))
        self.au_mot("À toi de jouer")
        self.play(Write(tit), run_time=0.6)
        pers = mathis(0.85).move_to(P(-5.3, -0.6))
        mt = montagne(1.1).move_to(P(-2.4, 0.6))
        self.au_mot("Mathis prépare")
        self.play(FadeIn(pers, shift=RIGHT * 0.3), FadeIn(mt, shift=UP * 0.2), run_time=0.5)
        L0 = self.lc([("Sortie :", WHITE), ("7,5 km", VERT_OK)], 2.2, fs=42, xl=1.5)
        self.au_mot("une sortie")
        self.play(FadeIn(L0[0], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("7,5 km")
        self.play(FadeIn(L0[1], scale=1.3), run_time=0.4)
        ca = carte_rando(3.2, 2.2).move_to(P(-2.6, -1.75))
        L1 = self.lc([("Sur la carte :", WHITE), ("? cm", ORANGE_RETENUE)], 1.3, fs=42, xl=1.5)
        L1[1].sans_synchro = True
        self.au_mot("Combien de cm")
        self.play(FadeIn(ca, scale=0.9), run_time=0.45)
        L2 = self.lc([("Carte au", WHITE), ("1/25 000", VERT_OK)], 0.45, fs=40, xl=1.5)
        self.au_mot("sa carte")
        self.play(FadeIn(L1, shift=RIGHT * 0.2), ca.sentier.animate.set_color(BLEU_P), run_time=0.35)
        self.au_mot("25 000")
        self.play(FadeIn(L2, scale=1.1), run_time=0.4)
        self.play(Indicate(L1[1], color=ORANGE_RETENUE, scale_factor=1.3), run_time=0.5)
        self.pause_defi(y=-0.75)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-2.6, 3.1))
        self.play(Write(tit), run_time=0.5)
        co = Correspondance(0.12, 0.14, centre=P(-2.9, 0.05))
        self.play(FadeIn(co.fond, shift=UP * 0.2), run_time=0.35)
        L1 = self.lc([("7,5 km", VERT_OK), ("=", WHITE), ("750 000 cm", VERT_OK)], 2.2, fs=42)
        rap = sans(self.t("(1 km = 100 000 cm)", 28, "#94a3b8"))
        self.col(rap, 1.55, 1.3)
        lr = co.lab_r(0, 30, "7,5 km")
        self.au_mot("7,5 km")
        self.play(FadeIn(L1[0], scale=1.2), Create(co.reel(0, 30)), FadeIn(lr, scale=1.3), run_time=0.45)
        self.au_mot("750 000 cm")
        self.play(FadeIn(L1[1]), FadeIn(L1[2], scale=1.3), FadeIn(rap), Transform(lr, co.lab_r(0, 30, "750 000 cm")),
                  run_time=0.45)
        L2 = self.lc([("750 000 ÷", WHITE), ("25 000", WHITE)], 0.75, fs=42)
        fl = CurvedArrow(P(co.xr(30) + 0.3, co.y_r + 0.2), P(co.xp(30) + 0.3, co.y_p - 0.2), angle=0.9,
                         color=AMBRE_F, stroke_width=6, tip_length=0.22)
        et = gras("÷ 25 000", 30, AMBRE_T).next_to(fl, LEFT, buff=0.1)
        self.au_mot("750 000 divisé")
        self.play(FadeIn(L2[0], shift=RIGHT * 0.2), Create(fl), run_time=0.4)
        self.au_mot("25 000")
        self.play(FadeIn(L2[1], scale=1.2), FadeIn(et, scale=1.3), run_time=0.4)
        L3 = self.lc([("=", WHITE), ("30", BLEU_CALCUL)], -0.1, fs=46)
        self.au_mot("égale 30")
        self.play(FadeIn(L3[0]), FadeIn(L3[1], scale=1.3), Create(co.plan(0, 30)), run_time=0.45)
        car = cartouche("Trajet", "30 cm", 40, fl=":")
        car.cm.set_color(WHITE)
        self.col(car, -1.1, 1.3)
        self.au_mot("Le trajet")
        self.play(Create(car.cadre), FadeIn(car.cm), FadeIn(car.fl), run_time=0.35)
        self.au_mot("30 cm")
        self.play(FadeIn(car.reel, scale=1.3), FadeIn(co.lab_p(0, 30, "30 cm"), scale=1.3), run_time=0.4)
        self.insister(car, 1.06, 0.25)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        co = Correspondance(0.6, 2.0, long_reel=2.4, centre=ORIGIN)
        fig = VGroup(co.fond, co.plan(0, 1), co.lab_p(0, 1, "1 cm"), co.reel(0, 1),
                     co.lab_r(0, 1, "25 000 cm", fs=26))
        fl = co.fleche("× 25 000", 1, 1, cote=LEFT)
        fig.add(fl)
        sans(fig)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("1/25 000 : 1 cm sur la carte,", "25 000 cm en vrai."),
            ("Les deux longueurs", "dans la même unité."),
            ("Retrouver l'échelle : longueur", "réelle ÷ longueur sur la carte.")], fs=34)
        self.au_mot("L'échelle 1 sur")
        self.montrer_ligne(lignes[0], Indicate(fig[1], color=BLEU_P2))
        self.au_mot("On met")
        self.montrer_ligne(lignes[1])
        self.au_mot("Pour retrouver")
        self.montrer_ligne(lignes[2], Indicate(fl, color=AMBRE))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_calcul()
        self.ecran_convertir()
        self.ecran_astuce()
        self.ecran_question1()
        self.ecran_retrouver()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class PropEchelleDefi4e(PropEchelleDefiBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"
