# aire_carre_rectangle.py
# EleveAI — Maths CM1 — série « Aire », épisode 03 : CALCULER L'AIRE D'UN CARRÉ OU D'UN RECTANGLE
# (micro aire_carre_rectangle, notion aire), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : film Ti Margo (il compte 8 × 5 carreaux un par un).
# Décor et métier : Lina, MARAÎCHÈRE (parcelle de salades en m² ; centres : nature-ecologie, cuisine).
# Exemples du coach (aires.bank.ts) : rangées × cases par rangée ; côté × côté ; on multiplie, on n'ajoute pas.
# Mapping micro → écrans : aire_carre_rectangle = 02 (rangée par rangée), 03 (multiplier), 04 (le carré),
# 06 (piège : ajouter ou faire le tour), questions 05 et 07, défi 08 (en deux étapes).
# Voix : manim/voix/cm1-aire-carre-rectangle.json (validée le 13/11, Julie, débit −6) ;
# marques : aire_carre_rectangle_marques.json (python manim/scripts/cm1/aire_marques.py carre-rectangle).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/aire_carre_rectangle.py AireCarreRectangleCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/aire_carre_rectangle.py AireCarreRectangleCM1 -o eleveai-maths-cm1-aire-carre-rectangle --media_dir manim/scripts/cm1/media-aire-03
# Sortie : manim/sorties/cm1/maths/aire/03-carre-rectangle/eleveai-maths-cm1-aire-carre-rectangle.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from aire_cm1_commun import *  # noqa: E402,F403

TERRE = "#78350f"
TERRE_B = "#451a03"
SALADE = "#4ade80"
SALADE_B = "#14532d"
HERBES = "#a3e635"


def cote(mob, s, sens=LEFT, fs=30, couleur=JAUNE_TITRE):
    """Le nombre de cases le long d'un côté (à gauche : les rangées ; en haut : les cases d'une rangée)."""
    return Text(s, font_size=fs, color=couleur, weight=BOLD).next_to(mob, sens, buff=0.18)


class AireCarreRectangleBase(PaysageAireCM1):
    nom_voix = "cm1-aire-carre-rectangle"
    fichier_marques = "aire_carre_rectangle_marques.json"
    ceinture = "verte"
    _ph_sans_audit = ()
    _ph_couper = {}

    def _disposer_q(self, question, choix, phrase):
        """Les lignes de réponse rangées dans `_ph_sans_audit` restent AU MOT
        mais sortent de l'audit (un nombre redit dans la même phrase) ; celles de
        `_ph_couper` ({i: (morceau, morceau)}) sont coupées : chaque morceau à son mot."""
        r = list(super()._disposer_q(question, choix, phrase))
        ph = r[5]
        for i, morceaux in self._ph_couper.items():
            l = ph.submobjects[i]
            g = VGroup(*[Text(m, font_size=l.font_size, color=l.get_color(), font=l.font) for m in morceaux])
            g.arrange(RIGHT, buff=0.18).move_to(l)
            ph.submobjects[i] = g
        for i in self._ph_sans_audit:
            for f in ph[i].get_family():
                f._pas_audit = True
        return tuple(r)

    def parcelle(self, c=0.6, pos=P(-3.5, 0.3), plantee=True):
        return rect_cases(6, 4, c, SALADE if plantee else TERRE, SALADE_B if plantee else TERRE_B).move_to(pos)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("L'aire du rectangle et du carré", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("L'aire du rectangle")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Comment compter les carreaux", "sans les compter un par un ?"], 36)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        g = rect_cases(4, 3, 0.5).move_to(P(3.6, 0.4))
        self.au_mot("Comment")
        self.play(FadeIn(q, shift=UP * 0.2), LaggedStart(*[FadeIn(x, scale=1.6) for x in g], lag_ratio=0.06),
                  run_time=1.0)
        self.attendre_voix(marge=0.6)

    # ── 01 : Lina, maraîchère ───────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        li = lina(1.0).move_to(P(-5.3, 0.1))
        self.au_mot("Voici Lina")
        nom = self.t("Lina", 42, BLEU_CALCUL).next_to(li, UP, buff=0.2)
        self.play(FadeIn(li, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("maraîchère")
        met = self.t("maraîchère", 32, BLEU_CALCUL).next_to(li, DOWN, buff=0.18)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        g = rect_cases(6, 4, 0.55, TERRE, TERRE_B).move_to(P(-1.0, 0.5))
        tp = self.t("la parcelle", 26, GRAY_B).next_to(g, DOWN, buff=0.15)
        self.au_mot("une parcelle")
        self.play(FadeIn(g, scale=0.95), FadeIn(tp), run_time=0.5)
        self.au_mot("Chaque salade")
        self.play(g.animate.set_fill(SALADE).set_stroke(SALADE_B), run_time=0.6)
        gc = carreau(1.3, SALADE, SALADE_B, 4).move_to(P(3.3, 0.7))
        lien = DashedLine(g[5].get_right(), gc.get_left(), color=GRAY_B, stroke_width=3)
        self.au_mot("un carré de 1")
        un_m = Text("1 m", font_size=30, color=JAUNE_TITRE, weight=BOLD).next_to(gc, DOWN, buff=0.15)
        self.play(Indicate(g[5], color=JAUNE_TITRE, scale_factor=1.3), Create(lien), FadeIn(gc, scale=0.6),
                  FadeIn(un_m), run_time=0.6)
        self.au_mot("un mètre carré")
        m2 = hors_audit(Text("1 m²", font_size=40, color="#052e16", weight=BOLD).move_to(gc))
        self.play(FadeIn(m2, scale=1.3), run_time=0.4)
        self.au_mot("Combien")
        q = self.t("Combien de mètres carrés ?", 42, JAUNE_TITRE).move_to(P(-0.4, -2.55))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 02 : rangée par rangée ──────────────────────────────────────────────
    def ecran_rangees(self):
        self.ecran("02-rangees")
        g = self.parcelle(plantee=False)
        self.add(g)
        self.au_mot("4 rangées")
        l1 = self.t("4 rangées", 36, ORANGE_RETENUE)
        self.col(l1, 2.6)
        r4 = cote(g, "4", LEFT, couleur=ORANGE_RETENUE)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(r4),
                  LaggedStart(*[Indicate(rangee(g, j, 6), color=ORANGE_RETENUE, scale_factor=1.04) for j in range(4)],
                              lag_ratio=0.3), run_time=0.8)
        self.au_mot("Dans chaque rangée")
        l2 = self.t("6 cases par rangée", 36, CARREAU)
        self.col(l2, 1.9)
        c6 = cote(g, "6", UP, couleur=CARREAU)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(c6), Indicate(rangee(g, 0, 6), color=CARREAU, scale_factor=1.05),
                  run_time=0.5)
        self.au_mot("On peut compter")
        lignes = [self.ligne([("6", WHITE)], 38)] + \
                 [self.ligne([("+ 6", WHITE), (f"= {6 * k}", VERT_OK)], 38, buff=0.25) for k in (2, 3, 4)]
        for k, lg in enumerate(lignes):
            self.col(lg, 0.95 - 0.62 * k)
            self.play(FadeIn(lg[0], shift=UP * 0.1), rangee(g, k, 6).animate.set_fill(SALADE).set_stroke(SALADE_B),
                      run_time=0.4)
            if k:
                self.play(FadeIn(lg[1], shift=UP * 0.1), run_time=0.3)
        self.insister(lignes[-1][1], 1.3, 0.25)
        self.attendre_voix()

    # ── 03 : plus rapide, on multiplie ──────────────────────────────────────
    def ecran_multiplier(self):
        self.ecran("03-multiplier")
        g = self.parcelle()
        r4, c6 = cote(g, "4", LEFT, couleur=ORANGE_RETENUE), cote(g, "6", UP, couleur=CARREAU)
        self.add(g, r4, c6)
        hors_audit(VGroup(r4, c6))  # redits de l'écran 02
        self.au_mot("Plus rapide")
        l1 = self.t("Plus rapide :", 36, ORANGE_RETENUE)
        self.col(l1, 2.65)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("4 rangées", ORANGE_RETENUE), ("de 6 cases", CARREAU)], 36)
        self.col(l2, 1.95)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.4)
        self.au_mot("c'est 4 fois 6")
        l3 = self.ligne([("4 × 6", BLEU_D), ("= 24", VERT_OK)], 50, buff=0.3)
        self.col(l3, 1.0)
        self.play(FadeIn(l3[0], scale=1.2), Indicate(r4, scale_factor=1.4), Indicate(c6, scale_factor=1.4), run_time=0.5)
        self.au_mot("4 fois 6, 24")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("L'aire de la parcelle")
        res = self.gros("24 m²", fs=48)
        self.col(res, -0.15)
        self.play(FadeIn(res, scale=1.2), Indicate(g, color=VERT_OK, scale_factor=1.04), run_time=0.5)
        self.au_mot("Pour un rectangle")
        l4 = self.bloc(["Rectangle : nombre de rangées", "× nombre de cases d'une rangée"], 30, JAUNE_TITRE)
        self.col(l4, -1.55)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.45)
        self.attendre_voix()

    # ── 04 : et un carré ? ──────────────────────────────────────────────────
    def ecran_carre(self):
        self.ecran("04-carre")
        self.au_mot("Et un carré")
        tit = self.t("Et un carré ?", 44, JAUNE_TITRE)
        self.col(tit, 2.85)
        self.play(Write(tit), run_time=0.35)
        g = rect_cases(5, 5, 0.52, HERBES, "#365314").move_to(P(-3.4, 0.0))
        self.au_mot("un carré d'herbes")
        self.play(LaggedStart(*[FadeIn(x, scale=1.4) for x in g], lag_ratio=0.01), run_time=0.35)
        c5 = cote(g, "5", UP, couleur=CARREAU)
        l1 = self.t("5 cases de côté", 36, CARREAU)
        self.col(l1, 2.0)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(c5), run_time=0.4)
        self.au_mot("5 rangées")
        r5 = hors_audit(cote(g, "5", LEFT, couleur=ORANGE_RETENUE))
        l2 = self.ligne([("5 × 5", BLEU_D), ("= 25", VERT_OK)], 50, buff=0.3)
        self.col(l2, 1.0)
        self.play(FadeIn(r5), run_time=0.3)
        self.play(FadeIn(l2[0], scale=1.2), run_time=0.4)
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("L'aire du carré")
        res = self.gros("25 m²", fs=48)
        self.col(res, -0.15)
        self.play(FadeIn(res, scale=1.2), Indicate(g, color=VERT_OK, scale_factor=1.04), run_time=0.5)
        self.au_mot("Pour un carré")
        l3 = self.t("Carré : côté × côté", 36, JAUNE_TITRE)
        self.col(l3, -1.4)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = rect_cases(7, 3, 0.55, CARREAU, CARREAU_B).move_to(P(-3.7, 0.6))

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(FadeIn(numeros(g, 20, "#0f172a")), g.animate.set_fill(VERT_F), run_time=0.4)

        self._ph_sans_audit = (2,)  # « L'aire est de 21 carreaux. » : le 21 est REDIT (montré au mot « L'aire »)
        self.question_pause("05-question", "05b-reponse", ["Un rectangle a 3 rangées", "de 7 carreaux.",
                                                           "Quelle est son aire ?"],
                            [self.choix("21 carreaux"), self.choix("10 carreaux"), self.choix("20 carreaux")], 0,
                            ["3 rangées de 7 :", "3 × 7 = 21.", "L'aire est de 21 carreaux."],
                            mot_q="Un rectangle", autres_q=autres_q, autres_r=apres)
        self._ph_sans_audit = ()

    # ── 06 : le piège (ajouter, ou faire le tour) ───────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        g = self.parcelle(0.55, P(-3.6, 0.2), plantee=False)
        self.au_mot("Pour un rectangle")
        l1 = self.t("4 cases sur 6", 34)
        self.col(l1, 2.3)
        self.play(FadeIn(g), FadeIn(l1, shift=UP * 0.1), run_time=0.45)
        self.au_mot("on n'ajoute pas")
        l2 = self.ligne([("Pas 4 + 6", ROUGE_ERREUR), ("= 10", ROUGE_ERREUR)], 36, buff=0.25)
        self.col(l2, 1.6)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.35)
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("et 10 cases")
        dix = VGroup(*g[:10])
        l3 = self.bloc(["10 cases ne couvrent", "pas la parcelle !"], 32, ROUGE_ERREUR)
        self.col(l3, 0.75)
        self.play(FadeIn(l3, shift=UP * 0.1), dix.animate.set_fill(ROUGE_F), run_time=0.5)
        self.au_mot("On ne fait pas le tour")
        pl = contour(g, PLINTHE, 9)
        l4 = self.pile([("Pas le tour non plus :", PLINTHE), ("c'est le périmètre.", PLINTHE)], 32)
        self.col(l4, -0.45)
        self.play(FadeIn(l4[0], shift=UP * 0.1), Create(pl), run_time=0.8)
        self.au_mot("ça, c'est le périmètre")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Pour l'aire")
        l5 = self.ligne([("Aire :", VERT_OK), ("4 × 6", VERT_OK), ("= 24", VERT_OK)], 38, buff=0.25)
        self.col(l5, -1.6)
        self.play(FadeOut(pl), g.animate.set_fill(SALADE).set_stroke(SALADE_B), FadeIn(l5[0], shift=UP * 0.1),
                  run_time=0.4)
        self.au_mot("4 fois 6")
        hors_audit(l5[1])  # 4 et 6 REDITS (« 4 plus 6 » plus haut) : l'audit les compare au premier dit
        self.play(FadeIn(l5[1], shift=UP * 0.1), run_time=0.3)
        self.play(FadeIn(l5[2], shift=UP * 0.1), run_time=0.3)
        self.insister(l5, 1.1, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g = rect_cases(3, 3, 0.7, ROSE_D, "#831843").move_to(P(-3.7, 0.6))

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            sc.play(FadeIn(numeros(g, 24, "#0f172a")), g.animate.set_fill(VERT_F), run_time=0.4)

        self._ph_couper = {1: ("3 × 3", "= 9.")}  # « 3 fois 3 » est dit 1 s avant « 9 »
        self.question_pause("07-question", "07b-reponse", ["Un carré a 3 carreaux", "de côté.",
                                                           "Quelle est son aire ?"],
                            [self.choix("12 carreaux"), self.choix("6 carreaux"), self.choix("9 carreaux")], 2,
                            ["3 rangées de 3 carreaux :", "3 × 3 = 9.", "L'aire du carré est de 9 carreaux."],
                            mot_q="Un carré", autres_q=autres_q, autres_r=apres)
        self._ph_couper = {}

    # ── 08 : le défi (en deux étapes) ───────────────────────────────────────
    def jardin(self):
        g = rect_cases(8, 6, 0.42, TERRE, TERRE_B).move_to(P(-3.7, 0.3))
        for q in g[:20]:
            q.set_fill(SALADE).set_stroke(SALADE_B)
        return g

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        g = self.jardin()
        terre = [q.copy().set_fill(TERRE).set_stroke(TERRE_B) for q in g[:20]]
        self.au_mot("Le grand jardin")
        l1 = self.ligne([("6 rangées", ORANGE_RETENUE), ("de 8 cases", CARREAU)], 34)
        self.col(l1, 2.2)
        self.play(FadeIn(VGroup(*terre, *g[20:])), run_time=0.4)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Elle a déjà planté")
        l2 = self.t("Déjà planté : 20 cases", 34, SALADE)
        self.col(l2, 1.5)
        self.play(FadeIn(l2, shift=UP * 0.1), LaggedStart(*[FadeIn(q, scale=1.3) for q in g[:20]], lag_ratio=0.03),
                  run_time=0.7)
        self.remove(*terre)
        self.au_mot("Combien")
        q = self.bloc(["Combien de mètres carrés", "reste-t-il à planter ?"], 36, JAUNE_TITRE)
        self.col(q, 0.35)
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(VGroup(*g[20:])), run_time=0.5)
        self.pause_defi(y=-1.6)  # au-dessus de Ti-Margo

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        g = self.jardin()
        self.add(g)
        self.au_mot("D'abord")
        l0 = self.t("D'abord, l'aire du jardin :", 32)
        self.col(l0, 2.2)
        self.play(FadeIn(l0, shift=UP * 0.1), Indicate(g, scale_factor=1.03), run_time=0.4)
        l1 = self.ligne([("6 × 8", BLEU_D), ("= 48 m²", VERT_OK)], 40, buff=0.3)
        self.col(l1, 1.5)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.35)
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Ensuite")
        l2 = self.bloc(["Ensuite, on enlève", "ce qui est planté :"], 32)
        self.col(l2, 0.55)
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(VGroup(*g[:20]), color=SALADE, scale_factor=1.04), run_time=0.45)
        l3 = self.ligne([("48 − 20", BLEU_D), ("= 28", VERT_OK)], 40, buff=0.3)
        self.col(l3, -0.4)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.35)
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Il reste")
        res = self.gros("Il reste 28 m²", fs=42)
        self.col(res, -1.4)
        self.play(FadeIn(res, scale=1.2), Indicate(VGroup(*g[20:]), color=VERT_OK, scale_factor=1.04), run_time=0.5)
        self.insister(res, 1.1, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        a = rect_cases(4, 3, 0.45, SALADE, SALADE_B)
        b = rect_cases(3, 3, 0.45, HERBES, "#365314")
        fig = VGroup(a, b).arrange(DOWN, buff=0.45)
        lignes = self.finale_gauche(fig, textes=[
            ("L'aire d'un rectangle : rangées", "× cases dans une rangée."),
            ("L'aire d'un carré :", "côté × côté."),
            ("On multiplie,", "on n'ajoute pas.")], fs=32)
        self.add(fig)
        self.au_mot("L'aire d'un rectangle")
        self.montrer_ligne(lignes[0], Indicate(a, scale_factor=1.05))
        self.au_mot("L'aire d'un carré")
        self.montrer_ligne(lignes[1], Indicate(b, scale_factor=1.05))
        self.au_mot("On multiplie")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_rangees()
        self.ecran_multiplier()
        self.ecran_carre()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class AireCarreRectangleCM1(AireCarreRectangleBase):
    identite = "Maths CM1 — EleveAI"
    ceinture = "verte"
