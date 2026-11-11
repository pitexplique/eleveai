# mental_defi.py
# EleveAI — Maths 6e — série « Calcul mental », épisode 06 : LE GRAND DÉFI DU CALCUL MENTAL
# (micro entier_calcul_mental_defi, notion entier_calcul_mental), AVEC VOIX. Paysage 16:9,
# CEINTURE VERTE. Short jumeau : film Ti Margo (prototypes/ti-margo/films/mental-defi.js).
# Décor et métier : Nathan, DÉVELOPPEUR DE JEUX VIDÉO (centres : jeux-video, jeux-defis).
# Micro → écrans : défi 1, une somme, on regroupe les petits (02) ; défi 2, des groupes égaux,
# la multiplication (03, question 04 : la division) ; vérifier avec un ordre de grandeur (05,
# question 07) ; défi 3, une durée (06) ; défi à deux étapes (08), appris (09).
# Voix : manim/voix/6e-mental-defi.json (Julie, débit −6) ; marques : mental_defi_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/mental_defi.py MentalDefi6e
# python -m manim render -qh --disable_caching manim/scripts/6e/mental_defi.py MentalDefi6e -o eleveai-maths-6e-mental-defi --media_dir manim/scripts/6e/media-men-06
# Sortie : manim/sorties/6e/maths/calcul-mental/06-defi/eleveai-maths-6e-mental-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from mental_commun import *  # noqa: E402,F403

MOINS = "−"
OR = "#fbbf24"
OR_F = "#b45309"
ECRAN = "#0b1a3a"


# ── Le personnage et les objets du jeu ─────────────────────────────────────
def nathan(s=1.0):
    """Nathan, développeur de jeux vidéo : sweat à capuche, lunettes, manette en main."""
    p = visage(personne(peau="#8d5524", tenue="#0f766e", cheveux="#111827", s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    verres = VGroup(*[Circle(radius=0.2 * r, color="#111827", stroke_width=4).move_to(c + P(x * r, -0.18 * r))
                      for x in (-0.36, 0.36)])
    pont = Line(c + P(-0.16 * r, -0.18 * r), c + P(0.16 * r, -0.18 * r), color="#111827", stroke_width=4)
    corps = p.corps
    capuche = Arc(radius=0.36 * s, start_angle=PI + 0.25, angle=PI - 0.5, arc_center=corps.get_top() + DOWN * 0.02,
                  color="#115e59", stroke_width=10 * s)
    cordons = VGroup(*[Line(corps.get_top() + P(x * s, -0.12 * s), corps.get_top() + P(x * s, -0.5 * s),
                            color=WHITE, stroke_width=3) for x in (-0.12, 0.12)])
    m = manette(0.55 * s).move_to(corps.get_center() + DOWN * 0.25 * s)
    p.add(capuche, cordons, verres, pont, m)
    return p


def piece_or(r=0.16):
    return VGroup(Circle(radius=r, fill_color=OR, fill_opacity=1, stroke_color=OR_F, stroke_width=3),
                  Circle(radius=r * 0.58, color="#f59e0b", stroke_width=2))


def manette(s=1.0):
    corps = RoundedRectangle(width=1.7 * s, height=0.9 * s, corner_radius=0.38 * s, fill_color="#334155",
                             fill_opacity=1, stroke_color="#94a3b8", stroke_width=3)
    croix = VGroup(Rectangle(width=0.42 * s, height=0.13 * s), Rectangle(width=0.13 * s, height=0.42 * s))
    croix.set_fill("#e2e8f0", 1).set_stroke(width=0).move_to(corps.get_center() + LEFT * 0.45 * s)
    boutons = VGroup(*[Circle(radius=0.08 * s, fill_color=c, fill_opacity=1, stroke_width=0)
                       .move_to(corps.get_center() + P(0.45 * s + dx * s, dy * s))
                       for c, dx, dy in (("#ef4444", 0.15, 0), ("#22c55e", -0.15, 0), ("#3b82f6", 0, 0.15),
                                         ("#facc15", 0, -0.15))])
    return VGroup(corps, croix, boutons)


def heros(s=1.0, couleur="#22c55e"):
    """Le héros du jeu, à la façon des pixels : tête, tunique, jambes."""
    tete = Square(side_length=0.36 * s, fill_color="#fcd34d", fill_opacity=1, stroke_width=0)
    cheveux = Rectangle(width=0.36 * s, height=0.1 * s, fill_color="#92400e", fill_opacity=1,
                        stroke_width=0).next_to(tete, UP, buff=0).shift(DOWN * 0.1 * s)
    yeux = VGroup(*[Square(side_length=0.06 * s, fill_color=BLACK, fill_opacity=1, stroke_width=0)
                    .move_to(tete.get_center() + P(x * s, 0)) for x in (-0.08, 0.08)])
    corps = Rectangle(width=0.44 * s, height=0.42 * s, fill_color=couleur, fill_opacity=1,
                      stroke_width=0).next_to(tete, DOWN, buff=0)
    jambes = VGroup(*[Rectangle(width=0.14 * s, height=0.24 * s, fill_color="#1e3a8a", fill_opacity=1, stroke_width=0)
                      .next_to(corps, DOWN, buff=0).shift(RIGHT * x * s) for x in (-0.1, 0.1)])
    return VGroup(corps, jambes, tete, cheveux, yeux)


def ecran_jeu(w=4.6, h=2.6):
    """Un écran d'ordinateur : cadre, fond du jeu, sol, pied."""
    cadre = RoundedRectangle(width=w + 0.3, height=h + 0.3, corner_radius=0.15, fill_color="#1f2937", fill_opacity=1,
                             stroke_color="#94a3b8", stroke_width=4)
    fond = Rectangle(width=w, height=h, fill_color=ECRAN, fill_opacity=1, stroke_width=0)
    sol = Rectangle(width=w, height=0.35, fill_color="#166534", fill_opacity=1, stroke_width=0).align_to(fond, DOWN)
    pied = Polygon(P(-0.35, 0), P(0.35, 0), P(0.6, -0.45), P(-0.6, -0.45), fill_color="#475569", fill_opacity=1,
                   stroke_width=0).next_to(cadre, DOWN, buff=0)
    g = VGroup(pied, cadre, fond, sol)
    g.fond, g.sol = fond, sol
    return g


def epee(s=1.0):
    lame = Polygon(P(-0.09, -0.2), P(0.09, -0.2), P(0.09, 0.75), P(0, 0.92), P(-0.09, 0.75), fill_color="#e2e8f0",
                   fill_opacity=1, stroke_color="#94a3b8", stroke_width=2)
    garde = RoundedRectangle(width=0.55, height=0.11, corner_radius=0.04, fill_color=OR, fill_opacity=1,
                             stroke_width=0).move_to(P(0, -0.24))
    manche = Rectangle(width=0.1, height=0.3, fill_color="#78350f", fill_opacity=1, stroke_width=0).move_to(P(0, -0.44))
    pommeau = Circle(radius=0.07, fill_color=OR, fill_opacity=1, stroke_width=0).move_to(P(0, -0.62))
    return VGroup(lame, garde, manche, pommeau).scale(s)


def potion(s=1.0):
    fiole = Circle(radius=0.36, fill_color="#c026d3", fill_opacity=1, stroke_color="#f5d0fe", stroke_width=4)
    reflet = Arc(radius=0.24, start_angle=1.9, angle=0.9, color=WHITE, stroke_width=4)
    col = Rectangle(width=0.2, height=0.3, fill_color="#f5d0fe", fill_opacity=0.5, stroke_color="#f5d0fe",
                    stroke_width=3).move_to(P(0, 0.48))
    bouchon = RoundedRectangle(width=0.26, height=0.14, corner_radius=0.04, fill_color="#a16207", fill_opacity=1,
                               stroke_width=0).move_to(P(0, 0.68))
    return VGroup(col, fiole, reflet, bouchon).scale(s)


def carte_tresor(s=1.0):
    papier = RoundedRectangle(width=1.05, height=0.8, corner_radius=0.08, fill_color="#fde68a", fill_opacity=1,
                              stroke_color="#a16207", stroke_width=3)
    chemin = DashedVMobject(ArcBetweenPoints(P(-0.38, -0.22), P(0.24, 0.16), angle=-1.2, color="#92400e",
                                             stroke_width=4), num_dashes=7)
    x = VGroup(Line(P(0.18, 0.08), P(0.36, 0.26)), Line(P(0.18, 0.26), P(0.36, 0.08))).set_stroke("#dc2626", 5)
    return VGroup(papier, chemin, x).scale(s)


def fleche_arc(s=1.0):
    tige = Line(P(-0.5, 0), P(0.42, 0), color="#a16207", stroke_width=6)
    pointe = Polygon(P(0.42, -0.1), P(0.62, 0), P(0.42, 0.1), fill_color="#cbd5e1", fill_opacity=1, stroke_width=0)
    plumes = VGroup(*[Polygon(P(-0.52, 0), P(-0.36, 0), P(-0.48, k * 0.13), P(-0.62, k * 0.13), fill_color="#ef4444",
                              fill_opacity=1, stroke_width=0) for k in (-1, 1)])
    return VGroup(tige, pointe, plumes).scale(s)


def armure(s=1.0):
    plastron = Polygon(P(-0.5, 0.45), P(-0.2, 0.55), P(0, 0.4), P(0.2, 0.55), P(0.5, 0.45), P(0.42, -0.45),
                       P(0, -0.62), P(-0.42, -0.45), fill_color="#64748b", fill_opacity=1, stroke_color="#cbd5e1",
                       stroke_width=4)
    epaules = VGroup(*[Ellipse(width=0.42, height=0.26, fill_color="#94a3b8", fill_opacity=1, stroke_color="#cbd5e1",
                               stroke_width=3).move_to(P(x, 0.45)) for x in (-0.55, 0.55)])
    blason = Polygon(P(-0.14, 0.12), P(0.14, 0.12), P(0.14, -0.08), P(0, -0.22), P(-0.14, -0.08), fill_color=OR,
                     fill_opacity=1, stroke_width=0)
    return VGroup(plastron, epaules, blason).scale(s)


def coffre(s=1.0):
    caisse = Rectangle(width=1.4, height=0.75, fill_color="#92400e", fill_opacity=1, stroke_color="#451a03",
                       stroke_width=4).move_to(P(0, -0.2))
    couvercle = RoundedRectangle(width=1.4, height=0.42, corner_radius=0.18, fill_color="#b45309", fill_opacity=1,
                                 stroke_color="#451a03", stroke_width=4).move_to(P(0, 0.36))
    serrure = RoundedRectangle(width=0.22, height=0.26, corner_radius=0.05, fill_color=OR, fill_opacity=1,
                               stroke_width=0).move_to(P(0, 0.14))
    pieces = VGroup(*[piece_or(0.14).move_to(P(x, 0.66 + 0.06 * (i % 2))) for i, x in enumerate((-0.4, -0.13, 0.14, 0.41))])
    return VGroup(pieces, caisse, couvercle, serrure).scale(s)


def chateau(s=1.0):
    mur = Rectangle(width=2.6, height=0.6, fill_color="#57534e", fill_opacity=1, stroke_color="#a8a29e", stroke_width=3)
    tours = VGroup(*[Rectangle(width=0.5, height=1.0, fill_color="#78716c", fill_opacity=1, stroke_color="#a8a29e",
                               stroke_width=3).move_to(P(x, 0.2)) for x in (-1.3, 1.3)])
    creneaux = VGroup(*[Square(side_length=0.18, fill_color="#57534e", fill_opacity=1, stroke_width=0)
                        .move_to(P(x, 0.39)) for x in (-0.9, -0.45, 0, 0.45, 0.9)])
    toits = VGroup(*[Triangle(fill_color="#dc2626", fill_opacity=1, stroke_width=0).scale(0.33).stretch(1.3, 1)
                     .move_to(P(x, 0.98)) for x in (-1.3, 1.3)])
    porte = AnnularSector(inner_radius=0, outer_radius=0.22, angle=PI, start_angle=0, fill_color="#1c1917",
                          fill_opacity=1, stroke_width=0).move_to(P(0, -0.12))
    return VGroup(mur, creneaux, tours, toits, porte).scale(s)


def ami(s=1.0, couleur="#38bdf8"):
    """Un ami du héros : une tête ronde qui sourit."""
    t = Circle(radius=0.28, fill_color=couleur, fill_opacity=1, stroke_width=0)
    yeux = VGroup(*[Dot(P(x, 0.05), radius=0.035, color=BLACK) for x in (-0.1, 0.1)])
    bouche = Arc(radius=0.12, start_angle=-2.4, angle=1.66, arc_center=P(0, 0.02), color=BLACK, stroke_width=3)
    return VGroup(t, yeux, bouche).scale(s)


def horloge(r=0.9, h=15, m=35):
    """Un cadran sans chiffres (12 traits) ; .aig_h, .aig_m tournent autour de .centre."""
    cad = Circle(radius=r, fill_color="#f8fafc", fill_opacity=1, stroke_color="#94a3b8", stroke_width=6)
    traits = VGroup(*[Line(P(0, r * (0.8 if k % 3 else 0.7)), P(0, r * 0.92), color="#334155",
                           stroke_width=5 if k % 3 == 0 else 3).rotate(-k * TAU / 12, about_point=ORIGIN)
                      for k in range(12)])
    ah = Line(ORIGIN, P(0, r * 0.5), color="#1e293b", stroke_width=9)
    am = Line(ORIGIN, P(0, r * 0.78), color="#0ea5e9", stroke_width=6)
    ah.rotate(-((h % 12) + m / 60) / 12 * TAU, about_point=ORIGIN)
    am.rotate(-m / 60 * TAU, about_point=ORIGIN)
    pivot = Dot(ORIGIN, radius=0.07, color="#1e293b")
    g = VGroup(cad, traits, ah, am, pivot)
    g.aig_h, g.aig_m, g.pivot = ah, am, pivot
    return g


class MentalDefiBase(PaysageMental):
    nom_voix = "6e-mental-defi"
    fichier_marques = "mental_defi_marques.json"

    # « 9 ×7 », « 96 ≈100 » : ces signes n'ont presque pas d'approche à droite ; les lignes de
    # calcul de cet épisode prennent un espace plus large (0,26 au lieu de 0,18).
    def etapes(self, bd, morceaux, y, fs=38, xl=-5.6, gestes=None, couleurs=None, buff=0.26):
        gestes = gestes or {}
        n = len(morceaux)
        cs = couleurs or [WHITE] * (n - 1) + [VERT_OK]
        lg = self.ligne([(m, c) for (m, _), c in zip(morceaux, cs)], fs, buff=buff)
        self.col(lg, y, xl=xl)
        for i, (m, mot) in enumerate(morceaux):
            if mot:
                self.au_mot(mot)
            self.play(FadeIn(lg[i], shift=UP * 0.1), *gestes.get(i, []), run_time=0.3)
        return lg

    def ligne_mots(self, morceaux, mots, y, fs=36, xl=None, buff=0.26):
        return super().ligne_mots(morceaux, mots, y, fs=fs, xl=xl, buff=buff)

    def ligne_rep(self, i, morceaux, fs=None):
        """Celle du module, avec un peu d'air après « × » et « ≈ »."""
        lg = super().ligne_rep(i, morceaux, fs)
        d = 0.0
        for k in range(1, len(lg)):
            if morceaux[k - 1].rstrip().endswith(("×", "≈", "÷")):
                d += 0.08
            lg[k].shift(RIGHT * d)
        return lg

    def mots_au_centre(self, morceaux, mots, centre, fs=32, buff=0.16, avec=None, empiler=False):
        """Une ligne centrée en `centre` (sous un dessin), chaque morceau à son mot ;
        avec[i] : les gestes joués avec le morceau i."""
        avec = avec or {}
        lg = self.ligne(morceaux, fs, buff=buff)
        if empiler:
            lg.arrange(DOWN, buff=0.14)
        lg.move_to(centre)
        for i, (m, mot) in enumerate(zip(lg, mots)):
            if mot:
                self.au_mot(mot)
            self.play(FadeIn(m, shift=UP * 0.1), *avec.get(i, []), run_time=0.4 if i in avec else 0.28)
        return lg

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Le grand défi du calcul mental", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Le grand")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Sauras-tu résoudre", "ces problèmes de tête ?"], 40).move_to(P(-3.0, 0.45))
        man = manette(1.5).move_to(P(3.3, 0.45))
        self.au_mot("Sauras")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(man, shift=LEFT * 0.4), run_time=0.4)
        self.au_mot("ces problèmes")
        self.play(FadeIn(q[1], shift=UP * 0.2), run_time=0.35)
        self.play(Wiggle(man, scale_value=1.15), run_time=0.7)
        self.attendre_voix(marge=0.6)

    # ── 01 : Nathan, développeur de jeux vidéo ──────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        na = nathan(1.05).move_to(P(-4.5, 0.25))
        self.au_mot("Voici Nathan")
        nom = self.t("Nathan", 42, BLEU_CALCUL).next_to(na, UP, buff=0.2)
        self.play(FadeIn(na, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("développeur")
        met = self.bloc(["développeur", "de jeux vidéo"], 28, BLEU_CALCUL).next_to(na, DOWN, buff=0.18)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.3)
        ec = ecran_jeu(4.6, 2.5).move_to(P(1.4, 1.35))
        f = ec.fond
        h = heros(1.0).move_to(f.get_left() + RIGHT * 0.8).align_to(ec.sol, DOWN).shift(UP * 0.35)
        self.au_mot("Dans son jeu")
        self.play(FadeIn(ec, shift=UP * 0.3), FadeIn(h), run_time=0.45)
        self.au_mot("le héros gagne")
        l1 = self.t("Le héros gagne des pièces", 34)
        self.col(l1, -0.95, xl=-2.3)
        ps = VGroup(*[piece_or(0.15).move_to(f.get_center() + P(-0.9 + 0.5 * k, 0.55 + 0.12 * (k % 2)))
                      for k in range(5)])
        self.play(FadeIn(l1, shift=UP * 0.1), h.animate.shift(UP * 0.45), LaggedStart(*[FadeIn(p, scale=1.5) for p in ps],
                                                                                  lag_ratio=0.15), run_time=0.5)
        self.play(h.animate.shift(DOWN * 0.45), run_time=0.25)
        self.au_mot("et achète")
        l2 = self.t("et achète des objets.", 34)
        self.col(l2, -1.6, xl=-2.3)
        objets = VGroup(epee(0.55), potion(0.55)).arrange(RIGHT, buff=0.4).move_to(f.get_right() + LEFT * 0.95)
        objets.align_to(ec.sol, DOWN).shift(UP * 0.42)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(objets, shift=DOWN * 0.3), run_time=0.4)
        self.au_mot("Nathan vérifie")
        l3 = self.t("Nathan vérifie chaque calcul de tête.", 36, JAUNE_TITRE)
        self.col(l3, -2.5, xl=-2.3)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.4)
        self.play(Indicate(na.yeux, color=JAUNE_TITRE, scale_factor=1.4), run_time=0.5)
        self.attendre_voix()

    # ── 02 : défi 1, une somme : on regroupe les petits ─────────────────────
    def ecran_somme(self):
        self.ecran("02-somme")
        self.au_mot("Défi 1")
        tit = self.t("Défi 1 : le héros achète", 46, JAUNE_TITRE).move_to(P(0, 3.0))
        self.play(Write(tit), run_time=0.45)
        xs = (-4.7, -0.8, 3.1)
        dessins = [epee(0.75), potion(0.85), carte_tresor(0.95)]
        noms = ["une épée à", "une potion à", "une carte à"]
        prix = [("26", "26 pièces"), ("5", "5 pièces"), ("3", "3 pièces")]
        cartes = []
        for x, d, nm, (v, mot) in zip(xs, dessins, noms, prix):
            d.move_to(P(x, 1.85))
            lg = self.ligne([(nm, WHITE), (v, OR)], 28, buff=0.16)
            p = piece_or(0.13).next_to(lg, RIGHT, buff=0.12)
            bloc = VGroup(lg, p).move_to(P(x, 0.95))
            self.au_mot(nm)
            self.play(FadeIn(d, shift=DOWN * 0.3), FadeIn(lg[0]), run_time=0.3)
            self.au_mot(mot)
            self.play(FadeIn(lg[1], scale=1.3), FadeIn(p, scale=1.3), run_time=0.3)
            cartes.append(VGroup(d, bloc))
        self.au_mot("On regroupe")
        cadre = SurroundingRectangle(VGroup(cartes[1], cartes[2]), color=ORANGE_RETENUE, buff=0.15, corner_radius=0.12,
                                     stroke_width=5)
        l0 = self.t("On regroupe les petits :", 36, ORANGE_RETENUE)
        self.col(l0, 0.15, xl=-5.6)
        self.play(FadeIn(l0, shift=UP * 0.1), Create(cadre), run_time=0.4)
        self.etapes(None, [("5 +", "5 plus 3"), ("3", "3, ça"), ("= 8.", "8. Puis")], 0.15, xl=0.6,
                    couleurs=[WHITE, WHITE, VERT_OK])
        bd = Bonds(26, 34, x0=-5.0, x1=1.2, y=-1.35, fs=38)
        self.play(Create(bd.trait), run_time=0.3)
        t26, b1, t34 = bd.tic(26), bd.bond(26, 34, "+ 8", haut=0.35), bd.tic(34, VERT_OK)
        self.etapes(bd, [("26 +", "26 plus"), ("8", "8 : 34"), ("= 34 pièces.", "34 pièces")], -2.6,
                    gestes={0: [Create(t26[0]), FadeIn(t26[1])], 1: [Create(b1.fleche), FadeIn(b1.etiquette, scale=1.3)],
                            2: [Create(t34[0]), FadeIn(t34[1], scale=1.3)]})
        g = self.gros("34 pièces", fs=48).move_to(P(4.1, -1.3))
        self.play(FadeIn(g, scale=1.3), run_time=0.35)
        self.insister(g, 1.12, 0.25)
        self.attendre_voix()

    # ── 03 : défi 2, des groupes égaux : la multiplication ──────────────────
    def ecran_groupes(self):
        self.ecran("03-groupes")
        self.au_mot("Défi 2")
        tit = self.t("Défi 2 : le château", 46, JAUNE_TITRE).move_to(P(0.9, 3.0))
        ch = chateau(0.62).move_to(P(-4.45, 2.75))
        self.play(Write(tit), FadeIn(ch, shift=DOWN * 0.2), run_time=0.45)
        couloirs, pieces = VGroup(), VGroup()
        for i in range(9):
            y = 1.95 - 0.47 * i
            couloirs.add(RoundedRectangle(width=3.4, height=0.4, corner_radius=0.08, fill_color="#292524",
                                          fill_opacity=1, stroke_color="#78716c", stroke_width=2).move_to(P(-4.45, y)))
            pieces.add(VGroup(*[piece_or(0.15).move_to(P(-5.85 + 0.47 * k, y)) for k in range(7)]))
        l1 = self.col(self.ligne([("Le château a", WHITE), ("9 couloirs.", AMBRE_D)], 38, buff=0.18), 1.9, xl=-1.9)
        self.au_mot("le château")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.28)
        self.au_mot("9 couloirs")
        self.play(FadeIn(l1[1], shift=UP * 0.1),
                  LaggedStart(*[FadeIn(c, shift=RIGHT * 0.2) for c in couloirs], lag_ratio=0.08), run_time=0.6)
        l2 = self.col(self.ligne([("Dans chaque couloir,", WHITE), ("7 pièces d'or.", OR)], 38, buff=0.18), 1.1, xl=-1.9)
        self.au_mot("Dans chaque")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.28)
        self.au_mot("7 pièces")
        self.play(FadeIn(l2[1], shift=UP * 0.1), LaggedStart(*[FadeIn(p, scale=1.4) for p in pieces[0]], lag_ratio=0.1),
                  run_time=0.45)
        self.play(LaggedStart(*[FadeIn(r) for r in pieces[1:]], lag_ratio=0.1), run_time=0.7)
        g = self.gros("63 pièces d'or", fs=46).move_to(P(1.6, -1.5))
        self.etapes(None, [("9 ×", "9 fois"), ("7", "7, ça"), ("= 63.", "63 pièces")], -0.2, fs=44, xl=-1.9,
                    gestes={2: [FadeIn(g, scale=1.3), Indicate(pieces, color=JAUNE_TITRE, scale_factor=1.06)]})
        self.attendre_voix()

    # ── 04 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        amis = VGroup(*[ami(1.0, c) for c in ("#38bdf8", "#f472b6", "#a3e635", "#fb923c", "#c084fc", "#facc15",
                                              "#2dd4bf", "#f87171", "#60a5fa")])
        for i, a in enumerate(amis):
            a.move_to(P(-5.4 + 1.45 * (i % 3), 1.45 - 1.2 * (i // 3)))
        tas = VGroup(*[VGroup(*[piece_or(0.075).move_to(a.get_center() + P(-0.48 + 0.16 * k, -0.47)) for k in range(7)])
                       for a in amis])

        def avant_q(sc):
            sc.play(LaggedStart(*[FadeIn(a, scale=0.6) for a in amis], lag_ratio=0.08), run_time=0.6)

        def apres(sc):
            lg0 = sc.ligne_rep(0, ["9 ×", "7", "= 63."])
            sc.au_mot("9 fois")
            sc.play(FadeIn(lg0[0], shift=UP * 0.1), run_time=0.25)
            sc.au_mot("7, ça")
            sc.play(FadeIn(lg0[1], shift=UP * 0.1), run_time=0.25)
            sc.au_mot("63. Donc")
            sc.play(FadeIn(lg0[2], shift=UP * 0.1), run_time=0.25)
            lg1 = sc.ligne_rep(1, ["Donc 63 ÷", "9", "= 7"])
            sc.au_mot("Donc 63")
            sc.play(FadeIn(lg1[0], shift=UP * 0.1), run_time=0.25)
            sc.au_mot("9, ça")
            sc.play(FadeIn(lg1[1], shift=UP * 0.1), Indicate(amis, color=WHITE, scale_factor=1.1), run_time=0.3)
            lg2 = sc.ligne_rep(2, ["pièces chacun."])
            sc.au_mot("7 pièces")
            sc.play(FadeIn(lg1[2], shift=UP * 0.1), FadeIn(lg2[0], shift=UP * 0.1),
                    LaggedStart(*[FadeIn(t, shift=DOWN * 0.15) for t in tas], lag_ratio=0.06), run_time=0.5)
            sc.rep_fini()

        self.question_pause("04-question", "04b-reponse", ["Le héros partage ses 63 pièces", "entre 9 amis.",
                                                           "Combien chacun ?"],
                            [self.t("54", 36), self.t("7", 36), self.t("8", 36)], 1,
                            ["9 × 7 = 63.", "Donc 63 ÷ 9 = 7", "pièces chacun."], mot_q="Le héros",
                            avant_q=avant_q, autres_r=apres)

    # ── 05 : vérifier avec un ordre de grandeur ─────────────────────────────
    def ecran_ordre(self):
        self.ecran("05-ordre")
        self.au_mot("Nathan vérifie")
        tit = self.t("Vérifier avec un ordre de grandeur", 42, JAUNE_TITRE).move_to(P(0, 3.0))
        self.play(Write(tit), run_time=0.5)
        self.ligne_mots([("96 " + MOINS, WHITE), ("27", AMBRE_D)], ["96 moins", "27 : 96"], 2.1, fs=40, xl=-5.6)
        self.ligne_mots([("96 ≈", WHITE), ("100", ROND)], ["96, c'est", "100. 27"], 2.1, fs=40, xl=-2.3)
        self.ligne_mots([("27 ≈", AMBRE_D), ("30", ROND)], ["27, c'est", "30. 100"], 2.1, fs=40, xl=0.9)
        bd = Bonds(60, 130, x0=-5.0, x1=3.9, y=0.0, fs=36)
        self.play(Create(bd.trait), run_time=0.3)
        t100, b1, t70 = bd.tic(100, ROND), bd.bond(100, 70, MOINS + " 30", ROSE_D, haut=0.5), bd.tic(70)
        t70[1].shift(RIGHT * 0.35)
        self.etapes(bd, [("100 " + MOINS, "100 moins"), ("30", "30, ça"), ("= 70.", "70. Le")], 1.25, xl=1.0,
                    gestes={0: [Create(t100[0]), FadeIn(t100[1])], 1: [Create(b1.fleche), FadeIn(b1.etiquette, scale=1.3)],
                            2: [Create(t70[0]), FadeIn(t70[1])]})
        zone = Rectangle(width=bd.x(76) - bd.x(64), height=0.5, fill_color=ROND, fill_opacity=0.25,
                         stroke_color=ROND, stroke_width=3).move_to(bd.pt(70))
        self.au_mot("Le résultat")
        l1 = self.t("Le résultat est autour de 70.", 36, ROND)
        self.col(l1, -1.3, xl=-5.6)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(zone), run_time=0.4)
        t69 = bd.tic(69, VERT_OK)
        t69[1].shift(LEFT * 0.55)
        ok = self.coche(VERT_OK, 0.3).next_to(t69[1], LEFT, buff=0.12)
        l2 = self.col(self.ligne([("69,", VERT_OK), ("c'est raisonnable.", VERT_OK)], 36, buff=0.16), -2.0, xl=-5.6)
        self.au_mot("69, c'est")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Create(t69[0]), FadeIn(t69[1], scale=1.3), run_time=0.3)
        self.au_mot("raisonnable")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Create(ok), run_time=0.3)
        t123 = bd.tic(123, ROUGE_ERREUR)
        self.au_mot("123, non")
        l3 = self.ligne([("123, non :", ROUGE_ERREUR), ("on a ajouté au lieu d'enlever !", ROUGE_ERREUR)], 34, buff=0.16)
        self.col(l3, -2.7, xl=-5.6)
        self.play(FadeIn(l3[0], shift=UP * 0.1), Create(t123[0]), FadeIn(t123[1], scale=1.3), run_time=0.3)
        self.play(Create(self.barrer(t123[1])), run_time=0.3)
        self.au_mot("on a ajouté")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.35)
        self.attendre_voix()

    # ── 06 : défi 3, une durée ──────────────────────────────────────────────
    def ecran_horaire(self):
        self.ecran("06-horaire")
        self.au_mot("Défi 3")
        tit = self.t("Défi 3 : la partie", 46, JAUNE_TITRE).move_to(P(0.9, 3.0))
        hor = horloge(0.95, 15, 35).move_to(P(-5.0, 2.0))
        c = hor.pivot.get_center()
        self.play(Write(tit), FadeIn(hor, scale=0.8), run_time=0.45)
        self.ligne_mots([("Une partie commence à", WHITE), ("15 h 35.", BLEU_CALCUL)], ["une partie", "15 h 35"], 2.1,
                        fs=36, xl=-3.6)
        bd = Bonds(935, 1020, x0=-4.6, x1=4.0, y=-0.2, fs=34)
        self.play(Create(bd.trait), run_time=0.3)
        t1535 = bd.tic(935, BLEU_CALCUL, txt="15 h 35")
        self.play(Create(t1535[0]), FadeIn(t1535[1]), run_time=0.3)
        self.ligne_mots([("Elle dure", WHITE), ("1 heure", ROSE_D), ("et 25 minutes.", AMBRE_D)],
                        ["Elle dure", "1 heure", "et 25"], 1.35, fs=36, xl=-3.6)
        b1, t1635 = bd.bond(935, 995, "+ 1 h", ROSE_D, haut=0.4), bd.tic(995, txt="16 h 35")
        self.etapes(bd, [("15 h 35 +", "15 h 35 plus"), ("1 heure", "1 heure : 16"), ("= 16 h 35.", "16 h 35")], -1.5,
                    fs=36, couleurs=[WHITE, ROSE_D, WHITE],
                    gestes={1: [Create(b1.fleche), FadeIn(b1.etiquette, scale=1.3),
                                Rotate(hor.aig_m, -TAU, about_point=c), Rotate(hor.aig_h, -TAU / 12, about_point=c)],
                            2: [Create(t1635[0]), FadeIn(t1635[1])]})
        b2 = bd.bond(995, 1020, "+ 25 min", AMBRE_D, haut=0.4)
        self.au_mot("Puis 25")
        self.play(Rotate(hor.aig_m, -25 / 60 * TAU, about_point=c),
                  Rotate(hor.aig_h, -25 / 60 * TAU / 12, about_point=c), run_time=0.8)
        self.etapes(bd, [("De 35", "de 35"), ("à 60 :", "à 60"), ("+ 25 minutes.", "juste 25")], -2.25, fs=36,
                    couleurs=[WHITE, ROND, AMBRE_D], gestes={2: [Create(b2.fleche), FadeIn(b2.etiquette, scale=1.3)]})
        t17 = bd.tic(1020, VERT_OK, txt="17 h")
        self.au_mot("finit à 17")
        g = self.gros("17 h", fs=52).move_to(P(3.6, -1.95))
        self.play(Create(t17[0]), FadeIn(t17[1], scale=1.3), FadeIn(g, scale=1.3), run_time=0.4)
        self.insister(g, 1.12, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        bd = Bonds(40, 90, x0=-5.9, x1=-0.9, y=0.4, fs=32)

        def autres_q(sc):
            sc.play(Create(bd.trait), run_time=0.3)

        def apres(sc):
            t50, b1, t80 = bd.tic(50, ROND), bd.bond(50, 80, "+ 30", ROSE_D, fs=30), bd.tic(80, VERT_OK)
            lg0 = sc.ligne_rep(0, ["48 ≈", "50."])
            sc.au_mot("48, c'est")
            sc.play(FadeIn(lg0[0], shift=UP * 0.1), run_time=0.25)
            sc.au_mot("50. 31")
            sc.play(FadeIn(lg0[1], shift=UP * 0.1), Create(t50[0]), FadeIn(t50[1]), run_time=0.25)
            lg1 = sc.ligne_rep(1, ["31 ≈", "30."])
            sc.au_mot("31, c'est")
            sc.play(FadeIn(lg1[0], shift=UP * 0.1), run_time=0.25)
            sc.au_mot("30. 50")
            sc.play(FadeIn(lg1[1], shift=UP * 0.1), run_time=0.25)
            lg2 = sc.ligne_rep(2, ["50 + 30 :", "environ 80."])
            sc.au_mot("50 plus 30")
            sc.play(FadeIn(lg2[0], shift=UP * 0.1), Create(b1.fleche), FadeIn(b1.etiquette), run_time=0.3)
            sc.au_mot("environ 80")
            sc.play(FadeIn(lg2[1], shift=UP * 0.1), Create(t80[0]), FadeIn(t80[1]), run_time=0.25)
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse", ["48 + 31, c'est environ combien ?"],
                            [self.t("80", 36), self.t("20", 36), self.t("800", 36)], 0,
                            ["48 ≈ 50.", "31 ≈ 30.", "50 + 30 : environ 80."], mot_q="48 plus",
                            autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        cf = coffre(1.15).move_to(P(-4.4, 1.8))
        self.mots_au_centre([("Le héros a", WHITE), ("100 pièces.", OR)], ["Le héros a", "100 pièces"], P(-4.4, 0.5),
                            fs=34, empiler=True, avec={0: [FadeIn(cf, shift=DOWN * 0.3)]})
        fl = VGroup(*[fleche_arc(0.9) for _ in range(4)]).arrange(DOWN, buff=0.18).move_to(P(-0.2, 1.8))
        self.mots_au_centre([("4 flèches", AMBRE_D), ("à 5 pièces", OR)], ["4 flèches", "5 pièces"], P(-0.2, 0.5),
                            fs=34, empiler=True, avec={0: [LaggedStart(*[FadeIn(f, shift=RIGHT * 0.4) for f in fl], lag_ratio=0.15)]})
        ar = armure(1.2).move_to(P(4.0, 1.85))
        self.mots_au_centre([("une armure", WHITE), ("à 38 pièces", OR)], ["une armure", "38 pièces"], P(4.0, 0.5),
                            fs=34, empiler=True, avec={0: [FadeIn(ar, shift=DOWN * 0.3)]})
        self.au_mot("Combien")
        q = self.t("Combien lui reste-t-il ?", 46, JAUNE_TITRE).move_to(P(0, -0.85))
        self.play(FadeIn(q, shift=UP * 0.15), Wiggle(cf), run_time=0.5)
        self.pause_defi(y=-1.9)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        self.etapes(None, [("4 ×", "4 fois"), ("5", "5, ça"), ("= 20.", "20. 20")], 2.2, xl=-5.6)
        self.etapes(None, [("20 +", "20 plus"), ("38", "38, ça"), ("= 58.", "58. De")], 2.2, xl=0.6)
        bd = Bonds(58, 100, x0=-5.0, x1=4.2, y=0.25, fs=38)
        self.play(Create(bd.trait), run_time=0.25)
        t58, t60, b1 = bd.tic(58), bd.tic(60, ROND), bd.bond(58, 60, "+ 2")
        t58[1].shift(LEFT * 0.35)
        t60[1].shift(RIGHT * 0.32)
        self.etapes(bd, [("De 58", "De 58"), ("à 60,", "à 60, il"), ("il manque 2.", "il manque 2")], -1.2, fs=36,
                    couleurs=[WHITE, ROND, AMBRE_D],
                    gestes={0: [Create(t58[0]), FadeIn(t58[1])], 1: [Create(t60[0]), FadeIn(t60[1])],
                            2: [Create(b1.fleche), FadeIn(b1.etiquette, scale=1.3)]})
        t100, b2 = bd.tic(100, ROND), bd.bond(60, 100, "+ 40", ROSE_D, haut=0.7)
        self.etapes(bd, [("De 60", "De 60"), ("à 100,", "à 100, il"), ("il manque 40.", "il manque 40")], -1.95,
                    fs=36, couleurs=[ROND, ROND, ROSE_D],
                    gestes={1: [Create(t100[0]), FadeIn(t100[1])], 2: [Create(b2.fleche), FadeIn(b2.etiquette, scale=1.3)]})
        self.au_mot("Il lui reste")
        g = self.gros("42 pièces", fs=48).move_to(P(3.55, -1.6))
        self.play(FadeIn(g, scale=1.3), run_time=0.4)
        self.insister(g, 1.12, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        bd = Bonds(60, 130, x0=0, x1=4.6, y=0, fs=32)
        t100, t70, t123 = bd.tic(100, ROND), bd.tic(70, VERT_OK), bd.tic(123, ROUGE_ERREUR)
        fig = VGroup(bd, t100, t70, t123, bd.bond(100, 70, MOINS + " 30", ROSE_D, fs=28, haut=0.5),
                     self.barrer(t123[1]))
        hors_audit(fig)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("On lit le problème et", "on choisit l'opération."),
            ("On coupe le calcul", "en étapes faciles."),
            ("On vérifie avec un", "ordre de grandeur.")], fs=36)
        self.au_mot("On lit")
        self.montrer_ligne(lignes[0])
        self.au_mot("On coupe")
        self.montrer_ligne(lignes[1])
        self.au_mot("On vérifie")
        self.montrer_ligne(lignes[2], Indicate(fig[2], color=VERT_OK, scale_factor=1.4))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_somme()
        self.ecran_groupes()
        self.ecran_question1()
        self.ecran_ordre()
        self.ecran_horaire()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class MentalDefi6e(MentalDefiBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
