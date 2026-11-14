# longueur_comparer.py
# EleveAI — Maths CE2 — série « Longueurs », épisode 04 : COMPARER DES LONGUEURS
# (micro ce2_longueur_comparer, notion longueur), AVEC VOIX. Paysage 16:9, CEINTURE ORANGE.
# Short jumeau : film Ti Margo (le gecko : 1 dm contre 9 cm, réponse B).
# Décor et métier : Lina, BIOLOGISTE MARINE (centre : animaux) : une tortue, un requin, un dauphin…
# Mapping micro → écrans : 02 (même unité d'abord : 1 m = 100 cm), 03 (100 > 90 : la tortue, de 10 cm),
# 04 (même unité : on compare directement, 250 cm et 180 cm), 06 (piège : 90 > 1 mais 90 cm < 1 m),
# questions 05 (poisson 80 cm contre anguille 1 m, C) et 07 (950 m contre 1 km, le plus court : A),
# défi 08 (ranger algue 2 m, poisson 150 cm, méduse 30 cm).
# Voix : manim/voix/ce2-longueur-comparer.json (validée le 14/11, Julie, débit −6) ;
# marques : longueur_comparer_marques.json (python manim/scripts/ce2/perimetre_marques.py longueur:comparer).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/longueur_comparer.py LongueurComparerCE2
# python -m manim render -qh --disable_caching manim/scripts/ce2/longueur_comparer.py LongueurComparerCE2 -o eleveai-maths-ce2-longueur-comparer --media_dir manim/scripts/ce2/media-lg-04
# Sortie : manim/sorties/ce2/maths/longueur/04-comparer/eleveai-maths-ce2-longueur-comparer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from longueur_ce2_commun import *  # noqa: E402,F403

TORTUE = "#22c55e"
REQUIN = "#94a3b8"
DAUPHIN = "#38bdf8"
RAIE = "#a78bfa"
POISSON = "#fb923c"
ANGUILLE = "#a3e635"
ALGUE = "#15803d"
MEDUSE = "#f472b6"


def oeil(p, r=0.05):
    return Dot(p, radius=r, color=BLACK)


def poisson(L=1.5, couleur=POISSON, nageoire=False):
    """Un poisson de profil, tête à droite, de longueur totale L (queue comprise)."""
    h = L * 0.38
    corps = Ellipse(width=L * 0.78, height=h, fill_color=couleur, fill_opacity=1, stroke_width=0)
    corps.move_to(P(L * 0.11, 0))
    q = Polygon(P(-L * 0.28, 0), P(-L * 0.5, h * 0.45), P(-L * 0.5, -h * 0.45), fill_color=couleur,
                fill_opacity=1, stroke_width=0)
    g = VGroup(q, corps, oeil(P(L * 0.38, h * 0.1), max(0.03, L * 0.025)))
    if nageoire:
        g.add(Polygon(P(-L * 0.02, h * 0.45), P(L * 0.12, h * 0.95), P(L * 0.2, h * 0.45), fill_color=couleur,
                      fill_opacity=1, stroke_width=0))
    return g


def requin(L=2.0):
    return poisson(L, REQUIN, nageoire=True)


def dauphin(L=2.0):
    g = poisson(L, DAUPHIN, nageoire=True)
    g.add(Ellipse(width=L * 0.16, height=L * 0.07, fill_color=DAUPHIN, fill_opacity=1, stroke_width=0)
          .move_to(P(L * 0.52, -L * 0.02)))
    return g


def tortue(L=2.0, couleur=TORTUE):
    """Une tortue de mer vue de dessus, tête à droite, longueur L."""
    car = Ellipse(width=L * 0.7, height=L * 0.48, fill_color="#166534", fill_opacity=1, stroke_color=couleur,
                  stroke_width=4)
    motif = VGroup(*[RegularPolygon(6, fill_color=couleur, fill_opacity=0.6, stroke_width=0)
                     .scale(L * 0.07).move_to(P(dx * L, dy * L)) for dx, dy in ((0, 0), (-0.15, 0.08), (0.15, 0.08),
                                                                                 (-0.15, -0.08), (0.15, -0.08))])
    tete = Ellipse(width=L * 0.2, height=L * 0.15, fill_color=couleur, fill_opacity=1, stroke_width=0)
    tete.move_to(P(L * 0.4, 0))
    pattes = VGroup(*[Ellipse(width=L * 0.22, height=L * 0.08, fill_color=couleur, fill_opacity=1, stroke_width=0)
                      .rotate(a).move_to(P(dx * L, dy * L))
                      for dx, dy, a in ((0.18, 0.27, 0.6), (0.18, -0.27, -0.6), (-0.22, 0.22, -0.5),
                                        (-0.22, -0.22, 0.5))])
    return VGroup(pattes, tete, car, motif, oeil(P(L * 0.45, L * 0.03), L * 0.015))


def raie(L=1.8):
    corps = Polygon(P(L * 0.3, 0), P(0, L * 0.3), P(-L * 0.2, 0), P(0, -L * 0.3), fill_color=RAIE, fill_opacity=1,
                    stroke_width=0)
    q = Line(P(-L * 0.2, 0), P(-L * 0.7, 0), color=RAIE, stroke_width=4)
    return VGroup(q, corps, oeil(P(L * 0.17, L * 0.05), 0.04), oeil(P(L * 0.17, -L * 0.05), 0.04))


def anguille(L=2.0):
    c = FunctionGraph(lambda x: 0.12 * np.sin(x * 9 / L), x_range=[-L / 2, L / 2], color=ANGUILLE, stroke_width=12)
    return VGroup(c, oeil(c.get_end() + P(-0.03, 0.02), 0.035))


def algue(L=2.0):
    c = FunctionGraph(lambda x: 0.1 * np.sin(x * 12 / L), x_range=[-L / 2, L / 2], color=ALGUE, stroke_width=10)
    fe = VGroup(*[Ellipse(width=0.22, height=0.1, fill_color="#22c55e", fill_opacity=1, stroke_width=0)
                  .move_to(c.point_from_proportion(t) + UP * 0.08 * (1 if k % 2 else -1))
                  for k, t in enumerate((0.2, 0.4, 0.6, 0.8))])
    return VGroup(c, fe)


def meduse(L=0.5):
    d = AnnularSector(inner_radius=0, outer_radius=L * 0.4, angle=PI, start_angle=-PI / 2, fill_color=MEDUSE,
                      fill_opacity=1, stroke_width=0).move_to(P(L * 0.3, 0))
    t = VGroup(*[Line(P(L * 0.12, y), P(-L * 0.5, y + 0.03), color=MEDUSE, stroke_width=3)
                 for y in (-L * 0.25, 0, L * 0.25)])
    return VGroup(t, d)


def bateau(s=1.0):
    coque = Polygon(P(-0.6 * s, 0), P(0.6 * s, 0), P(0.42 * s, -0.3 * s), P(-0.42 * s, -0.3 * s),
                    fill_color="#f8fafc", fill_opacity=1, stroke_width=0)
    cab = Rectangle(width=0.4 * s, height=0.25 * s, fill_color="#38bdf8", fill_opacity=1, stroke_width=0)
    cab.next_to(coque, UP, buff=0).shift(LEFT * 0.1 * s)
    return VGroup(coque, cab)


def vague(W=12.0, y=-3.4):
    return FunctionGraph(lambda x: 0.07 * np.sin(x * 3), x_range=[-W / 2, W / 2], color="#0369a1",
                         stroke_width=3).shift(UP * y)


class LongueurComparerBase(PaysageLongueurCE2):
    nom_voix = "ce2-longueur-comparer"
    fichier_marques = "longueur_comparer_marques.json"
    ceinture = "orange"

    def avec_ruban(self, animal, cm, ech, couleur, y, x0=-4.5):
        """L'animal (petit dessin) à gauche, puis son ruban à sa longueur (cm × ech), aligné à gauche en x0."""
        L = cm * ech
        a = animal(1.3)
        a.scale_to_fit_width(1.3).move_to(P(x0 - 0.95, y))
        r = ruban(L, couleur, 0.3).move_to(P(x0 + L / 2, y))
        return a, r

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Comparer des longueurs", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Comparer des longueurs")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.t("Qui est le plus long ?", 42, JAUNE_TITRE)
        q.move_to(P(0, 0.4)).align_to(P(-6.2, 0), LEFT)
        t = tortue(2.0).move_to(P(3.2, 1.0))
        r = requin(1.9).move_to(P(3.2, -0.3))
        self.au_mot("Qui est le plus long")
        self.play(FadeIn(q, shift=UP * 0.2), FadeIn(t, shift=LEFT * 0.4), FadeIn(r, shift=RIGHT * 0.4), run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 01 : Lina, biologiste marine ────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = lina(0.95).move_to(P(-5.0, 0.4))
        self.au_mot("Voici Lina")
        nom = self.t("Lina", 42, JAUNE_TITRE).next_to(pe, UP, buff=0.55)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("biologiste marine")
        met = self.bloc(["biologiste", "marine"], 24, "#67e8f9", buff=0.06).next_to(pe, DOWN, buff=0.12)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("elle étudie les animaux de la mer")
        l0 = self.t("Elle étudie les animaux de la mer.", 32)
        gauche(l0, -2.6, 3.0)
        self.play(FadeIn(l0, shift=UP * 0.1), Create(vague()), run_time=0.4)
        t = tortue(2.4).move_to(P(0.2, 1.3))
        r = requin(2.2).move_to(P(0.2, -0.6))
        self.au_mot("elle mesure une tortue")
        self.play(FadeIn(t, shift=LEFT * 0.4), run_time=0.35)
        self.au_mot("un petit requin")
        self.play(FadeIn(r, shift=RIGHT * 0.4), run_time=0.35)
        e1 = self.t("1 m", 44, TORTUE).next_to(t, RIGHT, buff=0.5)
        e2 = self.t("90 cm", 44, REQUIN).next_to(r, RIGHT, buff=0.5).align_to(e1, LEFT)
        self.au_mot("La tortue : 1")
        self.play(FadeIn(e1, scale=1.2), Indicate(t, scale_factor=1.05), run_time=0.35)
        self.au_mot("Le requin : 90")
        self.play(FadeIn(e2, scale=1.2), Indicate(r, scale_factor=1.05), run_time=0.35)
        self.au_mot("Qui est le plus long")
        q = self.t("Qui est le plus long ?", 40, JAUNE_TITRE)
        gauche(q, -2.6, -2.2)
        self.play(FadeIn(q, scale=1.1), run_time=0.4)
        self.attendre_voix()

    # ── 02 : la même unité ──────────────────────────────────────────────────
    def ecran_meme_unite(self):
        self.ecran("02-meme-unite")
        self.au_mot("Pour comparer")
        l0 = self.ligne([("Pour comparer :", JAUNE_TITRE), ("la même unité !", VERT_OK)], 40, buff=0.25)
        gauche(l0, -6.2, 2.9)
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("dans la même unité")
        self.play(FadeIn(l0[1], scale=1.1), run_time=0.35)
        t = tortue(2.2).move_to(P(-3.6, 0.7))
        r = requin(2.0).move_to(P(-3.6, -1.3))
        e1 = hors_audit(self.t("1 m", 46, TORTUE)).next_to(t, RIGHT, buff=0.6)
        e2 = hors_audit(self.t("90 cm", 46, REQUIN)).next_to(r, RIGHT, buff=0.6).align_to(e1, LEFT)
        self.add(t, r, e1, e2)
        c = self.ligne([("1 m", BLEU_D), ("= 100 cm", VERT_OK)], 48, buff=0.3)
        gauche(c, 0.6, 1.6)
        hors_audit(c[0])
        self.au_mot("1 mètre, c'est")
        self.play(FadeIn(c[0], shift=UP * 0.1), Indicate(e1, scale_factor=1.3), run_time=0.35)
        self.au_mot("100 centimètres")
        e1b = self.t("100 cm", 46, TORTUE).move_to(e1, aligned_edge=LEFT)
        hors_audit(e1b)
        self.play(FadeIn(c[1], shift=UP * 0.1), run_time=0.3)
        self.play(Transform(e1, e1b), run_time=0.5)
        self.insister(e1, 1.2, 0.25)
        self.attendre_voix()

    # ── 03 : 100 > 90 ───────────────────────────────────────────────────────
    def ecran_comparer(self):
        self.ecran("03-comparer")
        E = 0.06  # 100 cm = 6 unités
        t, rt = self.avec_ruban(tortue, 100, E, TORTUE, 1.4)
        r, rr = self.avec_ruban(requin, 90, E, REQUIN, -0.5)
        self.add(t, rt, r, rr)
        e1 = hors_audit(self.t("100 cm", 36, TORTUE)).next_to(rt, RIGHT, buff=0.3)
        e2 = hors_audit(self.t("90 cm", 36, REQUIN)).next_to(rr, RIGHT, buff=0.3)
        self.au_mot("100 centimètres et 90")
        self.play(FadeIn(e1), FadeIn(e2), run_time=0.3)
        c = self.ligne([("100", BLEU_D), (">", ORANGE_RETENUE), ("90", BLEU_D)], 50, buff=0.3)
        gauche(c, 3.3, 0.45)
        self.aux_extraits([c[0], c[1], c[2]], [("100 est", 1), "plus grand", ("90. La", 1)])
        diff = Rectangle(width=10 * E, height=0.22, fill_color=ORANGE_RETENUE, fill_opacity=0.9, stroke_width=0)
        diff.next_to(rr, RIGHT, buff=0).set_y(rr.get_y())
        lien = DashedLine(rt.get_corner(DR), P(rt.get_right()[0], rr.get_bottom()[1]), color=ORANGE_RETENUE)
        self.au_mot("La tortue est la plus longue")
        l1 = self.t("La tortue est la plus longue,", 36, VERT_OK)
        gauche(l1, -5.6, -1.8)
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(t, color=VERT_OK, scale_factor=1.05), run_time=0.4)
        self.au_mot("de 10 centimètres")
        l2 = self.t("de 10 cm.", 36, ORANGE_RETENUE).next_to(l1, RIGHT, buff=0.2)
        self.play(FadeIn(l2, shift=UP * 0.1), e2.animate.shift(RIGHT * 10 * E), FadeIn(diff), Create(lien),
                  run_time=0.45)
        self.insister(diff, 1.4, 0.25)
        self.attendre_voix()

    # ── 04 : même unité : on compare directement ────────────────────────────
    def ecran_direct(self):
        self.ecran("04-direct")
        self.au_mot("Quand les deux longueurs ont déjà la même unité")
        l0 = self.t("Déjà la même unité ?", 38, JAUNE_TITRE)
        gauche(l0, -6.2, 2.9)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        self.au_mot("on compare directement les nombres")
        l1 = self.t("On compare directement les nombres.", 34, VERT_OK)
        gauche(l1, -6.2, 2.2)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        E = 0.022
        d, rd = self.avec_ruban(dauphin, 250, E, DAUPHIN, 0.8)
        ra, rra = self.avec_ruban(raie, 180, E, RAIE, -1.1)
        e1 = self.t("250 cm", 36, DAUPHIN).next_to(rd, RIGHT, buff=0.3)
        e2 = self.t("180 cm", 36, RAIE).next_to(rra, RIGHT, buff=0.3)
        self.au_mot("Un dauphin de 250")
        self.play(FadeIn(d, shift=RIGHT * 0.3), FadeIn(rd), FadeIn(e1), run_time=0.4)
        self.au_mot("une raie de 180")
        self.play(FadeIn(ra, shift=RIGHT * 0.3), FadeIn(rra), FadeIn(e2), run_time=0.4)
        l2 = self.t("Le dauphin est le plus long.", 38, VERT_OK)
        gauche(l2, -6.2, -2.6)
        self.au_mot("le dauphin est le plus long")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        self.play(Indicate(d, color=VERT_OK, scale_factor=1.05), run_time=0.4)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        po = poisson(1.4).move_to(P(-4.2, 1.9))
        an = anguille(2.4).move_to(P(-3.8, 0.9))

        def autres_q(sc):
            sc.play(FadeIn(po, shift=RIGHT * 0.3), FadeIn(an, shift=RIGHT * 0.3), run_time=0.4)

        def apres(sc):
            sc.play(Indicate(an, color=VERT_OK, scale_factor=1.1), run_time=0.25)

        self.question_gauche("05-question", "05b-reponse",
                             ["Qui est le plus long :", "un poisson de 80 cm,", "ou une anguille de 1 m ?"],
                             [self.choix("le poisson"), self.choix("ils sont pareils"), self.choix("l'anguille")], 2,
                             ["1 m = 100 cm.", "100 > 80 : l'anguille", "est la plus longue."],
                             -0.75, sans_audit=(1,), mot_q="Qui est le plus long", autres_q=autres_q,
                             autres_r=apres)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.0)
        self.play(Write(tit), run_time=0.35)
        self.au_mot("On ne compare pas les nombres tout seuls")
        l0 = self.t("On ne compare pas les nombres tout seuls.", 34)
        gauche(l0, -6.2, 2.2)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        c1 = self.ligne([("90", BLEU_D), (">", ORANGE_RETENUE), ("1", BLEU_D)], 54, buff=0.3)
        gauche(c1, -6.0, 1.1)
        self.aux_extraits([c1[0], c1[1], c1[2]], [("90 est", 1), "plus grand que 1", ("1, mais", 1)])
        self.au_mot("mais 90 centimètres est plus court")
        c2 = self.ligne([("mais", WHITE), ("90 cm", REQUIN), ("<", ORANGE_RETENUE), ("1 m", TORTUE)], 54, buff=0.3)
        gauche(c2, -1.0, 1.1)
        hors_audit(c2[1])
        hors_audit(c2[3])
        self.play(FadeIn(c2[:3], shift=UP * 0.1), run_time=0.35)
        E = 0.05
        r90 = ruban(90 * E, REQUIN, 0.4).move_to(P(0, -0.3)).align_to(P(-5.9, 0), LEFT)
        r100 = ruban(100 * E, TORTUE, 0.4).move_to(P(0, -1.1)).align_to(P(-5.9, 0), LEFT)
        e90 = hors_audit(self.t("90 cm", 32, REQUIN)).next_to(r90, RIGHT, buff=0.25)
        e100 = hors_audit(self.t("1 m = 100 cm", 32, TORTUE)).next_to(r100, RIGHT, buff=0.25)
        self.play(GrowFromEdge(r90, LEFT), FadeIn(e90), run_time=0.4)
        self.au_mot("que 1 mètre")
        self.play(FadeIn(c2[3], shift=UP * 0.1), GrowFromEdge(r100, LEFT), FadeIn(e100), run_time=0.45)
        self.au_mot("Regarde toujours les unités")
        res = self.t("Regarde toujours les unités !", 44, JAUNE_TITRE)
        gauche(res, -6.0, -2.4)
        self.play(FadeIn(res, scale=1.15), run_time=0.4)
        self.insister(VGroup(c2[1][-2:], c2[3][-1:]), 1.3, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        E = 0.0045  # 1000 m = 4,5 unités
        t1 = Line(P(-5.9, 1.9), P(-5.9 + 950 * E, 1.9), color=DAUPHIN, stroke_width=8)
        t2 = Line(P(-5.9, 1.2), P(-5.9 + 1000 * E, 1.2), color=ORANGE_RETENUE, stroke_width=8)
        b1 = bateau(0.55).next_to(t1, UP, buff=0.02).align_to(t1, RIGHT)
        b2 = bateau(0.55).next_to(t2, UP, buff=0.02).align_to(t2, RIGHT)

        def autres_q(sc):
            sc.play(Create(t1), FadeIn(b1), run_time=0.4)
            sc.play(Create(t2), FadeIn(b2), run_time=0.4)

        def apres(sc):
            sc.play(Indicate(t1, color=VERT_OK, scale_factor=1.05), run_time=0.25)

        self.question_gauche("07-question", "07b-reponse",
                             ["Le bateau de Lina fait", "deux trajets : 950 m,", "puis 1 km.",
                              "Lequel est le plus court ?"],
                             [self.choix("celui de 950 m"), self.choix("celui de 1 km"),
                              self.choix("ils sont pareils")], 0,
                             ["1 km = 1000 m.", "950 < 1000 : le trajet", "de 950 m est le plus court.",
                              "Il manque 50 m."],
                             -0.5, sans_audit=(1, 2), mot_q="Le bateau de Lina", autres_q=autres_q,
                             autres_r=apres)

    # ── 08 : le défi : ranger ───────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        self.au_mot("Range du plus court au plus long")
        l0 = self.t("Range du plus court au plus long :", 36, JAUNE_TITRE)
        gauche(l0, -6.2, 2.3)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        items = [("une algue de 2", "une algue", "2 m", algue(2.2), ALGUE, 1.3),
                 ("un poisson de 150", "un poisson", "150 cm", poisson(1.4), POISSON, 0.1),
                 ("une méduse de 30", "une méduse", "30 cm", meduse(0.7), MEDUSE, -1.1)]
        for ex, nom, lg, dessin, coul, y in items:
            dessin.move_to(P(-4.4, y))
            t = self.ligne([(nom, WHITE), (lg, coul)], 38, buff=0.25)
            gauche(t, -2.4, y)
            self.au_mot(ex)
            self.play(FadeIn(dessin, shift=RIGHT * 0.3), FadeIn(t, shift=UP * 0.1), run_time=0.35)
        self.pause_defi(y=-2.5)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        c = self.ligne([("2 m", ALGUE), ("= 200 cm", VERT_OK)], 46, buff=0.3)
        gauche(c, -6.2, 2.3)
        hors_audit(c[0])
        self.au_mot("2 mètres, c'est")
        self.play(FadeIn(c[0], shift=UP * 0.1), run_time=0.3)
        self.aux_extraits([c[1]], ["200 centimètres"])
        self.au_mot("Du plus court au plus long")
        l0 = self.t("Du plus court au plus long :", 32, GRAY_B)
        gauche(l0, -6.2, 1.5)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        E = 0.025
        rang = [("la méduse, 30", meduse(0.6), 30, MEDUSE, "1. la méduse : 30 cm", 0.6),
                ("Le poisson, 150", poisson(1.2), 150, POISSON, "2. le poisson : 150 cm", -0.5),
                ("L'algue, 200", algue(1.8), 200, ALGUE, "3. l'algue : 200 cm", -1.6)]
        for ex, d, cm, coul, txt, y in rang:
            d.move_to(P(-5.2, y))
            r = ruban(cm * E, coul, 0.24).move_to(P(0, y)).align_to(P(-4.0, 0), LEFT)
            t = hors_audit(self.t(txt, 32, coul)).next_to(r, RIGHT, buff=0.3)
            if t.get_right()[0] > 5.4:
                t.shift(LEFT * (t.get_right()[0] - 5.4))
            self.au_mot(ex)
            self.wait(0.07)
            self.play(FadeIn(d, shift=RIGHT * 0.2), GrowFromEdge(r, LEFT), FadeIn(t), run_time=0.4)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        E = 0.03
        fig = VGroup(ruban(90 * E, REQUIN, 0.25), ruban(100 * E, TORTUE, 0.25)).arrange(DOWN, buff=0.3,
                                                                                         aligned_edge=LEFT)
        lignes = self.finale_gauche(fig, textes=[
            ("Pour comparer deux longueurs :", "la même unité, puis les nombres."),
            ("Un grand nombre", "ne veut pas dire une grande longueur :"),
            ("regarde l'unité !",)], fs=32)
        self.add(fig)
        self.au_mot("Pour comparer deux longueurs")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("Un grand nombre")
        self.montrer_ligne(lignes[1])
        self.au_mot("regarde l'unité")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_meme_unite()
        self.ecran_comparer()
        self.ecran_direct()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class LongueurComparerCE2(LongueurComparerBase):
    identite = "Maths CE2 — EleveAI"
    ceinture = "orange"
