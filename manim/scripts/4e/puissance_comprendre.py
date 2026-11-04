# puissance_comprendre.py
# EleveAI — Maths 4e ET 3e (épisode COMMUN) — série « Puissances », épisode 01 :
# COMPRENDRE UNE PUISSANCE (aⁿ, ce n'est pas a × n). Paysage 16:9, AVEC VOIX,
# CEINTURE BLANCHE pour les deux classes. Short jumeau : puissance_comprendre_short.py
# (un autre agent).
# ⭐ Une voix, un script, DEUX rendus : PuissanceComprendre4e et
# PuissanceComprendre3e ne changent que l'identité (la voix ne cite aucune classe).
# Micros couvertes : 4e `puissance_comprendre`, 3e `entier_puissance_comprendre`.
# Code couleur constant : BLEU = la base, ORANGE = l'exposant, VERT = résultat
# juste, ROUGE = le piège (a × n).
#
# Décor et métiers : RÉSEAUX SOCIAUX (Inès partage la vidéo de son chat ; un
# analyste de données), ART-DESIGN (une icône de 4 × 4 pixels ; graphiste),
# SCIENCES (une biologiste et ses bactéries). Centres : reseaux-sociaux,
# art-design, sciences.
#
# Micro → écrans : situation (01) ; l'arbre 3, 9, 27, 81 (02) ; l'écriture 3⁴,
# base et exposant (03) ; QUESTION 1 (03q) ; le carré 4² (04) ; le cube 3³ (05) ;
# les pièges 2⁵ ≠ 2 × 5 et 2³ ≠ 3² (06) ; QUESTION 2 (06q) ; défi (07) et
# correction (07b) ; ce que tu as appris (08) ; fin (09).
#
# Voix : manim/voix/4e-puissance-comprendre.json (validée par Frédéric, débit −6),
# WAV dans public/sons/4e-puissance-comprendre/ ; marques mot à mot :
# manim/scripts/4e/puissance_comprendre_marques.json (scripts/marques_dump.ps1,
# puis cues2marques.py corrigé PAR PAIRES pour garder « 3 fois 3 fois 3 »).
# Outils : manim/scripts/6e/prop_commun.py (non modifié).
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/puissance_comprendre.py PuissanceComprendre4e
# python -m manim render -qh --disable_caching manim/scripts/4e/puissance_comprendre.py PuissanceComprendre4e -o eleveai-maths-4e-puissance-comprendre --media_dir manim/scripts/4e/media-puiss-01-4e
# python -m manim render -qh --disable_caching manim/scripts/4e/puissance_comprendre.py PuissanceComprendre3e -o eleveai-maths-3e-puissance-comprendre --media_dir manim/scripts/4e/media-puiss-01-3e
# Sorties : manim/sorties/4e/maths/puissances/01-comprendre/eleveai-maths-4e-puissance-comprendre.mp4
#           manim/sorties/3e/maths/puissances/01-comprendre/eleveai-maths-3e-puissance-comprendre.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403

BASE_C = BLEU_CALCUL       # la base
EXPO_C = ORANGE_RETENUE    # l'exposant
PIEGE = ROUGE_ERREUR       # a × n
BRANCHE = "#38bdf8"
PIXEL = "#60a5fa"


def T(s, fs=40, c=WHITE, audit=True):
    """Un texte posé AU MOT par le script (pas d'attente automatique) ;
    audit=False : un rappel déjà dit (ni synchro ni audit)."""
    t = Text(s, font_size=fs, color=c)
    t.sans_synchro = True
    if not audit:
        t._pas_audit = True
    return t


def puiss(b, e, fs=60, cb=BASE_C, ce=EXPO_C, audit=True):
    """Une puissance COMPOSÉE : la base, l'exposant plus petit en haut (.base .expo)."""
    base = T(str(b), fs, cb, audit)
    expo = T(str(e), fs * 0.6, ce, audit)
    expo.next_to(base, UR, buff=0.03).shift(DOWN * fs * 0.006)
    if not str(b).isdigit():  # une lettre (a) est basse : l'exposant monte au-dessus d'elle
        expo.shift(UP * fs * 0.0045)
    g = VGroup(base, expo)
    g.base, g.expo = base, expo
    return g


def facteurs(b, n, fs=60, cb=BASE_C, audit=True, buff=0.22):
    """« b × b × … × b » : .nb (les n facteurs), .fois (les signes ×)."""
    g = VGroup()
    nb, fois = VGroup(), VGroup()
    for k in range(n):
        if k:
            x = T("×", fs, WHITE, audit)
            fois.add(x)
            g.add(x)
        f = T(str(b), fs, cb, audit)
        nb.add(f)
        g.add(f)
    g.arrange(RIGHT, buff=buff)
    g.nb, g.fois = nb, fois
    return g


# ── les dessins ────────────────────────────────────────────────────────────

def chat(s=1.0):
    """La tête d'un chat roux (la vidéo d'Inès)."""
    tete = Circle(radius=0.5, fill_color="#f59e0b", fill_opacity=1, stroke_width=0)
    oreilles = VGroup(*[Polygon(P(x - 0.2 * d, 0.25), P(x + 0.2 * d, 0.38), P(x + 0.02 * d, 0.72),
                                fill_color="#f59e0b", fill_opacity=1, stroke_width=0) for x, d in ((-0.3, 1), (0.3, -1))])
    yeux = VGroup(*[Ellipse(width=0.13, height=0.2, fill_color="#14532d", fill_opacity=1, stroke_width=0)
                    .move_to(P(x, 0.08)) for x in (-0.18, 0.18)])
    nez = Triangle(fill_color="#f472b6", fill_opacity=1, stroke_width=0).scale(0.06).rotate(PI).move_to(P(0, -0.1))
    mous = VGroup(*[Line(P(0.12 * d, -0.15), P(0.62 * d, -0.1 + dy), stroke_width=2, color=WHITE)
                    for d in (-1, 1) for dy in (0.06, -0.08)])
    return VGroup(oreilles, tete, yeux, nez, mous).scale(s)


def telephone(h=2.6, avec_chat=True):
    """Un téléphone qui passe la vidéo du chat (barre de lecture en bas)."""
    w = h * 0.52
    corps = RoundedRectangle(width=w, height=h, corner_radius=w * 0.16, fill_color="#1f2937", fill_opacity=1,
                             stroke_color="#94a3b8", stroke_width=3)
    ecran = RoundedRectangle(width=w * 0.86, height=h * 0.84, corner_radius=w * 0.08, fill_color="#e0f2fe",
                             fill_opacity=1, stroke_width=0)
    g = VGroup(corps, ecran)
    if avec_chat:
        c = chat(h * 0.32).move_to(ecran.get_center() + UP * h * 0.06)
        barre = Line(ecran.get_corner(DL) + P(w * 0.1, h * 0.08), ecran.get_corner(DR) + P(-w * 0.1, h * 0.08),
                     color="#94a3b8", stroke_width=3)
        lu = Line(barre.get_start(), barre.point_from_proportion(0.4), color="#ef4444", stroke_width=4)
        g.add(c, barre, lu)
    g.ecran = ecran
    return g


def ami(s=1.0, couleur="#a78bfa", peau="#c68642"):
    """Un ami en buste (tête + épaules)."""
    tete = Circle(radius=0.2, fill_color=peau, fill_opacity=1, stroke_width=0).move_to(P(0, 0.27))
    epaules = AnnularSector(inner_radius=0, outer_radius=0.36, angle=PI, start_angle=0, fill_color=couleur,
                            fill_opacity=1, stroke_width=0).move_to(P(0, -0.12))
    return VGroup(epaules, tete).scale(s)


def ines(s=1.0):
    """Inès, collégienne : cheveux longs, sweat rose."""
    return personne(peau="#8d5524", tenue="#db2777", cheveux="#111827", longs=True, s=s)


def ecran_donnees(s=1.0):
    """Le pictogramme « analyste de données » : un écran, des barres qui montent, une flèche."""
    cadre = RoundedRectangle(width=1.6, height=1.1, corner_radius=0.1, fill_color="#0f172a", fill_opacity=1,
                             stroke_color=BRANCHE, stroke_width=3)
    pied = VGroup(Line(P(0, -0.55), P(0, -0.75), color="#94a3b8", stroke_width=5),
                  Line(P(-0.3, -0.77), P(0.3, -0.77), color="#94a3b8", stroke_width=5))
    barres = VGroup(*[Rectangle(width=0.2, height=h, fill_color=c, fill_opacity=1, stroke_width=0)
                      .move_to(P(-0.5 + 0.33 * k, -0.4 + h / 2)) for k, (h, c) in
                      enumerate(((0.15, "#38bdf8"), (0.3, "#38bdf8"), (0.5, "#22c55e"), (0.75, "#22c55e")))])
    fl = Arrow(P(-0.6, -0.15), P(0.62, 0.42), buff=0, color=AMBRE, stroke_width=4, max_tip_length_to_length_ratio=0.25)
    return VGroup(cadre, pied, barres, fl).scale(s)


def tablette_graphiste(s=1.0):
    """Le pictogramme « graphiste » : une tablette, une icône dessinée, le stylet."""
    tab = RoundedRectangle(width=1.7, height=1.2, corner_radius=0.12, fill_color="#1f2937", fill_opacity=1,
                           stroke_color="#94a3b8", stroke_width=3)
    zone = RoundedRectangle(width=1.45, height=0.95, corner_radius=0.06, fill_color="#f8fafc", fill_opacity=1,
                            stroke_width=0)
    icone = VGroup(*[Square(0.17, fill_color=PIXEL if (i + j) % 3 else "#f472b6", fill_opacity=1, stroke_color=WHITE,
                            stroke_width=1).move_to(P(-0.26 + 0.17 * i, 0.26 - 0.17 * j)) for i in range(4) for j in range(4)])
    stylet = VGroup(Line(P(0.25, -0.55), P(0.85, 0.15), color="#facc15", stroke_width=9),
                    Line(P(0.2, -0.61), P(0.27, -0.52), color="#111827", stroke_width=6))
    return VGroup(tab, zone, icone, stylet).scale(s)


def petit_cube(s=0.5, couleur="#38bdf8", dx=0.42, dy=0.3):
    """Un petit cube en perspective cavalière (face, dessus, côté)."""
    face = Square(s, fill_color=couleur, fill_opacity=1, stroke_color="#0f172a", stroke_width=2)
    a, b = face.get_corner(UL), face.get_corner(UR)
    c = face.get_corner(DR)
    d = P(dx * s, dy * s)
    dessus = Polygon(a, b, b + d, a + d, fill_color=interpolate_color(ManimColor(couleur), WHITE, 0.35),
                     fill_opacity=1, stroke_color="#0f172a", stroke_width=2)
    cote_ = Polygon(b, c, c + d, b + d, fill_color=interpolate_color(ManimColor(couleur), BLACK, 0.3),
                    fill_opacity=1, stroke_color="#0f172a", stroke_width=2)
    return VGroup(face, dessus, cote_)


def cube_empile(n=3, s=0.62, origine=ORIGIN, couleur="#38bdf8", dx=0.42, dy=0.3):
    """Les n³ petits cubes (rangés [couche j][profondeur k][i]), dans l'ordre
    de peinture (z_index : du fond vers l'avant, de bas en haut)."""
    cubes = {}
    for j in range(n):
        for k in range(n):
            for i in range(n):
                c = petit_cube(s, couleur, dx, dy)
                c.move_to(origine + P(i * s + k * dx * s, j * s + k * dy * s))
                c.set_z_index(j * 100 - k * 10 + i)
                cubes[(i, j, k)] = c
    return cubes


def grille_pixels(n=4, cote=0.82, centre=ORIGIN):
    """L'icône de n × n pixels : cadre arrondi, cases vides ; .cases[r][c]."""
    cases = VGroup()
    for r in range(n):
        ligne = VGroup(*[Square(cote, stroke_color="#94a3b8", stroke_width=2, fill_color="#1e293b", fill_opacity=1)
                         for _ in range(n)]).arrange(RIGHT, buff=0)
        cases.add(ligne)
    cases.arrange(DOWN, buff=0).move_to(centre)
    cadre = RoundedRectangle(width=cases.width + 0.36, height=cases.height + 0.36, corner_radius=0.3,
                             stroke_color=WHITE, stroke_width=4).move_to(centre)
    g = VGroup(cadre, cases)
    g.cases, g.cadre = cases, cadre
    return g


def bacterie(s=1.0, couleur="#4ade80"):
    """Une bactérie : une gélule verte et son noyau."""
    corps = RoundedRectangle(width=0.5, height=0.26, corner_radius=0.13, fill_color=couleur, fill_opacity=1,
                             stroke_color="#14532d", stroke_width=2)
    noyau = Ellipse(width=0.18, height=0.08, fill_color="#166534", fill_opacity=1, stroke_width=0)
    return VGroup(corps, noyau).scale(s)


def microscope(s=1.0):
    """Un microscope de laboratoire, de profil."""
    socle = RoundedRectangle(width=1.4, height=0.22, corner_radius=0.08, fill_color="#334155", fill_opacity=1,
                             stroke_width=0).move_to(P(0, -1.0))
    bras = Arc(radius=0.75, start_angle=-PI / 2, angle=PI * 0.9, arc_center=P(-0.15, -0.2), stroke_color="#475569",
               stroke_width=16)
    platine = Rectangle(width=1.0, height=0.1, fill_color="#64748b", fill_opacity=1, stroke_width=0).move_to(P(0.35, -0.35))
    tube = RoundedRectangle(width=0.26, height=1.0, corner_radius=0.06, fill_color="#e2e8f0", fill_opacity=1,
                            stroke_color="#475569", stroke_width=2).rotate(0.35).move_to(P(0.3, 0.45))
    oculaire = Rectangle(width=0.2, height=0.22, fill_color="#0f172a", fill_opacity=1, stroke_width=0
                         ).rotate(0.35).move_to(P(0.12, 1.0))
    objectif = Rectangle(width=0.12, height=0.2, fill_color="#0f172a", fill_opacity=1, stroke_width=0).move_to(P(0.45, -0.15))
    return VGroup(socle, bras, platine, tube, oculaire, objectif).scale(s)


def biologiste(s=1.0):
    """La biologiste : blouse blanche, lunettes."""
    p = personne(peau="#e0ac69", tenue="#0e7490", cheveux="#78350f", longs=True, s=s)
    p.add(blouse(p), lunettes(p))
    return p


def places_grille(n, centre, larg=3.4, haut=2.2):
    """n positions en grille (pour 1, 2, 4… 32 bactéries) dans une boîte."""
    cols = {1: 1, 2: 2, 4: 2, 8: 4, 16: 4, 32: 8}[n]
    rangs = n // cols
    px, py = larg / cols, haut / max(rangs, 1)
    return [centre + P((c - (cols - 1) / 2) * px, ((rangs - 1) / 2 - r) * py) for r in range(rangs) for c in range(cols)]


class PuissanceComprendreBase(PaysageProp):
    nom_voix = "4e-puissance-comprendre"
    fichier_marques = "puissance_comprendre_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "blanche"

    def au(self, extrait, *anims, n=1, rt=0.35):
        """Au mot `extrait` (n-ième fois), joue les animations."""
        self.au_mot(extrait, n)
        if anims:
            self.play(*anims, run_time=rt)

    def partage(self, centre_tel, h_tel, x1, ys1, x2, dy2, s1=0.55, s2=0.36):
        """Le téléphone, ses 3 amis, puis les 3 amis de chacun (renvoyés, non ajoutés)."""
        tel = telephone(h_tel).move_to(centre_tel)
        a1, f1, a2, f2 = VGroup(), VGroup(), VGroup(), VGroup()
        couleurs = ("#a78bfa", "#22c55e", "#f472b6")
        for k, y in enumerate(ys1):
            a = ami(s1, couleurs[k], PEAUX[k]).move_to(P(x1, y))
            f1.add(Arrow(tel.get_right(), a.get_left(), buff=0.12, color=BRANCHE, stroke_width=4,
                         max_tip_length_to_length_ratio=0.18))
            a1.add(a)
            for j in range(3):
                b = ami(s2, couleurs[(k + j + 1) % 3], PEAUX[(k + j + 2) % 5]).move_to(P(x2, y + (j - 1) * dy2))
                f2.add(Arrow(a.get_right(), b.get_left(), buff=0.08, color=BRANCHE, stroke_width=3,
                             max_tip_length_to_length_ratio=0.2))
                a2.add(b)
        return tel, f1, a1, f2, a2

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Comprendre une puissance", self.identite, self.ceinture, y_ech=-2.55)
        ident._pas_audit = True  # « Maths 4e » : l'identité, pas un nombre de la voix
        self.au_mot("Comprendre")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        tel, f1, a1, f2, a2 = self.partage(P(-3.6, 0.15), 2.0, -1.3, (1.0, 0.15, -0.7), 1.0, 0.28, s1=0.42, s2=0.27)
        self.au("Une vidéo", FadeIn(tel, shift=UP * 0.2), rt=0.5)
        self.au("3 amis", LaggedStart(*[GrowArrow(f) for f in f1], lag_ratio=0.2), FadeIn(a1, scale=0.6), rt=0.6)
        self.au("encore", LaggedStart(*[GrowArrow(f) for f in f2], lag_ratio=0.05), FadeIn(a2, scale=0.6), rt=0.8)
        q = T("?", 110, EXPO_C).move_to(P(2.5, 0.15))
        self.au("combien", FadeIn(q, scale=1.6), rt=0.4)
        self.insister(q, 1.25, 0.25)
        self.attendre_voix(marge=0.6)

    # ── 01 : Inès partage la vidéo de son chat ─────────────────────────────
    def ecran_situation(self):
        self.ecran("01-partage")
        p = ines(0.85).move_to(P(-5.7, -1.35))
        nom = T("Inès", 40, BASE_C).next_to(p, UP, buff=0.25)
        tel, f1, a1, f2, a2 = self.partage(P(-3.5, 0.0), 3.0, -0.7, (1.95, 0.0, -1.95), 2.05, 0.62)
        self.au("Inès", FadeIn(p, shift=UP * 0.3), FadeIn(nom), rt=0.5)
        self.au("une vidéo", FadeIn(tel, scale=0.8), rt=0.5)
        self.au("chat", Indicate(tel[2], color="#fbbf24", scale_factor=1.15), rt=0.6)
        n3 = T("3 amis", 34, BRANCHE).move_to(P(-0.7, 3.0))
        self.au("3 amis", LaggedStart(*[GrowArrow(f) for f in f1], lag_ratio=0.25), FadeIn(a1, scale=0.6),
                FadeIn(n3), rt=0.6)
        n9 = T("3 nouveaux amis", 30, BRANCHE).move_to(P(2.35, -3.0))
        self.au("Chacun", LaggedStart(*[Indicate(a, color=BRANCHE) for a in a1], lag_ratio=0.3), rt=0.7)
        self.au("3 nouveaux", LaggedStart(*[GrowArrow(f) for f in f2], lag_ratio=0.06), FadeIn(a2, scale=0.6),
                FadeIn(n9), rt=0.9)
        pts = VGroup(*[T("…", 44, BRANCHE) .move_to(P(3.55, y)) for y in (1.95, 0.0, -1.95)])
        self.au("ainsi", LaggedStart(*[FadeIn(x, shift=RIGHT * 0.2) for x in pts], lag_ratio=0.2), rt=0.6)
        q = VGroup(T("Au quatrième", 34, EXPO_C), T("envoi :", 34, EXPO_C), T("combien de", 34, EXPO_C),
                   T("personnes ?", 34, EXPO_C)).arrange(DOWN, buff=0.12)
        q.scale_to_fit_width(min(q.width, 2.45)).move_to(P(0, 0.9)).align_to(P(6.4, 0), RIGHT)
        self.au("Au quatrième", FadeIn(q[:2], shift=LEFT * 0.2), rt=0.35)
        self.au("combien", FadeIn(q[2:], shift=LEFT * 0.2), rt=0.35)
        self.insister(q, 1.1, 0.25)
        self.attendre_voix()

    # ── 02 : l'arbre qui pousse : 3, 9, 27, 81 ─────────────────────────────
    def arbre(self, x0=-5.75, xs=(-4.6, -3.05, -1.5, 0.05), yc=-0.1, h=4.9):
        """Les quatre niveaux de l'arbre de partage : [(branches, noeuds)]."""
        d4 = h / 80
        dy = (27 * d4, 9 * d4, 3 * d4, d4)
        niveaux, peres = [], [P(x0, yc)]
        for k, (x, d) in enumerate(zip(xs, dy)):
            br, nd, fils = VGroup(), VGroup(), []
            for p in peres:
                for j in range(3):
                    q = P(x, p[1] + (j - 1) * d)
                    br.add(Line(p, q, stroke_width=(4, 3, 1.8, 1.0)[k], color=BRANCHE))
                    nd.add(Dot(q, radius=(0.1, 0.07, 0.045, 0.03)[k], color=(WHITE, WHITE, WHITE, VERT_OK)[k]))
                    fils.append(q)
            niveaux.append((br, nd))
            peres = fils
        return niveaux

    def ecran_arbre(self):
        self.ecran("02-arbre")
        tel = telephone(0.95).move_to(P(-6.05, -0.1))
        niv = self.arbre(x0=-5.7)
        tit = T("L'arbre des partages", 40, JAUNE_TITRE).move_to(P(-3.0, 3.2))
        self.au("Dessinons", FadeIn(tel, scale=0.8), rt=0.4)
        self.au("l'arbre", Write(tit), rt=0.5)
        xs = (-4.6, -3.05, -1.5, 0.05)
        ent = VGroup(*[T(f"Envoi {k + 1}", 24, GREY_B).move_to(P(x, 2.6)) for k, x in enumerate(xs)])
        cpt = VGroup(*[T(v, 40, c).move_to(P(x, -2.95)) for v, c, x in
                       zip(("3", "9", "27", "81"), (WHITE, WHITE, WHITE, VERT_OK), xs)])
        lignes = [self.ligne([(a, WHITE), (b, WHITE), (c, VERT_OK)], 44) for a, b, c in
                  (("3 ×", "3 =", "9"), ("9 ×", "3 =", "27"), ("27 ×", "3 =", "81"))]
        for lg, y in zip(lignes, (2.45, 1.6, 0.75)):
            for x in lg:
                x.sans_synchro = True
            self.col(lg, y, xl=1.25)
        # envoi 1
        br, nd = niv[0]
        self.au("1 : 3", FadeIn(ent[0]), LaggedStart(*[Create(b) for b in br], lag_ratio=0.3), rt=0.3)
        self.au("3 personnes", FadeIn(nd, scale=2), FadeIn(cpt[0], scale=1.4), rt=0.35)
        # envoi 2 : 3 × 3 = 9
        self.au("2 : chacune", FadeIn(ent[1]), rt=0.3)
        br, nd = niv[1]
        self.au("touche 3", LaggedStart(*[Create(b) for b in br], lag_ratio=0.1), FadeIn(nd), rt=0.6)
        self.au("3 fois 3 : 9", FadeIn(lignes[0][0], shift=RIGHT * 0.2), rt=0.3)
        self.au("3 : 9", FadeIn(lignes[0][1], shift=RIGHT * 0.2), rt=0.3)
        self.au("9. Envoi", FadeIn(lignes[0][2], scale=1.3), FadeIn(cpt[1], scale=1.4), rt=0.35)
        # envoi 3 : 9 × 3 = 27
        self.au("3 : 9 fois", FadeIn(ent[2]), rt=0.3)
        br, nd = niv[2]
        self.au("9 fois", LaggedStart(*[Create(b) for b in br], lag_ratio=0.03), FadeIn(nd),
                FadeIn(lignes[1][0], shift=RIGHT * 0.2), rt=0.6)
        self.au("3 : 27", FadeIn(lignes[1][1], shift=RIGHT * 0.2), rt=0.3)
        self.au("27. Envoi", FadeIn(lignes[1][2], scale=1.3), FadeIn(cpt[2], scale=1.4), rt=0.35)
        # envoi 4 : 27 × 3 = 81
        self.au("4 : 27", FadeIn(ent[3]), rt=0.3)
        br, nd = niv[3]
        self.au("27 fois", LaggedStart(*[Create(b) for b in br], lag_ratio=0.01), FadeIn(nd),
                FadeIn(lignes[2][0], shift=RIGHT * 0.2), rt=0.7)
        self.au("3 : 81", FadeIn(lignes[2][1], shift=RIGHT * 0.2), rt=0.3)
        self.au("81. 81", FadeIn(lignes[2][2], scale=1.3), FadeIn(cpt[3], scale=1.4), rt=0.35)
        gros = self.ligne([("81", VERT_OK), ("personnes !", VERT_OK)], 46)
        for x in gros:
            x.sans_synchro = True
        self.col(gros, -0.3, xl=1.45)
        gros.scale_to_fit_width(min(gros.width, 6.2 - 1.45)).align_to(P(1.45, 0), LEFT)
        cad = self.encadrer(gros)
        self.au("81 personnes", FadeIn(gros, scale=1.2), Create(cad), Indicate(niv[3][1], color=VERT_OK), rt=0.45)
        self.insister(VGroup(gros, cad), 1.15, 0.25)
        faux = self.ligne([("Pas", PIEGE), ("3 ×", PIEGE), ("4 =", PIEGE), ("12", PIEGE)], 42)
        for x in faux:
            x.sans_synchro = True
        self.col(faux, -1.3, xl=1.25)
        self.au("Pas 3", FadeIn(faux[0], shift=RIGHT * 0.2), rt=0.25)
        self.au("3 fois 4", FadeIn(faux[1], shift=RIGHT * 0.2), rt=0.25)
        self.au("4, 12", FadeIn(faux[2], shift=RIGHT * 0.2), rt=0.3)
        self.au("12. C'est", FadeIn(faux[3], scale=1.3), rt=0.3)
        self.play(gros[0].animate.scale(1.4), faux[3].animate.scale(0.8), run_time=0.3)
        self.play(gros[0].animate.scale(1 / 1.4), faux[3].animate.scale(1 / 0.8), run_time=0.3)
        pic = ecran_donnees(0.8).move_to(P(1.95, -2.65))
        met = VGroup(T("analyste", 30, BRANCHE), T("de données", 30, BRANCHE)).arrange(DOWN, aligned_edge=LEFT,
                                                                                       buff=0.08)
        met.next_to(pic, RIGHT, buff=0.25)
        self.au("analystes", FadeIn(pic, shift=UP * 0.2), FadeIn(met, shift=RIGHT * 0.2), rt=0.45)
        self.au("virale", Indicate(niv[3][0], color=VERT_OK, scale_factor=1.03),
                Flash(cpt[3], color=VERT_OK, line_length=0.25), rt=0.7)
        self.attendre_voix()

    # ── 03 : 3 × 3 × 3 × 3 se replie en 3⁴ ; base et exposant ──────────────
    def ecran_ecriture(self):
        self.ecran("03-ecriture")
        row = facteurs(3, 4, fs=84, buff=0.3).move_to(P(-0.6, 2.45))
        cles = ("3 fois 3 fois 3 fois 3", "3 fois 3 fois 3 :", "3 fois 3 :", "3 : quatre")
        for k, cle in enumerate(cles):
            anims = [FadeIn(row.nb[k], scale=1.4)]
            if k:
                anims.append(FadeIn(row.fois[k - 1]))
            self.au(cle, *anims, rt=0.25)
        acc = Brace(row, DOWN, buff=0.15, color=EXPO_C)
        lab = T("quatre fois le même facteur", 36, EXPO_C).next_to(acc, DOWN, buff=0.15)
        self.au("quatre", GrowFromCenter(acc), FadeIn(lab, shift=UP * 0.15), rt=0.5)
        p = puiss(3, 4, fs=150).move_to(P(-0.6, -0.75))
        vite = T("Pour l'écrire vite :", 34, WHITE).move_to(P(-4.3, 0.2))
        self.au("Pour l'écrire", FadeIn(vite, shift=RIGHT * 0.2), rt=0.4)
        replis = VGroup(*[p.base.copy() for _ in range(4)])
        self.au("3 puissance", ReplacementTransform(row.nb.copy(), replis), rt=0.7)
        self.remove(replis)
        self.add(p.base)
        self.au("4. Le", FadeIn(p.expo, scale=1.6), rt=0.35)
        self.insister(p.expo, 1.5, 0.25, about=p.expo.get_center())
        # la base
        lb = T("la base", 44, BASE_C).move_to(P(-4.4, -1.5)).align_to(P(-5.7, 0), LEFT)
        fb = Arrow(lb.get_right(), p.base.get_left(), buff=0.15, color=BASE_C, stroke_width=6)
        db = T("le nombre qu'on multiplie", 30, BASE_C).next_to(lb, DOWN, buff=0.2).align_to(lb, LEFT)
        self.au("Le 3, en bas", Indicate(p.base, color=BASE_C, scale_factor=1.15), rt=0.5)
        self.au("la base", FadeIn(lb, shift=RIGHT * 0.2), GrowArrow(fb), rt=0.4)
        self.au("le nombre", FadeIn(db, shift=UP * 0.15), rt=0.35)
        # l'exposant
        le = T("l'exposant", 44, EXPO_C).move_to(P(3.3, 0.2))
        fe = Arrow(le.get_left(), p.expo.get_right(), buff=0.15, color=EXPO_C, stroke_width=6)
        de = T("il compte les facteurs", 30, EXPO_C).next_to(le, DOWN, buff=0.2)
        self.au("Le petit 4", Indicate(p.expo, color=EXPO_C, scale_factor=1.4), rt=0.5)
        self.au("l'exposant", FadeIn(le, shift=LEFT * 0.2), GrowArrow(fe), rt=0.4)
        uns = VGroup(*[T(str(k + 1), 30, EXPO_C, audit=False).next_to(row.nb[k], UP, buff=0.08) for k in range(4)])
        self.au("il compte", FadeIn(de, shift=UP * 0.15), rt=0.35)
        self.play(LaggedStart(*[AnimationGroup(FadeIn(u, scale=1.5), row.nb[k].animate.set_color(EXPO_C))
                                for k, u in enumerate(uns)], lag_ratio=0.35), run_time=1.2)
        self.play(row.nb.animate.set_color(BASE_C), Indicate(p.expo, color=EXPO_C, scale_factor=1.3), run_time=0.5)
        self.attendre_voix()

    # ── outils des questions : chaque morceau d'une ligne AU MOT ───────────
    y_ph = -2.35  # la phrase de réponse : à GAUCHE, sous la figure (lisible, loin de Ti-Margo)

    def _disposer_q(self, question, choix, phrase):
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        self.q_q = q
        ph = self.bloc(phrase, 32, VERT_OK).move_to(P(0, self.y_ph)).align_to(P(-6.1, 0), LEFT)
        if ph.width > 6.6:
            ph.scale_to_fit_width(6.6).align_to(P(-6.1, 0), LEFT)
        self.ph_q = ph
        return tete, q, cartes, pause, rebours, ph

    def poser_mots(self, t, plan, rt=0.3, avec=None):
        """t : un Text (déjà placé) ; plan : [(début du morceau dans t, extrait
        de la voix ou (extrait, n))] ; chaque morceau entre à son mot, avec les
        animations avec[k] éventuelles."""
        s = t.original_text
        debuts = [a if isinstance(a, int) else s.find(a) for a, _ in plan]
        assert debuts[0] == 0 and all(d >= 0 for d in debuts), (s, plan)
        bornes = debuts + [len(s)]
        k, pieces = 0, []
        for a, b in zip(bornes[:-1], bornes[1:]):
            n = sum(1 for c in s[a:b] if not c.isspace())
            pieces.append(VGroup(*t.submobjects[k:k + n]))
            k += n
        for j, ((_, ex), pc) in enumerate(zip(plan, pieces)):
            ex, n = (ex, 1) if isinstance(ex, str) else ex
            self.au_mot(ex, n)
            self.play(FadeIn(pc, shift=UP * 0.12), *((avec or {}).get(j, [])), run_time=rt)

    @staticmethod
    def choix_synchro(choix):
        """Les choix entrent à LEUR nombre (synchro automatique par jetons)."""
        for c in choix:
            for f in c.get_family():
                f.sans_synchro = False
        return choix

    def question_au_mot(self, plans, avec=None):
        """Pour avant_q : écrit les lignes de la question morceau par morceau
        (plans[i] pour la ligne i, avec[i] : animations par morceau), puis vide
        q pour que question_pause ne la rejoue pas."""
        def f(sc):
            for i, (lg, plan) in enumerate(zip(sc.q_q, plans)):
                sc.poser_mots(lg, plan, rt=0.25, avec=(avec or {}).get(i))
            sc.q_q.submobjects = []
        return f

    # ── 03q : QUESTION 1 (5 × 5 × 5 ?) ─────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        rappel = VGroup(facteurs(3, 4, fs=46, audit=False), T("=", 46, WHITE, audit=False),
                        puiss(3, 4, fs=58, audit=False)).arrange(RIGHT, buff=0.25).move_to(P(-3.3, 1.7))
        self.add(rappel)
        rep = VGroup(facteurs(5, 3, fs=58), T("=", 58), puiss(5, 3, fs=72)).arrange(RIGHT, buff=0.3)
        rep.move_to(P(-3.3, -0.4))
        pr = rep[2]
        lb = T("la base", 34, BASE_C).next_to(pr.base, DOWN, buff=0.45).shift(LEFT * 0.4)
        le = T("l'exposant", 34, EXPO_C).next_to(pr.expo, UP, buff=0.35).shift(RIGHT * 0.3)

        def apres(sc):
            ph = sc.ph_q
            sc.au("5 puissance", FadeIn(VGroup(rep[0], rep[1], pr.base), shift=UP * 0.15), rt=0.35)
            sc.au("3. La", FadeIn(pr.expo, scale=1.5), rt=0.3)
            sc.poser_mots(ph[0], [("", "La base"), ("5,", "5, le")],
                          avec={0: [FadeIn(lb, shift=UP * 0.1), Indicate(pr.base, color=BASE_C, scale_factor=1.4)],
                                1: [Indicate(rep[0].nb, color=BASE_C, scale_factor=1.2)]})
            sc.poser_mots(ph[1], [("", "L'exposant"), ("3,", "3, compte")],
                          avec={0: [FadeIn(le, shift=DOWN * 0.1)],
                                1: [Indicate(pr.expo, color=EXPO_C, scale_factor=1.6)]})
            sc.play(LaggedStart(*[Indicate(f, color=EXPO_C, scale_factor=1.3) for f in rep[0].nb], lag_ratio=0.3),
                    run_time=0.9)
            sc.rep_fini()

        # chaque choix entre à son PREMIER nombre, son exposant au mot suivant
        a, b = puiss(5, 3, 40), puiss(3, 5, 40)
        c = VGroup(T("5 ×", 34), T("3", 34)).arrange(RIGHT, buff=0.15)
        for x in (a.expo, b.expo, c[1]):
            x.set_opacity(0)
        montrer = lambda x: (lambda: [x.animate.set_opacity(1)])  # noqa: E731
        self._en_attente = {"3 puissance 5": [("3. B", 1, montrer(a.expo))],
                            "5 fois 3": [("5. C", 1, montrer(b.expo))],
                            "Mets pause": [("3. Mets", 1, montrer(c[1]))]}
        self.question_pause("03q-question", "03r-reponse",
                            ["Comment écrire 5 × 5 × 5", "avec une puissance ?"],
                            [a, b, c], 0,
                            ["La base, c'est 5, le nombre répété.", "L'exposant, 3, compte les facteurs."],
                            mots_choix=("5 puissance 3", "3 puissance 5", "5 fois 3"),
                            avant_q=self.question_au_mot([
                                [("", "Comment"), (15, "5 fois 5 fois 5"), (19, "5 fois 5 avec"),
                                 (23, "5 avec")],
                                [("", "avec une")]]),
                            autres_r=apres)
        self._en_attente = None

    _en_attente = None

    def au_mot(self, extrait, n=1):
        """Avant d'attendre `extrait`, joue les gestes promis à des mots plus tôt
        (l'exposant d'un choix de question, dit après sa base)."""
        for ex, nn, f in (self._en_attente or {}).pop(extrait, []):
            super().au_mot(ex, nn)
            self.play(*f(), run_time=0.3)
        return super().au_mot(extrait, n)

    def ligne_mots(self, morceaux, y, fs=44, xl=None):
        """Une ligne de morceaux (texte, couleur), posée dans la colonne, rien d'affiché."""
        lg = self.ligne(morceaux, fs)
        for x in lg:
            x.sans_synchro = True
        self.col(lg, y, xl)
        return lg

    # ── 04 : l'icône 4 × 4 pixels : 4² ─────────────────────────────────────
    def ecran_carre(self):
        self.ecran("04-carre")
        g = grille_pixels(4, 0.82, P(-3.35, -0.15))
        haut = T("4 pixels", 32, WHITE).next_to(g.cadre, UP, buff=0.18)
        gauche = T("4 pixels", 32, WHITE).rotate(PI / 2).next_to(g.cadre, LEFT, buff=0.18)
        self.au("Une icône", FadeIn(g.cadre, scale=0.8), FadeIn(g.cases), rt=0.5)
        self.au("4 pixels", FadeIn(haut, shift=DOWN * 0.15), rt=0.35)
        self.au("4 pixels.", FadeIn(gauche, shift=RIGHT * 0.15), rt=0.35)
        q = T("?", 120, EXPO_C).move_to(g.cases)
        self.au("Combien", FadeIn(q, scale=1.5), rt=0.35)
        cols = ("#60a5fa", "#38bdf8", "#22d3ee", "#a78bfa")
        self.au("4 rangées", FadeOut(q), rt=0.25)
        for r in range(4):
            self.play(LaggedStart(*[c.animate.set_fill(cols[r], 1) for c in g.cases[r]], lag_ratio=0.2),
                      run_time=0.32)
        l1 = self.ligne_mots([("4 ×", WHITE), ("4 =", WHITE), ("16", VERT_OK)], 2.6, 48)
        self.au("4 fois 4,", FadeIn(l1[0], shift=RIGHT * 0.2), rt=0.3)
        self.au("4, 16", FadeIn(l1[1], shift=RIGHT * 0.2), rt=0.3)
        self.au("16. On", FadeIn(l1[2], scale=1.4), Indicate(g.cases, color=VERT_OK, scale_factor=1.04), rt=0.4)
        p = puiss(4, 2, fs=72)
        eg = T("=", 56)
        dit = T("« 4 au carré »", 36, WHITE)
        l2 = VGroup(eg, p, dit).arrange(RIGHT, buff=0.3)
        self.col(l2, 1.45)
        self.au("4 puissance", FadeIn(eg), FadeIn(p.base, scale=1.3), rt=0.3)
        self.au("2, et", FadeIn(p.expo, scale=1.6), rt=0.3)
        self.insister(p.expo, 1.5, 0.2, about=p.expo.get_center())
        self.au("4 au carré", FadeIn(dit, shift=RIGHT * 0.2), rt=0.35)
        pic = tablette_graphiste(0.85).move_to(P(1.85, 0.05))
        met = T("graphiste", 34, BRANCHE).next_to(pic, RIGHT, buff=0.3)
        self.au("graphistes", FadeIn(pic, shift=UP * 0.2), FadeIn(met, shift=RIGHT * 0.2), rt=0.45)
        att = self.ligne_mots([("Attention :", PIEGE), ("4 ×", PIEGE), ("2 =", PIEGE), ("8", PIEGE)], -1.15, 40)
        self.au("Attention", FadeIn(att[0], shift=RIGHT * 0.2), rt=0.3)
        self.au("4 fois 2", FadeIn(att[1], shift=RIGHT * 0.2), rt=0.3)
        self.au("2, 8", FadeIn(att[2], shift=RIGHT * 0.2), rt=0.3)
        self.au("8, ne", FadeIn(att[3], scale=1.4), rt=0.3)
        deux = T("seulement deux rangées !", 34, PIEGE)
        self.col(deux, -1.95)
        cad = SurroundingRectangle(VGroup(g.cases[0], g.cases[1]), color=PIEGE, buff=0.06, stroke_width=7)
        self.au("ne compte", FadeIn(deux, shift=RIGHT * 0.2), rt=0.35)
        self.au("deux rangées", Create(cad), g.cases[2:].animate.set_opacity(0.25), rt=0.5)
        self.play(Indicate(cad, color=PIEGE, scale_factor=1.03), run_time=0.4)
        self.insister(att[3], 1.3, 0.2)
        self.attendre_voix()

    # ── 05 : le cube 3 × 3 × 3 qui s'empile : 3³ ───────────────────────────
    def ecran_cube(self):
        self.ecran("05-cube")
        s, dx, dy = 0.78, 0.42, 0.3
        o = P(-4.75, -1.35)
        cubes = cube_empile(3, s, o, "#38bdf8", dx, dy)
        fant = VGroup(*[c.copy().set_opacity(0.12).set_z_index(c.z_index - 10000) for c in cubes.values()])
        self.au("casse-tête", FadeIn(fant), rt=0.6)
        ar = VGroup(
            T("3", 38, EXPO_C).move_to(o + P(s, -s / 2 - 0.35)),
            T("3", 38, EXPO_C).move_to(o + P(-s / 2 - 0.35, s)),
            T("3", 38, EXPO_C).move_to(o + P(2.5 * s, -s / 2) + 1.5 * P(dx * s, dy * s) + P(0.35, -0.12)))
        self.au("3 petits", LaggedStart(*[FadeIn(a, scale=1.4) for a in ar], lag_ratio=0.2), rt=0.5)
        self.au("arête", Indicate(ar, color=EXPO_C, scale_factor=1.3), rt=0.5)
        rang = [cubes[(i, 0, 0)] for i in range(3)]
        couche = [cubes[(i, 0, k)] for k in (1, 2) for i in range(3)]
        haut = [cubes[(i, j, k)] for j in (1, 2) for k in range(3) for i in range(3)]
        l1 = self.ligne_mots([("3 ×", WHITE), ("3 ×", WHITE), ("3 =", WHITE), ("27", VERT_OK)], 2.5, 48, xl=1.1)
        self.au("3 fois 3 fois 3", LaggedStart(*[FadeIn(c, shift=DOWN * 0.3) for c in rang], lag_ratio=0.25),
                FadeIn(l1[0], shift=RIGHT * 0.2), rt=0.45)
        self.au("3 fois 3 :", LaggedStart(*[FadeIn(c, shift=DOWN * 0.3) for c in couche], lag_ratio=0.1),
                FadeIn(l1[1], shift=RIGHT * 0.2), rt=0.5)
        self.au("3 : 27", LaggedStart(*[FadeIn(c, shift=DOWN * 0.4) for c in haut], lag_ratio=0.04),
                FadeIn(l1[2], shift=RIGHT * 0.2), rt=0.55)
        n27 = T("27 petits cubes", 40, VERT_OK).move_to(P(-3.2, 2.85))
        self.au("27 petits", FadeIn(l1[3], scale=1.4), FadeIn(n27, scale=1.2), rt=0.4)
        self.insister(l1[3], 1.3, 0.2)
        p = puiss(3, 3, fs=72)
        eg = T("=", 56)
        dit = T("« 3 au cube »", 36, WHITE)
        l2 = VGroup(eg, p, dit).arrange(RIGHT, buff=0.3)
        self.col(l2, 1.3, xl=1.1)
        self.au("3 puissance", FadeIn(eg), FadeIn(p.base, scale=1.3), rt=0.3)
        self.au("3, et", FadeIn(p.expo, scale=1.6), rt=0.3)
        self.insister(p.expo, 1.5, 0.2, about=p.expo.get_center())
        self.au("3 au cube", FadeIn(dit, shift=RIGHT * 0.2), rt=0.35)
        self.au("cube.", Indicate(VGroup(*cubes.values()), color=VERT_OK, scale_factor=1.03), rt=0.6)
        self.attendre_voix()

    # ── 06 : les pièges : 2⁵ ≠ 2 × 5 ; 2³ ≠ 3² ─────────────────────────────
    @staticmethod
    def carres(n, par_rang, c, cote=0.4, centre=ORIGIN, couleur=VERT_OK):
        g = VGroup(*[Square(cote, fill_color=couleur, fill_opacity=0.85, stroke_color=WHITE, stroke_width=1.5)
                     for _ in range(n)]).arrange_in_grid(cols=par_rang, buff=0.06)
        return g.move_to(centre)

    def ecran_piege(self):
        self.ecran("06-piege")
        tit = T("Le piège !", 50, PIEGE).move_to(P(-0.4, 3.12))
        sous = T("lire l'exposant comme un « fois »", 34, WHITE).move_to(P(-0.4, 2.4))
        self.au("Le piège", Write(tit), rt=0.5)
        self.au("lire", FadeIn(sous, shift=UP * 0.15), rt=0.4)
        p = puiss(2, 5, fs=96)
        neq = T("≠", 70, PIEGE)
        faux = VGroup(T("2 ×", 64, PIEGE), T("5 =", 64, PIEGE), T("10", 64, PIEGE)).arrange(RIGHT, buff=0.22)
        l1 = VGroup(p, neq, faux).arrange(RIGHT, buff=0.35).move_to(P(-3.6, 1.15)).align_to(P(-6.1, 0), LEFT)
        self.au("2 puissance", FadeIn(p.base, scale=1.3), rt=0.3)
        self.au("5, ce", FadeIn(p.expo, scale=1.5), rt=0.3)
        r10 = self.carres(10, 5, 2, centre=P(3.75, 1.2), couleur=PIEGE)
        self.au("pas 2", FadeIn(neq, scale=1.3), rt=0.2)
        self.au("2 fois 5", FadeIn(faux[0], shift=RIGHT * 0.2), rt=0.25)
        self.au("5, 10", FadeIn(faux[1], shift=RIGHT * 0.2), rt=0.3)
        self.au("10. C'est", FadeIn(faux[2], scale=1.3), LaggedStart(*[FadeIn(c, scale=0.5) for c in r10],
                                                                       lag_ratio=0.08), rt=0.6)
        barre = Line(faux.get_left() + LEFT * 0.08, faux.get_right() + RIGHT * 0.08, color=WHITE, stroke_width=6)
        self.play(Create(barre), run_time=0.3)
        eg = T("=", 56, VERT_OK)
        f5 = facteurs(2, 5, fs=56, cb=VERT_OK, buff=0.2)
        l2 = VGroup(eg, f5).arrange(RIGHT, buff=0.3).move_to(P(0, -0.15)).align_to(P(-5.7, 0), LEFT)
        cles = ("2 fois 2 fois 2 fois 2 fois 2 :", "2 fois 2 fois 2 fois 2 :", "2 fois 2 fois 2 :", "2 fois 2 :",
                "2 : 32")
        for k, cle in enumerate(cles):
            anims = [FadeIn(f5.nb[k], scale=1.3)] + ([FadeIn(f5.fois[k - 1])] if k else [FadeIn(eg)])
            self.au(cle, *anims, rt=0.22)
        r32 = self.carres(32, 8, 4, centre=P(3.75, -0.95))
        res = VGroup(T("=", 64, VERT_OK), T("32", 80, VERT_OK)).arrange(RIGHT, buff=0.45)
        res.move_to(P(0, -1.5)).align_to(P(-5.7, 0), LEFT)
        self.au("32. Autre", FadeIn(res, scale=1.3), LaggedStart(*[FadeIn(c, scale=0.5) for c in r32],
                                                                 lag_ratio=0.03), rt=0.7)
        self.play(res[1].animate.scale(1.4), faux[2].animate.scale(0.75), run_time=0.3)
        self.play(res[1].animate.scale(1 / 1.4), faux[2].animate.scale(1 / 0.75), run_time=0.3)
        # le deuxième piège
        reste = [m for m in self.mobjects if m not in (tit,) and not type(m).__name__.startswith("Mascotte")]
        sous2 = T("échanger la base et l'exposant", 34, WHITE).move_to(P(-0.4, 2.4))
        self.au("Autre", FadeOut(Group(*reste)), rt=0.45)
        self.au("échanger", FadeIn(sous2, shift=UP * 0.15), rt=0.4)
        a = puiss(2, 3, fs=90)
        a8 = T("= 8", 64, VERT_OK)
        ga = VGroup(a, a8).arrange(RIGHT, buff=0.3).move_to(P(-3.7, 1.2))
        b = puiss(3, 2, fs=90)
        b9 = T("= 9", 64, VERT_OK)
        gb = VGroup(b, b9).arrange(RIGHT, buff=0.3).move_to(P(2.6, 1.2))
        neq2 = T("≠", 80, PIEGE).move_to(P(-0.55, 1.2))
        cu = cube_empile(2, 0.7, P(-4.3, -1.65), "#38bdf8")
        gr = grille_pixels(3, 0.6, P(2.6, -1.05))
        self.au("la base", Indicate(sous2, color=BASE_C, scale_factor=1.05), rt=0.4)
        self.au("2 puissance", FadeIn(a.base, scale=1.3), n=2, rt=0.3)
        self.au("3, c'est", FadeIn(a.expo, scale=1.5), rt=0.3)
        self.au("8. 3", FadeIn(a8, shift=RIGHT * 0.2),
                LaggedStart(*[FadeIn(c, shift=DOWN * 0.3) for c in cu.values()], lag_ratio=0.1), rt=0.6)
        self.au("3 puissance", FadeIn(b.base, scale=1.3), rt=0.3)
        self.au("2, c'est", FadeIn(b.expo, scale=1.5), FadeIn(gr.cadre), FadeIn(gr.cases), rt=0.3)
        self.au("9. Ce", FadeIn(b9, shift=RIGHT * 0.2),
                LaggedStart(*[c.animate.set_fill("#38bdf8", 1) for ln in gr.cases for c in ln], lag_ratio=0.08),
                rt=0.6)
        fin = T("Ce n'est pas le même nombre !", 40, PIEGE).move_to(P(-0.9, -3.05))
        self.au("Ce n'est", FadeIn(fin, shift=UP * 0.15), FadeIn(neq2, scale=1.5), rt=0.4)
        self.insister(neq2, 1.4, 0.25)
        self.attendre_voix()

    # ── 06q : QUESTION 2 (2⁴ ?) ────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        p = puiss(2, 4, fs=110)
        eg = VGroup(T("=", 80), T("?", 80, EXPO_C))
        fig = VGroup(p, *eg).arrange(RIGHT, buff=0.3).move_to(P(-3.3, 1.55))
        seize = T("16", 80, VERT_OK).next_to(eg[0], RIGHT, buff=0.35)
        carres = self.carres(16, 4, 4, cote=0.42, centre=P(-3.3, -0.15))
        ordre = list(carres)

        def apres(sc):
            ph = sc.ph_q
            s1 = ph[0].original_text
            idx = [i for i, c in enumerate(s1) if c == "2"]
            cles = ("2 fois 2 fois 2 fois 2.", "2 fois 2 fois 2.", "2 fois 2.", "2. 8")
            vus = [0, 2, 4, 8, 16]
            av = {k + 1: [LaggedStart(*[FadeIn(c, scale=0.5) for c in ordre[vus[k]:vus[k + 1]]], lag_ratio=0.1)]
                  for k in range(4)}
            av[0] = [FadeOut(eg[1]), FadeIn(seize, scale=1.4)]
            sc.poser_mots(ph[0], [(0, "16. 2")] + list(zip(idx, cles)), avec=av)
            demi = SurroundingRectangle(VGroup(*ordre[:8]), color=PIEGE, buff=0.06, stroke_width=6)
            sc.poser_mots(ph[1], [("", "8, c'est"), ("2 ×", "2 fois 4"), ("4", "4 : le")],
                          avec={0: [Create(demi), VGroup(*ordre[8:]).animate.set_opacity(0.3)]})
            sc.insister(seize, 1.3, 0.25)
            sc.rep_fini()

        self.question_pause("06q-question", "06r-reponse",
                            ["Combien vaut 2 puissance 4 ?"],
                            [self.t("8", 36), self.t("16", 36), self.t("6", 36)], 1,
                            ["16 = 2 × 2 × 2 × 2", "8, c'est 2 × 4 : le piège."],
                            avant_q=self.question_au_mot(
                                [[("", "Combien"), ("2", "2 puissance"), ("4", "4 ?")]],
                                avec={0: {1: [FadeIn(p.base, scale=1.3)],
                                          2: [FadeIn(p.expo, scale=1.5), FadeIn(eg)]}}),
                            autres_r=apres)

    # ── 07 : défi : la biologiste et ses bactéries ─────────────────────────
    def labo(self, vue_c=P(-4.3, 1.15), r=1.15):
        bio = biologiste(0.78).move_to(P(-5.6, -1.35))
        mic = microscope(0.95).move_to(P(-3.55, -1.6))
        vue = Circle(radius=r, fill_color="#ecfccb", fill_opacity=1, stroke_color="#94a3b8", stroke_width=5
                     ).move_to(vue_c)
        lien = DashedLine(mic[4].get_top(), vue.get_bottom(), color="#94a3b8", stroke_width=3)
        return bio, mic, vue, lien

    def ecran_defi(self):
        self.ecran("07-defi", 0.5)
        tit = T("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-0.4, 3.12))
        self.au("À toi", Write(tit), rt=0.6)
        bio, mic, vue, lien = self.labo()
        met = T("biologiste", 30, BRANCHE).next_to(bio, DOWN, buff=0.15)
        self.au("laboratoire", FadeIn(mic, shift=UP * 0.2), rt=0.45)
        self.au("biologiste", FadeIn(bio, shift=UP * 0.2), FadeIn(met), rt=0.45)
        b = bacterie(1.6).move_to(vue)
        self.au("observe", Create(lien), FadeIn(vue, scale=0.7), rt=0.45)
        self.au("bactérie.", FadeIn(b, scale=1.5), rt=0.35)
        l1 = self.ligne_mots([("Elle se divise", WHITE), ("en 2", BASE_C)], 2.2, 36, xl=0.9)
        deux = VGroup(bacterie(1.4).move_to(vue.get_center() + LEFT * 0.42),
                      bacterie(1.4).move_to(vue.get_center() + RIGHT * 0.42))
        self.au("Elle se", FadeIn(l1[0], shift=RIGHT * 0.2), rt=0.3)
        self.au("2 toutes", FadeIn(l1[1], shift=RIGHT * 0.2), ReplacementTransform(b, deux), rt=0.3)
        l2 = self.ligne_mots([("toutes les", WHITE), ("20 minutes.", WHITE)], 1.6, 36, xl=0.9)
        self.au("toutes", FadeIn(l2[0], shift=RIGHT * 0.2), rt=0.3)
        self.au("20 minutes", FadeIn(l2[1], shift=RIGHT * 0.2), rt=0.3)
        l3 = self.ligne_mots([("Après", WHITE), ("5 divisions :", EXPO_C)], 0.95, 36, xl=0.9)
        self.au("Après", FadeIn(l3[0], shift=RIGHT * 0.2), rt=0.25)
        self.au("5 divisions", FadeIn(l3[1], scale=1.2), rt=0.3)
        l4 = self.ligne_mots([("combien de", ORANGE_RETENUE), ("bactéries ?", ORANGE_RETENUE)], 0.35, 36, xl=0.9)
        self.au("combien", FadeIn(l4[0], shift=RIGHT * 0.2), rt=0.3)
        self.au("de bactéries", FadeIn(l4[1], shift=RIGHT * 0.2), rt=0.3)
        l5 = self.ligne_mots([("Écris-le avec", WHITE), ("une puissance,", EXPO_C)], -0.45, 36, xl=0.9)
        self.au("Écris-le", FadeIn(l5[0], shift=RIGHT * 0.2), rt=0.3)
        self.au("une puissance", FadeIn(l5[1], shift=RIGHT * 0.2), rt=0.3)
        l6 = self.ligne_mots([("puis calcule.", WHITE)], -1.05, 36, xl=0.9)
        self.au("puis calcule", FadeIn(l6, shift=RIGHT * 0.2), rt=0.3)
        self.pause_defi(y=-1.95)

    # ── 07b : correction : 2, 4, 8, 16, 32 ─────────────────────────────────
    def ecran_correction(self):
        self.ecran("07b-correction", 0.5)
        tit = T("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.12))
        self.play(Write(tit), run_time=0.5)
        vue = Circle(radius=2.3, fill_color="#ecfccb", fill_opacity=1, stroke_color="#94a3b8", stroke_width=5
                     ).move_to(P(-3.65, -0.05))
        echelles = {1: 1.6, 2: 1.4, 4: 1.2, 8: 1.0, 16: 0.9, 32: 0.75}
        bact = [bacterie(1.6).move_to(vue)]
        cpt = T("1", 44, VERT_OK, audit=False).move_to(P(-3.65, -2.75))
        self.add(vue, *bact, cpt)
        l1 = self.ligne_mots([("À chaque division :", WHITE), ("× 2", BASE_C)], 2.3, 38, xl=0.9)
        self.au("À chaque", FadeIn(l1[0], shift=RIGHT * 0.2), rt=0.3)
        self.au("2. 5", FadeIn(l1[1], scale=1.3), rt=0.3)
        l2 = self.ligne_mots([("5 divisions :", EXPO_C)], 1.55, 38, xl=0.9)
        self.au("5 divisions", FadeIn(l2, shift=RIGHT * 0.2), rt=0.3)
        f5 = facteurs(2, 5, fs=46, buff=0.18)
        self.col(f5, 0.8, xl=0.9)
        cles = ("2 fois 2 fois 2 fois 2 fois 2,", "2 fois 2 fois 2 fois 2,", "2 fois 2 fois 2,", "2 fois 2,", "2, soit")
        for k, cle in enumerate(cles):
            self.au(cle, FadeIn(f5.nb[k], scale=1.3), *([FadeIn(f5.fois[k - 1])] if k else []), rt=0.22)
        p = puiss(2, 5, fs=64)
        l3 = VGroup(T("soit", 38), p).arrange(RIGHT, buff=0.3)
        self.col(l3, -0.05, xl=0.9)
        self.au("soit 2", FadeIn(l3[0]), rt=0.2)
        self.au("2 puissance", FadeIn(p.base, scale=1.3), rt=0.25)
        self.au("5. 2", FadeIn(p.expo, scale=1.5), rt=0.3)
        n = 1
        for cle, v in (("2, 4", 2), ("4, 8", 4), ("8, 16", 8), ("16, 32", 16), ("32 :", 32)):
            pl = places_grille(v, vue.get_center())
            neuves = [bacterie(echelles[v]).move_to(q) for q in pl]
            anims = [ReplacementTransform(bact[i], VGroup(neuves[2 * i], neuves[2 * i + 1])) for i in range(n)]
            nv = T(str(v), 44, VERT_OK).move_to(cpt)
            self.au(cle, *anims, FadeOut(cpt), FadeIn(nv, scale=1.3), rt=0.4)
            bact, cpt, n = neuves, nv, v
        l4 = self.ligne_mots([("=", VERT_OK), ("32 bactéries", VERT_OK)], -1.0, 46, xl=0.9)
        self.play(FadeIn(l4, scale=1.2), run_time=0.4)  # « 32 : 32 bactéries » : le 32 vient d'être dit
        cad = self.encadrer(l4)
        self.play(Create(cad), run_time=0.35)
        self.insister(VGroup(l4, cad), 1.12, 0.2)
        l5 = self.ligne_mots([("Pas", PIEGE), ("2 ×", PIEGE), ("5 =", PIEGE), ("10", PIEGE)], -2.0, 38, xl=0.9)
        self.au("Pas 2", FadeIn(l5[0], shift=RIGHT * 0.2), rt=0.2)
        self.au("2 fois 5", FadeIn(l5[1], shift=RIGHT * 0.2), rt=0.25)
        self.au("5, 10", FadeIn(l5[2], shift=RIGHT * 0.2), rt=0.3)
        self.au("10.", FadeIn(l5[3], scale=1.3), rt=0.3)
        barre = Line(l5[1].get_left() + LEFT * 0.06, l5[3].get_right() + RIGHT * 0.06, color=WHITE, stroke_width=5)
        self.play(Create(barre), run_time=0.3)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ───────────────────────────────────────────
    def ecran_finale(self):
        """« Ce que tu as appris » : titre EN HAUT ET CENTRÉ ; aⁿ dessiné à
        gauche (base bleue, exposant orange), les trois points à droite."""
        self.ecran("08-finale", 0.5)
        tit = T("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.au("Ce que", Write(tit), rt=0.7)
        p = puiss("a", "n", fs=150).move_to(P(-4.75, 0.6))
        lb = T("la base", 32, BASE_C).next_to(p.base, DOWN, buff=0.35)
        le = T("l'exposant", 32, EXPO_C).next_to(p.expo, UP, buff=0.3)

        def pt(morceaux, fs=34):
            bloc = VGroup(*[self.ligne(m, fs, buff=0.15) for m in morceaux]).arrange(DOWN, aligned_edge=LEFT,
                                                                                      buff=0.1)
            for f in bloc.get_family():
                f.sans_synchro = True
            return VGroup(self.coche(), bloc).arrange(RIGHT, buff=0.25)

        l1 = pt([[("aⁿ, c'est a écrit n fois", WHITE)], [("en facteur :", WHITE), ("a × a × … × a", BASE_C)]])
        l2 = pt([[("La base :", BASE_C), ("le nombre répété ;", WHITE)],
                 [("l'exposant", EXPO_C), ("compte les facteurs.", WHITE)]])
        l3 = pt([[("aⁿ, ce n'est pas", WHITE), ("a × n", PIEGE), ("!", WHITE)]])
        lignes = VGroup(l1, l2, l3).arrange(DOWN, aligned_edge=LEFT, buff=0.45)
        lignes.move_to(P(0, 0.75)).align_to(P(-2.55, 0), LEFT)
        if lignes.get_right()[0] > 6.5:
            lignes.scale_to_fit_width(6.5 + 2.55).align_to(P(-2.55, 0), LEFT)
        b1, b2, b3 = l1[1], l2[1], l3[1]
        self.au("a puissance", FadeIn(p, scale=0.8), Create(l1[0]), FadeIn(b1[0], shift=RIGHT * 0.2), rt=0.45)
        self.au("en facteur", FadeIn(b1[1], shift=RIGHT * 0.2), rt=0.35)
        self.au("La base", Create(l2[0]), FadeIn(b2[0], shift=RIGHT * 0.2), FadeIn(lb, shift=UP * 0.1),
                Indicate(p.base, color=BASE_C, scale_factor=1.2), rt=0.45)
        self.au("l'exposant", FadeIn(b2[1], shift=RIGHT * 0.2), FadeIn(le, shift=DOWN * 0.1),
                Indicate(p.expo, color=EXPO_C, scale_factor=1.4), rt=0.45)
        self.au("a puissance", Create(l3[0]), FadeIn(b3[0][0], shift=RIGHT * 0.2), n=2, rt=0.35)
        self.au("a fois n", FadeIn(b3[0][1:], shift=RIGHT * 0.2), rt=0.35)
        self.insister(b3[0][1], 1.3, 0.2)
        ep = VGroup(T("Épisode 2 :", 34, JAUNE_TITRE), T("calculer une puissance,", 34, WHITE),
                    T("même avec un nombre négatif", 34, WHITE)).arrange(DOWN, aligned_edge=LEFT, buff=0.1)
        ep.move_to(P(0, -2.55)).align_to(P(-2.55, 0), LEFT)
        if ep.get_right()[0] > 5.2:
            ep.scale_to_fit_width(5.2 + 2.55).align_to(P(-2.55, 0), LEFT)
        self.au("2 t'attend", FadeIn(ep[0], shift=UP * 0.15), rt=0.35)
        self.au("calculer", FadeIn(ep[1], shift=UP * 0.15), rt=0.35)
        self.au("même avec", FadeIn(ep[2], shift=UP * 0.15), rt=0.35)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_arbre()
        self.ecran_ecriture()
        self.ecran_question1()
        self.ecran_carre()
        self.ecran_cube()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")


class PuissanceComprendre4e(PuissanceComprendreBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "blanche"


class PuissanceComprendre3e(PuissanceComprendreBase):
    identite = "Maths 3e — EleveAI"
    ceinture = "blanche"
