# perimetre_comprendre.py
# EleveAI — Maths CE2 — série « Périmètre », épisode 01 : COMPRENDRE LE PÉRIMÈTRE
# (micro ce2_perimetre_comprendre, notion perimetre), AVEC VOIX. Paysage 16:9, CEINTURE BLANCHE.
# Vidéo COMMUNE : sert aussi au CM1 (perimetre_comprendre), au CM2, en 6e… (`aussi`).
# Short jumeau : film Ti Margo (le bac à sable, le raccourci par le milieu).
# Décor et métier : Léo, PAYSAGISTE ; défi : Inès, ÉLEVEUSE de moutons (centres : nature-ecologie, animaux).
# Exemples du coach (ce2/maths/perimetre.bank.ts) : le tour et le dedans, additionner tous les côtés.
# Mapping micro → écrans : 02 (faire le tour), 03 (ajouter les côtés), 04 (le bord, pas le dedans),
# 06 (piège : aucun côté oublié), questions 05 et 07, défi 08.
# Voix : manim/voix/ce2-perimetre-comprendre.json (validée le 13/11, Julie, débit −6) ;
# marques : perimetre_comprendre_marques.json (python manim/scripts/ce2/perimetre_marques.py comprendre).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/perimetre_comprendre.py PerimetreComprendreCE2
# python -m manim render -qh --disable_caching manim/scripts/ce2/perimetre_comprendre.py PerimetreComprendreCE2 -o eleveai-maths-ce2-perimetre-comprendre --media_dir manim/scripts/ce2/media-per-01
# Sortie : manim/sorties/ce2/maths/perimetre/01-comprendre/eleveai-maths-ce2-perimetre-comprendre.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from perimetre_ce2_commun import *  # noqa: E402,F403

E_J = 0.6  # 1 m du jardin = 0,6 unité


def jardin(centre, e=E_J, textes=None, fs=30):
    return FigureCotee(rect_pts(8, 5), textes, e=e, centre=centre, fs=fs, remplir=HERBE_F, sw=5)


class PerimetreComprendreBase(PaysagePerimetreCE2):
    nom_voix = "ce2-perimetre-comprendre"
    fichier_marques = "perimetre_comprendre_marques.json"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Le périmètre", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Le périmètre")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Combien de clôture faut-il", "pour faire le tour d'un jardin ?"], 38)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        j = jardin(P(3.9, 0.45), e=0.32)
        self.au_mot("Combien")
        self.play(FadeIn(q, shift=UP * 0.2), FadeIn(j), run_time=0.4)
        self.au_mot("faire le tour")
        self.play(Create(j.contour(sw=9)), run_time=1.2)
        self.play(FadeIn(poteaux(j, 0.4, 0.22), lag_ratio=0.1), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : Léo, paysagiste ────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        lp = leo(1.0).move_to(P(-5.2, 0.1))
        self.au_mot("Voici Léo")
        nom = self.t("Léo", 42, BLEU_CALCUL).next_to(lp, UP, buff=0.2)
        self.play(FadeIn(lp, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("paysagiste")
        met = self.t("paysagiste", 32, BLEU_CALCUL).next_to(lp, DOWN, buff=0.18)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        j = jardin(P(-0.6, 0.55), e=0.42)
        tj = self.t("le jardin", 28, GRAY_B).next_to(j, DOWN, buff=0.2)
        self.au_mot("une clôture")
        self.play(FadeIn(j), FadeIn(tj), run_time=0.45)
        self.au_mot("tout autour")
        self.play(Create(j.contour(sw=9)), run_time=1.0)
        self.play(FadeIn(poteaux(j, 0.42, 0.26), lag_ratio=0.1), run_time=0.5)
        self.au_mot("Combien")
        q = self.bloc(["Combien de mètres", "de clôture ?"], 40, JAUNE_TITRE)
        self.col(q, 0.4, xl=2.55)
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.5)
        self.attendre_voix()

    # ── 02 : faire le tour ──────────────────────────────────────────────────
    def ecran_tour(self):
        self.ecran("02-tour")
        j = jardin(P(-3.2, 0.3))
        self.add(j)
        dep = depart(j.sommets()[0])
        td = self.t("départ", 26, JAUNE_TITRE).next_to(dep, DOWN + LEFT, buff=0.1)
        self.au_mot("on fait le tour")
        l1 = self.t("On fait le tour du jardin.", 34)
        self.col(l1, 2.6)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(dep, scale=2), FadeIn(td), run_time=0.4)
        self.au_mot("On suit le bord")
        l2 = self.bloc(["On suit le bord,", "côté après côté,"], 34, TOUR)
        self.col(l2, 1.45)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        mob = dep.copy().set_color(TOUR)
        self.au_mot("côté après côté")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        for i in range(4):
            self.tour_cote(j, i, 0.55, mob)
        self.au_mot("jusqu'à revenir")
        l3 = self.t("jusqu'à revenir au départ.", 34, TOUR)
        self.col(l3, 0.45)
        self.play(FadeIn(l3, shift=UP * 0.1), Flash(dep, color=JAUNE_TITRE), run_time=0.5)
        self.au_mot("La longueur")
        l4 = self.bloc(["La longueur de ce tour,", "c'est le périmètre."], 38, VERT_OK)
        self.col(l4, -1.0)
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("c'est le périmètre")
        self.play(FadeIn(l4[1], scale=1.2), run_time=0.4)
        self.insister(l4[1], 1.12, 0.25)
        self.attendre_voix()

    # ── 03 : ajouter les 4 côtés ────────────────────────────────────────────
    def ecran_calcul(self):
        self.ecran("03-calcul")
        j = jardin(P(-3.4, 0.55), textes=["8 m", "5 m", "8 m", "5 m"], fs=34)
        self.add(j)
        self.au_mot("quatre côtés")
        l0 = self.t("Le jardin a 4 côtés.", 34)
        hors_audit(l0)  # « quatre » est dit en lettres
        self.col(l0, 2.75)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        mots = (("8 mètres", 1), ("5 mètres", 1), ("8 mètres", 2), ("5 mètres", 2))
        for i, (mot, n) in enumerate(mots):
            self.au_mot(mot, n)
            self.play(FadeIn(j.lab[i], scale=1.3), Create(j.cote(i)), run_time=0.35)
        self.au_mot("On les ajoute")
        l1 = self.t("On les ajoute :", 34)
        self.col(l1, 1.85)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        calc = (("8 plus 5", "8 + 5 = 13"), ("Plus 8", "13 + 8 = 21"), ("Plus 5", "21 + 5 = 26"))
        for k, (mot, s) in enumerate(calc):
            lg = self.t(s, 40, BLEU_D)
            self.col(lg, 1.05 - 0.72 * k)
            self.au_mot(mot)
            self.play(FadeIn(lg, shift=UP * 0.1), Indicate(j.lab[k + 1 if k else 0], color=TOUR), run_time=0.35)
        self.au_mot("Le périmètre est")
        g = self.gros("Périmètre : 26 m", fs=40)
        self.col(g, -1.4)
        self.play(FadeIn(g, scale=1.2), run_time=0.4)
        self.insister(g, 1.12, 0.25)
        self.au_mot("Léo achète")
        l5 = self.t("Léo achète 26 m de clôture.", 30)
        self.col(l5, -2.5)
        self.play(FadeIn(l5, shift=UP * 0.1), FadeIn(poteaux(j, 0.6, 0.34), lag_ratio=0.1), run_time=0.6)
        self.attendre_voix()

    # ── 04 : le bord, pas l'intérieur ───────────────────────────────────────
    def ecran_bord(self):
        self.ecran("04-bord")
        j = jardin(P(-3.2, 0.3))
        herbe = touffes(j.get_center(), 6, 1.4)
        self.add(j, herbe)
        self.au_mot("Attention")
        tit = self.t("Attention !", 46, ROUGE_ERREUR)
        self.col(tit, 2.9)
        self.play(Write(tit), run_time=0.35)
        self.au_mot("Le périmètre, c'est le bord")
        l1 = self.bloc(["Le périmètre, c'est le bord,", "pas l'intérieur."], 34)
        l1[0].set_color(TOUR)
        self.col(l1, 1.9)
        self.play(FadeIn(l1[0], shift=UP * 0.1), Create(j.contour(sw=9)), run_time=0.5)
        self.au_mot("pas l'intérieur")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        f = fourmi(1.4).move_to(j.sommets()[0])
        self.au_mot("La fourmi")
        l2 = self.bloc(["La fourmi qui fait le tour", "marche sur le périmètre."], 32, TOUR)
        self.col(l2, 0.55)
        self.play(FadeIn(f, scale=1.5), FadeIn(l2[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("marche sur")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        s = j.sommets()
        avant = 0.0
        for i in range(len(s)):
            a, b = s[i], s[(i + 1) % len(s)]
            ang = np.arctan2(b[1] - a[1], b[0] - a[0])
            d = (ang - avant + PI) % (2 * PI) - PI
            if abs(d) > 1e-3:
                self.play(Rotate(f, d), run_time=0.15)
            avant = ang
            self.play(f.animate.move_to(b), run_time=0.6)
        self.au_mot("L'herbe au milieu")
        l3 = self.bloc(["L'herbe au milieu,", "ce n'est pas le périmètre."], 32, WHITE)
        self.col(l3, -1.0)
        self.play(FadeIn(l3[0], shift=UP * 0.1), Indicate(herbe, color="#86efac", scale_factor=1.3), run_time=0.5)
        croix = Cross(herbe, stroke_color=ROUGE_ERREUR, stroke_width=7).scale(0.7)
        self.au_mot("ce n'est pas")
        self.play(FadeIn(l3[1], shift=UP * 0.1), Create(croix), run_time=0.4)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        t = FigureCotee(rect_pts(3, 2), ["3 m", "2 m", "3 m", "2 m"], e=1.05, centre=P(-3.6, 1.2), fs=30,
                        remplir="#7c2d12")
        rayures = VGroup(*[Line(P(-3.6 - 1.3, 1.2 + y), P(-3.6 + 1.3, 1.2 + y), color="#fbbf24", stroke_width=4)
                           for y in (-0.6, 0, 0.6)])

        def autres_q(sc):
            sc.play(FadeIn(t), FadeIn(rayures), run_time=0.35)
            for i in range(4):
                sc.add(t.lab[i])

        def apres(sc):
            lg = sc.rep_bas(0, ["On fait le tour."], fs=32)
            sc.au_mot("On fait le tour")
            sc.play(FadeIn(lg[0], shift=UP * 0.1), Create(t.contour(sw=8)), run_time=0.4)
            lg2 = sc.rep_bas(1, ["3 + 2 = 5,", "5 + 3 = 8,", "8 + 2 = 10."], fs=32)
            sc.au_mot("3 plus 2")
            sc.play(FadeIn(lg2[0], shift=UP * 0.1), run_time=0.25)
            sc.au_mot("Plus 3")
            sc.play(FadeIn(lg2[1], shift=UP * 0.1), run_time=0.25)
            sc.au_mot("Plus 2")
            sc.play(FadeIn(lg2[2], shift=UP * 0.1), run_time=0.25)
            lg3 = sc.rep_bas(2, ["Le périmètre du tapis : 10 m."], fs=32)
            sc.au_mot("Le périmètre du tapis")
            sc.play(FadeIn(lg3[0], scale=1.1), run_time=0.3)
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse", ["Un tapis a quatre côtés :", "3 m, 2 m, 3 m et 2 m.",
                                                           "Quel est son périmètre ?"],
                            [self.choix("5 mètres"), self.choix("12 mètres"), self.choix("10 mètres")], 2,
                            ["On fait le tour.", "3 + 2 = 5, 5 + 3 = 8, 8 + 2 = 10.",
                             "Le périmètre du tapis : 10 m."], mot_q="Un tapis",
                            autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège (aucun côté oublié) ───────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        tri = FigureCotee([(0, 0), (4, 0), (4, 3)], ["4 cm", "3 cm", "5 cm"], e=0.85, centre=P(-3.4, 0.2), fs=34,
                          remplir=DEDANS)
        self.au_mot("Un triangle")
        l0 = self.t("Un triangle a 3 côtés.", 34)
        hors_audit(l0)  # « trois » dit en lettres
        self.col(l0, 2.2)
        self.play(FadeIn(tri), FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        for i, mot in enumerate(("4 centimètres", "3 centimètres", "5 centimètres")):
            self.au_mot(mot)
            self.play(FadeIn(tri.lab[i], scale=1.3), Create(tri.cote(i)), run_time=0.35)
        self.au_mot("On n'oublie")
        l1 = self.t("On n'oublie aucun côté !", 36, ORANGE_RETENUE)
        self.col(l1, 1.2)
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(tri.lab[2], color=ROUGE_ERREUR, scale_factor=1.5),
                  run_time=0.5)
        self.au_mot("4 plus 3")
        l2 = self.t("4 + 3 = 7", 40, BLEU_D)
        self.col(l2, 0.2)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Plus 5")
        l3 = self.t("7 + 5 = 12", 40, BLEU_D)
        self.col(l3, -0.6)
        self.play(FadeIn(l3, shift=UP * 0.1), Indicate(tri.lab[2], color=TOUR, scale_factor=1.3), run_time=0.35)
        self.au_mot("Le périmètre est")
        g = self.gros("Périmètre : 12 cm", fs=40)
        self.col(g, -1.75)
        self.play(FadeIn(g, scale=1.2), run_time=0.4)
        self.insister(g, 1.12, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        c = FigureCotee(rect_pts(4, 4), ["4 cm", None, None, None], e=0.55, centre=P(-3.6, 1.3), fs=30,
                        remplir=DEDANS)
        codes = VGroup(*[Line(P(-0.12, 0), P(0.12, 0), color=WHITE, stroke_width=4).rotate(
            PI / 2 if i % 2 == 0 else 0).move_to(c.cote(i).get_center()) for i in range(4)])

        def autres_q(sc):
            sc.play(FadeIn(c), FadeIn(codes), run_time=0.35)
            sc.add(c.lab[0])

        def apres(sc):
            lg = sc.rep_bas(0, ["4 côtés de 4 cm."], fs=32)
            hors_audit(lg)
            sc.au_mot("Le carré a")
            sc.play(FadeIn(lg[0], shift=UP * 0.1), Create(c.contour(sw=8)), run_time=0.4)
            lg2 = sc.rep_bas(1, ["4 + 4 = 8,", "8 + 4 = 12,", "12 + 4 = 16."], fs=32)
            sc.au_mot("4 plus 4")
            sc.play(FadeIn(lg2[0], shift=UP * 0.1), run_time=0.25)
            sc.au_mot("Plus 4, 12")
            sc.play(FadeIn(lg2[1], shift=UP * 0.1), run_time=0.25)
            sc.au_mot("Plus 4, 16")
            sc.play(FadeIn(lg2[2], shift=UP * 0.1), run_time=0.25)
            lg3 = sc.rep_bas(2, ["Le périmètre : 16 cm."], fs=32)
            sc.au_mot("Le périmètre est")
            sc.play(FadeIn(lg3[0], scale=1.1), run_time=0.3)
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse", ["Un carré a quatre côtés de 4 cm.", "Quel est son périmètre ?"],
                            [self.choix("16 centimètres"), self.choix("8 centimètres"), self.choix("12 centimètres")],
                            0, ["4 côtés de 4 cm.", "4 + 4 = 8, 8 + 4 = 12, 12 + 4 = 16.", "Le périmètre : 16 cm."],
                            mot_q="Un carré", autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    ENCLOS = [(6, 0), (6.6, 2.95), (3.6, 5.6), (1.84, 4.65), (0, 0)]  # côtés ≈ 3, 4, 2, 5, 6
    COTES_ENCLOS = ["3 m", "4 m", "2 m", "5 m", "6 m"]

    def enclos(self):
        # les côtés dans l'ordre dit (3, 4, 2, 5, 6), longueurs à peu près à l'échelle
        return FigureCotee(self.ENCLOS, self.COTES_ENCLOS, e=0.6, centre=P(-3.3, 0.2), fs=34, remplir=HERBE_F)

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        en = self.enclos()
        moutons = VGroup(mouton(0.8).move_to(en.get_center() + P(-0.5, -0.3)),
                         mouton(0.7).move_to(en.get_center() + P(0.6, 0.4)))
        ip = ines(0.7).move_to(P(-0.55, -2.3))
        self.au_mot("Inès est")
        l0 = self.bloc(["Inès est éleveuse de moutons.", "Son enclos a 5 côtés."], 32)
        hors_audit(l0[1])  # « cinq » dit en lettres
        self.col(l0, 2.15)
        self.play(FadeIn(l0[0], shift=UP * 0.1), FadeIn(ip, shift=UP * 0.2), run_time=0.4)
        self.au_mot("Son enclos")
        self.play(FadeIn(l0[1], shift=UP * 0.1), FadeIn(en), FadeIn(moutons), run_time=0.4)
        for i, mot in enumerate(("3 mètres", "4 mètres", "2 mètres", "5 mètres", "6 mètres")):
            self.au_mot(mot)
            self.play(FadeIn(en.lab[i], scale=1.3), run_time=0.3)
        self.au_mot("Combien")
        q = self.bloc(["Combien de mètres de grillage", "pour en faire le tour ?"], 34, JAUNE_TITRE)
        self.col(q, 0.2)
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(moutons), run_time=0.5)
        self.pause_defi(y=-1.3)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        en = self.enclos()
        self.add(en, *en.lab)
        self.au_mot("On ajoute")
        l0 = self.t("On ajoute les 5 côtés.", 34)
        hors_audit(l0)
        self.col(l0, 2.2)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        calc = (("3 plus 4", "3 + 4 = 7", 1), ("Plus 2", "7 + 2 = 9", 2), ("Plus 5", "9 + 5 = 14", 3),
                ("Plus 6", "14 + 6 = 20", 4))
        self.play(Create(en.cote(0)), run_time=0.25)
        for k, (mot, s, i) in enumerate(calc):
            lg = self.t(s, 38, BLEU_D)
            self.col(lg, 1.35 - 0.62 * k)
            self.au_mot(mot)
            self.play(FadeIn(lg, shift=UP * 0.1), Create(en.cote(i)), run_time=0.35)
        self.au_mot("Il faut")
        g = self.gros("20 m de grillage", fs=40)
        self.col(g, -1.6)
        self.play(FadeIn(g, scale=1.2), run_time=0.4)
        self.insister(g, 1.12, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        j = jardin(ORIGIN, e=0.3, textes=["8 m", "5 m", "8 m", "5 m"], fs=26)
        lab = hors_audit(j.lab)
        tour = j.contour(sw=9)
        fig = VGroup(j, lab, tour)
        lignes = self.finale_gauche(fig, textes=[
            ("Le périmètre, c'est la longueur", "du tour d'une figure."),
            ("On ajoute les longueurs", "de tous les côtés."),
            ("On n'en oublie aucun.",)], fs=34)
        self.remove(tour)
        self.add(j, lab)
        self.au_mot("Le périmètre")
        self.montrer_ligne(lignes[0], Create(tour))
        self.au_mot("On ajoute")
        self.montrer_ligne(lignes[1], Indicate(lab, color=TOUR, scale_factor=1.3))
        self.au_mot("On n'en oublie")
        self.montrer_ligne(lignes[2], Indicate(tour, color=TOUR, scale_factor=1.05))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_tour()
        self.ecran_calcul()
        self.ecran_bord()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class PerimetreComprendreCE2(PerimetreComprendreBase):
    identite = "Maths CE2 — EleveAI"
    ceinture = "blanche"
