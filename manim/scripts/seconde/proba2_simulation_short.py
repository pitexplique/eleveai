# proba2_simulation_short.py
# EleveAI — Maths 2de — short jumeau de la série « Probabilités », épisode 15 :
# simuler avec Python. CEINTURE JAUNE. Il AMUSE : 1 000 lancers de pièce en
# une seconde.
#   · en HAUT la pièce qui tourne, puis la bande de 0 à 1 où random() tombe
#     (à gauche de 0,5 : pile) ;
#   · en BAS, EN MÊME TEMPS : le test random() < 0.5, le compteur, la division
#     par 1 000, 0,507 puis 0,493, près de 0,5 ;
#   · fin : probabilité 0,3, « if ? : », « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/seconde-proba-simulation-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/seconde/proba2_simulation_short.py ShortProba2Simulation -o eleveai-maths-seconde-proba-simulation-short --media_dir manim/scripts/seconde/media
# Puis copier le mp4 dans manim/sorties/seconde/maths/probabilites/15-simulation/.

import importlib.util
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI.parents[1]))
sys.path.insert(0, str(ICI))


def _charger(nom_fichier, nom_module):
    if nom_module in sys.modules:
        return sys.modules[nom_module]
    spec = importlib.util.spec_from_file_location(nom_module, ICI / nom_fichier)
    mod = importlib.util.module_from_spec(spec)
    sys.modules[nom_module] = mod
    spec.loader.exec_module(mod)
    return mod


_ep15 = _charger("proba2_simulation.py", "seconde_proba2_simulation")

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402

P, Editeur, Bande, code_txt = _ep15.P, _ep15.Editeur, _ep15.Bande, _ep15.code_txt
echelle_ceintures, piece_qui_tourne = _ep15.echelle_ceintures, _ep15.piece_qui_tourne
HASARDS, VERT_PILE, GRIS_ETEINT, C_NOMBRE = _ep15.HASARDS, _ep15.VERT_PILE, _ep15.GRIS_ETEINT, _ep15.C_NOMBRE


class ShortProba2Simulation(Short6e):
    nom_voix = "seconde-proba-simulation-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=4.1):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def code(self, texte, fs=28, largeur=4.1):
        c = code_txt(texte, fs)
        if c.width > largeur:
            c.scale_to_fit_width(largeur)
        return c

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def pluie(self, bande, valeurs, seuil, run_time=1.0, lag=0.06, r=0.06):
        anims, pts = [], VGroup()
        for v in valeurs:
            d, cible = bande.goutte(v, VERT_PILE if v < seuil else GRIS_ETEINT, r)
            d.shift(DOWN * 0.45)
            d.set_opacity(0)
            pts.add(d)
            anims.append(d.animate.move_to(cible).set_opacity(1))
        return LaggedStart(*anims, lag_ratio=lag, run_time=run_time), pts

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("1 000 lancers de pièce", font_size=38, color=JAUNE_TITRE).move_to(P(0, 3.25))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        pieces = [piece_qui_tourne(P(x, 0.9), r=0.45, phase=ph, vitesse=v)
                  for x, ph, v in [(-1.3, 0.0, 1.6), (0, 0.7, 2.1), (1.3, 1.9, 1.8)]]
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), *[FadeIn(p) for p in pieces], run_time=0.6)
        self.au_mot("en une seconde")
        sec = self.t("en une seconde ?", 40, ORANGE_RETENUE).move_to(P(0, -0.5))
        self.play(FadeIn(sec, scale=0.6), run_time=0.35)
        self.insister(sec, 1.25, 0.2)
        self.au_mot("avec Python")
        ed = Editeur(1, 3.6, P(0, -1.5), fs=34)
        py = self.t("avec Python !", 38, VERT_OK).next_to(ed, UP, buff=0.12)
        self.play(FadeOut(sec), FadeIn(py, scale=0.6), FadeIn(ed), run_time=0.3)
        self.play(ed.taper(0, "random()"), run_time=0.5)
        self.attendre_voix(marge=0.1)

        # ── 01 : la simulation ──
        self.dire("01-image")
        bande = Bande(-1.9, 1.9, 0.75, haut=0.45, fs=28)
        self.play(*[FadeOut(p) for p in pieces], FadeOut(py), FadeOut(ed), FadeOut(ed.lignes[0]),
                  FadeIn(bande), run_time=0.35)
        test = self.code("if random() < 0.5:", 30).move_to(P(0, -0.45))
        self.play(AddTextLetterByLetter(test, run_time=0.7))
        self.au_mot("0,5 : pile")
        rep = bande.repere(0.5, "0,5", JAUNE_TITRE, 28)
        zg = bande.zone(0, 0.5, VERT_PILE, 0.35)
        pile = Text("pile", font_size=30, color=VERT_PILE).next_to(zg, UP, buff=0.15)
        self.play(FadeIn(rep), FadeIn(zg), FadeIn(pile, scale=0.6), run_time=0.4)
        anim, pts = self.pluie(bande, HASARDS[:16], 0.5, run_time=1.0)
        self.play(anim)
        self.au_mot("On compte")
        cpt = self.code("compteur = compteur + 1", 28).move_to(P(0, -1.05))
        self.play(FadeIn(cpt, shift=UP * 0.15), run_time=0.3)
        self.au_mot("on divise par 1 000")
        div = self.code("print(compteur / 1000)", 28).move_to(P(0, -1.6))
        self.play(FadeIn(div, shift=UP * 0.15), run_time=0.3)
        self.au_mot("Résultat")
        anim, pts2 = self.pluie(bande, HASARDS[16:50], 0.5, run_time=1.0, lag=0.03)
        self.play(FadeOut(pts), anim)
        self.au_mot("0,507")
        r1 = self.t("0,507", 46, VERT_OK).move_to(P(-1.05, -2.2))
        self.play(FadeIn(r1, scale=0.5), run_time=0.3)
        self.insister(r1, 1.3, 0.2)
        self.au_mot("Puis")
        anim, pts3 = self.pluie(bande, HASARDS[50:84], 0.5, run_time=0.8, lag=0.03)
        self.play(FadeOut(pts2), anim)
        self.au_mot("0,493")
        r2 = self.t("0,493", 46, VERT_OK).move_to(P(1.05, -2.2))
        self.play(FadeIn(r2, scale=0.5), run_time=0.3)
        self.insister(r2, 1.3, 0.2)
        self.au_mot("près de 0,5")
        pres = self.t("près de 0,5", 40, JAUNE_TITRE).move_to(P(0, -2.2))
        self.play(FadeOut(VGroup(test, cpt, div)), VGroup(r1, r2).animate.move_to(P(0, -0.9)),
                  Indicate(rep, color=JAUNE_TITRE, scale_factor=1.4), run_time=0.5)
        self.play(FadeIn(pres, scale=0.6), run_time=0.3)
        self.insister(pres, 1.25, 0.2)
        self.attendre_voix(marge=0.2)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(badge)
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.25))
        bande = Bande(-1.9, 1.9, 0.75, haut=0.45, fs=28)
        self.play(Write(toi), FadeIn(bande), run_time=0.5)
        self.au_mot("probabilité 0,3")
        rep = bande.repere(0.3, "0,3", JAUNE_TITRE, 28)
        zg = bande.zone(0, 0.3, VERT_PILE, 0.4)
        lbl = self.t("probabilité 0,3", 36, VERT_OK).move_to(P(0, -0.35))
        self.play(FadeIn(rep), FadeIn(zg), FadeIn(lbl, scale=0.6), run_time=0.4)
        self.au_mot("quel test")
        q = self.code("if ? :", 40)
        q.submobjects[2].set_color(ORANGE_RETENUE)
        q.move_to(P(0, -1.1))
        self.play(FadeIn(q, scale=0.6), run_time=0.3)
        self.insister(q.submobjects[2], 1.8, 0.2)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=42, color=VERT_OK),
                       self.grand("commentaire !", font_size=42, color=VERT_OK)).arrange(DOWN, buff=0.08)
        appel.move_to(P(0, -2.0))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
