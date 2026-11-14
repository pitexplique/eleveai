# aire_unites.py
# EleveAI — Maths CM2 — série « Aire », épisode 02 : LES UNITÉS D'AIRE (cm², dm², m², km²)
# (micro aire_unites, notion aire), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : le tapis de 4 cm² livré au lieu de 4 m² (réponse B).
# Décor et métier : Tom, IMPRIMEUR (timbre 6 cm², affiche 20 dm², bâche 12 m² ; La Réunion ≈ 2 500 km² ;
# centres : art-design, photo).
# Exemples du coach (aires-unites.bank.ts) : carré-unité de 1 cm / 10 cm / 1 m de côté ; unité adaptée
# à la taille de l'objet ; l'unité de l'aire suit l'unité des côtés.
# Mapping micro → écrans : 02 (le cm² : un ongle, le timbre), 03 (le dm² : une main, l'affiche),
# 04 (le m² : sous une table, la bâche ; le km² : l'île), 06 (piège : m ≠ m²),
# questions 05 (salle de classe : C) et 07 (timbre : A), défi 08 (carte, poster, banderole).
# Les carrés-unités sont à l'échelle entre eux quand ils sont côte à côte : le cm² dans le coin du dm²,
# le dm² dans le coin du m² (côté × 10 à chaque fois).
# Voix : manim/voix/cm2-aire-unites.json (validée le 14/11, Julie, débit −6) ;
# marques : aire_unites_marques.json (⛔ ne pas relancer aire_marques_cm2.py).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm2/aire_unites.py AireUnitesCM2
# python -m manim render -qh --disable_caching manim/scripts/cm2/aire_unites.py AireUnitesCM2 -o eleveai-maths-cm2-aire-unites --media_dir manim/scripts/cm2/media-aire-02
# Sortie : manim/sorties/cm2/maths/aire/02-unites/eleveai-maths-cm2-aire-unites.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from aire_cm2_commun import *  # noqa: E402,F403

CM_C, CM_B = CARREAU, CARREAU_B        # le cm² : bleu ciel
DM_C, DM_B = "#fbbf24", "#78350f"      # le dm² : ambre
M_C, M_B = "#a78bfa", "#4c1d95"        # le m² : violet
PEAU, PEAU_B = "#e0ac69", "#92400e"
ONGLE = "#fde2e4"


# ── les dessins ─────────────────────────────────────────────────────────────
def grille(w, h, n_col, n_rang, couleur="#0f172a", sw=2.5, opac=0.85):
    """Les traits qui coupent un rectangle w × h en n_col × n_rang carrés (à poser sur l'objet)."""
    g = VGroup()
    for i in range(1, n_col):
        x = -w / 2 + i * w / n_col
        g.add(Line(P(x, -h / 2), P(x, h / 2), stroke_color=couleur, stroke_width=sw, stroke_opacity=opac))
    for j in range(1, n_rang):
        y = -h / 2 + j * h / n_rang
        g.add(Line(P(-w / 2, y), P(w / 2, y), stroke_color=couleur, stroke_width=sw, stroke_opacity=opac))
    return g


def cases_de(obj, n_col, n_rang):
    """Les carrés (invisibles) d'un objet, rangée par rangée, pour les numéros."""
    w, h = obj.fond.width, obj.fond.height
    c0 = obj.fond.get_corner(UL)
    return VGroup(*[Square(w / n_col, stroke_width=0, fill_opacity=0)
                    .move_to(c0 + P((i + 0.5) * w / n_col, -(j + 0.5) * h / n_rang))
                    for j in range(n_rang) for i in range(n_col)])


def timbre(w, h):
    """Un timbre : fond crème, bords dentelés (des demi-ronds), un petit paysage dedans."""
    fond = Rectangle(width=w, height=h, fill_color="#fef3c7", fill_opacity=1, stroke_color="#fef3c7",
                     stroke_width=2)
    bg = config.background_color
    r = min(w, h) * 0.045
    dents = VGroup()
    for k in range(int(w / (3.2 * r)) + 1):
        x = -w / 2 + (k + 0.5) * w / (int(w / (3.2 * r)) + 1)
        dents.add(Dot(P(x, h / 2), radius=r, color=bg), Dot(P(x, -h / 2), radius=r, color=bg))
    for k in range(int(h / (3.2 * r)) + 1):
        y = -h / 2 + (k + 0.5) * h / (int(h / (3.2 * r)) + 1)
        dents.add(Dot(P(-w / 2, y), radius=r, color=bg), Dot(P(w / 2, y), radius=r, color=bg))
    cadre = Rectangle(width=w * 0.8, height=h * 0.74, fill_color="#bae6fd", fill_opacity=1, stroke_width=0)
    mont = Polygon(cadre.get_corner(DL), cadre.get_bottom() + P(-w * 0.08, h * 0.42), cadre.get_corner(DR),
                   fill_color="#15803d", fill_opacity=1, stroke_width=0)
    soleil = Dot(cadre.get_corner(UR) + P(-w * 0.16, -h * 0.16), radius=min(w, h) * 0.09, color="#f59e0b")
    g = VGroup(fond, cadre, mont, soleil, dents)
    g.fond = fond
    return g


def affiche(w, h):
    """Une affiche : fond rose, un grand rond, deux bandes (le titre, le texte)."""
    fond = Rectangle(width=w, height=h, fill_color="#f9a8d4", fill_opacity=1, stroke_color="#831843",
                     stroke_width=3)
    rond = Circle(radius=min(w, h) * 0.24, fill_color="#7c3aed", fill_opacity=1, stroke_width=0) \
        .move_to(fond.get_center() + UP * h * 0.12)
    b1 = Rectangle(width=w * 0.7, height=h * 0.08, fill_color="#831843", fill_opacity=1, stroke_width=0) \
        .move_to(fond.get_center() + DOWN * h * 0.25)
    b2 = Rectangle(width=w * 0.5, height=h * 0.06, fill_color="#be185d", fill_opacity=1, stroke_width=0) \
        .move_to(fond.get_center() + DOWN * h * 0.38)
    g = VGroup(fond, rond, b1, b2)
    g.fond = fond
    return g


def bache(w, h, couleur="#e11d48", bord="#881337"):
    """Une bâche : grande toile, bandes blanches, œillets gris aux coins et aux milieux."""
    fond = Rectangle(width=w, height=h, fill_color=couleur, fill_opacity=1, stroke_color=bord, stroke_width=3)
    bandes = VGroup(*[Rectangle(width=w * 0.8, height=h * 0.07, fill_color=WHITE, fill_opacity=0.85,
                                stroke_width=0).move_to(fond.get_center() + UP * h * dy) for dy in (0.12, -0.12)])
    oeil = VGroup(*[Circle(radius=min(w, h) * 0.045, stroke_color="#e5e7eb", stroke_width=3)
                    .move_to(fond.get_center() + P(dx * (w / 2 - min(w, h) * 0.09), dy * (h / 2 - min(w, h) * 0.09)))
                    for dx in (-1, 0, 1) for dy in (-1, 1)])
    g = VGroup(fond, bandes, oeil)
    g.fond = fond
    return g


def carte_jeu(w, h):
    """Une carte (8 cm sur 5) : fond blanc, un cœur stylisé (un rond rouge)."""
    fond = RoundedRectangle(width=w, height=h, corner_radius=min(w, h) * 0.08, fill_color="#f8fafc",
                            fill_opacity=1, stroke_color="#64748b", stroke_width=3)
    rond = Circle(radius=min(w, h) * 0.22, fill_color="#ef4444", fill_opacity=1, stroke_width=0).move_to(fond)
    g = VGroup(fond, rond)
    g.fond = fond
    return g


def doigt(s=1.0):
    """Le bout d'un doigt vu de dessus, avec son ongle (l'ongle ≈ 1 cm²)."""
    d = RoundedRectangle(width=1.5 * s, height=2.3 * s, corner_radius=0.7 * s, fill_color=PEAU, fill_opacity=1,
                         stroke_color=PEAU_B, stroke_width=3)
    o = RoundedRectangle(width=1.05 * s, height=1.1 * s, corner_radius=0.42 * s, fill_color=ONGLE, fill_opacity=1,
                         stroke_color="#f9a8d4", stroke_width=2.5).move_to(d.get_top() + DOWN * 0.78 * s)
    return VGroup(d, o)


def main_ouverte(s=1.0):
    """Une main ouverte (paume, quatre doigts, pouce) : à peu près 1 dm²."""
    paume = RoundedRectangle(width=1.35 * s, height=1.25 * s, corner_radius=0.35 * s, fill_color=PEAU,
                             fill_opacity=1, stroke_color=PEAU_B, stroke_width=3)
    doigts = VGroup()
    for k, hh in enumerate((0.78, 0.92, 0.88, 0.7)):
        f = RoundedRectangle(width=0.28 * s, height=hh * s, corner_radius=0.13 * s, fill_color=PEAU,
                             fill_opacity=1, stroke_color=PEAU_B, stroke_width=3)
        f.move_to(paume.get_top() + P((-0.5 + k / 3) * 1.0 * s, hh * s / 2 - 0.12 * s))
        doigts.add(f)
    pouce = RoundedRectangle(width=0.3 * s, height=0.75 * s, corner_radius=0.14 * s, fill_color=PEAU,
                             fill_opacity=1, stroke_color=PEAU_B, stroke_width=3)
    pouce.rotate(0.75).move_to(paume.get_left() + P(-0.12 * s, 0.05 * s))
    return VGroup(pouce, doigts, paume)


def table_dessus(c):
    """Une table vue de dessus, posée sur le carré de côté c : plateau transparent, quatre pieds."""
    plateau = RoundedRectangle(width=c * 1.12, height=c * 1.12, corner_radius=0.12, fill_color="#92400e",
                               fill_opacity=0.28, stroke_color="#b45309", stroke_width=6)
    pieds = VGroup(*[Square(0.16, fill_color="#78350f", fill_opacity=1, stroke_width=0)
                     .move_to(P(dx * c * 0.47, dy * c * 0.47)) for dx in (-1, 1) for dy in (-1, 1)])
    return VGroup(plateau, pieds)


def ile(s=1.0):
    """La Réunion, stylisée (sans prétention de précision) : une île ovale penchée, deux sommets."""
    pts = [P(-1.3, 0.35), P(-0.9, 0.85), P(-0.2, 1.0), P(0.5, 0.75), P(1.15, 0.3), P(1.35, -0.3),
           P(1.0, -0.8), P(0.25, -1.0), P(-0.55, -0.8), P(-1.15, -0.35)]
    terre = VMobject(fill_color="#16a34a", fill_opacity=1, stroke_color="#14532d", stroke_width=4)
    terre.set_points_smoothly([*pts, pts[0]])
    terre.scale(s)
    piton1 = Polygon(P(-0.75, 0.05), P(-0.4, 0.62), P(-0.05, 0.05), fill_color="#a16207", fill_opacity=1,
                     stroke_width=0).scale(s, about_point=ORIGIN)
    piton2 = Polygon(P(0.25, -0.45), P(0.62, 0.1), P(0.99, -0.45), fill_color="#78350f", fill_opacity=1,
                     stroke_width=0).scale(s, about_point=ORIGIN)
    lave = Dot(P(0.62, 0.06) * s, radius=0.07 * s, color="#ef4444")
    return VGroup(terre, piton1, piton2, lave)


def estomper(obj, op=0.25):
    """Les dessins d'un objet (sauf son fond) pâlissent : les numéros des carrés se lisent."""
    return [m.animate.set_opacity(op) for m in obj.submobjects if m is not obj.fond]


def cote_txt(s, mob, sens, fs=26, couleur=JAUNE_TITRE, buff=0.14):
    """Une cote (« 3 cm ») contre un côté, hors audit (elle est posée au mot)."""
    return hors_audit(Text(s, font_size=fs, color=couleur, weight=BOLD).next_to(mob, sens, buff=buff))


def carre_u(c, couleur, bord, sw=3):
    return Square(c, fill_color=couleur, fill_opacity=1, stroke_color=bord, stroke_width=sw)


class AireUnitesBase(PaysageAireCM2G):
    nom_voix = "cm2-aire-unites"
    fichier_marques = "aire_unites_marques.json"
    ceinture = "verte"

    def vers_case(self, u, obj, n_col, n_rang, couleur, bord):
        """Le carré-unité rétrécit et se pose dans le coin de l'objet ; puis la grille."""
        w, h = obj.fond.width, obj.fond.height
        cible = carre_u(w / n_col, couleur, bord, 2.5).move_to(obj.fond.get_corner(UL) + P(w / n_col / 2, -h / n_rang / 2))
        return cible

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Les unités d'aire", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Les unités")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Centimètre carré,", "décimètre carré,", "mètre carré :", "laquelle choisir ?"], 36)
        q.move_to(P(0, 0.25)).align_to(P(-6.2, 0), LEFT)
        q[3].set_color(JAUNE_TITRE)
        cs = VGroup(carre_u(0.4, CM_C, CM_B), carre_u(0.95, DM_C, DM_B), carre_u(1.7, M_C, M_B))
        cs.arrange(RIGHT, buff=0.45, aligned_edge=DOWN).move_to(P(2.6, 0.35))
        noms = VGroup(*[Text(s, font_size=28, color=c, weight=BOLD).next_to(x, DOWN, buff=0.15)
                        for s, c, x in zip(("cm²", "dm²", "m²"), (CM_C, DM_C, M_C), cs)])
        for k, mot in enumerate(("Centimètre", "décimètre", "mètre carré :")):
            self.au_mot(mot)
            self.play(FadeIn(q[k], shift=UP * 0.15), FadeIn(cs[k], scale=0.5), FadeIn(noms[k]), run_time=0.4)
        self.au_mot("laquelle")
        self.play(FadeIn(q[3], shift=UP * 0.15), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 01 : Tom, imprimeur ─────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        to = tom(1.0).move_to(P(-5.3, 0.6))
        self.au_mot("Voici Tom")
        nom = self.t("Tom", 42, BLEU_CALCUL).next_to(to, UP, buff=0.2)
        self.play(FadeIn(to, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("imprimeur")
        met = self.t("imprimeur", 32, BLEU_CALCUL).next_to(to, DOWN, buff=0.18)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        ti = timbre(0.6, 0.72).move_to(P(-2.75, 0.55))
        af = affiche(1.3, 1.75).move_to(P(-1.2, 0.55))
        ba = bache(3.6, 1.9).move_to(P(2.55, 0.55))
        noms = [Text(s, font_size=24, color=GRAY_B).next_to(o, DOWN, buff=0.15)
                for s, o in (("timbre", ti), ("affiche", af), ("bâche", ba))]
        self.au_mot("des timbres")
        self.play(FadeIn(ti, scale=0.5), FadeIn(noms[0]), run_time=0.4)
        self.au_mot("des affiches")
        self.play(FadeIn(af, scale=0.6), FadeIn(noms[1]), run_time=0.4)
        self.au_mot("des bâches")
        self.play(FadeIn(ba, scale=0.7), FadeIn(noms[2]), run_time=0.45)
        self.au_mot("Pour chaque")
        l1 = self.t("Pour chaque commande, il note l'aire.", 34).move_to(P(-0.4, -1.75))
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.4)
        self.au_mot("Mais avec")
        q = self.t("Avec quelle unité ?", 44, JAUNE_TITRE).move_to(P(-0.4, -2.7))
        self.play(FadeIn(q, shift=UP * 0.15), Wiggle(VGroup(ti, af, ba)), run_time=0.6)
        self.attendre_voix()

    # ── 02 : le centimètre carré ────────────────────────────────────────────
    def ecran_cm2(self):
        self.ecran("02-cm2")
        u = carre_u(1.05, CM_C, CM_B).move_to(P(-4.6, 1.75))
        d = doigt(1.0).move_to(P(-2.4, 1.55))
        self.au_mot("Le centimètre carré")
        l0 = self.t("Le centimètre carré", 40, CM_C)
        self.col(l0, 2.75)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(u, scale=0.4), run_time=0.45)
        l1 = self.ligne([("un carré de", WHITE), ("1 cm", CM_C), ("de côté", WHITE)], 34, buff=0.17)
        self.col(l1, 2.0)
        c1, c2 = cote_txt("1 cm", u, DOWN), cote_txt("1 cm", u, LEFT)
        ag = self.t("(agrandi)", 22, GRAY_B).next_to(c1, DOWN, buff=0.08)
        self.au_mot("d'un carré")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("1 centimètre")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(c1), FadeIn(c2), run_time=0.3)
        self.au_mot("de côté")
        self.play(FadeIn(l1[2], shift=UP * 0.1), FadeIn(ag), run_time=0.3)
        self.au_mot("à peu près")
        l2 = self.t("à peu près un ongle", 34, GRAY_B)
        self.col(l2, 1.3)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(d, shift=LEFT * 0.3), run_time=0.45)
        self.play(Indicate(d[1], color=CM_C, scale_factor=1.1), run_time=0.45)
        ti = timbre(2.4, 1.6).move_to(P(-3.7, -1.35))
        self.au_mot("Un timbre")
        l3 = self.ligne([("Un timbre :", DM_C), ("3 cm sur 2 cm", WHITE)], 36)
        self.col(l3, 0.25)
        self.play(FadeIn(ti, scale=0.6), FadeIn(l3[0], shift=UP * 0.1), run_time=0.4)
        k3, k2 = cote_txt("3 cm", ti, UP), cote_txt("2 cm", ti, LEFT)
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.add(k3, k2)
        self.au_mot("contient")
        cible = self.vers_case(u, ti, 3, 2, CM_C, CM_B)
        gr = grille(2.4, 1.6, 3, 2, CM_B, 3)
        gr.move_to(ti.fond)
        self.play(ReplacementTransform(u.copy(), cible), Create(gr), *estomper(ti), run_time=0.6)
        self.play(FadeIn(numeros(cases_de(ti, 3, 2), 26, "#0f172a")), run_time=0.4)
        self.au_mot("6 centimètres")
        res = self.gros("6 cm²", fs=48)
        self.col(res, -0.85)
        self.play(FadeIn(res, scale=1.2), Indicate(ti, color=VERT_OK, scale_factor=1.04), run_time=0.5)
        self.attendre_voix()

    # ── 03 : le décimètre carré ─────────────────────────────────────────────
    def ecran_dm2(self):
        self.ecran("03-dm2")
        u = carre_u(2.0, DM_C, DM_B).move_to(P(-4.4, 1.75))
        petit = carre_u(0.2, CM_C, CM_B, 1.5).move_to(u.get_corner(DL) + P(0.1, 0.1))
        nc = Text("cm²", font_size=24, color="#0c4a6e", weight=BOLD).next_to(petit, RIGHT, buff=0.1)
        self.au_mot("Le décimètre carré")
        l0 = self.t("Le décimètre carré", 40, DM_C)
        self.col(l0, 2.75)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(u, scale=0.4), run_time=0.45)
        self.play(FadeIn(petit, scale=2), FadeIn(nc), run_time=0.3)
        l1 = self.ligne([("un carré de", WHITE), ("1 dm", DM_C), ("de côté,", WHITE)], 31, buff=0.15)
        self.col(l1, 2.0)
        self.au_mot("un carré de")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("1 décimètre")
        c1 = cote_txt("1 dm", u, LEFT)
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(c1), run_time=0.3)
        self.au_mot("de côté")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        # la règle : 10 graduations sous le carré
        b = u.get_bottom()[1] - 0.12
        regle = VGroup(Line(P(u.get_left()[0], b), P(u.get_right()[0], b), stroke_color=WHITE, stroke_width=3),
                       *[Line(P(u.get_left()[0] + k * 0.2, b), P(u.get_left()[0] + k * 0.2, b - (0.16 if k % 5 == 0 else 0.09)),
                              stroke_color=WHITE, stroke_width=2.5) for k in range(11)])
        c10 = cote_txt("10 cm", regle, DOWN, buff=0.08)
        l2 = self.t("soit 10 cm", 34, CM_C)
        self.col(l2, 1.4)
        self.au_mot("10 centimètres")
        self.play(FadeIn(l2, shift=UP * 0.1), Create(regle), FadeIn(c10), run_time=0.45)
        ma = main_ouverte(1.0).move_to(P(-1.95, 1.65))
        self.au_mot("à peu près")
        l3 = self.bloc(["à peu près", "une main ouverte"], 34, GRAY_B)
        self.col(l3, 0.5)
        self.play(FadeIn(l3, shift=UP * 0.1), FadeIn(ma, shift=LEFT * 0.3), run_time=0.45)
        af = affiche(2.5, 2.0).move_to(P(-3.6, -1.85))
        self.au_mot("Une affiche")
        l4 = self.ligne([("Une affiche :", "#f9a8d4"), ("5 dm sur 4 dm", WHITE)], 33)
        self.col(l4, -0.45)
        self.play(FadeIn(af, scale=0.6), FadeIn(l4[0], shift=UP * 0.1), run_time=0.4)
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.3)
        self.add(cote_txt("5 dm", af, UP, buff=0.1), cote_txt("4 dm", af, LEFT))
        cible = self.vers_case(u, af, 5, 4, DM_C, DM_B)
        gr = grille(2.5, 2.0, 5, 4, "#831843", 3).move_to(af.fond)
        self.play(ReplacementTransform(u.copy(), cible), Create(gr), *estomper(af), run_time=0.6)
        self.au_mot("20 décimètres")
        res = self.gros("20 dm²", fs=46)
        self.col(res, -1.4)
        self.play(FadeIn(res, scale=1.2), FadeIn(numeros(cases_de(af, 5, 4), 20, "#0f172a")), run_time=0.5)
        self.attendre_voix()

    # ── 04 : le mètre carré, puis le kilomètre carré ────────────────────────
    def ecran_m2(self):
        self.ecran("04-m2")
        u = carre_u(2.3, M_C, M_B).move_to(P(-4.25, 1.45))
        petit = carre_u(0.23, DM_C, DM_B, 1.5).move_to(u.get_corner(DL) + P(0.115, 0.115))
        nd = Text("dm²", font_size=24, color="#1e1b4b", weight=BOLD).next_to(petit, RIGHT, buff=0.1)
        self.au_mot("Le mètre carré")
        l0 = self.t("Le mètre carré", 40, M_C)
        self.col(l0, 2.75)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(u, scale=0.4), run_time=0.45)
        self.play(FadeIn(petit, scale=2), FadeIn(nd), run_time=0.3)
        l1 = self.ligne([("un carré de", WHITE), ("1 m", M_C), ("de côté", WHITE)], 34, buff=0.17)
        self.col(l1, 2.0)
        self.au_mot("un carré de")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("1 mètre")
        c1, c2 = cote_txt("1 m", u, UP, buff=0.32), cote_txt("1 m", u, LEFT, buff=0.32)
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(c1), FadeIn(c2), run_time=0.3)
        self.au_mot("de côté")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        ta = table_dessus(2.3).move_to(u)
        self.au_mot("il tient")
        l2 = self.t("il tient sous une table", 34, GRAY_B)
        self.col(l2, 1.3)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(ta, scale=1.15), run_time=0.5)
        ba = bache(2.4, 1.8).move_to(P(-1.9, -1.55))
        self.au_mot("Une bâche")
        l3 = self.ligne([("Une bâche :", "#fb7185"), ("4 m sur 3 m", WHITE)], 36)
        self.col(l3, 0.25)
        self.play(FadeIn(ba, scale=0.6), FadeIn(l3[0], shift=UP * 0.1), run_time=0.4)
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        k4, k3 = cote_txt("4 m", ba, UP, buff=0.1), cote_txt("3 m", ba, LEFT)
        self.add(k4, k3)
        cible = self.vers_case(u, ba, 4, 3, M_C, M_B)
        gr = grille(2.4, 1.8, 4, 3, WHITE, 3).move_to(ba.fond)
        self.play(ReplacementTransform(u.copy(), cible), Create(gr), *estomper(ba), run_time=0.5)
        self.au_mot("12 mètres")
        res = self.gros("12 m²", fs=44)
        self.col(res, -0.75)
        self.play(FadeIn(res, scale=1.2), FadeIn(numeros(cases_de(ba, 4, 3), 22, WHITE)), run_time=0.45)
        # le kilomètre carré : on vide, l'île
        self.au_mot("Et pour une île")
        self.play(*[FadeOut(m) for m in self.mobjects if not type(m).__name__.startswith("Mascotte")],
                  run_time=0.35)
        mer = RoundedRectangle(width=5.0, height=3.9, corner_radius=0.3, fill_color="#0c4a6e", fill_opacity=1,
                               stroke_color="#7dd3fc", stroke_width=3).move_to(P(-3.5, 0.6))
        il = ile(1.3).move_to(mer)
        l4 = self.pile([("Pour une île :", WHITE), ("le kilomètre carré (km²)", "#4ade80")], 36)
        self.col(l4, 2.3)
        self.play(FadeIn(mer), FadeIn(il, scale=0.6), FadeIn(l4[0], shift=UP * 0.1), run_time=0.5)
        self.au_mot("le kilomètre")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.35)
        self.au_mot("La Réunion")
        nr = self.t("La Réunion", 32, WHITE).next_to(mer, DOWN, buff=0.18)
        l5 = self.t("La Réunion fait environ", 34)
        self.col(l5, 0.7)
        self.play(FadeIn(nr), FadeIn(l5, shift=UP * 0.1), Indicate(il, color="#4ade80", scale_factor=1.05),
                  run_time=0.5)
        self.au_mot("2 500")
        res2 = m2("2 500 km²", 50, VERT_OK)
        res2 = VGroup(SurroundingRectangle(res2, color=VERT_OK, buff=0.2, corner_radius=0.12, stroke_width=5), res2)
        self.col(res2, -0.35)
        self.play(FadeIn(res2, scale=1.2), run_time=0.45)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def salle(self):
        """Une salle de classe vue de dessus (8 m sur 7 m environ), le tableau, les tables."""
        k = 0.34
        sol = Rectangle(width=8 * k, height=7 * k, fill_color="#cbd5e1", fill_opacity=1, stroke_color="#475569",
                        stroke_width=5)
        tab = Rectangle(width=4 * k, height=0.14, fill_color="#166534", fill_opacity=1, stroke_width=0) \
            .move_to(sol.get_top() + DOWN * 0.12)
        bureau = Rectangle(width=1.6 * k, height=0.8 * k, fill_color="#92400e", fill_opacity=1, stroke_width=0) \
            .move_to(sol.get_top() + DOWN * 1.3 * k)
        tables = VGroup(*[Rectangle(width=1.3 * k, height=0.6 * k, fill_color="#b45309", fill_opacity=1,
                                    stroke_width=0).move_to(sol.get_center() + P(dx * 2.4 * k, dy * 1.4 * k))
                          for dx in (-1, 0, 1) for dy in (0.15, -0.95, -2.05)])
        g = VGroup(sol, tab, bureau, tables)
        g.sol, g.k = sol, k
        return g

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        s = self.salle().move_to(P(-3.6, 1.75))
        nom = Text("une salle de classe (vue de dessus)", font_size=22, color=GRAY_B).next_to(s, DOWN, buff=0.12)
        hors_audit(nom)

        def avant_q(sc):
            sc.play(FadeIn(s, scale=0.8), FadeIn(nom), run_time=0.4)

        def apres(sc):
            gr = grille(s.sol.width, s.sol.height, 8, 7, M_B, 2.5).move_to(s.sol)
            u = carre_u(s.k, M_C, M_B, 2).move_to(s.sol.get_corner(DL) + P(s.k / 2, s.k / 2))
            sc.play(Create(gr), FadeIn(u, scale=2), run_time=0.45)

        self.question_gauche("05-question", "05b-reponse",
                             ["Quelle unité choisir pour", "l'aire d'une salle de classe ?"],
                             [self.choix("le centimètre carré"), self.choix("le décimètre carré"),
                              self.choix("le mètre carré")], 2,
                             ["Une salle de classe,", "c'est grand :", "environ 60 m².", "En cm², le nombre",
                              "serait énorme."],
                             -0.05, couper={2: ("environ", "60 m².")}, mot_q="Quelle unité", avant_q=avant_q,
                             autres_r=apres)

    # ── 06 : le piège (m ≠ m²) ──────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        a = 2.3
        x0 = -5.35
        trait = VGroup(Line(P(x0, 1.55), P(x0 + a, 1.55), stroke_color=ORANGE_RETENUE, stroke_width=10),
                       Line(P(x0, 1.35), P(x0, 1.75), stroke_color=ORANGE_RETENUE, stroke_width=6),
                       Line(P(x0 + a, 1.35), P(x0 + a, 1.75), stroke_color=ORANGE_RETENUE, stroke_width=6))
        ct = m2("1 m", 30, ORANGE_RETENUE).next_to(trait, UP, buff=0.12)
        ca = carre_u(a, M_C, M_B, 4).move_to(P(x0 + a / 2, -1.0))
        cc1, cc2 = cote_txt("1 m", ca, DOWN), cote_txt("1 m", ca, LEFT)
        cm = m2("1 m²", 40, "#1e1b4b").move_to(ca)
        self.au_mot("Un mètre carré")
        l1 = self.bloc(["Un mètre carré,", "ce n'est pas un mètre !"], 34, ROUGE_ERREUR)
        self.col(l1, 2.3)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.45)
        l2 = self.pile([("Le mètre : une longueur,", ORANGE_RETENUE), ("un trait.", WHITE)], 34)
        self.col(l2, 1.1)
        self.au_mot("Le mètre mesure")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("un trait")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Create(trait), FadeIn(ct), run_time=0.45)
        l3 = self.pile([("Le mètre carré :", M_C), ("une surface,", M_C), ("un carré entier.", WHITE)], 34)
        self.col(l3, -0.4)
        self.au_mot("Le mètre carré mesure")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("une surface")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("un carré entier")
        self.play(FadeIn(l3[2], shift=UP * 0.1), DrawBorderThenFill(ca), run_time=0.6)
        self.au_mot("de 1 mètre")
        self.play(FadeIn(cc1), FadeIn(cc2), FadeIn(cm), run_time=0.35)
        self.au_mot("On l'écrit")
        l4 = self.t("On l'écrit :", 34)
        gm = Text("m", font_size=96, color=M_C, weight=BOLD)
        deux = Text("2", font_size=52, color=JAUNE_TITRE, weight=BOLD)
        ecrit = VGroup(l4, gm).arrange(RIGHT, buff=0.35, aligned_edge=DOWN)
        self.col(ecrit, -1.7)
        deux.next_to(gm, UR, buff=0.02).shift(DOWN * 0.3)
        self.play(FadeIn(l4, shift=UP * 0.1), FadeIn(gm, scale=1.2), run_time=0.4)
        self.au_mot("2 en haut")
        self.play(FadeIn(deux, scale=1.6), run_time=0.3)
        self.insister(deux, 1.5, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        ti = timbre(2.25, 1.5).move_to(P(-3.6, 1.95))
        nom = hors_audit(Text("un timbre", font_size=24, color=GRAY_B).next_to(ti, DOWN, buff=0.12))

        def avant_q(sc):
            sc.play(FadeIn(ti, scale=0.6), FadeIn(nom), run_time=0.4)

        def apres(sc):
            gr = grille(2.25, 1.5, 3, 2, CM_B, 3).move_to(ti.fond)
            sc.play(Create(gr), *estomper(ti), run_time=0.3)
            sc.play(FadeIn(numeros(cases_de(ti, 3, 2), 26, "#0f172a")), run_time=0.3)

        self.question_gauche("07-question", "07b-reponse",
                             ["Quelle aire est possible", "pour un timbre ?"],
                             [self.choix("6 cm²"), self.choix("6 m²"),
                              self.choix("6 dm²")], 0,
                             ["Un timbre est tout petit :", "quelques carrés de 1 cm.", "6 m², ce serait",
                              "un tapis de chambre !"],
                             0.5, couper={1: ("quelques carrés de", "1 cm."), 2: ("6 m²,", "ce serait")},
                             mot_q="Quelle aire", avant_q=avant_q, autres_r=apres)

    # ── 08 : le défi (trois commandes) ──────────────────────────────────────
    YS = (2.05, 0.5, -1.05)

    def commandes(self):
        ca = carte_jeu(1.6, 1.0).move_to(P(-3.3, self.YS[0]))
        po = affiche(1.62, 1.08).move_to(P(-3.3, self.YS[1]))
        ba = bache(2.2, 0.88, "#0ea5e9", "#0c4a6e").move_to(P(-3.3, self.YS[2]))
        return ca, po, ba

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        ca, po, ba = self.commandes()
        specs = [(ca, "une carte", "La carte :", "8 cm sur 5 cm", ("8 cm", "5 cm"), "#e2e8f0"),
                 (po, "un poster", "Le poster :", "6 dm sur 4 dm", ("6 dm", "4 dm"), "#f9a8d4"),
                 (ba, "une banderole", "La banderole :", "5 m sur 2 m", ("5 m", "2 m"), "#38bdf8")]
        for (o, mot, nom, dims, (cw, ch), coul), y in zip(specs, self.YS):
            lg = self.ligne([(nom, coul), (dims, WHITE)], 34)
            self.col(lg, y)
            self.au_mot(mot)
            self.play(FadeIn(o, scale=0.6), FadeIn(lg[0], shift=UP * 0.1), run_time=0.4)
            self.play(FadeIn(lg[1], shift=UP * 0.1), run_time=0.3)
            self.play(FadeIn(cote_txt(cw, o, UP, 24, buff=0.08)), FadeIn(cote_txt(ch, o, LEFT, 24)), run_time=0.25)
        self.au_mot("Donne l'aire")
        q = self.bloc(["Donne l'aire de chacune,", "avec la bonne unité !"], 36, JAUNE_TITRE)
        gauche(q, -6.2, -2.55)
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.45)
        self.pause_defi(y=-1.8)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        ca, po, ba = self.commandes()
        self.add(ca, po, ba)
        for o, cw, ch in ((ca, "8 cm", "5 cm"), (po, "6 dm", "4 dm"), (ba, "5 m", "2 m")):
            self.add(cote_txt(cw, o, UP, 24, buff=0.08), cote_txt(ch, o, LEFT, 24))
        specs = [(ca, "La carte", "La carte :", "8 × 5", "= 40 cm²", (8, 5), "#e2e8f0", "#475569"),
                 (po, "Le poster", "Le poster :", "6 × 4", "= 24 dm²", (6, 4), "#f9a8d4", "#831843"),
                 (ba, "La banderole", "La banderole :", "5 × 2", "= 10 m²", (5, 2), "#38bdf8", "#0f172a")]
        for (o, mot, nom, calc, res, (nc, nr), coul, cg), y in zip(specs, self.YS):
            lg = self.ligne([(nom, coul), (calc, BLEU_D), (res, VERT_OK)], 31, buff=0.2)
            self.col(lg, y)
            self.au_mot(mot)
            self.play(FadeIn(lg[0], shift=UP * 0.1), Indicate(o, color=coul, scale_factor=1.06), run_time=0.4)
            gr = grille(o.fond.width, o.fond.height, nc, nr, cg, 2).move_to(o.fond)
            self.play(FadeIn(lg[1], shift=UP * 0.1), Create(gr), run_time=0.4)
            self.play(FadeIn(lg[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("L'unité de l'aire")
        f = self.bloc(["L'unité de l'aire suit", "l'unité des côtés."], 36, JAUNE_TITRE)
        gauche(f, -6.2, -2.55)
        self.play(FadeIn(f, shift=UP * 0.1), run_time=0.45)
        self.insister(f, 1.08, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        cs = VGroup(carre_u(0.35, CM_C, CM_B), carre_u(0.85, DM_C, DM_B), carre_u(1.55, M_C, M_B))
        cs.arrange(RIGHT, buff=0.3, aligned_edge=DOWN)
        noms = VGroup(*[Text(s, font_size=26, color=c, weight=BOLD).next_to(x, DOWN, buff=0.15)
                        for s, c, x in zip(("cm²", "dm²", "m²"), (CM_C, DM_C, M_C), cs)])
        fig = VGroup(cs, noms)
        lignes = self.finale_gauche(fig, textes=[
            ("Une aire se mesure en carrés-unités :", "cm², dm², m²."),
            ("On choisit l'unité selon", "la taille de l'objet."),
            ("Des côtés en mètres donnent", "une aire en mètres carrés.")], fs=32, x_fig=-4.75, xl=-2.55)
        self.add(fig)
        self.au_mot("Une aire")
        self.montrer_ligne(lignes[0], Indicate(cs, scale_factor=1.06))
        self.au_mot("On choisit")
        self.montrer_ligne(lignes[1])
        self.au_mot("Des côtés")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_cm2()
        self.ecran_dm2()
        self.ecran_m2()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class AireUnitesCM2(AireUnitesBase):
    identite = "Maths CM2 — EleveAI"
    ceinture = "verte"
