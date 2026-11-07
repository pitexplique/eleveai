# triangle_sommet_cote.py
# EleveAI — Maths 6e — série « Triangles », épisode 02 : SOMMETS ET CÔTÉS
# (micro triangle_sommet_cote, notion triangle_figure), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Décor et métier : Karim, ASTRONOME, le triangle d'été (centre : espace).
# Formes vraies : Véga-Deneb 24°, Deneb-Altaïr 38°, Véga-Altaïr 34° (distances dans le ciel).
# Voix : manim/voix/6e-triangle-sommet-cote.json ; marques : triangle_sommet_cote_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/triangle_sommet_cote.py TriangleSommetCote6e
# Sortie : manim/sorties/6e/maths/triangles/02-sommet-cote/eleveai-maths-6e-triangle-sommet-cote.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403
from canvas_angles import *  # noqa: E402,F403
from canvas_triangles import *  # noqa: E402,F403

ORANGE_C = "#fb923c"


def tuile(lettres, couleur=WHITE, fs=64):
    return VGroup(*[Text(x, font_size=fs, color=couleur, weight=BOLD) for x in lettres]).arrange(RIGHT, buff=0.16)


def etoile(p, r=0.24, c="#fde047"):
    return Star(n=5, outer_radius=r, inner_radius=r * 0.45, fill_color=c, fill_opacity=1, stroke_width=0).move_to(p)


def ciel(w=5.6, h=6.2, centre=ORIGIN):
    """Le ciel de nuit : un cadre sombre et de petites étoiles, toujours aux mêmes places."""
    c = np.array(centre, dtype=float)
    fond = RoundedRectangle(width=w, height=h, corner_radius=0.14, fill_color="#0b1026", fill_opacity=1,
                            stroke_color="#475569", stroke_width=3).move_to(c)
    g = np.random.default_rng(7)
    petites = VGroup(*[Dot(c + np.array([g.uniform(-w / 2 + 0.2, w / 2 - 0.2), g.uniform(-h / 2 + 0.2, h / 2 - 0.2), 0]),
                           radius=g.uniform(0.012, 0.03), color=WHITE, fill_opacity=g.uniform(0.4, 0.9)) for _ in range(70)])
    return VGroup(fond, petites)


def ete(centre, s=0.125):
    """Deneb, Véga, Altaïr : le triangle d'été à ses vraies proportions."""
    d, v, a = np.array([0, 0, 0.0]), np.array([24, 0, 0.0]), np.array([18, -33.5, 0.0])
    m = (d + v + a) / 3
    return [np.array(centre, dtype=float) + (x - m) * s for x in (v, d, a)]  # Véga, Deneb, Altaïr


def karim(s=1.0):
    p = visage(personne(peau="#8d5524", tenue="#1d4ed8", cheveux="#111827", s=s))
    lun = VGroup(Line(ORIGIN, RIGHT * 1.15 * s, stroke_width=16 * s, color="#cbd5e1"),
                 Line(ORIGIN, DL * 0.65 * s, stroke_width=5 * s, color="#94a3b8"),
                 Line(ORIGIN, DR * 0.65 * s, stroke_width=5 * s, color="#94a3b8"))
    lun[0].rotate(0.75, about_point=ORIGIN)
    lun.move_to(p.corps.get_right() + RIGHT * 0.25 * s + UP * 0.25 * s)
    p.add(lun)
    return p


class TriangleSommetCoteBase(FinTriangles, PaysageProp):
    nom_voix = "6e-triangle-sommet-cote"
    fichier_marques = "triangle_sommet_cote_marques.json"

    def figure(self, noms=("A", "B", "C"), fs=60):
        """A en haut : le côté opposé se voit en face."""
        return Tri(P(-3.2, 2.1), P(-5.3, -2.0), P(-1.0, -1.7), noms=noms, fs=fs, sw=8, r_point=0.13)

    # ── 00 ──────────────────────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Sommets et côtés d'un triangle", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Sommets")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Que voit un astronome", "entre trois étoiles ?"], 40).move_to(P(-2.2, 0.4))
        v, d, a = ete(P(4.1, 0.5), 0.085)
        et = VGroup(etoile(v, 0.2), etoile(d, 0.2), etoile(a, 0.2))
        self.au_mot("Que voit")
        self.play(FadeIn(q[0], shift=UP * 0.2), run_time=0.4)
        self.au_mot("entre trois")
        self.play(FadeIn(q[1], shift=UP * 0.2), LaggedStart(*[FadeIn(x, scale=2.5) for x in et], lag_ratio=0.2), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 ──────────────────────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        k = karim(1.05).move_to(P(-5.0, 0.0))
        self.au_mot("Voici Karim")
        nom = self.t("Karim", 44, BLEU_CALCUL).next_to(k, UP, buff=0.2)
        self.play(FadeIn(k, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("astronome")
        met = self.t("astronome", 32, BLEU_CALCUL).next_to(k, DOWN, buff=0.18)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        c = ciel(5.0, 6.2, P(-0.35, 0.05))
        self.au_mot("Une nuit")
        self.play(FadeIn(c), run_time=0.45)
        v, d, a = ete(P(-0.17, 0.35))
        ev, ed, ea = etoile(v), etoile(d), etoile(a)
        lv = self.t("Véga", 34, "#fde047").next_to(ev, RIGHT, buff=0.14).shift(UP * 0.05)
        ld = self.t("Deneb", 34, "#fde047").next_to(ed, UP, buff=0.14)
        la = self.t("Altaïr", 34, "#fde047").next_to(ea, DOWN, buff=0.14)
        if lv.get_right()[0] > 1.95:
            lv.next_to(ev, UP, buff=0.14)
        for mot, e, l in (("Véga", ev, lv), ("Deneb", ed, ld), ("Altaïr", ea, la)):
            self.au_mot(mot)
            self.play(FadeIn(e, scale=3), FadeIn(l), run_time=0.3)
        self.au_mot("Un triangle")
        tr = VGroup(Line(v, d, color=BLEU_CALCUL, stroke_width=6), Line(d, a, color=BLEU_CALCUL, stroke_width=6),
                    Line(a, v, color=BLEU_CALCUL, stroke_width=6))
        ap = self.bloc(["Un triangle", "apparaît"], 32, AMBRE).move_to(P(4.55, 1.5))
        self.play(FadeIn(ap, shift=UP * 0.1), LaggedStart(*[Create(x) for x in tr], lag_ratio=0.25), run_time=0.8)
        self.au_mot("le triangle d'été")
        no = self.bloc(["le triangle", "d'été"], 34, JAUNE_TITRE).move_to(P(4.55, -0.1))
        self.play(FadeIn(no, scale=1.2), run_time=0.4)
        self.insister(no)
        self.attendre_voix()

    def ciel_etoiles(self, avec_traits=False):
        c = ciel(5.4, 6.2, P(-3.6, 0.05))
        v, d, a = ete(P(-3.6, 0.1))
        et = VGroup(etoile(v), etoile(d), etoile(a))
        et.pts = (v, d, a)
        tr = VGroup(Line(v, d, color=BLEU_CALCUL, stroke_width=6), Line(d, a, color=BLEU_CALCUL, stroke_width=6),
                    Line(a, v, color=BLEU_CALCUL, stroke_width=6))
        return c, et, tr

    # ── 02 ──────────────────────────────────────────────────────────────────
    def ecran_sommets(self):
        self.ecran("02-sommets")
        c, et, tr = self.ciel_etoiles()
        self.add(c, tr, et)
        self.au_mot("Chaque étoile")
        l1 = self.t("Chaque étoile est un sommet.", 36)
        self.col(l1, 2.4, xl=0.35)
        self.play(FadeIn(l1, shift=UP * 0.1), *[Indicate(x, color=SOMMET, scale_factor=1.7) for x in et], run_time=0.7)
        self.au_mot("Un sommet")
        l2 = self.t("Un sommet, c'est un point.", 36, SOMMET)
        self.col(l2, 1.3, xl=0.35)
        pts = VGroup(*[Dot(p, radius=0.15, color=SOMMET) for p in et.pts])
        self.play(FadeIn(l2, shift=UP * 0.1), *[Transform(x, y) for x, y in zip(et, pts)], run_time=0.5)
        self.au_mot("Ce triangle")
        l3 = self.t("Ce triangle a trois sommets.", 36)
        self.col(l3, 0.2, xl=0.35)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.4)
        self.au_mot("trois sommets")
        self.play(*[Flash(p, color=SOMMET, line_length=0.28) for p in et.pts], run_time=0.5)
        self.attendre_voix()

    # ── 03 ──────────────────────────────────────────────────────────────────
    def ecran_cotes(self):
        self.ecran("03-cotes")
        c, et, tr = self.ciel_etoiles()
        tr.set_stroke(opacity=0.35)
        self.add(c, tr, et)
        self.au_mot("Chaque trait")
        l1 = self.t("Chaque trait relie deux étoiles.", 34)
        self.col(l1, 2.4, xl=0.35)
        self.play(FadeIn(l1, shift=UP * 0.1), tr[0].animate.set_stroke(ORANGE_C, width=11, opacity=1), run_time=0.45)
        self.au_mot("C'est un côté")
        l2 = self.t("C'est un côté.", 42, ORANGE_C)
        self.col(l2, 1.45, xl=0.35)
        self.play(FadeIn(l2, scale=1.2), Indicate(tr[0], color=ORANGE_C, scale_factor=1.08), run_time=0.45)
        self.au_mot("Un côté, c'est")
        l3 = self.t("Un côté, c'est un segment.", 36)
        self.col(l3, 0.45, xl=0.35)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Ce triangle")
        l4 = self.t("Ce triangle a trois côtés.", 36)
        self.col(l4, -0.55, xl=0.35)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.4)
        self.au_mot("trois côtés")
        self.play(LaggedStart(*[x.animate.set_stroke(ORANGE_C, width=11, opacity=1) for x in tr], lag_ratio=0.3), run_time=0.8)
        self.attendre_voix()

    # ── 04 ──────────────────────────────────────────────────────────────────
    def ecran_noms(self):
        self.ecran("04-noms")
        self.au_mot("Sur le cahier")
        l0 = self.bloc(["Sur le cahier,", "on met des lettres."], 32)
        self.col(l0, 2.8, xl=0.3)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        f = self.figure()
        self.play(FadeIn(VGroup(f.fond, f.cotes, f.dots)), run_time=0.3)
        self.au_mot("Voici le triangle")
        l1 = self.t("Voici le triangle", 32)
        self.col(l1, 1.72, xl=0.3)
        self.play(FadeIn(l1), run_time=0.25)
        t = tuile("ABC", AMBRE, 46).next_to(l1, RIGHT, buff=0.3)
        for k, cle in zip("ABC", ("A B C.", "B C.", "C. Ses")):
            self.au_mot(cle)
            self.play(FadeIn(t["ABC".index(k)], scale=1.5), FadeIn(f.lettre(k), scale=1.8), run_time=0.2)
        self.au_mot("Ses sommets")
        l2 = self.t("Ses sommets sont", 30, SOMMET)
        self.col(l2, 0.98, xl=0.3)
        self.play(FadeIn(l2), run_time=0.3)
        s = VGroup(*[Text(x, font_size=32, color=SOMMET, weight=BOLD) for x in ("A,", "B", "et", "C.")]).arrange(RIGHT, buff=0.14).next_to(l2, RIGHT, buff=0.2)
        for i, k, cle, n in ((0, "A", "A, B", 1), (1, "B", "B et", 1), (3, "C", "C. Ses", 2)):
            self.au_mot(cle, n)
            self.play(FadeIn(s[i], scale=1.4), *([FadeIn(s[2])] if i == 3 else []), Indicate(f.point(k), color=SOMMET, scale_factor=2), run_time=0.22)
        self.au_mot("Ses côtés")
        l3 = self.t("Ses côtés s'écrivent", 32, ORANGE_C)
        self.col(l3, 0.2, xl=0.3)
        self.play(FadeIn(l3), run_time=0.3)
        self.au_mot("avec deux")
        l3b = self.t("avec deux lettres", 32, ORANGE_C)
        self.col(l3b, -0.38, xl=0.3)
        self.play(FadeIn(l3b), run_time=0.25)
        self.au_mot("entre crochets")
        l4 = self.t("entre crochets :", 32, ORANGE_C)
        self.col(l4, -0.96, xl=0.3)
        self.play(FadeIn(l4), run_time=0.25)
        x = 0.3
        for (a, b), cle in zip((("A", "B"), ("B", "C"), ("C", "A")), ("A B,", "B C et", "C A.")):
            seg = self.t(f"[{a}{b}]", 44, ORANGE_C)
            seg.move_to(P(x + seg.width / 2, -1.75))
            self.au_mot(cle)
            self.play(FadeIn(seg, scale=1.3), f.cote(a, b).animate.set_stroke(ORANGE_C, width=11), run_time=0.25)
            x += seg.width + 0.32
        self.attendre_voix()

    # ── 05 ──────────────────────────────────────────────────────────────────
    def ecran_angles(self):
        self.ecran("05-angles")
        f = self.figure()
        self.add(f)
        arcs = VGroup(*[arc_angle(f.pt(k), f.pt(a), f.pt(b), r=0.62, sw=7) for k, a, b in
                        (("A", "B", "C"), ("B", "C", "A"), ("C", "A", "B"))])
        self.au_mot("À chaque sommet")
        l1 = self.t("À chaque sommet,", 38)
        self.col(l1, 2.2, xl=0.6)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("il y a")
        l2 = self.t("il y a un angle.", 38, ARC)
        self.col(l2, 1.45, xl=0.6)
        self.play(FadeIn(l2), run_time=0.3)
        self.au_mot("angle")
        self.play(LaggedStart(*[Create(a) for a in arcs], lag_ratio=0.2), run_time=0.6)
        for cle, txt, coul, y, gestes in (
                ("Trois sommets", "Trois sommets,", SOMMET, 0.2, [Indicate(p, color=SOMMET, scale_factor=2) for p in f.dots]),
                ("trois côtés", "trois côtés,", ORANGE_C, -0.55, [Indicate(c, color=ORANGE_C, scale_factor=1.05) for c in f.cotes]),
                ("trois angles", "trois angles.", ARC, -1.3, [Indicate(a, color=ARC, scale_factor=1.4) for a in arcs])):
            self.au_mot(cle)
            l = self.t(txt, 42, coul)
            self.col(l, y, xl=0.6)
            self.play(FadeIn(l, scale=1.15), *gestes, run_time=0.5)
        self.attendre_voix()

    # ── 06 : QUESTION 1 ─────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        f = Tri(P(-5.1, -2.1), P(-1.6, -2.3), P(-3.9, 0.9), noms=("E", "F", "G"), fs=46, r_point=0.11)
        h = Dot(P(-1.3, 0.75), radius=0.11, color=ROUGE_ERREUR)
        lh = Text("H", font_size=46, color=ROUGE_ERREUR, weight=BOLD)
        lh._pas_audit = lh.sans_synchro = True
        lh.next_to(h, UP, buff=0.1)
        eh = DashedLine(f.pt("E"), h.get_center(), color=ROUGE_ERREUR, stroke_width=6)

        def avant(sc):
            sc.play(FadeIn(f), FadeIn(h), FadeIn(lh), run_time=0.3)

        def apres(sc):
            sc.play(Create(eh), Indicate(h, color=ROUGE_ERREUR, scale_factor=2), run_time=0.5)

        self.question_pause("06-question", "06b-reponse", ["Dans le triangle EFG,", "quel segment n'est", "pas un côté ?"],
                            [self.t("[EF]", 34), self.t("[FG]", 34), self.t("[EH]", 34)], 2,
                            ["H n'est pas un sommet.", "[EH] n'est pas un côté."], mot_q="Dans le", avant_q=avant, autres_r=apres)

    # ── 07 : le côté opposé ─────────────────────────────────────────────────
    def ecran_oppose(self):
        self.ecran("07-oppose")
        self.au_mot("le côté opposé")
        tit = self.t("Le côté opposé", 50, JAUNE_TITRE)
        self.col(tit, 2.8, xl=0.6)
        self.play(Write(tit), run_time=0.4)
        f = self.figure()
        self.play(FadeIn(f), run_time=0.3)
        self.au_mot("Mets-toi")
        l1 = self.t("Mets-toi sur le sommet A,", 36)
        self.col(l1, 1.75, xl=0.6)
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(f.point("A"), color=SOMMET, scale_factor=2.4), run_time=0.5)
        self.au_mot("et regarde")
        l2 = self.t("et regarde en face.", 36)
        self.col(l2, 1.05, xl=0.6)
        vue = Polygon(f.pt("A"), f.pt("B"), f.pt("C"), fill_color=AMBRE, fill_opacity=0.28, stroke_width=0)
        self.play(FadeIn(l2, shift=UP * 0.1), GrowFromPoint(vue, f.pt("A")), run_time=0.6)
        self.au_mot("Le côté que")
        l3 = self.t("Le côté que tu vois", 36)
        self.col(l3, 0.1, xl=0.6)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        self.au_mot("ne touche")
        l4 = self.t("ne touche pas A :", 36)
        self.col(l4, -0.6, xl=0.6)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.3)
        self.au_mot("c'est B C")
        l5 = self.t("c'est [BC].", 44, ORANGE_C)
        self.col(l5, -1.4, xl=0.6)
        self.play(FadeIn(l5, scale=1.2), f.cote("B", "C").animate.set_stroke(ORANGE_C, width=13), run_time=0.4)
        self.au_mot("C'est le côté")
        l6 = self.bloc(["C'est le côté opposé", "au sommet A."], 32, VERT_OK)
        self.col(l6, -2.45, xl=0.6)
        self.play(FadeIn(l6, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix()

    # ── 08 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("08-piege")
        self.au_mot("Attention")
        tit = self.t("Attention !", 50, ROUGE_ERREUR)
        self.col(tit, 2.8, xl=0.6)
        self.play(Write(tit), run_time=0.35)
        f = self.figure()
        self.play(FadeIn(f), run_time=0.25)
        self.au_mot("Un sommet")
        l1 = self.t("Un sommet est un point :", 32, SOMMET)
        self.col(l1, 1.75, xl=0.6)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("une seule lettre")
        l2 = self.t("une seule lettre,", 32)
        self.col(l2, 1.05, xl=0.6)
        self.play(FadeIn(l2), run_time=0.3)
        self.au_mot("A. Un")
        a = self.t("A", 62, SOMMET).next_to(l2, RIGHT, buff=0.35)
        a.sans_synchro = True
        self.play(FadeIn(a, scale=1.5), Indicate(f.point("A"), color=SOMMET, scale_factor=2.6), run_time=0.4)
        self.au_mot("Un côté")
        l3 = self.t("Un côté est un segment :", 32, ORANGE_C)
        self.col(l3, 0.0, xl=0.6)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        self.au_mot("deux lettres")
        l4 = self.t("deux lettres et des crochets,", 31)
        self.col(l4, -0.72, xl=0.6)
        self.play(FadeIn(l4), run_time=0.3)
        self.au_mot("A B. Ne")
        ab = self.t("[AB]", 62, ORANGE_C)
        self.col(ab, -1.55, xl=0.6)
        self.play(FadeIn(ab, scale=1.4), f.cote("A", "B").animate.set_stroke(ORANGE_C, width=13), run_time=0.4)
        self.au_mot("Ne les")
        l5 = self.t("Ne les confonds pas.", 34, JAUNE_TITRE)
        self.col(l5, -2.45, xl=0.6)
        self.play(FadeIn(l5, scale=1.1), run_time=0.35)
        self.attendre_voix()

    # ── 09 : QUESTION 2 ─────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        f = Tri(P(-3.2, 0.95), P(-5.1, -2.2), P(-1.5, -2.0), noms=("F", "D", "E"), fs=46, r_point=0.11)

        def avant(sc):
            sc.play(FadeIn(f), run_time=0.3)

        def apres(sc):
            sc.play(f.cote("D", "E").animate.set_stroke(ORANGE_C, width=12), Indicate(f.point("F"), color=SOMMET, scale_factor=2), run_time=0.5)

        self.question_pause("09-question", "09b-reponse", ["Dans le triangle DEF,", "quel est le côté opposé", "au sommet F ?"],
                            [self.t("[DE]", 34), self.t("[EF]", 34), self.t("[DF]", 34)], 0,
                            ["[DE] est le seul côté", "qui ne touche pas F."], mot_q="Dans le", avant_q=avant, autres_r=apres)

    # ── 10 : le défi ────────────────────────────────────────────────────────
    def figure_defi(self):
        return Tri(P(-3.4, 1.6), P(-5.3, -2.2), P(-1.1, -1.9), noms=("R", "S", "T"), fs=58, sw=8, r_point=0.13)

    def ecran_defi(self):
        self.ecran("10-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        f = self.figure_defi()
        self.au_mot("Voici le triangle")
        l0 = self.t("Voici le triangle RST.", 38, AMBRE)
        self.col(l0, 1.9, xl=0.4)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(f), run_time=0.4)
        self.au_mot("Quel sommet")
        l1 = self.bloc(["Quel sommet est opposé", "au côté [ST] ?"], 36)
        self.col(l1, 0.9, xl=0.4)
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("au côté")
        self.play(FadeIn(l1[1], shift=UP * 0.1), f.cote("S", "T").animate.set_stroke(ORANGE_C, width=12), run_time=0.3)
        self.au_mot("Et quel")
        l2 = self.bloc(["Et quel côté est opposé", "au sommet S ?"], 36)
        self.col(l2, -0.45, xl=0.4)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("au sommet S")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Indicate(f.point("S"), color=SOMMET, scale_factor=2.4), run_time=0.4)
        self.pause_defi(y=-1.65)

    def ecran_correction(self):
        self.ecran("10b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        f = self.figure_defi()
        self.add(f)
        self.play(Write(tit), run_time=0.35)
        self.au_mot("Le côté S T")
        l1 = self.t("[ST] ne touche pas R :", 36)
        self.col(l1, 2.0, xl=0.4)
        self.play(FadeIn(l1, shift=UP * 0.1), f.cote("S", "T").animate.set_stroke(ORANGE_C, width=12), run_time=0.4)
        self.au_mot("le sommet opposé")
        l2 = self.t("le sommet opposé est R.", 36, VERT_OK)
        self.col(l2, 1.25, xl=0.4)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("est R")
        self.play(Indicate(f.point("R"), color=VERT_OK, scale_factor=2.5), run_time=0.4)
        self.au_mot("Le côté qui")
        l3 = self.bloc(["Le côté qui ne touche", "pas S, c'est [RT] :"], 36)
        self.col(l3, 0.15, xl=0.4)
        self.play(FadeIn(l3[0], shift=UP * 0.1), f.cote("S", "T").animate.set_stroke(COTE, width=8),
                  Indicate(f.point("S"), color=SOMMET, scale_factor=2.2), run_time=0.4)
        self.au_mot("pas S")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("R T :")
        self.play(f.cote("R", "T").animate.set_stroke(ORANGE_C, width=12), run_time=0.35)
        self.au_mot("c'est le côté")
        l4 = self.t("c'est le côté opposé à S.", 36, VERT_OK)
        self.col(l4, -1.1, xl=0.4)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.35)
        self.attendre_voix()

    # ── 11 ──────────────────────────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("11-finale", 0.65)
        f = Tri(P(1.1, 2.9), P(0, 0), P(3.2, 0.3), noms=("A", "B", "C"), fs=44, sw=7).scale(0.95)
        arcs = VGroup(*[arc_angle(f.pt(k), f.pt(a), f.pt(b), r=0.42, sw=5) for k, a, b in
                        (("A", "B", "C"), ("B", "C", "A"), ("C", "A", "B"))])
        fig = VGroup(f, arcs)
        fig.figer = None
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Un triangle a trois sommets,", "trois côtés et trois angles."),
            ("Un sommet est un point,", "un côté est un segment."),
            ("Le côté opposé à un sommet", "ne touche pas ce sommet.")], fs=36)
        self.au_mot("Un triangle")
        self.montrer_ligne(lignes[0], *[Indicate(p, color=SOMMET, scale_factor=2) for p in f.dots])
        self.au_mot("Un sommet")
        self.montrer_ligne(lignes[1])
        self.au_mot("Le côté")
        self.montrer_ligne(lignes[2], f.cotes[1].animate.set_stroke(ORANGE_C, width=10))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_sommets()
        self.ecran_cotes()
        self.ecran_noms()
        self.ecran_angles()
        self.ecran_question1()
        self.ecran_oppose()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")


class TriangleSommetCote6e(TriangleSommetCoteBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
