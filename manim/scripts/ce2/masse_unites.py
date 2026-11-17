# masse_unites.py
# EleveAI — Maths CE2 — série « Masses » (CP → CM2), ÉPISODE CE2 01 : les unités de masse
# (micro ce2_masse_unites, notion masse), AVEC VOIX.
# Paysage 16:9, CEINTURE JAUNE. Short jumeau (jaune) : film Ti Margo (peser un éléphant sur la balance de cuisine).
# Décor et métier : Rayan, GRUTIER au port (centres : transports, metiers ? → voir passe_masse).
# Mapping micro → écrans : 02 (g, kg, t : léger, plus lourd, très lourd), 03 (le conteneur : 20 t ; 1 t = 1 000 kg),
# 04 question (la plus petite unité : le gramme), 05 (kilo = 1 000 : 1 kg = 1 000 g), 06 question (kilo veut dire 1 000),
# 07 défi (une vis, une caisse à outils, un bateau : quelle unité ?), 07b correction, 08 ce que tu as appris.
# Voix : manim/voix/ce2-masse-unites.json (source : masse_voix.py, validée le 16/11).
# Marques : python manim/scripts/ce2/perimetre_marques.py masse:unites
# Mots sans marque, repérés dans le WAV (début du son, 17/11) : 05 « 1 kilogramme » 4,98 s ; 06b « 1 kilogramme » 2,16 s.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/masse_unites.py MasseUnitesCE2
# Sortie : manim/sorties/ce2/maths/masse/01-unites/eleveai-maths-ce2-masse-unites.mp4

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from masse_commun import *  # noqa: E402,F403
from masse_cp_estimer import MasseEstimerCPBase  # noqa: E402

_V = {e["id"]: e for e in json.load(open(Path(__file__).resolve().parent / "masse_voix.json", encoding="utf-8"))}
EP = _V["ce2-masse-unites"]
Q1, Q2 = EP["questions"]
ORANGE_GRUE = "#fb923c"
C_G, C_KG, C_T = BLEU_D, VERT_OK, LOURD


def court(s):
    return s[0].upper() + s[1:]


class MasseUnitesCE2Base(MasseEstimerCPBase):
    nom_voix = "ce2-masse-unites"
    fichier_marques = "masse_unites_marques.json"
    ceinture = "jaune"

    def morceaux(self, l, mots, run_time=0.3):
        """Montre les morceaux d'une ligne(), chacun à SON mot (un nombre à l'instant où la voix le dit)."""
        for m, mot in zip(l, mots):
            if mot is not None:
                self.au_t(mot) if isinstance(mot, (int, float)) else self.au_mot(mot)
            self.play(FadeIn(m, shift=UP * 0.1), run_time=run_time)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Les unités de masse", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("unités de masse")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        l0 = self.t("Un conteneur se pèse-t-il", 38, JAUNE_TITRE)
        l1 = base_commune(self.ligne([("en g,", C_G), ("en kg,", C_KG), ("ou en t ?", C_T)], 38, buff=0.25))
        q = VGroup(l0, l1).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        q.move_to(P(0, 0.4)).align_to(P(-6.2, 0), LEFT)
        f = conteneur(1.0).move_to(P(4.2, 0.45))
        self.au_mot("Un conteneur")
        self.play(FadeIn(l0, shift=UP * 0.2), FadeIn(f, shift=DOWN * 0.2), run_time=0.45)
        self.morceaux(l1, ["en grammes", "en kilogrammes", "ou en tonnes"])
        self.attendre_voix(marge=0.6)

    # ── 01 : Rayan, grutier au port ─────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = rayan(0.95).move_to(P(-5.0, 0.0))
        nom = self.t("Rayan", 42, ORANGE_GRUE).next_to(pe, UP, buff=0.3)
        self.au_mot("Voici Rayan")
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        met = self.t("grutier", 26, ORANGE_GRUE).next_to(pe, DOWN, buff=0.15)
        l0 = self.t("Il est grutier au port.", 34, GRAY_B)
        self.col(l0, 2.9, -3.3)
        self.au_mot("Il est grutier")
        self.play(FadeIn(met, shift=DOWN * 0.1), FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        gr = grue(0.95).move_to(P(-0.6, -0.15))
        bat = cargo(0.85).move_to(P(3.6, -2.0))
        ct = conteneur(0.55, "#16a34a").next_to(gr.crochet, DOWN, buff=0.02)
        self.au_mot("Avec sa grue")
        self.play(FadeIn(gr, shift=UP * 0.3), FadeIn(bat, shift=LEFT * 0.4), run_time=0.45)
        l1 = VGroup(self.t("Il soulève des", 34, JAUNE_TITRE), self.t("conteneurs énormes.", 34, JAUNE_TITRE))
        self.col(l1[0], 2.15, 1.6)
        self.col(l1[1], 1.55, 1.6)
        self.au_mot("il soulève")
        self.play(FadeIn(ct, shift=UP * 0.3), FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("conteneurs énormes")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.25)
        self.play(VGroup(ct).animate.shift(UP * 0.55), gr.cable.animate.put_start_and_end_on(gr.cable.get_start(),
                  gr.cable.get_end() + UP * 0.55), gr.crochet.animate.shift(UP * 0.55), run_time=0.8)
        self.attendre_voix()

    # ── 02 : trois unités ───────────────────────────────────────────────────
    def ecran_trois(self):
        self.ecran("02-trois")
        self.au_mot("Trois unités de masse")
        tit = self.t("Trois unités de masse", 42, JAUNE_TITRE).move_to(P(0, 3.0))
        self.play(Write(tit), run_time=0.5)
        xs = (-4.3, -0.6, 3.3)
        dessins = [trombone_m(1.4), brique_lait(1.2), conteneur(0.9)]
        for d, x in zip(dessins, xs):
            d.move_to(P(x, 1.2))
        noms = [("le gramme", C_G), ("le kilogramme", C_KG), ("la tonne", C_T)]
        sym = ["g", "kg", "t"]
        quoi = ["objets légers", "plus lourds", "très lourds"]
        mots = [("Le gramme", "g, pour", "objets légers"), ("Le kilogramme", "k g", "plus lourds"),
                ("La tonne", "t, pour", "très lourds")]
        for k, x in enumerate(xs):
            n = self.t(noms[k][0], 34, noms[k][1]).move_to(P(x, -0.25))
            s_ = self.t(sym[k], 64, noms[k][1]).move_to(P(x, -1.25))
            q = self.t(quoi[k], 28, GRAY_B).move_to(P(x, -2.2))
            for e in (n, s_, q):
                e.shift(UP * 0)
            self.au_mot(mots[k][0])
            self.play(FadeIn(dessins[k], shift=DOWN * 0.2), FadeIn(n, shift=UP * 0.1), run_time=0.35)
            self.au_mot(mots[k][1])
            self.play(FadeIn(s_, scale=1.2), run_time=0.3)
            self.au_mot(mots[k][2])
            self.play(FadeIn(q, shift=UP * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 03 : la tonne (le conteneur, 1 t = 1 000 kg, la petite voiture) ────
    def ecran_tonne(self):
        self.ecran("03-tonne")
        ct = conteneur(1.6).move_to(P(-3.3, 1.6))
        et = self.t("20 t", 48, C_T).next_to(ct, DOWN, buff=0.25)
        self.au_mot("Un conteneur plein")
        self.play(FadeIn(ct, shift=DOWN * 0.3), run_time=0.4)
        self.au_mot("20 tonnes")
        self.play(FadeIn(et, scale=1.15), run_time=0.3)
        l = base_commune(self.ligne([("1 t", C_T), ("= 1 000 kg", C_KG)], 50, buff=0.25))
        gauche(l, -6.0, -1.3)
        self.morceaux(l, ["1 tonne", "1 000 kilogrammes"])
        vo = voiture_m(1.3).move_to(P(3.6, -1.1))
        l2 = VGroup(self.t("la masse d'une", 32, GRAY_B), self.t("petite voiture", 32, GRAY_B))
        l2.arrange(DOWN, buff=0.12).next_to(vo, DOWN, buff=0.3)
        self.au_mot("la masse d'une")
        self.play(FadeIn(vo, shift=LEFT * 0.5), FadeIn(l2[0]), run_time=0.35)
        self.au_mot("petite voiture")
        self.play(FadeIn(l2[1]), run_time=0.3)
        self.insister(l, 1.12, 0.3)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (la plus petite unité) ──────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        tr = trombone_m(1.0).move_to(P(-5.4, 2.0))
        br = brique_lait(0.75).move_to(P(-4.3, 2.0))
        ct = conteneur(0.5).move_to(P(-2.9, 1.95))
        fig = VGroup(tr, br, ct)

        def avant_q(sc):
            sc.play(FadeIn(fig, shift=UP * 0.2), run_time=0.2)

        def apres(sc):
            sc.play(Indicate(tr, color=VERT_OK, scale_factor=1.3), run_time=0.3)

        self.question_gauche("04-question", "04b-reponse",
                             ["Le gramme, le kilogramme,", "la tonne : quelle est", "la plus petite unité ?"],
                             [self.choix(court(c_), fs=26) for c_ in Q1["choix"]], Q1["reponse"],
                             ["Le gramme est la plus petite :", "c'est la masse d'un trombone."],
                             0.0, mot_q="Le gramme", avant_q=avant_q, autres_r=apres)

    # ── 05 : kilo veut dire 1 000 ───────────────────────────────────────────
    def ecran_kilo(self):
        self.ecran("05-kilo")
        mot_ = VGroup(self.t("kilo", 72, JAUNE_TITRE), self.t("gramme", 72, WHITE)).arrange(RIGHT, buff=0.05)
        base_commune(mot_)
        mot_.move_to(P(0, 2.4))
        for f in mot_.get_family():  # le mot entier, dit tout de suite (le socle l'attendait au « kilo » suivant)
            f.sans_synchro = True
        self.au_mot("Dans kilogramme")
        self.play(FadeIn(mot_, shift=UP * 0.2), run_time=0.4)
        self.au_mot("il y a kilo")
        cad = SurroundingRectangle(mot_[0], color=JAUNE_TITRE, buff=0.12)
        self.play(Create(cad), mot_[0].animate.scale(1.12), run_time=0.4)
        l0 = base_commune(self.ligne([("kilo", JAUNE_TITRE), ("= 1 000", JAUNE_TITRE)], 52, buff=0.25))
        l0.move_to(P(0, 0.7))
        self.au_mot("Kilo veut dire")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.3)
        self.au_t(3.72)  # « 1 000 » : sa marque
        self.play(FadeIn(l0[1], scale=1.1), run_time=0.3)
        l1 = base_commune(self.ligne([("1 kg", C_KG), ("= 1 000 g", C_G)], 52, buff=0.25))
        l1.move_to(P(0, -0.9))
        self.morceaux(l1, [4.98, "1 000 grammes"])
        self.insister(l1, 1.15, 0.3)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (kilo veut dire…) ───────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        mot_ = VGroup(self.t("kilo", 48, JAUNE_TITRE), self.t("gramme", 48, WHITE)).arrange(RIGHT, buff=0.04)
        base_commune(mot_)
        mot_.move_to(P(-4.1, 2.1))
        for f in mot_.get_family():
            f.sans_synchro = True
        fig = VGroup(mot_)

        def avant_q(sc):
            sc.play(FadeIn(fig, shift=UP * 0.2), run_time=0.2)

        def apres(sc):
            sc.play(Indicate(mot_[0], color=VERT_OK, scale_factor=1.2), run_time=0.25)

        self._ph_mots = {(0, 0): "Kilo veut dire", (0, 1): 1.58, (1, 0): 2.16, (1, 1): "1 000 grammes",
                         (2, 0): "1 kilomètre", (2, 1): "1 000 mètres"}
        self.question_gauche("06-question", "06b-reponse",
                             ["Dans le mot kilogramme,", "que veut dire kilo ?"],
                             [self.choix(c_, fs=26) for c_ in Q2["choix"]], Q2["reponse"],
                             ["Kilo veut dire 1 000 :", "1 kg = 1 000 g,", "1 km = 1 000 m."],
                             -0.4, couper={0: ("Kilo veut dire", "1 000 :"), 1: ("1 kg =", "1 000 g,"),
                                           2: ("1 km =", "1 000 m.")},
                             mot_q="Dans le mot", avant_q=avant_q, autres_r=apres)
        self._ph_mots = {}

    # ── 07 : le défi (une vis, une caisse à outils, un bateau) ─────────────
    def objets_defi(self, y=0.0):
        xs = (-4.3, -0.9, 3.0)
        ob = [vis(1.5).move_to(P(xs[0], y)), caisse_outils(1.25).move_to(P(xs[1], y)), cargo(0.75).move_to(P(xs[2], y))]
        for o in ob:
            o.align_to(P(0, y - 0.6), DOWN)
        return xs, ob

    def ecran_defi(self):
        self.ecran("07-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        l0 = self.t("Rayan pèse :", 38, WHITE)
        gauche(l0, -6.0, 2.1)
        self.au_mot("Rayan pèse")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        xs, ob = self.objets_defi(0.5)
        noms = ["une vis", "sa caisse à outils", "un bateau"]
        for o, x, n, mot in zip(ob, xs, noms, ["une vis", "sa caisse", "un bateau"]):
            e = self.t(n, 30, GRAY_B).move_to(P(x, -0.55))
            self.au_mot(mot)
            self.play(FadeIn(o, scale=1.1), FadeIn(e), run_time=0.35)
        l1 = self.t("Quelle unité pour chacun ?", 38, JAUNE_TITRE)
        gauche(l1, -6.0, -1.45)
        self.au_mot("Quelle unité")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Mets pause")
        p = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE)
        gauche(p, -6.0, -2.3)
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("07b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        xs, ob = self.objets_defi(1.0)
        self.add(*ob)
        rep = [("La vis", "en grammes", "g", C_G), ("La caisse", "en kilogrammes", "kg", C_KG),
               ("Le bateau", "en tonnes", "t", C_T)]
        for o, x, (m1, m2, u, c) in zip(ob, xs, rep):
            s_ = self.t(u, 72, c).move_to(P(x, -0.9))
            mot_u = self.t(m2, 30, c).move_to(P(x, -1.9))
            self.au_mot(m1)
            self.play(Indicate(o, color=c, scale_factor=1.1), run_time=0.35)
            self.au_mot(m2)
            self.play(FadeIn(s_, scale=1.3), FadeIn(mot_u, shift=UP * 0.1), run_time=0.35)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.65)
        fig = VGroup(trombone_m(0.9), brique_lait(0.7), conteneur(0.5)).arrange(RIGHT, buff=0.3, aligned_edge=DOWN)
        fig.move_to(P(-4.4, 0.0))
        self.add(fig)
        # chaque morceau à son mot (« le kilogramme, la tonne » ne s'affichent pas avant d'être dits)
        l0 = base_commune(self.ligne([("Trois unités :", WHITE), ("le gramme,", C_G)], 38, buff=0.22))
        l1 = base_commune(self.ligne([("le kilogramme,", C_KG), ("la tonne.", C_T)], 38, buff=0.22))
        l2 = base_commune(self.ligne([("Kilo veut dire", WHITE), ("1 000.", JAUNE_TITRE)], 38, buff=0.22))
        for k, l_ in enumerate((l0, l1, l2)):
            gauche(l_, -1.8, 1.2 - 0.8 * k - (0.35 if k == 2 else 0))
        self.morceaux(l0, ["Trois unités", "le gramme"])
        self.morceaux(l1, ["le kilogramme", "la tonne"])
        self.morceaux(l2, ["Kilo veut dire", "1 000."])
        self.insister(l2[1], 1.2, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_trois()
        self.ecran_tonne()
        self.ecran_question1()
        self.ecran_kilo()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")


class MasseUnitesCE2(MasseUnitesCE2Base):
    identite = "Maths CE2 — EleveAI"
    ceinture = "jaune"
