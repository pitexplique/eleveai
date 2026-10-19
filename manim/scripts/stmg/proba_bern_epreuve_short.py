# proba_bern_epreuve_short.py
# EleveAI — Maths STMG ET Maths 1re (tronc commun) — short jumeau de
# « L'épreuve de Bernoulli : deux issues, succès ou échec ».
# CEINTURE JAUNE. Il AMUSE : un dé à six faces devient un pile ou face !
#   · en HAUT : le dé qui roule, puis qui se change en PIÈCE : côté vert « 6 »,
#     côté rouge « pas 6 » ; elle saute et retombe d'un côté puis de l'autre ;
#   · en BAS, EN MÊME TEMPS : « 6 faces », « est-ce un 6 ? », « Oui : succès
#     1/6 », « Non : échec 5/6 », « épreuve de Bernoulli » ;
#   · fin : « nombre pair », « p = ? » et « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne ni de classe à l'écran :
# UN seul rendu, copié dans les dossiers STMG et 1re.
#
# Voix : manim/voix/stmg-premiere-proba-bern-epreuve-short.json (débit −7).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/stmg/proba_bern_epreuve_short.py ShortProbaBernEpreuve -o eleveai-maths-stmg-proba-bern-epreuve-short --media_dir manim/scripts/stmg/media-bern_epreuve
# Puis copier le mp4 dans manim/sorties/stmg/maths/probabilites/18-bern-epreuve/ et, sous le nom
# eleveai-maths-premiere-commun-proba-bern-epreuve-short.mp4, dans manim/sorties/premiere-commun/maths/probabilites/18-bern-epreuve/.

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from proba_bern_epreuve import ECHEC, SUCCES, P, de  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from proba_pc_conditionnelle import frac, lettre, suite  # noqa: E402

LARGEUR_MAX = 4.1


def cote_piece(succes=True, r=0.95):
    """Un côté de la pièce : vert avec le dé sur 6, ou rouge avec « pas 6 »."""
    couleur = SUCCES if succes else ECHEC
    disque = Circle(radius=r, fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=5)
    anneau = Circle(radius=r * 0.82, stroke_color=WHITE, stroke_width=2, stroke_opacity=0.7)
    if succes:
        centre = de(6, r * 0.95)
    else:
        centre = Text("pas 6", font_size=int(r * 44), color=WHITE, weight=BOLD)
    return VGroup(disque, anneau, centre)


class ShortProbaBernEpreuve(Short6e):
    nom_voix = "stmg-premiere-proba-bern-epreuve-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def rouler(self, d, faces, c=1.5):
        """Le dé roule : il tourne et change de face à chaque quart de tour."""
        for f in faces:
            nv = de(f, c).move_to(d)
            self.play(Rotate(d, PI / 2), run_time=0.12)
            d.become(nv)

    def sauter(self, p, nouveau, hauteur=0.7):
        """La pièce saute en s'aplatissant, et retombe sur l'autre côté."""
        self.play(p.animate.shift(UP * hauteur).stretch(0.06, 1), run_time=0.15, rate_func=rate_functions.ease_out_quad)
        nouveau.move_to(p).stretch(0.06, 1)
        p.become(nouveau)
        self.play(p.animate.shift(DOWN * hauteur).stretch(1 / 0.06, 1), run_time=0.18,
                  rate_func=rate_functions.ease_in_quad)

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche : un dé… en pile ou face ? ──
        self.dire("00-accroche")
        titre = self.grand("Un dé à six faces", font_size=44, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.55))
        d = de(1, 1.5).move_to(P(0, 0.9))
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), FadeIn(d, scale=0.5), run_time=0.7)
        self.au_mot("six faces")
        six = VGroup(*[de(f, 0.55) for f in range(1, 7)]).arrange(RIGHT, buff=0.12).move_to(P(0, -0.75))
        lab = self.t("6 faces", 38, BLEU_CALCUL).move_to(P(0, -1.45))
        self.play(LaggedStart(*[FadeIn(x, shift=UP * 0.2) for x in six], lag_ratio=0.15), run_time=0.6)
        self.play(FadeIn(lab, scale=0.6), run_time=0.3)
        self.rouler(d, [2, 3, 4, 5, 6])
        self.au_mot("un pile ou face")
        piece = cote_piece(True).move_to(d)
        self.play(ReplacementTransform(d, piece), run_time=0.45)
        pf = self.t("pile ou face ?", 42, ORANGE_RETENUE).move_to(P(0, -2.15))
        self.play(FadeIn(pf, scale=0.5), run_time=0.35)
        self.sauter(piece, cote_piece(False))
        self.sauter(piece, cote_piece(True))
        self.au_mot("Comment")
        self.play(Wiggle(pf), run_time=0.6)
        self.attendre_voix(marge=0.1)

        # ── 01 : une seule question : 6 ou pas 6 ──
        self.dire("01-image")
        q = self.t("« est-ce un 6 ? »", 36, JAUNE_TITRE).move_to(P(0, -0.45))
        self.play(FadeOut(VGroup(six, lab, pf), shift=DOWN * 0.2), FadeOut(badge), run_time=0.3)
        self.au_mot("« est-ce un 6 ? »")
        self.play(FadeIn(q, shift=UP * 0.2), run_time=0.4)
        self.insister(q, 1.06)
        oui = suite(self.t("Oui :", 34), self.t("succès", 34, SUCCES), frac("1", "6", 34, SUCCES), buff=0.18)
        oui.move_to(P(0, -1.35))
        self.au_mot("Oui : succès")
        self.sauter(piece, cote_piece(True))
        self.play(FadeIn(oui[:2], shift=UP * 0.15), Flash(piece, color=SUCCES), run_time=0.4)
        self.au_mot("1 chance sur 6")
        self.play(FadeIn(oui[2], scale=0.5), run_time=0.35)
        self.insister(oui[2], 1.3)
        non = suite(self.t("Non :", 34), self.t("échec", 34, ECHEC), frac("5", "6", 34, ECHEC), buff=0.18)
        non.move_to(P(0, -2.35))
        self.au_mot("Non : échec")
        self.sauter(piece, cote_piece(False))
        self.play(FadeIn(non[:2], shift=UP * 0.15), Flash(piece, color=ECHEC), run_time=0.4)
        self.au_mot("5 chances sur 6")
        self.play(FadeIn(non[2], scale=0.5), run_time=0.35)
        self.insister(non[2], 1.3)
        self.au_mot("Deux issues")
        bern = VGroup(self.t("Deux issues :", 32), self.t("épreuve de Bernoulli", 40, VERT_OK)).arrange(DOWN, buff=0.1)
        bern.move_to(P(0, 2.55))
        self.play(FadeIn(bern, shift=DOWN * 0.2), run_time=0.45)
        self.insister(bern[1], 1.12)
        self.attendre_voix(marge=0.1)

        # ── 02 : la question : un nombre pair ──
        self.dire("02-question")
        toi = self.grand("Et pair ?", font_size=54, color=JAUNE_TITRE).move_to(P(0, 3.4))
        d2 = de(2, 1.5).move_to(P(0, 0.9))
        self.play(ReplacementTransform(titre, toi), FadeOut(VGroup(q, oui, non, bern), shift=DOWN * 0.3),
                  ReplacementTransform(piece, d2), run_time=0.5)
        self.au_mot("succès : « le nombre est pair »")
        s = VGroup(suite(lettre("S", 40, SUCCES), self.t(":", 34)),
                   self.t("« le nombre est pair »", 34, SUCCES)).arrange(DOWN, buff=0.1)
        s.move_to(P(0, -0.6))
        self.play(FadeIn(s, shift=UP * 0.15), run_time=0.45)
        self.rouler(d2, [3, 4, 5, 6, 1, 2])
        self.au_mot("Quel est le paramètre p")
        pq = suite(self.t("p", 56, JAUNE_TITRE), self.t("=", 56), self.t("?", 60, ORANGE_RETENUE), buff=0.25)
        pq.move_to(P(0, -1.5))
        self.play(FadeIn(pq, scale=0.6), run_time=0.35)
        self.insister(pq[2], 1.4)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.t("Réponds en", 44, VERT_OK), self.t("commentaire !", 44, VERT_OK)).arrange(DOWN, buff=0.1)
        appel.move_to(P(0, -2.3))
        self.play(d2.animate.scale(0.6).move_to(P(0, 2.15)), VGroup(s, pq).animate.shift(UP * 1.0), run_time=0.35)
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.play(appel.animate.scale(1.08), run_time=0.25)
        self.play(appel.animate.scale(1 / 1.08), run_time=0.25)
        self.attendre_voix(marge=1.5)
