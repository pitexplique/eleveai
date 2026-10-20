# proba5_vocabulaire.py
# EleveAI — Maths 5e — série « Probabilités », épisode 1 : LE VOCABULAIRE
# (expérience aléatoire, issues, événement) — micro : proba_vocabulaire.
# AVEC VOIX. Paysage 16:9, CEINTURE JAUNE.
# Short jumeau : proba5_vocabulaire_short.py (ceinture blanche).
#
# ⭐ La situation : les lettres du mot MAFATE dans une boîte, à la kermesse.
# Le A est écrit DEUX fois : 6 papiers, donc 6 issues (pas 5).
#
# ⭐⭐ LES CANVAS DU COACH (lib/tutor-v4/components/ProbabilitesCanvas.tsx),
# tels que la banque 5e (probabilites.bank.ts, micro proba_vocabulaire) les
# dessine :
#   · « billes » : un objet par issue, en grille de min(6, max(3, ⌈√n⌉))
#     colonnes (ici 3 × 2), sur une carte blanche ; l'étiquette (ici la lettre)
#     au centre. Les papiers de la boîte reprennent cette grille.
#   · « de » : les faces SURLIGNÉES en ambre (#fef3c7, bord #fbbf24) pour les
#     issues qui réalisent l'événement ; on surligne les papiers de la même façon.
# ⭐ Fil rouge de la série (6e → 3e) : L'ÉCHELLE DE 0 À 1, ROUGE à gauche
# (impossible, 0), VERT à droite (certain, 1) — barre en petits segments
# (une Line en dégradé peut s'inverser).
#
# Écrans : 00 garde · 01 la kermesse (la boîte, MAFATE, on ne regarde pas) ·
# 02 expérience aléatoire · 03 les 6 issues · 04 l'événement « voyelle » ·
# 05 l'échelle (certain 1, impossible 0) · 06 le piège (6 issues, pas 5) ·
# 07 défi « consonne » · 07b correction · 08 ce que tu as appris · 09 abonnement.
#
# Voix : manim/voix/5e-proba-vocabulaire.json (débit −8).
# Rendu : python -m manim render -qh --disable_caching manim/scripts/5e/proba5_vocabulaire.py Proba5Vocabulaire -o eleveai-maths-5e-proba-vocabulaire --media_dir manim/scripts/5e/media
# Puis copier le mp4 dans manim/sorties/5e/maths/probabilites/01-vocabulaire/.

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

# couleurs du canvas du coach
ARDOISE = "#0F172A"
FACE_AMBRE = "#FEF3C7"
BORD_AMBRE = "#FBBF24"
BORD_GRIS = "#CBD5E1"
CARTE_FOND = "#FFFFFF"
PAPIER = "#FFFBEB"
KRAFT = "#B45309"
KRAFT_FONCE = "#78350F"

C_CERTAIN = VERT_OK
C_IMPOSSIBLE = ROUGE_ERREUR
MAFATE = ["M", "A", "F", "A", "T", "E"]


class Notion5eProba(Notion6e):
    identite = "Maths 5e — EleveAI"


def P(x, y):
    return np.array([x, y, 0.0])


# ── les dessins (paysage et short) ──────────────────────────────────────────

def papier(lettre, w=0.85, h=0.95, police=None):
    """Un papier plié, sa lettre au centre : [0] feuille, [1] coin plié, [2] lettre."""
    f = RoundedRectangle(width=w, height=h, corner_radius=0.08, fill_color=PAPIER, fill_opacity=1,
                         stroke_color=ARDOISE, stroke_width=3)
    c = w * 0.22
    coin = Polygon(f.get_corner(UR) + P(-c, 0), f.get_corner(UR) + P(0, -c), f.get_corner(UR) + P(-c, -c),
                   fill_color="#FDE68A", fill_opacity=1, stroke_color=ARDOISE, stroke_width=2)
    lt = Text(lettre, font_size=police or int(h * 60), color=ARDOISE, weight=BOLD).move_to(f)
    return VGroup(f, coin, lt)


def surligner(p):
    """Le papier SURLIGNÉ, comme `surligne` dans le canvas du coach (ambre)."""
    return [p[0].animate.set_stroke(BORD_AMBRE, 7).set_fill(FACE_AMBRE), p[2].animate.set_color(ARDOISE)]


def eteindre(p):
    return [p[0].animate.set_stroke(ARDOISE, 3).set_fill(PAPIER), p[2].animate.set_color(ARDOISE)]


def carte_papiers(lettres, pas=1.15, w=0.85, h=0.95):
    """Le canvas « billes » du coach : colonnes = min(6, max(3, ⌈√n⌉)), carte blanche.
    Renvoie (carte, papiers) ; papiers[i] = i-ème lettre."""
    n = len(lettres)
    cols = min(6, max(3, math.ceil(math.sqrt(n))))
    lignes = math.ceil(n / cols)
    pas_y = h + 0.25
    papiers = VGroup(*[papier(l, w, h).move_to(P((i % cols) * pas, -(i // cols) * pas_y))
                       for i, l in enumerate(lettres)])
    fond = RoundedRectangle(width=(cols - 1) * pas + w + 0.5, height=(lignes - 1) * pas_y + h + 0.5,
                            corner_radius=0.2, fill_color=CARTE_FOND, fill_opacity=1,
                            stroke_color=BORD_GRIS, stroke_width=2)
    fond.move_to(papiers)
    g = VGroup(fond, papiers)
    return g, papiers


def boite(larg=2.6, haut=1.7):
    """La boîte de la kermesse, ouverte : [0] le fond (derrière), [1] la face avant."""
    fond = Polygon(P(-larg / 2, haut / 2), P(larg / 2, haut / 2), P(larg / 2 - 0.25, haut / 2 + 0.35),
                   P(-larg / 2 + 0.25, haut / 2 + 0.35), fill_color=KRAFT_FONCE, fill_opacity=1,
                   stroke_color=WHITE, stroke_width=3)
    avant = RoundedRectangle(width=larg, height=haut, corner_radius=0.1, fill_color=KRAFT, fill_opacity=1,
                             stroke_color=WHITE, stroke_width=3)
    bande = Rectangle(width=larg, height=0.22, fill_color=KRAFT_FONCE, fill_opacity=1,
                      stroke_width=0).move_to(avant.get_top() + DOWN * 0.3)
    q = Text("?", font_size=int(haut * 50), color=JAUNE_TITRE, weight=BOLD).move_to(avant.get_center() + DOWN * 0.15)
    return VGroup(fond, VGroup(avant, bande, q))


def fanions(x0, x1, y, n=14):
    """La guirlande de la kermesse (décor)."""
    coul = [ROUGE_ERREUR, JAUNE_TITRE, BLEU_CALCUL, VERT_OK, ORANGE_RETENUE]
    pts = [P(x0 + (x1 - x0) * k / n, y - 0.18 * math.sin(math.pi * k / n)) for k in range(n + 1)]
    fil = VMobject(stroke_color=WHITE, stroke_width=2).set_points_smoothly(pts)
    tri = VGroup()
    for k in range(n):
        a, b = pts[k], pts[k + 1]
        tri.add(Polygon(a, b, (a + b) / 2 + DOWN * 0.38, fill_color=coul[k % 5], fill_opacity=1, stroke_width=0))
    return VGroup(fil, tri)


def oeil_barre(s=1.0):
    """« On ne regarde pas » : un œil barré."""
    blanc = Ellipse(width=1.4, height=0.75, fill_color=WHITE, fill_opacity=1, stroke_color=ARDOISE, stroke_width=3)
    iris = Circle(radius=0.24, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=0)
    pup = Circle(radius=0.1, fill_color=ARDOISE, fill_opacity=1, stroke_width=0)
    barre = Line(P(-0.8, -0.5), P(0.8, 0.5), color=ROUGE_ERREUR, stroke_width=10)
    return VGroup(blanc, iris, pup, barre).scale(s)


def croix(mob, couleur=C_IMPOSSIBLE, sw=8):
    return VGroup(Line(mob.get_corner(UL), mob.get_corner(DR)),
                  Line(mob.get_corner(UR), mob.get_corner(DL))).set_stroke(couleur, sw)


def barre_echelle(a, b, epaisseur=14):
    """L'échelle de a (0, ROUGE) à b (1, VERT), en petits segments (comme en 6e)."""
    n_seg = 48
    couleurs = color_gradient([C_IMPOSSIBLE, ORANGE_RETENUE, JAUNE_TITRE, C_CERTAIN], n_seg)
    barre = VGroup(*[Line(a + (b - a) * k / n_seg, a + (b - a) * (k + 1.04) / n_seg if k < n_seg - 1 else b,
                          stroke_width=epaisseur, color=couleurs[k]) for k in range(n_seg)])
    d = (b - a) / np.linalg.norm(b - a)
    n = np.array([-d[1], d[0], 0.0]) * 0.24
    bouts = VGroup(*[Line(p - n, p + n, stroke_width=5, color=WHITE) for p in (a, b)])
    return VGroup(barre, bouts)


class Proba5Vocabulaire(Notion5eProba):
    nom_voix = "5e-proba-vocabulaire"

    # l'échelle horizontale de l'écran 05
    X0, X1, YE = -4.8, 3.0, -0.9

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def ligne(self, morceaux, font_size=40, buff=0.24):
        """Une ligne en morceaux colorés, d'UN SEUL Text ; ligne[i] = i-ème morceau."""
        T = Text(" ".join(m for m, _ in morceaux), font_size=font_size)
        tailles = [len(m.replace(" ", "")) for m, _ in morceaux]
        if len(T) != sum(tailles):
            return VGroup(*[self.t(m, font_size, c) for m, c in morceaux]).arrange(RIGHT, buff=buff)
        g, k = VGroup(), 0
        for (m, c), n in zip(morceaux, tailles):
            g.add(VGroup(*T[k:k + n]).set_color(c))
            k += n
        return g

    def insister(self, mob, run_time=0.4):
        self.play(mob.animate.scale(1.5), run_time=run_time)
        self.play(mob.animate.scale(1 / 1.5), run_time=run_time)

    def etiquette(self, texte, color, font_size=32):
        lbl = self.t(texte, font_size, BLACK)
        fond = RoundedRectangle(width=lbl.width + 0.45, height=lbl.height + 0.32, corner_radius=0.12,
                                fill_color=color, fill_opacity=1, stroke_width=0)
        return VGroup(fond, lbl.move_to(fond))

    def la_carte(self, centre, pas=1.15, w=0.85, h=0.95):
        carte, papiers = carte_papiers(MAFATE, pas, w, h)
        carte.move_to(centre)
        return carte, papiers

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Les mots des probabilités", 54, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        ech = echelle_ceintures("jaune").move_to(P(-0.6, -2.6))
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(ech), run_time=1.0)
        mots = [("Expérience aléatoire", "expérience aléatoire", BLEU_CALCUL),
                ("issue,", "issue", VERT_OK),
                ("événement", "événement", ORANGE_RETENUE)]
        tags = VGroup(*[self.etiquette(mot, coul, 38) for _, mot, coul in mots]).arrange(RIGHT, buff=0.6)
        tags.move_to(P(-0.6, 0.2))
        for (ex, _, _), e in zip(mots, tags):
            self.au_mot(ex)
            self.play(GrowFromCenter(e), run_time=0.45)
        self.au_mot("les mots des")
        self.play(Indicate(titre, color=WHITE, scale_factor=1.08), run_time=0.7)
        self.attendre_voix(marge=1.0)

    # ── 01 : la kermesse ────────────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        self.titre_ecran("À la kermesse")
        guir = fanions(-6.8, 6.8, 2.85)
        self.play(FadeIn(guir, shift=DOWN * 0.2), run_time=0.6)
        bt = boite(2.8, 1.8).move_to(P(-3.6, -1.0))
        bt[1].set_z_index(3)
        self.au_mot("on tire un papier")
        self.play(FadeIn(bt, shift=UP * 0.3), run_time=0.5)
        # un papier sort de la boîte… et y retourne
        p0 = papier("?", 0.75, 0.85).move_to(bt[1].get_center()).set_z_index(1)
        self.add(p0)
        self.play(p0.animate.shift(UP * 1.7), run_time=0.5)
        self.play(Wiggle(p0), run_time=0.5)
        self.play(p0.animate.shift(DOWN * 1.7), run_time=0.4)
        self.remove(p0)

        self.au_mot("du mot MAFATE")
        mot = VGroup(*[self.t(l, 96, JAUNE_TITRE) for l in MAFATE]).arrange(RIGHT, buff=0.12)
        mot.move_to(P(2.0, 1.0))
        self.play(LaggedStart(*[FadeIn(l, shift=DOWN * 0.3) for l in mot], lag_ratio=0.12), run_time=0.8)
        self.insister(mot, 0.3)
        # chaque lettre devient un papier, qui tombe dans la boîte
        papiers = VGroup(*[papier(l, 0.7, 0.8).move_to(m).set_z_index(1) for l, m in zip(MAFATE, mot)])
        self.play(*[ReplacementTransform(m, p) for m, p in zip(mot, papiers)], run_time=0.5)
        haut = bt[1].get_top() + UP * 0.45
        for k, p in enumerate(papiers):
            self.play(p.animate.move_to(haut + RIGHT * (k - 2.5) * 0.28).rotate(0.3 * (k - 2.5)), run_time=0.22)
        self.play(*[p.animate.shift(DOWN * 1.0) for p in papiers], run_time=0.35)
        self.remove(*papiers)

        self.au_mot("On ne regarde pas")
        oeil = oeil_barre(1.7).move_to(P(2.0, -0.8))
        self.play(FadeIn(oeil[:3], scale=0.6), run_time=0.35)
        self.play(Create(oeil[3]), run_time=0.3)
        self.play(Wiggle(bt), run_time=0.6)
        self.attendre_voix()

    # ── 02 : expérience aléatoire ───────────────────────────────────────────

    def ecran_experience(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-experience")
        self.titre_ecran("Une expérience aléatoire")
        bt = boite(2.4, 1.6).move_to(P(-4.3, -0.4))
        bt[1].set_z_index(3)
        self.play(FadeIn(bt), run_time=0.4)
        self.au_mot("on connaît tous")
        l1 = self.ligne([("on connaît", WHITE), ("tous les résultats possibles,", VERT_OK)], 36, 0.2)
        l1.move_to(P(-0.6, 2.35))
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.5)
        carte, papiers = self.la_carte(P(1.3, -0.1))
        self.play(FadeIn(carte[0]), LaggedStart(*[FadeIn(p, scale=0.5) for p in papiers], lag_ratio=0.12),
                  run_time=0.9)
        self.au_mot("mais on ne sait pas")
        l2 = self.ligne([("mais on ne sait pas", WHITE), ("lequel va sortir.", ORANGE_RETENUE)], 36, 0.2)
        l2.move_to(P(-0.9, -2.35))
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.5)
        mystere = papier("?", 0.8, 0.9).move_to(bt[1].get_center()).set_z_index(1)
        mystere[2].set_color(ORANGE_RETENUE)
        self.add(mystere)
        self.play(mystere.animate.shift(UP * 1.8), run_time=0.5)
        self.play(Wiggle(mystere, scale_value=1.3), run_time=0.7)
        self.play(*[Indicate(p, color=ORANGE_RETENUE, scale_factor=1.15) for p in papiers], run_time=0.7)
        self.attendre_voix()

    # ── 03 : les issues ─────────────────────────────────────────────────────

    def ecran_issues(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-issues")
        self.titre_ecran("Les issues")
        self.au_mot("s'appellent les issues")
        d1 = self.ligne([("une issue", VERT_OK), ("=", WHITE), ("un résultat possible", WHITE)], 42, 0.3)
        d1.move_to(P(-0.6, 2.3))
        self.play(FadeIn(d1, shift=UP * 0.15), run_time=0.5)
        carte, papiers = self.la_carte(P(-2.2, -0.2), 1.5, 1.1, 1.2)
        for p in papiers:
            p.set_opacity(0.15)
        self.play(FadeIn(carte), run_time=0.5)
        self.au_mot("6 papiers")
        six_p = self.ligne([("6", JAUNE_TITRE), ("papiers", WHITE)], 48, 0.25).move_to(P(3.2, 1.0))
        self.play(FadeIn(six_p, shift=LEFT * 0.2), run_time=0.4)
        self.insister(six_p[0], 0.3)
        for ex, p in zip(["M, A", "A, F", "F, A", "A, T", "T, E", "E. 6"], papiers):
            self.au_mot(ex)
            self.play(p.animate.set_opacity(1).scale(1.25), run_time=0.25)
            self.play(p.animate.scale(1 / 1.25), run_time=0.2)
        acc = Brace(carte, DOWN, color=VERT_OK)
        six_i = self.ligne([("6", JAUNE_TITRE), ("issues", VERT_OK)], 56, 0.25).move_to(P(3.2, -0.4))
        self.play(GrowFromCenter(acc), FadeIn(six_i, scale=0.7), run_time=0.5)
        self.insister(six_i, 0.3)
        self.attendre_voix()

    # ── 04 : l'événement ────────────────────────────────────────────────────

    def ecran_evenement(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-evenement")
        self.titre_ecran("Un événement")
        self.au_mot("une phrase")
        d1 = self.ligne([("un événement", ORANGE_RETENUE), ("=", WHITE), ("une phrase", WHITE)], 40, 0.3)
        d1.move_to(P(-0.6, 2.35))
        self.play(FadeIn(d1, shift=UP * 0.15), run_time=0.5)
        self.au_mot("vraie ou fausse")
        d2 = self.ligne([("vraie", VERT_OK), ("ou", WHITE), ("fausse", ROUGE_ERREUR), ("après le tirage", WHITE)],
                        34, 0.2).move_to(P(-0.6, 1.7))
        self.play(FadeIn(d2, shift=UP * 0.15), run_time=0.5)
        carte, papiers = self.la_carte(P(-3.0, -0.75), 1.4, 1.05, 1.1)
        self.play(FadeIn(carte, shift=UP * 0.2), run_time=0.5)
        self.au_mot("Tirer une voyelle")
        ev = self.etiquette("Tirer une voyelle", ORANGE_RETENUE, 34).move_to(P(2.6, 0.5))
        self.play(GrowFromCenter(ev), run_time=0.45)
        self.play(*[papiers[i].animate.set_opacity(0.35) for i in (0, 2, 4)], run_time=0.35)
        for ex, i in zip(["par A", "A et", "et E"], (1, 3, 5)):
            self.au_mot(ex)
            self.play(*surligner(papiers[i]), run_time=0.3)
            self.play(papiers[i].animate.scale(1.25), run_time=0.2)
            self.play(papiers[i].animate.scale(1 / 1.25), run_time=0.2)
        self.au_mot("3 issues sur 6")
        res = self.ligne([("3", JAUNE_TITRE), ("issues sur", WHITE), ("6", JAUNE_TITRE)], 48, 0.22)
        res.move_to(P(2.6, -1.0))
        self.play(FadeIn(res, shift=UP * 0.15), run_time=0.4)
        self.insister(res, 0.3)
        self.attendre_voix()

    # ── 05 : L'ÉCHELLE DE 0 À 1 ─────────────────────────────────────────────

    def x_de(self, p):
        return self.X0 + (self.X1 - self.X0) * p

    def fleche(self, p, couleur, y_haut):
        x = self.x_de(p)
        return Arrow(P(x, y_haut), P(x, self.YE + 0.12), buff=0.0, color=couleur, stroke_width=6,
                     max_tip_length_to_length_ratio=0.25)

    def ecran_echelle(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-echelle")
        self.titre_ecran("Certain ou impossible ?")
        ech = barre_echelle(P(self.X0, self.YE), P(self.X1, self.YE))
        self.play(Create(ech[0], lag_ratio=1), FadeIn(ech[1]), run_time=0.9)
        self.au_mot("entre 0 et 1")
        n0 = self.t("0", 60, JAUNE_TITRE).next_to(P(self.X0, self.YE), DOWN, buff=0.4)
        n1 = self.t("1", 60, JAUNE_TITRE).next_to(P(self.X1, self.YE), DOWN, buff=0.4)
        self.play(FadeIn(n0, scale=0.5), run_time=0.3)
        self.play(FadeIn(n1, scale=0.5), run_time=0.3)

        self.au_mot("Tirer une lettre")
        t1 = self.etiquette("Tirer une lettre du mot MAFATE", C_CERTAIN, 28).move_to(P(1.2, 2.3))
        mini, mp = carte_papiers(MAFATE, 0.72, 0.55, 0.6)
        mini.move_to(P(self.x_de(1), 1.05))
        self.play(GrowFromCenter(t1), run_time=0.45)
        self.play(FadeIn(mini, shift=DOWN * 0.2), run_time=0.4)
        self.play(LaggedStart(*[AnimationGroup(*surligner(p)) for p in mp], lag_ratio=0.12), run_time=0.7)
        self.au_mot("certain, 1")
        f1 = self.fleche(1, C_CERTAIN, mini.get_bottom()[1] - 0.05)
        m1 = self.t("certain", 36, C_CERTAIN).next_to(n1, DOWN, buff=0.15)
        self.play(GrowArrow(f1), FadeIn(m1, shift=UP * 0.15), run_time=0.4)
        self.insister(n1, 0.3)

        self.au_mot("Tirer un Z")
        t0 = self.etiquette("Tirer un Z", C_IMPOSSIBLE, 28).move_to(P(-4.2, 2.3))
        z = papier("Z", 1.0, 1.1).move_to(P(self.x_de(0), 1.05))
        self.play(GrowFromCenter(t0), FadeIn(z, shift=DOWN * 0.2), run_time=0.45)
        self.play(Create(Line(z.get_corner(DL) + P(-0.1, -0.1), z.get_corner(UR) + P(0.1, 0.1),
                              color=C_IMPOSSIBLE, stroke_width=8)), run_time=0.35)
        self.au_mot("impossible, 0")
        f0 = self.fleche(0, C_IMPOSSIBLE, z.get_bottom()[1] - 0.05)
        m0 = self.t("impossible", 36, C_IMPOSSIBLE).next_to(n0, DOWN, buff=0.15)
        self.play(GrowArrow(f0), FadeIn(m0, shift=UP * 0.15), run_time=0.4)
        self.insister(n0, 0.3)
        self.attendre_voix()

    # ── 06 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        self.titre_ecran("Le piège")
        carte, papiers = self.la_carte(P(-3.2, 0.5), 1.6, 1.2, 1.3)
        self.play(FadeIn(carte), run_time=0.4)
        self.au_mot("deux fois")
        self.play(*surligner(papiers[1]), *surligner(papiers[3]), run_time=0.4)
        deux = VGroup(papiers[1], papiers[3])
        self.play(*[p.animate.scale(1.4) for p in deux], run_time=0.3)
        self.play(*[p.animate.scale(1 / 1.4) for p in deux], run_time=0.3)
        lbl = self.ligne([("le", WHITE), ("A", BORD_AMBRE), (": deux fois", WHITE)], 38, 0.15)
        lbl.next_to(carte, DOWN, buff=0.5)
        self.play(FadeIn(lbl, shift=UP * 0.15), run_time=0.4)

        self.au_mot("6 issues")
        six = self.ligne([("6", JAUNE_TITRE), ("issues", VERT_OK)], 56, 0.25).move_to(P(2.4, 1.9))
        ok = self.coche(taille=0.3).next_to(six, RIGHT, buff=0.35)
        self.play(FadeIn(six, scale=0.6), run_time=0.4)
        self.play(Create(ok), run_time=0.3)
        self.au_mot("pas 5")
        cinq = self.ligne([("pas", ROUGE_ERREUR), ("5", JAUNE_TITRE)], 56, 0.25).move_to(P(2.4, 0.75))
        rang = VGroup(*[papier(l, 0.8, 0.9) for l in ["M", "A", "F", "T", "E"]]).arrange(RIGHT, buff=0.15)
        rang.move_to(P(2.5, -0.5))
        self.play(FadeIn(cinq, scale=0.6),
                  LaggedStart(*[FadeIn(p, shift=UP * 0.2) for p in rang], lag_ratio=0.1), run_time=0.6)
        self.play(Create(Line(cinq[1].get_corner(DL) + P(-0.1, -0.05), cinq[1].get_corner(UR) + P(0.1, 0.05),
                              color=ROUGE_ERREUR, stroke_width=7)), run_time=0.3)

        self.au_mot("On compte les papiers")
        cadre = SurroundingRectangle(carte, color=VERT_OK, buff=0.1, stroke_width=7)
        self.play(Create(cadre), run_time=0.5)
        bloc = VGroup(carte, cadre)
        self.play(bloc.animate.scale(1.15), run_time=0.3)
        self.play(bloc.animate.scale(1 / 1.15), run_time=0.3)
        self.au_mot("pas les lettres différentes")
        self.play(Create(croix(rang, sw=7)), rang.animate.set_opacity(0.5), run_time=0.5)
        self.attendre_voix()

    # ── 07 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("Même boîte")
        bt = boite(1.9, 1.3).move_to(P(-5.6, 0.0))
        carte, papiers = self.la_carte(P(-2.4, 0.4), 1.3, 0.95, 1.05)
        self.play(FadeIn(bt, shift=UP * 0.2), FadeIn(carte, shift=UP * 0.2), run_time=0.5)
        self.au_mot("tirer une consonne")
        ev = self.etiquette("Tirer une consonne", BLEU_CALCUL, 34).move_to(P(2.6, 1.5))
        self.play(GrowFromCenter(ev), run_time=0.45)
        self.au_mot("quelles issues")
        q1 = self.t("Quelles issues ?", 40).move_to(P(2.6, 0.45))
        self.play(FadeIn(q1, shift=UP * 0.15), run_time=0.4)
        self.au_mot("Combien ?")
        q2 = self.t("Combien ?", 40).move_to(P(2.6, -0.45))
        self.play(FadeIn(q2, shift=UP * 0.15), run_time=0.4)
        self.insister(q2, 0.25)
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=40)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        carte, papiers = self.la_carte(P(-2.8, 0.0), 1.6, 1.2, 1.3)
        ev = self.etiquette("Tirer une consonne", BLEU_CALCUL, 32).move_to(P(2.7, 1.6))
        self.add(carte, ev)
        self.play(*[papiers[i].animate.set_opacity(0.35) for i in (1, 3, 5)], run_time=0.3)
        for ex, i in zip(["M, F", "F et", "et T"], (0, 2, 4)):
            self.au_mot(ex)
            self.play(*surligner(papiers[i]), run_time=0.25)
            self.play(papiers[i].animate.scale(1.3), run_time=0.18)
            self.play(papiers[i].animate.scale(1 / 1.3), run_time=0.18)
        self.au_mot("3 issues sur 6")
        res = self.ligne([("3", JAUNE_TITRE), ("issues sur", WHITE), ("6", JAUNE_TITRE)], 52, 0.22)
        res.move_to(P(2.7, 0.0))
        self.play(FadeIn(res, shift=UP * 0.15), run_time=0.4)
        self.insister(res, 0.3)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        acquis = [
            ("Une expérience aléatoire", "Aléatoire : issues connues, résultat imprévisible"),
            ("Un événement est réalisé", "Un événement : réalisé par certaines issues"),
            ("On compte les issues", "On compte les issues, pas les valeurs différentes"),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 40)).arrange(RIGHT, buff=0.3) for _, txt in acquis])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.85)
        if lignes.width > 11.0:
            lignes.scale_to_fit_width(11.0)
        lignes.move_to(P(-0.6, 0.5))
        for (mot, _), l in zip(acquis, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("L'épisode 2")
        self.play(Write(self.chute("Épisode 2 : lister les issues", color=VERT_OK, font_size=38)))
        self.attendre_voix(marge=1.0)

    # ── 09 : la fin (règle du 19/10) ────────────────────────────────────────

    def page_abonnement(self, voix="09-abonne"):
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
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_experience()
        self.ecran_issues()
        self.ecran_evenement()
        self.ecran_echelle()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="09-abonne")
