# longueur_estimer.py
# EleveAI — Maths CM1 — série « Longueurs », épisode 03 : ESTIMER UNE LONGUEUR
# (micro longueur_estimer, notion longueur), AVEC VOIX. Paysage 16:9, CEINTURE JAUNE.
# Décor et métier : Sarah, GUIDE NATURE (balade en forêt ; centres : nature-ecologie, sport).
# Mapping micro → écrans : 02 (les repères : 1 mm l'épaisseur d'une carte, 1 cm la largeur d'un doigt,
# 1 m un grand pas, 1 km un quart d'heure de marche), 03 (le sentier : 3 m = trois grands pas, trop court ;
# 3 km ≈ trois quarts d'heure), 04 (choisir l'unité : dans la main → cm ; salle, arbre → m ; trajet → km),
# 06 (piège : crayon de 15 cm, pas de 15 m), questions 05 (porte, C) et 07 (fourmi, A),
# défi 08 (coccinelle, arbre, bâton de marche, balade : 1 m, 8 m, 6 mm, 4 km).
# Voix : manim/voix/cm1-longueur-estimer.json (validée le 14/11, Julie, débit −6) ;
# marques : longueur_estimer_marques.json (python manim/scripts/cm1/aire_marques.py longueur:estimer).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/longueur_estimer.py LongueurEstimerCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/longueur_estimer.py LongueurEstimerCM1 -o eleveai-maths-cm1-longueur-estimer --media_dir manim/scripts/cm1/media-longueur-03
# Sortie : manim/sorties/cm1/maths/longueur/03-estimer/eleveai-maths-cm1-longueur-estimer.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from longueur_cm1_commun import *  # noqa: E402,F403

PEAU = "#f1c27d"
ECORCE = "#92400e"
FEUILLAGE = "#16a34a"
SAPIN = "#15803d"
TERRE = "#a16207"
FLECHE = ORANGE_RETENUE


# ── Les dessins de l'épisode ────────────────────────────────────────────────

def sapin(s=1.0):
    """Un sapin : trois étages de triangles et un tronc."""
    tronc = Rectangle(width=0.2, height=0.32, fill_color=ECORCE, fill_opacity=1, stroke_width=0).move_to(P(0, -0.76))
    et = VGroup(*[Polygon(P(-w, y0), P(w, y0), P(0, y1), fill_color=SAPIN, fill_opacity=1, stroke_width=0)
                  for w, y0, y1 in ((0.62, -0.6, 0.1), (0.5, -0.18, 0.5), (0.37, 0.22, 0.88))])
    return VGroup(tronc, et).scale(s)


def arbre(s=1.0):
    """Un arbre feuillu : un tronc et une boule de feuillage."""
    tronc = Rectangle(width=0.26, height=1.0, fill_color=ECORCE, fill_opacity=1, stroke_width=0).move_to(P(0, -0.55))
    boules = VGroup(*[Circle(radius=r, fill_color=FEUILLAGE, fill_opacity=1, stroke_width=0).move_to(P(x, y))
                      for x, y, r in ((0, 0.55, 0.5), (-0.42, 0.22, 0.4), (0.42, 0.22, 0.4), (0, 0.15, 0.42))])
    return VGroup(tronc, boules).scale(s)


def chemin(points, couleur=TERRE, sw=12):
    """Un chemin sinueux passant par les points (x, y)."""
    v = VMobject(stroke_color=couleur, stroke_width=sw)
    v.set_points_smoothly([P(x, y) for x, y in points])
    return v


def drapeau(couleur=ROUGE_ERREUR, h=0.6):
    mat = Line(P(0, 0), P(0, h), color=WHITE, stroke_width=4)
    fl = Polygon(P(0, h), P(0, h - 0.24), P(0.32, h - 0.12), fill_color=couleur, fill_opacity=1, stroke_width=0)
    return VGroup(mat, fl)


def trajet(s=1.0):
    """Un trajet : un chemin qui serpente, un point de départ et un drapeau d'arrivée."""
    c = chemin([(-1.1, -0.45), (-0.5, 0.05), (0.15, -0.35), (0.75, 0.15), (1.05, 0.35)])
    dep = Dot(P(-1.1, -0.45), radius=0.1, color=WHITE)
    dr = drapeau().move_to(P(1.05, 0.35), aligned_edge=DOWN + LEFT).shift(LEFT * 0.02)
    return VGroup(c, dep, dr).scale(s)


def panneau(larg=3.3, s=1.0):
    """Le panneau de bois du sentier : un poteau, une planche."""
    poteau = Rectangle(width=0.18, height=1.7, fill_color=ECORCE, fill_opacity=1, stroke_width=0).move_to(P(0, -0.75))
    planche = RoundedRectangle(width=larg, height=0.95, corner_radius=0.1, fill_color="#b45309", fill_opacity=1,
                               stroke_color="#78350f", stroke_width=4).move_to(P(0, 0.35))
    g = VGroup(poteau, planche)
    g.planche = planche
    return g.scale(s)


def tache():
    """L'unité effacée : une tache grise et des traits de gomme."""
    t = Ellipse(width=0.95, height=0.55, fill_color="#d6d3d1", fill_opacity=0.75, stroke_width=0)
    traits = VGroup(*[Line(P(-0.35, y), P(0.35, y + 0.08), color="#a8a29e", stroke_width=3) for y in (-0.12, 0.02, 0.16)])
    traits.move_to(t)
    return VGroup(t, traits)


def carte():
    """1 mm : une carte (face) et la même vue par la tranche, pincée entre deux flèches."""
    face = RoundedRectangle(width=0.85, height=1.2, corner_radius=0.08, fill_color=WHITE, fill_opacity=1,
                            stroke_color="#94a3b8", stroke_width=2)
    coeur = VGroup(Circle(radius=0.1, fill_color=ROUGE_ERREUR, fill_opacity=1, stroke_width=0).move_to(P(-0.08, 0.06)),
                   Circle(radius=0.1, fill_color=ROUGE_ERREUR, fill_opacity=1, stroke_width=0).move_to(P(0.08, 0.06)),
                   Polygon(P(-0.18, 0.02), P(0.18, 0.02), P(0, -0.2), fill_color=ROUGE_ERREUR, fill_opacity=1,
                           stroke_width=0))
    face = VGroup(face, coeur).move_to(P(-0.5, 0))
    tranche = Rectangle(width=0.05, height=1.2, fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(P(0.55, 0))
    f1 = Arrow(P(0.05, 0), P(0.52, 0), buff=0, color=FLECHE, stroke_width=4, max_tip_length_to_length_ratio=0.35)
    f2 = Arrow(P(1.05, 0), P(0.58, 0), buff=0, color=FLECHE, stroke_width=4, max_tip_length_to_length_ratio=0.35)
    return VGroup(face, tranche, f1, f2)


def doigt(s=1.0):
    """1 cm : un doigt levé, sa largeur marquée par une double flèche."""
    d = RoundedRectangle(width=0.56, height=1.5, corner_radius=0.27, fill_color=PEAU, fill_opacity=1, stroke_width=0)
    ongle = RoundedRectangle(width=0.36, height=0.42, corner_radius=0.15, fill_color="#fde2e4", fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.42))
    plis = VGroup(*[Arc(radius=0.16, start_angle=-PI * 0.8, angle=PI * 0.6, color="#c08a4b", stroke_width=3)
                    .move_to(P(0, y)) for y in (-0.15, -0.35)])
    fl = DoubleArrow(P(-0.28, 0.02), P(0.28, 0.02), buff=0, color=FLECHE, stroke_width=4, tip_length=0.12)
    return VGroup(d, ongle, plis, fl).scale(s)


def grand_pas(s=1.0, tenue="#2563eb"):
    """1 m : deux jambes écartées d'un grand pas, la longueur au sol marquée."""
    buste = Polygon(P(-0.3, 0.7), P(0.3, 0.7), P(0.22, 1.25), P(-0.22, 1.25), fill_color=FEUILLAGE, fill_opacity=1,
                    stroke_width=0)
    j1 = Line(P(-0.12, 0.72), P(-0.8, -0.5), color=tenue, stroke_width=16)
    j2 = Line(P(0.12, 0.72), P(0.8, -0.5), color=tenue, stroke_width=16)
    ch = VGroup(*[Ellipse(width=0.38, height=0.18, fill_color="#111827", fill_opacity=1, stroke_color=WHITE,
                          stroke_width=1.5).move_to(P(x, -0.55)) for x in (-0.78, 0.86)])
    sol = Line(P(-1.15, -0.66), P(1.2, -0.66), color=GRAY_B, stroke_width=3)
    fl = DoubleArrow(P(-0.8, -0.88), P(0.8, -0.88), buff=0, color=FLECHE, stroke_width=4, tip_length=0.14)
    return VGroup(sol, j1, j2, buste, ch, fl).scale(s)


def horloge(quarts=1, r=0.65):
    """Un cadran ; g.parts = les quarts d'heure colorés (quarts premiers), à montrer un par un."""
    cad = Circle(radius=r, fill_color="#f8fafc", fill_opacity=1, stroke_color="#334155", stroke_width=5)
    parts = VGroup(*[AnnularSector(inner_radius=0, outer_radius=r * 0.9, angle=-PI / 2, start_angle=PI / 2 - k * PI / 2,
                                   fill_color=VERT_OK, fill_opacity=0.75, stroke_width=0) for k in range(quarts)])
    ticks = VGroup(*[Line(r * 0.78 * np.array([np.cos(a), np.sin(a), 0]), r * 0.95 * np.array([np.cos(a), np.sin(a), 0]),
                          color="#334155", stroke_width=4) for a in (0, PI / 2, PI, 3 * PI / 2)])
    a = PI / 2 - quarts * PI / 2
    aig = Line(ORIGIN, r * 0.72 * np.array([np.cos(a), np.sin(a), 0]), color="#0f172a", stroke_width=5)
    ctr = Dot(ORIGIN, radius=0.06, color="#0f172a")
    g = VGroup(cad, parts, ticks, aig, ctr)
    g.parts, g.aig = parts, aig
    return g


def main(s=1.0):
    """Une main ouverte, doigts vers le haut."""
    paume = RoundedRectangle(width=1.05, height=0.95, corner_radius=0.3, fill_color=PEAU, fill_opacity=1,
                             stroke_width=0).move_to(P(0, -0.25))
    doigts = VGroup(*[RoundedRectangle(width=0.23, height=h, corner_radius=0.11, fill_color=PEAU, fill_opacity=1,
                                       stroke_width=0).move_to(P(x, 0.1 + h / 2))
                      for x, h in ((-0.36, 0.55), (-0.12, 0.68), (0.12, 0.66), (0.36, 0.5))])
    pouce = RoundedRectangle(width=0.24, height=0.6, corner_radius=0.11, fill_color=PEAU, fill_opacity=1,
                             stroke_width=0).rotate(0.7).move_to(P(-0.62, -0.05))
    poignet = Rectangle(width=0.7, height=0.4, fill_color="#0ea5e9", fill_opacity=1, stroke_width=0).move_to(P(0, -0.85))
    return VGroup(poignet, paume, doigts, pouce).scale(s)


def feuille(s=1.0, couleur="#22c55e"):
    """Une feuille d'arbre : le limbe, la nervure, la queue."""
    limbe = Ellipse(width=1.0, height=0.52, fill_color=couleur, fill_opacity=1, stroke_width=0)
    nerv = Line(P(-0.5, 0), P(0.45, 0), color="#14532d", stroke_width=3)
    queue = Line(P(-0.5, 0), P(-0.72, -0.06), color="#14532d", stroke_width=4)
    return VGroup(limbe, nerv, queue).rotate(0.35).scale(s)


def caillou(s=1.0):
    c = Ellipse(width=0.55, height=0.36, fill_color="#9ca3af", fill_opacity=1, stroke_color="#6b7280", stroke_width=2)
    reflet = Ellipse(width=0.16, height=0.07, fill_color=WHITE, fill_opacity=0.6, stroke_width=0).move_to(P(-0.1, 0.08))
    return VGroup(c, reflet).scale(s)


def salle(s=1.0):
    """Une salle de classe vue de face : le mur, le tableau, la porte."""
    mur = Rectangle(width=1.7, height=1.25, fill_color="#e2e8f0", fill_opacity=1, stroke_color="#64748b", stroke_width=3)
    tab = Rectangle(width=0.75, height=0.45, fill_color="#166534", fill_opacity=1, stroke_color="#78350f",
                    stroke_width=3).move_to(P(-0.3, 0.18))
    porte = Rectangle(width=0.36, height=0.75, fill_color=ECORCE, fill_opacity=1, stroke_width=0)
    porte.move_to(P(0.5, 0)).align_to(mur, DOWN)
    return VGroup(mur, tab, porte).scale(s)


def porte(s=1.0):
    """Une porte d'intérieur : le battant, deux panneaux, la poignée."""
    bat = Rectangle(width=0.95, height=2.0, fill_color="#b45309", fill_opacity=1, stroke_color="#78350f", stroke_width=4)
    pans = VGroup(*[Rectangle(width=0.62, height=h, fill_opacity=0, stroke_color="#78350f", stroke_width=3)
                    .move_to(P(0, y)) for y, h in ((0.48, 0.75), (-0.5, 0.75))])
    poig = Dot(P(0.33, -0.02), radius=0.06, color="#facc15")
    return VGroup(bat, pans, poig).scale(s)


def maison(s=1.0):
    """Une maison : les murs, le toit, la porte, une fenêtre."""
    mur = Rectangle(width=1.5, height=1.1, fill_color="#fde68a", fill_opacity=1, stroke_width=0).move_to(P(0, -0.45))
    toit = Polygon(P(-0.95, 0.1), P(0.95, 0.1), P(0, 0.75), fill_color="#dc2626", fill_opacity=1, stroke_width=0)
    pt = Rectangle(width=0.32, height=0.55, fill_color=ECORCE, fill_opacity=1, stroke_width=0).move_to(P(-0.3, -0.725))
    fen = Square(0.34, fill_color="#bae6fd", fill_opacity=1, stroke_color=WHITE, stroke_width=2).move_to(P(0.35, -0.4))
    return VGroup(mur, toit, pt, fen).scale(s)


def fourmi(s=1.0):
    """Une fourmi vue de dessus : trois boules noires et six pattes."""
    ab = Ellipse(width=0.24, height=0.16, fill_color="#111827", fill_opacity=1, stroke_width=0).move_to(P(-0.17, 0))
    th = Ellipse(width=0.13, height=0.1, fill_color="#111827", fill_opacity=1, stroke_width=0).move_to(P(0.01, 0))
    te = Circle(radius=0.06, fill_color="#111827", fill_opacity=1, stroke_width=0).move_to(P(0.13, 0))
    pattes = VGroup()
    for dx in (-0.05, 0.01, 0.07):
        for sg in (1, -1):
            pattes.add(Line(P(0.01, 0), P(dx + (dx - 0.01) * 1.2, sg * 0.14), color="#111827", stroke_width=2))
    ant = VGroup(Line(P(0.16, 0.02), P(0.25, 0.09), color="#111827", stroke_width=2),
                 Line(P(0.16, -0.02), P(0.25, -0.09), color="#111827", stroke_width=2))
    return VGroup(pattes, ant, ab, th, te).scale(s)


def coccinelle(s=1.0):
    """Une coccinelle vue de dessus : la carapace rouge à points noirs, la tête."""
    tete = Circle(radius=0.17, fill_color="#111827", fill_opacity=1, stroke_width=0).move_to(P(0, 0.33))
    corps = Circle(radius=0.36, fill_color="#dc2626", fill_opacity=1, stroke_color="#111827", stroke_width=3)
    raie = Line(P(0, 0.36), P(0, -0.36), color="#111827", stroke_width=3)
    pts = VGroup(*[Dot(P(x, y), radius=0.06, color="#111827")
                   for x, y in ((-0.17, 0.12), (0.17, 0.12), (-0.2, -0.13), (0.2, -0.13), (-0.08, -0.25), (0.08, -0.25))])
    return VGroup(tete, corps, raie, pts).scale(s)


def baton(s=1.0):
    """Un bâton de marche : le bois, la dragonne, l'embout."""
    b = Line(P(-0.08, -0.85), P(0.08, 0.8), color="#a16207", stroke_width=12)
    poig = RoundedRectangle(width=0.2, height=0.36, corner_radius=0.08, fill_color="#111827", fill_opacity=1,
                            stroke_width=0).rotate(-0.1).move_to(P(0.065, 0.62))
    drag = Arc(radius=0.17, start_angle=PI * 0.6, angle=PI * 1.2, color="#f97316", stroke_width=4).move_to(P(-0.06, 0.45))
    bout = Dot(P(-0.08, -0.86), radius=0.06, color=GRAY_B)
    return VGroup(b, drag, poig, bout).scale(s)


def empreintes(n=4, pas=1.0, y=0.0, x0=0.0):
    """Des traces de pas au sol, de x0 en x0 + (n-1)·pas."""
    return VGroup(*[Ellipse(width=0.36, height=0.18, fill_color="#e5e7eb", fill_opacity=1, stroke_width=0)
                    .move_to(P(x0 + k * pas, y + (0.08 if k % 2 else -0.08))) for k in range(n)])


class LongueurEstimerBase(PaysageLongueurCM1):
    nom_voix = "cm1-longueur-estimer"
    fichier_marques = "longueur_estimer_marques.json"
    ceinture = "jaune"
    _q_pas = None  # (écran 07) l'écart entre les hauts des lignes de la question

    def _disposer_q(self, question, choix, phrase):
        """(14/11) Trois lignes sans jambage se collaient : on les pose à pas fixe
        (les trois ont une majuscule ou un f/l : leurs hauts sont à la même hauteur de lettre)."""
        r = list(super()._disposer_q(question, choix, phrase))
        if self._q_pas:
            tete, q, cartes, pause = r[:4]
            haut, gauche = q.get_top()[1], q.get_left()[0]
            for i, l in enumerate(q):
                l.align_to(P(gauche, 0), LEFT).align_to(P(0, haut - i * self._q_pas), UP)
            d = cartes.get_top()[1] - (q.get_bottom()[1] - 0.2)
            if d > 0:
                cartes.shift(DOWN * d)
                pause.shift(DOWN * d)
        return tuple(r)

    def foret(self, pos, s=1.0):
        """Un sentier qui serpente entre les sapins."""
        c = chemin([(-1.6, -1.2), (-0.6, -0.55), (0.4, -0.75), (1.1, -0.1), (0.6, 0.6)], sw=22)
        sp = VGroup(*[sapin(k).move_to(P(x, y)) for x, y, k in ((-1.5, 0.25, 1.1), (1.7, 0.55, 1.3), (-0.4, 0.95, 0.9),
                                                                 (1.85, -0.95, 0.8))])
        return VGroup(c, sp).scale(s).move_to(pos)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Estimer une longueur", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Estimer une longueur")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q0 = self.t("Ce sentier fait-il", 38, WHITE)
        q1 = self.ligne([("3 m", JAUNE_TITRE), ("ou 3 km ?", JAUNE_TITRE)], 38, buff=0.25)
        q = VGroup(q0, q1).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        f = self.foret(P(3.4, 0.35), 0.85)
        self.au_mot("Ce sentier fait-il")
        self.play(FadeIn(q0, shift=UP * 0.2), FadeIn(f, shift=LEFT * 0.3), run_time=0.35)
        self.au_mot("3 mètres")
        self.play(FadeIn(q1[0], shift=UP * 0.2), run_time=0.25)
        self.au_mot("ou 3")
        self.play(FadeIn(q1[1], shift=UP * 0.2), Indicate(f[0], color=JAUNE_TITRE), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 01 : Sarah, guide nature ────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = sarah(0.95).move_to(P(-5.3, 0.35))
        self.au_mot("Voici Sarah")
        nom = self.t("Sarah", 42, VERT_OK).next_to(pe, UP, buff=0.25)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("guide nature")
        met = self.t("guide nature", 26, VERT_OK).next_to(pe, DOWN, buff=0.12)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        XP = 1.35
        l0 = self.bloc(["Elle emmène une classe", "en balade en forêt."], 30)
        self.col(l0, 2.3, XP)
        self.au_mot("emmène une classe")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.3)
        sp = VGroup(sapin(1.0).move_to(P(-4.0, 0.15)), sapin(1.3).move_to(P(-3.25, 0.45)))
        self.au_mot("balade en forêt")
        self.play(FadeIn(l0[1], shift=UP * 0.1), FadeIn(sp, shift=UP * 0.2, lag_ratio=0.3), run_time=0.45)
        pn = panneau(3.6).move_to(P(-0.7, -0.05))
        self.au_mot("Sur le panneau")
        self.play(FadeIn(pn, shift=UP * 0.2), run_time=0.4)
        ta = tache().move_to(pn.planche.get_center() + RIGHT * 1.25)
        l1 = self.t("L'unité est effacée !", 30, ORANGE_RETENUE)
        self.col(l1, 0.75, XP)
        self.au_mot("l'unité est effacée")
        self.play(FadeIn(ta, scale=1.3), FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        ecr = self.t("Sentier : 3", 30, WHITE).move_to(pn.planche.get_center()).align_to(pn.planche, LEFT).shift(RIGHT * 0.2)
        self.au_mot("sentier, 3")
        self.play(Write(ecr), run_time=0.4)
        l2 = self.t("m ou km ?", 44, JAUNE_TITRE)
        self.col(l2, -0.1, XP)
        self.au_mot("Mètres ou kilomètres")
        self.play(FadeIn(l2, scale=1.2), Wiggle(ta), run_time=0.5)
        l3 = self.bloc(["Sans mesurer,", "il faut estimer !"], 34, VERT_OK)
        self.col(l3, -1.35, XP)
        self.au_mot("Sans mesurer")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("il faut estimer")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 02 : les repères ────────────────────────────────────────────────────
    XR = (-5.1, -2.3, 0.45, 3.75)

    def ecran_reperes(self):
        self.ecran("02-reperes")
        self.au_mot("Pour estimer")
        tit = self.t("Pour estimer, on compare avec des repères.", 34, JAUNE_TITRE).move_to(P(0, 2.85))
        self.play(Write(tit), run_time=0.5)
        dess = [carte(), doigt(1.0), grand_pas(0.95), horloge(1, 0.7)]
        unites = ["1 mm", "1 cm", "1 m", "1 km"]
        legendes = [["l'épaisseur", "d'une carte"], ["la largeur", "de ton doigt"], ["un grand pas"],
                    ["un quart d'heure", "de marche"]]
        mots = [("1 millimètre", "épaisseur d'une carte"), ("1 centimètre", "largeur de ton doigt"),
                ("1 mètre", "un grand pas"), ("1 kilomètre", "quart d'heure de marche")]
        for x, d, u, lg, (m1, m2) in zip(self.XR, dess, unites, legendes, mots):
            d.move_to(P(x, 0.2))
            et = self.t(u, 44, BLEU_D).move_to(P(x, 1.75))
            le = self.bloc(lg, 26, GRAY_B)
            le.move_to(P(x, 0)).align_to(P(0, -1.1), UP)
            self.au_mot(m1)
            self.play(FadeIn(et, scale=1.3), run_time=0.3)
            self.au_mot(m2)
            self.play(FadeIn(d, shift=UP * 0.2), FadeIn(le, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix()

    # ── 03 : le sentier : 3 m ou 3 km ? ─────────────────────────────────────
    def ecran_sentier(self):
        self.ecran("03-sentier")
        XG, XD = -3.5, 2.4
        # à gauche : 3 m = trois grands pas
        a = self.t("3 m", 60, BLEU_D).move_to(P(XG, 2.55))
        self.au_mot("3 mètres")
        self.play(FadeIn(a, scale=1.3), run_time=0.3)
        pr = empreintes(4, 1.0, 0.75, XG - 1.5)
        arcs = VGroup(*[ArcBetweenPoints(pr[k].get_top() + UP * 0.05, pr[k + 1].get_top() + UP * 0.05, angle=-PI * 0.6,
                                         color=FLECHE, stroke_width=5) for k in range(3)])
        l0 = self.ligne([("c'est", WHITE), ("trois grands pas :", JAUNE_TITRE)], 32, buff=0.2).move_to(P(XG, -0.1))
        self.au_mot("c'est trois grands pas")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(pr[0]), run_time=0.3)
        for k in range(3):
            self.play(Create(arcs[k]), FadeIn(pr[k + 1], scale=1.3), run_time=0.25)
        l1 = self.bloc(["bien trop court", "pour une balade !"], 32, ROUGE_ERREUR).move_to(P(XG, -1.05))
        croix = VGroup(Line(UL, DR), Line(UR, DL)).set_color(ROUGE_ERREUR).set_stroke(width=8).scale(0.45)
        croix.move_to(VGroup(pr, arcs)).shift(RIGHT * 2.25)
        self.au_mot("bien trop court")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Create(croix), run_time=0.35)
        self.au_mot("pour une balade")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        # à droite : 3 km = trois quarts d'heure
        sep = DashedLine(P(-0.45, 2.9), P(-0.45, -1.75), color=GRAY_D, stroke_width=3)
        b = self.t("3 km", 60, BLEU_D).move_to(P(XD, 2.55))
        self.au_mot("3 kilomètres")
        self.play(FadeIn(b, scale=1.3), Create(sep), run_time=0.3)
        h = horloge(3, 0.72).move_to(P(XD, 0.95))
        h.parts.set_opacity(0)
        r = self.bloc(["c'est environ", "trois quarts d'heure", "de marche."], 32).move_to(P(XD, -0.75))
        r[1].set_color(JAUNE_TITRE)
        self.au_mot("c'est environ")
        self.play(FadeIn(r[0], shift=UP * 0.1), FadeIn(VGroup(h[0], h[2], h[3], h[4])), run_time=0.3)
        self.au_mot("trois quarts d'heure")
        self.play(FadeIn(r[1], shift=UP * 0.1), run_time=0.25)
        for p in h.parts:
            self.play(p.animate.set_fill(opacity=0.75), run_time=0.2)
        self.add(h)
        self.au_mot("de marche")
        self.play(FadeIn(r[2], shift=UP * 0.1), run_time=0.3)
        res = self.ligne([("Le sentier fait", WHITE), ("3 km.", VERT_OK)], 44, buff=0.25).move_to(P(-0.8, -2.55))
        self.au_mot("Le sentier fait")
        self.play(FadeIn(res[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("fait 3")
        self.play(FadeIn(res[1], scale=1.25), Indicate(b, color=VERT_OK), run_time=0.45)
        self.attendre_voix()

    # ── 04 : choisir l'unité ────────────────────────────────────────────────
    XU = (-4.3, -0.5, 3.3)

    def ecran_unite(self):
        self.ecran("04-unite")
        self.au_mot("Choisis d'abord")
        tit = self.t("Choisis d'abord la bonne unité :", 40, JAUNE_TITRE).move_to(P(0, 2.8))
        self.play(Write(tit), run_time=0.45)
        x1, x2, x3 = self.XU
        # dans la main
        mn = main(1.0).move_to(P(x1 - 0.55, 1.0))
        c1 = self.bloc(["ce qui tient", "dans la main"], 26, GRAY_B).move_to(P(x1, -0.55))
        self.au_mot("tient dans la main")
        self.play(FadeIn(mn, shift=UP * 0.2), FadeIn(c1, shift=UP * 0.1), run_time=0.4)
        fe = feuille(1.0).move_to(P(x1 + 0.75, 1.35))
        ca = caillou(1.1).move_to(P(x1 + 0.7, 0.55))
        self.au_mot("une feuille")
        self.play(FadeIn(fe, scale=1.3), run_time=0.25)
        self.au_mot("un caillou")
        self.play(FadeIn(ca, scale=1.3), run_time=0.25)
        u1 = self.t("cm", 72, VERT_OK).move_to(P(x1, -1.7))
        self.au_mot("les centimètres")
        self.play(FadeIn(u1, scale=1.3), run_time=0.3)
        # salle, arbre
        sa = salle(1.0).move_to(P(x2 - 0.6, 0.85))
        ar = arbre(0.95).move_to(P(x2 + 0.95, 1.0))
        c2 = self.bloc(["une salle,", "un arbre"], 26, GRAY_B).move_to(P(x2, -0.55))
        self.au_mot("Une salle")
        self.play(FadeIn(sa, shift=UP * 0.2), FadeIn(c2, shift=UP * 0.1), run_time=0.15)
        self.au_mot("un arbre")
        self.play(FadeIn(ar, shift=UP * 0.2), run_time=0.3)
        u2 = self.t("m", 72, VERT_OK).move_to(P(x2, -1.7))
        self.au_mot("les mètres")
        self.play(FadeIn(u2, scale=1.3), run_time=0.3)
        # un trajet
        tr = trajet(1.1).move_to(P(x3, 0.95))
        c3 = self.t("un trajet", 26, GRAY_B).move_to(P(x3, -0.55))
        self.au_mot("Un trajet")
        self.play(Create(tr[0]), FadeIn(tr[1:]), FadeIn(c3, shift=UP * 0.1), run_time=0.5)
        u3 = self.t("km", 72, VERT_OK).move_to(P(x3, -1.7))
        self.au_mot("les kilomètres")
        self.play(FadeIn(u3, scale=1.3), run_time=0.3)
        self.insister(VGroup(u1, u2, u3), 1.12, 0.25)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        pt = porte(0.95).move_to(P(-4.3, 1.45))
        adulte = personne(peau="#c68642", tenue="#0ea5e9", cheveux="#1f2937", s=0.72)
        adulte.next_to(pt, RIGHT, buff=0.35).align_to(pt, DOWN)

        def autres_q(sc):
            sc.play(FadeIn(pt), run_time=0.35)

        def apres(sc):
            sc.play(FadeIn(adulte, shift=LEFT * 0.2), run_time=0.2)

        self.question_gauche("05-question", "05b-reponse",
                             ["Quelle est la hauteur", "d'une porte ?"],
                             [self.choix("2 cm"), self.choix("20 m"), self.choix("2 m")], 2,
                             ["Une porte est un peu", "plus haute qu'un adulte :", "environ 2 m."],
                             -0.75, mot_q="Quelle est la hauteur", autres_q=autres_q, autres_r=apres)

    # ── 06 : le piège (15 cm, pas 15 m) ─────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention au piège")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        l0 = self.bloc(["Le nombre seul ne suffit pas :", "c'est l'unité qui compte !"], 34, JAUNE_TITRE)
        l0.move_to(P(0, 2.0)).align_to(P(-6.2, 0), LEFT)
        self.au_mot("Le nombre seul")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("l'unité qui compte")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.3)
        # à gauche : le crayon de 15 cm sur la règle
        XG = -3.4
        rg = regle(15, 0.31, mm=False, h=0.55, fs=15).move_to(P(XG, 0.0))
        cr = crayon_sur_regle(rg, 0, 15, ep=0.3)
        g1 = self.ligne([("Un crayon de", WHITE), ("15 cm,", BLEU_D)], 32, buff=0.2).move_to(P(XG, -0.95))
        ok = self.t("d'accord !", 36, VERT_OK).move_to(P(XG, -1.65))
        self.au_mot("compte. Un crayon de 15")
        self.play(FadeIn(rg), GrowFromEdge(cr, LEFT), FadeIn(g1, shift=UP * 0.1), run_time=0.45)
        self.au_mot("d'accord")
        self.play(FadeIn(ok, scale=1.2), Indicate(cr, color=VERT_OK, scale_factor=1.05), run_time=0.25)
        # à droite : 15 m, plus haut qu'une maison
        XD = 2.4
        sol = Line(P(0.4, -0.95), P(4.6, -0.95), color=GRAY_B, stroke_width=3)
        ma = maison(1.0).move_to(P(XD - 0.7, 0)).align_to(P(0, -0.95), DOWN)
        geant = crayon(2.75, 0.32).rotate(PI / 2).move_to(P(XD + 1.05, 0)).align_to(P(0, -0.95), DOWN)
        g2 = self.ligne([("Un crayon de", WHITE), ("15 m", ROUGE_ERREUR)], 32, buff=0.2).move_to(P(XD, -1.45))
        self.au_mot("d'accord. Un crayon de 15")
        self.play(FadeIn(sol), FadeIn(ma, shift=UP * 0.2), FadeIn(g2, shift=UP * 0.1), run_time=0.4)
        g3 = self.bloc(["serait plus haut", "qu'une maison !"], 32, ROUGE_ERREUR).move_to(P(XD, -2.35))
        self.au_mot("serait plus haut")
        self.play(GrowFromEdge(geant, DOWN), FadeIn(g3[0], shift=UP * 0.1), run_time=0.5)
        self.au_mot("qu'une maison")
        self.play(FadeIn(g3[1], shift=UP * 0.1), Indicate(ma, color=ROUGE_ERREUR, scale_factor=1.05), run_time=0.4)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        fe = feuille(2.6).move_to(P(-4.1, 1.5))
        fo = fourmi(1.4).move_to(fe.get_center() + P(0.15, 0.08)).rotate(0.35)
        dg = doigt(0.8).move_to(P(-1.85, 1.45))

        def autres_q(sc):
            sc.play(FadeIn(fe), FadeIn(fo, scale=0.5), run_time=0.35)

        def apres(sc):
            sc.play(FadeIn(dg, shift=LEFT * 0.2), run_time=0.2)

        self._q_pas = 0.56
        try:
            self.question_gauche("07-question", "07b-reponse",
                                 ["Sarah montre une fourmi", "sur une feuille.", "Combien mesure-t-elle ?"],
                                 [self.choix("5 mm"), self.choix("5 cm"), self.choix("5 m")], 0,
                                 ["Une fourmi est minuscule,", "plus petite que la largeur", "d'un doigt :", "5 mm."],
                                 -0.75, mot_q="Sarah montre", autres_q=autres_q, autres_r=apres)
        finally:
            self._q_pas = None

    # ── 08 : le défi (qui va avec quoi ?) ───────────────────────────────────
    XD4 = (-4.8, -2.0, 0.8, 3.6)
    XB = (-4.4, -2.0, 0.4, 2.8)
    NOMBRES = ("1 m", "8 m", "6 mm", "4 km")

    def quatre(self):
        objs = [coccinelle(1.1), arbre(0.95), baton(1.0), trajet(1.0)]
        for o, x in zip(objs, self.XD4):
            o.move_to(P(x, 1.1))
        objs[0].shift(DOWN * 0.3)
        noms = [["une coccinelle"], ["un arbre"], ["un bâton", "de marche"], ["la balade"]]
        ns = [self.bloc(n, 26, GRAY_B).move_to(P(x, 0)).align_to(P(0, 0.05), UP) for n, x in zip(noms, self.XD4)]
        return objs, ns

    def boite(self, s, couleur=JAUNE_TITRE, audit=False):
        e = self.t(s, 38, couleur)
        if not audit:
            hors_audit(e)
        return VGroup(SurroundingRectangle(e, color=couleur, buff=0.15, corner_radius=0.1), e)

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        l0 = self.t("Associe chaque chose à sa longueur :", 32).move_to(P(0, 2.4))
        self.au_mot("Associe chaque")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        objs, ns = self.quatre()
        for o, n, mot in zip(objs, ns, ("une coccinelle", "un arbre", "un bâton de marche", "la balade")):
            self.au_mot(mot)
            self.play(FadeIn(o, shift=UP * 0.2), FadeIn(n), run_time=0.25)
        bs = []
        for s, x, mot in zip(self.NOMBRES, self.XB, ("longueurs : 1", "mètre, 8", "mètres, 6", "millimètres, 4")):
            e = self.t(s, 38, JAUNE_TITRE)
            b = VGroup(SurroundingRectangle(e, color=JAUNE_TITRE, buff=0.15, corner_radius=0.1), e).move_to(P(x, -1.3))
            bs.append(b)
            self.au_mot(mot)
            self.play(FadeIn(b, shift=UP * 0.15), run_time=0.25)
        self.play(Wiggle(VGroup(*bs)), run_time=0.5)
        self.pause_defi(y=-2.45)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        objs, ns = self.quatre()
        self.add(*objs, *ns)
        bs = [self.boite(s).move_to(P(x, -2.15)) for s, x in zip(self.NOMBRES, self.XB)]
        self.add(*bs)
        # (objet, boîte, mot) dans l'ordre de la voix
        assoc = [(0, 2, "La coccinelle, 6"), (2, 0, "marche, 1"), (1, 1, "L'arbre, 8"), (3, 3, "La balade, 4")]
        for io, ib, mot in assoc:
            cible = self.boite(self.NOMBRES[ib], VERT_OK, audit=True).move_to(P(self.XD4[io], -1.1))
            self.au_mot(mot)
            self.play(FadeOut(bs[ib], target_position=cible.get_center()), FadeIn(cible, scale=1.2),
                      Indicate(objs[io], color=VERT_OK, scale_factor=1.08), run_time=0.45)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        fig = VGroup(doigt(1.0), grand_pas(0.9), horloge(1, 0.6)).arrange(DOWN, buff=0.35)
        fig.scale_to_fit_height(4.6)
        lignes = self.finale_gauche(fig, textes=[
            ("Pour estimer : on compare", "avec des repères."),
            ("le doigt pour le cm,", "le grand pas pour le m,", "la marche pour le km."),
            ("On vérifie toujours", "l'unité !")], fs=32)
        self.add(fig)
        self.au_mot("Pour estimer")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("le doigt pour le centimètre")
        self.montrer_ligne(lignes[1])
        self.au_mot("on vérifie toujours")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_reperes()
        self.ecran_sentier()
        self.ecran_unite()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class LongueurEstimerCM1(LongueurEstimerBase):
    identite = "Maths CM1 — EleveAI"
    ceinture = "jaune"
