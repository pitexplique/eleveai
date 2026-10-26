# frac_superieure_1.py
# EleveAI — Maths CM1 — série « Fractions », épisode 09 : UNE FRACTION PLUS
# GRANDE QUE 1 (micro du coach : fraction_superieure_1, CM1 seul), AVEC VOIX.
# Paysage 16:9. CEINTURE VERTE (la notion de CM1 complète : compter les quarts
# au-delà d'une unité, d/d = 1, numérateur > dénominateur, la droite de 0 à 2,
# combien d'unités entières, défi corrigé).
# Short jumeau : frac_superieure_1_short.py (les cœurs de vie, blanche).
#
# Décor et métier : le STADE ; Inès, ENTRAÎNEUSE D'ATHLÉTISME, et Noé : 1 tour
# = 4 quarts ; 5/4 = 1 tour et 1 quart ; 3/4 < 1, 4/4 = 1, 5/4 > 1, 8/4 = 2 ;
# 9/4 = 2 tours et 1 quart ; défi : 7/4 < 8/4 = 2 → 1 tour et 3 quarts. Aucune
# donnée du monde réel citée (pas de longueur de piste). Centres : sport.
# Vérifié (Python) : 5/4 = 1 + 1/4 ; 7/6 > 1 ; 5/5 = 1 ; 3/4 < 1 ; 8/4 = 2 ;
# 9/4 = 2 + 1/4 ; 7/4 = 1 + 3/4 < 2.
#
# Micro → écrans (banque cm1/maths/fractions-gabarits-b.ts tpl_131-136) :
# plus ou moins que 1 (03 + QUESTION 1, tpl_131 / tpl_132 : leurres 3/4, 5/5 =
# 1 « tout juste »), décomposer d/d + reste (02-03, tpl_133), la droite (05,
# tpl_134), les unités entières en parts (05, tpl_135), encadrer / combien de
# tours (QUESTION 2 + défi, tpl_136 : leurres 9 = le numérateur, 4 = le
# dénominateur).
# Écrans : 00 garde · 01 Inès et Noé · 02 compter · 03 plus que 1 · 04 QUESTION 1 ·
# 05 la droite · 06 QUESTION 2 · 07 défi · 07b correction · 08 ce que tu as
# appris · 09 fin.
#
# Bases : frac_cm_commun.py (PaysageCM, NON modifié) ; canvas_fractions.py
# (Droite) ; décors : frac_cmj_commun.py (piste, entraineuse, coureur).
# Voix : manim/voix/cm-frac-superieure-1.json (débit −10) ; marques : frac_superieure_1_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/frac_superieure_1.py FracSuperieure1CM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/frac_superieure_1.py FracSuperieure1CM1 -o eleveai-maths-cm1-frac-superieure-1 --media_dir manim/scripts/cm1/media-frac-superieure-1
# Sortie : manim/sorties/cm1/maths/fractions/09-superieure-1/eleveai-maths-cm1-frac-superieure-1.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_cm_commun import *  # noqa: E402,F403
from frac_cmj_commun import *  # noqa: E402,F403

XF = -3.3
XR1, XR2, XR3 = -5.0, -2.75, -0.5      # les tours de piste
YR = 0.7


class FracSuperieure1Base(PaysageCM):
    nom_voix = "cm-frac-superieure-1"
    fichier_marques = "frac_superieure_1_marques.json"
    cle_abonne = "09-abonne"

    def ecrans(self):
        return [self.page_de_garde, self.ecran_situation, self.ecran_compter, self.ecran_question1,
                self.ecran_droite, self.ecran_question2, self.ecran_defi, self.ecran_correction, self.ecran_finale]

    def tours(self, ks, y=YR, r=0.95, xs=(XR1, XR2, XR3)):
        return [piste(k, r, P(x, y)) for k, x in zip(ks, xs)]

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Une fraction plus grande que 1", self.identite, self.ceinture, y_ech=-2.7)
        pas_audit(titre)
        self.au_mot("Une fraction")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        f = EcritureFraction(5, 4, fs=110).move_to(P(-2.2, 0.35))
        q = self.t("possible ?", 60, AMBRE).next_to(f, RIGHT, buff=0.6)
        au_fil(self, [("5 quarts", [f], []), ("possible", [q], [])])
        self.insister(q, 1.15, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Inès et Noé ────────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        ines = entraineuse(1.0).move_to(P(-5.4, -1.6))
        nom = self.t("Inès", 40, BLEU_CALCUL).next_to(ines, RIGHT, buff=0.35).shift(UP * 0.6)
        met = self.t("entraîneuse d'athlétisme", 28, BLEU_CALCUL).next_to(nom, DOWN, buff=0.12).align_to(nom, LEFT)
        au_fil(self, [("Voici Inès", [ines, nom], []), ("entraîneuse", [met], [])])
        t1 = piste(0, 1.1, P(-2.6, 1.3))
        l1 = ligne_calc(self, [("1 tour", WHITE), ("= 4 quarts", WHITE)], 2.3, fs=42)
        au_fil(self, [("1 tour", [t1, l1[0]], []), ("en 4", [l1[1]], [])], run_time=0.5)
        noe = coureur(0.42).next_to(t1, LEFT, buff=0.25).shift(UP * 0.4)
        f = EcritureFraction(5, 4, fs=80)
        l2 = VGroup(self.inline("Noé :", 40, BLEU_PART), f).arrange(RIGHT, buff=0.3)
        l2[0].set_y(f.trait.get_y())
        self.col(l2, 0.6)
        au_fil(self, [("Son élève, Noé", [noe, l2[0]], []), ("court 5", [f], [])])
        self.attendre_voix()

    # ── 02-03 : compter les quarts, dépasser 1 ──────────────────────────────
    def ecran_compter(self):
        self.ecran("02-compter")
        t1, t2 = self.tours([0, 0], xs=(-4.6, -1.9), r=1.15)
        self.add(t1)
        nums = VGroup()
        etapes = []
        for i, mot in enumerate(["1 quart,", "2 quarts", "3 quarts", "4 quarts :"]):
            n = chiffre_sur(t1.parts[i], i + 1, fs=30, couleur=WHITE)
            n.move_to(t1.get_center() + 0.95 * np.array([np.cos(PI / 4 - i * PI / 2), np.sin(PI / 4 - i * PI / 2), 0]))
            nums.add(n)
            etapes.append((mot, [n], [t1.parts[i].animate.set_fill(PISTE, 1)]))
        au_fil(self, etapes, run_time=0.35)
        l1 = self.col(self.t("1 tour complet !", 40, VERT_OK), 2.4)
        au_fil(self, [("1 tour complet", [l1], [Flash(t1, color=VERT_OK, line_length=0.3, flash_radius=1.3)])])
        f44 = EcritureFraction(4, 4, fs=56)
        r1 = VGroup(f44, self.inline("= 1", 60, VERT_OK)).arrange(RIGHT, buff=0.3)
        r1[1].set_y(f44.trait.get_y())
        self.col(r1, 1.2)
        au_fil(self, [("4 quarts égale", [f44], []), ("égale 1", [r1[1]], [])])
        n5 = chiffre_sur(t2.parts[0], 5, fs=30, couleur=WHITE)
        n5.move_to(t2.get_center() + 0.95 * np.array([np.cos(PI / 4), np.sin(PI / 4), 0]))
        au_fil(self, [("Puis 1 quart de plus", [t2, n5], [])])
        self.play(t2.parts[0].animate.set_fill(PISTE, 1), run_time=0.4)
        f54 = EcritureFraction(5, 4, fs=60)
        self.col(f54, -0.7)  # décollée de « 4/4 = 1 » au-dessus
        au_fil(self, [("plus : 5", [f54], [])])
        self.attendre_voix(marge=0.2)
        self.dire("03-plus-que-1")
        l2 = ligne_calc(self, [("1 tour", WHITE), ("et 1 quart", PISTE)], -1.85, fs=40)
        au_fil(self, [("c'est 1 tour", [l2[0]], [Indicate(t1, color=VERT_OK, scale_factor=1.04)]),
                      ("et 1 quart", [l2[1]], [Indicate(t2.parts[0], color=AMBRE, scale_factor=1.1)])])
        l3 = self.col(self.t("plus grand que 1 !", 40, VERT_OK), -2.6)
        au_fil(self, [("plus grand que 1 !", [l3], [])])
        e1 = ligne_calc(self, [("5", AMBRE), (">", AMBRE), ("4", AMBRE)], centre=ORIGIN, fs=56)
        e1.next_to(f54, RIGHT, buff=0.8)
        au_fil(self, [("Le numérateur, 5", [e1[0]], [Indicate(f54.num, color=AMBRE, scale_factor=1.5)]),
                      ("est plus grand que le", [e1[1]], []),
                      ("dénominateur, 4", [e1[2]], [Indicate(f54.den, color=AMBRE, scale_factor=1.5)])])
        self.attendre_voix()

    # ── 04 : QUESTION 1 (laquelle est plus grande que 1 ?) ──────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        t1, t2 = self.tours([4, 1], xs=(-4.6, -1.9), r=1.15)
        self.add(t1, t2)
        self.question_pause("04-question", "04b-reponse", ["Laquelle est plus", "grande que 1 ?"],
                            [EcritureFraction(3, 4, fs=40), EcritureFraction(7, 6, fs=40),
                             EcritureFraction(5, 5, fs=40)], 1,
                            ["7 > 6 : plus grand que 1", "5 cinquièmes = 1, tout juste"])

    # ── 05 : la droite de 0 à 2 ─────────────────────────────────────────────
    def ecran_droite(self):
        self.ecran("05-droite")
        d = Droite(0, 2, 8, etiquettes={0: "0", 1: "1", 2: "2"}, longueur=11.0, centre=P(0, -0.6))
        d.carte.stretch_to_fit_height(d.carte.height + 0.7).shift(UP * 0.35)  # les étiquettes restent DANS la carte
        l1 = ligne_calc(self, [("chaque unité :", WHITE), ("4 parts", AMBRE)], centre=P(0, 2.95), fs=40)
        au_fil(self, [("Sur la droite graduée", [], [FadeIn(d)]), ("chaque unité", [l1[0]], []),
                      ("a 4 parts", [l1[1]], [])])
        acc = VGroup(Brace(Line(d.p(0), d.p(1)), UP, color=AMBRE), Brace(Line(d.p(1), d.p(2)), UP, color=AMBRE))
        acc.shift(DOWN * 0.1)
        self.play(GrowFromCenter(acc[0]), GrowFromCenter(acc[1]), run_time=0.5)
        pts = [(0.75, (3, 4), BLEU_POINT, "3 quarts est avant"), (1.0, (4, 4), VERT_OK, "4 quarts tombe"),
               (1.25, (5, 4), PISTE, "5 quarts est après"), (2.0, (8, 4), VERT_OK, "8 quarts tombe")]
        for v, e, c, mot in pts:
            p = d.point(v, e, couleur=c, fs=36, haut=0.6)
            au_fil(self, [(mot, [p], [FadeOut(acc)] if v == 0.75 else [])])
        t2 = self.t("2 tours !", 44, VERT_OK).next_to(d.p(2), UP, buff=2.6).shift(LEFT * 0.6)
        au_fil(self, [("2 tours", [t2], [])])
        self.attendre_voix()

    # ── 06 : QUESTION 2 (9 quarts : combien de tours complets ?) ────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        ts = self.tours([0, 0, 0], r=0.85, xs=(-5.4, -3.45, -1.5))

        def apres(sc):
            sc.au_mot("4 quarts : 1 tour")
            sc.play(FadeIn(ts[0]), ts[0].parts.animate.set_fill(PISTE, 1), run_time=0.5)
            sc.au_mot("8 quarts : 2 tours")
            sc.play(FadeIn(ts[1]), ts[1].parts.animate.set_fill(PISTE, 1), run_time=0.5)
            sc.au_mot("Il reste 1 quart")
            sc.play(FadeIn(ts[2]), ts[2].parts[0].animate.set_fill(PISTE, 1), run_time=0.5)

        self.question_pause("06-question", "06b-reponse", ["Noé court 9 quarts.", "Combien de tours complets ?"],
                            [self.inline("9", 40), self.inline("2", 40), self.inline("4", 40)], 1,
                            ["2 tours et 1 quart"], autres_r=apres)

    # ── 07 : défi (7 quarts, plus ou moins que 2 tours ?) ───────────────────
    def ecran_defi(self):
        self.ecran("07-defi", 0.5)
        self.au_mot("À toi de jouer")
        self.titre("À toi de jouer !", fs=50)
        t1 = piste(0, 1.15, P(XF, 0.6))
        f = EcritureFraction(7, 4, fs=80)
        l1 = VGroup(self.inline("une course :", 40), f).arrange(RIGHT, buff=0.3)
        l1[0].set_y(f.trait.get_y())
        self.col(l1, 1.5)
        au_fil(self, [("course fait 7", [l1], [FadeIn(t1)])])
        q = self.col(self.bloc(["Plus ou moins", "que 2 tours ?"], 40, ORANGE_RETENUE), -0.2)
        sans_synchro(q)
        au_fil(self, [("plus ou moins", [q[0]], []), ("que 2 tours", [q[1]], [])])
        self.pause_defi(y=-1.6)

    def ecran_correction(self):
        self.ecran("07b-correction", 0.65)
        self.titre("Correction", fs=50)
        t1, t2 = self.tours([0, 0], xs=(-4.6, -1.9), r=1.15, y=0.4)
        self.add(t1, t2)
        c1 = ligne_calc(self, [("2 tours", WHITE), ("= 8 quarts", VERT_OK)], 1.8, fs=42)
        au_fil(self, [("2 tours", [c1[0]], []), ("c'est 8 quarts", [c1[1]], [])])
        f7, f8 = EcritureFraction(7, 4, fs=64, couleur=PISTE), EcritureFraction(8, 4, fs=64, couleur=VERT_OK)
        cmp = VGroup(f7, self.inline("<", 60), f8).arrange(RIGHT, buff=0.35)
        cmp[1].set_y(f7.trait.get_y())
        self.col(cmp, 0.4)
        pas_audit(f8)
        au_fil(self, [("7 quarts, c'est moins", [f7], []), ("c'est moins", [cmp[1], f8], [])])
        c2 = ligne_calc(self, [("1 tour", WHITE), ("et 3 quarts", PISTE)], -1.0, fs=42)
        au_fil(self, [("moins : 1 tour", [c2[0]], [t1.parts.animate.set_fill(PISTE, 1)]),
                      ("et 3 quarts", [c2[1]], [*[t2.parts[i].animate.set_fill(PISTE, 1) for i in range(3)]])])
        c3 = ligne_calc(self, [("entre", VERT_OK), ("1 et 2 !", VERT_OK)], -2.1, fs=44)
        au_fil(self, [(("entre 1 et 2", 1, "entre"), [c3[0]], []), ("1 et 2", [c3[1]], [])])
        self.play(Create(self.encadrer(c3, buff=0.15)), run_time=0.4)
        self.attendre_voix(marge=1.6)

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.65)
        t1, t2 = piste(4, 0.75), piste(1, 0.75)
        fig = VGroup(t1, t2).arrange(RIGHT, buff=0.3)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("Une unité = autant de parts", "que le dénominateur."),
                                                         ("Numérateur plus grand", "que le dénominateur :",
                                                          "plus grand que 1."),
                                                         ("Sur la droite : après 1.",)], fs=36)
        for mot, lg in zip(["Une unité", "Quand le numérateur", "Sur la droite"], lignes):
            self.au_mot(mot)
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.0)


class FracSuperieure1CM1(FracSuperieure1Base):
    identite = "Maths CM1 — EleveAI"
    ceinture = "verte"
