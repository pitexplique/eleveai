# prop_echelle_reelle.py
# EleveAI — Maths 6e ET 4e — série « Proportionnalité », lot 2 (échelles),
# épisode COMMUN 08 : DU PLAN VERS LA RÉALITÉ (micro du coach :
# echelle_distance_reelle, notion prop_echelle), AVEC VOIX. Paysage 16:9,
# CEINTURE VERTE (la paysage complète du niveau : situation, méthode, piège,
# 2 questions-pauses, défi corrigé). Short jumeau : prop_echelle_reelle_short.py
# (blanche, rendu une fois, copié sous les deux classes).
# ⭐ « Une voix, un script, deux rendus » (modèle stmg/proba_probaC_notation.py) :
# PropEchelleReelle6e / PropEchelleReelle4e ne changent que l'identité ; la
# voix ne cite aucune classe.
# ⭐ Méthode travaillée : le COEFFICIENT de l'échelle (ce que vaut 1 cm) —
# du plan vers la réalité, on MULTIPLIE ; une longueur à virgule = la somme
# de deux morceaux (2 cm + un demi-centimètre). ⛔ Pas de produit en croix.
# ⭐ Le geste (canvas `echelle` du coach, lib/canvas/EchelleCanvas.tsx) :
# carte blanche, PLAN court en bleu, RÉALITÉ longue en vert, flèche ambre de
# l'une à l'autre, l'opération écrite sur la flèche (« × 5 »).
# ⭐ Leurres (consigne-videos-proportionnalite.md) : 1. AJOUTER au lieu de
# multiplier (question 1 : 12 = 7 + 5 ; question 2 : 13,5 = 3,5 + 10) ;
# 3. et 5. INVERSER, diviser au lieu de multiplier (question 1 : 1,4 = 7 ÷ 5 ;
# question 2 : 0,35 = 3,5 ÷ 10 ; écran 06 : « 1,2 m » barré).
#
# Décor et métier : HISTOIRE-GÉOGRAPHIE, Awa, CARTOGRAPHE : ses cartes
# (1 cm ↔ 5 km, puis 1 cm ↔ 4 km) et un plan d'appartement (1 cm ↔ 5 m,
# 1 cm ↔ 10 m). Villages SANS nom réel, échelles inventées : AUCUN chiffre
# du monde réel, rien à vérifier par WebSearch (pas de source à citer).
# Centres d'intérêt : histoire-geographie, transports.
#
# Micro → écrans : du plan vers la réalité (01, 02) ; le tableau cm → km
# « × 5 » (03) ; QUESTION 1 (04) ; une longueur à virgule (05) ; le piège
# « il a divisé » (06) ; QUESTION 2 (07) ; défi (08) et correction (08b) ;
# ce que tu as appris (09) ; fin (10).
# Écrans : 00 garde · 01 Awa et sa carte · 02 on multiplie · 03 le tableau ·
# 04 QUESTION 1 · 05 le sentier de 2,5 cm · 06 le piège du couloir ·
# 07 QUESTION 2 · 08 défi des villages · 08b correction · 09 ce que tu as
# appris · 10 fin.
#
# Voix : manim/voix/commun-prop-echelle-reelle.json (validée par Frédéric,
# débit −10), WAV dans public/sons/commun-prop-echelle-reelle/ ; marques mot
# à mot : manim/scripts/6e/prop_echelle_reelle_marques.json
# (scripts/marques_dump.ps1 puis scripts/cues2marques.py).
# Outils : prop_commun.py + manim/canvas_proportion.py (non modifiés).
# Ajouté ICI (absent du module) : Correspondance (la figure PLAN / RÉALITÉ du
# coach : EchelleCarte du module dessine une échelle 1/25 000 en « cm pour
# cm » et un segment de longueur fixe, elle ne sert pas une échelle
# « 1 cm ↔ 5 km » : voir le rapport), carte_awa(), regle(), plan_appart(),
# awa(), maison(), village(), cartouche().
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/prop_echelle_reelle.py PropEchelleReelle6e
# python -m manim render -qh --disable_caching manim/scripts/6e/prop_echelle_reelle.py PropEchelleReelle6e -o eleveai-maths-6e-prop-echelle-reelle --media_dir manim/scripts/6e/media-prop-echelle-reelle
# python -m manim render -qh --disable_caching manim/scripts/6e/prop_echelle_reelle.py PropEchelleReelle4e -o eleveai-maths-4e-prop-echelle-reelle --media_dir manim/scripts/6e/media-prop-echelle-reelle
# Sorties : manim/sorties/6e/maths/proportionnalite/08-echelle-reelle/eleveai-maths-6e-prop-echelle-reelle.mp4
#           manim/sorties/4e/maths/proportionnalite/08-echelle-reelle/eleveai-maths-4e-prop-echelle-reelle.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403

BLEU_P = "#2563eb"     # le PLAN (canvas echelle du coach)
BLEU_P2 = "#60a5fa"    # le demi-centimètre
VERT_R = "#16a34a"     # la RÉALITÉ
VERT_R2 = "#4ade80"    # le morceau du demi-centimètre, en vrai
AMBRE_F = "#f59e0b"    # la flèche plan → réalité
AMBRE_T = "#b45309"    # son étiquette, lisible sur la carte blanche
ARDOISE = "#475569"    # « PLAN », « RÉALITÉ »
ENCRE = "#0f172a"
TEAL = "#0d9488"


def gras(s, fs, couleur):
    return Text(s, font_size=fs, color=couleur, weight=BOLD)


def donnee(m):
    """Une donnée de figure qu'on LIT (graduations d'une règle) : ni attente
    de la synchro, ni audit."""
    for f in m.get_family():
        if isinstance(f, Text):
            f.sans_synchro = True
            f._pas_audit = True
    return m


def awa(s=1.0):
    """Awa, cartographe : veste turquoise, une carte pliée sous le bras."""
    p = personne(peau="#5c3a21", tenue=TEAL, cheveux="#111827", longs=True, s=s)
    c = p.corps.get_center()
    pli = VGroup(*[Polygon(P(0, 0), P(0.28, 0.06), P(0.28, -0.5), P(0, -0.56), fill_color=col, fill_opacity=1,
                           stroke_color="#78350f", stroke_width=1.5).shift(RIGHT * 0.28 * k)
                   for k, col in enumerate(["#fef3c7", "#fde68a", "#fef3c7"])])
    pli.scale(s).move_to(c + P(0.55, 0.05) * s)
    p.add(pli)
    return p


def maison(s=1.0, couleur="#dc2626"):
    """Une petite maison de village (mur, toit)."""
    mur = Square(0.32, fill_color="#fafaf9", fill_opacity=1, stroke_color=ENCRE, stroke_width=2)
    toit = Polygon(P(-0.22, 0.16), P(0.22, 0.16), P(0, 0.38), fill_color=couleur, fill_opacity=1,
                   stroke_color=ENCRE, stroke_width=2)
    return VGroup(mur, toit).scale(s)


def village(s=1.0):
    return VGroup(maison(s), maison(0.8 * s, "#ea580c").shift(P(0.3, -0.08) * s))


def carte_awa(l=5.6, h=3.6, riviere=True):
    """La carte d'Awa : fond vert pâle (comme EchelleCarte), rivière, collines,
    forêts. Renvoie le groupe ; .fond est la carte seule."""
    fond = RoundedRectangle(width=l, height=h, corner_radius=0.2, fill_color="#ecfccb", fill_opacity=1,
                            stroke_color="#84cc16", stroke_width=4)
    g = VGroup(fond)
    if riviere:
        g.add(VMobject(stroke_color="#38bdf8", stroke_width=7).set_points_smoothly(
            [P(-l * 0.18, h * 0.5), P(-l * 0.05, h * 0.18), P(-l * 0.22, -h * 0.12), P(-l * 0.08, -h * 0.5)]))
    for x, y in ((0.3, 0.3), (0.36, 0.22), (-0.38, 0.3)):
        g.add(Polygon(P(l * x - 0.3, h * y - 0.2), P(l * x + 0.3, h * y - 0.2), P(l * x, h * y + 0.22),
                      fill_color="#a8a29e", fill_opacity=1, stroke_color="#78716c", stroke_width=2))
    for x, y in ((0.38, -0.32), (0.32, -0.38), (-0.38, -0.3), (-0.33, -0.36), (0.05, 0.38)):
        g.add(Circle(radius=0.13, fill_color="#15803d", fill_opacity=1, stroke_width=0).move_to(P(l * x, h * y)))
    g.fond = fond
    return g


def regle(n, u, demis=False, fs=20):
    """Une règle graduée en cm (0 → n), u = la longueur d'un cm à l'écran.
    Le 0 est à gauche ; .x0 = l'abscisse du 0 (à déplacer avec la règle)."""
    corps = Rectangle(width=n * u + 0.5, height=0.5, fill_color="#fef9c3", fill_opacity=1,
                      stroke_color="#a16207", stroke_width=2)
    g = VGroup(corps)
    x0 = -n * u / 2
    haut = corps.get_top()[1]
    for k in range(n + 1):
        g.add(Line(P(x0 + k * u, haut), P(x0 + k * u, haut - 0.2), color=ENCRE, stroke_width=2.5))
        g.add(Text(str(k), font_size=fs, color=ENCRE).move_to(P(x0 + k * u, haut - 0.34)))
        if demis and k < n:
            g.add(Line(P(x0 + (k + 0.5) * u, haut), P(x0 + (k + 0.5) * u, haut - 0.12), color=ENCRE,
                       stroke_width=2))
    return donnee(g)


def plan_appart(l=5.4, h=3.4):
    """Un plan d'appartement façon architecte : pièces, et un long COULOIR
    (.couloir : le rectangle du couloir ; .axe : son milieu, gauche → droite)."""
    fond = RoundedRectangle(width=l, height=h, corner_radius=0.2, fill_color="#eff6ff", fill_opacity=1,
                            stroke_color="#93c5fd", stroke_width=3)
    murs = VGroup()
    x0, x1, y0, y1 = -l / 2 + 0.35, l / 2 - 0.35, -h / 2 + 0.35, h / 2 - 0.35
    murs.add(Rectangle(width=x1 - x0, height=y1 - y0).move_to(P((x0 + x1) / 2, (y0 + y1) / 2)))
    yc0, yc1 = -0.25, 0.25
    murs.add(Line(P(x0, yc1), P(x1, yc1)), Line(P(x0 + 0.9, yc0), P(x1, yc0)))
    for x in (x0 + 1.6, x0 + 3.0):
        murs.add(Line(P(x, yc1), P(x, y1)))
    murs.add(Line(P(x0 + 2.3, yc0), P(x0 + 2.3, y0)))
    murs.set_stroke("#1e3a8a", 4)
    couloir = Rectangle(width=x1 - x0 - 0.9, height=yc1 - yc0, fill_color="#bfdbfe", fill_opacity=1,
                        stroke_width=0).move_to(P((x0 + 0.9 + x1) / 2, 0))
    g = VGroup(fond, couloir, murs)
    g.fond, g.couloir = fond, couloir
    return g


class Correspondance(VGroup):
    """La figure `echelle` du coach (EchelleCanvas.tsx), redessinée : carte
    blanche, « PLAN » et sa ligne BLEUE (courte), « RÉALITÉ » et sa ligne
    VERTE (longue), une flèche AMBRE de l'une à l'autre avec l'opération.
    up / ur : la longueur à l'écran d'une unité du plan / de la réalité.
    Rien n'est ajouté : .fond (carte + « PLAN » + « RÉALITÉ ») est à montrer
    d'abord ; les méthodes RENVOIENT segments, étiquettes et flèche."""

    def __init__(self, up, ur, long_reel=4.2, centre=ORIGIN, hauteur=3.5, fs=30, **kw):
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
        self.lib_p = gras("PLAN", 22, ARDOISE).move_to(P(g + 0.85, self.y_p))
        self.lib_r = gras("RÉALITÉ", 22, ARDOISE).move_to(P(g + 0.85, self.y_r))
        for t in (self.lib_p, self.lib_r):
            t.sans_synchro = True  # « plan », « réalité » : redits partout, des libellés
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
        """Les graduations du plan, un trait par cm (le « 4 fois 1 cm »)."""
        return VGroup(*[Line(P(self.xp(k), self.y_p + 0.14), P(self.xp(k), self.y_p - 0.14), color=ENCRE,
                             stroke_width=3) for k in range(a, n + 1)])

    def lab_p(self, a, b, s, couleur=BLEU_P, fs=None):
        """Étiquette du plan, AU-DESSUS de la ligne bleue."""
        return gras(s, fs or self.fs, couleur).move_to(P((self.xp(a) + self.xp(b)) / 2, self.y_p + 0.42))

    def lab_r(self, a, b, s, couleur=VERT_R, fs=None, dessus=False):
        """Étiquette de la réalité, SOUS la ligne verte (au-dessus si dessus)."""
        dy = 0.38 if dessus else -0.42
        return gras(s, fs or self.fs, couleur).move_to(P((self.xr(a) + self.xr(b)) / 2, self.y_r + dy))

    def fleche(self, s, a_plan, a_reel, couleur=AMBRE_F):
        """La flèche ambre du bout du plan vers le bout de la réalité, son
        opération à droite (.fleche, .etiquette)."""
        d = P(self.xp(a_plan) + 0.25, self.y_p - 0.2)
        f = P(self.xr(a_reel) + 0.3, self.y_r + 0.2)
        fl = CurvedArrow(d, f, angle=-0.9, color=couleur, stroke_width=6, tip_length=0.22)
        et = gras(s, self.fs + 2, AMBRE_T)
        et.next_to(fl.point_from_proportion(0.55), RIGHT, buff=0.12)
        droite = self.carte.get_right()[0] - 0.12
        if et.get_right()[0] > droite:
            et.shift(LEFT * (et.get_right()[0] - droite))
        g = VGroup(fl, et)
        g.fleche, g.etiquette = fl, et
        return g


def cartouche(cm, reel, fs=34):
    """L'échelle écrite en clair : « 1 cm → 5 km » (plan en bleu, réalité en
    vert), dans un cadre ; .cm, .fl, .reel : les morceaux, à montrer au mot."""
    a = gras(cm, fs, BLEU_CALCUL)
    f = Text("→", font_size=fs, color=WHITE)
    b = gras(reel, fs, VERT_OK)
    lg = VGroup(a, f, b).arrange(RIGHT, buff=0.2)
    cadre = SurroundingRectangle(lg, color=AMBRE, buff=0.18, corner_radius=0.12, stroke_width=4)
    g = VGroup(cadre, lg)
    g.cm, g.fl, g.reel, g.cadre = a, f, b, cadre
    return g


class PropEchelleReelleBase(PaysageProp):
    nom_voix = "commun-prop-echelle-reelle"
    fichier_marques = "prop_echelle_reelle_marques.json"

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

    def route_awa(self, carte, xa, xb, y):
        """La route entre deux villages (sans mesure) : .route, .v1, .v2."""
        route = Line(P(xa, y), P(xb, y), color="#a16207", stroke_width=12)
        v1 = village(0.9).next_to(P(xa, y), UP, buff=0.08)
        v2 = village(0.9).next_to(P(xb, y), UP, buff=0.08)
        return route, v1, v2

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Du plan vers la réalité", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Du plan")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        q = VGroup(self.t("Comment lire une", 38), self.t("vraie distance", 38, VERT_OK),
                   self.t("sur une carte ?", 38)).arrange(DOWN, buff=0.16).move_to(P(3.4, 0.25))
        self.au_mot("Comment")
        self.play(FadeIn(q[0], shift=UP * 0.15), run_time=0.4)
        self.au_mot("vraie distance")
        self.play(FadeIn(q[1], scale=1.2), run_time=0.4)
        carte = carte_awa(4.8, 2.9).move_to(P(-3.0, 0.25))
        route, v1, v2 = self.route_awa(carte, -4.9, -1.1, -0.1)
        mes = Line(P(-4.9, -0.1), P(-1.1, -0.1), color=BLEU_P, stroke_width=7)
        self.au_mot("sur une carte")
        self.play(FadeIn(q[2], shift=UP * 0.15), FadeIn(carte, scale=0.9), run_time=0.5)
        self.play(Create(route), FadeIn(v1, shift=DOWN * 0.15), FadeIn(v2, shift=DOWN * 0.15), run_time=0.6)
        self.play(Create(mes), run_time=0.5)
        self.play(Indicate(q[1], color=VERT_OK, scale_factor=1.15), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : Awa, cartographe, et sa carte ──────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = awa(0.95).move_to(P(-5.7, -0.75))
        self.au_mot("Voici Awa")
        nom = self.t("Awa", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.25)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("cartographe")
        met = self.t("cartographe", 30, BLEU_CALCUL).next_to(pers, DOWN, buff=0.2)
        met.shift(RIGHT * max(0, -6.45 - met.get_left()[0]))
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        carte = carte_awa(5.3, 3.6).move_to(P(-1.55, 0.55))
        route, v1, v2 = self.route_awa(carte, -3.55, 0.45, 0.35)
        self.au_mot("dessine des cartes")
        self.play(FadeIn(carte.fond, scale=0.9), run_time=0.4)
        self.play(LaggedStart(*[FadeIn(m, scale=0.8) for m in carte[1:]], lag_ratio=0.08), run_time=1.0)
        car = cartouche("1 cm", "5 km", 40)
        self.col(car, 2.4, 1.75)
        self.au_mot("1 cm")
        self.play(Create(car.cadre), FadeIn(car.cm, scale=1.3), run_time=0.4)
        self.au_mot("5 km")
        self.play(FadeIn(car.fl, shift=RIGHT * 0.2), FadeIn(car.reel, scale=1.3), run_time=0.4)
        self.insister(car, 1.12, 0.2)
        lr = self.lc([("Route :", WHITE), ("4 cm", BLEU_CALCUL)], 1.05, xl=1.75)
        self.au_mot("Une route")
        self.play(Create(route), FadeIn(v1, shift=DOWN * 0.15), FadeIn(v2, shift=DOWN * 0.15),
                  FadeIn(lr[0], shift=RIGHT * 0.2), run_time=0.6)
        mes = VGroup(Line(P(-3.55, 0.35), P(0.45, 0.35), color=BLEU_P, stroke_width=7),
                     Dot(P(-3.55, 0.35), radius=0.07, color=ENCRE), Dot(P(0.45, 0.35), radius=0.07, color=ENCRE))
        rg = regle(4, 1.0).move_to(P(-1.55, -0.55))
        rg.shift(RIGHT * (-3.55 - (rg[1].get_x())))
        l4 = gras("4 cm", 36, BLEU_P).move_to(P(-1.55, 0.88))
        self.au_mot("4 cm")
        self.play(Create(mes), FadeIn(rg, shift=UP * 0.2), FadeIn(l4, scale=1.3), FadeIn(lr[1], scale=1.3),
                  run_time=0.6)
        self.insister(l4, 1.2, 0.2)
        lv = self.lc([("En vrai :", WHITE), ("? km", ORANGE_RETENUE)], -0.05, xl=1.75)
        lv[1].sans_synchro = True
        self.au_mot("en vrai")
        self.play(FadeIn(lv, shift=RIGHT * 0.2), run_time=0.4)
        self.play(Indicate(lv[1], color=ORANGE_RETENUE, scale_factor=1.3), run_time=0.6)
        self.attendre_voix()

    # ── 02 : du plan vers la réalité, on multiplie ──────────────────────────
    def ecran_multiplier(self):
        self.ecran("02-multiplier")
        co = Correspondance(0.45, 0.21, centre=P(-2.9, 0.35))
        self.au_mot("Du plan")
        self.play(FadeIn(co.fond, shift=UP * 0.2), run_time=0.5)
        fl = co.fleche("× 5", 4, 20)
        tit = self.col(self.t("On multiplie !", 46, AMBRE), 2.55, 1.3)
        self.au_mot("on multiplie")
        self.play(Write(tit), Create(fl.fleche), run_time=0.6)
        seg = co.plan(0, 4)
        l4 = co.lab_p(0, 4, "4 cm")
        L1 = self.lc([("4 cm =", WHITE), ("4 × 1 cm", BLEU_CALCUL)], 1.35)
        self.au_mot("4 cm, c'est")
        self.play(Create(seg), FadeIn(l4, scale=1.3), FadeIn(L1[0], shift=RIGHT * 0.2), run_time=0.5)
        tk = co.ticks(4)
        self.au_mot("4 fois 1 cm")
        self.play(FadeIn(L1[1], shift=RIGHT * 0.2), Create(tk), run_time=0.5)
        self.play(LaggedStart(*[Indicate(co.plan(k, k + 1, bouts=False), color=BLEU_P2, scale_factor=1.0)
                                for k in range(4)], lag_ratio=0.3), run_time=1.0)
        L2 = self.lc([("4 ×", WHITE), ("5 km", WHITE), ("=", WHITE), ("20 km", VERT_OK)], 0.25)
        morceaux = [co.reel(5 * k, 5 * (k + 1), VERT_R if k % 2 == 0 else "#15803d", bouts=False) for k in range(4)]
        labs = [co.lab_r(5 * k, 5 * (k + 1), "5 km", fs=21, dessus=True) for k in range(4)]
        self.au_mot("Donc 4")
        self.play(FadeIn(L2[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("5 km,")
        self.play(FadeIn(L2[1], shift=RIGHT * 0.2), FadeIn(fl.etiquette, scale=1.4),
                  LaggedStart(*[AnimationGroup(Create(m), FadeIn(t, scale=1.3)) for m, t in zip(morceaux, labs)],
                              lag_ratio=0.3), run_time=1.0)
        bouts = VGroup(Dot(P(co.xr(0), co.y_r), radius=0.065, color=ENCRE),
                       Dot(P(co.xr(20), co.y_r), radius=0.065, color=ENCRE))
        l20 = co.lab_r(0, 20, "20 km", fs=34)
        self.au_mot("20 km")
        self.play(FadeIn(L2[2]), FadeIn(L2[3], scale=1.3), FadeIn(l20, scale=1.3), FadeIn(bouts), run_time=0.45)
        self.insister(L2[3], 1.2, 0.2)
        self.attendre_voix()

    # ── 03 : le tableau cm → km ─────────────────────────────────────────────
    def ecran_tableau(self):
        self.ecran("03-tableau")
        tb = TableauProp(["Carte (cm)", "Réalité (km)"], [[1, 4], [5, 20]], montrer=False, largeur_case=1.7,
                         largeur_libelle=3.4, hauteur=0.95, fs=42, centre=P(-1.6, 0.9))
        self.au_mot("tableau")
        self.play(FadeIn(tb.fond, shift=UP * 0.2), run_time=0.6)
        self.au_mot("En haut")
        self.play(Indicate(tb.libelles[0], color=AMBRE, scale_factor=1.2), run_time=0.6)
        self.au_mot("En bas")
        self.play(Indicate(tb.libelles[1], color=AMBRE, scale_factor=1.2), run_time=0.6)
        for (r, c), mot in (((0, 0), "1 cm"), ((1, 0), "5 km"), ((0, 1), "4 cm"), ((1, 1), "20 km")):
            self.au_mot(mot)
            self.play(tb.allumer(r, c), FadeIn(tb.valeur(r, c), scale=1.4), run_time=0.35)
            self.play(tb.eteindre(r, c), run_time=0.25)
        fl = tb.fleche_lat("× 5", fs=44)
        phr = self.ligne([("On multiplie toujours", WHITE), ("par 5.", AMBRE)], 40).move_to(P(-1.0, -1.5))
        self.au_mot("On multiplie")
        self.play(FadeIn(phr[0], shift=UP * 0.15), Create(fl.fleche), run_time=0.5)
        self.au_mot("par 5")
        self.play(FadeIn(phr[1], scale=1.3), FadeIn(fl.etiquette, scale=1.4), run_time=0.4)
        self.play(LaggedStart(*[Indicate(tb.colonne(c), color=AMBRE, scale_factor=1.08) for c in range(2)],
                              lag_ratio=0.4), run_time=1.0)
        self.insister(fl.etiquette, 1.3, 0.2)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (1 cm → 5 km ; chemin de 7 cm) ──────────────────────
    def deco_carte(self):
        """Awa et sa carte, sans aucun nombre (pendant la question)."""
        carte = carte_awa(4.6, 3.2).move_to(P(-2.6, 0.4))
        chemin = DashedVMobject(VMobject(stroke_color="#b45309", stroke_width=6).set_points_smoothly(
            [P(-4.4, -0.4), P(-3.4, 0.5), P(-2.2, 0.0), P(-1.0, 0.9)]), num_dashes=22)
        return VGroup(awa(0.75).move_to(P(-5.75, -1.6)), carte, chemin)

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        deco = self.deco_carte()
        self.add(deco)
        co = Correspondance(0.4, 0.12, centre=P(-3.0, 0.3))

        def apres(sc):
            sc.play(FadeOut(deco), FadeIn(co.fond), run_time=0.3)
            l0 = sc.ligne_rep(0, ["7 ×", "5 =", "35 km."])
            sc.au_mot("7 fois")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), Create(co.plan(0, 7)), FadeIn(co.lab_p(0, 7, "7 cm"), scale=1.3),
                    run_time=0.35)
            fl = co.fleche("× 5", 7, 35)
            sc.au_mot("5, égale")
            sc.play(FadeIn(l0[1], shift=UP * 0.15), Create(fl.fleche), FadeIn(fl.etiquette, scale=1.3),
                    run_time=0.35)
            sc.au_mot("35 km")
            sc.play(FadeIn(l0[2], scale=1.3), Create(co.reel(0, 35)), FadeIn(co.lab_r(0, 35, "35 km"), scale=1.3),
                    run_time=0.45)
            sc.rep_fini()

        self.question_pause("04-question", "04b-reponse",
                            ["Sur cette carte,", "1 cm représente 5 km.", "Un chemin mesure 7 cm.",
                             "Quelle est sa vraie longueur ?"],
                            [self.t("12 km", 34), self.t("35 km", 34), self.t("1,4 km", 34)], 1,
                            ["7 × 5 = 35 km."], mot_q="Sur cette carte", autres_r=apres)

    # ── 05 : une longueur avec une virgule (2,5 cm) ─────────────────────────
    def ecran_moitie(self):
        self.ecran("05-moitie")
        co = Correspondance(1.2, 0.336, centre=P(-2.9, 0.2))
        tit = self.col(self.t("Avec une virgule ?", 44, AMBRE), 2.75, 1.3)
        self.au_mot("Et une longueur")
        self.play(Write(tit), FadeIn(co.fond, shift=UP * 0.2), run_time=0.6)
        L1 = self.lc([("Sentier :", WHITE), ("2,5 cm", BLEU_CALCUL)], 1.85)
        seg = co.plan(0, 2.5)
        l25 = co.lab_p(0, 2.5, "2,5 cm")
        self.au_mot("Un sentier")
        self.play(FadeIn(L1[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("2,5 cm")
        self.play(Create(seg), FadeIn(l25, scale=1.3), FadeIn(L1[1], scale=1.3), Create(co.ticks(2)), run_time=0.5)
        demi = Line(P(co.xp(2.5), co.y_p + 0.1), P(co.xp(2.5), co.y_p - 0.1), color=ENCRE, stroke_width=3)
        # 2 cm → 10 km
        L2 = self.lc([("2 cm", BLEU_CALCUL), ("→", WHITE), ("10 km", VERT_OK)], 1.05)
        p2 = co.plan(0, 2, bouts=False)
        self.au_mot("2 cm")
        self.play(FadeIn(L2[0], shift=RIGHT * 0.2), FadeIn(L2[1]), Indicate(p2, color=BLEU_P, scale_factor=1.0),
                  FadeOut(l25), FadeIn(co.lab_p(0, 2, "2 cm", fs=28), scale=1.3), run_time=0.4)
        r10 = co.reel(0, 10)
        self.au_mot("10 km")
        self.play(FadeIn(L2[2], scale=1.3), Create(r10), FadeIn(co.lab_r(0, 10, "10 km", fs=28, dessus=True), scale=1.3),
                  run_time=0.5)
        # un demi-centimètre → la moitié de 5 = 2,5 km
        L3 = self.lc([("un demi-cm", BLEU_CALCUL), ("→", WHITE)], 0.25)
        L4 = self.lc([("la moitié de 5 =", WHITE), ("2,5 km", VERT_OK)], -0.5)
        p5 = co.plan(2, 2.5, BLEU_P2, bouts=False)
        self.au_mot("Un demi-centimètre")
        self.play(FadeIn(L3, shift=RIGHT * 0.2), p5.animate.set_stroke(width=14), Create(demi),
                  FadeIn(co.lab_p(2, 2.5, "un demi-cm", fs=26, couleur="#1d4ed8").shift(DOWN * 0.84 + RIGHT * 0.3),
                         scale=1.3), run_time=0.45)
        self.au_mot("la moitié de 5")
        self.play(FadeIn(L4[0], shift=RIGHT * 0.2), run_time=0.35)
        r25 = co.reel(10, 12.5, VERT_R2)
        self.au_mot("2,5 km")
        self.play(FadeIn(L4[1], scale=1.3), Create(r25), FadeIn(co.lab_r(10, 12.5, "2,5 km", fs=28, dessus=True), scale=1.3),
                  run_time=0.5)
        # en tout
        L5 = self.lc([("En tout :", WHITE), ("10 + 2,5 =", WHITE), ("12,5 km", VERT_OK)], -1.35, fs=36)
        L5[1].sans_synchro = True   # le rappel des deux morceaux qu'on vient de dire
        L5[1]._pas_audit = True
        accol = Brace(Line(P(co.xr(0), co.y_r - 0.08), P(co.xr(12.5), co.y_r - 0.08)), DOWN, color=VERT_R)
        tot = gras("12,5 km", 32, VERT_R).next_to(accol, DOWN, buff=0.06)
        self.au_mot("En tout")
        self.play(FadeIn(L5[0], shift=RIGHT * 0.2), FadeIn(L5[1], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("12,5 km")
        self.play(FadeIn(L5[2], scale=1.3), GrowFromCenter(accol), FadeIn(tot, scale=1.3), run_time=0.45)
        self.insister(L5[2], 1.12, 0.2)
        self.attendre_voix()

    # ── 06 : le piège du couloir (1 cm → 5 m ; 6 cm → 30 m, pas 1,2 m) ──────
    def ecran_piege(self):
        self.ecran("06-piege")
        tit = self.t("Attention au piège !", 44, ROUGE_ERREUR).move_to(P(-2.9, 3.1))
        self.au_mot("Attention")
        self.play(Write(tit), run_time=0.5)
        pa = plan_appart(4.6, 2.1).move_to(P(-3.6, 1.45))
        co = Correspondance(0.5, 0.14, centre=P(-2.9, -1.5), hauteur=3.0)
        car = cartouche("1 cm", "5 m", 36)
        self.col(car, 2.35, 1.3)
        self.au_mot("Sur un plan")
        self.play(FadeIn(pa, scale=0.9), run_time=0.5)
        self.au_mot("1 cm")
        self.play(Create(car.cadre), FadeIn(car.cm, scale=1.3), run_time=0.35)
        self.au_mot("5 m")
        self.play(FadeIn(car.fl, shift=RIGHT * 0.2), FadeIn(car.reel, scale=1.3), FadeIn(co.fond), run_time=0.4)
        L1 = self.lc([("Un élève :", WHITE), ("6 cm", BLEU_CALCUL), ("→", WHITE), ("1,2 m", ROUGE_ERREUR)], 1.25)
        mes = Line(pa.couloir.get_left() + RIGHT * 0.1, pa.couloir.get_right() + LEFT * 0.1, color=BLEU_P,
                   stroke_width=7)
        self.au_mot("Un élève")
        self.play(FadeIn(L1[0], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("couloir")
        self.play(Indicate(pa.couloir, color=BLEU_P2, scale_factor=1.05), run_time=0.4)
        self.au_mot("6 cm")
        self.play(FadeIn(L1[1], scale=1.3), Create(mes), Create(co.plan(0, 6)),
                  FadeIn(co.lab_p(0, 6, "6 cm"), scale=1.3), run_time=0.5)
        faux = co.reel(0, 1.2, ROUGE_ERREUR)
        l_faux = gras("1,2 m", 28, ROUGE_ERREUR).move_to(P(co.xr(0) + 0.8, co.y_r + 0.42))
        self.au_mot("1,2 m")
        self.play(FadeIn(L1[2]), FadeIn(L1[3], scale=1.3), Create(faux), FadeIn(l_faux, scale=1.3), run_time=0.45)
        div = self.col(self.t("Il a divisé !", 40, ROUGE_ERREUR), 0.4, 1.3)
        self.au_mot("Il a divisé")
        self.play(FadeIn(div, scale=1.3), Create(croix(L1[3], sw=6)), Create(croix(l_faux, sw=5)), run_time=0.45)
        self.insister(div, 1.15, 0.2)
        L3 = self.col(self.t("La réalité est plus grande :", 34), -0.5, 1.3)
        self.au_mot("la réalité est plus grande")
        self.play(FadeIn(L3, shift=RIGHT * 0.2), run_time=0.4)
        mult = self.col(self.t("on multiplie.", 36, AMBRE), -1.15, 1.3)
        fl = co.fleche("× 5", 6, 30)
        self.au_mot("on multiplie")
        self.play(FadeIn(mult, shift=RIGHT * 0.2), Create(fl.fleche), FadeOut(faux), run_time=0.45)
        L4 = self.lc([("6 × 5 =", WHITE), ("30 m", VERT_OK)], -2.05, fs=42)
        self.au_mot("6 fois 5")
        self.play(FadeIn(L4[0], shift=RIGHT * 0.2), FadeIn(fl.etiquette, scale=1.3), run_time=0.4)
        self.au_mot("30 m")
        self.play(FadeIn(L4[1], scale=1.3), Create(co.reel(0, 30)), FadeIn(co.lab_r(0, 30, "30 m"), scale=1.3),
                  run_time=0.5)
        self.insister(L4[1], 1.2, 0.2)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (1 cm → 10 m ; couloir de 3,5 cm) ───────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        deco = VGroup(plan_appart(5.4, 3.0).move_to(P(-3.0, 0.6)))
        self.add(deco)
        co = Correspondance(1.0, 0.12, centre=P(-2.9, 0.3))

        def apres(sc):
            sc.play(FadeOut(deco), FadeIn(co.fond), run_time=0.2)
            r0 = sc.ligne_rep(0, ["30 m +", "5 m"])
            r1 = sc.ligne_rep(1, ["=", "35 m."])
            sc.au_mot("3 cm")
            sc.play(Create(co.plan(0, 3)), Create(co.ticks(3)),
                    FadeIn(co.lab_p(0, 3, "3 cm", fs=28), scale=1.3), run_time=0.35)
            sc.au_mot("30 m")
            sc.play(FadeIn(r0[0], scale=1.3), Create(co.reel(0, 30)), FadeIn(co.lab_r(0, 30, "30 m", fs=28, dessus=True),
                                                                               scale=1.3), run_time=0.4)
            sc.au_mot("Un demi")
            sc.play(Create(co.plan(3, 3.5, BLEU_P2)),
                    FadeIn(co.lab_p(3, 3.5, "un demi-cm", fs=24, couleur="#1d4ed8").shift(RIGHT * 0.35), scale=1.3),
                    run_time=0.35)
            sc.au_mot("5 m")
            sc.play(FadeIn(r0[1], scale=1.3), Create(co.reel(30, 35, VERT_R2)),
                    FadeIn(co.lab_r(30, 35, "5 m", fs=28, dessus=True), scale=1.3), run_time=0.4)
            sc.au_mot("En tout")
            sc.play(FadeIn(r1[0], shift=UP * 0.15), run_time=0.3)
            accol = Brace(Line(P(co.xr(0), co.y_r - 0.08), P(co.xr(35), co.y_r - 0.08)), DOWN, color=VERT_R)
            sc.au_mot("35 m")
            sc.play(FadeIn(r1[1], scale=1.3), GrowFromCenter(accol),
                    FadeIn(gras("35 m", 30, VERT_R).next_to(accol, DOWN, buff=0.05), scale=1.3), run_time=0.45)
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse",
                            ["Sur un plan,", "1 cm représente 10 m.", "Un couloir mesure 3,5 cm.",
                             "Quelle est sa vraie longueur ?"],
                            [self.t("35 m", 34), self.t("13,5 m", 34), self.t("0,35 m", 34)], 0,
                            ["30 m + 5 m", "= 35 m."], mot_q="Sur un plan",
                            autres_r=apres)

    # ── 08 : défi : deux villages à 9 cm (1 cm → 4 km) ──────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-2.6, 3.1))
        self.play(Write(tit), run_time=0.6)
        carte = carte_awa(5.9, 3.7).move_to(P(-3.2, 0.2))
        route, v1, v2 = self.route_awa(carte, -5.45, -0.95, 0.15)
        self.au_mot("autre carte")
        self.play(FadeIn(carte, scale=0.9), run_time=0.5)
        car = cartouche("1 cm", "4 km", 40)
        self.col(car, 2.3, 1.3)
        self.au_mot("1 cm")
        self.play(Create(car.cadre), FadeIn(car.cm, scale=1.3), run_time=0.35)
        self.au_mot("4 km")
        self.play(FadeIn(car.fl, shift=RIGHT * 0.2), FadeIn(car.reel, scale=1.3), run_time=0.4)
        L1 = self.lc([("Villages :", WHITE), ("9 cm", BLEU_CALCUL)], 1.15)
        self.au_mot("Deux villages")
        self.play(FadeIn(v1, shift=DOWN * 0.2), FadeIn(v2, shift=DOWN * 0.2), FadeIn(L1[0], shift=RIGHT * 0.2),
                  run_time=0.45)
        mes = VGroup(DashedLine(P(-5.45, 0.15), P(-0.95, 0.15), color=BLEU_P, stroke_width=7, dash_length=0.18),
                     Dot(P(-5.45, 0.15), radius=0.07, color=ENCRE), Dot(P(-0.95, 0.15), radius=0.07, color=ENCRE))
        rg = regle(9, 0.5, fs=18).move_to(P(-3.2, -0.75))
        rg.shift(RIGHT * (-5.45 - rg[1].get_x()))
        l9 = gras("9 cm", 36, BLEU_P).move_to(P(-3.2, 0.55))
        self.au_mot("9 cm")
        self.play(Create(mes), FadeIn(rg, shift=UP * 0.2), FadeIn(l9, scale=1.3), FadeIn(L1[1], scale=1.3),
                  run_time=0.55)
        L2 = self.lc([("Vraie distance :", WHITE), ("? km", ORANGE_RETENUE)], 0.15)
        L2[1].sans_synchro = True
        self.au_mot("vraie distance")
        self.play(FadeIn(L2, shift=RIGHT * 0.2), run_time=0.4)
        self.play(Indicate(L2[1], color=ORANGE_RETENUE, scale_factor=1.3), run_time=0.5)
        self.pause_defi(y=-1.0)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-2.6, 3.1))
        co = Correspondance(0.4, 4.2 / 36, centre=P(-2.9, 0.3))
        self.add(co.fond)
        self.play(Write(tit), run_time=0.5)
        L = self.lc([("9 ×", WHITE), ("4 =", AMBRE), ("36 km", VERT_OK)], 1.5, fs=46)
        self.au_mot("9 fois")
        self.play(FadeIn(L[0], shift=RIGHT * 0.2), Create(co.plan(0, 9)), Create(co.ticks(9)),
                  FadeIn(co.lab_p(0, 9, "9 cm"), scale=1.3), run_time=0.45)
        fl = co.fleche("× 4", 9, 36)
        self.au_mot("4, égale")
        self.play(FadeIn(L[1], shift=RIGHT * 0.2), Create(fl.fleche), FadeIn(fl.etiquette, scale=1.3), run_time=0.4)
        self.au_mot("36 km")
        self.play(FadeIn(L[2], scale=1.3), Create(co.reel(0, 36)), FadeIn(co.lab_r(0, 36, "36 km"), scale=1.3),
                  run_time=0.5)
        self.insister(L[2], 1.2, 0.2)
        ph = VGroup(self.t("Les deux villages sont", 36),
                    self.ligne([("à 36 km", VERT_OK), ("l'un de l'autre.", WHITE)], 36, buff=0.16))
        ph.arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        self.col(ph, 0.1, 1.3)
        self.au_mot("Les deux villages")
        self.play(FadeIn(ph[0], shift=UP * 0.15), run_time=0.4)
        self.play(FadeIn(ph[1][0], scale=1.2), run_time=0.4)
        self.play(FadeIn(ph[1][1], shift=RIGHT * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        co = Correspondance(0.6, 0.48, long_reel=2.4, centre=ORIGIN)
        fig = VGroup(co.fond, co.plan(0, 1), co.lab_p(0, 1, "1 cm"), co.reel(0, 5), co.lab_r(0, 5, "5 km"))
        fl = co.fleche("× 5", 1, 5)
        fig.add(fl)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Du plan à la réalité :", "on multiplie par ce que vaut 1 cm."),
            ("La réalité est toujours", "plus grande que le plan."),
            ("On écrit l'unité : cm sur le plan,", "m ou km en vrai.")], fs=34)
        self.au_mot("Pour passer")
        self.montrer_ligne(lignes[0], Indicate(fl, color=AMBRE))
        self.au_mot("La réalité")
        self.montrer_ligne(lignes[1], Indicate(fig[3], color=VERT_R2))
        self.au_mot("Et on écrit")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_multiplier()
        self.ecran_tableau()
        self.ecran_question1()
        self.ecran_moitie()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class PropEchelleReelle6e(PropEchelleReelleBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"


class PropEchelleReelle4e(PropEchelleReelleBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"
