# suite_limite_interpreter_short.py
# EleveAI — Maths Terminale (spé) — short « Lire une limite sur un graphique »
# (9:16), ceinture BLANCHE (échelle entière sous le titre). Série SUITES du
# lycée, épisode 33. Micro du coach : limite_suite_interpreter (genLimNuage :
# « les points se rapprochent de la droite d'équation y = L » ; h4).
#   · 00-garde       : le titre, l'échelle (70 %), le pari en gros ; EN BAS le
#                      petit nuage qui descend et se tasse (dès « Tu paries ») ;
#   · 01-situation   : EN HAUT Yasmine, cardiologue, le cœur qui bat de plus en
#                      plus lentement ; EN BAS, dès Yasmine, quatre cases en
#                      pointillé qui se remplissent à chaque battement : 120, 90,
#                      75, 67,5 ; puis uₙ = 60 + 60 × 0,5ⁿ ;
#   · 02-graphique   : le nuage : les points descendent et se rapprochent d'une
#                      droite horizontale (sans son nombre : c'est la question) ;
#   · 03/03b         : question-pause (A : converger vers 60), 3 s ; le petit
#                      nuage en attente, puis les trois boutons ; 0,5ⁿ → 0, le
#                      trait 60, « rythme au repos » ;
#   · 04-commentaire : uₙ = 70 + 50 × 0,5ⁿ : vers quel rythme revient le cœur ?
#                      « Réponds en commentaire ! » (réponse 70, NON affichée) ;
#   · 05-abonne      : la fin commune du 05/11 (« Un pouce · La cloche »).
# Code couleur (module commun) : bleu = termes, orange = ce qui fond (0,5ⁿ),
# vert = juste (la limite), rouge = le cœur.
# Voix : manim/voix/terminale-suite-limite-interpreter-short.json (débit −6),
# calée par suite_limite_interpreter_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/terminale/suite_limite_interpreter_short.py SuiteLimiteInterpreterShort -o eleveai-maths-terminale-suite-limite-interpreter-short --media_dir manim/scripts/terminale/media-suite-limite-interpreter-short

import math
import re
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))
sys.path.insert(1, str(ICI.parent / "premiere"))

from suites_commun import *  # noqa: E402,F403
from suite_limite_interpreter import OutilsLimite  # noqa: E402

COEUR = [60 + 60 * 0.5 ** n for n in range(30)]
assert COEUR[:4] == [120, 90, 75, 67.5] and all(c > 60 for c in COEUR)     # la réponse A : 60
assert COEUR[29] - 60 < 1e-6 and 67.5 > 60
assert all(70 + 50 * 0.5 ** n > 70 for n in range(30))                       # le commentaire : 70
PEAU, ROUGE_COEUR = "#8d5524", "#ef4444"


def yasmine(s=1.0):
    """Yasmine, cardiologue : blouse blanche, stéthoscope, cheveux attachés."""
    tete = Circle(radius=0.28, fill_color=PEAU, fill_opacity=1, stroke_width=0).move_to(P(0, 1.0))
    cheveux = Sector(radius=0.31, angle=PI, start_angle=0, fill_color="#111827", fill_opacity=1,
                     stroke_width=0).move_to(P(0, 1.18))
    queue = Circle(radius=0.13, fill_color="#111827", fill_opacity=1, stroke_width=0).move_to(P(0.3, 1.12))
    corps = RoundedRectangle(width=0.95, height=1.15, corner_radius=0.25, fill_color="#f1f5f9", fill_opacity=1,
                             stroke_width=0).move_to(P(0, 0.12))
    steth = VMobject(stroke_color="#334155", stroke_width=4).set_points_smoothly(
        [P(-0.2, 0.62), P(-0.25, 0.25), P(0, 0.05), P(0.25, 0.25), P(0.2, 0.62)])
    pastille = Circle(radius=0.07, fill_color=GREY_B, fill_opacity=1, stroke_width=0).move_to(P(0, 0.02))
    return VGroup(corps, steth, pastille, tete, cheveux, queue).scale(s)


def coeur(s=1.0, couleur=ROUGE_COEUR):
    """Un cœur dessiné : deux lobes et une pointe."""
    g = Circle(radius=0.25, fill_color=couleur, fill_opacity=1, stroke_width=0).move_to(P(-0.2, 0.1))
    d = g.copy().move_to(P(0.2, 0.1))
    pointe = Polygon(P(-0.43, -0.02), P(0.43, -0.02), P(0, -0.5), fill_color=couleur, fill_opacity=1, stroke_width=0)
    return VGroup(g, d, pointe).scale(s)


def trou(l=0.95, h=0.72, couleur=GREY_B):
    """Une case à remplir, en pointillé."""
    return DashedVMobject(RoundedRectangle(width=l, height=h, corner_radius=0.12, stroke_color=couleur,
                                           stroke_width=3), num_dashes=22)


class SuiteLimiteInterpreterShort(OutilsLimite, ShortSuites):
    fichier_marques = "suite_limite_interpreter_short_marques.json"
    nom_voix = "terminale-suite-limite-interpreter-short"
    identite = "Maths Tle — EleveAI"
    ceinture = "blanche"
    hauteur_bouton = 1.22
    buff_boutons = 0.26
    place_coche = -0.08
    Y_TITRE, Y_ECHELLE = 3.56, 2.86      # de l'air entre le titre et l'échelle des ceintures

    def construire(self, morceaux, fs=40, larg=None):
        return super().construire(morceaux, fs, larg or self.largeur_texte / 1.05)

    def ligne(self, morceaux, y, fs=40, avec=(), larg=None, avec_k=None, rt=0.25, rt_mid=0.22):
        return self.montrer(self.construire(morceaux, fs, larg).move_to(P(0, y)), avec, rt=rt, avec_k=avec_k,
                            rt_mid=rt_mid)

    def entete(self, titre, extrait=None, fs=44):
        """Comme l'entête commun, mais le titre plus haut et l'échelle (70 %) plus bas."""
        if getattr(self, "_margo", None) is None:
            self._margo = self.margo_bas()
        self.badge = echelle_ceintures(self.ceinture).scale_to_fit_width(config.frame_width * 0.7)
        self.badge.move_to(P(0, self.Y_ECHELLE))
        self.titre_s = self.t(titre, fs, JAUNE_TITRE, 3.9).move_to(P(0, self.Y_TITRE))
        self.add(self.badge)
        self.au_mot(extrait or titre)
        self.play(Write(self.titre_s), run_time=0.5)
        return self.titre_s, self.badge

    def bouton(self, lettre, corps, largeur, fs):
        """Un bouton : rond A/B/C, le corps (34-36 pt), marge ≥ 20 px, la coche à droite sans toucher le texte."""
        rond = Circle(radius=0.21, fill_color=TERME, fill_opacity=1, stroke_width=0)
        lt = Text(lettre, font_size=30, color=WHITE, weight=BOLD).move_to(rond)
        c = corps if isinstance(corps, Mobject) else self.t(corps, 36, WHITE, 1e9)
        place = largeur - 0.15 - rond.width - 0.32 - 0.75
        if c.width > place:
            c.scale_to_fit_width(place)
        ligne = VGroup(VGroup(rond, lt), c).arrange(RIGHT, buff=0.32)
        cadre = RoundedRectangle(width=largeur, height=max(self.hauteur_bouton, ligne.height + 0.36),
                                 corner_radius=0.14, stroke_color=TERME, stroke_width=3, fill_color=FOND_CARTE,
                                 fill_opacity=1)
        ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.18, LEFT)
        return VGroup(cadre, ligne)

    def battre(self, c, periode=0.7):
        """Le cœur bat (un petit coup, puis repos) ; c.periode règle le rythme."""
        c.periode, c.phase = periode, 0.0
        base = c.copy()

        def maj(m, dt):
            m.phase = (m.phase + dt / m.periode) % 1.0
            k = 1 + 0.16 * math.exp(-((m.phase - 0.12) / 0.07) ** 2)
            m.become(base.copy().scale(k))
            m.periode, m.phase = c.periode, c.phase
        c.add_updater(maj)
        return c

    def nuage(self, bas, haut, x0=-1.6, x1=1.45, nb=9, r=0.075, ua=40):
        nu = NuageTermes((0, nb + 0.6), (ua, 126), P(x0, bas), P(x1, haut), fs=26)
        pts = [nu.point(n, COEUR[n], r=r) for n in range(nb + 1)]
        return nu, pts

    def droite60(self, nu, couleur=GREY_A, texte=None):
        y = nu.G(0, 60)[1]
        tr = DashedLine(P(nu.ax_u.get_center()[0], y), P(nu.X1 + 0.1, y), color=couleur, stroke_width=4,
                        dash_length=0.1)
        if texte:
            return VGroup(tr, self.t(texte, 28, couleur).next_to(tr, LEFT, buff=0.1))
        return VGroup(tr)

    def construct(self):
        # ── 00 : la garde : le titre, l'échelle (70 %), le pari ; EN BAS le nuage qui se tasse ──
        self.dire("00-garde")
        self.entete("Limite d'une suite", extrait="Limite d'une suite")
        pari = self.paragraphe(["Tu paries que", ("tu lis la limite", RAISON), "sur un graphique",
                                ("en 3 secondes ?", JUSTE)], 46, buff=0.14, y=1.35)
        nu0, p0 = self.nuage(-2.8, -0.45, nb=9)
        # le repère vide en bas dès le titre (la moitié basse jamais vide plus de 2 s)
        self.play(Create(nu0.ax_n), Create(nu0.ax_u), FadeIn(nu0.lab_n), FadeIn(nu0.lab_u), run_time=0.5)
        for k, (l, ex) in enumerate(zip(pari, ("Tu paries", "tu lis", "sur un graphique", "3 secondes"))):
            self.au_mot(ex)
            anims = [FadeIn(l, shift=UP * 0.1)]
            if k == 2:
                anims.append(LaggedStart(*[GrowFromCenter(d) for d in p0], lag_ratio=0.15))
            self.play(*anims, run_time=0.35 if k != 2 else 0.9)
        chrono = VGroup(Circle(radius=0.3, stroke_color=JUSTE, stroke_width=4),
                        Line(P(0, 0), P(0, 0.24), stroke_color=JUSTE, stroke_width=4)).move_to(P(1.45, -0.75))
        self.play(FadeIn(chrono), run_time=0.2)
        self.play(Rotate(chrono[1], -TAU, about_point=chrono[0].get_center()), run_time=1.0)
        self.attendre_voix(marge=0.4)

        # ── 01 : EN HAUT Yasmine et le cœur ; EN BAS les cases qui se remplissent EN MÊME TEMPS ──
        self.nouvel_ecran("01-situation", garder=(self.badge, self.titre_s))
        perso = yasmine(0.62).move_to(P(-1.35, 1.65))
        nom = self.t("Yasmine", 44, JAUNE_TITRE).move_to(P(0.65, 2.05))
        metier = self.t("cardiologue", 34, TERME).move_to(P(0.65, 1.5))
        # des cases à la largeur de leur nombre, marge intérieure ≥ 0,15 (≈ 36 px) de chaque côté
        vals = ["120", "90", "75", "67,5"]
        for fsc in (34, 33, 32, 31, 30):
            LS = [Text(v, font_size=fsc).width + 0.34 for v in vals]
            gap = (4.16 - sum(LS)) / 3
            if gap >= 0.08:
                break
        x, XS = -(sum(LS) + 3 * gap) / 2, []
        for w in LS:
            XS.append(x + w / 2)
            x += w + gap
        trous = VGroup(*[trou(w).move_to(P(x, -0.35)) for x, w in zip(XS, LS)])
        lg = LigneTermes(vals, xs=XS, centre=P(0, -0.35), largeur=1.6, hauteur=0.72, fs=fsc,
                         noms=["u₀", "u₁", "u₂", "u₃"], fs_noms=30)
        for c, w in zip(lg.cases, LS):
            c[0].stretch_to_fit_width(w)
            c[1].move_to(c[0])
        self.au_mot("Yasmine")
        self.play(FadeIn(perso, shift=UP * 0.1), FadeIn(nom, shift=UP * 0.1), Create(trous), run_time=0.35)
        self.au_mot("cardiologue")
        self.play(FadeIn(metier, shift=UP * 0.08), run_time=0.3)
        c1 = coeur(0.85).move_to(P(0.65, 0.65))
        self.au_mot("le cœur")
        self.play(GrowFromCenter(c1), run_time=0.3)
        self.battre(c1, 0.45)
        self.au_mot("ralentit")
        c1.periode = 0.7
        for k, v in enumerate(lg.valeurs):
            self.suivre(v)
            c1.periode = 0.75 + 0.2 * k
            self.play(FadeOut(trous[k]), run_time=0.01)
            self.montrer_case(lg, k, run_time=0.25)
        bpm = self.t("battements par minute", 28, GREY_A).move_to(P(0, -1.3))
        self.au_mot("battements")
        self.play(FadeIn(bpm, shift=UP * 0.08), run_time=0.3)
        f = self.construire([("uₙ =", TERME, "u indice n"), ("60", WHITE, "60"), ("+ 60", WHITE, "plus 60"),
                             ("×", WHITE, None), ("0,5ⁿ", RAISON, "0,5")], 44)
        f.move_to(P(0, -2.0))
        self.au_mot("Elle modélise")
        self.play(FadeOut(bpm), run_time=0.2)
        self.montrer(f)
        n0 = self.construire([("à partir de", GREY_A, "à partir"), ("n = 0", GREY_A, "0")], 34).move_to(P(0, -2.72))
        self.montrer(n0)
        self.attendre_voix(marge=0.3)

        # ── 02 : le graphique : les points descendent vers une droite horizontale ──
        c1.clear_updaters()
        self.nouvel_ecran("02-graphique", garder=(self.badge, self.titre_s))
        c1 = coeur(0.6).move_to(P(1.35, 2.05))
        self.play(GrowFromCenter(c1), run_time=0.25)
        self.battre(c1, 1.1)
        nu, pts = self.nuage(-2.8, 1.25, nb=9, r=0.085)
        self.play(Create(nu.ax_n), Create(nu.ax_u), FadeIn(nu.lab_n), FadeIn(nu.lab_u), run_time=0.3)
        self.au_mot("les points descendent")
        self.play(LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=0.18), run_time=1.3)
        d60 = self.droite60(nu, JUSTE)
        self.au_mot("droite horizontale")
        self.play(Create(d60), run_time=0.45)
        self.play(Indicate(VGroup(*pts[4:]), color=JUSTE, scale_factor=1.4), run_time=0.6)
        self.attendre_voix(marge=0.3)
        c1.clear_updaters()

        # ── 03 : question-pause → A (converger vers 60) ──
        que = self.t("La suite semble :", 46)

        def attente():
            """Le bas ne reste pas vide : le nuage attend jusqu'aux cadres des boutons."""
            nu_a, p_a = self.nuage(-2.4, 0.9, nb=9)
            self._attente_q = VGroup(nu_a, *p_a, self.droite60(nu_a, GREY_B))
            self.play(FadeIn(self._attente_q, shift=UP * 0.15), run_time=0.3)
        q = self.poser_question("03-question", [(que, "La suite semble")],
                                ["converger\nvers 60", "converger\nvers 67,5", "tendre\nvers −∞"], 0, dessin=attente)
        self.dire("03b-reponse")
        ok = self.q_reponse(q, 0)
        y = 2.9 - q.cartes[0].height / 2
        nu, pts = self.nuage(-2.9, -0.95, x0=-1.45, nb=9)
        d60 = self.droite60(nu, JUSTE, "60")
        self.ligne([("0,5ⁿ", RAISON, "0,5"), ("→ 0", WHITE, "tend vers 0")], y - 0.55, fs=46,
                   avec_k={0: [FadeOut(q.tete), FadeOut(q.question), VGroup(q.cartes[0], ok).animate.move_to(P(0, 2.9)),
                               FadeOut(q.cartes[1]), FadeOut(q.cartes[2]), Create(nu.ax_n), Create(nu.ax_u),
                               FadeIn(nu.lab_n), FadeIn(nu.lab_u),
                               LaggedStart(*[GrowFromCenter(d) for d in pts], lag_ratio=0.1)]})
        self.ligne([("le cœur revient", WHITE, "le cœur revient")], y - 1.12, fs=33)
        self.ligne([("vers", WHITE, "vers"), ("60", JUSTE, "60")], y - 1.62, fs=33,
                   avec_k={1: [Create(d60[0]), FadeIn(d60[1], scale=1.3),
                               *[d.animate.set_color(JUSTE) for d in pts[3:]]]})
        self.ligne([("son rythme au repos", JUSTE, "son rythme")], y - 2.14, fs=38, larg=4.1)
        self.attendre_voix(marge=0.4)

        # ── 04 : la question en commentaire, dans l'ordre de la voix ──
        self.nouvel_ecran("04-commentaire")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 54, JAUNE_TITRE).move_to(P(0, self.Y_TITRE - 0.02))
        c4 = coeur(0.8).move_to(P(0, 2.45))
        # un grand « ? » attend en bas jusqu'à la question (la moitié basse jamais vide)
        qm = self.t("?", 150, RAISON, audit=False).move_to(P(0, -1.5)).set_opacity(0.55)
        self.play(FadeIn(et, shift=DOWN * 0.1), GrowFromCenter(c4), FadeIn(qm, scale=0.8), run_time=0.35)
        self.battre(c4, 0.5)
        self.ligne([("avec", WHITE, "avec")], 1.5, fs=44)
        self.ligne([("uₙ =", TERME, "u indice n"), ("70", WHITE, "70"), ("+ 50", WHITE, "plus 50"), ("×", WHITE, None),
                    ("0,5ⁿ", RAISON, "0,5")], 0.8, fs=40, larg=4.1, avec_k={4: [Indicate(c4, color=RAISON)]},
                   rt_mid=0.12)
        c4.periode = 0.9
        question = self.paragraphe([("vers quel rythme", RAISON), ("revient le cœur ?", RAISON)], 46, buff=0.12,
                                   y=-0.55)
        for k, (l, ex) in enumerate(zip(question, ("vers quel rythme", "revient le cœur"))):
            self.au_mot(ex)
            self.play(FadeIn(l, shift=UP * 0.1), *([FadeOut(qm, scale=0.8)] if k == 0 else []), run_time=0.3)
        self.appel_commentaire(-2.42)
        self.attendre_voix(marge=0.6)
        c4.clear_updaters()

        # ── 05 : la fin commune ──
        self.fin_short("05-abonne")

    def q_montrer_choix(self, cartes):
        """Les trois cadres prennent la place du dessin d'attente ; chaque lettre
        à « A : », son contenu quand la voix le dit."""
        att = getattr(self, "_attente_q", None)
        if att is None:
            return super().q_montrer_choix(cartes)
        self._attente_q = None
        self.play(FadeOut(att, shift=DOWN * 0.15), *[FadeIn(c[0]) for c in cartes], run_time=0.3)
        for c, L in zip(cartes, "ABC"):
            self.suivre(f"{L} : ")
            self.play(FadeIn(c[1][0], shift=RIGHT * 0.15), run_time=0.2)
            corps = c[1][1]
            for nb in re.findall(r"\d+(?:,\d+)?", getattr(corps, "original_text", "") or ""):
                self.suivre(nb)
            self.play(FadeIn(corps, shift=RIGHT * 0.15), run_time=0.2)
