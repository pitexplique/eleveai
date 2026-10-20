# proba2_tableau_arbre.py
# EleveAI — Maths 2de — série « Probabilités », épisode 7 : organiser avec un
# TABLEAU ou un ARBRE (micro : proba_tableau_arbre), AVEC VOIX.
# Paysage 16:9, CEINTURE BLEUE. Short jumeau : proba2_tableau_arbre_short.py
# (ceinture jaune : « pile puis rouge : 1/2 + 1/3 ? »).
#
# Écrans : 00 garde · 01 le stand du marché de Saint-Paul (pièce, puis urne
# 1 rouge / 2 blanches) · 02 l'ARBRE construit branche par branche (1/2, 1/2 ;
# 1/3, 2/3) · 03 le chemin pile-rouge s'allume : 1/2 × 1/3 = 1/6 · 04 deux dés :
# le TABLEAU 6 × 6, une case = une issue, 1/36 · 05 arbre ou tableau ? ·
# 06 le piège : « + » sur un chemin, barré · 07 défi (boule blanche) ·
# 07b correction (deux chemins, 1/3 + 1/3 = 2/3) · 08 ce que tu as appris ·
# 09 fin (« Entraîne-toi sur eleveai.fr », « Abonne-toi ! @eleveai974 »).
#
# ⭐ Canvas du coach repris :
#   · arbre_proba (lib/canvas/ArbreProbabilitesCanvas.tsx) : carte blanche,
#     point de départ sombre, branches gris ardoise #475569, probabilités en
#     bleu #2563eb au milieu des branches, étiquette d'un nœud intérieur
#     AU-DESSUS du nœud, étiquette d'une feuille à DROITE ;
#   · tableau (ProbabilitesCanvas.tsx, variant « tableau », celui de l'ép. 1) :
#     en-têtes gris clair #f1f5f9, cases blanches, case allumée ambre ;
#   · de : faces claires à points sombres (en-têtes du tableau des deux dés).
#
# Voix : manim/voix/seconde-proba-tableau-arbre.json (débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/seconde/proba2_tableau_arbre.py Proba2TableauArbre -o eleveai-maths-seconde-proba-tableau-arbre --media_dir manim/scripts/seconde/media
# Puis copier le mp4 dans manim/sorties/seconde/maths/probabilites/07-tableau-arbre/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "annonce"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from annonce_probabilites import bille, de, de_qui_roule, piece_qui_tourne  # noqa: E402

# Les couleurs des canvas du coach.
ENCRE = "#0F172A"         # slate-900 : départ, étiquettes
BRANCHE = "#475569"       # slate-600 : les branches
PROBA = "#2563EB"         # blue-600 : les probabilités des branches
BORD_CARTE = "#E2E8F0"    # slate-200 : le bord de la carte blanche
ENTETE_FOND = "#F1F5F9"   # slate-100
CASE_BORD = "#CBD5E1"     # slate-300
AMBRE_FOND = "#FEF3C7"
AMBRE_BORD = "#FBBF24"
AMBRE_TEXTE = "#78350F"
CHEMIN = "#F59E0B"        # le chemin calculé (orange)
CHEMIN2 = "#7C3AED"       # un second chemin (violet)
ROUGE_B = "#DC2626"       # la boule rouge
ETEINT = 0.2


class NotionSeconde7(Notion6e):
    identite = "Maths 2de — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


def frac_txt(num, den, fs=28, color=WHITE):
    """Une fraction écrite (sans LaTeX) : numérateur, barre, dénominateur."""
    n = Text(str(num), font_size=fs, color=color, weight=BOLD)
    d = Text(str(den), font_size=fs, color=color, weight=BOLD)
    larg = max(n.width, d.width) + 0.12
    barre = Line(LEFT * larg / 2, RIGHT * larg / 2, color=color, stroke_width=3)
    return VGroup(n, barre, d).arrange(DOWN, buff=0.07)


def boule(couleur, r=0.13):
    """Une boule de l'urne : rouge, ou blanche cerclée de sombre (lisible sur la carte)."""
    if couleur == "rouge":
        return Circle(radius=r, fill_color=ROUGE_B, fill_opacity=1, stroke_color=ENCRE, stroke_width=2)
    return Circle(radius=r, fill_color=WHITE, fill_opacity=1, stroke_color=ENCRE, stroke_width=2)


def urne(larg=2.0, haut=1.7):
    """L'urne du stand : un bocal transparent, col et couvercle."""
    corps = RoundedRectangle(width=larg, height=haut, corner_radius=0.35, fill_color="#E0F2FE",
                             fill_opacity=0.12, stroke_color=WHITE, stroke_width=3)
    col = Rectangle(width=larg * 0.55, height=0.22, fill_color="#E0F2FE", fill_opacity=0.12,
                    stroke_color=WHITE, stroke_width=3).next_to(corps, UP, buff=0)
    couv = RoundedRectangle(width=larg * 0.65, height=0.16, corner_radius=0.05, fill_color=ORANGE_RETENUE,
                            fill_opacity=1, stroke_width=0).next_to(col, UP, buff=0)
    return VGroup(corps, col, couv)


def boules_urne(u, r=0.26):
    """1 rouge et 2 blanches, posées au fond de l'urne u."""
    fond = u[0].get_bottom() + UP * (r + 0.12)
    b = VGroup(bille(ROUGE_B, r).move_to(fond + LEFT * (2.1 * r)),
               bille(WHITE, r).move_to(fond),
               bille(WHITE, r).move_to(fond + RIGHT * (2.1 * r)))
    for x in b[1:]:
        x[0].set_stroke(GREY_B, 2)
    return b


def face_coach(face, cote=0.5):
    """Une face du canvas « de » du coach : carré arrondi clair, points sombres."""
    corps = RoundedRectangle(width=cote, height=cote, corner_radius=cote * 0.16, fill_color="#F8FAFC",
                             fill_opacity=1, stroke_color=ENCRE, stroke_width=2)
    pos = {1: [(0, 0)], 2: [(-1, 1), (1, -1)], 3: [(-1, 1), (0, 0), (1, -1)],
           4: [(-1, 1), (1, 1), (-1, -1), (1, -1)], 5: [(-1, 1), (1, 1), (0, 0), (-1, -1), (1, -1)],
           6: [(-1, 1), (1, 1), (-1, 0), (1, 0), (-1, -1), (1, -1)]}[face]
    pts = VGroup(*[Dot(P(x * cote * 0.24, y * cote * 0.24), radius=cote * 0.075, color=ENCRE) for x, y in pos])
    return VGroup(corps, pts)


# ── l'ARBRE pondéré du coach (arbre_proba) : pièce, puis urne ────────────────

NOMS = {"P": "Pile", "F": "Face", "R": "rouge", "B": "blanche"}
FEUILLES = [("P", "R"), ("P", "B"), ("F", "R"), ("F", "B")]


class ArbreCoach(VGroup):
    """La carte blanche du coach : départ, puis Pile / Face, puis rouge / blanche.
    Un nœud = un préfixe (tuple) ; la branche d'un préfixe va de son parent à lui.
    Rien n'est ajouté au groupe sauf la carte : la scène fait apparaître les
    morceaux un à un (self.depart, self.branches[pre], self.lab[pre])."""

    def __init__(self, dx=2.4, pas=0.95, fs=26, fs_p=24, centre=ORIGIN, titre="Pièce, puis urne",
                 lab_dx=0.0):
        super().__init__()
        self.fs_p = fs_p
        pos = {(): P(0, 0)}
        g = pas * 0.22   # un peu d'air entre le sous-arbre Pile et le sous-arbre Face
        for k, f in enumerate(FEUILLES):
            pos[f] = P(2 * dx, (1.5 - k) * pas + (g if k < 2 else -g))
        for a in ("P", "F"):
            pos[(a,)] = P(dx, (pos[(a, "R")][1] + pos[(a, "B")][1]) / 2)
        self.pos = pos
        self.depart = Dot(P(0, 0), radius=0.08, color=ENCRE)
        self.branches, self.lab = {}, {}
        for pre, pt in pos.items():
            if not pre:
                continue
            self.branches[pre] = Line(pos[pre[:-1]], pt, color=BRANCHE, stroke_width=4)
            mot = Text(NOMS[pre[-1]], font_size=fs, color=ENCRE, weight=BOLD)
            if len(pre) == 1:
                # lab_dx ≠ 0 (le short, arbre serré) : « Pile » en haut à gauche du
                # nœud, « Face » en BAS à gauche, à l'écart des branches qui arrivent.
                bas = lab_dx != 0 and pre == ("F",)
                mot.next_to(pt, DOWN if bas else UP, buff=0.12).shift(RIGHT * lab_dx)
            else:
                b = boule("rouge" if pre[-1] == "R" else "blanc", 0.12)
                mot = VGroup(mot, b).arrange(RIGHT, buff=0.12).next_to(pt, RIGHT, buff=0.2)
            self.lab[pre] = mot
        self.nombres = {}
        tout = VGroup(self.depart, *self.branches.values(), *self.lab.values(), self.tous_les_nombres())
        self.nombres = {}
        haut_titre = 0.45 if titre else 0.0
        self.carte = RoundedRectangle(width=tout.width + 0.6, height=tout.height + 0.4 + haut_titre,
                                      corner_radius=0.2, fill_color=WHITE, fill_opacity=1,
                                      stroke_color=BORD_CARTE, stroke_width=2)
        self.carte.move_to(tout).shift(UP * haut_titre / 2)
        self.titre = Text(titre, font_size=22, color=ENCRE, weight=BOLD) if titre else VGroup()
        if titre:
            self.titre.next_to(self.carte.get_top(), DOWN, buff=0.12)
        self.add(self.carte, self.titre, self.depart, *self.branches.values(), *self.lab.values())
        self.shift(centre - self.carte.get_center())

    def point(self, pre):
        return self.branches[pre].get_end() if pre else self.depart.get_center()

    def nombre(self, pre, num, den):
        """La probabilité d'une branche, en bleu, à côté de son milieu (au-dessus
        si la branche monte, dessous si elle descend)."""
        t = frac_txt(num, den, self.fs_p, PROBA)
        br = self.branches[pre]
        u, v = br.get_start(), br.get_end()
        d = v - u
        n = np.array([-d[1], d[0], 0.0])
        n = n / np.linalg.norm(n)
        if (n[1] < 0) == (v[1] >= u[1]):
            n = -n
        demi = abs(n[0]) * t.width / 2 + abs(n[1]) * t.height / 2
        t.move_to((u + v) / 2 + n * (demi + 0.05))
        self.nombres[pre] = t
        return t

    def tous_les_nombres(self):
        val = {("P",): (1, 2), ("F",): (1, 2), ("P", "R"): (1, 3), ("P", "B"): (2, 3),
               ("F", "R"): (1, 3), ("F", "B"): (2, 3)}
        return VGroup(*[self.nombre(pre, *nd) for pre, nd in val.items()])

    @staticmethod
    def chemin(f):
        return [f[:1], f]

    def etat(self, allumes=(), couleurs=None, op=ETEINT, rien=False):
        """Allume les branches `allumes` (couleurs : {pré: couleur}) ; estompe les autres."""
        couleurs = couleurs or {}
        allumes = set(allumes)
        anims = []
        for pre, br in self.branches.items():
            if rien:
                anims.append(br.animate.set_stroke(BRANCHE, 4, opacity=1))
            elif pre in allumes:
                anims.append(br.animate.set_stroke(couleurs.get(pre, CHEMIN), 10, opacity=1))
            else:
                anims.append(br.animate.set_stroke(BRANCHE, 4, opacity=op))
        for dico in (self.lab, self.nombres):
            for pre, m in dico.items():
                on = rien or pre in allumes
                anims.append(m.animate.set_opacity(1 if on else op + 0.1))
        return anims


def tableau_des(centre, cell=0.55):
    """Le tableau 6 × 6 des deux dés (canvas « tableau » du coach) : en-têtes gris
    clair portant les FACES dessinées, cases blanches vides.
    Renvoie (coin, entetes_lignes, entetes_colonnes, {(i, j): case})."""
    coin = Square(cell, fill_color=ENTETE_FOND, fill_opacity=1, stroke_color=CASE_BORD, stroke_width=2)
    lig, col, cases = VGroup(), VGroup(), {}
    for k in range(1, 7):
        for grp, pos in ((col, P(k * cell, 0)), (lig, P(0, -k * cell))):
            sq = Square(cell, fill_color=ENTETE_FOND, fill_opacity=1, stroke_color=CASE_BORD,
                        stroke_width=2).move_to(pos)
            grp.add(VGroup(sq, face_coach(k, cell * 0.72).move_to(sq)))
    for i in range(1, 7):
        for j in range(1, 7):
            cases[(i, j)] = Square(cell, fill_color=WHITE, fill_opacity=1, stroke_color=CASE_BORD,
                                   stroke_width=2).move_to(P(j * cell, -i * cell))
    tout = VGroup(coin, lig, col, *cases.values())
    tout.shift(centre - tout.get_center())
    return coin, lig, col, cases


# ── la vidéo ────────────────────────────────────────────────────────────────

C_ARBRE = P(-2.9, -0.35)   # le centre de la carte de l'arbre
X_D = 1.3                  # le bord gauche de la zone de droite (calculs)


class Proba2TableauArbre(NotionSeconde7):
    nom_voix = "seconde-proba-tableau-arbre"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.2):
        return VGroup(*[m if isinstance(m, Mobject) else self.t(m, font_size, c)
                        for m, c in morceaux]).arrange(RIGHT, buff=buff)

    def insister(self, mob, run_time=0.35, k=1.5):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR, sw=7):
        return Line(mob.get_corner(DL) + P(-0.08, -0.04), mob.get_corner(UR) + P(0.08, 0.04),
                    stroke_width=sw, color=color)

    def pf(self, num, den, fs=40, color=WHITE):
        return frac_txt(num, den, fs, color)

    def arbre_complet(self, nombres=True):
        """L'arbre déjà construit (rappel des écrans précédents)."""
        a = ArbreCoach(centre=C_ARBRE)
        if nombres:
            a.add(a.tous_les_nombres())
        return a

    def au_bout(self, a, f, mob, buff=0.25):
        """Pose mob à droite de la carte, à la hauteur de la feuille f."""
        return mob.move_to(P(a.carte.get_right()[0] + buff + mob.width / 2, a.point(f)[1]))

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Un tableau ou un arbre ?", 54, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.6))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=1.0)
        coin, lig, col, cases = tableau_des(P(-3.6, 0.15), cell=0.3)
        mini = ArbreCoach(dx=1.15, pas=0.42, fs=16, fs_p=14, centre=P(2.0, 0.15), titre=None)
        self.au_mot("un tableau")
        self.play(FadeIn(VGroup(coin, lig, col, *cases.values()), scale=0.8), run_time=0.6)
        self.play(*[cases[c].animate.set_fill(AMBRE_FOND) for c in [(3, 5), (5, 2)]], run_time=0.3)
        self.au_mot("un arbre")
        self.play(FadeIn(mini.carte), FadeIn(mini.depart), run_time=0.3)
        self.play(*[Create(mini.branches[p]) for p in [("P",), ("F",)]], run_time=0.35)
        self.play(*[Create(mini.branches[f]) for f in FEUILLES], run_time=0.35)
        self.play(FadeIn(VGroup(*mini.lab.values())), run_time=0.3)
        self.attendre_voix(marge=1.0)

    # ── 01 : le stand du marché ─────────────────────────────────────────────

    def store(self, y=2.35, x0=-6.0, x1=2.6, n=11):
        """Le store rayé du stand."""
        larg = (x1 - x0) / n
        bandes = VGroup(*[Rectangle(width=larg, height=0.5, fill_color=ROUGE_B if k % 2 == 0 else WHITE,
                                    fill_opacity=1, stroke_width=0).move_to(P(x0 + larg * (k + 0.5), y))
                          for k in range(n)])
        festons = VGroup(*[Arc(radius=larg / 2, start_angle=PI, angle=PI, fill_color=ROUGE_B if k % 2 == 0 else WHITE,
                               fill_opacity=1, stroke_width=0).move_to(P(x0 + larg * (k + 0.5), y - 0.25 - larg / 4))
                           for k in range(n)])
        return VGroup(bandes, festons)

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Au marché de Saint-Paul")
        self.au_mot("un stand")
        st = self.store()
        self.play(FadeIn(st, shift=DOWN * 0.3), run_time=0.6)
        self.au_mot("on lance une pièce")
        pc = piece_qui_tourne(P(-3.6, 0.1), 0.85)
        self.add(pc)
        l1 = self.t("une pièce", 34, JAUNE_TITRE).move_to(P(-3.6, -1.45))
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.4)
        self.au_mot("puis on tire")
        fl = Arrow(P(-2.2, 0.1), P(-0.6, 0.1), color=WHITE, buff=0, stroke_width=5)
        puis = self.t("puis", 30).next_to(fl, UP, buff=0.1)
        u = urne(2.2, 1.8).move_to(P(1.0, -0.05))
        self.play(GrowArrow(fl), FadeIn(puis), FadeIn(u, shift=UP * 0.2), run_time=0.6)
        l2 = self.t("une urne", 34, JAUNE_TITRE).move_to(P(1.0, -1.45))
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.3)
        b = boules_urne(u)
        self.au_mot("1 boule rouge")
        r1 = self.ligne([("1", WHITE), ("rouge", ROUGE_B)], 32, 0.15).move_to(P(1.0, -2.05))
        self.play(FadeIn(b[0], shift=DOWN * 1.2), FadeIn(r1), run_time=0.5)
        self.au_mot("2 boules blanches")
        r2 = self.ligne([("2", WHITE), ("blanches", WHITE)], 32, 0.15).move_to(P(1.0, -2.6))
        self.play(LaggedStart(*[FadeIn(x, shift=DOWN * 1.2) for x in b[1:]], lag_ratio=0.3), FadeIn(r2), run_time=0.7)
        self.insister(b, 0.3, 1.25)
        self.attendre_voix()
        pc.clear_updaters()

    # ── 02 : l'arbre, branche par branche ───────────────────────────────────

    def ecran_arbre(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-arbre")
        self.titre_ecran("L'arbre")
        a = ArbreCoach(centre=C_ARBRE)
        self.au_mot("d'abord la pièce")
        pc = piece_qui_tourne(P(3.6, 0.6), 0.7)
        self.play(FadeIn(a.carte), FadeIn(a.titre), FadeIn(a.depart, scale=0.5), run_time=0.5)
        self.add(pc)
        self.au_mot("pile ou face")
        for p in [("P",), ("F",)]:
            self.play(Create(a.branches[p]), run_time=0.35)
            self.play(FadeIn(a.lab[p], scale=0.6), run_time=0.2)
        self.au_mot("un demi chacun")
        n1 = [a.nombre(p, 1, 2) for p in [("P",), ("F",)]]
        self.play(LaggedStart(*[FadeIn(n, scale=0.5) for n in n1], lag_ratio=0.3), run_time=0.6)
        self.insister(VGroup(*n1), 0.3, 1.3)
        self.au_mot("Puis l'urne")
        pc.clear_updaters()
        u = urne(1.9, 1.5).move_to(P(3.6, 0.5))
        b = boules_urne(u, 0.22)
        self.play(FadeOut(pc), FadeIn(u), FadeIn(b), run_time=0.4)
        for f in FEUILLES:
            self.play(Create(a.branches[f]), FadeIn(a.lab[f], shift=LEFT * 0.1), run_time=0.3)
        self.au_mot("rouge 1 sur 3")
        nr = [a.nombre(f, 1, 3) for f in [("P", "R"), ("F", "R")]]
        self.play(*[FadeIn(n, scale=0.5) for n in nr], Indicate(b[0], scale_factor=1.4, color=ROUGE_B),
                  *[Indicate(a.lab[f], color=ROUGE_B) for f in [("P", "R"), ("F", "R")]], run_time=0.6)
        self.au_mot("blanche 2 sur 3")
        nb = [a.nombre(f, 2, 3) for f in [("P", "B"), ("F", "B")]]
        self.play(*[FadeIn(n, scale=0.5) for n in nb], *[Indicate(x, scale_factor=1.4, color=WHITE) for x in b[1:]],
                  run_time=0.6)
        self.insister(VGroup(*nb), 0.3, 1.3)
        self.attendre_voix()

    # ── 03 : un chemin : on multiplie ───────────────────────────────────────

    def ecran_chemin(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-chemin")
        self.titre_ecran("Un chemin")
        a = self.arbre_complet()
        self.add(a)
        f = ("P", "R")
        self.au_mot("Pile puis rouge")
        self.play(*a.etat(a.chemin(f)), run_time=0.6)
        self.au_mot("on suit le chemin")
        jeton = Dot(a.point(()), radius=0.1, color=CHEMIN)
        trajet = VMobject().set_points_as_corners([a.point(()), a.point(("P",)), a.point(f)])
        self.play(MoveAlongPath(jeton, trajet), run_time=1.0, rate_func=linear)
        self.au_mot("on multiplie")
        fois = self.t("×", 80, CHEMIN).move_to(P(4.0, 1.4))
        self.play(FadeIn(fois, scale=0.4), run_time=0.3)
        self.insister(fois, 0.25)
        self.au_mot("Un demi fois")
        y = 0.1
        c1 = self.pf(1, 2, 44, WHITE)
        cx = self.t("×", 44, CHEMIN)
        c2 = self.pf(1, 3, 44, WHITE)
        eg = self.t("=", 44)
        c3 = self.pf(1, 6, 48, VERT_OK)
        calc = VGroup(c1, cx, c2, eg, c3).arrange(RIGHT, buff=0.25).move_to(P(4.0, y))
        self.play(FadeOut(fois), TransformFromCopy(a.nombres[("P",)], c1), run_time=0.5)
        self.au_mot("fois 1 sur 3")
        self.play(FadeIn(cx), TransformFromCopy(a.nombres[f], c2), run_time=0.5)
        self.au_mot("1 sur 6")
        self.play(FadeIn(eg), FadeIn(c3, scale=0.5), run_time=0.4)
        self.play(Create(SurroundingRectangle(c3, color=VERT_OK, buff=0.12)), run_time=0.3)
        bout = self.au_bout(a, f, self.pf(1, 6, 30, CHEMIN))
        self.play(TransformFromCopy(c3, bout), Flash(jeton, color=CHEMIN), run_time=0.5)
        self.insister(c3, 0.3)
        self.attendre_voix()

    # ── 04 : deux dés : le tableau ──────────────────────────────────────────

    def ecran_tableau(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-tableau")
        self.titre_ecran("Deux dés : un tableau")
        cell = 0.55
        coin, lig, col, cases = tableau_des(P(-2.2, -0.45), cell)
        self.au_mot("deux dés")
        d1 = de_qui_roule(P(-5.4, lig[2].get_center()[1]), 0.85, periode=0.13)
        d2 = de_qui_roule(P(col[4].get_center()[0], 2.25), 0.85, periode=0.15, faces=[6, 2, 4, 1, 5, 3])
        self.add(d1, d2)
        self.au_mot("un tableau")
        self.play(FadeIn(coin), FadeIn(VGroup(*cases.values())), run_time=0.6)
        x0 = 0.6
        self.au_mot("6 lignes")
        self.play(LaggedStart(*[FadeIn(h, shift=RIGHT * 0.15) for h in lig], lag_ratio=0.12), run_time=0.7)
        t1 = self.ligne([("6", JAUNE_TITRE), ("lignes", WHITE)], 38, 0.18)
        t1.move_to(P(0, 1.2)).align_to(P(x0, 0), LEFT)
        self.play(FadeIn(t1, shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("6 colonnes")
        self.play(LaggedStart(*[FadeIn(h, shift=DOWN * 0.15) for h in col], lag_ratio=0.12), run_time=0.7)
        t2 = self.ligne([("6", JAUNE_TITRE), ("colonnes", WHITE)], 38, 0.18)
        t2.next_to(t1, DOWN, buff=0.3).align_to(t1, LEFT)
        self.play(FadeIn(t2, shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("Chaque case")
        for d, f in ((d1, 3), (d2, 5)):
            d.clear_updaters()
            d.become(de(f, 0.85).move_to(d.get_center()))
        self.play(lig[2][0].animate.set_fill(AMBRE_FOND), col[4][0].animate.set_fill(AMBRE_FOND),
                  cases[(3, 5)].animate.set_fill(AMBRE_FOND).set_stroke(AMBRE_BORD, 5), run_time=0.45)
        t3 = self.t("chaque case = une issue", 32).next_to(t2, DOWN, buff=0.45).align_to(t1, LEFT)
        self.play(FadeIn(t3, shift=RIGHT * 0.2), run_time=0.4)
        autres = [c for k, c in cases.items() if k != (3, 5)]
        self.play(LaggedStart(*[Indicate(c, color=AMBRE_BORD, scale_factor=1.15) for c in autres],
                              lag_ratio=0.02), run_time=1.2)
        self.au_mot("1 sur 36")
        f36 = self.pf(1, 36, 44, VERT_OK)
        r = self.ligne([("une case :", WHITE), (f36, None)], 36, 0.25).next_to(t3, DOWN, buff=0.4).align_to(t1, LEFT)
        self.play(FadeIn(r, shift=RIGHT * 0.2), run_time=0.4)
        self.play(Create(SurroundingRectangle(f36, color=VERT_OK, buff=0.1)), run_time=0.3)
        self.insister(cases[(3, 5)], 0.3)
        self.attendre_voix()

    # ── 05 : arbre ou tableau ? ─────────────────────────────────────────────

    def ecran_choisir(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-choisir")
        self.titre_ecran("Arbre ou tableau ?")
        xg, xd = -4.0, 1.4
        self.au_mot("l'une après l'autre")
        pc = piece_qui_tourne(P(xg - 1.0, 1.7), 0.45)
        u = urne(1.0, 0.85).move_to(P(xg + 1.0, 1.55))
        fl = Arrow(P(xg - 0.45, 1.65), P(xg + 0.4, 1.65), buff=0, color=WHITE, stroke_width=4)
        e1 = self.t("l'une après l'autre", 30).move_to(P(xg, 0.75))
        self.add(pc)
        self.play(GrowArrow(fl), FadeIn(u), FadeIn(boules_urne(u, 0.12)), FadeIn(e1), run_time=0.6)
        self.au_mot("un arbre")
        mini = ArbreCoach(dx=0.95, pas=0.36, fs=15, fs_p=13, centre=P(xg, -0.75), titre=None)
        self.play(FadeIn(mini.carte), FadeIn(mini.depart), run_time=0.25)
        self.play(*[Create(mini.branches[p]) for p in [("P",), ("F",)]], run_time=0.3)
        self.play(*[Create(mini.branches[f]) for f in FEUILLES], FadeIn(VGroup(*mini.lab.values())), run_time=0.35)
        a1 = self.t("un arbre", 40, CHEMIN).next_to(mini.carte, DOWN, buff=0.3)
        self.play(FadeIn(a1, scale=0.6), run_time=0.3)
        pc.clear_updaters()
        self.au_mot("deux dés")
        d1 = de_qui_roule(P(xd - 0.6, 1.7), 0.7, periode=0.13)
        d2 = de_qui_roule(P(xd + 0.6, 1.7), 0.7, periode=0.16, faces=[6, 2, 4, 1, 5, 3])
        self.add(d1, d2)
        self.au_mot("deux critères")
        e2 = self.t("deux critères qui se croisent", 30).move_to(P(xd, 0.75))
        self.play(FadeIn(e2), run_time=0.4)
        self.au_mot("un tableau")
        coin, lig, col, cases = tableau_des(P(xd, -0.75), cell=0.27)
        self.play(FadeIn(VGroup(coin, lig, col, *cases.values()), scale=0.8), run_time=0.45)
        a2 = self.t("un tableau", 40, BLEU_CALCUL).next_to(VGroup(coin, lig), DOWN, buff=0.3).set_x(xd)
        self.play(FadeIn(a2, scale=0.6), run_time=0.3)
        d1.clear_updaters()
        d2.clear_updaters()
        self.insister(VGroup(a1, a2), 0.3, 1.2)
        self.attendre_voix()

    # ── 06 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        a = self.arbre_complet()
        self.add(a)
        f, g = ("P", "R"), ("F", "R")
        self.play(*a.etat(a.chemin(f)), run_time=0.5)
        x0 = 1.25
        self.au_mot("additionner sur un chemin")
        n1, n2 = self.pf(1, 2, 40, ROUGE_ERREUR), self.pf(1, 3, 40, ROUGE_ERREUR)
        faux = VGroup(n1, self.t("+", 44, ROUGE_ERREUR), n2).arrange(RIGHT, buff=0.25)
        faux.move_to(P(0, 1.45)).align_to(P(x0, 0), LEFT)
        self.play(TransformFromCopy(a.nombres[("P",)], n1), FadeIn(faux[1]), TransformFromCopy(a.nombres[f], n2),
                  run_time=0.6)
        self.insister(faux[1], 0.25)
        self.play(Create(self.barrer(faux)), run_time=0.35)
        self.au_mot("Sur un chemin, on multiplie")
        bon = self.ligne([("Sur un chemin :", WHITE), ("×", CHEMIN)], 34, 0.22)
        bon[1].scale(1.5)
        bon.next_to(faux, DOWN, buff=0.55).align_to(faux, LEFT)
        ok = self.coche(taille=0.25).next_to(bon, RIGHT, buff=0.3)
        self.play(FadeIn(bon, shift=RIGHT * 0.2), run_time=0.45)
        self.play(Create(ok), run_time=0.3)
        self.insister(bon[1], 0.25)
        self.au_mot("On additionne seulement")
        self.play(*a.etat(a.chemin(f) + a.chemin(g), {g: CHEMIN2, ("F",): CHEMIN2}), run_time=0.6)
        entre = VGroup(self.t("+ seulement entre", 32, VERT_OK),
                       self.t("des chemins différents", 32, VERT_OK)).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        entre.next_to(bon, DOWN, buff=0.55).align_to(faux, LEFT)
        self.au_mot("chemins différents")
        bouts = VGroup(Dot(a.point(f), radius=0.14, color=CHEMIN), Dot(a.point(g), radius=0.14, color=CHEMIN2))
        self.play(FadeIn(entre, shift=RIGHT * 0.2), FadeIn(bouts, scale=0.4), run_time=0.5)
        self.play(*[Flash(b, color=b.get_color()) for b in bouts], run_time=0.5)
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        a = self.arbre_complet()
        a.scale(0.9).shift(UP * 0.3)   # la chute « Mets pause » passe dessous
        self.au_mot("la pièce et l'urne")
        self.play(FadeIn(a), run_time=0.6)
        self.au_mot("une boule blanche")
        blanches = [("P", "B"), ("F", "B")]
        self.play(*[Indicate(a.lab[f], color=AMBRE_BORD, scale_factor=1.25) for f in blanches], run_time=0.7)
        q = self.ligne([("P(blanche)", BLEU_CALCUL), ("=", WHITE), ("?", ORANGE_RETENUE)], 44, 0.2)
        q[2].scale(1.4)
        q.move_to(P(4.0, 0.6))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.insister(q[2], 0.3)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    # ── 07b : correction ────────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        a = self.arbre_complet()
        self.add(a)
        f, g = ("P", "B"), ("F", "B")
        coul = {f: CHEMIN, ("P",): CHEMIN, g: CHEMIN2, ("F",): CHEMIN2}
        self.au_mot("Deux chemins")
        self.play(*a.etat(a.chemin(f) + a.chemin(g), coul), run_time=0.6)
        self.au_mot("pile puis blanche")
        self.play(*[Indicate(a.branches[p], color=CHEMIN, scale_factor=1.05) for p in a.chemin(f)], run_time=0.5)
        x0 = 2.4
        self.au_mot("un demi fois 2")
        c1, c2 = self.pf(1, 2, 40), self.pf(2, 3, 40)
        l1 = VGroup(c1, self.t("×", 40, CHEMIN), c2).arrange(RIGHT, buff=0.22)
        l1.move_to(P(0, 1.3)).align_to(P(x0, 0), LEFT)
        self.play(TransformFromCopy(a.nombres[("P",)], c1), FadeIn(l1[1]), TransformFromCopy(a.nombres[f], c2),
                  run_time=0.6)
        self.au_mot("1 sur 3. Face")
        r1 = VGroup(self.t("=", 40), self.pf(1, 3, 40, CHEMIN)).arrange(RIGHT, buff=0.22).next_to(l1, RIGHT, buff=0.22)
        b1 = self.au_bout(a, f, self.pf(1, 3, 28, CHEMIN))
        self.play(FadeIn(r1, shift=RIGHT * 0.15), TransformFromCopy(r1[1], b1), run_time=0.5)
        self.au_mot("Face puis blanche")
        self.play(*[Indicate(a.branches[p], color=CHEMIN2, scale_factor=1.05) for p in a.chemin(g)], run_time=0.5)
        self.au_mot("blanche, 1 sur 3")
        b2 = self.au_bout(a, g, self.pf(1, 3, 28, CHEMIN2))
        self.play(FadeIn(b2, scale=0.5), run_time=0.4)
        self.insister(b2, 0.25)
        self.au_mot("1 sur 3 plus")
        s1 = self.pf(1, 3, 44, CHEMIN)
        l2 = VGroup(s1, self.t("+", 44), self.pf(1, 3, 44, CHEMIN2), self.t("=", 44), self.pf(2, 3, 48, VERT_OK))
        l2.arrange(RIGHT, buff=0.25).move_to(P(0, -0.15)).align_to(P(x0, 0), LEFT)
        self.play(TransformFromCopy(b1, s1), run_time=0.4)
        self.au_mot("plus 1 sur 3")
        self.play(FadeIn(l2[1]), TransformFromCopy(b2, l2[2]), run_time=0.4)
        self.au_mot(": 2 sur 3")
        self.play(FadeIn(l2[3]), FadeIn(l2[4], scale=0.5), run_time=0.4)
        self.play(Create(SurroundingRectangle(l2[4], color=VERT_OK, buff=0.12)), run_time=0.3)
        self.insister(l2[4], 0.3)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 38
        l1 = self.ligne([("Un arbre :", CHEMIN), ("des épreuves successives", WHITE)], fs, 0.2)
        l2 = self.ligne([("Un tableau :", BLEU_CALCUL), ("des critères croisés", WHITE)], fs, 0.2)
        l3 = self.ligne([("Sur un chemin :", WHITE), ("on multiplie", CHEMIN)], fs, 0.2)
        l4 = self.ligne([("Entre les chemins :", WHITE), ("on additionne", VERT_OK)], fs, 0.2)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3, l4)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.5)
        if lignes.width > 10.4:
            lignes.scale_to_fit_width(10.4)
        lignes.move_to(P(-0.9, 0.45))
        for mot, l in zip(["Un arbre pour", "un tableau pour", "Sur un chemin", "entre les chemins"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.5)
            self.play(Create(l[0]), run_time=0.3)
        self.au_mot("L'épisode 8")
        self.play(Write(self.chute("Épisode 8 : les probabilités conditionnelles", color=VERT_OK, font_size=36)))
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
        self.ecran_arbre()
        self.ecran_chemin()
        self.ecran_tableau()
        self.ecran_choisir()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
