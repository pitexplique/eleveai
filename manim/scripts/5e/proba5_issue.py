# proba5_issue.py
# EleveAI — Maths 5e — série « Probabilités », épisode 2 : lister les issues
# de deux épreuves (micro : proba_issue), AVEC VOIX. Paysage 16:9, CEINTURE JAUNE.
# Short jumeau : proba5_issue_short.py (ceinture jaune, « une de chaque »).
#
# Écrans : 00 garde · 01 deux pièces (1 € puis 2 €) · 02 l'ARBRE construit
# branche par branche · 03 les 4 chemins lus, chacun s'allume quand la voix le
# dit · 04 le TABLEAU 6 × 6 de deux dés (cases vides : la voix ne dit aucune
# somme) · 05 le piège « 3 issues » : « une de chaque » = 2 chemins · 06 défi
# · 06b correction · 07 ce que tu as appris · 08 abonnement.
#
# ⭐ Canvas repris du coach :
#   · ARBRE (lib/canvas/ArbreProbabilitesCanvas.tsx) : point de départ à
#     gauche, colonnes de nœuds vers la droite, feuilles réparties
#     régulièrement, un nœud intérieur à mi-hauteur de ses enfants ; l'étiquette
#     d'un nœud INTÉRIEUR au-dessus de lui (centrée), celle d'une FEUILLE à sa
#     droite ; branches grises fines. Ici sans probabilité sur les branches (la
#     voix n'en dit aucune).
#   · TABLEAU (ProbabilitesCanvas.tsx, variant « tableau ») : en-têtes sur fond
#     gris clair, cases à bordure fine, case active surlignée en ambre ; les
#     en-têtes sont les faces des dés (le dé « de » du coach : blanc, points
#     noirs).
# Pièces : PILE en JAUNE, FACE en ORANGE (comme la 3e et la bande-annonce).
#
# Voix : manim/voix/5e-proba-issue.json (débit −8).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/5e/proba5_issue.py Proba5Issue -o eleveai-maths-5e-proba-issue --media_dir manim/scripts/5e/media
# Puis copier le mp4 dans manim/sorties/5e/maths/probabilites/02-issues/.

import importlib.util
import math
import sys
from pathlib import Path

import numpy as np

ICI = Path(__file__).resolve().parent
SCRIPTS = ICI.parent
sys.path.insert(0, str(SCRIPTS.parent))
sys.path.insert(0, str(SCRIPTS / "seconde"))


def _charger(nom, chemin):
    """Charge un module PAR SON CHEMIN (des homonymes existent ailleurs)."""
    if nom in sys.modules:
        return sys.modules[nom]
    spec = importlib.util.spec_from_file_location(nom, chemin)
    mod = importlib.util.module_from_spec(spec)
    sys.modules[nom] = mod
    spec.loader.exec_module(mod)
    return mod


from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Notion6e  # noqa: E402

_ech = _charger("signes_expression_2de_pour_5e", SCRIPTS / "seconde" / "signes_expression_2de.py")
_ann = _charger("annonce_probabilites_pour_5e", SCRIPTS / "annonce" / "annonce_probabilites.py")
echelle_ceintures = _ech.echelle_ceintures
de = _ann.de
de_qui_roule = _ann.de_qui_roule

PILE_C = JAUNE_TITRE
FACE_C = ORANGE_RETENUE
OR_EURO = "#D4A017"
ARGENT_EURO = "#CBD5E1"
BRANCHE = "#94A3B8"
AMBRE = "#FEF3C7"


class Notion5e(Notion6e):
    identite = "Maths 5e — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les pièces ──────────────────────────────────────────────────────────────

def piece_euro(valeur, r=0.6):
    """Une pièce de 1 € (cœur argent, anneau or) ou de 2 € (cœur or, anneau argent)."""
    anneau_c, coeur_c = (OR_EURO, ARGENT_EURO) if valeur == 1 else (ARGENT_EURO, OR_EURO)
    anneau = Circle(radius=r, fill_color=anneau_c, fill_opacity=1, stroke_color=WHITE, stroke_width=3)
    coeur = Circle(radius=r * 0.68, fill_color=coeur_c, fill_opacity=1, stroke_color="#475569", stroke_width=1.5)
    txt = Text(f"{valeur} €", font_size=max(int(r * 48), 12), color="#111827", weight=BOLD)
    return VGroup(anneau, coeur, txt.move_to(coeur))


def euro_qui_tourne(centre, valeur, r=0.6, vitesse=6.0, phase=0.0):
    """Une pièce en euros qui tourne SANS FIN sur elle-même (updater)."""
    etat = {"t": phase}

    def faire(t):
        c = math.cos(t * vitesse)
        g = piece_euro(valeur, r)
        g.stretch(max(abs(c), 0.06), 0)
        return g.move_to(centre + UP * 0.2 * abs(math.sin(t * 2.5)))

    holder = faire(phase)

    # ⛔ 20/10 : `become` (même structure anneau + cœur + texte à chaque image) et non
    # remove/add — remplacer les enfants laissait, pendant un `play`, l'ancienne pièce dessinée dessous.
    def maj(m, dt):
        etat["t"] += dt
        m.become(faire(etat["t"]))

    holder.add_updater(maj)
    return holder


def jeton(face, r=0.26):
    """Un petit jeton P (jaune) ou F (orange)."""
    pile = face == "P"
    d = Circle(radius=r, fill_color=PILE_C if pile else FACE_C, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    return VGroup(d, Text("P" if pile else "F", font_size=int(r * 80), color=BLACK, weight=BOLD).move_to(d))


def issue_txt(a, b, fs=34):
    """« pile-face » : pile en jaune, face en orange, un seul tiret blanc."""
    mot = {"P": "pile", "F": "face"}
    coul = {"P": PILE_C, "F": FACE_C}
    t = Text(f"{mot[a]}-{mot[b]}", font_size=fs, weight=BOLD)  # 9 glyphes : 4 + tiret + 4
    t[0:4].set_color(coul[a])
    t[5:9].set_color(coul[b])
    return t


# ── l'arbre, à la manière du canvas du coach ────────────────────────────────

class Arbre:
    """L'arbre de deux pièces (1re : pile / face ; 2e : pile / face).

    Comme ArbreProbabilitesCanvas : départ à gauche, feuilles régulièrement
    espacées, nœud intérieur à mi-hauteur de ses enfants, étiquette d'un nœud
    intérieur AU-DESSUS, étiquette d'une feuille À DROITE.
    Chemins dans l'ordre : PP, PF, FP, FF ; `chemin(k)` = ses deux branches.
    """

    def __init__(self, racine, dx=2.6, pas=1.15, fs=32, fs_issue=34, x_issue=1.5, sw=4):
        self.racine = racine
        self.sw = sw
        y_haut = racine[1] + 1.5 * pas
        self.p2 = [P(racine[0] + 2 * dx, y_haut - k * pas) for k in range(4)]
        self.p1 = [P(racine[0] + dx, (self.p2[0][1] + self.p2[1][1]) / 2),
                   P(racine[0] + dx, (self.p2[2][1] + self.p2[3][1]) / 2)]
        self.rac = Dot(racine, radius=0.09, color=WHITE)
        self.b1 = VGroup(*[Line(racine, p, stroke_width=sw, color=BRANCHE) for p in self.p1])
        self.b2 = VGroup(*[Line(self.p1[k // 2], p, stroke_width=sw, color=BRANCHE) for k, p in enumerate(self.p2)])
        mots = {"P": ("pile", PILE_C), "F": ("face", FACE_C)}
        # nœud intérieur : étiquette centrée sur lui, du côté OPPOSÉ à la branche
        # qui arrive (au-dessus pour « pile », en dessous pour « face »)
        self.l1 = VGroup(*[Text(mots[f][0], font_size=fs, color=mots[f][1], weight=BOLD)
                           .next_to(p, UP if f == "P" else DOWN, buff=0.12) for f, p in zip("PF", self.p1)])
        self.l2 = VGroup(*[Text(mots[f][0], font_size=fs, color=mots[f][1], weight=BOLD).next_to(p, RIGHT, buff=0.12)
                           for f, p in zip("PFPF", self.p2)])
        self.issues = VGroup()
        for k, (a, b) in enumerate(["PP", "PF", "FP", "FF"]):
            t = issue_txt(a, b, fs_issue)
            t.move_to(P(self.p2[k][0] + x_issue + t.width / 2, self.p2[k][1]))
            self.issues.add(t)

    def tout(self, issues=True):
        g = VGroup(self.b1, self.b2, self.rac, self.l1, self.l2)
        if issues:
            g.add(self.issues)
        return g

    def chemin(self, k):
        return VGroup(self.b1[k // 2], self.b2[k])

    def allumer(self, k, couleur=WHITE, sw=9):
        return [b.animate.set_stroke(couleur, sw) for b in self.chemin(k)]

    def eteindre(self, k):
        return [b.animate.set_stroke(BRANCHE, self.sw) for b in self.chemin(k)]


class Proba5Issue(Notion5e):
    nom_voix = "5e-proba-issue"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.22):
        return VGroup(*[m if isinstance(m, Mobject) else self.t(m[0], font_size, m[1]) for m in morceaux]
                      ).arrange(RIGHT, buff=buff)

    def insister(self, mob, run_time=0.4):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def barrer(self, mob, color=ROUGE_ERREUR, sw=6):
        return Line(mob.get_corner(DL) + LEFT * 0.08, mob.get_corner(UR) + RIGHT * 0.08,
                    stroke_width=sw, color=color)

    def arbre(self):
        return Arbre(P(-6.0, -0.35), dx=2.6, pas=1.2, x_issue=1.45)

    def entetes_pieces(self, A, y=2.45, r=0.34):
        """Au-dessus de chaque colonne de l'arbre, la pièce qu'elle représente."""
        return VGroup(piece_euro(1, r).move_to(P(A.p1[0][0], y)), piece_euro(2, r).move_to(P(A.p2[0][0], y)))

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Lister toutes les issues", 52, JAUNE_TITRE).to_edge(UP, buff=0.6)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("jaune").move_to(P(-0.6, -2.55))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=1.0)
        p1 = euro_qui_tourne(P(-2.0, 0.65), 1, 0.85)
        p2 = euro_qui_tourne(P(0.8, 0.65), 2, 0.85, vitesse=5.0, phase=0.6)
        self.add(p1, p2)
        self.au_mot("sans en oublier")
        q = self.t("… sans en oublier !", 42, BLEU_CALCUL).move_to(P(-0.6, -1.05))
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.5)
        self.insister(q, 0.35)
        self.attendre_voix(marge=1.2)
        for m in (p1, p2):
            m.clear_updaters()

    # ── 01 : la situation ───────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("Deux pièces")
        self.au_mot("une pièce de 1 euro")
        p1 = euro_qui_tourne(P(-3.6, 0.7), 1, 1.0)
        self.add(p1)
        l1 = self.t("1 €", 40, OR_EURO).move_to(P(-3.6, -0.75))
        self.play(FadeIn(l1, shift=UP * 0.2), run_time=0.4)
        self.au_mot("une pièce de 2 euros")
        p2 = euro_qui_tourne(P(1.6, 0.7), 2, 1.0, vitesse=5.0, phase=0.6)
        self.add(p2)
        l2 = self.t("2 €", 40, OR_EURO).move_to(P(1.6, -0.75))
        self.play(FadeIn(l2, shift=UP * 0.2), run_time=0.4)
        self.au_mot("Que peut-il arriver")
        q = self.t("Que peut-il arriver ?", 44, BLEU_CALCUL).move_to(P(-1.0, -2.2))
        self.play(Write(q), run_time=0.8)
        self.insister(q, 0.35)
        self.attendre_voix(marge=0.8)
        for m in (p1, p2):
            m.clear_updaters()

    # ── 02 : l'arbre, branche par branche ───────────────────────────────────

    def ecran_arbre(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-arbre")
        self.titre_ecran("On fait un arbre")
        A = self.arbre()
        tetes = self.entetes_pieces(A)
        self.au_mot("On fait un arbre")
        self.play(FadeIn(A.rac, scale=3), run_time=0.4)
        self.au_mot("Première pièce")
        self.play(FadeIn(tetes[0], shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("pile ou face. Puis")
        for b, l in zip(A.b1, A.l1):
            self.play(Create(b), run_time=0.35)
            self.play(FadeIn(l, scale=0.6), run_time=0.25)
        self.au_mot("pour chacune")
        cad = VGroup(*[SurroundingRectangle(l, color=WHITE, buff=0.08) for l in A.l1])
        self.play(Create(cad), run_time=0.4)
        self.play(FadeOut(cad), run_time=0.3)
        self.au_mot("la deuxième pièce")
        self.play(FadeIn(tetes[1], shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("deuxième pièce : pile ou face")
        for b, l in zip(A.b2, A.l2):
            self.play(Create(b), run_time=0.3)
            self.play(FadeIn(l, scale=0.6), run_time=0.2)
        self.attendre_voix(marge=0.8)
        return A

    # ── 03 : on lit les chemins ─────────────────────────────────────────────

    def ecran_liste(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-liste")
        self.titre_ecran("On lit les chemins")
        A = self.arbre()
        self.add(A.tout(issues=False), self.entetes_pieces(A))
        extraits = ["pile-pile", "pile-face", "face-pile", "face-face"]
        for k, ex in enumerate(extraits):
            self.au_mot(ex)
            self.play(*A.allumer(k), FadeIn(A.issues[k], shift=LEFT * 0.3), run_time=0.45)
            self.play(*A.eteindre(k), run_time=0.3)
        self.au_mot("4 issues")
        acc = Brace(A.issues, RIGHT, color=WHITE)
        quatre = self.ligne([("4", JAUNE_TITRE), ("issues", VERT_OK)], 44, 0.2).next_to(acc, RIGHT, buff=0.25)
        self.play(GrowFromCenter(acc), FadeIn(quatre, shift=LEFT * 0.2), run_time=0.5)
        self.insister(quatre[0], 0.35)
        self.attendre_voix(marge=0.8)

    # ── 04 : deux dés, un tableau 6 × 6 ─────────────────────────────────────

    def ecran_tableau(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-tableau")
        self.titre_ecran("Deux dés : un tableau")
        self.au_mot("Avec deux dés")
        d1 = de_qui_roule(P(-5.6, 0.9), 0.95)
        d2 = de_qui_roule(P(-5.6, -0.7), 0.95, faces=[2, 6, 4, 1, 5, 3])
        self.add(d1, d2)

        cote, x0, y0 = 0.62, -2.7, 1.75  # coin haut-gauche de la grille
        def centre(i, j):  # ligne i, colonne j
            return P(x0 + cote * (j + 0.5), y0 - cote * (i + 0.5))
        cases = VGroup(*[Square(cote, stroke_color=GREY_B, stroke_width=1.5, fill_color=AMBRE, fill_opacity=0)
                         .move_to(centre(i, j)) for i in range(6) for j in range(6)])
        fond_l = VGroup(*[Square(cote, stroke_color=GREY_B, stroke_width=1.5, fill_color="#F1F5F9", fill_opacity=1)
                          .move_to(centre(i, -1)) for i in range(6)])
        fond_c = VGroup(*[Square(cote, stroke_color=GREY_B, stroke_width=1.5, fill_color="#F1F5F9", fill_opacity=1)
                          .move_to(centre(-1, j)) for j in range(6)])
        lignes = VGroup(*[de(i + 1, 0.44).move_to(centre(i, -1)) for i in range(6)])
        colonnes = VGroup(*[de(j + 1, 0.44).move_to(centre(-1, j)) for j in range(6)])
        xl = 3.4

        self.au_mot("un tableau est plus pratique")
        self.play(Create(cases), run_time=0.8)
        self.au_mot("6 lignes")
        d1.clear_updaters()
        self.play(LaggedStart(*[FadeIn(VGroup(f, d), shift=RIGHT * 0.2) for f, d in zip(fond_l, lignes)],
                              lag_ratio=0.15), run_time=0.8)
        l1 = self.ligne([("6", JAUNE_TITRE), ("lignes", WHITE)], 36, 0.18).move_to(P(xl, 1.5))
        self.play(FadeIn(l1), run_time=0.3)
        self.au_mot("6 colonnes")
        d2.clear_updaters()
        self.play(LaggedStart(*[FadeIn(VGroup(f, d), shift=DOWN * 0.2) for f, d in zip(fond_c, colonnes)],
                              lag_ratio=0.15), run_time=0.8)
        l2 = self.ligne([("6", JAUNE_TITRE), ("colonnes", WHITE)], 36, 0.18).next_to(l1, DOWN, buff=0.3).align_to(l1, LEFT)
        self.play(FadeIn(l2), run_time=0.3)
        self.au_mot("36 cases")
        l3 = self.ligne([("36", JAUNE_TITRE), ("cases", WHITE)], 36, 0.18).next_to(l2, DOWN, buff=0.3).align_to(l1, LEFT)
        self.play(LaggedStart(*[c.animate.set_fill(AMBRE, 0.85) for c in cases], lag_ratio=0.04),
                  FadeIn(l3), run_time=1.3)
        self.au_mot("36 issues")
        l4 = self.ligne([("36", JAUNE_TITRE), ("issues", VERT_OK)], 44, 0.2).next_to(l3, DOWN, buff=0.5).align_to(l1, LEFT)
        self.play(FadeIn(l4, scale=0.7), run_time=0.4)
        self.insister(l4, 0.35)
        self.attendre_voix(marge=0.8)

    # ── 05 : le piège « une de chaque » ─────────────────────────────────────

    def boite(self, mot, faces, y, x=-4.5):
        jt = VGroup(*[jeton(f, 0.25) for f in faces]).arrange(RIGHT, buff=0.08)
        txt = self.t(mot, 30)
        contenu = VGroup(jt, txt).arrange(RIGHT, buff=0.25)
        cadre = RoundedRectangle(width=4.4, height=1.0, corner_radius=0.15, stroke_color=ROUGE_ERREUR,
                                 stroke_width=3, fill_color="#0F172A", fill_opacity=0.6).move_to(P(x, y))
        contenu.move_to(cadre)
        return VGroup(cadre, contenu)

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège")
        self.au_mot("3 issues")
        trois = self.ligne([("3", JAUNE_TITRE), ("issues ?", ROUGE_ERREUR)], 42, 0.18).move_to(P(-4.5, 2.35))
        self.play(FadeIn(trois, scale=0.7), run_time=0.4)
        boites = []
        for ex, mot, faces, y in [("deux piles", "deux piles", "PP", 1.25),
                                  ("deux faces", "deux faces", "FF", -0.05),
                                  ("une de chaque", "une de chaque", "PF", -1.35)]:
            self.au_mot(ex)
            b = self.boite(mot, faces, y)
            self.play(FadeIn(b, shift=RIGHT * 0.3), run_time=0.4)
            boites.append(b)

        A = Arbre(P(-1.5, -0.35), dx=1.5, pas=0.95, fs=26, fs_issue=28, x_issue=1.25, sw=3)
        self.au_mot("Une de chaque")
        self.play(FadeIn(A.rac), LaggedStart(*[Create(b) for b in A.b1], lag_ratio=0.3), run_time=0.5)
        self.play(FadeIn(A.l1), LaggedStart(*[Create(b) for b in A.b2], lag_ratio=0.2), run_time=0.6)
        self.play(FadeIn(A.l2), FadeIn(A.issues), run_time=0.4)
        self.au_mot("2 chemins")
        b3 = boites[2]
        self.play(b3[0].animate.set_stroke(VIOLET_ACCENT, 6), run_time=0.3)
        deux = self.ligne([("=", WHITE), ("2", JAUNE_TITRE), ("chemins", VIOLET_ACCENT)], 36, 0.18)
        deux.next_to(b3, DOWN, buff=0.3)
        self.play(FadeIn(deux, shift=UP * 0.15), run_time=0.4)
        self.insister(deux[1], 0.3)
        for ex, k in (("pile-face et", 1), ("face-pile", 2)):
            self.au_mot(ex)
            cad = SurroundingRectangle(A.issues[k], color=VIOLET_ACCENT, buff=0.08, stroke_width=4)
            self.play(*A.allumer(k, VIOLET_ACCENT, 7), Create(cad), run_time=0.5)
        self.play(Create(self.barrer(trois)), run_time=0.4)
        self.attendre_voix(marge=0.8)

    # ── 06 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("On lance deux pièces")
        p1 = euro_qui_tourne(P(-2.6, 1.0), 1, 0.85)
        p2 = euro_qui_tourne(P(1.4, 1.0), 2, 0.85, vitesse=5.0, phase=0.6)
        self.add(p1, p2)
        self.au_mot("Combien")
        q1 = self.t("Combien d'issues donnent", 40).move_to(P(-0.6, -0.7))
        q2 = self.ligne([("exactement", WHITE), ("un pile", PILE_C), ("?", WHITE)], 40, 0.2).next_to(q1, DOWN, buff=0.2)
        self.play(FadeIn(q1, shift=UP * 0.15), run_time=0.4)
        self.au_mot("exactement un pile")
        self.play(FadeIn(q2, shift=UP * 0.15), run_time=0.4)
        self.insister(q2[1], 0.35)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)
        for m in (p1, p2):
            m.clear_updaters()

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("06b-correction")
        self.titre_ecran("Correction")
        A = self.arbre()
        self.add(A.tout(), self.entetes_pieces(A))
        self.au_mot("Pile-face et")
        cads = VGroup()
        for k, ex in ((1, "Pile-face"), (2, "face-pile")):
            self.au_mot(ex)
            c = SurroundingRectangle(A.issues[k], color=VERT_OK, buff=0.08, stroke_width=4)
            self.play(*A.allumer(k, VERT_OK, 8), Create(c), run_time=0.45)
            cads.add(c)
        self.au_mot("2 issues sur 4")
        r = self.ligne([("2", JAUNE_TITRE), ("issues sur", WHITE), ("4", JAUNE_TITRE)], 42, 0.2)
        r.move_to(P(-0.8, -3.05))
        self.play(FadeIn(r, shift=UP * 0.2), run_time=0.4)
        self.insister(r, 0.35)
        self.attendre_voix(marge=0.8)

    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        acquis = [
            ("un arbre ou un tableau", "Deux épreuves : un arbre ou un tableau"),
            ("On lit tous les chemins", "On lit tous les chemins, ou toutes les cases"),
            ("compte deux fois", "« Une de chaque » compte deux fois"),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 38)).arrange(RIGHT, buff=0.3) for _, txt in acquis])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.6)
        if lignes.width > 10.0:
            lignes.scale_to_fit_width(10.0)
        lignes.move_to(P(-0.9, 0.7))
        for (mot, _), l in zip(acquis, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode 3")
        self.play(Write(self.chute("Épisode 3 : l'équiprobabilité", color=VERT_OK, font_size=40)))
        self.attendre_voix(marge=1.0)

    # ── 08 : la fin (phrase de Frédéric du 19/10) ───────────────────────────

    def page_abonnement(self, voix="08-abonne"):
        """« Entraîne-toi sur » + eleveai.fr encadré, puis « Abonne-toi ! » +
        @eleveai974 : exactement ce que dit la voix."""
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
        self.page_garde()
        self.ecran_situation()
        self.ecran_arbre()
        self.ecran_liste()
        self.ecran_tableau()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")
