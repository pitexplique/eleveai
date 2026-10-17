# proba_vocabulaire.py
# EleveAI — Maths 2de — série « Probabilités », épisode 1 : univers, issue,
# événement (micro : proba_vocabulaire), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Short jumeau : proba_vocabulaire_short.py (ceinture jaune : 7 ou 12 ?).
#
# Écrans : 00 garde · 01 les petits chevaux (deux dés, on additionne) · 02
# l'univers Ω = {2 ; … ; 12} (11 issues) · 03 l'événement A « total pair » (les
# cases s'allument) · 04 contraire Ā, A ∩ B, A ∪ B (diagramme) · 05 la méthode
# (écrire Ω, entourer) · 06 ⭐ le piège : le TABLEAU À DOUBLE ENTRÉE des deux
# dés, les 6 façons de faire 7, une seule pour 2 · 07 défi B « total ≥ 10 » ·
# 07b correction · 08 ce que tu as appris · 09 abonnement.
#
# Canvas du coach repris (lib/tutor-v4/components/ProbabilitesCanvas.tsx) :
#   · variant « de » : tuiles blanches cerclées de nuit (#f8fafc / #0f172a), les
#     issues de l'événement SURLIGNÉES en ambre (#fef3c7, bord #fbbf24) ;
#   · variant « tableau » : en-têtes gris clair (#f1f5f9), cases blanches,
#     cases surlignées ambre (#fef3c7, texte #78350f).
#
# Voix : manim/voix/seconde-proba-vocabulaire.json (Julie, débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/seconde/proba_vocabulaire.py ProbaVocabulaireSeconde -o eleveai-maths-seconde-proba-vocabulaire --media_dir manim/scripts/seconde/media
# Puis copier le mp4 dans manim/sorties/seconde/maths/probabilites/01-vocabulaire/.

import importlib.util
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
from annonce_probabilites import de, de_qui_roule  # noqa: E402

# Le plateau des petits chevaux de la 3e (même nom de module : on le charge à part).
_spec = importlib.util.spec_from_file_location(
    "proba_vocabulaire_3e", Path(__file__).resolve().parents[1] / "3e" / "proba_vocabulaire.py")
_v3e = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_v3e)
plateau_chevaux = _v3e.plateau_chevaux

# Les couleurs du canvas du coach.
TUILE_FOND = "#F8FAFC"
TUILE_BORD = "#0F172A"
AMBRE_FOND = "#FEF3C7"
AMBRE_BORD = "#FBBF24"
AMBRE_TEXTE = "#78350F"
BLEU_FOND = "#DBEAFE"
BLEU_BORD = "#3B82F6"
ENTETE_FOND = "#F1F5F9"
CASE_BORD = "#CBD5E1"


class Notion2de(Notion6e):
    identite = "Maths 2de — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


def tuile(texte, cote=0.74, fs=32):
    """Une issue, à la manière du canvas « de » du coach : tuile blanche, bord nuit."""
    fond = RoundedRectangle(width=cote, height=cote, corner_radius=cote * 0.16, fill_color=TUILE_FOND,
                            fill_opacity=1, stroke_color=TUILE_BORD, stroke_width=3)
    return VGroup(fond, Text(texte, font_size=fs, color=TUILE_BORD, weight=BOLD).move_to(fond))


def allumer(t, fond=AMBRE_FOND, bord=AMBRE_BORD, texte=AMBRE_TEXTE):
    """Les animations qui SURLIGNENT une tuile (ambre par défaut, comme le coach)."""
    return [t[0].animate.set_fill(fond, 1).set_stroke(bord, 6), t[1].animate.set_color(texte)]


def eteindre(t):
    return [t[0].animate.set_fill(TUILE_FOND, 1).set_stroke(TUILE_BORD, 3), t[1].animate.set_color(TUILE_BORD)]


def a_barre(fs=36, color=WHITE):
    """« A barre » : un A et sa barre, en Text + un trait."""
    a = Text("A", font_size=fs, color=color)
    barre = Line(a.get_corner(UL) + P(-0.02, 0.09), a.get_corner(UR) + P(0.02, 0.09), color=color,
                 stroke_width=3.5)
    return VGroup(a, barre)


def tableau_deux_des(centre, cell=0.5, fs=24):
    """Le tableau à double entrée des deux dés, à la manière du canvas « tableau » du
    coach. Renvoie (cadre : en-têtes + cases vides, {(i, j): case}, {(i, j): texte})."""
    entetes, cases, textes = VGroup(), {}, {}
    coin = Square(cell, fill_color=ENTETE_FOND, fill_opacity=1, stroke_color=CASE_BORD, stroke_width=2)
    entetes.add(VGroup(coin, Text("+", font_size=fs + 4, color=TUILE_BORD, weight=BOLD).move_to(coin)))
    for k in range(1, 7):
        for pos in (P(k * cell, 0), P(0, -k * cell)):
            sq = Square(cell, fill_color=ENTETE_FOND, fill_opacity=1, stroke_color=CASE_BORD,
                        stroke_width=2).move_to(pos)
            entetes.add(VGroup(sq, Text(str(k), font_size=fs, color=TUILE_BORD, weight=BOLD).move_to(sq)))
    for i in range(1, 7):
        for j in range(1, 7):
            sq = Square(cell, fill_color=WHITE, fill_opacity=1, stroke_color=CASE_BORD,
                        stroke_width=2).move_to(P(j * cell, -i * cell))
            cases[(i, j)] = sq
            textes[(i, j)] = Text(str(i + j), font_size=fs, color=TUILE_BORD).move_to(sq)
    grille = VGroup(entetes, *cases.values())
    decal = centre - grille.get_center()
    grille.shift(decal)
    for t in textes.values():
        t.shift(decal)
    return grille, cases, textes


class ProbaVocabulaireSeconde(Notion2de):
    nom_voix = "seconde-proba-vocabulaire"

    X_C = -0.6     # le centre de l'écran utile (Ti-Margo occupe le coin bas-droit)
    PAS = 0.88     # l'écart entre deux tuiles de Ω

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=36, buff=0.2):
        """Une ligne en morceaux colorés, d'UN SEUL Text (même ligne de base) ;
        ligne[i] reste le i-ème morceau. Un morceau déjà dessiné (Ā) est posé à part."""
        if any(isinstance(m, Mobject) for m, _ in morceaux):
            g = VGroup(*[m if isinstance(m, Mobject) else self.t(m, font_size, c) for m, c in morceaux])
            return g.arrange(RIGHT, buff=buff)
        T = Text(" ".join(m for m, _ in morceaux), font_size=font_size)
        tailles = [len(m.replace(" ", "")) for m, _ in morceaux]
        if len(T) != sum(tailles):  # ligature : on retombe sur des morceaux séparés
            return VGroup(*[self.t(m, font_size, c) for m, c in morceaux]).arrange(RIGHT, buff=buff)
        g, k = VGroup(), 0
        for (m, c), n in zip(morceaux, tailles):
            g.add(VGroup(*T[k:k + n]).set_color(c))
            k += n
        return g

    def insister(self, mob, run_time=0.4, k=1.5):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def allumer_monter(self, tu, fond=AMBRE_FOND, bord=AMBRE_BORD, texte=AMBRE_TEXTE, run_time=0.3):
        def f(m):
            m[0].set_fill(fond, 1).set_stroke(bord, 6)
            m[1].set_color(texte)
            m.shift(UP * 0.2)
            return m
        self.play(ApplyFunction(f, tu), run_time=run_time)

    def etiquette(self, texte, color, font_size=30):
        lbl = self.t(texte, font_size, BLACK)
        fond = RoundedRectangle(width=lbl.width + 0.4, height=lbl.height + 0.3, corner_radius=0.12,
                                fill_color=color, fill_opacity=1, stroke_width=0)
        return VGroup(fond, lbl.move_to(fond))

    def omega(self, y):
        """Ω = { 2 ; 3 ; … ; 12 } : 11 tuiles du coach entre deux accolades.
        Renvoie (tuiles, habillage « Ω = { … } »)."""
        tuiles = VGroup(*[tuile(str(k)).move_to(P(self.X_C + 0.35 + (k - 7) * self.PAS, y))
                          for k in range(2, 13)])
        g = Text("{", font_size=72, color=WHITE).next_to(tuiles, LEFT, buff=0.12)
        d = Text("}", font_size=72, color=WHITE).next_to(tuiles, RIGHT, buff=0.12)
        om = self.t("Ω =", 44, JAUNE_TITRE).next_to(g, LEFT, buff=0.15)
        return tuiles, VGroup(om, g, d)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Univers, issue, événement", 54, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.5))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech))
        d1 = de_qui_roule(P(-1.6, 0.75), 1.3)
        d2 = de_qui_roule(P(0.4, 0.75), 1.3, periode=0.19, faces=[4, 1, 6, 2, 5, 3])
        self.add(d1, d2)
        self.au_mot("les mots des probabilités")
        q = self.t("les mots des probabilités au lycée", 40, BLEU_CALCUL).move_to(P(-0.6, -0.85))
        self.play(FadeIn(q, shift=UP * 0.2))
        self.attendre_voix(marge=1.0)
        d1.clear_updaters()
        d2.clear_updaters()

    # ── 01 : les petits chevaux ─────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Deux dés aux petits chevaux")
        plat, pions, chemin = plateau_chevaux(4.0)
        plat.move_to(P(-4.4, 0.2))
        decal = plat[0].get_center()
        chemin = [p + decal for p in chemin]
        self.play(FadeIn(plat, scale=0.9), run_time=0.7)
        self.au_mot("on lance deux dés")
        r1 = de_qui_roule(P(0.2, 1.0), 1.3, periode=0.16)
        r2 = de_qui_roule(P(2.8, 1.0), 1.3, periode=0.2, faces=[4, 1, 6, 2, 5, 3])
        self.add(r1, r2)
        self.au_mot("on additionne")
        plus = self.t("+", 72, JAUNE_TITRE).move_to(P(1.5, 1.0))
        self.play(FadeIn(plus, scale=0.5), run_time=0.4)
        self.au_mot("Quels totaux")
        tot = self.ligne([("total", WHITE), ("=", WHITE), ("?", ORANGE_RETENUE)], 56, 0.3).move_to(P(1.5, -0.9))
        self.play(FadeIn(tot, shift=UP * 0.2), run_time=0.5)
        self.insister(tot[2], 0.35)
        rouge = pions[0]
        for p in chemin[:3]:
            self.play(rouge.animate.move_to(p), run_time=0.25)
        self.attendre_voix()
        r1.clear_updaters()
        r2.clear_updaters()

    # ── 02 : l'univers ──────────────────────────────────────────────────────

    def ecran_univers(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-univers")
        self.titre_ecran("L'univers")
        self.au_mot("s'appelle l'univers")
        d1 = self.ligne([("univers", VERT_OK), ("=", WHITE), ("l'ensemble de tous les résultats possibles", WHITE)],
                        34, 0.25).move_to(P(self.X_C, 2.25))
        self.play(FadeIn(d1, shift=UP * 0.15), run_time=0.6)
        self.au_mot("On le note oméga")
        gros = self.t("Ω", 120, JAUNE_TITRE).move_to(P(self.X_C, 0.9))
        self.play(FadeIn(gros, scale=0.5), run_time=0.5)
        self.insister(gros, 0.35)
        tuiles, hab = self.omega(-0.2)
        self.au_mot("de 2 à 12")
        self.play(ReplacementTransform(gros, hab[0]), FadeIn(hab[1:]), run_time=0.6)
        self.play(LaggedStart(*[FadeIn(t, shift=UP * 0.3, scale=0.6) for t in tuiles], lag_ratio=0.12),
                  run_time=1.4)
        self.au_mot("11 issues")
        acc = Brace(tuiles, DOWN, color=VERT_OK)
        onze = self.ligne([("11", JAUNE_TITRE), ("issues", VERT_OK)], 44, 0.2).next_to(acc, DOWN, buff=0.2)
        self.play(GrowFromCenter(acc), FadeIn(onze, shift=UP * 0.15), run_time=0.5)
        self.insister(onze[0], 0.35)
        self.attendre_voix()

    # ── 03 : l'événement ────────────────────────────────────────────────────

    def ecran_evenement(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-evenement")
        self.titre_ecran("Un événement")
        tuiles, hab = self.omega(0.85)
        self.add(tuiles, hab)
        self.au_mot("une partie de l'univers")
        d1 = self.ligne([("un événement", BLEU_CALCUL), ("=", WHITE), ("une partie de l'univers", WHITE)],
                        36, 0.25).move_to(P(self.X_C, 2.2))
        self.play(FadeIn(d1, shift=UP * 0.15), run_time=0.5)
        self.au_mot("le total est pair")
        ev = self.etiquette("A : « le total est pair »", AMBRE_BORD, 34).move_to(P(self.X_C, -0.6))
        self.play(GrowFromCenter(ev), run_time=0.5)
        self.au_mot("A est réalisé")
        res = self.ligne([("A", AMBRE_BORD), ("est réalisé par", WHITE)], 36, 0.2).move_to(P(self.X_C, -1.7))
        self.play(FadeIn(res, shift=UP * 0.15), run_time=0.4)
        for ex, k in zip(["par 2", "2, 4", "4, 6", "6, 8", "8, 10", "et 12"], (2, 4, 6, 8, 10, 12)):
            self.au_mot(ex)
            self.allumer_monter(tuiles[k - 2])
        self.attendre_voix()

    # ── 04 : contraire, intersection, réunion ───────────────────────────────

    def ecran_operations(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-operations")
        self.titre_ecran("Contraire, inter, union")
        tuiles, hab = self.omega(1.75)
        for k in (2, 4, 6, 8, 10, 12):
            tu = tuiles[k - 2]
            tu[0].set_fill(AMBRE_FOND, 1).set_stroke(AMBRE_BORD, 6)
            tu[1].set_color(AMBRE_TEXTE)
        self.add(tuiles, hab)
        x_g = -6.4
        self.au_mot("noté A barre")
        ab = a_barre(38, BLEU_BORD)
        l1 = self.ligne([(ab, None), (":", WHITE)], 38, 0.15)
        l1.move_to(P(0, 0.45)).align_to(P(x_g, 0), LEFT)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.5)
        self.insister(ab, 0.3)
        self.au_mot("le total est impair")
        imp = self.t("« le total est impair »", 34, BLEU_BORD).next_to(l1, RIGHT, buff=0.2)
        self.play(FadeIn(imp, shift=RIGHT * 0.15), *[a for k in (3, 5, 7, 9, 11)
                                                       for a in allumer(tuiles[k - 2], BLEU_FOND, BLEU_BORD, TUILE_BORD)],
                  run_time=0.6)

        # le diagramme A / B
        ca = Circle(radius=0.95, color=AMBRE_BORD, stroke_width=4).move_to(P(3.0, -1.2))
        cb = Circle(radius=0.95, color=VERT_OK, stroke_width=4).move_to(P(4.1, -1.2))
        la = self.t("A", 32, AMBRE_BORD).next_to(ca, UP, buff=0.08).shift(LEFT * 0.45)
        lb = self.t("B", 32, VERT_OK).next_to(cb, UP, buff=0.08).shift(RIGHT * 0.45)
        inter = Intersection(ca, cb, fill_color=JAUNE_TITRE, fill_opacity=0.85, stroke_width=0)
        union = Union(ca, cb, fill_color=VERT_OK, fill_opacity=0.45, stroke_width=0)

        self.au_mot("A inter B")
        l2 = self.ligne([("A ∩ B", JAUNE_TITRE), (":", WHITE), ("A et B en même temps", WHITE)], 34, 0.2)
        l2.move_to(P(0, -0.6)).align_to(P(x_g, 0), LEFT)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), Create(ca), Create(cb), FadeIn(la), FadeIn(lb), run_time=0.7)
        self.au_mot("en même temps")
        self.play(FadeIn(inter), run_time=0.4)
        self.insister(inter, 0.3)
        self.au_mot("A union B")
        l3 = self.ligne([("A ∪ B", VERT_OK), (":", WHITE), ("A ou B, ou les deux", WHITE)], 34, 0.2)
        l3.move_to(P(0, -1.7)).align_to(P(x_g, 0), LEFT)
        self.play(FadeIn(l3, shift=RIGHT * 0.2), FadeOut(inter), run_time=0.5)
        self.play(FadeIn(union), run_time=0.5)
        self.au_mot("ou les deux")
        self.play(Indicate(Intersection(ca, cb, fill_color=VERT_OK, fill_opacity=0.9, stroke_width=0),
                           color=VERT_OK), run_time=0.6)
        self.attendre_voix()

    # ── 05 : la méthode ─────────────────────────────────────────────────────

    def ecran_methode(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-methode")
        self.titre_ecran("La méthode")
        x_g = -6.4
        self.au_mot("écrire l'univers en entier")
        e1 = self.ligne([("D'abord :", JAUNE_TITRE), ("écrire l'univers en entier", WHITE)], 36, 0.2)
        e1.move_to(P(0, 2.2)).align_to(P(x_g, 0), LEFT)
        self.play(FadeIn(e1, shift=RIGHT * 0.2), run_time=0.5)
        tuiles, hab = self.omega(1.0)
        self.play(FadeIn(hab), LaggedStart(*[FadeIn(t, shift=UP * 0.2) for t in tuiles], lag_ratio=0.1),
                  run_time=1.2)
        self.au_mot("pour chaque événement")
        e2 = self.ligne([("Puis,", JAUNE_TITRE), ("pour chaque événement :", WHITE)], 36, 0.2)
        e2.move_to(P(0, -0.35)).align_to(P(x_g, 0), LEFT)
        self.play(FadeIn(e2, shift=RIGHT * 0.2), run_time=0.5)
        e3 = self.t("entourer les issues qui le réalisent", 36).next_to(e2, DOWN, buff=0.3).align_to(e2, LEFT)
        self.au_mot("entourer les issues")
        self.play(FadeIn(e3, shift=RIGHT * 0.2), run_time=0.5)
        ronds = [Circle(radius=0.44, color=AMBRE_BORD, stroke_width=6).move_to(tuiles[k - 2]) for k in (2, 4, 6, 8, 10, 12)]
        self.play(LaggedStart(*[Create(r) for r in ronds], lag_ratio=0.3), run_time=1.8)
        self.attendre_voix()

    # ── 06 : le piège — le tableau à double entrée ──────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        grille, cases, textes = tableau_deux_des(P(-3.3, -0.5), cell=0.62, fs=28)
        self.play(FadeIn(grille), run_time=0.7)
        x_d = 0.3
        self.au_mot("les 11 totaux")
        r1 = self.ligne([("11", JAUNE_TITRE), ("totaux", WHITE)], 38, 0.2)
        r1.move_to(P(0, 1.55)).align_to(P(x_d, 0), LEFT)
        self.play(FadeIn(r1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("pas équiprobables")
        r2 = self.t("pas équiprobables !", 38, ROUGE_ERREUR).next_to(r1, DOWN, buff=0.2).align_to(r1, LEFT)
        self.play(FadeIn(r2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("7 sort de 6 façons")
        sept = [(1, 6), (2, 5), (3, 4), (4, 3), (5, 2), (6, 1)]
        anims = []
        for c in sept:
            textes[c].set_color(AMBRE_TEXTE)
            anims.append(AnimationGroup(cases[c].animate.set_fill(AMBRE_FOND, 1).set_stroke(AMBRE_BORD, 4),
                                        FadeIn(textes[c], scale=0.5)))
        self.play(LaggedStart(*anims, lag_ratio=0.35), run_time=1.6)
        r3 = self.ligne([("7", AMBRE_BORD), (":", WHITE), ("6 façons", AMBRE_BORD)], 38, 0.2)
        r3.move_to(P(0, 0.05)).align_to(P(x_d, 0), LEFT)
        self.play(FadeIn(r3, shift=RIGHT * 0.2), run_time=0.35)
        self.insister(r3[2], 0.3)
        self.au_mot("2 d'une seule")
        textes[(1, 1)].set_color(TUILE_BORD)
        self.play(cases[(1, 1)].animate.set_fill(BLEU_FOND, 1).set_stroke(BLEU_BORD, 4),
                  FadeIn(textes[(1, 1)], scale=0.5), run_time=0.45)
        r4 = self.ligne([("2", BLEU_BORD), (":", WHITE), ("une seule", BLEU_BORD)], 38, 0.2)
        r4.next_to(r3, DOWN, buff=0.35).align_to(r3, LEFT)
        self.play(FadeIn(r4, shift=RIGHT * 0.2), run_time=0.35)
        self.insister(cases[(1, 1)], 0.3)
        self.au_mot("L'univers dit")
        ch = self.chute("L'univers dit ce qui peut sortir, pas avec quelle chance.", color=BLEU_CALCUL, font_size=32)
        self.play(Write(ch), run_time=1.0)
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        tuiles, hab = self.omega(1.75)
        self.play(FadeIn(hab), FadeIn(tuiles), run_time=0.5)
        self.au_mot("le total est supérieur")
        b = self.etiquette("B : « le total est supérieur ou égal à 10 »", VERT_OK, 30).move_to(P(self.X_C, 0.55))
        self.play(GrowFromCenter(b), run_time=0.5)
        self.au_mot("égal à 10")
        self.insister(b, 0.3, k=1.15)
        x_g = -6.0
        self.au_mot("Quelles issues réalisent B")
        q1 = self.ligne([("Quelles issues réalisent", WHITE), ("B", VERT_OK), ("?", WHITE)], 36, 0.18)
        q1.move_to(P(0, -0.6)).align_to(P(x_g, 0), LEFT)
        self.play(FadeIn(q1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Et A inter B")
        q2 = self.ligne([("Et", WHITE), ("A ∩ B", JAUNE_TITRE), ("?", WHITE)], 36, 0.18)
        q2.next_to(q1, DOWN, buff=0.35).align_to(q1, LEFT)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=38)))
        self.attendre_voix(marge=2.0)

    # ── 07b : correction ────────────────────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        tuiles, hab = self.omega(1.75)
        self.add(tuiles, hab)
        x_g = -6.0
        self.au_mot("B est réalisé")
        rb = self.ligne([("B", VERT_OK), ("est réalisé par", WHITE)], 36, 0.2)
        rb.move_to(P(0, 0.35)).align_to(P(x_g, 0), LEFT)
        self.play(FadeIn(rb, shift=RIGHT * 0.2), run_time=0.4)
        nb = []
        for ex, k, mot in zip(["par 10", "10, 11", "et 12"], (10, 11, 12), ("10,", "11", "et 12")):
            self.au_mot(ex)
            m = self.t(mot, 36, VERT_OK).next_to(nb[-1] if nb else rb, RIGHT, buff=0.2).align_to(rb, DOWN)
            nb.append(m)
            self.play(FadeIn(m, scale=0.6), run_time=0.2)
            self.allumer_monter(tuiles[k - 2], "#DCFCE7", VERT_OK, TUILE_BORD, run_time=0.25)
        self.au_mot("A inter B")
        ai = self.ligne([("A ∩ B", JAUNE_TITRE), (":", WHITE)], 36, 0.15)
        ai.move_to(P(0, -0.65)).align_to(P(x_g, 0), LEFT)
        self.play(FadeIn(ai, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("total pair")
        suite = self.ligne([("total pair", AMBRE_BORD), ("et", WHITE), ("au moins 10", VERT_OK)], 36, 0.2)
        suite.next_to(ai, RIGHT, buff=0.2).align_to(ai, DOWN)
        self.play(FadeIn(suite, shift=RIGHT * 0.2), tuiles[9].animate.set_opacity(0.3), run_time=0.5)
        self.au_mot("10 et 12")
        res = self.t("10 et 12", 44, AMBRE_BORD).next_to(ai, DOWN, buff=0.45).align_to(ai, LEFT)
        self.play(*allumer(tuiles[8]), *allumer(tuiles[10]), FadeIn(res, shift=RIGHT * 0.2), run_time=0.4)
        self.insister(res, 0.35, k=1.25)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        acquis = [
            ("L'univers, c'est", "L'univers, c'est l'ensemble des issues"),
            ("Un événement est une partie", "Un événement est une partie de l'univers"),
            ("Contraire, intersection", "Contraire, intersection, réunion"),
            ("pas forcément équiprobables", "Des issues pas forcément équiprobables"),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 38)).arrange(RIGHT, buff=0.3) for _, txt in acquis])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.7)
        if lignes.width > 10.0:
            lignes.scale_to_fit_width(10.0)
        lignes.move_to(P(-0.9, 0.3))
        for (mot, _), l in zip(acquis, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode 2")
        self.play(Write(self.chute("Épisode 2 : construire une loi de probabilité", color=VERT_OK, font_size=36)))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_univers()
        self.ecran_evenement()
        self.ecran_operations()
        self.ecran_methode()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
