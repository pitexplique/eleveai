# decimal_lire_ecrire.py
# EleveAI — Maths 6e — série « Nombres décimaux », épisode 01 : LIRE ET ÉCRIRE UN DÉCIMAL
# (micro decimal_lire_ecrire, notion decimal_nombre), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : film Ti Margo (prototypes/ti-margo/films/decimaux.js, épisode lire-ecrire).
# Décor et métier : Léna, VÉTÉRINAIRE (centre : animaux).
# Écrans : garde (00), situation (01), dixièmes (02), écrire (03), centièmes (04),
# QUESTION 1 (05), fraction (06), le zéro (07), QUESTION 2 (08), piège (09), défi (10)
# et correction (10b), appris (11), fin (12).
# Voix : manim/voix/6e-decimal-lire-ecrire.json (Julie, débit −6) ;
# marques : decimal_lire_ecrire_marques.json (python manim/scripts/6e/decimal_marques.py lire-ecrire).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/decimal_lire_ecrire.py DecimalLireEcrire6e
# python -m manim render -qh --disable_caching manim/scripts/6e/decimal_lire_ecrire.py DecimalLireEcrire6e -o eleveai-maths-6e-decimal-lire-ecrire --media_dir manim/scripts/6e/media-dec-01
# Sortie : manim/sorties/6e/maths/decimaux/01-lire-ecrire/eleveai-maths-6e-decimal-lire-ecrire.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from decimal_commun import *  # noqa: E402,F403


class DecimalLireEcrireBase(PaysageDecimal):
    nom_voix = "6e-decimal-lire-ecrire"
    fichier_marques = "decimal_lire_ecrire_marques.json"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Lire et écrire un nombre décimal", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Lire")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        tb = TableauNum(larg=1.75, h=0.95).move_to(P(2.6, 0.35))
        q = self.bloc(["Où se place", "chaque chiffre ?"], 44).move_to(P(-3.6, 0.35))
        self.au_mot("Où se place")
        self.play(FadeIn(q, shift=UP * 0.2), FadeIn(tb), run_time=0.3)
        self.play(LaggedStart(*[Indicate(e, scale_factor=1.25) for e in tb.entetes], lag_ratio=0.3), run_time=0.9)
        self.attendre_voix(marge=0.6)

    # ── 01 : Léna, vétérinaire ──────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        le = lena(1.05).move_to(P(-5.2, 0.1))
        self.au_mot("Voici Léna")
        nom = self.t("Léna", 44, BLEU_CALCUL).next_to(le, UP, buff=0.2)
        self.play(FadeIn(le, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("vétérinaire")
        met = self.t("vétérinaire", 32, BLEU_CALCUL).next_to(le, DOWN, buff=0.18)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("Elle pèse")
        ba = balance(1.1).move_to(P(-1.9, -1.2))
        ch = chaton(1.0).next_to(ba.plateau, UP, buff=0.02)
        self.play(FadeIn(ba, shift=UP * 0.2), run_time=0.35)
        self.au_mot("un chaton")
        self.play(FadeIn(ch, shift=DOWN * 0.6), run_time=0.45)
        self.au_mot("1 kilogramme")
        l1 = self.bloc(["1 kilogramme,", "et un peu plus."], 38)
        self.col(l1, 2.2)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("et un peu plus")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Wiggle(ba.ecran), run_time=0.45)
        self.au_mot("Elle dit")
        l2 = self.ligne([("1 unité", BLEU_D), ("et", WHITE), ("4 dixièmes", AMBRE_D)], 42)
        self.col(l2, 0.55)
        self.au_mot("1 unité")
        self.play(FadeIn(l2[0], scale=1.2), run_time=0.3)
        self.au_mot("4 dixièmes")
        self.play(FadeIn(l2[1]), FadeIn(l2[2], scale=1.2), run_time=0.3)
        self.au_mot("Comment")
        q = self.t("Comment l'écrire ?", 44, JAUNE_TITRE)
        self.col(q, -0.9)
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.35)
        self.attendre_voix()

    # ── 02 : les dixièmes ───────────────────────────────────────────────────
    def ecran_dixiemes(self):
        self.ecran("02-dixiemes")
        b = barre_unite(10, larg=6.0, h=0.95, traits=False).move_to(P(-3.0, 0.6))
        b.parts.set_fill(CASE, 0.5)
        self.au_mot("Prends")
        u = self.t("une unité", 36, BLEU_D).next_to(b, UP, buff=0.3)
        tit = self.t("Une unité,", 40, BLEU_D)
        self.col(tit, 2.4)
        self.play(FadeIn(b.cadre), FadeIn(b.parts), FadeIn(u), FadeIn(tit, shift=UP * 0.1), run_time=0.45)
        self.au_mot("Coupe-la")
        l1 = self.t("coupée en 10 parts égales.", 36)
        self.col(l1, 1.55)
        self.play(FadeIn(l1, shift=UP * 0.1), b.traits.animate.set_opacity(1), run_time=0.6)
        self.au_mot("Chaque part")
        l2 = self.ligne([("Une part :", WHITE), ("un dixième.", AMBRE_D)], 36)
        self.col(l2, 0.55)
        fl = Arrow(b.parts[0].get_bottom() + DOWN * 0.9, b.parts[0].get_bottom(), color=AMBRE_D, buff=0.05, stroke_width=6)
        un = self.t("un dixième", 30, AMBRE_D).next_to(fl, DOWN, buff=0.1).align_to(b, LEFT)
        self.play(FadeIn(l2, shift=UP * 0.1), b.parts[0].animate.set_fill(AMBRE_D, 0.95), GrowArrow(fl), FadeIn(un),
                  run_time=0.45)
        self.au_mot("4 parts")
        l3 = self.ligne([("4 parts :", WHITE), ("4 dixièmes.", AMBRE_D)], 40)
        self.col(l3, -0.55)
        self.play(FadeIn(l3[0], shift=UP * 0.1), LaggedStart(*[b.parts[i].animate.set_fill(AMBRE_D, 0.95) for i in range(1, 4)],
                                                             lag_ratio=0.3), run_time=0.6)
        self.au_mot("4 dixièmes")
        acc = BraceBetweenPoints(b.parts[3].get_corner(UR), b.parts[0].get_corner(UL), color=AMBRE_D)
        self.play(FadeIn(l3[1], scale=1.2), FadeOut(u), GrowFromCenter(acc), run_time=0.4)
        self.attendre_voix()

    # ── 03 : écrire 1,4 ─────────────────────────────────────────────────────
    def ecran_ecrire(self):
        self.ecran("03-ecrire")
        tb = TableauNum(("Unités", "Dixièmes"), larg=2.3, h=1.3).move_to(P(-3.4, 0.9))
        ch = chaton(0.9).move_to(P(-3.4, -1.7))
        self.add(ch)
        self.au_mot("Les unités")
        l1 = self.ligne([("Les unités :", BLEU_D), ("avant la virgule.", WHITE)], 36)
        self.col(l1, 2.3)
        self.play(FadeIn(tb.cases), FadeIn(tb.entetes), FadeIn(l1[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("avant la virgule")
        u = tb.chiffre(0, 1, BLEU_D)
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(tb.virgule, scale=2), FadeIn(u, scale=1.6), run_time=0.4)
        self.au_mot("Les dixièmes")
        l2 = self.ligne([("Les dixièmes :", AMBRE_D), ("juste après.", WHITE)], 36)
        self.col(l2, 1.35)
        d = tb.chiffre(1, 4, AMBRE_D)
        self.play(FadeIn(l2[0], shift=UP * 0.1), Indicate(tb.entetes[1], color=AMBRE_D), run_time=0.35)
        self.au_mot("juste après")
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(d, scale=1.6), run_time=0.35)
        self.au_mot("Le chaton")
        l3 = self.t("Le chaton pèse", 36)
        self.col(l3, 0.2)
        self.play(FadeIn(l3, shift=UP * 0.1), ch.animate.shift(UP * 0.12), run_time=0.3)
        self.au_mot("1,4 kilogramme")
        g = self.gros("1,4 kg")
        self.col(g, -0.95, xl=1.4)
        self.play(FadeIn(g, scale=1.3), Indicate(tb.virgule, color=ROUGE_ERREUR, scale_factor=1.8), run_time=0.45)
        self.insister(g, 1.2, 0.25)
        self.attendre_voix()

    # ── 04 : les centièmes ──────────────────────────────────────────────────
    def ecran_centiemes(self):
        self.ecran("04-centiemes")
        b = barre_unite(10, larg=5.6, h=0.7, colories=1).move_to(P(-3.4, 2.55))
        self.add(b)
        self.au_mot("Coupe encore")
        zoom = barre_unite(10, larg=5.6, h=0.7, couleur=ROSE_D, traits=False).move_to(P(-3.4, 1.3))
        zoom.parts.set_fill(AMBRE_D, 0.95)
        lz = VGroup(DashedLine(b.parts[0].get_corner(DL), zoom.get_corner(UL), color=AMBRE_D),
                    DashedLine(b.parts[0].get_corner(DR), zoom.get_corner(UR), color=AMBRE_D))
        l1 = self.ligne([("Un dixième, coupé en 10 :", WHITE)], 34)
        self.col(l1, 2.75)
        self.play(FadeIn(l1, shift=UP * 0.1), Create(lz), FadeIn(zoom.cadre), FadeIn(zoom.parts), run_time=0.5)
        self.play(zoom.traits.animate.set_opacity(1), run_time=0.4)
        self.au_mot("des centièmes")
        l2 = self.t("des centièmes.", 38, ROSE_D)
        self.col(l2, 2.05)
        self.play(FadeIn(l2, scale=1.2), zoom.parts[0].animate.set_fill(ROSE_D, 1), run_time=0.35)
        self.au_mot("Ils vont")
        tb = TableauNum(larg=1.85, h=1.0).move_to(P(-3.4, -0.75))
        l3 = self.bloc(["Au deuxième rang", "après la virgule."], 34)
        self.col(l3, 1.0)
        self.play(FadeIn(tb), run_time=0.3)
        self.au_mot("deuxième rang")
        self.play(FadeIn(l3[0], shift=UP * 0.1), Indicate(tb.colonne(2), color=ROSE_D, scale_factor=1.15), run_time=0.4)
        self.au_mot("après la virgule")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Un lapin")
        la = lapin(0.75).move_to(P(-5.6, -2.6))
        l4 = self.t("Un lapin pèse :", 34)
        self.col(l4, -0.1)
        self.play(FadeIn(la, shift=UP * 0.2), FadeIn(l4, shift=UP * 0.1), run_time=0.35)
        r1 = self.ligne([("2 unités,", BLEU_D), ("3 dixièmes", AMBRE_D)], 36, buff=0.2)
        self.col(r1, -0.75)
        r2 = self.t("et 5 centièmes.", 36, ROSE_D)
        self.col(r2, -1.35)
        for i, (mot, v, m) in enumerate((("2 unités", 2, r1[0]), ("3 dixièmes", 3, r1[1]), ("5 centièmes", 5, r2))):
            self.au_mot(mot)
            self.play(FadeIn(m, shift=RIGHT * 0.1), FadeIn(tb.chiffre(i, v, (BLEU_D, AMBRE_D, ROSE_D)[i]), scale=1.6),
                      run_time=0.3)
        self.au_mot("On écrit")
        oe = self.t("On écrit :", 34)
        self.col(oe, -1.95)
        self.play(FadeIn(oe), run_time=0.25)
        self.au_mot("2,35")
        g = self.gros("2,35 kg", fs=56)
        self.col(g, -2.8, xl=1.4)
        self.play(FadeIn(g, scale=1.3), Indicate(tb.virgule, color=ROUGE_ERREUR, scale_factor=1.8), run_time=0.45)
        self.attendre_voix()

    # ── 05 : QUESTION 1 ─────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        b = barre_unite(10, larg=5.6, h=0.75, colories=7).move_to(P(-3.5, 1.2))
        tb = TableauNum(("Unités", "Dixièmes"), larg=2.2, h=1.15).move_to(P(-3.5, -1.15))

        def avant(sc):
            sc.play(FadeIn(b), run_time=0.35)

        def apres(sc):
            sc.au_mot("Les dixièmes")
            sc.rep(0, avec=[FadeIn(tb)])
            lg = sc.ligne_rep(1, ["après la virgule :", "0,7."])
            sc.au_mot("après la virgule")
            sc.play(FadeIn(lg[0], shift=UP * 0.1), run_time=0.3)
            sc.au_mot("0,7")
            sc.play(FadeIn(lg[1], scale=1.3), FadeIn(tb.chiffre(0, 0, BLEU_D), scale=1.6),
                    FadeIn(tb.chiffre(1, 7, AMBRE_D), scale=1.6), run_time=0.35)
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse", ["Comment écrire", "7 dixièmes ?"],
                            [self.t("7,10", 36), self.t("0,7", 36), self.t("0,07", 36)], 1,
                            ["Les dixièmes vont juste", "après la virgule : 0,7."], mot_q="Comment",
                            avant_q=avant, autres_r=apres)

    # ── 06 : la fraction ────────────────────────────────────────────────────
    def ecran_fraction(self):
        self.ecran("06-fraction")
        b0 = barre_unite(10, larg=5.4, h=0.6, colories=7).move_to(P(-3.5, 2.6))
        self.au_mot("7 dixièmes")
        l1a = self.t("7 dixièmes =", 38, AMBRE_D)
        self.col(l1a, 2.55)
        self.play(FadeIn(b0), FadeIn(l1a, shift=UP * 0.1), run_time=0.35)
        f1 = EcritureFraction(7, 10, fs=50, couleur=AMBRE_D).next_to(l1a, RIGHT, buff=0.3)
        self.poser_frac(f1, "7 sur 10", "10. Et")
        l2 = self.t("Et", 38)
        self.col(l2, 1.15)
        f2 = EcritureFraction(25, 10, fs=50).next_to(l2, RIGHT, buff=0.3)
        l2b = self.t("?", 38).next_to(f2, RIGHT, buff=0.2)
        hors_audit(l2b)
        bars = VGroup(*[barre_unite(10, larg=5.4, h=0.6, colories=c) for c in (10, 10, 5)]).arrange(DOWN, buff=0.28)
        bars.move_to(P(-3.5, 0.2))
        self.au_mot("Et 25")
        self.play(FadeIn(l2), FadeOut(b0), run_time=0.25)
        self.poser_frac(f2, "25 sur 10", "10 ?")
        self.play(FadeIn(l2b), run_time=0.2)
        self.play(LaggedStart(*[FadeIn(x) for x in bars], lag_ratio=0.25), run_time=0.6)
        self.au_mot("10 dixièmes")
        l3 = self.t("10 dixièmes font une unité.", 34, BLEU_D)
        self.col(l3, 0.05)
        self.play(FadeIn(l3, shift=UP * 0.1), bars[0].cadre.animate.set_stroke(BLEU_D, 9), run_time=0.4)
        self.play(bars[1].cadre.animate.set_stroke(BLEU_D, 9), run_time=0.3)
        self.au_mot("25 dixièmes, ce sont")
        l4 = self.bloc(["25 dixièmes :", "2 unités et 5 dixièmes"], 34)
        self.col(l4, -1.05)
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("2 unités")
        self.play(FadeIn(l4[1], shift=UP * 0.1), Indicate(bars[2].parts[:5], color=AMBRE_D), run_time=0.4)
        self.au_mot("2,5")
        g = self.gros("= 2,5", fs=60)
        self.col(g, -2.35, xl=1.3)
        self.play(FadeIn(g, scale=1.3), run_time=0.4)
        self.attendre_voix()

    # ── 07 : le zéro ────────────────────────────────────────────────────────
    def ecran_zero(self):
        self.ecran("07-zero")
        self.au_mot("Attention")
        tit = self.t("Attention au zéro !", 46, ROUGE_ERREUR)
        self.col(tit, 2.85, xl=0.8)
        self.play(Write(tit), run_time=0.4)
        ct = chaton(1.05, couleur="#9ca3af").move_to(P(-3.4, 2.1))
        tb = TableauNum(larg=1.85, h=1.0).move_to(P(-3.4, -0.25))
        self.au_mot("Un chat")
        l1 = self.ligne([("Un chat :", WHITE), ("2 kg", BLEU_D), ("et", WHITE), ("9 centièmes.", ROSE_D)], 34, buff=0.16)
        self.col(l1, 1.85, xl=0.8)
        self.play(FadeIn(ct, shift=UP * 0.2), FadeIn(tb), FadeIn(l1[0]), run_time=0.35)
        self.au_mot("2 kilogrammes")
        self.play(FadeIn(l1[1]), FadeIn(tb.chiffre(0, 2, BLEU_D), scale=1.6), run_time=0.3)
        self.au_mot("9 centièmes")
        neuf = tb.chiffre(2, 9, ROSE_D)
        self.play(FadeIn(l1[2]), FadeIn(l1[3]), FadeIn(neuf, scale=1.6), run_time=0.3)
        self.au_mot("aucun dixième")
        l2 = self.t("Aucun dixième :", 34, AMBRE_D)
        self.col(l2, 0.95, xl=0.8)
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(tb.colonne(1), color=AMBRE_D, scale_factor=1.15), run_time=0.45)
        self.au_mot("On écrit un 0")
        l3 = self.t("on écrit un 0 à sa place.", 34)
        self.col(l3, 0.3, xl=0.8)
        zero = tb.chiffre(1, 0, AMBRE_D)
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(zero, scale=2.2), run_time=0.4)
        self.au_mot("2,09")
        g = self.gros("2,09 kg", fs=58)
        self.col(g, -0.75, xl=1.3)
        self.play(FadeIn(g, scale=1.3), Indicate(tb.virgule, color=ROUGE_ERREUR, scale_factor=1.8), run_time=0.4)
        self.au_mot("Sans le zéro")
        l4 = self.t("Sans le zéro :", 34, ROUGE_ERREUR)
        self.col(l4, -1.7, xl=0.8)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.3)
        self.au_mot("2,9")
        f = self.t("2,9", 46, ROUGE_ERREUR).next_to(l4, RIGHT, buff=0.35)
        x = croix(f, sw=7)
        self.play(FadeIn(f, scale=1.3), run_time=0.3)
        self.au_mot("ce seraient 9 dixièmes")
        l5 = self.t("= 9 dixièmes !", 36, ROUGE_ERREUR)
        self.col(l5, -2.45, xl=1.5)
        self.play(FadeIn(l5), Create(x), run_time=0.35)
        self.au_mot("bien plus")
        self.play(Indicate(zero, color=VERT_OK, scale_factor=1.8), run_time=0.5)
        self.attendre_voix()

    # ── 08 : QUESTION 2 ─────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        tb = TableauNum(larg=1.85, h=1.0).move_to(P(-3.5, 0.9))
        ch = [tb.chiffre(0, 6, BLEU_D), tb.chiffre(1, 0, AMBRE_D), tb.chiffre(2, 9, ROSE_D)]

        def avant(sc):
            sc.play(FadeIn(tb), run_time=0.3)

        def apres(sc):
            sc.play(*[FadeIn(c, scale=1.5) for c in ch], run_time=0.3)
            # l'explication sous le tableau, à gauche : sous les cartes, elle était trop petite
            for i, (mot, rg, k, c) in enumerate((("Le 0", "rang des dixièmes", 1, AMBRE_D),
                                                 ("Le 9", "rang des centièmes", 2, ROSE_D))):
                lg = sc.ligne([(mot, c), (f"est au {rg}.", VERT_OK)], 32, buff=0.16)
                lg.move_to(P(0, -1.0 - 0.7 * i)).align_to(P(-6.3, 0), LEFT)
                if lg.get_right()[0] > 0.6:
                    lg.scale_to_fit_width(6.9).align_to(P(-6.3, 0), LEFT)
                sc.au_mot(mot)
                sc.play(FadeIn(lg[0], shift=UP * 0.1), Indicate(ch[k], color=c, scale_factor=1.8), run_time=0.3)
                sc.au_mot(rg)
                sc.play(FadeIn(lg[1], shift=UP * 0.1), Indicate(tb.entetes[k], color=c), run_time=0.35)
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse", ["Comment se lit 6,09 ?"],
                            [self.choix("6 unités et 9 dixièmes"), self.choix("6 unités et 9 centièmes"),
                             self.choix("9 unités et 6 centièmes")], 1,
                            ["Le 0 est au rang des dixièmes.", "Le 9 est au rang des centièmes."], mot_q="Comment",
                            avant_q=avant, autres_r=apres)

    # ── 09 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("09-piege")
        self.au_mot("Autre piège")
        tit = self.t("Autre piège !", 46, ROUGE_ERREUR)
        self.col(tit, 2.85, xl=0.8)
        self.play(Write(tit), run_time=0.35)
        f = EcritureFraction(34, 100, fs=70).move_to(P(-4.6, 1.9))
        self.poser_frac(f, "34 sur 100", "100 ne")
        self.au_mot("ne s'écrit pas")
        fx = self.t("34,100", 50, ROUGE_ERREUR).move_to(P(-1.6, 1.9))
        nep = self.t("ne s'écrit pas", 34, ROUGE_ERREUR)
        self.col(nep, 1.95, xl=0.8)
        self.play(FadeIn(nep), run_time=0.25)
        self.au_mot("34,100")
        self.play(FadeIn(fx, scale=1.2), run_time=0.3)
        self.play(Create(croix(fx, sw=8)), run_time=0.3)
        self.au_mot("34 sur 100, ce sont")
        self.play(Indicate(f, color=ROSE_D), run_time=0.35)
        self.ligne_au_mot([("C'est", WHITE), ("34", ROSE_D), ("centièmes.", ROSE_D)],
                          ["ce sont 34", "34 centièmes", "centièmes. Le"], 1.0, fs=36, xl=0.8)
        tb = TableauNum(larg=1.85, h=1.0).move_to(P(-3.4, -0.75))
        self.play(FadeIn(tb), run_time=0.3)
        self.au_mot("Le dernier chiffre")
        l3 = self.bloc(["Le dernier chiffre, 4,", "va au rang des centièmes."], 34)
        self.col(l3, -0.15, xl=0.8)
        quatre = tb.chiffre(2, 4, ROSE_D)
        trois = tb.chiffre(1, 3, AMBRE_D)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("va au rang")
        self.play(FadeIn(l3[1], shift=UP * 0.1), FadeIn(quatre, scale=1.8), Indicate(tb.entetes[2], color=ROSE_D), run_time=0.4)
        self.play(FadeIn(trois, scale=1.6), run_time=0.3)
        self.au_mot("0,34")
        g = self.gros("= 0,34", fs=60)
        self.col(g, -1.6, xl=1.3)
        self.play(FadeIn(g, scale=1.3), FadeIn(tb.chiffre(0, 0, BLEU_D), scale=1.6), run_time=0.4)
        self.attendre_voix()

    # ── 10 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("10-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        cp = chiot(1.25).move_to(P(-4.0, 0.9))
        self.au_mot("Un chiot")
        l1 = self.ligne([("Un chiot :", WHITE), ("4 kg et 8 centièmes.", AMBRE_D)], 36)
        self.col(l1, 2.0, xl=0.0)
        self.play(FadeIn(cp, shift=UP * 0.2), FadeIn(l1[0]), run_time=0.35)
        self.au_mot("4 kilogrammes")
        self.play(FadeIn(l1[1], scale=1.1), run_time=0.3)
        self.au_mot("Écris ce nombre")
        l2 = self.t("1. Écris ce nombre.", 36, ORANGE_RETENUE)
        hors_audit(l2)
        self.col(l2, 1.1, xl=0.0)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Puis")
        l3 = self.t("2. Écris avec une virgule :", 36, ORANGE_RETENUE)
        hors_audit(l3)
        self.col(l3, 0.2, xl=0.0)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        f = EcritureFraction(125, 100, fs=60).move_to(P(2.6, -0.95))
        self.poser_frac(f, "125 sur 100", "100 avec")
        self.pause_defi(y=-2.35)

    def ecran_correction(self):
        self.ecran("10b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        t1 = TableauNum(larg=1.65, h=0.85, fs_ent=22).move_to(P(-3.7, 1.55))
        t2 = TableauNum(larg=1.65, h=0.85, fs_ent=22).move_to(P(-3.7, -1.25))
        self.au_mot("4 kilogrammes")
        l1 = self.t("4 kg et 8 centièmes :", 32)
        self.col(l1, 2.25)
        self.play(FadeIn(t1), FadeIn(l1, shift=UP * 0.1), FadeIn(t1.chiffre(0, 4, BLEU_D), scale=1.5),
                  FadeIn(t1.chiffre(2, 8, ROSE_D), scale=1.5), run_time=0.4)
        self.au_mot("aucun dixième")
        l2 = self.t("aucun dixième, donc un 0.", 32, AMBRE_D)
        self.col(l2, 1.6)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(t1.chiffre(1, 0, AMBRE_D), scale=2), run_time=0.4)
        self.au_mot("4,08")
        g1 = self.gros("4,08 kg", fs=50)
        self.col(g1, 0.75, xl=1.4)
        self.play(FadeIn(g1, scale=1.3), run_time=0.35)
        self.au_mot("Et 125 centièmes")
        self.play(FadeIn(t2), run_time=0.25)
        self.ligne_au_mot([("125", WHITE), ("centièmes :", WHITE)], ["125 centièmes", "centièmes : 100"], -0.3, fs=32,
                          buff=0.16)
        self.au_mot("100 centièmes")
        l4 = self.t("100 centièmes font une unité.", 32, BLEU_D)
        self.col(l4, -0.95)
        self.play(FadeIn(l4, shift=UP * 0.1), FadeIn(t2.chiffre(0, 1, BLEU_D), scale=1.6), run_time=0.35)
        self.au_mot("Il reste")
        l5 = self.t("Il reste 25 centièmes.", 32, ROSE_D)
        self.col(l5, -1.6)
        self.play(FadeIn(l5, shift=UP * 0.1), FadeIn(t2.chiffre(1, 2, AMBRE_D), scale=1.6),
                  FadeIn(t2.chiffre(2, 5, ROSE_D), scale=1.6), run_time=0.35)
        self.au_mot("1,25")
        g2 = self.gros("1,25", fs=50)
        self.col(g2, -2.6, xl=1.4)
        self.play(FadeIn(g2, scale=1.3), run_time=0.35)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("11-finale", 0.65)
        tb = TableauNum(larg=1.5, h=0.9, fs_ent=22)
        ch = VGroup(tb.chiffre(0, 2, BLEU_D), tb.chiffre(1, 0, AMBRE_D), tb.chiffre(2, 9, ROSE_D))
        fig = VGroup(tb, ch)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Avant la virgule :", "les unités."),
            ("Juste après : les dixièmes,", "puis les centièmes."),
            ("S'il manque un rang,", "on écrit 0.")], fs=36)
        self.au_mot("Avant la virgule")
        self.montrer_ligne(lignes[0], Indicate(tb.colonne(0), color=BLEU_D, scale_factor=1.1))
        self.au_mot("Juste après")
        self.montrer_ligne(lignes[1], Indicate(tb.colonne(1), color=AMBRE_D, scale_factor=1.1))
        self.au_mot("S'il manque")
        self.montrer_ligne(lignes[2], Indicate(ch[1], color=VERT_OK, scale_factor=1.8))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_dixiemes()
        self.ecran_ecrire()
        self.ecran_centiemes()
        self.ecran_question1()
        self.ecran_fraction()
        self.ecran_zero()
        self.ecran_question2()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")


class DecimalLireEcrire6e(DecimalLireEcrireBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
