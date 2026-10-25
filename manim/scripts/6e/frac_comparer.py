# frac_comparer.py
# EleveAI — Maths 6e — série « Fractions », épisode 05 : COMPARER DES FRACTIONS
# (micro du coach : fraction_comparer, prérequis fraction_egale), AVEC VOIX.
# Paysage 16:9, CEINTURE VERTE : la paysage complète du niveau de la classe
# (méthode, piège, défi corrigé), repère de REGLES.md. Short : frac_comparer_short.py.
# ⭐ Le geste : REDÉCOUPER (3/5 = 6/10) pour avoir les MÊMES parts, puis comparer
# les numérateurs — le geste de l'épisode 03 (simplifier) vu à l'envers.
#
# Décor et métier : les TRANSPORTS ; Yasmine, RÉGULATRICE DU TRAFIC FERROVIAIRE :
# sur la même ligne, l'écran du train de Sami dit 3/5 du trajet, celui de Nora
# 7/10 → Nora est devant. Défi : 3/4 et 5/8 → Sami devant. (Le 25/10, le sport
# et « entraîneuse » étaient déjà pris par le 04 du lot A : on a changé de décor.)
# Aucune donnée du monde réel citée. Centres d'intérêt : transports.
#
# Micro → écrans (banque fractions.bank.ts, fiche maths-6e-fractions.tsx) :
# même dénominateur 3/5 et 4/5 (02, fiche propriété 3), même numérateur 1/3 et
# 1/5 + le piège « 5 > 3 » (03, fiche exemple 3, fixed piege_denominateur),
# question 1/8, 1/4, 1/6 (04), un dénominateur multiple de l'autre : redécouper
# (05, tpl_2), question 2/3 et 5/6 avec le leurre « soustraire » (06), défi
# 3/4 et 5/8 (07), la chaîne fraction → décimal → pourcentage (08).
# Écrans : 00 garde · 01 Yasmine et les écrans des trains · 02 même dénominateur · 03
# même numérateur (piège) · 04 QUESTION 1 · 05 redécouper · 06 QUESTION 2 · 07
# défi · 07b correction · 08 la chaîne 60 % / 70 % · 09 ce que tu as appris · 10 fin.
#
# Voix : manim/voix/6e-frac-comparer.json (débit −10), WAV dans
# public/sons/6e-frac-comparer/ ; calage mot à mot : frac_comparer_marques.json
# (scripts/marques_dump.ps1 puis scripts/cues2marques.py, comme le pilote).
# Outils du lot : frac_lotb_commun.py (lignes écrites morceau par morceau AU MOT).
# python -m manim render -qh --disable_caching manim/scripts/6e/frac_comparer.py FracComparer6e -o eleveai-maths-6e-frac-comparer --media_dir manim/scripts/6e/media-frac-comparer
# Sortie : manim/sorties/6e/maths/fractions/05-comparer/eleveai-maths-6e-frac-comparer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lotb_commun import *  # noqa: E402,F403

C_SAMI = "#60a5fa"
C_NORA = "#fb923c"
KW = dict(largeur=5.2, hauteur=0.7)


def regulatrice(s=1.0):
    """Yasmine : gilet orange, casque-micro sur les oreilles."""
    p = personnage(peau="#8d5524", haut="#f97316", cheveux="#111827", longs=True, s=s)
    bandes = VGroup(*[Rectangle(width=0.9, height=0.07, fill_color="#fde047", fill_opacity=1, stroke_width=0)
                      .move_to(P(0, y)) for y in (-1.15, -1.45)])
    arceau = Arc(radius=0.5, start_angle=0.15, angle=PI - 0.3, color="#e5e7eb", stroke_width=6).move_to(P(0, 0.3))
    ecout = VGroup(*[RoundedRectangle(width=0.18, height=0.3, corner_radius=0.07, fill_color="#334155",
                                      fill_opacity=1, stroke_width=0).move_to(P(x, 0.0)) for x in (-0.46, 0.46)])
    micro = VGroup(Line(P(-0.46, -0.1), P(-0.15, -0.28), color="#334155", stroke_width=4),
                   Dot(P(-0.13, -0.29), radius=0.05, color="#334155"))
    return VGroup(p, VGroup(bandes, arceau, ecout, micro).scale(s, about_point=ORIGIN))


def montre(nom, couleur, larg=2.1):
    """L'écran de suivi d'un train : un boîtier sombre sur son pied, le nom du
    conducteur en haut ; la fraction du trajet se pose au centre."""
    bracelet = VGroup(Rectangle(width=0.35, height=0.5, fill_color="#334155", fill_opacity=1, stroke_width=0)
                      .move_to(P(0, -larg * 0.55)),
                      Rectangle(width=1.1, height=0.12, fill_color="#334155", fill_opacity=1, stroke_width=0)
                      .move_to(P(0, -larg * 0.8)))
    boitier = RoundedRectangle(width=larg, height=larg * 0.95, corner_radius=0.35, fill_color="#0b1220",
                               fill_opacity=1, stroke_color=couleur, stroke_width=6)
    t = Text(nom, font_size=30, color=couleur).move_to(boitier.get_top() + DOWN * 0.38)
    t.sans_synchro = True
    g = VGroup(bracelet, boitier, t)
    g.ecran = boitier.get_center() + DOWN * 0.25
    return g


class FracComparerBase(PaysageB):
    nom_voix = "6e-frac-comparer"
    fichier_marques = "frac_comparer_marques.json"

    def nom_barre(self, b, nom, couleur):
        t = self.mor(nom, 30, couleur).next_to(b.carte, UP, buff=0.08).align_to(b.carte, LEFT).shift(RIGHT * 0.1)
        return t

    def coureur(self, b, couleur, nom):
        """Le rond du coureur, posé AU BOUT de la partie coloriée de la barre."""
        x = b.x_trait(max(b.colories) + 1)
        m = marqueur(nom, couleur, fs=24)
        m.move_to(P(x, b.contour.get_top()[1] + 0.12), DOWN)
        return m

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Comparer des fractions", self.identite, self.ceinture)
        b1 = Barre(5, 3, largeur=4.2, hauteur=0.55, centre=P(-0.6, 0.75))
        b2 = Barre(10, 7, largeur=4.2, hauteur=0.55, centre=P(-0.6, -0.65))
        self.au_mot("Comparer")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.play(b1.apparaitre(0.8), b2.apparaitre(0.8))
        self.au_mot("Laquelle")
        q = self.t("?", 90, AMBRE).next_to(VGroup(b1, b2), RIGHT, buff=0.5)
        self.play(FadeIn(q, scale=0.4), run_time=0.4)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Yasmine et les deux montres ────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = regulatrice(1.15).move_to(P(-5.3, -0.4))
        self.au_mot("Voici Yasmine")
        nom = self.col(self.t("Yasmine", 44, BLEU_CALCUL), 2.9)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("régulatrice")
        met = self.col(self.t("régulatrice du trafic ferroviaire", 32, BLEU_CALCUL), 2.2)
        self.play(FadeIn(met, shift=UP * 0.2), run_time=0.4)
        self.au_mot("la même ligne")
        cross = self.col(self.t("Deux trains, la même ligne", 34), 1.3)
        self.play(FadeIn(cross, shift=RIGHT * 0.2), run_time=0.4)
        mh = montre("Sami", C_SAMI).move_to(P(-2.35, 1.6))
        mn = montre("Nora", C_NORA).move_to(P(-2.35, -1.5))
        self.au_mot("L'écran du train")
        self.play(FadeIn(mh, shift=UP * 0.2), run_time=0.5)
        fh = EcritureFraction(3, 5, fs=50).move_to(mh[1].get_center() + DOWN * 0.3)
        self.au_mot("3 cinquièmes")
        self.play(FadeIn(fh, scale=1.4), run_time=0.4)
        self.au_mot("Celui de Nora")
        self.play(FadeIn(mn, shift=UP * 0.2), run_time=0.5)
        fn = EcritureFraction(7, 10, fs=50).move_to(mn[1].get_center() + DOWN * 0.3)
        self.au_mot("7 dixièmes")
        self.play(FadeIn(fn, scale=1.4), run_time=0.4)
        self.au_mot("Qui est devant")
        q = self.col(self.ligne([("Qui est", WHITE), ("devant", ORANGE_RETENUE), ("?", ORANGE_RETENUE)], 46), -0.3)
        self.play(FadeIn(q, scale=0.8), run_time=0.5)
        self.insister(q, 1.15, 0.25)
        self.attendre_voix()

    # ── 02 : même dénominateur (3/5 et 4/5) ─────────────────────────────────
    def ecran_meme_den(self):
        self.ecran("02-meme-den")
        ba = Barre(5, 3, centre=P(-3.3, 1.5), **KW)
        bb = Barre(5, 4, centre=P(-3.3, -0.1), **KW)
        fa = EcritureFraction(3, 5, fs=52).move_to(P(1.7, 1.5))
        fb = EcritureFraction(4, 5, fs=52).move_to(P(1.7, -0.1))
        self.au_mot("3 cinquièmes et")
        self.play(ba.apparaitre(0.9), FadeIn(fa, scale=1.3), run_time=0.9)
        self.au_mot("4 cinquièmes. Les")
        self.play(bb.apparaitre(0.9), FadeIn(fb, scale=1.3), run_time=0.9)
        self.au_mot("coupées en 5")
        self.play(Indicate(VGroup(fa.den, fb.den), color=AMBRE, scale_factor=1.3), run_time=0.6)
        self.au_mot("la même taille")
        self.play(LaggedStart(*[Indicate(VGroup(ba.parts[i], bb.parts[i]), color=AMBRE, scale_factor=1.08)
                                for i in range(5)], lag_ratio=0.15), run_time=1.0)
        self.au_mot("On compare les numérateurs")
        r = self.col(self.t("On compare les numérateurs.", 36, BLEU_CALCUL), -1.35)
        self.play(FadeIn(r, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("4 est plus grand")
        self.play(Indicate(fb.num, color=VERT_OK, scale_factor=1.5), run_time=0.5)
        self.au_mot("3. Donc")
        self.play(Indicate(fa.num, color=ORANGE_RETENUE, scale_factor=1.5), Create(ba.fin_coloriee(vers=-1.8)),
                  run_time=0.6)
        lg = self.ligne_mots([(EcritureFraction(4, 5, fs=50, couleur=VERT_OK), WHITE, "4 cinquièmes est"),
                              (">", WHITE, None),
                              (EcritureFraction(3, 5, fs=50), WHITE, "3 cinquièmes.")], buff=0.3)
        self.col(lg, -2.55)
        self.jouer_mots(lg)
        self.play(Create(self.encadrer(lg)), run_time=0.4)
        self.attendre_voix()

    # ── 03 : même numérateur (1/3 et 1/5) : le piège ────────────────────────
    def ecran_meme_num(self):
        self.ecran("03-meme-num")
        ba = Barre(3, 1, centre=P(-3.3, 1.5), **KW)
        bb = Barre(5, 1, centre=P(-3.3, -0.1), **KW)
        fa = EcritureFraction(1, 3, fs=52).move_to(P(1.7, 1.5))
        fb = EcritureFraction(1, 5, fs=52).move_to(P(1.7, -0.1))
        self.au_mot("1 tiers")
        self.play(ba.apparaitre(0.9), FadeIn(fa, scale=1.3), run_time=0.9)
        self.au_mot("1 cinquième ?")
        self.play(bb.apparaitre(0.9), FadeIn(fb, scale=1.3), run_time=0.9)
        self.au_mot("Attention au piège")
        tit = self.col(self.t("Attention au piège !", 40, ROUGE_ERREUR), 2.95)
        tit.set_x(4.0)
        self.play(Write(tit), run_time=0.5)
        lg1 = self.ligne_mots([("5 >", ROUGE_ERREUR, "5 est plus grand"), ("3", ROUGE_ERREUR, "3. Mais")], fs=44)
        self.col(lg1, -1.3).set_x(1.7)
        self.jouer_mots(lg1, avec=[Indicate(VGroup(fa.den, fb.den), color=ROUGE_ERREUR, scale_factor=1.3)])
        self.au_mot("regarde les barres")
        tir = ba.fin_coloriee(vers=-1.85)
        self.play(Create(tir), run_time=0.6)
        self.au_mot("des parts plus petites")
        self.play(Indicate(bb.parts[0], color=AMBRE, scale_factor=1.15), run_time=0.6)
        lg2 = self.ligne_mots([("mais", WHITE, "1 cinquième est"), (EcritureFraction(1, 5, fs=48, couleur=VERT_OK),
                                                                  WHITE, None),
                               ("<", WHITE, None), (EcritureFraction(1, 3, fs=48, couleur=VERT_OK), WHITE,
                                                    "1 tiers. Plus")], buff=0.25)
        self.col(lg2, -1.3).set_x(4.6)
        self.jouer_mots(lg2)
        self.au_mot("Plus on coupe")
        regle = self.bloc(["Plus on coupe,", "plus les parts sont petites !"], 32, AMBRE)
        regle.move_to(P(-3.1, -2.35))
        for m in regle:
            m.sans_synchro = True
        self.play(FadeIn(regle, shift=UP * 0.2), run_time=0.5)
        self.play(Create(self.encadrer(regle, AMBRE)), run_time=0.4)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (1/8, 1/4, 1/6) ─────────────────────────────────────
    def loupe(self, r=1.2):
        return VGroup(Circle(radius=r, stroke_color=AMBRE, stroke_width=10),
                      Line(P(r * 0.72, -r * 0.72), P(r * 1.6, -r * 1.6), stroke_color=AMBRE, stroke_width=16))

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        lp = self.loupe().move_to(P(-3.3, 0.3))
        qm = self.t("?", 110, AMBRE).move_to(lp[0])
        self.add(lp, qm)
        kw = dict(largeur=4.6, hauteur=0.55, marge=0.2)
        bs = [Barre(n, 1, centre=P(-2.9, y), **kw) for n, y in ((8, 1.5), (4, 0.2), (6, -1.1))]
        labs = [self.mor(s, 34).next_to(b, LEFT, buff=0.12) for s, b in zip(("1/8", "1/4", "1/6"), bs)]

        def geste(sc):
            sc.au_mot("1 quart")
            sc.play(FadeOut(lp), FadeOut(qm), *[FadeIn(VGroup(b, l)) for b, l in zip(bs, labs)], run_time=0.5)
            sc.play(Indicate(VGroup(bs[1].parts[0], labs[1]), color=VERT_OK, scale_factor=1.15), run_time=0.6)

        self.question_b("04-question", "04b-reponse", ["Laquelle est", "la plus grande ?"],
                        [bloc_fixe(self.inline("1/8")), bloc_fixe(self.inline("1/4")), bloc_fixe(self.inline("1/6"))], 1,
                        [[("coupé en", WHITE, "4 seulement"), ("4", VERT_OK, None), ("seulement :", WHITE, None)],
                         [("les plus grandes parts !", VERT_OK, "les plus grandes")]],
                        mot_q="Laquelle", autres_r=geste)

    # ── 05 : redécouper (3/5 = 6/10, puis 6/10 < 7/10) ──────────────────────
    def egalite_trou(self, a, b, den2, fs=72, y=1.25, x=None):
        f = EcritureFraction(a, b, fs=fs)
        g = EcritureFraction("…", den2, fs=fs)
        eg = egalite(f, g, buff=0.9)
        self.col(eg, y)
        if x is not None:
            eg.set_x(x)
        haut, bas = fleches(f, g, "× 2", fs=40)
        return f, g, eg, haut, bas

    def ecran_redecouper(self):
        self.ecran("05-redecouper")
        bh = Barre(5, 3, centre=P(-3.3, 1.45), **KW)
        bn = Barre(10, 7, centre=P(-3.3, -0.55), **KW)
        nh, nn = self.nom_barre(bh, "Sami", C_SAMI), self.nom_barre(bn, "Nora", C_NORA)
        self.au_mot("Revenons")
        self.play(FadeIn(VGroup(bh, nh)), FadeIn(VGroup(bn, nn)), run_time=0.6)
        f, g, eg, haut, bas = self.egalite_trou(3, 5, 10, fs=64, y=1.65, x=2.9)
        f7 = EcritureFraction(7, 10, fs=64).move_to(P(4.9, -1.5))
        self.au_mot("3 cinquièmes et")
        self.play(FadeIn(f, scale=1.3), Indicate(bh.parts, color=C_SAMI, scale_factor=1.04), run_time=0.5)
        self.au_mot("7 dixièmes. Ici")
        self.play(FadeIn(f7, scale=1.3), Indicate(bn.parts, color=C_NORA, scale_factor=1.04), run_time=0.5)
        self.au_mot("pas la même taille")
        self.play(Indicate(VGroup(f.den, f7.den), color=ROUGE_ERREUR, scale_factor=1.3), run_time=0.6)
        self.au_mot("5 fois 2")
        self.play(Create(bas[0]), FadeIn(bas[1], shift=UP * 0.15), run_time=0.5)
        self.au_mot("10. Alors")
        self.play(FadeIn(eg[1]), FadeIn(g, scale=1.3), run_time=0.4)
        self.au_mot("on coupe chaque cinquième")
        b10, anim = bh.repartager(2, run_time=1.4)
        self.play(anim)
        self.au_mot("3 fois 2")
        self.play(Create(haut[0]), FadeIn(haut[1], shift=DOWN * 0.15), run_time=0.5)
        six = g.chiffre(6)
        self.au_mot("6 : 3")
        self.play(FadeOut(g.num), FadeIn(six, scale=1.5), run_time=0.4)
        self.au_mot("6 dixièmes. Maintenant")
        self.play(Create(self.encadrer(VGroup(f, eg[1], g))), run_time=0.4)
        self.au_mot("les parts sont les mêmes")
        self.play(LaggedStart(*[Indicate(VGroup(b10.parts[i], bn.parts[i]), color=AMBRE, scale_factor=1.06)
                                for i in range(10)], lag_ratio=0.08), run_time=1.0)
        lg = self.ligne_mots([(EcritureFraction(6, 10, fs=64), WHITE, "6 dixièmes est"), ("<", WHITE, None)],
                             buff=0.3)
        lg.next_to(f7, LEFT, buff=0.3)
        lg.shift(UP * (f7.trait.get_y() - lg[0].trait.get_y()))
        self.jouer_mots(lg, avec=[Create(b10.fin_coloriee(vers=-1.9))])
        self.au_mot("7 dixièmes. Nora")
        self.play(Indicate(f7, color=VERT_OK, scale_factor=1.2), run_time=0.5)
        self.au_mot("Nora est devant")
        ch, cn = self.coureur(b10, C_SAMI, "Sami"), self.coureur(bn, C_NORA, "Nora")
        fin = self.col(self.t("Nora est devant !", 40, VERT_OK), -2.55)
        fin.set_x(-3.3)
        self.play(FadeIn(ch[0], scale=2), FadeIn(cn[0], scale=2), FadeIn(fin, scale=1.2), run_time=0.5)
        self.insister(fin, 1.15, 0.25)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (2/3 et 5/6 : le leurre « soustraire ») ─────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        lp = self.loupe().move_to(P(-3.3, 0.3))
        qm = self.t("?", 110, AMBRE).move_to(lp[0])
        self.add(lp, qm)
        b3 = Barre(3, 2, centre=P(-3.3, 1.3), **KW)
        b6 = Barre(6, 5, centre=P(-3.3, -0.5), **KW)
        l3 = self.mor("2/3", 34).next_to(b3.carte, UP, buff=0.08).align_to(b3.carte, LEFT)
        l6 = self.mor("5/6", 34).next_to(b6.carte, UP, buff=0.08).align_to(b6.carte, LEFT)

        etat = {}

        def montrer_barres():
            return [FadeOut(lp), FadeOut(qm), FadeIn(VGroup(b3, l3)), FadeIn(VGroup(b6, l6))]

        def recoupe():
            b, anim = b3.repartager(2, run_time=0.8)
            etat["b"] = b
            return [anim]

        self.question_b("06-question", "06b-reponse", ["Compare", "2 tiers et 5 sixièmes."],
                        [bloc_fixe(self.inline("2/3 < 5/6")), bloc_fixe(self.inline("2/3 = 5/6")), bloc_fixe(self.inline("2/3 > 5/6"))], 0,
                        [[("2/3", WHITE, ("2 tiers égale", 1), montrer_barres), ("= 4/6", WHITE, "4 sixièmes. Et", recoupe)],
                         [("4/6 <", WHITE, "4 sixièmes est"), ("5/6", WHITE, "5 sixièmes. Enlever",
                                                                     lambda: [Create(etat["b"].fin_coloriee(vers=-1.8))])],
                         ],
                        mot_q="Compare", apres_rep=self.piege_q2)

    def piege_q2(self, sc):
        """Le leurre B (5/6 → 2/3 en enlevant 3), écrit sous les barres, à gauche."""
        l1 = self.ligne_mots([("Enlever 3 en haut et en bas,", ROUGE_ERREUR, "3 en haut")], fs=34)
        l2 = self.ligne_mots([("c'est le piège !", ROUGE_ERREUR, "piège")], fs=34)
        l1.move_to(P(-3.3, -2.0))
        l2.move_to(P(-3.3, -2.6))
        self.jouer_mots(l1)
        self.jouer_mots(l2)

    # ── 07 : défi (3/4 et 5/8) ──────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("07-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.col(self.t("À toi de jouer !", 50, JAUNE_TITRE), 3.0)
        self.play(Write(tit), run_time=0.6)
        mh = montre("Sami", C_SAMI).move_to(P(-4.6, 0.2))
        mn = montre("Nora", C_NORA).move_to(P(-1.9, 0.2))
        self.au_mot("le train de Sami")
        self.play(FadeIn(mh, shift=UP * 0.2), run_time=0.5)
        fh = EcritureFraction(3, 4, fs=50).move_to(mh[1].get_center() + DOWN * 0.3)
        self.au_mot("3 quarts")
        self.play(FadeIn(fh, scale=1.4), run_time=0.4)
        self.au_mot("Celui de Nora")
        self.play(FadeIn(mn, shift=UP * 0.2), run_time=0.4)
        fn = EcritureFraction(5, 8, fs=50).move_to(mn[1].get_center() + DOWN * 0.3)
        self.au_mot("5 huitièmes")
        self.play(FadeIn(fn, scale=1.4), run_time=0.4)
        self.au_mot("Qui est devant")
        q = self.col(self.ligne([("Qui est", WHITE), ("devant", ORANGE_RETENUE), ("?", ORANGE_RETENUE)], 46), 0.9)
        self.play(FadeIn(q, scale=0.8), run_time=0.5)
        self.pause_defi(y=-0.4)

    def ecran_correction(self):
        self.ecran("07b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-3.3, 3.0))
        bh = Barre(4, 3, centre=P(-3.3, 1.45), **KW)
        bn = Barre(8, 5, centre=P(-3.3, -0.55), **KW)
        nh, nn = self.nom_barre(bh, "Sami", C_SAMI), self.nom_barre(bn, "Nora", C_NORA)
        f, g, eg, haut, bas = self.egalite_trou(3, 4, 8, fs=64, y=1.65, x=2.9)
        f5 = EcritureFraction(5, 8, fs=64).move_to(P(4.9, -1.5))
        self.play(Write(tit), FadeIn(VGroup(bh, nh, bn, nn)), FadeIn(f), FadeIn(f5), run_time=0.6)
        self.au_mot("4 fois 2")
        self.play(Create(bas[0]), FadeIn(bas[1], shift=UP * 0.15), run_time=0.5)
        self.au_mot("8 : on")
        self.play(FadeIn(eg[1]), FadeIn(g, scale=1.3), run_time=0.4)
        self.au_mot("on coupe chaque quart")
        b8, anim = bh.repartager(2, run_time=1.2)
        self.play(anim)
        self.au_mot("3 fois 2")
        self.play(Create(haut[0]), FadeIn(haut[1], shift=DOWN * 0.15), run_time=0.5)
        six = g.chiffre(6)
        self.au_mot("6. 3 quarts")
        self.play(FadeOut(g.num), FadeIn(six, scale=1.5), run_time=0.4)
        self.au_mot("3 quarts égale")
        self.play(Create(self.encadrer(VGroup(f, eg[1], g))), run_time=0.4)
        lg = self.ligne_mots([(EcritureFraction(6, 8, fs=64), WHITE, "6 huitièmes est"), (">", WHITE, None)],
                             buff=0.3)
        lg.next_to(f5, LEFT, buff=0.3)
        lg.shift(UP * (f5.trait.get_y() - lg[0].trait.get_y()))
        self.jouer_mots(lg, avec=[Create(b8.fin_coloriee(vers=-1.9))])
        self.au_mot("Sami est devant")
        ch, cn = self.coureur(b8, C_SAMI, "Sami"), self.coureur(bn, C_NORA, "Nora")
        fin = self.t("Sami est devant !", 42, VERT_OK).move_to(P(-3.3, -2.15))
        self.play(FadeIn(ch[0], scale=2), FadeIn(cn[0], scale=2), FadeIn(fin, scale=1.2), run_time=0.5)
        tip = self.ligne_mots([("Nora ?", ORANGE_RETENUE, "Nora parce"),
                               ("Redécoupe d'abord !", ORANGE_RETENUE, "redécoupe d'abord")], fs=34)
        tip.move_to(P(-3.3, -2.95))
        self.jouer_mots(tip)
        self.attendre_voix()

    # ── 08 : la chaîne (6/10 = 0,6 = 60 %) ──────────────────────────────────
    def ecran_chaine(self):
        self.ecran("08-chaine")
        ph = Pourcentage(60, mode="chargement", largeur=4.8, hauteur=0.6, fs=40, couleur=C_SAMI,
                         centre=P(-3.1, 1.2)).vide()
        pn = Pourcentage(70, mode="chargement", largeur=4.8, hauteur=0.6, fs=40, couleur=C_NORA,
                         centre=P(-3.1, -0.9)).vide()
        for pc in (ph, pn):
            pc.etiquette.set_opacity(0)
        nh = self.mor("Sami", 30, C_SAMI).next_to(ph.piste, UP, buff=0.12).align_to(ph.piste, LEFT)
        nn = self.mor("Nora", 30, C_NORA).next_to(pn.piste, UP, buff=0.12).align_to(pn.piste, LEFT)
        self.au_mot("pourcentage")
        self.play(FadeIn(VGroup(ph.piste, nh)), FadeIn(VGroup(pn.piste, nn)), run_time=0.5)
        self.add(ph.plein, pn.plein)
        l1 = self.ligne_mots([(EcritureFraction(6, 10, fs=56), WHITE, "6 dixièmes, c'est"),
                              ("= 6 ÷", WHITE, "6 divisé"), ("10", WHITE, "10, égale")], fs=44, buff=0.24)
        self.col(l1, 2.5)
        self.jouer_mots(l1)
        l2 = self.ligne_mots([("= 0,6", BLEU_CALCUL, ("0,6", 1)), ("= 60 %", VERT_OK, "60 %. Pour")], fs=44)
        self.col(l2, 1.4)
        self.jouer_mots(l2)
        self.play(ph.remplir(1.2), ph.etiquette.animate.set_opacity(1), run_time=1.2)
        l3 = self.ligne_mots([(EcritureFraction(7, 10, fs=56), WHITE, "7 dixièmes égale"),
                              ("= 0,7", BLEU_CALCUL, "0,7 :"), ("= 70 %", VERT_OK, "70 %. 60")], fs=44)
        self.col(l3, 0.2)
        self.jouer_mots(l3)
        self.play(pn.remplir(1.2), pn.etiquette.animate.set_opacity(1), run_time=1.2)
        l4 = self.ligne_mots([("60 % <", WHITE, "60 % est"), ("70 %", WHITE, "70 % : même"),
                              ("même réponse !", VERT_OK, "même réponse")], fs=40)
        self.col(l4, -1.0)
        self.jouer_mots(l4)
        l5 = self.ligne_mots([("fraction", AMBRE, "Fraction"), ("→ décimal", AMBRE, "décimal, puis"),
                              ("→ pourcentage", AMBRE, "pourcentage : c'est")], fs=34)
        l5.move_to(P(-1.2, -2.55))
        self.jouer_mots(l5)
        self.play(Create(self.encadrer(l5, AMBRE)), run_time=0.4)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        ba = Barre(10, 6, largeur=4.4, hauteur=0.6, etiquette="frac", fs=34, centre=P(-3.6, 0.8))
        bb = Barre(10, 7, largeur=4.4, hauteur=0.6, etiquette="frac", fs=34, centre=P(-3.6, -1.4))
        tir = ba.fin_coloriee(vers=-(ba.contour.get_bottom()[1] - bb.contour.get_bottom()[1]) - 0.2)
        fig = VGroup(ba, bb, tir)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("Même dénominateur :", "on compare les numérateurs."),
                                                         ("Même numérateur : plus on", "coupe, plus c'est petit."),
                                                         ("Sinon : on redécoupe pour", "avoir les mêmes parts.")],
                                     fs=36)
        for lg, mot in zip(lignes, ["Même dénominateur", "Même numérateur", "Sinon"]):
            self.au_mot(mot)
            self.play(Create(lg[0]), FadeIn(lg[1][0], shift=RIGHT * 0.2), run_time=0.35)
            self.poser_lignes(VGroup(*lg[1][1:]), "fade", 0.35)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_meme_den()
        self.ecran_meme_num()
        self.ecran_question1()
        self.ecran_redecouper()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_chaine()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class FracComparer6e(FracComparerBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
