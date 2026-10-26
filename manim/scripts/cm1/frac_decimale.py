# frac_decimale.py
# EleveAI — Maths CM1 ET CM2 — série « Fractions », épisode 06 : LES FRACTIONS
# DÉCIMALES (micro du coach : fraction_decimale, dans les DEUX classes), AVEC
# VOIX. Paysage 16:9. Ce que PRÉPARE l'épisode : la chaîne de ses élèves
# fraction → nombre à virgule → pourcentage (3/10 = 0,3 ; 25/100 = 0,25 = 25 %),
# et le leurre « 7/100 = 0,7 ».
# CEINTURES : CM1 VERTE (la notion complète : dixièmes, centièmes, la virgule,
# le piège, « pour cent », défi corrigé) ; CM2 JAUNE (rappel de CM1).
# Short jumeau : frac_decimale_short.py (les centimes de Kenji, blanche).
#
# Décor et métier : le LABORATOIRE ; Chloé, LABORANTINE : un récipient de 1 L
# gradué en 10 parts ; 3 parts d'eau → 3/10 = 0,3 ; la grille de 100 cases :
# 25/100 = 0,25 = 25 % ; défi : 6/10 = 0,6 = 60/100. Aucune donnée du monde réel
# citée. Centres : sciences.
# Vérifié (Python) : 3/10 = 0,3 ; 25/100 = 0,25 ; 7/100 = 0,07 ≠ 0,7 = 70/100 ;
# 4/100 = 0,04 ; 6/10 = 60/100 = 0,6.
#
# Micro → écrans (banques cm1/maths/fractions-gabarits-d.ts tpl_171-177,
# cm2/…-decimale.ts) : reconnaître une fraction décimale (03 + QUESTION 1,
# tpl_171), dixièmes sur la barre de 10 (02, tpl_172), a/10 → 0,a (05, tpl_173),
# centièmes (06, tpl_175), le piège 7/100 ≠ 0,7 (07 + QUESTION 2, tpl_175),
# « pour cent » (09, tpl_176), dixièmes = dizaines de centièmes (défi, tpl_165).
# Écrans : 00 garde · 01 Chloé · 02 les dixièmes · 03 la définition ·
# 04 QUESTION 1 · 05 la virgule · 06 les centièmes · 07 le piège · 08 QUESTION 2 ·
# 09 pour cent · 10 défi · 10b correction · 11 ce que tu as appris · 12 fin.
#
# Bases : frac_cm_commun.py (PaysageCM, NON modifié) ; canvas_fractions.py ;
# décors : frac_cmj_commun.py (recipient, remplir, blouse_labo).
# Voix : manim/voix/cm-frac-decimale.json (débit −10) ; marques : frac_decimale_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/frac_decimale.py FracDecimaleCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/frac_decimale.py FracDecimaleCM1 -o eleveai-maths-cm1-frac-decimale --media_dir manim/scripts/cm1/media-frac-decimale
# CM2 : GARDE_SEULE=1 … FracDecimaleCM2 -o garde-cm2-frac-decimale --media_dir manim/scripts/cm1/media-frac-decimale-cm2
#       puis python manim/scripts/cm1/frac_cm_commun.py coller <cm1.mp4> <garde-cm2.mp4> <cm2.mp4>
# Sorties : manim/sorties/{cm1,cm2}/maths/fractions/06-decimale/eleveai-maths-{cm1,cm2}-frac-decimale.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_cm_commun import *  # noqa: E402,F403
from frac_cmj_commun import *  # noqa: E402,F403

XF = -3.3
COLS25 = [r * 10 + c for r in range(10) for c in (0, 1)] + [r * 10 + 2 for r in range(5)]


def g100(colories=(), cote=0.3, centre=P(XF, 0.0)):
    return Grille(10, 10, colories=list(colories), cote=cote, sw=2, centre=centre)


def cols(k, lignes_en_plus=0, c_plus=None):
    """Les cases de k colonnes entières (+ quelques cases de la colonne suivante)."""
    out = [r * 10 + c for r in range(10) for c in range(k)]
    if lignes_en_plus:
        out += [r * 10 + (k if c_plus is None else c_plus) for r in range(lignes_en_plus)]
    return out


class FracDecimaleBase(PaysageCM):
    nom_voix = "cm-frac-decimale"
    fichier_marques = "frac_decimale_marques.json"
    cle_abonne = "12-abonne"

    def ecrans(self):
        return [self.page_de_garde, self.ecran_situation, self.ecran_dixiemes, self.ecran_definition,
                self.ecran_question1, self.ecran_virgule, self.ecran_centiemes, self.ecran_piege,
                self.ecran_question2, self.ecran_pourcent, self.ecran_defi, self.ecran_correction, self.ecran_finale]

    def chloe(self):
        return blouse_labo(0.95).move_to(P(-5.3, -1.5))

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Les fractions décimales", self.identite, self.ceinture, y_ech=-2.7)
        self.au_mot("Les fractions")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        f1 = EcritureFraction(3, 10, fs=90).move_to(P(-3.2, 0.35))
        f2 = EcritureFraction(7, 100, fs=90).move_to(P(0.2, 0.35))
        q = self.t(", ?", 100, AMBRE).move_to(P(3.3, 0.35))
        au_fil(self, [("3 dixièmes", [f1], []), ("7 centièmes", [f2], []), ("avec une virgule", [q], [])])
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Chloé, laborantine ─────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        ch = self.chloe()
        nom = self.t("Chloé", 40, BLEU_CALCUL).move_to(P(-5.3, 1.1))
        met = self.t("laborantine", 30, BLEU_CALCUL).next_to(nom, DOWN, buff=0.12)
        au_fil(self, [("Voici Chloé", [ch, nom], []), ("laborantine", [met], [])])
        v = recipient().move_to(P(-2.4, 0.15))
        for m in v.marques:
            m.set_stroke(opacity=0)
        l1 = self.col(self.t("1 litre", 42), 2.2)
        au_fil(self, [("de 1 litre", [l1], [FadeIn(v.paroi), FadeIn(v.etiq), FadeIn(v.eau)])])
        l2 = self.col(self.t("10 parts égales", 42), 1.25)
        self.au_nb("en 10")
        self.play(LaggedStart(*[m.animate.set_stroke(opacity=1) for m in v.marques], lag_ratio=0.12),
                  FadeIn(l2, shift=RIGHT * 0.2), run_time=0.9)
        l3 = self.col(self.t("3 parts d'eau", 42, EAU), 0.3)
        self.au_nb("eau : 3")
        self.play(remplir(v, 3, 1.0), FadeIn(l3, shift=RIGHT * 0.2), run_time=1.0)
        q = self.col(self.t("Quelle fraction du litre ?", 38, ORANGE_RETENUE), -0.8)
        self.au_mot("Quelle fraction")
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 02 : les dixièmes ───────────────────────────────────────────────────
    def ecran_dixiemes(self):
        self.ecran("02-dixiemes")
        v = recipient().move_to(P(-2.4, 0.15))
        self.add(v)
        v.eau.stretch_to_fit_height(v.marques[2].get_y() - v.eau.get_bottom()[1], about_edge=DOWN)
        self.add(self.chloe())
        y0, y1 = v.eau.get_bottom()[1], v.marques[0].get_y()
        part = Rectangle(width=v.paroi.width - 0.1, height=y1 - y0, stroke_color=AMBRE, stroke_width=6)
        part.move_to(P(v.paroi.get_x(), (y0 + y1) / 2))
        f1 = EcritureFraction(1, 10, fs=56).next_to(part, RIGHT, buff=0.5)
        f1.set_color(AMBRE)
        l1 = self.col(self.t("1 part = 1 dixième", 40, AMBRE), 2.4)
        au_fil(self, [("est 1 dixième", [l1, f1], [Create(part)])])
        f3 = EcritureFraction(3, 10, fs=110).move_to(P(1.9, 0.5))
        au_fil(self, [("parts : 3 dixièmes", [f3], [Indicate(v.eau, color=EAU, scale_factor=1.04)])])
        e = etiquette(f3.den, "dénominateur", RIGHT, fs=28, long=0.5)
        au_fil(self, [("Le dénominateur", [], [GrowArrow(e[0]), FadeIn(e[1])]),
                      ("dénominateur est 10", [], [Indicate(f3.den, color=AMBRE, scale_factor=1.4)])])
        fd = self.col(self.t("fraction décimale", 44, JAUNE_TITRE), -1.9)
        self.au_mot("c'est une fraction décimale")
        self.play(FadeIn(fd, scale=1.2), run_time=0.4)
        self.insister(fd, 1.12, 0.25)
        self.attendre_voix()

    # ── 03 : la définition ──────────────────────────────────────────────────
    def ecran_definition(self):
        self.ecran("03-definition")
        self.au_mot("Une fraction décimale")
        tit = self.t("Une fraction décimale", 46, JAUNE_TITRE).move_to(P(0, 3.0))
        self.play(Write(tit), run_time=0.5)
        d = ligne_calc(self, [("dénominateur :", WHITE), ("10", AMBRE), ("100", AMBRE), ("ou", WHITE),
                              ("1 000", AMBRE)], centre=P(0, 1.9), fs=44)
        d[2:].shift(RIGHT * 0.45)  # « 10   100 » : jamais « 10,100 » (un nombre à virgule !)
        d.move_to(P(0, 1.9))
        au_fil(self, [("pour dénominateur", [d[0]], []), ("10,", [d[1]], []), ("100", [d[2]], []),
                      ("ou 1 000", [d[3], d[4]], [])])
        exs = [((3, 10), "oui", VERT_OK, "3 dixièmes : oui"), ((7, 100), "oui", VERT_OK, "7 centièmes : oui"),
               ((3, 4), "non", ROUGE_ERREUR, "3 quarts : non")]
        fs_ = []
        for k, ((n, dd), txt, c, mot) in enumerate(exs):
            x = -4.2 + 4.0 * k
            f = EcritureFraction(n, dd, fs=80).move_to(P(x, -0.1))
            m = (self.coche(c, 0.3) if txt == "oui" else croix(Square(0.5), c, 7)).next_to(f, RIGHT, buff=0.4)
            t = self.t(txt, 38, c).next_to(f, DOWN, buff=0.45)
            au_fil(self, [(mot.split(" :")[0], [f], []), ((mot, 1, txt), [t], [Create(m)])])
            fs_.append(f)
        self.au_nb("car 4")
        self.play(Indicate(fs_[2].den, color=ROUGE_ERREUR, scale_factor=1.5), run_time=0.5)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (laquelle est décimale ?) ───────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        v = recipient().move_to(P(-3.0, 0.1))
        self.add(self.chloe(), v)
        self.question_pause("04-question", "04b-reponse", ["Laquelle est une", "fraction décimale ?"],
                            [EcritureFraction(5, 6, fs=40), EcritureFraction(9, 10, fs=40),
                             EcritureFraction(1, 2, fs=40)], 1,
                            ["Son dénominateur est 10."])

    # ── 05 : la virgule (3 dixièmes = 0,3) ──────────────────────────────────
    def ecran_virgule(self):
        self.ecran("05-virgule")
        self.au_mot("Maintenant, la virgule")
        self.titre("La virgule")
        b = Barre(10, 3, largeur=5.6, hauteur=0.8, centre=P(XF, 1.4))
        f = EcritureFraction(3, 10, fs=80).move_to(P(XF, -0.6))
        au_fil(self, [("3 dixièmes", [f], [b.apparaitre(0.6)])])
        # le tableau unités | dixièmes
        cases = VGroup(*[RoundedRectangle(width=2.0, height=0.75, corner_radius=0.1, fill_color=c, fill_opacity=1,
                                          stroke_width=0) for c in ("#334155", "#0e7490")]).arrange(RIGHT, buff=0.35)
        tetes = VGroup(*[Text(t, font_size=30, color=WHITE).move_to(c) for t, c in zip(("unités", "dixièmes"), cases)])
        vals = VGroup(*[Text(t, font_size=64, color=c) for t, c in (("0", WHITE), ("3", AMBRE))])
        for vv, c in zip(vals, cases):
            vv.next_to(c, DOWN, buff=0.3)
        tab = VGroup(cases, tetes, vals)
        self.col(tab, 1.4)
        sans_synchro(tab)
        vir = Text(",", font_size=64, color=AMBRE).move_to((vals[0].get_right() + vals[1].get_left()) / 2)
        vir.align_to(vals[0], DOWN).shift(DOWN * 0.12)
        au_fil(self, [("c'est 0 unité", [cases[0], tetes[0], vals[0]], []),
                      ("et 3 dixièmes", [cases[1], tetes[1], vals[1]], [])])
        res = ligne_calc(self, [("0,3", VERT_OK)], -0.5, fs=90)
        au_fil(self, [("On écrit 0,3", [res, vir], [])])
        self.insister(res, 1.2, 0.25)
        r = self.col(self.bloc(["Juste après la virgule :", "les dixièmes"], 34, AMBRE), -2.2)
        self.au_mot("Le chiffre juste après")
        self.poser_lignes(r, "fade", 0.3)
        self.attendre_voix()

    # ── 06 : les centièmes (25/100 = 0,25) ──────────────────────────────────
    def ecran_centiemes(self):
        self.ecran("06-centiemes")
        g = g100(centre=P(XF, 0.0))
        l1 = self.col(self.t("100 parts égales", 40), 2.6)
        au_fil(self, [("Avec 100", [l1], [g.apparaitre(0.8)])])
        f1 = EcritureFraction(1, 100, fs=48).next_to(g, RIGHT, buff=0.3).align_to(g, UP)
        self.au_nb("est 1 centième")
        self.play(g.liste[0].animate.set_fill(AMBRE, 1), FadeIn(f1, scale=1.3), run_time=0.45)
        self.au_nb("cases, 25")
        self.play(g.colorier(COLS25, lag=0.02, run_time=1.0), FadeOut(f1))
        f = EcritureFraction(25, 100, fs=76)
        n = pas_audit(ligne_calc(self, [("0,", WHITE), ("2", AMBRE), ("5", VERT_OK)], centre=P(4.6, 1.25), fs=76))
        n.arrange(RIGHT, buff=0.04)
        n[1].align_to(n[0], DOWN)
        n[2].align_to(n[0], DOWN)
        eg = self.inline("=", 70)
        VGroup(f, eg, n).arrange(RIGHT, buff=0.35)
        self.col(VGroup(f, eg, n), 1.25)
        eg.set_y(f.trait.get_y())
        n.set_y(f.trait.get_y() + 0.05)
        au_fil(self, [("bleues : 25", [f], []), ("On écrit 0,25", [eg, n], [])])
        e2 = ligne_calc(self, [("2", AMBRE), ("dixièmes :", AMBRE), ("2 colonnes", AMBRE)], -0.6, fs=36)
        cad = g.entourer_colonnes([0, 1])
        au_fil(self, [("Le 2", [e2[0]], [Indicate(n[1], color=AMBRE, scale_factor=1.5)]),
                      (("Le 2 compte les dixièmes", 1, "dixièmes"), [e2[1]], []),
                      ("2 colonnes", [e2[2]], [Create(cad)])])
        e5 = ligne_calc(self, [("5", VERT_OK), ("centièmes :", VERT_OK), ("5 cases", VERT_OK)], -1.5, fs=36)
        cad5 = SurroundingRectangle(VGroup(*[g.liste[r * 10 + 2] for r in range(5)]), color=VERT_OK, buff=0.04,
                                    stroke_width=6)
        au_fil(self, [("Le 5", [e5[0]], [Indicate(n[2], color=VERT_OK, scale_factor=1.5)]),
                      (("Le 5 compte les centièmes", 1, "centièmes"), [e5[1]], []),
                      ("5 petites cases", [e5[2]], [Create(cad5)])])
        self.attendre_voix()

    # ── 07 : le piège 7/100 ≠ 0,7 ───────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        self.au_mot("Attention au piège")
        self.titre("Attention au piège !", ROUGE_ERREUR)
        ga = g100(cols(7), cote=0.21, centre=P(-4.9, 0.3))  # deux cartes séparées, jamais collées
        gb = g100(list(range(7)), cote=0.21, centre=P(-1.95, 0.3))
        la = self.t("7 colonnes", 30, AMBRE).next_to(ga, DOWN, buff=0.25)
        lb = VGroup(self.inline("7", 30, VERT_OK), self.inline("cases", 30, VERT_OK)).arrange(RIGHT, buff=0.15)
        lb.next_to(gb, DOWN, buff=0.25)
        faux = VGroup(EcritureFraction(7, 100, fs=60), self.inline("= 0,7", 56, ROUGE_ERREUR)).arrange(RIGHT, buff=0.3)
        faux[1].set_y(faux[0].trait.get_y())
        self.col(faux, 1.5)
        vrai = VGroup(EcritureFraction(7, 100, fs=60), self.inline("= 0,07", 56, VERT_OK)).arrange(RIGHT, buff=0.3)
        vrai[1].set_y(vrai[0].trait.get_y())
        self.col(vrai, -0.9)
        pas_audit(vrai[0])
        au_fil(self, [("7 centièmes, ce n'est pas", [faux[0]], []), ("pas 0,7", [faux[1]], [])])
        self.play(Create(croix(faux, sw=6)), run_time=0.3)
        au_fil(self, [("c'est 7 dixièmes", [ga], []), ("7 colonnes", [la], [])])
        au_fil(self, [("c'est 7 petites cases", [gb, lb[0]], []), ("petites cases", [lb[1]], [])])
        au_fil(self, [("On écrit 0,07", [vrai], [])])
        self.play(Create(self.encadrer(vrai, buff=0.15)), run_time=0.4)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (4 centièmes, avec une virgule) ─────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = g100(cote=0.3, centre=P(XF, 0.0))
        self.add(g)

        def apres(sc):
            sc.au_mot("0 dixième")
            sc.play(g.colorier(range(4), couleur=VERT_OK, lag=0.15), run_time=0.6)

        self.question_pause("08-question", "08b-reponse", ["4 centièmes,", "avec une virgule ?"],
                            [self.inline("0,4", 40), self.inline("0,04", 40), self.inline("4,0", 40)], 1,
                            ["Le 4 :", "rang des centièmes"], autres_r=apres)

    # ── 09 : « pour cent » ──────────────────────────────────────────────────
    def ecran_pourcent(self):
        self.ecran("09-pourcent")
        g = g100(COLS25, centre=P(XF, 0.0))
        self.add(g)
        self.au_mot("un secret")
        self.titre("Un secret !")
        l1 = ligne_calc(self, [("« sur 100 »", AMBRE), ("=", WHITE), ("« pour cent »", VERT_OK)], 1.9, fs=40)
        au_fil(self, [("sur 100", [l1[0]], []), ("« pour cent »", [l1[1], l1[2]], [])])
        f = EcritureFraction(25, 100, fs=64)
        p = self.inline("= 25 %", 60, VERT_OK)
        lg = VGroup(f, p).arrange(RIGHT, buff=0.3)
        p.set_y(f.trait.get_y())
        self.col(lg, 0.4)
        au_fil(self, [("25 centièmes", [f], []), ("c'est 25 pour cent", [p], [])])
        pc = self.inline("25 %", 50, VERT_OK).next_to(g, RIGHT, buff=0.25).align_to(g, DOWN)
        au_fil(self, [("On écrit 25 %", [pc], [Indicate(p, color=VERT_OK)])])
        f2 = EcritureFraction(25, 100, fs=56)
        trois = VGroup(f2, self.inline("=", 50), self.inline("0,25", 50, AMBRE), self.inline("=", 50),
                       self.inline("25 %", 50, VERT_OK)).arrange(RIGHT, buff=0.25)
        for m in trois[1:]:
            m.set_y(f2.trait.get_y())
        self.col(trois, -1.5)
        pas_audit(trois)
        au_fil(self, [("Fraction", [f2], []), ("virgule", [trois[1], trois[2]], []),
                      ("pourcentage", [trois[3], trois[4]], [])])
        self.play(Create(self.encadrer(trois, couleur=JAUNE_TITRE, buff=0.15)), run_time=0.4)
        self.attendre_voix()

    # ── 10 : défi (6 dixièmes) ──────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("10-defi", 0.5)
        self.au_mot("À toi de jouer")
        self.titre("À toi de jouer !", fs=50)
        v = recipient().move_to(P(-2.6, 0.0))
        self.add(self.chloe(), v)
        f = EcritureFraction(6, 10, fs=70).move_to(P(2.3, 1.5))
        l = self.inline("de litre", 40).next_to(f, RIGHT, buff=0.3)
        au_fil(self, [("verse 6", [f, l], [remplir(v, 6, 1.0)])], run_time=1.0)
        q = self.col(self.bloc(["Avec une virgule ?", "Puis en centièmes ?"], 40, ORANGE_RETENUE), 0.0)
        sans_synchro(q)
        au_fil(self, [("Écris ce nombre", [q[0]], []), ("Puis en centièmes", [q[1]], [])])
        self.pause_defi(y=-1.5)

    def ecran_correction(self):
        self.ecran("10b-correction", 0.65)
        self.titre("Correction", fs=50)
        g = g100(centre=P(XF, -0.1))
        self.add(g)
        f = EcritureFraction(6, 10, fs=64)
        r1 = VGroup(f, self.inline("= 0,6 litre", 54, VERT_OK)).arrange(RIGHT, buff=0.3)
        r1[1].set_y(f.trait.get_y())
        self.col(r1, 1.7)
        au_fil(self, [("6 dixièmes, c'est", [f], []), ("c'est 0,6", [r1[1]], [g.colorier(cols(6), lag=0.01,
                                                                                         run_time=0.8)])],
               run_time=0.8)
        fa, fb = EcritureFraction(1, 10, fs=56), EcritureFraction(10, 100, fs=56)
        r2 = egalite(fa, fb)
        self.col(r2, 0.0)
        cad = g.entourer_colonnes([0])
        au_fil(self, [("1 dixième", [fa], [Create(cad)]), ("10 centièmes.", [r2[1], fb], [])])
        fc, fd = EcritureFraction(6, 10, fs=56), EcritureFraction(60, 100, fs=56, couleur=VERT_OK)
        r3 = egalite(fc, fd)
        self.col(r3, -1.75)
        au_fil(self, [("Alors 6", [fc], [FadeOut(cad), Create(g.entourer_colonnes(range(6)))]),
                      ("60 centièmes", [r3[1], fd], [])])
        self.play(Create(self.encadrer(r3, buff=0.15)), run_time=0.4)
        self.attendre_voix(marge=1.6)

    # ── 11 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("11-finale", 0.65)
        g = g100(COLS25, cote=0.26)
        self.add(g)
        lignes = self.finale_colonne(figure=g, textes=[("Une fraction décimale a pour", "dénominateur 10, 100 ou 1 000."),
                                                       ("Les dixièmes : juste après", "la virgule. 3 dixièmes = 0,3"),
                                                       ("Les centièmes : au 2e rang.", "7 centièmes = 0,07")], fs=34)
        self.au_mot("Une fraction décimale")
        self.montrer_ligne(lignes[0])
        self.au_mot("Les dixièmes")
        self.montrer_ligne(lignes[1])
        self.au_mot("Les centièmes")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)


class FracDecimaleCM1(FracDecimaleBase):
    identite = "Maths CM1 — EleveAI"
    ceinture = "verte"


class FracDecimaleCM2(FracDecimaleBase):
    identite = "Maths CM2 — EleveAI"
    ceinture = "jaune"
