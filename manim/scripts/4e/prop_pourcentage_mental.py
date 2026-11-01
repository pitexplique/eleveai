# prop_pourcentage_mental.py
# EleveAI — Maths 4e — série « Proportionnalité », lot 5 (une paysage par
# micro), épisode 34 : LES POURCENTAGES DE TÊTE (micro du coach :
# prop_pourcentage_mental, notion prop_pourcentages), AVEC VOIX. PAYSAGE
# SEULEMENT (le short 4e-prop-pourcentages-short-* de cette micro existe déjà),
# CEINTURE VERTE.
# ⭐ Méthode travaillée : le calcul MENTAL en partant de 10 % (un dixième : on
# divise par 10), puis 20 % = le double, 30 % = le triple, 5 % = la moitié de
# 10 %, 15 % = 10 % + 5 % ; 100 % = le nombre lui-même, 200 % = son double,
# 50 % = la moitié. Pas de produit en croix (réservé à l'épisode 24) ; « ÷ »
# écrit, jamais 5/2.
# ⭐ Le dessin qui porte tout : la BARRE DE 100 % (BarrePourcent de
# canvas_proportion, mode « chargement », etiquette=False) DÉCOUPÉE EN 10
# MORCEAUX de 10 % : le prix entier au-dessus (accolade), la valeur d'un
# morceau écrite DEDANS (« 9 € »), les morceaux pris coloriés (bleu le premier,
# violet les suivants, ambre le demi-morceau de 5 %), l'accolade du dessous
# donne le résultat. 200 % = deux barres entières (le remplissage vert de
# BarrePourcent).
# ⭐ Fil rouge (erreur 6 de la consigne, le « sur 100 » oublié : le pourcentage
# pris pour des euros qu'on retire) : écran 07, « 90 − 10 » barré, le morceau
# « − 10 € » barré sur la barre. Leurres : question 1 (20 % de 60 €) : B = 20 €
# (le pourcentage pris pour des euros), barré à « égale 6 » ; C = 40 € (60 − 20,
# on retire), barré à « 12 euros ». Question 2 (5 % de 80 €) : B = 75 € (80 −
# 5, on retire), barré à « égale 8 » ; C = 16 € (80 ÷ 5, la mauvaise
# division), barré à « la moitié ».
#
# Décor et métier : Mehdi, VENDEUR dans une boutique de BASKETS, le jour des
# promotions, la calculatrice en panne (la paire à 90 €, à 120 €, à 60 €, à
# 80 €, le défi à 70 €).
# Chiffres : tous inventés (prix, promotions), plausibles. Aucun chiffre du
# monde réel : pas de source à citer.
# Centres d'intérêt : argent-budget, art-design (précision : mode).
#
# Écrans : 00 garde · 01 Mehdi, les promotions, la calculatrice en panne ·
# 02 10 % = un dixième (÷ 10) : 9 € sur 90 €, 12 € sur 120 € · 03 20 % = le
# double, 30 % = le triple · 04 QUESTION 1 (20 % de 60 €) · 05 5 % = la moitié
# de 10 %, 15 % = 10 % + 5 % · 06 100 %, 200 %, 50 % · 07 le piège (90 − 10
# barré) · 08 QUESTION 2 (5 % de 80 €) · 09 défi (70 €, − 30 %) · 09b
# correction · 10 ce que tu as appris · 11 fin.
#
# Voix : manim/voix/4e-prop-pourcentage-mental.json (validée par Frédéric le
# 01/11, débit −10), WAV dans public/sons/4e-prop-pourcentage-mental/ ;
# marques mot à mot : manim/scripts/4e/prop_pourcentage_mental_marques.json
# (scripts/marques_dump.ps1 puis un convertisseur « une marque par
# occurrence » : WinRT répète un cue une fois par mot dit (« 10 % » = 3 cues),
# une répétition n'est une NOUVELLE occurrence que si la voix redit ce texte
# juste après ET qu'au moins 0,5 s sépare les cues : « 10 %. 10 % » de 02).
# Outils : manim/scripts/6e/prop_commun.py + manim/canvas_proportion.py (non
# modifiés) ; base PropRatioEcrireBase de l'épisode 28 (lc, jouer, montre,
# barrer_choix, ligne_rep bornée, coche loin du texte des choix) ;
# calculatrice() et etiquette_prix() de manim/scripts/6e/prop_pourcentage_calcul.py.
# Ajouté ICI : BarreCent (la barre de 100 % en morceaux), mehdi(), basket(),
# bandeau_promo(), pastille_pct().
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/prop_pourcentage_mental.py PropPourcentageMental4e
# PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/4e/prop_pourcentage_mental.py PropPourcentageMental4e -o eleveai-maths-4e-prop-pourcentage-mental --media_dir manim/media-prop-4e-34
# Sortie : manim/sorties/4e/maths/proportionnalite/34-pourcentage-mental/eleveai-maths-4e-prop-pourcentage-mental.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import importlib.util  # noqa: E402

from prop_ratio_ecrire import *  # noqa: E402,F403  (prop_commun, couleurs, sans)
from prop_ratio_ecrire import PropRatioEcrireBase, sans  # noqa: E402


def _charger(nom, chemin):
    spec = importlib.util.spec_from_file_location(nom, chemin)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_p6 = _charger("prop_pourcentage_calcul_6e", Path(__file__).resolve().parents[1] / "6e" / "prop_pourcentage_calcul.py")
calculatrice, etiquette_prix, croix = _p6.calculatrice, _p6.etiquette_prix, _p6.croix

M1 = "#38bdf8"         # le premier morceau de 10 % (bleu)
M2 = "#a78bfa"         # les morceaux suivants (violet)
M5 = "#fbbf24"         # le demi-morceau de 5 % (ambre)
ROUGE_PROMO = "#dc2626"
TENUE_M = "#f97316"    # le tee-shirt de Mehdi (orange de la boutique)
BASKET_C = "#2563eb"


def mehdi(s=1.0):
    """Mehdi, vendeur : tee-shirt orange de la boutique, casquette, badge."""
    p = personne(peau="#a0673d", tenue=TENUE_M, cheveux="#111827")
    t = p.tete
    visiere = RoundedRectangle(width=t.width * 0.75, height=t.width * 0.14, corner_radius=0.04,
                               fill_color="#111827", fill_opacity=1, stroke_width=0)
    visiere.move_to(t.get_center() + UP * t.width * 0.25 + RIGHT * t.width * 0.35)
    badge = RoundedRectangle(width=0.26, height=0.16, corner_radius=0.03, fill_color=WHITE, fill_opacity=1,
                             stroke_width=0).move_to(p.corps.get_center() + P(-0.15, 0.12))
    p.add(visiere, badge)
    return p.scale(s)


def basket(s=1.0, couleur=BASKET_C):
    """Une basket vue de profil : semelle blanche, tige colorée, lacets, bande."""
    tige = Polygon(P(-0.95, 0.1), P(-0.95, 0.72), P(-0.6, 0.85), P(-0.25, 0.6), P(0.5, 0.42), P(0.95, 0.3),
                   P(0.98, 0.1), fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=2.5)
    semelle = RoundedRectangle(width=2.05, height=0.24, corner_radius=0.1, fill_color=WHITE, fill_opacity=1,
                               stroke_width=0).move_to(P(0.01, 0.0))
    lacets = VGroup(*[Line(P(-0.55 + 0.17 * i, 0.73 - 0.08 * i), P(-0.4 + 0.17 * i, 0.62 - 0.08 * i),
                           color=WHITE, stroke_width=4) for i in range(3)])
    bande = ArcBetweenPoints(P(-0.75, 0.25), P(0.6, 0.32), angle=-0.5, color=WHITE, stroke_width=5)
    return VGroup(tige, semelle, lacets, bande).scale(s)


def bandeau_promo(s=1.0):
    """La bannière rouge « PROMOS » de la boutique (mot dit : promotions)."""
    b = RoundedRectangle(width=2.5, height=0.7, corner_radius=0.12, fill_color=ROUGE_PROMO, fill_opacity=1,
                         stroke_width=0)
    t = Text("PROMOS", font_size=34, color=WHITE, weight=BOLD).move_to(b)
    t.sans_synchro = True
    t._pas_audit = True
    return VGroup(b, t).scale(s)


def pastille_pct(pct, s=1.0):
    """La pastille jaune « −30 % » collée sur une paire en promotion."""
    c = Circle(radius=0.6, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_color=ROUGE_PROMO, stroke_width=5)
    t = Text(f"−{pct} %", font_size=30, color=ROUGE_PROMO, weight=BOLD)
    t.scale_to_fit_width(min(t.width, 0.92))
    return VGroup(c, t.move_to(c)).scale(s)


def gras(s, fs=26, couleur=NUIT):
    return Text(s, font_size=fs, color=couleur, weight=BOLD)


class BarreCent(VGroup):
    """LA BARRE DE 100 % DÉCOUPÉE EN MORCEAUX (ajoutée ici, canvas_proportion
    non modifié) : la piste de BarrePourcent (mode « chargement »,
    etiquette=False) recoupée en n morceaux de 10 %, clairs (les cases vides du
    coach). Rien n'est ajouté à la scène.
      .bp (la BarrePourcent : .piste, .plein, .remplir()) · .morceaux[i] · .traits
      .acc / .prix : l'accolade du dessus et le prix entier (renvoyés, non ajoutés)
      colorer(idx, couleur) → animations · demi(i) → le demi-morceau de 5 %
      valeur(i, s) / valeurs(s, idx) → le texte DANS un morceau
      dessous(mob, s, couleur) → (accolade, texte) sous une partie de la barre
    chargement=True : morceaux transparents (la barre se remplit en vert, bp.remplir())."""

    def __init__(self, prix, largeur=7.0, h=0.8, n=10, centre=ORIGIN, fs_prix=34, couleur_prix=JAUNE_TITRE,
                 chargement=False, **kw):
        super().__init__(**kw)
        bp = BarrePourcent(100, mode="chargement", largeur=largeur, hauteur=h, etiquette=False)
        bp.piste.become(RoundedRectangle(width=largeur, height=h, corner_radius=0.1, fill_color="#1e293b",
                                         fill_opacity=1, stroke_color="#94a3b8", stroke_width=4))
        bp.vide()
        bp.move_to(centre)
        self.bp = bp
        W, hh = largeur - 0.16, h - 0.16
        x0, y = bp.piste.get_left()[0] + 0.08, bp.piste.get_y()
        self.lm, self.hh = W / n, hh
        op = 0 if chargement else 1
        self.morceaux = VGroup(*[Rectangle(width=W / n, height=hh, stroke_width=0, fill_color="#e2e8f0",
                                           fill_opacity=op).move_to(P(x0 + (i + 0.5) * W / n, y)) for i in range(n)])
        self.traits = VGroup(*[Line(P(x0 + i * W / n, y - hh / 2), P(x0 + i * W / n, y + hh / 2),
                                    color="#64748b" if not chargement else "#94a3b8", stroke_width=3)
                               for i in range(1, n)])
        self.add(bp, self.morceaux, self.traits)
        self.acc = Brace(bp.piste, UP, buff=0.06, color=WHITE)
        self.prix = gras(prix if isinstance(prix, str) else f"{prix} €", fs_prix, couleur_prix)
        self.prix.next_to(self.acc, UP, buff=0.06)

    def colorer(self, idx, couleur=M2):
        return [self.morceaux[i].animate.set_fill(couleur, 1) for i in idx]

    def demi(self, i, couleur=M5):
        m = self.morceaux[i]
        return Rectangle(width=self.lm / 2, height=self.hh, stroke_width=0, fill_color=couleur,
                         fill_opacity=1).align_to(m, LEFT).set_y(m.get_y())

    def valeur(self, i, s, fs=24, couleur=NUIT, largeur=None):
        t = gras(s, fs, couleur)
        lim = (largeur or self.lm) * 0.86
        if t.width > lim:
            t.scale_to_fit_width(lim)
        return t.move_to(self.morceaux[i])

    def valeurs(self, s, idx=None, fs=24, couleur=NUIT):
        return VGroup(*[self.valeur(i, s, fs, couleur) for i in (idx if idx is not None else range(len(self.morceaux)))])

    def dessous(self, mob, s, couleur=VERT_OK, fs=30, buff=0.16):
        br = Brace(mob, DOWN, buff=buff, color=couleur)
        t = gras(s, fs, couleur).next_to(br, DOWN, buff=0.06)
        return br, t


class PropPourcentageMentalBase(PropRatioEcrireBase):
    nom_voix = "4e-prop-pourcentage-mental"
    fichier_marques = "prop_pourcentage_mental_marques.json"

    def titre_haut(self, s, mot, couleur=JAUNE_TITRE, fs=44, x=-0.4):
        self.au_mot(mot)
        tit = self.t(s, fs, couleur).move_to(P(x, 3.1))
        self.play(Write(tit), run_time=0.5)
        return tit

    @staticmethod
    def cadre(m, couleur=VERT_OK):
        """Le cadre du résultat, serré (celui de la base touchait le « = » voisin)."""
        return SurroundingRectangle(m, color=couleur, buff=0.08, corner_radius=0.1, stroke_width=4)

    def barrer(self, *ms, couleur=ROUGE_ERREUR):
        """Un trait rouge sur une ligne (ou un groupe de morceaux)."""
        g = VGroup(*ms)
        return Line(g.get_left() + LEFT * 0.1, g.get_right() + RIGHT * 0.1, color=couleur, stroke_width=7)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Les pourcentages de tête", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Les pourcentages")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        b = BarreCent("", largeur=5.6, h=0.75, centre=P(0.6, 0.55))
        bk = basket(1.1).move_to(P(-4.6, 0.55))
        self.play(FadeIn(b, shift=UP * 0.2), FadeIn(bk, shift=RIGHT * 0.3), run_time=0.5)
        self.play(LaggedStart(*[m.animate.set_fill(M1 if i == 0 else M2, 1) for i, m in enumerate(b.morceaux[:3])],
                              lag_ratio=0.3), run_time=0.7)
        self.au_mot("La boutique")
        nom = self.t("La boutique de Mehdi", 34, AMBRE).move_to(P(0.6, -0.45))
        self.play(FadeIn(nom, shift=UP * 0.15), Indicate(bk, color=AMBRE), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : Mehdi, vendeur ; les promotions ; la calculatrice en panne ─────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = mehdi(1.0).move_to(P(-5.5, -0.9))
        nom = self.t("Mehdi", 40, TENUE_M).next_to(pers, UP, buff=0.3)
        self.montre("Voici Mehdi", FadeIn(pers, shift=UP * 0.3), FadeIn(nom), rt=0.6)
        met = self.t("vendeur de baskets", 28, TENUE_M).next_to(pers, DOWN, buff=0.15)
        met.shift(RIGHT * max(0, -6.4 - met.get_left()[0]))
        self.montre("vendeur", FadeIn(met, shift=DOWN * 0.1), rt=0.4)
        rayon = VGroup(basket(0.55, BASKET_C), basket(0.55, "#16a34a"), basket(0.55, "#e11d48")).arrange(
            RIGHT, buff=0.25).move_to(P(-2.2, 1.55))
        etag = Line(P(-3.75, 1.3), P(-0.65, 1.3), color=GREY_B, stroke_width=6)
        self.montre("boutique de baskets", FadeIn(etag), LaggedStart(*[FadeIn(x, shift=DOWN * 0.2) for x in rayon],
                                                                     lag_ratio=0.2), rt=0.7)
        ban = bandeau_promo(0.9).move_to(P(-2.2, 2.75))
        L1 = self.lc([("Jour des", WHITE), ("promotions", ROUGE_PROMO)], 2.3, fs=40)
        self.jouer(L1, ["le jour", "promotions"], {1: [FadeIn(ban, scale=1.3)]})
        calc = calculatrice(1.0).move_to(P(-2.2, -0.9))
        L2 = self.lc([("Calculatrice", WHITE), ("en panne", ROUGE_ERREUR)], 1.15, fs=40)
        x = croix(calc, sw=9)
        self.jouer(L2, ["la calculatrice", "en panne"], {0: [FadeIn(calc, scale=0.8)], 1: [Create(x)]})
        L3 = self.lc([("Tout", VERT_OK), ("de tête !", VERT_OK)], -0.05, fs=50)
        self.jouer(L3, ["tout calculer", "de tête"])
        cadre = SurroundingRectangle(L3, color=VERT_OK, buff=0.18, corner_radius=0.12, stroke_width=5)
        self.play(Create(cadre), Indicate(pers.tete, color=VERT_OK, scale_factor=1.15), run_time=0.6)
        self.attendre_voix()

    # ── 02 : la clé : 10 % = un dixième, on divise par 10 ───────────────────
    XB = -1.9      # le centre des barres (les lignes de calcul à droite, xl = 2.3)
    XC = 2.3

    def ecran_dix(self):
        self.ecran("02-dix")
        self.titre_haut("La clé : 10 %", "La clé")
        a = BarreCent(90, largeur=7.4, centre=P(self.XB, 1.3))
        L1 = self.lc([("10 %", WHITE), ("= un dixième", JAUNE_TITRE)], 2.3, fs=40, xl=self.XC)
        self.jouer(L1, [("10 %", 2), "un dixième"],
                   {0: [FadeIn(a.bp, shift=UP * 0.2), FadeIn(a.morceaux, shift=UP * 0.2)],
                    1: [LaggedStart(*[Create(t) for t in a.traits], lag_ratio=0.08)]})
        L2 = self.lc([("÷ 10", AMBRE)], 1.5, fs=60, xl=self.XC)
        self.jouer(L2, ["par 10"])
        self.insister(L2, 1.2, 0.2)
        ba, ta = a.dessous(a.morceaux[0], "10 %", M1, fs=26)
        L3 = self.lc([("10 % de", WHITE), ("90 €", JAUNE_TITRE)], 0.75, fs=40, xl=self.XC)
        L3b = self.lc([("=", WHITE), ("9 €", VERT_OK)], -0.05, fs=44, xl=self.XC)
        va = a.valeurs("9 €")
        self.jouer(L3, [("10 % de 90", 1), "90 euros"],
                   {0: [*a.colorer([0], M1), GrowFromCenter(ba), FadeIn(ta)],
                    1: [GrowFromCenter(a.acc), FadeIn(a.prix, shift=DOWN * 0.15)]})
        self.jouer(L3b, ["égale 9", "9 euros"], {1: [LaggedStart(*[FadeIn(v, scale=1.4) for v in va], lag_ratio=0.06)]})
        self.play(Create(self.cadre(L3b[1])), run_time=0.3)
        b = BarreCent(120, largeur=7.4, centre=P(self.XB, -1.25))
        bb, tb = b.dessous(b.morceaux[0], "10 %", M1, fs=26)
        L4 = self.lc([("10 % de", WHITE), ("120 €", JAUNE_TITRE)], -0.95, fs=40, xl=self.XC)
        L4b = self.lc([("=", WHITE), ("12 €", VERT_OK)], -1.75, fs=44, xl=self.XC)
        vb = b.valeurs("12 €", fs=22)
        self.jouer(L4, [("10 % de 120", 1), "120 euros"],
                   {0: [FadeIn(b, shift=UP * 0.2), *b.colorer([0], M1), GrowFromCenter(bb), FadeIn(tb)],
                    1: [GrowFromCenter(b.acc), FadeIn(b.prix, shift=DOWN * 0.15)]})
        self.jouer(L4b, ["égale 12", "12 euros"], {1: [LaggedStart(*[FadeIn(v, scale=1.4) for v in vb], lag_ratio=0.06)]})
        self.play(Create(self.cadre(L4b[1])), run_time=0.3)
        self.attendre_voix()

    # ── 03 : 20 % = le double de 10 %, 30 % = le triple ─────────────────────
    def ecran_double_triple(self):
        self.ecran("03-vingt-trente")
        a = BarreCent(90, largeur=7.4, centre=P(self.XB, 1.2))
        va = a.valeurs("9 €")
        self.add(sans(VGroup(a, a.acc, a.prix, va)))
        self.titre_haut("À partir de 10 %", "À partir")
        self.play(*a.colorer([0], M1), Circumscribe(a.morceaux[0], color=AMBRE, buff=0.04), run_time=0.5)
        L0 = self.lc([("tout devient facile !", VERT_OK)], 2.3, fs=36, xl=self.XC)
        self.jouer(L0, ["tout devient"])
        L1 = self.lc([("20 %", WHITE), ("= le double", JAUNE_TITRE)], 1.55, fs=38, xl=self.XC)
        self.jouer(L1, ["20 %, c", "le double"], {1: [*a.colorer([1], M2)]})
        L2 = self.lc([("20 % de", WHITE), ("90 € :", JAUNE_TITRE)], 0.85, fs=38, xl=self.XC)
        self.jouer(L2, ["20 % de 90", "90 euros"])
        r18, t18 = a.dessous(VGroup(*a.morceaux[:2]), "18 €", VERT_OK, fs=32)
        L3 = self.lc([("9 × 2", WHITE), ("=", WHITE), ("18 €", VERT_OK)], 0.15, fs=44, xl=self.XC)
        self.jouer(L3, ["9 fois 2", "égale 18", "18 euros"], {2: [GrowFromCenter(r18), FadeIn(t18, scale=1.3)]})
        L4 = self.lc([("30 %", WHITE), ("= le triple", JAUNE_TITRE)], -0.85, fs=38, xl=self.XC)
        r27, t27 = a.dessous(VGroup(*a.morceaux[:3]), "27 €", VERT_OK, fs=32)
        self.jouer(L4, ["30 %, c", "le triple"], {1: [*a.colorer([2], M2)]})
        L5 = self.lc([("9 × 3", WHITE), ("=", WHITE), ("27 €", VERT_OK)], -1.55, fs=44, xl=self.XC)
        self.jouer(L5, ["9 fois 3", "égale 27", "27 euros"],
                   {0: [Circumscribe(VGroup(*a.morceaux[:3]), color=AMBRE, buff=0.05)],
                    2: [ReplacementTransform(r18, r27), FadeOut(t18), FadeIn(t27, scale=1.3)]})
        self.play(Create(self.cadre(L5[2])), run_time=0.3)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (20 % de 60 € → 12 €) ──────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        bk = basket(1.6, "#16a34a").move_to(P(-3.6, 0.4))

        def avant(sc):
            sc.add(bk)

        def apres(sc):
            b = BarreCent(60, largeur=5.6, h=0.8, centre=P(-3.4, 0.45), fs_prix=30)
            v = b.valeurs("6 €", fs=22)
            br, t12 = b.dessous(VGroup(*b.morceaux[:2]), "12 €", VERT_OK, fs=30)
            l0 = sc.ligne_rep(0, ["10 % de 60 =", "6 €."])
            l1 = sc.ligne_rep(1, ["20 % :", "le double,", "12 €."])
            sc.montre("10 % de 60", FadeOut(bk), FadeIn(b, shift=UP * 0.2), *b.colorer([0], M1),
                      GrowFromCenter(b.acc), FadeIn(b.prix), FadeIn(l0[0], shift=UP * 0.15), rt=0.45)
            sc.montre("6. 20", FadeIn(l0[1], scale=1.3), LaggedStart(*[FadeIn(x, scale=1.4) for x in v],
                                                                       lag_ratio=0.05),
                      Create(sc.barrer_choix(1)), rt=0.5)
            sc.montre("20 %, c", FadeIn(l1[0], shift=UP * 0.15), rt=0.3)
            sc.montre("le double", FadeIn(l1[1], shift=UP * 0.15), *b.colorer([1], M2), rt=0.35)
            sc.montre("12 euros", FadeIn(l1[2], scale=1.3), GrowFromCenter(br), FadeIn(t12, scale=1.3),
                      Create(sc.barrer_choix(2)), rt=0.45)
            sc.rep_fini()

        self.question_pause("04-question", "04b-reponse", ["20 % de 60 €,", "de tête ?"],
                            [self.t("12 €", 34), self.t("20 €", 34), self.t("40 €", 34)], 0,
                            ["10 % de 60 = 6 €.", "20 % : le double, 12 €."],
                            mot_q="20 % de 60", avant_q=avant, autres_r=apres)

    # ── 05 : 5 % = la moitié de 10 % ; 15 % = 10 % + 5 % ───────────────────
    def ecran_cinq(self):
        self.ecran("05-cinq")
        a = BarreCent(120, largeur=7.4, centre=P(self.XB, 1.25))
        L0 = self.ligne([("5 %", WHITE), ("= la moitié", JAUNE_TITRE), ("de 10 %", WHITE)], 42).move_to(P(-0.4, 3.1))
        self.jouer(L0, ["5 %, c", "la moitié", "de 10 %"],
                   {0: [FadeIn(a, shift=UP * 0.2)], 2: [*a.colorer([0], M1)]})
        L1 = self.lc([("5 % de", WHITE), ("120 € :", JAUNE_TITRE)], 2.2, fs=38, xl=self.XC)
        self.jouer(L1, ["5 % de 120", "120 euros"], {1: [GrowFromCenter(a.acc), FadeIn(a.prix, shift=DOWN * 0.15)]})
        va = a.valeurs("12 €", fs=22)
        L2 = self.lc([("10 %", M1), ("= 12 €", WHITE)], 1.5, fs=38, xl=self.XC)
        self.jouer(L2, ["10 % font", "12 euros"], {1: [LaggedStart(*[FadeIn(x, scale=1.4) for x in va], lag_ratio=0.05)]})
        d = a.demi(0)
        t6 = a.valeur(0, "6 €", fs=22, largeur=a.lm / 2).move_to(d)
        L3 = self.lc([("la moitié", M5), ("= 6 €", VERT_OK)], 0.8, fs=38, xl=self.XC)
        self.jouer(L3, [("la moitié", 2), "6 euros"],
                   {0: [FadeOut(va[0]), FadeIn(d, shift=DOWN * 0.1)], 1: [FadeIn(t6, scale=1.4)]})
        self.play(Circumscribe(d, color=M5, buff=0.04), run_time=0.5)
        L4 = self.lc([("15 %", WHITE), ("= 10 %", M1), ("+ 5 %", M5)], -0.3, fs=40, xl=self.XC)
        t12 = sans(a.valeur(0, "12 €", fs=22))
        self.jouer(L4, ["Et 15", "10 % plus", "5 % :"],
                   {1: [FadeIn(t12)],
                    2: [d.animate.shift(RIGHT * a.lm), t6.animate.shift(RIGHT * a.lm), FadeOut(va[1])]})
        br, t18 = a.dessous(VGroup(a.morceaux[0], d), "18 €", VERT_OK, fs=32)
        L5 = self.lc([("12 + 6", WHITE), ("=", WHITE), ("18 €", VERT_OK)], -1.0, fs=44, xl=self.XC)
        self.jouer(L5, ["12 plus", "égale 18", "18 euros"], {2: [GrowFromCenter(br), FadeIn(t18, scale=1.3)]})
        self.play(Create(self.cadre(L5[2])), run_time=0.3)
        self.attendre_voix()

    # ── 06 : les grands pourcentages : 100 %, 200 %, 50 % ───────────────────
    def ecran_cent(self):
        self.ecran("06-cent")
        self.titre_haut("Les grands pourcentages", "les grands")
        xg, xc = -3.2, 1.95  # 1,7 : « 180 € » collé à « 200 % » (vérif. du 01/11)
        a = BarreCent(90, largeur=6.0, centre=P(xg, 1.3), chargement=True)
        b = BarreCent(90, largeur=6.0, centre=P(xg, -0.5), chargement=True)
        L1 = self.lc([("100 %", WHITE), ("= le nombre entier", JAUNE_TITRE)], 2.3, fs=34, xl=xc)
        self.jouer(L1, ["100 %, c", "le nombre"], {0: [FadeIn(a, shift=UP * 0.2)]})
        L2 = self.lc([("100 % de", WHITE), ("90 €", JAUNE_TITRE), ("= 90 €", VERT_OK)], 1.6, fs=36, xl=xc)
        self.jouer(L2, ["100 % de 90", ("90 euros", 1), "égale 90"],
                   {1: [GrowFromCenter(a.acc), FadeIn(a.prix, shift=DOWN * 0.15)], 2: [a.bp.remplir(run_time=0.9)]})
        L3 = self.lc([("200 %", WHITE), ("= le double", JAUNE_TITRE)], 0.6, fs=36, xl=xc)
        self.jouer(L3, ["200 %, c", "le double"], {0: [FadeIn(b, shift=UP * 0.2)], 1: [b.bp.remplir(run_time=0.9)]})
        dr = Brace(VGroup(a, b), RIGHT, buff=0.12, color=VERT_OK)
        t180 = gras("180 €", 32, VERT_OK).next_to(dr, RIGHT, buff=0.08)
        L4 = self.lc([("200 % de", WHITE), ("90 €", JAUNE_TITRE), ("= 180 €", VERT_OK)], -0.1, fs=36, xl=xc)
        L4[2].shift(RIGHT * 0.12)  # cadre loin du « € » voisin
        self.jouer(L4, ["200 % de 90", ("90 euros", 3), "180 euros"],
                   {1: [GrowFromCenter(b.acc), FadeIn(b.prix, shift=DOWN * 0.15)],
                    2: [GrowFromCenter(dr), FadeIn(t180, scale=1.3)]})
        self.play(Create(self.cadre(L4[2])), run_time=0.3)
        moitie = VGroup(*a.morceaux[:5])
        cad = SurroundingRectangle(moitie, color=AMBRE, buff=0.05, stroke_width=6)
        br, t45 = a.dessous(moitie, "45 €", AMBRE, fs=32)
        L5 = self.lc([("50 %", WHITE), ("= la moitié :", JAUNE_TITRE), ("45 €", VERT_OK)], -1.2, fs=36, xl=xc)
        self.jouer(L5, ["Et 50", "la moitié", "45 euros"],
                   {0: [FadeOut(VGroup(b, b.acc, b.prix, dr, t180))], 1: [Create(cad)],
                    2: [GrowFromCenter(br), FadeIn(t45, scale=1.3)]})
        self.attendre_voix()

    # ── 07 : le piège : 10 % de 90 € n'est pas 90 − 10 ──────────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        self.titre_haut("Attention au piège !", "Attention", couleur=ROUGE_ERREUR)
        a = BarreCent(90, largeur=7.4, centre=P(self.XB, 0.45))
        L1 = self.ligne([("10 % de", WHITE), ("90 €", JAUNE_TITRE), ("≠", ROUGE_ERREUR), ("90 − 10", ROUGE_ERREUR)],
                        44).move_to(P(-0.4, 2.2))
        self.jouer(L1, ["10 % de 90", "90 euros", "ce n'est pas", "90 moins"],
                   {0: [FadeIn(a.bp, shift=UP * 0.2), FadeIn(a.morceaux, shift=UP * 0.2)],
                    1: [GrowFromCenter(a.acc), FadeIn(a.prix, shift=DOWN * 0.15)]})
        self.play(Create(self.barrer(L1[3])), run_time=0.35)
        piece = Rectangle(width=(7.4 - 0.16) / 9, height=a.hh, stroke_width=0, fill_color=ROUGE_ERREUR,
                          fill_opacity=0.85).align_to(a.morceaux[-1], RIGHT).set_y(a.morceaux[0].get_y())
        tp = gras("− 10 €", 28, ROUGE_ERREUR).next_to(piece, DOWN, buff=0.22)
        L2 = self.lc([("On ne retire pas", WHITE), ("10 €", ROUGE_ERREUR)], 1.2, fs=34, xl=self.XC)
        L2[1].shift(RIGHT * 0.15)  # le trait rouge ne touche plus « pas »
        self.jouer(L2, ["On ne retire", "10 euros"], {1: [FadeIn(piece), FadeIn(tp, scale=1.2)]})
        x = croix(VGroup(piece, tp), sw=8)
        self.play(Create(x), Create(self.barrer(L2[1])), run_time=0.4)
        L3 = self.lc([("On divise", VERT_OK), ("par 10.", VERT_OK)], 0.45, fs=40, xl=self.XC)
        self.jouer(L3, ["on divise", "par 10"],
                   {0: [FadeOut(VGroup(piece, tp, x))],
                    1: [LaggedStart(*[Create(t) for t in a.traits], lag_ratio=0.08)]})
        ba, ta = a.dessous(a.morceaux[0], "10 %", M1, fs=26)
        L4 = self.lc([("10 % de", WHITE), ("90 €", JAUNE_TITRE)], -0.4, fs=40, xl=self.XC)
        self.jouer(L4, [("10 % de 90", 2), ("90 euros", 2)], {0: [*a.colorer([0], M1), GrowFromCenter(ba), FadeIn(ta)]})
        va = a.valeurs("9 €")
        L5 = self.lc([("=", WHITE), ("9 €", VERT_OK)], -1.25, fs=48, xl=self.XC)
        self.jouer(L5, ["c'est 9", "9 euros"], {1: [LaggedStart(*[FadeIn(v, scale=1.4) for v in va], lag_ratio=0.05)]})
        self.play(Create(self.cadre(L5[1])), run_time=0.3)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (5 % de 80 € → 4 €) ────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        bk = basket(1.6, "#e11d48").move_to(P(-3.6, 0.4))

        def avant(sc):
            sc.add(bk)

        def apres(sc):
            b = BarreCent(80, largeur=5.6, h=0.8, centre=P(-3.4, 0.45), fs_prix=30)
            v = b.valeurs("8 €", fs=22)
            d = b.demi(0)
            br, tb = b.dessous(d, "4 €", M5, fs=30)
            l0 = sc.ligne_rep(0, ["10 % de 80 =", "8 €."])
            l1 = sc.ligne_rep(1, ["5 % :", "la moitié,", "4 €."])
            sc.montre("10 % de 80", FadeOut(bk), FadeIn(b, shift=UP * 0.2), *b.colorer([0], M1),
                      GrowFromCenter(b.acc), FadeIn(b.prix), FadeIn(l0[0], shift=UP * 0.15), rt=0.45)
            sc.montre("8. 5", FadeIn(l0[1], scale=1.3), LaggedStart(*[FadeIn(x, scale=1.4) for x in v],
                                                                       lag_ratio=0.05),
                      Create(sc.barrer_choix(1)), rt=0.5)
            sc.montre("5 %, c", FadeIn(l1[0], shift=UP * 0.15), rt=0.3)
            sc.montre("la moitié", FadeIn(l1[1], shift=UP * 0.15), FadeOut(v[0]), FadeIn(d, shift=DOWN * 0.1),
                      Create(sc.barrer_choix(2)), rt=0.4)
            sc.montre("4 euros", FadeIn(l1[2], scale=1.3), GrowFromCenter(br),
                      FadeIn(tb, scale=1.3), rt=0.45)
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse", ["5 % de 80 €,", "de tête ?"],
                            [self.t("4 €", 34), self.t("75 €", 34), self.t("16 €", 34)], 0,
                            ["10 % de 80 = 8 €.", "5 % : la moitié, 4 €."],
                            mot_q="5 % de 80", avant_q=avant, autres_r=apres)

    # ── 09 : défi : la paire à 70 €, − 30 % ─────────────────────────────────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.titre_haut("À toi de jouer !", "À toi de jouer", fs=50)
        bk = basket(1.5, "#7c3aed").move_to(P(-4.4, 1.25))
        tag = etiquette_prix("70 €", 36).next_to(bk, RIGHT, buff=0.3).shift(UP * 0.35)
        pas = pastille_pct(30, 0.9).next_to(tag, DOWN, buff=0.2)
        b = BarreCent(70, largeur=5.2, h=0.75, centre=P(-3.4, -1.3), fs_prix=30)
        L0 = self.lc([("Une paire à", WHITE), ("70 €", JAUNE_TITRE)], 2.1, fs=40, xl=0.9)
        self.jouer(L0, ["Une paire", "70 euros"], {0: [FadeIn(bk, shift=RIGHT * 0.3)], 1: [FadeIn(tag, scale=1.3)]})
        L1 = self.lc([("en promotion :", WHITE), ("− 30 %", ROUGE_PROMO)], 1.35, fs=40, xl=0.9)
        self.jouer(L1, ["en promotion", "30 %"], {1: [FadeIn(pas, scale=1.5)]})
        self.insister(pas, 1.2, 0.2)
        L2 = self.lc([("Combien d'euros", ORANGE_RETENUE)], 0.5, fs=38, xl=0.9)
        L2b = self.lc([("de réduction ?", ORANGE_RETENUE)], -0.15, fs=38, xl=0.9)
        self.jouer(L2, ["Combien"], {0: [FadeIn(b, shift=UP * 0.2), GrowFromCenter(b.acc), FadeIn(sans(b.prix))]})
        self.jouer(L2b, ["de réduction"])
        L3 = self.lc([("Et le nouveau prix ?", ORANGE_RETENUE)], -0.9, fs=38, xl=0.9)
        self.jouer(L3, ["Et le nouveau"])
        self.pause_defi(y=-1.7)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        self.titre_haut("Correction", "Correction", fs=50)
        a = BarreCent(70, largeur=7.4, centre=P(self.XB, 1.2))
        L1 = self.lc([("10 % de 70 =", WHITE), ("7 €", VERT_OK)], 2.2, fs=40, xl=self.XC)
        va = a.valeurs("7 €")
        self.jouer(L1, ["10 % de 70", "7. 30"],
                   {0: [FadeIn(a, shift=UP * 0.2), *a.colorer([0], M1), GrowFromCenter(a.acc), FadeIn(a.prix)],
                    1: [LaggedStart(*[FadeIn(v, scale=1.4) for v in va], lag_ratio=0.05)]})
        L2 = self.lc([("30 %", WHITE), ("= le triple :", JAUNE_TITRE)], 1.45, fs=40, xl=self.XC)
        self.jouer(L2, ["30 %, c", "le triple"], {1: [*a.colorer([1, 2], M2)]})
        br, t21 = a.dessous(VGroup(*a.morceaux[:3]), "21 €", ORANGE_RETENUE, fs=32)
        L3 = self.lc([("21 €", ORANGE_RETENUE), ("de réduction", WHITE)], 0.7, fs=40, xl=self.XC)
        self.jouer(L3, ["21 euros", "de réduction"], {0: [GrowFromCenter(br), FadeIn(t21, scale=1.3)]})
        bn, t49 = a.dessous(VGroup(*a.morceaux[3:]), "49 €", VERT_OK, fs=32)
        L4 = self.lc([("70 − 21", WHITE), ("=", WHITE), ("49 €", VERT_OK)], -0.3, fs=48, xl=self.XC)
        self.jouer(L4, ["70 moins", "égale 49", "49 euros"],
                   {0: [Circumscribe(VGroup(*a.morceaux[3:]), color=VERT_OK, buff=0.05)],
                    2: [GrowFromCenter(bn), FadeIn(t49, scale=1.3)]})
        L5 = self.lc([("Le nouveau prix", VERT_OK)], -1.05, fs=36, xl=self.XC)
        sans(L5)
        self.play(FadeIn(L5, shift=UP * 0.15), Create(self.cadre(L4[2])), run_time=0.4)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        b = BarreCent("", largeur=3.8, h=0.6, centre=P(-4.2, 0.6))
        for i, m in enumerate(b.morceaux[:3]):
            m.set_fill(M1 if i == 0 else M2, 1)
        calc = calculatrice(0.8).next_to(b, DOWN, buff=0.6)
        x = croix(calc, sw=7)
        fig = VGroup(b, calc, x)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Tout part de 10 % :", "on divise par 10."),
            ("20 % : le double ;", "30 % : le triple."),
            ("5 % : la moitié.",),
            ("100 % : le nombre lui-même ;", "200 % : son double.")], fs=36)
        gestes = [Circumscribe(b.morceaux[0], color=AMBRE, buff=0.04),
                  Indicate(VGroup(*b.morceaux[1:3]), color=AMBRE, scale_factor=1.05), None,
                  Indicate(b, color=VERT_OK, scale_factor=1.04)]
        mots = [["10 % : on", "10. 20"], ["20 %, c", "30 %, le"], ["5 %, la"], ["100 %, c", "200 %, son"]]
        for lg, ms, g in zip(lignes, mots, gestes):
            for j, (sl, mot) in enumerate(zip(lg[1], ms)):
                for f in sl.get_family():
                    f.sans_synchro = True  # au mot du NOMBRE (le mot porteur viendrait 1 s après)
                self.au_mot(mot)
                anims = [Create(lg[0])] + ([g] if g else []) if j == 0 else []
                self.play(FadeIn(sl, shift=RIGHT * 0.2), *anims, run_time=0.4)
        self.au_mot("Pas besoin")
        self.play(Indicate(VGroup(calc, x), color=ROUGE_ERREUR, scale_factor=1.1), run_time=0.8)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_dix()
        self.ecran_double_triple()
        self.ecran_question1()
        self.ecran_cinq()
        self.ecran_cent()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class PropPourcentageMental4e(PropPourcentageMentalBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"
