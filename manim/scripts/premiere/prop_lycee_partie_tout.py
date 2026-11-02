# prop_lycee_partie_tout.py
# EleveAI — Maths 1re (automatismes) — série « Proportionnalité », LYCÉE,
# épisode 04 : CALCULER UNE PARTIE CONNAISSANT LE TOUT (micro du coach :
# auto_prop_partie_connaissant_tout, notion auto_partie_tout), AVEC VOIX.
# Paysage, CEINTURE JAUNE (le short jumeau : prop_lycee_partie_tout_short.py).
# ⭐ Méthode travaillée : partie = taux × tout, le taux écrit en DÉCIMAL
# (90 % = 0,9) ; ce qui manque = 100 % − taux ; partie + reste = tout.
# « × » et « ÷ » écrits, décimaux à la virgule.
# ⭐ Le dessin qui porte tout : la BARRE DE 100 % (BarreCent de l'épisode 4e 34,
# importée sans la modifier) = le tout (800 N), découpée 90 % (la partie, bleu)
# / 10 % (ce qui manque, rouge) ; la Terre, la station en orbite et les flèches
# de force 800 N (au sol) / 720 N (là-haut).
# ⭐ Fil rouge (erreurs classiques) : le piège du COMPLÉMENT (ce qui manque =
# 10 %, pas 90 %) ; question 1 (Mars, 38 %) B = 838 N (ajouter 38), C = 21 N
# (diviser par 38) ; question 2 (Lune, 16,5 %) B = 165 N (la virgule),
# C = 8 350 N (ce qui manque, 83,5 %).
#
# Décor et métier : ESPACE, Jade, INGÉNIEURE SPATIALE : la Station spatiale
# internationale (≈ 400 km), un astronaute de 80 kg (≈ 800 N au sol), Mars,
# la Lune, un robot de 10 000 N ; le défi : une lycéenne de 60 kg (≈ 600 N).
# Centres d'intérêt : espace, sciences.
# Sources (vérifiées le 02/11/2026, prompt lycée) :
#   · NASA, ISS : altitude ≈ 400 km ; pesanteur à cette altitude g ≈ 8,7 m/s²,
#     soit ≈ 89-90 % des 9,8 m/s² du sol (loi en 1/r²) ;
#   · NASA, Planetary Fact Sheets : Lune 1,62 m/s² (16,5 %), Mars 3,71 m/s²
#     (37,8 % ≈ 38 %) ; poids ≈ masse × 10 (« environ », g ≈ 9,8 N/kg).
#
# Écrans : 00 garde · 01 Jade, l'ISS à 400 km, 90 % de la force · 02 le tout :
# 80 kg → 800 N = 100 % · 03 la partie : 90 % = 0,9 ; 0,9 × 800 = 720 N ·
# 04 la surprise : pourquoi flotte-t-il ? · 05 QUESTION 1 (Mars) · 06 le
# piège : ce qui manque = 10 % = 80 N · 07 QUESTION 2 (Lune, robot) · 08 défi
# (600 N, Mars et Lune) · 08b correction · 09 ce que tu as appris · 10 fin.
#
# Voix : manim/voix/premiere-prop-partie-tout.json (validée par Frédéric le
# 02/11, débit −10), WAV dans public/sons/premiere-prop-partie-tout/ ; marques
# mot à mot : manim/scripts/premiere/prop_lycee_partie_tout_marques.json
# (scripts/marques_dump.ps1 puis le convertisseur à seuil 0,5 s).
# Outils (non modifiés) : prop_commun.py, canvas_proportion.py, la base
# PropPourcentageCoefficientBase de l'épisode 4e 35 (BarreCent, lc, jouer,
# montre, barrer, barrer_choix, accolade, cadre, ligne_rep bornée). Ajouté
# ICI : jade(), astronaute(), terre(), station(), planete(), robot(),
# fleche_force(), part_barre().
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/premiere/prop_lycee_partie_tout.py PropLyceePartieToutPremiere
# PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/premiere/prop_lycee_partie_tout.py PropLyceePartieToutPremiere -o eleveai-maths-premiere-prop-partie-tout --media_dir manim/scripts/premiere/media-prop-lycee-partie-tout
# Sortie : manim/sorties/premiere/maths/proportionnalite/04-partie-tout/eleveai-maths-premiere-prop-partie-tout.mp4

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

PropPourcentageCoefficientBase = _p35.PropPourcentageCoefficientBase
BarreCent, gras, sans = _p35.BarreCent, _p35.gras, _p35.sans

BLEU_C = "#38bdf8"     # la partie (bleu)
RESTE = "#ef4444"      # ce qui manque (rouge)
FORCE = "#fbbf24"      # les flèches de force (ambre)
TERRE = "#2563eb"
MARS_C = "#ea580c"
LUNE_C = "#9ca3af"
TENUE_J = "#1e3a8a"    # la veste de Jade (bleu nuit)


def jade(s=1.0):
    """Jade, ingénieure spatiale : veste bleu nuit, écusson de mission, badge."""
    p = personne(peau="#c68642", tenue=TENUE_J, cheveux="#111827", longs=True)
    c = p.corps.get_center() + P(-0.25, 0.3)
    ecusson = VGroup(Circle(radius=0.17, fill_color=WHITE, fill_opacity=1, stroke_color=JAUNE_TITRE, stroke_width=3)
                     .move_to(c), Circle(radius=0.07, fill_color=TERRE, fill_opacity=1, stroke_width=0).move_to(c))
    badge = RoundedRectangle(width=0.36, height=0.22, corner_radius=0.04, fill_color=WHITE, fill_opacity=1,
                             stroke_width=0).move_to(p.corps.get_center() + P(0.25, 0.3))
    p.add(ecusson, badge)
    return p.scale(s)


def astronaute(s=1.0):
    """Un astronaute en combinaison blanche, casque à visière dorée."""
    corps = RoundedRectangle(width=0.9, height=1.1, corner_radius=0.25, fill_color="#e5e7eb", fill_opacity=1,
                             stroke_width=0).move_to(P(0, -0.3))
    sac = RoundedRectangle(width=1.05, height=0.8, corner_radius=0.15, fill_color="#9ca3af", fill_opacity=1,
                           stroke_width=0).move_to(P(0, -0.2))
    casque = Circle(radius=0.42, fill_color="#f3f4f6", fill_opacity=1, stroke_color="#cbd5e1",
                    stroke_width=3).move_to(P(0, 0.55))
    visiere = Ellipse(width=0.55, height=0.36, fill_color="#d97706", fill_opacity=1, stroke_width=0).move_to(P(0.04, 0.55))
    jambes = VGroup(*[RoundedRectangle(width=0.32, height=0.6, corner_radius=0.12, fill_color="#e5e7eb",
                                       fill_opacity=1, stroke_width=0).move_to(P(dx, -1.05)) for dx in (-0.22, 0.22)])
    drapeau = Rectangle(width=0.22, height=0.14, fill_color=TERRE, fill_opacity=1, stroke_width=0).move_to(P(-0.2, -0.05))
    return VGroup(sac, jambes, corps, drapeau, casque, visiere).scale(s)


def terre(r=1.5):
    """La Terre : un disque bleu, trois continents verts, un liseré clair."""
    disque = Circle(radius=r, fill_color=TERRE, fill_opacity=1, stroke_color="#93c5fd", stroke_width=4)
    conts = VGroup(
        Ellipse(width=r * 0.7, height=r * 0.45, fill_color="#16a34a", fill_opacity=1, stroke_width=0)
        .rotate(0.5).move_to(P(-r * 0.3, r * 0.35)),
        Ellipse(width=r * 0.45, height=r * 0.75, fill_color="#16a34a", fill_opacity=1, stroke_width=0)
        .rotate(-0.3).move_to(P(r * 0.35, -r * 0.2)),
        Ellipse(width=r * 0.35, height=r * 0.25, fill_color="#15803d", fill_opacity=1, stroke_width=0)
        .move_to(P(-r * 0.35, -r * 0.45)))
    return VGroup(disque, conts)


def station(s=1.0):
    """La station spatiale : une poutre, quatre grands panneaux solaires, les modules."""
    poutre = Rectangle(width=2.2, height=0.08, fill_color="#d1d5db", fill_opacity=1, stroke_width=0)
    panneaux = VGroup(*[Rectangle(width=0.36, height=0.75, fill_color="#1d4ed8", fill_opacity=1,
                                  stroke_color="#93c5fd", stroke_width=2).move_to(P(x, y))
                        for x in (-0.95, -0.55, 0.55, 0.95) for y in (0.45, -0.45)])
    modules = VGroup(RoundedRectangle(width=0.7, height=0.24, corner_radius=0.1, fill_color="#f3f4f6",
                                      fill_opacity=1, stroke_width=0),
                     RoundedRectangle(width=0.22, height=0.5, corner_radius=0.08, fill_color="#e5e7eb",
                                      fill_opacity=1, stroke_width=0))
    return VGroup(poutre, panneaux, modules).scale(s)


def planete(r, couleur, taches="#7c2d12"):
    """Mars ou la Lune : un disque et quelques taches (cratères)."""
    d = Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_width=0)
    t = VGroup(*[Circle(radius=r * k, fill_color=taches, fill_opacity=0.7, stroke_width=0).move_to(P(r * x, r * y))
                 for k, x, y in ((0.2, -0.35, 0.3), (0.13, 0.4, 0.1), (0.16, 0.05, -0.45), (0.09, -0.5, -0.2))])
    return VGroup(d, t)


def robot(s=1.0):
    """Un robot d'exploration : caisse, six roues, mât et caméra, antenne."""
    caisse = RoundedRectangle(width=1.5, height=0.5, corner_radius=0.08, fill_color="#e5e7eb", fill_opacity=1,
                              stroke_width=0).move_to(P(0, 0.1))
    roues = VGroup(*[Circle(radius=0.17, fill_color="#111827", fill_opacity=1, stroke_color="#9ca3af",
                            stroke_width=3).move_to(P(x, -0.35)) for x in (-0.55, 0, 0.55)])
    mat = Line(P(0.45, 0.35), P(0.45, 0.85), color="#9ca3af", stroke_width=6)
    tete = RoundedRectangle(width=0.4, height=0.22, corner_radius=0.05, fill_color="#f3f4f6", fill_opacity=1,
                            stroke_width=0).move_to(P(0.5, 0.95))
    oeil = Circle(radius=0.06, fill_color=BLEU_C, fill_opacity=1, stroke_width=0).move_to(P(0.62, 0.95))
    panneau = Rectangle(width=1.1, height=0.08, fill_color="#1d4ed8", fill_opacity=1, stroke_width=0).move_to(P(-0.2, 0.4))
    return VGroup(roues, caisse, panneau, mat, tete, oeil).scale(s)


def fleche_force(depart, vecteur, couleur=FORCE, sw=8):
    """La flèche d'une force (le poids) : du point d'application, dans le sens `vecteur`."""
    return Arrow(depart, depart + vecteur, buff=0, color=couleur, stroke_width=sw,
                 max_tip_length_to_length_ratio=0.22)


class PropLyceePartieToutBase(PropPourcentageCoefficientBase):
    nom_voix = "premiere-prop-partie-tout"
    fichier_marques = "prop_lycee_partie_tout_marques.json"
    XB = -2.7      # le centre des barres (largeur 6) ; la colonne de calcul à droite
    XC = 1.3

    # ── les outils de l'épisode ─────────────────────────────────────────────
    @staticmethod
    def part_barre(b, k, couleur=BLEU_C):
        """La partie de la barre qui vaut k morceaux de 10 % (k décimal : 3,8 ; 1,65)."""
        return Rectangle(width=b.lm * k, height=b.hh, stroke_width=0, fill_color=couleur,
                         fill_opacity=1).align_to(b.morceaux[0], LEFT).set_y(b.morceaux[0].get_y())

    def barre_tout(self, y=1.5, largeur=6.0, x=None, h=0.75, tout="800 N"):
        """La barre de 100 % = le tout, son accolade du dessus et « le tout : 800 N »
        (la donnée de la figure, redite : sans synchro ni audit)."""
        b = self.barre(y=y, largeur=largeur, x=x, h=h)
        a, t = self.accolade(b.bp.piste, f"le tout : {tout}", JAUNE_TITRE, fs=30)
        return b, a, sans(t)

    def source(self, lignes):
        """La source, discrète, en bas à gauche (lue, jamais dite)."""
        s = VGroup(*[Text(x, font_size=16, color=GREY_B) for x in lignes]).arrange(DOWN, aligned_edge=LEFT, buff=0.06)
        for x in s:
            x._bloc = True
        s._bloc = True
        return sans(s).to_corner(DL, buff=0.45)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Calculer une partie connaissant le tout", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("Calculer")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        c = P(-3.4, 0.0)
        tr = terre(0.95).move_to(c)
        orb = DashedVMobject(Circle(radius=1.45, color=GREY_B, stroke_width=3).move_to(c), num_dashes=40)
        st = station(0.42).move_to(c + 1.45 * np.array([np.cos(0.6), np.sin(0.6), 0]))
        self.play(FadeIn(tr, scale=0.8), Create(orb), FadeIn(st, shift=LEFT * 0.2), run_time=0.7)
        q = self.lc([("90 %", BLEU_C), ("de la force", WHITE)], 0.45, fs=40, xl=-0.9)
        q2 = self.lc([("de la Terre ?", WHITE)], -0.35, fs=40, xl=-0.9)
        self.jouer(q, ["90 %", "de la force"])
        self.jouer(q2, ["de la Terre"])
        self.play(Rotate(st, angle=0.5, about_point=c), Circumscribe(q[0], color=AMBRE, buff=0.1), run_time=0.8)
        self.attendre_voix(marge=0.6)

    # ── 01 : Jade, ingénieure spatiale ; l'ISS à 400 km ; 90 % de la force ──
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = jade(1.0).move_to(P(-5.4, -0.6))
        nom = self.t("Jade", 40, BLEU_C).next_to(pers, UP, buff=0.3)
        self.montre("Voici Jade", FadeIn(pers, shift=UP * 0.3), FadeIn(nom), rt=0.6)
        met = self.t("ingénieure spatiale", 28, BLEU_C).next_to(pers, DOWN, buff=0.15)
        met.shift(RIGHT * max(0, -6.4 - met.get_left()[0]))
        self.montre("ingénieure", FadeIn(met, shift=DOWN * 0.1), rt=0.4)
        c = P(-0.9, -1.45)
        tr = terre(1.25).move_to(c)
        R, ang = 2.15, 0.95
        orb = DashedVMobject(Arc(radius=R, start_angle=0.25, angle=PI - 0.5, color=GREY_B, stroke_width=3)
                             .shift(c), num_dashes=34)
        u = np.array([np.cos(ang), np.sin(ang), 0])
        st = station(0.5).move_to(c + R * u)
        L1 = self.lc([("La Station spatiale", WHITE)], 2.75, fs=36, xl=1.9)
        L1b = self.lc([("internationale", WHITE)], 2.15, fs=36, xl=1.9)
        self.jouer(L1, ["La Station"], {0: [FadeIn(tr, scale=0.8)]})
        self.jouer(L1b, ["internationale"], {0: [FadeIn(st, shift=DOWN * 0.3)]})
        alt = DoubleArrow(c + 1.27 * u, c + (R - 0.3) * u, buff=0, color=AMBRE, stroke_width=5,
                          max_tip_length_to_length_ratio=0.25)
        L2 = self.lc([("≈ 400 km", AMBRE), ("d'altitude", WHITE)], 1.35, fs=36, xl=1.9)
        self.jouer(L2, ["tourne", "d'altitude"], {0: [Create(orb)], 1: [GrowFromCenter(alt)]})
        self.play(Rotate(st, angle=0.35, about_point=c), run_time=0.6)
        ast = astronaute(0.3).move_to(st.get_center() + P(-0.1, 0.8))
        L3 = self.lc([("Là-haut, encore", WHITE)], 0.35, fs=36, xl=1.9)
        self.jouer(L3, ["Là-haut"], {0: [FadeIn(ast, scale=0.6)]})
        L4 = self.lc([("≈ 90 %", BLEU_C), ("de la force", WHITE)], -0.35, fs=40, xl=1.9)
        self.jouer(L4, ["90 %", "de la force"])
        L5 = self.lc([("qu'au sol", WHITE)], -1.05, fs=40, xl=1.9)
        self.jouer(L5, ["qu'au sol"])
        self.insister(L4[0], 1.3, 0.2)
        src = self.source(["Sources : NASA (ISS ≈ 400 km ; pesanteur ≈ 8,7 m/s², soit ≈ 89-90 % des 9,8 m/s² du sol) ;",
                           "NASA, Planetary Fact Sheets (Lune 1,62 m/s² ; Mars 3,71 m/s²)."])
        self.play(FadeIn(src), run_time=0.4)
        self.attendre_voix()

    # ── 02 : le tout : 80 kg → ≈ 800 N au sol = 100 % ──────────────────────
    def ecran_tout(self):
        self.ecran("02-tout")
        sol = Line(P(-6.2, -2.45), P(-2.0, -2.45), color="#a16207", stroke_width=8)
        ast = astronaute(0.95)
        ast.move_to(P(-4.6, 0)).align_to(P(0, -2.42), DOWN)
        self.montre("Au sol", Create(sol), FadeIn(ast, shift=DOWN * 0.3), rt=0.5)
        L1 = self.lc([("Masse :", WHITE), ("80 kg", JAUNE_TITRE)], 2.75, fs=40, xl=0.6)
        self.jouer(L1, ["un astronaute", "80 kilos"])
        g = ast.get_center() + P(1.25, 0.2)
        fl = fleche_force(g, P(0, -2.0))
        tf = gras("800 N", 30, FORCE).next_to(fl, RIGHT, buff=0.15)
        L2 = self.lc([("Poids ≈", WHITE), ("800 N", FORCE)], 2.0, fs=40, xl=0.6)
        self.jouer(L2, ["un poids", "800 newtons"], {1: [GrowArrow(fl), FadeIn(tf, scale=1.3)]})
        b =self.barre(y=-0.2, largeur=5.4, x=3.5)
        a, t = self.accolade(b.bp.piste, "le tout", JAUNE_TITRE, fs=32)
        self.montre("C'est le tout", FadeIn(b, shift=UP * 0.2), *b.colorer(range(10), BLEU_C), GrowFromCenter(a),
                    FadeIn(t, scale=1.3), rt=0.6)
        tr = self.t("la référence", 32, GREY_B).next_to(b, DOWN, buff=0.25)
        self.montre("la référence", FadeIn(tr, shift=UP * 0.1), rt=0.35)
        a1, t1 = self.accolade(VGroup(b.bp.piste, tr), "100 %", VERT_OK, DOWN, fs=44)
        self.montre("100 %", GrowFromCenter(a1), FadeIn(t1, scale=1.4), rt=0.45)
        self.insister(t1, 1.2, 0.2)
        self.attendre_voix()

    # ── 03 : la partie : 90 % = 0,9 ; 0,9 × 800 = 720 N ; partie = taux × tout
    def ecran_calcul(self):
        self.ecran("03-calcul")
        self.titre_haut("La partie", "La partie", couleur=BLEU_C)
        b, a, t = self.barre_tout(y=1.3)
        self.play(FadeIn(b, shift=UP * 0.2), GrowFromCenter(a), FadeIn(t), run_time=0.5)
        a90, t90 = self.accolade(VGroup(*b.morceaux[:9]), "90 %", BLEU_C, DOWN, fs=34)
        self.montre("90 % de ce", *b.colorer(range(9), BLEU_C), GrowFromCenter(a90), FadeIn(t90, scale=1.3), rt=0.5)
        self.montre("de ce tout", Indicate(t, color=JAUNE_TITRE), rt=0.4)
        L1 = self.lc([("90 % =", BLEU_C), ("0,9", AMBRE)], 1.75, fs=44, xl=self.XC + 0.9)
        self.jouer(L1, [("90 %, c'est", 1), "0,9."])
        self.insister(L1[1], 1.25, 0.2)
        L2 = self.lc([("0,9 ×", AMBRE), ("800", JAUNE_TITRE)], 0.95, fs=44, xl=self.XC + 0.9)
        self.jouer(L2, ["0,9 fois", "fois 800"], {1: [Indicate(t, color=JAUNE_TITRE)]})
        v = gras("720 N", 34, NUIT).move_to(VGroup(*b.morceaux[:9]))
        L3 = self.lc([("=", WHITE), ("720 N", VERT_OK)], 0.15, fs=48, xl=self.XC + 0.9)
        self.jouer(L3, ["égale 720", None], {1: [FadeIn(v, scale=1.4)]})
        self.play(Create(self.cadre(L3[1])), run_time=0.3)
        f = self.tampon("Partie = taux × tout", VERT_OK, 44).move_to(P(-0.4, -1.5))
        self.montre("Partie égale", FadeIn(f, scale=1.2), rt=0.5)
        self.insister(f, 1.08, 0.2)
        self.attendre_voix()

    # ── 04 : la surprise : 720 N, presque autant qu'au sol ; il « tombe » ──
    def ecran_surprise(self):
        self.ecran("04-surprise")
        c = P(-3.4, -0.4)
        tr = terre(1.35).move_to(c)
        orb = DashedVMobject(Circle(radius=2.35, color=GREY_B, stroke_width=3).move_to(c), num_dashes=48)
        self.add(tr, orb)
        haut = c + UP * 1.35
        ast = astronaute(0.3).move_to(haut).align_to(haut, DOWN)
        f_sol = fleche_force(haut + UP * 0.02, DOWN * 1.0)
        t_sol = sans(gras("800 N", 28, FORCE)).next_to(f_sol, LEFT, buff=0.12)
        ang = 0.35
        u = np.array([np.cos(ang), np.sin(ang), 0])
        st = station(0.5).move_to(c + 2.35 * u)
        f_st = fleche_force(c + 2.35 * u, -u * 0.9)
        t_st = gras("720 N", 28, FORCE).next_to(st, UP, buff=0.12)
        L1 = self.lc([("720 N :", FORCE)], 2.6, fs=44, xl=1.1)
        self.jouer(L1, ["720 newtons"], {0: [FadeIn(st, scale=0.7), GrowArrow(f_st), FadeIn(t_st, scale=1.3)]})
        L2 = self.lc([("presque autant", WHITE), ("qu'au sol !", WHITE)], 1.85, fs=40, xl=1.1)
        self.jouer(L2, ["presque", "qu'au sol"], {1: [FadeIn(ast, shift=DOWN * 0.2), GrowArrow(f_sol), FadeIn(t_sol)]})
        L3 = self.lc([("Alors pourquoi", ORANGE_RETENUE), ("flotte-t-il ?", ORANGE_RETENUE)], 0.75, fs=42, xl=1.1)
        self.jouer(L3, ["Alors", "flotte-t-il"])
        self.insister(L3, 1.08, 0.2)
        L4 = self.lc([("La station tombe", VERT_OK)], -0.35, fs=40, xl=1.1)
        L5 = self.lc([("sans cesse autour", VERT_OK)], -1.0, fs=40, xl=1.1)
        L6 = self.lc([("de la Terre !", VERT_OK)], -1.65, fs=40, xl=1.1)
        self.jouer(L4, ["la station"])
        self.au_mot("tombe")
        self.play(FadeOut(t_st), FadeIn(L5, shift=RIGHT * 0.15),
                  Rotate(VGroup(st, f_st), angle=PI, about_point=c, rate_func=linear), run_time=1.0)
        self.au_mot("de la Terre")
        self.play(FadeIn(L6, shift=RIGHT * 0.15),
                  Rotate(VGroup(st, f_st), angle=PI, about_point=c, rate_func=linear), run_time=1.0)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (Mars, 38 % de 800 N → 304 N) ───────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        ma = planete(0.9, MARS_C).move_to(P(-4.3, 1.75))
        nm = sans(self.t("Mars", 32, MARS_C)).next_to(ma, DOWN, buff=0.15)

        def avant(sc):
            sc.play(FadeIn(ma, scale=0.7), FadeIn(nm), run_time=0.4)

        def apres(sc):
            b = BarreCent("", largeur=5.0, h=0.65, centre=P(-3.6, -1.3))
            p = sc.part_barre(b, 3.8, MARS_C)
            ap, tp = b.dessous(p, "304 N", VERT_OK, fs=28)
            a8, t8 = sc.accolade(b.bp.piste, "800 N", JAUNE_TITRE, fs=28)
            l0 = sc.ligne_rep(0, ["0,38 ×", "800 =", "304 N."])
            l1 = sc.ligne_rep(1, ["B : 800 + 38 ;", "C : 800 ÷ 38."])
            sc.montre("0,38 fois", FadeIn(l0[0], shift=UP * 0.15), FadeIn(b, shift=UP * 0.2), rt=0.4)
            sc.montre("fois 800", FadeIn(l0[1], shift=UP * 0.15), GrowFromCenter(a8), FadeIn(t8), rt=0.35)
            sc.montre("égale 304", FadeIn(l0[2], scale=1.3), FadeIn(p), GrowFromCenter(ap), FadeIn(tp, scale=1.3),
                      rt=0.45)
            sc.montre("B ajoute", FadeIn(l1[0], shift=UP * 0.15), Create(sc.barrer_choix(1)), rt=0.4)
            sc.montre("C divise", FadeIn(l1[1], shift=UP * 0.15), Create(sc.barrer_choix(2)), rt=0.4)
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse",
                            ["Sur Mars : environ 38 %", "de la force sur Terre.", "Poids au sol : 800 N. Sur Mars ?"],
                            [self.t("304 N", 34), self.t("838 N", 34), self.t("21 N", 34)], 0,
                            ["0,38 × 800 = 304 N.", "B : 800 + 38 ; C : 800 ÷ 38."],
                            mot_q="Sur Mars", avant_q=avant, autres_r=apres)

    # ── 06 : le piège : ce qui manque = 100 % − 90 % = 10 % = 80 N ──────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.titre_haut("Attention au piège !", "Attention", couleur=ROUGE_ERREUR, fs=44)
        b, a, t = self.barre_tout(y=1.2)
        for m in b.morceaux[:9]:
            m.set_fill(BLEU_C, 1)
        self.play(FadeIn(b, shift=UP * 0.2), GrowFromCenter(a), FadeIn(t), run_time=0.5)
        st = station(0.6).move_to(P(-4.2, -1.55))
        ast = astronaute(0.3).move_to(st.get_center() + P(0, 0.6))
        xl = 1.0
        L1 = self.lc([("Il manque combien ?", ORANGE_RETENUE)], 2.15, fs=38, xl=xl)
        self.jouer(L1, ["Il manque"], {0: [FadeIn(st, scale=0.7), FadeIn(ast)]})
        L2 = self.lc([("Pas", ROUGE_ERREUR), ("90 % !", ROUGE_ERREUR)], 1.4, fs=40, xl=xl)
        self.jouer(L2, ["Pas 90", None], {1: [Indicate(VGroup(*b.morceaux[:9]), color=ROUGE_ERREUR)]})
        self.play(Create(self.barrer(L2)), run_time=0.35)
        self.montre("ce qui manque", b.morceaux[9].animate.set_fill(RESTE, 1), rt=0.4)
        a10, t10 = self.accolade(b.morceaux[9], "10 %", RESTE, DOWN, fs=30)
        L3 = self.lc([("100 % −", WHITE), ("90 %", BLEU_C), ("= 10 %", RESTE)], 0.55, fs=42, xl=xl)
        self.jouer(L3, ["100 moins", None, "égale 10"], {2: [GrowFromCenter(a10), FadeIn(t10, scale=1.3)]})
        v80 = b.valeur(9, "80 N", fs=24, couleur=WHITE)
        L4 = self.lc([("0,1 ×", RESTE), ("800 =", JAUNE_TITRE), ("80 N", RESTE)], -0.25, fs=42, xl=xl)
        self.jouer(L4, ["0,1 fois", "fois 800", "égale 80"], {2: [FadeIn(v80, scale=1.4)]})
        v720 = gras("720 N", 34, NUIT).move_to(VGroup(*b.morceaux[:9]))
        L5 = self.lc([("720 +", BLEU_C), ("80 =", RESTE), ("800 N", JAUNE_TITRE)], -1.05, fs=42, xl=xl)
        self.jouer(L5, ["720 plus", None, "égale 800"], {0: [FadeIn(v720, scale=1.3)]})
        self.montre("le tout", Create(self.cadre(L5[2], JAUNE_TITRE)), Circumscribe(b.bp.piste, color=JAUNE_TITRE,
                                                                                   buff=0.06), Indicate(t), rt=0.6)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (la Lune, 16,5 % de 10 000 N → 1 650 N) ─────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        lu = planete(0.8, LUNE_C, "#6b7280").move_to(P(-5.0, 1.75))
        nl = sans(self.t("la Lune", 30, LUNE_C)).next_to(lu, DOWN, buff=0.15)
        rb = robot(0.85).move_to(P(-2.6, 1.6))

        def avant(sc):
            sc.play(FadeIn(lu, scale=0.7), FadeIn(nl), FadeIn(rb, shift=LEFT * 0.3), run_time=0.4)

        def apres(sc):
            b = BarreCent("", largeur=5.0, h=0.65, centre=P(-3.6, -1.3))
            p = sc.part_barre(b, 1.65, LUNE_C)
            a1, t1 = sc.accolade(b.bp.piste, "10 000 N", JAUNE_TITRE, fs=28)
            ap, tp = b.dessous(p, "1 650 N", VERT_OK, fs=28)
            tp.align_to(b.bp.piste, LEFT)
            l0 = sc.ligne_rep(0, ["0,165 ×", "10 000 =", "1 650 N."])
            l1 = sc.ligne_rep(1, ["B : la virgule ;", "C : ce qui manque,", "83,5 %."])
            sc.montre("0,165 fois", FadeIn(l0[0], shift=UP * 0.15), FadeIn(b, shift=UP * 0.2), rt=0.4)
            sc.montre("fois 10 000", FadeIn(l0[1], shift=UP * 0.15), GrowFromCenter(a1), FadeIn(t1), rt=0.35)
            sc.montre("égale 1 650", FadeIn(l0[2], scale=1.3), FadeIn(p), GrowFromCenter(ap), FadeIn(tp, scale=1.3),
                      rt=0.45)
            sc.montre("B se trompe", FadeIn(l1[0], shift=UP * 0.15), Create(sc.barrer_choix(1)), rt=0.4)
            sc.montre("C calcule", FadeIn(l1[1], shift=UP * 0.15), rt=0.35)
            sc.montre("83,5", FadeIn(l1[2], shift=UP * 0.15), Create(sc.barrer_choix(2)), rt=0.4)
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse",
                            ["Sur la Lune : environ 16,5 %", "de la force sur Terre.",
                             "Un robot : 10 000 N au sol. Sur la Lune ?"],
                            [self.t("1 650 N", 34), self.t("165 N", 34), self.t("8 350 N", 34)], 0,
                            ["0,165 × 10 000 = 1 650 N.", "B : la virgule ; C : ce qui manque, 83,5 %."],
                            mot_q="Sur la Lune", avant_q=avant, autres_r=apres)

    # ── 08 : défi : une lycéenne de 60 kg (≈ 600 N) sur Mars et sur la Lune ─
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.titre_haut("À toi de jouer !", "À toi de jouer", fs=50)
        ly = personne(peau="#e0ac69", tenue="#7c3aed", cheveux="#78350f", longs=True).scale(0.9)
        ly.move_to(P(-5.2, -0.5))
        g = ly.corps.get_center()
        fl = fleche_force(g + P(1.15, 0.6), P(0, -1.7))
        tf = gras("600 N", 30, FORCE).next_to(fl, RIGHT, buff=0.12)
        xl = 0.2
        L0 = self.lc([("Une lycéenne :", WHITE), ("60 kg", JAUNE_TITRE)], 2.1, fs=40, xl=xl)
        self.jouer(L0, ["Une lycéenne", "60 kilos"], {0: [FadeIn(ly, shift=UP * 0.3)]})
        L1 = self.lc([("Poids au sol ≈", WHITE), ("600 N", FORCE)], 1.35, fs=40, xl=xl)
        self.jouer(L1, ["un poids", "600 newtons"], {1: [GrowArrow(fl), FadeIn(tf, scale=1.3)]})
        ma = planete(0.32, MARS_C)
        L2 = self.lc([("Sur Mars, à", MARS_C), ("38 % ?", MARS_C)], 0.45, fs=40, xl=xl + 0.85)
        ma.next_to(L2, LEFT, buff=0.25)
        self.jouer(L2, ["Combien sur Mars", "38 %"], {0: [FadeIn(ma, scale=0.6)]})
        lu = planete(0.32, LUNE_C, "#6b7280")
        L3 = self.lc([("Sur la Lune, à", LUNE_C), ("16,5 % ?", LUNE_C)], -0.4, fs=40, xl=xl + 0.85)
        lu.next_to(L3, LEFT, buff=0.25)
        self.jouer(L3, ["Et sur la Lune", "16,5 %"], {0: [FadeIn(lu, scale=0.6)]})
        self.pause_defi(y=-1.5)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        xl = 0.6
        bm = self.barre(y=1.05, largeur=5.6, x=-3.1, h=0.7)
        pm = self.part_barre(bm, 3.8, MARS_C)
        am, tm = self.accolade(bm.bp.piste, "600 N", JAUNE_TITRE, fs=28)
        dm, sm = bm.dessous(pm, "228 N", VERT_OK, fs=28)
        nm = sans(self.t("Mars", 28, MARS_C)).next_to(bm, DOWN, buff=0.15).align_to(bm, RIGHT)
        L1 = self.lc([("Mars :", MARS_C), ("0,38 ×", AMBRE), ("600", JAUNE_TITRE)], 1.65, fs=40, xl=xl)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        self.au_mot("Mars")  # le titre et « Mars : » ensemble, au premier mot
        self.play(Write(tit), FadeIn(L1[0], shift=RIGHT * 0.15), FadeIn(bm, shift=UP * 0.2), FadeIn(nm), run_time=0.5)
        self.jouer(VGroup(L1[1], L1[2]), ["0,38 fois", "fois 600"],
                   {0: [FadeIn(pm)], 1: [GrowFromCenter(am), FadeIn(tm)]})
        L2 = self.lc([("=", WHITE), ("228 N", VERT_OK)], 0.9, fs=44, xl=xl + 1.4)
        self.jouer(L2, ["égale 228", None], {1: [GrowFromCenter(dm), FadeIn(sm, scale=1.3)]})
        self.play(Create(self.cadre(L2[1])), run_time=0.3)
        bl = self.barre(y=-1.45, largeur=5.6, x=-3.1, h=0.7)
        pl = self.part_barre(bl, 1.65, LUNE_C)
        al, tl = self.accolade(bl.bp.piste, "600 N", JAUNE_TITRE, fs=28)
        dl, sl = bl.dessous(pl, "99 N", VERT_OK, fs=28)
        nl = sans(self.t("Lune", 28, LUNE_C)).next_to(bl, DOWN, buff=0.15).align_to(bl, RIGHT)
        L3 = self.lc([("Lune :", LUNE_C), ("0,165 ×", AMBRE), ("600", JAUNE_TITRE)], -0.85, fs=40, xl=xl)
        self.jouer(L3, ["Lune", "0,165 fois", ("fois 600", 2)],
                   {0: [FadeIn(bl, shift=UP * 0.2), FadeIn(nl)], 1: [FadeIn(pl)], 2: [GrowFromCenter(al), FadeIn(tl)]})
        L4 = self.lc([("=", WHITE), ("99 N", VERT_OK)], -1.6, fs=44, xl=xl + 1.4)
        self.jouer(L4, ["égale 99", None], {1: [GrowFromCenter(dl), FadeIn(sl, scale=1.3)]})
        self.play(Create(self.cadre(L4[1])), run_time=0.3)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        b = BarreCent("", largeur=4.4, h=0.6, centre=P(-4.0, 0.3))
        for m in b.morceaux[:9]:
            m.set_fill(BLEU_C, 1)
        b.morceaux[9].set_fill(RESTE, 1)
        at, tt = self.accolade(b.bp.piste, "le tout", JAUNE_TITRE, fs=28)
        ap, tp = self.accolade(VGroup(*b.morceaux[:9]), "partie", BLEU_C, DOWN, fs=26)
        ar, trr = self.accolade(b.morceaux[9], "reste", RESTE, DOWN, fs=26)
        trr.next_to(ar, DOWN, buff=0.4)
        fig = sans(VGroup(b, at, tt, ap, tp, ar, trr))
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Une partie : on multiplie le tout", "par le taux écrit en décimal."),
            ("Ce qui manque :", "100 % − le taux."),
            ("Partie + reste = le tout.",)], fs=36)
        self.au_mot("Pour calculer")
        self.montrer_ligne(lignes[0], Indicate(VGroup(*b.morceaux[:9]), color=VERT_OK))
        self.au_mot("Ce qui manque")
        l2 = lignes[1]
        self.play(Create(l2[0]), FadeIn(l2[1][0], shift=RIGHT * 0.2), Indicate(b.morceaux[9], color=VERT_OK),
                  run_time=0.5)
        l2[1][1].sans_synchro = True  # « 100 % − le taux. » : posé à « 100 moins » (le taux revient ensuite)
        self.au_mot("100 moins")
        self.play(FadeIn(l2[1][1], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("Et partie")
        self.montrer_ligne(lignes[2], Circumscribe(b.bp.piste, color=VERT_OK, buff=0.06))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_tout()
        self.ecran_calcul()
        self.ecran_surprise()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class PropLyceePartieToutPremiere(PropLyceePartieToutBase):
    identite = "Maths 1re — EleveAI"
    ceinture = "jaune"
