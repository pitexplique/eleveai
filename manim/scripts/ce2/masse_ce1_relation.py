# masse_ce1_relation.py
# EleveAI — Maths CE1 — série « Masses » (CP → CM2), ÉPISODE CE1 02 : 1 kilogramme = 1 000 grammes
# (micro ce1_masse_relation_kg_g, notion masse), AVEC VOIX.
# Paysage 16:9, CEINTURE BLANCHE. Short jumeau : film Ti Margo (1 kg de billes contre 1 000 g).
# Décor et métier : Liam, VENDEUR EN VRAC (centres : cuisine, argent).
# Mapping micro → écrans : 02 (équilibre : 1 kg d'un côté, 1 000 g de l'autre), 03 (deux sacs de 500 g),
# 04 question (1 kg = 100 g ?), 05 (quatre sacs de 250 g), 06 question (combien de paquets de 500 g ?),
# 07 défi (600 g : combien ajouter ?), 07b correction (il manque 400 g), 08 ce que tu as appris.
# Voix : manim/voix/ce1-masse-relation.json (source : masse_voix.py, validée le 16/11).
# Marques : python manim/scripts/ce2/perimetre_marques.py masse:relation:ce1
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/masse_ce1_relation.py MasseRelationCE1
# Sortie : manim/sorties/ce1/maths/masse/02-relation/eleveai-maths-ce1-masse-relation.mp4

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from masse_commun import *  # noqa: E402,F403
from masse_cp_estimer import MasseEstimerCPBase  # noqa: E402

_V = {e["id"]: e for e in json.load(open(Path(__file__).resolve().parent / "masse_voix.json", encoding="utf-8"))}
EP = _V["ce1-masse-relation"]
Q1, Q2 = EP["questions"]
VERT_T = "#22c55e"
ABR = {"grammes": "g"}


def court(s):
    for a, b in ABR.items():
        s = s.replace(a, b)
    return s[0].upper() + s[1:]


class MasseRelationCE1Base(MasseEstimerCPBase):
    nom_voix = "ce1-masse-relation"
    fichier_marques = "masse_ce1_relation_marques.json"
    ceinture = "blanche"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("1 kg, c'est combien de grammes ?", self.identite, self.ceinture, y_ech=-2.45)
        hors_audit(titre)  # le titre est la première phrase dite
        self.au_mot("1 kilogramme, c'est combien")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q1 = self.t("Deux sacs de 500 g :", 40, JAUNE_TITRE)
        q2 = self.t("est-ce 1 kg ?", 40, JAUNE_TITRE)
        q = VGroup(q1, q2).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        f = VGroup(sac("500 g", 0.9), sac("500 g", 0.9)).arrange(RIGHT, buff=0.3).move_to(P(4.3, 0.3))
        self.au_mot("Deux sacs de 500")
        self.play(FadeIn(q1, shift=UP * 0.2), LaggedStart(*[FadeIn(x, scale=1.1) for x in f], lag_ratio=0.3),
                  run_time=0.5)
        self.au_mot("est-ce 1 kilogramme")
        self.play(FadeIn(q2, shift=UP * 0.2), run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 01 : Liam, vendeur en vrac ──────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = liam(0.95).move_to(P(-4.9, 0.4))
        nom = self.t("Liam", 42, VERT_T).next_to(pe, UP, buff=0.4)
        self.au_mot("Voici Liam")
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Il vend du riz")
        met = self.t("vendeur en vrac", 26, VERT_T).next_to(pe, DOWN, buff=0.15)
        l0 = self.t("Il vend du riz, des lentilles", 34, GRAY_B)
        self.col(l0, 2.7, -2.4)
        self.play(FadeIn(met, shift=DOWN * 0.1), FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        bs = [bocal(c_, 1.3).move_to(P(x, 0.55)) for c_, x in (("#f8fafc", -1.0), ("#ea580c", 1.0), ("#a3a35b", 3.0))]
        ns = [self.t(n, 28).next_to(b, DOWN, buff=0.2) for n, b in zip(("riz", "lentilles", "graines"), bs)]
        for b, n, mot in zip(bs, ns, ("du riz", "des lentilles", "et des graines")):
            self.au_mot(mot)
            self.play(FadeIn(b, shift=DOWN * 0.3), FadeIn(n), run_time=0.3)
        l1 = self.t("et des graines en vrac.", 34, GRAY_B)
        self.col(l1, 2.05, -2.4)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("On vient avec son sac")
        l2 = self.t("On vient avec son sac,", 34, JAUNE_TITRE)
        self.col(l2, -1.4, -2.4)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        self.au_mot("il pèse ce qu'on veut")
        l3 = self.t("il pèse ce qu'on veut.", 34, JAUNE_TITRE)
        self.col(l3, -2.05, -2.4)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.35)
        self.attendre_voix()

    # ── 02 : l'équilibre ────────────────────────────────────────────────────
    def ecran_equilibre(self):
        self.ecran("02-equilibre")
        b = Balance(4.6).move_to(P(-3.0, 0.6))
        self.add(b)
        g = b.poser(masse_marquee("1 kg", 1.6), "g")
        d = b.poser(sac("1 000 g", 1.3), "d")
        self.au_mot("1 kilogramme")
        eg = self.etiquette_plateau(b, "g", "1 kg", 34, audit=True)
        self.play(FadeIn(g, shift=DOWN * 0.3), FadeIn(eg), run_time=0.4)
        self.au_mot("1 000 grammes")
        ed = self.etiquette_plateau(b, "d", "1 000 g", 34, audit=True)
        self.play(FadeIn(d, shift=DOWN * 0.3), FadeIn(ed), run_time=0.4)
        self.au_mot("Équilibre")
        eq = self.t("Équilibre !", 46, VERT_OK).move_to(P(-3.0, 3.1))
        self.play(FadeIn(eq, scale=1.3), Wiggle(b.flau if hasattr(b, "flau") else b, scale_value=1.02), run_time=0.6)
        XR = 1.6
        l = self.ligne([("1 kg", JAUNE_TITRE), ("=", WHITE), ("1 000 g", VERT_OK)], 48, buff=0.25)
        gauche(l, 0.9, 0.4)
        self.au_mot("1 kilogramme, c'est")
        self.play(FadeIn(l[:2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("1 000 grammes", 2)
        self.play(FadeIn(l[2], shift=UP * 0.1), run_time=0.3)
        self.play(Indicate(l, color=VERT_OK, scale_factor=1.1), run_time=0.8)
        self.attendre_voix()

    # ── 03 : deux sacs de 500 g ─────────────────────────────────────────────
    def ecran_deux_sacs(self):
        self.ecran("03-deux-sacs")
        self.au_mot("Un client veut 1 kilogramme")
        l0 = self.t("Un client veut 1 kg de lentilles.", 38, JAUNE_TITRE)
        gauche(l0, -6.0, 2.9)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Liam remplit")
        s1, s2 = sac("500 g", 1.6, "#fdba74"), sac("500 g", 1.6, "#fdba74")
        VGroup(s1, s2).arrange(RIGHT, buff=0.9).move_to(P(-2.6, 0.25))
        l1 = self.t("Liam remplit deux sacs de 500 g.", 34)
        gauche(l1, -6.0, 2.1)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(s1, shift=DOWN * 0.3), FadeIn(s2, shift=DOWN * 0.3), run_time=0.35)
        l2 = self.ligne([("500", BLEU_D), ("+", WHITE), ("500", BLEU_D), ("=", WHITE), ("1 000 g", VERT_OK),
                         ("= 1 kg", JAUNE_TITRE)], 48, buff=0.22)
        base_commune(l2)
        gauche(l2, -6.0, -1.6)
        self.au_mot("500 grammes.")
        self.wait(1.2)  # « 500 plus 500 » n'a pas de marque : juste après « 500 grammes. »
        self.play(FadeIn(l2[:3], shift=UP * 0.1), run_time=0.25)
        self.au_mot("1 000 grammes")
        self.play(FadeIn(l2[3:5], shift=UP * 0.1), run_time=0.25)
        self.au_mot("1 kilogramme", 2)
        self.play(FadeIn(l2[5], shift=UP * 0.1), run_time=0.35)
        self.play(Indicate(l2, color=VERT_OK, scale_factor=1.08), run_time=0.8)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (1 kg = 100 g ?) ────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        a = ardoise("1 kg = 100 g", 1.25).move_to(P(-4.3, 1.9))
        fig = VGroup(a)

        def avant_q(sc):
            sc.play(FadeIn(fig, shift=UP * 0.2), run_time=0.15)

        def apres(sc):
            sc.play(Indicate(a, color=ROUGE_ERREUR, scale_factor=1.06), run_time=0.4)

        self.fs_choix, self.decal_q, self.elargir_q = 24, 2.6, 1.8
        self.question_gauche("04-question", "04b-reponse",
                             ["Un élève écrit :", "1 kg = 100 g.", "A-t-il raison ?"],
                             [self.choix(court(c_), fs=26) for c_ in Q1["choix"]], Q1["reponse"],
                             ["1 kg = 1 000 g.", "Pas 100 !"],
                             0.5, q_sans_audit=(1,), mot_q="Un élève écrit", avant_q=avant_q, autres_r=apres)
        self.fs_choix, self.decal_q, self.elargir_q = 26, 1.8, 1.2

    # ── 05 : quatre sacs de 250 g ───────────────────────────────────────────
    def ecran_quatre_sacs(self):
        self.ecran("05-quatre-sacs")
        self.au_mot("Avec des sacs de 250")
        l0 = self.t("Avec des sacs de 250 g ?", 40, JAUNE_TITRE)
        gauche(l0, -6.0, 2.9)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.25)
        ss = VGroup(*[sac("250 g", 1.25, "#fde68a") for _ in range(4)]).arrange(RIGHT, buff=0.95).move_to(P(-0.9, 0.9))
        cum = ["250", "500", "750", "1 000"]
        mots = ["250, 500", "500, 750", "750, 1 000", "1 000. Il"]
        for k, (s_, c_) in enumerate(zip(ss, cum)):
            t = self.t(c_ + (" g" if k == 3 else ""), 40, VERT_OK if k == 3 else BLEU_D).next_to(s_, DOWN, buff=0.35)
            if k == 0:
                self.au_mot("250, 500")
            else:
                self.au_mot(c_ + ("," if k < 3 else "."))
            self.play(FadeIn(s_, shift=DOWN * 0.3), FadeIn(t, scale=1.2), run_time=0.3)
        l1 = self.ligne([("Il en faut 4", VERT_OK), ("pour 1 kg.", VERT_OK)], 40, buff=0.2)
        l1[1].shift(UP * (l1[0][-1].get_bottom()[1] - l1[1][4].get_bottom()[1]))  # même ligne de base (« 4 », « 1 »)
        gauche(l1, -6.0, -1.9)
        self.au_mot("Il en faut 4")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("pour 1 kilogramme")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.insister(l1, 1.15, 0.3)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (combien de paquets de 500 g ?) ─────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        p = paquet("500 g", 1.4, "#fb923c").move_to(P(-5.2, 1.9))
        m = masse_marquee("1 kg", 1.5).move_to(P(-3.3, 1.95))
        eg = Text("?", font_size=44, color=JAUNE_TITRE, weight=BOLD).move_to(P(-4.25, 1.9))
        fig = VGroup(p, hors_audit(eg), m)

        def avant_q(sc):
            sc.play(FadeIn(fig, shift=UP * 0.2), run_time=0.35)

        def apres(sc):
            p2 = paquet("500 g", 1.4, "#fb923c").next_to(p, DOWN, buff=0.2)
            sc.play(FadeIn(p2, shift=DOWN * 0.2), run_time=0.4)

        self.question_gauche("06-question", "06b-reponse",
                             ["Combien de paquets", "de 500 g pour", "faire 1 kg ?"],
                             [self.choix(court(c_), fs=26) for c_ in Q2["choix"]], Q2["reponse"],
                             ["500 + 500", "= 1 000 g = 1 kg.", "Il en faut 2."],
                             -0.5, q_sans_audit=(1,), mot_q="Combien de paquets", avant_q=avant_q, autres_r=apres)

    # ── 07 : le défi (600 g, combien ajouter ?) ─────────────────────────────
    def ecran_defi(self):
        self.ecran("07-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        bal = balance_electronique("600 g", 1.6).move_to(P(3.6, -0.6))
        tas = bocal("#f8fafc", 1.3).next_to(bal.plateau, UP, buff=0.02)
        self.au_mot("Liam a 600")
        l0 = self.t("Liam a 600 g de riz.", 36)
        gauche(l0, -6.0, 1.9)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(bal), FadeIn(tas, shift=DOWN * 0.3), run_time=0.45)
        self.au_mot("Combien de grammes ajouter")
        l1 = self.bloc(["Combien de grammes ajouter", "pour avoir 1 kg ?"], 36, JAUNE_TITRE)
        gauche(l1, -6.0, 0.6)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("pour avoir 1 kilogramme")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Mets pause")
        p = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE)
        gauche(p, -6.0, -1.3)
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("07b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        l0 = self.ligne([("1 kg", JAUNE_TITRE), ("= 1 000 g.", VERT_OK)], 40, buff=0.25)
        gauche(l0, -6.0, 2.1)
        X0, L = -5.6, 10.0
        barre = Rectangle(width=L, height=0.6, stroke_color=WHITE, stroke_width=3).move_to(P(X0 + L / 2, 0.6))
        plein = Rectangle(width=L * 0.6, height=0.6, fill_color=BLEU_D, fill_opacity=0.9, stroke_width=0)
        plein.align_to(barre, LEFT).align_to(barre, DOWN)
        manque = Rectangle(width=L * 0.4, height=0.6, fill_color=ORANGE_RETENUE, fill_opacity=0.9, stroke_width=0)
        manque.next_to(plein, RIGHT, buff=0)
        g0 = hors_audit(self.t("0", 28)).next_to(barre.get_corner(DL), DOWN, buff=0.15)
        g1 = hors_audit(self.t("1 000 g", 30, VERT_OK)).next_to(barre.get_corner(DR), DOWN, buff=0.15)
        g6 = hors_audit(self.t("600 g", 30, BLEU_D)).next_to(plein.get_corner(DR), DOWN, buff=0.15)
        e4 = hors_audit(self.t("400 g", 34, ORANGE_RETENUE))
        l1 = self.ligne([("De 600", BLEU_D), ("à 1 000,", VERT_OK), ("il manque 400.", ORANGE_RETENUE)], 38, buff=0.2)
        gauche(l1, -6.0, -1.0)
        self.au_mot("1 kilogramme, c'est")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.2)
        self.au_mot("c'est 1 000")
        self.play(FadeIn(l0[1], shift=UP * 0.1), Create(barre), FadeIn(g0), FadeIn(g1), run_time=0.35)
        self.au_mot("De 600")
        self.play(FadeIn(l1[0], shift=UP * 0.1), GrowFromEdge(plein, LEFT), FadeIn(g6), run_time=0.35)
        self.au_mot("à 1 000")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Indicate(g1), run_time=0.3)
        self.au_mot("il manque 400")
        e4.next_to(manque, UP, buff=0.15)
        self.play(FadeIn(l1[2], shift=UP * 0.1), GrowFromEdge(manque, LEFT), FadeIn(e4, shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("Liam ajoute 400")
        l2 = self.t("Liam ajoute 400 g.", 42, VERT_OK)
        gauche(l2, -6.0, -2.0)
        self.play(FadeIn(l2, scale=1.1), run_time=0.4)
        self.insister(l2, 1.15, 0.3)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.65)
        b = Balance(3.0, s=0.8)
        fig = VGroup(b, b.poser(masse_marquee("1 kg", 1.0), "g"), b.poser(sac("1 000 g", 0.8), "d"))
        lignes = self.finale_gauche(fig, textes=[
            ("1 kg, c'est", "1 000 g."),
            ("2 fois 500 g,", "c'est 1 kg.")], fs=36)
        self.add(fig)
        self.au_mot("1 kilogramme, c'est")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("2 fois 500")
        self.montrer_ligne(lignes[1])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_equilibre()
        self.ecran_deux_sacs()
        self.ecran_question1()
        self.ecran_quatre_sacs()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")


class MasseRelationCE1(MasseRelationCE1Base):
    identite = "Maths CE1 — EleveAI"
    ceinture = "blanche"
