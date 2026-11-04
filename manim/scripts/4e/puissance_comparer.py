# puissance_comparer.py
# EleveAI — Maths 4e — série « Puissances », épisode 06 : COMPARER EN
# NOTATION SCIENTIFIQUE. Paysage 16:9, AVEC VOIX, ceinture VERTE.
# Micro couverte : 4e `puissance_comparer` (écrans 02 en entier ; 03 la règle
# en deux marches ; 04 même exposant ; 05 exposants négatifs).
# Code couleur constant : BLEU = la base 10 et les nombres devant (2e marche),
# ORANGE = l'exposant (1re marche), VERT = résultat juste, ROUGE = le piège
# (« 9 est plus grand que 2, donc le premier gagne »).
#
# Décor et métiers : une GÉOLOGUE et deux volcans (les coulées de lave à
# l'échelle) ; une bactérie et un virus à l'échelle relative ; le défi des
# masses (baleine bleue, éléphant, camion). Centres : sciences,
# nature-ecologie, animaux.
#
# Écrans : garde (00) ; les volcans (01) ; en entier, deux barres à l'échelle
# (02) ; la règle en deux marches (03) ; QUESTION 1 (03q) ; même exposant
# (04) ; exposants négatifs (05) ; QUESTION 2 (05q) ; défi (06) et correction
# (06b) ; ce que tu as appris (07) ; fin (08).
#
# Voix : manim/voix/4e-puissance-comparer.json (validée, débit −6), WAV dans
# public/sons/4e-puissance-comparer/ ; marques : puissance_comparer_marques.json
# (marques_dump.ps1, puis conversion PAR PAIRES des cues doublées « 9 fois » /
# « 10 puissance » : cues2marques.py perdait les mots répétés).
# Outils : manim/scripts/6e/prop_commun.py et, importés sans les modifier,
# T / puiss / notation / ligne_base / OutilsNotation de
# puissance_notation_scientifique.py (épisode 05). `au()` avance un CURSEUR
# dans la voix : chaque extrait est cherché après le précédent.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/puissance_comparer.py PuissanceComparer4e
# python -m manim render -qh --disable_caching manim/scripts/4e/puissance_comparer.py PuissanceComparer4e -o eleveai-maths-4e-puissance-comparer --media_dir manim/scripts/4e/media-puiss-06-4e
# Sortie : manim/sorties/4e/maths/puissances/06-comparer/eleveai-maths-4e-puissance-comparer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))
sys.path.insert(0, str(Path(__file__).resolve().parent))  # le dossier du script EN TÊTE

from prop_commun import *  # noqa: E402,F403
from puissance_notation_scientifique import (T, puiss, notation, sans_audit, ligne_base,  # noqa: E402,F401
                                             OutilsNotation)
from mascotte import MascotteMargouillat  # noqa: E402

BASE_C = BLEU_CALCUL       # la base 10, les nombres devant
EXPO_C = ORANGE_RETENUE    # l'exposant
PIEGE = ROUGE_ERREUR
CIEL = "#93c5fd"
LAVE = "#f97316"
LAVE_F = "#c2410c"
ROCHE = "#57534e"


def nota(m, e, fs=60, cm=WHITE, audit=True, unite=None, fs_u=None):
    """notation() (m × 10ᵉ) + une unité facultative (.u) posée sur la ligne de base."""
    n = notation(m, e, fs=fs, cm=cm, audit=audit)
    if unite:
        u = T(unite, fs_u or fs * 0.7, WHITE, audit)
        u.next_to(n, RIGHT, buff=0.18)
        u.align_to(n.m, DOWN)
        g = VGroup(n, u)
        g.m, g.x, g.p, g.u = n.m, n.x, n.p, u
        return g
    n.u = None
    return n


# ── les dessins ────────────────────────────────────────────────────────────

def geologue(s=1.0):
    """Une géologue : casque de chantier jaune, marteau à la main."""
    p = personne(peau="#c68642", tenue="#b45309", cheveux="#1f2937", longs=True, s=s)
    t = p.tete.get_center()
    r = p.tete.width / 2
    casque = AnnularSector(inner_radius=0, outer_radius=r * 1.12, angle=PI, start_angle=0, fill_color="#facc15",
                           fill_opacity=1, stroke_width=0).move_to(t + UP * r * 0.55)
    visiere = RoundedRectangle(width=r * 2.6, height=r * 0.22, corner_radius=r * 0.1, fill_color="#eab308",
                               fill_opacity=1, stroke_width=0).move_to(t + UP * r * 0.25)
    c = p.corps.get_right() + LEFT * 0.1 * s + UP * 0.25 * s
    manche = Line(c, c + UP * 0.55 * s + RIGHT * 0.25 * s, color="#a16207", stroke_width=6 * s)
    tete_m = RoundedRectangle(width=0.32 * s, height=0.12 * s, corner_radius=0.03 * s, fill_color="#9ca3af",
                              fill_opacity=1, stroke_width=0).move_to(manche.get_end()).rotate(-0.4)
    p.add(casque, visiere, manche, tete_m)
    return p


def volcan(h=1.7, w=2.3):
    """Un volcan schématique, le pied en (0, 0) : .cratere ; .flanc_d (point
    du sommet, côté droit) ; .pied_d (pied droit)."""
    corps = Polygon(P(-w / 2, 0), P(-0.3, h), P(0.3, h), P(w / 2, 0), fill_color=ROCHE, fill_opacity=1,
                    stroke_color="#a8a29e", stroke_width=2)
    cratere = Ellipse(width=0.6, height=0.16, fill_color=LAVE, fill_opacity=1, stroke_width=0).move_to(P(0, h))
    g = VGroup(corps, cratere)
    g.cratere, g.corps = cratere, corps
    g.h, g.w = h, w
    return g


def coulee(v, longueur, sw=13):
    """La coulée de lave : du cratère, le long du flanc droit, puis au sol sur
    `longueur` (proportionnelle au volume)."""
    c = v.cratere.get_center()
    pied = v.corps.get_corner(DR) + UP * 0.07
    pts = [c + RIGHT * 0.12, c + RIGHT * 0.3 + DOWN * 0.05, pied + LEFT * 0.06, pied + RIGHT * longueur]
    return VMobject(stroke_color=LAVE, stroke_width=sw).set_points_as_corners(pts)


def fumee(v):
    """Trois bouffées grises au-dessus du cratère."""
    c = v.cratere.get_center()
    return VGroup(*[Circle(radius=r, fill_color="#9ca3af", fill_opacity=0.55, stroke_width=0).move_to(c + P(dx, dy))
                    for r, dx, dy in ((0.16, -0.08, 0.3), (0.21, 0.12, 0.6), (0.26, -0.05, 0.98))])


def bacterie(longueur=3.0):
    """Une bactérie (bacille) : une gélule verte, des flagelles ondulés."""
    h = longueur * 0.36
    corps = RoundedRectangle(width=longueur, height=h, corner_radius=h / 2, fill_color="#16a34a", fill_opacity=0.9,
                             stroke_color="#86efac", stroke_width=3)
    noyau = VGroup(*[Dot(radius=0.05, color="#bbf7d0").move_to(P(dx, dy))
                     for dx, dy in ((-0.6, 0.1), (-0.2, -0.12), (0.3, 0.08), (0.7, -0.05), (0.05, 0.15))])
    flag = VGroup()
    for k, dy in enumerate((0.18, -0.18)):
        x0 = longueur / 2 - 0.05
        f = FunctionGraph(lambda x, dy=dy: dy + 0.08 * np.sin(9 * x), x_range=[0, 0.75], color="#86efac",
                          stroke_width=3).shift(RIGHT * x0)
        flag.add(f)
    g = VGroup(flag, corps, noyau)
    g.corps = corps
    return g


def virus(r=0.08):
    """Un virus : une boule rouge sombre hérissée de pointes."""
    boule = Circle(radius=r, fill_color="#be123c", fill_opacity=1, stroke_width=0)
    pics = VGroup(*[Line(P(r * np.cos(a), r * np.sin(a)), P(1.7 * r * np.cos(a), 1.7 * r * np.sin(a)),
                         color="#fda4af", stroke_width=2) for a in np.linspace(0, TAU, 10, endpoint=False)])
    return VGroup(pics, boule)


def baleine(w=3.0):
    """Une baleine bleue en silhouette : le corps, la nageoire, la queue."""
    bleu = "#3b82f6"
    corps = Ellipse(width=w, height=w * 0.3, fill_color=bleu, fill_opacity=1, stroke_width=0)
    ventre = Ellipse(width=w * 0.7, height=w * 0.11, fill_color="#93c5fd", fill_opacity=1,
                     stroke_width=0).move_to(corps.get_center() + P(w * 0.08, -w * 0.09))
    queue = Polygon(P(-w * 0.45, 0), P(-w * 0.66, w * 0.16), P(-w * 0.58, 0), P(-w * 0.66, -w * 0.16),
                    fill_color=bleu, fill_opacity=1, stroke_width=0)
    nag = Polygon(P(w * 0.05, -w * 0.1), P(-w * 0.12, -w * 0.24), P(-w * 0.04, -w * 0.08), fill_color="#1d4ed8",
                  fill_opacity=1, stroke_width=0)
    oeil = Dot(radius=w * 0.018, color=WHITE).move_to(P(w * 0.33, w * 0.0))
    jet = VGroup(*[Line(P(w * 0.2, w * 0.15), P(w * 0.2 + dx, w * 0.32), color="#bfdbfe", stroke_width=3)
                   for dx in (-0.12, 0, 0.12)])
    return VGroup(queue, corps, ventre, nag, oeil, jet)


def elephant(s=1.0):
    """Un éléphant gris en silhouette (tourné vers la droite)."""
    gris = "#9ca3af"
    corps = Ellipse(width=1.7, height=1.05, fill_color=gris, fill_opacity=1, stroke_width=0)
    pattes = VGroup(*[RoundedRectangle(width=0.26, height=0.6, corner_radius=0.08, fill_color=gris, fill_opacity=1,
                                       stroke_width=0).move_to(P(x, -0.6)) for x in (-0.55, -0.2, 0.25, 0.55)])
    tete = Circle(radius=0.42, fill_color=gris, fill_opacity=1, stroke_width=0).move_to(P(0.85, 0.22))
    oreille = Ellipse(width=0.5, height=0.62, fill_color="#6b7280", fill_opacity=1, stroke_width=0).move_to(P(0.68, 0.2))
    trompe = VMobject(stroke_color=gris, stroke_width=16).set_points_smoothly(
        [P(1.15, 0.05), P(1.3, -0.35), P(1.28, -0.7), P(1.4, -0.85)])
    oeil = Dot(radius=0.04, color="#111827").move_to(P(1.0, 0.34))
    queue = Line(P(-0.84, 0.15), P(-1.0, -0.25), color=gris, stroke_width=4)
    return VGroup(queue, pattes, corps, oreille, tete, trompe, oeil).scale(s)


def camion(s=1.0):
    """Un camion : la remorque, la cabine, trois roues."""
    remorque = Rectangle(width=1.9, height=0.95, fill_color="#a78bfa", fill_opacity=1, stroke_width=0).move_to(P(-0.35, 0.2))
    cabine = Polygon(P(0.65, -0.28), P(0.65, 0.55), P(1.05, 0.55), P(1.3, 0.1), P(1.3, -0.28),
                     fill_color="#7c3aed", fill_opacity=1, stroke_width=0)
    vitre = Polygon(P(0.78, 0.45), P(1.02, 0.45), P(1.18, 0.12), P(0.78, 0.12), fill_color="#c4b5fd", fill_opacity=1,
                    stroke_width=0)
    chassis = Rectangle(width=2.6, height=0.1, fill_color="#4b5563", fill_opacity=1, stroke_width=0).move_to(P(0.0, -0.3))
    roues = VGroup(*[VGroup(Circle(radius=0.2, fill_color="#111827", fill_opacity=1, stroke_color="#6b7280",
                                   stroke_width=3), Dot(radius=0.05, color="#9ca3af")).move_to(P(x, -0.42))
                     for x in (-1.0, -0.5, 1.0)])
    return VGroup(remorque, chassis, cabine, vitre, roues).scale(s)


class PuissanceComparerBase(OutilsNotation, PaysageProp):
    nom_voix = "4e-puissance-comparer"
    fichier_marques = "puissance_comparer_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"

    def dire(self, nom, dossier=None):
        print(f"CHAPITRE {nom} t={self.renderer.time:.2f}", flush=True)
        return super().dire(nom, dossier)

    def _disposer_q(self, question, choix, phrase):
        """La phrase de réponse plus aérée (une ligne porte un exposant)."""
        r = super()._disposer_q(question, choix, phrase)
        ph = r[5]
        haut = ph.get_top()[1]
        gauche = ph.get_left()[0]
        ph.arrange(DOWN, aligned_edge=LEFT, buff=0.3).align_to(P(0, haut), UP).align_to(P(gauche, 0), LEFT)
        return r

    def entourer(self, m, couleur=JAUNE_TITRE, buff=0.12):
        return Circle(radius=max(m.width, m.height) / 2 + buff, color=couleur, stroke_width=5).move_to(m)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Comparer en notation scientifique", self.identite, self.ceinture,
                                       y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        sans_audit(ident)
        self.au("Comparer", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.8)
        l1 = T("Lequel est le plus grand ?", 46).move_to(P(-0.6, 1.2))
        n1 = nota("9", "5", fs=80).move_to(P(-3.9, -0.15))
        ou = T("ou", 46).move_to(P(-0.6, -0.15))
        n2 = nota("2", "6", fs=80).move_to(P(2.7, -0.15))
        ou.align_to(n1.m, DOWN)
        self.au("Lequel", FadeIn(l1, shift=RIGHT * 0.2), rt=0.4)
        for n, mot_m, mot_e in ((n1, "9 fois", "5,"), (n2, "2 fois", "6 ?")):
            if n is n2:
                self.au("ou", FadeIn(ou), rt=0.25)
            self.au(mot_m, FadeIn(n.m, scale=1.3), FadeIn(n.x), rt=0.3)
            self.au("10 puissance", FadeIn(n.p.base, scale=1.3), rt=0.3)
            self.au(mot_e, FadeIn(n.p.expo, scale=1.6), rt=0.3)
        self.play(n1.p.expo.animate.scale(1.6), n2.p.expo.animate.scale(1.6), run_time=0.3)
        self.play(n1.p.expo.animate.scale(1 / 1.6), n2.p.expo.animate.scale(1 / 1.6), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 01 : la géologue et les deux volcans ───────────────────────────────
    Y_SOL = -1.3
    K_LAVE = 1.25  # longueur de coulée au sol pour 1 000 000 m³

    def ecran_volcans(self):
        self.ecran("01-volcans")
        sol = Line(P(-6.3, self.Y_SOL), P(6.3, self.Y_SOL), color="#78716c", stroke_width=3)
        geo = geologue(0.62)
        geo.next_to(P(-5.45, self.Y_SOL), UP, buff=0)
        met = T("géologue", 30, CIEL).next_to(geo, UP, buff=0.15)
        v1, v2 = volcan(), volcan()
        v1.shift(P(-2.45, self.Y_SOL))
        v2.shift(P(1.85, self.Y_SOL))
        self.au("Une géologue", Create(sol), FadeIn(geo, shift=UP * 0.3), FadeIn(met), rt=0.45)
        f1, f2 = fumee(v1), fumee(v2)
        self.au("deux éruptions", FadeIn(v1, shift=UP * 0.2), FadeIn(v2, shift=UP * 0.2), rt=0.4)
        self.play(LaggedStart(*[FadeIn(b, shift=UP * 0.2, scale=0.5) for b in (*f1, *f2)], lag_ratio=0.15),
                  run_time=0.6)
        n1 = nota("9", "5", fs=56, unite="m³").move_to(P(-2.45, 2.45))
        n2 = nota("2", "6", fs=56, unite="m³").move_to(P(1.85, 2.45))
        c1 = coulee(v1, 0.9 * self.K_LAVE)
        c2 = coulee(v2, 2.0 * self.K_LAVE)
        for n, v, c, mot_m, mot_e in ((n1, v1, c1, "9 fois", "5 mètres"), (n2, v2, c2, "2 fois", "6 mètres")):
            self.au("Le premier" if n is n1 else "Le second", Indicate(v.cratere, color=LAVE, scale_factor=1.6), rt=0.35)
            self.au(mot_m, FadeIn(n.m, scale=1.3), FadeIn(n.x), rt=0.3)
            self.au("10 puissance", FadeIn(n.p.base, scale=1.3), rt=0.3)
            self.au(mot_e, FadeIn(n.p.expo, scale=1.6), FadeIn(n.u, shift=LEFT * 0.1), rt=0.3)
            self.au("cubes", Create(c), rt=0.9 if n is n1 else 1.3)
        self.bring_to_front(c1, c2)
        r1, r2 = self.entourer(n1.m), self.entourer(n2.m)
        q1 = T("?", 46, EXPO_C, audit=False).next_to(r1, UL, buff=0.02)
        q2 = T("?", 46, EXPO_C, audit=False).next_to(r2, UL, buff=0.02)
        l1 = VGroup(T("9, c'est plus que", 38), T("2 :", 38), T("le premier a gagné ?", 38)).arrange(RIGHT, buff=0.18)
        ligne_base(l1).move_to(P(-0.6, -2.3))
        self.au("9, c'est", Create(r1), FadeIn(q1, scale=1.4), FadeIn(l1[0], shift=RIGHT * 0.15), rt=0.4)
        self.au("2 :", Create(r2), FadeIn(q2, scale=1.4), FadeIn(l1[1], shift=RIGHT * 0.15), rt=0.4)
        self.au("le premier a", FadeIn(l1[2], shift=RIGHT * 0.15), rt=0.35)
        att = T("Attention !", 50, PIEGE).move_to(P(-0.6, -3.0))
        self.au("Attention", FadeIn(att, scale=1.4), rt=0.35)
        self.insister(att, 1.25, 0.2)
        self.attendre_voix(marge=0.4)

    # ── 02 : en entier, deux barres à l'échelle ────────────────────────────
    X0_B = -5.3
    K_B = 4.3   # longueur d'une barre pour 1 000 000

    def barre_lave(self, v, y):
        return Rectangle(width=v * self.K_B, height=0.5, fill_color=LAVE, fill_opacity=0.9, stroke_color=LAVE_F,
                         stroke_width=2).move_to(P(self.X0_B + v * self.K_B / 2, y))

    def ecran_entier(self):
        self.ecran("02-entier")
        tit = T("En entier", 44, JAUNE_TITRE).move_to(P(-4.6, 3.12))
        self.au("Écrivons", Write(tit), rt=0.5)
        lignes = []
        for k, (m, e, nb, y) in enumerate((("9", "5", "900 000", 2.0), ("2", "6", "2 000 000", 0.9))):
            n = nota(m, e, fs=62)
            eg = T("=", 56)
            v = T(nb, 62, WHITE, audit=False)  # « 900 000 » : dit au mot, l'audit ne lit pas l'espace
            g = VGroup(n, eg, v).arrange(RIGHT, buff=0.35)
            ligne_base(VGroup(n.m, v))
            eg.set_y(n.x.get_y())
            g.move_to(P(0, y)).align_to(P(-6.0, 0), LEFT)
            lignes.append((n, eg, v))
        ys = (-0.35, -1.25)
        barres = [self.barre_lave(0.9, ys[0]), self.barre_lave(2.0, ys[1])]
        icones = VGroup(*[volcan(0.42, 0.62).move_to(P(-5.85, y)) for y in ys])
        etiq = [T("900 000", 30, LAVE, audit=False).next_to(barres[0], RIGHT, buff=0.15),
                T("2 000 000", 30, LAVE, audit=False).next_to(barres[1], RIGHT, buff=0.15)]
        for k, ((n, eg, v), mot_m, mot_e, mot_v) in enumerate(zip(lignes, ("9 fois", "2 fois"), ("5 :", "6 :"),
                                                                    ("900 000", "2 000 000"))):
            self.au(mot_m, FadeIn(n.m, scale=1.3), FadeIn(n.x), rt=0.3)
            self.au("10 puissance", FadeIn(n.p.base, scale=1.3), rt=0.3)
            self.au(mot_e, FadeIn(n.p.expo, scale=1.6), FadeIn(eg), rt=0.3)
            self.au(mot_v, FadeIn(v, shift=RIGHT * 0.2), FadeIn(icones[k], scale=0.6),
                    GrowFromEdge(barres[k], LEFT), FadeIn(etiq[k], shift=LEFT * 0.1), rt=0.6 if k == 0 else 0.9)
        s1 = ligne_base(VGroup(T("C'est le second,", 38), T("le plus grand :", 38, VERT_OK)).arrange(RIGHT, buff=0.2))
        s1.move_to(P(0, -2.2)).align_to(P(-6.0, 0), LEFT)
        self.au("C'est le second", FadeIn(s1[0], shift=RIGHT * 0.15), lignes[1][2].animate.set_color(VERT_OK),
                Indicate(barres[1], color=VERT_OK, scale_factor=1.05), rt=0.4)
        self.au("le plus grand", FadeIn(s1[1], shift=RIGHT * 0.15), rt=0.35)
        # plus de deux fois : deux copies de la petite barre posées sur la grande
        copies = [barres[0].copy(), barres[0].copy()]
        for k, c in enumerate(copies):
            c.set_fill(opacity=0).set_stroke(WHITE, width=4)
        s2 = T("plus de deux fois plus de lave !", 38, LAVE).move_to(P(0, -2.95)).align_to(P(-6.0, 0), LEFT)
        self.au("plus de deux", FadeIn(s2, shift=RIGHT * 0.15), rt=0.35)
        self.au("fois plus", copies[0].animate.move_to(barres[0].get_center() + DOWN * (ys[0] - ys[1])), rt=0.4)
        self.play(copies[1].animate.move_to(barres[0].get_center() + DOWN * (ys[0] - ys[1])
                                            + RIGHT * barres[0].width), run_time=0.4)
        self.insister(s2, 1.12, 0.2)
        self.attendre_voix(marge=0.5)

    # ── 03 : la règle en deux marches ──────────────────────────────────────
    def ecran_regle(self):
        self.ecran("03-regle")
        tit = T("La règle", 46, JAUNE_TITRE).move_to(P(-4.6, 3.12))
        self.au("La règle", Write(tit), rt=0.5)
        bas = -3.0
        m1 = Rectangle(width=6.0, height=2.0, fill_color="#3b2a1a", fill_opacity=1, stroke_color=EXPO_C,
                       stroke_width=4).move_to(P(-3.2, bas + 1.0))
        m2 = Rectangle(width=5.5, height=3.6, fill_color="#172554", fill_opacity=1, stroke_color=BASE_C,
                       stroke_width=4).move_to(P(2.55, bas + 1.8))
        # l'exemple générique a × 10ⁿ, au-dessus de la première marche
        ex = nota("a", "n", fs=84, audit=False).move_to(P(-3.6, 1.55))
        self.play(FadeIn(m1, shift=UP * 0.2), FadeIn(m2, shift=UP * 0.2), FadeIn(ex, scale=0.9), run_time=0.5)
        petit = MascotteMargouillat().scale(0.22)
        petit.next_to(P(-5.6, bas + 2.0), UP, buff=0.02)
        e1 = ligne_base(VGroup(T("1.", 30, EXPO_C, audit=False), T("D'abord :", 30, EXPO_C),
                               T("les exposants", 30, EXPO_C)).arrange(RIGHT, buff=0.2))
        e1.move_to(P(0, bas + 1.55)).align_to(P(-6.0, 0), LEFT)
        d1 = VGroup(T("le plus grand exposant", 26), T("donne le plus grand nombre", 26)).arrange(
            DOWN, aligned_edge=LEFT, buff=0.12).move_to(P(0, bas + 0.72)).align_to(P(-6.0, 0), LEFT)
        # une flèche qui pointe l'exposant (un cercle autour mordait sur le « 0 » de 10)
        coin = ex.p.expo.get_corner(UR)
        rond_n = Arrow(coin + RIGHT * 0.95 + UP * 0.55, coin + RIGHT * 0.08 + UP * 0.04, buff=0, color=EXPO_C,
                       stroke_width=6, max_tip_length_to_length_ratio=0.3)
        self.au("D'abord", FadeIn(e1[:2], shift=RIGHT * 0.15), FadeIn(petit, shift=DOWN * 0.3), rt=0.4)
        self.au("les exposants", FadeIn(e1[2], shift=RIGHT * 0.15), Create(rond_n), rt=0.4)
        self.insister(ex.p.expo, 1.5, 0.2, about=ex.p.expo.get_center())
        self.au("le plus grand exposant", FadeIn(d1[0], shift=RIGHT * 0.15), rt=0.35)
        self.au("donne", FadeIn(d1[1], shift=RIGHT * 0.15), rt=0.35)
        # deuxième marche : seulement si les exposants sont égaux
        d2 = VGroup(T("seulement si les exposants", 26), T("sont égaux", 26)).arrange(
            DOWN, aligned_edge=LEFT, buff=0.12).move_to(P(0, bas + 2.35)).align_to(P(0.0, 0), LEFT)
        e2 = ligne_base(VGroup(T("2.", 32, BASE_C, audit=False), T("les nombres devant", 32, BASE_C)).arrange(RIGHT, buff=0.2))
        e2.move_to(P(0, bas + 3.15)).align_to(P(0.0, 0), LEFT)
        rond_a = self.entourer(ex.m, BASE_C, 0.12)
        self.au("Seulement", FadeIn(d2[0], shift=RIGHT * 0.15),
                petit.animate(path_arc=-PI * 0.6).next_to(P(4.6, bas + 3.6), UP, buff=0.02), rt=0.5)
        self.au("sont égaux", FadeIn(d2[1], shift=RIGHT * 0.15), rt=0.35)
        self.au("les nombres devant", FadeIn(e2, shift=RIGHT * 0.15), Create(rond_a), rt=0.4)
        self.insister(ex.m, 1.5, 0.2, about=ex.m.get_center())
        self.attendre_voix(marge=0.5)

    # ── 03q : QUESTION 1 (8 × 10³ ; 1,2 × 10⁴ ; 9,9 × 10³) ──────────────────
    def barres_q(self, vals, noms, y0, pas, k, x0=-5.4):
        """Des barres horizontales à l'échelle (figure de la réponse)."""
        g = VGroup()
        for j, (v, nom) in enumerate(zip(vals, noms)):
            y = y0 - j * pas
            b = Rectangle(width=v * k, height=0.42, fill_color=GREY_B, fill_opacity=0.8, stroke_width=0)
            b.move_to(P(x0 + v * k / 2, y))
            lettre = T(nom, 32, WHITE, audit=False).move_to(P(x0 - 0.35, y))
            g.add(VGroup(b, lettre))
        return g

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        choix = [nota("8", "3", fs=40), nota("1,2", "4", fs=40), nota("9,9", "3", fs=40)]
        plans = []
        for c, mm, e in zip(choix, ("8 fois", "1,2 fois", "9,9 fois"), ("3.", "4.", "3.")):
            plans.append([(mm, [c.m, c.x]), ("10 puissance", [c.p.base]), (e, [c.p.expo])])
        fig = self.barres_q((8000, 12000, 9900), "ABC", 0.9, 1.05, 3.9 / 12000)
        nbs = [T(s, 34, WHITE) for s in ("8 000", "12 000", "9 900")]
        for b, n in zip(fig, nbs):
            n.next_to(b[0], RIGHT, buff=0.15)
            sans_audit(n)  # dits au mot (l'audit ne lit pas l'espace)

        def avant(sc, q):
            sc.poser_mots(q[0], [("Lequel", "Lequel")])

        def apres(sc):
            lg0 = sc.rep_ligne(0, ["Réponse B."])
            sc.au("B.", FadeIn(lg0, shift=UP * 0.12), rt=0.25)
            lg1 = sc.rep_ligne(1, ["Son exposant,", "4,"])
            lg1b = sc.rep_ligne(2, ["est le plus grand."])
            sc.au("Son exposant", FadeIn(lg1[0], shift=UP * 0.12),
                  *[Indicate(c.p.expo, color=EXPO_C, scale_factor=1.6) for c in choix], rt=0.4)
            sc.au("4,", FadeIn(lg1[1], scale=1.3), choix[1].p.expo.animate.set_color(VERT_OK), rt=0.3)
            sc.insister(choix[1].p.expo, 1.6, 0.2, about=choix[1].p.expo.get_center())
            sc.au("est le plus", FadeIn(lg1b, shift=UP * 0.12), rt=0.3)
            sc.play(FadeIn(VGroup(*[b[1] for b in fig])), run_time=0.25)
            for j, mot, idx in ((1, "12 000", 0), (0, "8 000", 1), (2, "9 900", 2)):
                b = fig[j][0]
                if j == 1:
                    b.set_fill(VERT_OK, 0.9)
                sc.au(mot, GrowFromEdge(b, LEFT), FadeIn(nbs[j], shift=LEFT * 0.1), rt=0.45)
            sc.insister(VGroup(fig[1][0], nbs[1]), 1.12, 0.2)

        self.qpause("03q-question", "03r-reponse", ["Lequel est le plus grand ?"], choix, plans, 1,
                    ["Réponse B.", "Son exposant, 4,", "est le plus grand."],
                    avant=avant, apres=apres)

    # ── 04 : même exposant : on compare les nombres devant ─────────────────
    def ecran_egaux(self):
        self.ecran("04-egaux")
        tit = T("Même exposant ?", 46, JAUNE_TITRE).move_to(P(0, 3.12)).align_to(P(-6.0, 0), LEFT)
        self.au("Même exposant", Write(tit), rt=0.5)
        l0 = ligne_base(VGroup(T("Alors on compare", 36), T("les nombres devant.", 36, BASE_C)).arrange(RIGHT, buff=0.2))
        l0.move_to(P(0, 2.25)).align_to(P(-6.0, 0), LEFT)
        self.au("Alors", FadeIn(l0[0], shift=RIGHT * 0.15), rt=0.3)
        self.au("les nombres", FadeIn(l0[1], shift=RIGHT * 0.15), rt=0.3)
        n1 = nota("3,7", "8", fs=78).move_to(P(0, 1.05)).align_to(P(-5.6, 0), LEFT)
        n2 = nota("3,2", "8", fs=78).move_to(P(0, -0.35)).align_to(P(-5.6, 0), LEFT)
        for n, mm in ((n1, "3,7 fois"), (n2, "3,2 fois")):
            self.au(mm, FadeIn(n.m, scale=1.3), FadeIn(n.x), rt=0.3)
            self.au("10 puissance", FadeIn(n.p.base, scale=1.3), rt=0.3)
            self.au("8", FadeIn(n.p.expo, scale=1.6), rt=0.3)
        # la droite de 3 à 4, graduée en dixièmes
        xg, xd, yd = 1.2, 5.7, 0.35
        dr = Line(P(xg - 0.2, yd), P(xd + 0.2, yd), color=WHITE, stroke_width=3)
        grad = VGroup(*[Line(P(xg + (xd - xg) * k / 10, yd - (0.16 if k % 5 == 0 else 0.09)),
                             P(xg + (xd - xg) * k / 10, yd + (0.16 if k % 5 == 0 else 0.09)), color=WHITE,
                             stroke_width=3 if k % 5 == 0 else 2) for k in range(11)])
        bornes = VGroup(T("3", 30, audit=False).next_to(grad[0], DOWN, buff=0.12),
                        T("4", 30, audit=False).next_to(grad[10], DOWN, buff=0.12))
        # les exposants égaux se grisent, les nombres devant s'encadrent en bleu
        gris = [n.p for n in (n1, n2)] + [n.x for n in (n1, n2)]
        cad = [self.encadrer(n.m, BASE_C, 0.12) for n in (n1, n2)]
        cmp_ = ligne_base(VGroup(T("3,7", 72, BASE_C), T(">", 72, VERT_OK), T("3,2", 72, BASE_C)).arrange(RIGHT, buff=0.35))
        cmp_.move_to(P(-3.2, -1.75))
        p37 = Dot(P(xg + (xd - xg) * 0.7, yd), radius=0.11, color=VERT_OK)
        p32 = Dot(P(xg + (xd - xg) * 0.2, yd), radius=0.11, color=BASE_C)
        e37 = T("3,7", 30, VERT_OK).next_to(p37, UP, buff=0.2)
        e32 = T("3,2", 30, BASE_C).next_to(p32, UP, buff=0.2)
        self.play(*[m.animate.set_opacity(0.3) for m in gris], *[Create(c) for c in cad],
                  Create(dr), FadeIn(grad), FadeIn(bornes), run_time=0.45)
        self.au("3,7 est", FadeIn(cmp_[0], scale=1.3), FadeIn(p37, scale=2), FadeIn(e37), rt=0.3)
        self.au("plus grand", FadeIn(cmp_[1], scale=1.5), rt=0.3)
        self.au("3,2.", FadeIn(cmp_[2], scale=1.3), FadeIn(p32, scale=2), FadeIn(e32), rt=0.3)
        fl = Arrow(p32.get_center() + DOWN * 0.45, p37.get_center() + DOWN * 0.45, color=VERT_OK, buff=0,
                   stroke_width=5, max_tip_length_to_length_ratio=0.15)
        self.play(GrowArrow(fl), run_time=0.35)
        g = ligne_base(VGroup(T("Le premier", 40, VERT_OK), T("gagne !", 40, VERT_OK)).arrange(RIGHT, buff=0.2))
        g.move_to(P(-3.2, -2.85))
        self.au("Le premier", FadeIn(g[0], shift=UP * 0.12), n1.m.animate.set_color(VERT_OK), rt=0.3)
        self.au("gagne", FadeIn(g[1], shift=UP * 0.12), rt=0.3)
        self.insister(VGroup(n1.m, cad[0]), 1.3, 0.2)
        self.attendre_voix(marge=0.4)

    # ── 05 : exposants négatifs : −6 est plus grand que −7 ─────────────────
    def droite_expo(self, a, b, xg, xd, y, fs=30):
        """La droite des exposants, de a à b (entiers) : .x(k), .lab[k]."""
        n = b - a
        dr = Line(P(xg - 0.3, y), P(xd + 0.3, y), color=WHITE, stroke_width=3)
        fl = Triangle(fill_color=WHITE, fill_opacity=1, stroke_width=0).scale(0.1).rotate(-PI / 2)
        fl.move_to(P(xd + 0.35, y))
        X = lambda k: xg + (xd - xg) * (k - a) / n  # noqa: E731
        grad = VGroup(*[Line(P(X(k), y - 0.13), P(X(k), y + 0.13), color=WHITE, stroke_width=3) for k in range(a, b + 1)])
        lab = {k: T(f"−{-k}" if k < 0 else str(k), fs, EXPO_C, audit=False).next_to(P(X(k), y - 0.13), DOWN, buff=0.12)
               for k in range(a, b + 1)}
        g = VGroup(dr, fl, grad, *lab.values())
        g.x, g.lab, g.y = X, lab, y
        return g

    def ecran_negatifs(self):
        self.ecran("05-negatifs")
        tit = T("Avec des exposants négatifs", 44, JAUNE_TITRE).move_to(P(0, 3.12)).align_to(P(-6.0, 0), LEFT)
        self.au("Avec des", Write(tit), rt=0.5)
        d = self.droite_expo(-9, -3, -5.4, 4.2, 1.6)
        self.au("la règle", Create(d[0]), FadeIn(d[1]), FadeIn(d[2]), FadeIn(VGroup(*d.lab.values())), rt=0.5)
        p6 = Dot(P(d.x(-6), d.y), radius=0.13, color=VERT_OK)
        p7 = Dot(P(d.x(-7), d.y), radius=0.13, color=EXPO_C)
        cmp_ = ligne_base(VGroup(T("−6", 60, VERT_OK), T("est plus grand que", 40), T("−7", 60, EXPO_C)).arrange(RIGHT, buff=0.3))
        cmp_[1].align_to(cmp_[0], DOWN)
        cmp_.move_to(P(-0.6, 0.38))
        self.au("6 est", FadeIn(p6, scale=2), d.lab[-6].animate.set_color(VERT_OK).scale(1.3),
                FadeIn(cmp_[0], scale=1.3), rt=0.35)
        self.au("plus grand", FadeIn(cmp_[1], shift=RIGHT * 0.15), rt=0.3)
        self.au("7. Une", FadeIn(p7, scale=2), d.lab[-7].animate.scale(1.3), FadeIn(cmp_[2], scale=1.3), rt=0.35)
        arc = CurvedArrow(P(d.x(-7), d.y + 0.2), P(d.x(-6), d.y + 0.2), angle=-PI * 0.6, color=VERT_OK,
                          stroke_width=4, tip_length=0.15)
        dr_ = T("à droite", 28, VERT_OK, audit=False).next_to(arc, UP, buff=0.05)
        self.play(Create(arc), FadeIn(dr_), run_time=0.35)
        # la bactérie et le virus, à l'échelle relative (20 fois)
        bac = bacterie(2.8).move_to(P(-3.6, -1.15))
        vir = virus(0.07).move_to(P(2.6, -1.15))
        nb = nota("2", "−6", fs=44, unite="m").move_to(P(-3.8, -2.45))
        nv = nota("1", "−7", fs=44, unite="m").move_to(P(2.6, -2.45))
        lb = T("bactérie", 30, "#86efac").next_to(bac, UP, buff=0.15)
        loupe = Circle(radius=0.32, color=GREY_B, stroke_width=2).move_to(vir)
        lv = T("virus", 30, "#fda4af").next_to(loupe, UP, buff=0.12)
        self.au("bactérie", FadeIn(bac, scale=0.6), FadeIn(lb), rt=0.45)
        for n, mm in ((nb, "2 fois"), (nv, "1 fois")):
            if n is nv:
                self.au("qu'un virus", FadeIn(vir, scale=0.3), Create(loupe), FadeIn(lv), rt=0.4)
            self.au(mm, FadeIn(n.m, scale=1.3), FadeIn(n.x), rt=0.3)
            self.au("10 puissance", FadeIn(n.p.base, scale=1.3), rt=0.3)
            self.au("moins", FadeIn(n.p.moins, scale=1.6), rt=0.25)
            self.au("6 mètre" if n is nb else "7 mètre", FadeIn(n.p.chif, scale=1.6), FadeIn(n.u, shift=LEFT * 0.1), rt=0.3)
            if n is nb:
                sup = T(">", 72, VERT_OK, audit=False).move_to(P(-0.4, -1.15))
                self.au("est plus grande", FadeIn(sup, scale=1.5), Indicate(bac.corps, color=VERT_OK, scale_factor=1.05),
                        rt=0.4)
        self.play(Indicate(nb.p.expo, color=VERT_OK, scale_factor=1.5), Indicate(nv.p.expo, color=EXPO_C, scale_factor=1.5),
                  run_time=0.5)
        self.attendre_voix(marge=0.4)

    # ── 05q : QUESTION 2 (le plus petit : 5 × 10⁻³ ; 5 × 10⁻⁴ ; 1 × 10⁻³) ──
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        choix = [nota("5", "−3", fs=40), nota("5", "−4", fs=40), nota("1", "−3", fs=40)]
        plans = []
        for c, mm, e in zip(choix, ("5 fois", "5 fois", "1 fois"), ("3.", "4.", "3.")):
            plans.append([(mm, [c.m, c.x]), ("10 puissance", [c.p.base]), ("moins", [c.p.moins]), (e, [c.p.chif])])
        d = self.droite_expo(-5, -2, -5.5, -0.9, -0.2, fs=34)
        dec = T("0,000 5", 80, VERT_OK, audit=False).move_to(P(-3.2, 1.6))

        def avant(sc, q):
            sc.poser_mots(q[0], [("Lequel", "Lequel")])

        def apres(sc):
            lg = sc.rep_nota(0, "Réponse B :", "5", "−4")
            sc.au("B :", FadeIn(lg.pre, shift=UP * 0.12), rt=0.25)
            sc.au("5 fois", FadeIn(lg.nt.m, lg.nt.x, shift=UP * 0.12), rt=0.25)
            sc.au("10 puissance", FadeIn(lg.nt.p.base, shift=UP * 0.12), rt=0.25)
            sc.au("moins", FadeIn(lg.nt.p.moins, shift=UP * 0.12), rt=0.2)
            sc.au("4,", FadeIn(lg.nt.p.chif, lg.pt, shift=UP * 0.12), rt=0.25)
            sc.au("soit", FadeIn(dec, scale=0.6), rt=0.4)
            lg2 = sc.rep_ligne(1, ["Son exposant,", "−4,"])
            lg2.add(sc.rep_ligne(2, ["est le plus petit."])[0])
            p4 = Dot(P(d.x(-4), d.y), radius=0.13, color=VERT_OK)
            p3 = Dot(P(d.x(-3), d.y), radius=0.13, color=PIEGE)
            la = T("B", 32, VERT_OK, audit=False).next_to(p4, UP, buff=0.22)
            lc = T("A, C", 32, PIEGE, audit=False).next_to(p3, UP, buff=0.22)
            sc.au("Son exposant", FadeIn(lg2[0], shift=UP * 0.12), Create(d[0]), FadeIn(d[1]), FadeIn(d[2]),
                  FadeIn(VGroup(*d.lab.values())), rt=0.4)
            sc.au("4, est", FadeIn(lg2[1], scale=1.3), FadeIn(p4, scale=2), FadeIn(la),
                  d.lab[-4].animate.set_color(VERT_OK).scale(1.3), rt=0.35)
            sc.play(FadeIn(p3, scale=2), FadeIn(lc), run_time=0.3)
            sc.pieges(0, 2)
            fl = Arrow(P(d.x(-3), d.y - 0.85), P(d.x(-4) - 0.3, d.y - 0.85), color=VERT_OK, buff=0, stroke_width=5,
                       max_tip_length_to_length_ratio=0.2)
            pp = T("le plus petit", 32, VERT_OK).next_to(fl, DOWN, buff=0.12)
            sc.au("est le plus petit", FadeIn(lg2[2], shift=UP * 0.12), GrowArrow(fl), FadeIn(pp), rt=0.4)
            sc.insister(dec, 1.2, 0.2)

        self.qpause("05q-question", "05r-reponse", ["Lequel est le plus petit ?"], choix, plans, 1,
                    ["Réponse B : 5 × 10⁻⁴.", "Son exposant, −4,", "est le plus petit."],
                    avant=avant, apres=apres)

    # ── 06 : défi : baleine bleue, éléphant, camion ─────────────────────────
    XS_A = (-4.1, 0.0, 3.9)

    def animaux(self):
        """Les trois masses, dans l'ordre de la voix du défi : (dessin, nom,
        notation) en VGroup vertical ; .dessin .nom .n."""
        res = []
        for dessin, nom, m, e in ((baleine(2.9), "baleine bleue", "1,5", "5"), (elephant(0.8), "éléphant", "6", "3"),
                                  (camion(0.95), "camion", "4", "4")):
            dessin.move_to(P(0, 0.5))
            nm = T(nom, 30, CIEL).move_to(P(0, -0.75))
            n = nota(m, e, fs=46, unite="kg", fs_u=34).move_to(P(0, -1.55))
            g = VGroup(dessin, nm, n)
            g.dessin, g.nom, g.n = dessin, nm, n
            res.append(g)
        for g, x in zip(res, self.XS_A):
            g.shift(RIGHT * x)
        return res

    def ecran_defi(self):
        self.ecran("06-defi")
        tit = T("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-0.4, 3.08))
        self.au("À toi", Write(tit), rt=0.6)
        l1 = VGroup(T("Range ces trois masses,", 30), T("de la plus petite à la plus grande.", 30)).arrange(
            DOWN, buff=0.1).move_to(P(-0.4, 1.98))
        self.au("Range", FadeIn(l1[0], shift=RIGHT * 0.15), rt=0.35)
        self.au("de la plus", FadeIn(l1[1], shift=RIGHT * 0.15), rt=0.35)
        anim = self.animaux()
        for g, mot, mm, e in zip(anim, ("Une baleine", "Un éléphant", "Un camion"), ("1,5 fois", "6 fois", "4 fois"),
                                 ("5 kilogrammes", "3 kilogrammes", "4 kilogrammes")):
            self.au(mot, FadeIn(g.dessin, shift=UP * 0.3), FadeIn(g.nom), rt=0.45)
            self.au(mm, FadeIn(g.n.m, scale=1.3), FadeIn(g.n.x), rt=0.3)
            self.au("10 puissance", FadeIn(g.n.p.base, scale=1.3), rt=0.3)
            self.au(e, FadeIn(g.n.p.expo, scale=1.6), FadeIn(g.n.u, shift=LEFT * 0.1), rt=0.3)
        self.au("Mets pause")
        pz = T("Mets pause, et cherche !", 36, ORANGE_RETENUE).move_to(P(0, -2.65)).align_to(P(-6.0, 0), LEFT)
        self.play(Write(pz), run_time=0.8)
        self.attendre_voix(marge=2.0)

    # ── 06b : correction : rangés par exposant 3, 4, 5 ─────────────────────
    def ecran_correction(self):
        self.ecran("06b-correction")
        tit = T("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.12))
        self.au("Correction", Write(tit), rt=0.5)
        anim = self.animaux()
        k = 0.58
        for g in anim:
            g.scale(k).move_to(P(g.get_x(), 1.85))
        self.play(*[FadeIn(sans_audit(g)) for g in anim], run_time=0.4)  # le défi, déjà dit
        self.au("les exposants", *[Indicate(g.n.p.expo, color=EXPO_C, scale_factor=1.8) for g in anim], rt=0.5)
        # l'ordre : éléphant (3), camion (4), baleine (5)
        ordre = (1, 2, 0)
        slots = (-4.2, 0.0, 3.9)
        gros = [T(s, 54, EXPO_C) for s in ("3", "4", "5")]
        for j, (i, x, mot) in enumerate(zip(ordre, slots, ("3,", "4,", "5."))):
            gros[j].move_to(P(x, 0.62))
            self.au(mot, FadeIn(gros[j], scale=1.6), anim[i].n.p.expo.animate.set_color(VERT_OK), rt=0.3)
        y_slot = -1.07
        for i, x, mot in zip(ordre, slots, ("l'éléphant", "puis le camion", "puis la baleine")):
            g = anim[i]
            self.au(mot, g.animate(path_arc=-PI * 0.35).scale(0.85 / k).move_to(P(x, y_slot)), rt=0.6)
        masses = [T(s, 38, VERT_OK) for s in ("6 000 kg", "40 000 kg", "150 000 kg")]
        for x, m, mot in zip(slots, masses, ("6 000", "40 000", "150 000")):
            sans_audit(m)  # dits au mot (l'audit ne lit pas l'espace)
            m.move_to(P(x, -2.72))
            self.au(mot, FadeIn(m, shift=UP * 0.15), rt=0.35)
        fl = Arrow(P(-5.6, -3.27), P(4.9, -3.27), color=VERT_OK, buff=0, stroke_width=5,
                   max_tip_length_to_length_ratio=0.03)
        self.play(GrowArrow(fl), run_time=0.5)
        self.insister(VGroup(*gros), 1.3, 0.2)
        self.attendre_voix(marge=0.5)

    # ── 07 : ce que tu as appris ───────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("07-finale", 0.5)
        tit = T("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.au("Ce que", Write(tit), rt=0.7)
        X0 = -6.0
        l0 = T("Pour comparer en notation scientifique :", 38, CIEL).move_to(P(0, 2.15)).align_to(P(X0, 0), LEFT)
        self.au("Pour comparer", FadeIn(l0, shift=RIGHT * 0.2), rt=0.4)
        lignes = []
        for y, morceaux in ((1.2, (("on compare d'abord", WHITE), ("les exposants.", EXPO_C))),
                            (0.25, (("S'ils sont égaux, on compare", WHITE), ("les nombres devant.", BASE_C))),
                            (-0.7, (("Avec des exposants négatifs :", WHITE), ("−6", VERT_OK), (">", WHITE),
                                    ("−7", EXPO_C)))):
            ck = self.coche()
            m = ligne_base(VGroup(*[T(s, 36, c) for s, c in morceaux]).arrange(RIGHT, buff=0.2))
            lg = VGroup(ck, m).arrange(RIGHT, buff=0.3)
            if lg.width > 12.4:
                lg.scale_to_fit_width(12.4)
            lg.move_to(P(0, y)).align_to(P(X0, 0), LEFT)
            lignes.append((ck, m))
        ck, m = lignes[0]
        self.au("on compare d'abord", Create(ck), FadeIn(m[0], shift=RIGHT * 0.15), rt=0.35)
        self.au("les exposants", FadeIn(m[1], shift=RIGHT * 0.15), rt=0.3)
        self.insister(m[1], 1.15, 0.2)
        ck, m = lignes[1]
        self.au("S'ils", Create(ck), FadeIn(m[0], shift=RIGHT * 0.15), rt=0.35)
        self.au("les nombres", FadeIn(m[1], shift=RIGHT * 0.15), rt=0.3)
        ck, m = lignes[2]
        self.au("Avec des", Create(ck), FadeIn(m[0], shift=RIGHT * 0.15), rt=0.35)
        self.au("6 est", FadeIn(m[1], scale=1.3), rt=0.3)
        self.au("plus grand", FadeIn(m[2], scale=1.3), rt=0.25)
        self.au("7. Alors", FadeIn(m[3], scale=1.3), rt=0.3)
        ep = ligne_base(VGroup(T("Épisode 7 :", 36, JAUNE_TITRE), T("calculer avec des puissances de", 36), T("10", 36)).arrange(RIGHT, buff=0.25))
        ep.move_to(P(0, -2.0)).align_to(P(X0, 0), LEFT)
        self.au("7 t'attend", FadeIn(ep[0], shift=UP * 0.15), rt=0.35)
        self.au("calculer", FadeIn(ep[1], shift=UP * 0.15), rt=0.35)
        self.au("10.", FadeIn(ep[2], scale=1.3), rt=0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_volcans()
        self.ecran_entier()
        self.ecran_regle()
        self.ecran_question1()
        self.ecran_egaux()
        self.ecran_negatifs()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("08-abonne")


class PuissanceComparer4e(PuissanceComparerBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"
