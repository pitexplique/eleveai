# frac_defi.py
# EleveAI — Maths CM1 ET CM2 — série « Fractions », épisode 07 : DÉFI FRACTIONS
# (micro du coach : fraction_defi, dans les DEUX classes), AVEC VOIX. Paysage
# 16:9. Trois énigmes qui croisent les épisodes 01 à 06 : ajouter des dixièmes
# et ce qui reste (tpl_181), la virgule (tpl_183), comparer en écrivant les deux
# fractions avec le même dénominateur — 2/5 = 4/10, PRÉPARE la simplification
# (tpl_184) —, plus de la moitié, et la devinette sur la droite (tpl_182).
# CEINTURES : CM1 VERTE (le défi du niveau, complet et corrigé) ; CM2 JAUNE
# (rappel de CM1).
# Short jumeau : frac_defi_short.py (la course d'escargots, blanche).
#
# Décor et métier : le TRAM ; Rayan, CONDUCTEUR DE TRAM, et sa collègue Léna :
# trajet en 10 parts ; 3/10 + 4/10 = 7/10 = 0,7, reste 3/10 ; Léna 2/5 = 4/10 ;
# la moitié = 5/10. Défi : entre 1/4 et 3/4 → 2/4 = 1/2. Aucune donnée du monde
# réel citée. Centres : transports.
# Vérifié (Python) : 3/10 + 4/10 = 7/10 ; 10 − 7 = 3 ; 2/5 = 4/10 ; 7/10 > 1/2 >
# 4/10 ; (1/4 + 3/4) ÷ 2 = 2/4 = 1/2.
#
# Écrans : 00 garde · 01 Rayan · 02 énigme 1 · 02b solution · 03 QUESTION 1 ·
# 04 énigme 2 · 04b solution · 05 QUESTION 2 · 06 défi (énigme 3) ·
# 06b correction · 07 ce que tu as appris · 08 fin.
#
# Bases : frac_cm_commun.py (PaysageCM, NON modifié) ; canvas_fractions.py ;
# décors : frac_cmj_commun.py (tram, conducteur, collegue).
# Voix : manim/voix/cm-frac-defi.json (débit −10) ; marques : frac_defi_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/frac_defi.py FracDefiCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/frac_defi.py FracDefiCM1 -o eleveai-maths-cm1-frac-defi --media_dir manim/scripts/cm1/media-frac-defi
# CM2 : GARDE_SEULE=1 … FracDefiCM2 -o garde-cm2-frac-defi --media_dir manim/scripts/cm1/media-frac-defi-cm2
#       puis python manim/scripts/cm1/frac_cm_commun.py coller <cm1.mp4> <garde-cm2.mp4> <cm2.mp4>
# Sorties : manim/sorties/{cm1,cm2}/maths/fractions/07-defi/eleveai-maths-{cm1,cm2}-frac-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_cm_commun import *  # noqa: E402,F403
from frac_cmj_commun import *  # noqa: E402,F403

XF = -3.3


class FracDefiBase(PaysageCM):
    nom_voix = "cm-frac-defi"
    fichier_marques = "frac_defi_marques.json"
    cle_abonne = "08-abonne"

    def ecrans(self):
        return [self.page_de_garde, self.ecran_situation, self.ecran_enigme1, self.ecran_question1,
                self.ecran_enigme2, self.ecran_question2, self.ecran_defi, self.ecran_correction, self.ecran_finale]

    def trajet(self, k=0, y=0.6, colories=None):
        return Barre(10, k, largeur=5.6, hauteur=0.7, colories=colories, centre=P(XF, y))

    def tram_sur(self, b, j, s=0.55):
        t = tram(s)
        return t.move_to(P(b.x_trait(j), b.contour.get_top()[1] + 0.45))

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défi fractions !", self.identite, self.ceinture, y_ech=-2.7)
        self.au_mot("Défi fractions")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        cartes = VGroup(*[VGroup(RoundedRectangle(width=1.8, height=2.0, corner_radius=0.2, fill_color="#1e293b",
                                                  fill_opacity=1, stroke_color=c, stroke_width=5),
                                 Text("?", font_size=90, color=WHITE)) for c in (BLEU_PART, VERT_OK, AMBRE)])
        cartes.arrange(RIGHT, buff=0.5).move_to(P(-0.6, 0.35))
        self.au_mot("Trois énigmes")
        self.play(LaggedStart(*[FadeIn(c, shift=UP * 0.3) for c in cartes], lag_ratio=0.25), run_time=0.9)
        self.au_mot("champion")
        self.play(*[Indicate(c, color=c[0].get_stroke_color(), scale_factor=1.1) for c in cartes], run_time=0.6)
        self.attendre_voix(marge=0.8)

    # ── 01 : Rayan, conducteur de tram ──────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        ray = conducteur(1.0).move_to(P(-5.3, -1.6))
        nom = self.t("Rayan", 40, BLEU_CALCUL).next_to(ray, RIGHT, buff=0.35).shift(UP * 0.6)
        met = self.t("conducteur de tram", 30, BLEU_CALCUL).next_to(nom, DOWN, buff=0.12).align_to(nom, LEFT)
        au_fil(self, [("Voici Rayan", [ray, nom], []), ("conducteur de tram", [met], [])])
        b = self.trajet(0, 1.4)
        t = self.tram_sur(b, 0)
        l1 = self.col(self.t("10 parts égales", 42), 1.4)
        au_fil(self, [("Son trajet", [t], [FadeIn(b.carte), FadeIn(b.contour), FadeIn(b.parts)]),
                      ("en 10", [l1], [LaggedStart(*[Create(x) for x in b.traits], lag_ratio=0.15)])], run_time=0.7)
        self.play(t.animate.move_to(self.tram_sur(b, 10).get_center()), run_time=1.6, rate_func=smooth)
        self.attendre_voix(marge=0.4)

    # ── 02 : énigme 1 (3/10 + 4/10) et sa solution ──────────────────────────
    def ecran_enigme1(self):
        self.ecran("02-enigme1")
        self.au_mot("Énigme 1")
        self.titre("Énigme 1", BLEU_PART)
        b = self.trajet(0, 0.9)
        t = self.tram_sur(b, 0)
        self.add(b, t)
        l1 = self.col(self.inline("3 dixièmes", 40, BLEU_PART), 1.7)
        au_fil(self, [("roule 3", [l1], [b.colorier(range(3), lag=0.12), t.animate.move_to(
            self.tram_sur(b, 3).get_center())])], run_time=0.8)
        l2 = self.col(self.inline("+ 4 dixièmes", 40, VERT_OK), 0.85)
        au_fil(self, [("encore 4", [l2], [b.colorier(range(3, 7), couleur=VERT_PART, lag=0.12),
                                          t.animate.move_to(self.tram_sur(b, 7).get_center())])], run_time=0.9)
        q = self.col(self.bloc(["Quelle fraction", "du trajet ?"], 40, ORANGE_RETENUE), -0.4)
        self.au_mot("Quelle fraction")
        self.poser_lignes(q, "up", 0.3)
        self.attendre_voix(marge=0.3)
        # la solution, sur le même écran
        self.dire("02b-solution1")
        self.play(FadeOut(q), run_time=0.3)
        c = ligne_calc(self, [("3", BLEU_PART), ("+", WHITE), ("4", VERT_OK), ("=", WHITE), ("7", AMBRE),
                              ("parts", WHITE)], -0.35, fs=46)
        au_fil(self, [("parts : 3", [c[0]], []), ("3 plus 4", [c[1], c[2]], []), ("égale 7", [c[3], c[4], c[5]],
                                                                                   [])])
        f7 = EcritureFraction(7, 10, fs=62, couleur=AMBRE)
        r7 = VGroup(self.inline("fait :", 38), f7).arrange(RIGHT, buff=0.25)
        r7[0].set_y(f7.trait.get_y())
        self.col(r7, -1.8)
        au_fil(self, [("fait 7 dixièmes", [r7], [])])
        reste = Brace(VGroup(*b.parts[7:]), DOWN, color=AMBRE)
        reste.shift(UP * (b.carte.get_bottom()[1] - 0.12 - reste.get_top()[1]))  # sous la carte, jamais collée
        f3 = EcritureFraction(3, 10, fs=44).next_to(reste, DOWN, buff=0.15)
        rt = self.inline("reste", 34).next_to(f3, LEFT, buff=0.25)
        au_fil(self, [("reste 3", [f3, rt], [GrowFromCenter(reste)])])
        self.attendre_voix()

    # ── 03 : QUESTION 1 (7 dixièmes avec une virgule) ───────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        b = self.trajet(7, 0.6)
        self.add(b, self.tram_sur(b, 7))
        self.question_pause("03-question", "03b-reponse", ["7 dixièmes,", "avec une virgule ?"],
                            [self.inline("7,10", 40), self.inline("0,7", 40), self.inline("0,07", 40)], 1,
                            ["Le 7 :", "juste après la virgule"])

    # ── 04 : énigme 2 (2/5 contre 7/10) et sa solution ──────────────────────
    def ecran_enigme2(self):
        self.ecran("04-enigme2")
        self.au_mot("Énigme 2")
        self.titre("Énigme 2", VERT_OK)
        br = self.trajet(7, 1.5)
        lr = self.inline("Rayan", 30, BLEU_CALCUL).next_to(br, UP, buff=0.12).align_to(br, LEFT)
        bl = Barre(5, 0, largeur=5.6, hauteur=0.7, couleur=VERT_PART, centre=P(XF, -0.6))
        ll = self.inline("Léna", 30, VERT_OK).next_to(bl, UP, buff=0.12).align_to(bl, LEFT)
        self.add(br, lr)
        lena = collegue(0.55).move_to(P(-5.9, -2.45))
        f25 = EcritureFraction(2, 5, fs=70, couleur=VERT_OK)
        self.col(f25, 1.6)
        au_fil(self, [("Léna", [ll, lena], [FadeIn(bl)]), ("fait 2", [f25], [bl.colorier(range(2), lag=0.2)])],
                  run_time=0.5)
        q = self.col(self.t("Qui a fait le plus ?", 40, ORANGE_RETENUE), 0.2)
        self.au_mot("Qui a fait le plus")
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.4)
        self.attendre_voix(marge=0.3)
        self.dire("04b-solution2")
        self.play(FadeOut(q), run_time=0.3)
        l1 = self.col(self.t("Tout en dixièmes !", 38, JAUNE_TITRE), 0.2)
        au_fil(self, [("On écrit les deux en dixièmes", [l1], [])])
        f410 = EcritureFraction(4, 10, fs=70, couleur=VERT_OK)
        eg = egalite(f25.copy(), f410)
        self.col(eg, 1.6)
        self.au_mot("On coupe chaque cinquième")
        b10, anim = bl.repartager(2, run_time=1.0)
        self.play(anim, FadeOut(f25), FadeIn(eg[0]))
        au_fil(self, [("égale 4", [eg[1], f410], [])])
        comp = VGroup(EcritureFraction(7, 10, fs=64, couleur=BLEU_PART), self.inline(">", 60),
                      EcritureFraction(4, 10, fs=64, couleur=VERT_OK)).arrange(RIGHT, buff=0.35)
        comp[1].set_y(comp[0].trait.get_y())
        self.col(comp, -1.05)
        au_fil(self, [("7 dixièmes, c'est plus", [comp[0]], []), (("plus que 4", 1), [comp[1], comp[2]], [])])
        pt = br.fin_coloriee(vers=-2.3)
        rg = self.col(self.t("Rayan a fait le plus !", 36, BLEU_PART), -2.4)
        au_fil(self, [("Rayan a fait le plus", [rg], [Create(pt)])])
        self.attendre_voix()

    # ── 05 : QUESTION 2 (plus de la moitié ?) ───────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        br = self.trajet(7, 1.2)
        bl = Barre(10, 4, largeur=5.6, hauteur=0.7, couleur=VERT_PART, centre=P(XF, -0.9))
        lr = self.inline("Rayan", 30, BLEU_CALCUL).next_to(br, UP, buff=0.12).align_to(br, LEFT)
        ll = self.inline("Léna", 30, VERT_OK).next_to(bl, UP, buff=0.12).align_to(bl, LEFT)
        self.add(br, bl, lr, ll)
        mil = DashedLine(P(br.x_trait(5), 2.1), P(br.x_trait(5), -1.65), color=AMBRE, stroke_width=6, dash_length=0.12)
        f5 = EcritureFraction(5, 10, fs=40, couleur=AMBRE).next_to(mil, DOWN, buff=0.1)

        def apres(sc):
            sc.au_nb("c'est 5")
            sc.rep(0, avec=[Create(mil), FadeIn(f5, scale=1.2)])
            sc.rep_fin()

        self.question_pause("05-question", "05b-reponse", ["Qui a fait plus", "de la moitié du trajet ?"],
                            [self.inline("Rayan", 38), self.inline("Léna", 38), self.inline("les deux", 38)], 0,
                            ["5 dixièmes : la moitié.", "Rayan : 7 dixièmes, plus.", "Léna : 4 dixièmes, moins."],
                            autres_r=apres)

    # ── 06 : défi (énigme 3, la devinette sur la droite) ────────────────────
    def droite4(self):
        return Droite(0, 1, 4, etiquettes={0: "0", 1: "1"}, longueur=5.0, centre=P(-3.2, 0.2))

    def ecran_defi(self):
        self.ecran("06-defi", 0.5)
        self.au_mot("À toi de jouer")
        self.titre("À toi de jouer !", fs=50)
        d = self.droite4()
        self.add(d)
        l1 = self.col(self.t("Énigme 3", 40, AMBRE), 2.0)
        au_fil(self, [("Énigme 3", [l1], [])])
        l2 = self.col(self.t("Je suis en quarts.", 38), 1.15)
        au_fil(self, [("en quarts", [l2], [])])
        p1 = d.point(0.25, (1, 4))
        p3 = d.point(0.75, (3, 4))
        au_fil(self, [("entre 1 quart", [p1], []), ("et 3 quarts", [p3], [])])
        q = self.col(self.t("Qui suis-je ?", 42, ORANGE_RETENUE), 0.1)
        au_fil(self, [("Qui suis-je", [q], [])])
        self.pause_defi(y=-1.3)

    def ecran_correction(self):
        self.ecran("06b-correction", 0.65)
        self.titre("Correction", fs=50)
        d = self.droite4()
        p1, p3 = d.point(0.25, (1, 4)), d.point(0.75, (3, 4))
        self.add(d, p1, p3)
        self.au_mot("On place 1 quart")
        self.play(Indicate(p1, color=AMBRE), Indicate(p3, color=AMBRE), run_time=0.6)
        p2 = d.point(0.5, (2, 4), couleur=VERT_OK)
        au_fil(self, [("entre les deux : 2", [p2], [])])
        eg = egalite(EcritureFraction(2, 4, fs=80, couleur=VERT_OK), EcritureFraction(1, 2, fs=80, couleur=VERT_OK))
        self.col(eg, 1.2)
        au_fil(self, [("Et 2 quarts", [eg[0]], []), ("égale 1 demi", [eg[1], eg[2]], [])])
        m = self.col(self.t("le milieu !", 44, VERT_OK), -0.6)
        au_fil(self, [("c'est le milieu", [m], [])])
        self.play(Create(self.encadrer(eg, buff=0.15)), run_time=0.4)
        self.attendre_voix(marge=1.6)

    # ── 07 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("07-finale", 0.65)
        b = Barre(10, 7, largeur=4.4, hauteur=0.6)
        self.add(b)
        lignes = self.finale_colonne(figure=b, textes=[("Ajouter des dixièmes :", "on compte les parts."),
                                                       ("Comparer : même dénominateur", "pour les deux fractions."),
                                                       ("7 dixièmes s'écrit 0,7.",)], fs=36)
        self.au_mot("Pour ajouter")
        self.montrer_ligne(lignes[0])
        self.au_mot("Pour comparer")
        self.montrer_ligne(lignes[1])
        self.au_mot("Et 7 dixièmes")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)


class FracDefiCM1(FracDefiBase):
    identite = "Maths CM1 — EleveAI"
    ceinture = "verte"


class FracDefiCM2(FracDefiBase):
    identite = "Maths CM2 — EleveAI"
    ceinture = "jaune"
