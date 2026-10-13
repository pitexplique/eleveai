# eau.py
# EleveAI — « Les maths en vrai » — L'eau à La Réunion. CEINTURE VERTE (5e).
#
# ⭐ 12/10/2026, Frédéric : « je fais des vidéos sur des notions, mais au bout
# d'un moment il faut faire une vidéo sur l'eau à La Réunion » ; « je veux être
# un prof de maths qui enseigne avec des problèmes réels ». Il est allé voir la
# rivière d'Abord en juin : plus d'eau. Et l'eau du robinet sort marron après
# la pluie.
#
# Voix validée (« go ») : manim/voix/974-eau.json (débit −8, 5e).
# Le short blanc : eau_short.py — même eau BLEUE, même règle « 1 mm = 1 L/m² ».
#
# Mapping micro-compétences (coach 5e) → écrans :
# - volume_pave, volume_unite → 01-millimetre, 02-record, 07/08 défi
# - prop_rapport              → 03-est-ouest (« 5 fois moins »)
# - prop_pourcentage          → 05-fuites (62 sur 100 = 62 %)
# - prop_quatrieme            → 05-fuites (100 ÷ 62 × 100 ≈ 161)
#
# ⛔ LES CHIFFRES ONT UNE SOURCE :
# - normales Météo-France 1971-2000 (INSEE, TER 2010) : Saint-Benoît 3 464 mm,
#   Pierrefonds (Saint-Pierre) 729 mm → arrondis 3 500 et 700 ;
# - rendement des réseaux 62 % en 2019 (Office de l'eau / IEDOM), 85 % exigé ;
# - alerte sécheresse à Saint-Pierre : arrêté préfectoral du 18 mai 2026 ;
# - chlore sans filtration, eau trouble à la pluie : bilans ARS (eaudurobinet.re).
#
# Rendu : python -m manim render -qh --disable_caching manim/scripts/974/eau.py Eau974 -o eleveai-maths-974-eau-paysage --media_dir manim/scripts/974/media

import random
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "seconde"))

from manim import *

from charte import *
from carte_reunion import CarteReunion
from gabarit_sixieme import Notion6e
from signes_expression_2de import echelle_ceintures

EAU = BLEU_CALCUL          # l'eau qu'on garde
PERTE = ORANGE_RETENUE     # l'eau perdue, le côté sec
BOUE = "#8B5A2B"
GALET = "#9CA3AF"


# ── les dessins partagés avec le short ─────────────────────────────────────

def galets(x0, x1, y, n=14, graine=3, rayon=0.13):
    rnd = random.Random(graine)
    g = VGroup()
    for i in range(n):
        x = x0 + (x1 - x0) * (i + 0.5) / n + rnd.uniform(-0.08, 0.08)
        r = rayon * rnd.uniform(0.7, 1.2)
        g.add(Ellipse(width=2 * r * 1.3, height=2 * r).set_fill(GALET, 1)
              .set_stroke(GREY_D, 1).move_to([x, y + rnd.uniform(0, 0.08), 0]))
    return g


def lit_de_riviere(largeur=6.0, centre=ORIGIN):
    """Une rivière vue en coupe : deux berges, un lit de galets, à sec."""
    c = np.array(centre, dtype=float)
    l = largeur / 2
    berge_g = Polygon(c + [-l - 0.6, 0.9, 0], c + [-l + 0.5, -0.3, 0], c + [-l - 0.6, -0.3, 0])
    berge_d = Polygon(c + [l + 0.6, 0.9, 0], c + [l - 0.5, -0.3, 0], c + [l + 0.6, -0.3, 0])
    for b in (berge_g, berge_d):
        b.set_fill(GREEN_E, 0.7).set_stroke(GREEN_D, 2)
    fond = Line(c + [-l + 0.5, -0.3, 0], c + [l - 0.5, -0.3, 0], color=GREY_B, stroke_width=3)
    pierres = galets(c[0] - l + 0.6, c[0] + l - 0.6, c[1] - 0.18)
    return VGroup(berge_g, berge_d, fond), pierres


def goutte(couleur=EAU, taille=0.25):
    rond = Circle(radius=taille).set_fill(couleur, 1).set_stroke(width=0)
    pointe = Polygon([-taille * 0.82, taille * 0.55, 0], [taille * 0.82, taille * 0.55, 0],
                     [0, taille * 2.1, 0]).set_fill(couleur, 1).set_stroke(width=0)
    return VGroup(pointe, rond)


def robinet(couleur_eau=BOUE, echelle=1.0):
    trait = dict(color=GREY_B, width=0)
    tuyau = Rectangle(width=1.4, height=0.32).set_fill(GREY_B, 1).set_stroke(**trait)
    bec = Rectangle(width=0.32, height=0.55).set_fill(GREY_B, 1).set_stroke(**trait)
    bec.next_to(tuyau, DOWN, buff=0).align_to(tuyau, RIGHT)
    poignee = Rectangle(width=0.5, height=0.14).set_fill(GREY_A, 1).set_stroke(**trait)
    poignee.next_to(tuyau, UP, buff=0.12).shift(LEFT * 0.2)
    tige = Line(poignee.get_bottom(), tuyau.get_top(), color=GREY_A, stroke_width=5)
    jet = Rectangle(width=0.18, height=0.9).set_fill(couleur_eau, 1).set_stroke(width=0)
    jet.next_to(bec, DOWN, buff=0)
    return VGroup(tuyau, bec, tige, poignee, jet).scale(echelle)


def pluie(x0, x1, y_haut, y_bas, n=18, graine=5, couleur=EAU):
    """Des traits de pluie et leur chute (une animation à jouer)."""
    rnd = random.Random(graine)
    traits = VGroup(*[Line([0, 0, 0], [0, -0.28, 0], color=couleur, stroke_width=3)
                      .move_to([rnd.uniform(x0, x1), rnd.uniform(y_bas + 0.6, y_haut), 0])
                      for _ in range(n)])
    return traits


def tomber(traits, y_bas, run_time=1.2):
    return AnimationGroup(*[t.animate(rate_func=linear).move_to([t.get_x(), y_bas, 0]).set_opacity(0)
                            for t in traits], run_time=run_time)


def bac(largeur=3.0, profondeur=(0.9, 0.5), hauteur=1.2, centre=ORIGIN):
    """Un bac de 1 m × 1 m, en perspective cavalière : (contour, fond, fn niveau)."""
    c = np.array(centre, dtype=float)
    dx, dy = profondeur
    a = c + [-largeur / 2, -hauteur / 2, 0]
    b = c + [largeur / 2, -hauteur / 2, 0]
    fond = Polygon(a, b, b + [dx, dy, 0], a + [dx, dy, 0])
    fond.set_fill(GREY_D, 0.5).set_stroke(WHITE, 2)
    h = [0, hauteur, 0]
    aretes = VGroup(
        Line(a, a + h), Line(b, b + h), Line(b + [dx, dy, 0], b + [dx, dy, 0] + h),
        Line(a + [dx, dy, 0], a + [dx, dy, 0] + h),
        Polygon(a + h, b + h, b + [dx, dy, 0] + h, a + [dx, dy, 0] + h),
    ).set_stroke(WHITE, 2).set_fill(opacity=0)

    def niveau(e):
        """La couche d'eau d'épaisseur e (unités d'écran)."""
        up = [0, e, 0]
        face = Polygon(a, b, b + up, a + up).set_fill(EAU, 0.85).set_stroke(EAU, 1)
        dessus = Polygon(a + up, b + up, b + [dx, dy, 0] + up, a + [dx, dy, 0] + up)
        dessus.set_fill(EAU, 0.55).set_stroke(EAU, 1)
        cote = Polygon(b, b + [dx, dy, 0], b + [dx, dy, 0] + up, b + up).set_fill(EAU, 0.7).set_stroke(EAU, 1)
        return VGroup(face, cote, dessus)

    return aretes, fond, niveau, (a, b)


def maison(largeur=2.6, centre=ORIGIN, couleur_toit=PERTE):
    c = np.array(centre, dtype=float)
    murs = Rectangle(width=largeur, height=1.3).set_fill(GREY_E, 1).set_stroke(WHITE, 2).move_to(c)
    toit = Polygon(c + [-largeur / 2 - 0.25, 0.65, 0], c + [largeur / 2 + 0.25, 0.65, 0],
                   c + [0, 1.6, 0]).set_fill(couleur_toit, 0.85).set_stroke(WHITE, 2)
    porte = Rectangle(width=0.4, height=0.7).set_fill(BOUE, 1).set_stroke(width=0).move_to(c + [0, -0.3, 0])
    cuve = RoundedRectangle(width=0.6, height=0.9, corner_radius=0.1).set_fill(EAU, 0.8).set_stroke(WHITE, 2)
    cuve.move_to(c + [largeur / 2 + 0.6, -0.2, 0])
    gouttiere = Line(c + [largeur / 2 + 0.25, 0.65, 0], cuve.get_top(), color=GREY_B, stroke_width=4)
    return VGroup(murs, toit, porte, gouttiere, cuve)


class Eau974(Notion6e):
    nom_voix = "974-eau"
    identite = "Maths 5e — Les maths en vrai"

    def t(self, texte, font_size=32, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def borne(self, m, largeur):
        if m.width > largeur:
            m.scale_to_fit_width(largeur)
        return m

    # ── 00 ──────────────────────────────────────────────────────────────────

    def page_de_garde(self, voix="00-garde"):
        self.clear()
        self.add_mascotte(scale=0.7)
        self.dire(voix)
        titre = self.t("L'eau à La Réunion", 54, JAUNE_TITRE).to_edge(UP, buff=0.35)
        identite = self.t(self.identite, 26).next_to(titre, DOWN, buff=0.2)
        echelle = echelle_ceintures("verte", largeur=0.5, buff=0.1).move_to([4.3, 1.75, 0])
        q = VGroup(self.t("Pourquoi la rivière", 36, BLEU_CALCUL),
                   self.t("est-elle à sec ?", 36, BLEU_CALCUL)).arrange(DOWN, buff=0.12).move_to([-2.4, 1.55, 0])
        self.play(Write(titre), FadeIn(identite), FadeIn(echelle), run_time=1.0)
        self.play(FadeIn(q, shift=UP * 0.1))

        self.au_mot("Juin, à Saint-Pierre")
        berges, pierres = lit_de_riviere(5.2, centre=[-2.4, -1.2, 0])
        lieu = self.t("Rivière d'Abord · juin", 26, WHITE).move_to([-2.4, -2.45, 0])
        self.play(FadeIn(berges), FadeIn(lieu))
        self.au_mot("plus d'eau")
        self.play(LaggedStart(*[FadeIn(p, scale=0.5) for p in pierres], lag_ratio=0.06), run_time=1.2)
        sec = self.t("à sec", 34, PERTE).move_to([-2.4, -0.55, 0])
        self.play(Write(sec))

        self.au_mot("l'eau du robinet sort marron")
        rob = robinet(BOUE, 0.9).move_to([3.7, -0.9, 0])
        self.play(FadeIn(rob[:4]))
        self.play(GrowFromEdge(rob[4], UP))
        self.play(FadeIn(self.t("après la pluie", 26, BOUE).next_to(rob, DOWN, buff=0.2)))

        self.au_mot("avec des maths")
        self.play(Write(self.chute("Aujourd'hui : comprendre ce problème avec des maths.",
                                   color=JAUNE_TITRE, font_size=28)))
        self.attendre_voix()

    # ── 01 ──────────────────────────────────────────────────────────────────

    def ecran_millimetre(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-millimetre")
        self.titre_ecran("1 mm de pluie, c'est combien d'eau ?")
        self.au_mot("Prends un carré")
        aretes, fond, niveau, (a, b) = bac(largeur=3.4, profondeur=(1.2, 0.7), hauteur=1.3,
                                           centre=[-3.6, -0.6, 0])
        self.play(FadeIn(fond), Create(aretes))
        cote1 = self.t("1 m", 26).next_to(Line(a, b), DOWN, buff=0.15)
        cote2 = self.t("1 m", 26).move_to(b + [0.95, 0.2, 0])
        self.play(FadeIn(cote1), FadeIn(cote2))

        self.au_mot("Il pleut 1 millimètre")
        gouttes = pluie(-5.3, -1.8, 2.4, 0.2, n=16)
        self.add(gouttes)
        self.play(tomber(gouttes, -0.9))
        couche = niveau(0.1)
        self.play(FadeIn(couche))
        mm = self.t("1 mm", 26, EAU).next_to(a, LEFT, buff=0.15).shift(UP * 0.05)
        self.play(FadeIn(mm))
        zoom = self.t("(épaisseur grossie)", 20, GREY_B).next_to(cote1, DOWN, buff=0.1)
        self.play(FadeIn(zoom))

        self.au_mot("Son volume")
        calc = VGroup(
            self.t("1 m × 1 m × 0,001 m", 34),
            self.t("= 0,001 m³", 34, EAU),
            self.t("= 1 dm³ = 1 L", 38, EAU),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.35).move_to([2.9, 0.9, 0])
        self.play(FadeIn(calc[0], shift=RIGHT * 0.15))
        self.au_mot("ça fait 0,001 mètre cube")
        self.play(FadeIn(calc[1], shift=RIGHT * 0.15))
        self.au_mot("c'est 1 litre")
        self.play(FadeIn(calc[2], shift=RIGHT * 0.15))

        self.au_mot("Retiens ça")
        regle = self.t("1 mm de pluie sur 1 m²  =  1 litre", 36, JAUNE_TITRE).move_to([0.0, -2.6, 0])
        cadre = SurroundingRectangle(regle, color=JAUNE_TITRE, buff=0.22, stroke_width=3)
        self.play(Write(regle), Create(cadre))
        self.attendre_voix()

    # ── 02 ──────────────────────────────────────────────────────────────────

    def ecran_record(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-record")
        self.titre_ecran("Le record de Cilaos")
        carte = CarteReunion(hauteur=3.6, centre=[-3.6, -0.4, 0])
        self.add(carte.mer())
        self.play(FadeIn(carte.contour()))
        self.au_mot("En 1952")
        self.play(FadeIn(carte.pastille("Cilaos", "Cilaos, 1952", couleur=EAU, taille=24, direction=DOWN)))

        lignes = VGroup(
            self.t("1 870 mm en 24 h", 40, EAU),
            self.t("sur 1 m² :", 30),
            self.t("1 870 litres", 44, JAUNE_TITRE),
            self.t("en une seule journée", 28),
        ).arrange(DOWN, buff=0.3).move_to([2.8, 0.6, 0])
        self.play(FadeIn(lignes[0], shift=UP * 0.1))
        self.au_mot("Sur chaque mètre carré")
        self.play(FadeIn(lignes[1]), FadeIn(lignes[2], scale=1.2))
        self.au_mot("En une seule journée")
        self.play(FadeIn(lignes[3]))
        self.au_mot("Alors pourquoi")
        self.play(Write(self.chute("Alors pourquoi manque-t-on d'eau ?", color=PERTE, font_size=32)))
        self.attendre_voix()

    # ── 03 ──────────────────────────────────────────────────────────────────

    def ecran_est_ouest(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-est-ouest")
        self.titre_ecran("1. La pluie tombe à l'est")
        carte = CarteReunion(hauteur=3.4, centre=[-4.0, 0.3, 0])
        self.add(carte.mer())
        self.play(FadeIn(carte.contour()))
        self.au_mot("Les nuages arrivent de l'est")
        alizes = VGroup(*[Arrow([-0.8, y, 0], [-2.0, y, 0], buff=0, color=WHITE, stroke_width=4)
                          for y in (1.3, 0.3, -0.7)])
        lbl = self.t("alizés", 24).next_to(alizes, UP, buff=0.1)
        self.play(LaggedStart(*[GrowArrow(f) for f in alizes], lag_ratio=0.2), FadeIn(lbl))
        self.au_mot("À Saint-Benoît")
        self.play(FadeIn(carte.pastille("Saint-Benoît", "3 500 mm", couleur=EAU, taille=22, direction=DOWN)))

        # Les calculs, à droite ; les barres proportionnelles dessous.
        l1 = self.t("100 × 3 500 = 350 000 L", 32, EAU).move_to([3.0, 1.9, 0])
        self.play(FadeIn(l1, shift=RIGHT * 0.15))
        base_y = -2.4
        u = 0.62  # 70 000 L
        grande = Rectangle(width=0.9, height=5 * u).set_fill(EAU, 0.85).set_stroke(WHITE, 1)
        grande.move_to([1.6, base_y + 5 * u / 2, 0])
        self.play(GrowFromEdge(grande, DOWN))
        self.add(self.t("Saint-Benoît", 20).next_to(grande, DOWN, buff=0.08))

        self.au_mot("À Saint-Pierre, environ")
        self.play(FadeIn(carte.pastille("Saint-Pierre", "700 mm", couleur=PERTE, taille=22, direction=DOWN)))
        l2 = self.t("100 × 700 = 70 000 L", 32, PERTE).move_to([3.0, 1.25, 0])
        self.play(FadeIn(l2, shift=RIGHT * 0.15))
        petite = Rectangle(width=0.9, height=u).set_fill(PERTE, 0.85).set_stroke(WHITE, 1)
        petite.move_to([3.7, base_y + u / 2, 0])
        self.play(GrowFromEdge(petite, DOWN))
        self.add(self.t("Saint-Pierre", 20).next_to(petite, DOWN, buff=0.08))

        self.au_mot("5 fois moins")
        copies = VGroup(*[petite.copy().set_fill(PERTE, 0.35).move_to([1.6, base_y + u * (k + 0.5), 0])
                          for k in range(5)])
        self.play(LaggedStart(*[TransformFromCopy(petite, c) for c in copies], lag_ratio=0.2), run_time=1.6)
        fois = self.t("× 5", 44, JAUNE_TITRE).move_to([5.0, base_y + 1.9, 0])
        self.play(Write(fois))
        self.au_mot("Saint-Pierre est du côté sec")
        sec = self.t("le côté sec de l'île", 26, PERTE).move_to([5.0, base_y + 1.2, 0])
        self.play(FadeIn(sec))
        self.attendre_voix()

    # ── 04 ──────────────────────────────────────────────────────────────────

    def ecran_saisons_eponge(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-saisons-eponge")
        titre = self.titre_ecran("2. Une saison sèche")
        mois = "JFMAMJJASOND"
        cases = VGroup()
        for i, m in enumerate(mois):
            pluvieux = i in (0, 1, 2, 11)
            sec = 4 <= i <= 10
            coul = EAU if pluvieux else (PERTE if sec else GREY_B)
            c = Square(0.75).set_fill(coul, 0.75).set_stroke(WHITE, 1.5)
            cases.add(VGroup(c, self.t(m, 28).move_to(c)))
        cases.arrange(RIGHT, buff=0.06).move_to([0, 1.7, 0])
        self.au_mot("presque toute la pluie")
        self.play(LaggedStart(*[FadeIn(c) for c in cases], lag_ratio=0.05))
        pl = self.t("saison des pluies", 24, EAU).next_to(cases[1], DOWN, buff=0.15)
        self.play(FadeIn(pl))
        self.au_mot("De mai à novembre")
        ss = self.t("saison sèche", 24, PERTE).next_to(VGroup(cases[4], cases[10]), DOWN, buff=0.15)
        self.play(FadeIn(ss))
        self.au_mot("En 2026")
        alerte = self.t("2026 : Saint-Pierre en alerte sécheresse depuis le 18 mai", 28, PERTE)
        alerte = self.borne(alerte, 11.5).move_to([0, 0.15, 0])
        self.play(Write(alerte))

        self.au_mot("Troisième raison")
        self.play(FadeOut(VGroup(cases, pl, ss, alerte)), FadeOut(titre))
        self.titre_ecran("3. L'île est une éponge")
        sol_y = 0.6
        sol = Rectangle(width=11, height=2.6).set_fill(BOUE, 0.55).set_stroke(width=0).move_to([-0.6, sol_y - 1.3, 0])
        surface = Line([-6.1, sol_y, 0], [4.9, sol_y, 0], color=GREEN_D, stroke_width=5)
        nappe = Rectangle(width=11, height=0.55).set_fill(EAU, 0.7).set_stroke(width=0).move_to([-0.6, sol_y - 2.3, 0])
        rnd = random.Random(7)
        fissures = VGroup()
        for k in range(9):
            x = -5.4 + k * 1.25
            pts = [[x, sol_y, 0]]
            y = sol_y
            while y > sol_y - 2.0:
                y -= 0.35
                pts.append([x + rnd.uniform(-0.18, 0.18), y, 0])
            f = VMobject(stroke_color="#3B2615", stroke_width=3)
            f.set_points_as_corners(pts)
            fissures.add(f)
        roche = self.t("roche volcanique", 26).move_to([3.0, sol_y - 0.6, 0])
        self.play(FadeIn(sol), Create(surface), FadeIn(roche))
        self.au_mot("pleine de fissures")
        self.play(LaggedStart(*[Create(f) for f in fissures], lag_ratio=0.08))
        self.au_mot("Une grande partie de la pluie")
        gouttes = pluie(-5.8, 4.6, 2.6, sol_y + 0.2, n=20, graine=11)
        self.add(gouttes)
        self.play(tomber(gouttes, sol_y), run_time=1.0)
        filets = VGroup(*[Dot(f.get_start(), color=EAU, radius=0.07) for f in fissures])
        self.play(*[MoveAlongPath(d, f) for d, f in zip(filets, fissures)], run_time=1.6)
        self.au_mot("dans des nappes")
        self.play(FadeIn(nappe), FadeOut(filets))
        self.play(FadeIn(self.t("nappe d'eau souterraine", 26, WHITE).move_to(nappe)))
        self.au_mot("Et elle ne coule plus")
        self.play(Write(self.chute("L'eau n'a pas disparu : elle est sous nos pieds.",
                                   color=JAUNE_TITRE, font_size=28)))
        self.attendre_voix()

    # ── 05 ──────────────────────────────────────────────────────────────────

    def ecran_fuites(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-fuites")
        titre = self.titre_ecran("4. Les fuites")
        grille = VGroup(*[Square(0.27).set_fill(EAU, 0.9).set_stroke(BLACK, 1) for _ in range(100)])
        grille.arrange_in_grid(10, 10, buff=0.03).move_to([-3.6, -0.3, 0])
        self.au_mot("sur 100 litres")
        self.play(LaggedStart(*[FadeIn(s) for s in grille], lag_ratio=0.005), run_time=1.2)
        l100 = self.t("100 L envoyés", 26).next_to(grille, UP, buff=0.15)
        self.play(FadeIn(l100))
        self.au_mot("seulement 62")
        perdus = grille[62:]
        self.play(perdus.animate.set_fill(PERTE, 0.85), run_time=0.8)
        r62 = self.t("62 L au robinet", 26, EAU).next_to(grille, DOWN, buff=0.15)
        self.play(FadeIn(r62))
        self.au_mot("62 sur 100, c'est 62 pour cent")
        pc = self.t("62 sur 100 = 62 %", 40, EAU).move_to([2.6, 2.0, 0])
        self.play(Write(pc))
        self.au_mot("Les 38 autres")
        f38 = self.t("38 % perdus dans les fuites", 30, PERTE).move_to([2.6, 1.3, 0])
        self.play(FadeIn(f38))

        self.au_mot("C'est un tableau de proportionnalité")
        x0, xs = 0.0, [2.67, 4.4]
        lignes = [("envoyés (L)", ["100", "?"]), ("arrivent (L)", ["62", "100"])]
        tab = VGroup()
        for r, (lab, vals) in enumerate(lignes):
            y = 0.1 - r * 0.75
            tab.add(Rectangle(width=5.6, height=0.75).set_stroke(WHITE, 2).move_to([2.4, y, 0]))
            tab.add(self.t(lab, 22).move_to([0.68, y, 0]))
            for x, v in zip(xs, vals):
                tab.add(self.t(v, 30, JAUNE_TITRE if v == "?" else WHITE).move_to([x, y, 0]))
        sep = VGroup(*[Line([x, 0.475, 0], [x, -1.025, 0], color=WHITE, stroke_width=2) for x in (1.75, 3.6)])
        self.play(FadeIn(tab), Create(sep))
        self.au_mot("on calcule")
        calc = self.t("100 ÷ 62 × 100 ≈ 161", 36, JAUNE_TITRE).move_to([2.4, -1.65, 0])
        self.play(Write(calc))
        rep = self.t("161", 30, JAUNE_TITRE).move_to([4.4, 0.1, 0])
        self.play(Transform(tab[3], rep))
        self.au_mot("61 litres partent")
        self.play(Write(self.chute("Pour 100 L au robinet : 161 L pompés, 61 L perdus.",
                                   color=PERTE, font_size=28)))
        self.attendre_voix()

    # ── 06 ──────────────────────────────────────────────────────────────────

    def ecran_eau_marron(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-eau-marron")
        self.titre_ecran("Et l'eau marron ?")
        y = 1.0
        riviere = Rectangle(width=2.6, height=0.8).set_fill(BOUE, 0.9).set_stroke(WHITE, 1.5).move_to([-4.6, y, 0])
        lr = self.t("rivière boueuse", 22).next_to(riviere, DOWN, buff=0.12)
        self.au_mot("la boue arrive")
        self.play(FadeIn(riviere), FadeIn(lr))
        chlore = Circle(radius=0.6).set_fill(GREY_E, 1).set_stroke(EAU, 3).move_to([-1.2, y, 0])
        lc = self.t("chlore", 24, EAU).move_to(chlore)
        filtre = RoundedRectangle(width=1.6, height=0.9, corner_radius=0.1).set_stroke(GREY_B, 2).move_to([1.6, y, 0])
        lf = self.t("filtre", 24, GREY_B).move_to(filtre)
        barre = Line(filtre.get_corner(DL), filtre.get_corner(UR), color=ROUGE_ERREUR, stroke_width=5)
        rob = robinet(BOUE, 0.75).move_to([4.6, y - 0.2, 0])
        f1 = Arrow(riviere.get_right(), chlore.get_left(), buff=0.1, color=BOUE)
        f2 = Arrow(chlore.get_right(), filtre.get_left(), buff=0.1, color=BOUE)
        f3 = Arrow(filtre.get_right(), rob.get_left(), buff=0.1, color=BOUE)
        self.au_mot("seulement avec du chlore")
        self.play(GrowArrow(f1), FadeIn(chlore), FadeIn(lc))
        self.au_mot("sans la filtrer")
        self.play(GrowArrow(f2), Create(filtre), FadeIn(lf))
        self.play(Create(barre))
        self.play(GrowArrow(f3), FadeIn(rob))

        lignes = VGroup(
            self.t("le chlore tue une partie des microbes", 28, EAU),
            self.t("mais il n'enlève pas la boue", 28, BOUE),
            self.t("dans l'eau trouble, les microbes se cachent", 28, PERTE),
        ).arrange(DOWN, buff=0.3).move_to([-0.4, -1.1, 0])
        self.au_mot("Le chlore tue")
        self.play(FadeIn(lignes[0]))
        self.au_mot("il n'enlève pas la boue")
        self.play(FadeIn(lignes[1]))
        self.au_mot("les microbes se cachent")
        self.play(FadeIn(lignes[2]))
        self.au_mot("C'est pour ça")
        self.play(Write(self.chute("Après une forte pluie : parfois, ne pas boire l'eau du robinet.",
                                   color=JAUNE_TITRE, font_size=26)))
        self.attendre_voix()

    # ── 07 / 08 ─────────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("Défi", 48, JAUNE_TITRE).to_edge(UP)))
        m = maison(2.4, centre=[-4.3, 0.0, 0])
        self.play(FadeIn(m))
        donnees = VGroup(self.t("toit : 80 m²", 26), self.t("pluie : 700 mm par an", 26, EAU),
                         self.t("jardin : 400 L par jour", 26, VERT_OK)).arrange(DOWN, buff=0.18, aligned_edge=LEFT)
        donnees.next_to(m, DOWN, buff=0.3)
        self.au_mot("Le toit mesure")
        self.play(FadeIn(donnees[0]))
        self.au_mot("Il tombe 700")
        self.play(FadeIn(donnees[1]))
        q = VGroup(
            self.t("1.  Combien de litres tombent", 32), self.t("     sur le toit en un an ?", 32),
            self.t("2.  Pendant combien de jours", 32), self.t("     cette eau arrose-t-elle le jardin ?", 32),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.18).move_to([2.2, 0.8, 0])
        q[2].shift(DOWN * 0.3)
        q[3].shift(DOWN * 0.3)
        self.au_mot("Première question")
        self.play(FadeIn(q[:2], shift=RIGHT * 0.15))
        self.au_mot("le jardin demande")
        self.play(FadeIn(donnees[2]))
        self.play(FadeIn(q[2:], shift=RIGHT * 0.15))
        self.au_mot("Mets pause")
        pause = self.chute("Mets pause et cherche !", color=ORANGE_RETENUE, font_size=32)
        self.play(Write(pause), Flash(pause, color=ORANGE_RETENUE, line_length=0.25))
        self.attendre_voix(marge=4.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-correction")
        self.titre_ecran("Correction")
        r = self.t("1 mm sur 1 m² = 1 L", 30, JAUNE_TITRE).move_to([0, 2.3, 0])
        self.play(FadeIn(r))
        c1 = VGroup(self.t("1.", 32, EAU), self.t("80 × 700 = 56 000 L", 40, EAU)).arrange(RIGHT, buff=0.3)
        c2 = VGroup(self.t("2.", 32, VERT_OK), self.t("56 000 ÷ 400 = 140 jours", 40, VERT_OK)).arrange(RIGHT, buff=0.3)
        VGroup(c1, c2).arrange(DOWN, aligned_edge=LEFT, buff=0.6).move_to([0, 0.6, 0])
        self.au_mot("Donc 80 mètres carrés")
        self.play(FadeIn(c1, shift=UP * 0.12))
        self.au_mot("Deuxième question")
        self.play(FadeIn(c2, shift=UP * 0.12))
        self.play(Circumscribe(c2[1], color=VERT_OK, buff=0.15))
        self.au_mot("Plus de quatre mois")
        mois = self.t("plus de 4 mois sans eau du robinet", 32, WHITE).move_to([0, -1.0, 0])
        self.play(FadeIn(mois))
        self.au_mot("C'est exactement")
        self.play(Write(self.chute("C'est ce que fait un récupérateur d'eau de pluie.", font_size=28)))
        self.attendre_voix()

    # ── 09 ──────────────────────────────────────────────────────────────────

    def ecran_solutions(self):
        self.clear()
        self.add_mascotte()
        self.dire("09-solutions")
        self.titre_ecran("Le vrai problème")
        trio = VGroup(self.t("au mauvais endroit", 30, PERTE), self.t("au mauvais moment", 30, PERTE),
                      self.t("mal gardée", 30, PERTE)).arrange(RIGHT, buff=0.7).move_to([0, 2.1, 0])
        self.au_mot("au mauvais endroit")
        self.play(FadeIn(trio[0]))
        self.au_mot("au mauvais moment")
        self.play(FadeIn(trio[1]))
        self.au_mot("on la garde mal")
        self.play(FadeIn(trio[2]))

        carte = CarteReunion(hauteur=3.0, centre=[3.4, -0.7, 0])
        self.add(carte.mer())
        sols = VGroup(self.t("filtrer l'eau", 30, EAU), self.t("réparer les fuites", 30, EAU),
                      self.t("amener l'eau de l'est vers l'ouest", 30, EAU),
                      self.t("récupérer l'eau de son toit", 30, EAU)).arrange(DOWN, aligned_edge=LEFT, buff=0.35)
        sols.move_to([-2.6, -0.6, 0])
        self.au_mot("usines qui filtrent")
        self.play(FadeIn(sols[0], shift=RIGHT * 0.15))
        self.au_mot("On répare")
        self.play(FadeIn(sols[1], shift=RIGHT * 0.15))
        self.au_mot("On perce même")
        self.play(FadeIn(carte.contour()), FadeIn(sols[2], shift=RIGHT * 0.15))
        fl = Arrow(carte.lieu("Saint-Benoît"), carte.lieu("Saint-Gilles"), buff=0.25, color=EAU, stroke_width=6)
        self.play(GrowArrow(fl))
        self.au_mot("Et chacun")
        self.play(FadeIn(sols[3], shift=RIGHT * 0.15))
        self.attendre_voix()

    # ── 10 ──────────────────────────────────────────────────────────────────

    def page_finale_eau(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("10-finale")
        self.play(Write(self.t("Ce que tu sais faire maintenant", 40, JAUNE_TITRE).to_edge(UP)))
        points = ["convertir des mm de pluie en litres : 1 mm sur 1 m² = 1 L",
                  "comparer deux villes avec un calcul",
                  "utiliser un pourcentage pour mesurer les fuites"]
        lignes = VGroup(*[VGroup(self.coche(), self.t(p, 28)).arrange(RIGHT, buff=0.3) for p in points])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.4).move_to([0, 1.2, 0])
        for mot, l in zip(["Un :", "Deux :", "Trois :"], lignes):
            self.au_mot(mot)
            self.play(FadeIn(l, shift=RIGHT * 0.15), run_time=0.5)
        self.au_mot("Et toi")
        q = VGroup(self.t("Et toi, dans ta commune :", 32, WHITE),
                   self.t("l'eau a-t-elle déjà été coupée ou non potable ?", 32, BLEU_CALCUL),
                   self.t("Réponds en commentaire, avec le nom de ta commune !", 30, VERT_OK),
                   ).arrange(DOWN, buff=0.22).move_to([-0.4, -1.5, 0])
        for m in q:
            self.borne(m, 11.0)
        cadre = SurroundingRectangle(q, color=VERT_OK, buff=0.25, stroke_width=2)
        self.play(FadeIn(q), Create(cadre))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_millimetre()
        self.ecran_record()
        self.ecran_est_ouest()
        self.ecran_saisons_eponge()
        self.ecran_fuites()
        self.ecran_eau_marron()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_solutions()
        self.page_finale_eau()
        self.page_abonnement()
