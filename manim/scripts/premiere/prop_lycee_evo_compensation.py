# prop_lycee_evo_compensation.py
# EleveAI — Maths 1re et STMG (automatismes, SANS calculatrice) — série
# « Évolutions en pourcentage », LYCÉE, épisode 14 : LE PIÈGE DE LA
# COMPENSATION (micro du coach : auto_evo_piege_compensation).
# Paysage, CEINTURE ORANGE (le short jumeau : prop_lycee_evo_compensation_short.py).
# Deux sous-classes : PropLyceeEvoCompensationPremiere (« Maths 1re — EleveAI »)
# et PropLyceeEvoCompensationStmg (« Maths STMG — EleveAI ») ; seule l'identité
# change, et elle ne paraît QUE sur la garde : on rend la 1re en entier, la garde
# STMG seule (GARDE_SEULE=1), puis on colle (frac_cm_commun.py coller).
# ⭐ Méthode : on MULTIPLIE les coefficients. + 20 % puis − 20 % : 1,2 × 0,8 =
# 0,96, soit − 4 % ; + t % puis − t % donne toujours une baisse.
# ⭐ Le dessin : la chaîne de boîtes « 50 € —× 1,2→ 60 € —× 0,8→ 48 € » ; les
# barres de prix (bleu), le bout ajouté (vert), le morceau retiré (rouge) :
# + 10 € sur 50 €, mais − 12 € sur 60 €.
# Décor : le prix d'un jeu vidéo ; trader, agente immobilière, gérant de magasin.
# Centres d'intérêt : jeux-video, argent-budget. Exemple fictif, pas de source réelle.
#
# Écrans : 00 garde · 01 situation · 02 question du jour · 03 le calcul (48 €) ·
# 04 pourquoi (+ 10 € / − 12 €) · 05 les coefficients (0,96) · 06 QUESTION 1 (B) ·
# 07 plus le taux est grand (0,75) · 08 QUESTION 2 (C) · 09 défi · 09b correction ·
# 10 ce que tu as appris · 11 fin commune.
#
# Voix : manim/voix/lycee-evo-compensation.json (go de Frédéric le 23/11, débit
# −10) ; WAV : public/sons/lycee-evo-compensation/ ; marques :
# manim/scripts/premiere/prop_lycee_evo_compensation_marques.json.
# Outils (non modifiés, importés) : la base PropPourcentageCoefficientBase de
# l'épisode 4e 35, prop_commun.py, fin_commune.py. Ajouté ICI : segments(),
# boite(), fleche(), jaquette(), bulle_txt(), courbe_action(), maison(), boutique().
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/premiere/prop_lycee_evo_compensation.py PropLyceeEvoCompensationPremiere
# Brouillon : PYTHONIOENCODING=utf-8 python -m manim render -ql --disable_caching manim/scripts/premiere/prop_lycee_evo_compensation.py PropLyceeEvoCompensationPremiere -o eleveai-maths-premiere-evo-compensation --media_dir manim/scripts/premiere/media-prop-lycee-evo-compensation
# Garde STMG seule : GARDE_SEULE=1 … PropLyceeEvoCompensationStmg

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

DEP = "#60a5fa"        # le prix (bleu)
HAUSSE = "#22c55e"     # le bout ajouté (vert)
BAISSE = "#ef4444"     # le morceau retiré (rouge)
FOND_B = "#0f172a"
JEU_C = "#7c3aed"      # la jaquette du jeu (violet)


def deco(m):
    """Un décor ou un nombre déjà dit, posé d'un bloc : ni synchro, ni audit, ni découpage."""
    sans(m)
    for f in m.get_family():
        if isinstance(f, Text):
            f._bloc = True
    m._bloc = True
    return m


def segments(couleurs, lm=0.44, h=0.6, gauche=0.0, y=0.0):
    """Une barre en morceaux égaux, posés de gauche à droite (une couleur par morceau)."""
    g = VGroup(*[Rectangle(width=lm, height=h, fill_color=c, fill_opacity=1, stroke_color=FOND_B, stroke_width=2.5)
                 for c in couleurs]).arrange(RIGHT, buff=0)
    return g.move_to(P(0, y)).align_to(P(gauche, 0), LEFT)


def rect(x0, x1, y, couleur, h=0.7):
    """Un morceau de barre de x0 à x1 (le prix, le bout ajouté, le morceau retiré)."""
    return Rectangle(width=x1 - x0, height=h, fill_color=couleur, fill_opacity=1, stroke_color=WHITE,
                     stroke_width=2).move_to(P((x0 + x1) / 2, y))


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
    """La flèche de la boîte a à la boîte b, son coefficient dessus."""
    f = Arrow(a.get_right() + RIGHT * 0.1, b.get_left() + LEFT * 0.1, buff=0, color=couleur, stroke_width=6,
              max_tip_length_to_length_ratio=0.15)
    t = gras(txt, fs, couleur).next_to(f, UP, buff=0.12)
    return f, t


def jaquette(s=1.0):
    """La boîte d'un jeu vidéo : jaquette violette, une manette dessinée."""
    c = RoundedRectangle(width=1.4, height=1.8, corner_radius=0.1, fill_color=JEU_C, fill_opacity=1,
                         stroke_color=WHITE, stroke_width=2)
    bd = Rectangle(width=1.4, height=0.3, fill_color="#1e1b4b", fill_opacity=1, stroke_width=0).align_to(c, UP)
    man = RoundedRectangle(width=0.9, height=0.45, corner_radius=0.2, fill_color="#e5e7eb", fill_opacity=1,
                           stroke_width=0).move_to(c).shift(DOWN * 0.15)
    croix_g = VGroup(Rectangle(width=0.2, height=0.06, fill_color=FOND_B, fill_opacity=1, stroke_width=0),
                     Rectangle(width=0.06, height=0.2, fill_color=FOND_B, fill_opacity=1, stroke_width=0)
                     ).move_to(man).shift(LEFT * 0.22)
    bt = VGroup(*[Circle(radius=0.045, fill_color=c_, fill_opacity=1, stroke_width=0).move_to(man.get_center() + v)
                  for c_, v in (("#ef4444", P(0.22, 0.07)), ("#22c55e", P(0.3, -0.04)))])
    return VGroup(c, bd, man, croix_g, bt).scale(s)


def bulle_txt(txt, fs=34, couleur=WHITE):
    """Une bulle de pensée (fond sombre, bord blanc) et son texte ; .texte."""
    t = gras(txt, fs, couleur)
    f = RoundedRectangle(width=t.width + 0.5, height=t.height + 0.4, corner_radius=0.2, fill_color=FOND_B,
                         fill_opacity=1, stroke_color=WHITE, stroke_width=3)
    pts = VGroup(Circle(radius=0.08, color=WHITE, stroke_width=3).move_to(f.get_corner(DL) + P(0.3, -0.2)),
                 Circle(radius=0.05, color=WHITE, stroke_width=3).move_to(f.get_corner(DL) + P(0.15, -0.42)))
    g = VGroup(f, t.move_to(f), pts)
    g.texte = t
    return g


def courbe_action(points, couleur, l=2.2, h=1.2):
    """Le cours d'une action : un petit cadre de graphique et sa ligne brisée."""
    cadre = RoundedRectangle(width=l, height=h, corner_radius=0.1, fill_color=FOND_B, fill_opacity=1,
                             stroke_color=GREY_B, stroke_width=2)
    pts = [cadre.get_corner(DL) + P(0.15 + (l - 0.3) * x, 0.15 + (h - 0.3) * y) for x, y in points]
    return VGroup(cadre, VMobject(color=couleur, stroke_width=6).set_points_as_corners(pts))


def maison(s=1.0):
    """Une maison (l'agente immobilière) : façade, toit, fenêtres."""
    f = Rectangle(width=1.4, height=1.1, fill_color="#a16207", fill_opacity=1, stroke_width=0)
    toit = Polygon(P(-0.85, 0.55), P(0.85, 0.55), P(0, 1.2), fill_color="#7c2d12", fill_opacity=1, stroke_width=0)
    fen = VGroup(*[Square(0.3, fill_color="#fde68a", fill_opacity=1, stroke_width=0).move_to(P(x, 0.1))
                   for x in (-0.38, 0.38)])
    porte = Rectangle(width=0.32, height=0.5, fill_color="#3f2a14", fill_opacity=1, stroke_width=0).move_to(P(0, -0.3))
    return VGroup(f, toit, fen, porte).scale(s)


def boutique(s=1.0):
    """Une vitrine de magasin."""
    mur = Rectangle(width=1.9, height=1.3, fill_color="#334155", fill_opacity=1, stroke_width=0)
    toit = Polygon(P(-1.1, 0.65), P(1.1, 0.65), P(0.95, 1.0), P(-0.95, 1.0), fill_color="#dc2626", fill_opacity=1,
                   stroke_width=0)
    vit = Rectangle(width=1.1, height=0.75, fill_color="#93c5fd", fill_opacity=0.6, stroke_width=0).shift(P(-0.3, -0.15))
    porte = Rectangle(width=0.4, height=0.85, fill_color="#78350f", fill_opacity=1, stroke_width=0).shift(P(0.6, -0.22))
    return VGroup(mur, toit, vit, porte).scale(s)


class PropLyceeEvoCompensationBase(PropPourcentageCoefficientBase):
    nom_voix = "lycee-evo-compensation"
    fichier_marques = "prop_lycee_evo_compensation_marques.json"
    identite = "Maths 1re — EleveAI"
    ceinture = "orange"

    @staticmethod
    def cadre(m, couleur=VERT_OK):
        """HD du 23/11 : à buff 0,08 (cadre du 4e), le « = » et le « % » touchaient le trait."""
        return SurroundingRectangle(m, color=couleur, buff=0.14, corner_radius=0.1, stroke_width=4)

    def source(self, lignes):
        """La note discrète, en bas à gauche (lue, jamais dite)."""
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

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Le piège de la compensation", self.identite, self.ceinture, y_ech=-2.45)
        sans(ident)
        sans(ech)
        self.au_mot("Le piège")
        jq = jaquette(0.75).move_to(P(-5.3, 0.15))
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(jq, shift=RIGHT * 0.2),
                  run_time=0.8)
        L = self.lc([("+ 20 %", HAUSSE), ("puis", WHITE), ("− 20 %", BAISSE), ("= départ ?", AMBRE)], 0.15, fs=46,
                    xl=-4.1, droite=5.0)
        self.jouer(L, ["Plus 20", None, "moins 20", "revient-on"])
        self.play(Circumscribe(L[3], color=AMBRE, buff=0.1), Indicate(jq, color=AMBRE), run_time=0.7)
        self.attendre_voix(marge=0.6)

    # ── 01 : le jeu vidéo à 50 € : + 20 % puis − 20 % ; le joueur croit 50 € ─
    def ecran_situation(self):
        self.ecran("01-situation")
        jq = jaquette(0.85).move_to(P(-5.4, 1.45))
        prix = boite("50 €", DEP, fs=34, l=1.5, h=0.7).next_to(jq, DOWN, buff=0.15)
        self.montre("Un jeu vidéo", FadeIn(jq, shift=RIGHT * 0.2), rt=0.4)
        self.montre("coûte 50", FadeIn(prix, scale=1.2), rt=0.35)
        a1 = Arrow(P(-4.3, 1.0), P(-2.6, 2.1), buff=0, color=HAUSSE, stroke_width=7, max_tip_length_to_length_ratio=0.15)
        t1 = gras("+ 20 %", 34, HAUSSE).next_to(a1, UP, buff=0.05).shift(LEFT * 0.35)
        s1 = self.t("sa sortie", 26, GREY_B).next_to(a1.get_end(), UR, buff=0.05)
        self.montre("sa sortie", GrowArrow(a1), FadeIn(s1), rt=0.4)
        self.montre("monte de 20", FadeIn(t1, scale=1.3), rt=0.35)
        a2 = Arrow(P(-2.3, 1.95), P(-0.6, 0.85), buff=0, color=BAISSE, stroke_width=7, max_tip_length_to_length_ratio=0.15)
        t2 = gras("− 20 %", 34, BAISSE).next_to(a2, DOWN, buff=0.05).shift(LEFT * 0.35)
        s2 = self.t("un mois plus tard", 26, GREY_B).next_to(a2.get_end(), RIGHT, buff=0.1).shift(DOWN * 0.1)
        self.montre("Un mois", GrowArrow(a2), FadeIn(s2), rt=0.4)
        self.montre("baisse de 20", FadeIn(t2, scale=1.3), rt=0.35)
        j = personne(peau="#8d5524", tenue="#2563eb", cheveux="#111827").scale(0.75).move_to(P(3.3, 0.9))
        bu = bulle_txt("50 € ?", 36, AMBRE).next_to(j, UP, buff=0.15).shift(RIGHT * 1.0)
        self.montre("Le joueur", FadeIn(j, shift=LEFT * 0.2), rt=0.4)
        self.montre("à 50", FadeIn(bu, scale=0.8), rt=0.4)
        Yv = -1.45
        tr = courbe_action([(0, 0.2), (0.3, 0.7), (0.6, 0.4), (1, 0.8)], HAUSSE, l=1.8, h=1.0).move_to(P(-4.6, Yv))
        mz = maison(0.65).move_to(P(-1.2, Yv))
        bq = boutique(0.6).move_to(P(3.0, Yv))
        ltr = self.t("trader", 26, WHITE).next_to(tr, DOWN, buff=0.12)
        lmz = self.t("agente immobilière", 24, WHITE).next_to(mz, DOWN, buff=0.12)
        lbq = self.t("gérant de magasin", 24, WHITE).next_to(bq, DOWN, buff=0.12)
        self.montre("Le trader", FadeIn(tr, shift=UP * 0.2), FadeIn(ltr), rt=0.4)
        self.montre("l'agente", FadeIn(mz, shift=UP * 0.2), FadeIn(lmz), rt=0.4)
        self.montre("le gérant", FadeIn(bq, shift=UP * 0.2), FadeIn(lbq), rt=0.4)
        src = self.source(["Exemple de la vie courante (prix fictif d'un jeu vidéo)."])
        self.montre("ce piège", FadeIn(src), Indicate(bu, color=ROUGE_ERREUR), rt=0.5)
        self.attendre_voix()

    # ── 02 : la question du jour : de nouveau 50 € ? ────────────────────────
    def ecran_question_jour(self):
        self.ecran("02-question-du-jour")
        Y = 1.3
        A = boite("50 €", DEP).move_to(P(-4.6, Y))
        B = sans(boite("?", AMBRE)).move_to(P(-0.6, Y))
        C = sans(boite("?", AMBRE)).move_to(P(3.4, Y))
        f1, t1 = fleche(A, B, "+ 20 %", HAUSSE)
        f2, t2 = fleche(B, C, "− 20 %", BAISSE)
        sans(VGroup(t1, t2))
        self.montre("Le jeu", FadeIn(B), FadeIn(C), GrowArrow(f1), FadeIn(t1), GrowArrow(f2), FadeIn(t2), rt=0.5)
        L = self.lc([("De nouveau", WHITE), ("50 € ?", AMBRE)], -0.8, fs=60, xl=-3.6, droite=4.8)
        self.jouer(L, ["de nouveau", "50"], {1: [FadeIn(A, scale=1.2)]})
        self.play(Circumscribe(C, color=AMBRE, buff=0.1), Indicate(L[1], color=AMBRE), run_time=0.7)
        self.attendre_voix()

    # ── 03 : le calcul : 50 × 1,2 = 60 ; 60 × 0,8 = 48 ; il manque 2 € ─────
    def ecran_calcul(self):
        self.ecran("03-calcul")
        self.titre_haut("Suivons le prix", "Suivons")
        Y = 1.55
        A = boite("50 €", DEP).move_to(P(-4.6, Y))
        B = boite("60 €", HAUSSE).move_to(P(-0.6, Y))
        C = boite("48 €", BAISSE).move_to(P(3.4, Y))
        f1, t1 = fleche(A, B, "× 1,2", AMBRE)
        f2, t2 = fleche(B, C, "× 0,8", AMBRE)
        L1 = self.lc([("50", WHITE), ("× 1,2", WHITE), ("= 60 €", HAUSSE)], -0.2, fs=46, xl=-4.4)
        self.jouer(L1, ["50 fois", "1,2, égale", "égale 60"],
                   {0: [FadeIn(A, scale=1.2)], 1: [GrowArrow(f1), FadeIn(t1, scale=1.3)], 2: [FadeIn(B, scale=1.2)]})
        L2 = self.lc([("60", WHITE), ("× 0,8", WHITE), ("= 48 €", BAISSE)], -1.05, fs=46, xl=-4.4)
        self.jouer(L2, ["Puis 60", "0,8, égale", "égale 48"],
                   {1: [GrowArrow(f2), FadeIn(t2, scale=1.3)], 2: [FadeIn(C, scale=1.2)]})
        L3 = self.lc([("Il manque", WHITE), ("2 € !", ROUGE_ERREUR)], -1.95, fs=46, xl=-4.4)
        m2 = gras("− 2 €", 34, ROUGE_ERREUR).next_to(C, DOWN, buff=0.2)
        self.jouer(L3, ["Il manque", None], {1: [FadeIn(m2, scale=1.3), Indicate(C, color=ROUGE_ERREUR)]})
        self.insister(L3[1], 1.25, 0.2)
        self.attendre_voix()

    # ── 04 : pourquoi : + 10 € sur 50 €, mais − 12 € sur 60 € ───────────────
    def ecran_pourquoi(self):
        self.ecran("04-pourquoi")
        self.titre_haut("Pourquoi ?", "Pourquoi")
        X0, u = -6.0, 0.08
        Y5, Y6 = 1.55, -0.05
        b50 = rect(X0, X0 + 50 * u, Y5, DEP)
        t50 = deco(gras("50 €", 30, FOND_B)).move_to(b50)
        v10 = rect(X0 + 50 * u, X0 + 60 * u, Y5, HAUSSE)
        t10 = gras("+ 10 €", 30, HAUSSE).next_to(v10, UP, buff=0.1)
        n10 = deco(self.t("20 % de 50 €", 24, GREY_B)).next_to(b50, DOWN, buff=0.1).align_to(b50, RIGHT)
        b60 = rect(X0, X0 + 60 * u, Y6, DEP)
        t60 = deco(gras("60 €", 30, FOND_B)).move_to(rect(X0, X0 + 48 * u, Y6, DEP))
        r12 = rect(X0 + 48 * u, X0 + 60 * u, Y6, BAISSE)
        t12 = gras("− 12 €", 30, BAISSE).next_to(r12, UP, buff=0.1)
        n12 = deco(self.t("20 % de 60 €", 24, GREY_B)).next_to(b60, DOWN, buff=0.1).align_to(b60, RIGHT)
        xl = 0.3
        L1 = self.lc([("− 20 %", BAISSE), ("porte sur 60 €", WHITE)], 1.9, fs=40, xl=xl)
        self.jouer(L1, ["baisse de 20", "porte sur"], {1: [GrowFromEdge(b60, LEFT), FadeIn(t60)]})
        L2 = self.lc([("plus grand que 50", AMBRE)], 1.15, fs=40, xl=xl)
        self.jouer(L2, ["un prix plus"], {0: [GrowFromEdge(b50, LEFT), FadeIn(t50)]})
        L3 = self.lc([("Elle retire", WHITE), ("12 €", BAISSE)], 0.15, fs=44, xl=xl)
        self.jouer(L3, ["Elle retire", "retire 12"], {1: [FadeIn(r12), FadeIn(t12, scale=1.3), FadeIn(n12)]})
        L4 = self.lc([("La hausse :", WHITE), ("+ 10 €", HAUSSE)], -0.65, fs=44, xl=xl)
        self.jouer(L4, ["la hausse", "que 10"], {1: [GrowFromEdge(v10, LEFT), FadeIn(t10, scale=1.3), FadeIn(n10)]})
        cmp = self.lc([("12 € > 10 €", ROUGE_ERREUR)], -1.75, fs=48, xl=xl + 0.5)
        deco(cmp)
        self.play(FadeIn(cmp, scale=1.2), Indicate(r12, color=ROUGE_ERREUR), run_time=0.5)
        self.attendre_voix()

    # ── 05 : les coefficients : 1,2 × 0,8 = 0,96 → − 4 % ───────────────────
    def ecran_coefficient(self):
        self.ecran("05-coefficient")
        self.titre_haut("Avec les coefficients", "Avec les")
        L1 = self.lc([("1,2 × 0,8", WHITE), ("= 0,96", AMBRE)], 1.85, fs=58, xl=-3.6)
        b = segments([DEP] * 10, lm=0.5, h=0.65, gauche=-2.5, y=0.55)
        self.jouer(L1, ["1,2 fois", "égale 0,96"], {0: [FadeIn(b, shift=UP * 0.2)]})
        r4 = Rectangle(width=0.2, height=0.65, fill_color=BAISSE, fill_opacity=1, stroke_width=0)
        r4.align_to(b, RIGHT).set_y(b.get_y())
        L2 = self.lc([("Au total :", WHITE), ("− 4 %", BAISSE)], -0.6, fs=48, xl=-3.6)
        self.jouer(L2, ["Au total", "moins 4"], {1: [FadeIn(r4)]})
        self.play(Indicate(r4, color=BAISSE, scale_factor=1.6), run_time=0.5)
        L3 = self.lc([("Même taux :", WHITE), ("toujours une baisse !", BAISSE)], -1.65, fs=44, xl=-3.6, droite=5.0)
        self.jouer(L3, ["de même taux", "toujours une"])
        self.play(Create(SurroundingRectangle(L3, color=BAISSE, buff=0.15, corner_radius=0.12, stroke_width=4)),
                  run_time=0.4)
        self.attendre_voix()

    # ── 06 : QUESTION 1 (− 10 % puis + 10 % → − 1 %, réponse B) ─────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        b = segments([DEP] * 10, lm=0.42, h=0.65, gauche=-6.0, y=1.75)

        def avant(sc):
            sc.play(FadeIn(b, shift=UP * 0.2), run_time=0.3)

        def apres(sc):
            r1 = Rectangle(width=0.12, height=0.65, fill_color=BAISSE, fill_opacity=1, stroke_width=0)
            r1.align_to(b, RIGHT).set_y(b.get_y())
            l0 = sc.ligne_rep(0, ["0,9 × 1,1 =", "0,99 :", "− 1 %."])
            l1 = sc.ligne_rep(1, ["L'ordre ne change rien."])
            l2 = sc.ligne_rep(2, ["On perd toujours un peu."])
            sc.montre("0,9 fois", FadeIn(l0[0], shift=UP * 0.15), rt=0.35)
            sc.montre("égale 0,99", FadeIn(l0[1], scale=1.3), FadeIn(r1), rt=0.35)
            sc.montre("moins 1", FadeIn(l0[2], scale=1.3), Indicate(r1, color=BAISSE, scale_factor=2), rt=0.45)
            sc.montre("L'ordre", FadeIn(l1[0], shift=UP * 0.15), rt=0.35)
            sc.montre("on perd", FadeIn(l2[0], shift=UP * 0.15), rt=0.35)
            sc.rep_fini()

        self.question_pause("06-question", "06b-reponse",
                            ["Un prix :", "− 10 %, puis + 10 %.", "Au total :"],
                            [self.t("il revient au départ", 32), self.t("− 1 %", 36), self.t("+ 1 %", 36)], 1,
                            ["0,9 × 1,1 = 0,99 : − 1 %.", "L'ordre ne change rien.", "On perd toujours un peu."],
                            mot_q="Un prix", avant_q=avant, autres_r=apres)

    # ── 07 : plus le taux est grand… + 50 % puis − 50 % = × 0,75 ────────────
    def ecran_grand(self):
        self.ecran("07-grand")
        self.titre_haut("Plus le taux est grand, plus le piège est grand", "Plus le taux", fs=36)
        X0, L100, Y = -6.0, 3.6, 1.6
        bl = rect(X0, X0 + L100, Y, DEP)
        vt = rect(X0 + L100, X0 + 1.5 * L100, Y, HAUSSE)
        rg = Rectangle(width=0.75 * L100, height=0.7, fill_color=BAISSE, fill_opacity=0.9, stroke_color=WHITE,
                       stroke_width=2).move_to(P(X0 + 1.125 * L100, Y))
        tr = DashedLine(P(X0 + L100, Y - 0.6), P(X0 + L100, Y + 0.6), color=JAUNE_TITRE, stroke_width=4)
        L1 = self.lc([("+ 50 %", HAUSSE), ("puis", WHITE), ("− 50 %", BAISSE)], -0.15, fs=46, xl=-5.6)
        self.jouer(L1, ["Plus 50", None, "moins 50"],
                   {0: [FadeIn(bl), GrowFromEdge(vt, LEFT), Create(tr)], 2: [FadeIn(rg)]})
        L2 = self.lc([("1,5 × 0,5", WHITE), ("= 0,75", AMBRE)], -1.0, fs=46, xl=-5.6)
        self.jouer(L2, ["1,5 fois", "égale 0,75"])
        br = Brace(Line(P(X0 + 0.75 * L100, Y), P(X0 + L100, Y)), DOWN, buff=0.4, color=BAISSE)
        tq = gras("un quart", 28, BAISSE).next_to(br, DOWN, buff=0.06)
        L3 = self.lc([("On perd", WHITE), ("un quart", BAISSE)], -1.9, fs=46, xl=-5.6)
        n25 = sans(self.t("(− 25 %)", 32, GREY_B)).next_to(L3, RIGHT, buff=0.3)
        self.jouer(L3, ["On perd", "un quart"], {1: [GrowFromCenter(br), FadeIn(tq), FadeIn(n25)]})
        self.insister(L3[1], 1.2, 0.2)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (+ 30 % puis − 30 % → − 9 %, réponse C) ─────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        c = courbe_action([(0, 0.25), (0.45, 0.9), (1, 0.15)], AMBRE, l=3.4, h=1.6).move_to(P(-4.3, 1.55))

        def avant(sc):
            sc.play(FadeIn(c, shift=RIGHT * 0.2), run_time=0.3)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["1,3 × 0,7 =", "0,91 :", "− 9 %."])
            l1 = sc.ligne_rep(1, ["A :", "la compensation, fausse."])
            l2 = sc.ligne_rep(2, ["B :", "la hausse oubliée."])
            sc.montre("1,3 fois", FadeIn(l0[0], shift=UP * 0.15), rt=0.35)
            sc.montre("égale 0,91", FadeIn(l0[1], scale=1.3), rt=0.35)
            sc.montre("moins 9", FadeIn(l0[2], scale=1.3), Indicate(c, color=AMBRE), rt=0.4)
            sc.montre("A croit", FadeIn(l1[0], shift=UP * 0.15), Create(sc.barrer_choix(0)), rt=0.35)
            sc.montre("compensation", FadeIn(l1[1], shift=UP * 0.15), rt=0.35)
            sc.montre("et B", FadeIn(l2[0], shift=UP * 0.15), Create(sc.barrer_choix(1)), rt=0.35)
            sc.montre("la hausse", FadeIn(l2[1], shift=UP * 0.15), rt=0.35)
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse",
                            ["Une action :", "+ 30 %, puis − 30 %.", "Au total :"],
                            [self.t("0 %", 36), self.t("− 30 %", 36), self.t("− 9 %", 36)], 2,
                            ["1,3 × 0,7 = 0,91 : − 9 %.", "A : la compensation, fausse.", "B : la hausse oubliée."],
                            mot_q="Une action", avant_q=avant, autres_r=apres)

    # ── 09 : défi : + 40 % puis − 40 % ; quelle baisse pour revenir ? ───────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.titre_haut("À toi de jouer !", "À toi de jouer", fs=50)
        b1 = segments([DEP] * 10 + [HAUSSE] * 4, lm=0.16, h=0.5, gauche=-6.1, y=1.6)
        b2 = segments([DEP] * 10 + [HAUSSE] * 4, lm=0.16, h=0.5, gauche=-6.1, y=-0.3)
        xl = -3.4
        L1 = self.lc([("+ 40 %", HAUSSE), ("puis", WHITE), ("− 40 % :", BAISSE)], 1.95, fs=42, xl=xl)
        self.jouer(L1, ["augmente de 40", None, "baisse de 40"], {0: [FadeIn(b1, shift=RIGHT * 0.2)]})
        L1b = self.lc([("quel taux au total ?", AMBRE)], 1.2, fs=42, xl=xl + 0.4)
        self.jouer(L1b, ["Quel taux"])
        L2 = self.lc([("Après", WHITE), ("+ 40 %,", HAUSSE)], 0.05, fs=42, xl=xl)
        self.jouer(L2, ["Et après", "plus 40"], {0: [FadeIn(b2, shift=RIGHT * 0.2)]})
        L2b = self.lc([("quelle baisse", BAISSE), ("ramène au départ ?", WHITE)], -0.7, fs=42, xl=xl + 0.4)
        self.jouer(L2b, ["quelle baisse", "ramènerait"])
        self.pause_defi(y=-2.2)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        X0, L100 = -6.1, 3.0
        Y1, Y2 = 1.75, -0.6
        b1 = rect(X0, X0 + 1.4 * L100, Y1, DEP, h=0.55)
        b1r = rect(X0, X0 + 0.84 * L100, Y1 - 0.75, DEP, h=0.55)
        tr = DashedLine(P(X0 + L100, Y1 - 1.2), P(X0 + L100, Y1 + 0.45), color=JAUNE_TITRE, stroke_width=4)
        gap = rect(X0 + 0.84 * L100, X0 + L100, Y1 - 0.75, BAISSE, h=0.55)
        xl = -1.6
        L1 = self.lc([("1,4 × 0,6", WHITE), ("= 0,84", AMBRE), ("→", WHITE), ("− 16 %", VERT_OK)], Y1, fs=42, xl=xl)
        self.jouer(L1, ["1,4 fois", "égale 0,84", None, "moins 16"],
                   {0: [FadeIn(tit), FadeIn(b1, shift=RIGHT * 0.2), Create(tr)], 1: [FadeIn(b1r)], 3: [FadeIn(gap)]})
        self.play(Create(self.cadre(L1[3])), run_time=0.3)
        b2 = rect(X0, X0 + 1.4 * L100, Y2, HAUSSE, h=0.55)
        b2r = rect(X0, X0 + L100, Y2 - 0.75, DEP, h=0.55)
        L2 = self.lc([("Pour revenir :", WHITE)], 0.55, fs=40, xl=xl)
        self.jouer(L2, ["Pour revenir"], {0: [FadeIn(b2, shift=RIGHT * 0.2)]})
        L3 = self.lc([("1 ÷ 1,4", WHITE), ("≈ 0,714", AMBRE)], -0.3, fs=42, xl=xl)
        self.jouer(L3, ["1 divisé", "environ 0,714"], {1: [FadeIn(b2r)]})
        L4 = self.lc([("soit", WHITE), ("≈ − 28,6 %", VERT_OK)], -1.1, fs=42, xl=xl + 0.6)
        self.jouer(L4, ["soit environ", "moins 28"])
        self.play(Create(self.cadre(L4[1])), run_time=0.3)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        A = boite("50 €", DEP, fs=32, l=1.5, h=0.75).move_to(P(-5.2, 1.5))
        B = boite("60 €", HAUSSE, fs=32, l=1.5, h=0.75).move_to(P(-5.2, -0.1))
        C = boite("48 €", BAISSE, fs=32, l=1.5, h=0.75).move_to(P(-5.2, -1.7))
        f1 = Arrow(A.get_bottom(), B.get_top(), buff=0.08, color=AMBRE, stroke_width=6, max_tip_length_to_length_ratio=0.25)
        f2 = Arrow(B.get_bottom(), C.get_top(), buff=0.08, color=AMBRE, stroke_width=6, max_tip_length_to_length_ratio=0.25)
        t1 = gras("× 1,2", 30, AMBRE).next_to(f1, RIGHT, buff=0.15)
        t2 = gras("× 0,8", 30, AMBRE).next_to(f2, RIGHT, buff=0.15)
        fig = sans(VGroup(A, B, C, f1, t1, f2, t2))
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Hausse puis baisse de même taux :", "jamais de retour au départ."),
            ("On multiplie les coefficients.",),
            ("+ t % puis − t % :", "une baisse au total.")], fs=38)
        self.au_mot("Une hausse")
        self.montrer_ligne(lignes[0], Indicate(C, color=BAISSE))
        self.au_mot("On multiplie")
        self.montrer_ligne(lignes[1], Indicate(VGroup(t1, t2), color=AMBRE))
        self.au_mot("plus t")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        ecrans = [self.page_de_garde, self.ecran_situation, self.ecran_question_jour, self.ecran_calcul,
                  self.ecran_pourquoi, self.ecran_coefficient, self.ecran_question1, self.ecran_grand,
                  self.ecran_question2, self.ecran_defi, self.ecran_correction, self.ecran_finale]
        if os.environ.get("GARDE_SEULE") == "1":  # la garde STMG seule (voir l'en-tête)
            ecrans[0]()
            return
        for e in ecrans:
            e()
        ecran_fin(self, "paysage", voix="11-abonne")


class PropLyceeEvoCompensationPremiere(PropLyceeEvoCompensationBase):
    identite = "Maths 1re — EleveAI"
    ceinture = "orange"


class PropLyceeEvoCompensationStmg(PropLyceeEvoCompensationBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "orange"
