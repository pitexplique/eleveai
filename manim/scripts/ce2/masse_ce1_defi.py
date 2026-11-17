# masse_ce1_defi.py
# EleveAI — Maths CE1 — série « Masses » (CP → CM2), ÉPISODE CE1 05 : le défi des masses
# (micro ce1_masse_defi, notion masse), AVEC VOIX.
# Paysage 16:9, CEINTURE JAUNE. Short jumeau (ceinture blanche) : film Ti Margo (1 kg de plumes, 1 kg de cailloux).
# Décor et métier : Lina, JONGLEUSE de cirque (centres : art-design, jeux-defis).
# Mapping micro → écrans : 02 (5 quilles de 200 g : 200, 400… 1 000 g), 03 (1 000 g = 1 kg, la balance à niveau),
# 04 question (1 kg ou 1 000 g : les deux), 05 (+ 3 balles de 100 g : 1 300 g, plus que 1 kg),
# 06 question (1 kg de plumes, 1 kg de cailloux : pareil), 07 défi (valise 2 kg + quilles + 2 balles de 500 g),
# 07b correction (2 + 1 + 1 = 4 kg), 08 ce que tu as appris.
# Voix : manim/voix/ce1-masse-defi.json (source : masse_voix.py, validée le 16/11).
# Marques : python manim/scripts/ce2/perimetre_marques.py masse:defi:ce1
# Mots sans marque, repérés dans le WAV (début du son, 17/11) : 02 « 1 000 grammes » (le 2e) 8,56 s ;
# 07b « 500 » (le 2e) 6,70 s, « plus 1 » (le 2e) 10,02 s ; 08 « 1 000 grammes » 5,66 s.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/masse_ce1_defi.py MasseDefiCE1
# Sortie : manim/sorties/ce1/maths/masse/05-defi/eleveai-maths-ce1-masse-defi.mp4

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from masse_commun import *  # noqa: E402,F403
from masse_cp_estimer import MasseEstimerCPBase  # noqa: E402

_V = {e["id"]: e for e in json.load(open(Path(__file__).resolve().parent / "masse_voix.json", encoding="utf-8"))}
EP = _V["ce1-masse-defi"]
Q1, Q2 = EP["questions"]
ROUGE_CIRQUE = "#f87171"


def court(s):
    return s[0].upper() + s[1:]


class MasseDefiCE1Base(MasseEstimerCPBase):
    nom_voix = "ce1-masse-defi"
    fichier_marques = "masse_ce1_defi_marques.json"
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
        titre, ident, ech = self.garde("Le défi des masses", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("défi des masses")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        l0 = base_commune(self.ligne([("5 quilles", JAUNE_TITRE), ("de 200 g :", JAUNE_TITRE)], 38, buff=0.25))
        l1 = base_commune(self.ligne([("est-ce plus lourd que", JAUNE_TITRE), ("1 kg ?", JAUNE_TITRE)], 38, buff=0.25))
        q = VGroup(l0, l1).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        q.move_to(P(0, 0.4)).align_to(P(-6.2, 0), LEFT)
        f = cinq_quilles(0.95).move_to(P(4.3, 0.45))
        self.au_mot("5 quilles")
        self.play(FadeIn(l0[0], shift=UP * 0.2), LaggedStart(*[FadeIn(x, shift=DOWN * 0.2) for x in f], lag_ratio=0.15),
                  run_time=0.5)
        self.au_mot("200 grammes")
        self.play(FadeIn(l0[1], shift=UP * 0.2), run_time=0.3)
        self.au_mot("est-ce plus lourd")
        self.play(FadeIn(l1[0], shift=UP * 0.2), run_time=0.3)
        self.au_mot("1 kilogramme")
        self.play(FadeIn(l1[1], shift=UP * 0.2), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 01 : Lina, jongleuse de cirque ──────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = lina(0.95).move_to(P(-4.9, 0.0))
        nom = self.t("Lina", 42, ROUGE_CIRQUE).next_to(pe, UP, buff=0.3)
        self.au_mot("Voici Lina")
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        met = self.t("jongleuse", 26, ROUGE_CIRQUE).next_to(pe, DOWN, buff=0.15)
        ls = [self.t(t_, 34, GRAY_B) for t_ in ("Elle est jongleuse", "dans un cirque.")]
        for k, l_ in enumerate(ls):
            self.col(l_, 2.7 - 0.65 * k, -2.4)
        self.au_mot("Elle est jongleuse")
        self.play(FadeIn(met, shift=DOWN * 0.1), FadeIn(ls[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("dans un cirque")
        self.play(FadeIn(ls[1], shift=UP * 0.1), run_time=0.3)
        va = valise(1.0).move_to(P(-0.9, 0.0))
        qs = cinq_quilles(0.75).move_to(P(2.45, 0.1))
        bs = VGroup(*[balle(1.0, c) for c in ("#ef4444", "#facc15", "#22c55e")]).arrange(RIGHT, buff=0.15)
        bs.next_to(qs, RIGHT, buff=0.4).align_to(qs, DOWN)
        self.au_mot("Dans sa valise")
        self.play(FadeIn(va, shift=DOWN * 0.3), run_time=0.35)
        self.au_mot("ses quilles")
        self.play(LaggedStart(*[FadeIn(x, shift=DOWN * 0.2) for x in qs], lag_ratio=0.12), run_time=0.45)
        self.au_mot("ses balles")
        self.play(LaggedStart(*[FadeIn(x, scale=1.2) for x in bs], lag_ratio=0.2), run_time=0.4)
        l2 = VGroup(self.t("La valise doit", 36, JAUNE_TITRE), self.t("rester légère.", 36, JAUNE_TITRE))
        self.col(l2[0], -1.5, -2.4)
        self.col(l2[1], -2.15, -2.4)
        self.au_mot("La valise doit")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("rester légère")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 02 : 5 quilles de 200 g, on compte de 200 en 200 ────────────────────
    def ecran_quilles(self):
        self.ecran("02-quilles")
        q0 = quille(1.3, QUILLES[0]).move_to(P(-5.2, 1.6))
        l0 = base_commune(self.ligne([("Une quille :", WHITE), ("200 g.", BLEU_D)], 40, buff=0.25))
        gauche(l0, -4.3, 1.75)
        self.au_mot("Une quille pèse")
        self.play(FadeIn(q0, shift=DOWN * 0.2), FadeIn(l0[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("200 grammes")
        self.play(FadeIn(l0[1], scale=1.1), run_time=0.3)
        l1 = base_commune(self.ligne([("Lina en a", WHITE), ("5.", WHITE)], 40, buff=0.2))
        gauche(l1, 1.2, 1.75)
        self.morceaux(l1, ["Lina en a", "5. 200"])
        xs = [-4.8 + 2.4 * k for k in range(5)]
        rang = [quille(1.15, c).move_to(P(x, -0.35)) for x, c in zip(xs, QUILLES)]
        nombres = ["200", "400", "600", "800", "1 000"]
        nb = [self.t(n, 40, BLEU_D if k < 4 else VERT_OK).move_to(P(x, -1.65)) for k, (n, x) in enumerate(zip(nombres, xs))]
        meme_y = nb[0].get_bottom()[1]
        for n in nb:
            n.shift(UP * (meme_y - n.get_bottom()[1]))
        for k, (r, n, mot) in enumerate(zip(rang, nb, ["200, 400", "400, 600", "600, 800", "800, 1 000", "1 000 : 1 000"])):
            self.au_mot(mot)
            self.play(FadeIn(r, shift=DOWN * 0.25), FadeIn(n, scale=1.15), run_time=0.3)
        fin = self.t("1 000 g", 46, VERT_OK).move_to(P(0, -2.75))
        self.au_t(8.56)  # le 2e « 1 000 grammes » n'a pas de marque : début du son à 8,56 s
        self.play(FadeIn(fin, scale=1.15), run_time=0.3)
        self.insister(fin, 1.2, 0.3)
        self.attendre_voix()

    # ── 03 : 1 000 g = 1 kg, la balance à niveau ────────────────────────────
    def ecran_un_kilo(self):
        self.ecran("03-un-kilo")
        l0 = base_commune(self.ligne([("1 000 g", JAUNE_TITRE), ("= 1 kg", VERT_OK)], 50, buff=0.25))
        l0.move_to(P(0, 2.85))
        self.au_mot("1 000 grammes")
        self.play(FadeIn(l0[0], scale=1.1), run_time=0.3)
        self.au_mot("1 kilogramme")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.3)
        b = Balance(6.4).move_to(P(-0.6, -0.3))
        qs = b.poser(cinq_quilles(0.62, buff=0.05), "g")
        self.au_mot("5 quilles pèsent")
        self.play(FadeIn(b), FadeIn(qs, shift=DOWN * 0.3), run_time=0.4)
        basculer(self, b, 0.5, [qs], [], run_time=0.6)  # seules, les quilles font descendre le plateau
        m = b.poser(masse_marquee("1 kg", 1.1), "d")
        self.au_mot("1 kilogramme. Ni")  # la masse de 1 kg arrive au mot « 1 kilogramme »
        self.play(FadeIn(m, shift=DOWN * 0.3), run_time=0.3)
        basculer(self, b, 0.0, [qs], [m], run_time=0.6)  # à niveau : 1 000 g = 1 kg
        self.play(Indicate(b, color=VERT_OK, scale_factor=1.03), run_time=0.4)
        l1 = self.t("Ni plus, ni moins !", 42, VERT_OK).move_to(P(-0.6, -2.85))
        self.au_mot("Ni plus")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (1 kg ou 1 000 g : qui a raison ?) ─────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        s_ = sac(None, 1.35).move_to(P(-5.3, 2.0))
        a1 = ardoise("1 kg", 0.8).move_to(P(-3.4, 2.45))
        a2 = ardoise("1 000 g", 0.8).move_to(P(-3.4, 1.45))
        fig = VGroup(s_)

        def avant_q(sc):
            sc.play(FadeIn(fig, shift=UP * 0.2), run_time=0.2)
            # l'ardoise de Léa après « Léa écrit 1 kg », celle de Kevin après « Kevin écrit 1 000 g »
            sc._q_apres = {1: lambda s2: s2.play(FadeIn(a1, scale=1.1), run_time=0.25),
                           2: lambda s2: s2.play(FadeIn(a2, scale=1.1), run_time=0.25)}

        def apres(sc):
            sc.play(Indicate(VGroup(a1, a2), color=VERT_OK, scale_factor=1.08), run_time=0.25)

        self._ph_mots = {(0, 0): "1 kilogramme", (0, 1): "1 000 grammes", (1, 0): "les deux"}
        self.question_gauche("04-question", "04b-reponse",
                             ["Le même sac :", "Léa écrit 1 kg,", "Kevin écrit 1 000 g.", "Qui a raison ?"],
                             [self.choix(court(c_), fs=26) for c_ in Q1["choix"]], Q1["reponse"],
                             ["1 kg = 1 000 g :", "les deux ont raison."],
                             0.0, couper={0: ("1 kg =", "1 000 g :")},
                             mot_q="Le même sac", avant_q=avant_q, autres_r=apres)
        self._ph_mots = {}

    # ── 05 : + 3 balles de 100 g : 1 300 g, plus que 1 kg ──────────────────
    def ecran_balles(self):
        self.ecran("05-balles")
        b = Balance(6.0).move_to(P(2.2, 0.2))
        qs = b.poser(cinq_quilles(0.55, buff=0.04), "g")
        m = b.poser(masse_marquee("1 kg", 1.0), "d")
        self.add(b, qs, m)
        bs = VGroup(*[balle(0.9, c) for c in ("#ef4444", "#facc15", "#22c55e")]).arrange(RIGHT, buff=0.08)
        bs.next_to(qs, UP, buff=0.05)
        e = self.t("3 × 100 g", 34, ORANGE_RETENUE).next_to(bs, UP, buff=0.15)
        hors_audit(e)
        l0 = base_commune(self.ligne([("Lina ajoute", WHITE), ("3 balles", ORANGE_RETENUE), ("de 100 g.", ORANGE_RETENUE)],
                                     36, buff=0.2))
        gauche(l0, -6.2, 3.0)
        self.au_mot("Lina ajoute")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("3 balles")
        self.play(FadeIn(l0[1], shift=UP * 0.1), FadeIn(bs, shift=DOWN * 0.4), run_time=0.35)
        self.au_mot("100 grammes")
        self.play(FadeIn(l0[2], shift=UP * 0.1), FadeIn(e), run_time=0.3)
        basculer(self, b, 0.5, [qs, bs, e], [m], run_time=0.8)
        l1 = base_commune(self.ligne([("1 000", BLEU_D), ("+", WHITE), ("300", ORANGE_RETENUE), ("=", WHITE),
                                      ("1 300 g", JAUNE_TITRE)], 46, buff=0.22))
        gauche(l1, -6.2, -2.0)
        self.morceaux(l1, ["1 000 plus", None, "300 :", None, "1 300 grammes"])
        l2 = base_commune(self.ligne([("C'est plus que", LOURD), ("1 kg.", LOURD)], 40, buff=0.22))
        gauche(l2, -6.2, -2.95)
        self.au_mot("C'est plus")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("1 kilogramme")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (1 kg de plumes, 1 kg de cailloux) ─────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        pl = plumes(1.05).move_to(P(-5.0, 2.0))
        ca = cailloux(1.45).move_to(P(-2.9, 1.75)).align_to(pl, DOWN)
        e1 = hors_audit(self.t("1 kg", 28, JAUNE_TITRE)).next_to(pl, DOWN, buff=0.12)
        e2 = hors_audit(self.t("1 kg", 28, JAUNE_TITRE)).next_to(ca, DOWN, buff=0.12).align_to(e1, DOWN)
        fig = VGroup(pl, ca)

        def avant_q(sc):
            sc.play(FadeIn(fig, shift=UP * 0.2), run_time=0.2)
            sc._q_apres = {2: lambda s2: s2.play(FadeIn(e1), run_time=0.2),
                           3: lambda s2: s2.play(FadeIn(e2), run_time=0.2)}
            sc._q_mots = {2: "1 kilogramme de plumes", 3: "1 kilogramme de cailloux"}

        def apres(sc):
            sc.play(Indicate(VGroup(e1, e2), color=VERT_OK, scale_factor=1.15), run_time=0.4)

        self._ph_mots = {(0, 0): "1 kilogramme, c'est", (0, 1): "1 kilogramme !", (1, 0): "Les plumes",
                         (2, 0): "juste plus"}
        self.question_gauche("06-question", "06b-reponse",
                             ["Qu'est-ce qui est", "le plus lourd :", "1 kg de plumes,", "ou 1 kg de cailloux ?"],
                             [self.choix(court(c_), fs=26) for c_ in Q2["choix"]], Q2["reponse"],
                             ["1 kg, c'est 1 kg !", "Les plumes prennent", "juste plus de place."],
                             0.0, couper={0: ("1 kg,", "c'est 1 kg !")},
                             mot_q="Qu'est-ce qui", avant_q=avant_q, autres_r=apres)
        self._ph_mots = {}

    # ── 07 : le défi (la valise de 2 kg, 5 quilles, 2 balles de 500 g) ─────
    def ecran_defi(self):
        self.ecran("07-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        va = valise(1.15).move_to(P(3.6, 1.35))
        ev = hors_audit(self.t("vide : 2 kg", 28, JAUNE_TITRE)).next_to(va, DOWN, buff=0.15)
        qs = cinq_quilles(0.6, buff=0.05).move_to(P(2.6, -0.9))
        bs = VGroup(balle(1.25, "#ef4444"), balle(1.25, "#22c55e")).arrange(RIGHT, buff=0.2)
        bs.next_to(qs, RIGHT, buff=0.5).align_to(qs, DOWN)
        eb = hors_audit(self.t("500 g", 26, ORANGE_RETENUE)).next_to(bs, DOWN, buff=0.12)
        l0 = VGroup(self.t("La valise vide", 36, WHITE), base_commune(self.ligne([("pèse", WHITE), ("2 kg.", WHITE)], 36, buff=0.2)))
        gauche(l0[0], -6.0, 2.0)
        gauche(l0[1], -6.0, 1.4)
        self.au_mot("La valise vide")
        self.play(FadeIn(l0[0], shift=UP * 0.1), FadeIn(va, shift=DOWN * 0.3), run_time=0.35)
        self.au_mot("pèse")
        self.play(FadeIn(l0[1][0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("2 kilogrammes")
        self.play(FadeIn(l0[1][1], shift=UP * 0.1), FadeIn(ev), run_time=0.3)
        l1 = VGroup(base_commune(self.ligne([("Lina y met", WHITE), ("5 quilles,", WHITE)], 36, buff=0.2)),
                    base_commune(self.ligne([("et 2 balles", WHITE), ("de 500 g.", WHITE)], 36, buff=0.2)))
        gauche(l1[0], -6.0, 0.6)
        gauche(l1[1], -6.0, 0.0)
        self.au_mot("Lina y met")
        self.play(FadeIn(l1[0][0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("5 quilles")
        self.play(FadeIn(l1[0][1], shift=UP * 0.1), LaggedStart(*[FadeIn(x, shift=DOWN * 0.2) for x in qs], lag_ratio=0.1),
                  run_time=0.4)
        self.au_mot("2 balles")
        self.play(FadeIn(l1[1][0], shift=UP * 0.1), FadeIn(bs, scale=1.15), run_time=0.3)
        self.au_mot("500 grammes")
        self.play(FadeIn(l1[1][1], shift=UP * 0.1), FadeIn(eb), run_time=0.3)
        l2 = self.t("Combien pèse la valise ?", 38, JAUNE_TITRE)
        gauche(l2, -6.0, -0.85)
        self.au_mot("Combien pèse")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Mets pause")
        p = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE)
        gauche(p, -6.0, -1.8)
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("07b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        bal = balance_electronique("", 1.6).move_to(P(4.4, -0.95))  # (17/11) au-dessus de Ti Margo
        va = valise(0.85).next_to(bal.plateau, UP, buff=0.02)
        self.play(Write(tit), FadeIn(bal), FadeIn(va, shift=DOWN * 0.3), run_time=0.35)
        l0 = base_commune(self.ligne([("5 quilles :", BLEU_D), ("1 kg.", BLEU_D)], 40, buff=0.25))
        gauche(l0, -6.0, 2.1)
        self.morceaux(l0, ["5 quilles", "1 kilogramme"])
        l1 = base_commune(self.ligne([("2 balles :", ORANGE_RETENUE), ("500 g", ORANGE_RETENUE), ("+ 500 g", ORANGE_RETENUE),
                                      ("= 1 kg.", ORANGE_RETENUE)], 38, buff=0.2))
        gauche(l1, -6.0, 1.15)
        self.morceaux(l1, ["2 balles", "500 plus", 6.70, 7.49])
        l2 = base_commune(self.ligne([("2 kg", JAUNE_TITRE), ("+", WHITE), ("1 kg", BLEU_D), ("+", WHITE),
                                      ("1 kg", ORANGE_RETENUE)], 44, buff=0.22))
        gauche(l2, -6.0, -0.2)
        # « plus » 9,58 et 10,02, le 2e « 1 » 10,32 : lus dans le WAV (le « 1 » vient après « plus »)
        self.morceaux(l2, ["2 plus", 9.58, "1 plus 1", 10.02, 10.32], run_time=0.15)
        l3 = base_commune(self.ligne([("La valise pèse", VERT_OK), ("4 kg.", VERT_OK)], 44, buff=0.22))
        gauche(l3, -6.0, -1.6)
        self.au_mot("la valise pèse")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("4 kilogrammes")
        self.play(FadeIn(l3[1], scale=1.1), Transform(bal.affichage, afficher(bal, "4 kg", 1.6)), run_time=0.3)
        self.insister(l3, 1.12, 0.3)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.65)
        b = Balance(2.7, s=0.7)
        fig = VGroup(b, b.poser(cinq_quilles(0.28, buff=0.03), "g"), b.poser(masse_marquee("1 kg", 0.55), "d"))
        lignes = self.finale_gauche(fig, textes=[
            ("On additionne des masses", "dans la même unité."),
            ("Et 1 000 g,", "c'est 1 kg.")], fs=36)
        self.add(fig)
        self.au_mot("On additionne")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        # « Et 1 000 g, » au « 1 000 » (la marque « Et 1 » tombe sur « Et » ; début du son à 5,66 s),
        # « c'est 1 kg. » au « 1 » (le socle l'attendait 0,5 s de trop)
        lg = lignes[1]
        assert len(lg[1]) == 2, lg[1]
        for f in lg[1].get_family():
            f.sans_synchro = True
        self.au_t(5.66)
        self.play(FadeIn(lg[1][0], shift=RIGHT * 0.2), Create(lg[0]), run_time=0.5)
        self.au_mot("1 kilogramme.")
        self.play(FadeIn(lg[1][1], shift=RIGHT * 0.2), run_time=0.4)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_quilles()
        self.ecran_un_kilo()
        self.ecran_question1()
        self.ecran_balles()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")


class MasseDefiCE1(MasseDefiCE1Base):
    identite = "Maths CE1 — EleveAI"
    ceinture = "jaune"
