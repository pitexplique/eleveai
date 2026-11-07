# triangle_somme_angle.py
# EleveAI — Maths 6e — série « Triangles », épisode 06 : LA SOMME DES ANGLES
# (micro triangle_somme_angle, notion triangle_propriete), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : film Ti Margo (prototypes/ti-margo/films/triangles.js, épisode somme-angle).
# Décor et métier : Lucie, GUIDE dans un musée des sciences ; Blaise Pascal (centres : sciences, histoire-geographie).
# Voix : manim/voix/6e-triangle-somme-angle.json ; marques : triangle_somme_angle_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/triangle_somme_angle.py TriangleSommeAngle6e
# python -m manim render -qh --disable_caching manim/scripts/6e/triangle_somme_angle.py TriangleSommeAngle6e -o eleveai-maths-6e-triangle-somme-angle --media_dir manim/scripts/6e/media-tri-06
# Sortie : manim/sorties/6e/maths/triangles/06-somme-angle/eleveai-maths-6e-triangle-somme-angle.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403
from canvas_angles import *  # noqa: E402,F403
from canvas_triangles import *  # noqa: E402,F403
from triangle_propriete_commun import *  # noqa: E402,F403

PAPIER = "#fef3c7"
O_PLAT = (-3.45, -1.75)
R_PLAT = 2.25


def lucie(s=1.0):
    """Lucie : son badge de guide."""
    p = visage(personne(peau="#e0ac69", tenue="#0f766e", cheveux="#7c2d12", longs=True, s=s))
    badge = RoundedRectangle(width=0.42 * s, height=0.26 * s, corner_radius=0.04 * s, fill_color=WHITE, fill_opacity=1,
                             stroke_width=0).move_to(p.corps.get_center() + P(-0.18, 0.28) * s)
    p.add(badge)
    return p


def pascal(s=1.0):
    """Blaise Pascal enfant : ses cheveux longs et son col blanc."""
    p = visage(personne(peau="#f1c27d", tenue="#1e293b", cheveux="#3f2a14", longs=True, s=s))
    col = Polygon(P(-0.3, -0.42) * s, P(0.3, -0.42) * s, P(0, -0.8) * s, fill_color=WHITE, fill_opacity=1, stroke_width=0)
    col.move_to(p.corps.get_top() + DOWN * 0.16 * s)
    p.add(col)
    return p


def papier(centre=(-1.0, 0.0), base=5.0, r=1.05):
    """Le triangle de papier : 80° en haut, 60° à gauche, 40° à droite, ses trois coins en couleur."""
    f = Tri.par_angles(60, 40, base=base, centre=P(*centre), sw=5, couleur="#f8fafc", fond=1.0, r_point=0.001)
    f.fond.set_fill(PAPIER, 1)
    A, B, C = f.sommets
    f.coins = VGroup(secteur(B, A, C, r, C_COINS[1]), secteur(A, B, C, r, C_COINS[0]), secteur(C, A, B, r, C_COINS[2]))
    return f


def coins_plats():
    """Les trois coins, pointes ensemble : 60 + 80 + 40 ferment exactement un demi-tour."""
    return VGroup(secteur_a(P(*O_PLAT), 0, 60, R_PLAT, C_COINS[1]), secteur_a(P(*O_PLAT), 60, 80, R_PLAT, C_COINS[0]),
                  secteur_a(P(*O_PLAT), 140, 40, R_PLAT, C_COINS[2]))


def droite_plate():
    o = P(*O_PLAT)
    return Line(o + LEFT * 2.75, o + RIGHT * 2.75, color=WHITE, stroke_width=7)


def arc_plat():
    return Arc(radius=R_PLAT + 0.22, start_angle=0, angle=PI, arc_center=P(*O_PLAT), stroke_color=FAMILLE["plat"], stroke_width=7)


class TriangleSommeAngleBase(FinTriangles, PaysageProp):
    nom_voix = "6e-triangle-somme-angle"
    fichier_marques = "triangle_somme_angle_marques.json"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("La somme des angles", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("La somme")
        f = papier((4.0, 0.3), 4.2, 0.8)
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(f), run_time=0.7)
        self.au_mot("Que se passe")
        q = self.bloc(["Que se passe-t-il si on", "recolle ses trois coins ?"], 40).move_to(P(-2.3, 0.4))
        self.play(FadeIn(q[0], shift=UP * 0.2), run_time=0.35)
        self.au_mot("recolle")
        self.play(FadeIn(q[1], shift=UP * 0.2), LaggedStart(*[FadeIn(c, scale=1.4) for c in f.coins], lag_ratio=0.2), run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 01 : Lucie, guide de musée ──────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        lu = lucie(1.05).move_to(P(-4.9, 0.2))
        self.au_mot("Voici Lucie")
        nom = self.t("Lucie", 44, BLEU_CALCUL).next_to(lu, UP, buff=0.2)
        self.play(FadeIn(lu, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("guide")
        met = self.bloc(["guide dans un", "musée des sciences"], 30, BLEU_CALCUL).next_to(lu, DOWN, buff=0.18).set_x(-4.6)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("triangle en papier")
        f = papier((-0.3, 0.7), 4.6)
        lab = self.t("Un triangle en papier", 34, AMBRE).move_to(P(-0.3, 3.0))
        self.play(FadeIn(f, scale=0.7), FadeIn(lab), run_time=0.5)
        self.au_mot("Sa consigne")
        cons = self.t("Sa consigne :", 36).move_to(P(4.3, 1.3))
        self.play(FadeIn(cons, shift=UP * 0.1), run_time=0.3)
        self.au_mot("déchire")
        dec = self.bloc(["Déchire", "les trois coins !"], 42, JAUNE_TITRE).move_to(P(4.3, 0.1))
        A, B, C = f.sommets
        coupes = VGroup(*[DashedLine(s + (a - s) / np.linalg.norm(a - s) * 1.05, s + (b - s) / np.linalg.norm(b - s) * 1.05,
                                     color="#475569", stroke_width=3)
                          for s, a, b in ((A, B, C), (B, A, C), (C, A, B))])
        self.play(FadeIn(dec, scale=1.15), Create(coupes), run_time=0.45)
        self.au_mot("coins")
        self.play(LaggedStart(*[FadeIn(c) for c in f.coins], lag_ratio=0.1), run_time=0.3)
        self.play(*[c.animate.shift((c.get_center() - f.centre_) * 0.28) for c in f.coins], run_time=0.5)
        self.attendre_voix()

    # ── 02 : les coins côte à côte ──────────────────────────────────────────
    def ecran_coins(self):
        self.ecran("02-coins")
        f = papier((-3.45, 0.95), 4.2)
        for c in f.coins:
            c.shift((c.get_center() - f.centre_) * 0.28)
        trou = VGroup(f.fond, f.cotes).set_opacity(0.18)
        self.add(trou, f.coins)
        cibles = coins_plats()
        self.au_mot("On pose")
        tit = self.bloc(["On pose les trois coins", "côte à côte,"], 38)
        self.col(tit, 2.6, xl=0.8)
        self.play(FadeIn(tit, shift=UP * 0.1), FadeOut(trou), run_time=0.4)
        self.au_mot("les pointes")
        pt = self.t("les pointes ensemble.", 38, AMBRE)
        self.col(pt, 1.2, xl=0.8)
        self.play(FadeIn(pt, shift=UP * 0.1), *[Transform(c, d) for c, d in zip(f.coins, cibles)], run_time=1.1)
        self.au_mot("Surprise")
        su = self.t("Surprise :", 42, JAUNE_TITRE)
        self.col(su, 0.2, xl=0.8)
        self.play(FadeIn(su, scale=1.2), run_time=0.3)
        self.au_mot("ligne droite")
        ld = self.t("une ligne droite !", 44, WHITE)
        self.col(ld, -0.65, xl=0.8)
        self.play(FadeIn(ld, scale=1.2), Create(droite_plate()), run_time=0.5)
        self.au_mot("angle plat")
        pl = self.tampon("Un angle plat", FAMILLE["plat"], 40)
        self.col(pl, -1.75, xl=0.8)
        self.play(FadeIn(pl, scale=1.2), Create(arc_plat()), run_time=0.5)
        self.attendre_voix()

    # ── 03 : 180 degrés ─────────────────────────────────────────────────────
    def ecran_180(self):
        self.ecran("03-180")
        cs = coins_plats()
        arc = arc_plat()
        self.add(cs, droite_plate(), arc)
        self.au_mot("Un angle plat")
        l1 = self.t("Un angle plat mesure 180°.", 36, FAMILLE["plat"])
        self.col(l1, 2.65, xl=0.3)
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(arc, color=FAMILLE["plat"], scale_factor=1.05), run_time=0.45)
        self.au_mot("Donc")
        l2 = self.t("Donc les trois angles font", 38, JAUNE_TITRE)
        self.col(l2, 1.55, xl=0.3)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        l2b = self.ligne([("180°", JAUNE_TITRE), ("en tout.", JAUNE_TITRE)], 38)
        self.col(l2b, 0.8, xl=0.3)
        self.au_mot("180", 2)
        self.play(FadeIn(l2b[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("en tout")
        self.play(FadeIn(l2b[1], shift=UP * 0.1), run_time=0.3)
        o = P(*O_PLAT)
        self.au_mot("Ici")
        ici = self.t("Ici :", 36)
        self.col(ici, -0.45, xl=0.3)
        self.play(FadeIn(ici), run_time=0.2)
        calc = self.ligne([("40°", C_COINS[2]), ("+", WHITE), ("60°", C_COINS[1]), ("+", WHITE), ("80°", C_COINS[0]), ("= 180°", VERT_OK)], 42)
        self.col(calc, -1.3, xl=0.3)
        for mot, i, dg, tx in (("40", 0, 160, "40°"), ("60", 1, 30, "60°"), ("plus 80", 2, 100, "80°")):
            self.au_mot(mot)
            e = etq(tx, 40, "#0f172a").move_to(o + 1.45 * np.array([np.cos(np.deg2rad(dg)), np.sin(np.deg2rad(dg)), 0.0]))
            anims = [FadeIn(calc[2 * i], shift=RIGHT * 0.1), FadeIn(e, scale=1.4), Indicate(cs[(2, 0, 1)[i]], scale_factor=1.04)]
            if i:
                anims.append(FadeIn(calc[2 * i - 1]))
            self.play(*anims, run_time=0.3)
        self.au_mot("180", 3)
        self.play(FadeIn(calc[5], scale=1.3), run_time=0.3)
        self.attendre_voix()

    # ── 04 : tous les triangles ─────────────────────────────────────────────
    def ecran_tous(self):
        self.ecran("04-tous")
        figs = [("Petit", Tri.par_angles(55, 70, base=1.5, centre=P(-5.3, 1.6), sw=5, r_point=0.05)),
                ("grand", Tri.par_angles(50, 65, base=3.7, centre=P(-1.7, 1.05), sw=6, r_point=0.07)),
                ("pointu", Tri.par_angles(80, 80, base=1.0, centre=P(-5.3, -1.5), sw=5, r_point=0.05)),
                ("aplati", Tri.par_angles(14, 18, base=4.6, centre=P(-1.7, -1.9), sw=6, r_point=0.07))]
        for mot, f in figs:
            self.au_mot(mot)
            lab = etq(mot, 36, AMBRE).next_to(f, DOWN, buff=0.2)
            self.play(Create(f.cotes), FadeIn(f.fond), FadeIn(f.dots), FadeIn(lab, shift=UP * 0.1), run_time=0.35)
        self.au_mot("c'est vrai")
        v = self.bloc(["C'est vrai pour", "tous les triangles."], 42, VERT_OK)
        self.col(v, 1.6, xl=1.1)
        self.play(FadeIn(v, scale=1.1), run_time=0.45)
        self.au_mot("Ça ne dépend")
        d = self.bloc(["Ça ne dépend pas", "de la taille."], 42, JAUNE_TITRE)
        self.col(d, -0.2, xl=1.1)
        self.play(FadeIn(d, shift=UP * 0.1), run_time=0.45)
        self.attendre_voix()

    # ── 05 : QUESTION 1 ─────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        pet = Tri.par_angles(55, 75, base=1.5, centre=P(-5.5, -1.75), sw=5, r_point=0.06)
        gra = Tri.par_angles(55, 75, base=3.0, centre=P(-2.9, -1.2), sw=6, r_point=0.08)

        def avant(sc):
            sc.play(FadeIn(pet), run_time=0.25)
            sc.play(FadeIn(gra, scale=0.6), run_time=0.5)

        self.question_pause("05-question", "05b-reponse", ["On agrandit un triangle :", "côtés deux fois plus longs.", "Trois angles, en tout ?"],
                            [self.t("90°", 34), self.t("180°", 34), self.t("360°", 34)], 1,
                            ["180°,", "pour tous les triangles."], avant_q=avant)

    # ── 06 : les deux autres ────────────────────────────────────────────────
    def ecran_deux_autres(self):
        self.ecran("06-deux-autres")
        f = Tri.par_angles(50, 30, base=5.4, centre=P(-3.3, -0.5), sw=8, r_point=0.11)
        A, B, C = f.sommets
        self.add(f)
        self.au_mot("Un angle mesure")
        s = secteur(A, B, C, 0.65, ARC)
        e = etq("100°", 40, AMBRE).next_to(A, UP, buff=0.2)
        l1 = self.t("Un angle mesure 100°.", 40, AMBRE)
        self.col(l1, 2.5, xl=0.9)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(s, scale=0.6), FadeIn(e, scale=1.4), run_time=0.4)
        self.au_mot("Combien")
        l2 = self.bloc(["Combien font les", "deux autres ensemble ?"], 40)
        self.col(l2, 1.0, xl=0.9)
        s2, s3 = secteur(B, A, C, 0.95, C_COINS[1]), secteur(C, A, B, 1.25, C_COINS[2])
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(s2), FadeIn(s3), run_time=0.4)
        self.au_mot("180 moins")
        c = self.ligne([("180", WHITE), ("−", WHITE), ("100", AMBRE), ("=", WHITE), ("80°", VERT_OK)], 56)
        self.col(c, -0.6, xl=0.9)
        self.play(FadeIn(c[0], shift=RIGHT * 0.1), FadeIn(c[1]), run_time=0.25)
        self.au_mot("100", 2)
        self.play(FadeIn(c[2], shift=RIGHT * 0.1), FadeIn(c[3]), run_time=0.25)
        self.au_mot("80 degrés")
        self.play(FadeIn(c[4], scale=1.5), Indicate(s2, color=VERT_OK), Indicate(s3, color=VERT_OK), run_time=0.45)
        self.attendre_voix()

    # ── 07 : le triangle rectangle ──────────────────────────────────────────
    def ecran_rectangle(self):
        self.ecran("07-rectangle")
        f = Tri.par_angles(90, 35, base=5.0, centre=P(-3.9, -0.7), sw=8, r_point=0.11)
        A, B, C = f.sommets
        self.add(f)
        self.au_mot("Dans un triangle")
        l1 = self.bloc(["Dans un triangle rectangle,", "l'angle droit prend déjà 90°."], 36)
        self.col(l1, 2.45, xl=0.3)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("l'angle droit")
        e90 = etq("90°", 38, AMBRE).move_to(B + P(0.95, 0.35))
        self.play(Create(coin_droit(B, A, C, 0.42)), run_time=0.25)
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(e90, scale=1.4), run_time=0.3)
        self.au_mot("Les deux autres")
        l2 = self.t("Les deux autres font", 40, JAUNE_TITRE)
        self.col(l2, 1.15, xl=0.3)
        sa, sc_ = secteur(A, B, C, 0.75, C_COINS[0]), secteur(C, A, B, 1.05, C_COINS[2])
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(sa), FadeIn(sc_), run_time=0.4)
        l2b = self.ligne([("90°", JAUNE_TITRE), ("à eux deux.", JAUNE_TITRE)], 40)
        self.col(l2b, 0.4, xl=0.3)
        self.au_mot("90", 2)
        self.play(FadeIn(l2b[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("à eux")
        self.play(FadeIn(l2b[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Par exemple")
        l3 = self.t("Par exemple :", 36)
        self.col(l3, -0.55, xl=0.3)
        self.play(FadeIn(l3), run_time=0.25)
        c = self.ligne([("35°", C_COINS[2]), ("et", WHITE), ("55°", C_COINS[0])], 56)
        self.col(c, -1.45, xl=0.3)
        self.au_mot("35")
        e35 = etq("35°", 34, C_COINS[2]).move_to(dans_angle(C, A, B, 1.6))
        self.play(FadeIn(c[0], scale=1.3), FadeIn(e35, scale=1.4), run_time=0.3)
        self.au_mot("55")
        e55 = etq("55°", 34, C_COINS[0]).move_to(dans_angle(A, B, C, 1.25))
        self.play(FadeIn(c[1]), FadeIn(c[2], scale=1.3), FadeIn(e55, scale=1.4), run_time=0.3)
        self.attendre_voix()

    # ── 08 : QUESTION 2 ─────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        f = Tri.par_angles(35, 25, base=4.6, centre=P(-3.6, -1.6), sw=7, r_point=0.09)
        A, B, C = f.sommets
        s = secteur(A, B, C, 0.5, ARC)
        e = etq("120°", 36, AMBRE).next_to(A, UP, buff=0.15)
        s2, s3 = secteur(B, A, C, 0.95, C_COINS[1]), secteur(C, A, B, 1.25, C_COINS[2])

        def avant(sc):
            sc.play(FadeIn(f), run_time=0.3)
            t_e = sc.renderer.time + sc.t_mot("120")
            g = VGroup(s, e).set_opacity(0)
            g.add_updater(lambda m: m.set_opacity(1 if sc.renderer.time >= t_e else 0))
            sc.add(g)

        def apres(sc):
            sc.play(FadeIn(s2), FadeIn(s3), run_time=0.4)

        self.question_pause("08-question", "08b-reponse", ["Un angle de 120°.", "Combien font ses deux", "autres angles ensemble ?"],
                            [self.t("60°", 34), self.t("180°", 34), self.t("300°", 34)], 0,
                            ["180 − 120 = 60°"], mot_q="Un triangle", avant_q=avant, autres_r=apres)

    # ── 09 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("09-piege")
        self.au_mot("Attention")
        tit = self.t("Attention !", 50, ROUGE_ERREUR)
        self.col(tit, 2.8, xl=0.9)
        r = Rapporteur(centre=P(-3.5, -1.8), rayon=2.9)
        self.play(Write(tit), FadeIn(r), run_time=0.45)
        self.au_mot("Au rapporteur")
        l1 = self.t("Au rapporteur, tu trouveras", 34)
        self.col(l1, 1.75, xl=0.9)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("peut-être")
        l2 = self.ligne([("peut-être", WHITE), ("179", ROUGE_ERREUR), ("ou", WHITE), ("181°.", ROUGE_ERREUR)], 38)
        self.col(l2, 1.0, xl=0.9)
        self.play(FadeIn(l2[0]), run_time=0.2)
        self.au_mot("179")
        self.play(FadeIn(l2[1], scale=1.3), FadeIn(l2[2]), run_time=0.25)
        self.au_mot("181")
        self.play(FadeIn(l2[3], scale=1.3), run_time=0.25)
        self.au_mot("La règle")
        l3 = self.t("La règle n'est pas fausse.", 40, VERT_OK)
        self.col(l3, -0.1, xl=0.9)
        self.play(FadeIn(l3, scale=1.1), run_time=0.35)
        self.au_mot("C'est ta mesure")
        l4 = self.bloc(["C'est ta mesure :", "elle n'est jamais parfaite."], 38, AMBRE)
        self.col(l4, -1.35, xl=0.9)
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("elle n'est")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 10 : Blaise Pascal ──────────────────────────────────────────────────
    def ecran_histoire(self):
        self.ecran("10-histoire")
        pa = pascal(1.1).move_to(P(-4.7, 0.0))
        self.au_mot("Blaise")
        nom = self.t("Blaise Pascal", 44, BLEU_CALCUL).next_to(pa, UP, buff=0.2)
        self.play(FadeIn(pa, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("aurait")
        l1 = self.bloc(["aurait trouvé cette règle", "tout seul,"], 40)
        self.col(l1, 2.5, xl=-1.9)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("tout seul")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("vers 12")
        l2 = self.t("vers 12 ans,", 54, AMBRE)
        self.col(l2, 0.95, xl=-1.9)
        self.play(FadeIn(l2, scale=1.25), run_time=0.35)
        self.au_mot("d'après")
        l3 = self.t("d'après sa sœur.", 38)
        self.col(l3, 0.05, xl=-1.9)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Sans rapporteur")
        l4 = self.t("Sans rapporteur,", 40, ROUGE_ERREUR)
        self.col(l4, -1.0, xl=-1.9)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.3)
        self.au_mot("juste")
        l5 = self.t("juste en cherchant.", 44, VERT_OK)
        self.col(l5, -1.95, xl=-1.9)
        self.play(FadeIn(l5, scale=1.15), run_time=0.35)
        self.attendre_voix()

    # ── 11 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("11-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        for mot, debut, y, vals in (("Un triangle", "Un triangle :", 1.75, (("70°", 1), ("60°", 1), ("50°", 1))),
                                    ("Un autre", "Un autre :", 0.45, (("70°", 2), ("60°", 2), ("60°", 3)))):
            self.au_mot(mot)
            tete = self.t(debut, 40).move_to(P(-4.4, y)).align_to(P(-6.2, 0), LEFT)
            self.play(FadeIn(tete, shift=UP * 0.1), run_time=0.25)
            lg = VGroup(*[etq(v, 50, AMBRE) for v, _ in vals]).arrange(RIGHT, buff=0.5).move_to(P(0.4, y))
            for i, (v, n) in enumerate(vals):
                self.au_mot(v[:-1], n)
                self.play(FadeIn(lg[i], scale=1.3), run_time=0.22)
        self.au_mot("Lequel")
        l3 = self.t("Lequel peut exister ?", 46, ORANGE_RETENUE).move_to(P(0, -0.9))
        self.play(FadeIn(l3, shift=UP * 0.15), run_time=0.35)
        self.pause_defi(y=-2.0)

    def ecran_correction(self):
        self.ecran("11b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)

        def calcul(valeurs, y, couleur, mots):
            l = VGroup(etq(valeurs[0], 54), etq("+", 54), etq(valeurs[1], 54), etq("+", 54), etq(valeurs[2], 54), etq("=", 54),
                       etq(valeurs[3], 54, couleur)).arrange(RIGHT, buff=0.26)
            l.move_to(P(0, y)).align_to(P(-5.8, 0), LEFT)
            for i, (m, n) in enumerate(mots):
                self.au_mot(m, n)
                if i == 0:
                    self.play(FadeIn(l[0], shift=RIGHT * 0.1), run_time=0.2)
                elif i < 3:
                    self.play(FadeIn(l[2 * i - 1]), FadeIn(l[2 * i], shift=RIGHT * 0.1), run_time=0.2)
                else:
                    self.play(FadeIn(l[5]), FadeIn(l[6], scale=1.4), run_time=0.25)
            return l
        calcul(["70", "60", "50", "180"], 1.95, VERT_OK, [("70", 1), ("60", 1), ("50", 1), ("180", 1)])
        self.au_mot("Ce triangle existe")
        v1 = self.tampon("Ce triangle existe.", VERT_OK, 40)
        v1.move_to(P(0, 0.95)).align_to(P(-5.8, 0), LEFT)
        self.play(FadeIn(v1, scale=1.15), run_time=0.35)
        calcul(["70", "60", "60", "190"], -0.2, ROUGE_ERREUR, [("70", 2), ("60", 2), ("60", 3), ("190", 1)])
        self.au_mot("Ce n'est pas")
        np_ = self.t("Ce n'est pas 180 :", 40, ROUGE_ERREUR).move_to(P(0, -1.2)).align_to(P(-5.8, 0), LEFT)
        self.play(FadeIn(np_, shift=UP * 0.1), run_time=0.3)
        self.au_mot("ce triangle n'existe")
        v2 = self.tampon("ce triangle n'existe pas.", ROUGE_ERREUR, 40)
        v2.move_to(P(0, -2.2)).align_to(P(-5.8, 0), LEFT)
        self.play(FadeIn(v2, scale=1.15), run_time=0.35)
        self.attendre_voix()

    # ── 12 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("12-finale", 0.65)
        o = P(0, 0)
        f = VGroup(secteur_a(o, 0, 60, 2.2, C_COINS[1]), secteur_a(o, 60, 80, 2.2, C_COINS[0]), secteur_a(o, 140, 40, 2.2, C_COINS[2]),
                   Line(o + LEFT * 2.5, o + RIGHT * 2.5, color=WHITE, stroke_width=6)).scale(0.8)
        f.figer = None
        self.add(f)
        lignes = self.finale_colonne(figure=f, textes=[
            ("Dans tout triangle, trois", "angles : 180° en tout."),
            ("Cela ne dépend pas", "de la taille."),
            ("Triangle rectangle : les deux", "autres font 90° à eux deux.")], fs=36)
        self.au_mot("Dans tout")
        self.montrer_ligne(lignes[0])
        self.au_mot("Cela ne")
        self.montrer_ligne(lignes[1])
        self.au_mot("Dans un triangle rectangle")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_coins()
        self.ecran_180()
        self.ecran_tous()
        self.ecran_question1()
        self.ecran_deux_autres()
        self.ecran_rectangle()
        self.ecran_question2()
        self.ecran_piege()
        self.ecran_histoire()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("13-abonne")


class TriangleSommeAngle6e(TriangleSommeAngleBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
