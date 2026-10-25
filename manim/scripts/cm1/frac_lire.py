# frac_lire.py
# EleveAI — Maths CM1 ET CM2 — série « Fractions », épisode 01 : LIRE UNE
# FRACTION (micro du coach : fraction_lire, notion fraction, dans les DEUX
# classes), AVEC VOIX. Paysage 16:9. CEINTURES : CM1 VERTE (la notion de CM1,
# complète : numérateur, dénominateur, les noms des parts, le piège « quatrième »,
# la dictée, défi corrigé) ; CM2 JAUNE (la même vidéo est un rappel de CM1).
# Short jumeau : frac_lire_short.py (« 1 quart d'heure », blanche).
#
# Décor et métier : la CHOCOLATERIE ; Léo, CHOCOLATIER : une tablette de 8 carrés,
# il en offre 3 → 3/8 ; défi : tablette de 10, 1 mangé, 4 offerts → 4/10 = 2/5
# (en groupant par 2 : PRÉPARE la simplification sans la nommer). Aucune donnée
# du monde réel citée. Centres : cuisine.
# Vérifié (Python, fractions.Fraction) : 4/10 = 2/5 ; 10 − 1 − 4 = 5 carrés restent.
#
# Micro → écrans (banques cm1/maths/fractions-gabarits-a.ts, cm2/…-lire.ts) :
# rôle du dénominateur / numérateur (02-03, tpl_103 / tpl_1-2-3), numérateur
# (QUESTION 1, leurres 6 = l'inversion, 11 = la somme), les noms des parts
# (05, tpl_101 / tpl_6), le piège « quatrième » (06, ordinalFaux), la dictée
# (QUESTION 2, tpl_105 / tpl_7 : leurres 10/7 inversé, 7/100), défi (08).
# Écrans : 00 garde · 01 Léo · 02-03 en bas, en haut · 04 QUESTION 1 · 05 les
# noms · 06 le piège · 07 QUESTION 2 · 08 défi · 08b correction · 09 ce que tu
# as appris · 10 fin.
#
# Bases : frac_cm_commun.py (PaysageCM) ; canvas_fractions.py (non modifié).
# Voix : manim/voix/cm-frac-lire.json (débit −10), WAV dans public/sons/cm-frac-lire/ ;
# marques : manim/scripts/cm1/frac_lire_marques.json (marques_dump.ps1 + cues2marques.py).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/frac_lire.py FracLireCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/frac_lire.py FracLireCM1 -o eleveai-maths-cm1-frac-lire --media_dir manim/scripts/cm1/media-frac-lire
# CM2 : GARDE_SEULE=1 python -m manim render -qh --disable_caching manim/scripts/cm1/frac_lire.py FracLireCM2 -o garde-cm2-frac-lire --media_dir manim/scripts/cm1/media-frac-lire-cm2
#       puis frac_cm_commun.py coller (voir son en-tête) ; ou rendu complet de FracLireCM2.
# Sorties : manim/sorties/cm1/maths/fractions/01-lire/eleveai-maths-cm1-frac-lire.mp4
#           manim/sorties/cm2/maths/fractions/01-lire/eleveai-maths-cm2-frac-lire.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_cm_commun import *  # noqa: E402,F403

CHOCO, CHOCO_CLAIR = "#7c4a1e", "#d4a373"
XF = -3.3


def toque(p):
    """Une toque blanche de chocolatier sur la tête du personnage p."""
    c = p.tete.get_center()
    r = p.tete.width / 2
    bande = RoundedRectangle(width=r * 1.9, height=r * 0.45, corner_radius=0.05, fill_color=WHITE, fill_opacity=1,
                             stroke_width=0).move_to(c + UP * r * 0.95)
    bouffe = VGroup(*[Circle(radius=r * 0.48, fill_color=WHITE, fill_opacity=1, stroke_width=0)
                      .move_to(c + UP * r * 1.55 + RIGHT * x * r) for x in (-0.5, 0, 0.5)])
    return VGroup(bouffe, bande)


def chocolatier(s=1.0):
    p = personne(peau="#e0ac69", tenue="#7c2d12", cheveux="#3f2a14", s=s)
    p.add(toque(p))
    return p


def tablette(lignes=2, colonnes=4, cote=0.75, centre=ORIGIN):
    """Une tablette de chocolat dessinée (décor) : .liste des carrés."""
    g = Grille(lignes, colonnes, 0, cote=cote, vide=CHOCO, carte=False, centre=centre)
    for c in g.liste:
        c.set_stroke(CHOCO_CLAIR, 4)
        c.add(Square(cote * 0.62, stroke_color=CHOCO_CLAIR, stroke_width=2).move_to(c))
    return g


class FracLireBase(PaysageCM):
    nom_voix = "cm-frac-lire"
    fichier_marques = "frac_lire_marques.json"

    def ecrans(self):
        return [self.page_de_garde, self.ecran_situation, self.ecran_bas_haut, self.ecran_question1,
                self.ecran_noms, self.ecran_piege, self.ecran_question2, self.ecran_defi, self.ecran_correction,
                self.ecran_finale]

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Lire une fraction", self.identite, self.ceinture, y_ech=-2.7)
        self.au_mot("Lire")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        fr = [(3, 8), (2, 3), (1, 2)]
        objs = []
        for i, (n, d) in enumerate(fr):
            f = EcritureFraction(n, d, fs=84)
            m = self.inline(en_mots(n, d), 34, JAUNE_TITRE).next_to(f, DOWN, buff=0.3)
            objs.append(VGroup(f, m).move_to(P(-4.2 + 3.0 * i, 0.35)))
        self.montre([en_mots(n, d) for n, d in fr], objs)
        q = self.t("?", 110, AMBRE).move_to(P(4.1, 0.35))
        self.au_mot("comment lit-on")
        self.play(FadeIn(q, scale=0.4), run_time=0.4)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Léo, chocolatier ───────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = chocolatier(1.0).move_to(P(-5.15, -0.7))
        self.au_mot("Voici Léo")
        nom = self.t("Léo", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.3)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.5)
        self.au_mot("chocolatier")
        metier = self.t("chocolatier", 32, BLEU_CALCUL).next_to(pers, DOWN, buff=0.2)
        self.play(FadeIn(metier, shift=UP * 0.2), run_time=0.4)
        tb = tablette(centre=P(-2.0, 0.9))
        self.au_mot("une tablette")
        self.play(FadeIn(tb, shift=UP * 0.2), run_time=0.5)
        l1 = self.col(self.t("8 carrés pareils", 42), 2.2)
        self.au_nb("de 8")
        self.play(FadeIn(l1, shift=RIGHT * 0.2),
                  LaggedStart(*[Indicate(c, color=AMBRE, scale_factor=1.12) for c in tb.liste], lag_ratio=0.08),
                  run_time=0.8)
        l2 = self.col(self.t("3 carrés pour sa sœur", 42, BLEU_PART), 1.0)
        self.au_nb("Il en offre 3")
        self.play(FadeIn(l2, shift=RIGHT * 0.2), *[tb.liste[i].animate.shift(DOWN * 2.2 + LEFT * 0.3)
                                                    for i in (4, 5, 6)], run_time=0.7)
        self.au_mot("Quelle part")
        q = self.col(self.t("Quelle part de la tablette ?", 40, ORANGE_RETENUE), -0.3)
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.4)
        self.attendre_voix()

    # ── 02-03 : en bas, le dénominateur ; en haut, le numérateur ────────────
    def ecran_bas_haut(self):
        self.ecran("02-bas")
        g = Grille(2, 4, 0, cote=0.9, centre=P(XF, 0.6))
        self.add(g)
        f = EcritureFraction(3, 8, fs=130).move_to(P(2.0, 0.6))
        self.au_mot("tous les carrés")
        nums = VGroup(*[chiffre_sur(c, i + 1) for i, c in enumerate(g.liste)])
        self.play(LaggedStart(*[FadeIn(n, scale=1.5) for n in nums], lag_ratio=0.12), run_time=0.9)
        self.au_nb("carrés : 8")
        self.play(FadeIn(f.trait), FadeIn(f.den, scale=1.4), Indicate(nums[7], color=AMBRE, scale_factor=1.6),
                  run_time=0.45)
        e_den = etiquette(f.den, "dénominateur", RIGHT, fs=32)
        self.au_mot("C'est le dénominateur")
        self.play(GrowArrow(e_den[0]), FadeIn(e_den[1], shift=LEFT * 0.15), run_time=0.4)
        bas = self.t("en bas", 30, AMBRE).next_to(e_den[1], DOWN, buff=0.12).align_to(e_den[1], LEFT)
        self.au_mot("en bas")
        self.play(FadeIn(bas, shift=UP * 0.1), run_time=0.3)
        l1 = self.t("parts égales en tout", 34).move_to(P(XF, -1.4))
        self.au_mot("parts égales")
        self.play(FadeIn(l1, shift=UP * 0.15), Create(SurroundingRectangle(g.liste, color=AMBRE, buff=0.08)),
                  run_time=0.5)
        self.attendre_voix(marge=0.3)
        self.dire("03-haut")
        self.au_mot("carrés offerts")
        self.play(FadeOut(nums), FadeOut(l1), run_time=0.3)
        self.au_nb("offerts : 3")
        self.play(g.colorier([4, 5, 6], lag=0.15), FadeIn(f.num, scale=1.4), run_time=0.5)
        e_num = etiquette(f.num, "numérateur", RIGHT, fs=32)
        self.au_mot("C'est le numérateur")
        self.play(GrowArrow(e_num[0]), FadeIn(e_num[1], shift=LEFT * 0.15), run_time=0.4)
        haut = self.t("en haut", 30, AMBRE).next_to(e_num[1], UP, buff=0.12).align_to(e_num[1], LEFT)
        self.au_mot("en haut")
        self.play(FadeIn(haut, shift=DOWN * 0.1), run_time=0.3)
        l2 = self.t("parts prises", 34, BLEU_PART).move_to(P(XF, -1.4))
        self.au_mot("parts prises")
        self.play(FadeIn(l2, shift=UP * 0.15), run_time=0.35)
        lu = self.inline("3 huitièmes", 54, JAUNE_TITRE).move_to(P(1.9, -2.0))
        self.au_nb("On lit : 3")
        self.play(FadeIn(lu, scale=1.3), run_time=0.4)
        self.insister(lu, 1.15, 0.25)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (le numérateur de 5/6) ──────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        d = Disque(6, 5, rayon=1.35, centre=P(-2.2, -0.9))
        f = EcritureFraction(5, 6, fs=90).move_to(P(-2.2, 2.0))

        def avant(sc):
            sc.au_nb("Dans 5")
            sc.play(FadeIn(f, scale=1.2), d.apparaitre(0.6), run_time=0.6)

        e_num = etiquette(f.num, "numérateur", LEFT, couleur=VERT_OK, fs=30)
        e_den = etiquette(f.den, "dénominateur", LEFT, fs=30)

        def apres(sc):
            sc.au_nb("en haut : 5")
            sc.play(GrowArrow(e_num[0]), FadeIn(e_num[1]), Indicate(f.num, color=VERT_OK, scale_factor=1.5),
                    run_time=0.45)
            sc.au_mot("parts prises")
            sc.play(*[Indicate(d.parts[i], color=VERT_OK, scale_factor=1.08) for i in range(5)], run_time=0.6)
            sc.au_nb("Le dénominateur, 6")
            sc.play(GrowArrow(e_den[0]), FadeIn(e_den[1]), Indicate(f.den, color=AMBRE, scale_factor=1.5),
                    run_time=0.45)
            sc.au_mot("toutes les parts")
            sc.play(Indicate(VGroup(d.parts, d.traits), color=AMBRE, scale_factor=1.05), run_time=0.6)

        self.question_pause("04-question", "04b-reponse", ["Quel nombre est", "le numérateur ?"],
                            [self.inline("6"), self.inline("5"), self.inline("11")], 1,
                            ["Toutes les parts : en bas !"],
                            mot_q="Dans 5 sixièmes", avant_q=avant, autres_r=apres)

    # ── 05 : les noms des parts ─────────────────────────────────────────────
    def ecran_noms(self):
        self.ecran("05-noms")
        self.au_mot("Pour lire")
        self.titre("Le nom des parts")
        ys = [1.85, 0.85, -0.15, -1.15, -2.15]
        dens = [2, 3, 4, 5, 10]
        noms = ["des demis", "des tiers", "des quarts", "des cinquièmes", "des dixièmes"]
        mots = ["En 2 parts", "En 3", "En 4", "en 5", "En 10"]
        for k, (y, d, nm, mot) in enumerate(zip(ys, dens, noms, mots)):
            b = Barre(d, 1, largeur=5.0, hauteur=0.45, marge=0.12, sw=2, centre=P(XF, y))
            lg = VGroup(self.t(f"{d} :", 34, AMBRE), self.t(nm, 34, JAUNE_TITRE if k < 3 else WHITE))
            lg.arrange(RIGHT, buff=0.35)
            self.col(lg, y)
            self.au_nb(mot)
            self.play(b.apparaitre(0.5), FadeIn(lg[0], shift=RIGHT * 0.15), run_time=0.5)
            self.au_mot(nm.split()[1])
            self.play(FadeIn(lg[1], shift=RIGHT * 0.15), run_time=0.3)
            if k == 3:
                ieme = self.t("+ « ième »", 26, AMBRE).next_to(lg, DOWN, buff=0.08).align_to(lg[1], LEFT)
                self.play(FadeIn(ieme, scale=1.2), run_time=0.3)
        self.attendre_voix()

    # ── 06 : le piège « quatrième » ─────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention au piège")
        self.titre("Attention au piège !", ROUGE_ERREUR)
        lignes = []
        for y, (n, d), bon, faux in ((1.45, (3, 4), "3 quarts", "3 quatrièmes"), (-1.15, (1, 2), "1 demi", "1 deuxième")):
            f = EcritureFraction(n, d, fs=70).move_to(P(XF - 1.2, y))
            b = Barre(d, n, largeur=2.6, hauteur=0.5, marge=0.12, sw=2, centre=P(XF + 1.6, y))
            ok = self.inline(bon, 42, VERT_OK)
            ko = self.inline(faux, 42, ROUGE_ERREUR)
            VGroup(ok, ko).arrange(DOWN, aligned_edge=LEFT, buff=0.35)
            self.col(VGroup(ok, ko), y)
            lignes.append((f, b, ok, ko, bon, faux))
        for f, b, ok, ko, bon, faux in lignes:
            self.au_nb(bon + ",")
            self.play(FadeIn(f, scale=1.2), FadeIn(b), FadeIn(ok, shift=RIGHT * 0.15), run_time=0.45)
            self.au_nb(faux)
            self.play(FadeIn(ko, shift=RIGHT * 0.15), run_time=0.3)
            self.play(Create(croix(ko, sw=6)), Create(self.coche(VERT_OK, 0.28).next_to(ok, RIGHT, buff=0.25)),
                      run_time=0.35)
        self.au_mot("Pour 2")
        self.calc([("2,", AMBRE), ("3,", AMBRE), ("4 :", AMBRE), ("demi, tiers, quart", AMBRE)], -2.55, 38)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (la dictée : 7 dixièmes) ────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        pers = chocolatier(0.95).move_to(P(-5.4, -1.0))
        bulle = RoundedRectangle(width=4.4, height=1.5, corner_radius=0.3, fill_color=WHITE, fill_opacity=1,
                                 stroke_width=0).move_to(P(-3.0, 1.6))
        pointe = Polygon(P(-4.3, 0.95), P(-3.7, 0.95), P(-4.7, 0.3), fill_color=WHITE, fill_opacity=1,
                         stroke_width=0)
        dit = VGroup(Text("J'ai vendu", font_size=32, color=NUIT), Text("7 dixièmes !", font_size=38, color=NUIT,
                                                                         weight=BOLD))
        dit.arrange(DOWN, buff=0.1).move_to(bulle)
        for m in dit:
            m.sans_synchro = True
        pas_audit(dit[0])

        def avant(sc):
            sc.play(FadeIn(pers, shift=UP * 0.2), FadeIn(bulle), FadeIn(pointe), FadeIn(dit[0]), run_time=0.4)
            sc.au_nb("vendu 7")
            sc.play(FadeIn(dit[1], scale=1.2), run_time=0.3)

        def fr_choix(n, d):
            f = EcritureFraction(n, d, fs=40)
            return f

        self.question_pause("07-question", "07b-reponse", ["Quelle fraction", "écrit-il ?"],
                            [fr_choix(10, 7), fr_choix(7, 10), fr_choix(7, 100)], 1,
                            ["En haut : 7.", "Dixièmes : 10 en bas."],
                            mot_q="Léo dit", avant_q=avant)

    # ── 08 : défi (tablette de 10 : 1 mangé, 4 offerts) ─────────────────────
    def barre_defi(self):
        b = Barre(10, 0, largeur=5.4, hauteur=0.9, centre=P(XF, 0.9))
        return b

    def ecran_defi(self):
        self.ecran("08-defi", 0.5)
        self.au_mot("À toi de jouer")
        self.titre("À toi de jouer !", fs=50)
        b = self.barre_defi()
        l1 = self.col(self.t("10 carrés", 40), 2.0)
        self.au_nb("tablette de 10")
        self.play(b.apparaitre(0.6), FadeIn(l1, shift=RIGHT * 0.2), run_time=0.6)
        mange = self.col(self.t("1 mangé", 40, CHOCO_CLAIR), 1.15)
        self.au_nb("Il en mange 1")
        self.play(b.parts[9].animate.set_fill(CHOCO, 1), FadeIn(mange, shift=RIGHT * 0.2), run_time=0.4)
        offert = self.col(self.t("4 offerts", 40, BLEU_PART), 0.3)
        self.au_nb("il en offre 4")
        self.play(b.colorier(range(4), lag=0.15), FadeIn(offert, shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("Quelle fraction")
        q = self.col(self.bloc(["Quelle fraction", "a-t-il offerte ?"], 38, ORANGE_RETENUE), -0.8)
        self.poser_lignes(q, "up", 0.3)
        self.pause_defi(y=-1.9)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        self.titre("Correction", fs=50)
        b = Barre(10, 4, largeur=5.4, hauteur=0.9, centre=P(XF, 0.9))
        b.parts[9].set_fill(CHOCO, 1)
        self.add(b)
        f = EcritureFraction(4, 10, fs=84).move_to(P(2.0, 1.1))
        self.au_nb("tout : 10")
        self.play(FadeIn(f.trait), FadeIn(f.den, scale=1.4), run_time=0.4)
        self.au_nb("offerts : 4")
        self.play(FadeIn(f.num, scale=1.4), Indicate(VGroup(*b.parts[:4]), color=VERT_OK, scale_factor=1.08),
                  run_time=0.5)
        lu = self.col(self.inline("4 dixièmes", 46, JAUNE_TITRE), -0.75)
        self.au_nb("offert 4")
        self.play(FadeIn(lu, scale=1.2), run_time=0.35)
        self.au_mot("ne compte pas")
        self.play(b.parts[9].animate.set_fill(VIDE, 1), run_time=0.5)
        self.au_mot("en groupant")
        gr = b.groupes(2)
        self.play(Create(gr), run_time=0.6)
        b5, anim = b.regrouper(2, run_time=0.9)
        self.play(anim, FadeOut(gr))
        eg = VGroup(self.inline("=", 60), EcritureFraction(2, 5, fs=84, couleur=VERT_OK)).arrange(RIGHT, buff=0.3)
        eg.next_to(f, RIGHT, buff=0.3)
        eg[0].set_y(f.trait.get_y())
        eg[1].shift(UP * (f.trait.get_y() - eg[1].trait.get_y()))
        cinq = self.col(self.inline("= 2 cinquièmes", 46, VERT_OK), -1.6)
        self.au_nb("aussi 2")
        self.play(FadeIn(eg, scale=1.2), FadeIn(cinq, shift=RIGHT * 0.2), run_time=0.45)
        self.play(Create(self.encadrer(VGroup(f, eg), buff=0.15)), run_time=0.4)
        self.attendre_voix(marge=1.6)

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        f = EcritureFraction(3, 8, fs=90)
        g = Grille(2, 4, 3, cote=0.7)
        fig = VGroup(f, g).arrange(DOWN, buff=0.5)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("Le dénominateur, en bas,", "compte toutes les parts égales."),
                                                         ("Le numérateur, en haut,", "compte les parts prises."),
                                                         ("On lit : demis, tiers, quarts,", "cinquièmes, sixièmes…")],
                                     fs=36)
        self.au_mot("Le dénominateur")
        self.montrer_ligne(lignes[0])
        self.au_mot("Le numérateur")
        self.montrer_ligne(lignes[1])
        self.au_mot("On lit")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)


class FracLireCM1(FracLireBase):
    identite = "Maths CM1 — EleveAI"
    ceinture = "verte"


class FracLireCM2(FracLireBase):
    identite = "Maths CM2 — EleveAI"
    ceinture = "jaune"
