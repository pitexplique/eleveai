# proba2_arbre_pondere_short.py
# EleveAI — Maths 2de — short jumeau de la série « Probabilités », épisode 9 :
# l'arbre pondéré. CEINTURE ORANGE. Il AMUSE : « 90 % des Réunionnais
# finissent… donc 90 % de ceux qui finissent sont réunionnais ? » — Non !
#   · en HAUT l'arche d'arrivée du trail de Cilaos et les coureurs, puis
#     l'ARBRE du coach (carte blanche) : R / R̄, puis F / F̄, 0,9 après R ;
#   · en BAS, EN MÊME TEMPS, les maths : l'inversion barrée, « 0,9 : parmi
#     les Réunionnais » ;
#   · fin : la branche R̄ allumée, « ? », « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/seconde-proba-arbre-pondere-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/seconde/proba2_arbre_pondere_short.py ShortProba2ArbrePondere -o eleveai-maths-seconde-proba-arbre-pondere-short --media_dir manim/scripts/seconde/media
# Puis copier le mp4 dans manim/sorties/seconde/maths/probabilites/09-arbre-pondere/.

import importlib.util
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parent))

# ⛔ Les helpers de la paysage, chargés par CHEMIN EXACT (des modules de même
# nom existent dans d'autres dossiers).
_spec = importlib.util.spec_from_file_location(
    "proba2_arbre_pondere_paysage", Path(__file__).resolve().parent / "proba2_arbre_pondere.py")
_pa = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_pa)
P, ArbreRF, FEUILLES, lettre = _pa.P, _pa.ArbreRF, _pa.FEUILLES, _pa.lettre
coureur, arche = _pa.coureur, _pa.arche
CHEMIN, REUNION, PROBA, PROBA_CLAIR = _pa.CHEMIN, _pa.REUNION, _pa.PROBA, _pa.PROBA_CLAIR

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

C_ARBRE = P(0, 0.35)


class ShortProba2ArbrePondere(Short6e):
    nom_voix = "seconde-proba-arbre-pondere-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=4.1):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.25, chacun=False):
        """Agrandir puis rétrécir ; chacun=True : chaque morceau autour de son propre centre."""
        ms = list(mob) if chacun else [mob]
        self.play(*[m.animate.scale(k) for m in ms], run_time=run_time)
        self.play(*[m.animate.scale(1 / k) for m in ms], run_time=run_time)

    def barrer(self, mob, sw=6):
        return Line(mob.get_corner(DL) + P(-0.06, -0.03), mob.get_corner(UR) + P(0.06, 0.03),
                    stroke_width=sw, color=ROUGE_ERREUR)

    def arbre(self):
        return ArbreRF(dx=1.15, pas=0.52, fs=24, fs_p=22, centre=C_ARBRE, lab_bas=True)

    def deux_lignes(self, l1, l2, fs=32):
        """Deux lignes centrées : [(texte, couleur), …] chacune."""
        a = VGroup(*[self.t(x, fs, c) for x, c in l1]).arrange(RIGHT, buff=0.15)
        b = VGroup(*[self.t(x, fs, c) for x, c in l2]).arrange(RIGHT, buff=0.15)
        return VGroup(a, b).arrange(DOWN, buff=0.1)

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("Le piège du trail", font_size=44, color=JAUNE_TITRE).move_to(P(0, 3.25))
        badge = echelle_ceintures("orange").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), run_time=0.6)
        ar = arche(1.5, 1.5).move_to(P(0.4, 0.75))
        sol = Line(P(-2.2, 0.0), P(2.2, 0.0), color=VERT_OK, stroke_width=3, stroke_opacity=0.6)
        cs = VGroup(*[coureur(REUNION, 0.8) for _ in range(3)]).arrange(RIGHT, buff=0.25)
        cs.move_to(P(-1.4, 0.45))
        self.play(FadeIn(ar), Create(sol), FadeIn(cs, shift=RIGHT * 0.5), run_time=0.5)
        self.play(cs.animate.shift(RIGHT * 1.4), run_time=1.0, rate_func=linear)
        self.au_mot("90 % des Réunionnais")
        y1 = -1.05
        l1 = self.deux_lignes([("Réunionnais :", REUNION)], [("90 %", JAUNE_TITRE), ("finissent", WHITE)], 34)
        l1.move_to(P(0, y1))
        self.play(FadeIn(l1, shift=UP * 0.15), cs.animate.shift(RIGHT * 0.8), run_time=0.5)
        self.insister(l1[1][0], 1.4, 0.2)
        self.au_mot("Donc 90 %")
        l2 = self.deux_lignes([("Ceux qui finissent :", ORANGE_RETENUE)],
                              [("90 %", ORANGE_RETENUE), ("réunionnais", ORANGE_RETENUE), ("?", ORANGE_RETENUE)], 32)
        l2[1][2].scale(1.6)
        l2.move_to(P(0, -2.35))
        self.play(FadeIn(l2[0], shift=UP * 0.15), run_time=0.35)
        self.au_mot("sont réunionnais")
        self.play(FadeIn(l2[1], shift=UP * 0.15), run_time=0.35)
        self.insister(l2[1][2], 1.4, 0.2)
        self.attendre_voix(marge=0.1)

        # ── 01 : non : 0,9, c'est une branche après R ──
        self.dire("01-image")
        self.au_mot("Non")
        barre = self.barrer(l2)
        non = self.grand("NON !", font_size=60, color=ROUGE_ERREUR).move_to(P(0, -1.45))
        self.play(Create(barre), FadeOut(l1), FadeIn(non, scale=0.5), run_time=0.35)
        a = self.arbre()
        self.play(FadeOut(VGroup(ar, sol, cs)), FadeIn(a.carte), FadeIn(a.depart), run_time=0.3)
        self.play(*[Create(a.branches[p]) for p in [("R",), ("Rb",)]],
                  *[FadeIn(a.lab[p]) for p in [("R",), ("Rb",)]], run_time=0.3)
        self.play(*[Create(a.branches[f]) for f in FEUILLES], *[FadeIn(a.lab[f]) for f in FEUILLES], run_time=0.35)
        self.au_mot("0,9, c'est")
        n9 = a.nombre(("R", "F"))
        self.play(FadeOut(VGroup(l2, barre, non)), FadeIn(n9, scale=0.4), run_time=0.35)
        self.insister(n9, 1.6, 0.2)
        self.au_mot("parmi les Réunionnais")
        parmi = VGroup(self.t("0,9 :", 40, PROBA_CLAIR), self.t("parmi les Réunionnais", 34, REUNION))
        parmi.arrange(DOWN, buff=0.08).move_to(P(0, -1.55))
        self.play(*a.etat(a.chemin(("R", "F"))), FadeIn(parmi, shift=UP * 0.15), run_time=0.4)
        self.au_mot("une branche après R")
        jeton = Dot(a.point(()), radius=0.09, color=CHEMIN)
        trajet = VMobject().set_points_as_corners([a.point(()), a.point(("R",)), a.point(("R", "F"))])
        self.play(MoveAlongPath(jeton, trajet), run_time=0.7, rate_func=linear)
        self.play(Indicate(a.lab[("R",)], color=CHEMIN, scale_factor=1.6), run_time=0.35)
        self.au_mot("Ce n'est pas")
        pas_ = VGroup(self.t("Pas la même", 32, ORANGE_RETENUE),
                      self.t("question !", 32, ORANGE_RETENUE)).arrange(DOWN, buff=0.06).move_to(P(0, -2.52))
        self.play(FadeIn(pas_, scale=0.6), run_time=0.35)
        self.insister(pas_, 1.1, 0.25)
        self.attendre_voix(marge=0.2)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(badge)
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.25))
        a = self.arbre()
        a.add(a.nombre(("R", "F")))
        n7 = a.nombre(("R",))
        q = a.nombre(("Rb",), "?", ORANGE_RETENUE)
        self.play(Write(toi), FadeIn(a), run_time=0.5)
        self.au_mot("la branche R vaut")
        self.play(a.branches[("R",)].animate.set_stroke(REUNION, 9),
                  Indicate(a.lab[("R",)], color=REUNION, scale_factor=1.5), run_time=0.4)
        self.au_mot("0,7")
        self.play(FadeIn(n7, scale=0.4), run_time=0.3)
        self.insister(n7, 1.7, 0.2)
        self.au_mot("Combien vaut")
        self.play(a.branches[("R",)].animate.set_stroke(_pa.BRANCHE, 4), run_time=0.3)
        self.au_mot("la branche R barre")
        self.play(a.branches[("Rb",)].animate.set_stroke(CHEMIN, 10), FadeIn(q, scale=0.4),
                  Indicate(a.lab[("Rb",)], color=CHEMIN, scale_factor=1.5), run_time=0.45)
        qb = VGroup(lettre("R", 46, CHEMIN, barre=True), self.t(":", 44), self.t("?", 60, ORANGE_RETENUE))
        qb.arrange(RIGHT, buff=0.2).move_to(P(0, -1.5))
        self.play(FadeIn(qb, scale=0.6), run_time=0.35)
        self.insister(VGroup(q, qb[2]), 1.5, 0.2, chacun=True)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=42, color=VERT_OK),
                       self.grand("commentaire !", font_size=42, color=VERT_OK)).arrange(DOWN, buff=0.08)
        appel.move_to(P(0, -2.45))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
