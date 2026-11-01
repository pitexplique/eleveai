# prop_pourcentage_coefficient.py
# EleveAI — Maths 4e — série « Proportionnalité », lot 5 (une paysage par
# micro), épisode 35 : LE COEFFICIENT MULTIPLICATEUR (micro du coach :
# prop_coeff_multiplicateur, notion prop_pourcentages), AVEC VOIX. PAYSAGE
# SEULEMENT (le short 4e-prop-pourcentages-short-coefficient existe déjà),
# CEINTURE VERTE. ⚠️ Ne remplace pas prop_pourcentages.py (paysage de notion).
# ⭐ Méthode travaillée : une hausse de t % = 100 % + t % → on multiplie par
# (1 + t/100) ; une baisse de t % = 100 % − t % → on multiplie par (1 − t/100) ;
# UN SEUL calcul donne le nouveau prix ; le coefficient se lit dans les deux
# sens (> 1 : hausse ; < 1 : baisse). Pas de produit en croix (épisode 24) ;
# « ÷ » écrit, jamais 5/2.
# ⭐ Les dessins : la BARRE DE 100 % (BarreCent de l'épisode 34, construite sur
# BarrePourcent de canvas_proportion, etiquette=False) découpée en 10 morceaux ;
# la hausse = un bout VERT ajouté au bout de la barre (105 %), la baisse = la
# fin de la barre en ROUGE (− 15 %) et l'accolade des 85 % qui restent ;
# l'ANCIEN PRIX → le NOUVEAU PRIX reliés par une flèche « × 1,05 » / « × 0,85 »
# (le coefficient sur la flèche) ; la droite du coefficient (1 au milieu,
# baisse à gauche, hausse à droite).
# ⭐ Fil rouge : erreur 3 de la consigne (le MAUVAIS coefficient : multiplier
# par le pourcentage lui-même au lieu de 100 % ± t %) : piège 06 (« × 0,15 »
# barré : 1 200 € = la remise, pas le prix) ; question 1 A = 0,20 (la hausse
# seule, barrée quand la voix la cite), C = 0,80 (le coefficient d'une baisse,
# coefficient inversé) ; question 2 A = hausse de 9 % (0,9 lu comme + 9 %),
# B = baisse de 90 % (le pourcentage qui RESTE pris pour la baisse).
#
# Décor et métier : TRANSPORTS (deux-roues), Léna, VENDEUSE DE MOTOS : un
# scooter à 2 400 € (+ 5 %), une moto à 8 000 € (− 15 %), un casque à 200 €,
# le défi : une moto à 5 000 € (+ 4 %).
# Chiffres : tous inventés (prix, hausses, remises), plausibles. Aucun chiffre
# du monde réel : pas de source à citer.
# Centres d'intérêt : transports (précision : voitures-motos), argent-budget.
#
# Écrans : 00 garde · 01 Léna, le scooter (+ 5 %) et la moto (− 15 %) ·
# 02 la hausse : 100 % + 5 % = 105 % = 1,05 ; 2 400 € × 1,05 = 2 520 € ·
# 03 la baisse : 100 % − 15 % = 85 % = 0,85 ; 8 000 € × 0,85 = 6 800 € ·
# 04 QUESTION 1 (hausse de 20 %) · 05 lire un coefficient (1,08 ; 0,7) ·
# 06 le piège (× 0,15 barré) · 07 QUESTION 2 (casque × 0,9) · 08 défi (5 000 €,
# + 4 %) · 08b correction · 09 ce que tu as appris · 10 fin.
#
# Voix : manim/voix/4e-prop-pourcentage-coefficient.json (validée par Frédéric
# le 01/11, débit −10), WAV dans public/sons/4e-prop-pourcentage-coefficient/ ;
# marques mot à mot : manim/scripts/4e/prop_pourcentage_coefficient_marques.json
# (scripts/marques_dump.ps1 puis le convertisseur « une marque par
# occurrence » à seuil 0,5 s de l'agent 34).
# Outils : manim/scripts/6e/prop_commun.py + manim/canvas_proportion.py (non
# modifiés) ; base PropPourcentageMentalBase de l'épisode 34 (BarreCent, lc,
# jouer, montre, barrer, barrer_choix, cadre, ligne_rep bornée, coche loin du
# texte des choix). Ajouté ICI : lena(), moto(), scooter(), casque_moto(),
# pastille(), boite_prix(), fleche_coef(), bout_hausse(), fin_baisse().
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/prop_pourcentage_coefficient.py PropPourcentageCoefficient4e
# PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/4e/prop_pourcentage_coefficient.py PropPourcentageCoefficient4e -o eleveai-maths-4e-prop-pourcentage-coefficient --media_dir manim/media-prop-4e-35
# Sortie : manim/sorties/4e/maths/proportionnalite/35-pourcentage-coefficient/eleveai-maths-4e-prop-pourcentage-coefficient.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

import importlib.util  # noqa: E402


def _charger(nom, chemin):
    spec = importlib.util.spec_from_file_location(nom, chemin)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_p34 = _charger("prop_pourcentage_mental_4e", Path(__file__).resolve().parent / "prop_pourcentage_mental.py")
from prop_ratio_ecrire import *  # noqa: E402,F403  (prop_commun, couleurs, sans)

PropPourcentageMentalBase = _p34.PropPourcentageMentalBase
BarreCent, gras, croix, etiquette_prix = _p34.BarreCent, _p34.gras, _p34.croix, _p34.etiquette_prix
sans = _p34.sans

BLEU_C = "#38bdf8"     # les 100 % du prix (bleu)
HAUSSE = "#22c55e"     # le bout ajouté (hausse, vert)
BAISSE = "#ef4444"     # la part retirée (remise, rouge)
TENUE_L = "#1e3a8a"    # le blouson de Léna (bleu nuit)
MOTO_C = "#dc2626"     # la moto rouge
SCOOT_C = "#0ea5e9"    # le scooter bleu ciel


def lena(s=1.0):
    """Léna, vendeuse de motos : blouson bleu nuit, badge, clé de moto."""
    p = personne(peau="#8d5524", tenue=TENUE_L, cheveux="#1f2937", longs=True)
    badge = RoundedRectangle(width=0.42, height=0.26, corner_radius=0.04, fill_color=WHITE, fill_opacity=1,
                             stroke_width=0).move_to(p.corps.get_center() + P(0.22, 0.25))
    c = p.corps.get_center() + P(-0.62, -0.55)
    cle = VGroup(Circle(radius=0.11, stroke_color=JAUNE_TITRE, stroke_width=5).move_to(c),
                 Line(c + P(0.1, -0.05), c + P(0.4, -0.2), color=JAUNE_TITRE, stroke_width=6))
    p.add(badge, cle)
    return p.scale(s)


def roue(r, c, sw=7):
    return VGroup(Circle(radius=r, fill_color="#111827", fill_opacity=1, stroke_color="#e5e7eb", stroke_width=sw)
                  .move_to(c), Circle(radius=r * 0.3, fill_color="#9ca3af", fill_opacity=1, stroke_width=0).move_to(c))


def moto(s=1.0, couleur=MOTO_C):
    """Une moto de profil : deux grandes roues, réservoir, selle, fourche, phare."""
    r1, r2 = roue(0.4, P(-0.95, -0.4)), roue(0.4, P(0.95, -0.4))
    bras = Line(P(-0.95, -0.4), P(-0.25, -0.1), color="#9ca3af", stroke_width=7)
    fourche = Line(P(0.95, -0.4), P(0.62, 0.55), color="#9ca3af", stroke_width=7)
    guidon = Line(P(0.45, 0.62), P(0.78, 0.6), color="#e5e7eb", stroke_width=7)
    corps = Polygon(P(-0.7, 0.0), P(-0.25, 0.3), P(0.5, 0.32), P(0.7, 0.05), P(0.25, -0.32), P(-0.3, -0.32),
                    fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    selle = RoundedRectangle(width=0.7, height=0.14, corner_radius=0.06, fill_color="#111827", fill_opacity=1,
                             stroke_width=0).move_to(P(-0.5, 0.25))
    moteur = RoundedRectangle(width=0.45, height=0.3, corner_radius=0.06, fill_color="#6b7280", fill_opacity=1,
                              stroke_width=0).move_to(P(0.05, -0.35))
    phare = Circle(radius=0.09, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_width=0).move_to(P(0.74, 0.4))
    return VGroup(bras, fourche, r1, r2, moteur, corps, selle, guidon, phare).scale(s)


def scooter(s=1.0, couleur=SCOOT_C):
    """Un scooter de profil : petites roues, plancher, tablier, selle."""
    r1, r2 = roue(0.27, P(-0.8, -0.45), 6), roue(0.27, P(0.8, -0.45), 6)
    arriere = Polygon(P(-1.05, -0.3), P(-0.35, -0.3), P(-0.3, 0.05), P(-0.6, 0.2), P(-1.0, 0.12),
                      fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    plancher = Rectangle(width=0.85, height=0.12, fill_color=couleur, fill_opacity=1, stroke_width=0)
    plancher.move_to(P(0.05, -0.27))
    tablier = Polygon(P(0.45, -0.32), P(0.7, -0.3), P(0.62, 0.5), P(0.45, 0.45), fill_color=couleur,
                      fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    selle = RoundedRectangle(width=0.6, height=0.13, corner_radius=0.06, fill_color="#111827", fill_opacity=1,
                             stroke_width=0).move_to(P(-0.62, 0.26))
    guidon = Line(P(0.42, 0.62), P(0.8, 0.62), color="#e5e7eb", stroke_width=6)
    colonne = Line(P(0.58, 0.45), P(0.6, 0.62), color="#9ca3af", stroke_width=6)
    return VGroup(r1, r2, arriere, plancher, tablier, selle, colonne, guidon).scale(s)


def casque_moto(s=1.0, couleur="#7c3aed"):
    """Un casque de moto intégral de profil : calotte, visière fumée."""
    calotte = AnnularSector(inner_radius=0, outer_radius=0.62, angle=PI, start_angle=0, fill_color=couleur,
                            fill_opacity=1, stroke_width=0)
    bas = RoundedRectangle(width=1.24, height=0.42, corner_radius=0.12, fill_color=couleur, fill_opacity=1,
                           stroke_width=0).move_to(P(0, -0.12))
    calotte.move_to(P(0, 0.22))
    visiere = RoundedRectangle(width=0.62, height=0.3, corner_radius=0.1, fill_color="#0f172a", fill_opacity=1,
                               stroke_color="#94a3b8", stroke_width=2).move_to(P(0.3, 0.1))
    bande = Line(P(-0.55, 0.42), P(0.1, 0.62), color=WHITE, stroke_width=5)
    return VGroup(calotte, bas, visiere, bande).scale(s)


def pastille(txt, couleur, s=1.0):
    """La pastille jaune « + 5 % » / « − 15 % » collée sur un véhicule."""
    c = Circle(radius=0.72, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_color=couleur, stroke_width=5)
    t = Text(txt, font_size=32, color=couleur, weight=BOLD)
    t.scale_to_fit_width(min(t.width, 1.2))
    return VGroup(c, t.move_to(c)).scale(s)


def boite_prix(txt, couleur=WHITE, fs=36):
    """Un prix dans un cadre arrondi (ancien ou nouveau prix)."""
    t = Text(txt, font_size=fs, color=couleur, weight=BOLD)
    cadre = RoundedRectangle(width=t.width + 0.45, height=t.height + 0.4, corner_radius=0.12,
                             stroke_color=couleur, stroke_width=4, fill_color="#0f172a", fill_opacity=1)
    g = VGroup(cadre, t.move_to(cadre))
    g.texte = t
    return g


class PropPourcentageCoefficientBase(PropPourcentageMentalBase):
    nom_voix = "4e-prop-pourcentage-coefficient"
    fichier_marques = "prop_pourcentage_coefficient_marques.json"
    XB = -2.7      # le centre des barres (largeur 6) ; la colonne de calcul à droite
    XC = 1.5
    YP = -1.45     # la ligne « ancien prix → nouveau prix »

    # ── les outils de l'épisode ─────────────────────────────────────────────
    @staticmethod
    def fleche_coef(a, b, s, couleur=AMBRE, fs=36):
        """La flèche ancien prix → nouveau prix, le coefficient écrit dessus."""
        arr = Arrow(a.get_right(), b.get_left(), buff=0.15, color=couleur, stroke_width=7,
                    max_tip_length_to_length_ratio=0.16)
        lab = gras(s, fs, couleur).next_to(arr, UP, buff=0.12)
        return arr, lab

    def prix_ligne(self, a, b, s, y=None, xa=-5.2, xb=-0.55, ca=WHITE, cb=VERT_OK, couleur=AMBRE):
        """Les deux prix encadrés (ancien à gauche, nouveau à droite) et la flèche."""
        y = self.YP if y is None else y
        pa = boite_prix(a, ca).move_to(P(xa, y))
        pb = boite_prix(b, cb).move_to(P(xb, y))
        arr, lab = self.fleche_coef(pa, pb, s, couleur)
        return pa, pb, arr, lab

    @staticmethod
    def bout_hausse(b, k, couleur=HAUSSE):
        """Le bout ajouté au bout de la barre de 100 % (k morceaux de 10 %)."""
        return Rectangle(width=b.lm * k, height=b.hh, fill_color=couleur, fill_opacity=1, stroke_color=WHITE,
                         stroke_width=2).next_to(b.bp.piste, RIGHT, buff=0.06)

    @staticmethod
    def moitie_droite(b, i, couleur=BAISSE):
        m = b.morceaux[i]
        return Rectangle(width=b.lm / 2, height=b.hh, stroke_width=0, fill_color=couleur,
                         fill_opacity=1).align_to(m, RIGHT).set_y(m.get_y())

    def barre(self, y=1.3, largeur=6.0, x=None, h=0.75):
        return BarreCent("", largeur=largeur, h=h, centre=P(self.XB if x is None else x, y))

    @staticmethod
    def accolade(mob, s, couleur=WHITE, sens=UP, fs=30):
        br = Brace(mob, sens, buff=0.08, color=couleur)
        t = gras(s, fs, couleur).next_to(br, sens, buff=0.08)
        return br, t

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Le coefficient multiplicateur", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Le coefficient")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        mt = moto(1.0).move_to(P(-4.4, 0.45))
        fl = self.fleche_coef(Dot(P(-2.6, 0.45)), Dot(P(1.4, 0.45)), "× 1,05", AMBRE, 40)
        sans(fl[1])
        nv = scooter(0.9).move_to(P(3.3, 0.45))
        self.play(FadeIn(mt, shift=RIGHT * 0.3), GrowArrow(fl[0]), FadeIn(fl[1]), FadeIn(nv, shift=LEFT * 0.3),
                  run_time=0.6)
        self.au_mot("Les motos")
        nom = self.t("Les motos de Léna", 34, AMBRE).move_to(P(-0.6, -0.65))
        self.play(FadeIn(nom, shift=UP * 0.15), Indicate(mt, color=AMBRE), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : Léna, vendeuse ; + 5 % sur le scooter, − 15 % sur la moto ─────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = lena(1.0).move_to(P(-5.5, -0.9))
        nom = self.t("Léna", 40, BLEU_C).next_to(pers, UP, buff=0.3)
        self.montre("Voici Léna", FadeIn(pers, shift=UP * 0.3), FadeIn(nom), rt=0.6)
        met = self.t("vend des motos", 28, BLEU_C).next_to(pers, DOWN, buff=0.15)
        met.shift(RIGHT * max(0, -6.4 - met.get_left()[0]))
        self.montre("Elle vend", FadeIn(met, shift=DOWN * 0.1), rt=0.4)
        ban = self.t("Le fabricant annonce :", 32, GREY_B).move_to(P(0.6, 2.85))
        self.montre("Le fabricant", FadeIn(ban, shift=DOWN * 0.15), rt=0.4)
        y1, y2 = 1.45, -0.55
        p1 = pastille("+ 5 %", HAUSSE, 0.95).move_to(P(2.3, y1))
        h1 = self.t("hausse", 34, HAUSSE).next_to(p1, RIGHT, buff=0.3)
        self.montre("une hausse", FadeIn(h1, shift=LEFT * 0.15), rt=0.35)
        self.montre("5 % sur", FadeIn(p1, scale=1.4), rt=0.4)
        sc = scooter(1.0).move_to(P(-2.3, y1))
        self.montre("un scooter", FadeIn(sc, shift=RIGHT * 0.3), rt=0.45)
        e1 = etiquette_prix("2 400 €", 34).move_to(P(0.15, y1))
        self.montre("2 400 euros", FadeIn(e1, scale=1.3), rt=0.4)
        p2 = pastille("− 15 %", BAISSE, 0.95).move_to(P(2.3, y2))
        h2 = self.t("remise", 34, BAISSE).next_to(p2, RIGHT, buff=0.3)
        self.montre("une remise", FadeIn(h2, shift=LEFT * 0.15), rt=0.35)
        self.montre("15 % sur", FadeIn(p2, scale=1.4), rt=0.4)
        mt = moto(1.0).move_to(P(-2.3, y2))
        self.montre("une moto", FadeIn(mt, shift=RIGHT * 0.3), rt=0.45)
        e2 = etiquette_prix("8 000 €", 34).move_to(P(0.15, y2))
        self.montre("8 000 euros", FadeIn(e2, scale=1.3), rt=0.4)
        q1 = self.t("Les nouveaux prix,", 38, ORANGE_RETENUE).move_to(P(0.7, -1.85))
        q2 = self.t("en un seul calcul ?", 38, ORANGE_RETENUE).move_to(P(0.7, -2.55))
        self.montre("les nouveaux prix", FadeIn(q1, shift=RIGHT * 0.15), rt=0.35)
        self.montre("en un seul", FadeIn(q2, scale=1.2), rt=0.4)
        self.play(Circumscribe(VGroup(q1, q2), color=AMBRE, buff=0.12), run_time=0.8)
        self.attendre_voix()

    # ── 02 : la hausse : 100 % + 5 % = 105 % = 1,05 ; 2 400 € × 1,05 ─────────
    def ecran_hausse(self):
        self.ecran("02-hausse")
        self.titre_haut("Une hausse de 5 %", "Une hausse", couleur=HAUSSE)
        b = self.barre()
        self.play(FadeIn(b, shift=UP * 0.2), *b.colorer(range(10), BLEU_C), run_time=0.5)
        a100, t100 = self.accolade(b.bp.piste, "100 %", BLEU_C)
        self.montre("100 % du", GrowFromCenter(a100), FadeIn(t100, scale=1.3), rt=0.45)
        bt = self.bout_hausse(b, 0.5)
        t5 = gras("+ 5 %", 28, HAUSSE).next_to(bt, UP, buff=0.5)
        self.montre(("plus 5 %", 1), FadeIn(bt, shift=LEFT * 0.3), FadeIn(t5, scale=1.3), rt=0.45)
        L1 = self.lc([("100 % +", BLEU_C), ("5 %", HAUSSE)], 1.75, fs=42, xl=self.XC)
        self.jouer(L1, ["100 % plus", ("plus 5 %", 2)])
        a105, t105 = self.accolade(VGroup(b.bp.piste, bt), "105 %", VERT_OK, DOWN)
        L2 = self.lc([("=", WHITE), ("105 %", VERT_OK)], 1.0, fs=42, xl=self.XC)
        self.jouer(L2, ["égale 105", None], {1: [GrowFromCenter(a105), FadeIn(t105, scale=1.3)]})
        L3 = self.lc([("soit", WHITE), ("1,05", AMBRE)], 0.25, fs=48, xl=self.XC)
        self.jouer(L3, ["soit 1,05", ("1,05. Le", 1)])
        self.insister(L3[1], 1.2, 0.2)
        pa, pb, arr, lab = self.prix_ligne("2 400 €", "2 520 €", "× 1,05")
        self.montre("2 400 fois", FadeIn(pa, shift=RIGHT * 0.2), rt=0.4)
        self.montre(("1,05, égale", 1), GrowArrow(arr), FadeIn(lab, scale=1.3), rt=0.45)
        self.montre("2 520 euros", FadeIn(pb, scale=1.3), rt=0.4)
        self.play(Create(self.cadre(pb)), run_time=0.3)
        tp = self.tampon("Le coefficient\nmultiplicateur", VERT_OK, 30).move_to(P(4.0, -1.3))
        self.montre("1,05, c'est", Circumscribe(lab, color=VERT_OK, buff=0.1), Indicate(L3[1], color=VERT_OK),
                    rt=0.6)
        self.montre("le coefficient", FadeIn(tp, scale=1.2), rt=0.45)
        self.insister(tp, 1.08, 0.2)
        self.attendre_voix()

    # ── 03 : la baisse : 100 % − 15 % = 85 % = 0,85 ; 8 000 € × 0,85 ─────────
    def ecran_baisse(self):
        self.ecran("03-baisse")
        self.titre_haut("Une baisse de 15 %", "Une baisse", couleur=BAISSE)
        b = self.barre(largeur=5.6, x=-3.1)
        self.play(FadeIn(b, shift=UP * 0.2), run_time=0.4)
        a100, t100 = self.accolade(b.bp.piste, "100 %", BLEU_C)
        L1 = self.lc([("100 % −", BLEU_C), ("15 %", BAISSE)], 1.75, fs=42, xl=self.XC)
        rouge = self.moitie_droite(b, 8)
        t15 = gras("− 15 %", 28, BAISSE).next_to(b.bp.piste, RIGHT, buff=0.2)
        self.jouer(L1, ["100 % moins", "moins 15"],
                   {0: [GrowFromCenter(a100), FadeIn(t100, scale=1.3)],
                    1: [*b.colorer([9], BAISSE), FadeIn(rouge), FadeIn(t15, scale=1.3)]})
        bleu = b.demi(8, BLEU_C)
        a85, t85 = self.accolade(VGroup(*b.morceaux[:8], bleu), "85 %", VERT_OK, DOWN)
        L2 = self.lc([("=", WHITE), ("85 %", VERT_OK)], 1.0, fs=42, xl=self.XC)
        self.jouer(L2, ["égale 85", None],
                   {1: [*b.colorer(range(8), BLEU_C), FadeIn(bleu), GrowFromCenter(a85), FadeIn(t85, scale=1.3)]})
        L3 = self.lc([("soit", WHITE), ("0,85", AMBRE)], 0.25, fs=48, xl=self.XC)
        self.jouer(L3, ["soit 0,85", ("0,85. 8", 1)])
        self.insister(L3[1], 1.2, 0.2)
        pa, pb, arr, lab = self.prix_ligne("8 000 €", "6 800 €", "× 0,85")
        self.montre("8 000 fois", FadeIn(pa, shift=RIGHT * 0.2), rt=0.4)
        self.montre(("0,85, égale", 1), GrowArrow(arr), FadeIn(lab, scale=1.3), rt=0.45)
        self.montre("6 800 euros", FadeIn(pb, scale=1.3), rt=0.4)
        self.play(Create(self.cadre(pb)), run_time=0.3)
        tp = self.tampon("Un seul calcul !", VERT_OK, 32).move_to(P(4.0, -1.3))
        self.montre("Un seul calcul", FadeIn(tp, scale=1.2), Circumscribe(lab, color=VERT_OK, buff=0.1), rt=0.6)
        self.insister(tp, 1.08, 0.2)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (une hausse de 20 % → × 1,20) ───────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        mt = moto(1.2).move_to(P(-4.4, 0.5))
        pa = pastille("+ 20 %", HAUSSE, 1.0).move_to(P(-2.0, 1.4))

        def avant(sc):
            sc.add(mt, pa)

        def apres(sc):
            b = BarreCent("", largeur=4.0, h=0.7, centre=P(-4.1, 0.5))
            for m in b.morceaux:
                m.set_fill(BLEU_C, 1)
            bt = sc.bout_hausse(b, 2)
            a120, t120 = sc.accolade(VGroup(b.bp.piste, bt), "120 %", VERT_OK, DOWN, fs=28)
            l0 = sc.ligne_rep(0, ["100 % + 20 % =", "120 %", "= 1,20."])
            l1 = sc.ligne_rep(1, ["× 0,20 :", "seulement la hausse."])
            sc.montre("100 % plus", FadeOut(mt), pa.animate.scale(0.75).move_to(P(-1.6, 1.75)),
                      FadeIn(b, shift=UP * 0.2), FadeIn(bt, shift=LEFT * 0.2), FadeIn(l0[0], shift=UP * 0.15), rt=0.45)
            sc.montre("égale 120", FadeIn(l0[1], scale=1.3), GrowFromCenter(a120), FadeIn(t120, scale=1.3), rt=0.45)
            sc.montre("1,20. Multiplier", FadeIn(l0[2], scale=1.3), rt=0.4)
            sc.montre("0,20 donnerait", FadeIn(l1[0], shift=UP * 0.15), Create(sc.barrer_choix(0)), rt=0.45)
            sc.montre("seulement la", FadeIn(l1[1], shift=UP * 0.15), rt=0.35)
            sc.rep_fini()

        self.question_pause("04-question", "04b-reponse", ["Une hausse de 20 %.", "Par quel nombre", "multiplie-t-on le prix ?"],
                            [self.t("0,20", 34), self.t("1,20", 34), self.t("0,80", 34)], 1,
                            ["100 % + 20 % = 120 % = 1,20.", "× 0,20 : seulement la hausse."],
                            mot_q="Une hausse", avant_q=avant, autres_r=apres)

    # ── 05 : lire un coefficient dans les deux sens ─────────────────────────
    def ecran_lire(self):
        self.ecran("05-lire")
        self.titre_haut("Le coefficient se lit dans les deux sens", "Le coefficient", fs=40)
        n = NumberLine(x_range=[0.6, 1.2, 0.1], length=9.6, color=GREY_B, stroke_width=4,
                       include_tip=False).move_to(P(-0.4, 1.35))
        x1 = n.n2p(1)
        un = sans(gras("1", 40, WHITE)).next_to(n.n2p(1), DOWN, buff=0.42)
        tic = Line(x1 + UP * 0.3, x1 + DOWN * 0.3, color=WHITE, stroke_width=6)
        self.play(Create(n), FadeIn(tic), FadeIn(un), run_time=0.6)
        droite = Line(x1, n.n2p(1.2), color=HAUSSE, stroke_width=12)
        gauche = Line(x1, n.n2p(0.6), color=BAISSE, stroke_width=12)
        R1 = self.lc([("Plus grand que 1 :", WHITE), ("hausse", HAUSSE)], -0.35, fs=34, xl=0.6)
        self.jouer(R1, ["Plus grand", "une hausse"], {0: [Create(droite)]})
        d108 = Dot(n.n2p(1.08), radius=0.13, color=HAUSSE)
        l108 = gras("1,08", 30, HAUSSE).next_to(d108, DOWN, buff=0.3)
        p8 = gras("+ 8 %", 30, HAUSSE).next_to(d108, UP, buff=0.3)
        R2 = self.lc([("× 1,08", AMBRE), ("→ + 8 %", HAUSSE)], -1.2, fs=40, xl=0.6)
        self.jouer(R2, ["1,08, c'est", "8 %. Plus"], {0: [FadeIn(d108, scale=2), FadeIn(l108)], 1: [FadeIn(p8, scale=1.3)]})
        G1 = self.lc([("Plus petit que 1 :", WHITE), ("baisse", BAISSE)], -0.35, fs=34, xl=-5.9)
        self.jouer(G1, ["Plus petit", "une baisse"], {0: [Create(gauche)]})
        d07 = Dot(n.n2p(0.7), radius=0.13, color=BAISSE)
        l07 = gras("0,7", 30, BAISSE).next_to(d07, DOWN, buff=0.3)
        p30 = gras("− 30 %", 30, BAISSE).next_to(d07, UP, buff=0.3)
        G2 = self.lc([("× 0,7", AMBRE), ("→ − 30 %", BAISSE)], -1.2, fs=40, xl=-5.9)
        self.jouer(G2, ["0,7, c'est", "moins 30"], {0: [FadeIn(d07, scale=2), FadeIn(l07)], 1: [FadeIn(p30, scale=1.3)]})
        self.play(Circumscribe(VGroup(tic, un), color=AMBRE, buff=0.12), run_time=0.8)
        self.attendre_voix()

    # ── 06 : le piège : une baisse de 15 %, ce n'est pas × 0,15 ─────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.titre_haut("Attention au piège !", "Attention", couleur=ROUGE_ERREUR, fs=44)
        b = self.barre(y=1.2, largeur=5.6, x=-3.1)
        rouge = self.moitie_droite(b, 8)
        bleu = b.demi(8, BLEU_C)
        mt = moto(1.0).move_to(P(-4.6, -1.6))
        pa = pastille("− 15 %", BAISSE, 0.9).move_to(P(-2.3, -1.4))
        L1 = self.lc([("Baisse de 15 %", WHITE)], 2.0, fs=40, xl=self.XC)
        self.jouer(L1, ["Une baisse"], {0: [FadeIn(mt, shift=RIGHT * 0.2), FadeIn(pa, scale=1.3)]})
        L1b = self.lc([("≠", ROUGE_ERREUR), ("× 0,15", ROUGE_ERREUR)], 1.25, fs=44, xl=self.XC)
        self.jouer(L1b, ["ce n'est pas", "par 0,15"])
        self.play(Create(self.barrer(L1b[1])), run_time=0.35)
        a8, t8 = self.accolade(b.bp.piste, "8 000 €", JAUNE_TITRE, fs=28)
        ar, tr = self.accolade(VGroup(rouge, b.morceaux[9]), "1 200 €", BAISSE, DOWN, fs=28)
        tr.shift(LEFT * max(0, tr.get_right()[0] - b.bp.piste.get_right()[0] - 0.3))
        L2 = self.lc([("8 000 × 0,15", WHITE), ("= 1 200 €", BAISSE)], 0.3, fs=40, xl=self.XC)
        self.jouer(L2, ["8 000 fois", "égale 1 200"],
                   {0: [FadeIn(b, shift=UP * 0.2), GrowFromCenter(a8), FadeIn(t8)],
                    1: [*b.colorer([9], BAISSE), FadeIn(rouge), GrowFromCenter(ar), FadeIn(tr, scale=1.3)]})
        L3 = self.lc([("la remise,", BAISSE), ("pas le prix !", ROUGE_ERREUR)], -0.5, fs=40, xl=self.XC)
        self.jouer(L3, ["c'est la remise", "pas le prix"])
        L4 = self.lc([("Le prix :", WHITE), ("× 0,85", VERT_OK)], -1.4, fs=44, xl=self.XC)
        self.jouer(L4, ["Le prix, lui", "par 0,85"],
                   {1: [*b.colorer(range(8), BLEU_C), FadeIn(bleu)]})
        self.play(Create(self.cadre(L4[1])), Circumscribe(VGroup(*b.morceaux[:8], bleu), color=VERT_OK, buff=0.05),
                  run_time=0.6)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (un casque à 200 €, × 0,9 → baisse de 10 %) ─────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        cq = casque_moto(1.3).move_to(P(-4.4, 1.55))
        et = etiquette_prix("200 €", 34).move_to(P(-2.0, 1.55))

        def avant(sc):
            sc.add(cq, et)

        def apres(sc):
            b = BarreCent("", largeur=4.4, h=0.65, centre=P(-3.9, 0.05))
            pa, pb, arr, lab = sc.prix_ligne("200 €", "180 €", "× 0,9", y=-1.5, xa=-5.4, xb=-1.5)
            l0 = sc.ligne_rep(0, ["0,9 =", "90 %."])
            l1 = sc.ligne_rep(1, ["100 % − 90 % =", "10 % :", "baisse de 10 %."])
            l2 = sc.ligne_rep(2, ["200 € ×", "0,9 =", "180 €."])
            sc.montre("0,9, c'est", FadeIn(l0[0], shift=UP * 0.15), FadeIn(b, shift=UP * 0.2), rt=0.4)
            sc.montre("c'est 90", FadeIn(l0[1], scale=1.3), *b.colorer(range(9), BLEU_C),
                      Create(sc.barrer_choix(0)), rt=0.5)
            sc.montre("100 % moins", FadeIn(l1[0], shift=UP * 0.15), rt=0.35)
            sc.montre("égale 10", FadeIn(l1[1], scale=1.3), *b.colorer([9], BAISSE),
                      Create(sc.barrer_choix(1)), rt=0.45)
            sc.montre("une baisse de 10", FadeIn(l1[2], shift=UP * 0.15), rt=0.35)
            sc.montre("200 fois", FadeIn(l2[0], shift=UP * 0.15), FadeIn(pa, shift=RIGHT * 0.2), rt=0.3)
            sc.montre("0,9, égale", FadeIn(l2[1], shift=UP * 0.15), GrowArrow(arr), FadeIn(lab, scale=1.3), rt=0.35)
            sc.montre("égale 180", FadeIn(l2[2], scale=1.3), FadeIn(pb, scale=1.3), rt=0.4)
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse",
                            ["Un casque coûte 200 €.", "On multiplie son prix par 0,9.", "Que s'est-il passé ?"],
                            # choix sans « une » : la coche touchait « 10 % » (vérif. du 01/11)
                            [self.t("hausse de 9 %", 32), self.t("baisse de 90 %", 32),
                             self.t("baisse de 10 %", 32)], 2,
                            ["0,9 = 90 %.", "100 % − 90 % = 10 % : baisse de 10 %.", "200 € × 0,9 = 180 €."],
                            mot_q="Un casque", avant_q=avant, autres_r=apres)

    # ── 08 : défi : une moto à 5 000 €, + 4 % ───────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.titre_haut("À toi de jouer !", "À toi de jouer", fs=50)
        mt = moto(1.4, "#16a34a").move_to(P(-4.3, 0.9))
        et = etiquette_prix("5 000 €", 34).move_to(P(-4.3, -0.75))
        pa = pastille("+ 4 %", HAUSSE, 0.95).move_to(P(-1.9, 1.75))
        xl = 0.6
        L0 = self.lc([("Une moto à", WHITE), ("5 000 €", JAUNE_TITRE)], 2.0, fs=40, xl=xl)
        self.jouer(L0, ["Une moto", "5 000 euros"], {0: [FadeIn(mt, shift=RIGHT * 0.3)], 1: [FadeIn(et, scale=1.3)]})
        L1 = self.lc([("augmente de", WHITE), ("4 %", HAUSSE)], 1.25, fs=40, xl=xl)
        self.jouer(L1, ["augmente", "de 4 %"], {1: [FadeIn(pa, scale=1.5)]})
        self.insister(pa, 1.2, 0.2)
        L2 = self.lc([("Le coefficient", ORANGE_RETENUE)], 0.4, fs=38, xl=xl)
        self.jouer(L2, ["le coefficient"])
        L2b = self.lc([("multiplicateur ?", ORANGE_RETENUE)], -0.25, fs=38, xl=xl)
        self.jouer(L2b, ["multiplicateur"])
        L3 = self.lc([("Et le nouveau prix ?", ORANGE_RETENUE)], -0.95, fs=38, xl=xl)
        self.jouer(L3, ["Et le nouveau"])
        self.pause_defi(y=-1.75)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        self.titre_haut("Correction", "Correction", fs=50)
        b = self.barre(y=1.4, largeur=5.8, x=-3.0)
        for m in b.morceaux:
            m.set_fill(BLEU_C, 1)
        self.add(b)
        bt = self.bout_hausse(b, 0.4)
        t4 = gras("+ 4 %", 28, HAUSSE).next_to(bt, UP, buff=0.5)
        a100, t100 = self.accolade(b.bp.piste, "100 %", BLEU_C)
        L1 = self.lc([("100 % +", BLEU_C), ("4 %", HAUSSE)], 1.75, fs=42, xl=self.XC)
        self.jouer(L1, ["100 % plus", "plus 4"],
                   {0: [GrowFromCenter(a100), FadeIn(t100, scale=1.3)], 1: [FadeIn(bt, shift=LEFT * 0.2), FadeIn(t4)]})
        a104, t104 = self.accolade(VGroup(b.bp.piste, bt), "104 %", VERT_OK, DOWN)
        L2 = self.lc([("=", WHITE), ("104 %", VERT_OK)], 1.0, fs=42, xl=self.XC)
        self.jouer(L2, ["égale 104", None], {1: [GrowFromCenter(a104), FadeIn(t104, scale=1.3)]})
        L3 = self.lc([("soit", WHITE), ("1,04", AMBRE)], 0.25, fs=48, xl=self.XC)
        self.jouer(L3, ["soit 1,04", ("1,04. 5", 1)])
        self.insister(L3[1], 1.2, 0.2)
        pa, pb, arr, lab = self.prix_ligne("5 000 €", "5 200 €", "× 1,04")
        self.montre("5 000 fois", FadeIn(pa, shift=RIGHT * 0.2), rt=0.4)
        self.montre(("1,04, égale", 1), GrowArrow(arr), FadeIn(lab, scale=1.3), rt=0.45)
        self.montre("5 200 euros", FadeIn(pb, scale=1.3), rt=0.4)
        self.play(Create(self.cadre(pb)), run_time=0.3)
        self.insister(pb, 1.1, 0.2)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        h = BarreCent("", largeur=3.4, h=0.55, centre=P(-4.6, 1.0))
        for m in h.morceaux:
            m.set_fill(BLEU_C, 1)
        bh = self.bout_hausse(h, 0.5)
        th = sans(gras("× 1,05", 30, HAUSSE)).next_to(VGroup(h, bh), UP, buff=0.15)
        d = BarreCent("", largeur=3.4, h=0.55, centre=P(-4.6, -0.6))
        for m in d.morceaux[:8]:
            m.set_fill(BLEU_C, 1)
        d.morceaux[9].set_fill(BAISSE, 1)
        dd = VGroup(d.demi(8, BLEU_C), self.moitie_droite(d, 8))
        td = sans(gras("× 0,85", 30, BAISSE)).next_to(d, UP, buff=0.15)
        fig = VGroup(h, bh, th, d, dd, td)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Une hausse de 5 % :", "on multiplie par 1,05."),
            ("Une baisse de 15 % :", "on multiplie par 0,85."),
            ("Coefficient plus grand que 1 : hausse ;", "plus petit que 1 : baisse.")], fs=36)
        self.au_mot("Une hausse")
        self.montrer_ligne(lignes[0], Circumscribe(VGroup(h, bh), color=VERT_OK, buff=0.06))
        self.au_mot("Une baisse")
        self.montrer_ligne(lignes[1], Circumscribe(VGroup(d, dd), color=VERT_OK, buff=0.06))
        self.au_mot("Un coefficient")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_hausse()
        self.ecran_baisse()
        self.ecran_question1()
        self.ecran_lire()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class PropPourcentageCoefficient4e(PropPourcentageCoefficientBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"
