# frac_representer.py
# EleveAI — Maths CM1 ET CM2 — série « Fractions », épisode 02 : REPRÉSENTER
# UNE FRACTION (micro du coach : fraction_representer, dans les DEUX classes),
# AVEC VOIX. Paysage 16:9. CEINTURES : CM1 VERTE (la notion complète : lire une
# figure, dessiner, parts égales, grille, partie non coloriée, défi « 1 quart de
# 12 ») ; CM2 JAUNE (rappel de CM1).
# Short jumeau : frac_representer_short.py (4 façons de couper en quarts, blanche).
#
# Décor et métier : la FERME ; Maya, ÉLEVEUSE DE POULES : boîte de 6 places,
# 4 pleines → 4/6 ; plateau de 2 × 6 = 12 cases, 5 vides → 5/12 ; défi :
# 1 quart de 12 œufs = 3 (et 3/12 = 1/4 : PRÉPARE la simplification sans la
# nommer). Aucune donnée du monde réel citée. Centres : animaux, cuisine.
# Vérifié (Python) : 2 × 6 = 12 ; 7 + 5 = 12 ; 10 − 3 = 7 ; 12 ÷ 4 = 3 ;
# Fraction(3, 12) == Fraction(1, 4).
#
# Micro → écrans (banques cm1/…-gabarits-a.ts tpl_111-116, cm2/…-representer.ts) :
# lire une figure (02, tpl_111 / tpl_1), dessiner n/d (03, tpl_112 / tpl_7),
# combien colorier (QUESTION 1, leurres 8 = le dénominateur, 3 = le reste),
# parts égales (05, le piège unequalParts), grille lignes × colonnes (06,
# tpl_115 / tpl_3), non colorié (QUESTION 2, tpl_113 / tpl_4 : leurres 3/10,
# 7/3), grande figure : 1/4 de 12 (défi, tpl_116 / tpl_8).
# Écrans : 00 garde · 01 Maya · 02 lire 4/6 · 03 dessiner 3/4 · 04 QUESTION 1 ·
# 05 parts égales · 06 la grille · 07 QUESTION 2 · 08 défi · 08b correction ·
# 09 ce que tu as appris · 10 fin.
#
# Bases : frac_cm_commun.py (PaysageCM, barre_inegale, disque_inegal) ;
# canvas_fractions.py (non modifié).
# Voix : manim/voix/cm-frac-representer.json (débit −10) ; marques :
# manim/scripts/cm1/frac_representer_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/frac_representer.py FracRepresenterCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/frac_representer.py FracRepresenterCM1 -o eleveai-maths-cm1-frac-representer --media_dir manim/scripts/cm1/media-frac-representer
# CM2 : garde seule (GARDE_SEULE=1, classe FracRepresenterCM2) puis frac_cm_commun.py coller.
# Sorties : manim/sorties/{cm1,cm2}/maths/fractions/02-representer/eleveai-maths-{cm1,cm2}-frac-representer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_cm_commun import *  # noqa: E402,F403

CARTON, CARTON_F, OEUF = "#c8a165", "#a8834c", "#fef3c7"
XF = -3.3


def chapeau_paille(p):
    c = p.tete.get_center()
    r = p.tete.width / 2
    bord = Ellipse(width=r * 3.0, height=r * 0.5, fill_color="#eab308", fill_opacity=1, stroke_width=0)
    haut = RoundedRectangle(width=r * 1.5, height=r * 0.8, corner_radius=r * 0.3, fill_color="#facc15",
                            fill_opacity=1, stroke_width=0)
    bord.move_to(c + UP * r * 0.75)
    haut.next_to(bord, UP, buff=-r * 0.2)
    return VGroup(haut, bord)


def eleveuse(s=1.0):
    p = personne(peau="#f1c27d", tenue="#65a30d", cheveux="#78350f", longs=True, s=s)
    p.add(chapeau_paille(p))
    return p


def poule(s=0.5, sens=1):
    corps = Ellipse(width=1.3, height=0.95, fill_color=WHITE, fill_opacity=1, stroke_width=0)
    tete = Circle(radius=0.27, fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(P(0.55 * sens, 0.5))
    crete = VGroup(*[Circle(radius=0.08, fill_color="#dc2626", fill_opacity=1, stroke_width=0)
                     .move_to(P((0.48 + 0.1 * i) * sens, 0.8)) for i in range(3)])
    bec = Triangle(fill_color="#f59e0b", fill_opacity=1, stroke_width=0).scale(0.09).rotate(-PI / 2 * sens)
    bec.move_to(P(0.86 * sens, 0.48))
    oeil = Dot(P(0.6 * sens, 0.55), radius=0.04, color=NUIT)
    pattes = VGroup(*[Line(P(x, -0.45), P(x, -0.8), color="#f59e0b", stroke_width=4) for x in (-0.15, 0.15)])
    return VGroup(pattes, corps, tete, crete, bec, oeil).scale(s)


def boite_oeufs(lignes, colonnes, pleins=(), cote=0.7, centre=ORIGIN):
    """Une boîte à œufs (décor) : .cases[i] (ordre de lecture) .oeufs[i] (None si vide)."""
    cases = VGroup(*[RoundedRectangle(width=cote * 0.92, height=cote * 0.92, corner_radius=cote * 0.2,
                                      fill_color=CARTON_F, fill_opacity=1, stroke_width=0)
                     .move_to(P((i % colonnes - (colonnes - 1) / 2) * cote, ((lignes - 1) / 2 - i // colonnes) * cote))
                     for i in range(lignes * colonnes)])
    fond = RoundedRectangle(width=colonnes * cote + 0.3, height=lignes * cote + 0.3, corner_radius=0.15,
                            fill_color=CARTON, fill_opacity=1, stroke_width=0)
    oeufs = [Ellipse(width=cote * 0.55, height=cote * 0.7, fill_color=OEUF, fill_opacity=1, stroke_width=0)
             .move_to(cases[i]) if i in pleins else None for i in range(lignes * colonnes)]
    g = VGroup(fond, cases).move_to(centre)
    for i, o in enumerate(oeufs):
        if o is not None:
            o.move_to(cases[i])
    g.cases, g.oeufs = cases, oeufs
    return g


class FracRepresenterBase(PaysageCM):
    nom_voix = "cm-frac-representer"
    fichier_marques = "frac_representer_marques.json"

    def ecrans(self):
        return [self.page_de_garde, self.ecran_situation, self.ecran_lire, self.ecran_dessiner,
                self.ecran_question1, self.ecran_piege, self.ecran_grille, self.ecran_question2, self.ecran_defi,
                self.ecran_correction, self.ecran_finale]

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Représenter une fraction", self.identite, self.ceinture, y_ech=-2.7)
        self.au_mot("Représenter")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        f = EcritureFraction(2, 3, fs=110).move_to(P(-2.6, 0.3))
        fl = Arrow(P(-1.5, 0.3), P(0.3, 0.3), color=AMBRE, stroke_width=6, buff=0)
        cadre = RoundedRectangle(width=2.6, height=2.0, corner_radius=0.22, fill_color=CARTE, fill_opacity=1,
                                 stroke_color=GRILLE, stroke_width=3).move_to(P(1.9, 0.3))
        q = Text("?", font_size=110, color=ORANGE_TROU).move_to(cadre)
        self.au_nb("dessiner 2")
        self.play(FadeIn(f, scale=1.2), run_time=0.4)
        self.play(GrowArrow(fl), FadeIn(cadre), FadeIn(q, scale=0.5), run_time=0.5)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Maya, éleveuse de poules ───────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = eleveuse(1.0).move_to(P(-5.15, -0.7))
        self.au_mot("Voici Maya")
        nom = self.t("Maya", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.3)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.5)
        self.au_mot("éleveuse")
        metier = self.bloc(["éleveuse", "de poules"], 28, BLEU_CALCUL).next_to(pers, DOWN, buff=0.15)
        bloc_fixe(metier)
        self.play(FadeIn(metier, shift=UP * 0.2), run_time=0.4)
        poules = VGroup(poule(0.55, -1), poule(0.45, 1)).arrange(RIGHT, buff=0.4).move_to(P(-2.2, -1.7))
        self.au_mot("ont pondu")
        self.play(LaggedStart(*[FadeIn(x, shift=UP * 0.2) for x in poules], lag_ratio=0.3), run_time=0.6)
        bt = boite_oeufs(2, 3, pleins=range(4), cote=0.85, centre=P(-2.2, 1.1))
        l1 = self.col(self.inline("une boîte de 6 places", 40), 1.6)
        self.au_nb("boîte de 6")
        self.play(FadeIn(bt, shift=DOWN * 0.2), FadeIn(l1, shift=RIGHT * 0.2), run_time=0.5)
        l2 = self.col(self.inline("4 places pleines", 40, OEUF), 0.5)
        self.au_nb("places. 4")
        self.play(LaggedStart(*[FadeIn(o, scale=0.4) for o in bt.oeufs if o is not None], lag_ratio=0.2),
                  FadeIn(l2, shift=RIGHT * 0.2), run_time=0.7)
        self.au_mot("Quelle fraction")
        q = self.col(self.bloc(["Quelle fraction de", "la boîte est pleine ?"], 38, ORANGE_RETENUE), -0.85)
        self.poser_lignes(q, "up", 0.3)
        self.attendre_voix()

    # ── 02 : lire la boîte : 4 sixièmes ─────────────────────────────────────
    def ecran_lire(self):
        self.ecran("02-lire")
        g = Grille(2, 3, 0, cote=1.0, centre=P(XF, 0.7))
        self.add(g)
        f = EcritureFraction(4, 6, fs=130).move_to(P(2.2, 0.6))
        nums = VGroup(*[chiffre_sur(c, i + 1) for i, c in enumerate(g.liste)])
        self.au_mot("toutes les places")
        self.play(LaggedStart(*[FadeIn(n, scale=1.5) for n in nums], lag_ratio=0.12), run_time=0.7)
        self.au_nb("places : 6")
        self.play(FadeIn(f.trait), FadeIn(f.den, scale=1.4), Indicate(nums[5], color=AMBRE, scale_factor=1.6),
                  run_time=0.45)
        e_den = etiquette(f.den, "en bas", RIGHT, fs=34)
        self.au_mot("en bas")
        self.play(GrowArrow(e_den[0]), FadeIn(e_den[1]), run_time=0.35)
        self.au_nb("pleines : 4")
        self.play(FadeOut(nums), g.colorier(range(4), lag=0.12), FadeIn(f.num, scale=1.4), run_time=0.6)
        e_num = etiquette(f.num, "en haut", RIGHT, couleur=BLEU_PART, fs=34)
        self.au_mot("en haut")
        self.play(GrowArrow(e_num[0]), FadeIn(e_num[1]), run_time=0.35)
        lu = self.inline("4 sixièmes", 50, JAUNE_TITRE).move_to(P(XF, -1.6))
        self.au_nb("aux 4")
        self.play(FadeIn(lu, scale=1.3), run_time=0.4)
        self.insister(lu, 1.15, 0.25)
        self.attendre_voix()

    # ── 03 : dessiner 3 quarts ──────────────────────────────────────────────
    def ecran_dessiner(self):
        self.ecran("03-dessiner")
        self.au_nb("dessiner 3")
        t = self.titre("Dessiner 3 quarts")
        f = EcritureFraction(3, 4, fs=100).move_to(P(2.0, 0.6))
        b = Barre(1, 0, largeur=5.0, hauteur=0.8, centre=P(XF, 1.4))
        self.play(FadeIn(b), run_time=0.3)
        self.au_nb("le bas : 4")
        self.play(FadeIn(f.trait), FadeIn(f.den, scale=1.4), run_time=0.35)
        l1 = self.col(self.t("4 parts égales", 36, AMBRE), -1.0)
        self.au_nb("en 4")
        b4, anim = b.repartager(4, run_time=0.7)
        self.play(anim, FadeIn(l1, shift=RIGHT * 0.15))
        self.au_nb("le haut : 3")
        self.play(FadeIn(f.num, scale=1.4), run_time=0.35)
        l2 = self.col(self.t("3 parts coloriées", 36, BLEU_PART), -1.7)
        self.au_nb("colorie 3")
        self.play(b4.colorier(range(3), lag=0.25), FadeIn(l2, shift=RIGHT * 0.15), run_time=0.8)
        d = Disque(4, 0, rayon=1.15, centre=P(XF, -1.55))
        self.au_mot("avec un disque")
        self.play(d.apparaitre(0.6), run_time=0.6)
        self.play(d.colorier(range(3), lag=0.25), run_time=0.7)
        self.au_mot("c'est pareil")
        self.play(Indicate(VGroup(*b4.parts[:3]), color=VERT_OK, scale_factor=1.05),
                  Indicate(VGroup(*d.parts[:3]), color=VERT_OK, scale_factor=1.05), run_time=0.6)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (5/8 : combien colorier ?) ──────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        f = EcritureFraction(5, 8, fs=90).move_to(P(XF, 1.7))
        b = Barre(8, 0, largeur=5.2, hauteur=0.8, centre=P(XF, -0.6))

        def avant(sc):
            sc.au_nb("dessiner 5")
            sc.play(FadeIn(f, scale=1.2), b.apparaitre(0.5), run_time=0.5)

        def apres(sc):
            sc.au_mot("en 8 parts")
            sc.play(Indicate(f.den, color=AMBRE, scale_factor=1.4), run_time=0.4)
            sc.au_nb("colorie 5")
            sc.rep(0, avec=[b.colorier(range(5), lag=0.15, run_time=0.6), Indicate(f.num, color=VERT_OK,
                                                                                    scale_factor=1.4)])
            sc.rep_fin()

        self.question_pause("04-question", "04b-reponse", ["Combien de parts", "faut-il colorier ?"],
                            [self.inline("8"), self.inline("5"), self.inline("3")], 1,
                            ["On en colorie 5 !"], mot_q="Pour dessiner", avant_q=avant, autres_r=apres)

    # ── 05 : le piège : des parts égales ────────────────────────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        self.au_mot("Attention au piège")
        self.titre("Attention au piège !", ROUGE_ERREUR)
        r = self.col(self.t("Des parts égales !", 44, AMBRE), 1.6)
        self.au_mot("doivent être égales")
        self.play(FadeIn(r, scale=1.2), run_time=0.4)
        gal = disque_inegal((50, 80, 100, 130), rayon=1.0, centre=P(-4.95, 0.5), k=1)
        self.au_mot("Cette galette")
        self.play(FadeIn(gal, scale=0.9), run_time=0.5)
        ko = self.t("pas des quarts", 28, ROUGE_ERREUR).next_to(gal, DOWN, buff=0.3)
        self.au_mot("pas des quarts")
        self.play(FadeIn(ko), Create(croix(gal, sw=6)), run_time=0.4)
        ok_d = Disque(4, 1, rayon=1.0, centre=P(-1.9, 0.5))
        self.au_mot("Ici")
        self.play(ok_d.apparaitre(0.6), run_time=0.6)
        ok = self.t("des quarts", 28, VERT_OK).next_to(ok_d, DOWN, buff=0.3)
        self.au_mot("ce sont des quarts")
        self.play(FadeIn(ok), Create(self.coche(VERT_OK, 0.35).next_to(ok, RIGHT, buff=0.15)), run_time=0.4)
        self.attendre_voix()

    # ── 06 : la grille (12 cases, 5 vides) ──────────────────────────────────
    def ecran_grille(self):
        self.ecran("06-grille")
        self.au_mot("Avec une grille")
        self.titre("Avec une grille")
        g = Grille(2, 6, 0, cote=0.8, centre=P(XF, 0.9))
        self.au_mot("Le plateau")
        self.play(g.apparaitre(0.6), run_time=0.6)
        self.au_nb("2 rangées")
        self.play(Create(g.entourer_lignes()), run_time=0.5)
        self.au_nb("de 6")
        self.play(*[Indicate(c, color=AMBRE, scale_factor=1.15) for c in g.cases[0]], run_time=0.5)
        self.au_mot("2 fois 6")
        self.calc([("2 × 6 =", WHITE), ("12 cases", BLEU_CALCUL)], 1.6, 42)
        pleines = [0, 1, 2, 3, 6, 7, 8]
        vides = [i for i in range(12) if i not in pleines]
        self.au_nb("7 sont pleines")
        l2 = self.col(self.inline("7 pleines", 40, BLEU_PART), 0.6)
        self.play(g.colorier(pleines, lag=0.08, run_time=0.6), FadeIn(l2, shift=RIGHT * 0.15), run_time=0.6)
        self.au_nb("et 5")
        l3 = self.col(self.inline("5 vides", 40, AMBRE), -0.3)
        cadres = VGroup(*[SurroundingRectangle(g.liste[i], color=AMBRE, buff=0.03, stroke_width=5) for i in vides])
        self.play(Create(cadres), FadeIn(l3, shift=RIGHT * 0.15), run_time=0.5)
        f = EcritureFraction(5, 12, fs=80, couleur=AMBRE).move_to(P(XF - 1.2, -1.5))
        lu = self.inline("5 douzièmes", 44, JAUNE_TITRE).next_to(f, RIGHT, buff=0.5)
        self.au_nb("font 5")
        self.play(FadeIn(f, scale=1.2), FadeIn(lu, shift=RIGHT * 0.15), run_time=0.45)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (la partie NON coloriée : 7/10) ─────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        b = Barre(10, 3, largeur=5.4, hauteur=0.8, centre=P(XF, 1.2))

        def avant(sc):
            sc.au_nb("parts égales. 3")
            sc.play(b.apparaitre(0.6), run_time=0.6)

        def apres(sc):
            sc.au_nb("10 parts")
            sc.play(Indicate(VGroup(b.parts, b.traits), color=AMBRE, scale_factor=1.04), run_time=0.4)
            sc.au_nb("10 moins")
            sc.calc_ici([("10 −", WHITE), ("3 =", WHITE), ("7", VERT_OK), ("blanches", VERT_OK)], P(XF, -0.3), 40)
            sc.au_nb("en haut : 7")
            sc.rep(0, avec=[Indicate(VGroup(*b.parts[3:]), color=VERT_OK, scale_factor=1.05)])
            sc.rep_fin()

        self.question_pause("07-question", "07b-reponse", ["Quelle fraction", "n'est pas coloriée ?"],
                            [self.inline("3/10"), self.inline("7/10"), self.inline("7/3")], 1,
                            ["7 dixièmes !"], mot_q="Une barre", avant_q=avant, autres_r=apres)

    # ── 08 : défi (1 quart de 12 œufs) ──────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        self.titre("À toi de jouer !", fs=50)
        bt = boite_oeufs(2, 6, pleins=range(12), cote=0.8, centre=P(XF, 0.8))
        l1 = self.col(self.t("12 œufs", 42), 1.8)
        self.au_nb("boîte de 12")
        self.play(FadeIn(bt), LaggedStart(*[FadeIn(o, scale=0.4) for o in bt.oeufs], lag_ratio=0.05),
                  FadeIn(l1, shift=RIGHT * 0.2), run_time=0.8)
        gat = self.inline("1 quart pour un gâteau", 40, BLEU_PART)
        self.col(gat, 0.8)
        self.au_nb("prend 1")
        self.play(FadeIn(gat, shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("Combien d'œufs")
        q = self.col(self.t("Combien d'œufs ?", 42, ORANGE_RETENUE), -0.3)
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.35)
        self.pause_defi(y=-1.6)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        self.titre("Correction", fs=50)
        g = Grille(2, 6, 0, cote=0.8, centre=P(XF, 0.8))
        self.add(g)
        paquets = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [9, 10, 11]]
        cadres = VGroup(*[SurroundingRectangle(VGroup(*[g.liste[i] for i in p]), color=AMBRE, buff=0.05,
                                               stroke_width=6, corner_radius=0.05) for p in paquets])
        self.au_nb("en 4 paquets")
        self.play(LaggedStart(*[Create(c) for c in cadres], lag_ratio=0.25), run_time=0.8)
        self.au_mot("12 divisé")
        self.calc([("12 ÷", WHITE), ("4 =", WHITE), ("3", BLEU_CALCUL)], 1.8, 46)
        self.au_nb("prend 1 paquet")
        self.play(g.colorier(paquets[0], lag=0.15, run_time=0.5), run_time=0.5)
        r = self.col(self.t("3 œufs !", 50, VERT_OK), 0.7)
        self.au_nb("paquet : 3")
        self.play(FadeIn(r, scale=1.3), run_time=0.35)
        self.play(Create(self.encadrer(r, buff=0.12)), run_time=0.3)
        eg = egalite(EcritureFraction(3, 12, fs=72), EcritureFraction(1, 4, fs=72, couleur=VERT_OK))
        self.col(eg, -1.0)
        self.au_nb("œufs. 3")
        self.play(FadeIn(eg[0], scale=1.2), run_time=0.35)
        self.au_nb("que 1")
        self.play(FadeIn(eg[1:], scale=1.2), run_time=0.35)
        self.attendre_voix(marge=1.2)

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        fig = VGroup(Barre(4, 3, largeur=3.2, hauteur=0.55, marge=0.15),
                     Disque(4, 3, rayon=0.85, marge=0.15),
                     Grille(2, 3, 4, cote=0.55, marge=0.15)).arrange(DOWN, buff=0.3)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("On partage en parts égales,", "autant que le dénominateur."),
                                                         ("On colorie autant de parts", "que le numérateur."),
                                                         ("Barre, disque ou grille :", "toutes les formes !")], fs=36)
        self.au_mot("On partage")
        self.montrer_ligne(lignes[0])
        self.au_mot("On colorie")
        self.montrer_ligne(lignes[1])
        self.au_mot("Barre")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)


class FracRepresenterCM1(FracRepresenterBase):
    identite = "Maths CM1 — EleveAI"
    ceinture = "verte"


class FracRepresenterCM2(FracRepresenterBase):
    identite = "Maths CM2 — EleveAI"
    ceinture = "jaune"
