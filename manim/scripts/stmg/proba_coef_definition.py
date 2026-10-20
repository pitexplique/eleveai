# proba_coef_definition.py
# EleveAI — Maths STMG — série « Probabilités », lot LOI BINOMIALE :
# LE COEFFICIENT BINOMIAL « k parmi n » = le NOMBRE DE CHEMINS à k succès
# (micro vaT_coef_definition, notion va_binomiale_coefficients), AVEC VOIX.
# Paysage 16:9, CEINTURE BLEUE. Short jumeau : proba_coef_definition_short.py
# (ceinture jaune).
#
# ⭐ Les figures du coach :
#   · l'ARBRE de Bernoulli (`canvasArbreBernoulli`, « arbre_proba ») : carte
#     blanche, branches grises, lettres S / E, chemin compté allumé en orange ;
#     ici SANS probabilités sur les branches (la voix n'en dit aucune : on
#     compte, on ne calcule pas) ;
#   · le TABLEAU du triangle de Pascal (`canvasTrianglePascal`,
#     « tableau_donnees ») : la ligne des 3 commandes, 1 3 3 1, se remplit
#     quand la voix dit la somme.
# Le coefficient s'écrit comme au lycée : 3 au-dessus de 2, entre deux grandes
# parenthèses DESSINÉES (deux Text empilés), jamais « C(3,2) ».
#
# Écrans : 00 garde · 01 trois commandes (à l'heure = S, en retard = E), arbre
# à 3 niveaux, 8 chemins · 02 les 3 chemins à exactement 2 succès · 03 la
# notation « 2 parmi 3 » = 3 · 04 « 3 parmi 3 », « 0 parmi 3 », « 1 parmi 3 »
# · 05 1 + 3 + 3 + 1 = 8 (tableau du coach) · 06 le piège : 2 × 3 · 07 défi
# (2 commandes, 1 succès) · 07b correction (« 1 parmi 2 » = 2) · 08 ce que tu
# as appris · 09 fin (« Entraîne-toi sur eleveai.fr », « Abonne-toi ! »).
#
# Voix : manim/voix/stmg-proba-coef-definition.json (débit −7).
# Rendu (depuis la racine du dépôt ; media à soi, sinon WinError 32) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_coef_definition.py ProbaCoefDefinitionSTMG -o eleveai-maths-stmg-proba-coef-definition --media_dir manim/scripts/stmg/media-coef_definition
# Puis copier dans manim/sorties/stmg/maths/probabilites/42-coef-definition/.

import sys
from itertools import product
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "premiere"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import BORD, BRANCHE, CHEMIN, ENCRE, lettre, suite  # noqa: E402

C_S = VERT_OK            # S (à l'heure) écrit en clair
C_E = ORANGE_RETENUE     # E (en retard) écrit en clair
CARTON = "#B7791F"
SCOTCH = "#F6E05E"


def P(x, y):
    return np.array([x, y, 0.0])


# ── le coefficient binomial, écrit comme au lycée ───────────────────────────

def binome(n, k, fs=44, color=WHITE, c_n=None, c_k=None):
    """n au-dessus de k entre deux grandes parenthèses dessinées.
    [0] parenthèse gauche, [1] la colonne ([1][0] = n, [1][1] = k), [2] droite."""
    tn = Text(str(n), font_size=fs, color=c_n or color)
    tk = Text(str(k), font_size=fs, color=c_k or color)
    col = VGroup(tn, tk).arrange(DOWN, buff=fs * 0.005)
    h = col.height * 1.12
    w = max(col.width, fs * 0.012) / 2 + fs * 0.004
    sw = max(2.5, fs / 13)
    c = col.get_center()
    lp = ArcBetweenPoints(c + P(-w, h / 2), c + P(-w, -h / 2), angle=1.0, color=color, stroke_width=sw)
    rp = ArcBetweenPoints(c + P(w, h / 2), c + P(w, -h / 2), angle=-1.0, color=color, stroke_width=sw)
    return VGroup(lp, col, rp)


def egal(b, valeur, fs=44, color=JAUNE_TITRE, buff=0.22):
    """« = valeur » posé à droite d'un binôme."""
    return suite(Text("=", font_size=fs), Text(str(valeur), font_size=fs * 1.15, color=color),
                 buff=0.18).next_to(b, RIGHT, buff=buff)


def ecrire(chemin, fs=44, buff=0.28):
    """« S S E » en clair : S en vert, E en orange."""
    return suite(*[Text("S" if s else "E", font_size=fs, color=C_S if s else C_E, weight=BOLD)
                   for s in chemin], buff=buff)


# ── les dessins : le colis et sa pendule ────────────────────────────────────

def colis(s=1.0):
    """Un carton fermé : face, dessus, bande de scotch."""
    face = Rectangle(width=1.0, height=0.75, fill_color=CARTON, fill_opacity=1, stroke_color=WHITE,
                     stroke_width=1.5).move_to(P(0, -0.1))
    dessus = Polygon(P(-0.5, 0.275), P(0.5, 0.275), P(0.38, 0.45), P(-0.62, 0.45), fill_color="#D69E2E",
                     fill_opacity=1, stroke_color=WHITE, stroke_width=1.5).shift(RIGHT * 0.06)
    scotch = Rectangle(width=0.16, height=0.75, fill_color=SCOTCH, fill_opacity=1, stroke_width=0).move_to(P(0, -0.1))
    return VGroup(face, dessus, scotch).scale(s)


def pendule(a_l_heure, r=0.26):
    """Une pendule : verte (à l'heure) ou orange (en retard)."""
    c = C_S if a_l_heure else C_E
    disque = Circle(radius=r, fill_color=c, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    h1 = Line(P(0, 0), P(0, r * 0.65), color=WHITE, stroke_width=3)
    h2 = Line(P(0, 0), P(r * 0.5, -r * 0.3) if a_l_heure else P(r * 0.55, r * 0.3), color=WHITE, stroke_width=3)
    return VGroup(disque, h1, h2)


def carte_lettre(s, phrase, fs=30):
    """« S : à l'heure » / « E : en retard » sur un petit fond sombre."""
    g = suite(Text("S" if s else "E", font_size=fs + 8, color=C_S if s else C_E, weight=BOLD),
              Text(":", font_size=fs), Text(phrase, font_size=fs), buff=0.14)
    fond = RoundedRectangle(width=g.width + 0.45, height=g.height + 0.35, corner_radius=0.15, fill_color="#0F172A",
                            fill_opacity=0.9, stroke_color=BLEU_CALCUL, stroke_width=3)
    return VGroup(fond, g.move_to(fond))


# ── l'ARBRE de Bernoulli du coach, à n niveaux, sans probabilités ───────────

class ArbreSE(VGroup):
    """Carte blanche du coach ; un nœud = le chemin qui y mène (tuple de
    booléens, True = S). Seuls la carte, son titre et le départ sont posés au
    départ : les niveaux poussent avec `pousser`, ou tout d'un coup avec
    `tout_poser`."""

    def __init__(self, n=3, dx=2.2, h=0.64, fs=30, titre="Les 3 commandes", entetes=True, **kw):
        super().__init__(**kw)
        self.n = n
        self.pos = {(): P(0, 0)}
        for L in range(1, n + 1):
            for c in product((True, False), repeat=L):
                i = int("".join("0" if g else "1" for g in c), 2)
                bloc = 2 ** (n - L)
                ys = [((2 ** n - 1) / 2 - j) * h for j in range(i * bloc, (i + 1) * bloc)]
                self.pos[c] = P(L * dx, sum(ys) / len(ys))
        self.branches, self.lab = {}, {}
        for c, v in self.pos.items():
            if not c:
                continue
            u = self.pos[c[:-1]]
            d = (v - u) / np.linalg.norm(v - u)
            self.branches[c] = Line(u + d * (0.12 if len(c) == 1 else 0.3), v - d * 0.3, color=BRANCHE,
                                    stroke_width=4)
            self.lab[c] = Text("S" if c[-1] else "E", font_size=fs, color=ENCRE, weight=BOLD).move_to(v)
        self.depart = Dot(self.pos[()], radius=0.07, color=ENCRE)
        self.entetes = VGroup()
        if entetes:
            y = -(2 ** n - 1) / 2 * h - 0.75
            for L in range(1, n + 1):
                mot = "1re commande" if L == 1 else f"{L}e commande"
                self.entetes.add(Text(mot, font_size=19, color=BRANCHE).move_to(P((L - 0.5) * dx, y)))
        tout = VGroup(self.depart, *self.branches.values(), *self.lab.values(), self.entetes)
        self.carte = RoundedRectangle(width=tout.width + 1.0, height=tout.height + 1.1, corner_radius=0.2,
                                      fill_color=WHITE, fill_opacity=1, stroke_color=BORD, stroke_width=2)
        self.carte.move_to(tout).shift(UP * 0.3)
        self.titre = Text(titre, font_size=22, color=ENCRE, weight=BOLD)
        self.titre.next_to(self.carte.get_top(), DOWN, buff=0.14)
        # ⛔ Tout est DANS le groupe le temps de la mise à l'échelle et du
        # placement ; `ProbaCoefDefinitionBase.arbre` retire ensuite ce qui n'est pas posé.
        self.add(self.carte, self.titre, self.depart, self.entetes, *self.branches.values(), *self.lab.values())
        self.vus = set()

    def socle(self):
        return VGroup(self.carte, self.titre, self.depart, self.entetes)

    def niveau(self, L):
        return [c for c in self.pos if len(c) == L]

    def feuilles(self):
        return self.niveau(self.n)

    def tout_poser(self):
        for c in self.pos:
            if c:
                self.add(self.branches[c], self.lab[c])
                self.vus.add(c)
        return self

    def pousser(self, L, run_time=0.8):
        cs = self.niveau(L)
        self.vus |= set(cs)
        return Succession(AnimationGroup(*[Create(self.branches[c]) for c in cs], run_time=run_time * 0.6),
                          AnimationGroup(*[FadeIn(self.lab[c], scale=1.4) for c in cs], run_time=run_time * 0.4))

    def etat(self, chemins=None, op=0.18):
        """Allume les chemins (orange épais) et estompe le reste ; None : tout normal."""
        on_b = set() if chemins is None else {ch[:k] for ch in chemins for k in range(1, self.n + 1)}
        anims = []
        for c, br in self.branches.items():
            if c not in self.vus:
                continue
            if chemins is None:
                anims.append(br.animate.set_stroke(BRANCHE, 4, opacity=1))
            elif c in on_b:
                anims.append(br.animate.set_stroke(CHEMIN, 9, opacity=1))
            else:
                anims.append(br.animate.set_stroke(BRANCHE, 4, opacity=op))
            on = chemins is None or c in on_b
            anims.append(self.lab[c].animate.set_opacity(1 if on else op))
        return anims


DEUX_S = [(True, True, False), (True, False, True), (False, True, True)]


class ProbaCoefDefinitionBase(Notion6e):
    """Toutes les scènes ; la sous-classe ne change que l'identité."""

    nom_voix = "stmg-proba-coef-definition"
    identite = "Maths — EleveAI"
    ceinture = "bleue"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.3):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def au_nieme(self, extrait, n):
        """Comme au_mot, mais à la n-ième occurrence (1 = la première)."""
        texte, i = self._texte_voix, -1
        for _ in range(n):
            i = texte.find(extrait, i + 1)
            if i < 0:
                raise ValueError(f"« {extrait} » n°{n} absent de la voix : {texte[:60]}…")
        if not self._duree_voix:
            return
        reste = self._debut_voix + self._duree_voix * i / len(texte) - self.renderer.time
        if reste > 0.05:
            self.wait(reste)

    def arbre(self, centre=P(-3.05, -0.4), echelle=0.93, complet=True, n=3, titre="Les 3 commandes", **kw):
        a = ArbreSE(n=n, titre=titre, **kw).scale(echelle).move_to(centre)
        a.remove(*a.branches.values(), *a.lab.values())   # placés, pas encore posés
        if complet:
            a.tout_poser()
        return a

    def colis_rangee(self, s=0.8, ecart=1.35, centre=P(3.3, 2.0)):
        g = VGroup(*[colis(s) for _ in range(3)]).arrange(RIGHT, buff=ecart - 1.0 * s)
        return g.move_to(centre)

    def cocher(self, a, chemins, mots, x=3.4, y0=1.2, pas=0.85, fs=46):
        """Les chemins s'allument l'un après l'autre, écrits en clair, cochés au bout."""
        lg = VGroup(*[ecrire(c, fs) for c in chemins])
        for k, l in enumerate(lg):
            l.move_to(P(x, y0 - pas * k))
        for k, (c, mot) in enumerate(zip(chemins, mots)):
            self.au_mot(mot)
            ok = self.coche(taille=0.14).next_to(a.lab[c], RIGHT, buff=0.12)
            self.play(*a.etat(chemins[:k + 1]), FadeIn(lg[k], shift=LEFT * 0.2), run_time=0.6)
            self.play(Create(ok), run_time=0.3)
        return lg

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Le coefficient binomial", 50, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.22)
        ech = echelle_ceintures(self.ceinture).move_to(P(-0.6, -2.85))
        a = self.arbre(P(-2.7, -0.35), 0.6, complet=False, entetes=False)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), FadeIn(a.socle()), run_time=1.0)
        self.au_mot("compter")
        sous = self.t("compter les chemins", 42, CHEMIN).move_to(P(3.0, -0.35))
        self.play(FadeIn(sous, shift=LEFT * 0.2), run_time=0.5)
        for L in (1, 2, 3):
            self.play(a.pousser(L, 0.45))
        self.play(*a.etat(DEUX_S), run_time=0.5)
        self.attendre_voix(marge=1.0)

    # ── 01 : trois commandes, l'arbre à 3 niveaux, 8 chemins ────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Trois commandes en ligne")
        a = self.arbre(complet=False)
        cs = self.colis_rangee()
        self.au_mot("3 commandes")
        n3 = self.t("3 commandes", 40, JAUNE_TITRE).next_to(cs, DOWN, buff=0.3)
        self.play(LaggedStart(*[FadeIn(c, shift=DOWN * 0.4) for c in cs], lag_ratio=0.2),
                  FadeIn(n3, shift=UP * 0.15), run_time=0.9)
        self.au_mot("à l'heure")
        cS = carte_lettre(True, "à l'heure").move_to(P(3.3, -0.1))
        hS = pendule(True).next_to(cS, LEFT, buff=0.25)
        self.play(FadeIn(hS, scale=1.5), run_time=0.4)
        self.au_mot("succès")
        self.play(FadeIn(cS, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("en retard")
        cE = carte_lettre(False, "en retard").move_to(P(3.3, -1.2)).align_to(cS, LEFT)
        hE = pendule(False).next_to(cE, LEFT, buff=0.25)
        self.play(FadeIn(hE, scale=1.5), run_time=0.4)
        self.au_mot("échec")
        self.play(FadeIn(cE, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("On fait l'arbre")
        self.play(FadeIn(a.socle()), run_time=0.4)
        self.au_mot("3 niveaux")
        l1 = suite(self.t("3", 64, JAUNE_TITRE), self.t("niveaux", 44), buff=0.25).move_to(P(3.2, -0.1))
        # ⛔ L'arbre commence à pousser AU MOT « 3 niveaux », dans le même play.
        self.play(FadeOut(VGroup(cS, cE, hS, hE)), FadeIn(l1, shift=LEFT * 0.2), a.pousser(1, 0.5),
                  Indicate(a.entetes[0], color=CHEMIN), Wiggle(cs[0]), run_time=0.5)
        for L in (2, 3):
            self.play(a.pousser(L, 0.5), Indicate(a.entetes[L - 1], color=CHEMIN), Wiggle(cs[L - 1]), run_time=0.5)
        self.au_mot("8 chemins")
        l2 = suite(self.t("8", 64, JAUNE_TITRE), self.t("chemins", 44), buff=0.25).move_to(P(3.2, -1.3))
        l2.align_to(l1, LEFT)
        self.play(FadeIn(l2, shift=LEFT * 0.2),
                  LaggedStart(*[Indicate(a.lab[c], color=CHEMIN, scale_factor=1.6) for c in a.feuilles()],
                              lag_ratio=0.12), run_time=1.2)
        self.insister(l2[0])
        self.attendre_voix()

    # ── 02 : les chemins à exactement 2 succès ──────────────────────────────

    def ecran_chemins(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-chemins")
        a = self.arbre()
        self.add(a)
        self.titre_ecran("Exactement 2 succès")
        self.au_mot("Combien de chemins")
        q = suite(self.t("exactement", 36), self.t("2", 50, JAUNE_TITRE), self.t("S", 44, C_S),
                  self.t("?", 44), buff=0.2).move_to(P(3.4, 2.1))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.5)
        self.cocher(a, DEUX_S, ["Succès, succès, échec", "Succès, échec, succès", "Échec, succès, succès"])
        self.au_mot("3 chemins")
        r = suite(self.t("3", 72, JAUNE_TITRE), self.t("chemins", 48), buff=0.25).move_to(P(3.0, -1.6))
        self.play(FadeIn(r, scale=1.4), run_time=0.5)
        self.insister(r[0])
        self.attendre_voix()

    # ── 03 : la notation « 2 parmi 3 » ──────────────────────────────────────

    def ecran_notation(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-notation")
        a = self.arbre()
        self.add(a)
        self.play(*a.etat(DEUX_S), run_time=0.4)
        self.titre_ecran("Le coefficient binomial")
        self.au_mot("2 parmi 3")
        nom = self.t("« 2 parmi 3 »", 46, WHITE).move_to(P(3.3, 1.9))
        self.play(FadeIn(nom, scale=1.3), run_time=0.5)
        b = binome(3, 2, 72, c_n=BLEU_CALCUL, c_k=C_S).move_to(P(4.0, -0.2))
        et_n = self.t("commandes", 26, BLEU_CALCUL).next_to(b, LEFT, buff=0.2).match_y(b[1][0])
        et_k = self.t("succès", 26, C_S).next_to(b, LEFT, buff=0.2).match_y(b[1][1]).align_to(et_n, RIGHT)
        self.au_mot("3 au-dessus")
        self.play(FadeIn(b[1][0], scale=1.6), FadeIn(et_n, shift=RIGHT * 0.1), run_time=0.5)
        self.au_mot("de 2")
        self.play(FadeIn(b[1][1], scale=1.6), FadeIn(et_k, shift=RIGHT * 0.1), run_time=0.5)
        self.au_mot("entre parenthèses")
        self.play(Create(b[0]), Create(b[2]), run_time=0.7)
        self.au_mot("Il vaut 3")
        v = egal(b, 3, 72)
        self.play(FadeIn(v, shift=LEFT * 0.2), run_time=0.5)
        self.insister(v[1])
        self.attendre_voix()

    # ── 04 : « 3 parmi 3 », « 0 parmi 3 », « 1 parmi 3 » ───────────────────

    def ecran_autres(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-autres")
        a = self.arbre()
        self.add(a)
        self.titre_ecran("Les autres coefficients")
        cas = [(3, (True, True, True)), (0, (False, False, False))]
        ys = (1.55, -0.05, -1.65)
        for j, (k, ch) in enumerate(cas):
            self.au_mot(f"{k} parmi 3")
            b = binome(3, k, 50, c_k=C_S).move_to(P(2.0, ys[j]))
            self.play(FadeIn(b, scale=1.3), run_time=0.5)
            self.au_nieme("un seul chemin", j + 1)
            v = egal(b, 1, 50)
            self.play(FadeIn(v, shift=LEFT * 0.2), run_time=0.4)
            self.au_mot("tout en succès" if k == 3 else "tout en échec")
            ok = self.coche(taille=0.14).next_to(a.lab[ch], RIGHT, buff=0.12)
            mot = ecrire(ch, 34, 0.18).next_to(v, RIGHT, buff=0.5)
            self.play(*a.etat([ch]), FadeIn(mot, shift=LEFT * 0.15), run_time=0.6)
            self.play(Create(ok), run_time=0.25)
        self.au_mot("1 parmi 3")
        un = [(True, False, False), (False, True, False), (False, False, True)]
        b = binome(3, 1, 50, c_k=C_S).move_to(P(2.0, ys[2]))
        self.play(FadeIn(b, scale=1.3), run_time=0.5)
        self.au_mot(": 3 chemins")
        v = egal(b, 3, 50)
        oks = VGroup(*[self.coche(taille=0.14).next_to(a.lab[c], RIGHT, buff=0.12) for c in un])
        self.play(FadeIn(v, shift=LEFT * 0.2), *a.etat(un), run_time=0.6)
        self.play(Create(oks), run_time=0.3)
        self.insister(v[1])
        self.attendre_voix()

    # ── 05 : 1 + 3 + 3 + 1 = 8 : le tableau du coach ───────────────────────

    def tableau(self, centre=P(3.55, 1.35), larg=1.15):
        """La ligne des 3 commandes, comme le tableau du coach : carte
        blanche, en-têtes = les coefficients, cases vides à remplir."""
        cases, entetes, vals = VGroup(), VGroup(), []
        for k in range(4):
            x = (k - 1.5) * larg
            h = Rectangle(width=larg, height=1.25, stroke_color=BORD, stroke_width=2, fill_color="#F1F5F9",
                          fill_opacity=1).move_to(P(x, 0.45))
            c = Rectangle(width=larg, height=0.9, stroke_color=BORD, stroke_width=2).move_to(P(x, -0.62))
            entetes.add(binome(3, k, 34, color=ENCRE).move_to(h))
            cases.add(h, c)
            vals.append(c)
        titre = Text("Nombre de chemins", font_size=22, color=ENCRE, weight=BOLD).move_to(P(0, 1.42))
        carte = RoundedRectangle(width=4 * larg + 0.6, height=3.3, corner_radius=0.2, fill_color=WHITE,
                                 fill_opacity=1, stroke_color=BORD, stroke_width=2).move_to(P(0, 0.25))
        g = VGroup(carte, titre, cases, entetes).move_to(centre)
        return g, vals

    def ecran_total(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-total")
        a = self.arbre()
        self.add(a)
        self.titre_ecran("Tous les chemins")
        tab, cases = self.tableau()
        self.play(FadeIn(tab, shift=LEFT * 0.2), run_time=0.5)
        texte = self._texte_voix
        valeurs = [1, 3, 3, 1]
        pos, i = [], -1
        for v in valeurs:
            i = texte.find(str(v), i + 1)
            pos.append(i)
        groupes = [[c for c in a.feuilles() if sum(c) == k] for k in range(4)]
        somme = VGroup()
        for k, (v, i) in enumerate(zip(valeurs, pos)):
            self._attendre_index(i)
            nb = Text(str(v), font_size=44, color=ENCRE, weight=BOLD).move_to(cases[k])
            morceau = VGroup(Text(str(v), font_size=50, color=JAUNE_TITRE))
            if k:
                morceau = suite(Text("+", font_size=46), morceau[0], buff=0.18)
            if k:
                morceau.next_to(somme, RIGHT, buff=0.18)
            else:
                morceau.move_to(P(1.75, -0.95))
            somme.add(morceau)
            self.play(FadeIn(nb, scale=1.6), FadeIn(morceau, shift=UP * 0.15), *a.etat(groupes[k]), run_time=0.4)
        self.au_mot(": 8")
        huit = suite(Text("=", font_size=46), Text("8", font_size=60, color=JAUNE_TITRE), buff=0.18)
        huit.next_to(somme, RIGHT, buff=0.2)
        self.play(FadeIn(huit, shift=LEFT * 0.2), *a.etat(None), run_time=0.5)
        self.insister(huit[1])
        self.au_mot("les 8 chemins")
        ch = self.t("chemins de l'arbre", 34).next_to(VGroup(somme, huit), DOWN, buff=0.35).align_to(somme, LEFT)
        self.play(FadeIn(ch, shift=UP * 0.15),
                  LaggedStart(*[Indicate(a.lab[c], color=CHEMIN, scale_factor=1.6) for c in a.feuilles()],
                              lag_ratio=0.1), run_time=1.1)
        self.attendre_voix()

    def _attendre_index(self, i):
        if not self._duree_voix:
            return
        reste = self._debut_voix + self._duree_voix * i / len(self._texte_voix) - self.renderer.time
        if reste > 0.05:
            self.wait(reste)

    # ── 06 : le piège : « 2 parmi 3 » n'est pas 2 × 3 ───────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        a = self.arbre()
        self.add(a)
        self.titre_ecran("Le piège : ce n'est pas un produit")
        self.au_mot("2 parmi 3")
        b = binome(3, 2, 64, c_k=C_S).move_to(P(1.95, 1.0))
        self.play(FadeIn(b, scale=1.3), run_time=0.5)
        self.au_mot("2 fois 3")
        prod = self.t("2 × 3", 52, ROUGE_ERREUR).move_to(P(5.25, 1.0))
        diff = self.t("≠", 60).move_to(P(3.55, 1.0))
        self.play(FadeIn(prod, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("pas un produit")
        barre = Line(prod.get_corner(DL) + P(-0.15, -0.05), prod.get_corner(UR) + P(0.15, 0.05),
                     color=ROUGE_ERREUR, stroke_width=8)
        self.play(Create(barre), FadeIn(diff, scale=1.5), prod.animate.set_opacity(0.55), run_time=0.5)
        self.au_mot("nombre de chemins")
        r = VGroup(self.t("un nombre", 40, CHEMIN), self.t("de chemins", 40, CHEMIN)).arrange(DOWN, buff=0.12)
        r.move_to(P(3.5, -0.9))
        oks = VGroup(*[self.coche(taille=0.14).next_to(a.lab[c], RIGHT, buff=0.12) for c in DEUX_S])
        self.play(FadeIn(r, shift=UP * 0.15), *a.etat(DEUX_S), run_time=0.6)
        self.play(Create(oks), run_time=0.3)
        self.insister(r)
        self.attendre_voix()

    # ── 07 : défi : 2 commandes, exactement 1 succès ───────────────────────

    def arbre2(self, centre=P(-3.4, -0.1), echelle=1.0, complet=True):
        return self.arbre(centre, echelle, complet=complet, n=2, titre="Les 2 commandes", dx=2.4, h=1.0)

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        a = self.arbre2(complet=False)
        q1 = suite(self.t("Avec", 38), self.t("2", 52, JAUNE_TITRE), self.t("commandes,", 38), buff=0.2)
        q2 = self.t("combien de chemins ont", 38)
        q3 = suite(self.t("exactement", 38), self.t("1", 52, JAUNE_TITRE), self.t("S", 46, C_S),
                   self.t("?", 44, ORANGE_RETENUE), buff=0.2)
        q = VGroup(q1, q2, q3).arrange(DOWN, buff=0.3).move_to(P(3.2, 1.0))
        self.au_mot("Avec 2 commandes")
        self.play(FadeIn(q1, shift=UP * 0.15), FadeIn(a.socle()), run_time=0.5)
        for L in (1, 2):
            self.play(a.pousser(L, 0.5))
        self.au_mot("combien de chemins")
        self.play(FadeIn(q2, shift=UP * 0.15), run_time=0.5)
        self.au_mot("exactement 1")
        self.play(FadeIn(q3, shift=UP * 0.15), run_time=0.5)
        self.insister(q3[1])
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        a = self.arbre2()
        self.add(a)
        self.titre_ecran("Correction")
        un = [(True, False), (False, True)]
        self.cocher(a, un, ["Succès-échec", "échec-succès"], x=3.2, y0=1.7, pas=0.9)
        self.au_mot("1 parmi 2")
        b = binome(2, 1, 64, c_k=C_S).move_to(P(2.3, -0.9))
        self.play(FadeIn(b, scale=1.3), run_time=0.5)
        self.au_mot("vaut 2")
        v = egal(b, 2, 64)
        ok = self.coche(taille=0.3).next_to(v, RIGHT, buff=0.4)
        self.play(FadeIn(v, shift=LEFT * 0.2), run_time=0.4)
        self.play(Create(ok), run_time=0.3)
        self.insister(v[1])
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 38
        b = binome("n", "k", 48, c_n=BLEU_CALCUL, c_k=C_S)
        l1a = suite(b, self.t("« k parmi n » :", fs, JAUNE_TITRE), buff=0.3)
        l1b = VGroup(self.t("le nombre de chemins de l'arbre à n niveaux", fs),
                     suite(self.t("qui ont exactement", fs), self.t("k succès", fs, C_S), buff=0.15)
                     ).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        l1 = VGroup(l1a, l1b).arrange(DOWN, aligned_edge=LEFT, buff=0.2)
        l2 = VGroup(self.t("La somme de tous ces coefficients", fs),
                    suite(self.t("=", fs), self.t("le nombre total de chemins", fs, CHEMIN), buff=0.15)
                    ).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3, aligned_edge=UP) for l in (l1, l2)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6)
        if lignes.width > 11.0:
            lignes.scale_to_fit_width(11.0)
        lignes.move_to(P(-0.7, 0.0))
        self.au_mot("« k parmi n »")
        self.play(FadeIn(l1a, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("c'est le nombre")
        self.play(FadeIn(l1b, shift=RIGHT * 0.2), run_time=0.6)
        self.play(Create(lignes[0][0]), run_time=0.4)
        self.au_mot("La somme")
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
        self.ecran_chemins()
        self.ecran_notation()
        self.ecran_autres()
        self.ecran_total()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")


class ProbaCoefDefinitionSTMG(ProbaCoefDefinitionBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "bleue"
