# frac_egale.py
# EleveAI — Maths 6e — série « Fractions », épisode 03 : FRACTIONS ÉGALES,
# SIMPLIFIER (micro du coach : fraction_egale, « Fractions égales, simplifier »,
# créée le 24/10/2026), AVEC VOIX. Paysage 16:9, CEINTURE VERTE : la paysage
# complète du niveau de la classe (méthode ÷ et ×, piège, défi corrigé),
# repère de REGLES.md. Short jumeau : frac_egale_short.py (blanche).
# ⭐ C'est LA PREMIÈRE erreur des 6e de Frédéric sur les copies : ils ne savent
# pas simplifier. Le geste qui fait comprendre : la barre de 6/8 dont on
# REGROUPE les parts 2 par 2 → 3/4, et la longueur bleue n'a pas bougé.
#
# Décor et métier : la CUISINE ; Inès, PÂTISSIÈRE : la recette dit 6/8 L de
# lait, son verre doseur est gradué en quarts → 3/4 L. Défi : sa tarte en 12,
# 8 parts mangées → 8/12 = 2/3. Aucune donnée du monde réel citée.
# Centres d'intérêt : cuisine.
#
# Micro → écrans : fractions égales sur une figure (02, 03, 06, 08), règle
# « même nombre en haut ET en bas » ÷ (04) et × (06, 7/3 = 14/6 en question),
# égalité à trou 3/4 = …/12 (06), simplifier 6/8, 15/20, 12/18 (03, 08, 09),
# ne se simplifie plus (09, question 2), leurres : soustraire 6/8 → 4/6 et
# ne diviser qu'un terme 6/8 → 3/8 (11, question 3), rappel de la chaîne
# fraction → décimal → pourcentage (14).
# Écrans : 00 garde · 01 Inès et la recette · 02 la barre de 6/8 · 03 regrouper
# 2 par 2 → 3/4 · 04 la règle ÷ 2 · 05 le verre doseur à 3/4 · 06 multiplier
# (3/4 = 9/12) · 07 QUESTION 1 (7/3 = …/6) · 08 la grille 15/20 = 3/4 · 09
# 12/18 → 6/9 → 2/3 · 10 QUESTION 2 (ne se simplifie plus) · 11 le piège ·
# 12 QUESTION 3 (10/15) · 13 défi (tarte) · 13b correction · 14 la chaîne
# 3/4 = 0,75 = 75 % · 15 ce que tu as appris · 16 fin.
#
# Voix : manim/voix/6e-frac-egale.json (débit −10), WAV dans
# public/sons/6e-frac-egale/ ; calage mot à mot :
# manim/scripts/6e/frac_egale_marques.json (scripts/marques_dump.ps1 + scripts/cues2marques.py).
# Figures : manim/canvas_fractions.py ; bases : manim/scripts/6e/frac_commun.py.
# python -m manim render -qh --disable_caching manim/scripts/6e/frac_egale.py FracEgale6e -o eleveai-maths-6e-frac-egale --media_dir manim/scripts/6e/media-frac-egale
# Sortie : manim/sorties/6e/maths/fractions/03-egale/eleveai-maths-6e-frac-egale.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_commun import *  # noqa: E402,F403

CREME = "#fef3c7"
LAIT = "#e2e8f0"
G = P(-3.3, 0.0)   # le centre de la zone de gauche


def patissiere(s=1.0):
    """Inès, pâtissière : toque blanche, tablier, rouleau à pâtisserie."""
    tete = Circle(radius=0.42, fill_color="#8d5524", fill_opacity=1, stroke_width=0)
    toque = VGroup(Rectangle(width=0.7, height=0.32, fill_color=WHITE, fill_opacity=1, stroke_width=0)
                   .move_to(P(0, 0.5)),
                   *[Circle(radius=0.26, fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(P(x, 0.78))
                     for x in (-0.25, 0, 0.25)])
    corps = Polygon(P(-0.75, -1.9), P(0.75, -1.9), P(0.5, -0.45), P(-0.5, -0.45), fill_color="#f472b6",
                    fill_opacity=1, stroke_width=0)
    tablier = Polygon(P(-0.45, -1.85), P(0.45, -1.85), P(0.32, -0.7), P(-0.32, -0.7), fill_color=WHITE,
                      fill_opacity=1, stroke_width=0)
    rouleau = VGroup(RoundedRectangle(width=1.3, height=0.22, corner_radius=0.1, fill_color="#d6a76c",
                                      fill_opacity=1, stroke_width=0),
                     *[RoundedRectangle(width=0.3, height=0.12, corner_radius=0.05, fill_color="#92400e",
                                        fill_opacity=1, stroke_width=0).move_to(P(x, 0)) for x in (-0.78, 0.78)]
                     ).move_to(P(0, -1.2))
    return VGroup(corps, tablier, rouleau, tete, toque).scale(s)


def verre_doseur(h=3.0, w=1.3):
    """Le verre doseur gradué en quarts de litre. .lait : le lait (hauteur 0
    au départ) ; .marques[i] : le trait de i/4 ; .etiq[i] : son étiquette."""
    verre = VGroup(Line(P(-w / 2, h / 2), P(-w / 2, -h / 2)), Line(P(-w / 2, -h / 2), P(w / 2, -h / 2)),
                   Line(P(w / 2, -h / 2), P(w / 2, h / 2))).set_stroke("#cbd5e1", 6)
    anse = Arc(radius=0.45, start_angle=PI / 2, angle=-PI, arc_center=P(w / 2, 0.3)).set_stroke("#cbd5e1", 6)
    lait = Rectangle(width=w - 0.1, height=0.001, fill_color=LAIT, fill_opacity=1, stroke_width=0)
    lait.move_to(P(0, -h / 2 + 0.05), DOWN)
    marques, etiq = VGroup(), VGroup()
    for i in range(1, 5):
        y = -h / 2 + 0.05 + (h - 0.25) * i / 4
        marques.add(Line(P(-w / 2, y), P(-w / 2 + 0.35, y), color=WHITE, stroke_width=4))
        e = EcritureFraction(i, 4, fs=30) if i < 4 else Text("1 L", font_size=30)
        e.sans_synchro = True
        etiq.add(e.next_to(P(-w / 2, y), LEFT, buff=0.15))
    g = VGroup(lait, verre, anse, marques, etiq)
    g.lait, g.marques, g.etiq, g.h, g.w = lait, marques, etiq, h, w
    return g


def remplir_verre(v, i, run_time=1.2):
    """Le lait monte jusqu'au trait i/4 (animation sur v.lait)."""
    bas = v.lait.get_bottom()
    cible = v.marques[i - 1].get_y() - bas[1]
    lait = v.lait

    def maj(m, a):
        m.stretch_to_fit_height(max(0.001, cible * a))
        m.move_to(bas, DOWN)

    return UpdateFromAlphaFunc(lait, maj, run_time=run_time, rate_func=smooth)


def fiche_recette(fs=34):
    """La fiche de la recette : « Crème » et « Lait : 6/8 L » (la fraction est
    renvoyée à part, .frac, pour être posée AU MOT)."""
    titre = Text("Crème pâtissière", font_size=fs, color=NUIT, weight=BOLD, font="Arial")
    lait = Text("Lait :", font_size=fs, color=NUIT, font="Arial")
    frac = EcritureFraction(6, 8, fs=fs + 6, couleur=NUIT, police="Arial", gras=True)
    litre = Text("L", font_size=fs, color=NUIT, font="Arial")
    ligne = VGroup(lait, frac, litre).arrange(RIGHT, buff=0.2)
    corps = VGroup(titre, ligne).arrange(DOWN, buff=0.35)
    fond = RoundedRectangle(width=corps.width + 0.7, height=corps.height + 0.6, corner_radius=0.2,
                            fill_color=CREME, fill_opacity=1, stroke_color="#d97706", stroke_width=3)
    fond.move_to(corps)
    g = VGroup(fond, titre, lait, litre, frac)
    g.frac, g.sans_frac = frac, VGroup(fond, titre, lait, litre)
    return g


class FracEgaleBase(PaysageFrac):
    nom_voix = "6e-frac-egale"
    fichier_marques = "frac_egale_marques.json"

    # ── petits outils de l'épisode ──
    def ecrire(self, f, *parties, run_time=0.4):
        """Montre des morceaux d'une EcritureFraction (num, trait, den…)."""
        self.play(*[FadeIn(m, scale=1.3) for m in parties], run_time=run_time)

    def barre_68(self, centre=P(-3.3, 1.5), k=6, **kw):
        return Barre(8, k, largeur=5.4, hauteur=0.75, centre=centre, **kw)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Fractions égales, simplifier", self.identite, self.ceinture)
        b1 = Barre(4, 3, largeur=4.2, hauteur=0.55, centre=P(-0.6, 0.75))
        b2 = Barre(8, 6, largeur=4.2, hauteur=0.55, centre=P(-0.6, -0.65))
        self.au_mot("Fractions égales")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.au_mot("Deux fractions différentes")
        self.play(b1.apparaitre(0.9), b2.apparaitre(0.9))
        self.au_mot("la même chose")
        q = self.t("?", 90, AMBRE).next_to(VGroup(b1, b2), RIGHT, buff=0.5)
        self.play(FadeIn(q, scale=0.4), Create(b1.fin_coloriee(vers=-1.95)), run_time=0.6)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Inès, pâtissière ───────────────────────────────────────────────

    def ecran_situation(self):
        self.ecran("01-situation")
        pers = patissiere(1.15).move_to(P(-5.2, -0.3))
        self.au_mot("Voici Inès")
        nom = self.t("Inès", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.3)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("pâtissière")
        metier = self.t("pâtissière", 36, BLEU_CALCUL).next_to(pers, DOWN, buff=0.25)
        self.play(FadeIn(metier, shift=UP * 0.2), run_time=0.4)
        fiche = fiche_recette(32)
        self.col(fiche, 1.7)
        fond, titre, lait, litre = fiche.sans_frac
        self.au_mot("la recette dit")
        self.play(FadeIn(fond, scale=0.9), FadeIn(titre), run_time=0.5)
        self.au_mot("lait")
        self.play(FadeIn(lait, shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("6 huitièmes")
        self.play(FadeIn(fiche.frac, scale=1.4), run_time=0.4)
        self.au_mot("de litre")
        self.play(FadeIn(litre), run_time=0.3)
        self.insister(fiche.frac, 1.3, 0.25)
        v = verre_doseur(3.4, 1.3).move_to(P(-1.9, -0.2))
        self.au_mot("son verre doseur")
        self.play(FadeIn(VGroup(v[1], v[2]), shift=UP * 0.2), run_time=0.5)
        self.au_mot("gradué en quarts")
        self.play(LaggedStart(*[Create(m) for m in v.marques], lag_ratio=0.25),
                  LaggedStart(*[FadeIn(e) for e in v.etiq], lag_ratio=0.25), run_time=1.0)
        self.add(v.lait)
        self.au_mot("Combien de quarts")
        q = self.col(self.ligne([("Combien de", WHITE), ("quarts", BLEU_CALCUL), ("?", ORANGE_RETENUE)], 40), -0.9)
        self.play(FadeIn(q, shift=UP * 0.2), Indicate(v.etiq, color=AMBRE), run_time=0.6)
        self.attendre_voix()

    # ── 02 : la barre de 6/8 ────────────────────────────────────────────────

    def ecran_barre(self):
        self.ecran("02-barre")
        b = self.barre_68(k=0)
        f = EcritureFraction(6, 8, fs=80).move_to(P(2.6, 1.5))
        self.au_mot("Une barre")
        self.play(b.apparaitre(1.2))
        self.au_mot("ce sont des huitièmes")
        self.play(LaggedStart(*[Indicate(p, color=AMBRE, scale_factor=1.15) for p in b.parts], lag_ratio=0.1),
                  FadeIn(VGroup(f.trait, f.den), scale=1.3), run_time=1.0)
        self.au_mot("On en colorie 6")
        self.play(b.colorier(range(6)), run_time=1.3)
        self.play(FadeIn(f.num, scale=1.4), run_time=0.35)
        self.insister(f, 1.2, 0.25)
        self.attendre_voix()
        return b, f

    # ── 03 : regrouper 2 par 2 → 3/4 ────────────────────────────────────────

    def ecran_regrouper(self, b, f):
        self.ecran("03-regrouper")
        self.add(b, f)
        b2 = b.copy()
        f2 = EcritureFraction(3, 4, fs=80).move_to(P(2.6, -0.75))
        self.au_mot("on regroupe les parts 2 par 2")
        self.play(b2.animate.move_to(P(-3.3, -0.75)), run_time=0.8)
        gr = b2.groupes(2)
        self.play(LaggedStart(*[Create(r) for r in gr], lag_ratio=0.2), run_time=0.9)
        self.au_mot("Il reste 4 grandes parts")
        b4, anim = b2.regrouper(2, run_time=1.0)
        self.play(anim, FadeOut(gr), run_time=1.0)
        self.play(LaggedStart(*[Indicate(p, color=AMBRE, scale_factor=1.08) for p in b4.parts], lag_ratio=0.2),
                  run_time=0.8)
        self.au_mot("des quarts")
        self.play(FadeIn(VGroup(f2.trait, f2.den), scale=1.3), run_time=0.35)
        self.au_mot("Les parts bleues font 3 quarts")
        self.play(LaggedStart(*[Indicate(b4.parts[i], color=WHITE, scale_factor=1.1) for i in range(3)],
                              lag_ratio=0.3), run_time=0.8)
        self.play(FadeIn(f2.num, scale=1.4), run_time=0.35)
        self.au_mot("la longueur bleue n'a pas bougé")
        h = b.contour.get_bottom()[1] - b4.contour.get_bottom()[1]
        tir = b.fin_coloriee(vers=-h - 0.25)
        acc = b4.accolade("même longueur", dessus=False, fs=32)
        self.play(Create(tir), run_time=0.6)
        self.play(FadeIn(acc, shift=UP * 0.15), run_time=0.5)
        self.au_mot("6 huitièmes égale 3 quarts")
        eg = self.t("=", 80).move_to(P(3.05, 0.4))
        self.play(f.animate.move_to(P(1.9, 0.4)), f2.animate.move_to(P(4.2, 0.4)), FadeIn(eg, scale=1.5),
                  run_time=0.7)
        self.play(Create(self.encadrer(VGroup(f, eg, f2))), run_time=0.5)
        self.attendre_voix()

    # ── 04 : la règle (÷ 2 en haut ET en bas) ───────────────────────────────

    def ecran_regle(self):
        self.ecran("04-regle")
        f = EcritureFraction(6, 8, fs=110)
        g = EcritureFraction(3, 4, fs=110)
        eg = egalite(f, g, buff=1.1).move_to(P(-3.1, 0.0))
        haut, bas = fleches(f, g, "÷ 2", fs=48)
        self.au_mot("Regarde les nombres")
        tit = self.col(self.t("La règle", 46, JAUNE_TITRE), 3.0)
        self.play(FadeIn(f, scale=1.2), Write(tit), run_time=0.5)
        self.au_mot("6 divisé par 2")
        self.play(Create(haut[0]), FadeIn(haut[1], shift=DOWN * 0.15), run_time=0.6)
        self.au_mot("égale 3")
        self.play(FadeIn(eg[1]), FadeIn(g.num, scale=1.4), FadeIn(g.trait), run_time=0.4)
        self.au_mot("8 divisé par 2")
        self.play(Create(bas[0]), FadeIn(bas[1], shift=UP * 0.15), run_time=0.6)
        self.au_mot("égale 4")
        self.play(FadeIn(g.den, scale=1.4), run_time=0.4)
        regle = self.bloc(["On divise", "le numérateur", "ET le dénominateur", "par le MÊME nombre."], 40)
        regle[1].set_color(BLEU_CALCUL)
        regle[2].set_color(BLEU_CALCUL)
        regle[3].set_color(AMBRE)
        self.col(regle, 0.6)
        self.au_mot("On divise")
        self.play(FadeIn(regle[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("le numérateur")
        self.play(FadeIn(regle[1], shift=RIGHT * 0.2), Indicate(VGroup(f.num, g.num), color=BLEU_CALCUL),
                  run_time=0.6)
        self.au_mot("ET le dénominateur")
        self.play(FadeIn(regle[2], shift=RIGHT * 0.2), Indicate(VGroup(f.den, g.den), color=BLEU_CALCUL),
                  run_time=0.6)
        self.au_mot("par le même nombre")
        self.play(FadeIn(regle[3], shift=RIGHT * 0.2), Indicate(haut[1], color=AMBRE, scale_factor=1.4),
                  Indicate(bas[1], color=AMBRE, scale_factor=1.4), run_time=0.7)
        self.au_mot("simplifier")
        s = self.col(self.t("C'est simplifier !", 46, VERT_OK), -1.6)
        self.play(FadeIn(s, scale=1.4), run_time=0.4)
        self.play(Create(self.encadrer(s)), run_time=0.4)
        self.attendre_voix()

    # ── 05 : Inès verse 3/4 de litre ────────────────────────────────────────

    def ecran_reponse(self):
        self.ecran("05-reponse")
        pers = patissiere(1.0).move_to(P(-5.3, -0.4))
        v = verre_doseur(3.4, 1.3).move_to(P(-2.2, -0.2))
        self.add(pers, v)
        self.au_mot("3 quarts de litre")
        self.play(remplir_verre(v, 3, 1.5), Indicate(v.etiq[2], color=AMBRE, scale_factor=1.5), run_time=1.5)
        f = EcritureFraction(6, 8, fs=70)
        g = EcritureFraction(3, 4, fs=70)
        eg = egalite(f, g)
        l1, l2 = self.t("L", 52), self.t("L", 52)
        ligne = VGroup(f, l1, eg[1], g, l2)
        l1.next_to(f, RIGHT, buff=0.15).set_y(f.trait.get_y())
        eg[1].next_to(l1, RIGHT, buff=0.35)
        g.next_to(eg[1], RIGHT, buff=0.35).shift(UP * (f.trait.get_y() - g.trait.get_y()))
        l2.next_to(g, RIGHT, buff=0.15).set_y(g.trait.get_y())
        self.col(ligne, 1.2)
        self.play(FadeIn(g, scale=1.3), FadeIn(l2), run_time=0.4)
        self.au_mot("la même quantité")
        self.play(FadeIn(VGroup(f, l1, eg[1]), shift=RIGHT * 0.2), run_time=0.5)
        m = self.col(self.t("même quantité", 40, VERT_OK), -0.6)
        self.play(FadeIn(m, shift=UP * 0.2), run_time=0.4)
        self.au_mot("écrite plus simplement")
        s = self.col(self.t("écriture plus simple", 40, BLEU_CALCUL), -1.4)
        self.play(FadeIn(s, shift=UP * 0.2), Circumscribe(g, color=BLEU_CALCUL), run_time=0.7)
        self.attendre_voix()

    # ── 06 : multiplier (3/4 = …/12) ────────────────────────────────────────

    def ecran_multiplier(self):
        self.ecran("06-multiplier")
        b = Barre(4, 3, largeur=5.4, hauteur=0.75, centre=P(-3.3, 2.35))
        f = EcritureFraction(3, 4, fs=84)
        g = EcritureFraction("…", 12, fs=84)
        eg = egalite(f, g, buff=1.0).move_to(P(-3.3, -0.75))
        haut, bas = fleches(f, g, "× 3", fs=44)
        neuf = g.chiffre(9)
        self.add(b)
        self.au_mot("on peut multiplier")
        tit = self.col(self.t("On peut aussi multiplier", 42, JAUNE_TITRE), 3.0)
        self.play(Write(tit), run_time=0.6)
        self.au_mot("3 quarts")
        self.play(FadeIn(f, scale=1.3), run_time=0.4)
        self.au_mot("combien de douzièmes")
        self.play(FadeIn(eg[1]), FadeIn(g, scale=1.3), run_time=0.4)
        self.insister(g.num, 1.4, 0.2)
        self.au_mot("4 fois 3")
        self.play(Create(bas[0]), FadeIn(bas[1], shift=UP * 0.15), run_time=0.6)
        l1 = self.ligne([("4 × 3 =", WHITE), ("12", VERT_OK)], 46)
        self.col(l1, 1.6)
        self.play(FadeIn(l1[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("égale 12")
        self.play(FadeIn(l1[1], scale=1.4), Indicate(g.den, color=VERT_OK), run_time=0.5)
        self.au_mot("Alors 3 fois 3")
        self.play(Create(haut[0]), FadeIn(haut[1], shift=DOWN * 0.15), run_time=0.6)
        l2 = self.ligne([("3 × 3 =", WHITE), ("9", VERT_OK)], 46)
        self.col(l2, 0.6)
        self.play(FadeIn(l2[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("égale 9")
        self.play(FadeIn(l2[1], scale=1.4), FadeOut(g.num), FadeIn(neuf, scale=1.5), run_time=0.5)
        self.au_mot("chaque quart est coupé en 3")
        b12, anim = b.repartager(3, run_time=1.6)
        self.play(anim)
        self.au_mot("3 quarts égale 9 douzièmes")
        self.play(LaggedStart(*[Indicate(b12.parts[i], color=WHITE, scale_factor=1.12) for i in range(9)],
                              lag_ratio=0.12), run_time=1.2)
        m = self.col(self.t("même longueur bleue", 38, VERT_OK), -0.6)
        self.play(FadeIn(m, shift=UP * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 07 : QUESTION 1 (7/3 = …/6) ─────────────────────────────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        f = EcritureFraction(7, 3, fs=100)
        g = EcritureFraction("…", 6, fs=100)
        eg = egalite(f, g, buff=1.0).move_to(P(-3.3, 0.0))
        haut, bas = fleches(f, g, "× 2", fs=46)
        quatorze = g.chiffre(14)

        def avant(sc):
            sc.play(FadeIn(eg, scale=1.2), run_time=0.5)

        def apres(sc):
            sc.au_mot("7 tiers égale 14 sixièmes")
            sc.play(Create(bas[0]), FadeIn(bas[1]), Create(haut[0]), FadeIn(haut[1]), run_time=0.8)
            sc.play(FadeOut(g.num), FadeIn(quatorze, scale=1.5), run_time=0.5)

        self.question_pause("07-question", "07b-reponse", ["7 tiers =", "combien de sixièmes ?"],
                            [self.inline("10"), self.inline("14"), self.inline("7")], 1,
                            ["3 × 2 = 6", "donc 7 × 2 = 14."], mot_q="7 tiers", avant_q=avant,
                            autres_r=apres)

    # ── 08 : la grille 15/20 = 3/4 ──────────────────────────────────────────

    def ecran_grille(self):
        self.ecran("08-grille")
        gr = Grille(4, 5, 0, cote=0.85, centre=P(-3.3, 0.1))
        f = EcritureFraction(15, 20, fs=84)
        g = EcritureFraction(3, 4, fs=84)
        eg = egalite(f, g, buff=0.9)
        self.col(eg, -0.9)
        haut, bas = fleches(f, g, "÷ 5", fs=44)
        self.au_mot("Autre exemple")
        tit = self.col(self.t("Autre exemple", 44, JAUNE_TITRE), 3.0)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("15 vingtièmes")
        self.play(FadeIn(f, scale=1.3), run_time=0.4)
        self.au_mot("cette grille de 20 cases")
        self.play(gr.apparaitre(1.0))
        self.au_mot("15 sont bleues")
        self.play(gr.colorier(range(15), lag=0.06), run_time=1.3)
        self.au_mot("dans la table de 5")
        t5 = self.col(self.t("table de 5", 38, AMBRE), 2.3)
        self.play(FadeIn(t5, shift=DOWN * 0.15), Indicate(VGroup(f.num, f.den), color=AMBRE), run_time=0.6)
        self.au_mot("15 divisé par 5")
        self.play(Create(haut[0]), FadeIn(haut[1]), run_time=0.5)
        self.au_mot("égale 3")
        self.play(FadeIn(eg[1]), FadeIn(g.num, scale=1.4), FadeIn(g.trait), run_time=0.4)
        self.au_mot("20 divisé par 5")
        self.play(Create(bas[0]), FadeIn(bas[1]), run_time=0.5)
        self.au_mot("égale 4")
        self.play(FadeIn(g.den, scale=1.4), run_time=0.4)
        self.au_mot("Chaque ligne de 5 cases")
        lignes = gr.entourer_lignes()
        self.play(LaggedStart(*[Create(r) for r in lignes], lag_ratio=0.3), run_time=1.0)
        self.au_mot("est un quart")
        un = Text("1 quart", font_size=32, color=AMBRE).next_to(lignes[0], RIGHT, buff=0.3)
        self.play(FadeIn(un, shift=RIGHT * 0.15), run_time=0.4)
        self.au_mot("15 vingtièmes égale 3 quarts")
        self.play(Circumscribe(eg, color=VERT_OK), LaggedStart(*[Indicate(lignes[r], color=VERT_OK) for r in range(3)],
                                                              lag_ratio=0.3), run_time=1.2)
        self.attendre_voix()

    # ── 09 : 12/18 → 6/9 → 2/3, jusqu'au bout ───────────────────────────────

    def ecran_jusquau_bout(self):
        self.ecran("09-jusquau-bout")
        fs = 84
        fa, fb, fc = EcritureFraction(12, 18, fs=fs), EcritureFraction(6, 9, fs=fs), EcritureFraction(2, 3, fs=fs)
        ch = VGroup(fa, fb, fc).arrange(RIGHT, buff=2.4).move_to(P(-0.9, 0.85))
        s1, s2 = self.t("=", fs).move_to((fa.get_right() + fb.get_left()) / 2), \
            self.t("=", fs).move_to((fb.get_right() + fc.get_left()) / 2)
        s1.set_y(fa.trait.get_y())
        s2.set_y(fa.trait.get_y())
        h1, b1 = fleches(fa, fb, "÷ 2", fs=42)
        h2, b2 = fleches(fb, fc, "÷ 3", fs=42)
        br = Barre(18, 0, largeur=8.4, hauteur=0.7, centre=P(-1.1, -2.3))
        self.au_mot("12 dix-huitièmes")
        self.play(FadeIn(fa, scale=1.3), br.apparaitre(0.9), run_time=0.9)
        self.play(br.colorier(range(12), lag=0.05), run_time=0.9)
        self.au_mot("On divise par 2")
        self.play(Create(h1[0]), FadeIn(h1[1]), Create(b1[0]), FadeIn(b1[1]), run_time=0.4)
        b9, anim = br.regrouper(2, run_time=0.8)
        self.play(anim)
        self.au_mot("6 neuvièmes")
        self.play(FadeIn(s1), FadeIn(fb, scale=1.3), run_time=0.4)
        self.au_mot("Peut-on encore simplifier")
        q = self.t("encore ?", 40, ORANGE_RETENUE).next_to(fb, UP, buff=1.05)
        self.play(FadeIn(q, scale=0.7), run_time=0.4)
        self.au_mot("dans la table de 3")
        self.play(Indicate(VGroup(fb.num, fb.den), color=AMBRE, scale_factor=1.3), FadeOut(q), run_time=0.6)
        self.au_mot("On divise par 3")
        self.play(Create(h2[0]), FadeIn(h2[1]), Create(b2[0]), FadeIn(b2[1]), run_time=0.6)
        b3, anim = b9.regrouper(3, run_time=1.0)
        self.play(anim)
        self.au_mot("2 tiers")
        self.play(FadeIn(s2), FadeIn(fc, scale=1.3), run_time=0.4)
        self.au_mot("2 et 3 ne se divisent plus")
        self.play(Indicate(fc, color=VERT_OK, scale_factor=1.25), run_time=0.7)
        self.au_mot("On s'arrête")
        fin = self.t("ne se simplifie plus", 36, VERT_OK).move_to(P(-1.1, -3.22))
        self.play(FadeIn(fin, shift=UP * 0.15), Create(self.encadrer(fc)), run_time=0.6)
        self.attendre_voix()

    # ── 10 : QUESTION 2 (laquelle ne se simplifie plus ?) ──────────────────

    def loupe(self, r=0.9):
        return VGroup(Circle(radius=r, stroke_color=AMBRE, stroke_width=10),
                      Line(P(r * 0.72, -r * 0.72), P(r * 1.6, -r * 1.6), stroke_color=AMBRE, stroke_width=16))

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        lp = self.loupe(1.3).move_to(P(-3.2, 0.3))
        qm = self.t("?", 110, AMBRE).move_to(lp[0])
        self.add(lp, qm)

        def apres(sc):
            sc.au_mot("4 sixièmes se divise par 2")
            sc.play(Indicate(sc.cartes_q[0], color=ORANGE_RETENUE, scale_factor=1.03), run_time=0.5)
            sc.au_mot("et 9 douzièmes par 3")
            sc.play(Indicate(sc.cartes_q[2], color=ORANGE_RETENUE, scale_factor=1.03), run_time=0.5)

        self.question_pause("10-question", "10b-reponse", ["Laquelle ne se", "simplifie plus ?"],
                            [self.inline("4/6"), self.inline("3/5"), self.inline("9/12")], 1,
                            ["3 et 5 ne se divisent pas", "par un même nombre,", "à part 1."],
                            mot_q="Laquelle", autres_r=apres)

    def _disposer_q(self, question, choix, phrase):
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        self.cartes_q = cartes
        return tete, q, cartes, pause, rebours, ph

    # ── 11 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.ecran("11-piege")
        kw = dict(largeur=4.6, hauteur=0.6, marge=0.22)
        ba = Barre(8, 6, centre=P(-2.85, 2.15), **kw)
        bb = Barre(6, 4, centre=P(-2.85, 0.55), **kw)
        bc = Barre(8, 3, centre=P(-2.85, -1.05), **kw)
        la = Text("6/8", font_size=34, color=VERT_OK).next_to(ba, LEFT, buff=0.15)
        lb = Text("4/6", font_size=34, color=ROUGE_ERREUR).next_to(bb, LEFT, buff=0.15)
        lc = Text("3/8", font_size=34, color=ROUGE_ERREUR).next_to(bc, LEFT, buff=0.15)
        for l in (la, lb, lc):
            l.sans_synchro = True
        tit = self.col(self.t("Attention au piège !", 46, ROUGE_ERREUR), 3.0)
        self.au_mot("Attention au piège")
        self.play(Write(tit), FadeIn(ba), FadeIn(la), run_time=0.6)
        f1, g1 = EcritureFraction(6, 8, fs=46), EcritureFraction(4, 6, fs=46, couleur=ROUGE_ERREUR)
        e1 = egalite(f1, g1, signe="→", buff=0.9)
        self.col(e1, 1.35)
        h1, b1 = fleches(f1, g1, "− 2", couleur=ROUGE_ERREUR, fs=34, angle=TAU / 9)
        self.au_mot("Certains enlèvent 2")
        self.play(FadeIn(f1), Create(h1[0]), FadeIn(h1[1]), Create(b1[0]), FadeIn(b1[1]), run_time=0.7)
        self.au_mot("4 sixièmes")
        self.play(FadeIn(e1[1]), FadeIn(g1, scale=1.3), run_time=0.4)
        self.au_mot("Faux")
        x1 = croix(g1, sw=5).set_stroke(opacity=0.85)
        self.play(Create(x1), run_time=0.4)
        self.au_mot("c'est moins long")
        tir = ba.fin_coloriee(vers=-2.0)
        self.play(FadeIn(bb), FadeIn(lb), run_time=0.5)
        self.play(Create(tir), Indicate(bb.parts[3], color=ROUGE_ERREUR), run_time=0.7)
        f2, g2 = EcritureFraction(6, 8, fs=46), EcritureFraction(3, 8, fs=46, couleur=ROUGE_ERREUR)
        e2 = egalite(f2, g2, signe="→", buff=0.9)
        self.col(e2, -1.4)
        h2, _ = fleches(f2, g2, "÷ 2", bas="", couleur=ROUGE_ERREUR, fs=34, angle=TAU / 9)
        self.au_mot("seulement le haut")
        self.play(FadeIn(f2), Create(h2[0]), FadeIn(h2[1]), run_time=0.6)
        self.au_mot("3 huitièmes")
        self.play(FadeIn(e2[1]), FadeIn(g2, scale=1.3), FadeIn(bc), FadeIn(lc), run_time=0.5)
        self.au_mot("Faux aussi")
        x2 = croix(g2, sw=5).set_stroke(opacity=0.85)
        self.play(Create(x2), run_time=0.4)
        self.au_mot("2 fois moins")
        acc = bc.accolade("2 fois moins", couleur=ROUGE_ERREUR, fs=28, dessus=False)
        self.play(FadeIn(acc, shift=UP * 0.15), run_time=0.5)
        self.au_mot("On divise en haut ET en bas")
        r = self.col(self.bloc(["En haut ET en bas,", "le même nombre !"], 34, VERT_OK), -2.75)
        self.play(FadeIn(r, shift=UP * 0.2), run_time=0.5)
        self.insister(r, 1.08, 0.25)
        self.attendre_voix()

    # ── 12 : QUESTION 3 (simplifier 10/15) ──────────────────────────────────

    def ecran_question3(self):
        self.clear()
        self.add_mascotte()
        b = Barre(15, 10, largeur=5.4, hauteur=0.75, centre=P(-3.3, 0.3))
        self.add(b)

        def apres(sc):
            b5, anim = b.regrouper(5, run_time=1.0)
            sc.play(anim)
            sc.au_mot("tombent dans le piège")
            sc.play(*[Indicate(sc.cartes_q[i], color=ROUGE_ERREUR, scale_factor=1.03) for i in (1, 2)], run_time=0.6)

        self.question_pause("12-question", "12b-reponse", ["Simplifie", "10 quinzièmes."],
                            [self.inline("2/3"), self.inline("8/13"), self.inline("2/15")], 0,
                            ["10 ÷ 5 = 2", "15 ÷ 5 = 3"], mot_q="Simplifie", autres_r=apres)

    # ── 13 : défi (la tarte en 12) ──────────────────────────────────────────

    def tarte(self, k=0, centre=P(-3.4, -0.1)):
        return Disque(12, k, rayon=2.1, centre=centre, vide="#fde68a")

    def ecran_defi(self):
        self.ecran("13-defi", 0.65)
        d = self.tarte()
        self.au_mot("À toi de jouer")
        tit = self.col(self.t("À toi de jouer !", 50, JAUNE_TITRE), 3.0)
        self.play(Write(tit), run_time=0.6)
        self.au_mot("sa tarte en 12 parts")
        self.play(d.apparaitre(1.2))
        l1 = self.col(self.ligne([("12", BLEU_CALCUL), ("parts égales", WHITE)], 40), 1.9)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("On en a mangé 8")
        self.play(d.colorier(range(8), lag=0.12), run_time=1.2)
        l2 = self.col(self.ligne([("8", BLEU_CALCUL), ("parts mangées", WHITE)], 40), 1.1)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Quelle fraction")
        l3 = self.col(self.t("Quelle fraction mangée ?", 38, ORANGE_RETENUE), 0.1)
        self.play(FadeIn(l3, scale=0.8), run_time=0.4)
        self.au_mot("Simplifie-la au maximum")
        l4 = self.col(self.t("Simplifie au maximum !", 38, AMBRE), -0.7)
        self.play(FadeIn(l4, shift=UP * 0.2), run_time=0.4)
        self.pause_defi(y=-1.6)

    def ecran_correction(self):
        self.ecran("13b-correction", 0.65)
        d = self.tarte(8)
        self.add(d)
        tit = self.col(self.t("Correction", 50, JAUNE_TITRE), 3.0)
        self.play(Write(tit), run_time=0.5)
        f, g = EcritureFraction(8, 12, fs=84), EcritureFraction(2, 3, fs=84)
        eg = egalite(f, g, buff=0.9)
        self.col(eg, 0.1)
        haut, bas = fleches(f, g, "÷ 4", fs=40, angle=TAU / 7)
        self.au_mot("8 douzièmes")
        self.play(FadeIn(f, scale=1.3), run_time=0.4)
        self.au_mot("dans la table de 4")
        self.play(Indicate(VGroup(f.num, f.den), color=AMBRE, scale_factor=1.3), run_time=0.6)
        self.au_mot("8 divisé par 4")
        self.play(Create(haut[0]), FadeIn(haut[1]), run_time=0.5)
        self.au_mot("égale 2")
        self.play(FadeIn(eg[1]), FadeIn(g.num, scale=1.4), FadeIn(g.trait), run_time=0.4)
        self.au_mot("12 divisé par 4")
        self.play(Create(bas[0]), FadeIn(bas[1]), run_time=0.5)
        self.au_mot("égale 3")
        self.play(FadeIn(g.den, scale=1.4), run_time=0.4)
        self.au_mot("On a mangé 2 tiers")
        d3, anim = d.regrouper(4, run_time=1.2)
        self.play(anim)
        self.play(Create(self.encadrer(g)), run_time=0.4)
        self.au_mot("Si tu as trouvé 4 sixièmes")
        p = self.col(self.ligne([("4/6 ?", ORANGE_RETENUE), ("encore ÷ 2", AMBRE), ("→ 2/3", VERT_OK)], 36), -2.5)
        for m in p:
            m.sans_synchro = True
        self.play(FadeIn(p[0], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("divise encore par 2")
        self.play(FadeIn(p[1:], shift=RIGHT * 0.2), run_time=0.5)
        self.attendre_voix()

    # ── 14 : la chaîne 3/4 = 0,75 = 75 % ────────────────────────────────────

    def ecran_chaine(self):
        self.ecran("14-chaine")
        f = EcritureFraction(3, 4, fs=96).move_to(P(-4.9, 1.2))
        dv = Division(3, 4, fs=64).move_to(P(0.3, 1.2))
        pc = Pourcentage(75, mode="chargement", largeur=6.2, hauteur=0.65, fs=52, etiquette=True,
                         centre=P(-1.0, -1.35)).vide()
        pc.etiquette.set_opacity(0)
        t1 = self.t("fraction", 34, BLEU_CALCUL).next_to(f, UP, buff=0.35)
        t2 = self.t("nombre décimal", 34, BLEU_CALCUL).next_to(dv, UP, buff=0.55)
        t3 = self.t("pourcentage", 34, BLEU_CALCUL).next_to(pc.piste, UP, buff=0.35)
        self.au_mot("3 quarts")
        self.play(FadeIn(f, scale=1.3), run_time=0.4)
        self.au_mot("3 divisé par 4")
        self.play(FadeIn(dv.etapes[0], shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("égale 0,75")
        self.play(FadeIn(dv.etapes[1], scale=1.3), run_time=0.4)
        self.insister(dv.res, 1.3, 0.25)
        self.au_mot("Et 0,75, c'est 75 %")
        self.play(FadeIn(pc.piste), FadeIn(pc.plein), run_time=0.3)
        self.play(pc.remplir(1.6))
        self.au_mot("75 %")
        self.play(pc.etiquette.animate.set_opacity(1), run_time=0.3)
        self.insister(pc.etiquette, 1.3, 0.25)
        self.au_mot("Simplifier")
        self.play(FadeIn(t1, shift=DOWN * 0.15), Indicate(f, color=BLEU_CALCUL), run_time=0.5)
        self.au_mot("le nombre décimal")
        self.play(FadeIn(t2, shift=DOWN * 0.15), run_time=0.4)
        self.au_mot("le pourcentage")
        self.play(FadeIn(t3, shift=DOWN * 0.15), run_time=0.4)
        self.au_mot("les prochaines vidéos")
        suite = self.t("la suite : les prochaines vidéos !", 32, AMBRE).move_to(P(-0.4, -2.65))
        self.play(FadeIn(suite, shift=UP * 0.15), run_time=0.5)
        self.attendre_voix()

    # ── 15 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.ecran("15-finale", 0.65)
        ba = Barre(8, 6, largeur=4.4, hauteur=0.6, etiquette="frac", fs=34, centre=P(-3.6, 0.8))
        bb = Barre(4, 3, largeur=4.4, hauteur=0.6, etiquette="frac", fs=34, centre=P(-3.6, -1.4))
        tir = ba.fin_coloriee(vers=-(ba.contour.get_bottom()[1] - bb.contour.get_bottom()[1]) - 0.2)
        fig = VGroup(ba, bb, tir)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("Fractions égales :", "même longueur."),
                                                         ("× ou ÷ en haut ET en bas,", "par le même nombre."),
                                                         ("Simplifier : diviser", "jusqu'à ne plus pouvoir."),
                                                         ("Jamais de soustraction !",)], fs=36)
        self.au_mot("Deux fractions égales")
        self.montrer_ligne(lignes[0], Indicate(tir, color=AMBRE))
        self.au_mot("On multiplie ou on divise")
        self.montrer_ligne(lignes[1])
        self.au_mot("Pour simplifier")
        self.montrer_ligne(lignes[2])
        self.au_mot("Et on ne soustrait jamais")
        self.montrer_ligne(lignes[3])
        lignes[3][1].set_color(ROUGE_ERREUR)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        b, f = self.ecran_barre()
        self.ecran_regrouper(b, f)
        self.ecran_regle()
        self.ecran_reponse()
        self.ecran_multiplier()
        self.ecran_question1()
        self.ecran_grille()
        self.ecran_jusquau_bout()
        self.ecran_question2()
        self.ecran_piege()
        self.ecran_question3()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_chaine()
        self.ecran_finale()
        self.page_abonnement("16-abonne")


class FracEgale6e(FracEgaleBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
