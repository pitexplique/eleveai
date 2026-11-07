# triangle_possible_ou_non.py
# EleveAI — Maths 6e — série « Triangles », épisode 08 : UN TRIANGLE EST-IL TOUJOURS POSSIBLE ?
# (micro triangle_possible_ou_non, notion triangle_propriete), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : film Ti Margo (prototypes/ti-margo/films/triangles.js, épisode possible-ou-non).
# Décor et métier : Zoé, FABRICANTE DE CADRES DE VÉLO (centres : transports, sport).
# ⭐ Baguettes à l'échelle : 2-3-6 ne se rejoignent pas (il manque vraiment 1 cm), 3-4-7 se couchent
#   exactement sur la grande, 4-5-7 ferment.
# Voix : manim/voix/6e-triangle-possible-ou-non.json ; marques : triangle_possible_ou_non_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/triangle_possible_ou_non.py TrianglePossibleOuNon6e
# python -m manim render -qh --disable_caching manim/scripts/6e/triangle_possible_ou_non.py TrianglePossibleOuNon6e -o eleveai-maths-6e-triangle-possible-ou-non --media_dir manim/scripts/6e/media-tri-08
# Sortie : manim/sorties/6e/maths/triangles/08-possible-ou-non/eleveai-maths-6e-triangle-possible-ou-non.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403
from canvas_angles import *  # noqa: E402,F403
from canvas_triangles import *  # noqa: E402,F403
from triangle_propriete_commun import *  # noqa: E402,F403

C_P1, C_P2 = C_COINS[2], C_COINS[0]  # les deux baguettes qui tournent


def zoe(s=1.0):
    """Zoé : son tablier d'atelier et sa clé."""
    p = visage(personne(peau="#f1c27d", tenue="#1d4ed8", cheveux="#b45309", longs=False, s=s))
    cle = Line(p.corps.get_center() + P(0.35, -0.5) * s, p.corps.get_center() + P(0.95, 0.15) * s, color="#cbd5e1", stroke_width=10)
    p.add(cle)
    return p


def velo(centre=ORIGIN, s=1.0):
    """Un vélo : les deux roues et le cadre, fait de deux triangles (.t1 .t2)."""
    c = np.array(centre, dtype=float)
    q = lambda x, y: c + np.array([x * s, y * s, 0.0])  # noqa: E731
    roues = VGroup(*[Circle(radius=0.95 * s, color="#94a3b8", stroke_width=7).move_to(q(x, 0)) for x in (-1.75, 1.75)])
    R, BB, S, H, F = q(-1.75, 0), q(-0.25, -0.05), q(-0.75, 1.3), q(1.05, 1.3), q(1.75, 0)
    t1 = Polygon(R, BB, S, fill_color=C_P1, fill_opacity=0.3, stroke_color=C_P1, stroke_width=8)
    t2 = Polygon(BB, S, H, fill_color=C_P2, fill_opacity=0.3, stroke_color=C_P2, stroke_width=8)
    fourche = Line(H, F, color="#cbd5e1", stroke_width=8)
    selle = Line(q(-1.05, 1.5), q(-0.5, 1.5), color="#f8fafc", stroke_width=10)
    guidon = Line(H, q(1.25, 1.65), color="#cbd5e1", stroke_width=8)
    g = VGroup(roues, fourche, selle, guidon, t1, t2)
    g.t1, g.t2 = t1, t2
    return g


class Baguettes(VGroup):
    """Trois baguettes (en cm, à l'échelle) : la grande posée, les petites attachées à chaque bout.
    .gauche et .droite pivotent autour de leur bout attaché : angle en degrés depuis la grande."""

    def __init__(self, a, b, grande, ech=0.8, g=(-6.0, -1.7), fs=34, noms=True, **kw):
        super().__init__(**kw)
        self.a, self.b, self.c, self.ech = a, b, grande, ech
        self.B = P(*g)
        self.C = self.B + RIGHT * grande * ech
        self.grande = baguette(self.B, self.C)
        self.gauche = baguette(self.B, self.B + RIGHT * a * ech, C_P1, 11)
        self.droite = baguette(self.C, self.C + LEFT * b * ech, C_P2, 11)
        self.add(self.grande, self.gauche, self.droite)
        self.fs = fs

    def pivoter(self, ag, ad):
        """Lève les petites : ag au-dessus de la grande à gauche, ad à droite (immédiat)."""
        self.gauche.rotate(np.deg2rad(ag), about_point=self.B)
        self.droite.rotate(np.deg2rad(-ad), about_point=self.C)
        self.ag, self.ad = ag, ad
        return self

    def tourner(self, ag, ad, run_time=1.0):
        """L'animation qui amène les petites aux angles ag et ad."""
        da, dd = ag - self.ag, ad - self.ad
        self.ag, self.ad = ag, ad
        return (Rotate(self.gauche, np.deg2rad(da), about_point=self.B, rate_func=smooth, run_time=run_time),
                Rotate(self.droite, np.deg2rad(-dd), about_point=self.C, rate_func=smooth, run_time=run_time))

    def angles_fermes(self):
        """Les angles où les deux petites se touchent (a + b > grande)."""
        h = sommet_haut(self.B, self.C, self.a * self.ech, self.b * self.ech)
        u, v = h - self.B, h - self.C
        return float(np.degrees(np.arctan2(u[1], u[0]))), float(np.degrees(np.arctan2(v[1], -v[0])))

    def lab_grande(self, t=None, couleur=BOIS):
        return etq(t or f"{self.c} cm", self.fs, couleur).next_to(self.grande, DOWN, buff=0.16)


class TrianglePossibleBase(CalculAuMot, FinTriangles, PaysageProp):
    nom_voix = "6e-triangle-possible-ou-non"
    fichier_marques = "triangle_possible_ou_non_marques.json"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Un triangle est-il toujours possible ?", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Un triangle")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.au_mot("Trois longueurs")
        q = self.bloc(["Trois longueurs font-elles", "toujours un triangle ?"], 40).move_to(P(-2.5, 0.4))
        b = Baguettes(2, 3, 6, ech=0.62, g=(2.0, -0.6)).pivoter(50, 40)
        self.play(FadeIn(q, shift=UP * 0.2), FadeIn(b), run_time=0.45)
        self.attendre_voix(marge=0.6)

    # ── 01 : Zoé fabrique des cadres ────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        zo = zoe(1.05).move_to(P(-5.0, 0.1))
        self.au_mot("Voici Zoé")
        nom = self.t("Zoé", 44, BLEU_CALCUL).next_to(zo, UP, buff=0.2)
        self.play(FadeIn(zo, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Elle fabrique")
        met = self.bloc(["Elle fabrique des", "cadres de vélo."], 30, BLEU_CALCUL).next_to(zo, DOWN, buff=0.15).set_x(-4.6)
        v = velo(P(0.6, 0.85), 1.05)
        self.play(FadeIn(met, shift=DOWN * 0.1), FadeIn(v, shift=UP * 0.1), run_time=0.45)
        self.au_mot("Un cadre")
        l1 = self.t("Un cadre de vélo est fait de triangles.", 34, AMBRE).move_to(P(1.45, -0.75))
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(v.t1, color=C_P1, scale_factor=1.12), Indicate(v.t2, color=C_P2, scale_factor=1.12), run_time=0.6)
        self.au_mot("Zoé teste")
        l2 = self.bloc(["Zoé teste d'abord une maquette,", "avec trois baguettes."], 34).move_to(P(2.0, -1.9))
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        self.attendre_voix()

    # ── 02 : le premier essai, raté ─────────────────────────────────────────
    def ecran_non(self):
        self.ecran("02-non")
        tit = self.t("Premier essai :", 40, JAUNE_TITRE)
        self.col(tit, 2.8, xl=0.7)
        self.au_mot("Premier essai")
        self.play(FadeIn(tit, shift=UP * 0.1), run_time=0.3)
        lg = VGroup(etq("2 cm", 46, C_P1), etq("3 cm", 46, C_P2), etq("6 cm", 46, BOIS)).arrange(RIGHT, buff=0.55)
        self.col(lg, 1.95, xl=0.7)
        b = Baguettes(2, 3, 6, g=(-6.0, -1.7)).pivoter(95, 70)
        for i, m in enumerate(("2 centimètres", "3 centimètres", "6 centimètres")):
            self.au_mot(m)
            self.play(FadeIn(lg[i], scale=1.25), run_time=0.22)
        self.au_mot("Zoé pose")
        l1 = self.t("Zoé pose la grande.", 36)
        self.col(l1, 1.0, xl=0.7)
        lab = b.lab_grande()
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(b.grande), FadeIn(lab), run_time=0.35)
        self.au_mot("Elle attache")
        l2 = self.bloc(["Elle attache les petites", "à chaque bout."], 36)
        self.col(l2, 0.05, xl=0.7)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(b.gauche), FadeIn(b.droite), run_time=0.4)
        self.au_mot("Elles tournent")
        l3 = self.t("Elles tournent, tournent,", 36, AMBRE)
        self.col(l3, -1.05, xl=0.7)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.25)
        self.play(*b.tourner(35, 25, 1.2))
        self.au_mot("et ne se")
        l4 = self.t("et ne se rejoignent pas !", 38, ROUGE_ERREUR)
        self.col(l4, -1.6, xl=0.7)
        self.play(FadeIn(l4, scale=1.1), *b.tourner(0, 0, 0.8))
        self.attendre_voix()

    # ── 03 : pourquoi ───────────────────────────────────────────────────────
    def ecran_pourquoi(self):
        self.ecran("03-pourquoi")
        b = Baguettes(2, 3, 6).pivoter(0, 0)
        self.add(b, b.lab_grande())
        self.au_mot("Pourquoi")
        tit = self.t("Pourquoi ?", 46, JAUNE_TITRE)
        self.col(tit, 2.7, xl=0.7)
        self.play(FadeIn(tit, shift=UP * 0.1), run_time=0.3)
        self.poser_calcul([("2", C_P1), ("+", WHITE), ("3", C_P2), ("=", WHITE), ("5", AMBRE)], 1.55,
                          [("2 plus", 1, (0, 1)), ("3 :", 1, (2, 3)), ("5.", 1, (4,))], xl=0.7, fs=60)
        self.au_mot("Les deux petites")
        l1 = self.t("Les deux petites font 5 cm,", 36)
        self.col(l1, 0.45, xl=0.7)
        pet = Text("2 cm", font_size=32, color=C_P1, weight=BOLD)
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(b.gauche, color=C_P1, scale_factor=1.05), Indicate(b.droite, color=C_P2, scale_factor=1.05), run_time=0.4)
        self.au_mot("moins que")
        l2 = self.t("moins que 6.", 40, ROUGE_ERREUR)
        self.col(l2, -0.4, xl=0.7)
        self.play(FadeIn(l2, scale=1.1), run_time=0.3)
        self.au_mot("Il manque")
        l3 = self.tampon("Il manque 1 cm.", ROUGE_ERREUR, 42)
        self.col(l3, -1.55, xl=0.7)
        trou = Line(b.B + RIGHT * 2 * b.ech + UP * 0.03, b.B + RIGHT * 3 * b.ech + UP * 0.03, color=ROUGE_ERREUR, stroke_width=20)
        e1 = etq("1 cm", 36, ROUGE_ERREUR).next_to(trou, UP, buff=0.22)
        self.play(FadeIn(l3, scale=1.15), Create(trou), FadeIn(e1, scale=1.3), run_time=0.4)
        self.attendre_voix()

    # ── 04 : le deuxième essai, réussi ──────────────────────────────────────
    def ecran_oui(self):
        self.ecran("04-oui")
        self.au_mot("Deuxième essai")
        tit = self.t("Deuxième essai :", 40, JAUNE_TITRE)
        self.col(tit, 2.8, xl=0.7)
        self.play(FadeIn(tit, shift=UP * 0.1), run_time=0.3)
        lg = VGroup(etq("4 cm", 46, C_P1), etq("5 cm", 46, C_P2), etq("7 cm", 46, BOIS)).arrange(RIGHT, buff=0.55)
        self.col(lg, 1.95, xl=0.7)
        b = Baguettes(4, 5, 7, ech=0.74, g=(-6.1, -1.7)).pivoter(0, 0)
        lab = b.lab_grande()
        for i, m in enumerate(("4 centimètres", "5 centimètres", "7 centimètres")):
            self.au_mot(m)
            self.play(FadeIn(lg[i], scale=1.25), *( [FadeIn(b), FadeIn(lab)] if i == 0 else []), run_time=0.22)
        self.poser_calcul([("4", C_P1), ("+", WHITE), ("5", C_P2), ("=", WHITE), ("9", AMBRE)], 0.85,
                          [("4 plus", 1, (0, 1)), ("5 :", 1, (2, 3)), ("9.", 1, (4,))], xl=0.7, fs=56)
        self.au_mot("C'est plus grand")
        l1 = self.t("C'est plus grand que 7.", 38, VERT_OK)
        self.col(l1, -0.05, xl=0.7)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Les baguettes")
        l2 = self.t("Les baguettes se rejoignent :", 36)
        self.col(l2, -0.8, xl=0.7)
        ag, ad = b.angles_fermes()
        self.play(FadeIn(l2, shift=UP * 0.1), *b.tourner(ag, ad, 1.0))
        self.au_mot("le triangle existe")
        l3 = self.tampon("le triangle existe !", VERT_OK, 38)
        self.col(l3, -1.5, xl=0.7)
        h = sommet_haut(b.B, b.C, 4 * b.ech, 5 * b.ech)
        self.play(FadeIn(l3, scale=1.15), Flash(h, color=VERT_OK), run_time=0.5)
        self.attendre_voix()

    # ── 05 : le test ────────────────────────────────────────────────────────
    def ecran_test(self):
        self.ecran("05-test")
        self.au_mot("Le test")
        tit = self.t("Le test :", 48, JAUNE_TITRE).move_to(P(0, 2.95))
        self.play(FadeIn(tit, shift=UP * 0.1), run_time=0.3)
        self.au_mot("on ajoute")
        l1 = self.t("On ajoute les deux plus petites longueurs.", 38).move_to(P(0, 1.95))
        e = 0.72
        x0 = -2.5
        p1 = baguette(P(x0, 0.9), P(x0 + 4 * e, 0.9), C_P1, 12)
        p2 = baguette(P(x0 + 4 * e, 0.9), P(x0 + 9 * e, 0.9), C_P2, 12)
        self.play(FadeIn(l1, shift=UP * 0.1), Create(p1), Create(p2), run_time=0.5)
        self.au_mot("Le résultat")
        l2 = self.t("Le résultat doit être plus grand que la troisième.", 36, VERT_OK).move_to(P(0, -1.0))
        gr = baguette(P(x0, 0.1), P(x0 + 7 * e, 0.1), BOIS, 12)
        reste = DoubleArrow(P(x0 + 7 * e, 0.1), P(x0 + 9 * e, 0.1), color=VERT_OK, buff=0.02, stroke_width=5, tip_length=0.18)
        self.play(FadeIn(l2, shift=UP * 0.1), Create(gr), run_time=0.4)
        self.play(GrowFromCenter(reste), run_time=0.3)
        self.attendre_voix()

    # ── 06 : QUESTION 1 ─────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        b = Baguettes(1, 2, 10, ech=0.52, g=(-6.2, -1.9), fs=30).pivoter(0, 0)
        lab = b.lab_grande()

        def avant(sc):
            sc.play(FadeIn(b.grande), FadeIn(lab), FadeIn(b.gauche), FadeIn(b.droite), run_time=0.3)

        self.question_pause("06-question", "06b-reponse", ["Peut-on construire", "un triangle de côtés", "1 cm, 2 cm et 10 cm ?"],
                            [self.t("oui", 34), self.t("non", 34), self.t("oui, en très grand", 32)], 1,
                            ["1 + 2 = 3,", "plus petit que 10."], mot_q="Peut-on", avant_q=avant)

    # ── 07 : le cas tout plat ───────────────────────────────────────────────
    def ecran_plat(self):
        self.ecran("07-plat")
        self.au_mot("Le cas piège")
        tit = self.t("Le cas piège :", 42, ROUGE_ERREUR)
        self.col(tit, 2.8, xl=0.7)
        self.play(FadeIn(tit, shift=UP * 0.1), run_time=0.3)
        lg = VGroup(etq("3 cm", 46, C_P1), etq("4 cm", 46, C_P2), etq("7 cm", 46, BOIS)).arrange(RIGHT, buff=0.55)
        self.col(lg, 1.95, xl=0.7)
        b = Baguettes(3, 4, 7, ech=0.74, g=(-6.1, -1.7)).pivoter(58, 41)
        lab = b.lab_grande()
        for i, m in enumerate(("3 centimètres", "4 centimètres", "7 centimètres")):
            self.au_mot(m)
            self.play(FadeIn(lg[i], scale=1.25), *([FadeIn(b), FadeIn(lab)] if i == 0 else []), run_time=0.22)
        calc7 = self.poser_calcul([("3", C_P1), ("+", WHITE), ("4", C_P2), ("=", WHITE), ("7", AMBRE)], 0.85,
                          [("3 plus", 1, (0, 1)), ("4 :", 1, (2, 3)), ("7, tout", 1, (4,))], xl=0.7, fs=48)
        self.au_mot("tout juste")
        lj = etq("tout juste !", 32, AMBRE).next_to(calc7, RIGHT, buff=0.3)
        self.play(FadeIn(lj, scale=1.2), run_time=0.25)
        self.au_mot("Les baguettes")
        l1 = self.bloc(["Les baguettes se couchent", "sur la grande."], 34)
        self.col(l1, -0.05, xl=0.7)
        self.play(FadeIn(l1, shift=UP * 0.1), *b.tourner(0, 0, 1.1))
        self.au_mot("Le triangle est")
        l2 = self.t("Le triangle est tout plat :", 36, ROUGE_ERREUR)
        self.col(l2, -1.25, xl=0.7)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("ce n'est pas")
        l3 = self.tampon("Pas un vrai triangle.", ROUGE_ERREUR, 36)
        self.col(l3, -2.1, xl=0.7)
        self.play(FadeIn(l3, scale=1.1), run_time=0.35)
        self.attendre_voix()

    # ── 08 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("08-piege")
        self.au_mot("Attention")
        tit = self.t("Attention !", 50, ROUGE_ERREUR).move_to(P(-3.0, 2.95))
        self.play(Write(tit), run_time=0.35)
        self.au_mot("Prends bien")
        l1 = self.t("Prends bien les deux plus petites.", 40).move_to(P(0, 2.0))
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Avec 6")
        av = etq("Avec", 42).move_to(P(-5.2, 1.0))
        vals = VGroup(etq("6,", 50, BOIS), etq("2", 50, C_P1), etq("et", 42), etq("3", 50, C_P2)).arrange(RIGHT, buff=0.3).next_to(av, RIGHT, buff=0.3)
        self.play(FadeIn(av), FadeIn(vals[0], scale=1.3), run_time=0.2)
        self.au_mot("2 et")
        self.play(FadeIn(vals[1], scale=1.3), FadeIn(vals[2]), run_time=0.2)
        self.au_mot("3 :")
        self.play(FadeIn(vals[3], scale=1.3), run_time=0.2)
        faux = VGroup(*[etq(t, 48, c) for t, c in (("6", BOIS), ("+", WHITE), ("2", C_P1), ("=", WHITE), ("8,", WHITE), ("plus grand que", WHITE), ("3", C_P2))]).arrange(RIGHT, buff=0.2)
        faux.move_to(P(0, 0.0)).align_to(P(-6.1, 0), LEFT)
        for m, idx in (("6 plus", (0, 1)), ("2 fait", (2, 3)), ("8,", (4,)), ("plus grand", (5,)), ("3. Ça", (6,))):
            self.au_mot(m)
            self.play(*[FadeIn(faux[i], shift=RIGHT * 0.08) for i in idx], run_time=0.22)
        self.au_mot("Ça ne prouve")
        cr = croix(faux, sw=8)
        l2 = self.t("Ça ne prouve rien !", 42, ROUGE_ERREUR).move_to(P(0, -0.95)).align_to(P(-6.1, 0), LEFT)
        self.play(FadeIn(l2, scale=1.1), Create(cr), run_time=0.35)
        self.au_mot("Il faut")
        l3 = self.t("Il faut ajouter", 40, VERT_OK).move_to(P(0, -1.95)).align_to(P(-6.1, 0), LEFT)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.25)
        bon = VGroup(*[etq(t, 48, c) for t, c in (("2", C_P1), ("et", WHITE), ("3 :", C_P2), ("5,", AMBRE), ("moins que", WHITE), ("6.", BOIS))]).arrange(RIGHT, buff=0.2)
        bon.next_to(l3, RIGHT, buff=0.3)
        for m, n, idx in (("2 et", 2, (0, 1)), ("3 :", 2, (2,)), ("5,", 1, (3,)), ("moins", 1, (4,)), ("6.", 1, (5,))):
            self.au_mot(m, n)
            self.play(*[FadeIn(bon[i], shift=RIGHT * 0.08) for i in idx], run_time=0.22)
        self.attendre_voix()

    # ── 09 : QUESTION 2 ─────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        b = Baguettes(6, 8, 10, ech=0.46, g=(-6.2, -1.9), fs=30).pivoter(0, 0)
        lab = b.lab_grande()
        ag, ad = b.angles_fermes()

        def avant(sc):
            sc.play(FadeIn(b), FadeIn(lab), run_time=0.3)

        def apres(sc):
            sc.play(*b.tourner(ag, ad, 0.35))

        ca = self.t("oui, 6 + 8 > 10", 32)
        ca._pas_audit = True  # il attend « 10 » : jamais en avance ; la coche le resserre à la réponse
        self.question_pause("09-question", "09b-reponse", ["6 cm, 8 cm et 10 cm :", "le triangle existe-t-il ?"],
                            [ca, self.t("non, 10 est trop grand", 30), self.t("non, il serait tout plat", 30)], 0,
                            ["6 + 8 = 14,", "plus grand que 10."], avant_q=avant, autres_r=apres)

    # ── 10 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("10-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        self.au_mot("Zoé a")
        l1 = self.t("Zoé a deux baguettes :", 38)
        l1.move_to(P(0, 2.2)).align_to(P(-6.2, 0), LEFT)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        e = 0.62
        for lg_, y, m in ((5, 1.35, "5 centimètres"), (9, 0.75, "9 centimètres")):
            self.au_mot(m)
            ba = baguette(P(-6.1, y), P(-6.1 + lg_ * e, y), BOIS, 12)
            la = etq(f"{lg_} cm", 38, AMBRE).next_to(ba, RIGHT, buff=0.25)
            self.play(Create(ba), FadeIn(la, scale=1.2), run_time=0.25)
        self.au_mot("Pour la troisième")
        l2 = self.t("Pour la troisième, elle hésite :", 38)
        l2.move_to(P(0, -0.05)).align_to(P(-6.2, 0), LEFT)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        vals = VGroup(etq("3 cm", 50, C_P1), etq("4 cm", 50, C_P1), etq("ou", 40), etq("6 cm", 50, C_P1)).arrange(RIGHT, buff=0.45)
        vals.move_to(P(0, -0.85)).align_to(P(-6.1, 0), LEFT)
        for m, idx in (("3 centimètres", (0,)), ("4 centimètres", (1,)), ("ou 6", (2, 3))):
            self.au_mot(m)
            self.play(*[FadeIn(vals[i], scale=1.25) for i in idx], run_time=0.22)
        self.au_mot("Laquelle")
        l3 = self.t("Laquelle ferme le triangle ?", 42, ORANGE_RETENUE).move_to(P(0, -1.75)).align_to(P(-6.2, 0), LEFT)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        self.pause_defi(y=-2.55)

    def ecran_correction(self):
        self.ecran("10b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)

        def rangee(y, morceaux, mots):
            lg = VGroup(*[etq(t, 46, c) for t, c in morceaux]).arrange(RIGHT, buff=0.2)
            lg.move_to(P(0, y)).align_to(P(-6.1, 0), LEFT)
            for m, n, idx in mots:
                self.au_mot(m, n)
                self.play(*[FadeIn(lg[i], shift=RIGHT * 0.08) for i in idx], run_time=0.2)
            return lg

        rangee(1.95, [("3", WHITE), ("+", WHITE), ("5", WHITE), ("=", WHITE), ("8,", AMBRE), ("moins que", WHITE), ("9.", WHITE), ("Non.", ROUGE_ERREUR)],
               [("3 plus", 1, (0, 1)), ("5 :", 1, (2, 3)), ("8,", 1, (4,)), ("moins", 1, (5,)), ("9. Non", 1, (6,)), ("Non", 1, (7,))])
        rangee(0.85, [("4", WHITE), ("+", WHITE), ("5", WHITE), ("=", WHITE), ("9,", AMBRE), ("tout plat.", WHITE), ("Non.", ROUGE_ERREUR)],
               [("4 plus", 1, (0, 1)), ("5 :", 2, (2, 3)), ("9, tout", 1, (4,)), ("tout plat", 1, (5,)), ("Non", 2, (6,))])
        rangee(-0.25, [("5", WHITE), ("+", WHITE), ("6", WHITE), ("=", WHITE), ("11,", AMBRE), ("plus grand que", WHITE), ("9.", WHITE), ("Oui :", VERT_OK)],
               [("5 plus", 1, (0, 1)), ("6 :", 1, (2, 3)), ("11", 1, (4,)), ("plus grand", 1, (5,)), ("9. Oui", 1, (6,)), ("Oui", 1, (7,))])
        self.au_mot("c'est la baguette")
        v = self.tampon("c'est la baguette de 6 cm.", VERT_OK, 42)
        v.move_to(P(0, -1.5)).align_to(P(-6.1, 0), LEFT)
        self.play(FadeIn(v, scale=1.15), run_time=0.35)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("11-finale", 0.65)
        b = Baguettes(4, 5, 7, ech=0.48, g=(0, 0)).pivoter(0, 0)
        ag, ad = b.angles_fermes()
        b.pivoter(ag, ad)
        b.figer = None
        self.add(b)
        lignes = self.finale_colonne(figure=b, textes=[
            ("Trois longueurs ne font pas", "toujours un triangle."),
            ("On ajoute les deux plus petites :", "le résultat doit dépasser", "la plus grande."),
            ("S'il est égal, le triangle", "est tout plat.")], fs=34)
        self.au_mot("Trois longueurs")
        self.montrer_ligne(lignes[0])
        self.au_mot("On ajoute")
        self.montrer_ligne(lignes[1])
        self.au_mot("S'il est")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_non()
        self.ecran_pourquoi()
        self.ecran_oui()
        self.ecran_test()
        self.ecran_question1()
        self.ecran_plat()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")


class TrianglePossibleOuNon6e(TrianglePossibleBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
