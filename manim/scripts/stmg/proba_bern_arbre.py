# proba_bern_arbre.py
# EleveAI — Maths STMG ET Maths 1re (tronc commun) — série « Probabilités » :
# L'ARBRE DE TROIS ÉPREUVES DE BERNOULLI (micros : probaI_bernoulli_repetition
# en STMG, alea_bern_arbre en 1re), AVEC VOIX.
# Paysage 16:9, CEINTURE BLEUE. Short jumeau : proba_bern_arbre_short.py
# (ceinture jaune, trois tirs au but).
#
# ⭐⭐ UNE voix, UN script, DEUX rendus (Frédéric, 18/10 : « pour vendre en
# pack ») : ProbaBernArbreBase porte toutes les scènes ; les deux sous-classes
# ne changent que l'identité. La voix ne cite aucune classe.
#
# ⭐ La figure est l'ARBRE PONDÉRÉ du coach (`canvasRepetition` en 1re,
# `canvasArbre` en STMG : « arbre_proba », chaque niveau porte les mêmes
# probabilités) : carte blanche, branches grises, probabilités en bleu, chemin
# allumé en orange. Il pousse NIVEAU PAR NIVEAU quand la voix le dit : 3
# niveaux, 8 chemins, G / G barre, 0,8 / 0,2.
#
# Écrans : 00 garde · 01 trois pots de graines (0,8, indépendamment) · 02 le
# 1er niveau · 03 les 2e et 3e niveaux (« pareil »), 3 niveaux, 8 chemins ·
# 04 le chemin G G G barre s'allume, les trois pots se colorent · 05 les 3
# chemins à exactement 2 G, l'un après l'autre · 06 le piège : un seul chemin,
# « l'ordre ! » · 07 défi (exactement 1 G) · 07b correction (3 chemins) · 08
# ce que tu as appris · 09 fin (« Entraîne-toi sur eleveai.fr », « Abonne-toi !
# @eleveai974 »).
#
# Voix : manim/voix/stmg-premiere-proba-bern-arbre.json (débit −7).
# Rendus (depuis la racine du dépôt ; media à soi, sinon WinError 32) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_bern_arbre.py ProbaBernArbreSTMG -o eleveai-maths-stmg-proba-bern-arbre --media_dir manim/scripts/stmg/media-bern_arbre
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_bern_arbre.py ProbaBernArbrePremiere -o eleveai-maths-premiere-commun-proba-bern-arbre --media_dir manim/scripts/stmg/media-bern_arbre
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_bern_arbre_short.py ShortProbaBernArbreSTMG -o eleveai-maths-stmg-proba-bern-arbre-short --media_dir manim/scripts/stmg/media-bern_arbre
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_bern_arbre_short.py ShortProbaBernArbrePremiere -o eleveai-maths-premiere-commun-proba-bern-arbre-short --media_dir manim/scripts/stmg/media-bern_arbre
# (le short n'affiche aucune classe : un seul rendu suffit, copié sous les deux noms)
# Puis copier dans manim/sorties/stmg/maths/probabilites/20-bern-arbre/ et
# manim/sorties/premiere-commun/maths/probabilites/20-bern-arbre/.

import sys
from itertools import product
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "premiere"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import BORD, BRANCHE, CHEMIN, ENCRE, PROBA, lettre, suite  # noqa: E402

TERRE = "#3F2A1D"
POT = "#B45309"
POT_OK = "#16A34A"      # le pot dont la graine a germé
POT_NON = "#64748B"     # le pot dont la graine n'a pas germé
POUSSE = "#4ADE80"
C_G = VERT_OK           # G écrit en clair (hors de la carte)
C_GB = ORANGE_RETENUE   # G barre écrit en clair

TOUS = [tuple(c) for c in product((True, False), repeat=3)]   # les 8 chemins, G d'abord


def P(x, y):
    return np.array([x, y, 0.0])


def nb_g(chemin):
    return sum(chemin)


# ── les dessins : pots et pousses ───────────────────────────────────────────

def pot(s=1.0):
    """Un pot de terre : corps, rebord, terre, et la graine posée dessus."""
    corps = Polygon(P(-0.42, 0.3), P(0.42, 0.3), P(0.3, -0.45), P(-0.3, -0.45), fill_color=POT, fill_opacity=1,
                    stroke_color=WHITE, stroke_width=1.5)
    rebord = RoundedRectangle(width=1.0, height=0.2, corner_radius=0.05, fill_color=POT, fill_opacity=1,
                              stroke_color=WHITE, stroke_width=1.5).move_to(P(0, 0.36))
    terre = Ellipse(width=0.86, height=0.14, fill_color=TERRE, fill_opacity=1, stroke_width=0).move_to(P(0, 0.46))
    graine = Ellipse(width=0.16, height=0.1, fill_color="#FDE68A", fill_opacity=1, stroke_width=0).move_to(P(0, 0.5))
    return VGroup(corps, rebord, terre, graine).scale(s)


def pousse(p):
    """La pousse verte qui sort du pot p : une tige et deux feuilles."""
    s = p[1].width / 1.0
    base = p[2].get_center() + UP * 0.03 * s
    tige = Line(base, base + UP * 0.55 * s, color=POUSSE, stroke_width=6 * s)
    f1 = Ellipse(width=0.34 * s, height=0.15 * s, fill_color=POUSSE, fill_opacity=1, stroke_width=0)
    f1.rotate(0.5).move_to(base + P(-0.16 * s, 0.42 * s))
    f2 = Ellipse(width=0.34 * s, height=0.15 * s, fill_color=POUSSE, fill_opacity=1, stroke_width=0)
    f2.rotate(-0.5).move_to(base + P(0.16 * s, 0.5 * s))
    return VGroup(tige, f1, f2)


def colorer(p, germe):
    """Le pot se colore : vert s'il a germé, gris sinon."""
    c = POT_OK if germe else POT_NON
    return [p[0].animate.set_fill(c), p[1].animate.set_fill(c)]


def ecrire(chemin, fs=40, buff=0.28):
    """« G G G barre » en clair : G en vert, G barre en orange."""
    return suite(*[lettre("G", fs, C_G if g else C_GB, barre=not g) for g in chemin], buff=buff)


def carte_lettre(barre, phrase, fs=28):
    g = suite(lettre("G", fs + 6, C_G if not barre else C_GB, barre), Text(":", font_size=fs),
              Text(phrase, font_size=fs), buff=0.14)
    fond = RoundedRectangle(width=g.width + 0.45, height=g.height + 0.35, corner_radius=0.15, fill_color="#0F172A",
                            fill_opacity=0.9, stroke_color=BLEU_CALCUL, stroke_width=3)
    return VGroup(fond, g.move_to(fond))


# ── l'ARBRE PONDÉRÉ du coach, à trois niveaux ───────────────────────────────

class ArbreBern(VGroup):
    """Carte blanche du coach ; un nœud = le chemin qui y mène (tuple de
    booléens, True = G). Les branches, étiquettes et nombres sont indexés par
    ce tuple. Rien n'est ajouté que la carte, son titre et le départ : les
    niveaux poussent avec `pousser`, les nombres avec `nombres_niveau`."""

    def __init__(self, dx=2.2, h=0.64, fs=30, fs_nb=23, entetes=True, **kw):
        super().__init__(**kw)
        self.pos = {(): P(0, 0)}
        for L in (1, 2, 3):
            for c in product((True, False), repeat=L):
                i = int("".join("0" if g else "1" for g in c), 2)
                bloc = 2 ** (3 - L)
                ys = [(3.5 - j) * h for j in range(i * bloc, (i + 1) * bloc)]
                self.pos[c] = P(L * dx, sum(ys) / len(ys))
        self.branches, self.lab, self.nb = {}, {}, {}
        for c, v in self.pos.items():
            if not c:
                continue
            u = self.pos[c[:-1]]
            d = (v - u) / np.linalg.norm(v - u)
            debut = u + d * (0.12 if len(c) == 1 else 0.3)
            fin = v - d * 0.3
            self.branches[c] = Line(debut, fin, color=BRANCHE, stroke_width=4)
            self.lab[c] = lettre("G", fs, ENCRE, barre=not c[-1]).move_to(v)
            t = Text("0,8" if c[-1] else "0,2", font_size=fs_nb, color=PROBA, weight=BOLD)
            n = np.array([-d[1], d[0], 0.0])
            if (n[1] < 0) == c[-1]:
                n = -n
            demi = abs(n[0]) * t.width / 2 + abs(n[1]) * t.height / 2
            t.move_to((debut + fin) / 2 + n * (demi + 0.06))
            self.nb[c] = t
        self.depart = Dot(self.pos[()], radius=0.07, color=ENCRE)
        self.entetes = VGroup()
        if entetes:
            y = -3.5 * h - 0.75
            for L, mot in ((1, "1re graine"), (2, "2e graine"), (3, "3e graine")):
                self.entetes.add(Text(mot, font_size=20, color=BRANCHE).move_to(P((L - 0.5) * dx, y)))
        tout = VGroup(self.depart, *self.branches.values(), *self.lab.values(), *self.nb.values(), self.entetes)
        self.carte = RoundedRectangle(width=tout.width + 1.0, height=tout.height + 1.1, corner_radius=0.2,
                                      fill_color=WHITE, fill_opacity=1, stroke_color=BORD, stroke_width=2)
        self.carte.move_to(tout).shift(UP * 0.3)
        self.titre = Text("Arbre pondéré", font_size=22, color=ENCRE, weight=BOLD)
        self.titre.next_to(self.carte.get_top(), DOWN, buff=0.14)
        # ⛔ Tout est DANS le groupe le temps de la mise à l'échelle et du
        # placement ; `ProbaBernArbreBase.arbre` retire ensuite ce qui n'est pas posé.
        self.add(self.carte, self.titre, self.depart, self.entetes, *self.branches.values(),
                 *self.lab.values(), *self.nb.values())
        self.vus = set()

    def socle(self):
        return VGroup(self.carte, self.titre, self.depart)

    def niveau(self, L):
        return [c for c in self.pos if len(c) == L]

    def tout_poser(self, nombres=True):
        """L'arbre complet, sans animation (écrans suivants)."""
        for c in self.pos:
            if c:
                self.add(self.branches[c], self.lab[c])
                self.vus.add(("b", c))
                if nombres:
                    self.add(self.nb[c])
                    self.vus.add(("n", c))
        return self

    def pousser(self, L, run_time=0.8):
        """Le niveau L pousse : ses branches se tracent, puis ses lettres."""
        cs = self.niveau(L)
        self.vus |= {("b", c) for c in cs}
        return Succession(AnimationGroup(*[Create(self.branches[c]) for c in cs], run_time=run_time * 0.6),
                          AnimationGroup(*[FadeIn(self.lab[c], scale=1.4) for c in cs], run_time=run_time * 0.4))

    def nombres(self, L, g=None):
        """Les nombres du niveau L (g=True : les 0,8 ; False : les 0,2), marqués « posés »."""
        cs = [c for c in self.niveau(L) if g is None or c[-1] == g]
        self.vus |= {("n", c) for c in cs}
        return [self.nb[c] for c in cs]

    def etat(self, chemins=None, op=0.18):
        """Allume les chemins (orange épais) et estompe le reste ; None : tout normal.
        ⛔ Seul ce qui est déjà posé s'anime : un .animate sur un nombre absent le ferait surgir."""
        on_b = set() if chemins is None else {ch[:k] for ch in chemins for k in (1, 2, 3)}
        anims = []
        for c, br in self.branches.items():
            if ("b", c) not in self.vus:
                continue
            if chemins is None:
                anims.append(br.animate.set_stroke(BRANCHE, 4, opacity=1))
            elif c in on_b:
                anims.append(br.animate.set_stroke(CHEMIN, 9, opacity=1))
            else:
                anims.append(br.animate.set_stroke(BRANCHE, 4, opacity=op))
            on = chemins is None or c in on_b
            anims.append(self.lab[c].animate.set_opacity(1 if on else op))
            if ("n", c) in self.vus:
                anims.append(self.nb[c].animate.set_opacity(1 if on else op))
        return anims


class ProbaBernArbreBase(Notion6e):
    """Toutes les scènes ; les sous-classes ne changent que l'identité."""

    nom_voix = "stmg-premiere-proba-bern-arbre"
    identite = "Maths — EleveAI"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.3):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def au_nieme(self, extrait, n):
        """Comme au_mot, mais à la n-ième occurrence (1 = la première)."""
        texte, i = self._texte_voix, -1
        for _ in range(n):
            i = texte.find(extrait, i + 1)
            if i < 0:
                raise ValueError(f"« {extrait} » n°{n} absent de la voix : {texte[:60]}…")
        if not self._duree_voix:
            return
        reste = self._debut_voix + self._duree_voix * i / len(texte) - self.renderer.time
        if reste > 0.05:
            self.wait(reste)

    def arbre(self, centre=P(-3.05, -0.5), echelle=0.93, complet=True, nombres=True):
        a = ArbreBern().scale(echelle).move_to(centre)
        a.remove(*a.branches.values(), *a.lab.values(), *a.nb.values())   # placés, pas encore posés
        if complet:
            a.tout_poser(nombres)
        return a

    def pots(self, s=1.0, ecart=1.5, centre=P(3.6, 0.0)):
        g = VGroup(*[pot(s) for _ in range(3)]).arrange(RIGHT, buff=ecart - 1.0 * s)
        return g.move_to(centre)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("L'arbre de trois épreuves de Bernoulli", 46, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.22)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.75))
        a = self.arbre(P(-2.9, -0.15), 0.46, complet=False)
        ps = self.pots(0.85, 1.3, P(2.6, -0.5))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), FadeIn(a.socle()),
                  FadeIn(ps, shift=UP * 0.2), run_time=1.0)
        self.au_mot("trois épreuves")
        for L in (1, 2, 3):
            self.play(a.pousser(L, 0.5), FadeIn(pousse(ps[L - 1]), shift=UP * 0.15, run_time=0.5))
        self.attendre_voix(marge=1.0)

    # ── 01 : trois pots, trois graines ──────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Trois graines")
        ps = self.pots(1.35, 3.2, P(-0.6, 1.0))
        self.au_mot("On plante")
        self.play(LaggedStart(*[FadeIn(p[:3], shift=UP * 0.3) for p in ps], lag_ratio=0.2), run_time=0.8)
        self.au_mot("trois graines")
        self.play(LaggedStart(*[FadeIn(p[3], shift=DOWN * 0.8) for p in ps], lag_ratio=0.25), run_time=0.8)
        self.au_mot("Chacune germe")
        pl = pousse(pot(0.7))
        ligne = suite(pl, self.t("germe :", 44, POUSSE), buff=0.3)
        ligne.move_to(P(-1.4, -1.05))
        self.play(GrowFromEdge(pl, DOWN), FadeIn(ligne[1], shift=UP * 0.1), run_time=0.6)
        self.au_mot("0,8")
        n08 = self.t("0,8", 64, JAUNE_TITRE).next_to(ligne, RIGHT, buff=0.35)
        self.play(FadeIn(n08, scale=1.8), run_time=0.5)
        self.insister(n08)
        self.au_mot("indépendamment")
        seps = VGroup(*[DashedLine(P(x, 2.3), P(x, -0.2), color=BLEU_CALCUL, dash_length=0.12)
                        for x in ((ps[0].get_x() + ps[1].get_x()) / 2, (ps[1].get_x() + ps[2].get_x()) / 2)])
        ind = self.t("indépendamment des autres", 38, BLEU_CALCUL).move_to(P(-0.6, -2.3))
        self.play(Create(seps), FadeIn(ind, shift=UP * 0.15), run_time=0.7)
        self.attendre_voix()

    # ── 02 : le premier niveau ──────────────────────────────────────────────

    def ecran_niveau1(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-niveau1")
        self.titre_ecran("Première graine")
        a = self.arbre(complet=False)
        self.play(FadeIn(a), run_time=0.5)
        cG = carte_lettre(False, "elle germe", 30).move_to(P(3.7, 1.1))
        cGb = carte_lettre(True, "elle ne germe pas", 30).move_to(P(3.7, -0.3))
        cGb.align_to(cG, LEFT)
        self.au_mot("G, elle germe")
        self.play(a.pousser(1), Indicate(a.entetes[0], color=CHEMIN), run_time=0.8)
        self.play(FadeIn(cG, shift=LEFT * 0.2), Indicate(a.lab[(True,)], color=CHEMIN, scale_factor=1.6),
                  run_time=0.6)
        self.au_mot("0,8")
        n = a.nombres(1, True)[0]
        self.play(FadeIn(n, scale=1.8), run_time=0.4)
        self.insister(n, 0.25)
        self.au_mot("G barre, elle")
        self.play(FadeIn(cGb, shift=LEFT * 0.2), Indicate(a.lab[(False,)], color=CHEMIN, scale_factor=1.6),
                  run_time=0.6)
        self.au_mot("0,2")
        n = a.nombres(1, False)[0]
        self.play(FadeIn(n, scale=1.8), run_time=0.4)
        self.insister(n, 0.25)
        self.attendre_voix()

    # ── 03 : deuxième et troisième niveaux ──────────────────────────────────

    def ecran_niveaux(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-niveaux")
        titre = self.titre_ecran("L'arbre pousse")
        a = self.arbre(complet=False)
        a.add(a.branches[(True,)], a.branches[(False,)], a.lab[(True,)], a.lab[(False,)])
        a.vus |= {("b", (True,)), ("b", (False,))}
        a.add(*a.nombres(1))
        self.add(a)
        self.au_mot("Deuxième graine")
        self.play(a.pousser(2), Indicate(a.entetes[1], color=CHEMIN), run_time=0.8)
        self.au_mot("encore 0,8")
        self.play(*[FadeIn(n, scale=1.6) for n in a.nombres(2, True)], run_time=0.5)
        self.au_mot("et 0,2")
        self.play(*[FadeIn(n, scale=1.6) for n in a.nombres(2, False)], run_time=0.5)
        self.au_mot("Troisième graine")
        self.play(a.pousser(3), Indicate(a.entetes[2], color=CHEMIN), run_time=0.8)
        self.au_mot("pareil")
        n2 = {c: a.nb[c] for c in a.niveau(2)}
        n3 = a.nombres(3)
        self.play(*[TransformFromCopy(n2[c[:2]], a.nb[c]) for c in a.niveau(3)], run_time=0.8)
        self.au_mot("3 niveaux")
        l1 = suite(self.t("3", 64, JAUNE_TITRE), self.t("niveaux", 44), buff=0.25).move_to(P(3.7, 0.9))
        self.play(FadeIn(l1, shift=LEFT * 0.2), LaggedStart(*[Indicate(e, color=CHEMIN) for e in a.entetes],
                                                         lag_ratio=0.3), run_time=0.9)
        self.au_mot("8 chemins")
        l2 = suite(self.t("8", 64, JAUNE_TITRE), self.t("chemins", 44), buff=0.25).move_to(P(3.7, -0.5))
        l2.align_to(l1, LEFT)
        self.play(FadeIn(l2, shift=LEFT * 0.2),
                  LaggedStart(*[Indicate(a.lab[c], color=CHEMIN, scale_factor=1.6) for c in a.niveau(3)],
                              lag_ratio=0.15), run_time=1.2)
        self.insister(l2[0])
        self.attendre_voix()

    # ── 04 : lire un chemin : G, G, G barre ─────────────────────────────────

    def ecran_lire(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-lire")
        a = self.arbre()
        self.add(a)
        self.titre_ecran("Chaque chemin raconte une histoire")
        ch = (True, True, False)
        ps = self.pots(1.0, 1.55, P(3.7, -0.7))
        mots = ecrire(ch, 60)
        for m, p in zip(mots, ps):
            m.move_to(P(p.get_x(), 1.0))
        self.play(FadeIn(ps, shift=UP * 0.2), run_time=0.5)
        self.au_mot("G, G, G barre")
        for k in range(3):
            self.play(*a.etat([ch[:k + 1]]), FadeIn(mots[k], scale=1.6), run_time=0.45)
        self.au_mot("les deux premières")
        self.play(*colorer(ps[0], True), *colorer(ps[1], True), FadeIn(pousse(ps[0]), shift=UP * 0.2),
                  FadeIn(pousse(ps[1]), shift=UP * 0.2), Indicate(mots[:2], color=WHITE), run_time=0.7)
        self.au_mot("pas la troisième")
        self.play(*colorer(ps[2], False), Indicate(mots[2], color=WHITE, scale_factor=1.4),
                  ps[2][3].animate.set_fill(POT_NON), run_time=0.7)
        self.attendre_voix()

    # ── 05 : compter les chemins à exactement 2 G ───────────────────────────

    def lignes_chemins(self, chemins, y0=0.95, pas=0.95):
        lg = VGroup(*[ecrire(c, 48) for c in chemins])
        for k, l in enumerate(lg):
            l.move_to(P(3.7, y0 - pas * k))
        return lg

    def compter(self, a, chemins, mots, y0=0.95):
        """Les chemins s'allument l'un après l'autre, chacun écrit en clair et coché au bout."""
        lg = self.lignes_chemins(chemins, y0)
        for k, (c, mot) in enumerate(zip(chemins, mots)):
            self.au_mot(mot)
            ok = self.coche(taille=0.14).next_to(a.lab[c], RIGHT, buff=0.12)
            self.play(*a.etat(chemins[:k + 1]), FadeIn(lg[k], shift=LEFT * 0.2), run_time=0.6)
            self.play(Create(ok), run_time=0.3)
        return lg

    def ecran_compter(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-compter")
        a = self.arbre()
        self.add(a)
        self.titre_ecran("Exactement 2 graines qui germent")
        self.au_mot("Combien de chemins")
        q = suite(self.t("exactement", 36), self.t("2", 48, JAUNE_TITRE), lettre("G", 44, C_G), self.t("?", 44),
                  buff=0.2).move_to(P(3.7, 2.15))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.5)
        chemins = [(True, True, False), (True, False, True), (False, True, True)]
        lg = self.compter(a, chemins, ["G G G barre", "G G barre G", "G barre G G"])
        self.au_mot("3 chemins")
        r = suite(self.t("3", 72, JAUNE_TITRE), self.t("chemins", 48), buff=0.25).move_to(P(3.15, -1.95))
        self.play(FadeIn(r, scale=1.4), run_time=0.5)
        self.insister(r[0])
        self.attendre_voix()

    # ── 06 : le piège : un seul chemin, l'ordre oublié ──────────────────────

    def rangee(self, chemin, y):
        ps = self.pots(0.62, 0.95, P(3.3, y))
        for p, g in zip(ps, chemin):
            p[0].set_fill(POT_OK if g else POT_NON)
            p[1].set_fill(POT_OK if g else POT_NON)
            if g:
                ps.add(pousse(p))
            else:
                p[3].set_fill(POT_NON)
        return ps

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        a = self.arbre()
        self.add(a)
        self.titre_ecran("Le piège : oublier l'ordre")
        un = suite(self.t("un seul chemin", 40), self.t("?", 44, ORANGE_RETENUE), buff=0.15).move_to(P(3.6, 2.15))
        self.au_mot("n'en trouver")
        self.play(FadeIn(un, shift=UP * 0.15), run_time=0.5)
        self.au_mot("G G G barre")
        self.play(*a.etat([(True, True, False)]), run_time=0.7)
        self.au_mot("en oubliant")
        barre = Line(un.get_left() + LEFT * 0.1, un.get_right() + RIGHT * 0.1, color=ROUGE_ERREUR, stroke_width=7)
        ordre = self.t("l'ordre !", 56, ORANGE_RETENUE).move_to(P(3.6, 1.32))
        self.play(Create(barre), un.animate.set_opacity(0.5), run_time=0.4)
        self.play(FadeIn(ordre, scale=1.8), run_time=0.4)
        self.insister(ordre)
        cas = [((False, True, True), "la première", 0.1), ((True, False, True), "la deuxième", -0.98),
               ((True, True, False), "la troisième", -2.16)]
        allumes = []
        for c, mot, y in cas:
            self.au_mot(mot)
            allumes.append(c)
            r = self.rangee(c, y)
            self.play(FadeIn(r, shift=LEFT * 0.2), *a.etat(allumes), run_time=0.6)
        self.attendre_voix()

    # ── 07 : défi : exactement 1 G ──────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        a = self.arbre(P(-3.4, 0.05), 0.78)
        self.play(FadeIn(a), run_time=0.5)
        self.au_mot("Combien de chemins")
        q1 = self.t("Combien de chemins", 38)
        q2 = suite(self.t("exactement", 38), self.t("1", 52, JAUNE_TITRE), self.t("graine", 38), buff=0.2)
        q3 = suite(self.t("qui germe", 38, POUSSE), self.t("?", 44, ORANGE_RETENUE), buff=0.15)
        q = VGroup(q1, q2, q3).arrange(DOWN, buff=0.25).move_to(P(3.4, 0.9))
        self.play(FadeIn(q1, shift=UP * 0.15), run_time=0.5)
        self.au_mot("exactement 1")
        self.play(FadeIn(q2, shift=UP * 0.15), run_time=0.5)
        self.insister(q2[1])
        self.au_mot("qui germe")
        self.play(FadeIn(q3, shift=UP * 0.15), run_time=0.5)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        a = self.arbre()
        self.add(a)
        self.titre_ecran("Correction")
        chemins = [(True, False, False), (False, True, False), (False, False, True)]
        lg = self.compter(a, chemins, ["G G barre G barre", "G barre G G barre", "G barre G barre G"], y0=1.9)
        self.au_mot("3 chemins")
        r = suite(self.t("3", 72, JAUNE_TITRE), self.t("chemins", 48), buff=0.25).move_to(P(3.5, -1.05))
        ok = self.coche(taille=0.3).next_to(r, RIGHT, buff=0.4)
        self.play(FadeIn(r, scale=1.4), run_time=0.5)
        self.play(Create(ok), run_time=0.3)
        for k, mot in enumerate(["la première", "la deuxième", "la troisième"]):
            self.au_mot(mot)
            self.play(Indicate(lg[k][k], color=WHITE, scale_factor=1.7), run_time=0.5)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 34
        l1 = VGroup(suite(self.t("n épreuves :", fs, JAUNE_TITRE), self.t("n niveaux,", fs, CHEMIN), buff=0.15),
                    self.t("les mêmes branches à chaque niveau", fs)).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        l2 = suite(self.t("Un chemin :", fs, JAUNE_TITRE), self.t("une suite de succès et d'échecs", fs), buff=0.15)
        l3 = suite(self.t("k succès :", fs, JAUNE_TITRE), self.t("on n'oublie aucun ordre", fs, VERT_OK), buff=0.15)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.55)
        if lignes.width > 11.6:
            lignes.scale_to_fit_width(11.6)
        lignes.move_to(P(-0.6, 0.6))
        for mot, l in zip(["Pour n épreuves", "Chaque chemin est", "Pour compter"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("Prochaine vidéo")
        ch = suite(self.t("Prochaine vidéo :", 34, VERT_OK), self.t("calculer leurs probabilités", 34), buff=0.22)
        ch.move_to(P(-0.9, -2.6))
        self.play(FadeIn(ch, shift=UP * 0.15), run_time=0.6)
        self.attendre_voix(marge=1.0)

    # ── 09 : la fin (règle du 19/10) ────────────────────────────────────────

    def page_abonnement(self, voix="09-abonne"):
        """« Entraîne-toi sur » + eleveai.fr encadré, puis « Abonne-toi ! » +
        @eleveai974. Rien d'autre : la voix ne parle plus du coach."""
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
        self.ecran_niveau1()
        self.ecran_niveaux()
        self.ecran_lire()
        self.ecran_compter()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")


class ProbaBernArbreSTMG(ProbaBernArbreBase):
    identite = "Maths STMG — EleveAI"


class ProbaBernArbrePremiere(ProbaBernArbreBase):
    identite = "Maths 1re — EleveAI"
