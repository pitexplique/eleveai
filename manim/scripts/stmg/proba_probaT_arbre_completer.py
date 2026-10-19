# proba_probaT_arbre_completer.py
# EleveAI — Maths STMG ET Maths 1re (tronc commun) — série « Probabilités » :
# COMPLÉTER un arbre pondéré (micros : probaT_arbre_completer en STMG,
# alea_arbre_completer en 1re), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Short jumeau : proba_probaT_arbre_completer_short.py (ceinture jaune,
# « la pêche aux canards »).
#
# ⭐⭐ UNE voix, UN script, DEUX rendus (Frédéric, 18/10 : « pour vendre en
# pack ») : ProbaArbreCompleterBase porte toutes les scènes ; les deux
# sous-classes ne changent que l'identité. La voix ne cite aucune classe.
#
# ⭐ La figure est l'ARBRE PONDÉRÉ du coach (`arbre_proba` « Arbre à
# compléter », la branche effacée marquée « ? ») : carte blanche, branches
# grises, probabilités en bleu, nœud étiqueté au-dessus, feuille à droite.
# Repris de proba_probaC_interpreter.py. Les TROUS sont des cases « ? » en
# pointillé ; chacun se remplit QUAND la voix dit son nombre (0,6 ; 0,1 ;
# 0,75 ; 0,25).
#
# Écrans : 00 garde · 01 le covoiturage (40 % travail, 90 % à l'heure parmi
# les autres, 30 % travail ET à l'heure) · 02 l'arbre troué (0,4 ; 0,9 ; quatre
# « ? ») · 03 règle 1 : 1 − 0,4 = 0,6 ; 1 − 0,9 = 0,1 · 04 règle 2 : le chemin
# T → H, 0,4 × ? = 0,3 puis ? = 0,3 ÷ 0,4 = 0,75 · 05 1 − 0,75 = 0,25, arbre
# complet · 06 le piège : 0,3 posé sur la branche, barré, remplacé par 0,75 ·
# 07 défi (P(A) = 0,5, P(A ∩ B) = 0,2) · 07b correction · 08 ce que tu as
# appris · 09 abonnement.
#
# Voix : manim/voix/stmg-premiere-proba-arbre-completer.json (Julie, débit −7).
# Rendus (media à soi : des rendus parallèles dans le même media → WinError 32) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_probaT_arbre_completer.py ProbaArbreCompleterSTMG -o eleveai-maths-stmg-proba-arbre-completer --media_dir manim/scripts/stmg/media-probaT_arbre_completer
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_probaT_arbre_completer.py ProbaArbreCompleterPremiere -o eleveai-maths-premiere-commun-proba-arbre-completer --media_dir manim/scripts/stmg/media-probaT_arbre_completer
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaT_arbre_completer_short.py ShortProbaArbreCompleterSTMG -o eleveai-maths-stmg-proba-arbre-completer-short --media_dir manim/scripts/stmg/media-probaT_arbre_completer
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_probaT_arbre_completer_short.py ShortProbaArbreCompleterPremiere -o eleveai-maths-premiere-commun-proba-arbre-completer-short --media_dir manim/scripts/stmg/media-probaT_arbre_completer
# Puis copier dans manim/sorties/stmg/maths/probabilites/08-arbre-completer/ et
# manim/sorties/premiere-commun/maths/probabilites/08-arbre-completer/.

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
    BORD, BRANCHE, CHEMIN, ENCRE, PROBA, lettre, p_cond, pastille, suite,
)

TROU = "#F97316"        # le « ? » d'une branche effacée
ROUTE = "#334155"
BUREAU = "#94A3B8"
XD = 3.6                # le centre de la colonne de droite


def P(x, y):
    return np.array([x, y, 0.0])


# ── les dessins : téléphone, route, voiture, bureau, horloge ────────────────

def voiture(couleur="#38BDF8", s=1.0):
    caisse = RoundedRectangle(width=1.3, height=0.42, corner_radius=0.12, fill_color=couleur, fill_opacity=1,
                              stroke_width=0)
    cabine = RoundedRectangle(width=0.78, height=0.36, corner_radius=0.1, fill_color=couleur, fill_opacity=1,
                              stroke_width=0).next_to(caisse, UP, buff=-0.04).shift(LEFT * 0.06)
    vitres = VGroup(*[Rectangle(width=0.27, height=0.2, fill_color="#E0F2FE", fill_opacity=1, stroke_width=0)
                      for _ in range(2)]).arrange(RIGHT, buff=0.07).move_to(cabine).shift(DOWN * 0.02)
    tetes = VGroup(*[Circle(radius=0.06, fill_color=c, fill_opacity=1, stroke_width=0).move_to(v)
                     for c, v in zip(("#78350F", "#F59E0B"), vitres)])
    roues = VGroup(*[Circle(radius=0.13, fill_color="#0F172A", fill_opacity=1, stroke_color=WHITE,
                            stroke_width=2).move_to(caisse.get_bottom() + RIGHT * dx) for dx in (-0.38, 0.38)])
    return VGroup(caisse, cabine, vitres, tetes, roues).scale(s)


def telephone(s=1.0):
    corps = RoundedRectangle(width=1.0, height=1.8, corner_radius=0.15, fill_color="#0F172A", fill_opacity=1,
                             stroke_color=WHITE, stroke_width=3)
    ecran = Rectangle(width=0.82, height=1.4, fill_color="#1E3A8A", fill_opacity=1, stroke_width=0).move_to(corps)
    epingle = VGroup(Circle(radius=0.13, fill_color=ROUGE_ERREUR, fill_opacity=1, stroke_width=0),
                     Triangle(fill_color=ROUGE_ERREUR, fill_opacity=1, stroke_width=0).scale(0.11).rotate(PI))
    epingle[1].next_to(epingle[0], DOWN, buff=-0.06)
    epingle.move_to(ecran).shift(UP * 0.25)
    trajet = DashedLine(P(-0.28, -0.45), P(0.28, -0.1), dash_length=0.06, color=JAUNE_TITRE, stroke_width=3)
    trajet.move_to(ecran).shift(DOWN * 0.3)
    return VGroup(corps, ecran, epingle, trajet).scale(s)


def bureau(s=1.0):
    corps = Rectangle(width=1.1, height=1.7, fill_color=BUREAU, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    fen = VGroup(*[Square(0.2, fill_color="#7DD3FC", fill_opacity=1, stroke_width=0) for _ in range(9)])
    fen.arrange_in_grid(3, 3, buff=0.12).move_to(corps).shift(UP * 0.2)
    porte = Rectangle(width=0.3, height=0.4, fill_color="#334155", fill_opacity=1, stroke_width=0)
    porte.align_to(corps, DOWN)
    return VGroup(corps, fen, porte).scale(s)


def horloge(r=0.4):
    c = Circle(radius=r, fill_color=WHITE, fill_opacity=1, stroke_color=ENCRE, stroke_width=4)
    a1 = Line(ORIGIN, UP * r * 0.65, color=ENCRE, stroke_width=4)
    a2 = Line(ORIGIN, RIGHT * r * 0.5, color=ENCRE, stroke_width=4)
    return VGroup(c, a1, a2)


def carte_lettre(lt, phrase, fs=28, barre=False):
    g = suite(lettre(lt, fs + 6, BLEU_CALCUL, barre), Text(":", font_size=fs), Text(phrase, font_size=fs), buff=0.14)
    fond = RoundedRectangle(width=g.width + 0.45, height=g.height + 0.35, corner_radius=0.15, fill_color="#0F172A",
                            fill_opacity=0.9, stroke_color=BLEU_CALCUL, stroke_width=3)
    return VGroup(fond, g.move_to(fond))


def case_trou(fs=26):
    """La case « ? » en pointillé : une probabilité effacée du coach."""
    q = Text("?", font_size=fs + 2, color=TROU, weight=BOLD)
    cadre = DashedVMobject(RoundedRectangle(width=0.62, height=0.44, corner_radius=0.08, stroke_color=TROU,
                                            stroke_width=3), num_dashes=16)
    fond = RoundedRectangle(width=0.62, height=0.44, corner_radius=0.08, fill_color="#FFF7ED", fill_opacity=1,
                            stroke_width=0)
    return VGroup(fond, cadre, q.move_to(fond))


# ── l'ARBRE PONDÉRÉ du coach, avec ses TROUS ────────────────────────────────

class ArbreTrous(VGroup):
    """Carte blanche du coach : départ, L1 / L1 barre, puis L2 / L2 barre.
    Branches : 0 → L1, 1 → L1 barre, 2 L1 → L2, 3 L1 → L2 barre,
    4 L1 barre → L2, 5 L1 barre → L2 barre.
    Une branche qui monte porte son nombre AU-DESSUS, une branche qui descend
    EN DESSOUS : les quatre nombres du second étage ne se touchent pas."""

    def __init__(self, l1="T", l2="H", dx=2.1, dy1=1.2, dy2=0.7, fs=30, titre="Arbre à compléter", **kw):
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
            m = lettre(l1, fs, ENCRE, b).next_to(noeuds[k], UP, buff=0.08)
            fond = BackgroundRectangle(m, color=WHITE, fill_opacity=1, buff=0.04)
            self.lab.append(VGroup(fond, m))
        for k, b in enumerate([False, True, False, True]):
            self.lab.append(lettre(l2, fs, ENCRE, b).next_to(feuilles[k], RIGHT, buff=0.12))
        tout = VGroup(self.depart, *self.branches, *self.lab)
        self.carte = RoundedRectangle(width=tout.width + 2.0, height=tout.height + 1.5, corner_radius=0.2,
                                      fill_color=WHITE, fill_opacity=1, stroke_color=BORD, stroke_width=2)
        self.carte.move_to(tout).shift(UP * 0.2 + RIGHT * 0.3)
        self.titre = Text(titre, font_size=22, color=ENCRE, weight=BOLD)
        self.titre.next_to(self.carte.get_top(), DOWN, buff=0.14)
        self.nombres = {}
        self.trous = {}
        self.add(self.carte, self.titre, *self.branches, self.depart, *self.lab)

    def socle(self):
        return VGroup(self.carte, self.titre, self.depart)

    def construire(self, k, run_time=0.6):
        """La branche k se trace, puis son étiquette apparaît au bout."""
        return Succession(Create(self.branches[k], run_time=run_time * 0.6),
                          FadeIn(self.lab[k], scale=1.4, run_time=run_time * 0.4))

    def _place(self, k, mob, buff=0.08):
        a, b = self.branches[k].get_start(), self.branches[k].get_end()
        d = b - a
        n = np.array([-d[1], d[0], 0.0])
        n = n / np.linalg.norm(n)
        if (n[1] < 0) != (d[1] < 0):
            n = -n
        demi = abs(n[0]) * mob.width / 2 + abs(n[1]) * mob.height / 2
        mob.move_to((a + b) / 2 + n * (demi + buff))
        return mob

    def nombre(self, k, texte, fs=26, color=PROBA):
        """Le nombre de la branche k, en bleu, contre le trait (pas encore affiché)."""
        t = self._place(k, Text(texte, font_size=fs, color=color, weight=BOLD))
        self.nombres[k] = t
        return t

    def trou(self, k):
        """La case « ? » de la branche k (pas encore affichée)."""
        c = self._place(k, case_trou(), buff=0.05)
        self.trous[k] = c
        return c

    def remplir(self, k, texte, run_time=0.6):
        """Le « ? » de la branche k devient son nombre."""
        t = self.nombre(k, texte)
        return ReplacementTransform(self.trous.pop(k), t, run_time=run_time)

    def etat(self, ks=None, op=0.18):
        """Allume les branches ks (orange épais) et estompe le reste ; ks=None : tout normal."""
        anims = []
        feuille_de = {2: 2, 3: 3, 4: 4, 5: 5}
        for k, br in enumerate(self.branches):
            on = ks is None or k in ks
            if ks is None:
                anims.append(br.animate.set_stroke(BRANCHE, 4, opacity=1))
            elif on:
                anims.append(br.animate.set_stroke(CHEMIN, 9, opacity=1))
            else:
                anims.append(br.animate.set_stroke(BRANCHE, 4, opacity=op))
            for d in (self.nombres, self.trous):
                if k in d:
                    anims.append(d[k].animate.set_opacity(1 if on else op))
        gardes = set() if ks is None else ({0} if any(k in (0, 2, 3) for k in ks) else set()) | (
            {1} if any(k in (1, 4, 5) for k in ks) else set()) | {feuille_de[k] for k in ks if k in feuille_de}
        for k, m in enumerate(self.lab):
            on = ks is None or k in gardes
            cible = m[1] if k < 2 else m
            anims.append(cible.animate.set_opacity(1 if on else op))
        return anims


DONNES = {0: "0,4", 4: "0,9"}
TROUVES = {1: "0,6", 5: "0,1", 2: "0,75", 3: "0,25"}   # dans l'ordre de la voix


class ProbaArbreCompleterBase(Notion6e):
    """Toutes les scènes ; les sous-classes ne changent que l'identité."""

    nom_voix = "stmg-premiere-proba-arbre-completer"
    identite = "Maths — EleveAI"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.4):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def arbre(self, n_trouves=0, centre=P(-3.3, -0.35), echelle=1.0):
        """L'arbre de la vidéo : les deux nombres donnés, les n_trouves premiers
        trous déjà remplis (ordre de la voix), les autres en « ? »."""
        a = ArbreTrous().scale(echelle).move_to(centre)
        for k, v in DONNES.items():
            a.add(a.nombre(k, v))
        for i, (k, v) in enumerate(TROUVES.items()):
            a.add(a.nombre(k, v) if i < n_trouves else a.trou(k))
        return a

    def calcul(self, morceaux, fs=50, centre=P(XD, 0.4)):
        """Une ligne de calcul ; morceaux = [(texte, couleur), …] ; « ? » en orange."""
        objs = [self.t(tx, fs, c) for tx, c in morceaux]
        return suite(*objs, buff=0.2).move_to(centre)

    def regle(self, numero, texte, y=1.95, fs=30):
        """La règle de l'écran, en cartouche à droite de l'arbre."""
        n = self.t(f"Règle {numero}", fs, JAUNE_TITRE)
        tx = self.t(texte, fs - 2)
        g = VGroup(n, tx).arrange(DOWN, buff=0.14)
        if g.width > 5.6:
            g.scale_to_fit_width(5.6)
        fond = RoundedRectangle(width=g.width + 0.5, height=g.height + 0.35, corner_radius=0.15, fill_color="#0F172A",
                                fill_opacity=0.9, stroke_color=JAUNE_TITRE, stroke_width=3)
        return VGroup(fond, g.move_to(fond)).move_to(P(XD, y))

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Compléter un arbre pondéré", 50, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.22)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.85))
        a = ArbreTrous(dx=1.7, dy1=1.0, dy2=0.55).scale(0.68).move_to(P(-0.6, -0.15))
        for k in range(6):
            a.add(a._place(k, a.trou(k).scale(0.68), buff=0.03))   # les cases suivent l'arbre réduit
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=1.0)
        self.au_mot("un arbre")
        self.play(FadeIn(a.socle()), *[Create(b) for b in a.branches], *[FadeIn(m) for m in a.lab], run_time=0.8)
        self.play(LaggedStart(*[FadeIn(a.trous[k], scale=1.6) for k in range(6)], lag_ratio=0.12), run_time=0.9)
        self.attendre_voix(marge=1.0)

    # ── 01 : le covoiturage ─────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Le covoiturage")
        tel = telephone(1.0).move_to(P(-5.6, 1.3))
        appli = self.t("Covoiturage", 24, BLEU_CALCUL).next_to(tel, DOWN, buff=0.15)
        route = Rectangle(width=6.6, height=0.7, fill_color=ROUTE, fill_opacity=1, stroke_width=0).move_to(P(-3.5, -1.2))
        tirets = DashedLine(P(-6.7, -1.2), P(-0.3, -1.2), dash_length=0.25, color=WHITE, stroke_width=3)
        bur = bureau(0.9).move_to(P(-1.2, 0.0))
        auto = voiture().move_to(P(-6.0, -1.05))
        self.au_mot("Une application")
        self.play(FadeIn(tel, shift=UP * 0.3), FadeIn(appli), FadeIn(route), FadeIn(tirets), run_time=0.8)
        self.add(auto)
        self.play(auto.animate.move_to(P(-4.4, -1.05)), run_time=0.8, rate_func=rate_functions.ease_out_sine)
        fs = 32
        l1 = suite(self.t("40 %", 44, JAUNE_TITRE), self.t("des trajets : travail", fs), buff=0.2)
        l2a = self.t("Parmi les autres trajets :", fs, BLEU_CALCUL)
        l2b = suite(self.t("90 %", 44, JAUNE_TITRE), self.t("à l'heure", fs), buff=0.2)
        l3a = suite(self.t("30 %", 44, JAUNE_TITRE), self.t("de tous les trajets :", fs), buff=0.2)
        l3b = suite(self.t("travail", fs), self.t("ET", fs, ORANGE_RETENUE), self.t("à l'heure", fs), buff=0.18)
        bloc = VGroup(l1, l2a, l2b, l3a, l3b).arrange(DOWN, aligned_edge=LEFT, buff=0.22).move_to(P(3.2, 0.35))
        l2b.shift(DOWN * 0.0)
        VGroup(l3a, l3b).shift(DOWN * 0.25)
        self.au_mot("40 %")
        self.play(FadeIn(l1[0], scale=1.6), FadeIn(bur, shift=UP * 0.2), run_time=0.6)
        self.play(FadeIn(l1[1], shift=UP * 0.1), auto.animate.move_to(P(-2.2, -1.05)), run_time=0.8)
        self.au_mot("Parmi les autres")
        hor = horloge().move_to(P(-3.4, 0.45))
        self.play(FadeIn(l2a, shift=UP * 0.1), run_time=0.5)
        self.au_mot("90 %")
        self.play(FadeIn(l2b, scale=1.3), FadeIn(hor, scale=0.6), run_time=0.6)
        self.play(Rotate(hor[1], -TAU, about_point=hor[0].get_center()), run_time=0.8)
        self.au_mot("30 %")
        self.play(FadeIn(l3a, shift=UP * 0.1), run_time=0.6)
        self.au_mot("vont au travail ET")
        self.play(FadeIn(l3b, shift=UP * 0.1), run_time=0.5)
        self.insister(l3b[1], 0.3)
        self.au_mot("L'arbre a des trous")
        self.play(Write(self.chute("L'arbre a des trous : on va les remplir.", color=VERT_OK, font_size=32)))
        self.attendre_voix()

    # ── 02 : l'arbre troué, branche par branche ─────────────────────────────

    def ecran_arbre(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-arbre-troue")
        self.titre_ecran("L'arbre à trous")
        a = ArbreTrous().move_to(P(-3.3, -0.35))
        n0, n4 = a.nombre(0, "0,4"), a.nombre(4, "0,9")
        tr = {k: a.trou(k) for k in (1, 2, 3, 5)}
        self.au_mot("Voici l'arbre")
        self.play(FadeIn(a.socle()), run_time=0.5)
        cT = carte_lettre("T", "« le trajet va au travail »", 26)
        cT.move_to(P(0.45 + cT.width / 2, 1.5))
        cH = carte_lettre("H", "« il arrive à l'heure »", 26)
        cH.move_to(P(0.45 + cH.width / 2, 0.45))
        self.au_mot("T : « le trajet")
        self.play(a.construire(0))
        self.play(FadeIn(cT, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("0,4")
        self.play(FadeIn(n0, scale=1.6), run_time=0.4)
        self.insister(n0, 0.25)
        self.play(a.construire(1), run_time=0.6)
        self.play(FadeIn(tr[1], scale=1.6), run_time=0.4)
        self.au_mot("Puis H")
        self.play(a.construire(2), a.construire(3))
        self.play(FadeIn(tr[2], scale=1.6), FadeIn(tr[3], scale=1.6), run_time=0.4)
        self.au_mot("« il arrive")
        self.play(FadeIn(cH, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("Après T barre")
        self.play(Indicate(a.lab[1][1], color=CHEMIN, scale_factor=1.4), run_time=0.4)
        self.play(a.construire(4), a.construire(5))
        self.au_mot("0,9")
        self.play(FadeIn(n4, scale=1.6), FadeIn(tr[5], scale=1.6), run_time=0.4)
        self.au_mot("Il manque quatre")
        manque = suite(self.t("Il manque", 34), self.t("4", 44, TROU), self.t("nombres", 34), buff=0.18)
        manque.move_to(P(XD, -0.8))
        self.play(FadeIn(manque, shift=UP * 0.15), run_time=0.5)
        self.play(*[Indicate(tr[k], color=TROU, scale_factor=1.4) for k in tr], run_time=0.8)
        self.attendre_voix()

    # ── 03 : règle 1 : les branches d'un même point font 1 ──────────────────

    def ecran_somme(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-somme-un")
        self.titre_ecran("Règle 1 : un point, total 1")
        a = self.arbre(0)
        self.add(a)
        r = self.regle(1, "Les branches d'un même point font 1")
        self.au_mot("les branches qui partent")
        self.play(FadeIn(r, shift=UP * 0.15), run_time=0.6)
        self.au_mot("Après la racine")
        self.play(*a.etat([0, 1]), Flash(a.depart, color=CHEMIN, line_length=0.25), run_time=0.7)
        c1 = self.calcul([("1", WHITE), ("−", WHITE), ("0,4", PROBA), ("=", WHITE), ("0,6", JAUNE_TITRE)],
                         centre=P(XD, 0.25))
        self.au_mot("1 moins 0,4")
        self.play(FadeIn(c1[0]), FadeIn(c1[1]), TransformFromCopy(a.nombres[0], c1[2]), run_time=0.7)
        self.au_mot("égale 0,6")
        self.play(FadeIn(c1[3]), FadeIn(c1[4], scale=1.6), run_time=0.4)
        self.play(a.remplir(1, "0,6"), run_time=0.7)
        self.insister(a.nombres[1], 0.25)
        self.au_mot("Après T barre")
        self.play(*a.etat([4, 5]), Flash(a.branches[1].get_end(), color=CHEMIN, line_length=0.25), run_time=0.7)
        c2 = self.calcul([("1", WHITE), ("−", WHITE), ("0,9", PROBA), ("=", WHITE), ("0,1", JAUNE_TITRE)],
                         centre=P(XD, -0.85))
        self.au_mot("1 moins 0,9")
        self.play(FadeIn(c2[0]), FadeIn(c2[1]), TransformFromCopy(a.nombres[4], c2[2]), run_time=0.7)
        self.au_mot("égale 0,1")
        self.play(FadeIn(c2[3]), FadeIn(c2[4], scale=1.6), run_time=0.4)
        self.play(a.remplir(5, "0,1"), run_time=0.7)
        self.insister(a.nombres[5], 0.25)
        self.attendre_voix()

    # ── 04 : règle 2 : un chemin, c'est le produit de ses branches ──────────

    def ecran_chemin(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-chemin")
        self.titre_ecran("Règle 2 : un chemin, un produit")
        a = self.arbre(2)
        self.add(a)
        r = self.regle(2, "Un chemin : le produit de ses branches")
        self.au_mot("un chemin, c'est")
        self.play(FadeIn(r, shift=UP * 0.15), run_time=0.6)
        self.au_mot("T puis H")
        self.play(*a.etat([0, 2]), run_time=0.7)
        c = self.calcul([("0,4", PROBA), ("×", WHITE), ("?", TROU), ("=", WHITE), ("0,3", JAUNE_TITRE)],
                        46, P(XD, 0.25))
        c.align_to(P(0.8, 0), LEFT)
        self.au_mot("0,4 fois")
        self.play(TransformFromCopy(a.nombres[0], c[0]), FadeIn(c[1]), run_time=0.6)
        self.au_mot("la branche manquante égale")
        self.play(TransformFromCopy(a.trous[2][2], c[2]), Indicate(a.trous[2], color=TROU, scale_factor=1.4),
                  run_time=0.7)
        self.au_mot("égale 0,3")
        bout = pastille("0,3", 26).next_to(a.lab[2], RIGHT, buff=0.2)
        self.play(FadeIn(c[3]), FadeIn(c[4], scale=1.6), run_time=0.5)
        self.play(TransformFromCopy(c[4], bout), run_time=0.6)
        self.au_mot("La branche manquante :")
        d = self.calcul([("?", TROU), ("=", WHITE), ("0,3", JAUNE_TITRE), ("÷", WHITE), ("0,4", PROBA),
                         ("=", WHITE), ("0,75", VERT_OK)], 46, P(XD, -0.85))
        d.align_to(c, LEFT)
        self.play(TransformFromCopy(c[2], d[0]), FadeIn(d[1]), run_time=0.6)
        self.au_mot("0,3 divisé")
        self.play(TransformFromCopy(c[4], d[2]), FadeIn(d[3]), TransformFromCopy(c[0], d[4]), run_time=0.8)
        self.au_mot("égale 0,75")
        self.play(FadeIn(d[5]), FadeIn(d[6], scale=1.6), run_time=0.4)
        self.play(a.remplir(2, "0,75"), run_time=0.7)
        self.insister(a.nombres[2], 0.3)
        self.attendre_voix()

    # ── 05 : le dernier trou ────────────────────────────────────────────────

    def ecran_dernier(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-dernier")
        self.titre_ecran("Le dernier trou")
        a = self.arbre(3)
        self.add(a)
        self.au_mot("Il reste")
        self.play(*a.etat([2, 3]), Indicate(a.trous[3], color=TROU, scale_factor=1.4), run_time=0.8)
        c = self.calcul([("1", WHITE), ("−", WHITE), ("0,75", PROBA), ("=", WHITE), ("0,25", JAUNE_TITRE)],
                        centre=P(XD, 1.1))
        self.au_mot("1 moins 0,75")
        self.play(FadeIn(c[0]), FadeIn(c[1]), TransformFromCopy(a.nombres[2], c[2]), run_time=0.7)
        self.au_mot("égale 0,25")
        self.play(FadeIn(c[3]), FadeIn(c[4], scale=1.6), run_time=0.4)
        self.play(a.remplir(3, "0,25"), run_time=0.7)
        self.au_mot("L'arbre est complet")
        ok = self.coche(taille=0.35)
        fin = VGroup(ok, self.t("L'arbre est complet", 36, VERT_OK)).arrange(RIGHT, buff=0.3).move_to(P(XD, -0.3))
        self.play(*a.etat(None), run_time=0.5)
        self.play(FadeIn(fin[1], shift=UP * 0.15), Create(ok), run_time=0.6)
        self.play(*[Indicate(a.nombres[k], color=VERT_OK, scale_factor=1.3) for k in TROUVES], run_time=0.8)
        self.attendre_voix()

    # ── 06 : le piège : 0,3 sur la branche ──────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège : le chemin sur la branche")
        a = self.arbre(4)
        a.remove(a.nombres.pop(2))
        self.add(a)
        self.au_mot("écrire 0,3")
        faux = a._place(2, Text("0,3", font_size=26, color=ROUGE_ERREUR, weight=BOLD))
        self.play(*a.etat([2]), run_time=0.5)
        self.play(FadeIn(faux, scale=1.8), run_time=0.5)
        self.insister(faux, 0.25)
        self.au_mot("Non !")
        croix = VGroup(Line(faux.get_corner(UL) + P(-0.08, 0.06), faux.get_corner(DR) + P(0.08, -0.06)),
                       Line(faux.get_corner(DL) + P(-0.08, -0.06), faux.get_corner(UR) + P(0.08, 0.06)))
        croix.set_stroke(ROUGE_ERREUR, 6)
        non = self.t("FAUX !", 46, ROUGE_ERREUR).move_to(P(XD, 1.65))
        self.play(Create(croix), FadeIn(non, scale=1.8), run_time=0.5)
        self.au_mot("c'est le chemin entier")
        bout = pastille("0,3", 26).next_to(a.lab[2], RIGHT, buff=0.2)
        self.play(*a.etat([0, 2]), TransformFromCopy(faux, bout), run_time=0.8)
        ch = suite(self.t("0,3", 40, JAUNE_TITRE), self.t(": le chemin entier", 34), buff=0.18).move_to(P(XD, 0.65))
        self.play(FadeIn(ch, shift=UP * 0.15), run_time=0.5)
        self.au_mot("T ET H")
        et = suite(self.t("T", 40), self.t("ET", 40, ORANGE_RETENUE), self.t("H", 40), buff=0.25)
        et.next_to(ch, DOWN, buff=0.3)
        self.play(FadeIn(et, shift=UP * 0.1), run_time=0.5)
        self.insister(et[1], 0.25)
        self.au_mot("Sur la branche, on met")
        sur = self.t("Sur la branche : sachant T", 32, BLEU_CALCUL).next_to(et, DOWN, buff=0.45)
        self.play(*a.etat([2]), FadeIn(sur, shift=UP * 0.1), run_time=0.6)
        self.au_mot("T : 0,75")
        bon = a.nombre(2, "0,75")
        self.play(VGroup(faux, croix).animate.shift(UP * 0.0).set_opacity(0.35), run_time=0.2)
        self.play(FadeOut(VGroup(faux, croix), shift=UP * 0.3), FadeIn(bon, scale=1.6), run_time=0.6)
        self.insister(bon, 0.3)
        ok = self.coche(taille=0.28).next_to(sur, DOWN, buff=0.35)
        self.play(Create(ok), run_time=0.4)
        self.attendre_voix()

    # ── 07 : défi : un autre arbre ──────────────────────────────────────────

    def arbre_ab(self, centre=P(-3.3, -0.35), echelle=1.0):
        a = ArbreTrous("A", "B", titre="Un autre arbre").scale(echelle).move_to(centre)
        a.add(a.nombre(0, "0,5"), a.trou(2))
        a.bout = pastille("0,2", 26).next_to(a.lab[2], RIGHT, buff=0.2)
        return a

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        a = self.arbre_ab()
        self.au_mot("Dans un autre arbre")
        self.play(FadeIn(a.socle()), *[Create(b) for b in a.branches], *[FadeIn(m) for m in a.lab],
                  FadeIn(a.trous[2]), run_time=0.8)
        self.au_mot("P de A égale")
        pa = self.calcul([("P(A)", WHITE), ("=", WHITE), ("0,5", PROBA)], 46, P(XD, 1.7))
        self.play(FadeIn(pa[:2], shift=UP * 0.1), run_time=0.4)
        self.play(TransformFromCopy(pa[2], a.nombres[0]), FadeIn(pa[2], scale=1.5), run_time=0.6)
        self.au_mot("P de A inter B")
        pab = self.calcul([("P(A ∩ B)", WHITE), ("=", WHITE), ("0,2", JAUNE_TITRE)], 46, P(XD, 0.75))
        pab.align_to(pa, LEFT)
        self.play(*a.etat([0, 2]), FadeIn(pab[:2], shift=UP * 0.1), run_time=0.6)
        self.au_mot("égale 0,2")
        self.play(FadeIn(pab[2], scale=1.5), TransformFromCopy(pab[2], a.bout), run_time=0.6)
        self.au_mot("Quelle probabilité")
        q = VGroup(self.t("Sur la branche", 34, BLEU_CALCUL),
                   suite(self.t("de A vers B :", 34, BLEU_CALCUL), self.t("?", 44, TROU), buff=0.2))
        q.arrange(DOWN, buff=0.15).move_to(P(XD, -0.55))
        self.play(*a.etat([2]), FadeIn(q, shift=UP * 0.15), run_time=0.6)
        self.insister(a.trous[2], 0.3)
        self.au_mot("Mets pause")
        pause = self.t("Mets pause, et cherche !", 36, ORANGE_RETENUE).move_to(P(XD - 0.5, -1.45))
        self.play(Write(pause))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        a = self.arbre_ab()
        self.add(a, a.bout)
        self.play(*a.etat([0, 2]), run_time=0.5)
        c = self.calcul([("0,5", PROBA), ("×", WHITE), ("?", TROU), ("=", WHITE), ("0,2", JAUNE_TITRE)],
                        46, P(XD, 1.6))
        c.align_to(P(0.8, 0), LEFT)
        self.au_mot("0,5 fois")
        self.play(TransformFromCopy(a.nombres[0], c[0]), FadeIn(c[1]), TransformFromCopy(a.trous[2][2], c[2]),
                  run_time=0.7)
        self.au_mot("égale 0,2")
        self.play(FadeIn(c[3]), TransformFromCopy(a.bout, c[4]), run_time=0.6)
        self.au_mot("La branche :")
        d = self.calcul([("?", TROU), ("=", WHITE), ("0,2", JAUNE_TITRE), ("÷", WHITE), ("0,5", PROBA),
                         ("=", WHITE), ("0,4", VERT_OK)], 46, P(XD, 0.5))
        d.align_to(c, LEFT)
        self.play(TransformFromCopy(c[2], d[0]), FadeIn(d[1]), run_time=0.5)
        self.au_mot("0,2 divisé")
        self.play(TransformFromCopy(c[4], d[2]), FadeIn(d[3]), TransformFromCopy(c[0], d[4]), run_time=0.8)
        self.au_mot("égale 0,4")
        self.play(FadeIn(d[5]), FadeIn(d[6], scale=1.6), run_time=0.4)
        self.play(a.remplir(2, "0,4"), run_time=0.7)
        self.insister(a.nombres[2], 0.3)
        self.au_mot("C'est P indice")
        f = p_cond("A", "B", 64, WHITE, JAUNE_TITRE, VERT_OK)
        eg = self.t("=", 64).next_to(f, RIGHT, buff=0.25)
        v = self.t("0,4", 64, VERT_OK).next_to(eg, RIGHT, buff=0.25)
        g = VGroup(f, eg, v).move_to(P(XD - 0.3, -0.75))
        self.play(FadeIn(f[0]), TransformFromCopy(a.lab[0][1], f[1]), TransformFromCopy(a.lab[2], f[2]),
                  run_time=0.7)
        self.play(FadeIn(eg), TransformFromCopy(a.nombres[2], v), run_time=0.5)
        self.play(Create(self.coche(taille=0.3).next_to(g, RIGHT, buff=0.35)), run_time=0.4)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 34
        l1 = self.t("Les branches d'un même point font 1", fs)
        l2 = self.t("Un chemin = le produit de ses branches", fs)
        l3 = suite(self.t("Une branche = le chemin", fs), self.t("÷", fs + 6, JAUNE_TITRE),
                   self.t("la branche d'avant", fs), buff=0.15)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6)
        if lignes.width > 11.6:
            lignes.scale_to_fit_width(11.6)
        lignes.move_to(P(-0.6, 0.6))
        for mot, l in zip(["Un : les branches", "Deux : un chemin", "une branche, c'est"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("Prochaine vidéo")
        self.play(Write(self.chute("Prochaine vidéo : construire l'arbre à partir d'un énoncé", color=VERT_OK,
                                   font_size=32)))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_arbre()
        self.ecran_somme()
        self.ecran_chemin()
        self.ecran_dernier()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")


class ProbaArbreCompleterSTMG(ProbaArbreCompleterBase):
    identite = "Maths STMG — EleveAI"


class ProbaArbreCompleterPremiere(ProbaArbreCompleterBase):
    identite = "Maths 1re — EleveAI"
