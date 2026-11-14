# contenance_estimer.py
# EleveAI — Maths CM1 — série « Contenance », épisode 03 : ESTIMER UNE CONTENANCE
# (micro contenance_estimer, notion contenance), AVEC VOIX. Paysage 16:9, CEINTURE JAUNE.
# Short jumeau : film Ti Margo (la piscine gonflable remplie au verre, réponse C).
# Décor et métier : Malik, POMPIER (centres : sciences, nature-ecologie).
# Mapping micro → écrans : 02 (les repères : cuillère 5 mL, verre 20 cL, bouteille 1 L, seau 10 L,
# baignoire ≈ 150 L), 03 (petit récipient : mL ou cL ; grand : L), 04 (la citerne ≈ 3000 L = 20 baignoires),
# 06 (piège : le nombre seul ne suffit pas), questions 05 (gourde, A) et 07 (baignoire, B),
# défi 08 (tasse, arrosoir, piscine gonflable : qui va avec quoi ?).
# Voix : manim/voix/cm1-contenance-estimer.json (validée le 14/11, Julie, débit −6) ;
# marques : contenance_estimer_marques.json (python manim/scripts/cm1/aire_marques.py contenance:estimer).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/contenance_estimer.py ContenanceEstimerCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/contenance_estimer.py ContenanceEstimerCM1 -o eleveai-maths-cm1-contenance-estimer --media_dir manim/scripts/cm1/media-contenance-03
# Sortie : manim/sorties/cm1/maths/contenance/03-estimer/eleveai-maths-cm1-contenance-estimer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from contenance_cm1_commun import *  # noqa: E402,F403

ROUGE_CAMION = "#dc2626"
METAL = "#cbd5e1"


def cuillere(s=1.0):
    """Une petite cuillère (vue de côté) : le creux et le manche."""
    creux = Ellipse(width=0.42, height=0.24, fill_color=EAU, fill_opacity=0.85, stroke_color=METAL, stroke_width=4)
    manche = Line(P(0.2, 0.02), P(0.95, 0.22), color=METAL, stroke_width=7)
    return VGroup(creux, manche).scale(s)


def verre(s=1.0, couleur=EAU):
    return recipient("verre", 0.85, 0.62, 0.8, couleur).scale(s)


def bouteille(s=1.0, couleur=EAU):
    return recipient("bouteille", 1.5, 0.62, 0.85, couleur).scale(s)


def seau(s=1.0, couleur=EAU):
    """Un seau : un verre large, et son anse."""
    r = recipient("verre", 1.0, 1.05, 0.8, couleur)
    anse = Arc(radius=0.5, start_angle=0, angle=PI, color=METAL, stroke_width=4).move_to(r.corps.get_top() + UP * 0.25)
    r.add(anse)
    return r.scale(s)


def baignoire(s=1.0, couleur=EAU):
    """Une baignoire : la cuve arrondie, l'eau, le rebord et deux pieds."""
    cuve = RoundedRectangle(width=2.6, height=0.95, corner_radius=0.35, fill_opacity=0, stroke_color=WHITE,
                            stroke_width=4)
    eau = Rectangle(width=2.35, height=0.55, fill_color=couleur, fill_opacity=0.85, stroke_width=0)
    eau.align_to(cuve, DOWN).shift(UP * 0.1)
    rebord = Line(P(-1.42, 0.47), P(1.42, 0.47), color=WHITE, stroke_width=7)
    pieds = VGroup(*[Circle(radius=0.09, fill_color=METAL, fill_opacity=1, stroke_width=0)
                     .move_to(P(x, -0.55)) for x in (-1.0, 1.0)])
    return VGroup(eau, cuve, rebord, pieds).scale(s)


def camion(s=1.0):
    """Le camion de pompier et sa grosse citerne (vue de côté)."""
    cab = RoundedRectangle(width=1.3, height=1.3, corner_radius=0.15, fill_color=ROUGE_CAMION, fill_opacity=1,
                           stroke_width=0).move_to(P(1.95, 0.05))
    vitre = Rectangle(width=0.55, height=0.45, fill_color="#bae6fd", fill_opacity=1, stroke_width=0).move_to(P(2.2, 0.3))
    chassis = Rectangle(width=4.3, height=0.3, fill_color="#7f1d1d", fill_opacity=1, stroke_width=0).move_to(P(0.6, -0.72))
    citerne = RoundedRectangle(width=3.0, height=1.25, corner_radius=0.55, fill_color=ROUGE_CAMION, fill_opacity=1,
                               stroke_color="#fca5a5", stroke_width=3).move_to(P(-0.25, 0.0))
    bande = Rectangle(width=2.8, height=0.14, fill_color=WHITE, fill_opacity=0.9, stroke_width=0).move_to(P(-0.25, -0.1))
    roues = VGroup(*[Circle(radius=0.3, fill_color="#111827", fill_opacity=1, stroke_color=METAL, stroke_width=3)
                     .move_to(P(x, -0.95)) for x in (-1.0, 0.3, 1.9)])
    g = VGroup(chassis, citerne, bande, cab, vitre, roues)
    g.citerne = citerne
    return g.scale(s)


def arrosoir(s=1.0):
    """Un arrosoir vert : le corps, le bec, l'anse."""
    corps = RoundedRectangle(width=1.0, height=1.0, corner_radius=0.12, fill_color="#16a34a", fill_opacity=1,
                             stroke_width=0)
    bec = Line(P(0.45, -0.2), P(1.15, 0.55), color="#16a34a", stroke_width=10)
    pomme = Circle(radius=0.12, fill_color="#15803d", fill_opacity=1, stroke_width=0).move_to(P(1.17, 0.57))
    anse = Arc(radius=0.4, start_angle=0, angle=PI, color="#16a34a", stroke_width=8).move_to(P(-0.1, 0.68))
    return VGroup(anse, bec, pomme, corps).scale(s)


def piscine(s=1.0):
    """Une piscine gonflable (vue en perspective) : un anneau rayé, l'eau dedans."""
    ext = Ellipse(width=3.0, height=1.2, fill_color="#f472b6", fill_opacity=1, stroke_color=WHITE, stroke_width=3)
    flanc = Rectangle(width=3.0, height=0.45, fill_color="#f472b6", fill_opacity=1, stroke_width=0).move_to(P(0, -0.22))
    bas = Ellipse(width=3.0, height=1.2, fill_color="#db2777", fill_opacity=1, stroke_width=0).move_to(P(0, -0.45))
    eau = Ellipse(width=2.4, height=0.82, fill_color=EAU, fill_opacity=0.95, stroke_width=0)
    return VGroup(bas, flanc, ext, eau).scale(s)


def gourde(s=1.0):
    return recipient("gourde", 1.3, 0.7, 0.85, "#a78bfa").scale(s)


class ContenanceEstimerBase(PaysageContenanceCM1):
    nom_voix = "cm1-contenance-estimer"
    fichier_marques = "contenance_estimer_marques.json"
    ceinture = "jaune"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Estimer une contenance", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Estimer une contenance")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q0 = self.t("Sans la mesurer :", 38, WHITE)
        q1 = self.bloc(["combien d'eau dans", "une citerne de pompier ?"], 38, JAUNE_TITRE)
        q = VGroup(q0, q1).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        c = camion(0.8).move_to(P(3.6, 0.4))
        self.au_mot("Sans la mesurer")
        self.play(FadeIn(q0, shift=UP * 0.2), FadeIn(c, shift=LEFT * 0.4), run_time=0.35)
        self.au_mot("combien d'eau")
        self.play(FadeIn(q1[0], shift=UP * 0.2), run_time=0.3)
        self.au_mot("citerne de pompier")
        self.play(FadeIn(q1[1], shift=UP * 0.2), Indicate(c.citerne, color=JAUNE_TITRE, scale_factor=1.05),
                  run_time=0.45)
        self.attendre_voix(marge=0.6)

    # ── 01 : Malik, pompier ─────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = malik(0.95).move_to(P(-5.2, 0.35))
        self.au_mot("Voici Malik")
        nom = self.t("Malik", 42, ROUGE_CAMION).next_to(pe, UP, buff=0.3)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("est pompier")
        met = self.t("pompier", 26, ROUGE_CAMION).next_to(pe, DOWN, buff=0.12)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        c = camion(0.85).move_to(P(-1.6, 0.1))
        self.au_mot("grosse citerne d'eau")
        self.play(FadeIn(c, shift=LEFT * 0.6), run_time=0.5)
        XP = 1.6
        l0 = self.t("Combien de litres ?", 36, JAUNE_TITRE)
        self.col(l0, 2.3, XP)
        self.au_mot("Combien de litres")
        self.play(FadeIn(l0, shift=UP * 0.1), Indicate(c.citerne, color=JAUNE_TITRE, scale_factor=1.04), run_time=0.4)
        props = [self.t(s, 40, WHITE) for s in ("30 L ?", "300 L ?", "3000 L ?")]
        for k, (p, mot) in enumerate(zip(props, ("dedans : 30", "litres, 300", "ou 3000"))):
            self.col(p, 1.35 - 0.8 * k, XP + 0.3)
            self.au_mot(mot)
            self.play(FadeIn(p, shift=UP * 0.1), run_time=0.25)
        self.au_mot("Pour estimer")
        rep = self.bloc(["Pour estimer :", "il faut des repères !"], 34, VERT_OK)
        self.col(rep, -1.75, XP)
        self.play(FadeIn(rep[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("il faut des repères")
        self.play(FadeIn(rep[1], shift=UP * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 02 : les repères ────────────────────────────────────────────────────
    def reperes(self):
        objs = [cuillere(1.3), verre(1.25), bouteille(1.15), seau(1.15), baignoire(1.05)]
        xs = [-5.5, -3.75, -2.15, -0.35, 2.75]
        for o, x in zip(objs, xs):
            o.move_to(P(x, 0)).align_to(P(0, -0.5), DOWN)
        objs[0].align_to(P(0, -0.45), DOWN)
        return objs

    def ecran_reperes(self):
        self.ecran("02-reperes")
        self.au_mot("Voici des repères")
        tit = self.t("Des repères à connaître :", 42, JAUNE_TITRE).move_to(P(0, 2.7))
        self.play(Write(tit), run_time=0.4)
        objs = self.reperes()
        noms = ["cuillère", "verre", "bouteille", "seau", "baignoire"]
        etis = ["5 mL", "20 cL", "1 L", "10 L", "≈ 150 L"]
        mots = [("petite cuillère", "cuillère : 5"), ("Un verre", "verre : 20"), ("Une bouteille", "bouteille : 1"),
                ("Un seau", "seau : 10"), ("Une baignoire", "environ 150")]
        for o, n, e, (m1, m2) in zip(objs, noms, etis, mots):
            nm = hors_audit(self.t(n, 24, GRAY_B)).next_to(o, UP, buff=0.25)
            self.au_mot(m1)
            self.play(FadeIn(o, shift=UP * 0.2), FadeIn(nm), run_time=0.25)
            self.au_mot(m2)
            self.play(FadeIn(contenance(o, e, 32, audit=True)), run_time=0.2)
        fl = Arrow(P(-5.9, -1.75), P(3.8, -1.75), color=GRAY_B, stroke_width=4, buff=0)
        pg = hors_audit(self.t("du plus petit au plus grand", 26, GRAY_B)).next_to(fl, DOWN, buff=0.12)
        self.play(GrowArrow(fl), FadeIn(pg), run_time=0.5)
        self.attendre_voix()

    # ── 03 : petit récipient, grand récipient ───────────────────────────────
    def ecran_unite(self):
        self.ecran("03-unite")
        petits = VGroup(cuillere(1.2), verre(1.2)).arrange(RIGHT, buff=0.5, aligned_edge=DOWN).move_to(P(-3.6, 0.9))
        grands = VGroup(seau(1.0), baignoire(0.85)).arrange(RIGHT, buff=0.4, aligned_edge=DOWN).move_to(P(2.2, 0.9))
        self.au_mot("petit récipient")
        l0 = self.t("Petit récipient :", 36, WHITE).move_to(P(-3.6, -0.6))
        self.play(FadeIn(petits, shift=UP * 0.2), FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        self.au_mot("en millilitres")
        u0 = self.t("mL", 60, VERT_OK).move_to(P(-4.85, -1.6))
        self.play(FadeIn(u0, scale=1.3), run_time=0.3)
        self.au_mot("ou en centilitres")
        ou = self.t("ou", 34, GRAY_B).move_to(P(-3.55, -1.6))
        u1 = self.t("cL", 60, VERT_OK).move_to(P(-2.35, -1.6))
        self.play(FadeIn(ou), FadeIn(u1, scale=1.3), run_time=0.3)
        self.au_mot("grand récipient")
        l1 = self.t("Grand récipient :", 36, WHITE).move_to(P(2.2, -0.6))
        self.play(FadeIn(grands, shift=UP * 0.2), FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        self.au_mot("en litres")
        u2 = self.t("L", 72, VERT_OK).move_to(P(2.2, -1.6))
        self.play(FadeIn(u2, scale=1.3), run_time=0.3)
        self.insister(u2, 1.25, 0.25)
        self.attendre_voix()

    # ── 04 : la citerne ─────────────────────────────────────────────────────
    def ecran_citerne(self):
        self.ecran("04-citerne")
        XP = 0.6
        c = camion(0.95).move_to(P(-3.6, 1.6))
        b = baignoire(0.55).move_to(P(-3.6, -0.15))
        self.add(c)
        l0 = self.bloc(["La citerne est bien plus", "grande qu'une baignoire."], 32)
        self.col(l0, 2.4, XP)
        self.au_mot("La citerne est bien plus")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("qu'une baignoire")
        self.play(FadeIn(l0[1], shift=UP * 0.1), FadeIn(b, shift=UP * 0.2), run_time=0.3)
        l1 = self.ligne([("30 L :", BLEU_D), ("3 seaux,", WHITE)], 38, buff=0.2)
        self.col(l1, 1.35, XP)
        l1b = self.t("bien trop peu !", 38, ROUGE_ERREUR)
        self.col(l1b, 0.75, XP)
        trois = VGroup(*[seau(0.42) for _ in range(3)]).arrange(RIGHT, buff=0.15).move_to(P(-3.6, -1.2))
        self.au_mot("baignoire. 30 litres")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("que 3 seaux")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(trois, lag_ratio=0.3), run_time=0.35)
        self.au_mot("bien trop peu")
        self.play(FadeIn(l1b, shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("Environ", WHITE), ("3000 L", VERT_OK)], 46, buff=0.25)
        self.col(l2, -0.15, XP)
        self.au_mot("environ 3000")
        self.play(FadeIn(l2, scale=1.15), FadeOut(trois), run_time=0.35)
        l3 = self.ligne([("autant que", WHITE), ("20 baignoires !", VERT_OK)], 38, buff=0.2)
        self.col(l3, -1.05, XP)
        vingt = VGroup(*[baignoire(0.2) for _ in range(20)]).arrange_in_grid(4, 5, buff=(0.12, 0.14))
        vingt.move_to(P(-3.6, -1.85))
        self.au_mot("autant que 20")
        self.play(FadeIn(l3, shift=UP * 0.1), FadeOut(b), FadeIn(vingt, lag_ratio=0.05), run_time=0.6)
        self.play(Indicate(c.citerne, color=VERT_OK, scale_factor=1.04), run_time=0.5)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = gourde(1.4).move_to(P(-3.8, 1.5))

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        self.question_gauche("05-question", "05b-reponse",
                             ["Quelle est la contenance", "d'une gourde d'élève ?"],
                             [self.choix("500 mL"), self.choix("50 L"), self.choix("5 mL")], 0,
                             ["Une gourde tient", "dans un cartable :", "environ 500 mL.", "50 L : 5 seaux !",
                              "5 mL : une cuillère."],
                             -0.75, sans_audit=(4,), mot_q="Quelle est la contenance", autres_q=autres_q)

    # ── 06 : le piège (le nombre seul ne suffit pas) ────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        l0 = self.bloc(["Le nombre seul ne suffit pas :", "regarde l'unité !"], 34, JAUNE_TITRE)
        l0.move_to(P(0, 2.0)).align_to(P(-6.2, 0), LEFT)
        self.au_mot("Le nombre seul")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("regarde l'unité")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.3)
        cu = cuillere(2.0).move_to(P(-3.6, 0.2))
        se = seau(1.6).move_to(P(2.2, 0.35))
        l1 = self.ligne([("10 L", BLEU_D), ("pour une cuillère :", WHITE)], 32, buff=0.18).move_to(P(-3.6, -1.3))
        r1 = self.t("impossible !", 40, ROUGE_ERREUR).move_to(P(-3.6, -2.1))
        self.au_mot("unité. 10 litres")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("pour une petite cuillère")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(cu, shift=UP * 0.2), run_time=0.3)
        self.au_mot("c'est impossible")
        croix = VGroup(Line(UL, DR), Line(UR, DL)).set_color(ROUGE_ERREUR).set_stroke(width=8).scale(0.6).move_to(cu)
        self.play(FadeIn(r1, scale=1.2), Create(croix), run_time=0.4)
        l2 = self.ligne([("10 L", BLEU_D), ("pour un seau :", WHITE)], 32, buff=0.18).move_to(P(2.2, -1.3))
        r2 = self.t("c'est juste !", 40, VERT_OK).move_to(P(2.2, -2.1))
        self.au_mot("Mais 10 litres")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("pour un seau")
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(se, shift=UP * 0.2), run_time=0.3)
        self.au_mot("c'est juste")
        self.play(FadeIn(r2, scale=1.2), Indicate(se, color=VERT_OK, scale_factor=1.06), run_time=0.4)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        b = baignoire(1.0).move_to(P(-3.8, 1.5))

        def autres_q(sc):
            sc.play(FadeIn(b), run_time=0.35)

        self.question_gauche("07-question", "07b-reponse",
                             ["Combien d'eau dans", "une baignoire pleine ?"],
                             [self.choix("15 cL"), self.choix("150 L"), self.choix("1500 L")], 1,
                             ["Baignoire : environ 150 L,", "à peu près 15 seaux.", "15 cL : moins qu'un verre !",
                              "1500 L : la moitié", "d'une citerne."],
                             -0.75, sans_audit=(2,), couper={3: ("1500 L :", "la moitié")}, mot_q="Combien d'eau",
                             autres_q=autres_q)

    # ── 08 : le défi (qui va avec quoi ?) ───────────────────────────────────
    XS = (-4.6, -1.4, 2.2)

    def trois(self):
        objs = [recipient("tasse", 1.0, 1.0, 0.8, EAU), arrosoir(1.3), piscine(1.15)]
        for o, x in zip(objs, self.XS):
            o.move_to(P(x, 1.0))
        objs[0].shift(DOWN * 0.15)
        return objs

    def etiquettes(self):
        return [hors_audit(self.t(s, 40, JAUNE_TITRE)) for s in ("10 L", "25 cL", "2000 L")]

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        objs = self.trois()
        noms = ["une tasse", "un arrosoir", "une piscine gonflable"]
        for o, n in zip(objs, noms):
            nm = hors_audit(self.t(n, 26, GRAY_B)).next_to(o, DOWN, buff=0.3)
            o.nom = nm
            self.au_mot(n)
            self.play(FadeIn(o, shift=UP * 0.2), FadeIn(nm), run_time=0.25)
        ets = [self.t(s, 40, JAUNE_TITRE) for s in ("10 L", "25 cL", "2000 L")]
        boites = VGroup(*[VGroup(SurroundingRectangle(e, color=JAUNE_TITRE, buff=0.15, corner_radius=0.1), e)
                          for e in ets]).arrange(RIGHT, buff=0.8).move_to(P(-1.2, -1.15))
        for b, mot in zip(boites, ("contenances : 10", "litres, 25", "et 2000")):
            self.au_mot(mot)
            self.play(FadeIn(b, shift=UP * 0.15), run_time=0.25)
        self.au_mot("Qui va avec quoi")
        q = self.t("Qui va avec quoi ?", 40, JAUNE_TITRE).move_to(P(-1.2, -2.1))
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(boites), run_time=0.5)
        self.pause_defi(y=-2.85)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        objs = self.trois()
        self.add(*objs)
        raisons = [(("un peu plus", "qu'un verre"), "un peu plus", "verre : 25", "25 cL"),
                   (("comme un seau",), "comme un seau", "seau : 10", "10 L"),
                   (("plus de 10", "baignoires"), "plus de 10 baignoires", "baignoires : 2000", "2000 L")]
        mots = ["La tasse", "L'arrosoir", "La piscine gonflable"]
        for o, m, (rai, mot_r, mot_n, s) in zip(objs, mots, raisons):
            self.au_mot(m)
            self.play(Indicate(o, color=JAUNE_TITRE, scale_factor=1.06), run_time=0.25)
            r = self.bloc(list(rai), 26, GRAY_B).next_to(o, DOWN, buff=0.3)
            r.set_x(o.get_x())
            self.au_mot(mot_r)
            self.play(FadeIn(r, shift=UP * 0.1), run_time=0.25)
            self.au_mot(mot_n)
            e = self.t(s, 44, VERT_OK).next_to(r, DOWN, buff=0.25)
            self.play(FadeIn(e, scale=1.3), run_time=0.3)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        fig = VGroup(cuillere(1.2), verre(1.0), bouteille(0.9), seau(0.9)).arrange(RIGHT, buff=0.25,
                                                                                    aligned_edge=DOWN)
        fig.scale_to_fit_width(3.3)
        lignes = self.finale_gauche(fig, textes=[
            ("Pour estimer : on compare", "à des repères."),
            ("Petit récipient :", "mL ou cL."),
            ("Grand récipient :", "L.")], fs=32)
        self.add(fig)
        self.au_mot("Pour estimer")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("Petit récipient")
        self.montrer_ligne(lignes[1])
        self.au_mot("Grand récipient")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_reperes()
        self.ecran_unite()
        self.ecran_citerne()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class ContenanceEstimerCM1(ContenanceEstimerBase):
    identite = "Maths CM1 — EleveAI"
    ceinture = "jaune"
