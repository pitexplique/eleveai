# proba6_defi_short.py
# EleveAI — Maths 6e — short jumeau de la série « Probabilités », épisode 6 :
# les défis (micro : proba_defi). CEINTURE JAUNE. Il AMUSE : « un dé, faire
# plus grand que 6 » — toutes les faces se font barrer, la bille dégringole
# tout en bas de l'échelle.
#   · en HAUT le dé du coach (canvas « de », grille 3 × 2) et l'échelle debout
#     (impossible en bas, certain en haut) avec sa bille ;
#   · en BAS, EN MÊME TEMPS : « plus grand que 6 ? », « aucune face »,
#     « impossible », « probabilité : 0 » ;
#   · fin : « plus petit que 7 ? », « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/6e-proba-defi-short.json (Julie, débit −10).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/proba6_defi_short.py ShortProba6Defi -o eleveai-maths-6e-proba-defi-short --media_dir manim/scripts/6e/media
# Puis copier le mp4 dans manim/sorties/6e/maths/probabilites/06-defis/.

import importlib.util
from pathlib import Path

# ⚠️ des proba_defi.py existent ailleurs : on charge celui-ci par son chemin
_spec = importlib.util.spec_from_file_location("proba6_defi_6e", Path(__file__).resolve().parent / "proba6_defi.py")
_defi = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_defi)  # pose aussi les chemins
P, carte_de, CEINTURE = _defi.P, _defi.carte_de, _defi.CEINTURE

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
XD, YD = -0.85, 0.75        # le dé
XE, YB, YH = 0.6, -0.05, 1.55  # l'échelle debout : x, bas (impossible), haut (certain)


class ShortProba6Defi(Short6e):
    nom_voix = "6e-proba-defi-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def ligne(self, morceaux, font_size=40, buff=0.15, largeur=LARGEUR_MAX):
        """Morceaux colorés d'UN SEUL Text (même ligne de base) ; g[i] = i-ème morceau."""
        T = Text(" ".join(m for m, _ in morceaux), font_size=font_size)
        tailles = [len(m.replace(" ", "")) for m, _ in morceaux]
        if len(T) != sum(tailles):
            g = VGroup(*[Text(m, font_size=font_size, color=c) for m, c in morceaux]).arrange(RIGHT, buff=buff)
        else:
            g, k = VGroup(), 0
            for (m, c), n in zip(morceaux, tailles):
                g.add(VGroup(*T[k:k + n]).set_color(c))
                k += n
        if g.width > largeur:
            g.scale_to_fit_width(largeur)
        return g

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def badge(self):
        return echelle_ceintures(CEINTURE).scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))

    def de(self):
        carte, faces = carte_de(0.55, 0.1)
        carte.move_to(P(XD, YD))
        return carte, faces

    def echelle(self):
        """L'échelle DEBOUT : impossible en bas (rouge), certain en haut (vert)."""
        barre = Line(P(XE, YB), P(XE, YH), stroke_width=10)
        barre.set_color([ROUGE_ERREUR, ORANGE_RETENUE, JAUNE_TITRE, VERT_OK])  # rouge en bas
        traits = VGroup(*[Line(P(XE - 0.15, y), P(XE + 0.15, y), stroke_width=4) for y in (YB, (YB + YH) / 2, YH)])
        imp = self.t("impossible", 22, ROUGE_ERREUR, 1.15).next_to(P(XE + 0.15, YB), RIGHT, buff=0.1)
        cer = self.t("certain", 22, VERT_OK, 1.15).next_to(P(XE + 0.15, YH), RIGHT, buff=0.1)
        return VGroup(barre, traits, imp, cer)

    def bille(self):
        return Circle(radius=0.14, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_color=WHITE,
                      stroke_width=3).move_to(P(XE, (YB + YH) / 2))

    def croix(self, centre, s=0.17):
        return VGroup(Line(centre + P(-s, -s), centre + P(s, s)), Line(centre + P(-s, s), centre + P(s, -s))
                      ).set_stroke(ROUGE_ERREUR, 6)

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        badge = self.badge()
        self.add(badge)
        titre = self.grand("Défi express", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.4))
        self.play(Write(titre), run_time=0.6)
        self.au_mot("un dé")
        carte, faces = self.de()
        ech = self.echelle()
        bi = self.bille()
        q = self.t("?", 34, ORANGE_RETENUE).next_to(bi, RIGHT, buff=0.15)
        self.play(FadeIn(carte[0]), LaggedStart(*[FadeIn(f, scale=0.4) for f in faces], lag_ratio=0.1),
                  FadeIn(ech), FadeIn(bi, scale=0.3), FadeIn(q), run_time=0.8)
        self.au_mot("plus grand que 6")
        pg = self.ligne([("plus grand que", WHITE), ("6", JAUNE_TITRE), ("?", ORANGE_RETENUE)], 42).move_to(P(0, -1.2))
        self.play(FadeIn(pg, shift=UP * 0.2), Indicate(faces[5], color=JAUNE_TITRE, scale_factor=1.25), run_time=0.5)
        self.insister(pg[1], 1.6, 0.2)
        self.attendre_voix(marge=0.1)

        # ── 01 : l'image ──
        self.dire("01-image")
        self.au_mot("Aucune face")
        af = self.t("aucune face", 42).move_to(P(0, -1.1))
        self.play(FadeOut(pg, shift=UP * 0.2), FadeIn(af, shift=UP * 0.2), run_time=0.3)
        croix = VGroup()
        for f in faces:
            x = self.croix(f.get_center())
            croix.add(x)
            self.play(Indicate(f, color=ROUGE_ERREUR, scale_factor=1.2), Create(x), run_time=0.18)
        self.au_mot("impossible")
        imp = self.grand("impossible", font_size=52, color=ROUGE_ERREUR).move_to(P(0, -1.85))
        self.play(FadeIn(imp, scale=0.4), Wiggle(VGroup(carte, croix)), run_time=0.5)
        self.au_mot("est 0")
        pz = self.ligne([("probabilité :", WHITE), ("0", JAUNE_TITRE)], 40).move_to(P(0, -2.5))
        self.play(FadeIn(pz, shift=UP * 0.2), run_time=0.35)
        self.insister(pz[1], 1.7, 0.2)
        self.au_mot("tout en bas")
        self.play(FadeOut(q), bi.animate.move_to(P(XE, YB)), run_time=0.7, rate_func=rate_functions.ease_out_bounce)
        self.play(Flash(bi, color=ROUGE_ERREUR, line_length=0.25), ech[3].animate.scale(1.3), run_time=0.4)
        self.play(ech[3].animate.scale(1 / 1.3), run_time=0.25)
        self.attendre_voix(marge=0.2)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(badge)
        toi = self.grand("Et toi ?", font_size=54, color=JAUNE_TITRE).move_to(P(0, 3.4))
        carte2, faces2 = self.de()
        ech2 = self.echelle()
        bi2 = self.bille()
        q2 = self.t("?", 34, ORANGE_RETENUE).next_to(bi2, RIGHT, buff=0.15)
        self.play(Write(toi), FadeIn(carte2), FadeIn(ech2), FadeIn(bi2, scale=0.3), FadeIn(q2), run_time=0.6)
        self.au_mot("plus petit que 7")
        pp = self.ligne([("plus petit que", WHITE), ("7", JAUNE_TITRE), ("?", ORANGE_RETENUE)], 42).move_to(P(0, -1.0))
        self.play(FadeIn(pp, shift=UP * 0.2), Wiggle(carte2), run_time=0.6)
        self.insister(pp[1], 1.6, 0.2)
        self.au_mot("quelle probabilité")
        qp = self.t("probabilité ?", 40, ORANGE_RETENUE).move_to(P(0, -1.52))
        self.play(FadeIn(qp, scale=0.6), bi2.animate(rate_func=there_and_back).shift(UP * 0.35), run_time=0.5)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=40, color=VERT_OK),
                       self.grand("commentaire !", font_size=38, color=VERT_OK)).arrange(DOWN, buff=0.08)
        appel[0].scale(38 / 40)
        appel.arrange(DOWN, buff=0.08).move_to(P(0, -2.3))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
