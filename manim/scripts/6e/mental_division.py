# mental_division.py
# EleveAI — Maths 6e — série « Calcul mental », épisode 04 : DIVISER DE TÊTE
# (micro entier_division_mentale, notion entier_calcul_mental), AVEC VOIX. Paysage 16:9,
# CEINTURE VERTE. Short jumeau : film Ti Margo (prototypes/ti-margo/films/mental-division.js).
# Décor et métier : Maëlys, SOIGNEUSE AU ZOO (centres : animaux, animaux-marins).
# Micro → écrans : une table sert deux fois, le partage en paquets (02, question 03), couper le
# nombre en morceaux de la table (04), vérifier avec la multiplication (05, question 06),
# ÷ 10 par la valeur des chiffres (07), le piège du 5 oublié (08), défi (09), appris (10).
# ⛔ Division : le signe « ÷ », jamais 56/8.
# Voix : manim/voix/6e-mental-division.json (Julie, débit −6) ; marques : mental_division_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/mental_division.py MentalDivision6e
# python -m manim render -qh --disable_caching manim/scripts/6e/mental_division.py MentalDivision6e -o eleveai-maths-6e-mental-division --media_dir manim/scripts/6e/media-men-04
# Sortie : manim/sorties/6e/maths/calcul-mental/04-division/eleveai-maths-6e-mental-division.mp4

import random
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from mental_commun import *  # noqa: E402,F403

DIV = "÷"
FOIS = "×"
MOINS = "−"
DIZ = "#34d399"


# ── les personnages et les animaux du zoo ───────────────────────────────────
def maelys(s=1.0):
    """Maëlys, soigneuse au zoo : tenue kaki, gilet à poches, seau de poissons."""
    p = visage(personne(peau="#a0662b", tenue="#4d7c0f", cheveux="#1f2937", longs=True, s=s))
    c = p.corps
    gilet = VGroup(*[Polygon(c.get_center() + P(dx * s, 0.65 * s), c.get_center() + P((dx + 0.28 * sg) * s, 0.65 * s),
                             c.get_center() + P((dx + 0.42 * sg) * s, -0.75 * s), c.get_center() + P(dx * s, -0.75 * s),
                             fill_color="#a3a35a", fill_opacity=1, stroke_width=0) for dx, sg in ((-0.08, -1), (0.08, 1))])
    poches = VGroup(*[RoundedRectangle(width=0.26 * s, height=0.2 * s, corner_radius=0.04 * s, fill_color="#6b6b2e",
                                       fill_opacity=1, stroke_width=0).move_to(c.get_center() + P(dx * s, -0.35 * s))
                      for dx in (-0.3, 0.3)])
    bas = c.get_bottom()[1]
    seau = Polygon(P(0.62 * s, bas + 0.62 * s), P(1.12 * s, bas + 0.62 * s), P(1.04 * s, bas + 0.05 * s),
                   P(0.7 * s, bas + 0.05 * s), fill_color="#94a3b8", fill_opacity=1, stroke_color="#e2e8f0", stroke_width=2)
    seau.shift(RIGHT * c.get_center()[0])
    anse = Arc(radius=0.25 * s, start_angle=0, angle=PI, arc_center=seau.get_top(), color="#e2e8f0", stroke_width=3)
    queue = Polygon(seau.get_top() + P(-0.05 * s, 0), seau.get_top() + P(-0.2 * s, 0.22 * s),
                    seau.get_top() + P(0.1 * s, 0.22 * s), fill_color="#7dd3fc", fill_opacity=1, stroke_width=0)
    p.add(gilet, poches, queue, seau, anse)
    return p


def poisson(s=1.0, couleur="#7dd3fc"):
    corps = Ellipse(width=0.5 * s, height=0.24 * s, fill_color=couleur, fill_opacity=1, stroke_width=0)
    queue = Polygon(P(0.18 * s, 0), P(0.37 * s, 0.13 * s), P(0.37 * s, -0.13 * s), fill_color=couleur, fill_opacity=1,
                    stroke_width=0)
    oeil = Dot(P(-0.13 * s, 0.03 * s), radius=0.03 * s, color="#0f172a")
    return VGroup(queue, corps, oeil)


def manchot(s=1.0):
    corps = Ellipse(width=0.62 * s, height=0.95 * s, fill_color="#1e293b", fill_opacity=1, stroke_color="#e2e8f0",
                    stroke_width=2)
    ventre = Ellipse(width=0.42 * s, height=0.66 * s, fill_color=WHITE, fill_opacity=1, stroke_width=0).shift(DOWN * 0.1 * s)
    yeux = VGroup(*[Dot(P(x * s, 0.28 * s), radius=0.04 * s, color="#0f172a") for x in (-0.08, 0.08)])
    bec = Polygon(P(-0.07 * s, 0.2 * s), P(0.07 * s, 0.2 * s), P(0, 0.08 * s), fill_color="#f97316", fill_opacity=1,
                  stroke_width=0)
    pieds = VGroup(*[Ellipse(width=0.2 * s, height=0.09 * s, fill_color="#f97316", fill_opacity=1, stroke_width=0)
                     .move_to(P(x * s, -0.47 * s)) for x in (-0.12, 0.12)])
    ailes = VGroup(*[Ellipse(width=0.13 * s, height=0.48 * s, fill_color="#1e293b", fill_opacity=1, stroke_width=0)
                     .move_to(P(x * s, -0.05 * s)).rotate(-x * 2.2) for x in (-0.31, 0.31)])
    return VGroup(pieds, ailes, corps, ventre, yeux, bec)


def phoque(s=1.0):
    gris = "#94a3b8"
    corps = Ellipse(width=1.5 * s, height=0.6 * s, fill_color=gris, fill_opacity=1, stroke_width=0)
    tete = Circle(radius=0.28 * s, fill_color=gris, fill_opacity=1, stroke_width=0).move_to(P(-0.62 * s, 0.3 * s))
    c = tete.get_center()
    queue = Polygon(P(0.65 * s, 0), P(1.0 * s, 0.22 * s), P(1.0 * s, -0.22 * s), fill_color="#64748b", fill_opacity=1,
                    stroke_width=0)
    nageoire = Ellipse(width=0.36 * s, height=0.14 * s, fill_color="#64748b", fill_opacity=1, stroke_width=0) \
        .move_to(P(-0.25 * s, -0.3 * s)).rotate(-0.5)
    oeil = Dot(c + P(-0.05 * s, 0.07 * s), radius=0.045 * s, color="#0f172a")
    nez = Dot(c + P(-0.25 * s, -0.04 * s), radius=0.05 * s, color="#0f172a")
    moust = VGroup(*[Line(c + P(-0.25 * s, -0.06 * s), c + P(-0.48 * s, (-0.02 + d) * s), color="#e2e8f0", stroke_width=2)
                     for d in (-0.08, 0.0, 0.08)])
    return VGroup(queue, corps, nageoire, tete, oeil, nez, moust)


def perroquet(s=1.0):
    queue = Polygon(P(-0.05 * s, -0.25 * s), P(0.12 * s, -0.25 * s), P(0.18 * s, -0.95 * s), P(0.0, -0.9 * s),
                    fill_color="#3b82f6", fill_opacity=1, stroke_width=0)
    corps = Ellipse(width=0.48 * s, height=0.78 * s, fill_color="#22c55e", fill_opacity=1, stroke_width=0)
    aile = Ellipse(width=0.24 * s, height=0.5 * s, fill_color="#16a34a", fill_opacity=1, stroke_width=0).move_to(P(0.1 * s, -0.05 * s))
    tete = Circle(radius=0.2 * s, fill_color="#ef4444", fill_opacity=1, stroke_width=0).move_to(P(-0.04 * s, 0.45 * s))
    bec = Polygon(P(-0.2 * s, 0.5 * s), P(-0.36 * s, 0.4 * s), P(-0.2 * s, 0.34 * s), fill_color="#fde047", fill_opacity=1,
                  stroke_width=0)
    oeil = Dot(P(-0.07 * s, 0.5 * s), radius=0.035 * s, color="#0f172a")
    return VGroup(queue, corps, aile, tete, bec, oeil)


def girafe(s=1.0):
    jaune, brun = "#fbbf24", "#92400e"
    pattes = VGroup(*[Rectangle(width=0.12 * s, height=0.85 * s, fill_color=jaune, fill_opacity=1, stroke_width=0)
                      .move_to(P(x * s, -0.62 * s)) for x in (-0.5, -0.3, 0.3, 0.5)])
    corps = Ellipse(width=1.5 * s, height=0.7 * s, fill_color=jaune, fill_opacity=1, stroke_width=0)
    cou = Polygon(P(0.38 * s, 0.1 * s), P(0.68 * s, 0.1 * s), P(0.92 * s, 1.55 * s), P(0.72 * s, 1.6 * s),
                  fill_color=jaune, fill_opacity=1, stroke_width=0)
    tete = Ellipse(width=0.55 * s, height=0.3 * s, fill_color=jaune, fill_opacity=1, stroke_width=0).move_to(P(0.98 * s, 1.68 * s))
    cornes = VGroup(*[VGroup(Line(P(x * s, 1.78 * s), P(x * s, 2.0 * s), color=brun, stroke_width=4),
                             Dot(P(x * s, 2.0 * s), radius=0.05 * s, color=brun)) for x in (0.82, 0.95)])
    taches = VGroup(*[Dot(P(x * s, y * s), radius=0.09 * s, color=brun) for x, y in
                      ((-0.4, 0.1), (-0.05, -0.12), (0.25, 0.15), (-0.2, 0.2), (0.55, 0.6), (0.7, 1.05), (0.1, -0.05))])
    oeil = Dot(P(1.02 * s, 1.72 * s), radius=0.04 * s, color="#0f172a")
    queue = Line(P(-0.72 * s, 0.1 * s), P(-0.92 * s, -0.35 * s), color=brun, stroke_width=4)
    return VGroup(queue, pattes, corps, cou, tete, cornes, taches, oeil)


def carotte(s=1.0):
    c = Polygon(P(-0.1 * s, 0.2 * s), P(0.1 * s, 0.2 * s), P(0, -0.3 * s), fill_color="#f97316", fill_opacity=1, stroke_width=0)
    f = VGroup(*[Line(P(0, 0.2 * s), P(dx * s, 0.4 * s), color="#22c55e", stroke_width=4) for dx in (-0.08, 0, 0.08)])
    return VGroup(f, c)


def _base(t):
    """La ligne de base d'un Text : le bas médian de ses lettres et chiffres sans jambage."""
    car = [c for c in t.original_text if not c.isspace()]
    if len(car) != len(t.submobjects):
        return t.get_bottom()[1]
    ys = sorted(g.get_bottom()[1] for c, g in zip(car, t.submobjects) if c.isalnum() and c not in "gjpqyQ")
    return ys[len(ys) // 2] if ys else t.get_bottom()[1]


class Barre(VGroup):
    """Une bande de longueur proportionnelle au nombre, de x0 à x1, à la hauteur y.
    morceau(a, b), coupe(v), tranches(a, b, n), nombre(a, b, txt, ou) RENVOIENT les morceaux :
    la scène les joue au mot."""

    def __init__(self, total, x0, x1, y, h=0.62):
        super().__init__()
        self.total, self.x0, self.x1, self.y0, self.h = total, x0, x1, y, h
        self.cadre = Rectangle(width=x1 - x0, height=h, stroke_color=WHITE, stroke_width=5, fill_color=CASE,
                               fill_opacity=0.6).move_to(P((x0 + x1) / 2, y))
        self.add(self.cadre)

    def x(self, v):
        return self.x0 + v / self.total * (self.x1 - self.x0)

    def morceau(self, a, b, couleur):
        return Rectangle(width=self.x(b) - self.x(a), height=self.h, stroke_width=0, fill_color=couleur,
                         fill_opacity=0.45).move_to(P((self.x(a) + self.x(b)) / 2, self.y0))

    def coupe(self, v, couleur=WHITE):
        return Line(P(self.x(v), self.y0 - self.h / 2 - 0.1), P(self.x(v), self.y0 + self.h / 2 + 0.1), color=couleur,
                    stroke_width=7)

    def tranches(self, a, b, n, couleur=WHITE):
        """Les n paquets : un trait court en haut et en bas de chaque séparation, le milieu
        reste libre pour le nombre écrit dans le morceau (« 16 » n'est jamais barré)."""
        pas = (self.x(b) - self.x(a)) / n
        bas, haut, d = self.y0 - self.h / 2, self.y0 + self.h / 2, self.h * 0.24
        return VGroup(*[VGroup(Line(P(self.x(a) + k * pas, bas), P(self.x(a) + k * pas, bas + d), color=couleur, stroke_width=3),
                               Line(P(self.x(a) + k * pas, haut - d), P(self.x(a) + k * pas, haut), color=couleur, stroke_width=3))
                        for k in range(1, n)])

    def nombre(self, a, b, txt, ou="dans", fs=34, couleur=WHITE):
        t = Text(txt, font_size=fs, color=couleur, weight=BOLD)
        xc = (self.x(a) + self.x(b)) / 2
        if ou == "dans":
            return t.move_to(P(xc, self.y0))
        if ou == "sous":
            return t.move_to(P(xc, self.y0 - self.h / 2 - 0.12 - t.height / 2))
        return t.move_to(P(xc, self.y0 + self.h / 2 + 0.12 + t.height / 2))


class MentalDivisionBase(PaysageMental):
    nom_voix = "6e-mental-division"
    fichier_marques = "mental_division_marques.json"

    def ligne(self, morceaux, fs=40, buff=0.2):
        """ligne() du module commun, mais les morceaux posés sur la MÊME LIGNE DE BASE : centrés,
        « Le 5 ne » tombait plus bas que « disparaît pas » (le p descend sous la ligne)."""
        lg = super().ligne(morceaux, fs, buff)
        y0 = _base(lg[0])
        for m in lg[1:]:
            m.shift(UP * (y0 - _base(m)))
        return lg

    def etapes(self, bd, morceaux, y, fs=38, xl=-5.6, gestes=None, couleurs=None, buff=0.3):
        """etapes() du module commun, avec un écart de 0,3 entre les morceaux : à 0,18,
        « 56 ÷ » et « 8 » se touchaient presque (« 56 ÷8 »)."""
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

    def ligne_rep(self, i, morceaux, fs=None):
        """ligne_rep() du module commun, morceaux écartés de 0,26 (au lieu de 0,14)."""
        ref = self.ph_q[i]
        fs = fs or 30
        lg = self.ligne([(m, VERT_OK) for m in morceaux], fs, buff=0.26)
        if lg.width > config.frame_width - 0.9:
            lg.scale_to_fit_width(config.frame_width - 0.9)
        lg.move_to(ref).align_to(ref, LEFT)
        if lg.get_bottom()[1] < -1.85 and lg.get_right()[0] > 5.2:  # Ti-Margo, en bas à droite
            g = lg.get_left()[0]
            lg.scale_to_fit_width(5.2 - g).align_to(P(g, 0), LEFT)
        return lg

    def a_t(self, t):
        """Attend l'instant t (s) de la voix de l'écran. Pour un mot que les marques ne
        séparent pas (« 80 et 16. 80 » : une seule marque de 3 s) : l'instant est lu
        sur le WAV (silences), et le texte posé est sorti de l'audit."""
        reste = self._debut_voix + t - self.renderer.time
        if reste > 0.02:
            self.wait(reste)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Diviser de tête", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Diviser")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        self.au_mot("Comment")
        q = self.bloc(["Comment calculer", "sans poser la division ?"], 40).move_to(P(-3.0, 0.45))
        self.play(FadeIn(q[0], shift=UP * 0.2), run_time=0.35)
        self.au_mot("56 divisé")
        calc = self.ligne([("56 " + DIV, JAUNE_TITRE), ("8 = ?", JAUNE_TITRE)], 66, buff=0.42).move_to(P(3.4, 0.45))
        self.play(FadeIn(calc[0], scale=1.3), run_time=0.3)
        self.au_mot("8 sans")
        self.play(FadeIn(calc[1], scale=1.3), run_time=0.3)
        self.au_mot("sans poser")
        self.play(FadeIn(q[1], shift=UP * 0.2), run_time=0.35)
        self.play(Indicate(calc, color=JAUNE_TITRE, scale_factor=1.15), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # le tas de 56 poissons et les 8 manchots (écrans 01 et 02)
    def tas_poissons(self):
        rnd = random.Random(404)
        couleurs = ["#7dd3fc", "#93c5fd", "#a5b4fc", "#67e8f9"]
        g = VGroup()
        for i in range(56):
            l, c = divmod(i, 8)
            f = poisson(0.78, couleurs[i % 4]).move_to(P(-0.4 + c * 0.56 + rnd.uniform(-0.1, 0.1),
                                                        0.4 + l * 0.3 + rnd.uniform(-0.06, 0.06)))
            f.ang = rnd.uniform(-0.35, 0.35)
            f.rotate(f.ang)
            g.add(f)
        return g

    def manchots(self):
        return VGroup(*[manchot(0.95).move_to(P(-1.1 + j * 0.8, -1.95)) for j in range(8)])

    # ── 01 : Maëlys, soigneuse au zoo ───────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        ma = maelys(1.0).move_to(P(-5.0, 0.35))
        self.au_mot("Voici Maëlys")
        nom = self.t("Maëlys", 42, BLEU_CALCUL).next_to(ma, UP, buff=0.2)
        self.play(FadeIn(ma, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("soigneuse")
        met = self.bloc(["soigneuse", "au zoo"], 30, BLEU_CALCUL).next_to(ma, DOWN, buff=0.18)
        zoo = VGroup(RoundedRectangle(width=1.5, height=0.62, corner_radius=0.1, fill_color="#14532d", fill_opacity=1,
                                      stroke_color="#86efac", stroke_width=4),
                     hors_audit(Text("ZOO", font_size=34, color="#86efac", weight=BOLD))).move_to(P(-5.0, 3.05))
        zoo[1].move_to(zoo[0])
        self.play(FadeIn(met, shift=DOWN * 0.1), FadeIn(zoo, shift=DOWN * 0.2), run_time=0.4)
        tas = self.tas_poissons()
        mc = self.manchots()
        lg = self.ligne([("Ce matin :", WHITE), ("56 poissons", AMBRE_D), ("pour 8 manchots.", BLEU_D)], 38, buff=0.2)
        self.col(lg, 3.05, xl=-3.6)
        self.au_mot("Ce matin")
        self.play(FadeIn(lg[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("56 poissons")
        self.play(FadeIn(lg[1], shift=UP * 0.1), LaggedStart(*[FadeIn(f, scale=1.6) for f in tas], lag_ratio=0.02),
                  run_time=0.9)
        self.au_mot("8 manchots")
        self.play(FadeIn(lg[2], shift=UP * 0.1), LaggedStart(*[FadeIn(m, shift=UP * 0.3) for m in mc], lag_ratio=0.1),
                  run_time=0.7)
        self.au_mot("Combien de poissons")
        q = self.t("Combien de poissons pour chaque manchot ?", 36, JAUNE_TITRE)
        self.col(q, -3.0, xl=-5.9)
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 02 : une table sert deux fois ───────────────────────────────────────
    def ecran_table(self):
        self.ecran("02-table")
        tas = self.tas_poissons()
        mc = self.manchots()
        self.add(tas, mc)
        self.au_mot("Une table")
        tit = self.t("Une table sert deux fois.", 46, JAUNE_TITRE).move_to(P(0, 3.05))
        self.play(Write(tit), run_time=0.45)
        self.au_mot("la table de 8")
        l0 = self.t("La table de 8 :", 38, BLEU_D)
        self.col(l0, 2.0, xl=-5.9)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        self.etapes(None, [("8 " + FOIS, "8 fois"), ("7", "7, ça"), ("= 56.", "56. Donc")], 1.15, xl=-5.9)
        lg = self.ligne([("56 " + DIV, WHITE), ("8", WHITE), ("= 7.", VERT_OK)], 38, buff=0.3)
        self.col(lg, 0.3, xl=-5.9)
        # le partage : chaque manchot reçoit son paquet de 7 poissons, empilés au-dessus de lui
        cibles = [P(-1.1 + j * 0.8, -1.25 + k * 0.27) for k in range(7) for j in range(8)]
        self.au_mot("56 divisé")
        self.play(FadeIn(lg[0], shift=UP * 0.1), run_time=0.3)
        self.play(LaggedStart(*[f.animate.rotate(-f.ang).move_to(cibles[i])
                                for i, f in enumerate(tas)], lag_ratio=0.015), run_time=1.1)
        self.au_mot("8, ça")
        self.play(FadeIn(lg[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("7. Chaque")
        self.play(FadeIn(lg[2], shift=UP * 0.1), run_time=0.3)
        self.au_mot("Chaque manchot")
        cadres = VGroup(*[RoundedRectangle(width=0.66, height=2.0, corner_radius=0.12, stroke_color=VERT_OK, stroke_width=3)
                          .move_to(P(-1.1 + j * 0.8, -0.44)) for j in range(8)])
        self.play(LaggedStart(*[Create(c) for c in cadres], lag_ratio=0.08), run_time=0.6)
        self.au_mot("7 poissons")
        g = self.gros("7 poissons", fs=44).move_to(P(-4.2, -1.2))
        self.play(FadeIn(g, scale=1.3), run_time=0.4)
        self.attendre_voix()

    # ── 03 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        rangs = VGroup(*[RoundedRectangle(width=3.25, height=0.34, corner_radius=0.1, stroke_color=BLEU_D, stroke_width=3)
                         .move_to(P(-3.9, 1.75 - i * 0.42)) for i in range(9)])
        points = VGroup(*[Dot(P(-5.18 + k * 0.43, 1.75 - i * 0.42), radius=0.11, color=AMBRE_D)
                          for i in range(9) for k in range(7)])

        def autres_q(sc):
            sc.play(LaggedStart(*[Create(r) for r in rangs], lag_ratio=0.08), run_time=0.5)

        def apres(sc):
            lg0 = sc.ligne_rep(0, ["9 " + FOIS, "7", "= 63."])
            n63 = self.t("63", 40, VERT_OK).move_to(P(-3.9, 2.35))
            sc.au_mot("9 fois")
            sc.play(FadeIn(lg0[0], shift=UP * 0.1), Indicate(rangs, color=BLEU_D, scale_factor=1.04), run_time=0.3)
            sc.au_mot("7, ça")
            sc.play(FadeIn(lg0[1], shift=UP * 0.1), LaggedStart(*[FadeIn(p, scale=2) for p in points], lag_ratio=0.01),
                    run_time=0.5)
            sc.au_mot("63. Donc")
            sc.play(FadeIn(lg0[2], shift=UP * 0.1), FadeIn(n63, scale=1.3), run_time=0.3)
            lg1 = sc.ligne_rep(1, ["Donc 63 " + DIV, "9", "= 7."])
            sc.au_mot("Donc 63")
            sc.play(FadeIn(lg1[0], shift=UP * 0.1), run_time=0.25)
            sc.au_mot("9, ça")
            sc.play(FadeIn(lg1[1], shift=UP * 0.1), Indicate(rangs, color=BLEU_D, scale_factor=1.04), run_time=0.3)
            n7 = self.t("7", 34, VERT_OK).next_to(rangs[0], RIGHT, buff=0.2)
            sc.au_mot("7.")
            sc.play(FadeIn(lg1[2], shift=UP * 0.1), rangs[0].animate.set_stroke(VERT_OK, width=6), FadeIn(n7, scale=1.3),
                    run_time=0.3)
            sc.rep_fini()

        self.question_pause("03-question", "03b-reponse", ["Combien font 63 " + DIV + " 9 ?"],
                            [self.t("7", 36), self.t("8", 36), self.t("54", 36)], 0,
                            ["9 × 7 = 63.", "Donc 63 ÷ 9 = 7."], mot_q="Combien",
                            autres_q=autres_q, autres_r=apres)

    # ── 04 : couper en morceaux de la table ─────────────────────────────────
    def ecran_decomposer(self):
        self.ecran("04-decomposer")
        ph = phoque(1.0).move_to(P(5.0, 0.95))
        self.ligne_mots([("Pour les phoques :", ROSE_D), ("96 sardines", AMBRE_D), ("pour 8 phoques.", WHITE)],
                        ["Pour les", "96 sardines", "8 phoques"], 2.95, fs=36, xl=-5.9)
        self.play(FadeIn(ph, shift=LEFT * 0.4), run_time=0.35)
        self.ligne_mots([("96 n'est pas", WHITE), ("dans la table", WHITE), ("de 8.", WHITE)],
                        ["96 n'est", "dans la", "de 8."], 2.2, fs=36, xl=-5.9)
        ba = Barre(96, -5.3, 3.1, 0.85)
        n96 = Text("96", font_size=36, color=WHITE, weight=BOLD).next_to(ba, LEFT, buff=0.22)
        self.au_mot("coupe 96")
        self.play(Create(ba.cadre), FadeIn(n96, scale=1.2), run_time=0.4)
        m80, m16 = ba.morceau(0, 80, AMBRE_D), ba.morceau(80, 96, ROSE_D)
        cp = ba.coupe(80)
        t80, t16 = ba.nombre(0, 80, "80"), hors_audit(ba.nombre(80, 96, "16", fs=32))
        self.au_mot("80 et")
        self.play(Create(cp), FadeIn(m80), FadeIn(t80, scale=1.2), run_time=0.35)
        self.a_t(10.45)  # « … et 16. » : 9,64 → 11,16 s sur le WAV
        self.play(FadeIn(m16), FadeIn(t16, scale=1.2), run_time=0.3)
        tr80, tr16 = ba.tranches(0, 80, 8), ba.tranches(80, 96, 8)
        s10, s2 = ba.nombre(0, 80, "10", "sous", 32, VERT_OK), ba.nombre(80, 96, "2", "sous", 32, VERT_OK)
        lg = self.ligne([("80 " + DIV, WHITE), ("8", WHITE), ("= 10", VERT_OK)], 38, buff=0.3)
        self.col(lg, -0.55, xl=-5.9)
        hors_audit(lg[0])
        self.a_t(12.1)  # le 2e « 80 » : 12,09 s sur le WAV (silence 11,16 → 12,09)
        self.play(FadeIn(lg[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("8, ça fait 10")
        self.play(FadeIn(lg[1], shift=UP * 0.1), Create(tr80), run_time=0.3)
        self.au_mot("10. 16")
        self.play(FadeIn(lg[2], shift=UP * 0.1), FadeIn(s10, scale=1.3), run_time=0.3)
        self.etapes(None, [("16 " + DIV, "16 divisé"), ("8", "8, ça fait 2"), ("= 2", "2. 10")], -1.25, fs=38,
                    xl=-5.9, gestes={1: [Create(tr16)], 2: [FadeIn(s2, scale=1.3)]})
        self.etapes(None, [("10 +", "10 plus"), ("2 :", "2 :"), ("12 sardines", "12 sardines")], -1.95, fs=38, xl=-5.9)
        self.insister(ph, 1.12, 0.25)
        self.attendre_voix()

    # ── 05 : vérifier avec la multiplication ────────────────────────────────
    def ecran_verifier(self):
        self.ecran("05-verifier")
        self.au_mot("Elle vérifie")
        tit = self.t("Elle vérifie avec la multiplication :", 44, JAUNE_TITRE).move_to(P(0, 3.0))
        self.play(Write(tit), run_time=0.45)
        rangs = [VGroup(*[poisson(0.72, "#93c5fd").move_to(P(-4.9 + k * 0.5, 0.7 - i * 0.36)) for k in range(12)])
                 for i in range(8)]
        cadre = SurroundingRectangle(VGroup(*rangs), color=VERT_OK, buff=0.15, corner_radius=0.12, stroke_width=4)
        n96 = Text("96", font_size=44, color=VERT_OK, weight=BOLD).next_to(cadre, RIGHT, buff=0.3)
        self.etapes(None, [("12 " + FOIS, "12 fois"), ("8", "8, ça"), ("= 96.", "96. C'est")], 1.85, fs=44, xl=-5.9,
                    gestes={0: [LaggedStart(*[FadeIn(f, scale=1.5) for f in rangs[0]], lag_ratio=0.05)],
                            1: [LaggedStart(*[FadeIn(r, shift=DOWN * 0.15) for r in rangs[1:]], lag_ratio=0.1)],
                            2: [Create(cadre), FadeIn(n96, scale=1.3)]})
        self.au_mot("C'est juste")
        tj = self.tampon("C'est juste !", VERT_OK, 42).move_to(P(-2.2, -2.75))
        self.play(FadeIn(tj, scale=1.3), run_time=0.4)
        self.insister(tj, 1.12, 0.25)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        ba = Barre(84, -5.5, -1.3, 0.9)
        n84 = hors_audit(Text("84", font_size=34, color=WHITE, weight=BOLD).next_to(ba, UP, buff=0.18))

        def autres_q(sc):
            sc.play(Create(ba.cadre), FadeIn(n84), run_time=0.35)

        def apres(sc):
            m70, m14, cp = ba.morceau(0, 70, AMBRE_D), ba.morceau(70, 84, ROSE_D), ba.coupe(70)
            t70, t14 = ba.nombre(0, 70, "70", fs=30), hors_audit(ba.nombre(70, 84, "14", fs=26))
            lg0 = sc.ligne_rep(0, ["84 =", "70", "+ 14."])
            sc.au_mot("84, c'est")
            sc.play(FadeIn(lg0[0], shift=UP * 0.1), Indicate(n84), run_time=0.25)
            sc.au_mot("70 et")
            sc.play(FadeIn(lg0[1], shift=UP * 0.1), Create(cp), FadeIn(m70), FadeIn(t70), run_time=0.3)
            hors_audit(lg0[2])
            sc.a_t(3.45)  # « … et 14. » : 2,35 → 4,37 s sur le WAV
            sc.play(FadeIn(lg0[2], shift=UP * 0.1), FadeIn(m14), FadeIn(t14), run_time=0.3)
            tr70, tr14 = ba.tranches(0, 70, 7), ba.tranches(70, 84, 7)
            s10, s2 = ba.nombre(0, 70, "10", "sous", 30, VERT_OK), ba.nombre(70, 84, "2", "sous", 30, VERT_OK)
            lg1 = sc.ligne_rep(1, ["70 " + DIV, "7", "= 10."])
            lg1b = sc.ligne_rep(2, ["14 " + DIV, "7", "= 2."])
            hors_audit(lg1[0])
            for m, (mot, geste) in zip(list(lg1) + list(lg1b), [
                    (5.25, []), ("7, ça fait 10", [Create(tr70)]), ("10. 14", [FadeIn(s10, scale=1.3)]),
                    ("14 divisé", []), ("7, ça fait 2", [Create(tr14)]), ("2. 10", [FadeIn(s2, scale=1.3)])]):
                if isinstance(mot, float):
                    sc.a_t(mot)  # le 2e « 70 » : 5,24 s sur le WAV (silence 4,37 → 5,24)
                else:
                    sc.au_mot(mot)
                sc.play(FadeIn(m, shift=UP * 0.1), *geste, run_time=0.25)
            lg2 = sc.ligne_rep(3, ["10 +", "2", "= 12."])
            sc.au_mot("10 plus")
            sc.play(FadeIn(lg2[0], shift=UP * 0.1), run_time=0.25)
            sc.au_mot("2 :")
            sc.play(FadeIn(lg2[1], shift=UP * 0.1), run_time=0.25)
            sc.au_mot("12.")
            sc.play(FadeIn(lg2[2], shift=UP * 0.1), run_time=0.25)
            sc.rep_fini()

        self.question_pause("06-question", "06b-reponse", ["Combien font 84 " + DIV + " 7 ?"],
                            [self.t("11", 36), self.t("14", 36), self.t("12", 36)], 2,
                            ["84 = 70 + 14.", "70 ÷ 7 = 10.", "14 ÷ 7 = 2.", "10 + 2 = 12."], mot_q="Combien",
                            autres_q=autres_q, autres_r=apres)

    # ── 07 : diviser par 10 : chaque chiffre descend d'une colonne ──────────
    def ecran_dix(self):
        self.ecran("07-dix")
        coul = {"Centaines": ROSE_D, "Dizaines": DIZ, "Unités": BLEU_D, "Dixièmes": AMBRE_D}
        rangs = ("Centaines", "Dizaines", "Unités", "Dixièmes")
        haut = TableauNum(rangs, larg=1.35, h=0.9, fs_ent=24, virgule_apres=None, couleurs=coul)
        bas = TableauNum(rangs, larg=1.35, h=0.9, fs_ent=24, virgule_apres=2, couleurs=coul)
        bas.remove(bas.entetes)
        haut.shift(P(-3.3 - haut.cases.get_center()[0], 0.35 - haut.cases.get_center()[1]))
        bas.shift(P(-3.3 - bas.cases.get_center()[0], -1.3 - bas.cases.get_center()[1]))
        pe = perroquet(0.9).move_to(P(3.3, -2.55))
        self.ligne_mots([("Divisé par 10 :", JAUNE_TITRE), ("645 grammes de graines", AMBRE_D),
                         ("pour 10 perroquets.", WHITE)], ["Divisé par 10", "645 grammes", "10 perroquets"], 3.05, fs=34,
                        xl=-5.9)
        self.play(FadeIn(pe, shift=LEFT * 0.4), run_time=0.3)
        h6, h4, h5 = haut.chiffre(0, 6), haut.chiffre(1, 4), haut.chiffre(2, 5)
        self.play(FadeIn(haut.cases), FadeIn(haut.entetes), FadeIn(VGroup(h6, h4, h5), scale=1.2), run_time=0.4)
        self.ligne_mots([("Chaque chiffre devient dix fois plus petit :", WHITE)], ["Chaque chiffre"], 2.3, fs=34, xl=-5.9)
        self.au_mot("il descend")
        l2 = self.t("il descend d'une colonne.", 34, VERT_OK)
        self.col(l2, 1.65, xl=-5.9)
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(bas.cases), FadeIn(bas.virgule), run_time=0.4)

        def descente(src, v, i, couleur):
            d = bas.chiffre(i, v, couleur)
            fl = Arrow(src.get_bottom() + DOWN * 0.08, bas.cases[i].get_top() + UP * 0.05 + LEFT * 0.25, buff=0.05,
                       color=couleur, stroke_width=5, max_tip_length_to_length_ratio=0.25)
            return d, fl

        d6, f6 = descente(h6, 6, 1, DIZ)
        d4, f4 = descente(h4, 4, 2, BLEU_D)
        d5, f5 = descente(h5, 5, 3, AMBRE_D)
        for y, (a, ca, b, cb, src, d, fl) in zip((0.75, 0.0, -0.75), [
                (("6 centaines", "6 centaines"), ROSE_D, ("→ 6 dizaines", "6 dizaines"), DIZ, h6, d6, f6),
                (("4 dizaines", "4 dizaines"), DIZ, ("→ 4 unités", "4 unités"), BLEU_D, h4, d4, f4),
                (("5 unités", "5 unités"), BLEU_D, ("→ 5 dixièmes", "5 dixièmes"), AMBRE_D, h5, d5, f5)]):
            self.etapes(None, [a, b], y, fs=31, xl=0.55, couleurs=[ca, cb], buff=0.2,
                        gestes={0: [Indicate(src, color=ca, scale_factor=1.3)],
                                1: [GrowArrow(fl), TransformFromCopy(src, d)]})
        g = self.ligne([("64,5", VERT_OK), ("grammes par perroquet", VERT_OK)], 38, buff=0.2).move_to(P(-2.0, -2.65))
        cadre = SurroundingRectangle(g, color=VERT_OK, buff=0.2, corner_radius=0.12, stroke_width=5)
        self.au_mot("64,5 grammes")
        self.play(FadeIn(g[0], scale=1.3), Indicate(VGroup(d6, d4, d5), color=VERT_OK, scale_factor=1.2), run_time=0.45)
        self.au_mot("grammes par")
        self.play(FadeIn(g[1], shift=UP * 0.1), Create(cadre), run_time=0.4)
        self.attendre_voix()

    # ── 08 : le piège : oublier le 5 ────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("08-piege")
        coul = {"Dizaines": DIZ, "Unités": BLEU_D, "Dixièmes": AMBRE_D}
        tb = TableauNum(("Dizaines", "Unités", "Dixièmes"), larg=1.5, h=1.0, fs_ent=26, virgule_apres=1, couleurs=coul)
        tb.move_to(P(-3.7, 0.55))
        c6, c4 = tb.chiffre(0, 6), tb.chiffre(1, 4)
        vide = DashedVMobject(tb.cases[2].copy().set_stroke(ROUGE_ERREUR, 6).set_fill(opacity=0), num_dashes=24)
        self.add(tb)
        lg = self.ligne([("Le piège :", ROUGE_ERREUR), ("écrire 64", ROUGE_ERREUR), ("et oublier le 5.", WHITE)], 42,
                        buff=0.22)
        self.col(lg, 2.95, xl=-5.9)
        self.au_mot("Le piège")
        self.play(Write(lg[0]), run_time=0.4)
        f64 = Text("64", font_size=96, color=ROUGE_ERREUR, weight=BOLD).move_to(P(2.6, 0.55))
        self.au_mot("écrire 64")
        self.play(FadeIn(lg[1], shift=UP * 0.1), FadeIn(VGroup(c6, c4), scale=1.2), FadeIn(f64, scale=1.2), run_time=0.35)
        self.au_mot("oublier le 5")
        self.play(FadeIn(lg[2], shift=UP * 0.1), Create(vide), run_time=0.35)
        self.play(Create(self.barrer(f64)), run_time=0.3)
        self.ligne_mots([("Le 5 ne", ORANGE_RETENUE), ("disparaît pas :", ORANGE_RETENUE)], ["Le 5 ne", "disparaît"],
                        -1.05, fs=40, xl=-5.9)
        self.au_mot("il devient")
        l2 = self.ligne([("il devient", VERT_OK), ("5 dixièmes.", VERT_OK)], 40, buff=0.2)
        self.col(l2, -1.85, xl=-5.9)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        c5 = tb.chiffre(2, 5, VERT_OK)
        self.au_mot("5 dixièmes")
        self.play(FadeIn(l2[1], scale=1.2), FadeOut(vide), FadeIn(c5, scale=1.5), run_time=0.35)
        self.insister(c5, 1.3, 0.25)
        self.attendre_voix()

    # ── 09 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        gi = girafe(1.25).move_to(P(-4.6, 0.25))
        cars = VGroup(*[carotte(0.9).move_to(P(-5.6 + (k % 6) * 0.38, -2.05 - (k // 6) * 0.5)) for k in range(12)])
        self.ligne_mots([("Maëlys a", WHITE), ("72 carottes", AMBRE_D), ("pour 6 girafes.", WHITE)],
                        ["Maëlys a", "72 carottes", "6 girafes"], 2.05, fs=38, xl=-1.9)
        self.play(FadeIn(gi, shift=RIGHT * 0.4), LaggedStart(*[FadeIn(c, shift=DOWN * 0.2) for c in cars], lag_ratio=0.05),
                  run_time=0.6)
        self.ligne_mots([("Chaque girafe en mange", WHITE), ("3", ROSE_D), ("le matin.", WHITE)],
                        ["Chaque girafe", "mange 3", "le matin"], 1.25, fs=38, xl=-1.9)
        self.au_mot("Combien de carottes")
        q1 = self.t("Combien de carottes reste-t-il", 40, JAUNE_TITRE)
        self.col(q1, 0.25, xl=-1.9)
        self.play(FadeIn(q1, shift=UP * 0.15), run_time=0.35)
        self.au_mot("à chaque girafe")
        q2 = self.t("à chaque girafe pour le soir ?", 40, JAUNE_TITRE)
        self.col(q2, -0.5, xl=-1.9)
        self.play(FadeIn(q2, shift=UP * 0.15), Wiggle(gi), run_time=0.5)
        self.pause_defi(y=-1.75)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        ba = Barre(72, -5.0, 2.4, 1.95)
        n72 = Text("72", font_size=36, color=WHITE, weight=BOLD).next_to(ba, LEFT, buff=0.22)
        m60, m12, cp = ba.morceau(0, 60, AMBRE_D), ba.morceau(60, 72, ROSE_D), ba.coupe(60)
        t60, t12 = ba.nombre(0, 60, "60"), hors_audit(ba.nombre(60, 72, "12", fs=30))
        l1 = self.ligne([("72 =", WHITE), ("60", WHITE), ("+ 12.", WHITE)], 38, buff=0.3)
        self.col(l1, 0.45, xl=-5.9)
        hors_audit(l1[2])
        self.au_mot("72, c'est")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Create(ba.cadre), FadeIn(n72, scale=1.2), run_time=0.3)
        self.au_mot("60 et")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Create(cp), FadeIn(m60), FadeIn(t60), run_time=0.3)
        self.a_t(4.05)  # « … et 12. » : 3,16 → 4,69 s sur le WAV
        self.play(FadeIn(l1[2], shift=UP * 0.1), FadeIn(m12), FadeIn(t12), run_time=0.3)
        tr60, tr12 = ba.tranches(0, 60, 6), ba.tranches(60, 72, 6)
        s10, s2 = ba.nombre(0, 60, "10", "sous", 32, VERT_OK), ba.nombre(60, 72, "2", "sous", 32, VERT_OK)
        l2 = self.ligne([("60 " + DIV, WHITE), ("6", WHITE), ("= 10", VERT_OK)], 38, buff=0.3)
        self.col(l2, -0.3, xl=-5.9)
        hors_audit(l2[0])
        self.a_t(5.56)  # le 2e « 60 » : 5,55 s sur le WAV (silence 4,69 → 5,55)
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("6, ça fait 10")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Create(tr60), run_time=0.3)
        self.au_mot("10. 12")
        self.play(FadeIn(l2[2], shift=UP * 0.1), FadeIn(s10, scale=1.3), run_time=0.3)
        self.etapes(None, [("12 " + DIV, "12 divisé"), ("6", "6, ça fait 2"), ("= 2", "2. Chaque")], -1.05, fs=38,
                    xl=-5.9, gestes={1: [Create(tr12)], 2: [FadeIn(s2, scale=1.3)]})
        gi = girafe(0.6).move_to(P(5.3, 2.0))
        self.ligne_mots([("Chaque girafe a", WHITE), ("12 carottes.", AMBRE_D)], ["Chaque girafe", "12 carottes"], 0.45,
                        fs=36, xl=-0.6)
        self.play(FadeIn(gi, shift=LEFT * 0.3), run_time=0.3)
        self.ligne_mots([("Elle en mange", WHITE), ("3 :", ROSE_D)], ["Elle en mange", "mange 3"], -0.3, fs=36, xl=-0.6)
        self.au_mot("il en reste 9")
        l3 = self.ligne([("il en reste", VERT_OK), ("9", VERT_OK), ("pour le soir.", VERT_OK)], 40, buff=0.2)
        self.col(l3, -1.05, xl=-0.6)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("9 pour")
        self.play(FadeIn(l3[1], scale=1.3), FadeIn(l3[2], shift=UP * 0.1), run_time=0.3)
        cadre = SurroundingRectangle(l3, color=VERT_OK, buff=0.18, corner_radius=0.12, stroke_width=5)
        self.play(Create(cadre), run_time=0.3)
        self.insister(l3[1], 1.4, 0.25)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        ba = Barre(96, 0, 4.6, 0)
        fig = VGroup(ba, Text("96", font_size=32, color=WHITE, weight=BOLD).next_to(ba, UP, buff=0.15),
                     ba.morceau(0, 80, AMBRE_D), ba.morceau(80, 96, ROSE_D), ba.coupe(80),
                     ba.nombre(0, 80, "80", fs=30), ba.nombre(80, 96, "16", fs=26), ba.tranches(0, 80, 8),
                     ba.nombre(0, 80, "10", "sous", 30, VERT_OK), ba.nombre(80, 96, "2", "sous", 30, VERT_OK))
        hors_audit(fig)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Une table sert à multiplier", "et à diviser."),
            ("Si le nombre est trop grand, on le", "coupe en morceaux de la table."),
            ("Divisé par 10, chaque chiffre", "descend d'une colonne.")], fs=34)
        self.au_mot("Une table")
        self.montrer_ligne(lignes[0])
        self.au_mot("Si le nombre")
        self.montrer_ligne(lignes[1], Indicate(fig[4], color=WHITE, scale_factor=1.3))
        self.au_mot("Divisé par 10")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_table()
        self.ecran_question1()
        self.ecran_decomposer()
        self.ecran_verifier()
        self.ecran_question2()
        self.ecran_dix()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class MentalDivision6e(MentalDivisionBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
