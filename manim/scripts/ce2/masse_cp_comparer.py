# masse_cp_comparer.py
# EleveAI — Maths CP — série « Masses » (CP → CM2), ÉPISODE CP 02 : comparer avec une balance
# (micro cp_masse_comparer, notion masse_contenance ; `aussi` → ce1 ce1_masse_soupeser), AVEC VOIX.
# Paysage 16:9, CEINTURE BLANCHE. Short jumeau : film Ti Margo (le doudou et la petite voiture en fer).
# Décor et métier : Hugo, PRIMEUR (centres : cuisine, nature).
# Mapping micro → écrans : 02 (la balance : melon / ananas), 03 (la règle : le plateau qui descend),
# 04 question (le plateau de gauche descend), 05 (équilibre : deux pommes), 06 question (deux boîtes pareilles),
# 07 défi (orange / citron, le plateau de droite monte), 07b correction, 08 ce que tu as appris.
# Voix : manim/voix/cp-masse-comparer.json (source : masse_voix.py, validée le 16/11).
# Marques : python manim/scripts/ce2/perimetre_marques.py masse:comparer:cp
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/masse_cp_comparer.py MasseComparerCP
# Sortie : manim/sorties/cp/maths/masse/02-comparer/eleveai-maths-cp-masse-comparer.mp4

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from masse_commun import *  # noqa: E402,F403

_V = {e["id"]: e for e in json.load(open(Path(__file__).resolve().parent / "masse_voix.json", encoding="utf-8"))}
EP = _V["cp-masse-comparer"]
Q1, Q2 = EP["questions"]
VERT_PRIMEUR = "#4ade80"


def court(s):
    return s[0].upper() + s[1:]


class MasseComparerCPBase(PaysageMasse):
    nom_voix = "cp-masse-comparer"

    def _disposer_q(self, question, choix, phrase):
        """Les choix longs (« À gauche, c'est le plus lourd ») rétrécissaient seuls dans leur carte :
        la colonne de la question glisse de 1,8 vers la gauche, les cartes s'élargissent de 1,2 (leur bord
        droit s'écarte de Ti Margo),
        et les trois choix gardent la MÊME taille (24)."""
        r = super()._disposer_q(question, choix, phrase)
        tete, q, cartes, pause, rebours = r[:5]
        D, E = 1.8, 1.2
        for m in (tete, q, cartes, pause, rebours):
            m.shift(LEFT * D)
        for c in cartes:
            fond, corps = c[0], c[1][1]
            g = fond.get_left()[0]
            fond.stretch_to_fit_width(fond.width + E).shift(RIGHT * (g - fond.get_left()[0]))
            g = corps.get_left()[0]
            corps.scale(24 / corps.font_size).shift(RIGHT * (g - corps.get_left()[0]))
            assert corps.get_right()[0] < fond.get_right()[0] - 0.8, corps  # la place de la coche
        ph = r[5]  # la phrase de la réponse, à gauche : elle ne touche pas les cartes
        lim = cartes.get_left()[0] - 0.35
        if ph.get_right()[0] > lim:
            g, h = ph.get_left()[0], ph.get_top()[1]
            ph.scale((lim - g) / ph.width)
            ph.shift(RIGHT * (g - ph.get_left()[0]) + UP * (h - ph.get_top()[1]))
        return r
    fichier_marques = "masse_cp_comparer_marques.json"
    ceinture = "blanche"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Comparer des masses", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Comparer des masses")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q0 = self.t("Un melon, un ananas :", 40, JAUNE_TITRE)
        q1 = self.t("lequel est le plus lourd ?", 40, JAUNE_TITRE)
        q = VGroup(q0, q1).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        f = VGroup(melon(1.0), ananas(1.1)).arrange(RIGHT, buff=0.6, aligned_edge=DOWN).move_to(P(3.9, 0.35))
        self.au_mot("Un melon")
        self.play(FadeIn(q0[:7], shift=UP * 0.2), FadeIn(f[0], scale=1.1), run_time=0.3)
        self.au_mot("un ananas")
        self.play(FadeIn(q0[7:], shift=UP * 0.2), FadeIn(f[1], scale=1.1), run_time=0.3)
        self.au_mot("lequel est le plus lourd")
        self.play(FadeIn(q1, shift=UP * 0.2), run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 01 : Hugo, primeur ──────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = hugo(0.95).move_to(P(-5.0, 0.2))
        nom = self.t("Hugo", 42, VERT_PRIMEUR).next_to(pe, UP, buff=0.4)
        self.au_mot("Voici Hugo")
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Il est primeur")
        met = self.t("primeur", 30, VERT_PRIMEUR).next_to(pe, DOWN, buff=0.15)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("il vend des fruits")
        l0 = self.bloc(["Il vend des fruits", "et des légumes."], 34, GRAY_B)
        self.col(l0, 2.5, -2.6)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        m, a = melon(1.15).move_to(P(-1.0, -0.4)), ananas(1.25).move_to(P(1.6, -0.3))
        self.au_mot("Il a un melon")
        self.play(FadeIn(m, shift=DOWN * 0.3), run_time=0.35)
        self.au_mot("et un ananas")
        self.play(FadeIn(a, shift=DOWN * 0.3), run_time=0.35)
        self.au_mot("Lequel est le plus lourd")
        q = self.t("Lequel est le plus lourd ?", 40, JAUNE_TITRE)
        gauche(q, -2.6, -2.4)
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(VGroup(m, a)), run_time=0.5)
        self.attendre_voix()

    # ── 02 : la balance ─────────────────────────────────────────────────────
    def ecran_balance(self):
        self.ecran("02-balance")
        b = Balance(5.4).move_to(P(-2.0, -0.4))
        self.au_mot("une balance à deux plateaux")
        tit = self.t("La balance à deux plateaux", 40, JAUNE_TITRE).move_to(P(0, 3.0))
        self.play(Write(tit), FadeIn(b, shift=UP * 0.2), run_time=0.5)
        m = b.poser(melon(0.8), "g")
        a = b.poser(ananas(0.85), "d")
        self.au_mot("Le melon à gauche")
        em = self.t("melon", 32, WHITE).move_to(b.sous("g"))
        self.play(FadeIn(m, shift=DOWN * 0.4), FadeIn(em), run_time=0.4)
        self.au_mot("l'ananas à droite")
        ea = self.t("ananas", 32, WHITE).move_to(b.sous("d"))
        self.play(FadeIn(a, shift=DOWN * 0.4), FadeIn(ea), run_time=0.4)
        fl = Arrow(P(-5.6, 0.6), P(-5.6, -1.2), color=LOURD, stroke_width=8, buff=0)
        l = self.bloc(["Le plateau", "du melon", "descend."], 36, LOURD)
        gauche(l, 2.3, 0.0)
        self.au_mot("Le plateau du melon descend")
        self.play(FadeIn(l[:2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("descend")
        self.play(FadeIn(l[2], shift=UP * 0.1), GrowArrow(fl), run_time=0.3)
        basculer(self, b, 0.6, [m, em], [a, ea], run_time=0.9)
        self.attendre_voix()

    # ── 03 : la règle ───────────────────────────────────────────────────────
    def ecran_regle(self):
        self.ecran("03-regle")
        b = Balance(4.4, penche=0.6).move_to(P(-3.6, 0.3))
        m, a = b.poser(melon(0.65), "g"), b.poser(ananas(0.7), "d")
        self.add(b, m, a)
        XP = -0.3
        self.au_mot("Le plateau qui descend")
        l0 = self.bloc(["Le plateau qui descend", "porte le plus lourd."], 40, JAUNE_TITRE)
        self.col(l0, 2.0, XP)
        self.play(FadeIn(l0[0], shift=UP * 0.1), Indicate(m, color=LOURD, scale_factor=1.1), run_time=0.4)
        self.au_mot("porte le plus lourd")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("Le melon est plus lourd")
        res = self.bloc(["Le melon est plus lourd", "que l'ananas."], 40, VERT_OK)
        self.col(res, -0.6, XP)
        self.play(FadeIn(res, scale=1.1), run_time=0.45)
        self.insister(m, 1.2, 0.3)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (le plateau de gauche descend) ──────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        b = Balance(3.2, penche=0.6, s=0.8).move_to(P(-3.9, 1.3))
        fig = VGroup(b, b.poser(boite(0.7, "#f472b6"), "g"), b.poser(boite(0.7, "#60a5fa"), "d"))

        def autres_q(sc):
            sc.play(FadeIn(fig), run_time=0.35)

        def apres(sc):
            sc.play(Indicate(fig[1], color=VERT_OK, scale_factor=1.15), run_time=0.25)

        self.question_gauche("04-question", "04b-reponse",
                             ["Sur la balance, le plateau", "de gauche descend.", "Que peut-on dire ?"],
                             [self.choix(court(c), fs=24) for c in Q1["choix"]], Q1["reponse"],
                             ["Le plateau qui descend", "porte l'objet", "le plus lourd."],
                             -0.75, mot_q="Sur la balance", autres_q=autres_q, autres_r=apres)

    # ── 05 : l'équilibre ────────────────────────────────────────────────────
    def ecran_equilibre(self):
        self.ecran("05-equilibre")
        b = Balance(5.0).move_to(P(-2.6, -0.3))
        self.add(b)
        self.au_mot("deux pommes")
        tit = self.t("Deux pommes", 42, JAUNE_TITRE).move_to(P(0, 3.0))
        p1, p2 = b.poser(pomme(1.3), "g"), b.poser(pomme(1.3), "d")
        self.play(Write(tit), FadeIn(p1, shift=DOWN * 0.4), FadeIn(p2, shift=DOWN * 0.4), run_time=0.5)
        self.au_mot("Les plateaux restent au même niveau")
        niveau = DashedLine(P(-5.6, b.sur("g")[1]), P(0.4, b.sur("d")[1]), color=VERT_OK, stroke_width=4)
        l0 = self.bloc(["Les plateaux restent", "au même niveau."], 36, WHITE)
        gauche(l0, 1.4, 0.9)
        self.play(Create(niveau), FadeIn(l0, shift=UP * 0.1), run_time=0.5)
        self.au_mot("Les deux pommes ont la même masse")
        res = self.bloc(["Même niveau :", "même masse !"], 44, VERT_OK)
        gauche(res, 1.4, -1.0)
        self.play(FadeIn(res, scale=1.1), Indicate(VGroup(p1, p2), color=VERT_OK), run_time=0.5)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (deux boîtes pareilles) ─────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        fig = VGroup(boite(1.1), boite(1.1)).arrange(RIGHT, buff=0.8).move_to(P(-3.9, 1.45))
        pts = VGroup(*[self.t("?", 48, JAUNE_TITRE).next_to(x, UP, buff=0.15) for x in fig])
        hors_audit(pts)
        b = Balance(3.0, s=0.75).move_to(P(-3.9, 1.3))

        def autres_q(sc):
            sc.play(FadeIn(fig), FadeIn(pts), run_time=0.35)

        def apres(sc):
            bb = b.vers(-0.5)
            sc.play(FadeOut(pts), FadeIn(bb), fig[0].animate.scale(0.6).move_to(bb.sur("g"), aligned_edge=DOWN),
                    fig[1].animate.scale(0.6).move_to(bb.sur("d"), aligned_edge=DOWN), run_time=0.5)

        self.question_gauche("06-question", "06b-reponse",
                             ["Deux boîtes fermées", "sont pareilles.", "Comment savoir laquelle", "est la plus lourde ?"],
                             [self.choix(court(c), fs=24) for c in Q2["choix"]], Q2["reponse"],
                             ["À l'œil, elles sont pareilles.", "La balance, elle,", "sait le dire."],
                             -0.75, mot_q="Deux boîtes fermées", autres_q=autres_q, autres_r=apres)

    # ── 07 : le défi (orange / citron) ──────────────────────────────────────
    def figure_defi(self):
        b = Balance(4.4, penche=0.5).move_to(P(-3.4, 0.2))
        return b, b.poser(agrume(1.6), "g"), b.poser(agrume(1.6, citron=True), "d")

    def ecran_defi(self):
        self.ecran("07-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        b0 = Balance(4.4).move_to(P(-3.4, 0.2))
        b, o, c = self.figure_defi()
        o0, c0 = b0.poser(agrume(1.6), "g"), b0.poser(agrume(1.6, citron=True), "d")
        self.add(b0)
        XP = 0.2
        self.au_mot("Une orange à gauche")
        l0 = self.t("Une orange à gauche,", 34)
        self.col(l0, 2.0, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(o0, shift=DOWN * 0.3), run_time=0.35)
        self.au_mot("un citron à droite")
        l1 = self.t("un citron à droite.", 34)
        self.col(l1, 1.3, XP)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(c0, shift=DOWN * 0.3), run_time=0.35)
        self.au_mot("Le plateau de droite monte")
        l2 = self.t("Le plateau de droite monte.", 34, LEGER)
        self.col(l2, 0.4, XP)
        self.play(FadeIn(l2, shift=UP * 0.1), Transform(b0, b), o0.animate.move_to(o), c0.animate.move_to(c),
                  run_time=0.8)
        self.au_mot("Qui est le plus lourd")
        q = self.t("Qui est le plus lourd ?", 42, JAUNE_TITRE)
        self.col(q, -0.7, XP)
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.4)
        self.pause_defi(y=-1.6)  # au-dessus de Ti Margo (à -2,2 le texte le touchait)

    def ecran_correction(self):
        self.ecran("07b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        b, o, c = self.figure_defi()
        self.add(b, o, c)
        XP = 0.2
        self.au_mot("Le plateau de droite monte")
        l0 = self.t("Le plateau de droite monte,", 34, LEGER)
        self.col(l0, 2.0, XP)
        fh = Arrow(c.get_center() + P(0.9, -0.6), c.get_center() + P(0.9, 0.6), color=LEGER, stroke_width=7, buff=0)
        self.play(FadeIn(l0, shift=UP * 0.1), GrowArrow(fh), run_time=0.4)
        self.au_mot("donc celui de gauche descend")
        l1 = self.t("donc celui de gauche descend.", 34, LOURD)
        self.col(l1, 1.25, XP)
        fb = Arrow(o.get_center() + P(-0.9, 0.6), o.get_center() + P(-0.9, -0.6), color=LOURD, stroke_width=7, buff=0)
        self.play(FadeIn(l1, shift=UP * 0.1), GrowArrow(fb), run_time=0.4)
        self.au_mot("L'orange est la plus lourde")
        res = self.bloc(["L'orange est", "la plus lourde !"], 44, VERT_OK)
        self.col(res, -0.2, XP)
        self.play(FadeIn(res, scale=1.1), Indicate(o, color=VERT_OK, scale_factor=1.2), run_time=0.5)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.65)
        b = Balance(3.0, penche=0.5, s=0.8)
        fig = VGroup(b, b.poser(melon(0.55), "g"), b.poser(ananas(0.6), "d"))
        lignes = self.finale_gauche(fig, textes=[
            ("Le plateau qui descend", "porte le plus lourd."),
            ("Au même niveau :", "la même masse.")], fs=36)
        self.add(fig)
        self.au_mot("Sur une balance")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("Au même niveau")
        self.montrer_ligne(lignes[1])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_balance()
        self.ecran_regle()
        self.ecran_question1()
        self.ecran_equilibre()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")


class MasseComparerCP(MasseComparerCPBase):
    identite = "Maths CP — EleveAI"
    ceinture = "blanche"
