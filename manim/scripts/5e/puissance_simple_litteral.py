# puissance_simple_litteral.py
# EleveAI — Maths 5e — série « Carré et cube », épisode 05 : CALCULER x², a³ QUAND ON CONNAÎT LA LETTRE.
# Paysage 16:9, AVEC VOIX, ceinture JAUNE. Micro : puissance_simple_litteral (remplacer la lettre par
# sa valeur, la puissance d'abord, le carré ne porte que sur la lettre juste avant lui).
# Décor et métier : Clara, ingénieure spatiale (panneaux solaires carrés, satellite cubique).
# Centres : espace, sciences.
# Écrans : garde (00) ; le panneau de côté c (01) ; on remplace c par 3 (02) ; x² + 5 pour x = 4 (03) ;
# QUESTION 1 (03q) ; le cube a³ (04) ; le piège 3x² (05) ; QUESTION 2 (05q) ; défi (06) et
# correction (06b) ; ce que tu as appris (07) ; fin (08).
# Code couleur : BLEU = la base (la lettre ou le nombre), ORANGE = l'exposant, VERT = résultat juste,
# ROUGE = piège. L'exposant ² / ³ est un atome de la ligne, posé au mot « carré » / « cube ».
# Voix : manim/voix/5e-puissance-litteral.json ; marques : puissance_simple_litteral_marques.json.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/5e/puissance_simple_litteral.py PuissanceSimpleLitteral5e --media_dir manim/scripts/5e/media-ps-05-dry
# Rendu : python -m manim render -qh --disable_caching manim/scripts/5e/puissance_simple_litteral.py PuissanceSimpleLitteral5e -o eleveai-maths-5e-puissance-litteral --media_dir manim/scripts/5e/media-ps-05
# Sortie : manim/sorties/5e/maths/puissance-simple/05-litteral/eleveai-maths-5e-puissance-litteral.mp4

import sys
from pathlib import Path

ICI5 = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI5.parent / "4e"))

from div_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402

# l'exposant se pose au mot qui le dit
PAROLE["²"] = "carré"
PAROLE["³"] = "cube"

BASE_C = BLEU_CALCUL
EXPO_C = ORANGE_RETENUE
CELLULE = "#1e3a8a"
CELLULE_ON = "#38bdf8"
MODULE = "#e2e8f0"
OR_SAT = "#d4a017"


def M(s, fs=44, c=WHITE, lettres="xca", teinte=True):
    """Une ligne posée au mot : lettres en bleu, ² ³ en orange, le nombre juste avant ² ³ en bleu."""
    e = E(s, fs, c, lettres=lettres, inconnue=BASE_C)
    if teinte:
        for i, a in enumerate(e.atomes):
            if a.original_text in "²³":
                a.set_color(EXPO_C)
                if i and e.atomes[i - 1].original_text.isdigit():
                    e.atomes[i - 1].set_color(BASE_C)
    else:
        for a in e.atomes:
            a.set_color(c)
    return e


def couleur_atomes(e, textes, c):
    for a in e.atomes:
        if a.original_text in textes:
            a.set_color(c)
    return e


# ── les dessins ────────────────────────────────────────────────────────────

def clara(s=0.6):
    """Clara, ingénieure spatiale : combinaison bleu nuit, casque-micro de mission, écusson."""
    p = personne(peau="#8d5524", tenue="#1e3a8a", cheveux="#111827", longs=True, s=s)
    c = p.tete.get_center()
    r = p.tete.width / 2
    arceau = Arc(radius=r * 1.12, start_angle=0.1, angle=PI - 0.2, arc_center=c, stroke_color="#cbd5e1",
                 stroke_width=7)
    oreilles = VGroup(*[RoundedRectangle(width=r * 0.42, height=r * 0.7, corner_radius=r * 0.15,
                                         fill_color="#64748b", fill_opacity=1, stroke_width=0)
                        .move_to(c + RIGHT * x * r * 1.05) for x in (-1, 1)])
    micro = VGroup(Line(c + RIGHT * r * 1.05 + DOWN * r * 0.2, c + P(r * 0.35, -r * 0.72), color="#cbd5e1",
                        stroke_width=4),
                   Dot(c + P(r * 0.35, -r * 0.72), radius=r * 0.1, color="#cbd5e1"))
    h = p.corps.get_top()[1]
    ecusson = VGroup(Circle(radius=0.17 * s, fill_color=WHITE, fill_opacity=1, stroke_color=EXPO_C, stroke_width=3),
                     Star(5, outer_radius=0.1 * s, inner_radius=0.045 * s, fill_color="#1d4ed8", fill_opacity=1,
                          stroke_width=0))
    ecusson.move_to(P(p.corps.get_center()[0] - 0.22 * s, h - 0.45 * s))
    return VGroup(p, arceau, oreilles, micro, ecusson)


def aile(lignes=2, colonnes=3, cote=0.36):
    return VGroup(*[Square(cote, fill_color=CELLULE, fill_opacity=1, stroke_color="#93c5fd", stroke_width=2)
                    .move_to(P((j - (colonnes - 1) / 2) * cote, ((lignes - 1) / 2 - i) * cote))
                    for i in range(lignes) for j in range(colonnes)])


def satellite(s=1.0):
    """Un satellite : le corps doré, l'antenne, deux ailes de panneaux solaires carrés (.ailes)."""
    corps = Square(0.8, fill_color=OR_SAT, fill_opacity=1, stroke_color="#92400e", stroke_width=3)
    deco = VGroup(Line(P(-0.4, 0.13), P(0.4, 0.13), color="#92400e", stroke_width=2),
                  Line(P(-0.4, -0.13), P(0.4, -0.13), color="#92400e", stroke_width=2))
    tige = Line(P(-1.7, 0), P(1.7, 0), color="#94a3b8", stroke_width=4)
    ailes = VGroup(aile().move_to(P(-1.2, 0)), aile().move_to(P(1.2, 0)))
    mat = Line(P(0, 0.4), P(0, 0.72), color="#94a3b8", stroke_width=4)
    parabole = Arc(radius=0.26, start_angle=PI + 0.5, angle=PI - 1.0, arc_center=P(0, 1.02), color=WHITE,
                   stroke_width=4)
    g = VGroup(tige, ailes, corps, deco, mat, parabole).scale(s)
    g.ailes = ailes
    return g


def etoiles(n, x0, x1, y0, y1, graine=3):
    rng = np.random.default_rng(graine)
    return VGroup(*[Dot(P(rng.uniform(x0, x1), rng.uniform(y0, y1)), radius=rng.uniform(0.015, 0.035),
                        color=WHITE, fill_opacity=rng.uniform(0.35, 0.8)) for _ in range(n)])


def panneau(n, cote, centre=ORIGIN):
    """Un panneau carré de n × n cellules (vides) : .cases[r][c], .cadre."""
    cases = VGroup(*[VGroup(*[Square(cote, fill_color=CELLULE, fill_opacity=1, stroke_color="#93c5fd",
                                     stroke_width=2) for _ in range(n)]).arrange(RIGHT, buff=0) for _ in range(n)])
    cases.arrange(DOWN, buff=0).move_to(centre)
    cadre = Square(n * cote, stroke_color=WHITE, stroke_width=5).move_to(centre)
    g = VGroup(cases, cadre)
    g.cases, g.cadre = cases, cadre
    return g


def carre_lettre(cote, centre, lettre="c", fs=40):
    """Le panneau de côté inconnu : un carré plein et la lettre sur deux côtés (.bas, .gauche)."""
    sq = Square(cote, fill_color=CELLULE, fill_opacity=1, stroke_color=WHITE, stroke_width=5).move_to(centre)
    bas = T(lettre, fs, BASE_C).next_to(sq, DOWN, buff=0.16)
    gauche = T(lettre, fs, BASE_C).next_to(sq, LEFT, buff=0.18)
    g = VGroup(sq, bas, gauche)
    g.sq, g.bas, g.gauche = sq, bas, gauche
    return g


def remplir(cases, couleur=CELLULE_ON, lag=0.12):
    """Les rangées se remplissent l'une après l'autre."""
    return LaggedStart(*[LaggedStart(*[c.animate.set_fill(couleur, 1) for c in rang], lag_ratio=0.15)
                         for rang in cases], lag_ratio=lag)


def petit_cube(s=0.5, couleur="#38bdf8", dx=0.42, dy=0.3):
    """Un petit cube en perspective cavalière (face, dessus, côté) : recopié de puissance_comprendre."""
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
    """Les n³ petits cubes [(i, couche j, profondeur k)], dans l'ordre de peinture (z_index)."""
    cubes = {}
    for j in range(n):
        for k in range(n):
            for i in range(n):
                c = petit_cube(s, couleur, dx, dy)
                c.move_to(origine + P(i * s + k * dx * s, j * s + k * dy * s))
                c.set_z_index(j * 100 - k * 10 + i)
                cubes[(i, j, k)] = c
    return cubes


def fantome(cubes):
    return VGroup(*[c.copy().set_opacity(0.13).set_z_index(c.z_index - 10000) for c in cubes.values()])


class PuissanceSimpleLitteral5e(PaysageDiv):
    nom_voix = "5e-puissance-litteral"
    fichier_marques = "puissance_simple_litteral_marques.json"
    identite = "Maths 5e — EleveAI"
    ceinture = "jaune"
    XL = 0.9

    def _marques(self):
        if not hasattr(self, "_cache_marques5"):
            import json
            self._cache_marques5 = json.loads((ICI5 / self.fichier_marques).read_text(encoding="utf-8"))
        return self._cache_marques5

    # ── outils ──────────────────────────────────────────────────────────────
    def L(self, s, y, fs=40, c=WHITE, xl=None, teinte=True, maxr=6.5):
        """Une ligne de la colonne de droite, calée à gauche en xl, jamais au bord ni sur Ti-Margo."""
        e = M(s, fs, c, teinte=teinte)
        xl = self.XL if xl is None else xl
        e.move_to(P(0, y)).align_to(P(xl, 0), LEFT)
        lim = maxr if e.get_bottom()[1] > -1.8 else min(maxr, 5.2)
        if e.get_right()[0] > lim:
            e.scale_to_fit_width(lim - xl).align_to(P(xl, 0), LEFT)
        return e

    def geste(self, e, phrase, gestes, n=1, rt=0.2, sauf=(), echelle=1.15):
        """La ligne e posée au mot ; l'atome i joue en plus gestes[i]()."""
        debut = -1
        for _ in range(n):
            debut = self._texte_voix.find(phrase, debut + 1)
        if debut < 0:
            raise ValueError(f"« {phrase} » absent de la voix {self._cle_voix}")
        lots = self._plan_eq(e, debut, debut + len(phrase), sauf)
        for k, (pos, atomes) in enumerate(lots):
            self._attendre_pos(pos)
            d = rt
            if k + 1 < len(lots):
                gap = self._debut_voix + self._t_pos(lots[k + 1][0]) - self.renderer.time
                d = max(0.08, min(rt, gap - 0.01))
            ex = []
            for a in atomes:
                f = gestes.get(e.atomes.index(a))
                if f:
                    ex += f()
            self.play(*[FadeIn(a, scale=echelle) for a in atomes], *ex, run_time=d)
        return e

    def fleche_porte(self, e, i_expo, i_lettre, couleur=EXPO_C):
        """La petite flèche qui montre sur quoi porte l'exposant."""
        a, b = e.atomes[i_expo], e.atomes[i_lettre]
        return CurvedArrow(a.get_top() + UP * 0.08, b.get_top() + UP * 0.1, angle=0.9, color=couleur,
                           stroke_width=4, tip_length=0.16)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Une lettre au carré", self.identite, self.ceinture, y_ech=-2.75)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        ciel = etoiles(26, -6.3, -1.4, -1.9, 1.5)
        sat = satellite(0.95).move_to(P(-3.9, -0.1))
        self.au("Une", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(ciel), rt=0.7)
        self.play(FadeIn(sat, shift=UP * 0.3), run_time=0.5)
        l1 = self.L("Comment calculer x²", 0.75, 46, xl=0.2)
        self.dit(l1, "Comment calculer x au carré", avec=[Indicate(sat.ailes, color=CELLULE_ON, scale_factor=1.06)])
        l2 = self.L("quand on connaît x ?", -0.15, 46, JAUNE_TITRE, xl=0.2, maxr=5.8)
        self.dit(l2, "quand on connaît x ?")
        self.insister(l2, 1.12, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : Clara et ses panneaux carrés ───────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        self.XL = -0.7
        p = clara(0.95).move_to(P(-5.65, 1.55))
        ciel = etoiles(22, -4.6, -1.0, 1.0, 3.3, graine=7)
        sat = satellite(0.62).move_to(P(-2.85, 2.1))
        self.dit(self.L("Clara est ingénieure spatiale.", 3.0, 38, CIEL), "Clara est ingénieure spatiale.",
                 avec=[FadeIn(p, shift=UP * 0.3)])
        self.dit(self.L("Elle conçoit les panneaux solaires", 2.3, 38), "Elle conçoit les panneaux solaires",
                 avec=[FadeIn(ciel)])
        self.play(FadeIn(sat, scale=0.8), run_time=0.4)
        self.dit(self.L("carrés d'un satellite.", 1.7, 38), "carrés d'un satellite.",
                 avec=[Indicate(sat.ailes, color=CELLULE_ON, scale_factor=1.1)])
        grand = carre_lettre(2.5, P(-3.4, -1.15))
        ligne = self.L("Si le côté mesure c mètres,", 0.75, 38)
        i_c = next(i for i, a in enumerate(ligne.atomes) if a.original_text == "c")
        self.geste(ligne, "Si le côté mesure c mètres,",
                   {0: lambda: [ReplacementTransform(sat.ailes[0].copy(), grand.sq)],
                    i_c: lambda: [FadeIn(grand.bas, scale=1.4)]})
        aire = self.L("l'aire est c × c : c².", 0.0, 42)
        cs = [i for i, a in enumerate(aire.atomes) if a.original_text == "c"]
        rempli = grand.sq.copy().set_fill(CELLULE_ON, 0.85).set_stroke(WHITE, 5)
        dedans = M("c²", 64).sans_audit().move_to(grand.sq)
        self.geste(aire, "l'aire est c fois c : c au carré.",
                   {cs[0]: lambda: [Indicate(grand.bas, color=BASE_C, scale_factor=1.5)],
                    cs[1]: lambda: [FadeIn(grand.gauche, scale=1.4)],
                    cs[2]: lambda: [FadeIn(rempli)]})
        self.play(FadeIn(dedans, scale=1.3), run_time=0.35)
        q = self.L("Et si c vaut 3 ?", -1.1, 50, JAUNE_TITRE)
        self.dit(q, "Et si c vaut 3 ?")
        self.insister(q, 1.12, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 02 : on remplace c par 3 ────────────────────────────────────────────
    def ecran_remplacer(self):
        self.ecran("02-remplacer")
        self.XL = -1.0
        cote = 2.7
        g = carre_lettre(cote, P(-3.5, -0.35), fs=44)
        pan = panneau(3, cote / 3, g.sq.get_center())
        self.add(g)
        self.dit(self.L("On remplace la lettre par le nombre.", 2.95, 40, CIEL), "On remplace la lettre par le nombre.")
        l1 = self.L("c², avec c = 3 :", 1.95, 48)
        trois_b = T("3", 44, BASE_C).move_to(g.bas)
        trois_g = T("3", 44, BASE_C).move_to(g.gauche)
        i3 = len(l1.atomes) - 2
        self.geste(l1, "c au carré, avec c égal 3 :",
                   {0: lambda: [Indicate(g.sq, color=CELLULE_ON, scale_factor=1.04)],
                    i3: lambda: [ReplacementTransform(g.bas, trois_b), ReplacementTransform(g.gauche, trois_g)]})
        l2 = self.L("3² = 3 × 3 = 9", 0.85, 60)
        l2.atomes[-1].set_color(VERT_OK)
        self.geste(l2, "3 au carré, 3 fois 3, 9.",
                   {3: lambda: [FadeIn(pan.cases, scale=0.9), FadeOut(g.sq)]})
        self.play(remplir(pan.cases), run_time=0.6)
        self.add(pan.cadre)
        l3 = self.L("Le panneau fait 9 mètres carrés.", -0.3, 42, VERT_OK, maxr=6.15)
        self.dit(l3, "Le panneau fait 9 mètres carrés.",
                 avec=[Indicate(pan.cases, color=VERT_OK, scale_factor=1.04)])
        self.play(Create(self.cadre_ok(l3, 0.16)), run_time=0.3)
        self.insister(l2.atomes[-1], 1.4, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 03 : x² + 5 pour x = 4 ──────────────────────────────────────────────
    def ecran_somme(self):
        self.ecran("03-somme")
        self.XL = -1.3
        cote = 0.56
        c0 = P(-3.9, 0.55)
        g = carre_lettre(4 * cote, c0, "x", 44)
        pan = panneau(4, cote, c0)
        mods = VGroup(*[Square(cote, fill_color="#334155", fill_opacity=1, stroke_color=MODULE, stroke_width=2)
                        for _ in range(5)]).arrange(RIGHT, buff=0.08).next_to(g.sq, DOWN, buff=0.75)
        self.add(g)
        self.dit(self.L("Une autre formule :", 2.95, 38, CIEL), "Une autre formule :")
        l1 = self.L("x² + 5", 2.05, 64)
        self.geste(l1, "x au carré plus 5.",
                   {0: lambda: [Indicate(g.sq, color=CELLULE_ON, scale_factor=1.05)],
                    3: lambda: [LaggedStart(*[FadeIn(m, shift=UP * 0.2) for m in mods], lag_ratio=0.15)]})
        l2 = self.L("Pour x = 4 :", 1.0, 44)
        q_b, q_g = T("4", 44, BASE_C).move_to(g.bas), T("4", 44, BASE_C).move_to(g.gauche)
        self.geste(l2, "Pour x égal 4 :",
                   {len(l2.atomes) - 2: lambda: [ReplacementTransform(g.bas, q_b), ReplacementTransform(g.gauche, q_g),
                                                 FadeIn(pan.cases), FadeOut(g.sq)]})
        self.add(pan.cadre)
        l3 = self.L("4² + 5", 0.05, 56)
        self.dit(l3, "4 au carré plus 5.")
        l4 = self.L("D'abord 4² = 16.", -0.9, 46)
        i16 = next(i for i, a in enumerate(l4.atomes) if a.original_text == "16")
        l4.atomes[i16].set_color(VERT_OK)
        n16 = T("16", 44, VERT_OK).next_to(pan.cadre, UP, buff=0.22)
        self.geste(l4, "D'abord 4 au carré, 16.", {2: lambda: [Indicate(l3.atomes[1], color=EXPO_C, scale_factor=1.5)]})
        self.play(remplir(pan.cases, lag=0.2), FadeIn(n16, scale=1.4), run_time=0.7)
        l5 = self.L("Puis 16 + 5 = 21.", -1.85, 46)
        l5.atomes[-2].set_color(VERT_OK)
        tout = VGroup(pan, mods, q_b, q_g)
        self.geste(l5, "Puis 16 plus 5 : 21.",
                   {3: lambda: [LaggedStart(*[m.animate.set_fill(MODULE, 1) for m in mods], lag_ratio=0.15)],
                    len(l5.atomes) - 2: lambda: [Create(SurroundingRectangle(VGroup(pan, mods), color=VERT_OK,
                                                                             buff=0.15, stroke_width=4))]})
        n21 = T("21", 48, VERT_OK).next_to(mods, DOWN, buff=0.3)
        self.play(FadeIn(n21, scale=1.4), run_time=0.3)
        assert tout is not None
        self.insister(l5.atomes[-2], 1.4, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 03q : QUESTION 1 ────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = -2.2
        cote = 0.56
        c0 = P(-4.55, 0.15)
        g = carre_lettre(5 * cote, c0, "x", 40)
        pan = panneau(5, cote, c0)
        self.add(g)

        def avant(sc):
            sc.eq_dans_q(0, "Si x vaut 5,", "Si x vaut 5,", lettres="x")
            e = sc.eq_dans_q(0, "combien vaut x² ?", "combien vaut x au carré ?", lettres="x")
            couleur_atomes(e, "²", EXPO_C)

        def apres(sc):
            r1 = M("Réponse B : 25 = 5 × 5.", 30, VERT_OK, teinte=False)
            r1.scale_to_fit_width(sc.ph_q[0].width).move_to(sc.ph_q[0]).align_to(sc.ph_q[0], LEFT)
            cinq_b, cinq_g = T("5", 40, BASE_C).move_to(g.bas), T("5", 40, BASE_C).move_to(g.gauche)
            sc.play(FadeIn(r1.atomes[0]), run_time=0.08)
            sc.geste(r1, "Réponse B : 25. 5 fois 5.",
                     {5: lambda: [ReplacementTransform(g.bas, cinq_b), FadeIn(pan.cases), FadeOut(g.sq)],
                      7: lambda: [ReplacementTransform(g.gauche, cinq_g)]}, sauf=[r1.atomes[0]], echelle=1.0)
            sc.add(pan.cadre)
            sc.play(remplir(pan.cases, lag=0.1), run_time=0.6)
            r2 = M("10, c'est 5 × 2 : le piège.", 30, PIEGE, teinte=False)
            r2.scale_to_fit_height(r1.height * 1.02).move_to(sc.ph_q[1]).align_to(sc.ph_q[1], LEFT)
            deux = SurroundingRectangle(VGroup(pan.cases[0], pan.cases[1]), color=PIEGE, buff=0.04, stroke_width=7)
            sc.geste(r2, "10, c'est 5 fois 2 : le piège.",
                     {7: lambda: [Create(deux), pan.cases[2:].animate.set_opacity(0.3)]}, echelle=1.0)
            sc.rep_fini()

        self.question_pause("03q-question", "03r-reponse", ["Si x vaut 5,", "combien vaut x² ?"],
                            [E("10", 40, lettres=""), E("25", 40, lettres=""), E("7", 40, lettres="")], 1,
                            ["Réponse B : 25 = 5 × 5.", "10, c'est 5 × 2 : le piège."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 04 : le cube a³ ─────────────────────────────────────────────────────
    def ecran_cube(self):
        self.ecran("04-cube")
        self.XL = -0.9
        s, dx, dy = 1.0, 0.42, 0.3
        o = P(-4.6, -1.4)
        cubes = cube_empile(2, s, o, "#38bdf8", dx, dy)
        fant = fantome(cubes)
        ar = VGroup(T("a", 44, BASE_C).move_to(o + P(s / 2, -s / 2 - 0.38)),
                    T("a", 44, BASE_C).move_to(o + P(-s / 2 - 0.38, s / 2)),
                    T("a", 44, BASE_C).move_to(o + P(1.5 * s, -s / 2) + P(dx * s, dy * s) + P(0.32, -0.1)))
        self.dit(self.L("Pour une boîte cubique", 2.95, 40, CIEL), "Pour une boîte cubique", avec=[FadeIn(fant)])
        l1 = self.L("d'arête a,", 2.3, 40)
        self.geste(l1, "d'arête a,", {3: lambda: [LaggedStart(*[FadeIn(a, scale=1.4) for a in ar], lag_ratio=0.2)]})
        l2 = self.L("le volume est a³.", 1.45, 48)
        self.geste(l2, "le volume est a au cube.", {4: lambda: [Indicate(fant, color=CELLULE_ON, scale_factor=1.04)]})
        l3 = self.L("Avec a = 2 :", 0.45, 46)
        deux = VGroup(*[T("2", 44, BASE_C).move_to(a) for a in ar])
        self.geste(l3, "Avec a égal 2 :", {len(l3.atomes) - 2: lambda: [ReplacementTransform(ar, deux)]})
        rang = [cubes[(i, 0, 0)] for i in range(2)]
        fond = [cubes[(i, 0, 1)] for i in range(2)]
        haut = [cubes[(i, 1, k)] for k in range(2) for i in range(2)]
        l4 = self.L("2 × 2 × 2", -0.5, 56)
        for a in l4.atomes[::2]:
            a.set_color(BASE_C)
        self.geste(l4, "2 fois 2 fois 2,",
                   {0: lambda: [LaggedStart(*[FadeIn(c, shift=DOWN * 0.3) for c in rang], lag_ratio=0.3)],
                    2: lambda: [LaggedStart(*[FadeIn(c, shift=DOWN * 0.3) for c in fond], lag_ratio=0.3)],
                    4: lambda: [LaggedStart(*[FadeIn(c, shift=DOWN * 0.4) for c in haut], lag_ratio=0.15)]})
        l5 = self.L("= 8 mètres cubes.", -1.4, 46, VERT_OK, maxr=6.15)
        self.dit(l5, "8 mètres cubes.")
        self.play(Create(self.cadre_ok(l5, 0.14)), Indicate(VGroup(*cubes.values()), color=VERT_OK, scale_factor=1.03),
                  run_time=0.5)
        self.attendre_voix(marge=0.8)

    # ── 05 : le piège : 3x² ─────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        self.XL = -1.6
        l1 = self.L("Le piège : 3x², avec x = 2.", 3.0, 44)
        couleur_atomes(l1, ("Le", "piège", ":"), PIEGE)
        l1.atomes[0].set_color(PIEGE)
        self.dit(l1, "Le piège : 3 x au carré, avec x égal 2.")
        i_x = next(i for i, a in enumerate(l1.atomes) if a.original_text == "x")
        fl = self.fleche_porte(l1, i_x + 1, i_x)
        l2 = self.L("Le carré ne porte que sur x.", 2.05, 44, CIEL)
        self.geste(l2, "Le carré ne porte que sur x.",
                   {len(l2.atomes) - 2: lambda: [Create(fl), Indicate(l1.atomes[i_x], color=BASE_C, scale_factor=1.6)]})
        # trois panneaux de 2 × 2
        cote = 0.48
        pans = [panneau(2, cote, P(x, 1.15)) for x in (-5.5, -4.15, -2.8)]
        l3 = self.L("2² = 4, puis 3 × 4 = 12.", 0.95, 46)
        l3.atomes[-2].set_color(VERT_OK)
        n4 = [T("4", 34, WHITE, audit=False).next_to(p, DOWN, buff=0.15) for p in pans]
        self.geste(l3, "2 au carré, 4, puis 3 fois 4 : 12.",
                   {0: lambda: [FadeIn(pans[0])],
                    3: lambda: [pans[0].cases.animate.set_fill(CELLULE_ON, 1), FadeIn(n4[0])],
                    6: lambda: [FadeIn(pans[1]), FadeIn(pans[2])],
                    8: lambda: [pans[1].cases.animate.set_fill(CELLULE_ON, 1), pans[2].cases.animate.set_fill(CELLULE_ON, 1),
                                FadeIn(n4[1]), FadeIn(n4[2])],
                    10: lambda: [Create(SurroundingRectangle(VGroup(*pans, *n4), color=VERT_OK, buff=0.15,
                                                             stroke_width=4))]})
        n12 = T("12", 44, VERT_OK).move_to(P(-4.15, 2.15))
        self.play(FadeIn(n12, scale=1.4), run_time=0.25)
        # le faux : 6 × 6
        g6 = panneau(6, 0.3, P(-4.15, -1.75))
        for rg in g6.cases:
            for c in rg:
                c.set_fill("#450a0a", 1).set_stroke(PIEGE, 1.5)
        g6.cadre.set_stroke(PIEGE, 4)
        l4 = self.L("Pas 6² = 36 !", -0.2, 50, PIEGE, teinte=False)
        self.geste(l4, "Pas 6 au carré, 36 !",
                   {1: lambda: [FadeIn(g6)], len(l4.atomes) - 2: lambda: [g6.cases.animate.set_fill("#b91c1c", 1)]})
        faux = VGroup(*l4.atomes[1:])
        croix = VGroup(Line(g6.get_corner(UL), g6.get_corner(DR)), Line(g6.get_corner(DL), g6.get_corner(UR))
                       ).set_stroke(WHITE, 6)
        self.play(Create(self.barrer(faux, WHITE)), Create(croix), run_time=0.35)
        self.insister(l3.atomes[-2], 1.4, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 05q : QUESTION 2 ────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = -2.2
        cote = 0.5
        ga = carre_lettre(3 * cote, P(-5.3, 0.6), "a", 38)
        gb = carre_lettre(3 * cote, P(-3.05, 0.6), "a", 38)
        pa, pb = panneau(3, cote, ga.sq.get_center()), panneau(3, cote, gb.sq.get_center())
        fois2 = T("2 panneaux", 30, CIEL, audit=False).next_to(VGroup(ga, gb), UP, buff=0.3)
        self.add(ga, gb)

        def avant(sc):
            sc.eq_dans_q(0, "Si a vaut 3,", "Si a vaut 3,", lettres="a")
            e = sc.eq_dans_q(0, "combien vaut 2a² ?", "combien vaut 2 a au carré ?", lettres="a")
            couleur_atomes(e, "²", EXPO_C)
            sc.play(FadeIn(fois2), run_time=0.25)

        def apres(sc):
            ph = sc.ph_q
            r1 = M("Réponse C : 18.", 30, VERT_OK, teinte=False)
            r1.scale_to_fit_height(ph[0].height).move_to(ph[0]).align_to(ph[0], LEFT)
            sc.play(FadeIn(r1.atomes[0]), run_time=0.08)
            sc.geste(r1, "Réponse C : 18.", {}, sauf=[r1.atomes[0]], echelle=1.0)
            r2 = M("3² = 9, puis 2 × 9.", 30, VERT_OK, teinte=False)
            r2.scale_to_fit_height(r1.height * 1.15).move_to(ph[1]).align_to(ph[1], LEFT)
            trois = VGroup(*[T("3", 38, BASE_C).move_to(m) for m in (ga.bas, ga.gauche, gb.bas, gb.gauche)])
            sc.geste(r2, "3 au carré, 9. Puis 2 fois 9.",
                     {0: lambda: [ReplacementTransform(VGroup(ga.bas, ga.gauche, gb.bas, gb.gauche), trois)],
                      3: lambda: [FadeIn(pa.cases), FadeOut(ga.sq)],
                      6: lambda: [FadeIn(pb.cases), FadeOut(gb.sq), Indicate(fois2, color=CIEL)]}, echelle=1.0)
            sc.add(pa.cadre, pb.cadre)
            sc.play(remplir(pa.cases, lag=0.1), remplir(pb.cases, lag=0.1), run_time=0.6)
            n18 = T("18", 44, VERT_OK, audit=False).next_to(VGroup(ga, gb), DOWN, buff=0.35)
            sc.play(FadeIn(n18, scale=1.4), run_time=0.3)
            sc.rep_fini()

        self.question_pause("05q-question", "05r-reponse", ["Si a vaut 3,", "combien vaut 2a² ?"],
                            [E("36", 40, lettres=""), E("12", 40, lettres=""), E("18", 40, lettres="")], 2,
                            ["Réponse C : 18.", "3² = 9, puis 2 × 9."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 06 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("06-defi")
        tit = T("À toi de jouer !", 56, JAUNE_TITRE).move_to(P(0, 3.05))
        self.au("À toi", Write(tit), rt=0.5)
        p10 = panneau(10, 0.22, P(-4.0, 0.9))
        lx = T("x", 36, BASE_C).next_to(p10, LEFT, buff=0.15)
        casse = p10.cases[9][9]
        cubes = cube_empile(3, 0.42, P(-4.75, -2.55), "#38bdf8")
        fant = fantome(cubes)
        la = T("a", 36, BASE_C).next_to(fant, LEFT, buff=0.15)
        plus = petit_cube(0.42, MODULE).move_to(P(-2.25, -2.3))
        l1 = self.L("Pour x = 10,", 1.95, 44)
        self.geste(l1, "Pour x égal 10,", {1: lambda: [FadeIn(lx, scale=1.3)],
                                           len(l1.atomes) - 2: lambda: [FadeIn(p10)]})
        l2 = self.L("calcule x² − 1.", 1.2, 44)
        self.geste(l2, "calcule x au carré moins 1.",
                   {len(l2.atomes) - 2: lambda: [casse.animate.set_fill(PIEGE, 1)]})
        l3 = self.L("Puis, pour a = 3,", 0.05, 44)
        self.geste(l3, "Puis, pour a égal 3,", {3: lambda: [FadeIn(la, scale=1.3)],
                                                len(l3.atomes) - 2: lambda: [FadeIn(fant)]})
        l4 = self.L("calcule a³ + 1.", -0.7, 44)
        self.geste(l4, "calcule a au cube plus 1.", {len(l4.atomes) - 2: lambda: [FadeIn(plus, shift=DOWN * 0.3)]})
        self.pause_defi(y=-1.85)

    # ── 06b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        self.ecran("06b-correction")
        self.au("Correction", FadeIn(T("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))), rt=0.3)
        p10 = panneau(10, 0.22, P(-4.0, 0.9))
        lx = T("10", 32, BASE_C, audit=False).next_to(p10, LEFT, buff=0.15)
        casse = p10.cases[9][9]
        cubes = cube_empile(3, 0.42, P(-4.75, -2.55), "#38bdf8")
        fant = fantome(cubes)
        la = T("3", 32, BASE_C, audit=False).next_to(fant, LEFT, buff=0.15)
        plus = petit_cube(0.42, MODULE).move_to(P(-2.25, -2.3))
        self.add(p10, lx, fant, la)
        l1 = self.L("10² = 100", 2.05, 50)
        l1.atomes[-1].set_color(WHITE)
        self.geste(l1, "10 au carré, 100,", {len(l1.atomes) - 1: lambda: [remplir(p10.cases, lag=0.05)]}, rt=0.5)
        l2 = self.L("100 − 1 = 99", 1.15, 50)
        l2.atomes[-1].set_color(VERT_OK)
        l2.atomes[0]._pas_audit = True
        self.au("moins 1", TransformFromCopy(l1.atomes[-1], l2.atomes[0]), FadeIn(l2.atomes[1]), rt=0.25)
        self.geste(l2, "moins 1 : 99.", {2: lambda: [casse.animate.set_fill(PIEGE, 1)],
                                         4: lambda: [FadeOut(casse)]}, sauf=l2.atomes[:2])
        self.play(Create(self.cadre_ok(l2, 0.14)), run_time=0.25)
        l3 = self.L("3³ = 27", -0.3, 50)
        self.geste(l3, "3 au cube,", {})
        couches = [[cubes[(i, j, k)] for k in range(3) for i in range(3)] for j in range(3)]
        self.play(FadeOut(fant), LaggedStart(*[LaggedStart(*[FadeIn(c, shift=DOWN * 0.25) for c in ch], lag_ratio=0.05)
                                               for ch in couches], lag_ratio=0.45), run_time=0.45)
        self.geste(l3, "27,", {}, sauf=l3.atomes[:2])
        l4 = self.L("27 + 1 = 28", -1.2, 50)
        l4.atomes[-1].set_color(VERT_OK)
        l4.atomes[0]._pas_audit = True
        self.au("plus 1", TransformFromCopy(l3.atomes[-1], l4.atomes[0]), FadeIn(l4.atomes[1]), rt=0.25)
        self.geste(l4, "plus 1 : 28.", {2: lambda: [FadeIn(plus, shift=DOWN * 0.3)]}, sauf=l4.atomes[:2])
        self.play(Create(self.cadre_ok(l4, 0.14)), run_time=0.25)
        self.attendre_voix(marge=1.0)

    # ── 07 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("07-finale", 0.5)
        e = M("3x²", 110).sans_audit()
        fl = self.fleche_porte(e, 2, 1)
        fig = VGroup(e, fl)
        lignes = self.finale_colonne([["Pour calculer une expression", "avec une lettre, on remplace",
                                       "la lettre par sa valeur."],
                                      ["Puis la puissance d'abord."],
                                      ["Le carré ne porte que sur", "la lettre juste avant lui."]], fs=38, figure=fig)
        self.play(FadeIn(e), run_time=0.25)
        for k, lg in enumerate(lignes):
            if k == 2:
                self.montrer_ligne(lg, Create(fl))
            else:
                self.montrer_ligne(lg)
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        for e in (self.ecran_situation, self.ecran_remplacer, self.ecran_somme, self.ecran_question1,
                  self.ecran_cube, self.ecran_piege, self.ecran_question2):
            e()
            self.XL = type(self).XL
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("08-abonne")
