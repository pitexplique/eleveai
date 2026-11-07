# triangle_angle_manquant.py
# EleveAI — Maths 6e — série « Triangles », épisode 07 : TROUVER L'ANGLE QUI MANQUE
# (micro triangle_angle_manquant, notion triangle_propriete), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : film Ti Margo (prototypes/ti-margo/films/triangles.js, épisode angle-manquant).
# Décor et métier : Maëlle, CHARPENTIÈRE (centres : art-design, jeux-defis).
# Voix : manim/voix/6e-triangle-angle-manquant.json ; marques : triangle_angle_manquant_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/triangle_angle_manquant.py TriangleAngleManquant6e
# python -m manim render -qh --disable_caching manim/scripts/6e/triangle_angle_manquant.py TriangleAngleManquant6e -o eleveai-maths-6e-triangle-angle-manquant --media_dir manim/scripts/6e/media-tri-07
# Sortie : manim/sorties/6e/maths/triangles/07-angle-manquant/eleveai-maths-6e-triangle-angle-manquant.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403
from canvas_angles import *  # noqa: E402,F403
from canvas_triangles import *  # noqa: E402,F403
from triangle_propriete_commun import *  # noqa: E402,F403


def maelle(s=1.0):
    """Maëlle : son casque de chantier et son marteau."""
    p = visage(personne(peau="#8d5524", tenue="#b45309", cheveux="#1f2937", longs=True, s=s))
    c = p.tete.get_center()
    r = p.tete.width / 2
    casque = AnnularSector(inner_radius=0, outer_radius=r * 1.12, angle=PI, start_angle=0, arc_center=c + UP * r * 0.2,
                           fill_color="#facc15", fill_opacity=1, stroke_width=0)
    visiere = RoundedRectangle(width=r * 2.5, height=r * 0.16, corner_radius=r * 0.06, fill_color="#eab308", fill_opacity=1,
                               stroke_width=0).move_to(c + UP * r * 0.2)
    manche = Line(p.corps.get_center() + P(0.45, -0.3) * s, p.corps.get_center() + P(0.95, 0.5) * s, color=BOIS, stroke_width=9)
    tete_m = RoundedRectangle(width=0.42 * s, height=0.17 * s, corner_radius=0.03, fill_color="#94a3b8", fill_opacity=1,
                              stroke_width=0).rotate(np.deg2rad(58)).move_to(manche.get_end())
    p.add(casque, visiere, manche, tete_m)
    return p


def cabane(sommet_h, g, d):
    """Le toit de bois posé sur une petite cabane : les poutres sont les côtés du triangle."""
    bas = VGroup(Rectangle(width=np.linalg.norm(d - g) * 0.82, height=1.5, fill_color="#78350f", fill_opacity=1, stroke_width=0)
                 .move_to((g + d) / 2 + DOWN * 0.75))
    porte = RoundedRectangle(width=0.62, height=1.0, corner_radius=0.08, fill_color="#451a03", fill_opacity=1,
                             stroke_width=0).move_to((g + d) / 2 + DOWN * 1.0)
    bas.add(porte)
    return bas


class TriangleAngleManquantBase(FinTriangles, PaysageProp):
    nom_voix = "6e-triangle-angle-manquant"
    fichier_marques = "triangle_angle_manquant_marques.json"

    def toit(self, base=4.9, centre=(-3.3, -0.4), sw=9):
        """Le toit de Maëlle : 30° à gauche, 80° à droite, 70° en haut (vraies mesures)."""
        return Tri.par_angles(30, 80, base=base, centre=P(*centre), sw=sw, couleur=BOIS, fond=0.14, r_point=0.11)

    # Deux gestes en face du triangle : « 30 + 80 = 110 », « 180 − 110 = 70 »
    def poser_calcul(self, morceaux, y, mots, xl=0.9, fs=52):
        """Une ligne de calcul : chaque élément de `mots` = (extrait, n, indices des morceaux)."""
        lg = VGroup(*[etq(t, fs, c) for t, c in morceaux]).arrange(RIGHT, buff=0.24)
        self.col(lg, y, xl=xl)
        for m, n, idx in mots:
            self.au_mot(m, n)
            self.play(*[FadeIn(lg[i], shift=RIGHT * 0.08) for i in idx], run_time=0.22)
        return lg

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Trouver l'angle qui manque", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Trouver")
        f = Tri.par_angles(30, 80, base=4.2, centre=P(3.9, -0.2), sw=8, couleur=BOIS, fond=0.14, r_point=0.1)
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(f), run_time=0.7)
        self.au_mot("Comment")
        q = self.bloc(["Comment trouver un angle", "sans le mesurer ?"], 40).move_to(P(-2.6, 0.4))
        A = f.sommets[0]
        d = etq("?", 56, JAUNE_TITRE).next_to(A, UP, buff=0.12)
        self.play(FadeIn(q, shift=UP * 0.2), FadeIn(d, scale=1.6), run_time=0.45)
        self.attendre_voix(marge=0.6)

    # ── 01 : Maëlle, charpentière ───────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        ma = maelle(1.0).move_to(P(-5.2, 0.05))
        self.au_mot("Voici Maëlle")
        nom = self.t("Maëlle", 44, BLEU_CALCUL).next_to(ma, UP, buff=0.2)
        self.play(FadeIn(ma, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("charpentière")
        met = self.t("charpentière", 34, BLEU_CALCUL).next_to(ma, DOWN, buff=0.18).set_x(-5.0)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("toit")
        f = Tri.par_angles(30, 80, base=5.0, centre=P(0.1, 0.1), sw=10, couleur=BOIS, fond=0.14, r_point=0.11)
        A, B, C = f.sommets
        bas = cabane(A, B, C)
        lab = self.t("Le toit d'une cabane", 34, AMBRE).move_to(P(-0.9, 2.75))
        self.play(FadeIn(bas), FadeIn(f), FadeIn(lab), run_time=0.5)
        self.au_mot("deux angles")
        l1 = VGroup(etq("Elle connaît", 36), etq("deux angles :", 36)).arrange(DOWN, buff=0.12).move_to(P(4.9, 2.2))
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("30 degrés")
        sb = secteur(B, A, C, 1.0, C_COINS[1])
        e30 = mesure(B, A, C, "30°", 1.45, 34, C_COINS[1])
        v1 = etq("30°", 50, C_COINS[1]).move_to(P(4.15, 1.0))
        self.play(FadeIn(sb), FadeIn(e30, scale=1.3), FadeIn(v1, scale=1.3), run_time=0.3)
        self.au_mot("80 degrés")
        sc_ = secteur(C, A, B, 0.6, C_COINS[2])
        e80 = mesure(C, A, B, "80°", 1.0, 34, C_COINS[2])
        v2 = etq("80°", 50, C_COINS[2]).move_to(P(5.65, 1.0))
        self.play(FadeIn(sc_), FadeIn(e80, scale=1.3), FadeIn(v2, scale=1.3), run_time=0.3)
        self.au_mot("Elle cherche")
        l2 = VGroup(*[etq(x, 30, JAUNE_TITRE) for x in ("Elle cherche", "le troisième,", "sans le mesurer.")]).arrange(DOWN, buff=0.12).move_to(P(4.75, -0.6))
        d = etq("?", 56, JAUNE_TITRE).next_to(A, UP, buff=0.05)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(d, scale=1.6), run_time=0.35)
        self.attendre_voix()

    # ── 02 : la méthode ─────────────────────────────────────────────────────
    def ecran_methode(self):
        self.ecran("02-methode")
        f = self.toit()
        A, B, C = f.sommets
        sb, sc_ = secteur(B, A, C, 1.0, C_COINS[1]), secteur(C, A, B, 0.6, C_COINS[2])
        e30, e80 = mesure(B, A, C, "30°", 1.45, 34, C_COINS[1]), mesure(C, A, B, "80°", 1.0, 34, C_COINS[2])
        d = etq("?", 56, JAUNE_TITRE).next_to(A, UP, buff=0.08)
        self.add(f, sb, sc_, e30, e80, d)
        self.au_mot("Deux gestes")
        tit = self.t("Deux gestes.", 44, JAUNE_TITRE)
        self.col(tit, 2.85, xl=0.9)
        self.play(FadeIn(tit, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Un :")
        g1 = self.bloc(["Un : j'ajoute les", "deux angles connus."], 36)
        self.col(g1, 1.95, xl=0.9)
        self.play(FadeIn(g1, shift=UP * 0.1), Indicate(sb, scale_factor=1.1), Indicate(sc_, scale_factor=1.1), run_time=0.4)
        self.poser_calcul([("30", C_COINS[1]), ("+", WHITE), ("80", C_COINS[2]), ("=", WHITE), ("110", AMBRE)], 0.75,
                          [("30", 1, (0, 1)), ("80", 1, (2, 3)), ("110", 1, (4,))])
        self.au_mot("Deux :")
        g2 = self.t("Deux : je retire de 180.", 36)
        self.col(g2, -0.2, xl=0.9)
        self.play(FadeIn(g2, shift=UP * 0.1), run_time=0.3)
        self.poser_calcul([("180", WHITE), ("−", WHITE), ("110", AMBRE), ("=", WHITE), ("70", VERT_OK)], -1.1,
                          [("180 moins", 1, (0, 1)), ("110", 2, (2, 3)), ("70", 1, (4,))])
        self.au_mot("Le troisième")
        sa = secteur(A, B, C, 0.62, VERT_OK)
        e70 = etq("70°", 42, VERT_OK).next_to(A, UP, buff=0.12)
        v = self.t("Le troisième : 70°.", 42, VERT_OK)
        self.col(v, -2.05, xl=0.9)
        self.play(FadeOut(d), FadeIn(sa), FadeIn(e70, scale=1.5), FadeIn(v, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix()

    # ── 03 : on vérifie ─────────────────────────────────────────────────────
    def ecran_verifier(self):
        self.ecran("03-verifier")
        f = self.toit()
        A, B, C = f.sommets
        sb, sc_, sa = secteur(B, A, C, 1.0, C_COINS[1]), secteur(C, A, B, 0.6, C_COINS[2]), secteur(A, B, C, 0.62, VERT_OK)
        self.add(f, sb, sc_, sa, mesure(B, A, C, "30°", 1.45, 34, C_COINS[1]), mesure(C, A, B, "80°", 1.0, 34, C_COINS[2]),
                 etq("70°", 42, VERT_OK).next_to(A, UP, buff=0.12))
        self.au_mot("On vérifie")
        tit = self.t("On vérifie :", 44, JAUNE_TITRE)
        self.col(tit, 1.8, xl=0.9)
        self.play(FadeIn(tit, shift=UP * 0.1), run_time=0.3)
        self.poser_calcul([("30", C_COINS[1]), ("+", WHITE), ("80", C_COINS[2]), ("+", WHITE), ("70", VERT_OK), ("=", WHITE), ("180", WHITE)], 0.6,
                          [("30", 1, (0, 1)), ("80", 1, (2, 3)), ("70", 1, (4, 5)), ("180", 1, (6,))], fs=46)
        self.au_mot("C'est bon")
        v = self.tampon("C'est bon.", VERT_OK, 44)
        self.col(v, -0.75, xl=0.9)
        self.play(FadeIn(v, scale=1.2), run_time=0.3)
        self.attendre_voix()

    # ── 04 : QUESTION 1 ─────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        f = Tri.par_angles(40, 60, base=4.6, centre=P(-3.7, -1.5), sw=7, r_point=0.09)
        A, B, C = f.sommets
        s1, s2 = secteur(B, A, C, 0.95, C_COINS[1]), secteur(C, A, B, 0.7, C_COINS[2])
        e1, e2 = mesure(B, A, C, "40°", 1.35, 28, C_COINS[1]), mesure(C, A, B, "60°", 1.05, 28, C_COINS[2])
        d = etq("?", 50, JAUNE_TITRE).next_to(A, UP, buff=0.1)
        rep = etq("80°", 40, VERT_OK).next_to(A, UP, buff=0.1)

        def avant(sc):
            sc.play(FadeIn(f), FadeIn(d), run_time=0.3)
            for g, mot in ((VGroup(s1, e1), "40"), (VGroup(s2, e2), "60")):
                t_k = sc.renderer.time + sc.t_mot(mot)
                g.set_opacity(0)
                g.add_updater(lambda m, t_k=t_k: m.set_opacity(1 if sc.renderer.time >= t_k else 0))
                sc.add(g)

        def apres(sc):
            sc.play(FadeOut(d), FadeIn(rep, scale=1.5), run_time=0.3)
            sc.rep(0)
            sc.rep(1)
            sc.rep_fin()

        self.question_pause("04-question", "04b-reponse", ["Angles : 40° et 60°.", "Et le troisième ?"],
                            [self.t("100°", 34), self.t("80°", 34), self.t("140°", 34)], 1,
                            ["40 + 60 = 100", "180 − 100 = 80°"], mot_q="Un triangle", avant_q=avant, autres_r=apres)

    # ── 05 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        self.au_mot("Attention")
        tit = self.t("Attention !", 50, ROUGE_ERREUR).move_to(P(0, 2.9))
        self.play(Write(tit), run_time=0.35)
        self.au_mot("Ne t'arrête")
        l1 = self.t("Ne t'arrête pas à l'addition.", 44).move_to(P(0, 1.7))
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("100")
        c = etq("100", 80, ROUGE_ERREUR).move_to(P(-4.3, 0.15))
        l2 = self.bloc(["ce sont les deux", "angles connus ensemble."], 40).next_to(c, RIGHT, buff=0.55)
        self.play(FadeIn(c, scale=1.4), run_time=0.3)
        self.au_mot("ce sont")
        self.play(FadeIn(l2, shift=RIGHT * 0.1), run_time=0.35)
        self.au_mot("Il faut")
        l3 = self.t("Il faut encore retirer de 180.", 44, VERT_OK).move_to(P(0, -1.5))
        self.play(FadeIn(l3, scale=1.1), run_time=0.35)
        self.attendre_voix()

    # ── 06 : le triangle rectangle ──────────────────────────────────────────
    def ecran_rectangle(self):
        self.ecran("06-rectangle")
        f = Tri.par_angles(90, 40, base=5.0, centre=P(-4.0, -0.75), sw=8, r_point=0.11)
        A, B, C = f.sommets
        self.add(f)
        self.au_mot("Dans un triangle")
        l1 = self.t("Dans un triangle rectangle,", 36)
        self.col(l1, 2.75, xl=0.1)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("le petit carré")
        l2 = self.t("le petit carré veut dire 90°.", 36, AMBRE)
        self.col(l2, 2.05, xl=0.1)
        cd = coin_droit(B, A, C, 0.42)
        self.play(Create(cd), run_time=0.25)
        e90 = etq("90°", 36, AMBRE).move_to(B + P(0.9, 0.34))
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(e90, scale=1.4), run_time=0.3)
        self.au_mot("Un autre angle")
        l3 = self.t("Un autre angle mesure 40°.", 36, C_COINS[2])
        self.col(l3, 1.3, xl=0.1)
        s = secteur(C, A, B, 1.05, C_COINS[2])
        e40 = mesure(C, A, B, "40°", 1.5, 34, C_COINS[2])
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(s), FadeIn(e40, scale=1.3), run_time=0.22)
        self.poser_calcul([("40", C_COINS[2]), ("+", WHITE), ("90", AMBRE), ("=", WHITE), ("130", WHITE)], 0.2,
                          [("40 plus", 1, (0, 1)), ("90 :", 1, (2, 3)), ("130", 1, (4,))], xl=0.6)
        self.poser_calcul([("180", WHITE), ("−", WHITE), ("130", WHITE), ("=", WHITE), ("50°", VERT_OK)], -0.9,
                          [("180", 1, (0, 1)), ("130", 2, (2, 3)), ("50", 1, (4,))], xl=0.6)
        self.au_mot("50")
        sa = secteur(A, B, C, 0.75, VERT_OK)
        ea = mesure(A, B, C, "50°", 1.2, 34, VERT_OK)
        self.play(FadeIn(sa), FadeIn(ea, scale=1.3), run_time=0.3)
        self.attendre_voix()

    # ── 07 : QUESTION 2 ─────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        f = Tri.par_angles(90, 35, base=4.6, centre=P(-4.2, -1.65), sw=7, r_point=0.09)
        A, B, C = f.sommets
        cd = coin_droit(B, A, C, 0.36)
        s2 = secteur(C, A, B, 0.95, C_COINS[2])
        e2 = mesure(C, A, B, "35°", 1.4, 30, C_COINS[2])
        d = etq("?", 46, JAUNE_TITRE).next_to(A, RIGHT, buff=0.12)
        rep = etq("55°", 38, VERT_OK).next_to(A, RIGHT, buff=0.12)

        def avant(sc):
            sc.play(FadeIn(f), Create(cd), FadeIn(d), run_time=0.3)
            t_k = sc.renderer.time + sc.t_mot("35")
            g = VGroup(s2, e2).set_opacity(0)
            g.add_updater(lambda m: m.set_opacity(1 if sc.renderer.time >= t_k else 0))
            sc.add(g)

        def apres(sc):
            sc.play(FadeOut(d), FadeIn(rep, scale=1.5), run_time=0.3)

        self.question_pause("07-question", "07b-reponse", ["Triangle rectangle :", "un angle de 35°.", "Et le troisième ?"],
                            [self.t("145°", 34), self.t("65°", 34), self.t("55°", 34)], 2,
                            ["90 + 35 = 125", "180 − 125 = 55°"], mot_q="Un triangle", avant_q=avant, autres_r=apres)

    # ── 08 : le triangle isocèle ────────────────────────────────────────────
    def ecran_isocele(self):
        self.ecran("08-isocele")
        f = Tri.par_angles(70, 70, base=2.9, centre=P(-4.1, -0.65), sw=8, r_point=0.11)
        A, B, C = f.sommets
        self.add(f, codage(A, B, 1), codage(A, C, 1))
        self.au_mot("Et un triangle")
        l1 = self.t("Et un triangle isocèle ?", 40, JAUNE_TITRE)
        self.col(l1, 2.85, xl=-1.1)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Ses deux angles")
        l2 = self.t("Ses deux angles du bas sont égaux.", 36)
        self.col(l2, 2.1, xl=-1.1)
        s1, s2 = secteur(B, A, C, 0.6, C_COINS[1]), secteur(C, A, B, 0.6, C_COINS[1])
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(s1), FadeIn(s2), run_time=0.35)
        self.au_mot("L'angle du haut")
        l3 = self.t("L'angle du haut mesure 40°.", 36, C_COINS[0])
        self.col(l3, 1.35, xl=-1.1)
        sa = secteur(A, B, C, 0.85, C_COINS[0])
        ea = etq("40°", 36, C_COINS[0]).next_to(A, UP, buff=0.12)
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(sa), FadeIn(ea, scale=1.3), run_time=0.35)
        self.poser_calcul([("180", WHITE), ("−", WHITE), ("40", C_COINS[0]), ("=", WHITE), ("140", AMBRE)], 0.35,
                          [("180", 1, (0, 1)), ("40 :", 1, (2, 3)), ("140", 1, (4,))], xl=-1.1)
        self.au_mot("On partage")
        l4 = self.t("On partage en deux :", 36)
        self.col(l4, -0.55, xl=-1.1)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.3)
        self.poser_calcul([("140", AMBRE), ("÷", WHITE), ("2", WHITE), ("=", WHITE), ("70", VERT_OK)], -1.4,
                          [("140", 2, (0, 1)), ("divisé par 2", 1, (2, 3)), ("70", 1, (4,))], xl=-1.1)
        self.au_mot("Chaque angle")
        v = self.t("Chaque angle du bas : 70°.", 38, VERT_OK)
        self.col(v, -2.3, xl=-1.1)
        e1, e2 = mesure(B, A, C, "70°", 0.98, 30, VERT_OK), mesure(C, A, B, "70°", 0.98, 30, VERT_OK)
        self.play(FadeIn(v, shift=UP * 0.1), run_time=0.3)
        self.au_mot("70 degrés")
        self.play(FadeIn(e1, scale=1.3), FadeIn(e2, scale=1.3), run_time=0.25)
        self.attendre_voix()

    # ── 09 : le défi ────────────────────────────────────────────────────────
    def figure_defi(self):
        return Tri.par_angles(40, 40, base=5.0, centre=P(-3.6, -0.95), sw=9, couleur=BOIS, fond=0.14, r_point=0.11)

    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        f = self.figure_defi()
        A, B, C = f.sommets
        self.add(f)
        self.au_mot("Le toit")
        l1 = self.bloc(["Le toit de la cabane est", "un triangle isocèle."], 34)
        self.col(l1, 2.05, xl=0.5)
        self.play(FadeIn(l1, shift=UP * 0.1), Create(codage(A, B, 1)), Create(codage(A, C, 1)), run_time=0.35)
        self.au_mot("L'angle du haut")
        l2 = self.t("L'angle du haut : 100°.", 38, C_COINS[0])
        self.col(l2, 0.95, xl=0.5)
        sa = secteur(A, B, C, 0.55, C_COINS[0])
        ea = etq("100°", 38, C_COINS[0]).next_to(A, UP, buff=0.12)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(sa), FadeIn(ea, scale=1.3), run_time=0.35)
        self.au_mot("Combien")
        l3 = self.bloc(["Combien mesurent les", "deux angles du bas ?"], 36, ORANGE_RETENUE)
        self.col(l3, -0.1, xl=0.5)
        s1, s2 = secteur(B, A, C, 0.9, C_COINS[1]), secteur(C, A, B, 0.9, C_COINS[1])
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(s1), FadeIn(s2), run_time=0.35)
        self.pause_defi(y=-1.3)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        f = self.figure_defi()
        A, B, C = f.sommets
        s1, s2 = secteur(B, A, C, 0.9, C_COINS[1]), secteur(C, A, B, 0.9, C_COINS[1])
        self.add(f, codage(A, B, 1), codage(A, C, 1), secteur(A, B, C, 0.55, C_COINS[0]),
                 etq("100°", 38, C_COINS[0]).next_to(A, UP, buff=0.12), s1, s2)
        self.play(Write(tit), run_time=0.35)
        self.poser_calcul([("180", WHITE), ("−", WHITE), ("100", C_COINS[0]), ("=", WHITE), ("80", AMBRE)], 2.05,
                          [("180", 1, (0, 1)), ("100", 1, (2, 3)), ("80.", 1, (4,))], xl=0.6)
        self.au_mot("Les deux angles")
        l = self.bloc(["Les deux angles du bas", "se partagent 80."], 34)
        self.col(l, 0.95, xl=0.6)
        self.play(FadeIn(l, shift=UP * 0.1), run_time=0.3)
        self.poser_calcul([("80", AMBRE), ("÷", WHITE), ("2", WHITE), ("=", WHITE), ("40", VERT_OK)], -0.2,
                          [("80 divisé", 1, (0, 1)), ("par 2", 1, (2, 3)), ("40", 1, (4,))], xl=0.6)
        self.au_mot("Chacun")
        v = self.tampon("Chacun mesure 40°.", VERT_OK, 38)
        self.col(v, -1.3, xl=0.6)
        e1, e2 = mesure(B, A, C, "40°", 1.35, 32, VERT_OK), mesure(C, A, B, "40°", 1.35, 32, VERT_OK)
        self.play(FadeIn(v, scale=1.15), run_time=0.3)
        self.au_mot("40 degrés")
        self.play(FadeIn(e1, scale=1.3), FadeIn(e2, scale=1.3), run_time=0.25)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        f = Tri.par_angles(30, 80, base=3.4, centre=P(0, 0), sw=7, couleur=BOIS, fond=0.14, r_point=0.09)
        A, B, C = f.sommets
        d = VGroup(f, secteur(B, A, C, 0.75, C_COINS[1]), secteur(C, A, B, 0.45, C_COINS[2]), secteur(A, B, C, 0.45, VERT_OK))
        d.figer = None
        self.add(d)
        lignes = self.finale_colonne(figure=d, textes=[
            ("Pour trouver l'angle qui manque,", "on ajoute les deux angles connus,", "puis on retire de 180."),
            ("Dans un triangle isocèle,", "les deux angles du bas", "sont égaux.")], fs=36)
        self.au_mot("Pour trouver")
        self.montrer_ligne(lignes[0])
        self.au_mot("Dans un triangle")
        self.montrer_ligne(lignes[1])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_methode()
        self.ecran_verifier()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_rectangle()
        self.ecran_question2()
        self.ecran_isocele()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class TriangleAngleManquant6e(TriangleAngleManquantBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
