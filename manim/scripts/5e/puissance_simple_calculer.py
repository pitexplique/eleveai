# puissance_simple_calculer.py
# EleveAI — Maths 5e — série « Carré et cube 5e », épisode 04 : CALCULER AVEC DES CARRÉS ET DES CUBES.
# Paysage 16:9, AVEC VOIX, ceinture JAUNE. Micro : puissance_simple_calculer (la puissance passe
# avant le reste, elle ne porte que sur le nombre juste avant elle).
# Décor et métier : Inès, soigneuse dans un zoo (enclos de tortues, volières). Centres : animaux,
# nature-ecologie.
# Écrans : garde (00) ; les deux enclos (01) ; la somme 6² + 4² (02) ; la règle 3 + 4² (03) ;
# QUESTION 1 (03q) ; le produit 2 × 5² (04) ; le piège (05) ; QUESTION 2 (05q) ; défi (06) et
# correction (06b) ; ce que tu as appris (07) ; fin (08).
# Code couleur : BLEU = le nombre (la base), ORANGE = l'exposant, VERT = résultat juste,
# ROUGE = piège (2 × 5 puis au carré).
# Exposants : le caractère ² ou ³ dans le Text ; il apparaît sur le mot « carré » / « cube »
# (_plan_eq surchargé ici : ² → « carré(s) », ³ → « cube », m → « mètres »).
# Voix : manim/voix/5e-puissance-calculer.json ; marques : puissance_simple_calculer_marques.json.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/5e/puissance_simple_calculer.py PuissanceSimpleCalculer5e --media_dir manim/scripts/5e/media-ps-04-dry
# Rendu : python -m manim render -qh --disable_caching manim/scripts/5e/puissance_simple_calculer.py PuissanceSimpleCalculer5e -o eleveai-maths-5e-puissance-calculer --media_dir manim/scripts/5e/media-ps-04
# Sortie : manim/sorties/5e/maths/puissance-simple/04-calculer/eleveai-maths-5e-puissance-calculer.mp4

import os
import re
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI.parent / "4e"))

from relatif_commun import *  # noqa: E402,F403
from relatif_commun import PAROLE  # noqa: E402

BASE_C = BLEU_CALCUL       # le nombre (la base)
EXPO_C = ORANGE_RETENUE    # l'exposant
HERBE = "#365314"
PAILLE = "#eab308"
BOIS = "#a16207"
CASE = "#94a3b8"
TUILE = "#60a5fa"
CIEL_V = "#0c4a6e"

# les mots qui disent un atome, au-delà de la table PAROLE
MOTIFS = {"²": r"carrés?", "³": r"cubes?", "m": r"mètres?"}


def colorer(e, verts=(), rouges=()):
    """Le nombre juste avant ² ou ³ en bleu, l'exposant en orange ; verts / rouges : atomes à colorer."""
    a = e.atomes
    for i, x in enumerate(a):
        if x.original_text in "²³":
            x.set_color(EXPO_C)
            if i and a[i - 1].original_text[0].isdigit():
                a[i - 1].set_color(BASE_C)
    for i in verts:
        a[i].set_color(VERT_OK)
    for i in rouges:
        a[i].set_color(PIEGE)
    return e


def idx(e, texte, n=1):
    """L'indice du n-ième atome qui s'écrit `texte`."""
    k = 0
    for i, a in enumerate(e.atomes):
        if a.original_text == texte:
            k += 1
            if k == n:
                return i
    raise ValueError(f"{texte} absent de {e.s}")


# ── les dessins ────────────────────────────────────────────────────────────

def ines(s=0.6):
    """Inès, soigneuse : la tenue kaki, la casquette, le seau de salades."""
    p = personne(peau="#c68642", tenue="#4d7c0f", cheveux="#111827", longs=True, s=s)
    casq = VGroup(
        AnnularSector(inner_radius=0, outer_radius=0.47 * s, angle=PI, start_angle=0, fill_color="#a16207",
                      fill_opacity=1, stroke_width=0),
        RoundedRectangle(width=0.62 * s, height=0.1 * s, corner_radius=0.04 * s, fill_color="#854d0e",
                         fill_opacity=1, stroke_width=0).shift(RIGHT * 0.36 * s + DOWN * 0.02 * s))
    casq.move_to(p.tete.get_top() + DOWN * 0.1 * s + RIGHT * 0.12 * s)
    seau = Polygon(P(-0.28, 0.25), P(0.28, 0.25), P(0.2, -0.25), P(-0.2, -0.25), fill_color="#64748b",
                   fill_opacity=1, stroke_color="#cbd5e1", stroke_width=2)
    anse = Arc(radius=0.27, start_angle=0, angle=PI, color="#cbd5e1", stroke_width=3).move_to(P(0, 0.4))
    salade = VGroup(*[Circle(radius=0.11, fill_color="#84cc16", fill_opacity=1, stroke_width=0).move_to(P(x, 0.3))
                      for x in (-0.13, 0.0, 0.13)])
    seau_g = VGroup(anse, salade, seau).scale(s).next_to(p.corps, RIGHT, buff=0.04 * s).align_to(p.corps, DOWN)
    return VGroup(p, casq, seau_g)


def tortue(s=0.3, c="#65a30d"):
    """Une tortue vue d'en haut."""
    peau = "#a3e635"
    pattes = VGroup(*[Ellipse(width=0.26, height=0.2, fill_color=peau, fill_opacity=1, stroke_width=0)
                      .move_to(P(x, y)) for x in (-0.3, 0.3) for y in (-0.3, 0.3)])
    tete = Circle(radius=0.14, fill_color=peau, fill_opacity=1, stroke_width=0).move_to(P(0.58, 0))
    carap = Ellipse(width=1.0, height=0.72, fill_color=c, fill_opacity=1, stroke_color="#1a2e05", stroke_width=2)
    motif = VGroup(RegularPolygon(6, fill_color="#4d7c0f", fill_opacity=1, stroke_width=0).scale(0.16),
                   *[RegularPolygon(6, fill_color="#4d7c0f", fill_opacity=1, stroke_width=0).scale(0.1)
                     .move_to(P(0.27 * np.cos(a), 0.2 * np.sin(a))) for a in np.linspace(0, 2 * PI, 6, endpoint=False)])
    return VGroup(pattes, tete, carap, motif).scale(s)


def oiseau(s=0.3, c="#f97316"):
    """Un petit oiseau de profil."""
    corps = Ellipse(width=0.8, height=0.5, fill_color=c, fill_opacity=1, stroke_width=0)
    tete = Circle(radius=0.2, fill_color=c, fill_opacity=1, stroke_width=0).move_to(P(0.36, 0.2))
    bec = Triangle(fill_color="#facc15", fill_opacity=1, stroke_width=0).scale(0.09).rotate(-PI / 2).move_to(P(0.62, 0.2))
    oeil = Dot(P(0.42, 0.26), radius=0.035, color=BLACK)
    aile = Ellipse(width=0.42, height=0.24, fill_color=interpolate_color(ManimColor(c), BLACK, 0.3),
                   fill_opacity=1, stroke_width=0).move_to(P(-0.08, 0.02)).rotate(-0.3)
    queue = Polygon(P(-0.35, 0.05), P(-0.62, 0.22), P(-0.6, -0.08), fill_color=c, fill_opacity=1, stroke_width=0)
    return VGroup(queue, corps, aile, tete, bec, oeil).scale(s)


def grille(n, cote, centre=ORIGIN, couleur=CASE, sw=1.5):
    """n rangées de n cases vides : g[r][c]."""
    g = VGroup()
    for r in range(n):
        g.add(VGroup(*[Square(cote, stroke_color=couleur, stroke_width=sw, fill_opacity=0) for _ in range(n)])
              .arrange(RIGHT, buff=0))
    return g.arrange(DOWN, buff=0).move_to(centre)


def remplir(g, c, rt=0.5, op=0.85):
    """Les rangées se remplissent l'une après l'autre."""
    return LaggedStart(*[r.animate.set_fill(c, op) for r in g], lag_ratio=0.35, run_time=rt)


class Enclos(VGroup):
    """Un enclos carré de n mètres : .sol (l'herbe), .cases (n × n m², cachées), .cloture."""

    def __init__(self, n, cote, centre=ORIGIN, **kw):
        super().__init__(**kw)
        w = n * cote
        self.sol = Square(w, fill_color=HERBE, fill_opacity=1, stroke_width=0)
        self.cases = grille(n, cote, couleur="#d9f99d", sw=1.2)
        self.cases.set_stroke(opacity=0)
        self.cloture = Square(w, stroke_color=BOIS, stroke_width=7, fill_opacity=0)
        poteaux = VGroup(*[Square(0.11, fill_color="#713f12", fill_opacity=1, stroke_width=0).move_to(p)
                           for p in [self.cloture.get_corner(v) for v in (UL, UR, DL, DR)]
                           + [self.cloture.point_from_proportion(t) for t in (0.125, 0.375, 0.625, 0.875)]])
        self.cloture = VGroup(self.cloture, poteaux)
        self.add(self.sol, self.cases, self.cloture)
        self.move_to(centre)


class Voliere(VGroup):
    """Une volière carrée de n mètres : .fond, .cases (le grillage, n × n), .cadre."""

    def __init__(self, n, cote, centre=ORIGIN, c="#f97316", **kw):
        super().__init__(**kw)
        w = n * cote
        self.fond = Square(w, fill_color=CIEL_V, fill_opacity=1, stroke_width=0)
        self.cases = grille(n, cote, couleur="#cbd5e1", sw=1.3)
        self.cadre = Square(w, stroke_color=WHITE, stroke_width=5, fill_opacity=0)
        self.oiseaux = VGroup(oiseau(w * 0.16, c).move_to(P(-w * 0.18, w * 0.15)),
                              oiseau(w * 0.13, "#22d3ee").flip(UP).move_to(P(w * 0.2, -w * 0.18)))
        self.add(self.fond, self.cases, self.oiseaux, self.cadre)
        self.move_to(centre)


def botte(s=0.42):
    """Une botte de paille (un petit cube en perspective)."""
    face = Square(s, fill_color=PAILLE, fill_opacity=1, stroke_color="#713f12", stroke_width=2)
    a, b, c = face.get_corner(UL), face.get_corner(UR), face.get_corner(DR)
    d = P(0.42 * s, 0.3 * s)
    dessus = Polygon(a, b, b + d, a + d, fill_color="#fde68a", fill_opacity=1, stroke_color="#713f12", stroke_width=2)
    cote_ = Polygon(b, c, c + d, b + d, fill_color="#a16207", fill_opacity=1, stroke_color="#713f12", stroke_width=2)
    return VGroup(face, dessus, cote_)


def cube_bottes(n=3, s=0.42, origine=ORIGIN):
    """Les n³ bottes, couche par couche : couches[j] (de bas en haut), dans l'ordre de peinture."""
    couches = []
    dx, dy = 0.42 * s, 0.3 * s
    for j in range(n):
        g = VGroup()
        for k in range(n - 1, -1, -1):
            for i in range(n):
                b = botte(s).move_to(origine + P(i * s + k * dx, j * s + k * dy))
                b.set_z_index(j * 100 - k * 10 + i)
                g.add(b)
        couches.append(g)
    return couches


class PuissanceSimpleCalculer5e(PaysageRel):
    nom_voix = "5e-puissance-calculer"
    fichier_marques = "puissance_simple_calculer_marques.json"
    identite = "Maths 5e — EleveAI"
    ceinture = "jaune"

    # ── la pose au mot : ² sur « carré », ³ sur « cube », m sur « mètres » ──
    def _plan_eq(self, e, debut, fin, sauf=()):
        voix, cur = self._texte_voix, debut
        plan = []
        for a in e.atomes:
            if any(a is x for x in sauf):
                continue
            mot = a.original_text
            motif = MOTIFS.get(mot, re.escape(PAROLE.get(mot, mot)))
            m = re.compile(r"(?<![\w,])" + motif + r"(?![\w])", re.I).search(voix, cur, fin)
            if m is None:
                plan.append((None, a))
            else:
                plan.append((m.start(), a))
                cur = m.end()
        lots = []
        for pos, a in plan:
            if pos is not None:
                lots.append([pos, [a]])
            elif a.original_text in ")],.:;?!" and lots:
                lots[-1][1].append(a)
            else:
                lots.append([None, [a]])
        for k in range(len(lots) - 2, -1, -1):
            if lots[k][0] is None:
                lots[k + 1][1] = lots[k][1] + lots[k + 1][1]
                lots[k][1] = []
        perdus = [a.original_text for lot in lots if lot[0] is None for a in lot[1]]
        if perdus:
            raise ValueError(f"{e.s} : {perdus} sans mot dans la voix {self._cle_voix}")
        return [lot for lot in lots if lot[1] and lot[0] is not None]

    def poser(self, e, phrase, gestes=None, n=1, rt=0.16, echelle=1.0, sauf=()):
        """Pose e au mot ; gestes = {indice d'atome: (fonction → animations, durée voulue)}."""
        gestes = gestes or {}
        debut = -1
        for _ in range(n):
            debut = self._texte_voix.find(phrase, debut + 1)
        if debut < 0:
            raise ValueError(f"« {phrase} » absent de la voix {self._cle_voix}")
        lots = self._plan_eq(e, debut, debut + len(phrase), sauf)
        for k, (pos, atomes) in enumerate(lots):
            self._attendre_pos(pos)
            d, ex = rt, []
            for a in atomes:
                g = gestes.get(e.atomes.index(a))
                if g:
                    f, dg = g if isinstance(g, tuple) else (g, 0.4)
                    ex += f()
                    d = max(d, dg)
            if k + 1 < len(lots):
                gap = self._debut_voix + self._t_pos(lots[k + 1][0]) - self.renderer.time
                d = max(0.08, min(d, gap - 0.01))
            self.play(*[FadeIn(a, scale=echelle) for a in atomes], *ex, run_time=d)
        return e

    def ph_poser(self, i, s, phrase, gestes=None):
        """Une ligne de la réponse d'une question-pause (verte), posée au mot avec ses gestes.
        La 1re ligne : « Réponse » apparaît tout de suite (la voix l'a déjà dit pendant la bascule)."""
        ref = self.ph_q[i]
        e = E(s, 30, couleur=VERT_OK, lettres="")
        e.scale_to_fit_width(ref.width).move_to(ref).align_to(ref, LEFT)
        sauf = ()
        if i == 0:
            self.play(FadeIn(e.atomes[0]), run_time=0.08)
            sauf = (e.atomes[0],)
        return self.poser(e, phrase, gestes, sauf=sauf)

    def ligne(self, s, x, y, fs=40, c=WHITE, maxw=None, verts=(), rouges=()):
        return colorer(self.lg(s, x, y, fs, c, maxw=maxw), verts, rouges)

    def cadre_vert(self, m):
        """Le cadre vert serré d'un résultat : il ne touche pas le signe = à sa gauche."""
        return SurroundingRectangle(m, color=VERT_OK, buff=0.07, stroke_width=4, corner_radius=0.06)

    def souligner(self, m, c=EXPO_C):
        return Line(m.get_corner(DL) + P(-0.05, -0.1), m.get_corner(DR) + P(0.05, -0.1), color=c, stroke_width=6)

    def q_ligne(self, s, phrase):
        """Dans avant_q : la ligne 0 de la question, colorée, posée au mot."""
        ref = self.q_q[0]
        e = colorer(E(s, 34, lettres=""))
        e.scale_to_fit_height(ref.height).move_to(ref)
        self.q_q.remove(ref)
        self.poser(e, phrase)
        return e

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Calculer avec des carrés et des cubes", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Calculer", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        t1 = tortue(1.0).move_to(P(-5.8, 0.75))
        t2 = tortue(0.8, "#4d7c0f").rotate(0.5).move_to(P(-5.0, -0.6))
        e = colorer(F("3 + 4²", 110)).move_to(P(-2.2, 0.2))
        self.poser(e, "3 plus 4 au carré", {0: (lambda: [FadeIn(t1, shift=RIGHT * 0.3), FadeIn(t2, shift=RIGHT * 0.3)], 0.3)},
                   echelle=1.3)
        q1 = self.lg("que calcule-t-on", 3.4, 0.75, 44, maxw=5.6)
        self.dit(q1, "que calcule-t-on")
        q2 = self.lg("en premier ?", 3.4, -0.1, 54, JAUNE_TITRE)
        plus, carre = e.atomes[1], VGroup(e.atomes[2], e.atomes[3])
        i1 = T("?", 60, JAUNE_TITRE, audit=False).next_to(plus, UP, buff=0.35)
        i2 = T("?", 60, JAUNE_TITRE, audit=False).next_to(carre, UP, buff=0.2)
        self.dit(q2, "en premier ?")
        self.play(FadeIn(i1, shift=DOWN * 0.2), FadeIn(i2, shift=DOWN * 0.2), run_time=0.35)
        self.insister(q2, 1.15, 0.2)
        self.attendre_voix(marge=0.8)

    # les deux enclos, aux mêmes places sur les écrans 01 et 02
    def enclos(self):
        g = Enclos(6, 0.5, P(-4.1, -0.75))
        p = Enclos(4, 0.5, P(-1.2, -1.25))
        tg = VGroup(tortue(0.75).move_to(g.get_center() + P(-0.6, 0.6)),
                    tortue(0.65, "#4d7c0f").rotate(2.6).move_to(g.get_center() + P(0.55, -0.55)))
        tp = VGroup(tortue(0.65).rotate(0.8).move_to(p.get_center() + P(0.05, 0.1)))
        l6 = T("6 m", 32, BASE_C).next_to(g, DOWN, buff=0.18)
        l4 = T("4 m", 32, BASE_C).next_to(p, DOWN, buff=0.18)
        return g, p, tg, tp, l6, l4

    # ── 01 : Inès et ses deux enclos ────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        ine = ines(0.75).move_to(P(-5.55, 2.25))
        g, p, tg, tp, l6, l4 = self.enclos()
        met = T("soigneuse", 30, CIEL, audit=False).next_to(ine, RIGHT, buff=0.3).shift(UP * 0.3)
        x = 3.15
        self.dit(self.lg("Inès est soigneuse", x, 3.0, 40, CIEL), "Inès est soigneuse",
                 avec=[FadeIn(ine, shift=UP * 0.3), FadeIn(met, shift=RIGHT * 0.2)])
        self.dit(self.lg("dans un zoo.", x, 2.4, 40, CIEL), "dans un zoo.")
        self.dit(self.lg("Elle prépare deux enclos carrés", x, 1.55, 34), "Elle prépare deux enclos carrés",
                 avec=[FadeIn(g.sol), Create(g.cloture), FadeIn(p.sol), Create(p.cloture)])
        self.dit(self.lg("pour des tortues :", x, 1.0, 34), "pour des tortues :",
                 avec=[FadeIn(tg, scale=0.6), FadeIn(tp, scale=0.6)])
        l1 = self.ligne("l'un de 6 m de côté,", x, 0.3, 36)
        l1.atomes[idx(l1, "6")].set_color(BASE_C)
        self.poser(l1, "l'un de 6 mètres de côté,", {idx(l1, "6"): (lambda: [FadeIn(l6, shift=UP * 0.15)], 0.3)})
        l2 = self.ligne("l'autre de 4 m.", x, -0.3, 36)
        l2.atomes[idx(l2, "4")].set_color(BASE_C)
        self.poser(l2, "l'autre de 4 mètres.", {idx(l2, "4"): (lambda: [FadeIn(l4, shift=UP * 0.15)], 0.3)})
        q1 = self.lg("Quelle surface doit-elle", x, -1.15, 40, JAUNE_TITRE, maxw=5.4)
        self.dit(q1, "Quelle surface doit-elle")
        q2 = self.lg("couvrir de paille ?", x - 0.3, -1.8, 40, JAUNE_TITRE)
        self.dit(q2, "couvrir de paille ?")
        self.play(g.sol.animate.set_fill(PAILLE, 0.9), p.sol.animate.set_fill(PAILLE, 0.9), run_time=0.6)
        self.insister(q2, 1.1, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 02 : 6² + 4² ────────────────────────────────────────────────────────
    def ecran_somme(self):
        self.ecran("02-somme")
        g, p, tg, tp, l6, l4 = self.enclos()
        for m in (l6, l4):
            m._pas_audit = True
        self.add(g, p, tg, tp, l6, l4)
        a36 = T("36 m²", 40, VERT_OK).move_to(g)
        a16 = T("16 m²", 34, VERT_OK).move_to(p)
        fond36 = BackgroundRectangle(a36, color=BLACK, fill_opacity=0.55, buff=0.08)
        fond16 = BackgroundRectangle(a16, color=BLACK, fill_opacity=0.55, buff=0.08)
        x = 3.15
        l0 = self.lg("Aire d'un carré : côté × côté.", x, 3.0, 36, CIEL, maxw=6.4)
        haut = Line(g.get_corner(UL) + UP * 0.15, g.get_corner(UR) + UP * 0.15, color=BASE_C, stroke_width=6)
        gauche = Line(g.get_corner(UL) + LEFT * 0.15, g.get_corner(DL) + LEFT * 0.15, color=BASE_C, stroke_width=6)
        self.poser(l0, "Aire d'un carré : côté fois côté.",
                   {idx(l0, "côté"): (lambda: [Create(haut)], 0.3), idx(l0, "côté", 2): (lambda: [Create(gauche)], 0.3)})
        self.play(FadeOut(tg), FadeOut(tp), g.cases.animate.set_stroke(opacity=1), p.cases.animate.set_stroke(opacity=1),
                  run_time=0.4)
        l1 = self.ligne("Grand enclos : 6² = 36 m²", x, 2.0, 40, verts=(6, 7, 8))
        self.poser(l1, "Grand enclos : 6 au carré, 36 mètres carrés.",
                   {idx(l1, "6"): (lambda: [remplir(g.cases, PAILLE, 0.6)], 0.6),
                    idx(l1, "36"): (lambda: [FadeIn(fond36), FadeIn(a36, scale=1.3)], 0.3)})
        l2 = self.ligne("Petit enclos : 4² = 16 m²", x, 1.2, 40, verts=(6, 7, 8))
        self.poser(l2, "Petit enclos : 4 au carré, 16 mètres carrés.",
                   {idx(l2, "4"): (lambda: [remplir(p.cases, PAILLE, 0.5)], 0.5),
                    idx(l2, "16"): (lambda: [FadeIn(fond16), FadeIn(a16, scale=1.3)], 0.3)})
        self.play(FadeOut(haut), FadeOut(gauche), run_time=0.2)
        l3 = self.ligne("En tout : 6² + 4²", x, 0.1, 46)
        self.poser(l3, "En tout : 6 au carré plus 4 au carré,", {0: (lambda: [Indicate(g.cloture, color=PAILLE), Indicate(p.cloture, color=PAILLE)], 0.4)})
        l4_ = self.ligne("= 36 + 16 = 52 m²", x, -0.75, 48, verts=(5, 6, 7))
        cadre = SurroundingRectangle(VGroup(g, p), color=VERT_OK, buff=0.12, stroke_width=4)
        self.poser(l4_, "36 plus 16 : 52 mètres carrés.", {idx(l4_, "52"): (lambda: [Create(cadre)], 0.35)})
        self.play(Create(self.cadre_vert(VGroup(*l4_.atomes[5:]))), run_time=0.25)
        self.insister(VGroup(*l4_.atomes[5:]), 1.15, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 03 : la règle : 3 + 4² ──────────────────────────────────────────────
    def ecran_priorite(self):
        self.ecran("03-priorite")
        r = self.lg("La règle : la puissance passe avant le reste.", 0, 3.05, 42, JAUNE_TITRE, maxw=12.2)
        self.dit(r, "La règle : la puissance passe avant le reste.")
        self.play(Create(SurroundingRectangle(r, color=JAUNE_TITRE, buff=0.16, corner_radius=0.1, stroke_width=4)), run_time=0.3)
        trois = VGroup(*[Square(0.55, fill_color=WHITE, fill_opacity=0.85, stroke_color="#0f172a", stroke_width=2)
                         for _ in range(3)]).arrange(DOWN, buff=0.08).move_to(P(-5.6, -0.4))
        carre = grille(4, 0.55, P(-3.35, -0.4), couleur=CASE, sw=2)
        cadre4 = Square(2.2, stroke_color=BASE_C, stroke_width=4).move_to(carre)
        e = colorer(F("3 + 4²", 90)).move_to(P(2.0, 1.55))
        self.poser(e, "3 plus 4 au carré :", {0: (lambda: [FadeIn(trois, shift=RIGHT * 0.2)], 0.3),
                                               2: (lambda: [Create(cadre4), FadeIn(carre)], 0.3)}, echelle=1.3)
        sous = self.souligner(VGroup(e.atomes[2], e.atomes[3]))
        l2 = self.ligne("d'abord 4² = 16,", 2.0, 0.3, 50, maxw=7.0, verts=(6,))
        a16 = T("16", 60, VERT_OK).move_to(carre)
        self.poser(l2, "d'abord 4 au carré, 16.", {0: (lambda: [Create(sous)], 0.3),
                                                    idx(l2, "4"): (lambda: [remplir(carre, TUILE, 0.5)], 0.5),
                                                    idx(l2, "16"): (lambda: [FadeIn(a16, scale=1.4)], 0.3)})
        l3 = self.ligne("puis 3 + 16 = 19.", 2.0, -0.9, 50, maxw=7.0, verts=(5,))
        cible = VGroup(*[m.copy() for m in trois])
        cible.arrange(DOWN, buff=0.0).next_to(cadre4, RIGHT, buff=0.0).align_to(cadre4, UP)
        tout = VGroup(cadre4, cible)
        cad = SurroundingRectangle(tout, color=VERT_OK, buff=0.12, stroke_width=4)
        a19 = T("19", 44, VERT_OK).next_to(cad, DOWN, buff=0.18)
        self.poser(l3, "Puis 3 plus 16 : 19.", {idx(l3, "3"): (lambda: [Transform(trois, cible)], 0.45),
                                                 idx(l3, "19"): (lambda: [Create(cad), FadeIn(a19, scale=1.3)], 0.35)})
        self.play(Create(self.cadre_vert(l3.atomes[5])), run_time=0.25)
        self.attendre_voix(marge=0.8)

    # ── 03q : QUESTION 1 ────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = -2.2
        deux = VGroup(*[Square(0.4, fill_color=WHITE, fill_opacity=0.85, stroke_color="#0f172a", stroke_width=2)
                        for _ in range(2)]).arrange(DOWN, buff=0.08).move_to(P(-6.0, 0.4))
        car = grille(5, 0.4, P(-4.4, -0.0), couleur=CASE, sw=2)
        cadre = Square(2.0, stroke_color=BASE_C, stroke_width=4).move_to(car)

        def avant(sc):
            sc.q_ligne("Combien vaut 2 + 5² ?", "Combien vaut 2 plus 5 au carré ?")
            sc.play(FadeIn(deux), FadeIn(car), Create(cadre), run_time=0.35)

        def apres(sc):
            a25 = T("25", 48, VERT_OK).move_to(car)
            sc.ph_poser(0, "Réponse B : 27.", "Réponse B : 27.")
            sc.ph_poser(1, "D'abord 5² = 25.", "D'abord 5 au carré, 25.",
                        {3: (lambda: [remplir(car, TUILE, 0.5)], 0.5), 6: (lambda: [FadeIn(a25, scale=1.3)], 0.3)})
            sc.ph_poser(2, "Puis 2 + 25.", "Puis 2 plus 25.",
                        {1: (lambda: [Indicate(deux, color=VERT_OK)], 0.4)})
            sc.rep_fini()

        self.question_pause("03q-question", "03r-reponse", ["Combien vaut 2 + 5² ?"],
                            [E("49", 40, lettres=""), E("27", 40, lettres=""), E("12", 40, lettres="")], 1,
                            ["Réponse B : 27.", "D'abord 5² = 25.", "Puis 2 + 25."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 04 : 2 × 5² ─────────────────────────────────────────────────────────
    def ecran_produit(self):
        self.ecran("04-produit")
        v1 = Voliere(5, 0.4, P(-4.95, -0.6))
        v2 = Voliere(5, 0.4, P(-2.35, -0.6), c="#e11d48")
        l5a = T("5 m", 30, BASE_C).next_to(v1, DOWN, buff=0.18)
        l5b = T("5 m", 30, BASE_C).next_to(v2, DOWN, buff=0.18)
        x = 3.1
        self.dit(self.lg("Avec une multiplication, pareil.", x, 3.0, 38, CIEL, maxw=6.6), "Avec une multiplication, pareil.")
        l1 = self.lg("Inès construit 2 volières", x, 2.2, 36)
        self.poser(l1, "Inès construit 2 volières", {idx(l1, "volières"): (lambda: [FadeIn(v1, shift=UP * 0.2), FadeIn(v2, shift=UP * 0.2)], 0.4)})
        l2 = self.lg("carrées de 5 m de côté.", x, 1.6, 36)
        l2.atomes[idx(l2, "5")].set_color(BASE_C)
        self.poser(l2, "carrées de 5 mètres de côté.", {idx(l2, "5"): (lambda: [FadeIn(l5a), FadeIn(l5b)], 0.3)})
        e = colorer(F("2 × 5²", 72)).move_to(P(x, 0.55))
        self.poser(e, "2 fois 5 au carré :", echelle=1.3)
        sous = self.souligner(VGroup(e.atomes[2], e.atomes[3]))
        l3 = self.ligne("d'abord 5² = 25,", x, -0.45, 46, verts=(6,))
        a1 = T("25", 44, VERT_OK).move_to(v1)
        a2 = T("25", 44, VERT_OK).move_to(v2)
        f1 = BackgroundRectangle(a1, color=BLACK, fill_opacity=0.6, buff=0.06)
        f2 = BackgroundRectangle(a2, color=BLACK, fill_opacity=0.6, buff=0.06)
        self.poser(l3, "d'abord 5 au carré, 25.", {0: (lambda: [Create(sous)], 0.3),
                                                    idx(l3, "5"): (lambda: [remplir(v1.cases, TUILE, 0.5, 0.6)], 0.5),
                                                    idx(l3, "25"): (lambda: [FadeIn(f1), FadeIn(a1, scale=1.3)], 0.3)})
        l4 = self.ligne("puis 2 × 25 = 50 m²", x, -1.35, 46, verts=(5, 6, 7))
        cad = SurroundingRectangle(VGroup(v1, v2), color=VERT_OK, buff=0.12, stroke_width=4)
        self.poser(l4, "Puis 2 fois 25 : 50 mètres carrés.",
                   {idx(l4, "2"): (lambda: [remplir(v2.cases, TUILE, 0.4, 0.6)], 0.4),
                    idx(l4, "25"): (lambda: [FadeIn(f2), FadeIn(a2, scale=1.3)], 0.3),
                    idx(l4, "50"): (lambda: [Create(cad)], 0.35)})
        self.play(Create(self.cadre_vert(VGroup(*l4.atomes[5:]))), run_time=0.25)
        self.attendre_voix(marge=0.8)

    # ── 05 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        t = self.lg("Le piège : calculer de gauche à droite.", 0, 3.1, 42, PIEGE, maxw=12)
        rap = colorer(F("2 × 5²", 90).sans_audit()).move_to(P(-3.6, 1.55))
        fl = Arrow(rap.get_corner(DL) + P(-0.1, -0.2), rap.get_corner(DR) + P(0.1, -0.2), color=PIEGE, buff=0, stroke_width=6)
        self.poser(t, "Le piège : calculer de gauche à droite.",
                   {0: (lambda: [FadeIn(rap)], 0.3), idx(t, "gauche"): (lambda: [GrowArrow(fl)], 0.4)})
        v1 = Voliere(5, 0.22, P(1.05, 1.3))
        v2 = Voliere(5, 0.22, P(2.35, 1.3), c="#e11d48")
        gros = grille(10, 0.22, P(4.85, 1.3), couleur="#fca5a5", sw=1)
        gcad = Square(2.2, stroke_color=PIEGE, stroke_width=5).move_to(gros)
        l1 = self.ligne("2 × 5 = 10,", -3.6, -0.1, 50, c=PIEGE)
        self.poser(l1, "2 fois 5, 10,", {0: (lambda: [FadeIn(v1), FadeIn(v2)], 0.3)})
        l2 = self.ligne("puis 10² = 100 ?", -3.6, -1.0, 50, c=PIEGE, rouges=(1, 2))
        self.poser(l2, "puis 10 au carré, 100 ?", {idx(l2, "10"): (lambda: [Create(gcad)], 0.35),
                                                    idx(l2, "100"): (lambda: [FadeIn(gros)], 0.3)})
        faux = self.verdict("Faux !", PIEGE, 46).move_to(P(4.85, -0.35))
        croix = VGroup(Line(gcad.get_corner(UL), gcad.get_corner(DR)), Line(gcad.get_corner(DL), gcad.get_corner(UR))).set_stroke(PIEGE, 7)
        self.au("Faux", Create(self.barrer(l1)), Create(self.barrer(l2)), Create(croix), FadeIn(faux, scale=1.4), rt=0.35)
        l3 = self.lg("Le carré ne porte que sur le 5,", -0.6, -2.1, 40, maxw=10)
        l3.atomes[-2].set_color(BASE_C)
        arc = CurvedArrow(rap.atomes[3].get_top() + UP * 0.08, rap.atomes[2].get_top() + UP * 0.12 + RIGHT * 0.05,
                          angle=2.2, color=EXPO_C, stroke_width=6, tip_length=0.22)
        self.poser(l3, "Le carré ne porte que sur le 5,",
                   {idx(l3, "5"): (lambda: [Create(arc), Indicate(rap.atomes[2], color=BASE_C, scale_factor=1.3),
                                            v1.cadre.animate.set_stroke(VERT_OK), v2.cadre.animate.set_stroke(VERT_OK)], 0.45)})
        l4 = self.lg("le nombre juste avant lui.", -0.6, -2.85, 46, JAUNE_TITRE, maxw=10)
        self.dit(l4, "le nombre juste avant lui.")
        self.insister(l4, 1.1, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 05q : QUESTION 2 ────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = -2.2
        car = grille(10, 0.24, P(-4.55, -0.1), couleur=CASE, sw=1.2)
        cadre = Square(2.4, stroke_color=BASE_C, stroke_width=4).move_to(car)
        coin = VGroup(*[car[r][c] for r in range(6) for c in range(6)])
        coin_cad = SurroundingRectangle(coin, color=PIEGE, buff=0, stroke_width=5)

        def avant(sc):
            sc.q_ligne("Combien vaut 10² − 6² ?", "Combien vaut 10 au carré moins 6 au carré ?")
            sc.play(FadeIn(car), Create(cadre), run_time=0.35)

        def apres(sc):
            sc.ph_poser(0, "Réponse B : 64.", "Réponse B : 64.")
            sc.ph_poser(1, "100 − 36.", "100 moins 36.",
                        {0: (lambda: [remplir(car, TUILE, 0.4, 0.75)], 0.4),
                         2: (lambda: [Create(coin_cad), coin.animate.set_fill(BLACK, 0.85)], 0.4)})
            sc.ph_poser(2, "Ce n'est pas 4².", "Ce n'est pas 4 au carré.")
            sc.rep_fini()

        self.question_pause("05q-question", "05r-reponse", ["Combien vaut 10² − 6² ?"],
                            [E("16", 40, lettres=""), E("64", 40, lettres=""), E("4", 40, lettres="")], 1,
                            ["Réponse B : 64.", "100 − 36.", "Ce n'est pas 4²."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 06 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("06-defi")
        tit = T("À toi de jouer !", 56, JAUNE_TITRE).move_to(P(0, 3.0))
        self.au("À toi", Write(tit), rt=0.5)
        ine = ines(0.55).move_to(P(-5.7, 0.75))
        self.play(FadeIn(ine, shift=UP * 0.2), run_time=0.3)
        cal = T("Calcule :", 40, CIEL).move_to(P(-2.6, 1.95))
        self.au("Calcule", FadeIn(cal, shift=RIGHT * 0.2), rt=0.3)
        e1 = colorer(F("4 + 3³", 72)).move_to(P(-2.3, 1.0))
        quatre = VGroup(*[botte(0.38) for _ in range(4)]).arrange(RIGHT, buff=0.1).move_to(P(1.4, 0.75))
        gros = botte(1.14).move_to(P(3.95, 1.05))
        q1 = T("?", 64, JAUNE_TITRE, audit=False).move_to(gros[0])
        self.poser(e1, "4 plus 3 au cube,", {0: (lambda: [FadeIn(quatre, lag_ratio=0.2)], 0.35),
                                             3: (lambda: [FadeIn(gros, scale=0.6), FadeIn(q1)], 0.35)}, echelle=1.3)
        e2 = colorer(F("3 × 2²", 72)).move_to(P(-2.3, -0.75))
        puis = T("puis", 36, CIEL).next_to(e2, LEFT, buff=0.35)
        petits = VGroup(*[grille(2, 0.45) for _ in range(3)]).arrange(RIGHT, buff=0.35).move_to(P(2.4, -0.75))
        petits.set_stroke(PAILLE, 3)
        q2 = VGroup(*[T("?", 40, JAUNE_TITRE, audit=False).move_to(g) for g in petits])
        self.poser(e2, "3 fois 2 au carré.",
                   {0: (lambda: [FadeIn(puis), FadeIn(petits, lag_ratio=0.2)], 0.35), 3: (lambda: [FadeIn(q2)], 0.3)},
                   echelle=1.3)
        pz = T("Mets pause, et cherche !", 40, ORANGE_RETENUE).move_to(P(-0.4, -2.45))
        self.au("Mets pause", Write(pz), rt=0.5)
        self.attendre_voix(marge=2.0)

    # ── 06b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        self.ecran("06b-correction")
        self.au("Correction", FadeIn(T("Correction", 46, JAUNE_TITRE).move_to(P(0, 3.2))), rt=0.25)
        couches = cube_bottes(3, 0.4, P(-5.9, 0.75))
        cube = VGroup(*couches)
        quatre = VGroup(*[botte(0.4) for _ in range(4)]).arrange(RIGHT, buff=0.08).move_to(P(-2.25, 0.95))
        x = 2.6
        l1 = self.ligne("3³ d'abord : 27.", x, 2.25, 44, verts=(6,))
        a27 = T("27", 40, VERT_OK).next_to(cube, DOWN, buff=0.15)
        self.poser(l1, "3 au cube d'abord : 27.",
                   {1: (lambda: [LaggedStart(*[FadeIn(c, shift=DOWN * 0.3, lag_ratio=0.05) for c in couches],
                                             lag_ratio=0.4)], 0.7),
                    idx(l1, "27"): (lambda: [FadeIn(a27, scale=1.3)], 0.3)})
        l2 = self.ligne("Puis 4 + 27 = 31.", x, 1.45, 44, verts=(5,))
        cad1 = SurroundingRectangle(VGroup(cube, quatre), color=VERT_OK, buff=0.12, stroke_width=4)
        self.poser(l2, "Puis 4 plus 27 : 31.", {idx(l2, "4"): (lambda: [FadeIn(quatre, lag_ratio=0.15)], 0.35),
                                                 idx(l2, "31"): (lambda: [Create(cad1)], 0.3)})
        self.play(Create(self.cadre_vert(l2.atomes[5])), run_time=0.2)
        petits = VGroup(*[grille(2, 0.45) for _ in range(3)]).arrange(RIGHT, buff=0.35).move_to(P(-3.6, -1.35))
        petits.set_stroke(PAILLE, 3)
        quatres = VGroup(*[T("4", 40, VERT_OK).move_to(g) for g in petits])
        l3 = self.ligne("Ensuite, 2² d'abord : 4.", x, 0.1, 44, maxw=7.0, verts=(8,))
        self.poser(l3, "Ensuite, 2 au carré d'abord : 4.",
                   {0: (lambda: [FadeIn(petits, lag_ratio=0.2)], 0.35),
                    idx(l3, "2"): (lambda: [remplir(VGroup(*[r for g in petits for r in g]), PAILLE, 0.4, 0.75)], 0.4),
                    idx(l3, "4"): (lambda: [FadeIn(quatres, scale=1.3)], 0.3)})
        l4 = self.ligne("Puis 3 × 4 = 12.", x, -0.7, 44, verts=(5,))
        cad2 = SurroundingRectangle(petits, color=VERT_OK, buff=0.12, stroke_width=4)
        self.poser(l4, "Puis 3 fois 4 : 12.", {idx(l4, "12"): (lambda: [Create(cad2)], 0.3)})
        self.play(Create(self.cadre_vert(l4.atomes[5])), run_time=0.2)
        l5 = self.lg("Pas 36 !", x, -1.6, 46, PIEGE)
        self.poser(l5, "Pas 36 !")
        self.play(Create(self.barrer(l5.atomes[1])), run_time=0.25)
        self.attendre_voix(marge=1.0)

    # ── 07 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("07-finale", 0.5)
        self.XL = -1.5
        car = grille(4, 0.4)
        remplie = car.copy().set_fill(TUILE, 0.85)
        trois = VGroup(*[Square(0.4, fill_color=WHITE, fill_opacity=0.85, stroke_color="#0f172a", stroke_width=2)
                         for _ in range(3)]).arrange(DOWN, buff=0).next_to(remplie, RIGHT, buff=0).align_to(remplie, UP)
        expr = colorer(F("3 + 4² = 19", 44).sans_audit(), verts=(5,))
        fig = VGroup(VGroup(remplie, trois), expr)
        expr.next_to(fig[0], DOWN, buff=0.35)
        lignes = self.finale_colonne([["Dans un calcul, la puissance", "passe en premier."],
                                      ["Elle ne porte que sur", "le nombre juste avant elle."],
                                      ["Ensuite viennent les multiplications,", "puis les additions et les soustractions."]],
                                     fs=38, figure=fig)
        self.XL = type(self).XL
        self.play(FadeIn(fig), run_time=0.25)
        for lg in lignes:
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.2)

    def construct(self):
        ecrans = [self.page_de_garde, self.ecran_situation, self.ecran_somme, self.ecran_priorite,
                  self.ecran_question1, self.ecran_produit, self.ecran_piege, self.ecran_question2,
                  self.ecran_defi, self.ecran_correction, self.ecran_finale,
                  lambda: self.page_abonnement("08-abonne")]
        # ECRANS=4,6 : seulement ces écrans (contrôle en dry run) ; sans la variable, toute la vidéo
        choix = os.environ.get("ECRANS")
        for k, f in enumerate(ecrans):
            if choix is None or str(k) in choix.split(","):
                f()
