# prop_pourcentage_defi.py
# EleveAI — Maths 4e — série « Proportionnalité », lot 5 (une paysage par
# micro), épisode 37 : DÉFIS SUR LES POURCENTAGES (micro du coach :
# prop_pourcentage_defi, notion prop_pourcentages), AVEC VOIX. PAYSAGE
# SEULEMENT (le short 4e-prop-pourcentages-short-defi existe déjà), CEINTURE
# VERTE (un défi garde la verte).
# ⭐ Méthodes travaillées : les COEFFICIENTS multiplicateurs enchaînés
# (− 20 % = × 0,8 ; − 10 % = × 0,9 ; + 10 % = × 1,1), le taux d'évolution
# (écart ÷ valeur de DÉPART), le calcul de tête en partant de 10 %. Pas de
# produit en croix (réservé à l'épisode 24) ; « ÷ » écrit, jamais 5/2.
# ⭐ Les dessins : la BARRE DE 100 % en morceaux (BarreCent de l'épisode 34,
# bâtie sur BarrePourcent etiquette=False) ; les coefficients « × 0,8 » écrits
# sur des FLÈCHES entre deux prix (chaîne de prix).
# ⭐ Fil rouge (erreur 4 de la consigne : + 20 % puis − 20 % ne ramène pas au
# départ ; les pourcentages successifs ne s'additionnent pas). Question 1 :
# A = « 20 + 10 = 30 % » (on additionne), barré à « pas de 30 % » ; C = 2 %
# barré à « 28 % ». Question 2 (5 € → 6 €) : A = + 1 % (l'euro pris pour un
# pourcentage) barré à « 1 euro de plus » ; C ≈ + 16,7 % (calculé sur la
# valeur d'arrivée) barré à « le prix de départ ». Piège 07 : 6 € → 5 €,
# « − 20 % » barré. Défi : + 10 % puis − 10 % → 11,88 €, pas 12 €.
#
# Décor et métier : Julia, DIRECTRICE d'un cinéma, avant la sortie d'un grand
# film (prix des places, entrées, pop-corn).
# Chiffres : tous inventés (prix, remises, entrées), plausibles. Aucun chiffre
# du monde réel : pas de source à citer.
# Centres d'intérêt : cinema-series, argent-budget.
#
# Écrans : 00 garde · 01 Julia, le cinéma, trois défis · 02 défi 1 : la place
# à 10 €, − 20 % puis − 10 % (× 0,8 puis × 0,9) · 03 QUESTION 1 (− 30 % en
# tout ?) · 04 défi 2 : 1 200 → 1 500 entrées, + 25 % · 05 défi 3 : 35 % de
# 1 500 de tête · 06 QUESTION 2 (pop-corn 5 € → 6 €) · 07 le piège (6 € → 5 €
# n'est pas − 20 %) · 08 défi (12 €, + 10 % puis − 10 %) · 08b correction ·
# 09 ce que tu as appris · 10 fin.
#
# Voix : manim/voix/4e-prop-pourcentage-defi.json (validée par Frédéric le
# 01/11, débit −10), WAV dans public/sons/4e-prop-pourcentage-defi/ ; marques
# mot à mot : manim/scripts/4e/prop_pourcentage_defi_marques.json
# (scripts/marques_dump.ps1 puis cues2marques_gap.py, seuil 0,5 s).
# Outils : manim/scripts/6e/prop_commun.py + manim/canvas_proportion.py (non
# modifiés) ; base PropPourcentageMentalBase de l'épisode 34 (BarreCent,
# titre_haut, cadre, barrer, lc, jouer, montre, barrer_choix, ligne_rep
# bornée). Ajouté ICI : julia(), clap(), ticket(), popcorn(), ecran_cine(),
# boite_prix(), fleche_h(), fleche_v(), partiel().
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/prop_pourcentage_defi.py PropPourcentageDefi4e
# PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/4e/prop_pourcentage_defi.py PropPourcentageDefi4e -o eleveai-maths-4e-prop-pourcentage-defi --media_dir manim/media-prop-4e-37
# Sortie : manim/sorties/4e/maths/proportionnalite/37-pourcentage-defi/eleveai-maths-4e-prop-pourcentage-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import importlib.util  # noqa: E402

from prop_ratio_ecrire import *  # noqa: E402,F403  (prop_commun, couleurs, sans)
from prop_ratio_ecrire import sans  # noqa: E402


def _charger(nom, chemin):
    spec = importlib.util.spec_from_file_location(nom, chemin)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_p34 = _charger("prop_pourcentage_mental_4e", Path(__file__).resolve().parent / "prop_pourcentage_mental.py")
BarreCent, PropPourcentageMentalBase = _p34.BarreCent, _p34.PropPourcentageMentalBase
M1, M2, M5, ROUGE_PROMO, gras = _p34.M1, _p34.M2, _p34.M5, _p34.ROUGE_PROMO, _p34.gras
croix = _p34.croix

TENUE_J = "#7c3aed"    # la veste de Julia (violet du cinéma)
ROUGE_CINE = "#b91c1c"  # les fauteuils et le pop-corn
TICKET_C = "#fde68a"
PRIX_C = "#38bdf8"     # le bord des boîtes de prix
ROUGE_R = "#f87171"    # une remise (morceau retiré)


def julia(s=1.0):
    """Julia, directrice du cinéma : cheveux longs, veste violette, béret."""
    p = personne(peau="#e0ac69", tenue=TENUE_J, cheveux="#78350f", longs=True)
    t = p.tete
    beret = Ellipse(width=t.width * 1.05, height=t.width * 0.32, fill_color="#111827", fill_opacity=1,
                    stroke_width=0).move_to(t.get_top() + DOWN * 0.04 + LEFT * 0.06).rotate(0.15)
    badge = RoundedRectangle(width=0.3, height=0.16, corner_radius=0.03, fill_color=JAUNE_TITRE, fill_opacity=1,
                             stroke_width=0).move_to(p.corps.get_center() + P(-0.15, 0.15))
    p.add(beret, badge)
    return p.scale(s)


def clap(s=1.0):
    """Le clap de cinéma : ardoise noire, barre rayée inclinée."""
    ard = Rectangle(width=1.6, height=1.0, fill_color="#111827", fill_opacity=1, stroke_color=WHITE,
                    stroke_width=3)
    barre = VGroup(*[Polygon(P(-0.8 + 0.4 * i, 0), P(-0.6 + 0.4 * i, 0), P(-0.4 + 0.4 * i, 0.25),
                             P(-0.6 + 0.4 * i, 0.25), fill_color=WHITE if i % 2 == 0 else "#111827",
                             fill_opacity=1, stroke_width=0) for i in range(4)])
    cadre = Rectangle(width=1.6, height=0.25, stroke_color=WHITE, stroke_width=3).move_to(P(0, 0.125))
    haut = VGroup(barre, cadre).next_to(ard, UP, buff=0.02)
    haut.rotate(0.25, about_point=ard.get_corner(UL) + UP * 0.02)
    traits = VGroup(*[Line(P(-0.65, y), P(0.65, y), color=GREY_B, stroke_width=2) for y in (0.1, -0.15)])
    return VGroup(ard, haut, traits).scale(s)


def ticket(txt="", fs=30, couleur=TICKET_C, s=1.0, l=None):
    """Un billet de cinéma : carte jaune, encoches rondes, pointillés, prix."""
    t = Text(txt or "CINÉMA", font_size=fs, color="#78350f", weight=BOLD)
    l = l or max(1.6, t.width + 0.9)
    h = max(0.8, t.height + 0.45)
    carte = RoundedRectangle(width=l, height=h, corner_radius=0.1, fill_color=couleur, fill_opacity=1,
                             stroke_color="#a16207", stroke_width=3)
    enc = VGroup(*[Circle(radius=0.13, fill_color="#0b1120", fill_opacity=1, stroke_width=0).move_to(
        carte.get_edge_center(d)) for d in (LEFT, RIGHT)])
    pt = DashedLine(P(l / 2 - 0.4, h / 2 - 0.06), P(l / 2 - 0.4, -h / 2 + 0.06), color="#a16207", stroke_width=2)
    t.move_to(P(-0.18, 0))
    if not txt:
        sans(t)
    g = VGroup(carte, enc, pt, t).scale(s)
    g.texte = t
    return g


def popcorn(s=1.0):
    """Le cornet de pop-corn rayé rouge et blanc, débordant de grains."""
    corps = Polygon(P(-0.5, 0.45), P(0.5, 0.45), P(0.38, -0.6), P(-0.38, -0.6), fill_color=WHITE, fill_opacity=1,
                    stroke_width=0)
    raies = VGroup(*[Polygon(P(-0.5 + 0.25 * i, 0.45), P(-0.375 + 0.25 * i, 0.45),
                             P(-0.38 + 0.19 * i + 0.095, -0.6), P(-0.38 + 0.19 * i, -0.6),
                             fill_color=ROUGE_CINE, fill_opacity=1, stroke_width=0) for i in range(4)])
    grains = VGroup(*[Circle(radius=0.15, fill_color="#fef3c7", fill_opacity=1, stroke_color="#f59e0b",
                             stroke_width=2).move_to(P(x, y))
                      for x, y in [(-0.36, 0.52), (-0.12, 0.6), (0.12, 0.56), (0.36, 0.5), (-0.24, 0.75),
                                   (0.02, 0.8), (0.26, 0.72)]])
    return VGroup(corps, raies, grains).scale(s)


def ecran_cine(l=3.0, h=1.6):
    """L'écran de cinéma (lumineux) et une rangée de fauteuils rouges."""
    ec = RoundedRectangle(width=l, height=h, corner_radius=0.08, fill_color="#e0f2fe", fill_opacity=1,
                          stroke_color=GREY_B, stroke_width=4)
    rayon = VGroup(*[Line(ec.get_bottom() + DOWN * 1.2, ec.get_corner(c), color="#fef9c3", stroke_width=2,
                          stroke_opacity=0.5) for c in (UL, UR)])
    fauteuils = VGroup(*[RoundedRectangle(width=0.42, height=0.38, corner_radius=0.08, fill_color=ROUGE_CINE,
                                          fill_opacity=1, stroke_width=0) for _ in range(5)]).arrange(
        RIGHT, buff=0.12).next_to(ec, DOWN, buff=0.35)
    g = VGroup(rayon, ec, fauteuils)
    g.ecran, g.fauteuils = ec, fauteuils
    return g


def boite_prix(txt, couleur=WHITE, fs=34, bord=PRIX_C):
    """Un prix dans sa boîte arrondie (maillon de la chaîne de prix)."""
    t = gras(txt, fs, couleur)
    b = RoundedRectangle(width=t.width + 0.4, height=t.height + 0.34, corner_radius=0.12, fill_color="#0f172a",
                         fill_opacity=1, stroke_color=bord, stroke_width=4).move_to(t)
    g = VGroup(b, t)
    g.texte, g.boite = t, b
    return g


def fleche_h(a, b, s, couleur=AMBRE, fs=30):
    """La flèche « × 0,8 » de la boîte a à la boîte b (étiquette au-dessus)."""
    fl = Arrow(a.get_right(), b.get_left(), buff=0.08, color=couleur, stroke_width=6,
               max_tip_length_to_length_ratio=0.25)
    et = gras(s, fs, couleur).next_to(fl, UP, buff=0.08)
    g = VGroup(fl, et)
    g.fleche, g.etiquette = fl, et
    return g


def fleche_v(a, b, s, couleur=AMBRE, fs=30):
    """La flèche verticale « × 1,1 » de a (en haut) à b (en bas), étiquette à droite."""
    fl = Arrow(a.get_bottom(), b.get_top(), buff=0.08, color=couleur, stroke_width=6,
               max_tip_length_to_length_ratio=0.3)
    et = gras(s, fs, couleur).next_to(fl, RIGHT, buff=0.15)
    g = VGroup(fl, et)
    g.fleche, g.etiquette = fl, et
    return g


def partiel(barre, i, frac, couleur, gauche=True):
    """Un morceau de barre rempli en partie (72 % = 7 morceaux + 0,2 du 8e)."""
    m = barre.morceaux[i]
    r = Rectangle(width=barre.lm * frac, height=barre.hh, stroke_width=0, fill_color=couleur, fill_opacity=1)
    return r.align_to(m, LEFT if gauche else RIGHT).set_y(m.get_y())


pastille_pct = _p34.pastille_pct


class PropPourcentageDefiBase(PropPourcentageMentalBase):
    nom_voix = "4e-prop-pourcentage-defi"
    fichier_marques = "prop_pourcentage_defi_marques.json"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défis sur les pourcentages", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Défis")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        cl = clap(1.0).move_to(P(-4.4, 0.55))
        tk = ticket("", 30, s=1.0).move_to(P(4.3, 0.55))
        pc = popcorn(1.0).move_to(P(0.0, 0.7))
        self.play(FadeIn(cl, shift=RIGHT * 0.3), FadeIn(tk, shift=LEFT * 0.3), FadeIn(pc, shift=UP * 0.2),
                  run_time=0.6)
        self.au_mot("Le cinéma")
        nom = self.t("Le cinéma de Julia", 34, AMBRE).move_to(P(0.0, -0.75))
        self.play(FadeIn(nom, shift=UP * 0.15), Indicate(cl, color=AMBRE), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : Julia, directrice de cinéma ; trois défis ──────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = julia(1.0).move_to(P(-5.5, -0.9))
        nom = self.t("Julia", 40, "#a78bfa").next_to(pers, UP, buff=0.3)
        self.montre("Voici Julia", FadeIn(pers, shift=UP * 0.3), FadeIn(nom), rt=0.6)
        met = self.t("directrice de cinéma", 28, "#a78bfa").next_to(pers, DOWN, buff=0.15)
        met.shift(RIGHT * max(0, -6.4 - met.get_left()[0]))
        sal = ecran_cine(3.0, 1.5).move_to(P(-2.3, 1.55))
        self.montre("dirige", FadeIn(met, shift=DOWN * 0.1), FadeIn(sal, shift=DOWN * 0.2), rt=0.6)
        tk = ticket("", 26, s=0.8).move_to(P(-3.0, -0.75))
        pc = popcorn(0.75).move_to(P(-1.2, -0.85))
        L1 = self.lc([("Prix des places,", JAUNE_TITRE)], 2.2, fs=40)
        self.jouer(L1, ["Prix des"], {0: [FadeIn(tk, shift=UP * 0.2)]})
        L2 = self.lc([("entrées,", WHITE)], 1.45, fs=40)
        self.jouer(L2, ["entrées"], {0: [LaggedStart(*[Indicate(f, color=AMBRE, scale_factor=1.25)
                                                       for f in sal.fauteuils], lag_ratio=0.15)]})
        L3 = self.lc([("pop-corn :", AMBRE)], 0.7, fs=40)
        self.jouer(L3, ["pop-corn"], {0: [FadeIn(pc, shift=UP * 0.2)]})
        L4 = self.lc([("tout calculer !", VERT_OK)], -0.1, fs=44)
        self.jouer(L4, ["tout calculer"])
        L5 = self.lc([("Trois défis", ORANGE_RETENUE)], -1.0, fs=50)
        self.jouer(L5, ["Trois défis"])
        cadre = SurroundingRectangle(L5, color=ORANGE_RETENUE, buff=0.18, corner_radius=0.12, stroke_width=5)
        self.play(Create(cadre), Indicate(pers.tete, color=ORANGE_RETENUE, scale_factor=1.15), run_time=0.6)
        self.attendre_voix()

    # ── 02 : défi 1 : la place à 10 €, − 20 % puis − 10 % ───────────────────
    def ecran_defi1(self):
        self.ecran("02-defi1")
        self.titre_haut("Défi 1 : la place", "Défi 1")
        xl = 0.9
        a = BarreCent("10 €", largeur=6.0, h=0.75, centre=P(-3.4, 1.15), fs_prix=34)
        v1 = sans(a.valeurs("1 €", fs=22))
        L1 = self.lc([("La place :", WHITE), ("10 €", JAUNE_TITRE)], 2.2, fs=40, xl=xl)
        self.jouer(L1, ["la place", "10 euros"],
                   {1: [FadeIn(a, shift=UP * 0.2), GrowFromCenter(a.acc), FadeIn(a.prix, shift=DOWN * 0.15)]})
        self.play(LaggedStart(*[FadeIn(v, scale=1.3) for v in v1], lag_ratio=0.05), run_time=0.5)
        br, t20 = a.dessous(VGroup(*a.morceaux[8:]), "− 20 %", ROUGE_PROMO, fs=28)
        L2 = self.lc([("Mercredi :", WHITE), ("− 20 %", ROUGE_PROMO)], 1.45, fs=40, xl=xl)
        self.jouer(L2, ["Le mercredi", "20 %"], {1: [*a.colorer([8, 9], ROUGE_R), GrowFromCenter(br), FadeIn(t20)]})
        L3 = self.lc([("Carte étudiant :", WHITE), ("− 10 %", ROUGE_PROMO)], 0.7, fs=40, xl=xl)
        self.jouer(L3, ["la carte", "10 % de remise"])
        # la chaîne de prix (sous la barre)
        y = -1.6
        b10 = boite_prix("10 €", JAUNE_TITRE, fs=30).move_to(P(-5.9, y))
        b8 = boite_prix("8 €", WHITE, fs=30).move_to(P(-3.45, y))
        b7 = boite_prix("7,20 €", VERT_OK, fs=30).move_to(P(-0.3, y))  # -0,5 : « × 0,9 » contre la boîte (vérif. du 01/11)
        f1, f2 = fleche_h(b10, b8, "× 0,8", fs=28), fleche_h(b8, b7, "× 0,9", fs=28)
        L4 = self.lc([("10 ×", WHITE), ("0,8", AMBRE), ("=", WHITE), ("8 €", VERT_OK)], -0.15, fs=42, xl=xl)
        self.jouer(L4, ["10 fois", "0,8, égale", None, "8 euros"],
                   {0: [FadeIn(b10, shift=UP * 0.15)], 1: [GrowArrow(f1.fleche), FadeIn(f1.etiquette)],
                    3: [FadeIn(b8, scale=1.2), Circumscribe(VGroup(*a.morceaux[:8]), color=VERT_OK, buff=0.05)]})
        L5 = self.lc([("8 ×", WHITE), ("0,9", AMBRE), ("=", WHITE), ("7,20 €", VERT_OK)], -0.95, fs=42, xl=xl)
        self.jouer(L5, ["8 fois", "0,9, égale", None, "7,20 euros"],
                   {1: [GrowArrow(f2.fleche), FadeIn(f2.etiquette)], 3: [FadeIn(b7, scale=1.2)]})
        self.play(Create(self.cadre(L5[3])), Create(self.cadre(b7)), run_time=0.35)
        self.attendre_voix()

    # ── 03 : QUESTION 1 (− 20 % puis − 10 % : − 30 % ?) → B, 28 % ───────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        tk = sans(ticket("10 €", 40, s=1.0)).move_to(P(-3.6, 1.0))
        p1 = sans(pastille_pct(20, 0.85)).move_to(P(-4.6, -0.6))
        p2 = sans(pastille_pct(10, 0.85)).move_to(P(-2.6, -0.6))

        def avant(sc):
            sc.add(tk, p1, p2)

        def apres(sc):
            b = BarreCent("10 €", largeur=5.6, h=0.8, centre=P(-3.4, 0.45), fs_prix=30)
            sans(b.prix)
            vert = VGroup(*[b.morceaux[i].copy().set_fill(VERT_OK, 1) for i in range(7)], partiel(b, 7, 0.2, VERT_OK))
            rouge = VGroup(partiel(b, 7, 0.8, ROUGE_R, gauche=False),
                           *[b.morceaux[i].copy().set_fill(ROUGE_R, 1) for i in (8, 9)])
            bv, t72 = b.dessous(vert, "72 %", VERT_OK, fs=28)
            bh, t28 = b.dessous(rouge, "28 %", ROUGE_R, fs=28)
            t720 = gras("7,20 €", 30, VERT_OK).next_to(t72, DOWN, buff=0.12)
            pas7 = gras("pas 7 €", 28, ROUGE_ERREUR).next_to(t720, RIGHT, buff=0.4)
            x7 = sc.barrer(pas7)
            l0 = sc.ligne_rep(0, ["0,8 × 0,9 =", "0,72"])
            l1 = sc.ligne_rep(1, ["72 % payés :", "− 28 %"])
            sc.montre("0,9, égale", FadeOut(VGroup(tk, p1, p2)), FadeIn(b, shift=UP * 0.2),
                      GrowFromCenter(b.acc), FadeIn(b.prix), FadeIn(l0[0], shift=UP * 0.15), rt=0.45)
            sc.montre("0,72. On", FadeIn(l0[1], scale=1.3), rt=0.35)
            sc.montre("72 % du", FadeIn(l1[0], shift=UP * 0.15), FadeIn(vert), GrowFromCenter(bv),
                      FadeIn(t72, scale=1.3), rt=0.5)
            sc.montre("28 %, pas", FadeIn(l1[1], scale=1.3), FadeIn(rouge), GrowFromCenter(bh),
                      FadeIn(t28, scale=1.3), Create(sc.barrer_choix(2)), rt=0.5)
            sc.montre("pas de 30", Create(sc.barrer_choix(0)), rt=0.45)
            sc.montre("7,20 euros", FadeIn(t720, scale=1.3), rt=0.4)
            sc.montre("pas 7 euros", FadeIn(pas7), rt=0.3)
            sc.play(Create(x7), run_time=0.3)
            sc.rep_fini()

        self.question_pause("03-question", "03b-reponse", ["− 20 %, puis − 10 % :", "− 30 % en tout ?"],
                            [self.t("Oui : 20 + 10 = 30", 34), self.t("Non : 28 %", 34), self.t("Non : 2 %", 34)],
                            1, ["0,8 × 0,9 = 0,72", "72 % payés : − 28 %"],
                            mot_q="30 % en", avant_q=avant, autres_r=apres, mots_choix=("A :", "B :", "2 %."))

    # ── 04 : défi 2 : 1 200 → 1 500 entrées, + 25 % ─────────────────────────
    def ecran_defi2(self):
        self.ecran("04-defi2")
        self.titre_haut("Défi 2 : les entrées", "Défi 2")
        xl = 0.6
        a = BarreCent("1 200 entrées", largeur=4.8, h=0.75, n=4, centre=P(-4.0, 1.2), fs_prix=30)
        b = BarreCent("", largeur=5.96, h=0.75, n=5, centre=P(-3.42, -0.6))
        bb, t15 = a.dessous(b.bp.piste, "1 500 entrées", JAUNE_TITRE, fs=30, buff=0.1)
        L1 = self.lc([("Semaine dernière :", WHITE), ("1 200", JAUNE_TITRE)], 2.2, fs=40, xl=xl)
        self.jouer(L1, ["La semaine", "1 200"],
                   {1: [FadeIn(a, shift=UP * 0.2), GrowFromCenter(a.acc), FadeIn(a.prix, shift=DOWN * 0.15)]})
        L2 = self.lc([("Cette semaine :", WHITE), ("1 500", JAUNE_TITRE)], 1.45, fs=40, xl=xl)
        self.jouer(L2, ["Cette semaine", "1 500. L"],
                   {1: [FadeIn(b, shift=UP * 0.2), GrowFromCenter(bb), FadeIn(t15, shift=UP * 0.15)]})
        va = a.valeurs("300", fs=26)
        vb = b.valeurs("300", fs=26)
        pt = DashedLine(a.bp.piste.get_corner(DR) + DOWN * 0.05, b.morceaux[4].get_corner(UL) + UP * 0.05,
                        color=AMBRE, stroke_width=3)
        L3 = self.lc([("1 500 − 1 200", WHITE), ("= 300", VERT_OK)], 0.6, fs=40, xl=xl)
        self.jouer(L3, [("1 200", 2), "300. 300"],
                   {1: [*b.colorer([4], AMBRE), Create(pt),
                        LaggedStart(*[FadeIn(v, scale=1.3) for v in [*va, *vb]], lag_ratio=0.05)]})
        L4 = self.lc([("300 ÷ 1 200", WHITE), ("= 0,25", VERT_OK)], -0.2, fs=40, xl=xl)
        self.jouer(L4, [("1 200", 3), "0,25 :"], {0: [Circumscribe(a.bp.piste, color=AMBRE, buff=0.06)]})
        t25 = gras("+ 25 %", 30, VERT_OK).next_to(b.morceaux[4], UP, buff=0.12).shift(RIGHT * 0.25)
        L5 = self.lc([("+ 25 %", VERT_OK)], -1.05, fs=56, xl=xl)
        self.jouer(L5, ["25 %."], {0: [FadeIn(t25, scale=1.3), Indicate(b.morceaux[4], color=VERT_OK)]})
        self.play(Create(self.cadre(L5[0])), run_time=0.3)
        self.attendre_voix()

    # ── 05 : défi 3 : 35 % de 1 500 spectateurs, de tête ───────────────────
    def ecran_defi3(self):
        self.ecran("05-defi3")
        self.titre_haut("Défi 3 : le pop-corn", "Défi 3")
        a = BarreCent("1 500 spectateurs", largeur=7.4, centre=P(self.XB, 1.1), fs_prix=30)
        pc = popcorn(0.9).move_to(P(-5.2, -1.7))
        L1 = self.lc([("35 %", AMBRE), ("en achètent", WHITE)], 2.2, fs=38, xl=self.XC)
        self.jouer(L1, ["35 % des", "en achètent"], {1: [FadeIn(pc, shift=UP * 0.2)]})
        L2 = self.lc([("Sur", WHITE), ("1 500", JAUNE_TITRE)], 1.5, fs=38, xl=self.XC)
        self.jouer(L2, ["Sur 1 500", None],
                   {1: [FadeIn(a, shift=UP * 0.2), GrowFromCenter(a.acc), FadeIn(a.prix, shift=DOWN * 0.15)]})
        va = a.valeurs("150", fs=22)
        L3 = self.lc([("10 % =", M1), ("150", VERT_OK)], 0.75, fs=38, xl=self.XC)
        self.jouer(L3, ["10 %, égale", "150. 30"],
                   {0: [*a.colorer([0], M1)], 1: [LaggedStart(*[FadeIn(v, scale=1.4) for v in va], lag_ratio=0.05)]})
        r450, t450 = a.dessous(VGroup(*a.morceaux[:3]), "450", VERT_OK, fs=30)
        L4 = self.lc([("30 % =", M2), ("450", VERT_OK)], 0.0, fs=38, xl=self.XC)
        self.jouer(L4, ["30 %, égale", "450. 5"],
                   {0: [*a.colorer([1, 2], M2)], 1: [GrowFromCenter(r450), FadeIn(t450, scale=1.3)]})
        d = a.demi(3)
        t75 = a.valeur(3, "75", fs=20, largeur=a.lm / 2).move_to(d)
        L5 = self.lc([("5 % =", M5), ("75", VERT_OK)], -0.75, fs=38, xl=self.XC)
        self.jouer(L5, ["5 %, égale", "75. 35"],
                   {0: [FadeOut(va[3]), FadeIn(d, shift=DOWN * 0.1)], 1: [FadeIn(t75, scale=1.4)]})
        r525, t525 = a.dessous(VGroup(*a.morceaux[:3], d), "525", VERT_OK, fs=34)
        L6 = self.lc([("35 % =", WHITE), ("450 + 75", WHITE)], -1.5, fs=38, xl=self.XC)
        self.jouer(L6, ["35 %, égale", "450 plus"],
                   {0: [Circumscribe(VGroup(*a.morceaux[:3], d), color=AMBRE, buff=0.05)]})
        L7 = self.lc([("= 525", VERT_OK)], -2.2, fs=44, xl=self.XC + 0.6)
        self.jouer(L7, ["525 pop"], {0: [ReplacementTransform(r450, r525), FadeOut(t450), FadeIn(t525, scale=1.3)]})
        L6 = VGroup(*L6, *L7)
        tpc = sans(self.t("pop-corns", 30, VERT_OK)).next_to(t525, RIGHT, buff=0.2)
        self.au_mot("pop-corns")
        self.play(Create(self.cadre(L6[2])), FadeIn(tpc), Indicate(pc, color=AMBRE, scale_factor=1.15),
                  run_time=0.4)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (pop-corn 5 € → 6 €) → B, + 20 % ───────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        pc = popcorn(1.4).move_to(P(-3.7, 1.0))
        b5 = sans(boite_prix("5 €", JAUNE_TITRE)).move_to(P(-5.0, -1.1))
        b6 = sans(boite_prix("6 €", JAUNE_TITRE)).move_to(P(-2.4, -1.1))
        fl = Arrow(b5.get_right(), b6.get_left(), buff=0.1, color=AMBRE, stroke_width=6)

        def avant(sc):
            sc.add(pc, b5, b6, fl)

        def apres(sc):
            b = BarreCent("5 €", largeur=4.4, h=0.8, n=5, centre=P(-4.1, 0.45), fs_prix=30)
            sans(b.prix)
            v = sans(b.valeurs("1 €", fs=24))
            ext = Rectangle(width=b.lm, height=b.hh, fill_color=AMBRE, fill_opacity=1, stroke_color=WHITE,
                            stroke_width=3).next_to(b.bp.piste, RIGHT, buff=0.06)
            t1 = gras("1 €", 24, NUIT).move_to(ext)
            t20 = gras("+ 20 %", 28, VERT_OK).next_to(ext, RIGHT, buff=0.15)
            bd, td = b.dessous(b.bp.piste, "départ", JAUNE_TITRE, fs=28, buff=0.1)
            l0 = sc.ligne_rep(0, ["6 − 5 =", "1 €"])
            l1 = sc.ligne_rep(1, ["1 ÷ 5 =", "0,2 :", "+ 20 %"])
            sc.montre("5, égale", FadeOut(VGroup(pc, b5, b6, fl)), FadeIn(b, shift=UP * 0.2), GrowFromCenter(b.acc),
                      FadeIn(b.prix), FadeIn(v), FadeIn(l0[0], shift=UP * 0.15), rt=0.45)
            sc.montre("1 euro", FadeIn(l0[1], scale=1.2), FadeIn(ext, shift=LEFT * 0.2), FadeIn(t1),
                      Create(sc.barrer_choix(0)), rt=0.45)
            sc.montre("5, le", FadeIn(l1[0], shift=UP * 0.15), rt=0.35)
            sc.montre("prix de départ", GrowFromCenter(bd), FadeIn(sans(td)), Create(sc.barrer_choix(2)), rt=0.45)
            sc.montre("0,2, soit", FadeIn(l1[1], scale=1.2), rt=0.35)
            sc.montre("20 %.", FadeIn(l1[2], scale=1.2), FadeIn(t20, scale=1.3), rt=0.4)
            sc.rep_fini()

        self.question_pause("06-question", "06b-reponse", ["Pop-corn : de 5 € à 6 €.", "Quelle hausse ?"],
                            [self.t("+ 1 %", 34), self.t("+ 20 %", 34), self.t("≈ + 16,7 %", 34)], 1,
                            ["6 − 5 = 1 €", "1 ÷ 5 = 0,2 : + 20 %"],
                            mot_q="6 euros", avant_q=avant, autres_r=apres)

    # ── 07 : le piège : de 6 € à 5 €, ce n'est pas − 20 % ───────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        self.titre_haut("Attention au piège !", "Attention", couleur=ROUGE_ERREUR)
        xl = 0.9
        a = BarreCent("6 €", largeur=6.0, h=0.8, n=6, centre=P(-3.4, 0.5), fs_prix=34)
        v = sans(a.valeurs("1 €", fs=24))
        L1 = self.lc([("6 €", JAUNE_TITRE), ("→", WHITE), ("5 €", JAUNE_TITRE)], 2.2, fs=44, xl=xl)
        self.jouer(L1, ["6 euros", None, "5 euros"],
                   {0: [FadeIn(a, shift=UP * 0.2), FadeIn(v), GrowFromCenter(a.acc), FadeIn(a.prix, shift=DOWN * 0.15)],
                    2: [*a.colorer([5], ROUGE_R)]})
        L2 = self.lc([("− 20 % ?", ROUGE_ERREUR)], 1.4, fs=44, xl=xl)
        self.jouer(L2, ["20 %. 1"])
        self.play(Create(self.barrer(L2[0])), run_time=0.35)
        L3 = self.lc([("1 ÷ 6", WHITE), ("≈ − 16,7 %", VERT_OK)], 0.55, fs=40, xl=xl, droite=5.9)
        L3[0].shift(LEFT * 0.2)  # le cadre de « ≈ − 16,7 % » ne touche plus le « 6 »
        self.jouer(L3, ["6 : environ", "16,7"],
                   {0: [Circumscribe(a.bp.piste, color=AMBRE, buff=0.06)],
                    1: [Indicate(a.morceaux[5], color=ROUGE_ERREUR)]})
        self.play(Create(self.cadre(L3[1])), run_time=0.3)
        bd, td = a.dessous(a.bp.piste, "la valeur de départ", JAUNE_TITRE, fs=30, buff=0.12)
        sans(td)
        L4 = self.lc([("On calcule toujours", WHITE)], -0.35, fs=38, xl=xl)
        self.jouer(L4, ["Le pourcentage"])
        L5 = self.lc([("sur la valeur de départ !", VERT_OK)], -1.05, fs=38, xl=xl)
        self.jouer(L5, ["valeur de départ"], {0: [GrowFromCenter(bd), FadeIn(td, shift=UP * 0.15)]})
        self.play(Create(self.cadre(L5[0])), run_time=0.3)
        self.attendre_voix()

    # ── 08 : défi : la place à 12 €, + 10 % puis − 10 % ────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.titre_haut("À toi de jouer !", "À toi de jouer", fs=50)
        x = -4.6
        c12 = boite_prix("12 €", JAUNE_TITRE, fs=36).move_to(P(x, 1.6))
        q1 = boite_prix("?", ORANGE_RETENUE, fs=40).move_to(P(x, -0.1))
        q2 = boite_prix("?", ORANGE_RETENUE, fs=40).move_to(P(x, -1.8))
        f1 = fleche_v(c12, q1, "+ 10 %", VERT_OK)
        f2 = fleche_v(q1, q2, "− 10 %", ROUGE_R)
        L0 = self.lc([("Une place à", WHITE), ("12 €", JAUNE_TITRE)], 2.1, fs=40, xl=0.9)
        self.jouer(L0, ["Une place", "12 euros"], {1: [FadeIn(c12, scale=1.2)]})
        L1 = self.lc([("+ 10 %", VERT_OK), ("puis", WHITE), ("− 10 %", ROUGE_R)], 1.35, fs=40, xl=0.9)
        self.jouer(L1, ["10 %, puis", None, "10 %. Quel"],
                   {0: [GrowArrow(f1.fleche), FadeIn(f1.etiquette), FadeIn(q1)],
                    2: [GrowArrow(f2.fleche), FadeIn(f2.etiquette), FadeIn(q2)]})
        L2 = self.lc([("Prix final ?", ORANGE_RETENUE)], 0.5, fs=44, xl=0.9)
        self.jouer(L2, ["Quel est"], {0: [Indicate(q2, color=ORANGE_RETENUE, scale_factor=1.2)]})
        self.pause_defi(y=-1.7)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        self.titre_haut("Correction", "Correction", fs=50)
        x = -4.9
        c12 = boite_prix("12 €", JAUNE_TITRE, fs=36).move_to(P(x, 1.7))
        c13 = boite_prix("13,20 €", WHITE, fs=36).move_to(P(x, 0.0))
        c11 = boite_prix("11,88 €", VERT_OK, fs=36).move_to(P(x, -1.7))
        f1 = fleche_v(c12, c13, "× 1,1", VERT_OK)
        f2 = fleche_v(c13, c11, "× 0,9", ROUGE_R)
        xl = -1.3
        L1 = self.lc([("12 ×", WHITE), ("1,1", VERT_OK), ("=", WHITE), ("13,20 €", VERT_OK)], 2.1, fs=40, xl=xl)
        self.jouer(L1, ["12 fois", "1,1, égale", None, "13,20 euros"],
                   {0: [FadeIn(c12, scale=1.2)], 1: [GrowArrow(f1.fleche), FadeIn(f1.etiquette)],
                    3: [FadeIn(c13, scale=1.2)]})
        L2 = self.lc([("13,20 ×", WHITE), ("0,9", ROUGE_R), ("=", WHITE), ("11,88 €", VERT_OK)], 1.25, fs=40, xl=xl)
        self.jouer(L2, ["13,20 fois", "0,9, égale", None, "11,88 euros"],
                   {1: [GrowArrow(f2.fleche), FadeIn(f2.etiquette)], 3: [FadeIn(c11, scale=1.2)]})
        pas12 = sans(gras("pas 12 €", 28, ROUGE_ERREUR)).next_to(c11, RIGHT, buff=0.35)
        x12 = self.barrer(pas12)
        L3 = self.lc([("Plus bas qu'au départ !", ORANGE_RETENUE)], 0.3, fs=40, xl=xl)
        self.jouer(L3, ["plus bas"], {0: [FadeIn(pas12), Create(x12), Circumscribe(c11, color=ORANGE_RETENUE)]})
        L4 = self.lc([("+ 10 %", VERT_OK), ("puis", WHITE), ("− 10 %", ROUGE_R)], -0.5, fs=40, xl=xl)
        self.jouer(L4, ["10 % ne", None, None], run_time=0.2)
        L5 = self.lc([("ne s'annulent pas !", ROUGE_ERREUR)], -1.3, fs=40, xl=xl)
        self.jouer(L5, ["s'annulent"])
        self.play(Create(self.cadre(L5[0], ROUGE_ERREUR)), run_time=0.3)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        c10 = sans(boite_prix("10 €", JAUNE_TITRE, fs=30)).move_to(P(-4.6, 1.3))
        c8 = sans(boite_prix("8 €", WHITE, fs=30)).move_to(P(-4.6, -0.1))
        c7 = sans(boite_prix("7,20 €", VERT_OK, fs=30)).move_to(P(-4.6, -1.5))
        f1 = sans(fleche_v(c10, c8, "× 0,8", AMBRE, fs=28))
        f2 = sans(fleche_v(c8, c7, "× 0,9", AMBRE, fs=28))
        fig = VGroup(c10, c8, c7, f1, f2)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Pourcentages successifs :", "on multiplie les coefficients."),
            ("Une évolution se calcule", "sur la valeur de départ."),
            ("De tête :", "on part de 10 %.")], fs=36)
        gestes = [Indicate(VGroup(f1.etiquette, f2.etiquette), color=VERT_OK, scale_factor=1.15),
                  Circumscribe(c10, color=AMBRE, buff=0.06), None]
        mots = [["Des pourcentages", "on multiplie"], ["Une évolution", "sur la valeur"], ["Et de tête", "10 %."]]
        for lg, ms, g in zip(lignes, mots, gestes):
            for j, (sl, mot) in enumerate(zip(lg[1], ms)):
                for f in sl.get_family():
                    f.sans_synchro = True  # au mot porteur de la phrase
                self.au_mot(mot)
                anims = [Create(lg[0])] + ([g] if g else []) if j == 0 else []
                self.play(FadeIn(sl, shift=RIGHT * 0.2), *anims, run_time=0.4)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_defi1()
        self.ecran_question1()
        self.ecran_defi2()
        self.ecran_defi3()
        self.ecran_question2()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class PropPourcentageDefi4e(PropPourcentageDefiBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"

