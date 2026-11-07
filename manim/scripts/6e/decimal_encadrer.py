# decimal_encadrer.py
# EleveAI — Maths 6e — série « Nombres décimaux », épisode 05 : ENCADRER ET INTERCALER UN DÉCIMAL
# (micro decimal_encadrer, notion decimal_nombre), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : film Ti Margo (prototypes/ti-margo/films/decimaux-encadrer.js).
# Décor et métier : Lina, PILOTE DE ROBOT SUR MARS (centre : espace).
# Écrans : garde (00), situation (01), à l'unité (02), au dixième (03), QUESTION 1 (04),
# intercaler (05), zoom (06), QUESTION 2 (07), défi (08) et correction (08b), appris (09), fin (10).
# Voix : manim/voix/6e-decimal-encadrer.json (Julie, débit −6) ; marques : decimal_encadrer_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/decimal_encadrer.py DecimalEncadrer6e
# python -m manim render -qh --disable_caching manim/scripts/6e/decimal_encadrer.py DecimalEncadrer6e -o eleveai-maths-6e-decimal-encadrer --media_dir manim/scripts/6e/media-dec-05
# Sortie : manim/sorties/6e/maths/decimaux/05-encadrer/eleveai-maths-6e-decimal-encadrer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from decimal_commun import *  # noqa: E402,F403
from decimal_arrondir import Droite, fixe, repere  # noqa: E402

MARS = "#c2410c"
VOISIN = "#34d399"


def robot(s=1.0):
    """Le robot de Lina : caisse, six roues, mât et caméra, panneau solaire."""
    caisse = RoundedRectangle(width=1.6 * s, height=0.6 * s, corner_radius=0.08 * s, fill_color="#e5e7eb", fill_opacity=1,
                              stroke_color="#64748b", stroke_width=3)
    panneau = Rectangle(width=1.9 * s, height=0.12 * s, fill_color="#1d4ed8", fill_opacity=1, stroke_width=0)
    panneau.next_to(caisse, UP, buff=0.04 * s)
    mat = Line(caisse.get_top() + P(0.5, 0) * s, caisse.get_top() + P(0.5, 0.75) * s, color="#94a3b8", stroke_width=6)
    tete = RoundedRectangle(width=0.5 * s, height=0.26 * s, corner_radius=0.05 * s, fill_color="#e5e7eb", fill_opacity=1,
                            stroke_color="#64748b", stroke_width=2).move_to(mat.get_end() + UP * 0.1 * s)
    oeil = Dot(tete.get_center() + RIGHT * 0.12 * s, radius=0.07 * s, color=BLEU_D)
    roues = VGroup(*[Circle(radius=0.2 * s, fill_color="#1f2937", fill_opacity=1, stroke_color="#94a3b8", stroke_width=3)
                     .move_to(caisse.get_bottom() + P(x, -0.15) * s) for x in (-0.6, 0, 0.6)])
    return hors_audit(VGroup(panneau, mat, tete, oeil, caisse, roues))


def sol_mars(larg=6.4, h=0.9):
    sol = RoundedRectangle(width=larg, height=h, corner_radius=0.2, fill_color=MARS, fill_opacity=0.9, stroke_width=0)
    cailloux = VGroup(*[Ellipse(width=w, height=w * 0.5, fill_color="#7c2d12", fill_opacity=1, stroke_width=0)
                        .move_to(sol.get_center() + P(x, y)) for x, y, w in ((-2.3, 0.1, 0.4), (-0.6, -0.2, 0.25),
                                                                            (1.5, 0.15, 0.35), (2.6, -0.2, 0.2))])
    return hors_audit(VGroup(sol, cailloux))


def planete(r=0.7):
    c = Circle(radius=r, fill_color=MARS, fill_opacity=1, stroke_width=0)
    taches = VGroup(*[Circle(radius=rr * r, fill_color="#9a3412", fill_opacity=1, stroke_width=0).move_to(P(x * r, y * r))
                      for x, y, rr in ((-0.3, 0.3, 0.2), (0.35, -0.2, 0.25), (-0.1, -0.5, 0.12))])
    return hors_audit(VGroup(c, taches))


def etoiles():
    pts = ((-6.0, 3.2), (-4.6, 3.4), (-2.2, 3.3), (-0.6, 2.9), (-5.3, 2.4), (-1.4, 2.2))
    return hors_audit(VGroup(*[Dot(P(x, y), radius=0.035, color=WHITE) for x, y in pts]))


def lina(s=1.0):
    """Lina, pilote de robot : combinaison orange, casque audio."""
    p = visage(personne(peau="#c68642", tenue="#ea580c", cheveux="#1f2937", longs=True, s=s))
    p.add(casque_audio(p))
    return p


def loupe(r=0.55):
    verre = Circle(radius=r, stroke_color="#e5e7eb", stroke_width=8, fill_color=BLEU_D, fill_opacity=0.15)
    manche = Line(verre.get_center() + P(0.72, -0.72) * r, verre.get_center() + P(1.6, -1.6) * r, color="#a16207",
                  stroke_width=14)
    return hors_audit(VGroup(manche, verre))


def etiquette(droite, v, s, fs=26, couleur=WHITE, bas=True):
    t = Text(s, font_size=fs, color=couleur, weight=BOLD)
    return t.next_to(droite.x(v), DOWN if bas else UP, buff=0.3)


class DecimalEncadrerBase(PaysageDecimal):
    nom_voix = "6e-decimal-encadrer"
    fichier_marques = "decimal_encadrer_marques.json"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Encadrer et intercaler un nombre décimal", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("Encadrer")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        d = Droite(0, 1, 10, larg=5.2).move_to(P(2.7, 0.1))
        pt = hors_audit(Triangle(fill_color=AMBRE_D, fill_opacity=1, stroke_width=0).scale(0.16).rotate(PI)
                        .move_to(d.x(0.38) + UP * 0.22))
        cro = hors_audit(VGroup(*[Text(c, font_size=60, color=VOISIN, weight=BOLD).move_to(d.x(v)) for c, v in
                                  (("[", 0.3), ("]", 0.4))]))
        q = self.bloc(["Entre quels nombres", "se trouve-t-il ?"], 40).move_to(P(-3.2, 0.35))
        self.au_mot("Entre quels")
        self.play(FadeIn(q, shift=UP * 0.2), FadeIn(d), FadeIn(pt, shift=DOWN * 0.2), run_time=0.4)
        self.play(FadeIn(cro[0], shift=RIGHT * 0.3), FadeIn(cro[1], shift=LEFT * 0.3), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : Lina, pilote de robot ──────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        li = lina(1.0).move_to(P(-4.85, 0.4))
        self.au_mot("Voici Lina")
        nom = self.t("Lina", 44, BLEU_CALCUL).next_to(li, UP, buff=0.2)
        self.play(FadeIn(li, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Elle pilote")
        met = self.t("pilote un robot", 28, BLEU_CALCUL).next_to(li, DOWN, buff=0.18)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("sur la planète Mars")
        pl = planete(0.6).move_to(P(-1.2, 2.6))
        sol = sol_mars(3.8, 0.7).move_to(P(-2.2, -2.2))
        ro = robot(0.9).move_to(P(-3.0, -1.35))
        l1 = self.bloc(["sur la planète Mars."], 36)
        self.col(l1, 2.3)
        self.play(FadeIn(etoiles()), FadeIn(pl, scale=0.5), FadeIn(sol), FadeIn(ro, shift=UP * 0.2), FadeIn(l1),
                  run_time=0.5)
        self.au_mot("Aujourd'hui")
        l2 = self.t("Aujourd'hui, le robot a roulé :", 36)
        self.col(l2, 1.1)
        trace = hors_audit(DashedLine(P(-3.9, -1.75), P(-3.9, -1.75), color=AMBRE_D, stroke_width=5))
        self.play(FadeIn(l2, shift=UP * 0.1), ro.animate.shift(RIGHT * 1.6), run_time=0.9)
        trace = hors_audit(DashedLine(P(-4.4, -1.85), P(-2.6, -1.85), color=AMBRE_D, stroke_width=5))
        self.play(Create(trace), run_time=0.3)
        self.au_mot("7,38 mètres")
        g = self.gros("7,38 m", fs=70)
        self.col(g, -0.3, xl=1.8)
        self.play(FadeIn(g, scale=1.3), run_time=0.4)
        self.insister(g, 1.15, 0.25)
        self.attendre_voix()

    # ── 02 : à l'unité ──────────────────────────────────────────────────────
    def ecran_unite(self):
        self.ecran("02-unite")
        d = Droite(6, 9, 3, larg=5.8).move_to(P(-3.3, 0.3))
        self.au_mot("Encadrer à l'unité")
        l1 = self.bloc(["Encadrer à l'unité, c'est trouver", "les deux entiers qui l'entourent."], 32)
        self.col(l1, 2.4)
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(d), run_time=0.35)
        self.au_mot("les deux entiers")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("7,38 est entre")
        r = fixe(repere(d, 7.38, "7,38"))
        l2 = self.ligne([("7,38", AMBRE_D), ("est entre", WHITE), ("7", VOISIN), ("et", WHITE), ("8.", VOISIN)], 36,
                        buff=0.16)
        fixe(l2[0])
        self.col(l2, 1.15)
        self.play(FadeIn(r, shift=DOWN * 0.2), FadeIn(l2[0]), run_time=0.35)
        self.au_mot("est entre")
        self.play(FadeIn(l2[1]), run_time=0.25)
        l2 = VGroup(*l2[1:])
        self.au_mot("entre 7")
        n7 = d.nombre(7, couleur=VOISIN, fs=40)
        self.play(FadeIn(l2[1]), FadeIn(n7, scale=1.4), run_time=0.3)
        self.au_mot("et 8")
        n8 = d.nombre(8, couleur=VOISIN, fs=40)
        self.play(FadeIn(l2[2]), run_time=0.2)
        self.au_mot("8. 7")
        self.play(FadeIn(l2[3]), FadeIn(n8, scale=1.4), run_time=0.3)
        seg = hors_audit(Line(d.x(7), d.x(8), color=VOISIN, stroke_width=12))
        self.play(Create(seg), run_time=0.4)
        lg = self.ligne_au_mot([("7", VOISIN), ("<", WHITE), ("7,38", AMBRE_D), ("<", WHITE), ("8", VOISIN)],
                               ["7 est plus petit", "plus petit que 7,38", "7,38, qui", "qui est plus petit", "que 8"],
                               -0.3, fs=60, xl=1.6, buff=0.3)
        cad = SurroundingRectangle(lg, color=VERT_OK, buff=0.22, corner_radius=0.12, stroke_width=5)
        self.play(Create(cad), run_time=0.35)
        self.attendre_voix()

    # ── 03 : au dixième ─────────────────────────────────────────────────────
    def ecran_dixieme(self):
        self.ecran("03-dixieme")
        haut = Droite(6, 9, 3, larg=5.8).move_to(P(-3.3, 2.3))
        self.add(haut, haut.nombre(7, couleur=VOISIN), haut.nombre(8, couleur=VOISIN))
        d = Droite(7, 8, 10, larg=5.8).move_to(P(-3.3, -0.6))
        self.au_mot("On zoome")
        l1 = self.t("On zoome entre 7 et 8.", 36)
        self.col(l1, 2.5)
        lz = hors_audit(VGroup(DashedLine(haut.x(7), d.x(7) + UP * 0.3, color=AMBRE_D),
                               DashedLine(haut.x(8), d.x(8) + UP * 0.3, color=AMBRE_D)))
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.play(Create(lz), FadeIn(d), FadeIn(hors_audit(etiquette(d, 7, "7", 30, VOISIN))),
                  FadeIn(hors_audit(etiquette(d, 8, "8", 30, VOISIN))), run_time=0.5)
        self.au_mot("On voit les dixièmes")
        l2 = self.t("On voit les dixièmes :", 36, AMBRE_D)
        self.col(l2, 1.6)
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(d.grads, color=AMBRE_D), run_time=0.4)
        for k, v in enumerate(("7,1", "7,2", "7,3")):
            self.au_mot(v)
            et = etiquette(d, 7 + (k + 1) / 10, v, 26, AMBRE_D)
            if k % 2 == 1:
                et.shift(DOWN * 0.42)
            self.play(FadeIn(et, scale=1.3), run_time=0.25)
        self.au_mot("7,38 est entre")
        r = fixe(repere(d, 7.38, "7,38"))
        l3 = self.ligne([("7,38", AMBRE_D), ("est entre", WHITE), ("7,3", VOISIN), ("et", WHITE), ("7,4.", VOISIN)], 36,
                        buff=0.16)
        fixe(l3[0])
        self.col(l3, 0.6)
        self.play(FadeIn(r, shift=DOWN * 0.2), FadeIn(l3[0]), run_time=0.35)
        self.au_mot("est entre")
        self.play(FadeIn(l3[1]), run_time=0.25)
        l3 = VGroup(*l3[1:])
        self.au_mot("entre 7,3")
        self.play(FadeIn(l3[1]), run_time=0.25)
        self.au_mot("et 7,4")
        self.play(FadeIn(l3[2]), FadeIn(l3[3]), FadeIn(etiquette(d, 7.4, "7,4", 26, VOISIN).shift(DOWN * 0.42)), run_time=0.3)
        seg = hors_audit(Line(d.x(7.3), d.x(7.4), color=VOISIN, stroke_width=12))
        self.play(Create(seg), run_time=0.35)
        self.au_mot("C'est l'encadrement")
        l4 = self.bloc(["C'est l'encadrement", "au dixième."], 36, JAUNE_TITRE)
        self.col(l4, -0.5)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.35)
        self.play(Indicate(seg, color=VERT_OK), run_time=0.5)
        self.attendre_voix()

    # ── 04 : QUESTION 1 ─────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        d = Droite(11, 14, 3, larg=5.6).move_to(P(-3.4, 0.2))

        def avant(sc):
            sc.play(FadeIn(d), run_time=0.35)

        def apres(sc):
            sc.au_mot("12,6 est entre")
            r = hors_audit(repere(d, 12.6, "12,6"))
            seg = hors_audit(Line(d.x(12), d.x(13), color=VOISIN, stroke_width=12))
            lg = fixe(sc.ligne([("12,6", VERT_OK), ("est entre les entiers", VERT_OK), ("12 et 13.", VERT_OK)], 28,
                               buff=0.16))
            lg.move_to(P(0, -1.3)).align_to(P(-6.3, 0), LEFT)
            sc.play(FadeIn(lg[0], shift=UP * 0.1), FadeIn(r, shift=DOWN * 0.2), Create(seg),
                    FadeIn(hors_audit(d.nombre(12, couleur=VOISIN))), FadeIn(hors_audit(d.nombre(13, couleur=VOISIN))),
                    run_time=0.3)
            sc.au_mot("est entre")
            sc.play(FadeIn(lg[1], shift=UP * 0.1), run_time=0.3)
            sc.au_mot("12 et 13")
            sc.play(FadeIn(lg[2], shift=UP * 0.1), run_time=0.3)
            sc.rep_fini()

        self.question_pause("04-question", "04b-reponse", ["Quel est l'encadrement", "à l'unité de 12,6 ?"],
                            [self.choix("entre 12 et 13"), self.choix("entre 11 et 12"), self.choix("entre 12,5 et 12,7")], 0,
                            ["12,6 est entre les entiers 12 et 13."], mot_q="Quel",
                            avant_q=avant, autres_r=apres)

    # ── 05 : intercaler ─────────────────────────────────────────────────────
    def ecran_intercaler(self):
        self.ecran("05-intercaler")
        d = Droite(4.7, 4.8, 10, larg=5.0).move_to(P(-3.2, 0.6))
        self.au_mot("Lina cherche")
        l1 = self.ligne([("Un nombre entre", WHITE), ("4,7", VOISIN), ("et 4,8 ?", VOISIN)], 36, buff=0.18)
        fixe(l1[1])
        self.col(l1, 2.5)
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(d.ligne), FadeIn(d.bouts), run_time=0.3)
        self.au_mot("4,7")
        e47 = fixe(etiquette(d, 4.7, "4,7", 34, VOISIN))
        e48 = etiquette(d, 4.8, "4,8", 34, VOISIN)
        self.play(FadeIn(l1[1]), FadeIn(e47), run_time=0.3)
        self.au_mot("4,8")
        self.play(FadeIn(l1[2]), FadeIn(e48), run_time=0.3)
        self.au_mot("On dirait")
        l2 = self.t("On dirait qu'il n'y en a pas.", 32, ROUGE_ERREUR)
        self.col(l2, 1.45)
        self.play(FadeIn(l2, shift=UP * 0.1), Wiggle(VGroup(e47, e48)), run_time=0.6)
        self.au_mot("Mais 4,7")
        l3 = self.ligne([("Mais 4,7", WHITE), ("= 4,70", AMBRE_D)], 36, buff=0.2)
        self.col(l3, 0.55)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("c'est 4,70")
        e470 = etiquette(d, 4.7, "4,70", 34, AMBRE_D)
        self.play(FadeIn(l3[1], scale=1.2), Transform(e47, e470), run_time=0.35)
        self.au_mot("Et 4,8")
        l4 = self.ligne([("Et 4,8", WHITE), ("= 4,80", AMBRE_D)], 36, buff=0.2)
        self.col(l4, -0.2)
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("c'est 4,80")
        e480 = etiquette(d, 4.8, "4,80", 34, AMBRE_D)
        self.play(FadeIn(l4[1], scale=1.2), Transform(e48, e480), run_time=0.35)
        self.au_mot("Entre les deux")
        l5 = self.t("Entre les deux :", 36)
        self.col(l5, -1.0)
        self.play(FadeIn(l5, shift=UP * 0.1), FadeIn(d.grads, lag_ratio=0.1), run_time=0.5)
        for k, v in ((1, "4,71"), (2, "4,72")):
            self.au_mot(v)
            et = etiquette(d, 4.7 + k / 100, v, 26, ROSE_D, bas=False)
            if k == 2:
                et.shift(UP * 0.42)
            self.play(FadeIn(et, scale=1.3), run_time=0.25)
        self.au_mot("et 4,75")
        r = repere(d, 4.75, "4,75", couleur=VERT_OK, fs=34, haut=0.55)
        r.shift(DOWN * 0.0)
        r.txt.next_to(d.x(4.75), DOWN, buff=0.75)
        r.tri.move_to(d.x(4.75) + DOWN * 0.22).rotate(PI)
        g = self.t("et 4,75 !", 38, VERT_OK)
        self.col(g, -1.75)
        self.play(FadeIn(r, scale=1.3), FadeIn(g), run_time=0.35)
        self.au_mot("Intercaler")
        l6 = self.t("Intercaler, c'est ça !", 40, JAUNE_TITRE)
        l6.move_to(P(-3.3, -2.5))
        self.play(Write(l6), run_time=0.45)
        self.attendre_voix()

    # ── 06 : on zoome encore ────────────────────────────────────────────────
    def ecran_zoom(self):
        self.ecran("06-zoom")
        haut = Droite(4.7, 4.8, 10, larg=5.0).move_to(P(-3.2, 2.3))
        d = Droite(4.75, 4.76, 10, larg=5.0).move_to(P(-3.2, -0.5))
        self.add(haut)
        l1 = self.ligne([("Et entre 4,75", WHITE), ("et 4,76 ?", WHITE)], 36, buff=0.18)
        fixe(l1)
        self.col(l1, 2.5)
        e1 = fixe(etiquette(haut, 4.75, "4,75", 26, VOISIN)).shift(LEFT * 0.4)
        e2 = fixe(etiquette(haut, 4.76, "4,76", 26, VOISIN)).shift(RIGHT * 0.4)
        self.au_mot("4,75")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(e1), run_time=0.25)
        self.au_mot("4,76")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(e2), run_time=0.3)
        self.au_mot("On zoome encore")
        lp = loupe(0.36).move_to(haut.x(4.755) + P(-0.5, 0.6))
        l2 = self.t("On zoome encore :", 36, AMBRE_D)
        self.col(l2, 1.45)
        lz = hors_audit(VGroup(DashedLine(haut.x(4.75), d.x(4.75) + UP * 0.3, color=AMBRE_D),
                               DashedLine(haut.x(4.76), d.x(4.76) + UP * 0.3, color=AMBRE_D)))
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(lp, scale=0.5), run_time=0.4)
        self.play(Create(lz), FadeIn(d), FadeIn(hors_audit(etiquette(d, 4.75, "4,75", 30, VOISIN))),
                  FadeIn(hors_audit(etiquette(d, 4.76, "4,76", 30, VOISIN))), run_time=0.5)
        self.au_mot("4,755")
        r = fixe(repere(d, 4.755, "4,755", couleur=VERT_OK, fs=36))
        l3 = self.ligne([("4,755,", VERT_OK), ("par exemple.", WHITE)], 36, buff=0.18)
        fixe(l3[0])
        self.col(l3, 0.65)
        self.play(FadeIn(r, scale=1.3), FadeIn(l3[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("par exemple")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("On peut toujours")
        l4 = self.t("On peut toujours zoomer.", 36)
        self.col(l4, -0.25)
        self.play(FadeIn(l4, shift=UP * 0.1), Indicate(lp, color=AMBRE_D, scale_factor=1.15), run_time=0.4)
        self.au_mot("Entre deux nombres")
        l5 = self.bloc(["Entre deux nombres décimaux,", "il y en a toujours d'autres."], 32, JAUNE_TITRE)
        self.col(l5, -1.4)
        self.play(FadeIn(l5[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("il y en a toujours")
        self.play(FadeIn(l5[1], shift=UP * 0.1), run_time=0.3)
        self.play(l5.animate.set_color(VERT_OK), run_time=0.4)
        self.attendre_voix()

    # ── 07 : QUESTION 2 ─────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        d = Droite(2.3, 2.4, 10, larg=5.0).move_to(P(-3.2, 0.2))

        def avant(sc):
            sc.play(FadeIn(d), run_time=0.35)

        def apres(sc):
            sc.au_mot("2,35 est entre")
            r = hors_audit(repere(d, 2.35, "2,35", couleur=VERT_OK))
            lg = fixe(sc.ligne_rep(0, ["2,35", "est entre", "2,30"]))
            sc.play(FadeIn(r, scale=1.3), FadeIn(lg[0]), run_time=0.3)
            sc.au_mot("est entre")
            sc.play(FadeIn(lg[1]), run_time=0.25)
            sc.au_mot("2,30")
            sc.play(FadeIn(lg[2]), FadeIn(hors_audit(etiquette(d, 2.3, "2,30", 30, AMBRE_D))), run_time=0.3)
            lg2 = fixe(sc.ligne_rep(1, ["et 2,40."]))
            sc.au_mot("2,40")
            sc.play(FadeIn(lg2[0]), FadeIn(hors_audit(etiquette(d, 2.4, "2,40", 30, AMBRE_D))), run_time=0.3)
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse", ["Quel nombre est", "entre 2,3 et 2,4 ?"],
                            [self.t("2,5", 36), self.t("2,35", 36), self.t("2,03", 36)], 1,
                            ["2,35 est entre 2,30", "et 2,40."], mot_q="Quel",
                            avant_q=avant, autres_r=apres)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        sol = sol_mars(4.6, 0.7).move_to(P(-3.6, -1.4))
        ro = robot(1.1).move_to(P(-4.2, -0.4))
        self.au_mot("Le robot a roulé")
        l1 = self.t("Le robot a roulé", 36)
        self.col(l1, 2.0, xl=0.0)
        self.play(FadeIn(sol), FadeIn(ro, shift=RIGHT * 0.4), FadeIn(l1), run_time=0.4)
        self.au_mot("15,04")
        g = self.gros("15,04 m", fs=58)
        self.col(g, 1.05, xl=0.6)
        self.play(FadeIn(g, scale=1.2), ro.animate.shift(RIGHT * 1.2), run_time=0.45)
        self.au_mot("Encadre ce nombre")
        l2 = hors_audit(self.t("1. Encadre-le à l'unité.", 36, ORANGE_RETENUE))
        self.col(l2, -0.1, xl=0.0)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("puis au dixième")
        l3 = hors_audit(self.t("2. Puis au dixième.", 36, ORANGE_RETENUE))
        self.col(l3, -0.95, xl=0.0)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        self.pause_defi(y=-2.2)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        d1 = Droite(14, 17, 3, larg=5.0).move_to(P(-3.3, 1.6))
        d2 = Droite(15, 15.2, 2, larg=5.0).move_to(P(-3.3, -1.3))
        d2.grads.set_opacity(0)
        d2b = hors_audit(VGroup(*[Line(d2.x(15 + k / 100) + DOWN * 0.08, d2.x(15 + k / 100) + UP * 0.08, color=WHITE,
                                       stroke_width=2) for k in range(1, 20)]))
        self.au_mot("À l'unité")
        l1 = self.ligne([("À l'unité :", BLEU_D), ("entre", WHITE), ("15", VOISIN), ("et", WHITE), ("16.", VOISIN)], 34,
                        buff=0.15)
        self.col(l1, 2.2)
        r1 = hors_audit(repere(d1, 15.04, "15,04", fs=28))
        self.play(FadeIn(d1), FadeIn(r1), FadeIn(l1[0]), run_time=0.35)
        self.au_mot("entre 15")
        self.play(FadeIn(l1[1]), FadeIn(l1[2]), FadeIn(d1.nombre(15, couleur=VOISIN)), run_time=0.3)
        self.au_mot("et 16")
        s1 = hors_audit(Line(d1.x(15), d1.x(16), color=VOISIN, stroke_width=12))
        self.play(FadeIn(l1[3]), FadeIn(l1[4]), FadeIn(d1.nombre(16, couleur=VOISIN)), Create(s1), run_time=0.35)
        self.au_mot("Au dixième")
        l2 = self.t("Au dixième :", 34, AMBRE_D)
        self.col(l2, 1.2)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(d2), FadeIn(d2b), run_time=0.35)
        self.au_mot("15,04 a")
        l3 = self.bloc(["15,04 a 0 dixième", "et 4 centièmes."], 32)
        self.col(l3, 0.25)
        r2 = repere(d2, 15.04, "15,04", fs=28)
        self.play(FadeIn(l3[0], shift=UP * 0.1), FadeIn(r2, shift=DOWN * 0.2), run_time=0.35)
        self.au_mot("et 4 centièmes")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Il est entre")
        l4 = self.ligne([("Il est entre", WHITE), ("15,0", VOISIN), ("et", WHITE), ("15,1.", VOISIN)], 34, buff=0.15)
        self.col(l4, -0.8)
        self.play(FadeIn(l4[0]), run_time=0.25)
        self.au_mot("entre 15,0")
        self.play(FadeIn(l4[1]), FadeIn(hors_audit(d2.nombre(15, "15,0", fs=30, couleur=VOISIN))), run_time=0.3)
        self.au_mot("et 15,1")
        s2 = hors_audit(Line(d2.x(15), d2.x(15.1), color=VOISIN, stroke_width=12))
        self.play(FadeIn(l4[2]), FadeIn(l4[3]), FadeIn(hors_audit(d2.nombre(15.1, "15,1", fs=30, couleur=VOISIN))),
                  Create(s2), run_time=0.35)
        self.play(Indicate(s2, color=VERT_OK), run_time=0.5)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        d = Droite(0, 1, 10, larg=4.2)
        pt = hors_audit(Triangle(fill_color=AMBRE_D, fill_opacity=1, stroke_width=0).scale(0.14).rotate(PI)
                        .move_to(d.x(0.38) + UP * 0.2))
        seg = hors_audit(Line(d.x(0.3), d.x(0.4), color=VOISIN, stroke_width=12))
        lp = loupe(0.35).move_to(d.x(0.75) + P(0.2, -0.9))
        fig = VGroup(d, seg, pt, lp)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Encadrer, c'est trouver les deux", "voisins qui entourent le nombre."),
            ("Pour intercaler, on ajoute", "des zéros et on zoome."),
            ("Entre deux décimaux,", "il y en a toujours d'autres.")], fs=36)
        self.au_mot("Encadrer")
        self.montrer_ligne(lignes[0], Indicate(seg, color=VOISIN))
        self.au_mot("Pour intercaler")
        self.montrer_ligne(lignes[1], Indicate(lp, color=AMBRE_D))
        self.au_mot("Entre deux")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_unite()
        self.ecran_dixieme()
        self.ecran_question1()
        self.ecran_intercaler()
        self.ecran_zoom()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class DecimalEncadrer6e(DecimalEncadrerBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
