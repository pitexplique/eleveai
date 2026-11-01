# prop_probleme.py
# EleveAI — Maths 4e — série « Proportionnalité », lot 5 (une paysage par
# micro), épisode 25 : RÉSOUDRE UN PROBLÈME DE PROPORTIONNALITÉ (micro du
# coach : prop_probleme, notion prop_proportionnalite), AVEC VOIX. Paysage 16:9
# SEULEMENT (le short 4e-prop-proportionnalite-short-probleme existe déjà),
# CEINTURE VERTE.
# ⭐ Méthode travaillée : repérer les grandeurs, VÉRIFIER qu'elles sont
# proportionnelles, puis calculer étape par étape (coefficient × 1,5 ; passage
# par l'unité ÷ 4 puis × 160 ; ÷ 9 pour remonter aux packs), l'unité à chaque
# ligne, et juger si le résultat a du sens (on arrondit au-dessus : 27 packs).
# Un tableau (TableauProp) dès qu'il y a deux grandeurs. Pas de produit en
# croix (réservé à l'épisode 24) ; « ÷ » écrit, jamais 5/2.
# ⭐ Fil rouge (erreur 2) : CROIRE TOUT PROPORTIONNEL. Le bus (150 € pour 30 ou
# 50 passagers : un forfait) ; question 2 : la durée d'un match ne dépend pas
# des spectateurs (A, 40 min = croire proportionnel ; B, 10 min = inverser).
# Question 1 : A (26 packs : il manque de l'eau) et C (26,7 packs : un morceau
# de pack) barrés quand la voix les cite.
#
# Décor et métier : FOOTBALL, Sofia, ORGANISATRICE d'un tournoi (16 équipes de
# 10 joueurs) : l'eau, les goûters, le bus, le budget.
# Chiffres : tous inventés, plausibles (1,5 L d'eau par joueur pour une journée
# de tournoi ; pack de 6 × 1,5 L à 3 € ; 4 barres de céréales à 2,40 € ; bus à
# 150 € ; match de 20 min). Aucun chiffre du monde réel : pas de source à citer.
# Centres d'intérêt : football, argent-budget.
#
# Écrans : 00 garde · 01 Sofia, 16 équipes de 10, l'eau, les goûters, le bus ·
# 02 l'eau : 16 × 10 = 160 joueurs, × 1,5 = 240 L (tableau) · 03 les packs :
# 6 × 1,5 = 9 L, 240 ÷ 9 ≈ 26,7 · 04 QUESTION 1 (26 / 27 / 26,7 packs) ·
# 05 les goûters : ÷ 4 puis × 160 = 96 € · 06 piège : le bus, 150 € pour 30 ou
# 50 passagers · 07 QUESTION 2 (le match, 100 → 200 spectateurs) · 08 le
# budget 81 + 96 + 150 = 327 € · 09 défi 20 équipes · 09b correction 300 L ·
# 10 ce que tu as appris · 11 fin.
#
# Voix : manim/voix/4e-prop-probleme.json (validée par Frédéric le 01/11, débit
# −10), WAV dans public/sons/4e-prop-probleme/ ; marques mot à mot :
# manim/scripts/4e/prop_probleme_marques.json (scripts/marques_dump.ps1 puis le
# convertisseur « une marque par occurrence » de l'agent 19).
# Outils : manim/scripts/6e/prop_commun.py + manim/canvas_proportion.py (non
# modifiés) ; base PropReconnaitreBase de l'épisode 20 (lc, jouer, montre,
# ligne_rep bornée, coche loin du texte des choix). Ajouté ICI : sofia(),
# ballon(), terrain(), bouteille(), pack(), barre_cereales(), bus(),
# grille_joueurs(), barrer_choix().
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/prop_probleme.py PropProbleme4e
# PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/4e/prop_probleme.py PropProbleme4e -o eleveai-maths-4e-prop-probleme --media_dir manim/media-prop-4e-25
# Sortie : manim/sorties/4e/maths/proportionnalite/25-probleme/eleveai-maths-4e-prop-probleme.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

from prop_commun import *  # noqa: E402,F403
from prop_agrandissement_rapport import sans  # noqa: E402
import importlib.util  # noqa: E402

# le 6e a aussi un prop_reconnaitre.py, PLUS HAUT dans sys.path : on charge le 4e par son chemin
_spec = importlib.util.spec_from_file_location("prop_reconnaitre_4e", Path(__file__).resolve().parent / "prop_reconnaitre.py")
_p20 = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_p20)
PropReconnaitreBase = _p20.PropReconnaitreBase

PELOUSE = "#15803d"
EAU_C = "#38bdf8"      # l'eau : bleu
GOUTER_C = "#f59e0b"   # les goûters : ambre
BUS_C = "#a78bfa"      # le bus : violet
EQUIPES = ["#ef4444", "#3b82f6", "#facc15", "#22c55e", "#f97316", "#a855f7", "#ec4899", "#14b8a6"]


def ballon(r=0.3):
    """Un ballon de foot : rond blanc, pentagone noir au centre et cinq taches."""
    b = Circle(radius=r, fill_color=WHITE, fill_opacity=1, stroke_color="#111827", stroke_width=3)
    pent = RegularPolygon(5, fill_color="#111827", fill_opacity=1, stroke_width=0).scale(r * 0.32)
    taches = VGroup(*[RegularPolygon(5, fill_color="#111827", fill_opacity=1, stroke_width=0).scale(r * 0.2)
                      .move_to(rotate_vector(UP * r * 0.78, k * TAU / 5)) for k in range(5)])
    return VGroup(b, pent, taches)


def terrain(l=3.6, h=2.2):
    """Un terrain de foot vu de haut : pelouse, lignes blanches, deux buts."""
    fond = RoundedRectangle(width=l, height=h, corner_radius=0.1, fill_color=PELOUSE, fill_opacity=1,
                            stroke_width=0)
    bord = Rectangle(width=l - 0.3, height=h - 0.3, stroke_color=WHITE, stroke_width=3)
    milieu = Line(UP * (h / 2 - 0.15), DOWN * (h / 2 - 0.15), color=WHITE, stroke_width=3)
    rond = Circle(radius=h * 0.18, stroke_color=WHITE, stroke_width=3)
    buts = VGroup(*[Rectangle(width=0.35, height=h * 0.36, stroke_color=WHITE, stroke_width=3)
                    .move_to(RIGHT * s * (l / 2 - 0.15 - 0.175)) for s in (-1, 1)])
    return VGroup(fond, bord, milieu, rond, buts)


def sofia(s=1.0):
    """Sofia, organisatrice du tournoi : maillot vert, sifflet, planchette."""
    p = personne(peau="#8d5524", tenue="#16a34a", cheveux="#111827", longs=True)
    c = p.corps.get_center()
    cordon = Line(p.tete.get_bottom() + LEFT * 0.12, c + P(0.05, 0.25), color=WHITE, stroke_width=3)
    sifflet = RoundedRectangle(width=0.22, height=0.12, corner_radius=0.05, fill_color="#e2e8f0", fill_opacity=1,
                               stroke_width=0).move_to(c + P(0.08, 0.2))
    planche = RoundedRectangle(width=0.55, height=0.72, corner_radius=0.05, fill_color="#92400e", fill_opacity=1,
                               stroke_width=0).move_to(c + P(0.55, -0.35))
    feuille = Rectangle(width=0.42, height=0.55, fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(
        planche.get_center() + DOWN * 0.04)
    traits = VGroup(*[Line(LEFT * 0.14, RIGHT * 0.14, color=GREY_B, stroke_width=2).move_to(
        feuille.get_center() + UP * (0.15 - 0.12 * k)) for k in range(3)])
    p.add(cordon, sifflet, planche, feuille, traits)
    return p.scale(s)


def bouteille(s=1.0, couleur=EAU_C):
    """Une bouteille d'eau : corps bleu clair, étiquette, bouchon."""
    corps = RoundedRectangle(width=0.3, height=0.8, corner_radius=0.1, fill_color=couleur, fill_opacity=0.85,
                             stroke_color=WHITE, stroke_width=2)
    col = Rectangle(width=0.14, height=0.12, fill_color=couleur, fill_opacity=0.85, stroke_width=0).next_to(
        corps, UP, buff=0)
    bouchon = Rectangle(width=0.16, height=0.08, fill_color="#1d4ed8", fill_opacity=1, stroke_width=0).next_to(
        col, UP, buff=0)
    etiq = Rectangle(width=0.3, height=0.22, fill_color=WHITE, fill_opacity=0.9, stroke_width=0).move_to(corps)
    return VGroup(corps, col, bouchon, etiq).scale(s)


def pack(s=1.0):
    """Un pack de 6 bouteilles (2 rangées de 3) dans son film, avec sa poignée."""
    b = VGroup(*[bouteille(1.0) for _ in range(6)]).arrange_in_grid(2, 3, buff=(0.05, 0.08))
    film = RoundedRectangle(width=b.width + 0.15, height=b.height * 0.55, corner_radius=0.08, fill_color=WHITE,
                            fill_opacity=0.18, stroke_color=WHITE, stroke_width=2).move_to(b.get_bottom() + UP * b.height * 0.3)
    poignee = Arc(radius=0.22, start_angle=0, angle=PI, stroke_color=WHITE, stroke_width=4).next_to(b, UP, buff=0.02)
    return VGroup(b, film, poignee).scale(s)


def barre_cereales(s=1.0):
    """Une barre de céréales dans son emballage."""
    emb = RoundedRectangle(width=1.1, height=0.32, corner_radius=0.08, fill_color=GOUTER_C, fill_opacity=1,
                           stroke_color="#78350f", stroke_width=2)
    grains = VGroup(*[Dot(radius=0.035, color="#78350f").move_to(P(-0.35 + 0.14 * k, 0.04 * (-1) ** k))
                      for k in range(6)])
    bouts = VGroup(*[Polygon(P(0, 0.16), P(0, -0.16), P(0.12 * s_, 0), fill_color=GOUTER_C, fill_opacity=1,
                             stroke_width=0).move_to(P(s_ * 0.6, 0)) for s_ in (-1, 1)])
    return VGroup(bouts, emb, grains).scale(s)


def bus(s=1.0):
    """Un autocar vu de côté : caisse violette, vitres, deux roues."""
    caisse = RoundedRectangle(width=3.0, height=1.15, corner_radius=0.18, fill_color=BUS_C, fill_opacity=1,
                              stroke_color=WHITE, stroke_width=2)
    vitres = VGroup(*[RoundedRectangle(width=0.42, height=0.38, corner_radius=0.05, fill_color="#e0f2fe",
                                       fill_opacity=1, stroke_width=0).move_to(P(-1.15 + 0.5 * k, 0.2))
                      for k in range(5)])
    pare = RoundedRectangle(width=0.3, height=0.6, corner_radius=0.05, fill_color="#e0f2fe", fill_opacity=1,
                            stroke_width=0).move_to(P(1.3, 0.08))
    roues = VGroup(*[VGroup(Circle(radius=0.22, fill_color="#111827", fill_opacity=1, stroke_width=0),
                            Circle(radius=0.09, fill_color=GREY_B, fill_opacity=1, stroke_width=0))
                     .move_to(P(x, -0.6)) for x in (-0.9, 0.9)])
    return VGroup(caisse, vitres, pare, roues).scale(s)


def grille_joueurs(n, centre, dx=0.32, dy=0.19, r=0.065):
    """n équipes de 10 joueurs : une COLONNE de 10 points par équipe, couleurs
    en alternance. .colonnes[i] = l'équipe i."""
    cols = VGroup()
    for i in range(n):
        c = EQUIPES[i % len(EQUIPES)]
        cols.add(VGroup(*[Dot(radius=r, color=c).move_to(P(i * dx, -j * dy)) for j in range(10)]))
    cols.move_to(centre)
    cols.colonnes = cols
    return cols


class PropProblemeBase(PropReconnaitreBase):
    nom_voix = "4e-prop-probleme"
    fichier_marques = "prop_probleme_marques.json"
    LIBS_E = ["Joueurs", "Eau (L)"]

    @staticmethod
    def _nombre_seul(t, n):
        """La synchro de t n'attend que le nombre n (« 26 virgule 7 » dure 1,3 s :
        le mot « packs » qui le suit arrivait trop tard, AUDIT-TARD)."""
        t.original_text = n
        return t

    def barrer_choix(self, i):
        """Un trait rouge sur le texte du choix i (le leurre cité par la voix)."""
        corps = self.cartes_q[i][1][1]
        return Line(corps.get_left() + LEFT * 0.08, corps.get_right() + RIGHT * 0.08, color=ROUGE_ERREUR,
                    stroke_width=6)

    def table_eau(self, centre=P(-3.6, -1.3), vals=None, fs=36):
        return TableauProp(self.LIBS_E, vals or [[1, 160], ["1,5", 240]], montrer=False, largeur_case=1.5,
                           largeur_libelle=2.6, fs=fs, centre=centre)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Résoudre un problème de proportionnalité", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("Résoudre")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        tr = terrain(3.0, 1.8).move_to(P(-2.2, 0.3))
        bl = ballon(0.22).move_to(tr.get_center() + P(0.45, -0.2))
        nom = self.t("Le tournoi de Sofia", 40, AMBRE).next_to(tr, RIGHT, buff=0.5)
        self.au_mot("Le tournoi")
        self.play(FadeIn(tr, scale=0.8), FadeIn(nom, shift=LEFT * 0.2), run_time=0.5)
        self.play(FadeIn(bl, shift=LEFT * 1.0), Rotate(bl, -PI), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : Sofia, 16 équipes de 10, l'eau, les goûters, le bus ────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        so = sofia(1.0).move_to(P(-5.5, -0.9))
        nom = self.t("Sofia", 40, BLEU_CALCUL).next_to(so, UP, buff=0.3)
        self.montre("Voici Sofia", FadeIn(so, shift=UP * 0.3), FadeIn(nom), rt=0.5)
        tr = terrain(3.4, 2.1).move_to(P(-2.2, 1.9))
        L0 = self.lc([("Un tournoi de foot", JAUNE_TITRE)], 2.95, fs=40)
        self.jouer(L0, ["un tournoi"], {0: [FadeIn(tr, scale=0.8)]})
        g = grille_joueurs(16, tr.get_center() + DOWN * 0.05, dx=0.18, dy=0.15, r=0.045)
        L1 = self.lc([("16 équipes", WHITE), ("de 10 joueurs", WHITE)], 2.1, fs=38)
        self.jouer(L1, ["16 équipes", "de 10 joueurs"],
                   {0: [LaggedStart(*[FadeIn(c[0], scale=2) for c in g.colonnes], lag_ratio=0.05)],
                    1: [LaggedStart(*[FadeIn(VGroup(*c[1:])) for c in g.colonnes], lag_ratio=0.05)]})
        L2 = self.lc([("À prévoir :", AMBRE)], 1.15, fs=38)
        self.jouer(L2, ["Elle doit"])
        items = [("l'eau", bouteille(0.6), EAU_C, "l'eau"), ("les goûters", barre_cereales(0.6), GOUTER_C,
                                                               "les goûters"), ("le bus", bus(0.28), BUS_C, "le bus")]
        for k, (s, ico, c, mot) in enumerate(items):
            y = 0.25 - 0.85 * k
            ico.move_to(P(1.75, y))
            tx = self.t(s, 36, c).move_to(P(0, y)).align_to(P(2.45, 0), LEFT)
            self.montre(mot, FadeIn(ico, scale=0.7), FadeIn(tx, shift=RIGHT * 0.15), rt=0.35)
        q = self.t("Par où commencer ?", 38, ORANGE_RETENUE).move_to(P(-2.0, -2.75))
        self.montre("Par où", FadeIn(q, shift=UP * 0.15), Indicate(so, scale_factor=1.05), rt=0.45)
        self.attendre_voix()

    # ── 02 : l'eau : 16 × 10 = 160 joueurs, 160 × 1,5 = 240 L ───────────────
    def ecran_eau(self):
        self.ecran("02-eau")
        g = grille_joueurs(16, P(-3.4, 1.95))
        tb = self.table_eau()
        L0 = self.lc([("On repère les grandeurs.", AMBRE)], 2.95, fs=38)
        self.jouer(L0, ["on repère"], {0: [FadeIn(tb.fond, shift=UP * 0.2)]})
        self.play(Indicate(tb.libelles[0], color=AMBRE, scale_factor=1.15),
                  Indicate(tb.libelles[1], color=AMBRE, scale_factor=1.15), run_time=0.6)
        self.montre("16 équipes", LaggedStart(*[FadeIn(c, shift=DOWN * 0.15) for c in g.colonnes], lag_ratio=0.06),
                    rt=0.8)
        self.montre("10 joueurs", Circumscribe(g.colonnes[0], color=AMBRE, buff=0.06), rt=0.5)
        L1 = self.lc([("16 ×", WHITE), ("10 =", WHITE), ("160 joueurs", VERT_OK)], 2.05, fs=40)
        self.jouer(L1, ["16 fois", "10, égale", "160 joueurs"],
                   {2: [Circumscribe(g, color=VERT_OK, buff=0.1)]})
        L2 = self.lc([("1 joueur →", WHITE), ("1,5 L d'eau", EAU_C)], 1.15, fs=40)
        sans(L2[0])  # « Chaque joueur » : le 1 n'est pas dit
        un = sans(tb.valeur(0, 0))
        self.jouer(L2, ["Chaque joueur", "1,5 litre"], {0: [FadeIn(un, scale=1.4), tb.allumer(0, 0)],
                                                       1: [FadeIn(tb.valeur(1, 0), scale=1.4), tb.allumer(1, 0)]})
        v = sans(self.tampon("Proportionnel", VERT_OK, 32))
        self.col(v, 0.2, 1.3)
        self.montre("est proportionnelle", FadeIn(v, scale=1.3), tb.eteindre(0, 0), tb.eteindre(1, 0), rt=0.45)
        fl = tb.fleche_lat("× 1,5", fs=32)
        L3 = self.lc([("160 ×", WHITE), ("1,5 =", WHITE), ("240 L", VERT_OK)], -0.8, fs=42)
        self.jouer(L3, ["160 fois", "1,5, égale", "240 litres"],
                   {0: [FadeIn(tb.valeur(0, 1), scale=1.4), tb.allumer(0, 1), Create(fl.fleche)],
                    1: [FadeIn(fl.etiquette, scale=1.3)],
                    2: [FadeIn(tb.valeur(1, 1), scale=1.4), tb.allumer(1, 1)]})
        self.insister(L3[2], 1.15, 0.25)
        self.attendre_voix()

    # ── 03 : les packs : 6 × 1,5 = 9 L ; 240 ÷ 9 ≈ 26,7 packs ──────────────
    def ecran_packs(self):
        self.ecran("03-packs")
        pk = pack(1.0).move_to(P(-4.6, 1.75))
        prix = self.t("3 €", 40, AMBRE).next_to(pk, RIGHT, buff=0.4)
        tb = TableauProp(["Packs", "Eau (L)"], [[1, "≈ 26,7"], [9, 240]], montrer=False, largeur_case=1.7,
                         largeur_libelle=2.4, fs=36, centre=P(-3.4, -1.3))
        L1 = self.lc([("6 bouteilles", WHITE), ("de 1,5 L", EAU_C), ("→ 3 €", AMBRE)], 2.95, fs=38)
        self.jouer(L1, ["6 bouteilles", "de 1,5 litre", "3 euros"],
                   {0: [FadeIn(pk, shift=DOWN * 0.3)], 2: [FadeIn(prix, scale=1.3)]})
        L2 = self.lc([("1 pack :", WHITE), ("6 ×", WHITE), ("1,5 =", WHITE), ("9 L", VERT_OK)], 1.95, fs=40)
        sans(L2[0])  # « Un pack » : dit en lettres
        un = sans(tb.valeur(0, 0))
        self.jouer(L2, ["Un pack", "6 fois", "1,5, égale", "9 litres"],
                   {0: [FadeIn(tb.fond, shift=UP * 0.2), FadeIn(un, scale=1.4), Circumscribe(pk, color=EAU_C)],
                    3: [FadeIn(tb.valeur(1, 0), scale=1.4), tb.allumer(1, 0)]})
        fl = tb.fleche_lat("÷ 9", sens="haut", fs=32)
        L3 = self.lc([("240 ÷", WHITE), ("9 ≈", WHITE), ("26,7 packs", ORANGE_RETENUE)], 0.75, fs=42)
        L3[2].original_text = "26,7"  # « 26 virgule 7 » dure 1,3 s : n'attend pas « packs »
        self.jouer(L3, ["240 divisé", "par 9", "environ 26,7"],
                   {0: [tb.eteindre(1, 0), FadeIn(tb.valeur(1, 1), scale=1.4), tb.allumer(1, 1)],
                    1: [Create(fl.fleche), FadeIn(fl.etiquette, scale=1.3)],
                    2: [FadeIn(tb.valeur(0, 1), scale=1.4), tb.allumer(0, 1)]})
        self.insister(L3[2], 1.15, 0.25)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (26 / 27 / 26,7 packs) ──────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        pk = pack(1.5).move_to(P(-3.4, 0.4))
        env = sans(self.t("≈ 26,7 packs", 38, ORANGE_RETENUE).next_to(pk, DOWN, buff=0.45))

        def avant(sc):
            sc.play(FadeIn(pk, shift=DOWN * 0.3), FadeIn(env), run_time=0.4)

        def apres(sc):
            sc.play(FadeOut(pk), FadeOut(env), run_time=0.3)
            cases = VGroup(*[RoundedRectangle(width=0.5, height=0.5, corner_radius=0.06, fill_color=EAU_C,
                                              fill_opacity=1, stroke_color=WHITE, stroke_width=2)
                             for _ in range(27)]).arrange_in_grid(3, 9, buff=0.1).move_to(P(-3.4, 0.5))
            der = cases[26].set_fill(opacity=0)
            eau = Rectangle(width=0.5, height=0.5 * 2 / 3, fill_color=EAU_C, fill_opacity=0.55,
                            stroke_width=0).move_to(der).align_to(der, DOWN)
            sc.ph_q.scale(0.86, about_edge=UP)  # 4 lignes : la dernière touchait le bas (BORD)
            l0 = sc.ligne_rep(0, ["26 packs :", "pas assez."])
            l1 = sc.ligne_rep(1, ["Pas de morceau", "de pack."])
            l2 = sc.ligne_rep(2, ["On arrondit :", "27 packs."])
            l3 = sc.ligne_rep(3, ["27 × 3 € =", "81 €."])
            sc.montre("Avec 26", FadeIn(l0[0], shift=UP * 0.15),
                      LaggedStart(*[FadeIn(c, scale=0.6) for c in cases[:26]], lag_ratio=0.03), rt=0.7)
            sc.montre("il manquerait", FadeIn(l0[1], shift=UP * 0.15), Create(sc.barrer_choix(0)), rt=0.4)
            sc.montre("on n'achète", FadeIn(l1[0], shift=UP * 0.15), Create(sc.barrer_choix(2)), rt=0.4)
            sc.montre("de pack. On", FadeIn(l1[1], shift=UP * 0.15), rt=0.3)
            sc.montre("On arrondit", FadeIn(l2[0], shift=UP * 0.15), FadeIn(der), GrowFromEdge(eau, DOWN), rt=0.45)
            sc.montre("27 packs", FadeIn(l2[1], scale=1.3), Circumscribe(der, color=VERT_OK, buff=0.06), rt=0.45)
            sc.montre("27 fois", FadeIn(l3[0], shift=UP * 0.15), rt=0.35)
            sc.montre("81 euros", FadeIn(l3[1], scale=1.3), rt=0.35)
            sc.rep_fini()

        self.question_pause("04-question", "04b-reponse",
                            ["Il faut environ 26,7 packs.", "Combien Sofia doit-elle", "en acheter ?"],
                            [self.t("26 packs", 32), self.t("27 packs", 32), self._nombre_seul(self.t("26,7 packs", 32), "26,7")], 1,
                            ["26 packs : pas assez.", "Pas de morceau de pack.",
                             "On arrondit : 27 packs.", "27 × 3 € = 81 €."],
                            mot_q="Il faut", avant_q=avant, autres_r=apres)

    # ── 05 : les goûters : ÷ 4 puis × 160 = 96 € ────────────────────────────
    def ecran_gouter(self):
        self.ecran("05-gouter")
        br = VGroup(*[barre_cereales(0.75) for _ in range(4)]).arrange(DOWN, buff=0.12).move_to(P(-4.6, 2.1))
        tb = TableauProp(["Barres", "Prix (€)"], [[4, 1, 160], ["2,40", "0,60", 96]], montrer=False,
                         largeur_case=1.6, largeur_libelle=2.2, fs=34, centre=P(-2.8, -1.05))
        L1 = self.lc([("4 barres →", WHITE), ("2,40 €", AMBRE)], 2.95, fs=40)
        self.jouer(L1, ["4 barres", "2,40 euros"],
                   {0: [LaggedStart(*[FadeIn(b, shift=RIGHT * 0.3) for b in br], lag_ratio=0.15),
                        FadeIn(tb.fond), FadeIn(tb.valeur(0, 0), scale=1.4)],
                    1: [FadeIn(tb.valeur(1, 0), scale=1.4)]})
        h, b = tb.fleche_col(0, 1, "÷ 4", ligne=0), tb.fleche_col(0, 1, "÷ 4", ligne=1)
        L2a = self.lc([("1 barre :", WHITE)], 2.05, fs=40)
        self.jouer(L2a, ["1 barre"], {0: [FadeIn(tb.valeur(0, 1), scale=1.4), Create(h.fleche),
                                          Indicate(br[0], scale_factor=1.2)]})
        L2 = self.lc([("2,40 ÷", WHITE), ("4 =", WHITE), ("0,60 €", VERT_OK)], 1.3, fs=42)
        self.jouer(L2, ["2,40 divisé", "par 4", "0,60 euro"],
                   {0: [Create(b.fleche)], 1: [FadeIn(h.etiquette, scale=1.3), FadeIn(b.etiquette, scale=1.3)],
                    2: [FadeIn(tb.valeur(1, 1), scale=1.4), tb.allumer(1, 1)]})
        h2, b2 = tb.fleche_col(1, 2, "× 160", ligne=0), tb.fleche_col(1, 2, "× 160", ligne=1)
        L3 = self.lc([("160 barres :", WHITE)], 0.35, fs=40)
        self.jouer(L3, ["160 barres"], {0: [tb.eteindre(1, 1), FadeIn(tb.valeur(0, 2), scale=1.4),
                                            Create(h2.fleche)]})
        L4 = self.lc([("160 ×", WHITE), ("0,60 =", WHITE), ("96 €", VERT_OK)], -0.4, fs=42)
        self.jouer(L4, ["160 fois", "0,60, égale", "96 euros"],
                   {0: [Create(b2.fleche), FadeIn(h2.etiquette, scale=1.3), FadeIn(b2.etiquette, scale=1.3)],
                    2: [FadeIn(tb.valeur(1, 2), scale=1.4), tb.allumer(1, 2)]})
        self.insister(L4[2], 1.15, 0.25)
        self.attendre_voix()

    # ── 06 : piège : le bus, 150 € pour 30 ou 50 passagers ──────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        T = self.lc([("Attention au piège !", ROUGE_ERREUR)], 2.95, fs=44)
        self.jouer(T, ["Attention"])
        L1 = self.lc([("Tout n'est pas", WHITE)], 2.2, fs=40)
        L1b = self.lc([("proportionnel !", AMBRE)], 1.55, fs=40)
        self.jouer(L1, ["Tout n'est"])
        self.jouer(L1b, ["proportionnel. Le"])
        bs = bus(1.0).move_to(P(-3.3, 1.55))
        tb = TableauProp(["Passagers", "Prix (€)"], [[30, 50], [150, 150]], montrer=False, largeur_case=1.6,
                         largeur_libelle=2.6, fs=38, centre=P(-3.4, -1.0))
        L2 = self.lc([("Le bus :", WHITE), ("150 €", BUS_C)], 0.8, fs=40)
        self.jouer(L2, ["Le bus", "150 euros"], {0: [FadeIn(bs, shift=RIGHT * 1.2), FadeIn(tb.fond)]})
        L3 = self.lc([("30", WHITE), ("ou 50 passagers", WHITE)], 0.1, fs=38)
        v30, v50 = tb.valeur(0, 0), tb.valeur(0, 1)
        p1, p2 = sans(tb.valeur(1, 0)), sans(tb.valeur(1, 1))
        fl = sans(tb.fleche_col(0, 1, "même prix", ligne=1, couleur=AMBRE))
        self.jouer(L3, ["30 ou", "50 passagers"], {0: [FadeIn(v30, scale=1.4), FadeIn(p1, scale=1.4)],
                                                    1: [FadeIn(v50, scale=1.4), FadeIn(p2, scale=1.4)]})
        self.play(Create(fl.fleche), FadeIn(fl.etiquette, scale=1.2), tb.allumer(1, 0), tb.allumer(1, 1),
                  run_time=0.5)
        v = sans(self.tampon("Pas proportionnel", ROUGE_ERREUR, 32))
        self.col(v, -0.7, 1.3)
        self.play(FadeIn(v, scale=1.3), run_time=0.4)
        self.insister(v, 1.08, 0.25)
        L4 = self.lc([("Avant de calculer :", WHITE)], -1.55, fs=38, xl=0.9)
        self.jouer(L4, ["Avant de"])
        L5 = self.lc([("est-ce proportionnel ?", ORANGE_RETENUE)], -2.3, fs=40, xl=0.9, droite=5.2)
        cadre = SurroundingRectangle(L5, color=ORANGE_RETENUE, buff=0.15, corner_radius=0.1)
        self.jouer(L5, ["est-ce"])
        self.play(Create(cadre), run_time=0.4)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (le match : 100 → 200 spectateurs) ──────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        tr = terrain(4.2, 2.4).move_to(P(-3.4, 0.2))
        tribune = VGroup(*[Dot(radius=0.07, color=GREY_B).move_to(P(-5.3 + 0.3 * i, 1.75 + 0.22 * j))
                           for i in range(14) for j in range(2)])
        chrono = VGroup(Circle(radius=0.45, fill_color=WHITE, fill_opacity=1, stroke_color=GREY_B, stroke_width=4),
                        Line(ORIGIN, UP * 0.32, color=ROUGE_ERREUR, stroke_width=5)).move_to(P(-3.4, -1.75))
        deco = VGroup(tr, tribune, chrono)

        def avant(sc):
            sc.play(FadeIn(tr, scale=0.8), FadeIn(tribune), FadeIn(chrono), run_time=0.4)

        def apres(sc):
            tb = TableauProp(["Spectateurs", "Durée (min)"], [[100, 200], [20, 20]], montrer=False,
                             largeur_case=1.4, largeur_libelle=3.0, fs=34, centre=P(-3.5, 0.5))
            vals = sans(VGroup(*[tb.valeur(r, c) for r in range(2) for c in range(2)]))
            fl = sans(tb.fleche_col(0, 1, "même durée", ligne=1, couleur=AMBRE))
            l0 = sc.ligne_rep(0, ["La durée", "ne dépend pas"])
            l1 = sc.ligne_rep(1, ["des spectateurs :"])
            l2 = sc.ligne_rep(2, ["pas proportionnel."])
            sc.montre("La durée", FadeOut(deco), FadeIn(tb.fond), FadeIn(vals), FadeIn(l0[0], shift=UP * 0.15),
                      rt=0.4)
            sc.montre("ne dépend", FadeIn(l0[1], shift=UP * 0.15), Create(fl.fleche), FadeIn(fl.etiquette), rt=0.4)
            sc.montre("de spectateurs", FadeIn(l1[0], shift=UP * 0.15), tb.allumer(1, 0), tb.allumer(1, 1), rt=0.3)
            sc.montre("pas proportionnel", FadeIn(l2[0], scale=1.2), Create(sc.barrer_choix(0)), rt=0.4)
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse",
                            ["Un match : 20 min,", "100 spectateurs.", "Et devant 200 ?"],
                            [self.t("40 minutes", 32), self.t("10 minutes", 32), self.t("Toujours 20 minutes", 32)],
                            2, ["La durée ne dépend pas", "des spectateurs :", "pas proportionnel."],
                            mot_q="Un match", avant_q=avant, autres_r=apres)

    # ── 08 : le budget : 81 + 96 + 150 = 327 € ──────────────────────────────
    def ecran_total(self):
        self.ecran("08-total")
        tk = RoundedRectangle(width=4.4, height=3.0, corner_radius=0.15, fill_color=WHITE, fill_opacity=1,
                              stroke_width=0).move_to(P(-3.4, 1.4))
        tit = sans(Text("Budget du tournoi", font_size=30, color=NUIT, weight=BOLD)).move_to(tk.get_top() + DOWN * 0.35)
        rangs = []
        for k, (lab, val, c) in enumerate([("Eau", "81 €", EAU_C), ("Goûters", "96 €", GOUTER_C),
                                           ("Bus", "150 €", BUS_C), ("Total", "327 €", "#15803d")]):
            y = tk.get_top()[1] - 0.95 - 0.52 * k - (0.12 if k == 3 else 0)
            a = Text(lab, font_size=30, color=c if k < 3 else "#15803d", weight=BOLD).move_to(P(0, y)).align_to(
                tk.get_left() + RIGHT * 0.35, LEFT)
            b = Text(val, font_size=30, color=NUIT, weight=BOLD).move_to(P(0, y)).align_to(
                tk.get_right() + LEFT * 0.35, RIGHT)
            rangs.append(sans(VGroup(a, b)))
        trait = Line(tk.get_left() + RIGHT * 0.3, tk.get_right() + LEFT * 0.3, color=NUIT, stroke_width=3).set_y(
            rangs[3].get_y() + 0.3)
        u = 5.6 / 327
        blocs = VGroup()
        for e, c in ((81, EAU_C), (96, GOUTER_C), (150, BUS_C)):
            r = Rectangle(width=e * u, height=0.6, fill_color=c, fill_opacity=1, stroke_color=BLACK, stroke_width=3)
            blocs.add(VGroup(r, sans(Text(f"{e} €", font_size=26, color=BLACK, weight=BOLD)).move_to(r)))
        blocs.arrange(RIGHT, buff=0).move_to(P(-3.4, -1.15))
        self.montre("On rassemble", FadeIn(tk, shift=UP * 0.2), FadeIn(tit), rt=0.45)
        for k, mot in enumerate(["81 euros", "96 euros", "150 euros"]):
            self.montre(mot, FadeIn(rangs[k], shift=RIGHT * 0.15), GrowFromEdge(blocs[k], LEFT), rt=0.4)
        L1 = self.lc([("81 +", WHITE), ("96 +", WHITE), ("150 =", WHITE), ("327 €", VERT_OK)], 2.3, fs=42)
        br = Brace(blocs, DOWN, color=VERT_OK)
        tot = sans(self.t("327 €", 34, VERT_OK)).next_to(br, DOWN, buff=0.12)
        self.jouer(L1, ["81 plus", "96 plus", "150, égale", "327 euros"],
                   {3: [Create(trait), FadeIn(rangs[3], shift=RIGHT * 0.15), GrowFromCenter(br), FadeIn(tot)]})
        self.insister(L1[3], 1.15, 0.25)
        so = sofia(0.75).move_to(P(2.2, -0.9))
        v = sans(self.tampon("Budget prêt !", VERT_OK, 34))
        self.col(v, 0.9, 1.3)
        self.montre("Sofia peut", FadeIn(so, shift=UP * 0.3), rt=0.4)
        self.montre("son budget", FadeIn(v, scale=1.3), Indicate(tk, scale_factor=1.04), rt=0.45)
        self.attendre_voix()

    # ── 09 : défi : 20 équipes de 10 joueurs ────────────────────────────────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        self.montre("À toi de jouer", Write(tit), rt=0.6)
        g = grille_joueurs(20, P(-3.4, 1.15), dx=0.25, dy=0.17, r=0.055)
        tb = self.table_eau(centre=P(-3.6, -1.55), vals=[[1, "?"], ["1,5", "?"]])
        L0 = self.lc([("L'an prochain :", AMBRE)], 2.1, fs=38)
        self.jouer(L0, ["L'an prochain"])
        L1 = self.lc([("20 équipes", WHITE), ("de 10 joueurs", WHITE)], 1.3, fs=38)
        self.jouer(L1, ["20 équipes", "de 10 joueurs"],
                   {0: [LaggedStart(*[FadeIn(c[0], scale=2) for c in g.colonnes], lag_ratio=0.04)],
                    1: [LaggedStart(*[FadeIn(VGroup(*c[1:])) for c in g.colonnes], lag_ratio=0.04)]})
        L2 = self.lc([("1,5 L", EAU_C), ("par joueur", WHITE)], 0.5, fs=38)
        un = sans(tb.valeur(0, 0))
        self.jouer(L2, ["toujours 1,5", "par joueur"],
                   {0: [FadeIn(tb.fond), FadeIn(un), FadeIn(tb.valeur(1, 0), scale=1.4)],
                    1: [FadeIn(tb.trou(0, 1), scale=1.3), FadeIn(tb.trou(1, 1), scale=1.3)]})
        L3 = self.lc([("Combien de litres d'eau ?", ORANGE_RETENUE)], -0.35, fs=36)
        self.jouer(L3, ["Combien"])
        self.pause_defi(y=-1.3)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        g = grille_joueurs(20, P(-3.4, 1.15), dx=0.25, dy=0.17, r=0.055)
        tb = self.table_eau(centre=P(-3.6, -1.55), vals=[[1, 200], ["1,5", 300]])
        self.add(g, tb.fond, sans(tb.valeur(0, 0)), sans(tb.valeur(1, 0)), tb.trou(0, 1), tb.trou(1, 1))
        self.play(Write(tit), run_time=0.5)
        L1 = self.lc([("20 ×", WHITE), ("10 =", WHITE), ("200 joueurs", VERT_OK)], 1.9, fs=42)
        self.jouer(L1, ["20 fois", "10, égale", "200 joueurs"],
                   {2: [tb.remplir(0, 1, 200), Circumscribe(g, color=VERT_OK, buff=0.08)]})
        fl = tb.fleche_lat("× 1,5", fs=32)
        L2 = self.lc([("200 ×", WHITE), ("1,5 =", WHITE), ("300 L d'eau", VERT_OK)], 0.8, fs=42)
        self.jouer(L2, ["200 fois", "1,5, égale", "300 litres"],
                   {0: [Create(fl.fleche)], 1: [FadeIn(fl.etiquette, scale=1.3)],
                    2: [tb.remplir(1, 1, 300), tb.allumer(1, 1)]})
        self.insister(L2[2], 1.12, 0.25)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        tb = self.table_eau(centre=ORIGIN)
        vals = sans(VGroup(*[tb.valeur(r, c) for r in range(2) for c in range(2)]))
        fl = sans(tb.fleche_lat("× 1,5", fs=32))
        fig = VGroup(tb.fond, vals, fl)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("On repère les grandeurs.",),
            ("On vérifie : proportionnelles ?",),
            ("On calcule étape par étape,", "l'unité à chaque ligne."),
            ("Le résultat a du sens :", "on n'achète pas 0,7 pack !")], fs=36)
        self.au_mot("on repère")
        self.montrer_ligne(lignes[0], Indicate(tb.libelles[0], color=AMBRE), Indicate(tb.libelles[1], color=AMBRE))
        self.au_mot("on vérifie")
        self.montrer_ligne(lignes[1])
        self.au_mot("puis on calcule")
        self.montrer_ligne(lignes[2], Indicate(fl, color=FLECHE_K))
        self.au_mot("Et on regarde")
        self.montrer_ligne(lignes[3])
        lignes[3][1][1].set_color(ROUGE_ERREUR)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_eau()
        self.ecran_packs()
        self.ecran_question1()
        self.ecran_gouter()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_total()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class PropProbleme4e(PropProblemeBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"
