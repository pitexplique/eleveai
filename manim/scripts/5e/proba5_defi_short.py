# proba5_defi_short.py
# EleveAI — Maths 5e — short jumeau de Probabilités, épisode 5 : les défis.
# CEINTURE JAUNE. Il AMUSE : le pari « deux pièces, au moins un pile ? ».
#   · en HAUT, les deux pièces qui tournent, puis les 4 issues en paires de pièces
#     (PP, PF, FP, FF) : face-face s'encadre en rouge, les 3 autres en vert ;
#   · en BAS, EN MÊME TEMPS : « 4 issues », « sans pile : face-face »,
#     « au moins un pile : 3/4 », « très probable ! » ;
#   · fin : trois pièces, « au moins un pile : ? sur 8 », « Réponds en commentaire ! ».
# Dessins repris de la paysage (proba5_defi.py, chargée par CHEMIN EXACT).
# Ti-Margo en bas (margo_bas). Aucun nom de personne à l'écran.
# Voix : manim/voix/5e-proba-defi-short.json (débit −8).
#
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/5e/proba5_defi_short.py ShortProba5Defi -o eleveai-maths-5e-proba-defi-short --media_dir manim/scripts/5e/media
# Puis copier le mp4 dans manim/sorties/5e/maths/probabilites/05-defis/.

import importlib.util
from pathlib import Path

_spec = importlib.util.spec_from_file_location(
    "proba5_defi_pour_short", Path(__file__).resolve().parent / "proba5_defi.py")
_pd = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_pd)  # pose aussi les chemins (charte, gabarits)
P, ISSUES, piece_fixe, piece_qui_tourne = _pd.P, _pd.ISSUES, _pd.piece_fixe, _pd.piece_qui_tourne
issue_texte, fraction, PILE_C = _pd.issue_texte, _pd.fraction, _pd.PILE_C

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402

LARGEUR_MAX = 4.1
CASES = [P(-1.05, 1.95), P(1.05, 1.95), P(-1.05, 0.9), P(1.05, 0.9)]  # PP, PF / FP, FF


class ShortProba5Defi(Short6e):
    nom_voix = "5e-proba-defi-short"

    def t(self, texte, font_size=30, color=WHITE, largeur=LARGEUR_MAX):
        t = Text(texte, font_size=font_size, color=color)
        if t.width > largeur:
            t.scale_to_fit_width(largeur)
        return t

    def ligne(self, morceaux, font_size=30, buff=0.15):
        g = VGroup()
        for m, c in morceaux:
            g.add(m if isinstance(m, Mobject) else self.t(m, font_size, c))
        g.arrange(RIGHT, buff=buff)
        if g.width > LARGEUR_MAX:
            g.scale_to_fit_width(LARGEUR_MAX)
        return g

    def insister(self, mob, k=1.4, run_time=0.25):
        self.play(mob.animate.scale(k), run_time=run_time)
        self.play(mob.animate.scale(1 / k), run_time=run_time)

    def paire(self, code, r=0.36):
        return VGroup(piece_fixe(code[0], r, mot=False), piece_fixe(code[1], r, mot=False)).arrange(RIGHT, buff=0.1)

    def construct(self):
        self.margo_bas()

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        badge = echelle_ceintures("jaune").scale_to_fit_width(config.frame_width * 0.7).move_to(P(0, 2.75))
        t1 = piece_qui_tourne(P(-0.85, 1.4), 0.7)
        t2 = piece_qui_tourne(P(0.85, 1.4), 0.7, phase=0.35)
        self.add(t1, t2)
        self.play(FadeIn(badge, shift=DOWN * 0.2), run_time=0.4)
        deux = self.ligne([("2", JAUNE_TITRE), ("pièces", WHITE)], 40).move_to(P(0, 0.05))
        self.play(FadeIn(deux, scale=0.6), run_time=0.35)
        self.au_mot("Au moins un pile")
        titre = self.grand("Au moins un pile ?", font_size=40, color=JAUNE_TITRE).move_to(P(0, 3.4))
        self.play(Write(titre), run_time=0.6)
        self.au_mot("tu paries")
        pari = self.grand("Tu paries ?", font_size=56, color=ORANGE_RETENUE).move_to(P(0, -1.0))
        self.play(FadeIn(pari, scale=0.5), run_time=0.35)
        self.play(Wiggle(pari), run_time=0.6)
        self.attendre_voix(marge=0.1)
        t1.clear_updaters()
        t2.clear_updaters()

        # ── 01 : les 4 issues en haut, le calcul en bas ──
        self.dire("01-image")
        paires = VGroup(*[self.paire(c).move_to(p) for c, p in zip(ISSUES, CASES)])
        self.au_mot("4 issues")
        self.remove(t1, t2)
        quatre = self.ligne([("4", JAUNE_TITRE), ("issues", WHITE)], 38).move_to(P(0, 0.1))
        self.play(FadeOut(VGroup(deux, pari), shift=DOWN * 0.2),
                  LaggedStart(*[FadeIn(pq, scale=0.5) for pq in paires], lag_ratio=0.15), run_time=0.6)
        self.play(FadeIn(quatre, shift=UP * 0.2), run_time=0.3)
        self.insister(quatre[0], 1.5)

        self.au_mot("Une seule sans pile")
        rouge = SurroundingRectangle(paires[3], color=ROUGE_ERREUR, buff=0.1, stroke_width=5)
        sans = self.t("sans pile :", 30, ROUGE_ERREUR)
        ff = issue_texte("FF", 30)
        l2 = VGroup(sans, ff).arrange(RIGHT, buff=0.15).move_to(P(0, -0.45))
        self.play(Create(rouge), FadeIn(sans, shift=UP * 0.15), run_time=0.45)
        self.au_mot("face-face")
        self.play(FadeIn(ff, scale=0.6), Wiggle(paires[3]), run_time=0.6)

        self.au_mot("Donc au moins un pile")
        verts = VGroup(*[SurroundingRectangle(pq, color=VERT_OK, buff=0.1, stroke_width=5) for pq in paires[:3]])
        amp = VGroup(self.t("au moins", 30, BLEU_CALCUL),
                     self.ligne([("un", BLEU_CALCUL), ("pile", PILE_C), (":", WHITE)], 30)).arrange(DOWN, buff=0.1)
        self.play(LaggedStart(*[Create(v) for v in verts], lag_ratio=0.2),
                  paires[3].animate.set_opacity(0.35), rouge.animate.set_stroke(opacity=0.35), run_time=0.7)
        self.au_mot("3 sur 4")
        f34 = fraction(3, 4, 46, VERT_OK)
        l3 = VGroup(amp, f34).arrange(RIGHT, buff=0.3).move_to(P(0, -1.2))
        amp.set_y(f34.get_y())
        self.play(FadeIn(amp, shift=UP * 0.15), FadeIn(f34, scale=0.6), run_time=0.45)
        self.play(*[pq.animate.shift(UP * 0.15) for pq in paires[:3]], run_time=0.2)
        self.play(*[pq.animate.shift(DOWN * 0.15) for pq in paires[:3]], run_time=0.2)
        self.insister(f34, 1.4)
        self.au_mot("très probable")
        tp = self.grand("Très probable !", font_size=40, color=VERT_OK).move_to(P(0, -2.05))
        self.play(FadeIn(tp, scale=0.6), run_time=0.35)
        self.play(Flash(tp, color=VERT_OK, line_length=0.25), run_time=0.5)
        self.attendre_voix(marge=0.3)

        # ── 02 : la question ──
        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.add(badge)
        toi = self.grand("Et toi ?", font_size=50, color=JAUNE_TITRE).move_to(P(0, 3.4))
        self.play(Write(toi), run_time=0.4)
        self.au_mot("trois pièces")
        tr = [piece_qui_tourne(P(x, 1.45), 0.55, phase=ph) for x, ph in ((-1.3, 0.0), (0, 0.45), (1.3, 0.9))]
        self.add(*tr)
        trois = self.ligne([("3", JAUNE_TITRE), ("pièces", WHITE)], 38).move_to(P(0, 0.5))
        self.play(FadeIn(trois, scale=0.6), run_time=0.35)
        self.au_mot("au moins un pile")
        amp2 = self.ligne([("au moins un", BLEU_CALCUL), ("pile", PILE_C)], 34).move_to(P(0, 0.0))
        self.play(FadeIn(amp2, shift=UP * 0.15), run_time=0.35)
        self.au_mot("combien sur 8")
        fq = fraction("?", 8, 44, ORANGE_RETENUE).move_to(P(0, -0.85))
        self.play(FadeIn(fq, scale=0.5), run_time=0.35)
        self.insister(fq[0], 1.6)
        self.au_mot("Réponds en commentaire")
        appel = VGroup(self.grand("Réponds en", font_size=40, color=VERT_OK),
                       self.grand("commentaire !", font_size=40, color=VERT_OK)).arrange(DOWN, buff=0.08)
        appel.move_to(P(0, -1.9))
        self.play(FadeIn(appel, scale=0.7), run_time=0.4)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.5)
        for p in tr:
            p.clear_updaters()
