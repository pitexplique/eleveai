# proba2_tableau_croise.py
# EleveAI — Maths 2de — série « Probabilités », épisode 11 : lire une
# probabilité conditionnelle sur un TABLEAU CROISÉ (micro : proba_tableau_croise),
# AVEC VOIX. Paysage 16:9, CEINTURE BLEUE. Short jumeau :
# proba2_tableau_croise_short.py (ceinture orange : « 25 % … donc 25 % ? »).
#
# Écrans : 00 garde · 01 les 200 barquettes de letchis (Saint-André 120,
# Saint-Paul ; abîmées 30 et 20) · 02 le tableau se remplit au fil de la voix
# (120 et 80 ; 50 et 150 ; 200) · 03 sachant Saint-André : la LIGNE s'allume,
# 30/120 = 0,25 · 04 sachant abîmée : la COLONNE s'allume, 30/50 = 0,6 ·
# 05 une CASE seule sur le total : 30/200 = P(A ∩ B) · 06 le piège : la ligne
# et la colonne côte à côte, 0,25 ≠ 0,6 · 07 défi (Saint-Paul) · 07b
# correction 20/80 = 0,25 · 08 ce que tu as appris · 09 fin.
#
# ⭐ Canvas du coach repris : tableau_donnees (lib/tutor-v4/components/
# TableauDonneesCanvas.tsx, généré par tableau() de probabilites-conditionnelles
# .bank.ts) : en-tête ardoise #1E293B à texte blanc (« critère B, non B,
# Total »), colonne des libellés bleu ciel #E0F2FE (« A, non A, Total »),
# cases blanches, case allumée jaune #FEF08A cerclée #EAB308.
# ⛔ PAS D'ÉCART : les cases « Correcte » de Saint-André et Saint-Paul ne sont
# jamais dites : elles restent VIDES.
#
# Voix : manim/voix/seconde-proba-tableau-croise.json (débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/seconde/proba2_tableau_croise.py Proba2TableauCroise -o eleveai-maths-seconde-proba-tableau-croise --media_dir manim/scripts/seconde/media
# Puis copier le mp4 dans manim/sorties/seconde/maths/probabilites/11-tableau-croise/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

# Les couleurs du coach (TableauDonneesCanvas)
ENTETE = "#1E293B"      # slate-800 : la ligne d'en-tête
LIBELLE = "#E0F2FE"     # sky-100 : la colonne des libellés
ENCRE = "#0F172A"       # le texte sombre des cases
BORD = "#CBD5E1"        # slate-300 : les traits du tableau
SURLIGNE = "#FEF08A"    # yellow-200 : la case allumée
ANNEAU = "#EAB308"      # yellow-500 : son anneau
ETEINT = 0.22
LETCHI = "#E11D48"      # une barquette saine (rouge letchi)
ABIME = "#B45309"       # une barquette abîmée (brun)
ABIME_TXT = "#F59E0B"   # le mot « abîmées » (lisible sur le fond sombre)
COUL_LIG = "#F97316"    # la LIGNE (orange)
COUL_COL = "#38BDF8"    # la COLONNE (bleu ciel)


class NotionSeconde11(Notion6e):
    identite = "Maths 2de — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


def frac(n, d, fs=40, color=WHITE, color_n=None, color_d=None, sw=3.0):
    """Une fraction écrite (sans LaTeX) : numérateur, barre, dénominateur."""
    tn = Text(str(n), font_size=fs, color=color_n or color)
    td = Text(str(d), font_size=fs, color=color_d or color)
    larg = max(tn.width, td.width) + 0.14
    barre = Line(LEFT * larg / 2, RIGHT * larg / 2, color=color, stroke_width=sw)
    return VGroup(tn, barre, td).arrange(DOWN, buff=0.08)


def suite(*objs, buff=0.18):
    return VGroup(*objs).arrange(RIGHT, buff=buff)


def barquette(larg=1.4, color=LETCHI):
    """Une barquette de letchis : le bac vert clair, quatre letchis dessus."""
    bac = Polygon(P(-larg / 2, 0), P(larg / 2, 0), P(larg * 0.42, -larg * 0.32), P(-larg * 0.42, -larg * 0.32),
                  fill_color="#86EFAC", fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    r = larg * 0.13
    fruits = VGroup(*[Circle(radius=r, fill_color=color, fill_opacity=1, stroke_color="#7F1D1D", stroke_width=2)
                      .move_to(P(x * larg, r * 0.6 + (0.06 * larg if k % 2 else 0)))
                      for k, x in enumerate((-0.3, -0.1, 0.1, 0.3))])
    picots = VGroup(*[Dot(f.get_center() + P(dx * r * 0.45, dy * r * 0.45), radius=r * 0.12, color="#FDA4AF")
                      for f in fruits for dx, dy in ((-1, 0.5), (0.6, 0.6), (0, -0.6))])
    return VGroup(fruits, picots, bac)


# ── le TABLEAU CROISÉ du coach (tableau_donnees) ────────────────────────────

LIGNES = ["Saint-André", "Saint-Paul", "Total"]
COLONNES = ["Abîmée", "Correcte", "Total"]
# ⛔ PAS D'ÉCART : seuls les nombres que la voix DIT ; les cases jamais dites restent vides.
VALEURS = [[30, None, 120], [20, None, 80], [50, 150, 200]]


class TableauCroise(VGroup):
    """Lignes : Saint-André / Saint-Paul / Total ; colonnes : Abîmée / Correcte /
    Total. Les cases de valeurs sont VIDES au départ : `poser(i, j)` y écrit
    le nombre. (Repris de manim/scripts/premiere/proba_pc_conditionnelle.py.)"""

    def __init__(self, lignes=LIGNES, colonnes=COLONNES, valeurs=VALEURS, larg_lab=3.2, larg=2.0,
                 h=0.78, h_ent=0.7, fs=28, **kw):
        super().__init__(**kw)
        xs = [larg_lab / 2] + [larg_lab + larg * (j + 0.5) for j in range(len(colonnes))]
        ws = [larg_lab] + [larg] * len(colonnes)
        ys = [-h_ent / 2] + [-h_ent - h * (i + 0.5) for i in range(len(lignes))]
        hs = [h_ent] + [h] * len(lignes)
        self.rect = [[None] * (len(colonnes) + 1) for _ in range(len(lignes) + 1)]
        fonds, textes = VGroup(), VGroup()
        for r in range(len(lignes) + 1):
            for c in range(len(colonnes) + 1):
                coul = ENTETE if r == 0 else (LIBELLE if c == 0 else WHITE)
                rc = Rectangle(width=ws[c], height=hs[r], fill_color=coul, fill_opacity=1,
                               stroke_color=BORD, stroke_width=2).move_to(P(xs[c], ys[r]))
                self.rect[r][c] = rc
                fonds.add(rc)
        self.ent, self.lab = [], []
        for c, nom in enumerate(colonnes):
            t = Text(nom, font_size=fs, color=WHITE, weight=BOLD).move_to(self.rect[0][c + 1])
            if t.width > larg - 0.12:
                t.scale_to_fit_width(larg - 0.12)
            self.ent.append(t)
            textes.add(t)
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

    def visibles(self):
        """Ce qu'on peut afficher d'un coup : le quadrillage, les libellés et
        les seuls nombres déjà posés (les autres restent hors de la scène)."""
        return VGroup(self.fonds, self.textes,
                      *[self.val[i][j] for (i, j) in sorted(self.posees)])

    def ligne_rect(self, i):
        return VGroup(self.rect[i + 1][0], self.rect[i + 1][-1])

    def colonne_rect(self, j):
        return VGroup(self.rect[0][j + 1], self.rect[-1][j + 1])

    def etat(self, lignes=(), colonnes=(), cases=(), eteindre=True):
        """Allume des lignes, des colonnes, des cases (jaune, comme le coach)
        et estompe le reste. Sans argument : tout revient à la normale."""
        rien = not (lignes or colonnes or cases)
        anims = []
        for i in range(len(self.val)):
            for j in range(len(self.val[i])):
                on = i in lignes or j in colonnes or (i, j) in cases
                rc = self.case(i, j)
                if rien:
                    anims.append(rc.animate.set_fill(WHITE, 1).set_stroke(BORD, 2, opacity=1).set_z_index(0))
                elif on:
                    anims.append(rc.animate.set_fill(SURLIGNE, 1).set_stroke(ANNEAU, 5, opacity=1).set_z_index(1))
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


def tableau(centre=ORIGIN, echelle=1.0, plein=True, **kw):
    """Le tableau du coach, centré ; plein=True : tous les nombres dits posés."""
    tb = TableauCroise(**kw)
    if plein:
        tb.tout_poser()
    tb.scale(echelle).move_to(centre)
    return tb


# ── la vidéo ────────────────────────────────────────────────────────────────

C_TAB = P(-0.9, 0.95)      # le tableau des écrans de lecture (en haut)
E_TAB = 0.8


class Proba2TableauCroise(NotionSeconde11):
    nom_voix = "seconde-proba-tableau-croise"

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

    def cadre_ligne(self, tb, i, color=COUL_LIG):
        return SurroundingRectangle(tb.ligne_rect(i), color=color, buff=0.04, stroke_width=6)

    def cadre_colonne(self, tb, j, color=COUL_COL):
        return SurroundingRectangle(tb.colonne_rect(j), color=color, buff=0.04, stroke_width=6)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Le tableau croisé", 56, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.75))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=1.0)
        tb = tableau(P(-0.6, 0.2), 0.62, plein=False)
        self.play(FadeIn(tb.fonds, scale=0.9), FadeIn(tb.textes), run_time=0.6)
        self.au_mot("lire une probabilité")
        sous = self.t("lire une probabilité conditionnelle", 32).next_to(tb, DOWN, buff=0.3)
        self.play(FadeIn(sous, shift=UP * 0.15), *tb.etat(lignes=(0,)), run_time=0.6)
        self.play(*tb.etat(colonnes=(0,)), run_time=0.5)
        self.attendre_voix(marge=1.0)

    # ── 01 : les 200 barquettes ─────────────────────────────────────────────

    def grille(self, ncol, nrow=10, c=0.27):
        """Une barquette = un petit carré rouge letchi ; rangées de bas en haut."""
        g = VGroup()
        for r in range(nrow):
            for k in range(ncol):
                g.add(RoundedRectangle(width=c * 0.8, height=c * 0.8, corner_radius=c * 0.18,
                                       fill_color=LETCHI, fill_opacity=1, stroke_width=0)
                      .move_to(P(k * c, r * c)))
        return g

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Au marché : des letchis")
        ga, gb = self.grille(12), self.grille(8)
        ga.move_to(P(-4.55, -0.35))
        gb.next_to(ga, RIGHT, buff=0.55).align_to(ga, DOWN)
        tout = VGroup(ga, gb)
        bq = barquette(1.5).move_to(P(1.95, 1.75))
        self.au_mot("Un vendeur")
        self.play(FadeIn(bq, shift=DOWN * 0.3), run_time=0.5)
        self.au_mot("200 barquettes")
        n200 = self.ligne([("200", JAUNE_TITRE), ("barquettes", WHITE)], 38, 0.18).next_to(bq, RIGHT, buff=0.35)
        self.play(LaggedStart(*[FadeIn(x, scale=0.3) for x in tout], lag_ratio=0.004), FadeIn(n200), run_time=1.2)
        self.insister(n200[0], 0.3)
        x0 = 1.2
        self.au_mot("120 viennent")
        ca = SurroundingRectangle(ga, color=COUL_LIG, buff=0.1, stroke_width=4)
        la = self.t("Saint-André", 28, COUL_LIG).next_to(ca, UP, buff=0.12)
        r1 = self.ligne([("Saint-André :", COUL_LIG), ("120", WHITE)], 34, 0.18)
        r1.move_to(P(0, 0.3)).align_to(P(x0, 0), LEFT)
        self.play(Create(ca), FadeIn(la), FadeIn(r1, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("les autres de Saint-Paul")
        cb = SurroundingRectangle(gb, color=COUL_COL, buff=0.1, stroke_width=4)
        lb = self.t("Saint-Paul", 28, COUL_COL).next_to(cb, UP, buff=0.12)
        r2 = self.ligne([("Saint-Paul :", COUL_COL), ("les autres", WHITE)], 34, 0.18)
        r2.move_to(P(0, -1.05)).align_to(r1, LEFT)
        self.play(Create(cb), FadeIn(lb), FadeIn(r2, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("30 barquettes")
        ab_a = VGroup(*ga[:30])
        r3 = self.ligne([("30", WHITE), ("abîmées", ABIME_TXT)], 32, 0.18)
        r3.next_to(r1, DOWN, buff=0.2).align_to(r1, LEFT).shift(RIGHT * 0.5)
        self.play(LaggedStart(*[x.animate.set_fill(ABIME) for x in ab_a], lag_ratio=0.03),
                  FadeIn(r3, shift=RIGHT * 0.2), run_time=1.0)
        self.au_mot("et 20 de Saint-Paul")
        ab_b = VGroup(*gb[:20])
        r4 = self.ligne([("20", WHITE), ("abîmées", ABIME_TXT)], 32, 0.18)
        r4.next_to(r2, DOWN, buff=0.2).align_to(r2, LEFT).shift(RIGHT * 0.5)
        self.play(LaggedStart(*[x.animate.set_fill(ABIME) for x in ab_b], lag_ratio=0.04),
                  FadeIn(r4, shift=RIGHT * 0.2), run_time=0.9)
        self.insister(VGroup(ab_a, ab_b), 0.3, 1.08)
        self.attendre_voix()

    # ── 02 : le tableau se remplit ──────────────────────────────────────────

    def ecran_tableau(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-tableau")
        self.titre_ecran("Le tableau croisé")
        tb = tableau(P(-0.9, -0.2), 1.0, plein=False)
        self.play(FadeIn(tb.fonds, shift=UP * 0.2), run_time=0.6)

        def entre(m):
            return FadeIn(m, scale=1.4)

        self.au_mot("en ligne")
        self.play(entre(tb.lab[0]), run_time=0.4)
        self.au_mot("Saint-Paul")
        self.play(entre(tb.lab[1]), run_time=0.4)
        self.au_mot("abîmée ou")
        # 30 et 20 : dits à l'écran 01, ils rejoignent la colonne des abîmées
        self.play(entre(tb.ent[0]), tb.poser(0, 0), tb.poser(1, 0), run_time=0.5)
        self.au_mot("correcte")
        self.play(entre(tb.ent[1]), run_time=0.4)
        self.au_mot("Totaux")
        self.play(entre(tb.lab[2]), entre(tb.ent[2]), run_time=0.4)
        self.au_mot("120 et 80")
        self.play(tb.poser(0, 2), run_time=0.35)
        self.au_mot("80 ;")
        self.play(tb.poser(1, 2), run_time=0.35)
        self.au_mot("50 et 150")
        self.play(tb.poser(2, 0), run_time=0.35)
        self.au_mot("150 ;")
        self.play(tb.poser(2, 1), run_time=0.35)
        self.au_mot("total 200")
        self.play(tb.poser(2, 2), *tb.etat(cases=((2, 2),), eteindre=False), run_time=0.45)
        self.insister(tb.val[2][2], 0.3)
        self.attendre_voix()

    # ── 03 : sachant Saint-André → la LIGNE ─────────────────────────────────

    def calcul(self, tete, num, den, res, y, color=COUL_LIG, x0=-5.8):
        """La ligne « tête  num/den = res », placée (rien n'est encore joué)."""
        f = frac(num, den, 46, WHITE, WHITE, color)
        eg = self.t("=", 46)
        r = self.t(res, 50, VERT_OK)
        lg = suite(tete, f, eg, r, buff=0.3)
        lg.move_to(P(0, y)).align_to(P(x0, 0), LEFT)
        return lg

    def lire(self, tb, lg, c_num, c_den, au_frac, au_res):
        """Le numérateur et le dénominateur sortent de leurs cases, puis le résultat."""
        _, f, eg, r = lg
        self.au_mot(au_frac)
        self.play(TransformFromCopy(tb.val[c_num[0]][c_num[1]], f[0]), GrowFromCenter(f[1]), run_time=0.45)
        self.play(TransformFromCopy(tb.val[c_den[0]][c_den[1]], f[2]), run_time=0.45)
        self.insister(f[2], 0.3)
        self.au_mot(au_res)
        self.play(FadeIn(eg), FadeIn(r, scale=0.5), run_time=0.4)
        self.play(Create(SurroundingRectangle(r, color=VERT_OK, buff=0.12)), run_time=0.3)

    def ecran_ligne(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-ligne")
        self.titre_ecran("Sachant une ligne")
        tb = tableau(C_TAB, E_TAB)
        self.add(tb)
        self.au_mot("Sachant que")
        tete = self.t("Sachant Saint-André :", 36, COUL_LIG)
        lg = self.calcul(tete, 30, 120, "0,25", -1.55)
        self.play(Indicate(tb.lab[0], color=COUL_LIG, scale_factor=1.3), Write(tete), run_time=0.7)
        self.au_mot("on lit sa ligne")
        self.play(*tb.etat(lignes=(0,)), Create(self.cadre_ligne(tb, 0)), run_time=0.6)
        self.lire(tb, lg, (0, 0), (0, 2), "30 sur 120", "0,25")
        self.attendre_voix()

    # ── 04 : sachant abîmée → la COLONNE ────────────────────────────────────

    def ecran_colonne(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-colonne")
        self.titre_ecran("Sachant une colonne")
        tb = tableau(C_TAB, E_TAB)
        self.add(tb)
        self.au_mot("Sachant que")
        tete = self.t("Sachant abîmée :", 36, COUL_COL)
        lg = self.calcul(tete, 30, 50, "0,6", -1.35, color=COUL_COL)
        self.au_mot("est abîmée")
        self.play(Indicate(tb.ent[0], color=COUL_COL, scale_factor=1.3), Write(tete), run_time=0.7)
        self.au_mot("on lit sa colonne")
        self.play(*tb.etat(colonnes=(0,)), Create(self.cadre_colonne(tb, 0)), run_time=0.6)
        self.lire(tb, lg, (0, 0), (2, 0), "30 sur 50", "0,6")
        self.au_mot("60 %")
        pc = self.ligne([("60 %", VERT_OK), ("des abîmées viennent de", WHITE), ("Saint-André", COUL_LIG)], 32, 0.18)
        pc.move_to(P(0, -2.75)).align_to(P(-5.8, 0), LEFT)
        self.play(FadeIn(pc, shift=UP * 0.15), *tb.etat(cases=((0, 0),), colonnes=(0,)), run_time=0.5)
        self.insister(pc[0], 0.3)
        self.attendre_voix()

    # ── 05 : une case seule, sur le grand total ─────────────────────────────

    def ecran_case(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-case")
        self.titre_ecran("Une case sur le total")
        tb = tableau(C_TAB, E_TAB)
        self.add(tb)
        self.au_mot("une case seule")
        self.play(*tb.etat(cases=((0, 0),)), run_time=0.6)
        self.insister(tb.val[0][0], 0.3)
        self.au_mot("sur le total")
        self.play(*tb.etat(cases=((0, 0), (2, 2))), run_time=0.5)
        f = frac(30, 200, 46, WHITE, WHITE, VERT_OK)
        eg = self.t("=", 46)
        pab = self.t("P(A ∩ B)", 50, JAUNE_TITRE)
        lg = suite(f, eg, pab, buff=0.3).move_to(P(0, -1.5)).align_to(P(-5.8, 0), LEFT)
        self.au_mot("30 sur 200")
        self.play(TransformFromCopy(tb.val[0][0], f[0]), GrowFromCenter(f[1]), run_time=0.45)
        self.play(TransformFromCopy(tb.val[2][2], f[2]), run_time=0.45)
        self.insister(f[2], 0.3)
        self.au_mot("P de A inter B")
        la = self.t("A", 40, JAUNE_TITRE).next_to(tb.rect[1][0], LEFT, buff=0.18)
        lb = self.t("B", 40, JAUNE_TITRE).next_to(tb.rect[0][1], UP, buff=0.1)
        self.play(FadeIn(eg), Write(pab), FadeIn(la, scale=0.5), FadeIn(lb, scale=0.5), run_time=0.6)
        self.insister(pab, 0.3, 1.3)
        self.au_mot("sans condition")
        sc = self.t("sans condition", 36, VERT_OK).next_to(lg, RIGHT, buff=0.5)
        self.play(FadeIn(sc, shift=LEFT * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 06 : le piège : la ligne et la colonne côte à côte ──────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        tg = tableau(P(-3.5, 0.55), 0.6)
        td = tableau(P(2.4, 0.55), 0.6)
        self.au_mot("confondre la ligne")
        cg = self.t("la ligne", 36, COUL_LIG).next_to(tg, UP, buff=0.25)
        self.play(FadeIn(tg), FadeIn(cg), run_time=0.5)
        self.play(*tg.etat(lignes=(0,)), Create(self.cadre_ligne(tg, 0)), run_time=0.5)
        self.au_mot("et la colonne")
        cd = self.t("la colonne", 36, COUL_COL).next_to(td, UP, buff=0.25).align_to(cg, UP)
        self.play(FadeIn(td), FadeIn(cd), run_time=0.5)
        self.play(*td.etat(colonnes=(0,)), Create(self.cadre_colonne(td, 0)), run_time=0.5)
        self.au_mot("0,25 et")
        vg = self.t("0,25", 60, VERT_OK).next_to(tg, DOWN, buff=0.4)
        self.play(FadeIn(vg, scale=0.5), run_time=0.4)
        self.au_mot("et 0,6")
        vd = self.t("0,6", 60, VERT_OK).next_to(td, DOWN, buff=0.4).set_y(vg.get_y())
        self.play(FadeIn(vd, scale=0.5), run_time=0.4)
        diff = self.t("≠", 80, ROUGE_ERREUR).move_to((vg.get_center() + vd.get_center()) / 2)
        self.play(FadeIn(diff, scale=0.4), run_time=0.3)
        self.au_mot("deux questions")
        q = self.t("deux questions différentes", 40, JAUNE_TITRE).move_to(P(-0.8, -2.35))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.45)
        self.insister(diff, 0.3)
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        tb = tableau(C_TAB, E_TAB)
        self.play(FadeIn(tb), run_time=0.5)
        self.au_mot("Saint-Paul")
        self.play(Indicate(tb.lab[1], color=COUL_COL, scale_factor=1.3), run_time=0.6)
        self.au_mot("est abîmée")
        self.play(Indicate(tb.ent[0], color=ABIME_TXT, scale_factor=1.3), run_time=0.6)
        q = self.ligne([("Parmi Saint-Paul :", WHITE), ("abîmées", ABIME_TXT), ("?", ORANGE_RETENUE)], 40, 0.25)
        q[2].scale(1.5)
        q.move_to(P(-0.9, -1.15))
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
        tb = tableau(C_TAB, E_TAB)
        self.add(tb)
        self.au_mot("Ligne de Saint-Paul")
        tete = self.t("Ligne de Saint-Paul :", 36, COUL_LIG)
        lg = self.calcul(tete, 20, 80, "0,25", -1.55)
        self.play(*tb.etat(lignes=(1,)), Create(self.cadre_ligne(tb, 1)), Write(tete), run_time=0.7)
        self.lire(tb, lg, (1, 0), (1, 2), "20 sur 80", "0,25")
        self.insister(lg[3], 0.3)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 36
        l1 = self.ligne([("Sachant une ligne :", COUL_LIG), ("÷ le total de la ligne", WHITE)], fs, 0.2)
        l2 = self.ligne([("Sachant une colonne :", COUL_COL), ("÷ le total de la colonne", WHITE)], fs, 0.2)
        l3 = self.ligne([("Une case ÷ le grand total :", WHITE), ("une intersection", JAUNE_TITRE)], fs, 0.2)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.55)
        if lignes.width > 10.6:
            lignes.scale_to_fit_width(10.6)
        lignes.move_to(P(-0.9, 0.6))
        for mot, l in zip(["Sachant une ligne", "Sachant une colonne", "Une case"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.5)
            self.play(Create(l[0]), run_time=0.3)
        self.au_mot("L'épisode 12")
        self.play(Write(self.chute("Épisode 12 : les faux positifs", color=VERT_OK, font_size=36)))
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
        self.ecran_tableau()
        self.ecran_ligne()
        self.ecran_colonne()
        self.ecran_case()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
