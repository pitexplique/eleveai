# frac_quantite.py
# EleveAI — Maths 6e — série « Fractions », épisode 08 : PRENDRE UNE FRACTION
# D'UN NOMBRE (micro du coach : fraction_quantite, notion fraction_calcul),
# AVEC VOIX. Paysage 16:9 SEULEMENT (le short existe déjà :
# 6e-fraction-calcul-short-quantite, 18 bonbons / 3 quarts de 24 : exemples
# NON repris ici). CEINTURE VERTE : la paysage complète du niveau.
# ⭐ Le BO (2025) : « 2/5 de 60 […] 2 × 60/5 = 2 × 12 = 24 », et l'élève est
# « fortement encouragé, avant d'effectuer la multiplication, à simplifier » :
# écran 06 (4/6 de 30 → 2/3 de 30). Rappel de la chaîne : 7/10 = 0,7 = 70 %
# (correction du défi).
#
# Décor et métier : MUSIQUE ; Nathan, PRODUCTEUR DE MUSIQUE : son morceau dure
# 60 s, le refrain en occupe les 2/5 → 24 s. Défi : concert, 7/10 des 250
# places vendues → 175. Aucune donnée réelle citée.
# Centres d'intérêt : musique.
#
# Micro → écrans (banque fractions-calcul.bank.ts) : le sens « couper puis
# prendre » (02, 03), la méthode ÷ dénominateur puis × numérateur (04,
# question 1 : 3/10 de 50), simplifier avant (06), le piège ÷ numérateur ×
# dénominateur (07, 150 > 60), question 2 (3/4 de 40), défi (09).
# Écrans : 00 garde · 01 Nathan et son morceau · 02 couper en 5 · 03 prendre
# 2 parts · 04 la méthode · 05 QUESTION 1 · 06 simplifier avant · 07 le piège ·
# 08 QUESTION 2 · 09 défi · 09b correction · 10 ce que tu as appris · 11 fin.
#
# Voix : manim/voix/6e-frac-quantite.json (débit −10), WAV dans
# public/sons/6e-frac-quantite/ ; marques : manim/scripts/6e/frac_quantite_marques.json.
# Outils : frac_commun.py + frac_lotc_commun.py.
# python -m manim render -qh --disable_caching manim/scripts/6e/frac_quantite.py FracQuantite6e -o eleveai-maths-6e-frac-quantite --media_dir manim/scripts/6e/media-frac-quantite
# Sortie : manim/sorties/6e/maths/fractions/08-quantite/eleveai-maths-6e-frac-quantite.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_lotc_commun import *  # noqa: E402,F403

REFRAIN = VIOLET_PART


def producteur(s=1.0):
    """Nathan : cheveux courts, sweat orange, casque audio."""
    p = personne(peau="#8d5524", tenue="#ea580c", cheveux="#111827", s=s)
    p.add(casque_audio(p))
    return p


def piste(n=1, k=0, largeur=6.0, hauteur=0.8, debut="0 s", fin="60 s", centre=ORIGIN, couleur=REFRAIN, fs=30):
    """La piste du morceau : une Barre (coach) et ses bornes « 0 s » / « 60 s »
    dessous. .barre .bornes."""
    b = Barre(n, k, largeur=largeur, hauteur=hauteur, couleur=couleur, marge=0.2, centre=centre)
    g0 = Text(debut, font_size=fs, color=WHITE).next_to(b.contour.get_corner(DL), DOWN, buff=0.35)
    g1 = Text(fin, font_size=fs, color=WHITE).next_to(b.contour.get_corner(DR), DOWN, buff=0.35)
    for t in (g0, g1):
        t.sans_synchro = True
    return b, VGroup(g0, g1)


def etiquettes_parts(b, txt, fs=28, couleur=AMBRE):
    """Un texte au-dessus de chaque part de la barre (« 12 s »)."""
    return VGroup(*[Text(txt, font_size=fs, color=couleur).next_to(p, UP, buff=0.32) for p in b.parts])


class FracQuantiteBase(PaysageLotC):
    nom_voix = "6e-frac-quantite"
    fichier_marques = "frac_quantite_marques.json"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Prendre une fraction d'un nombre", self.identite, self.ceinture)
        self.au_mot("Prendre")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        f = EcritureFraction(2, 5, fs=80).move_to(P(-3.2, 0.25))
        self.frac(f, "2 cinquièmes")
        self.au_mot("de 60")
        d = self.t("de 60 = ?", 72, AMBRE).next_to(f, RIGHT, buff=0.45)
        self.play(FadeIn(d, shift=LEFT * 0.2), run_time=0.4)
        self.insister(d, 1.2, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Nathan et son morceau ──────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = producteur(1.1).move_to(P(-5.5, -0.5))
        self.au_mot("Voici Nathan")
        nom = self.t("Nathan", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.3)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("producteur")
        metier = self.bloc(["producteur", "de musique"], 30, BLEU_CALCUL).next_to(pers, DOWN, buff=0.2)
        for m in metier:
            m.set_x(pers.get_x())
        self.play(FadeIn(metier, shift=UP * 0.2), run_time=0.4)
        b, bornes = piste(1, 0, largeur=7.0, centre=P(1.2, 1.4))
        onde = VGroup(*[Line(P(x, -0.25 * abs(np.sin(3 * x)) - 0.06), P(x, 0.25 * abs(np.sin(3 * x)) + 0.06),
                             stroke_color="#64748b", stroke_width=3) for x in np.arange(-3.3, 3.31, 0.15)])
        onde.move_to(b.contour)
        self.au_mot("Son morceau")
        tit = self.t("Le morceau", 32, WHITE).next_to(b, UP, buff=0.15).align_to(b, LEFT)
        self.play(FadeIn(tit), b.apparaitre(0.6), Create(onde), run_time=0.7)
        self.au_mot("60 secondes")
        self.play(FadeIn(bornes, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Le refrain")
        l1 = VGroup(self.t("Refrain :", 40, REFRAIN), EcritureFraction(2, 5, fs=56, couleur=REFRAIN),
                    self.t("du morceau", 40, REFRAIN)).arrange(RIGHT, buff=0.25)
        l1.move_to(P(1.2, -0.6))
        self.play(FadeIn(l1[0], shift=RIGHT * 0.2), run_time=0.3)
        self.frac(l1[1], "2 cinquièmes")
        self.play(FadeIn(l1[2], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("Combien de secondes")
        q = self.t("Le refrain dure ? s", 40, ORANGE_RETENUE).move_to(P(1.2, -2.0))
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.4)
        self.attendre_voix()
        return onde

    # ── 02 : couper en 5 parts ──────────────────────────────────────────────
    def ecran_couper(self):
        self.ecran("02-couper")
        b, bornes = piste(1, 0, largeur=7.4, centre=P(-2.4, 1.2))
        self.add(b, bornes)
        f = EcritureFraction(2, 5, fs=72).move_to(P(4.6, 2.7))
        self.frac(f, "2 cinquièmes")
        self.au_mot("2 parts sur 5")
        l0 = self.ligne([("2 parts", REFRAIN), ("sur", WHITE), ("5", BLEU_CALCUL)], 40).move_to(P(4.4, 1.35))
        self.poser_lignes(l0, "fade", 0.3)
        self.au_mot("en 5 parts égales")
        b5, anim = b.repartager(5, run_time=1.0)
        self.play(anim, Indicate(f.den, color=BLEU_CALCUL, scale_factor=1.3))
        self.au_mot("60 divisé par 5")
        lg = self.calc([("60 ÷ 5 =", WHITE), ("12", VERT_OK)], -0.75, 54, xl=-4.6)
        self.au_mot("dure 12 secondes")
        e = etiquettes_parts(b5, "12 s")
        self.play(LaggedStart(*[FadeIn(t, shift=DOWN * 0.1) for t in e], lag_ratio=0.15), run_time=0.8)
        self.attendre_voix()
        return b5, bornes, e, f

    # ── 03 : prendre 2 parts ────────────────────────────────────────────────
    def ecran_prendre(self, b5, bornes, e, f):
        self.ecran("03-prendre")
        self.add(b5, e, f)
        self.au_mot("prend 2 parts")
        self.play(b5.colorier(range(2), lag=0.3), Indicate(f.num, color=REFRAIN, scale_factor=1.3), run_time=0.8)
        self.au_mot("2 fois 12")
        self.calc([("2 × 12 =", WHITE), ("24", VERT_OK)], -0.75, 54, xl=-4.6)
        acc = b5.accolade("24 s", couleur=REFRAIN, fs=40, dessus=False)
        self.play(GrowFromCenter(acc), run_time=0.4)
        self.au_mot("dure 24 secondes")
        r = self.t("Refrain : 24 s", 50, VERT_OK).move_to(P(-2.4, -2.2))
        self.play(FadeIn(r, scale=1.3), run_time=0.4)
        self.play(Create(self.encadrer(r)), run_time=0.3)
        self.attendre_voix()

    # ── 04 : la méthode ─────────────────────────────────────────────────────
    def ecran_methode(self):
        self.ecran("04-methode")
        tit = self.t("La méthode", 48, JAUNE_TITRE).move_to(P(-4.3, 3.0))
        self.au_mot("La méthode")
        self.play(Write(tit), run_time=0.5)
        f = EcritureFraction(2, 5, fs=130).move_to(P(-4.3, 0.2))
        self.add(f)
        l1 = self.ligne([("1.", AMBRE), ("je divise par", WHITE), ("le dénominateur", BLEU_CALCUL)], 40)
        l2 = self.ligne([("2.", AMBRE), ("je multiplie par", WHITE), ("le numérateur", REFRAIN)], 40)
        self.col(l1, 1.6, xl=-1.9)
        self.col(l2, 0.4, xl=-1.9)
        self.au_mot("je divise")
        self.play(FadeIn(l1, shift=RIGHT * 0.2), Indicate(f.den, color=BLEU_CALCUL, scale_factor=1.4), run_time=0.6)
        self.au_mot("puis je multiplie")
        self.play(FadeIn(l2, shift=RIGHT * 0.2), Indicate(f.num, color=REFRAIN, scale_factor=1.4), run_time=0.6)
        fb = Arrow(P(-1.9, -1.35), f.den.get_right() + RIGHT * 0.15, color=BLUE_C, stroke_width=6, buff=0)
        tb = self.t("en combien on coupe", 38, BLEU_CALCUL).next_to(P(-1.8, -1.35), RIGHT, buff=0.1)
        self.au_mot("Le nombre du bas")
        self.play(GrowArrow(fb), FadeIn(tb, shift=RIGHT * 0.2), run_time=0.5)
        fh = Arrow(P(-1.9, 2.45), f.num.get_right() + RIGHT * 0.15, color=REFRAIN, stroke_width=6, buff=0)
        th = self.t("combien de parts on prend", 38, REFRAIN).next_to(P(-1.8, 2.45), RIGHT, buff=0.1)
        self.au_mot("Le nombre du haut")
        self.play(GrowArrow(fh), FadeIn(th, shift=RIGHT * 0.2), run_time=0.5)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (3/10 de 50) ────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        b = Barre(10, 0, largeur=5.6, hauteur=0.7, couleur=REFRAIN, centre=P(-3.3, 0.6))
        self.add(b)

        def apres(sc):
            sc.au_mot("50 divisé par 10")
            e = etiquettes_parts(b, "5", fs=30)
            sc.rep(0, avec=[LaggedStart(*[FadeIn(t) for t in e], lag_ratio=0.08, run_time=0.6)])
            sc.au_mot("3 fois 5")
            sc.rep(1, avec=[b.colorier(range(3), run_time=0.6)])
            sc.au_mot("5, c'est seulement")
            sc.rep(2)
            sc.rep_fin()

        self.question_pause("05-question", "05b-reponse", ["Les 3 dixièmes", "de 50 ?"],
                            [self.inline("5"), self.inline("15"), self.inline("150")], 1,
                            ["50 ÷ 10 = 5", "3 × 5 = 15", "(5 = seulement 1 dixième)"], mot_q="3 dixièmes",
                            autres_r=apres)

    # ── 06 : simplifier avant de calculer (4/6 de 30) ──────────────────────
    def ecran_simplifier(self):
        self.ecran("06-simplifier")
        self.au_mot("Une astuce")
        tit = self.col(self.t("L'astuce : simplifier avant", 42, JAUNE_TITRE), 3.0, xl=-1.6)
        self.play(Write(tit), run_time=0.5)
        f, g = EcritureFraction(4, 6, fs=80), EcritureFraction(2, 3, fs=80)
        eg = egalite(f, g, buff=1.0).move_to(P(-4.3, 1.0))
        haut, bas = fleches(f, g, "÷ 2", fs=36, angle=TAU / 7)
        de = self.t("de 30", 64, WHITE).next_to(eg, RIGHT, buff=0.4).set_y(f.trait.get_y())
        self.au_mot("Les 4 sixièmes de 30")
        self.play(FadeIn(f, scale=1.3), run_time=0.3)
        self.play(FadeIn(de, shift=LEFT * 0.2), run_time=0.3)
        self.au_mot("c'est 2 tiers")
        self.play(Create(haut[0]), FadeIn(haut[1]), Create(bas[0]), FadeIn(bas[1]), FadeIn(eg[1]),
                  FadeIn(g, scale=1.3), run_time=0.5)
        b = Barre(3, 0, largeur=5.4, hauteur=0.7, couleur=REFRAIN, centre=P(-3.3, -2.45))
        self.au_mot("30 divisé par 3")
        e = etiquettes_parts(b, "10", fs=32)
        self.calc([("30 ÷ 3 =", WHITE), ("10", VERT_OK)], 0.9, 50, xl=1.6, avec=[b.apparaitre(0.5)])
        self.play(LaggedStart(*[FadeIn(t) for t in e], lag_ratio=0.2), run_time=0.4)
        self.au_mot("2 fois 10")
        self.calc([("2 × 10 =", WHITE), ("20", VERT_OK)], -0.2, 50, xl=1.6, avec=[b.colorier(range(2), run_time=0.6)])
        self.au_mot("plus petits")
        r = self.col(self.bloc(["Petits nombres :", "calcul facile !"], 38, AMBRE), -1.5, xl=1.6)
        self.poser_lignes(r, "up", 0.3)
        self.attendre_voix()

    # ── 07 : le piège (÷ 2 puis × 5 → 150 s) ───────────────────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR).move_to(P(0, 3.05))
        self.au_mot("Attention au piège")
        self.play(Write(tit), run_time=0.5)
        b, bornes = piste(5, 0, largeur=4.0, hauteur=0.6, centre=P(-4.1, 1.4), fs=26)
        self.au_mot("Pour les 2 cinquièmes de 60")
        self.play(b.apparaitre(0.5), FadeIn(bornes), run_time=0.5)
        self.au_mot("divisent par 2")
        l1 = self.ligne([("60 ÷ 2", WHITE)], 44).move_to(P(3.3, 1.7))
        l1[0].sans_synchro = True
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("multiplient par 5")
        l2 = self.ligne([("× 5", WHITE)], 44).next_to(l1, RIGHT, buff=0.2)
        l2[0].sans_synchro = True
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("150 secondes")
        l3 = self.t("= 150 s", 44, ROUGE_ERREUR).next_to(l1, DOWN, buff=0.3).align_to(l1, LEFT)
        self.play(FadeIn(l3, scale=1.3), run_time=0.3)
        long = Rectangle(width=4.0 * 150 / 60, height=0.45, fill_color=ROUGE_ERREUR, fill_opacity=0.9, stroke_width=0)
        long.align_to(b.contour, LEFT).set_y(-0.35)
        t150 = self.t("150 s", 36, ROUGE_ERREUR).next_to(long, DOWN, buff=0.15).align_to(long, RIGHT)
        self.play(GrowFromEdge(long, LEFT), FadeIn(t150), run_time=0.8)
        self.au_mot("plus que tout le morceau")
        tir = DashedLine(P(b.contour.get_right()[0], 2.0), P(b.contour.get_right()[0], -0.8), color=AMBRE,
                         stroke_width=5)
        self.play(Create(tir), Indicate(bornes[1], color=AMBRE, scale_factor=1.5), run_time=0.6)
        self.au_mot("Impossible")
        x = croix(VGroup(l1, l2, l3), sw=6).set_stroke(opacity=0.9)
        self.play(Create(x), run_time=0.4)
        self.au_mot("moins que le tout")
        r = self.t("2/5 de 60 : moins que 60 !", 40, VERT_OK).move_to(P(0, -2.0))
        r.sans_synchro = True
        r._bloc = True
        self.play(FadeIn(r, shift=UP * 0.2), run_time=0.4)
        self.play(Create(self.encadrer(r)), run_time=0.3)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (3/4 de 40) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        b = Barre(4, 0, largeur=5.6, hauteur=0.8, couleur=REFRAIN, centre=P(-3.3, 0.6))
        self.add(b)

        def apres(sc):
            sc.au_mot("40 divisé par 4")
            e = etiquettes_parts(b, "10", fs=32)
            sc.rep(0, avec=[LaggedStart(*[FadeIn(t) for t in e], lag_ratio=0.15, run_time=0.6)])
            sc.au_mot("3 fois 10")
            sc.rep(1, avec=[b.colorier(range(3), run_time=0.6)])
            sc.rep_fin()

        self.question_pause("08-question", "08b-reponse", ["Les 3 quarts de 40,", "ça fait combien ?"],
                            [self.inline("30"), self.inline("10"), self.inline("120")], 0,
                            ["40 ÷ 4 = 10", "3 × 10 = 30"], mot_q="3 quarts", autres_r=apres)

    # ── 09 : défi (7/10 de 250 places) ──────────────────────────────────────
    def salle(self, k=0):
        return Barre(10, k, largeur=5.8, hauteur=0.8, couleur=REFRAIN, centre=P(-3.4, 0.4))

    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        b = self.salle()
        self.au_mot("À toi de jouer")
        tit = self.col(self.t("À toi de jouer !", 50, JAUNE_TITRE), 3.0)
        self.play(Write(tit), run_time=0.6)
        self.au_mot("salle de 250")
        l1 = self.col(self.ligne([("Salle :", WHITE), ("250", BLEU_CALCUL), ("places", WHITE)], 40), 1.9)
        t250 = self.t("250 places", 34, WHITE).next_to(b, UP, buff=0.2)
        self.play(b.apparaitre(0.8), FadeIn(l1, shift=RIGHT * 0.2), FadeIn(t250), run_time=0.8)
        self.au_mot("Les 7 dixièmes")
        l2 = VGroup(self.t("vendues :", 40), EcritureFraction(7, 10, fs=54, couleur=REFRAIN)).arrange(RIGHT, buff=0.25)
        self.col(l2, 0.85)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), b.colorier(range(7), lag=0.1), run_time=0.9)
        self.au_mot("Combien de places")
        l3 = self.col(self.bloc(["Combien de places", "vendues ?"], 38, ORANGE_RETENUE), -0.4)
        self.poser_lignes(l3, "up", 0.3)
        self.pause_defi(y=-1.7)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        b = self.salle(7)
        t250 = self.t("250 places", 34, WHITE).next_to(b, UP, buff=0.2)
        self.add(b, t250)
        tit = self.col(self.t("Correction", 50, JAUNE_TITRE), 3.0)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("250 divisé par 10")
        e = VGroup(*[Text("25", font_size=24, color=AMBRE).next_to(p, DOWN, buff=0.3) for p in b.parts])
        self.calc([("250 ÷ 10 =", WHITE), ("25", VERT_OK)], 1.9, 46,
                  avec=[LaggedStart(*[FadeIn(t) for t in e], lag_ratio=0.08, run_time=0.6)])
        self.au_mot("7 fois 25")
        self.calc([("7 × 25 =", WHITE), ("175", VERT_OK)], 1.0, 46)
        self.au_mot("175 places")
        r = self.col(self.t("175 places vendues", 46, VERT_OK), 0.0)
        acc = b.accolade(None, couleur=REFRAIN, dessus=False).shift(DOWN * 0.55)
        a175 = self.t("175", 38, REFRAIN).next_to(acc, DOWN, buff=0.1)
        self.play(FadeIn(r, scale=1.2), GrowFromCenter(acc), FadeIn(a175), run_time=0.5)
        self.play(Create(self.encadrer(r)), run_time=0.3)
        self.au_mot("Et 7 dixièmes")
        ch = VGroup(EcritureFraction(7, 10, fs=50, couleur=AMBRE), self.t("=", 46, AMBRE), self.t("0,7", 46, AMBRE),
                    self.t("=", 46, AMBRE), self.t("70 %", 46, AMBRE)).arrange(RIGHT, buff=0.25)
        self.col(ch, -1.4)
        self.play(FadeIn(ch[0], scale=1.3), run_time=0.3)
        self.au_mot("0,7")
        self.play(FadeIn(ch[1:3], shift=RIGHT * 0.15), run_time=0.3)
        self.au_mot("70 %")
        self.play(FadeIn(ch[3:], shift=RIGHT * 0.15), run_time=0.3)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        b, bornes = piste(5, 2, largeur=4.6, hauteur=0.6, fs=26)
        e = etiquettes_parts(b, "12 s", fs=22)
        lab = self.t("2/5 de 60 s = 24 s", 34, REFRAIN).next_to(bornes, DOWN, buff=0.25)
        lab.sans_synchro = True
        fig = VGroup(e, b, bornes, lab)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("Je divise par", "le dénominateur,"),
                                                         ("puis je multiplie", "par le numérateur."),
                                                         ("Je peux simplifier avant.",),
                                                         ("Fraction < 1 :", "moins que le tout.")], fs=36)
        self.au_mot("je divise")
        self.montrer_ligne(lignes[0])
        self.au_mot("puis je multiplie")
        self.montrer_ligne(lignes[1])
        self.au_mot("Je peux simplifier")
        self.montrer_ligne(lignes[2])
        self.au_mot("Et une fraction")
        self.montrer_ligne(lignes[3])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        b5, bornes, e, f = self.ecran_couper()
        self.ecran_prendre(b5, bornes, e, f)
        self.ecran_methode()
        self.ecran_question1()
        self.ecran_simplifier()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class FracQuantite6e(FracQuantiteBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
