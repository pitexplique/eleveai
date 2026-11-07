# triangle_type_cote.py
# EleveAI — Maths 6e — série « Triangles », épisode 03 : RECONNAÎTRE UN TRIANGLE PAR SES CÔTÉS
# (micro triangle_type_cote, notion triangle_figure), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Décor et métier : Awa, STYLISTE (centre : art-design).
# Figures à vraies mesures : 5-5-5, 7-7-4, 6-5-4, 6-9-6, 6-6,5-5, 8-8-5.
# Voix : manim/voix/6e-triangle-type-cote.json ; marques : triangle_type_cote_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/triangle_type_cote.py TriangleTypeCote6e
# Sortie : manim/sorties/6e/maths/triangles/03-type-cote/eleveai-maths-6e-triangle-type-cote.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403
from canvas_angles import *  # noqa: E402,F403
from canvas_triangles import *  # noqa: E402,F403

ROSE, TURQ, MIEL = "#f472b6", "#2dd4bf", "#fbbf24"


def awa(s=1.0):
    p = visage(personne(peau="#5c3a21", tenue="#be185d", cheveux="#111827", longs=True, s=s))
    # le mètre de couturière autour du cou
    c = p.corps.get_top()
    ruban = VGroup(Line(c + LEFT * 0.3 * s, c + LEFT * 0.4 * s + DOWN * 1.0 * s, color="#fde047", stroke_width=9 * s),
                   Line(c + RIGHT * 0.3 * s, c + RIGHT * 0.4 * s + DOWN * 1.0 * s, color="#fde047", stroke_width=9 * s))
    p.add(ruban)
    return p


def veste(centre=ORIGIN, s=1.0, pas=0.42):
    """Une veste en patchwork : des morceaux de tissu en triangle."""
    c = np.array(centre, dtype=float)
    cols = [ROSE, TURQ, MIEL, "#a78bfa", "#fb7185", "#38bdf8"]
    tris, n = VGroup(), 0

    def dedans(i, j):
        if j == 2 and i in (-1, 0):  # l'encolure
            return False
        return (-3 <= i < 3 and -5 <= j < 3) or (-5 <= i < 5 and 0 <= j < 3)  # le corps, les manches

    for i in range(-5, 5):
        for j in range(-5, 3):
            if not dedans(i, j):
                continue
            x0, y0 = i * pas, j * pas
            for pts in ([(x0, y0), (x0 + pas, y0), (x0, y0 + pas)], [(x0 + pas, y0), (x0 + pas, y0 + pas), (x0, y0 + pas)]):
                tris.add(Polygon(*[c + np.array([p[0] * s, p[1] * s, 0.0]) for p in pts], fill_color=cols[(n * 7 + i) % 6],
                                 fill_opacity=1, stroke_color="#0f172a", stroke_width=2))
                n += 1
    return tris


def mesure(sc, a, b, txt, centre, fs=34, couleur=WHITE, d=0.34):
    """L'étiquette d'un côté, à l'extérieur du triangle."""
    a, b = np.array(a), np.array(b)
    m = (a + b) / 2
    u = (b - a) / np.linalg.norm(b - a)
    n = np.array([-u[1], u[0], 0.0])
    if np.dot(n, m - np.array(centre)) < 0:
        n = -n
    t = sc.t(txt, fs, couleur)
    return t.move_to(m + n * (d + abs(n[0]) * t.width / 2 + abs(n[1]) * t.height / 2))


def tissu(f, couleur=ROSE):
    f.fond.set_fill(couleur, 0.32)
    f.cotes.set_stroke(couleur)
    return f


class TriangleTypeCoteBase(FinTriangles, PaysageProp):
    nom_voix = "6e-triangle-type-cote"
    fichier_marques = "triangle_type_cote_marques.json"

    # ── 00 ──────────────────────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Reconnaître un triangle par ses côtés", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Reconnaître")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Comment trier", "des triangles", "sans se tromper ?"], 40).move_to(P(-2.8, 0.5))
        v = veste(P(3.6, 0.9), 0.72)
        self.au_mot("Comment")
        self.play(FadeIn(q, shift=UP * 0.2), FadeIn(v), run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 01 ──────────────────────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        a = awa(1.05).move_to(P(-5.0, 0.2))
        self.au_mot("Voici Awa")
        nom = self.t("Awa", 44, BLEU_CALCUL).next_to(a, UP, buff=0.2)
        self.play(FadeIn(a, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("styliste")
        met = self.t("styliste", 32, BLEU_CALCUL).next_to(a, DOWN, buff=0.18)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("Elle coud")
        v = veste(P(-0.3, 0.4), 1.15)
        self.play(LaggedStart(*[FadeIn(x, scale=0.6) for x in v], lag_ratio=0.012), run_time=1.2)
        lb = self.bloc(["des morceaux", "de tissu"], 34, AMBRE).move_to(P(4.4, 2.2))
        self.au_mot("des morceaux")
        self.play(FadeIn(lb, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Pour les trier")
        l2 = self.t("Pour les trier,", 34).move_to(P(4.4, 0.8))
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("elle mesure")
        l3 = self.bloc(["elle mesure", "leurs côtés."], 38, JAUNE_TITRE).move_to(P(4.4, -0.2))
        self.play(FadeIn(l3, scale=1.1), run_time=0.35)
        self.attendre_voix()

    # ── 02 ──────────────────────────────────────────────────────────────────
    def ecran_equilateral(self):
        self.ecran("02-equilateral")
        f = tissu(Tri.par_cotes(5, 5, 5, 0.86, P(-3.4, -0.6), sw=8, r_point=0.1))
        self.au_mot("Premier morceau")
        l0 = self.t("Premier morceau :", 38)
        self.col(l0, 2.5, xl=0.8)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(f), run_time=0.4)
        A, B, C = f.sommets
        for n, (a, b) in enumerate(((B, C), (C, A), (A, B)), 1):
            self.au_mot("5 centimètres", n)
            m = mesure(self, a, b, "5 cm", f.centre_)
            m.sans_synchro = True
            self.play(FadeIn(m, scale=1.4), run_time=0.3)
        self.au_mot("Les trois côtés")
        l1 = self.bloc(["Les trois côtés ont", "la même longueur."], 38)
        self.col(l1, 1.15, xl=0.8)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        self.play(*[Indicate(c, color=AMBRE, scale_factor=1.05) for c in f.cotes], run_time=0.5)
        self.au_mot("C'est un triangle")
        v = self.tampon("Triangle équilatéral", VERT_OK, 34)
        self.col(v, -0.5, xl=0.8)
        self.play(FadeIn(v, scale=1.06), run_time=0.4)
        self.attendre_voix()

    # ── 03 ──────────────────────────────────────────────────────────────────
    def ecran_isocele(self):
        self.ecran("03-isocele")
        f = tissu(Tri.par_cotes(4, 7, 7, 0.82, P(-3.3, -0.55), sw=8, r_point=0.1), TURQ)
        self.au_mot("Deuxième morceau")
        l0 = self.t("Deuxième morceau :", 38)
        self.col(l0, 2.5, xl=0.8)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(f), run_time=0.4)
        A, B, C = f.sommets
        for (a, b), (cle, n) in zip(((A, B), (C, A), (B, C)), (("7 centimètres", 1), ("7 centimètres", 2), ("4 centimètres", 1))):
            self.au_mot(cle, n)
            m = mesure(self, a, b, cle[0] + " cm", f.centre_)
            m.sans_synchro = True
            self.play(FadeIn(m, scale=1.4), run_time=0.3)
        self.au_mot("Deux côtés")
        l1 = self.bloc(["Deux côtés ont", "la même longueur."], 38)
        self.col(l1, 1.15, xl=0.8)
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(f.cotes[0], color=AMBRE, scale_factor=1.05), Indicate(f.cotes[2], color=AMBRE, scale_factor=1.05), run_time=0.5)
        self.au_mot("C'est un triangle")
        v = self.tampon("Triangle isocèle", VERT_OK, 34)
        self.col(v, -0.5, xl=0.8)
        self.play(FadeIn(v, scale=1.06), run_time=0.4)
        self.attendre_voix()

    # ── 04 ──────────────────────────────────────────────────────────────────
    def ecran_quelconque(self):
        self.ecran("04-quelconque")
        f = tissu(Tri.par_cotes(6, 5, 4, 0.86, P(-3.4, -0.6), sw=8, r_point=0.1), MIEL)
        self.au_mot("Troisième morceau")
        l0 = self.t("Troisième morceau :", 38)
        self.col(l0, 2.5, xl=0.8)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(f), run_time=0.4)
        A, B, C = f.sommets
        cols = [ROSE, TURQ, "#60a5fa"]
        for (a, b), cle, co in zip(((B, C), (C, A), (A, B)), ("6 centimètres", "5 centimètres", "4 centimètres"), cols):
            self.au_mot(cle)
            m = mesure(self, a, b, cle[0] + " cm", f.centre_, couleur=co)
            m.sans_synchro = True
            self.play(FadeIn(m, scale=1.4), run_time=0.3)
        self.au_mot("Trois longueurs")
        l1 = self.bloc(["Trois longueurs", "différentes."], 38)
        self.col(l1, 1.15, xl=0.8)
        self.play(FadeIn(l1, shift=UP * 0.1), f.cotes[0].animate.set_stroke(cols[1]), f.cotes[1].animate.set_stroke(cols[0]),
                  f.cotes[2].animate.set_stroke(cols[2]), run_time=0.5)
        self.au_mot("C'est un triangle")
        v = self.tampon("Triangle quelconque", VERT_OK, 34)
        self.col(v, -0.5, xl=0.8)
        self.play(FadeIn(v, scale=1.06), run_time=0.4)
        self.attendre_voix()

    # ── 05 ──────────────────────────────────────────────────────────────────
    def ecran_codage(self):
        self.ecran("05-codage")
        self.au_mot("Sur un dessin")
        l0 = self.t("Sur un dessin, on code.", 40, JAUNE_TITRE).move_to(P(0, 3.05))
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        self.au_mot("Des petits traits")
        l1 = self.t("Des petits traits identiques", 34).move_to(P(-1.3, 2.3))
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("même longueur")
        l2 = self.t("= même longueur", 34, AMBRE).next_to(l1, RIGHT, buff=0.3)
        self.play(FadeIn(l2, scale=1.1), run_time=0.3)

        def cod(f, cotes):
            return VGroup(*[codage(f.sommets[i], f.sommets[(i + 1) % 3], 1, couleur=AMBRE) for i in cotes])

        centres = (P(-4.7, 0.2), P(-0.7, 0.2), P(3.3, 0.2))
        fs_ = [Tri.par_cotes(5, 5, 5, 0.5, centres[0], sw=6, r_point=0.07),
               Tri.par_cotes(3.4, 5.4, 5.4, 0.46, centres[1], sw=6, r_point=0.07),
               Tri.par_cotes(5.6, 4.6, 3.6, 0.5, centres[2], sw=6, r_point=0.07)]
        cs = [cod(fs_[0], (0, 1, 2)), cod(fs_[1], (0, 2)), VGroup()]
        txt = [["Trois côtés", "codés pareil :", "équilatéral"], ["Deux côtés", "codés pareil :", "isocèle"],
               ["Aucun codage :", "on ne peut rien dire,", "il faut mesurer."]]
        cles = [("Trois côtés", "équilatéral. Deux"), ("Deux côtés", "isocèle. Aucun"), ("Aucun codage", "on ne peut")]
        for i in range(3):
            self.au_mot(cles[i][0])
            b = self.bloc(txt[i][:2] if i < 2 else txt[i][:1], 30).move_to(centres[i] + DOWN * 1.55)
            self.play(FadeIn(fs_[i]), *[Create(x) for x in cs[i]], FadeIn(b, shift=UP * 0.1), run_time=0.5)
            self.au_mot(cles[i][1])
            if i < 2:
                v = self.t(txt[i][2], 34, VERT_OK).next_to(b, DOWN, buff=0.12)
                self.play(FadeIn(v, scale=1.2), run_time=0.3)
            else:
                v = self.t(txt[i][1], 28, ROUGE_ERREUR).next_to(b, DOWN, buff=0.12)
                self.play(FadeIn(v), run_time=0.3)
                self.au_mot("il faut")
                w = self.t(txt[i][2], 28, ROUGE_ERREUR).next_to(v, DOWN, buff=0.1)
                self.play(FadeIn(w), run_time=0.3)
        self.attendre_voix()

    # ── 06 : QUESTION 1 ─────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        f = tissu(Tri.par_cotes(9, 6, 6, 0.44, P(-3.3, -1.0), r_point=0.09), TURQ)
        A, B, C = f.sommets
        labs = [(mesure(self, A, B, "6 cm", f.centre_, 32), "6 centimètres", 1), (mesure(self, B, C, "9 cm", f.centre_, 32), "9 centimètres", 1),
                (mesure(self, C, A, "6 cm", f.centre_, 32), "6 centimètres", 2)]

        def avant(sc):
            sc.play(FadeIn(f), run_time=0.3)
            for m, mot, n in labs:
                m._pas_audit = m.sans_synchro = True
                t_k = sc.renderer.time + sc.t_mot(mot, n)
                m.set_opacity(0)
                m.add_updater(lambda x, t_k=t_k: x.set_opacity(1 if sc.renderer.time >= t_k else 0))
                sc.add(m)

        def apres(sc):
            sc.play(Create(codage(A, B, 1, couleur=AMBRE)), Create(codage(C, A, 1, couleur=AMBRE)),
                    f.cotes[0].animate.set_stroke(AMBRE), f.cotes[2].animate.set_stroke(AMBRE), run_time=0.5)

        self.question_pause("06-question", "06b-reponse", ["Un triangle a des côtés", "de 6 cm, 9 cm et 6 cm.", "Quelle est sa nature ?"],
                            [self.t("équilatéral", 32), self.t("isocèle", 32), self.t("quelconque", 32)], 1,
                            ["6 et 6 : deux égaux.", "Il est isocèle."], mot_q="Un triangle", avant_q=avant, autres_r=apres)

    # ── 07 ──────────────────────────────────────────────────────────────────
    def ecran_sommet_principal(self):
        self.ecran("07-sommet-principal")
        f = tissu(Tri.par_cotes(3.6, 5.6, 5.6, 0.86, P(-3.5, -0.45), noms=("L", "K", "M"), fs=54, sw=8, r_point=0.12), TURQ)
        L, K, M = f.sommets
        self.play(FadeIn(VGroup(f.fond, f.cotes, f.dots)), run_time=0.3)
        self.au_mot("Dans un triangle")
        l1 = self.bloc(["Dans un triangle isocèle,", "les deux côtés égaux", "partent du même point :"], 32)
        self.col(l1, 2.3, xl=0.5)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("les deux")
        c1, c2 = codage(L, K, 1, couleur=AMBRE), codage(M, L, 1, couleur=AMBRE)
        self.play(FadeIn(l1[1], shift=UP * 0.1), Create(c1), Create(c2), f.cote("L", "K").animate.set_stroke(AMBRE), f.cote("M", "L").animate.set_stroke(AMBRE), run_time=0.45)
        self.au_mot("partent")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("le sommet principal")
        l2 = self.t("le sommet principal.", 38, SOMMET)
        self.col(l2, 0.95, xl=0.5)
        self.play(FadeIn(l2, scale=1.15), Indicate(f.point("L"), color=SOMMET, scale_factor=3), run_time=0.5)
        self.au_mot("Le troisième")
        l3 = self.bloc(["Le troisième côté", "s'appelle la base."], 34)
        self.col(l3, 0.05, xl=0.5)
        self.play(FadeIn(l3, shift=UP * 0.1), f.cote("K", "M").animate.set_stroke("#fb923c", width=12), run_time=0.4)
        self.au_mot("Voici le triangle")
        l4 = self.t("Voici le triangle KLM.", 34, AMBRE)
        self.col(l4, -0.9, xl=0.5)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.3)
        for k, cle in (("K", "K L M."), ("L", "L M."), ("M", "M. K")):
            self.au_mot(cle)
            self.play(FadeIn(f.lettre(k), scale=1.8), run_time=0.2)
        self.au_mot("K L et")
        l5 = self.t("[KL] et [LM] sont égaux.", 34)
        self.col(l5, -1.6, xl=0.5)
        self.play(FadeIn(l5, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Il est isocèle")
        v = self.tampon("Isocèle en L", VERT_OK, 36)
        self.col(v, -2.45, xl=0.5)
        self.play(FadeIn(v, scale=1.2), Indicate(f.lettre("L"), color=VERT_OK, scale_factor=1.6), run_time=0.45)
        self.attendre_voix()

    # ── 08 ──────────────────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("08-piege")
        self.au_mot("Attention")
        tit = self.t("Attention !", 50, ROUGE_ERREUR)
        self.col(tit, 2.8, xl=0.8)
        self.play(Write(tit), run_time=0.35)
        f = Tri.par_cotes(5, 6.5, 6, 0.76, P(-3.75, -0.55), sw=8, r_point=0.1)
        A, B, C = f.sommets
        self.play(FadeIn(f), run_time=0.25)
        self.au_mot("On ne juge")
        l1 = self.t("On ne juge pas à l'œil.", 36)
        self.col(l1, 1.9, xl=0.8)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Ces deux")
        l2 = self.bloc(["Ces deux côtés", "semblent égaux."], 34)
        self.col(l2, 1.1, xl=0.8)
        self.play(FadeIn(l2, shift=UP * 0.1), f.cotes[0].animate.set_stroke(AMBRE, width=11), f.cotes[2].animate.set_stroke(AMBRE, width=11), run_time=0.4)
        self.au_mot("On mesure")
        l3 = self.t("On mesure :", 36)
        self.col(l3, 0.15, xl=0.8)
        self.play(FadeIn(l3), run_time=0.3)
        self.au_mot("6 centimètres, et")
        m1 = mesure(self, A, B, "6 cm", f.centre_)
        m1.sans_synchro = True
        self.play(FadeIn(m1, scale=1.4), run_time=0.3)
        self.au_mot("6 centimètres et demi")
        m2 = self.t("6 cm", 34)
        m2.sans_synchro = True
        m2.next_to((C + A) / 2, RIGHT, buff=0.3).shift(UP * 0.25)
        self.play(FadeIn(m2, scale=1.3), run_time=0.3)
        self.au_mot("et demi")
        m3 = self.t("et demi", 30)
        m3.sans_synchro = True
        m3.next_to(m2, DOWN, buff=0.08, aligned_edge=LEFT).shift(RIGHT * 0.18)
        self.play(FadeIn(m3, scale=1.2), run_time=0.25)
        self.au_mot("Ils sont")
        l4 = self.t("Ils sont différents.", 36, ROUGE_ERREUR)
        self.col(l4, -0.6, xl=0.8)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Ce triangle")
        v = self.tampon("Triangle quelconque", VERT_OK, 38)
        self.col(v, -1.5, xl=0.8)
        self.play(FadeIn(v, scale=1.06), run_time=0.4)
        self.attendre_voix()

    # ── 09 : QUESTION 2 ─────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        f = tissu(Tri.par_cotes(5, 5, 5, 0.72, P(-3.3, -0.85), r_point=0.09), ROSE)
        A, B, C = f.sommets
        cs = VGroup(codage(A, B, 1, couleur=AMBRE), codage(B, C, 1, couleur=AMBRE), codage(C, A, 1, couleur=AMBRE))

        def avant(sc):
            sc.play(FadeIn(f), run_time=0.3)
            t_k = sc.renderer.time + sc.t_mot("le même codage")
            cs.set_opacity(0)
            cs.add_updater(lambda m: m.set_stroke(opacity=1 if sc.renderer.time >= t_k else 0))
            sc.add(cs)

        def apres(sc):
            sc.play(*[Indicate(x, color=VERT_OK, scale_factor=1.6) for x in cs], run_time=0.5)

        self.question_pause("09-question", "09b-reponse", ["Les trois côtés portent", "le même codage. Quelle est", "sa nature la plus précise ?"],
                            [self.t("isocèle", 32), self.t("équilatéral", 32), self.t("quelconque", 32)], 1,
                            ["Trois côtés égaux :", "il est équilatéral."], mot_q="Les trois", avant_q=avant, autres_r=apres)

    # ── 10 : le défi ────────────────────────────────────────────────────────
    def figure_defi(self):
        return tissu(Tri.par_cotes(5, 8, 8, 0.56, P(-3.6, -0.6), noms=("A", "B", "C"), fs=50, sw=8, r_point=0.12), TURQ)

    def ecran_defi(self):
        self.ecran("10-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        f = self.figure_defi()
        A, B, C = f.sommets
        self.au_mot("Un triangle")
        l1 = self.t("Un triangle est isocèle en A.", 32, AMBRE)
        self.col(l1, 2.3, xl=0.4)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(f), run_time=0.4)
        self.au_mot("Le côté A B")
        l2 = self.t("[AB] mesure 8 cm.", 32)
        self.col(l2, 1.65, xl=0.4)
        m1 = mesure(self, A, B, "8 cm", f.centre_)
        m1.sans_synchro = True
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("8 centimètres")
        self.play(FadeIn(m1, scale=1.4), run_time=0.25)
        self.au_mot("La base")
        l3 = self.t("La base [BC] mesure 5 cm.", 32)
        self.col(l3, 1.0, xl=0.4)
        m2 = mesure(self, B, C, "5 cm", f.centre_)
        m2.sans_synchro = True
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        self.au_mot("5 centimètres")
        self.play(FadeIn(m2, scale=1.4), run_time=0.25)
        self.au_mot("Combien")
        l4 = self.t("Combien mesure [AC] ?", 34, ORANGE_RETENUE)
        self.col(l4, 0.25, xl=0.4)
        m3 = mesure(self, C, A, "?", f.centre_, 44, ORANGE_RETENUE)
        self.play(FadeIn(l4, shift=UP * 0.1), FadeIn(m3, scale=1.5), run_time=0.35)
        self.au_mot("Quel est")
        l5 = self.bloc(["Quel est le périmètre", "du triangle ?"], 34, ORANGE_RETENUE)
        self.col(l5, -0.55, xl=0.4)
        self.play(FadeIn(l5, shift=UP * 0.1), run_time=0.35)
        self.pause_defi(y=-1.55)

    def ecran_correction(self):
        self.ecran("10b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        f = self.figure_defi()
        A, B, C = f.sommets
        m1, m2 = mesure(self, A, B, "8 cm", f.centre_), mesure(self, B, C, "5 cm", f.centre_)
        m1.sans_synchro = m2.sans_synchro = True
        self.add(f)
        self.add(m1, m2)
        self.play(Write(tit), run_time=0.35)
        self.au_mot("Isocèle en A")
        l1 = self.t("Isocèle en A :", 34, AMBRE)
        self.col(l1, 2.25, xl=0.4)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("les côtés")
        l2 = self.t("[AB] et [AC] sont égaux.", 34)
        self.col(l2, 1.55, xl=0.4)
        self.play(FadeIn(l2, shift=UP * 0.1), Create(codage(A, B, 1, couleur=AMBRE)), Create(codage(C, A, 1, couleur=AMBRE)), run_time=0.4)
        self.au_mot("Donc A C")
        l3 = self.t("Donc [AC] mesure 8 cm.", 34, VERT_OK)
        self.col(l3, 0.8, xl=0.4)
        self.play(FadeIn(l3[:14], shift=UP * 0.1), run_time=0.3)
        self.au_mot("8 centimètres")
        m3 = mesure(self, C, A, "8 cm", f.centre_, couleur=VERT_OK)
        m3.sans_synchro = True
        self.play(FadeIn(l3[14:], shift=UP * 0.1), FadeIn(m3, scale=1.4), run_time=0.3)
        self.au_mot("Le périmètre")
        l4 = self.t("Le périmètre :", 34)
        self.col(l4, -0.1, xl=0.4)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.3)
        x = 0.4
        for txt, cle, n, co in (("8", "8 plus", 1, WHITE), ("+", None, 0, WHITE), ("8", "8 plus", 2, WHITE), ("+", None, 0, WHITE), ("5", "5, 21", 1, WHITE), ("=", None, 0, WHITE),
                                ("21 cm", "21 centimètres", 1, VERT_OK)):
            t = self.t(txt, 44, co)
            t.sans_synchro = True
            t.move_to(P(x + t.width / 2, -1.0))
            x += t.width + 0.22
            if cle:
                self.au_mot(cle, n)
                self.play(FadeIn(t, scale=1.3), run_time=0.2)
            else:
                self.add(t)
        self.attendre_voix()

    # ── 11 ──────────────────────────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("11-finale", 0.65)
        tris = VGroup()
        for (a, b, c), co, cots in (((5, 5, 5), ROSE, (0, 1, 2)), ((3.4, 5.2, 5.2), TURQ, (0, 2)), ((5.6, 4.6, 3.6), MIEL, ())):
            f = tissu(Tri.par_cotes(a, b, c, 0.4, ORIGIN, sw=5, r_point=0.05), co)
            f.add(*[codage(f.sommets[i], f.sommets[(i + 1) % 3], 1, couleur=WHITE, lg=0.13) for i in cots])
            tris.add(f)
        tris.arrange(DOWN, buff=0.22)
        self.add(tris)
        lignes = self.finale_colonne(figure=tris, textes=[
            ("Trois côtés égaux : équilatéral.",), ("Deux côtés égaux : isocèle.",),
            ("Aucun côté égal : quelconque.",), ("On lit les mesures et les", "codages, jamais à l'œil.")], fs=32)
        for i, cle in enumerate(("Trois côtés", "Deux côtés", "Aucun côté", "On lit")):
            self.au_mot(cle)
            self.montrer_ligne(lignes[i], *([Indicate(tris[i], scale_factor=1.15)] if i < 3 else []))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_equilateral()
        self.ecran_isocele()
        self.ecran_quelconque()
        self.ecran_codage()
        self.ecran_question1()
        self.ecran_sommet_principal()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")


class TriangleTypeCote6e(TriangleTypeCoteBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
