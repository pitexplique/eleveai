# proba_au_moins_un.py
# EleveAI — Maths STMG ET Maths 1re (tronc commun) — série « Probabilités » :
# « AU MOINS UN » : l'astuce de l'événement contraire (micros : vaT_bin_reunion
# en STMG, alea_bern_au_moins_un en 1re), AVEC VOIX.
# Paysage 16:9, CEINTURE BLEUE. Short jumeau : proba_au_moins_un_short.py
# (ceinture jaune, dix parties d'un jeu, 10 × 10 % = 100 % barré).
#
# ⭐⭐ UNE voix, UN script, DEUX rendus (18/10, « pour vendre en pack ») :
# ProbaAuMoinsUnBase porte toutes les scènes ; les deux sous-classes ne
# changent que l'identité de la page de garde. La voix ne cite aucune classe.
#
# ⭐ La figure est l'ARBRE du coach (`canvasRepetition` de la banque 1re :
# « Répétition de 3 épreuves », arbre_proba à 3 niveaux), sur la carte blanche
# du coach (branches grises, probabilités en bleu, chemin allumé en orange).
# Les nœuds portent des MOTS : gagné / perdu. ⛔ PAS D'ÉCART : aucun nombre
# n'est posé sur les branches avant d'être dit ; seuls les trois 0,9 du chemin
# perdu-perdu-perdu s'écrivent, quand la voix les dit.
#
# Écrans : 00 garde · 01 trois tickets à gratter (0,1 ; « au moins un ») ·
# 02 les 7 chemins avec au moins un gagné s'allument (« trop long ! ») ·
# 03 ils s'éteignent, le SEUL chemin perdu-perdu-perdu s'allume · 04 0,9 × 0,9
# × 0,9 = 0,729 puis 1 − 0,729 = 0,271 · 05 le piège 0,1 + 0,1 + 0,1 = 0,3
# barré · 06 défi (quatre tickets) · 06b correction (0,9⁴ = 0,6561 ;
# 1 − 0,6561 = 0,3439) · 07 ce que tu as appris · 08 fin (« Entraîne-toi sur
# eleveai.fr », « Abonne-toi ! @eleveai974 »).
#
# Voix : manim/voix/stmg-premiere-proba-au-moins-un.json (débit −7).
# Rendus (depuis la racine du dépôt ; media à soi, sinon WinError 32) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_au_moins_un.py ProbaAuMoinsUnSTMG -o eleveai-maths-stmg-proba-au-moins-un --media_dir manim/scripts/stmg/media-au_moins_un
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_au_moins_un.py ProbaAuMoinsUnPremiere -o eleveai-maths-premiere-commun-proba-au-moins-un --media_dir manim/scripts/stmg/media-au_moins_un
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_au_moins_un_short.py ShortProbaAuMoinsUnSTMG -o eleveai-maths-stmg-proba-au-moins-un-short --media_dir manim/scripts/stmg/media-au_moins_un
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_au_moins_un_short.py ShortProbaAuMoinsUnPremiere -o eleveai-maths-premiere-commun-proba-au-moins-un-short --media_dir manim/scripts/stmg/media-au_moins_un
# (le short n'affiche aucune classe : un seul rendu suffit, copié sous les deux noms)
# Puis copier dans manim/sorties/stmg/maths/probabilites/22-au-moins-un/ et
# manim/sorties/premiere-commun/maths/probabilites/22-au-moins-un/.

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
from proba_pc_conditionnelle import BORD, BRANCHE, CHEMIN, ENCRE, PROBA, pastille, suite  # noqa: E402

OR = "#FBBF24"          # le ticket à gratter
OR_FONCE = "#B45309"
ARGENT = "#CBD5E1"      # la zone à gratter
G_COUL = "#15803D"      # « gagné » sur la carte blanche
P_COUL = "#B91C1C"      # « perdu » sur la carte blanche
SEUL = "#2563EB"        # le seul chemin perdu-perdu-perdu (bleu)


def P(x, y):
    return np.array([x, y, 0.0])


# ── les dessins ─────────────────────────────────────────────────────────────

def ticket(s=1.0, mot=None):
    """Un ticket à gratter : carte dorée, étoile, zone argentée avec « ? »
    (ou un mot, « perdu » / « gagné », une fois gratté)."""
    corps = RoundedRectangle(width=1.7, height=1.05, corner_radius=0.12, fill_color=OR, fill_opacity=1,
                             stroke_color=WHITE, stroke_width=2)
    bord = RoundedRectangle(width=1.5, height=0.85, corner_radius=0.08, stroke_color=OR_FONCE, stroke_width=2)
    etoile = Star(n=5, outer_radius=0.15, inner_radius=0.065, fill_color=OR_FONCE, fill_opacity=1, stroke_width=0)
    etoile.move_to(P(-0.5, 0.18))
    lignes = VGroup(*[Line(P(-0.25, 0.25 - 0.1 * k), P(0.55, 0.25 - 0.1 * k), color=OR_FONCE, stroke_width=2)
                      for k in range(2)])
    zone = RoundedRectangle(width=1.2, height=0.36, corner_radius=0.06, fill_color=ARGENT, fill_opacity=1,
                            stroke_width=0).move_to(P(0, -0.2))
    if mot is None:
        dedans = Text("?", font_size=26, color="#475569", weight=BOLD)
    else:
        dedans = Text(mot, font_size=22, color=P_COUL if mot == "perdu" else G_COUL, weight=BOLD)
    dedans.move_to(zone)
    return VGroup(corps, bord, etoile, lignes, zone, dedans).scale(s)


def puissance(base, exposant, fs=52, color=WHITE):
    """0,9⁴ en Text : l'exposant, plus petit, posé en haut à droite."""
    b = Text(base, font_size=fs, color=color)
    e = Text(exposant, font_size=int(fs * 0.6), color=color)
    e.next_to(b, RIGHT, buff=0.05).align_to(b, UP).shift(UP * 0.14 * fs / 52)
    return VGroup(b, e)


def mot_noeud(gagne, fs=20):
    t = Text("gagné" if gagne else "perdu", font_size=fs, color=G_COUL if gagne else P_COUL, weight=BOLD)
    return t


# ── l'ARBRE à 3 niveaux (canvasRepetition du coach) ─────────────────────────

class Arbre3(VGroup):
    """Carte blanche : départ, puis 3 niveaux gagné / perdu.
    Un nœud = un préfixe (tuple de booléens, True = gagné) ; la branche d'un
    préfixe va de son parent à lui. Feuilles : 8 chemins, de haut en bas
    GGG, GGP, GPG, GPP, PGG, PGP, PPG, PPP."""

    def __init__(self, dx=1.75, pas=0.6, fs=20, **kw):
        super().__init__(**kw)
        self.pos = {(): P(0, 0)}
        feuilles = [(a, b, c) for a in (True, False) for b in (True, False) for c in (True, False)]
        for k, f in enumerate(feuilles):
            self.pos[f] = P(3 * dx, (3.5 - k) * pas)
        for n in (2, 1):
            for f in feuilles:
                pre = f[:n]
                fils = [self.pos[pre + (True,)], self.pos[pre + (False,)]]
                self.pos[pre] = P(n * dx, (fils[0][1] + fils[1][1]) / 2)
        self.lab = {}
        for pre, pt in self.pos.items():
            if not pre:
                continue
            m = mot_noeud(pre[-1], fs)
            if len(pre) < 3:
                m.move_to(pt)
            else:
                m.next_to(pt, RIGHT, buff=0.1)
            self.lab[pre] = m
        hw = max(m.width for m in self.lab.values()) / 2 + 0.06
        self.branches = {}
        for pre in self.lab:
            u = self.pos[pre[:-1]] + (RIGHT * hw if pre[:-1] else ORIGIN)
            v = self.pos[pre] - (RIGHT * hw if len(pre) < 3 else ORIGIN)
            self.branches[pre] = Line(u, v, color=BRANCHE, stroke_width=4)
        self.depart = Dot(P(0, 0), radius=0.07, color=ENCRE)
        tout = VGroup(self.depart, *self.branches.values(), *self.lab.values())
        self.carte = RoundedRectangle(width=tout.width + 0.9, height=tout.height + 1.0, corner_radius=0.2,
                                      fill_color=WHITE, fill_opacity=1, stroke_color=BORD, stroke_width=2)
        self.carte.move_to(tout).shift(UP * 0.25)
        self.titre = Text("Répétition de 3 épreuves", font_size=20, color=ENCRE, weight=BOLD)
        self.titre.next_to(self.carte.get_top(), DOWN, buff=0.12)
        self.nombres = {}
        self.add(self.carte, self.titre, *self.branches.values(), self.depart, *self.lab.values())

    def socle(self):
        return VGroup(self.carte, self.titre, self.depart)

    @staticmethod
    def chemin(f):
        """Les trois branches du chemin f (feuille)."""
        return [f[:1], f[:2], f[:3]]

    def nombre(self, pre, texte, fs=20):
        """Le nombre d'une branche, en bleu : au-dessus si elle monte, dessous si elle descend."""
        t = Text(texte, font_size=fs, color=PROBA, weight=BOLD)
        br = self.branches[pre]
        u, v = br.get_start(), br.get_end()
        haut = v[1] >= u[1]
        d = v - u
        n = np.array([-d[1], d[0], 0.0])
        n = n / np.linalg.norm(n)
        if (n[1] < 0) == haut:
            n = -n
        demi = abs(n[0]) * t.width / 2 + abs(n[1]) * t.height / 2
        t.move_to((u + v) / 2 + n * (demi + 0.06))
        self.nombres[pre] = t
        return t

    def etat(self, allumes=(), couleur=CHEMIN, op=0.18, rien=False):
        """Allume les branches `allumes` ; estompe les autres (sauf rien=True : tout normal)."""
        anims = []
        allumes = set(allumes)
        for pre, br in self.branches.items():
            if rien:
                anims.append(br.animate.set_stroke(BRANCHE, 4, opacity=1))
            elif pre in allumes:
                anims.append(br.animate.set_stroke(couleur, 9, opacity=1))
            else:
                anims.append(br.animate.set_stroke(BRANCHE, 4, opacity=op))
        for pre, m in self.lab.items():
            on = rien or pre in allumes
            anims.append(m.animate.set_opacity(1 if on else op + 0.12))
        for pre, m in self.nombres.items():
            on = rien or pre in allumes
            anims.append(m.animate.set_opacity(1 if on else op))
        return anims


FEUILLES = [(a, b, c) for a in (True, False) for b in (True, False) for c in (True, False)]
PPP = (False, False, False)
SEPT = [f for f in FEUILLES if f != PPP]


class ProbaAuMoinsUnBase(Notion6e):
    """Toutes les scènes ; les sous-classes ne changent que l'identité."""

    nom_voix = "stmg-premiere-proba-au-moins-un"
    identite = "Maths — EleveAI"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.3):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def caser(self, mob, larg=5.6):
        if mob.width > larg:
            mob.scale_to_fit_width(larg)
        return mob

    def arbre(self, centre=P(-3.75, -0.4), echelle=0.86):
        a = Arbre3().scale(echelle)
        a.shift(centre - a.carte.get_center())
        return a

    def ligne(self, morceaux, fs=50, buff=0.2):
        return suite(*[m if isinstance(m, Mobject) else self.t(m[0], fs, m[1]) for m in morceaux], buff=buff)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("« Au moins un »", 56, JAUNE_TITRE).to_edge(UP, buff=0.55)
        sous = self.t("l'astuce de l'événement contraire", 40, BLEU_CALCUL).next_to(titre, DOWN, buff=0.2)
        identite = self.t(self.identite, 28).next_to(sous, DOWN, buff=0.22)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.75))
        tk = VGroup(*[ticket(0.95) for _ in range(3)]).arrange(RIGHT, buff=0.45).move_to(P(-0.6, -0.55))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech),
                  LaggedStart(*[FadeIn(x, shift=UP * 0.3) for x in tk], lag_ratio=0.2), run_time=1.1)
        self.au_mot("l'astuce")
        self.play(FadeIn(sous, shift=UP * 0.15), run_time=0.6)
        self.play(*[Wiggle(x[5], scale_value=1.4) for x in tk], run_time=0.7)
        self.attendre_voix(marge=1.0)

    # ── 01 : trois tickets à gratter ────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Trois tickets à gratter")
        t1 = ticket(1.5).move_to(P(-4.3, 1.2))
        self.au_mot("Un ticket")
        self.play(FadeIn(t1, shift=UP * 0.4, scale=0.8), run_time=0.6)
        self.au_mot("0,1")
        l1 = suite(self.t("gagne avec une probabilité de", 34), self.t("0,1", 50, JAUNE_TITRE), buff=0.25)
        l1.move_to(P(1.3, 1.2))
        self.play(FadeIn(l1[0], shift=LEFT * 0.15), run_time=0.4)
        self.play(FadeIn(l1[1], scale=1.8), run_time=0.4)
        self.insister(l1[1])
        self.au_mot("On en achète trois")
        t2 = ticket(1.5).move_to(P(-1.6, -0.75))
        t3 = ticket(1.5).move_to(P(1.1, -0.75))
        trois = VGroup(t1.copy(), t2, t3)
        self.play(t1.animate.move_to(P(-4.3, -0.75)), FadeIn(t2, shift=LEFT * 1.0), FadeIn(t3, shift=LEFT * 1.6),
                  l1.animate.move_to(P(-0.4, 1.35)), run_time=0.8)
        self.au_mot("indépendants")
        ind = self.t("trois tickets indépendants", 32, BLEU_CALCUL).move_to(P(-1.6, 0.45))
        self.play(FadeIn(ind, shift=UP * 0.1), run_time=0.5)
        self.au_mot("au moins un")
        q = suite(self.t("au moins un", 46, JAUNE_TITRE), self.t("ticket gagnant ?", 46), buff=0.22)
        q.move_to(P(-1.6, -2.3))
        self.play(FadeIn(q, shift=UP * 0.2), *[Wiggle(x[5], scale_value=1.5) for x in (t1, t2, t3)], run_time=0.8)
        self.insister(q[0], 0.35)
        self.attendre_voix()

    # ── 02 : 7 chemins, trop long ───────────────────────────────────────────

    def ecran_long(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-long")
        self.titre_ecran("Compter les chemins ?")
        a = self.arbre()
        self.play(FadeIn(a), run_time=0.6)
        self.au_mot("c'est un, deux ou trois")
        l1 = self.t("1, 2 ou 3 gagnants", 40, JAUNE_TITRE).move_to(P(3.2, 1.6))
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.5)
        self.au_mot("7 chemins")
        cadres = []
        allumes = set()
        for f in SEPT:
            allumes |= set(Arbre3.chemin(f))
            c = SurroundingRectangle(a.lab[f], color=CHEMIN, buff=0.05, stroke_width=4)
            cadres.append(c)
            self.play(*a.etat(allumes), Create(c), run_time=0.22)
        sept = self.t("7 chemins !", 60, CHEMIN).move_to(P(3.2, 0.2))
        self.play(FadeIn(sept, scale=1.8), run_time=0.4)
        self.insister(sept)
        self.au_mot("Trop long")
        tl = self.t("Trop long !", 54, ROUGE_ERREUR).rotate(0.1).move_to(P(3.2, -1.3))
        self.play(FadeIn(tl, scale=2.0), run_time=0.4)
        self.play(Wiggle(tl), run_time=0.6)
        self.attendre_voix()

    # ── 03 : le contraire : aucun gagnant, un seul chemin ───────────────────

    def ecran_contraire(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-contraire")
        self.titre_ecran("L'astuce : le contraire")
        a = self.arbre()
        tous = set()
        for f in SEPT:
            tous |= set(Arbre3.chemin(f))
        self.add(a)
        self.play(*a.etat(tous), run_time=0.4)
        self.au_mot("le contraire de")
        h = self.t("au moins un gagnant", 38, CHEMIN).move_to(P(3.2, 1.7))
        fl = Arrow(P(3.2, 1.35), P(3.2, 0.35), color=WHITE, buff=0.05, stroke_width=5)
        ctr = self.t("contraire", 28, WHITE).next_to(fl, RIGHT, buff=0.15)
        b = self.t("aucun gagnant", 44, SEUL).move_to(P(3.2, 0.0))
        b.set_color("#60A5FA")
        self.play(FadeIn(h, shift=UP * 0.1), run_time=0.5)
        self.au_mot("c'est « aucun gagnant »")
        self.play(*a.etat(rien=True), GrowArrow(fl), FadeIn(ctr), run_time=0.6)
        self.play(FadeIn(b, scale=1.5), run_time=0.4)
        self.insister(b)
        self.au_mot("Un seul chemin")
        u = self.t("Un seul chemin", 42, JAUNE_TITRE).move_to(P(3.2, -1.2))
        self.play(FadeIn(u, shift=UP * 0.15), *a.etat([]), run_time=0.6)
        ch = Arbre3.chemin(PPP)
        for k, mot in enumerate(["perdu, perdu, perdu", "perdu, perdu.", "perdu."]):
            self.au_mot(mot)
            self.play(*a.etat(ch[:k + 1], couleur=SEUL), run_time=0.35)
            self.play(Indicate(a.lab[ch[k]], color=SEUL, scale_factor=1.5), run_time=0.3)
        cad = SurroundingRectangle(a.lab[PPP], color=SEUL, buff=0.05, stroke_width=4)
        self.play(Create(cad), run_time=0.3)
        self.attendre_voix()

    # ── 04 : 0,9 × 0,9 × 0,9 = 0,729 ; 1 − 0,729 = 0,271 ───────────────────

    def ecran_calcul(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-calcul")
        self.titre_ecran("Un seul calcul")
        a = self.arbre()
        ch = Arbre3.chemin(PPP)
        self.add(a)
        self.play(*a.etat(ch, couleur=SEUL), run_time=0.4)
        x0 = 3.2
        e1 = self.t("Aucun gagnant :", 34, "#60A5FA").move_to(P(x0, 1.95))
        self.play(FadeIn(e1, shift=UP * 0.1), run_time=0.4)
        k = [self.t(x, 50, c) for x, c in (("0,9", "#60A5FA"), ("×", WHITE), ("0,9", "#60A5FA"), ("×", WHITE),
                                            ("0,9", "#60A5FA"), ("=", WHITE), ("0,729", JAUNE_TITRE))]
        l1 = self.caser(suite(*k, buff=0.16), 5.6).move_to(P(x0, 1.15))
        for j, mot in enumerate(["0,9 fois 0,9 fois", "fois 0,9 fois", "fois 0,9, égale"]):
            self.au_mot(mot)
            n = a.nombre(ch[j], "0,9")
            self.play(FadeIn(n, scale=1.8), run_time=0.3)
            anims = [TransformFromCopy(n, k[2 * j])]
            if j:
                anims.append(FadeIn(k[2 * j - 1], scale=1.6))
            self.play(*anims, run_time=0.45)
        self.au_mot("égale 0,729")
        self.play(FadeIn(k[5]), FadeIn(k[6], scale=1.8), run_time=0.45)
        self.insister(k[6])
        bout = pastille("0,729", 18).next_to(a.lab[PPP], RIGHT, buff=0.12)
        self.play(TransformFromCopy(k[6], bout), run_time=0.6)
        self.au_mot("Donc au moins un")
        e2 = self.t("Au moins un :", 34, CHEMIN).move_to(P(x0, 0.05))
        self.play(FadeIn(e2, shift=UP * 0.1), run_time=0.4)
        m = [self.t(x, 56, c) for x, c in (("1", WHITE), ("−", WHITE), ("0,729", JAUNE_TITRE), ("=", WHITE),
                                            ("0,271", VERT_OK))]
        l2 = self.caser(suite(*m, buff=0.2), 5.6).move_to(P(x0, -0.8))
        self.au_mot("1 moins 0,729")
        self.play(FadeIn(m[0], scale=1.6), FadeIn(m[1]), run_time=0.4)
        self.play(TransformFromCopy(k[6], m[2]), run_time=0.5)
        self.au_mot("égale 0,271")
        self.play(FadeIn(m[3]), FadeIn(m[4], scale=1.8), run_time=0.45)
        cad = SurroundingRectangle(l2, color=VERT_OK, buff=0.18, stroke_width=4)
        self.play(Create(cad), run_time=0.4)
        self.insister(VGroup(l2, cad))
        self.attendre_voix()

    # ── 05 : le piège : 0,1 + 0,1 + 0,1 = 0,3 ───────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège : additionner")
        a = self.arbre()
        self.add(a)
        x0 = 3.2
        k = [self.t(x, 50, c) for x, c in (("0,1", "#60A5FA"), ("+", WHITE), ("0,1", "#60A5FA"), ("+", WHITE),
                                            ("0,1", "#60A5FA"), ("=", WHITE), ("0,3", ORANGE_RETENUE))]
        l1 = self.caser(suite(*k, buff=0.18), 5.6).move_to(P(x0, 1.7))
        self.au_mot("additionner 0,1")
        self.play(FadeIn(k[0], scale=1.6), run_time=0.3)
        self.au_mot("trois fois")
        self.play(LaggedStart(*[FadeIn(x, scale=1.6) for x in k[1:5]], lag_ratio=0.3), run_time=0.7)
        self.au_mot("fois, 0,3")
        self.play(FadeIn(k[5]), FadeIn(k[6], scale=1.8), run_time=0.4)
        self.au_mot("Faux")
        barre = Line(l1.get_corner(DL) + P(-0.15, -0.05), l1.get_corner(UR) + P(0.15, 0.05), color=ROUGE_ERREUR,
                     stroke_width=8)
        faux = self.t("FAUX !", 54, ROUGE_ERREUR).rotate(0.12).move_to(P(x0, 0.6))
        self.play(Create(barre), l1.animate.set_opacity(0.55), run_time=0.4)
        self.play(FadeIn(faux, scale=2.0), run_time=0.35)
        self.insister(faux, 0.25)
        self.au_mot("compte en double")
        plus = [f for f in FEUILLES if sum(f) >= 2]
        cadres = VGroup(*[SurroundingRectangle(a.lab[f], color=ROUGE_ERREUR, buff=0.05, stroke_width=4) for f in plus])
        dbl = VGroup(self.t("compte en double", 36, ROUGE_ERREUR),
                     self.t("plusieurs tickets gagnent", 30, WHITE)).arrange(DOWN, buff=0.12).move_to(P(x0, -0.55))
        self.play(FadeIn(dbl[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("plusieurs tickets")
        self.play(Create(cadres), FadeIn(dbl[1], shift=UP * 0.1),
                  *[Indicate(a.lab[f], color=ROUGE_ERREUR, scale_factor=1.4) for f in plus], run_time=0.8)
        self.au_mot("Le bon résultat")
        bon = suite(self.t("Le bon résultat :", 36), self.t("0,271", 54, VERT_OK), buff=0.22).move_to(P(x0, -1.85))
        ok = self.coche(taille=0.3).next_to(bon, RIGHT, buff=0.25)
        if ok.get_right()[0] > 6.8:
            VGroup(bon, ok).shift(LEFT * (ok.get_right()[0] - 6.8))
        self.play(FadeIn(bon[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("est 0,271")
        self.play(FadeIn(bon[1], scale=1.8), run_time=0.4)
        self.play(Create(ok), run_time=0.4)
        self.attendre_voix()

    # ── 06 : défi : quatre tickets ──────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("quatre tickets")
        tk = VGroup(*[ticket(1.25) for _ in range(4)]).arrange(RIGHT, buff=0.4).move_to(P(-0.6, 1.4))
        quatre = self.t("4 tickets", 44, JAUNE_TITRE).move_to(P(-0.6, 0.1))
        self.play(LaggedStart(*[FadeIn(x, shift=DOWN * 0.4) for x in tk], lag_ratio=0.2), FadeIn(quatre), run_time=0.9)
        self.au_mot("au moins un gagnant")
        q = suite(self.t("Probabilité d'avoir", 40), self.t("au moins un", 40, CHEMIN), self.t("gagnant ?", 40),
                  buff=0.2)
        self.caser(q, 11.0).move_to(P(-0.6, -1.0))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.6)
        self.insister(q[1])
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction")
        tk = VGroup(*[ticket(1.0, "perdu") for _ in range(4)]).arrange(RIGHT, buff=0.35).move_to(P(-0.6, 1.85))
        x0 = -0.6
        self.au_mot("Aucun gagnant")
        self.play(LaggedStart(*[FadeIn(x, scale=0.7) for x in tk], lag_ratio=0.15), run_time=0.7)
        e1 = self.t("Aucun gagnant :", 36, "#60A5FA")
        pw = puissance("0,9", "4", 60, "#60A5FA")
        eg = self.t("=", 60)
        r1 = self.t("0,6561", 60, JAUNE_TITRE)
        l1 = suite(e1, pw, eg, r1, buff=0.3).move_to(P(x0, 0.35))
        for m in (eg, r1):
            m.match_y(pw[0])
        e1.match_y(pw[0])
        self.play(FadeIn(e1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("0,9 puissance 4")
        self.play(FadeIn(pw[0], scale=1.5), run_time=0.4)
        self.au_mot("puissance 4")
        self.play(FadeIn(pw[1], scale=2.0), run_time=0.4)
        self.insister(pw[1], 0.25)
        self.au_mot("égale 0,6561")
        self.play(FadeIn(eg), FadeIn(r1, scale=1.8), run_time=0.45)
        self.au_mot("Au moins un")
        e2 = self.t("Au moins un :", 36, CHEMIN)
        m = [self.t(x, 60, c) for x, c in (("1", WHITE), ("−", WHITE), ("0,6561", JAUNE_TITRE), ("=", WHITE),
                                            ("0,3439", VERT_OK))]
        l2 = suite(e2, *m, buff=0.25).move_to(P(x0, -1.1))
        e2.match_y(m[0])
        self.play(FadeIn(e2, shift=UP * 0.1), run_time=0.4)
        self.au_mot("1 moins 0,6561")
        self.play(FadeIn(m[0], scale=1.6), FadeIn(m[1]), run_time=0.4)
        self.play(TransformFromCopy(r1, m[2]), run_time=0.5)
        self.au_mot("égale 0,3439")
        self.play(FadeIn(m[3]), FadeIn(m[4], scale=1.8), run_time=0.45)
        cad = SurroundingRectangle(VGroup(*m), color=VERT_OK, buff=0.16, stroke_width=4)
        ok = self.coche(taille=0.35).next_to(cad, DOWN, buff=0.35)
        self.play(Create(cad), run_time=0.4)
        self.play(Create(ok), run_time=0.4)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 38
        l1a = suite(self.t("« Au moins un » :", fs, CHEMIN), self.t("on calcule le contraire,", fs), buff=0.15)
        l1b = suite(self.t("« aucun »", fs, "#60A5FA"), self.t(": un seul chemin", fs), buff=0.15)
        l1 = VGroup(l1a, l1b).arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        l2 = suite(self.t("Puis on fait", fs), self.t("1 − ce nombre", fs, VERT_OK), buff=0.15)
        l3 = VGroup(self.t("On n'additionne jamais", fs, ROUGE_ERREUR),
                    self.t("les probabilités de chaque tirage", fs)).arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6)
        if lignes.width > 11.0:
            lignes.scale_to_fit_width(11.0)
        lignes.move_to(P(-0.7, -0.1))
        for mot, l in zip(["Pour « au moins un »", "Puis on fait", "Et on n'additionne"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.attendre_voix(marge=1.0)

    # ── 08 : la fin (règle du 19/10) ────────────────────────────────────────

    def page_abonnement(self, voix="08-abonne"):
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
        self.ecran_long()
        self.ecran_contraire()
        self.ecran_calcul()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")


class ProbaAuMoinsUnSTMG(ProbaAuMoinsUnBase):
    identite = "Maths STMG — EleveAI"


class ProbaAuMoinsUnPremiere(ProbaAuMoinsUnBase):
    identite = "Maths 1re — EleveAI"
