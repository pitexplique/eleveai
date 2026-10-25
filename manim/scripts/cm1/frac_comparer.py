# frac_comparer.py
# EleveAI — Maths CM1 ET CM2 — série « Fractions », épisode 04 : COMPARER DES
# FRACTIONS (micro du coach : fraction_comparer, dans les DEUX classes), AVEC
# VOIX. Paysage 16:9. CEINTURES : CM1 VERTE (la notion complète : même
# dénominateur, même numérateur, le piège « grand nombre en bas », la moitié,
# ranger, défi corrigé) ; CM2 JAUNE (rappel de CM1).
# Short jumeau : frac_comparer_short.py (les éléphants et les fourmis, blanche).
#
# Décor et métier : les JEUX VIDÉO ; Nolan, TESTEUR DE JEUX VIDÉO, vérifie les
# barres d'énergie des héros : 3/5 < 4/5 ; potions 1/4 > 1/8 ; 3/8 < 1/2 et
# 4/8 = 1/2 (PRÉPARE les fractions égales) ; défi : 1/6 < 2/6 < 5/6. Aucune
# donnée du monde réel citée. Centres : jeux-video.
# Vérifié (Python, Fraction) : 3/5 < 4/5 ; 5/8 < 7/8 ; 1/8 < 1/4 ; 1/10 < 1/2 ;
# 1/6 < 1/5 < 1/3 ; 3/8 < 1/2 = 4/8 ; 1/6 < 2/6 < 5/6.
#
# Micro → écrans (banques cm1/…-gabarits-c.ts tpl_151-156, cm2/…-comparer.ts) :
# même dénominateur (02, tpl_151 / tpl_1), le signe (QUESTION 1, tpl_152 / tpl_2),
# même numérateur (04, tpl_153 / tpl_3), le piège « plus grand dénominateur =
# plus grande fraction » (05, QUESTION 2 : leurres 1/6, 1/5), la moitié (07,
# tpl_155 / tpl_4), ranger (défi, tpl_156 / tpl_6).
# Écrans : 00 garde · 01 Nolan · 02 même dénominateur · 03 QUESTION 1 · 04 même
# numérateur · 05 le piège · 06 QUESTION 2 · 07 la moitié · 08 défi ·
# 08b correction · 09 ce que tu as appris · 10 fin.
#
# Bases : frac_cm_commun.py (PaysageCM) ; canvas_fractions.py (non modifié).
# Voix : manim/voix/cm-frac-comparer.json (débit −10) ; marques : frac_comparer_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/frac_comparer.py FracComparerCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/frac_comparer.py FracComparerCM1 -o eleveai-maths-cm1-frac-comparer --media_dir manim/scripts/cm1/media-frac-comparer
# CM2 : garde seule (GARDE_SEULE=1, classe FracComparerCM2) puis frac_cm_commun.py coller.
# Sorties : manim/sorties/{cm1,cm2}/maths/fractions/04-comparer/eleveai-maths-{cm1,cm2}-frac-comparer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_cm_commun import *  # noqa: E402,F403

XB, LB = -2.6, 5.0
ECRAN_JEU = "#1e1b4b"


def testeur(s=0.9):
    p = personne(peau="#c68642", tenue="#4f46e5", cheveux="#111827", s=s)
    p.add(casque_audio(p))
    c = p.corps.get_center() + DOWN * 0.15 * s
    manette = RoundedRectangle(width=0.9 * s, height=0.35 * s, corner_radius=0.15 * s, fill_color="#111827",
                               fill_opacity=1, stroke_color=WHITE, stroke_width=2).move_to(c)
    p.add(manette)
    return p


def heros(couleur, s=0.4):
    tete = RoundedRectangle(width=0.8, height=0.8, corner_radius=0.15, fill_color=couleur, fill_opacity=1,
                            stroke_width=0)
    yeux = VGroup(*[Square(0.14, fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(P(x, 0.1))
                    for x in (-0.17, 0.17)])
    return VGroup(tete, yeux).scale(s / 0.4)


def potion(couleur, s=0.45):
    fiole = VGroup(Circle(radius=0.35, fill_color=couleur, fill_opacity=0.9, stroke_color=WHITE, stroke_width=3),
                   Rectangle(width=0.22, height=0.3, fill_color=couleur, fill_opacity=0.9, stroke_color=WHITE,
                             stroke_width=3).move_to(P(0, 0.45)))
    return fiole.scale(s / 0.45)


def barre(n, k, y, couleur=BLEU_PART, x=XB, largeur=LB, h=0.6):
    return Barre(n, k, largeur=largeur, hauteur=h, couleur=couleur, marge=0.15, centre=P(x, y))


class FracComparerBase(PaysageCM):
    nom_voix = "cm-frac-comparer"
    fichier_marques = "frac_comparer_marques.json"

    def ecrans(self):
        return [self.page_de_garde, self.ecran_situation, self.ecran_meme_den, self.ecran_question1,
                self.ecran_meme_num, self.ecran_piege, self.ecran_question2, self.ecran_moitie, self.ecran_defi,
                self.ecran_correction, self.ecran_finale]

    def frac_a_gauche(self, b, n, d, fs=44, couleur=WHITE):
        return EcritureFraction(n, d, fs=fs, couleur=couleur).next_to(b, LEFT, buff=0.3)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Comparer des fractions", self.identite, self.ceinture, y_ech=-2.7)
        self.au_mot("Comparer")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        b1 = barre(4, 1, 1.2, x=-0.6)
        b2 = barre(8, 1, -0.5, x=-0.6)
        f1, f2 = self.frac_a_gauche(b1, 1, 4), self.frac_a_gauche(b2, 1, 8)
        self.au_nb("1 quart")
        self.play(FadeIn(f1, scale=1.2), b1.apparaitre(0.5), run_time=0.5)
        self.au_nb("ou 1")
        self.play(FadeIn(f2, scale=1.2), b2.apparaitre(0.5), run_time=0.5)
        q = Text("?", font_size=100, color=AMBRE).move_to(P(3.2, 0.3))
        self.au_mot("lequel")
        self.play(FadeIn(q, scale=0.4), run_time=0.35)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Nolan, testeur de jeux vidéo ───────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = testeur(0.9).move_to(P(-5.6, -2.0))
        self.au_mot("Voici Nolan")
        nom = self.t("Nolan", 36, BLEU_CALCUL).next_to(pers, UP, buff=0.25)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.5)
        metier = self.bloc(["testeur de", "jeux vidéo"], 28, BLEU_CALCUL).next_to(pers, RIGHT, buff=0.2)
        metier.align_to(pers, DOWN)
        bloc_fixe(metier)
        self.au_mot("testeur")
        self.play(FadeIn(metier, shift=UP * 0.2), run_time=0.4)
        ecr = RoundedRectangle(width=5.6, height=3.0, corner_radius=0.2, fill_color=ECRAN_JEU, fill_opacity=1,
                               stroke_color="#64748b", stroke_width=6).move_to(P(-2.4, 1.6))
        hb, hv = heros(BLEU_PART).move_to(P(-4.55, 2.2)), heros(VERT_PART).move_to(P(-4.55, 1.0))
        bb = Barre(5, 3, largeur=3.4, hauteur=0.45, marge=0.1, centre=P(-1.9, 2.2))
        bv = Barre(5, 4, largeur=3.4, hauteur=0.45, couleur=VERT_PART, marge=0.1, centre=P(-1.9, 1.0))
        self.au_mot("barres d'énergie")
        self.play(FadeIn(ecr), FadeIn(hb), FadeIn(hv), run_time=0.5)
        l1 = self.col(self.inline("bleu : 3 cinquièmes", 38, BLEU_PART), 1.9)
        self.au_nb("a 3")
        self.play(bb.apparaitre(0.6), FadeIn(l1, shift=RIGHT * 0.2), run_time=0.6)
        l2 = self.col(self.inline("vert : 4 cinquièmes", 38, VERT_PART), 0.9)
        self.au_nb("vert, 4")
        self.play(bv.apparaitre(0.6), FadeIn(l2, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("Qui a le plus")
        q = self.col(self.bloc(["Qui a le plus", "d'énergie ?"], 40, ORANGE_RETENUE), -0.5)
        self.poser_lignes(q, "up", 0.3)
        self.attendre_voix()

    # ── 02 : même dénominateur ──────────────────────────────────────────────
    def ecran_meme_den(self):
        self.ecran("02-meme-den")
        b1, b2 = barre(5, 3, 1.3), barre(5, 4, -0.3, couleur=VERT_PART)
        f1, f2 = self.frac_a_gauche(b1, 3, 5), self.frac_a_gauche(b2, 4, 5)
        self.add(b1, b2, f1, f2)
        self.au_nb("ont 5")
        self.play(Indicate(VGroup(b1.traits, b2.traits), color=AMBRE, scale_factor=1.03), run_time=0.6)
        l1 = self.col(self.inline("même taille de parts", 36, AMBRE), 2.2)
        self.au_mot("même taille")
        self.play(FadeIn(l1, shift=RIGHT * 0.15), run_time=0.35)
        self.au_mot("On compare le nombre")
        self.play(Create(b1.fin_coloriee(vers=-1.9)), Create(b2.fin_coloriee(vers=-0.3)), run_time=0.6)
        self.au_nb("parts : 4")
        self.calc([("4 >", WHITE), ("3", WHITE)], 1.2, 48)
        e = expression((4, 5), ">", (3, 5), fs=60)
        self.col(e, -0.3)
        self.au_nb("Donc 4")
        self.play(FadeIn(e[:2], scale=1.3), run_time=0.35)
        self.au_nb("que 3 cinquièmes")
        self.play(FadeIn(e[2:], scale=1.3), run_time=0.35)
        self.au_mot("Le héros vert")
        g = self.col(self.inline("le héros vert !", 40, VERT_PART), -2.0)
        self.play(FadeIn(g, scale=1.2), Create(self.encadrer(b2, VERT_OK, buff=0.05)), run_time=0.45)
        self.attendre_voix()

    # ── 03 : QUESTION 1 (5/8 et 7/8 : le signe) ─────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        b1, b2 = barre(8, 5, 1.4), barre(8, 7, -0.2)
        f1, f2 = self.frac_a_gauche(b1, 5, 8), self.frac_a_gauche(b2, 7, 8)

        def avant(sc):
            sc.au_nb("entre 5")
            sc.play(FadeIn(f1, scale=1.2), b1.apparaitre(0.4), run_time=0.4)
            sc.au_nb("et 7")
            sc.play(FadeIn(f2, scale=1.2), b2.apparaitre(0.4), run_time=0.4)

        def apres(sc):
            sc.au_mot("Même dénominateur")
            sc.rep(0)
            sc.au_nb("compare 5")
            sc.calc_ici([("5 <", WHITE), ("7", WHITE)], P(XB, -1.4), 44,
                        avec=[Create(b1.fin_coloriee(vers=-1.5))])
            sc.rep_fin()

        self.question_pause("03-question", "03b-reponse", ["Quel signe entre", "ces fractions ?"],
                            [self.inline("<"), self.inline(">"), self.inline("=")], 0,
                            ["Même dénominateur !"], mot_q="Quel signe", avant_q=avant, autres_r=apres)

    # ── 04 : même numérateur (les potions) ──────────────────────────────────
    def ecran_meme_num(self):
        self.ecran("04-meme-num")
        p1, p2 = potion("#f472b6").move_to(P(-6.0, 1.3)), potion("#a78bfa").move_to(P(-6.0, -0.3))
        b1, b2 = barre(4, 1, 1.3, x=-2.4, largeur=4.6), barre(8, 1, -0.3, x=-2.4, largeur=4.6)
        self.au_mot("2 potions")
        self.play(FadeIn(p1, shift=UP * 0.2), FadeIn(p2, shift=UP * 0.2), run_time=0.4)
        f1 = EcritureFraction(1, 4, fs=44).next_to(p1, RIGHT, buff=0.25)
        f2 = EcritureFraction(1, 8, fs=44).next_to(p2, RIGHT, buff=0.25)
        b1.next_to(f1, RIGHT, buff=0.3)
        b2.next_to(f2, RIGHT, buff=0.3).align_to(b1, LEFT)
        self.au_nb("remplit 1")
        self.play(FadeIn(f1, scale=1.2), b1.apparaitre(0.5), run_time=0.5)
        self.au_nb("l'autre 1")
        self.play(FadeIn(f2, scale=1.2), b2.apparaitre(0.5), run_time=0.5)
        self.au_nb("huitième. 8")
        self.calc([("8 >", AMBRE), ("4", AMBRE)], 2.2, 46)
        l2 = self.col(self.inline("… mais la part est plus petite !", 36, ROUGE_ERREUR), 1.3)
        self.au_mot("mais la part")
        self.play(FadeIn(l2, shift=RIGHT * 0.15), Create(b1.fin_coloriee(vers=-1.9)),
                  Indicate(b2.parts[0], color=ROUGE_ERREUR, scale_factor=1.2), run_time=0.6)
        r = self.col(self.bloc(["Plus on partage,", "plus les parts", "sont petites."], 36, AMBRE), 0.0)
        self.au_mot("Plus on partage")
        self.poser_lignes(r, "up", 0.3)
        e = expression((1, 4), ">", (1, 8), fs=60)
        self.col(e, -1.75)
        self.au_nb("petites. 1")
        self.play(FadeIn(e[:2], scale=1.3), run_time=0.35)
        self.au_nb("que 1")
        self.play(FadeIn(e[2:], scale=1.3), run_time=0.35)
        self.attendre_voix()

    # ── 05 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        self.au_mot("Attention au piège")
        self.titre("Attention au piège !", ROUGE_ERREUR)
        r = self.col(self.bloc(["Un grand nombre en bas", "ne fait pas", "une grande fraction."], 38), 1.4)
        self.au_mot("Un grand nombre")
        self.poser_lignes(r, "up", 0.3)
        b1, b2 = barre(10, 1, 1.0), barre(2, 1, -0.6)
        f1, f2 = self.frac_a_gauche(b1, 1, 10), self.frac_a_gauche(b2, 1, 2)
        e = expression((1, 10), "<", (1, 2), fs=64)
        self.col(e, -1.3)
        self.au_nb("fraction. 1")
        self.play(FadeIn(f1, scale=1.2), b1.apparaitre(0.5), FadeIn(e[:2], scale=1.3), run_time=0.5)
        self.au_nb("que 1")
        self.play(FadeIn(f2, scale=1.2), b2.apparaitre(0.5), FadeIn(e[2:], scale=1.3), run_time=0.5)
        self.play(Create(b1.fin_coloriee(vers=-2.0)), run_time=0.5)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (la plus grande : 1/6, 1/3, 1/5) ────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        bs = VGroup(barre(6, 1, 1.7, x=-2.4, largeur=4.6), barre(3, 1, 0.2, x=-2.4, largeur=4.6),
                    barre(5, 1, -1.3, x=-2.4, largeur=4.6))
        fs = VGroup(*[EcritureFraction(1, d, fs=38).next_to(b, LEFT, buff=0.3) for b, d in zip(bs, (6, 3, 5))])

        def apres(sc):
            sc.au_nb("numérateur, 1")
            sc.play(*[b.apparaitre(0.6) for b in bs], FadeIn(fs), run_time=0.6)
            sc.au_nb("En 3")
            sc.rep(0, avec=[Create(sc.encadrer(VGroup(bs[1], fs[1]), VERT_OK, buff=0.08)),
                            Create(bs[1].fin_coloriee(vers=-1.6))])
            sc.rep_fin()

        self.question_pause("06-question", "06b-reponse", ["Quelle fraction est", "la plus grande ?"],
                            [self.inline("1/6"), self.inline("1/3"), self.inline("1/5")], 1,
                            ["En 3 parts : plus grosses !"], mot_q="Quelle fraction", autres_r=apres)

    # ── 07 : comparer à la moitié ───────────────────────────────────────────
    def ecran_moitie(self):
        self.ecran("07-moitie")
        self.au_mot("Et pour comparer")
        self.titre("Et la moitié ?")
        b = barre(8, 3, 1.2)
        f = self.frac_a_gauche(b, 3, 8)
        self.au_nb("moitié ? 3")
        self.play(FadeIn(f, scale=1.2), b.apparaitre(0.6), run_time=0.6)
        x = b.x_trait(4)
        mil = DashedLine(P(x, 2.05), P(x, 0.35), color=JAUNE_TITRE, stroke_width=6)
        lab = self.inline("moitié de 8 :", 44)
        quatre = self.inline("4", 44, BLEU_CALCUL)
        self.col(VGroup(lab, quatre).arrange(RIGHT, buff=0.25), 1.9)
        self.au_nb("moitié de 8")
        self.play(FadeIn(lab, shift=RIGHT * 0.2), Create(mil), run_time=0.35)
        self.au_nb("c'est 4")
        self.play(FadeIn(quatre, scale=1.3), run_time=0.3)
        self.au_nb("3 est")
        self.calc([("3 <", WHITE), ("4", WHITE)], 1.0, 44)
        l1 = self.col(self.inline("moins de la moitié", 38, AMBRE), 0.1)
        self.au_mot("moins de la moitié")
        self.play(FadeIn(l1, shift=RIGHT * 0.15), run_time=0.35)
        b4 = barre(8, 4, -1.0)
        f4 = self.frac_a_gauche(b4, 4, 8)
        self.au_nb("Et 4")
        self.play(FadeIn(f4, scale=1.2), b4.apparaitre(0.6), run_time=0.6)
        self.au_mot("pile la moitié")
        mil2 = DashedLine(P(x, 0.0), P(x, -1.85), color=JAUNE_TITRE, stroke_width=6)
        self.play(Create(mil2), run_time=0.35)
        b2, anim = b4.regrouper(4, run_time=0.8)
        demi = self.col(self.inline("= 1 demi !", 44, VERT_OK), -1.0)
        self.au_nb("moitié : 1")
        self.play(anim, FadeIn(demi, scale=1.2))
        self.attendre_voix()

    # ── 08 : défi (ranger 2/6, 5/6, 1/6) ────────────────────────────────────
    YS = (1.7, 0.2, -1.3)

    def ecran_defi(self):
        self.ecran("08-defi", 0.5)
        self.au_mot("À toi de jouer")
        self.titre("À toi de jouer !", fs=50)
        for k, (n, mot) in enumerate(((2, "barres : 2"), (5, "sixièmes, 5"), (1, "et 1"))):
            b = barre(6, n, self.YS[k], x=-2.4, largeur=4.6)
            f = self.frac_a_gauche(b, n, 6, fs=38)
            self.au_nb(mot)
            self.play(FadeIn(f, scale=1.2), b.apparaitre(0.4), run_time=0.4)
        q = self.col(self.bloc(["Range-les, de la plus", "petite à la plus grande."], 34, ORANGE_RETENUE), 1.0)
        self.au_mot("Range-les")
        self.poser_lignes(q, "up", 0.3)
        self.pause_defi(y=-0.2)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.5)
        self.titre("Correction", fs=50)
        grp = {}
        for k, n in enumerate((2, 5, 1)):
            b = barre(6, n, self.YS[k], x=-2.4, largeur=4.6)
            f = self.frac_a_gauche(b, n, 6, fs=38)
            grp[n] = VGroup(f, b)
            self.add(grp[n])
        self.au_mot("on range les numérateurs")
        self.play(*[Indicate(g[0].num, color=AMBRE, scale_factor=1.5) for g in grp.values()], run_time=0.6)
        for n, y, mot in ((1, self.YS[0], "numérateurs, 1"), (2, self.YS[1], "puis 2"), (5, self.YS[2], "puis 5")):
            self.au_nb(mot)
            self.play(grp[n].animate.move_to(P(grp[n].get_x(), y)), run_time=0.45)
        e = expression((1, 6), "<", (2, 6), "<", (5, 6), fs=52)
        self.col(e, 1.0)
        self.au_nb("5. 1")
        self.play(FadeIn(e[:2], scale=1.2), run_time=0.3)
        self.au_nb("que 2")
        self.play(FadeIn(e[2:4], scale=1.2), run_time=0.3)
        self.au_nb("que 5")
        self.play(FadeIn(e[4:], scale=1.2), run_time=0.3)
        self.play(Create(self.encadrer(e, buff=0.15)), run_time=0.35)
        self.attendre_voix(marge=1.2)

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.5)
        fig = VGroup(VGroup(EcritureFraction(1, 4, fs=40), Barre(4, 1, largeur=2.6, hauteur=0.45, marge=0.12))
                     .arrange(RIGHT, buff=0.25),
                     VGroup(EcritureFraction(1, 8, fs=40), Barre(8, 1, largeur=2.6, hauteur=0.45, marge=0.12))
                     .arrange(RIGHT, buff=0.25)).arrange(DOWN, buff=0.35, aligned_edge=RIGHT)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("Même dénominateur :", "on compare les numérateurs."),
                                                         ("Même numérateur : plus il y a", "de parts, plus elles sont petites."),
                                                         ("Un grand nombre en bas,", "c'est une petite part !")], fs=38)
        self.au_mot("Même dénominateur")
        self.montrer_ligne(lignes[0])
        self.au_mot("Même numérateur")
        self.montrer_ligne(lignes[1])
        self.au_mot("Un grand nombre")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)


class FracComparerCM1(FracComparerBase):
    identite = "Maths CM1 — EleveAI"
    ceinture = "verte"


class FracComparerCM2(FracComparerBase):
    identite = "Maths CM2 — EleveAI"
    ceinture = "jaune"
