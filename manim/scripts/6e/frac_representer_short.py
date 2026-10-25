# frac_representer_short.py
# EleveAI — Maths 6e — short jumeau de l'épisode 02 « Représenter une
# fraction » (micro fraction_representer) : L'ÉNIGME DU GÂTEAU ROND EN 6, AU
# COMPAS (l'idée de Frédéric, consigne-videos-fractions.md).
# CEINTURE JAUNE (pas blanche) : on voit la notion, mais le short ajoute un
# geste de géométrie (le compas, les triangles équilatéraux) et une division
# qui ne s'arrête pas (1 ÷ 6) ; plus exigeant que le short blanc « on voit ».
# Il AMUSE : Rayan, BOULANGER, coupe un gâteau rond en 6 SANS RAPPORTEUR :
#   · EN HAUT, le gâteau : il reporte le rayon au compas, 6 fois, et retombe
#     pile au départ ;
#   · EN BAS, au même instant, une barre de 6 parts se colorie d'une part à
#     chaque report (6 rayons = le tour) ;
#   · les 6 points → un hexagone → 6 triangles ÉQUILATÉRAUX (côtés = rayon,
#     angles de 60°, 6 × 60° = 360°) ; une part = un triangle + un arc de croûte ;
#   · 2/6 = 1/3, 3/6 = 1/2 ; 1 question-pause (3 s) : 4/6 = 2/3 ;
#   · 1/6 = 1 ÷ 6 = 0,1666… (la division ne s'arrête pas) ≈ 16,7 % ;
#   · fin : « 2 parts sur 6, quel pourcentage ? » en commentaire (≈ 33 %).
# Centres d'intérêt : cuisine, jeux-defis.
# Vérifié (Python) : 6 × 60 = 360 ; 1/6 = 0,16666… ; 100/6 = 16,67 ; 200/6 = 33,3.
#
# Voix : manim/voix/6e-frac-representer-short.json (débit −10) ; marques :
# manim/scripts/6e/frac_representer_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/frac_representer_short.py FracRepresenterShort6e -o eleveai-maths-6e-frac-representer-short --media_dir manim/scripts/6e/media-frac-representer-short
# Sortie : manim/sorties/6e/maths/fractions/02-representer/eleveai-maths-6e-frac-representer-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_commun import *  # noqa: E402,F403

C = P(0, 0.85)
R = 1.05
CREME, CROUTE, PART = "#fde68a", "#b45309", "#fb923c"


def pt(k):
    """Le k-ième point reporté (k = 0 en haut, puis dans le sens des aiguilles)."""
    a = PI / 2 - k * PI / 3
    return C + R * np.array([np.cos(a), np.sin(a), 0])


def compas(a, b):
    """Un compas : pointe en a, mine en b, charnière au-dessus."""
    m = (a + b) / 2
    v = b - a
    n = np.array([-v[1], v[0], 0])
    n = n / (np.linalg.norm(n) + 1e-9)
    if np.dot(n, m - C) < -1e-6 or (abs(np.dot(n, m - C)) <= 1e-6 and n[0] < 0):
        n = -n  # la charnière vers l'extérieur du gâteau (jamais sur les ceintures)
    h = m + n * 0.5 * np.linalg.norm(v)
    jambes = VGroup(Line(h, a, color="#cbd5e1", stroke_width=6), Line(h, b, color="#cbd5e1", stroke_width=6))
    tete = Dot(h, radius=0.07, color="#94a3b8")
    mine = Dot(b, radius=0.05, color=AMBRE)
    return VGroup(jambes, tete, mine)


def part(k, couleur=CREME):
    """La part k du gâteau : le secteur entre pt(k) et pt(k+1)."""
    return AnnularSector(inner_radius=0, outer_radius=R, angle=-PI / 3, start_angle=PI / 2 - k * PI / 3,
                         fill_color=couleur, fill_opacity=1, stroke_width=0, arc_center=C)


def rapporteur(r=0.45):
    """Un rapporteur dessiné (demi-disque gradué)."""
    d = Sector(radius=r, angle=PI, fill_color="#bae6fd", fill_opacity=0.6, stroke_color=WHITE, stroke_width=2)
    gr = VGroup(*[Line(r * 0.8 * np.array([np.cos(a), np.sin(a), 0]), r * np.array([np.cos(a), np.sin(a), 0]),
                       color=WHITE, stroke_width=2) for a in np.linspace(0.15, PI - 0.15, 9)])
    return VGroup(d, gr)


class FracRepresenterShort6e(ShortFrac):
    nom_voix = "6e-frac-representer-short"
    fichier_marques = "frac_representer_short_marques.json"
    ceinture = "jaune"

    def _disposer_q(self, question, choix, phrase):
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        cartes.next_to(q, DOWN, buff=0.22).set_x(0)
        pause.next_to(cartes, DOWN, buff=0.15).set_x(0)
        ph.next_to(cartes, DOWN, buff=0.15).set_x(0)
        return tete, q, cartes, pause, rebours, ph

    def bas(self, mob, y=-1.3):
        """Un texte ou un calcul centré dans la bande du bas."""
        return self.borne(mob).move_to(P(0, y))

    def gateau(self, entier=False):
        """entier=True : un seul disque (aucune couture : on ne voit pas encore les 6 parts)."""
        parts = Circle(radius=R, fill_color=CREME, fill_opacity=1, stroke_width=0, arc_center=C) if entier             else VGroup(*[part(k) for k in range(6)])
        bord = Circle(radius=R, stroke_color=CROUTE, stroke_width=10, arc_center=C)
        return parts, bord

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Un gâteau en 6, au compas", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]
        parts, bord = self.gateau(entier=True)
        centre = Dot(C, radius=0.05, color=CROUTE)

        # ── 00 : Rayan, boulanger ──
        self.dire("00-accroche")
        self.au_mot("Rayan")
        ry = self.ligne([("Rayan,", BLEU_CALCUL), ("boulanger", WHITE)], 32)
        self.bas(ry, -1.0)
        self.play(FadeIn(ry, scale=0.8), run_time=0.4)
        self.au_mot("gâteau rond")
        self.play(FadeIn(parts, scale=0.9), Create(bord), run_time=0.7)
        self.au_mot("6 parts égales")
        l6 = self.bas(self.ligne([("6", PART), ("parts égales", WHITE)], 32), -1.65)
        self.play(FadeIn(l6, shift=UP * 0.15), run_time=0.4)
        self.au_mot("Sans rapporteur")
        rp = rapporteur().move_to(P(-1.2, -2.4))
        x = croix(rp, sw=6)
        self.play(FadeIn(rp), run_time=0.3)
        self.play(Create(x), run_time=0.3)
        self.au_mot("un compas")
        cp = compas(C, pt(0))
        self.play(FadeIn(cp, shift=DOWN * 0.2), Write(titre), FadeOut(VGroup(ry, l6, rp, x)), run_time=0.7)
        self.attendre_voix(marge=0.2)

        # ── 01 : reporter le rayon 6 fois ──
        self.dire("01-compas")
        b6 = Barre(6, 0, largeur=3.6, hauteur=0.42, couleur=PART, marge=0.12, sw=2, centre=P(0, -1.05))
        self.au_mot("longueur du rayon")
        ray = Line(C, pt(0), color=AMBRE, stroke_width=6)
        rl = self.t("r", 32, AMBRE).next_to(ray, LEFT, buff=0.1)
        self.add(centre)
        self.play(Create(ray), FadeIn(rl), run_time=0.6)
        self.au_mot("Il pique sur le bord")
        dots = VGroup(Dot(pt(0), radius=0.07, color=AMBRE))
        self.play(cp.animate.become(compas(pt(0), pt(1))), FadeIn(dots[0], scale=2), b6.apparaitre(0.6),
                  run_time=0.7)
        self.au_mot("reporte le rayon")
        arcs = VGroup()

        def report(k, rt=0.6, avec=()):
            a = Arc(radius=R, start_angle=np.arctan2(*(pt(k + 1) - pt(k))[1::-1]) - 0.22, angle=0.44,
                    arc_center=pt(k), color=AMBRE, stroke_width=4)
            d = Dot(pt((k + 1) % 6), radius=0.07, color=AMBRE)
            arcs.add(a)
            dots.add(d)
            self.play(Create(a), FadeIn(d, scale=2), b6.colorier([k], lag=0), *avec, run_time=rt)
            if k < 5:
                self.play(cp.animate.become(compas(pt(k + 1), pt(k + 2))), run_time=rt * 0.6)

        report(0)
        self.au_mot("Encore, et encore")
        for k in (1, 2, 3, 4):
            report(k, 0.3)
        self.au_mot("6 fois")
        l6 = self.bas(self.ligne([("6 fois", PART), ("le rayon : le tour !", WHITE)], 30), -1.75)
        bloc_fixe(l6)
        report(5, 0.45, avec=[FadeIn(l6, shift=UP * 0.15)])
        self.play(Flash(pt(0), color=AMBRE, flash_radius=0.3), run_time=0.5)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(VGroup(cp, b6, l6, arcs, ray, rl)), run_time=0.4)

        # ── 02 : l'hexagone, 6 triangles équilatéraux ──
        self.dire("02-hexagone")
        self.au_mot("relie les 6 points")
        hexa = Polygon(*[pt(k) for k in range(6)], color=AMBRE, stroke_width=5)
        self.play(Create(hexa), run_time=0.9)
        self.au_mot("un hexagone")
        lh = self.bas(self.t("un hexagone", 32, AMBRE), -1.0)
        self.play(FadeIn(lh, scale=1.2), run_time=0.35)
        self.au_mot("Avec le centre")
        rayons = VGroup(*[Line(C, pt(k), color=AMBRE, stroke_width=4) for k in range(6)])
        self.play(LaggedStart(*[Create(r) for r in rayons], lag_ratio=0.15), run_time=0.8)
        self.au_mot("6 triangles")
        l6t = self.bas(self.ligne([("6", PART), ("triangles", WHITE)], 32), -1.0)
        self.play(FadeOut(lh), FadeIn(l6t, shift=UP * 0.15), run_time=0.35)
        self.au_mot("égaux au rayon")
        tri = Polygon(C, pt(0), pt(1), fill_color=PART, fill_opacity=0.55, stroke_color=WHITE, stroke_width=5)
        rs = VGroup(*[self.t("r", 28, WHITE).move_to(m) for m in
                      ((C + pt(0)) / 2 + LEFT * 0.13, (pt(0) + pt(1)) / 2 + UR * 0.15, (C + pt(1)) / 2 + DOWN * 0.15)])
        self.play(FadeIn(tri), FadeIn(rs), run_time=0.6)
        self.au_mot("triangles équilatéraux")
        le = self.bas(self.t("triangles équilatéraux", 32, VERT_OK), -1.6)
        self.play(FadeIn(le, scale=1.1), run_time=0.4)
        self.au_mot("60 degrés")
        angs = VGroup(*[Arc(radius=0.28, start_angle=PI / 2 - (k + 1) * PI / 3, angle=PI / 3, arc_center=C,
                            color=VERT_OK, stroke_width=4) for k in range(6)])
        a60 = self.t("60°", 26, VERT_OK).move_to(C + 0.5 * np.array([np.cos(PI / 3), np.sin(PI / 3), 0]))
        self.play(Create(angs[0]), FadeIn(a60, scale=1.3), FadeOut(rs), run_time=0.5)
        self.au_mot("6 fois 60")
        calc = self.bas(self.t("6 × 60° = 360°", 34), -2.2)
        self.play(FadeIn(calc, shift=UP * 0.15), LaggedStart(*[Create(a) for a in angs[1:]], lag_ratio=0.15),
                  run_time=0.9)
        self.au_mot("le tour complet")
        self.play(Circumscribe(calc, color=VERT_OK), run_time=0.6)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(VGroup(l6t, le, calc, angs, a60, tri)), run_time=0.4)

        # ── 03 : une part = un triangle + un arc de croûte ──
        self.dire("03-parts")
        neuves = VGroup(*[part(k) for k in range(6)])
        self.remove(parts)
        self.add(neuves)
        self.bring_to_front(bord, hexa, rayons, dots, centre)
        parts = neuves
        self.au_mot("un triangle")
        tri = Polygon(C, pt(0), pt(1), fill_color=PART, fill_opacity=1, stroke_width=0)
        self.play(FadeIn(tri), run_time=0.5)
        self.au_mot("petit arc de croûte")
        seg = part(0, "#f59e0b")
        self.play(FadeIn(seg), FadeOut(tri), Indicate(Arc(radius=R, start_angle=PI / 2, angle=-PI / 3, arc_center=C,
                                                         color=CROUTE, stroke_width=12), color=AMBRE), run_time=0.7)
        self.au_mot("1 part sur 6")
        f = EcritureFraction(1, 6, fs=56).move_to(P(-1.0, -1.3))
        lu = self.t("du gâteau", 30).next_to(f, RIGHT, buff=0.25)
        self.play(seg.animate.shift(0.25 * np.array([np.cos(PI / 3), np.sin(PI / 3), 0])), run_time=0.5)
        self.au_mot("1 sixième")
        self.play(FadeIn(f, scale=1.4), FadeIn(lu, shift=RIGHT * 0.15), run_time=0.4)
        self.attendre_voix(marge=0.2)
        self.play(FadeOut(VGroup(seg, f, lu)), run_time=0.35)

        # ── 04 : 2/6 = 1/3, 3/6 = 1/2 ──
        self.dire("04-egal")
        self.au_mot("2 parts")
        self.play(*[parts[k].animate.set_fill(PART) for k in (0, 1)], run_time=0.5)
        f1, g1 = EcritureFraction(2, 6, fs=46), EcritureFraction(1, 3, fs=46)
        e1 = egalite(f1, g1, buff=0.3).move_to(P(0, -1.3))
        self.au_mot("2 sixièmes")
        self.play(FadeIn(f1, scale=1.3), run_time=0.35)
        self.au_mot("1 tiers")
        self.play(FadeIn(e1[1]), FadeIn(g1, scale=1.3), run_time=0.35)
        self.au_mot("3 parts")
        self.play(parts[2].animate.set_fill(PART), FadeOut(e1, shift=UP * 0.15), run_time=0.5)
        f2, g2 = EcritureFraction(3, 6, fs=46), EcritureFraction(1, 2, fs=46)
        e2 = egalite(f2, g2, buff=0.3).move_to(P(0, -1.3))  # remplace la 1re (jamais collées)
        self.au_mot("3 sixièmes")
        self.play(FadeIn(f2, scale=1.3), run_time=0.35)
        self.au_mot("1 demi")
        demi = Line(C + UP * (R - 0.05), C + DOWN * (R - 0.05), color=WHITE, stroke_width=6)  # dans le gâteau
        self.play(FadeIn(e2[1]), FadeIn(g2, scale=1.3), Create(demi), run_time=0.45)
        self.insister(g2, 1.3)
        self.attendre_voix(marge=0.3)
        self.play(FadeOut(VGroup(e2, demi)), *[parts[k].animate.set_fill(CREME) for k in range(3)], run_time=0.4)
        self.play(FadeOut(VGroup(parts, bord, hexa, rayons, dots, centre)), run_time=0.3)
        self.vider(garder)

        # ── 05 : la question-pause (3 s) ──
        self.question_pause("05-question", "05b-reponse", ["4 parts sur 6,", "c'est combien de tiers ?"],
                            [self.inline("4/3", 30), self.inline("2/3", 30), self.inline("1/3", 30)], 1,
                            ["4/6 : ÷ 2 en haut et en bas", "→ 2/3"], mot_q="4 parts")
        self.vider(garder)

        # ── 06 : 1/6 = 1 ÷ 6 = 0,1666… ≈ 16,7 % ──
        self.dire("06-decimal")
        parts, bord = self.gateau()
        parts[0].set_fill(PART)
        self.add(parts, bord)
        self.au_mot("1 sixième")
        f = EcritureFraction(1, 6, fs=50).move_to(P(-1.3, -0.9))
        self.play(FadeIn(f, scale=1.3), Indicate(parts[0], color=AMBRE), run_time=0.5)
        self.au_mot("1 divisé par 6")
        d1 = self.ligne([("= 1 ÷ 6", WHITE)], 38).next_to(f, RIGHT, buff=0.3)
        d1.set_y(f.trait.get_y())
        self.play(FadeIn(d1, shift=RIGHT * 0.15), run_time=0.4)
        self.au_mot("égale 0,1")
        dec = self.t("= 0,1", 40, BLEU_CALCUL)
        dec.sans_synchro = True
        six = VGroup(*[self.t("6", 40, BLEU_CALCUL) for _ in range(3)])
        for m in six:
            m.sans_synchro = True
        pts = self.t("…", 40, ORANGE_RETENUE)
        ligne = VGroup(dec, *six, pts).arrange(RIGHT, buff=0.04).move_to(P(0, -2.0))
        self.play(FadeIn(dec, shift=RIGHT * 0.15), run_time=0.3)
        for k in range(3):
            self.au_mot("6", n=2 + k)
            self.play(FadeIn(six[k], scale=1.4), run_time=0.2)
        self.au_mot("ça continue")
        self.play(FadeIn(pts), Indicate(pts, color=ORANGE_RETENUE, scale_factor=1.6), run_time=0.6)
        self.au_mot("ne s'arrête jamais")
        j = self.bas(self.t("ne s'arrête jamais !", 30, ORANGE_RETENUE), -2.6)
        self.play(FadeIn(j, shift=UP * 0.15), run_time=0.4)
        self.au_mot("environ 16,7")
        pc = self.ligne([("≈ 16,7 %", VERT_OK)], 44).move_to(P(0, -2.0))
        self.play(FadeOut(j), ligne.animate.shift(UP * 0.0), run_time=0.2)
        self.play(FadeOut(ligne, shift=LEFT * 0.2), FadeIn(pc, scale=1.3), run_time=0.45)
        self.insister(pc, 1.25)
        self.attendre_voix(marge=0.4)
        self.vider(garder)

        # ── 07 : la question en commentaire ──
        self.dire("07-question")
        parts, bord = self.gateau()
        self.add(parts, bord)
        self.au_mot("2 parts sur 6")
        f = EcritureFraction(2, 6, fs=56).move_to(P(-1.0, -1.15))
        q = self.ligne([("=", WHITE), ("?", ORANGE_TROU), ("%", WHITE)], 50).next_to(f, RIGHT, buff=0.3)
        q.set_y(f.trait.get_y())
        self.play(*[parts[k].animate.set_fill(PART) for k in (0, 1)], FadeIn(f, scale=1.3), run_time=0.5)
        self.au_mot("quel pourcentage")
        self.play(FadeIn(q, scale=1.3), run_time=0.4)
        self.insister(q[1], 1.5)
        self.appel_commentaire(y=-2.3)
