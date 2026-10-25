# frac_droite_short.py
# EleveAI — Maths CM1 ET CM2 — short jumeau de l'épisode 03 « Placer une
# fraction sur une droite graduée » (micro fraction_droite). CEINTURE BLANCHE
# (règle du short blanc) : on VOIT la fusée avancer, aucun calcul.
# Il AMUSE : la fusée d'Ilan, CONTRÔLEUR DE MISSION, de la Terre (0) à la Lune (1) :
#   · EN HAUT : la Terre, la Lune, la fusée qui avance ;
#   · EN BAS, au même instant et à la verticale : la droite graduée du coach
#     (4 parts) ; à chaque bond, la fraction s'écrit sur son trait ;
#   · SURPRISE : 5 traits, mais seulement 4 parts ;
#   · 1 question-pause (3 s) : 3 parts sur 6 = 3 sixièmes (leurres 3 septièmes :
#     les traits ; 6 tiers : l'inversion) ;
#   · commentaire : « 8 parts, la fusée au milieu : quelle fraction ? » (4/8).
# Aucune donnée réelle citée (pas de distance Terre-Lune). Centres : espace.
#
# Le short n'affiche pas la classe : rendu UNE fois, copié sous les noms cm1 et cm2.
# Voix : manim/voix/cm-frac-droite-short.json ; marques : frac_droite_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/cm1/frac_droite_short.py FracDroiteShortCM
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/cm1/frac_droite_short.py FracDroiteShortCM -o eleveai-maths-cm1-frac-droite-short --media_dir manim/scripts/cm1/media-frac-droite-short
# Sorties : manim/sorties/{cm1,cm2}/maths/fractions/03-droite/eleveai-maths-{cm1,cm2}-frac-droite-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_cm_commun import *  # noqa: E402,F403

YF = 1.45     # la ligne de la fusée
YD = -1.0     # la droite
YT = 0.85     # la ligne de texte entre les deux


def fusee(s=0.5):
    corps = RoundedRectangle(width=1.1, height=0.42, corner_radius=0.18, fill_color=WHITE, fill_opacity=1,
                             stroke_width=0)
    nez = Triangle(fill_color=ROUGE_ERREUR, fill_opacity=1, stroke_width=0).rotate(-PI / 2).scale(0.25)
    nez.next_to(corps, RIGHT, buff=-0.05)
    hublot = Circle(radius=0.1, fill_color=BLEU_PART, fill_opacity=1, stroke_color=NUIT, stroke_width=2)
    hublot.move_to(corps.get_center() + RIGHT * 0.15)
    ailes = VGroup(*[Polygon(P(-0.55, 0.2 * k), P(-0.25, 0.2 * k), P(-0.6, 0.45 * k), fill_color=ROUGE_ERREUR,
                             fill_opacity=1, stroke_width=0) for k in (1, -1)])
    flamme = Polygon(P(-0.55, 0.12), P(-0.55, -0.12), P(-0.95, 0), fill_color="#f59e0b", fill_opacity=1,
                     stroke_width=0)
    return VGroup(flamme, ailes, corps, nez, hublot).scale(s / 0.5)


def terre(r=0.35):
    t = Circle(radius=r, fill_color="#2563eb", fill_opacity=1, stroke_width=0)
    c = VGroup(Ellipse(width=r * 0.9, height=r * 0.6, fill_color="#22c55e", fill_opacity=1, stroke_width=0)
               .move_to(P(-r * 0.2, r * 0.25)),
               Ellipse(width=r * 0.6, height=r * 0.5, fill_color="#22c55e", fill_opacity=1, stroke_width=0)
               .move_to(P(r * 0.35, -r * 0.3)))
    return VGroup(t, c)


def lune(r=0.32):
    l = Circle(radius=r, fill_color="#d1d5db", fill_opacity=1, stroke_width=0)
    cr = VGroup(*[Circle(radius=r * k, fill_color="#9ca3af", fill_opacity=1, stroke_width=0).move_to(P(x * r, y * r))
                  for x, y, k in ((-0.3, 0.3, 0.22), (0.35, -0.1, 0.18), (-0.1, -0.45, 0.14))])
    return VGroup(l, cr)


def route(n):
    d = Droite(0, 1, n, etiquettes={0: "0", 1: "1"}, longueur=2.7, depasse=0.35, centre=P(0, YD))
    return pas_audit(d)


class FracDroiteShortCM(ShortCM):
    nom_voix = "cm-frac-droite-short"
    fichier_marques = "frac_droite_short_marques.json"

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("La route de la Lune", self.ceinture)
        pas_audit(titre)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]

        # ── 00 : Ilan, la Terre, la Lune ──
        self.dire("00-accroche")
        d1 = route(1)
        x0, x1 = d1.p(0)[0], d1.p(1)[0]
        t, l = terre().move_to(P(x0, YF)), lune().move_to(P(x1, YF))
        f = fusee(0.34).move_to(P(x0, YF + 0.5))
        nm = self.inline("Ilan guide la fusée", 28, BLEU_CALCUL).move_to(P(0, YT))
        self.au_mot("Ilan")
        self.play(Write(titre), FadeIn(nm), run_time=0.5)
        self.au_mot("la Terre")
        self.play(FadeIn(t, scale=0.5), FadeIn(f, shift=UP * 0.2), run_time=0.4)
        self.au_mot("la Lune")
        self.play(FadeIn(l, scale=0.5), run_time=0.4)
        self.au_mot("La route")
        self.play(FadeIn(d1), run_time=0.4)
        d4, anim = d1.graduer(4, run_time=0.6)
        self.au_nb("en 4")
        self.play(anim)
        self.attendre_voix(marge=0.2)

        # ── 01 : le voyage ──
        self.dire("01-voyage")
        self.play(FadeOut(nm), run_time=0.25)
        fr = VGroup()
        for k, mot in enumerate(("avance : 1", "quart, 2", "quarts, 3", "et 4")):
            v = (k + 1) / 4
            e = EcritureFraction(k + 1, 4, fs=26, couleur=BLEU_POINT, police="Arial", gras=True)
            e.next_to(d4.ticks[k + 1], UP, buff=0.12)
            fr.add(e)
            self.au_nb(mot)
            self.play(f.animate.move_to(P(d4.p(v)[0], YF + 0.5)), FadeIn(e, scale=1.3), run_time=0.45)
        self.au_mot("la Lune")
        self.play(Flash(l, color=JAUNE_TITRE, line_length=0.2), run_time=0.5)
        r = VGroup(self.inline("4 quarts", 32, JAUNE_TITRE), self.inline("= 1", 32, JAUNE_TITRE))
        r.arrange(RIGHT, buff=0.15).move_to(P(0, YT))
        self.au_nb("4 quarts, c'est")
        self.play(FadeIn(r[0]), run_time=0.3)
        self.au_nb("c'est 1")
        self.play(FadeIn(r[1], scale=1.3), Indicate(d4.etiquettes[1], color=AMBRE, scale_factor=1.6), run_time=0.4)
        self.attendre_voix(marge=0.2)

        # ── 02 : la surprise : 5 traits, 4 parts ──
        self.dire("02-piege")
        self.play(FadeOut(r), FadeOut(fr), run_time=0.25)
        traits = pas_audit(VGroup(*[Text(str(i + 1), font_size=24, color=ROUGE_ERREUR, weight=BOLD)
                                    .next_to(d4.ticks[i], UP, buff=0.15) for i in range(5)]))
        t5 = self.inline("5 traits", 32, ROUGE_ERREUR).move_to(P(-0.9, YT))
        self.au_nb("il y a 5")
        self.play(LaggedStart(*[FadeIn(x, scale=1.4) for x in traits], lag_ratio=0.12), FadeIn(t5), run_time=0.6)
        parts = VGroup()
        for i in range(4):
            m = (d4.ticks[i].get_center() + d4.ticks[i + 1].get_center()) / 2
            parts.add(Text(str(i + 1), font_size=24, color=VERT_OK, weight=BOLD).move_to(m + UP * 0.4))
        pas_audit(parts)
        t4 = self.inline("4 parts", 32, VERT_OK).move_to(P(0.95, YT))
        self.au_nb("seulement 4")
        self.play(FadeOut(traits), LaggedStart(*[FadeIn(x, scale=1.4) for x in parts], lag_ratio=0.12),
                  FadeIn(t4), Create(croix(t5, sw=5)), run_time=0.6)
        self.au_mot("On compte les parts")
        self.insister(t4, 1.25)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 03 : la question-pause (3 s) ──
        self.question_pause("03-question", "03b-reponse", ["La route a 6 parts.", "La fusée en a fait 3."],
                            [self.inline("3/6", 30), self.inline("3/7", 30), self.inline("6/3", 30)], 0,
                            ["3 sixièmes : la moitié !"], mot_q="La route")
        self.vider(garder)

        # ── 04 : la question en commentaire ──
        self.dire("04-question")
        d8 = route(8)
        f2 = fusee(0.34).move_to(P(d8.p(0.5)[0], YF + 0.5))
        self.au_nb("a 8")
        self.play(FadeIn(d8), run_time=0.45)
        q = Text("?", font_size=40, color=ORANGE_TROU, weight=BOLD).next_to(d8.ticks[4], UP, buff=0.15)
        self.au_mot("au milieu")
        self.play(FadeIn(f2, shift=RIGHT * 0.4), FadeIn(q, scale=1.4), run_time=0.45)
        qf = self.inline("Quelle fraction ?", 32, AMBRE).move_to(P(0, YF - 0.05))
        self.au_mot("Quelle fraction")
        self.play(FadeIn(qf, scale=1.1), run_time=0.3)
        self.appel_commentaire(y=YT)
