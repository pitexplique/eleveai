# prop_grandeur_convertir.py
# EleveAI — Maths 4e — série « Proportionnalité », lot 4 (agrandissements et
# grandeurs), épisode 17 PROPRE À LA 4e : CONVERTIR DES LONGUEURS ET DES AIRES
# (micro du coach : grandeur_convertir, notion grandeur_composee), AVEC VOIX.
# Paysage 16:9, CEINTURE VERTE (la paysage complète du niveau). Short jumeau :
# prop_grandeur_convertir_short.py (blanche).
# ⭐ Méthode travaillée : 1 m² n'est pas une « recette » : c'est une
# CONSÉQUENCE de 1 m = 100 cm (bo-objectifs.ts) : le carré de 1 m de côté,
# QUADRILLÉ, fait 100 cm sur 100 cm, donc 100 × 100 = 10 000 cm². Pour une
# aire, le facteur des longueurs compte deux fois. Pour les durées, 1 h =
# 60 min (jamais 100) : tableau de proportionnalité 1 min → 60 min (× 60).
# Pas de produit en croix (la voix ne l'utilise pas) ; « ÷ » écrit.
# ⭐ Le geste : le carré de 1 m quadrillé dont les rangées se remplissent
# (100 fois 100) ; le sol de la cuisine qui se pave de 150 carreaux (15 × 10) ;
# le piège : un carreau et demi seulement sur tout le sol (Impossible !).
# ⭐ Leurres : × 100 une seule fois (question 1 A : 100 ; écran 06 : 600 cm²),
# 1 000 (question 1 B) ; 1 h = 100 min (question 2 A : 1 000 L/h) ; ne rien
# convertir (question 2 C : 10 L/h).
#
# Décor et métier : ART-DESIGN (carrelage, décoration), Aïcha, CARRELEUSE.
# Nombres inventés (cuisine 6 m², carreaux 20 cm, mur 2 m², carreaux 10 cm,
# robinet 10 L/min). Fait réel : un robinet ordinaire (sans mousseur) coule
# environ 12 L/min : « 12 L/min au minimum à 3 bars » (Parc naturel régional du
# Luberon, fiche « 05 Robinets ») ; 10 à 12 L/min en moyenne (ADEME, cité par
# Selectra) ; relevé le 01/11/2026.
# Centres d'intérêt : art-design.
#
# Écrans : 00 garde · 01 Aïcha, cuisine 6 m², carreaux 20 cm sur 20 cm ·
# 02 longueurs : 1 m = 100 cm (le mètre gradué), × 100, 2,5 m = 250 cm ·
# 03 aires : le carré de 1 m quadrillé, 100 × 100 = 10 000, 1 m² = 10 000 cm²
# (pas 100 !) · 04 QUESTION 1 · 05 le calcul : 60 000 cm², 400 cm², 150
# carreaux (le sol se pave) · 06 le piège 600 cm² (un carreau et demi !) ·
# 07 le débit : 12 L/min, 1 h = 60 min, 720 L/h (tableau × 60) · 08 QUESTION 2
# · 09 défi mur 2 m², carreaux 10 cm · 09b correction 200 carreaux ·
# 10 ce que tu as appris · 11 fin.
#
# Voix : manim/voix/4e-prop-grandeur-convertir.json (validée par Frédéric le
# 31/10, débit −10), WAV dans public/sons/4e-prop-grandeur-convertir/ ;
# marques mot à mot : manim/scripts/4e/prop_grandeur_convertir_marques.json
# (scripts/marques_dump.ps1, puis un convertisseur qui pose UNE MARQUE PAR
# OCCURRENCE et date chaque mot d'un groupe « 60 000 centimètres »).
# Outils : manim/scripts/6e/prop_commun.py + manim/canvas_proportion.py (non
# modifiés). Ajouté ICI : aicha(), Carre1m (le carré de 1 m quadrillé),
# Sol (le sol pavé de carreaux), metre() (le mètre gradué), evier(),
# horloge60(), finale_morceaux().
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/prop_grandeur_convertir.py PropGrandeurConvertir4e
# PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/4e/prop_grandeur_convertir.py PropGrandeurConvertir4e -o eleveai-maths-4e-prop-grandeur-convertir --media_dir manim/media-prop-4e-17
# Sortie : manim/sorties/4e/maths/proportionnalite/17-grandeur-convertir/eleveai-maths-4e-prop-grandeur-convertir.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

from prop_commun import *  # noqa: E402,F403
from prop_agrandissement_rapport import PropAgrandissementRapportBase, gras, sans  # noqa: E402
from prop_grandeur_unite import BARRE_C, UNITE_C, Operation, robinet, unite_barre  # noqa: E402

CARRE_C = "#a78bfa"     # le carré de 1 m (violet clair)
CARRE_F = "#4c1d95"     # ses petits carrés remplis
CARREAU = "#fbbf24"     # les carreaux d'Aïcha (ambre)
CARREAU_B = "#92400e"
SOL = "#e7e5e4"
ARDOISE = "#94a3b8"


def aicha(s=1.0):
    """Aïcha, carreleuse : cheveux longs, tenue bleue, un carreau et une
    truelle dans les mains."""
    p = personne(peau="#8d5524", tenue="#2563eb", cheveux="#111827", longs=True)
    car = Square(0.42, fill_color=CARREAU, fill_opacity=1, stroke_color=CARREAU_B, stroke_width=3).move_to(
        P(0.62, -0.95)).rotate(0.2)
    lame = Polygon(P(-0.95, -1.25), P(-0.55, -1.25), P(-0.75, -0.8), fill_color="#cbd5e1", fill_opacity=1,
                   stroke_width=0)
    manche = Rectangle(width=0.1, height=0.3, fill_color="#78350f", fill_opacity=1, stroke_width=0).move_to(
        P(-0.75, -0.66))
    g = VGroup(p, lame, manche, car)
    g.corps, g.carreau, g.truelle = p.corps, car, VGroup(lame, manche)
    return g.scale(s)


class Carre1m(VGroup):
    """Le carré de 1 m de côté, QUADRILLÉ (10 × 10) : .bord .grille .rangs[i]
    (les 10 rangées de petits carrés, à remplir) · lab_haut(s) / lab_gauche(s)
    / lab_bas(s) (les côtés)."""

    def __init__(self, cote=3.4, n=10, **kw):
        super().__init__(**kw)
        self.cote, self.n = cote, n
        c = cote / n
        self.rangs = VGroup()
        for r in range(n):
            rang = VGroup(*[Square(c, fill_color=CARRE_F, fill_opacity=0, stroke_width=0) for _ in range(n)])
            rang.arrange(RIGHT, buff=0)
            self.rangs.add(rang)
        self.rangs.arrange(DOWN, buff=0)
        self.bord = Square(cote, stroke_color=CARRE_C, stroke_width=6, fill_color="#1e1b4b", fill_opacity=1)
        self.grille = VGroup()
        for k in range(1, n):
            self.grille.add(Line(P(-cote / 2 + k * c, -cote / 2), P(-cote / 2 + k * c, cote / 2)),
                            Line(P(-cote / 2, -cote / 2 + k * c), P(cote / 2, -cote / 2 + k * c)))
        self.grille.set_stroke("#ddd6fe", 2.2, opacity=0.9)
        self.add(self.bord, self.rangs, self.grille)

    def lab_haut(self, s, fs=30, couleur=CARRE_C):
        return gras(s, fs, couleur).next_to(self.bord, UP, buff=0.14)

    def lab_bas(self, s, fs=30, couleur=CARRE_C):
        return gras(s, fs, couleur).next_to(self.bord, DOWN, buff=0.14)

    def lab_gauche(self, s, fs=30, couleur=CARRE_C):
        return gras(s, fs, couleur).rotate(PI / 2).next_to(self.bord, LEFT, buff=0.14)

    def remplir(self, rangs=None, couleur=CARRE_F):
        rangs = range(self.n) if rangs is None else rangs
        return LaggedStart(*[self.rangs[r].animate.set_fill(couleur, 1) for r in rangs], lag_ratio=0.12)


class Sol(VGroup):
    """Un sol (ou un mur) de nl × nc carreaux, vu d'en haut : .fond (le sol nu)
    .carreaux (VGroup à poser) · poser(k=None) : LaggedStart des k premiers."""

    def __init__(self, nc=15, nl=10, c=0.28, fond=SOL, **kw):
        super().__init__(**kw)
        self.fond = Rectangle(width=nc * c, height=nl * c, fill_color=fond, fill_opacity=1, stroke_color="#78716c",
                              stroke_width=4)
        self.carreaux = VGroup()
        for r in range(nl):
            for k in range(nc):
                self.carreaux.add(Square(c * 0.94, fill_color=CARREAU, fill_opacity=1, stroke_color=CARREAU_B,
                                         stroke_width=1.5).move_to(
                    P(-nc * c / 2 + (k + 0.5) * c, nl * c / 2 - (r + 0.5) * c)))
        self.add(self.fond)
        self.c = c

    def caler(self):
        """Les carreaux (hors du groupe) suivent le sol là où il a été posé."""
        self.carreaux.move_to(self.fond)
        return self.carreaux

    def poser(self, k=None, run_time=1.2):
        self.caler()
        ks = self.carreaux if k is None else self.carreaux[:k]
        return LaggedStart(*[FadeIn(x, scale=0.6) for x in ks], lag_ratio=1.0 / max(1, len(ks)) * 3,
                           run_time=run_time)


def metre(long=4.6, n=10, couleur="#fde047"):
    """Le mètre de chantier (1 m), gradué en 10 : .regle .traits"""
    r = Rectangle(width=long, height=0.42, fill_color=couleur, fill_opacity=1, stroke_color="#a16207",
                  stroke_width=3)
    traits = VGroup(*[Line(P(-long / 2 + k * long / n, 0.21), P(-long / 2 + k * long / n, 0.21 - (0.22 if k % 5
                                                                                                    else 0.32)),
                           color="#422006", stroke_width=3) for k in range(1, n)])
    g = VGroup(r, traits)
    g.regle, g.traits = r, traits
    return g


def evier(s=1.0):
    """L'évier de la cuisine : la cuve grise sous le robinet, le meuble."""
    plan = Rectangle(width=2.6, height=0.22, fill_color="#a8a29e", fill_opacity=1, stroke_width=0).move_to(P(0, 0))
    cuve = Polygon(P(-0.8, -0.11), P(0.8, -0.11), P(0.65, -0.8), P(-0.65, -0.8), fill_color="#cbd5e1",
                   fill_opacity=1, stroke_color="#64748b", stroke_width=3)
    meuble = Rectangle(width=2.6, height=1.0, fill_color="#0f766e", fill_opacity=1, stroke_width=0).move_to(
        P(0, -0.62))
    poignees = VGroup(*[Rectangle(width=0.3, height=0.06, fill_color="#e5e7eb", fill_opacity=1, stroke_width=0)
                        .move_to(P(x, -0.95)) for x in (-0.6, 0.6)])
    return VGroup(meuble, poignees, plan, cuve).scale(s)


def horloge60(r=0.85):
    """Une horloge : 12 traits (toutes les 5 min), les aiguilles ; .cadran
    .tour (l'arc vert d'une heure entière, à tracer) .grande (l'aiguille)."""
    cad = Circle(radius=r, fill_color="#f8fafc", fill_opacity=1, stroke_color="#334155", stroke_width=5)
    traits = VGroup(*[Line(P(0, r * 0.8), P(0, r * 0.95), color="#334155", stroke_width=4).rotate(
        -k * TAU / 12, about_point=ORIGIN) for k in range(12)])
    pt = Line(ORIGIN, P(0, r * 0.5), color="#0f172a", stroke_width=7).rotate(-TAU / 4, about_point=ORIGIN)
    gd = Line(ORIGIN, P(0, r * 0.75), color="#0f172a", stroke_width=4)
    tour = Arc(radius=r * 1.13, start_angle=PI / 2, angle=-TAU * 0.999, color=VERT_OK, stroke_width=7)
    g = VGroup(cad, traits, pt, gd, Dot(radius=0.05, color="#0f172a"))
    g.cadran, g.tour, g.grande = cad, tour, gd
    g.caler = lambda: tour.move_to(cad.get_center())
    return g


class PropGrandeurConvertirBase(PropAgrandissementRapportBase):
    nom_voix = "4e-prop-grandeur-convertir"
    fichier_marques = "prop_grandeur_convertir_marques.json"

    def question_pause(self, *a, **k):
        """Celle de la base ; les choix, audités quand ils entrent (question),
        ne sont plus audités pendant la réponse (la carte juste s'agrandit)."""
        avant = k.pop("autres_q", None)

        def figer(sc):
            for c in sc.cartes_q:
                for f in c.get_family():
                    if isinstance(f, Text):
                        f._pas_audit = True
            if avant:
                avant(sc)
        return super().question_pause(*a, autres_q=figer, **k)

    def boite(self, mob, couleur=VERT_OK):
        return SurroundingRectangle(mob, color=couleur, buff=0.18, corner_radius=0.12, stroke_width=4)

    def carre(self, cote=3.4, centre=P(-3.4, 0)):
        """Le carré de 1 m quadrillé et ses côtés « 100 cm » (figure redite :
        sans audit) ; .labs"""
        c = Carre1m(cote).move_to(centre)
        c.labs = sans(VGroup(c.lab_haut("100 cm"), c.lab_gauche("100 cm")))
        return c

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Convertir des aires", self.identite, self.ceinture, y_ech=-2.45)
        c = Carre1m(2.3).move_to(P(-4.0, 0.0))
        self.au_mot("Convertir")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(c, scale=0.8), run_time=0.8)
        q = VGroup(self.t("Combien de cm²", 42), self.t("dans 1 m² ?", 42, AMBRE)).arrange(DOWN, buff=0.16)
        q.move_to(P(2.3, 0.3))
        self.au_mot("Combien")
        self.play(FadeIn(q[0], shift=UP * 0.15), c.remplir(range(1)), run_time=0.5)
        self.au_mot("dans 1")
        self.play(FadeIn(q[1], scale=1.15), c.remplir(range(1, 10)), run_time=0.8)
        self.insister(q[1], 1.12, 0.25)
        self.attendre_voix(marge=0.6)

    # ── 01 : Aïcha, carreleuse ; cuisine 6 m², carreaux 20 cm sur 20 cm ─────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = aicha(0.9).move_to(P(-5.45, -0.75))
        nom = self.t("Aïcha", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.25)
        self.au_mot("Voici")
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        met = self.t("carreleuse", 30, BLEU_CALCUL).next_to(pers, DOWN, buff=0.15)
        self.au_mot("carreleuse")
        self.play(FadeIn(met, shift=DOWN * 0.1), Indicate(pers.carreau, color=YELLOW, scale_factor=1.4),
                  run_time=0.6)
        sol = Sol(15, 10, 0.24).move_to(P(-2.0, 0.75))
        lc = sans(self.t("la cuisine", 26, ARDOISE).next_to(sol, UP, buff=0.12))
        L1 = self.lc([("Cuisine :", WHITE), ("6 m²", BLEU_CALCUL)], 2.3, fs=42)
        self.jouer(L1, ["cuisine", "6 mètres"], {0: [FadeIn(sol.fond, scale=0.9), FadeIn(lc)],
                                                 1: [Indicate(sol.fond, color=AMBRE, scale_factor=1.04)]})
        un = Square(1.15, fill_color=CARREAU, fill_opacity=1, stroke_color=CARREAU_B, stroke_width=4).move_to(
            P(-2.2, -1.75))
        lb = gras("20 cm", 26, CARREAU).next_to(un, UP, buff=0.1)
        lg = gras("20 cm", 26, CARREAU).rotate(PI / 2).next_to(un, LEFT, buff=0.1)
        L2 = self.lc([("Carreau :", WHITE), ("20 cm", CARREAU), ("sur", WHITE), ("20 cm", CARREAU)], 1.4)
        self.jouer(L2, ["Ses carreaux", "20 cm", "sur", ("20 cm", 2)],
                   {0: [FadeIn(un, scale=0.6)], 1: [FadeIn(lb, scale=1.3)], 3: [FadeIn(lg, scale=1.3)]})
        L3 = self.lc([("Combien de carreaux ?", ORANGE_RETENUE)], 0.45, fs=40)
        self.jouer(L3, ["Combien"])
        L4 = VGroup(self.lc([("D'abord :", WHITE)], -0.6, fs=40),
                    self.lc([("la même unité partout !", AMBRE)], -1.3, fs=40))
        self.jouer(L4, ["D'abord", "la même"])
        cadre = self.boite(L4[1], AMBRE)
        self.play(Create(cadre), run_time=0.35)
        self.insister(VGroup(cadre, L4[1]), 1.06, 0.25)
        self.attendre_voix()

    # ── 02 : les longueurs : 1 m = 100 cm ; × 100 ; 2,5 m = 250 cm ─────────
    def ecran_longueur(self):
        self.ecran("02-longueur")
        tit = self.t("Les longueurs", 44, JAUNE_TITRE).move_to(P(-3.0, 3.1))
        self.au_mot("Commençons")
        self.play(Write(tit), run_time=0.5)
        m = metre(4.8).move_to(P(-3.4, 1.15))
        acc = BraceBetweenPoints(m.regle.get_corner(UL), m.regle.get_corner(UR), UP, color=WHITE)
        l1m = gras("1 m", 34, WHITE).next_to(acc, UP, buff=0.1)
        l100 = gras("100 cm", 34, BLEU_CALCUL).next_to(m, DOWN, buff=0.2)
        L1 = self.lc([("1 m", WHITE), ("=", WHITE), ("100 cm", BLEU_CALCUL)], 2.3, fs=46)
        self.jouer(L1, ["1 m", None, "100 cm"],
                   {0: [FadeIn(m, shift=RIGHT * 0.3), FadeIn(acc), FadeIn(l1m)],
                    2: [LaggedStart(*[Indicate(t, color=BLEU_CALCUL) for t in m.traits], lag_ratio=0.08),
                        FadeIn(l100, scale=1.2)]})
        L2 = self.lc([("m", WHITE), ("→", WHITE), ("cm :", WHITE), ("× 100", AMBRE)], 1.3, fs=46)
        self.jouer(L2, ["Pour passer", None, "aux centimètres", "multiplie par"])
        self.insister(L2[3], 1.25, 0.25)
        # 2,5 m : deux mètres et un demi-mètre, bout à bout (1 m = 1,85)
        u = 1.85
        bout = VGroup(*[metre(u) for _ in range(3)])
        for b in bout:
            b.stretch_to_fit_height(0.32)
        bout.arrange(RIGHT, buff=0)
        bout[2].stretch(0.5, 0, about_edge=LEFT)
        bout.move_to(P(0, -1.35)).align_to(P(-6.1, 0), LEFT)
        l25 = gras("2,5 m", 32, WHITE).next_to(bout, UP, buff=0.15)
        l250 = gras("250 cm", 32, VERT_OK).next_to(bout, DOWN, buff=0.15)
        L3 = self.lc([("2,5 m", WHITE), ("=", WHITE), ("250 cm", VERT_OK)], -0.1, fs=46)
        self.jouer(L3, ["2,5", None, "250"], {0: [FadeIn(bout, shift=RIGHT * 0.3), FadeIn(l25)],
                                              2: [FadeIn(l250, scale=1.2)]})
        cadre = self.boite(L3)
        self.play(Create(cadre), run_time=0.35)
        self.insister(VGroup(cadre, L3), 1.06, 0.25)
        self.attendre_voix()

    # ── 03 : les aires : le carré de 1 m quadrillé ; 100 × 100 = 10 000 ────
    def ecran_aire(self):
        self.ecran("03-aire")
        tit = self.t("Et les aires ?", 44, JAUNE_TITRE).move_to(P(-3.3, 3.1))
        self.au_mot("Et les aires")
        self.play(Write(tit), run_time=0.5)
        c = Carre1m(3.3).move_to(P(-3.3, -0.35))
        self.au_mot("Un carré")
        self.play(Create(c.bord), run_time=0.6)
        lb = c.lab_bas("1 m", fs=32, couleur=WHITE)
        self.au_mot("1 m")
        self.play(FadeIn(lb, shift=UP * 0.1), run_time=0.35)
        lh, lg = c.lab_haut("100 cm"), c.lab_gauche("100 cm")
        self.au_mot("100 cm")
        self.play(FadeIn(lh, scale=1.2), run_time=0.35)
        self.au_mot("sur 100")
        self.play(FadeIn(lg, scale=1.2), Create(c.grille), run_time=0.6)
        L1 = self.lc([("100 ×", WHITE), ("100", WHITE), ("=", WHITE), ("10 000", VERT_OK)], 2.3, fs=48, xl=1.0)
        self.jouer(L1, ["100 fois", "100, égale", None, "10 000"],
                   {0: [c.remplir(range(1)), Indicate(lh, color=WHITE)],
                    1: [Indicate(lg, color=WHITE)], 3: [c.remplir(range(1, 10))]})
        L2 = self.lc([("1 m²", WHITE), ("=", WHITE), ("10 000 cm²", VERT_OK)], 1.1, fs=48, xl=1.0)
        cadre = self.boite(L2)
        self.jouer(L2, ["1 mètre", None, "10 000 centimètres"], {2: [Create(cadre)]})
        self.insister(VGroup(cadre, L2), 1.06, 0.25)
        L3 = self.lc([("Pas 100 !", ROUGE_ERREUR)], -0.1, fs=48, xl=1.0)
        self.jouer(L3, ["Pas"], {0: [Circumscribe(L2[2], color=VERT_OK)]})
        self.attendre_voix()

    # ── 04 : QUESTION 1 (cm² dans 1 m²) ────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        c = self.carre(3.0, P(-3.5, -0.2))
        self.add(c, c.labs)

        def apres(sc):
            sc.au_mot("100 cm")
            sc.rep(0, avec=[Indicate(c.labs, color=WHITE)])
            sc.au_mot("10 000")
            sc.rep(1, avec=[c.remplir()])
            sc.rep_fin()

        self.question_pause("04-question", "04b-reponse",
                            ["Combien de cm²", "dans 1 m² ?"],
                            [self.t("100 cm²", 34), self.t("1 000 cm²", 34), self.t("10 000 cm²", 34)], 2,
                            ["100 cm × 100 cm", "= 10 000 cm²."], mot_q="Combien",
                            autres_r=apres)

    # ── 05 : le calcul : 60 000 cm² ÷ 400 cm² = 150 carreaux ───────────────
    def ecran_calcul(self):
        self.ecran("05-calcul")
        sol = Sol(15, 10, 0.3).move_to(P(-3.4, 0.6))
        l6 = gras("6 m²", 30, ARDOISE).next_to(sol, UP, buff=0.12)
        un = Square(0.75, fill_color=CARREAU, fill_opacity=1, stroke_color=CARREAU_B, stroke_width=4).move_to(
            P(-5.3, -2.0))
        l20 = gras("20 cm", 24, CARREAU).next_to(un, UP, buff=0.08)
        L1 = self.lc([("Cuisine :", WHITE), ("6 m²", BLEU_CALCUL)], 2.6, fs=40, xl=1.0)
        self.jouer(L1, ["La cuisine", "6 mètres"], {0: [FadeIn(sol.fond, scale=0.9)], 1: [FadeIn(l6)]})
        L1b = self.lc([("= 6 ×", WHITE), ("10 000", WHITE), ("=", WHITE), ("60 000 cm²", VERT_OK)], 1.85, fs=40,
                      xl=1.0)
        self.jouer(L1b, ["6 fois", "10 000", "égale", "60 000"])
        L2 = self.lc([("Carreau :", WHITE), ("20 ×", WHITE), ("20", WHITE), ("=", WHITE), ("400 cm²", VERT_OK)],
                     0.95, fs=40, xl=1.0)
        l400 = gras("400 cm²", 30, CARREAU).next_to(un, RIGHT, buff=0.2)
        self.jouer(L2, ["Un carreau", "20 fois", "20, égale", None, "400"],
                   {0: [FadeIn(un, scale=0.6)], 1: [FadeIn(l20)], 4: [FadeIn(l400, scale=1.2)]})
        op = Operation([gras("60 000", 42, WHITE), gras("÷", 42, WHITE), gras("400", 42, WHITE),
                        gras("=", 42, WHITE), gras("150", 46, VERT_OK)],
                       [gras("cm²", 32, UNITE_C), gras("÷", 32, UNITE_C), gras("cm²", 32, UNITE_C),
                        gras("=", 32, UNITE_C), gras("carreaux", 32, VERT_OK)], dy=0.7, buff=0.35)
        if op.width > 4.9:
            op.scale_to_fit_width(4.9)
        op.move_to(P(0, -0.35)).align_to(P(1.0, 0), LEFT)
        h, b = op.haut, op.bas
        sans(b)  # les unités : sous leur nombre, sans attendre « carreaux »
        for k, mot in enumerate([("60 000", 2), "divisé", ("400", 2), ("égale", 3)]):
            self.au_mot(*mot) if isinstance(mot, tuple) else self.au_mot(mot)
            self.play(FadeIn(h[k], shift=RIGHT * 0.12), FadeIn(b[k], shift=UP * 0.1), run_time=0.3)
        cadre = self.boite(VGroup(h[4], b[4]))
        self.au_mot("150")
        self.play(FadeIn(h[4], scale=1.3), FadeIn(b[4]), Create(cadre), sol.poser(run_time=1.4))
        self.insister(VGroup(cadre, h[4], b[4]), 1.08, 0.25)
        self.attendre_voix()

    # ── 06 : le piège : 6 m² = 600 cm² → un carreau et demi ! ──────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        tit = self.t("Attention au piège !", 44, ROUGE_ERREUR).move_to(P(-2.9, 3.1))
        self.au_mot("Attention")
        self.play(Write(tit), run_time=0.5)
        ap = personne(peau="#f1c27d", tenue="#64748b", cheveux="#92400e").scale(0.7).move_to(P(-5.3, -1.75))
        lap = self.t("un apprenti", 26, ARDOISE).next_to(ap, DOWN, buff=0.12)
        self.au_mot("Un apprenti")
        self.play(FadeIn(ap, shift=UP * 0.2), FadeIn(lap), run_time=0.45)
        sol = Sol(15, 10, 0.24).move_to(P(-2.4, 0.55))
        self.play(FadeIn(sol.fond, scale=0.9), run_time=0.35)
        L1 = self.lc([("6 m²", ROUGE_ERREUR), ("=", ROUGE_ERREUR), ("600 cm²", ROUGE_ERREUR)], 2.3, fs=44, xl=1.0)
        self.jouer(L1, ["6 mètres", None, "600 centimètres"])
        L2 = self.lc([("600 ÷", WHITE), ("400 :", WHITE)], 1.5, fs=42, xl=1.0)
        self.jouer(L2, ["600 divisé", "par 400"])
        L3 = VGroup(self.lc([("un carreau et demi", AMBRE)], 0.8, fs=40, xl=1.0),
                    self.lc([("pour toute la cuisine !", WHITE)], 0.15, fs=40, xl=1.0))
        sol.caler()
        demi = sol.carreaux[1].copy().stretch(0.5, 0, about_edge=LEFT)
        un_et_demi = VGroup(sol.carreaux[0], demi)
        self.jouer(L3, ["un carreau", "pour toute"], {0: [FadeIn(un_et_demi, scale=0.5)],
                                                      1: [Indicate(sol.fond, color=ROUGE_ERREUR,
                                                                   scale_factor=1.03)]})
        self.play(Flash(un_et_demi, color=AMBRE, line_length=0.25), run_time=0.5)
        tp = self.tampon("Impossible !", ROUGE_ERREUR, fs=40).move_to(P(-2.4, -1.45))
        self.au_mot("Impossible")
        self.play(FadeIn(tp, scale=1.3), Create(croix(L1, sw=7)), run_time=0.45)
        L4 = self.lc([("× 100", ROUGE_ERREUR), ("une seule fois", ROUGE_ERREUR)], -0.75, fs=40, xl=1.0)
        self.jouer(L4, ["multiplié par", "une seule"])
        L5 = self.lc([("Aire :", VERT_OK), ("× 100", VERT_OK), ("× 100", VERT_OK)], -1.6, fs=44, xl=1.0,
                     droite=5.1)
        self.jouer(L5, ["Pour une aire", "100 fois", ("100", 3)])
        ok = self.boite(L5)
        self.play(Create(ok), run_time=0.35)
        self.insister(VGroup(ok, L5), 1.06, 0.25)
        self.attendre_voix()

    # ── 07 : le débit : 12 L/min ; 1 h = 60 min ; 12 × 60 = 720 L/h ───────
    def robinet_evier(self, x=-4.75, y=-1.95, s=1.25):
        ev = evier(1.0).move_to(P(x, y))
        rb = robinet(s)
        rb.remove(rb[4], rb[5])  # sans le seau : il coule dans l'évier
        rb.shift(ev[3].get_center() + UP * 0.1 - rb.eau.get_bottom() + LEFT * 0.0)
        return ev, rb

    def tableau_debit(self, centre):
        return TableauProp(["Durée (min)", "Eau (L)"], [[1, 60], [12, 720]], montrer=False, largeur_case=1.3,
                           largeur_libelle=2.35, hauteur=0.68, fs=30, centre=centre)

    def ecran_debit(self):
        self.ecran("07-debit")
        ev, rb = self.robinet_evier()
        self.au_mot("Aïcha pose")
        self.play(FadeIn(ev, shift=UP * 0.2), run_time=0.45)
        L1 = self.lc([("Débit :", WHITE), ("12 L/min", BLEU_CALCUL)], 2.65, fs=42, xl=1.0)
        self.jouer(L1, ["Un robinet", "12 litres"], {0: [FadeIn(VGroup(*[m for m in rb if m is not rb.eau]))],
                                                     1: [GrowFromEdge(rb.eau, UP)]})
        L2 = self.lc([("En une heure ?", ORANGE_RETENUE)], 1.95, fs=42, xl=1.0)
        h = horloge60(0.85).move_to(P(-1.7, 1.55))
        tb = self.tableau_debit(P(3.45, -0.7))
        c0 = sans(VGroup(tb.valeur(0, 0), tb.valeur(1, 0)))
        self.jouer(L2, ["Et en une"], {0: [FadeIn(h, scale=0.8), FadeIn(tb.fond, shift=DOWN * 0.15), FadeIn(c0)]})
        L3 = self.lc([("1 h", WHITE), ("=", WHITE), ("60 min,", VERT_OK), ("pas 100 !", ROUGE_ERREUR)], 1.25,
                     fs=40, xl=1.0)
        l60 = gras("60 min", 30, VERT_OK).next_to(h, DOWN, buff=0.3)
        fh = tb.fleche_col(0, 1, "× 60", ligne=0)
        self.jouer(L3, ["1 heure", None, "60 minutes", "pas 100"],
                   {0: [Create(h.caler()), Rotate(h.grande, -TAU * 0.999, about_point=h.cadran.get_center())],
                    2: [FadeIn(l60, scale=1.2), FadeIn(tb.valeur(0, 1), scale=1.3), Create(fh.fleche),
                        FadeIn(fh.etiquette)]})
        fb = tb.fleche_col(0, 1, "× 60", ligne=1)
        sans(fb.etiquette)
        L4 = self.lc([("12 ×", WHITE), ("60", WHITE), ("=", WHITE), ("720 L/h", VERT_OK)], -2.75, fs=42, xl=1.0,
                     droite=5.0)
        cadre = self.boite(L4[3])
        self.jouer(L4, ["12 fois", "60", "égale", "720"],
                   {0: [Create(fb.fleche), FadeIn(fb.etiquette)],
                    3: [FadeIn(tb.valeur(1, 1), scale=1.3), tb.allumer(1, 1), Create(cadre)]})
        self.insister(VGroup(cadre, L4[3]), 1.1, 0.25)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (10 L/min → L/h) ───────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        ev, rb = self.robinet_evier(x=-4.9, y=-1.7)
        h = horloge60(0.8).move_to(P(-1.9, 1.7))
        self.add(ev, rb, h)

        def apres(sc):
            sc.au_mot("1 heure")
            sc.rep(0, avec=[Create(h.caler())])
            sc.au_mot("10 fois")
            sc.rep(1, avec=[Indicate(rb.eau, color=WHITE, scale_factor=1.2)])
            sc.rep_fin()

        self.question_pause("08-question", "08b-reponse",
                            ["Un robinet coule 10 L/min.", "Combien de L/h ?"],
                            [self.t("1 000 L/h", 34), self.t("600 L/h", 34), self.t("10 L/h", 34)], 1,
                            ["1 h = 60 min.", "10 × 60 = 600 L/h."], mot_q="Un robinet",
                            autres_r=apres)

    # ── 09 : défi : un mur de 2 m², carreaux de 10 cm sur 10 cm ────────────
    def mur(self):
        """Le mur de 2 m² (2 m sur 1 m) : 20 × 10 carreaux de 10 cm."""
        m = Sol(20, 10, 0.21, fond="#e2e8f0").move_to(P(-2.75, 0.75))
        for x in m.carreaux:
            x.set_fill("#5eead4", 1).set_stroke("#0f766e", 1.2)
        return m

    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-2.6, 3.1))
        self.au_mot("À toi de jouer")
        self.play(Write(tit), run_time=0.6)
        pers = aicha(0.7).move_to(P(-5.6, -1.85))
        m = self.mur()
        lm = sans(self.t("le mur", 26, ARDOISE).next_to(m, UP, buff=0.12))
        L0 = self.lc([("Mur :", WHITE), ("2 m²", BLEU_CALCUL)], 2.2, fs=42, xl=1.0)
        self.jouer(L0, ["Aïcha carrelle", "2 mètres"], {0: [FadeIn(pers, shift=UP * 0.2), FadeIn(m.fond), FadeIn(lm)],
                                                        1: [Indicate(m.fond, color=AMBRE, scale_factor=1.04)]})
        un = Square(1.0, fill_color="#5eead4", fill_opacity=1, stroke_color="#0f766e", stroke_width=4).move_to(
            P(-2.6, -1.6))
        lb = gras("10 cm", 24, "#5eead4").next_to(un, UP, buff=0.08)
        lg = gras("10 cm", 24, "#5eead4").rotate(PI / 2).next_to(un, LEFT, buff=0.08)
        L1 = self.lc([("Carreaux :", WHITE), ("10 cm", "#5eead4"), ("sur", WHITE), ("10 cm", "#5eead4")], 1.35,
                     fs=40, xl=1.0)
        self.jouer(L1, ["des carreaux", "10 cm", "sur", ("10 cm", 2)],
                   {0: [FadeIn(un, scale=0.6)], 1: [FadeIn(lb, scale=1.3)], 3: [FadeIn(lg, scale=1.3)]})
        L2 = self.lc([("Combien de carreaux ?", ORANGE_RETENUE)], 0.45, fs=42, xl=1.0)
        self.jouer(L2, ["Combien"])
        self.play(Indicate(L2, color=ORANGE_RETENUE, scale_factor=1.08), run_time=0.6)
        self.pause_defi(y=-0.75)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-2.6, 3.1))
        self.play(Write(tit), run_time=0.5)
        m = self.mur()
        self.play(FadeIn(m.fond), run_time=0.3)
        L1 = self.lc([("2 m²", WHITE), ("=", WHITE), ("20 000 cm²", VERT_OK)], 2.2, fs=42, xl=1.0)
        self.jouer(L1, ["2 mètres", None, "20 000"])
        L2 = self.lc([("Carreau :", WHITE), ("10 ×", WHITE), ("10", WHITE), ("=", WHITE), ("100 cm²", VERT_OK)], 1.3,
                     fs=40, xl=1.0)
        self.jouer(L2, ["Un carreau", "10 fois", "10, égale", None, "100 centimètres"])
        op = Operation([gras("20 000", 42, WHITE), gras("÷", 42, WHITE), gras("100", 42, WHITE),
                        gras("=", 42, WHITE), gras("200", 46, VERT_OK)],
                       [gras("cm²", 32, UNITE_C), gras("÷", 32, UNITE_C), gras("cm²", 32, UNITE_C),
                        gras("=", 32, UNITE_C), gras("carreaux", 32, VERT_OK)], dy=0.7, buff=0.35)
        if op.width > 4.9:
            op.scale_to_fit_width(4.9)
        op.move_to(P(0, 0.05)).align_to(P(1.0, 0), LEFT)
        h, b = op.haut, op.bas
        sans(b)  # les unités : sous leur nombre, sans attendre « carreaux »
        for k, mot in enumerate([("20 000", 2), "divisé", ("100", 2), ("égale", 2)]):
            self.au_mot(*mot) if isinstance(mot, tuple) else self.au_mot(mot)
            self.play(FadeIn(h[k], shift=RIGHT * 0.12), FadeIn(b[k], shift=UP * 0.1), run_time=0.3)
        cadre = self.boite(VGroup(h[4], b[4]))
        self.au_mot("200")
        self.play(FadeIn(h[4], scale=1.3), FadeIn(b[4]), Create(cadre), m.poser(run_time=1.4))
        self.insister(VGroup(cadre, h[4], b[4]), 1.08, 0.25)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def finale_morceaux(self, rangs, figure, fs=34):
        """« Ce que tu as appris » EN HAUT ET CENTRÉ ; chaque point = une coche +
        des lignes faites de MORCEAUX (chacun posé à son mot)."""
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.cadrer(figure, droite=self.XL - 0.3, haut=tit.get_bottom()[1] - 0.25)
        self.play(Write(tit), run_time=0.7)
        lignes = VGroup()
        for rang in rangs:
            bloc = VGroup(*[self.ligne(l, fs) for l in rang]).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
            lignes.add(VGroup(self.coche(), bloc).arrange(RIGHT, buff=0.25, aligned_edge=UP))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.38)
        xl = min(self.XL, figure.get_right()[0] + 0.45)
        largeur = self.BORD_X - 0.05 - xl
        if lignes.width > largeur:
            lignes.scale_to_fit_width(largeur)
        if lignes.height > 4.6:
            lignes.scale_to_fit_height(4.6)
        lignes.align_to(P(xl, 0), LEFT).align_to(P(0, 2.5), UP)
        return lignes

    def montrer_rang(self, rang, mots, avec=None):
        avec = avec or {}
        morceaux = [m for l in rang[1] for m in l]
        for i, (m, mot) in enumerate(zip(morceaux, mots)):
            if mot:
                self.au_mot(*mot) if isinstance(mot, tuple) else self.au_mot(mot)
            extra = [Create(rang[0])] if i == 0 else []
            self.play(FadeIn(m, shift=RIGHT * 0.15), *extra, *avec.get(i, []), run_time=0.35)

    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        c = self.carre(2.6)
        fig = VGroup(c, c.labs)
        self.add(fig)
        rangs = self.finale_morceaux(figure=fig, rangs=[
            [[("1 m", WHITE), ("= 100 cm.", WHITE)]],
            [[("Donc 1 m²", WHITE), ("= 100 ×", WHITE), ("100", WHITE)], [("= 10 000 cm².", VERT_OK)]],
            [[("Pour une aire,", WHITE), ("le facteur", WHITE)], [("des longueurs compte", WHITE),
                                                                  ("deux fois.", AMBRE)]],
            [[("Et 1 h", WHITE), ("= 60 min,", WHITE), ("jamais 100 !", ROUGE_ERREUR)]]], fs=34)
        self.montrer_rang(rangs[0], ["1 m", "100 cm"])
        self.montrer_rang(rangs[1], ["Donc", "100 fois", "100 :", "10 000"], {3: [c.remplir()]})
        self.montrer_rang(rangs[2], ["Pour une", "le facteur", "des longueurs", "deux fois"])
        self.montrer_rang(rangs[3], ["Et 1", "60 minutes", "jamais"])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_longueur()
        self.ecran_aire()
        self.ecran_question1()
        self.ecran_calcul()
        self.ecran_piege()
        self.ecran_debit()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class PropGrandeurConvertir4e(PropGrandeurConvertirBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"
