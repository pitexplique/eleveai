# masse_ce1_kg_g.py
# EleveAI — Maths CE1 — série « Masses » (CP → CM2), ÉPISODE CE1 01 : le kilogramme et le gramme
# (micro ce1_masse_kg_g, notion masse), AVEC VOIX.
# Paysage 16:9, CEINTURE BLANCHE. Short jumeau : film Ti Margo (le chaton de « 1 gramme »).
# Décor et métier : Jade, POSTIÈRE (centres : métiers, voyage).
# Mapping micro → écrans : 02 (le kilogramme, kg : le gros colis, 3 kg), 03 (le gramme, g : la lettre, 20 g),
# 04 question (l'abréviation de kilogramme), 05 (Jade lit sa balance : 2 kg, 5 g), 06 question (20… quoi ?),
# 07 défi (vélo 12 kg, clé 12 g), 07b correction, 08 ce que tu as appris.
# Voix : manim/voix/ce1-masse-kg-g.json (source : masse_voix.py, validée le 16/11).
# Marques : python manim/scripts/ce2/perimetre_marques.py masse:kg-g:ce1
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/masse_ce1_kg_g.py MasseKgGCE1
# Sortie : manim/sorties/ce1/maths/masse/01-kg-g/eleveai-maths-ce1-masse-kg-g.mp4

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from masse_commun import *  # noqa: E402,F403
from masse_cp_estimer import MasseEstimerCPBase, meme_ligne  # noqa: E402

_V = {e["id"]: e for e in json.load(open(Path(__file__).resolve().parent / "masse_voix.json", encoding="utf-8"))}
EP = _V["ce1-masse-kg-g"]
Q1, Q2 = EP["questions"]
JAUNE_CASQ = "#facc15"
ABR = {"k g": "kg", "k l": "kl", "g k": "gk"}


def court(s):
    s = ABR.get(s, s)
    return s if s in ABR.values() else s[0].upper() + s[1:]


class MasseKgGCE1Base(MasseEstimerCPBase):
    nom_voix = "ce1-masse-kg-g"
    fichier_marques = "masse_ce1_kg_g_marques.json"
    ceinture = "blanche"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Le kilogramme et le gramme", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Le kilogramme et le gramme")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q0 = self.t("Un colis, une lettre :", 40, JAUNE_TITRE)
        q1 = self.t("avec quelle unité", 40, JAUNE_TITRE)
        q2 = self.t("les pèse-t-on ?", 40, JAUNE_TITRE)
        q = VGroup(q0, q1, q2).arrange(DOWN, aligned_edge=LEFT, buff=0.25)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        f = VGroup(colis("#c08a4a", 1.2), lettre(1.0)).arrange(RIGHT, buff=0.5, aligned_edge=DOWN)
        f.move_to(P(3.9, 0.35))
        self.au_mot("Un colis")
        self.play(FadeIn(q0, shift=UP * 0.2), LaggedStart(*[FadeIn(x, scale=1.1) for x in f], lag_ratio=0.3),
                  run_time=0.6)
        self.au_mot("avec quelle unité")
        self.play(FadeIn(q1, shift=UP * 0.2), FadeIn(q2, shift=UP * 0.2), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 01 : Jade, postière ─────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = jade(0.95).move_to(P(-5.2, 0.4))
        nom = self.t("Jade", 42, JAUNE_CASQ).next_to(pe, UP, buff=0.4)
        self.au_mot("Voici Jade")
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Elle est postière")
        met = self.t("postière", 30, JAUNE_CASQ).next_to(pe, DOWN, buff=0.15)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("Elle pèse chaque colis")
        l0 = self.t("Elle pèse chaque colis", 34, GRAY_B)
        self.col(l0, 2.7, -2.4)
        c = colis("#c08a4a", 1.3).move_to(P(-0.9, 0.7))
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(c, shift=DOWN * 0.3), run_time=0.4)
        self.au_mot("et chaque lettre")
        l1 = self.t("et chaque lettre.", 34, GRAY_B)
        self.col(l1, 2.05, -2.4)
        le = lettre(1.2).move_to(P(1.9, 0.6))
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(le, shift=DOWN * 0.3), run_time=0.4)
        self.au_mot("Le prix de l'envoi")
        l2 = self.bloc(["Le prix de l'envoi", "dépend de la masse."], 36, JAUNE_TITRE)
        self.col(l2, -1.2, -2.4)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("dépend de la masse")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.play(Indicate(l2[1], color=JAUNE_TITRE, scale_factor=1.08), run_time=0.5)
        self.attendre_voix()

    # ── 02 / 03 : une unité, un objet, une balance ──────────────────────────
    def unite(self, cle, tit_txt, mot_tit, phrase, mot_phrase, sigle, mot_sigle, obj, aff, mot_aff, lig_aff, coul):
        self.ecran(cle)
        self.au_mot(mot_phrase)
        l0 = self.t(phrase, 34, coul)
        gauche(l0, -6.0, 1.95)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        self.au_mot(mot_tit)
        tit = self.t(tit_txt, 46, JAUNE_TITRE)
        gauche(tit, -6.0, 2.9)
        self.play(Write(tit), run_time=0.45)
        self.au_mot(mot_sigle)
        l1 = self.t("On écrit :", 34)
        gauche(l1, -6.0, 0.5)
        sg = hors_audit(Text(sigle, font_size=96, color=coul, weight=BOLD)).next_to(l1, RIGHT, buff=0.45)
        cadre = SurroundingRectangle(sg, color=coul, buff=0.2, corner_radius=0.15)
        self.play(FadeIn(l1), FadeIn(sg, scale=1.4), Create(cadre), run_time=0.5)
        bal = balance_electronique("0 g", 1.5).move_to(P(3.0, -1.4))
        obj.next_to(bal.plateau, UP, buff=0.02)
        l2 = self.ligne([(lig_aff[0], VERT_OK), (lig_aff[1], VERT_OK)], 36, buff=0.2)
        gauche(l2, -6.0, -1.5)
        self.au_mot(mot_aff[0])
        self.play(FadeIn(bal), FadeIn(obj, shift=DOWN * 0.5), FadeIn(l2[0], shift=UP * 0.1), run_time=0.45)
        self.au_mot(mot_aff[1])
        self.play(FadeIn(l2[1], shift=UP * 0.1), Transform(bal.affichage, afficher(bal, aff, 1.5)), run_time=0.4)
        self.play(Indicate(bal.ecran, color=VERT_OK), run_time=0.4)
        self.attendre_voix()

    def ecran_kg(self):
        self.unite("02-kg", "Le kilogramme", "on utilise le kilogramme", "Pour les objets lourds.",
                   "Pour les objets lourds", "kg", "On écrit k g", colis("#c08a4a", 1.8), "3 kg",
                   ("Le gros colis", "3 kilogrammes"), ("Le gros colis :", "3 kg."), LOURD)

    def ecran_g(self):
        self.unite("03-g", "Le gramme", "on utilise le gramme", "Pour les objets légers.",
                   "Pour les objets légers", "g", "On écrit g", lettre(1.3), "20 g",
                   ("La lettre pèse", "20 grammes"), ("La lettre :", "20 g."), LEGER)

    # ── 04 : QUESTION 1 (l'abréviation) ─────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        c = colis("#c08a4a", 1.4).move_to(P(-4.5, 1.9))
        m = hors_audit(Text("kilogramme", font_size=32, color=LOURD, weight=BOLD)).next_to(c, DOWN, buff=0.25)
        fig = VGroup(c, m)

        def avant_q(sc):
            sc.play(FadeIn(fig, shift=UP * 0.2), run_time=0.35)

        def apres(sc):
            sc.play(Indicate(m, color=VERT_OK, scale_factor=1.15), run_time=0.4)

        self.question_gauche("04-question", "04b-reponse",
                             ["Comment écrit-on", "« kilogramme »", "en abrégé ?"],
                             [self.choix(court(c_), fs=26) for c_ in Q1["choix"]], Q1["reponse"],
                             ["kg : le k de kilo,", "le g de gramme."],
                             -0.6, mot_q="Comment écrit-on", avant_q=avant_q, autres_r=apres)

    # ── 05 : Jade lit sa balance ────────────────────────────────────────────
    def ecran_balance(self):
        self.ecran("05-balance")
        self.au_mot("Jade lit sa balance")
        tit = self.t("Jade lit sa balance.", 44, JAUNE_TITRE).move_to(P(0, 3.0))
        self.play(Write(tit), run_time=0.4)
        for x, obj, aff, mot, lig, coul in ((-3.4, paquet(None, 1.6, "#60a5fa"), "2 kg", "Le paquet pèse 2",
                                             "Le paquet : 2 kg", LOURD),
                                            (2.6, carte_postale(1.4), "5 g", "La carte postale pèse 5",
                                             "La carte postale : 5 g", LEGER)):
            bal = balance_electronique("0 g", 1.5).move_to(P(x, 0.0))
            obj.next_to(bal.plateau, UP, buff=0.02)
            self.au_mot(mot)
            l = self.t(lig, 34, coul).move_to(P(x, -1.3))
            self.play(FadeIn(bal), FadeIn(obj, shift=DOWN * 0.5), FadeIn(l, shift=UP * 0.1), run_time=0.4)
            self.play(Transform(bal.affichage, afficher(bal, aff, 1.5)), run_time=0.3)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (20… quoi ?) ────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        bal = balance_electronique("20 ?", 1.3).move_to(P(-4.5, 1.2))
        le = lettre(1.1).next_to(bal.plateau, UP, buff=0.02)
        fig = VGroup(bal, le)

        def avant_q(sc):
            sc.play(FadeIn(fig, shift=UP * 0.2), run_time=0.35)

        def apres(sc):
            sc.play(Transform(bal.affichage, afficher(bal, "20 g", 1.3)), run_time=0.4)

        self.fs_choix, self.decal_q, self.elargir_q = 24, 2.4, 1.6
        self.question_gauche("06-question", "06b-reponse",
                             ["La lettre de Jade", "pèse 20… quoi ?"],
                             [self.choix(court(c_), fs=26) for c_ in Q2["choix"]], Q2["reponse"],
                             ["Une lettre est", "légère : 20 g.", "Le litre mesure", "une contenance."],
                             -0.2, mot_q="La lettre de Jade", avant_q=avant_q, autres_r=apres)
        self.fs_choix, self.decal_q, self.elargir_q = 26, 1.8, 1.2

    # ── 07 : le défi (vélo, clé) ────────────────────────────────────────────
    def objets_defi(self):
        v = velo(1.6).move_to(P(-3.6, 1.45))
        k = cle(2.2).move_to(P(2.0, 1.45))
        return v, k

    def ecran_defi(self):
        self.ecran("07-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        v, k = self.objets_defi()
        self.au_mot("Un vélo et une clé")
        nv = self.t("un vélo", 30).next_to(v, DOWN, buff=0.3)
        nk = self.t("une clé", 30).move_to(P(2.0, nv.get_center()[1]))
        self.play(FadeIn(v, scale=1.1), FadeIn(k, scale=1.1), FadeIn(nv), FadeIn(nk), run_time=0.5)
        self.au_mot("Lequel pèse 12 kilogrammes")
        q0 = self.t("Lequel pèse 12 kg ?", 36, LOURD)
        gauche(q0, -6.0, -1.15)
        self.play(FadeIn(q0, shift=UP * 0.1), run_time=0.35)
        self.au_mot("Lequel pèse 12 grammes")
        q1 = self.t("Lequel pèse 12 g ?", 36, LEGER)
        gauche(q1, -6.0, -1.9)
        self.play(FadeIn(q1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("Mets pause")
        p = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE)
        gauche(p, -6.0, -2.75)
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("07b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        v, k = self.objets_defi()
        self.add(v, k)
        self.au_mot("Le vélo est lourd")
        l0 = self.t("Le vélo est lourd :", 34, LOURD).next_to(v, DOWN, buff=0.35)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        self.au_mot("12 kilogrammes")
        r0 = self.t("12 kg", 48, VERT_OK).next_to(l0, DOWN, buff=0.2)
        self.play(FadeIn(r0, scale=1.2), Indicate(v, color=LOURD, scale_factor=1.08), run_time=0.45)
        self.au_mot("La clé est légère")
        l1 = self.t("La clé est légère :", 34, LEGER).move_to(P(k.get_center()[0], l0.get_center()[1]))
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("12 grammes")
        r1 = self.t("12 g", 48, VERT_OK).next_to(l1, DOWN, buff=0.2)
        self.play(FadeIn(r1, scale=1.2), Indicate(k, color=LEGER, scale_factor=1.2), run_time=0.45)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.65)
        fig = VGroup(colis("#c08a4a", 0.9), lettre(0.8)).arrange(RIGHT, buff=0.35, aligned_edge=DOWN)
        lignes = self.finale_gauche(fig, textes=[
            ("Le kilogramme, kg,", "pour les objets lourds."),
            ("Le gramme, g,", "pour les objets légers.")], fs=36)
        self.add(fig)
        self.au_mot("Le kilogramme")
        self.montrer_ligne(lignes[0], Indicate(fig[0], scale_factor=1.08))
        self.au_mot("Le gramme")
        self.montrer_ligne(lignes[1], Indicate(fig[1], scale_factor=1.08))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_kg()
        self.ecran_g()
        self.ecran_question1()
        self.ecran_balance()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")


class MasseKgGCE1(MasseKgGCE1Base):
    identite = "Maths CE1 — EleveAI"
    ceinture = "blanche"
