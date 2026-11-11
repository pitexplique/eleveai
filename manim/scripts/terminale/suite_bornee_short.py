# suite_bornee_short.py
# EleveAI — Maths Terminale (spé) — short « Suite bornée : l'altitude la plus
# basse et la plus haute d'un satellite » (9:16), ceinture BLANCHE (échelle
# entière sous le titre). Série SUITES, épisode 31. Micro du coach : suite_bornee.
#   · 00-garde       : le titre, l'échelle (70 %), le pari en gros ; EN BAS la
#                      Terre et le satellite qui tourne entre deux orbites ;
#   · 01-situation   : EN HAUT Inès, ingénieure en mécanique spatiale, la Terre et
#                      le satellite qui fait ses tours (compteur « tour n ») ; EN
#                      BAS uₙ = 400 + 3 cos(n) et le nuage : un point par tour ;
#   · 02-cosinus     : −1 ≤ cos(n) ≤ 1, −3 ≤ 3 cos(n) ≤ 3 ; les deux orbites
#                      (plancher, plafond) s'allument EN MÊME TEMPS que les deux
#                      traits du nuage ;
#   · 03/03b         : question-pause (C : 397 ≤ uₙ ≤ 403), 3 s ; puis 400 − 3 et
#                      400 + 3, le nuage entre 397 et 403 ;
#   · 04-commentaire : uₙ = 550 − 4 sin(n), « quelle est l'altitude la plus haute
#                      possible ? », « Réponds en commentaire ! » (réponse 554 km,
#                      NON affichée) ;
#   · 05-abonne      : la fin du 05/11 (« Un pouce · La cloche »).
# Code couleur (module commun) : bleu = termes, orange = les bornes, vert = juste.
# Voix : manim/voix/terminale-suite-bornee-short.json (débit −6), calée par
# suite_bornee_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/terminale/suite_bornee_short.py SuiteBorneeShort -o eleveai-maths-terminale-suite-bornee-short --media_dir manim/scripts/terminale/media-suite-bornee-short

import math
import os
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))
sys.path.insert(1, str(ICI.parent / "premiere"))

from suites_commun import *  # noqa: E402,F403
from suite_bornee import glyphes, grossir_indices  # noqa: E402

# ── les affirmations de la voix, vérifiées ──────────────────────────────────
ALT = [400 + 3 * math.cos(n) for n in range(60)]
assert all(397 <= a <= 403 for a in ALT) and min(ALT) < 397.1 and max(ALT) > 402.9   # question : C
assert not all(0 <= a <= 400 for a in ALT) and not all(400 <= a <= 403 for a in ALT)
assert all(a <= 554 for a in (550 - 4 * math.sin(n) for n in range(2000)))           # commentaire : 554
TERRE, MER = "#1d4ed8", "#16a34a"


def terre(r=0.5):
    mer = Circle(radius=r, fill_color=TERRE, fill_opacity=1, stroke_color="#93c5fd", stroke_width=2)
    c1 = Ellipse(width=r * 0.8, height=r * 0.5, fill_color=MER, fill_opacity=1, stroke_width=0).shift(
        P(-r * 0.2, r * 0.3))
    c2 = Ellipse(width=r * 0.6, height=r * 0.45, fill_color=MER, fill_opacity=1, stroke_width=0).shift(
        P(r * 0.3, -r * 0.35))
    return VGroup(mer, c1, c2)


def satellite(s=1.0):
    corps = Square(0.17, fill_color=GREY_A, fill_opacity=1, stroke_width=0)
    pan = [Rectangle(width=0.24, height=0.11, fill_color=TERME, fill_opacity=1, stroke_color=WHITE,
                     stroke_width=1).next_to(corps, d, buff=0.03) for d in (LEFT, RIGHT)]
    ant = Line(corps.get_top(), corps.get_top() + UP * 0.1, stroke_color=GREY_A, stroke_width=2)
    return VGroup(corps, *pan, ant).scale(s)


def ines(s=1.0):
    """Inès, ingénieure en mécanique spatiale : blouse blanche, badge bleu."""
    tete = Circle(radius=0.28, fill_color="#8d5524", fill_opacity=1, stroke_width=0).move_to(P(0, 1.0))
    cheveux = Sector(radius=0.31, angle=PI, start_angle=0, fill_color="#111827", fill_opacity=1,
                     stroke_width=0).move_to(P(0, 1.18))
    natte = Line(P(-0.25, 1.05), P(-0.36, 0.6), stroke_color="#111827", stroke_width=9)
    corps = RoundedRectangle(width=0.95, height=1.15, corner_radius=0.25, fill_color="#f1f5f9", fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    badge = Rectangle(width=0.2, height=0.14, fill_color=TERME, fill_opacity=1, stroke_width=0).move_to(P(0.2, 0.4))
    return VGroup(natte, corps, badge, tete, cheveux).scale(s)


class SuiteBorneeShort(ShortSuites):
    fichier_marques = "suite_bornee_short_marques.json"
    nom_voix = "terminale-suite-bornee-short"
    identite = "Maths Tle — EleveAI"
    ceinture = "blanche"
    place_coche = 0.54            # poser_question : place du corps = 4,0 − 0,54 − 0,56 − 0,45 = 2,45 (comme bouton)
    hauteur_bouton = 1.25
    buff_boutons = 0.35
    Y_TITRE, Y_ECHELLE = 3.56, 2.86      # écartés : le titre ne touche pas l'échelle des ceintures

    def t(self, texte, fs=36, color=WHITE, larg=None, audit=True):
        """Comme le module commun, avec les indices agrandis (× 1,3)."""
        t = grossir_indices(Text(texte, font_size=fs, color=color), texte)
        larg = larg or self.largeur_texte
        if t.width > larg:
            t.scale_to_fit_width(larg)
        if not audit:
            t._pas_audit = True
        return t

    def entete(self, titre, extrait=None, fs=44):
        if getattr(self, "_margo", None) is None:
            self._margo = self.margo_bas()
        self.badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7)
        self.badge.move_to(P(0, self.Y_ECHELLE))
        self.titre_s = self.t(titre, fs, JAUNE_TITRE).move_to(P(0, self.Y_TITRE))
        self.add(self.badge)
        self.au_mot(extrait or titre)
        self.play(Write(self.titre_s), run_time=0.5)
        return self.titre_s, self.badge

    def bouton(self, lettre, corps, largeur, fs):
        rond = Circle(radius=0.21, fill_color=TERME, fill_opacity=1, stroke_width=0)
        lt = Text(lettre, font_size=30, color=WHITE, weight=BOLD).move_to(rond)
        c = corps if isinstance(corps, Mobject) else self.t(corps, 36, WHITE, 1e9)
        place = largeur - 0.15 - rond.width - 0.15 - 0.83   # coche (0,46) + 0,12 du bord + 0,25 d'air (≥ 40 px)
        if c.width > place:
            c.scale_to_fit_width(place)
        ligne = VGroup(VGroup(rond, lt), c).arrange(RIGHT, buff=0.15)
        cadre = RoundedRectangle(width=largeur, height=max(self.hauteur_bouton, ligne.height + 0.28),
                                 corner_radius=0.14, stroke_color=TERME, stroke_width=3, fill_color=FOND_CARTE,
                                 fill_opacity=1)
        ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.15, LEFT)
        return VGroup(cadre, ligne)

    def choix(self, pieces, fs=29):
        """Le corps d'un bouton en morceaux [(texte, extrait), …] : chaque
        morceau quand la voix le dit (q_montrer_choix → montrer_liste)."""
        g = self.construire([(m, WHITE, ex) for m, ex in pieces], fs, 1e9)
        g.nombres, g.seps = list(g), [VMobject() for _ in g[1:]]
        return g

    def montrer_liste(self, g, extraits=None, run_time=0.18):
        return super().montrer_liste(g, extraits or getattr(g, "extraits", None), run_time)

    def construire(self, morceaux, fs=40, larg=None):
        """UNE ligne = UN seul Text coupé en morceaux colorés [(texte, couleur, extrait), …]."""
        tout = self.t(" ".join(m for m, _, _ in morceaux), fs, WHITE, larg or self.largeur_texte / 1.1)
        g, i = VGroup(), 0
        for m, c, _ in morceaux:
            n = len(glyphes(m))
            g.add(VGroup(*tout.submobjects[i:i + n]).set_color(c))
            i += n
        g.extraits = [ex for _, _, ex in morceaux]
        return g

    def ligne(self, morceaux, y, fs=40, avec=(), avec_k=None, ordre=None, larg=None):
        """Une ligne centrée en y, chaque morceau à sa voix (None : avec le précédent) ;
        ordre : l'ordre de la voix ; avec_k = {k: [animations]} jouées avec le morceau k."""
        g = self.construire(morceaux, fs, larg).move_to(P(0, y))
        avec_k, paquet = avec_k or {}, []

        def jouer(fin=()):
            anims = [FadeIn(g[k], shift=UP * 0.1) for k in paquet]
            for k in paquet:
                anims += list(avec_k.get(k, ()))
            self.play(*anims, *fin, run_time=0.25 if fin else 0.2)
        for k in (ordre or range(len(g))):
            ex = g.extraits[k]
            if ex is not None and paquet:
                jouer()
                paquet = []
            if ex is not None:
                self.suivre(ex)
            paquet.append(k)
        jouer(list(avec) or [Wait(0.01)])
        return g

    def trait(self, nu, v, couleur=RAISON, texte=None, fs=24, audit=True):
        tr = DashedLine(P(nu.ax_u.get_center()[0], nu.G(0, v)[1]), P(nu.X1 + 0.05, nu.G(0, v)[1]), color=couleur,
                        stroke_width=3.5, dash_length=0.1)
        g = VGroup(tr)
        if texte:
            g.add(self.t(texte, fs, couleur, audit=audit).next_to(tr, LEFT, buff=0.1))
        return g

    def orbiter(self, sat, centre, r_moy, r_amp, vitesse=TAU / 0.6, pts=(), comptes=()):
        """Le satellite tourne autour du centre. Au tour n (n = θ / 2π), son rayon
        vaut r_moy + r_amp × cos(n) : comme l'altitude uₙ. pts[k] (et le compteur
        comptes[k]) s'allument quand le satellite termine son k-ième tour."""
        sat.theta = 0.0

        def maj(m, dt):
            m.theta += vitesse * dt
            nf = m.theta / TAU
            r = r_moy + r_amp * math.cos(nf)
            m.move_to(centre + r * np.array([math.cos(m.theta), math.sin(m.theta), 0]))
            for k, d in enumerate(pts):
                if nf >= k and d.get_fill_opacity() < 0.5:
                    d.set_opacity(1)
            if comptes:
                kk = min(int(nf + 1e-9), len(comptes) - 1)
                for j, c in enumerate(comptes):
                    c.set_opacity(1 if j == kk else 0)
        sat.add_updater(maj)
        maj(sat, 0)

    def nuage_alt(self, bas=-2.85, haut=-1.3):
        nu = NuageTermes((0, 10.6), (395.5, 404.5), P(-1.35, bas), P(1.45, haut), nom_u="uₙ", fs=24)
        return nu

    def construct(self):
        # ── 00 : la garde : le titre, l'échelle (70 %), le pari ; la Terre en bas ──
        self.dire("00-garde")
        self.entete("Suite bornée", extrait="Suite bornée")
        pari = self.paragraphe(["Tu paries que", "tu trouves l'altitude", ("la plus basse", RAISON),
                                ("et la plus haute", RAISON), "d'un satellite ?"], 46, buff=0.14, y=1.1)
        C0 = P(0, -1.75)
        tr0 = terre(0.5).move_to(C0)
        o1 = DashedVMobject(Circle(radius=0.82, stroke_color=RAISON, stroke_width=3).move_to(C0), num_dashes=40)
        o2 = DashedVMobject(Circle(radius=1.08, stroke_color=RAISON, stroke_width=3).move_to(C0), num_dashes=48)
        sat0 = satellite(1.1)
        for k, (l, ex) in enumerate(zip(pari, ("Tu paries", "tu trouves", "la plus basse", "et la plus haute",
                                               "d'un satellite"))):
            self.au_mot(ex)
            anims = [FadeIn(l, shift=UP * 0.1)]
            if k == 1:
                anims.append(GrowFromCenter(tr0))
            if k == 2:
                anims.append(Create(o1))
            if k == 3:
                anims.append(Create(o2))
            if k == 4:
                sat0.move_to(C0 + RIGHT * 1.08)
                self.orbiter(sat0, C0, 0.95, 0.13)
                anims.append(FadeIn(sat0, scale=0.5))
            self.play(*anims, run_time=0.35)
        self.attendre_voix(marge=0.6)

        # ── 01 : EN HAUT Inès et son satellite ; EN BAS uₙ et le nuage ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s))
        pi = ines(0.62).move_to(P(-1.5, 1.6))
        nom = self.t("Inès", 46, JAUNE_TITRE).move_to(P(0.6, 2.32))
        met = VGroup(*[self.t(m, 28, TERME) for m in ("ingénieure en", "mécanique", "spatiale")]).arrange(
            DOWN, buff=0.05).move_to(P(0.6, 1.25))
        self.au_mot("Inès")
        self.play(FadeIn(pi, shift=UP * 0.15), FadeIn(nom, shift=UP * 0.1), run_time=0.4)
        self.au_mot("ingénieure")
        self.play(FadeIn(met, shift=UP * 0.1), run_time=0.35)
        C1 = P(-0.95, -0.02)
        tr1 = terre(0.32).move_to(C1)
        orb = Circle(radius=0.55, stroke_color=GREY_D, stroke_width=2).move_to(C1)
        sat = satellite(0.75)
        nu = self.nuage_alt(-2.85, -1.85)
        self.au_mot("L'altitude")
        self.play(GrowFromCenter(tr1), Create(orb), Create(nu.ax_n), Create(nu.ax_u), FadeIn(nu.lab_n),
                  FadeIn(nu.lab_u), run_time=0.45)
        # un tour = un point du nuage, EN MÊME TEMPS (le compteur « tour n » suit)
        pts = [nu.point(n, ALT[n], r=0.07).set_opacity(0) for n in range(11)]
        comptes = [self.t(f"tour {n}", 34, GREY_A, audit=False).move_to(P(1.05, -0.02)).set_opacity(0)
                   for n in range(11)]
        self.add(*pts, *comptes)
        self.au_mot("au tour n")
        sat.move_to(C1 + RIGHT * 0.63)
        self.play(FadeIn(sat, scale=0.5), run_time=0.2)
        self.orbiter(sat, C1, 0.55, 0.08, pts=pts, comptes=comptes)
        rel = self.ligne([("uₙ =", TERME, "u indice n égale"), ("400", WHITE, "400"),
                          ("+ 3 cos(n)", RAISON, "3 cosinus")], -1.05, fs=44)
        self.attendre_voix(marge=0.3)
        reste = 10 * 0.6 - sat.theta / TAU * 0.6
        if reste > 0:
            self.wait(reste + 0.1)

        # ── 02 : le cosinus coincé entre −1 et 1 : les deux orbites, les deux traits ──
        self.nouvel_ecran("02-cosinus", garder=(self.badge, self.titre_s, tr1, orb, sat, nu.ax_n, nu.ax_u, nu.lab_n,
                                                  nu.lab_u, *pts, *rel))
        self.ligne([("−1 ≤", WHITE, "moins 1"), ("cos(n)", RAISON, "Cosinus"), ("≤ 1", WHITE, "et 1")], 2.2, fs=44,
                   ordre=[1, 0, 2], avec_k={1: [Indicate(rel[2], color=RAISON)]})
        r_bas = DashedVMobject(Circle(radius=0.45, stroke_color=RAISON, stroke_width=3).move_to(C1), num_dashes=26)
        r_haut = DashedVMobject(Circle(radius=0.66, stroke_color=RAISON, stroke_width=3).move_to(C1), num_dashes=32)
        t397, t403 = self.trait(nu, 397), self.trait(nu, 403)
        self.ligne([("−3 ≤", WHITE, "moins 3"), ("3 cos(n)", RAISON, "3 cosinus"), ("≤ 3", WHITE, "et 3")], 1.45,
                   fs=44, ordre=[1, 0, 2], avec_k={0: [Create(r_bas), Create(t397)], 2: [Create(r_haut), Create(t403)]})
        self.play(*[Indicate(d, color=RAISON, scale_factor=1.5) for d in pts], run_time=0.8)
        self.attendre_voix(marge=0.3)
        sat.clear_updaters()

        # ── 03 : question-pause → C (397 ≤ uₙ ≤ 403) ──
        rappel = self.construire([("uₙ =", TERME, None), ("400", WHITE, None), ("+ 3 cos(n)", RAISON, None)],
                                 48, larg=3.95)                        # la donnée (déjà dite), en grand
        q = self.poser_question("03-question",
                                [(rappel, None), (self.t("Pour tout n :", 28), "Pour tout n")],
                                [self.choix([("0 ≤", "0"), ("uₙ ≤", "u indice n"), ("400", "400")]),
                                 self.choix([("400 ≤", "400"), ("uₙ ≤", "u indice n"), ("403", "403")]),
                                 self.choix([("397 ≤", "397"), ("uₙ ≤", "u indice n"), ("403", "403")])], 2, y_question=2.85)
        self.dire("03b-reponse")
        ok = self.q_reponse(q, 2)
        c = VGroup(q.cartes[2], ok)
        self.play(FadeOut(q.cartes[0]), FadeOut(q.cartes[1]), FadeOut(q.question), c.animate.move_to(P(0, 2.25)),
                  run_time=0.3)
        a1 = self.construire([("400 − 3", RAISON, "400 moins"), ("= 397", JUSTE, "397")], 44).move_to(P(0, 1.2))
        a2 = self.construire([("400 + 3", RAISON, "400 plus"), ("= 403", JUSTE, "403")], 44).move_to(P(0, 0.5))
        nu = self.nuage_alt(-2.85, -1.35)
        pts = [nu.point(n, ALT[n], r=0.07) for n in range(11)]
        t397, t403 = self.trait(nu, 397, JUSTE, "397"), self.trait(nu, 403, JUSTE, "403")
        self.au_mot("400 moins")
        self.play(FadeIn(a1[0], shift=UP * 0.1), Create(nu.ax_n), Create(nu.ax_u), FadeIn(nu.lab_n),
                  FadeIn(nu.lab_u), LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=0.15), run_time=0.4)
        self.au_mot("400 plus")
        self.play(FadeIn(a2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("l'altitude reste")
        al = self.t("l'altitude reste entre", 36, WHITE).move_to(P(0, -0.2))
        self.play(FadeIn(al, shift=UP * 0.1), run_time=0.3)
        self.au_mot("397")
        self.play(FadeIn(a1[1], scale=1.3), Create(t397), run_time=0.3)
        self.au_mot("403")
        bande = Rectangle(width=t403[0].width, height=t403[0].get_center()[1] - t397[0].get_center()[1],
                          stroke_width=0, fill_color=JUSTE, fill_opacity=0.15)
        bande.move_to(P(t403[0].get_center()[0], (t403[0].get_center()[1] + t397[0].get_center()[1]) / 2))
        self.play(FadeIn(a2[1], scale=1.3), Create(t403), FadeIn(bande), run_time=0.3)
        self.play(*[Indicate(d, color=JUSTE, scale_factor=1.5) for d in pts], run_time=0.6)
        self.attendre_voix(marge=0.4)

        # ── 04 : la question en commentaire, dans l'ordre de la voix ──
        self.nouvel_ecran("04-commentaire", garder=(self.badge,))
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 54, JAUNE_TITRE).move_to(P(0, self.Y_TITRE))
        self.play(FadeIn(et, shift=DOWN * 0.1), run_time=0.35)
        C4 = P(0, 2.42)
        tr4 = terre(0.27).move_to(C4)
        haut = DashedVMobject(Circle(radius=0.58, stroke_color=RAISON, stroke_width=3).move_to(C4), num_dashes=32)
        sat4 = satellite(0.55).move_to(C4 + RIGHT * 0.5)
        qm = self.t("?", 50, RAISON).move_to(C4 + P(1.1, 0.0))
        self.play(GrowFromCenter(tr4), FadeIn(sat4, scale=0.5), run_time=0.35)
        self.orbiter(sat4, C4, 0.47, 0.07)
        self.ligne([("si", WHITE, "si l'altitude")], 1.5, fs=40)
        self.ligne([("uₙ =", TERME, "u indice n égale"), ("550", WHITE, "550"), ("− 4 sin(n)", RAISON, "4 sinus")],
                   0.93, fs=40, larg=self.largeur_texte)          # la formule entière, sur UNE ligne
        question = self.paragraphe([("quelle est", RAISON), ("l'altitude", RAISON), ("la plus haute", RAISON),
                                    ("possible ?", RAISON)], 37, buff=0.05, y=-0.63)
        for i, m in enumerate(question):                 # lignes à pas égal (sur la ligne de base)
            m.set_y(question[0].get_y() - 0.56 * i + (0.05 if i == 1 else 0))
        self.au_mot("quelle est")
        self.play(FadeIn(question[0], shift=UP * 0.1), FadeIn(question[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("la plus haute")
        self.play(FadeIn(question[2], shift=UP * 0.1), FadeIn(question[3], shift=UP * 0.1), Create(haut),
                  FadeIn(qm, scale=1.5), run_time=0.4)
        self.appel_commentaire(-2.4)
        self.attendre_voix(marge=0.6)
        sat4.clear_updaters()

        # ── 05 : la fin ──
        self.fin_short("05-abonne")
