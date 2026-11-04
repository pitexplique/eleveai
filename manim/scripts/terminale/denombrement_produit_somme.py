# denombrement_produit_somme.py
# EleveAI — Maths Tle spé — paysage « Dénombrer : principe multiplicatif et
# principe additif » (16:9), ceinture VERTE. Micro du coach :
# denombrement_produit_somme (lib/tutor-v4/questionBank/terminale-spe/maths/
# denombrement.bank.ts, notion denombrement_combinatoire).
# Short jumeau : denombrement_produit_somme_short.py.
#
# Clé de voix → écran :
#   · 00-accroche : Lisbonne (collines, tram), un vol, un hôtel, une excursion ;
#   · 01-titre    : page de garde, l'échelle ENTIÈRE (verte) ;
#   · 02-metier   : Clara, conseillère en voyages : 3 vols, 4 hôtels, 5 excursions ;
#   · 03-arbre    : l'arbre qui pousse : 3, puis 12, puis 60 chemins ;
#   · 04-produit  : « et » → ×, le triplet, le produit cartésien V × H × E ;
#   · 05/05b      : question-pause n° 1 (la voiture : 60 × 2 = 120 → B) ;
#   · 06-somme    : avion (6) OU bus (4), cas disjoints : 6 + 4 = 10 ;
#   · 07-additif  : « ou » → +, des cas qui ne se chevauchent pas ;
#   · 08-piege    : les clients comptés deux fois : 30 + 20 − 12 = 38 ;
#   · 09/09b      : question-pause n° 2 ((6 + 4) × 2 = 20 → C) ;
#   · 10-metier   : ce que Clara en fait ;
#   · 11-appris   : « Ce que tu as appris », titre en haut et centré ;
#   · 12-abonne   : « Entraîne-toi sur eleveai.fr » + « Abonne-toi ! ».
#
# Code couleur : bleu = « et », les étapes, le produit (triplets) ; violet =
# « ou », les cas disjoints, la somme ; vert = résultat juste ; rouge = piège.
# Vols bleus, hôtels roses, excursions jaunes (le tram de Lisbonne).
# Outils communs (synchro, question-pause, fin) : DenombBase de
# denombrement_reconnaitre.py (même lot, même auteur).
# ⛔ Pas de LaTeX sur le poste : tout est en Text.
#
# Voix : manim/voix/terminale-denombrement-produit-somme.json (débit −6).
# python -m manim render -qh --disable_caching manim/scripts/terminale/denombrement_produit_somme.py DenombrementProduitSommeTerminale -o eleveai-maths-terminale-denombrement-produit-somme --media_dir manim/scripts/terminale/media-denombrement-produit-somme
# Sortie : manim/sorties/terminale/maths/probabilites/denombrement-produit-somme/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from denombrement_reconnaitre import (FOND_CARTE, PEAUX, DenombBase, P, cases, personne,  # noqa: E402
                                      puissance)

from manim import *  # noqa: E402

from charte import *  # noqa: E402

assert 3 * 4 * 5 == 60 and 60 * 2 == 120 and 3 * 4 == 12
assert 6 + 4 == 10 and 30 + 20 - 12 == 38 and (6 + 4) * 2 == 20

ET, OU = BLEU_CALCUL, VIOLET_ACCENT
C_VOL, C_HOTEL, C_EXC, C_BUS = BLEU_CALCUL, "#F472B6", "#FACC15", "#34D399"


# ── les pictogrammes du voyage ──────────────────────────────────────────────

def avion(s=1.0, c=C_VOL):
    fus = RoundedRectangle(width=1.2, height=0.24, corner_radius=0.12, fill_color=c, fill_opacity=1, stroke_width=0)
    aile = Polygon(P(-0.1, 0), P(0.25, 0), P(-0.25, -0.55), P(-0.42, -0.55), fill_color=c, fill_opacity=1,
                   stroke_width=0)
    aile2 = Polygon(P(-0.1, 0), P(0.25, 0), P(-0.25, 0.5), P(-0.42, 0.5), fill_color=c, fill_opacity=0.7,
                    stroke_width=0)
    der = Polygon(P(-0.5, 0.05), P(-0.62, 0.38), P(-0.45, 0.38), P(-0.3, 0.05), fill_color=c, fill_opacity=1,
                  stroke_width=0)
    return VGroup(aile2, fus, aile, der).scale(s)


def hotel(s=1.0, c=C_HOTEL):
    bat = Rectangle(width=0.8, height=1.0, fill_color=c, fill_opacity=0.9, stroke_width=0)
    fen = VGroup(*[Square(0.13, fill_color=WHITE, fill_opacity=0.9, stroke_width=0) for _ in range(6)])
    fen.arrange_in_grid(3, 2, buff=0.13).move_to(bat).shift(UP * 0.12)
    porte = Rectangle(width=0.18, height=0.24, fill_color="#1f2937", fill_opacity=1, stroke_width=0)
    porte.move_to(bat.get_bottom() + UP * 0.12)
    return VGroup(bat, fen, porte).move_to(ORIGIN).scale(s)


def tram(s=1.0, c=C_EXC):
    caisse = RoundedRectangle(width=1.2, height=0.6, corner_radius=0.1, fill_color=c, fill_opacity=1,
                              stroke_width=0)
    vitres = VGroup(*[Rectangle(width=0.22, height=0.2, fill_color="#1e3a8a", fill_opacity=1, stroke_width=0)
                      for _ in range(4)]).arrange(RIGHT, buff=0.06).move_to(caisse).shift(UP * 0.08)
    roues = VGroup(*[Circle(radius=0.08, fill_color="#111827", fill_opacity=1, stroke_width=0)
                     .move_to(caisse.get_bottom() + P(x, -0.02)) for x in (-0.35, 0.35)])
    perche = Line(caisse.get_top(), caisse.get_top() + P(0.25, 0.3), stroke_width=3, color=GREY_B)
    return VGroup(perche, caisse, vitres, roues).move_to(ORIGIN).scale(s)


def bus(s=1.0, c=C_BUS):
    caisse = RoundedRectangle(width=1.3, height=0.55, corner_radius=0.12, fill_color=c, fill_opacity=1,
                              stroke_width=0)
    vitres = VGroup(*[Rectangle(width=0.2, height=0.18, fill_color="#0f172a", fill_opacity=1, stroke_width=0)
                      for _ in range(5)]).arrange(RIGHT, buff=0.05).move_to(caisse).shift(UP * 0.08)
    roues = VGroup(*[Circle(radius=0.09, fill_color="#111827", fill_opacity=1, stroke_width=0)
                     .move_to(caisse.get_bottom() + P(x, 0)) for x in (-0.4, 0.4)])
    return VGroup(caisse, vitres, roues).move_to(ORIGIN).scale(s)


def voiture_loc(s=1.0, c="#EF4444"):
    caisse = RoundedRectangle(width=1.0, height=0.3, corner_radius=0.1, fill_color=c, fill_opacity=1,
                              stroke_width=0)
    toit = Polygon(P(-0.3, 0.15), P(0.2, 0.15), P(0.1, 0.38), P(-0.22, 0.38), fill_color=c, fill_opacity=1,
                   stroke_width=0)
    roues = VGroup(*[Circle(radius=0.1, fill_color="#111827", fill_opacity=1, stroke_color=GREY_B,
                            stroke_width=2).move_to(P(x, -0.15)) for x in (-0.3, 0.3)])
    return VGroup(toit, caisse, roues).move_to(ORIGIN).scale(s)


def lisbonne(s=1.0):
    """Les collines, les toits, le soleil, et le tram jaune qui monte."""
    soleil = Circle(radius=0.4, fill_color="#FDE047", fill_opacity=1, stroke_width=0).move_to(P(2.2, 1.3))
    colline = Polygon(P(-3, -1), P(-2.2, 0.0), P(-1.0, 0.5), P(0.4, 0.2), P(1.6, 0.7), P(3, -0.1), P(3, -1),
                      fill_color="#7c2d12", fill_opacity=0.6, stroke_width=0)
    maisons = VGroup()
    for k, x in enumerate(np.linspace(-2.5, 2.5, 9)):
        h = 0.35 + 0.15 * ((k * 7) % 3)
        m = Rectangle(width=0.45, height=h, fill_color=["#FDBA74", "#FCA5A5", "#FEF3C7"][k % 3], fill_opacity=1,
                      stroke_width=0).move_to(P(x, -0.75 + h / 2))
        toit = Triangle(fill_color="#B45309", fill_opacity=1, stroke_width=0).scale(0.2).stretch(1.2, 0)
        toit.next_to(m, UP, buff=0)
        maisons.add(VGroup(m, toit))
    sol = Line(P(-3, -0.78), P(3, -0.78), stroke_width=3, color=GREY_B)
    return VGroup(soleil, colline, maisons, sol).scale(s)


ICONES = {"vol": avion, "hotel": hotel, "exc": tram}
COULEURS = {"vol": C_VOL, "hotel": C_HOTEL, "exc": C_EXC}


class DenombrementProduitSommeTerminale(DenombBase):
    fichier_marques = "denombrement_produit_somme_marques.json"
    nom_voix = "terminale-denombrement-produit-somme"

    def rangee(self, quoi, n, s, buff=0.12):
        return VGroup(*[ICONES[quoi](s) for _ in range(n)]).arrange(RIGHT, buff=buff)

    # ── 00 : Lisbonne : un vol, un hôtel, une excursion ────────────────────

    def ecran_accroche(self):
        self.clear()
        margo = self.add_mascotte()
        self.dire("00-accroche")
        ville = lisbonne(1.05).move_to(P(-2.6, 1.55))
        nom = self.t("Lisbonne", 46, JAUNE_TITRE).move_to(P(-2.6, 3.1))
        sem = self.t("une semaine", 30, GREY_A).next_to(nom, RIGHT, buff=0.3)
        self.au_mot("une semaine")
        self.play(FadeIn(sem, shift=DOWN * 0.1), run_time=0.3)
        self.au_mot("Lisbonne")
        self.play(FadeIn(ville, shift=UP * 0.2), Write(nom), run_time=0.7)
        icones = [avion(1.0), hotel(1.0), tram(1.0)]
        mots = ["Un vol", "un hôtel", "une excursion"]
        textes = ["un vol", "un hôtel", "une excursion"]
        xs = [-5.3, -2.6, 0.3]
        for ic, mot, tx, x in zip(icones, mots, textes, xs):
            ic.move_to(P(x, -0.9))
            lab = self.t(tx, 32, list(COULEURS.values())[xs.index(x)]).next_to(ic, DOWN, buff=0.25)
            self.au_mot(mot)
            self.play(FadeIn(ic, scale=1.4), FadeIn(lab, shift=UP * 0.1), run_time=0.4)
        q = VGroup(self.t("Combien de voyages", 36, BLEU_CALCUL, larg=4.6), self.t("différents ?", 36, BLEU_CALCUL))
        q.arrange(DOWN, buff=0.12).move_to(P(3.95, 1.4))
        self.au_mot("Combien de voyages")
        self.play(FadeIn(q, scale=1.2), run_time=0.45)
        plus = self.t("Plus que tu ne crois !", 34, ORANGE_RETENUE, larg=4.6).move_to(P(3.95, -0.1))
        self.au_mot("Plus que tu ne crois")
        self.play(FadeIn(plus, shift=UP * 0.15), run_time=0.4)
        self.insister(plus, 1.12)
        self.bring_to_front(margo)
        self.attendre_voix(marge=0.6)

    # ── 01 : page de garde ─────────────────────────────────────────────────

    def ecran_titre(self):
        self.garde("01-titre", "Dénombrer : multiplier ou additionner ?", "Dénombrer",
                   [("le principe multiplicatif", "le principe multiplicatif", ET, None),
                    ("le principe additif", "et le principe additif", OU, None)])

    # ── 02 : Clara, conseillère en voyages : 3 vols, 4 hôtels, 5 excursions ─

    def ecran_metier(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-metier")
        clara = personne(ORANGE_RETENUE, PEAUX[3], "#111111", 0.85, longs=True).move_to(P(-5.55, 2.3))
        nom = self.t("Clara", 42, BLEU_CALCUL).move_to(P(0, 2.8)).align_to(P(-4.7, 0), LEFT)
        met = self.t("conseillère en voyages", 32).move_to(P(0, 2.15)).align_to(P(-4.7, 0), LEFT)
        self.au_mot("Clara")
        self.play(FadeIn(clara, shift=UP * 0.2), FadeIn(nom, shift=RIGHT * 0.15), run_time=0.5)
        self.au_mot("conseillère")
        self.play(FadeIn(met, shift=RIGHT * 0.15), run_time=0.4)
        lignes = {}
        for quoi, n, mot, tx, y in (("vol", 3, "3 vols", "3 vols", 1.0), ("hotel", 4, "4 hôtels", "4 hôtels", -0.1),
                                    ("exc", 5, "5 excursions", "5 excursions", -1.2)):
            lab = self.t(tx, 34, COULEURS[quoi]).move_to(P(0, y)).align_to(P(-6.1, 0), LEFT)
            r = self.rangee(quoi, n, 0.62, 0.25).move_to(P(0, y)).align_to(P(-2.9, 0), LEFT)
            self.au_mot(mot)
            self.play(FadeIn(lab, shift=RIGHT * 0.1), LaggedStart(*[FadeIn(x, scale=1.3) for x in r], lag_ratio=0.1),
                      run_time=0.5)
            lignes[quoi] = r
        self.au_mot("Un voyage")
        choix = [lignes["vol"][1], lignes["hotel"][2], lignes["exc"][0]]
        anneaux = VGroup(*[SurroundingRectangle(c, color=WHITE, buff=0.08, corner_radius=0.08) for c in choix])
        self.play(Create(anneaux), run_time=0.4)
        bande = VGroup(avion(0.6), self.t("ET", 36, ET), hotel(0.55), self.t("ET", 36, ET), tram(0.6))
        bande.arrange(RIGHT, buff=0.3).move_to(P(-1.6, -2.55))
        self.au_mot("un vol ET")
        self.play(TransformFromCopy(choix[0], bande[0]), run_time=0.4)
        self.au_mot("ET un hôtel")
        self.play(FadeIn(bande[1], scale=1.4), TransformFromCopy(choix[1], bande[2]), run_time=0.4)
        self.au_mot("ET une excursion")
        self.play(FadeIn(bande[3], scale=1.4), TransformFromCopy(choix[2], bande[4]), run_time=0.4)
        self.insister(VGroup(bande[1], bande[3]), 1.25)
        self.attendre_voix(marge=0.6)

    # ── 03 : l'arbre qui pousse : 3, 12, 60 chemins ────────────────────────

    def arbre(self, x0=-5.9, xs=(-3.7, -0.9, 2.3), dy=(1.7, 0.42, 0.084), ns=(3, 4, 5)):
        """Les trois niveaux de l'arbre : [(branches, noeuds)] et la racine."""
        racine = Dot(P(x0, 0), radius=0.09, color=WHITE)
        niveaux, peres = [], [P(x0, 0)]
        couleurs = (C_VOL, C_HOTEL, C_EXC)
        for k, (x, d, n) in enumerate(zip(xs, dy, ns)):
            br, nd, fils = VGroup(), VGroup(), []
            for p in peres:
                for j in range(n):
                    q = P(x, p[1] + (j - (n - 1) / 2) * d)
                    br.add(Line(p, q, stroke_width=(3.5, 2.2, 1.2)[k], color=couleurs[k]))
                    nd.add(Dot(q, radius=(0.09, 0.06, 0.028)[k], color=couleurs[k]))
                    fils.append(q)
            niveaux.append((br, nd))
            peres = fils
        return racine, niveaux

    def ecran_arbre(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-arbre")
        racine, niv = self.arbre()
        tit = self.t("L'arbre des voyages", 40, JAUNE_TITRE).move_to(P(-1.8, 3.25))
        self.au_mot("Dessinons l'arbre")
        self.play(Write(tit), FadeIn(racine, scale=2), run_time=0.5)
        icones = VGroup(avion(0.45).move_to(P(-3.7, 2.55)), hotel(0.4).move_to(P(-0.9, 2.65)),
                        tram(0.42).move_to(P(2.3, 2.75)))
        labels = [("3 branches", "3 vols", "3", C_VOL), ("12 chemins", "12 chemins", "12", C_HOTEL),
                  ("60 chemins", "60 chemins", "60", C_EXC)]
        for k, ((br, nd), (mot, tx, nb, c), x) in enumerate(zip(niv, labels, (-3.7, -0.9, 2.3))):
            self.au_pos(self._texte_voix.find(("3 branches", "4 branches", "5 branches")[k]))
            lab = self.t(tx, 30, c).move_to(P(x, -2.95))
            self.play(LaggedStart(*[Create(b) for b in br], lag_ratio=0.6 / len(br)), FadeIn(icones[k], scale=1.3),
                      *([FadeIn(lab, shift=UP * 0.1)] if k == 0 else []), run_time=0.6 + 0.2 * k)
            self.play(FadeIn(nd), run_time=0.2)
            if k:
                self.au_mot(mot)
                self.play(FadeIn(lab, shift=UP * 0.1), Indicate(nd, color=c, scale_factor=1.3), run_time=0.35)
        prod = self.fois("3", "4", "5", fs=44, color=ET)
        prod.move_to(P(4.95, 0.8))
        v = self._texte_voix
        dep = v.find("3 fois")
        for k, n in enumerate("345"):
            self.au_pos(v.find(n, dep))
            dep = v.find(n, dep) + 1
            anims = [FadeIn(prod[2 * k], shift=UP * 0.1)]
            if k:
                anims.append(FadeIn(prod[2 * k - 1]))
            self.play(*anims, run_time=0.2)
        res = VGroup(self.t("= 60", 50, VERT_OK), self.t("voyages", 40, VERT_OK)).arrange(DOWN, buff=0.15)
        res.next_to(prod, DOWN, buff=0.35)
        self.au_mot("60 voyages")
        cad = SurroundingRectangle(res, color=VERT_OK, buff=0.15, stroke_width=3)
        self.play(FadeIn(res, scale=1.3), Create(cad), run_time=0.4)
        self.insister(VGroup(res, cad), 1.1)
        self.attendre_voix(marge=0.6)

    # ── 04 : le principe multiplicatif, le triplet, le produit cartésien ────

    def ensemble(self, quoi, n, nom, x, y, larg):
        ic = VGroup(*[ICONES[quoi](0.38) for _ in range(n)]).arrange(RIGHT, buff=0.12)
        el = Ellipse(width=larg, height=1.25, stroke_color=COULEURS[quoi], stroke_width=4).move_to(P(x, y))
        ic.move_to(el)
        lab = self.t(nom, 36, COULEURS[quoi], audit=False).next_to(el, LEFT, buff=0.1).shift(UP * 0.45)
        return VGroup(el, ic, lab)

    def ecran_produit(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-produit")
        tit = self.t("Le principe multiplicatif", 44, ET).to_edge(UP, buff=0.5)
        self.au_mot("principe multiplicatif")
        self.play(Write(tit), run_time=0.6)
        etapes = VGroup(*[VGroup(RoundedRectangle(width=1.3, height=0.9, corner_radius=0.12, stroke_color=COULEURS[q],
                                                  stroke_width=4, fill_color=FOND_CARTE, fill_opacity=1),
                                 ICONES[q](0.5)) for q in ("vol", "hotel", "exc")])
        etapes.arrange(RIGHT, buff=1.0).move_to(P(-3.0, 2.0))
        for e in etapes:
            e[1].move_to(e[0])
        ets = VGroup(*[self.t("et", 38, JAUNE_TITRE).move_to((etapes[k].get_right() + etapes[k + 1].get_left()) / 2)
                       for k in range(2)])
        fois = VGroup(*[self.t("×", 48, ET).move_to(e) for e in ets])
        self.au_mot("Des étapes successives")
        self.play(LaggedStart(*[FadeIn(e, shift=RIGHT * 0.2) for e in etapes], lag_ratio=0.3), run_time=0.7)
        self.au_mot("reliées par")
        self.play(LaggedStart(*[FadeIn(e, scale=1.4) for e in ets], lag_ratio=0.3), run_time=0.45)
        mult = self.t("on multiplie", 38, ET).move_to(P(3.3, 2.0))
        self.au_mot("on multiplie")
        self.play(*[Transform(a, b) for a, b in zip(ets, fois)], FadeIn(mult, shift=LEFT * 0.1), run_time=0.5)
        # le triplet
        tr = self.t("Un voyage = un triplet :", 34).move_to(P(0, 0.7)).align_to(P(-6.1, 0), LEFT)
        self.au_mot("un triplet")
        self.play(FadeIn(tr, shift=RIGHT * 0.1), run_time=0.4)
        par = VGroup(self.t("(", 50, ET), avion(0.45), self.t(";", 44, ET), hotel(0.42), self.t(";", 44, ET),
                     tram(0.45), self.t(")", 50, ET)).arrange(RIGHT, buff=0.2).next_to(tr, RIGHT, buff=0.35)
        self.play(FadeIn(par[0]), FadeIn(par[6]), run_time=0.2)
        for k, mot in enumerate(("un vol", "un hôtel", "une excursion")):
            self.au_mot(mot)
            anims = [FadeIn(par[1 + 2 * k], scale=1.4)]
            if k:
                anims.append(FadeIn(par[2 * k]))
            self.play(*anims, run_time=0.3)
        # les ensembles V, H, E, et leur produit
        V = self.ensemble("vol", 3, "V", -4.2, -0.95, 2.0)
        H = self.ensemble("hotel", 4, "H", -0.95, -0.95, 2.6)
        E = self.ensemble("exc", 5, "E", 2.9, -0.95, 3.6)
        self.au_mot("L'ensemble de ces triplets")
        self.play(LaggedStart(FadeIn(V), FadeIn(H), FadeIn(E), lag_ratio=0.3), run_time=0.8)
        pc = self.t("produit cartésien :", 34, ET).move_to(P(0, -2.3)).align_to(P(-6.1, 0), LEFT)
        vhe = self.t("V × H × E", 40, ET, audit=False).next_to(pc, RIGHT, buff=0.3)
        self.au_mot("produit cartésien")
        self.play(FadeIn(pc, shift=RIGHT * 0.1), run_time=0.35)
        self.au_mot("V fois H")
        self.play(FadeIn(vhe, scale=1.2), run_time=0.35)
        card = self.t("card(V × H × E) =", 36, audit=False).move_to(P(0, -3.05)).align_to(P(-6.1, 0), LEFT)
        self.au_mot("Son cardinal")
        self.play(FadeIn(card, shift=RIGHT * 0.1), run_time=0.4)
        prod = self.fois("3", "4", "5", fs=40, color=VERT_OK).next_to(card, RIGHT, buff=0.25)
        cards = [self.t(n, 32, COULEURS[q]).next_to(S[0], RIGHT, buff=0.08).align_to(S[0], DOWN)
                 for n, q, S in zip("345", ("vol", "hotel", "exc"), (V, H, E))]
        self.au_mot("produit des cardinaux")
        self.play(*[Indicate(S[0], color=WHITE, scale_factor=1.04) for S in (V, H, E)], run_time=0.5)
        v = self._texte_voix
        dep = v.find("3 fois")
        for k, n in enumerate("345"):
            self.au_pos(v.find(n, dep))
            dep = v.find(n, dep) + 1
            anims = [FadeIn(prod[2 * k], shift=UP * 0.1), FadeIn(cards[k], scale=1.3)]
            if k:
                anims.append(FadeIn(prod[2 * k - 1]))
            self.play(*anims, run_time=0.2)
        self.insister(prod, 1.15)
        self.attendre_voix(marge=0.6)

    # ── 05 : question-pause n° 1 : avec ou sans voiture ────────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-question")
        t0 = self.renderer.time
        tete, q, cartes, pause, rebours = self.q_tete(
            ["Clara ajoute un choix :", "avec ou sans voiture.", "Combien de voyages ?"], ["62", "120", "14"])
        self.au_mot("Question")
        self.play(FadeIn(tete, shift=DOWN * 0.2), run_time=0.4)
        mini = VGroup(avion(0.5), self.t("×", 36, ET), hotel(0.45), self.t("×", 36, ET), tram(0.5))
        mini.arrange(RIGHT, buff=0.22).move_to(P(-3.6, 2.3))
        self.au_mot("Clara ajoute")
        self.play(FadeIn(q[0], shift=UP * 0.1), FadeIn(mini, shift=RIGHT * 0.15), run_time=0.45)
        avec = VGroup(RoundedRectangle(width=1.8, height=1.3, corner_radius=0.14, stroke_color=GREY_B,
                                       stroke_width=3, fill_color=FOND_CARTE, fill_opacity=1), voiture_loc(0.9))
        avec[1].move_to(avec[0]).shift(UP * 0.12)
        sans = avec.copy()
        sans.add(Line(sans[1].get_corner(UL), sans[1].get_corner(DR), color=ROUGE_ERREUR, stroke_width=6))
        la = self.t("avec", 28).next_to(avec[0].get_bottom(), UP, buff=0.08)
        ls = self.t("sans", 28).next_to(sans[0].get_bottom(), UP, buff=0.08)
        VGroup(VGroup(avec, la), VGroup(sans, ls)).arrange(RIGHT, buff=0.5).move_to(P(-3.6, 0.55))
        la.next_to(avec[0].get_bottom(), UP, buff=0.08)
        ls.next_to(sans[0].get_bottom(), UP, buff=0.08)
        self.au_mot("avec ou sans")
        self.play(FadeIn(q[1], shift=UP * 0.1), FadeIn(avec, scale=1.2), FadeIn(la), run_time=0.4)
        self.au_mot("sans voiture")
        self.play(FadeIn(sans, scale=1.2), FadeIn(ls), run_time=0.35)
        self.au_mot("Combien de voyages")
        self.play(FadeIn(q[2], shift=UP * 0.1), run_time=0.35)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "05-question", t0, 1)
        self.dire("05b-reponse")
        self.q_reponse(cartes, 1, pause, rebours)
        etape = self.t("une étape de plus", 32, ET).move_to(P(-3.6, 1.55))
        self.au_mot("Une étape de plus")
        self.play(FadeIn(etape, shift=DOWN * 0.1), run_time=0.35)
        deux = self.t("2 choix", 34, ET).move_to(P(-3.6, -0.55))
        self.au_mot("2 choix")
        self.play(FadeIn(deux, shift=UP * 0.1), Indicate(VGroup(avec, sans), color=ET, scale_factor=1.05),
                  run_time=0.45)
        x2 = self.t("× 2", 44, ET).move_to(P(-3.6, -1.3))
        self.au_nb("multiplie par", "2")
        self.play(FadeIn(x2, scale=1.4), run_time=0.35)
        calc = VGroup(self.t("60", 44), self.t("×", 44), self.t("2", 44), self.t("=", 44, VERT_OK),
                      self.t("120 voyages", 44, VERT_OK)).arrange(RIGHT, buff=0.2).move_to(P(-3.0, -2.5))
        self.au_mot("60 fois")
        self.play(FadeIn(calc[0], shift=UP * 0.1), run_time=0.25)
        self.au_nb("60 fois", "2")
        self.play(FadeIn(calc[1]), FadeIn(calc[2], shift=UP * 0.1), run_time=0.25)
        self.au_mot("120 voyages")
        cad = SurroundingRectangle(calc[3:], color=VERT_OK, buff=0.12, stroke_width=3)
        self.play(FadeIn(calc[3:], scale=1.2), Create(cad), run_time=0.4)
        self.insister(VGroup(calc, cad), 1.08)
        self.attendre_voix(marge=0.6)

    # ── 06 : avion OU bus : 6 + 4 = 10 trajets ─────────────────────────────

    def ecran_somme(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-somme")
        tit = self.t("Le trajet jusqu'à Lisbonne", 42, JAUNE_TITRE).to_edge(UP, buff=0.5)
        self.au_mot("le trajet")
        self.play(Write(tit), run_time=0.6)
        ea = Ellipse(width=4.3, height=2.5, stroke_color=C_VOL, stroke_width=5).move_to(P(-3.7, 0.75))
        eb = Ellipse(width=3.6, height=2.5, stroke_color=C_BUS, stroke_width=5).move_to(P(2.7, 0.75))
        av = VGroup(*[avion(0.55) for _ in range(6)]).arrange_in_grid(2, 3, buff=(0.3, 0.35)).move_to(ea)
        bs = VGroup(*[bus(0.55) for _ in range(4)]).arrange_in_grid(2, 2, buff=(0.3, 0.4)).move_to(eb)
        la = self.t("6 vols", 34, C_VOL).next_to(ea, DOWN, buff=0.15)
        lb = self.t("4 bus", 34, C_BUS).next_to(eb, DOWN, buff=0.15)
        ta = self.t("en avion", 30, C_VOL).next_to(ea, UP, buff=0.1)
        tb = self.t("en bus", 30, C_BUS).next_to(eb, UP, buff=0.1)
        self.au_mot("Soit en avion")
        self.play(Create(ea), FadeIn(ta), run_time=0.4)
        self.au_mot("6 vols")
        self.play(LaggedStart(*[FadeIn(a, scale=1.3) for a in av], lag_ratio=0.1), FadeIn(la), run_time=0.5)
        self.au_mot("Soit en bus")
        self.play(Create(eb), FadeIn(tb), run_time=0.4)
        self.au_mot("4 bus")
        self.play(LaggedStart(*[FadeIn(b, scale=1.3) for b in bs], lag_ratio=0.1), FadeIn(lb), run_time=0.45)
        ou = self.t("OU", 60, OU).move_to(P(-0.5, 0.75))
        self.au_mot("OU")
        self.play(FadeIn(ou, scale=1.6), run_time=0.35)
        jam = self.t("jamais les deux", 32, ROUGE_ERREUR).move_to(P(-0.5, -1.3))
        self.au_mot("jamais les deux")
        self.play(FadeIn(jam, shift=UP * 0.1), run_time=0.35)
        dis = self.t("cas disjoints : on additionne", 34, OU).move_to(P(-0.5, -1.95))
        self.au_mot("disjoints")
        self.play(FadeIn(dis[:13], shift=UP * 0.1), ea.animate.shift(LEFT * 0.15), av.animate.shift(LEFT * 0.15),
                  eb.animate.shift(RIGHT * 0.15), bs.animate.shift(RIGHT * 0.15), run_time=0.45)
        self.au_mot("on additionne")
        self.play(FadeIn(dis[13:], shift=UP * 0.1), run_time=0.3)
        calc = VGroup(self.t("6", 46), self.t("+", 46, OU), self.t("4", 46), self.t("=", 46, VERT_OK),
                      self.t("10 trajets", 46, VERT_OK)).arrange(RIGHT, buff=0.2).move_to(P(-1.0, -2.85))
        v = self._texte_voix
        self.au_pos(v.find("6 plus"))
        self.play(FadeIn(calc[0], shift=UP * 0.1), run_time=0.2)
        self.au_nb("6 plus", "4")
        self.play(FadeIn(calc[1]), FadeIn(calc[2], shift=UP * 0.1), run_time=0.2)
        self.au_mot("10 trajets")
        cad = SurroundingRectangle(calc[3:], color=VERT_OK, buff=0.12, stroke_width=3)
        self.play(FadeIn(calc[3:], scale=1.2), Create(cad), run_time=0.4)
        self.insister(VGroup(calc, cad), 1.08)
        self.attendre_voix(marge=0.6)

    # ── 07 : le principe additif ───────────────────────────────────────────

    def ecran_additif(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-additif")
        tit = self.t("Le principe additif", 44, OU).to_edge(UP, buff=0.5)
        self.au_mot("principe additif")
        self.play(Write(tit), run_time=0.6)
        rng = np.random.default_rng(4)
        A = VGroup(Ellipse(width=3.2, height=2.3, stroke_color=C_VOL, stroke_width=5),
                   *[Dot(P(*rng.uniform(-0.9, 0.9, 2) * (1.0, 0.6)), radius=0.08, color=C_VOL) for _ in range(6)])
        B = VGroup(Ellipse(width=2.8, height=2.3, stroke_color=C_BUS, stroke_width=5),
                   *[Dot(P(*rng.uniform(-0.75, 0.75, 2) * (1.0, 0.6)), radius=0.08, color=C_BUS) for _ in range(4)])
        A.move_to(P(-1.6, 0.6))
        B.move_to(P(0.9, 0.6))
        la = self.t("cas A", 32, C_VOL, audit=False).next_to(A, UP, buff=0.12)
        lb = self.t("cas B", 32, C_BUS, audit=False).next_to(B, UP, buff=0.12)
        self.play(FadeIn(A), FadeIn(B), FadeIn(la), FadeIn(lb), run_time=0.5)
        self.au_mot("ne se chevauchent pas")
        self.play(VGroup(A, la).animate.shift(LEFT * 2.0), VGroup(B, lb).animate.shift(RIGHT * 2.0), run_time=0.8)
        ch = self.t("ils ne se chevauchent pas", 32, OU).move_to(P(-0.4, -1.15))
        self.play(FadeIn(ch, shift=UP * 0.1), run_time=0.35)
        ou = self.t("ou", 56, OU).move_to(P(-0.35, 0.6))
        self.au_mot("reliés par")
        self.play(FadeIn(ou, scale=1.6), run_time=0.4)
        plus = self.t("+", 72, OU).move_to(ou)
        self.au_mot("on additionne")
        self.play(Transform(ou, plus), run_time=0.45)
        tot = VGroup(self.t("total", 38, VERT_OK), self.t("=", 38, VERT_OK), self.t("nombre de A", 38, C_VOL),
                     self.t("+", 38, OU), self.t("nombre de B", 38, C_BUS)).arrange(RIGHT, buff=0.2)
        tot.move_to(P(-0.4, -2.2))
        self.au_mot("leurs nombres")
        cad = SurroundingRectangle(tot, color=VERT_OK, buff=0.15, stroke_width=3)
        self.play(FadeIn(tot, shift=UP * 0.1), Create(cad), run_time=0.5)
        self.insister(VGroup(tot, cad), 1.06)
        self.attendre_voix(marge=0.6)

    # ── 08 : le piège : les clients comptés deux fois ──────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-piege")
        tit = self.t("Voilà le piège !", 46, ROUGE_ERREUR).to_edge(UP, buff=0.5)
        self.au_mot("Voilà le piège")
        self.play(FadeIn(tit, scale=1.3), run_time=0.45)
        sous = self.t("On n'additionne que si les cas sont disjoints.", 30).next_to(tit, DOWN, buff=0.2)
        self.au_mot("On n'additionne")
        self.play(FadeIn(sous, shift=UP * 0.1), run_time=0.4)
        ca, cb, r = P(-3.5, 0.05), P(-1.3, 0.05), 1.55
        cA = Circle(radius=r, stroke_color=C_VOL, stroke_width=5).move_to(ca)
        cB = Circle(radius=r, stroke_color=C_HOTEL, stroke_width=5).move_to(cb)
        rng = np.random.default_rng(8)

        def tirer(n, dedans, ecart=0.24):
            pts = []
            for _ in range(20000):
                p = P(*rng.uniform((-5.0, -1.45), (0.2, 1.55)))
                if dedans(p) and all(np.linalg.norm(p - q) > ecart for q in pts):
                    pts.append(p)
                if len(pts) == n:
                    break
            assert len(pts) == n
            return VGroup(*[Dot(p, radius=0.07) for p in pts])
        inA = lambda p: np.linalg.norm(p - ca) < r - 0.12  # noqa: E731
        inB = lambda p: np.linalg.norm(p - cb) < r - 0.12  # noqa: E731
        seulA = tirer(18, lambda p: inA(p) and not np.linalg.norm(p - cb) < r + 0.08).set_color(C_VOL)
        deux = tirer(12, lambda p: inA(p) and inB(p), 0.19).set_color(WHITE)
        seulB = tirer(8, lambda p: inB(p) and not np.linalg.norm(p - ca) < r + 0.08).set_color(C_HOTEL)
        clients = self.t("les clients de Clara", 28, GREY_A).move_to(P(-2.4, -1.85))
        self.au_mot("Clara compte")
        self.play(FadeIn(clients), run_time=0.3)
        la = self.t("vol : 30", 32, C_VOL).move_to(ca + P(-0.6, 1.9))
        lb = self.t("hôtel : 20", 32, C_HOTEL).move_to(cb + P(0.7, 1.9))
        self.au_mot("30 ont pris")
        self.play(Create(cA), FadeIn(la), LaggedStart(*[FadeIn(d) for d in seulA + deux], lag_ratio=0.02),
                  run_time=0.6)
        self.au_mot("20 ont pris")
        self.play(Create(cB), FadeIn(lb), LaggedStart(*[FadeIn(d) for d in seulB], lag_ratio=0.04), run_time=0.6)
        faux = VGroup(VGroup(self.t("30 + 20", 40, ROUGE_ERREUR, audit=False), self.t("= 50", 40, ROUGE_ERREUR))
                      .arrange(RIGHT, buff=0.2), self.t("?", 40, ROUGE_ERREUR)).arrange(RIGHT, buff=0.2)
        faux.move_to(P(3.6, 1.2))
        self.au_mot("50 clients")
        self.play(FadeIn(faux, shift=LEFT * 0.1), run_time=0.4)
        self.au_nb("Si ", "12")
        l12 = self.t("12", 34, ROUGE_ERREUR).move_to((ca + cb) / 2 + DOWN * 1.35)
        self.play(deux.animate.set_color(ROUGE_ERREUR).scale(1.15), FadeIn(l12, scale=1.4), run_time=0.45)
        self.au_mot("comptés deux fois")
        cd = self.t("comptés deux fois", 30, ROUGE_ERREUR).move_to(P(-2.4, -2.45))
        barre = Cross(faux[0], stroke_color=ROUGE_ERREUR, stroke_width=5)
        self.play(FadeIn(cd, shift=UP * 0.1), Create(barre), Indicate(deux, color=ROUGE_ERREUR), run_time=0.6)
        calc = VGroup(self.t("30", 42), self.t("+", 42), self.t("20", 42), self.t("−", 42, ROUGE_ERREUR),
                      self.t("12", 42, ROUGE_ERREUR)).arrange(RIGHT, buff=0.18).move_to(P(3.6, -0.2))
        v = self._texte_voix
        dep = v.find("Il y a")
        for k, n in ((0, "30"), (2, "20"), (4, "12")):
            j = v.find(n, dep)
            dep = j + 1
            self.au_pos(j)
            self.play(FadeIn(calc[k], shift=UP * 0.1), *([FadeIn(calc[k - 1])] if k else []), run_time=0.22)
        res = self.t("= 38 clients", 44, VERT_OK).next_to(calc, DOWN, buff=0.3)
        self.au_mot("38 clients")
        cad = SurroundingRectangle(res, color=VERT_OK, buff=0.12, stroke_width=3)
        self.play(FadeIn(res, scale=1.2), Create(cad), run_time=0.4)
        self.insister(VGroup(res, cad), 1.08)
        self.attendre_voix(marge=0.6)

    # ── 09 : question-pause n° 2 : (6 + 4) × 2 ─────────────────────────────

    def siege(self, c, s=1.0):
        dos = RoundedRectangle(width=0.32, height=0.55, corner_radius=0.08, fill_color=c, fill_opacity=1,
                               stroke_width=0).move_to(P(-0.18, 0.2))
        assise = RoundedRectangle(width=0.55, height=0.18, corner_radius=0.06, fill_color=c, fill_opacity=1,
                                  stroke_width=0).move_to(P(0.05, -0.12))
        return VGroup(dos, assise).scale(s)

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.dire("09-question")
        t0 = self.renderer.time
        tete, q, cartes, pause, rebours = self.q_tete(["Combien de façons", "de voyager ?"], ["48", "12", "20"])
        self.au_mot("Question")
        self.play(FadeIn(tete, shift=DOWN * 0.2), run_time=0.4)
        bA = RoundedRectangle(width=2.6, height=1.55, corner_radius=0.14, stroke_color=C_VOL, stroke_width=4)
        bB = RoundedRectangle(width=2.0, height=1.55, corner_radius=0.14, stroke_color=C_BUS, stroke_width=4)
        bA.move_to(P(-4.7, 1.9))
        bB.move_to(P(-0.8, 1.9))
        av = VGroup(*[avion(0.42) for _ in range(6)]).arrange_in_grid(2, 3, buff=(0.18, 0.3)).move_to(bA)
        bs = VGroup(*[bus(0.42) for _ in range(4)]).arrange_in_grid(2, 2, buff=(0.15, 0.35)).move_to(bB)
        la = self.t("6 vols", 30, C_VOL).next_to(bA, DOWN, buff=0.12)
        lb = self.t("4 bus", 30, C_BUS).next_to(bB, DOWN, buff=0.12)
        ou = self.t("ou", 40, OU).move_to(P(-2.75, 1.9))
        self.au_mot("Soit l'avion")
        self.play(Create(bA), FadeIn(av), run_time=0.4)
        self.au_mot("6 vols")
        self.play(FadeIn(la, shift=UP * 0.1), run_time=0.25)
        self.au_mot("soit le bus")
        self.play(FadeIn(ou, scale=1.4), Create(bB), FadeIn(bs), run_time=0.4)
        self.au_mot("4 bus")
        self.play(FadeIn(lb, shift=UP * 0.1), run_time=0.25)
        s1 = VGroup(self.siege(BLEU_CALCUL, 1.1), self.t("économique", 28)).arrange(DOWN, buff=0.1)
        s2 = VGroup(self.siege("#B45309", 1.3), self.t("confort", 28)).arrange(DOWN, buff=0.1)
        sieges = VGroup(s1, s2).arrange(RIGHT, buff=0.8).move_to(P(-1.6, -0.35))
        lc = self.t("2 classes :", 32, ET).next_to(sieges, LEFT, buff=0.45)
        self.au_mot("2 classes")
        self.play(FadeIn(lc, shift=RIGHT * 0.1), run_time=0.3)
        self.au_mot("économique")
        self.play(FadeIn(s1, scale=1.2), run_time=0.3)
        self.au_mot("confort")
        self.play(FadeIn(s2, scale=1.2), run_time=0.3)
        self.au_mot("Combien de façons")
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.35)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "09-question", t0, 2)
        self.dire("09b-reponse")
        self.q_reponse(cartes, 2, pause, rebours)
        v = self._texte_voix
        l1 = VGroup(self.t("6", 40), self.t("+", 40, OU), self.t("4", 40), self.t("=", 40),
                    self.t("10 trajets", 40, OU)).arrange(RIGHT, buff=0.18).move_to(P(-3.0, -1.6))
        self.au_mot("Avion ou bus")
        self.play(Indicate(ou, color=OU, scale_factor=1.4), run_time=0.4)
        self.au_pos(v.find("6 plus"))
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.2)
        self.au_nb("6 plus", "4")
        self.play(FadeIn(l1[1]), FadeIn(l1[2], shift=UP * 0.1), run_time=0.2)
        self.au_mot("10 trajets")
        self.play(FadeIn(l1[3:], shift=UP * 0.1), run_time=0.3)
        l2 = VGroup(self.t("10", 40), self.t("×", 40, ET), self.t("2", 40), self.t("=", 40, VERT_OK),
                    self.t("20", 46, VERT_OK)).arrange(RIGHT, buff=0.18).next_to(l1, DOWN, buff=0.3).align_to(l1, LEFT)
        self.au_mot("Et une classe")
        self.play(Indicate(sieges, color=ET, scale_factor=1.08), run_time=0.45)
        self.au_nb("10 fois", "10")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.2)
        self.au_nb("10 fois", "2")
        self.play(FadeIn(l2[1]), FadeIn(l2[2], shift=UP * 0.1), run_time=0.2)
        self.au_nb("2 :", "20")
        cad = SurroundingRectangle(l2[3:], color=VERT_OK, buff=0.12, stroke_width=3)
        self.play(FadeIn(l2[3:], scale=1.3), Create(cad), run_time=0.35)
        r1 = VGroup(self.t("« ou » :", 34, OU), self.t("+", 40, OU)).arrange(RIGHT, buff=0.15)
        r2 = VGroup(self.t("« et » :", 34, ET), self.t("×", 40, ET)).arrange(RIGHT, buff=0.15)
        VGroup(r1, r2).arrange(DOWN, buff=0.25, aligned_edge=LEFT).move_to(P(3.9, -2.45))
        self.au_mot("ou » additionne")
        self.play(FadeIn(r1, scale=1.2), run_time=0.3)
        self.au_mot("et » multiplie")
        self.play(FadeIn(r2, scale=1.2), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 10 : ce que Clara en fait ──────────────────────────────────────────

    def ecran_metier_fin(self):
        self.clear()
        margo = self.add_mascotte()
        self.dire("10-metier")
        clara = personne(ORANGE_RETENUE, PEAUX[3], "#111111", 0.85, longs=True).move_to(P(-5.55, 2.3))
        nom = self.t("Clara", 42, BLEU_CALCUL).move_to(P(0, 2.55)).align_to(P(-4.7, 0), LEFT)
        self.au_mot("Clara")
        self.play(FadeIn(clara, shift=UP * 0.2), FadeIn(nom, shift=RIGHT * 0.15), run_time=0.5)
        jour = self.t("chaque jour", 32, GREY_A).next_to(nom, RIGHT, buff=0.4)
        self.au_mot("chaque jour")
        self.play(FadeIn(jour), run_time=0.3)
        offre = VGroup(RoundedRectangle(width=1.1, height=1.4, corner_radius=0.08, fill_color="#F8FAFC",
                                        fill_opacity=1, stroke_width=0), avion(0.4, C_VOL).shift(UP * 0.3),
                       hotel(0.3).shift(DOWN * 0.15 + LEFT * 0.2), tram(0.3).shift(DOWN * 0.2 + RIGHT * 0.25))
        cat = VGroup(*[RoundedRectangle(width=1.0, height=1.3, corner_radius=0.06, fill_color=c, fill_opacity=1,
                                        stroke_color=WHITE, stroke_width=1).shift(P(0.12 * k, 0.1 * k))
                       for k, c in enumerate((C_HOTEL, C_EXC, C_VOL, C_BUS))])
        cli = VGroup(personne(GREY_B, PEAUX[0], s=0.5), self.t("× 2", 32, ROUGE_ERREUR))
        cli.arrange(RIGHT, buff=0.15)
        cli.add(Line(cli[1].get_corner(DL), cli[1].get_corner(UR), color=ROUGE_ERREUR, stroke_width=5))
        items = [(offre, "bâtir ses offres", "bâtir ses offres", ET),
                 (cat, "son catalogue", "un catalogue assez varié", VERT_OK),
                 (cli, "ne pas compter deux fois", "ne pas compter deux fois le même client", ROUGE_ERREUR)]
        for k, (ic, mot, tx, c) in enumerate(items):
            y = 1.05 - 1.45 * k
            ic.move_to(P(-4.6, y))
            lab = self.t(tx, 36, c, larg=8.4).move_to(P(0, y)).align_to(P(-3.3, 0), LEFT)
            self.au_mot(mot)
            self.play(FadeIn(ic, scale=1.2), FadeIn(lab, shift=RIGHT * 0.15), run_time=0.45)
        self.bring_to_front(margo)
        self.attendre_voix(marge=0.6)

    # ── 11 : ce que tu as appris ───────────────────────────────────────────

    def ecran_appris(self):
        self.appris("11-appris", [
            [("des étapes successives", "« et », des étapes successives :", ET), ("on multiplie", "on multiplie.", VERT_OK)],
            [("Le cardinal", "card(A × B)", ET), ("est le produit", "= card A × card B", VERT_OK)],
            [("des cas disjoints", "« ou », des cas disjoints :", OU), ("on additionne", "on additionne.", VERT_OK)],
            [("un arbre", "Un arbre montre tout.", JAUNE_TITRE)],
        ])

    def construct(self):
        self.ecran_accroche()
        self.ecran_titre()
        self.ecran_metier()
        self.ecran_arbre()
        self.ecran_produit()
        self.ecran_question1()
        self.ecran_somme()
        self.ecran_additif()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_metier_fin()
        self.ecran_appris()
        self.page_abonnement()
