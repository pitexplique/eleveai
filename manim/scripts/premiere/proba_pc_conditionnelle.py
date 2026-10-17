# proba_pc_conditionnelle.py
# EleveAI — Maths 1re spé — série « Probabilités », épisode 1 : la probabilité
# conditionnelle (micro : pc_conditionnelle), AVEC VOIX. Paysage 16:9,
# CEINTURE MARRON. Short jumeau : proba_pc_conditionnelle_short.py (orange).
#
# ⭐ Les figures sont CELLES DU COACH (banque probabilites-conditionnelles) :
#   · le TABLEAU CROISÉ (`tableau_donnees`, pcTableau) : en-tête sombre, colonne
#     des libellés bleu clair, cases blanches, case allumée en jaune ;
#   · l'ARBRE PONDÉRÉ (`arbre_proba`) : point de départ, branches grises,
#     probabilités en bleu au milieu des branches, nœud intérieur étiqueté
#     au-dessus, feuille étiquetée à droite.
#
# Écrans : 00 garde · 01 les 200 élèves (des points qui se colorent) · 02 le
# tableau croisé se remplit case par case · 03 « sachant D » : la ligne D
# s'allume, 45 sur 120 · 04 la notation P_D(S) = 0,375 · 05 la formule et le
# PONT tableau → arbre (D 120/200 → S 45/120, le 45 au bout du chemin) ·
# 06 le piège : diviser par 200 · 07 défi (externes) · 07b correction ·
# 08 ce que tu as appris · 09 abonnement.
#
# Voix : manim/voix/premiere-proba-conditionnelle.json (débit −6).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/premiere/proba_pc_conditionnelle.py ProbaConditionnellePremiere -o eleveai-maths-premiere-proba-conditionnelle --media_dir manim/scripts/premiere/media
# Puis copier le mp4 dans manim/sorties/premiere/maths/probabilites/01-conditionnelle/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

# Les couleurs du coach (TableauDonneesCanvas, ArbreProbabilitesCanvas)
ENTETE = "#1E293B"      # slate-800 : la ligne d'en-tête
LIBELLE = "#E0F2FE"     # sky-100 : la colonne des libellés
ENCRE = "#0F172A"       # le texte sombre des cases
BORD = "#CBD5E1"        # slate-300 : les traits du tableau
SURLIGNE = "#FEF08A"    # yellow-200 : la case allumée
ANNEAU = "#EAB308"      # yellow-500 : son anneau
BRANCHE = "#475569"     # slate-600 : les branches de l'arbre
PROBA = "#2563EB"       # blue-600 : les probabilités sur les branches
CHEMIN = "#F59E0B"      # le chemin calculé
COUL_DP = "#F97316"     # les demi-pensionnaires (points)
COUL_EXT = "#38BDF8"    # les externes (points)
ETEINT = 0.22


class NotionPremiere(Notion6e):
    identite = "Maths 1re spé — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


# ── l'écriture : barres, indices, fractions ─────────────────────────────────

def lettre(texte, fs=36, color=WHITE, barre=False):
    """Une lettre d'événement ; « D barre » porte un trait dessiné au-dessus."""
    t = Text(texte, font_size=fs, color=color)
    if not barre:
        return VGroup(t)
    b = Line(LEFT, RIGHT, color=color, stroke_width=max(2.0, fs / 14))
    b.set_width(t.width * 1.05).next_to(t, UP, buff=fs / 360)
    return VGroup(t, b)


def p_cond(cond, cible, fs=40, color=WHITE, c_cond=None, c_cible=None, barre_cond=False):
    """P_cond(cible) : le P, la condition EN INDICE, puis (cible)."""
    p = Text("P", font_size=fs, color=color)
    ind = lettre(cond, int(fs * 0.62), c_cond or color, barre_cond)
    ind.next_to(p, RIGHT, buff=0.03).align_to(p, DOWN).shift(DOWN * fs * 0.0045)
    par = Text("(" + cible + ")", font_size=fs, color=color)
    if c_cible:
        par[1:-1].set_color(c_cible)
    par.next_to(ind, RIGHT, buff=0.03).align_to(p, DOWN)
    # les parenthèses descendent sous la ligne de base : on aligne sur la lettre
    par.shift(UP * (p.get_bottom()[1] - par[1].get_bottom()[1]))
    return VGroup(p, ind, par)


def frac(n, d, fs=40, color=WHITE, color_n=None, color_d=None, sw=3.0):
    tn = Text(str(n), font_size=fs, color=color_n or color)
    td = Text(str(d), font_size=fs, color=color_d or color)
    larg = max(tn.width, td.width) + 0.14
    barre = Line(LEFT * larg / 2, RIGHT * larg / 2, color=color, stroke_width=sw)
    return VGroup(tn, barre, td).arrange(DOWN, buff=0.08)


def frac_obj(haut, bas, color=WHITE, sw=3.0):
    """Une fraction dont le numérateur et le dénominateur sont des objets."""
    larg = max(haut.width, bas.width) + 0.16
    barre = Line(LEFT * larg / 2, RIGHT * larg / 2, color=color, stroke_width=sw)
    return VGroup(haut, barre, bas).arrange(DOWN, buff=0.1)


def suite(*objs, buff=0.18):
    """Des morceaux sur une même ligne, centrés verticalement."""
    return VGroup(*objs).arrange(RIGHT, buff=buff)


# ── le TABLEAU CROISÉ du coach (tableau_donnees) ────────────────────────────

LIGNES = ["Demi-pensionnaires", "Externes", "Total"]
COLONNES = ["Sport", "Pas sport", "Total"]
# ⛔ PAS D'ÉCART : seuls les nombres que la voix DIT ; les cases jamais dites restent vides.
VALEURS = [[45, None, 120], [35, None, 80], [None, None, 200]]


class TableauCroise(VGroup):
    """Lignes : D / D̄ / Total ; colonnes : S / S̄ / Total. Les cases de valeurs
    sont VIDES au départ : `poser(i, j)` y écrit le nombre."""

    def __init__(self, lignes=LIGNES, colonnes=COLONNES, valeurs=VALEURS, larg_lab=4.0, larg=2.0,
                 h=0.78, h_ent=0.7, fs=28, **kw):
        super().__init__(**kw)
        self.n = len(lignes)
        xs = [larg_lab / 2] + [larg_lab + larg * (j + 0.5) for j in range(len(colonnes))]
        ws = [larg_lab] + [larg] * len(colonnes)
        ys = [-h_ent / 2] + [-h_ent - h * (i + 0.5) for i in range(len(lignes))]
        hs = [h_ent] + [h] * len(lignes)
        self.rect = [[None] * (len(colonnes) + 1) for _ in range(len(lignes) + 1)]
        self.ent = []
        fonds, textes = VGroup(), VGroup()
        for r in range(len(lignes) + 1):
            for c in range(len(colonnes) + 1):
                if r == 0:
                    coul = ENTETE
                elif c == 0:
                    coul = LIBELLE
                else:
                    coul = WHITE
                rc = Rectangle(width=ws[c], height=hs[r], fill_color=coul, fill_opacity=1,
                               stroke_color=BORD, stroke_width=2).move_to(P(xs[c], ys[r]))
                self.rect[r][c] = rc
                fonds.add(rc)
        for c, nom in enumerate(colonnes):
            t = Text(nom, font_size=fs, color=WHITE, weight=BOLD).move_to(self.rect[0][c + 1])
            self.ent.append(t)
            textes.add(t)
        self.lab = []
        for r, nom in enumerate(lignes):
            t = Text(nom, font_size=fs, color=ENCRE, weight=BOLD).move_to(self.rect[r + 1][0])
            if t.width > larg_lab - 0.2:
                t.scale_to_fit_width(larg_lab - 0.2)
            self.lab.append(t)
            textes.add(t)
        self.val = [[None if v is None else
                     Text(str(v), font_size=int(fs * 1.15), color=ENCRE, weight=BOLD).move_to(self.rect[i + 1][j + 1])
                     for j, v in enumerate(ligne)] for i, ligne in enumerate(valeurs)]
        for t in textes:
            t.set_z_index(3)
        for ligne in self.val:
            for t in ligne:
                if t is not None:
                    t.set_z_index(3)
        self.vals = VGroup(*[t for ligne in self.val for t in ligne if t is not None])
        self.add(fonds, textes, self.vals)
        self.fonds, self.textes = fonds, textes
        self.posees = set()

    def case(self, i, j):
        return self.rect[i + 1][j + 1]

    def poser(self, i, j, **kw):
        """L'animation qui écrit le nombre de la case (i, j)."""
        self.posees.add((i, j))
        return FadeIn(self.val[i][j], scale=1.6, **kw)

    def tout_poser(self):
        for i in range(len(self.val)):
            for j in range(len(self.val[i])):
                if self.val[i][j] is not None:
                    self.posees.add((i, j))
        return self

    def etat(self, lignes=(), colonnes=(), cases=(), eteindre=True):
        """Les animations qui allument des lignes, des colonnes, des cases
        (jaune, comme le coach) et estompent le reste. Sans argument : tout
        revient à la normale."""
        rien = not (lignes or colonnes or cases)
        anims = []
        for i in range(len(self.val)):
            for j in range(len(self.val[i])):
                on = i in lignes or j in colonnes or (i, j) in cases
                rc = self.case(i, j)
                if rien:
                    anims.append(rc.animate.set_fill(WHITE, 1).set_stroke(BORD, 2).set_z_index(0))
                elif on:
                    anims.append(rc.animate.set_fill(SURLIGNE, 1).set_stroke(ANNEAU, 5).set_z_index(1))
                else:
                    op = ETEINT if eteindre else 1
                    anims.append(rc.animate.set_fill(WHITE, op).set_stroke(BORD, 2, opacity=op).set_z_index(0))
                if (i, j) in self.posees:
                    op = 1 if (rien or on or not eteindre) else ETEINT + 0.15
                    anims.append(self.val[i][j].animate.set_opacity(op))
        for i, t in enumerate(self.lab):
            on = rien or not eteindre or i in lignes or any(c[0] == i for c in cases) or bool(colonnes and not lignes)
            anims.append(t.animate.set_opacity(1 if on else 0.3))
            anims.append(self.rect[i + 1][0].animate.set_fill(LIBELLE, 1 if on else ETEINT))
        for j, t in enumerate(self.ent):
            on = rien or not eteindre or j in colonnes or any(c[1] == j for c in cases) or bool(lignes and not colonnes)
            anims.append(t.animate.set_opacity(1 if on else 0.3))
            anims.append(self.rect[0][j + 1].animate.set_fill(ENTETE, 1 if on else ETEINT + 0.2))
        return anims

    def lettres(self, fs=34):
        """D, D̄ à gauche des lignes ; S, S̄ au-dessus des colonnes (en jaune)."""
        g = VGroup()
        for i, (l, b) in enumerate([("D", False), ("D", True)]):
            m = lettre(l, fs, JAUNE_TITRE, b).next_to(self.rect[i + 1][0], LEFT, buff=0.18)
            g.add(m)
        for j, (l, b) in enumerate([("S", False), ("S", True)]):
            m = lettre(l, fs, JAUNE_TITRE, b).next_to(self.rect[0][j + 1], UP, buff=0.12)
            g.add(m)
        return g


# ── l'ARBRE PONDÉRÉ du coach (arbre_proba) ──────────────────────────────────

class ArbrePondere(VGroup):
    """Sur sa carte blanche, comme le coach : point de départ, D / D̄, puis
    S / S̄ ; branches grises, probabilités en bleu au milieu des branches.
    Branches : 0 → D, 1 → D̄, 2 D → S, 3 D → S̄, 4 D̄ → S, 5 D̄ → S̄."""

    def __init__(self, dx=2.0, dy1=1.05, dy2=0.5, fs=30, titre="Arbre pondéré", **kw):
        super().__init__(**kw)
        self.racine = P(0, 0)
        self.noeuds = [P(dx, dy1), P(dx, -dy1)]
        self.feuilles = [P(2 * dx, dy1 + dy2), P(2 * dx, dy1 - dy2), P(2 * dx, -dy1 + dy2), P(2 * dx, -dy1 - dy2)]
        bouts = [(self.racine, self.noeuds[0]), (self.racine, self.noeuds[1]),
                 (self.noeuds[0], self.feuilles[0]), (self.noeuds[0], self.feuilles[1]),
                 (self.noeuds[1], self.feuilles[2]), (self.noeuds[1], self.feuilles[3])]
        self.branches = [Line(a, b, color=BRANCHE, stroke_width=4) for a, b in bouts]
        self.depart = Dot(self.racine, radius=0.07, color=ENCRE)
        self.lab_noeuds = []
        for k, (l, b) in enumerate([("D", False), ("D", True)]):
            m = lettre(l, fs, ENCRE, b)
            m.next_to(self.noeuds[k], UP, buff=0.08)
            fond = BackgroundRectangle(m, color=WHITE, fill_opacity=1, buff=0.04)
            self.lab_noeuds.append(VGroup(fond, m))
        self.lab_feuilles = []
        for k, (l, b) in enumerate([("S", False), ("S", True), ("S", False), ("S", True)]):
            m = lettre(l, fs, ENCRE, b).next_to(self.feuilles[k], RIGHT, buff=0.12)
            self.lab_feuilles.append(m)
        tout = VGroup(self.depart, *self.branches, *self.lab_noeuds, *self.lab_feuilles)
        self.carte = RoundedRectangle(width=tout.width + 2.7, height=tout.height + 1.5, corner_radius=0.2,
                                      fill_color=WHITE, fill_opacity=1, stroke_color=BORD, stroke_width=2)
        self.carte.move_to(tout).shift(UP * 0.42 + RIGHT * 0.6)
        self.titre = Text(titre, font_size=22, color=ENCRE, weight=BOLD)
        self.titre.next_to(self.carte.get_top(), DOWN, buff=0.14)
        self.add(self.carte, self.titre, *self.branches, self.depart, *self.lab_noeuds, *self.lab_feuilles)

    def sur_branche(self, k, mob, buff=0.1):
        """Pose `mob` au milieu de la branche k, AU-DESSUS du trait."""
        a, b = self.branches[k].get_start(), self.branches[k].get_end()
        m = (a + b) / 2
        d = b - a
        n = np.array([-d[1], d[0], 0.0])
        n = n / np.linalg.norm(n)
        if n[1] < 0:
            n = -n
        mob.move_to(m)
        # on recule jusqu'à ce que le cadre de mob ne touche plus le trait
        demi = abs(n[0]) * mob.width / 2 + abs(n[1]) * mob.height / 2
        mob.shift(n * (demi + buff))
        return mob

    def chemin(self, ks, color=CHEMIN):
        return [self.branches[k].animate.set_stroke(color, 9) for k in ks]

    def eteindre_sauf(self, ks, op=0.2):
        anims = []
        for k, br in enumerate(self.branches):
            if k not in ks:
                anims.append(br.animate.set_stroke(opacity=op))
        garde_n = {0} if any(k in (0, 2, 3) for k in ks) else set()
        garde_n |= {1} if any(k in (1, 4, 5) for k in ks) else set()
        for k, m in enumerate(self.lab_noeuds):
            if k not in garde_n:
                anims.append(m[1].animate.set_opacity(op))
        feuille_de = {2: 0, 3: 1, 4: 2, 5: 3}
        gardees = {feuille_de[k] for k in ks if k in feuille_de}
        for k, m in enumerate(self.lab_feuilles):
            if k not in gardees:
                anims.append(m.animate.set_opacity(op))
        return anims


def pastille(texte, fs=26, fond=SURLIGNE, bord=ANNEAU, color=ENCRE):
    """Un effectif dans une pastille jaune : la même couleur que la case allumée."""
    t = Text(texte, font_size=fs, color=color, weight=BOLD)
    r = RoundedRectangle(width=t.width + 0.3, height=t.height + 0.22, corner_radius=0.1,
                         fill_color=fond, fill_opacity=1, stroke_color=bord, stroke_width=3)
    return VGroup(r, t.move_to(r))


class ProbaConditionnellePremiere(NotionPremiere):
    nom_voix = "premiere-proba-conditionnelle"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.4):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def tableau(self, centre=P(-0.6, 0.0), echelle=1.0, plein=True):
        tb = TableauCroise()
        if plein:
            tb.tout_poser()
        tb.scale(echelle).move_to(centre)
        return tb

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("La probabilité conditionnelle", 52, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.22)
        ech = echelle_ceintures("marron").move_to(P(-0.6, -2.75))
        tb = self.tableau(P(-0.6, 0.45), 0.6, plein=False)
        tb.remove(tb.vals)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), FadeIn(tb, shift=UP * 0.2),
                  run_time=1.0)
        self.au_mot("quand on sait")
        q = self.t("Quand on sait déjà quelque chose…", 40, BLEU_CALCUL).move_to(P(-0.6, -1.45))
        self.play(FadeIn(q, shift=UP * 0.2), *tb.etat(lignes=(0,)), run_time=0.7)
        self.attendre_voix(marge=1.0)

    # ── 01 : les 200 élèves ─────────────────────────────────────────────────

    def points_eleves(self, x0=-6.5, y0=-1.55, pas=0.3, ecart=0.25):
        """200 points : 12 colonnes de demi-pensionnaires, 8 d'externes (10 rangées).
        Renvoie (dp, ext) : des listes de points, remplies par rangées depuis le bas."""
        dp, ext = [], []
        for r in range(10):
            for c in range(20):
                x = x0 + c * pas + (ecart if c >= 12 else 0)
                d = Circle(radius=0.1, fill_color=GREY_C, fill_opacity=1, stroke_color=GREY_B,
                           stroke_width=1.5).move_to(P(x, y0 + r * pas))
                (dp if c < 12 else ext).append(d)
        return dp, ext

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Au lycée")
        dp, ext = self.points_eleves()
        tous = VGroup(*dp, *ext)
        self.au_mot("200 élèves")
        n200 = self.t("200 élèves", 36, WHITE).next_to(tous, UP, buff=0.25)
        self.play(LaggedStart(*[FadeIn(d, scale=0.3) for d in tous], lag_ratio=0.004), FadeIn(n200), run_time=1.0)
        self.insister(n200[:3], 0.3)

        x_txt = 0.3
        self.au_mot("120 sont")
        bdp = Brace(VGroup(*dp), DOWN, color=COUL_DP, buff=0.12)
        n120 = self.t("120", 32, COUL_DP).next_to(bdp, DOWN, buff=0.1)
        l1 = self.t("120 demi-pensionnaires", 34, COUL_DP)
        l1.move_to(P(x_txt + l1.width / 2, 1.3))
        self.play(*[d.animate.set_fill(COUL_DP).set_stroke(COUL_DP) for d in dp], GrowFromCenter(bdp),
                  FadeIn(n120), FadeIn(l1, shift=LEFT * 0.2), run_time=0.8)

        self.au_mot("45 font du sport")
        l2 = self.t("parmi eux, 45 font du sport", 32, VERT_OK)
        l2.move_to(P(x_txt + 0.5 + l2.width / 2, 0.7))
        self.play(LaggedStart(*[d.animate.set_fill(VERT_OK).set_stroke(COUL_DP, 4).scale(1.15) for d in dp[:45]],
                              lag_ratio=0.02), FadeIn(l2, shift=LEFT * 0.2), run_time=1.0)

        self.au_mot("80 externes")
        bext = Brace(VGroup(*ext), DOWN, color=COUL_EXT, buff=0.12)
        n80 = self.t("80", 32, COUL_EXT).next_to(bext, DOWN, buff=0.1)
        l3 = self.t("80 externes", 34, COUL_EXT)
        l3.move_to(P(x_txt + l3.width / 2, -0.3))
        self.play(*[d.animate.set_fill(COUL_EXT).set_stroke(COUL_EXT) for d in ext], GrowFromCenter(bext),
                  FadeIn(n80), FadeIn(l3, shift=LEFT * 0.2), run_time=0.8)

        self.au_mot("35 en font")
        l4 = self.t("35 en font", 32, VERT_OK)
        l4.move_to(P(x_txt + 0.5 + l4.width / 2, -0.9))
        self.play(LaggedStart(*[d.animate.set_fill(VERT_OK).set_stroke(COUL_EXT, 4).scale(1.15) for d in ext[:35]],
                              lag_ratio=0.025), FadeIn(l4, shift=LEFT * 0.2), run_time=1.0)
        self.attendre_voix()

    # ── 02 : le tableau croisé, case par case ───────────────────────────────

    def ecran_tableau(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-tableau")
        self.titre_ecran("Le tableau croisé")
        tb = self.tableau(P(-0.6, 0.1), 1.0, plein=False)
        self.au_mot("On range tout")
        self.play(FadeIn(tb.fonds, shift=UP * 0.2), run_time=0.7)

        def entre(m):
            return FadeIn(m, scale=1.4)

        # les nombres de l'écran 01 (dits par la voix) rejoignent leurs cases
        self.au_mot("demi-pensionnaires")
        self.play(entre(tb.lab[0]), run_time=0.5)
        self.au_mot("externes")
        self.play(entre(tb.lab[1]), run_time=0.5)
        self.au_mot("sport, pas")
        self.play(entre(tb.ent[0]), tb.poser(0, 0), tb.poser(1, 0), run_time=0.5)
        self.au_mot("pas sport")
        self.play(entre(tb.ent[1]), run_time=0.35)
        self.au_mot("Total")
        self.play(entre(tb.lab[2]), entre(tb.ent[2]), tb.poser(0, 2), tb.poser(1, 2), run_time=0.5)
        self.au_mot("200")
        self.play(tb.poser(2, 2), *tb.etat(cases=((2, 2),), eteindre=False), run_time=0.4)
        self.insister(tb.val[2][2], 0.3)
        self.attendre_voix()

    # ── 03 : sachant D → la LIGNE D s'allume ────────────────────────────────

    def ecran_definition(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-definition")
        self.titre_ecran("On choisit un demi-pensionnaire")
        tb = self.tableau(P(-0.6, 0.55))
        self.play(FadeIn(tb), run_time=0.5)
        self.au_mot("On choisit un demi")
        self.play(Indicate(tb.lab[0], color=COUL_DP, scale_factor=1.15), run_time=0.7)
        self.au_mot("Probabilité qu'il fasse")
        self.play(Indicate(tb.ent[0], color=VERT_OK, scale_factor=1.25), run_time=0.7)
        self.au_mot("on ne regarde plus")
        self.play(*tb.etat(lignes=(0,)), run_time=0.8)
        cadre = SurroundingRectangle(VGroup(tb.rect[1][0], tb.rect[1][3]), color=ANNEAU, buff=0.06, stroke_width=6)
        self.play(Create(cadre), run_time=0.5)
        self.au_mot("45 sur 120")
        f = frac(45, 120, 54, WHITE, VERT_OK, COUL_DP).move_to(P(-0.6, -2.25))
        self.play(TransformFromCopy(tb.val[0][0], f[0]), run_time=0.5)
        self.play(GrowFromCenter(f[1]), TransformFromCopy(tb.val[0][2], f[2]), run_time=0.5)
        self.insister(f, 0.35)
        self.attendre_voix()

    # ── 04 : la notation P_D(S) ─────────────────────────────────────────────

    def ecran_notation(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-notation")
        self.titre_ecran("La notation")
        tb = self.tableau(P(-3.3, 1.0), 0.6)
        lettres = tb.lettres(26)
        self.add(tb)
        self.au_mot("On note D")
        d1 = suite(lettre("D", 34, JAUNE_TITRE), self.t(": « être demi-pensionnaire »", 30), buff=0.15)
        d1.move_to(P(0.3 + d1.width / 2, 1.65))
        self.play(FadeIn(lettres[0:2], scale=1.5), FadeIn(d1, shift=LEFT * 0.2), run_time=0.6)
        self.au_mot("S : « faire")
        d2 = suite(lettre("S", 34, JAUNE_TITRE), self.t(": « faire du sport »", 30), buff=0.15)
        d2.move_to(P(0.3 + d2.width / 2, 0.9))
        self.play(FadeIn(lettres[2:4], scale=1.5), FadeIn(d2, shift=LEFT * 0.2), run_time=0.6)

        self.au_mot("P indice D de S")
        pds = p_cond("D", "S", 56, WHITE, JAUNE_TITRE, VERT_OK)
        pds.move_to(P(-6.2 + pds.width / 2, -1.15))
        self.play(Write(pds), *tb.etat(lignes=(0,)), run_time=0.8)
        self.play(Indicate(pds[1], color=JAUNE_TITRE, scale_factor=1.6), run_time=0.6)
        self.au_mot("probabilité de S sachant D")
        lu = suite(self.t("probabilité de", 30), lettre("S", 30, VERT_OK), self.t("sachant", 30, JAUNE_TITRE),
                   lettre("D", 30, JAUNE_TITRE), buff=0.14)
        lu.next_to(pds, DOWN, buff=0.45).align_to(pds, LEFT)
        self.play(FadeIn(lu, shift=UP * 0.15), run_time=0.5)
        self.au_mot("égale 45 sur 120")
        eg = self.t("=", 52).next_to(pds, RIGHT, buff=0.3)
        f = frac(45, 120, 46, WHITE, VERT_OK, COUL_DP).next_to(eg, RIGHT, buff=0.3)
        self.play(FadeIn(eg), TransformFromCopy(tb.val[0][0], f[0]), GrowFromCenter(f[1]),
                  TransformFromCopy(tb.val[0][2], f[2]), run_time=0.7)
        self.au_mot("0,375")
        eg2 = self.t("=", 52).next_to(f, RIGHT, buff=0.3)
        r = self.t("0,375", 52, VERT_OK).next_to(eg2, RIGHT, buff=0.3)
        self.play(FadeIn(eg2), FadeIn(r, scale=0.6), run_time=0.5)
        self.play(r.animate.scale(1.4, about_edge=LEFT), run_time=0.35)
        self.play(r.animate.scale(1 / 1.4, about_edge=LEFT), run_time=0.35)
        self.attendre_voix()

    # ── 05 : la formule, et le PONT tableau → arbre ─────────────────────────

    def p_de(self, contenu, fs=40, color=WHITE):
        """« P(D ∩ S) », « P(D) » : un seul Text."""
        return self.t(f"P({contenu})", fs, color)

    def ecran_formule(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-formule")
        self.titre_ecran("La formule")
        tb = self.tableau(P(-3.9, -2.05), 0.55)
        arbre = ArbrePondere(fs=30).scale(0.8)
        arbre.move_to(P(3.95, 0.45))
        self.play(FadeIn(tb), FadeIn(arbre), run_time=0.6)

        self.au_mot("P indice D de S égale")
        pds = p_cond("D", "S", 46, WHITE, JAUNE_TITRE, VERT_OK)
        eg = self.t("=", 46)
        haut = self.p_de("D ∩ S", 40)
        bas = self.p_de("D", 40)
        fr_ = frac_obj(haut, bas)
        ligne1 = suite(pds, eg, fr_, buff=0.25)
        ligne1.move_to(P(-6.5 + ligne1.width / 2, 1.75))
        self.play(Write(pds), FadeIn(eg), run_time=0.6)
        self.au_mot("P de D inter S")
        self.play(FadeIn(haut, shift=DOWN * 0.15), *tb.etat(cases=((0, 0),)), run_time=0.5)
        self.au_mot("divisé par P de D")
        self.play(GrowFromCenter(fr_[1]), FadeIn(bas, shift=UP * 0.15), *tb.etat(cases=((0, 2),)), run_time=0.5)

        self.au_mot("45 sur 200")
        eg2 = self.t("=", 44)
        f1 = frac(45, 200, 34, WHITE, VERT_OK)
        div = self.t("÷", 44)
        f2 = frac(120, 200, 34, WHITE, COUL_DP)
        eg3 = self.t("=", 44)
        f3 = frac(45, 120, 34, WHITE, VERT_OK, COUL_DP)
        ligne2 = suite(eg2, f1, div, f2, eg3, f3, buff=0.25)
        ligne2.next_to(ligne1, DOWN, buff=0.45).align_to(ligne1, LEFT).shift(RIGHT * 0.3)
        self.play(FadeIn(eg2), TransformFromCopy(tb.val[0][0], f1[0]), GrowFromCenter(f1[1]),
                  TransformFromCopy(tb.val[2][2], f1[2]), *tb.etat(cases=((0, 0), (2, 2))), run_time=0.6)
        self.au_mot("divisé par 120 sur 200")
        self.play(FadeIn(div), TransformFromCopy(tb.val[0][2], f2[0]), GrowFromCenter(f2[1]),
                  TransformFromCopy(tb.val[2][2], f2[2]), *tb.etat(cases=((0, 2), (2, 2))), run_time=0.6)
        # le pont : 120/200 se pose sur la branche D
        b0 = arbre.sur_branche(0, frac(120, 200, 22, PROBA, sw=2.0), buff=0.06)
        self.play(TransformFromCopy(f2, b0), run_time=0.7)

        self.au_mot("on retrouve 45 sur 120")
        self.play(FadeIn(eg3), FadeIn(f3, scale=0.6), *tb.etat(cases=((0, 0), (0, 2)), eteindre=True), run_time=0.5)
        b2 = arbre.sur_branche(2, frac(45, 120, 22, PROBA, sw=2.0), buff=0.06)
        self.play(TransformFromCopy(f3, b2), run_time=0.6)
        self.play(*arbre.chemin([0, 2]), *arbre.eteindre_sauf([0, 2]), run_time=0.5)
        bout = pastille("45", 26).next_to(arbre.lab_feuilles[0], RIGHT, buff=0.3)
        self.play(TransformFromCopy(tb.val[0][0], bout), *tb.etat(cases=((0, 0),)), run_time=0.7)
        self.insister(bout, 0.3)
        self.attendre_voix()

    # ── 06 : le piège : diviser par 200 ─────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        tb = self.tableau(P(-3.4, 1.05), 0.62)
        self.add(tb)
        self.au_mot("diviser par 200")
        faux = self.t("÷ 200 ?", 56, ROUGE_ERREUR).move_to(P(3.2, 1.3))
        self.play(FadeIn(faux, scale=0.6), *tb.etat(cases=((2, 2),)), run_time=0.5)
        self.insister(faux, 0.3)

        self.au_mot("45 sur 200, c'est")
        fa = frac(45, 200, 44, WHITE, VERT_OK)
        ega = self.t("=", 44)
        pinter = self.p_de("D ∩ S", 44, ORANGE_RETENUE)
        la = suite(fa, ega, pinter, buff=0.3)
        la.move_to(P(-6.3 + la.width / 2, -1.05))
        self.play(TransformFromCopy(tb.val[0][0], fa[0]), GrowFromCenter(fa[1]),
                  TransformFromCopy(tb.val[2][2], fa[2]), *tb.etat(cases=((0, 0), (2, 2))), run_time=0.6)
        self.au_mot("P de D inter S")
        self.play(FadeIn(ega), Write(pinter), run_time=0.5)
        self.au_mot("demi-pensionnaire ET sportif")
        r_lig = SurroundingRectangle(VGroup(tb.rect[1][0], tb.rect[1][3]), color=COUL_DP, buff=0.04, stroke_width=5)
        r_col = SurroundingRectangle(VGroup(tb.rect[0][1], tb.rect[3][1]), color=VERT_OK, buff=0.04, stroke_width=5)
        et = self.ligne_et().next_to(la, RIGHT, buff=0.4)
        self.play(Create(r_lig), Create(r_col), *tb.etat(cases=((0, 0),)), FadeIn(et, shift=LEFT * 0.2), run_time=0.7)
        self.insister(tb.val[0][0], 0.3)

        self.au_mot("Sachant D")
        self.play(FadeOut(r_lig), FadeOut(r_col), *tb.etat(lignes=(0,)),
                  Create(Line(faux.get_corner(DL), faux.get_corner(UR), color=ROUGE_ERREUR, stroke_width=7)),
                  run_time=0.6)
        pds = p_cond("D", "S", 44, WHITE, JAUNE_TITRE, VERT_OK)
        egb = self.t("=", 44)
        fb = frac(45, 120, 44, WHITE, VERT_OK, COUL_DP)
        lb = suite(pds, egb, fb, buff=0.3)
        lb.move_to(P(-6.3 + lb.width / 2, -2.55))
        self.play(Write(pds), FadeIn(egb), TransformFromCopy(tb.val[0][0], fb[0]), GrowFromCenter(fb[1]),
                  run_time=0.6)
        self.au_mot("l'effectif de D")
        self.play(TransformFromCopy(tb.val[0][2], fb[2]), run_time=0.5)
        self.insister(fb[2], 0.3)
        ok = self.coche().next_to(lb, RIGHT, buff=0.4)
        self.play(Create(ok), run_time=0.3)
        self.attendre_voix()

    def ligne_et(self):
        return suite(self.t("demi-pensionnaire", 30, COUL_DP), self.t("ET", 34, JAUNE_TITRE),
                     self.t("sportif", 30, VERT_OK), buff=0.18)

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        tb = self.tableau(P(-0.6, 0.75), 0.9)
        lettres = tb.lettres(30)
        self.play(FadeIn(tb), FadeIn(lettres), run_time=0.5)
        self.au_mot("Probabilité qu'un externe")
        q = suite(self.t("Probabilité qu'un", 36), self.t("externe", 36, COUL_EXT), self.t("fasse du", 36),
                  self.t("sport", 36, VERT_OK), self.t("?", 36), buff=0.18)
        q.move_to(P(-0.6, -1.4))
        self.play(FadeIn(q, shift=UP * 0.15), Indicate(tb.lab[1], color=COUL_EXT, scale_factor=1.2), run_time=0.7)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        tb = self.tableau(P(-0.6, 1.0), 0.8)
        lettres = tb.lettres(28)
        self.add(tb, lettres)
        self.au_mot("Sachant D barre")
        pdb = p_cond("D", "S", 60, WHITE, JAUNE_TITRE, VERT_OK, barre_cond=True)
        pdb.move_to(P(-4.4, -1.75))
        self.play(Write(pdb), Indicate(lettres[1], color=JAUNE_TITRE, scale_factor=1.6), run_time=0.8)
        self.au_mot("chez les externes")
        self.play(*tb.etat(lignes=(1,)), run_time=0.7)
        self.au_mot("on regarde leur ligne")
        cadre = SurroundingRectangle(VGroup(tb.rect[2][0], tb.rect[2][3]), color=ANNEAU, buff=0.05, stroke_width=6)
        self.play(Create(cadre), run_time=0.5)
        self.au_mot("35 sur 80")
        eg = self.t("=", 56).next_to(pdb, RIGHT, buff=0.3)
        f = frac(35, 80, 50, WHITE, VERT_OK, COUL_EXT).next_to(eg, RIGHT, buff=0.3)
        self.play(FadeIn(eg), TransformFromCopy(tb.val[1][0], f[0]), GrowFromCenter(f[1]),
                  TransformFromCopy(tb.val[1][2], f[2]), run_time=0.7)
        self.au_mot("0,4375")
        eg2 = self.t("=", 56).next_to(f, RIGHT, buff=0.3)
        r = self.t("0,4375", 56, VERT_OK).next_to(eg2, RIGHT, buff=0.3)
        self.play(FadeIn(eg2), FadeIn(r, scale=0.6), run_time=0.5)
        self.play(r.animate.scale(1.4, about_edge=LEFT), run_time=0.35)
        self.play(r.animate.scale(1 / 1.4, about_edge=LEFT), run_time=0.35)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 38
        l1 = suite(p_cond("A", "B", fs + 4, WHITE, JAUNE_TITRE, VERT_OK),
                   self.t(": probabilité de B quand on sait que A est réalisé", fs), buff=0.15)
        l2 = self.t("On se place dans A :", fs)
        l3 = self.t("on divise par l'effectif de A, ou par P(A)", fs)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.55)
        if lignes.width > 11.6:
            lignes.scale_to_fit_width(11.6)
        lignes.move_to(P(-0.8, 0.2))
        for mot, l in zip(["P indice A de B", "On se place dans A", "on divise par l'effectif de A"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode 2")
        self.play(Write(self.chute("Épisode 2 : traduire « parmi » et « sachant que »", color=VERT_OK,
                                   font_size=34)))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_tableau()
        self.ecran_definition()
        self.ecran_notation()
        self.ecran_formule()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
