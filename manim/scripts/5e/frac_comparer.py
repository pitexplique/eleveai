# frac_comparer.py
# EleveAI — Maths 5e — série « Fractions », épisode 04 : COMPARER DES FRACTIONS
# (micro du coach : fraction_comparer), AVEC VOIX. Paysage 16:9, CEINTURE
# VERTE : la paysage complète du niveau 5e (même dénominateur, même
# numérateur, dénominateur MULTIPLE de l'autre → même dénominateur, comparer
# à 1, piège « plus grand dénominateur = plus grande fraction », défi : ranger
# trois fractions, puis 1/2 = 0,5 = 50 %). Pas de produits en croix (programme de 5e).
# Short jumeau : frac_comparer_short.py (blanche, la course d'escargots).
#
# Décor et métier : la PLAGE la nuit ; Zoé, GARDE DU LITTORAL, surveille les
# bébés tortues qui filent vers la mer : tortue A 5/6 du chemin, tortue B 7/12
# → 10/12 > 7/12. Défi : 1/2, 3/8, 5/8 → 3/8 < 4/8 < 5/8.
# Chiffres inventés (aucune donnée du monde réel citée). Centres : animaux, nature-ecologie.
# Vérifié (Python) : 5/6 = 10/12 > 7/12 ; 5/7 > 5/9 ; 2/3 = 6/9 > 5/9 ;
# 1/10 < 1/5 ; 7/6 > 1 ; 5/6 < 1 ; 6/7 < 1 ; 1/2 = 4/8.
#
# Micro → écrans (banque 5e/maths/fractions.bank.ts, genComparer : ★2 même
# dénominateur / même numérateur / comparer à 1, ★3 un dénominateur multiple de
# l'autre) : 02, 03 (QUESTION 1 = signe, même numérateur), 05 (QUESTION 2 =
# signe, dénominateurs multiples), 07 (piège), 08 (QUESTION 3 = comparer à 1), défi 10.
# Écrans : 00 garde · 01 Zoé · 02 même dénominateur · 03 même numérateur ·
# 04 QUESTION 1 · 05 dénominateur multiple · 06 QUESTION 2 · 07 piège ·
# 08 comparer à 1 · 09 QUESTION 3 · 10 défi · 10b correction · 11 ce que tu as
# appris · 12 fin.
#
# ⭐ Bases : 5e/frac_lotg_commun.py (PaysageG ← 4e/frac_lotd_commun.py) ;
# canvas_fractions.py (non modifié). Ajouté ici : garde(), tortue(), mer().
# Voix : manim/voix/5e-frac-comparer.json (débit −10) ; marques : 5e/frac_comparer_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/5e/frac_comparer.py FracComparer5e
# python -m manim render -qh --disable_caching manim/scripts/5e/frac_comparer.py FracComparer5e -o eleveai-maths-5e-frac-comparer --media_dir manim/scripts/5e/media-frac-comparer
# Sortie : manim/sorties/5e/maths/fractions/04-comparer/eleveai-maths-5e-frac-comparer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lotg_commun import *  # noqa: E402,F403

CA, CB = VERT_PART, ORANGE_PART   # tortue A, tortue B
CARAPACE = "#15803d"


def garde_littoral(s=1.0):
    """Zoé : veste bleu marine, chapeau de brousse, lampe frontale."""
    p = personne(peau=PEAUX[4], tenue="#1e3a8a", cheveux="#111827", longs=True)
    chap = VGroup(Ellipse(width=1.25, height=0.18, fill_color="#a16207", fill_opacity=1, stroke_width=0),
                  AnnularSector(inner_radius=0, outer_radius=0.36, angle=PI, start_angle=0, fill_color="#ca8a04",
                                fill_opacity=1, stroke_width=0).shift(UP * 0.02)).move_to(P(0, 0.45))
    lampe = Circle(radius=0.08, fill_color="#fde047", fill_opacity=1, stroke_width=0).move_to(P(0, 0.33))
    p.add(chap, lampe)
    return p.scale(s)


def tortue(s=1.0, couleur=CARAPACE):
    """Un bébé tortue vu de dessus, tête vers la droite (vers la mer)."""
    nag = VGroup(*[Ellipse(width=0.28, height=0.12, fill_color="#365314", fill_opacity=1, stroke_width=0)
                   .rotate(a).move_to(P(x, y)) for x, y, a in ((0.15, 0.2, 0.6), (0.15, -0.2, -0.6),
                                                                (-0.18, 0.17, -0.5), (-0.18, -0.17, 0.5))])
    tete = Circle(radius=0.08, fill_color="#365314", fill_opacity=1, stroke_width=0).move_to(P(0.3, 0))
    cara = Ellipse(width=0.48, height=0.36, fill_color=couleur, fill_opacity=1, stroke_color="#052e16",
                   stroke_width=2)
    return VGroup(nag, tete, cara).scale(s)


def mer(h=2.6, centre=ORIGIN):
    """La mer : une bande bleue aux vagues blanches."""
    eau = RoundedRectangle(width=0.45, height=h, corner_radius=0.1, fill_color="#0284c7", fill_opacity=1,
                           stroke_width=0)
    vagues = VGroup(*[Arc(radius=0.12, start_angle=0, angle=PI, color=WHITE, stroke_width=3)
                      .move_to(P(0, y)) for y in np.linspace(-h / 2 + 0.3, h / 2 - 0.3, 5)])
    return VGroup(eau, vagues).move_to(centre)


class FracComparerBase(PaysageG):
    nom_voix = "5e-frac-comparer"
    fichier_marques = "frac_comparer_marques.json"

    def b(self, n, k, y, couleur=BLEU_PART, x=-3.2, largeur=5.4, h=0.65):
        return Barre(n, k, largeur=largeur, hauteur=h, couleur=couleur, centre=P(x, y))

    def lab(self, barre, txt, couleur=WHITE, fs=34):
        """L'écriture de la barre, au-dessus à gauche (en ligne, comme le coach)."""
        return self.inline(txt, fs, couleur).next_to(barre, UP, buff=0.06).align_to(barre, LEFT).shift(RIGHT * 0.1)

    def compare(self, a, b, c, d, signe, y, x=None, fs=64, couleur=WHITE):
        """« a/b signe c/d » posé ; renvoie VGroup(f, signe, g)."""
        f, g = EcritureFraction(a, b, fs=fs, couleur=couleur), EcritureFraction(c, d, fs=fs, couleur=couleur)
        e = egalite(f, g, signe=signe, buff=0.55)
        e[1].set_color(VERT_OK if signe in "<>" else WHITE)
        if x is None:
            self.col(e, y)
        else:
            e.move_to(P(x, y))
        return e

    def sur_barre(self, barre, t, dx=0.0):
        """La tortue au bout de la partie coloriée de la barre."""
        x = barre.x_trait(max(barre.colories) + 1 if barre.colories else 0)
        return t.move_to(P(x + dx, barre.contour.get_top()[1] + 0.22))

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Comparer des fractions", self.identite, self.ceinture, y_ech=-2.7)
        b1 = Barre(6, 5, largeur=4.4, hauteur=0.55, couleur=CA, centre=P(-0.8, 0.75))
        b2 = Barre(12, 7, largeur=4.4, hauteur=0.55, couleur=CB, centre=P(-0.8, -0.65))
        self.au_mot("Comparer des")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.au_mot("quelle fraction")
        self.play(b1.apparaitre(0.9), b2.apparaitre(0.9))
        self.au_mot("la plus grande")
        q = self.t("?", 90, AMBRE).next_to(VGroup(b1, b2), RIGHT, buff=0.5)
        self.play(FadeIn(q, scale=0.4), run_time=0.5)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Zoé, garde du littoral ─────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers, nom, met = self.personnage(garde_littoral(0.85), "Zoé", ["garde du", "littoral"], x=-5.75, y=-0.6,
                                         fs_met=26)
        self.au_mot("Voici Zoé")
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("garde du")
        self.play(FadeIn(met, shift=UP * 0.2), run_time=0.4)
        ba = self.b(6, 0, 1.0, CA, x=-2.2, largeur=4.0)
        bb = self.b(12, 0, -0.6, CB, x=-2.2, largeur=4.0)
        m = mer(3.0, P(0.55, 0.2))
        ta, tb = tortue(1.2), tortue(1.2, "#a16207")
        ta.move_to(P(-4.1, 1.55))
        tb.move_to(P(-4.1, -0.05))
        m.set_z_index(2)
        self.au_mot("des bébés tortues")
        self.play(FadeIn(m), FadeIn(ba), FadeIn(bb), FadeIn(ta, scale=0.5), FadeIn(tb, scale=0.5), run_time=0.7)
        self.au_nb("A a fait 5")
        la = self.morceaux([("A :", CA, None), (EcritureFraction(5, 6, fs=50), WHITE, None)], fs=40)
        self.col(la, 1.0, xl=1.2)
        self.play(ba.colorier(range(5), lag=0.1), ta.animate.move_to(P(ba.x_trait(5), ba.contour.get_top()[1] + 0.22)),
                  FadeIn(la, shift=RIGHT * 0.15), run_time=1.0)
        self.au_nb("B, 7")
        lb = self.morceaux([("B :", CB, None), (EcritureFraction(7, 12, fs=50), WHITE, None)], fs=40)
        self.col(lb, -0.6, xl=1.2)
        self.play(bb.colorier(range(7), lag=0.06), tb.animate.move_to(P(bb.x_trait(7), bb.contour.get_top()[1] + 0.22)),
                  FadeIn(lb, shift=RIGHT * 0.15), run_time=1.0)
        self.au_mot("Laquelle")
        q = self.col(self.bloc(["Laquelle est la plus", "près de la mer ?"], 36, ORANGE_RETENUE), -2.2, xl=1.2)
        sans_synchro(q)
        self.play(FadeIn(q, scale=0.8), Wiggle(VGroup(ta, tb)), run_time=0.8)
        self.attendre_voix()

    # ── 02 : même dénominateur ──────────────────────────────────────────────
    def ecran_meme_den(self):
        self.ecran("02-meme-den")
        self.au_mot("même dénominateur")
        self.titre("Même dénominateur", fs=44)
        b7, b5 = self.b(12, 7, 1.0), self.b(12, 5, -1.15)
        l7, l5 = self.lab(b7, "7/12"), self.lab(b5, "5/12")
        self.au_mot("les parts ont")
        l1 = self.col(self.t("parts de même taille", 36, AMBRE), 2.0)
        l1.sans_synchro = True
        self.play(FadeIn(l1, shift=RIGHT * 0.2), FadeIn(b7.carte), FadeIn(b5.carte), run_time=0.4)
        self.au_nb("7 douzièmes et")
        self.play(b7.apparaitre(0.6), FadeIn(l7), run_time=0.6)
        self.au_nb("et 5")
        self.play(b5.apparaitre(0.6), FadeIn(l5), run_time=0.6)
        self.L([("7 parts", VERT_OK, "7 parts"), ("plus que", WHITE, "plus que"), ("5 parts", WHITE, "que 5")], 1.1)
        e = self.compare(7, 12, 5, 12, ">", -0.5)
        self.au_nb("Donc 7")
        self.play(FadeIn(e[0], scale=1.1), run_time=0.35)
        self.au_mot("plus grand que")
        self.play(FadeIn(e[1], scale=1.5), Create(b7.fin_coloriee(vers=-1.6)), run_time=0.4)
        self.au_nb("que 5 douz")
        self.play(FadeIn(e[2], scale=1.1), run_time=0.35)
        self.play(Create(self.encadrer(e)), run_time=0.4)
        self.attendre_voix()

    # ── 03 : même numérateur ────────────────────────────────────────────────
    def ecran_meme_num(self):
        self.ecran("03-meme-num")
        self.au_mot("même numérateur")
        self.titre("Même numérateur", fs=44)
        b4, b8 = self.b(4, 3, 1.0, VERT_PART), self.b(8, 3, -1.15, VERT_PART)
        l4, l8 = self.lab(b4, "3/4"), self.lab(b8, "3/8")
        self.au_nb("3 quarts")
        self.play(b4.apparaitre(0.6), FadeIn(l4), run_time=0.6)
        self.au_nb("et 3")
        self.play(b8.apparaitre(0.6), FadeIn(l8), run_time=0.6)
        self.L([("3 parts", WHITE, "3 parts"), ("dans les deux cas", WHITE, "dans les deux")], 2.0, fs=36)
        self.L([("un quart", AMBRE, "un quart est"), ("> un huitième", AMBRE, "qu'un huitième")], 1.15, fs=36,
               avec=[Indicate(b4.parts[0], color=AMBRE, scale_factor=1.15),
                     Indicate(b8.parts[0], color=AMBRE, scale_factor=1.15)])
        e = self.compare(3, 4, 3, 8, ">", -0.3)
        self.au_nb("Donc 3")
        self.play(FadeIn(e[0], scale=1.1), run_time=0.35)
        self.au_mot("plus grand que 3")
        self.play(FadeIn(e[1], scale=1.5), Create(b4.fin_coloriee(vers=-1.6)), run_time=0.4)
        self.au_nb("que 3 huit")
        self.play(FadeIn(e[2], scale=1.1), run_time=0.35)
        self.au_mot("Plus le dénominateur")
        r = self.col(self.bloc(["Dénominateur plus grand :", "parts plus petites."], 32, VERT_OK), -1.9)
        sans_synchro(r)
        self.play(FadeIn(r[0], shift=UP * 0.15), run_time=0.4)
        self.au_mot("plus les parts")
        self.play(FadeIn(r[1], shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (5/7 et 5/9) ────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        b7, b9 = self.b(7, 5, 1.0, VERT_PART, x=-3.4, largeur=5.0), self.b(9, 5, -1.15, VERT_PART, x=-3.4, largeur=5.0)
        l7, l9 = self.lab(b7, "5/7"), self.lab(b9, "5/9")

        def avant(sc):
            sc.au_nb("Compare 5")
            sc.q_tete(b7.apparaitre(0.5), FadeIn(l7), b9.apparaitre(0.5), FadeIn(l9))

        def apres(sc):
            sc.rep_mots(0, [("Même numérateur :", None, "Même numérateur")])
            sc.rep_mots(1, [("un septième", None, "un septième"), ("> un neuvième", None, "qu'un neuvième")],
                        avec=[Indicate(b7.parts[0], color=AMBRE, scale_factor=1.2),
                              Indicate(b9.parts[0], color=AMBRE, scale_factor=1.2)])
            sc.rep_mots(2, [("donc 5/7 > 5/9", None, "Donc 5")], avec=[Create(b7.fin_coloriee(vers=-1.6))])
            sc.fin_rep()

        self.question_pause("04-question", "04b-reponse", ["Compare 5/7 et 5/9."],
                            [self.inline("> plus grand"), self.inline("= égal"), self.inline("< plus petit")], 0,
                            ["Même numérateur :", "un septième > un neuvième", "donc 5/7 > 5/9"],
                            avant_q=avant, autres_r=apres)

    # ── 05 : un dénominateur multiple de l'autre ────────────────────────────
    def ecran_multiple(self):
        self.ecran("05-multiple")
        ba = self.b(6, 5, 1.85, CA, x=-3.3, largeur=5.2)
        bb = self.b(12, 7, -0.15, CB, x=-3.3, largeur=5.2)
        ta = self.sur_barre(ba, tortue(1.0))
        tb = self.sur_barre(bb, tortue(1.0, "#a16207"))
        la, lb = self.lab(ba, "A : 5/6"), self.lab(bb, "B : 7/12")
        la.shift(DOWN * 0.0)
        self.au_mot("nos tortues")
        self.titre("Et nos tortues ?", fs=44)
        self.play(FadeIn(ba), FadeIn(bb), FadeIn(ta), FadeIn(tb), run_time=0.5)
        self.au_nb("tortues ? 5")
        self.play(FadeIn(la), run_time=0.3)
        self.au_nb("et 7")
        self.play(FadeIn(lb), run_time=0.3)
        self.au_mot("différents")
        l1 = self.col(self.t("dénominateurs différents", 34, AMBRE), 2.2)
        l1.sans_synchro = True
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        self.L([("mais 12 =", WHITE, "Mais 12"), ("6 ×", WHITE, "c'est 6"), ("2 !", AMBRE, "fois 2")], 1.4)
        f, g = EcritureFraction(5, 6, fs=60), EcritureFraction(10, 12, fs=60, couleur=CA)
        e = egalite(f, g, buff=0.9)
        self.col(e, -0.45)
        h, bas = fleches(f, g, "× 2", fs=30, angle=TAU / 11)
        b12, anim = ba.repartager(2, run_time=1.0)
        self.au_nb("! 5")
        self.play(FadeIn(f, scale=1.2), run_time=0.4)
        self.au_nb("sixièmes, fois 2")
        self.play(anim, Create(h[0]), FadeIn(h[1]), Create(bas[0]), FadeIn(bas[1]), run_time=1.0)
        self.bring_to_front(ta)
        self.au_nb("égale 10")
        self.play(FadeIn(e[1]), FadeIn(g, scale=1.3), run_time=0.4)
        c = self.compare(10, 12, 7, 12, ">", -2.75, fs=44)
        self.au_nb("Et 10")
        self.play(FadeIn(c[0], scale=1.1), run_time=0.35)
        self.au_mot("plus grand que 7")
        self.play(FadeIn(c[1], scale=1.5), run_time=0.3)
        self.au_nb("que 7")
        self.play(FadeIn(c[2], scale=1.1), Create(b12.fin_coloriee(vers=-1.4)), run_time=0.4)
        self.au_mot("La tortue A")
        self.play(Flash(ta, color=CA), ta.animate.scale(1.4), run_time=0.6)
        self.play(ta.animate.scale(1 / 1.4), Create(self.encadrer(c)), run_time=0.4)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (2/3 et 5/9) ────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        b3, b9 = self.b(3, 2, 1.0, BLEU_PART, x=-3.4, largeur=5.0), self.b(9, 5, -1.15, BLEU_PART, x=-3.4, largeur=5.0)
        l3, l9 = self.lab(b3, "2/3"), self.lab(b9, "5/9")

        def avant(sc):
            sc.au_nb("Compare 2")
            sc.q_tete(b3.apparaitre(0.5), FadeIn(l3), b9.apparaitre(0.5), FadeIn(l9))

        def apres(sc):
            b9b, anim = b3.repartager(3, run_time=0.8)
            sc.rep_mots(0, [("3 ×", None, "Réponse C. 3"), ("3 =", None, "3 fois 3"), ("9", None, "égale 9")],
                        avec={2: [anim]})
            sc.rep_mots(1, [("2/3", None, "9 : 2"), ("= 6/9", None, "égale 6")])
            sc.rep_mots(2, [("6/9", None, "Et 6"), ("> 5/9", None, "que 5")],
                        avec={1: [Create(b9b.fin_coloriee(vers=-1.6))]})
            sc.fin_rep()

        self.question_pause("06-question", "06b-reponse", ["Compare 2/3 et 5/9."],
                            [self.inline("< plus petit"), self.inline("= égal"), self.inline("> plus grand")], 2,
                            ["3 × 3 = 9", "2/3 = 6/9", "6/9 > 5/9"], avant_q=avant, autres_r=apres)

    # ── 07 : le piège (1/5 et 1/10) ─────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        self.au_mot("Attention au piège")
        tit = self.titre("Attention au piège !", ROUGE_ERREUR, 44)
        b5, b10 = self.b(5, 1, 1.0, BLEU_PART), self.b(10, 1, -1.15, BLEU_PART)
        l5, l10 = self.lab(b5, "1/5"), self.lab(b10, "1/10")
        self.au_nb("piège ! 1")
        self.play(b5.apparaitre(0.5), FadeIn(l5), run_time=0.5)
        self.au_nb("et 1")
        self.play(b10.apparaitre(0.5), FadeIn(l10), run_time=0.5)
        self.L([("10", WHITE, "dixième. 10"), ("> 5…", WHITE, "que 5")], 1.9)
        self.L([("mais 1/10", ROUGE_ERREUR, "mais 1"), ("est plus petit !", ROUGE_ERREUR, "plus petit")], 1.0)
        self.play(Create(b5.fin_coloriee(vers=-1.6)), Indicate(b10.parts[0], color=ROUGE_ERREUR, scale_factor=1.3),
                  run_time=0.7)
        self.au_nb("Couper en 10")
        r = self.col(self.bloc(["Couper en 10 :", "des parts plus petites."], 34, VERT_OK), -0.6)
        sans_synchro(r)
        self.play(FadeIn(r[0], shift=UP * 0.15), run_time=0.35)
        self.au_mot("des parts plus")
        self.play(FadeIn(r[1], shift=UP * 0.15), run_time=0.35)
        self.attendre_voix()

    # ── 08 : comparer à 1 ───────────────────────────────────────────────────
    def ecran_un(self):
        self.ecran("08-un")
        self.au_nb("comparer à 1")
        self.titre("Comparer à 1", fs=44)
        d = Droite(0, 2, 12, etiquettes={0: "0", 1: "1", 2: "2"}, longueur=5.6, centre=P(-2.75, 0.9))
        self.play(FadeIn(d, shift=UP * 0.2), run_time=0.5)
        self.au_nb("6 sixièmes")
        un = d.point(1, "6/6", couleur=VERT_OK)
        self.play(FadeIn(un, shift=DOWN * 0.2), run_time=0.4)
        self.L([("6/6", VERT_OK, "6 sixièmes"), ("= 1", VERT_OK, "entière : 1"), ("une unité", WHITE, None)], 1.9,
               fs=40)
        self.au_nb("plus grande que 1")
        r = self.col(self.bloc(["Plus grande que 1 :", "numérateur > dénominateur"], 36, AMBRE), 0.6)
        sans_synchro(r)
        self.play(FadeIn(r[0], shift=UP * 0.15), run_time=0.35)
        self.au_mot("numérateur dépasse")
        self.play(FadeIn(r[1], shift=UP * 0.15), run_time=0.35)
        self.attendre_voix()
        self.droite = d

    # ── 09 : QUESTION 3 (plus grande que 1 ?) ───────────────────────────────
    def ecran_question3(self):
        self.clear()
        self.add_mascotte()
        d = Droite(0, 2, 12, etiquettes={0: "0", 1: "1", 2: "2"}, longueur=5.6, centre=P(-2.75, 0.3))
        self.add(d)
        p7 = d.point(7 / 6, "7/6", couleur=ORANGE_PART)
        p5 = d.point(5 / 6, "5/6", couleur=BLEU_POINT, haut=0.55)
        p67 = d.point(6 / 7, "6/7", couleur=BLEU_POINT, haut=1.35)

        def apres(sc):
            sc.rep_mots(0, [("7", None, "Réponse B. 7"), ("> 6 :", None, "dépasse 6"), ("7/6", None, "6 : 7"),
                            ("> 1", None, "que 1")], avec={2: [FadeIn(p7, shift=DOWN * 0.2)]})
            sc.rep_mots(1, [("5/6", None, "1. 5"), ("et 6/7", None, "et 6"), ("< 1", None, ("que 1", 2))],
                        avec={0: [FadeIn(p5, shift=DOWN * 0.2)], 1: [FadeIn(p67, shift=DOWN * 0.2)]})
            sc.fin_rep()

        self.question_pause("09-question", "09b-reponse", ["Laquelle est plus", "grande que 1 ?"],
                            [self.inline("5/6"), self.inline("7/6"), self.inline("6/7")], 1,
                            ["7 > 6 : 7/6 > 1", "5/6 et 6/7 < 1"], mot_q="Laquelle", autres_r=apres)

    # ── 10 : défi (ranger trois fractions) ──────────────────────────────────
    def barres_defi(self):
        bs = [self.b(2, 1, 1.8, CA, largeur=5.2, h=0.55), self.b(8, 3, 0.05, CB, largeur=5.2, h=0.55),
              self.b(8, 5, -1.7, "#a78bfa", largeur=5.2, h=0.55)]
        ls = [self.lab(b, t) for b, t in zip(bs, ("1/2", "3/8", "5/8"))]
        return bs, ls

    def ecran_defi(self):
        self.ecran("10-defi", 0.65)
        self.au_mot("À toi de jouer")
        self.titre("À toi de jouer !", fs=50)
        bs, ls = self.barres_defi()
        for (b, l), mot in zip(zip(bs, ls), ("fait 1", "demi, 3", "et 5")):
            self.au_nb(mot)
            self.play(b.apparaitre(0.5), FadeIn(l), run_time=0.5)
        self.au_mot("Range")
        l3 = self.col(self.bloc(["Range-les, de la plus", "petite à la plus grande."], 36, ORANGE_RETENUE), 1.0)
        sans_synchro(l3)
        self.play(FadeIn(l3, scale=0.9), run_time=0.4)
        self.pause_defi(y=-0.4)

    def ecran_correction(self):
        self.ecran("10b-correction", 0.65)
        self.titre("Correction", fs=50)
        bs, ls = self.barres_defi()
        self.add(*bs, *ls)
        self.L([("2 ×", WHITE, "Correction. 2"), ("4 =", WHITE, "2 fois 4"), ("8", WHITE, "égale 8")], 2.15, fs=38)
        b8, anim = bs[0].repartager(4, run_time=0.8)
        self.L([("1/2", CA, "8 : 1"), ("= 4/8", CA, "égale 4")], 1.35, fs=40, avec={1: [anim]})
        self.au_mot("On compare")
        self.play(*[Indicate(VGroup(*b.parts), color=WHITE, scale_factor=1.03) for b in (b8, bs[1], bs[2])],
                  run_time=0.8)
        self.L([("3/8", CB, "Donc 3"), ("<", WHITE, None), ("1/2", CA, "puis 1"), ("<", WHITE, None),
                ("5/8", "#a78bfa", "puis 5")], 0.35, fs=48)
        self.play(Create(b8.fin_coloriee(vers=-3.55)), run_time=0.6)
        self.L([("1/2 =", WHITE, "Et 1"), ("0,5", BLEU_CALCUL, "c'est 0,5"), ("= 50 %", VERT_OK, "soit 50")], -0.65,
               fs=44)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("11-finale", 0.65)
        ba = Barre(6, 5, largeur=4.4, hauteur=0.6, etiquette="frac", fs=34, couleur=CA, centre=P(-3.6, 0.8))
        bb = Barre(12, 7, largeur=4.4, hauteur=0.6, etiquette="frac", fs=34, couleur=CB, centre=P(-3.6, -1.4))
        tir = bb.fin_coloriee(vers=0.0)
        fig = VGroup(ba, bb, tir)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("Même dénominateur :", "on compare les numérateurs."),
                                                         ("Même numérateur : plus le", "dénominateur est grand,",
                                                          "plus la fraction est petite."),
                                                         ("Sinon : le même", "dénominateur d'abord.")], fs=36)
        self.montrer2(lignes[0], "Même dénominateur", "on compare les")
        self.montrer2(lignes[1], "Même numérateur", "dénominateur est grand", "plus la fraction")
        self.montrer2(lignes[2], "Sinon", "avec le même")
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_meme_den()
        self.ecran_meme_num()
        self.ecran_question1()
        self.ecran_multiple()
        self.ecran_question2()
        self.ecran_piege()
        self.ecran_un()
        self.ecran_question3()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")


class FracComparer5e(FracComparerBase):
    identite = "Maths 5e — EleveAI"
    ceinture = "verte"
