# puissance_simple_ecrire.py
# EleveAI — Maths 5e — série « Carré et cube », épisode 03 : ÉCRIRE UN NOMBRE AVEC UN EXPOSANT
# (reconnaître un carré, un cube, et les puissances de 10 : 100 = 10², 1 000 = 10³).
# Paysage 16:9, AVEC VOIX, ceinture JAUNE. Micro : puissance_simple_ecrire
# (lib/tutor-v4/questionBank/5e/maths/puissance-simple.bank.ts). Carré et cube seulement.
# Décor et métier : Sarah, éclairagiste (les projecteurs d'un concert). Centres : musique, art-design.
#
# Micro → écrans : garde (00) ; les 64 projecteurs (01) ; 7 × 7 trop petit, 8 × 8 = 64 = 8² (02) ;
# les 64 boîtiers en cube 4 × 4 × 4 = 4³ (03) ; QUESTION 1, 125 = 5³ (03q) ; 100 = 10², 1 000 = 10³
# (04) ; le piège 64 ≠ 32² (05) ; QUESTION 2, 50 n'est pas un carré (05q) ; défi (06) et
# correction (06b) ; ce que tu as appris (07) ; fin (08).
# Code couleur de la série : BLEU = la base, ORANGE = l'exposant, VERT = résultat juste, ROUGE = piège.
#
# Les exposants : Pu("64 = 8²") compose le petit 2 (Text relevé, orange) à la place du « ² » ; il
# se pose au mot « carré » (« ³ » au mot « cube ») et l'audit ne le lit pas (il ne se dit pas « 2 »).
# Voix : manim/voix/5e-puissance-ecrire.json (débit −6) ; marques : puissance_simple_ecrire_marques.json.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/5e/puissance_simple_ecrire.py PuissanceSimpleEcrire5e --media_dir manim/scripts/5e/media-ps-03-dry
# Rendu : python -m manim render -qh --disable_caching manim/scripts/5e/puissance_simple_ecrire.py PuissanceSimpleEcrire5e -o eleveai-maths-5e-puissance-ecrire --media_dir manim/scripts/5e/media-ps-03
# Sortie : manim/sorties/5e/maths/puissance-simple/03-ecrire/eleveai-maths-5e-puissance-ecrire.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI.parent / "4e"))

from relatif_commun import *  # noqa: E402,F403
from equation_commun import PAROLE, _ATOMES  # noqa: E402

PAROLE.setdefault("²", "carré")
PAROLE.setdefault("³", "cube")

BASE_C = BLEU_CALCUL       # la base
EXPO_C = ORANGE_RETENUE    # l'exposant
LENTILLE = "#78716c"       # un projecteur éteint
LUMIERE = "#fde047"        # un projecteur allumé
BOITIER = "#64748b"        # les boîtiers de la tournée
SCENE = "#1c1917"


class Pu(E):
    """Une ligne en Text dont « ² » / « ³ » deviennent un petit exposant orange composé
    (posé au mot « carré » / « cube », jamais lu par l'audit). Mêmes atomes que E."""

    def __init__(self, s, fs=60, couleur=WHITE, audit=True, expo=EXPO_C, **kw):
        VGroup.__init__(self, **kw)
        self.s, self.fs = s, fs
        ref = Text(s, font_size=fs, disable_ligatures=True)
        assert len(ref.submobjects) == len(s), s
        ref = VGroup(*[m for m, c in zip(ref.submobjects, s) if not c.isspace()])
        self.atomes, self.expos, k = [], VGroup(), 0
        for m in _ATOMES.finditer(s):
            mot = m.group(0)
            boite = VGroup(*ref.submobjects[k:k + len(mot)])
            k += len(mot)
            if mot in "²³":
                b = self.atomes[-1]
                a = T("2" if mot == "²" else "3", fs * 0.6, expo, audit=False)
                a.next_to(b, UR, buff=0.03).shift(DOWN * fs * 0.006)
                a.original_text = mot
                a._pas_audit = True
                self.expos.add(a)
            else:
                a = T(mot, fs, couleur, audit).move_to(boite)
            self.atomes.append(a)
            self.add(a)
        self.egal = next((a for a in self.atomes if a.original_text == "="), None)
        self.x = VGroup()
        if self.egal is not None:
            i = self.atomes.index(self.egal)
            self.gauche, self.droite = VGroup(*self.atomes[:i]), VGroup(*self.atomes[i + 1:])


def teinter(e, couleurs):
    """Colore les atomes selon leur texte (« 8 » bleu, « 64 » vert…)."""
    for a in e.atomes:
        if a.original_text in couleurs:
            a.set_color(couleurs[a.original_text])
    return e


def zeros(atome, couleur=EXPO_C):
    """Les zéros d'un nombre (« 100 », « 000 ») en couleur."""
    for c, g in zip(atome.original_text, atome.submobjects):
        if c == "0":
            g.set_color(couleur)
    return atome


# ── les dessins ────────────────────────────────────────────────────────────

def sarah(s=0.72):
    """Sarah, éclairagiste : t-shirt violet, un projecteur à la main et son faisceau."""
    p = personne(peau="#e0ac69", tenue="#7c3aed", cheveux="#7c2d12", longs=True, s=s)
    main = p.corps.get_right() + UP * 0.55 * s
    boite = RoundedRectangle(width=0.42 * s, height=0.32 * s, corner_radius=0.06 * s, fill_color="#334155",
                             fill_opacity=1, stroke_color="#cbd5e1", stroke_width=2).move_to(main + RIGHT * 0.12 * s)
    lent = Circle(radius=0.11 * s, fill_color=LUMIERE, fill_opacity=1, stroke_width=0).move_to(boite.get_right())
    o = lent.get_center()
    faisceau = Polygon(o + UP * 0.08 * s, o + P(1.6 * s, 0.75 * s), o + P(1.6 * s, -0.25 * s), o + DOWN * 0.08 * s,
                       fill_color=LUMIERE, fill_opacity=0.28, stroke_width=0)
    return VGroup(faisceau, p, boite, lent)


def spot(r=0.13, allume=False):
    """Un projecteur vu de face : le boîtier et sa lentille (.lent)."""
    boitier = Circle(radius=r, fill_color="#1f2937", fill_opacity=1, stroke_color="#94a3b8", stroke_width=1.5)
    lent = Circle(radius=r * 0.6, fill_color=LUMIERE if allume else LENTILLE, fill_opacity=1, stroke_width=0)
    g = VGroup(boitier, lent)
    g.lent = lent
    return g


def places(lignes, colonnes, pas, centre=ORIGIN):
    """Les centres d'un rectangle de places (rangée par rangée, de haut en bas)."""
    return [np.array(centre) + P((j - (colonnes - 1) / 2) * pas, ((lignes - 1) / 2 - i) * pas)
            for i in range(lignes) for j in range(colonnes)]


def en_vrac(n, x0, x1, y0, y1, ecart, graine=3):
    """n positions au hasard, à `ecart` au moins les unes des autres."""
    rng = np.random.default_rng(graine)
    pts = []
    echecs = 0
    while len(pts) < n:
        p = (rng.uniform(x0, x1), rng.uniform(y0, y1))
        if all((p[0] - q[0]) ** 2 + (p[1] - q[1]) ** 2 > ecart ** 2 for q in pts):
            pts.append(p)
            echecs = 0
        else:
            echecs += 1
            if echecs > 20000:  # la place manque : on resserre un peu, au lieu de boucler sans fin
                ecart *= 0.95
                echecs = 0
    return [P(*p) for p in pts]


def spots_vrac(n, x0, x1, y0, y1, r=0.13, graine=3):
    return VGroup(*[spot(r).move_to(p) for p in en_vrac(n, x0, x1, y0, y1, 2.7 * r, graine)])


def plateau(x0, x1, y0, y1):
    """La scène du concert : le plancher et son bord avant doré."""
    sol = Rectangle(width=x1 - x0, height=y1 - y0, fill_color=SCENE, fill_opacity=1, stroke_color="#44403c",
                    stroke_width=2).move_to(P((x0 + x1) / 2, (y0 + y1) / 2))
    return VGroup(sol, Line(P(x0, y0), P(x1, y0), color="#d97706", stroke_width=6))


def petit_cube(s=0.5, couleur=BOITIER, dx=0.42, dy=0.3):
    """Un boîtier en perspective cavalière (face, dessus, côté)."""
    face = Square(s, fill_color=couleur, fill_opacity=1, stroke_color="#0f172a", stroke_width=2)
    a, b = face.get_corner(UL), face.get_corner(UR)
    c = face.get_corner(DR)
    d = P(dx * s, dy * s)
    dessus = Polygon(a, b, b + d, a + d, fill_color=interpolate_color(ManimColor(couleur), WHITE, 0.35),
                     fill_opacity=1, stroke_color="#0f172a", stroke_width=2)
    cote_ = Polygon(b, c, c + d, b + d, fill_color=interpolate_color(ManimColor(couleur), BLACK, 0.3),
                    fill_opacity=1, stroke_color="#0f172a", stroke_width=2)
    return VGroup(face, dessus, cote_)


def cube_empile(n, s, origine, couleur=BOITIER, dx=0.42, dy=0.3):
    """Les n³ boîtiers [(i, couche j, profondeur k)], ordre de peinture par z_index."""
    cubes = {}
    for j in range(n):
        for k in range(n):
            for i in range(n):
                c = petit_cube(s, couleur, dx, dy)
                c.move_to(origine + P(i * s + k * dx * s, j * s + k * dy * s))
                c.set_z_index(j * 100 - k * 10 + i)
                cubes[(i, j, k)] = c
    return cubes


def couches(cubes, n):
    """La rangée de devant, le reste de la couche du bas, puis chaque couche du dessus."""
    rang = [cubes[(i, 0, 0)] for i in range(n)]
    bas = [cubes[(i, 0, k)] for k in range(1, n) for i in range(n)]
    dessus = [[cubes[(i, j, k)] for k in range(n) for i in range(n)] for j in range(1, n)]
    return rang, bas, dessus


def caisse(n, s, o, dx=0.42, dy=0.3, couleur="#d97706"):
    """La caisse en cube (arêtes en pointillés) autour de n × n × n boîtiers."""
    L, d = n * s, P(dx * s * n, dy * s * n)
    a = o + P(-s / 2, -s / 2)
    b, c, h = a + P(L, 0), a + P(L, L), a + P(0, L)
    aretes = [(a, b), (b, c), (c, h), (h, a), (h, h + d), (c, c + d), (b, b + d), (h + d, c + d), (b + d, c + d)]
    g = VGroup(*[DashedLine(u, v, color=couleur, stroke_width=3, dash_length=0.12) for u, v in aretes])
    g.set_z_index(900)
    return g


def grille(n, cote, centre, couleur, opacite=0.35):
    """Un carré de n × n cases (des lignes : rapide à dessiner même pour 32 × 32)."""
    L = n * cote
    fond = Square(L, fill_color=couleur, fill_opacity=opacite, stroke_color=couleur, stroke_width=3).move_to(centre)
    a = fond.get_corner(DL)
    traits = VGroup(*[Line(a + P(k * cote, 0), a + P(k * cote, L), stroke_width=1, color=couleur) for k in range(1, n)],
                    *[Line(a + P(0, k * cote), a + P(L, k * cote), stroke_width=1, color=couleur) for k in range(1, n)])
    return VGroup(fond, traits)


def cube_grille(n, cote, centre, couleur=EXPO_C, dx=0.42, dy=0.3):
    """Un cube de n × n × n petits cubes : ses trois faces quadrillées."""
    L = n * cote
    d = P(dx * L, dy * L)
    face = grille(n, cote, ORIGIN, couleur, 0.3)
    a, b, c = face[0].get_corner(UL), face[0].get_corner(UR), face[0].get_corner(DR)
    dessus = Polygon(a, b, b + d, a + d, fill_color=couleur, fill_opacity=0.45, stroke_color=couleur, stroke_width=3)
    cote_ = Polygon(b, c, c + d, b + d, fill_color=couleur, fill_opacity=0.18, stroke_color=couleur, stroke_width=3)
    tr = VGroup()
    for k in range(1, n):
        u = k / n
        tr.add(Line(a + (b - a) * u, a + (b - a) * u + d, stroke_width=1, color=couleur))
        tr.add(Line(a + d * u, b + d * u, stroke_width=1, color=couleur))
        tr.add(Line(b + d * u, c + d * u, stroke_width=1, color=couleur))
        tr.add(Line(b + (c - b) * u, b + (c - b) * u + d, stroke_width=1, color=couleur))
    g = VGroup(cote_, dessus, face, tr)
    return g.move_to(centre)


def crate(w=2.4, h=1.5, centre=ORIGIN):
    """Une caisse de tournée fermée, en bois."""
    fond = Rectangle(width=w, height=h, fill_color="#92400e", fill_opacity=1, stroke_color="#fbbf24", stroke_width=3)
    planches = VGroup(*[Line(P(-w / 2, y), P(w / 2, y), color="#78350f", stroke_width=3) for y in (-h / 6, h / 6)])
    croix = VGroup(Line(P(-w / 2, -h / 2), P(w / 2, h / 2), color="#78350f", stroke_width=4),
                   Line(P(-w / 2, h / 2), P(w / 2, -h / 2), color="#78350f", stroke_width=4))
    return VGroup(fond, planches, croix).move_to(centre)


class PuissanceSimpleEcrire5e(PaysageRel):
    nom_voix = "5e-puissance-ecrire"
    fichier_marques = "puissance_simple_ecrire_marques.json"
    identite = "Maths 5e — EleveAI"
    ceinture = "jaune"
    cartes_larges = False

    def _attendre_pos(self, pos):
        """Comme le module commun, mais vise 0,07 s APRÈS la marque : l'attente tombe sur la grille
        des images (15 i/s en brouillon) et finissait parfois quelques centièmes avant le mot."""
        reste = self._debut_voix + self._t_pos(pos) - self.renderer.time
        if reste < -0.3:
            print(f"RETARD {self._cle_voix} position {pos} : {-reste:.2f} s", flush=True)
        if reste > -0.02:
            self.wait(reste + 0.07)

    def lgp(self, s, x, y, fs=36, c=WHITE, maxw=None):
        """Comme lg, avec les exposants composés."""
        e = Pu(s, fs, c)
        if maxw is None and x > 1:
            maxw = 2 * min(6.5 - x, x)
        if maxw and e.width > maxw:
            e.scale_to_fit_width(maxw)
        return e.move_to(P(x, y))

    def ph_eq(self, i, s, phrase, n=1, lettres="", couleur=None, premier=False, avec=()):
        """Une ligne de la réponse (exposants composés), à la place de la ligne i."""
        ref = self.ph_q[i]
        e = Pu(s, 30, couleur or VERT_OK)
        e.scale_to_fit_width(ref.width).move_to(ref).align_to(ref, LEFT)
        sauf = []
        if premier:
            self.play(FadeIn(e.atomes[0]), run_time=0.08)
            sauf = [e.atomes[0]]
        self.dire_eq(e, phrase, n=n, echelle=1.0, rt=0.16, sauf=sauf, avec=avec)
        return e

    def _disposer_q(self, question, choix, phrase):
        if not self.cartes_larges:
            return super()._disposer_q(question, choix, phrase)
        hauteurs = [c.height for c in choix]
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        for c, h in zip(choix, hauteurs):
            c.scale_to_fit_height(h * 34 / 40)
        neuves = VGroup(*[self._carte_choix(l, c, 6.6, 34) for l, c in zip("ABC", choix)])
        neuves.arrange(DOWN, buff=0.14).align_to(cartes, UP).align_to(P(self.XL, 0), LEFT)
        pause.next_to(neuves, DOWN, buff=0.16).align_to(P(self.XL, 0), LEFT)
        ph.next_to(neuves, DOWN, buff=0.2).align_to(P(self.XL, 0), LEFT)
        self.cartes_q = neuves
        return tete, q, neuves, pause, rebours, ph

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Écrire un nombre avec un exposant", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Écrire", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        car = VGroup(*[spot(0.15, True).move_to(p) for p in places(3, 3, 0.42, P(-5.0, 0.35))])
        cub = cube_empile(3, 0.36, P(-3.55, -0.55))
        l1 = self.lg("Comment savoir si un nombre", 2.0, 0.75, 44, maxw=8)
        self.dit(l1, "Comment savoir si un nombre")
        l2 = self.lg("est un carré, ou un cube ?", 2.0, -0.1, 52, JAUNE_TITRE, maxw=8)
        self.poser_avec(l2, "est un carré, ou un cube ?",
                        {2: lambda: [LaggedStart(*[FadeIn(s, scale=0.4) for s in car], lag_ratio=0.08)],
                         6: lambda: [LaggedStart(*[FadeIn(c, shift=DOWN * 0.2) for c in cub.values()], lag_ratio=0.02)]})
        self.insister(l2, 1.12, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : les 64 projecteurs de Sarah ────────────────────────────────────
    def vrac64(self):
        return plateau(-5.6, -0.7, -3.0, 1.15), spots_vrac(64, -5.3, -1.0, -2.7, 0.85, r=0.13, graine=7)

    def ecran_situation(self):
        self.ecran("01-situation")
        p = sarah().move_to(P(-5.2, 2.35))
        sol, tas = self.vrac64()
        self.dit(self.lg("Sarah est éclairagiste :", 3.2, 3.0, 40, CIEL), "Sarah est éclairagiste :",
                 avec=[FadeIn(p, shift=UP * 0.3)])
        self.dit(self.lg("elle installe les lumières", 3.2, 2.35, 36), "elle installe les lumières")
        self.dit(self.lg("des concerts.", 3.2, 1.75, 36), "des concerts.", avec=[FadeIn(sol)])
        self.dit(self.lg("Pour un mur de lumière,", 3.2, 0.9, 36), "Pour un mur de lumière,")
        l = self.lg("elle a 64 projecteurs.", 3.2, 0.3, 36)
        self.poser_avec(l, "elle a 64 projecteurs.",
                        {2: lambda: [LaggedStart(*[FadeIn(s, scale=0.4) for s in tas], lag_ratio=0.02)]})
        self.dit(self.lg("Peut-elle les ranger", 3.2, -0.85, 40), "Peut-elle les ranger")
        q = self.lg("en un carré parfait ?", 3.2, -1.55, 46, JAUNE_TITRE, maxw=5.6)
        cadre = DashedVMobject(Square(3.6, color=JAUNE_TITRE, stroke_width=4), num_dashes=40).move_to(P(-3.15, -0.92))
        self.poser_avec(q, "en un carré parfait ?", {2: lambda: [Create(cadre)]})
        self.insister(q, 1.1, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 02 : 7 × 7 trop petit ; 8 × 8 = 64 = 8² ─────────────────────────────
    def ecran_carre(self):
        self.ecran("02-carre")
        sol, tas = self.vrac64()
        self.add(sol, tas)
        c7 = places(7, 7, 0.42, P(-3.75, -0.85))
        reste = [P(-1.45 + 0.4 * (k % 2), 0.75 - 0.42 * (k // 2)) for k in range(15)]
        c8 = places(8, 8, 0.42, P(-3.2, -0.95))
        self.dit(self.lg("Elle cherche un nombre qui,", 3.2, 3.0, 36, CIEL), "Elle cherche un nombre qui,")
        self.dit(self.lg("multiplié par lui-même,", 3.2, 2.4, 36), "multiplié par lui-même,")
        self.dit(self.lg("donne 64.", 3.2, 1.8, 36), "donne 64.")
        e7 = teinter(Pu("7 × 7 = 49, trop petit.", 42), {"7": BASE_C, "trop": PIEGE, "petit": PIEGE}).move_to(P(3.2, 0.9))
        e7.atomes[-1].set_color(PIEGE)
        rouge = SurroundingRectangle(VGroup(*[Dot(p) for p in reste]), color=PIEGE, buff=0.22, stroke_width=4)
        self.poser_avec(e7, "7 fois 7 : 49, trop petit.",
                        {0: lambda: [*[tas[k].animate.move_to(c7[k]) for k in range(49)],
                                     *[tas[49 + k].animate.move_to(reste[k]) for k in range(15)]],
                         6: lambda: [Create(rouge)]}, rt=0.3)
        e8 = teinter(Pu("8 × 8 = 64 !", 46), {"8": BASE_C, "64": VERT_OK}).move_to(P(3.2, 0.05))
        self.poser_avec(e8, "8 fois 8 : 64 !",
                        {0: lambda: [FadeOut(rouge), *[tas[k].animate.move_to(c8[k]) for k in range(64)]]}, rt=0.3)
        vert = SurroundingRectangle(VGroup(*[Dot(p) for p in c8]), color=VERT_OK, buff=0.24, stroke_width=4)
        self.play(Create(vert), run_time=0.3)
        n_g = T("8", 40, BASE_C, audit=False).move_to(P(-5.15, -0.95))
        n_h = T("8", 40, BASE_C, audit=False).move_to(P(-3.2, 1.5))
        r8 = teinter(self.lg("8 rangées de 8.", 3.2, -0.75, 40), {"8": BASE_C})
        rangees = [VGroup(*[tas[8 * i + j].lent for j in range(8)]) for i in range(8)]
        self.poser_avec(r8, "8 rangées de 8.",
                        {0: lambda: [FadeIn(n_g, scale=1.4),
                                     LaggedStart(*[r.animate.set_fill(LUMIERE) for r in rangees], lag_ratio=0.12)],
                         3: lambda: [FadeIn(n_h, scale=1.4)]}, rt=0.3)
        fin = teinter(Pu("Donc 64 = 8²", 60), {"64": VERT_OK, "8": BASE_C}).move_to(P(2.7, -1.8))
        fin.atomes[0].shift(LEFT * 0.3)  # « Donc » respire à côté du cadre
        self.dire_eq(fin, "Donc 64 égale 8 au carré.", echelle=1.25)
        self.play(Create(self.cadre_ok(VGroup(*fin.atomes[1:], fin.expos), 0.18)), run_time=0.25)
        self.insister(fin.expos, 1.5, 0.22, about=fin.expos.get_center())
        self.attendre_voix(marge=0.8)

    # ── 03 : les 64 boîtiers en cube : 4 × 4 × 4 = 4³ ───────────────────────
    def ecran_cube(self):
        self.ecran("03-cube")
        s, o = 0.52, P(-5.35, -2.2)
        cubes = cube_empile(4, s, o)
        rang, bas, dessus = couches(cubes, 4)
        cs = caisse(4, s, o)
        lab_l = T("4", 40, BASE_C, audit=False).move_to(o + P(1.5 * s, -s / 2 - 0.32)).set_z_index(1000)
        lab_p = T("4", 40, BASE_C, audit=False).move_to(o + P(3.5 * s + 2 * 0.42 * s + 0.32, -s / 2 + 2 * 0.3 * s - 0.08)).set_z_index(1000)
        lab_h = T("4", 40, BASE_C, audit=False).move_to(o + P(-s / 2 - 0.32, 1.5 * s)).set_z_index(1000)
        self.dit(self.lg("Pour la tournée, elle range", 3.0, 3.0, 36, CIEL), "Pour la tournée, elle range")
        self.dit(self.lg("64 boîtiers dans une caisse", 3.0, 2.4, 36), "64 boîtiers dans une caisse")
        self.dit(self.lg("en cube :", 3.0, 1.8, 36), "en cube :", avec=[Create(cs)])
        dims = teinter(self.lg("4 de long, 4 de large, 4 de haut.", 3.0, 1.0, 36, maxw=6.6), {"4": BASE_C})
        self.poser_avec(dims, "4 de long, 4 de large, 4 de haut.",
                        {0: lambda: [FadeIn(lab_l, scale=1.4)], 4: lambda: [FadeIn(lab_p, scale=1.4)],
                         8: lambda: [FadeIn(lab_h, scale=1.4)]})
        e = teinter(Pu("4 × 4 × 4 = 64", 54), {"4": BASE_C, "64": VERT_OK}).move_to(P(3.0, -0.05))
        self.poser_avec(e, "4 fois 4 fois 4 : 64.",
                        {0: lambda: [LaggedStart(*[FadeIn(c, shift=DOWN * 0.3) for c in rang], lag_ratio=0.2)],
                         2: lambda: [LaggedStart(*[FadeIn(c, shift=DOWN * 0.3) for c in bas], lag_ratio=0.05)],
                         4: lambda: [LaggedStart(*[FadeIn(c, shift=DOWN * 0.4) for cc in dessus for c in cc], lag_ratio=0.01)]},
                        rt=0.3)
        self.play(Indicate(VGroup(*cubes.values()), color=VERT_OK, scale_factor=1.03), run_time=0.6)
        fin = teinter(Pu("Donc 64 = 4³", 60), {"64": VERT_OK, "4": BASE_C}).move_to(P(2.8, -1.6))
        fin.atomes[0].shift(LEFT * 0.3)  # « Donc » respire à côté du cadre
        self.dire_eq(fin, "Donc 64 égale aussi 4 au cube.", echelle=1.25)
        self.play(Create(self.cadre_ok(VGroup(*fin.atomes[1:], fin.expos), 0.18)), run_time=0.25)
        self.insister(fin.expos, 1.5, 0.22, about=fin.expos.get_center())
        self.attendre_voix(marge=0.8)

    # ── 03q : QUESTION 1 (125 = 5³) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = -2.2
        cr = crate(2.6, 1.6, P(-4.55, -0.4))
        lab = T("125 boîtiers", 32, CIEL).next_to(cr, UP, buff=0.3)
        s, o = 0.33, P(-5.55, -1.45)
        cubes = cube_empile(5, s, o)
        rang, bas, dessus = couches(cubes, 5)

        def avant(sc):
            ref = sc.q_q[0]
            e = Pu("Comment écrire 125", 34)
            e.scale_to_fit_height(ref.height).move_to(ref)
            sc.q_q.remove(ref)
            sc.poser_avec(e, "Comment écrire 125", {2: lambda: [FadeIn(cr, scale=0.8), FadeIn(lab)]})

        def apres(sc):
            sc.ph_eq(0, "Réponse B : 5³.", "Réponse B : 5 au cube.", premier=True)
            sc.ph_eq(1, "5 × 5 = 25,", "5 fois 5 : 25.",
                     avec=[FadeOut(cr), FadeOut(lab), LaggedStart(*[FadeIn(c, shift=DOWN * 0.2) for c in rang + bas], lag_ratio=0.03)])
            sc.ph_eq(2, "puis 25 × 5 = 125.", "Puis 25 fois 5 : 125.",
                     avec=[LaggedStart(*[FadeIn(c, shift=DOWN * 0.3) for cc in dessus for c in cc], lag_ratio=0.008)])
            sc.play(Indicate(VGroup(*cubes.values()), color=VERT_OK, scale_factor=1.03), run_time=0.5)
            sc.rep_fini()

        self.question_pause("03q-question", "03r-reponse", ["Comment écrire 125", "avec un exposant ?"],
                            [Pu("5²", 44), Pu("5³", 44), Pu("25²", 44)], 1,
                            ["Réponse B : 5³.", "5 × 5 = 25,", "puis 25 × 5 = 125."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 04 : avec 10, on compte les zéros ───────────────────────────────────
    def ecran_dix(self):
        self.ecran("04-dix")
        g100 = grille(10, 0.19, P(-4.5, 1.15), LUMIERE, 0.5)
        g1000 = cube_grille(10, 0.15, P(-4.5, -1.55))
        self.dit(self.lg("Avec 10, c'est facile :", 2.6, 3.0, 40, CIEL, maxw=7.0), "Avec 10, c'est facile :")
        l2 = teinter(self.lg("on compte les zéros.", 2.6, 2.3, 40, maxw=7.0), {"zéros": EXPO_C})
        self.dit(l2, "on compte les zéros.")
        e1 = teinter(self.lgp("100 a deux zéros : 10²", 2.6, 1.1, 46, maxw=7.0), {"deux": EXPO_C, "zéros": EXPO_C, "10": BASE_C})
        zeros(e1.atomes[0])
        self.poser_avec(e1, "100 a deux zéros : 10 au carré.", {0: lambda: [FadeIn(g100, scale=0.8)]})
        self.play(Indicate(VGroup(*e1.atomes[0][1:]), color=EXPO_C, scale_factor=1.3),
                  Indicate(e1.expos, color=EXPO_C, scale_factor=1.6), run_time=0.6)
        e2 = teinter(self.lgp("1 000 a trois zéros : 10³", 2.6, -1.3, 46, maxw=7.0), {"trois": EXPO_C, "zéros": EXPO_C, "10": BASE_C})
        zeros(e2.atomes[1])
        self.poser_avec(e2, "1 000 a trois zéros : 10 au cube.", {0: lambda: [FadeIn(g1000, scale=0.8)]})
        self.play(Indicate(e2.atomes[1], color=EXPO_C, scale_factor=1.3),
                  Indicate(e2.expos, color=EXPO_C, scale_factor=1.6), run_time=0.6)
        self.attendre_voix(marge=0.8)

    # ── 05 : le piège : 64 n'est pas 32² ────────────────────────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        self.dit(self.lg("Le piège : diviser par l'exposant.", 0, 3.15, 42, PIEGE, maxw=11.5), "Le piège : diviser par l'exposant.")
        g8 = grille(8, 0.1, P(1.75, 1.5), VERT_OK, 0.5)
        l8 = T("64", 30, VERT_OK, audit=False).next_to(g8, DOWN, buff=0.15)
        g32 = grille(32, 0.1, P(4.5, 0.75), PIEGE, 0.3)
        e1 = teinter(Pu("64, ce n'est pas 32² !", 48), {"32": PIEGE, "!": PIEGE}).move_to(P(-3.0, 1.9))
        e1.align_to(P(-6.2, 0), LEFT)
        self.poser_avec(e1, "64, ce n'est pas 32 au carré !", {0: lambda: [FadeIn(g8, scale=0.8), FadeIn(l8)]})
        e2 = teinter(Pu("32², c'est 32 × 32 :", 46), {"32": PIEGE}).move_to(P(-3.0, 0.85)).align_to(P(-6.2, 0), LEFT)
        self.poser_avec(e2, "32 au carré, c'est 32 fois 32 :", {6: lambda: [Create(g32[0])],
                                                                  8: lambda: [Create(g32[1])]}, rt=0.3)
        e3 = Pu("plus de 1 000 !", 50, PIEGE).move_to(P(-3.0, -0.2)).align_to(P(-6.2, 0), LEFT)
        l32 = T("plus de 1 000", 30, PIEGE, audit=False).next_to(g32, DOWN, buff=0.15)
        self.poser_avec(e3, "plus de 1 000.", {0: lambda: [FadeIn(l32)]})
        self.play(Indicate(g32, color=PIEGE, scale_factor=1.04), run_time=0.5)
        b1 = self.lg("Le bon test : multiplier", -1.0, -1.85, 42, JAUNE_TITRE, maxw=9)
        b2 = self.lg("le nombre par lui-même.", -1.0, -2.6, 42, JAUNE_TITRE, maxw=9)
        self.dit(b1, "Le bon test : multiplier")
        self.dit(b2, "le nombre par lui-même.")
        self.play(Create(SurroundingRectangle(VGroup(b1, b2), color=JAUNE_TITRE, buff=0.2, corner_radius=0.1, stroke_width=4)), run_time=0.3)
        self.attendre_voix(marge=0.8)

    # ── 05q : QUESTION 2 (50 n'est pas un carré) ────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = -2.2
        self.cartes_larges = True
        pts = en_vrac(50, -6.0, -3.2, -2.0, 1.2, 0.27, graine=9)
        tas = VGroup(*[spot(0.1).move_to(p) for p in pts])
        lab = T("50 projecteurs", 30, CIEL).move_to(P(-4.6, 1.85))
        c7 = places(7, 7, 0.36, P(-4.75, -0.55))
        seul = P(-3.31, -1.63)  # 8e colonne, bien dans le carré de 8 × 8
        c8 = Square(8 * 0.36, color=PIEGE, stroke_width=3)
        c8.move_to(P(-4.75, -0.55) + P(0.18, -0.18))  # le carré de 8 × 8 : une rangée et une colonne de plus
        c8 = DashedVMobject(c8, num_dashes=44)

        def avant(sc):
            ref = sc.q_q[0]
            e = Pu("50 est-il un carré ?", 34)
            e.scale_to_fit_height(ref.height).move_to(ref)
            sc.q_q.remove(ref)
            sc.poser_avec(e, "50 est-il un carré ?",
                          {0: lambda: [LaggedStart(*[FadeIn(s, scale=0.4) for s in tas], lag_ratio=0.01), FadeIn(lab)]})

        def apres(sc):
            sc.ph_eq(0, "Réponse B : 7² = 49 et 8² = 64.",
                     "Réponse B : 7 au carré égale 49, et 8 au carré égale 64.", premier=True,
                     avec=[*[tas[k].animate.move_to(c7[k]) for k in range(49)], tas[49].animate.move_to(seul),
                           FadeOut(lab)])
            sc.play(Create(c8), run_time=0.4)
            sc.ph_eq(1, "50 est entre les deux :", "50 est entre les deux :",
                     avec=[Indicate(tas[49], color=PIEGE, scale_factor=1.8)])
            sc.ph_eq(2, "ce n'est pas un carré.", "ce n'est pas un carré.", couleur=PIEGE)
            sc.rep_fini()

        self.question_pause("05q-question", "05r-reponse", ["50 est-il un carré ?"],
                            [Pu("Oui, 25²", 40), Pu("Non, il est entre 7² et 8²", 40), Pu("Oui, 5²", 40)], 1,
                            ["Réponse B : 7² = 49 et 8² = 64.", "50 est entre les deux :", "ce n'est pas un carré."],
                            avant_q=avant, autres_r=apres)
        self.cartes_larges = False
        self.XL = type(self).XL

    # ── 06 : le défi ────────────────────────────────────────────────────────
    def defi_figures(self):
        s81 = VGroup(*[spot(0.065).move_to(p) for p in en_vrac(81, -6.2, -2.9, 0.9, 2.45, 0.16, graine=21)])
        b27 = VGroup(*[petit_cube(0.2).move_to(p) for p in en_vrac(27, -6.1, -2.9, -0.75, 0.6, 0.3, graine=22)])
        c1000 = cube_grille(10, 0.1, P(-4.55, -1.75))
        return s81, b27, c1000

    def ecran_defi(self):
        self.ecran("06-defi")
        tit = T("À toi de jouer !", 56, JAUNE_TITRE).move_to(P(0, 3.05))
        self.au("À toi", Write(tit), rt=0.5)
        s81, b27, c1000 = self.defi_figures()
        l1 = teinter(self.lg("Écris 81 comme un carré,", 1.4, 1.7, 42, maxw=7.6), {"carré": EXPO_C})
        self.poser_avec(l1, "Écris 81 comme un carré,", {1: lambda: [LaggedStart(*[FadeIn(s, scale=0.4) for s in s81], lag_ratio=0.01)]})
        l2 = teinter(self.lg("27 comme un cube,", 1.4, 0.0, 42, maxw=7.6), {"cube": EXPO_C})
        self.poser_avec(l2, "27 comme un cube,", {0: lambda: [LaggedStart(*[FadeIn(b, scale=0.4) for b in b27], lag_ratio=0.03)]})
        l3 = teinter(self.lg("et 1 000 avec un exposant.", 1.4, -1.7, 42, maxw=7.6), {"exposant": EXPO_C})
        self.poser_avec(l3, "et 1 000 avec un exposant.", {1: lambda: [FadeIn(c1000, scale=0.8)]})
        pz = T("Mets pause, et cherche !", 40, ORANGE_RETENUE).move_to(P(0.6, -2.85))
        self.au("Mets pause", Write(pz), rt=0.5)
        self.attendre_voix(marge=2.0)

    # ── 06b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        self.ecran("06b-correction")
        s81, b27, c1000 = self.defi_figures()
        self.add(s81, b27, c1000)
        self.au("Correction", FadeIn(T("Correction", 46, JAUNE_TITRE).move_to(P(0, 3.2))), rt=0.25)
        c9 = places(9, 9, 0.165, P(-4.55, 1.6))
        e1 = teinter(Pu("9 × 9 = 81", 44), {"9": BASE_C}).move_to(P(-0.4, 1.6))
        self.poser_avec(e1, "9 fois 9 égale 81 :", {0: lambda: [s81[k].animate.move_to(c9[k]) for k in range(81)]}, rt=0.3)
        self.play(*[s.lent.animate.set_fill(LUMIERE) for s in s81], run_time=0.3)
        f1 = teinter(Pu("81 = 9²", 50), {"81": VERT_OK, "9": BASE_C}).move_to(P(4.25, 1.6))
        self.dire_eq(f1, "81 égale 9 au carré.", echelle=1.25)
        self.play(Create(self.cadre_ok(f1, 0.16)), run_time=0.25)
        s, o = 0.3, P(-5.2, -0.6)
        cubes = cube_empile(3, s, o)
        cibles = list(cubes.values())
        e2 = teinter(Pu("3 × 3 × 3 = 27", 44), {"3": BASE_C}).move_to(P(-0.4, 0.0))
        for b, c in zip(b27, cibles):
            b.set_z_index(c.z_index)
        self.poser_avec(e2, "3 fois 3 fois 3 égale 27 :",
                        {0: lambda: [Transform(b, c) for b, c in zip(b27, cibles)]}, rt=0.3)
        f2 = teinter(Pu("27 = 3³", 50), {"27": VERT_OK, "3": BASE_C}).move_to(P(4.25, 0.0))
        self.dire_eq(f2, "27 égale 3 au cube.", echelle=1.25)
        self.play(Create(self.cadre_ok(f2, 0.16)), run_time=0.25)
        e3 = teinter(Pu("1 000 a trois zéros :", 44), {"trois": EXPO_C, "zéros": EXPO_C}).move_to(P(-0.4, -1.7))
        zeros(e3.atomes[1])
        self.dit(e3, "1 000 a trois zéros :")
        f3 = teinter(Pu("10³", 54), {"10": BASE_C}).move_to(P(4.25, -1.7))
        self.dire_eq(f3, "10 au cube.", echelle=1.25)
        self.play(Create(self.cadre_ok(f3, 0.16)), run_time=0.25)
        self.attendre_voix(marge=1.0)

    # ── 07 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("07-finale", 0.5)
        self.XL = -1.5
        g = VGroup(*[spot(0.11, True).move_to(p) for p in places(8, 8, 0.3)])
        f1 = teinter(Pu("64 = 8²", 40).sans_audit(), {"64": VERT_OK, "8": BASE_C})
        f1.next_to(g, DOWN, buff=0.3)
        cubes = cube_empile(4, 0.36, ORIGIN)
        cg = VGroup(*cubes.values())
        f2 = teinter(Pu("64 = 4³", 40).sans_audit(), {"64": VERT_OK, "4": BASE_C})
        f2.next_to(cg, DOWN, buff=0.3)
        fig = VGroup(VGroup(g, f1), VGroup(cg, f2)).arrange(DOWN, buff=0.5)
        lignes = self.finale_colonne([["Un carré : on cherche le nombre", "qui, multiplié par lui-même,", "le donne."],
                                      ["Un cube : le même facteur", "trois fois."],
                                      ["Avec 10, l'exposant", "compte les zéros."]], fs=40, figure=fig)
        self.XL = type(self).XL
        self.play(FadeIn(fig), run_time=0.25)
        for lg in lignes:
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_carre()
        self.ecran_cube()
        self.ecran_question1()
        self.ecran_dix()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("08-abonne")
