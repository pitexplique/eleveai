# proba_vocabulaire_short.py
# EleveAI — Maths 4e — short jumeau de la série « Probabilités », épisode 1 :
# le vocabulaire. CEINTURE BLANCHE. Il AMUSE : « hasard, ou pas hasard ? »,
# 3 secondes par question (un chrono qui se vide).
#   · en HAUT l'image qui change : la pièce qui tourne, le soleil qui se lève,
#     le bocal du loto ;
#   · en BAS, EN MÊME TEMPS, le tableau des verdicts qui se remplit (HASARD /
#     PAS HASARD), puis la règle ;
#   · fin : la copie notée « ? », la question, « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/4e-proba-vocabulaire-short.json (Julie, débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/proba_vocabulaire_short.py ProbaVocabulaire4eShort -o eleveai-maths-4e-proba-vocabulaire-short --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/probabilites/01-vocabulaire/.

import math
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_vocabulaire import P, de_qui_roule, piece_qui_tourne, soleil  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
IMAGE = P(0, 0.95)   # le centre de l'image du haut
NUMEROS = [7, 23, 41, 12, 36, 5, 49, 18, 30]
VITESSES = [3.1, -2.4, 3.9, -3.3, 2.7, -4.2, 3.5, -2.9, 4.6]
PHASES = [0.0, 2.3, 4.1, 1.2, 5.5, 3.1, 0.7, 4.8, 2.0]
COULEURS = [JAUNE_TITRE, BLEU_CALCUL, VERT_OK, ORANGE_RETENUE, VIOLET_ACCENT]


def boule(n, couleur, r=0.17):
    b = Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    return VGroup(b, Text(str(n), font_size=int(r * 90), color=BLACK, weight=BOLD).move_to(b))


class ProbaVocabulaire4eShort(Short6e):
    nom_voix = "4e-proba-vocabulaire-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.3):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def instant(self, extrait):
        """L'instant (temps du rendu) où la voix arrive à `extrait`."""
        texte = self._texte_voix
        i = texte.find(extrait)
        if i < 0:
            raise ValueError(extrait)
        return self._debut_voix + self._duree_voix * i / len(texte)

    # ── les dessins ─────────────────────────────────────────────────────────

    def bocal(self, centre):
        verre = Circle(radius=0.78, stroke_color=WHITE, stroke_width=4, fill_color="#E0F2FE",
                       fill_opacity=0.08).move_to(centre)
        pied = Polygon(P(-0.28, -0.74), P(0.28, -0.74), P(0.45, -0.98), P(-0.45, -0.98),
                       fill_color=GREY_D, fill_opacity=1, stroke_color=WHITE, stroke_width=2).shift(centre)
        boules = VGroup(*[boule(n, COULEURS[k % len(COULEURS)]) for k, n in enumerate(NUMEROS)])
        horloge = {"t": 0.0}

        def tourne(m, dt):
            horloge["t"] += dt
            tt = horloge["t"]
            for k, b in enumerate(m):
                a = tt * VITESSES[k] + PHASES[k]
                r = 0.38 + 0.16 * math.sin(tt * (2.3 + 0.61 * VITESSES[k]) + k * 1.3)
                b.move_to(centre + P(r * math.cos(a), r * math.sin(a)))

        boules.add_updater(tourne)
        return VGroup(pied, verre), boules

    def lever(self, centre):
        cadre = RoundedRectangle(width=2.6, height=2.0, corner_radius=0.15, stroke_color=BLEU_CALCUL,
                                 stroke_width=3, fill_color="#0F172A", fill_opacity=0.7).move_to(centre)
        sol = Rectangle(width=2.5, height=0.7, fill_color="#14532D", fill_opacity=1, stroke_width=0)
        sol.move_to(cadre.get_bottom() + UP * 0.4).set_z_index(2)
        sl = soleil(0.33).move_to(sol.get_top() + DOWN * 0.12).set_z_index(1)
        return cadre, sol, sl

    def chrono(self, centre, r=0.36):
        """Le chrono des 3 secondes : un anneau qui se vide. Renvoie (anneau, tracker)."""
        v = ValueTracker(1.0)
        fond = Circle(radius=r, stroke_color=GREY_D, stroke_width=7).move_to(centre)
        arc = always_redraw(lambda: Arc(radius=r, start_angle=PI / 2, angle=max(0.001, v.get_value()) * TAU,
                                        stroke_color=ORANGE_RETENUE, stroke_width=7).move_arc_center_to(centre))
        return VGroup(fond, arc), v

    def tampon(self, texte, couleur, font_size=26):
        lbl = Text(texte, font_size=font_size, color=couleur, weight=BOLD)
        cadre = RoundedRectangle(width=lbl.width + 0.25, height=lbl.height + 0.2, corner_radius=0.08,
                                 stroke_color=couleur, stroke_width=4)
        return VGroup(cadre, lbl.move_to(cadre))

    def verdict(self, nom, texte, couleur, y):
        n = self.t(nom, 26, WHITE).move_to(P(-1.5, y))
        fl = Arrow(P(-0.9, y), P(-0.45, y), buff=0, stroke_width=4, color=GREY_B,
                   max_tip_length_to_length_ratio=0.35)
        tp = self.tampon(texte, couleur, 22)
        tp.move_to(P(-0.3 + tp.width / 2, y))
        return n, fl, tp

    def manche(self, item, verdict_ex, nom, texte, couleur, y, image_out, image_in, ring):
        """Une question : l'image arrive, le chrono se vide, le tampon tombe."""
        anneau, v = ring
        self.au_mot(item)
        n, fl, tp = self.verdict(nom, texte, couleur, y)
        anims = [FadeIn(n, shift=RIGHT * 0.2), GrowArrow(fl)]
        if image_out is not None:
            anims.append(FadeOut(image_out, scale=0.6))
        self.play(*anims, *[FadeIn(m, scale=0.6) for m in image_in], run_time=0.4)
        v.set_value(1.0)
        reste = self.instant(verdict_ex) - self.renderer.time - 0.05
        if reste > 0.2:
            self.play(v.animate.set_value(0.0), run_time=reste, rate_func=linear)
        self.au_mot(verdict_ex)
        tp.scale(1.8).set_opacity(0)
        self.play(tp.animate.scale(1 / 1.8).set_opacity(1), run_time=0.25)
        self.play(Flash(tp, color=couleur, line_length=0.15, flash_radius=tp.width / 2 + 0.1), run_time=0.3)
        return VGroup(n, fl, tp)

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("Hasard ou pas ?", font_size=46, color=JAUNE_TITRE).move_to(P(0, 3.2))
        badge = echelle_ceintures("blanche").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.5))
        roule = de_qui_roule(IMAGE, 1.3, periode=0.12)
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), run_time=0.8)
        self.add(roule)
        self.au_mot("3 secondes")
        anneau, v = self.chrono(P(0, -1.0), 0.55)
        trois = self.grand("3 s", font_size=40, color=ORANGE_RETENUE).move_to(P(0, -1.0))
        self.play(FadeIn(anneau), FadeIn(trois, scale=0.5), run_time=0.4)
        self.insister(trois, 1.4, 0.2)
        self.play(v.animate.set_value(0.0), run_time=1.0, rate_func=linear)
        self.attendre_voix(marge=0.1)

        # ── 01 : les trois questions ──
        self.dire("01-image")
        petit, v = self.chrono(P(1.78, 1.55), 0.24)
        self.play(FadeOut(anneau), FadeOut(trois), FadeIn(petit), run_time=0.3)
        pc = piece_qui_tourne(IMAGE, 0.75)
        roule.clear_updaters()
        self.remove(roule)
        self.add(pc)
        l1 = self.manche("Lancer une pièce", ": hasard. L'heure", "pièce", "HASARD", VERT_OK, -0.35,
                         None, [], (petit, v))

        cadre, sol, sl = self.lever(IMAGE)
        pc.clear_updaters()
        l2 = self.manche("L'heure du lever", "pas hasard, on", "soleil", "PAS HASARD", ROUGE_ERREUR, -0.95,
                         pc, [cadre, sol, sl], (petit, v))
        self.au_mot("on la connaît déjà")
        self.play(sl.animate.shift(UP * 0.62), run_time=1.0, rate_func=rate_functions.ease_out_sine)
        deja = self.t("connu d'avance !", 24, WHITE, largeur=2.3).move_to(sol).set_z_index(3)
        self.play(FadeIn(deja, scale=0.6), run_time=0.3)

        verre, boules = self.bocal(IMAGE)
        l3 = self.manche("Le premier numéro", "loto : hasard", "loto", "HASARD", VERT_OK, -1.55,
                         VGroup(cadre, sol, sl, deja), [verre, boules], (petit, v))

        self.au_mot("Le hasard, c'est")
        regle = VGroup(self.t("Le hasard :", 30, JAUNE_TITRE),
                       self.t("les résultats possibles", 26, WHITE),
                       VGroup(self.t("connus", 28, VERT_OK), self.coche(VERT_OK, 0.16)).arrange(RIGHT, buff=0.15),
                       self.t("celui qui va sortir", 26, WHITE),
                       VGroup(self.t("inconnu", 28, ORANGE_RETENUE), self.t("?", 34, ORANGE_RETENUE))
                       .arrange(RIGHT, buff=0.15)).arrange(DOWN, buff=0.12)
        regle.move_to(P(0, -1.2))
        self.play(FadeOut(VGroup(l1, l2, l3), shift=DOWN * 0.2), FadeOut(petit), run_time=0.35)
        self.play(FadeIn(regle[0], shift=UP * 0.15), run_time=0.3)
        self.au_mot("on connaît les résultats possibles")
        self.play(FadeIn(regle[1], shift=UP * 0.15), FadeIn(regle[2], scale=0.6), run_time=0.4)
        self.au_mot("mais pas celui")
        self.play(FadeIn(regle[3], shift=UP * 0.15), FadeIn(regle[4], scale=0.6), run_time=0.4)
        self.insister(regle[4], 1.3, 0.2)
        self.attendre_voix(marge=0.2)
        boules.clear_updaters()

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(badge)
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.2))
        self.play(Write(toi), run_time=0.4)
        self.au_mot("la note")
        copie = RoundedRectangle(width=1.7, height=2.1, corner_radius=0.06, fill_color=WHITE, fill_opacity=1,
                                 stroke_color=GREY_B, stroke_width=2).move_to(P(-0.4, 1.15)).stretch_to_fit_height(1.8)
        lignes = VGroup(*[Line(P(-1.1, y), P(0.3, y), stroke_width=2, color="#93C5FD")
                          for y in (1.35, 1.05, 0.75, 0.5)])
        entete = Text("Contrôle", font_size=20, color=BLACK).move_to(P(-0.55, 1.8))
        note = VGroup(Circle(radius=0.42, stroke_color=ROUGE_ERREUR, stroke_width=5),
                      Text("?", font_size=46, color=ROUGE_ERREUR, weight=BOLD)).move_to(P(1.05, 1.5))
        self.play(FadeIn(copie, shift=UP * 0.2), Create(lignes), FadeIn(entete), run_time=0.5)
        self.play(DrawBorderThenFill(note), run_time=0.5)
        self.play(Wiggle(note), run_time=0.6)
        self.au_mot("hasard ou pas hasard")
        q = VGroup(VGroup(self.t("hasard", 34, VERT_OK), self.t("ou", 30)).arrange(RIGHT, buff=0.2),
                   self.t("pas hasard ?", 34, ROUGE_ERREUR)).arrange(DOWN, buff=0.1).move_to(P(0, -0.45))
        self.play(LaggedStart(*[FadeIn(m, shift=UP * 0.15) for m in q], lag_ratio=0.3), run_time=0.7)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=44, color=VERT_OK),
                       self.grand("commentaire !", font_size=44, color=VERT_OK)).arrange(DOWN, buff=0.1)
        appel.move_to(P(0, -1.6))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        poignee = Text("@eleveai974", font_size=28, color=BLEU_CALCUL).move_to(P(0, -2.45))
        self.play(GrowFromCenter(poignee), run_time=0.3)
        self.attendre_voix(marge=1.5)
