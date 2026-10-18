# proba_defi_short.py
# EleveAI — Maths CM2 — short jumeau de la série « Probabilités », épisode 5 :
# le grand défi. CEINTURE JAUNE. Il AMUSE : « 4 noires, 6 vertes : combien de
# noires ajouter pour 1 chance sur 2 ? »
#   · en HAUT le sac (canvas « billes » du coach), puis les billes en face à
#     face, et 2 noires qui tombent dans les trous ;
#   · en BAS, EN MÊME TEMPS : « 4 noires · 6 vertes », « 1 chance sur 2 ? »,
#     « autant de noires que de vertes », « 6 vertes → 6 noires », « + 2 ! » ;
#   · fin : 3 noires, 7 vertes, « + ? noires », « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/cm2-proba-defi-short.json (Julie, débit −10).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/cm2/proba_defi_short.py ShortProbaDefiCM2 -o eleveai-maths-cm2-proba-defi-short --media_dir manim/scripts/cm2/media
# Puis copier le mp4 dans manim/sorties/cm2/maths/probabilites/05-defis/.

import importlib.util
import sys
from pathlib import Path

# ⚠️ seconde/ a aussi des proba_*.py : on charge celui du CM2 par son chemin
_spec = importlib.util.spec_from_file_location("cm2_proba_defi", Path(__file__).resolve().parent / "proba_defi.py")
_defi = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_defi)  # pose aussi les chemins
P, noire, verte, places_grille, carte_vide, sac_autour = (_defi.P, _defi.noire, _defi.verte, _defi.places_grille,
                                                          _defi.carte_vide, _defi.sac_autour)
C_VERT, CEINTURE = _defi.C_VERT, _defi.CEINTURE

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1


class ShortProbaDefiCM2(Short6e):
    nom_voix = "cm2-proba-defi-short"

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

    def sac(self, n_noires, n_vertes, centre, pas=0.56, r=0.22, reserve=None):
        """Le sac du coach : grille de min(6, max(3, ⌈√n⌉)) colonnes.
        Renvoie (sac, fond, billes, places)."""
        n = reserve or (n_noires + n_vertes)
        pos, cols = places_grille(n, pas)
        fond = carte_vide(n, pas, cols)
        decal = centre - fond.get_center()
        fond.shift(decal)
        places = [p + decal for p in pos]
        billes = VGroup(*[(noire(r) if i < n_noires else verte(r)).move_to(places[i])
                          for i in range(n_noires + n_vertes)])
        return sac_autour(fond), fond, billes, places

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        badge = self.badge()
        self.add(badge)
        sac, fond, billes, places = self.sac(4, 6, P(0, 0.15), pas=0.52, r=0.21, reserve=12)
        self.play(Create(sac), FadeIn(fond), run_time=0.4)
        self.au_mot("4 billes noires")
        l_n = self.ligne([("4", JAUNE_TITRE), ("noires", WHITE)], 40)
        l_v = self.ligne([("6", JAUNE_TITRE), ("vertes", C_VERT)], 40)
        compte = VGroup(l_n, l_v).arrange(RIGHT, buff=0.4)
        compte.scale_to_fit_width(min(compte.width, LARGEUR_MAX)).move_to(P(0, -1.45))
        self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 0.5, scale=0.4) for b in billes[:4]], lag_ratio=0.15),
                  FadeIn(l_n, shift=UP * 0.2), run_time=0.5)
        self.au_mot("6 vertes")
        self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 0.5, scale=0.4) for b in billes[4:]], lag_ratio=0.1),
                  FadeIn(l_v, shift=UP * 0.2), run_time=0.6)
        self.au_mot("Combien de noires")
        titre = self.ligne([("+", ORANGE_RETENUE), ("?", ORANGE_RETENUE), ("noires", WHITE)], 54).move_to(P(0, 3.4))
        trous = VGroup(*[DashedVMobject(Circle(radius=0.21, color=ORANGE_RETENUE, stroke_width=4), num_dashes=10)
                         .move_to(places[10 + i]) for i in range(2)])
        self.play(FadeIn(titre, scale=0.5), Create(trous), run_time=0.4)
        self.insister(titre[1], 1.6, 0.2)
        self.au_mot("1 chance sur 2")
        cible = self.ligne([("1", JAUNE_TITRE), ("chance", WHITE), ("sur", WHITE), ("2", JAUNE_TITRE),
                            ("?", ORANGE_RETENUE)], 46).move_to(P(0, -2.1))
        self.play(FadeIn(cible, scale=0.6), run_time=0.35)
        self.insister(cible, 1.15, 0.2)
        self.attendre_voix(marge=0.1)

        # ── 01 : l'image ──
        self.dire("01-image")
        self.play(Indicate(cible, color=WHITE, scale_factor=1.15), run_time=0.5)
        self.au_mot("autant de noires")
        x0, pas = -1.55, 0.62
        y_n, y_v = 1.05, -0.15
        noires, vertes = billes[:4], billes[4:]
        trous2 = VGroup(*[DashedVMobject(Circle(radius=0.22, color=ORANGE_RETENUE, stroke_width=4), num_dashes=10)
                          .move_to(P(x0 + (4 + i) * pas, y_n)) for i in range(2)])
        self.play(FadeOut(sac), FadeOut(fond), ReplacementTransform(trous, trous2),
                  *[b.animate.move_to(P(x0 + i * pas, y_n)) for i, b in enumerate(noires)],
                  *[b.animate.move_to(P(x0 + i * pas, y_v)) for i, b in enumerate(vertes)], run_time=0.7)
        liens = VGroup(*[DashedLine(P(x0 + i * pas, y_v + 0.27), P(x0 + i * pas, y_n - 0.27), color=WHITE,
                                    stroke_width=3, dash_length=0.07) for i in range(6)])
        aut = VGroup(self.t("autant de noires", 34), self.ligne([("que de", WHITE), ("vertes", C_VERT)], 34))
        aut.arrange(DOWN, buff=0.1).move_to(P(0, -1.45))
        self.play(LaggedStart(*[Create(l) for l in liens], lag_ratio=0.1), FadeOut(compte),
                  FadeIn(aut, shift=UP * 0.2), run_time=0.7)
        self.au_mot("6 vertes")
        v6 = self.ligne([("6", JAUNE_TITRE), ("vertes", C_VERT)], 40)
        n6 = self.ligne([("6", JAUNE_TITRE), ("noires", WHITE)], 40)
        fl = self.t("→", 40)
        egal = VGroup(v6, fl, n6).arrange(RIGHT, buff=0.2)
        egal.scale_to_fit_width(min(egal.width, LARGEUR_MAX)).move_to(P(0, -1.45))
        self.play(FadeOut(aut, shift=UP * 0.2), FadeIn(v6, shift=UP * 0.2),
                  LaggedStart(*[v.animate(rate_func=there_and_back).scale(1.35) for v in vertes], lag_ratio=0.1),
                  run_time=0.7)
        self.au_mot("donc 6 noires")
        rangee = SurroundingRectangle(VGroup(noires, trous2), color=JAUNE_TITRE, buff=0.08, corner_radius=0.1)
        self.play(FadeIn(fl), FadeIn(n6, shift=LEFT * 0.2), Create(rangee), run_time=0.4)
        self.insister(n6[0], 1.6, 0.2)
        self.au_mot("J'en ajoute 2")
        nouvelles = VGroup(*[noire(0.22).move_to(t.get_center() + UP * 1.6) for t in trous2])
        titre2 = self.ligne([("+", VERT_OK), ("2", VERT_OK), ("noires", WHITE)], 54).move_to(titre)
        plus = self.grand("+ 2 !", font_size=80, color=VERT_OK).move_to(P(0, -2.2))
        self.play(FadeIn(nouvelles, shift=DOWN * 0.2), FadeOut(cible), run_time=0.2)
        self.play(*[n.animate.move_to(t) for n, t in zip(nouvelles, trous2)], FadeOut(trous2),
                  ReplacementTransform(titre, titre2), FadeIn(plus, scale=0.4), run_time=0.5,
                  rate_func=rate_functions.ease_out_bounce)
        self.play(Wiggle(plus), Indicate(liens, color=VERT_OK, scale_factor=1.0), run_time=0.7)
        self.attendre_voix(marge=0.2)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(badge)
        toi = self.grand("Et toi ?", font_size=54, color=JAUNE_TITRE).move_to(P(0, 3.4))
        sac3, fond3, billes3, places3 = self.sac(3, 7, P(0, 0.4), pas=0.42, r=0.165)
        self.play(Write(toi), Create(sac3), FadeIn(fond3), run_time=0.5)
        self.au_mot("3 billes noires")
        q_n = self.ligne([("3", JAUNE_TITRE), ("noires", WHITE)], 36)
        q_v = self.ligne([("7", JAUNE_TITRE), ("vertes", C_VERT)], 36)
        qq = VGroup(q_n, q_v).arrange(RIGHT, buff=0.4)
        qq.scale_to_fit_width(min(qq.width, LARGEUR_MAX)).move_to(P(0, -0.98))
        self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 0.4, scale=0.4) for b in billes3[:3]], lag_ratio=0.15),
                  FadeIn(q_n, shift=UP * 0.2), run_time=0.5)
        self.au_mot("7 vertes")
        self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 0.4, scale=0.4) for b in billes3[3:]], lag_ratio=0.08),
                  FadeIn(q_v, shift=UP * 0.2), run_time=0.6)
        self.au_mot("combien de noires")
        q = self.ligne([("+", ORANGE_RETENUE), ("?", ORANGE_RETENUE), ("noires", WHITE)], 40).move_to(P(0, -1.5))
        self.play(FadeIn(q, scale=0.5), run_time=0.35)
        self.insister(q[1], 1.6, 0.2)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=40, color=VERT_OK),
                       self.grand("commentaire !", font_size=38, color=VERT_OK)).arrange(DOWN, buff=0.08)
        appel[0].scale(38 / 40)
        appel.arrange(DOWN, buff=0.08).move_to(P(0, -2.38))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
