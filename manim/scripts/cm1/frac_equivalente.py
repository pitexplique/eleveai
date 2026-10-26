# frac_equivalente.py
# EleveAI — Maths CM1 ET CM2 — série « Fractions », épisode 05 : FRACTIONS
# ÉGALES (micro du coach : fraction_equivalente, notion fraction, dans les DEUX
# classes), AVEC VOIX. Paysage 16:9. Ce que PRÉPARE l'épisode : la
# SIMPLIFICATION (6e) — regrouper les parts 2 par 2, « ÷ 2 en haut ET en bas » —
# et le piège de ses élèves (soustraire : 6/8 → 4/6 ; ajouter : 3/4 → 4/5).
# CEINTURES : CM1 VERTE (la notion complète : couper, regrouper, la règle × / ÷,
# le piège, défi corrigé) ; CM2 JAUNE (la même vidéo est un rappel de CM1).
# Short jumeau : frac_equivalente_short.py (les 3 assiettes de pizza, blanche).
#
# Décor et métier : un JARDIN ; Awa, PAYSAGISTE, et son apprenti Tom : une
# plate-bande en 4 parts, 3 fleuries (3/4) ; Tom coupe chaque part en 2 → 6/8,
# la longueur fleurie ne bouge pas. Défi : 2/3 = …/6 (4). Aucune donnée du monde
# réel citée. Centres : nature-ecologie.
# Vérifié (Python, fractions.Fraction) : 3/4 = 6/8 ; 1/2 = 2/4 ; 4/10 = 2/5 ;
# 3/4 ≠ 4/5 (0,75 < 0,8) ; 6/8 ≠ 4/6 (0,75 > 0,667) ; 2/3 = 4/6.
#
# Micro → écrans (banques cm1/maths/fractions-gabarits-c.ts tpl_161-166,
# cm2/…-equivalente.ts) : même longueur coloriée (02, tpl_161), couper chaque
# part (02-03, tpl_162), × en haut et en bas (03), QUESTION 1 (1/2 = …/4),
# regrouper / ÷ (05, tpl_163-164 : PRÉPARE la simplification), le piège
# (06 : ajouter ou enlever, leurres du coach « ajoute » et de ses copies),
# QUESTION 2 (grille 4/10 → 2/5, tpl_163, leurres 2/8 = −2, 4/5 = ÷ en bas
# seulement), défi (08, tpl_162).
# Écrans : 00 garde · 01 Awa · 02 Tom coupe · 03 la règle × · 04 QUESTION 1 ·
# 05 regrouper ÷ · 06 le piège · 07 QUESTION 2 · 08 défi · 08b correction ·
# 09 ce que tu as appris · 10 fin.
#
# Bases : frac_cm_commun.py (PaysageCM, NON modifié) ; canvas_fractions.py.
# Voix : manim/voix/cm-frac-equivalente.json (débit −10), WAV dans
# public/sons/cm-frac-equivalente/ ; marques : frac_equivalente_marques.json
# (scripts/marques_dump.ps1 + scripts/cues2marques.py).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/frac_equivalente.py FracEquivalenteCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/frac_equivalente.py FracEquivalenteCM1 -o eleveai-maths-cm1-frac-equivalente --media_dir manim/scripts/cm1/media-frac-equivalente
# CM2 : GARDE_SEULE=1 python -m manim render -qh --disable_caching manim/scripts/cm1/frac_equivalente.py FracEquivalenteCM2 -o garde-cm2-frac-equivalente --media_dir manim/scripts/cm1/media-frac-equivalente-cm2
#       puis python manim/scripts/cm1/frac_cm_commun.py coller <cm1.mp4> <garde-cm2.mp4> <cm2.mp4>
# Sorties : manim/sorties/{cm1,cm2}/maths/fractions/05-equivalente/eleveai-maths-{cm1,cm2}-frac-equivalente.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_cm_commun import *  # noqa: E402,F403
from frac_cmj_commun import *  # noqa: E402,F403

XF = -3.3
FLEUR = VERT_PART


class FracEquivalenteBase(PaysageCM):
    nom_voix = "cm-frac-equivalente"
    fichier_marques = "frac_equivalente_marques.json"

    def ecrans(self):
        return [self.page_de_garde, self.ecran_situation, self.ecran_couper, self.ecran_egal, self.ecran_question1,
                self.ecran_regrouper, self.ecran_piege, self.ecran_question2, self.ecran_defi, self.ecran_correction,
                self.ecran_finale]

    def bande(self, n, k, y, largeur=5.4, h=0.8, colories=None, x=XF):
        return Barre(n, k, largeur=largeur, hauteur=h, couleur=FLEUR, colories=colories, centre=P(x, y))

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Fractions égales", self.identite, self.ceinture, y_ech=-2.7)
        self.au_mot("Fractions égales")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        f1 = EcritureFraction(3, 4, fs=96).move_to(P(-2.6, 0.35))
        f2 = EcritureFraction(6, 8, fs=96).move_to(P(1.2, 0.35))
        eg = self.t("=", 90).move_to(P(-0.7, f1.trait.get_y()))
        q = self.t("?", 80, AMBRE).next_to(eg, UP, buff=0.35)
        self.frac(f1, "3 quarts")
        self.frac(f2, "6 huitièmes")
        self.au_mot("la même chose")
        self.play(FadeIn(eg, scale=0.6), FadeIn(q, scale=0.4), run_time=0.4)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Awa, paysagiste ────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        awa = paysagiste(1.0).move_to(P(-5.3, -1.55))
        self.au_mot("Voici Awa")
        nom = self.t("Awa", 40, BLEU_CALCUL).next_to(awa, RIGHT, buff=0.3).shift(UP * 0.5)
        self.play(FadeIn(awa, shift=UP * 0.3), FadeIn(nom), run_time=0.5)
        self.au_mot("paysagiste")
        metier = self.t("paysagiste", 32, BLEU_CALCUL).next_to(nom, DOWN, buff=0.15).align_to(nom, LEFT)
        self.play(FadeIn(metier, shift=UP * 0.2), run_time=0.4)
        b = self.bande(4, 0, 1.6)
        self.au_mot("une longue plate-bande")
        self.play(FadeIn(b.carte), FadeIn(b.contour), FadeIn(b.parts), run_time=0.5)
        l1 = self.col(self.t("4 parts égales", 42), 2.2)
        self.au_nb("en 4")
        self.play(LaggedStart(*[Create(t) for t in b.traits], lag_ratio=0.3), FadeIn(l1, shift=RIGHT * 0.2),
                  run_time=0.7)
        l2 = self.col(self.t("3 parts fleuries", 42, FLEUR), 1.2)
        fl = fleurs_sur(b, range(3))
        self.au_nb("fleurit 3")
        self.play(b.colorier(range(3), lag=0.2), FadeIn(l2, shift=RIGHT * 0.2),
                  LaggedStart(*[GrowFromCenter(f) for f in fl], lag_ratio=0.1), run_time=0.7)
        f = EcritureFraction(3, 4, fs=90).move_to(P(2.6, -0.6))
        au_fil(self, [("3 quarts", [f], [])])
        self.insister(f, 1.15, 0.25)
        self.attendre_voix()

    # ── 02 : Tom coupe chaque part en 2 ─────────────────────────────────────
    def ecran_couper(self):
        self.ecran("02-couper")
        haut = self.bande(4, 3, 1.7, largeur=4.8, x=-3.9)
        self.add(haut, fleurs_sur(haut, range(3)))
        f34 = pas_audit(EcritureFraction(3, 4, fs=60).next_to(haut, RIGHT, buff=0.35))
        self.add(f34)
        tom = apprenti(0.6).move_to(P(-5.9, -1.9))
        self.au_mot("Tom")
        nom = self.t("Tom", 34, BLEU_CALCUL).next_to(tom, RIGHT, buff=0.2)
        bas = self.bande(4, 3, -0.4, largeur=4.8, x=-3.9)
        self.play(FadeIn(tom, shift=UP * 0.2), FadeIn(nom), FadeIn(bas), run_time=0.5)
        self.au_mot("coupe chaque part")
        b8, anim = bas.repartager(2, run_time=1.2)
        self.play(anim)
        l1 = self.col(self.t("8 parts", 42), 2.3)
        self.au_nb("il y a 8")
        self.play(FadeIn(l1, shift=RIGHT * 0.2), Indicate(b8.parts, color=AMBRE, scale_factor=1.04), run_time=0.5)
        fl8 = fleurs_sur(b8, range(6), r=0.09)
        self.au_nb("couvrent 6")
        self.play(LaggedStart(*[GrowFromCenter(x) for x in fl8], lag_ratio=0.08), run_time=0.6)
        f68 = EcritureFraction(6, 8, fs=90).move_to(P(2.6, 0.4))
        au_fil(self, [("6 huitièmes", [f68], [])])
        self.au_mot("la longueur fleurie")
        pt = haut.fin_coloriee(vers=-2.4)
        self.play(Create(pt), run_time=0.6)
        ok = self.col(self.t("même longueur !", 40, VERT_OK), -1.3)
        self.au_mot("n'a pas bougé")
        self.play(FadeIn(ok, scale=1.2), run_time=0.4)
        self.insister(ok, 1.15, 0.25)
        self.attendre_voix()

    # ── 03 : la règle × 2 ───────────────────────────────────────────────────
    def ecran_egal(self):
        self.ecran("03-egal")
        f, g = EcritureFraction(3, 4, fs=110), EcritureFraction(6, 8, fs=110)
        eg = egalite(f, g, buff=1.1).move_to(P(-3.1, 0.0))
        h, bs = fleches(f, g, "× 2", fs=48)
        au_fil(self, [("Alors 3", [f], []), ("égale 6", [eg[1], g], [])])
        ttl = self.col(self.t("Deux fractions égales", 42, JAUNE_TITRE), 2.9)
        self.au_mot("deux fractions égales")
        self.play(Write(ttl), run_time=0.5)
        c1 = ligne_calc(self, [("3", WHITE), ("×", AMBRE), ("2", AMBRE), ("=", WHITE), ("6", VERT_OK)], 1.5)
        c2 = ligne_calc(self, [("4", WHITE), ("×", AMBRE), ("2", AMBRE), ("=", WHITE), ("8", VERT_OK)], 0.5)
        au_fil(self, [("3 fois", [c1[0]], [Indicate(f.num, color=AMBRE)]),
                      ("3 fois 2", [c1[1], c1[2]], [Create(h[0]), FadeIn(h[1])]),
                      (("égale 6", 2), [c1[3], c1[4]], []),
                      ("4 fois", [c2[0]], [Indicate(f.den, color=AMBRE)]),
                      ("4 fois 2", [c2[1], c2[2]], [Create(bs[0]), FadeIn(bs[1])]),
                      ("égale 8", [c2[3], c2[4]], [])])
        regle = self.bloc(["On multiplie", "en haut ET en bas", "par le même nombre."], 38)
        regle[1].set_color(BLEU_CALCUL)
        regle[2].set_color(AMBRE)
        self.col(regle, -1.3)
        self.poser_lignes(regle, "fade", 0.35)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (1 demi = … quarts) ─────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        b2 = self.bande(2, 1, 1.0, largeur=5.0)
        b4 = self.bande(4, 0, -1.0, largeur=5.0)
        self.add(b2, b4)
        etat = {}

        def apres(sc):
            sc.au_mot("On coupe chaque demi")
            nb, anim = b2.repartager(2, run_time=0.9)
            sc.play(anim)
            etat["b"] = nb
            sc.au_mot("1 demi égale 2 quarts")
            sc.play(b4.colorier(range(2)), Create(nb.fin_coloriee(vers=-2.3)), run_time=0.7)

        self.question_pause("04-question", "04b-reponse", ["1 demi égale", "combien de quarts ?"],
                            [EcritureFraction(1, 4, fs=40), EcritureFraction(2, 4, fs=40),
                             EcritureFraction(3, 4, fs=40)], 1,
                            ["1 × 2 = 2", "2 × 2 = 4"], autres_r=apres)

    # ── 05 : regrouper 2 par 2 → ÷ 2 ────────────────────────────────────────
    def ecran_regrouper(self):
        self.ecran("05-regrouper")
        b = self.bande(8, 6, 2.2)
        fl = fleurs_sur(b, range(6), r=0.09)
        self.add(b, fl)
        self.add_foreground_mobjects(fl)
        f, g = EcritureFraction(6, 8, fs=88), EcritureFraction(3, 4, fs=88)
        eg = egalite(f, g, buff=1.0).move_to(P(XF, -1.25))
        h, bs = fleches(f, g, "÷ 2", fs=44, angle=TAU / 6)
        self.au_mot("Tom regroupe")
        gr = b.groupes(2)
        self.play(Create(gr), run_time=0.6)
        b4, anim = b.regrouper(2, run_time=1.0)
        self.play(anim, FadeOut(gr))
        c1 = ligne_calc(self, [("6", WHITE), ("÷", AMBRE), ("2", AMBRE), ("=", WHITE), ("3", VERT_OK)], 2.4)
        c2 = ligne_calc(self, [("8", WHITE), ("÷", AMBRE), ("2", AMBRE), ("=", WHITE), ("4", VERT_OK)], 1.4)
        au_fil(self, [("6 huitièmes", [f], []), ("redevient 3", [eg[1], g], []),
                      ("6 divisé", [c1[0]], []), ("6 divisé par 2", [c1[1], c1[2]], [Create(h[0]), FadeIn(h[1])]),
                      ("égale 3", [c1[3], c1[4]], []),
                      ("8 divisé", [c2[0]], []), ("8 divisé par 2", [c2[1], c2[2]], [Create(bs[0]), FadeIn(bs[1])]),
                      ("égale 4", [c2[3], c2[4]], [])])
        regle = self.bloc(["On divise", "en haut ET en bas", "par le même nombre."], 38)
        regle[1].set_color(BLEU_CALCUL)
        regle[2].set_color(AMBRE)
        self.col(regle, -0.3)
        self.poser_lignes(regle, "fade", 0.35)
        s = self.col(self.t("→ simplifier", 40, JAUNE_TITRE), -2.0)
        self.au_mot("simplification")
        self.play(FadeIn(s, scale=1.2), run_time=0.4)
        self.insister(s, 1.15, 0.25)
        self.remove_foreground_mobjects(fl)
        self.attendre_voix()

    # ── 06 : le piège (ajouter, enlever) ────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention au piège")
        self.titre("Attention au piège !", ROUGE_ERREUR)
        lignes = []
        for y, (a, b), (c, d), op in ((1.45, (3, 4), (4, 5), "+ 1"), (-1.2, (6, 8), (4, 6), "− 2")):
            ba = Barre(b, a, largeur=4.6, hauteur=0.42, marge=0.12, sw=2, couleur=FLEUR, centre=P(XF + 0.4, y + 0.45))
            bc = Barre(d, c, largeur=4.6, hauteur=0.42, marge=0.12, sw=2, couleur=ROUGE_COACH,
                       centre=P(XF + 0.4, y - 0.45))
            fa = pas_audit(EcritureFraction(a, b, fs=40).next_to(ba, LEFT, buff=0.2))
            fc = pas_audit(EcritureFraction(c, d, fs=40, couleur=ROUGE_ERREUR).next_to(bc, LEFT, buff=0.2))
            pt = ba.fin_coloriee(vers=-1.05)
            txt = VGroup(EcritureFraction(a, b, fs=56), self.inline(op + " →", 40, ROUGE_ERREUR),
                         EcritureFraction(c, d, fs=56, couleur=ROUGE_ERREUR)).arrange(RIGHT, buff=0.3)
            txt[1].set_y(txt[0].trait.get_y())
            self.col(txt, y)
            faux = self.t("Faux !", 40, ROUGE_ERREUR).next_to(txt, RIGHT, buff=0.35)
            lignes.append((ba, bc, fa, fc, pt, txt, faux))
        mots = [("ajoutent 1", "3 quarts", "4 cinquièmes", "Faux !"),
                ("enlèvent 2", "6 huitièmes", "4 sixièmes", "Faux aussi")]
        for (ba, bc, fa, fc, pt, txt, faux), (m0, m1, m2, m3) in zip(lignes, mots):
            au_fil(self, [(m0, [txt[1]], []), (m1, [txt[0], ba], []), (m2, [txt[2], bc], [])])
            self.au_mot(m3)
            self.play(FadeIn(faux, scale=1.3), Create(croix(txt[2], sw=6)), run_time=0.4)
        self.au_mot("Regarde les barres")
        self.play(*[Create(l[4]) for l in lignes], run_time=0.7)
        fin = self.col(self.t("On multiplie ou on divise.", 36, VERT_OK), -3.0, xl=-6.2)
        fin.set_x(0)
        self.au_mot("On multiplie, ou on divise")
        self.play(FadeIn(fin, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (la grille 4/10 → 2/5) ──────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = Grille(2, 5, colories=[0, 1, 5, 6], cote=0.9, centre=P(XF, 0.2))

        self.add(g)

        def apres(sc):
            sc.au_mot("4 divisé")
            sc.play(Create(g.entourer_colonnes()), run_time=0.6)

        self.question_pause("07-question", "07b-reponse", ["4 cases sur 10 bleues.", "Regroupe 2 par 2 :",
                                                           "quelle fraction ?"],
                            [EcritureFraction(2, 5, fs=40), EcritureFraction(2, 8, fs=40),
                             EcritureFraction(4, 5, fs=40)], 0,
                            ["4 ÷ 2 = 2 et 10 ÷ 2 = 5"], autres_r=apres)

    # ── 08 : défi (2 tiers = … sixièmes) ────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.5)
        self.au_mot("À toi de jouer")
        self.titre("À toi de jouer !", fs=50)
        b = self.bande(3, 2, 0.9)
        f = EcritureFraction(2, 3, fs=80).move_to(P(XF, -1.0))
        self.au_mot("2 tiers")
        self.play(b.apparaitre(0.6), FadeIn(f, scale=1.2), run_time=0.6)
        self.add(fleurs_sur(b, range(2)))
        l1 = self.col(self.t("Tom coupe en 6 parts.", 40), 1.6)
        self.au_nb("en 6")
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.4)
        q = self.col(self.bloc(["Combien de parts", "sont fleuries ?"], 40, ORANGE_RETENUE), 0.2)
        self.au_mot("Combien de parts")
        self.poser_lignes(q, "up", 0.3)
        self.pause_defi(y=-1.6)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        self.titre("Correction", fs=50)
        b = self.bande(3, 2, 1.7)
        self.add(b)
        f, g = EcritureFraction(2, 3, fs=90), EcritureFraction(4, 6, fs=90)
        eg = egalite(f, g, buff=1.0).move_to(P(XF, -1.2))
        h, bs = fleches(f, g, "× 2", fs=42, angle=TAU / 6)
        self.add(f)
        self.au_mot("chaque tiers en 2")
        b6, anim = b.repartager(2, run_time=1.0)
        self.play(anim)
        c1 = ligne_calc(self, [("3", WHITE), ("×", AMBRE), ("2", AMBRE), ("=", WHITE), ("6", VERT_OK),
                               ("parts", WHITE)], 1.6, 44)
        c2 = ligne_calc(self, [("2", WHITE), ("×", AMBRE), ("2", AMBRE), ("=", WHITE), ("4", VERT_OK),
                               ("fleuries", FLEUR)], 0.6, 44)
        au_fil(self, [("3 fois", [c1[0]], []), ("3 fois 2", [c1[1], c1[2]], [Create(bs[0]), FadeIn(bs[1])]),
                      ("égale 6", [c1[3], c1[4], c1[5], eg[1], g.trait, g.den], []),
                      (("2 fois", 1), [c2[0]], []), ("2 fois 2", [c2[1], c2[2]], [Create(h[0]), FadeIn(h[1])]),
                      ("égale 4", [c2[3], c2[4], c2[5], g.num], [Indicate(VGroup(*b6.parts[:4]), color=AMBRE,
                                                                          scale_factor=1.05)])])
        self.add(fleurs_sur(b6, range(4), r=0.1))
        self.au_mot("2 tiers égale")
        self.play(Create(self.encadrer(eg, buff=0.15)), run_time=0.4)
        self.attendre_voix(marge=1.6)

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        b1 = Barre(4, 3, largeur=4.0, hauteur=0.6, couleur=FLEUR)
        b2 = Barre(8, 6, largeur=4.0, hauteur=0.6, couleur=FLEUR)
        f1 = pas_audit(EcritureFraction(3, 4, fs=48))
        f2 = pas_audit(EcritureFraction(6, 8, fs=48))
        r1, r2 = VGroup(f1, b1).arrange(RIGHT, buff=0.3), VGroup(f2, b2).arrange(RIGHT, buff=0.3)
        fig = VGroup(r1, r2).arrange(DOWN, buff=0.5, aligned_edge=RIGHT)
        pt = b1.fin_coloriee(vers=-1.4)
        fig.add(pt)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("Deux fractions égales", "couvrent la même longueur."),
                                                         ("On multiplie, ou on divise,", "en haut et en bas,",
                                                          "par le même nombre."),
                                                         ("On n'ajoute pas,", "on n'enlève pas.")], fs=36)
        self.au_mot("Deux fractions égales")
        self.montrer_ligne(lignes[0])
        self.au_mot("On multiplie")
        self.montrer_ligne(lignes[1])
        self.au_mot("On n'ajoute pas")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)


class FracEquivalenteCM1(FracEquivalenteBase):
    identite = "Maths CM1 — EleveAI"
    ceinture = "verte"


class FracEquivalenteCM2(FracEquivalenteBase):
    identite = "Maths CM2 — EleveAI"
    ceinture = "jaune"
