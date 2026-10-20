# proba5_defi.py
# EleveAI — Maths 5e — série « Probabilités », épisode 5 (fin de série) : les défis
# (micro : proba_defi), AVEC VOIX. Paysage 16:9, CEINTURE JAUNE.
# Short jumeau : proba5_defi_short.py (deux pièces, « au moins un pile », ceinture jaune).
#
# Trois défis enchaînés, chacun « Mets pause, et cherche ! » puis sa correction :
#   · défi 1 : les lettres de CILAOS, une par papier → 3 voyelles sur 6 = 1/2 ;
#   · défi 2 : deux pièces, « au moins un pile » → l'ARBRE, 4 issues, 3 sur 4 ;
#   · défi 3 : un sac de 12 billes (6 rouges, 4 bleues, 2 vertes) → le rouge, 6/12 = 1/2.
# ⭐ Fil rouge de la série : l'ÉCHELLE de « impossible » (rouge, à gauche) à
# « certain » (vert, à droite) ; chaque probabilité trouvée vient s'y poser.
#
# ⭐ Canvas repris du coach (lib/tutor-v4/components/ProbabilitesCanvas.tsx,
# lib/canvas/ArbreProbabilitesCanvas.tsx, banque 5e/maths/probabilites.bank.ts) :
#   · « billes » (canvasUrne, proba_defi_fixed_3) : billes SANS lettre en grille de
#     min(6, max(3, ⌈√n⌉)) colonnes (4 pour 12) sur carte blanche, liseré ardoise ;
#     rouge #ef4444, bleu #3b82f6, vert #22c55e ;
#   · « arbre_proba » : carte blanche, point de départ ardoise à gauche, branches
#     gris ardoise #475569, étiquette d'un nœud intérieur AU-DESSUS du nœud,
#     étiquette d'une feuille À DROITE ;
#   · « de » (proba_defi_fixed_2) : 6 faces en grille 3 × 2 (écran final).
#
# Voix : manim/voix/5e-proba-defi.json (Julie, débit −8).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/5e/proba5_defi.py Proba5Defi -o eleveai-maths-5e-proba-defi --media_dir manim/scripts/5e/media
# Puis copier le mp4 dans manim/sorties/5e/maths/probabilites/05-defis/.

import importlib.util
import math
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402


def _charger(nom, chemin):
    """Des modules de même nom existent dans plusieurs dossiers : on charge par CHEMIN EXACT."""
    spec = importlib.util.spec_from_file_location(nom, chemin)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_SCRIPTS = Path(__file__).resolve().parents[1]
_annonce = _charger("annonce_probabilites_pour_5e_defi", _SCRIPTS / "annonce" / "annonce_probabilites.py")
_cm2 = _charger("cm2_proba_vocabulaire_pour_5e_defi", _SCRIPTS / "cm2" / "proba_vocabulaire.py")
sac_vide = _annonce.sac_vide
ARDOISE, BORD_GRIS, CARTE_FOND = _cm2.ARDOISE, _cm2.BORD_GRIS, _cm2.CARTE_FOND
carte_de = _cm2.carte_de

# couleurs du coach (COLOR_MAP de ProbabilitesCanvas.tsx)
C_ROUGE = "#ef4444"
C_BLEU = "#3b82f6"
C_VERT = "#22c55e"
BRANCHE = "#475569"          # COULEUR_BRANCHE de ArbreProbabilitesCanvas.tsx
PILE_C = JAUNE_TITRE         # pièces : PILE en jaune, FACE en orange (toute la série)
FACE_C = ORANGE_RETENUE
PAPIER = "#FEFCE8"
GRIS_ETEINT = "#6B7280"
CEINTURE = "jaune"
VOYELLES = "AEIOUY"


class Notion5e(Notion6e):
    identite = "Maths 5e — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les papiers de CILAOS ───────────────────────────────────────────────────

def papier(lettre, s=1.0):
    """Un papier plié en quatre puis déplié : la lettre noire, le coin corné."""
    w, h, c = 0.9 * s, 1.05 * s, 0.22 * s
    fond = Polygon(P(-w / 2, -h / 2), P(w / 2, -h / 2), P(w / 2, h / 2 - c), P(w / 2 - c, h / 2), P(-w / 2, h / 2),
                   fill_color=PAPIER, fill_opacity=1, stroke_color=GREY_B, stroke_width=2)
    coin = Polygon(P(w / 2 - c, h / 2), P(w / 2 - c, h / 2 - c), P(w / 2, h / 2 - c),
                   fill_color="#E5E7EB", fill_opacity=1, stroke_color=GREY_B, stroke_width=2)
    pli = DashedLine(P(-w / 2 + 0.06, 0), P(w / 2 - 0.06, 0), stroke_width=1.5, color=GREY_B, dash_length=0.06)
    l = Text(lettre, font_size=int(64 * s), color=BLACK, weight=BOLD).move_to(P(0, -0.02 * s))
    return VGroup(fond, coin, pli, l)


def papiers(mot, s=1.0, buff=0.25):
    return VGroup(*[papier(c, s) for c in mot]).arrange(RIGHT, buff=buff)


# ── canvas « billes » (sans lettre, comme canvasUrne) ───────────────────────

def bille(couleur, r=0.3):
    return Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_color=ARDOISE, stroke_width=3)


def sac_billes(couleurs, centre, pas=0.8, r=0.3):
    """Le canvas « billes » dans un sac : colonnes = min(6, max(3, ⌈√n⌉)).
    Renvoie (sac, carte, billes)."""
    n = len(couleurs)
    cols = min(6, max(3, math.ceil(math.sqrt(n))))
    lignes = math.ceil(n / cols)
    pos = [P((i % cols) * pas, -(i // cols) * pas) for i in range(n)]
    carte = RoundedRectangle(width=cols * pas + 0.3, height=lignes * pas + 0.3, corner_radius=0.2,
                             fill_color=CARTE_FOND, fill_opacity=1, stroke_color=BORD_GRIS, stroke_width=2)
    carte.move_to(P((cols - 1) * pas / 2, -(lignes - 1) * pas / 2))
    decal = centre - carte.get_center()
    carte.shift(decal)
    billes = VGroup(*[bille(c, r).move_to(p + decal) for c, p in zip(couleurs, pos)])
    corps = RoundedRectangle(width=carte.width + 0.7, height=carte.height + 0.7, corner_radius=0.5,
                             stroke_color=WHITE, stroke_width=4, fill_color="#E0F2FE",
                             fill_opacity=0.08).move_to(carte)
    col = Polygon(P(-0.7, 0), P(0.7, 0), P(0.4, 0.4), P(-0.4, 0.4), stroke_color=WHITE, stroke_width=4,
                  fill_color="#E0F2FE", fill_opacity=0.08).move_to(corps.get_top() + UP * 0.2)
    lien = Line(P(-0.5, 0), P(0.5, 0), color=ORANGE_RETENUE, stroke_width=7).move_to(corps.get_top() + UP * 0.22)
    return VGroup(corps, col, lien), carte, billes


SAC_12 = [C_ROUGE] * 6 + [C_BLEU] * 4 + [C_VERT] * 2


# ── l'échelle des probabilités (fil rouge de la série) ──────────────────────

def echelle_proba(x0, x1, y, mots=True, taille=26):
    """La barre de « impossible » (rouge, à gauche) à « certain » (vert, à droite),
    un trait au milieu. AUCUN nombre : ils n'arrivent qu'avec la voix."""
    barre = Line(P(x0, y), P(x1, y), stroke_width=12)
    barre.set_color([VERT_OK, JAUNE_TITRE, ORANGE_RETENUE, ROUGE_ERREUR])  # rouge à gauche (Manim inverse)
    traits = VGroup(*[Line(P(x, y - 0.2), P(x, y + 0.2), stroke_width=5)
                      for x in (x0, (x0 + x1) / 2, x1)])
    g = VGroup(barre, traits)
    if mots:
        g.add(Text("impossible", font_size=taille, color=ROUGE_ERREUR).next_to(P(x0, y - 0.2), DOWN, buff=0.12),
              Text("certain", font_size=taille, color=VERT_OK).next_to(P(x1, y - 0.2), DOWN, buff=0.12))
    return g


def repere(x, y, couleur=JAUNE_TITRE, h=0.55):
    """Une flèche posée sur l'échelle, au point x."""
    return Arrow(P(x, y + h), P(x, y + 0.08), buff=0, color=couleur, stroke_width=6,
                 max_tip_length_to_length_ratio=0.45)


def fraction(a, b, font_size=56, couleur=JAUNE_TITRE):
    """Une fraction empilée en Text : [0] numérateur, [1] barre, [2] dénominateur."""
    num = Text(str(a), font_size=font_size, color=couleur)
    den = Text(str(b), font_size=font_size, color=couleur)
    larg = max(num.width, den.width) + 0.2
    barre = Line(LEFT * larg / 2, RIGHT * larg / 2, stroke_width=max(3, font_size / 12), color=WHITE)
    num.next_to(barre, UP, buff=0.1)
    den.next_to(barre, DOWN, buff=0.1)
    return VGroup(num, barre, den)


# ── les pièces et l'arbre du coach ──────────────────────────────────────────

def _piece_a(t, centre, r):
    c = math.cos(t * 5)
    pile = c >= 0
    disque = Circle(radius=r, fill_color=PILE_C if pile else FACE_C, fill_opacity=1,
                    stroke_color=WHITE, stroke_width=3)
    mot = Text("PILE" if pile else "FACE", font_size=int(r * 34), color=BLACK, weight=BOLD)
    g = VGroup(disque, mot.move_to(disque))
    g.stretch(max(abs(c), 0.05), 0)
    return g.move_to(centre + UP * 0.25 * abs(math.sin(t * 2.5)))


def piece_qui_tourne(centre, r=0.75, phase=0.0):
    """La pièce qui tourne de la bande-annonce (PILE, puis FACE…), mais redessinée
    par `become` : ⛔ remplacer ses enfants dans l'updater laissait, pendant un
    `play`, l'ancien enfant dessiné sous le nouveau (deux pièces superposées)."""
    etat = {"t": phase}
    holder = _piece_a(phase, centre, r)

    def maj(m, dt):
        etat["t"] += dt
        m.become(_piece_a(etat["t"], centre, r))

    holder.add_updater(maj)
    return holder

def piece_fixe(face, r=0.6, mot=True):
    """Une pièce posée : PILE (jaune) ou FACE (orange)."""
    pile = face == "P"
    disque = Circle(radius=r, fill_color=PILE_C if pile else FACE_C, fill_opacity=1,
                    stroke_color=WHITE, stroke_width=3)
    if mot:
        txt = Text("PILE" if pile else "FACE", font_size=max(int(r * 34), 12), color=BLACK, weight=BOLD)
    else:
        txt = Text("P" if pile else "F", font_size=max(int(r * 60), 14), color=BLACK, weight=BOLD)
    return VGroup(disque, txt.move_to(disque))


ISSUES = ["PP", "PF", "FP", "FF"]
MOT = {"P": "pile", "F": "face"}


class ArbreCoach:
    """L'arbre du coach (ArbreProbabilitesCanvas.tsx) pour deux pièces, sur sa carte
    blanche : départ ardoise à gauche, branches gris ardoise, étiquette d'un nœud
    intérieur AU-DESSUS, étiquette d'une feuille À DROITE. Pas de probabilité sur
    les branches : en 5e, on COMPTE les chemins.
    chemins dans l'ordre PP, PF, FP, FF ; b2[k] est la 2e branche du chemin k, b1[k // 2] la 1re."""

    def __init__(self, x0=-6.2, y0=0.3, dx=1.95, dy1=0.9, dy2=0.45, fs=30, sw=4):
        self.racine = P(x0, y0)
        self.p1 = [P(x0 + dx, y0 + dy1), P(x0 + dx, y0 - dy1)]  # feuilles régulières (ROW_H du coach)
        self.p2 = [self.p1[0] + P(dx, dy2), self.p1[0] + P(dx, -dy2),
                   self.p1[1] + P(dx, dy2), self.p1[1] + P(dx, -dy2)]
        self.rac = Dot(self.racine, radius=0.09, color=ARDOISE)
        self.b1 = VGroup(*[Line(self.racine, p, stroke_width=sw, color=BRANCHE) for p in self.p1])
        self.b2 = VGroup(*[Line(self.p1[k // 2], p, stroke_width=sw, color=BRANCHE) for k, p in enumerate(self.p2)])
        self.l1 = VGroup(*[Text(MOT[f], font_size=fs, color=ARDOISE, weight=BOLD).next_to(p, UP, buff=0.1)
                           for f, p in zip("PF", self.p1)])
        self.l2 = VGroup(*[Text(MOT[f], font_size=fs, color=ARDOISE, weight=BOLD).next_to(p, RIGHT, buff=0.12)
                           for f, p in zip("PFPF", self.p2)])
        tout = VGroup(self.rac, self.b1, self.b2, self.l1, self.l2)
        self.carte = RoundedRectangle(width=tout.width + 0.6, height=tout.height + 0.5, corner_radius=0.2,
                                      fill_color=CARTE_FOND, fill_opacity=1, stroke_color=BORD_GRIS,
                                      stroke_width=2).move_to(tout)

    def tout(self):
        return VGroup(self.carte, self.rac, self.b1, self.b2, self.l1, self.l2)

    def chemin(self, k):
        return VGroup(self.b1[k // 2], self.b2[k])


def issue_texte(code, fs=36):
    """« pile-pile » écrit comme la voix le dit : pile en jaune, face en orange."""
    a, b = code
    g = Text(f"{MOT[a]}-{MOT[b]}", font_size=fs, color=WHITE)  # 9 glyphes : 4 + tiret + 4
    g[0:4].set_color(PILE_C if a == "P" else FACE_C)
    g[5:9].set_color(PILE_C if b == "P" else FACE_C)
    return g


# ── la vidéo ────────────────────────────────────────────────────────────────

class Proba5Defi(Notion5e):
    nom_voix = "5e-proba-defi"

    # l'échelle du bas, sur chaque correction (Ti-Margo reste à droite)
    EX0, EX1, EY = -5.6, 2.4, -2.6

    def xe(self, p):
        return self.EX0 + (self.EX1 - self.EX0) * p

    def t(self, texte, font_size=40, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.22):
        g = VGroup()
        for m, c in morceaux:
            g.add(m if isinstance(m, Mobject) else self.t(m, font_size, c))
        return g.arrange(RIGHT, buff=buff)

    def insister(self, mob, run_time=0.35):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def pause_icone(self, h=0.8, couleur=ORANGE_RETENUE):
        barres = VGroup(*[RoundedRectangle(width=h * 0.28, height=h, corner_radius=0.06, fill_color=couleur,
                                           fill_opacity=1, stroke_width=0) for _ in range(2)])
        barres.arrange(RIGHT, buff=h * 0.22)
        rond = Circle(radius=h * 0.9, stroke_color=couleur, stroke_width=5).move_to(barres)
        return VGroup(rond, barres)

    def loupe(self, s=1.0, couleur=BLEU_CALCUL):
        verre = Circle(radius=0.42, stroke_color=couleur, stroke_width=8)
        manche = Line(P(0.3, -0.3), P(0.75, -0.75), color=couleur, stroke_width=14)
        return VGroup(verre, manche).scale(s)

    def mets_pause(self, y=-2.75):
        """« Mets pause, et cherche ! » en orange (la voix le dit), le bouton pause qui bat."""
        ch = self.t("Mets pause, et cherche !", 46, ORANGE_RETENUE).move_to(P(-1.0, y))
        ic = self.pause_icone(0.34).next_to(ch, LEFT, buff=0.4)
        self.play(Write(ch), FadeIn(ic, scale=0.5), run_time=0.8)
        self.play(ic.animate.scale(1.4), run_time=0.25)
        self.play(ic.animate.scale(1 / 1.4), run_time=0.25)

    def echelle(self):
        return echelle_proba(self.EX0, self.EX1, self.EY)

    def poser(self, source, p, a, b, couleur=JAUNE_TITRE):
        """La probabilité trouvée vient se poser sur l'échelle (flèche + petite fraction)."""
        fl = repere(self.xe(p), self.EY, couleur)
        petit = fraction(a, b, 30, couleur).next_to(fl, UP, buff=0.06)
        self.play(TransformFromCopy(source, petit), GrowArrow(fl), run_time=0.7)
        self.insister(petit, 0.25)
        return VGroup(fl, petit)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def icones(self, s=1.0):
        """Les trois dessins des défis : les papiers, les deux pièces, le sac de billes."""
        i1 = papiers("CILAOS", 0.42 * s, 0.08 * s)
        i2 = VGroup(piece_fixe("P", 0.42 * s), piece_fixe("F", 0.42 * s)).arrange(RIGHT, buff=0.2 * s)
        i3 = VGroup(*sac_billes(SAC_12, ORIGIN, pas=0.36, r=0.14)).scale(s)
        return i1, i2, i3

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Les défis des probabilités", 56, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures(CEINTURE).move_to(P(-0.6, -2.75))
        self.add(ech)
        i1, i2, i3 = self.icones(1.5)
        i3.scale(0.8)
        i1.move_to(P(-4.5, -0.2))
        i2.move_to(P(-0.7, -0.2))
        i3.move_to(P(2.8, -0.2))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), run_time=0.9)
        self.play(LaggedStart(FadeIn(i1, shift=UP * 0.3), FadeIn(i2, shift=UP * 0.3),
                              FadeIn(i3, shift=UP * 0.3), lag_ratio=0.3), run_time=1.0)
        self.au_mot("de 5e")
        self.play(Indicate(identite, color=JAUNE_TITRE), run_time=0.5)
        self.attendre_voix(marge=1.0)

    # ── 01 : trois défis ────────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.au_mot("Trois défis")
        titre = self.t("Trois défis", 54, JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre), run_time=0.6)
        xs = [-4.4, -0.6, 3.2]
        cartes = VGroup(*[RoundedRectangle(width=3.2, height=2.6, corner_radius=0.2, stroke_color=BLEU_CALCUL,
                                           stroke_width=4, fill_color="#0F172A", fill_opacity=0.6).move_to(P(x, 0.9))
                          for x in xs])
        icones = self.icones()
        for c, i in zip(cartes, icones):
            if i.width > 2.7:
                i.scale_to_fit_width(2.7)
            i.move_to(c)
        nums = VGroup(*[self.t(str(k), 34, JAUNE_TITRE).move_to(c.get_corner(UL) + P(0.3, -0.3))
                        for k, c in zip((1, 2, 3), cartes)])
        self.play(LaggedStart(*[AnimationGroup(Create(c), FadeIn(i, scale=0.6), FadeIn(n))
                                for c, i, n in zip(cartes, icones, nums)], lag_ratio=0.35), run_time=1.4)
        self.au_mot("mets pause")
        ic = self.pause_icone(0.55).move_to(P(-2.4, -1.7))
        mp = self.t("pause", 48, ORANGE_RETENUE).next_to(ic, RIGHT, buff=0.35)
        self.play(FadeIn(ic, scale=0.4), FadeIn(mp, shift=LEFT * 0.2), run_time=0.5)
        self.insister(ic, 0.25)
        self.au_mot("cherche")
        lp = self.loupe(0.8).move_to(P(1.6, -1.7))
        ch = self.t("cherche", 48, BLEU_CALCUL).next_to(lp, RIGHT, buff=0.3)
        self.play(FadeIn(lp, scale=0.4), FadeIn(ch, shift=LEFT * 0.2), run_time=0.5)
        self.play(lp.animate.shift(RIGHT * 0.25 + UP * 0.1), run_time=0.3)
        self.play(lp.animate.shift(LEFT * 0.25 + DOWN * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 02 : défi 1, les lettres de CILAOS ──────────────────────────────────

    def ecran_defi1(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("02-defi1")
        titre = self.t("Défi 1", 56, JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("CILAOS")
        mot = Text("CILAOS", font_size=110, color=WHITE, weight=BOLD).move_to(P(-0.9, 1.25))
        self.play(Write(mot), run_time=0.8)
        self.au_mot("une par papier")
        pp = papiers("CILAOS", 1.15, 0.3).move_to(P(-0.9, 1.25))
        self.play(*[ReplacementTransform(mot[i], pp[i]) for i in range(6)], run_time=0.8)
        self.play(LaggedStart(*[p.animate.rotate(0.12 * (-1) ** i) for i, p in enumerate(pp)], lag_ratio=0.1),
                  run_time=0.5)
        self.au_mot("Quelle est la probabilité")
        q1 = self.t("Probabilité de tirer", 46, ORANGE_RETENUE).move_to(P(-0.9, -0.55))
        self.play(FadeIn(q1, shift=UP * 0.2), run_time=0.5)
        self.au_mot("une voyelle")
        q2 = self.t("une voyelle ?", 50, BLEU_CALCUL).next_to(q1, DOWN, buff=0.3)
        self.play(FadeIn(q2, scale=0.6), run_time=0.4)
        self.insister(q2, 0.25)
        self.au_mot("Mets pause")
        self.mets_pause()
        # les papiers se mélangent pendant qu'on cherche
        ordre = [3, 0, 5, 1, 4, 2]
        places = [p.get_center().copy() for p in pp]
        self.play(*[pp[i].animate.move_to(places[ordre[i]]) for i in range(6)], run_time=1.0,
                  rate_func=rate_functions.ease_in_out_sine)
        self.attendre_voix(marge=2.0)

    def ecran_correction1(self):
        self.clear()
        self.add_mascotte()
        self.dire("02b-correction1")
        self.titre_ecran("Correction")
        pp = papiers("CILAOS", 0.95, 0.22).move_to(P(-1.9, 1.5))
        ech = self.echelle()
        self.play(FadeIn(pp), FadeIn(ech), run_time=0.4)
        for ex, p in zip(["C,", "I,", "L,", "A,", "O,", "S :"], pp):
            self.au_mot(ex)
            self.play(p.animate.scale(1.25), run_time=0.15)
            self.play(p.animate.scale(1 / 1.25), run_time=0.15)
        self.au_mot("6 papiers")
        acc = Brace(pp, DOWN, color=WHITE, buff=0.12)
        six = self.ligne([("6", JAUNE_TITRE), ("papiers", WHITE)], 40, 0.18).next_to(acc, DOWN, buff=0.12)
        self.play(GrowFromCenter(acc), FadeIn(six, shift=UP * 0.15), run_time=0.5)
        self.insister(six[0], 0.25)
        self.au_mot("Voyelles")
        voy = [i for i, c in enumerate("CILAOS") if c in VOYELLES]
        con = [i for i in range(6) if i not in voy]
        self.play(*[pp[i].animate.set_opacity(0.3) for i in con], FadeOut(acc), FadeOut(six), run_time=0.4)
        self.au_mot("I, A, O")
        for i in voy:
            self.play(pp[i].animate.shift(UP * 0.25), pp[i][0].animate.set_stroke(VERT_OK, 6), run_time=0.25)
        self.au_mot("trois")
        trois = self.ligne([("3", JAUNE_TITRE), ("voyelles", VERT_OK)], 44, 0.18).move_to(P(-1.9, 0.25))
        self.play(FadeIn(trois, scale=0.6), run_time=0.4)
        self.insister(trois[0], 0.25)
        self.au_mot("3 sur 6")
        f36 = fraction(3, 6, 64).move_to(P(2.9, 1.3))
        self.play(FadeIn(f36[0], shift=DOWN * 0.2), Create(f36[1]), FadeIn(f36[2], shift=UP * 0.2), run_time=0.5)
        self.au_mot("un demi")
        egal = self.t("=", 64).next_to(f36, RIGHT, buff=0.3)
        f12 = fraction(1, 2, 64, VERT_OK).next_to(egal, RIGHT, buff=0.3)
        # les voyelles d'un côté, les consonnes de l'autre : la moitié des papiers
        cibles = [P(-5.4 + 1.2 * k, 1.5) for k in range(3)] + [P(-1.4 + 1.2 * k, 1.5) for k in range(3)]
        self.play(*[pp[i].animate.move_to(c + (UP * 0.25 if i in voy else ORIGIN))
                    for i, c in zip(voy + con, cibles)],
                  FadeIn(egal), FadeIn(f12, scale=0.6), run_time=0.7)
        mil = DashedLine(P(-2.2, 2.35), P(-2.2, 0.75), color=WHITE, stroke_width=4)
        self.play(Create(mil), run_time=0.3)
        self.poser(f12, 0.5, 1, 2, VERT_OK)
        self.attendre_voix(marge=1.0)

    # ── 03 : défi 2, deux pièces ────────────────────────────────────────────

    def ecran_defi2(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("03-defi2")
        titre = self.t("Défi 2", 56, JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("deux pièces")
        c1, c2 = P(-4.6, 0.9), P(-2.4, 0.9)
        t1 = piece_qui_tourne(c1, 0.85)
        t2 = piece_qui_tourne(c2, 0.85)
        self.add(t1)
        self.wait(0.25)
        self.add(t2)
        deux = self.ligne([("2", JAUNE_TITRE), ("pièces", WHITE)], 44, 0.18).move_to(P(-3.5, -0.75))
        self.play(FadeIn(deux, shift=UP * 0.2), run_time=0.4)
        self.au_mot("Quelle est la probabilité")
        q1 = self.t("Probabilité", 48, ORANGE_RETENUE).move_to(P(2.0, 1.6))
        self.play(FadeIn(q1, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("au moins un pile")
        q2 = self.ligne([("au moins un", BLEU_CALCUL), ("pile", PILE_C), ("?", BLEU_CALCUL)], 50, 0.2)
        q2.move_to(P(2.0, 0.6))
        self.play(FadeIn(q2, scale=0.6), run_time=0.4)
        self.insister(q2[0], 0.25)
        self.au_mot("Mets pause")
        self.mets_pause()
        self.attendre_voix(marge=2.0)
        t1.clear_updaters()
        t2.clear_updaters()

    def ecran_correction2(self):
        self.clear()
        self.add_mascotte()
        self.dire("03b-correction2")
        self.titre_ecran("Correction")
        a = ArbreCoach(x0=-6.2, y0=0.6, dx=1.9, dy1=1.0, dy2=0.5)
        ech = self.echelle()
        self.play(FadeIn(a.carte), FadeIn(a.rac), FadeIn(ech), run_time=0.4)
        self.play(Create(a.b1), FadeIn(a.l1), run_time=0.6)
        self.play(Create(a.b2), FadeIn(a.l2), run_time=0.6)
        self.au_mot("4 issues")
        quatre = self.ligne([("4", JAUNE_TITRE), ("issues", WHITE)], 46, 0.18).move_to(P(4.2, 1.9))
        self.play(FadeIn(quatre, scale=0.6), run_time=0.4)
        issues = VGroup()
        extraits = ["pile-pile,", "pile-face,", "face-pile,", "face-face."]
        for k, (ex, code) in enumerate(zip(extraits, ISSUES)):
            self.au_mot(ex)
            it = issue_texte(code, 36)
            it.next_to(P(-0.6, a.p2[k][1]), RIGHT, buff=0)
            chemin = a.chemin(k).copy().set_stroke(JAUNE_TITRE, 8)
            self.play(ShowPassingFlash(chemin, time_width=0.7), FadeIn(it, shift=LEFT * 0.2), run_time=0.4)
            issues.add(it)
        self.insister(quatre[0], 0.25)
        self.au_mot("Au moins un pile")
        amp = self.ligne([("au moins un", BLEU_CALCUL), ("pile", PILE_C)], 38, 0.18).move_to(P(4.4, 0.8))
        self.play(FadeIn(amp, shift=LEFT * 0.2), run_time=0.4)
        self.au_mot("les 3 premières")
        verts = VGroup(*[a.chemin(k).copy().set_stroke(VERT_OK, 7) for k in range(3)])
        cadre = SurroundingRectangle(issues[:3], color=VERT_OK, buff=0.12, stroke_width=4)
        self.play(Create(verts), Create(cadre), issues[3].animate.set_opacity(0.3),
                  a.chemin(3).animate.set_stroke(opacity=0.3), run_time=0.6)
        self.au_mot("3 sur 4")
        f34 = fraction(3, 4, 64, VERT_OK).move_to(P(4.2, -0.6))
        self.play(FadeIn(f34[0], shift=DOWN * 0.2), Create(f34[1]), FadeIn(f34[2], shift=UP * 0.2), run_time=0.5)
        self.insister(f34, 0.25)
        self.poser(f34, 0.75, 3, 4, VERT_OK)
        self.attendre_voix(marge=1.0)

    # ── 04 : défi 3, le sac de 12 billes ────────────────────────────────────

    def compte(self, n, mot, couleur, y, fs=44):
        """« 6 rouges » : les nombres alignés à droite, les mots à gauche (une colonne propre)."""
        nb = self.t(str(n), fs, JAUNE_TITRE).move_to(P(0, y)).align_to(P(1.4, 0), RIGHT)
        m = self.t(mot, fs, couleur).next_to(nb, RIGHT, buff=0.18)
        return VGroup(nb, m)

    def ecran_defi3(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("04-defi3")
        titre = self.t("Défi 3", 56, JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre), run_time=0.5)
        sac, carte, billes = sac_billes(SAC_12, P(-3.6, 0.35))
        self.au_mot("Un sac de 12 billes")
        self.play(Create(sac), FadeIn(carte), run_time=0.5)
        l12 = self.compte(12, "billes", WHITE, 2.0)
        self.play(FadeIn(l12, shift=LEFT * 0.2), run_time=0.4)
        for (a, b, n, mot, coul, y), ex in zip([(0, 6, 6, "rouges", C_ROUGE, 1.2), (6, 10, 4, "bleues", C_BLEU, 0.5),
                                                (10, 12, 2, "vertes", C_VERT, -0.2)],
                                               ["6 rouges", "4 bleues", "2 vertes"]):
            self.au_mot(ex)
            l = self.compte(n, mot, coul, y)
            self.play(LaggedStart(*[FadeIn(bb, shift=DOWN * 0.6, scale=0.4) for bb in billes[a:b]], lag_ratio=0.12),
                      FadeIn(l, shift=LEFT * 0.2), run_time=0.4 + 0.1 * n)
        self.au_mot("Quelle couleur")
        q1 = self.t("Quelle couleur ?", 44, ORANGE_RETENUE).move_to(P(2.3, -1.05))
        self.play(FadeIn(q1, scale=0.6), run_time=0.4)
        self.au_mot("avec quelle probabilité")
        q2 = self.t("Probabilité ?", 44, ORANGE_RETENUE).next_to(q1, DOWN, buff=0.25)
        self.play(FadeIn(q2, scale=0.6), run_time=0.4)
        self.au_mot("Mets pause")
        self.mets_pause()
        self.play(Wiggle(VGroup(sac, carte, billes), scale_value=1.05, rotation_angle=0.03 * TAU), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction3(self):
        self.clear()
        self.add_mascotte()
        self.dire("04b-correction3")
        self.titre_ecran("Correction")
        sac, carte, billes = sac_billes(SAC_12, P(-3.5, 0.65), pas=0.7, r=0.27)
        ech = self.echelle()
        self.play(FadeIn(VGroup(sac, carte, billes)), FadeIn(ech), run_time=0.4)
        self.au_mot("Le rouge")
        rouge = self.t("le rouge", 52, C_ROUGE).move_to(P(2.0, 1.75))
        self.play(FadeIn(rouge, shift=LEFT * 0.2), billes[6:].animate.set_opacity(0.3),
                  *[b.animate.scale(1.2) for b in billes[:6]], run_time=0.4)
        self.play(*[b.animate.scale(1 / 1.2) for b in billes[:6]], run_time=0.2)
        self.au_mot("6 sur 12")
        f = fraction(6, 12, 60).move_to(P(1.1, 0.2))
        self.play(FadeIn(f[0], shift=DOWN * 0.2), Create(f[1]), FadeIn(f[2], shift=UP * 0.2), run_time=0.45)
        self.au_mot("un demi")
        egal = self.t("=", 60).next_to(f, RIGHT, buff=0.3)
        f12 = fraction(1, 2, 60, VERT_OK).next_to(egal, RIGHT, buff=0.3)
        self.play(FadeIn(egal), FadeIn(f12, scale=0.6), run_time=0.4)
        self.poser(f12, 0.5, 1, 2, VERT_OK)
        self.attendre_voix(marge=1.0)

    # ── 05 : ce que tu as appris ────────────────────────────────────────────

    def mini_arbre(self):
        a = ArbreCoach(x0=0, y0=0, dx=1.0, dy1=0.5, dy2=0.25, fs=16, sw=3)
        return a.tout()

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        self.dire("05-finale")
        self.play(Write(self.t("Ce que tu as appris", 48, JAUNE_TITRE).to_edge(UP)), run_time=0.8)
        i1 = self.mini_arbre()
        i2 = carte_de(0.36, 0.06)[0]
        i3 = VGroup(*sac_billes(SAC_12, ORIGIN, pas=0.3, r=0.11))
        ys = [1.95, 0.4, -0.95]
        for ic, y in zip((i1, i2, i3), ys):
            ic.scale_to_fit_height(1.0).move_to(P(-5.4, y))
        l1a = self.t("Compter les issues", 42)
        l1b = self.t("avec un arbre si besoin", 34, BLEU_CALCUL)
        l1 = VGroup(self.coche(taille=0.28), l1a).arrange(RIGHT, buff=0.3)
        l2 = VGroup(self.coche(taille=0.28), self.t("Vérifier l'équiprobabilité", 42)).arrange(RIGHT, buff=0.3)
        fr = VGroup(self.t("favorables", 36, VERT_OK), Line(LEFT * 1.1, RIGHT * 1.1, stroke_width=4),
                    self.t("possibles", 36, BLEU_CALCUL)).arrange(DOWN, buff=0.1)
        l3 = VGroup(self.coche(taille=0.28), self.t("Puis", 42), fr).arrange(RIGHT, buff=0.3)
        for l, y in zip((l1, l2, l3), ys):
            l.move_to(P(0, y)).align_to(P(-4.6, 0), LEFT)
        l1b.next_to(l1a, DOWN, buff=0.15).align_to(l1a, LEFT)
        self.au_mot("Compter les issues")
        self.play(FadeIn(l1a, shift=RIGHT * 0.2), FadeIn(i1, scale=0.5), run_time=0.5)
        self.play(Create(l1[0]), run_time=0.3)
        self.au_mot("avec un arbre")
        self.play(FadeIn(l1b, shift=RIGHT * 0.2), Indicate(i1, color=JAUNE_TITRE, scale_factor=1.15), run_time=0.6)
        self.au_mot("Vérifier")
        self.play(FadeIn(l2[1], shift=RIGHT * 0.2), FadeIn(i2, scale=0.5), run_time=0.5)
        self.play(Create(l2[0]), run_time=0.3)
        self.au_mot("Puis favorables")
        self.play(FadeIn(l3[1]), FadeIn(fr[0], shift=DOWN * 0.15), FadeIn(i3, scale=0.5), run_time=0.5)
        self.au_mot("sur possibles")
        self.play(Create(fr[1]), FadeIn(fr[2], shift=UP * 0.15), run_time=0.4)
        self.play(Create(l3[0]), run_time=0.3)
        self.au_mot("Bravo")
        bravo = self.t("Bravo !", 60, JAUNE_TITRE).move_to(P(-4.0, -2.45))
        self.play(FadeIn(bravo, scale=0.5), run_time=0.4)
        self.play(Flash(bravo, color=JAUNE_TITRE, line_length=0.35, num_lines=14), run_time=0.6)
        self.au_mot("tu as fini la série")
        fini = self.t("Tu as fini la série !", 46, VERT_OK).next_to(bravo, RIGHT, buff=0.7)
        self.play(FadeIn(fini, shift=LEFT * 0.2), run_time=0.5)
        self.play(Indicate(fini, color=VERT_OK, scale_factor=1.15), run_time=0.6)
        self.attendre_voix(marge=1.0)

    # ── 06 : la fin (règle du 19/10 : « Entraîne-toi sur éleveai point f r. Et abonne-toi ! ») ──

    def page_abonnement(self, voix="06-abonne"):
        """« Entraîne-toi sur » + eleveai.fr encadré, puis « Abonne-toi ! » + @eleveai974."""
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
        self.ecran_defi1()
        self.ecran_correction1()
        self.ecran_defi2()
        self.ecran_correction2()
        self.ecran_defi3()
        self.ecran_correction3()
        self.ecran_finale()
        self.page_abonnement(voix="06-abonne")
