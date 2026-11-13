# suite_recurrence_spe_short.py
# EleveAI — Maths 1re spé — short « Suite par récurrence : tu paries que tu
# prévois l'épisode 3 en 10 secondes ? » (9:16), ceinture BLANCHE (échelle
# entière à 70 % sous le titre). Série SUITES, épisode 19. Micro : suite_recurrence.
#   · 00-garde      : le titre, l'échelle, le pari ; l'écran de la série ;
#   · 01-situation  : EN HAUT l'écran « Épisode 1 » et 3 spectateurs (millions) ;
#                     au milieu u₁ = 3, « × 2, puis − 1 », uₙ₊₁ = 2uₙ − 1 ; EN BAS
#                     les cases u₁, u₂, u₃ (u₁ = 3 se remplit EN MÊME TEMPS) ;
#   · 02-calcul     : les spectateurs doublent (6) puis un s'en va (5) ; la case
#                     u₂ = 5 et son saut « × 2 − 1 », EN MÊME TEMPS ;
#   · 03/03b        : question-pause (C : 9), 3 s ; 2 × 5 = 10, 10 − 1 = 9 ;
#                     le piège : oublier le − 1 ;
#   · 04-commentaire: u₅ ? (réponse : u₄ = 17, u₅ = 33, NON affichée) ;
#   · 05-abonne     : la fin du 05/11 (« Un pouce · La cloche »).
# Code couleur : bleu = termes, orange = × 2, rouge = le − 1 (le piège), vert = juste.
# Voix : manim/voix/premiere-spe-suite-recurrence-short.json (débit −6), calée
# par suite_recurrence_spe_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/suite_recurrence_spe_short.py SuiteRecurrenceShort -o eleveai-maths-premiere-spe-suite-recurrence-short --media_dir manim/scripts/premiere/media-suite-recurrence-short

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suites_commun import *  # noqa: E402,F403
from suite_arith_graphique import OutilsGraphique  # noqa: E402  (ép. 07)
from suite_geo_reconnaitre import AuditMilliers  # noqa: E402  (ép. 09)
from suite_geo_terme_rang import OutilsEp12  # noqa: E402  (ép. 12)
from suite_geo_interpreter_short import SuiteGeoInterpreterShort as _S16  # noqa: E402  (ép. 16)

assert 2 * 3 - 1 == 5 and 2 * 5 - 1 == 9                    # u₂ ; question C (u₃ = 9)
assert 2 * 9 - 1 == 17 and 2 * 17 - 1 == 33                  # commentaire : u₅ = 33

PLACES = [(0.55 + 0.6 * (k % 3), 2.3 - 0.55 * (k // 3)) for k in range(9)]


def tele(s=1.0, texte=None):
    """L'écran de la série : le cadre, l'image, le bouton lecture, le pied."""
    cadre = RoundedRectangle(width=1.9, height=1.25, corner_radius=0.12, fill_color="#111827", fill_opacity=1,
                             stroke_color=GREY_B, stroke_width=3)
    image = RoundedRectangle(width=1.6, height=0.95, corner_radius=0.06, fill_color="#1E3A8A", fill_opacity=1,
                             stroke_width=0)
    lune = Circle(radius=0.14, fill_color="#FDE68A", fill_opacity=1, stroke_width=0).move_to(P(0.45, 0.22))
    colline = Polygon(P(-0.8, -0.47), P(-0.25, 0.05), P(0.25, -0.2), P(0.8, -0.47), fill_color="#0F766E",
                      fill_opacity=1, stroke_width=0)
    lecture = Triangle(fill_color=WHITE, fill_opacity=0.9, stroke_width=0).scale(0.15).rotate(-PI / 2)
    pied = Polygon(P(-0.25, -0.62), P(0.25, -0.62), P(0.4, -0.82), P(-0.4, -0.82), fill_color=GREY_C,
                   fill_opacity=1, stroke_width=0)
    return VGroup(pied, cadre, image, lune, colline, lecture).scale(s)


def spectateur(p, couleur=TERME, s=1.0):
    """Un spectateur (un million) : la tête et les épaules."""
    tete = Circle(radius=0.1, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(P(0, 0.12))
    epaules = Sector(radius=0.19, angle=PI, start_angle=0, fill_color=couleur, fill_opacity=1,
                     stroke_width=0).move_to(P(0, -0.1))
    return VGroup(tete, epaules).scale(s).move_to(p)


class SuiteRecurrenceShort(AuditMilliers, OutilsEp12, OutilsGraphique, ShortSuites):
    fichier_marques = "suite_recurrence_spe_short_marques.json"
    nom_voix = "premiere-spe-suite-recurrence-short"
    identite = "Maths 1re spé — EleveAI"
    ceinture = "blanche"
    place_coche = 0.15
    entete = _S16.entete
    q_reponse = _S16.q_reponse

    def regrouper(self, *groupes):
        """Chaque groupe redevient UN objet de la scène (ses morceaux montrés un
        à un y étaient à part) : nouvel_ecran(garder=…) peut alors le garder."""
        for g in groupes:
            self.remove(*g.get_family())
            self.add(g)

    def construct(self):
        # ── 00 : la garde : le titre, l'échelle (70 %), le pari ──
        self.dire("00-garde")
        self.entete("Suite par récurrence", extrait="Suite par", fs=38)
        self.calcul([("Tu paries que", WHITE, "Tu paries")], 2.15, centre=0, fs=42)
        self.calcul([("tu prévois", WHITE, "tu prévois")], 1.55, centre=0, fs=42)
        self.calcul([("l'épisode", RAISON, "l'épisode"), ("3", RAISON, "3")], 0.9, centre=0, fs=50)
        self.calcul([("en 10 secondes ?", WHITE, "10")], 0.25, centre=0, fs=42)
        tv = tele(1.15).move_to(P(0, -1.55))
        self.play(FadeIn(tv, shift=UP * 0.2), run_time=0.35)
        self.attendre_voix(marge=0.2)

        # ── 01 : EN HAUT l'épisode 1 et 3 millions ; EN BAS les cases ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s))
        tv = tele(1.0).move_to(P(-1.0, 1.85))
        ep = self.t("Épisode 1", 26, GREY_A, audit=False).move_to(P(-1.05, 0.95))
        self.au_mot("Une série")
        self.play(FadeIn(tv, shift=UP * 0.15), run_time=0.35)
        self.suivre("3 millions")
        foule = VGroup(*[spectateur(P(*PLACES[k])) for k in range(3)])
        mil = self.t("3 millions", 26, TERME).move_to(P(1.15, 0.95))
        self.play(LaggedStart(*[GrowFromCenter(s) for s in foule], lag_ratio=0.3), FadeIn(mil), run_time=0.5)
        self.au_mot("l'épisode 1")
        self.play(FadeIn(ep, shift=UP * 0.1), run_time=0.25)
        lg = LigneTermes(["3", "5", ""], centre=P(0, -2.1), pas=1.4, largeur=1.05, hauteur=0.72, fs=38,
                         noms=[u(1), u(2), u(3)], fs_noms=28)
        lg.cases[1][1].set_opacity(0)          # u₂ = 5 : il s'allume à l'écran 02, quand la voix le dit
        self.au_mot("u indice 1 égale")
        l1 = self.calcul([("u₁ =", TERME, None), ("3", TERME, "3")], 0.25, centre=0, fs=46)
        self.montrer_case(lg, 0)
        self.au_mot("À chaque nouvel")
        self.play(*[FadeIn(lg.cases[k][0]) for k in (1, 2)], *[FadeIn(lg.noms[k]) for k in (1, 2)], run_time=0.3)
        l2 = self.calcul([("× 2,", RAISON, "multiplié par 2"), ("puis", WHITE, "puis"), ("− 1", PIEGE, "on enlève 1")],
                         -0.45, centre=0, fs=42)
        f = self.calcul([("uₙ₊₁ =", TERME, "u indice n plus 1"), ("2uₙ", RAISON, "2 u indice n"),
                         ("− 1", PIEGE, "moins 1")], -1.15, centre=0, fs=38)
        cf = self.encadre(f, RAISON, 0.12)
        self.play(Create(cf), run_time=0.3)
        self.attendre_voix(marge=0.3)

        # ── 02 : épisode 2 : 6 spectateurs, puis 5 ; la case u₂ = 5 ──
        self.regrouper(lg, foule, f, cf)
        self.nouvel_ecran("02-calcul", garder=(self.badge, self.titre_s, tv, foule, mil, ep, lg, f, cf))
        ep2 = self.t("Épisode 2", 26, GREY_A, audit=False).move_to(ep)
        self.au_mot("Épisode 2")
        self.play(Transform(ep, ep2), VGroup(f, cf).animate.move_to(P(0, 0.25)), run_time=0.35)
        plus = VGroup(*[spectateur(P(*PLACES[k]), RAISON) for k in range(3, 6)])
        part = plus[2]
        c = self.calcul([("u₂ =", TERME, "u indice 2"), ("2 ×", RAISON, "2 fois"), ("3", TERME, "3"),
                         ("− 1", PIEGE, "moins 1"), ("=", WHITE, "égale"), ("5", JUSTE, "5")], -0.5, centre=-0.1, fs=28,
                        avec_morceau={1: [*[TransformFromCopy(a, b) for a, b in zip(foule, plus)]],
                                      3: [part.animate.set_color(PIEGE)]})
        sa = lg.saut(0, "× 2 − 1", cote=UP, fs=28)
        sa[1]._pas_audit = True
        m5 = self.t("5 millions", 26, TERME).move_to(mil)
        self.play(FadeOut(part, shift=RIGHT * 0.4), Create(sa[0]), FadeIn(sa[1]), lg.cases[1][1].animate.set_opacity(1),
                  Transform(mil, m5), run_time=0.4)
        cad5 = self.encadre(c[-1].copy().shift(RIGHT * 0.1), JUSTE, 0.07)
        self.play(c[-1].animate.shift(RIGHT * 0.1), Create(cad5), *self.allumer_cases(lg, [1]), run_time=0.3)
        self.attendre_voix(marge=0.3)

        # ── 03 : question-pause → C (9) ──
        corps = [self.t(v, 50, WHITE, 1e9) for v in ("10", "5", "9")]
        cartes = VGroup(*[self.bouton(L, c, 3.0, 48) for L, c in zip("ABC", corps)])
        cartes.arrange(DOWN, buff=0.2).move_to(P(0, 0)).align_to(P(0, 1.3), UP)
        rap = VGroup(self.t("u₂ = 5", 34, GREY_A, audit=False), self.t("uₙ₊₁ = 2uₙ − 1", 34, GREY_A, audit=False))
        rap.arrange(DOWN, buff=0.12).move_to(P(0, 1.95))

        ql = []

        def e1():
            ql.append(self.calcul([("Combien vaut", WHITE, "Combien vaut"), ("u₃ ?", TERME, "u indice 3")], 2.7, centre=0, fs=44))

        q = self.question_libre("03-question", [e1], cartes, P(0, cartes.get_bottom()[1] - 0.42),
                                dessin=lambda: self.play(FadeIn(rap), run_time=0.25))
        self.dire("03b-reponse")
        self.au_mot("Réponse C")
        self.q_reponse(q, 2)
        b = cartes[2]
        sortie = [FadeOut(cartes[0]), FadeOut(cartes[1]), FadeOut(q.tete), FadeOut(rap), *[FadeOut(m) for m in ql],
                  b.animate.move_to(P(0, 2.75))]
        self.calcul([("2 ×", RAISON, "2 fois"), ("5", TERME, "5"), ("= 10", WHITE, "10")], 1.45, centre=0, fs=48,
                    avec_morceau={0: sortie})
        c = self.calcul([("10", WHITE, None), ("− 1", PIEGE, "moins 1"), ("=", WHITE, None), ("9", JUSTE, "9")], 0.6,
                        centre=-0.1, fs=48)
        cad = self.encadre(c[-1].copy().shift(RIGHT * 0.15), JUSTE, 0.12)
        self.play(c[-1].animate.shift(RIGHT * 0.15), Create(cad), run_time=0.25)
        p1 = self.paragraphe(["On part du", ("terme précédent,", TERME)], 38, buff=0.1, y=-0.65)
        self.au_mot("On part")
        self.play(FadeIn(p1, shift=UP * 0.1), run_time=0.3)
        p2 = self.paragraphe(["et on n'oublie pas", ("le − 1 !", PIEGE)], 38, buff=0.1, y=-1.95)
        self.au_mot("on n'oublie")
        self.play(FadeIn(p2[0], shift=UP * 0.1), run_time=0.3)
        self.suivre("1")
        self.play(FadeIn(p2[1], shift=UP * 0.1), run_time=0.3)
        self.insister(p2[1], 1.2)
        self.attendre_voix(marge=0.6)

        # ── 04 : la question en commentaire ──
        self.nouvel_ecran("04-commentaire")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 50, JAUNE_TITRE).move_to(P(0, 3.45))
        lg = LigneTermes(["3", "5", "9", "?", "?"], centre=P(0, 0.05), pas=0.85, largeur=0.66, hauteur=0.62, fs=30,
                         noms=[u(k) for k in range(1, 6)], fs_noms=26)
        for c in lg.cases[:3]:
            c[1]._pas_audit = True            # les termes déjà calculés (écrans 01 à 03)
        self.play(FadeIn(et, shift=DOWN * 0.1), FadeIn(lg), run_time=0.35)
        self.au_mot("combien vaut")
        cv = self.t("Combien vaut", 44).move_to(P(0, 2.5))
        self.play(FadeIn(cv, shift=UP * 0.1), run_time=0.3)
        self.au_mot("u indice 5")
        g = self.t("u₅ ?", 96, TERME).move_to(P(0, 1.35))
        self.play(FadeIn(g, scale=1.3), *self.allumer_cases(lg, [4], RAISON), run_time=0.35)
        self.appel_commentaire(-1.55)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin ──
        self.fin_short("05-abonne")
