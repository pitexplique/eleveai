# triangle_propriete_defi.py
# EleveAI — Maths 6e — série « Triangles », épisode 09 : DÉFIS, ANGLES ET TRIANGLES POSSIBLES
# (micro triangle_propriete_defi, notion triangle_propriete), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : film Ti Margo (prototypes/ti-margo/films/triangles.js, épisode propriete-defi).
# Décor et métier : Sarah, JOURNALISTE qui vérifie ce qu'on lit en ligne (centres : reseaux-sociaux, jeux-defis).
# ⭐ Vraies mesures : deux côtés parallèles pour deux angles droits ; 179° vraiment aplati ;
#   deux triangles de mêmes angles et de tailles différentes.
# Voix : manim/voix/6e-triangle-propriete-defi.json ; marques : triangle_propriete_defi_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/triangle_propriete_defi.py TriangleProprieteDefi6e
# python -m manim render -qh --disable_caching manim/scripts/6e/triangle_propriete_defi.py TriangleProprieteDefi6e -o eleveai-maths-6e-triangle-propriete-defi --media_dir manim/scripts/6e/media-tri-09
# Sortie : manim/sorties/6e/maths/triangles/09-propriete-defi/eleveai-maths-6e-triangle-propriete-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403
from canvas_angles import *  # noqa: E402,F403
from canvas_triangles import *  # noqa: E402,F403
from triangle_propriete_commun import *  # noqa: E402,F403


def sarah(s=1.0):
    """Sarah : son carnet de journaliste."""
    p = visage(personne(peau="#5c3a21", tenue="#be123c", cheveux="#0f172a", longs=True, s=s))
    carnet = RoundedRectangle(width=0.62 * s, height=0.78 * s, corner_radius=0.05 * s, fill_color=WHITE, fill_opacity=1,
                              stroke_width=0).move_to(p.corps.get_center() + P(0.22, 0.0) * s)
    lignes = VGroup(*[Line(P(-0.2, y) * s, P(0.2, y) * s, color="#475569", stroke_width=3) for y in (0.2, 0.05, -0.1, -0.25)])
    lignes.move_to(carnet)
    p.add(carnet, lignes)
    return p


def ecran_tel(centre=ORIGIN):
    """Un écran de téléphone : trois phrases lues en ligne, chacune avec son point d'interrogation."""
    c = np.array(centre, dtype=float)
    fond = RoundedRectangle(width=2.5, height=4.6, corner_radius=0.22, fill_color="#0f172a", fill_opacity=1, stroke_color="#94a3b8", stroke_width=5).move_to(c)
    bulles = VGroup()
    for i, y in enumerate((1.4, 0.45, -0.5, -1.45)):
        b = RoundedRectangle(width=2.0, height=0.68, corner_radius=0.14, fill_color="#334155", fill_opacity=1, stroke_width=0).move_to(c + UP * y)
        tr = VGroup(*[Line(b.get_left() + RIGHT * 0.2 + UP * d, b.get_left() + RIGHT * (1.2 if d > 0 else 0.95) + UP * d, color="#cbd5e1", stroke_width=4) for d in (0.12, -0.12)])
        q = etq("?", 34, JAUNE_TITRE).move_to(b.get_right() + LEFT * 0.3)
        bulles.add(VGroup(b, tr, q))
    g = VGroup(fond, bulles)
    g.bulles = bulles
    return g


class TriangleProprieteDefiBase(CalculAuMot, FinTriangles, PaysageProp):
    nom_voix = "6e-triangle-propriete-defi"
    fichier_marques = "triangle_propriete_defi_marques.json"

    def tete_phrase(self, s, y=2.9, xl=0.5):
        t = self.t(s, 38, BLEU_CALCUL)
        self.col(t, y, xl=xl)
        self.play(FadeIn(t, shift=UP * 0.1), run_time=0.3)
        return t

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défis : angles et triangles possibles", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Défis")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.au_mot("Peut-on")
        q = self.bloc(["Peut-on croire tout ce qu'on", "lit sur les triangles ?"], 40).move_to(P(-1.9, 0.5))
        t = ecran_tel(P(4.7, 0.75)).scale(0.72)
        self.play(FadeIn(q, shift=UP * 0.2), FadeIn(t, shift=LEFT * 0.2), run_time=0.45)
        self.attendre_voix(marge=0.6)

    # ── 01 : Sarah, journaliste ─────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        sa = sarah(1.05).move_to(P(-5.0, 0.2))
        self.au_mot("Voici Sarah")
        nom = self.t("Sarah", 44, BLEU_CALCUL).next_to(sa, UP, buff=0.2)
        self.play(FadeIn(sa, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("journaliste")
        met = self.t("journaliste", 34, BLEU_CALCUL).next_to(sa, DOWN, buff=0.18)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("Son métier")
        l1 = self.bloc(["Son métier : vérifier", "ce qu'on lit en ligne."], 38).move_to(P(1.0, 2.35))
        tel = ecran_tel(P(-0.8, -0.75)).scale(0.68)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(tel.submobjects[0]), run_time=0.4)
        self.au_mot("Aujourd'hui")
        l2 = self.bloc(["Aujourd'hui, elle teste", "quatre phrases", "sur les triangles."], 36, AMBRE).move_to(P(3.0, -0.3))
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("quatre")
        self.play(FadeIn(l2[1], scale=1.15), LaggedStart(*[FadeIn(b, shift=RIGHT * 0.15) for b in tel.bulles], lag_ratio=0.2), run_time=0.7)
        self.au_mot("sur les")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 02 : deux angles droits ─────────────────────────────────────────────
    def ecran_deux_droits(self):
        self.ecran("02-deux-droits")
        self.au_mot("Première phrase")
        self.tete_phrase("Première phrase :")
        self.au_mot("j'ai tracé")
        l1 = self.bloc(["« J'ai tracé un triangle", "avec deux angles droits. »"], 34)
        self.col(l1, 2.0, xl=0.5)
        B, C = P(-5.4, -2.0), P(-1.6, -2.0)
        base = Line(B, C, color=COTE, stroke_width=8)
        cd1, cd2 = coin_droit(B, C, B + UP, 0.38), coin_droit(C, B, C + UP, 0.38)
        e1, e2 = etq("90°", 34, AMBRE).move_to(B + P(0.95, 0.32)), etq("90°", 34, AMBRE).move_to(C + P(-0.95, 0.32))
        self.play(FadeIn(l1, shift=UP * 0.1), Create(base), run_time=0.4)
        self.au_mot("deux angles")
        self.play(Create(cd1), Create(cd2), FadeIn(e1), FadeIn(e2), run_time=0.35)
        self.poser_calcul([("90", AMBRE), ("+", WHITE), ("90", AMBRE), ("=", WHITE), ("180", ROUGE_ERREUR)], 0.85,
                          [("90 plus", 1, (0, 1)), ("90 :", 1, (2, 3)), ("180. Il", 1, (4,))], xl=0.5)
        self.au_mot("Il ne reste")
        l2 = self.bloc(["Il ne reste rien pour", "le troisième angle."], 34)
        self.col(l2, -0.2, xl=0.5)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Les deux côtés")
        l3 = self.bloc(["Les deux côtés montent", "sans jamais se rejoindre."], 34, AMBRE)
        self.col(l3, -1.3, xl=0.5)
        c1, c2 = Arrow(B, B + UP * 5.3, buff=0, color=COTE, stroke_width=8, max_tip_length_to_length_ratio=0.06), Arrow(C, C + UP * 5.3, buff=0, color=COTE, stroke_width=8, max_tip_length_to_length_ratio=0.06)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.2)
        self.play(GrowArrow(c1), GrowArrow(c2), run_time=1.3)
        self.au_mot("Faux")
        v = self.tampon("Faux !", ROUGE_ERREUR, 50)
        self.col(v, -2.45, xl=2.0)
        self.play(FadeIn(v, scale=1.3), run_time=0.3)
        self.attendre_voix()

    # ── 03 : l'équilatéral ──────────────────────────────────────────────────
    def ecran_equilateral(self):
        self.ecran("03-equilateral")
        f = Tri.par_angles(60, 60, base=4.2, centre=P(-3.8, -0.8), sw=8, r_point=0.11)
        A, B, C = f.sommets
        self.au_mot("Deuxième phrase")
        self.tete_phrase("Deuxième phrase :")
        self.au_mot("un triangle")
        l1 = self.bloc(["« Un triangle équilatéral", "a trois angles égaux. »"], 36)
        self.col(l1, 2.0, xl=0.5)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(f), Create(codage(A, B, 1)), Create(codage(B, C, 1)), Create(codage(C, A, 1)), run_time=0.45)
        ss = VGroup(secteur(A, B, C, 0.75, C_COINS[0]), secteur(B, A, C, 0.75, C_COINS[1]), secteur(C, A, B, 0.75, C_COINS[2]))
        self.au_mot("égaux")
        self.play(LaggedStart(*[FadeIn(x, scale=0.7) for x in ss], lag_ratio=0.2), run_time=0.45)
        self.poser_calcul([("180", WHITE), ("÷", WHITE), ("3", WHITE), ("=", WHITE), ("60", VERT_OK)], 0.6,
                          [("180", 1, (0, 1)), ("divisé par 3", 1, (2, 3)), ("60.", 1, (4,))], xl=0.5, fs=56)
        self.au_mot("Chaque angle")
        l2 = self.t("Chaque angle mesure 60°.", 38, VERT_OK)
        self.col(l2, -0.5, xl=0.5)
        es = VGroup(*[mesure(s, a, b, "60°", 1.1, 32, c) for s, a, b, c in ((A, B, C, C_COINS[0]), (B, A, C, C_COINS[1]), (C, A, B, C_COINS[2]))])
        self.play(FadeIn(l2, shift=UP * 0.1), LaggedStart(*[FadeIn(e, scale=1.3) for e in es], lag_ratio=0.1), run_time=0.35)
        self.au_mot("Vrai")
        v = self.tampon("Vrai !", VERT_OK, 50)
        self.col(v, -1.75, xl=2.0)
        self.play(FadeIn(v, scale=1.3), run_time=0.3)
        self.attendre_voix()

    # ── 04 : QUESTION 1 ─────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        f = Tri.par_angles(90, 45, base=3.8, centre=P(-4.0, -1.1), sw=7, r_point=0.09)
        A, B, C = f.sommets
        cd = coin_droit(B, A, C, 0.38)
        gs = [(VGroup(etq("90°", 32, AMBRE).move_to(B + P(0.95, 0.32))), "90"),
              (VGroup(secteur(A, B, C, 0.7, C_COINS[0]), mesure(A, B, C, "45°", 1.15, 30, C_COINS[0])), "45"),
              (VGroup(secteur(C, A, B, 0.7, C_COINS[2]), mesure(C, A, B, "45°", 1.15, 30, C_COINS[2])), "et 45")]

        def avant(sc):
            sc.play(FadeIn(f), Create(cd), run_time=0.3)
            for g, mot in gs:
                t_k = sc.renderer.time + sc.t_mot(mot)
                g.set_opacity(0)
                g.add_updater(lambda m, t_k=t_k: m.set_opacity(1 if sc.renderer.time >= t_k else 0))
                sc.add(g)

        c3 = self.t("non, 45 est trop petit", 30)
        c3._pas_audit = True  # il attend « trop » : jamais en avance
        self.question_pause("04-question", "04b-reponse", ["Un triangle a des angles de", "90°, 45° et 45°.", "Est-ce possible ?"],
                            [self.t("oui, total : 180", 32), self.t("non, deux angles égaux", 30), c3], 0,
                            ["90 + 45 + 45 = 180.", "Rectangle isocèle."], mot_q="Un triangle", avant_q=avant)

    # ── 05 : 179 degrés ─────────────────────────────────────────────────────
    def ecran_179(self):
        self.ecran("05-179")
        self.au_mot("Troisième phrase")
        self.tete_phrase("Troisième phrase :", xl=-0.6)
        f0 = Tri.par_angles(25, 25, base=5.6, centre=P(-3.7, -0.8), sw=5, r_point=0.09)
        self.au_mot("un triangle peut")
        l1 = self.bloc(["« Un triangle peut avoir", "un angle de 179°. »"], 38)
        self.col(l1, 2.0, xl=-0.6)
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(f0), run_time=0.35)
        self.au_mot("un angle de")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        f1 = Tri.par_angles(0.5, 0.5, base=5.6, centre=P(-3.7, -0.8), sw=5, r_point=0.09)
        e = etq("179°", 40, AMBRE).move_to(f1.sommets[0] + UP * 0.55)
        self.play(Transform(f0, f1), FadeIn(e, scale=1.4), run_time=0.8)
        self.au_mot("Surprenant")
        v = self.tampon("Surprenant, mais vrai !", VERT_OK, 42)
        self.col(v, 0.65, xl=-0.6)
        self.play(FadeIn(v, scale=1.15), run_time=0.35)
        self.au_mot("Les deux autres")
        l2 = self.t("Les deux autres angles font", 36)
        self.col(l2, -0.45, xl=-0.6)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        l3 = self.ligne([("1°", AMBRE), ("à eux deux.", AMBRE)], 44)
        self.col(l3, -1.2, xl=-0.6)
        self.au_mot("1 degré")
        self.play(FadeIn(l3[0], scale=1.15), run_time=0.25)
        self.au_mot("à eux")
        self.play(FadeIn(l3[1], shift=RIGHT * 0.1), run_time=0.25)
        self.au_mot("Il est")
        l4 = self.t("Il est très aplati,", 36)
        self.col(l4, -2.05, xl=-0.6)
        self.play(FadeIn(l4, shift=UP * 0.1), Indicate(f0, scale_factor=1.03), run_time=0.35)
        self.au_mot("mais c'est")
        l5 = self.t("mais c'est un triangle.", 36, VERT_OK)
        self.col(l5, -2.7, xl=-0.6)
        self.play(FadeIn(l5, shift=UP * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 06 : QUESTION 2 ─────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        B, C = P(-5.1, -2.3), P(-2.0, -2.3)
        d = np.array([np.cos(np.deg2rad(95)), np.sin(np.deg2rad(95)), 0.0])
        d2 = np.array([-d[0], d[1], 0.0])
        base = Line(B, C, color=COTE, stroke_width=7)
        c1, c2 = Line(B, B + d * 3.4, color=COTE, stroke_width=7), Line(C, C + d2 * 3.4, color=COTE, stroke_width=7)
        s1, s2 = secteur(B, C, B + d, 0.55, C_COINS[1]), secteur(C, B, C + d2, 0.55, C_COINS[1])
        e1, e2 = mesure(B, C, B + d, "95°", 0.95, 30, C_COINS[1]), mesure(C, B, C + d2, "95°", 0.95, 30, C_COINS[1])

        def avant(sc):
            sc.play(Create(base), run_time=0.25)
            t_k = sc.renderer.time + sc.t_mot("95")
            g = VGroup(s1, s2, e1, e2).set_opacity(0)
            g.add_updater(lambda m: m.set_opacity(1 if sc.renderer.time >= t_k else 0))
            sc.add(g)

        def apres(sc):
            sc.play(Create(c1), Create(c2), run_time=0.3)

        c2_ = self.t("non, 95 + 95 > 180", 30)
        c2_._pas_audit = True  # il attend « 180 » : jamais en avance ; la coche le resserre à la réponse
        self.question_pause("06-question", "06b-reponse", ["Un triangle isocèle a deux", "angles du bas de 95°.", "Est-ce possible ?"],
                            [self.t("oui", 34), c2_, self.t("oui, s'il est très grand", 30)], 1,
                            ["95 + 95", "= 190.", "Déjà plus que 180."], mot_q="Un triangle", avant_q=avant, autres_r=apres)

    # ── 07 : les longueurs ──────────────────────────────────────────────────
    def ecran_longueurs(self):
        self.ecran("07-longueurs")
        self.au_mot("Quatrième phrase")
        self.tete_phrase("Quatrième phrase :", xl=0.3)
        self.au_mot("je connais")
        l1 = self.bloc(["« Je connais les trois angles,", "donc je connais", "la longueur des côtés. »"], 34)
        self.col(l1, 1.75, xl=0.3)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("donc")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.25)
        self.au_mot("la longueur")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.25)
        self.au_mot("Faux")
        v = self.tampon("Faux !", ROUGE_ERREUR, 50)
        self.col(v, 0.3, xl=2.0)
        self.play(FadeIn(v, scale=1.3), run_time=0.3)

        def tri_arcs(base, centre):
            f = Tri.par_angles(55, 70, base=base, centre=centre, sw=7, r_point=0.08)
            A, B, C = f.sommets
            r = 0.34 + base * 0.06
            return VGroup(f, secteur(A, B, C, r, C_COINS[0]), secteur(B, A, C, r, C_COINS[1]), secteur(C, A, B, r, C_COINS[2]))
        self.au_mot("Un petit")
        pet = tri_arcs(1.5, P(-5.5, -1.4))
        lp = self.t("Un petit triangle", 26, AMBRE).next_to(pet, DOWN, buff=0.2).set_x(-5.05)
        self.play(FadeIn(pet, scale=0.7), FadeIn(lp), run_time=0.35)
        self.au_mot("un grand")
        gra = tri_arcs(3.2, P(-1.6, -0.7))
        lg = self.t("un grand triangle", 30, AMBRE).next_to(gra, DOWN, buff=0.2).set_x(-1.6)
        self.play(FadeIn(gra, scale=0.7), FadeIn(lg), run_time=0.35)
        self.au_mot("peuvent")
        l2 = self.bloc(["peuvent avoir", "les mêmes angles."], 40, VERT_OK)
        self.col(l2, -1.3, xl=0.9)
        self.play(FadeIn(l2, shift=UP * 0.1), *[Indicate(g[i], scale_factor=1.15) for g in (pet, gra) for i in (1, 2, 3)], run_time=0.6)
        self.attendre_voix()

    # ── 08 : les deux tests ─────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("08-piege")
        self.au_mot("Attention")
        l0 = self.t("Attention à ne pas mélanger les deux tests !", 40, ROUGE_ERREUR).move_to(P(0, 2.95))
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        cadre1 = RoundedRectangle(width=6.0, height=3.9, corner_radius=0.18, stroke_color=C_COINS[1], stroke_width=4).move_to(P(-3.3, 0.1))
        cadre2 = RoundedRectangle(width=6.0, height=3.9, corner_radius=0.18, stroke_color=BOIS, stroke_width=4).move_to(P(3.3, 0.1))
        self.au_mot("Trois angles")
        t1 = self.t("Trois angles :", 40, C_COINS[1]).move_to(P(-3.3, 1.55))
        self.play(Create(cadre1), FadeIn(t1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("leur total")
        d1 = self.bloc(["leur total doit", "faire 180."], 42).move_to(P(-3.3, 0.1))
        self.play(FadeIn(d1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("Trois longueurs")
        t2 = self.t("Trois longueurs :", 40, BOIS).move_to(P(3.3, 1.55))
        self.play(Create(cadre2), FadeIn(t2, shift=UP * 0.1), run_time=0.35)
        self.au_mot("les deux plus")
        d2 = self.bloc(["les deux plus petites", "doivent dépasser", "la plus grande."], 36).move_to(P(3.3, -0.1))
        self.play(FadeIn(d2, shift=UP * 0.1), run_time=0.35)
        self.attendre_voix()

    # ── 09 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        self.au_mot("Deux phrases")
        l0 = self.t("Deux phrases à vérifier.", 38).move_to(P(0, 2.3))
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Une :")
        l1 = self.t("Une : ce triangle a un angle de", 36).move_to(P(0, 1.45)).align_to(P(-6.1, 0), LEFT)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        v1 = VGroup(etq("100°", 46, AMBRE), etq("et un angle de", 36), etq("90°.", 46, AMBRE)).arrange(RIGHT, buff=0.25)
        v1.move_to(P(0, 0.75)).align_to(P(-6.1, 0), LEFT)
        self.au_mot("100")
        self.play(FadeIn(v1[0], scale=1.25), run_time=0.22)
        self.au_mot("et un angle")
        self.play(FadeIn(v1[1]), run_time=0.22)
        self.au_mot("90")
        self.play(FadeIn(v1[2], scale=1.25), run_time=0.22)
        self.au_mot("Deux :")
        l2 = self.t("Deux : ce triangle a des côtés de", 36).move_to(P(0, -0.1)).align_to(P(-6.1, 0), LEFT)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        v2 = VGroup(etq("5 cm,", 46, AMBRE), etq("5 cm", 46, AMBRE), etq("et", 36), etq("9 cm.", 46, AMBRE)).arrange(RIGHT, buff=0.25)
        v2.move_to(P(0, -0.8)).align_to(P(-6.1, 0), LEFT)
        self.au_mot("5 centimètres")
        self.play(FadeIn(v2[0], scale=1.25), run_time=0.22)
        self.au_mot("5 centimètres", 2)
        self.play(FadeIn(v2[1], scale=1.25), run_time=0.22)
        self.au_mot("et 9")
        self.play(FadeIn(v2[2]), FadeIn(v2[3], scale=1.25), run_time=0.22)
        self.au_mot("Vrai ou")
        l3 = self.t("Vrai ou faux ?", 44, ORANGE_RETENUE).move_to(P(0, -1.7)).align_to(P(-6.1, 0), LEFT)
        self.play(FadeIn(l3, scale=1.1), run_time=0.3)
        self.pause_defi(y=-2.55)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)

        def rangee(y, morceaux, mots, fs=50):
            lg = VGroup(*[etq(t, fs, c) for t, c in morceaux]).arrange(RIGHT, buff=0.22)
            lg.move_to(P(0, y)).align_to(P(-6.1, 0), LEFT)
            for m, n, idx in mots:
                self.au_mot(m, n)
                self.play(*[FadeIn(lg[i], shift=RIGHT * 0.08) for i in idx], run_time=0.2)
            return lg

        rangee(2.1, [("100", WHITE), ("+", WHITE), ("90", WHITE), ("=", WHITE), ("190,", ROUGE_ERREUR), ("plus que", WHITE), ("180.", WHITE)],
               [("100 plus", 1, (0, 1)), ("90 :", 1, (2, 3)), ("190", 1, (4,)), ("plus que", 1, (5,)), ("180", 1, (6,))])
        self.au_mot("Le premier")
        v1 = self.tampon("Le premier est impossible.", ROUGE_ERREUR, 40)
        v1.move_to(P(0, 1.05)).align_to(P(-6.1, 0), LEFT)
        self.play(FadeIn(v1, scale=1.15), run_time=0.35)
        rangee(-0.2, [("5", WHITE), ("+", WHITE), ("5", WHITE), ("=", WHITE), ("10,", VERT_OK), ("plus grand que", WHITE), ("9.", WHITE)],
               [("5 plus", 1, (0, 1)), ("5 :", 1, (2, 3)), ("10,", 1, (4,)), ("plus grand", 1, (5,)), ("9. Le", 1, (6,))])
        self.au_mot("Le deuxième")
        v2 = self.tampon("Le deuxième existe.", VERT_OK, 40)
        v2.move_to(P(0, -1.25)).align_to(P(-6.1, 0), LEFT)
        self.play(FadeIn(v2, scale=1.15), run_time=0.35)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        f = Tri.par_angles(60, 60, base=3.0, centre=P(0, 0), sw=7, r_point=0.09)
        A, B, C = f.sommets
        d = VGroup(f, secteur(A, B, C, 0.55, C_COINS[0]), secteur(B, A, C, 0.55, C_COINS[1]), secteur(C, A, B, 0.55, C_COINS[2]))
        d.figer = None
        self.add(d)
        lignes = self.finale_colonne(figure=d, textes=[
            ("Pour vérifier un triangle,", "on calcule."),
            ("Trois angles doivent", "faire 180°."),
            ("Deux angles droits,", "c'est impossible."),
            ("Les angles ne donnent pas", "la longueur des côtés.")], fs=34)
        self.au_mot("Pour vérifier")
        self.montrer_ligne(lignes[0])
        self.au_mot("Trois angles")
        self.montrer_ligne(lignes[1])
        self.au_mot("Deux angles")
        self.montrer_ligne(lignes[2])
        self.au_mot("Et les angles")
        self.montrer_ligne(lignes[3])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_deux_droits()
        self.ecran_equilateral()
        self.ecran_question1()
        self.ecran_179()
        self.ecran_question2()
        self.ecran_longueurs()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class TriangleProprieteDefi6e(TriangleProprieteDefiBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
