# proba_bern_repetition.py
# EleveAI — Maths STMG ET Maths 1re (tronc commun) — série « Probabilités » :
# RÉPÉTER UNE ÉPREUVE, identique et indépendante (micros :
# probaI_arbre_deux_epreuves en STMG, alea_bern_repetition en 1re), AVEC VOIX.
# Paysage 16:9, CEINTURE BLEUE. Short jumeau : proba_bern_repetition_short.py
# (ceinture jaune, l'arbre des trois lancers qui pousse 2 → 4 → 8).
#
# ⭐⭐ UNE voix, UN script, DEUX rendus (Frédéric, 18/10 : « pour vendre en
# pack ») : ProbaBernRepetitionBase porte toutes les scènes ; les deux
# sous-classes ne changent que l'identité. La voix ne cite aucune classe.
#
# ⭐ La figure est l'ARBRE PONDÉRÉ du coach (`canvasArbre(ctx, p, p, p, …)` de
# probaI_arbre_deux_epreuves : les MÊMES nombres au second niveau ; carte
# blanche, branches grises, probabilités en bleu). Le motif du premier tir se
# COPIE après S et après S barre : c'est la marque de la répétition.
#
# Écrans : 00 garde · 01 la joueuse de basket, deux lancers francs, 0,7 · 02
# deux étiquettes « identiques » / « indépendantes » · 03 l'arbre : S 0,7 / S
# barre 0,3, puis le même motif copié après S et après S barre · 04 les 4
# chemins au bout · 05 le piège : 0,5 au deuxième tir (plus identiques), sans
# remise (plus indépendantes) · 06 défi (3 lancers de pièce) · 06b correction
# (l'arbre qui se dédouble, 2 × 2 × 2 = 8) · 07 ce que tu as appris · 08 fin
# (règle du 19/10 : eleveai.fr + @eleveai974).
#
# Voix : manim/voix/stmg-premiere-proba-bern-repetition.json (Julie, débit −7).
# Rendus (media à soi : des rendus parallèles dans le même media → WinError 32) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_bern_repetition.py ProbaBernRepetitionSTMG -o eleveai-maths-stmg-proba-bern-repetition --media_dir manim/scripts/stmg/media-bern_repetition
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_bern_repetition.py ProbaBernRepetitionPremiere -o eleveai-maths-premiere-commun-proba-bern-repetition --media_dir manim/scripts/stmg/media-bern_repetition
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_bern_repetition_short.py ShortProbaBernRepetitionSTMG -o eleveai-maths-stmg-proba-bern-repetition-short --media_dir manim/scripts/stmg/media-bern_repetition
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_bern_repetition_short.py ShortProbaBernRepetitionPremiere -o eleveai-maths-premiere-commun-proba-bern-repetition-short --media_dir manim/scripts/stmg/media-bern_repetition
# Puis copier dans manim/sorties/stmg/maths/probabilites/19-bern-repetition/ et
# manim/sorties/premiere-commun/maths/probabilites/19-bern-repetition/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "premiere"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import BORD, BRANCHE, CHEMIN, ENCRE, PROBA, lettre, suite  # noqa: E402
from proba_probaT_chemin import ArbrePR  # noqa: E402

BALLON = "#F97316"      # le ballon de basket
JOUEUSE = "#A78BFA"     # la silhouette
CERCLE = "#EF4444"      # l'arceau
OR = "#FBBF24"          # la pièce
BLEU_N = "#60A5FA"      # les nombres recopiés hors de la carte


def P(x, y):
    return np.array([x, y, 0.0])


# ── les dessins ─────────────────────────────────────────────────────────────

def ballon(r=0.22):
    b = Circle(radius=r, fill_color=BALLON, fill_opacity=1, stroke_color="#7C2D12", stroke_width=2)
    l1 = Line(P(-r, 0), P(r, 0), color="#7C2D12", stroke_width=2)
    l2 = Line(P(0, -r), P(0, r), color="#7C2D12", stroke_width=2)
    a1 = Arc(radius=r * 0.9, start_angle=-PI / 3, angle=2 * PI / 3, color="#7C2D12", stroke_width=2).shift(LEFT * r * 0.95)
    a2 = Arc(radius=r * 0.9, start_angle=2 * PI / 3, angle=2 * PI / 3, color="#7C2D12", stroke_width=2).shift(RIGHT * r * 0.95)
    return VGroup(b, l1, l2, a1, a2)


def joueuse(s=1.0):
    """Une silhouette, bras levés pour tirer (aucun visage, aucun nom)."""
    tete = Circle(radius=0.28, fill_color=JOUEUSE, fill_opacity=1, stroke_width=0).move_to(P(0, 1.05))
    corps = Line(P(0, 0.75), P(0, -0.35), color=JOUEUSE, stroke_width=14)
    bras_g = Line(P(0, 0.55), P(0.35, 1.25), color=JOUEUSE, stroke_width=10)
    bras_d = Line(P(0, 0.55), P(0.55, 1.15), color=JOUEUSE, stroke_width=10)
    jambe_g = Line(P(0, -0.35), P(-0.3, -1.3), color=JOUEUSE, stroke_width=12)
    jambe_d = Line(P(0, -0.35), P(0.3, -1.3), color=JOUEUSE, stroke_width=12)
    return VGroup(tete, corps, bras_g, bras_d, jambe_g, jambe_d).scale(s)


def panier(s=1.0):
    """Vu de côté : poteau, planche, arceau et filet. L'arceau est en [0] du
    groupe « cercle » : son centre est la cible du ballon."""
    poteau = Line(P(0.55, -2.0), P(0.55, 1.2), color="#94A3B8", stroke_width=10)
    planche = Rectangle(width=0.12, height=1.1, fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(P(0.4, 1.45))
    arceau = Line(P(-0.35, 1.1), P(0.35, 1.1), color=CERCLE, stroke_width=7)
    filet = VGroup(*[Line(P(-0.35 + 0.175 * k, 1.1), P(-0.22 + 0.11 * k, 0.6), color=WHITE, stroke_width=2)
                     for k in range(5)])
    return VGroup(poteau, planche, arceau, filet).scale(s)


def piece(r=0.4, texte="Pile"):
    d = Circle(radius=r, fill_color=OR, fill_opacity=1, stroke_color="#B45309", stroke_width=4)
    t = Text(texte, font_size=int(r * 50), color="#78350F", weight=BOLD).move_to(d)
    return VGroup(d, t)


def etiquette(texte, couleur, fs=34):
    t = Text(texte, font_size=fs, color=couleur, weight=BOLD)
    fond = RoundedRectangle(width=t.width + 0.55, height=t.height + 0.4, corner_radius=0.15, fill_color="#0F172A",
                            fill_opacity=0.95, stroke_color=couleur, stroke_width=4)
    return VGroup(fond, t.move_to(fond))


def carte_lettre(lt, phrase, fs=26, barre=False):
    g = suite(lettre(lt, fs + 6, BLEU_CALCUL, barre), Text(":", font_size=fs), Text(phrase, font_size=fs), buff=0.14)
    fond = RoundedRectangle(width=g.width + 0.45, height=g.height + 0.35, corner_radius=0.15, fill_color="#0F172A",
                            fill_opacity=0.9, stroke_color=BLEU_CALCUL, stroke_width=3)
    return VGroup(fond, g.move_to(fond))


def issue(b1, b2, fs=34, color=WHITE):
    """« S S barre » : deux lettres, alignées sur leur pied."""
    return VGroup(lettre("S", fs, color, b1), lettre("S", fs, color, b2)).arrange(RIGHT, buff=0.14, aligned_edge=DOWN)


def barrer(mob, couleur=ROUGE_ERREUR, sw=7):
    return Line(mob.get_corner(DL) + P(-0.1, -0.05), mob.get_corner(UR) + P(0.1, 0.05), color=couleur,
                stroke_width=sw)


# ── l'arbre des TROIS lancers (correction et short) ─────────────────────────

class ArbreTrois(VGroup):
    """Racine, puis 2, 4, 8 branches. niveaux[i] = liste des branches du
    niveau i+1 ; feuilles = les 8 points du bout, de haut en bas."""

    def __init__(self, dx=1.5, ecart=0.42, couleur=BRANCHE, sw=4, **kw):
        super().__init__(**kw)
        ys = [[0.0]]
        for n in (2, 4, 8):
            pas = ecart * 8 / n
            ys.append([pas * (n - 1) / 2 - pas * i for i in range(n)])
        self.noeuds = [[P(dx * i, y) for y in ligne] for i, ligne in enumerate(ys)]
        self.niveaux = []
        for i in range(1, 4):
            self.niveaux.append([Line(self.noeuds[i - 1][j // 2], self.noeuds[i][j], color=couleur, stroke_width=sw)
                                 for j in range(len(self.noeuds[i]))])
        self.depart = Dot(self.noeuds[0][0], radius=0.07, color=couleur)
        self.feuilles = [Dot(p, radius=0.07, color=CHEMIN) for p in self.noeuds[3]]
        self.add(self.depart, *[b for niv in self.niveaux for b in niv], *self.feuilles)


class ProbaBernRepetitionBase(Notion6e):
    """Toutes les scènes ; les sous-classes ne changent que l'identité."""

    nom_voix = "stmg-premiere-proba-bern-repetition"
    identite = "Maths — EleveAI"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.4):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def caser(self, mob, larg=5.6):
        if mob.width > larg:
            mob.scale_to_fit_width(larg)
        return mob

    def arbre(self, centre=P(-3.55, -0.3), echelle=1.0, nombres=True):
        """L'arbre S / S barre, deux niveaux ; les nombres dits : 0,7 et 0,3 partout."""
        a = ArbrePR(a="S", b="S").scale(echelle).move_to(centre)
        if nombres:
            for k, v in ((0, "0,7"), (1, "0,3"), (2, "0,7"), (3, "0,3"), (4, "0,7"), (5, "0,3")):
                a.nombre(k, v, fs=int(26 * echelle))
        return a

    def tir(self, b, depart, cible, run_time=1.0):
        """Le ballon part des mains, monte en cloche et tombe dans l'arceau."""
        arc = ArcBetweenPoints(depart, cible, angle=-PI / 2.2)
        b.move_to(depart)
        self.play(MoveAlongPath(b, arc), run_time=run_time, rate_func=rate_functions.ease_in_out_sine)
        self.play(b.animate.shift(DOWN * 0.7).set_opacity(0.0), run_time=0.35)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Répéter une épreuve", 52, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.22)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.75))
        a = ArbrePR(a="S", b="S").scale(0.72).move_to(P(-3.3, 0.05))
        e1 = etiquette("identique", VERT_OK, 40).move_to(P(2.6, 0.75))
        e2 = etiquette("indépendante", BLEU_CALCUL, 40).move_to(P(2.6, -0.55))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), FadeIn(a.socle()), run_time=1.0)
        self.play(*[Create(a.branches[k]) for k in (0, 1)], FadeIn(a.lab[0]), FadeIn(a.lab[1]), run_time=0.5)
        self.play(*[Create(a.branches[k]) for k in (2, 3)], FadeIn(a.lab[2]), FadeIn(a.lab[3]), run_time=0.5)
        self.play(TransformFromCopy(VGroup(a.branches[2], a.branches[3], a.lab[2], a.lab[3]),
                                    VGroup(a.branches[4], a.branches[5], a.lab[4], a.lab[5])), run_time=0.7)
        self.au_mot("identique")
        self.play(FadeIn(e1, scale=1.4), run_time=0.5)
        self.au_mot("indépendante")
        self.play(FadeIn(e2, scale=1.4), run_time=0.5)
        self.attendre_voix(marge=1.0)

    # ── 01 : la joueuse, deux lancers francs ────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Deux lancers francs")
        sol = Line(P(-6.4, -2.4), P(0.6, -2.4), color="#475569", stroke_width=6)
        j = joueuse(1.0).move_to(P(-4.6, -1.0))
        pa = panier(1.0).move_to(P(-0.4, -0.35))
        cible = pa[2].get_center() + UP * 0.25
        mains = j[2].get_end() + UP * 0.15 + RIGHT * 0.1
        self.au_mot("La joueuse")
        self.play(FadeIn(sol), FadeIn(j, shift=RIGHT * 0.3), FadeIn(pa, shift=LEFT * 0.3), run_time=0.8)
        self.au_mot("deux lancers")
        l1 = suite(self.t("2", 54, JAUNE_TITRE), self.t("lancers francs", 36), buff=0.2).move_to(P(3.0, 1.6))
        self.play(FadeIn(l1, shift=LEFT * 0.2), run_time=0.5)
        b = ballon().move_to(mains)
        self.add(b)
        self.tir(b, mains, cible, 0.9)
        b2 = ballon().move_to(mains)
        self.add(b2)
        self.tir(b2, mains, cible, 0.9)
        self.au_mot("À chaque tir")
        icones = VGroup(ballon(0.3), ballon(0.3)).arrange(RIGHT, buff=1.6).move_to(P(3.0, 0.25))
        self.play(FadeIn(icones, shift=UP * 0.2), run_time=0.5)
        self.au_mot("0,7")
        ns = VGroup(*[self.t("0,7", 50, JAUNE_TITRE).next_to(ic, DOWN, buff=0.3) for ic in icones])
        self.play(*[FadeIn(n, scale=1.6) for n in ns], run_time=0.5)
        self.insister(ns, 0.3)
        self.attendre_voix()

    # ── 02 : deux conditions ────────────────────────────────────────────────

    def ecran_conditions(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-conditions")
        titre = self.t("Répétition : 2 conditions", 40, JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre[:10]), run_time=0.7)
        self.au_mot("deux conditions")
        self.play(FadeIn(titre[10:], scale=1.3), run_time=0.5)
        e1 = etiquette("identiques", VERT_OK, 42).move_to(P(-3.3, 1.55))
        e2 = etiquette("indépendantes", BLEU_CALCUL, 42).move_to(P(2.4, 1.55))
        self.au_mot("Identiques")
        self.play(FadeIn(e1, scale=1.4), run_time=0.5)
        self.insister(e1, 0.25)
        balles = VGroup(ballon(0.32), ballon(0.32)).arrange(RIGHT, buff=1.5).move_to(P(-3.3, 0.2))
        self.au_mot("la même probabilité")
        meme = self.t("la même probabilité", 32, VERT_OK).move_to(P(-3.3, -1.75))
        self.play(FadeIn(balles, shift=UP * 0.2), FadeIn(meme, shift=UP * 0.1), run_time=0.6)
        self.au_mot("0,7, à chaque")
        ns = VGroup(*[self.t("0,7", 44, JAUNE_TITRE).next_to(b, DOWN, buff=0.25) for b in balles])
        self.play(*[FadeIn(n, scale=1.6) for n in ns], run_time=0.5)
        self.play(Indicate(ns[0], color=VERT_OK), Indicate(ns[1], color=VERT_OK), run_time=0.6)
        self.au_mot("Indépendantes")
        self.play(FadeIn(e2, scale=1.4), run_time=0.5)
        self.insister(e2, 0.25)
        self.au_mot("le premier tir")
        t1 = VGroup(ballon(0.32), self.t("premier tir", 26)).arrange(DOWN, buff=0.15).move_to(P(1.1, 0.15))
        t2 = VGroup(ballon(0.32), self.t("second", 26)).arrange(DOWN, buff=0.15).move_to(P(3.7, 0.15))
        fl = Arrow(t1[0].get_right(), t2[0].get_left(), buff=0.2, color=WHITE, stroke_width=5)
        self.play(FadeIn(t1, shift=UP * 0.15), run_time=0.5)
        self.play(GrowArrow(fl), FadeIn(t2, shift=UP * 0.15), run_time=0.6)
        self.au_mot("ne change pas")
        croix = VGroup(Line(P(-0.22, -0.22), P(0.22, 0.22)), Line(P(-0.22, 0.22), P(0.22, -0.22)))
        croix.set_stroke(ROUGE_ERREUR, 8).move_to(fl)
        ne = self.t("ne change pas le second", 30, BLEU_CALCUL).move_to(P(2.4, -1.75))
        self.play(Create(croix), FadeIn(ne, shift=UP * 0.1), run_time=0.6)
        self.insister(croix, 0.25)
        self.attendre_voix()

    # ── 03 : l'arbre ; le motif du premier tir se copie ─────────────────────

    def entetes(self, a):
        """« Premier tir » / « Deuxième tir » sous la carte, au droit de chaque niveau."""
        y = a.carte.get_bottom()[1] - 0.3
        x1 = (a.depart.get_center()[0] + a.branches[0].get_end()[0]) / 2
        x2 = (a.branches[0].get_end()[0] + a.branches[2].get_end()[0]) / 2
        return (self.t("Premier tir", 22, BLEU_CALCUL).move_to(P(x1, y)),
                self.t("Deuxième tir", 22, BLEU_CALCUL).move_to(P(x2, y)))

    def ecran_arbre(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-arbre")
        self.titre_ecran("L'arbre de la répétition")
        a = self.arbre()
        self.add(a.socle())
        h1, h2 = self.entetes(a)
        cS = carte_lettre("S", "tir réussi").move_to(P(-0.2, 1.55), aligned_edge=LEFT)
        cSb = carte_lettre("S", "tir raté", barre=True).move_to(P(-0.2, 0.55), aligned_edge=LEFT)
        n = a.nombres
        self.au_mot("Premier tir")
        self.play(FadeIn(h1, shift=UP * 0.1), a.construire(0), run_time=0.7)
        self.play(FadeIn(cS, shift=LEFT * 0.2), run_time=0.4)
        self.au_mot("S, 0,7")
        self.play(FadeIn(n[0], scale=1.6), run_time=0.4)
        self.insister(n[0], 0.25)
        self.au_mot("S barre, 0,3")
        self.play(a.construire(1), FadeIn(cSb, shift=LEFT * 0.2), run_time=0.6)
        self.au_mot("0,3. Deux")
        self.play(FadeIn(n[1], scale=1.6), run_time=0.4)
        self.au_mot("Deuxième tir")
        self.play(FadeIn(h2, shift=UP * 0.1), run_time=0.4)
        self.au_mot("après S comme")
        self.play(Indicate(a.lab[0][1], color=CHEMIN, scale_factor=1.5), run_time=0.4)
        self.play(a.construire(2), a.construire(3))
        self.au_mot("après S barre")
        self.play(Indicate(a.lab[1][1], color=CHEMIN, scale_factor=1.5), run_time=0.4)
        motif = VGroup(a.branches[2], a.branches[3], a.lab[2], a.lab[3])
        self.play(TransformFromCopy(motif, VGroup(a.branches[4], a.branches[5], a.lab[4], a.lab[5]),
                                    path_arc=-PI / 3), run_time=1.0)
        self.au_mot("les mêmes branches")
        self.play(*[Indicate(a.branches[k], color=CHEMIN, scale_factor=1.05) for k in (2, 3, 4, 5)], run_time=0.7)
        self.au_mot("0,7 et")
        self.play(FadeIn(n[2], scale=1.6), run_time=0.35)
        self.play(TransformFromCopy(n[2], n[4], path_arc=-PI / 3), run_time=0.6)
        self.au_mot("et 0,3")
        self.play(FadeIn(n[3], scale=1.6), run_time=0.35)
        self.play(TransformFromCopy(n[3], n[5], path_arc=-PI / 3), run_time=0.6)
        self.au_mot("L'arbre se répète")
        m1 = VGroup(a.depart, a.branches[0], a.branches[1], a.lab[0], a.lab[1], n[0], n[1])
        r1 = DashedVMobject(SurroundingRectangle(m1, color=CHEMIN, buff=0.08, stroke_width=4), num_dashes=40)
        cibles = [DashedVMobject(SurroundingRectangle(VGroup(a.branches[i], a.branches[i + 1], a.lab[i], a.lab[i + 1],
                                                             n[i], n[i + 1]), color=CHEMIN, buff=0.06,
                                                      stroke_width=4), num_dashes=30) for i in (2, 4)]
        self.play(Create(r1), run_time=0.6)
        self.play(TransformFromCopy(r1, cibles[0]), TransformFromCopy(r1, cibles[1]), run_time=0.9)
        self.au_mot("identiques et")
        e1 = etiquette("identiques", VERT_OK, 32).move_to(P(-0.2, -0.75), aligned_edge=LEFT)
        e2 = etiquette("indépendantes", BLEU_CALCUL, 32).move_to(P(-0.2, -1.8), aligned_edge=LEFT)
        self.play(FadeIn(e1, scale=1.3), run_time=0.4)
        self.au_mot("indépendantes")
        self.play(FadeIn(e2, scale=1.3), run_time=0.4)
        self.attendre_voix()

    # ── 04 : les quatre chemins ─────────────────────────────────────────────

    def ecran_issues(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-issues")
        a = self.arbre()
        self.add(a)
        self.titre_ecran("Au bout : les chemins")
        self.au_mot("quatre chemins")
        quatre = suite(self.t("4", 60, JAUNE_TITRE), self.t("chemins", 40), buff=0.2).move_to(P(3.3, 1.9))
        self.play(FadeIn(quatre, scale=1.4), run_time=0.5)
        self.insister(quatre[0], 0.25)
        chemins = [([0, 2], (False, False), "S S, S S barre"), ([0, 3], (False, True), "S S barre"),
                   ([1, 4], (True, False), "S barre S,"), ([1, 5], (True, True), "S barre S barre.")]
        for k, (ks, (b1, b2), mot) in enumerate(chemins):
            feuille = a.lab[2 + k]
            txt = issue(b1, b2, 34, CHEMIN)
            txt.move_to(P(0.6, feuille.get_center()[1]), aligned_edge=LEFT)
            fl = Arrow(feuille.get_right() + RIGHT * 0.05, txt.get_left() + LEFT * 0.05, buff=0.05,
                       color=CHEMIN, stroke_width=3, max_tip_length_to_length_ratio=0.25)
            self.au_mot(mot)
            self.play(*a.etat(ks), run_time=0.4)
            self.play(GrowArrow(fl), FadeIn(txt, shift=LEFT * 0.15), run_time=0.4)
            txt.set_color(WHITE)
        self.play(*a.etat(None), run_time=0.5)
        self.attendre_voix()

    # ── 05 : le piège : des tirs qui changent ───────────────────────────────

    def urne(self):
        bocal = RoundedRectangle(width=1.0, height=1.0, corner_radius=0.18, fill_opacity=0, stroke_color=WHITE,
                                 stroke_width=3)
        cs = [VERT_OK, ROUGE_ERREUR, VERT_OK, BLEU_CALCUL]
        boules = VGroup(*[Circle(radius=0.14, fill_color=c, fill_opacity=1, stroke_width=0) for c in cs])
        boules.arrange_in_grid(2, 2, buff=0.12).move_to(bocal).shift(DOWN * 0.12)
        return VGroup(bocal, boules)

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        a = self.arbre()
        self.add(a)
        self.titre_ecran("Le piège")
        n = a.nombres
        self.au_mot("appeler")
        rep = self.t("« répétition » ?", 40, ORANGE_RETENUE).move_to(P(2.0, 2.0))
        self.play(FadeIn(rep, scale=1.4), run_time=0.5)
        self.au_mot("se fatigue")
        self.play(*a.etat([2, 4]), run_time=0.5)
        self.au_mot("0,5 au")
        neufs = {k: Text("0,5", font_size=26, color=ROUGE_ERREUR, weight=BOLD).move_to(n[k]) for k in (2, 4)}
        fat = self.t("0,5 au deuxième tir", 34, ROUGE_ERREUR).move_to(P(2.0, 1.1))
        self.play(*[Transform(n[k], neufs[k]) for k in (2, 4)], FadeOut(n[3]), FadeOut(n[5]),
                  FadeIn(fat, shift=UP * 0.1), run_time=0.7)
        self.insister(VGroup(n[2], n[4]), 0.25)
        self.au_mot("plus identiques")
        e1 = etiquette("identiques", VERT_OK, 30)
        l1 = suite(self.t("plus", 32, ROUGE_ERREUR), e1, buff=0.2).move_to(P(2.0, 0.1))
        b1 = barrer(e1)
        self.play(FadeIn(l1, scale=1.3), run_time=0.5)
        self.play(Create(b1), e1.animate.set_opacity(0.55), run_time=0.4)
        self.au_mot("sans remise")
        u = self.urne().move_to(P(0.4, -1.3))
        sr = self.t("tirage sans remise", 30).next_to(u, RIGHT, buff=0.35).shift(UP * 0.2)
        self.play(FadeIn(u, shift=DOWN * 0.2), FadeIn(sr, shift=LEFT * 0.1), run_time=0.5)
        sortie = u[1][1]
        self.play(sortie.animate.shift(UP * 1.0).set_opacity(0), run_time=0.6)
        self.au_mot("plus indépendantes")
        e2 = etiquette("indépendantes", BLEU_CALCUL, 30)
        l2 = suite(self.t("plus", 32, ROUGE_ERREUR), e2, buff=0.2).move_to(P(2.75, -1.95))
        b2 = barrer(e2)
        self.play(FadeIn(l2, scale=1.3), run_time=0.5)
        self.play(Create(b2), e2.animate.set_opacity(0.55), run_time=0.4)
        self.attendre_voix(marge=1.5)

    # ── 06 : défi : trois lancers de pièce ──────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("trois fois")
        pieces = VGroup(*[piece(0.5) for _ in range(3)]).arrange(RIGHT, buff=0.8).move_to(P(-0.6, 1.2))
        self.play(LaggedStart(*[FadeIn(p, shift=UP * 0.4) for p in pieces], lag_ratio=0.25), run_time=0.8)
        for _ in range(2):
            self.play(*[p.animate.stretch(0.06, 0) for p in pieces], run_time=0.18)
            self.play(*[p.animate.stretch(1 / 0.06, 0) for p in pieces], run_time=0.18)
        trois = suite(self.t("3", 56, JAUNE_TITRE), self.t("lancers", 38), buff=0.2).move_to(P(-0.6, -0.1))
        self.play(FadeIn(trois, scale=1.4), run_time=0.4)
        self.au_mot("pièce équilibrée")
        eq = self.t("pièce équilibrée", 32, OR).next_to(trois, DOWN, buff=0.25)
        self.play(FadeIn(eq, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Combien de chemins")
        q = self.t("Combien de chemins ?", 46, VERT_OK).move_to(P(-0.6, -1.85))
        self.play(FadeIn(q, scale=1.3), run_time=0.5)
        self.insister(q, 0.25)
        self.au_mot("Mets pause")
        self.play(Write(self.t("Mets pause, et cherche !", 34, ORANGE_RETENUE).move_to(P(-1.4, -3.1))))
        self.attendre_voix(marge=2.0)

    # ── 06b : correction : l'arbre se dédouble, 2 × 2 × 2 = 8 ───────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction")
        a = ArbreTrois(dx=1.8, ecart=0.46).move_to(P(-3.3, -0.2))
        carte = RoundedRectangle(width=a.width + 1.0, height=a.height + 0.8, corner_radius=0.2, fill_color=WHITE,
                                 fill_opacity=1, stroke_color=BORD, stroke_width=2).move_to(a)
        self.add(carte, a.depart)
        y = carte.get_bottom()[1] - 0.35
        xs = [a.niveaux[i][0].get_center()[0] for i in range(3)]
        deux = [self.t("2", 44, JAUNE_TITRE).move_to(P(x, y)) for x in xs]
        extraits = ("2 branches au premier", "puis 2, puis", "puis 2 :")
        for i in range(3):
            self.au_mot(extraits[i])
            anims = [Create(b) for b in a.niveaux[i]]
            if i == 2:
                anims += [FadeIn(f, scale=1.5) for f in a.feuilles]
            self.play(*anims, FadeIn(deux[i], scale=1.6), run_time=0.7)
        k = [self.t(x, 60, c) for x, c in (("2", JAUNE_TITRE), ("×", WHITE), ("2", JAUNE_TITRE), ("×", WHITE),
                                           ("2", JAUNE_TITRE), ("=", WHITE), ("8", VERT_OK))]
        calc = self.caser(suite(*k, buff=0.25), 4.8).move_to(P(2.6, 1.0))
        self.au_mot("2 fois 2 fois 2")
        self.play(TransformFromCopy(deux[0], k[0]), run_time=0.4)
        self.play(FadeIn(k[1]), TransformFromCopy(deux[1], k[2]), run_time=0.4)
        self.play(FadeIn(k[3]), TransformFromCopy(deux[2], k[4]), run_time=0.4)
        self.au_mot("égale 8")
        self.play(FadeIn(k[5]), FadeIn(k[6], scale=1.8), run_time=0.5)
        self.play(*[Flash(f, color=CHEMIN, line_length=0.12, flash_radius=0.15) for f in a.feuilles], run_time=0.6)
        self.au_mot("8 chemins")
        huit = suite(self.t("8", 52, VERT_OK), self.t("chemins", 38), buff=0.2).next_to(calc, DOWN, buff=0.6)
        self.play(FadeIn(huit, scale=1.3), run_time=0.5)
        self.insister(huit, 0.3)
        ok = self.coche(taille=0.35).next_to(huit, RIGHT, buff=0.4)
        self.play(Create(ok), run_time=0.4)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 36
        sous = self.t("Une répétition d'épreuves de Bernoulli :", 38, BLEU_CALCUL)
        l1 = suite(self.t("identiques :", fs, VERT_OK), self.t("le même p à chaque fois", fs), buff=0.15)
        l2 = suite(self.t("indépendantes", fs, BLEU_CALCUL), buff=0.15)
        l3 = suite(self.t("sur l'arbre :", fs, CHEMIN), self.t("les mêmes branches à chaque niveau", fs), buff=0.15)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.5)
        bloc = VGroup(sous, lignes).arrange(DOWN, aligned_edge=LEFT, buff=0.5)
        if bloc.width > 11.4:
            bloc.scale_to_fit_width(11.4)
        bloc.move_to(P(-0.6, 0.55))
        self.au_mot("Une répétition")
        self.play(FadeIn(sous, shift=RIGHT * 0.2), run_time=0.6)
        for mot, l in zip(["identiques, le même", "et indépendantes", "Sur l'arbre"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("Prochaine vidéo")
        ch = suite(self.t("Prochaine vidéo :", 34, VERT_OK), self.t("l'arbre de trois épreuves", 34), buff=0.22)
        ch.move_to(P(-0.9, -2.75))
        self.play(FadeIn(ch, shift=UP * 0.15), run_time=0.6)
        self.attendre_voix(marge=1.0)

    # ── 08 : la fin (règle du 19/10) ────────────────────────────────────────

    def page_abonnement(self, voix="08-abonne"):
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
        self.ecran_conditions()
        self.ecran_arbre()
        self.ecran_issues()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")


class ProbaBernRepetitionSTMG(ProbaBernRepetitionBase):
    identite = "Maths STMG — EleveAI"


class ProbaBernRepetitionPremiere(ProbaBernRepetitionBase):
    identite = "Maths 1re — EleveAI"


# 19/10 : la même vidéo pour la 1re SPÉ (micro jumelle, pack par classe).
class ProbaBernRepetitionPremiereSpe(ProbaBernRepetitionBase):
    identite = "Maths 1re spé — EleveAI"
