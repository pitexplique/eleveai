# suite_geo_taux.py
# EleveAI — Maths 1re (sans spé, programme 2026) — paysage « Suite géométrique :
# du pourcentage à la raison » (16:9), ceinture VERTE. Série SUITES, épisode 11.
# Micro du coach : expo_suite_taux (notion expo_suite_geometrique) :
# lib/tutor-v4/questionBank/premiere/maths/suites-geometriques.bank.ts (tpl_1 :
# « augmente / diminue de t % : la raison ? » ; tpl_2 : « q = 1,05 : quelle
# évolution ? », piège « hausse de 105 % ») + suites-geometriques-renfort.ts
# (gTauxVersQ, gTauxMots, gQVersTaux, gTauxDeuxTermes, gTauxGlobal).
#
# Ce que demande le coach → écran :
#   · gTauxVersQ (hausse / baisse de t % → q = 1 ± t/100) → 01, 02-formule, 04 (A) ;
#   · gTauxMots (doubler, diviser par 2, perdre un quart…) → 03-mots ;
#   · gQVersTaux (q → évolution : on retire 1)            → 05-inverse ;
#   · gTauxDeuxTermes (a → b : q = b ÷ a, puis le taux)   → 09 défi, 09b ;
#   · gTauxGlobal (deux étapes : q², pas 2t)              → 06-global, 07-piege, 08 (C).
#   · erreurs typiques : 20 % → 0,2 au lieu de 1,2 ; − 20 % → 1,2 au lieu de
#     0,8 ; 4 % → 1,4 ; deux − 30 % → − 60 %                → 04 (B, C), 07, 08 (A, B).
# Clé de voix → écran :
#   00-garde (la barre qui grandit d'un morceau orange, « × ? ») · 01 Ylan,
#   distribution de films : les salles, la foule de 200 000 entrées, 30 % qui
#   partent (6 spectateurs sur 20, en orange), cases semaine 1, 2, 3 · 02 la
#   barre 100 % : le morceau − 30 % barré, il reste 70 % ; 1 − 30/100 = 0,7 ;
#   q = 0,7 ; les deux règles (hausse : morceau collé ; baisse : morceau barré)
#   · 03 les mots (doubler 2, tripler 3, diviser par 2 0,5, perdre un quart
#   0,75, + 100 % 2), chacun avec sa barre · 04/04b question (A : 1,04) · 05
#   q → taux : 0,85 − 1 = −0,15 (baisse de 15 %), 1,2 − 1 = 0,2 (hausse de 20 %)
#   · 06 retour à Ylan : 200 000 → 140 000 → 98 000, « × 0,7 » qui saute,
#   × 0,7² = 0,49 · 07 le piège : − 60 % barré, 49 % gardés, 51 % de baisse ·
#   08/08b question (C : hausse de 21 %) · 09/09b défi la vidéo (8 000 → 10 000 :
#   q = 1,25, + 25 %, 12 500 vues en 2028) · 10 « Ce que tu as appris » · 11 fin.
# Code couleur (module commun) : bleu = termes et la barre de départ, orange =
# la raison et le morceau ajouté / retiré, vert = juste, rouge = piège.
# ⛔ Pas de LaTeX : tout en Text ; les fractions t/100 sont dessinées (frac).
# Voix : manim/voix/premiere-suite-geo-taux.json (débit −6), calée mot à mot par
# suite_geo_taux_marques.json (cues WinRT, mots répétés datés un à un).
# Contrôle : AUDIT=1 BORDS=1 python -m manim render --dry_run …
# python -m manim render -qh --disable_caching manim/scripts/premiere/suite_geo_taux.py SuiteGeoTaux1re -o eleveai-maths-premiere-suite-geo-taux --media_dir manim/scripts/premiere/media-suite-geo-taux
# Sortie : manim/sorties/premiere/maths/suites/11-geo-taux/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403

# ── les affirmations de la voix, vérifiées ──────────────────────────────────
def _eq(a, b):
    return abs(a - b) < 1e-9


assert _eq(1 - 30 / 100, 0.7)
assert _eq(1 + 4 / 100, 1.04)                                   # 04 : réponse A
assert _eq(0.85 - 1, -0.15) and _eq(1.2 - 1, 0.2)
assert _eq(200000 * 0.7, 140000) and _eq(140000 * 0.7, 98000) and _eq(0.7 ** 2, 0.49)
assert _eq(1 - 0.49, 0.51)                                      # baisse globale 51 %
assert _eq(1.1 ** 2, 1.21) and _eq(1.21 - 1, 0.21)              # 08 : réponse C
assert _eq(10000 / 8000, 1.25) and _eq(1.25 - 1, 0.25) and _eq(10000 * 1.25, 12500)
assert 20 * 30 // 100 == 6                                      # 6 spectateurs sur 20

PEAU, CHEVEUX, VESTE = "#a0673f", "#1f2937", "#7c3aed"
ECRAN = "#1e3a5f"


def frac(num, den, fs=34, color=WHITE):
    """Une fraction dessinée : num au-dessus d'un trait, den dessous."""
    n = Text(num, font_size=fs, color=color)
    d = Text(den, font_size=fs, color=color)
    w = max(n.width, d.width) + 0.14
    tr = Line(LEFT * w / 2, RIGHT * w / 2, stroke_width=3, color=color)
    g = VGroup(n, tr, d).arrange(DOWN, buff=0.07)
    g.num, g.trait, g.den = n, tr, d
    return g


def ylan(s=1.0):
    """Ylan, distributeur de films : veste violette, une bobine de film à la main."""
    tete = Circle(radius=0.28, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 1.0))
    cheveux = Arc(radius=0.3, start_angle=0.15, angle=PI - 0.3, stroke_width=0, fill_color=CHEVEUX,
                  fill_opacity=1).move_to(P(0, 1.2))
    corps = RoundedRectangle(width=0.95, height=1.15, corner_radius=0.25, fill_color=VESTE, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    col = Polygon(P(-0.16, 0.68), P(0.16, 0.68), P(0, 0.42), fill_color=WHITE, fill_opacity=1, stroke_width=0)
    bob = Circle(radius=0.36, fill_color=GREY_D, fill_opacity=1, stroke_color=GREY_A, stroke_width=3)
    trous = VGroup(*[Circle(radius=0.07, fill_color=BLACK, fill_opacity=1, stroke_width=0).move_to(
        P(0.2 * np.cos(a), 0.2 * np.sin(a))) for a in np.linspace(0, TAU, 6)[:-1]])
    bobine = VGroup(bob, trous, Dot(ORIGIN, radius=0.05, color=GREY_A)).move_to(P(0.78, 0.15))
    ruban = Line(P(0.78, -0.21), P(0.95, -0.55), stroke_color=GREY_B, stroke_width=6)
    return VGroup(corps, col, tete, cheveux, ruban, bobine).scale(s)


def spectateur(couleur=TERME, s=1.0):
    """Un petit spectateur (tête + épaules)."""
    tete = Circle(radius=0.1, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(P(0, 0.13))
    epaules = Arc(radius=0.16, start_angle=0, angle=PI, fill_color=couleur, fill_opacity=1,
                  stroke_width=0).move_to(P(0, -0.07))
    return VGroup(tete, epaules).scale(s)


def salle(l=2.0, h=1.15):
    """Une salle de cinéma : l'écran et trois rangées de fauteuils."""
    ecran = RoundedRectangle(width=l * 0.8, height=h * 0.45, corner_radius=0.05, fill_color=ECRAN,
                             fill_opacity=1, stroke_color=GREY_A, stroke_width=2).move_to(P(0, h * 0.25))
    rangs = VGroup(*[VGroup(*[RoundedRectangle(width=0.16, height=0.1, corner_radius=0.03, fill_color="#b91c1c",
                                               fill_opacity=1, stroke_width=0).move_to(
        P(-l * 0.36 + k * l * 0.12, -h * 0.12 - r * 0.15)) for k in range(7)]) for r in range(3)])
    mur = RoundedRectangle(width=l, height=h, corner_radius=0.1, stroke_color=GREY_B, stroke_width=2,
                           fill_color=FOND_CARTE, fill_opacity=1)
    return VGroup(mur, ecran, rangs)


def affiche(ecran):
    """L'affiche du film sur l'écran : un clap orange."""
    w, h = ecran.width * 0.3, ecran.height * 0.62
    clap = VGroup(Rectangle(width=w, height=h * 0.7, fill_color=RAISON, fill_opacity=1, stroke_width=0),
                  Rectangle(width=w, height=h * 0.22, fill_color=WHITE, fill_opacity=1, stroke_width=0))
    clap[1].next_to(clap[0], UP, buff=0.02)
    return clap.move_to(ecran)


def lecteur(l=2.2, h=1.3):
    """Un lecteur vidéo : l'écran, le bouton lecture, la barre de progression."""
    cadre = RoundedRectangle(width=l, height=h, corner_radius=0.12, fill_color="#111827", fill_opacity=1,
                             stroke_color=GREY_A, stroke_width=3)
    tri = Triangle(fill_color=WHITE, fill_opacity=1, stroke_width=0).scale(0.22).rotate(-PI / 2)
    barre = Line(P(-l * 0.4, -h * 0.36), P(l * 0.4, -h * 0.36), stroke_color=GREY_B, stroke_width=4)
    lu = Line(P(-l * 0.4, -h * 0.36), P(-l * 0.05, -h * 0.36), stroke_color=PIEGE, stroke_width=4)
    return VGroup(cadre, tri, barre, lu)


def oeil(s=1.0):
    contour = VMobject(stroke_color=WHITE, stroke_width=4)
    contour.set_points_smoothly([P(-0.32, 0), P(0, 0.18), P(0.32, 0), P(0, -0.18), P(-0.32, 0)])
    return VGroup(contour, Dot(ORIGIN, radius=0.08, color=TERME)).scale(s)


class Barre(VGroup):
    """La barre des pourcentages. t > 0 (hausse) : 100 % en bleu + le morceau
    orange COLLÉ à droite ; t < 0 (baisse) : la part gardée en bleu + le morceau
    orange RETIRÉ à droite (à barrer). W = la largeur de 100 %."""

    def __init__(self, t, W=6.0, h=0.55, gauche=ORIGIN, **kw):
        super().__init__(**kw)
        base = 100 if t > 0 else 100 + t
        self.W, self.t = W, t
        self.bleu = Rectangle(width=W * base / 100, height=h, fill_color=TERME, fill_opacity=0.85,
                              stroke_color=WHITE, stroke_width=2)
        self.bleu.move_to(np.array(gauche, dtype=float), aligned_edge=LEFT)
        self.morceau = Rectangle(width=W * abs(t) / 100, height=h, fill_color=RAISON, fill_opacity=0.95,
                                 stroke_color=WHITE, stroke_width=2).next_to(self.bleu, RIGHT, buff=0)
        self.add(self.bleu, self.morceau)


class SuiteGeoTaux1re(PaysageSuites):
    fichier_marques = "suite_geo_taux_marques.json"
    nom_voix = "premiere-suite-geo-taux"
    identite = "Maths 1re — EleveAI"
    ceinture = "verte"

    # ── outils de l'épisode ────────────────────────────────────────────────

    def devoiler(self, etapes, run_time=0.25, avec=()):
        """etapes = [(mobject, extrait ou None), …] : chaque morceau quand la voix
        dit son extrait (None : avec le précédent) ; `avec` part avec le premier."""
        paquet, avec = [], list(avec)
        for m, ex in etapes:
            if ex is not None and paquet:
                self.play(*[FadeIn(p, shift=UP * 0.1) for p in paquet], *avec, run_time=run_time)
                paquet, avec = [], []
            if ex is not None:
                self.suivre(ex)
            paquet.append(m)
        if paquet:
            self.play(*[FadeIn(p, shift=UP * 0.1) for p in paquet], *avec, run_time=run_time)

    def decoupe(self, texte, morceaux, fs=40, couleurs=None, audit=False):
        """UNE ligne de texte (une taille, une ligne de base, des espaces
        régulières) coupée en morceaux à dévoiler un à un : texte = les morceaux
        joints par des espaces. Renvoie (Text, [VGroup de lettres, …])."""
        assert texte == " ".join(morceaux), texte
        t = Text(texte, font_size=fs, color=WHITE)
        n = [sum(1 for c in m if not c.isspace()) for m in morceaux]
        assert len(t.submobjects) == sum(n), f"ligature ? {texte}"
        parts, k = [], 0
        for m, c in zip(n, couleurs or [WHITE] * len(n)):
            g = VGroup(*t.submobjects[k:k + m])
            g.set_color(c)
            parts.append(g)
            k += m
        if not audit:
            t._pas_audit = True
        return t, parts

    def qeg(self, v, fs=40, couleur=RAISON):
        """« q = v » en une ligne : (Text, [« q = », « v »])."""
        return self.decoupe(f"q = {v}", ["q =", v], fs, [couleur, couleur])

    def ligne(self, morceaux, y=0.0, x=None, buff=0.2):
        """Des morceaux (Text, frac…) côte à côte, centrés sur la ligne y, une
        espace RÉGULIÈRE entre eux (« 1 − 30/100 = 0,7 ») ; x : bord gauche."""
        g = VGroup(*morceaux).arrange(RIGHT, buff=buff).move_to(P(0, y))
        if x is not None:
            g.align_to(P(x, 0), LEFT)
        return g

    def barrer_morceau(self, b, run_time=0.35):
        """Le morceau retiré d'une baisse : une croix rouge dessus, il pâlit."""
        cx = self.barrer(b.morceau, buff=0.04).set_stroke(width=5)
        self.play(Create(cx), b.morceau.animate.set_fill(opacity=0.35), run_time=run_time)
        return cx

    def biffer(self, mob, run_time=0.35):
        """Une formule fausse : un trait rouge qui la raye (elle reste lisible)
        et une croix rouge À CÔTÉ."""
        trait = Line(mob.get_left() + LEFT * 0.08, mob.get_right() + RIGHT * 0.08, stroke_color=PIEGE,
                     stroke_width=5).move_to(mob.get_center())
        cx = self.barrer(Square(0.34)).next_to(mob, RIGHT, buff=0.25)
        self.play(Create(trait), Create(cx), run_time=run_time)
        return VGroup(trait, cx)

    # ── 00 : la garde ──────────────────────────────────────────────────────

    def dessin_garde(self):
        y, yt = -0.2, 0.75
        b1 = Barre(4, W=3.0, h=0.5, gauche=P(-5.9, y))
        b2 = Barre(-25, W=3.0, h=0.5, gauche=P(0.6, y))
        q1 = self.t("× ?", 40, RAISON).next_to(b1, RIGHT, buff=0.3)
        q2 = self.t("× ?", 40, RAISON).next_to(b2, RIGHT, buff=0.3)
        aa, (a1, a2) = self.decoupe("Augmenter de 4 %", ["Augmenter de", "4 %"], 36, [WHITE, RAISON])
        aa.move_to(P(b1.get_center()[0], yt))
        p1 = self.t("perdre un quart", 36).move_to(P(b2.get_center()[0], yt))
        self.au_mot("Augmenter")
        self.play(FadeIn(a1, shift=UP * 0.1), GrowFromEdge(b1.bleu, LEFT), run_time=0.35)
        self.suivre("4 %")
        self.play(FadeIn(a2, scale=1.3), GrowFromEdge(b1.morceau, LEFT),
                  Flash(b1.morceau, color=RAISON, line_length=0.15), run_time=0.35)
        self.au_mot("perdre")
        self.play(FadeIn(p1, shift=UP * 0.1), GrowFromEdge(VGroup(b2.bleu, b2.morceau), LEFT), run_time=0.4)
        self.au_mot("un quart")
        self.play(Indicate(b2.morceau, color=RAISON, scale_factor=1.15), run_time=0.3)
        self.barrer_morceau(b2)
        self.au_mot("par quel nombre")
        qn = self.t("par quel nombre multiplie-t-on ?", 40).move_to(P(0, -1.2))
        self.play(FadeIn(qn, shift=UP * 0.1), FadeIn(q1, scale=1.4), FadeIn(q2, scale=1.4), run_time=0.4)

    def ecran_garde(self):
        self.garde("Suite géométrique", [("du pourcentage à la raison", "du pourcentage", TERME)],
                   dessin=self.dessin_garde, extrait_titre="Suite")

    # ── 01 : Ylan et les entrées du film ───────────────────────────────────

    XS_SEM = (-2.05, 1.3, 4.65)
    Y_SEM = -1.35

    def ecran_situation(self):
        self.nouvel_ecran("01-situation")
        perso = ylan(1.0).move_to(P(-5.2, 1.55))
        nom = self.t("Ylan", 40, JAUNE_TITRE).next_to(perso, DOWN, buff=0.3)
        m1 = self.t("distribution", 32, TERME).next_to(nom, DOWN, buff=0.12)
        m2 = self.t("de films", 32, TERME).next_to(m1, DOWN, buff=0.08)
        self.au_mot("Ylan")
        self.play(FadeIn(perso, shift=UP * 0.2), FadeIn(nom, shift=UP * 0.1), run_time=0.5)
        self.au_mot("distribution")
        self.play(FadeIn(m1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("de films")
        self.play(FadeIn(m2, shift=UP * 0.1), run_time=0.3)
        salles = VGroup(*[salle(2.1, 1.25).move_to(P(x, 1.75)) for x in (-1.75, 0.95, 3.65)])
        self.au_mot("salles")
        self.play(LaggedStart(*[FadeIn(s, scale=0.85) for s in salles], lag_ratio=0.25), run_time=0.7)
        self.au_mot("l'affiche")
        clap = [affiche(s[1]) for s in salles]
        self.play(*[GrowFromCenter(c) for c in clap], run_time=0.35)
        # la première semaine : la foule (20 spectateurs = 200 000 entrées)
        lg = LigneTermes(["200 000", "?", "?"], xs=self.XS_SEM, centre=P(0, self.Y_SEM), largeur=2.65,
                         hauteur=0.85, fs=38, noms=["semaine 1", "semaine 2", "semaine 3"], fs_noms=30)
        foule = VGroup(*[spectateur(TERME, 1.15).move_to(P(-2.6 + 0.62 * (k % 10), 1.95 - 0.55 * (k // 10)))
                         for k in range(20)])
        self.au_mot("La première semaine")
        self.play(FadeOut(VGroup(salles, *clap)), run_time=0.3)
        self.play(FadeIn(lg.cases[0][0], scale=0.8), FadeIn(lg.noms[0], shift=UP * 0.08), run_time=0.3)
        self.suivre("200 000")
        self.play(LaggedStart(*[FadeIn(sp, shift=DOWN * 0.15) for sp in foule], lag_ratio=0.04),
                  FadeIn(lg.cases[0][1], scale=1.4), run_time=0.45)
        ent = self.t("entrées", 34, GREY_A).next_to(lg.cases[0], LEFT, buff=0.4)
        self.au_mot("entrées")
        self.play(FadeIn(ent, shift=UP * 0.1), run_time=0.25)
        self.au_mot("d'une semaine")
        self.play(FadeIn(lg.cases[1][0], scale=0.8), FadeIn(lg.noms[1], shift=UP * 0.08), run_time=0.3)
        self.au_mot("baissent")
        partent = VGroup(*foule[4:10][::-1][:3], *foule[14:20][::-1][:3])
        self.play(*[sp.animate.set_color(RAISON) for sp in partent], run_time=0.35)
        self.au_mot("30 %")
        moins = self.t("− 30 %", 40, RAISON).move_to(P(4.95, 1.65))
        s1 = lg.saut(0, "− 30 %", cote=UP, fs=32)
        lg.sauts[0] = s1
        self.play(FadeIn(moins, scale=1.3), Create(s1[0]), FadeIn(s1[1], scale=1.3), run_time=0.4)
        self.play(partent.animate.shift(RIGHT * 0.35).set_opacity(0.25), run_time=0.5)
        self.au_mot("Combien")
        self.play(FadeIn(lg.cases[1][1], scale=1.4), run_time=0.25)
        self.au_mot("deux semaines")
        s2 = lg.saut(1, "− 30 %", cote=UP, fs=32)
        lg.sauts[1] = s2
        s2[1]._pas_audit = True  # « − 30 % » déjà dit : la même baisse, la semaine suivante
        self.play(FadeIn(lg.cases[2][0], scale=0.8), FadeIn(lg.noms[2], shift=UP * 0.08),
                  FadeIn(lg.cases[2][1], scale=1.4), Create(s2[0]), FadeIn(s2[1], scale=1.3), run_time=0.4)
        self.play(Indicate(lg.cases[2], color=RAISON, scale_factor=1.15), run_time=0.4)
        self.attendre_voix(marge=0.5)

    # ── 02 : baisser de 30 %, c'est garder 70 % → q = 0,7 ; les deux règles ──

    def regle(self, t, mot, signe, y):
        """« hausse de t % : q = 1 + t/100 » avec sa petite barre (morceau collé
        ou barré), posée au fil de la voix (à partir de « Pour une … »)."""
        fs = 38
        ic = Barre(25 if signe == "+" else -25, W=1.5, h=0.42, gauche=P(-6.3, y))
        tt, (tx, qe, un, op) = self.decoupe(f"{mot} de t % : q = 1 {signe}", [f"{mot} de t % :", "q =", "1", signe],
                                            fs, [WHITE, RAISON, RAISON, RAISON])
        fr_ = frac("t", "100", 32, RAISON)
        g = self.ligne([tt, fr_], y, x=-4.2)
        self.au_mot(f"Pour une {mot}")
        self.play(GrowFromEdge(ic, LEFT), FadeIn(tx, shift=UP * 0.1), run_time=0.4)
        cx = self.barrer_morceau(ic, 0.3) if signe == "−" else VGroup()
        self.suivre("q égale")
        self.play(FadeIn(qe, shift=UP * 0.1), run_time=0.2)
        self.devoiler([(un, "1"), (op, "plus" if signe == "+" else "moins"), (VGroup(fr_.num, fr_.trait), "t sur"),
                       (fr_.den, "100")], run_time=0.2)
        return VGroup(ic, cx, g)

    def ecran_formule(self):
        self.nouvel_ecran("02-formule")
        b = Barre(-30, W=8.0, h=0.7, gauche=P(-4.0, 1.85))
        self.au_mot("Baisser")
        self.play(GrowFromEdge(VGroup(b.bleu, b.morceau), LEFT), run_time=0.45)
        self.suivre("30 %")
        tit = self.t("Baisser de 30 %", 44, JAUNE_TITRE).move_to(P(0, 3.2))
        m30 = self.t("− 30 %", 38, RAISON).next_to(b.morceau, UP, buff=0.2)
        self.play(FadeIn(tit, shift=DOWN * 0.1), FadeIn(m30, scale=1.3),
                  Indicate(b.morceau, color=RAISON, scale_factor=1.08), run_time=0.4)
        self.au_mot("garder")
        self.barrer_morceau(b)
        self.suivre("70")
        acc = Brace(b.bleu, DOWN, buff=0.1, color=JUSTE)
        g70 = self.t("on garde 70 %", 38, JUSTE).next_to(acc, DOWN, buff=0.1)
        self.play(GrowFromCenter(acc), FadeIn(g70, shift=UP * 0.1), run_time=0.4)
        # « on multiplie par 1 − 30/100 = 0,7 »
        fs, y = 40, -0.35
        t1, (mp, un, mo) = self.decoupe("On multiplie par 1 −", ["On multiplie par", "1", "−"], fs,
                                        [GREY_A, WHITE, WHITE])
        fr_ = frac("30", "100", 34)
        t2, (eg, res) = self.decoupe("= 0,7", ["=", "0,7"], fs, [WHITE, RAISON])
        self.ligne([t1, fr_, t2], y, x=-6.2)
        cent = self.t("100 %", 36, TERME).next_to(b, LEFT, buff=0.3)
        self.au_mot("On multiplie")
        self.play(FadeIn(mp, shift=UP * 0.1), run_time=0.25)
        self.devoiler([(un, "1"), (mo, "moins"), (VGroup(fr_.num, fr_.trait), "30")], run_time=0.2)
        self.suivre("100")
        self.play(FadeIn(fr_.den, shift=UP * 0.1), FadeIn(cent, scale=1.3), run_time=0.25)
        self.devoiler([(eg, "égale"), (res, "0,7")], run_time=0.2)
        self.au_mot("la raison")
        qq, qp = self.qeg("0,7", 46)
        qq.move_to(P(4.4, y))
        cad = self.encadre(qq, RAISON, 0.18)
        self.play(FadeIn(qp[0], shift=UP * 0.1), run_time=0.25)
        self.suivre("0,7")
        self.play(FadeIn(qp[1], scale=1.4), Create(cad), run_time=0.3)
        self.insister(VGroup(qq, cad), 1.15)
        self.regle("t", "hausse", "+", -1.75)
        self.regle("t", "baisse", "−", -2.85)
        self.attendre_voix(marge=0.6)

    # ── 03 : des mots qui cachent une raison ───────────────────────────────

    def ecran_mots(self):
        self.nouvel_ecran("03-mots")
        self.titre("Des mots qui cachent une raison", JAUNE_TITRE, 44, extrait="Certains mots")
        U, X0, XQ = 1.15, -0.3, 4.05
        # (mots, extraits pour les mots, t de la barre, extrait de q, q, extrait du geste)
        lignes = [("Doubler", ["Doubler"], 100, "2", None),
                  ("Tripler", ["Tripler"], 200, "3", None),
                  ("Diviser par 2", ["Diviser", "2"], -50, "0,5", None),
                  ("Perdre un quart", ["Perdre"], -25, "0,75", "trois quarts"),
                  ("Augmenter de 100 %", ["Augmenter", "100"], 100, "2", None)]
        for k, (mot, exs, t, q, geste) in enumerate(lignes):
            y = 2.15 - 1.07 * k
            b = Barre(t, W=U, h=0.46, gauche=P(X0, y))
            m = self.t(mot, 36).move_to(P(0, y)).align_to(P(-6.2, 0), LEFT)
            qq, qp = self.qeg(q, 40)
            qq.move_to(P(0, y)).align_to(P(XQ, 0), LEFT)
            self.au_mot(exs[0]) if k == 0 else self.suivre(exs[0])
            for ex in exs[1:]:
                self.suivre(ex)
            if t > 0:
                self.play(FadeIn(m, shift=RIGHT * 0.15), GrowFromEdge(b.bleu, LEFT), run_time=0.25)
                self.play(GrowFromEdge(b.morceau, LEFT), run_time=0.25)
            else:
                self.play(FadeIn(m, shift=RIGHT * 0.15), GrowFromEdge(VGroup(b.bleu, b.morceau), LEFT), run_time=0.3)
                if geste:
                    self.suivre(geste)
                self.barrer_morceau(b, 0.25)
            self.suivre("q égale")
            self.play(FadeIn(qp[0], shift=UP * 0.1), run_time=0.15)
            self.suivre(q)
            self.play(FadeIn(qp[1], scale=1.4), run_time=0.2)
        self.attendre_voix(marge=0.6)

    # ── 04 : question-pause n° 1 : + 4 % → 1,04 (A) ────────────────────────

    def ecran_question1(self):
        q = self.poser_question("04-question",
                                [(self.t("Un abonnement augmente", 38), "Un abonnement"),
                                 (self.t("de 4 % chaque année.", 38), "4 %"),
                                 (self.t("La raison de la suite géométrique associée est :", 38), "La raison")],
                                [self.t(c, 40) for c in ("1,04", "1,4", "0,04")], 0, en_ligne=True, largeur=3.3,
                                fs=40)
        self.dire("04b-reponse")
        self.q_reponse(q, 0)
        fs, y = 40, q.cartes.get_bottom()[1] - 1.0
        t1, (un, pl) = self.decoupe("1 +", ["1", "+"], fs, [JUSTE, JUSTE])
        fr_ = frac("4", "100", 34, JUSTE)
        t2, (eg, res) = self.decoupe("= 1,04", ["=", "1,04"], fs, [JUSTE, JUSTE])
        self.ligne([t1, fr_, t2], y)
        self.devoiler([(un, "1"), (pl, "plus"), (VGroup(fr_.num, fr_.trait), "4"), (fr_.den, "100"),
                       (eg, "égale"), (res, "1,04")], run_time=0.2)
        b = Barre(4, W=5.0, h=0.55, gauche=P(-2.6, y - 1.25))
        tout = self.t("on garde tout", 30, WHITE).move_to(b.bleu)
        self.au_mot("on garde tout")
        self.play(GrowFromEdge(b.bleu, LEFT), FadeIn(tout), run_time=0.4)
        self.au_mot("on ajoute")
        p4 = self.t("+ 4 %", 38, RAISON).next_to(b.morceau, RIGHT, buff=0.25)
        self.play(GrowFromEdge(b.morceau, LEFT), run_time=0.25)
        self.suivre("4 %")
        self.play(FadeIn(p4, scale=1.4), Flash(b.morceau, color=RAISON, line_length=0.15), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 05 : dans l'autre sens : q − 1 ─────────────────────────────────────

    def colonne_inverse(self, xc, q, res, t, mot):
        """Une colonne : q = …, puis q − 1 = …, la barre, « baisse / hausse de t % »."""
        fs = 40
        qq, qp = self.qeg(q, 46)
        qq.move_to(P(xc, 1.15))
        self.suivre("q égale")
        self.play(FadeIn(qp[0], shift=UP * 0.1), run_time=0.2)
        self.suivre(q)
        self.play(FadeIn(qp[1], scale=1.4), run_time=0.25)
        ca, (a, mo, un, eg, r) = self.decoupe(f"{q} − 1 = {res}", [q, "−", "1", "=", res], fs,
                                              [WHITE] * 4 + [RAISON])
        ca.move_to(P(xc, 0.0))
        self.devoiler([(a, q), (mo, "moins"), (un, "1"), (eg, "égale"),
                       (r, res.replace("−", ""))], run_time=0.2)
        W = 3.6
        b = Barre(t, W=W, h=0.55, gauche=P(xc - (W + (W * t / 100 if t > 0 else 0)) / 2, -1.15))
        v, vp = self.decoupe(f"{mot} de {abs(t)} %", [f"{mot} de", f"{abs(t)} %"], 40, [JUSTE, JUSTE])
        v.move_to(P(xc, -2.25))
        self.suivre(mot)
        self.play(GrowFromEdge(VGroup(b.bleu, b.morceau), LEFT), FadeIn(vp[0], shift=UP * 0.1), run_time=0.3)
        self.suivre(f"{abs(t)} %")
        cad = self.encadre(v, JUSTE, 0.15)
        anims = [FadeIn(vp[1], scale=1.3), Create(cad)]
        if t < 0:
            cx = self.barrer(b.morceau, buff=0.04).set_stroke(width=5)
            anims += [Create(cx), b.morceau.animate.set_fill(opacity=0.35)]
        else:
            anims.append(Flash(b.morceau, color=RAISON, line_length=0.15))
        self.play(*anims, run_time=0.3)
        return VGroup(qq, a, mo, un, eg, r, b, v, cad)

    def ecran_inverse(self):
        self.nouvel_ecran("05-inverse")
        self.titre("Dans l'autre sens", JAUNE_TITRE, 46, extrait="Dans l'autre")
        rg, (r1, r2, r3) = self.decoupe("On retire 1 à la raison", ["On retire", "1", "à la raison"], 40,
                                        [WHITE, RAISON, WHITE])
        rg.move_to(P(0, 2.3))
        self.au_mot("on retire")
        self.play(FadeIn(r1, shift=UP * 0.1), run_time=0.25)
        self.devoiler([(r2, "1"), (r3, "à la raison")], run_time=0.25)
        self.play(Create(self.encadre(rg, RAISON, 0.15)), run_time=0.3)
        sep = DashedLine(P(0, 1.5), P(0, -2.7), color=GREY_D, stroke_width=2)
        self.play(Create(sep), run_time=0.2)
        self.colonne_inverse(-3.3, "0,85", "−0,15", -15, "baisse")
        self.colonne_inverse(3.1, "1,2", "0,2", 20, "hausse")
        self.attendre_voix(marge=0.6)

    # ── 06 : retour à Ylan : × 0,7 deux fois → × 0,49 ──────────────────────

    def ecran_global(self):
        self.nouvel_ecran("06-global")
        XS, YC, H = (-3.8, 0.0, 3.8), -0.3, 2.0
        perso = ylan(0.6).move_to(P(-5.75, 2.55))
        nom = self.t("Ylan", 32, JAUNE_TITRE).next_to(perso, DOWN, buff=0.15)
        self.au_mot("Ylan")
        self.play(FadeIn(perso, shift=UP * 0.2), FadeIn(nom), run_time=0.4)
        lg = LigneTermes(["200 000", "140 000", "98 000"], xs=XS, centre=P(0, YC), largeur=2.6, hauteur=0.85,
                         fs=40)
        noms = [self.t(f"semaine {k + 1}", 28, GREY_A, audit=False).move_to(P(x, 0.45)) for k, x in enumerate(XS)]
        y0 = 0.75

        def barre(v, x):
            return Rectangle(width=1.3, height=H * v / 200000, fill_color=TERME, fill_opacity=0.85,
                             stroke_color=WHITE, stroke_width=2).move_to(P(x, y0), aligned_edge=DOWN)
        bars = [barre(v, x) for v, x in zip((200000, 140000, 98000), XS)]
        self.suivre("200 000")
        self.play(GrowFromEdge(bars[0], DOWN), FadeIn(noms[0]), FadeIn(lg.cases[0][0], scale=0.8),
                  FadeIn(lg.cases[0][1], scale=1.4), run_time=0.4)
        for k in (0, 1):
            v_av = (200000, 140000)[k]
            if k:
                self.suivre("140 000")
                self.play(Indicate(lg.cases[1], color=TERME, scale_factor=1.12), run_time=0.3)
            self.suivre("0,7")
            s = lg.saut(k, "× 0,7", fs=34)
            lg.sauts[k] = s
            copie = bars[k].copy()
            perte = Rectangle(width=1.3, height=H * v_av * 0.3 / 200000, fill_color=RAISON, fill_opacity=0.95,
                              stroke_color=WHITE, stroke_width=2).move_to(P(XS[k + 1], y0 + bars[k + 1].height),
                                                                          aligned_edge=DOWN)
            bille = Dot(s[0].get_start(), radius=0.07, color=RAISON)
            self.play(Create(s[0]), MoveAlongPath(bille, s[0].copy()), FadeIn(s[1], scale=1.4),
                      copie.animate.move_to(bars[k + 1], aligned_edge=DOWN)
                      .stretch_to_fit_height(bars[k + 1].height, about_edge=DOWN), FadeIn(perte), run_time=0.5)
            self.remove(bille)
            self.suivre(("140 000", "98 000")[k])
            self.play(FadeOut(perte, shift=UP * 0.3), FadeIn(noms[k + 1]), FadeIn(lg.cases[k + 1][0], scale=0.8),
                      FadeIn(lg.cases[k + 1][1], scale=1.4), run_time=0.35)
        self.au_mot("Sur deux semaines")
        g = lg.saut(0, " ", j=2, creux=1.95)[0].set_color(JUSTE)
        self.play(Create(g), run_time=0.5)
        lab_g, lab = self.decoupe("× 0,7² = 0,49", ["× 0,7²", "=", "0,49"], 38, [JUSTE] * 3)
        lab_g.next_to(g, DOWN, buff=0.08)
        self.suivre("0,7")
        self.play(FadeIn(lab[0], scale=1.3), run_time=0.25)
        self.suivre("0,49")
        self.play(FadeIn(lab[1]), FadeIn(lab[2], scale=1.4), run_time=0.25)
        self.insister(lab_g, 1.15)
        self.attendre_voix(marge=0.6)

    # ── 07 : le piège : deux baisses de 30 % ≠ une baisse de 60 % ──────────

    def ecran_piege(self):
        self.nouvel_ecran("07-piege")
        self.titre("Le piège !", PIEGE, 48, extrait="piège")
        fs = 42
        lt, (a1, pu, a2, ne, b60) = self.decoupe("− 30 % puis − 30 % ne fait pas − 60 %",
                                                 ["− 30 %", "puis", "− 30 %", "ne fait pas", "− 60 %"], fs,
                                                 [RAISON, GREY_A, RAISON, WHITE, PIEGE])
        lt.move_to(P(-0.4, 2.1))
        self.au_mot("Deux baisses")
        self.suivre("30 %")
        self.play(FadeIn(a1, shift=UP * 0.1), run_time=0.2)
        self.play(FadeIn(pu), FadeIn(a2, shift=UP * 0.1), run_time=0.25)
        self.au_mot("ne font pas")
        self.play(FadeIn(ne, shift=UP * 0.1), run_time=0.25)
        self.suivre("60 %")
        self.play(FadeIn(b60, scale=1.3), run_time=0.25)
        self.biffer(b60)
        # la barre : × 0,49 → on garde 49 %, la baisse globale est de 51 %
        b = Barre(-51, W=8.0, h=0.7, gauche=P(-3.6, 0.55))
        x49 = self.t("× 0,49", 40, RAISON).next_to(b, LEFT, buff=0.35)
        self.au_mot("Multiplier")
        self.play(GrowFromEdge(VGroup(b.bleu, b.morceau), LEFT), run_time=0.4)
        self.suivre("0,49")
        self.play(FadeIn(x49, scale=1.3), run_time=0.25)
        self.au_mot("garder")
        acc = Brace(b.bleu, DOWN, buff=0.1, color=JUSTE)
        g49t, g49 = self.decoupe("on garde 49 %", ["on garde", "49 %"], 34, [JUSTE, JUSTE])
        g49t.next_to(acc, DOWN, buff=0.1)
        self.play(GrowFromCenter(acc), FadeIn(g49[0], shift=UP * 0.1), run_time=0.3)
        self.suivre("49 %")
        self.play(FadeIn(g49[1], scale=1.3), run_time=0.25)
        self.au_mot("la baisse globale")
        self.barrer_morceau(b)
        acc2 = Brace(b.morceau, DOWN, buff=0.1, color=RAISON)
        m51t, m51 = self.decoupe("baisse globale : 51 %", ["baisse globale :", "51 %"], 34, [RAISON, RAISON])
        m51t.next_to(acc2, DOWN, buff=0.1)
        if m51t.get_left()[0] < g49t.get_right()[0] + 0.4:
            m51t.shift(RIGHT * (g49t.get_right()[0] + 0.4 - m51t.get_left()[0]))
        self.play(GrowFromCenter(acc2), FadeIn(m51[0], shift=UP * 0.1), run_time=0.3)
        self.suivre("51 %")
        self.play(FadeIn(m51[1], scale=1.3), run_time=0.25)
        self.insister(m51[1], 1.3)
        # la règle
        self.au_mot("Les pourcentages")
        cx = self.barrer(Square(0.34))
        par = self.paragraphe([("Les pourcentages successifs", PIEGE), ("ne s'additionnent pas :", PIEGE)], 38,
                              buff=0.08)
        par[1].align_to(par[0], LEFT)
        l1 = VGroup(cx, par)
        l1.arrange(RIGHT, buff=0.25).move_to(P(0, -1.75)).align_to(P(-6.0, 0), LEFT)
        self.play(Create(cx), FadeIn(l1[1], shift=UP * 0.1), run_time=0.4)
        self.au_mot("les coefficients")
        ok = self.coche(JUSTE, 0.2)
        l2 = VGroup(ok, self.t("les coefficients se multiplient.", 38, JUSTE)).arrange(RIGHT, buff=0.25)
        l2.next_to(l1, DOWN, buff=0.25).align_to(l1, LEFT)
        self.play(Create(ok), FadeIn(l2[1], shift=UP * 0.1), run_time=0.4)
        self.insister(l2, 1.08)
        self.attendre_voix(marge=0.6)

    # ── 08 : question-pause n° 2 : q = 1,1, de u₀ à u₂ → + 21 % (C) ─────────

    def ecran_question2(self):
        q = self.poser_question("08-question",
                                [(self.t("Une suite géométrique a pour raison", 38), "Une suite"),
                                 (self.t("q = 1,1.", 40, RAISON), "1,1"),
                                 (self.t("Entre u₀ et u₂, l'évolution globale est :", 38), "Entre")],
                                ["une hausse de 20 %", "une hausse de 121 %", "une hausse de 21 %"], 2, fs=36)
        self.dire("08b-reponse")
        self.q_reponse(q, 2)
        fs, y = 40, q.cartes.get_bottom()[1] - 0.6
        g, m = self.decoupe("1,1² = 1,21 ; 1,21 − 1 = 0,21",
                            ["1,1²", "=", "1,21", ";", "1,21", "−", "1", "=", "0,21"], fs,
                            [JUSTE] * 3 + [GREY_A] + [JUSTE] * 5)
        g.move_to(P(0, y))
        self.devoiler([(m[0], "1,1"), (m[1], "égale"), (m[2], "1,21"), (m[3], None), (m[4], "1,21"),
                       (m[5], "moins"), (m[6], "1"), (m[7], "égale"), (m[8], "0,21")], run_time=0.2)
        self.au_mot("hausse de 21")
        self.insister(q.cartes[2], 1.06)
        self.attendre_voix(marge=0.6)

    # ── 09 : le défi : la vidéo sur le cinéma ──────────────────────────────

    XS_VUES = (-1.4, 1.75, 4.9)

    def ecran_defi(self):
        self.nouvel_ecran("09-defi")
        self.titre("À toi de jouer !", JAUNE_TITRE, 48, extrait="À toi")
        lec = lecteur(2.3, 1.35).move_to(P(-5.0, 1.5))
        oe = oeil(1.0).next_to(lec, DOWN, buff=0.3).shift(LEFT * 0.55)
        vu = self.t("vues", 32, GREY_A).next_to(oe, RIGHT, buff=0.2)
        self.au_mot("Une vidéo")
        self.play(FadeIn(lec, scale=0.85), run_time=0.35)
        self.play(Indicate(lec[1], color=WHITE, scale_factor=1.3), run_time=0.3)
        lg = LigneTermes(["8 000", "10 000", "?"], xs=self.XS_VUES, centre=P(0, 1.2), largeur=2.35, hauteur=0.85,
                         fs=40, noms=["2026", "2027", "2028"], fs_noms=30)
        self.suivre("8 000")
        self.play(FadeIn(oe), FadeIn(vu), FadeIn(lg.cases[0][0], scale=0.8), FadeIn(lg.cases[0][1], scale=1.4),
                  run_time=0.35)
        self.suivre("2026")
        self.play(FadeIn(lg.noms[0], shift=UP * 0.08), run_time=0.2)
        self.suivre("10 000")
        self.play(FadeIn(lg.cases[1][0], scale=0.8), FadeIn(lg.cases[1][1], scale=1.4), run_time=0.3)
        self.suivre("2027")
        self.play(FadeIn(lg.noms[1], shift=UP * 0.08), run_time=0.2)
        self.au_mot("même taux")
        sauts = [lg.saut(k, "× ?", cote=UP, fs=34) for k in range(2)]
        self.play(*[Create(s[0]) for s in sauts], run_time=0.35)
        self.play(*[FadeIn(s[1], scale=1.4) for s in sauts], run_time=0.2)
        qs = [self.t("1. Quelle est la raison q ?", 38),
              self.t("2. De combien de % les vues augmentent-elles ?", 38),
              self.t("3. Combien de vues en 2028 ?", 38)]
        for k, m in enumerate(qs):
            m.move_to(P(0, -0.3 - 0.72 * k)).align_to(P(-6.2, 0), LEFT)
            m[0].set_color(RAISON)
            m[1].set_color(RAISON)
        self.au_mot("Quelle est la raison")
        self.play(FadeIn(qs[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("De combien")
        self.play(FadeIn(qs[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Et combien")
        self.play(FadeIn(qs[2][:-5], shift=UP * 0.1), run_time=0.3)
        self.suivre("2028")
        self.play(FadeIn(qs[2][-5:]), FadeIn(lg.cases[2], scale=1.2), FadeIn(lg.noms[2], shift=UP * 0.08),
                  run_time=0.3)
        self.defi_pause(-2.5, x=-0.6)
        self._defi = (lg, sauts, qs, lec, oe, vu)

    def ecran_correction(self):
        self.dire("09b-correction")
        lg, sauts, qs, lec, oe, vu = self._defi
        self.au_mot("Correction")
        cor = self.t("Correction", 48, JUSTE).move_to(P(0, 3.2))
        tit = [m for m in self.mobjects if isinstance(m, Text) and m.original_text == "À toi de jouer !"]
        self.play(*[FadeOut(m) for m in tit], FadeOut(VGroup(*qs)), FadeIn(cor, shift=DOWN * 0.1), run_time=0.4)
        fs, x = 40, -6.2
        t1, l1 = self.decoupe("q = 10 000 ÷ 8 000 = 1,25", ["q =", "10 000", "÷", "8 000", "=", "1,25"], fs,
                              [RAISON] + [WHITE] * 4 + [RAISON])
        t1.move_to(P(0, -0.45)).align_to(P(x, 0), LEFT)
        self.devoiler([(l1[0], "La raison"), (l1[1], "10 000"), (l1[2], "divisé"), (l1[3], "8 000"),
                       (l1[4], "égale"), (l1[5], "1,25")], run_time=0.2)
        nouveaux = [self.t("× 1,25", 34, RAISON).move_to(s[1]) for s in sauts]
        self.play(*[ReplacementTransform(s[1], n) for s, n in zip(sauts, nouveaux)], run_time=0.35)
        t2, l2 = self.decoupe("1,25 − 1 = 0,25 : hausse de 25 % par an",
                              ["1,25", "−", "1", "=", "0,25", ":", "hausse de", "25 %", "par an"], fs,
                              [WHITE] * 5 + [GREY_A] + [JUSTE] * 3)
        t2.move_to(P(0, -1.3)).align_to(P(x, 0), LEFT)
        self.devoiler([(l2[0], "1,25"), (l2[1], "moins"), (l2[2], "1"), (l2[3], "égale"), (l2[4], "0,25"),
                       (l2[5], "c'est"), (l2[6], None), (l2[7], "25 %"), (l2[8], "par an")], run_time=0.2)
        self.insister(VGroup(*l2[6:]), 1.12)
        t3, l3 = self.decoupe("En 2028 : 10 000 × 1,25 = 12 500 vues",
                              ["En 2028 :", "10 000", "×", "1,25", "=", "12 500", "vues"], fs,
                              [GREY_A] + [WHITE] * 4 + [JUSTE, JUSTE])
        t3.move_to(P(0, -2.15)).align_to(P(x, 0), LEFT)
        self.devoiler([(l3[0], "2028"), (l3[1], "10 000"), (l3[2], "fois"), (l3[3], "1,25"), (l3[4], "égale")],
                      run_time=0.2)
        self.suivre("12 500")
        rep = self.t("12 500", 40, JUSTE).move_to(lg.cases[2][1])
        self.play(FadeIn(l3[5], scale=1.3), FadeIn(l3[6]), lg.cases[2][0].animate.set_stroke(JUSTE, width=6),
                  ReplacementTransform(lg.cases[2][1], rep), run_time=0.35)
        self.insister(VGroup(*l3[5:]), 1.15)
        self.attendre_voix(marge=0.6)

    # ── 10 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        self.nouvel_ecran("10-finale", margo=0.65)
        self.au_mot("Ce que tu as appris")
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        fs, J, O = 40, JAUNE_TITRE, RAISON
        # une ligne = un seul Text (une ligne de base), coupé en morceaux dévoilés à la voix
        t1, h1 = self.decoupe("Hausse de t % : q = 1 +", ["Hausse de t % :", "q = 1 +"], fs, [J, O])
        f1 = frac("t", "100", 34, O)
        t2, h2 = self.decoupe("Baisse de t % : q = 1 −", ["Baisse de t % :", "q = 1 −"], fs, [J, O])
        f2 = frac("t", "100", 34, O)
        t3a = self.t("Pour retrouver le pourcentage :", fs, J, audit=False)
        t3, h3 = self.decoupe("on retire 1 à la raison.", ["on retire", "1", "à la raison."], fs, [WHITE, O, WHITE])
        t4a = self.t("Sur plusieurs étapes :", fs, J, audit=False)
        t4 = self.t("les coefficients se multiplient.", fs, JUSTE, audit=False)
        lignes = [VGroup(t1, f1).arrange(RIGHT, buff=0.2), VGroup(t2, f2).arrange(RIGHT, buff=0.2),
                  VGroup(t3a, t3).arrange(DOWN, aligned_edge=LEFT, buff=0.14),
                  VGroup(t4a, t4).arrange(DOWN, aligned_edge=LEFT, buff=0.14)]
        blocs = [VGroup(self.coche(), l).arrange(RIGHT, buff=0.3, aligned_edge=UP) for l in lignes]
        for b in blocs[:2]:
            b[0].move_to(P(b[0].get_center()[0], b[1][0].get_center()[1]))
        for b in blocs[2:]:
            b[0].move_to(P(b[0].get_center()[0], b[1][0].get_center()[1]))
        tout = VGroup(*blocs).arrange(DOWN, aligned_edge=LEFT, buff=0.45)
        if tout.height > 5.7:
            tout.scale_to_fit_height(5.7)
        tout.move_to(P(-0.6, -0.4))
        plans = [[(h1[0], "Une hausse"), (h1[1], "1 plus"), (VGroup(f1.num, f1.trait), "t sur"), (f1.den, "100")],
                 [(h2[0], "une baisse"), (h2[1], "1 moins"), (VGroup(f2.num, f2.trait), "t sur"), (f2.den, "100")],
                 [(t3a, "Pour retrouver"), (h3[0], "on retire"), (h3[1], "1"), (h3[2], "à la raison")],
                 [(t4a, "sur plusieurs"), (t4, "les coefficients")]]
        for b, plan in zip(blocs, plans):
            self.suivre(plan[0][1])
            self.play(Create(b[0]), FadeIn(plan[0][0], shift=RIGHT * 0.2), run_time=0.35)
            self.devoiler(plan[1:], run_time=0.2)
        self.attendre_voix(marge=0.8)

    def construct(self):
        self.ecran_garde()
        self.ecran_situation()
        self.ecran_formule()
        self.ecran_mots()
        self.ecran_question1()
        self.ecran_inverse()
        self.ecran_global()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_appris()
        self.fin()
