# triangle_type_angle.py
# EleveAI — Maths 6e — série « Triangles », épisode 04 : RECONNAÎTRE UN TRIANGLE PAR SES ANGLES
# (micro triangle_type_angle, notion triangle_figure), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Décor et métier : Théo, CONSTRUCTEUR DE RAMPES DE SKATE (centre : sport).
# ⭐ Les arcs ouvrent leur vraie mesure (120°, 45-63-72, 86°…). Vocabulaire du coach : acutangle, obtusangle.
# Voix : manim/voix/6e-triangle-type-angle.json ; marques : triangle_type_angle_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/triangle_type_angle.py TriangleTypeAngle6e
# Sortie : manim/sorties/6e/maths/triangles/04-type-angle/eleveai-maths-6e-triangle-type-angle.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403
from canvas_angles import *  # noqa: E402,F403
from canvas_triangles import *  # noqa: E402,F403

BOIS = "#d97706"


def theo(s=1.0):
    p = visage(personne(peau="#f1c27d", tenue="#0f766e", cheveux="#78350f", s=s))
    # sa planche de skate, tenue à côté de lui
    x = p.corps.get_right() + RIGHT * 0.22 * s
    pl = RoundedRectangle(width=0.2 * s, height=1.75 * s, corner_radius=0.09 * s, fill_color="#f97316", fill_opacity=1,
                          stroke_color=WHITE, stroke_width=2).move_to(x + UP * 0.1 * s)
    roues = VGroup(*[Dot(pl.get_center() + UP * d * s + RIGHT * 0.13 * s, radius=0.07 * s, color="#e5e7eb") for d in (-0.6, 0.6)])
    p.add(pl, roues)
    return p


def skateur(s=1.0):
    """Un petit skateur, sur la pente."""
    c = Circle(radius=0.17 * s, fill_color="#f1c27d", fill_opacity=1, stroke_width=0).move_to(UP * 0.72 * s)
    co = Line(UP * 0.55 * s, UP * 0.15 * s, color="#22d3ee", stroke_width=9 * s)
    br = Line(UP * 0.42 * s + LEFT * 0.3 * s, UP * 0.42 * s + RIGHT * 0.3 * s, color="#22d3ee", stroke_width=6 * s)
    ja = VGroup(Line(UP * 0.15 * s, LEFT * 0.14 * s + UP * 0.03 * s, color="#1e293b", stroke_width=7 * s),
                Line(UP * 0.15 * s, RIGHT * 0.14 * s + UP * 0.03 * s, color="#1e293b", stroke_width=7 * s))
    pl = Line(LEFT * 0.3 * s, RIGHT * 0.3 * s, color="#f97316", stroke_width=9 * s)
    return VGroup(c, co, br, ja, pl)


def etiquette(sc, s, p1, p2, txt, fs=34, couleur=WHITE, r=0.92):
    """La mesure dans le coin : sur la bissectrice, à l'intérieur."""
    s, p1, p2 = np.array(s), np.array(p1), np.array(p2)
    u, v = (p1 - s) / np.linalg.norm(p1 - s), (p2 - s) / np.linalg.norm(p2 - s)
    b = (u + v) / np.linalg.norm(u + v)
    t = sc.t(txt, fs, couleur).move_to(s + b * r)
    t.sans_synchro = True
    return t


def dehors(sc, s, p1, p2, txt, fs=34, couleur=WHITE, r=0.55):
    """La mesure à l'extérieur du coin, pour un angle trop fermé."""
    s, p1, p2 = np.array(s), np.array(p1), np.array(p2)
    u, v = (p1 - s) / np.linalg.norm(p1 - s), (p2 - s) / np.linalg.norm(p2 - s)
    b = (u + v) / np.linalg.norm(u + v)
    t = sc.t(txt, fs, couleur)
    t.move_to(s - b * (r + abs(b[0]) * t.width / 2 + abs(b[1]) * t.height / 2))
    t.sans_synchro = True
    return t


def petit(ang_b, ang_c, base, centre, droit=False, coul=COTE):
    f = Tri.par_angles(ang_b, ang_c, base, centre, couleur=coul, sw=6, r_point=0.07)
    return f


class TriangleTypeAngleBase(FinTriangles, PaysageProp):
    nom_voix = "6e-triangle-type-angle"
    fichier_marques = "triangle_type_angle_marques.json"

    # ── 00 ──────────────────────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Reconnaître un triangle par ses angles", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Reconnaître")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Que cache le profil", "d'une rampe de skate ?"], 40).move_to(P(-2.4, 0.6))
        r = Polygon(P(1.9, -0.4), P(5.6, -0.4), P(5.6, 1.5), fill_color=BOIS, fill_opacity=0.9, stroke_color="#fde68a", stroke_width=5)
        sk = skateur(0.95).rotate(np.arctan2(1.9, 3.7)).move_to(P(3.3, 0.72))
        self.au_mot("Que cache")
        self.play(FadeIn(q, shift=UP * 0.2), FadeIn(r), FadeIn(sk), run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 01 ──────────────────────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        t = theo(1.05).move_to(P(-5.0, 0.35))
        self.au_mot("Voici Théo")
        nom = self.t("Théo", 44, BLEU_CALCUL).next_to(t, UP, buff=0.2)
        self.play(FadeIn(t, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Il construit")
        met = self.bloc(["Il construit", "des rampes", "de skate"], 28, BLEU_CALCUL, buff=0.06).next_to(t, DOWN, buff=0.14)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        B, C, A = P(-2.9, -1.6), P(3.1, -1.6), P(3.1, 1.3)
        sol = Line(P(-3.3, -1.6), P(4.8, -1.6), color="#64748b", stroke_width=5)
        rampe = Polygon(B, C, A, fill_color=BOIS, fill_opacity=0.85, stroke_width=0)
        planches = VGroup(*[Line(B + (C - B) * k, B + (C - B) * k + UP * (A - C)[1] * k, color="#92400e", stroke_width=3) for k in (0.25, 0.5, 0.75)])
        sk = skateur(1.15).rotate(np.arctan2(2.9, 6.0)).move_to(B + (A - B) * 0.36 + UP * 0.55 + LEFT * 0.2)
        self.au_mot("Vu de côté")
        l1 = self.t("Vu de côté,", 36).move_to(P(0, 2.9))
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(sol), FadeIn(rampe), FadeIn(planches), FadeIn(sk), run_time=0.5)
        self.au_mot("ce tremplin")
        l2 = self.t("ce tremplin est un triangle.", 36, AMBRE).next_to(l1, RIGHT, buff=0.22)
        VGroup(l1, l2).move_to(P(0.7, 2.9))
        cont = Polygon(B, C, A, stroke_color=COTE, stroke_width=9, fill_opacity=0)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("un triangle")
        self.play(Create(cont), run_time=0.5)
        self.au_mot("Pour le classer")
        l3 = self.t("Pour le classer,", 30)
        l4 = self.t("Théo regarde ses angles.", 30, JAUNE_TITRE)
        VGroup(l3, l4).arrange(RIGHT, buff=0.2).move_to(P(0.8, 2.1))
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Théo regarde")
        arcs = VGroup(arc_angle(B, C, A, r=0.95), coin_droit(C, B, A, c=0.38), arc_angle(A, B, C, r=0.6))
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.3)
        self.au_mot("ses angles")
        self.play(LaggedStart(*[Create(a) for a in arcs], lag_ratio=0.2), run_time=0.6)
        self.attendre_voix()

    # ── 02 ──────────────────────────────────────────────────────────────────
    def ecran_rectangle(self):
        self.ecran("02-rectangle")
        f = Tri.par_angles(90, 36, 4.6, P(-3.3, -0.4), sw=8, r_point=0.1)
        A, B, C = f.sommets
        self.add(f)
        self.au_mot("Ce triangle")
        l1 = self.bloc(["Ce triangle a", "un angle droit :"], 36)
        self.col(l1, 2.45, xl=0.6)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("90 degrés")
        n = self.t("90°", 62, AMBRE)
        self.col(n, 1.3, xl=0.6)
        n.sans_synchro = True
        self.play(FadeIn(n, scale=1.4), Indicate(f.dots[1], color=AMBRE, scale_factor=2.6), run_time=0.4)
        self.au_mot("On le code")
        l2 = self.bloc(["On le code avec", "un petit carré."], 36)
        self.col(l2, 0.1, xl=0.6)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("un petit carré")
        c = coin_droit(B, C, A, c=0.45, sw=7)
        self.play(FadeIn(l2[1], shift=UP * 0.1), Create(c), run_time=0.4)
        self.insister(c)
        self.au_mot("C'est un triangle")
        v = self.tampon("Triangle rectangle", VERT_OK, 38)
        self.col(v, -1.1, xl=0.6)
        self.play(FadeIn(v, scale=1.2), run_time=0.4)
        self.attendre_voix()

    # ── 03 ──────────────────────────────────────────────────────────────────
    def ecran_obtusangle(self):
        self.ecran("03-obtusangle")
        f = Tri.par_angles(120, 25, 4.0, P(-2.95, -0.75), sw=8, r_point=0.1)
        A, B, C = f.sommets
        self.add(f)
        self.au_mot("Ici")
        l1 = self.t("Ici, le plus grand angle", 36)
        self.col(l1, 2.5, xl=0.4)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("mesure")
        l2 = self.t("mesure 120°.", 40, AMBRE)
        self.col(l2, 1.7, xl=0.4)
        a = arc_angle(B, C, A, r=0.7, sw=8)
        lb = etiquette(self, B, C, A, "120°", 34, AMBRE, r=1.1).shift(UP * 0.05)
        self.play(Create(a), run_time=0.35)
        self.au_mot("120 degrés")
        self.play(FadeIn(l2, scale=1.1), FadeIn(lb, scale=1.3), run_time=0.35)
        self.au_mot("C'est plus")
        l3 = self.t("C'est plus que 90 :", 36)
        self.col(l3, 0.8, xl=0.4)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.35)
        self.au_mot("il est obtus")
        l4 = self.t("il est obtus.", 36, "#fb923c")
        self.col(l4, 0.1, xl=0.4)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Le triangle")
        v = self.tampon("Triangle obtusangle", VERT_OK, 38)
        self.col(v, -1.0, xl=0.4)
        self.play(FadeIn(v, scale=1.2), run_time=0.4)
        self.attendre_voix()

    # ── 04 ──────────────────────────────────────────────────────────────────
    def ecran_acutangle(self):
        self.ecran("04-acutangle")
        f = Tri.par_angles(45, 63, 5.0, P(-3.3, -0.75), sw=8, r_point=0.1)
        A, B, C = f.sommets
        self.add(f)
        self.au_mot("Et là")
        l1 = self.t("Et là :", 36)
        self.col(l1, 2.6, xl=0.6)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        for (s, p, q, txt, mot) in ((B, C, A, "45°", "45 degrés"), (C, A, B, "63°", "63 degrés"), (A, B, C, "72°", "72 degrés")):
            self.au_mot(mot)
            self.play(Create(arc_angle(s, p, q, r=0.55, sw=7)), FadeIn(etiquette(self, s, p, q, txt, 30, AMBRE, r=0.98), scale=1.3), run_time=0.3)
        self.au_mot("Les trois angles")
        l2 = self.bloc(["Les trois angles sont aigus,", "moins de 90°."], 34)
        self.col(l2, 1.45, xl=0.6)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("moins de")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Le triangle")
        v = self.tampon("Triangle acutangle", VERT_OK, 38)
        self.col(v, 0.0, xl=0.6)
        self.play(FadeIn(v, scale=1.2), run_time=0.4)
        self.attendre_voix()

    # ── 05 ──────────────────────────────────────────────────────────────────
    def ecran_methode(self):
        self.ecran("05-methode")
        self.au_mot("La méthode")
        l0 = self.t("La méthode :", 42, JAUNE_TITRE).move_to(P(-4.2, 2.9))
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        self.au_mot("on regarde")
        l1 = self.t("on regarde le plus grand angle.", 38).next_to(l0, RIGHT, buff=0.3)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        cent = (P(-4.4, 0.2), P(-0.4, 0.2), P(3.6, 0.2))
        F = [Tri.par_angles(90, 36, 2.9, cent[0], sw=7, r_point=0.08), Tri.par_angles(120, 25, 2.5, cent[1] + RIGHT * 0.4, sw=7, r_point=0.08),
             Tri.par_angles(55, 68, 2.9, cent[2], sw=7, r_point=0.08)]
        marques = [coin_droit(F[0].sommets[1], F[0].sommets[2], F[0].sommets[0], c=0.34, sw=7),
                   arc_angle(F[1].sommets[1], F[1].sommets[2], F[1].sommets[0], r=0.48, sw=7),
                   arc_angle(F[2].sommets[0], F[2].sommets[1], F[2].sommets[2], r=0.5, sw=7)]
        for i, (a, b, ca, cb) in enumerate((("Droit :", "rectangle", "Droit", "rectangle."), ("Obtus :", "obtusangle", "Obtus", "obtusangle."), ("Aigu :", "acutangle", "Aigu", "acutangle."))):
            self.au_mot(ca)
            la = self.t(a, 38, AMBRE).move_to(cent[i] + DOWN * 2.0 + (LEFT * 0.4 if i == 2 else ORIGIN))
            self.play(FadeIn(F[i]), Create(marques[i]), FadeIn(la, shift=UP * 0.1), run_time=0.35)
            self.au_mot(cb)
            lb = self.t(b, 38, VERT_OK).next_to(la, DOWN, buff=0.16)
            self.play(FadeIn(lb, scale=1.15), run_time=0.3)
        self.attendre_voix()

    # ── 06 : QUESTION 1 ─────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        f = Tri.par_angles(30, 40, 4.4, P(-3.3, -1.45), r_point=0.09)
        A, B, C = f.sommets
        items = [(B, C, A, "30°", "30 degrés"), (C, A, B, "40°", "40 degrés"), (A, B, C, "110°", "110 degrés")]
        labs = [dehors(self, s, p, q, t, 30, AMBRE, r=0.2) for s, p, q, t, _ in items]

        def avant(sc):
            sc.play(FadeIn(f), run_time=0.3)
            for (s, p, q, t, mot), m in zip(items, labs):
                m._pas_audit = True
                arc = arc_angle(s, p, q, r=0.42, sw=6)
                g = VGroup(m, arc)
                t_k = sc.renderer.time + sc.t_mot(mot)
                g.set_opacity(0)
                g.add_updater(lambda x, t_k=t_k: x[0].set_opacity(1 if sc.renderer.time >= t_k else 0))
                arc.add_updater(lambda x, t_k=t_k: x.set_stroke(opacity=1 if sc.renderer.time >= t_k else 0))
                sc.add(g)

        def apres(sc):
            sc.play(Indicate(labs[2], color=VERT_OK, scale_factor=1.6), run_time=0.5)

        self.question_pause("06-question", "06b-reponse", ["Un triangle a des angles", "de 30°, 40° et 110°.", "Quel est son type ?"],
                            [self.t("rectangle", 32), self.t("obtusangle", 32), self.t("acutangle", 32)], 1,
                            ["110, c'est plus que 90.", "Cet angle est obtus."], mot_q="Un triangle", avant_q=avant, autres_r=apres)

    # ── 07 ──────────────────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        self.au_mot("Attention")
        tit = self.t("Attention !", 50, ROUGE_ERREUR)
        self.col(tit, 2.8, xl=0.4)
        self.play(Write(tit), run_time=0.35)
        f = Tri.par_angles(25, 35, 4.2, P(-2.9, -1.2), sw=8, r_point=0.1)
        A, B, C = f.sommets
        self.play(FadeIn(f), run_time=0.25)
        self.au_mot("Ce triangle")
        l1 = self.bloc(["Ce triangle a", "deux angles aigus :"], 34)
        self.col(l1, 1.7, xl=0.4)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("35 degrés")
        self.play(Create(arc_angle(C, A, B, r=0.7, sw=7)), FadeIn(dehors(self, C, A, B, "35°", 32, AMBRE, r=0.15), scale=1.3), run_time=0.3)
        self.au_mot("25 degrés")
        self.play(Create(arc_angle(B, C, A, r=0.85, sw=7)), FadeIn(dehors(self, B, C, A, "25°", 32, AMBRE, r=0.15), scale=1.3), run_time=0.3)
        self.au_mot("Il n'est pas")
        l2 = self.bloc(["Il n'est pas acutangle", "pour autant !"], 34, ROUGE_ERREUR)
        self.col(l2, 0.55, xl=0.4)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        self.au_mot("Son troisième")
        l3 = self.t("Son troisième angle :", 30)
        self.col(l3, -0.35, xl=0.4)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        self.au_mot("120 degrés")
        n = self.t("120°", 38, "#fb923c").next_to(l3, RIGHT, buff=0.2)
        n.sans_synchro = True
        lb = dehors(self, A, B, C, "120°", 32, "#fb923c", r=0.15)
        self.play(FadeIn(n, scale=1.3), Create(arc_angle(A, B, C, r=0.48, couleur="#fb923c", sw=8)), FadeIn(lb, scale=1.3), run_time=0.35)
        self.au_mot("Pour être")
        l4 = self.bloc(["Pour être acutangle, il faut", "trois angles aigus."], 32, VERT_OK)
        self.col(l4, -1.3, xl=0.4)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.35)
        self.attendre_voix()

    # ── 08 ──────────────────────────────────────────────────────────────────
    def ecran_piege_oeil(self):
        self.ecran("08-piege-oeil")
        f = Tri.par_angles(86, 40, 4.0, P(-3.5, -0.6), sw=8, r_point=0.1)
        A, B, C = f.sommets
        self.add(f)
        self.au_mot("Autre piège")
        tit = self.t("Autre piège :", 42, ROUGE_ERREUR)
        self.col(tit, 2.7, xl=0.5)
        self.play(FadeIn(tit, shift=UP * 0.1), run_time=0.3)
        self.au_mot("cet angle")
        l1 = self.t("cet angle a l'air droit.", 36)
        self.col(l1, 2.0, xl=0.5)
        self.play(FadeIn(l1, shift=UP * 0.1), Create(arc_angle(B, C, A, r=0.6, sw=7)), run_time=0.4)
        self.au_mot("Sans petit")
        l2 = self.bloc(["Sans petit carré", "et sans mesure,", "on ne peut rien dire."], 30)
        self.col(l2, 0.85, xl=0.5)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("et sans")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("on ne peut")
        self.play(FadeIn(l2[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("L'équerre")
        l3 = self.t("L'équerre tranche :", 36, "#7dd3fc")
        self.col(l3, -0.3, xl=0.5)
        eq = Equerre(B + LEFT * 0.5 + DOWN * 0.9, 0.0, taille=2.3)
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(eq), run_time=0.3)
        self.play(eq.poser(B, 0.0), run_time=0.7)
        self.au_mot("ici,")
        l4 = self.t("ici, il mesure 86°.", 36, AMBRE)
        self.col(l4, -0.95, xl=0.5)
        self.play(FadeIn(l4[:12], shift=UP * 0.1), run_time=0.3)
        self.au_mot("86 degrés")
        self.play(FadeIn(l4[12:], scale=1.2), FadeIn(dehors(self, B, C, A, "86°", 34, AMBRE, r=0.08)), run_time=0.3)
        self.au_mot("Le triangle")
        v = self.tampon("Pas rectangle", ROUGE_ERREUR, 36)
        self.col(v, -1.7, xl=0.5)
        self.play(FadeIn(v, scale=1.2), run_time=0.4)
        self.attendre_voix()

    # ── 09 : QUESTION 2 ─────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        f = Tri.par_angles(60, 50, 3.7, P(-3.3, -1.1), r_point=0.09)
        A, B, C = f.sommets
        items = [(A, B, C, "70°", "70 degrés"), (B, C, A, "60°", "60 degrés"), (C, A, B, "50°", "50 degrés")]

        def avant(sc):
            sc.play(FadeIn(f), run_time=0.3)
            for s, p, q, t, mot in items:
                m = etiquette(sc, s, p, q, t, 28, AMBRE, r=0.86)
                m._pas_audit = True
                t_k = sc.renderer.time + sc.t_mot(mot)
                m.set_opacity(0)
                m.add_updater(lambda x, t_k=t_k: x.set_opacity(1 if sc.renderer.time >= t_k else 0))
                arc = arc_angle(s, p, q, r=0.42, sw=6).set_stroke(opacity=0)
                arc.add_updater(lambda x, t_k=t_k: x.set_stroke(opacity=1 if sc.renderer.time >= t_k else 0))
                sc.add(m, arc)

        self.question_pause("09-question", "09b-reponse", ["Un triangle a des angles", "de 70°, 60° et 50°.", "Quel est son type ?"],
                            [self.t("rectangle", 32), self.t("obtusangle", 32), self.t("acutangle", 32)], 2,
                            ["70° : moins que 90.", "Les trois sont aigus."], mot_q="Un triangle", avant_q=avant)

    # ── 10 : le défi ────────────────────────────────────────────────────────
    def trois(self):
        """Les trois tremplins : à gauche, à leurs vraies mesures, base en bas."""
        ys = (1.45, -0.25, -1.95)
        F = [Tri.par_angles(90, 30, 2.0, P(-5.2, ys[0]), sw=6, r_point=0.06),
             Tri.par_angles(100, 30, 1.9, P(-5.1, ys[1]), sw=6, r_point=0.06),
             Tri.par_angles(80, 40, 1.85, P(-5.2, ys[2]), sw=6, r_point=0.06)]
        return F, ys

    def ecran_defi(self):
        self.ecran("10-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        F, ys = self.trois()
        for f, y, cle, txt, nums, mots in zip(F, ys, ("Le premier", "Le deuxième", "Le troisième"), ("Le premier :", "Le deuxième :", "Le troisième :"),
                                              (("90°", "60°", "30°"), ("100°", "50°", "30°"), ("80°", "60°", "40°")),
                                              (("90 degrés", "60 degrés", "30 degrés"), ("100 degrés", "50 degrés", "30 degrés"), ("80 degrés", "60 degrés", "40 degrés"))):
            self.au_mot(cle)
            l = self.t(txt, 30)
            l.move_to(P(-3.4, y)).align_to(P(-3.4, 0), LEFT)
            self.play(FadeIn(l, shift=RIGHT * 0.1), FadeIn(f), run_time=0.3)
            x = l.get_right()[0] + 0.25
            for k, (n, m) in enumerate(zip(nums, mots)):
                occ = 2 if (cle == "Le deuxième" and n == "30°") else (2 if (cle == "Le troisième" and n == "60°") else 1)
                t = self.t(n, 36, AMBRE)
                t.sans_synchro = True
                t.move_to(P(x + t.width / 2, y))
                x += t.width + 0.28
                self.au_mot(m, occ)
                self.play(FadeIn(t, scale=1.3), run_time=0.2)
        self.au_mot("Quel est")
        l = self.t("Quel est le type de chacun ?", 34, ORANGE_RETENUE).move_to(P(0.6, 2.4))
        self.play(FadeIn(l, shift=UP * 0.1), run_time=0.35)
        p = self.bloc(["Mets pause,", "et cherche !"], 32, ORANGE_RETENUE).move_to(P(4.9, -0.25))
        self.au_mot("Mets pause")
        self.play(FadeIn(p, shift=UP * 0.1), run_time=0.5)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("10b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        F, ys = self.trois()
        self.add(*F)
        self.play(Write(tit), run_time=0.35)
        for f, y, cle, l1, n, mot, ty, cty, geste in zip(
                F, ys, ("Le premier", "Le deuxième", "Le troisième"),
                ("Le premier a un angle de", "Le deuxième a un angle de", "Le troisième a un plus grand angle de"),
                ("90°", "100°", "80°"), ("90 degrés", "100 degrés", "80 degrés"),
                ("rectangle", "obtusangle", "acutangle"), ("rectangle.", "obtusangle.", "acutangle."),
                ((1, 2, 0, "c"), (1, 2, 0, "a"), (1, 2, 0, "a"))):
            self.au_mot(cle)
            t1 = self.t(l1, 28)
            t1.move_to(P(-3.4, y + 0.28)).align_to(P(-3.4, 0), LEFT)
            self.play(FadeIn(t1, shift=RIGHT * 0.1), run_time=0.3)
            self.au_mot(mot)
            t2 = self.t(n, 38, AMBRE)
            t2.sans_synchro = True
            t2.next_to(t1, RIGHT, buff=0.2)
            S = f.sommets
            m = coin_droit(S[1], S[2], S[0], c=0.24, sw=5) if geste[3] == "c" else arc_angle(S[1], S[2], S[0], r=0.3, sw=5)
            self.play(FadeIn(t2, scale=1.3), Create(m), run_time=0.25)
            self.au_mot(cty)
            t3 = self.t(ty, 38, VERT_OK).move_to(P(-3.4, y - 0.34)).align_to(P(-3.4, 0), LEFT)
            self.play(FadeIn(t3, scale=1.15), run_time=0.3)
        self.attendre_voix()

    # ── 11 ──────────────────────────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("11-finale", 0.65)
        fs_ = VGroup()
        for b, c, base, mk in ((90, 36, 2.4, "c"), (120, 25, 2.0, "a"), (55, 68, 2.2, "s")):
            f = Tri.par_angles(b, c, base * 0.85, ORIGIN, sw=5, r_point=0.05)
            S = f.sommets
            f.add(coin_droit(S[1], S[2], S[0], c=0.24, sw=5) if mk == "c" else (arc_angle(S[1], S[2], S[0], r=0.32, sw=5) if mk == "a" else arc_angle(S[0], S[1], S[2], r=0.32, sw=5)))
            fs_.add(f)
        fs_.arrange(DOWN, buff=0.24)
        self.add(fs_)
        lignes = self.finale_colonne(figure=fs_, textes=[
            ("Un angle droit : triangle rectangle.",), ("Un angle obtus : triangle obtusangle.",),
            ("Trois angles aigus : triangle acutangle.",), ("C'est le plus grand angle", "qui décide.")], fs=30)
        for i, cle in enumerate(("Un angle droit", "Un angle obtus", "Trois angles", "C'est le plus")):
            self.au_mot(cle)
            self.montrer_ligne(lignes[i], *([Indicate(fs_[i], scale_factor=1.15)] if i < 3 else []))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_rectangle()
        self.ecran_obtusangle()
        self.ecran_acutangle()
        self.ecran_methode()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_piege_oeil()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")


class TriangleTypeAngle6e(TriangleTypeAngleBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
