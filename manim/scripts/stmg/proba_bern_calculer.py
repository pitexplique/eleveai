# proba_bern_calculer.py
# EleveAI — Maths STMG ET Maths 1re (tronc commun) — série « Probabilités » :
# CALCULER UNE PROBABILITÉ SUR UNE RÉPÉTITION d'épreuves (micros :
# probaI_produit en STMG, alea_bern_calculer en 1re), AVEC VOIX.
# Paysage 16:9, CEINTURE BLEUE. Short jumeau : proba_bern_calculer_short.py
# (ceinture jaune, le tireur de penalty, trois tirs).
#
# ⭐⭐ UNE voix, UN script, DEUX rendus (Frédéric, 18/10 : « pour vendre en
# pack ») : ProbaBernCalculerBase porte toutes les scènes ; les deux
# sous-classes ne changent que l'identité. La voix ne cite aucune classe.
#
# ⭐ La figure est l'ARBRE PONDÉRÉ du coach (`canvasRepetition` de la banque
# 1re, `canvasArbre` de la banque STMG : carte blanche, branches grises,
# probabilités en bleu, chemin allumé en orange), ici à TROIS niveaux
# (G / G barre). ⛔ PAS D'ÉCART : 0,2 n'est écrit sur les branches G barre
# qu'au moment où la voix le dit (écran 03).
#
# Écrans : 00 garde · 01 trois graines (0,8 chacune, indépendamment) · 02 le
# chemin G G G : 0,8 × 0,8 × 0,8 = 0,512 au bout · 03 exactement deux : les
# trois chemins, chacun 0,128 en pastille · 04 3 × 0,128 = 0,384 · 05 le
# piège : une seule pastille 0,128 barrée, « trois ordres » · 06 défi (aucune
# ne germe) · 06b correction (G barre ×3 : 0,2 × 0,2 × 0,2 = 0,008) · 07 ce
# que tu as appris · 08 fin (« Entraîne-toi sur eleveai.fr », « Abonne-toi !
# @eleveai974 »).
#
# Voix : manim/voix/stmg-premiere-proba-bern-calculer.json (Julie, débit −7).
# Rendus (depuis la racine ; media à soi : des rendus parallèles dans le même
# media → WinError 32) :
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_bern_calculer.py ProbaBernCalculerSTMG -o eleveai-maths-stmg-proba-bern-calculer --media_dir manim/scripts/stmg/media-bern_calculer
# python -m manim render -qh --disable_caching manim/scripts/stmg/proba_bern_calculer.py ProbaBernCalculerPremiere -o eleveai-maths-premiere-commun-proba-bern-calculer --media_dir manim/scripts/stmg/media-bern_calculer
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_bern_calculer_short.py ShortProbaBernCalculerSTMG -o eleveai-maths-stmg-proba-bern-calculer-short --media_dir manim/scripts/stmg/media-bern_calculer
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_bern_calculer_short.py ShortProbaBernCalculerPremiere -o eleveai-maths-premiere-commun-proba-bern-calculer-short --media_dir manim/scripts/stmg/media-bern_calculer
# (le short n'affiche aucune classe : un seul rendu suffit, copié sous les deux noms)
# Puis copier dans manim/sorties/stmg/maths/probabilites/21-bern-calculer/ et
# manim/sorties/premiere-commun/maths/probabilites/21-bern-calculer/.

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
    BORD, BRANCHE, CHEMIN, ENCRE, PROBA, lettre, pastille, suite,
)

TERRE = "#92400E"     # le pot
SOL = "#451A03"       # la terre
POUSSE = "#22C55E"    # la pousse
BLEU_NB = "#60A5FA"   # les nombres recopiés dans les calculs


def P(x, y):
    return np.array([x, y, 0.0])


# ── les dessins : le pot, la graine, la pousse ──────────────────────────────

def pot(s=1.0):
    """Un pot de fleurs : le pot, son rebord, la terre, une graine."""
    corps = Polygon(P(-0.5, 0.35), P(0.5, 0.35), P(0.36, -0.5), P(-0.36, -0.5), fill_color=TERRE, fill_opacity=1,
                    stroke_color=WHITE, stroke_width=1.5)
    rebord = Rectangle(width=1.16, height=0.2, fill_color=TERRE, fill_opacity=1, stroke_color=WHITE,
                       stroke_width=1.5).move_to(P(0, 0.42))
    terre = Ellipse(width=0.98, height=0.16, fill_color=SOL, fill_opacity=1, stroke_width=0).move_to(P(0, 0.5))
    graine = Ellipse(width=0.16, height=0.1, fill_color="#FDE68A", fill_opacity=1, stroke_width=0).move_to(P(0, 0.52))
    return VGroup(corps, rebord, terre, graine).scale(s)


def pousse(s=1.0):
    """Une jeune pousse : une tige et deux feuilles (base en (0, 0))."""
    tige = Line(P(0, 0), P(0, 0.6), color=POUSSE, stroke_width=6)
    f1 = Ellipse(width=0.36, height=0.16, fill_color=POUSSE, fill_opacity=1, stroke_width=0)
    f1.rotate(0.45).move_to(P(-0.17, 0.5))
    f2 = Ellipse(width=0.36, height=0.16, fill_color=POUSSE, fill_opacity=1, stroke_width=0)
    f2.rotate(-0.45).move_to(P(0.17, 0.62))
    return VGroup(tige, f1, f2).scale(s, about_point=ORIGIN)


def mot_chemin(cle, fs=34):
    """« G G G̅ » : le chemin écrit en lettres (g = G, n = G barre)."""
    return suite(*[lettre("G", fs, BLEU_CALCUL if c == "g" else ORANGE_RETENUE, c == "n") for c in cle], buff=0.2)


def carte_lettre(phrase, fs=28):
    g = suite(lettre("G", fs + 6, BLEU_CALCUL), Text(":", font_size=fs), Text(phrase, font_size=fs), buff=0.14)
    fond = RoundedRectangle(width=g.width + 0.45, height=g.height + 0.35, corner_radius=0.15, fill_color="#0F172A",
                            fill_opacity=0.9, stroke_color=BLEU_CALCUL, stroke_width=3)
    return VGroup(fond, g.move_to(fond))


# ── l'ARBRE PONDÉRÉ du coach, à trois niveaux ───────────────────────────────

FEUILLES = ["ggg", "ggn", "gng", "gnn", "ngg", "ngn", "nng", "nnn"]


class ArbreBern(VGroup):
    """Carte blanche du coach : trois épreuves, G (germe) / G barre.
    Les nœuds sont nommés par leur chemin : "g", "gn", "ngg"…
    branches[c] : la branche qui ARRIVE au nœud c ; lab[c] : sa lettre."""

    def __init__(self, dx=2.0, pas=0.72, fs=30, r=0.24, **kw):
        super().__init__(**kw)
        self.pos = {"": P(0, 0)}
        for k, c in enumerate(FEUILLES):
            self.pos[c] = P(3 * dx, pas * (3.5 - k))
        for niv in (2, 1):
            for c in {f[:niv] for f in FEUILLES}:
                self.pos[c] = (self.pos[c + "g"] + self.pos[c + "n"]) / 2 + P(-dx, 0)
        self.cles = [c for c in self.pos if c]
        self.branches, self.lab = {}, {}
        for c in sorted(self.cles, key=len):
            u = self.pos[c[:-1]] + P(0.1 if len(c) == 1 else r, 0)
            v = self.pos[c] - P(r, 0)
            self.branches[c] = Line(u, v, color=BRANCHE, stroke_width=4)
            self.lab[c] = lettre("G", fs, ENCRE, c[-1] == "n").move_to(self.pos[c])
        self.depart = Dot(self.pos[""], radius=0.07, color=ENCRE)
        tout = VGroup(self.depart, *self.branches.values(), *self.lab.values())
        self.carte = RoundedRectangle(width=tout.width + 2.0, height=tout.height + 0.55, corner_radius=0.2,
                                      fill_color=WHITE, fill_opacity=1, stroke_color=BORD, stroke_width=2)
        self.carte.move_to(tout).shift(RIGHT * 0.7)
        self.nombres = {}
        self.bouts = {}
        self.add(self.carte, *self.branches.values(), self.depart, *self.lab.values())

    def socle(self):
        return VGroup(self.carte, self.depart)

    def niveau(self, n):
        return [c for c in self.cles if len(c) == n]

    def construire(self, n, run_time=0.6):
        """Le niveau n se trace : ses branches, puis ses lettres."""
        cs = self.niveau(n)
        return Succession(AnimationGroup(*[Create(self.branches[c]) for c in cs], run_time=run_time * 0.6),
                          AnimationGroup(*[FadeIn(self.lab[c], scale=1.4) for c in cs], run_time=run_time * 0.4))

    def nombre(self, c, texte, fs=22, buff=0.06):
        """Le nombre de la branche c, en bleu : AU-DESSUS si c finit par G,
        EN DESSOUS s'il finit par G barre (hors du coin entre deux branches)."""
        t = Text(texte, font_size=fs, color=PROBA, weight=BOLD)
        br = self.branches[c]
        u, v = br.get_start(), br.get_end()
        d = v - u
        n = np.array([-d[1], d[0], 0.0])
        n = n / np.linalg.norm(n)
        if (n[1] < 0) == (c[-1] == "g"):
            n = -n
        demi = abs(n[0]) * t.width / 2 + abs(n[1]) * t.height / 2
        t.move_to((u + v) / 2 + n * (demi + buff))
        self.nombres[c] = t
        return t

    def tous_nombres(self, quoi="gn", fs=22):
        """Les nombres de toutes les branches G ("g") et / ou G barre ("n")."""
        out = []
        for c in self.cles:
            if c[-1] in quoi:
                out.append(self.nombre(c, "0,8" if c[-1] == "g" else "0,2", fs))
        return out

    def bout(self, f, texte, fs=22):
        """La pastille jaune au bout de la feuille f."""
        p = pastille(texte, fs).next_to(self.lab[f], RIGHT, buff=0.16)
        self.bouts[f] = p
        return p

    @staticmethod
    def chemin(f):
        return [f[:k] for k in range(1, len(f) + 1)]

    def etat(self, feuilles=None, op=0.16):
        """Allume les chemins menant aux feuilles données ; estompe le reste."""
        on = None if feuilles is None else {c for f in feuilles for c in self.chemin(f)}
        anims = []
        for c in self.cles:
            allume = on is None or c in on
            br = self.branches[c]
            if on is None:
                anims.append(br.animate.set_stroke(BRANCHE, 4, opacity=1))
            elif allume:
                anims.append(br.animate.set_stroke(CHEMIN, 9, opacity=1))
            else:
                anims.append(br.animate.set_stroke(BRANCHE, 4, opacity=op))
            anims.append(self.lab[c].animate.set_opacity(1 if allume else op))
            if c in self.nombres and self.nombres[c] in self.submobjects:
                anims.append(self.nombres[c].animate.set_opacity(1 if allume else op))
        return anims


class ProbaBernCalculerBase(Notion6e):
    """Toutes les scènes ; les sous-classes ne changent que l'identité."""

    nom_voix = "stmg-premiere-proba-bern-calculer"
    identite = "Maths — EleveAI"
    X_DROITE = 4.05     # le centre de la colonne de droite (calculs)
    LARG_DROITE = 5.2   # sa largeur utile
    FS_NB = 23          # les nombres des branches

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def insister(self, mob, run_time=0.4):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def caser(self, mob, larg=None):
        larg = larg or self.LARG_DROITE
        if mob.width > larg:
            mob.scale_to_fit_width(larg)
        return mob

    def arbre(self, nombres="", echelle=0.95, gauche=-6.85, y=-0.15):
        """L'arbre de la vidéo, carte collée à gauche ; nombres : "g", "n", "gn"."""
        a = ArbreBern().scale(echelle)
        a.shift(P(gauche - a.carte.get_left()[0], y - a.carte.get_center()[1]))
        for t in a.tous_nombres(nombres, fs=int(self.FS_NB * echelle / 0.95)) if nombres else []:
            a.add(t)
        return a

    def produit(self, morceaux, fs=54, y=0.0):
        """Une ligne de calcul : liste de (texte, couleur), bornée à la colonne de droite."""
        g = suite(*[self.t(tx, fs, c) for tx, c in morceaux], buff=0.2)
        return self.caser(g).move_to(P(self.X_DROITE, y))

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Répétition d'épreuves", 52, JAUNE_TITRE).to_edge(UP, buff=0.5)
        sous = self.t("calculer une probabilité", 36, BLEU_CALCUL).next_to(titre, DOWN, buff=0.18)
        identite = self.t(self.identite, 28).next_to(sous, DOWN, buff=0.2)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.85))
        a = ArbreBern().scale(0.5).move_to(P(-0.6, -0.55))
        a.remove(*a.branches.values(), *a.lab.values())
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), FadeIn(a.socle()), run_time=1.0)
        self.au_mot("Calculer")
        self.play(FadeIn(sous, shift=UP * 0.15), run_time=0.5)
        self.au_mot("répétition")
        for n in (1, 2, 3):
            self.play(a.construire(n, 0.5))
        self.play(*a.etat(["ggg"]), run_time=0.5)
        self.attendre_voix(marge=1.0)

    # ── 01 : trois graines ──────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Trois graines")
        xs = (-4.6, -2.3, 0.0)
        pots = VGroup(*[pot(1.15).move_to(P(x, 0.9)) for x in xs])
        self.au_mot("Trois graines")
        self.play(LaggedStart(*[FadeIn(p, shift=UP * 0.3) for p in pots], lag_ratio=0.25), run_time=1.0)
        self.au_mot("chacune germe")
        cG = carte_lettre("« la graine germe »", 28).move_to(P(3.9, 1.6))
        self.play(FadeIn(cG, shift=LEFT * 0.2), run_time=0.5)
        self.au_mot("0,8")
        huit = VGroup(*[self.t("0,8", 46, JAUNE_TITRE).next_to(p, DOWN, buff=0.3) for p in pots])
        self.play(LaggedStart(*[FadeIn(h, scale=1.6) for h in huit], lag_ratio=0.2), run_time=0.8)
        self.insister(huit[0], 0.25)
        self.au_mot("indépendamment")
        ind = self.t("indépendamment des autres", 34, VERT_OK).move_to(P(-2.3, -1.15))
        self.play(FadeIn(ind, shift=UP * 0.15), run_time=0.6)
        self.au_mot("Quelle est la probabilité")
        q = VGroup(self.t("Les trois", 42, WHITE), self.t("germent ?", 42, POUSSE)).arrange(DOWN, buff=0.12)
        q.move_to(P(3.9, 0.0))
        tiges = [pousse(1.0).shift(p[3].get_center() + UP * 0.02) for p in pots]
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.6)
        self.au_mot("les trois germent")
        self.play(LaggedStart(*[GrowFromPoint(tg, tg[0].get_start()) for tg in tiges], lag_ratio=0.3), run_time=1.2)
        self.attendre_voix()

    # ── 02 : le chemin G G G ────────────────────────────────────────────────

    def ecran_chemin(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-chemin")
        self.titre_ecran("Les trois germent")
        a = self.arbre()
        self.add(a.socle())
        for n in (1, 2, 3):
            self.play(a.construire(n, 0.55))
        self.au_mot("un seul chemin")
        self.play(*a.etat(["ggg"]), run_time=0.7)
        self.au_mot("G G G")
        mc = mot_chemin("ggg", 48).move_to(P(self.X_DROITE, 1.9))
        self.play(FadeIn(mc, shift=UP * 0.15), *[Indicate(a.lab[c], color=CHEMIN, scale_factor=1.5)
                                                 for c in a.chemin("ggg")], run_time=0.7)
        self.au_mot("On multiplie ses branches")
        regle = self.t("× ses branches", 36, CHEMIN).move_to(P(self.X_DROITE, 0.95))
        self.play(FadeIn(regle, shift=UP * 0.1), run_time=0.5)
        nb = [a.nombre(c, "0,8", fs=self.FS_NB) for c in a.chemin("ggg")]
        calc = self.produit([("0,8", BLEU_NB), ("×", WHITE), ("0,8", BLEU_NB), ("×", WHITE), ("0,8", BLEU_NB),
                             ("=", WHITE), ("0,512", JAUNE_TITRE)], y=-0.15)
        self.au_mot("0,8 fois")
        self.play(FadeIn(nb[0], scale=1.6), TransformFromCopy(nb[0], calc[0]), run_time=0.6)
        self.play(FadeIn(calc[1]), run_time=0.2)
        self.au_mot("0,8 fois 0,8, égale")
        self.play(FadeIn(nb[1], scale=1.6), TransformFromCopy(nb[1], calc[2]), run_time=0.5)
        self.play(FadeIn(calc[3]), run_time=0.2)
        self.au_mot("0,8, égale")
        self.play(FadeIn(nb[2], scale=1.6), TransformFromCopy(nb[2], calc[4]), run_time=0.5)
        a.add(*nb)
        self.au_mot("égale 0,512")
        self.play(FadeIn(calc[5]), FadeIn(calc[6], scale=1.8), run_time=0.5)
        self.insister(calc[6], 0.3)
        b = a.bout("ggg", "0,512")
        self.play(TransformFromCopy(calc[6], b), run_time=0.7)
        self.attendre_voix()

    # ── 03 : exactement deux : trois chemins, chacun 0,128 ──────────────────

    DEUX = ["ggn", "gng", "ngg"]

    def ecran_deux(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-deux")
        a = self.arbre()
        self.add(a)
        self.titre_ecran("Exactement deux germent ?")
        self.au_mot("Trois chemins")
        noms = VGroup(*[mot_chemin(f, 40) for f in self.DEUX]).arrange(DOWN, buff=0.3)
        noms.move_to(P(self.X_DROITE, 1.55))
        for k, f in enumerate(self.DEUX):
            self.play(*a.etat(self.DEUX[:k + 1]), FadeIn(noms[k], shift=LEFT * 0.2), run_time=0.45)
        huit = [t for t in a.tous_nombres("g", fs=self.FS_NB)]
        deux = [t for t in a.tous_nombres("n", fs=self.FS_NB)]
        calc = self.produit([("0,8", BLEU_NB), ("×", WHITE), ("0,8", BLEU_NB), ("×", WHITE), ("0,2", BLEU_NB),
                             ("=", WHITE), ("0,128", JAUNE_TITRE)], y=-0.6)
        self.au_mot("0,8 fois 0,8 fois 0,2")
        self.play(LaggedStart(*[FadeIn(t, scale=1.5) for t in huit], lag_ratio=0.08),
                  TransformFromCopy(huit[0], calc[0]), run_time=0.8)
        a.add(*huit)
        self.play(*a.etat(self.DEUX), FadeIn(calc[1]), run_time=0.3)
        self.au_mot("0,8 fois 0,2")
        self.play(FadeIn(calc[2], shift=UP * 0.1), FadeIn(calc[3]), run_time=0.4)
        self.au_mot("0,2, égale")
        self.play(LaggedStart(*[FadeIn(t, scale=1.5) for t in deux], lag_ratio=0.08),
                  FadeIn(calc[4], shift=UP * 0.1), run_time=0.8)
        a.add(*deux)
        self.play(*a.etat(self.DEUX), run_time=0.3)
        self.au_mot("égale 0,128")
        self.play(FadeIn(calc[5]), FadeIn(calc[6], scale=1.8), run_time=0.5)
        self.insister(calc[6], 0.3)
        bouts = [a.bout(f, "0,128") for f in self.DEUX]
        self.play(*[TransformFromCopy(calc[6], b) for b in bouts], run_time=0.8)
        self.attendre_voix()

    # ── 04 : on additionne : 3 × 0,128 = 0,384 ──────────────────────────────

    def arbre_deux(self):
        """L'arbre complet, les trois chemins à deux G allumés, leurs pastilles."""
        a = self.arbre("gn")
        for f in self.DEUX:
            a.add(a.bout(f, "0,128"))
        return self.figer(a, self.DEUX)

    @staticmethod
    def figer(a, feuilles, op=0.16):
        """Le même état qu'`etat`, posé d'emblée (sans animation)."""
        for c in a.cles:
            on = any(c in a.chemin(f) for f in feuilles)
            a.lab[c].set_opacity(1 if on else op)
            a.branches[c].set_stroke(CHEMIN if on else BRANCHE, 9 if on else 4, opacity=1 if on else op)
            if c in a.nombres:
                a.nombres[c].set_opacity(1 if on else op)
        return a

    def ecran_somme(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-somme")
        a = self.arbre_deux()
        self.add(a)
        self.titre_ecran("On additionne les chemins")
        self.au_mot("même probabilité")
        self.play(*[Circumscribe(a.bouts[f], color=CHEMIN, buff=0.06) for f in self.DEUX], run_time=0.8)
        self.au_mot("On les additionne")
        cop = [a.bouts[f].copy() for f in self.DEUX]
        plus = [self.t("+", 48) for _ in range(2)]
        rang = suite(cop[0].copy().scale(1.4), plus[0], cop[1].copy().scale(1.4), plus[1], cop[2].copy().scale(1.4),
                     buff=0.2)
        self.caser(rang).move_to(P(self.X_DROITE, 1.7))
        self.play(*[ReplacementTransform(c, r) for c, r in zip(cop, (rang[0], rang[2], rang[4]))],
                  run_time=0.8)
        self.play(*[FadeIn(p, scale=1.6) for p in plus], run_time=0.3)
        calc = self.produit([("3", ORANGE_RETENUE), ("×", WHITE), ("0,128", JAUNE_TITRE), ("=", WHITE),
                             ("0,384", VERT_OK)], fs=58, y=0.25)
        self.au_mot("3 fois")
        self.play(FadeIn(calc[0], scale=1.8), FadeIn(calc[1]), run_time=0.4)
        self.play(FadeIn(calc[2], shift=UP * 0.15), *[Circumscribe(rang[i], color=CHEMIN, buff=0.06) for i in (0, 2, 4)],
                  run_time=0.6)
        self.au_mot("égale 0,384")
        self.play(FadeIn(calc[3]), FadeIn(calc[4], scale=1.8), run_time=0.5)
        cad = SurroundingRectangle(calc[4], color=VERT_OK, buff=0.12, stroke_width=4)
        self.play(Create(cad), run_time=0.4)
        self.insister(VGroup(calc[4], cad), 0.3)
        self.attendre_voix()

    # ── 05 : le piège : un seul chemin ──────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        a = self.arbre("gn")
        self.add(a)
        self.titre_ecran("Le piège : un seul chemin")
        self.au_mot("calculer un seul chemin")
        self.play(*a.etat(["ggn"]), run_time=0.6)
        self.au_mot("0,128, c'est")
        b1 = a.bout("ggn", "0,128")
        seul = suite(pastille("0,128", 40), mot_chemin("ggn", 40), buff=0.4).move_to(P(self.X_DROITE, 1.85))
        self.play(FadeIn(b1, scale=1.5), FadeIn(seul, shift=UP * 0.15), run_time=0.6)
        self.au_mot("un seul ordre")
        barre = Line(seul[0].get_corner(DL) + P(-0.12, -0.08), seul[0].get_corner(UR) + P(0.12, 0.08),
                     color=ROUGE_ERREUR, stroke_width=8)
        ordre = self.t("un seul ordre", 34, ROUGE_ERREUR).next_to(seul, DOWN, buff=0.25)
        self.play(Create(barre), seul[0].animate.set_opacity(0.55), FadeIn(ordre, shift=UP * 0.1), run_time=0.6)
        self.insister(VGroup(seul[0], barre), 0.25)
        self.au_mot("Exactement deux graines")
        l1 = self.caser(self.t("Exactement deux graines :", 34)).move_to(P(self.X_DROITE, -0.05))
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.5)
        self.au_mot("trois ordres")
        l2 = self.t("trois ordres", 42, VERT_OK).next_to(l1, DOWN, buff=0.2)
        bouts = [b1] + [a.bout(f, "0,128") for f in self.DEUX[1:]]
        self.play(*a.etat(self.DEUX), FadeIn(l2, scale=1.4), *[FadeIn(b, scale=1.5) for b in bouts[1:]],
                  run_time=0.7)
        self.au_mot("0,384")
        res = self.t("0,384", 58, VERT_OK)
        fois = self.t("trois fois plus", 32, JAUNE_TITRE)
        rf = self.caser(suite(res, fois, buff=0.3))
        rf.next_to(l2, DOWN, buff=0.3).set_x(self.X_DROITE)
        self.play(FadeIn(res, scale=1.8), run_time=0.5)
        self.au_mot("trois fois plus")
        self.play(FadeIn(fois, shift=LEFT * 0.15), run_time=0.5)
        self.insister(res, 0.3)
        self.attendre_voix()

    # ── 06 : défi : aucune graine ne germe ──────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        a = self.arbre("gn")
        self.play(FadeIn(a), run_time=0.5)
        self.au_mot("Quelle est la probabilité")
        q = VGroup(self.t("La probabilité", 36), self.t("qu'aucune graine", 40, ORANGE_RETENUE),
                   self.t("ne germe ?", 40, ORANGE_RETENUE)).arrange(DOWN, buff=0.15)
        self.caser(q).move_to(P(self.X_DROITE, 1.4))
        self.play(FadeIn(q[0], shift=UP * 0.15), run_time=0.5)
        self.au_mot("aucune graine")
        self.play(FadeIn(q[1:], shift=UP * 0.15), run_time=0.6)
        self.insister(q[1], 0.25)
        self.au_mot("Mets pause")
        pause = self.caser(self.t("Mets pause, et cherche !", 34, ORANGE_RETENUE)).move_to(P(self.X_DROITE, -0.6))
        self.play(Write(pause), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        a = self.arbre("gn")
        self.add(a)
        self.titre_ecran("Correction")
        self.au_mot("Un seul chemin")
        mc = mot_chemin("nnn", 48).move_to(P(self.X_DROITE, 1.9))
        self.au_mot("G barre, G barre, G barre")
        for k in range(3):
            self.play(*a.etat(["nnn"[:k + 1]]), FadeIn(mc[k], scale=1.4), run_time=0.45)
        calc = self.produit([("0,2", BLEU_NB), ("×", WHITE), ("0,2", BLEU_NB), ("×", WHITE), ("0,2", BLEU_NB),
                             ("=", WHITE), ("0,008", JAUNE_TITRE)], y=0.5)
        ch = a.chemin("nnn")
        self.au_mot("0,2 fois 0,2 fois")
        self.play(TransformFromCopy(a.nombres[ch[0]], calc[0]), FadeIn(calc[1]), run_time=0.5)
        self.au_mot("0,2 fois 0,2, égale")
        self.play(TransformFromCopy(a.nombres[ch[1]], calc[2]), FadeIn(calc[3]), run_time=0.5)
        self.au_mot("0,2, égale")
        self.play(TransformFromCopy(a.nombres[ch[2]], calc[4]), run_time=0.5)
        self.au_mot("égale 0,008")
        self.play(FadeIn(calc[5]), FadeIn(calc[6], scale=1.8), run_time=0.5)
        self.insister(calc[6], 0.3)
        b = a.bout("nnn", "0,008")
        ok = self.coche(taille=0.35).next_to(calc, DOWN, buff=0.5)
        self.play(TransformFromCopy(calc[6], b), run_time=0.7)
        self.play(Create(ok), run_time=0.4)
        self.attendre_voix()

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 40
        l1 = suite(self.t("Un chemin :", fs), self.t("le produit de ses branches", fs, CHEMIN), buff=0.15)
        l2 = suite(self.t("Plusieurs chemins, même événement :", fs), self.t("on additionne", fs, VERT_OK),
                   buff=0.15)
        l3 = suite(self.t("On n'oublie", fs), self.t("aucun ordre", fs, ORANGE_RETENUE), buff=0.15)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.55)
        if lignes.width > 11.8:
            lignes.scale_to_fit_width(11.8)
        lignes.move_to(P(-0.5, 0.75))
        for mot, l in zip(["un chemin, c'est", "Si plusieurs chemins", "on n'oublie aucun ordre"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("Prochaine vidéo")
        ch = VGroup(suite(self.t("Prochaine vidéo :", 34, VERT_OK), self.t("« au moins un »,", 34), buff=0.2),
                    self.t("l'astuce du contraire", 34, BLEU_CALCUL)).arrange(DOWN, buff=0.15)
        ch.move_to(P(-1.0, -2.45))
        self.play(FadeIn(ch[0], shift=UP * 0.15), run_time=0.5)
        self.au_mot("l'astuce du contraire")
        self.play(FadeIn(ch[1], shift=UP * 0.15), run_time=0.5)
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
        self.ecran_chemin()
        self.ecran_deux()
        self.ecran_somme()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")


class ProbaBernCalculerSTMG(ProbaBernCalculerBase):
    identite = "Maths STMG — EleveAI"


class ProbaBernCalculerPremiere(ProbaBernCalculerBase):
    identite = "Maths 1re — EleveAI"
