# masse_ce1_probleme.py
# EleveAI — Maths CE1 — série « Masses » (CP → CM2), ÉPISODE CE1 04 : problèmes de masses
# (micro ce1_masse_probleme, notion masse), AVEC VOIX.
# Paysage 16:9, CEINTURE BLANCHE. Short jumeau : film Ti Margo (le seau de coquillages).
# Décor et métier : Malo, PÊCHEUR au port de Saint-Pierre, La Réunion (centres : nature-ecologie, cuisine).
# Mapping micro → écrans : 02 (plein 1 kg = 1 000 g, vide 300 g), 03 (poissons = plein − panier : 700 g),
# 04 question (1 kg de farine − 400 g), 05 (3 kg + 2 kg = 5 kg), 06 question (750 g → 1 kg : il manque 250 g),
# 07 défi (2 kg de crevettes, il en vend 500 g), 07b correction (il reste 1 500 g), 08 ce que tu as appris.
# Voix : manim/voix/ce1-masse-probleme.json (source : masse_voix.py, validée le 16/11).
# Marques : python manim/scripts/ce2/perimetre_marques.py masse:probleme:ce1
# Mots sans marque, repérés dans le WAV (début du son, 17/11) : 04b « 1 000 moins » 3,76 s ; 07b « 2 000 moins » 4,92 s.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/masse_ce1_probleme.py MasseProblemeCE1
# Sortie : manim/sorties/ce1/maths/masse/04-probleme/eleveai-maths-ce1-masse-probleme.mp4

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from masse_commun import *  # noqa: E402,F403
from masse_cp_estimer import MasseEstimerCPBase  # noqa: E402

_V = {e["id"]: e for e in json.load(open(Path(__file__).resolve().parent / "masse_voix.json", encoding="utf-8"))}
EP = _V["ce1-masse-probleme"]
Q1, Q2 = EP["questions"]
JAUNE_CIRE = "#facc15"
OSIER = "#d97706"
ABR = {"grammes": "g"}


def court(s):
    for a, b in ABR.items():
        s = s.replace(a, b)
    return s[0].upper() + s[1:]


class MasseProblemeCE1Base(MasseEstimerCPBase):
    nom_voix = "ce1-masse-probleme"
    fichier_marques = "masse_ce1_probleme_marques.json"
    ceinture = "blanche"

    def morceaux(self, l, mots, run_time=0.3):
        """Montre les morceaux d'une ligne(), chacun à SON mot (un nombre à l'instant où la voix le dit)."""
        for m, mot in zip(l, mots):
            if mot is not None:
                self.au_t(mot) if isinstance(mot, (int, float)) else self.au_mot(mot)
            self.play(FadeIn(m, shift=UP * 0.1), run_time=run_time)

    def barre(self, total, part, x0, y, L, c_part, c_reste, t_total, t_part, t_reste):
        """Une barre de masse : total (contour), la part à gauche, le reste à droite ; étiquettes dessous."""
        cadre = Rectangle(width=L, height=0.7, stroke_color=WHITE, stroke_width=3).move_to(P(x0 + L / 2, y))
        k = part / total
        a = Rectangle(width=L * k, height=0.7, fill_color=c_part, fill_opacity=0.9, stroke_width=0)
        a.align_to(cadre, LEFT).align_to(cadre, DOWN)
        b = Rectangle(width=L * (1 - k), height=0.7, fill_color=c_reste, fill_opacity=0.9, stroke_width=0)
        b.next_to(a, RIGHT, buff=0)
        et = [hors_audit(self.t(t_, 30, c_)) for t_, c_ in ((t_total, WHITE), (t_part, c_part), (t_reste, c_reste))]
        et[0].next_to(cadre, UP, buff=0.15)
        et[1].next_to(a, DOWN, buff=0.15)
        et[2].next_to(b, DOWN, buff=0.15)
        return cadre, a, b, et

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Problèmes de masses", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Problèmes de masses")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        l0 = base_commune(self.ligne([("Panier plein :", JAUNE_TITRE), ("1 kg.", JAUNE_TITRE)], 38, buff=0.3))
        l1 = base_commune(self.ligne([("Vide :", JAUNE_TITRE), ("300 g.", JAUNE_TITRE)], 38, buff=0.3))
        l2 = self.t("Combien pèsent les poissons ?", 38, JAUNE_TITRE)
        q = VGroup(l0, l1, l2).arrange(DOWN, aligned_edge=LEFT, buff=0.28)
        q.move_to(P(0, 0.45)).align_to(P(-6.2, 0), LEFT)
        f = panier(1.3).move_to(P(4.4, 0.6))
        self.au_mot("Panier plein")
        self.play(FadeIn(l0[0], shift=UP * 0.2), FadeIn(f, scale=1.1), run_time=0.4)
        self.au_mot("1 kilogramme")
        self.play(FadeIn(l0[1], shift=UP * 0.2), run_time=0.3)
        self.au_mot("Vide")
        self.play(FadeIn(l1[0], shift=UP * 0.2), run_time=0.3)
        self.au_mot("300 grammes")
        self.play(FadeIn(l1[1], shift=UP * 0.2), run_time=0.3)
        self.au_mot("Combien pèsent")
        self.play(FadeIn(l2, shift=UP * 0.2), run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 01 : Malo, pêcheur à Saint-Pierre ───────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = malo(0.95).move_to(P(-4.9, 0.4))
        nom = self.t("Malo", 42, JAUNE_CIRE).next_to(pe, UP, buff=0.4)
        self.au_mot("Voici Malo")
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Il est pêcheur")
        met = self.t("pêcheur", 26, JAUNE_CIRE).next_to(pe, DOWN, buff=0.15)
        ls = [self.t(t_, 34, GRAY_B) for t_ in ("Il est pêcheur", "au port de Saint-Pierre,", "à La Réunion.")]
        for k, l_ in enumerate(ls):
            self.col(l_, 2.7 - 0.65 * k, -2.4)
        self.play(FadeIn(met, shift=DOWN * 0.1), FadeIn(ls[0], shift=UP * 0.1), run_time=0.35)
        p1, p2 = poisson(1.1, "#60a5fa").move_to(P(-0.4, 0.15)), dorade(1.1).move_to(P(2.6, 0.15))
        self.au_mot("au port")
        self.play(FadeIn(ls[1], shift=UP * 0.1), FadeIn(p1, shift=RIGHT * 0.4), FadeIn(p2, shift=RIGHT * 0.4), run_time=0.4)
        self.au_mot("à La Réunion")
        self.play(FadeIn(ls[2], shift=UP * 0.1), run_time=0.3)
        l2 = VGroup(self.t("Il pèse sa pêche", 36, JAUNE_TITRE), self.t("pour la vendre.", 36, JAUNE_TITRE))
        self.col(l2[0], -1.3, -2.4)
        self.col(l2[1], -1.95, -2.4)
        self.au_mot("Il pèse")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("pour la vendre")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 02 : le plein et le vide ────────────────────────────────────────────
    def ecran_plein_vide(self):
        self.ecran("02-plein-vide")
        bg = balance_electronique("", 1.9).move_to(P(-3.3, -0.4))
        bd = balance_electronique("", 1.9).move_to(P(2.9, -0.4))
        pp = panier(1.25).next_to(bg.plateau, UP, buff=0.02)
        pv = panier(1.25, plein=False).next_to(bd.plateau, UP, buff=0.02)
        tg = self.t("Plein", 44, JAUNE_TITRE).move_to(P(-3.3, 3.0))
        td = self.t("Vide", 44, JAUNE_TITRE).move_to(P(2.9, 3.0))
        lg = base_commune(self.ligne([("1 kg", JAUNE_TITRE), ("= 1 000 g", VERT_OK)], 40, buff=0.2))
        lg.next_to(bg, DOWN, buff=0.4)
        ld = self.t("300 g", 40, BLEU_D).next_to(bd, DOWN, buff=0.4)
        self.au_mot("Le panier plein")
        self.play(FadeIn(bg), FadeIn(pp, shift=DOWN * 0.3), FadeIn(tg), run_time=0.45)
        self.au_mot("1 kilogramme")
        self.play(FadeIn(lg[0], scale=1.1), run_time=0.3)
        self.au_mot("1 000 grammes")
        self.play(FadeIn(lg[1], shift=UP * 0.1), Transform(bg.affichage, afficher(bg, "1 000 g", 1.9)), run_time=0.35)
        self.au_mot("Le panier vide")
        self.play(FadeIn(bd), FadeIn(pv, shift=DOWN * 0.3), FadeIn(td), run_time=0.45)
        self.au_mot("300 grammes")
        self.play(FadeIn(ld, scale=1.1), Transform(bd.affichage, afficher(bd, "300 g", 1.9)), run_time=0.35)
        self.attendre_voix()

    # ── 03 : poissons = plein − panier ──────────────────────────────────────
    def ecran_soustraire(self):
        self.ecran("03-soustraire")
        l0 = self.ligne([("Poissons", BLEU_D), ("=", WHITE), ("plein", JAUNE_TITRE), ("−", WHITE), ("panier", OSIER)],
                        44, buff=0.25)
        base_commune(l0)
        gauche(l0, -6.0, 2.9)
        self.morceaux(l0, ["Les poissons", None, "le plein", None, "le panier"])
        cadre, a, b, et = self.barre(1000, 300, -5.6, 1.0, 10.0, OSIER, BLEU_D, "1 000 g", "300 g", "700 g")
        l1 = base_commune(self.ligne([("1 000", JAUNE_TITRE), ("−", WHITE), ("300", OSIER), ("=", WHITE),
                                      ("700", BLEU_D)], 48, buff=0.22))
        gauche(l1, -6.0, -0.9)
        self.au_mot("1 000 moins")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Create(cadre), FadeIn(et[0]), run_time=0.3)
        self.au_mot("300 : 700")
        self.play(FadeIn(l1[1:3], shift=UP * 0.1), GrowFromEdge(a, LEFT), FadeIn(et[1]), run_time=0.3)
        self.au_mot("700. Les")
        self.play(FadeIn(l1[3:], shift=UP * 0.1), GrowFromEdge(b, LEFT), FadeIn(et[2]), run_time=0.3)
        l2 = base_commune(self.ligne([("Les poissons pèsent", VERT_OK), ("700 g.", VERT_OK)], 42, buff=0.22))
        gauche(l2, -6.0, -2.1)
        self.au_mot("Les poissons pèsent")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("700 grammes")
        self.play(FadeIn(l2[1], scale=1.1), run_time=0.3)
        self.insister(l2, 1.12, 0.3)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (1 kg de farine, on en prend 400 g) ────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        s_ = sac("FARINE", 1.6, "#f5f5f4").move_to(P(-4.4, 1.9))
        fig = VGroup(s_)

        def avant_q(sc):
            sc.play(FadeIn(fig, shift=UP * 0.2), run_time=0.2)

        def apres(sc):
            sc.play(Indicate(s_, color=VERT_OK, scale_factor=1.06), run_time=0.4)

        self._ph_mots = {(0, 1): "1 000 grammes", (1, 0): 3.76, (1, 1): "400 : il", (2, 0): "il reste",
                         (2, 1): "600 grammes"}
        self.question_gauche("04-question", "04b-reponse",
                             ["Un sac de 1 kg", "de farine.", "On en prend 400 g.", "Combien reste-t-il ?"],
                             [self.choix(court(c_), fs=26) for c_ in Q1["choix"]], Q1["reponse"],
                             ["1 kg = 1 000 g.", "1 000 − 400 :", "il reste 600 g."],
                             0.0, couper={0: ("1 kg =", "1 000 g."), 1: ("1 000 −", "400 :"), 2: ("il reste", "600 g.")},
                             mot_q="Un sac de", avant_q=avant_q, autres_r=apres)
        self._ph_mots = {}

    # ── 05 : ajouter (3 kg + 2 kg) ──────────────────────────────────────────
    def ecran_ajouter(self):
        self.ecran("05-ajouter")
        th = thon(1.5).move_to(P(-3.6, 1.3))
        do = dorade(1.4).move_to(P(1.4, 1.3))
        e1 = self.t("3 kg", 44, BLEU_D).move_to(P(-3.6, -0.1))
        e2 = self.t("2 kg", 44, VERT_OK).move_to(P(1.4, -0.1))  # (17/11) les deux étiquettes sur une même ligne
        n1 = self.t("thon", 30, GRAY_B).next_to(e1, DOWN, buff=0.15)
        n2 = self.t("dorade", 30, GRAY_B).next_to(e2, DOWN, buff=0.15)
        self.au_mot("3 kilogrammes")
        self.play(FadeIn(th, shift=RIGHT * 0.4), FadeIn(e1, scale=1.1), run_time=0.35)
        self.au_mot("de thon")
        self.play(FadeIn(n1), run_time=0.25)
        self.au_mot("2 kilogrammes")
        self.play(FadeIn(do, shift=RIGHT * 0.4), FadeIn(e2, scale=1.1), run_time=0.35)
        self.au_mot("de dorade")
        self.play(FadeIn(n2), run_time=0.25)
        l = base_commune(self.ligne([("3", BLEU_D), ("+", WHITE), ("2", VERT_OK), ("=", WHITE), ("5 kg", JAUNE_TITRE),
                                     ("en tout !", JAUNE_TITRE)], 52, buff=0.25))
        gauche(l, -6.0, -2.1)
        self.morceaux(l, ["3 plus 2", None, "2 : 5", None, "5 kilogrammes", "en tout"])
        self.insister(l[4], 1.2, 0.3)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (750 g, combien pour 1 kg ?) ───────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        bal = balance_electronique("", 1.5).move_to(P(-4.4, 1.3))
        pz = poisson(1.0, "#f97316").next_to(bal.plateau, UP, buff=0.02)
        fig = VGroup(bal, pz)

        def avant_q(sc):
            sc.play(FadeIn(fig, shift=UP * 0.2), run_time=0.2)
            # (17/11) l'afficheur montre 750 g juste après la ligne « Sur le plateau : 750 g »
            sc._q_apres = {0: lambda s2: s2.play(Transform(bal.affichage, afficher(bal, "750 g", 1.5)), run_time=0.3)}

        def apres(sc):
            sc.play(Indicate(pz, color=VERT_OK, scale_factor=1.1), run_time=0.4)

        self._ph_mots = {(0, 1): "1 000 grammes", (1, 0): "De 750", (1, 1): "1 000, il", (2, 0): "il manque",
                         (2, 1): "250 grammes"}
        self.fs_choix, self.decal_q, self.elargir_q = 24, 2.6, 1.8
        self.question_gauche("06-question", "06b-reponse",
                             ["Sur le plateau : 750 g", "de poisson.", "Combien ajouter pour", "faire 1 kg ?"],
                             [self.choix(court(c_), fs=26) for c_ in Q2["choix"]], Q2["reponse"],
                             ["1 kg = 1 000 g.", "De 750 à 1 000,", "il manque 250 g."],
                             0.2, couper={0: ("1 kg =", "1 000 g."), 1: ("De 750", "à 1 000,"), 2: ("il manque", "250 g.")},
                             mot_q="Sur le plateau", avant_q=avant_q, autres_r=apres)
        self.fs_choix, self.decal_q, self.elargir_q = 26, 1.8, 1.2
        self._ph_mots = {}

    # ── 07 : le défi (2 kg de crevettes, il en vend 500 g) ─────────────────
    def ecran_defi(self):
        self.ecran("07-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        bal = balance_electronique("", 1.8).move_to(P(3.8, -0.4))
        bac = bac_crevettes(1.0).next_to(bal.plateau, UP, buff=0.02)
        l0 = base_commune(self.ligne([("Malo a", WHITE), ("2 kg", WHITE), ("de crevettes.", WHITE)], 38, buff=0.2))
        gauche(l0, -6.0, 1.9)
        self.au_mot("Malo a")
        self.play(FadeIn(l0[0], shift=UP * 0.1), FadeIn(bal), FadeIn(bac, shift=DOWN * 0.3), run_time=0.4)
        self.au_mot("2 kilogrammes")
        self.play(FadeIn(l0[1], shift=UP * 0.1), Transform(bal.affichage, afficher(bal, "2 kg", 1.8)), run_time=0.3)
        self.au_mot("de crevettes")
        self.play(FadeIn(l0[2], shift=UP * 0.1), run_time=0.3)
        l1 = base_commune(self.ligne([("Il en vend", WHITE), ("500 g.", WHITE)], 38, buff=0.2))
        gauche(l1, -6.0, 1.1)
        self.au_mot("Il en vend")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("500 grammes")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        l2 = VGroup(self.t("Combien de grammes", 38, JAUNE_TITRE), self.t("lui reste-t-il ?", 38, JAUNE_TITRE))
        gauche(l2[0], -6.0, 0.1)
        gauche(l2[1], -6.0, -0.55)
        self.au_mot("Combien de grammes")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("lui reste")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Mets pause")
        p = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE)
        gauche(p, -6.0, -1.6)
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("07b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        l0 = base_commune(self.ligne([("2 kg", JAUNE_TITRE), ("= 2 000 g.", VERT_OK)], 42, buff=0.25))
        gauche(l0, -6.0, 2.2)
        self.morceaux(l0, ["2 kilogrammes", "2 000 grammes"])
        cadre, a, b, et = self.barre(2000, 500, -5.6, 0.7, 10.0, ORANGE_RETENUE, VERT_OK, "2 000 g", "500 g vendus",
                                     "1 500 g")
        l1 = base_commune(self.ligne([("2 000", JAUNE_TITRE), ("−", WHITE), ("500", ORANGE_RETENUE), ("=", WHITE),
                                      ("1 500", VERT_OK)], 48, buff=0.22))
        gauche(l1, -6.0, -1.0)
        self.au_t(4.92)  # « 2 000 moins » n'a pas de marque : début du son à 4,92 s
        self.play(FadeIn(l1[0], shift=UP * 0.1), Create(cadre), FadeIn(et[0]), run_time=0.3)
        self.au_mot("500 : 1 500")
        self.play(FadeIn(l1[1:3], shift=UP * 0.1), GrowFromEdge(a, LEFT), FadeIn(et[1]), run_time=0.3)
        self.au_mot("1 500. Il")
        self.play(FadeIn(l1[3:], shift=UP * 0.1), GrowFromEdge(b, LEFT), FadeIn(et[2]), run_time=0.3)
        l2 = base_commune(self.ligne([("Il reste", VERT_OK), ("1 500 g.", VERT_OK)], 44, buff=0.22))
        gauche(l2, -6.0, -2.2)
        self.au_mot("Il reste")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("1 500 grammes")
        self.play(FadeIn(l2[1], scale=1.1), run_time=0.3)
        self.insister(l2, 1.12, 0.3)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.65)
        fig = panier(1.3)
        lignes = self.finale_gauche(fig, textes=[
            ("On calcule avec", "la même unité."),
            ("Ce qu'il y a dedans :", "le plein moins le vide.")], fs=36)
        self.add(fig)
        self.au_mot("On calcule")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("Ce qu'il y a")
        self.montrer_ligne(lignes[1])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_plein_vide()
        self.ecran_soustraire()
        self.ecran_question1()
        self.ecran_ajouter()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")


class MasseProblemeCE1(MasseProblemeCE1Base):
    identite = "Maths CE1 — EleveAI"
    ceinture = "blanche"
