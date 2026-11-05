# angle_reconnaitre.py
# EleveAI — Maths 6e — série « Angles », épisode 01 : RECONNAÎTRE UN ANGLE
# (micro angle_reconnaitre, notion angle_mesure), AVEC VOIX. Paysage 16:9,
# CEINTURE VERTE. Short jumeau : angle_reconnaitre_short.py (blanche, l'alphabet).
# Décor et métier : Lina, ANIMATRICE de dessins animés (centres d'intérêt :
# cinema-series, art-design) : le bras d'un personnage se plie image par image.
# Micro → écrans : situation (01), le coude (02), définition (03), le nom (04),
# QUESTION 1 (05), le piège (06), la famille aigu/droit/obtus/plat (07),
# QUESTION 2 (08), défi (09) et correction (09b), appris (10), fin (11).
# Voix : manim/voix/6e-angle-reconnaitre.json (validée, débit −6) ; WAV :
# public/sons/6e-angle-reconnaitre/ ; marques : angle_reconnaitre_marques.json.
# Outils : prop_commun.py + manim/canvas_angles.py. Ajouté ICI : PersoBras (le
# personnage au bras articulé), lina(), ecran_dessin().
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/angle_reconnaitre.py AngleReconnaitre6e
# python -m manim render -qh --disable_caching manim/scripts/6e/angle_reconnaitre.py AngleReconnaitre6e -o eleveai-maths-6e-angle-reconnaitre --media_dir manim/scripts/6e/media-angle-01
# Sortie : manim/sorties/6e/maths/angles/01-reconnaitre/eleveai-maths-6e-angle-reconnaitre.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403
from canvas_angles import *  # noqa: E402,F403

PEAU = "#f1c27d"
TENUE = "#a855f7"
MANCHE = "#7e22ce"


class PersoBras(VGroup):
    """Le personnage de dessin animé : le bras part de l'épaule vers la droite,
    l'avant-bras tourne autour du coude. p.t = l'ouverture du coude en degrés
    (180 = bras tendu) ; p.plier(90) = animation ; p.coude = le point du coude."""

    def __init__(self, ouverture=150, s=1.0, centre=ORIGIN, sw=16, **kw):
        super().__init__(**kw)
        self.s_ = s
        self.la = 0.95 * s
        corps = personne(peau=PEAU, tenue=TENUE, cheveux="#7c2d12", s=s).move_to(centre)
        c, r = corps.tete.get_center(), corps.tete.width / 2
        visage(corps)
        haut = corps.corps.get_top()
        e = haut + RIGHT * 0.42 * s + DOWN * 0.18 * s
        autre = Line(haut + LEFT * 0.42 * s + DOWN * 0.18 * s, haut + P(-0.75, -1.0) * s, color=MANCHE,
                     stroke_width=sw * s)
        self.t = ValueTracker(ouverture)
        self.bras = Line(e, e + RIGHT * 1.0 * s, color=MANCHE, stroke_width=sw * s)
        self.avant = Line(self.bras.get_end(), self.bras.get_end() + UP, color=PEAU, stroke_width=sw * s)
        r_c = sw * s * 0.0066
        self.rotule = Dot(self.bras.get_end(), radius=r_c, color=PEAU)
        self.main = Dot(ORIGIN, radius=r_c * 1.45, color=PEAU)
        self.add(autre, corps, self.bras, self.avant, self.rotule, self.main)
        self._maj()
        self.avant.add_updater(lambda m: self._maj())

    @property
    def coude(self):
        return self.bras.get_end()

    def _maj(self):
        c = self.coude
        fin = polaire(180 - self.t.get_value(), self.la, c)
        self.avant.put_start_and_end_on(c, fin)
        self.main.move_to(fin)
        self.rotule.move_to(c)

    def plier(self, ouverture):
        return self.t.animate.set_value(ouverture)

    def effacer_bras(self, op=0):
        """Animation : le bras et l'avant-bras s'effacent (restent les traits bleus)."""
        return AnimationGroup(*[m.animate.set_opacity(op) for m in (self.bras, self.avant, self.rotule, self.main)])


def perso_fige(ouverture, s, centre, sw=16):
    p = PersoBras(ouverture, s, centre, sw)
    p.clear_updaters(recursive=True)
    return p


def lina(s=1.0):
    """Lina, animatrice : tablette à dessin et stylet."""
    p = visage(personne(peau="#8d5524", tenue="#0d9488", cheveux="#111827", longs=True, s=s))
    tab =RoundedRectangle(width=0.85 * s, height=0.6 * s, corner_radius=0.05 * s, fill_color="#0f172a",
                           fill_opacity=1, stroke_color=WHITE, stroke_width=3).move_to(p.corps.get_center() + P(0.2, 0.05) * s)
    trait = Line(tab.get_center() + P(-0.25, -0.1) * s, tab.get_center() + P(0.15, 0.12) * s, color=AMBRE, stroke_width=4)
    stylet = Line(tab.get_center() + P(0.15, 0.12) * s, tab.get_center() + P(0.5, 0.55) * s, color=WHITE, stroke_width=5)
    p.add(tab, trait, stylet)
    return p


def ecran_dessin(l, h, centre):
    """L'écran de l'animatrice : un cadre sombre."""
    return RoundedRectangle(width=l, height=h, corner_radius=0.12, fill_color="#0f172a", fill_opacity=1,
                            stroke_color="#94a3b8", stroke_width=4).move_to(centre)


class AngleReconnaitreBase(PaysageProp):
    nom_voix = "6e-angle-reconnaitre"
    fichier_marques = "angle_reconnaitre_marques.json"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Reconnaître un angle", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Reconnaître")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Où se cache un angle", "dans un bras qui bouge ?"], 40).move_to(P(-2.7, 0.45))
        p = PersoBras(170, 1.0, P(3.3, 0.35))
        self.au_mot("Où se cache")
        self.play(FadeIn(q[0], shift=UP * 0.2), FadeIn(p, shift=UP * 0.2), run_time=0.4)
        self.au_mot("dans un bras")
        self.play(FadeIn(q[1], shift=UP * 0.2), run_time=0.3)
        self.au_mot("qui bouge")
        self.play(p.plier(70), run_time=0.6)
        self.play(p.plier(140), run_time=0.5)
        self.play(p.plier(90), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 01 : Lina, animatrice ───────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        li = lina(1.15).move_to(P(-4.75, 0.15))
        self.au_mot("Voici Lina")
        nom = self.t("Lina", 44, BLEU_CALCUL).next_to(li, UP, buff=0.2)
        self.play(FadeIn(li, shift=UP * 0.3), FadeIn(nom), run_time=0.5)
        self.au_mot("animatrice")
        met = VGroup(self.t("animatrice de", 28, BLEU_CALCUL), self.t("dessins animés", 28, BLEU_CALCUL)).arrange(DOWN, buff=0.08)
        met.next_to(li, DOWN, buff=0.15)
        self.play(FadeIn(met[0], shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("dessins animés")
        ec = ecran_dessin(6.6, 3.9, P(1.0, 1.15))
        p = PersoBras(170, 0.92, P(-0.9, 1.0))
        self.play(FadeIn(met[1], shift=DOWN * 0.1), FadeIn(ec), FadeIn(p, scale=0.7), run_time=0.5)
        self.au_mot("bonjour")
        bulle_t = self.t("Bonjour !", 36, "#0f172a")
        bulle = VGroup(RoundedRectangle(width=bulle_t.width + 0.5, height=0.8, corner_radius=0.25, fill_color=WHITE,
                                        fill_opacity=1, stroke_width=0), bulle_t)
        bulle_t.move_to(bulle[0])
        bulle.move_to(P(2.6, 2.3))
        self.play(FadeIn(bulle, scale=0.6), run_time=0.35)
        # image par image : le bras avance par petits sauts, chaque image s'aligne
        self.au_mot("image par image")
        lab = self.t("image par image", 32, AMBRE).move_to(P(-2.75, -1.65)).align_to(P(-2.2, 0), LEFT)
        lab.move_to(P(1.0, -1.2))
        self.play(FadeIn(lab, shift=UP * 0.15), run_time=0.3)
        poses = [150, 125, 100, 75]
        xs = [-1.6, 0.0, 1.6, 3.2]
        for th, x in zip(poses, xs):
            cadre = ecran_dessin(1.45, 1.25, P(x, -2.35))
            mini = perso_fige(th, 0.36, P(x - 0.3, -2.35), sw=14)
            self.play(p.plier(th), FadeIn(cadre, shift=UP * 0.1), FadeIn(mini, shift=UP * 0.1),
                      run_time=0.38, rate_func=lambda a: 1.0 if a > 0.15 else a / 0.15)
        self.au_mot("plie son bras")
        self.play(p.plier(60), run_time=0.7)
        self.attendre_voix()

    # ── 02 : le coude ───────────────────────────────────────────────────────
    def ecran_coude(self):
        self.ecran("02-coude")
        p = PersoBras(120, 1.65, P(-4.6, 0.0))
        self.add(p)
        self.play(FadeIn(p, shift=UP * 0.1), run_time=0.25)
        c = p.coude
        self.au_mot("le coude")
        rond = Circle(radius=0.62, stroke_color=AMBRE, stroke_width=6).move_to(c)
        nom = self.t("le coude", 40, AMBRE).move_to(P(4.3, 2.3))
        self.play(Create(rond), FadeIn(nom), run_time=0.5)
        self.play(rond.animate.scale(1.35), run_time=0.25)
        self.play(rond.animate.scale(1 / 1.35), run_time=0.25)
        a = Angle(c, 180, 60, longueur=1.65, arc=True, rayon_arc=0.72, sw=9)
        a.t2.add_updater(lambda m: m.set_value(180 - p.t.get_value()))
        self.add(a.t2)
        a.maj()
        self.au_mot("Deux traits")
        dt = self.t("Deux traits", 44).move_to(P(4.3, 1.35))
        self.play(FadeOut(rond), FadeIn(dt, shift=UP * 0.15), p.effacer_bras(), Create(a.cote1[0]), Create(a.cote2[0]),
                  FadeIn(a.point, scale=2), run_time=0.5)
        self.au_mot("le bras")
        lb = self.t("le bras", 32, COTE).next_to(Line(p.bras.get_start(), c), DOWN, buff=0.28).shift(RIGHT * 0.35)
        self.play(Indicate(a.cote1, color=WHITE), FadeIn(lb, shift=UP * 0.1), run_time=0.4)
        self.au_mot("l'avant-bras")
        la = self.t("l'avant-bras", 32, COTE)
        la.add_updater(lambda m: m.next_to(p.main, RIGHT, buff=0.22))
        la.next_to(p.main, RIGHT, buff=0.22)
        self.play(Indicate(a.cote2, color=WHITE), FadeIn(la, shift=UP * 0.1), run_time=0.4)
        self.au_mot("écarte")
        self.play(p.plier(50), run_time=0.6)
        self.au_mot("plus ou moins")
        self.play(p.plier(150), run_time=0.8)
        self.au_mot("Cette ouverture")
        a.maj()
        self.play(p.plier(95), FadeIn(a.fond), Create(a.arc), run_time=0.7)
        self.au_mot("c'est un angle")
        v = self.tampon("C'est un angle.", ARC, 36).move_to(P(4.3, -0.1))
        self.play(FadeIn(v, scale=1.3), run_time=0.35)
        self.insister(v, 1.08, 0.2)
        a.t2.clear_updaters()
        la.clear_updaters()
        self.attendre_voix()

    # ── 03 : la définition ──────────────────────────────────────────────────
    def ecran_definition(self):
        self.ecran("03-definition")
        s = P(-5.2, -2.0)
        a = Angle(s, 0, 55, longueur=5.6, fleches=True, rayon_arc=1.0, sw=8)
        a.t_long.set_value(0)
        a.maj()
        lg = self.bloc(["Un angle, c'est", "deux demi-droites", "qui partent", "du même point."], 44)
        self.col(lg, 1.5, xl=1.25)
        self.au_mot("un angle")
        self.play(FadeIn(lg[0], shift=UP * 0.15), run_time=0.3)
        self.au_mot("deux demi-droites")
        self.add(a.cote1, a.cote2)
        self.play(FadeIn(lg[1], shift=UP * 0.15), FadeIn(a.point, scale=2.5), run_time=0.3)
        self.play(a.construire(), run_time=0.7)
        self.au_mot("partent du")
        self.play(FadeIn(lg[2], shift=UP * 0.15), run_time=0.3)
        self.au_mot("même point")
        self.play(FadeIn(lg[3], shift=UP * 0.15), Flash(a.point, color=SOMMET, line_length=0.3), a.point.animate.scale(1.7), run_time=0.45)
        self.play(a.point.animate.scale(1 / 1.7), run_time=0.25)
        self.au_mot("sommet")
        nom_s = self.t("sommet", 40, SOMMET).next_to(s, DOWN, buff=0.22).shift(RIGHT * 0.25)
        self.play(FadeIn(nom_s, scale=1.3), run_time=0.3)
        self.insister(nom_s, 1.2, 0.2)
        self.au_mot("côtés")
        c1 = self.t("côté", 36, COTE).next_to(a.cote1[0].get_center(), DOWN, buff=0.24).shift(RIGHT * 0.5)
        m2 = a.cote2[0].get_center()
        c2 = self.t("côté", 36, COTE).move_to(m2 + polaire(145, 0.8))
        self.play(FadeIn(c1, scale=1.3), FadeIn(c2, scale=1.3), Indicate(a.cote1, color=WHITE),
                  Indicate(a.cote2, color=WHITE), run_time=0.55)
        self.au_mot("de l'angle")
        a.maj()
        self.play(FadeIn(a.fond), Create(a.arc), run_time=0.5)
        self.attendre_voix()

    # ── 04 : le nom ─────────────────────────────────────────────────────────
    def ecran_nom(self):
        self.ecran("04-nom")
        s = P(-5.2, -1.9)
        a = Angle(s, 0, 50, longueur=5.2, noms=("A", "O", "B"), fleches=True, rayon_arc=0.95, sw=8, fs=46)
        self.add(a.fond, a.arc, a.cote1, a.cote2, a.point)
        tit = self.t("Pour nommer un angle :", 36).move_to(P(0, 2.9))
        self.col(tit, 2.9, xl=1.15)
        self.au_mot("Pour nommer")
        self.play(FadeIn(tit, shift=UP * 0.15), run_time=0.3)
        self.au_mot("trois lettres")
        tl = self.t("trois lettres", 40, AMBRE)
        self.col(tl, 2.25, xl=1.15)
        self.play(FadeIn(tl, scale=1.2), FadeIn(a.lettres, scale=1.6), run_time=0.4)
        self.au_mot("O A")
        oa = demi_droite("O", "A", 40).next_to(a.cote1[0].get_center(), DOWN, buff=0.3)
        m2 = a.cote2[0].get_center()
        ob = demi_droite("O", "B", 40).move_to(m2 + polaire(140, 0.95))
        self.play(FadeIn(oa, scale=1.3), Indicate(a.cote1, color=WHITE), run_time=0.3)
        self.au_mot("O B")
        self.play(FadeIn(ob, scale=1.3), Indicate(a.cote2, color=WHITE), run_time=0.3)
        self.au_mot("partent de O")
        self.play(Flash(a.point, color=SOMMET, line_length=0.28), run_time=0.45)
        self.au_mot("milieu")
        nom = nom_angle("A", "O", "B", 96).move_to(P(3.95, 0.75))
        pre = self.t("l'angle", 44).next_to(nom, LEFT, buff=0.3)
        self.play(FadeIn(nom.sommet, scale=1.5), run_time=0.3)
        self.insister(nom.sommet, 1.5, 0.2)
        self.au_mot("l'angle A")
        self.play(FadeIn(pre, shift=RIGHT * 0.1), run_time=0.2)
        self.au_mot("A O B")
        self.play(FadeIn(nom[0], shift=RIGHT * 0.2), FadeIn(nom[2], shift=LEFT * 0.2), run_time=0.45)
        self.au_mot("On peut dire")
        aus = self.t("On peut dire aussi", 36)
        self.col(aus, -0.5, xl=1.15)
        self.play(FadeIn(aus, shift=UP * 0.15), run_time=0.3)
        self.au_mot("B O A")
        n2 = nom_angle("B", "O", "A", 72).move_to(P(3.95, -1.3))
        self.play(FadeIn(n2, scale=1.25), run_time=0.35)
        self.play(n2.sommet.animate.scale(1.4), nom.sommet.animate.scale(1.25), run_time=0.2)
        self.play(n2.sommet.animate.scale(1 / 1.4), nom.sommet.animate.scale(1 / 1.25), run_time=0.2)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (le sommet de RST) ──────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        s = P(-5.0, -1.9)
        fig = Angle(s, 0, 60, longueur=4.2, noms=("R", "S", "T"), rayon_arc=0.85, sw=8, fs=46)
        lettres = nom_angle("R", "S", "T", 120, couleur=WHITE).move_to(P(-3.0, 0.3))
        lettres[1].set_color(WHITE)
        lettres.arrange(RIGHT, buff=0.4).move_to(P(-3.0, 0.3))

        def avant(sc):
            sc.play(FadeIn(lettres, scale=0.7), run_time=0.3)

        def apres(sc):
            sc.rep(0, avec=[lettres[1].animate.set_color(SOMMET).scale(1.5)])
            sc.rep(1, avec=[FadeOut(lettres[0]), FadeOut(lettres[2]), ReplacementTransform(lettres[1], fig.lettre_s),
                            FadeIn(fig.fond), FadeIn(fig.arc), FadeIn(fig.cote1), FadeIn(fig.cote2),
                            FadeIn(fig.point, scale=2), FadeIn(fig.lettre1), FadeIn(fig.lettre2)])
            sc.rep_fin()

        self.question_pause("05-question", "05b-reponse", ["L'angle RST :", "quel point est le sommet ?"],
                            [self.t("R", 34), self.t("S", 34), self.t("T", 34)], 1,
                            ["La lettre du milieu", "est le sommet : c'est S."], mot_q="R S T", avant_q=avant,
                            autres_r=apres)

    # ── 06 : le piège : deux traits disjoints ───────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention !", 50, ROUGE_ERREUR)
        self.col(tit, 2.8, xl=1.0)
        self.play(Write(tit), run_time=0.4)
        s = P(-5.2, -1.7)
        l1 = Line(s, s + RIGHT * 4.8, color=COTE, stroke_width=9)
        d2 = s + P(1.5, 1.0)
        l2 = Line(d2, d2 + polaire(60, 3.6), color=COTE, stroke_width=9)
        self.au_mot("Deux traits")
        lg = self.bloc(["Deux traits qui", "ne se touchent pas"], 38)
        self.col(lg, 1.55, xl=1.0)
        self.play(FadeIn(lg[0], shift=UP * 0.15), Create(l1), Create(l2), run_time=0.4)
        self.au_mot("touchent")
        ecart = DoubleArrow(s + UP * 0.08, d2 + DOWN * 0.08, color=ROUGE_ERREUR, buff=0.05, stroke_width=4,
                            tip_length=0.18)
        self.play(FadeIn(lg[1], shift=UP * 0.15), Create(ecart), run_time=0.35)
        self.au_mot("un angle")
        pas = self.tampon("Pas un angle !", ROUGE_ERREUR, 42)
        self.col(pas, 0.05, xl=1.0)
        x = croix(VGroup(l1, l2), sw=9)
        self.play(FadeIn(pas, scale=1.3), Create(x), run_time=0.4)
        self.au_mot("Il faut")
        self.play(FadeOut(x), FadeOut(ecart), FadeOut(pas), l2.animate.shift(s - d2), run_time=0.42)
        self.au_mot("point de départ")
        pt = Dot(s, radius=0.13, color=SOMMET)
        ok_t = VGroup(self.t("Un point de départ", 38, VERT_OK), self.t("commun", 38, VERT_OK)).arrange(DOWN, buff=0.16)
        ok = VGroup(SurroundingRectangle(ok_t, color=VERT_OK, buff=0.2, corner_radius=0.12, stroke_width=5), ok_t)
        self.col(ok, 0.05, xl=1.0)
        a = Angle(s, 0, 60, longueur=3.6, rayon_arc=0.95, sw=9)
        a.figer()
        self.play(FadeIn(ok, scale=1.2), FadeIn(pt, scale=2.5), FadeIn(a.fond), Create(a.arc), run_time=0.45)
        self.play(Flash(pt, color=SOMMET, line_length=0.3), run_time=0.45)
        self.attendre_voix()

    # ── 07 : la famille : aigu, droit, obtus, plat ──────────────────────────
    def ecran_famille(self):
        self.ecran("07-famille")
        p = PersoBras(170, 1.05, P(-5.35, 0.3))
        s = P(-1.0, -0.7)
        a = Angle(s, 180, 10, longueur=1.6, rayon_arc=0.62, sw=8)
        a.t2.add_updater(lambda m: m.set_value(180 - p.t.get_value()))
        self.add(p, a.t2, a)
        xl, xm = 1.15, 3.0
        rangs = {}

        def rang(nom, y, *morceaux):
            _, c = famille({"aigu": 40, "droit": 90, "obtus": 150, "plat": 180}[nom])
            n = self.t(nom, 42, c).move_to(P(0, y)).align_to(P(xl, 0), LEFT)
            mes = self.ligne([(m, c) for m in morceaux], 30, buff=0.12).move_to(P(0, y)).align_to(P(xm, 0), LEFT)
            rangs[nom] = (n, mes)
            return n, mes

        def poser(nom, y, mot_nom, *morceaux_mots):
            n, mes = rang(nom, y, *[m for m, _ in morceaux_mots])
            self.au_mot(mot_nom)
            self.play(FadeIn(n, scale=1.3), run_time=0.3)
            self.insister(n, 1.15, 0.12)
            for k, (_, mot) in enumerate(morceaux_mots):
                self.au_mot(*mot) if isinstance(mot, tuple) else self.au_mot(mot)
                self.play(FadeIn(mes[k], scale=1.2), run_time=0.25)
            return n, mes

        self.au_mot("plie le bras")
        self.play(p.plier(45), run_time=0.9)
        poser("aigu", 2.3, "aigu", ("moins de", "moins"), ("90°", "90"))
        self.au_mot("En forme de coin")
        self.play(p.plier(90), run_time=0.8)
        poser("droit", 0.95, "droit", ("90°", ("90", 2)))
        self.au_mot("Plus ouvert")
        self.play(p.plier(135), run_time=0.8)
        poser("obtus", -0.4, "obtus", ("entre", "entre"), ("90°", ("90", 3)), ("et", "et 180"), ("180°", "180"))
        self.au_mot("bras bien tendu")
        self.play(p.plier(180), run_time=0.9)
        poser("plat", -1.75, "plat", ("180°", ("180", 2)))
        a.t2.clear_updaters()
        self.attendre_voix()

    # ── 08 : QUESTION 2 (150° : obtus) ──────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        s = P(-2.9, -1.3)
        a = Angle(s, 0, 20, longueur=3.2, rayon_arc=0.8, sw=8)
        rep90 = DashedLine(s, polaire(90, 3.0, s), color=FAMILLE["droit"], stroke_width=4)
        rep180 = DashedLine(s, polaire(180, 3.1, s), color=FAMILLE["plat"], stroke_width=4)
        l90 = self.t("90°", 32, FAMILLE["droit"]).next_to(rep90.get_end(), UP, buff=0.1)
        l180 = self.t("180°", 32, FAMILLE["plat"]).next_to(rep180.get_end(), DOWN, buff=0.16)
        l90._pas_audit = l180._pas_audit = True

        def avant(sc):
            sc.play(FadeIn(a), run_time=0.2)
            sc.play(a.ouvrir(150), run_time=0.8)

        def apres(sc):
            sc.rep(0, avec=[Create(rep90), FadeIn(l90), Create(rep180), FadeIn(l180)])
            sc.rep(1, avec=[a.arc.animate.set_stroke(FAMILLE["obtus"]), a.fond.animate.set_fill(FAMILLE["obtus"])])
            sc.rep_fin()

        self.question_pause("08-question", "08b-reponse", ["Un angle mesure 150°.", "Comment s'appelle-t-il ?"],
                            [self.t("aigu", 34), self.t("obtus", 34), self.t("plat", 34)], 1,
                            ["150 est entre 90 et 180 :", "l'angle est obtus."], mots_choix=("A :", "B :", "C :"),
                            mot_q="Un angle", avant_q=avant, autres_r=apres)

    # ── 09 : le défi ────────────────────────────────────────────────────────
    def figure_defi(self, sommet="?"):
        s = P(-5.0, -1.8)
        return Angle(s, 0, 48, longueur=5.0, noms=("F", sommet, "G"), fleches=True, rayon_arc=0.9, sw=8, fs=46)

    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        a = self.figure_defi()
        a.lettre_s.set_color(ORANGE_RETENUE)
        self.add(a.fond, a.arc)
        lg = self.ligne([("[EF)", COTE), ("et", WHITE), ("[EG)", COTE)], 42, buff=0.25)
        self.col(lg, 1.95, xl=1.1)
        self.au_mot("E F")
        self.play(FadeIn(lg[0], scale=1.3), FadeIn(a.cote1), FadeIn(a.lettre1, scale=1.4), FadeIn(a.point, scale=2),
                  run_time=0.3)
        self.au_mot("E G")
        self.play(FadeIn(lg[1]), FadeIn(lg[2], scale=1.3), FadeIn(a.cote2), FadeIn(a.lettre2, scale=1.4), run_time=0.3)
        self.au_mot("Quel est")
        q1 = self.t("Quel est le sommet ?", 38, ORANGE_RETENUE)
        self.col(q1, 0.85, xl=1.1)
        self.play(FadeIn(q1, shift=UP * 0.15), FadeIn(a.lettre_s, scale=1.5), run_time=0.35)
        self.au_mot("Comment")
        q2 = self.bloc(["Comment s'appelle", "cet angle ?"], 38, ORANGE_RETENUE)
        self.col(q2, -0.2, xl=1.1)
        self.play(FadeIn(q2, shift=UP * 0.15), run_time=0.35)
        self.pause_defi(y=-1.45)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        a = self.figure_defi("E")
        self.add(a.fond, a.arc, a.cote1, a.cote2, a.point, a.lettre1, a.lettre2)
        self.play(Write(tit), run_time=0.4)
        self.au_mot("est E")
        self.play(FadeIn(a.lettre_s, scale=1.8), Flash(a.point, color=SOMMET, line_length=0.3), run_time=0.45)
        self.au_mot("sommet")
        v = self.t("E : le sommet", 42, SOMMET)
        self.col(v, 2.0, xl=1.1)
        self.play(FadeIn(v, scale=1.2), run_time=0.3)
        self.au_mot("L'angle s'appelle")
        pre = self.t("L'angle", 40)
        self.col(pre, 0.85, xl=1.1)
        self.play(FadeIn(pre, shift=RIGHT * 0.15), run_time=0.25)
        self.au_mot("F E G")
        n1 = nom_angle("F", "E", "G", 72).next_to(pre, RIGHT, buff=0.35)
        self.play(FadeIn(n1, scale=1.25), run_time=0.3)
        self.au_mot("ou G")
        ou = self.t("ou", 40).next_to(pre, DOWN, buff=0.75).align_to(pre, RIGHT)
        n2 = nom_angle("G", "E", "F", 72).next_to(ou, RIGHT, buff=0.35).align_to(n1, LEFT)
        self.play(FadeIn(ou), FadeIn(n2, scale=1.25), run_time=0.3)
        self.au_mot("Le E reste")
        self.play(n1.sommet.animate.scale(1.5), n2.sommet.animate.scale(1.5), run_time=0.3)
        self.play(n1.sommet.animate.scale(1 / 1.5), n2.sommet.animate.scale(1 / 1.5), run_time=0.3)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        grand = Angle(P(0, 0), 0, 55, longueur=3.2, noms=("A", "O", "B"), rayon_arc=0.75, sw=7, fs=38).figer()
        minis = VGroup()
        for i, m in enumerate((40, 90, 135, 180)):
            mini = Angle(P((0, 1.9, 3.8, 6.0)[i], -2.0), 0, m, longueur=0.95, rayon_arc=0.38, sw=6, couleur_arc=famille(m)[1]).figer()
            minis.add(mini)
        fig = VGroup(grand, minis)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Un angle : deux demi-droites", "qui partent du même point,", "le sommet."),
            ("Dans son nom, le sommet", "s'écrit au milieu."),
            ("Aigu, droit, obtus, plat :", "plus l'angle est ouvert,", "plus il est grand.")], fs=34)
        self.au_mot("Un angle")
        self.montrer_ligne(lignes[0], Indicate(grand.point, color=SOMMET, scale_factor=2))
        self.au_mot("Dans son nom")
        self.montrer_ligne(lignes[1])
        self.au_mot("Aigu")
        self.montrer_ligne(lignes[2], LaggedStart(*[Indicate(m, color=WHITE) for m in minis], lag_ratio=0.25))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_coude()
        self.ecran_definition()
        self.ecran_nom()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_famille()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class AngleReconnaitre6e(AngleReconnaitreBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
