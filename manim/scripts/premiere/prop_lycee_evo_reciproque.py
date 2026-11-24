# prop_lycee_evo_reciproque.py
# EleveAI — Maths 1re, STMG et 2de (automatismes, SANS calculatrice) — série
# « Évolutions en pourcentage », LYCÉE, épisode 13 : L'ÉVOLUTION RÉCIPROQUE
# (micro du coach : auto_evo_reciproque ; en 2de : info_evolution_reciproque).
# Paysage, CEINTURE BLEUE (le short jumeau : prop_lycee_evo_reciproque_short.py).
# Trois sous-classes : PropLyceeEvoReciproquePremiere (« Maths 1re — EleveAI »),
# PropLyceeEvoReciproqueStmg (« Maths STMG ») et PropLyceeEvoReciproqueSeconde
# (« Maths 2de ») ; seule l'identité change, et elle ne paraît QUE sur la garde :
# on rend la 1re en entier, les gardes STMG et 2de seules (GARDE_SEULE=1), puis
# on colle (frac_cm_commun.py coller).
# ⭐ Méthode : après × c, on revient par × (1 ÷ c). Après − 20 % (× 0,8), il
# faut × 1,25 = + 25 %, jamais + 20 % (2,4 × 1,2 = 2,88 ≠ 3).
# ⭐ Le dessin : la BARRE de la valeur (bleu), le bout ajouté (vert), le morceau
# retiré (rouge) ; le trait pointillé du départ ; les flèches « × c » aller et
# retour entre deux boîtes.
# Décor : le Livret A (3 % → 2,4 % au 1er février 2025), une kinésithérapeute,
# un commerçant ; centres d'intérêt : argent-budget, corps-sante.
# Source : Banque de France (taux du Livret A).
#
# Écrans : 00 garde · 01 situation · 02 question du jour · 03 test (2,88) ·
# 04 coefficient réciproque (1 ÷ 0,8 = 1,25) · 05 la règle · 06 QUESTION 1 (C) ·
# 07 le piège · 08 QUESTION 2 (A) · 09 défi · 09b correction · 10 ce que tu as
# appris · 11 fin commune.
#
# Voix : manim/voix/lycee-evo-reciproque.json (go de Frédéric le 23/11, débit
# −10) ; WAV : public/sons/lycee-evo-reciproque/ ; marques :
# manim/scripts/premiere/prop_lycee_evo_reciproque_marques.json.
# Outils (non modifiés, importés) : la base PropPourcentageCoefficientBase de
# l'épisode 4e 35 (prop_pourcentage_coefficient.py), prop_commun.py,
# fin_commune.py. Ajouté ICI : segments(), boite(), fleche(), retour(),
# livret(), kine(), boutique(), maison(), courbe_action().
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/premiere/prop_lycee_evo_reciproque.py PropLyceeEvoReciproquePremiere
# Brouillon : PYTHONIOENCODING=utf-8 python -m manim render -ql --disable_caching manim/scripts/premiere/prop_lycee_evo_reciproque.py PropLyceeEvoReciproquePremiere -o eleveai-maths-premiere-evo-reciproque --media_dir manim/scripts/premiere/media-prop-lycee-evo-reciproque
# Gardes seules : GARDE_SEULE=1 … PropLyceeEvoReciproqueStmg / PropLyceeEvoReciproqueSeconde

import os
import sys
from pathlib import Path
import importlib.util

_ICI = Path(__file__).resolve().parent


def _charger(nom, chemin):
    spec = importlib.util.spec_from_file_location(nom, chemin)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_p35 = _charger("prop_pourcentage_coefficient_4e", _ICI.parents[0] / "4e" / "prop_pourcentage_coefficient.py")
from prop_ratio_ecrire import *  # noqa: E402,F403  (prop_commun, couleurs, personne, P…)

sys.path.insert(0, str(_ICI))  # le dossier du script EN TÊTE

from fin_commune import ecran_fin  # noqa: E402

PropPourcentageCoefficientBase = _p35.PropPourcentageCoefficientBase
gras, sans = _p35.gras, _p35.sans

DEP = "#60a5fa"        # la valeur (bleu)
HAUSSE = "#22c55e"     # le bout ajouté (vert)
BAISSE = "#ef4444"     # le morceau retiré (rouge)
FOND_B = "#0f172a"
TENUE_K = "#0891b2"    # la tunique de la kinésithérapeute


def segments(couleurs, lm=0.44, h=0.6, gauche=0.0, y=0.0):
    """Une barre en morceaux égaux, posés de gauche à droite (une couleur par morceau)."""
    g = VGroup(*[Rectangle(width=lm, height=h, fill_color=c, fill_opacity=1, stroke_color=FOND_B, stroke_width=2.5)
                 for c in couleurs]).arrange(RIGHT, buff=0)
    return g.move_to(P(0, y)).align_to(P(gauche, 0), LEFT)


def boite(nb, couleur=DEP, fs=40, l=1.8, h=0.9):
    """Une boîte arrondie et son nombre ; .cadre, .nb."""
    cadre = RoundedRectangle(width=l, height=h, corner_radius=0.16, fill_color=couleur, fill_opacity=0.18,
                             stroke_color=couleur, stroke_width=4)
    t = gras(nb, fs, WHITE)
    if t.width > l - 0.25:
        t.scale_to_fit_width(l - 0.25)
    g = VGroup(cadre, t.move_to(cadre))
    g.cadre, g.nb = cadre, t
    return g


def fleche(a, b, txt, couleur=AMBRE, fs=34):
    """La flèche « aller » de la boîte a à la boîte b, son coefficient dessus."""
    f = Arrow(a.get_right() + RIGHT * 0.1, b.get_left() + LEFT * 0.1, buff=0, color=couleur, stroke_width=6,
              max_tip_length_to_length_ratio=0.15)
    t = gras(txt, fs, couleur).next_to(f, UP, buff=0.12)
    return f, t


def retour(a, b, txt, couleur=HAUSSE, fs=34, angle=-1.6):
    """La flèche « retour » de b vers a, en arc par-dessous, son texte dessous."""
    f = CurvedArrow(b.get_bottom() + DOWN * 0.08, a.get_bottom() + DOWN * 0.08, angle=angle, color=couleur,
                    stroke_width=6, tip_length=0.25)
    t = gras(txt, fs, couleur).next_to(f, DOWN, buff=0.12)
    return f, t


def livret(s=1.0):
    """Un livret d'épargne : couverture bleue, bande dorée, « Livret A »."""
    c = RoundedRectangle(width=1.3, height=1.7, corner_radius=0.1, fill_color="#1e40af", fill_opacity=1,
                         stroke_color=WHITE, stroke_width=2)
    b = Rectangle(width=1.3, height=0.22, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_width=0).move_to(c).shift(UP * 0.35)
    t = sans(Text("Livret A", font_size=24, color=WHITE, weight=BOLD))
    t.scale_to_fit_width(1.05).move_to(c).shift(DOWN * 0.25)
    return VGroup(c, b, t).scale(s)


def kine(s=1.0):
    """La kinésithérapeute : tunique bleu-vert, un élastique de rééducation."""
    p = personne(peau="#c68642", tenue=TENUE_K, cheveux="#3f2a14", longs=True)
    c = p.corps.get_center()
    el = ArcBetweenPoints(c + P(-0.55, -0.3), c + P(0.55, -0.3), angle=-1.2, color="#f97316", stroke_width=7)
    p.add(el)
    return p.scale(s)


def boutique(s=1.0):
    """Une vitrine de magasin et son affiche « SOLDES »."""
    mur = Rectangle(width=1.9, height=1.4, fill_color="#334155", fill_opacity=1, stroke_width=0)
    toit = Polygon(P(-1.1, 0.7), P(1.1, 0.7), P(0.95, 1.05), P(-0.95, 1.05), fill_color="#dc2626", fill_opacity=1,
                   stroke_width=0)
    vit = Rectangle(width=1.1, height=0.8, fill_color="#93c5fd", fill_opacity=0.6, stroke_width=0).shift(P(-0.3, -0.2))
    porte = Rectangle(width=0.4, height=0.9, fill_color="#78350f", fill_opacity=1, stroke_width=0).shift(P(0.6, -0.25))
    aff = sans(Text("SOLDES", font_size=18, color=WHITE, weight=BOLD)).move_to(vit)
    return VGroup(mur, toit, vit, porte, aff).scale(s)


def maison(s=1.0):
    """Un immeuble (le loyer) : façade et fenêtres."""
    f = Rectangle(width=1.4, height=1.6, fill_color="#a16207", fill_opacity=1, stroke_width=0)
    toit = Polygon(P(-0.85, 0.8), P(0.85, 0.8), P(0, 1.45), fill_color="#7c2d12", fill_opacity=1, stroke_width=0)
    fen = VGroup(*[Square(0.3, fill_color="#fde68a", fill_opacity=1, stroke_width=0).move_to(P(x, y))
                   for x in (-0.35, 0.35) for y in (0.35, -0.2)])
    porte = Rectangle(width=0.35, height=0.5, fill_color="#3f2a14", fill_opacity=1, stroke_width=0).move_to(P(0, -0.55))
    return VGroup(f, toit, fen, porte).scale(s)


def courbe_action(points, couleur, l=2.6, h=1.4):
    """Le cours d'une action : un petit cadre de graphique et sa ligne brisée."""
    cadre = RoundedRectangle(width=l, height=h, corner_radius=0.1, fill_color=FOND_B, fill_opacity=1,
                             stroke_color=GREY_B, stroke_width=2)
    pts = [cadre.get_corner(DL) + P(0.15 + (l - 0.3) * x, 0.15 + (h - 0.3) * y) for x, y in points]
    ligne = VMobject(color=couleur, stroke_width=6).set_points_as_corners(pts)
    return VGroup(cadre, ligne)


class PropLyceeEvoReciproqueBase(PropPourcentageCoefficientBase):
    nom_voix = "lycee-evo-reciproque"
    fichier_marques = "prop_lycee_evo_reciproque_marques.json"
    identite = "Maths 1re — EleveAI"
    ceinture = "bleue"
    X0, U = -5.6, 1.9   # la règle des barres : x du zéro, longueur d'une unité

    @staticmethod
    def cadre(m, couleur=VERT_OK):
        """HD du 23/11 : à buff 0,08 (cadre du 4e), le « = » et le « % » touchaient le trait."""
        return SurroundingRectangle(m, color=couleur, buff=0.14, corner_radius=0.1, stroke_width=4)

    def source(self, lignes):
        """La source, discrète, en bas à gauche (lue, jamais dite)."""
        s = VGroup(*[Text(x, font_size=16, color=GREY_B) for x in lignes]).arrange(DOWN, aligned_edge=LEFT, buff=0.06)
        for x in s:
            x._bloc = True
        s._bloc = True
        return sans(s).to_corner(DL, buff=0.45)

    # la phrase de réponse des questions-pauses en 34, à GAUCHE sous la figure (formes, 03/11)
    Y_PH = -1.35

    def _disposer_q(self, question, choix, phrase):
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        ph2 = VGroup(*[self.t(x, 34, VERT_OK) for x in phrase]).arrange(DOWN, aligned_edge=LEFT, buff=0.16)
        if ph2.width > 6.6:
            ph2.scale_to_fit_width(6.6)
        ph2.align_to(P(-6.15, 0), LEFT).align_to(P(0, self.Y_PH), UP)
        self.ph_q = ph2
        return tete, q, cartes, pause, rebours, ph2

    def lc(self, morceaux, y, fs=40, xl=1.3, droite=6.2):
        """La ligne de la colonne de droite, morceaux un peu plus espacés (comme
        les épisodes 07-09 : au brouillon, « De nouveau50 € » et « 50× » se touchaient)."""
        lg = self.col(self.ligne(morceaux, fs, buff=0.32), y, xl)
        if lg.get_right()[0] > droite:
            lg.scale_to_fit_width(droite - xl).align_to(P(xl, 0), LEFT)
        return lg

    def ligne_rep(self, i, morceaux, fs=34):
        ref = self.ph_q[i]
        lg = self.ligne([(m, VERT_OK) for m in morceaux], fs, buff=0.22)
        return lg.move_to(ref).align_to(ref, LEFT)

    def barre_val(self, v, y, couleur=DEP, h=0.8, txt=None):
        """La barre d'une valeur v (longueur v × U depuis X0), son nombre dedans."""
        r = Rectangle(width=v * self.U, height=h, fill_color=couleur, fill_opacity=1, stroke_color=WHITE,
                      stroke_width=2).move_to(P(0, y)).align_to(P(self.X0, 0), LEFT)
        t = gras(txt or "", 32, FOND_B).move_to(r)
        return r, t

    def trait_depart(self, y, h=2.0):
        """Le trait pointillé de la valeur de départ (3) et son nombre au-dessus."""
        x = self.X0 + 3 * self.U
        tr = DashedLine(P(x, y - h / 2), P(x, y + h / 2), color=JAUNE_TITRE, stroke_width=4)
        t = gras("3", 34, JAUNE_TITRE).next_to(tr, UP, buff=0.1)
        return tr, t

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("L'évolution réciproque", self.identite, self.ceinture, y_ech=-2.45)
        sans(ident)
        sans(ech)
        self.au_mot("L'évolution")
        b = segments([DEP] * 10, lm=0.36, h=0.7, gauche=-5.9, y=0.1)
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(b, shift=UP * 0.2), run_time=0.8)
        L = self.lc([("− 20 %", BAISSE), ("puis", WHITE), ("+ ? %", HAUSSE), ("= retour ?", VERT_OK)], 0.1, fs=42,
                    xl=-1.6, droite=5.0)
        self.jouer(L, ["baisse de 20", None, "quelle hausse", "revenir"],
                   {0: [b[8].animate.set_fill(BAISSE, 1), b[9].animate.set_fill(BAISSE, 1)],
                    2: [b[8].animate.set_fill(HAUSSE, 1), b[9].animate.set_fill(HAUSSE, 1)]})
        self.play(Circumscribe(L[2], color=AMBRE, buff=0.1), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : le Livret A, 3 % → 2,4 % ; la kiné, le commerçant ──────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        Y = 1.75
        lv = livret(0.8).move_to(P(-5.6, Y))
        A = boite("3 %", DEP).move_to(P(-3.3, Y))
        B = boite("2,4 %", BAISSE).move_to(P(0.9, Y))
        f1, t1 = fleche(A, B, "− 20 %", BAISSE)
        self.montre("Le Livret A", FadeIn(lv, shift=RIGHT * 0.2), rt=0.4)
        self.montre("de 3 %", FadeIn(A, scale=1.2), rt=0.35)
        self.montre("à 2,4", FadeIn(B, scale=1.2), rt=0.35)
        self.montre("moins 20", GrowArrow(f1), FadeIn(t1, scale=1.3), rt=0.4)
        r, tr = retour(A, B, "+ 20 % ?", HAUSSE, angle=-1.3)
        self.montre("Pour retrouver", Create(r), rt=0.5)
        self.montre("retrouver 3", Indicate(A, color=AMBRE, scale_factor=1.1), rt=0.4)
        self.montre("hausse de 20", FadeIn(tr, scale=1.3), rt=0.4)
        self.insister(tr, 1.2, 0.2)
        Yv = -1.55
        k = kine(0.7).move_to(P(-5.5, Yv))
        lk = self.t("kinésithérapeute", 28, "#67e8f9").move_to(P(0, Yv + 0.35)).align_to(P(-4.75, 0), LEFT)
        fk = self.ligne([("− 20 %", BAISSE), ("de force", BAISSE)], 28, buff=0.14)
        fk.move_to(P(0, Yv - 0.3)).align_to(P(-4.75, 0), LEFT)
        self.montre("kinésithérapeute", FadeIn(k, shift=UP * 0.2), FadeIn(lk), rt=0.45)
        self.jouer(fk, ["perdu 20", "sa force"])
        bq = boutique(0.65).move_to(P(0.9, Yv))
        lb = self.t("commerçant", 28, AMBRE).move_to(P(0, Yv + 0.35)).align_to(P(1.75, 0), LEFT)
        pb = self.t("prix d'avant les soldes", 28, WHITE).move_to(P(0, Yv - 0.3)).align_to(P(1.75, 0), LEFT)
        self.montre("commerçant", FadeIn(bq, shift=UP * 0.2), FadeIn(lb), rt=0.45)
        self.montre("prix d'avant", FadeIn(pb, shift=RIGHT * 0.15), rt=0.35)
        src = self.source(["Source : Banque de France — taux du Livret A : 3 % jusqu'au 31 janvier 2025,",
                           "2,4 % à partir du 1er février 2025."])
        self.play(FadeIn(src), run_time=0.4)
        self.attendre_voix()

    # ── 02 : la question du jour : 2,4 + 20 % = 3 ? ─────────────────────────
    def ecran_question_jour(self):
        self.ecran("02-question-du-jour")
        Y = 1.2
        r, t = self.barre_val(2.4, Y, txt="2,4")
        x24 = self.X0 + 2.4 * self.U
        cible = DashedVMobject(Rectangle(width=0.6 * self.U, height=0.8, stroke_color=HAUSSE, stroke_width=4)
                               .move_to(P(x24 + 0.3 * self.U, Y)), num_dashes=24)
        qm = gras("?", 40, HAUSSE).move_to(cible)
        tr, t3 = self.trait_depart(Y)
        L = self.lc([("2,4", DEP), ("+ 20 %", HAUSSE), ("= 3 ?", JAUNE_TITRE)], -0.9, fs=60, xl=-4.6, droite=4.8)
        self.jouer(L, ["2,4 plus", "plus 20", "fait-il 3"],
                   {0: [GrowFromEdge(r, LEFT), FadeIn(t)], 1: [Create(cible), FadeIn(qm, scale=1.3)],
                    2: [Create(tr), FadeIn(t3, scale=1.3)]})
        self.play(Circumscribe(L, color=AMBRE, buff=0.15), run_time=0.8)
        self.attendre_voix()

    # ── 03 : le test : 2,4 × 1,2 = 2,88 ≠ 3 ─────────────────────────────────
    def ecran_test(self):
        self.ecran("03-test")
        self.titre_haut("Testons", "Testons")
        Y = 1.45
        r, t = self.barre_val(2.4, Y, txt="2,4")
        tr, t3 = self.trait_depart(Y, h=1.6)
        sans(VGroup(t, t3))
        self.play(FadeIn(r), FadeIn(t), Create(tr), FadeIn(t3), run_time=0.4)
        x24, x288 = self.X0 + 2.4 * self.U, self.X0 + 2.88 * self.U
        bout = Rectangle(width=0.48 * self.U, height=0.8, fill_color=HAUSSE, fill_opacity=1, stroke_color=WHITE,
                         stroke_width=2).move_to(P((x24 + x288) / 2, Y))
        trou = Rectangle(width=0.12 * self.U, height=0.8, fill_color=BAISSE, fill_opacity=0.85, stroke_width=0)
        trou.move_to(P(x288 + 0.06 * self.U, Y))
        L1 = self.lc([("2,4 × 1,2", WHITE), ("= 2,88", HAUSSE), ("≠ 3", BAISSE)], -0.35, fs=50, xl=-5.6, droite=4.8)
        self.jouer(L1, ["2,4 fois", "égale 2,88", "Pas 3"],
                   {1: [GrowFromEdge(bout, LEFT)], 2: [FadeIn(trou), Indicate(tr, color=BAISSE)]})
        self.insister(L1[2], 1.3, 0.2)
        L2 = self.lc([("+ 20 %", HAUSSE), ("ne suffit pas !", BAISSE)], -1.25, fs=42, xl=-5.6)
        self.jouer(L2, ["Plus 20", "ne suffit"])
        L3 = self.lc([("la hausse porte sur 2,4 :", WHITE), ("plus petite", AMBRE)], -2.1, fs=38, xl=-5.6, droite=5.0)
        self.jouer(L3, ["la hausse porte", "plus petite"], {1: [Indicate(r, color=AMBRE, scale_factor=1.04)]})
        self.attendre_voix()

    # ── 04 : le coefficient réciproque : × 0,8 aller, × 1,25 retour ────────
    def ecran_coefficient(self):
        self.ecran("04-coefficient")
        self.titre_haut("Le coefficient réciproque", "le coefficient", fs=42)
        Y = 1.55
        A = sans(boite("3 %", DEP)).move_to(P(-4.7, Y))
        B = sans(boite("2,4 %", BAISSE)).move_to(P(-0.9, Y))
        self.play(FadeIn(A), FadeIn(B), run_time=0.4)
        f1, t1 = fleche(A, B, "× 0,8", AMBRE)
        self.montre("défaire fois", GrowArrow(f1), rt=0.35)
        self.montre("fois 0,8", FadeIn(t1, scale=1.3), rt=0.35)
        r, tr = retour(A, B, "× 1,25", HAUSSE, angle=-1.5)
        xl = 1.2
        L1 = self.lc([("÷ 0,8", HAUSSE), ("= × (1 ÷ 0,8)", HAUSSE)], 2.0, fs=40, xl=xl)
        self.jouer(L1, ["on divise", "multiplier par 1"], {0: [Create(r)]})
        L2 = self.lc([("1 ÷ 0,8", WHITE), ("= 1,25", AMBRE)], 1.1, fs=44, xl=xl)
        self.jouer(L2, ["1 divisé", "égale 1,25"], {1: [FadeIn(tr, scale=1.3)]})
        self.insister(tr, 1.25, 0.2)
        L3 = self.lc([("soit", WHITE), ("+ 25 %", VERT_OK)], 0.2, fs=46, xl=xl)
        self.jouer(L3, ["Plus 25", None])
        self.play(Create(self.cadre(L3[1])), run_time=0.3)
        L4 = self.lc([("Vérification :", GREY_B), ("2,4 × 1,25", WHITE), ("= 3", VERT_OK)], -1.6, fs=44, xl=-5.6,
                     droite=4.6)
        ok = self.coche(VERT_OK, 0.3).next_to(L4, RIGHT, buff=0.3)
        self.jouer(L4, ["Vérification", "2,4 fois", "égale 3"], {2: [Create(ok), Indicate(A, color=VERT_OK)]})
        self.attendre_voix()

    # ── 05 : la règle : × c, puis × (1 ÷ c) ─────────────────────────────────
    def ecran_regle(self):
        self.ecran("05-regle")
        self.titre_haut("La règle", "La règle")
        Y = 1.5
        A = sans(boite("départ", DEP, fs=32, l=2.0)).move_to(P(-3.6, Y))
        B = sans(boite("arrivée", AMBRE, fs=32, l=2.0)).move_to(P(1.6, Y))
        self.play(FadeIn(A), FadeIn(B), run_time=0.4)
        f1, t1 = fleche(A, B, "× c", AMBRE, fs=40)
        r, tr = retour(A, B, "× (1 ÷ c)", HAUSSE, fs=40, angle=-1.2)
        L1 = self.lc([("évolution :", WHITE), ("× c", AMBRE)], -1.25, fs=44, xl=-4.6)
        self.jouer(L1, ["si une évolution", "coefficient c"], {1: [GrowArrow(f1), FadeIn(t1, scale=1.3)]})
        L2 = self.lc([("réciproque :", HAUSSE), ("× (1 ÷ c)", HAUSSE)], -2.15, fs=44, xl=-4.6)
        self.jouer(L2, ["l'évolution réciproque", "1 divisé"], {0: [Create(r)], 1: [FadeIn(tr, scale=1.3)]})
        self.play(Create(SurroundingRectangle(VGroup(L1, L2), color=VERT_OK, buff=0.2, corner_radius=0.12,
                                              stroke_width=4)), run_time=0.4)
        self.insister(tr, 1.15, 0.2)
        self.attendre_voix()

    # ── 06 : QUESTION 1 (− 50 % → + 100 %, réponse C) ───────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        b = segments([DEP] * 5 + [BAISSE] * 5, lm=0.42, h=0.65, gauche=-6.0, y=1.75)

        def avant(sc):
            sc.play(FadeIn(b, shift=UP * 0.2), run_time=0.4)

        def apres(sc):
            b2 = segments([DEP] * 5 + [HAUSSE] * 5, lm=0.42, h=0.65, gauche=-6.0, y=0.6)
            l0 = sc.ligne_rep(0, ["1 ÷ 0,5 =", "2 :", "+ 100 %."])
            l1 = sc.ligne_rep(1, ["A :", "les trois quarts du prix."])
            l2 = sc.ligne_rep(2, ["B :", "× 2,5."])
            sc.montre("1 divisé", FadeIn(l0[0], shift=UP * 0.15), rt=0.35)
            sc.montre("égale 2", FadeIn(l0[1], scale=1.3), rt=0.3)
            sc.montre("doubler", FadeIn(b2[:5], shift=DOWN * 0.2), rt=0.3)
            sc.montre("plus 100", FadeIn(l0[2], scale=1.3), GrowFromEdge(b2[5:], LEFT), rt=0.45)
            sc.montre("A ne", FadeIn(l1[0], shift=UP * 0.15), Create(sc.barrer_choix(0)), rt=0.35)
            sc.montre("trois quarts", FadeIn(l1[1], shift=UP * 0.15), rt=0.35)
            sc.montre("et B", FadeIn(l2[0], shift=UP * 0.15), Create(sc.barrer_choix(1)), rt=0.35)
            sc.montre("2,5", FadeIn(l2[1], scale=1.3), rt=0.35)
            sc.rep_fini()

        self.question_pause("06-question", "06b-reponse",
                            ["Un prix baisse de 50 %.", "Pour revenir au départ,", "il faut :"],
                            [self.t("+ 50 %", 36), self.t("+ 150 %", 36), self.t("+ 100 %", 36)], 2,
                            ["1 ÷ 0,5 = 2 : + 100 %.", "A : les trois quarts du prix.", "B : × 2,5."],
                            mot_q="Un prix", avant_q=avant, autres_r=apres)

    # ── 07 : le piège : même taux, pas de compensation ─────────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        self.titre_haut("Attention au piège !", "Attention", couleur=ROUGE_ERREUR, fs=44)
        L1 = self.lc([("Hausse et baisse de même taux :", WHITE)], 2.15, fs=38, xl=-5.8)
        self.jouer(L1, ["Une hausse"])
        L1b = self.lc([("elles ne se compensent pas !", BAISSE)], 1.45, fs=42, xl=-5.8)
        self.jouer(L1b, ["ne se compensent"])
        self.insister(L1b, 1.1, 0.2)

        def fl(y_haut, longueur, vers_bas, couleur, x):
            a, z = (P(x, y_haut), P(x, y_haut - longueur)) if vers_bas else (P(x, y_haut - longueur), P(x, y_haut))
            return Arrow(a, z, buff=0, color=couleur, stroke_width=8, max_tip_length_to_length_ratio=0.3)

        Y1, Y2 = 0.35, -1.55
        a1 = self.lc([("Après une baisse :", WHITE)], Y1, fs=36, xl=-5.8)
        d1 = fl(Y1 + 0.5, 0.8, True, BAISSE, -0.95)
        u1 = fl(Y1 + 0.5, 1.0, False, HAUSSE, -0.35)
        h1 = self.lc([("hausse", HAUSSE), ("plus grande", HAUSSE)], Y1 + 0.2, fs=38, xl=0.25)
        e1 = sans(self.t("(− 20 % puis + 25 %)", 28, GREY_B)).next_to(h1, DOWN, buff=0.12).align_to(h1, LEFT)
        self.jouer(a1, ["Après une baisse"], {0: [GrowArrow(d1)]})
        self.jouer(h1, ["la hausse pour", "toujours plus grande"], {0: [GrowArrow(u1)], 1: [FadeIn(e1)]})
        a2 = self.lc([("Après une hausse :", WHITE)], Y2, fs=36, xl=-5.8)
        u2 = fl(Y2 + 0.5, 1.0, False, HAUSSE, -0.95)
        d2 = fl(Y2 + 0.5, 0.8, True, BAISSE, -0.35)
        h2 = self.lc([("baisse", BAISSE), ("plus petite", BAISSE)], Y2 + 0.2, fs=38, xl=0.25)
        e2 = sans(self.t("(+ 25 % puis − 20 %)", 28, GREY_B)).next_to(h2, DOWN, buff=0.12).align_to(h2, LEFT)
        self.jouer(a2, ["Après une hausse"], {0: [GrowArrow(u2)]})
        self.jouer(h2, ["la baisse pour", "est plus petite"], {0: [GrowArrow(d2)], 1: [FadeIn(e2)]})
        self.attendre_voix()

    # ── 08 : QUESTION 2 (+ 25 % → − 20 %, réponse A) ────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        m = maison(0.75).move_to(P(-5.55, 1.55))
        b = segments([DEP] * 4 + [HAUSSE], lm=0.62, h=0.7, gauche=-4.5, y=1.45)

        def avant(sc):
            sc.play(FadeIn(m, shift=UP * 0.2), FadeIn(b, shift=RIGHT * 0.2), run_time=0.3)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["1 ÷ 1,25 =", "0,8 :", "− 20 %."])
            l1 = sc.ligne_rep(1, ["B :", "même taux."])
            l2 = sc.ligne_rep(2, ["C :", "impossible", "(plus de 100 %)."])
            sc.montre("1 divisé", FadeIn(l0[0], shift=UP * 0.15), rt=0.35)
            sc.montre("égale 0,8", FadeIn(l0[1], scale=1.3), rt=0.3)
            sc.montre("moins 20", FadeIn(l0[2], scale=1.3), b[4].animate.set_fill(BAISSE, 1), rt=0.4)
            sc.play(Indicate(b[4], color=BAISSE, scale_factor=1.15), run_time=0.4)
            sc.montre("B reprend", FadeIn(l1[0], shift=UP * 0.15), Create(sc.barrer_choix(1)), rt=0.35)
            sc.montre("même taux", FadeIn(l1[1], shift=UP * 0.15), rt=0.35)
            sc.montre("et C", FadeIn(l2[0], shift=UP * 0.15), Create(sc.barrer_choix(2)), rt=0.35)
            sc.montre("impossible", FadeIn(l2[1], shift=UP * 0.15), rt=0.3)
            sc.montre("plus de 100", FadeIn(l2[2], shift=UP * 0.15), rt=0.35)
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse",
                            ["Un loyer augmente de 25 %.", "Quelle baisse le ramène", "à son prix d'avant ?"],
                            [self.t("− 20 %", 36), self.t("− 25 %", 36), self.t("− 125 %", 36)], 0,
                            ["1 ÷ 1,25 = 0,8 : − 20 %.", "B : même taux.", "C : impossible (plus de 100 %)."],
                            mot_q="Un loyer", avant_q=avant, autres_r=apres)

    # ── 09 : défi : − 60 % → ? ; + 100 % → ? ───────────────────────────────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.titre_haut("À toi de jouer !", "À toi de jouer", fs=50)
        c1 = courbe_action([(0, 0.9), (0.3, 0.75), (0.5, 0.8), (1, 0.12)], BAISSE).move_to(P(-4.9, 1.45))
        c2 = courbe_action([(0, 0.12), (0.4, 0.3), (0.6, 0.25), (1, 0.9)], HAUSSE).move_to(P(-4.9, -0.75))
        xl = -3.0
        L1 = self.lc([("Une action :", WHITE), ("− 60 %", BAISSE)], 1.8, fs=42, xl=xl)
        self.jouer(L1, ["Une action", "perd 60"], {0: [FadeIn(c1, shift=RIGHT * 0.2)]})
        L1b = self.lc([("pour revenir :", WHITE), ("+ ? %", HAUSSE)], 1.05, fs=42, xl=xl + 0.4)
        self.jouer(L1b, ["pour revenir", None])
        L2 = self.lc([("Après", WHITE), ("+ 100 % :", HAUSSE)], -0.4, fs=42, xl=xl)
        self.jouer(L2, ["après une hausse", "100"], {0: [FadeIn(c2, shift=RIGHT * 0.2)]})
        L2b = self.lc([("quelle baisse ?", BAISSE)], -1.15, fs=42, xl=xl + 0.4)
        self.jouer(L2b, ["quelle baisse"])
        self.pause_defi(y=-2.2)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        g = -6.1
        b1 = segments([DEP] * 4 + [BAISSE] * 6, lm=0.4, h=0.55, gauche=g, y=1.95)
        b1b = segments([DEP] * 4 + [HAUSSE] * 6, lm=0.4, h=0.55, gauche=g, y=1.15)
        b2 = segments([DEP] * 5 + [HAUSSE] * 5, lm=0.4, h=0.55, gauche=g, y=-0.35)
        b2b = segments([DEP] * 5 + [BAISSE] * 5, lm=0.4, h=0.55, gauche=g, y=-1.15)
        xl = -1.4
        L1 = self.lc([("− 60 % :", BAISSE), ("× 0,4", AMBRE)], 1.95, fs=42, xl=xl)
        self.jouer(L1, ["Moins 60", "fois 0,4"], {0: [FadeIn(tit), FadeIn(b1, shift=RIGHT * 0.2)]})
        L2 = self.lc([("1 ÷ 0,4", WHITE), ("= 2,5", AMBRE), ("→", WHITE), ("+ 150 %", VERT_OK)], 1.15, fs=42, xl=xl)
        self.jouer(L2, ["1 divisé", "égale 2,5", "plus 150", None],
                   {0: [FadeIn(b1b[:4])], 2: [GrowFromEdge(b1b[4:], LEFT)]})
        self.play(Create(self.cadre(L2[3])), run_time=0.3)
        L3 = self.lc([("+ 100 % :", HAUSSE), ("× 2", AMBRE)], -0.35, fs=42, xl=xl)
        self.jouer(L3, ["Plus 100", "fois 2"], {0: [FadeIn(b2[:5], shift=RIGHT * 0.2)],
                                               1: [GrowFromEdge(b2[5:], LEFT)]})
        L4 = self.lc([("1 ÷ 2", WHITE), ("= 0,5", AMBRE), ("→", WHITE), ("− 50 %", VERT_OK)], -1.15, fs=42, xl=xl)
        self.jouer(L4, [("1 divisé", 2), "égale 0,5", "moins 50", None], {0: [FadeIn(b2b[:5])], 2: [FadeIn(b2b[5:])]})
        self.play(Create(self.cadre(L4[3])), run_time=0.3)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        A = boite("départ", DEP, fs=26, l=1.6, h=0.75).move_to(P(-5.3, 0.6))
        B = boite("arrivée", AMBRE, fs=26, l=1.6, h=0.75).move_to(P(-2.4, 0.6))
        f1, t1 = fleche(A, B, "× c", AMBRE, fs=32)
        r, tr = retour(A, B, "× (1 ÷ c)", HAUSSE, fs=32, angle=-1.4)
        fig = sans(VGroup(A, B, f1, t1, r, tr))
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Coefficient réciproque :", "1 ÷ c."),
            ("Après − 20 %,", "il faut + 25 %."),
            ("Jamais le même taux.",)], fs=38)
        self.au_mot("Le coefficient")
        self.montrer_ligne(lignes[0], Indicate(tr, color=VERT_OK))
        self.au_mot("Après une")
        self.montrer_ligne(lignes[1])
        self.au_mot("Jamais")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        ecrans = [self.page_de_garde, self.ecran_situation, self.ecran_question_jour, self.ecran_test,
                  self.ecran_coefficient, self.ecran_regle, self.ecran_question1, self.ecran_piege,
                  self.ecran_question2, self.ecran_defi, self.ecran_correction, self.ecran_finale]
        if os.environ.get("GARDE_SEULE") == "1":  # la garde STMG ou 2de seule (voir l'en-tête)
            ecrans[0]()
            return
        for e in ecrans:
            e()
        ecran_fin(self, "paysage", voix="11-abonne")


class PropLyceeEvoReciproquePremiere(PropLyceeEvoReciproqueBase):
    identite = "Maths 1re — EleveAI"
    ceinture = "bleue"


class PropLyceeEvoReciproqueStmg(PropLyceeEvoReciproqueBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "bleue"


class PropLyceeEvoReciproqueSeconde(PropLyceeEvoReciproqueBase):
    identite = "Maths 2de — EleveAI"
    ceinture = "bleue"
