# proba6_frequence_calculer_short.py
# EleveAI — Maths 6e — short jumeau de la série « Probabilités », épisode 7 :
# la fréquence observée. CEINTURE JAUNE. Il AMUSE : « 100 lancers, 18 six :
# c'est beaucoup ? »
#   · en HAUT les lancers s'empilent en barres (histogramme du dé), le compteur
#     des 6 monte jusqu'à 18 ; puis la ligne « 1 sur 6 » se pose sur les barres ;
#   · en BAS, EN MÊME TEMPS, les maths se remplissent : fréquence 18/100 = 0,18,
#     probabilité 1/6 ≈ 0,17 ;
#   · fin : 20 pièces, 12 faces, « quelle fréquence ? », « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/6e-proba-frequence-calculer-short.json (débit −10).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/proba6_frequence_calculer_short.py ShortProba6FrequenceCalculer -o eleveai-maths-6e-proba-frequence-calculer-short --media_dir manim/scripts/6e/media
# Puis copier le mp4 dans manim/sorties/6e/maths/probabilites/07-frequence/.

import importlib.util
import sys
from pathlib import Path

# ⛔ import PAR CHEMIN EXACT : d'autres dossiers ont des modules de même nom
_chemin = Path(__file__).resolve().parent / "proba6_frequence_calculer.py"
_spec = importlib.util.spec_from_file_location("proba6_frequence_calculer", _chemin)
_mod = importlib.util.module_from_spec(_spec)
sys.modules["proba6_frequence_calculer"] = _mod
_spec.loader.exec_module(_mod)  # pose aussi les chemins (charte, gabarits, annonce)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

P, de, de_qui_roule, piece_qui_tourne = _mod.P, _mod.de, _mod.de_qui_roule, _mod.piece_qui_tourne
comptes, histogramme, piece, LANCERS = _mod.comptes, _mod.histogramme, _mod.piece, _mod.LANCERS
FACE_C = _mod.FACE_C

LARGEUR_MAX = 4.1
HB, HX0, HPAS, HLARG, HECH = 0.05, -1.05, 0.56, 0.42, 0.07
FACES_20 = [True, False, False, True, False, True, False, False, True, False,
            False, True, False, True, False, False, True, False, True, False]  # False = face (12)


class ShortProba6FrequenceCalculer(Short6e):
    nom_voix = "6e-proba-frequence-calculer-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def fraction(self, num, den, fs=34, c_num=WHITE, c_den=WHITE):
        n = Text(str(num), font_size=fs, color=c_num)
        d = Text(str(den), font_size=fs, color=c_den)
        larg = max(n.width, d.width) + 0.12
        return VGroup(n, Line(LEFT * larg / 2, RIGHT * larg / 2, stroke_width=3), d).arrange(DOWN, buff=0.07)

    def badge(self):
        return echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche — les lancers s'empilent ──
        self.dire("00-accroche")
        titre = self.grand("100 lancers", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.35))
        badge = self.badge()
        axe = Line(P(HX0 - 0.35, HB), P(HX0 + 5 * HPAS + 0.35, HB), stroke_width=3)
        faces = VGroup(*[de(i + 1, 0.3).move_to(P(HX0 + i * HPAS, HB - 0.25)) for i in range(6)])
        n = ValueTracker(0)
        hist = histogramme(n, HB, HX0, HPAS, HLARG, HECH)
        roule = de_qui_roule(P(-1.75, 1.35), 0.55, periode=0.06, faces=LANCERS)
        cpt = always_redraw(lambda: self.t(str(comptes(int(n.get_value()))[5]), 34, JAUNE_TITRE)
                            .set_opacity(1 if comptes(int(n.get_value()))[5] > 0 else 0)
                            .next_to(P(HX0 + 5 * HPAS, HB + comptes(int(n.get_value()))[5] * HECH),
                                     UP, buff=0.08))
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), Create(axe), FadeIn(faces), run_time=0.6)
        self.add(roule, hist, cpt)
        self.play(n.animate.set_value(100), run_time=1.9, rate_func=linear)
        roule.clear_updaters()
        self.remove(roule)
        self.add(de(LANCERS[-1], 0.55).move_to(P(-1.75, 1.35)))
        hist.clear_updaters()
        cpt.clear_updaters()
        self.au_mot("18 six")
        six = VGroup(self.t("18", 46, JAUNE_TITRE), de(6, 0.5)).arrange(RIGHT, buff=0.2).move_to(P(0, -0.85))
        self.play(TransformFromCopy(cpt, six[0]), FadeIn(six[1], scale=0.5), Indicate(hist[5], color=WHITE),
                  run_time=0.4)
        self.au_mot("C'est beaucoup ?")
        q = self.grand("C'est beaucoup ?", font_size=44, color=ORANGE_RETENUE).move_to(P(0, -1.65))
        self.play(FadeIn(q, scale=0.5), run_time=0.3)
        self.insister(q, 1.2, 0.2)
        self.attendre_voix(marge=0.1)

        # ── 01 : fréquence contre probabilité ──
        self.dire("01-image")
        self.play(FadeOut(VGroup(six, q), shift=DOWN * 0.2), run_time=0.3)
        self.au_mot("Fréquence")
        l1 = self.t("fréquence", 30, JAUNE_TITRE)
        f1 = self.fraction(18, 100, 32, JAUNE_TITRE, BLEU_CALCUL)
        e1 = self.t("= 0,18", 34, JAUNE_TITRE)
        r1 = VGroup(l1, f1, e1).arrange(RIGHT, buff=0.18).scale_to_fit_width(4.0).move_to(P(0, -0.85))
        self.play(FadeIn(l1, shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("18 sur 100")
        self.play(FadeIn(f1, scale=0.6), Indicate(hist[5], color=WHITE), run_time=0.4)
        self.au_mot("0,18. Et")
        self.play(FadeIn(e1, shift=LEFT * 0.15), run_time=0.3)
        self.au_mot("la probabilité du 6")
        l2 = self.t("probabilité", 30, VERT_OK)
        f2 = self.fraction(1, 6, 32, VERT_OK, VERT_OK)
        e2 = self.t("≈ 0,17", 34, VERT_OK)
        r2 = VGroup(l2, f2, e2).arrange(RIGHT, buff=0.18).scale_to_fit_width(4.0).move_to(P(0, -1.85))
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("1 sur 6")
        h = 100 / 6 * HECH
        attendu = DashedLine(P(HX0 - 0.35, HB + h), P(HX0 + 5 * HPAS + 0.35, HB + h), color=VERT_OK,
                             stroke_width=4, dash_length=0.1)
        self.play(FadeIn(f2, scale=0.6), Create(attendu), run_time=0.5)
        self.au_mot("environ 0,17")
        self.play(FadeIn(e2, shift=LEFT * 0.15), run_time=0.3)
        self.au_mot("Très proche")
        proche = self.grand("Très proche !", font_size=50, color=VERT_OK).move_to(P(0, 3.35))
        self.play(ReplacementTransform(titre, proche), Indicate(e1, color=WHITE), Indicate(e2, color=WHITE),
                  Flash(hist[5].get_top(), color=VERT_OK), run_time=0.5)
        self.insister(proche, 1.15, 0.25)
        self.attendre_voix(marge=0.2)

        # -- 02 : la question --
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(badge)
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.35))
        self.play(Write(toi), run_time=0.4)
        pc = piece_qui_tourne(P(-1.45, 1.05), 0.5)
        self.add(pc)
        self.au_mot("20 lancers")
        grises = VGroup(*[piece(True, 0.16) for _ in FACES_20])
        for c in grises:
            c[0].set_fill(GREY_D)
            c[1].set_opacity(0)
        grises.arrange_in_grid(rows=4, cols=5, buff=0.06).move_to(P(0.75, 1.05))
        l1 = self.t("20 lancers", 34, BLEU_CALCUL).move_to(P(0, -0.35))
        self.play(LaggedStart(*[FadeIn(c, scale=0.5) for c in grises], lag_ratio=0.04), FadeIn(l1), run_time=0.6)
        self.au_mot("12 faces")
        vraies = VGroup(*[piece(p, 0.16) for p in FACES_20])
        vraies.arrange_in_grid(rows=4, cols=5, buff=0.06).move_to(grises)
        l2 = VGroup(self.t("12", 34, FACE_C), self.t("faces", 34, FACE_C)).arrange(RIGHT, buff=0.15)
        l2.move_to(P(0, -0.9))
        self.play(*[Transform(a, b) for a, b in zip(grises, vraies)], FadeIn(l2, shift=UP * 0.15), run_time=0.5)
        self.au_mot("quelle fréquence")
        qf = self.grand("Quelle fréquence ?", font_size=40, color=JAUNE_TITRE).move_to(P(0, 3.35))
        self.play(ReplacementTransform(toi, qf), run_time=0.4)
        self.insister(qf, 1.1, 0.2)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=44, color=VERT_OK),
                       self.grand("commentaire !", font_size=44, color=VERT_OK)).arrange(DOWN, buff=0.1)
        appel.move_to(P(0, -1.65))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
        pc.clear_updaters()
