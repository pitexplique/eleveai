# frac_multiplier.py
# EleveAI — Maths 4e — série « Fractions », épisode 07 : MULTIPLIER DES
# FRACTIONS (micro du coach : fraction_multiplier, notion fraction_calcul),
# AVEC VOIX. Paysage 16:9, CEINTURE VERTE : la paysage complète du niveau 4e
# (le produit vu comme une AIRE, la règle, simplifier AVANT de multiplier,
# relatifs, « de » = fois, défi corrigé, chaîne décimal → pourcentage).
# Short jumeau : frac_multiplier_short.py (l'origami, blanche).
#
# Décor et métier : l'ÉNERGIE SOLAIRE ; Ibrahim, INSTALLATEUR DE PANNEAUX
# SOLAIRES : sur un carré d'1 m de côté, un panneau de 2/3 de la largeur et
# 3/4 de la hauteur couvre 2/3 × 3/4 = 6/12 = 1/2 m² (= 0,5 = 50 %) ; défi :
# 4/5 de 3/4 du toit = 3/5 = 0,6 = 60 %. Chiffres inventés (aucune donnée du
# monde réel citée). Centres : sciences, nature-ecologie.
# Vérifié (Python, fractions.Fraction) : 2/3 × 3/4 = 1/2 ; 3/5 × 2/7 = 6/35 ;
# 4/9 × 3/8 = 1/6 (= 12/72) ; −2/5 × 5/6 = −1/3 ; −3/4 × (−2/3) = 1/2 ;
# 4/5 × 3/4 = 3/5.
#
# Micro → écrans (banque 4e/maths/fractions.bank.ts) : tirerProduit/
# genProduitQcm/Court (02-03 : « on multiplie les numérateurs entre eux et les
# dénominateurs entre eux », question 1 = 3/5 × 2/7, leurres (a+b)/(c+d) et
# (a×b)/(c+d)), explProduit « on multiplie, puis on simplifie » (03, 06),
# formes « -a*b », « a*(-b) » (07, question 2), forme « de » (10 : défi).
# Écrans : 00 garde · 01 Ibrahim et le panneau · 02 la grille (aire) · 03 la
# règle · 04 QUESTION 1 · 05 le piège · 06 simplifier avant · 07 relatifs ·
# 08 QUESTION 2 · 09 0,5 = 50 % · 10 défi · 10b correction · 11 ce que tu as
# appris · 12 fin.
#
# ⭐ Bases : 4e/frac_lote_commun.py (PaysageE) ; canvas_fractions.py (non modifié).
# Voix : manim/voix/4e-frac-multiplier.json (débit −10), WAV dans
# public/sons/4e-frac-multiplier/ ; marques : 4e/frac_multiplier_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/frac_multiplier.py FracMultiplier4e
# python -m manim render -qh --disable_caching manim/scripts/4e/frac_multiplier.py FracMultiplier4e -o eleveai-maths-4e-frac-multiplier --media_dir manim/scripts/4e/media-frac-multiplier
# Sortie : manim/sorties/4e/maths/fractions/07-multiplier/eleveai-maths-4e-frac-multiplier.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lote_commun import *  # noqa: E402,F403

PANNEAU = BLEU_PART
TUILE = "#f87171"
XC = -2.9      # le centre du carré (zone de gauche)


def installateur(s=1.0):
    """Ibrahim : casque de chantier orange, gilet."""
    p = personne(peau="#5c3a21", tenue="#f97316", cheveux="#111827", s=s)
    c = p.tete.get_center()
    r = p.tete.width / 2
    casque = AnnularSector(inner_radius=0, outer_radius=r * 1.12, angle=PI, start_angle=0, fill_color="#facc15",
                           fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.55)
    visiere = RoundedRectangle(width=r * 2.6, height=r * 0.22, corner_radius=r * 0.1, fill_color="#eab308",
                               fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.05)
    bande = Rectangle(width=p.corps.width * 0.75, height=0.12, fill_color="#e5e7eb", fill_opacity=1,
                      stroke_width=0).move_to(p.corps.get_center() + DOWN * 0.15)
    p.add(bande, casque, visiere)
    return p


class Pave(VGroup):
    """Le carré unité (carte du coach) coupé en `cols` colonnes et `rangs` rangées ;
    les cases de la colonne < a et de la rangée < b (en partant du bas à gauche)
    sont prises. .fond .pris (un rectangle) .vert (traits verticaux) .hori
    .cases[r][c] (r = 0 en bas) ; .L le côté."""

    def __init__(self, cols, rangs, a, b, L=3.4, couleur=PANNEAU, centre=ORIGIN, carte=True, **kw):
        super().__init__(**kw)
        self.L, self.cols, self.rangs = L, cols, rangs
        self.fond = Square(side_length=L, fill_color=VIDE, fill_opacity=1, stroke_color=BORD, stroke_width=4)
        g, bas = -L / 2, -L / 2
        self.pris = Rectangle(width=L * a / cols, height=L * b / rangs, fill_color=couleur, fill_opacity=1,
                              stroke_width=0).move_to(P(g + L * a / cols / 2, bas + L * b / rangs / 2))
        self.vert = VGroup(*[Line(P(g + L * j / cols, bas), P(g + L * j / cols, -bas), color=BORD, stroke_width=3)
                             for j in range(1, cols)])
        self.hori = VGroup(*[Line(P(g, bas + L * i / rangs), P(-g, bas + L * i / rangs), color=BORD, stroke_width=3)
                             for i in range(1, rangs)])
        self.cases = [[Rectangle(width=L / cols, height=L / rangs, stroke_width=0, fill_opacity=0)
                       .move_to(P(g + L * (c + 0.5) / cols, bas + L * (r + 0.5) / rangs)) for c in range(cols)]
                      for r in range(rangs)]
        self.carte = RoundedRectangle(width=L + 0.4, height=L + 0.4, corner_radius=0.2, fill_color=CARTE,
                                      fill_opacity=1, stroke_color=GRILLE, stroke_width=3) if carte else VMobject()
        self.contour = Square(side_length=L, stroke_color=BORD, stroke_width=5, fill_opacity=0)
        self.add(self.carte, self.fond, self.pris, self.vert, self.hori, self.contour,
                 VGroup(*[c for r in self.cases for c in r]))
        self.move_to(centre)

    def accolade(self, txt_frac, bas=True, couleur=AMBRE, fs=40):
        """L'accolade sous la largeur prise (bas=True) ou à droite de la hauteur prise ;
        txt_frac = (num, den) → une fraction écrite."""
        br = Brace(self.pris, DOWN if bas else RIGHT, color=couleur, buff=0.08)
        f = EcritureFraction(*txt_frac, fs=fs, couleur=couleur)
        f.next_to(br, DOWN if bas else RIGHT, buff=0.1)
        return VGroup(br, f)

    def numeros(self, cases, fs=30):
        """Des numéros 1, 2, 3… dans les cases données (liste de (r, c))."""
        out = VGroup()
        for k, (r, c) in enumerate(cases):
            t = Text(str(k + 1), font_size=fs, color=NUIT, weight=BOLD).move_to(self.cases[r][c])
            t.sans_synchro = True
            t._pas_audit = True
            out.add(t)
        return out


def frac_prod(n1, n2, d1, d2, fs=56, couleur=WHITE, signe=None):
    """« n1 × n2 / d1 × d2 » : .n1 (« n1 × ») .n2 .d1 (« d1 × ») .d2 .trait ;
    chaque morceau se pose AU MOT (sans_synchro)."""
    g = VGroup()
    num = VGroup(Text(f"{n1} ×", font_size=fs, color=couleur), Text(str(n2), font_size=fs, color=couleur))
    den = VGroup(Text(f"{d1} ×", font_size=fs, color=couleur), Text(str(d2), font_size=fs, color=couleur))
    for v in (num, den):
        v.arrange(RIGHT, buff=0.18)
    larg = max(num.width, den.width) + 0.25
    trait = Line(LEFT * larg / 2, RIGHT * larg / 2, color=couleur, stroke_width=max(3, fs / 14))
    num.next_to(trait, UP, buff=0.12)
    den.next_to(trait, DOWN, buff=0.12)
    g.add(num, trait, den)
    g.n1, g.n2, g.d1, g.d2, g.trait = num[0], num[1], den[0], den[1], trait
    for m in g.get_family():
        m.sans_synchro = True
    return g


def barrer(m, couleur=ROUGE_ERREUR):
    return Line(m.get_corner(DL) + P(-0.05, -0.03), m.get_corner(UR) + P(0.05, 0.03), color=couleur, stroke_width=5)


def petit(v, m, haut=True, couleur=VERT_OK, fs=30):
    t = Text(str(v), font_size=fs, color=couleur)
    t.sans_synchro = True
    return t.next_to(m, UP if haut else DOWN, buff=0.05).shift(RIGHT * 0.12)


class FracMultiplierBase(PaysageE):
    nom_voix = "4e-frac-multiplier"
    fichier_marques = "frac_multiplier_marques.json"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Multiplier des fractions", self.identite, self.ceinture, y_ech=-2.7)
        self.au_mot("Multiplier")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        ex = expression((2, 3), "×", (3, 4), "=", "?", fs=80).move_to(P(-0.6, 0.2))
        ex[4].set_color(AMBRE)
        self.montre(["2 tiers", "fois 3"], [ex[0], ex[1:3]])
        self.au_mot("combien")
        self.play(FadeIn(ex[3:], scale=0.5), run_time=0.4)
        self.insister(ex[4], 1.4, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Ibrahim et le panneau ──────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = installateur(1.0).move_to(P(-5.4, -0.5))
        self.au_mot("Voici Ibrahim")
        nom = self.t("Ibrahim", 38, BLEU_CALCUL).next_to(pers, UP, buff=0.35)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.5)
        self.au_mot("installateur")
        metier = self.bloc(["installateur", "solaire"], 28, BLEU_CALCUL).next_to(pers, DOWN, buff=0.15)
        bloc_fixe(metier)
        self.play(FadeIn(metier, shift=UP * 0.2), run_time=0.4)
        pv = Pave(3, 4, 2, 3, L=3.2, centre=P(-2.3, 0.3))
        pv.pris.set_opacity(0)
        pv.vert.set_opacity(0)
        pv.hori.set_opacity(0)
        un = self.t("1 m", 30).next_to(pv.carte, UP, buff=0.1)
        self.au_mot("un carré")
        self.play(FadeIn(pv), run_time=0.5)
        self.au_nb("d'1 mètre")
        self.play(FadeIn(un, shift=DOWN * 0.1), run_time=0.3)
        lg = self.pave_ligne("largeur :", (2, 3), 2.15)
        lh = self.pave_ligne("hauteur :", (3, 4), 0.45)
        acc_l = pv.accolade((2, 3), bas=True, fs=34)
        acc_h = pv.accolade((3, 4), bas=False, fs=34)
        self.au_mot("2 tiers de la largeur")
        self.play(pv.pris.animate.set_opacity(1).stretch(1, 0), FadeIn(acc_l), FadeIn(lg[1]), run_time=0.5)
        self.play(FadeIn(lg[0], shift=RIGHT * 0.15), run_time=0.3)
        self.au_mot("3 quarts de la hauteur")
        self.play(FadeIn(acc_h), FadeIn(lh[1]), Indicate(pv.pris, color=AMBRE, scale_factor=1.03), run_time=0.5)
        self.play(FadeIn(lh[0], shift=RIGHT * 0.15), run_time=0.3)
        self.au_mot("Quelle part")
        q = self.col(self.t("Aire du panneau : ? m²", 40, ORANGE_RETENUE), -0.9)
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.4)
        self.attendre_voix()

    def pave_ligne(self, mot, f, y):
        l = VGroup(self.t(mot, 40), EcritureFraction(*f, fs=54, couleur=AMBRE)).arrange(RIGHT, buff=0.25)
        return self.col(l, y)

    # ── 02 : la grille : 6 rectangles sur 12 ────────────────────────────────
    def ecran_grille(self):
        self.ecran("02-grille")
        pv = Pave(3, 4, 2, 3, L=3.6, centre=P(XC, 0.0))
        pv.vert.set_opacity(0)
        pv.hori.set_opacity(0)
        self.add(pv)
        self.au_nb("la largeur en 3")
        self.play(pv.vert.animate.set_opacity(1), run_time=0.5)
        self.au_nb("la hauteur en 4")
        self.play(pv.hori.animate.set_opacity(1), run_time=0.5)
        self.au_mot("3 fois 4")
        self.calc([("3 × 4 =", WHITE), ("12", AMBRE)], 2.3, 50, avec=[Indicate(pv.fond, color=AMBRE, scale_factor=1.02)])
        self.au_mot("12 petits rectangles")
        self.play(Indicate(VGroup(pv.vert, pv.hori), color=AMBRE), run_time=0.5)
        self.au_mot("2 fois 3")
        nums = pv.numeros([(r, c) for r in range(3) for c in range(2)])
        self.calc([("2 × 3 =", WHITE), ("6", BLEU_CALCUL)], 1.0, 50,
                  avec=[LaggedStart(*[FadeIn(n, scale=1.5) for n in nums], lag_ratio=0.15, run_time=0.8)])
        self.au_mot("6 douzièmes")
        f = EcritureFraction(6, 12, fs=70, couleur=BLEU_CALCUL)
        l = VGroup(f, self.t("m²", 44, BLEU_CALCUL)).arrange(RIGHT, buff=0.2)
        self.col(l, -0.9)
        self.play(FadeIn(l, scale=1.2), run_time=0.4)
        self.play(Create(self.encadrer(l, buff=0.15)), run_time=0.3)
        self.attendre_voix()
        return pv

    # ── 03 : la règle ───────────────────────────────────────────────────────
    def ecran_regle(self, pv):
        self.ecran("03-regle")
        self.add(pv)
        self.au_mot("C'est la règle")
        tit = self.titre("La règle")
        e = expression((2, 3), "×", (3, 4), "=", fs=60)
        fp = frac_prod(2, 3, 3, 4, fs=56)
        ligne = VGroup(e, fp).arrange(RIGHT, buff=0.3)
        fp.shift(UP * (e[0].trait.get_y() - fp.trait.get_y()))
        self.col(ligne, 1.45)
        self.montre(["pour 2 tiers", "fois 3 quarts"], [e[0], e[1:]])
        self.au_mot("2 fois 3")
        self.play(FadeIn(fp.n1, shift=DOWN * 0.1), Indicate(VGroup(e[0].num, e[2].num), color=AMBRE), run_time=0.35)
        self.au_nb("2 fois 3")
        self.play(FadeIn(fp.n2, shift=DOWN * 0.1), run_time=0.3)
        self.au_mot("3 fois 4")
        self.play(FadeIn(fp.trait), FadeIn(fp.d1, shift=UP * 0.1), Indicate(VGroup(e[0].den, e[2].den), color=AMBRE),
                  run_time=0.35)
        self.au_nb("3 fois 4")
        self.play(FadeIn(fp.d2, shift=UP * 0.1), run_time=0.3)
        f, g = EcritureFraction(6, 12, fs=64), EcritureFraction(1, 2, fs=64, couleur=VERT_OK)
        eg = egalite(f, g, buff=1.0)
        eg = VGroup(Text("=", font_size=64), eg).arrange(RIGHT, buff=0.35)
        eg[0].set_y(f.trait.get_y())
        eg[0].sans_synchro = True
        self.col(eg, -1.35)
        self.au_mot("6 douzièmes")
        self.play(FadeIn(eg[0]), FadeIn(f, scale=1.2), run_time=0.4)
        haut, bas = fleches(f, g, "÷ 6", fs=30, angle=TAU / 10)
        self.au_nb("on divise par 6")
        self.play(Create(haut[0]), FadeIn(haut[1]), Create(bas[0]), FadeIn(bas[1]), run_time=0.5)
        self.au_nb("par 6 : 1")
        self.play(FadeIn(eg[1][1]), FadeIn(g, scale=1.3), run_time=0.4)
        moitie = DashedLine(pv.fond.get_corner(UR), pv.fond.get_corner(DL), color=AMBRE, stroke_width=5)
        self.au_mot("Un demi-mètre carré")
        r = self.t("un demi-mètre carré", 34, VERT_OK).move_to(P(XC, -2.55))
        self.play(FadeIn(r, scale=1.2), Indicate(pv.pris, color=VERT_OK, scale_factor=1.03), run_time=0.5)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (3/5 × 2/7) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        pv = Pave(5, 7, 3, 2, L=3.6, centre=P(XC, 0.0))
        pv.pris.set_opacity(0)
        self.add(pv)

        def apres(sc):
            sc.au_mot("En haut")
            sc.rep(0, avec=[pv.pris.animate.set_opacity(1)])
            sc.au_mot("En bas")
            sc.rep(1, avec=[Indicate(VGroup(pv.vert, pv.hori), color=AMBRE)])
            sc.rep_fin()

        self.question_pause("04-question", "04b-reponse", ["3 cinquièmes", "× 2 septièmes ?"],
                            [self.inline("5/12"), self.inline("6/35"), self.inline("6/12")], 1,
                            ["En haut : 3 × 2 = 6", "En bas : 5 × 7 = 35"], mot_q="3 cinquièmes", autres_r=apres)

    # ── 05 : le piège (ne pas mélanger avec l'addition) ─────────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        self.au_mot("Attention")
        tit = self.titre("Attention !", ROUGE_ERREUR)
        self.au_mot("ne mélange pas")
        r = self.col(self.bloc(["Pas de dénominateur", "commun pour multiplier !"], 38, ROUGE_ERREUR), 1.85)
        self.au_mot("on ne cherche pas")
        self.poser_lignes(r, "up", 0.3)
        faux = expression((2, 3), "×", (3, 4), "=", (5, 7, ROUGE_ERREUR), fs=60)
        self.col(faux, 0.2)
        self.montre(["Et 2 tiers", "fois 3 quarts"], [faux[0], faux[1:4]])
        self.au_mot("5 septièmes")
        self.play(FadeIn(faux[4], scale=1.3), run_time=0.3)
        self.play(Create(croix(faux[3:], sw=6).set_stroke(opacity=0.9)), run_time=0.3)
        f, g = EcritureFraction(2, 3, fs=110), EcritureFraction(3, 4, fs=110)
        paire = VGroup(f, Text("×", font_size=90), g).arrange(RIGHT, buff=0.5).move_to(P(-3.3, 0.0))
        pas_audit(paire)
        self.play(FadeIn(paire), run_time=0.4)
        haut, bas = fleches(f, g, "×", fs=44, angle=TAU / 6)
        self.au_mot("on multiplie en haut")
        self.play(Create(haut[0]), FadeIn(haut[1]), Indicate(VGroup(f.num, g.num), color=AMBRE), run_time=0.6)
        self.au_mot("on multiplie en bas")
        self.play(Create(bas[0]), FadeIn(bas[1]), Indicate(VGroup(f.den, g.den), color=AMBRE), run_time=0.6)
        self.attendre_voix()

    # ── 06 : simplifier AVANT de multiplier (4/9 × 3/8) ─────────────────────
    def ecran_avant(self):
        self.ecran("06-avant")
        self.au_mot("on simplifie avant")
        tit = self.titre("Simplifier avant !", VERT_OK)
        e = expression((4, 9), "×", (3, 8), "=", fs=64)
        fp = frac_prod(4, 3, 9, 8, fs=64)
        ligne = VGroup(e, fp).arrange(RIGHT, buff=0.3).move_to(P(-2.6, 0.6))
        fp.shift(UP * (e[0].trait.get_y() - fp.trait.get_y()))
        self.montre(["4 neuvièmes", "fois 3 huitièmes"], [e[0], e[1:]])
        self.montre(["En haut, 4", "En haut, 4 fois 3", "En bas, 9", "En bas, 9 fois 8"],
                    [VGroup(fp.n1, fp.trait), fp.n2, fp.d1, fp.d2], anim="fade", run_time=0.3)
        q4, q8 = fp.n1[0], fp.d2
        self.au_mot("4 et 8")
        self.play(Indicate(VGroup(q4, q8), color=AMBRE, scale_factor=1.4), run_time=0.6)
        self.au_nb("se divisent par 4 : 1")
        u1 = petit(1, q4, True)
        self.play(Create(barrer(q4)), FadeIn(u1, scale=1.4), run_time=0.35)
        self.au_nb("se divisent par 4 : 1 et 2")
        u2 = petit(2, q8, False)
        self.play(Create(barrer(q8)), FadeIn(u2, scale=1.4), run_time=0.35)
        q3, q9 = fp.n2, fp.d1[0]
        self.au_mot("3 et 9")
        self.play(Indicate(VGroup(q3, q9), color=AMBRE, scale_factor=1.4), run_time=0.6)
        self.au_nb("se divisent par 3 : 1")
        u3 = petit(1, q3, True)
        self.play(Create(barrer(q3)), FadeIn(u3, scale=1.4), run_time=0.35)
        self.au_nb("se divisent par 3 : 1 et 3")
        u4 = petit(3, q9, False)
        self.play(Create(barrer(q9)), FadeIn(u4, scale=1.4), run_time=0.35)
        self.au_mot("Il reste")
        self.calc([("1 × 1", WHITE), ("sur", GREY_B), ("3 × 2", WHITE)], 1.3, 46)
        self.au_mot("1 sixième")
        res = self.col(VGroup(Text("=", font_size=64), EcritureFraction(1, 6, fs=64, couleur=VERT_OK))
                       .arrange(RIGHT, buff=0.3), -0.5)
        res[0].sans_synchro = True
        self.play(FadeIn(res, scale=1.3), run_time=0.4)
        self.play(Create(self.encadrer(res[1], buff=0.15)), run_time=0.3)
        self.au_mot("Pas besoin")
        p72 = self.col(self.t("Pas besoin de calculer 72 !", 36, AMBRE), -2.2)
        self.play(FadeIn(p72, shift=UP * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 07 : avec des relatifs (−2/5 × 5/6 = −1/3) ──────────────────────────
    def ecran_relatifs(self):
        self.ecran("07-relatifs")
        self.au_mot("Avec des relatifs")
        tit = self.titre("Avec des relatifs")
        e = expression("−", (2, 5), "×", (5, 6), fs=64).move_to(P(-3.0, 1.6))
        self.montre(["Moins 2 cinquièmes", "fois 5 sixièmes"], [e[:2], e[2:]])
        regle = VGroup(Text("−", font_size=60, color=ROUGE_ERREUR), Text("×", font_size=54),
                       Text("+", font_size=60, color=VERT_OK), Text("→", font_size=54),
                       Text("−", font_size=60, color=ROUGE_ERREUR)).arrange(RIGHT, buff=0.3)
        for m in regle:
            m.sans_synchro = True
        self.col(regle, 1.9)
        self.au_mot("moins fois plus")
        self.play(FadeIn(regle[:3], shift=RIGHT * 0.15), run_time=0.4)
        self.au_mot("ça donne moins")
        self.play(FadeIn(regle[3:], shift=RIGHT * 0.15), run_time=0.35)
        self.insister(regle[4], 1.5, 0.25)
        fp = frac_prod(2, 5, 5, 6, fs=56)
        signe = Text("= −", font_size=60)
        signe.sans_synchro = True
        ln = VGroup(signe, fp).arrange(RIGHT, buff=0.25).move_to(P(-3.0, -0.6))
        signe.set_y(fp.trait.get_y())
        f = EcritureFraction(10, 30, fs=60)
        g = EcritureFraction(1, 3, fs=60, couleur=VERT_OK)
        eg = VGroup(Text("−", font_size=60), f, Text("= −", font_size=60), g).arrange(RIGHT, buff=0.25)
        for m in (eg[0], eg[2]):
            m.sans_synchro = True
        self.col(eg, -0.2)
        self.montre(["2 fois", "2 fois 5", "égale 10"], [VGroup(signe, fp.n1, fp.trait), fp.n2, VGroup(eg[0], f.num, f.trait)],
                    anim="fade", run_time=0.3)
        self.montre(["10. 5", "5 fois 6", "égale 30"], [fp.d1, fp.d2, f.den], anim="fade", run_time=0.3)
        self.au_nb("Moins 10")
        self.play(Indicate(eg[:2], color=AMBRE), run_time=0.4)
        self.au_nb("On simplifie par 10")
        self.play(Indicate(f, color=AMBRE), run_time=0.4)
        self.au_nb("moins 1 tiers")
        self.play(FadeIn(eg[2:], scale=1.3), run_time=0.4)
        self.play(Create(self.encadrer(eg[2:], buff=0.12)), run_time=0.3)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (−3/4 × −2/3) ───────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        e = VGroup(*[Text(c, font_size=110, color=k) for c, k in (("−", ROUGE_ERREUR), ("×", WHITE),
                                                                    ("−", ROUGE_ERREUR), ("→", WHITE), ("+", VERT_OK))])
        e.arrange(RIGHT, buff=0.35).move_to(P(XC, 0.3))
        pas_audit(e)

        def apres(sc):
            sc.au_mot("Moins fois moins")
            sc.rep(0, avec=[FadeIn(e, scale=1.2)])
            sc.au_mot("3 fois 2")
            sc.rep(1)
            sc.au_mot("4 fois 3")
            sc.rep(2)
            sc.au_mot("6 douzièmes")
            sc.rep(3)
            sc.rep_fin()

        self.question_pause("08-question", "08b-reponse", ["−3 quarts", "× (−2 tiers) ?"],
                            [self.inline("−1/2"), self.inline("1/2"), self.inline("−5/7")], 1,
                            ["− × − → +", "3 × 2 = 6", "4 × 3 = 12", "6/12 = 1/2"], mot_q="moins 3 quarts",
                            autres_r=apres)
        return e

    # ── 09 : 1/2 = 0,5 = 50 % ───────────────────────────────────────────────
    def ecran_chaine(self):
        self.ecran("09-chaine")
        pv = Pave(3, 4, 2, 3, L=3.6, centre=P(XC, 0.0))
        self.au_mot("Revenons au panneau")
        self.play(FadeIn(pv), run_time=0.4)
        f = EcritureFraction(1, 2, fs=70, couleur=VERT_OK)
        self.col(f, 2.0)
        self.au_mot("1 demi")
        self.play(FadeIn(f, scale=1.2), run_time=0.35)
        self.au_mot("1 divisé par 2")
        self.calc([("1 ÷ 2", WHITE), ("= 0,5", BLEU_CALCUL)], 0.5, 54)
        pc = Pourcentage(50, mode="chargement", largeur=4.6, hauteur=0.55, couleur=PANNEAU, etiquette=False)
        pc.vide()
        self.col(pc, -0.8)
        p50 = self.t("50 %", 50, PANNEAU).next_to(pc, DOWN, buff=0.25).align_to(pc, RIGHT)
        pc.plein.set_opacity(1)
        self.au_mot("Le panneau couvre")
        self.play(FadeIn(pc.piste), run_time=0.2)
        self.add(pc.plein)
        self.play(pc.remplir(0.4), Indicate(pv.pris, color=AMBRE, scale_factor=1.03), run_time=0.4)
        self.au_nb("couvre 50")
        self.play(FadeIn(p50, scale=1.3), run_time=0.35)
        self.insister(p50, 1.3, 0.25)
        self.attendre_voix()

    # ── 10 : défi (4/5 de 3/4 du toit) ──────────────────────────────────────
    def toit(self, k_pan=0):
        """Le toit vu de dessus : 5 colonnes × 4 rangées ; 3 rangées de tuiles
        (en bas), 4 colonnes de ces tuiles reçoivent des panneaux si k_pan."""
        pv = Pave(5, 4, 5, 3, L=3.6, couleur=TUILE, centre=P(XC, -0.1))
        pan = Rectangle(width=pv.L * 4 / 5, height=pv.L * 3 / 4, fill_color=PANNEAU, fill_opacity=1, stroke_width=0)
        pan.align_to(pv.pris, DL)
        pv.pan = pan
        return pv

    def ecran_defi(self):
        self.ecran("10-defi", 0.65)
        self.au_mot("À toi de jouer")
        t = self.titre("À toi de jouer !", fs=50)
        pv = self.toit()
        pv.vert.set_opacity(0)
        pv.hori.set_opacity(0)
        pv.pris.set_opacity(0)
        self.play(FadeIn(pv), run_time=0.4)
        l1 = VGroup(self.t("tuiles :", 38, TUILE), EcritureFraction(3, 4, fs=50, couleur=TUILE),
                    self.t("du toit", 38, TUILE)).arrange(RIGHT, buff=0.2)
        l2 = VGroup(self.t("panneaux :", 38, PANNEAU), EcritureFraction(4, 5, fs=50, couleur=PANNEAU),
                    self.t("des tuiles", 38, PANNEAU)).arrange(RIGHT, buff=0.2)
        self.col(l1, 1.75)
        self.col(l2, 0.45)
        self.au_mot("tuiles sur 3 quarts")
        self.play(FadeIn(l1[0], shift=RIGHT * 0.15), run_time=0.3)
        self.au_nb("sur 3 quarts")
        self.play(FadeIn(l1[1:], scale=1.2), pv.pris.animate.set_opacity(1), run_time=0.45)
        self.au_mot("des panneaux")
        self.play(FadeIn(l2[0], shift=RIGHT * 0.15), run_time=0.3)
        self.au_nb("sur 4 cinquièmes")
        self.play(FadeIn(l2[1:], scale=1.2), run_time=0.45)
        self.au_mot("Quelle fraction du toit")
        q = self.col(self.t("Panneaux : ? du toit", 40, ORANGE_RETENUE), -0.75)
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.35)
        self.pause_defi(y=-1.9)

    def ecran_correction(self):
        self.ecran("10b-correction", 0.65)
        t = self.titre("Correction", fs=50)
        pv = self.toit()
        self.add(pv)
        e1 = VGroup(EcritureFraction(4, 5, fs=44, couleur=PANNEAU), self.t("de", 38),
                    EcritureFraction(3, 4, fs=44, couleur=TUILE)).arrange(RIGHT, buff=0.25)
        self.col(e1, 2.15)
        self.montre(["4 cinquièmes de", "de 3 quarts"], [e1[:2], e1[2]])
        e2 = expression("=", (4, 5, PANNEAU), "×", (3, 4, TUILE), fs=44)
        self.col(e2, 0.65)
        self.au_mot("c'est 4 cinquièmes fois")
        self.au_nb("c'est 4")
        self.play(FadeIn(e2[:2], scale=1.2), run_time=0.35)
        self.au_nb("fois 3")
        self.play(FadeIn(e2[2:], scale=1.2), run_time=0.35)
        self.au_nb("4 en haut")
        self.play(Create(barrer(e2[1].num)), run_time=0.3)
        self.au_nb("4 en bas")
        self.play(Create(barrer(e2[3].den)), run_time=0.3)
        self.au_nb("ça fait 1")
        self.play(FadeIn(petit(1, e2[1].num, True)), FadeIn(petit(1, e2[3].den, False)), run_time=0.35)
        self.au_nb("Il reste 3")
        self.add(pv.pan)
        pv.pan.set_opacity(0)
        res = VGroup(Text("=", font_size=52), EcritureFraction(3, 5, fs=52, couleur=VERT_OK)).arrange(RIGHT, buff=0.3)
        res[0].sans_synchro = True
        self.col(res, -0.85)
        self.play(FadeIn(res, scale=1.3), pv.pan.animate.set_opacity(1), run_time=0.5)
        self.add(pv.vert, pv.hori)
        self.au_mot("c'est 0,6")
        r2 = self.col(self.ligne([("= 0,6", BLEU_CALCUL), ("= 60 %", VERT_OK)], 44), -2.3)
        self.poser_lignes(r2, "fade", 0.3)
        self.insister(r2[1], 1.25, 0.25)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("11-finale", 0.65)
        pv = Pave(3, 4, 2, 3, L=3.0)
        lab = expression((2, 3), "×", (3, 4), "=", (6, 12), fs=40).next_to(pv, DOWN, buff=0.3)
        fig = VGroup(pv, lab)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("On multiplie les numérateurs,", "et les dénominateurs."),
                                                         ("On simplifie avant", "de multiplier."),
                                                         ("On applique", "la règle des signes."),
                                                         ("Prendre une fraction de,", "c'est multiplier.")], fs=34)
        self.au_mot("On multiplie les numérateurs")
        self.montrer_ligne(lignes[0])
        self.au_mot("On simplifie avant")
        self.montrer_ligne(lignes[1])
        self.au_mot("On applique")
        self.montrer_ligne(lignes[2])
        self.au_mot("Et prendre")
        self.montrer_ligne(lignes[3])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        pv = self.ecran_grille()
        self.ecran_regle(pv)
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_avant()
        self.ecran_relatifs()
        self.ecran_question2()
        self.ecran_chaine()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")


class FracMultiplier4e(FracMultiplierBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"
