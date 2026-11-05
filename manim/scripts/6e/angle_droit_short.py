# angle_droit_short.py
# EleveAI — Maths 6e — short jumeau de l'épisode 02 « L'angle droit »
# (micro angle_droit). CEINTURE BLANCHE : on VOIT l'angle droit se fabriquer.
# Il AMUSE : « Pas d'équerre ? Déchire une feuille ! »
#   · EN HAUT, le papier déchiré, tout de travers : pli 1 (le bord droit), pli 2 ;
#   · EN BAS, au même instant, la ligne se replie : 180° → 90° (même code couleur :
#     le bord droit et la ligne sont roses, comme l'angle plat de la paysage) ;
#   · 1 question-pause (3 s) : quel angle dans le coin ? ;
#   · fin : la tablette de 6 carrés, sans donner la réponse, réponse en commentaire.
# Centre d'intérêt : art-design.
# Voix : manim/voix/6e-angle-droit-short.json (validée, débit −6) ; WAV :
# public/sons/6e-angle-droit-short/ ; marques : angle_droit_short_marques.json.
# Ajouté ICI : Feuille (papier irrégulier à deux plis), LignePliee (la ligne qui se
# replie, au même geste), tablette().
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/6e/angle_droit_short.py AngleDroitShort
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/angle_droit_short.py AngleDroitShort -o eleveai-maths-6e-angle-droit-short --media_dir manim/scripts/6e/media-angle-02-short
# Sortie : manim/sorties/6e/maths/angles/02-droit/eleveai-maths-6e-angle-droit-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403
from canvas_angles import *  # noqa: E402,F403
from angle_droit import DROIT, PLAT, coin_carre  # noqa: E402

PAPIER = "#fef3c7"
DOS = "#fcd34d"
BORD_PAPIER = [(-1.05, 0.55), (-0.55, 0.95), (0.2, 0.78), (0.95, 1.0), (1.12, 0.25), (0.85, -0.42), (1.02, -0.95),
               (0.1, -0.78), (-0.6, -1.02), (-1.0, -0.4), (-1.18, 0.05)]
Y_PLI, X_PLI = 0.12, 0.06
Y_FEUILLE = 1.2


def couper(pts, axe, seuil, garder_bas):
    """Le morceau du polygone d'un côté de la droite axe = seuil (Sutherland-Hodgman)."""
    ded = (lambda p: p[axe] <= seuil) if garder_bas else (lambda p: p[axe] >= seuil)
    out = []
    for i, a in enumerate(pts):
        b = pts[(i + 1) % len(pts)]
        if ded(a):
            out.append(a)
        if ded(a) != ded(b):
            k = (seuil - a[axe]) / (b[axe] - a[axe])
            out.append((a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k))
    return out


class Feuille(VGroup):
    """Le papier : f.t1 (pli 1, 0 → PI : le haut passe devant) ; f.t2 (pli 2, 0 → PI :
    la droite vient sur la gauche). f.coin = le coin final ; f.bord = le bord droit."""

    def __init__(self, centre=P(0, Y_FEUILLE), k=1.0, **kw):
        super().__init__(**kw)
        self.ctr, self.k_ = np.array(centre, dtype=float), k
        self.t1, self.t2 = ValueTracker(0.0), ValueTracker(0.0)
        self.morceaux = VGroup(*[VMobject(fill_color=PAPIER, fill_opacity=1, stroke_color="#a16207", stroke_width=0) for _ in range(4)])
        self.add(self.morceaux)
        self.coin = self.vers(X_PLI, Y_PLI)
        self._maj()
        self.add_updater(lambda m: m._maj())

    def vers(self, x, y):
        return self.ctr + P(x, y) * self.k_

    def _poser(self, m, pts, dos=False, trait=False):
        if len(pts) < 3:
            m.set_points_as_corners([self.ctr, self.ctr])
            m.set_fill(opacity=0).set_stroke(width=0)
            return
        vs = [self.vers(*p) for p in pts]
        m.set_points_as_corners(vs + [vs[0]])
        m.set_fill(DOS if dos else PAPIER, opacity=1).set_stroke(width=2.5 if trait else 0)

    def _maj(self):
        c1, c2 = np.cos(self.t1.get_value()), np.cos(self.t2.get_value())
        if self.t1.get_value() < 1e-3:
            couches = [(BORD_PAPIER, False, False)]
        else:
            bas = couper(BORD_PAPIER, 1, Y_PLI, True)
            haut = [(x, Y_PLI + (y - Y_PLI) * c1) for x, y in couper(BORD_PAPIER, 1, Y_PLI, False)]
            couches = [(bas, False, False), (haut, c1 < 0, True)]
        i = 0
        for pts, dos, trait in couches:
            if self.t2.get_value() < 1e-3:
                self._poser(self.morceaux[i], pts, dos, trait)
                i += 1
            else:
                self._poser(self.morceaux[i], couper(pts, 0, X_PLI, True), dos, trait)
                i += 1
        if self.t2.get_value() >= 1e-3:
            for pts, dos, trait in couches:  # la moitié droite passe devant, à l'envers
                d = [(X_PLI + (x - X_PLI) * c2, y) for x, y in couper(pts, 0, X_PLI, False)]
                self._poser(self.morceaux[i], d, (not dos) if c2 < 0 else dos, True)
                i += 1
        for j in range(i, 4):
            self._poser(self.morceaux[j], [])

    def plier1(self):
        return self.t1.animate.set_value(PI)

    def plier2(self, v=PI):
        return self.t2.animate.set_value(v)

    def bord_droit(self, couleur=PLAT, sw=9):
        """Le trait du pli 1, sur toute sa largeur."""
        xs = [x for x, _ in couper(BORD_PAPIER, 1, Y_PLI, True) if abs(_ - Y_PLI) < 1e-6]
        return Line(self.vers(min(xs), Y_PLI), self.vers(max(xs), Y_PLI), color=couleur, stroke_width=sw)


class LignePliee(VGroup):
    """EN BAS : la même chose en maths. La ligne (angle plat, rose), son arc SOUS la
    ligne (côté papier) ; l.t = le pli, comme f.t2 : la moitié droite vient sur la gauche."""

    def __init__(self, o=P(0, -1.4), r=1.55, ra=0.72, **kw):
        super().__init__(**kw)
        self.o, self.r, self.ra = np.array(o, dtype=float), r, ra
        self.t = ValueTracker(0.0)
        self.gauche = Line(self.o, self.o + LEFT * r, color=PLAT, stroke_width=9)
        self.droite = Line(self.o, self.o + RIGHT * r, color=PLAT, stroke_width=9)
        self.arc_g = Arc(radius=ra, start_angle=PI, angle=PI / 2, arc_center=self.o, stroke_color=ARC, stroke_width=7)
        self.arc_d = VMobject(stroke_color=ARC, stroke_width=7, fill_opacity=0)
        self.pli = DashedLine(self.o, self.o + DOWN * r * 0.85, color=WHITE, stroke_width=5)
        self.pt = Dot(self.o, radius=0.1, color=SOMMET)
        self.add(self.gauche, self.droite, self.pt)
        self._maj()
        self.droite.add_updater(lambda m: self._maj())

    def _maj(self):
        c = np.cos(self.t.get_value())
        self.droite.put_start_and_end_on(self.o, self.o + RIGHT * self.r * (c if abs(c) > 0.004 else 0.004))
        arc = Arc(radius=self.ra, start_angle=-PI / 2, angle=PI / 2, arc_center=self.o)
        pts = arc.get_points().copy()
        pts[:, 0] = self.o[0] + (pts[:, 0] - self.o[0]) * c
        self.arc_d.set_points(pts)

    def plier(self, v=PI):
        return self.t.animate.set_value(v)


def tablette(c=0.68, centre=P(0, 0.72)):
    """La tablette de chocolat, 3 × 2 carrés. g[i] : les carrés (avec reflet)."""
    g = VGroup()
    for j in range(2):
        for i in range(3):
            sq = RoundedRectangle(width=c - 0.03, height=c - 0.03, corner_radius=0.05, fill_color="#78350f", fill_opacity=1,
                                  stroke_color="#451a03", stroke_width=3)
            haut = RoundedRectangle(width=c - 0.22, height=c - 0.22, corner_radius=0.03, fill_color="#92400e", fill_opacity=1,
                                    stroke_width=0)
            g.add(VGroup(sq, haut).move_to(np.array(centre) + P((i - 1) * c, (0.5 - j) * c)))
    return g


class AngleDroitShort(ShortProp):
    nom_voix = "6e-angle-droit-short"
    fichier_marques = "angle_droit_short_marques.json"
    ceinture = "blanche"

    def legende(self, s, couleur=WHITE, fs=30, y=-0.2):
        return self.ligne([(s, couleur)], fs).move_to(P(0, y))

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("L'équerre en papier", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.au_mot("Pas")
        self.play(Write(titre), run_time=0.4)
        self.au_mot("équerre")
        e = Equerre(P(-0.85, 0.45), 0, taille=1.45)
        x = croix(e.copy().scale(1.08), sw=8)
        leg = self.legende("Pas d'équerre ?", WHITE, 36)
        self.play(FadeIn(e, scale=0.7), FadeIn(leg), run_time=0.3)
        self.play(Create(x), run_time=0.25)
        self.au_mot("Déchire")
        f = Feuille()
        page = Rectangle(width=2.3, height=2.0, fill_color=PAPIER, fill_opacity=1, stroke_width=0).move_to(P(0, Y_FEUILLE))
        leg2 = self.legende("Déchire une feuille !", ORANGE_RETENUE, 36)
        self.play(FadeOut(e), FadeOut(x), FadeOut(leg), run_time=0.1)
        self.play(FadeIn(page), run_time=0.1)
        self.play(FadeIn(leg2, scale=1.2), run_time=0.2)
        self.remove(page)
        self.add(f)
        self.play(Wiggle(f, scale_value=1.08, rotation_angle=0.1), run_time=0.5)
        self.attendre_voix(marge=0.15)
        self.remove(leg2)

        # ── 01 : le pli 1 ──
        self.dire("01-pli1")
        l = LignePliee()
        self.au_mot("Prends")
        leg = self.legende("un bout de papier,")
        self.play(FadeIn(leg), run_time=0.25)
        self.au_mot("tout de travers")
        leg2 = self.legende("tout de travers", ROUGE_ERREUR, 30, y=-0.72)
        self.play(FadeIn(leg2), Wiggle(f, scale_value=1.05, rotation_angle=0.14), run_time=0.7)
        self.au_mot("Plie-le")
        leg3 = self.legende("Plie-le une fois :")
        self.play(FadeOut(leg), FadeOut(leg2), run_time=0.12)
        self.play(FadeIn(leg3), f.plier1(), run_time=0.85)
        self.au_mot("le pli")
        bord = f.bord_droit()
        leg4 = self.legende("le pli fait un bord")
        self.play(FadeOut(leg3), run_time=0.12)
        self.play(FadeIn(leg4), Create(bord), Create(l.gauche), Create(l.droite), run_time=0.4)
        self.au_mot("bien droit")
        leg5 = self.legende("bien droit", PLAT, 34, y=-0.72)
        l.gauche.set_stroke(opacity=1)
        self.play(FadeIn(leg5, scale=1.2), FadeIn(l.pt, scale=2), run_time=0.3)
        self.insister(leg5, 1.15, 0.15)
        self.attendre_voix(marge=0.2)
        self.remove(leg4, leg5)

        # ── 02 : le pli 2 ──
        self.dire("02-pli2")
        self.au_mot("replie")
        leg = self.legende("Replie ce bord")
        bord_g = Line(bord.get_start(), f.coin, color=PLAT, stroke_width=9)
        bord_d = Line(f.coin, bord.get_end(), color=PLAT, stroke_width=9)
        cd = bord_d.get_length()
        bord_d.add_updater(lambda m: m.put_start_and_end_on(f.coin, f.coin + RIGHT * cd * (lambda c: c if abs(c) > 0.004 else 0.004)(np.cos(f.t2.get_value()))))
        self.remove(bord)
        self.add(bord_g, bord_d)
        self.play(FadeIn(leg), Create(l.pli), f.plier2(), l.plier(), run_time=1.1)
        self.au_mot("sur lui-même")
        leg2 = self.legende("sur lui-même.", WHITE, 30, y=-0.72)
        self.play(FadeIn(leg2), run_time=0.25)
        self.attendre_voix(marge=0.2)
        bord_d.clear_updaters()
        self.vider(garder)
        f.clear_updaters()

        # ── 03 : la question-pause (3 s) ──
        mini = Feuille(P(-1.05, -3.0), k=0.62)
        mini.t1.set_value(PI), mini.t2.set_value(PI)
        mini._maj()
        mini.clear_updaters()
        mini_coin = coin_carre(mini.coin, 180, 270, c=0.2, sw=5)
        rond = Circle(radius=0.26, stroke_color=AMBRE, stroke_width=5).move_to(mini.coin + P(-0.08, -0.08))

        def avant(sc):
            sc.play(FadeIn(mini, scale=0.7), Create(rond), run_time=0.3)

        def apres(sc):
            lg = sc.ligne_rep(0, ["90°", "pile !"], 30)
            sc.au_mot("90")
            sc.play(FadeOut(rond), Create(mini_coin), FadeIn(lg[0], scale=1.3), run_time=0.25)
            sc.au_mot("pile")
            sc.play(FadeIn(lg[1], scale=1.3), run_time=0.2)
            sc.insister(lg, 1.15, 0.15)
            sc.rep_fini()

        self.question_pause("03-question", "03b-reponse", ["Quel angle obtiens-tu", "dans le coin ?"],
                            [self.t("un peu moins de 90°", 28), VGroup(self.t("90°", 28), self.t("pile", 28)).arrange(RIGHT, buff=0.14), self.t("ça dépend du papier", 28)], 1,
                            ["90° pile !"], mot_q="Quel angle", avant_q=avant, autres_r=apres)
        self.vider(garder)

        # ── 04 : pourquoi ──
        self.dire("04-pourquoi")
        f2 = Feuille()
        f2.t1.set_value(PI), f2.t2.set_value(PI)
        f2._maj()
        l2 = LignePliee()
        self.add(f2)
        self.au_mot("Le bord droit")
        leg = self.legende("Le bord droit")
        l2.droite.set_stroke(opacity=1)
        self.play(FadeIn(leg), f2.plier2(0.0), run_time=0.6)
        bord2 = f2.bord_droit()
        self.play(Create(bord2), FadeIn(l2), run_time=0.3)
        self.au_mot("angle plat")
        leg2 = self.legende("est un angle plat :", PLAT, 30, y=-0.72)
        l2.arc_d.set_stroke(opacity=1)
        self.play(FadeIn(leg2), Create(l2.arc_g), Create(l2.arc_d), run_time=0.45)
        self.au_mot("180")
        n = self.t("180°", 44, PLAT).move_to(l2.o + P(0, -1.12))
        self.play(FadeIn(n, scale=1.5), run_time=0.3)
        self.insister(n, 1.25, 0.15)
        self.au_mot("Plié")
        leg3 = self.legende("Plié en deux :")
        self.remove(bord2)
        bg = Line(bord2.get_start(), f2.coin, color=PLAT, stroke_width=9)
        bd = Line(f2.coin, bord2.get_end(), color=PLAT, stroke_width=9)
        cd2 = bd.get_length()
        bd.add_updater(lambda m: m.put_start_and_end_on(f2.coin, f2.coin + RIGHT * cd2 * (lambda c: c if abs(c) > 0.004 else 0.004)(np.cos(f2.t2.get_value()))))
        self.add(bg, bd)
        self.play(FadeOut(leg), FadeOut(leg2), FadeOut(n), run_time=0.12)
        self.play(FadeIn(leg3), f2.plier2(), l2.plier(), FadeIn(l2.pli), run_time=0.8)
        self.au_mot("90")
        n2 = self.t("90°", 44, DROIT).move_to(l2.o + P(-1.05, -0.98))
        coin_b = coin_carre(l2.o, 180, 270, c=0.28, sw=6, couleur=DROIT)
        coin_h = coin_carre(f2.coin, 180, 270, c=0.28, sw=6, couleur="#b45309")
        self.play(FadeIn(n2, scale=1.5), Create(coin_b), Create(coin_h), run_time=0.35)
        self.insister(n2, 1.3, 0.18)
        self.au_mot("Tu viens")
        leg4 = self.legende("Tu viens de fabriquer", WHITE, 28)
        self.play(FadeOut(leg3), run_time=0.12)
        self.play(FadeIn(leg4), run_time=0.2)
        self.au_mot("une équerre")
        leg5 = self.legende("une équerre !", VERT_OK, 34, y=-0.72)
        self.play(FadeIn(leg5, scale=1.25), Flash(f2.coin, color=VERT_OK, line_length=0.25), run_time=0.45)
        self.insister(leg5, 1.12, 0.15)
        self.attendre_voix(marge=0.4)
        f2.clear_updaters()
        bd.clear_updaters()
        l2.droite.clear_updaters()
        self.vider(garder)

        # ── 05 : la question en commentaire ──
        self.dire("05-commentaire")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 44, JAUNE_TITRE).move_to(P(0, 1.95))
        self.play(FadeIn(et, scale=1.3), run_time=0.3)
        self.au_mot("tablette")
        tb = tablette()
        leg = self.legende("Une tablette de chocolat", WHITE, 26, y=-0.42)
        self.play(FadeIn(tb, scale=0.8), FadeIn(leg), run_time=0.35)
        self.au_mot("6 carrés")
        leg2 = self.legende("en 6 carrés", ORANGE_RETENUE, 34, y=-0.92)
        ec = 0.2
        self.play(FadeIn(leg2, scale=1.2), *[c.animate.shift(P((i % 3 - 1) * ec, (0.5 - i // 3) * ec * 1.2)) for i, c in enumerate(tb)], run_time=0.45)
        self.au_mot("Combien")
        q = self.borne(self.t("Combien d'angles droits", 28), 0.6).move_to(P(0, -1.45))
        self.play(FadeIn(q, shift=UP * 0.12), run_time=0.3)
        self.au_mot("en tout")
        q2 = self.t("en tout ?", 30, ORANGE_RETENUE).move_to(P(0, -1.92))
        self.play(FadeIn(q2, shift=UP * 0.12), run_time=0.25)
        self.appel_commentaire(y=-2.42)
