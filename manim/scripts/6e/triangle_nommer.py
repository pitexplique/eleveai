# triangle_nommer.py
# EleveAI — Maths 6e — série « Triangles », épisode 01 : NOMMER UN TRIANGLE
# (micro triangle_nommer, notion triangle_figure), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : film Ti Margo (prototypes/ti-margo/films/triangles.js, épisode nommer).
# Décor et métier : Nora, INFOGRAPHISTE 3D (centres : jeux-video, art-design).
# Écrans : garde (00), situation (01), sommets (02), trois lettres (03), l'ordre (04),
# QUESTION 1 (05), piège (06), QUESTION 2 (07), défi (08) et correction (08b), appris (09), fin (10).
# Voix : manim/voix/6e-triangle-nommer.json ; marques : triangle_nommer_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/triangle_nommer.py TriangleNommer6e
# python -m manim render -qh --disable_caching manim/scripts/6e/triangle_nommer.py TriangleNommer6e -o eleveai-maths-6e-triangle-nommer --media_dir manim/scripts/6e/media-tri-01
# Sortie : manim/sorties/6e/maths/triangles/01-nommer/eleveai-maths-6e-triangle-nommer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403
from canvas_angles import *  # noqa: E402,F403
from canvas_triangles import *  # noqa: E402,F403


def maillage(centre=ORIGIN, s=1.0, pas=0.25):
    """Un personnage 3D vu comme l'infographiste le voit : une tête, un corps, des bras
    et des jambes faits de petits triangles. m.tris : les triangles ; m.fil : leurs contours."""
    c = np.array(centre, dtype=float)
    tris, fil = VGroup(), VGroup()

    def teinte(x, y):
        if x * x + (y - 1.35) ** 2 < 0.95 ** 2:
            return ["#fcd34d", "#fbbf24", "#fde68a"]  # la tête
        if abs(x) < 0.62 and -0.55 < y < 0.42:
            return ["#2dd4bf", "#14b8a6", "#5eead4"]  # le corps
        if 0.62 <= abs(x) < 1.32 and 0.0 < y < 0.42:
            return ["#2dd4bf", "#0d9488", "#5eead4"]  # les bras
        if 0.12 < abs(x) < 0.58 and -1.75 < y <= -0.55:
            return ["#60a5fa", "#3b82f6", "#93c5fd"]  # les jambes
        return None

    n = 0
    for i in range(-7, 8):
        for j in range(-8, 11):
            x0, y0 = i * pas + (j % 2) * pas / 2, j * pas
            for k in (0, 1):
                pts = ([(x0, y0), (x0 + pas, y0), (x0 + pas / 2, y0 + pas)] if k == 0
                       else [(x0 + pas, y0), (x0 + pas * 1.5, y0 + pas), (x0 + pas / 2, y0 + pas)])
                t = teinte(sum(p[0] for p in pts) / 3, sum(p[1] for p in pts) / 3)
                if t:
                    P3 = [c + np.array([p[0] * s, p[1] * s, 0.0]) for p in pts]
                    tris.add(Polygon(*P3, fill_color=t[n % 3], fill_opacity=1, stroke_width=0))
                    fil.add(Polygon(*P3, fill_opacity=0, stroke_color="#0f172a", stroke_width=1.4))
                    n += 1
    yeux = VGroup()
    for x in (-0.36, 0.36):
        yeux.add(Dot(c + np.array([x * s, 1.5 * s, 0.0]), radius=0.2 * s, color=WHITE),
                 Dot(c + np.array([x * s, 1.5 * s, 0.0]), radius=0.1 * s, color="#0f172a"))
    bouche = Arc(radius=0.36 * s, start_angle=-2.5, angle=1.84, arc_center=c + np.array([0, 1.2 * s, 0]), color="#0f172a", stroke_width=6)
    g = VGroup(tris, fil, yeux, bouche)
    g.tris, g.fil, g.yeux, g.bouche = tris, fil, yeux, bouche
    return g


def nora(s=1.0):
    """Nora : son casque et sa tablette à dessin."""
    p = visage(personne(peau="#c68642", tenue="#7c3aed", cheveux="#1f2937", longs=True, s=s))
    tab = RoundedRectangle(width=0.85 * s, height=0.6 * s, corner_radius=0.05 * s, fill_color="#0f172a", fill_opacity=1,
                           stroke_color=WHITE, stroke_width=3).move_to(p.corps.get_center() + P(0.2, 0.05) * s)
    p.add(tab)
    return p


def tuile(lettres, couleur=WHITE, fs=64):
    """Le nom en grand : les lettres bien séparées."""
    return VGroup(*[Text(x, font_size=fs, color=couleur, weight=BOLD) for x in lettres]).arrange(RIGHT, buff=0.16)


class TriangleNommerBase(FinTriangles, PaysageProp):
    nom_voix = "6e-triangle-nommer"
    fichier_marques = "triangle_nommer_marques.json"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Nommer un triangle", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Nommer")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Comment retrouver un triangle", "parmi des milliers ?"], 40).move_to(P(-2.2, 0.5))
        m = maillage(P(4.2, 0.0), 0.92)
        self.au_mot("Comment")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(m.tris), FadeIn(m.yeux), FadeIn(m.bouche), run_time=0.45)
        self.au_mot("parmi")
        self.play(FadeIn(q[1], shift=UP * 0.2), FadeIn(m.fil), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 01 : Nora, infographiste 3D ─────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        no = nora(1.05).move_to(P(-4.75, 0.2))
        self.au_mot("Voici Nora")
        nom = self.t("Nora", 44, BLEU_CALCUL).next_to(no, UP, buff=0.2)
        self.play(FadeIn(no, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("infographiste")
        met = self.t("infographiste 3D", 30, BLEU_CALCUL).next_to(no, DOWN, buff=0.18)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("Ses personnages")
        ec = RoundedRectangle(width=5.6, height=6.2, corner_radius=0.14, fill_color="#0f172a", fill_opacity=1,
                              stroke_color="#94a3b8", stroke_width=4).move_to(P(0.2, 0.1))
        m = maillage(P(0.2, 0.0), 1.05)
        self.play(FadeIn(ec), FadeIn(m.tris), FadeIn(m.yeux), FadeIn(m.bouche), run_time=0.5)
        self.au_mot("milliers")
        lab = self.bloc(["milliers de", "petits triangles"], 30, AMBRE).move_to(P(4.85, 2.1))
        self.play(FadeIn(lab, scale=1.2), LaggedStart(*[Create(x) for x in m.fil], lag_ratio=0.01), run_time=1.0)
        self.au_mot("déplacer")
        un = m.tris[len(m.tris) // 3]
        self.play(un.animate.set_fill("#fb923c"), run_time=0.3)
        lab2 = self.bloc(["un seul", "triangle"], 36, "#fb923c").move_to(P(4.85, 0.75))
        self.au_mot("un seul")
        self.play(FadeIn(lab2, scale=1.2), un.animate.scale(1.7), run_time=0.4)
        self.play(un.animate.scale(1 / 1.7), run_time=0.3)
        self.au_mot("Comment")
        q = self.bloc(["Comment", "le retrouver ?"], 32, JAUNE_TITRE).move_to(P(4.85, -0.6))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.35)
        self.attendre_voix()

    # ── 02 : les trois sommets ──────────────────────────────────────────────
    def ecran_sommets(self):
        self.ecran("02-sommets")
        f = Tri(P(-5.1, -2.2), P(-0.9, -1.5), P(-3.6, 2.15), noms=("A", "B", "C"), fs=60, sw=8, r_point=0.13)
        self.au_mot("Un triangle")
        tit = self.t("Un triangle", 44)
        self.col(tit, 2.5, xl=1.2)
        self.play(FadeIn(tit, shift=UP * 0.15), Create(f.cotes), FadeIn(f.fond), run_time=0.6)
        self.au_mot("trois sommets")
        ts = self.t("trois sommets,", 44, SOMMET)
        self.col(ts, 1.6, xl=1.2)
        self.play(FadeIn(ts, scale=1.2), LaggedStart(*[FadeIn(p, scale=3) for p in f.dots], lag_ratio=0.25), run_time=0.55)
        self.au_mot("trois points")
        tp = self.t("trois points.", 44, SOMMET)
        self.col(tp, 0.8, xl=1.2)
        self.play(FadeIn(tp, scale=1.2), *[Flash(p, color=SOMMET, line_length=0.25) for p in f.dots], run_time=0.5)
        for k in ("A", "B"):
            self.au_mot(f"{k},") if k == "A" else self.au_mot("B et")
            self.play(FadeIn(f.lettre(k), scale=1.8), run_time=0.22)
        self.au_mot("et C")
        self.play(FadeIn(f.lettre("C"), scale=1.8), run_time=0.22)
        self.au_mot("Elle écrit")
        e = self.t("Elle écrit :", 36)
        self.col(e, -0.25, xl=1.2)
        self.play(FadeIn(e, shift=UP * 0.1), run_time=0.25)
        self.au_mot("triangle A")
        nm = self.t("triangle", 46)
        self.col(nm, -1.15, xl=1.2)
        self.play(FadeIn(nm, shift=RIGHT * 0.15), run_time=0.22)
        l3 = tuile("ABC", AMBRE, 66).next_to(nm, RIGHT, buff=0.35)
        for i, k in enumerate(("triangle A", "B C", "C.")):
            self.au_mot(k)
            self.play(FadeIn(l3[i], scale=1.6), Indicate(f.point("ABC"[i]), color=AMBRE, scale_factor=1.8), run_time=0.24)
        self.attendre_voix()

    # ── 03 : trois lettres, ni plus, ni moins ───────────────────────────────
    def ecran_trois_lettres(self):
        self.ecran("03-trois-lettres")
        f = Tri(P(-5.1, -2.2), P(-0.9, -1.5), P(-3.6, 2.15), noms=("A", "B", "C"), fs=60, sw=8, r_point=0.13)
        self.add(f)
        self.au_mot("Pour nommer")
        tit = self.t("Pour nommer un triangle :", 40)
        self.col(tit, 2.7, xl=0.9)
        self.play(FadeIn(tit, shift=UP * 0.15), run_time=0.3)
        self.au_mot("ses trois sommets")
        ts = self.t("ses trois sommets.", 40, SOMMET)
        self.col(ts, 1.95, xl=0.9)
        self.play(FadeIn(ts, scale=1.15), *[Indicate(p, color=SOMMET, scale_factor=2) for p in f.dots], run_time=0.5)
        self.au_mot("Trois lettres")
        l3 = tuile("ABC", VERT_OK, 76)
        self.col(l3, 0.85, xl=0.55)
        tl = self.t("Trois lettres", 34, VERT_OK).next_to(l3, RIGHT, buff=0.35)
        cop = VGroup(*[f.lettre(k).copy() for k in "ABC"])
        self.play(*[Transform(c, l) for c, l in zip(cop, l3)], FadeIn(tl), run_time=0.55)
        self.add(l3)
        self.remove(cop)
        self.au_mot("ni plus")
        pl = tuile("ABCD", ROUGE_ERREUR, 58)
        self.col(pl, -0.45, xl=0.55)
        np_ = self.t("ni plus,", 34, ROUGE_ERREUR).next_to(pl, RIGHT, buff=0.5)
        x1 = croix(pl, sw=8)
        self.play(FadeIn(pl, scale=1.15), FadeIn(np_), Create(x1), run_time=0.4)
        self.au_mot("ni moins")
        mo = tuile("AB", ROUGE_ERREUR, 58)
        self.col(mo, -1.55, xl=0.55)
        nm = self.t("ni moins.", 34, ROUGE_ERREUR).next_to(mo, RIGHT, buff=0.5)
        x2 = croix(mo, sw=8)
        self.play(FadeIn(mo, scale=1.15), FadeIn(nm), Create(x2), run_time=0.4)
        self.attendre_voix()

    # ── 04 : l'ordre des lettres ────────────────────────────────────────────
    def ecran_ordre(self):
        self.ecran("04-ordre")
        f = Tri(P(-5.1, -2.2), P(-0.9, -1.5), P(-3.6, 2.15), noms=("D", "E", "F"), fs=60, sw=8, r_point=0.13)
        self.au_mot("L'ordre")
        tit = self.t("L'ordre des lettres ne compte pas.", 36, JAUNE_TITRE)
        self.col(tit, 2.75, xl=0.35)
        self.play(FadeIn(tit, shift=UP * 0.15), run_time=0.35)

        def nom(cle, lettres, y, xl=1.2, couleur=AMBRE):
            self.au_mot(cle[0])
            t = tuile(lettres, couleur, 60)
            self.col(t, y, xl=xl)
            for i, k in enumerate(lettres):
                if i:
                    self.au_mot(cle[i])
                self.play(FadeIn(t[i], scale=1.5), Indicate(f.point(k), color=AMBRE, scale_factor=2), run_time=0.2)
            return t

        self.au_mot("Voici le triangle")
        self.play(FadeIn(f), run_time=0.3)
        nom(("triangle D", "E F", "F."), "DEF", 1.65)
        self.au_mot("On peut dire")
        ou = self.t("On peut dire aussi", 32)
        self.col(ou, 0.85, xl=1.2)
        self.play(FadeIn(ou, shift=UP * 0.1), run_time=0.25)
        nom(("F E D", "E D,", "D,"), "FED", 0.1)
        self.au_mot("ou E")
        o2 = self.t("ou", 32)
        self.col(o2, -0.8, xl=1.2)
        self.play(FadeIn(o2), run_time=0.15)
        nom(("E F D", "F D.", "D."), "EFD", -0.8, xl=1.2 + o2.width + 0.35)
        self.au_mot("C'est le même")
        v = self.tampon("Le même triangle", VERT_OK, 38)
        self.col(v, -2.05, xl=0.75)
        self.play(FadeIn(v, scale=1.2), run_time=0.35)
        self.au_mot("n'ont pas bougé")
        self.play(Flash(f.dots[0], color=VERT_OK), Flash(f.dots[1], color=VERT_OK), Flash(f.dots[2], color=VERT_OK), run_time=0.5)
        self.attendre_voix()

    # ── 05 : QUESTION 1 ─────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        f = Tri(P(-5.2, -2.3), P(-1.3, -1.7), P(-3.5, 1.3), noms=("R", "S", "T"), fs=48, r_point=0.11)

        def avant(sc):
            sc.play(FadeIn(f.fond), Create(f.cotes), FadeIn(f.dots), run_time=0.3)
            # les lettres paraissent au mot, pendant que la question s'écrit
            for k, mot in (("R", "R, S"), ("S", "S et"), ("T", "et T")):
                t_k = sc.renderer.time + sc.t_mot(mot)
                m = f.lettre(k).set_opacity(0)
                m.add_updater(lambda x, t_k=t_k: x.set_opacity(1 if sc.renderer.time >= t_k else 0))
                sc.add(m)

        def apres(sc):
            sc.play(*[Indicate(x, color=VERT_OK, scale_factor=1.3) for x in f.lettres], run_time=0.4)
            sc.rep_fin()

        self.question_pause("05-question", "05b-reponse", ["Un triangle a pour", "sommets R, S et T.", "Quel est son nom ?"],
                            [self.t("triangle RS", 32), self.t("triangle TRS", 32), self.t("triangle RSTU", 32)], 1,
                            ["TRS : les trois sommets.", "L'ordre ne compte pas."], mot_q="Un triangle",
                            avant_q=avant, autres_r=apres)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention !", 50, ROUGE_ERREUR)
        self.col(tit, 2.8, xl=1.0)
        self.play(Write(tit), run_time=0.35)
        f = Tri(P(-5.1, -1.6), P(-1.1, -2.2), P(-3.1, 1.9), noms=("A", "B", "C"), fs=56, sw=8, r_point=0.13)
        self.play(FadeIn(f), run_time=0.25)
        self.au_mot("Deux lettres")
        dl = self.bloc(["Deux lettres ne nomment", "pas un triangle."], 36)
        self.col(dl, 1.75, xl=1.0)
        self.play(FadeIn(dl, shift=UP * 0.15), run_time=0.35)
        self.au_mot("A B entre")
        seg = self.t("[AB]", 72, "#fb923c")
        self.col(seg, 0.55, xl=1.0)
        ab = f.cote("A", "B")
        self.play(FadeIn(seg, scale=1.4), ab.animate.set_stroke("#fb923c", width=14),
                  f.cote("B", "C").animate.set_stroke(opacity=0.22), f.cote("C", "A").animate.set_stroke(opacity=0.22),
                  f.fond.animate.set_fill(opacity=0.03), f.lettre("C").animate.set_opacity(0.22), f.point("C").animate.set_opacity(0.22), run_time=0.4)
        self.au_mot("un segment")
        s1 = self.t("un segment,", 36, "#fb923c").next_to(seg, RIGHT, buff=0.4).shift(UP * 0.22)
        self.play(FadeIn(s1, shift=RIGHT * 0.1), run_time=0.25)
        self.au_mot("un seul côté")
        s2 = self.t("un seul côté.", 36, "#fb923c").next_to(s1, DOWN, buff=0.14, aligned_edge=LEFT)
        self.play(FadeIn(s2, shift=RIGHT * 0.1), run_time=0.25)
        self.au_mot("Et une lettre")
        el = self.t("Et une lettre en trop,", 36)
        self.col(el, -0.72, xl=1.0)
        self.play(FadeIn(el, shift=UP * 0.1), ab.animate.set_stroke(COTE, width=8), f.cote("B", "C").animate.set_stroke(opacity=1),
                  f.cote("C", "A").animate.set_stroke(opacity=1), f.lettre("C").animate.set_opacity(1), f.point("C").animate.set_opacity(1), run_time=0.3)
        self.au_mot("un autre point")
        d = Dot(P(-0.75, 1.1), radius=0.13, color=ROUGE_ERREUR)
        ld = Text("D", font_size=56, color=ROUGE_ERREUR, weight=BOLD)
        ld._pas_audit = ld.sans_synchro = True
        ld.next_to(d, RIGHT, buff=0.14)
        ap = self.t("c'est un autre point.", 36, ROUGE_ERREUR)
        self.col(ap, -1.4, xl=1.0)
        self.play(FadeIn(ap, shift=UP * 0.1), FadeIn(d, scale=2.5), FadeIn(ld, scale=1.5), run_time=0.35)
        self.attendre_voix()

    # ── 07 : QUESTION 2 ─────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        f = Tri(P(-5.2, -2.3), P(-1.5, -1.8), P(-3.9, 1.2), noms=("K", "L", "M"), fs=48, r_point=0.11)
        p = Dot(P(-1.2, 0.6), radius=0.12, color=ROUGE_ERREUR)
        lp = Text("P", font_size=48, color=ROUGE_ERREUR, weight=BOLD)
        lp._pas_audit = lp.sans_synchro = True
        lp.next_to(p, UP, buff=0.12)

        def avant(sc):
            sc.play(FadeIn(f), run_time=0.3)
            # le point P paraît au mot, pendant que la question s'écrit
            t_p = sc.renderer.time + sc.t_mot("Le point P")
            g = VGroup(p, lp).set_opacity(0)
            g.add_updater(lambda m: m.set_opacity(1 if sc.renderer.time >= t_p else 0))
            sc.add(g)

        def apres(sc):
            sc.play(*[Indicate(x, color=VERT_OK, scale_factor=1.4) for x in f.lettres], run_time=0.5)
            sc.rep_fin()

        self.question_pause("07-question", "07b-reponse", ["Voici le triangle KLM.", "Le point P est-il", "un de ses sommets ?"],
                            [self.t("oui", 34), self.t("non", 34), self.t("on ne peut pas savoir", 30)], 1,
                            ["Les sommets : K, L et M.", "P n'en fait pas partie."],
                            mot_q="Voici", avant_q=avant, autres_r=apres)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def figure_defi(self):
        return Tri(P(-5.1, -2.2), P(-1.0, -1.6), P(-3.7, 1.7), noms=("G", "H", "T"), fs=60, sw=8, r_point=0.13)

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        f = self.figure_defi()
        self.add(f.fond, f.cotes, f.dots)
        self.au_mot("Un triangle")
        l1 = self.t("Un triangle a pour sommets", 34)
        self.col(l1, 1.9, xl=0.7)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("G, H")
        l2 = self.t("G, H et T.", 44, AMBRE)
        self.col(l2, 1.2, xl=0.7)
        self.play(FadeIn(l2, scale=1.2), FadeIn(f.lettres, scale=1.5), run_time=0.3)
        self.au_mot("Trouve")
        l3 = self.bloc(["Trouve trois noms différents", "pour ce triangle."], 36, ORANGE_RETENUE)
        self.col(l3, 0.1, xl=0.7)
        self.play(FadeIn(l3, shift=UP * 0.15), run_time=0.35)
        self.pause_defi(y=-1.3)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        f = self.figure_defi()
        self.add(f)
        self.play(Write(tit), run_time=0.35)
        self.au_mot("Par exemple")
        pe = self.t("Par exemple :", 36)
        self.col(pe, 2.2, xl=0.9)
        self.play(FadeIn(pe), run_time=0.25)
        for cles, lt, y in ((("G H T", "H T,", "T,"), "GHT", 1.4), (("T G H", "G H et", "H et"), "TGH", 0.55), (("H T G", "T G.", "G."), "HTG", -0.3)):
            t = tuile(lt, VERT_OK, 62)
            self.col(t, y, xl=1.3)
            for i, k in enumerate(lt):
                self.au_mot(cles[i])
                self.play(FadeIn(t[i], scale=1.4), Indicate(f.point(k), color=VERT_OK, scale_factor=1.8), run_time=0.17)
        self.au_mot("Il y en a")
        ad = self.bloc(["Il y en a", "d'autres."], 34, AMBRE).move_to(P(5.1, 0.55))
        self.play(FadeIn(ad, shift=LEFT * 0.1), run_time=0.3)
        self.au_mot("Il faut")
        rg = self.bloc(["Il faut toujours les trois lettres,", "une seule fois chacune."], 34)
        self.col(rg, -1.4, xl=0.6)
        self.play(FadeIn(rg[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("une seule")
        self.play(FadeIn(rg[1], shift=UP * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        f = Tri(P(0, 0), P(3.2, 0.4), P(1.2, 2.9), noms=("A", "B", "C"), fs=46, sw=7).scale(0.95)
        f.figer = None
        self.add(f)
        lignes = self.finale_colonne(figure=f, textes=[
            ("Un triangle se nomme", "avec ses trois sommets."),
            ("L'ordre des lettres", "ne compte pas."),
            ("Deux lettres, ce n'est", "qu'un côté.")], fs=36)
        self.au_mot("Un triangle")
        self.montrer_ligne(lignes[0], *[Indicate(p, color=SOMMET, scale_factor=2) for p in f.dots])
        self.au_mot("L'ordre")
        self.montrer_ligne(lignes[1])
        self.au_mot("Deux lettres")
        self.montrer_ligne(lignes[2], Indicate(f.cotes[0], color="#fb923c"))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_sommets()
        self.ecran_trois_lettres()
        self.ecran_ordre()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class TriangleNommer6e(TriangleNommerBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
