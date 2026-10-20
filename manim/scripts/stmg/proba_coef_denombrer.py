# proba_coef_denombrer.py
# EleveAI — Maths STMG — série « Probabilités », lot LOI BINOMIALE :
# DÉNOMBRER LES CHEMINS À k SUCCÈS pour n = 4 (micro vaT_coef_denombrer,
# notion va_binomiale_coefficients), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Short jumeau : proba_coef_denombrer_short.py (ceinture jaune).
#
# ⭐ Les figures du coach :
#   · l'ARBRE de Bernoulli (`canvasArbreBernoulli`, « arbre_proba ») : carte
#     blanche, branches grises, lettres S / E, chemins comptés allumés en
#     orange ; ici à 4 niveaux, EN PETIT, sans probabilités (on compte) ;
#   · le TABLEAU du triangle de Pascal (`canvasTrianglePascal`,
#     « tableau_donnees ») : la ligne 4 (libellé bleu ciel, cases blanches,
#     case allumée en jaune) se remplit quand la voix dit 1, 4, 6, 4, 1.
# Le dessin concret : 4 CONTENEURS de recyclage côte à côte qui prennent la
# couleur S (vert, bien trié) ou E (gris, mal trié) pour chaque chemin dit ;
# la LISTE RANGÉE se construit dessous.
# « k parmi n » s'écrit comme au lycée (n au-dessus de k, parenthèses
# dessinées) : `binome` de proba_coef_definition.py.
#
# Écrans : 00 garde · 01 4 conteneurs, S / E, exactement 2 S ? · 02 la
# méthode (choisir les places des 2 S) · 03 la liste rangée, 6 chemins ·
# 04 « 2 parmi 4 » = 6 et la ligne 4 du triangle · 05 l'ordre (S S, S E, E)
# · 06 le piège (deux fois / oublié) · 07 défi 3 succès · 07b correction
# (4 chemins, « 3 parmi 4 » = 4) · 08 ce que tu as appris · 09 fin.
#
# Voix : manim/voix/stmg-proba-coef-denombrer.json (débit −7).
# Rendu (depuis la racine du dépôt ; media à soi, sinon WinError 32) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_coef_denombrer.py ProbaCoefDenombrerSTMG -o eleveai-maths-stmg-proba-coef-denombrer --media_dir manim/scripts/stmg/media-coef_denombrer
# Puis copier dans manim/sorties/stmg/maths/probabilites/45-coef-denombrer/.

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
from proba_pc_conditionnelle import ANNEAU, BORD, CHEMIN, ENCRE, LIBELLE, SURLIGNE, suite  # noqa: E402
from proba_coef_definition import ArbreSE, binome, egal  # noqa: E402

C_S = VERT_OK            # S : bien trié
C_E = "#A0AEC0"          # E : mal trié (gris clair, lisible sur fond sombre)
FOND_S = "#16A34A"       # le conteneur bien trié
FOND_E = "#64748B"       # le conteneur mal trié
FOND_0 = "#1E3A5F"       # le conteneur pas encore contrôlé


def P(x, y):
    return np.array([x, y, 0.0])


def ch(mot):
    """« SSEE » → (True, True, False, False)."""
    return tuple(c == "S" for c in mot)


def ecrire(chemin, fs=40, buff=0.24):
    """« S S E E » en clair : S en vert, E en gris."""
    return suite(*[Text("S" if s else "E", font_size=fs, color=C_S if s else C_E, weight=BOLD)
                   for s in chemin], buff=buff)


# ── le conteneur de recyclage ───────────────────────────────────────────────

class Conteneur(VGroup):
    """Corps (trapèze), couvercle, deux roues ; une lettre S et une lettre E
    déjà posées, invisibles : `prendre(s)` colore le corps et montre la bonne
    lettre (structure fixe : rien n'est ajouté ni retiré)."""

    def __init__(self, s=1.0, **kw):
        super().__init__(**kw)
        self.corps = Polygon(P(-0.5, 0.45), P(0.5, 0.45), P(0.42, -0.6), P(-0.42, -0.6), fill_color=FOND_0,
                             fill_opacity=1, stroke_color=WHITE, stroke_width=2)
        self.couvercle = RoundedRectangle(width=1.16, height=0.18, corner_radius=0.06, fill_color="#334155",
                                          fill_opacity=1, stroke_color=WHITE, stroke_width=2).move_to(P(0, 0.56))
        self.poignee = Line(P(-0.16, 0.7), P(0.16, 0.7), color=WHITE, stroke_width=4)
        self.roues = VGroup(*[Circle(radius=0.08, fill_color="#0F172A", fill_opacity=1, stroke_color=WHITE,
                                     stroke_width=2).move_to(P(x, -0.66)) for x in (-0.3, 0.3)])
        self.lS = Text("S", font_size=50, color=WHITE, weight=BOLD).move_to(P(0, -0.08)).set_opacity(0)
        self.lE = Text("E", font_size=50, color=WHITE, weight=BOLD).move_to(P(0, -0.08)).set_opacity(0)
        self.add(self.corps, self.couvercle, self.poignee, self.roues, self.lS, self.lE)
        self.scale(s)

    def prendre(self, s):
        """s = True (S, vert), False (E, gris), None (pas contrôlé)."""
        fond = FOND_0 if s is None else (FOND_S if s else FOND_E)
        return [self.corps.animate.set_fill(fond, 1),
                self.lS.animate.set_opacity(1 if s is True else 0),
                self.lE.animate.set_opacity(1 if s is False else 0)]


def rangee(s=0.9, ecart=1.35, centre=P(-3.3, 1.9)):
    return VGroup(*[Conteneur(s) for _ in range(4)]).arrange(RIGHT, buff=ecart - 1.16 * s).move_to(centre)


def montrer(cs, chemin):
    """Les 4 conteneurs prennent les couleurs du chemin."""
    return [a for c, s in zip(cs, chemin) for a in c.prendre(s)]


def carte_lettre(s, phrase, fs=30):
    """« S : bien trié » / « E : mal trié » sur un petit fond sombre."""
    g = suite(Text("S" if s else "E", font_size=fs + 8, color=C_S if s else C_E, weight=BOLD),
              Text(":", font_size=fs), Text(phrase, font_size=fs), buff=0.14)
    fond = RoundedRectangle(width=g.width + 0.45, height=g.height + 0.35, corner_radius=0.15, fill_color="#0F172A",
                            fill_opacity=0.9, stroke_color=BLEU_CALCUL, stroke_width=3)
    return VGroup(fond, g.move_to(fond))


DEUX_S = [ch(m) for m in ("SSEE", "SESE", "SEES", "ESSE", "ESES", "EESS")]
TROIS_S = [ch(m) for m in ("SSSE", "SSES", "SESS", "ESSS")]


# ── la ligne 4 du triangle de Pascal, comme le tableau du coach ─────────────

class LignePascal(VGroup):
    """Carte blanche « Triangle de Pascal », libellé de ligne bleu ciel, cinq
    cases blanches. Le libellé et les nombres sont prêts, pas posés."""

    def __init__(self, n=4, centre=ORIGIN, larg=0.92, haut=0.78, fs=36, **kw):
        super().__init__(**kw)
        self.cases, self.nums = [], []
        lab = RoundedRectangle(width=larg, height=haut, corner_radius=0.06, fill_color=LIBELLE, fill_opacity=1,
                               stroke_color=BORD, stroke_width=2).move_to(P(0, 0))
        self.lab = lab
        self.lab_num = Text(str(n), font_size=fs, color=ENCRE, weight=BOLD).move_to(lab)
        for k in range(n + 1):
            c = RoundedRectangle(width=larg, height=haut, corner_radius=0.06, fill_color=WHITE, fill_opacity=1,
                                 stroke_color=BORD, stroke_width=2).move_to(P((k + 1) * (larg + 0.08), 0))
            self.cases.append(c)
            from math import comb
            self.nums.append(Text(str(comb(n, k)), font_size=fs, color=ENCRE, weight=BOLD).move_to(c))
        tout = VGroup(lab, *self.cases)
        self.titre = Text("Triangle de Pascal", font_size=24, color=ENCRE, weight=BOLD)
        self.titre.next_to(tout, UP, buff=0.22).align_to(tout, LEFT)
        self.carte = RoundedRectangle(width=tout.width + 0.5, height=tout.height + self.titre.height + 0.75,
                                      corner_radius=0.2, fill_color=WHITE, fill_opacity=1, stroke_color=BORD,
                                      stroke_width=2).move_to(VGroup(tout, self.titre))
        self.add(self.carte, self.titre, lab, *self.cases)
        d = np.array(centre) - self.carte.get_center()
        self.shift(d)
        self.lab_num.shift(d)
        for t in self.nums:
            t.shift(d)


class ProbaCoefDenombrerBase(Notion6e):
    """Toutes les scènes ; la sous-classe ne change que l'identité."""

    nom_voix = "stmg-proba-coef-denombrer"
    identite = "Maths — EleveAI"
    ceinture = "bleue"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.3):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    # ── la voix : un curseur, pour viser la n-ième « S E S E » ──────────────

    def dire(self, nom, dossier=None):
        d = super().dire(nom, dossier)
        self._curseur = 0
        return d

    def au_suivant(self, extrait):
        """Comme au_mot, mais cherche APRÈS le dernier extrait visé."""
        texte = self._texte_voix
        i = texte.find(extrait, self._curseur)
        if i < 0:
            raise ValueError(f"« {extrait} » absent (après {self._curseur}) : {texte[:60]}…")
        self._curseur = i + len(extrait)
        if not self._duree_voix:
            return
        reste = self._debut_voix + self._duree_voix * i / len(texte) - self.renderer.time
        if reste > 0.05:
            self.wait(reste)

    # ── les figures ─────────────────────────────────────────────────────────

    def arbre(self, centre=P(2.9, 0.05), haut=5.4, complet=True):
        a = ArbreSE(n=4, dx=2.0, h=0.62, fs=46, titre="Les 4 conteneurs", entetes=False)
        a.scale_to_fit_height(haut).move_to(centre)
        a.titre.scale(1.7).next_to(a.carte.get_top(), DOWN, buff=0.1)
        a.remove(*a.branches.values(), *a.lab.values())   # placés, pas encore posés
        if complet:
            a.tout_poser()
        return a

    def liste(self, chemins, x=-4.3, y0=0.75, pas=0.52, fs=36):
        lg = VGroup(*[ecrire(c, fs) for c in chemins])
        for k, l in enumerate(lg):
            l.move_to(P(x, y0 - pas * k))
        return lg

    def derouler(self, cs, a, chemins, extraits, lg, run_time=0.4):
        """Chaque chemin dit : les conteneurs se colorent, la ligne s'écrit,
        le chemin s'allume dans l'arbre (les précédents restent allumés)."""
        for k, (c, mot) in enumerate(zip(chemins, extraits)):
            self.au_suivant(mot)
            self.play(*montrer(cs, c), FadeIn(lg[k], shift=LEFT * 0.2), *a.etat(chemins[:k + 1]),
                      run_time=run_time)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Dénombrer les chemins", 50, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.22)
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, -2.85))
        cs = rangee(0.95, 1.45, P(-2.6, 0.2))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech),
                  LaggedStart(*[FadeIn(c, shift=DOWN * 0.4) for c in cs], lag_ratio=0.15), run_time=1.0)
        self.au_mot("à k succès")
        sous = suite(self.t("à", 42), self.t("k", 48, C_S), self.t("succès", 42, C_S), buff=0.2).move_to(P(3.4, 0.2))
        self.play(FadeIn(sous, shift=LEFT * 0.2), *montrer(cs, DEUX_S[0]), run_time=0.5)
        self.play(*montrer(cs, DEUX_S[1]), run_time=0.3)
        self.attendre_voix(marge=1.0)

    # ── 01 : 4 conteneurs, bien trié / mal trié, exactement 2 ? ─────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Le contrôle du tri")
        cs = rangee()
        a = self.arbre(complet=False)
        self.au_mot("4 conteneurs")
        n4 = suite(self.t("4", 52, JAUNE_TITRE), self.t("conteneurs", 38), buff=0.2).next_to(cs, DOWN, buff=0.35)
        self.play(LaggedStart(*[FadeIn(c, shift=DOWN * 0.4) for c in cs], lag_ratio=0.15),
                  FadeIn(n4, shift=UP * 0.15), run_time=0.9)
        self.au_mot("bien trié")
        cS = carte_lettre(True, "bien trié").move_to(P(-3.3, -0.75))
        self.play(*cs[0].prendre(True), FadeOut(n4), run_time=0.4)
        self.au_mot("succès")
        self.play(FadeIn(cS, shift=LEFT * 0.2), Indicate(cs[0].lS, color=C_S), run_time=0.5)
        self.au_mot("mal trié")
        cE = carte_lettre(False, "mal trié").move_to(P(-3.3, -1.85)).align_to(cS, LEFT)
        self.play(*cs[1].prendre(False), run_time=0.4)
        self.au_mot("échec")
        self.play(FadeIn(cE, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("Combien de résultats")
        self.play(FadeIn(a.socle()), *cs[0].prendre(None), *cs[1].prendre(None), run_time=0.4)
        for L in (1, 2, 3, 4):
            self.play(a.pousser(L, 0.4), Wiggle(cs[L - 1]), run_time=0.45)
        self.au_mot("exactement 2")
        q = VGroup(suite(self.t("exactement", 36), self.t("2", 52, JAUNE_TITRE), buff=0.2),
                   suite(self.t("bien triés", 36, C_S), self.t("?", 40), buff=0.15)).arrange(DOWN, buff=0.15)
        q.move_to(P(-3.3, -1.3))
        self.play(FadeOut(VGroup(cS, cE)), FadeIn(q, shift=UP * 0.15), run_time=0.5)
        self.insister(q[0][1])
        self.attendre_voix()

    # ── 02 : la méthode : choisir les places des 2 succès ───────────────────

    def ecran_methode(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-methode")
        cs = rangee()
        a = self.arbre()
        self.add(cs, a)
        self.titre_ecran("La méthode")
        self.au_mot("les places")
        self.play(LaggedStart(*[Indicate(c.corps, color=BLEU_CALCUL) for c in cs], lag_ratio=0.15), run_time=0.8)
        self.au_mot("des 2 succès")
        jetons = VGroup(*[Text("S", font_size=46, color=C_S, weight=BOLD) for _ in range(2)])
        jetons.arrange(RIGHT, buff=0.5).move_to(P(-3.3, -0.4))
        deux = self.t("2", 52, JAUNE_TITRE).next_to(jetons, LEFT, buff=0.5)
        self.play(FadeIn(deux, scale=1.4), FadeIn(jetons, shift=UP * 0.2), run_time=0.4)
        self.au_mot("parmi les 4")
        self.play(jetons[0].animate.move_to(cs[0].lS), jetons[1].animate.move_to(cs[1].lS), run_time=0.6)
        self.play(*cs[0].prendre(True), *cs[1].prendre(True), FadeOut(jetons), FadeOut(deux), run_time=0.3)
        self.au_mot("on écrit chaque chemin")
        l = ecrire(DEUX_S[0], 44).move_to(P(-3.3, -0.4))
        self.play(*cs[2].prendre(False), *cs[3].prendre(False), *a.etat(DEUX_S[:1]),
                  FadeIn(l, shift=UP * 0.2), run_time=0.6)
        self.au_mot("S pour succès")
        cS = carte_lettre(True, "succès").move_to(P(-4.6, -1.65))
        self.play(FadeIn(cS, shift=UP * 0.15), *[Indicate(m, color=C_S) for m in l[:2]], run_time=0.5)
        self.au_mot("E pour échec")
        cE = carte_lettre(False, "échec").move_to(P(-1.9, -1.65))
        self.play(FadeIn(cE, shift=UP * 0.15), *[Indicate(m, color=C_E) for m in l[2:]], run_time=0.5)
        self.attendre_voix()

    # ── 03 : la liste rangée : 6 chemins ────────────────────────────────────

    def ecran_liste(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-liste")
        cs = rangee()
        a = self.arbre()
        self.add(cs, a)
        self.titre_ecran("La liste rangée")
        lg = self.liste(DEUX_S)
        self.derouler(cs, a, DEUX_S, ["S S E E", "S E S E", "S E E S", "E S S E", "E S E S", "E E S S"], lg)
        self.au_mot("6 chemins")
        r = suite(self.t("6", 64, JAUNE_TITRE), self.t("chemins", 40), buff=0.22).move_to(P(-1.25, -0.55))
        self.play(FadeIn(r, scale=1.4), *[Indicate(m, color=CHEMIN) for m in lg], run_time=0.6)
        self.insister(r[0])
        self.attendre_voix()

    # ── 04 : « 2 parmi 4 » = 6, la ligne 4 du triangle de Pascal ────────────

    def ecran_coefficient(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-coefficient")
        lg = self.liste(DEUX_S, x=-4.7, y0=1.85, pas=0.6, fs=38)
        self.add(lg)
        self.titre_ecran("Le coefficient binomial")
        six = self.t("6", 72, JAUNE_TITRE)
        b = binome(4, 2, 64, c_n=BLEU_CALCUL, c_k=C_S)
        bloc = suite(six, self.t("=", 64), b, buff=0.3).move_to(P(1.9, 0.95))
        bloc.shift(RIGHT * (2.0 - b.get_x()))   # le binôme au-dessus de la case du 6
        cadre = SurroundingRectangle(lg, color=CHEMIN, buff=0.2, corner_radius=0.12)
        self.play(FadeIn(six, scale=1.5), Create(cadre), run_time=0.5)
        self.au_mot("2 parmi 4")
        nom = self.t("« 2 parmi 4 »", 36).next_to(b, UP, buff=0.3)
        self.play(FadeIn(bloc[1]), FadeIn(b, scale=1.3), FadeIn(nom, shift=DOWN * 0.15), run_time=0.6)
        self.insister(b)
        tb = LignePascal(4, centre=P(1.5, -1.45))
        self.au_mot("On retrouve")
        self.play(FadeIn(VGroup(tb.carte, tb.titre, tb.lab, *tb.cases), shift=UP * 0.2), run_time=0.5)
        self.au_suivant("ligne 4")
        self.play(FadeIn(tb.lab_num, scale=1.6), Indicate(tb.lab, color=BLEU_CALCUL), run_time=0.4)
        self.au_suivant("Pascal")
        for k, v in enumerate((1, 4, 6, 4, 1)):
            self.au_suivant(str(v))
            self.play(FadeIn(tb.nums[k], scale=1.8), run_time=0.25)
        fl = Arrow(P(tb.cases[2].get_x(), tb.carte.get_top()[1]), P(tb.cases[2].get_x(), b.get_bottom()[1]), buff=0.1, color=CHEMIN, stroke_width=6)
        self.play(tb.cases[2].animate.set_fill(SURLIGNE, 1).set_stroke(ANNEAU, 5), GrowArrow(fl), run_time=0.5)
        self.insister(tb.nums[2])
        self.attendre_voix()

    # ── 05 : l'ordre : S S, puis S E, puis E ────────────────────────────────

    def ecran_ordre(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-ordre")
        a = self.arbre()
        lg = self.liste(DEUX_S, x=-3.6, y0=1.6, pas=0.62, fs=40)
        self.add(a, lg)
        self.titre_ecran("Ranger pour ne rien oublier")
        groupes = [([0], 2, "S S"), ([1, 2], 2, "S E"), ([3, 4, 5], 1, "puis E")]
        cadres = VGroup()
        for rangs, lettres, mot in groupes:
            self.au_suivant(mot)
            pref = SurroundingRectangle(VGroup(*[lg[r][:lettres] for r in rangs]), color=CHEMIN, buff=0.1,
                                        corner_radius=0.08, stroke_width=4)
            if cadres:
                self.play(cadres[-1].animate.set_stroke(opacity=0.35), run_time=0.15)
            self.play(Create(pref), *a.etat([DEUX_S[r] for r in rangs]),
                      *[lg[i].animate.set_opacity(1 if i in rangs else 0.35) for i in range(len(lg))],
                      run_time=0.5)
            cadres.add(pref)
        self.play(lg.animate.set_opacity(1), *a.etat(DEUX_S), run_time=0.5)
        self.attendre_voix()

    # ── 06 : le piège : deux fois le même, ou un oublié ─────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        vrac = [ch(m) for m in ("SESE", "EESS", "ESSE", "SESE", "SSEE", "ESES")]
        lv = self.liste(vrac, x=-4.2, y0=1.9, pas=0.58, fs=36)
        trou = suite(*[self.t("?", 36, ROUGE_ERREUR) for _ in range(4)], buff=0.3).move_to(P(-4.2, 1.9 - 0.58 * 6))
        self.play(LaggedStart(*[FadeIn(l, shift=RIGHT * 0.2) for l in lv], lag_ratio=0.1),
                  run_time=0.8)
        self.au_mot("compter deux fois")
        r1 = SurroundingRectangle(lv[0], color=ROUGE_ERREUR, buff=0.08)
        r2 = SurroundingRectangle(lv[3], color=ROUGE_ERREUR, buff=0.08)
        lien = self.t("compté deux fois", 30, ROUGE_ERREUR).next_to(VGroup(r1, r2), RIGHT, buff=0.35)
        self.play(Create(r1), Create(r2), FadeIn(lien, shift=LEFT * 0.15), run_time=0.6)
        self.au_mot("en oublier un")
        cadre_t = DashedVMobject(SurroundingRectangle(trou, color=ROUGE_ERREUR, buff=0.18), num_dashes=28)
        oubli = self.t("oublié", 30, ROUGE_ERREUR).next_to(cadre_t, RIGHT, buff=0.35)
        self.play(FadeIn(trou, scale=1.3), Create(cadre_t), FadeIn(oubli, shift=LEFT * 0.15), run_time=0.6)
        self.au_mot("méthode rangée")
        lr = self.liste(DEUX_S, x=2.3, y0=1.9, pas=0.58, fs=36)
        rangee_t = self.t("rangée", 28, C_S).next_to(lr, UP, buff=0.25)
        self.play(FadeIn(rangee_t), LaggedStart(*[FadeIn(l, shift=LEFT * 0.2) for l in lr], lag_ratio=0.12),
                  VGroup(lv, trou, lien, oubli).animate.set_opacity(0.4),
                  *[m.animate.set_stroke(opacity=0.4) for m in (r1, r2, cadre_t)], run_time=0.9)
        self.au_mot("aucun")
        oks = VGroup(*[self.coche(taille=0.14).next_to(l, RIGHT, buff=0.3) for l in lr])
        self.play(LaggedStart(*[Create(o) for o in oks], lag_ratio=0.12), run_time=0.7)
        self.attendre_voix()

    # ── 07 : défi : exactement 3 succès ─────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        cs = rangee(1.0, 1.5, P(-3.4, 0.5))
        q1 = self.t("Combien de chemins ont", 38)
        q2 = suite(self.t("exactement", 38), self.t("3", 52, JAUNE_TITRE), self.t("succès", 38, C_S), buff=0.2)
        q3 = suite(self.t("sur", 38), self.t("4", 52, JAUNE_TITRE), self.t("conteneurs", 38),
                   self.t("?", 44, ORANGE_RETENUE), buff=0.2)
        q = VGroup(q1, q2, q3).arrange(DOWN, buff=0.3).move_to(P(3.0, 0.6))
        self.au_mot("Combien de chemins")
        self.play(FadeIn(q1, shift=UP * 0.15), LaggedStart(*[FadeIn(c, shift=DOWN * 0.3) for c in cs],
                                                           lag_ratio=0.12), run_time=0.6)
        self.au_mot("exactement 3")
        self.play(FadeIn(q2, shift=UP * 0.15), run_time=0.5)
        self.insister(q2[1])
        self.au_mot("sur 4")
        self.play(FadeIn(q3, shift=UP * 0.15), LaggedStart(*[Wiggle(c) for c in cs], lag_ratio=0.1), run_time=0.8)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    # ── 07b : correction : 4 chemins, « 3 parmi 4 » = 4 ─────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        cs = rangee()
        a = self.arbre()
        self.add(cs, a)
        self.titre_ecran("Correction")
        lg = self.liste(TROIS_S, pas=0.55)
        self.derouler(cs, a, TROIS_S, ["S S S E", "S S E S", "S E S S", "E S S S"], lg)
        self.au_suivant("4 chemins")
        r = suite(self.t("4", 64, JAUNE_TITRE), self.t("chemins", 40), buff=0.22).move_to(P(-1.25, 0.35))
        self.play(FadeIn(r, scale=1.4), run_time=0.5)
        self.au_suivant("3 parmi 4")
        b = binome(4, 3, 56, c_n=BLEU_CALCUL, c_k=C_S).move_to(P(-1.85, -1.35))
        self.play(FadeIn(b, scale=1.3), run_time=0.5)
        self.au_suivant("vaut 4")
        v = egal(b, 4, 56)
        self.play(FadeIn(v, shift=LEFT * 0.2), run_time=0.4)
        self.insister(v[1])
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 38
        l1 = VGroup(suite(self.t("Pour", fs), self.t("n", fs, BLEU_CALCUL), self.t("petit, on liste les chemins", fs),
                          buff=0.15),
                    suite(self.t("à", fs), self.t("k succès", fs, C_S), self.t("avec une", fs),
                          self.t("méthode rangée", fs, CHEMIN), buff=0.15)).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        b = binome("n", "k", 48, c_n=BLEU_CALCUL, c_k=C_S)
        l2 = suite(self.t("Leur nombre est", fs), b, self.t("« k parmi n »", fs, JAUNE_TITRE), buff=0.3)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.7)
        if lignes.width > 11.0:
            lignes.scale_to_fit_width(11.0)
        lignes.move_to(P(-0.7, 0.1))
        self.au_mot("Pour n petit")
        self.play(FadeIn(l1[0], shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("à k succès")
        self.play(FadeIn(l1[1], shift=RIGHT * 0.2), run_time=0.6)
        self.play(Create(lignes[0][0]), run_time=0.4)
        self.au_mot("Leur nombre")
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.6)
        self.play(Create(lignes[1][0]), run_time=0.4)
        self.attendre_voix(marge=1.0)

    # ── 09 : la fin (règle du 19/10) ────────────────────────────────────────

    def page_abonnement(self, voix="09-abonne"):
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
        self.ecran_methode()
        self.ecran_liste()
        self.ecran_coefficient()
        self.ecran_ordre()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")


class ProbaCoefDenombrerSTMG(ProbaCoefDenombrerBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "bleue"
