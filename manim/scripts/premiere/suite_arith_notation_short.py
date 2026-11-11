# suite_arith_notation_short.py
# EleveAI — Maths 1re (sans spé) — short « La notation des suites : le piège de
# l'année » (9:16), ceinture BLANCHE (échelle entière sous le titre).
# Série SUITES, épisode 03. Micro du coach : lin_suite_notation.
#   · 00-garde       : le titre, l'échelle, le pari ; le calendrier-piège qui tremble ;
#   · 01-situation   : EN HAUT le téléphone du compte scientifique, les abonnés
#                      qui arrivent ; EN BAS u(n) = abonnés en 2025 + n, la case u₀
#                      sous l'année 2025 ;
#   · 02-rang        : année après année, EN MÊME TEMPS : de nouveaux abonnés en
#                      haut, la case suivante (u₁, u₂, u₃) et son « rang » en bas ;
#   · 03/03b         : question-pause (B : u₆, 2031 − 2025 = 6), 3 s ;
#   · 04-commentaire : u₀ u₁ u₂ … ? et le 50e terme : « Réponds en commentaire ! »
#                      (réponse u₄₉, NON affichée) ;
#   · 05-abonne      : la fin du 05/11 (« Un pouce · La cloche »).
# Voix : manim/voix/premiere-suite-arith-notation-short.json (débit −6),
# calée par suite_arith_notation_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/premiere/suite_arith_notation_short.py SuiteArithNotationShort -o eleveai-maths-premiere-suite-arith-notation-short --media_dir manim/scripts/premiere/media-suite-arith-notation-short

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from suite_arith_notation import cases, etiquettes, formule, nom  # noqa: E402
from suites_commun import *  # noqa: E402,F403

AN0 = 2025
assert 2031 - AN0 == 6                       # la question : B (u₆)
assert 50 - 1 + 0 == 49                      # le commentaire : u₄₉ (non affiché)
XS3 = [-1.5, 0.0, 1.5]
Y_CASES = -2.15


def telephone(h=1.9):
    """Le téléphone du compte scientifique : un atome en logo."""
    boitier = RoundedRectangle(width=h * 0.62, height=h, corner_radius=0.16, fill_color="#0F172A", fill_opacity=1,
                               stroke_color=GREY_B, stroke_width=4)
    hp = Line(P(-0.12, h / 2 - 0.1), P(0.12, h / 2 - 0.1), stroke_color=GREY_B, stroke_width=3)
    atome = VGroup(*[Ellipse(width=0.62, height=0.22, stroke_color=PANNEAU_S, stroke_width=3).rotate(a)
                     for a in (0, PI / 3, -PI / 3)], Dot(radius=0.06, color=RAISON))
    atome.move_to(P(0, h * 0.22))
    return VGroup(boitier, hp, atome)


PANNEAU_S = "#38BDF8"


def abonne(couleur=TERME, s=1.0):
    """Un abonné : une tête et des épaules."""
    tete = Circle(radius=0.08, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(P(0, 0.1))
    epaules = Arc(radius=0.13, start_angle=0, angle=PI, fill_color=couleur, fill_opacity=1, stroke_width=0)
    epaules.move_to(P(0, -0.06))
    return VGroup(tete, epaules).scale(s)


def calendrier(h=1.5):
    """Un calendrier : anneaux, en-tête rouge, page quadrillée."""
    page = RoundedRectangle(width=h * 1.05, height=h, corner_radius=0.1, fill_color="#F8FAFC", fill_opacity=1,
                            stroke_width=0)
    tete = Rectangle(width=h * 1.05, height=h * 0.24, fill_color=PIEGE, fill_opacity=1, stroke_width=0)
    tete.align_to(page, UP)
    anneaux = VGroup(*[RoundedRectangle(width=0.07, height=0.24, corner_radius=0.03, fill_color=GREY_B,
                                        fill_opacity=1, stroke_width=0).move_to(page.get_top() + P(dx, 0.02))
                       for dx in (-h * 0.25, h * 0.25)])
    grille = VGroup(*[Square(h * 0.15, stroke_color="#94A3B8", stroke_width=1.5).move_to(
        page.get_center() + P((i - 2) * h * 0.18, -0.12 * h - (j - 1) * h * 0.18)) for i in range(5) for j in range(3)])
    return VGroup(page, tete, grille, anneaux)


class SuiteArithNotationShort(ShortSuites):
    fichier_marques = "suite_arith_notation_short_marques.json"
    nom_voix = "premiere-suite-arith-notation-short"
    identite = "Maths 1re — EleveAI"
    ceinture = "blanche"

    def morceaux(self, pieces, fs=40, couleur=WHITE):
        f = formule([(t, couleur) for t, _ in pieces], fs)
        f.nombres, f.extraits = f.parts, [e for _, e in pieces]
        return f

    def montrer_liste(self, g, extraits=None, run_time=0.18):
        if not hasattr(g, "parts"):
            return super().montrer_liste(g, extraits, run_time)
        for n, ex in zip(g.nombres, extraits or g.extraits):
            self.suivre(ex)
            self.play(FadeIn(n, scale=1.3), run_time=run_time)

    def contour(self, c, couleur=JUSTE, largeur=7):
        return c[0].animate.set_stroke(couleur, width=largeur)

    def construct(self):
        # ── 00 : la garde : le titre, l'échelle (70 %), le pari, le calendrier ──
        self.dire("00-garde")
        self.entete("La notation des suites", extrait="La notation")
        pari = self.paragraphe(["Tu paries que", "tu ne tombes pas", "dans le piège", ("de l'année ?", RAISON)],
                               self.fs_grand, buff=0.18, y=1.25)
        cal = calendrier(1.5).move_to(P(0, -1.55))
        for ligne, ex in zip(pari, ("Tu paries", "tu ne", "dans le piège", "l'année")):
            self.au_mot(ex)
            anims = [FadeIn(ligne, shift=UP * 0.1)]
            if ex == "dans le piège":
                anims.append(FadeIn(cal, scale=0.7))
            self.play(*anims, run_time=0.3)
        self.play(Wiggle(cal, scale_value=1.15, rotation_angle=0.08 * TAU), run_time=0.7)
        self.attendre_voix(marge=0.2)

        # ── 01 : EN HAUT le compte et ses abonnés ; EN BAS u(n) et la case u₀ ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s))
        tete = self.paragraphe([("Un compte de vulgarisation", JAUNE_TITRE), ("scientifique", JAUNE_TITRE)], 36,
                               buff=0.06, y=2.3)
        self.au_mot("Un compte")
        self.play(FadeIn(tete[0], shift=UP * 0.1), run_time=0.35)
        tel = telephone(1.4).move_to(P(-1.25, 1.05))
        self.au_mot("scientifique")
        self.play(FadeIn(tete[1], shift=UP * 0.1), FadeIn(tel, shift=UP * 0.2), run_time=0.4)
        self.play(Rotate(tel[2][:3], PI, about_point=tel[2][3].get_center()), run_time=0.6)
        grille = [P(-0.2 + 0.56 * (k % 4), 1.55 - 0.5 * (k // 4)) for k in range(12)]
        foule = VGroup(*[abonne(s=1.15).move_to(p) for p in grille])
        ab = self.t("abonnés", 30, TERME).move_to(P(0.64, 0.2))
        self.au_mot("abonnés")
        self.play(LaggedStart(*[GrowFromCenter(a) for a in foule[:3]], lag_ratio=0.2), FadeIn(ab), run_time=0.45)
        fa = formule([("u(n) :", TERME), ("les abonnés", WHITE)], 42).move_to(P(0, -0.4))
        fb = formule([("en", WHITE), ("2025 + n", RAISON)], 42).move_to(P(0, -0.88))
        kf = min(1.0, self.largeur_texte / fa.width)
        fa.scale(kf)
        fb.scale(kf)
        self.au_mot("On note")
        self.suivre("u de n")
        self.play(FadeIn(fa.parts[0], scale=1.2), run_time=0.3)
        self.suivre("le nombre")
        self.play(FadeIn(fa.parts[1], shift=UP * 0.1), run_time=0.3)
        self.suivre("2025")
        self.play(FadeIn(fb, shift=UP * 0.1), run_time=0.3)
        cs = cases([f"u_{{{k}}}" for k in range(3)], XS3, Y_CASES, 1.0, 0.72, 44)
        ans = etiquettes([str(AN0 + k) for k in range(3)], cs, UP, 24, GREY_A, 0.1)
        rangs = etiquettes([f"rang {k}" for k in range(3)], cs, DOWN, 26, RAISON, 0.12)
        self.au_mot("u de 0")
        self.play(FadeIn(cs[0], scale=0.85), run_time=0.3)
        self.au_mot("2025", n=2)
        self.play(FadeIn(ans[0], scale=1.3), self.contour(cs[0]), run_time=0.35)
        self.attendre_voix(marge=0.2)

        # ── 02 : année après année : abonnés EN HAUT, case suivante EN BAS ──
        self.dire("02-rang")
        self.au_mot("rang")
        self.play(FadeIn(rangs[0], shift=UP * 0.1), cs[0][0].animate.set_stroke(TERME, width=3), run_time=0.3)
        self.au_mot("on compte")
        for k in (1, 2):
            fl = Arrow(ans[k - 1].get_right(), ans[k].get_left(), buff=0.06, color=RAISON, stroke_width=4,
                       max_tip_length_to_length_ratio=0.35)
            p1 = self.t("+1", 26, RAISON, audit=False).next_to(fl, UP, buff=0.1)  # une année de plus
            self.play(GrowArrow(fl), FadeIn(p1), FadeIn(cs[k], scale=0.85), FadeIn(ans[k]), FadeIn(rangs[k]),
                      LaggedStart(*[GrowFromCenter(a) for a in foule[3 + 4 * (k - 1):3 + 4 * k + (1 if k == 2 else 0)]],
                                  lag_ratio=0.15), run_time=0.5)
        self.attendre_voix(marge=0.3)

        # ── 03 : question-pause → B (u₆) ──
        choix = [self.morceaux([("u_{2031}", "2031")], 60), self.morceaux([("u_{6}", "6")], 60),
                 self.morceaux([("u_{7}", "7")], 60)]
        lq = [self.t(tx, 44, c, 1e9) for tx, c in (("Comment s'écrit", WHITE), ("le nombre d'abonnés", WHITE),
                                                   ("en 2031 ?", RAISON))]
        kq = min(1.0, self.largeur_texte / max(m.width for m in lq))
        for m in lq:
            m.scale(kq)
        q = self.poser_question("03-question", list(zip(lq, ("Comment", "le nombre", "2031"))),
                                choix, 1, y_question=2.85)
        self.dire("03b-reponse")
        ok = self.q_reponse(q, 1)
        dy = q.cartes[0].get_center() - q.cartes[1].get_center()
        self.play(FadeOut(q.cartes[0]), FadeOut(q.cartes[2]), q.cartes[1].animate.shift(dy), ok.animate.shift(dy),
                  run_time=0.3)
        y = q.cartes[1].get_bottom()[1] - 0.85
        c = formule([("2031", WHITE), ("−", WHITE), ("2025", WHITE), ("=", WHITE), ("6", JUSTE)], 46).move_to(P(0, y))
        if c.width > 3.9:
            c.scale_to_fit_width(3.9)
        for part, ex in zip(c.parts, ("2031", None, "2025", None, "6")):
            if ex:
                self.suivre(ex)
            self.play(FadeIn(part, shift=UP * 0.1), run_time=0.18)
        u6 = formule([("c'est", WHITE), ("u_{6}", JUSTE)], 64).move_to(P(0, y - 1.25))
        self.au_mot("c'est u indice 6")
        cad = self.encadre(u6.parts[1], JUSTE, 0.12)
        self.play(FadeIn(u6, scale=1.2), Create(cad), run_time=0.35)
        self.insister(VGroup(u6, cad), 1.08)
        self.attendre_voix(marge=0.3)

        # ── 04 : la question en commentaire, dans l'ordre de la voix ──
        self.nouvel_ecran("04-commentaire", garder=(self.badge,))
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 54, JAUNE_TITRE).move_to(P(0, 3.45))
        self.play(FadeIn(et, shift=DOWN * 0.1), run_time=0.35)
        xs = [-1.62, -0.81, 0.0, 0.81, 1.62]
        lc = cases(["u_{0}", "u_{1}", "u_{2}", "…", "?"], xs, 1.9, 0.74, 0.74, 44)
        pos = etiquettes(["1er", "2e", "3e", "", "50e"], lc, UP, 28, GREY_A, 0.12)
        self.au_mot("u indice 0")
        self.play(LaggedStart(*[FadeIn(c, scale=0.85) for c in lc[:4]], *[FadeIn(p) for p in pos[:3]], lag_ratio=0.1),
                  run_time=0.5)
        question = self.paragraphe([("Quel est l'indice", WHITE), ("de son 50e terme ?", RAISON)], 52, buff=0.18, y=0.2)
        self.au_mot("Quel est")
        self.play(FadeIn(question[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("50e")
        self.play(FadeIn(question[1], shift=UP * 0.1), FadeIn(lc[4], scale=1.3), FadeIn(pos[4], scale=1.3), run_time=0.35)
        self.play(Indicate(lc[4], color=RAISON, scale_factor=1.2), run_time=0.4)
        self.appel_commentaire(-1.75, fs=50)
        self.attendre_voix(marge=0.6)

        # ── 05 : la fin ──
        self.fin_short("05-abonne")
