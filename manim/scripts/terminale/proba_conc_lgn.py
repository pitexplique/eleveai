# proba_conc_lgn.py
# EleveAI — Maths Tle spé (micro concentration_loi_grands_nombres, notion
# concentration_echantillonnage) — série « Probabilités » : LA LOI DES GRANDS
# NOMBRES, AVEC VOIX. Paysage 16:9, ceinture NOIRE. Short : proba_conc_lgn_short.py.
#
# Domaine : l'HISTOIRE DES SCIENCES. Le naturaliste Buffon lance une pièce
# 4 040 fois (2 048 piles) ; le mathématicien Jacques Bernoulli démontre la loi
# (livre publié en 1713). Les noms ne sont que DITS (aucun nom à l'écran).
#
# ⭐ Canvas du coach : la banque (terminale-spe/maths/concentration.bank.ts)
# n'a AUCUN canvas. On reprend les conventions des figures du coach déjà
# utilisées dans la série : le canvas « tableau » de ProbabilitesCanvas.tsx
# (en-têtes slate-100, cases blanches, case allumée en ambre), la carte
# blanche du `stat_graph` (titre en encre grasse, axe, tracé), et le dé du
# canvas « de ».
# ⭐ Le tirage est un VRAI tirage (numpy, graine 7833, 4 040 lancers) : sept
# faces, puis pile ; 2 piles sur 10 (0,2), 46 sur 100 (0,46), 1 997 sur 4 040
# (0,494). Il manque 4 piles à 100 lancers, 23 à 4 040.
# ⛔ PAS D'ÉCART : un nombre ne s'écrit qu'au moment où la voix le dit.
#
# Écrans : 00 garde · 01 le naturaliste · 02 sa fréquence · 03 la simulation
# · 04 le mathématicien · 05 la loi (Mₙ, μ, δ) · 06 le piège (compenser) ·
# 07 défi (le dé) · 07b correction · 08 ce que tu as appris · 09 fin.
#
# Voix : manim/voix/terminale-proba-conc-lgn.json (débit −6).
# python -m manim render -qh --disable_caching manim/scripts/terminale/proba_conc_lgn.py ProbaConcLgnTerminale -o eleveai-maths-terminale-proba-conc-lgn --media_dir manim/scripts/terminale/media-conc_lgn
# Sortie : manim/sorties/terminale/maths/probabilites/34-conc-lgn/

import math
import sys
from pathlib import Path

import numpy as np

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI.parents[1]))
sys.path.insert(0, str(ICI.parent / "seconde"))
sys.path.insert(0, str(ICI.parent / "premiere"))
sys.path.insert(0, str(ICI.parent / "annonce"))
sys.path.insert(0, str(ICI.parent / "3e"))
sys.path.insert(0, str(ICI))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import BORD, ENCRE, suite  # noqa: E402
from proba_bin_defi import MotsCales, puissance  # noqa: E402
from annonce_probabilites import de  # noqa: E402
from proba_deux_epreuves import FACE_C, PILE_C, piece_fixe, piece_tournante  # noqa: E402

# ── le vrai tirage ──────────────────────────────────────────────────────────
NB = 4040
_r = np.random.default_rng(7833)
LANCERS = (_r.random(NB) < 0.5).astype(int)          # 1 = pile
CUMUL = np.cumsum(LANCERS)
FREQ = CUMUL / np.arange(1, NB + 1)
assert list(LANCERS[:8]) == [0] * 7 + [1]
assert CUMUL[9] == 2 and CUMUL[99] == 46 and CUMUL[-1] == 1997
assert f"{FREQ[-1]:.3f}" == "0.494" and 50 - CUMUL[99] == 4 and 2020 - CUMUL[-1] == 23
assert f"{2048 / 4040:.3f}" == "0.507" and 21 / 6 == 3.5

T_BORD = "#e2e8f0"       # slate-200
T_ENTETE = "#f1f5f9"     # slate-100
T_ENCRE = "#1e293b"      # slate-800
T_AMBRE = "#fef3c7"      # amber-100
T_AMBRE_TXT = "#78350f"  # amber-900
COURBE = "#2563EB"       # la fréquence (bleu du coach)
LIGNE_P = "#16A34A"      # la probabilité (vert)
BANDE = "#F59E0B"        # la bande μ ± δ
BLEU_NB = "#60A5FA"


def P(x, y):
    return np.array([x, y, 0.0])


# ── l'écriture des symboles, sans LaTeX ────────────────────────────────────

def indice(base, ind, fs=44, color=WHITE, c_ind=None):
    """Mₙ, Xᵢ, Fₙ : l'indice plus petit, posé en bas à droite."""
    b = Text(base, font_size=fs, color=color)
    i = Text(ind, font_size=int(fs * 0.62), color=c_ind or color)
    i.next_to(b, RIGHT, buff=0.03).align_to(b, DOWN).shift(DOWN * 0.12 * fs / 44)
    return VGroup(b, i)


def fraction(num, den, color=WHITE, buff=0.08):
    """num / den empilés, barre à la largeur du plus large."""
    larg = max(num.width, den.width) + 0.16
    barre = Line(LEFT * larg / 2, RIGHT * larg / 2, color=color, stroke_width=3)
    return VGroup(num, barre, den).arrange(DOWN, buff=buff)


def ecart(fs=44, color=WHITE, m=None, mu="μ", op="≥", d="δ"):
    """P(|Mₙ − μ| ≥ δ) — m remplace Mₙ (ex. Fₙ)."""
    m = m or indice("M", "n", fs, color)
    g = suite(Text("P(|", font_size=fs, color=color), m,
              Text(f"− {mu}| {op} {d})", font_size=fs, color=color), buff=0.06)
    g[2].shift(RIGHT * 0.1)
    return g


# ── le canvas « tableau » du coach ─────────────────────────────────────────

class Tableau(VGroup):
    """En-têtes slate-100 (deux lignes possibles), cases blanches, case ambre."""

    def __init__(self, entetes, largeurs, lignes=3, h_ent=0.9, h=0.62, fs_ent=24, fs=32):
        super().__init__()
        self.fs = fs
        self.cases = []
        x = -sum(largeurs) / 2
        for txt, w in zip(entetes, largeurs):
            r = Rectangle(width=w, height=h_ent, fill_color=T_ENTETE, fill_opacity=1,
                          stroke_color=T_BORD, stroke_width=2).move_to(P(x + w / 2, -h_ent / 2))
            t = VGroup(*[Text(m, font_size=fs_ent, color=T_ENCRE, weight=BOLD) for m in txt.split("\n")])
            t.arrange(DOWN, buff=0.05)
            if t.width > w - 0.15:
                t.scale_to_fit_width(w - 0.15)
            self.add(r, t.move_to(r))
            x += w
        for i in range(lignes):
            ligne = []
            x = -sum(largeurs) / 2
            y = -h_ent - h * (i + 0.5)
            for w in largeurs:
                r = Rectangle(width=w, height=h, fill_color=WHITE, fill_opacity=1,
                              stroke_color=T_BORD, stroke_width=2).move_to(P(x + w / 2, y))
                self.add(r)
                ligne.append(r)
                x += w
            self.cases.append(ligne)

    def texte(self, i, j, texte, ambre=False, fs=None):
        t = Text(texte, font_size=fs or self.fs, color=T_AMBRE_TXT if ambre else T_ENCRE, weight=BOLD)
        if t.width > self.cases[i][j].width - 0.15:
            t.scale_to_fit_width(self.cases[i][j].width - 0.15)
        return t.move_to(self.cases[i][j])

    def allumer(self, i, j, on=True):
        return self.cases[i][j].animate.set_fill(T_AMBRE if on else WHITE, 1)


# ── la carte blanche du stat_graph : la courbe de la fréquence ─────────────

class CarteCourbe(VGroup):
    """Carte blanche, axes en encre, abscisse LOGARITHMIQUE (1 → 4 040) pour
    voir à la fois les premiers lancers et les derniers. Aucune graduation
    chiffrée : elles se posent quand la voix les dit."""

    def __init__(self, larg=7.4, haut=4.8, titre="Fréquence de piles", fmin=0.0, fmax=1.0, nmax=NB):
        super().__init__()
        self.fmin, self.fmax, self.nmax = fmin, fmax, nmax
        self.carte = RoundedRectangle(width=larg, height=haut, corner_radius=0.2, fill_color=WHITE,
                                      fill_opacity=1, stroke_color=BORD, stroke_width=2)
        self.add(self.carte)
        self.titre = Text(titre, font_size=26, color=ENCRE, weight=BOLD)
        self.titre.next_to(self.carte.get_top(), DOWN, buff=0.16)
        self.x0, self.x1 = -larg / 2 + 0.55, larg / 2 - 1.05
        self.y0, self.y1 = -haut / 2 + 0.75, haut / 2 - 0.75
        self.ax = Arrow(P(self.x0, self.y0), P(self.x1 + 0.45, self.y0), buff=0, color=ENCRE, stroke_width=3,
                        max_tip_length_to_length_ratio=0.04)
        self.ay = Line(P(self.x0, self.y0), P(self.x0, self.y1 + 0.1), color=ENCRE, stroke_width=3)
        self.lx = Text("lancers", font_size=22, color=ENCRE).next_to(self.ax.get_end(), UP, buff=0.1)
        self.lx.align_to(self.ax.get_end(), RIGHT)
        self.add(self.titre, self.ax, self.ay, self.lx)

    def o(self):
        return self.carte.get_center()

    def gx(self, n):
        return self.o()[0] + self.x0 + (self.x1 - self.x0) * math.log10(n) / math.log10(self.nmax)

    def gy(self, f):
        return self.o()[1] + self.y0 + (self.y1 - self.y0) * (f - self.fmin) / (self.fmax - self.fmin)

    def gp(self, n, f):
        return P(self.gx(n), self.gy(f))

    def pts_courbe(self, n0, n1, f=FREQ):
        ns = [n for n in range(n0, n1 + 1) if n <= 300 or n % 4 == 0 or n == n1]
        return [self.gp(n, f[n - 1]) for n in ns]

    def courbe(self, n0, n1, color=COURBE, sw=4, f=FREQ):
        c = VMobject(stroke_color=color, stroke_width=sw)
        c.set_points_as_corners(self.pts_courbe(n0, n1, f))
        return c

    def ligne(self, v, color=LIGNE_P, sw=4):
        return DashedLine(P(self.gx(1), self.gy(v)), P(self.gx(self.nmax), self.gy(v)), dash_length=0.14,
                          color=color, stroke_width=sw)

    def etiquette_ligne(self, ligne, texte, color=LIGNE_P, fs=28):
        return Text(texte, font_size=fs, color=color, weight=BOLD).next_to(ligne, RIGHT, buff=0.12)

    def graduation(self, n, texte, fs=24):
        x = self.gx(n)
        tr = Line(P(x, self.gy(self.fmin) - 0.1), P(x, self.gy(self.fmin) + 0.1), color=ENCRE, stroke_width=3)
        lb = Text(texte, font_size=fs, color=ENCRE, weight=BOLD).next_to(tr, DOWN, buff=0.08)
        return VGroup(tr, lb)

    def point(self, n, texte, d=UP, fs=28, color=COURBE, f=FREQ):
        pt = Dot(self.gp(n, f[n - 1]), radius=0.09, color=color)
        lb = Text(texte, font_size=fs, color=color, weight=BOLD).next_to(pt, d, buff=0.12)
        return pt, lb

    def bande(self, v, d, color=BANDE, opacite=0.28):
        r = Rectangle(width=self.gx(self.nmax) - self.gx(1), height=self.gy(v + d) - self.gy(v - d),
                      fill_color=color, fill_opacity=opacite, stroke_width=0)
        return r.move_to(P((self.gx(1) + self.gx(self.nmax)) / 2, self.gy(v)))


class ConcBase(MotsCales, Notion6e):
    """Les outils communs aux trois épisodes de la concentration."""

    identite = "Maths Tle spé — EleveAI"
    ceinture = "noire"

    def t(self, texte, font_size=40, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def titre_ecran(self, texte, *avec, font_size=40):
        t = Text(texte, font_size=font_size, color=JAUNE_TITRE).to_edge(UP)
        if t.width > 12.6:
            t.scale_to_fit_width(12.6)
        self.play(Write(t), *avec, run_time=0.8)
        return t

    def insister(self, mob, run_time=0.3, k=1.5):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def caser(self, mob, larg):
        if mob.width > larg:
            mob.scale_to_fit_width(larg)
        return mob

    def barrer(self, mob, color=ROUGE_ERREUR, sw=7):
        return VGroup(Line(mob.get_corner(UL), mob.get_corner(DR)),
                      Line(mob.get_corner(DL), mob.get_corner(UR))).set_stroke(color, sw)

    def page_abonnement(self, voix="09-abonne"):
        """« Entraîne-toi sur » + eleveai.fr encadré, puis « Abonne-toi ! » +
        @eleveai974 (modèle proba_bin_defi.py)."""
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

    def finale(self, lignes_mobs, mots, cle="08-finale", larg=11.4):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire(cle)
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in lignes_mobs])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.55)
        self.caser(lignes, larg).move_to(P(-0.6, -0.2))
        for mot, l in zip(mots, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.3)
        self.attendre_voix(marge=1.0)


# ── dessins : la feuille du naturaliste, le livre, l'ordinateur ────────────

def feuille(s=1.0, color="#22C55E"):
    limbe = Ellipse(width=0.7, height=1.5, fill_color=color, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    nerv = Line(P(0, -0.75), P(0, 0.7), color="#14532D", stroke_width=3)
    cotes = VGroup(*[Line(P(0, y), P(0.25 * sg, y + 0.22), color="#14532D", stroke_width=2)
                     for y in (-0.35, 0.0, 0.3) for sg in (-1, 1)])
    tige = Line(P(0, -0.75), P(0, -1.1), color="#14532D", stroke_width=4)
    return VGroup(limbe, nerv, cotes, tige).scale(s)


def papillon(s=1.0):
    ailes = VGroup(*[Ellipse(width=0.8, height=1.0, fill_color=c, fill_opacity=1, stroke_color=WHITE,
                             stroke_width=2).move_to(P(dx, dy))
                     for dx, dy, c in ((-0.38, 0.25, "#F97316"), (0.38, 0.25, "#F97316"),
                                       (-0.3, -0.38, "#FACC15"), (0.3, -0.38, "#FACC15"))])
    corps = Ellipse(width=0.16, height=1.1, fill_color="#1E293B", fill_opacity=1, stroke_color=WHITE, stroke_width=1)
    return VGroup(ailes, corps).scale(s)


def livre(s=1.0):
    couv = RoundedRectangle(width=2.2, height=2.9, corner_radius=0.08, fill_color="#7C2D12", fill_opacity=1,
                            stroke_color="#FDE68A", stroke_width=3)
    dos = Rectangle(width=0.28, height=2.9, fill_color="#451A03", fill_opacity=1, stroke_width=0)
    dos.align_to(couv, LEFT)
    cadre = RoundedRectangle(width=1.6, height=2.3, corner_radius=0.05, stroke_color="#FDE68A",
                             stroke_width=2).move_to(couv).shift(RIGHT * 0.12)
    return VGroup(couv, dos, cadre).scale(s)


def ordinateur(s=1.0):
    ecran = RoundedRectangle(width=2.6, height=1.7, corner_radius=0.08, fill_color="#0F172A", fill_opacity=1,
                             stroke_color="#94A3B8", stroke_width=3)
    pied = Polygon(P(-1.6, -0.95), P(1.6, -0.95), P(1.85, -1.15), P(-1.85, -1.15), fill_color="#94A3B8",
                   fill_opacity=1, stroke_width=0)
    trace = VMobject(stroke_color="#38BDF8", stroke_width=3)
    xs = np.linspace(-1.05, 1.05, 40)
    trace.set_points_as_corners([P(x, 0.45 * math.exp(-1.6 * (x + 1.05)) * math.cos(9 * x)) for x in xs])
    axe = DashedLine(P(-1.1, 0), P(1.1, 0), color="#22C55E", stroke_width=2, dash_length=0.08)
    return VGroup(ecran, pied, axe, trace).scale(s)


def rangee_pieces(faces, r=0.3, buff=0.12, mot=False):
    return VGroup(*[piece_fixe("P" if f else "F", r, mot=mot) for f in faces]).arrange(RIGHT, buff=buff)


class ProbaConcLgnBase(ConcBase):
    fichier_marques = "proba_conc_lgn_marques.json"
    nom_voix = "terminale-proba-conc-lgn"

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("La loi des grands nombres", 56, JAUNE_TITRE).to_edge(UP, buff=0.5)
        sous = self.t("racontée par deux savants", 40, BLEU_CALCUL).next_to(titre, DOWN, buff=0.2)
        identite = self.t(self.identite, 28).next_to(sous, DOWN, buff=0.2)
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, -3.05))
        c = CarteCourbe(larg=6.0, haut=3.0, titre="").move_to(P(-0.6, -0.55))
        self.add(ech, titre, VGroup(c.carte, c.ax, c.ay, c.lx))
        self.au_mot("racontée")
        self.play(FadeIn(sous, shift=UP * 0.15), FadeIn(identite, shift=DOWN * 0.2), run_time=0.5)
        self.play(Create(c.courbe(1, NB)), run_time=1.6, rate_func=linear)
        self.attendre_voix(marge=1.0)

    # ── 01 : le naturaliste ─────────────────────────────────────────────────

    def tab_buffon(self):
        tb = Tableau(["lancers", "piles", "fréquence"], [2.6, 2.6, 2.8], lignes=1, h_ent=0.8, h=1.0, fs_ent=32,
                     fs=42)
        return tb.move_to(P(2.4, -0.7))

    def ecran_buffon(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-buffon")
        f1, f2, pap = feuille(1.1).move_to(P(-5.6, 0.9)), feuille(0.8, "#4ADE80").rotate(0.5).move_to(P(-4.6, 0.6)), \
            papillon(0.9).move_to(P(-4.6, 2.0))
        self.titre_ecran("Un naturaliste et le hasard", FadeIn(f1, shift=UP * 0.2))
        self.au_mot("Jardin du roi")
        jardin = self.t("le Jardin du roi, à Paris", 30, VERT_OK).move_to(P(-4.4, -0.9))
        self.play(FadeIn(f2, scale=0.6), FadeIn(jardin, shift=UP * 0.1), run_time=0.6)
        self.au_mot("plantes et animaux")
        self.play(FadeIn(pap, scale=0.4), run_time=0.6)
        self.play(pap.animate.shift(UP * 0.15 + RIGHT * 0.1), rate_func=there_and_back, run_time=0.5)
        self.au_mot("hasard")
        ancre = Dot(P(2.6, 2.0), radius=0.01).set_opacity(0)
        tourne = piece_tournante(ancre, r=0.7)
        self.add(ancre)
        self.play(FadeIn(tourne, scale=0.5), run_time=0.4)
        tb = self.tab_buffon()
        self.au_mot("Il lance")
        self.play(FadeIn(tb, shift=UP * 0.15), run_time=0.5)
        self.au_mot("4 040")
        n = tb.texte(0, 0, "4 040")
        self.play(FadeIn(n, scale=1.6), tb.allumer(0, 0), run_time=0.5)
        self.au_mot("2 048")
        k = tb.texte(0, 1, "2 048")
        self.play(FadeIn(k, scale=1.6), tb.allumer(0, 0, False), tb.allumer(0, 1), run_time=0.5)
        tourne.clear_updaters()
        pile = piece_fixe("P", 0.7).move_to(ancre)
        self.play(FadeOut(tourne), FadeIn(pile, scale=1.3), run_time=0.3)
        self.insister(k, 0.25)
        self.attendre_voix()

    # ── 02 : sa fréquence ───────────────────────────────────────────────────

    def ecran_frequence(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-frequence")
        tb = self.tab_buffon()
        fixes = VGroup(tb, tb.texte(0, 0, "4 040"), tb.texte(0, 1, "2 048"))
        self.titre_ecran("Sa fréquence de piles", FadeIn(fixes))
        self.au_mot("2 048 sur")
        fr = fraction(self.t("2 048", 50, BLEU_NB), self.t("4 040", 50, BLEU_NB))
        env = self.t("≈", 54)
        res = self.t("0,507", 60, ORANGE_RETENUE)
        calc = suite(fr, env, res, buff=0.3).move_to(P(-3.6, 1.0))
        self.play(TransformFromCopy(fixes[2], fr[0]), Create(fr[1]), run_time=0.6)
        self.play(TransformFromCopy(fixes[1], fr[2]), run_time=0.5)
        self.au_mot("environ 0,507")
        v = tb.texte(0, 2, "0,507", ambre=True)
        self.play(FadeIn(env), FadeIn(res, scale=1.6), tb.allumer(0, 2), run_time=0.5)
        self.play(TransformFromCopy(res, v), run_time=0.5)
        # la loupe : 0,5 et 0,507, tout près
        self.au_mot("Tout près")
        y = -2.55
        axe = Line(P(-5.6, y), P(3.6, y), color=WHITE, stroke_width=4)
        x5, x507 = -1.0, -1.0 + 0.007 * 160
        cinq = Line(P(x5, y - 0.3), P(x5, y + 0.3), color=VERT_OK, stroke_width=6)
        pt = Dot(P(x507, y), radius=0.13, color=ORANGE_RETENUE)
        l507 = self.t("0,507", 32, ORANGE_RETENUE).next_to(pt, UP, buff=0.18)
        self.play(Create(axe), FadeIn(pt, scale=2), TransformFromCopy(res, l507), run_time=0.7)
        self.au_mot("0,5, la")
        l5 = suite(self.t("P(pile) =", 32, VERT_OK), self.t("0,5", 34, VERT_OK), buff=0.15)
        l5.next_to(cinq, DOWN, buff=0.15).shift(LEFT * 0.4)
        self.play(Create(cinq), FadeIn(l5, shift=UP * 0.1), run_time=0.6)
        self.play(Indicate(VGroup(cinq, pt), color=JAUNE_TITRE, scale_factor=1.3), run_time=0.6)
        self.attendre_voix()

    # ── 03 : un vrai tirage en Python ───────────────────────────────────────

    def carte_sim(self, larg=7.6, haut=5.0, y=-0.15):
        return CarteCourbe(larg=larg, haut=haut).move_to(P(2.85, y))

    def ecran_simulation(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-simulation")
        c = self.carte_sim()
        tb = Tableau(["lancers", "fréquence"], [2.3, 2.6], lignes=3, h_ent=0.7, h=0.75, fs_ent=28, fs=36)
        tb.move_to(P(-4.0, -1.0))
        badge = self.t("tirage Python", 30, BLEU_NB)
        cadre_b = SurroundingRectangle(badge, color=BLEU_NB, buff=0.12, corner_radius=0.1)
        bd = VGroup(badge, cadre_b).move_to(P(-4.0, 2.55))
        self.titre_ecran("Refaisons l'expérience", FadeIn(c))
        self.au_mot("vrai tirage")
        self.play(FadeIn(bd, scale=1.3), FadeIn(tb, shift=UP * 0.15), run_time=0.6)
        # 10 lancers : les vraies pièces, 2 piles
        self.au_mot("Après 10")
        pieces = rangee_pieces(LANCERS[:10], r=0.21, buff=0.08).move_to(P(-4.0, 1.55))
        g10 = c.graduation(10, "10")
        self.play(LaggedStart(*[FadeIn(p, scale=1.6) for p in pieces], lag_ratio=0.08),
                  FadeIn(tb.texte(0, 0, "10")), Create(c.courbe(1, 10)), FadeIn(g10), run_time=1.0)
        self.au_mot("2 piles")
        piles = VGroup(*[pieces[i] for i in range(10) if LANCERS[i]])
        deux = self.t("2 piles", 30, JAUNE_TITRE).next_to(pieces, DOWN, buff=0.12)
        self.play(*[p.animate.scale(1.4) for p in piles], FadeIn(deux), run_time=0.35)
        self.play(*[p.animate.scale(1 / 1.4) for p in piles], run_time=0.3)
        self.au_mot("fréquence 0,2")
        p10, l10 = c.point(10, "0,2", d=LEFT)
        self.play(FadeIn(tb.texte(0, 1, "0,2")), FadeIn(p10, scale=2), FadeIn(l10), run_time=0.5)
        self.au_mot("Après 100")
        g100 = c.graduation(100, "100")
        self.play(Create(c.courbe(10, 100)), FadeIn(tb.texte(1, 0, "100")), FadeIn(g100), run_time=1.0)
        self.au_mot("0,46")
        p100, l100 = c.point(100, "0,46", d=DOWN)
        self.play(FadeIn(tb.texte(1, 1, "0,46")), FadeIn(p100, scale=2), FadeIn(l100), run_time=0.5)
        self.au_mot("Après 4 040")
        g4 = c.graduation(NB, "4 040")
        self.play(Create(c.courbe(100, NB)), FadeIn(tb.texte(2, 0, "4 040")), FadeIn(g4),
                  run_time=1.4, rate_func=linear)
        self.au_mot("0,494")
        p4, l4 = c.point(NB, "0,494", d=DOWN)
        self.play(FadeIn(tb.texte(2, 1, "0,494", ambre=True)), tb.allumer(2, 1), FadeIn(p4, scale=2),
                  FadeIn(l4), run_time=0.5)
        self.au_mot("oscille")
        zone = c.courbe(1, 100, color=ORANGE_RETENUE, sw=7)
        self.play(ShowPassingFlash(zone, time_width=0.6), run_time=1.0)
        self.au_mot("autour de 0,5")
        lp = c.ligne(0.5)
        e5 = c.etiquette_ligne(lp, "0,5")
        self.play(Create(lp), FadeIn(e5, shift=LEFT * 0.1), run_time=0.6)
        self.insister(e5, 0.25)
        self.attendre_voix()

    # ── 04 : le mathématicien ───────────────────────────────────────────────

    def ecran_bernoulli(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-bernoulli")
        lv = livre(1.0).move_to(P(-4.3, 0.3))
        self.titre_ecran("Un mathématicien le démontre", FadeIn(lv, shift=UP * 0.2))
        self.au_mot("démontré")
        plume = VGroup(Line(P(0, 0), P(0.9, 1.3), color=WHITE, stroke_width=3),
                       Polygon(P(0.3, 0.45), P(1.1, 1.6), P(0.6, 0.4), fill_color=WHITE, fill_opacity=0.9,
                               stroke_width=0)).move_to(P(-2.7, 1.3))
        self.play(FadeIn(plume, shift=DOWN * 0.2), run_time=0.5)
        self.au_mot("1713")
        an = self.t("1713", 44, "#FDE68A").move_to(lv[2]).shift(UP * 0.55)
        self.play(FadeIn(an, scale=1.8), run_time=0.5)
        self.insister(an, 0.25)
        self.au_mot("loi des grands nombres")
        loi = VGroup(self.t("la loi des", 50, JAUNE_TITRE), self.t("grands nombres", 50, JAUNE_TITRE))
        loi.arrange(DOWN, buff=0.12).move_to(P(1.4, 0.6))
        cad = SurroundingRectangle(loi, color=JAUNE_TITRE, buff=0.25, corner_radius=0.15)
        self.play(FadeIn(loi, shift=UP * 0.2), Create(cad), run_time=0.8)
        self.au_mot("data scientists")
        ordi = ordinateur(1.0).move_to(P(1.2, -2.2))
        ds = self.t("data scientists", 34, BLEU_NB).next_to(ordi, LEFT, buff=0.4)
        self.play(FadeIn(ordi, shift=UP * 0.2), FadeIn(ds, shift=RIGHT * 0.15), run_time=0.7)
        self.play(Create(ordi[3]), run_time=0.8)
        self.attendre_voix()

    # ── 05 : la loi, en terminale ───────────────────────────────────────────

    def ecran_loi(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-loi")
        c = CarteCourbe(larg=5.9, haut=4.4, titre="Mₙ").move_to(P(3.95, 0.35))
        c.remove(c.titre)
        tit = indice("M", "n", 30, ENCRE).next_to(c.carte.get_top(), DOWN, buff=0.18)
        cb = c.courbe(1, NB)
        self.titre_ecran("La loi des grands nombres", FadeIn(VGroup(c, tit, cb)))
        fs = 36
        X = -3.25
        mn = indice("M", "n", fs + 4, JAUNE_TITRE)
        l1 = suite(mn, self.t(": moyenne de n variables", fs), buff=0.15)
        l2 = self.t("indépendantes, de même loi,", fs)
        l3 = suite(self.t("d'espérance", fs), self.t("μ", fs + 6, LIGNE_P), buff=0.18)
        bloc = VGroup(l1, l2, l3).arrange(DOWN, aligned_edge=LEFT, buff=0.22)
        self.caser(bloc, 6.0).move_to(P(X, 1.75))
        self.au_mot("M n est")
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("indépendantes")
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("d'espérance mu")
        lm = c.ligne(0.5)
        em = self.t("μ", 34, LIGNE_P).next_to(lm, RIGHT, buff=0.12)
        self.play(FadeIn(l3, shift=RIGHT * 0.2), Create(lm), FadeIn(em), run_time=0.6)
        self.au_mot("Pour tout écart")
        l4 = self.t("Pour tout δ > 0 :", fs + 2).move_to(P(X, 0.1))
        bd = c.bande(0.5, 0.1)
        acc = Brace(Line(P(0, c.gy(0.5)), P(0, c.gy(0.6))), RIGHT, buff=0.05, color=BANDE).move_to(
            P(c.gx(NB) + 0.22, c.gy(0.55)))
        dl = self.t("δ", 30, BANDE).next_to(acc, RIGHT, buff=0.05)
        em.next_to(lm, RIGHT, buff=0.12).shift(DOWN * 0.0)
        self.play(FadeIn(l4, shift=RIGHT * 0.2), FadeIn(bd), run_time=0.6)
        self.play(FadeOut(em), GrowFromCenter(acc), FadeIn(dl), run_time=0.4)
        self.au_mot("la probabilité que")
        pr = ecart(fs + 6, WHITE)
        fl = self.t("→ 0", fs + 8, VERT_OK)
        l5 = suite(pr, fl, buff=0.25)
        self.caser(l5, 6.0).move_to(P(X, -0.95))
        self.play(FadeIn(pr, shift=UP * 0.15), run_time=0.6)
        hors = VGroup(*[c.courbe(a, b, color=ROUGE_ERREUR, sw=6) for a, b in self.hors_bande(0.1)])
        self.play(Create(hors), run_time=0.6)
        self.au_mot("tend vers 0")
        self.play(FadeIn(fl, scale=1.6), run_time=0.4)
        self.insister(fl, 0.25)
        self.au_mot("plus l'infini")
        l6 = suite(self.t("quand", fs), self.t("n → +∞", fs + 4, VERT_OK), buff=0.2).move_to(P(X, -1.8))
        self.play(FadeIn(l6, shift=UP * 0.15), run_time=0.5)
        self.au_mot("Pour la pièce")
        l7 = suite(self.t("Pièce :", fs - 2, BLEU_NB), indice("M", "n", fs, WHITE),
                   self.t("= fréquence de piles", fs - 2), buff=0.15)
        self.caser(l7, 6.0).move_to(P(X, -2.75))
        self.play(FadeIn(l7, shift=UP * 0.15), run_time=0.5)
        self.au_mot("mu vaut 0,5")
        mu5 = self.t("μ = 0,5", 30, LIGNE_P).next_to(c.carte, DOWN, buff=0.18)
        self.play(FadeIn(mu5, scale=1.4), Indicate(lm, color=LIGNE_P), run_time=0.6)
        self.attendre_voix()

    @staticmethod
    def hors_bande(d):
        """Les morceaux du tirage où la fréquence sort de la bande 0,5 ± d."""
        dehors = np.abs(FREQ - 0.5) >= d
        morceaux, debut = [], None
        for i, h in enumerate(dehors):
            n = i + 1
            if h and debut is None:
                debut = n
            if not h and debut is not None:
                morceaux.append((max(debut - 1, 1), n))
                debut = None
        if debut is not None:
            morceaux.append((max(debut - 1, 1), NB))
        return [m for m in morceaux if m[1] > m[0]]

    # ── 06 : le piège, « le hasard compense » ───────────────────────────────

    def barre_retard(self, manque, n, y, larg=7.4):
        """Une barre = n lancers ; la part rouge = les piles qui manquent."""
        x0 = -3.3
        fond = Rectangle(width=larg, height=0.5, fill_color="#334155", fill_opacity=1, stroke_color=WHITE,
                         stroke_width=2).move_to(P(x0 + larg / 2, y))
        w = max(larg * manque / n, 0.035)
        rouge = Rectangle(width=w, height=0.5, fill_color=ROUGE_ERREUR, fill_opacity=1, stroke_width=0)
        rouge.align_to(fond, RIGHT).align_to(fond, DOWN)
        return fond, rouge

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège : « le hasard compense »")
        self.au_mot("sept faces")
        r = 0.42
        rang = rangee_pieces(LANCERS[:8], r=r, buff=0.16).move_to(P(-1.4, 1.75))
        sept = VGroup(*rang[:7])
        self.play(LaggedStart(*[FadeIn(p, shift=DOWN * 0.4) for p in sept], lag_ratio=0.12), run_time=1.0)
        acc = Brace(sept, DOWN, buff=0.08, color=FACE_C)
        l7 = self.t("7 faces", 30, FACE_C).next_to(acc, DOWN, buff=0.05)
        self.play(GrowFromCenter(acc), FadeIn(l7), run_time=0.4)
        self.au_mot("Au huitième")
        ancre = Dot(rang[7].get_center(), radius=0.01).set_opacity(0)
        tourne = piece_tournante(ancre, r=r)
        self.add(ancre)
        self.play(FadeIn(tourne, scale=0.5), run_time=0.3)
        self.au_mot("n'est pas")
        du = self.t("« dû » ?", 38, ROUGE_ERREUR).next_to(rang[7], RIGHT, buff=0.3)
        self.play(FadeIn(du, scale=1.4), run_time=0.4)
        self.au_mot("reste 0,5")
        tourne.clear_updaters()
        pr = suite(self.t("P(pile) =", 34, VERT_OK), self.t("0,5", 38, VERT_OK), buff=0.15)
        pr.next_to(rang[7], DOWN, buff=0.3).align_to(rang[7], RIGHT).shift(RIGHT * 0.4)
        self.play(FadeOut(tourne), FadeIn(rang[7], scale=1.3), FadeOut(du), FadeIn(pr, shift=UP * 0.1),
                  run_time=0.5)
        self.play(Indicate(pr, color=VERT_OK), run_time=0.5)
        # le retard : 4 piles sur 100, 23 sur 4 040
        self.au_mot("Après 100")
        f1, r1 = self.barre_retard(4, 100, -0.75)
        t1 = self.t("100 lancers", 30).next_to(f1, LEFT, buff=0.25)
        self.play(FadeIn(f1), FadeIn(t1), run_time=0.5)
        self.au_mot("il manque 4")
        m1 = self.t("il manque 4 piles", 30, ROUGE_ERREUR).next_to(f1, UP, buff=0.12).align_to(f1, RIGHT)
        self.play(GrowFromEdge(r1, RIGHT), FadeIn(m1, shift=DOWN * 0.1), run_time=0.5)
        self.au_mot("Après 4 040")
        f2, r2 = self.barre_retard(23, NB, -2.1)
        t2 = self.t("4 040 lancers", 30).next_to(f2, LEFT, buff=0.25)
        self.play(FadeIn(f2), FadeIn(t2), run_time=0.5)
        self.au_mot("il en manque 23")
        m2 = self.t("il en manque 23 !", 30, ROUGE_ERREUR).next_to(f2, UP, buff=0.12).align_to(f2, RIGHT)
        self.play(GrowFromEdge(r2, RIGHT), FadeIn(m2, shift=DOWN * 0.1), run_time=0.5)
        self.insister(m2, 0.25, 1.3)
        self.au_mot("noyé")
        noye = self.t("noyé dans le nombre de lancers", 34, JAUNE_TITRE).move_to(P(0.4, -3.05))
        loupe = Circle(radius=0.32, color=JAUNE_TITRE, stroke_width=4).move_to(r2)
        self.play(FadeIn(noye, shift=UP * 0.1), Create(loupe), run_time=0.6)
        self.play(loupe.animate.scale(1.4), rate_func=there_and_back, run_time=0.5)
        self.attendre_voix(marge=1.2)

    # ── 07 : défi, le dé ────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 40, JAUNE_TITRE).to_edge(UP)), run_time=0.8)
        self.au_mot("dé équilibré")
        from annonce_probabilites import de_qui_roule
        d = de_qui_roule(P(-4.3, 0.7), cote=1.6)
        self.play(FadeIn(d, scale=0.5), run_time=0.4)
        self.au_mot("très grand nombre")
        q1 = self.t("un très grand nombre de lancers", 40).move_to(P(1.6, 1.5))
        self.play(FadeIn(q1, shift=UP * 0.15), run_time=0.5)
        self.au_mot("De quel nombre")
        q2 = suite(self.t("la moyenne des résultats →", 44), self.t("?", 60, ORANGE_RETENUE), buff=0.25)
        self.caser(q2, 8.6).move_to(P(1.2, 0.2))
        self.play(FadeIn(q2, shift=UP * 0.15), run_time=0.5)
        self.insister(q2[1], 0.25)
        self.au_mot("Mets pause")
        pause = self.t("Mets pause, et cherche !", 46, ORANGE_RETENUE).move_to(P(-1.2, -2.3))
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)
        d.clear_updaters()

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        des = VGroup(*[de(k, 0.95) for k in range(1, 7)]).arrange(RIGHT, buff=0.35).move_to(P(-0.6, 1.9))
        self.au_mot("L'espérance")
        self.play(FadeIn(des, shift=DOWN * 0.2), run_time=0.5)
        fs = 48
        num = self.t("1 + 2 + 3 + 4 + 5 + 6", fs, BLEU_NB)
        den = self.t("6", fs, BLEU_NB)
        fr = fraction(num, den)
        e = suite(self.t("E =", fs + 4), fr, buff=0.25)
        r1 = suite(self.t("=", fs), fraction(self.t("21", fs, BLEU_NB), self.t("6", fs, BLEU_NB)), buff=0.25)
        r2 = suite(self.t("=", fs), self.t("3,5", fs + 8, VERT_OK), buff=0.25)
        tout = self.caser(suite(e, r1, r2, buff=0.3), 12.4).move_to(P(-0.4, -0.3))
        self.au_mot("1 plus 2")
        self.play(FadeIn(e[0]), LaggedStart(*[Indicate(x, scale_factor=1.25) for x in des], lag_ratio=0.18),
                  Write(num), run_time=1.6)
        self.au_mot("sur 6")
        self.play(Create(fr[1]), FadeIn(den, shift=UP * 0.1), run_time=0.4)
        self.au_mot("21 sur 6")
        self.play(FadeIn(r1, shift=LEFT * 0.1), run_time=0.5)
        self.au_mot("3,5. La")
        self.play(FadeIn(r2, scale=1.5), run_time=0.5)
        self.au_mot("se rapproche")
        conc = suite(self.t("la moyenne →", 46), self.t("3,5", 54, ORANGE_RETENUE), buff=0.3).move_to(P(-1.2, -2.4))
        cad = SurroundingRectangle(conc, color=ORANGE_RETENUE, buff=0.18, stroke_width=4)
        self.play(FadeIn(conc, shift=UP * 0.15), Create(cad), run_time=0.6)
        self.insister(VGroup(conc, cad), 0.3, 1.2)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        fs = 46
        l1 = suite(self.t("La fréquence", fs), self.t("→", fs, VERT_OK), self.t("la probabilité", fs), buff=0.25)
        l2 = suite(self.t("La moyenne", fs), indice("M", "n", fs, BLEU_NB), self.t("→", fs, VERT_OK),
                   self.t("l'espérance", fs), self.t("μ", fs + 4, VERT_OK), buff=0.22)
        l3 = VGroup(self.t("Pas de mémoire :", fs, ORANGE_RETENUE),
                    self.t("le hasard dilue, il ne compense pas", fs)).arrange(DOWN, aligned_edge=LEFT, buff=0.15)
        self.finale([l1, l2, l3], ["La fréquence", "La moyenne", "Et le hasard"])

    def construct(self):
        self.page_de_garde()
        self.ecran_buffon()
        self.ecran_frequence()
        self.ecran_simulation()
        self.ecran_bernoulli()
        self.ecran_loi()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")


class ProbaConcLgnTerminale(ProbaConcLgnBase):
    identite = "Maths Tle spé — EleveAI"
    ceinture = "noire"
