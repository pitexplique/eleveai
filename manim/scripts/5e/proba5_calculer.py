# proba5_calculer.py
# EleveAI — Maths 5e — série « Probabilités », épisode 4 : calculer une
# probabilité, favorables sur possibles (micro : proba_calculer), AVEC VOIX.
# Paysage 16:9, CEINTURE JAUNE. Short jumeau : proba5_calculer_short.py.
#
# Écrans : 00 garde (la roue tourne) · 01 la roue de kermesse, 8 parts égales
# (3 rouges, 4 bleues, 1 dorée = le gros lot) · 02 la règle (favorables sur
# possibles, écrite en mots) · 03 le calcul (1/8 pour le gros lot, 4/8 = 1/2
# pour le bleu ; la moitié de la roue ; les deux points posés sur L'ÉCHELLE de
# l'impossible au certain) · 04 trois écritures (1/8 = 0,125 = 12,5 %) ·
# 05 le piège (la part dorée deux fois plus grande, 1/8 barré) · 06 défi des
# 20 bonbons, 5 au coco · 06b correction (5/20 = 1/4 = 0,25 : une rangée
# sur 4) · 07 ce que tu as appris · 08 abonnement.
#
# ⭐ Canvas repris du coach (lib/tutor-v4/components/ProbabilitesCanvas.tsx,
# banque 5e/maths/probabilites.bank.ts, micro proba_calculer) :
#   · « roue » (canvasRoue des gabarits) : secteurs de poids 1 (« de même
#     taille »), départ en haut, sens horaire, liseré #0f172a, pointe noire en
#     haut, moyeu noir, carte blanche, sans étiquette ; ici les parts d'une
#     même couleur sont GROUPÉES et la dorée est sous la pointe ;
#   · « billes » (proba_calculer_fixed_3, canvasUrne) : des ronds en grille
#     (colonnes = min(6, max(3, ⌈√n⌉)) → 5 × 4 pour 20), liseré #0f172a, sur
#     carte blanche ; ici ce sont des bonbons (le rond + l'emballage).
# ⛔ 17/10 « pas d'écart » : un nombre n'apparaît qu'au moment où il est dit.
#
# Voix : manim/voix/5e-proba-calculer.json (Julie, débit −8).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/5e/proba5_calculer.py Proba5Calculer -o eleveai-maths-5e-proba-calculer --media_dir manim/scripts/5e/media
# Puis copier le mp4 dans manim/sorties/5e/maths/probabilites/04-calculer/.

import math
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

# couleurs du coach
C_ROUGE = "#ef4444"
C_BLEU = "#3b82f6"
C_DORE = "#eab308"       # « jaune » du coach : la part dorée
C_ROSE = "#ec4899"       # « rose » du coach : la fraise
C_BLANC = "#ffffff"      # « blanc » du coach : le coco
ENCRE = "#0f172a"
CARTE_BORD = "#e2e8f0"
FACE_AMBRE = "#fef3c7"
BORD_AMBRE = "#fbbf24"
GRIS_VIDE = "#cbd5e1"

# la roue de kermesse : 1 dorée (sous la pointe), 3 rouges, 4 bleues
ROUE_8 = [C_DORE] + [C_ROUGE] * 3 + [C_BLEU] * 4


class Notion5e(Notion6e):
    identite = "Maths 5e — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


# ── le canvas « roue » du coach ─────────────────────────────────────────────

def disque(couleurs=ROUE_8, r=1.4, poids=None):
    """Les secteurs, sens horaire ; le secteur 0 est CENTRÉ sous la pointe.
    `poids` (facultatif) : la taille relative de chaque secteur."""
    poids = poids or [1] * len(couleurs)
    tot = sum(poids)
    g = VGroup()
    a = PI / 2 + TAU * poids[0] / tot / 2
    for c, w in zip(couleurs, poids):
        ang = TAU * w / tot
        g.add(AnnularSector(inner_radius=0, outer_radius=r, angle=-ang, start_angle=a,
                            fill_color=c, fill_opacity=1, stroke_color=ENCRE, stroke_width=3))
        a -= ang
    return g


def roue(centre, couleurs=ROUE_8, r=1.4, carte=True, poids=None):
    """Le canvas « roue » : carte blanche, disque, moyeu, pointe en haut.
    Renvoie (tout, disque) ; tout[-1] = la pointe."""
    # shift et non move_to : le moyeu (centre des arcs) est à l'origine
    d = disque(couleurs, r, poids).shift(centre)
    moyeu = Dot(centre, radius=r * 0.05, color=ENCRE)
    pointe = Polygon(P(0, 0), P(-0.16, 0.34), P(0.16, 0.34), fill_color=ENCRE, fill_opacity=1,
                     stroke_width=0).scale(r / 1.4).move_to(centre + UP * (r + 0.06), aligned_edge=DOWN)
    pointe.shift(DOWN * 0.22 * r / 1.4)
    g = VGroup()
    if carte:
        g.add(RoundedRectangle(width=2 * r + 0.8, height=2 * r + 1.0, corner_radius=0.2, fill_color=WHITE,
                               fill_opacity=1, stroke_color=CARTE_BORD, stroke_width=2).move_to(centre + UP * 0.1))
    g.add(d, moyeu, pointe)
    return g, d


class Toupie:
    """Fait tourner un disque (sens horaire) et l'arrête PILE à sa place."""

    def __init__(self, scene, d, centre, vitesse=6.0):
        self.scene, self.d, self.c, self.v, self.angle = scene, d, centre, vitesse, 0.0

        def maj(m, dt):
            m.rotate(-self.v * dt, about_point=self.c)
            self.angle += self.v * dt

        self.maj = maj
        d.add_updater(maj)

    def arreter(self, run_time=1.2):
        self.d.remove_updater(self.maj)
        reste = TAU - (self.angle % TAU)
        self.scene.play(Rotate(self.d, -(reste + TAU), about_point=self.c), run_time=run_time,
                        rate_func=rate_functions.ease_out_cubic)
        self.angle = 0.0


def gros_lot(s=1.0):
    """Le gros lot : un paquet cadeau doré avec son nœud."""
    boite = Square(0.9, fill_color=C_DORE, fill_opacity=1, stroke_color=ENCRE, stroke_width=3)
    ruban_v = Rectangle(width=0.18, height=0.9, fill_color=C_ROUGE, fill_opacity=1, stroke_width=0)
    ruban_h = Rectangle(width=0.9, height=0.18, fill_color=C_ROUGE, fill_opacity=1, stroke_width=0)
    noeud = VGroup(*[Ellipse(width=0.36, height=0.22, fill_color=C_ROUGE, fill_opacity=1, stroke_color=ENCRE,
                             stroke_width=2).rotate(a).move_to(P(dx, 0.52)) for a, dx in ((0.5, -0.16), (-0.5, 0.16))])
    etoiles = VGroup(*[Star(5, outer_radius=0.1, inner_radius=0.045, fill_color=JAUNE_TITRE, fill_opacity=1,
                            stroke_width=0).move_to(P(x, y)) for x, y in ((-0.7, 0.55), (0.72, 0.3), (-0.62, -0.3))])
    return VGroup(boite, ruban_v, ruban_h, noeud, etoiles).scale(s)


# ── le canvas « billes » du coach, en bonbons ───────────────────────────────

def bonbon(couleur, r=0.3):
    """Un bonbon : le rond du coach (liseré #0f172a) + les deux papillotes."""
    rond = Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_color=ENCRE, stroke_width=3)
    pap = VGroup(*[Polygon(P(s * r * 0.85, 0), P(s * r * 1.6, 0.42 * r), P(s * r * 1.6, -0.42 * r),
                           fill_color=couleur, fill_opacity=1, stroke_color=ENCRE, stroke_width=2.5)
                   for s in (-1, 1)])
    return VGroup(pap, rond)


def boite_de_bonbons(couleurs, r=0.3, pas_x=1.15, pas_y=0.85, cols=5):
    """Les bonbons en grille (5 colonnes pour 20, comme le coach) sur une carte
    blanche. Renvoie (carte, bonbons) ; bonbons[k] = le k-ième, ligne par ligne."""
    bs = VGroup(*[bonbon(c, r) for c in couleurs])
    for k, b in enumerate(bs):
        b.move_to(P((k % cols) * pas_x, -(k // cols) * pas_y))
    fond = RoundedRectangle(width=bs.width + 0.6, height=bs.height + 0.6, corner_radius=0.2, fill_color=WHITE,
                            fill_opacity=1, stroke_color=CARTE_BORD, stroke_width=2).move_to(bs)
    return VGroup(fond, bs), bs


# ── la vidéo ────────────────────────────────────────────────────────────────

class Proba5Calculer(Notion5e):
    nom_voix = "5e-proba-calculer"

    def t(self, texte, font_size=40, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.22):
        """Une ligne en morceaux colorés, d'UN SEUL Text ; ligne[i] = i-ème morceau."""
        T = Text(" ".join(m for m, _ in morceaux), font_size=font_size)
        tailles = [len(m.replace(" ", "")) for m, _ in morceaux]
        if len(T) != sum(tailles):
            return VGroup(*[self.t(m, font_size, c) for m, c in morceaux]).arrange(RIGHT, buff=buff)
        g, k = VGroup(), 0
        for (m, c), n in zip(morceaux, tailles):
            g.add(VGroup(*T[k:k + n]).set_color(c))
            k += n
        return g

    def insister(self, mob, run_time=0.3):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR, sw=8):
        return Line(mob.get_corner(DL) + LEFT * 0.1, mob.get_corner(UR) + RIGHT * 0.1, stroke_width=sw, color=color)

    def pastille(self, couleur, r=0.22):
        return Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_color=ENCRE, stroke_width=3)

    def parts(self, d, couleur):
        return [p for p, c in zip(d, ROUE_8) if c == couleur]

    def eclairer(self, d, couleur, run_time=0.3):
        """Les parts d'une couleur restent vives, les autres s'estompent."""
        self.play(*[p.animate.set_fill(opacity=1 if c == couleur else 0.2) for p, c in zip(d, ROUE_8)],
                  run_time=run_time)

    def rallumer(self, d, run_time=0.3):
        self.play(*[p.animate.set_fill(opacity=1) for p in d], run_time=run_time)

    def gonfler(self, ps, c, k=1.12, run_time=0.2):
        """Les parts `ps` sortent un instant de la roue (centre c)."""
        self.play(*[p.animate.scale(k, about_point=c) for p in ps], run_time=run_time)
        self.play(*[p.animate.scale(1 / k, about_point=c) for p in ps], run_time=run_time)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Calculer une probabilité", 56, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("jaune").move_to(P(-0.6, -3.15))
        self.add(ech)
        c = P(-3.2, -0.25)
        tout, d = roue(c, r=1.3)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(tout, scale=0.7), run_time=1.0)
        top = Toupie(self, d, c, vitesse=7.0)
        self.au_mot("favorables sur possibles")
        f = self.fraction("favorables", "possibles", 52, WHITE, color_num=VERT_OK, color_den=JAUNE_TITRE)
        f.move_to(P(2.2, -0.25))
        self.play(FadeIn(f[0], shift=DOWN * 0.2), run_time=0.4)
        self.play(Create(f[1]), FadeIn(f[2], shift=UP * 0.2), run_time=0.5)
        top.arreter(0.9)
        self.attendre_voix(marge=0.8)

    # ── 01 : la roue de kermesse ────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("La roue de kermesse")
        c = P(-3.6, -0.15)
        tout, d = roue(c, r=1.75)
        for p in d:
            p.set_fill(GRIS_VIDE)
        carte, d_, moyeu, pointe = tout
        self.au_mot("Une roue")
        self.play(FadeIn(carte), FadeIn(moyeu), FadeIn(pointe), run_time=0.3)
        self.au_mot("8 parts égales")
        huit = self.t("8 parts égales", 46, JAUNE_TITRE).move_to(P(-0.8, 1.9), aligned_edge=LEFT)
        self.play(LaggedStart(*[FadeIn(p, scale=0.6) for p in d], lag_ratio=0.1), FadeIn(huit, shift=UP * 0.15),
                  run_time=0.8)
        lignes = [("3 rouges", C_ROUGE, 0.85), ("4 bleues", C_BLEU, -0.15), ("1 dorée", C_DORE, -1.15)]
        for mot, coul, y in lignes:
            self.au_mot(mot)
            lbl = self.t(mot, 50, coul)
            pas_ = VGroup(self.pastille(coul, 0.24), lbl).arrange(RIGHT, buff=0.3).move_to(P(-0.8, y), aligned_edge=LEFT)
            self.play(*[p.animate.set_fill(coul) for p in self.parts(d, coul)], FadeIn(pas_, shift=UP * 0.15),
                      run_time=0.35)
        self.au_mot("gros lot")
        cadeau = gros_lot(1.2).move_to(P(4.4, 0.0))
        nom = self.t("le gros lot", 36, C_DORE).next_to(cadeau, DOWN, buff=0.3)
        self.play(FadeIn(cadeau, scale=0.4), FadeIn(nom, shift=UP * 0.15),
                  self.parts(d, C_DORE)[0].animate.scale(1.12, about_point=c), run_time=0.5)
        self.play(self.parts(d, C_DORE)[0].animate.scale(1 / 1.12, about_point=c), run_time=0.25)
        top = Toupie(self, d, c, vitesse=8.0)
        self.wait(0.9)
        top.arreter(1.0)
        self.play(Flash(pointe, color=C_DORE, line_length=0.3), Wiggle(cadeau), run_time=0.6)
        self.attendre_voix()

    # ── 02 : la règle ───────────────────────────────────────────────────────

    def ecran_regle(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-regle")
        self.titre_ecran("La règle")
        c = P(-4.85, 0.2)
        tout, d = roue(c, r=1.15)
        self.add(tout)
        self.au_mot("équiprobables")
        eq = self.ligne([("issues", WHITE), ("équiprobables", VERT_OK)], 44, 0.25).move_to(P(1.6, 2.05))
        self.play(FadeIn(eq, shift=UP * 0.15), run_time=0.4)
        for p in d:  # chaque part, la même taille
            self.play(p.animate.scale(1.12, about_point=c), run_time=0.09)
            self.play(p.animate.scale(1 / 1.12, about_point=c), run_time=0.09)
        egales = self.t("parts égales", 30, JAUNE_TITRE).next_to(tout, DOWN, buff=0.2)
        self.au_mot("Alors la probabilit")
        self.play(FadeIn(egales), run_time=0.3)
        self.au_mot("la probabilit")
        prob = self.t("probabilité =", 44, WHITE)
        f = self.fraction("nombre d'issues favorables", "nombre d'issues possibles", 46, WHITE,
                          color_num=VERT_OK, color_den=JAUNE_TITRE)
        regle = VGroup(prob, f).arrange(DOWN, buff=0.45)
        if regle.width > 8.4:
            regle.scale_to_fit_width(8.4)
        regle.move_to(P(1.5, -0.1))
        self.play(FadeIn(prob, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("favorables")
        self.play(FadeIn(f[0], shift=DOWN * 0.2), run_time=0.45)
        self.au_mot("divisé par")
        self.play(Create(f[1]), run_time=0.35)
        self.au_mot("possibles")
        self.play(FadeIn(f[2], shift=UP * 0.2), run_time=0.45)
        cadre = SurroundingRectangle(regle, color=JAUNE_TITRE, buff=0.3, stroke_width=4)
        self.play(Create(cadre), run_time=0.5)
        self.attendre_voix()

    # ── 03 : le calcul (et l'échelle, le fil rouge de la série) ─────────────

    EX0, EX1, EY = -5.4, 2.4, -2.25

    def x_de(self, p):
        return self.EX0 + (self.EX1 - self.EX0) * p

    def echelle(self):
        """L'échelle des probabilités : ROUGE à gauche (impossible), VERT à
        droite (certain). Des petits segments colorés un à un : un dégradé de
        Line peut s'inverser selon son orientation."""
        n = 40
        pas = (self.EX1 - self.EX0) / n
        barre = VGroup(*[Line(P(self.EX0 + k * pas, self.EY), P(self.EX0 + (k + 1) * pas, self.EY), stroke_width=12,
                              color=interpolate_color(ManimColor(ROUGE_ERREUR), ManimColor(VERT_OK), (k + 0.5) / n))
                         for k in range(n)])
        bouts = VGroup(*[Line(P(x, self.EY - 0.2), P(x, self.EY + 0.2), stroke_width=5) for x in (self.EX0, self.EX1)])
        imp = self.t("impossible", 26, ROUGE_ERREUR).next_to(P(self.EX0, self.EY), DOWN, buff=0.3)
        cer = self.t("certain", 26, VERT_OK).next_to(P(self.EX1, self.EY), DOWN, buff=0.3)
        return VGroup(barre, bouts, imp, cer)

    def poser(self, f, p, couleur):
        """Une copie de la fraction `f` vient se poser au-dessus de l'échelle, en p."""
        pt = Dot(P(self.x_de(p), self.EY), radius=0.15, color=couleur).set_stroke(WHITE, 2)
        petite = f.copy().scale(0.6).next_to(pt, UP, buff=0.18)
        self.play(TransformFromCopy(f, petite), FadeIn(pt, scale=0.4), run_time=0.6)
        self.play(Indicate(pt, color=couleur, scale_factor=1.8), run_time=0.4)
        return VGroup(pt, petite)

    def ecran_calcul(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-calcul")
        self.titre_ecran("On calcule")
        c = P(-4.6, 0.6)
        tout, d = roue(c, r=1.3)
        self.add(tout)
        x0 = -1.9
        self.au_mot("Gagner le gros lot")
        self.eclairer(d, C_DORE)
        l1 = self.t("gros lot :", 44, C_DORE).move_to(P(x0, 1.45), aligned_edge=LEFT)
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.3)
        f1 = self.fraction(1, 8, 56, WHITE, color_num=C_DORE, color_den=JAUNE_TITRE).next_to(l1, RIGHT, buff=0.5)
        self.au_mot("1 part dorée")
        self.play(FadeIn(f1[0], scale=0.5), run_time=0.3)
        self.gonfler(self.parts(d, C_DORE), c, 1.15)
        self.au_mot("sur 8")
        self.rallumer(d, 0.2)
        self.play(Create(f1[1]), FadeIn(f1[2], shift=UP * 0.1), Indicate(tout[0], color=JAUNE_TITRE, scale_factor=1.03),
                  run_time=0.4)
        self.au_mot("La probabilité est 1 sur 8")
        ech = self.echelle()
        cadre1 = SurroundingRectangle(f1, color=C_DORE, buff=0.15, stroke_width=4)
        self.play(Create(cadre1), Create(ech[0]), FadeIn(ech[1:]), run_time=0.6)
        self.insister(f1, 0.25)
        self.poser(f1, 1 / 8, C_DORE)

        self.au_mot("Tomber sur le bleu")
        self.eclairer(d, C_BLEU)
        l2 = self.t("bleu :", 44, C_BLEU).move_to(P(x0, -0.25), aligned_edge=LEFT)
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.3)
        self.au_mot("4 sur 8")
        f2 = self.fraction(4, 8, 56, WHITE, color_num=C_BLEU, color_den=JAUNE_TITRE)
        f2.next_to(l2, RIGHT, buff=0.5).align_to(f1, LEFT)
        self.play(FadeIn(f2, shift=UP * 0.15), run_time=0.35)
        self.gonfler(self.parts(d, C_BLEU), c, 1.12)
        self.au_mot("un demi")
        eg = self.t("=", 56).next_to(f2, RIGHT, buff=0.35)
        f3 = self.fraction(1, 2, 56, WHITE, color_num=C_BLEU, color_den=C_BLEU).next_to(eg, RIGHT, buff=0.35)
        a1, a2 = math.radians(112.5), math.radians(-67.5)
        diam = DashedLine(c + 1.45 * P(math.cos(a1), math.sin(a1)), c + 1.45 * P(math.cos(a2), math.sin(a2)),
                          color=WHITE, stroke_width=6, dash_length=0.12)
        self.play(FadeIn(eg), FadeIn(f3, scale=0.5), Create(diam), run_time=0.5)
        self.insister(f3, 0.25)
        self.rallumer(d, 0.2)
        self.poser(f3, 1 / 2, C_BLEU)
        self.attendre_voix()

    # ── 04 : trois écritures ────────────────────────────────────────────────

    def etiquette(self, texte, color, font_size=36):
        lbl = self.t(texte, font_size, BLACK)
        fond = RoundedRectangle(width=lbl.width + 0.5, height=lbl.height + 0.35, corner_radius=0.14,
                                fill_color=color, fill_opacity=1, stroke_width=0)
        return VGroup(fond, lbl.move_to(fond))

    def ecran_ecritures(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-ecritures")
        self.titre_ecran("Trois écritures")
        xs, yt, yv = [-4.4, -0.8, 2.9], 1.75, 0.15
        noms = [("en fraction", "fraction", C_DORE), ("en décimal", "décimal", BLEU_CALCUL),
                ("en pourcentage", "pourcentage", VERT_OK)]
        f = self.fraction(1, 8, 64, WHITE, color_num=C_DORE, color_den=JAUNE_TITRE)
        dec = self.t("0,125", 64, BLEU_CALCUL)
        pct = self.t("12,5 %", 64, VERT_OK)
        eg1, eg2 = self.t("=", 64), self.t("=", 64)
        VGroup(f, eg1, dec, eg2, pct).arrange(RIGHT, buff=0.6).move_to(P(-0.6, yv))
        for (ex, mot, coul), v in zip(noms, (f, dec, pct)):
            self.au_mot(ex)
            e = self.etiquette(mot, coul, 34).move_to(P(v.get_x(), yt))
            self.play(GrowFromCenter(e), run_time=0.35)
        # la barre du « tout » (100 %), la part dorée s'y colore
        bx0, bx1, by, bh = -5.6, 4.4, -2.0, 0.6
        tout = Rectangle(width=bx1 - bx0, height=bh, stroke_color=WHITE, stroke_width=3).move_to(P((bx0 + bx1) / 2, by))
        huitiemes = VGroup(*[Line(P(bx0 + k * (bx1 - bx0) / 8, by - bh / 2), P(bx0 + k * (bx1 - bx0) / 8, by + bh / 2),
                                  stroke_width=2, color=GREY_B) for k in range(1, 8)])
        part = Rectangle(width=(bx1 - bx0) / 8, height=bh, fill_color=C_DORE, fill_opacity=1, stroke_color=ENCRE,
                         stroke_width=2).move_to(P(bx0 + (bx1 - bx0) / 16, by))
        self.au_mot("1 sur 8")
        self.play(FadeIn(f, scale=0.5), Create(tout), Create(huitiemes), run_time=0.45)
        self.play(FadeIn(part, shift=DOWN * 0.2), run_time=0.3)
        self.insister(f, 0.22)
        self.au_mot("0,125")
        self.play(FadeIn(eg1), FadeIn(dec, scale=0.5), run_time=0.35)
        self.insister(dec, 0.22)
        self.au_mot("12,5")
        self.play(FadeIn(eg2), FadeIn(pct, scale=0.5), run_time=0.35)
        self.insister(pct, 0.25)
        self.play(Indicate(part, color=JAUNE_TITRE, scale_factor=1.2), run_time=0.5)
        self.attendre_voix()

    # ── 05 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège")
        cg, cd = P(-4.2, 0.15), P(1.3, 0.15)
        gauche, dg = roue(cg, r=1.3)
        self.add(gauche)
        self.au_mot("pas équiprobable")
        pas_eq = self.t("pas équiprobable", 38, ROUGE_ERREUR).move_to(P(1.3, 2.45))
        self.play(FadeIn(pas_eq, shift=UP * 0.15), run_time=0.4)
        self.au_mot("Si la part dorée")
        droite, dd = roue(cd, r=1.3)
        self.play(FadeIn(droite, shift=LEFT * 0.3), run_time=0.4)
        self.au_mot("deux fois plus grande")
        grosse = disque(ROUE_8, 1.3, poids=[2] + [1] * 7).shift(cd)
        self.play(Transform(dd, grosse), run_time=0.9)
        deux = self.t("2 fois plus grande", 30, C_DORE).next_to(droite, DOWN, buff=0.2)
        self.play(FadeIn(deux, shift=UP * 0.1), run_time=0.3)
        self.gonfler([dd[0]], cd, 1.12)
        self.au_mot("1 sur 8 serait faux")
        f = self.fraction(1, 8, 60, WHITE, color_num=C_DORE, color_den=JAUNE_TITRE).move_to(P(4.6, 0.4))
        self.play(FadeIn(f, scale=0.5), run_time=0.35)
        self.au_mot("serait faux")
        faux = self.t("faux", 40, ROUGE_ERREUR).next_to(f, DOWN, buff=0.3)
        self.play(Create(self.barrer(f)), FadeIn(faux, scale=0.6), run_time=0.45)
        croix = VGroup(Line(droite[0].get_corner(UL), droite[0].get_corner(DR)),
                       Line(droite[0].get_corner(UR), droite[0].get_corner(DL))).set_stroke(ROUGE_ERREUR, 8)
        self.play(Create(croix), run_time=0.4)
        self.au_mot("Il faut des parts égales")
        ch = self.chute("Il faut des parts égales.", color=VERT_OK, font_size=42)
        ok = SurroundingRectangle(gauche[0], color=VERT_OK, buff=0.08, stroke_width=6)
        self.play(Write(ch), Create(ok), run_time=0.7)
        for p in dg:
            self.play(p.animate.scale(1.12, about_point=cg), run_time=0.08)
            self.play(p.animate.scale(1 / 1.12, about_point=cg), run_time=0.08)
        self.attendre_voix()

    # ── 06 : défi, la boîte de bonbons (le canvas « billes » du coach) ──────

    CB = P(-2.9, 0.45)

    def boite(self, couleurs):
        carte, bs = boite_de_bonbons(couleurs)
        carte.move_to(self.CB)
        return carte, bs

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 48, JAUNE_TITRE).to_edge(UP)), run_time=0.6)
        carte, bs = self.boite([GRIS_VIDE] * 20)
        x0 = 1.0
        self.au_mot("20 bonbons")
        l0 = self.ligne([("20", JAUNE_TITRE), ("bonbons", WHITE)], 46, 0.2).move_to(P(x0, 1.75), aligned_edge=LEFT)
        self.play(FadeIn(carte[0]), LaggedStart(*[FadeIn(b, scale=0.4) for b in bs], lag_ratio=0.04),
                  FadeIn(l0, shift=UP * 0.15), run_time=0.9)
        self.au_mot("5 au coco")
        l1 = VGroup(self.pastille(C_BLANC, 0.22), self.t("5 au coco", 44, WHITE)).arrange(RIGHT, buff=0.3)
        l1.move_to(P(x0, 0.75), aligned_edge=LEFT)
        self.play(*[b.animate.set_fill(C_BLANC) for b in bs[:5]], FadeIn(l1, shift=UP * 0.15), run_time=0.4)
        self.au_mot("le reste à la fraise")
        l2 = VGroup(self.pastille(C_ROSE, 0.22), self.t("le reste : fraise", 44, C_ROSE)).arrange(RIGHT, buff=0.3)
        l2.move_to(P(x0, -0.25), aligned_edge=LEFT)
        self.play(*[b.animate.set_fill(C_ROSE) for b in bs[5:]], FadeIn(l2, shift=UP * 0.15), run_time=0.4)
        self.au_mot("Quelle est la probabilit")
        q = self.ligne([("Probabilité de tirer un bonbon", WHITE), ("au coco", JAUNE_TITRE), ("?", WHITE)], 38, 0.15)
        q.move_to(P(-0.6, -2.05))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.45)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=42)), run_time=0.7)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction")
        carte, bs = self.boite([C_BLANC] * 5 + [C_ROSE] * 15)
        self.add(carte)
        rangs = [SurroundingRectangle(VGroup(*bs[5 * k:5 * k + 5]), buff=0.08, corner_radius=0.1,
                                      color=GREY_B, stroke_width=3) for k in range(4)]
        self.au_mot("5 favorables")
        fav = SurroundingRectangle(VGroup(*bs[:5]), buff=0.08, corner_radius=0.1, color=BORD_AMBRE, stroke_width=6)
        f1 = self.fraction(5, 20, 54, WHITE, color_num=BORD_AMBRE, color_den=JAUNE_TITRE)
        eg1, f2, eg2 = self.t("=", 54), self.fraction(1, 4, 54, WHITE), self.t("=", 54)
        dec = self.t("0,25", 54, VERT_OK)
        calc = VGroup(f1, eg1, f2, eg2, dec).arrange(RIGHT, buff=0.28).move_to(P(0.75, 0.45), aligned_edge=LEFT)
        self.play(Create(fav), *[b.animate.scale(1.2) for b in bs[:5]], FadeIn(f1[0], scale=0.5), run_time=0.4)
        self.play(*[b.animate.scale(1 / 1.2) for b in bs[:5]], run_time=0.25)
        self.au_mot("sur 20")
        self.play(Create(f1[1]), FadeIn(f1[2], shift=UP * 0.1), Indicate(carte[0], color=JAUNE_TITRE, scale_factor=1.02),
                  run_time=0.4)
        self.au_mot("5 sur 20, c")
        self.insister(f1, 0.22)
        self.au_mot("1 sur 4")
        self.play(*[Create(r) for r in rangs[1:]], run_time=0.4)
        self.play(FadeIn(eg1), FadeIn(f2, scale=0.5), run_time=0.35)
        une = self.t("1 rangée sur 4", 30, BORD_AMBRE).next_to(carte, DOWN, buff=0.2)
        self.play(FadeIn(une, shift=UP * 0.1), run_time=0.3)
        self.insister(f2, 0.22)
        self.au_mot("0,25")
        self.play(FadeIn(eg2), FadeIn(dec, scale=0.5), run_time=0.35)
        self.insister(dec, 0.25)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 48, JAUNE_TITRE).to_edge(UP)), run_time=0.7)
        acquis = [("Si les issues sont", "Si les issues sont équiprobables :"),
                  ("favorables sur possibles", "probabilité = favorables sur possibles"),
                  ("On simplifie", "On simplifie la fraction."),
                  ("en décimal", "On peut l'écrire en décimal.")]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 42)).arrange(RIGHT, buff=0.3) for _, txt in acquis])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.55)
        lignes[1].shift(RIGHT * 0.6)
        if lignes.width > 11.5:
            lignes.scale_to_fit_width(11.5)
        lignes.move_to(P(-0.6, 0.55))
        for (mot, _), l in zip(acquis, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.5)
            self.play(Create(l[0]), run_time=0.3)
        self.au_mot("L'épisode 5")
        self.play(Write(self.chute("L'épisode 5 t'attend : le défi.", color=VERT_OK, font_size=42)))
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
        self.ecran_regle()
        self.ecran_calcul()
        self.ecran_ecritures()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")
