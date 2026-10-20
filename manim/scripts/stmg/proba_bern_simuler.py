# proba_bern_simuler.py
# EleveAI — Maths STMG — série « Probabilités », épisode 32 : SIMULER N
# échantillons de taille n d'une loi de Bernoulli avec Python (micro :
# va_bern_simuler, notion va_bernoulli), AVEC VOIX.
# Paysage 16:9, CEINTURE BLEUE. Short jumeau : proba_bern_simuler_short.py
# (ceinture jaune).
#
# ⭐ La banque du coach (lib/tutor-v4/questionBank/stmg/maths/
# variables-aleatoires.bank.ts, gabarits stmg_va_bern_simuler_tpl_1 et _2)
# n'a PAS de canvas pour cette micro : elle montre le test `random() < p` et
# les deux compteurs emboîtés (N échantillons de taille n). La figure est donc
# l'ÉDITEUR PYTHON de la 2de (manim/scripts/seconde/proba2_simulation.py,
# importé par son chemin exact : Consolas, indentation refaite à la main,
# ligne exécutée allumée), puis un AXE où chaque fréquence tombe et s'empile.
#
# Écrans : 00 garde · 01 le site de vente : 30 % achètent, échantillons de 50
# visiteurs · 02 la fonction echantillon(n, p) ligne par ligne (n = 50,
# p = 0,3) · 03 la boucle de 100 répétitions ; 0,28 / 0,34 / 0,26 / 0,32
# tombent sur l'axe · 04 les 100 fréquences s'empilent autour de 0,3 ·
# 05 le piège : un seul échantillon (0,34) ne prouve rien · 06 défi :
# échantillons de 500 · 06b correction : le nuage se resserre · 07 ce que tu
# as appris · 08 fin (« Entraîne-toi sur eleveai.fr », « Abonne-toi ! »).
#
# Voix : manim/voix/stmg-proba-bern-simuler.json (débit −7).
# Rendu (depuis la racine du dépôt ; media à soi, sinon WinError 32) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_bern_simuler.py ProbaBernSimulerSTMG -o eleveai-maths-stmg-proba-bern-simuler --media_dir manim/scripts/stmg/media-bern_simuler
# Puis copier dans manim/sorties/stmg/maths/probabilites/32-bern-simuler/.

import importlib.util
import sys
from pathlib import Path

import numpy as np

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI.parents[1]))
sys.path.insert(0, str(ICI.parent / "seconde"))
sys.path.insert(0, str(ICI.parent / "premiere"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import suite  # noqa: E402


def _charger(chemin, nom_module):
    """Importe un module par son chemin EXACT (des noms se répètent ailleurs)."""
    if nom_module in sys.modules:
        return sys.modules[nom_module]
    spec = importlib.util.spec_from_file_location(nom_module, chemin)
    mod = importlib.util.module_from_spec(spec)
    sys.modules[nom_module] = mod
    spec.loader.exec_module(mod)
    return mod


# L'éditeur Python de la 2de, repris tel quel (on ne fait qu'ajouter, en
# mémoire, les mots-clés def / return et nos fonctions à sa coloration).
_sim = _charger(ICI.parent / "seconde" / "proba2_simulation.py", "seconde_proba2_simulation_editeur")
_sim.MOTS_CLES.update({"def", "return"})
_sim.FONCTIONS.update({"echantillon", "append"})
Editeur, code_txt = _sim.Editeur, _sim.code_txt
POLICE, C_NOMBRE, FOND_EDITEUR = _sim.POLICE, _sim.C_NOMBRE, _sim.FOND_EDITEUR
GRIS_ETEINT = _sim.GRIS_ETEINT

ACHAT = "#22C55E"       # un visiteur qui achète
POINT = "#60A5FA"       # une fréquence sur l'axe
DITE = "#FBBF24"        # une fréquence dite par la voix


def P(x, y):
    return np.array([x, y, 0.0])


# ── les 100 fréquences (échantillons de 50) et les 100 de 500 ──────────────
# Les quatre premières sont celles que dit la voix ; les autres viennent d'une
# simulation fixe (graine 32), pour que deux rendus donnent le même nuage.
_g = np.random.default_rng(32)
DITES = [0.28, 0.34, 0.26, 0.32]
FREQ50 = DITES + [round(float(v), 2) for v in _g.binomial(50, 0.3, 96) / 50]
FREQ500 = [round(float(v), 2) for v in _g.binomial(500, 0.3, 100) / 500]


# ── les dessins ─────────────────────────────────────────────────────────────

def visiteur(couleur=GREY_B, s=1.0):
    """Une petite silhouette : tête ronde et buste arrondi."""
    tete = Circle(radius=0.11, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(P(0, 0.17))
    buste = RoundedRectangle(width=0.3, height=0.2, corner_radius=0.09, fill_color=couleur, fill_opacity=1,
                             stroke_width=0).move_to(P(0, -0.07))
    return VGroup(tete, buste).scale(s)


def caddie(couleur=WHITE, s=1.0):
    """Un chariot de courses dessiné : poignée, panier, deux roues."""
    poignee = Line(P(-0.62, 0.42), P(-0.42, 0.42), color=couleur, stroke_width=5)
    panier = Polygon(P(-0.42, 0.42), P(0.5, 0.3), P(0.38, -0.08), P(-0.3, -0.08), stroke_color=couleur,
                     stroke_width=5)
    barres = VGroup(*[Line(P(-0.42 + 0.23 * k, 0.42 - 0.03 * k), P(-0.3 + 0.17 * k, -0.08), color=couleur,
                           stroke_width=2.5) for k in range(1, 4)])
    pied = Line(P(-0.3, -0.08), P(-0.22, -0.28), color=couleur, stroke_width=5)
    bas = Line(P(-0.22, -0.28), P(0.4, -0.28), color=couleur, stroke_width=5)
    roues = VGroup(*[Circle(radius=0.07, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(P(x, -0.4))
                     for x in (-0.16, 0.32)])
    return VGroup(poignee, panier, barres, pied, bas, roues).scale(s)


def site_vente(larg=4.6, haut=3.0):
    """Une fenêtre de navigateur : barre d'adresse, un article, un caddie et
    le bouton vert « Acheter »."""
    fond = RoundedRectangle(width=larg, height=haut, corner_radius=0.16, fill_color="#F8FAFC", fill_opacity=1,
                            stroke_color=GREY_B, stroke_width=2)
    barre = Rectangle(width=larg - 0.04, height=0.42, fill_color="#CBD5E1", fill_opacity=1, stroke_width=0)
    barre.align_to(fond, UP).shift(DOWN * 0.02)
    adresse = RoundedRectangle(width=larg * 0.6, height=0.24, corner_radius=0.1, fill_color=WHITE,
                               fill_opacity=1, stroke_width=0).move_to(barre)
    article = RoundedRectangle(width=1.5, height=1.5, corner_radius=0.12, fill_color="#FDE68A", fill_opacity=1,
                               stroke_color="#F59E0B", stroke_width=2)
    article.move_to(fond).shift(LEFT * larg * 0.22 + DOWN * 0.2)
    sac = VGroup(RoundedRectangle(width=0.8, height=0.7, corner_radius=0.08, fill_color="#F97316",
                                  fill_opacity=1, stroke_width=0),
                 Arc(radius=0.22, start_angle=0, angle=PI, color="#9A3412", stroke_width=5).shift(UP * 0.35))
    sac.move_to(article)
    lignes = VGroup(*[RoundedRectangle(width=w, height=0.13, corner_radius=0.06, fill_color="#94A3B8",
                                       fill_opacity=1, stroke_width=0) for w in (1.6, 1.2)])
    lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.16).move_to(fond).shift(RIGHT * larg * 0.2 + UP * 0.35)
    bouton = RoundedRectangle(width=1.6, height=0.5, corner_radius=0.12, fill_color=ACHAT, fill_opacity=1,
                              stroke_width=0)
    bouton.next_to(lignes, DOWN, buff=0.35).align_to(lignes, LEFT)
    mot = Text("Acheter", font_size=26, color=WHITE, weight=BOLD).move_to(bouton)
    g = VGroup(fond, barre, adresse, article, sac, lignes, bouton, mot)
    g.bouton = VGroup(bouton, mot)
    return g


class AxeFreq(VGroup):
    """L'axe des fréquences : chaque fréquence y tombe et s'empile sur les
    précédentes de même valeur. Aucune graduation chiffrée (seuls les
    nombres dits s'écrivent)."""

    def __init__(self, x0=-5.6, x1=4.2, y=-2.0, v0=0.1, v1=0.5, pas=0.16, r=0.075, **kw):
        super().__init__(**kw)
        self.x0, self.x1, self.y, self.v0, self.v1, self.pas, self.r = x0, x1, y, v0, v1, pas, r
        self.ligne = Arrow(P(x0 - 0.2, y), P(x1 + 0.35, y), buff=0, color=WHITE, stroke_width=3,
                           max_tip_length_to_length_ratio=0.03)
        self.traits = VGroup(*[Line(P(self.x(v), y - 0.08), P(self.x(v), y + 0.08), color=GREY_B, stroke_width=2)
                               for v in np.arange(v0, v1 + 1e-9, 0.05)])
        self.add(self.ligne, self.traits)
        self.compte = {}

    def x(self, v):
        return self.x0 + (v - self.v0) / (self.v1 - self.v0) * (self.x1 - self.x0)

    def point(self, v, color=POINT):
        """Le point de la fréquence v, à sa place dans la pile (non ajouté)."""
        cle = round(v, 2)
        k = self.compte.get(cle, 0)
        self.compte[cle] = k + 1
        return Dot(P(self.x(v), self.y + 0.03 + self.r + k * self.pas), radius=self.r, color=color)

    def repere(self, v, texte, color=JAUNE_TITRE, haut=2.6, fs=34):
        """Le trait vertical de v, son nombre au-dessus."""
        trait = DashedLine(P(self.x(v), self.y), P(self.x(v), self.y + haut), color=color, stroke_width=4,
                           dash_length=0.12)
        lbl = Text(texte, font_size=fs, color=color, weight=BOLD).next_to(trait, UP, buff=0.1)
        return VGroup(trait, lbl)

    def etiquette(self, v, texte, rang=0, color=DITE, fs=30):
        """Le nombre dit, sous l'axe (deux rangées pour ne pas se toucher)."""
        return Text(texte, font_size=fs, color=color, weight=BOLD).move_to(
            P(self.x(v), self.y - 0.38 - 0.42 * rang))

    def tomber(self, pts, run_time=1.0, lag=0.05):
        """Les points partent d'en haut et tombent à leur place."""
        anims = []
        for d in pts:
            cible = d.get_center()
            d.move_to(cible + UP * 1.4).set_opacity(0)
            anims.append(d.animate.move_to(cible).set_opacity(1))
        return LaggedStart(*anims, lag_ratio=lag, run_time=run_time)


CODE_F = [
    "def echantillon(n, p):",
    "    compteur = 0",
    "    for i in range(n):",
    "        if random() < p:",
    "            compteur = compteur + 1",
    "    return compteur / n",
]

CODE_R = [
    "frequences = []",
    "for k in range(100):",
    "    frequences.append(echantillon(50, 0.3))",
]


class ProbaBernSimulerBase(Notion6e):
    """Toutes les scènes ; la sous-classe ne change que l'identité."""

    nom_voix = "stmg-proba-bern-simuler"
    identite = "Maths — EleveAI"
    ceinture = "bleue"

    # ── petits outils ───────────────────────────────────────────────────────

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.3):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR, sw=6):
        return Line(mob.get_left() + LEFT * 0.1, mob.get_right() + RIGHT * 0.1, color=color, stroke_width=sw)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Simuler des échantillons", 54, JAUNE_TITRE).to_edge(UP, buff=0.55)
        sous = self.t("avec Python", 42, BLEU_CALCUL).next_to(titre, DOWN, buff=0.2)
        identite = self.t(self.identite, 28).next_to(sous, DOWN, buff=0.22)
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, -2.75))
        ed = Editeur(1, 5.6, P(-1.3, -0.55), fs=36)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), FadeIn(ed), run_time=1.0)
        self.au_mot("avec Python")
        self.play(FadeIn(sous, shift=UP * 0.15), ed.taper(0, "random() < p"), Create(ed.curseur), run_time=0.8)
        self.attendre_voix(marge=1.0)

    # ── 01 : le site de vente ───────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Un site de vente en ligne")
        site = site_vente().move_to(P(-3.5, 0.55))
        self.play(FadeIn(site, shift=UP * 0.2), run_time=0.6)
        self.au_mot("affirme")
        self.play(Indicate(site.bouton, color=ACHAT, scale_factor=1.2), run_time=0.6)
        self.au_mot("30 %")
        l30 = VGroup(self.t("30 %", 54, JAUNE_TITRE), self.t("des visiteurs achètent", 34)).arrange(DOWN, buff=0.15)
        l30.move_to(P(-3.5, -1.95))
        self.play(FadeIn(l30[0], scale=1.6), run_time=0.4)
        self.play(FadeIn(l30[1], shift=LEFT * 0.1), run_time=0.4)
        self.insister(l30[0], 0.25)
        self.au_mot("On veut voir")
        foule = VGroup(*[visiteur(GREY_B) for _ in range(50)]).arrange_in_grid(5, 10, buff=(0.16, 0.16))
        foule.move_to(P(3.1, 0.95))
        self.play(LaggedStart(*[FadeIn(v, shift=DOWN * 0.15) for v in foule], lag_ratio=0.03), run_time=1.3)
        self.au_mot("échantillons de 50 visiteurs")
        l50 = VGroup(self.t("un échantillon de", 34), self.t("50 visiteurs", 44, BLEU_CALCUL)).arrange(DOWN, buff=0.15)
        l50.next_to(foule, DOWN, buff=0.4)
        cad = SurroundingRectangle(foule, color=BLEU_CALCUL, buff=0.15, stroke_width=4)
        self.play(Create(cad), FadeIn(l50, shift=UP * 0.15), run_time=0.6)
        # 14 acheteurs sur 50 : le premier échantillon (0,28, dit plus loin).
        acheteurs = [1, 4, 9, 12, 17, 20, 23, 28, 31, 36, 38, 41, 45, 48]
        self.play(LaggedStart(*[foule[k].animate.set_color(ACHAT) for k in acheteurs], lag_ratio=0.08),
                  run_time=1.2)
        self.attendre_voix()

    # ── 02 : la fonction echantillon(n, p) ──────────────────────────────────

    def ecran_fonction(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-fonction")
        self.titre_ecran("La fonction echantillon")
        ed = Editeur(6, 8.0, P(-2.55, 0.15), fs=28, pas=0.66)
        self.play(FadeIn(ed), run_time=0.4)
        self.au_mot("La fonction échantillon")
        self.play(ed.taper(0, CODE_F[0]), FadeIn(ed.curseur), run_time=0.9)
        self.au_mot("un compteur à 0")
        self.play(ed.taper(1, CODE_F[1]), ed.vers(1), run_time=0.8)
        self.play(Indicate(ed.morceau(1, 9, 10), color=C_NOMBRE, scale_factor=1.5), run_time=0.4)
        self.au_mot("50 fois")
        self.play(ed.taper(2, CODE_F[2]), ed.vers(2), run_time=0.8)
        n50 = suite(code_txt("n", 40), self.t("=", 40), self.t("50", 48, C_NOMBRE), buff=0.2)
        n50.move_to(P(4.4, 1.7))
        self.play(FadeIn(n50, scale=1.4), Indicate(ed.morceau(2, 12, 13), color=C_NOMBRE, scale_factor=1.6),
                  run_time=0.5)
        self.au_mot("si random")
        self.play(ed.taper(3, CODE_F[3]), ed.vers(3), run_time=0.8)
        self.au_mot("0,3")
        p03 = suite(code_txt("p", 40), self.t("=", 40), self.t("0,3", 48, C_NOMBRE), buff=0.2)
        p03.move_to(P(4.4, 0.75))
        self.play(FadeIn(p03, scale=1.4), Indicate(ed.morceau(3, 11, 12), color=C_NOMBRE, scale_factor=1.6),
                  run_time=0.5)
        self.au_mot("on ajoute 1")
        plus = self.t("+1", 44, VERT_OK).move_to(P(4.4, -0.25))
        self.play(ed.taper(4, CODE_F[4]), ed.vers(4), run_time=0.9)
        self.play(FadeIn(plus, shift=UP * 0.2), run_time=0.3)
        self.insister(plus, 0.2)
        self.au_mot("On renvoie")
        self.play(ed.taper(5, CODE_F[5]), ed.vers(5), run_time=0.8)
        self.au_mot("divisé par 50")
        div = suite(self.t("compteur", 36), self.t("÷", 40), self.t("50", 44, C_NOMBRE), buff=0.18)
        div.move_to(P(4.4, -1.25))
        self.play(FadeIn(div, shift=UP * 0.15), Indicate(ed.morceau(5, 14, 16), color=C_NOMBRE, scale_factor=1.4),
                  run_time=0.6)
        self.attendre_voix()

    # ── le décor des écrans 03 à 05 : l'axe et les nombres dits ─────────────

    def axe_principal(self):
        return AxeFreq(x0=-5.8, x1=4.0, y=-2.2, pas=0.18, r=0.085)

    def poser_dites(self, axe, n=4):
        """Les fréquences dites (déjà dites : posées sans animation)."""
        pts, lbls = VGroup(), VGroup()
        for k, v in enumerate(DITES[:n]):
            pts.add(axe.point(v, DITE))
            lbls.add(axe.etiquette(v, f"{v:.2f}".replace(".", ","), rang=k // 2))
        return pts, lbls

    # ── 03 : on répète 100 fois ─────────────────────────────────────────────

    def ecran_repeter(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-repeter")
        self.titre_ecran("On répète 100 fois")
        ed = Editeur(4, 9.5, P(-1.55, 1.0), fs=28, pas=0.58)
        ed.poser(0, "def echantillon(n, p): ...", color=GRIS_ETEINT)
        axe = self.axe_principal()
        self.play(FadeIn(ed), Create(axe), run_time=0.6)
        self.au_mot("On répète 100 fois")
        self.play(ed.taper(1, CODE_R[0]), FadeIn(ed.curseur.move_to(P(ed.curseur.get_x(), ed.ys[1]))),
                  run_time=0.6)
        self.play(ed.taper(2, CODE_R[1]), ed.vers(2), run_time=0.7)
        self.play(Indicate(ed.morceau(2, 12, 15), color=C_NOMBRE, scale_factor=1.5), run_time=0.4)
        self.play(ed.taper(3, CODE_R[2]), ed.vers(3), run_time=1.0)
        self.au_mot("100 fréquences")
        cent = VGroup(self.t("100", 54, C_NOMBRE), self.t("fréquences", 32)).arrange(DOWN, buff=0.1)
        cent.move_to(P(5.2, 1.0))
        self.play(Succession(*[ed.vers(k) for k in (2, 3, 2, 3)], run_time=0.8), FadeIn(cent, scale=1.4),
                  run_time=0.8)
        self.au_mot("Par exemple")
        for k, (v, mot) in enumerate(zip(DITES, ["0,28", "0,34", "0,26", "0,32"])):
            self.au_mot(mot)
            d = axe.point(v, DITE)
            lbl = axe.etiquette(v, mot, rang=k // 2)
            self.play(ed.vers(2), run_time=0.12)
            self.play(ed.vers(3), axe.tomber([d], run_time=0.45), FadeIn(lbl, shift=UP * 0.1), run_time=0.45)
            self.add(d)
        self.attendre_voix()

    # ── 04 : elles tournent autour de 0,3 ───────────────────────────────────

    def ecran_observer(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-observer")
        self.titre_ecran("Toutes les fréquences")
        axe = self.axe_principal()
        dites, lbls = self.poser_dites(axe)
        self.add(axe, dites, lbls)
        autres = VGroup(*[axe.point(v) for v in FREQ50[4:]])
        self.au_mot("Elles changent")
        l1 = self.t("Elles changent d'un échantillon à l'autre,", 34).move_to(P(-0.8, 2.3))
        self.play(FadeIn(l1, shift=UP * 0.1), axe.tomber(autres, run_time=2.4, lag=0.03), run_time=2.4)
        self.au_mot("mais elles tournent")
        rep = axe.repere(0.3, "0,3", haut=2.75, fs=38)
        l2 = suite(self.t("mais elles tournent toutes autour de", 34), self.t("0,3", 40, JAUNE_TITRE), buff=0.2)
        l2.next_to(l1, DOWN, buff=0.2)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.5)
        self.au_mot("0,3")
        self.play(Create(rep[0]), FadeIn(rep[1], scale=1.5), FadeIn(l2[1], scale=1.5), run_time=0.5)
        self.insister(rep[1], 0.25)
        self.attendre_voix()

    # ── 05 : le piège : un seul échantillon ─────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège")
        axe = self.axe_principal()
        self.add(axe)
        self.au_mot("croire qu'un seul")
        faux = self.t("Un seul échantillon suffit ?", 38, ROUGE_ERREUR).move_to(P(-0.8, 2.35))
        self.play(FadeIn(faux, shift=UP * 0.15), run_time=0.5)
        self.au_mot("0,34")
        compte_avant = dict(axe.compte)
        d34 = axe.point(0.34, DITE)
        l34 = axe.etiquette(0.34, "0,34")
        self.play(axe.tomber([d34], run_time=0.5), FadeIn(l34, scale=1.5), run_time=0.5)
        self.add(d34)
        self.insister(l34, 0.25)
        self.au_mot("ne prouve pas")
        np_ = self.t("0,34 ne prouve pas que le site ment", 34, ORANGE_RETENUE).move_to(P(-0.8, 1.55))
        self.play(FadeIn(np_, shift=UP * 0.1), run_time=0.6)
        self.au_mot("il faut regarder")
        axe.compte = compte_avant
        tous = [axe.point(v) for v in FREQ50]
        # le point 0,34 dit garde sa place : on le retire de la liste des autres
        i34 = FREQ50.index(0.34)
        autres = VGroup(*[d for k, d in enumerate(tous) if k != i34])
        d34.move_to(tous[i34])
        ok = self.t("il faut regarder beaucoup d'échantillons", 34, VERT_OK).move_to(P(-0.8, 0.9))
        self.play(Create(self.barrer(faux)), faux.animate.set_opacity(0.5), FadeIn(ok, shift=UP * 0.1),
                  run_time=0.6)
        self.au_mot("beaucoup d'échantillons")
        self.play(axe.tomber(autres, run_time=1.8, lag=0.03), run_time=1.8)
        self.play(Indicate(d34, color=DITE, scale_factor=2.0), run_time=0.5)
        self.attendre_voix()

    # ── 06 : défi : des échantillons de 500 ─────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        ed = Editeur(1, 6.6, P(-3.0, 1.6), fs=36)
        ed.poser(0, "echantillon(50, 0.3)")
        self.play(FadeIn(ed), FadeIn(ed.curseur), run_time=0.5)
        foule = VGroup(*[visiteur(GREY_B, 0.42) for _ in range(500)]).arrange_in_grid(20, 25, buff=(0.03, 0.03))
        foule.scale_to_fit_width(3.0).move_to(P(4.1, 0.15))
        self.au_mot("500 visiteurs")
        nv = ed.faire(0, "echantillon(500, 0.3)")
        for k in (12, 13, 14):
            nv.submobjects[k].set_color(ORANGE_RETENUE)
        l500 = self.t("500 visiteurs", 48, ORANGE_RETENUE).move_to(P(-3.0, 0.3))
        self.play(Transform(ed.lignes[0], nv), FadeIn(l500, scale=1.5),
                  LaggedStart(*[FadeIn(v) for v in foule], lag_ratio=0.004), run_time=1.4)
        self.au_mot("au lieu de 50")
        l50 = suite(self.t("au lieu de", 36), self.t("50", 44, C_NOMBRE), buff=0.2).next_to(l500, DOWN, buff=0.3)
        self.play(FadeIn(l50, shift=UP * 0.1), run_time=0.5)
        self.au_mot("Mets pause")
        q = self.t("Que se passe-t-il ?", 42, ORANGE_RETENUE).move_to(P(-3.0, -1.6))
        self.play(FadeIn(q, scale=1.3), Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE,
                                                          font_size=36)), run_time=1.0)
        self.attendre_voix(marge=2.0)

    # ── 06b : correction : le nuage se resserre ─────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction")
        haut = AxeFreq(x0=-4.0, x1=4.4, y=0.75, pas=0.1, r=0.045)
        bas = AxeFreq(x0=-4.0, x1=4.4, y=-2.5, pas=0.1, r=0.045)
        n50 = VGroup(*[haut.point(v) for v in FREQ50])
        n500 = VGroup(*[bas.point(v, ORANGE_RETENUE) for v in FREQ500])
        e50 = VGroup(self.t("50", 40, C_NOMBRE), self.t("visiteurs", 26)).arrange(DOWN, buff=0.08)
        e50.move_to(P(-5.6, 1.25))
        e500 = VGroup(self.t("500", 40, ORANGE_RETENUE), self.t("visiteurs", 26)).arrange(DOWN, buff=0.08)
        e500.move_to(P(-5.6, -2.0))
        self.add(haut, n50, e50)
        self.play(Create(bas), FadeIn(e500), run_time=0.5)
        self.au_mot("se resserrent")
        self.play(bas.tomber(n500, run_time=1.8, lag=0.03), run_time=1.8)
        self.au_mot("0,3")
        trait = DashedLine(P(bas.x(0.3), -2.5), P(bas.x(0.3), 2.3), color=JAUNE_TITRE, stroke_width=4,
                           dash_length=0.12)
        l03 = self.t("0,3", 36, JAUNE_TITRE).next_to(P(bas.x(0.3), -2.5), DOWN, buff=0.15)
        self.play(Create(trait), FadeIn(l03, scale=1.5), run_time=0.5)
        self.au_mot("plus l'échantillon")
        phr = VGroup(self.t("plus l'échantillon est grand,", 28), self.t("moins elles fluctuent", 32, VERT_OK))
        phr.arrange(DOWN, buff=0.15).move_to(P(4.0, -1.1))
        self.play(FadeIn(phr[0], shift=UP * 0.1), run_time=0.5)
        self.au_mot("moins elles fluctuent")
        self.play(FadeIn(phr[1], shift=UP * 0.1), run_time=0.5)
        self.insister(phr[1], 0.25)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 36
        l1 = suite(code_txt("random() < p", 36), self.t("simule un succès", fs), buff=0.3)
        l2 = VGroup(self.t("Une boucle simule un échantillon,", fs),
                    self.t("une autre boucle répète les échantillons", fs)).arrange(DOWN, aligned_edge=LEFT,
                                                                                    buff=0.14)
        l3 = suite(self.t("Les fréquences", fs, VERT_OK), self.t("fluctuent autour de", fs),
                   self.t("p", fs + 6, JAUNE_TITRE), buff=0.2)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6)
        if lignes.width > 11.0:
            lignes.scale_to_fit_width(11.0)
        lignes.move_to(P(-0.7, 0.2))
        for mot, l in zip(["random plus petit", "Une boucle", "Les fréquences fluctuent"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.attendre_voix(marge=1.0)

    # ── 08 : la fin (règle du 19/10) ────────────────────────────────────────

    def page_abonnement(self, voix="08-abonne"):
        """« Entraîne-toi sur » + eleveai.fr encadré, puis « Abonne-toi ! » +
        @eleveai974. Rien d'autre."""
        self.clear()
        self.dire(voix)
        self.add_mascotte(scale=0.9)
        entraine = self.t("Entraîne-toi sur", 46, JAUNE_TITRE).move_to(P(0, 2.05))
        site = self.t("eleveai.fr", 62, BLEU_CALCUL).move_to(P(0, 1.0))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.26, stroke_width=3)
        abonne = self.t("Abonne-toi !", 44, VERT_OK).move_to(P(0, -0.6))
        poignee = self.t("@eleveai974", 48, VERT_OK).move_to(P(0, -1.6))
        self.play(Write(entraine), run_time=0.6)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.6)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), run_time=0.4)
        self.play(GrowFromCenter(poignee), run_time=0.4)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.3))
        self.attendre_voix(marge=1.4)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_fonction()
        self.ecran_repeter()
        self.ecran_observer()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")


class ProbaBernSimulerSTMG(ProbaBernSimulerBase):
    identite = "Maths STMG — EleveAI"


# 20/10 : la même vidéo pour la 1re SPÉ (ceinture marron).
class ProbaBernSimulerPremiereSpe(ProbaBernSimulerBase):
    identite = "Maths 1re spé — EleveAI"
    ceinture = "marron"
