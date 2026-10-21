# stats_representer_short.py
# EleveAI — Maths 5e — short jumeau de la série « Statistiques » (cycle 4),
# épisode 05 : représenter. CEINTURE JAUNE (un cran sous la paysage verte).
# Il AMUSE : « Le séjour fait 40 m² sur 120 : quel morceau du camembert ? »
#   · en HAUT, le plan de la maison ; le séjour s'allume ;
#   · en BAS, EN MÊME TEMPS, le camembert du coach : le disque se coupe en
#     trois tiers, le tiers du séjour se remplit au mot « un tiers », puis
#     « 360 ÷ 3 = 120° » ;
#   · fin : les chambres s'allument, « 45 m² : quel angle ? » (réponse : 135°).
# ⛔ PAS D'ÉCART : un nombre n'apparaît qu'au moment où la voix le dit.
# Voix : manim/voix/5e-stats-representer-short.json ; calage :
# manim/scripts/5e/stats5_representer_short_marques.json.
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/5e/stats_representer_short.py StatsRepresenterShort5e -o eleveai-maths-5e-stats-representer-short --media_dir manim/scripts/5e/media-representer-short
# Sortie : manim/sorties/5e/maths/statistiques/05-representer/eleveai-maths-5e-stats-representer-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from stats5_lotd_commun import *  # noqa: E402,F403
from stats_representer import COUL, plan_maison  # noqa: E402

Y_TXT = 0.05


class StatsRepresenterShort5e(Short5):
    nom_voix = "5e-stats-representer-short"
    fichier_marques = "stats5_representer_short_marques.json"

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Maison en camembert", "jaune")
        self.add(badge)
        pl = plan_maison(0.56).move_to(P(0, 1.3))
        C = P(0, -2.0)
        R = 0.85
        fond = Circle(radius=R, fill_color="#334155", fill_opacity=1, stroke_color=WHITE, stroke_width=4).move_to(C)
        tiers = VGroup(*[Line(C, C + R * np.array([np.cos(PI / 2 - k * TAU / 3), np.sin(PI / 2 - k * TAU / 3), 0]),
                              stroke_color=WHITE, stroke_width=3) for k in range(3)])
        sej = Sector(radius=R, start_angle=PI / 2, angle=-TAU / 3, fill_color=COUL[0], fill_opacity=1,
                     stroke_color=WHITE, stroke_width=4).move_arc_center_to(C)
        ch = Sector(radius=R, start_angle=PI / 2 - TAU / 3, angle=-TAU * 135 / 360, fill_color=COUL[1],
                    fill_opacity=1, stroke_color=WHITE, stroke_width=4).move_arc_center_to(C)

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(FadeIn(titre), run_time=0.3)
        self.au_mot("120 mètres carrés")
        m = self.ligne([("Maison :", WHITE), ("120 m²", JAUNE_TITRE)], 36).move_to(P(0, Y_TXT))
        self.play(FadeIn(pl, scale=0.9), FadeIn(m), run_time=0.5)
        self.au_mot("dessinée en camembert")
        self.play(DrawBorderThenFill(fond), run_time=0.6)
        self.au_mot("Le séjour fait 40")
        s40 = self.ligne([("Séjour :", COUL[0]), ("40 m²", WHITE)], 34).move_to(P(0, Y_TXT))
        self.play(pl[0][0].animate.set_fill(opacity=0.9), Indicate(pl[3][0], color=WHITE), FadeOut(m), FadeIn(s40),
                  run_time=0.5)
        self.au_mot("quelle part du disque")
        q = self.t("?", 60, ORANGE_RETENUE).move_to(C)
        self.play(FadeIn(q, scale=0.5), run_time=0.3)
        self.insister(q, 1.3)
        self.attendre_voix(marge=0.1)

        # ── 01 : un tiers ──
        self.dire("01-image")
        self.au_mot("40 sur 120")
        f = self.ligne([("40", WHITE), ("sur", WHITE), ("120", JAUNE_TITRE)], 36).move_to(P(0, Y_TXT))
        self.play(FadeOut(s40), FadeOut(q), FadeIn(f), run_time=0.3)
        self.au_mot("c'est un tiers")
        tt = self.ligne([("=", WHITE), ("un tiers", VERT_OK)], 36).next_to(f, RIGHT, buff=0.2)
        self.borne(VGroup(f, tt)).move_to(P(0, Y_TXT))
        self.play(Create(tiers), FadeIn(tt, shift=LEFT * 0.2), run_time=0.5)
        self.play(GrowFromPoint(sej, C), run_time=0.5)
        self.au_mot("360 divisé par 3")
        c = self.ligne([("360°", AMBRE), ("÷", WHITE), ("3", WHITE)], 38).move_to(P(0, Y_TXT - 0.55))
        tour = Arc(radius=R + 0.15, start_angle=PI / 2, angle=-TAU * 0.999, stroke_color=AMBRE,
                   stroke_width=5).move_arc_center_to(C)
        self.play(FadeIn(c, shift=UP * 0.2), Create(tour), run_time=0.6)
        self.au_mot("égale 120 degrés")
        r = self.ligne([("=", WHITE), ("120°", VERT_OK)], 38).next_to(c, RIGHT, buff=0.2)
        self.borne(VGroup(c, r)).move_to(P(0, Y_TXT - 0.55))
        a = texte("120°", 26, NUIT).set_stroke(WHITE, 5, background=True).move_to(
            C + R * 0.5 * np.array([np.cos(PI / 6), np.sin(PI / 6), 0]))
        self.play(FadeIn(r, scale=1.4), FadeIn(a, scale=1.4), FadeOut(tour), run_time=0.45)
        self.insister(r[1], 1.4)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.dire("02-question")
        self.au_mot("Les chambres font 45")
        q2 = self.ligne([("Chambres :", COUL[1]), ("45 m²", WHITE)], 34).move_to(P(0, Y_TXT))
        self.play(FadeOut(VGroup(f, tt, c, r)), pl[0][1].animate.set_fill(opacity=0.9), FadeIn(q2), run_time=0.45)
        self.au_mot("Quel angle")
        self.play(GrowFromPoint(ch, C), run_time=0.5)
        qa = texte("?", 40, ORANGE_RETENUE).set_stroke(WHITE, 5, background=True).move_to(
            C + R * 0.5 * np.array([np.cos(-PI / 6 - 3 * PI / 8), np.sin(-PI / 6 - 3 * PI / 8), 0]))
        ql = self.ligne([("angle", WHITE), ("=", WHITE), ("?", ORANGE_RETENUE)], 38).move_to(P(0, Y_TXT - 0.55))
        self.play(FadeIn(qa, scale=1.6), FadeIn(ql), run_time=0.35)
        self.insister(qa, 1.5)
        self.au_mot("Réponds en commentaire")
        appel = self.borne(self.t("Réponds en commentaire !", 34, VERT_OK)).move_to(P(0, Y_TXT))
        self.play(FadeOut(q2), FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
