# proba_probaC_interpreter.py
# EleveAI — Maths STMG ET Maths 1re (tronc commun) — série « Probabilités
# conditionnelles » : INTERPRÉTER une probabilité conditionnelle par une phrase
# (micros : probaC_interpreter_phrase en STMG, alea_cond_interpreter en 1re),
# AVEC VOIX. Paysage 16:9, CEINTURE BLEUE. Short jumeau :
# proba_probaC_interpreter_short.py (ceinture jaune, « 9 accidents sur 10 »).
#
# ⭐⭐ UNE voix, UN script, DEUX rendus (Frédéric, 18/10 : « pour vendre en
# pack ») : ProbaInterpreterBase porte toutes les scènes ; les deux
# sous-classes ne changent que l'identité. La voix ne cite aucune classe.
#
# ⭐ La figure est l'ARBRE PONDÉRÉ du coach (`arbre_proba`, repris de
# premiere/proba_pc_conditionnelle.py : carte blanche, branches grises,
# probabilités en bleu au milieu des branches, nœud étiqueté au-dessus,
# feuille à droite). Il se construit BRANCHE PAR BRANCHE quand la voix dit le
# nombre. ⛔ PAS D'ÉCART : les branches S → B barre et S barre → B barre
# restent SANS nombre (la voix ne les dit pas).
#
# Écrans : 00 garde · 01 les maisons à panneaux solaires, la facture qui
# baisse · 02 l'arbre (S 0,4 ; S barre 0,6 ; B 0,75 après S ; B 0,5 après
# S barre) · 03 la branche S → B s'allume : P_S(B) = 0,75 et sa phrase
# « parmi les maisons équipées » · 04 le chemin S puis B : 0,4 × 0,75 = 0,3 =
# P(S ∩ B), « ET », pas de « parmi » · 05 le piège : la phrase retournée,
# FAUX ; les deux chemins vers B : 0,3 + 0,6 × 0,5 = 0,6, puis 0,3 sur 0,6 =
# 0,5 · 06 défi (la branche S barre → B) · 06b correction · 07 ce que tu as
# appris · 08 abonnement.
#
# Voix : manim/voix/stmg-premiere-proba-interpreter.json (Julie, débit −7).
# Rendus (media à soi : des rendus parallèles dans le même media → WinError 32) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_probaC_interpreter.py ProbaInterpreterSTMG -o eleveai-maths-stmg-proba-interpreter --media_dir manim/scripts/stmg/media-probaC_interpreter
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_probaC_interpreter.py ProbaInterpreterPremiere -o eleveai-maths-premiere-commun-proba-interpreter --media_dir manim/scripts/stmg/media-probaC_interpreter
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaC_interpreter_short.py ShortProbaInterpreterSTMG -o eleveai-maths-stmg-proba-interpreter-short --media_dir manim/scripts/stmg/media-probaC_interpreter
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaC_interpreter_short.py ShortProbaInterpreterPremiere -o eleveai-maths-premiere-commun-proba-interpreter-short --media_dir manim/scripts/stmg/media-probaC_interpreter
# Puis copier dans manim/sorties/stmg/maths/probabilites/05-interpreter/ et
# manim/sorties/premiere-commun/maths/probabilites/05-interpreter/.

import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "premiere"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import (  # noqa: E402
    BORD, BRANCHE, CHEMIN, ENCRE, PROBA, frac, lettre, p_cond, pastille, suite,
)

PANNEAU = "#1E3A8A"     # les panneaux solaires
MUR = "#FDE68A"
TOIT = "#B91C1C"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les dessins : maisons, panneaux, facture ────────────────────────────────

def maison(panneaux=False, s=1.0):
    corps = Rectangle(width=1.0, height=0.75, fill_color=MUR, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    toit = Polygon(P(-0.62, 0.375), P(0.62, 0.375), P(0, 0.95), fill_color=TOIT, fill_opacity=1,
                   stroke_color=WHITE, stroke_width=2)
    porte = Rectangle(width=0.24, height=0.42, fill_color="#78350F", fill_opacity=1, stroke_width=0)
    porte.align_to(corps, DOWN).shift(RIGHT * 0.18)
    fen = Square(0.22, fill_color="#7DD3FC", fill_opacity=1, stroke_color=WHITE, stroke_width=1.5)
    fen.move_to(corps).shift(LEFT * 0.22 + UP * 0.08)
    g = VGroup(corps, toit, porte, fen)
    if panneaux:
        # trois panneaux posés le long du pan gauche du toit
        angle = np.arctan2(0.575, 0.62)
        pans = VGroup(*[Rectangle(width=0.17, height=0.15, fill_color=PANNEAU, fill_opacity=1,
                                  stroke_color="#93C5FD", stroke_width=1.5) for _ in range(3)])
        pans.arrange(RIGHT, buff=0.02).rotate(angle).move_to(P(-0.24, 0.58))
        g.add(pans)
    return g.scale(s)


def soleil(r=0.35):
    c = Circle(radius=r, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_width=0)
    rayons = VGroup(*[Line(P(0, r * 1.25), P(0, r * 1.7), color=JAUNE_TITRE, stroke_width=4).rotate(
        a, about_point=ORIGIN) for a in np.arange(0, TAU, TAU / 10)])
    return VGroup(c, rayons)


def facture(s=1.0):
    """Une feuille de facture (traits, symbole €) et une flèche verte qui descend."""
    f = Rectangle(width=0.9, height=1.15, fill_color=WHITE, fill_opacity=1, stroke_color=BORD, stroke_width=2)
    eur = Text("€", font_size=34, color=ENCRE, weight=BOLD).move_to(f).shift(UP * 0.25)
    traits = VGroup(*[Line(P(-0.3, y), P(0.3, y), color="#94A3B8", stroke_width=3) for y in (-0.12, -0.27, -0.42)])
    traits.move_to(f).shift(DOWN * 0.2)
    fl = Arrow(P(0.75, 0.45), P(0.75, -0.55), buff=0, color=VERT_OK, stroke_width=8,
               max_tip_length_to_length_ratio=0.35)
    return VGroup(f, eur, traits, fl).scale(s)


def carte_lettre(lt, phrase, fs=28, barre=False):
    g = suite(lettre(lt, fs + 6, BLEU_CALCUL, barre), Text(":", font_size=fs), Text(phrase, font_size=fs), buff=0.14)
    fond = RoundedRectangle(width=g.width + 0.45, height=g.height + 0.35, corner_radius=0.15, fill_color="#0F172A",
                            fill_opacity=0.9, stroke_color=BLEU_CALCUL, stroke_width=3)
    return VGroup(fond, g.move_to(fond))


# ── l'ARBRE PONDÉRÉ du coach (arbre_proba), construit branche par branche ───

class ArbreSB(VGroup):
    """Carte blanche du coach : départ, S / S barre, puis B / B barre.
    Branches : 0 → S, 1 → S̄, 2 S → B, 3 S → B̄, 4 S̄ → B, 5 S̄ → B̄.
    Rien n'est visible tant que `construire(k)` n'a pas été joué, sauf la
    carte, son titre et le point de départ."""

    def __init__(self, dx=2.1, dy1=1.15, dy2=0.55, fs=30, **kw):
        super().__init__(**kw)
        racine = P(0, 0)
        noeuds = [P(dx, dy1), P(dx, -dy1)]
        feuilles = [P(2 * dx, dy1 + dy2), P(2 * dx, dy1 - dy2), P(2 * dx, -dy1 + dy2), P(2 * dx, -dy1 - dy2)]
        bouts = [(racine, noeuds[0]), (racine, noeuds[1]), (noeuds[0], feuilles[0]), (noeuds[0], feuilles[1]),
                 (noeuds[1], feuilles[2]), (noeuds[1], feuilles[3])]
        self.branches = [Line(a, b, color=BRANCHE, stroke_width=4) for a, b in bouts]
        self.depart = Dot(racine, radius=0.07, color=ENCRE)
        self.lab = []
        for k, b in enumerate([False, True]):
            m = lettre("S", fs, ENCRE, b).next_to(noeuds[k], UP, buff=0.08)
            fond = BackgroundRectangle(m, color=WHITE, fill_opacity=1, buff=0.04)
            self.lab.append(VGroup(fond, m))
        for k, b in enumerate([False, True, False, True]):
            self.lab.append(lettre("B", fs, ENCRE, b).next_to(feuilles[k], RIGHT, buff=0.12))
        tout = VGroup(self.depart, *self.branches, *self.lab)
        self.carte = RoundedRectangle(width=tout.width + 1.5, height=tout.height + 1.15, corner_radius=0.2,
                                      fill_color=WHITE, fill_opacity=1, stroke_color=BORD, stroke_width=2)
        self.carte.move_to(tout).shift(UP * 0.3 + RIGHT * 0.1)
        self.titre = Text("Arbre pondéré", font_size=22, color=ENCRE, weight=BOLD)
        self.titre.next_to(self.carte.get_top(), DOWN, buff=0.14)
        self.nombres = {}
        self.add(self.carte, self.titre, *self.branches, self.depart, *self.lab)

    def socle(self):
        return VGroup(self.carte, self.titre, self.depart)

    def construire(self, k, run_time=0.6):
        """La branche k se trace, puis son étiquette apparaît au bout."""
        return Succession(Create(self.branches[k], run_time=run_time * 0.6),
                          FadeIn(self.lab[k], scale=1.4, run_time=run_time * 0.4))

    def nombre(self, k, texte, fs=26, buff=0.08):
        """Le nombre de la branche k, en bleu, au-dessus du trait (pas encore affiché)."""
        t = Text(texte, font_size=fs, color=PROBA, weight=BOLD)
        a, b = self.branches[k].get_start(), self.branches[k].get_end()
        d = b - a
        n = np.array([-d[1], d[0], 0.0])
        n = n / np.linalg.norm(n)
        if n[1] < 0:
            n = -n
        demi = abs(n[0]) * t.width / 2 + abs(n[1]) * t.height / 2
        t.move_to((a + b) / 2 + n * (demi + buff))
        self.nombres[k] = t
        self.add(t)
        return t

    def etat(self, ks=None, op=0.18):
        """Allume les branches ks (orange épais) et estompe le reste ; ks=None : tout normal."""
        anims = []
        feuille_de = {2: 2, 3: 3, 4: 4, 5: 5}
        for k, br in enumerate(self.branches):
            if ks is None:
                anims.append(br.animate.set_stroke(BRANCHE, 4, opacity=1))
            elif k in ks:
                anims.append(br.animate.set_stroke(CHEMIN, 9, opacity=1))
            else:
                anims.append(br.animate.set_stroke(BRANCHE, 4, opacity=op))
            if k in self.nombres:
                on = ks is None or k in ks
                anims.append(self.nombres[k].animate.set_opacity(1 if on else op))
        gardes = set() if ks is None else ({0} if any(k in (0, 2, 3) for k in ks) else set()) | (
            {1} if any(k in (1, 4, 5) for k in ks) else set()) | {feuille_de[k] for k in ks if k in feuille_de}
        for k, m in enumerate(self.lab):
            on = ks is None or k in gardes
            cible = m[1] if k < 2 else m
            anims.append(cible.animate.set_opacity(1 if on else op))
        return anims


class ProbaInterpreterBase(Notion6e):
    """Toutes les scènes ; les sous-classes ne changent que l'identité."""

    nom_voix = "stmg-premiere-proba-interpreter"
    identite = "Maths — EleveAI"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.4):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def formule(self, cond, cible, fs=80, barre=False):
        """P_cond(cible) : l'indice (le groupe) en jaune, la parenthèse en vert."""
        return p_cond(cond, cible, fs, WHITE, JAUNE_TITRE, VERT_OK, barre_cond=barre)

    def egale(self, f, valeur, fs=80, color=JAUNE_TITRE):
        eg = self.t("=", fs).next_to(f, RIGHT, buff=0.25)
        v = self.t(valeur, fs, color).next_to(eg, RIGHT, buff=0.25)
        v.shift(UP * (f[0].get_bottom()[1] - v[0].get_bottom()[1]))
        eg.match_y(f[0])
        return eg, v

    def lignes(self, morceaux, fs=30, centre=P(2.9, 0.0), buff=0.22):
        """Des lignes de texte ; chaque ligne est une liste de (texte, couleur)."""
        g = VGroup(*[suite(*[self.t(tx, fs, c) for tx, c in ligne], buff=0.13) for ligne in morceaux])
        g.arrange(DOWN, buff=buff, aligned_edge=LEFT).move_to(centre)
        return g

    def arbre(self, centre=P(-3.55, -0.3), echelle=1.0, complet=True):
        """L'arbre de la vidéo. complet : branches, lettres et les QUATRE nombres dits."""
        a = ArbreSB().scale(echelle).move_to(centre)
        for k, v in ((0, "0,4"), (1, "0,6"), (2, "0,75"), (4, "0,5")):
            a.nombre(k, v)
        return a

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Interpréter une probabilité conditionnelle", 46, JAUNE_TITRE)
        if titre.width > 12.6:
            titre.scale_to_fit_width(12.6)
        titre.to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.22)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.6))
        f = self.formule("A", "B", 120).move_to(P(-3.6, 0.3))
        bulle = RoundedRectangle(width=4.2, height=1.6, corner_radius=0.5, fill_color="#0F172A", fill_opacity=1,
                                 stroke_color=BLEU_CALCUL, stroke_width=4).move_to(P(2.6, 0.45))
        queue = Polygon(P(1.0, 0.0), P(0.55, -0.35), P(1.25, -0.25), fill_color="#0F172A", fill_opacity=1,
                        stroke_color=BLEU_CALCUL, stroke_width=4)
        guill = self.t("« … »", 64, WHITE).move_to(bulle)
        fl = Arrow(f.get_right() + RIGHT * 0.2, bulle.get_left() + LEFT * 0.15, buff=0, color=JAUNE_TITRE,
                   stroke_width=6)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=1.0)
        self.au_mot("probabilité conditionnelle")
        self.play(FadeIn(f, scale=0.7), run_time=0.6)
        self.au_mot("par une phrase")
        self.play(GrowArrow(fl), FadeIn(queue), FadeIn(bulle, scale=0.7), run_time=0.6)
        self.play(Write(guill), run_time=0.5)
        self.attendre_voix(marge=1.0)

    # ── 01 : les maisons, les panneaux, la facture ──────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Les panneaux solaires")
        sol = soleil().move_to(P(-6.1, 2.55))
        avec = (0, 3)
        maisons = VGroup(*[maison(k in avec, 0.95) for k in range(5)]).arrange(RIGHT, buff=0.3)
        maisons.move_to(P(-3.1, 0.75))
        for k in avec:
            maisons[k][4].set_opacity(0)
        self.au_mot("Dans une commune")
        self.play(FadeIn(sol, scale=0.6), LaggedStart(*[FadeIn(m, shift=UP * 0.3) for m in maisons], lag_ratio=0.12),
                  run_time=1.0)
        self.au_mot("40 %")
        quarante = self.t("40 %", 64, JAUNE_TITRE).move_to(P(3.7, 1.35))
        q2 = self.t("des maisons ont", 30).next_to(quarante, DOWN, buff=0.25)
        q3 = self.t("des panneaux solaires", 30).next_to(q2, DOWN, buff=0.15)
        self.play(FadeIn(quarante, scale=0.6), *[maisons[k][4].animate.set_opacity(1) for k in avec],
                  run_time=0.6)
        self.play(FadeIn(q2, shift=UP * 0.1), FadeIn(q3, shift=UP * 0.1), run_time=0.5)
        self.play(*[Indicate(maisons[k][4], color=BLEU_CALCUL, scale_factor=1.5) for k in avec], run_time=0.8)
        self.au_mot("leur facture")
        fac = facture(1.0).move_to(P(-4.6, -1.75))
        qf = self.t("La facture a-t-elle baissé ?", 34, BLEU_CALCUL).next_to(fac, RIGHT, buff=0.5)
        self.play(FadeIn(fac[:3], shift=UP * 0.2), run_time=0.5)
        self.au_mot("a baissé")
        self.play(GrowArrow(fac[3]), FadeIn(qf, shift=LEFT * 0.2), run_time=0.6)
        self.attendre_voix()

    # ── 02 : l'arbre, branche par branche ───────────────────────────────────

    def ecran_arbre(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-arbre")
        self.titre_ecran("L'arbre pondéré")
        a = self.arbre()
        self.au_mot("Voici l'arbre")
        self.play(FadeIn(a.socle()), run_time=0.5)
        cS = carte_lettre("S", "« la maison a des panneaux »", 26)
        cS.move_to(P(-0.3 + cS.width / 2, 1.3))
        cB = carte_lettre("B", "« la facture a baissé »", 26)
        cB.move_to(P(-0.3 + cB.width / 2, -0.1))
        self.au_mot("Première branche")
        self.play(a.construire(0))
        self.au_mot("« la maison")
        self.play(FadeIn(cS, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("0,4")
        self.play(FadeIn(a.nombres[0], scale=1.6), run_time=0.4)
        self.insister(a.nombres[0], 0.25)
        self.au_mot("S barre, 0,6")
        self.play(a.construire(1))
        self.au_mot("0,6")
        self.play(FadeIn(a.nombres[1], scale=1.6), run_time=0.4)
        self.au_mot("après S : B")
        self.play(Indicate(a.lab[0][1], color=CHEMIN, scale_factor=1.4), run_time=0.4)
        self.play(a.construire(2), a.construire(3))
        self.au_mot("« la facture")
        self.play(FadeIn(cB, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("0,75")
        self.play(FadeIn(a.nombres[2], scale=1.6), run_time=0.4)
        self.insister(a.nombres[2], 0.25)
        self.au_mot("Après S barre")
        self.play(Indicate(a.lab[1][1], color=CHEMIN, scale_factor=1.4), run_time=0.4)
        self.play(a.construire(4), a.construire(5))
        self.au_mot("B, 0,5")
        self.play(FadeIn(a.nombres[4], scale=1.6), run_time=0.4)
        self.attendre_voix()

    # ── 03 : la branche S → B s'allume ; sa phrase commence par le groupe ───

    def ecran_phrase(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-phrase")
        self.titre_ecran("Le 0,75 en phrase")
        a = self.arbre()
        self.add(a)
        self.au_mot("Que veut dire")
        self.insister(a.nombres[2], 0.35)
        self.au_mot("Il est après S")
        self.play(*a.etat([2]), Indicate(a.lab[0][1], color=CHEMIN, scale_factor=1.5), run_time=0.8)
        self.au_mot("c'est P indice S de B")
        f = self.formule("S", "B", 80)
        eg, v = self.egale(f, "0,75", 80)
        VGroup(f, eg, v).move_to(P(2.7, 2.05))
        self.play(FadeIn(f[0]), TransformFromCopy(a.lab[0][1], f[1]), run_time=0.6)
        self.play(TransformFromCopy(a.lab[2], f[2]), run_time=0.5)
        self.play(FadeIn(eg), TransformFromCopy(a.nombres[2], v), run_time=0.5)
        self.au_mot("En phrase")
        ph = self.lignes([[("« Parmi les maisons équipées", WHITE)],
                          [("de panneaux,", WHITE), ("75 %", JAUNE_TITRE), ("ont vu", WHITE)],
                          [("leur facture baisser. »", WHITE)]], 31, P(3.05, 0.05))
        self.play(FadeIn(ph[0], shift=UP * 0.15), FadeIn(ph[1][0], shift=UP * 0.15), run_time=0.6)
        self.au_mot("75 %")
        self.play(FadeIn(ph[1][1], scale=1.6), run_time=0.4)
        self.play(FadeIn(ph[1][2:], shift=UP * 0.1), FadeIn(ph[2], shift=UP * 0.15), run_time=0.6)
        self.au_mot("La phrase commence")
        cad = SurroundingRectangle(ph[0], color=JAUNE_TITRE, buff=0.1, stroke_width=5)
        groupe = self.t("le groupe", 30, JAUNE_TITRE).next_to(ph[2], DOWN, buff=0.55).align_to(ph, LEFT)
        cad_i = SurroundingRectangle(f[1], color=JAUNE_TITRE, buff=0.06, stroke_width=4)
        self.play(Create(cad), Create(cad_i), run_time=0.5)
        self.play(Indicate(f[1], color=JAUNE_TITRE, scale_factor=1.8), run_time=0.8)
        self.au_mot("« parmi les maisons équipées »")
        self.play(FadeIn(groupe, shift=UP * 0.1), Indicate(ph[0], color=JAUNE_TITRE, scale_factor=1.08), run_time=0.7)
        self.attendre_voix()

    # ── 04 : le chemin S puis B : « ET », sur toutes les maisons ────────────

    def ecran_et(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-et")
        self.titre_ecran("Un chemin : « et »")
        a = self.arbre()
        self.add(a)
        fs = 52
        c1 = self.t("0,4", fs, PROBA)
        c2 = self.t("×", fs)
        c3 = self.t("0,75", fs, PROBA)
        c4 = self.t("=", fs)
        c5 = self.t("0,3", fs, JAUNE_TITRE)
        calc = suite(c1, c2, c3, c4, c5, buff=0.22).move_to(P(2.7, 2.15))
        self.au_mot("0,4 fois")
        self.play(*a.etat([0]), TransformFromCopy(a.nombres[0], c1), run_time=0.7)
        self.au_mot("0,75, égale")
        self.play(*a.etat([0, 2]), FadeIn(c2), TransformFromCopy(a.nombres[2], c3), run_time=0.7)
        self.au_mot("égale 0,3")
        bout = pastille("0,3", 26).next_to(a.lab[2], RIGHT, buff=0.2)
        self.play(FadeIn(c4), FadeIn(c5, scale=1.6), run_time=0.5)
        self.play(TransformFromCopy(c5, bout), run_time=0.6)
        self.au_mot("le chemin S puis B")
        self.play(*[Indicate(a.branches[k], color=CHEMIN, scale_factor=1.05) for k in (0, 2)], run_time=0.8)
        self.au_mot("P de S inter B")
        inter = suite(self.t("P(S ∩ B)", 52), self.t("=", 52), self.t("0,3", 52, JAUNE_TITRE), buff=0.22)
        inter.move_to(P(2.7, 1.2))
        self.play(FadeIn(inter, shift=UP * 0.15), run_time=0.6)
        self.au_mot("En phrase")
        ph = self.lignes([[("«", WHITE), ("30 %", JAUNE_TITRE), ("des maisons ont", WHITE)],
                          [("des panneaux", WHITE), ("ET", ORANGE_RETENUE), ("une", WHITE)],
                          [("facture en baisse. »", WHITE)]], 31, P(3.0, -0.15))
        self.play(FadeIn(ph[0][0]), FadeIn(ph[0][1], scale=1.6), FadeIn(ph[0][2], shift=UP * 0.1), run_time=0.6)
        self.au_mot("des panneaux ET")
        self.play(FadeIn(ph[1][0], shift=UP * 0.1), run_time=0.4)
        self.play(FadeIn(ph[1][1], scale=2), run_time=0.4)
        self.insister(ph[1][1], 0.3)
        self.play(FadeIn(ph[1][2:], shift=UP * 0.1), FadeIn(ph[2], shift=UP * 0.1), run_time=0.5)
        self.au_mot("Pas de « parmi »")
        pas = self.t("Pas de « parmi » :", 32, ROUGE_ERREUR)
        tous = self.t("toutes les maisons", 32, VERT_OK)
        pas.next_to(ph, DOWN, buff=0.45).align_to(ph, LEFT)
        tous.next_to(pas, DOWN, buff=0.2).align_to(ph, LEFT)
        self.play(FadeIn(pas, shift=UP * 0.1), run_time=0.5)
        self.au_mot("toutes les maisons")
        self.play(FadeIn(tous, shift=UP * 0.1), run_time=0.5)
        self.insister(tous, 0.3)
        self.attendre_voix()

    # ── 05 : le piège : la phrase retournée ; les DEUX chemins vers B ───────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège : retourner la phrase")
        a = self.arbre()
        self.add(a)
        self.au_mot("« 75 %")
        ph = self.lignes([[("«", WHITE), ("75 %", JAUNE_TITRE), ("des maisons dont", WHITE)],
                          [("la facture a baissé", WHITE)],
                          [("ont des panneaux » ?", WHITE)]], 30, P(2.6, 1.95), buff=0.16)
        self.play(FadeIn(ph, shift=UP * 0.15), run_time=0.8)
        self.au_mot("Faux")
        # La phrase reste LISIBLE (relecture du 19/10) : un trait rouge la barre,
        # et « FAUX ! » se pose à côté, pas dessus.
        barre = Line(ph.get_corner(UL) + P(-0.1, 0.05), ph.get_corner(DR) + P(0.1, -0.05),
                     color=ROUGE_ERREUR, stroke_width=6)
        faux = self.t("FAUX !", 44, ROUGE_ERREUR).rotate(0.18).next_to(ph, RIGHT, buff=0.25)
        if faux.get_right()[0] > 6.9:
            faux.shift(LEFT * (faux.get_right()[0] - 6.9))
        self.play(Create(barre), FadeIn(faux, scale=1.8), ph.animate.set_opacity(0.7), run_time=0.45)
        self.insister(faux, 0.25)
        fs = 44
        lab1 = self.t("La facture a baissé :", 28, BLEU_CALCUL).move_to(P(0.35, 0.55), aligned_edge=LEFT)
        k = [self.t(x, fs, c) for x, c in (("0,3", JAUNE_TITRE), ("+", WHITE), ("0,6", PROBA), ("×", WHITE),
                                            ("0,5", PROBA), ("=", WHITE), ("0,6", VERT_OK))]
        calc = suite(*k, buff=0.18).next_to(lab1, DOWN, buff=0.22).align_to(lab1, LEFT)
        self.au_mot("pour 0,3")
        bout = pastille("0,3", 24).next_to(a.lab[2], RIGHT, buff=0.2)
        self.play(*a.etat([0, 2]), FadeIn(lab1, shift=UP * 0.1), run_time=0.6)
        self.play(FadeIn(bout, scale=1.5), FadeIn(k[0], scale=1.5), run_time=0.5)
        self.au_mot("plus 0,6 fois")
        self.play(*a.etat([0, 2, 1, 4]), FadeIn(k[1]), TransformFromCopy(a.nombres[1], k[2]), run_time=0.7)
        self.au_mot("0,5, égale")
        self.play(FadeIn(k[3]), TransformFromCopy(a.nombres[4], k[4]), run_time=0.5)
        self.au_mot("égale 0,6")
        self.play(FadeIn(k[5]), FadeIn(k[6], scale=1.6), run_time=0.5)
        self.play(*[Indicate(a.lab[i], color=VERT_OK, scale_factor=1.6) for i in (2, 4)], run_time=0.6)
        self.au_mot("Parmi elles")
        lab2 = self.t("Parmi elles, avec panneaux :", 28, BLEU_CALCUL)
        lab2.next_to(calc, DOWN, buff=0.4).align_to(lab1, LEFT)
        self.play(FadeIn(lab2, shift=UP * 0.1), run_time=0.5)
        self.au_mot("0,3 sur 0,6")
        fr_ = frac("0,3", "0,6", 40, WHITE, color_n=JAUNE_TITRE, color_d=VERT_OK)
        eg = self.t("=", 44)
        res = self.t("0,5", 48, JAUNE_TITRE)
        quot = suite(fr_, eg, res, buff=0.25).next_to(lab2, DOWN, buff=0.22).align_to(lab1, LEFT)
        self.play(TransformFromCopy(k[0], fr_[0]), GrowFromCenter(fr_[1]), TransformFromCopy(k[6], fr_[2]),
                  run_time=0.8)
        self.au_mot("égale 0,5")
        self.play(FadeIn(eg), FadeIn(res, scale=1.6), run_time=0.5)
        self.insister(res, 0.3)
        self.au_mot("Une sur deux")
        une = self.t("Une sur deux", 34, VERT_OK).next_to(quot, RIGHT, buff=0.5)
        self.play(FadeIn(une, shift=LEFT * 0.15), run_time=0.5)
        self.au_mot("pas 75 %")
        barre = Line(ph[0][1].get_left() + LEFT * 0.05, ph[0][1].get_right() + RIGHT * 0.05, color=ROUGE_ERREUR,
                     stroke_width=6)
        self.play(ph[0][1].animate.set_opacity(1), run_time=0.2)
        self.play(Create(barre), Indicate(ph[0][1], color=ROUGE_ERREUR, scale_factor=1.4), run_time=0.6)
        self.attendre_voix()

    # ── 06 : défi : la branche S barre → B ──────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        a = self.arbre(P(-3.4, 0.05), 0.95)
        self.play(FadeIn(a), run_time=0.5)
        self.au_mot("Écris en phrase")
        q1 = self.t("Écris en phrase", 38, BLEU_CALCUL)
        q2 = suite(self.t("le", 38), self.t("0,5", 46, PROBA), buff=0.18)
        q = VGroup(q1, q2).arrange(DOWN, buff=0.3).move_to(P(3.2, 1.0))
        self.play(FadeIn(q1, shift=UP * 0.15), run_time=0.5)
        self.au_mot("le 0,5")
        self.play(FadeIn(q2, shift=UP * 0.15), run_time=0.4)
        self.au_mot("de la branche")
        self.play(*a.etat([4]), run_time=0.7)
        self.insister(a.nombres[4], 0.35)
        self.au_mot("de S barre à B")
        self.play(Indicate(a.lab[1][1], color=CHEMIN, scale_factor=1.6), run_time=0.5)
        self.play(Indicate(a.lab[4], color=CHEMIN, scale_factor=1.6), run_time=0.5)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction")
        a = self.arbre()
        self.add(a)
        self.play(*a.etat([4]), run_time=0.5)
        self.au_mot("C'est P indice S barre de B")
        f = self.formule("S", "B", 84, barre=True).move_to(P(2.7, 1.9))
        self.play(FadeIn(f[0]), TransformFromCopy(a.lab[1][1], f[1]), run_time=0.6)
        self.play(TransformFromCopy(a.lab[4], f[2]), run_time=0.5)
        self.au_mot("« Parmi les maisons sans")
        ph = self.lignes([[("« Parmi les maisons sans", WHITE)],
                          [("panneaux solaires,", WHITE), ("la moitié", JAUNE_TITRE)],
                          [("ont vu leur facture baisser. »", WHITE)]], 31, P(3.05, 0.0))
        cad = SurroundingRectangle(ph[0], color=JAUNE_TITRE, buff=0.1, stroke_width=5)
        self.play(FadeIn(ph[0], shift=UP * 0.15), FadeIn(ph[1][0], shift=UP * 0.15), run_time=0.6)
        self.play(Create(cad), Indicate(f[1], color=JAUNE_TITRE, scale_factor=1.8), run_time=0.6)
        self.au_mot("la moitié")
        self.play(TransformFromCopy(a.nombres[4], ph[1][1]), run_time=0.6)
        self.insister(ph[1][1], 0.3)
        self.play(FadeIn(ph[2], shift=UP * 0.1), run_time=0.5)
        ok = self.coche(taille=0.3).next_to(ph[2], DOWN, buff=0.45)
        self.play(Create(ok), run_time=0.4)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 34
        l1 = suite(self.formule("A", "B", fs + 8), self.t(": « parmi les A, la proportion de B »", fs), buff=0.15)
        l2 = self.t("Le groupe vient en premier", fs)
        l3 = suite(self.t("P(A ∩ B)", fs + 8), self.t(": « A et B à la fois », sur tout le monde", fs), buff=0.15)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6)
        if lignes.width > 11.6:
            lignes.scale_to_fit_width(11.6)
        lignes.move_to(P(-0.6, 0.6))
        for mot, l in zip(["P indice A de B se dit", "Le groupe vient", "P de A inter B"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("Prochaine vidéo")
        self.play(Write(self.chute("Prochaine vidéo : les tests de dépistage et les faux positifs", color=VERT_OK,
                                   font_size=32)))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_arbre()
        self.ecran_phrase()
        self.ecran_et()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")


class ProbaInterpreterSTMG(ProbaInterpreterBase):
    identite = "Maths STMG — EleveAI"


class ProbaInterpreterPremiere(ProbaInterpreterBase):
    identite = "Maths 1re — EleveAI"
