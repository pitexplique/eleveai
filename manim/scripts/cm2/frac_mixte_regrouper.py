# frac_mixte_regrouper.py
# EleveAI — Maths CM2 — série « Fractions », épisode 11 : REGROUPER UN ENTIER ET
# UNE FRACTION (micro du coach : fraction_mixte_regrouper, CM2 seul), AVEC VOIX.
# Paysage 16:9. CEINTURE VERTE (la notion de CM2 complète : l'entier écrit en
# parts, ajouter les numérateurs, pourquoi le dénominateur ne change pas, les
# cinquièmes, vers la virgule, défi corrigé).
# Short jumeau : frac_mixte_regrouper_short.py (les cartons de jus, blanche).
#
# Décor et métier : la CANTINE ; Malik, DIÉTÉTICIEN : oranges coupées en 4
# quartiers ; 3 + 1/4 = 12/4 + 1/4 = 13/4 ; 2 + 3/5 = 13/5 (l'item du coach :
# « on compte tout en cinquièmes ») ; 1 + 1/4 = 1,25 = 5/4 (PRÉPARE fraction →
# décimal) ; défi : 4 + 3/4 = 19/4. Aucune donnée du monde réel citée.
# Centres : corps-sante, cuisine.
# Vérifié (Python, Fraction) : 3 × 4 = 12, 12 + 1 = 13 ; 2 × 4 + 3 = 11 ;
# 2 × 5 + 3 = 13 ; 1 + 1/4 = 5/4 = 1,25 ; 4 × 4 + 3 = 19.
#
# Micro → écrans (banque cm2/maths/fractions-superieures.bank.ts) : l'entier en
# parts (02, fixed_1 / tpl_2 : 3 = 12/4), regrouper (03, fixed_2 / tpl_1 /
# tpl_3), QUESTION 1 (leurres de tpl_1 : 5/4 = entier + numérateur, 6/4 =
# entier × numérateur), pourquoi le dénominateur reste (05, fixed_3), les
# cinquièmes (06, fixed_3 : 2 + 3/5 = 13/5), QUESTION 2 (tpl_4 « en décimal » :
# leurres 5,4 = la barre lue comme une virgule, 1,4), défi (tpl_3).
# Écrans : 00 garde · 01 Malik · 02 l'entier en quarts · 03 regrouper ·
# 04 QUESTION 1 · 05 pourquoi · 06 les cinquièmes · 07 QUESTION 2 · 08 défi ·
# 08b correction · 09 ce que tu as appris · 10 fin.
#
# Bases : cm2/frac_cmk_commun.py (PaysageCM2) ← cm1/frac_cm_commun.py (NON modifié).
# Voix : manim/voix/cm2-frac-mixte-regrouper.json (débit −10) ; marques : frac_mixte_regrouper_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm2/frac_mixte_regrouper.py FracMixteRegrouperCM2
# python -m manim render -qh --disable_caching manim/scripts/cm2/frac_mixte_regrouper.py FracMixteRegrouperCM2 -o eleveai-maths-cm2-frac-mixte-regrouper --media_dir manim/scripts/cm2/media-frac-mixte-regrouper
# Sortie : manim/sorties/cm2/maths/fractions/11-mixte-regrouper/eleveai-maths-cm2-frac-mixte-regrouper.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_cmk_commun import *  # noqa: E402,F403

ORANGE = ORANGE_PART


def oranges(ks, y, rayon=0.6, x=-3.3, buff=0.12):
    """Une rangée d'oranges (le disque du coach en 4 quartiers) : ks[i] quartiers pris."""
    return VGroup(*[Disque(4, k, rayon=rayon, couleur=ORANGE, marge=0.1) for k in ks]).arrange(
        RIGHT, buff=buff).move_to(P(x, y))


def dieteticien(s=0.9):
    return metier("#5c3a21", "#16a34a", "#111827", s=s, accessoires=(blouse,))


def barres5(ks, x=-3.3, y0=1.6, pas=1.1, largeur=4.6):
    return VGroup(*[Barre(5, k, largeur=largeur, hauteur=0.55, couleur=VIOLET_PART, marge=0.12,
                          centre=P(x, y0 - i * pas)) for i, k in enumerate(ks)])


class FracMixteRegrouperBase(PaysageCM2):
    nom_voix = "cm2-frac-mixte-regrouper"
    fichier_marques = "frac_mixte_regrouper_marques.json"

    def ecrans(self):
        return [self.page_de_garde, self.ecran_situation, self.ecran_entier, self.ecran_methode,
                self.ecran_question1, self.ecran_pourquoi, self.ecran_cinquiemes, self.ecran_question2,
                self.ecran_defi, self.ecran_correction, self.ecran_finale]

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Une seule fraction", self.identite, self.ceinture, y_ech=-2.7)
        self.au_mot("Regrouper")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        e = frac_ligne(["3", "+", (1, 4), "=", ("?", 4)], fs=96).move_to(P(-0.6, 0.3))
        au_fil(self, [("3 et", [e[0]], []), ("1 quart", [e[1], e[2]], []), ("combien", [e[3], e[4]], [])])
        self.insister(e[4], 1.2, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Malik, diététicien ─────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        mal = dieteticien(0.9).move_to(P(-5.6, -1.9))
        nom, met = nom_metier(self, mal, "Malik", ["diététicien", "à la cantine"])
        au_fil(self, [("Voici Malik", [mal, nom], []), ("diététicien", [met], [])])
        o1 = Disque(4, 0, rayon=1.0, couleur=ORANGE, marge=0.2, centre=P(-3.3, 1.5))
        l1 = ligne_calc(self, [("chaque quartier", WHITE), ("= 1 quart", ORANGE)], 2.3, fs=42)
        au_fil(self, [("les oranges en 4", [], [o1.apparaitre(0.8)]),
                      ("chaque quartier", [l1[0]], [o1.colorier([0], run_time=0.4)]),
                      ("1 quart d'orange", [l1[1]], [])])
        row = oranges([4, 4, 4, 1], 1.5)
        e = frac_ligne(["3", "+", (1, 4, ORANGE)], fs=64)
        self.col(e, 0.9)
        au_fil(self, [("plateau : 3", [e[0]], [FadeOut(o1), FadeIn(VGroup(*row[:3]), lag_ratio=0.2)]),
                      ("et 1 quart", [e[1], e[2]], [FadeIn(row[3])])])
        q = self.col(self.bloc(["Combien de quarts", "en tout ?"], 40, ORANGE_RETENUE), -0.6)
        self.au_mot("Combien")
        self.poser_lignes(q, "up", 0.3)
        self.attendre_voix()

    # ── 02 : l'entier en quarts (3 = 12/4) ──────────────────────────────────
    def ecran_entier(self):
        self.ecran("02-entier")
        row = oranges([4, 4, 4, 1], 1.5)
        self.add(row)
        e1 = frac_ligne(["1 orange", "=", (4, 4)], fs=56)
        self.col(e1, 2.2)
        au_fil(self, [("1 orange", [e1[0]], [Indicate(row[0], color=AMBRE, scale_factor=1.08)]),
                      ("c'est 4", [e1[1], e1[2]], [])])
        labs = VGroup(*[pas_audit(EcritureFraction(4, 4, fs=36)).next_to(row[i], DOWN, buff=0.2) for i in range(3)])
        c = ligne_calc(self, [("3 × 4", WHITE), ("= 12", VERT_OK)], 0.9, fs=48)
        au_fil(self, [("Alors 3", [], [LaggedStart(*[FadeIn(l, scale=1.2) for l in labs], lag_ratio=0.3,
                                                   run_time=0.8)]),
                      ("3 fois 4", [c[0]], []), ("4 : 12", [c[1]], [])])
        e2 = frac_ligne(["3", "=", (12, 4, VERT_OK)], fs=64)
        self.col(e2, -0.6)
        acc = Brace(VGroup(*row[:3]), DOWN, color=VERT_OK).next_to(labs, DOWN, buff=0.15)
        au_fil(self, [("quarts. 3", [e2[0]], []), ("égale 12", [e2[1], e2[2]], [GrowFromCenter(acc)])])
        self.play(Create(self.encadrer(e2, buff=0.15)), run_time=0.35)
        self.attendre_voix()

    # ── 03 : regrouper (3 + 1/4 = 13/4) ─────────────────────────────────────
    def ecran_methode(self):
        self.ecran("03-methode")
        row = oranges([4, 4, 4, 1], 1.6)
        self.add(row)
        e1 = frac_ligne([(12, 4), "+", (1, 4, ORANGE), "=", (13, 4, VERT_OK)], fs=60)
        self.col(e1, 2.0)
        au_fil(self, [("reste", [], [Indicate(row[3].parts[0], color=AMBRE, scale_factor=1.3)]),
                      ("12 quarts", [e1[0]], [Indicate(VGroup(*row[:3]), color=AMBRE, scale_factor=1.04)]),
                      ("plus 1", [e1[1], e1[2]], []), (", 13", [e1[3], e1[4]], [])])
        e2 = frac_ligne(["3", "+", (1, 4, ORANGE), "=", (13, 4, VERT_OK)], fs=64)
        self.col(e2, 0.1)
        au_fil(self, [("Donc 3", [e2[0]], []), (("plus 1", 2), [e2[1], e2[2]], []), ("égale 13", [e2[3], e2[4]], [])])
        self.play(Create(self.encadrer(e2, buff=0.15)), run_time=0.35)
        d = Droite(0, 4, 16, etiquettes={0: "0", 1: "1", 2: "2", 3: "3", 4: "4"}, longueur=4.8, fs=30,
                   centre=P(-3.3, -1.5))
        pt = pas_audit(d.point(3.25, (13, 4), fs=30, haut=0.6))
        self.play(FadeIn(d), run_time=0.4)
        self.play(FadeIn(pt, shift=DOWN * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (2 + 3/4) ───────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        row = oranges([4, 4, 3], 0.6, rayon=0.75)
        self.add(row)

        def apres(sc):
            sc.rep(0, avec=[Indicate(VGroup(*row[:2]), color=VERT_OK, scale_factor=1.05)])
            sc.rep(1, avec=[Indicate(row[2], color=AMBRE, scale_factor=1.08)])
            sc.rep_fin()

        self.question_pause("04-question", "04b-reponse", ["2 + 3/4, c'est…"],
                            [self.inline("5/4"), self.inline("11/4"), self.inline("6/4")], 1,
                            ["2 oranges = 8 quarts.", "8 + 3 = 11 quarts.", "Le piège : ajouter 2 et 3."],
                            mot_q="2 plus 3", autres_r=apres)

    # ── 05 : pourquoi le dénominateur ne change pas ─────────────────────────
    def ecran_pourquoi(self):
        self.ecran("05-pourquoi")
        self.au_mot("Pourquoi")
        tit = self.t("Le dénominateur ne change pas", 46, JAUNE_TITRE).move_to(P(0, 3.05))
        self.play(Write(tit), run_time=0.5)
        row = oranges([4, 4, 4, 1], 1.3)
        self.play(FadeIn(row), run_time=0.4)
        n1 = self.t("On compte des quarts,", 40)
        n2 = self.t("comme des oranges.", 40)
        bl = VGroup(n1, n2).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        self.col(bl, 1.5)
        self.poser_lignes(bl, "fade", 0.3)
        lg = ligne_calc(self, [("12 quarts", WHITE), ("+ 1 quart", WHITE), ("= 13 quarts", VERT_OK)], 0.3, fs=40)
        lg[2].next_to(lg[0], DOWN, buff=0.2, aligned_edge=LEFT)
        lg[1].next_to(lg[0], RIGHT, buff=0.22)
        e = frac_ligne([(12, 4), "+", (1, 4), "=", (13, 4)], fs=60)
        for i in (0, 2, 4):
            e[i].den.set_color(AMBRE)
        self.col(e, -1.3)
        au_fil(self, [("12 quarts", [lg[0], e[0]], []), ("plus 1", [lg[1], e[1], e[2]], []),
                      ("c'est 13", [lg[2], e[3], e[4]], [])])
        av = self.bloc(["des quarts avant,", "des quarts après"], 34, AMBRE).next_to(row, DOWN, buff=0.4)
        au_fil(self, [("des quarts avant", [av], [])])
        self.play(*[Indicate(e[i].den, color=AMBRE, scale_factor=1.5) for i in (0, 2, 4)], run_time=0.7)
        self.attendre_voix()

    # ── 06 : les cinquièmes (2 + 3/5 = 13/5) ────────────────────────────────
    def ecran_cinquiemes(self):
        self.ecran("06-cinquiemes")
        self.au_mot("Avec des cinquièmes")
        self.titre("Avec des cinquièmes")
        bs = barres5([5, 5, 3])
        e0 = frac_ligne(["2", "+", (3, 5, VIOLET_PART)], fs=56)
        self.col(e0, 1.9)
        au_fil(self, [("cinquièmes : 2", [e0[0]], [bs[0].apparaitre(0.5), bs[1].apparaitre(0.5)]),
                      ("plus 3", [e0[1], e0[2]], [bs[2].apparaitre(0.5)])])
        c1 = ligne_calc(self, [("2 × 5", WHITE), ("= 10", VERT_OK)], 0.7, fs=46)
        au_fil(self, [("2 fois 5", [c1[0]], [Indicate(VGroup(bs[0], bs[1]), color=VERT_OK, scale_factor=1.03)]),
                      ("5 : 10", [c1[1]], [])])
        c2 = ligne_calc(self, [("10 +", WHITE), ("3", WHITE), ("= 13", VERT_OK)], -0.35, fs=46)
        au_fil(self, [("10 plus", [c2[0]], []), ("10 plus 3", [c2[1]], []), ("3 : 13", [c2[2]], [])])
        e = frac_ligne(["2", "+", (3, 5, VIOLET_PART), "=", (13, 5, VERT_OK)], fs=60)
        self.col(e, -1.7)
        au_fil(self, [(("cinquièmes. 2", 2), [e[0]], []), (("plus 3", 3), [e[1], e[2]], []), ("égale 13", [e[3], e[4]], [])])
        self.play(Create(self.encadrer(e, buff=0.15)), run_time=0.35)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (1 + 1/4 en décimal) ────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        row = oranges([4, 1], 1.2, rayon=0.9, buff=0.3)
        g = grille100(25, cote=0.2, centre=P(-3.3, -1.5))

        def avant(sc):
            sc.au_nb("! 1")
            sc.play(FadeIn(row[0]), run_time=0.3)
            sc.au_nb("plus 1")
            sc.play(FadeIn(row[1]), run_time=0.3)

        def apres(sc):
            sc.rep(0, avec=[FadeIn(g)])
            sc.rep(1)
            sc.rep_fin()

        self.question_pause("07-question", "07b-reponse", ["1 + 1/4, en", "nombre décimal ?"],
                            [self.inline("1,4"), self.inline("1,25"), self.inline("5,4")], 1,
                            ["1/4 = 0,25", "1 + 0,25 = 1,25", "C'est aussi 5/4 !"],
                            avant_q=avant, autres_r=apres)

    # ── 08 : défi (4 + 3/4) ─────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.5)
        self.au_mot("À toi de jouer")
        self.titre("À toi de jouer !", fs=50)
        row = oranges([4, 4, 4, 4, 3], 0.6, rayon=0.48, buff=0.1, x=-3.35)
        e = frac_ligne(["4", "+", (3, 4, ORANGE)], fs=72)
        self.col(e, 1.5)
        au_fil(self, [("prépare 4", [e[0]], [FadeIn(VGroup(*row[:4]), lag_ratio=0.2)]),
                      ("et 3 quarts", [e[1], e[2]], [FadeIn(row[4])])])
        q = self.col(self.bloc(["Écris-le avec", "une seule fraction."], 38, ORANGE_RETENUE), -0.2)
        self.au_mot("Écris-le")
        self.poser_lignes(q, "up", 0.3)
        self.pause_defi(y=-1.7)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.5)
        self.titre("Correction", fs=50)
        row = oranges([4, 4, 4, 4, 3], 1.4, rayon=0.48, buff=0.1, x=-3.35)
        self.add(row)
        c1 = ligne_calc(self, [("4 × 4", WHITE), ("= 16", VERT_OK)], 1.8, fs=48)
        acc = Brace(VGroup(*row[:4]), DOWN, color=VERT_OK)
        au_fil(self, [("4 oranges", [], [GrowFromCenter(acc)]), ("4 fois 4", [c1[0]], []), ("4 : 16", [c1[1]], [])])
        c2 = ligne_calc(self, [("16 +", WHITE), ("3", WHITE), ("= 19", VERT_OK)], 0.6, fs=48)
        au_fil(self, [("16 plus", [c2[0]], []), ("16 plus 3", [c2[1]], [Indicate(row[4], color=AMBRE, scale_factor=1.1)]),
                      ("3 : 19", [c2[2]], [])])
        e = frac_ligne(["4", "+", (3, 4, ORANGE), "=", (19, 4, VERT_OK)], fs=64)
        self.col(e, -0.9)
        au_fil(self, [("quarts. 4", [e[0]], []), (("plus 3", 2), [e[1], e[2]], []), ("égale 19", [e[3], e[4]], [])])
        self.play(Create(self.encadrer(e, buff=0.15)), run_time=0.35)
        self.attendre_voix(marge=1.2)

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.5)
        row = oranges([4, 4, 4, 1], 0, rayon=0.45, buff=0.08, x=0)
        e = frac_ligne(["3", "+", (1, 4), "=", (13, 4)], fs=48)
        fig = pas_audit(VGroup(row, e).arrange(DOWN, buff=0.5))
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("On écrit les entiers en parts :", "entier × dénominateur."),
                                                         ("On ajoute les numérateurs.",),
                                                         ("Le dénominateur", "ne change pas.")], fs=36)
        for mot, lg in zip(["On écrit", "On ajoute", "Le dénominateur"], lignes):
            self.au_mot(mot)
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.0)


class FracMixteRegrouperCM2(FracMixteRegrouperBase):
    identite = "Maths CM2 — EleveAI"
    ceinture = "verte"
