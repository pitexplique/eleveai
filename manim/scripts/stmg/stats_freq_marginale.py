# stats_freq_marginale.py
# EleveAI — Maths STMG — série « Statistiques », épisode 09 « FRÉQUENCE
# MARGINALE » (micro du coach don_freq_marginale : « Calculer une fréquence
# marginale », notion donnees_frequences). AVEC VOIX. Paysage 16:9.
# CEINTURE VERTE : la paysage complète du niveau (marge ÷ total général, le
# complément à 100 %, le mauvais dénominateur, la conditionnelle prise pour une
# marginale). Short jumeau : stats_freq_marginale_short.py (ORANGE).
#
# ⭐ Décor et métier : le TOURISME ; une CHARGÉE D'ÉTUDES de l'observatoire
# régional du tourisme (problématique : mesurer la part de la clientèle
# étrangère). Centres d'intérêt : histoire-geographie, transports.
# ⭐ DONNÉES RÉELLES (lues le 24/10/2026) : Insee, « Bilan économique 2023,
# Auvergne-Rhône-Alpes — Tourisme : une fréquentation record »,
# https://www.insee.fr/fr/statistiques/7936360 (figures 1, 3 et 4) :
# hôtels 24 492 milliers de nuitées dont 26,3 % de clientèle non résidente ;
# campings 13 695 milliers dont 32,8 % non résidente. Cases déduites (millions,
# au dixième) : Hôtels 18,1 | 6,4 | 24,5 ; Campings 9,2 | 4,5 | 13,7 ;
# Total 27,3 | 10,9 | 38,2. Colonnes « France » / « Étranger » = où vit le
# client (clientèle résidente / non résidente de l'Insee).
# Fréquences : 10,9/38,2 = 28,5 % · 13,7/38,2 = 35,9 % · 27,3/38,2 = 71,5 % ·
# 24,5/38,2 = 64,1 % ; leurres : 9,2/38,2 = 24,1 % (une case), 4,5/10,9 =
# 41,3 % (conditionnelle), 10,9/24,5 = 44,5 % (total d'une ligne).
#
# Mapping micro → écrans (banque stmg donnees-croisees) : tpl_1 (marge ÷ total)
# → 03, question 04, défi · tpl_2 (choisir le bon quotient ; leurres : une case,
# total de ligne, conditionnelle) → 06 piège, question 07.
# Écrans : 00 garde · 01 la chargée d'études, 38,2 millions de nuitées · 02 le
# tableau et ses marges · 03 la méthode (10,9 ÷ 38,2) · 04 QUESTION (campings) ·
# 05 le complément à 100 % · 06 le piège (÷ 24,5) · 07 QUESTION (6,4 ÷ 10,9) ·
# 08 défi · 08b correction · 09 ce que tu as appris · 10 fin.
#
# Voix : manim/voix/stmg-stats-freq-marginale.json (débit −7) ; marques :
# manim/scripts/stmg/stats_freq_marginale_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/stmg/stats_freq_marginale.py StatsFreqMarginaleStmg -o eleveai-maths-stmg-stats-freq-marginale --media_dir manim/scripts/stmg/media-stats-freq-marginale-stmg
# Sortie : manim/sorties/stmg/maths/statistiques/09-freq-marginale/eleveai-maths-stmg-stats-freq-marginale.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats_lycee_i2_commun import *  # noqa: E402,F403

COLONNES = ["France", "Étranger", "Total"]
LIGNES = ["Hôtels", "Campings", "Total"]
VALS = [["18,1", "6,4", "24,5"], ["9,2", "4,5", "13,7"], ["27,3", "10,9", "38,2"]]
TITRE = "Nuitées 2023 (en millions)"


def hotel(h=1.6):
    """Un hôtel : façade, fenêtres, enseigne « H »."""
    fac = Rectangle(width=0.8 * h, height=h, fill_color="#334155", fill_opacity=1, stroke_color=WHITE,
                    stroke_width=2)
    fen = VGroup(*[Square(0.13 * h, fill_color="#fde68a", fill_opacity=1, stroke_width=0)
                   .move_to(fac.get_corner(UL) + RIGHT * (0.18 + 0.22 * i) * h + DOWN * (0.3 + 0.22 * j) * h)
                   for i in range(3) for j in range(3)])
    porte = Rectangle(width=0.18 * h, height=0.22 * h, fill_color="#92400e", fill_opacity=1,
                      stroke_width=0).move_to(fac.get_bottom() + UP * 0.11 * h)
    ens = Text("H", font_size=int(34 * h), color=WHITE, weight=BOLD).next_to(fac, UP, buff=0.06)
    return VGroup(fac, fen, porte, ens)


def tente(h=1.2):
    """Une tente de camping, avec sa porte ouverte."""
    t = Polygon(P(-0.75 * h, 0), P(0, 0.85 * h), P(0.75 * h, 0), fill_color="#16a34a", fill_opacity=1,
                stroke_color=WHITE, stroke_width=2)
    porte = Polygon(P(-0.2 * h, 0), P(0, 0.45 * h), P(0.2 * h, 0), fill_color="#052e16", fill_opacity=1,
                    stroke_width=0)
    sol = Line(P(-0.95 * h, 0), P(0.95 * h, 0), color=GREY_B, stroke_width=3)
    return VGroup(t, porte, sol)


def valise(h=0.7):
    """Une valise de voyageur."""
    corps = RoundedRectangle(width=1.0 * h, height=0.72 * h, corner_radius=0.08 * h, fill_color="#f97316",
                             fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    anse = Arc(radius=0.18 * h, start_angle=0, angle=PI, stroke_color=WHITE,
               stroke_width=4).next_to(corps, UP, buff=0)
    bande = Line(corps.get_top(), corps.get_bottom(), color="#fde68a", stroke_width=4).shift(LEFT * 0.25 * h)
    return VGroup(anse, corps, bande)


class StatsFreqMarginaleBase(PaysageI2):
    nom_voix = "stmg-stats-freq-marginale"
    fichier_marques = "stats_freq_marginale_marques.json"

    def tableau(self, trous=(), centre=None, **kw):
        opts = dict(titre=TITRE, largeur_case=1.7, largeur_libelle=2.0, hauteur=0.86, fs=32)
        opts.update(kw)
        t = croise_i2(COLONNES, LIGNES, VALS, trous=trous, **opts)
        if centre is None:
            return self.placer_tab(t)
        return t.move_to(centre)

    def tab_pret(self, trous=()):
        t = self.tableau(trous)
        self.add(t)
        return t

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Fréquence marginale", self.identite, self.ceinture)
        f = frac("?", "tout", 60).move_to(P(1.6, 0.15))
        h = hotel(1.3).move_to(P(-2.6, 0.2))
        tn = tente(1.0).move_to(P(-0.6, -0.15))
        self.au_mot("Fréquence marginale")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.au_mot("Sur toutes les nuits")
        self.play(FadeIn(h, shift=UP * 0.2), FadeIn(tn, shift=UP * 0.2), FadeIn(f[1:], scale=0.8), run_time=0.6)
        self.au_mot("quelle part")
        self.play(FadeIn(f[0], scale=0.5), run_time=0.4)
        self.insister(f, 1.2, 0.3)
        self.attendre_voix(marge=0.8)

    # ── 01 : la chargée d'études ────────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        h = hotel(1.7).move_to(P(-4.9, 1.1))
        tn = tente(1.25).move_to(P(-2.4, 0.45))
        self.play(FadeIn(h, shift=UP * 0.3), FadeIn(tn, shift=UP * 0.3), run_time=0.6)
        self.au_mot("38,2 millions")
        nb = self.ligne([("38,2", JAUNE_TITRE), ("millions de nuitées", WHITE)], 40)
        caser(nb, -6.4, -0.6, -1.4, -0.6)
        self.play(FadeIn(nb, scale=0.7), run_time=0.5)
        self.au_mot("Une nuitée, c'est")
        defi = self.ligne([("1 nuitée", AMBRE), ("=", WHITE), ("1 personne, 1 nuit", WHITE)], 34)
        caser(defi, -6.4, -0.6, -2.3, -1.7)
        self.play(FadeIn(defi, shift=UP * 0.2), run_time=0.5)
        self.au_mot("Une chargée d'études")
        metier = self.col(self.t("Chargée d'études", 44, BLEU_CALCUL), 2.7, xl=1.3)
        lieu = self.col(self.t("observatoire du tourisme", 32), 2.0, xl=1.3)
        self.play(FadeIn(metier, shift=UP * 0.2), FadeIn(lieu), run_time=0.5)
        self.au_mot("qui vivent à l'étranger")
        v = valise(0.9).move_to(P(2.2, 0.4))
        q = self.col(self.ligne([("part", WHITE), ("étrangère", AMBRE), ("?", ORANGE_RETENUE)], 40), 0.4, xl=3.0)
        self.play(FadeIn(v, shift=LEFT * 0.5), FadeIn(q, shift=RIGHT * 0.2), run_time=0.6)
        self.attendre_voix()

    # ── 02 : le tableau et ses marges ───────────────────────────────────────

    def ecran_tableau(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-tableau")
        t = self.tableau()
        self.au_mot("Voici son tableau")
        self.play(FadeIn(t, shift=UP * 0.2), run_time=0.6)
        self.au_mot("En ligne")
        l1 = self.col(self.ligne([("En ligne :", AMBRE), ("l'hébergement", WHITE)], 36), 2.6)
        self.play(FadeIn(l1, shift=RIGHT * 0.2), Indicate(VGroup(*[x[1] for x in t.libelles[:2]]), color=AMBRE), run_time=0.6)
        self.au_mot("En colonne")
        l2 = self.col(self.ligne([("En colonne :", AMBRE), ("où vit le client", WHITE)], 36), 1.85)
        self.play(FadeIn(l2, shift=RIGHT * 0.2), Indicate(VGroup(*[x[1] for x in t.tetes[:2]]), color=AMBRE), run_time=0.6)
        self.au_mot("ou à l'étranger")
        l3 = self.col(self.ligne([("en France", WHITE), ("ou", GREY_A), ("à l'étranger", AMBRE)], 34), 1.1)
        self.play(FadeIn(l3, shift=RIGHT * 0.2), *teinter_colonne(t, 1, "#fed7aa"), run_time=0.6)
        self.au_mot("Les marges sont les totaux")
        self.play(*eteindre(t), run_time=0.2)
        bords = [(0, 2), (1, 2), (2, 0), (2, 1), (2, 2)]
        l4 = self.col(self.ligne([("marges", VERT_OK), ("=", WHITE), ("totaux", WHITE)], 40), -0.1)
        self.play(FadeIn(l4, shift=RIGHT * 0.2), *teinter(t, bords, "#bbf7d0"), run_time=0.6)
        self.au_mot("10,9 millions")
        self.play(*allumer(t, 2, 1), run_time=0.4)
        self.au_mot("38,2 millions en tout")
        self.play(*allumer(t, 2, 2), run_time=0.4)
        self.attendre_voix()

    # ── 03 : la méthode ─────────────────────────────────────────────────────

    def ecran_methode(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-methode")
        t = self.tab_pret()
        self.au_mot("Une fréquence marginale")
        r = self.col(self.bloc(["fréquence marginale =", "marge ÷ total général"], 38, JAUNE_TITRE), 2.55)
        self.play(FadeIn(r, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Le numérateur")
        f = frac("10,9", "38,2", 50)
        ligne = egal(f, ("=", WHITE), ("0,285", WHITE), fs=46)
        self.calc(ligne, 0.55)
        self.play(*num_case(t, 2, 1), FadeIn(f.num, shift=DOWN * 0.2), run_time=0.5)
        self.au_mot("Le dénominateur")
        self.play(t.case(2, 2).animate.set_fill(REF).set_stroke(C_DEN, width=8), Create(f.barre),
                  FadeIn(f.den, shift=UP * 0.2), run_time=0.5)
        self.au_mot("égale environ 0,285")
        self.play(FadeIn(ligne[1:], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("soit 28,5 %")
        pc = self.calc(self.ligne([("soit", WHITE), ("28,5 %", VERT_OK)], 50), -0.9)
        self.play(FadeIn(pc, scale=0.7), run_time=0.4)
        self.insister(pc[1], 1.3, 0.25)
        self.au_mot("Plus d'une nuitée sur quatre")
        q = self.calc(self.t("plus d'1 nuitée sur 4", 34, GREY_A), -1.6)
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (les campings) ──────────────────────────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        t = self.tab_pret()

        def montrer():
            self.play(*num_case(t, 1, 2), t.case(2, 2).animate.set_fill(REF).set_stroke(C_DEN, width=8),
                      run_time=0.5)

        self.question_pause("04-question", "04b-reponse", ["Sur toutes les nuitées,", "quelle part en camping ?"],
                            ["35,9 %", "24,1 %", "41,3 %"], 0, ["13,7 ÷ 38,2 ≈ 35,9 %", "B : une case ; C : ÷ 10,9"],
                            x0=self.XL + 0.3, largeur=4.9, ys=(1.0, 0.1, -0.8), geste=montrer)

    # ── 05 : le complément à 100 % ──────────────────────────────────────────

    def ecran_complement(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-complement")
        t = self.tab_pret()
        self.au_mot("Et les clients")
        self.play(*teinter_colonne(t, 0, "#bbf7d0"), run_time=0.4)
        self.au_mot("font 100 %")
        r = self.col(self.bloc(["France + Étranger", "= 100 %"], 38, JAUNE_TITRE), 2.5)
        self.play(FadeIn(r, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("100 moins 28,5")
        c = self.calc(self.ligne([("100 − 28,5", WHITE), ("=", WHITE), ("71,5 %", VERT_OK)], 46), 1.1)
        self.play(FadeIn(c[0], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 71,5 %")
        self.play(FadeIn(c[1:], scale=0.7), run_time=0.4)
        self.au_mot("Je vérifie")
        self.play(*eteindre(t), run_time=0.2)
        f = frac("27,3", "38,2", 44)
        k = egal(f, ("≈", WHITE), ("71,5 %", VERT_OK), fs=44)
        self.calc(k, -0.55)
        self.play(*num_case(t, 2, 0), t.case(2, 2).animate.set_fill(REF).set_stroke(C_DEN, width=8),
                  FadeIn(k[0], shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("égale bien 71,5 %")
        ok = self.coche(VERT_OK, 0.3).next_to(k, RIGHT, buff=0.3)
        self.play(FadeIn(k[1:], scale=0.7), Create(ok), run_time=0.5)
        self.attendre_voix()

    # ── 06 : le piège (le mauvais dénominateur) ─────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-piege")
        t = self.tab_pret()
        self.au_mot("Le piège")
        tit = self.col(self.bloc(["Le piège :", "le mauvais dénominateur"], 40, ROUGE_ERREUR), 2.6)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("10,9 divisé par 24,5")
        f = frac("10,9", "24,5", 46, cd=ROUGE_ERREUR)
        self.calc(f, 0.75)
        self.play(*num_case(t, 2, 1), t.case(0, 2).animate.set_fill("#fecaca").set_stroke(ROUGE_ERREUR, width=8),
                  FadeIn(f, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Non !")
        x = croix(f, sw=7)
        self.play(Create(x), run_time=0.4)
        self.au_mot("44,5 %")
        faux = self.t("= 44,5 % ?", 40, ROUGE_ERREUR).next_to(f, RIGHT, buff=0.3)
        self.play(FadeIn(faux, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("je divise toujours par le total général")
        self.play(*eteindre(t), run_time=0.2)
        bon = self.calc(self.bloc(["÷ le total général,", "en bas à droite"], 38, VERT_OK), -0.9)
        fl = Arrow(bon.get_left() + LEFT * 0.1, t.case(2, 2).get_right() + RIGHT * 0.05, color=VERT_OK, buff=0.1,
                   stroke_width=6)
        self.play(FadeIn(bon, shift=UP * 0.2), *allumer(t, 2, 2, couleur="#bbf7d0", anneau=VERT_OK),
                  GrowArrow(fl), run_time=0.6)
        self.insister(t.case(2, 2), 1.15, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (quel quotient ?) ───────────────────────────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.question_large("07-question", "07b-reponse", ["Un stagiaire calcule 6,4 ÷ 10,9.", "Qu'a-t-il calculé ?"],
                            ["la part des hôtels, sur toutes les nuitées",
                             "la part des hôtels, parmi les nuitées de l'étranger",
                             "la part de l'étranger, sur toutes les nuitées"], 1,
                            ["÷ 10,9 : seulement l'étranger (conditionnelle)",
                             "A et C : il fallait diviser par 38,2"])

    # ── 08 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-defi")
        self.tab_pret()
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 50, JAUNE_TITRE), 2.9)
        self.play(Write(titre), run_time=0.6)
        self.au_mot("Un : quelle est")
        q1 = self.col(self.bloc(["1. Fréquence marginale", "des nuitées d'hôtel ?"], 38), 1.7)
        q1[0][:2].set_color(AMBRE)
        self.play(FadeIn(q1, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Deux : vérifie")
        q2 = self.col(self.bloc(["2. Vérifie avec", "les campings (35,9 %)."], 38), 0.25)
        q2[0][:2].set_color(AMBRE)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("Mets pause")
        self.play(Write(self.pause_defi(-1.15)), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08b-correction")
        t = self.tab_pret()
        titre = self.col(self.t("Correction", 50, JAUNE_TITRE), 2.9)
        self.play(Write(titre), run_time=0.5)
        self.au_mot("24,5 divisé par 38,2")
        f = frac("24,5", "38,2", 44)
        l1 = egal(f, ("≈", WHITE), ("64,1 %", VERT_OK), fs=44)
        n1 = self.t("1.", 42, AMBRE)
        g1 = self.calc(VGroup(n1, l1).arrange(RIGHT, buff=0.25), 1.35)
        self.play(*num_case(t, 0, 2), t.case(2, 2).animate.set_fill(REF).set_stroke(C_DEN, width=8),
                  FadeIn(VGroup(n1, f), shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("égale environ 64,1 %")
        self.play(FadeIn(l1[1:], scale=0.7), run_time=0.4)
        self.au_mot("64,1 plus 35,9")
        l2 = self.calc(self.ligne([("2.", AMBRE), ("64,1 + 35,9", WHITE), ("=", WHITE), ("100 %", VERT_OK)], 40), -0.2)
        self.play(FadeIn(l2[:2], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 100 %")
        self.play(FadeIn(l2[2:], scale=0.7), run_time=0.4)
        self.au_mot("C'est juste")
        ok = self.coche(VERT_OK, 0.3).next_to(l2, DOWN, buff=0.3).align_to(l2, LEFT)
        self.play(Create(ok), run_time=0.4)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("09-finale")
        t = self.placer_tab(self.tableau(), haut=2.7)
        self.add(t)
        lignes = self.finale([("marginale =", "marge ÷ total général"),
                              ("÷ l'effectif total,", "jamais une ligne"),
                              ("France + Étranger", "= 100 %")], [1.75, 0.2, -1.35], fs=38)
        self.au_mot("Une fréquence marginale")
        self.montrer_ligne(lignes[0], *allumer(t, 2, 1))
        self.au_mot("Le dénominateur est toujours")
        self.montrer_ligne(lignes[1], t.case(2, 2).animate.set_fill(REF).set_stroke(C_DEN, width=8))
        self.au_mot("Et les fréquences marginales")
        self.montrer_ligne(lignes[2])
        self.insister(lignes[2][1], 1.08, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_tableau()
        self.ecran_methode()
        self.ecran_question1()
        self.ecran_complement()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class StatsFreqMarginaleStmg(StatsFreqMarginaleBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "verte"
