# prop_coefficient.py
# EleveAI — Maths 4e — série « Proportionnalité », lot 5 (une paysage par
# micro), épisode 23 : COEFFICIENT ET PASSAGE À L'UNITÉ (micro du coach :
# prop_coeff, notion prop_proportionnalite), AVEC VOIX. Paysage 16:9, CEINTURE
# VERTE. PAYSAGE SEULEMENT (le short de la micro existe déjà : 4e-prop-*-short-*).
# ⭐ Méthodes travaillées : le PASSAGE À L'UNITÉ (figure Unite : 3 L → 1 L → 5 L,
# « ÷ 3 » puis « × 5 ») et le COEFFICIENT (flèche latérale « × 12 » du haut vers
# le bas, avec son unité 12 m²/L ; « ÷ 12 » pour remonter). Pas de produit en
# croix (réservé à l'épisode 24) ; « ÷ » écrit, jamais 5/2.
# ⭐ Fil rouge (erreur 3) : INVERSER LE COEFFICIENT (multiplier au lieu de
# diviser pour remonter : 84 × 12 = 1 008 L barré, écran 06 ; question 2 :
# 360 L = 30 × 12). Erreur 1 (ajouter / soustraire) : question 1, 44 = 48 − 4
# (barré quand la voix dit « on ne soustrait pas ») ; question 2, 18 = 30 − 12.
# Question 1, C : 192 = 48 × 4 (inverser l'opération).
#
# Décor et métier : Yasmine, PEINTRE EN BÂTIMENT (ses pots, son rouleau, sa
# camionnette, un salon, un couloir) ; la piscine de peinture du piège.
# Centres d'intérêt : art-design (« construction » est une précision de jeux-video).
# Chiffre réel (WebSearch, 01/11/2026) : 12 m²/L par couche = rendement courant
# d'une peinture murale (Castorama « calculer votre besoin en peinture » : 5 à
# 20 m²/L selon le produit ; Levis Mur Velours 11 m²/L ; Brico.be Perfection
# ultra couvrant 12 m²/L ; 99DECO velours 12 à 14 m²/L). 9 m²/L (défi) :
# peinture moins couvrante (fiches Finess SPS : 7 à 9 m²/L). Le reste inventé.
#
# Écrans : 00 garde · 01 Yasmine, 3 L → 36 m², 5 L → ? · 02 passage à l'unité
# (Unite 3 → 1 → 5) · 03 le coefficient × 12 dans le tableau, 12 m²/L ·
# 04 QUESTION 1 (48 ÷ 4) · 05 l'autre sens (84 m² ÷ 12 = 7 L) · 06 le piège
# 84 × 12 = 1 008 L (piscine) · 07 QUESTION 2 (30 ÷ 12 = 2,5 L) · 08 défi du
# couloir · 08b correction · 09 ce que tu as appris · 10 fin.
#
# Voix : manim/voix/4e-prop-coefficient.json (validée par Frédéric le 01/11,
# débit −10), WAV dans public/sons/4e-prop-coefficient/ ; marques mot à mot :
# manim/scripts/4e/prop_coefficient_marques.json (scripts/marques_dump.ps1
# puis le convertisseur « une marque par occurrence » de l'agent 19).
# Outils : manim/scripts/6e/prop_commun.py + manim/canvas_proportion.py (non
# modifiés) ; base PropTableauBase de manim/scripts/4e/prop_tableau.py
# (épisode 21 : ligne_rep bornée, lc, jouer, _disposer_q coche loin du texte,
# choix non audités à la réponse) ; ss() de manim/scripts/6e/prop_unite.py.
# Ajouté ICI : yasmine(), pot(), rouleau(), mur(), camionnette(), piscine().
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/prop_coefficient.py PropCoefficient4e
# PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/4e/prop_coefficient.py PropCoefficient4e -o eleveai-maths-4e-prop-coefficient --media_dir manim/media-prop-4e-23
# Sortie : manim/sorties/4e/maths/proportionnalite/23-coefficient/eleveai-maths-4e-prop-coefficient.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

import importlib.util  # noqa: E402

from prop_commun import *  # noqa: E402,F403


def _charger(nom, chemin):
    spec = importlib.util.spec_from_file_location(nom, chemin)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_ICI = Path(__file__).resolve().parent
_t4 = _charger("prop_tableau_4e", _ICI / "prop_tableau.py")    # épisode 21 (4e)
_u6 = _charger("prop_unite_6e", _ICI.parents[0] / "6e" / "prop_unite.py")
PropTableauBase4e, plus_bas, ss = _t4.PropTableauBase, _t4.plus_bas, _u6.ss

PEINT = "#14b8a6"      # la peinture de Yasmine (turquoise)
PEINT_F = "#0f766e"
MUR = "#e7e5e4"
BLANC_P = "#f8fafc"


def rouleau(s=1.0, couleur=PEINT):
    """Un rouleau de peintre : manchon coloré, monture et manche."""
    manchon = RoundedRectangle(width=0.9, height=0.32, corner_radius=0.12, fill_color=couleur, fill_opacity=1,
                               stroke_color=PEINT_F, stroke_width=2)
    monture = VGroup(Line(P(0.45, 0), P(0.6, 0), color=GREY_B, stroke_width=5),
                     Line(P(0.6, 0), P(0.6, -0.45), color=GREY_B, stroke_width=5))
    manche = RoundedRectangle(width=0.14, height=0.55, corner_radius=0.06, fill_color="#92400e", fill_opacity=1,
                              stroke_width=0).move_to(P(0.6, -0.72))
    return VGroup(monture, manche, manchon).scale(s)


def yasmine(s=1.0):
    """Yasmine, peintre en bâtiment : combinaison blanche tachée, casquette."""
    p = personne(peau="#8d5524", tenue=BLANC_P, cheveux="#111827", longs=True)
    c, r = p.tete.get_center(), p.tete.width / 2
    casq = VGroup(AnnularSector(inner_radius=0, outer_radius=r * 1.08, angle=PI, start_angle=0, fill_color=PEINT,
                                fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.55),
                  RoundedRectangle(width=r * 1.3, height=r * 0.2, corner_radius=0.04, fill_color=PEINT_F,
                                   fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.32 + RIGHT * r * 0.75))
    taches = VGroup(*[Circle(radius=rr, fill_color=PEINT, fill_opacity=1, stroke_width=0).move_to(p.corps.get_center() + d)
                      for rr, d in ((0.08, P(-0.25, 0.2)), (0.06, P(0.3, -0.35)), (0.07, P(0.05, -0.7)))])
    bretelles = VGroup(*[Line(p.corps.get_top() + RIGHT * x, p.corps.get_top() + RIGHT * x * 0.7 + DOWN * 0.6,
                              color="#cbd5e1", stroke_width=4) for x in (-0.3, 0.3)])
    ro = rouleau(0.75).move_to(p.corps.get_right() + P(0.2, 0.35))
    p.add(bretelles, taches, casq, ro)
    return p.scale(s)


def pot(s=1.0, couleur=PEINT):
    """Un pot de peinture (sans nombre) : seau, anse, coulure."""
    corps = Rectangle(width=1.0, height=1.05, fill_color="#94a3b8", fill_opacity=1, stroke_color="#475569",
                      stroke_width=3)
    bande = Rectangle(width=1.0, height=0.42, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(corps)
    dessus = Ellipse(width=1.0, height=0.26, fill_color=couleur, fill_opacity=1, stroke_color="#475569",
                     stroke_width=3).move_to(corps.get_top())
    anse = Arc(radius=0.5, start_angle=0, angle=PI, color="#475569", stroke_width=4).move_to(
        corps.get_top() + UP * 0.28)
    coul = RoundedRectangle(width=0.14, height=0.4, corner_radius=0.07, fill_color=couleur, fill_opacity=1,
                            stroke_width=0).move_to(corps.get_top() + P(0.25, -0.2))
    return VGroup(anse, corps, bande, dessus, coul).scale(s)


def mur(l=3.4, h=2.2, part=0.0, couleur=PEINT):
    """Un pan de mur en briques claires, peint sur la fraction `part` (gauche)."""
    fond = Rectangle(width=l, height=h, fill_color=MUR, fill_opacity=1, stroke_color="#a8a29e", stroke_width=3)
    joints = VGroup(*[Line(fond.get_left() + UP * y, fond.get_right() + UP * y, color="#d6d3d1", stroke_width=2)
                      for y in np.arange(-h / 2 + 0.36, h / 2, 0.36)])
    g = VGroup(fond, joints)
    if part > 0:
        g.add(Rectangle(width=l * part, height=h, fill_color=couleur, fill_opacity=0.9, stroke_width=0)
              .align_to(fond, LEFT).align_to(fond, DOWN))
    g.fond = fond
    return g


def camionnette(s=1.0):
    """La camionnette de Yasmine (sans texte)."""
    caisse = RoundedRectangle(width=2.6, height=1.25, corner_radius=0.12, fill_color=BLANC_P, fill_opacity=1,
                              stroke_color="#94a3b8", stroke_width=3)
    cab = Polygon(P(1.3, -0.62), P(2.15, -0.62), P(2.15, 0.05), P(1.85, 0.45), P(1.3, 0.45), fill_color=BLANC_P,
                  fill_opacity=1, stroke_color="#94a3b8", stroke_width=3)
    vitre = Polygon(P(1.45, 0.0), P(1.95, 0.0), P(1.75, 0.32), P(1.45, 0.32), fill_color="#7dd3fc", fill_opacity=1,
                    stroke_width=0)
    trait = Rectangle(width=2.4, height=0.16, fill_color=PEINT, fill_opacity=1, stroke_width=0).move_to(P(0, -0.15))
    roues = VGroup(*[VGroup(Circle(radius=0.27, fill_color="#1f2937", fill_opacity=1, stroke_width=0),
                            Circle(radius=0.1, fill_color=GREY_B, fill_opacity=1, stroke_width=0)).move_to(P(x, -0.66))
                     for x in (-0.75, 1.65)])
    return VGroup(caisse, cab, vitre, trait, roues).scale(s)


def piscine(s=1.0, couleur=PEINT):
    """Une piscine… remplie de peinture (le piège)."""
    bord = RoundedRectangle(width=3.0, height=1.3, corner_radius=0.15, fill_color="#e2e8f0", fill_opacity=1,
                            stroke_width=0)
    bain = RoundedRectangle(width=2.7, height=1.0, corner_radius=0.1, fill_color=couleur, fill_opacity=1,
                            stroke_width=0)
    vagues = VGroup(*[FunctionGraph(lambda x: 0.04 * np.sin(6 * x), x_range=[-1.2, 1.2], color=WHITE,
                                    stroke_width=2).shift(UP * y) for y in (-0.25, 0.15)])
    echelle = VGroup(*[Line(P(x, 0.75), P(x, 0.3), color=GREY_B, stroke_width=4) for x in (1.0, 1.25)])
    return VGroup(bord, bain, vagues, echelle).scale(s)


class PropCoefficientBase(PropTableauBase4e):
    nom_voix = "4e-prop-coefficient"
    fichier_marques = "prop_coefficient_marques.json"
    LIBS = ["Peinture (L)", "Surface (m²)"]
    VALS = [[3, 5], [36, 60]]
    X0 = -1.2

    def table_p(self, vals, centre, lc=1.7, ll=3.2, fs=40):
        return TableauProp(self.LIBS, vals, montrer=False, largeur_case=lc, largeur_libelle=ll, hauteur=0.9, fs=fs,
                           centre=centre)

    def titre_haut(self, s, mot, couleur=JAUNE_TITRE, fs=42, x=-0.4):
        self.au_mot(mot)
        tit = self.t(s, fs, couleur).move_to(P(x, 3.1))
        self.play(Write(tit), run_time=0.5)
        return tit

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Coefficient et passage à l'unité", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("Coefficient")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        tb = TableauProp(self.LIBS, [["?", "?"], ["?", "?"]], montrer=True, largeur_case=1.2, largeur_libelle=2.8,
                         hauteur=0.75, fs=34, centre=P(-0.4, 0.35))
        fl = self.muet(tb.fleche_lat("× ?"))
        self.play(FadeIn(tb, shift=UP * 0.2), run_time=0.5)
        self.au_mot("Les murs")
        deco = VGroup(pot(0.9), rouleau(1.1)).arrange(DOWN, buff=0.35).move_to(P(-5.2, 0.35))
        m = mur(2.2, 1.6, 0.6).move_to(P(4.6, 0.35))
        self.play(FadeIn(deco, scale=0.7), FadeIn(m, shift=LEFT * 0.2), Create(fl.fleche), FadeIn(fl.etiquette),
                  run_time=0.6)
        self.au_mot("Yasmine")
        nom = self.t("Les murs de Yasmine", 34, AMBRE).next_to(tb.carte, DOWN, buff=0.3)
        self.play(FadeIn(nom, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 01 : Yasmine, peintre en bâtiment ───────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = yasmine(1.0).move_to(P(-5.5, -0.9))
        self.au_mot("Voici Yasmine")
        nom = self.t("Yasmine", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.3)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("peintre en")
        met = VGroup(self.t("peintre", 30, BLEU_CALCUL), self.t("en bâtiment", 30, BLEU_CALCUL)).arrange(DOWN, buff=0.08)
        met.next_to(pers, DOWN, buff=0.15)
        met.shift(RIGHT * max(0, -6.4 - met.get_left()[0]))
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        p3 = VGroup(*[pot(0.55) for _ in range(3)]).arrange(RIGHT, buff=0.15).move_to(P(-1.3, 1.85))
        l1 = self.ligne([("3 L", WHITE), ("→", WHITE), ("36 m²", AMBRE)], 40).move_to(P(-1.3, 0.75))
        m = mur(2.9, 1.9, 0.0).move_to(P(3.6, 1.35))
        peint = Rectangle(width=2.9, height=1.9, fill_color=PEINT, fill_opacity=0.75, stroke_width=0).move_to(m)
        self.au_mot("Avec 3 litres")
        self.play(LaggedStart(*[FadeIn(x, shift=DOWN * 0.2) for x in p3], lag_ratio=0.2), FadeIn(l1[0]),
                  FadeIn(m, shift=LEFT * 0.2), run_time=0.6)
        self.au_mot("36 mètres")
        self.play(FadeIn(l1[1]), FadeIn(l1[2], scale=1.3), GrowFromEdge(peint, LEFT), run_time=0.6)
        self.insister(l1[2], 1.12, 0.2)
        self.au_mot("camionnette")
        van = camionnette(0.95).move_to(P(-1.9, -1.55))
        self.play(FadeIn(van, shift=RIGHT * 0.4), run_time=0.5)
        l2 = self.ligne([("5 L", WHITE), ("→", WHITE), ("? m²", ORANGE_RETENUE)], 40).move_to(P(2.6, -1.55))
        l2[2].sans_synchro = True
        p5 = VGroup(*[pot(0.42) for _ in range(5)]).arrange(RIGHT, buff=0.1).next_to(l2, UP, buff=0.3)
        self.au_mot("5 litres")
        self.play(LaggedStart(*[FadeIn(x, shift=DOWN * 0.2) for x in p5], lag_ratio=0.15), FadeIn(l2[0]),
                  FadeIn(l2[1]), run_time=0.6)
        self.au_mot("Quelle surface")
        self.play(FadeIn(l2[2], scale=1.3), run_time=0.4)
        self.play(Circumscribe(l2[2], color=AMBRE, buff=0.12), run_time=0.8)
        self.attendre_voix()

    # ── 02 : première méthode, le passage à l'unité ─────────────────────────
    def ecran_unite(self):
        self.ecran("02-unite")
        self.titre_haut("Première méthode : le passage à l'unité", "Première méthode", fs=40)
        u = ss(self.cadrer(Unite(3, 36, 5, "litres", "m²", fs=38, ecart=1.2), gauche=-6.3, droite=0.4, haut=2.1,
                           bas=-1.6))
        L = u.lignes
        c1 = self.ligne([("36 ÷", WHITE), ("3 =", WHITE), ("12 m²", VERT_OK)], 40)
        self.col(c1, 0.75, xl=1.4)
        c2 = self.ligne([("12 ×", WHITE), ("5 =", WHITE), ("60 m²", VERT_OK)], 40)
        self.col(c2, -0.75, xl=1.4)
        self.au_mot("3 litres couvrent")
        self.play(FadeIn(L[0][0], shift=RIGHT * 0.2), FadeIn(L[0][1]), run_time=0.4)
        self.au_mot("36 mètres")
        self.play(FadeIn(L[0][2], scale=1.3), run_time=0.4)
        self.au_mot("1 litre couvre")
        self.play(FadeIn(L[1][0], shift=RIGHT * 0.2), FadeIn(L[1][1]), run_time=0.4)
        self.au_mot("3 fois moins")
        self.play(Create(u.fl_q[0][0]), Create(u.fl_v[0][0]), FadeIn(u.fl_q[0][1]), FadeIn(u.fl_v[0][1]),
                  run_time=0.5)
        self.jouer(c1, ["36 divisé", "par 3", "12 mètres"], extra={2: [FadeIn(L[1][2], scale=1.3)]})
        self.au_mot("5 litres couvrent")
        self.play(FadeIn(L[2][0], shift=RIGHT * 0.2), FadeIn(L[2][1]), run_time=0.4)
        self.au_mot("5 fois plus")
        self.play(Create(u.fl_q[1][0]), Create(u.fl_v[1][0]), FadeIn(u.fl_q[1][1]), FadeIn(u.fl_v[1][1]),
                  run_time=0.5)
        self.jouer(c2, ["12 fois", "5, égale", "60 mètres"], extra={2: [FadeIn(L[2][2], scale=1.3)]})
        self.insister(c2[2], 1.15, 0.2)
        self.attendre_voix()

    # ── 03 : deuxième méthode, le coefficient × 12 (12 m²/L) ────────────────
    def ecran_coefficient(self):
        self.ecran("03-coefficient")
        self.titre_haut("Deuxième méthode : le coefficient", "Deuxième méthode", fs=40)
        xc = -1.2
        tb = self.table_p(self.VALS, P(xc, 1.45))
        fl = tb.fleche_lat("× 12")
        self.au_mot("tableau")
        self.play(FadeIn(tb.fond, shift=UP * 0.2), FadeIn(tb.trou(0, 1)), FadeIn(tb.trou(1, 1)), run_time=0.5)
        self.au_mot("en haut")
        self.play(Indicate(tb.libelles[0], color=AMBRE, scale_factor=1.2), run_time=0.6)
        self.au_mot("en bas")
        self.play(Indicate(tb.libelles[1], color=AMBRE, scale_factor=1.2), run_time=0.6)
        self.au_mot("de 3")
        self.play(FadeIn(tb.valeur(0, 0), scale=1.4), tb.allumer(0, 0), run_time=0.35)
        self.au_mot("36, on")
        self.play(FadeIn(tb.valeur(1, 0), scale=1.4), tb.allumer(1, 0), run_time=0.35)
        self.au_mot("on multiplie")
        self.play(Create(fl.fleche), run_time=0.5)
        self.au_mot("par 12")
        self.play(FadeIn(fl.etiquette, scale=1.4), tb.eteindre(0, 0), tb.eteindre(1, 0), run_time=0.35)
        self.au_mot("Ce 12")
        self.play(Indicate(fl.etiquette, color=AMBRE, scale_factor=1.5), run_time=0.7)
        self.au_mot("c'est le coefficient")
        v = self.tampon("coefficient de proportionnalité", AMBRE, 36).move_to(P(xc, -0.35))
        self.play(FadeIn(v, scale=1.3), run_time=0.45)
        self.insister(v, 1.08, 0.25)
        un = self.ligne([("Son unité :", WHITE), ("12 m²/L", AMBRE)], 38).move_to(P(xc, -1.4))
        self.au_mot("Il a une unité")
        self.play(FadeIn(un[0], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("12 mètres carrés par")
        self.play(FadeIn(un[1], scale=1.3), run_time=0.4)
        self.play(Circumscribe(un[1], color=AMBRE, buff=0.12), run_time=0.8)
        c = self.lc([("5 ×", WHITE), ("12 =", FLECHE_K), ("60 m²", VERT_OK)], -2.4, fs=40, x=xc)
        self.jouer(c, ["5 fois", "12, égale", "60 mètres"],
                   extra={0: [tb.remplir(0, 1, 5), tb.allumer(0, 1)], 2: [tb.remplir(1, 1, 60)]})
        self.play(tb.eteindre(0, 1), tb.allumer(1, 1), run_time=0.3)
        self.insister(c[2], 1.15, 0.2)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (4 L → 48 m² : le coefficient ?) ────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        p4 = VGroup(*[pot(0.6) for _ in range(4)]).arrange_in_grid(2, 2, buff=0.25)
        deco = VGroup(yasmine(0.9).move_to(P(-5.6, -1.0)), p4.move_to(P(-2.8, 0.4)))
        self.add(deco)
        tb = self.table_p([[4], [48]], P(-3.7, 0.9), lc=1.5, ll=3.0, fs=38)
        fl = tb.fleche_lat("× 12")

        def apres(sc):
            sc.play(FadeOut(deco), FadeIn(tb.fond), run_time=0.3)
            l0 = sc.ligne_rep(0, ["48 ÷", "4 =", "12 m²/L."])
            l1 = sc.ligne_rep(1, ["On divise,"])
            l2 = sc.ligne_rep(2, ["on ne soustrait pas."])
            faux = self.ligne([("48 −", ROUGE_P), ("4 =", ROUGE_P), ("44", ROUGE_P)], 36).move_to(P(-3.7, -0.7))
            for f in faux:
                f._pas_audit = f.sans_synchro = True  # le leurre B, rappelé et barré
            sc.au_mot("48 divisé")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), FadeIn(tb.valeur(1, 0), scale=1.4), run_time=0.3)
            sc.au_mot("par 4")
            sc.play(FadeIn(l0[1], shift=UP * 0.15), FadeIn(tb.valeur(0, 0), scale=1.4), run_time=0.3)
            sc.au_mot("égale 12")
            sc.play(FadeIn(l0[2], scale=1.3), Create(fl.fleche), FadeIn(fl.etiquette, scale=1.3), run_time=0.4)
            sc.au_mot("On divise")
            sc.play(FadeIn(l1[0], shift=UP * 0.15), Indicate(fl.etiquette, color=AMBRE), run_time=0.4)
            sc.au_mot("on ne soustrait")
            sc.play(FadeIn(l2[0], shift=UP * 0.15), FadeIn(faux, shift=UP * 0.15), run_time=0.35)
            sc.play(Create(croix(faux, sw=7)), run_time=0.35)
            sc.rep_fini()

        self.question_pause("04-question", "04b-reponse",
                            ["Avec 4 L : 48 m².", "Quel est le coefficient ?"],
                            [self.t("12 m²/L", 34), self.t("44 m²/L", 34), self.t("192 m²/L", 34)], 0,
                            ["48 ÷ 4 = 12 m²/L.", "On divise,", "on ne soustrait pas."], mot_q="4 litres",
                            autres_r=apres)

    # ── 05 : l'autre sens : 84 m² ÷ 12 = 7 L ────────────────────────────────
    def ecran_retour(self):
        self.ecran("05-retour")
        self.titre_haut("Et dans l'autre sens ?", "Et dans")
        xc = -0.6
        tb = self.table_p([[3, 5, "?"], [36, 60, 84]], P(xc, 1.35), lc=1.4, ll=2.9, fs=38)
        bas = tb.fleche_lat("× 12")
        haut = tb.fleche_lat("÷ 12", sens="haut", cote=LEFT, couleur=FLECHE_COL)
        self.add(tb.fond, bas, tb.trou(0, 2), tb.trou(1, 2), *[tb.valeur(r, c) for r in (0, 1) for c in (0, 1)])
        self.au_mot("Le salon")
        sal = mur(2.2, 1.3, 0.5).move_to(P(-4.7, -1.75))
        nom = self.t("Le salon", 32, AMBRE).next_to(sal, UP, buff=0.15)
        self.play(FadeIn(sal, shift=UP * 0.2), FadeIn(nom), run_time=0.45)
        self.au_mot("84 mètres")
        self.play(tb.remplir(1, 2, 84), tb.allumer(1, 2), run_time=0.4)
        self.au_mot("Pour remonter")
        self.play(Create(haut.fleche), run_time=0.6)
        self.au_mot("par le coefficient")
        self.play(Indicate(bas.etiquette, color=AMBRE, scale_factor=1.4), run_time=0.7)
        c = self.lc([("84 ÷", WHITE), ("12 =", FLECHE_COL), ("7 L", VERT_OK)], -0.75, fs=42, x=xc + 0.6)
        self.jouer(c, ["84 divisé", "par 12", "7 litres"],
                   extra={1: [FadeIn(haut.etiquette, scale=1.4)], 2: [tb.remplir(0, 2, 7)]})
        self.play(tb.eteindre(1, 2), tb.allumer(0, 2), run_time=0.3)
        self.insister(c[2], 1.15, 0.2)
        self.attendre_voix()

    # ── 06 : le piège : 84 × 12 = 1 008 L (une piscine de peinture) ─────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.titre_haut("Attention au piège !", "Attention", couleur=ROUGE_ERREUR, fs=44)
        tb = self.table_p([["?"], [84]], P(-3.3, 1.3), lc=2.4, ll=2.8, fs=38)
        v84 = tb.valeur(1, 0)
        self.add(tb.fond, tb.trou(0, 0), v84)  # le salon, dit à l'écran 05
        faux = tb.fleche_lat("× 12", sens="haut", couleur=ROUGE_P)
        lg = self.ligne([("84 ×", ROUGE_P), ("12 =", ROUGE_P), ("1 008 L", ROUGE_P)], 42)
        lg.move_to(P(2.9, 0.1))
        self.au_mot("Beaucoup multiplient")
        self.play(Create(faux.fleche), run_time=0.5)
        self.jouer(lg, ["84 fois", "12, égale", "1 008 litres"],
                   extra={1: [FadeIn(faux.etiquette, scale=1.3)], 2: [tb.remplir(0, 0, 1008, couleur=ROUGE_P)]})
        self.au_mot("Une piscine")
        pis = piscine(0.85).move_to(P(-3.3, -0.75))
        phr = self.t("Une piscine de peinture !", 32, ROUGE_ERREUR).next_to(pis, DOWN, buff=0.25)
        self.play(FadeIn(pis, scale=0.7), FadeIn(phr, shift=UP * 0.15), run_time=0.5)
        xf = croix(faux, sw=6)
        self.play(Create(croix(lg, sw=7)), Create(tb.barrer(0, 0)), Create(xf), run_time=0.45)
        self.au_mot("ligne du bas")
        self.play(Indicate(tb.libelles[1], color=AMBRE, scale_factor=1.2), run_time=0.6)
        self.au_mot("ligne du haut")
        self.play(Indicate(tb.libelles[0], color=AMBRE, scale_factor=1.2), run_time=0.6)
        bon = tb.fleche_lat("÷ 12", sens="haut", couleur=VERT_OK)  # à la place de la fausse (à gauche : hors cadre)
        self.au_mot("l'opération inverse")
        self.play(FadeOut(VGroup(faux, xf)), run_time=0.3)
        self.play(Create(bon.fleche), run_time=0.5)
        v = self.ligne([("Du bas vers le haut :", WHITE), ("÷ 12", VERT_OK)], 40).move_to(P(2.4, -1.4))
        self.au_mot("divise par 12")
        self.play(FadeIn(v[0], shift=RIGHT * 0.2), FadeIn(v[1], scale=1.3), FadeIn(bon.etiquette, scale=1.3),
                  run_time=0.4)
        self.insister(v[1], 1.2, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (12 m²/L ; 30 m² → ? L) ─────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        deco = VGroup(yasmine(0.9).move_to(P(-5.6, -1.0)), mur(2.4, 1.6, 0.4).move_to(P(-2.7, 0.3)))
        self.add(deco)
        tb = self.table_p([["?"], [30]], P(-3.7, 0.9), lc=1.5, ll=3.0, fs=38)
        fl = tb.fleche_lat("÷ 12", sens="haut", couleur=FLECHE_COL)

        def apres(sc):
            sc.play(FadeOut(deco), FadeIn(tb.fond), FadeIn(tb.trou(0, 0)), run_time=0.3)
            l0 = sc.ligne_rep(0, ["On remonte :"])
            l1 = sc.ligne_rep(1, ["30 ÷", "12 =", "2,5 L."])
            sc.au_mot("On remonte")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), Create(fl.fleche), run_time=0.4)
            sc.au_mot("vers les litres")
            sc.play(Indicate(tb.libelles[0], color=AMBRE), run_time=0.4)
            sc.au_mot("30 divisé")
            sc.play(FadeIn(l1[0], shift=UP * 0.15), FadeIn(tb.valeur(1, 0), scale=1.4), run_time=0.3)
            sc.au_mot("par 12")
            sc.play(FadeIn(l1[1], shift=UP * 0.15), FadeIn(fl.etiquette, scale=1.3), run_time=0.3)
            sc.au_mot("2,5 litres")
            sc.play(FadeIn(l1[2], scale=1.3), tb.remplir(0, 0, 2.5), run_time=0.4)
            sc.play(tb.allumer(0, 0), run_time=0.3)
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse",
                            ["Coefficient : 12 m²/L.", "Combien de litres", "pour 30 m² ?"],
                            [self.t("360 L", 34), self.t("2,5 L", 34), self.t("18 L", 34)], 1,
                            ["On remonte :", "30 ÷ 12 = 2,5 L."], mot_q="Le coefficient",
                            autres_r=apres)

    # ── 08 : défi : le couloir (2 L → 18 m² ; 45 m² → ? L) ─────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.titre_haut("À toi de jouer !", "À toi de jouer", fs=50)
        tb = self.table_p([[2, "?"], [18, 45]], P(self.X0, 1.45), lc=1.8, ll=3.2, fs=40)
        self.play(FadeIn(tb.fond, shift=UP * 0.2), FadeIn(tb.trou(0, 0)), FadeIn(tb.trou(1, 0)),
                  FadeIn(tb.trou(1, 1)), FadeIn(tb.trou(0, 1)), run_time=0.5)
        self.au_mot("Une autre peinture")
        po = pot(1.0, "#f97316").move_to(P(-5.3, -0.9))
        self.play(FadeIn(po, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("2 litres")
        self.play(tb.remplir(0, 0, 2), run_time=0.35)
        self.au_mot("18 mètres")
        self.play(tb.remplir(1, 0, 18), run_time=0.35)
        self.au_mot("Combien de litres")
        self.play(Indicate(tb.trou(0, 1), color=AMBRE, scale_factor=1.3), run_time=0.6)
        self.au_mot("un couloir")
        cou = mur(5.2, 0.9, 0.0, "#f97316").move_to(P(self.X0, -0.6))
        ncou = self.t("Le couloir", 32, "#f97316").next_to(cou, DOWN, buff=0.15)
        self.play(FadeIn(cou, shift=RIGHT * 0.3), FadeIn(ncou), run_time=0.45)
        self.au_mot("45 mètres")
        self.play(tb.remplir(1, 1, 45), run_time=0.35)
        self.pause_defi(y=-1.75)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tb = self.table_p([[2, "?"], [18, 45]], P(self.X0, 1.45), lc=1.8, ll=3.2, fs=40)
        self.add(tb.fond, tb.trou(0, 1), *[tb.valeur(r, c) for r, c in ((0, 0), (1, 0), (1, 1))])
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.2))
        self.play(Write(tit), run_time=0.5)
        fl = tb.fleche_lat("÷ 9", sens="haut", couleur=FLECHE_COL)
        l1 = self.lc([("1 L :", WHITE), ("18 ÷", WHITE), ("2 =", WHITE), ("9 m²", VERT_OK)], -0.6, fs=40)
        self.jouer(l1, ["1 litre", "18 divisé", "par 2", "9 mètres"],
                   extra={1: [tb.allumer(1, 0)], 2: [tb.allumer(0, 0)]})
        self.play(tb.eteindre(0, 0), tb.eteindre(1, 0), run_time=0.3)
        self.au_mot("Pour 45")
        self.play(tb.allumer(1, 1), Create(fl.fleche), run_time=0.45)
        l2 = self.lc([("45 ÷", WHITE), ("9 =", FLECHE_COL), ("5 L", VERT_OK)], -1.7, fs=40)
        self.jouer(l2, ["45 divisé", "par 9", "5 litres"],
                   extra={1: [FadeIn(fl.etiquette, scale=1.3)], 2: [tb.remplir(0, 1, 5)]})
        self.play(tb.eteindre(1, 1), tb.allumer(0, 1), run_time=0.3)
        self.insister(l2[2], 1.15, 0.2)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        tb = self.table_p(self.VALS, ORIGIN, lc=1.2, ll=2.7, fs=34)
        bas = tb.fleche_lat("× 12")
        fig = VGroup(tb.fond, *[tb.valeur(r, c) for r in (0, 1) for c in (0, 1)], bas)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Passage à l'unité :", "la valeur pour 1,", "puis on multiplie."),
            ("Coefficient : on multiplie", "la ligne du haut pour obtenir", "celle du bas, avec son unité."),
            ("Pour remonter, on divise", "par le coefficient.")], fs=36)
        self.au_mot("Le passage")
        self.montrer_ligne(lignes[0])
        self.au_mot("Le coefficient")
        self.montrer_ligne(lignes[1], Indicate(bas, color=FLECHE_K))
        self.au_mot("Pour remonter")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_unite()
        self.ecran_coefficient()
        self.ecran_question1()
        self.ecran_retour()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class PropCoefficient4e(PropCoefficientBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"
