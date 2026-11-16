# duree_calculer.py
# EleveAI — Maths CM1 — série « Durées » (CP → 6e), PILOTE CM1 : CALCULER UNE DURÉE
# (micro duree_calculer, notion duree), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Décor et métier : Théo, CONTRÔLEUR AÉRIEN (un vol de 9 h 40 à 11 h 15).
# Méthode CM1 : des BONDS sur une frise, en passant par l'heure pile ; jamais de soustraction posée en base 60.
# Mapping micro → écrans : 02 (la frise : départ, arrivée), 03 (les bonds + 20 min, + 1 h, + 15 min,
# l'horloge qui avance avec), 04 (on additionne : 1 h 35 min), 06 (piège : 1 h = 60 min, pas 100),
# questions 05 (14 h 30 → 16 h : 1 h 30, C) et 07 (10 h 50 + 25 min = 11 h 15, B),
# défi 08 (8 h 45 → 12 h 10 : 3 h 25 min).
# Voix : manim/voix/cm1-duree-calculer.json (validée le 16/11, « Oui, lance le pilote », Julie, débit −6) ;
# marques : duree_calculer_marques.json (python manim/scripts/cm1/aire_marques.py duree:calculer).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/duree_calculer.py DureeCalculerCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/duree_calculer.py DureeCalculerCM1 -o eleveai-maths-cm1-duree-calculer --media_dir manim/scripts/cm1/media-duree-calculer
# Sortie : manim/sorties/cm1/maths/duree/04-calculer/eleveai-maths-cm1-duree-calculer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from duree_cm1_commun import *  # noqa: E402,F403


def hl(*a, **k):
    """L'horloge, hors audit (ses nombres 1 à 12 ne sont pas des nombres dits)."""
    return hors_audit(horloge(*a, **k))


def frise_libre(places, textes, larg=11.0, fs=26):
    """Une frise PAS à l'échelle (le défi : 15 min et 10 min, sinon les heures se chevauchent).
    places : positions de 0 à 100 ; textes : les heures écrites sous les jalons."""
    f = frise(0, 100, larg=larg, jalons=list(places), fs=fs)
    for p, s in zip(places, textes):
        tr, ancien = f.jalon[p]
        neuf = Text(s, font_size=fs, color=WHITE, weight=BOLD).next_to(tr, DOWN, buff=0.18)
        ancien.become(neuf)
    return f


def ecran_hm(h, m, larg=2.1, fs=50, couleur="#22d3ee"):
    """L'écran digital « 11:15 » en DEUX morceaux (« 11: » puis « 15 »), chacun à son mot."""
    e = ecran_digital(f"{h}:{m:02d}", larg=larg, fs=fs)
    a = Text(f"{h}:", font="Consolas", font_size=fs, color=couleur, weight=BOLD)
    b = Text(f"{m:02d}", font="Consolas", font_size=fs, color=couleur, weight=BOLD)
    VGroup(a, b).arrange(RIGHT, buff=0.04).move_to(e.txt)
    g = VGroup(e.corps, a, b)
    g.corps, g.h, g.m = e.corps, a, b
    return g


def jal(f, t):
    """Le jalon t de la frise f (trait + heure)."""
    return VGroup(*f.jalon[t])


class DureeCalculerBase(PaysageDureeCM1):
    nom_voix = "cm1-duree-calculer"
    fichier_marques = "duree_calculer_marques.json"
    ceinture = "verte"

    _avec_q = {}

    def _disposer_q(self, question, choix, phrase):
        r = super()._disposer_q(question, choix, phrase)
        self._q_mob = r[1]
        return r

    def poser_lignes(self, mob, anim="fade", run_time=0.4):
        """La question d'une question-pause : chaque ligne arrive AVEC son morceau de frise (_avec_q)."""
        if mob is not getattr(self, "_q_mob", None) or not self._avec_q:
            return super().poser_lignes(mob, anim, run_time)
        for i, m in enumerate(mob.submobjects):
            self.play(FadeIn(m, shift=UP * 0.2), *[FadeIn(x) for x in self._avec_q.get(i, [])], run_time=run_time)
        self._avec_q = {}
        return mob

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Calculer une durée", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Calculer une durée")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q0 = self.t("Combien de temps", 38)
        q1 = self.ligne([("entre 9 h 40", JAUNE_TITRE), ("et 11 h 15 ?", JAUNE_TITRE)], 38, buff=0.2)
        q = VGroup(q0, q1).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        h1 = hl(0.85, 9, 40).move_to(P(2.55, 0.35))
        h2 = hl(0.85, 11, 15).move_to(P(5.35, 0.35))
        fl = Arrow(h1.get_right() + RIGHT * 0.05, h2.get_left() + LEFT * 0.05, buff=0.05, color=ORANGE_RETENUE,
                   stroke_width=6, max_tip_length_to_length_ratio=0.3)
        self.au_mot("Combien de temps")
        self.play(FadeIn(q0, shift=UP * 0.2), run_time=0.3)
        self.au_mot("9 heures 40")
        self.play(FadeIn(q1[0], shift=UP * 0.2), FadeIn(h1, scale=0.8), run_time=0.35)
        self.au_mot("11 heures 15")
        self.play(FadeIn(q1[1], shift=UP * 0.2), GrowArrow(fl), FadeIn(h2, scale=0.8), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 01 : Théo, contrôleur aérien ────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = theo(0.95).move_to(P(-4.85, 0.2))
        self.au_mot("Voici Théo")
        nom = self.t("Théo", 42, JAUNE_TITRE).next_to(pe, UP, buff=0.55)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Il est contrôleur")
        met = self.t("contrôleur aérien", 24, JAUNE_TITRE).next_to(pe, DOWN, buff=0.12)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        tc = tour_controle(0.9).move_to(P(-2.6, 0.0))
        self.au_mot("Depuis la tour")
        self.play(FadeIn(tc, shift=UP * 0.3), run_time=0.45)
        XL = -1.3
        l0 = gauche(self.t("Il guide les avions.", 34), XL, 2.95)
        self.au_mot("il guide")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        # les deux écrans de la tour : décollage, atterrissage
        e1 = ecran_digital("9:40", larg=2.1, fs=50).move_to(P(0.2, 0.0))
        e2 = ecran_hm(11, 15).move_to(P(4.4, 0.0))
        t1 = self.t("Décollage", 30, BLEU_D).next_to(e1, UP, buff=0.2)
        t2 = self.t("Atterrissage", 30, VERT_OK).next_to(e2, UP, buff=0.2)
        av = avion(0.75).move_to(P(0.2, 1.75))
        chemin = ArcBetweenPoints(P(0.2, 1.75), P(4.4, 1.75), angle=-0.5)
        self.au_mot("Un avion décolle")
        self.play(FadeIn(t1, shift=UP * 0.1), FadeIn(av, shift=RIGHT * 0.3), run_time=0.4)
        self.au_mot("9 heures 40")
        self.play(FadeIn(e1, scale=0.8), run_time=0.35)
        self.au_mot("Il atterrit")
        self.play(FadeIn(t2, shift=UP * 0.1), MoveAlongPath(av, chemin), run_time=0.55)
        self.au_mot("à 11")
        self.play(FadeIn(e2.corps, scale=0.8), FadeIn(e2.h), run_time=0.3)
        self.au_mot("11 heures 15")
        self.play(FadeIn(e2.m, scale=1.2), run_time=0.25)
        q = gauche(self.t("Combien de temps a duré le vol ?", 32, JAUNE_TITRE), XL, -1.6)
        self.au_mot("Combien de temps")
        self.play(FadeIn(q, shift=UP * 0.15), Circumscribe(e1, color=JAUNE_TITRE, buff=0.08),
                  Circumscribe(e2, color=JAUNE_TITRE, buff=0.08), run_time=0.6)
        self.attendre_voix()

    # ── 02 : la frise du temps ──────────────────────────────────────────────
    def la_frise(self, y=-0.4, larg=11.0):
        f = frise(580, 675, larg=larg, jalons=[580, 600, 660, 675], fs=28)
        f.move_to(P(-0.2, y))
        return f

    def ecran_frise(self):
        self.ecran("02-frise")
        tit = self.t("La frise du temps", 46, JAUNE_TITRE).move_to(P(0, 3.0))
        self.au_mot("On dessine")
        self.play(FadeIn(tit, shift=UP * 0.15), run_time=0.3)
        f = self.la_frise(y=0.0)
        self.au_mot("frise du temps")
        self.play(GrowArrow(f.ligne), run_time=0.7)
        d = self.t("départ", 30, BLEU_D).next_to(f.jalon[580][0], UP, buff=0.3)
        a = self.t("arrivée", 30, VERT_OK).next_to(f.jalon[675][0], UP, buff=0.3)
        self.au_mot("À gauche")
        self.play(FadeIn(f.jalon[580][0], scale=1.6), run_time=0.4)
        self.au_mot("le départ")
        self.play(FadeIn(d, shift=DOWN * 0.1), run_time=0.3)
        self.au_mot("9 heures 40")
        self.play(FadeIn(f.jalon[580][1], scale=1.3), run_time=0.35)
        self.au_mot("À droite")
        self.play(FadeIn(f.jalon[675][0]), run_time=0.3)
        self.au_mot("l'arrivée")
        self.play(FadeIn(a, shift=DOWN * 0.1), run_time=0.3)
        self.au_mot("11 heures 15")
        self.play(FadeIn(f.jalon[675][1], scale=1.3), run_time=0.35)
        l = self.t("On va avancer par bonds.", 40, ORANGE_RETENUE).move_to(P(-0.4, -2.0))
        # un bond d'exemple, en pointillés, juste pour montrer le geste
        x0, x1 = f.x(580), f.x(675)
        saut = DashedVMobject(ArcBetweenPoints(P(x0, 0.15), P(x0 + 1.6, 0.15), angle=-2.0, color=BOND,
                                               stroke_width=5), num_dashes=14)
        self.au_mot("On va avancer")
        self.play(FadeIn(l, shift=UP * 0.1), run_time=0.35)
        self.au_mot("par bonds")
        self.play(Create(saut), run_time=0.6)
        self.play(FadeOut(saut), run_time=0.3)
        self.attendre_voix()

    # ── 03 : les trois bonds, l'horloge avance avec ─────────────────────────
    def ecran_bonds(self):
        self.ecran("03-bonds")
        tit = self.t("On avance par bonds", 44, JAUNE_TITRE).move_to(P(0, 3.1))
        self.add(hors_audit(tit))
        f = self.la_frise(y=-1.25)
        hors_audit(VGroup(f.ligne, *f.jalon[580], *f.jalon[675]))
        self.add(f.ligne, *f.jalon[580], *f.jalon[675])
        hg = hl(0.95, 9, 40).move_to(P(-5.25, 1.35))
        self.add(hg)
        b1 = bond(f, 580, 600, "+ 20 min")
        b2 = bond(f, 600, 660, "+ 1 h", couleur=BOND2)
        b3 = bond(f, 660, 675, "+ 15 min")
        # 1er bond : jusqu'à l'heure pile
        self.au_mot("Premier bond")
        self.play(Indicate(f.jalon[580][1], color=JAUNE_TITRE), run_time=0.4)
        self.au_mot("à 10 heures")
        s1 = secteur_minutes(hg, 40, 60)
        self.play(FadeIn(VGroup(*f.jalon[600]), shift=UP * 0.1), Create(b1.arc), FadeIn(b1.pointe), FadeIn(s1),
                  tourner(hg, 10, 0, run_time=1.0), run_time=1.0)
        self.au_mot("20 minutes")
        self.play(FadeIn(b1.txt, scale=1.3), run_time=0.3)
        lp = gauche(self.t("On tombe sur une heure pile !", 34, VERT_OK), -3.85, 1.35)
        self.au_mot("On tombe")
        self.play(FadeIn(lp, shift=RIGHT * 0.2), Circumscribe(VGroup(*f.jalon[600]), color=VERT_OK, buff=0.1),
                  run_time=0.7)
        # 2e bond : une heure entière
        self.au_mot("Deuxième bond")
        self.play(FadeOut(s1), FadeOut(lp), run_time=0.3)
        self.au_mot("de 10 heures")
        self.play(Create(b2.arc), FadeIn(b2.pointe), run_time=0.55)
        self.au_mot("à 11 heures")
        self.play(FadeIn(VGroup(*f.jalon[660]), shift=UP * 0.1), run_time=0.25)
        self.au_mot(", 1 heure")
        self.play(FadeIn(b2.txt, scale=1.3), tourner(hg, 11, 0, run_time=0.9), run_time=0.9)
        # dernier bond : les minutes qui restent
        self.au_mot("Dernier bond")
        self.play(Indicate(VGroup(*f.jalon[660]), color=JAUNE_TITRE), run_time=0.4)
        s3 = secteur_minutes(hg, 0, 15)
        self.au_mot("11 heures 15")
        self.play(Create(b3.arc), FadeIn(b3.pointe), FadeIn(s3), Indicate(f.jalon[675][1], color=JAUNE_TITRE),
                  tourner(hg, 11, 15, run_time=0.8), run_time=0.8)
        self.au_mot("15 minutes")
        self.play(FadeIn(b3.txt, scale=1.3), run_time=0.3)
        self.attendre_voix()

    # ── 04 : on additionne les bonds ────────────────────────────────────────
    def frise_complete(self, y, larg=11.0, fs=28, fs_b=28):
        f = frise(580, 675, larg=larg, jalons=[580, 600, 660, 675], fs=fs).move_to(P(-0.2, y))
        bs = VGroup(bond(f, 580, 600, "+ 20 min", fs=fs_b), bond(f, 600, 660, "+ 1 h", couleur=BOND2, fs=fs_b),
                    bond(f, 660, 675, "+ 15 min", fs=fs_b))
        return hors_audit(VGroup(f, bs)), f, bs

    def ecran_total(self):
        self.ecran("04-total")
        tit = self.t("On additionne les bonds", 44, JAUNE_TITRE).move_to(P(0, 3.1))
        self.au_mot("On additionne")
        self.play(FadeIn(tit, shift=UP * 0.15), run_time=0.3)
        g, f, bs = self.frise_complete(0.75)
        self.add(g)
        lg = self.ligne([("1 h", BLEU_D), ("+ 20 min", ORANGE_RETENUE), ("+ 15 min", ORANGE_RETENUE),
                         ("= 1 h 35 min", VERT_OK)], 46, buff=0.3)
        lg.move_to(P(-0.4, -1.05))
        self.au_mot("bonds. 1 heure")
        self.play(FadeIn(lg[0], shift=UP * 0.1), Indicate(bs[1].txt, color=JAUNE_TITRE, scale_factor=1.3),
                  run_time=0.4)
        self.au_mot("plus 20")
        self.play(FadeIn(lg[1], shift=UP * 0.1), Indicate(bs[0].txt, color=JAUNE_TITRE, scale_factor=1.3),
                  run_time=0.4)
        self.au_mot("plus 15")
        self.play(FadeIn(lg[2], shift=UP * 0.1), Indicate(bs[2].txt, color=JAUNE_TITRE, scale_factor=1.3),
                  run_time=0.4)
        self.au_mot("1 heure 35")
        self.play(FadeIn(lg[3], scale=1.2), run_time=0.4)
        l2 = self.ligne([("Le vol a duré", WHITE), ("1 h 35 min.", VERT_OK)], 42, buff=0.25)
        l2.move_to(P(-0.4, -2.3))
        self.au_mot("Le vol a duré")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("1 heure 35.")
        self.play(FadeIn(l2[1], scale=1.2), run_time=0.35)
        self.insister(l2[1], 1.2, 0.25)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        f = frise(870, 960, larg=4.4, jalons=[870, 900, 960], fs=26).move_to(P(-3.45, 1.15))
        hors_audit(f)
        b1 = hors_audit(bond(f, 870, 900, "+ 30 min", fs=24))
        b2 = hors_audit(bond(f, 900, 960, "+ 1 h", couleur=BOND2, fs=24))

        self._avec_q = {0: [f.ligne, *f.jalon[870]], 1: [*f.jalon[960]]}

        def autres_r(sc):
            sc.rep(0, avec=[FadeIn(VGroup(*f.jalon[900])), Create(b1)])
            sc.rep(1, avec=[Create(b2)])
            sc.rep_fin()

        self.question_gauche("05-question", "05b-reponse",
                             ["Un avion part à 14 h 30.", "Il arrive à 16 h.", "Combien de temps de vol ?"],
                             [self.choix("2 h 30"), self.choix("1 h"), self.choix("1 h 30")], 2,
                             ["De 14 h 30 à 15 h : 30 min.", "De 15 h à 16 h : 1 h.", "En tout : 1 h 30."],
                             -0.75, mot_q="Un avion part", autres_r=autres_r)

    # ── 06 : le piège (1 h = 60 min, pas 100) ───────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        XL = -6.2
        l0 = self.ligne([("11 − 9", ROUGE_ERREUR), ("puis", WHITE), ("15 − 40", ROUGE_ERREUR)], 44, buff=0.35)
        gauche(l0, XL, 1.9)
        self.au_mot("On ne calcule pas")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("puis 15")
        self.play(FadeIn(l0[1], shift=UP * 0.1), FadeIn(l0[2], shift=UP * 0.1), run_time=0.3)
        def x_sur(m):
            return VGroup(Line(m.get_corner(DL) + P(-0.1, -0.15), m.get_corner(UR) + P(0.1, 0.15)),
                          Line(m.get_corner(UL) + P(-0.1, 0.15), m.get_corner(DR) + P(0.1, -0.15)))

        croix = VGroup(x_sur(l0[0]), x_sur(l0[2])).set_stroke(ROUGE_ERREUR, 6)
        self.play(Create(croix), run_time=0.4)
        hg = hl(1.25, 10, 0, minutes_ecrites=True).move_to(P(4.15, 1.0))
        self.au_mot("Une heure, ce")
        l1 = self.ligne([("1 h", BLEU_D), ("≠ 100 min", ROUGE_ERREUR)], 44, buff=0.3)
        hors_audit(l1[0])  # la voix dit « Une heure »
        gauche(l1, XL, 0.7)
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(hg, scale=0.8), run_time=0.35)
        self.au_mot("pas 100")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.insister(l1[1], 1.15, 0.2)
        l2 = self.ligne([("1 h", BLEU_D), ("= 60 min", VERT_OK)], 44, buff=0.3)
        hors_audit(l2[0])
        gauche(l2, XL, -0.4)
        s = secteur_minutes(hg, 0, 59.99, couleur=VERT_OK, opacite=0.3)
        self.au_mot("c'est 60")
        self.play(FadeIn(l2, shift=UP * 0.1), tourner(hg, 11, 0, run_time=1.6), FadeIn(s), run_time=1.6)
        self.insister(l2[1], 1.2, 0.25)
        l3 = gauche(self.t("On avance par bonds,", 38, JAUNE_TITRE), XL, -1.65)
        l4 = gauche(self.t("en passant par l'heure pile.", 38, JAUNE_TITRE), XL, -2.35)
        self.au_mot("Alors on avance")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.35)
        self.au_mot("en passant")
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.35)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        f = frise(650, 675, larg=4.4, jalons=[650, 660, 675], fs=26).move_to(P(-3.45, 1.15))
        hors_audit(f)
        tr_fin, h_fin = f.jalon[675]
        qm = hors_audit(Text("?", font_size=34, color=ORANGE_RETENUE, weight=BOLD).move_to(h_fin))
        acc = accolade(VGroup(f.jalon[650][0], tr_fin), "25 min", 26, ORANGE_RETENUE)
        b1 = hors_audit(bond(f, 650, 660, "+ 10 min", fs=24))
        b2 = hors_audit(bond(f, 660, 675, "+ 15 min", fs=24))
        self._avec_q = {0: [f.ligne, *f.jalon[650]], 1: [tr_fin, qm, acc]}

        def autres_r(sc):
            sc.rep(0, avec=[FadeOut(acc), FadeIn(VGroup(*f.jalon[660])), Create(b1)])
            sc.rep(1)
            sc.rep(2, avec=[Create(b2), FadeOut(qm), FadeIn(h_fin, scale=1.3)])
            sc.rep_fin()

        self.question_gauche("07-question", "07b-reponse",
                             ["Un avion se pose à 10 h 50.", "Il repart 25 min plus tard.",
                              "À quelle heure repart-il ?"],
                             [self.choix("10 h 75"), self.choix("11 h 15"), self.choix("11 h 25")], 1,
                             ["De 10 h 50 à 11 h : 10 min.", "Il reste 15 min.", "11 h + 15 min = 11 h 15."],
                             -0.75, mot_q="Un avion se pose", autres_r=autres_r)

    # ── 08 : le défi (8 h 45 → 12 h 10) ─────────────────────────────────────
    PL = (0, 19, 81, 100)  # frise du défi, pas à l'échelle

    def frise_defi(self, y):
        f = frise_libre(self.PL, ["8 h 45", "9 h", "12 h", "12 h 10"], larg=10.6, fs=28).move_to(P(-0.3, y))
        return hors_audit(f)

    def pause_gauche(self, y=-2.75, marge=2.0):
        self.au_mot("Mets pause")
        p = gauche(self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE), -6.2, y)
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=marge)

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        av = avion(0.8).move_to(P(4.3, 1.85))
        l0 = self.ligne([("Un avion décolle à", WHITE), ("8 h", BLEU_D), ("45.", BLEU_D)], 36, buff=0.2)
        gauche(l0, -6.2, 2.2)
        l1 = self.ligne([("Il atterrit à", WHITE), ("12 h", VERT_OK), ("10.", VERT_OK)], 36, buff=0.2)
        gauche(l1, -6.2, 1.5)
        f = self.frise_defi(-0.15)
        d = VGroup(*f.jalon[0])
        a = VGroup(*f.jalon[100])
        self.au_mot("Un avion décolle")
        self.play(FadeIn(l0[0], shift=UP * 0.1), FadeIn(av, shift=RIGHT * 0.4), GrowArrow(f.ligne), run_time=0.45)
        self.au_mot("à 8")
        self.play(FadeIn(l0[1], scale=1.2), run_time=0.25)
        self.au_mot("45. Il")
        self.play(FadeIn(l0[2], scale=1.2), FadeIn(d, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Il atterrit")
        self.play(FadeIn(l1[0], shift=UP * 0.1), av.animate.shift(RIGHT * 1.2 + DOWN * 0.35), run_time=0.5)
        self.au_mot("à 12")
        self.play(FadeIn(l1[1], scale=1.2), run_time=0.25)
        self.au_mot("10. Combien")
        self.play(FadeIn(l1[2], scale=1.2), FadeIn(a, shift=UP * 0.1), run_time=0.3)
        q = gauche(self.t("Combien de temps a duré le vol ?", 38, JAUNE_TITRE), -6.2, -1.6)
        self.au_mot("Combien de temps")
        self.play(FadeIn(q, shift=UP * 0.15), Wiggle(f.ligne), run_time=0.6)
        self.pause_gauche(y=-2.45)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        f = self.frise_defi(0.85)
        self.add(f.ligne, *f.jalon[0], *f.jalon[100])
        b1 = bond(f, 0, 19, "+ 15 min")
        b2 = bond(f, 19, 81, "+ 3 h", couleur=BOND2, hauteur=0.9)
        b3 = bond(f, 81, 100, "+ 10 min")
        XL = -6.2
        self.au_mot("De 8 heures 45")
        self.play(FadeIn(VGroup(*f.jalon[19]), shift=UP * 0.1), Create(b1.arc), FadeIn(b1.pointe), run_time=0.5)
        self.au_mot("15 minutes")
        self.play(FadeIn(b1.txt, scale=1.3), run_time=0.3)
        self.au_mot("De 9 heures à")
        self.play(FadeIn(VGroup(*f.jalon[81]), shift=UP * 0.1), Create(b2.arc), FadeIn(b2.pointe), run_time=0.8)
        self.au_mot("3 heures")
        self.play(FadeIn(b2.txt, scale=1.3), run_time=0.3)
        self.au_mot("De 12 heures à")
        self.play(Create(b3.arc), FadeIn(b3.pointe), run_time=0.5)
        self.au_mot("10 minutes")
        self.play(FadeIn(b3.txt, scale=1.3), run_time=0.3)
        lg = self.ligne([("3 h", BLEU_D), ("+ 15 min", ORANGE_RETENUE), ("+ 10 min", ORANGE_RETENUE),
                         ("= 3 h", VERT_OK), ("25 min", VERT_OK)], 46, buff=0.3)
        lg.move_to(P(-0.4, -1.15))
        hors_audit(VGroup(*lg[:3]))
        self.au_mot("En tout")
        self.play(FadeIn(VGroup(*lg[:3]), shift=UP * 0.1), run_time=0.35)
        self.au_mot("tout : 3")
        self.play(FadeIn(lg[3], scale=1.2), run_time=0.3)
        self.au_mot("3 heures 25")
        self.play(FadeIn(lg[4], scale=1.2), run_time=0.3)
        self.insister(VGroup(lg[3], lg[4]), 1.15, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        h = hl(0.75, 11, 15)
        f = frise(580, 675, larg=4.1, jalons=[580, 675], fs=24)
        bs = VGroup(bond(f, 580, 600, "+ 20 min", fs=22, hauteur=0.3),
                    bond(f, 600, 660, "+ 1 h", couleur=BOND2, fs=22, hauteur=0.9),
                    bond(f, 660, 675, "+ 15 min", fs=22, hauteur=0.3))
        # les petits bonds : leur texte s'écarte du grand arc bleu (vers l'extérieur)
        bs[0].txt.align_to(bs[0].arc, RIGHT).shift(LEFT * 0.12 + UP * 0.06)
        bs[2].txt.align_to(bs[2].arc, LEFT).shift(RIGHT * 0.12 + UP * 0.06)
        fig = hors_audit(VGroup(h, VGroup(f, bs)).arrange(DOWN, buff=0.45))
        lignes = self.finale_gauche(fig, textes=[
            ("Pour calculer une durée,", "on dessine une frise."),
            ("On avance par bonds,", "en passant par l'heure pile."),
            ("Puis on additionne les bonds.",),
            ("1 h = 60 min.",)], fs=32, x_fig=-3.8, xl=-0.5)
        self.add(fig)
        self.au_mot("Pour calculer")
        self.montrer_ligne(lignes[0], Indicate(f, scale_factor=1.05))
        self.au_mot("On avance")
        self.montrer_ligne(lignes[1], Indicate(bs, scale_factor=1.05))
        self.au_mot("Puis on additionne")
        self.montrer_ligne(lignes[2])
        self.au_mot("1 heure, c'est")
        self.montrer_ligne(lignes[3])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_frise()
        self.ecran_bonds()
        self.ecran_total()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class DureeCalculerCM1(DureeCalculerBase):
    identite = "Maths CM1 — EleveAI"
    ceinture = "verte"
