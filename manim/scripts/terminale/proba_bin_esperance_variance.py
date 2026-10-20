# proba_bin_esperance_variance.py
# EleveAI — Maths Tle spé — série « Probabilités » : ESPÉRANCE, VARIANCE et
# ÉCART-TYPE d'une loi binomiale (micro binomiale_esperance_variance, notion
# loi_binomiale), AVEC VOIX. Paysage 16:9, CEINTURE NOIRE.
# Short jumeau : proba_bin_esperance_variance_short.py (ceinture orange).
#
# ⭐ Canvas du coach repris (banque terminale-spe/loi-binomiale) :
#   · le `stat_graph` « batons » (binomialeBatonsCanvas : carte blanche, axes
#     encre, bâtons gris ardoise terminés par un point, le bâton actif en
#     ambre #f59e0b) : ici la loi B(100 ; 0,7), puis B(400 ; 0,5) ;
#   · l'`arbre_proba` de Bernoulli (arbreBernoulliCanvas : carte blanche,
#     branches grises, S en haut, probabilité en bleu) réduit à une épreuve :
#     la BRANCHE DOUBLE réussi / raté, de gauche à droite.
# ⛔ PAS D'ÉCART : aucune graduation, aucune valeur de bâton ; un nombre ne
# s'écrit qu'au moment où la voix le dit.
#
# Écrans : 00 garde · 01 la basketteuse (0,7, 100 lancers, B(100 ; 0,7)) ·
# 02 E(X) = np = 70 · 03 V(X) = np(1 − p) = 21 · 04 σ = √21 ≈ 4,58 ·
# 05 le sens (des entraînements qui s'empilent autour de 70) · 06 le piège
# (21 au lieu de √21) · 07 défi (pièce, 400 lancers) · 07b correction
# (200, 100, 10) · 08 ce que tu as appris · 09 fin (« Entraîne-toi sur
# eleveai.fr », « Abonne-toi ! @eleveai974 »).
#
# Voix : manim/voix/terminale-proba-bin-esperance-variance.json (débit −6).
# Rendu (depuis la racine du dépôt ; media à soi, sinon WinError 32) :
# python -m manim render -qh --disable_caching manim/scripts/terminale/proba_bin_esperance_variance.py ProbaBinEsperanceVarianceTerminale -o eleveai-maths-terminale-proba-bin-esperance-variance --media_dir manim/scripts/terminale/media-bin_esperance_variance
# Sortie : manim/sorties/terminale/maths/probabilites/14-bin-esperance-variance/.

import json
import math
import random
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "premiere"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "stmg"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "annonce"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import BORD, BRANCHE, ENCRE, PROBA, lettre, suite  # noqa: E402
from proba_bern_epreuve import ECHEC, SUCCES, BrancheDouble, Panier, ballon  # noqa: E402
from annonce_probabilites import piece_qui_tourne  # noqa: E402

BATON = "#94A3B8"       # le bâton du stat_graph (couleur par défaut du coach)
ACTIF = "#F59E0B"       # le bâton actif du coach (ambre)
COUL_N = ORANGE_RETENUE  # n
COUL_P = "#60A5FA"      # p et 1 − p
MOYENNE = "#D97706"     # la ligne de l'espérance (ambre foncé : lisible sur la carte blanche)


def P(x, y):
    return np.array([x, y, 0.0])


def racine(contenu, color=WHITE, sw=3.5):
    """√ DESSINÉE : petit crochet, grand trait montant, barre au-dessus du
    radicande (un mobject déjà construit). Renvoie VGroup(signe, contenu)."""
    h = contenu.height
    g = contenu.get_left() + LEFT * 0.12
    bas = contenu.get_bottom()[1] - 0.06
    haut = contenu.get_top()[1] + 0.1
    signe = VMobject(stroke_color=color, stroke_width=sw)
    signe.set_points_as_corners([
        P(g[0] - 0.36 * h - 0.12, bas + 0.42 * h), P(g[0] - 0.36 * h, bas + 0.5 * h),
        P(g[0] - 0.18 * h, bas), P(g[0], haut), P(contenu.get_right()[0] + 0.06, haut),
    ])
    return VGroup(signe, contenu)


def rac_txt(texte, fs=44, color=WHITE, c_signe=None):
    """« √21 » : le radicande en Text sous une racine dessinée."""
    t = Text(texte, font_size=fs, color=color)
    return racine(t, c_signe or color, sw=max(2.5, fs / 13))


def vol(b, chemin, tours=-2 * PI):
    """Le ballon suit le chemin EN TOURNANT : une seule animation (MoveAlongPath
    + Rotate sur le même objet se contrediraient)."""
    depart = b.copy()

    def f(m, a):
        m.become(depart.copy().rotate(tours * a).move_to(chemin.point_from_proportion(a)))
    return UpdateFromAlphaFunc(b, f)


# ── ⭐ au_mot() CALÉ SUR LES MOTS (méthode de proba_bin_defi.py) ───────────
# Les instants de chaque mot sont relus dans proba_bin_esperance_variance_marques.json
# (et _short_marques.json), produits par le MÊME moteur WinRT (Julie, débit −6,
# hauteur +6) avec IncludeWordBoundaryMetadata : [[position, instant en s], …].
# Un retard de plus de 0,3 s s'imprime « RETARD … » (contrôle au dry run).

class MotsCales:
    fichier_marques = None

    def _marques(self):
        if not hasattr(self, "_cache_marques"):
            ch = Path(__file__).resolve().parent / self.fichier_marques
            self._cache_marques = json.loads(ch.read_text(encoding="utf-8")) if ch.exists() else {}
        return self._cache_marques

    def dire(self, nom, dossier=None):
        self._cle_voix = nom
        return super().dire(nom, dossier)

    def au_mot(self, extrait):
        marques = self._marques().get(getattr(self, "_cle_voix", None))
        if not marques or not self._duree_voix:
            return super().au_mot(extrait)
        i = self._texte_voix.find(extrait)
        if i < 0:
            raise ValueError(f"« {extrait} » absent de la voix : {self._texte_voix[:60]}…")
        t = max([m[1] for m in marques if m[0] <= i] or [0.0])
        reste = self._debut_voix + t - self.renderer.time
        if reste < -0.3:
            print(f"RETARD {self._cle_voix} « {extrait} » : {-reste:.2f} s", flush=True)
        if reste > 0.05:
            self.wait(reste)


def pmf(n, p, k):
    return math.comb(n, k) * p ** k * (1 - p) ** (n - k)


# ── le stat_graph « bâtons » du coach : la loi binomiale ────────────────────

class CarteBatons(VGroup):
    """Carte blanche, deux axes encre, un bâton gris (trait + point) par
    valeur k de kmin à kmax, hauteur P(X = k). Aucune graduation : les
    nombres se posent (etiquette) quand la voix les dit."""

    def __init__(self, n, p, kmin, kmax, larg=9.0, haut=3.6, titre=None, sw=4, **kw):
        super().__init__(**kw)
        self.n, self.p, self.kmin, self.kmax = n, p, kmin, kmax
        self.larg, self.haut = larg, haut
        self.carte = RoundedRectangle(width=larg, height=haut, corner_radius=0.2, fill_color=WHITE,
                                      fill_opacity=1, stroke_color=BORD, stroke_width=2)
        self.add(self.carte)
        haut_titre = 0.0
        self.titre = VGroup()
        if titre:
            self.titre = Text(titre, font_size=24, color=ENCRE, weight=BOLD)
            self.titre.next_to(self.carte.get_top(), DOWN, buff=0.14)
            haut_titre = 0.42
            self.add(self.titre)
        self.y0 = -haut / 2 + 0.5                    # l'axe horizontal (place pour une étiquette dessous)
        self.x_g = -larg / 2 + 0.4
        self.x_d = larg / 2 - 0.3
        self.h_max = haut - 0.5 - 0.3 - haut_titre - 0.25
        self.axe_x = Line(P(self.x_g, self.y0), P(self.x_d, self.y0), color=ENCRE, stroke_width=2)
        self.axe_y = Line(P(self.x_g, self.y0), P(self.x_g, self.y0 + self.h_max + 0.15), color=ENCRE,
                          stroke_width=2)
        self.add(self.axe_x, self.axe_y)
        vmax = max(pmf(n, p, k) for k in range(kmin, kmax + 1))
        self.batons = VGroup()
        self.par_k = {}
        for k in range(kmin, kmax + 1):
            x = self.x_de(k, local=True)
            h = pmf(n, p, k) / vmax * self.h_max
            trait = Line(P(x, self.y0), P(x, self.y0 + max(h, 0.001)), color=BATON, stroke_width=sw)
            pt = Dot(P(x, self.y0 + h), radius=0.035 + sw * 0.006, color=BATON)
            b = VGroup(trait, pt)
            self.par_k[k] = b
            self.batons.add(b)
        self.add(self.batons)

    def x_de(self, k, local=False):
        """L'abscisse de la valeur k (k peut être décimal : 74,58)."""
        slot = (self.x_d - self.x_g - 0.1) / (self.kmax - self.kmin + 1)
        x = self.x_g + 0.1 + slot * (k - self.kmin + 0.5)
        if local:
            return x
        return x + self.carte.get_center()[0]

    def y_axe(self):
        return self.axe_x.get_center()[1]

    def pied(self, k):
        return P(self.x_de(k), self.y_axe())

    def socle(self):
        return VGroup(self.carte, self.titre, self.axe_x, self.axe_y)

    def pousser(self, run_time=1.2):
        """Les bâtons poussent de l'axe, de gauche à droite."""
        return LaggedStart(*[GrowFromPoint(b, P(b[0].get_start()[0], b[0].get_start()[1])) for b in self.batons],
                           lag_ratio=0.04, run_time=run_time)

    def allumer(self, k, couleur=ACTIF):
        b = self.par_k[k]
        return AnimationGroup(b[0].animate.set_stroke(couleur, width=b[0].get_stroke_width() * 1.6),
                              b[1].animate.set_color(couleur).scale(1.3))

    def ligne_moyenne(self, k, couleur=MOYENNE):
        """La ligne verticale pointillée de l'espérance, du pied au-dessus du bâton."""
        haut = self.carte.get_top()[1] - (0.62 if len(self.titre) else 0.2)
        return DashedLine(self.pied(k), P(self.x_de(k), haut), color=couleur, stroke_width=4, dash_length=0.12)

    def etiquette(self, k, texte, couleur=ENCRE, fs=24):
        """Un nombre DIT, posé sous l'axe, à l'abscisse k."""
        return Text(texte, font_size=fs, color=couleur, weight=BOLD).move_to(P(self.x_de(k), self.y_axe() - 0.26))

    def fleche(self, k1, k2, y, texte, couleur, fs=22, dessus=True):
        """Une flèche horizontale de k1 à k2 à la hauteur y (au-dessus de l'axe),
        et son nombre au-dessus (ou au-dessous)."""
        a = DoubleArrow(P(self.x_de(k1), y), P(self.x_de(k2), y), buff=0, color=couleur, stroke_width=4,
                        tip_length=0.14, max_tip_length_to_length_ratio=0.3)
        t = Text(texte, font_size=fs, color=couleur, weight=BOLD)
        t.next_to(a, UP if dessus else DOWN, buff=0.06)
        return VGroup(a, t)


class ProbaBinEsperanceVarianceBase(MotsCales, Notion6e):
    """Toutes les scènes ; la sous-classe fixe l'identité et la ceinture."""

    nom_voix = "terminale-proba-bin-esperance-variance"
    fichier_marques = "proba_bin_esperance_variance_marques.json"
    identite = "Maths Tle spé — EleveAI"
    ceinture = "noire"
    X_F = -1.0          # le centre de la zone des formules (sous la carte)
    LARG_F = 9.6        # sa largeur utile (Ti-Margo à droite)
    Y1, Y2, Y3 = -1.35, -2.3, -3.2
    K70 = (52, 92)      # les bâtons de B(100 ; 0,7)

    def t(self, texte, font_size=40, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def titre_vite(self, texte):
        """Le titre d'écran (comme titre_ecran) SANS jouer : il s'écrit dans le
        même play que la première figure, pour ne pas retarder la voix."""
        return Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)

    def insister(self, mob, run_time=0.3):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def caser(self, mob, larg=None):
        larg = larg or self.LARG_F
        if mob.width > larg:
            mob.scale_to_fit_width(larg)
        return mob

    def ligne(self, *objs, y=None, x=None, buff=0.2):
        g = self.caser(suite(*objs, buff=buff))
        return g.move_to(P(self.X_F if x is None else x, self.Y1 if y is None else y))

    def carte70(self, titre=True):
        """La loi B(100 ; 0,7) du coach, en haut de l'écran."""
        c = CarteBatons(100, 0.7, *self.K70, larg=9.0, haut=3.6,
                        titre="Loi binomiale B(100 ; 0,7)" if titre else None)
        return c.move_to(P(-1.0, 1.15))

    def ex(self, lettre_="E", fs=44, color=WHITE):
        """« E(X) », « V(X) », « σ(X) »."""
        return self.t(f"{lettre_}(X)", fs, color)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Loi binomiale", 56, JAUNE_TITRE).to_edge(UP, buff=0.45)
        sous = self.t("espérance, variance, écart-type", 40, BLEU_CALCUL).next_to(titre, DOWN, buff=0.2)
        identite = self.t(self.identite, 28).next_to(sous, DOWN, buff=0.2)
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, -3.05))
        c = CarteBatons(100, 0.7, *self.K70, larg=7.6, haut=2.7, sw=3.5).move_to(P(-0.6, -0.6))
        # « Espérance » est le PREMIER mot : le sous-titre s'écrit dès le début
        self.play(Write(titre), FadeIn(sous, shift=UP * 0.15), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech),
                  FadeIn(c.socle()), run_time=0.8)
        self.au_mot("variance")
        self.play(c.pousser(1.1))
        lm = c.ligne_moyenne(70)
        self.play(c.allumer(70), Create(lm), run_time=0.5)
        self.attendre_voix(marge=1.0)

    # ── 01 : la basketteuse ─────────────────────────────────────────────────

    def tir(self, b, panier, reussi=True, run_time=1.0):
        """Le ballon part en cloche vers le cerceau (modèle proba_bern_epreuve)."""
        c = panier.cerceau
        if reussi:
            arc = ArcBetweenPoints(b.get_center(), c + UP * 0.25, angle=-PI / 2.2)
            self.play(vol(b, arc), run_time=run_time,
                      rate_func=rate_functions.linear)
            self.play(b.animate.move_to(c + DOWN * 0.55), run_time=0.25, rate_func=rate_functions.ease_in_quad)
            self.play(b.animate.move_to(c + DOWN * 1.6).set_opacity(0), run_time=0.25)
        else:
            cible = c + LEFT * 0.42 + UP * 0.2
            arc = ArcBetweenPoints(b.get_center(), cible, angle=-PI / 2.4)
            self.play(vol(b, arc), run_time=run_time,
                      rate_func=rate_functions.linear)
            rebond = ArcBetweenPoints(cible, cible + LEFT * 1.4 + DOWN * 1.4, angle=-PI / 1.6)
            self.play(MoveAlongPath(b, rebond), Wiggle(panier.anneau, scale_value=1.15),
                      run_time=0.5)
            self.remove(b)

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        pan = Panier(1.0).move_to(P(-3.6, 0.3))
        depart = P(-6.2, -1.6)
        self.play(Write(self.titre_vite("Les lancers francs")), FadeIn(pan, shift=UP * 0.2), run_time=0.8)
        self.au_mot("réussit chaque")
        b = ballon(0.24).move_to(depart)
        self.add(b)
        self.tir(b, pan, True, 0.6)
        # la branche double du coach : réussi S 0,7 / raté S barre
        bd = BrancheDouble(dx=1.9, dy=0.8, fs=30).move_to(P(1.4, 1.25))
        mots = VGroup(self.t("réussi", 28, SUCCES).next_to(bd.lab[0], RIGHT, buff=0.2),
                      self.t("raté", 28, ECHEC).next_to(bd.lab[1], RIGHT, buff=0.2))
        mots.shift(RIGHT * (bd.carte.get_right()[0] + 0.15 - mots.get_left()[0]))
        self.play(FadeIn(bd.socle()), Create(bd.branches[0]), Create(bd.branches[1]), FadeIn(bd.lab[0]),
                  FadeIn(bd.lab[1]), FadeIn(mots), run_time=0.5)
        self.au_mot("0,7")
        n7 = bd.nombre(0, "0,7", 30)
        self.play(FadeIn(n7, scale=1.8), bd.branches[0].animate.set_stroke(SUCCES, 7), run_time=0.5)
        self.insister(n7, 0.25)
        self.au_mot("À l'entraînement")
        for ok in (True, False):
            bb = ballon(0.24).move_to(depart)
            self.add(bb)
            self.tir(bb, pan, ok, 0.4)
        self.au_mot("100. X")
        cent = self.t("100 lancers", 44, COUL_N).move_to(P(-3.6, -2.75))
        self.play(FadeIn(cent, scale=1.6), run_time=0.4)
        self.au_mot("X compte")
        xc = suite(self.t("X :", 38), self.t("le nombre de réussites", 36, SUCCES), buff=0.2).move_to(P(1.5, -0.65))
        self.play(FadeIn(xc, shift=UP * 0.15), run_time=0.6)
        self.au_mot("X suit B")
        loi = suite(self.t("X suit", 44), self.t("B(100 ; 0,7)", 48, BLEU_CALCUL), buff=0.25).move_to(P(1.5, -1.85))
        self.play(FadeIn(loi[0]), Write(loi[1]), run_time=0.9)
        cadre = SurroundingRectangle(loi, color=BLEU_CALCUL, buff=0.18, stroke_width=3)
        self.play(Create(cadre), run_time=0.4)
        self.attendre_voix()

    # ── la carte B(100 ; 0,7) déjà lue : 70 allumé, la ligne, « 70 » ───────

    def carte70_lue(self, moyenne=True):
        c = self.carte70()
        extra = VGroup()
        if moyenne:
            b = c.par_k[70]
            b[0].set_stroke(ACTIF, width=b[0].get_stroke_width() * 1.6)
            b[1].set_color(ACTIF).scale(1.3)
            extra.add(c.ligne_moyenne(70), c.etiquette(70, "70", MOYENNE, 26))
        return c, extra

    def label_sur_blanc(self, mob):
        """Un nombre posé sur la carte : petit fond blanc pour qu'il reste lisible."""
        fond = BackgroundRectangle(mob, color=WHITE, fill_opacity=0.92, buff=0.04)
        return VGroup(fond, mob)

    def fleches_sigma(self, c, sigma, texte, couleur=VERT_OK, hauteur=0.42, fs=27, centre=70):
        """Deux flèches de part et d'autre de la moyenne : chacune mesure σ,
        son nombre au-dessus sur un petit fond blanc."""
        y = c.y_axe() + c.h_max * hauteur
        res = []
        for k1, k2, cote in ((centre - sigma, centre, LEFT), (centre, centre + sigma, RIGHT)):
            fl = DoubleArrow(P(c.x_de(k1), y), P(c.x_de(k2), y), buff=0, color=couleur, stroke_width=5,
                             tip_length=0.13, max_tip_length_to_length_ratio=0.35)
            # le nombre À L'EXTÉRIEUR de sa flèche : les deux ne se touchent pas
            t = Text(texte, font_size=fs, color=couleur, weight=BOLD).next_to(fl, cote, buff=0.08)
            res.append(VGroup(fl, self.label_sur_blanc(t)))
        return res

    # ── 02 : l'espérance ────────────────────────────────────────────────────

    def ecran_esperance(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-esperance")
        c, _ = self.carte70_lue(moyenne=False)
        self.add(c)
        self.titre_ecran("L'espérance")
        fs = 46
        l1 = self.ligne(self.ex("E", fs), self.t("=", fs), self.t("n", fs + 4, COUL_N), self.t("×", fs),
                        self.t("p", fs + 4, COUL_P), buff=0.25)
        self.au_mot("n fois p")
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.5)
        l2 = suite(self.ex("E", fs), self.t("=", fs), self.t("100", fs, COUL_N), self.t("×", fs),
                   self.t("0,7", fs, COUL_P), self.t("=", fs), self.t("70", fs + 8, MOYENNE), buff=0.25)
        l2.shift(P(l1[0].get_center()[0] - l2[0].get_center()[0], self.Y2 - l2.get_center()[1]))
        self.au_mot("100 fois 0,7")
        self.play(FadeIn(l2[:3], shift=UP * 0.15), run_time=0.45)
        self.play(FadeIn(l2[3:5], shift=UP * 0.15), run_time=0.35)
        self.au_mot("70 réussites")
        lm = c.ligne_moyenne(70)
        e70 = c.etiquette(70, "70", MOYENNE, 26)
        self.play(FadeIn(l2[5]), FadeIn(l2[6], scale=1.8), c.allumer(70), Create(lm), FadeIn(e70, scale=1.6),
                  run_time=0.6)
        self.au_mot("en moyenne")
        moy = self.t("en moyenne", 24, MOYENNE).next_to(lm.get_end(), RIGHT, buff=0.12).shift(DOWN * 0.12)
        self.play(FadeIn(moy, shift=LEFT * 0.15), run_time=0.4)
        self.insister(l2[6], 0.25)
        self.attendre_voix()

    # ── 03 : la variance ────────────────────────────────────────────────────

    def ecran_variance(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-variance")
        c, ext = self.carte70_lue()
        self.add(c, ext)
        fs = 46
        l1 = self.ligne(self.ex("V", fs), self.t("=", fs), self.t("n", fs + 4, COUL_N), self.t("×", fs),
                        self.t("p", fs + 4, COUL_P), self.t("×", fs), self.t("(1 − p)", fs, COUL_P), buff=0.25)
        # « La variance » est le PREMIER mot : titre et vague partent ensemble ;
        # la dispersion : une vague part de 70 vers les deux bords
        ordre = sorted(c.par_k, key=lambda k: abs(k - 70))
        vague = LaggedStart(*[Indicate(c.par_k[k], color=BLEU_CALCUL, scale_factor=1.15) for k in ordre],
                            lag_ratio=0.03)
        self.play(Write(self.titre_vite("La variance")), vague, run_time=1.0)
        self.au_mot("n fois p fois")
        self.play(FadeIn(l1[:5], shift=UP * 0.15), run_time=0.5)
        self.au_mot("1 moins p")
        self.play(FadeIn(l1[5:], shift=UP * 0.15), run_time=0.4)
        l2 = suite(self.ex("V", fs), self.t("=", fs), self.t("100", fs, COUL_N), self.t("×", fs),
                   self.t("0,7", fs, COUL_P), self.t("×", fs), self.t("0,3", fs, COUL_P), self.t("=", fs),
                   self.t("21", fs + 8, VERT_OK), buff=0.25)
        self.caser(l2)
        l2.shift(P(l1[0].get_center()[0] - l2[0].get_center()[0], self.Y2 - l2.get_center()[1]))
        self.au_mot("100 fois 0,7")
        self.play(FadeIn(l2[:5], shift=UP * 0.15), run_time=0.5)
        self.au_mot("fois 0,3")
        self.play(FadeIn(l2[5:7], shift=UP * 0.15), run_time=0.4)
        self.au_mot("21")
        self.play(FadeIn(l2[7]), FadeIn(l2[8], scale=1.8), run_time=0.5)
        cad = SurroundingRectangle(l2[8], color=VERT_OK, buff=0.1, stroke_width=4)
        self.play(Create(cad), run_time=0.3)
        self.attendre_voix()

    # ── 04 : l'écart-type ───────────────────────────────────────────────────

    def ecran_ecart_type(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-ecart-type")
        c, ext = self.carte70_lue()
        self.add(c, ext)
        self.titre_ecran("L'écart-type")
        fs = 46
        self.au_mot("la racine")
        l1 = self.ligne(self.t("écart-type :", 40, VERT_OK), self.ex("σ", fs), self.t("=", fs),
                        racine(self.ex("V", fs)), buff=0.25)
        self.play(FadeIn(l1[:3], shift=UP * 0.15), run_time=0.4)
        self.play(Create(l1[3][0]), FadeIn(l1[3][1]), run_time=0.5)
        self.au_mot("Racine de 21")
        r21 = rac_txt("21", fs, VERT_OK, WHITE)
        l2 = suite(self.ex("σ", fs), self.t("=", fs), r21, self.t("≈", fs), self.t("4,58", fs + 8, VERT_OK),
                   buff=0.25)
        l2.shift(P(l1[1].get_center()[0] - l2[0].get_center()[0], self.Y2 - l2.get_center()[1]))
        self.play(FadeIn(l2[:2]), Create(r21[0]), FadeIn(r21[1], scale=1.5), run_time=0.6)
        self.au_mot("4,58")
        g, d = self.fleches_sigma(c, 4.58, "4,58")
        self.play(FadeIn(l2[3]), FadeIn(l2[4], scale=1.8), GrowFromCenter(g), GrowFromCenter(d), run_time=0.6)
        self.insister(l2[4], 0.25)
        self.attendre_voix()

    # ── 05 : le sens : des entraînements qui s'empilent autour de 70 ────────

    def ecran_sens(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-sens")
        c, ext = self.carte70_lue()
        self.add(c, ext)
        titre = self.titre_vite("Ce que ça veut dire")
        mots = VGroup(Text("un ballon :", font_size=24, color=ENCRE), Text("un entraînement", font_size=24, color=ENCRE))
        mots.arrange(DOWN, aligned_edge=LEFT, buff=0.06)
        legende = VGroup(ballon(0.12), mots).arrange(RIGHT, buff=0.12)
        # en haut à DROITE de la carte, loin de la ligne de 70 et des bâtons hauts
        legende.move_to(P(c.carte.get_right()[0] - 0.2 - legende.width / 2, c.titre.get_center()[1] - 0.6))
        rng = np.random.default_rng(974)
        tirages = [int(v) for v in rng.binomial(100, 0.7, 40)]
        tirages = [min(max(v, self.K70[0]), self.K70[1]) for v in tirages]
        pile = {}
        balles = []
        for v in tirages:
            h = pile.get(v, 0)
            pile[v] = h + 1
            balles.append(ballon(0.085).move_to(P(c.x_de(v), c.y_axe() + 0.1 + 0.18 * h)))
        for b in balles:
            b.set_z_index(2)
        # « Le plus souvent » est le PREMIER mot : tout part ensemble
        self.play(Write(titre), c.batons.animate.set_opacity(0.25), FadeIn(legende), run_time=0.7)
        self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 1.2) for b in balles[:20]], lag_ratio=0.12), run_time=1.2)
        self.au_mot("à peu près 70")
        self.play(Indicate(ext[1], color=MOYENNE, scale_factor=1.6),
                  LaggedStart(*[FadeIn(b, shift=DOWN * 1.2) for b in balles[20:30]], lag_ratio=0.12), run_time=0.8)
        self.au_mot("à quelques lancers près")
        self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 1.2) for b in balles[30:]], lag_ratio=0.12), run_time=0.8)
        g, d = self.fleches_sigma(c, 4.58, "4,58", hauteur=0.62)
        bande = Rectangle(width=c.x_de(74.58) - c.x_de(65.42), height=c.h_max * 0.55, stroke_width=0,
                          fill_color=VERT_OK, fill_opacity=0.18)
        bande.move_to(P(c.x_de(70), c.y_axe() + c.h_max * 0.275)).set_z_index(1)
        g.set_z_index(3)
        d.set_z_index(3)
        self.play(FadeIn(bande), run_time=0.5)
        self.au_mot("l'écart-type mesure")
        mot = self.ligne(self.t("écart-type :", 40, VERT_OK), self.t("la dispersion", 40),
                         self.t("autour de 70", 40, MOYENNE), buff=0.25)
        self.play(GrowFromCenter(g), GrowFromCenter(d), FadeIn(mot[0], shift=UP * 0.15), run_time=0.6)
        self.au_mot("dispersion")
        self.play(FadeIn(mot[1], shift=UP * 0.15), run_time=0.4)
        self.au_mot("autour de 70")
        self.play(FadeIn(mot[2], shift=UP * 0.15), Indicate(ext[1], color=MOYENNE, scale_factor=1.6), run_time=0.5)
        self.attendre_voix()

    # ── 06 : le piège : oublier la racine ───────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        c, ext = self.carte70_lue()
        self.add(c, ext)
        self.titre_ecran("Le piège")
        fs = 46
        self.au_mot("oublier la racine")
        ou = self.ligne(self.t("Oublier la racine !", 44, ROUGE_ERREUR))
        self.play(FadeIn(ou, shift=UP * 0.15), run_time=0.4)
        self.play(Wiggle(ou), run_time=0.5)
        r21 = rac_txt("21", fs, VERT_OK, WHITE)
        ok = self.coche(taille=0.3)
        pas = self.t("pas", 40, ROUGE_ERREUR)
        faux = self.t("21", fs, ROUGE_ERREUR)
        l2 = self.ligne(self.t("écart-type =", 42), r21, ok, pas, faux, y=self.Y2 - 0.15, buff=0.3)
        barre = Line(faux.get_corner(DL) + P(-0.08, 0), faux.get_corner(UR) + P(0.08, 0), color=ROUGE_ERREUR,
                     stroke_width=6)
        self.au_mot("racine de 21")
        g, d = self.fleches_sigma(c, 4.58, "4,58", hauteur=0.42)
        self.play(FadeIn(l2[0]), Create(r21[0]), FadeIn(r21[1], scale=1.5), GrowFromCenter(g), GrowFromCenter(d),
                  run_time=0.6)
        self.play(Create(ok), run_time=0.3)
        self.au_mot("pas 21")
        y = c.y_axe() + c.h_max * 0.82
        fl = Arrow(P(c.x_de(70), y), P(c.x_de(91), y), buff=0, color=ROUGE_ERREUR, stroke_width=5,
                   tip_length=0.15, max_tip_length_to_length_ratio=0.2)
        t21 = self.label_sur_blanc(Text("21", font_size=27, color=ROUGE_ERREUR, weight=BOLD).next_to(fl, UP,
                                                                                                    buff=0.07))
        self.play(FadeIn(pas), FadeIn(faux, scale=1.5), GrowArrow(fl), FadeIn(t21), run_time=0.5)
        croix = Line(t21.get_corner(DL) + P(-0.04, 0), t21.get_corner(UR) + P(0.04, 0))
        croix.set_stroke(ROUGE_ERREUR, 4)
        self.play(Create(barre), Create(croix), fl.animate.set_opacity(0.45), run_time=0.4)
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 44, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("Une pièce")
        piece = piece_qui_tourne(P(-3.6, 1.2), r=0.95)
        eq = self.t("pièce équilibrée", 36).move_to(P(-3.6, -0.3))
        self.play(FadeIn(piece, scale=0.5), FadeIn(eq, shift=UP * 0.15), run_time=0.6)
        self.au_mot("400 fois")
        q = self.t("400 lancers", 50, COUL_N).move_to(P(2.0, 1.75))
        self.play(FadeIn(q, scale=1.6), run_time=0.5)
        self.au_mot("X compte")
        xc = suite(self.t("X :", 40), self.t("le nombre de piles", 40, JAUNE_TITRE), buff=0.2).move_to(P(2.0, 0.6))
        self.play(FadeIn(xc, shift=UP * 0.15), run_time=0.6)
        fs = 46
        self.au_mot("Calcule")
        cal = self.t("Calcule", fs)
        e, v = self.ex("E", fs, BLEU_CALCUL), self.ex("V", fs, BLEU_CALCUL)
        vir = self.t(",", fs)
        et = self.t("et l'écart-type", fs, VERT_OK)
        l = self.ligne(cal, e, vir, v, et, y=self.Y1 - 0.1, buff=0.25)
        vir.align_to(e, DOWN)
        self.play(FadeIn(cal), FadeIn(e, scale=1.5), run_time=0.4)
        self.au_mot("V de X")
        self.play(FadeIn(vir), FadeIn(v, scale=1.5), run_time=0.4)
        self.au_mot("l'écart-type")
        self.play(FadeIn(et, scale=1.3), run_time=0.4)
        self.au_mot("Mets pause")
        pause = self.t("Mets pause, et cherche !", 44, ORANGE_RETENUE).move_to(P(self.X_F, self.Y2 - 0.45))
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)
        piece.clear_updaters()

    # ── 07b : correction ────────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        c = CarteBatons(400, 0.5, 170, 230, larg=9.0, haut=2.9, titre="Loi binomiale B(400 ; 0,5)", sw=3)
        c.move_to(P(-1.0, 1.5))
        self.add(c.carte, c.axe_x, c.axe_y, c.batons)
        self.titre_ecran("Correction")
        fs = 42
        ys = (-0.72, -1.72, -2.72)
        x0 = -5.6

        def poser(l, y):
            l.shift(P(x0 - l.get_left()[0], y - l.get_center()[1]))
            return l

        l1 = poser(suite(self.ex("E", fs), self.t("=", fs), self.t("400", fs, COUL_N), self.t("×", fs),
                         self.t("0,5", fs, COUL_P), self.t("=", fs), self.t("200", fs + 6, MOYENNE), buff=0.22), ys[0])
        self.au_mot("E égale 400")
        self.play(FadeIn(l1[:3], shift=UP * 0.15), run_time=0.5)
        self.au_mot("fois 0,5 : 200")
        self.play(FadeIn(l1[3:5]), FadeIn(c.titre), run_time=0.4)
        self.au_mot("200")
        lm = c.ligne_moyenne(200)
        e200 = c.etiquette(200, "200", MOYENNE, 24)
        self.play(FadeIn(l1[5]), FadeIn(l1[6], scale=1.8), c.allumer(200), Create(lm), FadeIn(e200, scale=1.5),
                  run_time=0.6)
        l2 = poser(suite(self.ex("V", fs), self.t("=", fs), self.t("400", fs, COUL_N), self.t("×", fs),
                         self.t("0,5", fs, COUL_P), self.t("×", fs), self.t("0,5", fs, COUL_P), self.t("=", fs),
                         self.t("100", fs + 6, VERT_OK), buff=0.22), ys[1])
        self.au_mot("V égale 400")
        self.play(FadeIn(l2[:3], shift=UP * 0.15), run_time=0.5)
        self.au_mot("fois 0,5 fois 0,5")
        self.play(FadeIn(l2[3:5]), run_time=0.3)
        self.play(FadeIn(l2[5:7]), run_time=0.3)
        self.au_mot("100. L")
        self.play(FadeIn(l2[7]), FadeIn(l2[8], scale=1.8), run_time=0.5)
        r100 = rac_txt("100", fs, VERT_OK, WHITE)
        l3 = poser(suite(self.ex("σ", fs), self.t("=", fs), r100, self.t("=", fs), self.t("10", fs + 8, VERT_OK),
                         buff=0.22), ys[2])
        l3[4].shift(RIGHT * 0.15)     # place pour le cadre
        self.au_mot("L'écart-type")
        self.play(FadeIn(l3[:2], shift=UP * 0.15), run_time=0.4)
        self.au_mot("racine de 100")
        self.play(Create(r100[0]), TransformFromCopy(l2[8], r100[1]), run_time=0.6)
        self.au_mot("10.")
        g, d = self.fleches_sigma(c, 10, "10", centre=200, hauteur=0.45)
        self.play(FadeIn(l3[3]), FadeIn(l3[4], scale=1.8), GrowFromCenter(g), GrowFromCenter(d), run_time=0.6)
        cad = SurroundingRectangle(l3[4], color=VERT_OK, buff=0.1, stroke_width=4)
        self.play(Create(cad), run_time=0.3)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 46
        si = suite(self.t("Si X suit", fs), self.t("B(n ; p)", fs, BLEU_CALCUL), self.t(":", fs), buff=0.2)
        le = suite(self.ex("E", fs), self.t("=", fs), self.t("n", fs + 4, COUL_N), self.t("p", fs + 4, COUL_P),
                   buff=0.2)
        le[3].shift(LEFT * 0.08)
        lv = suite(self.ex("V", fs), self.t("=", fs), self.t("n", fs + 4, COUL_N), self.t("p", fs + 4, COUL_P),
                   self.t("(1 − p)", fs, COUL_P), buff=0.2)
        lv[3].shift(LEFT * 0.08)
        ls = suite(self.t("écart-type :", 42, VERT_OK), self.ex("σ", fs), self.t("=", fs), racine(self.ex("V", fs)),
                   buff=0.22)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (le, lv, ls)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.45)
        tout = VGroup(si, lignes).arrange(DOWN, aligned_edge=LEFT, buff=0.55)
        if tout.width > 11.0:
            tout.scale_to_fit_width(11.0)
        tout.move_to(P(-0.8, -0.35))
        self.au_mot("Si X suit")
        self.play(FadeIn(si, shift=UP * 0.15), run_time=0.6)
        for mot, (coche, l) in zip(["E de X", "V de X", "et l'écart-type"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l, shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(coche), run_time=0.3)
        self.attendre_voix(marge=1.0)

    # ── 09 : la fin (règle du 19/10, modèle stmg/proba_au_moins_un.py) ──────

    def page_abonnement(self, voix="09-abonne"):
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
        self.ecran_esperance()
        self.ecran_variance()
        self.ecran_ecart_type()
        self.ecran_sens()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")


class ProbaBinEsperanceVarianceTerminale(ProbaBinEsperanceVarianceBase):
    identite = "Maths Tle spé — EleveAI"
    ceinture = "noire"
