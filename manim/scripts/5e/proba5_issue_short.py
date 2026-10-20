# proba5_issue_short.py
# EleveAI — Maths 5e — short jumeau de la série « Probabilités », épisode 2 :
# lister les issues. CEINTURE JAUNE. Il AMUSE : « deux piles, deux faces ou une
# de chaque : 1 chance sur 3 chacun ? » … non !
#   · en HAUT les deux pièces (1 € et 2 €) qui tournent, puis tombent sur
#     l'issue que la voix lit ;
#   · en BAS, EN MÊME TEMPS, les trois « cases » du pari, puis l'ARBRE (canvas
#     du coach) qui se construit ; pile-face et face-pile s'allument ;
#   · fin : deux faces, « ? sur 4 », « Réponds en commentaire ! ».
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
#
# Voix : manim/voix/5e-proba-issue-short.json (débit −8).
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/5e/proba5_issue_short.py ShortProba5Issue -o eleveai-maths-5e-proba-issue-short --media_dir manim/scripts/5e/media
# Puis copier le mp4 dans manim/sorties/5e/maths/probabilites/02-issues/.

import importlib.util
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent


def _charger(nom, chemin):
    if nom in sys.modules:
        return sys.modules[nom]
    spec = importlib.util.spec_from_file_location(nom, chemin)
    mod = importlib.util.module_from_spec(spec)
    sys.modules[nom] = mod
    spec.loader.exec_module(mod)
    return mod


_p = _charger("proba5_issue_paysage", ICI / "proba5_issue.py")  # pose aussi les chemins

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402

P, Arbre, piece_euro, euro_qui_tourne, jeton = _p.P, _p.Arbre, _p.piece_euro, _p.euro_qui_tourne, _p.jeton
echelle_ceintures, PILE_C, FACE_C = _p.echelle_ceintures, _p.PILE_C, _p.FACE_C

LARGEUR_MAX = 4.1
Y_PIECES = 1.05
X_PIECES = (-0.95, 0.95)


class ShortProba5Issue(Short6e):
    nom_voix = "5e-proba-issue-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def insister(self, mob, k=1.5, run_time=0.3):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def poser(self, tournantes, faces):
        """Arrête les deux pièces et pose sous chacune le jeton de sa face."""
        out = VGroup()
        for tt, v, x, f in zip(tournantes, (1, 2), X_PIECES, faces):
            tt.clear_updaters()
            tt.remove(*tt.submobjects)
            tt.add(piece_euro(v, 0.55).move_to(P(x, Y_PIECES)))
            out.add(jeton(f, 0.2).move_to(P(x, Y_PIECES - 0.72)))
        return out

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        titre = self.grand("Deux pièces", font_size=46, color=JAUNE_TITRE).move_to(P(0, 3.4))
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.3))
        p1 = euro_qui_tourne(P(X_PIECES[0], Y_PIECES), 1, 0.55, vitesse=9.0)
        p2 = euro_qui_tourne(P(X_PIECES[1], Y_PIECES), 2, 0.55, vitesse=7.5, phase=0.6)
        self.play(Write(titre), FadeIn(badge, shift=DOWN * 0.2), run_time=0.6)
        self.add(p1, p2)
        paris = VGroup()
        for ex, mot, faces, x in [("Deux piles", "deux\npiles", "PP", -1.45),
                                  ("deux faces", "deux\nfaces", "FF", 0.0),
                                  ("une de chaque", "une de\nchaque", "PF", 1.45)]:
            self.au_mot(ex)
            jt = VGroup(*[jeton(f, 0.2) for f in faces]).arrange(RIGHT, buff=0.06)
            lb = Text(mot, font_size=22, line_spacing=0.8)
            g = VGroup(jt, lb).arrange(DOWN, buff=0.15)
            cadre = RoundedRectangle(width=1.35, height=1.45, corner_radius=0.12, stroke_color=BLEU_CALCUL,
                                     stroke_width=3).move_to(P(x, -0.35))
            g.move_to(cadre)
            b = VGroup(cadre, g)
            self.play(FadeIn(b, shift=UP * 0.3, scale=0.8), run_time=0.3)
            paris.add(b)
        self.au_mot("1 chance sur 3")
        tiers = self.t("1 chance sur 3 chacun ?", 30, ORANGE_RETENUE).move_to(P(0, -1.55))
        self.play(FadeIn(tiers, scale=0.6), run_time=0.35)
        self.insister(tiers, 1.15, 0.2)
        self.attendre_voix(marge=0.1)

        # ── 01 : l'arbre ──
        self.dire("01-image")
        non = self.grand("Non !", font_size=64, color=VERT_OK).move_to(P(0, -0.35))
        barre = Line(tiers.get_left() + LEFT * 0.05, tiers.get_right() + RIGHT * 0.05, color=ROUGE_ERREUR, stroke_width=5)
        self.play(Create(barre), run_time=0.25)
        self.play(FadeOut(paris), FadeOut(VGroup(tiers, barre)), FadeIn(non, scale=0.5), run_time=0.35)
        self.play(Wiggle(non), run_time=0.45)

        A = Arbre(P(-2.05, -1.5), dx=0.85, pas=0.62, fs=20, fs_issue=20, x_issue=0.78, sw=3)
        self.au_mot("L'arbre")
        self.play(FadeOut(non, shift=UP * 0.3), FadeIn(A.rac), LaggedStart(*[Create(b) for b in A.b1], lag_ratio=0.3),
                  run_time=0.45)
        self.play(FadeIn(A.l1), LaggedStart(*[Create(b) for b in A.b2], lag_ratio=0.2), run_time=0.5)
        self.play(FadeIn(A.l2), run_time=0.2)
        self.au_mot("4 chemins")
        quatre = self.t("4 chemins", 30, JAUNE_TITRE).move_to(P(0, -0.12))
        jt = VGroup()
        self.play(FadeIn(quatre, scale=0.6), run_time=0.25)
        for k, faces in enumerate(["PP", "PF", "FP", "FF"]):
            nv = self.poser((p1, p2), faces)
            self.remove(jt)
            jt = nv
            self.add(jt)
            self.play(*A.allumer(k, WHITE, 6), FadeIn(A.issues[k], shift=LEFT * 0.15), run_time=0.25)
            self.play(*A.eteindre(k), run_time=0.12)

        for ex, k, faces in (("pile-face ET", 1, "PF"), ("face-pile", 2, "FP")):
            self.au_mot(ex)
            nv = self.poser((p1, p2), faces)
            self.remove(jt)
            jt = nv
            self.add(jt)
            cad = SurroundingRectangle(A.issues[k], color=VIOLET_ACCENT, buff=0.05, stroke_width=3)
            self.play(*A.allumer(k, VIOLET_ACCENT, 6), Create(cad), Indicate(jt, color=WHITE), run_time=0.4)

        self.au_mot("2 sur 4")
        deux = self.t("2 sur 4", 34, VERT_OK).move_to(P(0, -0.12))
        self.play(ReplacementTransform(quatre, deux), run_time=0.3)
        self.au_mot("un demi")
        demi = self.t("2 sur 4 : un demi !", 34, VERT_OK).move_to(P(0, -0.12))
        self.play(ReplacementTransform(deux, demi), run_time=0.3)
        self.insister(demi, 1.2, 0.25)
        self.attendre_voix(marge=0.2)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(badge)
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.4))
        self.play(Write(toi), run_time=0.4)
        q1 = euro_qui_tourne(P(X_PIECES[0], Y_PIECES), 1, 0.55, vitesse=9.0)
        q2 = euro_qui_tourne(P(X_PIECES[1], Y_PIECES), 2, 0.55, vitesse=7.5, phase=0.6)
        self.add(q1, q2)
        self.au_mot("deux faces")
        jf = self.poser((q1, q2), "FF")
        lab = self.t("deux faces", 32, FACE_C).move_to(P(0, -0.12))
        self.play(FadeIn(jf, scale=0.5), FadeIn(lab, shift=UP * 0.15), run_time=0.35)
        self.au_mot("combien sur 4")
        q = self.grand("? sur 4", font_size=54, color=ORANGE_RETENUE).move_to(P(0, -0.8))
        self.play(FadeIn(q, scale=0.5), run_time=0.35)
        self.insister(q, 1.25, 0.2)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=40, color=VERT_OK, marge=0.9),
                       self.grand("commentaire !", font_size=40, color=VERT_OK, marge=0.9)).arrange(DOWN, buff=0.1)
        appel.move_to(P(0, -1.68))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        poignee = Text("@eleveai974", font_size=26, color=BLEU_CALCUL).move_to(P(0, -2.62))
        self.play(GrowFromCenter(poignee), run_time=0.3)
        self.attendre_voix(marge=1.5)
