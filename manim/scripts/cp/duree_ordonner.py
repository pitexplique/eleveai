# duree_ordonner.py
# EleveAI — Maths CP — série « Durées » (CP → 6e) : RANGER LES MOMENTS DE LA JOURNÉE (ordonner)
# (micro cp_duree_ordonner, notion duree), AVEC VOIX. Paysage 16:9, CEINTURE BLANCHE.
# Décor et métier : Inaya, ASTRONAUTE (dans sa fusée, elle range ses activités dans l'ordre).
# Mapping micro → écrans : 02 (toujours le même ordre : matin, midi, après-midi, soir), 03 (dans le même matin,
# la plus petite heure d'abord), 04 (les heures se suivent comme les nombres), 06 (piège : on ne range pas au hasard),
# questions 05 (7 heures avant 9 heures, B) et 07 (se lever, déjeuner, se coucher, A), défi 08 (après 5 heures : 6 heures).
# Voix : manim/voix/cp-duree-ordonner.json (validée le 17/11, Julie, débit −6) ;
# marques : duree_ordonner_marques.json (python manim/scripts/cp/duree_marques.py ordonner).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cp/duree_ordonner.py DureeOrdonnerCP
# python -m manim render -qh --disable_caching manim/scripts/cp/duree_ordonner.py DureeOrdonnerCP -o eleveai-maths-cp-duree-ordonner --media_dir manim/scripts/cp/media-duree-ordonner
# Sortie : manim/sorties/cp/maths/duree/04-ordonner/eleveai-maths-cp-duree-ordonner.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from duree_cp_commun import *  # noqa: E402,F403

JOUR = "#7dd3fc"
SOIR = "#a5b4fc"
MIDI = "#facc15"
APM = "#fb923c"


def carte(w, h, couleur, op=0.22):
    return RoundedRectangle(width=w, height=h, corner_radius=0.2, fill_color=couleur, fill_opacity=op,
                            stroke_color=couleur, stroke_width=3)


def fusee(s=1.0):
    """La fusée : un corps blanc, un hublot, un nez rouge, deux ailerons, une flamme."""
    corps = RoundedRectangle(width=0.9, height=2.0, corner_radius=0.35, fill_color="#f1f5f9", fill_opacity=1,
                             stroke_width=0)
    nez = Polygon(P(-0.45, 0.85), P(0.45, 0.85), P(0, 1.65), fill_color="#ef4444", fill_opacity=1, stroke_width=0)
    hub = Circle(radius=0.22, fill_color="#38bdf8", fill_opacity=1, stroke_color="#64748b", stroke_width=5).move_to(P(0, 0.3))
    ail = VGroup(Polygon(P(-0.45, -0.4), P(-0.85, -1.1), P(-0.45, -0.9)),
                 Polygon(P(0.45, -0.4), P(0.85, -1.1), P(0.45, -0.9))).set_fill("#ef4444", 1).set_stroke(width=0)
    flamme = Polygon(P(-0.25, -1.0), P(0.25, -1.0), P(0, -1.6), fill_color="#fb923c", fill_opacity=1, stroke_width=0)
    return VGroup(flamme, ail, corps, nez, hub).scale(s)


def terre(s=1.0):
    """La Terre vue de l'espace : un disque bleu et deux continents verts."""
    d = Circle(radius=0.6, fill_color="#2563eb", fill_opacity=1, stroke_color="#93c5fd", stroke_width=3)
    c1 = Ellipse(width=0.5, height=0.35, fill_color="#22c55e", fill_opacity=1, stroke_width=0).move_to(P(-0.18, 0.2))
    c2 = Ellipse(width=0.4, height=0.5, fill_color="#22c55e", fill_opacity=1, stroke_width=0).move_to(P(0.22, -0.2))
    return VGroup(d, c1, c2).scale(s)


def bande(fs=34, w=0.82):
    """La bande des heures 1 à 12, hors audit (ses nombres ne sont pas tous dits) ; bande.cases[n] = la case de n."""
    g = VGroup()
    cases = {}
    for n in range(1, 13):
        c = RoundedRectangle(width=w, height=w, corner_radius=0.1, fill_color="#1e293b", fill_opacity=1,
                             stroke_color="#94a3b8", stroke_width=3)
        t = Text(str(n), font_size=fs, color=WHITE).move_to(c)
        case = VGroup(c, t)
        cases[n] = case
        g.add(case)
    g.arrange(RIGHT, buff=0.12)
    g.cases = cases
    return hors_audit(g)


class DureeOrdonnerBase(PaysageDureeCP):
    nom_voix = "cp-duree-ordonner"
    fichier_marques = "duree_ordonner_marques.json"
    ceinture = "blanche"

    def allume(self, b, n, couleur=JAUNE_TITRE):
        c = b.cases[n][0]
        return c.animate.set_stroke(couleur, width=7).set_fill(couleur, 0.35)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Ranger les moments de la journée", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Ranger")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q0 = self.t("Qui vient en premier :", 38)
        q1 = self.ligne([("8 heures", JAUNE_TITRE), ("ou", WHITE), ("10 heures ?", JAUNE_TITRE)], 38, buff=0.2)
        q = VGroup(q0, q1).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        h8 = hl(0.75, 8, 0).move_to(P(3.3, 0.35))
        h10 = hl(0.75, 10, 0).move_to(P(5.3, 0.35))
        self.au_mot("Qui vient")
        self.play(FadeIn(q0, shift=UP * 0.2), run_time=0.4)
        self.au_mot("8 heures")
        self.play(FadeIn(q1[0], scale=1.2), FadeIn(h8, scale=0.8), run_time=0.4)
        self.au_mot("ou 10")
        self.play(FadeIn(q1[1:], scale=1.1), FadeIn(h10, scale=0.8), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 01 : Inaya, astronaute ──────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = inaya(0.95).move_to(P(-4.85, -0.2))
        self.au_mot("Voici Inaya")
        nom = self.t("Inaya", 42, JAUNE_TITRE).next_to(pe, UP, buff=0.75)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Elle est astronaute")
        met = self.t("astronaute", 28, JAUNE_TITRE).next_to(pe, DOWN, buff=0.12)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        XL = -2.9
        fu = fusee(1.05).move_to(P(3.6, -1.1))
        etoiles = hors_audit(VGroup(*[Star(5, outer_radius=0.08, inner_radius=0.035, fill_color="#fef9c3", fill_opacity=1,
                                           stroke_width=0).move_to(P(x, y))
                                      for x, y in ((1.2, -0.3), (5.6, 0.2), (1.9, -2.6), (5.3, -2.4), (2.4, 0.4))]))
        l0 = gauche(self.t("Dans sa fusée,", 36), XL, 2.95)
        l1 = gauche(self.t("elle suit un programme.", 36), XL, 2.35)
        self.au_mot("Dans sa fusée")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(fu, shift=UP * 0.4), FadeIn(etoiles), run_time=0.45)
        self.au_mot("elle suit")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        l2 = gauche(self.ligne([("Elle range ses activités", WHITE), ("dans l'ordre.", JAUNE_TITRE)], 36, buff=0.2),
                    XL, 1.45)
        self.au_mot("Elle range")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("dans l'ordre")
        self.play(FadeIn(l2[1], scale=1.15), fu.animate.shift(UP * 0.25), run_time=0.45)
        self.attendre_voix()

    # ── 02 : toujours le même ordre ─────────────────────────────────────────
    def ecran_ordre(self):
        self.ecran("02-ordre")
        tit = self.t("Toujours le même ordre", 46, JAUNE_TITRE).move_to(P(0, 3.15))
        self.au_mot("Une journée")
        self.play(FadeIn(tit, shift=UP * 0.15), run_time=0.35)
        moments = [("Le matin", JOUR, soleil(0.55), None, "le matin"),
                   ("Midi", MIDI, soleil(0.55), assiette(0.6), "Puis midi"),
                   ("L'après-midi", APM, soleil(0.55), gouter(0.75), "Puis l'après-midi"),
                   ("Le soir", SOIR, lune(0.8), lit(0.6), "enfin le soir")]
        prec = None
        for k, (nom, coul, astre, dessin, mot) in enumerate(moments):
            x = -4.8 + 3.2 * k
            c = carte(2.6, 3.3, coul).move_to(P(x, 0.2))
            n = self.t(nom, 28, coul).move_to(P(x, 1.45))
            astre.move_to(P(x, 0.55))
            g = VGroup(c, n, astre)
            if dessin is not None:
                g.add(dessin.move_to(P(x, -0.6)))
            num = self.t(str(k + 1), 34, coul)
            rond = Circle(radius=0.3, stroke_color=coul, stroke_width=4).move_to(P(x, -1.95))
            num.move_to(rond)
            g.add(hors_audit(VGroup(rond, num)))
            anims = [FadeIn(g, shift=RIGHT * 0.3)]
            if prec is not None:
                anims.append(GrowArrow(Arrow(P(x - 3.2 + 1.3, 0.2), P(x - 1.3, 0.2), buff=0.02, color=WHITE,
                                             stroke_width=6, max_tip_length_to_length_ratio=0.45)))
            self.au_mot(mot)
            self.play(*anims, run_time=0.45)
            prec = g
        self.attendre_voix()

    # ── 03 : dans le même matin, la plus petite heure d'abord ───────────────
    def ecran_comparer(self):
        self.ecran("03-comparer")
        tit = self.t("Dans le même matin", 46, JOUR).move_to(P(0, 3.15))
        self.au_mot("Dans le même matin")
        self.play(FadeIn(tit, shift=UP * 0.15), run_time=0.35)
        so = soleil(0.55).move_to(P(4.4, 3.1))
        self.play(FadeIn(so, scale=0.6), run_time=0.3)
        h8 = hl(1.1, 8, 0).move_to(P(-3.0, 0.75))
        h10 = hl(1.1, 10, 0).move_to(P(3.0, 0.75))
        e8 = self.t("8 heures", 40, JAUNE_TITRE).next_to(h8, DOWN, buff=0.25)
        e10 = self.t("10 heures", 40, JAUNE_TITRE).next_to(h10, DOWN, buff=0.25)
        fl = Arrow(P(-1.6, 0.75), P(1.6, 0.75), buff=0, color=VERT_OK, stroke_width=8)
        av = self.t("avant", 36, VERT_OK).next_to(fl, UP, buff=0.15)
        self.au_mot("8 heures vient")
        self.play(FadeIn(h8, scale=0.85), FadeIn(e8, shift=UP * 0.1), run_time=0.4)
        self.au_mot("avant")
        self.play(GrowArrow(fl), FadeIn(av), run_time=0.4)
        self.au_mot("10 heures")
        self.play(FadeIn(h10, scale=0.85), FadeIn(e10, shift=UP * 0.1), run_time=0.4)
        l0 = self.ligne([("La plus petite heure", WHITE), ("arrive en premier.", VERT_OK)], 38, buff=0.2).move_to(P(-0.3, -2.25))
        self.au_mot("La plus petite")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("arrive en premier")
        self.play(FadeIn(l0[1], scale=1.1), Circumscribe(VGroup(h8, e8), color=VERT_OK, buff=0.1), run_time=0.6)
        self.attendre_voix()

    # ── 04 : les heures se suivent comme les nombres ────────────────────────
    def ecran_suivante(self):
        self.ecran("04-suivante")
        tit = self.t("Les heures se suivent", 46, JAUNE_TITRE).move_to(P(0, 3.15))
        b = bande().move_to(P(-0.3, 1.6))
        self.au_mot("Les heures se suivent")
        self.play(FadeIn(tit, shift=UP * 0.15), run_time=0.35)
        self.au_mot("comme les nombres")
        self.play(LaggedStart(*[FadeIn(c, shift=UP * 0.15) for c in b], lag_ratio=0.08), run_time=0.9)
        XL = -5.0
        l0 = gauche(self.ligne([("Après 3 heures", WHITE), ("vient 4 heures.", VERT_OK)], 40, buff=0.2), XL, 0.05)
        l1 = gauche(self.ligne([("Avant 3 heures,", WHITE), ("il y a 2 heures.", AIG_H)], 40, buff=0.2), XL, -1.25)
        self.au_mot("Après 3 heures")
        self.play(FadeIn(l0[0], shift=UP * 0.1), self.allume(b, 3), run_time=0.4)
        f4 = CurvedArrow(b.cases[3].get_top() + UP * 0.05, b.cases[4].get_top() + UP * 0.05, angle=-PI / 2,
                         color=VERT_OK, stroke_width=5)
        self.au_mot("vient 4 heures")
        self.play(FadeIn(l0[1], scale=1.15), Create(f4), self.allume(b, 4, VERT_OK), run_time=0.45)
        self.au_mot("Avant 3 heures")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.35)
        f2 = CurvedArrow(b.cases[3].get_bottom() + DOWN * 0.05, b.cases[2].get_bottom() + DOWN * 0.05, angle=-PI / 2,
                         color=AIG_H, stroke_width=5)
        self.au_mot("il y a 2 heures")
        self.play(FadeIn(l1[1], scale=1.15), Create(f2), self.allume(b, 2, AIG_H), run_time=0.45)
        self.attendre_voix()

    # ── 05 / 07 : questions ─────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        h7 = hl(0.9, 7, 0).move_to(P(-5.0, 1.45))
        h9 = hl(0.9, 9, 0).move_to(P(-2.75, 1.45))
        so = soleil(0.45).move_to(P(-3.9, 2.85))
        self.add(h7, h9, so)
        rond = Circle(radius=1.08, stroke_color=VERT_OK, stroke_width=7).move_to(h7.centre())

        def autres_r(sc):
            sc.rep(0, avec=[Create(rond)])
            sc.rep_fin()

        self.question_gauche("05-question", "05b-reponse",
                             ["Inaya mange à 7 heures.", "Du sport à 9 heures.", "Que fait-elle en premier ?"],
                             [self.choix(x) for x in ["le sport", "manger", "les deux en même temps"]], 1,
                             ["7 heures vient avant 9 heures.", "Inaya mange d'abord."], -0.75, mot_q="Inaya mange",
                             autres_r=autres_r)

    # ── 06 : le piège (on ne range pas au hasard) ───────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = gauche(self.t("Attention au piège !", 46, ROUGE_ERREUR), -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        l0 = gauche(self.t("On ne range pas au hasard.", 38), -6.2, 2.1)
        self.au_mot("On ne range pas")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        y = 0.45
        so = soleil(0.6).move_to(P(-5.2, y))
        lu = lune(0.85).move_to(P(3.2, y))
        fl = Arrow(P(-4.4, y), P(2.4, y), buff=0, color=WHITE, stroke_width=8)
        er = self.t("le réveil", 30, JOUR).next_to(so, DOWN, buff=0.25)
        es = self.t("le soir", 30, SOIR).next_to(lu, DOWN, buff=0.25)
        self.au_mot("On part du réveil")
        self.play(FadeIn(so, scale=0.6), FadeIn(er), run_time=0.4)
        self.au_mot("et on avance")
        self.play(GrowArrow(fl), run_time=0.8)
        self.au_mot("jusqu'au soir")
        self.play(FadeIn(lu, scale=0.6), FadeIn(es), run_time=0.4)
        li = lit(0.9).move_to(P(4.9, y))
        l1 = gauche(self.ligne([("Se coucher vient toujours", WHITE), ("à la fin.", SOIR)], 38, buff=0.2), -6.2, -1.7)
        self.au_mot("Se coucher")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(li, shift=LEFT * 0.3), run_time=0.4)
        self.au_mot("à la fin")
        self.play(FadeIn(l1[1], scale=1.15), Circumscribe(li, color=SOIR, buff=0.12), run_time=0.6)
        self.attendre_voix()

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        icones = [soleil(0.55), assiette(0.7), lit(0.8)]
        ronds = VGroup()
        for k, ic in enumerate(icones):
            x = -5.3 + 1.6 * k
            ic.move_to(P(x, 2.2))
            ronds.add(Circle(radius=0.62, stroke_color=[JOUR, MIDI, SOIR][k], stroke_width=4).move_to(P(x, 2.2)))
        fl = VGroup(*[Arrow(P(-5.3 + 1.6 * k + 0.6, 2.2), P(-5.3 + 1.6 * (k + 1) - 0.6, 2.2), buff=0, color=VERT_OK,
                            stroke_width=5, max_tip_length_to_length_ratio=0.5) for k in range(2)])
        self.add(*icones)

        def autres_r(sc):
            sc.rep(0, avec=[Create(ronds[0])])
            sc.rep(1, avec=[Create(ronds[1]), GrowArrow(fl[0])])
            sc.rep(2, avec=[Create(ronds[2]), GrowArrow(fl[1])])
            sc.rep_fin()

        xl0 = self.XL
        self.XL = -1.3   # des choix longs (3 activités) : une colonne plus large, sinon ils sont écrits trop petit
        try:
            self._question2(autres_r)
        finally:
            self.XL = xl0

    def _question2(self, autres_r):
        self.question_gauche("07-question", "07b-reponse", ["Quel est le bon ordre ?"],
                             [self.choix(x) for x in ["se lever, déjeuner, se coucher", "se coucher, se lever, déjeuner",
                                                      "déjeuner, se lever, se coucher"]], 0,
                             ["Le matin, on se lève.", "À midi, on déjeune.", "Le soir, on se couche."], -1.55,
                             mot_q="Quel est", autres_r=autres_r)

    # ── 08 : le défi (juste après 5 heures) ─────────────────────────────────
    def pause_gauche(self, y=-2.75, marge=2.0):
        self.au_mot("Mets pause")
        p = gauche(self.t("Mets pause, et cherche !", 36, ORANGE_RETENUE), -6.2, y)
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=marge)

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        XL = -6.2
        pe = inaya(0.8).move_to(P(2.2, -1.0))
        te = terre(1.0).move_to(P(4.6, 1.3))
        hg = hl(0.85, 5, 0).move_to(P(4.6, -1.3))
        l0 = gauche(self.ligne([("Inaya regarde la Terre", WHITE), ("à 5 heures.", JAUNE_TITRE)], 38, buff=0.2), XL, 1.95)
        self.au_mot("Inaya regarde")
        self.play(FadeIn(l0[0], shift=UP * 0.1), FadeIn(pe, shift=UP * 0.3), FadeIn(te, scale=0.8), run_time=0.45)
        self.au_mot("à 5 heures")
        self.play(FadeIn(l0[1], scale=1.2), FadeIn(hg, scale=0.85), run_time=0.4)
        q0 = gauche(self.t("Quelle heure vient", 40, JAUNE_TITRE), XL, 0.75)
        q1 = gauche(self.t("juste après ?", 40, JAUNE_TITRE), XL, 0.05)
        self.au_mot("Quelle heure")
        self.play(FadeIn(q0, shift=UP * 0.15), run_time=0.4)
        self.au_mot("juste après")
        self.play(FadeIn(q1, shift=UP * 0.15), Rotate(te, -PI / 6), run_time=0.5)
        self.pause_gauche(y=-1.2)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        b = bande().move_to(P(-0.3, 1.75))
        self.play(FadeIn(b), run_time=0.4)
        l0 = gauche(self.t("Les heures se suivent comme les nombres.", 36), -6.2, 0.5)
        self.au_mot("Les heures se suivent")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        l1 = gauche(self.ligne([("Après 5", WHITE), ("vient 6.", VERT_OK)], 42, buff=0.2), -6.2, -0.5)
        self.au_mot("Après 5")
        self.play(FadeIn(l1[0], shift=UP * 0.1), self.allume(b, 5), run_time=0.4)
        f6 = CurvedArrow(b.cases[5].get_top() + UP * 0.05, b.cases[6].get_top() + UP * 0.05, angle=-PI / 2,
                         color=VERT_OK, stroke_width=5)
        self.au_mot("vient 6")
        self.play(FadeIn(l1[1], scale=1.15), Create(f6), self.allume(b, 6, VERT_OK), run_time=0.45)
        hg = hl(0.95, 6, 0).move_to(P(3.9, -1.2))
        l2 = gauche(self.ligne([("C'est", WHITE), ("6 heures.", VERT_OK)], 46, buff=0.2), -6.2, -1.6)
        self.au_mot("C'est 6 heures")
        self.play(FadeIn(l2, scale=1.15), FadeIn(hg, scale=0.85), run_time=0.45)
        self.insister(l2[1], 1.15, 0.22)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        so = soleil(0.7).move_to(P(-0.9, 0.7))
        lu = lune(1.0).move_to(P(0.9, -0.7))
        fl = CurvedArrow(P(-0.3, 0.9), P(0.75, -0.1), angle=-PI / 3, color=WHITE, stroke_width=5)
        fig = hors_audit(VGroup(so, fl, lu))
        lignes = self.finale_gauche(fig, textes=[
            ("La journée va", "du matin au soir."),
            ("Dans le même matin, la plus", "petite heure vient d'abord."),
            ("Après une heure", "vient la suivante.")], fs=34, x_fig=-4.6, xl=-2.0)
        self.add(fig)
        self.au_mot("La journée va")
        self.montrer_ligne(lignes[0], Indicate(fl, color=JAUNE_TITRE))
        self.au_mot("Dans le même matin")
        self.montrer_ligne(lignes[1], Indicate(so, color=JAUNE_TITRE, scale_factor=1.15))
        self.au_mot("Après une heure")
        self.montrer_ligne(lignes[2], Circumscribe(fig, color=VERT_OK, shape=Circle, buff=0.1))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_ordre()
        self.ecran_comparer()
        self.ecran_suivante()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class DureeOrdonnerCP(DureeOrdonnerBase):
    identite = "Maths CP — EleveAI"
    ceinture = "blanche"
