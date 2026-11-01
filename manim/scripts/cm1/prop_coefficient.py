# prop_coefficient.py
# EleveAI — Maths CM1 ET CM2 — série « Proportionnalité » CM, lot CM-B,
# épisode 05 : LE COEFFICIENT DE PROPORTIONNALITÉ (micro du coach :
# prop_coefficient), épisode COMMUN, AVEC VOIX. Paysage 16:9 : CM1 CEINTURE
# VERTE (la paysage complète du niveau), CM2 CEINTURE JAUNE (le même cours en
# rappel, comme prop_tableau.py). Short jumeau : prop_coefficient_short.py.
# ⭐ Méthode travaillée : le COEFFICIENT, flèche LATÉRALE « × 3 » du haut vers
# le bas ; on le CHERCHE par « 4 × ? = 12 », il veut dire « 3 pour 1 ».
# ⛔ Pas de produit en croix ; « × » et « ÷ » écrits, la voix dit « fois »
# et « divisé par ».
# ⭐ Leurres : 1. ajouter / enlever au lieu de multiplier (question 1 : 5 =
# 10 − 5 ; piège : l'écart 8, 4 × 8 = 32 barré ; question 2 : 20 = 15 + 5) ;
# 3. la mauvaise ligne (question 2 : 120 = 8 × 15) ; question 1 : 15 = 5 + 10.
#
# Décor et métier : CUISINE, Nora, PÂTISSIÈRE (4 gâteaux = 12 œufs), crêpes,
# tartes, pizzas. Nombres inventés (ordre de grandeur réel : 2 à 4 œufs par
# gâteau), pas de donnée à sourcer. Centres d'intérêt : cuisine.
#
# Micro → écrans : situation (01), le tableau (02), chercher le nombre (03),
# le coefficient nommé, « 3 pour 1 » (04), l'utiliser (05), QUESTION 1 (06),
# le piège de l'écart (07), QUESTION 2 (08), défi (09) et correction (09b),
# ce que tu as appris (10), fin (11).
#
# Voix : manim/voix/cm-prop-coefficient.json (validée par Frédéric le 01/11,
# débit −10, ne cite aucune classe), WAV dans public/sons/cm-prop-coefficient/ ;
# marques mot à mot : manim/scripts/cm1/prop_coefficient_marques.json
# (scripts/marques_dump.ps1 puis scripts/cues2marques.py ; ajoutée à la main :
# le 2nd « 2 » de « est 2 : 2 cuillères », jeté par cues2marques).
# Outils : ../6e/prop_commun.py + manim/canvas_proportion.py (TableauProp), non
# modifiés. Ajouté ICI : nora(), gateau(), oeuf(), crepes(), tarte(), pizza(),
# ligne_rep() bornée et garde() sans audit (recopiés de cm1/prop_tableau.py).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/prop_coefficient.py PropCoefficientCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/prop_coefficient.py PropCoefficientCM1 -o eleveai-maths-cm1-prop-coefficient --media_dir manim/scripts/cm1/media-prop-coefficient
# Garde CM2 seule : GARDE_SEULE=1 python -m manim render -qh --disable_caching manim/scripts/cm1/prop_coefficient.py PropCoefficientCM2 -o garde-cm2-prop-coefficient --media_dir manim/scripts/cm1/media-prop-coefficient
# python manim/scripts/cm1/frac_cm_commun.py coller <cm1.mp4> <garde-cm2.mp4> <cm2.mp4>
# Sorties : manim/sorties/cm1/maths/proportionnalite/05-coefficient/eleveai-maths-cm1-prop-coefficient.mp4
#           manim/sorties/cm2/maths/proportionnalite/05-coefficient/eleveai-maths-cm2-prop-coefficient.mp4

import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403

CREME = "#fef3c7"
GENOISE = "#d97706"
FRAISE = "#e11d48"
OEUF = "#fde68a"
ROSE_NORA = "#db2777"


def pas_audit(m):
    """Décor sans synchro ni audit (toute la famille de m)."""
    for f in m.get_family():
        f._pas_audit = True
        f.sans_synchro = True
    return m


def nora(s=1.0):
    """Nora, pâtissière : toque blanche, veste rose, tablier blanc."""
    p = personne(peau="#a16207", tenue=ROSE_NORA, cheveux="#1f2937", longs=False, s=s)
    c, r = p.tete.get_center(), p.tete.width / 2
    toque = VGroup(Rectangle(width=r * 1.7, height=r * 0.75, fill_color=WHITE, fill_opacity=1, stroke_width=0)
                   .move_to(c + UP * r * 1.15),
                   *[Circle(radius=r * 0.6, fill_color=WHITE, fill_opacity=1, stroke_width=0)
                     .move_to(c + UP * r * 1.8 + RIGHT * r * dx) for dx in (-0.6, 0, 0.6)])
    b = p.corps.get_bottom()[1]
    tablier = Polygon(P(-0.42, b + 0.05), P(0.42, b + 0.05), P(0.3, b + 1.1 * s), P(-0.3, b + 1.1 * s),
                      fill_color=WHITE, fill_opacity=1, stroke_width=0)
    tablier.move_to(P(p.corps.get_center()[0], tablier.get_center()[1]))
    p.add(tablier, toque)
    return p


def gateau(s=1.0):
    """Un gâteau rond à deux étages de génoise, crème, une fraise dessus (largeur ≈ 1 × s)."""
    assiette = Ellipse(width=1.15, height=0.16, fill_color="#e2e8f0", fill_opacity=1, stroke_width=0).move_to(P(0, -0.32))
    bas = RoundedRectangle(width=0.95, height=0.26, corner_radius=0.06, fill_color=GENOISE, fill_opacity=1,
                           stroke_width=0).move_to(P(0, -0.15))
    creme = RoundedRectangle(width=0.97, height=0.09, corner_radius=0.04, fill_color=CREME, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.02))
    haut = RoundedRectangle(width=0.95, height=0.22, corner_radius=0.06, fill_color=GENOISE, fill_opacity=1,
                            stroke_width=0).move_to(P(0, 0.17))
    nappe = RoundedRectangle(width=0.99, height=0.1, corner_radius=0.05, fill_color=CREME, fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.31))
    fraise = Circle(radius=0.1, fill_color=FRAISE, fill_opacity=1, stroke_width=0).move_to(P(0, 0.44))
    return VGroup(assiette, bas, creme, haut, nappe, fraise).scale(s)


def oeuf(s=1.0):
    """Un œuf, un peu plus étroit en haut (hauteur ≈ 0,4 × s)."""
    o = Ellipse(width=0.3, height=0.4, fill_color=OEUF, fill_opacity=1, stroke_color="#b45309", stroke_width=2)
    reflet = Ellipse(width=0.07, height=0.11, fill_color=WHITE, fill_opacity=0.7, stroke_width=0).move_to(P(-0.06, 0.08))
    return VGroup(o, reflet).scale(s)


def oeufs(n, s=1.0, par=None, buff=0.06):
    """n œufs en rangées de `par` (une seule rangée par défaut)."""
    g = VGroup(*[oeuf(s) for _ in range(n)])
    g.arrange_in_grid(rows=1 if par is None else -(-n // par), cols=n if par is None else par, buff=buff)
    return g


def crepes(s=1.0):
    """Une pile de 5 crêpes dorées dans une assiette."""
    assiette = Ellipse(width=1.4, height=0.24, fill_color="#e2e8f0", fill_opacity=1, stroke_width=0).move_to(P(0, -0.3))
    pile = VGroup(*[Ellipse(width=1.1, height=0.2, fill_color="#f59e0b" if k % 2 else "#fbbf24", fill_opacity=1,
                            stroke_color="#b45309", stroke_width=2).move_to(P(0, -0.2 + 0.09 * k)) for k in range(5)])
    return VGroup(assiette, pile).scale(s)


def tarte(s=1.0):
    """Une tarte aux pommes vue de dessus : fond doré, lamelles de pomme."""
    fond = Circle(radius=0.5, fill_color="#d97706", fill_opacity=1, stroke_color="#92400e", stroke_width=3)
    garni = Circle(radius=0.4, fill_color="#fde68a", fill_opacity=1, stroke_width=0)
    lam = VGroup(*[Ellipse(width=0.34, height=0.1, fill_color="#fef9c3", fill_opacity=1, stroke_color="#ca8a04",
                           stroke_width=1.5).rotate(a).move_to(P(0.22 * np.cos(a), 0.22 * np.sin(a)))
                   for a in np.linspace(0, TAU, 8, endpoint=False)])
    return VGroup(fond, garni, lam).scale(s)


def pizza(s=1.0):
    """Une pizza vue de dessus : croûte, sauce, 3 rondelles de tomate."""
    croute = Circle(radius=0.5, fill_color="#f59e0b", fill_opacity=1, stroke_width=0)
    sauce = Circle(radius=0.41, fill_color="#dc2626", fill_opacity=1, stroke_width=0)
    tom = VGroup(*[Circle(radius=0.11, fill_color="#f87171", fill_opacity=1, stroke_color="#991b1b", stroke_width=2)
                   .move_to(P(0.2 * np.cos(a), 0.2 * np.sin(a))) for a in (PI / 2, PI / 2 + TAU / 3, PI / 2 + 2 * TAU / 3)])
    return VGroup(croute, sauce, tom).scale(s)


def tomate(s=1.0):
    """Une tomate entière (rouge, petite queue verte)."""
    t = Circle(radius=0.17, fill_color="#ef4444", fill_opacity=1, stroke_width=0)
    q = Star(5, outer_radius=0.08, inner_radius=0.03, fill_color="#16a34a", fill_opacity=1, stroke_width=0)
    return VGroup(t, q.move_to(P(0, 0.14))).scale(s)


class PropCoefficientBaseCM(PaysageProp):
    nom_voix = "cm-prop-coefficient"
    fichier_marques = "prop_coefficient_marques.json"
    identite = "Maths CM1 — EleveAI"
    ceinture = "verte"
    LIBS = ["Gâteaux", "Œufs"]
    X0 = -1.0   # le centre des tableaux
    Y0 = 1.1

    def garde(self, *a, **k):
        """L'identité (« CM1 » porte un 1) et l'échelle sont du décor."""
        titre, ident, ech = super().garde(*a, **k)
        pas_audit(ident)
        pas_audit(ech)
        return titre, ident, ech

    def ligne_rep(self, i, morceaux, fs=None):
        """Celle de prop_commun, à la taille de la ligne remplacée et bornée à droite."""
        lg = super().ligne_rep(i, morceaux, fs)
        ref = self.ph_q[i]
        lg.scale_to_fit_width(ref.width).move_to(ref).align_to(ref, LEFT)
        g = lg.get_left()[0]
        if lg.get_right()[0] > self.BORD_X - 0.05:
            lg.scale_to_fit_width(self.BORD_X - 0.05 - g).align_to(P(g, 0), LEFT)
        return lg

    def _disposer_q(self, question, choix, phrase):
        """CM : la phrase de réponse en 34, sous les cartes."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        ph2 = self.col(self.bloc(phrase, 34, VERT_OK), cartes.get_bottom()[1] - 0.3)
        ph2.align_to(P(0, cartes.get_bottom()[1] - 0.2), UP)
        self.ph_q = ph2
        return tete, q, cartes, pause, rebours, ph2

    def table(self, vals, libs=None, centre=None, larg=1.45, lib=2.3, fs=42, h=0.9):
        return TableauProp(libs or self.LIBS, vals, montrer=False, largeur_case=larg, largeur_libelle=lib,
                           hauteur=h, fs=fs, centre=centre if centre is not None else P(self.X0, self.Y0))

    def ligne_c(self, morceaux, y, fs=46, x=None):
        return self.ligne(morceaux, fs).move_to(P(self.X0 if x is None else x, y))

    def calc_tb(self, tb, r, c, v, morceaux, mots, y, fs=46, x=None, allume=None):
        """Une ligne « 7 × 3 = 21 œufs » morceau par morceau, chaque morceau à
        SON mot (mots[k] = extrait ou (extrait, n)) ; le dernier remplit (r, c)."""
        lg = self.ligne_c(morceaux, y, fs, x)
        for k, (m, mot) in enumerate(zip(lg, mots)):
            if mot:
                self.au_mot(*mot) if isinstance(mot, tuple) else self.au_mot(mot)
            dernier = k == len(lg) - 1
            anims = [FadeIn(m, scale=1.3) if dernier else FadeIn(m, shift=RIGHT * 0.2)]
            if k == 0 and allume is not None:
                anims.append(tb.allumer(*allume))
            if dernier and tb is not None:
                anims.append(tb.remplir(r, c, v))
            self.play(*anims, run_time=0.4 if dernier else 0.3)
        if tb is not None:
            self.play(tb.allumer(r, c), run_time=0.25)
        return lg

    def icones(self, tb, s=0.5):
        """Un gâteau et un œuf à gauche des libellés (décor)."""
        g = gateau(s).next_to(tb.carte, LEFT, buff=0.2).set_y(tb.y(0))
        o = oeuf(s * 1.4).move_to(P(g.get_center()[0], tb.y(1)))
        return pas_audit(VGroup(g, o))

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Le coefficient de proportionnalité", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("coefficient")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        tb = self.table([["?"], ["?"]], centre=P(-0.6, 0.35), larg=1.2, lib=2.2, fs=36, h=0.8)
        ic = self.icones(tb, 0.45)
        self.play(FadeIn(tb.fond, shift=UP * 0.2), FadeIn(ic), *[FadeIn(tb.trou(r, 0)) for r in range(2)],
                  run_time=0.5)
        fl = tb.fleche_lat("× ?")
        self.au_mot("Par quel")
        self.play(Create(fl.fleche), FadeIn(fl.etiquette, scale=1.4), run_time=0.5)
        self.au_mot("multiplier")
        self.play(Circumscribe(fl.etiquette, color=AMBRE, buff=0.15), run_time=0.8)
        self.insister(fl.etiquette, 1.3, 0.25)
        self.attendre_voix(marge=0.6)

    # ── 01 : Nora, pâtissière ───────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = nora(1.0).move_to(P(-5.4, -0.9))
        self.au_mot("Voici Nora")
        nom = self.t("Nora", 42, BLEU_CALCUL).next_to(pers, UP, buff=0.25)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("pâtissière")
        met = self.t("pâtissière", 32, BLEU_CALCUL).next_to(pers, DOWN, buff=0.15)
        met.shift(RIGHT * max(0, -6.45 - met.get_left()[0]))
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        gats = VGroup(*[gateau(1.0) for _ in range(4)]).arrange(RIGHT, buff=0.35).move_to(P(0.6, 2.3))
        ofs = oeufs(12, 0.95, buff=0.1).move_to(P(0.6, 1.1))
        l0 = self.ligne([("4 gâteaux", WHITE), ("→", WHITE), ("12 œufs", OEUF)], 46).move_to(P(0.6, -0.1))
        self.au_mot("Pour 4")
        self.play(LaggedStart(*[FadeIn(g, shift=DOWN * 0.3) for g in gats], lag_ratio=0.12),
                  FadeIn(l0[0], shift=RIGHT * 0.2), FadeIn(l0[1]), run_time=0.6)
        self.au_mot("12 œufs")
        self.play(LaggedStart(*[FadeIn(o, scale=1.5) for o in ofs], lag_ratio=0.05), FadeIn(l0[2], scale=1.3),
                  run_time=0.7)
        self.insister(l0[2], 1.15, 0.25, about=l0[2].get_left())
        q = self.ligne([("7 gâteaux", WHITE), ("→", WHITE), ("? œufs", ORANGE_RETENUE)], 46).move_to(P(0.6, -1.4))
        self.au_mot("7 gâteaux")
        self.play(FadeIn(q[0], shift=RIGHT * 0.2), FadeIn(q[1]), run_time=0.35)
        self.play(FadeIn(q[2], scale=1.2), run_time=0.35)
        self.insister(q[2], 1.2, 0.25)
        self.attendre_voix()

    # ── 02 : le tableau ─────────────────────────────────────────────────────
    def ecran_tableau(self):
        self.ecran("02-tableau")
        tb = self.table([[4], [12]], centre=P(-0.6, 0.9), larg=1.6, lib=2.6, fs=46, h=1.0)
        ic = self.icones(tb, 0.6)
        self.au_mot("tableau")
        self.play(FadeIn(tb.fond, shift=UP * 0.2), FadeIn(ic), run_time=0.6)
        self.au_mot("En haut")
        self.play(Indicate(tb.libelles[0], color=AMBRE, scale_factor=1.2), Indicate(ic[0]), run_time=0.5)
        self.au_mot("4. En")
        self.play(FadeIn(tb.valeur(0, 0), scale=1.4), tb.allumer(0, 0), run_time=0.4)
        self.au_mot("En bas")
        self.play(Indicate(tb.libelles[1], color=AMBRE, scale_factor=1.2), Indicate(ic[1]), tb.eteindre(0, 0),
                  run_time=0.5)
        self.au_mot("12.")
        self.play(FadeIn(tb.valeur(1, 0), scale=1.4), tb.allumer(1, 0), run_time=0.4)
        self.play(tb.eteindre(1, 0), Indicate(tb.colonne(0), color=AMBRE, scale_factor=1.08), run_time=0.6)
        self.attendre_voix()

    # ── 03 : chercher le nombre : 4 × ? = 12 ────────────────────────────────
    def ecran_chercher(self):
        self.ecran("03-chercher")
        self.au_mot("Par quel")
        tit = self.t("Par quel nombre ?", 48, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        self.play(Write(tit), run_time=0.5)
        tb = self.table([[4], [12]], centre=P(-1.6, 1.15), larg=1.6, lib=2.6, fs=46, h=1.0)
        ic = self.icones(tb, 0.6)
        self.add(tb.fond, ic)
        fl = tb.fleche_lat("× ?", fs=44)
        self.au_mot("4 à")
        self.play(FadeIn(tb.valeur(0, 0), scale=1.4), tb.allumer(0, 0), run_time=0.35)
        self.au_mot("12 ?")
        self.play(FadeIn(tb.valeur(1, 0), scale=1.4), tb.allumer(1, 0), Create(fl.fleche),
                  FadeIn(fl.etiquette, scale=1.3), run_time=0.45)
        self.calc_tb(None, 0, 0, None, [("4 ×", WHITE), ("3", AMBRE), ("=", WHITE), ("12", VERT_OK)],
                     ["4 fois", "3,", None, "12. On"], -1.05, fs=52, x=-1.2)
        v = self.ligne([("On multiplie", AMBRE), ("par 3.", AMBRE)], 46).move_to(P(-1.2, -2.35))
        e3 = Text("× 3", font_size=fl.etiquette.font_size, color=AMBRE, weight=BOLD).move_to(fl.etiquette)
        e3._pas_audit = True
        self.au_mot("On multiplie")
        self.play(FadeIn(v[0], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("par 3")
        self.play(FadeIn(v[1], scale=1.4), Transform(fl.etiquette, e3), tb.eteindre(0, 0), tb.eteindre(1, 0),
                  run_time=0.45)
        self.insister(fl.etiquette, 1.4, 0.25)
        self.attendre_voix()

    # ── 04 : le coefficient de proportionnalité : 3 œufs pour 1 gâteau ──────
    def ecran_coefficient(self):
        self.ecran("04-coefficient")
        tb = self.table([[4], [12]], centre=P(-4.3, 1.35), larg=1.5, lib=2.4, fs=44, h=0.95)
        fl = tb.fleche_lat("× 3", fs=44)
        self.add(tb.fond, tb.valeur(0, 0), tb.valeur(1, 0), fl)
        self.au_mot("Ce nombre")
        self.play(Indicate(fl.etiquette, color=AMBRE, scale_factor=1.5), run_time=0.8)
        self.au_mot("coefficient")
        v = self.tampon("coefficient de" + chr(10) + "proportionnalité", AMBRE, 34).move_to(P(-3.6, -0.75))
        self.play(FadeIn(v, scale=1.3), run_time=0.45)
        self.insister(v, 1.08, 0.25)
        gats = VGroup(*[gateau(0.95) for _ in range(4)]).arrange(RIGHT, buff=0.32).move_to(P(2.9, 2.2))
        groupes = VGroup(*[oeufs(3, 0.85, buff=0.05).next_to(g, DOWN, buff=0.2) for g in gats])
        self.au_mot("Ici")
        self.play(FadeIn(gats, shift=DOWN * 0.2), run_time=0.45)
        self.play(LaggedStart(*[FadeIn(o, scale=1.5) for gp in groupes for o in gp], lag_ratio=0.05), run_time=0.8)
        lg = self.ligne([("3 œufs", OEUF), ("pour", WHITE), ("1 gâteau", WHITE)], 40).move_to(P(2.75, -0.45))
        cadre = SurroundingRectangle(VGroup(gats[0], groupes[0]), color=AMBRE, buff=0.12, corner_radius=0.1)
        self.au_mot("3 œufs")
        self.play(FadeIn(lg[0], scale=1.3), Create(cadre), Indicate(groupes[0], color=AMBRE), run_time=0.45)
        self.au_mot("pour 1")
        self.play(FadeIn(lg[1], shift=RIGHT * 0.2), run_time=0.25)
        self.au_mot("1 gâteau")
        self.play(FadeIn(lg[2], shift=RIGHT * 0.2), Indicate(gats[0]), run_time=0.35)
        self.insister(lg, 1.12, 0.25)
        self.attendre_voix()

    # ── 05 : utiliser le coefficient : 7 → 21, 10 → 30 ──────────────────────
    def ecran_utiliser(self):
        self.ecran("05-utiliser")
        tb = self.table([[4, 7, 10], [12, 21, 30]])
        fl = tb.fleche_lat("× 3")
        self.add(tb.fond, self.icones(tb, 0.55), tb.valeur(0, 0), tb.valeur(1, 0), fl)
        self.au_mot("Pour 7")
        self.play(FadeIn(tb.valeur(0, 1), scale=1.4), FadeIn(tb.trou(1, 1), scale=1.3), tb.allumer(0, 1), run_time=0.4)
        self.calc_tb(tb, 1, 1, 21, [("7 ×", WHITE), ("3", FLECHE_K), ("=", WHITE), ("21 œufs", VERT_OK)],
                     ["7 fois", "3, égale", None, "21 œufs"], -1.0)
        self.play(tb.eteindre(0, 1), tb.eteindre(1, 1), run_time=0.25)
        self.au_mot("Pour 10")
        self.play(FadeIn(tb.valeur(0, 2), scale=1.4), FadeIn(tb.trou(1, 2), scale=1.3), tb.allumer(0, 2), run_time=0.4)
        self.calc_tb(tb, 1, 2, 30, [("10 ×", WHITE), ("3", FLECHE_K), ("=", WHITE), ("30 œufs", VERT_OK)],
                     ["10 fois", ("3, égale", 2), None, "30 œufs"], -1.95)
        self.play(Indicate(fl, color=AMBRE, scale_factor=1.15), run_time=0.6)
        self.attendre_voix()

    # ── 06 : QUESTION 1 (5 crêpes → 10 cuillères : le coefficient ?) ────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        tb = self.table([[5], [10]], libs=["Crêpes", "Cuillères"], centre=P(-4.1, 1.0), larg=1.3, lib=2.3, fs=40)
        cr = pas_audit(crepes(1.2).move_to(P(-4.1, -1.3)))

        def avant(sc):
            sc.play(FadeIn(tb.fond), FadeIn(cr, shift=UP * 0.2), run_time=0.35)
            sc.au_mot("5 crêpes")
            sc.play(FadeIn(tb.valeur(0, 0), scale=1.4), run_time=0.3)
            sc.au_mot("10 cuillères")
            sc.play(FadeIn(tb.valeur(1, 0), scale=1.4), run_time=0.3)

        def apres(sc):
            fl = tb.fleche_lat("× 2", fs=40)
            l0 = sc.ligne_rep(0, ["5 ×", "2 =", "10."])
            l1 = sc.ligne_rep(1, ["2 cuillères", "pour 1 crêpe."])
            l2 = sc.ligne_rep(2, ["5 =", "10 − 5 :", "enlevé !"])
            l2.set_color(ROUGE_ERREUR)
            sc.au_mot("5 fois")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), tb.allumer(0, 0), Create(fl.fleche), run_time=0.3)
            sc.au_mot("2, égale")
            sc.play(FadeIn(l0[1], shift=UP * 0.15), FadeIn(fl.etiquette, scale=1.3), run_time=0.3)
            sc.au_mot("10. Le")
            sc.play(FadeIn(l0[2], scale=1.3), tb.allumer(1, 0), run_time=0.3)
            sc.au_mot("2 cuillères")
            sc.play(FadeIn(l1[0], shift=UP * 0.15), tb.eteindre(0, 0), tb.eteindre(1, 0), run_time=0.3)
            sc.au_mot("1 crêpe")
            sc.play(FadeIn(l1[1], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("5, c'est")
            sc.play(FadeIn(l2[0], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("10 moins")
            sc.play(FadeIn(l2[1], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("enlevé")
            sc.play(FadeIn(l2[2], shift=UP * 0.15), run_time=0.3)
            sc.rep_fini()

        self.question_pause("06-question", "06b-reponse", ["Quel est le coefficient ?"],
                            [self.t("5", 38), self.t("2", 38), self.t("15", 38)], 1,
                            ["5 × 2 = 10.", "2 cuillères pour 1 crêpe.", "5 = 10 − 5 : enlevé !"],
                            avant_q=avant, autres_r=apres)

    # ── 07 : le piège : le coefficient n'est pas l'écart ────────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 48, ROUGE_ERREUR).move_to(P(-0.4, 3.1))
        self.play(Write(tit), run_time=0.5)
        st = self.ligne([("Le coefficient", AMBRE), ("≠", WHITE), ("l'écart", ROUGE_ERREUR)], 42).move_to(P(-0.4, 2.2))
        self.au_mot("Le coefficient")
        self.play(FadeIn(st[0], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("pas l'écart")
        self.play(FadeIn(st[1]), FadeIn(st[2], scale=1.2), run_time=0.4)
        tb = self.table([[4], [12]], centre=P(-4.0, 0.3), larg=1.4, lib=2.3, fs=44)
        self.play(FadeIn(tb.fond), run_time=0.3)
        self.au_mot("De 4")
        self.play(FadeIn(tb.valeur(0, 0), scale=1.4), run_time=0.3)
        self.au_mot("12, l'écart")
        self.play(FadeIn(tb.valeur(1, 0), scale=1.4), run_time=0.3)
        plus = tb.fleche_lat("+ 8", couleur=ORANGE_RETENUE, fs=44)
        self.au_mot("l'écart est")
        self.play(Create(plus.fleche), run_time=0.4)
        self.play(FadeIn(plus.etiquette, scale=1.4), run_time=0.3)
        X1 = 0.6
        l1 = self.ligne([("4 ×", WHITE), ("8", ORANGE_RETENUE), ("=", WHITE), ("32", ROUGE_ERREUR)], 44)
        l1.move_to(P(0, 0.75)).align_to(P(X1, 0), LEFT)
        for m, mot in zip(l1, ["4 fois", "8, égale", None, "32"]):
            if mot:
                self.au_mot(mot)
            self.play(FadeIn(m, shift=RIGHT * 0.2), run_time=0.3)
        pas = self.ligne([("pas", WHITE), ("12 !", VERT_OK)], 40).next_to(l1, RIGHT, buff=0.35)
        self.au_mot("pas 12")
        xp = croix(plus, sw=7)
        barre = Line(l1[3].get_corner(DL) + P(-0.08, 0), l1[3].get_corner(UR) + P(0.08, 0), color=ROUGE_ERREUR,
                     stroke_width=7)
        self.play(FadeIn(pas[0], shift=RIGHT * 0.2), Create(barre), Create(xp), run_time=0.3)
        self.au_mot("12 ! Le")
        self.play(FadeIn(pas[1], scale=1.3), run_time=0.3)
        l2 = self.ligne([("Le bon nombre est", WHITE), ("3", AMBRE)], 38).move_to(P(0, -0.5)).align_to(P(X1, 0), LEFT)
        self.au_mot("Le bon")
        self.play(FadeIn(l2[0], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("est 3")
        bon = tb.fleche_lat("× 3", fs=44)
        self.play(FadeIn(l2[1], scale=1.4), FadeOut(plus), FadeOut(xp), run_time=0.35)
        self.play(Create(bon.fleche), FadeIn(bon.etiquette, scale=1.3), run_time=0.4)
        l3 = self.ligne([("4 ×", WHITE), ("3", AMBRE), ("=", WHITE), ("12", VERT_OK)], 48)
        l3.move_to(P(0, -1.6)).align_to(P(X1, 0), LEFT)
        for m, mot in zip(l3, [("4 fois", 2), ("3, égale", 1), None, ("12.", 1)]):
            if mot:
                self.au_mot(*mot)
            self.play(FadeIn(m, shift=RIGHT * 0.2), run_time=0.3)
        ok = self.coche(VERT_OK, 0.3).next_to(l3, RIGHT, buff=0.35)
        self.play(Create(ok), Indicate(bon.etiquette, color=AMBRE, scale_factor=1.4), run_time=0.5)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (3 tartes → 15 pommes ; 8 tartes ?) ─────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        tb = self.table([[3, 8], [15, 40]], libs=["Tartes", "Pommes"], centre=P(-3.9, 0.9), larg=1.25, lib=1.9,
                        fs=40)
        ta = pas_audit(tarte(1.3).move_to(P(-3.9, -1.3)))

        def avant(sc):
            sc.play(FadeIn(tb.fond), FadeIn(ta, scale=0.7), run_time=0.35)
            sc.au_mot("3 tartes")
            sc.play(FadeIn(tb.valeur(0, 0), scale=1.4), run_time=0.3)
            sc.au_mot("15 pommes")
            sc.play(FadeIn(tb.valeur(1, 0), scale=1.4), run_time=0.3)

        def apres(sc):
            fl = tb.fleche_lat("× 5", fs=40)
            l0 = sc.ligne_rep(0, ["15 ÷", "3 =", "5."])
            l1 = sc.ligne_rep(1, ["5 pommes", "pour 1 tarte."])
            l2 = sc.ligne_rep(2, ["8 ×", "5 =", "40 pommes."])
            sc.au_mot("15 divisé")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), tb.allumer(1, 0), run_time=0.3)
            sc.au_mot("par 3")
            sc.play(FadeIn(l0[1], shift=UP * 0.15), tb.allumer(0, 0), run_time=0.3)
            sc.au_mot("5 :")
            sc.play(FadeIn(l0[2], scale=1.3), run_time=0.3)
            sc.au_mot("est 5")
            sc.play(Create(fl.fleche), FadeIn(fl.etiquette, scale=1.3), tb.eteindre(0, 0), tb.eteindre(1, 0),
                    run_time=0.35)
            sc.au_mot("5 pommes")
            sc.play(FadeIn(l1[0], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("1 tarte")
            sc.play(FadeIn(l1[1], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("8 fois")
            sc.play(FadeIn(l2[0], shift=UP * 0.15), FadeIn(tb.valeur(0, 1), scale=1.4), FadeIn(tb.trou(1, 1)),
                    run_time=0.3)
            sc.au_mot("5, égale")
            sc.play(FadeIn(l2[1], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("40 pommes")
            sc.play(FadeIn(l2[2], scale=1.3), tb.remplir(1, 1, 40), run_time=0.4)
            sc.play(tb.allumer(1, 1), run_time=0.25)
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse", ["Combien de pommes", "pour 8 tartes ?"],
                            [self.t("20 pommes", 36), self.t("40 pommes", 36), self.t("120 pommes", 36)], 1,
                            ["15 ÷ 3 = 5.", "5 pommes pour 1 tarte.", "8 × 5 = 40 pommes."],
                            avant_q=avant, autres_r=apres)

    # ── 09 : défi : 6 pizzas → 18 tomates ; 9 pizzas ? ──────────────────────
    def table_pizza(self):
        return self.table([[6, 9], [18, 27]], libs=["Pizzas", "Tomates"], centre=P(0.3, 1.45), larg=1.5, lib=2.4)

    def deco_pizza(self):
        pz = pizza(1.5).move_to(P(-4.9, 1.7))
        tom = VGroup(*[tomate(1.0) for _ in range(3)]).arrange(RIGHT, buff=0.12).next_to(pz, DOWN, buff=0.3)
        return pas_audit(VGroup(pz, tom))

    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        self.play(Write(tit), run_time=0.6)
        deco = self.deco_pizza()
        tb = self.table_pizza()
        self.au_mot("Pour 6")
        self.play(FadeIn(deco, shift=DOWN * 0.2), FadeIn(tb.fond, shift=UP * 0.2), run_time=0.5)
        self.play(FadeIn(tb.valeur(0, 0), scale=1.4), run_time=0.3)
        self.au_mot("Nora")
        pers = nora(0.7).move_to(P(-5.5, -1.6))
        self.play(FadeIn(pers, shift=UP * 0.2), run_time=0.35)
        self.au_mot("18 tomates")
        self.play(FadeIn(tb.valeur(1, 0), scale=1.4), run_time=0.3)
        fl = tb.fleche_lat("× ?")
        self.au_mot("Quel est")
        q1 = self.t("Quel est le coefficient ?", 38, ORANGE_RETENUE).move_to(P(0.3, -0.3))
        self.play(FadeIn(q1, shift=UP * 0.2), Create(fl.fleche), FadeIn(fl.etiquette, scale=1.3), run_time=0.4)
        q2 = self.ligne([("Combien de tomates", ORANGE_RETENUE), ("pour 9 pizzas ?", ORANGE_RETENUE)], 38, buff=0.18)
        q2[1].align_to(q2[0], UP)
        q2.move_to(P(0.3, -1.1))
        self.au_mot("Combien")
        self.play(FadeIn(q2[0], shift=UP * 0.2), run_time=0.35)
        self.au_mot("9 pizzas")
        self.play(FadeIn(q2[1], shift=UP * 0.2), FadeIn(tb.valeur(0, 1), scale=1.4), FadeIn(tb.trou(1, 1)),
                  run_time=0.4)
        self.pause_defi(y=-2.0)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        tb = self.table_pizza()
        self.add(self.deco_pizza(), nora(0.7).move_to(P(-5.5, -1.6)), tb.fond, tb.trou(1, 1),
                 *[tb.valeur(r, c) for r, c in ((0, 0), (1, 0), (0, 1))])
        self.play(Write(tit), run_time=0.5)
        self.calc_tb(None, 0, 0, None, [("6 ×", WHITE), ("3", AMBRE), ("=", WHITE), ("18", WHITE)],
                     ["6 fois", "3, égale", None, "18 :"], -0.3, fs=42, x=0.3)
        fl = tb.fleche_lat("× 3")
        self.au_mot("coefficient est")
        self.play(Create(fl.fleche), FadeIn(fl.etiquette, scale=1.3), run_time=0.4)
        self.insister(fl.etiquette, 1.3, 0.2)
        k = self.ligne([("3 tomates", AMBRE), ("pour 1 pizza", WHITE)], 42).move_to(P(0.3, -1.1))
        self.au_mot("3 tomates")
        self.play(FadeIn(k[0], scale=1.3), run_time=0.3)
        self.au_mot("1 pizza")
        self.play(FadeIn(k[1], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("Pour 9")
        self.play(tb.allumer(0, 1), run_time=0.3)
        self.calc_tb(tb, 1, 1, 27, [("9 ×", WHITE), ("3", AMBRE), ("=", WHITE), ("27 tomates", VERT_OK)],
                     ["9 fois", ("3, égale", 2), None, "27 tomates"], -1.95, fs=42, x=0.3)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        tb = self.table([[1, 4, 7, 10], [3, 12, 21, 30]], centre=ORIGIN)
        fl = tb.fleche_lat("× 3")
        fig = VGroup(tb.fond, *[tb.valeur(r, c) for r in range(2) for c in range(4)], fl)
        fig.scale(0.8).move_to(P(-0.4, 1.3))
        if fig.get_top()[1] > tit.get_bottom()[1] - 0.15:
            fig.shift(DOWN * (fig.get_top()[1] - tit.get_bottom()[1] + 0.15))
        self.add(fig)
        self.play(Write(tit), run_time=0.7)
        lignes = VGroup()
        for morceaux, couleur in ((["Le coefficient : on multiplie la ligne", "du haut pour obtenir celle du bas."],
                                   WHITE),
                                  (["Il donne la quantité pour 1."], WHITE),
                                  (["Ce n'est jamais l'écart."], ROUGE_ERREUR)):
            bloc = VGroup(*[self.t(x, 38, couleur) for x in morceaux]).arrange(DOWN, aligned_edge=LEFT, buff=0.1)
            lignes.add(VGroup(self.coche(), bloc).arrange(RIGHT, buff=0.25))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        lignes.align_to(P(-5.6, 0), LEFT).align_to(P(0, fig.get_bottom()[1] - 0.35), UP)
        self.au_mot("Le coefficient")
        self.montrer_ligne(lignes[0], Indicate(fl, color=AMBRE))
        self.au_mot("Il donne")
        self.montrer_ligne(lignes[1], Indicate(tb.colonne(0), color=AMBRE))
        self.au_mot("Ce n'est")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        ecrans = [self.page_de_garde, self.ecran_situation, self.ecran_tableau, self.ecran_chercher,
                  self.ecran_coefficient, self.ecran_utiliser, self.ecran_question1, self.ecran_piege,
                  self.ecran_question2, self.ecran_defi, self.ecran_correction, self.ecran_finale]
        if os.environ.get("GARDE_SEULE") == "1":  # la garde CM2 seule (voir l'en-tête)
            ecrans[0]()
            return
        for e in ecrans:
            e()
        self.page_abonnement("11-abonne")


class PropCoefficientCM1(PropCoefficientBaseCM):
    identite = "Maths CM1 — EleveAI"
    ceinture = "verte"


class PropCoefficientCM2(PropCoefficientBaseCM):
    identite = "Maths CM2 — EleveAI"
    ceinture = "jaune"
