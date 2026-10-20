# proba2_tableau_arbre_short.py
# EleveAI — Maths 2de — short jumeau de la série « Probabilités », épisode 7 :
# tableau ou arbre. CEINTURE JAUNE. Il AMUSE : « pile puis rouge : un demi
# plus 1 sur 3 ? » — Non !
#   · en HAUT la pièce qui tourne et l'urne (1 rouge, 2 blanches), puis l'ARBRE
#     du coach (carte blanche) qui se construit, le chemin pile-rouge allumé ;
#   · en BAS, EN MÊME TEMPS, les maths : 1/2 + 1/3 ? barré, puis
#     1/2 × 1/3 = 1/6, et « + entre chemins différents » ;
#   · fin : le chemin face-rouge allumé, « ? », « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/seconde-proba-tableau-arbre-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/seconde/proba2_tableau_arbre_short.py ShortProba2TableauArbre -o eleveai-maths-seconde-proba-tableau-arbre-short --media_dir manim/scripts/seconde/media
# Puis copier le mp4 dans manim/sorties/seconde/maths/probabilites/07-tableau-arbre/.

import importlib.util
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parent))

# ⛔ Les helpers de la paysage, chargés par CHEMIN EXACT (des modules de même
# nom existent dans d'autres dossiers).
_spec = importlib.util.spec_from_file_location(
    "proba2_tableau_arbre_paysage", Path(__file__).resolve().parent / "proba2_tableau_arbre.py")
_pa = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_pa)
P, ArbreCoach, FEUILLES, frac_txt = _pa.P, _pa.ArbreCoach, _pa.FEUILLES, _pa.frac_txt
urne, boules_urne, piece_qui_tourne = _pa.urne, _pa.boules_urne, _pa.piece_qui_tourne
CHEMIN, CHEMIN2 = _pa.CHEMIN, _pa.CHEMIN2

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

C_ARBRE = P(0, 0.4)


class ShortProba2TableauArbre(Short6e):
    nom_voix = "seconde-proba-tableau-arbre-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=4.1):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def barrer(self, mob, sw=6):
        return Line(mob.get_corner(DL) + P(-0.06, -0.03), mob.get_corner(UR) + P(0.06, 0.03),
                    stroke_width=sw, color=ROUGE_ERREUR)

    def arbre(self):
        return ArbreCoach(dx=0.95, pas=0.5, fs=17, fs_p=16, centre=C_ARBRE, titre=None, lab_dx=-0.12)

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("Pile puis rouge ?", font_size=46, color=JAUNE_TITRE).move_to(P(0, 3.25))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), run_time=0.6)
        pc = piece_qui_tourne(P(-1.25, 0.85), 0.6)
        self.add(pc)
        self.au_mot("puis une urne")
        fl = Arrow(P(-0.5, 0.85), P(0.2, 0.85), buff=0, color=WHITE, stroke_width=4)
        u = urne(1.45, 1.15).move_to(P(1.15, 0.6))
        b = boules_urne(u, 0.18)
        self.play(GrowArrow(fl), FadeIn(u), FadeIn(b), run_time=0.45)
        self.au_mot("Pile puis rouge")
        pc.clear_updaters()
        pile = VGroup(Circle(radius=0.6, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_color=WHITE, stroke_width=3),
                      Text("PILE", font_size=20, color=BLACK, weight=BOLD)).move_to(P(-1.25, 0.85))
        self.remove(pc)
        self.add(pile)
        self.play(Flash(pile, color=JAUNE_TITRE), b[0].animate.shift(UP * 1.0), run_time=0.45)
        y = -1.7
        self.au_mot("un demi plus")
        n1 = frac_txt(1, 2, 44, ORANGE_RETENUE)
        plus = self.t("+", 48, ORANGE_RETENUE)
        n2 = frac_txt(1, 3, 44, ORANGE_RETENUE)
        q = self.t("?", 60, ORANGE_RETENUE)
        faux = VGroup(n1, plus, n2, q).arrange(RIGHT, buff=0.25).move_to(P(0, y))
        self.play(FadeIn(n1, scale=0.5), run_time=0.25)
        self.au_mot("plus 1 sur 3")
        self.play(FadeIn(plus), FadeIn(n2, scale=0.5), run_time=0.3)
        self.play(FadeIn(q, scale=0.5), run_time=0.2)
        self.insister(q, 1.4, 0.2)
        self.attendre_voix(marge=0.1)

        # ── 01 : non, on multiplie ──
        self.dire("01-image")
        self.au_mot("Non")
        barre = self.barrer(VGroup(n1, plus, n2))
        non = self.grand("NON !", font_size=56, color=ROUGE_ERREUR).move_to(P(0, -2.6))
        self.play(Create(barre), FadeIn(non, scale=0.5), run_time=0.35)
        self.au_mot("Sur un chemin")
        a = self.arbre()
        self.play(FadeOut(VGroup(pile, fl, u, b)), FadeIn(a.carte), FadeIn(a.depart), run_time=0.3)
        self.play(*[Create(a.branches[p]) for p in [("P",), ("F",)]],
                  *[FadeIn(a.lab[p]) for p in [("P",), ("F",)]], run_time=0.3)
        self.play(*[Create(a.branches[f]) for f in FEUILLES], *[FadeIn(a.lab[f]) for f in FEUILLES], run_time=0.35)
        f = ("P", "R")
        self.play(*a.etat(a.chemin(f)), FadeOut(VGroup(faux, barre, non)), run_time=0.35)
        self.au_mot("on multiplie")
        fois = self.t("×", 90, CHEMIN).move_to(P(0, -1.7))
        self.play(FadeIn(fois, scale=0.4), run_time=0.25)
        self.insister(fois, 1.4, 0.2)
        self.au_mot("un demi fois")
        c1, c2 = frac_txt(1, 2, 40), frac_txt(1, 3, 40)
        c3 = frac_txt(1, 6, 44, VERT_OK)
        calc = VGroup(c1, self.t("×", 40, CHEMIN), c2, self.t("=", 40), c3).arrange(RIGHT, buff=0.22)
        calc.move_to(P(0, -1.65))
        nb1 = a.nombre(("P",), 1, 2)
        self.play(FadeOut(fois), FadeIn(nb1, scale=0.5), FadeIn(c1, scale=0.5), FadeIn(calc[1]), run_time=0.3)
        self.au_mot("fois 1 sur 3")
        nb2 = a.nombre(f, 1, 3)
        self.play(FadeIn(nb2, scale=0.5), TransformFromCopy(nb2, c2), run_time=0.3)
        self.au_mot("1 sur 6")
        self.play(FadeIn(calc[3]), FadeIn(c3, scale=0.5), run_time=0.3)
        self.play(Create(SurroundingRectangle(c3, color=VERT_OK, buff=0.1)), run_time=0.2)
        self.insister(c3, 1.3, 0.2)
        self.au_mot("chemins différents")
        g = ("F", "R")
        self.play(*a.etat(a.chemin(f) + a.chemin(g), {g: CHEMIN2, ("F",): CHEMIN2}), run_time=0.35)
        entre = VGroup(self.t("+ seulement entre", 24, VERT_OK),
                       self.t("chemins différents", 24, VERT_OK)).arrange(DOWN, buff=0.06).move_to(P(0, -2.68))
        self.play(FadeIn(entre, shift=UP * 0.15), run_time=0.3)
        self.attendre_voix(marge=0.2)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(badge)
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.25))
        a = self.arbre()
        a.add(a.nombre(("P",), 1, 2), a.nombre(("P", "R"), 1, 3))
        self.play(Write(toi), FadeIn(a), run_time=0.5)
        self.au_mot("face puis rouge")
        g = ("F", "R")
        self.play(*a.etat(a.chemin(g), {g: CHEMIN2, ("F",): CHEMIN2}), run_time=0.4)
        q = VGroup(self.t("face puis rouge :", 30, CHEMIN2, largeur=3.3), self.t("?", 64, ORANGE_RETENUE))
        q.arrange(RIGHT, buff=0.2).move_to(P(0, -1.42))
        self.play(FadeIn(q, scale=0.6), run_time=0.35)
        self.au_mot("c'est combien")
        self.insister(q[1], 1.5, 0.2)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=42, color=VERT_OK),
                       self.grand("commentaire !", font_size=42, color=VERT_OK)).arrange(DOWN, buff=0.08)
        appel.move_to(P(0, -2.35))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
