# proba_triangle_pascal.py
# EleveAI — Maths STMG — série « Probabilités », lot LOI BINOMIALE :
# LE TRIANGLE DE PASCAL (micro vaT_triangle_pascal, notion
# va_binomiale_coefficients), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Short jumeau : proba_triangle_pascal_short.py (ceinture jaune, planche de
# Galton : 16 billes, 16 chemins, les bacs donnent 1, 4, 6, 4, 1).
#
# ⭐ La figure est le canvas du coach `canvasTrianglePascal` (tableau_donnees
# « Triangle de Pascal ») : carte blanche, bandeau d'en-tête sombre « n \ k »
# avec les places k, colonne bleu ciel des lignes n, cases blanches, case
# allumée en jaune (yellow-200, anneau yellow-500). Les cases sont un peu
# écartées pour laisser passer les DEUX FLÈCHES qui font naître chaque nombre
# (celui du dessus et son voisin de gauche, comme dit la légende du coach).
# ⛔ PAS D'ÉCART : chaque nombre du triangle apparaît quand la voix le dit ;
# les numéros de ligne quand la voix dit « Ligne n » ; les places 0, 1, 2…
# (étiquettes du tableau) quand la voix dit « en comptant à partir de 0 ».
#
# Écrans : 00 garde · 01 « 2 parmi 5 », l'arbre à 32 chemins, trop long ·
# 02 construire (1 en haut, 1 au bord, somme des deux au-dessus) · 03 les
# lignes 1 → 5, chaque nombre né de deux flèches · 04 lire « 2 parmi 5 » =
# 10 · 05 symétrie · 06 le piège des places comptées à partir de 1 · 07 défi
# ligne 6 · 07b correction (1, 6, 15, 20, 15, 6, 1 ; « 2 parmi 6 » = 15) ·
# 08 ce que tu as appris · 09 fin.
#
# Voix : manim/voix/stmg-proba-triangle-pascal.json (débit −7).
# Rendu (depuis la racine du dépôt) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_triangle_pascal.py ProbaTrianglePascalSTMG -o eleveai-maths-stmg-proba-triangle-pascal --media_dir manim/scripts/stmg/media-triangle_pascal
# Puis copier dans manim/sorties/stmg/maths/probabilites/43-triangle-pascal/.

import sys
from math import comb
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "premiere"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import (ANNEAU, BORD, BRANCHE, CHEMIN, ENCRE, ENTETE, LIBELLE,  # noqa: E402
                                     SURLIGNE, suite)

FLECHE = "#F97316"      # les deux flèches qui font naître un nombre (orange)
SYM = "#7C3AED"         # la symétrie (violet)


def P(x, y):
    return np.array([x, y, 0.0])


# ── « k parmi n » : n au-dessus de k, entre grandes parenthèses ─────────────

def parmi(k, n, fs=44, color=WHITE, c_n=None, c_k=None):
    """Le coefficient binomial écrit comme au lycée : deux Text empilés et
    deux parenthèses DESSINÉES (des arcs), jamais « C(n,k) »."""
    hn = Text(str(n), font_size=fs, color=c_n or color)
    bk = Text(str(k), font_size=fs, color=c_k or color)
    pile = VGroup(hn, bk).arrange(DOWN, buff=fs * 0.0045)
    h = pile.height + fs * 0.006
    sw = max(2.5, fs / 13)
    larg = pile.width / 2 + fs * 0.0045
    g = ArcBetweenPoints(P(-larg, h / 2), P(-larg, -h / 2), angle=PI / 2.6, color=color, stroke_width=sw)
    d = ArcBetweenPoints(P(larg, h / 2), P(larg, -h / 2), angle=-PI / 2.6, color=color, stroke_width=sw)
    pg = VGroup(g, d).move_to(pile)
    return VGroup(pg[0], pile, pg[1])


def dit_parmi(k, n, fs=34, color=WHITE):
    """« k parmi n » en toutes lettres, entre guillemets."""
    return Text(f"« {k} parmi {n} »", font_size=fs, color=color)


# ── le TRIANGLE DE PASCAL du coach (tableau_donnees) ────────────────────────

class Pascal(VGroup):
    """Le tableau du coach : en-tête « n \\ k » + places k, colonne des lignes
    n, et pour chaque ligne n les cases k = 0 … n. Cases écartées pour les
    flèches. Les nombres sont prêts mais pas posés : self.nombre(n, k)."""

    def __init__(self, nmax, centre=ORIGIN, s=1.0, px=0.95, py=0.78, w=0.78, h=0.5, fs=30, **kw):
        super().__init__(**kw)
        px, py, w, h, fs = px * s, py * s, w * s, h * s, int(round(fs * s))
        self.s = s
        self.nmax, self.px, self.py, self.w, self.h, self.fs = nmax, px, py, w, h, fs

        def c(n, k):
            return P((k + 1) * px, -(n + 1) * py)

        self._c = c
        # bandeau d'en-tête (sombre) : la colonne des libellés + les places
        gauche = c(0, -1)[0] - w / 2
        droite = c(0, nmax)[0] + w / 2
        self.entete = RoundedRectangle(width=droite - gauche, height=h, corner_radius=0.06, fill_color=ENTETE,
                                       fill_opacity=1, stroke_width=0).move_to(P((gauche + droite) / 2, 0))
        self.coin = Text("n \\ k", font_size=int(fs * 0.7), color=WHITE, weight=BOLD).move_to(P(c(0, -1)[0], 0))
        self.places = [Text(str(k), font_size=fs, color=WHITE, weight=BOLD).move_to(P(c(0, k)[0], 0))
                       for k in range(nmax + 1)]
        self.lab = {}
        self.lab_num = {}
        self.cases = {}
        self.nums = {}
        for n in range(nmax + 1):
            self.lab[n] = RoundedRectangle(width=w, height=h, corner_radius=0.06, fill_color=LIBELLE,
                                           fill_opacity=1, stroke_color=BORD, stroke_width=2).move_to(c(n, -1))
            self.lab_num[n] = Text(str(n), font_size=fs, color=ENCRE, weight=BOLD).move_to(c(n, -1))
            for k in range(n + 1):
                self.cases[(n, k)] = RoundedRectangle(width=w, height=h, corner_radius=0.06, fill_color=WHITE,
                                                      fill_opacity=1, stroke_color=BORD, stroke_width=2) \
                    .move_to(c(n, k))
                t = Text(str(comb(n, k)), font_size=fs, color=ENCRE, weight=BOLD)
                if t.width > w - 0.1:
                    t.scale_to_fit_width(w - 0.1)
                self.nums[(n, k)] = t.move_to(c(n, k))
        tout = VGroup(self.entete, *self.lab.values(), *self.cases.values())
        self.carte = RoundedRectangle(width=tout.width + 0.5, height=tout.height + 0.5, corner_radius=0.2,
                                      fill_color=WHITE, fill_opacity=1, stroke_color=BORD, stroke_width=2)
        self.carte.move_to(tout)
        self.add(self.carte, self.entete, self.coin, *self.lab.values(), *self.cases.values())
        # tout (même ce qui n'est pas encore posé) se recentre sur `centre`
        d = np.array(centre) - self.carte.get_center()
        self.shift(d)
        for m in [*self.places, *self.lab_num.values(), *self.nums.values()]:
            m.shift(d)

    # les objets prêts (à poser par la scène)
    def nombre(self, n, k):
        return self.nums[(n, k)]

    def centre(self, n, k):
        return self.cases[(n, k)].get_center()

    def ligne_cases(self, n):
        return VGroup(*[self.cases[(n, k)] for k in range(n + 1)])

    def fleches(self, n, k, color=FLECHE):
        """Les DEUX flèches qui font naître la case (n, k) : depuis la case du
        dessus (n − 1, k) et depuis sa voisine de gauche (n − 1, k − 1)."""
        cible = self.cases[(n, k)]
        s = self.s
        haut = cible.get_top()
        out = VGroup()
        for kk, dx in ((k - 1, -0.17), (k, 0.1)):
            src = self.cases[(n - 1, kk)]
            a = src.get_bottom() + (RIGHT * 0.12 * s if kk == k - 1 else ORIGIN)
            b = haut + RIGHT * dx * s
            out.add(Arrow(a, b, buff=0.02 * s, color=color, stroke_width=6,
                          max_tip_length_to_length_ratio=0.5, max_stroke_width_to_length_ratio=20))
        return out


def arbre5(largeur=4.6, hauteur=4.4, color="#94A3B8"):
    """L'arbre de 5 épreuves : 2, 4, 8, 16, 32 branches (que des traits).
    Renvoie (niveaux, feuilles) : niveaux[i] = les branches du niveau i."""
    niveaux = []
    pts = [P(0, 0)]
    for i in range(5):
        dy = hauteur / 2 ** (i + 1)
        nv, suiv = VGroup(), []
        for p in pts:
            for sgn in (1, -1):
                q = p + P(largeur / 5, sgn * dy / 2)
                nv.add(Line(p, q, color=color, stroke_width=max(1.6, 4.5 - 0.6 * i)))
                suiv.append(q)
        niveaux.append(nv)
        pts = suiv
    feuilles = VGroup(*[Dot(p, radius=0.035, color=CHEMIN) for p in pts])
    return niveaux, feuilles


class ProbaTrianglePascalBase(Notion6e):
    """Toutes les scènes ; la sous-classe ne change que l'identité."""

    nom_voix = "stmg-proba-triangle-pascal"
    identite = "Maths — EleveAI"
    XD = 3.65  # le centre du panneau de droite

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.3):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def caser(self, mob, larg=5.8):
        if mob.width > larg:
            mob.scale_to_fit_width(larg)
        return mob

    def au_apres(self, prefixe):
        """Attend le mot qui SUIT `prefixe` (au_mot vise le DÉBUT d'un extrait,
        et cherche la première occurrence : « 1, 3, 3, 1 » se vise ainsi)."""
        texte = self._texte_voix
        i = texte.find(prefixe)
        if i < 0:
            raise ValueError(f"« {prefixe} » absent de la voix : {texte[:60]}…")
        if not self._duree_voix:
            return
        cible = self._debut_voix + self._duree_voix * (i + len(prefixe)) / len(texte)
        reste = cible - self.renderer.time
        if reste > 0.05:
            self.wait(reste)

    def tableau(self, nmax=5):
        if nmax == 5:
            return Pascal(5, centre=P(-3.3, -0.12), s=1.0)
        return Pascal(nmax, centre=P(-3.3, -0.14), s=0.86)

    def tout_pose(self, tb, lignes, places=True, labels=True):
        """Le tableau déjà rempli jusqu'à la ligne `lignes` (sans animation)."""
        objs = [tb]
        if places:
            objs += tb.places
        if labels:
            objs += [tb.lab_num[n] for n in range(tb.nmax + 1) if n <= lignes]
        objs += [tb.nums[(n, k)] for n in range(lignes + 1) for k in range(n + 1)]
        self.add(*objs)

    def allumer(self, tb, n, k, run_time=0.4):
        """La case du coach allumée : fond yellow-200, anneau yellow-500."""
        c = tb.cases[(n, k)]
        return [c.animate.set_fill(SURLIGNE, 1).set_stroke(ANNEAU, 5)]

    def naitre(self, tb, n, k, run_time=0.28):
        """Le nombre (n, k) naît : bord → il apparaît ; dedans → deux flèches
        partent des deux nombres au-dessus, puis il apparaît."""
        num = tb.nums[(n, k)]
        if k in (0, n) or n == 0:
            self.play(FadeIn(num, scale=1.8), run_time=run_time)
            return VGroup()
        fl = tb.fleches(n, k)
        self.play(GrowArrow(fl[0]), GrowArrow(fl[1]), run_time=run_time * 0.8)
        self.play(FadeIn(num, scale=1.8), run_time=run_time * 0.8)
        return fl

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Le triangle de Pascal", 56, JAUNE_TITRE).to_edge(UP, buff=0.55)
        sous = self.t("les coefficients sans calcul", 40, BLEU_CALCUL).next_to(titre, DOWN, buff=0.2)
        identite = self.t(self.identite, 28).next_to(sous, DOWN, buff=0.22)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.75))
        tuiles = VGroup()
        for n in range(5):
            for k in range(n + 1):
                tuiles.add(RoundedRectangle(width=0.58, height=0.34, corner_radius=0.06, fill_color=WHITE,
                                            fill_opacity=1, stroke_color=BORD, stroke_width=2)
                           .move_to(P(-0.6 + (k - n / 2) * 0.72, 0.75 - 0.44 * n)))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=0.9)
        self.play(LaggedStart(*[FadeIn(x, shift=DOWN * 0.3) for x in tuiles], lag_ratio=0.08), run_time=1.2)
        self.au_mot("les coefficients")
        self.play(FadeIn(sous, shift=UP * 0.15), run_time=0.5)
        self.play(tuiles.animate.set_fill(SURLIGNE, 1).set_stroke(ANNEAU, 3), run_time=0.5)
        self.attendre_voix(marge=1.0)

    # ── 01 : « 2 parmi 5 », l'arbre à 32 chemins ────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Compter les chemins ?")
        self.au_mot("5 épreuves")
        l1 = suite(self.t("Loi binomiale,", 36), self.t("5 épreuves", 36, JAUNE_TITRE), buff=0.22)
        l1.move_to(P(self.XD, 2.45))
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.5)
        self.au_mot("« 2 parmi 5 »")
        co = parmi(2, 5, 60, JAUNE_TITRE).move_to(P(self.XD, 1.05))
        dit = dit_parmi(2, 5, 32).next_to(co, DOWN, buff=0.2)
        self.play(FadeIn(co, scale=1.6), FadeIn(dit, shift=UP * 0.1), run_time=0.5)
        self.insister(co)
        self.au_mot("Dessiner l'arbre")
        niveaux, feuilles = arbre5()
        arbre = VGroup(*niveaux, feuilles).move_to(P(-3.6, -0.2))
        for nv in niveaux:
            self.play(Create(nv), run_time=0.35)
        self.au_mot("32 chemins")
        self.play(LaggedStart(*[FadeIn(f, scale=2) for f in feuilles], lag_ratio=0.03), run_time=0.6)
        tr = self.t("32 chemins", 40, CHEMIN).move_to(P(self.XD, -0.85))
        self.play(FadeIn(tr, scale=1.6), run_time=0.4)
        self.au_mot("Trop long")
        tl = self.t("Trop long !", 54, ROUGE_ERREUR).rotate(0.1).move_to(P(self.XD - 0.7, -2.0))
        self.play(FadeIn(tl, scale=2.0), arbre.animate.set_opacity(0.35), run_time=0.4)
        self.play(Wiggle(tl), run_time=0.6)
        self.attendre_voix()

    # ── 02 : construire ─────────────────────────────────────────────────────

    def ecran_construire(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-construire")
        self.titre_ecran("Construire le triangle")
        tb = self.tableau(5)
        self.play(FadeIn(tb), run_time=0.6)
        self.au_mot("1 en haut")
        self.naitre(tb, 0, 0, 0.35)
        self.play(*self.allumer(tb, 0, 0), run_time=0.3)
        r1 = suite(self.t("1", 44, JAUNE_TITRE), self.t("en haut", 36), buff=0.2).move_to(P(self.XD, 2.1))
        self.play(FadeIn(r1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("commence et finit")
        bords = [tb.cases[(n, k)] for n in range(1, 6) for k in sorted({0, n})]
        self.play(tb.cases[(0, 0)].animate.set_fill(WHITE, 1).set_stroke(BORD, 2), run_time=0.2)
        r2 = VGroup(self.t("Au début et à la fin", 34),
                    suite(self.t("de chaque ligne :", 34), self.t("1", 44, JAUNE_TITRE), buff=0.2)) \
            .arrange(DOWN, buff=0.12).move_to(P(self.XD, 0.9))
        self.play(LaggedStart(*[c.animate.set_stroke(ANNEAU, 5) for c in bords], lag_ratio=0.08),
                  FadeIn(r2, shift=UP * 0.1), run_time=1.0)
        self.au_mot("Chaque autre nombre")
        self.play(*[c.animate.set_stroke(BORD, 2) for c in bords], run_time=0.3)
        q = Text("?", font_size=tb.fs, color=FLECHE, weight=BOLD).move_to(tb.centre(3, 1))
        r3 = VGroup(self.t("Chaque autre nombre :", 34),
                    self.t("la somme des deux", 34, FLECHE),
                    self.t("nombres au-dessus", 34, FLECHE)).arrange(DOWN, buff=0.12).move_to(P(self.XD, -0.75))
        self.play(FadeIn(r3[0], shift=UP * 0.1), FadeIn(q, scale=1.6), *self.allumer(tb, 3, 1), run_time=0.5)
        self.au_mot("la somme")
        fl = tb.fleches(3, 1)
        self.play(GrowArrow(fl[0]), GrowArrow(fl[1]), FadeIn(r3[1:], shift=UP * 0.1),
                  tb.cases[(2, 0)].animate.set_stroke(FLECHE, 5), tb.cases[(2, 1)].animate.set_stroke(FLECHE, 5),
                  run_time=0.6)
        self.insister(fl, 0.3)
        self.attendre_voix()

    # ── 03 : les lignes 1 → 5 ───────────────────────────────────────────────

    def remplir_ligne(self, tb, n, texte_ligne, fleches_avant=None):
        """La voix dit « Ligne n : a, b, c… » : le numéro de ligne, puis chaque
        nombre au moment où il est dit, né de ses deux flèches."""
        vals = [str(comb(n, k)) for k in range(n + 1)]
        tete = f"Ligne {n} : "
        self.au_mot(f"Ligne {n}")
        anims = [FadeIn(tb.lab_num[n], scale=1.6), tb.lab[n].animate.set_fill(SURLIGNE, 1)]
        if fleches_avant is not None and len(fleches_avant):
            anims.append(FadeOut(fleches_avant))
        self.play(*anims, run_time=0.25)
        fl_prec = VGroup()
        for k in range(n + 1):
            self.au_apres(tete + "".join(v + ", " for v in vals[:k]))
            num = tb.nums[(n, k)]
            if k in (0, n):
                anims = [FadeIn(num, scale=1.8)]
                if len(fl_prec):
                    anims.append(FadeOut(fl_prec))
                    fl_prec = VGroup()
                self.play(*anims, run_time=0.22)
            else:
                fl = tb.fleches(n, k)
                anims = [GrowArrow(fl[0]), GrowArrow(fl[1])]
                if len(fl_prec):
                    anims.append(FadeOut(fl_prec))
                self.play(*anims, run_time=0.2)
                self.play(FadeIn(num, scale=1.8), run_time=0.2)
                fl_prec = fl
        self.play(tb.lab[n].animate.set_fill(LIBELLE, 1), run_time=0.15)
        return fl_prec

    def ecran_lignes(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-lignes")
        self.titre_ecran("Ligne par ligne")
        tb = self.tableau(5)
        self.add(tb, tb.nums[(0, 0)])
        rappel = VGroup(self.t("chaque nombre =", 32),
                        self.t("la somme des deux", 32, FLECHE),
                        self.t("au-dessus", 32, FLECHE)).arrange(DOWN, buff=0.12).move_to(P(self.XD, 1.6))
        self.add(rappel)
        reste = VGroup()
        for n in range(1, 6):
            reste = self.remplir_ligne(tb, n, "", reste)
        if len(reste):
            self.play(FadeOut(reste), run_time=0.3)
        self.play(Indicate(VGroup(*tb.ligne_cases(5), *[tb.nums[(5, k)] for k in range(6)]), color=ANNEAU,
                           scale_factor=1.08), run_time=0.6)
        self.attendre_voix()

    # ── 04 : lire « k parmi n » ─────────────────────────────────────────────

    def estomper(self, tb, garder, op=0.25):
        """Estompe les cases (et leurs nombres) hors de `garder`."""
        anims = []
        for key, c in tb.cases.items():
            on = key in garder
            anims.append(c.animate.set_opacity(1 if on else op))
            anims.append(tb.nums[key].animate.set_opacity(1 if on else op))
        return anims

    def ecran_lire(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-lire")
        self.titre_ecran("Lire « k parmi n »")
        tb = self.tableau(5)
        self.add(tb, *[tb.lab_num[n] for n in range(1, 6)],
                 *[tb.nums[(n, k)] for n in range(6) for k in range(n + 1)])
        x = self.XD
        self.au_mot("« k parmi n »")
        co = parmi("k", "n", 56, WHITE, c_n=BLEU_CALCUL, c_k=VERT_OK)
        dit = Text("« k parmi n »", font_size=32)
        dit[1].set_color(VERT_OK)
        dit[-2].set_color(BLEU_CALCUL)
        g0 = suite(co, dit, buff=0.35).move_to(P(x, 1.85))
        self.play(FadeIn(g0, shift=UP * 0.15), run_time=0.5)
        self.au_mot("sur la ligne n")
        lp = Text("ligne n, place k", font_size=38)
        lp[5].set_color(BLEU_CALCUL)
        lp[12].set_color(VERT_OK)
        lp.move_to(P(x, 0.75))
        l1 = lp[:6]
        self.play(FadeIn(l1, shift=UP * 0.1), *[c.animate.set_stroke(BLEU_CALCUL, 5) for c in tb.lab.values()],
                  run_time=0.5)
        self.au_mot("à la place k")
        self.play(FadeIn(lp[6:], shift=UP * 0.1), *[c.animate.set_stroke(BORD, 2) for c in tb.lab.values()],
                  Indicate(tb.entete, color=VERT_OK, scale_factor=1.04), run_time=0.6)
        self.au_mot("en comptant à partir de 0")
        z = suite(self.t("on compte à partir de", 32), self.t("0", 44, JAUNE_TITRE), buff=0.18).move_to(P(x, -0.05))
        self.play(FadeIn(z, shift=UP * 0.1), LaggedStart(*[FadeIn(p, scale=1.6) for p in tb.places], lag_ratio=0.12),
                  FadeIn(tb.lab_num[0], scale=1.6), run_time=0.9)
        self.play(Indicate(tb.places[0], color=JAUNE_TITRE, scale_factor=1.8),
                  Indicate(tb.lab_num[0], color=ORANGE_RETENUE, scale_factor=1.8), run_time=0.5)
        self.au_mot("« 2 parmi 5 » :")
        c25 = parmi(2, 5, 60, WHITE, c_n=BLEU_CALCUL, c_k=VERT_OK)
        eg = self.t("=", 56)
        dix = self.t("10", 60, JAUNE_TITRE)
        res = suite(c25, eg, dix, buff=0.3).move_to(P(x, -1.3))
        self.play(FadeIn(c25, scale=1.5), run_time=0.4)
        self.au_mot("ligne 5")
        ligne5 = {(5, k) for k in range(6)}
        self.play(*self.estomper(tb, ligne5), tb.lab[5].animate.set_fill(SURLIGNE, 1).set_stroke(BLEU_CALCUL, 5),
                  run_time=0.4)
        self.au_mot("place 2")
        cad = SurroundingRectangle(tb.places[2], color=VERT_OK, buff=0.1, stroke_width=5)
        self.play(Create(cad), *self.estomper(tb, {(5, 2)}, 0.25), run_time=0.4)
        self.play(Indicate(tb.places[2], color=VERT_OK, scale_factor=1.8), run_time=0.4)
        self.au_apres("place 2 : ")
        self.play(*self.allumer(tb, 5, 2), FadeIn(eg), FadeIn(dix, scale=1.8), run_time=0.4)
        self.play(tb.nums[(5, 2)].animate.scale(1.5), dix.animate.scale(1.5), run_time=0.3)
        self.play(tb.nums[(5, 2)].animate.scale(1 / 1.5), dix.animate.scale(1 / 1.5), run_time=0.3)
        self.attendre_voix()

    # ── 05 : la symétrie ────────────────────────────────────────────────────

    def ecran_symetrie(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-symetrie")
        self.titre_ecran("Chaque ligne est symétrique")
        tb = self.tableau(5)
        self.tout_pose(tb, 5)
        x = self.XD
        self.au_mot("symétrique")
        arcs = VGroup()
        for k in range(3):
            a, b = tb.cases[(5, k)].get_bottom(), tb.cases[(5, 5 - k)].get_bottom()
            arcs.add(CurvedDoubleArrow(a + DOWN * 0.04, b + DOWN * 0.04, angle=PI / 2.2 + 0.25 * (2 - k) * 0,
                                       color=SYM, stroke_width=5, tip_length=0.16))
        self.play(*self.estomper(tb, {(5, k) for k in range(6)}, 0.4), run_time=0.4)
        self.play(LaggedStart(*[Create(a) for a in arcs], lag_ratio=0.3), run_time=1.0)
        self.au_mot("« 2 parmi 5 » égale")
        c2 = parmi(2, 5, 56)
        eg = self.t("=", 52)
        c3 = parmi(3, 5, 56)
        l1 = suite(c2, eg, c3, buff=0.3).move_to(P(x, 1.8))
        self.play(FadeIn(c2, scale=1.4), *self.allumer(tb, 5, 2), run_time=0.4)
        self.au_mot("égale « 3 parmi 5 »")
        self.play(FadeIn(eg), FadeIn(c3, scale=1.4), *self.allumer(tb, 5, 3), run_time=0.4)
        self.play(Indicate(arcs[2], color=SYM, scale_factor=1.2), run_time=0.5)
        self.au_mot("Avoir 2 succès")
        s2 = suite(self.t("2 succès", 38, VERT_OK), self.t("ou", 32), self.t("2 échecs", 38, ROUGE_ERREUR),
                   buff=0.25).move_to(P(x, 0.25))
        self.play(FadeIn(s2[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("2 échecs")
        self.play(FadeIn(s2[1:], shift=UP * 0.1), run_time=0.4)
        self.au_mot("le même nombre")
        m = VGroup(self.t("le même nombre", 36, JAUNE_TITRE), self.t("de chemins", 36, JAUNE_TITRE)) \
            .arrange(DOWN, buff=0.1).move_to(P(x, -0.9))
        self.play(FadeIn(m, shift=UP * 0.1), run_time=0.5)
        self.insister(m)
        self.attendre_voix()

    # ── 06 : le piège : compter à partir de 1 ───────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        tb = self.tableau(5)
        self.tout_pose(tb, 5)
        x = self.XD
        self.au_mot("compter les places à partir de 1")
        faux = self.t("1", tb.fs, WHITE).move_to(tb.places[0])
        fond = RoundedRectangle(width=tb.w, height=tb.h, corner_radius=0.06, fill_color=ROUGE_ERREUR,
                                fill_opacity=1, stroke_width=0).move_to(tb.places[0])
        f1 = VGroup(self.t("Compter les places", 34, ROUGE_ERREUR),
                    suite(self.t("à partir de", 34, ROUGE_ERREUR), self.t("1", 44, ROUGE_ERREUR), buff=0.18)) \
            .arrange(DOWN, buff=0.12).move_to(P(x, 1.9))
        self.play(FadeOut(tb.places[0]), FadeIn(fond), FadeIn(faux, scale=1.6), FadeIn(f1, shift=UP * 0.1),
                  *self.estomper(tb, {(5, k) for k in range(6)}, 0.4), run_time=0.5)
        self.insister(VGroup(fond, faux))
        self.au_mot("La première place")
        cad = SurroundingRectangle(tb.cases[(5, 0)], color=VERT_OK, buff=0.06, stroke_width=5)
        self.play(Create(cad), run_time=0.4)
        self.au_mot("c'est la place 0")
        croix = Line(f1.get_corner(DL), f1.get_corner(UR), color=ROUGE_ERREUR, stroke_width=7)
        self.play(FadeOut(fond), FadeOut(faux), FadeIn(tb.places[0], scale=1.8), Create(croix),
                  f1.animate.set_opacity(0.5), run_time=0.5)
        self.play(Indicate(tb.places[0], color=VERT_OK, scale_factor=2.0), run_time=0.5)
        f2 = suite(self.t("La première place :", 34, VERT_OK), self.t("0", 46, VERT_OK), buff=0.2)
        f2.move_to(P(x, 0.55))
        self.play(FadeIn(f2, shift=UP * 0.1), run_time=0.4)
        self.au_mot("« 0 parmi 5 »")
        c0 = parmi(0, 5, 58)
        eg = self.t("=", 52)
        un = self.t("1", 58, JAUNE_TITRE)
        l = suite(c0, eg, un, buff=0.3).move_to(P(x, -0.85))
        self.play(FadeIn(c0, scale=1.4), run_time=0.4)
        self.au_apres("vaut ")
        self.play(FadeIn(eg), FadeIn(un, scale=1.8), *self.allumer(tb, 5, 0), run_time=0.4)
        self.insister(un)
        self.attendre_voix()

    # ── 07 : défi : la ligne 6 ──────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        tb = self.tableau(6)
        objs = [tb.carte, tb.entete, tb.coin, *tb.places,
                *[tb.lab[n] for n in range(6)], *[tb.lab_num[n] for n in range(6)],
                *[tb.cases[(n, k)] for n in range(6) for k in range(n + 1)],
                *[tb.nums[(n, k)] for n in range(6) for k in range(n + 1)]]
        self.add(*objs)
        x = self.XD
        self.au_mot("Construis la ligne 6")
        l6 = [tb.cases[(6, k)] for k in range(7)]
        qs = VGroup(*[Text("?", font_size=tb.fs, color=FLECHE, weight=BOLD).move_to(c) for c in l6])
        self.play(FadeIn(tb.lab[6]), FadeIn(tb.lab_num[6], scale=1.6),
                  LaggedStart(*[FadeIn(c, shift=DOWN * 0.2) for c in l6], lag_ratio=0.1), run_time=0.8)
        self.play(LaggedStart(*[FadeIn(q, scale=1.6) for q in qs], lag_ratio=0.08), run_time=0.6)
        t1 = suite(self.t("Construis la", 36), self.t("ligne 6", 40, BLEU_CALCUL), buff=0.2).move_to(P(x, 1.9))
        self.play(FadeIn(t1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("« 2 parmi 6 »")
        c26 = parmi(2, 6, 60)
        q = suite(self.t("et trouve", 36), c26, self.t("= ?", 52, ORANGE_RETENUE), buff=0.25).move_to(P(x, 0.55))
        self.play(FadeIn(q, shift=UP * 0.1), tb.cases[(6, 2)].animate.set_stroke(ANNEAU, 6), run_time=0.5)
        self.insister(c26)
        self.au_mot("Mets pause")
        mp = self.t("Mets pause, et cherche !", 36, ORANGE_RETENUE).move_to(P(x, -0.9))
        self.caser(mp, 5.8)
        self.play(Write(mp), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        tb = self.tableau(6)
        objs = [tb.carte, tb.entete, tb.coin, *tb.places,
                *[tb.lab[n] for n in range(7)], *[tb.lab_num[n] for n in range(6)],
                *[tb.cases[(n, k)] for n in range(7) for k in range(n + 1)],
                *[tb.nums[(n, k)] for n in range(6) for k in range(n + 1)]]
        self.add(*objs)
        x = self.XD
        reste = self.remplir_ligne(tb, 6, "")
        if len(reste):
            self.play(FadeOut(reste), run_time=0.2)
        self.au_mot("« 2 parmi 6 »")
        c26 = parmi(2, 6, 60)
        eg = self.t("=", 54)
        r = self.t("15", 60, JAUNE_TITRE)
        l = suite(c26, eg, r, buff=0.3).move_to(P(x, 1.2))
        self.play(FadeIn(c26, scale=1.4), *self.estomper(tb, {(6, k) for k in range(7)}, 0.35),
                  Indicate(tb.places[2], color=VERT_OK, scale_factor=1.8), run_time=0.5)
        self.au_apres("vaut ")
        self.play(FadeIn(eg), FadeIn(r, scale=1.8), *self.allumer(tb, 6, 2), run_time=0.4)
        self.play(tb.nums[(6, 2)].animate.scale(1.5), r.animate.scale(1.5), run_time=0.3)
        self.play(tb.nums[(6, 2)].animate.scale(1 / 1.5), r.animate.scale(1 / 1.5), run_time=0.3)
        ok = self.coche(taille=0.35).next_to(l, DOWN, buff=0.45)
        self.play(Create(ok), run_time=0.4)
        self.attendre_voix(marge=1.6)

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 38
        l1 = VGroup(self.t("Dans le triangle de Pascal, chaque nombre", fs),
                    self.t("est la somme des deux au-dessus", fs, FLECHE)).arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        co = parmi("k", "n", 50, WHITE, c_n=BLEU_CALCUL, c_k=VERT_OK)
        l2a = suite(co, self.t("« k parmi n » se lit", fs), buff=0.3)
        l2b = Text("ligne n, place k, en partant de 0", font_size=fs)
        l2b[5].set_color(BLEU_CALCUL)
        l2b[12].set_color(VERT_OK)
        l2b[-1].set_color(JAUNE_TITRE)
        l2 = VGroup(l2a, l2b).arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.7)
        if lignes.width > 11.0:
            lignes.scale_to_fit_width(11.0)
        lignes.move_to(P(-0.7, 0.1))
        for mot, l in zip(["Dans le triangle", "« k parmi n »"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.attendre_voix(marge=1.0)

    # ── 09 : la fin (règle du 19/10) ────────────────────────────────────────

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
        self.ecran_construire()
        self.ecran_lignes()
        self.ecran_lire()
        self.ecran_symetrie()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")


class ProbaTrianglePascalSTMG(ProbaTrianglePascalBase):
    identite = "Maths STMG — EleveAI"
