# proba2_arbre_pondere.py
# EleveAI — Maths 2de — série « Probabilités », épisode 9 : LIRE et CONSTRUIRE
# un ARBRE PONDÉRÉ (micro : proba_arbre_pondere), AVEC VOIX.
# Paysage 16:9, CEINTURE BLEUE. Short jumeau : proba2_arbre_pondere_short.py
# (ceinture orange : « 90 % des Réunionnais finissent… donc 90 % des
# finisseurs sont réunionnais ? »).
#
# Situation : le trail de Cilaos. R = le coureur est réunionnais (0,7) ;
# F = il finit la course (0,9 après R, 0,8 après R barre).
#
# Écrans : 00 garde · 01 le trail (coureurs, 70 %, 90 %, 80 %) · 02 premier
# niveau R / R̄ (0,7 ; 0,3 ; somme 1) · 03 second niveau (0,9 ; 0,1 ; 0,8 ;
# 0,2) · 04 lire : P_R(F) = 0,9 (la branche R suivie, le reste s'estompe) ·
# 05 construire : sans condition, puis « parmi » · 06 le piège : 0,8 posé
# après R, barré, déplacé après R̄ · 07 défi P_R̄(F̄) · 07b correction
# 1 − 0,8 = 0,2 · 08 ce que tu as appris · 09 fin.
#
# ⭐ Canvas du coach repris : `arbre_proba` (lib/canvas/ArbreProbabilitesCanvas.tsx,
# l'arbre de la banque probabilites-conditionnelles.bank.ts : R / R̄ puis F / F̄,
# probabilités décimales) — carte blanche, départ sombre, branches gris ardoise
# #475569, probabilités en BLEU #2563eb au milieu des branches, étiquette d'un
# nœud intérieur AU-DESSUS du nœud, étiquette d'une feuille à DROITE ; la barre
# du contraire au-dessus de la lettre.
#
# Voix : manim/voix/seconde-proba-arbre-pondere.json (débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/seconde/proba2_arbre_pondere.py Proba2ArbrePondere -o eleveai-maths-seconde-proba-arbre-pondere --media_dir manim/scripts/seconde/media
# Puis copier le mp4 dans manim/sorties/seconde/maths/probabilites/09-arbre-pondere/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

# Les couleurs du canvas du coach.
ENCRE = "#0F172A"         # slate-900 : départ, étiquettes
BRANCHE = "#475569"       # slate-600 : les branches
PROBA = "#2563EB"         # blue-600 : les probabilités des branches
BORD_CARTE = "#E2E8F0"    # slate-200
CHEMIN = "#F59E0B"        # la branche suivie (orange)
ROUGE_P = "#DC2626"       # le nombre mal placé
REUNION = "#F97316"       # les coureurs réunionnais
AUTRES = "#A78BFA"        # les autres coureurs (violet)
PROBA_CLAIR = "#60A5FA"   # le bleu des probabilités, éclairci pour le fond noir
ETEINT = 0.2


class NotionSeconde9(Notion6e):
    identite = "Maths 2de — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les écritures (sans LaTeX) ──────────────────────────────────────────────

def lettre(l, fs=40, color=WHITE, barre=False, bold=True):
    """Une lettre d'événement, avec sa barre si c'est le contraire (R̄, F̄)."""
    t = Text(l, font_size=fs, color=color, weight=BOLD if bold else NORMAL)
    if not barre:
        return VGroup(t)
    y = t.get_top()[1] + fs * 0.0035
    b = Line(P(t.get_left()[0] + 0.01, y), P(t.get_right()[0] - 0.01, y), color=color,
             stroke_width=max(2.0, fs / 12))
    return VGroup(t, b)


def nota(texte, fs=40, color=WHITE, sub=None, sub_barre=False, barres=()):
    """Une notation en UN Text : « P(F) » ; `sub` glisse un indice après le P
    (P_R(F)) ; `barres` = indices des caractères (sans les espaces) à surligner."""
    T = Text(texte, font_size=fs, color=color)
    g = VGroup(T)
    for i in barres:
        c = T[i]
        y = c.get_top()[1] + fs * 0.003
        g.add(Line(P(c.get_left()[0] + 0.01, y), P(c.get_right()[0] - 0.01, y), color=color,
                   stroke_width=max(2.0, fs / 13)))
    if sub is not None:
        s = lettre(sub, int(fs * 0.62), color, sub_barre, bold=False)
        s.move_to(P(T[0].get_right()[0] + 0.03 + s.width / 2, T[0].get_bottom()[1] + 0.02))
        reste = VGroup(*T[1:], *g[1:])
        reste.shift(RIGHT * (s.width + 0.04))
        g.add(s)
    return g


def p_rf(fs=40, color=WHITE, r_barre=False, f_barre=False):
    """P_R(F), P_R̄(F̄)…"""
    return nota("P(F)", fs, color, sub="R", sub_barre=r_barre, barres=(2,) if f_barre else ())


# ── les coureurs du trail ───────────────────────────────────────────────────

def coureur(color, s=1.0):
    """Un coureur en pleine foulée (tête, buste penché, bras, jambes)."""
    tete = Circle(radius=0.13, fill_color=color, fill_opacity=1, stroke_width=0).move_to(P(0.08, 0.5))
    buste = Line(P(0.04, 0.34), P(-0.06, -0.05), stroke_width=9, color=color)
    bras = VGroup(Line(P(0.02, 0.26), P(0.24, 0.1), stroke_width=6, color=color),
                  Line(P(0.02, 0.26), P(-0.2, 0.14), stroke_width=6, color=color))
    jambes = VGroup(Line(P(-0.06, -0.05), P(0.18, -0.3), stroke_width=7, color=color),
                    Line(P(0.18, -0.3), P(0.14, -0.55), stroke_width=7, color=color),
                    Line(P(-0.06, -0.05), P(-0.28, -0.32), stroke_width=7, color=color),
                    Line(P(-0.28, -0.32), P(-0.42, -0.24), stroke_width=7, color=color))
    return VGroup(jambes, bras, buste, tete).scale(s)


def montagnes(larg=6.0, haut=1.6):
    """Le cirque de Cilaos : des pics verts, un sommet plus haut."""
    pts = [P(-larg / 2, 0), P(-larg * 0.36, haut * 0.55), P(-larg * 0.26, haut * 0.35),
           P(-larg * 0.08, haut), P(larg * 0.06, haut * 0.5), P(larg * 0.2, haut * 0.8),
           P(larg * 0.36, haut * 0.3), P(larg / 2, 0)]
    fond = Polygon(*pts, fill_color="#166534", fill_opacity=1, stroke_color="#22C55E", stroke_width=2)
    neige = Polygon(P(-larg * 0.08, haut), P(-larg * 0.13, haut * 0.82), P(-larg * 0.03, haut * 0.82),
                    fill_color=WHITE, fill_opacity=0.85, stroke_width=0)
    return VGroup(fond, neige)


def arche(larg=1.6, haut=1.4):
    """L'arche d'arrivée : deux poteaux, une banderole à damier."""
    g = Line(P(-larg / 2, 0), P(-larg / 2, haut), stroke_width=7, color=WHITE)
    d = Line(P(larg / 2, 0), P(larg / 2, haut), stroke_width=7, color=WHITE)
    n = 8
    w = larg / n
    dam = VGroup(*[Rectangle(width=w, height=0.18, stroke_width=0, fill_opacity=1,
                             fill_color=WHITE if (k + r) % 2 == 0 else BLACK)
                   .move_to(P(-larg / 2 + w * (k + 0.5), haut - 0.09 - 0.18 * r))
                   for k in range(n) for r in range(2)])
    return VGroup(g, d, dam)


# ── l'ARBRE pondéré du coach (arbre_proba) : R / R̄, puis F / F̄ ──────────────

FEUILLES = [("R", "F"), ("R", "Fb"), ("Rb", "F"), ("Rb", "Fb")]
VALEURS = {("R",): "0,7", ("Rb",): "0,3", ("R", "F"): "0,9", ("R", "Fb"): "0,1",
           ("Rb", "F"): "0,8", ("Rb", "Fb"): "0,2"}


class ArbreRF(VGroup):
    """La carte blanche du coach. Un nœud = un préfixe (tuple) ; la branche d'un
    préfixe va de son parent à lui. Seule la carte est dans le groupe : la scène
    fait apparaître les morceaux un à un (depart, branches[pre], lab[pre],
    nombre(pre))."""

    def __init__(self, dx=2.4, pas=0.95, fs=34, fs_p=30, centre=ORIGIN, lab_bas=False):
        super().__init__()
        self.fs_p = fs_p
        pos = {(): P(0, 0)}
        g = pas * 0.22
        for k, f in enumerate(FEUILLES):
            pos[f] = P(2 * dx, (1.5 - k) * pas + (g if k < 2 else -g))
        for a in ("R", "Rb"):
            pos[(a,)] = P(dx, (pos[(a, "F")][1] + pos[(a, "Fb")][1]) / 2)
        self.pos = pos
        self.depart = Dot(P(0, 0), radius=0.08, color=ENCRE)
        self.branches, self.lab = {}, {}
        for pre, pt in pos.items():
            if not pre:
                continue
            self.branches[pre] = Line(pos[pre[:-1]], pt, color=BRANCHE, stroke_width=4)
            nom = pre[-1]
            mot = lettre(nom[0], fs, ENCRE, barre=nom.endswith("b"))
            if len(pre) == 1:
                # R au-dessus du nœud ; R̄ dessous si lab_bas (arbre serré du short).
                bas = lab_bas and pre == ("Rb",)
                mot.next_to(pt, DOWN if bas else UP, buff=0.14)
            else:
                mot.next_to(pt, RIGHT, buff=0.2)
            self.lab[pre] = mot
        self.nombres = {}
        tout = VGroup(self.depart, *self.branches.values(), *self.lab.values(),
                      *[self.nombre(p, v) for p, v in VALEURS.items()])
        self.nombres = {}
        self.carte = RoundedRectangle(width=tout.width + 0.7, height=tout.height + 0.5, corner_radius=0.2,
                                      fill_color=WHITE, fill_opacity=1, stroke_color=BORD_CARTE, stroke_width=2)
        self.carte.move_to(tout)
        self.add(self.carte, self.depart, *self.branches.values(), *self.lab.values())
        self.shift(centre - self.carte.get_center())

    def point(self, pre):
        return self.branches[pre].get_end() if pre else self.depart.get_center()

    def place(self, pre, t):
        """Pose t contre le milieu de la branche (au-dessus si elle monte, dessous sinon)."""
        br = self.branches[pre]
        u, v = br.get_start(), br.get_end()
        d = v - u
        n = np.array([-d[1], d[0], 0.0])
        n = n / np.linalg.norm(n)
        if (n[1] < 0) == (v[1] >= u[1]):
            n = -n
        demi = abs(n[0]) * t.width / 2 + abs(n[1]) * t.height / 2
        t.move_to((u + v) / 2 + n * (demi + 0.05))
        return t

    def nombre(self, pre, texte=None, color=PROBA):
        t = Text(texte or VALEURS[pre], font_size=self.fs_p, color=color, weight=BOLD)
        self.place(pre, t)
        self.nombres[pre] = t
        return t

    @staticmethod
    def chemin(f):
        return [f[:1], f]

    def etat(self, allumes=(), op=ETEINT, rien=False, couleur=CHEMIN):
        """Allume les branches `allumes` ; estompe le reste (rien=True : tout normal)."""
        allumes = set(allumes)
        anims = []
        for pre, br in self.branches.items():
            if rien:
                anims.append(br.animate.set_stroke(BRANCHE, 4, opacity=1))
            elif pre in allumes:
                anims.append(br.animate.set_stroke(couleur, 10, opacity=1))
            else:
                anims.append(br.animate.set_stroke(BRANCHE, 4, opacity=op))
        for dico in (self.lab, self.nombres):
            for pre, m in dico.items():
                on = rien or pre in allumes
                anims.append(m.animate.set_opacity(1 if on else op + 0.1))
        return anims

    def complet(self, sauf=()):
        """Toutes les branches, étiquettes et nombres (sauf ceux de `sauf`)."""
        self.add(self.depart, *self.branches.values(), *self.lab.values())
        for p in VALEURS:
            if p not in sauf:
                self.add(self.nombre(p))
        return self


# ── la vidéo ────────────────────────────────────────────────────────────────

C_ARBRE = P(-2.7, -0.4)   # le centre de la carte de l'arbre
X_D = 1.6                 # le bord gauche de la zone de droite


class Proba2ArbrePondere(NotionSeconde9):
    nom_voix = "seconde-proba-arbre-pondere"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.2):
        return VGroup(*[m if isinstance(m, Mobject) else self.t(m, font_size, c)
                        for m, c in morceaux]).arrange(RIGHT, buff=buff)

    def insister(self, mob, run_time=0.35, k=1.5, chacun=False):
        """Agrandir puis rétrécir ; chacun=True : chaque morceau autour de son propre centre."""
        ms = list(mob) if chacun else [mob]
        self.play(*[m.animate.scale(k) for m in ms], run_time=run_time)
        self.play(*[m.animate.scale(1 / k) for m in ms], run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR, sw=7):
        return Line(mob.get_corner(DL) + P(-0.08, -0.04), mob.get_corner(UR) + P(0.08, 0.04),
                    stroke_width=sw, color=color)

    def a_droite(self, mob, y, x0=X_D):
        return mob.move_to(P(0, y)).align_to(P(x0, 0), LEFT)

    def legende(self, lettre_, mots, color=WHITE, fs=34):
        """« R : réunionnais » (la lettre comme sur l'arbre)."""
        return VGroup(lettre(lettre_, fs + 4, color), self.t(":", fs), self.t(mots, fs)).arrange(RIGHT, buff=0.18)

    def arbre_complet(self, sauf=()):
        return ArbreRF(centre=C_ARBRE).complet(sauf)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("L'arbre pondéré", 58, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.75))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=1.0)
        a = ArbreRF(dx=1.5, pas=0.55, fs=22, fs_p=19, centre=P(-2.6, 0.0))
        self.au_mot("lire")
        self.play(FadeIn(a.carte), FadeIn(a.depart), run_time=0.3)
        self.play(*[Create(a.branches[p]) for p in [("R",), ("Rb",)]],
                  *[FadeIn(a.lab[p]) for p in [("R",), ("Rb",)]], run_time=0.4)
        self.play(*[Create(a.branches[f]) for f in FEUILLES], *[FadeIn(a.lab[f]) for f in FEUILLES], run_time=0.4)
        mots = VGroup(self.t("lire", 46, BLEU_CALCUL), self.t("et", 40), self.t("construire", 46, VERT_OK))
        mots.arrange(RIGHT, buff=0.32).move_to(P(2.6, 0.0))
        self.play(FadeIn(mots[0], shift=UP * 0.2), run_time=0.4)
        self.au_mot("construire")
        self.play(FadeIn(mots[1:], shift=UP * 0.2), run_time=0.4)
        self.insister(mots[2], 0.3, 1.25)
        self.attendre_voix(marge=1.0)

    # ── 01 : le trail de Cilaos ─────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Le trail de Cilaos")
        mt = montagnes(5.6, 1.4).move_to(P(-3.6, 1.6))
        ar = arche(1.2, 1.2).move_to(P(-0.4, 1.5))
        self.play(FadeIn(mt, shift=UP * 0.2), FadeIn(ar), run_time=0.6)
        # dix coureurs : 7 orange (de La Réunion), 3 bleus (les autres)
        cs = VGroup(*[coureur(REUNION if k < 7 else AUTRES, 0.7) for k in range(10)])
        cs.arrange(RIGHT, buff=0.12).move_to(P(-3.3, -0.35))
        cs[7:].shift(RIGHT * 0.35)
        self.play(LaggedStart(*[FadeIn(c, shift=RIGHT * 0.4) for c in cs], lag_ratio=0.08), run_time=1.0)
        self.au_mot("70 %")
        acc_r = Brace(cs[:7], DOWN, color=REUNION)
        l_r = self.t("La Réunion", 28, REUNION).next_to(acc_r, DOWN, buff=0.1)
        self.play(GrowFromCenter(acc_r), FadeIn(l_r), *[c.animate.scale(1.12) for c in cs[:7]], run_time=0.5)
        x1 = self.ligne([("70 %", REUNION), ("de La Réunion", WHITE)], 34, 0.2)
        self.a_droite(x1, 1.7, 1.0)
        self.play(FadeIn(x1, shift=RIGHT * 0.2), run_time=0.4)
        self.insister(x1[0], 0.3, 1.3)
        self.au_mot("Parmi eux")
        cad = SurroundingRectangle(VGroup(cs[:7], l_r), color=REUNION, buff=0.12)
        self.play(Create(cad), cs[7:].animate.set_opacity(0.3), run_time=0.4)
        self.au_mot("90 %")
        x2 = VGroup(self.t("Parmi eux :", 34, REUNION),
                    self.ligne([("90 %", JAUNE_TITRE), ("finissent", WHITE)], 34, 0.2)).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        self.a_droite(x2, 0.45, 1.0)
        self.play(FadeIn(x2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Parmi les autres")
        acc_a = Brace(cs[7:], DOWN, color=AUTRES)
        l_a = self.t("les autres", 28, AUTRES).next_to(acc_a, DOWN, buff=0.1)
        cad2 = SurroundingRectangle(VGroup(cs[7:], l_a), color=AUTRES, buff=0.12)
        self.play(FadeOut(cad), cs[7:].animate.set_opacity(1), cs[:7].animate.set_opacity(0.3),
                  GrowFromCenter(acc_a), FadeIn(l_a), Create(cad2), run_time=0.5)
        self.au_mot("80 %")
        x3 = VGroup(self.t("Parmi les autres :", 34, AUTRES),
                    self.ligne([("80 %", JAUNE_TITRE), ("finissent", WHITE)], 34, 0.2)).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        self.a_droite(x3, -1.05, 1.0)
        self.play(FadeIn(x3, shift=RIGHT * 0.2), run_time=0.4)
        self.play(cs[:7].animate.set_opacity(1), FadeOut(cad2), run_time=0.3)
        self.insister(VGroup(x2[1][0], x3[1][0]), 0.3, 1.3, chacun=True)
        self.attendre_voix()

    # ── 02 : premier niveau ─────────────────────────────────────────────────

    def ecran_premier(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-premier")
        self.titre_ecran("Premier niveau")
        a = ArbreRF(centre=C_ARBRE)
        self.play(FadeIn(a.carte), FadeIn(a.depart, scale=0.5), run_time=0.5)
        self.au_mot("R, réunionnais")
        self.play(Create(a.branches[("R",)]), run_time=0.4)
        self.play(FadeIn(a.lab[("R",)], scale=0.6), run_time=0.25)
        leg = self.legende("R", "réunionnais", REUNION)
        self.a_droite(leg, 1.5)
        self.play(FadeIn(leg, shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("0,7")
        n1 = a.nombre(("R",))
        self.play(FadeIn(n1, scale=0.4), run_time=0.35)
        self.insister(n1, 0.25, 1.5)
        self.au_mot("et R barre")
        self.play(Create(a.branches[("Rb",)]), run_time=0.4)
        self.play(FadeIn(a.lab[("Rb",)], scale=0.6), run_time=0.25)
        self.au_mot("0,3")
        n2 = a.nombre(("Rb",))
        self.play(FadeIn(n2, scale=0.4), run_time=0.35)
        self.insister(n2, 0.25, 1.5)
        self.au_mot("Les deux branches")
        self.play(*self.colorer(a, [("R",), ("Rb",)], CHEMIN), run_time=0.4)
        s = self.ligne([("0,7", PROBA_CLAIR), ("+", WHITE), ("0,3", PROBA_CLAIR), ("=", WHITE), ("1", VERT_OK)], 48, 0.25)
        self.a_droite(s, 0.0)
        self.play(TransformFromCopy(n1, s[0]), FadeIn(s[1]), TransformFromCopy(n2, s[2]), run_time=0.6)
        self.au_mot("font 1")
        self.play(FadeIn(s[3:], scale=0.5), run_time=0.35)
        self.play(Create(SurroundingRectangle(s[4], color=VERT_OK, buff=0.12)), run_time=0.3)
        self.insister(s[4], 0.3)
        self.attendre_voix()

    # ── 03 : second niveau ──────────────────────────────────────────────────

    def ecran_second(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-second")
        self.titre_ecran("Deuxième niveau")
        a = ArbreRF(centre=C_ARBRE)
        a1 = [("R",), ("Rb",)]
        self.add(a.carte, a.depart, *[a.branches[p] for p in a1], *[a.lab[p] for p in a1],
                 *[a.nombre(p) for p in a1])
        self.au_mot("F, finit")
        leg = self.legende("F", "finit la course", VERT_OK)
        self.a_droite(leg, 1.5)
        self.play(FadeIn(leg, shift=RIGHT * 0.2), run_time=0.4)
        for r, mot_r, (v1, v2) in ((("R",), "Après R :", ("0,9", "et 0,1")),
                                    (("Rb",), "Après R barre", ("0,8", "et 0,2"))):
            self.au_mot(mot_r)
            nd = Dot(a.point(r), radius=0.13, color=CHEMIN)
            self.play(FadeIn(nd, scale=0.4), Indicate(a.lab[r], color=CHEMIN, scale_factor=1.4), run_time=0.45)
            f, fb = (r[0], "F"), (r[0], "Fb")
            self.play(Create(a.branches[f]), Create(a.branches[fb]), FadeIn(a.lab[f]), FadeIn(a.lab[fb]),
                      run_time=0.5)
            self.play(FadeOut(nd), run_time=0.2)
            self.au_mot(v1)
            n = a.nombre(f)
            self.play(FadeIn(n, scale=0.4), run_time=0.3)
            self.insister(n, 0.22, 1.5)
            self.au_mot(v2)
            n = a.nombre(fb)
            self.play(FadeIn(n, scale=0.4), run_time=0.3)
            self.insister(n, 0.22, 1.5)
        self.attendre_voix()

    # ── 04 : lire ───────────────────────────────────────────────────────────

    def ecran_lire(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-lire")
        self.titre_ecran("Lire l'arbre")
        a = self.arbre_complet()
        self.add(a)
        self.au_mot("deuxième niveau")
        self.play(*a.etat(FEUILLES), run_time=0.6)
        t1 = VGroup(self.t("deuxième niveau :", 34, CHEMIN), self.t("probabilités", 34),
                    self.t("conditionnelles", 34)).arrange(DOWN, aligned_edge=LEFT, buff=0.15)
        self.a_droite(t1, 1.3)
        self.au_mot("probabilités conditionnelles")
        self.play(FadeIn(t1, shift=RIGHT * 0.2), run_time=0.5)
        self.insister(t1[2], 0.3, 1.2)
        self.au_mot("0,9, c'est")
        self.play(*a.etat(a.chemin(("R", "F"))), run_time=0.6)
        jeton = Dot(a.point(()), radius=0.11, color=CHEMIN)
        trajet = VMobject().set_points_as_corners([a.point(()), a.point(("R",)), a.point(("R", "F"))])
        self.play(MoveAlongPath(jeton, trajet), run_time=0.8, rate_func=linear)
        self.au_mot("P indice R de F")
        n = p_rf(50, WHITE)
        eg = VGroup(n, self.t("=", 50), self.t("0,9", 50, PROBA_CLAIR)).arrange(RIGHT, buff=0.25)
        self.a_droite(eg, -0.7)
        self.play(FadeIn(n, shift=RIGHT * 0.2), run_time=0.4)
        self.play(FadeIn(eg[1]), TransformFromCopy(a.nombres[("R", "F")], eg[2]), run_time=0.5)
        self.play(Create(SurroundingRectangle(eg, color=CHEMIN, buff=0.15)), run_time=0.35)
        self.insister(n[-1], 0.3, 1.6)
        self.attendre_voix()

    # ── 05 : construire ─────────────────────────────────────────────────────

    def colorer(self, a, pres, couleur, larg=9):
        return [a.branches[p].animate.set_stroke(couleur, larg, opacity=1) for p in pres]

    def ecran_construire(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-construire")
        self.titre_ecran("Construire un arbre")
        a = self.arbre_complet()
        self.add(a)
        n1 = self.t("niveau 1", 26, CHEMIN).move_to(P((a.point(()) + a.point(("R",)))[0] / 2, 0))
        n2 = self.t("niveau 2", 26, VERT_OK).move_to(P((a.point(("R",)) + a.point(("R", "F")))[0] / 2, 0))
        for n in (n1, n2):
            n.set_y(a.carte.get_bottom()[1] - 0.3)
        self.au_mot("d'abord")
        e1 = self.ligne([("1.", CHEMIN), ("d'abord :", WHITE)], 36, 0.2)
        e1b = self.t("sans condition", 40, CHEMIN)
        g1 = VGroup(e1, e1b).arrange(DOWN, aligned_edge=LEFT, buff=0.15)
        self.a_droite(g1, 1.3)
        self.play(FadeIn(e1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("sans condition")
        self.play(FadeIn(e1b, shift=RIGHT * 0.2), *self.colorer(a, [("R",), ("Rb",)], CHEMIN),
                  FadeIn(n1, shift=UP * 0.15), run_time=0.6)
        self.insister(VGroup(a.nombres[("R",)], a.nombres[("Rb",)]), 0.3, 1.4, chacun=True)
        self.au_mot("puis ce qui")
        e2 = self.ligne([("2.", VERT_OK), ("puis :", WHITE)], 36, 0.2)
        e2b = self.t("« parmi »", 44, VERT_OK)
        g2 = VGroup(e2, e2b).arrange(DOWN, aligned_edge=LEFT, buff=0.15)
        self.a_droite(g2, -0.6)
        self.play(FadeIn(e2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("« parmi »")
        self.play(FadeIn(e2b, shift=RIGHT * 0.2), *self.colorer(a, FEUILLES, VERT_OK),
                  FadeIn(n2, shift=UP * 0.15), run_time=0.6)
        self.insister(e2b, 0.3, 1.3)
        self.attendre_voix()

    # ── 06 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        a = ArbreRF(centre=C_ARBRE)
        a1 = [("R",), ("Rb",)]
        self.add(a.carte, a.depart, *a.branches.values(), *a.lab.values(), *[a.nombre(p) for p in a1])
        self.au_mot("mettre 0,8")
        faux = a.nombre(("R", "F"), "0,8", ROUGE_P)
        self.play(FadeIn(faux, scale=2.0), a.branches[("R", "F")].animate.set_stroke(ROUGE_P, 8), run_time=0.5)
        self.au_mot("qui part de R")
        nd = Dot(a.point(("R",)), radius=0.14, color=ROUGE_P)
        self.play(FadeIn(nd, scale=0.4), Indicate(a.lab[("R",)], color=ROUGE_P, scale_factor=1.5), run_time=0.5)
        x = self.barrer(faux)
        self.play(Create(x), run_time=0.35)
        self.au_mot("0,8 concerne")
        c3 = VGroup(*[coureur(AUTRES, 0.55) for _ in range(3)]).arrange(RIGHT, buff=0.1)
        t_aut = self.ligne([("0,8 :", PROBA_CLAIR), ("les autres", AUTRES)], 38, 0.2)
        g = VGroup(t_aut, c3).arrange(DOWN, aligned_edge=LEFT, buff=0.2)
        self.a_droite(g, 1.35)
        self.play(FadeIn(t_aut[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("les autres coureurs")
        self.play(FadeIn(t_aut[1], shift=RIGHT * 0.2), LaggedStart(*[FadeIn(c, shift=RIGHT * 0.3) for c in c3],
                                                                   lag_ratio=0.2), run_time=0.6)
        self.au_mot("il part de R barre")
        nd2 = Dot(a.point(("Rb",)), radius=0.14, color=VERT_OK)
        self.play(FadeOut(nd), FadeIn(nd2, scale=0.4), Indicate(a.lab[("Rb",)], color=VERT_OK, scale_factor=1.5),
                  run_time=0.5)
        bon = a.place(("Rb", "F"), Text("0,8", font_size=a.fs_p, color=PROBA, weight=BOLD))
        self.play(faux.animate.move_to(bon).set_color(PROBA), FadeOut(x),
                  a.branches[("R", "F")].animate.set_stroke(BRANCHE, 4),
                  a.branches[("Rb", "F")].animate.set_stroke(VERT_OK, 9), run_time=0.8)
        regle = self.ligne([("il part de", WHITE), (lettre("R", 44, VERT_OK, barre=True), None)], 38, 0.2)
        self.a_droite(regle, -0.6)
        ok = self.coche(taille=0.28).next_to(regle, RIGHT, buff=0.35)
        self.play(FadeIn(regle, shift=RIGHT * 0.2), Create(ok), run_time=0.5)
        self.insister(faux, 0.3, 1.6)
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        a = self.arbre_complet(sauf=[("Rb", "Fb")])
        q = a.nombre(("Rb", "Fb"), "?", ORANGE_RETENUE)
        a.add(q)
        a.scale(0.92).shift(UP * 0.35)   # la chute « Mets pause » passe dessous
        self.play(FadeIn(a), run_time=0.6)
        self.au_mot("Que vaut")
        self.play(*a.etat(a.chemin(("Rb", "Fb"))), run_time=0.5)
        self.au_mot("P indice R barre")
        n = p_rf(52, WHITE, r_barre=True, f_barre=True)
        eq = VGroup(n, self.t("=", 52), self.t("?", 64, ORANGE_RETENUE)).arrange(RIGHT, buff=0.25)
        self.a_droite(eq, 0.5)
        self.play(FadeIn(n, shift=RIGHT * 0.2), run_time=0.5)
        self.play(FadeIn(eq[1:], scale=0.5), run_time=0.35)
        self.insister(eq[2], 0.3)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    # ── 07b : correction ────────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        a = self.arbre_complet(sauf=[("Rb", "Fb")])
        q = a.nombre(("Rb", "Fb"), "?", ORANGE_RETENUE)
        self.add(a, q)
        self.au_mot("Après R barre")
        self.play(*a.etat([("Rb", "F"), ("Rb", "Fb")]), run_time=0.5)
        nd = Dot(a.point(("Rb",)), radius=0.14, color=CHEMIN)
        self.play(FadeIn(nd, scale=0.4), run_time=0.3)
        self.au_mot("les branches font 1")
        r = VGroup(self.ligne([("Après", WHITE), (lettre("R", 40, CHEMIN, barre=True), None), (":", WHITE)], 34, 0.15),
                   self.ligne([("les branches font", WHITE), ("1", VERT_OK)], 34, 0.18)).arrange(DOWN, aligned_edge=LEFT, buff=0.15)
        self.a_droite(r, 1.3)
        self.play(FadeIn(r, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("1 moins 0,8")
        c = self.ligne([("1", WHITE), ("−", WHITE), ("0,8", PROBA_CLAIR), ("=", WHITE), ("0,2", VERT_OK)], 52, 0.25)
        self.a_droite(c, -0.3)
        self.play(FadeIn(c[:2], shift=RIGHT * 0.2), TransformFromCopy(a.nombres[("Rb", "F")], c[2]), run_time=0.6)
        self.au_mot(": 0,2")
        self.play(FadeIn(c[3:], scale=0.5), run_time=0.4)
        self.play(Create(SurroundingRectangle(c[4], color=VERT_OK, buff=0.12)), run_time=0.3)
        bon = a.place(("Rb", "Fb"), Text("0,2", font_size=a.fs_p, color=PROBA, weight=BOLD))
        self.play(FadeOut(q), TransformFromCopy(c[4], bon), run_time=0.6)
        self.insister(bon, 0.3, 1.6)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 36
        l1 = self.ligne([("Premier niveau :", CHEMIN), ("probabilités simples", WHITE)], fs, 0.2)
        l2 = self.ligne([("Second niveau :", VERT_OK), ("probabilités conditionnelles", WHITE)], fs, 0.2)
        l3 = self.ligne([("Les branches d'un même nœud", WHITE), ("font 1", BLEU_CALCUL)], fs, 0.2)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.55)
        if lignes.width > 10.4:
            lignes.scale_to_fit_width(10.4)
        lignes.move_to(P(-0.9, 0.5))
        for mot, l in zip(["Au premier niveau", "Au second", "Les branches d'un même nœud"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.5)
            self.play(Create(l[0]), run_time=0.3)
        self.au_mot("L'épisode 10")
        self.play(Write(self.chute("Épisode 10 : les chemins de l'arbre", color=VERT_OK, font_size=36)))
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
        self.ecran_premier()
        self.ecran_second()
        self.ecran_lire()
        self.ecran_construire()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
