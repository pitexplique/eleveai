# angle_mesurer_short.py
# EleveAI — Maths 6e — short jumeau de l'épisode 04 « Mesurer un angle »
# (micro angle_mesurer). CEINTURE BLANCHE : on VOIT le rapporteur dans l'horloge.
# Il AMUSE : « Il y a un rapporteur caché dans une horloge ! »
#   · EN HAUT, l'horloge : grande aiguille sur 12, petite à 1, 2, 3, 4, 6 ;
#   · EN BAS, au même instant, le rapporteur où la même ouverture s'allume :
#     30°, 60°, 90°, 120°, 180° (même code couleur : côtés bleus, arc orange) ;
#   · 1 question-pause (3 s) : et à 4 heures ? ;
#   · fin : à 5 heures, sans donner la réponse, réponse en commentaire.
# Centres d'intérêt : corps-sante, sport (comme la paysage).
# Voix : manim/voix/6e-angle-mesurer-short.json (validée, débit −6) ; WAV :
# public/sons/6e-angle-mesurer-short/ ; marques : angle_mesurer_short_marques.json.
# Ajouté ICI : Horloge. Le rapporteur vient du module, tel quel.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/6e/angle_mesurer_short.py AngleMesurerShort
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/angle_mesurer_short.py AngleMesurerShort -o eleveai-maths-6e-angle-mesurer-short --media_dir manim/scripts/6e/media-angle-04-short
# Sortie : manim/sorties/6e/maths/angles/04-mesurer/eleveai-maths-6e-angle-mesurer-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403
from canvas_angles import *  # noqa: E402,F403

PLAT = FAMILLE["plat"]
DROIT = FAMILLE["droit"]
C_H, R_H = P(0, 1.2), 1.0            # l'horloge, en haut
C_R, R_R = P(0, -2.6), 1.95          # le rapporteur, en bas
Y_LEG = -0.24                        # la seule ligne de légende, entre les deux


class Horloge(VGroup):
    """Grande aiguille sur 12, petite sur h.h (en heures) ; l'arc orange va de l'une
    à l'autre, dans le sens des aiguilles ; à 3 heures, le petit carré le remplace."""

    def __init__(self, c=C_H, r=R_H, h=0.0, fs=15, **kw):
        super().__init__(**kw)
        self.c, self.r = np.array(c, dtype=float), r
        self.h = ValueTracker(float(h))
        self.cadran = Circle(radius=r, fill_color="#0f172a", fill_opacity=1, stroke_color=WHITE, stroke_width=4).move_to(self.c)
        self.traits, self.nombres = VGroup(), VGroup()
        for i in range(1, 13):
            d = 90 - 30 * i
            self.traits.add(Line(polaire(d, r * 0.93, self.c), polaire(d, r, self.c), color=WHITE, stroke_width=3))
            t = Text(str(i), font_size=fs * r, color=WHITE)
            t.sans_synchro = t._pas_audit = True
            self.nombres.add(t.move_to(polaire(d, r * 0.78, self.c)))
        self.fond = VMobject(fill_color=ARC, fill_opacity=0.2, stroke_width=0)
        self.arc = VMobject(stroke_color=ARC, stroke_width=6, fill_opacity=0)
        self.coin = VMobject(stroke_color=ARC, stroke_width=5, stroke_opacity=0, fill_opacity=0)
        self.grande = Line(self.c, self.c + UP * r * 0.62, color=COTE, stroke_width=7)
        self.petite = Line(self.c, self.c + UP * r * 0.5, color=COTE, stroke_width=9)
        self.pivot = Dot(self.c, radius=0.08 * r, color=SOMMET)
        self.add(self.cadran, self.traits, self.nombres, self.fond, self.arc, self.coin, self.grande, self.petite, self.pivot)
        self._maj()
        self.add_updater(lambda m: m._maj())

    def _maj(self):
        h = self.h.get_value()
        d = 90 - 30 * h
        self.petite.put_start_and_end_on(self.c, polaire(d, self.r * 0.5, self.c))
        an = np.deg2rad(-30 * h) if h > 0.02 else -0.001
        ra = self.r * 0.34
        self.arc.set_points(Arc(radius=ra, start_angle=PI / 2, angle=an, arc_center=self.c).get_points())
        self.fond.set_points(AnnularSector(inner_radius=0, outer_radius=ra, angle=an, start_angle=PI / 2, arc_center=self.c).get_points())
        c = self.r * 0.2
        u, v = polaire(90), polaire(0)
        self.coin.set_points_as_corners([self.c + u * c, self.c + (u + v) * c, self.c + v * c])
        droit = abs(h - 3) < 0.02
        self.coin.set_stroke(opacity=1 if droit else 0)
        self.arc.set_stroke(opacity=0 if (droit or h <= 0.02) else 1)

    def aller(self, h):
        return self.h.animate.set_value(h)

    def secteur(self, h0, h1, couleur=VERT_OK, ra=None):
        """Le secteur entre deux heures (pour compter de 30° en 30°)."""
        ra = ra or self.r * 0.34
        return AnnularSector(inner_radius=0, outer_radius=ra, angle=np.deg2rad(-30 * (h1 - h0)), start_angle=np.deg2rad(90 - 30 * h0),
                             arc_center=self.c, fill_color=couleur, fill_opacity=0.75, stroke_color=BLACK, stroke_width=2)


class AngleMesurerShort(ShortProp):
    nom_voix = "6e-angle-mesurer-short"
    fichier_marques = "angle_mesurer_short_marques.json"
    ceinture = "blanche"
    _avec = None

    def play(self, *a, **k):
        """Ce qui doit partir AVEC l'animation suivante (l'aiguille avec la question)."""
        if self._avec:
            a, self._avec = (*a, *self._avec), None
        return super().play(*a, **k)

    def _disposer_q(self, question, choix, phrase):
        """Trois cartes étroites à gauche : l'horloge se pose à côté d'elles."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        neuves = VGroup(*[self._carte_choix(l, c, 2.3, 28) for l, c in zip("ABC", choix)])
        neuves.arrange(DOWN, buff=0.1).next_to(q, DOWN, buff=0.22).set_x(-0.85)
        self.cartes_q = neuves
        pause.next_to(neuves, DOWN, buff=0.15).set_x(0)
        ph.next_to(neuves, DOWN, buff=0.12).set_x(0)
        return tete, q, neuves, pause, rebours, ph

    def legende(self, s, couleur=WHITE, fs=28):
        return self.ligne([(s, couleur)], fs).move_to(P(0, Y_LEG))

    def bas(self, mesure=0.0):
        """L'angle et le rapporteur POSÉ ; on lit la rangée intérieure : la rangée
        extérieure reste pâle, les multiples de 30 sont plus gros et détourés."""
        a = Angle(C_R, 0, mesure, longueur=2.08, rayon_arc=0.36, sw=6, secteur=0.2)
        r = Rapporteur(C_R, R_R)
        r.rangees["ext"].set_opacity(0.28)
        for v in range(0, 181, 10):  # à ce rayon, la rangée intérieure se touche : seuls les 30 en 30 restent, gros
            t = r.nombres["int"][v]
            if v % 30 == 0:
                t.scale(1.3).set_stroke(BLACK, 5, background=True)
                for m in t.family_members_with_points():
                    m.joint_type = LineJointType.ROUND  # sans ça, le contour du 3 fait une pointe
            else:
                t.set_opacity(0)
        r.nombres["int"][0].shift(P(-0.2, 0.08))  # au-dessus de la base, où passe le côté
        r.nombres["int"][180].shift(P(0.2, 0.08))
        return a, r

    def pose(self, r, v, ancien=None, k=1.7):
        """Animations : le nombre v de la rangée s'allume (grossit), l'ancien retombe."""
        out = [r.nombres["int"][v].animate.set_color(VERT_OK).scale(k)]
        if ancien is not None:
            out.append(r.nombres["int"][ancien].animate.set_color(AMBRE).scale(1 / 1.7))
        return out

    def cote_g(self, s):
        return self.t(s, 34, WHITE).move_to(P(-1.62, C_H[1]))

    def cote_d(self, s, couleur=VERT_OK):
        return self.t(s, 34, couleur).move_to(P(1.62, C_H[1]))

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Le rapporteur caché", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.au_mot("Il y a")
        self.play(Write(titre), run_time=0.4)
        a, r = self.bas()
        self.au_mot("rapporteur")
        leg = self.legende("un rapporteur caché")
        self.play(FadeIn(r, shift=UP * 0.3), FadeIn(leg), run_time=0.35)
        h = Horloge()
        self.au_mot("dans une")
        self.play(FadeOut(leg), run_time=0.1)
        leg = self.legende("dans une horloge !", ORANGE_RETENUE)
        self.play(FadeIn(leg, scale=1.15), FadeIn(h, scale=0.7), run_time=0.35)
        self.play(Wiggle(h.cadran, scale_value=1.06, rotation_angle=0.06), run_time=0.45)
        self.attendre_voix(marge=0.15)
        self.remove(leg)

        # ── 01 : une heure ──
        self.dire("01-une-heure")
        self.add(a)
        self.remove(r)
        self.add(r)
        self.au_mot("À 1")
        leg = self.legende("À 1 heure pile,")
        g = self.cote_g("1 h")
        self.play(FadeIn(leg), FadeIn(g, scale=1.3), run_time=0.25)
        self.play(h.aller(1), a.ouvrir(30), run_time=0.6)
        self.au_mot("les aiguilles")
        self.remove(leg)
        leg = self.legende("les aiguilles font")
        self.play(FadeIn(leg), run_time=0.2)
        self.au_mot("un angle")
        self.remove(leg)
        leg = self.legende("un angle de 30°")
        d = self.cote_d("30°")
        self.au_mot("30")
        self.play(FadeIn(leg), FadeIn(d, scale=1.1), *self.pose(r, 30), run_time=0.3)
        self.insister(d, 1.12, 0.18)
        self.attendre_voix(marge=0.15)

        # ── 02 : deux heures, trois heures ──
        self.dire("02-deux-trois")
        self.au_mot("À 2")
        self.play(FadeOut(leg), FadeOut(g), FadeOut(d), run_time=0.1)
        g = self.cote_g("2 h")
        self.play(FadeIn(g, scale=1.3), h.aller(2), a.ouvrir(60), run_time=0.5)
        self.au_mot("60")
        d = self.cote_d("60°")
        self.play(FadeIn(d, scale=1.1), *self.pose(r, 60, 30), run_time=0.3)
        self.au_mot("À 3")
        self.play(FadeOut(g), FadeOut(d), run_time=0.1)
        g = self.cote_g("3 h")
        self.play(FadeIn(g, scale=1.3), h.aller(3), a.ouvrir(90), run_time=0.5)
        self.au_mot("90")
        d = self.cote_d("90°", DROIT)
        self.play(FadeIn(d, scale=1.1), *self.pose(r, 90, 60), run_time=0.3)
        self.insister(d, 1.12, 0.15)
        self.au_mot("Un angle droit")
        leg = self.legende("Un angle droit !", DROIT, 32)
        self.play(FadeIn(leg, scale=1.2), Flash(C_H, color=DROIT, line_length=0.2), run_time=0.4)
        self.attendre_voix(marge=0.2)
        h.clear_updaters(), a.figer()
        self.vider(garder)

        # ── 03 : la question-pause (3 s) ──
        hq = Horloge(P(1.27, -0.2), 0.8)

        def avant(sc):
            sc.play(FadeIn(hq, scale=0.7), run_time=0.15)
            sc._avec = [hq.aller(4)]  # l'aiguille va sur 4 quand la voix dit 4

        def apres(sc):
            sc.au_mot("30 degrés")
            secteurs = [hq.secteur(i, i + 1) for i in range(4)]
            sc.ph_q[0].sans_synchro = True  # posée au mot « 30 », sans attendre « plus »
            sc.play(FadeIn(sc.ph_q[0], shift=UP * 0.1), run_time=0.25)
            sc.au_mot("à chaque")
            sc.play(FadeIn(sc.ph_q[1], shift=UP * 0.1), LaggedStart(*[FadeIn(x, scale=1.3) for x in secteurs], lag_ratio=0.7), run_time=1.0)
            sc.au_mot("120")
            sc.play(FadeIn(sc.ph_q[2], scale=1.4), run_time=0.25)
            sc.insister(sc.ph_q[2], 1.3, 0.18)
            sc.rep_fini()
            hq.clear_updaters()

        self.question_pause("03-question", "03b-reponse", ["Et à 4 heures ?"],
                            [self.t("40°", 28), self.t("90°", 28), self.t("120°", 28)], 2,
                            ["30° de plus", "à chaque heure :", "120°"], mot_q="Et à", avant_q=avant, autres_r=apres)
        self.vider(garder)

        # ── 04 : six heures ──
        self.dire("04-six")
        h = Horloge(h=4)
        a, r = self.bas(120)
        r.nombres["int"][120].set_color(VERT_OK)
        self.add(a, r, h)
        self.au_mot("À 6")
        g = self.cote_g("6 h")
        self.play(FadeIn(g, scale=1.3), h.aller(6), a.ouvrir(180), run_time=0.6)
        self.au_mot("180")
        d = self.t("180°", 28, PLAT).move_to(P(1.56, C_H[1]))
        self.play(FadeIn(d, scale=1.1), r.nombres["int"][120].animate.set_color(AMBRE), *self.pose(r, 180, k=1.4), run_time=0.3)
        self.insister(d, 1.12, 0.15)
        self.au_mot("Les aiguilles")
        leg = self.legende("Les aiguilles font")
        self.play(FadeIn(leg), run_time=0.2)
        self.au_mot("une ligne droite")
        self.remove(leg)
        leg = self.legende("une ligne droite,", PLAT)
        ligne_b = Line(C_R + LEFT * 2.08, C_R + RIGHT * 2.08, color=PLAT, stroke_width=9)
        a.point.set_z_index(3)  # le sommet reste devant la ligne
        self.play(FadeIn(leg), h.grande.animate.set_color(PLAT), h.petite.animate.set_color(PLAT), Create(ligne_b), run_time=0.45)
        self.au_mot("un angle plat")
        self.remove(leg)
        leg = self.legende("un angle plat !", PLAT, 32)
        self.play(FadeIn(leg, scale=1.2), run_time=0.3)
        self.insister(leg, 1.15, 0.15)
        self.attendre_voix(marge=0.3)
        h.clear_updaters(), a.figer()
        self.vider(garder)

        # ── 05 : la question en commentaire ──
        self.dire("05-commentaire")
        h = Horloge()
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 40, JAUNE_TITRE).move_to(P(0, Y_LEG))
        self.play(FadeIn(et, scale=1.3), run_time=0.3)
        self.au_mot("Quel angle")
        q1 = self.t("Quel angle font", 30).move_to(P(0, -0.82))
        self.play(FadeIn(q1, shift=UP * 0.12), FadeIn(h, scale=0.8), run_time=0.3)
        self.au_mot("les aiguilles")
        q2 = self.t("les aiguilles", 30).move_to(P(0, -1.3))
        self.play(FadeIn(q2, shift=UP * 0.12), run_time=0.25)
        self.au_mot("à 5")
        q3 = self.t("à 5 heures ?", 34, ORANGE_RETENUE).move_to(P(0, -1.82))
        g = self.cote_g("5 h")
        inter = self.t("?", 52, ORANGE_RETENUE).move_to(P(1.62, C_H[1]))
        inter._pas_audit = True
        self.play(FadeIn(q3, scale=1.2), FadeIn(g, scale=1.3), h.aller(5), run_time=0.6)
        self.play(FadeIn(inter, scale=1.6), run_time=0.25)
        h.clear_updaters()
        self.appel_commentaire(y=-2.42)
