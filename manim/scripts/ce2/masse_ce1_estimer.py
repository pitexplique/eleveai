# masse_ce1_estimer.py
# EleveAI — Maths CE1 — série « Masses » (CP → CM2), ÉPISODE CE1 03 : estimer une masse
# (micro ce1_masse_estimer, notion masse), AVEC VOIX.
# Paysage 16:9, CEINTURE BLANCHE. Short jumeau : film Ti Margo (la gomme de « 1 kilogramme »).
# Décor et métier : Chloé, BIBLIOTHÉCAIRE (centres : histoire, art).
# Mapping micro → écrans : 02 (deux repères : trombone 1 g, brique de lait 1 kg), 03 (dictionnaire 1 kg, petit livre 200 g),
# 04 question (la brique de lait), 05 piège (3 kg = trois briques ; trousse 300 g), 06 question (une trousse de 3 kg ?),
# 07 défi (le cartable : 3 g, 3 kg ou 300 kg ?), 07b correction, 08 ce que tu as appris.
# Voix : manim/voix/ce1-masse-estimer.json (source : masse_voix.py, validée le 16/11).
# Marques : python manim/scripts/ce2/perimetre_marques.py masse:estimer:ce1
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/masse_ce1_estimer.py MasseEstimerCE1
# Sortie : manim/sorties/ce1/maths/masse/03-estimer/eleveai-maths-ce1-masse-estimer.mp4

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from masse_commun import *  # noqa: E402,F403
from masse_cp_estimer import MasseEstimerCPBase  # noqa: E402

_V = {e["id"]: e for e in json.load(open(Path(__file__).resolve().parent / "masse_voix.json", encoding="utf-8"))}
EP = _V["ce1-masse-estimer"]
Q1, Q2 = EP["questions"]
VIOLET = "#a78bfa"


def court(s):
    return s[0].upper() + s[1:]


class MasseEstimerCE1Base(MasseEstimerCPBase):
    nom_voix = "ce1-masse-estimer"
    fichier_marques = "masse_ce1_estimer_marques.json"
    ceinture = "blanche"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Estimer une masse", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Estimer une masse")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q0 = self.t("Une trousse peut-elle", 40, JAUNE_TITRE)
        q1 = self.t("peser 3 kg ?", 40, JAUNE_TITRE)
        q = VGroup(q0, q1).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        f = trousse(1.6).move_to(P(4.0, 0.35))
        self.au_mot("Une trousse")
        self.play(FadeIn(q0, shift=UP * 0.2), FadeIn(f, scale=1.1), run_time=0.45)
        self.au_mot("peser 3")
        self.play(FadeIn(q1, shift=UP * 0.2), run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 01 : Chloé, bibliothécaire ──────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = chloe(0.95).move_to(P(-4.9, 0.4))
        nom = self.t("Chloé", 42, VIOLET).next_to(pe, UP, buff=0.4)
        self.au_mot("Voici Chloé")
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Elle est bibliothécaire")
        met = self.t("bibliothécaire", 26, VIOLET).next_to(pe, DOWN, buff=0.15)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("Elle range des livres")
        l0 = self.t("Elle range des livres,", 34, GRAY_B)
        self.col(l0, 2.7, -2.4)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        d = dictionnaire(1.5).move_to(P(-0.6, 0.7))
        pl = petit_livre(1.2).move_to(P(2.4, 0.55))
        self.au_mot("des gros")
        l1 = self.t("des gros et des petits.", 34, GRAY_B)
        self.col(l1, 2.05, -2.4)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(d, shift=DOWN * 0.3), run_time=0.35)
        self.au_mot("des petits")
        self.play(FadeIn(pl, shift=DOWN * 0.3), run_time=0.3)
        self.au_mot("Elle doit savoir")
        l2 = self.bloc(["Elle doit savoir", "ce qu'elle peut porter."], 36, JAUNE_TITRE)
        self.col(l2, -1.3, -2.4)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("ce qu'elle peut porter")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 02 : deux repères ───────────────────────────────────────────────────
    def repere(self, obj, x, mot0, txt0, mot1, txt1, coul):
        self.au_mot(mot0)
        l0 = self.t(txt0, 34).move_to(P(x, -0.9))
        self.play(FadeIn(obj, scale=1.2), FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        self.au_mot(mot1)
        l1 = self.t(txt1, 44, coul).next_to(l0, DOWN, buff=0.25)
        self.play(FadeIn(l1, scale=1.2), run_time=0.35)
        return VGroup(l0, l1)

    def ecran_reperes(self):
        self.ecran("02-reperes")
        self.au_mot("Deux repères")
        tit = self.t("Deux repères", 46, JAUNE_TITRE).move_to(P(0, 3.0))
        self.play(Write(tit), run_time=0.4)
        tb = trombone_m(2.6).move_to(P(-3.3, 1.0))
        br = brique_lait(1.6).move_to(P(2.6, 1.0))
        self.repere(tb, -3.3, "Un trombone", "Un trombone :", "1 gramme", "environ 1 g", LEGER)
        self.repere(br, 2.6, "Une brique de lait", "Une brique de lait pleine :", "1 kilogramme", "environ 1 kg", LOURD)
        self.attendre_voix()

    # ── 03 : les livres ─────────────────────────────────────────────────────
    def ecran_livres(self):
        self.ecran("03-livres")
        d = dictionnaire(2.0).move_to(P(-4.0, 1.5))
        br = brique_lait(1.1).move_to(P(-1.5, 1.6))
        pl = petit_livre(1.4).move_to(P(-4.0, -0.9))
        XT = -0.2
        self.au_mot("Un gros dictionnaire")
        l0 = self.t("Un gros dictionnaire :", 34)
        gauche(l0, XT, 2.0)
        self.play(FadeIn(d, shift=DOWN * 0.3), FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        self.au_mot("1 kilogramme")
        l1 = self.t("environ 1 kg,", 40, LOURD)
        gauche(l1, XT, 1.35)
        self.play(FadeIn(l1, scale=1.1), run_time=0.3)
        self.au_mot("comme la brique")
        l2 = self.t("comme la brique.", 34, GRAY_B)
        gauche(l2, XT, 0.75)
        self.play(FadeIn(br, shift=LEFT * 0.3), FadeIn(l2, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Un petit livre")
        l3 = self.t("Un petit livre :", 34)
        gauche(l3, XT, -0.6)
        self.play(FadeIn(pl, shift=DOWN * 0.3), FadeIn(l3, shift=UP * 0.1), run_time=0.4)
        self.au_mot("200 grammes")
        l4 = self.t("environ 200 g.", 40, LEGER)
        gauche(l4, XT, -1.25)
        self.play(FadeIn(l4, scale=1.1), run_time=0.3)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (la brique de lait) ─────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        br = brique_lait(1.8).move_to(P(-4.4, 1.7))
        fig = VGroup(br)

        def avant_q(sc):
            sc.play(FadeIn(fig, shift=UP * 0.2), run_time=0.2)

        def apres(sc):
            sc.play(Indicate(br, color=VERT_OK, scale_factor=1.1), run_time=0.4)

        self.question_gauche("04-question", "04b-reponse",
                             ["Environ combien pèse", "une brique de lait", "pleine ?"],
                             [self.choix(court(c_), fs=26) for c_ in Q1["choix"]], Q1["reponse"],
                             ["Une brique de lait", "de 1 litre pèse", "environ 1 kg."],
                             -0.3, mot_q="Environ combien", avant_q=avant_q, autres_r=apres)

    # ── 05 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        self.au_mot("Attention aux nombres impossibles")
        tit = self.t("Attention aux nombres impossibles !", 40, ROUGE_ERREUR)
        gauche(tit, -6.0, 3.0)
        self.play(Write(tit), run_time=0.45)
        self.au_mot("3 kilogrammes")
        l0 = self.t("3 kg,", 44, LOURD)
        gauche(l0, -6.0, 1.9)
        bs = VGroup(*[brique_lait(1.2) for _ in range(3)]).arrange(RIGHT, buff=0.35).move_to(P(2.2, 1.6))
        self.play(FadeIn(l0, scale=1.1), run_time=0.3)
        self.au_mot("c'est trois briques")
        l1 = self.t("c'est trois briques de lait.", 34)
        gauche(l1, -6.0, 1.2)
        self.play(FadeIn(l1, shift=UP * 0.1), LaggedStart(*[FadeIn(b, shift=DOWN * 0.3) for b in bs], lag_ratio=0.3),
                  run_time=0.6)
        tr = trousse(1.5).move_to(P(2.2, -1.0))
        self.au_mot("Une trousse")
        l2 = self.t("Une trousse :", 34)
        gauche(l2, -6.0, -0.6)
        self.play(FadeIn(tr, shift=DOWN * 0.3), FadeIn(l2, shift=UP * 0.1), run_time=0.4)
        self.au_mot("300 grammes")
        l3 = self.t("environ 300 g.", 44, VERT_OK)
        gauche(l3, -6.0, -1.35)
        self.play(FadeIn(l3, scale=1.1), run_time=0.3)
        self.insister(l3, 1.15, 0.3)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (une trousse de 3 kg ?) ─────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        tr = trousse(1.7).move_to(P(-4.4, 2.1))
        e = hors_audit(Text("3 kg ?", font_size=40, color=ROUGE_ERREUR, weight=BOLD)).next_to(tr, DOWN, buff=0.3)
        fig = VGroup(tr, e)

        def avant_q(sc):
            sc.play(FadeIn(fig, shift=UP * 0.2), run_time=0.2)

        def apres(sc):
            sc.play(Indicate(e, color=ROUGE_ERREUR, scale_factor=1.2), run_time=0.4)

        self.fs_choix, self.decal_q, self.elargir_q = 24, 2.6, 1.8
        self.question_gauche("06-question", "06b-reponse",
                             ["Un élève écrit :", "« Ma trousse", "pèse 3 kg. »", "Est-ce possible ?"],
                             [self.choix(court(c_), fs=26) for c_ in Q2["choix"]], Q2["reponse"],
                             ["3 kg, c'est trois", "briques de lait.", "Une trousse :", "environ 300 g."],
                             0.4, mot_q="Un élève écrit", avant_q=avant_q, autres_r=apres)
        self.fs_choix, self.decal_q, self.elargir_q = 26, 1.8, 1.2

    # ── 07 : le défi (le cartable) ──────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("07-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        ca = cartable(1.9).move_to(P(3.9, 0.7))
        self.au_mot("Le cartable de Chloé")
        l0 = self.t("Le cartable de Chloé pèse-t-il :", 36)
        gauche(l0, -6.0, 1.9)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(ca, shift=DOWN * 0.3), run_time=0.45)
        ops = [self.t(t_, 40, JAUNE_TITRE) for t_ in ("3 g ?", "3 kg ?", "300 kg ?")]
        for k, o in enumerate(ops):
            gauche(o, -5.6 + k * 2.6, 0.8)
        self.au_mot("3 grammes")
        self.play(FadeIn(ops[0], scale=1.2), run_time=0.3)
        self.wait(1.0)  # « 3 kilogrammes » n'a pas de marque : juste après « 3 grammes, »
        self.play(FadeIn(ops[1], scale=1.2), run_time=0.3)
        self.au_mot("ou 300 kilogrammes")
        self.play(FadeIn(ops[2], scale=1.2), run_time=0.3)
        self.au_mot("Mets pause")
        p = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE)
        gauche(p, -6.0, -0.4)
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("07b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        tbs = VGroup(*[trombone_m(1.4) for _ in range(3)]).arrange(RIGHT, buff=0.25).move_to(P(-4.4, 1.5))
        pi = piano(1.3).move_to(P(-0.3, 1.5))
        ca = cartable(1.4).move_to(P(3.9, 1.5))
        self.au_mot("3 grammes")
        a0 = self.t("3 g :", 38, LEGER).move_to(P(-4.4, 0.15))
        self.play(FadeIn(a0, shift=UP * 0.1), run_time=0.3)
        self.au_mot("c'est trois trombones")
        a1 = self.t("trois trombones", 30).next_to(a0, DOWN, buff=0.2)
        self.play(FadeIn(tbs, shift=DOWN * 0.2), FadeIn(a1), run_time=0.35)
        self.au_mot("trop léger")
        a2 = self.t("trop léger !", 32, ROUGE_ERREUR).next_to(a1, DOWN, buff=0.2)
        self.play(FadeIn(a2, scale=1.1), run_time=0.3)
        self.au_mot("300 kilogrammes")
        b0 = self.t("300 kg :", 38, LOURD).move_to(P(-0.3, 0.15))
        self.play(FadeIn(b0, shift=UP * 0.1), run_time=0.3)
        self.au_mot("c'est un piano")
        b1 = self.t("un piano", 30).next_to(b0, DOWN, buff=0.2)
        self.play(FadeIn(pi, shift=DOWN * 0.2), FadeIn(b1), run_time=0.35)
        self.au_mot("trop lourd")
        b2 = self.t("trop lourd !", 32, ROUGE_ERREUR).next_to(b1, DOWN, buff=0.2)
        self.play(FadeIn(b2, scale=1.1), run_time=0.3)
        self.au_mot("Le cartable pèse")
        c1 = self.t("le cartable", 30).move_to(P(3.9, b1.get_center()[1]))
        self.play(FadeIn(ca, shift=DOWN * 0.2), FadeIn(c1), run_time=0.35)
        self.au_mot("3 kilogrammes")
        c0 = self.t("environ 3 kg", 38, VERT_OK).move_to(P(3.9, 0.15))
        self.play(FadeIn(c0, scale=1.2), run_time=0.35)
        self.insister(c0, 1.15, 0.3)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.65)
        fig = VGroup(trombone_m(1.4), brique_lait(0.9)).arrange(RIGHT, buff=0.5, aligned_edge=DOWN)
        lignes = self.finale_gauche(fig, textes=[
            ("Pour estimer, on compare", "à un repère."),
            ("1 g : un trombone.", "1 kg : une brique de lait.")], fs=36)
        self.add(fig)
        self.au_mot("Pour estimer")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("1 gramme")
        self.montrer_ligne(lignes[1])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_reperes()
        self.ecran_livres()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")


class MasseEstimerCE1(MasseEstimerCE1Base):
    identite = "Maths CE1 — EleveAI"
    ceinture = "blanche"
