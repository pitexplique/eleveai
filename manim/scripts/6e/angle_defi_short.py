# angle_defi_short.py
# EleveAI — Maths 6e — short jumeau de l'épisode 06 « Défis sur les angles »
# (micro angle_defi). CEINTURE BLANCHE : on VOIT le tour partagé.
# Il AMUSE : « Une éolienne tourne. Quel angle entre ses pales ? »
#   · EN HAUT, l'éolienne dont les 3 pales tournent ;
#   · EN BAS, au même instant, un cercle : ses 3 rayons tournent AVEC les pales, puis
#     les 3 secteurs se remplissent, 120° chacun (côtés bleus, sommet rouge, arc orange) ;
#   · 1 question-pause (3 s) : l'angle entre deux pales voisines ;
#   · fin : l'hélice de bateau à 5 pales, sans donner la réponse, réponse en commentaire.
# Centres d'intérêt : nature-ecologie.
# Voix : manim/voix/6e-angle-defi-short.json (validée, débit −6) ; WAV :
# public/sons/6e-angle-defi-short/ ; marques : angle_defi_short_marques.json
# (« 120 plus 120 plus 120 » recalculé : cues2marques.py perd la 2e occurrence).
# Ajouté ICI : Helice, Eolienne, Cercle.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run --progress_bar none -r 1080,1920 manim/scripts/6e/angle_defi_short.py AngleDefiShort
# python -m manim render -qh -r 1080,1920 --progress_bar none manim/scripts/6e/angle_defi_short.py AngleDefiShort -o eleveai-maths-6e-angle-defi-short --media_dir manim/scripts/6e/media-angle-06-short
# Sortie : manim/sorties/6e/maths/angles/06-defi/eleveai-maths-6e-angle-defi-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403
from canvas_angles import *  # noqa: E402,F403

C_E = P(0, 1.2)      # le moyeu de l'éolienne, en haut
L_E = 0.85
C_C, R_C = P(0, -1.98), 0.9   # le cercle, en bas
Y_LEG = -0.24        # la ligne de légende, entre les deux
TONS = (ARC, FAMILLE["aigu"], FAMILLE["obtus"])


class Helice(VGroup):
    """n pales autour de c. h.th = la rotation en degrés ; h.vitesse (°/s) la fait tourner
    toute seule ; h.arreter() = l'animation qui la pose droite (une pale vers le haut)."""

    def __init__(self, c=C_E, n=3, L=L_E, w=0.2, couleur=WHITE, **kw):
        super().__init__(**kw)
        self.c, self.n = np.array(c, dtype=float), n
        self.th, self._vu, self.vitesse = ValueTracker(0.0), 0.0, 0.0
        self.pales = VGroup()
        for i in range(n):
            p = Polygon(self.c + P(-w * 0.28, 0), self.c + P(w * 0.5, L * 0.22), self.c + P(w * 0.18, L), self.c + P(-w * 0.12, L),
                        fill_color=couleur, fill_opacity=1, stroke_color=couleur, stroke_width=1)
            self.pales.add(p.rotate(i * TAU / n, about_point=self.c))
        self.add(self.pales, Dot(self.c, radius=0.075 * L / L_E + 0.02, color=SOMMET))
        self.add_updater(lambda m, dt: m._maj(dt))

    def _maj(self, dt):
        if self.vitesse:
            self.th.set_value(self.th.get_value() + self.vitesse * dt)
        v = self.th.get_value()
        self.pales.rotate(np.deg2rad(v - self._vu), about_point=self.c)
        self._vu = v

    def arreter(self):
        self.vitesse = 0.0
        pas = 360 / self.n
        return self.th.animate.set_value(np.ceil(self.th.get_value() / pas - 1e-6) * pas)

    def dir(self, i=0):
        return 90 + self.th.get_value() + i * 360 / self.n


def mat(c=C_E, y_sol=0.18, k=1.0):
    """Le mât et le sol, sous les pales."""
    x = np.array(c, dtype=float)[0]
    tour = Polygon(P(x - 0.045 * k, c[1]), P(x + 0.045 * k, c[1]), P(x + 0.09 * k, y_sol), P(x - 0.09 * k, y_sol),
                   fill_color="#cbd5e1", fill_opacity=1, stroke_width=0)
    sol = Line(P(x - 1.0 * k, y_sol), P(x + 1.0 * k, y_sol), color="#22c55e", stroke_width=6)
    return VGroup(sol, tour)


class Cercle(VGroup):
    """Le tour complet : ses rayons (bleus) suivent la rotation d'une hélice. sect(i) = le
    secteur i ; lab(i, txt) = sa mesure, posée au milieu du secteur (hélice arrêtée)."""

    def __init__(self, h, c=C_C, R=R_C, **kw):
        super().__init__(**kw)
        self.h, self.c, self.R = h, np.array(c, dtype=float), R
        self.tour = Circle(radius=R, stroke_color=WHITE, stroke_width=4).move_to(self.c)
        self.rayons = VGroup(*[Line(self.c, self.c + UP * R, color=COTE, stroke_width=7) for _ in range(h.n)]).set_z_index(2)
        self.pt = Dot(self.c, radius=0.09, color=SOMMET).set_z_index(3)
        self.add(self.tour, self.rayons, self.pt)
        self.rayons.add_updater(lambda m: self._maj())
        self._maj()

    def _maj(self):
        for i, r in enumerate(self.rayons):
            r.put_start_and_end_on(self.c, polaire(self.h.dir(i), self.R, self.c))

    def sect(self, i, couleur=None, op=0.6):
        pas = 360 / self.h.n
        return AnnularSector(inner_radius=0, outer_radius=self.R, angle=np.deg2rad(pas), start_angle=np.deg2rad(self.h.dir(i)),
                             arc_center=self.c, fill_color=couleur or TONS[i % 3], fill_opacity=op, stroke_width=0).set_z_index(1)

    def lab(self, i, txt, fs=21):
        pas = 360 / self.h.n
        t = Text(txt, font_size=fs, color=WHITE, weight=BOLD).move_to(polaire(self.h.dir(i) + pas / 2, self.R * 0.57, self.c))
        t.set_stroke(BLACK, 5, background=True)
        for m in t.family_members_with_points():
            m.joint_type = LineJointType.ROUND
        t.sans_synchro = t._pas_audit = True
        return t.set_z_index(4)


class AngleDefiShort(ShortProp):
    nom_voix = "6e-angle-defi-short"
    fichier_marques = "angle_defi_short_marques.json"
    ceinture = "blanche"
    _avec = None

    def play(self, *a, **k):
        if self._avec:
            a, self._avec = (*a, *self._avec), None
        return super().play(*a, **k)

    def au_mot(self, extrait, n=1):
        super().au_mot(extrait, n)
        r = self.t_mot(extrait, n)
        if r > 0:  # le module tolère 0,05 s d'avance : ici, 0 s
            self.wait(r + 1 / 60)

    def _disposer_q(self, question, choix, phrase):
        """Trois cartes étroites à gauche : l'éolienne se pose à côté d'elles."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        neuves = VGroup(*[self._carte_choix(l, c, 2.3, 28) for l, c in zip("ABC", choix)])
        for x in neuves:  # moins hautes : la phrase de réponse tient au-dessus de Ti-Margo
            x[0].stretch_to_fit_height(0.62)
        neuves.arrange(DOWN, buff=0.08).next_to(q, DOWN, buff=0.18).set_x(-0.85)
        self.cartes_q = neuves
        pause.next_to(neuves, DOWN, buff=0.15).set_x(0)
        ph.next_to(neuves, DOWN, buff=0.08).set_x(0)
        return tete, q, neuves, pause, rebours, ph

    def legende(self, s, couleur=WHITE, fs=30):
        return self.borne(self.t(s, fs, couleur), 0.42).move_to(P(0, Y_LEG))

    def poser(self, lg, mots, avec=None, rt=0.22):
        """Une ligne, morceau par morceau, au mot ; avec[i] = les gestes du morceau i."""
        avec = avec or {}
        i = 0
        while i < len(lg):
            if mots[i] is not None:
                self.au_mot(*mots[i]) if isinstance(mots[i], tuple) else self.au_mot(mots[i])
            lot, gestes = [lg[i]], list(avec.get(i, []))
            j = i + 1
            while j < len(lg) and mots[j] is None:
                lot.append(lg[j])
                gestes += list(avec.get(j, []))
                j += 1
            self.play(*[FadeIn(x, scale=1.15) for x in lot], *gestes, run_time=rt)
            i = j

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("L'angle des éoliennes", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]
        m_ = mat()
        e = Helice()
        c = Cercle(e)

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.au_mot("Une éolienne")
        leg = self.legende("Une éolienne tourne.")
        self.play(Write(titre), FadeIn(m_), FadeIn(e), FadeIn(leg), run_time=0.45)
        self.au_mot("tourne")
        e.vitesse = 170
        self.au_mot("Quel angle")
        self.remove(leg)
        leg = self.legende("Quel angle entre ses pales ?", ORANGE_RETENUE, 28)
        self.play(FadeIn(leg), e.arreter(), run_time=0.4)
        arc_q = Arc(radius=0.42, start_angle=PI / 2, angle=TAU / 3, arc_center=C_E, stroke_color=ARC, stroke_width=7).set_z_index(1)
        inter = Text("?", font_size=120, color=ORANGE_RETENUE, weight=BOLD).move_to(C_C)
        inter._pas_audit = True
        self.play(Create(arc_q), FadeIn(inter, scale=1.4), run_time=0.35)
        self.attendre_voix(marge=0.15)

        # ── 01 : 3 pales, un tour ──
        self.dire("01-pales")
        self.au_mot("La plupart")
        self.remove(leg)
        leg = self.legende("La plupart des éoliennes")
        e.vitesse = 90
        self.play(FadeIn(leg), FadeOut(arc_q), FadeOut(inter), run_time=0.25)
        self.au_mot("3 pales")
        self.remove(leg)
        leg = self.legende("ont 3 pales,")
        self.play(FadeIn(leg), FadeIn(c), run_time=0.3)
        self.au_mot("bien réparties")
        self.remove(leg)
        leg = self.legende("bien réparties.", VERT_OK)
        self.play(FadeIn(leg), run_time=0.25)
        self.au_mot("Elles font")
        self.remove(leg)
        leg = self.legende("Elles font un tour complet :", WHITE, 28)
        self.play(FadeIn(leg), e.arreter(), run_time=0.4)
        th0 = e.th.get_value()
        trace = VMobject(stroke_color=VERT_OK, stroke_width=9, fill_opacity=0).set_z_index(2)
        trace.add_updater(lambda m: m.set_points(Arc(radius=R_C, start_angle=PI / 2, angle=np.deg2rad(max(0.2, e.th.get_value() - th0)), arc_center=C_C).get_points()))
        self.add(trace)
        self.au_mot("un tour")
        self.play(e.th.animate.set_value(th0 + 360), run_time=1.1)
        trace.clear_updaters()
        self.au_mot("360")
        n360 = self.t("360°", 30, VERT_OK).move_to(P(1.48, C_E[1]))
        self.play(FadeIn(n360, scale=1.1), run_time=0.25)
        self.insister(n360, 1.08, 0.18)
        self.attendre_voix(marge=0.2)
        e.clear_updaters(), c.rayons.clear_updaters()
        self.vider(garder)

        # ── 02 : la question-pause (3 s) ──
        cq = P(1.3, -0.55)
        hq = Helice(cq, L=0.72)
        mq = mat(cq, cq[1] - 1.0, 0.55)
        cerq = Cercle(hq, cq + DOWN * 0, 0.72)
        arc2 = Arc(radius=0.36, start_angle=PI / 2, angle=TAU / 3, arc_center=cq, stroke_color=ARC, stroke_width=6).set_z_index(1)

        def avant(sc):
            sc._avec = [FadeIn(mq), FadeIn(hq), FadeIn(arc2)]

        def apres(sc):
            sc.au_mot("On partage")
            sc.play(FadeIn(sc.ph_q[0], shift=UP * 0.1), FadeIn(cerq.tour), FadeIn(cerq.rayons), run_time=0.3)
            sc.au_mot("en 3")
            hq.clear_updaters()
            sc.play(FadeIn(sc.ph_q[1], scale=1.1), *[FadeIn(cerq.sect(i, op=0.5)) for i in range(3)], FadeOut(arc2), run_time=0.3)
            lg = sc.ligne_rep(2, ["360", "÷", "3", "=", "120°"], fs=30)
            lg[1].sans_synchro = True
            sc.poser(lg, ["360", "divisé", "par 3", "égale", "120 degrés"])
            sc.insister(lg[4], 1.25, 0.18)
            sc.rep_fini()

        self.question_pause("02-question", "02b-reponse", ["Quel angle entre", "deux pales voisines ?"],
                            [self.t("90°", 26), self.t("120°", 26), self.t("180°", 26)], 1,
                            ["On partage le tour", "en 3.", "360 ÷ 3 = 120°"], mot_q="Quel angle", avant_q=avant, autres_r=apres)
        cerq.rayons.clear_updaters()
        self.vider(garder)

        # ── 03 : on vérifie ──
        self.dire("03-verif")
        e = Helice()
        c = Cercle(e)
        e.clear_updaters(), c.rayons.clear_updaters()
        self.add(mat(), e, c)
        self.au_mot("On vérifie")
        leg = self.legende("On vérifie :", WHITE, 32)
        self.play(FadeIn(leg), run_time=0.25)
        lg = self.ligne([("120", TONS[0]), ("+", WHITE), ("120", TONS[1]), ("+", WHITE), ("120", TONS[2]), ("=", WHITE), ("360", VERT_OK)], 28, buff=0.09)
        self.borne(lg, 0.62).move_to(P(0, -0.15))
        for x in lg:
            x.sans_synchro = True
        self.au_mot("120 plus")
        self.remove(leg)
        rempl = {k: [FadeIn(c.sect(i)), FadeIn(c.lab(i, "120°"))] for i, k in enumerate((0, 2, 4))}
        tour = c.tour
        rempl[6] = [tour.animate.set_stroke(VERT_OK, width=8)]
        self.poser(lg, ["120 plus", None, ("120", 2), None, ("120", 3), "égale", "360"], rempl)
        self.insister(lg[6], 1.2, 0.18)
        self.au_mot("Le compte")
        vt = Text("Le compte est bon !", font_size=24, color=VERT_OK, weight=BOLD)
        v = VGroup(SurroundingRectangle(vt, color=VERT_OK, buff=0.09, corner_radius=0.1, stroke_width=4), vt).move_to(P(0, -0.74))
        self.play(FadeIn(v, scale=1.1), run_time=0.3)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 04 : la question en commentaire ──
        self.dire("04-commentaire")
        hublot = Circle(radius=0.98, fill_color="#0c4a6e", fill_opacity=1, stroke_color="#7dd3fc", stroke_width=4).move_to(C_E)
        h5 = Helice(C_E, n=5, L=0.84, w=0.32, couleur="#fde68a")
        h5.vitesse = 120
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 38, JAUNE_TITRE).move_to(P(0, Y_LEG))
        self.play(FadeIn(et, scale=1.1), run_time=0.3)
        self.au_mot("Une hélice")
        l1 = self.borne(self.t("Une hélice de bateau", 26), 0.42).move_to(P(0, -0.74))
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(hublot), FadeIn(h5), run_time=0.3)
        self.au_mot("5 pales")
        l2 = self.borne(self.t("a 5 pales, bien réparties.", 26), 0.42).move_to(P(0, -1.14))
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Quel angle")
        l3 = self.borne(self.t("Quel angle entre", 30, ORANGE_RETENUE), 0.42).move_to(P(0, -1.56))
        self.play(FadeIn(l3, shift=UP * 0.1), h5.arreter(), run_time=0.4)
        self.au_mot("deux pales")
        l4 = self.borne(self.t("deux pales voisines ?", 30, ORANGE_RETENUE), 0.42).move_to(P(0, -1.96))
        a5 = Arc(radius=0.48, start_angle=PI / 2, angle=TAU / 5, arc_center=C_E, stroke_color=ARC, stroke_width=7).set_z_index(1)
        i5 = Text("?", font_size=46, color=ORANGE_RETENUE, weight=BOLD).move_to(P(1.62, C_E[1]))
        i5._pas_audit = True
        self.play(FadeIn(l4, shift=UP * 0.1), Create(a5), FadeIn(i5, scale=1.3), run_time=0.35)
        self.appel_commentaire(y=-2.45)
