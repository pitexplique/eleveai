# proba_coef_denombrer_short.py
# EleveAI — Maths STMG — short jumeau de « Dénombrer les chemins à k succès »
# (micro vaT_coef_denombrer). CEINTURE JAUNE. Il AMUSE : 4 conteneurs,
# exactement 2 bien triés… tu paries sur 4 ? Il y en a 6 !
#   · en HAUT les 4 conteneurs de recyclage : ils prennent la couleur S (vert,
#     bien trié) ou E (gris, mal trié) à chaque façon dite ;
#   · en BAS, EN MÊME TEMPS : la liste rangée s'écrit (2 colonnes de 3) ;
#   · fin : exactement 1 bien trié sur 4, combien ? « Réponds en commentaire ! ».
# ⛔ PAS D'ÉCART : aucun nombre que la voix ne dit pas.
# Ti-Margo en bas (margo_bas). Aucune classe à l'écran.
#
# Voix : manim/voix/stmg-proba-coef-denombrer-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_coef_denombrer_short.py ShortProbaCoefDenombrer -o eleveai-maths-stmg-proba-coef-denombrer-short --media_dir manim/scripts/stmg/media-coef_denombrer
# Copier dans manim/sorties/stmg/maths/probabilites/45-coef-denombrer/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_coef_denombrer import C_S, DEUX_S, P, Conteneur, ch, ecrire, montrer, suite  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1


class ShortProbaCoefDenombrer(Short6e):
    nom_voix = "stmg-proba-coef-denombrer-short"
    identite = "Maths STMG — EleveAI"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def dire(self, nom, dossier=None):
        d = super().dire(nom, dossier)
        self._curseur = 0
        return d

    def au_suivant(self, extrait):
        """Comme au_mot, mais cherche APRÈS le dernier extrait visé."""
        texte = self._texte_voix
        i = texte.find(extrait, self._curseur)
        if i < 0:
            raise ValueError(f"« {extrait} » absent (après {self._curseur}) : {texte[:60]}…")
        self._curseur = i + len(extrait)
        if not self._duree_voix:
            return
        reste = self._debut_voix + self._duree_voix * i / len(texte) - self.renderer.time
        if reste > 0.05:
            self.wait(reste)

    def titre(self, texte, color=JAUNE_TITRE, fs=44):
        return self.grand(texte, font_size=fs, color=color).move_to(P(0, 3.4))

    def construct(self):
        self.margo_bas()

        # ── 00 : 4 conteneurs, exactement 2 bien triés : tu paries sur 4 ? ──
        self.dire("00-accroche")
        titre = self.titre("4 conteneurs")
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        cs = VGroup(*[Conteneur(0.72) for _ in range(4)]).arrange(RIGHT, buff=0.14).move_to(P(0, 1.0))
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2),
                  LaggedStart(*[FadeIn(c, shift=DOWN * 0.5) for c in cs], lag_ratio=0.15), run_time=0.9)
        self.au_mot("exactement 2")
        ex = VGroup(suite(self.t("exactement", 34), self.t("2", 50, JAUNE_TITRE), buff=0.18),
                    self.t("bien triés", 34, C_S)).arrange(DOWN, buff=0.12).move_to(P(0, -0.4))
        self.play(FadeIn(ex, shift=UP * 0.15), *montrer(cs, ch("SESE")), run_time=0.5)
        self.insister(ex[0][1])
        self.au_mot("Combien de possibilités")
        fa = VGroup(self.t("Combien de", 38, ORANGE_RETENUE), self.t("possibilités ?", 38, ORANGE_RETENUE))
        fa.arrange(DOWN, buff=0.06).move_to(P(0, 3.22))
        self.play(FadeOut(titre, shift=UP * 0.2), FadeIn(fa, shift=UP * 0.2), *montrer(cs, ch("ESSE")), run_time=0.4)
        for m in ("SSEE", "EESS", "SEES"):
            self.play(*montrer(cs, ch(m)), run_time=0.25)
        self.au_mot("Tu paries sur 4")
        pari = suite(self.t("Tu paries sur", 34), self.t("4", 64, ORANGE_RETENUE), self.t("?", 50, ORANGE_RETENUE),
                     buff=0.18)
        pari.scale_to_fit_width(min(pari.width, 3.9)).move_to(P(0, -1.6))
        self.play(FadeIn(pari, scale=0.8), *[a for c in cs for a in c.prendre(None)], run_time=0.5)
        self.insister(pari[1])
        self.attendre_voix(marge=0.1)

        # ── 01 : les 6 façons, la liste rangée en deux colonnes ──
        self.dire("01-image")
        lg = VGroup(*[ecrire(c, 32, 0.15) for c in DEUX_S])
        for k, l in enumerate(lg):
            l.move_to(P(-1.0 if k < 3 else 1.0, -0.15 - 0.62 * (k % 3)))
        self.play(FadeOut(ex), FadeOut(pari), run_time=0.2)
        for k, mot in enumerate(["S S E E", "S E S E", "S E E S", "E S S E", "E S E S", "E E S S"]):
            self.au_suivant(mot)
            self.play(*montrer(cs, DEUX_S[k]), FadeIn(lg[k], shift=UP * 0.15), run_time=0.3)
        self.au_suivant("6 possibilités")
        six = self.titre("6 possibilités !", JAUNE_TITRE, 46)
        cadre = SurroundingRectangle(lg, color=CHEMIN_SHORT, buff=0.18, corner_radius=0.12)
        self.play(FadeOut(fa, shift=UP * 0.2), FadeIn(six, shift=UP * 0.2), Create(cadre), run_time=0.5)
        self.insister(six, 1.08)
        self.play(LaggedStart(*[Indicate(l, color=CHEMIN_SHORT) for l in lg], lag_ratio=0.1), run_time=0.8)
        self.attendre_voix(marge=0.1)

        # ── 02 : et exactement 1 bien trié ? ──
        self.dire("02-question")
        toi = self.titre("Et toi ?", JAUNE_TITRE, 50)
        self.play(FadeOut(six, shift=UP * 0.2), FadeIn(toi, shift=UP * 0.2), FadeOut(VGroup(lg, cadre)),
                  *[a for c in cs for a in c.prendre(None)], run_time=0.5)
        self.au_mot("exactement 1")
        l1 = suite(self.t("exactement", 34), self.t("1", 50, JAUNE_TITRE), buff=0.18).move_to(P(0, -0.05))
        l2 = self.t("bien trié", 34, C_S)
        self.play(FadeIn(l1, shift=UP * 0.15), run_time=0.4)
        self.insister(l1[1])
        self.au_mot("sur 4")
        s4 = suite(l2, self.t("sur", 34), self.t("4", 50, JAUNE_TITRE), self.t("?", 50, ORANGE_RETENUE),
                   buff=0.18)
        s4.scale_to_fit_width(min(s4.width, LARGEUR_MAX)).move_to(P(0, -0.65))
        self.play(FadeIn(s4, shift=UP * 0.15), LaggedStart(*[Wiggle(c) for c in cs], lag_ratio=0.1), run_time=0.6)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 44, VERT_OK), self.t("commentaire !", 44, VERT_OK))
        appel.arrange(DOWN, buff=0.08).move_to(P(0, -1.6))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)


CHEMIN_SHORT = "#F59E0B"
