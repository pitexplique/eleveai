# angle_tracer_short.py
# EleveAI — Maths 6e — short jumeau de l'épisode 05 « Tracer un angle »
# (micro angle_tracer). CEINTURE BLANCHE : un seul angle, 60°, fabrique un flocon.
# Il AMUSE : « Avec un seul angle, on dessine un flocon de neige ! »
#   · EN HAUT, le flocon pousse branche par branche ;
#   · EN BAS, au même instant, la ligne droite, le rapporteur, les repères à 60 puis 120 ;
#     chaque trait tracé en bas est la branche qui pousse en haut, à la MÊME direction ;
#   · 1 question-pause (3 s) : quel repère pour la branche suivante ? ;
#   · fin : la roue à 12 rayons, sans donner la réponse, réponse en commentaire.
# Centre d'intérêt : meteo-climat.
# Voix : manim/voix/6e-angle-tracer-short.json (validée, débit −6) ; WAV :
# public/sons/6e-angle-tracer-short/ ; marques : angle_tracer_short_marques.json.
# Ajouté ICI : Flocon, Roue, repere(), rapporteur_bas() (le rapporteur vient du module).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/6e/angle_tracer_short.py AngleTracerShort
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/angle_tracer_short.py AngleTracerShort -o eleveai-maths-6e-angle-tracer-short --media_dir manim/scripts/6e/media-angle-05-short
# Sortie : manim/sorties/6e/maths/angles/05-tracer/eleveai-maths-6e-angle-tracer-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403
from canvas_angles import *  # noqa: E402,F403

GLACE = "#e0f2fe"
C_F, R_F = P(0, 1.13), 1.05          # le flocon, en haut
C_R, R_R = P(0, -2.6), 1.95          # le rapporteur, en bas
C_2, R_2 = P(0, -1.66), 1.22         # le bas, quand le rapporteur passe de l'autre côté
Y_LEG = -0.24                        # la seule ligne de légende, entre les deux


class Flocon(VGroup):
    """Le flocon : un moyeu, 6 branches possibles aux directions 0, 60… 300 (vraies), et
    leurs petits traits à ±60° de la branche. Rien n'est montré d'avance : le script
    joue f.branche(d) et f.petits(d) quand il veut. f.tout() : le flocon entier."""

    def __init__(self, c=C_F, r=R_F, sw=7, couleur=COTE, **kw):
        super().__init__(**kw)
        self.c, self.r, self.sw, self.couleur = np.array(c, dtype=float), r, sw, couleur
        self.branches, self.traits = {}, {}
        self.moyeu = Dot(self.c, radius=0.09 * max(r, 0.8), color=SOMMET).set_z_index(3)
        for d in range(0, 360, 60):
            self.branches[d] = Line(self.c, polaire(d, r, self.c), color=couleur, stroke_width=sw)
            t = VGroup()
            for k, lg in ((0.42, 0.26), (0.72, 0.2)):
                p = polaire(d, r * k, self.c)
                for s in (-60, 60):
                    t.add(Line(p, polaire(d + s, r * lg, p), color=couleur, stroke_width=sw * 0.72))
            self.traits[d] = t

    def tout(self):
        return VGroup(*self.branches.values(), *self.traits.values(), self.moyeu)


class Roue(VGroup):
    """La roue à 12 rayons réguliers (tous les 30°, vrais), le pneu et le moyeu."""

    def __init__(self, c=C_F, r=R_F, **kw):
        super().__init__(**kw)
        self.c, self.r = np.array(c, dtype=float), r
        self.pneu = Circle(radius=r, stroke_color="#94a3b8", stroke_width=11).move_to(self.c)
        self.rayons = VGroup(*[Line(self.c, polaire(30 * i, r, self.c), color=COTE, stroke_width=4) for i in range(12)])
        self.moyeu = Dot(self.c, radius=0.09, color=SOMMET).set_z_index(3)
        self.add(self.rayons, self.pneu, self.moyeu)


def repere(r, v, couleur=AMBRE, rg="int"):
    p = polaire(r.direction(v, rg), r.rayon * 1.05, r.c)
    return Dot(p, radius=0.075, color=couleur, stroke_color=BLACK, stroke_width=2).set_z_index(4)


def halo(t, w=5):
    t.set_stroke(BLACK, w, background=True)
    for m in t.family_members_with_points():
        m.joint_type = LineJointType.ROUND
    return t


def rapporteur_bas(c=C_R, rayon=R_R):
    """Le vrai rapporteur : on lit la rangée intérieure, l'extérieure reste pâle ; à ce rayon
    les nombres se touchent : seuls ceux de 30 en 30 restent, gros et détourés."""
    r = Rapporteur(c, rayon)
    r.rangees["ext"].set_opacity(0.28)
    for v in range(0, 181, 10):
        t = r.nombres["int"][v]
        if v % 30 == 0:
            halo(t.scale(1.3)).set_z_index(2)
        else:
            t.set_opacity(0)
    r.nombres["int"][0].shift(P(-0.2, 0.08))  # au-dessus de la base, où passe la ligne
    r.nombres["int"][180].shift(P(0.2, 0.08))
    return r


def arc_de(s, d1, d2, r=0.4, couleur=ARC, sw=6, fond=0.2):
    a = np.deg2rad(d2 - d1)
    sec = AnnularSector(inner_radius=0, outer_radius=r, start_angle=np.deg2rad(d1), angle=a, arc_center=s, fill_color=couleur, fill_opacity=fond, stroke_width=0)
    arc = Arc(radius=r, start_angle=np.deg2rad(d1), angle=a, arc_center=s, stroke_color=couleur, stroke_width=sw)
    return VGroup(sec, arc).set_z_index(-1)


class AngleTracerShort(ShortProp):
    nom_voix = "6e-angle-tracer-short"
    fichier_marques = "angle_tracer_short_marques.json"
    ceinture = "blanche"

    def _disposer_q(self, question, choix, phrase):
        """Trois cartes étroites à gauche : le flocon reste à côté d'elles."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        neuves = VGroup(*[self._carte_choix(l, c, 2.5, 28) for l, c in zip("ABC", choix)])
        neuves.arrange(DOWN, buff=0.1).next_to(q, DOWN, buff=0.22).set_x(-0.72)
        self.cartes_q = neuves
        pause.next_to(neuves, DOWN, buff=0.15).set_x(0)
        ph.next_to(neuves, DOWN, buff=0.15).set_x(0)
        return tete, q, neuves, pause, rebours, ph

    def legende(self, s, couleur=WHITE, fs=28):
        return self.cale(self.ligne([(s, couleur)], fs)).move_to(P(0, Y_LEG))

    def cale(self, m):
        """Jamais plus large que le cadre moins ses marges de 3 %."""
        return m.scale_to_fit_width(4.0) if m.width > 4.0 else m

    def changer(self, leg, s, couleur=WHITE, fs=28, **k):
        """La légende change, sans croisement (leçon 7 de l'épisode 02)."""
        if leg is not None:
            self.play(FadeOut(leg), run_time=0.08)
        neuf = self.legende(s, couleur, fs)
        self.play(FadeIn(neuf, shift=UP * 0.08), *k.get("avec", []), run_time=0.2)
        return neuf

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Un angle, un flocon", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.au_mot("Avec")
        self.play(Write(titre), run_time=0.35)
        self.au_mot("un seul")
        s60 = C_R + P(-0.9, 0)
        a = Angle(s60, 0, 60, longueur=2.0, rayon_arc=0.6, sw=8)
        a.arc.set_z_index(-1), a.fond.set_z_index(-1)
        leg = self.legende("un seul angle")
        self.play(FadeIn(leg), FadeIn(a), run_time=0.3)
        self.play(a.arc.animate.set_stroke(width=14), run_time=0.18)
        self.play(a.arc.animate.set_stroke(width=8), run_time=0.18)
        self.au_mot("flocon")
        f = Flocon()
        fl = f.tout()
        self.play(FadeOut(leg), run_time=0.08)
        leg = self.legende("un flocon de neige !", GLACE, 30)
        fl.shift(UP * 0.5).rotate(-0.7, about_point=f.c + UP * 0.5)
        self.play(FadeIn(leg, scale=1.15), fl.animate.rotate(0.7, about_point=f.c + UP * 0.5).shift(DOWN * 0.5), run_time=0.7)
        self.attendre_voix(marge=0.2)
        a.figer()
        self.vider(garder)

        # ── 01 : 6 branches ; la ligne droite en fait déjà 2 ──
        self.dire("01-branche")
        f = Flocon()
        fl = f.tout()
        self.au_mot("Un flocon")
        leg = self.legende("Un flocon en étoile")
        self.play(FadeIn(leg), FadeIn(fl, scale=0.8), run_time=0.3)
        self.au_mot("6")
        leg = self.changer(leg, "a 6 branches", GLACE, 32)
        self.play(LaggedStart(*[Indicate(f.branches[d], color=WHITE, scale_factor=1.0) for d in (0, 60, 120, 180, 240, 300)], lag_ratio=0.3), run_time=0.95)
        self.au_mot("Trace")
        self.play(FadeOut(fl), FadeOut(leg), run_time=0.12)
        f = Flocon()
        leg = self.legende("Trace")
        self.play(FadeIn(leg), run_time=0.15)
        self.au_mot("ligne droite")
        self.play(FadeOut(leg), run_time=0.06)
        leg = self.legende("une ligne droite.", COTE, 30)
        o = Dot(C_R, radius=0.09, color=SOMMET).set_z_index(3)
        ld, lg_ = Line(C_R, C_R + RIGHT * 2.08, color=COTE, stroke_width=7), Line(C_R, C_R + LEFT * 2.08, color=COTE, stroke_width=7)
        self.add(f.moyeu, o)
        self.play(FadeIn(leg), Create(ld), Create(lg_), Create(f.branches[0]), Create(f.branches[180]), run_time=0.75)
        self.au_mot("C'est")
        self.play(FadeOut(leg), run_time=0.08)
        leg = self.legende("C'est déjà 2 branches.", VERT_OK, 30)
        self.play(FadeIn(leg, scale=1.15), run_time=0.25)
        self.play(*[f.branches[d].animate.set_stroke(VERT_OK, width=11) for d in (0, 180)], run_time=0.2)
        self.play(*[f.branches[d].animate.set_stroke(COTE, width=7) for d in (0, 180)], run_time=0.2)
        self.attendre_voix(marge=0.1)

        # ── 02 : le rapporteur, le repère à 60, la 3e branche ──
        self.dire("02-soixante")
        r = rapporteur_bas()
        r._placer(C_R + P(0.03, 0.25), -9)
        self.au_mot("Pose")
        self.play(FadeOut(leg), run_time=0.08)
        leg = self.legende("Pose le rapporteur").shift(UP * 0.22)
        self.play(FadeIn(leg), FadeIn(r, shift=DOWN * 0.1), run_time=0.3)
        self.au_mot("au milieu")
        self.play(FadeOut(leg), run_time=0.08)
        leg = self.legende("au milieu.", SOMMET, 30)
        self.play(FadeIn(leg), r.poser(C_R, 0), run_time=0.5)
        self.play(Flash(C_R, color=SOMMET, line_length=0.2, flash_radius=0.28), Flash(f.c, color=SOMMET, line_length=0.14, flash_radius=0.2), run_time=0.3)
        self.au_mot("Fais")
        self.play(FadeOut(leg), run_time=0.08)
        rp = repere(r, 60)
        leg = self.legende("Fais un repère")
        self.play(FadeIn(leg), run_time=0.2)
        self.au_mot("60")
        self.play(FadeOut(leg), run_time=0.06)
        leg = self.legende("à 60°", VERT_OK, 36)
        self.play(FadeIn(leg), r.nombres["int"][60].animate.set_color(VERT_OK).scale(1.5), r.allumer_graduation(60), FadeIn(rp, scale=2.5), run_time=0.3)
        self.play(rp.animate.scale(1.8), run_time=0.2)
        self.play(rp.animate.scale(1 / 1.8), run_time=0.2)
        self.au_mot("Trace.")
        self.play(FadeOut(leg), run_time=0.08)
        leg = self.legende("Trace.", AMBRE, 34)
        b60 = Line(C_R, polaire(60, R_R * 1.1, C_R), color=AMBRE, stroke_width=7).set_z_index(1)
        ar_b, ar_h = arc_de(C_R, 0, 60, 0.5), arc_de(f.c, 0, 60, 0.32)
        f.branches[60].set_color(AMBRE)
        self.play(FadeIn(leg), Create(b60), Create(f.branches[60]), run_time=0.7)
        self.play(FadeIn(ar_b), FadeIn(ar_h), run_time=0.25)
        self.au_mot("Une nouvelle")
        self.play(FadeOut(leg), run_time=0.08)
        leg = self.legende("Une nouvelle branche !", VERT_OK, 26)
        self.play(FadeIn(leg, scale=1.15), b60.animate.set_color(COTE), f.branches[60].animate.set_color(COTE), run_time=0.3)
        self.insister(leg, 1.05)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 03 : la question-pause (3 s) ──
        cq = P(1.36, -0.77)
        fq = Flocon(cq, 0.7, sw=6)
        fig = VGroup(fq.branches[0], fq.branches[180], fq.branches[60], fq.moyeu)
        aq = arc_de(cq, 0, 60, 0.3)
        neuf = Line(cq, polaire(120, 0.7, cq), color=VERT_OK, stroke_width=7)
        aq2 = arc_de(cq, 60, 120, 0.3, couleur=VERT_OK, fond=0.35)

        def avant(sc):
            sc.play(FadeIn(fig, scale=0.8), FadeIn(aq), run_time=0.3)

        def apres(sc):
            lg = sc.ligne_rep(0, ["60° de plus :", "120°"], fs=28)
            lg[0].sans_synchro = True  # posée au mot « 60 », sans attendre « plus »
            base = lambda l: float(np.median([m.get_bottom()[1] for m in l.submobjects]))  # noqa: E731
            lg[1].shift(UP * (base(lg[0]) - base(lg[1])))
            sc.au_mot("60")
            sc.play(FadeIn(lg[0], shift=UP * 0.1), FadeIn(aq2), run_time=0.3)
            sc.au_mot("120")
            sc.play(FadeIn(lg[1], scale=1.4), Create(neuf), run_time=0.3)
            sc.insister(lg[1], 1.2, 0.18)
            sc.rep_fini()

        self.question_pause("03-question", "03b-reponse", ["Quel repère pour", "la branche suivante ?"],
                            [self.t("70°", 28), self.t("90°", 28), self.t("120°", 28)], 2,
                            ["60° de plus : 120°"], mot_q="Quel", avant_q=avant, autres_r=apres)
        self.vider(garder)

        # ── 04 : de l'autre côté, les petits traits : le flocon ──
        self.dire("04-flocon")
        f = Flocon()
        fb = Flocon(C_2, R_2, sw=6)  # le même, en bas : les mêmes directions
        for d in (0, 60, 120, 180):
            self.add(f.branches[d], fb.branches[d])
        self.add(f.moyeu, fb.moyeu)
        r2 = Rapporteur(C_2, R_2)
        r2._placer(C_2, 180)
        for rg in ("int", "ext"):
            r2.rangees[rg].set_opacity(0)
        n60 = halo(Text("60", font_size=20, color=VERT_OK, weight=BOLD)).move_to(polaire(240, R_2 * 0.68, C_2)).set_z_index(2)
        n120 = halo(Text("120", font_size=20, color=VERT_OK, weight=BOLD)).move_to(polaire(300, R_2 * 0.68, C_2)).set_z_index(2)
        for n in (n60, n120):
            n.sans_synchro = n._pas_audit = True
        self.au_mot("Fais")
        leg = self.legende("Fais pareil")
        self.play(FadeIn(leg), FadeIn(r2, shift=DOWN * 0.15), run_time=0.25)
        self.au_mot("l'autre")
        self.play(FadeOut(leg), run_time=0.08)
        leg = self.legende("de l'autre côté.", AMBRE, 30)
        self.play(FadeIn(leg), FadeIn(n60, scale=1.4), FadeIn(n120, scale=1.4), run_time=0.22)
        self.play(Create(f.branches[240]), Create(fb.branches[240]), run_time=0.35)
        self.play(Create(f.branches[300]), Create(fb.branches[300]), run_time=0.35)
        self.au_mot("Encore")
        self.play(FadeOut(leg), FadeOut(r2), FadeOut(n60), FadeOut(n120), run_time=0.1)
        leg = self.legende("Encore de petits traits,")
        self.play(FadeIn(leg), LaggedStart(*[Create(f.traits[d]) for d in f.traits], lag_ratio=0.3),
                  LaggedStart(*[Create(fb.traits[d]) for d in fb.traits], lag_ratio=0.3), run_time=0.8)
        self.au_mot("voici")
        self.play(FadeOut(leg), run_time=0.08)
        leg = self.legende("et voici ton flocon !", GLACE, 32)
        tout_h, tout_b = f.tout(), fb.tout()
        self.play(FadeIn(leg, scale=1.15), tout_h.animate.set_stroke(GLACE), tout_b.animate.set_stroke(GLACE), run_time=0.3)
        self.play(Rotate(tout_h, angle=PI / 3, about_point=f.c), Rotate(tout_b, angle=PI / 3, about_point=fb.c), run_time=0.9)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 05 : la question en commentaire : la roue à 12 rayons ──
        self.dire("05-commentaire")
        ro = Roue(C_F + DOWN * 0.06, 0.98)
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 40, JAUNE_TITRE).move_to(P(0, Y_LEG))
        self.play(FadeIn(et, scale=1.3), run_time=0.3)
        self.au_mot("Une roue")
        self.play(Create(ro.pneu), FadeIn(ro.moyeu), run_time=0.3)
        self.au_mot("12")
        l1 = self.cale(self.t("Une roue a 12 rayons,", 28)).move_to(P(0, -0.82))
        self.play(FadeIn(l1, shift=UP * 0.1), LaggedStart(*[Create(x) for x in ro.rayons], lag_ratio=0.25), run_time=0.75)
        self.au_mot("bien")
        l2 = self.t("bien réguliers.", 28, COTE).move_to(P(0, -1.28))
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.25)
        self.au_mot("Quel angle")
        self.play(FadeOut(VGroup(et, l1, l2)), run_time=0.1)
        q1 = self.cale(self.t("Quel angle entre deux", 30)).move_to(P(0, -0.65))
        self.play(FadeIn(q1, shift=UP * 0.1), run_time=0.25)
        self.au_mot("rayons voisins")
        q2 = self.t("rayons voisins ?", 34, ORANGE_RETENUE).move_to(P(0, -1.2))
        ar = arc_de(ro.c, 0, 30, 0.72, sw=7, fond=0.35)
        ro.rayons[0].set_stroke(AMBRE, width=7), ro.rayons[1].set_stroke(AMBRE, width=7)
        pi_ = self.t("?", 52, ORANGE_RETENUE).move_to(P(1.72, ro.c[1] + 0.3))
        pi_._pas_audit = True
        self.play(FadeIn(q2, scale=1.2), FadeIn(ar), FadeIn(pi_, scale=1.6), run_time=0.35)
        self.appel_commentaire(y=-2.05)
