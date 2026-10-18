# proba6_defi.py
# EleveAI — Maths 6e — série « Probabilités », épisode 6 : les défis
# (micro : proba_defi), AVEC VOIX. Paysage 16:9, CEINTURE JAUNE.
# Short jumeau : proba6_defi_short.py (un dé, faire plus grand que 6).
#
# Trois défis enchaînés, chacun « Mets pause, et cherche ! » puis sa correction.
# Écrans : 00 garde · 01 trois défis · 02 défi 1 (roue de 8 parts, 2 rouges)
# · 02b correction (2/8 = 1/4 : la roue en quarts) · 03 défi 2 (deux sacs)
# · 03b correction (même total, le sac B) · 04 défi 3 (le dé, plus grand que 6)
# · 04b correction (aucune face : 0) · 05 ce que tu as appris · 06 abonnement.
# ⭐ Fil rouge de la série : l'ÉCHELLE de « impossible » à « certain » ; chaque
# probabilité trouvée vient s'y poser (1/4, les sacs A et B, puis 0).
#
# ⭐ Canvas repris du coach (lib/tutor-v4/components/ProbabilitesCanvas.tsx,
# banque 6e/maths/probabilites.bank.ts, micro proba_defi) :
#   · « roue » (canvasRoue, roueAvec) : secteurs égaux, départ en haut, sens
#     horaire, liseré ardoise #0f172a, moyeu et pointe ardoise en haut ; secteurs
#     coloriés par nom (rouge #ef4444, les autres gris #9ca3af) ;
#   · « billes » (canvasUrne) : billes SANS lettre en grille de
#     min(6, max(3, ⌈√n⌉)) colonnes sur carte blanche, liseré ardoise —
#     rouge #ef4444, bleu #3b82f6 ;
#   · « de » (6e_proba_defi_fixed_1) : 6 faces en grille 3 × 2 sur carte
#     blanche, face surlignée en ambre.
#
# Voix : manim/voix/6e-proba-defi.json (Julie, débit −10).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/6e/proba6_defi.py Proba6Defi -o eleveai-maths-6e-proba-defi --media_dir manim/scripts/6e/media
# Puis copier le mp4 dans manim/sorties/6e/maths/probabilites/06-defis/.

import importlib.util
import math
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "annonce"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

# ⚠️ des proba_vocabulaire.py existent dans plusieurs dossiers : celui du CM2
# (canvas « de » du coach) se charge par son chemin exact.
_spec = importlib.util.spec_from_file_location(
    "cm2_proba_vocabulaire_pour_6e", Path(__file__).resolve().parents[1] / "cm2" / "proba_vocabulaire.py")
_voc = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_voc)
ARDOISE, BORD_GRIS, CARTE_FOND = _voc.ARDOISE, _voc.BORD_GRIS, _voc.CARTE_FOND
carte_de, surligner = _voc.carte_de, _voc.surligner

# couleurs du coach (COLOR_MAP de ProbabilitesCanvas.tsx)
C_ROUGE = "#ef4444"
C_BLEU = "#3b82f6"
C_GRIS = "#9ca3af"
GRIS_ETEINT = "#6B7280"
CEINTURE = "jaune"


class Notion6eProba(Notion6e):
    identite = "Maths 6e — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


# ── canvas « roue » ─────────────────────────────────────────────────────────

def disque(n, rouges, r=1.4):
    """n secteurs égaux, départ en haut, sens horaire ; `rouges` (indices) en
    rouge, les autres en gris. VGroup de secteurs, [i] = i-ème secteur."""
    g = VGroup()
    for i in range(n):
        g.add(AnnularSector(inner_radius=0, outer_radius=r, angle=-2 * PI / n, start_angle=PI / 2 - i * 2 * PI / n,
                            fill_color=C_ROUGE if i in rouges else C_GRIS, fill_opacity=1,
                            stroke_color=ARDOISE, stroke_width=3))
    return g


def roue(centre, n=8, rouges=(0, 1), r=1.4):
    """La roue du coach sur sa carte blanche : (tout, carte, disque, moyeu, pointe)."""
    d = disque(n, set(rouges), r).move_to(centre)
    moyeu = Dot(centre, radius=r * 0.06, color=ARDOISE)
    pointe = Polygon(P(0, 0), P(-0.16, 0.34), P(0.16, 0.34), fill_color=ARDOISE, fill_opacity=1,
                     stroke_width=0).scale(r / 1.4).move_to(centre + UP * (r - 0.12 * r / 1.4), aligned_edge=DOWN)
    carte = RoundedRectangle(width=2 * r + 0.7, height=2 * r + 0.9, corner_radius=0.2, fill_color=CARTE_FOND,
                             fill_opacity=1, stroke_color=BORD_GRIS, stroke_width=2).move_to(centre + UP * 0.1)
    return VGroup(carte, d, moyeu, pointe), carte, d


def faire_tourner(d, centre, vitesse=5.0):
    d.add_updater(lambda m, dt: m.rotate(-vitesse * dt, about_point=centre))


# ── canvas « billes » (sans lettre, comme canvasUrne en 6e) ─────────────────

def bille(couleur, r=0.34):
    return Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_color=ARDOISE, stroke_width=3)


def sac_billes(n_rouges, n, centre, pas=0.85, r=0.34):
    """Le canvas « billes » dans son sac : colonnes = min(6, max(3, ⌈√n⌉)).
    Renvoie (sac, carte, billes)."""
    cols = min(6, max(3, math.ceil(math.sqrt(n))))
    lignes = math.ceil(n / cols)
    pos = [P((i % cols) * pas, -(i // cols) * pas) for i in range(n)]
    carte = RoundedRectangle(width=cols * pas + 0.3, height=lignes * pas + 0.3, corner_radius=0.2,
                             fill_color=CARTE_FOND, fill_opacity=1, stroke_color=BORD_GRIS, stroke_width=2)
    carte.move_to(P((cols - 1) * pas / 2, -(lignes - 1) * pas / 2))
    decal = centre - carte.get_center()
    carte.shift(decal)
    billes = VGroup(*[bille(C_ROUGE if i < n_rouges else C_BLEU, r).move_to(p + decal) for i, p in enumerate(pos)])
    corps = RoundedRectangle(width=carte.width + 0.7, height=carte.height + 0.7, corner_radius=0.5,
                             stroke_color=WHITE, stroke_width=4, fill_color="#E0F2FE",
                             fill_opacity=0.08).move_to(carte)
    col = Polygon(P(-0.7, 0), P(0.7, 0), P(0.4, 0.4), P(-0.4, 0.4), stroke_color=WHITE, stroke_width=4,
                  fill_color="#E0F2FE", fill_opacity=0.08).move_to(corps.get_top() + UP * 0.2)
    lien = Line(P(-0.5, 0), P(0.5, 0), color=ORANGE_RETENUE, stroke_width=7).move_to(corps.get_top() + UP * 0.22)
    return VGroup(corps, col, lien), carte, billes


# ── l'échelle des probabilités (fil rouge de la série) ──────────────────────

def echelle_proba(x0, x1, y, mots=True, taille=26):
    """La barre de « impossible » (rouge, à gauche) à « certain » (vert, à droite),
    un trait au milieu. AUCUN nombre : ils n'arrivent qu'avec la voix."""
    barre = Line(P(x0, y), P(x1, y), stroke_width=12)
    barre.set_color([VERT_OK, JAUNE_TITRE, ORANGE_RETENUE, ROUGE_ERREUR])  # rouge à gauche (Manim inverse)
    traits = VGroup(*[Line(P(x, y - 0.2), P(x, y + 0.2), stroke_width=5)
                      for x in (x0, (x0 + x1) / 2, x1)])
    g = VGroup(barre, traits)
    if mots:
        g.add(Text("impossible", font_size=taille, color=ROUGE_ERREUR).next_to(P(x0, y - 0.2), DOWN, buff=0.15),
              Text("certain", font_size=taille, color=VERT_OK).next_to(P(x1, y - 0.2), DOWN, buff=0.15))
    return g


def repere(x, y, couleur=JAUNE_TITRE, h=0.55):
    """Une flèche posée sur l'échelle, au point x."""
    return Arrow(P(x, y + h), P(x, y + 0.08), buff=0, color=couleur, stroke_width=6,
                 max_tip_length_to_length_ratio=0.45)


def fraction(a, b, font_size=56, couleur=JAUNE_TITRE):
    """Une fraction empilée en Text : [0] numérateur, [1] barre, [2] dénominateur."""
    num = Text(str(a), font_size=font_size, color=couleur)
    den = Text(str(b), font_size=font_size, color=couleur)
    larg = max(num.width, den.width) + 0.2
    barre = Line(LEFT * larg / 2, RIGHT * larg / 2, stroke_width=max(3, font_size / 12), color=WHITE)
    num.next_to(barre, UP, buff=0.12)
    den.next_to(barre, DOWN, buff=0.12)
    return VGroup(num, barre, den)


# ── la vidéo ────────────────────────────────────────────────────────────────

class Proba6Defi(Notion6eProba):
    nom_voix = "6e-proba-defi"

    # l'échelle du bas, sur chaque correction (Ti-Margo reste à droite)
    EX0, EX1, EY = -5.6, 2.4, -2.55

    def xe(self, p):
        return self.EX0 + (self.EX1 - self.EX0) * p

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

    def insister(self, mob, run_time=0.35):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def pause_icone(self, h=0.8, couleur=ORANGE_RETENUE):
        barres = VGroup(*[RoundedRectangle(width=h * 0.28, height=h, corner_radius=0.06, fill_color=couleur,
                                           fill_opacity=1, stroke_width=0) for _ in range(2)])
        barres.arrange(RIGHT, buff=h * 0.22)
        rond = Circle(radius=h * 0.9, stroke_color=couleur, stroke_width=5).move_to(barres)
        return VGroup(rond, barres)

    def loupe(self, s=1.0, couleur=BLEU_CALCUL):
        verre = Circle(radius=0.42, stroke_color=couleur, stroke_width=8)
        manche = Line(P(0.3, -0.3), P(0.75, -0.75), color=couleur, stroke_width=14)
        return VGroup(verre, manche).scale(s)

    def mets_pause(self, y=-2.7):
        """« Mets pause, et cherche ! » en orange, avec le bouton pause qui bat."""
        ch = self.t("Mets pause, et cherche !", 46, ORANGE_RETENUE).move_to(P(-0.9, y))
        ic = self.pause_icone(0.34).next_to(ch, LEFT, buff=0.4)
        self.play(Write(ch), FadeIn(ic, scale=0.5), run_time=0.8)
        self.play(ic.animate.scale(1.4), run_time=0.25)
        self.play(ic.animate.scale(1 / 1.4), run_time=0.25)

    def echelle(self):
        return echelle_proba(self.EX0, self.EX1, self.EY)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Les défis", 72, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures(CEINTURE).move_to(P(-0.6, -2.75))
        self.add(ech)
        # les trois dessins des défis : la roue, les deux sacs, le dé
        ro, _, d = roue(P(-4.6, 0.0), 8, (0, 1), r=1.05)
        sa = VGroup(*sac_billes(1, 4, P(-1.35, 0.15), pas=0.5, r=0.2))
        sb = VGroup(*sac_billes(2, 4, P(1.35, 0.15), pas=0.5, r=0.2))
        carte, faces = carte_de(0.62, 0.12)
        carte.move_to(P(4.2, 0.0))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), run_time=0.9)
        self.play(LaggedStart(FadeIn(ro, shift=UP * 0.3), FadeIn(VGroup(sa, sb), shift=UP * 0.3),
                              FadeIn(carte, shift=UP * 0.3), lag_ratio=0.3), run_time=1.0)
        faire_tourner(d, P(-4.6, 0.0), 6.0)
        self.au_mot("probabilités")
        self.play(*surligner(faces[5]), run_time=0.3)
        self.attendre_voix(marge=1.0)
        d.clear_updaters()

    # ── 01 : trois défis ────────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.au_mot("Trois défis")
        titre = self.t("Trois défis", 54, JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre), run_time=0.6)
        xs = [-4.4, -0.6, 3.2]
        cartes = VGroup(*[RoundedRectangle(width=3.0, height=2.6, corner_radius=0.2, stroke_color=BLEU_CALCUL,
                                           stroke_width=4, fill_color="#0F172A", fill_opacity=0.6).move_to(P(x, 0.9))
                          for x in xs])
        i1 = roue(P(0, 0), 8, (0, 1), 0.8)[0].move_to(cartes[0])
        i2 = VGroup(VGroup(*sac_billes(1, 4, P(-1.3, 0), pas=0.36, r=0.14)),
                    VGroup(*sac_billes(2, 4, P(1.3, 0), pas=0.36, r=0.14)))
        i2.scale_to_fit_width(2.6).move_to(cartes[1])
        i3 = carte_de(0.5, 0.1)[0].move_to(cartes[2])
        self.play(LaggedStart(*[AnimationGroup(Create(c), FadeIn(i, scale=0.6))
                                for c, i in zip(cartes, (i1, i2, i3))], lag_ratio=0.35), run_time=1.4)
        self.au_mot("mets pause")
        ic = self.pause_icone(0.55).move_to(P(-2.4, -1.7))
        mp = self.t("pause", 48, ORANGE_RETENUE).next_to(ic, RIGHT, buff=0.35)
        self.play(FadeIn(ic, scale=0.4), FadeIn(mp, shift=LEFT * 0.2), run_time=0.5)
        self.insister(ic, 0.25)
        self.au_mot("cherche")
        lp = self.loupe(0.8).move_to(P(1.6, -1.7))
        ch = self.t("cherche", 48, BLEU_CALCUL).next_to(lp, RIGHT, buff=0.3)
        self.play(FadeIn(lp, scale=0.4), FadeIn(ch, shift=LEFT * 0.2), run_time=0.5)
        self.play(lp.animate.shift(RIGHT * 0.25 + UP * 0.1), run_time=0.3)
        self.play(lp.animate.shift(LEFT * 0.25 + DOWN * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 02 : défi 1, la roue de 8 parts ─────────────────────────────────────

    XR1, YR1 = -3.4, 0.25

    def ecran_defi1(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("02-defi1")
        titre = self.t("Défi 1", 56, JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre), run_time=0.5)
        c = P(self.XR1, self.YR1)
        ro, carte, d = roue(c, 8, (), r=1.6)
        moyeu, pointe = ro[2], ro[3]
        self.au_mot("une roue")
        self.add(carte)
        self.play(LaggedStart(*[FadeIn(s, scale=0.8) for s in d], lag_ratio=0.12),
                  FadeIn(moyeu), FadeIn(pointe), run_time=0.9)
        self.au_mot("8 parts")
        l8 = self.ligne([("8", JAUNE_TITRE), ("parts", WHITE)], 56).move_to(P(2.2, 1.5))
        self.play(LaggedStart(*[Indicate(s, color=WHITE, scale_factor=1.08) for s in d], lag_ratio=0.1),
                  FadeIn(l8, shift=LEFT * 0.2), run_time=1.0)
        self.au_mot("2 sont rouges")
        l2 = self.ligne([("2", JAUNE_TITRE), ("rouges", C_ROUGE)], 56).next_to(l8, DOWN, buff=0.4).align_to(l8, LEFT)
        self.play(d[0].animate.set_fill(C_ROUGE), d[1].animate.set_fill(C_ROUGE), FadeIn(l2, shift=LEFT * 0.2),
                  run_time=0.5)
        self.play(d[0].animate.scale(1.15), d[1].animate.scale(1.15), run_time=0.25)
        self.play(d[0].animate.scale(1 / 1.15), d[1].animate.scale(1 / 1.15), run_time=0.25)
        self.au_mot("Quelle est la probabilité")
        q = self.ligne([("Probabilité", ORANGE_RETENUE), ("?", ORANGE_RETENUE)], 52)
        q.next_to(l2, DOWN, buff=0.55).align_to(l8, LEFT)
        self.play(FadeIn(q, scale=0.6), run_time=0.4)
        self.insister(q[1], 0.25)
        self.au_mot("Mets pause")
        self.mets_pause()
        faire_tourner(d, c, 4.0)
        self.attendre_voix(marge=2.0)
        d.clear_updaters()

    def ecran_correction1(self):
        self.clear()
        self.add_mascotte()
        self.dire("02b-correction1")
        self.titre_ecran("Correction")
        c = P(-3.7, 1.0)
        ro, carte, d = roue(c, 8, (0, 1), r=1.35)
        ech = self.echelle()
        self.play(FadeIn(ro), FadeIn(ech), run_time=0.4)
        self.au_mot("2 parts")
        f28 = fraction(2, 8, 72).move_to(P(0.3, 1.0))
        self.play(FadeIn(f28[0], shift=DOWN * 0.2), d[0].animate.scale(1.15), d[1].animate.scale(1.15),
                  run_time=0.35)
        self.play(d[0].animate.scale(1 / 1.15), d[1].animate.scale(1 / 1.15), run_time=0.25)
        self.au_mot("sur 8")
        self.play(LaggedStart(*[Indicate(s, color=WHITE, scale_factor=1.08) for s in d], lag_ratio=0.1),
                  Create(f28[1]), FadeIn(f28[2], shift=UP * 0.2), run_time=0.9)
        self.au_mot("c'est aussi")
        # la roue en quarts : deux diamètres blancs, chaque quart = 2 parts
        r = 1.35
        quarts = VGroup(Line(c + UP * r, c + DOWN * r), Line(c + LEFT * r, c + RIGHT * r))
        quarts.set_stroke(WHITE, 9)
        egal = self.t("=", 72).move_to(P(1.6, 1.0))
        self.play(Create(quarts), FadeIn(egal), run_time=0.6)
        self.au_mot("1 sur 4")
        f14 = fraction(1, 4, 72).move_to(P(2.9, 1.0))
        quart_rouge = VGroup(d[0], d[1])
        self.play(FadeIn(f14, scale=0.6), run_time=0.4)
        self.play(quart_rouge.animate.scale(1.2, about_point=c), run_time=0.3)
        self.play(quart_rouge.animate.scale(1 / 1.2, about_point=c), run_time=0.3)
        # 1/4 vient se poser sur l'échelle
        fl = repere(self.xe(0.25), self.EY, JAUNE_TITRE)
        petit = fraction(1, 4, 34).next_to(fl, UP, buff=0.08)
        self.play(TransformFromCopy(f14, petit), GrowArrow(fl), run_time=0.7)
        self.insister(petit, 0.25)
        self.attendre_voix(marge=1.0)

    # ── 03 : défi 2, les deux sacs ──────────────────────────────────────────

    XA, XB, YS = -4.95, -0.25, 0.15

    def deux_sacs(self):
        """Les sacs A et B (canvas « billes ») : (sacA, cA, bA, nomA, sacB, cB, bB, nomB)."""
        sa, ca, ba = sac_billes(1, 4, P(self.XA, self.YS))
        sb, cb, bb = sac_billes(2, 4, P(self.XB, self.YS))
        na = self.t("Sac A", 40).next_to(sa, UP, buff=0.15)
        nb = self.t("Sac B", 40).next_to(sb, UP, buff=0.15)
        return sa, ca, ba, na, sb, cb, bb, nb

    def compte(self, n, x):
        """« 1 rouge sur 4 » sous un sac."""
        g = self.ligne([(str(n), JAUNE_TITRE), ("rouge" if n == 1 else "rouges", C_ROUGE), ("sur", WHITE),
                        ("4", JAUNE_TITRE)], 40, 0.18)
        return g.move_to(P(x, self.YS - 1.85))

    def ecran_defi2(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("03-defi2")
        titre = self.t("Défi 2", 56, JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre), run_time=0.5)
        sa, ca, ba, na, sb, cb, bb, nb = self.deux_sacs()
        la, lb = self.compte(1, self.XA), self.compte(2, self.XB)
        self.au_mot("Sac A")
        self.play(Create(sa), FadeIn(ca), FadeIn(na), run_time=0.5)
        self.au_mot("1 bille rouge")
        self.play(FadeIn(ba[0], shift=DOWN * 0.5, scale=0.4), FadeIn(la[0:2], shift=UP * 0.2), run_time=0.5)
        self.au_mot("sur 4")
        self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 0.5, scale=0.4) for b in ba[1:]], lag_ratio=0.2),
                  FadeIn(la[2:], shift=UP * 0.2), run_time=0.7)
        self.au_mot("Sac B")
        self.play(Create(sb), FadeIn(cb), FadeIn(nb), run_time=0.5)
        self.au_mot("2 billes rouges")
        self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 0.5, scale=0.4) for b in bb[:2]], lag_ratio=0.2),
                  FadeIn(lb[0:2], shift=UP * 0.2), run_time=0.6)
        self.au_mot("rouges sur 4")
        self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 0.5, scale=0.4) for b in bb[2:]], lag_ratio=0.2),
                  FadeIn(lb[2:], shift=UP * 0.2), run_time=0.6)
        self.au_mot("Dans quel sac")
        q = self.t("Quel sac ?", 54, ORANGE_RETENUE).move_to(P(4.4, 1.0))
        self.play(FadeIn(q, scale=0.5), run_time=0.4)
        self.insister(q, 0.25)
        self.au_mot("tirer une rouge")
        rouges = VGroup(ba[0], bb[0], bb[1])
        self.play(rouges.animate.set_stroke(JAUNE_TITRE, 6), run_time=0.3)
        self.play(rouges.animate.set_stroke(ARDOISE, 3), run_time=0.3)
        self.au_mot("Mets pause")
        self.mets_pause()
        self.attendre_voix(marge=2.0)

    def ecran_correction2(self):
        self.clear()
        self.add_mascotte()
        self.dire("03b-correction2")
        self.titre_ecran("Correction")
        sa, ca, ba, na, sb, cb, bb, nb = self.deux_sacs()
        la, lb = self.compte(1, self.XA), self.compte(2, self.XB)
        ech = self.echelle()
        self.add(sa, ca, ba, na, sb, cb, bb, nb, la, lb)
        self.play(FadeIn(ech), run_time=0.3)
        self.au_mot("Même total")
        mt = self.t("même total", 46, BLEU_CALCUL).move_to(P(4.4, 1.7))
        self.play(FadeIn(mt, shift=LEFT * 0.2), run_time=0.4)
        self.au_mot("4 billes")
        q4 = self.ligne([("4", JAUNE_TITRE), ("billes", WHITE)], 52).move_to(P(4.4, 0.85))
        self.play(FadeIn(q4, scale=0.6),
                  LaggedStart(*[Indicate(b, color=WHITE, scale_factor=1.25) for b in [*ba, *bb]], lag_ratio=0.08),
                  la[3].animate.scale(1.5), lb[3].animate.scale(1.5), run_time=0.9)
        self.play(la[3].animate.scale(1 / 1.5), lb[3].animate.scale(1 / 1.5), run_time=0.3)
        self.au_mot("Sac B")
        cadre = SurroundingRectangle(VGroup(sb, nb, lb), color=VERT_OK, buff=0.15, stroke_width=7, corner_radius=0.2)
        self.play(Create(cadre), VGroup(sa, ca, ba, na, la).animate.set_opacity(0.35), run_time=0.5)
        self.au_mot("2 rouges")
        self.play(*[b.animate.scale(1.35) for b in bb[:2]], lb[0].animate.scale(1.5), run_time=0.3)
        self.play(*[b.animate.scale(1 / 1.35) for b in bb[:2]], lb[0].animate.scale(1 / 1.5), run_time=0.3)
        self.au_mot("plus probable")
        pp = self.t("plus probable", 48, VERT_OK).move_to(P(4.4, -0.35))
        ok = self.coche(taille=0.3).next_to(pp, DOWN, buff=0.3)
        self.play(FadeIn(pp, scale=0.6), Create(ok), run_time=0.45)
        # les deux sacs se posent sur l'échelle (flèches PAR-DESSOUS : B plus à droite)
        fa = repere(self.xe(0.25), self.EY, GRIS_ETEINT).rotate(PI, about_point=P(self.xe(0.25), self.EY))
        fb = repere(self.xe(0.5), self.EY, VERT_OK).rotate(PI, about_point=P(self.xe(0.5), self.EY))
        ta = self.t("A", 36, GRIS_ETEINT).next_to(fa, DOWN, buff=0.08)
        tb = self.t("B", 36, VERT_OK).next_to(fb, DOWN, buff=0.08)
        self.play(GrowArrow(fa), FadeIn(ta), run_time=0.4)
        self.play(GrowArrow(fb), FadeIn(tb), run_time=0.4)
        self.insister(tb, 0.25)
        self.attendre_voix(marge=1.0)

    # ── 04 : défi 3, le dé ──────────────────────────────────────────────────

    def ecran_defi3(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("04-defi3")
        titre = self.t("Défi 3", 56, JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("Avec un dé")
        carte, faces = carte_de(1.3, 0.24)
        carte.move_to(P(-3.4, 0.3))
        self.play(FadeIn(carte[0]), LaggedStart(*[FadeIn(f, scale=0.5) for f in faces], lag_ratio=0.12),
                  run_time=1.0)
        self.au_mot("quelle est la probabilité")
        q = self.ligne([("Probabilité", ORANGE_RETENUE), ("?", ORANGE_RETENUE)], 52).move_to(P(2.6, -0.3))
        self.play(FadeIn(q, scale=0.6), run_time=0.4)
        self.au_mot("plus grand que 6")
        pg = self.ligne([("plus grand que", WHITE), ("6", JAUNE_TITRE)], 50).move_to(P(2.6, 1.1))
        self.play(FadeIn(pg, shift=DOWN * 0.2), Indicate(faces[5], color=JAUNE_TITRE, scale_factor=1.2), run_time=0.6)
        self.insister(pg[1], 0.25)
        self.au_mot("Mets pause")
        self.mets_pause()
        self.attendre_voix(marge=2.0)

    def croix(self, centre, s=0.45, couleur=ROUGE_ERREUR):
        return VGroup(Line(centre + P(-s, -s), centre + P(s, s)), Line(centre + P(-s, s), centre + P(s, -s))
                      ).set_stroke(couleur, 9)

    def ecran_correction3(self):
        self.clear()
        self.add_mascotte()
        self.dire("04b-correction3")
        self.titre_ecran("Correction")
        carte, faces = carte_de(1.1, 0.2)
        carte.move_to(P(-3.6, 0.85))
        ech = self.echelle()
        self.play(FadeIn(carte), FadeIn(ech), run_time=0.4)
        self.au_mot("Aucune face")
        af = self.t("aucune face", 48).move_to(P(2.4, 1.6))
        croix = VGroup(*[self.croix(f.get_center(), 0.32) for f in faces])
        self.play(FadeIn(af, shift=LEFT * 0.2), run_time=0.3)
        for f, x in zip(faces, croix):
            self.play(Indicate(f, color=ROUGE_ERREUR, scale_factor=1.12), Create(x), run_time=0.22)
        self.au_mot("impossible")
        imp = self.t("impossible", 62, ROUGE_ERREUR).move_to(P(2.4, 0.5))
        self.play(FadeIn(imp, scale=0.6), run_time=0.4)
        self.insister(imp, 0.25)
        self.au_mot("est 0")
        zero = self.t("0", 96, JAUNE_TITRE).move_to(P(2.4, -0.75))
        self.play(FadeIn(zero, scale=0.4), run_time=0.35)
        # 0 se pose tout au bout de l'échelle, côté « impossible »
        fl = repere(self.xe(0), self.EY, JAUNE_TITRE)
        petit = self.t("0", 40, JAUNE_TITRE).next_to(fl, UP, buff=0.08)
        self.play(TransformFromCopy(zero, petit), GrowArrow(fl), run_time=0.7)
        self.insister(petit, 0.25)
        self.attendre_voix(marge=1.0)

    # ── 05 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        self.dire("05-finale")
        self.play(Write(self.t("Ce que tu as appris", 48, JAUNE_TITRE).to_edge(UP)), run_time=0.8)
        textes = ["Compter les issues", "Écrire une fraction", "Comparer", "Reconnaître l'impossible"]
        extraits = ["Compter les issues", "écrire une fraction", "comparer", "reconnaître l'impossible"]
        # petites icônes : le dé, la roue en quarts, les deux sacs, le dé barré
        i1 = carte_de(0.36, 0.06, surligne=(6,))[0]
        i2 = roue(P(0, 0), 8, (0, 1), 0.5)[0]
        i3 = VGroup(VGroup(*sac_billes(1, 4, P(-1.05, 0), pas=0.3, r=0.12)),
                    VGroup(*sac_billes(2, 4, P(1.05, 0), pas=0.3, r=0.12)))
        c4, f4 = carte_de(0.36, 0.06)
        i4 = VGroup(c4, *[self.croix(f.get_center(), 0.11) for f in f4])
        lignes = VGroup()
        for k, (txt, ic) in enumerate(zip(textes, (i1, i2, i3, i4))):
            ic.scale_to_fit_height(0.9)
            l = VGroup(self.coche(taille=0.28), self.t(txt, 44)).arrange(RIGHT, buff=0.35)
            l.move_to(P(0, 1.85 - 1.15 * k)).align_to(P(-3.6, 0), LEFT)
            ic.move_to(P(-4.9, l.get_y()))
            lignes.add(VGroup(l, ic))
        for ex, g in zip(extraits, lignes):
            self.au_mot(ex)
            self.play(FadeIn(g[1], scale=0.5), FadeIn(g[0][1], shift=RIGHT * 0.2), run_time=0.5)
            self.play(Create(g[0][0]), run_time=0.3)
        self.au_mot("L'épisode 7")
        ch = self.ligne([("Épisode", WHITE), ("7", JAUNE_TITRE), (":", WHITE), ("les fréquences", BLEU_CALCUL)], 44)
        ch.move_to(P(-1.0, -2.95))
        self.play(FadeIn(ch, shift=UP * 0.2), run_time=0.6)
        self.insister(ch[1], 0.3)
        self.attendre_voix(marge=1.0)

    # ── 06 : abonnement (rien qui ne soit dit) ──────────────────────────────

    def page_abonnement(self, voix="06-abonne"):
        self.clear()
        self.dire(voix)
        self.add_mascotte(scale=0.9)
        self.au_mot("va sur le coach")
        entraine = self.t("Va sur le coach", 46, JAUNE_TITRE).move_to(P(0, 2.05))
        self.play(Write(entraine), run_time=0.6)
        self.au_mot("sur éleveai")
        site = self.t("eleveai.fr", 58, BLEU_CALCUL).move_to(P(0, 1.05))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.26, stroke_width=3)
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.6)
        self.au_mot("abonne-toi")
        abonne = self.t("Abonne-toi à la chaîne !", 44, VERT_OK).move_to(P(0, -0.7))
        self.play(FadeIn(abonne, shift=UP * 0.15), run_time=0.5)
        self.play(Flash(abonne, color=VERT_OK, line_length=0.3), run_time=0.6)
        self.attendre_voix(marge=1.4)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_defi1()
        self.ecran_correction1()
        self.ecran_defi2()
        self.ecran_correction2()
        self.ecran_defi3()
        self.ecran_correction3()
        self.ecran_finale()
        self.page_abonnement(voix="06-abonne")
