# prop_pourcentage_evolution.py
# EleveAI — Maths 4e — série « Proportionnalité », lot 5 (une paysage par
# micro), épisode 36 : INTERPRÉTER UNE ÉVOLUTION EN POURCENTAGE (micro du
# coach : prop_evolution, notion prop_pourcentages), AVEC VOIX. PAYSAGE
# SEULEMENT (le short 4e-prop-pourcentages-short-evolution existe déjà),
# CEINTURE VERTE. ⚠️ Ne remplace pas prop_pourcentages.py (paysage de notion).
# ⭐ Méthode travaillée : une évolution se calcule SUR LA VALEUR DE DÉPART :
# variation ÷ départ (500 ÷ 2 000 = 0,25 = + 25 %) ; ou le COEFFICIENT
# arrivée ÷ départ (2 500 ÷ 2 000 = 1,25 = 125 %). Pas de produit en croix
# (réservé à l'épisode 24) ; « ÷ » écrit, jamais 5/2.
# ⭐ Les dessins : la BARRE DE 100 % (BarreCent de l'épisode 34, piste de
# BarrePourcent etiquette=False) découpée en 10 morceaux : le départ = la
# barre entière, la hausse = des morceaux VERTS ajoutés au bout (2,5 morceaux
# = 25 %), la baisse = les derniers morceaux ROUGES ; les COEFFICIENTS
# « × 1,2 » / « × 0,8 » / « × 1,25 » écrits sur des flèches entre des
# boîtes (départ → arrivée), le pourcentage sous la flèche.
# ⭐ Fil rouge (erreur 4 de la consigne) : + 20 % PUIS − 20 % NE RAMÈNE PAS AU
# DÉPART (écran 06 : 2 000 → 2 400 → 1 920, « on a perdu 80 abonnés »).
# Leurres des questions = la même faute de BASE (le pourcentage pris sur le
# mauvais nombre) : question 1 C = + 20 % (100 sur 500, l'arrivée), barré à
# « le nombre de départ » ; A = + 100 % (les 100 abonnés lus comme un
# pourcentage), barré à « égale 100 ». Question 2 B = − 25 % (10 000 sur
# 40 000, l'arrivée), barré à « le nombre de départ » ; A = − 10 % (les
# 10 000 vues lues comme un pourcentage), barré à « égale 10 000 ».
#
# Décor et métier : RÉSEAUX SOCIAUX, Sacha, COMMUNITY MANAGER du compte d'un
# club de sport (abonnés 2 000 → 2 500 → 2 000 ; une vidéo 50 000 → 40 000
# vues par jour ; les likes 800 → 1 040). Chiffres tous inventés, plausibles :
# aucun chiffre du monde réel, pas de source à citer.
# Centres d'intérêt : reseaux-sociaux.
#
# Écrans : 00 garde · 01 Sacha, janvier 2 000, février 2 500, la présidente ·
# 02 le calcul (500 ÷ 2 000 = 25 %) · 03 le coefficient (× 1,25 = 125 %) ·
# 04 QUESTION 1 (400 → 500) · 05 la baisse (2 500 → 2 000 : − 20 %) ·
# 06 le piège (+ 20 % puis − 20 % : 1 920) · 07 QUESTION 2 (50 000 → 40 000)
# · 08 défi (800 → 1 040 likes) · 08b correction · 09 ce que tu as appris ·
# 10 fin.
#
# Voix : manim/voix/4e-prop-pourcentage-evolution.json (validée par Frédéric
# le 01/11, débit −10), WAV dans public/sons/4e-prop-pourcentage-evolution/ ;
# marques mot à mot : manim/scripts/4e/prop_pourcentage_evolution_marques.json
# (scripts/marques_dump.ps1 puis cues2marques_gap.py, seuil 0,5 s ; le 2e
# « 10 000 » de 07b ajouté à la main à 4,866 s).
# Outils : manim/scripts/6e/prop_commun.py + manim/canvas_proportion.py (non
# modifiés) ; base PropRatioEcrireBase de l'épisode 28 ; BarreCent et gras()
# de l'épisode 34 (prop_pourcentage_mental.py, importés). Ajouté ICI :
# sacha(), presidente(), telephone(), coeur(), lecture(), boite(),
# fleche_coef(), rallonge().
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/prop_pourcentage_evolution.py PropPourcentageEvolution4e
# PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/4e/prop_pourcentage_evolution.py PropPourcentageEvolution4e -o eleveai-maths-4e-prop-pourcentage-evolution --media_dir manim/media-prop-4e-36
# Sortie : manim/sorties/4e/maths/proportionnalite/36-pourcentage-evolution/eleveai-maths-4e-prop-pourcentage-evolution.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_ratio_ecrire import *  # noqa: E402,F403  (prop_commun, couleurs, sans)
from prop_ratio_ecrire import PropRatioEcrireBase, sans, _p20  # noqa: E402
from prop_pourcentage_mental import BarreCent, gras  # noqa: E402

bulle = _p20.bulle

DEP = "#60a5fa"        # la valeur de départ (bleu)
HAUSSE = "#22c55e"     # la hausse (vert)
BAISSE = "#ef4444"     # la baisse (rouge)
TENUE_S = "#7c3aed"    # le sweat de Sacha (violet)
CLUB = "#0f766e"       # la veste de la présidente du club (vert sapin)
ROSE = "#ec4899"       # le cœur des likes


def telephone(s=1.0, icone="abonnes"):
    """Un smartphone : écran sombre, en-tête rose, une icône (abonnés, cœur, vidéo)."""
    corps = RoundedRectangle(width=1.2, height=2.1, corner_radius=0.18, fill_color="#111827", fill_opacity=1,
                             stroke_color="#94a3b8", stroke_width=3)
    ecran = RoundedRectangle(width=1.0, height=1.75, corner_radius=0.1, fill_color="#1e293b", fill_opacity=1,
                             stroke_width=0).move_to(corps).shift(DOWN * 0.04)
    tete = Rectangle(width=1.0, height=0.25, fill_color=ROSE, fill_opacity=1, stroke_width=0) \
        .align_to(ecran, UP).set_x(ecran.get_x())
    if icone == "coeur":
        ic = coeur(0.42)
    elif icone == "video":
        ic = lecture(0.45)
    else:  # deux silhouettes : les abonnés
        ic = VGroup(*[VGroup(Circle(radius=0.11, fill_color=c, fill_opacity=1, stroke_width=0),
                             Arc(radius=0.2, start_angle=0, angle=PI, fill_color=c, fill_opacity=1,
                                 stroke_width=0).shift(DOWN * 0.27))
                      .shift(RIGHT * x) for x, c in ((-0.18, DEP), (0.18, HAUSSE))])
    ic.move_to(ecran).shift(DOWN * 0.1)
    return VGroup(corps, ecran, tete, ic).scale(s)


def coeur(s=1.0, couleur=ROSE):
    """Le cœur des likes."""
    c1 = Circle(radius=0.5, fill_color=couleur, fill_opacity=1, stroke_width=0).shift(LEFT * 0.35 + UP * 0.2)
    c2 = c1.copy().shift(RIGHT * 0.7)
    tri = Polygon(P(-0.83, 0.05), P(0.83, 0.05), P(0, -0.95), fill_color=couleur, fill_opacity=1, stroke_width=0)
    return VGroup(c1, c2, tri).scale(s)


def lecture(s=1.0):
    """Le bouton « lecture » d'une vidéo (rectangle rouge, triangle blanc)."""
    r = RoundedRectangle(width=1.4, height=1.0, corner_radius=0.25, fill_color="#dc2626", fill_opacity=1,
                         stroke_width=0)
    t = Triangle(fill_color=WHITE, fill_opacity=1, stroke_width=0).scale(0.28).rotate(-PI / 2).move_to(r)
    return VGroup(r, t).scale(s)


def sacha(s=1.0):
    """Sacha, community manager : sweat violet, un téléphone à la main."""
    p = personne(peau="#c68642", tenue=TENUE_S, cheveux="#3f2a14")
    tel = telephone(0.32).move_to(p.corps.get_center() + P(0.55, 0.2)).rotate(-0.25)
    p.add(tel)
    return p.scale(s)


def presidente(s=1.0):
    """La présidente du club : veste vert sapin, cheveux longs, un sifflet."""
    p = personne(peau="#8d5524", tenue=CLUB, cheveux="#111827", longs=True)
    c = p.corps.get_top()
    cordon = VGroup(Line(c + P(-0.2, 0), c + P(0, -0.5)), Line(c + P(0.2, 0), c + P(0, -0.5))) \
        .set_stroke(WHITE, 3)
    sif = RoundedRectangle(width=0.22, height=0.12, corner_radius=0.04, fill_color="#fbbf24", fill_opacity=1,
                           stroke_width=0).move_to(c + P(0, -0.56))
    p.add(cordon, sif)
    return p.scale(s)


def boite(nb, couleur=DEP, fs=40, l=2.0, h=0.95, unite=None):
    """Une boîte arrondie avec un nombre (le départ, l'arrivée) ; .nb le texte,
    .cadre le rectangle ; unite : un petit mot sous la boîte (sans synchro)."""
    cadre = RoundedRectangle(width=l, height=h, corner_radius=0.16, fill_color=couleur, fill_opacity=0.18,
                             stroke_color=couleur, stroke_width=4)
    t = gras(nb or "0", fs, WHITE)
    if t.width > l - 0.25:
        t.scale_to_fit_width(l - 0.25)
    g = VGroup(cadre, t.move_to(cadre)) if nb else VGroup(cadre)
    g.cadre, g.nb = cadre, t
    if unite:
        u = sans(Text(unite, font_size=22, color=GREY_B)).next_to(cadre, DOWN, buff=0.08)
        g.add(u)
        g.unite = u
    return g


def fleche_coef(a, b, haut=None, bas=None, c_haut=AMBRE, c_bas=HAUSSE, fs=32):
    """La flèche du départ a à l'arrivée b : le coefficient écrit DESSUS
    (« × 1,2 »), le pourcentage DESSOUS (« + 20 % ») ; renvoyés, non ajoutés.
    .fleche .haut .bas (None si absent)."""
    d, f = a.cadre.get_right() + RIGHT * 0.12, b.cadre.get_left() + LEFT * 0.12
    fl = Arrow(d, f, buff=0, color=c_haut, stroke_width=6, max_tip_length_to_length_ratio=0.18)
    g = VGroup(fl)
    g.fleche, g.haut, g.bas = fl, None, None
    if haut:
        g.haut = gras(haut, fs, c_haut).next_to(fl, UP, buff=0.12)
        g.add(g.haut)
    if bas:
        g.bas = gras(bas, fs, c_bas).next_to(fl, DOWN, buff=0.12)
        g.add(g.bas)
    return g


def rallonge(b, k, couleur=HAUSSE):
    """La HAUSSE posée au bout de la barre b : k morceaux de 10 % (k peut être
    2,5), verts, bordés de blanc ; renvoyée, non ajoutée."""
    piste = b.bp.piste
    r = Rectangle(width=k * b.lm, height=b.hh, fill_color=couleur, fill_opacity=1, stroke_color=WHITE,
                  stroke_width=2)
    r.next_to(piste, RIGHT, buff=0.04).set_y(piste.get_y())
    traits = VGroup(*[Line(r.get_corner(DL) + RIGHT * b.lm * i, r.get_corner(UL) + RIGHT * b.lm * i,
                           color="#14532d", stroke_width=3) for i in range(1, int(k + 0.999)) if i < k])
    g = VGroup(r, traits)
    g.rect = r
    return g


def barre_depart(prix, largeur, centre, fs_prix=32, couleur=DEP):
    """La barre de 100 % du DÉPART, morceaux bleus ; prix au-dessus (accolade)."""
    b = BarreCent(prix, largeur=largeur, h=0.75, centre=centre, fs_prix=fs_prix, couleur_prix=JAUNE_TITRE)
    for m in b.morceaux:
        m.set_fill(couleur, 1)
    return b


class PropPourcentageEvolutionBase(PropRatioEcrireBase):
    nom_voix = "4e-prop-pourcentage-evolution"
    fichier_marques = "prop_pourcentage_evolution_marques.json"

    def titre_haut(self, s, mot, couleur=JAUNE_TITRE, fs=44, x=-0.4):
        self.au_mot(mot)
        tit = self.t(s, fs, couleur).move_to(P(x, 3.1))
        self.play(Write(tit), run_time=0.5)
        return tit

    @staticmethod
    def cadre(m, couleur=VERT_OK):
        return SurroundingRectangle(m, color=couleur, buff=0.08, corner_radius=0.1, stroke_width=4)

    def barrer(self, *ms, couleur=ROUGE_ERREUR):
        g = VGroup(*ms)
        return Line(g.get_left() + LEFT * 0.1, g.get_right() + RIGHT * 0.1, color=couleur, stroke_width=7)

    @staticmethod
    def acc(mob, s, couleur=VERT_OK, cote=DOWN, fs=30, buff=0.1):
        """Une accolade sous (ou sur) mob et son texte ; renvoyés, non ajoutés."""
        br = Brace(mob, cote, buff=buff, color=couleur)
        t = gras(s, fs, couleur).next_to(br, cote, buff=0.06)
        return br, t

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Interpréter une évolution en pourcentage", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("Interpréter")
        tel = telephone(0.9).move_to(P(-4.3, 0.45))
        b = barre_depart("", 4.6, P(0.9, 0.45))
        r = rallonge(b, 2.5)
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(tel, shift=RIGHT * 0.3),
                  FadeIn(b.bp), FadeIn(b.morceaux), FadeIn(b.traits), run_time=0.7)
        self.au_mot("évolution")
        self.play(GrowFromEdge(r, LEFT), run_time=0.6)
        self.au_mot("Les abonnés")
        nom = self.t("Les abonnés de Sacha", 34, AMBRE).move_to(P(0.9, -0.55))
        self.play(FadeIn(nom, shift=UP * 0.15), Indicate(tel, color=AMBRE), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : Sacha, community manager ; janvier 2 000, février 2 500 ────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = sacha(1.0).move_to(P(-5.5, -0.9))
        nom = self.t("Sacha", 40, TENUE_S).next_to(pers, UP, buff=0.3)
        self.montre("Voici Sacha", FadeIn(pers, shift=UP * 0.3), FadeIn(nom), rt=0.6)
        met = self.t("community manager", 26, "#c4b5fd").next_to(pers, DOWN, buff=0.15)
        met.shift(RIGHT * max(0, -6.4 - met.get_left()[0]))
        self.montre("community", FadeIn(met, shift=DOWN * 0.1), rt=0.4)
        club = self.t("Club de sport", 30, HAUSSE).move_to(P(-2.9, 2.6))
        tel = telephone(0.85).move_to(P(-2.9, 0.9))
        self.montre("club de sport", FadeIn(club, shift=DOWN * 0.15), rt=0.4)
        res = self.t("réseaux sociaux", 26, ROSE).next_to(tel, DOWN, buff=0.15)
        self.montre("réseaux sociaux", FadeIn(tel, scale=0.8), FadeIn(res), rt=0.5)
        # le diagramme des abonnés : janvier, février
        y0, u = -2.25, 0.0012
        axe = Line(P(-1.3, y0), P(1.9, y0), color=GREY_B, stroke_width=4)
        tit = sans(self.t("Abonnés", 28, WHITE)).move_to(P(0.3, 1.75))
        b1 = Rectangle(width=1.0, height=2000 * u, fill_color=DEP, fill_opacity=1, stroke_width=0) \
            .move_to(P(-0.5, y0 + 1000 * u))
        b2 = Rectangle(width=1.0, height=2500 * u, fill_color=HAUSSE, fill_opacity=1, stroke_width=0) \
            .move_to(P(1.1, y0 + 1250 * u))
        j = sans(self.t("janvier", 24, GREY_B)).next_to(b1, DOWN, buff=0.12)
        f = sans(self.t("février", 24, GREY_B)).next_to(b2, DOWN, buff=0.12)
        v1 = gras("2 000", 30, DEP).next_to(b1, UP, buff=0.1)
        v2 = gras("2 500", 30, HAUSSE).next_to(b2, UP, buff=0.1)
        self.montre("En janvier", FadeIn(axe), FadeIn(tit), FadeIn(j), rt=0.35)
        self.montre("2 000 abonnés", GrowFromEdge(b1, DOWN), FadeIn(v1, shift=UP * 0.1), rt=0.5)
        self.montre("En février", FadeIn(f), rt=0.3)
        self.montre("2 500. La", GrowFromEdge(b2, DOWN), FadeIn(v2, shift=UP * 0.1), rt=0.5)
        pres = presidente(0.8).move_to(P(4.0, -1.2))
        self.montre("La présidente", FadeIn(pres, shift=LEFT * 0.3), rt=0.5)
        bu = bulle(["De combien de %", "ça a augmenté ?"], fs=28)
        bu.move_to(P(4.0, 1.25))
        sans(bu)
        self.montre("De combien", FadeIn(bu.fond, scale=0.8), FadeIn(bu.textes[0]), rt=0.4)
        self.montre("ça a augmenté", FadeIn(bu.textes[1]), rt=0.3)
        self.play(Indicate(VGroup(b1, b2), color=AMBRE, scale_factor=1.05), run_time=0.6)
        self.attendre_voix()

    # ── 02 : le calcul : 500 sur le départ, 2 000 → 25 % ────────────────────
    XB, XC = -4.0, 0.6

    def ecran_calcul(self):
        self.ecran("02-calcul")
        b = barre_depart("2 000", 4.6, P(self.XB, 1.0))
        r = rallonge(b, 2.5)
        tout = VGroup(b.bp, r)
        b25, t25 = self.acc(tout, "2 500", HAUSSE, DOWN, fs=30)
        b5, t5 = self.acc(r, "+ 500", HAUSSE, UP, fs=30)
        dep = sans(self.t("départ", 24, JAUNE_TITRE)).next_to(b.prix, LEFT, buff=0.2)
        L1 = self.lc([("2 500", HAUSSE), ("− 2 000", DEP), ("= 500", WHITE), ("abonnés", WHITE)], 2.3, fs=36,
                     xl=self.XC)
        self.jouer(L1, ["2 500 moins", "2 000, égale", "500 abonnés", "abonnés. Mais"],
                   {0: [FadeIn(b.bp), FadeIn(b.morceaux), FadeIn(b.traits), FadeIn(r), GrowFromCenter(b25),
                        FadeIn(t25)],
                    1: [GrowFromCenter(b.acc), FadeIn(b.prix, shift=DOWN * 0.15)],
                    2: [GrowFromCenter(b5), FadeIn(t5, scale=1.3), Indicate(r, color=AMBRE, scale_factor=1.05)]})
        L2 = self.lc([("Mais 500", ORANGE_RETENUE), ("sur combien ?", ORANGE_RETENUE)], 1.5, fs=38, xl=self.XC)
        self.jouer(L2, ["Mais 500", "sur combien"])
        L3 = self.lc([("Sur le départ :", JAUNE_TITRE), ("2 000", JAUNE_TITRE)], 0.75, fs=38, xl=self.XC)
        self.jouer(L3, ["Sur le nombre", "2 000. 500"], {0: [FadeIn(dep)], 1: [Circumscribe(b.bp.piste, color=AMBRE)]})
        L4 = self.lc([("500 ÷ 2 000", WHITE), ("= 0,25", WHITE)], -0.05, fs=40, xl=self.XC)
        self.jouer(L4, ["500 divisé", "égale 0,25"])
        bp25, tp25 = self.acc(r, "25 %", HAUSSE, DOWN, fs=30)
        L5 = self.lc([("= 25 %", VERT_OK)], -0.85, fs=48, xl=self.XC)
        self.jouer(L5, ["C'est 25"], {0: [FadeOut(b25), FadeOut(t25), GrowFromCenter(bp25), FadeIn(tp25, scale=1.3)]})
        self.play(Create(self.cadre(L5[0])), run_time=0.3)
        L6 = self.lc([("Hausse :", WHITE), ("+ 25 %", VERT_OK)], -1.7, fs=40, xl=self.XC)
        self.jouer(L6, ["ont augmenté", "de 25"])
        self.attendre_voix()

    # ── 03 : le coefficient : 2 500 ÷ 2 000 = 1,25 = 125 % ──────────────────
    def ecran_coefficient(self):
        self.ecran("03-coefficient")
        self.titre_haut("Autre méthode : le coefficient", "Autre méthode", fs=42)
        a = boite("2 000", DEP, l=1.7).move_to(P(-5.55, 1.5))
        z = boite("2 500", HAUSSE, l=1.7).move_to(P(-1.35, 1.5))
        fl = fleche_coef(a, z, "× 1,25", "+ 25 %")
        b = barre_depart("", 4.3, P(-4.1, -1.0))
        r = rallonge(b, 2.5)
        b125, t125 = self.acc(VGroup(b.bp, r), "125 %", VERT_OK, DOWN, fs=30)
        L1 = self.lc([("2 500", HAUSSE), ("÷ 2 000", DEP), ("= 1,25", AMBRE)], 1.6, fs=40, xl=self.XC)
        self.jouer(L1, ["2 500 divisé", "par 2 000", "égale 1,25"],
                   {0: [FadeIn(z, shift=LEFT * 0.2)], 1: [FadeIn(a, shift=RIGHT * 0.2)],
                    2: [GrowArrow(fl.fleche), FadeIn(fl.haut, scale=1.3)]})
        self.insister(fl.haut, 1.25, 0.25)
        L2 = self.lc([("1,25", AMBRE), ("= 125 %", VERT_OK)], 0.7, fs=40, xl=self.XC)
        self.jouer(L2, ["1,25, c'est", "125 %"],
                   {1: [FadeIn(b.bp), FadeIn(b.morceaux), FadeIn(b.traits), FadeIn(r), GrowFromCenter(b125),
                        FadeIn(t125, scale=1.2)]})
        L3 = self.lc([("soit", WHITE), ("+ 25 %", VERT_OK)], -0.2, fs=44, xl=self.XC)
        self.jouer(L3, ["plus 25", None], {1: [FadeIn(fl.bas, shift=UP * 0.1), Indicate(r, color=AMBRE)]})
        self.play(Create(self.cadre(L3[1])), run_time=0.3)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (400 → 500 abonnés : + 25 %) ───────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        tel = telephone(1.3).move_to(P(-3.6, 0.4))

        def avant(sc):
            sc.play(FadeIn(tel, shift=UP * 0.2), run_time=0.4)

        def apres(sc):
            b = barre_depart("400", 4.0, P(-4.3, 0.6), fs_prix=30)
            r = rallonge(b, 2.5)
            b1, t1 = sc.acc(r, "100", HAUSSE, UP, fs=28)
            b2, t2 = sc.acc(r, "25 %", HAUSSE, DOWN, fs=28)
            l0 = sc.ligne_rep(0, ["500", "− 400 =", "100."])
            l1 = sc.ligne_rep(1, ["100 ÷ 400", "= 0,25,", "soit + 25 %."])
            sc.montre("500 moins", FadeOut(tel), FadeIn(b.bp), FadeIn(b.morceaux), FadeIn(b.traits), FadeIn(r),
                      FadeIn(l0[0], shift=UP * 0.15), rt=0.35)
            sc.montre("400, égale", GrowFromCenter(b.acc), FadeIn(b.prix), FadeIn(l0[1], shift=UP * 0.15), rt=0.4)
            sc.montre("égale 100", FadeIn(l0[2], scale=1.3), GrowFromCenter(b1), FadeIn(t1, scale=1.3),
                      Create(sc.barrer_choix(0)), rt=0.5)
            sc.montre("100 sur 400", FadeIn(l1[0], shift=UP * 0.15), Circumscribe(b.bp.piste, color=AMBRE), rt=0.4)
            sc.montre("le nombre de départ", Create(sc.barrer_choix(2)), rt=0.4)
            sc.montre("0,25, soit", FadeIn(l1[1], shift=UP * 0.15), rt=0.35)
            sc.montre("plus 25", FadeIn(l1[2], scale=1.3), GrowFromCenter(b2), FadeIn(t2, scale=1.3), rt=0.45)
            sc.rep_fini()

        self.question_pause("04-question", "04b-reponse", ["400 → 500", "abonnés : quelle évolution ?"],
                            [self.t("+ 100 %", 34), self.t("+ 25 %", 34), self.t("+ 20 %", 34)], 1,
                            ["500 − 400 = 100.", "100 ÷ 400 = 0,25, soit + 25 %."],
                            mot_q="500 abonnés", avant_q=avant, autres_r=apres)

    # ── 05 : la baisse : 2 500 → 2 000, − 20 % ; aller-retour ───────────────
    def ecran_baisse(self):
        self.ecran("05-baisse")
        self.titre_haut("En mars", "En mars")
        b = barre_depart("2 500", 5.2, P(-3.5, 1.35))
        rouges = VGroup(*b.morceaux[8:])
        reste = VGroup(*b.morceaux[:8])
        b20, t20 = self.acc(reste, "2 000", DEP, DOWN, fs=28)
        b5, t5 = self.acc(rouges, "− 500", BAISSE, DOWN, fs=28)
        L1 = self.lc([("2 500", JAUNE_TITRE), ("→ 2 000", DEP)], 2.3, fs=40, xl=self.XC)
        self.jouer(L1, ["2 500 à", "2 000 abonnés"],
                   {0: [FadeIn(b.bp), FadeIn(b.morceaux), FadeIn(b.traits), GrowFromCenter(b.acc),
                        FadeIn(b.prix, shift=DOWN * 0.15)],
                    1: [*[m.animate.set_fill(BAISSE, 0.35) for m in rouges], GrowFromCenter(b20), FadeIn(t20)]})
        L2 = self.lc([("Baisse :", WHITE), ("500", BAISSE), ("abonnés", BAISSE)], 1.55, fs=38, xl=self.XC)
        self.jouer(L2, ["La baisse", "500 abonnés", "abonnés, sur"],
                   {1: [*[m.animate.set_fill(BAISSE, 1) for m in rouges], FadeOut(b20), FadeOut(t20),
                        GrowFromCenter(b5), FadeIn(t5, scale=1.3)]})
        L3 = self.lc([("sur 2 500", JAUNE_TITRE), ("au départ", JAUNE_TITRE)], 0.8, fs=38, xl=self.XC)
        self.jouer(L3, ["2 500 au", "au départ"], {0: [Circumscribe(b.bp.piste, color=AMBRE)]})
        L4 = self.lc([("500 ÷ 2 500", WHITE), ("= 0,2", WHITE)], 0.05, fs=40, xl=self.XC)
        self.jouer(L4, ["500 divisé", "0,2 : moins"])
        L5 = self.lc([("= − 20 %", BAISSE)], -0.75, fs=48, xl=self.XC)
        tp = gras("20 %", 26, WHITE).move_to(rouges)
        self.jouer(L5, ["moins 20"], {0: [FadeIn(tp, scale=1.3)]})
        self.play(Create(self.cadre(L5[0], BAISSE)), run_time=0.3)
        # l'aller-retour : 2 000 → 2 500 → 2 000
        y = -2.0
        a = boite("2 000", DEP, fs=32, l=1.4, h=0.75).move_to(P(-5.75, y))
        m = boite("2 500", HAUSSE, fs=32, l=1.4, h=0.75).move_to(P(-2.6, y))
        z = boite("2 000", DEP, fs=32, l=1.4, h=0.75).move_to(P(0.55, y))
        f1 = fleche_coef(a, m, "+ 25 %", None, c_haut=HAUSSE, fs=28)
        f2 = fleche_coef(m, z, "− 20 %", None, c_haut=BAISSE, fs=28)
        self.montre("On a gagné", FadeIn(a, shift=RIGHT * 0.2), rt=0.3)
        self.montre("25 %, puis", GrowArrow(f1.fleche), FadeIn(f1.haut), FadeIn(m, shift=RIGHT * 0.2), rt=0.45)
        self.montre("perdu 20", GrowArrow(f2.fleche), FadeIn(f2.haut), FadeIn(z, shift=RIGHT * 0.2), rt=0.45)
        self.au_mot("revenu au")
        egal = sans(self.t("même nombre !", 32, AMBRE)).next_to(z, RIGHT, buff=0.3)
        self.play(Circumscribe(a, color=AMBRE), Circumscribe(z, color=AMBRE), FadeIn(egal, shift=LEFT * 0.15),
                  run_time=0.7)
        self.attendre_voix()

    # ── 06 : le piège : + 20 % puis − 20 % ne ramène pas au départ ──────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.titre_haut("Attention au piège !", "Attention", couleur=ROUGE_ERREUR)
        L0 = self.ligne([("+ 20 %", HAUSSE), ("puis − 20 %", BAISSE), ("≠", ROUGE_ERREUR),
                         ("retour au départ", ROUGE_ERREUR)], 40).move_to(P(-0.4, 2.2))
        self.jouer(L0, ["Plus 20", "puis moins", "ne ramène", "pas au départ"])
        self.play(Indicate(L0[2], color=ROUGE_ERREUR, scale_factor=1.4), run_time=0.4)
        y = 0.75
        a = boite("2 000", DEP, unite="abonnés").move_to(P(-4.9, y))
        m = boite("2 400", HAUSSE).move_to(P(-0.7, y))
        z = boite("1 920", BAISSE).move_to(P(3.5, y))
        f1 = fleche_coef(a, m, "× 1,2", "+ 20 %", c_bas=HAUSSE)
        f2 = fleche_coef(m, z, "× 0,8", "− 20 %", c_bas=BAISSE)
        self.montre("2 000 abonnés", FadeIn(a, shift=RIGHT * 0.2), rt=0.4)
        self.montre("plus 20", GrowArrow(f1.fleche), FadeIn(f1.bas, shift=UP * 0.1), rt=0.4)
        L1 = self.ligne([("2 000 × 1,2", WHITE), ("= 2 400", HAUSSE)], 38).move_to(P(-2.6, -0.85))
        self.jouer(L1, ["2 000 fois", "égale 2 400"],
                   {0: [FadeIn(f1.haut, scale=1.3)], 1: [FadeIn(m, shift=RIGHT * 0.2)]})
        self.montre(("moins 20", 2), GrowArrow(f2.fleche), FadeIn(f2.bas, shift=UP * 0.1), rt=0.4)
        L2 = self.ligne([("2 400 × 0,8", WHITE), ("= 1 920", BAISSE)], 38).move_to(P(-2.6, -1.6))
        L2.align_to(L1, LEFT)
        self.jouer(L2, ["2 400 fois", "égale 1 920"],
                   {0: [FadeIn(f2.haut, scale=1.3)], 1: [FadeIn(z, shift=RIGHT * 0.2)]})
        self.insister(z, 1.2, 0.25)
        L3 = self.ligne([("On a perdu", WHITE), ("80", ROUGE_ERREUR), ("abonnés", ROUGE_ERREUR)], 38).align_to(L1, LEFT).set_y(-2.35)
        self.jouer(L3, ["On a perdu", "80 abonnés", "abonnés. Les"])
        L4 = sans(VGroup(self.t("Pas sur le", 36, AMBRE), self.t("même nombre !", 36, AMBRE))
                  .arrange(DOWN, buff=0.12)).move_to(P(3.7, -1.25))
        self.au_mot("Les deux 20")
        self.play(Circumscribe(a.cadre, color=AMBRE), Circumscribe(m.cadre, color=AMBRE),
                  Indicate(VGroup(f1.bas, f2.bas), color=AMBRE), run_time=0.8)
        self.au_mot("le même nombre")
        self.play(FadeIn(L4, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (50 000 → 40 000 vues par jour : − 20 %) ───────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        vid = lecture(1.6).move_to(P(-3.6, 0.4))

        def avant(sc):
            sc.play(FadeIn(vid, scale=0.8), run_time=0.4)

        def apres(sc):
            b = barre_depart("50 000", 5.0, P(-3.7, 0.6), fs_prix=30)
            rouges = VGroup(*b.morceaux[8:])
            b1, t1 = sc.acc(rouges, "10 000", BAISSE, DOWN, fs=28)
            t2 = gras("20 %", 24, WHITE).move_to(rouges)
            l0 = sc.ligne_rep(0, ["50 000 − 40 000 =", "10 000."])
            l1 = sc.ligne_rep(1, ["10 000 ÷ 50 000", "= 0,2,", "soit − 20 %."])
            sc.montre("50 000 moins", FadeOut(vid), FadeIn(b.bp), FadeIn(b.morceaux), FadeIn(b.traits),
                      GrowFromCenter(b.acc), FadeIn(b.prix), FadeIn(l0[0], shift=UP * 0.15), rt=0.45)
            sc.montre("égale 10 000", FadeIn(l0[1], scale=1.3), *[m.animate.set_fill(BAISSE, 1) for m in rouges],
                      GrowFromCenter(b1), FadeIn(t1, scale=1.3), Create(sc.barrer_choix(0)), rt=0.5)
            sc.montre("10 000 sur", FadeIn(l1[0], shift=UP * 0.15), Circumscribe(b.bp.piste, color=AMBRE), rt=0.4)
            sc.montre("le nombre de départ", Create(sc.barrer_choix(1)), rt=0.4)
            sc.montre("0,2, soit", FadeIn(l1[1], shift=UP * 0.15), rt=0.35)
            sc.montre("moins 20", FadeIn(l1[2], scale=1.3), FadeIn(t2, scale=1.3), rt=0.45)
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse", ["50 000 → 40 000 vues", "par jour : quelle évolution ?"],
                            [self.t("− 10 %", 34), self.t("− 25 %", 34), self.t("− 20 %", 34)], 2,
                            ["50 000 − 40 000 = 10 000.", "10 000 ÷ 50 000 = 0,2, soit − 20 %."],
                            mot_q="40 000 vues", avant_q=avant, autres_r=apres)

    # ── 08 : défi : les likes, 800 → 1 040 ──────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.titre_haut("À toi de jouer !", "À toi de jouer", fs=50)
        tel = telephone(1.2, icone="coeur").move_to(P(-4.6, 1.0))
        a = boite("800", DEP).move_to(P(-5.0, -1.5))
        z = boite("1 040", HAUSSE).move_to(P(-1.5, -1.5))
        fl = fleche_coef(a, z, "?", None, c_haut=ORANGE_RETENUE, fs=40)
        L0 = self.lc([("Les likes", ROSE), ("d'une publication", WHITE)], 2.1, fs=38, xl=0.9)
        self.jouer(L0, ["Les likes", "publication"], {0: [FadeIn(tel, shift=RIGHT * 0.3)]})
        L1 = self.lc([("800", DEP), ("→ 1 040", HAUSSE)], 1.3, fs=44, xl=0.9)
        self.jouer(L1, ["800 à", "1 040. Quelle"],
                   {0: [FadeIn(a, shift=RIGHT * 0.2)], 1: [GrowArrow(fl.fleche), FadeIn(z, shift=RIGHT * 0.2)]})
        L2 = self.lc([("Quelle évolution", ORANGE_RETENUE), ("en % ?", ORANGE_RETENUE)], 0.45, fs=40, xl=0.9)
        self.jouer(L2, ["Quelle évolution", "en pourcentage"], {1: [FadeIn(fl.haut, scale=1.4)]})
        self.insister(fl.haut, 1.3, 0.25)
        self.pause_defi(y=-0.5)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        self.titre_haut("Correction", "Correction", fs=50)
        b = barre_depart("800", 4.6, P(-3.9, 1.0))
        r = rallonge(b, 3)
        tout = VGroup(b.bp, r)
        b10, t10 = self.acc(tout, "1 040", HAUSSE, DOWN, fs=30)
        b24, t24 = self.acc(r, "+ 240", HAUSSE, UP, fs=30)
        L1 = self.lc([("1 040", HAUSSE), ("− 800", DEP), ("= 240", WHITE)], 2.2, fs=42, xl=self.XC)
        self.jouer(L1, ["1 040 moins", "800, égale", "égale 240"],
                   {0: [FadeIn(b.bp), FadeIn(b.morceaux), FadeIn(b.traits), FadeIn(r), GrowFromCenter(b10),
                        FadeIn(t10)],
                    1: [GrowFromCenter(b.acc), FadeIn(b.prix, shift=DOWN * 0.15)],
                    2: [GrowFromCenter(b24), FadeIn(t24, scale=1.3)]})
        L2 = self.lc([("240 ÷ 800", WHITE), ("= 0,3", WHITE)], 1.3, fs=42, xl=self.XC)
        self.jouer(L2, ["240 divisé", "égale 0,3"], {0: [Circumscribe(b.bp.piste, color=AMBRE)]})
        b30, t30 = self.acc(r, "30 %", HAUSSE, DOWN, fs=30)
        L3 = self.lc([("soit", WHITE), ("+ 30 %", VERT_OK)], 0.35, fs=50, xl=self.XC)
        self.jouer(L3, ["plus 30", None],
                   {1: [FadeOut(b10), FadeOut(t10), GrowFromCenter(b30), FadeIn(t30, scale=1.3)]})
        self.play(Create(self.cadre(L3[1])), run_time=0.3)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        b = barre_depart("", 2.2, P(-4.6, 0.6))
        b.prix.set_opacity(0)
        r = rallonge(b, 2.5)
        a = boite("", DEP, l=0.8, h=0.5).next_to(b, DOWN, buff=0.7).align_to(b, LEFT)
        z = boite("", HAUSSE, l=0.8, h=0.5).next_to(a, RIGHT, buff=0.9)
        fl = fleche_coef(a, z)
        fig = VGroup(b.bp, b.morceaux, b.traits, r, a, z, fl)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Toujours sur le départ :", "variation ÷ départ."),
            ("Arrivée ÷ départ", "= le coefficient."),
            ("Une hausse puis une baisse", "du même % ne s'annulent pas.")], fs=38)
        gestes = [Circumscribe(b.bp.piste, color=AMBRE), Indicate(fl, color=AMBRE), Indicate(r, color=BAISSE)]
        mots = [["sur la valeur", "la variation"], ["Ou bien", "donne le"], ["Et une hausse", "ne s'annulent"]]
        for lg, ms, g in zip(lignes, mots, gestes):
            for j, (sl, mot) in enumerate(zip(lg[1], ms)):
                for f in sl.get_family():
                    f.sans_synchro = True
                self.au_mot(mot)
                anims = [Create(lg[0]), g] if j == 0 else []
                self.play(FadeIn(sl, shift=RIGHT * 0.2), *anims, run_time=0.4)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_calcul()
        self.ecran_coefficient()
        self.ecran_question1()
        self.ecran_baisse()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class PropPourcentageEvolution4e(PropPourcentageEvolutionBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"
