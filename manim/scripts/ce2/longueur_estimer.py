# longueur_estimer.py
# EleveAI — Maths CE2 — série « Longueurs », épisode 06 : ESTIMER UNE LONGUEUR
# (micro ce2_longueur_estimer, notion longueur), AVEC VOIX. Paysage 16:9, CEINTURE JAUNE.
# Short jumeau : film Ti Margo (le mur mesuré à la queue, réponse C).
# Décor et métier : Élodie, PAYSAGISTE (centre : nature-ecologie) : l'allée, la porte, l'arbre, le banc.
# Mapping micro → écrans : 02 (repères : doigt ≈ 1 cm, main ≈ 1 dm, grand pas ≈ 1 m), 03 (6 grands pas ≈ 6 m),
# 04 (porte ≈ 2 m, un quart d'heure de marche ≈ 1 km), 06 (piège : un doigt de 1 m ? impossible),
# questions 05 (la feuille grande comme une main : A, 1 dm) et 07 (l'arbre deux fois une porte : B, 4 m),
# défi 08 (le banc de 10 mains ≈ 1 m).
# Voix : manim/voix/ce2-longueur-estimer.json (validée le 14/11, Julie, débit −6) ;
# marques : longueur_estimer_marques.json (python manim/scripts/ce2/perimetre_marques.py longueur:estimer).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/longueur_estimer.py LongueurEstimerCE2
# python -m manim render -qh --disable_caching manim/scripts/ce2/longueur_estimer.py LongueurEstimerCE2 -o eleveai-maths-ce2-longueur-estimer --media_dir manim/scripts/ce2/media-lg-06
# Sortie : manim/sorties/ce2/maths/longueur/06-estimer/eleveai-maths-ce2-longueur-estimer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from longueur_ce2_commun import *  # noqa: E402,F403

PEAU = "#e0ac69"
FEUILLE = "#22c55e"
HERBE = "#166534"
ALLEE = "#d6c29a"
TERRE = "#78350f"


def doigt(s=1.0, couleur=PEAU):
    """Un doigt levé (vu de face) : sa LARGEUR, environ 1 cm."""
    d = RoundedRectangle(width=0.32 * s, height=1.0 * s, corner_radius=0.15 * s, fill_color=couleur,
                         fill_opacity=1, stroke_width=0)
    ongle = RoundedRectangle(width=0.2 * s, height=0.22 * s, corner_radius=0.08 * s, fill_color="#fde4cf",
                             fill_opacity=1, stroke_width=0).move_to(d.get_top() + DOWN * 0.17 * s)
    return VGroup(d, ongle)


def main(s=1.0, couleur=PEAU):
    """Une main à plat, doigts serrés vers le haut : sa LARGEUR, environ 1 dm."""
    paume = RoundedRectangle(width=1.0 * s, height=0.9 * s, corner_radius=0.18 * s, fill_color=couleur,
                             fill_opacity=1, stroke_width=0)
    doigts = VGroup(*[RoundedRectangle(width=0.23 * s, height=h * s, corner_radius=0.1 * s, fill_color=couleur,
                                       fill_opacity=1, stroke_width=0)
                      for h in (0.62, 0.78, 0.74, 0.55)]).arrange(RIGHT, buff=0.02 * s, aligned_edge=DOWN)
    doigts.next_to(paume, UP, buff=-0.12 * s)
    pouce = RoundedRectangle(width=0.22 * s, height=0.55 * s, corner_radius=0.1 * s, fill_color=couleur,
                             fill_opacity=1, stroke_width=0).rotate(0.7).move_to(paume.get_left() + P(-0.05 * s,
                                                                                                    0.05 * s))
    plis = VGroup(*[Line(P(-0.3 * s, y * s), P(0.3 * s, y * s), color="#b07a45", stroke_width=1.5)
                    for y in (-0.1, 0.12)]).move_to(paume)
    return VGroup(pouce, doigts, paume, plis)


def empreinte(s=1.0, couleur="#a8a29e"):
    """Une empreinte de chaussure (vue de dessus, pointe vers la droite)."""
    a = Ellipse(width=0.5 * s, height=0.24 * s, fill_color=couleur, fill_opacity=1, stroke_width=0)
    t = Ellipse(width=0.24 * s, height=0.2 * s, fill_color=couleur, fill_opacity=1, stroke_width=0)
    t.next_to(a, LEFT, buff=0.03 * s)
    return VGroup(a, t)


def grand_pas(L=2.0):
    """Deux empreintes à un grand pas l'une de l'autre, et la flèche du pas."""
    e1 = empreinte().move_to(P(-L / 2 + 0.25, -0.18))
    e2 = empreinte().move_to(P(L / 2 - 0.25, 0.18))
    f = fleche_double(P(-L / 2, -0.55), P(L / 2, -0.55), JAUNE_TITRE, sw=3)
    return VGroup(e1, e2, f)


def feuille(L=1.2, couleur=FEUILLE):
    f = Ellipse(width=L, height=L * 0.45, fill_color=couleur, fill_opacity=1, stroke_width=0)
    ner = Line(P(-L * 0.62, 0), P(L * 0.45, 0), color="#14532d", stroke_width=3)
    return VGroup(f, ner)


def arbre(h=3.0):
    tronc = Rectangle(width=h * 0.1, height=h * 0.4, fill_color=TERRE, fill_opacity=1, stroke_width=0)
    tronc.move_to(P(0, -h * 0.3))
    houp = VGroup(*[Circle(radius=h * r, fill_color=c, fill_opacity=1, stroke_width=0).move_to(P(dx * h, dy * h))
                    for r, dx, dy, c in ((0.2, 0, 0.22, "#15803d"), (0.16, -0.14, 0.1, "#16a34a"),
                                         (0.16, 0.14, 0.1, "#16a34a"), (0.14, 0, 0.05, "#22c55e"))])
    return VGroup(tronc, houp)


def fleur(s=1.0, c="#f472b6"):
    tige = Line(P(0, -0.25 * s), P(0, 0.1 * s), color="#16a34a", stroke_width=3)
    pet = VGroup(*[Circle(radius=0.07 * s, fill_color=c, fill_opacity=1, stroke_width=0)
                   .move_to(P(0.08 * s * np.cos(a), 0.16 * s + 0.08 * s * np.sin(a)))
                   for a in np.linspace(0, TAU, 6)[:-1]])
    return VGroup(tige, pet, Dot(P(0, 0.16 * s), radius=0.05 * s, color="#facc15"))


def jardin(s=1.0):
    pel = Rectangle(width=3.0 * s, height=0.3 * s, fill_color=HERBE, fill_opacity=1, stroke_width=0)
    fl = VGroup(*[fleur(s, c) for c in ("#f472b6", "#facc15", "#a78bfa", "#fb7185")]).arrange(RIGHT,
                                                                                              buff=0.35 * s)
    fl.next_to(pel, UP, buff=-0.05)
    ar = arbre(1.6 * s).next_to(pel, UP, buff=-0.05).align_to(pel, RIGHT).shift(LEFT * 0.1 * s)
    fl.align_to(pel, LEFT).shift(RIGHT * 0.15 * s)
    return VGroup(pel, ar, fl)


def allee(L=9.0, h=0.9):
    sol = Rectangle(width=L, height=h, fill_color=ALLEE, fill_opacity=1, stroke_width=0)
    bords = VGroup(*[Rectangle(width=L, height=0.18, fill_color=HERBE, fill_opacity=1, stroke_width=0)
                     .next_to(sol, d, buff=0) for d in (UP, DOWN)])
    return VGroup(sol, bords)


def banc(L=4.0):
    ass = Rectangle(width=L, height=0.22, fill_color=BOIS_CLAIR, fill_opacity=1, stroke_color=BOIS_FONCE,
                    stroke_width=2)
    dos = ass.copy().shift(UP * 0.55)
    pieds = VGroup(*[Rectangle(width=0.14, height=0.55, fill_color=BOIS_FONCE, fill_opacity=1, stroke_width=0)
                     .next_to(ass, DOWN, buff=0).shift(RIGHT * dx * L) for dx in (-0.4, 0.4)])
    mont = VGroup(*[Rectangle(width=0.12, height=0.55, fill_color=BOIS_FONCE, fill_opacity=1, stroke_width=0)
                    .move_to(ass.get_center() + P(dx * L, 0.3)) for dx in (-0.4, 0.4)])
    return VGroup(mont, dos, ass, pieds)


def mini_ruban(s=1.0):
    """Le boîtier du mètre ruban, avec un bout de ruban."""
    bo = RoundedRectangle(width=0.9 * s, height=0.8 * s, corner_radius=0.2 * s, fill_color="#eab308",
                          fill_opacity=1, stroke_color="#a16207", stroke_width=3)
    c = Circle(radius=0.22 * s, color="#a16207", stroke_width=3).move_to(bo)
    r = Rectangle(width=0.9 * s, height=0.16 * s, fill_color="#fde047", fill_opacity=1, stroke_width=0)
    r.next_to(bo, RIGHT, buff=0).align_to(bo, DOWN).shift(UP * 0.05 * s)
    return VGroup(r, bo, c)


def croix(m, couleur=ROUGE_ERREUR, sw=8):
    return VGroup(Line(m.get_corner(UL), m.get_corner(DR), color=couleur, stroke_width=sw),
                  Line(m.get_corner(DL), m.get_corner(UR), color=couleur, stroke_width=sw))


class LongueurEstimerBase(PaysageLongueurCE2):
    nom_voix = "ce2-longueur-estimer"
    fichier_marques = "longueur_estimer_marques.json"
    ceinture = "jaune"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Estimer une longueur", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Estimer une longueur")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Comment trouver", "sans règle ?"], 40, JAUNE_TITRE, buff=0.22)
        q.move_to(P(0, 0.4)).align_to(P(-6.2, 0), LEFT)
        m = main(1.3).move_to(P(2.2, 0.6))
        pa = grand_pas(2.0).move_to(P(4.4, 0.5))
        self.au_mot("Comment trouver sans règle")
        self.play(FadeIn(q, shift=UP * 0.2), FadeIn(m, shift=UP * 0.3), FadeIn(pa, shift=LEFT * 0.3), run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 01 : Élodie, paysagiste ─────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = elodie(0.95).move_to(P(-5.0, 0.4))
        self.au_mot("Voici Élodie")
        nom = self.t("Élodie", 42, JAUNE_TITRE).next_to(pe, UP, buff=0.55)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Elle est paysagiste")
        met = self.t("paysagiste", 26, "#86efac").next_to(pe, DOWN, buff=0.12)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        ja = jardin(1.1).move_to(P(1.4, 1.9))
        self.au_mot("elle crée des jardins")
        self.play(FadeIn(ja, shift=UP * 0.3), run_time=0.45)
        mr = mini_ruban(1.0).move_to(P(-2.15, -0.4))
        l1 = self.bloc(["Pas toujours son", "mètre ruban…"], 32, WHITE, buff=0.12)
        gauche(l1, -0.6, -0.4)
        self.au_mot("Elle n'a pas toujours son mètre ruban")
        self.play(FadeIn(mr, shift=UP * 0.2), FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        self.play(Create(croix(mr)), run_time=0.3)
        self.au_mot("Alors elle estime")
        l2 = self.t("Alors elle ESTIME :", 40, JAUNE_TITRE)
        gauche(l2, -2.6, -1.55)
        self.play(FadeIn(l2, scale=1.15), run_time=0.4)
        self.au_mot("elle compare à des longueurs qu'elle connaît par cœur")
        l3 = self.bloc(["elle compare à des longueurs", "qu'elle connaît."], 30, VERT_OK, buff=0.1)
        gauche(l3, -2.6, -2.55)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix()

    # ── 02 : les repères ────────────────────────────────────────────────────
    def ecran_reperes(self):
        self.ecran("02-reperes")
        self.au_mot("Ses repères")
        tit = self.t("Ses repères", 46, JAUNE_TITRE)
        gauche(tit, -6.2, 3.0)
        self.play(Write(tit), run_time=0.35)
        lignes = [("la largeur d'un doigt", doigt(1.0), "un doigt :", "environ 1 cm", None, None,
                   ("environ 1 centimètre", 1), 1.6),
                  ("La largeur d'une main", main(0.9), "une main :", "environ 1 dm", "= 10 cm",
                   "10 centimètres", ("environ 1 décimètre", 1), 0.1),
                  ("Un grand pas", grand_pas(1.9), "un grand pas :", "environ 1 m", None, None,
                   ("environ 1 mètre", 1), -1.6)]
        for ex, d, nom, val, plus, ex_plus, ex_val, y in lignes:
            d.move_to(P(-4.6, y))
            t = self.ligne([(nom, WHITE), (val, VERT_OK)] + ([(plus, BLEU_D)] if plus else []), 38, buff=0.3)
            gauche(t, -2.6, y)
            self.au_mot(ex)
            self.play(FadeIn(d, shift=UP * 0.2), FadeIn(t[0], shift=UP * 0.1), run_time=0.35)
            hors_audit(t[1])  # « 1 » redit trois fois : chaque valeur posée à SON extrait
            self.aux_extraits([t[1]], [ex_val], run_time=0.3)
            if plus:
                self.aux_extraits([t[2]], [ex_plus], run_time=0.3)
        self.attendre_voix()

    # ── 03 : l'allée en grands pas ──────────────────────────────────────────
    def ecran_pas(self):
        self.ecran("03-pas")
        self.au_mot("Élodie veut estimer la longueur d'une allée")
        l0 = self.t("La longueur de l'allée ?", 38, JAUNE_TITRE)
        gauche(l0, -6.2, 2.9)
        al = allee(10.8, 0.9).move_to(P(-0.6, 1.2))
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(al), run_time=0.4)
        pas = 10.8 / 6
        x0 = al.get_left()[0]
        emp = VGroup(*[empreinte(0.9).move_to(P(x0 + pas * (k + 0.5), 1.2 + (0.18 if k % 2 else -0.18)))
                       for k in range(6)])
        arcs = VGroup(*[ArcBetweenPoints(P(x0 + pas * k, 0.45), P(x0 + pas * (k + 1), 0.45), angle=PI / 2,
                                         color=JAUNE_TITRE, stroke_width=3) for k in range(6)]).flip(RIGHT)
        arcs.next_to(al, DOWN, buff=0.1)
        self.au_mot("Elle compte ses grands pas")
        for e, a in zip(emp, arcs):
            self.play(FadeIn(e, scale=1.2), Create(a), run_time=0.22)
        c = self.t("6 grands pas", 42, BLEU_D)
        gauche(c, -5.6, -0.9)
        self.au_mot("6 grands pas")
        self.play(FadeIn(c, scale=1.2), run_time=0.3)
        r = self.ligne([("L'allée mesure", WHITE), ("environ 6 m.", VERT_OK)], 44, buff=0.3)
        gauche(r, -5.6, -2.1)
        self.au_mot("L'allée mesure environ")
        self.play(FadeIn(r[0], shift=UP * 0.1), run_time=0.3)
        hors_audit(r[1])  # « 6 » déjà dit (« 6 grands pas ») : posé à « 6 mètres »
        self.aux_extraits([r[1]], [("6 mètres", 1)], run_time=0.3)
        self.insister(r[1], 1.2, 0.25)
        self.attendre_voix(marge=1.2)

    # ── 04 : d'autres repères : la porte, la marche ─────────────────────────
    def ecran_porte(self):
        self.ecran("04-porte")
        pe = elodie(0.95)
        hp = pe.height * 1.15
        pt = porte(hp, hp * 0.45)
        VGroup(pt, pe).arrange(RIGHT, buff=0.4, aligned_edge=DOWN).move_to(P(-4.3, 0.2))
        f = fleche_double(pt.get_corner(UL) + LEFT * 0.3, pt.get_corner(DL) + LEFT * 0.3, VERT_OK)
        self.au_mot("Une porte")
        self.play(FadeIn(pt, shift=UP * 0.2), run_time=0.35)
        self.au_mot("Un peu plus haute qu'un adulte")
        self.play(FadeIn(pe, shift=LEFT * 0.2), run_time=0.35)
        self.play(Indicate(pt, scale_factor=1.04), run_time=0.35)
        e = self.t("environ 2 m", 38, VERT_OK).next_to(VGroup(pt, pe), DOWN, buff=0.35)
        self.au_mot("environ 2 mètres")
        self.play(GrowFromCenter(f), FadeIn(e, scale=1.2), run_time=0.4)
        # la marche : un chemin, un petit marcheur, une horloge d'un quart d'heure
        ch = Line(P(0.6, -0.6), P(5.6, -0.6), color=ALLEE, stroke_width=10)
        hc = P(3.1, 1.2)
        hor = VGroup(Sector(radius=0.5, angle=-PI / 2, start_angle=PI / 2, fill_color=BLEU_D, fill_opacity=0.6,
                            stroke_width=0).shift(hc),
                     Circle(radius=0.55, color=WHITE, stroke_width=4).move_to(hc),
                     Line(hc, hc + UP * 0.42, color=WHITE, stroke_width=4),
                     Line(hc, hc + RIGHT * 0.42, color=WHITE, stroke_width=4))
        lq = self.t("un quart d'heure de marche", 32).next_to(hor, UP, buff=0.3)
        mar = empreinte(0.8).move_to(ch.get_start() + UP * 0.3)
        self.au_mot("Un quart d'heure de marche")
        self.play(FadeIn(hor, scale=1.1), FadeIn(lq, shift=UP * 0.1), Create(ch), FadeIn(mar), run_time=0.45)
        self.play(mar.animate.move_to(ch.get_end() + UP * 0.3 + LEFT * 0.3), run_time=1.0)
        e2 = self.t("environ 1 km", 38, VERT_OK).next_to(ch, DOWN, buff=0.4)
        self.au_mot("Environ 1 kilomètre")
        self.play(FadeIn(e2, scale=1.2), run_time=0.35)
        self.insister(e2, 1.2, 0.25)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        fe = feuille(1.6).move_to(P(-4.8, 1.4))
        mn = main(1.0).move_to(P(-2.6, 1.4))

        def autres_q(sc):
            sc.play(FadeIn(fe, shift=RIGHT * 0.3), FadeIn(mn, shift=LEFT * 0.3), run_time=0.4)

        def apres(sc):
            sc.play(Indicate(VGroup(fe, mn), color=VERT_OK, scale_factor=1.08), run_time=0.25)

        self.question_gauche("05-question", "05b-reponse",
                             ["Une feuille d'arbre est", "aussi longue qu'une main.",
                              "Environ combien mesure-t-elle ?"],
                             [self.choix("1 dm"), self.choix("1 m"), self.choix("1 km")], 0,
                             ["Une main : environ 1 dm,", "10 cm.", "1 m : une feuille géante !"],
                             -0.75, sans_audit=(2,), mot_q="Une feuille d'arbre", autres_q=autres_q,
                             autres_r=apres)

    # ── 06 : le piège : un doigt d'un mètre ─────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.0)
        self.play(Write(tit), run_time=0.35)
        self.au_mot("Estimer, ce n'est pas deviner au hasard")
        l0 = self.t("Estimer, ce n'est pas deviner au hasard.", 34)
        gauche(l0, -6.2, 2.2)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        l1 = self.ligne([("Hugo dit : mon doigt fait", WHITE), ("1 m", ROUGE_ERREUR), ("de large.", WHITE)], 32,
                        buff=0.2)
        gauche(l1, -6.2, 1.3)
        self.au_mot("Hugo dit")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        hors_audit(l1[1])  # « 1 » redit plus loin (« 1 mètre, c'est ») : posé à SON extrait
        self.aux_extraits([VGroup(l1[1], l1[2])], [("1 mètre de large", 1)], run_time=0.25)
        self.au_mot("Impossible")
        im = self.t("Impossible !", 36, ROUGE_ERREUR).next_to(l1, RIGHT, buff=0.45)
        im.shift(UP * (l1[0][0].get_bottom()[1] - im[0].get_bottom()[1]))  # même ligne de base
        self.play(FadeIn(im, scale=1.3), Wiggle(l1[1]), run_time=0.45)
        W = 10.0
        rb = Rectangle(width=W, height=0.45, fill_color="#fde047", fill_opacity=1, stroke_color="#a16207",
                       stroke_width=3).move_to(P(-0.7, 0.1))
        tr = VGroup(*[Line(P(rb.get_left()[0] + k * W / 100, 0.32), P(rb.get_left()[0] + k * W / 100, 0.1),
                           color="#422006", stroke_width=1.2) for k in range(1, 100)])
        e1 = hors_audit(self.t("1 m", 32, "#fde047")).next_to(rb, RIGHT, buff=0.2)
        c = self.ligne([("1 m", WHITE), ("= 100 doigts", ORANGE_RETENUE)], 40, buff=0.3)
        gauche(c, -5.6, -0.9)
        hors_audit(c[0])  # « 1 » redit : posé à « 1 mètre, c'est »
        self.aux_extraits([VGroup(rb, e1, c[0])], [("1 mètre, c'est", 1)], run_time=0.35)
        self.au_mot("100 doigts")
        self.play(FadeIn(c[1], shift=UP * 0.1), LaggedStart(*[Create(t) for t in tr], lag_ratio=0.01),
                  run_time=0.8)
        d = self.ligne([("Un doigt :", WHITE), ("environ 1 cm.", VERT_OK)], 40, buff=0.3)
        gauche(d, -5.6, -2.1)
        dd = doigt(0.8).next_to(d, RIGHT, buff=0.5)
        self.au_mot("Un doigt fait environ")
        self.play(FadeIn(d[0], shift=UP * 0.1), FadeIn(dd, shift=UP * 0.2), run_time=0.3)
        hors_audit(d[1])
        self.aux_extraits([d[1]], [("1 centimètre", 1)], run_time=0.3)
        self.insister(d[1], 1.2, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        pt = porte(1.3, 0.6)
        ar = arbre(2.6)
        VGroup(pt, ar).arrange(RIGHT, buff=0.6, aligned_edge=DOWN).move_to(P(-4.0, 1.2))

        def autres_q(sc):
            sc.play(FadeIn(pt, shift=UP * 0.2), run_time=0.3)
            sc.play(GrowFromEdge(ar, DOWN), run_time=0.4)

        def apres(sc):
            p2 = pt.copy().next_to(pt, UP, buff=0)
            sc.play(FadeIn(p2, shift=DOWN * 0.3), Indicate(ar, color=VERT_OK, scale_factor=1.05), run_time=0.35)

        self.question_gauche("07-question", "07b-reponse",
                             ["Élodie plante un arbre deux", "fois plus haut qu'une porte.",
                              "Environ combien mesure-t-il ?"],
                             [self.choix("2 m"), self.choix("4 m"), self.choix("40 m")], 1,
                             ["Une porte : environ 2 m.", "Deux fois plus haut :", "2 + 2 = 4 m."],
                             -0.75, sans_audit=(2,), mot_q="Élodie plante un arbre", autres_q=autres_q,
                             autres_r=apres)

    # ── 08 : le défi : le banc ──────────────────────────────────────────────
    def le_banc(self):
        b = banc(5.0)
        mains = VGroup(*[main(0.42) for _ in range(10)]).arrange(RIGHT, buff=0.06)
        mains.scale_to_fit_width(b[1].width).next_to(b[1], UP, buff=0.05)  # sur le dossier, bien visibles
        return b, mains

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        self.au_mot("Élodie mesure un banc avec ses mains")
        l0 = self.t("Élodie mesure un banc avec ses mains :", 36, JAUNE_TITRE)
        gauche(l0, -6.2, 2.3)
        b, mains = self.le_banc()
        VGroup(b, mains).move_to(P(-1.2, 0.6))
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(b, shift=UP * 0.2), run_time=0.4)
        c = self.t("10 largeurs de main.", 38, BLEU_D)
        gauche(c, -6.2, -0.9)
        self.au_mot("10 largeurs de main")
        self.play(LaggedStart(*[FadeIn(m, shift=DOWN * 0.15) for m in mains], lag_ratio=0.15),
                  FadeIn(c, shift=UP * 0.1), run_time=0.8)
        q = self.t("Environ combien mesure le banc ?", 36, JAUNE_TITRE)
        gauche(q, -6.2, -1.7)
        self.au_mot("Environ combien mesure le banc")
        self.play(FadeIn(q, scale=1.1), run_time=0.35)
        self.pause_defi(y=-2.6)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        b, mains = self.le_banc()
        VGroup(b, mains).scale(0.7).move_to(P(4.3, 0.45))  # à droite, sous la ligne « 10 × 10 = 100 cm »
        self.add(b, mains)
        l1 = self.ligne([("Une main :", WHITE), ("environ 10 cm", VERT_OK)], 38, buff=0.25)
        gauche(l1, -6.2, 2.2)
        self.au_mot("Une main, environ")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Indicate(mains[0], scale_factor=1.3), run_time=0.35)
        self.au_mot("environ 10")
        self.play(FadeIn(l1[1], scale=1.1), run_time=0.3)
        l2 = self.ligne([("10 mains :", WHITE), ("10 × 10", BLEU_D), ("= 100 cm", VERT_OK)], 40, buff=0.25)
        gauche(l2, -6.2, 1.2)
        for m in l2:
            hors_audit(m)  # « 10 » redit : chaque morceau à son instant
            for f in m.get_family():
                f.sans_synchro = True
        # « 10 mains : 10 fois 10 » n'a pas de marques (TTS) : instants mesurés sur le WAV
        # (« 10 mains » 4,80 s, « 10 fois 10 » 5,50 s)
        for m, t in ((l2[0], 4.85), (l2[1], 5.55)):
            reste = self._debut_voix + t - self.renderer.time
            if reste > 0.05:
                self.wait(reste)
            self.play(FadeIn(m, shift=UP * 0.08), run_time=0.2)
        self.aux_extraits([l2[2]], ["100 centimètres"], run_time=0.2)
        rb = ruban(b.width, VERT_OK, 0.25).next_to(b, DOWN, buff=0.25)
        e = hors_audit(self.t("environ 1 m", 30, VERT_OK)).next_to(rb, DOWN, buff=0.15)
        r = self.ligne([("Le banc mesure", WHITE), ("environ 1 m.", VERT_OK)], 44, buff=0.3)
        gauche(r, -6.2, -2.3)
        self.au_mot("Le banc mesure environ")
        self.play(FadeIn(r[0], shift=UP * 0.1), GrowFromEdge(rb, LEFT), run_time=0.4)
        self.aux_extraits([VGroup(r[1], e)], [("1 mètre", 1)], run_time=0.3)
        self.insister(r[1], 1.2, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        fig = VGroup(doigt(0.8), main(0.8), grand_pas(1.8)).arrange(DOWN, buff=0.4)
        lignes = self.finale_gauche(fig, textes=[
            ("Pour estimer, on compare", "à des repères :"),
            ("un doigt, environ 1 cm ;", "une main, environ 1 dm ;", "un grand pas, environ 1 m."),
            ("Puis on vérifie que", "le nombre est raisonnable.")], fs=32)
        bloc = lignes[1][1]
        # chaque repère en 3 morceaux, chacun à SON mot : « un doigt, » / « environ » / « 1 cm ; »
        # (le « 1 » est redit trois fois ; « environ » est dit 0,5 s avant le nombre)
        decoupe = [("un doigt,", "environ", "1 cm ;"), ("une main,", "environ", "1 dm ;"),
                   ("un grand pas,", "environ", "1 m.")]
        reperes = []
        for orig, mots in zip(list(bloc), decoupe):
            m = VGroup(*[self.t(x, 32) for x in mots]).arrange(RIGHT, buff=0.16)
            for x in m[1:]:
                x.shift(UP * (m[0][0].get_bottom()[1] - x[0].get_bottom()[1]))
            m.scale(orig[0].height / m[0][0].height)
            m.shift(orig[0].get_corner(DL) - m[0][0].get_corner(DL))
            for x in m:
                hors_audit(x)
                for f in x.get_family():
                    f.sans_synchro = True
            reperes.append(m)
            bloc.remove(orig)
        self.add(fig)
        self.au_mot("Pour estimer")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("un doigt")
        self.play(Create(lignes[1][0]), FadeIn(reperes[0][0], shift=RIGHT * 0.2), run_time=0.3)
        etapes = [("environ 1 centimètre", reperes[0][1]), ("1 centimètre", reperes[0][2]),
                  ("une main", reperes[1][0]), ("environ 1 décimètre", reperes[1][1]),
                  ("1 décimètre", reperes[1][2]), ("un grand pas", reperes[2][0]),
                  ("environ 1 mètre", reperes[2][1]), ("1 mètre", reperes[2][2])]
        for ex, m in etapes:
            self.au_mot(ex)
            self.wait(0.07)
            self.play(FadeIn(m, shift=RIGHT * 0.15), run_time=0.2)
        self.au_mot("Puis on vérifie")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_reperes()
        self.ecran_pas()
        self.ecran_porte()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class LongueurEstimerCE2(LongueurEstimerBase):
    identite = "Maths CE2 — EleveAI"
    ceinture = "jaune"
