# proba_auto_equiprobabilite.py
# EleveAI — Maths 1re TRONC COMMUN (automatismes) — série « Probabilités »,
# l'équiprobabilité : P(A) = Card(A) / Card(Ω) (micro : auto_proba_equiprobabilite,
# notion auto_proba_base), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE. Short jumeau :
# proba_auto_equiprobabilite_short.py (ceinture jaune).
#
# ⭐ La micro du coach n'a AUCUN canvas (questions d'urnes, de dés, de cartes,
# en texte) : le fil est le dessin de la mission. Les 40 producteurs de la
# coopérative en grille 10 × 4, les 12 « bio » en vert sur les trois premières
# colonnes : A est un rectangle (3 × 4) dans Ω (10 × 4). Ω entouré, A entouré ;
# Card(Ω) et Card(A) s'écrivent quand la voix les dit.
# Le défi : 25 bus en 5 × 5, UN électrique par rangée → « 1 sur 5 » se VOIT.
#
# Écrans : 00 garde · 01 la coopérative · 02 au hasard = équiprobable ·
# 03 Card(Ω), Card(A) · 04 la formule 12/40 = 0,3 · 05 le piège des sacs ·
# 06 défi des bus · 06b correction · 07 ce que tu as appris · 08 abonnement.
#
# Voix : manim/voix/premiere-commun-proba-equiprobabilite.json (débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/premiere/proba_auto_equiprobabilite.py ProbaEquiprobabilitePremiere -o eleveai-maths-premiere-commun-proba-equiprobabilite --media_dir manim/scripts/premiere/media-equiprobabilite
# Puis copier le mp4 dans manim/sorties/premiere-commun/maths/probabilites/26-equiprobabilite/.

import random
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

GRIS_PROD = "#94A3B8"
VERT_BIO = "#22C55E"
VANILLE = "#7C4A1E"
SAC = "#D6B38A"
BUS_GRIS = "#CBD5E1"
BUS_VERT = "#22C55E"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les écritures (que des Text) ────────────────────────────────────────────

def card(lettre, font_size=40, color=WHITE):
    """« Card(A) », « Card(Ω) » : un seul Text."""
    return Text(f"Card({lettre})", font_size=font_size, color=color)


def fraction(num, den, color=WHITE, buff=0.1, sw=4):
    """num au-dessus, trait, den en dessous (des Mobjects ou des chaînes)."""
    if isinstance(num, str):
        num = Text(num, font_size=44, color=color)
    if isinstance(den, str):
        den = Text(den, font_size=44, color=color)
    w = max(num.width, den.width) + 0.2
    trait = Line(LEFT * w / 2, RIGHT * w / 2, stroke_width=sw, color=color)
    num.next_to(trait, UP, buff=buff)
    den.next_to(trait, DOWN, buff=buff)
    return VGroup(num, trait, den)


def formule_card(font_size=40, color=WHITE, c_a=VERT_BIO, c_o=BLEU_CALCUL):
    """P(A) = Card(A) / Card(Ω) ; renvoie (groupe, gauche, fraction)."""
    g = Text("P(A) =", font_size=font_size, color=color)
    f = fraction(card("A", font_size, c_a), card("Ω", font_size, c_o), color)
    return VGroup(g, f).arrange(RIGHT, buff=0.25), g, f


# ── les dessins ─────────────────────────────────────────────────────────────

def producteur(couleur=GRIS_PROD, s=1.0):
    """Une tête, des épaules, un chapeau de paille."""
    tete = Circle(radius=0.1, fill_color="#F1C27D", fill_opacity=1, stroke_width=0).move_to(P(0, 0.12))
    corps = RoundedRectangle(width=0.32, height=0.2, corner_radius=0.09, fill_color=couleur,
                             fill_opacity=1, stroke_width=0).move_to(P(0, -0.08))
    bord = Ellipse(width=0.3, height=0.06, fill_color="#FDE68A", fill_opacity=1, stroke_width=0).move_to(P(0, 0.2))
    calotte = Rectangle(width=0.14, height=0.07, fill_color="#FDE68A", fill_opacity=1,
                        stroke_width=0).move_to(P(0, 0.25))
    return VGroup(corps, tete, bord, calotte).scale(s)


def gousse(s=1.0):
    """Une gousse de vanille (courbe brune) et sa fleur."""
    g = VMobject(stroke_color=VANILLE, stroke_width=10)
    g.set_points_smoothly([P(-0.9, -0.3), P(-0.4, 0.05), P(0.2, 0.15), P(0.9, -0.1)])
    fleur = VGroup(*[Ellipse(width=0.22, height=0.42, fill_color="#FEF9C3", fill_opacity=1,
                             stroke_color="#CA8A04", stroke_width=1.5).shift(UP * 0.17).rotate(a, about_point=ORIGIN)
                     for a in np.linspace(0, TAU, 6)[:-1]])
    coeur = Circle(radius=0.08, fill_color="#FACC15", fill_opacity=1, stroke_width=0)
    fleur = VGroup(fleur, coeur).move_to(P(1.15, 0.25))
    feuille = Ellipse(width=0.9, height=0.3, fill_color="#16A34A", fill_opacity=1,
                      stroke_width=0).rotate(0.4).move_to(P(-0.2, 0.55))
    return VGroup(feuille, g, fleur).scale(s)


def sac_vanille(s=1.0):
    corps = RoundedRectangle(width=0.36, height=0.42, corner_radius=0.1, fill_color=SAC, fill_opacity=1,
                             stroke_color="#92400E", stroke_width=1.5)
    noeud = Rectangle(width=0.18, height=0.08, fill_color="#92400E", fill_opacity=1,
                      stroke_width=0).move_to(corps.get_top() + DOWN * 0.04)
    return VGroup(corps, noeud).scale(s)


def bus(couleur=BUS_GRIS, s=1.0, eclair=False):
    caisse = RoundedRectangle(width=0.9, height=0.42, corner_radius=0.08, fill_color=couleur,
                              fill_opacity=1, stroke_color="#475569", stroke_width=1.5)
    vitres = VGroup(*[Rectangle(width=0.14, height=0.13, fill_color="#E0F2FE", fill_opacity=1, stroke_width=0)
                      .move_to(P(-0.3 + 0.2 * k, 0.07)) for k in range(4)])
    roues = VGroup(*[Circle(radius=0.07, fill_color="#1E293B", fill_opacity=1, stroke_width=0)
                     .move_to(P(x, -0.21)) for x in (-0.25, 0.25)])
    g = VGroup(caisse, vitres, roues)
    if eclair:
        e = Polygon(P(0.06, 0.2), P(-0.08, -0.02), P(0.0, -0.02), P(-0.06, -0.2), P(0.1, 0.03), P(0.02, 0.03),
                    fill_color="#FACC15", fill_opacity=1, stroke_color="#78350F", stroke_width=1)
        g.add(e.scale(0.75).move_to(P(0.0, -0.06)))
    return g.scale(s)


class Cooperative:
    """Les 40 producteurs en grille 10 × 4 ; les 12 bio = colonnes 0 à 2."""

    def __init__(self, centre=P(-3.55, -0.45), dx=0.68, dy=0.95, s=1.55, cols=10, lignes=4, n_bio=3):
        self.cols, self.lignes, self.n_bio = cols, lignes, n_bio
        self.prods = VGroup()
        self.bio = VGroup()
        self.autres = VGroup()
        x0 = centre[0] - dx * (cols - 1) / 2
        y0 = centre[1] + dy * (lignes - 1) / 2
        for r in range(lignes):
            for c in range(cols):
                p = producteur(GRIS_PROD, s).move_to(P(x0 + c * dx, y0 - r * dy))
                p.col, p.lig = c, r
                self.prods.add(p)
                (self.bio if c < n_bio else self.autres).add(p)

    def verdir(self):
        return [p[0].animate.set_fill(VERT_BIO) for p in self.bio]

    def verdir_tout_de_suite(self):
        for p in self.bio:
            p[0].set_fill(VERT_BIO)
        return self

    def cadre_omega(self, color=BLEU_CALCUL):
        r = SurroundingRectangle(self.prods, color=color, buff=0.2, corner_radius=0.25, stroke_width=5)
        lbl = Text("Ω", font_size=44, color=color, weight=BOLD).next_to(r, UP, buff=0.08).align_to(r, RIGHT)
        return VGroup(r, lbl)

    def cadre_a(self, color=VERT_BIO):
        r = SurroundingRectangle(self.bio, color=color, buff=0.1, corner_radius=0.18, stroke_width=5)
        lbl = Text("A", font_size=40, color=color, weight=BOLD).next_to(r, UP, buff=0.08)
        return VGroup(r, lbl)


class Parc:
    """Les 25 bus en 5 × 5, UN électrique par rangée."""

    ELEC = [1, 3, 0, 4, 2]

    def __init__(self, centre=P(-3.2, -0.45), dx=1.35, dy=0.85, s=1.2):
        self.bus = VGroup()
        self.elec = VGroup()
        self.rangees = []
        x0 = centre[0] - dx * 2
        y0 = centre[1] + dy * 2
        for r in range(5):
            rangee = VGroup()
            for c in range(5):
                b = bus(BUS_GRIS, s, eclair=(c == self.ELEC[r])).move_to(P(x0 + c * dx, y0 - r * dy))
                self.bus.add(b)
                rangee.add(b)
                if c == self.ELEC[r]:
                    self.elec.add(b)
            self.rangees.append(rangee)

    def electrifier(self):
        return [b[0].animate.set_fill(BUS_VERT) for b in self.elec]

    def electrifier_tout_de_suite(self):
        for b in self.elec:
            b[0].set_fill(BUS_VERT)
        return self


class NotionPremiereCommun(Notion6e):
    identite = "Maths 1re — EleveAI"


class ProbaEquiprobabiliteBase(NotionPremiereCommun):
    nom_voix = "premiere-commun-proba-equiprobabilite"
    ceinture = "bleue"

    X_DROITE = 3.3  # le centre de la colonne de droite (formules)

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.35):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR, sw=7):
        return VGroup(Line(mob.get_corner(DL) + P(-0.1, -0.1), mob.get_corner(UR) + P(0.1, 0.1), stroke_width=sw, color=color),
                      Line(mob.get_corner(UL) + P(-0.1, 0.1), mob.get_corner(DR) + P(0.1, -0.1), stroke_width=sw, color=color))

    def coop(self, bio=True):
        c = Cooperative()
        if bio:
            c.verdir_tout_de_suite()
        return c

    def tirage(self, mobs, n=12, fin=None, run_time=0.11, color=JAUNE_TITRE):
        """Un anneau qui saute de producteur en producteur (le hasard)."""
        rng = random.Random(7)
        cible = mobs[rng.randrange(len(mobs))]
        anneau = Circle(radius=0.38, color=color, stroke_width=6).move_to(cible)
        self.play(Create(anneau), run_time=0.2)
        for _ in range(n):
            cible = mobs[rng.randrange(len(mobs))]
            self.play(anneau.animate.move_to(cible), run_time=run_time)
        if fin is not None:
            self.play(anneau.animate.move_to(fin), run_time=run_time * 2)
        return anneau

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("L'équiprobabilité", 54, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, -2.75))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=1.0)
        f, g, fr = formule_card(50)
        f.move_to(P(-0.6, 0.25))
        self.au_mot("Card de A")
        self.play(FadeIn(fr[0], shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("sur card d'oméga")
        self.play(Create(fr[1]), FadeIn(fr[2], shift=UP * 0.2), run_time=0.5)
        self.play(FadeIn(g, shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("équiprobables")
        cond = self.t("quand les issues sont équiprobables", 34, BLEU_CALCUL).next_to(f, DOWN, buff=0.4)
        self.play(FadeIn(cond, shift=UP * 0.15), run_time=0.5)
        self.attendre_voix(marge=1.0)

    # ── 01 : la coopérative ─────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Une coopérative de vanille")
        vg = gousse(1.0).move_to(P(self.X_DROITE, 1.9))
        self.play(FadeIn(vg, shift=DOWN * 0.2), run_time=0.5)
        c = self.coop(bio=False)
        self.au_mot("40 producteurs")
        n40 = self.t("40 producteurs", 40).move_to(P(self.X_DROITE, 0.55))
        self.play(LaggedStart(*[FadeIn(p, scale=0.5) for p in c.prods], lag_ratio=0.03), run_time=1.0)
        self.play(Write(n40), run_time=0.5)
        self.insister(n40[:2])
        self.au_mot("12 sont")
        n12 = self.t("12 bio", 40, VERT_BIO).move_to(P(self.X_DROITE, -0.35))
        self.play(*c.verdir(), FadeIn(n12, shift=UP * 0.15), run_time=0.7)
        self.insister(n12)
        self.au_mot("On choisit un producteur au hasard")
        h = self.t("un producteur au hasard", 32, JAUNE_TITRE).move_to(P(self.X_DROITE, -1.3))
        self.play(FadeIn(h, shift=UP * 0.15), run_time=0.4)
        anneau = self.tirage(c.prods, n=10, fin=c.prods[17])
        self.play(Indicate(c.prods[17], color=JAUNE_TITRE, scale_factor=1.6), run_time=0.6)
        self.attendre_voix()

    # ── 02 : au hasard = équiprobable ───────────────────────────────────────

    def ecran_equiprobable(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-equiprobable")
        c = self.coop()
        self.add(c.prods)
        self.titre_ecran("Au hasard")
        self.au_mot("chaque producteur a la même chance")
        l1 = self.t("chaque producteur :", 34).move_to(P(self.X_DROITE, 1.3))
        l2 = self.t("la même chance", 40, JAUNE_TITRE).next_to(l1, DOWN, buff=0.25)
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.4)
        self.play(FadeIn(l2, shift=UP * 0.15),
                  LaggedStart(*[Indicate(p, color=JAUNE_TITRE, scale_factor=1.3) for p in c.prods], lag_ratio=0.02),
                  run_time=1.4)
        self.au_mot("équiprobables")
        eq = self.t("issues équiprobables", 40, VERT_OK).move_to(P(self.X_DROITE, -0.6))
        cadre = SurroundingRectangle(eq, color=VERT_OK, buff=0.2, stroke_width=3)
        self.play(Write(eq), run_time=0.7)
        self.play(Create(cadre), run_time=0.3)
        self.insister(VGroup(eq, cadre))
        self.attendre_voix()

    # ── 03 : Card(Ω), Card(A) ───────────────────────────────────────────────

    def ecran_card(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-card")
        c = self.coop()
        self.add(c.prods)
        self.titre_ecran("Compter les issues")
        self.au_mot("Card de oméga")
        om = c.cadre_omega()
        self.play(Create(om[0]), FadeIn(om[1], scale=0.5), run_time=0.7)
        co = self.t("Card(Ω) = ", 42, BLEU_CALCUL)
        co.move_to(P(self.X_DROITE - 0.3, 1.4))
        self.play(FadeIn(co, shift=UP * 0.15), run_time=0.4)
        self.au_mot("le nombre d'issues")
        ni = self.t("le nombre d'issues", 28, BLEU_CALCUL).next_to(co, DOWN, buff=0.18)
        self.play(FadeIn(ni), LaggedStart(*[Indicate(p, color=BLEU_CALCUL, scale_factor=1.25) for p in c.prods],
                                          lag_ratio=0.015), run_time=0.9)
        self.au_mot(": 40")
        v40 = self.t("40", 42, BLEU_CALCUL).next_to(co, RIGHT, buff=0.25)
        self.play(FadeIn(v40, scale=0.5), run_time=0.3)
        self.insister(v40)
        self.au_mot("Card de A")
        a = c.cadre_a()
        self.play(Create(a[0]), FadeIn(a[1], scale=0.5), run_time=0.6)
        ca = self.t("Card(A) = ", 42, VERT_BIO).move_to(P(self.X_DROITE - 0.3, -0.35))
        ca.align_to(co, LEFT)
        self.play(FadeIn(ca, shift=UP * 0.15), run_time=0.4)
        self.au_mot("« le producteur est bio »")
        ev = self.t("A : « le producteur est bio »", 28, VERT_BIO).next_to(ca, DOWN, buff=0.18).align_to(ca, LEFT)
        self.play(FadeIn(ev, shift=UP * 0.1), Indicate(a[1], color=VERT_BIO), run_time=0.5)
        self.au_mot(": 12")
        v12 = self.t("12", 42, VERT_BIO).next_to(ca, RIGHT, buff=0.25)
        self.play(FadeIn(v12, scale=0.5), LaggedStart(*[Indicate(p, color=VERT_BIO, scale_factor=1.3) for p in c.bio],
                                                      lag_ratio=0.04), run_time=0.7)
        self.insister(v12)
        self.attendre_voix()

    # ── 04 : la formule ─────────────────────────────────────────────────────

    def ecran_formule(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-formule")
        c = self.coop()
        om, a = c.cadre_omega(), c.cadre_a()
        self.add(c.prods, om, a)
        self.titre_ecran("La formule")
        self.au_mot("P de A égale")
        f, g, fr = formule_card(40)
        f.move_to(P(self.X_DROITE - 0.2, 1.35))
        self.play(FadeIn(g, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("card de A sur")
        self.play(FadeIn(fr[0], shift=DOWN * 0.15), Indicate(a, color=VERT_BIO, scale_factor=1.05), run_time=0.5)
        self.au_mot("card de oméga")
        self.play(Create(fr[1]), FadeIn(fr[2], shift=UP * 0.15), Indicate(om[1], color=BLEU_CALCUL), run_time=0.5)
        cadre = SurroundingRectangle(f, color=JAUNE_TITRE, buff=0.18, stroke_width=3)
        self.play(Create(cadre), run_time=0.3)
        self.au_mot("12 sur 40")
        eg1 = self.t("=", 44).move_to(P(self.X_DROITE - 1.6, -0.9))
        f2 = fraction(self.t("12", 46, VERT_BIO), self.t("40", 46, BLEU_CALCUL)).next_to(eg1, RIGHT, buff=0.25)
        self.play(FadeIn(eg1), FadeIn(f2[0], shift=DOWN * 0.15), Create(f2[1]), FadeIn(f2[2], shift=UP * 0.15),
                  run_time=0.6)
        self.au_mot("soit 0,3")
        eg2 = self.t("=", 44).next_to(f2, RIGHT, buff=0.3)
        res = self.t("0,3", 52, VERT_OK).next_to(eg2, RIGHT, buff=0.3)
        self.play(FadeIn(eg2), FadeIn(res, scale=0.5), run_time=0.5)
        self.insister(res)
        self.attendre_voix()

    # ── 05 : le piège des sacs ──────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège")
        f, g, fr = formule_card(36)
        f.move_to(P(self.X_DROITE, 1.6))
        self.play(FadeIn(f), run_time=0.5)
        self.au_mot("pas équiprobables")
        pe = self.t("issues pas équiprobables", 34, ROUGE_ERREUR).move_to(P(self.X_DROITE, 0.25))
        self.play(FadeIn(pe, shift=UP * 0.15), run_time=0.5)
        self.insister(pe[6:9])
        # quatre producteurs, et leurs sacs : le gros en a beaucoup
        tailles = [7, 1, 2, 1]
        xs = [-5.5, -3.3, -1.9, -0.5]
        prods = VGroup(*[producteur(VERT_BIO if k == 0 else GRIS_PROD, 4.0 if k == 0 else 2.8).move_to(P(x, 1.25))
                         for k, x in enumerate(xs)])
        self.play(LaggedStart(*[FadeIn(p, shift=UP * 0.2) for p in prods], lag_ratio=0.15), run_time=0.7)
        self.au_mot("un sac de vanille au hasard")
        sacs = VGroup()
        for k, (n, x) in enumerate(zip(tailles, xs)):
            pile = VGroup(*[sac_vanille(1.6) for _ in range(n)])
            if n > 2:
                pile.arrange_in_grid(cols=3 if k == 0 else 2, buff=0.06)
            else:
                pile.arrange(RIGHT, buff=0.06)
            pile.next_to(prods[k], DOWN, buff=0.3)
            sacs.add(pile)
        self.play(LaggedStart(*[FadeIn(s_, shift=DOWN * 0.2) for pile in sacs for s_ in pile], lag_ratio=0.08),
                  run_time=1.0)
        self.au_mot("les gros producteurs")
        self.play(Indicate(sacs[0], color=JAUNE_TITRE, scale_factor=1.15), Indicate(prods[0], color=JAUNE_TITRE),
                  run_time=0.7)
        self.au_mot("plus de chances")
        pc = self.t("plus de chances", 34, JAUNE_TITRE).next_to(sacs[0], DOWN, buff=0.3)
        pc.shift(RIGHT * max(0, -6.6 - pc.get_left()[0]))
        self.play(FadeIn(pc, shift=UP * 0.15), run_time=0.4)
        self.insister(prods[0])
        self.au_mot("la formule ne marche plus")
        x = self.barrer(f)
        self.play(Create(x), run_time=0.5)
        self.attendre_voix()

    # ── 06 : défi des bus ───────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        pk = Parc()
        self.au_mot("25 bus")
        n25 = self.t("25 bus", 40).move_to(P(self.X_DROITE, 1.5))
        self.play(LaggedStart(*[FadeIn(b, shift=RIGHT * 0.2) for b in pk.bus], lag_ratio=0.04), run_time=1.0)
        self.play(Write(n25), run_time=0.4)
        self.au_mot("5 électriques")
        n5 = self.t("5 électriques", 40, BUS_VERT).next_to(n25, DOWN, buff=0.35)
        self.play(*pk.electrifier(), FadeIn(n5, shift=UP * 0.15), run_time=0.7)
        self.insister(n5[0])
        self.au_mot("On en choisit un au hasard")
        anneau = self.tirage(pk.bus, n=8, fin=None, run_time=0.12)
        self.au_mot("Probabilité qu'il soit électrique")
        q = self.t("P(électrique) = ?", 40, ORANGE_RETENUE).next_to(n5, DOWN, buff=0.6)
        self.play(FadeOut(anneau), FadeIn(q, shift=UP * 0.15), run_time=0.5)
        self.insister(q[-1])
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        pk = Parc().electrifier_tout_de_suite()
        self.add(pk.bus)
        self.titre_ecran("Correction")
        self.au_mot("5 sur 25")
        f1 = fraction(self.t("5", 46, BUS_VERT), self.t("25", 46)).move_to(P(self.X_DROITE - 1.4, 0.4))
        self.play(FadeIn(f1[0], shift=DOWN * 0.15), Create(f1[1]), FadeIn(f1[2], shift=UP * 0.15),
                  LaggedStart(*[Indicate(b, color=BUS_VERT, scale_factor=1.3) for b in pk.elec], lag_ratio=0.1),
                  run_time=0.8)
        self.au_mot("soit 1 sur 5")
        eg1 = self.t("=", 44).next_to(f1, RIGHT, buff=0.3)
        f2 = fraction(self.t("1", 46, BUS_VERT), self.t("5", 46)).next_to(eg1, RIGHT, buff=0.3)
        cadres = VGroup(*[SurroundingRectangle(r, color=JAUNE_TITRE, buff=0.05, stroke_width=3) for r in pk.rangees])
        self.play(FadeIn(eg1), FadeIn(f2, shift=UP * 0.15), LaggedStart(*[Create(c_) for c_ in cadres], lag_ratio=0.12),
                  run_time=0.8)
        self.insister(f2)
        self.au_mot("ou 0,2")
        eg2 = self.t("=", 44).next_to(f2, RIGHT, buff=0.3)
        res = self.t("0,2", 52, VERT_OK).next_to(eg2, RIGHT, buff=0.3)
        self.play(FadeIn(eg2), FadeIn(res, scale=0.5), run_time=0.5)
        self.insister(res)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        f, g, fr = formule_card(44)
        l1 = VGroup(self.t("Issues équiprobables :", 40), f).arrange(RIGHT, buff=0.35)
        l2a = VGroup(self.t("Sinon :", 40, ORANGE_RETENUE), self.t("on additionne", 40)).arrange(RIGHT, buff=0.25)
        l2 = VGroup(l2a, self.t("les probabilités des issues", 40)).arrange(DOWN, aligned_edge=LEFT, buff=0.18)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.8)
        if lignes.width > 12.0:
            lignes.scale_to_fit_width(12.0)
        lignes.move_to(P(-0.5, 0.5))
        for mot, l in zip(["Si les issues sont équiprobables", "Sinon"], lignes):
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
        self.ecran_equiprobable()
        self.ecran_card()
        self.ecran_formule()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")


class ProbaEquiprobabilitePremiere(ProbaEquiprobabiliteBase):
    identite = "Maths 1re — EleveAI"
    ceinture = "bleue"
