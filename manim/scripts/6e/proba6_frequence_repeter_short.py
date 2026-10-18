# proba6_frequence_repeter_short.py
# EleveAI — Maths 6e — short jumeau de la série « Probabilités », épisode 9 :
# répéter beaucoup. CEINTURE JAUNE. Il AMUSE : « 10 lancers, 7 piles : la
# pièce est truquée ? »
#   · en HAUT les pièces : 10 lancers (7 piles), puis une pluie de pièces et le
#     compteur 100, 1 000 lancers ;
#   · en BAS, EN MÊME TEMPS, la courbe de la fréquence de pile qui oscille puis
#     se resserre sur la ligne de 0,5 (0,54 puis 0,503 s'écrivent quand la
#     voix les dit) ;
#   · fin : « combien de lancers ? », « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/6e-proba-frequence-repeter-short.json (Julie, débit −10).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/proba6_frequence_repeter_short.py ShortProba6FrequenceRepeter -o eleveai-maths-6e-proba-frequence-repeter-short --media_dir manim/scripts/6e/media
# Puis copier le mp4 dans manim/sorties/6e/maths/probabilites/09-repeter/.

import importlib.util
import math
from pathlib import Path

# ⚠️ import PAR CHEMIN EXACT : des modules de même nom existent ailleurs
_spec = importlib.util.spec_from_file_location(
    "proba6_frequence_repeter_paysage", Path(__file__).resolve().parent / "proba6_frequence_repeter.py")
_pay = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_pay)  # pose aussi les chemins (charte, gabarits, annonce)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from annonce_probabilites import piece_qui_tourne  # noqa: E402

P, piece, lancers, frequences = _pay.P, _pay.piece, _pay.lancers, _pay.frequences

LARGEUR_MAX = 4.1
GX0, GX1 = -1.7, 1.3      # n = 1 … 1000
GY0, GY1 = -1.95, -0.15      # f = 0 … 1


def gp(n, f):
    return P(GX0 + (GX1 - GX0) * math.log10(n) / 3, GY0 + (GY1 - GY0) * f)


class ShortProba6FrequenceRepeter(Short6e):
    nom_voix = "6e-proba-frequence-repeter-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def courbe(self, n0, n1, color=BLEU_CALCUL, sw=3.5):
        c = VMobject(stroke_color=color, stroke_width=sw)
        c.set_points_as_corners([gp(n, self.f[n - 1]) for n in range(n0, n1 + 1)])
        return c

    def axes(self):
        ech = Line(P(GX0, GY0), P(GX0, GY1), stroke_width=8)
        ech.set_color([VERT_OK, JAUNE_TITRE, ORANGE_RETENUE, ROUGE_ERREUR])
        ax = Arrow(P(GX0, GY0), P(GX1 + 0.45, GY0), buff=0, stroke_width=3, color=WHITE,
                   max_tip_length_to_length_ratio=0.06)
        ly = self.t("fréquence de pile", 22, BLEU_CALCUL).next_to(P(GX0, GY1), UP, buff=0.12)
        ly.align_to(P(GX0 - 0.2, 0), LEFT)
        ld = DashedLine(gp(1, 0.5), gp(1000, 0.5) + RIGHT * 0.3, dash_length=0.1, color=VERT_OK, stroke_width=3)
        return VGroup(ax, ech, ly), ld

    def graduation(self, n, texte):
        x = gp(n, 0)[0]
        tr = Line(P(x, GY0 - 0.08), P(x, GY0 + 0.08), stroke_width=3)
        return VGroup(tr, self.t(texte, 22, JAUNE_TITRE).next_to(tr, DOWN, buff=0.08))

    def valeur(self, n, texte, dy=0.32):
        pt = Dot(gp(n, self.f[n - 1]), radius=0.07, color=JAUNE_TITRE)
        lb = self.t(texte, 28, JAUNE_TITRE).move_to(gp(n, self.f[n - 1]) + UP * dy)
        lb.shift(LEFT * max(0, lb.get_right()[0] - 2.1))
        return pt, VGroup(BackgroundRectangle(lb, color=BLACK, fill_opacity=0.85, buff=0.04), lb)

    def pluie(self, n=26):
        """Une pluie de petites pièces dans la zone du haut (y de 1,95 à 1,05)."""
        g = VGroup()
        for k in range(n):
            g.add(piece("PILE" if (k * 7) % 3 else "FACE", 0.13))
        horloge = {"t": 0.0}

        def tombe(m, dt):
            horloge["t"] += dt
            for k, p in enumerate(m):
                x = -1.95 + 3.9 * ((k * 0.618) % 1)
                y = 1.78 - ((horloge["t"] * (1.1 + 0.4 * ((k * 0.37) % 1)) + k * 0.29) % 0.8)
                p.move_to(P(x, y))

        g.add_updater(tombe)
        tombe(g, 0)
        return g

    def construct(self):
        self.f = frequences()
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("Truquée ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        axes, ld = self.axes()
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(axes), Create(ld), run_time=0.6)
        s = lancers()[:10]
        pieces = VGroup(*[piece("PILE" if v else "FACE", 0.26).move_to(P(-1.6 + 0.8 * (k % 5), 1.72 - 0.6 * (k // 5)))
                          for k, v in enumerate(s)])
        dix = self.t("10 lancers", 30, WHITE).move_to(P(0, 0.55))
        c1 = self.courbe(1, 10)
        g10 = self.graduation(10, "10")
        self.play(LaggedStart(*[FadeIn(p, shift=DOWN * 0.4, scale=0.5) for p in pieces], lag_ratio=0.12),
                  Create(c1, rate_func=linear), FadeIn(dix), FadeIn(g10), run_time=1.4)
        self.au_mot("7 piles")
        sept = self.t("7 piles", 30, JAUNE_TITRE)
        VGroup(dix.generate_target(), sept).arrange(RIGHT, buff=0.3).move_to(P(0, 0.55))
        faces = VGroup(*[p for p, v in zip(pieces, s) if not v])
        self.play(MoveToTarget(dix), FadeIn(sept, scale=0.6), faces.animate.set_opacity(0.25), run_time=0.4)
        self.insister(sept, 1.3)
        self.attendre_voix(marge=0.1)

        # ── 01 : on lance encore, et encore ──
        self.dire("01-image")
        pf = self.grand("Pas forcément !", font_size=44, color=VERT_OK).move_to(P(0, 1.45))
        self.play(FadeOut(pieces, shift=DOWN * 0.3), FadeOut(VGroup(dix, sept)), FadeIn(pf, scale=0.6),
                  run_time=0.4)
        self.play(Wiggle(pf), run_time=0.5)
        self.au_mot("100 lancers")
        pl = self.pluie()
        cpt = self.t("100 lancers", 32).move_to(P(0, 0.62))
        c2 = self.courbe(10, 100)
        g100 = self.graduation(100, "100")
        self.play(FadeOut(pf), FadeIn(pl), FadeIn(cpt), FadeIn(g100), run_time=0.3)
        self.play(Create(c2, rate_func=linear), run_time=1.0)
        self.au_mot("0,54")
        pt2, v2 = self.valeur(100, "0,54", 0.55)
        self.play(FadeIn(pt2, scale=0.5), FadeIn(v2, scale=0.6), run_time=0.3)
        self.insister(v2, 1.3)
        self.au_mot("1000 lancers")
        cpt2 = self.t("1 000 lancers", 32).move_to(cpt)
        c3 = self.courbe(100, 1000)
        g1000 = self.graduation(1000, "1 000")
        self.play(ReplacementTransform(cpt, cpt2), FadeIn(g1000), v2.animate.set_opacity(0.5), run_time=0.3)
        self.play(Create(c3, rate_func=linear), run_time=1.3)
        self.au_mot("0,503")
        pt3, v3 = self.valeur(1000, "0,503")
        self.play(FadeIn(pt3, scale=0.5), FadeIn(v3, scale=0.6), run_time=0.3)
        self.insister(v3, 1.3)
        self.au_mot("Plus on lance")
        self.play(VGroup(c1, c2, c3).animate.set_stroke(VERT_OK, 5), run_time=0.6)
        self.au_mot("approche 0,5")
        cinq = self.t("0,5", 34, VERT_OK).next_to(gp(1000, 0.5), DOWN, buff=0.18)
        self.play(ld.animate.set_stroke(width=6), FadeIn(cinq, scale=0.5), run_time=0.4)
        self.insister(cinq, 1.5)
        self.attendre_voix(marge=0.2)
        pl.clear_updaters()

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(badge)
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.4))
        pc = piece_qui_tourne(P(0, 1.1), 0.65)
        self.add(pc)
        self.play(Write(toi), run_time=0.4)
        self.au_mot("combien de lancers")
        q = VGroup(self.grand("combien", font_size=46, color=ORANGE_RETENUE),
                   self.grand("de lancers ?", font_size=46, color=ORANGE_RETENUE)).arrange(DOWN, buff=0.1)
        q.move_to(P(0, -0.25))
        self.play(FadeIn(q, scale=0.6), run_time=0.4)
        self.insister(q, 1.15)
        self.au_mot("Réponds en commentaire")
        pc.clear_updaters()
        appel = VGroup(self.grand("Réponds en", font_size=44, color=VERT_OK),
                       self.grand("commentaire !", font_size=44, color=VERT_OK)).arrange(DOWN, buff=0.1)
        appel.move_to(P(0, -1.6))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1)
        poignee = Text("@eleveai974", font_size=28, color=BLEU_CALCUL).move_to(P(0, -2.45))
        self.play(GrowFromCenter(poignee), run_time=0.3)
        self.attendre_voix(marge=1.5)
