# proba_bin_extremes.py
# EleveAI — Maths STMG (micro vaT_bin_extremes, notion va_binomiale_calcul) —
# série « Probabilités » : LES CAS EXTRÊMES DE LA LOI BINOMIALE, AVEC VOIX.
# P(X = 0), P(X = n), P(X = 1), P(X = n − 1). Paysage 16:9.
# Short jumeau : proba_bin_extremes_short.py.
#
# ⭐ La figure : 5 PANNEAUX SOLAIRES en ligne, qui s'allument (marche) ou
# s'éteignent en rouge (panne) selon le chemin dit. Sous chaque panneau, la
# lettre du chemin comme sur l'ARBRE du coach (`arbre_proba`) : S (succès =
# panne) / E (échec = marche), les probabilités en bleu, le chemin encadré en
# orange. « Un seul chemin » / « 5 chemins » se voit : la panne se déplace
# sur chacun des 5 panneaux et chaque position s'empile dans la liste.
# ⛔ PAS D'ÉCART : un nombre ne s'écrit que lorsque la voix le dit.
#
# Écrans : 00 garde · 01 la centrale (5 panneaux, 0,1, B(5 ; 0,1)) · 02 aucune
# panne : 0,9⁵ ≈ 0,590 · 03 les 5 en panne : 0,1⁵ = 0,00001 · 04 une panne :
# 5 chemins, 5 × 0,1 × 0,9⁴ ≈ 0,328 · 05 le sens · 06 le piège (oublier le 5)
# · 07 défi P(X = 4) · 07b correction 5 × 0,1⁴ × 0,9 = 0,00045 · 08 ce que tu
# as appris · 09 fin.
#
# Voix : manim/voix/stmg-proba-bin-extremes.json (débit −7).
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_bin_extremes.py ProbaBinExtremesSTMG -o eleveai-maths-stmg-proba-bin-extremes --media_dir manim/scripts/stmg/media-bin_extremes
# Sortie : manim/sorties/stmg/maths/probabilites/46-bin-extremes/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "premiere"))

import numpy as np  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import CHEMIN, suite  # noqa: E402

# ⚠️ Autonome : ne dépend PAS de proba_bin_calculer.py (une autre session le
# modifie) ; les petites aides de la série sont recopiées ici.
BLEU_NB = "#60A5FA"     # les nombres recopiés dans les calculs


def P(x, y):
    return np.array([x, y, 0.0])


def puissance(base, exposant, fs=48, color=WHITE, c_exp=None):
    """0,9⁵ en Text : l'exposant, plus petit, posé en haut à droite."""
    b = Text(base, font_size=fs, color=color)
    e = Text(exposant, font_size=int(fs * 0.6), color=c_exp or color)
    e.next_to(b, RIGHT, buff=0.04).align_to(b, UP).shift(UP * 0.13 * fs / 48)
    return VGroup(b, e)


def p_egal(k, fs=44, color=WHITE):
    return Text(f"P(X = {k})", font_size=fs, color=color)


ROUGE_S = "#F87171"     # la lettre S (succès = panne)
VERRE_ON = "#2563EB"    # panneau qui marche
VERRE_OFF = "#334155"   # panneau éteint (pas encore dit)
VERRE_PANNE = "#991B1B"  # panneau en panne
SOLEIL = "#FACC15"


class Panneau(VGroup):
    """Un panneau solaire : verre incliné quadrillé, pied, reflet ; trois états
    (éteint, marche, panne). La croix rouge marque la panne."""

    def __init__(self, s=1.0, **kw):
        super().__init__(**kw)
        a, b, c, d = P(-0.5, 0.42), P(0.8, 0.42), P(0.5, -0.42), P(-0.8, -0.42)
        self.verre = Polygon(a, b, c, d, fill_color=VERRE_OFF, fill_opacity=1, stroke_color=GREY_B,
                             stroke_width=3)
        lignes = VGroup()
        for t in (1 / 3, 2 / 3):
            lignes.add(Line(a + (b - a) * t, d + (c - d) * t))
        lignes.add(Line((a + d) / 2, (b + c) / 2))
        self.grille = lignes.set_stroke(GREY_B, 1.6, opacity=0.7)
        self.reflet = Line(P(-0.25, 0.3), P(0.05, -0.05), stroke_width=5, color=WHITE).set_opacity(0)
        self.pied = VGroup(Line(P(0, -0.42), P(0, -0.78)), Line(P(-0.3, -0.78), P(0.3, -0.78))).set_stroke(
            GREY_B, 4)
        self.croix = VGroup(Line(P(-0.3, -0.3), P(0.3, 0.3)), Line(P(-0.3, 0.3), P(0.3, -0.3))).set_stroke(
            ROUGE_ERREUR, 8).set_opacity(0)
        self.add(self.pied, self.verre, self.grille, self.reflet, self.croix)
        self.scale(s)
        self.etat = "off"

    def vers(self, etat):
        """Les animations qui mènent le panneau à l'état « on », « panne », « off »."""
        self.etat = etat
        fond = {"on": VERRE_ON, "panne": VERRE_PANNE, "off": VERRE_OFF}[etat]
        bord = {"on": "#93C5FD", "panne": ROUGE_ERREUR, "off": GREY_B}[etat]
        return [self.verre.animate.set_fill(fond, 1).set_stroke(bord),
                self.reflet.animate.set_opacity(0.55 if etat == "on" else 0),
                self.croix.animate.set_opacity(1 if etat == "panne" else 0)]

    def poser(self, etat):
        self.etat = etat
        fond = {"on": VERRE_ON, "panne": VERRE_PANNE, "off": VERRE_OFF}[etat]
        bord = {"on": "#93C5FD", "panne": ROUGE_ERREUR, "off": GREY_B}[etat]
        self.verre.set_fill(fond, 1).set_stroke(bord)
        self.reflet.set_opacity(0.55 if etat == "on" else 0)
        self.croix.set_opacity(1 if etat == "panne" else 0)
        return self


def soleil(s=1.0):
    c = Circle(radius=0.32, fill_color=SOLEIL, fill_opacity=1, stroke_width=0)
    rayons = VGroup(*[Line(P(0.42, 0), P(0.62, 0)).rotate(k * PI / 4, about_point=ORIGIN) for k in range(8)])
    rayons.set_stroke(SOLEIL, 4)
    return VGroup(c, rayons).scale(s)


def lettre(c, fs=34):
    """S (succès = panne, rouge) ou E (échec = marche, bleu)."""
    return Text("S" if c == "s" else "E", font_size=fs, color=ROUGE_S if c == "s" else BLEU_NB, weight=BOLD)


def mini_chemin(f, fs=28):
    """Un chemin en lettres, comme au bout d'une branche de l'arbre."""
    return VGroup(*[lettre(c, fs) for c in f]).arrange(RIGHT, buff=0.12)


class ProbaBinExtremesBase(Notion6e):
    """Toutes les scènes ; la sous-classe ne change que identité et ceinture.
    """

    nom_voix = "stmg-proba-bin-extremes"
    X_F = -1.2
    LARG_F = 9.4
    Y1, Y2, Y3 = -1.45, -2.4, -3.3
    XS = [-5.0 + 1.55 * i for i in range(5)]   # les 5 panneaux
    Y_P, Y_L, Y_N = 1.55, 0.3, -0.3               # panneaux, lettres, nombres

    identite = "Maths — EleveAI"
    ceinture = "bleue"

    def t(self, texte, font_size=40, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.3):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def caser(self, mob, larg=None):
        larg = larg or self.LARG_F
        if mob.width > larg:
            mob.scale_to_fit_width(larg)
        return mob

    def ligne(self, *objs, y=None, x=None, buff=0.18):
        g = self.caser(suite(*objs, buff=buff))
        return g.move_to(P(self.X_F if x is None else x, self.Y1 if y is None else y))

    def page_abonnement(self, voix="09-abonne"):
        """« Entraîne-toi sur » + eleveai.fr encadré, puis « Abonne-toi ! » +
        @eleveai974 (règle du 19/10)."""
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

    # ── la rangée de panneaux et ses lettres ────────────────────────────────

    def rangee(self, etats="ooooo", s=0.85, xs=None, y=None):
        """etats : une lettre par panneau, o = éteint, m = marche, p = panne."""
        xs = xs or self.XS
        y = self.Y_P if y is None else y
        code = {"o": "off", "m": "on", "p": "panne"}
        return VGroup(*[Panneau(s).poser(code[e]).move_to(P(x, y)) for x, e in zip(xs, etats)])

    def changer(self, rang, f):
        """Anime la rangée vers le chemin f (s = panne, e = marche)."""
        anims = []
        for pn, c in zip(rang, f):
            anims += pn.vers("panne" if c == "s" else "on")
        return anims

    def lettres(self, f, fs=38, xs=None):
        xs = xs or self.XS
        return VGroup(*[lettre(c, fs).move_to(P(x, self.Y_L)) for x, c in zip(xs, f)])

    def nombres(self, f, p="0,1", q="0,9", fs=30, xs=None):
        xs = xs or self.XS
        return VGroup(*[Text(p if c == "s" else q, font_size=fs, color=BLEU_NB).move_to(P(x, self.Y_N))
                        for x, c in zip(xs, f)])

    def cadre_chemin(self, lettres):
        return SurroundingRectangle(lettres, color=CHEMIN, buff=0.16, corner_radius=0.12, stroke_width=4)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Loi binomiale", 56, JAUNE_TITRE).to_edge(UP, buff=0.5)
        sous = self.t("les cas extrêmes", 40, BLEU_CALCUL).next_to(titre, DOWN, buff=0.2)
        identite = self.t(self.identite, 28).next_to(sous, DOWN, buff=0.2)
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, -3.05))
        xs = [-3.3 + 1.35 * i for i in range(5)]
        rang = self.rangee("ooooo", 0.7, xs=xs, y=0.15)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), FadeIn(rang), run_time=0.9)
        self.au_mot("cas extrêmes")
        self.play(FadeIn(sous, shift=UP * 0.15), run_time=0.4)
        fs = 34
        cas = [p_egal(0, fs), p_egal(1, fs), self.t("P(X = n − 1)", fs), self.t("P(X = n)", fs)]
        ligne = suite(*cas, buff=0.55)
        self.caser(ligne, 10.5).move_to(P(-0.6, -1.4))
        etats = ["eeeee", "seeee", "sssse", "sssss"]
        for ex, k in (("égale 0", 0), ("0, 1", 1), ("n moins 1", 2), ("moins 1, n", 3)):
            self.au_mot(ex)
            self.play(FadeIn(cas[k], scale=1.5), *self.changer(rang, etats[k]), run_time=0.45)
        self.attendre_voix(marge=1.0)

    # ── 01 : la centrale solaire ────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Les panneaux solaires")
        sol = soleil(1.0).move_to(P(5.6, 2.6))
        rang = self.rangee("ooooo")
        self.au_mot("5 panneaux")
        cinq = self.t("5 panneaux solaires", 38).move_to(P(-1.9, self.Y_L))
        self.play(FadeIn(sol, scale=0.5), LaggedStart(*[FadeIn(p, shift=UP * 0.3) for p in rang], lag_ratio=0.15),
                  FadeIn(cinq[0], scale=1.8), run_time=1.0)
        self.play(*self.changer(rang, "eeeee"), FadeIn(cinq[1:]), Rotate(sol[1], PI / 4), run_time=0.6)
        self.au_mot("en panne")
        self.play(*rang[2].vers("panne"), run_time=0.4)
        self.au_mot("0,1")
        pb = suite(self.t("panne :", 40, ROUGE_S), self.t("0,1", 56, JAUNE_TITRE), buff=0.25)
        pb.move_to(P(-3.6, -0.75))
        self.play(FadeIn(pb[0]), FadeIn(pb[1], scale=1.8), run_time=0.5)
        self.insister(pb[1], 0.25)
        self.au_mot("indépendamment")
        ind = self.t("chacun indépendamment", 32, VERT_OK).move_to(P(1.6, -0.75))
        self.play(FadeIn(ind, shift=UP * 0.15), *rang[2].vers("on"), run_time=0.5)
        self.au_mot("X compte")
        xc = self.t("X : le nombre de pannes", 38).move_to(P(self.X_F, -1.85))
        self.play(FadeIn(xc, shift=UP * 0.15), run_time=0.6)
        self.au_mot("X suit B")
        loi = suite(self.t("X suit", 44), self.t("B(5 ; 0,1)", 48, BLEU_CALCUL), buff=0.25).move_to(
            P(self.X_F, -3.0))
        self.play(FadeIn(loi[0]), Write(loi[1]), run_time=0.9)
        cadre = SurroundingRectangle(loi, color=BLEU_CALCUL, buff=0.18, stroke_width=3)
        self.play(Create(cadre), run_time=0.4)
        self.attendre_voix()

    # ── 02 / 03 : un seul chemin (aucune panne ; les 5 en panne) ─────────────

    def ecran_un_seul(self, cle, titre, f, mot_debut, mot_lettres, k, base, ex_puiss, res, ex_res, approx):
        """Écran à UN chemin : la rangée prend l'état f, les 5 lettres s'écrivent,
        le chemin s'encadre en orange, puis P(X = k) = base⁵ (≈ / =) res."""
        self.clear()
        self.add_mascotte()
        self.dire(cle)
        rang = self.rangee("ooooo")
        self.add(rang)
        self.titre_ecran(titre)
        self.au_mot(mot_debut)
        self.play(LaggedStart(*[AnimationGroup(*pn.vers("panne" if c == "s" else "on"))
                                for pn, c in zip(rang, f)], lag_ratio=0.18), run_time=1.0)
        self.au_mot("un seul chemin")
        seul = self.t("un seul chemin", 40, CHEMIN).move_to(P(4.4, self.Y_P))
        self.play(FadeIn(seul, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot(mot_lettres)
        le = self.lettres(f)
        self.play(LaggedStart(*[FadeIn(l, scale=1.6) for l in le], lag_ratio=0.15), run_time=0.8)
        cad = self.cadre_chemin(le)
        self.play(Create(cad), run_time=0.4)
        fs = 46
        px, eg = p_egal(k, fs), self.t("=", fs)
        pw = puissance(base, "5", fs + 4, BLEU_NB)
        eg2 = self.t("≈" if approx else "=", fs)
        r = self.t(res, fs + 6, VERT_OK)
        l1 = self.ligne(px, eg, pw, eg2, r, y=self.Y1 - 0.35, buff=0.28)
        self.au_mot(f"P de X égale {k}")
        self.play(FadeIn(VGroup(px, eg), shift=UP * 0.15), run_time=0.5)
        self.au_mot(ex_puiss)
        nb = self.nombres(f)
        self.play(LaggedStart(*[FadeIn(n, scale=1.5) for n in nb], lag_ratio=0.1), FadeIn(pw[0]), run_time=0.7)
        self.play(FadeIn(pw[1], scale=2.0), Indicate(nb, color=JAUNE_TITRE, scale_factor=1.15), run_time=0.5)
        self.au_mot(ex_res)
        self.play(FadeIn(eg2), FadeIn(r, scale=1.8), run_time=0.5)
        cr = SurroundingRectangle(r, color=VERT_OK, buff=0.1, stroke_width=4)
        self.play(Create(cr), run_time=0.3)
        self.insister(VGroup(r, cr))
        self.attendre_voix()

    def ecran_zero(self):
        self.ecran_un_seul("02-zero", "Aucune panne", "eeeee", "Aucune panne", "cinq échecs", 0, "0,9",
                           "0,9 puissance 5", "0,590", "environ 0,590", True)

    def ecran_tout(self):
        self.ecran_un_seul("03-tout", "Les 5 en panne", "sssss", "Les 5 en panne", "cinq succès", 5, "0,1",
                           "0,1 puissance 5", "0,00001", "soit 0,00001", False)

    # ── 04 : une panne, 5 chemins ───────────────────────────────────────────

    XS4 = [-5.6 + 1.45 * i for i in range(5)]     # rangée décalée : la liste à droite

    def balade(self, rang, le, chemins, liste_x=3.6, y0=1.85, pas=0.48, rt=0.55):
        """L'élément unique (panne, ou panneau qui marche) se déplace sur chacun
        des 5 panneaux ; chaque position s'empile dans la liste des chemins."""
        rangs = VGroup()
        for i, f in enumerate(chemins):
            nouv = self.lettres(f, xs=self.XS4)
            m = mini_chemin(f, 32).move_to(P(liste_x, y0 - i * pas))
            puce = Dot(radius=0.08, color=CHEMIN).next_to(m, LEFT, buff=0.22)
            diff = [i for i in range(5) if le[i].text != nouv[i].text]
            self.play(*self.changer(rang, f), *[FadeOut(le[i], scale=0.6) for i in diff],
                      *[FadeIn(nouv[i], scale=1.5) for i in diff], run_time=rt * 0.5)
            for i in diff:
                le.submobjects[i] = nouv[i]
            self.play(TransformFromCopy(le, m), FadeIn(puce, scale=2), run_time=rt * 0.5)
            rangs.add(VGroup(puce, m))
        return rangs

    def ecran_un(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-un")
        rang = self.rangee("mmmmm", xs=self.XS4)
        self.add(rang)
        self.titre_ecran("Exactement une panne")
        un = ["seeee", "eseee", "eesee", "eeese", "eeees"]
        self.au_mot("Exactement une panne")
        le = self.lettres(un[0], xs=self.XS4)
        self.play(*self.changer(rang, un[0]), FadeIn(le, scale=1.4), run_time=0.6)
        self.au_mot("5 chemins")
        titre_l = self.t("5 chemins", 40, CHEMIN).move_to(P(3.7, 2.45))
        self.play(FadeIn(titre_l, scale=1.6), run_time=0.4)
        liste = self.balade(rang, le, un)
        self.play(Indicate(titre_l, color=CHEMIN, scale_factor=1.3), run_time=0.5)
        fs = 44
        px, eg, cinq, x1, p1, x2 = (p_egal(1, fs), self.t("=", fs), self.t("5", fs + 6, CHEMIN), self.t("×", fs),
                                    self.t("0,1", fs, BLEU_NB), self.t("×", fs))
        p9 = puissance("0,9", "4", fs + 2, BLEU_NB)
        eg2, r = self.t("≈", fs), self.t("0,328", fs + 6, VERT_OK)
        l1 = self.ligne(px, eg, cinq, x1, p1, x2, p9, y=self.Y1 - 0.2, buff=0.25)
        l2 = suite(eg2, r, buff=0.25)
        l2.shift(P(eg.get_center()[0] - eg2.get_center()[0], self.Y2 - 0.3 - l2.get_center()[1]))
        self.au_mot("P de X égale 1")
        self.play(FadeIn(VGroup(px, eg), shift=UP * 0.15), run_time=0.5)
        self.au_mot("5 fois")
        self.play(TransformFromCopy(titre_l[0], cinq), FadeIn(x1), Indicate(liste, color=CHEMIN), run_time=0.6)
        self.au_mot("0,1 fois")
        nb = self.nombres(un[-1], xs=self.XS4)
        self.play(FadeIn(nb[4], scale=1.6), FadeIn(p1, scale=1.5),
                  FadeIn(x2), run_time=0.5)
        self.au_mot("0,9 puissance 4")
        self.play(LaggedStart(*[FadeIn(n, scale=1.5) for n in nb[:4]], lag_ratio=0.1), FadeIn(p9[0]), run_time=0.6)
        self.play(FadeIn(p9[1], scale=2.0), run_time=0.3)
        self.au_mot("Environ 0,328")
        self.play(FadeIn(eg2), FadeIn(r, scale=1.8), run_time=0.5)
        cr = SurroundingRectangle(r, color=VERT_OK, buff=0.1, stroke_width=4)
        self.play(Create(cr), run_time=0.3)
        self.insister(VGroup(r, cr))
        self.attendre_voix()

    # ── 05 : le sens ────────────────────────────────────────────────────────

    def jauge(self, y, x0=-1.3, larg=5.0):
        fond = RoundedRectangle(width=larg, height=0.5, corner_radius=0.1, fill_color="#1E293B", fill_opacity=1,
                                stroke_color=GREY_B, stroke_width=2).move_to(P(x0 + larg / 2, y))
        mil = DashedLine(P(x0 + larg / 2, y + 0.42), P(x0 + larg / 2, y - 0.42), color=WHITE, stroke_width=3)
        return fond, mil

    def remplir(self, fond, part, color):
        r = Rectangle(width=max(fond.width * part, 0.04), height=fond.height - 0.08, fill_color=color,
                      fill_opacity=1, stroke_width=0)
        r.move_to(fond.get_left() + RIGHT * (0.04 + r.width / 2))
        return r

    def ecran_sens(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-sens")
        self.titre_ecran("Ce que ça veut dire")
        xs = [-6.0 + 0.95 * i for i in range(5)]
        ra = self.rangee("mmmmm", 0.55, xs=xs, y=1.3)
        rb = self.rangee("ppppp", 0.55, xs=xs, y=-1.55)
        fa, ma = self.jauge(1.35)
        fb, mb = self.jauge(-1.5)
        moitie = self.t("la moitié", 26).next_to(ma, UP, buff=0.08)
        self.play(FadeIn(ra), FadeIn(VGroup(fa, ma)), run_time=0.5)
        self.au_mot("la moitié")
        self.play(FadeIn(moitie, shift=DOWN * 0.1), Indicate(ma), run_time=0.4)
        ga = self.remplir(fa, 0.59, VERT_OK)
        rappel = self.t("0,590", 30, VERT_OK).next_to(fa, RIGHT, buff=0.25)
        self.play(GrowFromEdge(ga, LEFT), run_time=0.8)
        self.au_mot("aucune panne")
        ta = self.t("plus de la moitié des années : aucune panne", 32, VERT_OK).move_to(P(-0.5, 0.45))
        self.play(FadeIn(ta, shift=UP * 0.15), FadeIn(rappel), run_time=0.5)
        self.au_mot("presque jamais")
        self.play(FadeIn(rb), FadeIn(VGroup(fb, mb)), run_time=0.4)
        gb = self.remplir(fb, 0.0, ROUGE_ERREUR)
        tb = self.t("presque jamais les cinq", 34, ROUGE_S).move_to(P(-0.5, -2.4))
        self.play(FadeIn(gb), FadeIn(tb, shift=UP * 0.15), run_time=0.5)
        self.play(Wiggle(rb), run_time=0.6)
        self.attendre_voix()

    # ── 06 : le piège : oublier le 5 ────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        rang = self.rangee("pmmmm", xs=self.XS4)
        le = self.lettres("seeee", xs=self.XS4)
        self.add(rang, le)
        self.titre_ecran("Le piège")
        fs = 44
        self.au_mot("oublier le 5")
        ou = self.t("Oublier le", 40, ROUGE_ERREUR)
        cinq = self.t("5", 54, CHEMIN)
        l0 = suite(ou, cinq, buff=0.25).move_to(P(3.7, 2.2))
        self.play(FadeIn(ou, shift=UP * 0.15), FadeIn(cinq, scale=1.6), run_time=0.5)
        croix = VGroup(Line(cinq.get_corner(UL), cinq.get_corner(DR)), Line(cinq.get_corner(DL), cinq.get_corner(UR)))
        croix.set_stroke(ROUGE_ERREUR, 7).scale(1.4)
        self.play(Create(croix), run_time=0.4)
        self.au_mot("P de X égale 1")
        px = p_egal(1, 40).move_to(P(3.7, 1.25))
        self.play(FadeIn(px, shift=UP * 0.15), run_time=0.4)
        p1, x1 = self.t("0,1", fs, BLEU_NB), self.t("×", fs)
        p9 = puissance("0,9", "4", fs + 2, BLEU_NB)
        seul = self.t(": un seul chemin", 40, ROUGE_ERREUR)
        l1 = self.ligne(p1, x1, p9, seul, y=self.Y1 - 0.4, buff=0.25)
        nb = self.nombres("seeee", xs=self.XS4)
        self.au_mot("0,1 fois")
        self.play(FadeIn(nb[0], scale=1.5), FadeIn(p1, scale=1.5), FadeIn(x1), run_time=0.5)
        self.au_mot("0,9 puissance 4")
        self.play(LaggedStart(*[FadeIn(n, scale=1.4) for n in nb[1:]], lag_ratio=0.1), FadeIn(p9), run_time=0.6)
        self.au_mot("un seul chemin")
        cad = self.cadre_chemin(le)
        self.play(FadeIn(seul, shift=LEFT * 0.15), Create(cad), run_time=0.5)
        self.insister(seul, 0.25)
        self.attendre_voix()

    # ── 07 : défi P(X = 4) ──────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 40, JAUNE_TITRE).to_edge(UP)))
        rang = self.rangee("ooooo")
        self.play(FadeIn(rang), run_time=0.5)
        self.au_mot("Calcule")
        q = self.ligne(self.t("Calcule", 46), p_egal(4, 52, ORANGE_RETENUE), y=self.Y1 + 0.3, buff=0.3)
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.5)
        self.insister(q[1], 0.25)
        self.au_mot("Mets pause")
        pause = self.t("Mets pause, et cherche !", 40, ORANGE_RETENUE).move_to(P(self.X_F, self.Y2 - 0.3))
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        quatre = ["essss", "sesss", "ssess", "ssses", "sssse"]
        rang = self.rangee("ooooo", xs=self.XS4)
        self.add(rang)
        self.titre_ecran("Correction")
        self.au_mot("5 chemins")
        titre_l = self.t("5 chemins", 40, CHEMIN).move_to(P(3.7, 2.45))
        le = self.lettres(quatre[0], xs=self.XS4)
        self.play(FadeIn(titre_l, scale=1.6), *self.changer(rang, quatre[0]), FadeIn(le, scale=1.4), run_time=0.6)
        self.au_mot("le panneau qui marche")
        liste = self.balade(rang, le, quatre, rt=0.6)
        fs = 42
        px, eg, cinq, x1 = p_egal(4, fs), self.t("=", fs), self.t("5", fs + 6, CHEMIN), self.t("×", fs)
        p1 = puissance("0,1", "4", fs + 2, BLEU_NB)
        x2, p9 = self.t("×", fs), self.t("0,9", fs, BLEU_NB)
        eg2, r = self.t("=", fs), self.t("0,00045", fs + 6, VERT_OK)
        l1 = self.ligne(px, eg, cinq, x1, p1, x2, p9, y=self.Y1 - 0.2, buff=0.25)
        l2 = suite(eg2, r, buff=0.25)
        l2.shift(P(eg.get_center()[0] - eg2.get_center()[0], self.Y2 - 0.3 - l2.get_center()[1]))
        nb = self.nombres(quatre[-1], xs=self.XS4)
        self.au_mot("5 fois")
        self.play(FadeIn(VGroup(px, eg), shift=UP * 0.15), TransformFromCopy(titre_l[0], cinq), FadeIn(x1),
                  Indicate(liste, color=CHEMIN), run_time=0.6)
        self.au_mot("0,1 puissance 4")
        self.play(LaggedStart(*[FadeIn(n, scale=1.5) for n in nb[:4]], lag_ratio=0.1), FadeIn(p1[0]), run_time=0.6)
        self.play(FadeIn(p1[1], scale=2.0), run_time=0.3)
        self.au_mot("fois 0,9")
        self.play(FadeIn(x2), FadeIn(nb[4], scale=1.5), FadeIn(p9, scale=1.5), run_time=0.5)
        self.au_mot("0,00045")
        self.play(FadeIn(eg2), FadeIn(r, scale=1.8), run_time=0.5)
        cr = SurroundingRectangle(r, color=VERT_OK, buff=0.1, stroke_width=4)
        self.play(Create(cr), run_time=0.3)
        self.insister(VGroup(r, cr))
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 46
        lignes = [
            (p_egal(0, fs), [self.t("=", fs), puissance("(1 − p)", "n", fs, BLEU_NB)]),
            (self.t("P(X = n)", fs), [self.t("=", fs), puissance("p", "n", fs + 4, BLEU_NB)]),
            (p_egal(1, fs), [self.t("=", fs), self.t("n", fs + 4, CHEMIN), self.t("×", fs),
                             self.t("p", fs + 4, BLEU_NB), self.t("×", fs),
                             puissance("(1 − p)", "n − 1", fs, BLEU_NB)]),
            (self.t("P(X = n − 1)", fs), [self.t(": de même", fs, CHEMIN)]),
        ]
        groupes = []
        for k, (gauche, droite) in enumerate(lignes):
            c = self.coche(VERT_OK, 0.24)
            g = suite(c, gauche, *droite, buff=0.25)
            g.move_to(P(0, 0)).to_edge(LEFT, buff=1.0).shift(UP * (2.1 - 1.35 * k))
            groupes.append(g)
        etapes = [("P de X égale 0", [("1 moins p, puissance n", None)]),
                  ("P de X égale n", [("p puissance n", None)]),
                  ("P de X égale 1", [("n fois p fois", 6), ("moins p puissance n moins 1", None)]),
                  ("P de X égale n moins 1", [("de même", None)])]
        for g, (ex1, suite_ex) in zip(groupes, etapes):
            self.au_mot(ex1)
            self.play(Create(g[0]), FadeIn(g[1], shift=RIGHT * 0.2), run_time=0.5)
            debut = 2
            for ex2, fin in suite_ex:
                self.au_mot(ex2)
                morceaux = g[debut:fin]
                self.play(LaggedStart(*[FadeIn(m, shift=UP * 0.1) for m in morceaux], lag_ratio=0.25),
                          run_time=0.8)
                debut = fin
        self.insister(groupes[2][3], 0.25)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_zero()
        self.ecran_tout()
        self.ecran_un()
        self.ecran_sens()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")


class ProbaBinExtremesSTMG(ProbaBinExtremesBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "bleue"
