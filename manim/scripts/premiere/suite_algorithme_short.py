# suite_algorithme_short.py
# EleveAI — Maths 1re spé — short « Lire un programme : tu paries que tu devines
# ce qu'il affiche ? » (9:16), ceinture BLANCHE (échelle entière à 70 % sous le
# titre). Série SUITES, épisode 20. Micro : suite_algorithme.
#   · 00-garde      : le titre, l'échelle, le pari ; l'ordinateur, la boucle ;
#   · 01-situation  : « L'énigme du jour » : la fenêtre du programme, 3 lignes ;
#   · 02-programme  : EN HAUT le code s'écrit ligne à ligne (Consolas, la
#                     boucle indentée) ; EN BAS sa lecture en français, EN MÊME
#                     TEMPS ;
#   · 03/03b        : question-pause (A : 45), boutons côte à côte en grand, 3 s ;
#                     puis 10, 15, 25, 45 : chaque case EN BAS quand la ligne de
#                     la boucle s'allume EN HAUT ;
#   · 04-commentaire: range(5) (i de 0 à 4) : quel nombre ? (réponse 165, NON
#                     affichée) ; « Réponds en commentaire ! » ;
#   · 05-abonne     : la fin du 05/11 (« Un pouce · La cloche »).
# Voix : manim/voix/premiere-spe-suite-algorithme-short.json (débit −6), calée par
# suite_algorithme_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/suite_algorithme_short.py SuiteAlgorithmeShort -o eleveai-maths-premiere-spe-suite-algorithme-short --media_dir manim/scripts/premiere/media-suite-algorithme-short

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403
from suite_arith_graphique import OutilsGraphique  # noqa: E402  (ép. 07)
from suite_geo_reconnaitre import AuditMilliers  # noqa: E402  (ép. 09)
from suite_geo_terme_rang import OutilsEp12  # noqa: E402  (ép. 12)
from suite_geo_interpreter_short import SuiteGeoInterpreterShort as _S16  # noqa: E402  (ép. 16)
from suite_termes_short import SuiteTermesShort as _S18  # noqa: E402  (ép. 18)
from suite_algorithme import (FONCTION, RANG, OutilsAlgo, Programme, boucle_for,  # noqa: E402,F401
                              fleche_boucle, ordinateur)

assert boucle_for(10, 0, 3, lambda u: 2 * u - 5) == [10, 15, 25, 45]        # question : A (45)
assert boucle_for(10, 0, 5, lambda u: 2 * u - 5)[-1] == 165                  # commentaire : 165
assert 2 * 10 + 5 == 25 and 2 * 10 - 5 == 15                                 # les leurres : 25 (+ 5), 15 (1 tour)

CODE = ["u = 10", "for i in range(3):", "    u = 2*u - 5", "print(u)"]


class SuiteAlgorithmeShort(AuditMilliers, OutilsAlgo, OutilsEp12, OutilsGraphique, ShortSuites):
    fichier_marques = "suite_algorithme_short_marques.json"
    nom_voix = "premiere-spe-suite-algorithme-short"
    identite = "Maths 1re spé — EleveAI"
    ceinture = "blanche"
    place_coche = 0.15
    entete = _S16.entete
    q_reponse = _S18.q_reponse
    bouton_haut = _S18.bouton_haut
    _garder_q = ()

    def nouvel_ecran(self, cle, garder=None):
        """Comme le module commun ; `garder` (ou, pour la question, le programme)
        reste en place, glyphes compris."""
        r = self.dire(cle)
        self._effacer_ancien(self.a_garder(self._garder_q if garder is None else garder))
        return r

    def construct(self):
        # ── 00 : la garde : le titre, l'échelle (70 %), le pari ──
        self.dire("00-garde")
        self.entete("Lire un programme", extrait="Lire un programme", fs=40)
        l1 = self.t("Tu paries que", 46).next_to(self.badge, DOWN, buff=0.5)
        l2 = self.t("tu devines", 46).next_to(l1, DOWN, buff=0.18)
        self.au_mot("Tu paries")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.25)
        o = ordinateur(1.15).move_to(P(-0.25, -0.55))
        bo = fleche_boucle(0.34).move_to(P(1.62, -0.1))
        self.au_mot("tu devines")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(o[:2], shift=UP * 0.1), run_time=0.3)
        self.play(LaggedStart(*[GrowFromEdge(l, LEFT) for l in o.lignes], lag_ratio=0.25), Create(bo), run_time=0.5)
        l3 = self.t("ce qu'il affiche ?", 46, RAISON).move_to(P(0, -2.25))
        self.au_mot("ce qu'il affiche")
        self.play(FadeIn(l3, shift=UP * 0.1), Rotate(bo, -2 * PI), run_time=0.5)
        self.attendre_voix(marge=0.2)

        # ── 01 : l'énigme du jour : la fenêtre, 3 lignes ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s))
        prog = Programme(CODE, fs=26, numeros=["1", "2", "", "3"], pad=0.1, gouttiere=0.45).move_to(P(0, 1.2))
        e1 = self.t("L'énigme du jour :", 46, JAUNE_TITRE).move_to(P(0, -0.55))
        self.au_mot("L'énigme")
        self.play(FadeIn(e1, shift=DOWN * 0.1), run_time=0.3)
        bars = VGroup(*[RoundedRectangle(width=w, height=0.14, corner_radius=0.05, fill_color=GREY_D, fill_opacity=1,
                                         stroke_width=0) for w in (1.2, 2.6, 2.2, 1.4)])
        for k, b in enumerate(bars):
            b.move_to(P(0, prog.ycentre(k))).align_to(prog.lignes[k], LEFT)
        bars[2].align_to(prog.lignes[2][0], LEFT)
        self.calcul([("un programme", WHITE, "un programme"), ("Python", FONCTION, None)], -1.3, centre=0, fs=44,
                    avec=[FadeIn(prog.cadre, scale=0.9)])
        self.calcul([("de", WHITE, None), ("3 lignes", RAISON, "3 lignes")], -2.05, centre=0, fs=44,
                    avec=[LaggedStart(*[GrowFromEdge(b, LEFT) for b in bars], lag_ratio=0.25)])
        self.attendre_voix(marge=0.2)

        # ── 02 : EN HAUT le code s'écrit ; EN BAS sa lecture, en même temps ──
        self.nouvel_ecran("02-programme", garder=(self.badge, self.titre_s, prog.cadre))
        fs = 33
        t1, p1 = self.ligne([("u prend la valeur", WHITE, None, {"u": TERME}), ("10", TERME)], fs)
        t2, p2 = self.ligne([("pour i allant de", WHITE), ("0", RAISON), ("à", WHITE), ("2 :", RAISON)], fs)
        t3, p3 = self.ligne([("u prend la valeur", WHITE, None, {"u": TERME}), ("2u", WHITE, None, {"u": TERME}),
                             ("− 5", WHITE)], fs)
        t4, p4 = self.ligne([("afficher", WHITE), ("u", TERME)], fs)
        k = min(1.0, self.largeur_texte / max(t.width for t in (t1, t2, t3, t4)))  # une seule taille
        for t, y in ((t1, -0.5), (t2, -1.15), (t3, -1.7), (t4, -2.4)):
            t.scale(k).move_to(P(0, y))
        self.taper(prog, 0, [("u =", "u prend", [p1[0]]), ("10", "10", [p1[1]])], num="Ligne 1")
        self.taper(prog, 1, [("for i in range(3):", "pour i allant", [p2[0]]), ("", "0", [p2[1]]),
                             ("", "à 2", [p2[2], p2[3]])], num="Ligne 2")
        self.taper(prog, 2, [("u =", "u prend", [p3[0]]), ("2*u", "2 u", [p3[1]]), ("- 5", "moins 5", [p3[2]])])
        self.taper(prog, 3, [("print(u)", "afficher", list(p4))], num="Ligne 3")
        self.attendre_voix(marge=0.2)

        # ── 03 : question-pause → A (45) ; puis 10, 15, 25, 45 ──
        cartes = VGroup(*[self.bouton_haut(L, nb, hauteur=1.3) for L, nb in zip("ABC", ("45", "15", "25"))])
        for c, x in zip(cartes, (-1.42, 0, 1.42)):
            c.move_to(P(x, -1.62))
        qa = self.paragraphe(["Qu'affiche", "le programme ?"], 40, y=-0.12, buff=0.08)
        self._garder_q = (prog,)

        def e1():
            self.play(prog.animate.move_to(P(0, 1.75)), run_time=0.3)
            self.au_mot("Qu'affiche")
            self.play(FadeIn(qa, shift=UP * 0.1), run_time=0.3)

        q = self.question_libre("03-question", [e1], cartes, P(0, -2.66))
        self._garder_q = ()
        self.dire("03b-reponse")
        self.au_mot("Réponse A")
        self.q_reponse(q, 0)
        tr = self.calcul([("3 tours", RAISON, "3 tours")], -2.1, centre=0.75, fs=44,
                         avec=[FadeOut(qa), FadeOut(cartes[1]), FadeOut(cartes[2]),
                               cartes[0].animate.scale(0.85).move_to(P(-1.2, -2.1))])
        lg = LigneTermes(["10", "15", "25", "45"], centre=P(0, -0.3), pas=1.06, largeur=0.94, hauteur=0.72, fs=33)
        self.suivre_tours(lg, ["10", "15", "25", "45"], prog, 2, 4, cote=DOWN, creux=0.2)
        self.play(*self.allumer_cases(lg, [3]), Indicate(tr, color=RAISON), run_time=0.4)
        self.attendre_voix(marge=0.8)

        # ── 04 : la question en commentaire : range(5) ──
        self.nouvel_ecran("04-commentaire", garder=(prog,))
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 50, JAUNE_TITRE).move_to(P(0, 3.45))
        self.play(FadeIn(et, shift=DOWN * 0.1), run_time=0.35)
        g3 = prog.glyphes(1, 15, 16)
        cinq = Text("5", font="Consolas", font_size=26, color=RAISON).move_to(g3)
        self.calcul([("avec i allant de", WHITE, "avec pour i"), ("0", RAISON, "0"), ("à", WHITE, None),
                     ("4", RAISON, "4")], -0.05, centre=0, fs=40, avec_morceau={3: [Transform(g3, cinq)]})
        self.play(Indicate(g3, color=RAISON, scale_factor=1.6), run_time=0.4)
        self.au_mot("quel nombre")
        qn = self.paragraphe(["quel nombre", "s'affiche ?"], 44, y=-0.95, buff=0.1)
        self.play(FadeIn(qn, shift=UP * 0.1), run_time=0.3)
        self.appel_commentaire(-2.3)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin ──
        self.fin_short("05-abonne")
