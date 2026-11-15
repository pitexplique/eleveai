# suite_exp_geo_short.py
# EleveAI — Maths 1re spé — short « La suite e puissance n a » (9:16), ceinture
# BLANCHE (échelle entière sous le titre). Série SUITES du lycée, épisode 40.
# Micro du coach : exp_suite_geo (notion exponentielle, fixed_1, fixed_3, tpl_1).
#   · 00-garde       : le titre, l'échelle (70 %), le pari « le son d'une guitare
#                      ne s'arrête jamais vraiment ? » ; EN BAS la guitare et sa
#                      corde qui vibre, dès le titre ;
#   · 01-situation   : EN HAUT la corde pincée qui vibre ; EN BAS, EN MÊME TEMPS,
#                      A(t) = 100 e^(−0,4t) en %, t en secondes ;
#   · 02-releves     : seconde par seconde, l'amplitude tombe ET la case se
#                      remplit : 100 / 67 / 44,9 / 30,1 ;
#   · 03/03b         : question-pause (A : géométrique de raison e^(−0,4) ≈ 0,67),
#                      3 s ; « × 0,67 » saute de case en case, − 33 % par seconde ;
#   · 04-commentaire : au bout de 4 secondes, quel pourcentage reste-t-il ?
#                      (réponse ≈ 20,2 %, NON affichée) ;
#   · 05-abonne      : la fin commune du 05/11 (« Un pouce · La cloche »).
# Code couleur (module commun) : bleu = les termes (le volume), orange = la
# raison, vert = juste, rouge = le piège.
# ⛔ Aucun exposant Unicode : les puissances sont COMPOSÉES (puissance()).
# Voix : manim/voix/premiere-spe-suite-exp-geo-short.json (débit −6), calée par
# suite_exp_geo_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/suite_exp_geo_short.py SuiteExpGeoShort -o eleveai-maths-premiere-spe-suite-exp-geo-short --media_dir manim/scripts/premiere/media-suite-exp-geo-short

import math
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))

from suites_commun import *  # noqa: E402,F403
from suite_arith_graphique import OutilsGraphique  # noqa: E402
from suite_geo_reconnaitre import AuditMilliers  # noqa: E402
from suite_geo_terme_rang import OutilsEp12  # noqa: E402
from suite_geo_interpreter import SuiteGeoInterpreter1re as _E16  # noqa: E402
from suite_modeliser import SuiteModeliser1reSpe as _P21  # noqa: E402
from suite_exp_geo import SuiteExpGeo1reSpe as _P40  # noqa: E402  (la paysage : maths(), choix_e())

A = {n: 100 * math.exp(-0.4 * n) for n in range(0, 9)}
assert [round(A[n], 1) for n in range(4)] == [100.0, 67.0, 44.9, 30.1]        # les relevés
assert abs(round(math.exp(-0.4), 2) - 0.67) < 5e-3                            # la raison : A
assert abs(round(100 - 100 * math.exp(-0.4)) - 33) < 0.5                      # − 33 % par seconde
assert abs(round(A[4], 1) - 20.2) < 0.05 and A[8] > 0                         # le commentaire, non affiché

BOIS_G, MANCHE, TETE_G = "#b45309", "#78350f", "#451a03"


def guitare(s=1.0):
    """Une guitare schématique, couchée : caisse, rosace, manche, frettes, tête."""
    corps = VGroup(Ellipse(width=1.55, height=1.2, fill_color=BOIS_G, fill_opacity=1, stroke_width=0)
                   .move_to(P(-1.0, 0)),
                   Ellipse(width=1.2, height=0.92, fill_color=BOIS_G, fill_opacity=1, stroke_width=0)
                   .move_to(P(-0.25, 0)))
    rosace = Circle(radius=0.18, fill_color="#0b1220", fill_opacity=1, stroke_width=0).move_to(P(-0.85, 0))
    manche = Rectangle(width=1.5, height=0.2, fill_color=MANCHE, fill_opacity=1, stroke_width=0).move_to(P(0.6, 0))
    frettes = VGroup(*[Line(P(x, -0.1), P(x, 0.1), stroke_color="#fcd34d", stroke_width=2)
                       for x in (0.2, 0.55, 0.9, 1.22)])
    tete = RoundedRectangle(width=0.34, height=0.3, corner_radius=0.06, fill_color=TETE_G, fill_opacity=1,
                            stroke_width=0).move_to(P(1.5, 0))
    return VGroup(corps, rosace, manche, frettes, tete).scale(s)


def corde(x0, x1, y, amp, phase, couleur=TERME):
    """La corde qui vibre : une onde stationnaire dont l'amplitude suit amp."""
    def dessin():
        a, ph = amp.get_value(), phase.get_value()
        return ParametricFunction(
            lambda t: P(t, y + a * math.sin(ph) * math.sin(PI * (t - x0) / (x1 - x0))
                        * math.cos(3 * PI * (t - x0) / (x1 - x0))),
            t_range=[x0, x1, 0.015], color=couleur, stroke_width=4)
    return always_redraw(dessin)


class SuiteExpGeoShort(AuditMilliers, OutilsEp12, OutilsGraphique, ShortSuites):
    fichier_marques = "suite_exp_geo_short_marques.json"
    nom_voix = "premiere-spe-suite-exp-geo-short"
    identite = "Maths 1re spé — EleveAI"
    ceinture = "blanche"
    hauteur_bouton = 0.9
    buff_boutons = 0.12
    y_tete_question = 3.52
    place_coche = 0.8
    Y_TITRE, Y_ECHELLE = 3.52, 2.86
    calc = _E16.calc
    ligne = _P21.ligne
    maths = _P40.maths
    bloc = _P40.bloc
    _bas = _P40._bas
    choix_e = _P40.choix_e
    saut_e = _P40.saut_e

    def entete_e(self, extrait="La suite", fs=44):
        """L'entête du short, avec le titre « La suite e puissance n a » COMPOSÉ."""
        if getattr(self, "_margo", None) is None:
            self._margo = self.margo_bas()
        self.badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7)
        self.badge.move_to(P(0, self.Y_ECHELLE))
        self.titre_s = self.maths([("t", "La suite", JAUNE_TITRE, None), ("e", "na", JAUNE_TITRE, RAISON, None)],
                                  self.Y_TITRE, fs=fs, larg=4.0, montrer=False)
        self.add(self.badge)
        self.au_mot(extrait)
        self.play(Write(self.titre_s), run_time=0.5)

    def lg(self, y, valeurs=("100", "67", "44,9", "30,1"), audit=True):
        """Les quatre relevés en cases (bleu), noms A₀ … A₃."""
        g = LigneTermes(list(valeurs), centre=P(0, y), pas=1.02, largeur=0.95, hauteur=0.72, fs=26,
                        noms=["A₀", "A₁", "A₂", "A₃"], fs_noms=20)
        if not audit:
            for c in g.cases:
                c[1]._pas_audit = True
        return g

    def construct(self):
        # ── 00 : la garde : le titre, l'échelle (70 %), le pari ; EN BAS la guitare ──
        self.dire("00-garde")
        gui = guitare(1.05).move_to(P(0, -2.0))
        amp, ph = ValueTracker(0.3), ValueTracker(0.0)
        cd = corde(-1.95, 1.55, -2.0, amp, ph)
        self.entete_e()
        self.play(FadeIn(gui, shift=UP * 0.2), FadeIn(cd), run_time=0.4)
        moteur = VMobject().add_updater(lambda m, dt: ph.increment_value(9.0 * dt))
        self.add(moteur)
        self.calc([("Tu paries que", WHITE, "Tu paries")], 1.95, centre=0, fs=44, larg=4.1)
        self.calc([("le son", WHITE, "le son")], 1.3, centre=0, fs=44, larg=4.1)
        self.calc([("d'une guitare", JUSTE, "d'une guitare")], 0.6, centre=0, fs=50, larg=4.1)
        self.calc([("ne s'arrête", WHITE, "ne s'arrête")], -0.15, centre=0, fs=44, larg=4.1)
        f = self.calc([("jamais vraiment ?", JAUNE_TITRE, "jamais vraiment")], -0.9, centre=0, fs=48, larg=4.1)
        self.play(Indicate(f, color=JAUNE_TITRE, scale_factor=1.06), run_time=0.45)
        self.attendre_voix(marge=0.3)

        # ── 01 : EN HAUT la corde pincée ; EN BAS la formule EN MÊME TEMPS ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s))
        moteur.clear_updaters()
        gui = guitare(1.05).move_to(P(0, 1.55))
        amp, ph = ValueTracker(0.0), ValueTracker(0.0)
        cd = corde(-1.95, 1.55, 1.55, amp, ph)
        self.au_mot("On pince une corde")
        self.play(FadeIn(gui, shift=DOWN * 0.15), FadeIn(cd), amp.animate.set_value(0.42), run_time=0.5)
        moteur = VMobject().add_updater(lambda m, dt: ph.increment_value(9.0 * dt))
        self.add(moteur)
        self.calc([("On pince une corde,", WHITE, None)], 0.45, centre=0, fs=38, larg=4.1)
        self.calc([("on la laisse vibrer.", WHITE, "on la laisse")], -0.15, centre=0, fs=38, larg=4.1)
        self.calc([("Le volume suit", WHITE, "Le volume suit")], -0.85, centre=0, fs=38, larg=4.1)
        self.calc([("une exponentielle :", JAUNE_TITRE, "une exponentielle")], -1.4, centre=0, fs=38, larg=4.1)
        self.maths([("t", "A(t) =", JAUNE_TITRE, "A de t"), ("t", "100 ×", WHITE, "100 fois"),
                    ("e", "−0,4t", WHITE, RAISON, "moins 0,4 t")], -2.1, fs=36, centre=0, larg=4.1)
        self.calc([("en %,", RAISON, "en pour cent"), ("t en secondes", RAISON, "en secondes")], -2.72, centre=0,
                  fs=30, larg=4.1)
        self.attendre_voix(marge=0.3)

        # ── 02 : seconde par seconde : l'amplitude tombe, la case se remplit ──
        self.dire("02-releves")
        garder = (self.badge, self.titre_s, self._margo, gui, cd, moteur)
        vieux = [m for m in self.mobjects if m not in garder]
        self.play(*[FadeOut(m) for m in vieux], run_time=0.25)
        self.remove(*vieux)
        lg = self.lg(-1.3)
        self.calc([("Seconde par seconde :", JAUNE_TITRE, "Seconde par seconde")], 0.45, centre=0, fs=38, larg=4.1)
        pc = self.t("en %", 28, RAISON, audit=False).move_to(P(0, -2.25))
        for k, ex in enumerate(("100", "67", "44,9", "30,1")):
            self.suivre(ex)
            anims = [FadeIn(lg.cases[k][0], scale=0.8), FadeIn(lg.cases[k][1], scale=1.4), FadeIn(lg.noms[k]),
                     amp.animate.set_value(0.42 * math.exp(-0.4 * k))]
            if k == 0:
                anims.append(FadeIn(pc))
            self.play(*anims, run_time=0.45)
        self.attendre_voix(marge=0.3)
        moteur.clear_updaters()
        cd.clear_updaters()

        # ── 03 : question-pause → A (géométrique de raison e^(−0,4) ≈ 0,67) ──
        fs, largeur = 26, 4.0
        corps = [
            self.choix_e([[("t", "géométrique,", WHITE, "géométrique")],
                          [("t", "de raison", WHITE, "de raison"), ("e", "−0,4", JUSTE, JUSTE, "moins 0,4,")],
                          [("t", "≈ 0,67", JUSTE, "0,67")]], fs, buff=0.1),
            self.choix_e([[("t", "arithmétique,", WHITE, "arithmétique")],
                          [("t", "de raison", WHITE, "de raison"), ("t", "−33", PIEGE, "moins 33")]], fs, buff=0.1),
            self.choix_e([[("t", "géométrique,", WHITE, "géométrique")],
                          [("t", "de raison", WHITE, "de raison"), ("t", "−0,4", PIEGE, "moins 0,4")]], fs,
                         buff=0.1)]
        place = largeur - self.place_coche - 0.5 * fs / 32 - 0.45
        fk = min(1.0, place / max(c.width for c in corps))
        for c in corps:
            c.scale(fk)
        g1 = self.t("Cette suite de", 36, WHITE)
        g2 = self.t("pourcentages est :", 36, WHITE)

        def dessin():
            """Le bas ne reste pas vide : les relevés attendent, puis s'en vont."""
            self._attente = self.lg(-1.5, audit=False)
            self.play(FadeIn(self._attente, shift=UP * 0.15), run_time=0.3)
        liste = [(g1, "Cette suite"), (g2, "pourcentages")]
        q = self.poser_question("03-question", liste, corps, 0, dessin=dessin, largeur=largeur, fs=fs)
        self.dire("03b-reponse")
        self.au_mot("Réponse A")
        ok = self.q_reponse(q, 0)
        self.play(FadeOut(q.tete), FadeOut(q.question), FadeOut(q.cartes[1]), FadeOut(q.cartes[2]),
                  VGroup(q.cartes[0], ok).animate.move_to(P(0, 3.05)), run_time=0.35)
        lg = self.lg(0.95, audit=False)      # les « × 0,67 » passent sous la carte A sans la toucher
        self.au_mot("Chaque seconde")
        self.play(FadeIn(lg, shift=UP * 0.1), run_time=0.35)
        self.suivre("0,67")
        sauts = [lg.saut(k, "× 0,67", cote=UP, fs=22) for k in range(3)]
        self.play(LaggedStart(*[AnimationGroup(Create(s[0]), FadeIn(s[1], scale=1.3), lag_ratio=0.55) for s in sauts],
                              lag_ratio=0.3), run_time=0.85)
        self.calc([("le volume perd", WHITE, "le volume perd"), ("33 %", JAUNE_TITRE, "33 %")], -0.3, centre=0,
                  fs=34, larg=4.1)
        self.calc([("par seconde,", WHITE, "par seconde")], -0.95, centre=0, fs=34, larg=4.1)
        self.calc([("et il ne devient jamais", WHITE, "et il ne devient")], -1.7, centre=0, fs=32, larg=4.1)
        fin = self.calc([("tout à fait nul.", JUSTE, "tout à fait nul")], -2.35, centre=0, fs=38, larg=4.1)
        self.play(Create(self.encadre(fin, JUSTE, 0.14)), run_time=0.3)
        self.attendre_voix(marge=0.4)

        # ── 04 : la question en commentaire ──
        self.nouvel_ecran("04-commentaire")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 52, JAUNE_TITRE).move_to(P(0, 3.45))
        self.play(FadeIn(et, shift=DOWN * 0.1), run_time=0.35)
        gui = guitare(1.0).move_to(P(0, -0.85))
        amp, ph = ValueTracker(0.12), ValueTracker(0.0)
        cd = corde(-1.9, 1.5, -0.85, amp, ph)
        self.calc([("au bout de", WHITE, "au bout de"), ("4 secondes,", JAUNE_TITRE, "4 secondes")], 2.5, centre=0,
                  fs=40, larg=4.1)
        self.calc([("quel pourcentage", WHITE, "quel pourcentage")], 1.8, centre=0, fs=40, larg=4.1,
                  avec=[FadeIn(gui, shift=UP * 0.15), FadeIn(cd)])
        mot = VMobject().add_updater(lambda m, dt: ph.increment_value(7.0 * dt))
        self.add(mot)
        self.calc([("du volume", WHITE, "du volume")], 1.15, centre=0, fs=40, larg=4.1)
        self.calc([("reste-t-il ?", JAUNE_TITRE, "reste-t-il")], 0.45, centre=0, fs=42, larg=4.1)
        self.appel_commentaire(y=-2.45)
        self.attendre_voix(marge=0.5)
        mot.clear_updaters()
        cd.clear_updaters()

        # ── 05 : la fin commune ──
        self.fin_short("05-abonne")

    def q_montrer_choix(self, cartes):
        """Les trois cadres prennent la place du dessin d'attente ; chaque morceau
        du corps À SA VOIX."""
        att = getattr(self, "_attente", None)
        if att is not None:
            self._attente = None
            self.play(FadeOut(att, shift=DOWN * 0.15), run_time=0.25)
        for c, L in zip(cartes, "ABC"):
            self.suivre(f"{L} : ")
            corps = c[1][1]
            for k, (m, ex) in enumerate(zip(corps, corps.extraits)):
                if ex is not None:
                    self.suivre(ex)
                debut = [FadeIn(c[0]), FadeIn(c[1][0], shift=RIGHT * 0.15)] if k == 0 else []
                self.play(*debut, FadeIn(m, scale=1.15), run_time=0.22)
