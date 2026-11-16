# masse_cp_estimer.py
# EleveAI — Maths CP — série « Masses » (CP → CM2), ÉPISODE CP 03 : ranger des masses
# (micro cp_masse_contenance_estimer, notion masse_contenance), AVEC VOIX.
# Paysage 16:9, CEINTURE BLANCHE. Short jumeau : film Ti Margo (trois chats sur la branche).
# Décor et métier : Zoé, TOILETTEUSE (centres : animaux).
# Mapping micro → écrans : 02 (deux par deux, deux balances), 03 (le rang : chiot, chien moyen, gros chien),
# 04 question (A > B, B > C : la plus lourde ?), 05 (sans balance, on devine : souris, chat, cheval),
# 06 question (le plus lourd des trois), 07 défi (pastèque, fraise, pomme), 07b correction, 08 ce que tu as appris.
# Voix : manim/voix/cp-masse-estimer.json (source : masse_voix.py, validée le 16/11).
# Marques : python manim/scripts/ce2/perimetre_marques.py masse:estimer:cp
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/masse_cp_estimer.py MasseEstimerCP
# Sortie : manim/sorties/cp/maths/masse/03-estimer/eleveai-maths-cp-masse-estimer.mp4

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from masse_commun import *  # noqa: E402,F403

_V = {e["id"]: e for e in json.load(open(Path(__file__).resolve().parent / "masse_voix.json", encoding="utf-8"))}
EP = _V["cp-masse-estimer"]
Q1, Q2 = EP["questions"]
TURQUOISE = "#2dd4bf"
CHIOT, MOYEN, GROS = ("#d97706", "#92400e"), ("#a16207", "#713f12"), ("#57534e", "#292524")


def court(s):
    return s[0].upper() + s[1:]


def chiot(s=1.0):
    return chien(0.55 * s, *CHIOT)


def chien_moyen(s=1.0):
    return chien(0.9 * s, *MOYEN)


def gros_chien(s=1.0):
    return chien(1.35 * s, *GROS)


def meme_ligne(etiquettes, y):
    """Pose des étiquettes sur la MÊME ligne de base : elles commencent toutes par la même lettre
    (« un », « une », « le », « la ») ; le bas de cette première lettre va à y."""
    for e in etiquettes:
        e.shift(UP * (y - e[0].get_bottom()[1]))
    return etiquettes


def boite_lettre(lettre, s=1.0, couleur="#a78bfa"):
    """Une boîte fermée qui porte sa lettre (A, B, C)."""
    b = boite(s, couleur)
    t = Text(lettre, font_size=int(30 * s), color=WHITE, weight=BOLD).move_to(b)
    return VGroup(b, t)


class MasseEstimerCPBase(PaysageMasse):
    nom_voix = "cp-masse-estimer"
    fichier_marques = "masse_cp_estimer_marques.json"
    ceinture = "blanche"
    fs_choix = 26  # la taille commune des trois choix (CP 04, question 2 : 22, les choix sont longs)
    decal_q, elargir_q = 1.8, 1.2  # la colonne glisse à gauche de decal_q, les cartes s'élargissent de elargir_q

    def _disposer_q(self, question, choix, phrase):
        """Comme en CP 02 : la colonne de la question glisse de 1,8 vers la gauche, les cartes s'élargissent
        de 1,2 (leur bord droit s'écarte de Ti Margo), les trois choix gardent la MÊME taille (26), et la
        phrase de la réponse ne touche pas les cartes."""
        r = super()._disposer_q(question, choix, phrase)
        tete, q, cartes, pause, rebours = r[:5]
        D, E = self.decal_q, self.elargir_q
        for m in (tete, q, cartes, pause, rebours):
            m.shift(LEFT * D)
        for c in cartes:
            fond, corps = c[0], c[1][1]
            g = fond.get_left()[0]
            fond.stretch_to_fit_width(fond.width + E).shift(RIGHT * (g - fond.get_left()[0]))
            g = corps.get_left()[0]
            corps.scale(self.fs_choix / corps.font_size).shift(RIGHT * (g - corps.get_left()[0]))
            assert corps.get_right()[0] < fond.get_right()[0] - 0.8, corps  # la place de la coche
        ph = r[5]
        lim = cartes.get_left()[0] - 0.35
        if ph.get_right()[0] > lim:
            g, h = ph.get_left()[0], ph.get_top()[1]
            ph.scale((lim - g) / ph.width)
            ph.shift(RIGHT * (g - ph.get_left()[0]) + UP * (h - ph.get_top()[1]))
        return r

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Ranger des masses", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Ranger des masses")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q0 = self.t("Trois chiens :", 40, JAUNE_TITRE)
        q1 = self.t("lequel est le plus léger ?", 40, JAUNE_TITRE)
        q = VGroup(q0, q1).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        f = VGroup(chiot(0.7), chien_moyen(0.7), gros_chien(0.7)).arrange(RIGHT, buff=0.3, aligned_edge=DOWN)
        f.move_to(P(4.3, 0.3))
        self.au_mot("Trois chiens")
        self.play(FadeIn(q0, shift=UP * 0.2), LaggedStart(*[FadeIn(x, scale=1.1) for x in f], lag_ratio=0.25),
                  run_time=0.6)
        self.au_mot("lequel est le plus léger")
        self.play(FadeIn(q1, shift=UP * 0.2), run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 01 : Zoé, toiletteuse ───────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = zoe(0.95).move_to(P(-5.0, 0.2))
        nom = self.t("Zoé", 42, TURQUOISE).next_to(pe, UP, buff=0.4)
        self.au_mot("Voici Zoé")
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Elle est toiletteuse")
        met = self.t("toiletteuse", 30, TURQUOISE).next_to(pe, DOWN, buff=0.15)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("elle lave et coiffe les chiens")
        l0 = self.bloc(["Elle lave et coiffe", "les chiens."], 34, GRAY_B)
        self.col(l0, 2.5, -2.6)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        Y = -1.0
        c1, c2, c3 = chiot().move_to(P(-1.8, Y)), chien_moyen().move_to(P(1.2, Y)), gros_chien().move_to(P(4.6, Y))
        for c in (c1, c2, c3):
            c.align_to(P(0, Y - 0.6), DOWN)
        n1 = self.t("un chiot", 28).next_to(c1, DOWN, buff=0.2)
        n2 = self.t("un chien moyen", 28).next_to(c2, DOWN, buff=0.2)
        n3 = self.t("un gros chien", 28).next_to(c3, DOWN, buff=0.2)
        meme_ligne((n1, n2, n3), n1[0].get_bottom()[1])
        self.au_mot("un chiot")
        self.play(FadeIn(c1, shift=DOWN * 0.3), FadeIn(n1), run_time=0.35)
        self.au_mot("un chien moyen")
        self.play(FadeIn(c2, shift=DOWN * 0.3), FadeIn(n2), run_time=0.35)
        self.au_mot("un gros chien")
        self.play(FadeIn(c3, shift=DOWN * 0.3), FadeIn(n3), run_time=0.35)
        self.attendre_voix()

    # ── 02 : deux par deux ──────────────────────────────────────────────────
    def ecran_deux_par_deux(self):
        self.ecran("02-deux-par-deux")
        self.au_mot("Pour ranger, on compare deux par deux")
        tit = self.t("On compare deux par deux", 40, JAUNE_TITRE).move_to(P(0, 3.0))
        self.play(Write(tit), run_time=0.5)
        b1 = Balance(4.5).move_to(P(-3.5, 0.5))
        b2 = Balance(4.5).move_to(P(3.3, 0.5))
        g1, d1 = b1.poser(chiot(0.75), "g"), b1.poser(chien_moyen(0.7), "d")
        g2, d2 = b2.poser(chien_moyen(0.7), "g"), b2.poser(gros_chien(0.6), "d")
        self.au_mot("Le chiot est plus léger que le chien moyen")
        self.play(FadeIn(b1), FadeIn(g1, shift=DOWN * 0.3), FadeIn(d1, shift=DOWN * 0.3), run_time=0.45)
        basculer(self, b1, -0.5, [g1], [d1], run_time=0.8)
        l1 = self.bloc(["Le chiot est plus léger", "que le chien moyen."], 30, LEGER)
        l1.move_to(P(-3.5, -1.45))
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("Le chien moyen est plus léger que le gros chien")
        self.play(FadeIn(b2), FadeIn(g2, shift=DOWN * 0.3), FadeIn(d2, shift=DOWN * 0.3), run_time=0.45)
        basculer(self, b2, -0.5, [g2], [d2], run_time=0.8)
        l2 = self.bloc(["Le chien moyen est plus léger", "que le gros chien."], 30, LEGER)
        l2.move_to(P(2.9, -1.45))
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        self.attendre_voix()

    # ── 03 : le rang ────────────────────────────────────────────────────────
    def ecran_rang(self):
        self.ecran("03-rang")
        self.au_mot("Du plus léger au plus lourd")
        tit = self.t("Du plus léger au plus lourd", 40, JAUNE_TITRE).move_to(P(0, 3.0))
        fl = Arrow(P(-5.4, 1.9), P(5.4, 1.9), color=ORANGE_RETENUE, stroke_width=8, buff=0)
        e0 = self.t("plus léger", 28, LEGER).next_to(fl.get_start(), DOWN, buff=0.15).align_to(fl, LEFT)
        e1 = self.t("plus lourd", 28, LOURD).next_to(fl.get_end(), DOWN, buff=0.15).align_to(fl, RIGHT)
        self.play(Write(tit), GrowArrow(fl), FadeIn(e0), FadeIn(e1), run_time=0.6)
        Y = -0.9
        chiens = [chiot().move_to(P(-4.0, Y)), chien_moyen().move_to(P(-0.2, Y)), gros_chien().move_to(P(3.8, Y))]
        for c in chiens:
            c.align_to(P(0, Y - 0.6), DOWN)
        noms = ["le chiot", "le chien moyen", "le gros chien"]
        for k, (c, n) in enumerate(zip(chiens, noms)):
            self.au_mot(n)
            num = self.t(str(k + 1), 44, JAUNE_TITRE)
            num.move_to(P(c.get_center()[0], 0.8))
            hors_audit(num)
            et = meme_ligne([self.t(n, 30).move_to(P(c.get_center()[0], 0))], Y - 1.1)[0]
            self.play(FadeIn(c, shift=RIGHT * 0.3), FadeIn(num, scale=1.2), FadeIn(et), run_time=0.4)
        self.insister(chiens[0], 1.2, 0.3)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (A pèse plus que B, B plus que C) ───────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        ba = Balance(2.4, penche=0.5, s=0.72).move_to(P(-4.95, 2.05))
        bb = Balance(2.4, penche=0.5, s=0.72).move_to(P(-2.75, 0.45))
        A, B1 = ba.poser(boite_lettre("A", 0.8, "#f472b6"), "g"), ba.poser(boite_lettre("B", 0.8, "#60a5fa"), "d")
        B2, C = bb.poser(boite_lettre("B", 0.8, "#60a5fa"), "g"), bb.poser(boite_lettre("C", 0.8, "#4ade80"), "d")
        fig = VGroup(ba, A, B1, bb, B2, C)

        def autres_q(sc):
            sc.play(FadeIn(fig), run_time=0.35)

        def apres(sc):
            sc.play(Indicate(A, color=VERT_OK, scale_factor=1.3), run_time=0.4)

        self.question_gauche("04-question", "04b-reponse",
                             ["La boîte A pèse plus que la B.", "La B pèse plus que la C.",
                              "Laquelle est la plus lourde ?"],
                             [self.choix(court(c), fs=26) for c in Q1["choix"]], Q1["reponse"],
                             ["A pèse plus que B,", "et B plus que C.", "Donc A est la plus lourde."],
                             -1.05, mot_q="La boîte A", autres_q=autres_q, autres_r=apres)

    # ── 05 : sans balance, on devine ────────────────────────────────────────
    def ecran_deviner(self):
        self.ecran("05-deviner")
        self.au_mot("Sans balance, on peut deviner")
        tit = self.t("Sans balance, on peut deviner", 40, JAUNE_TITRE).move_to(P(0, 3.0))
        self.play(Write(tit), run_time=0.5)
        Y = -0.2
        s, c, h = souris(1.3), chat(1.1), cheval(1.1)
        s.move_to(P(-4.6, Y)).align_to(P(0, Y - 0.9), DOWN)
        c.move_to(P(-0.9, Y)).align_to(P(0, Y - 0.9), DOWN)
        h.move_to(P(3.6, Y)).align_to(P(0, Y - 0.9), DOWN)
        ps = [self.t("plus léger", 28, LEGER).move_to(P(-2.75, Y - 1.55)),
              self.t("plus léger", 28, LEGER).move_to(P(1.35, Y - 1.55))]
        sg = [self.t("<", 60, LEGER).move_to(P(-2.75, Y - 0.6)), self.t("<", 60, LEGER).move_to(P(1.35, Y - 0.6))]
        for m in sg:
            hors_audit(m)
        self.au_mot("Une souris")
        self.play(FadeIn(s, shift=UP * 0.2), run_time=0.35)
        self.au_mot("est plus légère")
        self.play(FadeIn(sg[0]), FadeIn(ps[0]), run_time=0.3)
        self.au_mot("qu'un chat")
        self.play(FadeIn(c, shift=UP * 0.2), run_time=0.35)
        self.au_mot("Un chat est plus léger")
        self.play(FadeIn(sg[1]), FadeIn(ps[1]), run_time=0.3)
        self.au_mot("qu'un cheval")
        self.play(FadeIn(h, shift=UP * 0.2), run_time=0.4)
        self.insister(h, 1.12, 0.3)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (souris, chat, cheval) ──────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        s, c, h = souris(0.75), chat(0.62), cheval(0.62)
        fig = VGroup(s, c, h).arrange(RIGHT, buff=0.35, aligned_edge=DOWN).move_to(P(-3.9, 1.5))

        def autres_q(sc):
            sc.play(LaggedStart(*[FadeIn(x, shift=UP * 0.2) for x in fig], lag_ratio=0.3), run_time=0.6)

        def apres(sc):
            sc.play(Indicate(h, color=VERT_OK, scale_factor=1.25), run_time=0.4)

        self.question_gauche("06-question", "06b-reponse",
                             ["Une souris, un chat, un cheval.", "Qui est le plus lourd ?"],
                             [self.choix(court(c), fs=26) for c in Q2["choix"]], Q2["reponse"],
                             ["Le cheval est bien plus lourd", "que le chat et la souris."],
                             -0.75, mot_q="Une souris", autres_q=autres_q, autres_r=apres)

    # ── 07 : le défi (pastèque, fraise, pomme) ──────────────────────────────
    def fruits(self):
        Y = 0.15
        f = [pasteque(1.0), fraise(1.6), pomme(1.2)]
        for o, x in zip(f, (-4.6, -1.6, 1.3)):
            o.move_to(P(x, Y)).align_to(P(0, Y - 0.5), DOWN)
        return f

    def ecran_defi(self):
        self.ecran("07-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        self.au_mot("Range du plus léger au plus lourd")
        q = self.bloc(["Range du plus léger", "au plus lourd :"], 38, JAUNE_TITRE)
        gauche(q, -6.0, 1.9)
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.4)
        f = self.fruits()
        noms = ["une pastèque", "une fraise", "une pomme"]
        for o, n in zip(f, noms):
            self.au_mot(n)
            et = meme_ligne([self.t(n, 28).move_to(P(o.get_center()[0], 0))], -0.8)[0]
            self.play(FadeIn(o, scale=1.1), FadeIn(et), run_time=0.35)
        self.pause_defi(y=-1.6)  # au-dessus de Ti Margo

    def ecran_correction(self):
        self.ecran("07b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        fl = Arrow(P(-5.4, 1.9), P(3.0, 1.9), color=ORANGE_RETENUE, stroke_width=8, buff=0)
        e0 = self.t("plus léger", 28, LEGER).next_to(fl.get_start(), DOWN, buff=0.15).align_to(fl, LEFT)
        e1 = self.t("plus lourd", 28, LOURD).next_to(fl.get_end(), DOWN, buff=0.15).align_to(fl, RIGHT)
        self.play(GrowArrow(fl), FadeIn(e0), FadeIn(e1), run_time=0.5)
        Y = -0.6
        rang = [(fraise(1.6), "la fraise", -4.3, "La fraise"), (pomme(1.2), "la pomme", -1.4, "la pomme"),
                (pasteque(1.0), "la pastèque", 1.8, "la pastèque")]
        for k, (o, n, x, mot) in enumerate(rang):
            o.move_to(P(x, Y)).align_to(P(0, Y - 0.5), DOWN)
            self.au_mot(mot)
            num = self.t(str(k + 1), 44, JAUNE_TITRE).move_to(P(x, 0.75))
            hors_audit(num)
            et = meme_ligne([self.t(n, 30, VERT_OK).move_to(P(x, 0))], Y - 1.0)[0]
            self.play(FadeIn(o, shift=RIGHT * 0.3), FadeIn(num, scale=1.2), FadeIn(et), run_time=0.4)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.65)
        b = Balance(3.0, penche=-0.5, s=0.8)
        fig = VGroup(b, b.poser(chiot(0.45), "g"), b.poser(chien_moyen(0.45), "d"))
        lignes = self.finale_gauche(fig, textes=[
            ("Pour ranger des masses,", "on compare deux par deux."),
            ("Du plus léger", "au plus lourd.")], fs=36)
        self.add(fig)
        self.au_mot("Pour ranger des masses")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("Du plus léger au plus lourd")
        self.montrer_ligne(lignes[1])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_deux_par_deux()
        self.ecran_rang()
        self.ecran_question1()
        self.ecran_deviner()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")


class MasseEstimerCP(MasseEstimerCPBase):
    identite = "Maths CP — EleveAI"
    ceinture = "blanche"
