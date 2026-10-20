# proba2_simulation.py
# EleveAI — Maths 2de — série « Probabilités », épisode 15 : simuler le hasard
# avec Python et observer une fréquence (micro : simulation_frequence), AVEC
# VOIX. Paysage 16:9, CEINTURE BLEUE. Short jumeau : proba2_simulation_short.py
# (ceinture jaune).
#
# Écrans : 00 garde · 01 1 000 lancers : à la main c'est long, l'ordinateur en
# une seconde · 02 random() tombe sur la bande de 0 à 1, à gauche de 0,5 : pile ·
# 03 le programme s'écrit ligne par ligne (compteur, boucle, test, division) ·
# 04 on le lance : 0,507 ; on le relance : 0,493 ; proche de 0,5 ·
# 05 probabilité 0,3 : random() < 0.3 · 06 le piège random() > 0.3 (7 fois sur
# 10) · 07 défi randint(1, 6) · 07b correction == 6, autour de 1/6 ·
# 08 ce que tu as appris · 09 fin (eleveai.fr + abonne-toi).
#
# ⭐ Le coach (lib/tutor-v4/questionBank/seconde/maths/echantillonnage.bank.ts,
# gabarits seconde_ech_sim_gen_2 et _4) n'a PAS de canvas pour cette micro :
# il montre le CODE en police à chasse fixe (`random() < 0.5`, `randint(1, 6)`,
# le programme compteur / for / if / return). On reprend donc ce code, dans
# une fenêtre d'éditeur, avec les mêmes instructions et le même ordre.
#
# Voix : manim/voix/seconde-proba-simulation.json (débit −7).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/seconde/proba2_simulation.py Proba2Simulation -o eleveai-maths-seconde-proba-simulation --media_dir manim/scripts/seconde/media
# Puis copier le mp4 dans manim/sorties/seconde/maths/probabilites/15-simulation/.

import importlib.util
import random as _random
import re
import sys
from pathlib import Path

import numpy as np

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI.parents[1]))
sys.path.insert(0, str(ICI))

from manim import *  # noqa: E402

from charte import *  # noqa: E402


def _charger(chemin, nom_module):
    """Importe un module par son chemin EXACT (des modules de même nom existent
    dans d'autres dossiers)."""
    if nom_module in sys.modules:
        return sys.modules[nom_module]
    spec = importlib.util.spec_from_file_location(nom_module, chemin)
    mod = importlib.util.module_from_spec(spec)
    sys.modules[nom_module] = mod
    spec.loader.exec_module(mod)
    return mod


_ep2 = _charger(ICI / "proba_modele.py", "seconde_proba_modele_ep2")
_signes = _charger(ICI / "signes_expression_2de.py", "seconde_signes_expression_2de")
_annonce = _charger(ICI.parent / "annonce" / "annonce_probabilites.py", "annonce_probabilites_dessins")
echelle_ceintures = _signes.echelle_ceintures
NotionSeconde2 = _ep2.NotionSeconde2
frac_txt = _ep2.frac_txt
piece_qui_tourne, de_qui_roule, de = _annonce.piece_qui_tourne, _annonce.de_qui_roule, _annonce.de

POLICE = "Consolas"
FOND_EDITEUR = "#1E1E2E"
BARRE_EDITEUR = "#313244"
C_MOTCLE = "#C678DD"   # for, in, if, print
C_FONCTION = "#61AFEF"  # random, randint, range
C_NOMBRE = "#E5C07B"
C_TEXTE = "#E5E7EB"
GRIS_ETEINT = "#6B7280"
VERT_PILE = "#22C55E"

MOTS_CLES = {"for", "in", "if", "print", "from", "import"}
FONCTIONS = {"random", "randint", "range"}


def P(x, y):
    return np.array([x, y, 0.0])


def code_txt(ligne, fs=30, color=None):
    """Une ligne de code en police à chasse fixe, colorée comme un éditeur.
    Les espaces de tête sont conservés (Text les supprime : on décale)."""
    t = Text(ligne.strip() or "x", font=POLICE, font_size=fs, color=C_TEXTE)
    if not ligne.strip():
        t.set_opacity(0)
    nonblancs = [i for i, ch in enumerate(ligne) if not ch.isspace()]
    if color is None and len(nonblancs) == len(t.submobjects):
        couleur_de = {}
        for m in re.finditer(r"[A-Za-z_]+|\d+(?:\.\d+)?", ligne):
            mot = m.group()
            c = (C_MOTCLE if mot in MOTS_CLES else C_FONCTION if mot in FONCTIONS
                 else C_NOMBRE if mot[0].isdigit() else None)
            if c:
                for i in range(m.start(), m.end()):
                    couleur_de[i] = c
        for k, i in enumerate(nonblancs):
            if i in couleur_de:
                t.submobjects[k].set_color(couleur_de[i])
    elif color is not None:
        t.set_color(color)
    return t


def largeur_car(fs=30):
    return Text("M" * 10, font=POLICE, font_size=fs).width / 10


class Editeur(VGroup):
    """Une fenêtre d'éditeur : barre à trois pastilles, fond sombre, des
    emplacements de lignes. self.lignes[i] : la ligne i (ou None) ;
    self.curseur : le bandeau qui allume la ligne exécutée."""

    def __init__(self, nb_lignes, largeur, centre, fs=30, pas=0.62):
        super().__init__()
        self.fs, self.pas, self.cw = fs, pas, largeur_car(fs)
        haut = 0.5 + nb_lignes * pas + 0.35
        self.fond = RoundedRectangle(width=largeur, height=haut, corner_radius=0.18, fill_color=FOND_EDITEUR,
                                     fill_opacity=1, stroke_color=GREY_B, stroke_width=2)
        self.barre = Rectangle(width=largeur - 0.04, height=0.42, fill_color=BARRE_EDITEUR, fill_opacity=1,
                               stroke_width=0).align_to(self.fond, UP).shift(DOWN * 0.02)
        pastilles = VGroup(*[Dot(radius=0.075, color=c) for c in ("#EF4444", "#EAB308", "#22C55E")])
        pastilles.arrange(RIGHT, buff=0.14).move_to(self.barre).align_to(self.barre, LEFT).shift(RIGHT * 0.25)
        self.add(self.fond, self.barre, pastilles)
        self.move_to(centre)
        self.x_gauche = self.fond.get_left()[0] + 0.35
        y_haut = self.barre.get_bottom()[1] - 0.2 - pas / 2
        self.ys = [y_haut - k * pas for k in range(nb_lignes)]
        self.lignes = [None] * nb_lignes
        self.curseur = Rectangle(width=largeur - 0.16, height=pas * 0.92, fill_color=BLEU_CALCUL,
                                 fill_opacity=0.22, stroke_color=BLEU_CALCUL, stroke_width=2)
        self.curseur.move_to(P(self.fond.get_center()[0], self.ys[0]))

    def faire(self, i, texte, color=None):
        """La ligne i, posée à sa place (sans l'ajouter)."""
        t = code_txt(texte, self.fs, color)
        retrait = len(texte) - len(texte.lstrip())
        t.move_to(P(0, self.ys[i])).align_to(P(self.x_gauche + retrait * self.cw, 0), LEFT)
        return t

    def poser(self, i, texte, color=None):
        self.lignes[i] = self.faire(i, texte, color)
        self.add(self.lignes[i])
        return self.lignes[i]

    def taper(self, i, texte, color=None, run_time=None):
        t = self.faire(i, texte, color)
        self.lignes[i] = t
        n = len(t.submobjects)
        return AddTextLetterByLetter(t, run_time=run_time or min(1.4, max(0.4, 0.05 * n)))

    def morceau(self, i, debut, fin):
        """Les caractères [debut:fin] (indices dans le texte non blanc) de la ligne i."""
        return VGroup(*self.lignes[i].submobjects[debut:fin])

    def vers(self, i):
        return self.curseur.animate.move_to(P(self.curseur.get_center()[0], self.ys[i]))


class Bande(VGroup):
    """La bande de 0 à 1 : random() y tombe. self.x(v) : abscisse de v."""

    def __init__(self, x0, x1, y, haut=0.55, fs=30):
        super().__init__()
        self.x0, self.x1, self.y, self.haut = x0, x1, y, haut
        self.cadre = Rectangle(width=x1 - x0, height=haut, stroke_color=WHITE, stroke_width=3)
        self.cadre.move_to(P((x0 + x1) / 2, y))
        self.zero = Text("0", font_size=fs).next_to(P(x0, y - haut / 2), DOWN, buff=0.15)
        self.un = Text("1", font_size=fs).next_to(P(x1, y - haut / 2), DOWN, buff=0.15)
        self.add(self.cadre, self.zero, self.un)

    def x(self, v):
        return self.x0 + v * (self.x1 - self.x0)

    def zone(self, a, b, color, op=0.55):
        r = Rectangle(width=max(0.01, self.x(b) - self.x(a)), height=self.haut, fill_color=color, fill_opacity=op,
                      stroke_width=0)
        return r.move_to(P((self.x(a) + self.x(b)) / 2, self.y))

    def repere(self, v, texte, color=WHITE, fs=30):
        trait = Line(P(self.x(v), self.y - self.haut / 2 - 0.12), P(self.x(v), self.y + self.haut / 2 + 0.12),
                     color=color, stroke_width=5)
        lbl = Text(texte, font_size=fs, color=color).next_to(trait, UP, buff=0.1)
        return VGroup(trait, lbl)

    def goutte(self, v, color, r=0.09):
        """Un point qui part au-dessus de la bande (à poser) et la cible où il tombe."""
        d = Dot(P(self.x(v), self.y + 1.25), radius=r, color=color)
        return d, P(self.x(v), self.y + _random.Random(int(v * 1e6)).uniform(-0.17, 0.17))


class Compteur(VGroup):
    """« compteur » + sa case (le nombre, si la voix le dit) + une jauge qui monte."""

    def __init__(self, centre, fs=30, haut_max=2.2):
        super().__init__()
        self.nom = code_txt("compteur", fs)
        self.case = RoundedRectangle(width=1.5, height=0.75, corner_radius=0.1, stroke_color=C_NOMBRE,
                                     stroke_width=3, fill_color=FOND_EDITEUR, fill_opacity=1)
        tete = VGroup(self.nom, self.case).arrange(RIGHT, buff=0.3)
        self.add(tete)
        self.move_to(centre)
        self.haut_max = haut_max
        self.socle = Line(LEFT * 0.45, RIGHT * 0.45, color=GREY_B, stroke_width=3)
        self.socle.next_to(self.case, DOWN, buff=0.25 + haut_max)
        self.add(self.socle)
        self.jauge = self.barre(0.0)
        self.add(self.jauge)

    def barre(self, frac):
        h = max(0.001, frac * self.haut_max)
        b = Rectangle(width=0.7, height=h, fill_color=VERT_PILE, fill_opacity=0.9 if frac > 0 else 0, stroke_width=0)
        return b.next_to(self.socle, UP, buff=0).align_to(self.socle, DOWN)

    def nombre(self, n):
        return Text(str(n), font=POLICE, font_size=34, color=C_NOMBRE).move_to(self.case)


# Les « random() » qui tombent : une suite fixe (graine 15), pour que deux
# rendus donnent la même pluie.
_g = _random.Random(15)
HASARDS = [round(_g.random(), 4) for _ in range(400)]

CODE = [
    "compteur = 0",
    "for i in range(1000):",
    "    if random() < 0.5:",
    "        compteur = compteur + 1",
    "print(compteur / 1000)",
]


class Proba2Simulation(NotionSeconde2):
    nom_voix = "seconde-proba-simulation"

    # ── petits outils ───────────────────────────────────────────────────────

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.2):
        return VGroup(*[m if isinstance(m, Mobject) else self.t(m, font_size, c)
                        for m, c in morceaux]).arrange(RIGHT, buff=buff)

    def insister(self, mob, run_time=0.4):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR, sw=6):
        return Line(mob.get_corner(DL) + P(-0.08, -0.04), mob.get_corner(UR) + P(0.08, 0.04),
                    stroke_width=sw, color=color)

    def etiquette(self, texte, color, font_size=30):
        lbl = self.t(texte, font_size, BLACK)
        fond = RoundedRectangle(width=lbl.width + 0.4, height=lbl.height + 0.3, corner_radius=0.12,
                                fill_color=color, fill_opacity=1, stroke_width=0)
        return VGroup(fond, lbl.move_to(fond))

    def pluie(self, bande, valeurs, seuil, c_oui=VERT_PILE, c_non=GRIS_ETEINT, gauche=True, run_time=1.6,
              lag=0.08, r=0.09):
        """Des random() qui tombent sur la bande : couleur selon le test. Renvoie
        (animation, points tombés)."""
        anims, pts = [], VGroup()
        for v in valeurs:
            oui = (v < seuil) if gauche else (v > seuil)
            d, cible = bande.goutte(v, c_oui if oui else c_non, r)
            d.set_opacity(0)
            pts.add(d)
            anims.append(d.animate.move_to(cible).set_opacity(1))
        return LaggedStart(*anims, lag_ratio=lag, run_time=run_time), pts

    def ordinateur(self, centre, larg=2.6, haut=1.7):
        ecran = RoundedRectangle(width=larg, height=haut, corner_radius=0.12, fill_color=FOND_EDITEUR,
                                 fill_opacity=1, stroke_color=GREY_B, stroke_width=4)
        pied = Polygon(P(-0.25, 0), P(0.25, 0), P(0.45, -0.4), P(-0.45, -0.4), fill_color=GREY_B,
                       fill_opacity=1, stroke_width=0).next_to(ecran, DOWN, buff=0)
        return VGroup(ecran, pied).move_to(centre)

    def sablier(self, centre, h=1.3):
        haut = Polygon(P(-0.5, h / 2), P(0.5, h / 2), P(0, 0), stroke_color=WHITE, stroke_width=4)
        bas = Polygon(P(-0.5, -h / 2), P(0.5, -h / 2), P(0, 0), stroke_color=WHITE, stroke_width=4)
        sable_h = Polygon(P(-0.38, h / 2 - 0.12), P(0.38, h / 2 - 0.12), P(0, 0.04), fill_color=JAUNE_TITRE,
                          fill_opacity=0.9, stroke_width=0)
        sable_b = Polygon(P(-0.12, -h / 2 + 0.14), P(0.12, -h / 2 + 0.14), P(0, -h / 2 + 0.3),
                          fill_color=JAUNE_TITRE, fill_opacity=0.9, stroke_width=0)
        return VGroup(haut, bas, sable_h, sable_b).move_to(centre)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Simuler le hasard", 56, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("bleue").move_to(P(-0.6, -2.6))
        ed = Editeur(1, 4.6, P(-3.7, 0.35), fs=36)
        piece = piece_qui_tourne(P(-0.25, 0.35), r=0.7)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), FadeIn(ed), FadeIn(piece),
                  run_time=1.0)
        self.play(ed.taper(0, "random()"), Create(ed.curseur), run_time=0.8)
        self.au_mot("avec un programme")
        sous = self.t("avec un programme", 40, ORANGE_RETENUE).move_to(P(3.75, 0.35))
        self.play(FadeIn(sous, scale=0.6), run_time=0.5)
        self.insister(sous, 0.35)
        self.attendre_voix(marge=1.0)

    # ── 01 : 1 000 lancers ──────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("1 000 lancers de pièce")
        piece = piece_qui_tourne(P(-4.4, 1.0), r=0.85)
        self.add(piece)
        self.au_mot("1 000 fois")
        mille = self.t("1 000 fois", 44, BLEU_CALCUL).move_to(P(-4.4, -0.55))
        self.play(FadeIn(mille, scale=0.6), run_time=0.4)
        self.insister(mille, 0.3)
        self.au_mot("À la main")
        main = self.t("à la main", 38).move_to(P(-0.4, 1.9))
        sab = self.sablier(P(-0.4, 0.4))
        self.play(FadeIn(main, shift=DOWN * 0.15), FadeIn(sab), run_time=0.5)
        self.au_mot("c'est long")
        long_ = self.t("c'est long", 40, ORANGE_RETENUE).move_to(P(-0.4, -1.15))
        self.play(Rotate(sab, angle=PI, run_time=0.8), FadeIn(long_, shift=UP * 0.15))
        self.play(Rotate(sab, angle=PI, run_time=0.8))
        self.au_mot("Un ordinateur")
        pc = self.ordinateur(P(3.7, 0.7))
        prog = Rectangle(width=2.0, height=0.3, stroke_color=WHITE, stroke_width=2).move_to(pc[0])
        rempli = Rectangle(width=2.0, height=0.3, fill_color=VERT_PILE, fill_opacity=1, stroke_width=0)
        rempli.move_to(prog).stretch(0.01, 0, about_edge=LEFT)
        self.play(FadeIn(pc, shift=UP * 0.2), FadeIn(prog), FadeIn(rempli), run_time=0.5)
        self.au_mot("en une seconde")
        self.play(rempli.animate.stretch(100, 0, about_edge=LEFT), run_time=0.6, rate_func=linear)
        sec = self.t("en une seconde", 40, VERT_OK).move_to(P(3.7, -1.15))
        self.play(FadeIn(sec, scale=0.6), run_time=0.4)
        self.insister(sec, 0.3)
        self.attendre_voix()

    # ── 02 : random() ───────────────────────────────────────────────────────

    def ecran_random(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-random")
        self.titre_ecran("random() : un nombre au hasard")
        ed = Editeur(1, 6.4, P(-3.0, 1.75), fs=36)
        self.play(FadeIn(ed), run_time=0.4)
        self.au_mot("random de parenthèses")
        self.play(ed.taper(0, "random()"), Create(ed.curseur), run_time=0.8)
        bande = Bande(-5.6, 3.4, -0.9, haut=0.7, fs=40)
        self.au_mot("au hasard")
        self.play(Create(bande.cadre), run_time=0.4)
        anim, pts = self.pluie(bande, HASARDS[:8], 2.0, c_oui=BLEU_CALCUL, run_time=1.4, lag=0.25, r=0.11)
        self.play(anim)
        self.au_mot("entre 0 et 1")
        self.play(FadeIn(bande.zero, scale=0.5), run_time=0.3)
        self.play(FadeIn(bande.un, scale=0.5), run_time=0.3)
        self.au_mot("Si ce nombre")
        self.play(Transform(ed.lignes[0], ed.faire(0, "if random() < 0.5:")), run_time=0.6)
        self.au_mot("0,5")
        rep = bande.repere(0.5, "0,5", JAUNE_TITRE, 40)
        zg = bande.zone(0, 0.5, VERT_PILE, 0.35)
        self.play(FadeIn(rep, shift=DOWN * 0.15), FadeIn(zg), run_time=0.5)
        self.play(*[p.animate.set_color(VERT_PILE if v < 0.5 else GRIS_ETEINT)
                    for p, v in zip(pts, HASARDS[:8])], run_time=0.5)
        self.au_mot("pile")
        pile = self.etiquette("pile", VERT_PILE, 34).next_to(zg, DOWN, buff=0.75)
        piece = piece_qui_tourne(P(5.1, 1.6), r=0.75)
        self.play(GrowFromCenter(pile), FadeIn(piece), run_time=0.5)
        anim, pts2 = self.pluie(bande, HASARDS[8:20], 0.5, run_time=1.6, lag=0.15, r=0.11)
        self.play(anim)
        self.attendre_voix()

    # ── le décor des écrans 03-04 ───────────────────────────────────────────

    def decor_programme(self, tout=False):
        ed = Editeur(5, 7.3, P(-3.05, 0.35), fs=26)
        bande = Bande(1.4, 6.2, 1.75, haut=0.5, fs=28)
        cpt = Compteur(P(2.45, 0.45), fs=26, haut_max=1.6)
        if tout:
            for i, l in enumerate(CODE):
                ed.poser(i, l)
            self.add(ed, bande, cpt)
        return ed, bande, cpt

    # ── 03 : le programme ───────────────────────────────────────────────────

    def ecran_programme(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-programme")
        self.titre_ecran("Le programme")
        ed, bande, cpt = self.decor_programme()
        self.play(FadeIn(ed), FadeIn(bande), run_time=0.5)
        self.au_mot("un compteur à 0")
        n0 = cpt.nombre(0)
        self.play(ed.taper(0, CODE[0]), FadeIn(ed.curseur), FadeIn(cpt), run_time=0.8)
        self.play(FadeIn(n0, scale=0.5), Indicate(ed.morceau(0, 9, 10), color=C_NOMBRE), run_time=0.4)
        self.au_mot("On répète 1 000 fois")
        self.play(ed.taper(1, CODE[1]), ed.vers(1), run_time=0.9)
        self.play(Indicate(ed.morceau(1, 12, 16), color=C_NOMBRE, scale_factor=1.3), run_time=0.5)
        self.au_mot("si random")
        self.play(ed.taper(2, CODE[2]), ed.vers(2), run_time=0.9)
        self.au_mot("0,5")
        rep = bande.repere(0.5, "0,5", JAUNE_TITRE, 28)
        zg = bande.zone(0, 0.5, VERT_PILE, 0.35)
        self.play(FadeIn(rep), FadeIn(zg), Indicate(ed.morceau(2, 11, 14), color=C_NOMBRE, scale_factor=1.3),
                  run_time=0.5)
        anim, pts = self.pluie(bande, [0.31], 0.5, run_time=0.5, lag=0.1)
        self.play(anim)
        self.au_mot("on ajoute 1")
        n1 = cpt.nombre(1)
        plus = self.t("+1", 36, VERT_OK).next_to(cpt.case, UP, buff=0.15)
        self.play(ed.taper(3, CODE[3]), ed.vers(3), run_time=0.9)
        self.play(FadeIn(plus, shift=DOWN * 0.2), Transform(n0, n1),
                  Transform(cpt.jauge, cpt.barre(0.06)), run_time=0.5)
        self.play(FadeOut(plus), run_time=0.3)
        self.au_mot("À la fin")
        self.play(ed.taper(4, CODE[4]), ed.vers(4), run_time=0.9)
        self.au_mot("par 1 000")
        div = ed.morceau(4, 14, 19)
        self.play(Indicate(div, color=C_NOMBRE, scale_factor=1.3), run_time=0.6)
        self.attendre_voix()

    # ── 04 : on lance, on relance ───────────────────────────────────────────

    def executer(self, ed, bande, cpt, valeurs, frac, run_time=2.4):
        """Le programme tourne : la ligne exécutée parcourt la boucle, random()
        pleut sur la bande, la jauge monte jusqu'à `frac`."""
        anim, pts = self.pluie(bande, valeurs, 0.5, run_time=run_time, lag=0.04, r=0.07)
        boucle = Succession(*[ed.vers(k) for k in [1, 2, 3] * 4], run_time=run_time)
        self.play(anim, boucle, Transform(cpt.jauge, cpt.barre(frac)), run_time=run_time)
        self.play(ed.vers(4), run_time=0.3)
        return pts

    def ecran_resultat(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-resultat")
        self.titre_ecran("On lance le programme")
        ed, bande, cpt = self.decor_programme(tout=True)
        rep = bande.repere(0.5, "0,5", JAUNE_TITRE, 28)
        zg = bande.zone(0, 0.5, VERT_PILE, 0.35)
        self.add(rep, zg, ed.curseur)
        console = RoundedRectangle(width=7.3, height=0.62, corner_radius=0.1, fill_color="#0B0B12", fill_opacity=1,
                                   stroke_color=GREY_B, stroke_width=2).move_to(P(-3.05, -2.3))
        invite = code_txt(">>>", 26, GRIS_ETEINT).move_to(console).align_to(console, LEFT).shift(RIGHT * 0.3)
        self.add(console, invite)
        self.au_mot("On lance")
        pts = self.executer(ed, bande, cpt, HASARDS[20:80], 0.507)
        self.au_mot("0,507")
        s1 = code_txt("0.507", 30, C_NOMBRE).next_to(invite, RIGHT, buff=0.3)
        r1 = self.t("0,507", 46, VERT_OK).move_to(P(5.6, 0.55))
        self.play(FadeIn(s1), FadeIn(r1, scale=0.5), run_time=0.4)
        self.insister(r1, 0.3)
        self.au_mot("On le relance")
        self.play(FadeOut(pts), FadeOut(s1), Transform(cpt.jauge, cpt.barre(0.0)), run_time=0.4)
        pts = self.executer(ed, bande, cpt, HASARDS[80:140], 0.493, run_time=2.0)
        self.au_mot("0,493")
        s2 = code_txt("0.493", 30, C_NOMBRE).next_to(invite, RIGHT, buff=0.3)
        r2 = self.t("0,493", 46, VERT_OK).move_to(P(5.6, -0.35))
        self.play(FadeIn(s2), FadeIn(r2, scale=0.5), run_time=0.4)
        self.insister(r2, 0.3)
        self.au_mot("proche de 0,5")
        proche = self.t("une fréquence proche de 0,5", 34, JAUNE_TITRE).move_to(P(1.8, -3.1))
        self.play(Indicate(rep, color=JAUNE_TITRE, scale_factor=1.3), FadeIn(proche, shift=UP * 0.15),
                  Circumscribe(VGroup(r1, r2), color=JAUNE_TITRE), run_time=0.8)
        self.attendre_voix()

    # ── 05 : une autre probabilité ──────────────────────────────────────────

    def decor_test(self, ligne_code):
        ed = Editeur(1, 7.0, P(-2.2, 1.6), fs=36)
        ed.poser(0, ligne_code)
        bande = Bande(-5.6, 3.4, -1.0, haut=0.7, fs=40)
        return ed, bande

    def ecran_autre_p(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-autre-p")
        self.titre_ecran("Une autre probabilité")
        ed, bande = self.decor_test("if random() < 0.5:")
        self.add(ed, bande)
        self.au_mot("probabilité 0,3")
        lbl = self.t("probabilité 0,3", 38, VERT_OK).move_to(P(4.4, -0.05))
        rep = bande.repere(0.3, "0,3", JAUNE_TITRE, 40)
        zg = bande.zone(0, 0.3, VERT_PILE, 0.4)
        self.play(FadeIn(lbl, scale=0.6), FadeIn(rep, shift=DOWN * 0.15), FadeIn(zg), run_time=0.6)
        self.au_mot("on teste")
        self.play(FadeIn(ed.curseur), run_time=0.3)
        self.au_mot("que 0,3")
        self.play(Transform(ed.lignes[0], ed.faire(0, "if random() < 0.3:")), run_time=0.6)
        self.insister(ed.lignes[0], 0.3)
        anim, pts = self.pluie(bande, HASARDS[140:160], 0.3, run_time=1.6, lag=0.12, r=0.1)
        self.play(anim)
        self.attendre_voix()

    # ── 06 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        ed = Editeur(1, 7.0, P(-2.2, 1.6), fs=36)
        bande = Bande(-5.6, 3.4, -1.0, haut=0.7, fs=40)
        self.add(ed, bande)
        self.au_mot("écrire random")
        self.play(ed.taper(0, "if random() > 0.3:"), run_time=0.9)
        sup = ed.morceau(0, 10, 11)
        self.play(sup.animate.set_color(ORANGE_RETENUE), run_time=0.2)
        self.insister(sup, 0.3)
        self.au_mot("pour une probabilité")
        lbl = self.t("probabilité 0,3", 38, VERT_OK).move_to(P(4.4, -0.05))
        rep = bande.repere(0.3, "0,3", JAUNE_TITRE, 40)
        self.play(FadeIn(lbl, scale=0.6), FadeIn(rep, shift=DOWN * 0.15), run_time=0.5)
        self.au_mot("Plus grand que 0,3")
        zd = bande.zone(0.3, 1.0, ORANGE_RETENUE, 0.4)
        anim, pts = self.pluie(bande, HASARDS[160:180], 0.3, c_oui=ORANGE_RETENUE, gauche=False, run_time=1.4,
                               lag=0.12, r=0.1)
        self.play(FadeIn(zd), anim)
        self.au_mot("7 fois sur 10")
        sept = self.t("7 fois sur 10", 40, ORANGE_RETENUE).next_to(zd, DOWN, buff=0.7)
        self.play(FadeIn(sept, scale=0.6), run_time=0.4)
        self.insister(sept, 0.3)
        self.play(Create(self.barrer(ed.lignes[0], sw=7)), run_time=0.4)
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        ed = Editeur(2, 7.4, P(-2.4, 0.6), fs=36, pas=0.75)
        self.play(FadeIn(ed), run_time=0.4)
        self.au_mot("simuler un dé")
        d = de_qui_roule(P(4.3, 0.9), cote=1.5)
        self.add(d)
        self.au_mot("randint de 1 virgule 6")
        self.play(ed.taper(0, "randint(1, 6)"), FadeIn(ed.curseur), run_time=0.8)
        self.play(Indicate(ed.morceau(0, 8, 11), color=C_NOMBRE, scale_factor=1.3), run_time=0.5)
        self.au_mot("Quel test")
        q = ed.faire(1, "if ? :")
        q.submobjects[2].set_color(ORANGE_RETENUE)
        self.play(FadeIn(q), ed.vers(1), run_time=0.5)
        self.insister(q.submobjects[2], 0.3)
        self.au_mot("compte les 6")
        d.clear_updaters()
        six = de(6, 1.5).move_to(P(4.3, 0.9))
        self.remove(d)
        self.add(six)
        self.play(Indicate(six, color=JAUNE_TITRE, scale_factor=1.2), run_time=0.5)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        ed = Editeur(1, 8.0, P(-2.0, 1.6), fs=36)
        six = de(6, 1.4).move_to(P(4.6, 1.6))
        self.add(ed, six)
        self.au_mot("On teste si")
        self.play(ed.taper(0, "if randint(1, 6) == 6:"), FadeIn(ed.curseur), run_time=1.0)
        self.au_mot("est égal à 6")
        eg = ed.morceau(0, 14, 17)
        self.play(eg.animate.set_color(VERT_OK), run_time=0.3)
        self.insister(eg, 0.3)
        self.play(Indicate(six, color=VERT_OK, scale_factor=1.2), run_time=0.4)
        self.au_mot("La fréquence")
        fq = self.t("fréquence", 44, WHITE)
        env = self.t("≈", 50, WHITE)
        f16 = frac_txt(1, 6, 46, VERT_OK)
        ligne = VGroup(fq, env, f16).arrange(RIGHT, buff=0.35).move_to(P(-1.0, -1.1))
        self.play(FadeIn(fq, shift=UP * 0.15), run_time=0.4)
        self.au_mot("autour de 1 sur 6")
        self.play(FadeIn(env), FadeIn(f16, scale=0.5), run_time=0.4)
        self.play(Create(SurroundingRectangle(f16, color=VERT_OK, buff=0.15)), run_time=0.3)
        self.insister(f16, 0.3)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        fs = 38
        l1 = self.ligne([(code_txt("random()", fs), None), ("donne un nombre entre 0 et 1", WHITE)], fs, 0.3)
        l2 = self.ligne([(code_txt("random() < p", fs), None), ("simule une probabilité p", WHITE)], fs, 0.3)
        l3 = VGroup(self.t("On compte, on divise", fs), self.t("par le nombre d'essais :", fs),
                    self.ligne([("on obtient une", WHITE), ("fréquence", VERT_OK)], fs, 0.2)
                    ).arrange(DOWN, aligned_edge=LEFT, buff=0.14)
        lignes = VGroup(*[VGroup(self.coche(), l).arrange(RIGHT, buff=0.3) for l in (l1, l2, l3)])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.5)
        if lignes.width > 11.0:
            lignes.scale_to_fit_width(11.0)
        lignes.move_to(P(-0.6, 0.35))
        for mot, l in zip(["random donne", "random plus petit que p", "On compte"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode 16")
        self.play(Write(self.chute("Épisode 16 : interpréter un échantillon", color=VERT_OK, font_size=36)))
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
        self.ecran_random()
        self.ecran_programme()
        self.ecran_resultat()
        self.ecran_autre_p()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
