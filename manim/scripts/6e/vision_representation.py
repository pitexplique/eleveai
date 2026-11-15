# vision_representation.py
# EleveAI — Maths 6e — série « Volume et solides », épisode S2 : LA PERSPECTIVE CAVALIÈRE
# (micro vision_representation), notion vision_espace.
# Paysage 16:9, CEINTURE VERTE, avec voix (manim/voix/6e-vision-representation.json, validée le 15/11, Julie,
# débit −6). Short jumeau : film Ti Margo (« c'est un carré, ton truc » : les traits en biais, réponse C).
# Métier : Lina, ANIMATRICE 3D (croquis à main levée avant l'ordinateur) ; centres : cinema-series, dessin-manga.
# Mapping micro → écrans : vision_representation → 02 (la face avant en vraie grandeur), 03 (les traits en
# biais : même direction, même longueur, plus courts), 04 (on relie les bouts, 3 arêtes cachées en pointillés),
# 06 (le pavé droit : les parallèles restent parallèles), 07 (piège : seules la face avant et la face arrière
# gardent leur forme), 09 (le patron du cube : 6 carrés) ; questions 05 (arête cachée : en pointillés, rép. A)
# et 08 (combien de vrais carrés : 2 faces, rép. C) ; défi 10 (pavé 4 × 2 carreaux : 4 traits en biais,
# 3 pointillés).
# La perspective SE CONSTRUIT sous les yeux, sur une feuille à carreaux : face avant, fuyantes à 45° réduites
# de moitié (coefficient 0,5, comme le Solide du commun CE2), face arrière, arêtes cachées en pointillés.
# Audit : bash <notes>/outils/dry.sh vision_representation VisionRepresentation6e
# HD : bash <notes>/outils/hd.sh vision_representation VisionRepresentation6e eleveai-maths-6e-vision-representation
#      manim/sorties/6e/maths/vision-espace/02-representation
# Sortie : manim/sorties/6e/maths/vision-espace/02-representation/eleveai-maths-6e-vision-representation.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_6e_commun import *  # noqa: E402,F403

PAPIER = "#f8fafc"
CARREAU = "#cbd5e1"
CRAYON = "#1e3a8a"      # le trait du dessin (bleu nuit, sur la feuille claire)
BIAIS_C = "#ea580c"     # les traits en biais (orange foncé, lisible sur la feuille)
CACHE_C = "#dc2626"     # les arêtes cachées (pointillés rouges)
JUSTE_C = "#16a34a"     # vraie forme (vert)
PENCHE_C = "#f43f5e"    # face penchée (rose-rouge)
HORIZ_C = "#2563eb"
VERTI_C = "#16a34a"


def muet(m):
    """Un texte dont le mot est déjà dit (ou jamais dit, comme un numéro) : ni synchro, ni audit."""
    for f in m.get_family():
        f.sans_synchro = True
    return hors_audit(m)


def feuille(centre, w, h, c=0.5):
    """Une feuille à carreaux. .noeud(i, j) = le croisement de la colonne i et de la ligne j (depuis le bas-gauche)."""
    fond = RoundedRectangle(width=w, height=h, corner_radius=0.12, fill_color=PAPIER, fill_opacity=1,
                            stroke_color="#94a3b8", stroke_width=2).move_to(centre)
    bg = fond.get_corner(DL)
    lignes = VGroup()
    nx, ny = int(w / c + 1e-6), int(h / c + 1e-6)
    for i in range(1, nx):
        lignes.add(Line(bg + RIGHT * i * c + UP * 0.04, bg + RIGHT * i * c + UP * (h - 0.04), color=CARREAU,
                        stroke_width=1.5))
    for j in range(1, ny):
        lignes.add(Line(bg + UP * j * c + RIGHT * 0.04, bg + UP * j * c + RIGHT * (w - 0.04), color=CARREAU,
                        stroke_width=1.5))
    g = VGroup(fond, lignes)
    g.noeud = lambda i, j: bg + RIGHT * i * c + UP * j * c
    return g


def pointilles(a, b, couleur=CACHE_C, sw=5):
    return DashedLine(a, b, color=couleur, stroke_width=sw, dash_length=0.13, dashed_ratio=0.55)


class Croquis:
    """Un pavé (ou un cube) dessiné en perspective cavalière, pièce par pièce, à partir du coin
    bas-gauche O de la face avant : L de long, h de haut, p de profondeur (réelle ; dessinée × 0,5, à 45°).
    Coins : A B C D devant (bas-g, bas-d, haut-d, haut-g), A2 B2 C2 D2 derrière. A2 est le coin caché."""

    def __init__(self, O, L, h, p, couleur=CRAYON, sw=5):
        O = np.array(O, dtype=float)
        d = K_CAV * p * np.array([np.cos(A_CAV), np.sin(A_CAV), 0.0])
        self.A, self.B, self.C, self.D = O, O + RIGHT * L, O + RIGHT * L + UP * h, O + UP * h
        self.A2, self.B2, self.C2, self.D2 = self.A + d, self.B + d, self.C + d, self.D + d
        self.c, self.sw = couleur, sw
        self.face = Polygon(self.A, self.B, self.C, self.D, stroke_color=couleur, stroke_width=sw)
        self.biais = [self.trait(a, b, BIAIS_C) for a, b in self.paires_biais()]  # 0 = depuis A (caché)
        self.fond_vu = VGroup(self.trait(self.B2, self.C2), self.trait(self.C2, self.D2))
        self.fond_cache = [self.trait(self.A2, self.B2), self.trait(self.A2, self.D2)]

    def paires_biais(self):
        return [(self.A, self.A2), (self.B, self.B2), (self.C, self.C2), (self.D, self.D2)]

    def trait(self, a, b, couleur=None):
        return Line(a, b, color=couleur or self.c, stroke_width=self.sw)

    def caches(self, couleur=CACHE_C):
        """Les 3 arêtes cachées en pointillés : le biais depuis A, puis A2B2 et A2D2."""
        return [pointilles(self.A, self.A2, couleur), pointilles(self.A2, self.B2, couleur),
                pointilles(self.A2, self.D2, couleur)]

    def complet(self, biais_couleur=None):
        """Le dessin fini, d'un bloc : face avant, 3 biais vus, fond vu, 3 pointillés."""
        bc = biais_couleur or self.c
        return VGroup(self.face.copy(), *[self.trait(a, b, bc) for a, b in self.paires_biais()[1:]],
                      self.fond_vu.copy(), *self.caches())

    def poly(self, nom, couleur, opacite=0.35):
        pts = {"avant": (self.A, self.B, self.C, self.D), "arriere": (self.A2, self.B2, self.C2, self.D2),
               "dessus": (self.D, self.C, self.C2, self.D2), "droite": (self.B, self.B2, self.C2, self.C),
               "gauche": (self.A, self.D, self.D2, self.A2), "dessous": (self.A, self.B, self.B2, self.A2)}[nom]
        return Polygon(*pts, fill_color=couleur, fill_opacity=opacite, stroke_width=0)


def codes_cotes(pts, couleur=JUSTE_C, long=0.22):
    """Les petits traits « côtés égaux » au milieu de chaque côté, et les angles droits."""
    g = VGroup()
    n = len(pts)
    for i in range(n):
        a, b = pts[i], pts[(i + 1) % n]
        u = (b - a) / np.linalg.norm(b - a)
        v = np.array([-u[1], u[0], 0])
        m = (a + b) / 2
        g.add(Line(m - v * long / 2, m + v * long / 2, color=couleur, stroke_width=5))
    for i in range(n):
        a, b, c = pts[i - 1], pts[i], pts[(i + 1) % n]
        u1 = (a - b) / np.linalg.norm(a - b) * 0.22
        u2 = (c - b) / np.linalg.norm(c - b) * 0.22
        g.add(VMobject(stroke_color=couleur, stroke_width=4).set_points_as_corners([b + u1, b + u1 + u2, b + u2]))
    return g


def main_levee(centre, a=1.2, couleur=CRAYON):
    """Un carré tracé à main levée (un peu tremblé)."""
    rng = np.random.default_rng(7)
    coins = [P(-a / 2, -a / 2), P(a / 2, -a / 2), P(a / 2, a / 2), P(-a / 2, a / 2)]
    pts = []
    for k in range(4):
        p0, p1 = coins[k], coins[(k + 1) % 4]
        for t in np.linspace(0, 1, 5, endpoint=False):
            pts.append(p0 + (p1 - p0) * t + P(*(rng.normal(0, 0.025, 2))))
    pts.append(pts[0])
    return VMobject(stroke_color=couleur, stroke_width=5).set_points_smoothly(pts).move_to(centre)


def ecran_pc(centre=ORIGIN):
    """Un écran d'ordinateur avec un cube en volume dedans."""
    ec = RoundedRectangle(width=2.6, height=1.75, corner_radius=0.1, fill_color="#0f172a", fill_opacity=1,
                          stroke_color="#94a3b8", stroke_width=4)
    pied = VGroup(Rectangle(width=0.25, height=0.3, fill_color="#94a3b8", fill_opacity=1, stroke_width=0)
                  .next_to(ec, DOWN, buff=0),
                  RoundedRectangle(width=1.1, height=0.12, corner_radius=0.05, fill_color="#94a3b8", fill_opacity=1,
                                   stroke_width=0).next_to(ec, DOWN, buff=0.3))
    cu = cube(1.0, e=0.85, centre=ec.get_center(), couleur="#a78bfa", sw=3)
    return VGroup(ec, pied, cu).move_to(centre)


def crayon(s=1.0):
    corps = Rectangle(width=0.16 * s, height=1.0 * s, fill_color="#facc15", fill_opacity=1, stroke_width=0)
    pointe = Triangle(fill_color="#f5d0a9", fill_opacity=1, stroke_width=0).scale(0.1 * s).rotate(PI) \
        .next_to(corps, DOWN, buff=0)
    return VGroup(corps, pointe).rotate(-0.6)


class VisionRepresentationBase(PaysageVolume6e):
    nom_voix = "6e-vision-representation"
    fichier_marques = "vision_representation_marques.json"

    # La grande feuille des écrans 02, 03, 04, 06, 07 et le cube qu'on y construit (côté 4 carreaux).
    def grande_feuille(self):
        return feuille(P(-3.4, 0.0), 5.6, 5.0, 0.5)

    def cube_feuille(self, f):
        return Croquis(f.noeud(2, 2), 2.0, 2.0, 2.0)

    def petite_feuille(self, centre=P(-3.4, 1.0)):
        f = feuille(centre, 4.6, 3.2, 0.4)
        return f, Croquis(f.noeud(2, 1), 1.6, 1.6, 1.6, sw=4)

    def lg(self, s, y, fs=32, couleur=WHITE, x=0.4):
        return gauche(self.t(s, fs, couleur), x, y)

    # ── 00 : la page de garde ───────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("La perspective cavalière", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("La perspective cavalière")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        q = self.bloc(["Comment dessiner un cube", "sur une feuille plate,", "pour qu'on le voie en volume ?"],
                      34, JAUNE_TITRE)
        gauche(q, -6.2, 0.45)
        f = feuille(P(4.3, 0.15), 3.2, 2.6, 0.4)
        cr = Croquis(f.noeud(2, 1), 1.2, 1.2, 1.2, sw=4)
        self.au_mot("Comment dessiner un cube")
        self.play(FadeIn(q[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("sur une feuille plate")
        self.play(FadeIn(q[1], shift=UP * 0.1), FadeIn(f, scale=0.9), Create(cr.face), run_time=0.5)
        self.au_mot("pour qu'on le voie")
        self.play(FadeIn(q[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("en volume")
        dessin = cr.complet(BIAIS_C)
        self.play(LaggedStart(*[Create(m) for m in dessin[1:]], lag_ratio=0.12), run_time=1.0)
        self.attendre_voix(marge=0.6)

    # ── 01 : la situation ───────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        lp = lina(1.0).move_to(P(-5.3, 0.7))
        self.au_mot("Voici Lina")
        nom = self.t("Lina", 40, BLEU_CALCUL).next_to(lp, UP, buff=0.2)
        self.play(FadeIn(lp, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Elle est animatrice 3D")
        met = self.t("animatrice 3D", 28, BLEU_CALCUL).next_to(lp, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        pc = ecran_pc(P(-1.7, 1.55))
        self.au_mot("elle crée des objets en volume")
        lpc = self.t("des objets en volume", 26, "#c4b5fd").next_to(pc, DOWN, buff=0.15)
        self.play(FadeIn(pc, scale=0.8), FadeIn(lpc), run_time=0.45)
        self.play(Rotate(pc[2], angle=0.25, about_point=pc[2].get_center()), run_time=0.4)
        self.play(Rotate(pc[2], angle=-0.25, about_point=pc[2].get_center()), run_time=0.4)
        f = feuille(P(2.6, 1.45), 3.0, 2.2, 0.4)
        cy = crayon(0.9).move_to(f.get_corner(UR) + P(-0.35, -0.6))
        self.au_mot("Mais avant l'ordinateur")
        self.play(FadeIn(f, shift=LEFT * 0.2), FadeIn(cy), run_time=0.4)
        mlv = main_levee(f.get_center() + LEFT * 0.25, 1.1)
        self.au_mot("un croquis à main levée")
        lcr = self.t("un croquis à main levée", 26, JAUNE_TITRE).next_to(f, DOWN, buff=0.15)
        self.play(Create(mlv), FadeIn(lcr), cy.animate.shift(LEFT * 0.4 + DOWN * 0.3), run_time=0.8)
        self.au_mot("sur une feuille plate")
        lpl = self.t("sur une feuille plate.", 26, JAUNE_TITRE).next_to(lcr, DOWN, buff=0.08)
        self.play(FadeIn(lpl, shift=UP * 0.08), Indicate(f[0], color="#e2e8f0", scale_factor=1.03), run_time=0.4)
        self.au_mot("Comment donner de la profondeur")
        q = self.bloc(["Comment donner de la profondeur", "au dessin ?"], 36, JAUNE_TITRE)
        gauche(q, -3.6, -1.85)
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix()

    # ── 02 : la face avant ──────────────────────────────────────────────────
    def ecran_face(self):
        self.ecran("02-face")
        f = self.grande_feuille()
        cr = self.cube_feuille(f)
        self.add(f)
        self.au_mot("On commence par la face avant")
        tit = self.lg("La face avant", 2.9, 40, JAUNE_TITRE)
        vrai = cube(1.0, e=2.0, centre=P(3.0, -1.15))
        self.play(Write(tit), FadeIn(vrai, scale=0.8), run_time=0.5)
        devant = Polygon(*[vrai.pt(i) for i in range(4)], fill_color=JUSTE_C, fill_opacity=0.5,
                         stroke_color=JUSTE_C, stroke_width=6)
        self.play(FadeIn(devant), run_time=0.3)
        self.au_mot("On la dessine en vraie grandeur")
        l1 = self.lg("en vraie grandeur :", 1.8, 34)
        self.play(FadeIn(l1, shift=UP * 0.1), devant.animate.move_to(cr.face.get_center()), run_time=0.6)
        self.play(Create(cr.face), FadeOut(devant), run_time=0.4)
        self.au_mot("pour un cube, un vrai carré")
        l2 = self.lg("pour un cube, un vrai carré.", 1.1, 30, JUSTE_C)
        cc = codes_cotes([cr.A, cr.B, cr.C, cr.D])
        self.play(FadeIn(l2, shift=UP * 0.1), Create(cc), run_time=0.5)
        self.insister(cr.face, 1.06, 0.3)
        self.attendre_voix()

    # ── 03 : les traits en biais ────────────────────────────────────────────
    def ecran_biais(self):
        self.ecran("03-biais")
        f = self.grande_feuille()
        cr = self.cube_feuille(f)
        self.add(f, cr.face)
        self.au_mot("Ensuite, la profondeur")
        tit = self.lg("Ensuite, la profondeur", 2.9, 38, JAUNE_TITRE)
        self.play(Write(tit), run_time=0.45)
        self.au_mot("Depuis chaque coin")
        coins = VGroup(*[Dot(p, radius=0.09, color=BIAIS_C) for p in (cr.A, cr.B, cr.C, cr.D)])
        self.play(LaggedStart(*[FadeIn(c, scale=2) for c in coins], lag_ratio=0.15), run_time=0.45)
        self.au_mot("on trace un trait en biais")
        l1 = self.lg("un trait en biais par coin :", 1.85, 32)
        self.play(FadeIn(l1, shift=UP * 0.1), LaggedStart(*[Create(b) for b in cr.biais], lag_ratio=0.2),
                  run_time=1.0)
        self.au_mot("tous dans la même direction")
        l2 = self.lg("tous dans la même direction,", 1.2, 29, BIAIS_C)
        angle = Arc(radius=0.55, start_angle=0, angle=A_CAV, arc_center=cr.B, color=BIAIS_C, stroke_width=4)
        horiz = DashedLine(cr.B, cr.B + RIGHT * 0.8, color=BIAIS_C, stroke_width=3, dash_length=0.08)
        self.play(FadeIn(l2, shift=UP * 0.1), Create(horiz), Create(angle),
                  *[Indicate(b, color=BIAIS_C, scale_factor=1.0) for b in cr.biais], run_time=0.6)
        self.au_mot("et tous de la même longueur")
        l3 = self.lg("et tous de la même longueur.", 0.55, 29, BIAIS_C)
        ticks = VGroup()
        for a, b in cr.paires_biais():
            m, u = (a + b) / 2, (b - a) / np.linalg.norm(b - a)
            v = np.array([-u[1], u[0], 0])
            ticks.add(VGroup(*[Line(m + u * s - v * 0.11, m + u * s + v * 0.11, color=BIAIS_C, stroke_width=4)
                               for s in (-0.05, 0.05)]))
        self.play(FadeIn(l3, shift=UP * 0.1), LaggedStart(*[Create(t) for t in ticks], lag_ratio=0.15), run_time=0.6)
        self.au_mot("Ces traits sont plus courts")
        l4a = self.lg("Ils sont plus courts", -0.2, 32, ORANGE_RETENUE)
        self.play(FadeIn(l4a, shift=UP * 0.1), run_time=0.3)
        self.au_mot("que la vraie arête")
        l4b = self.lg("que la vraie arête :", -0.75, 32, ORANGE_RETENUE)
        vraie = Line(cr.D, cr.C, color=JUSTE_C, stroke_width=8)
        self.play(FadeIn(l4b, shift=UP * 0.1), Create(vraie), run_time=0.3)
        self.play(Rotate(vraie, angle=A_CAV, about_point=cr.D), run_time=0.6)
        self.au_mot("c'est ce qui donne l'impression de profondeur")
        l5 = self.t("l'impression de profondeur !", 28, VERT_OK)
        gauche(l5, 0.4, -1.45)
        self.play(FadeIn(l5, scale=1.1), FadeOut(vraie), Indicate(cr.biais[3], color=BIAIS_C, scale_factor=1.0),
                  run_time=0.4)
        self.attendre_voix()

    # ── 04 : on relie les bouts, les arêtes cachées ─────────────────────────
    def ecran_cachees(self):
        self.ecran("04-cachees")
        f = self.grande_feuille()
        cr = self.cube_feuille(f)
        self.add(f, cr.face, *cr.biais)
        self.au_mot("Enfin, on relie les bouts")
        tit = self.lg("Enfin, on relie les bouts", 2.9, 38, JAUNE_TITRE)
        self.play(Write(tit), run_time=0.45)
        self.play(LaggedStart(Create(cr.fond_vu[0]), Create(cr.fond_vu[1]), Create(cr.fond_cache[0]),
                              Create(cr.fond_cache[1]), lag_ratio=0.25), run_time=1.0)
        self.au_mot("Les arêtes qu'on ne verrait pas")
        l1 = self.lg("Les arêtes de derrière,", 1.85, 32)
        mur = VGroup(cr.poly("avant", "#93c5fd", 0.45), cr.poly("dessus", "#bfdbfe", 0.45),
                     cr.poly("droite", "#60a5fa", 0.45))
        trio = [cr.biais[0], cr.fond_cache[0], cr.fond_cache[1]]
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(mur), *[t.animate.set_color(CACHE_C) for t in trio],
                  run_time=0.5)
        self.au_mot("se dessinent en pointillés")
        l2 = self.lg("se dessinent en pointillés.", 1.2, 32, CACHE_C)
        pts = cr.caches()
        self.play(FadeIn(l2, shift=UP * 0.1), *[FadeOut(t) for t in trio], *[Create(p) for p in pts],
                  run_time=0.7)
        self.au_mot("Pour un cube")
        l3 = self.ligne([("Pour un cube :", WHITE), ("3 arêtes cachées.", VERT_OK)], 26, buff=0.2)
        gauche(l3, 0.4, 0.2)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.35)
        self.play(LaggedStart(*[Indicate(p, color=CACHE_C, scale_factor=1.15) for p in pts], lag_ratio=0.3),
                  run_time=0.9)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        f, cr = self.petite_feuille()
        vus = VGroup(cr.face, *[cr.trait(a, b) for a, b in cr.paires_biais()[1:]], cr.fond_vu)
        doute = Text("?", font_size=56, color=CACHE_C, weight=BOLD).move_to(cr.A2 + P(0.3, 0.32))
        muet(doute)

        def avant(sc):
            sc.play(FadeIn(f, scale=0.9), FadeIn(vus), FadeIn(doute, scale=1.4), run_time=0.3)

        def apres(sc):
            pts = cr.caches()
            l0 = sc.rep_bas(0, ["Les pointillés disent :"], y0=-1.75, pas=0.6)
            sc.au_mot("Les pointillés disent")
            sc.play(FadeIn(l0, shift=UP * 0.08), FadeOut(doute), *[Create(p) for p in pts], run_time=0.5)
            l1 = sc.rep_bas(1, ["elle est là, mais derrière."], y0=-1.75, pas=0.6)
            sc.au_mot("elle est là")
            sc.play(FadeIn(l1, shift=UP * 0.08), run_time=0.3)
            l2 = sc.rep_bas(2, [("Sans elles, on ne saurait pas où est le fond.", ORANGE_RETENUE)], y0=-1.75,
                            pas=0.6)
            sc.au_mot("Sans elles")
            sc.play(FadeIn(l2, shift=UP * 0.08), run_time=0.3)
            sc.au_mot("où est le fond")
            sc.play(FadeIn(cr.poly("arriere", ORANGE_RETENUE, 0.3)), run_time=0.4)
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse",
                            ["En perspective cavalière,", "comment dessine-t-on", "une arête cachée ?"],
                            [self.choix("en pointillés"), self.choix("en trait épais"),
                             self.choix("on ne la dessine pas")], 0,
                            ["Les pointillés disent :", "elle est là, mais derrière.",
                             "Sans elles, on ne saurait pas où est le fond."],
                            mot_q="En perspective cavalière", autres_r=apres, avant_q=avant)

    # ── 06 : le pavé droit ──────────────────────────────────────────────────
    def ecran_pave(self):
        self.ecran("06-pave")
        f = self.grande_feuille()
        cr = Croquis(f.noeud(1, 2), 3.0, 1.5, 2.0)
        self.add(f)
        self.au_mot("Pour un pavé droit")
        tit = self.lg("Pour un pavé droit", 2.9, 38, JAUNE_TITRE)
        self.play(Write(tit), run_time=0.45)
        self.au_mot("La face avant est un vrai rectangle")
        l1 = self.lg("face avant : un vrai rectangle,", 1.95, 28)
        self.play(FadeIn(l1, shift=UP * 0.1), Create(cr.face), run_time=0.6)
        self.au_mot("Les traits en biais sont parallèles")
        l2 = self.lg("traits en biais : parallèles", 1.35, 28, BIAIS_C)
        self.play(FadeIn(l2, shift=UP * 0.1), LaggedStart(*[Create(b) for b in cr.biais], lag_ratio=0.2),
                  run_time=0.9)
        self.au_mot("et de même longueur")
        l3 = self.lg("et de même longueur.", 0.8, 28, BIAIS_C)
        pts = cr.caches()
        self.play(FadeIn(l3, shift=UP * 0.1), Create(cr.fond_vu), FadeOut(cr.biais[0]),
                  *[Create(p) for p in pts], run_time=0.7)
        self.au_mot("Des arêtes parallèles dans la réalité")
        l4 = self.lg("Parallèles dans la réalité,", 0.0, 32)
        vrai = pave(1.5, 0.75, 1.0, e=1.0, centre=P(1.75, -1.75))
        self.play(FadeIn(l4, shift=UP * 0.1), FadeIn(vrai, scale=0.8), run_time=0.5)
        self.au_mot("restent parallèles sur le dessin")
        l5 = self.lg("parallèles sur le dessin.", -0.65, 32, VERT_OK)
        hz = VGroup(Line(cr.A, cr.B), Line(cr.D, cr.C), Line(cr.D2, cr.C2)).set_stroke(HORIZ_C, 8)
        hz.add(pointilles(cr.A2, cr.B2, HORIZ_C, 7))
        bi = VGroup(*[Line(a, b) for a, b in cr.paires_biais()[1:]]).set_stroke(BIAIS_C, 8)
        bi.add(pointilles(cr.A, cr.A2, BIAIS_C, 7))
        self.play(FadeIn(l5, shift=UP * 0.1), Create(hz), run_time=0.5)
        self.play(Create(bi), run_time=0.5)
        self.attendre_voix()

    # ── 07 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        f = self.grande_feuille()
        cr = self.cube_feuille(f)
        self.add(f, cr.complet())
        self.au_mot("Attention au piège")
        tit = self.lg("Attention au piège !", 2.9, 40, ROUGE_ERREUR)
        self.play(Write(tit), run_time=0.4)
        self.au_mot("toutes les faces ne gardent pas")
        l1 = self.bloc(["Toutes les faces ne gardent pas", "leur vraie forme."], 27)
        gauche(l1, 0.4, 1.85)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        vraies = VGroup(cr.poly("arriere", JUSTE_C, 0.3), cr.poly("avant", JUSTE_C, 0.45))
        self.au_mot("Seules la face avant")
        l2 = self.bloc(["Face avant, face arrière :", "leur vraie forme."], 28, VERT_OK)
        gauche(l2, 0.4, 0.75)
        muet(l2[1])  # « leur vraie forme » : déjà dit (« ne gardent pas leur vraie forme »), posé avec sa 1re ligne
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(vraies[1]), run_time=0.4)
        self.au_mot("et la face arrière")
        self.play(FadeIn(vraies[0]), run_time=0.35)
        self.au_mot("Les faces du côté et du dessus")
        penchees = VGroup(cr.poly("dessus", PENCHE_C, 0.45), cr.poly("droite", PENCHE_C, 0.45))
        l3 = self.lg("Côté et dessus : penchées.", -0.2, 30, PENCHE_C)
        self.play(FadeIn(l3, shift=UP * 0.1), FadeOut(vraies), FadeIn(penchees), run_time=0.45)
        self.au_mot("on ne mesure pas leurs angles")
        l4 = self.bloc(["On ne mesure pas leurs angles", "sur le dessin."], 27, ORANGE_RETENUE)
        gauche(l4, 0.4, -1.2)
        arc = Arc(radius=0.5, start_angle=0, angle=A_CAV, arc_center=cr.D, color=ROUGE_ERREUR, stroke_width=6)
        dr = VMobject(stroke_color=ROUGE_ERREUR, stroke_width=4).set_points_as_corners(
            [cr.D + RIGHT * 0.3, cr.D + RIGHT * 0.3 + UP * 0.3, cr.D + UP * 0.3])
        barre = Line(cr.D + P(0.05, 0.05), cr.D + P(0.55, 0.55), color=ROUGE_ERREUR, stroke_width=5)
        self.play(FadeIn(l4, shift=UP * 0.1), Create(arc), run_time=0.45)
        self.play(Create(dr), Create(barre), run_time=0.4)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        f, cr = self.petite_feuille()
        dessin = cr.complet()

        def avant(sc):
            sc.play(FadeIn(f, scale=0.9), FadeIn(dessin), run_time=0.5)

        def apres(sc):
            l0 = sc.rep_bas(0, ["Face avant et face arrière :"], fs=28, y0=-1.3, pas=0.55)
            sc.au_mot("La face avant et la face arrière")
            sc.play(FadeIn(l0, shift=UP * 0.08), FadeIn(cr.poly("avant", JUSTE_C, 0.45)),
                    FadeIn(cr.poly("arriere", JUSTE_C, 0.3)), run_time=0.4)
            l0b = sc.rep_bas(1, ["face à nous,"], fs=28, y0=-1.3, pas=0.55)
            sc.au_mot("face à nous")
            sc.play(FadeIn(l0b, shift=UP * 0.08), run_time=0.3)
            l1 = sc.rep_bas(2, ["elles restent deux vrais carrés."], fs=28, y0=-1.3, pas=0.55)
            sc.au_mot("elles restent deux vrais carrés")
            sc.play(FadeIn(l1, shift=UP * 0.08), run_time=0.3)
            l2 = sc.rep_bas(3, [("Les quatre autres sont penchées.", ORANGE_RETENUE)], fs=28, y0=-1.3, pas=0.55)
            sc.au_mot("Les quatre autres")
            sc.play(FadeIn(l2, shift=UP * 0.08), *[FadeIn(cr.poly(n, PENCHE_C, 0.3))
                                                   for n in ("dessus", "droite", "gauche", "dessous")],
                    run_time=0.4)
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse",
                            ["Sur le dessin d'un cube", "en perspective cavalière,", "combien de faces sont",
                             "de vrais carrés ?"],
                            [self.choix("6 faces"), self.choix("3 faces"), self.choix("2 faces")], 2,
                            ["Face avant et face arrière :", "face à nous,", "elles restent deux vrais carrés.",
                             "Les quatre autres sont penchées."],
                            mot_q="Sur le dessin d'un cube", autres_r=apres, avant_q=avant)

    # ── 09 : le patron ──────────────────────────────────────────────────────
    def ecran_patron(self):
        self.ecran("09-patron")
        pa = Patron("croix", e=0.6, centre=P(2.7, 0.75))
        pa.tilt = 0.0
        for k in pa.angles:
            pa.angles[k] = 0.0 if k == pa.racine else 90.0
        pa.maj()
        self.au_mot("Et pour fabriquer le solide")
        self.play(FadeIn(pa, scale=0.8), run_time=0.45)
        self.au_mot("on passe au patron")
        tit = self.t("Le patron", 40, JAUNE_TITRE)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.4)
        self.au_mot("on déplie toutes ses faces à plat")
        self.play(pa.plier({k: 0.0 for k in pa.angles}, run_time=1.1))
        self.play(pa.plier(tilt=-90.0, run_time=0.6))
        nums = VGroup(*[Text(str(k + 1), font_size=28, color=CRAYON, weight=BOLD).move_to(pa.centre_carre(n))
                        for k, n in enumerate(["couv", "ar", "g", "fond", "d", "av"])])
        muet(nums)
        self.au_mot("Pour le cube")
        self.play(LaggedStart(*[FadeIn(n, scale=1.4) for n in nums], lag_ratio=0.12), run_time=0.45)
        six = self.t("6 carrés", 34, VERT_OK).next_to(pa, DOWN, buff=0.25)
        self.au_mot("6 carrés")
        self.play(FadeIn(six, scale=1.2), run_time=0.3)
        f, cr = self.petite_feuille(P(-3.9, 0.55))
        dessin = cr.complet()
        VGroup(f, dessin).scale(0.85, about_point=P(-3.9, 0.55))
        self.au_mot("Le dessin en perspective montre le solide")
        l1 = self.t("Le dessin montre le solide,", 28, BLEU_CALCUL).next_to(f, DOWN, buff=0.2)
        self.play(FadeIn(f, scale=0.9), FadeIn(dessin), FadeIn(l1, shift=UP * 0.08), run_time=0.5)
        self.au_mot("le patron permet de le construire")
        l2 = self.bloc(["le patron permet", "de le construire."], 28, VERT_OK).next_to(six, DOWN, buff=0.15)
        self.play(FadeIn(l2, shift=UP * 0.08), Indicate(pa, color=JAUNE_TITRE, scale_factor=1.03), run_time=0.5)
        self.attendre_voix()

    # ── 10 : le défi ────────────────────────────────────────────────────────
    def feuille_defi(self):
        f = feuille(P(-3.9, -0.15), 4.6, 4.6, 0.575)
        cr = Croquis(f.noeud(1, 2), 4 * 0.575, 2 * 0.575, 2 * 0.575)
        return f, cr

    def ecran_defi(self):
        self.ecran("10-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        lp = lina(0.6).move_to(P(5.6, 1.95))
        self.play(Write(tit), FadeIn(lp, shift=UP * 0.2), run_time=0.45)
        f, cr = self.feuille_defi()
        self.au_mot("Lina dessine un pavé droit")
        l0 = self.lg("Lina dessine un pavé droit :", 1.75, 30, BLEU_CALCUL, x=-1.0)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(f, scale=0.9), run_time=0.4)
        self.au_mot("dont la face avant")
        self.play(Create(cr.face), run_time=0.6)
        c4 = Text("4 carreaux", font_size=26, color=CRAYON, weight=BOLD).next_to(Line(cr.A, cr.B), DOWN, buff=0.12)
        c2 = Text("2", font_size=26, color=CRAYON, weight=BOLD).next_to(Line(cr.A, cr.D), LEFT, buff=0.12)
        self.au_mot("4 carreaux de long")
        self.play(FadeIn(c4, shift=UP * 0.08), run_time=0.3)
        self.au_mot("2 de haut")
        self.play(FadeIn(c2, shift=RIGHT * 0.08), run_time=0.3)
        self.au_mot("Combien de traits en biais")
        q1 = self.lg("Combien de traits en biais ?", 0.75, 30, JAUNE_TITRE, x=-1.0)
        coins = VGroup(*[Dot(p, radius=0.08, color=BIAIS_C) for p in (cr.A, cr.B, cr.C, cr.D)])
        self.play(FadeIn(q1, shift=UP * 0.1), FadeIn(coins, scale=1.5), run_time=0.35)
        self.au_mot("Et combien d'arêtes en pointillés")
        q2 = self.lg("Combien d'arêtes en pointillés ?", 0.1, 30, JAUNE_TITRE, x=-1.0)
        self.play(FadeIn(q2, shift=UP * 0.1), run_time=0.35)
        self.au_mot("Mets pause")
        pz = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE).move_to(P(1.6, -1.3))
        self.play(Write(pz), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("10b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        f, cr = self.feuille_defi()
        c4 = muet(Text("4 carreaux", font_size=26, color=CRAYON, weight=BOLD).next_to(Line(cr.A, cr.B), DOWN,
                                                                                      buff=0.12))
        c2 = muet(Text("2", font_size=26, color=CRAYON, weight=BOLD).next_to(Line(cr.A, cr.D), LEFT, buff=0.12))
        self.add(f, cr.face, c4, c2)
        self.play(Write(tit), run_time=0.35)
        self.au_mot("Depuis les 4 coins")
        coins = VGroup(*[Dot(p, radius=0.08, color=BIAIS_C) for p in (cr.A, cr.B, cr.C, cr.D)])
        self.play(LaggedStart(*[FadeIn(c, scale=2) for c in coins], lag_ratio=0.15), run_time=0.45)
        l1 = self.ligne([("4 traits en biais,", BIAIS_C), ("de même longueur.", BIAIS_C)], 28, buff=0.18)
        gauche(l1, -1.0, 1.95)
        muet(l1[0])  # le 4 est déjà dit (« les 4 coins ») : posé à son extrait
        self.au_mot("4 traits en biais")
        self.wait(0.07)
        nb = VGroup(*[muet(Text(str(k + 1), font_size=24, color=BIAIS_C, weight=BOLD)
                           .move_to(b.get_center() + (P(0.2, -0.17) if k == 1 else P(-0.17, 0.17))))
                     for k, b in enumerate(cr.biais)])
        self.play(FadeIn(l1[0], shift=UP * 0.1), LaggedStart(*[Create(b) for b in cr.biais], lag_ratio=0.2),
                  LaggedStart(*[FadeIn(n) for n in nb], lag_ratio=0.2), run_time=0.9)
        self.au_mot("de même longueur")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("On relie les bouts")
        l2 = self.lg("On relie les bouts.", 1.35, 28, x=-1.0)
        self.play(FadeIn(l2, shift=UP * 0.1), Create(cr.fond_vu), Create(cr.fond_cache[0]),
                  Create(cr.fond_cache[1]), run_time=0.7)
        self.au_mot("Le trait en biais du coin en bas à gauche")
        l3 = self.bloc(["Le trait du coin en bas à gauche", "est caché : en pointillés."], 28, CACHE_C)
        gauche(l3, -1.0, 0.5)
        self.play(FadeIn(l3[0], shift=UP * 0.1), cr.biais[0].animate.set_color(CACHE_C).set_stroke(width=8),
                  Flash(cr.A, color=CACHE_C), run_time=0.45)
        self.au_mot("est caché : en pointillés")
        pts = cr.caches()
        self.play(FadeIn(l3[1], shift=UP * 0.1), FadeOut(cr.biais[0]), FadeOut(nb[0]), Create(pts[0]), run_time=0.5)
        self.au_mot("Avec les deux arêtes du fond")
        l4 = self.lg("+ les deux arêtes du fond :", -0.4, 28, CACHE_C, x=-1.0)
        self.play(FadeIn(l4, shift=UP * 0.1), *[t.animate.set_color(CACHE_C).set_stroke(width=8)
                                                 for t in cr.fond_cache], run_time=0.45)
        self.play(*[FadeOut(t) for t in cr.fond_cache], Create(pts[1]), Create(pts[2]), run_time=0.5)
        self.au_mot("cela fait 3 arêtes en pointillés")
        l5 = self.lg("3 arêtes en pointillés.", -1.15, 36, VERT_OK, x=-1.0)
        self.play(FadeIn(l5, scale=1.1), run_time=0.35)
        self.play(LaggedStart(*[Indicate(p, color=CACHE_C, scale_factor=1.15) for p in pts], lag_ratio=0.3),
                  run_time=0.9)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("11-finale", 0.65)
        f, cr = self.petite_feuille(ORIGIN)
        fig = VGroup(f, cr.complet(BIAIS_C)).scale(0.75)
        lignes = self.finale_gauche(fig, textes=[
            ("En perspective cavalière, la face", "avant est en vraie grandeur."),
            ("Les traits en biais sont parallèles", "et de même longueur."),
            ("Les arêtes cachées sont en pointillés.",),
            ("Le patron déplie le solide à plat.",)], fs=28, x_fig=-4.6, xl=-1.9)
        for m in lignes.get_family():
            m.sans_synchro = True
        hors_audit(lignes)
        self.add(fig)
        self.au_mot("En perspective cavalière")
        self.montrer_ligne(lignes[0])
        self.au_mot("Les traits en biais sont parallèles")
        self.montrer_ligne(lignes[1])
        self.au_mot("Les arêtes cachées")
        self.montrer_ligne(lignes[2])
        self.au_mot("Et le patron déplie")
        self.montrer_ligne(lignes[3])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_face()
        self.ecran_biais()
        self.ecran_cachees()
        self.ecran_question1()
        self.ecran_pave()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_patron()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")


class VisionRepresentation6e(VisionRepresentationBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
