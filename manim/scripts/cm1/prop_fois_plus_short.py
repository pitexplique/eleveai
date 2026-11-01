# prop_fois_plus_short.py
# EleveAI — Maths CM1 — short jumeau de l'épisode 02 « Fois plus » (micro
# prop_fois_plus). CEINTURE BLANCHE (règle du short blanc, REGLES.md) : on VOIT
# « 6 fois plus haut », un seul calcul dit par la voix.
# Il AMUSE : « Sur la Lune, tu deviendrais champion de saut ! »
#   · EN HAUT, l'image qui bouge : un enfant saute sur Terre (ciel bleu), puis
#     sur la Lune (ciel noir étoilé), beaucoup plus haut ;
#   · EN BAS, au même instant, le schéma de billes en COLONNE : 1 bloc de 30 cm
#     sur Terre, le même bloc empilé 6 fois sur la Lune (× 6 → 180 cm), à côté
#     d'une porte (2 m) ;
#   · 1 question-pause (3 s) : un champion saute 2 m → 12 m (8 = ajouter 6,
#     6 = garder le coefficient) ; un immeuble de 4 étages ;
#   · fin : Ti Margo saute 10 cm sur Terre, et sur la Lune ? (60 cm), en commentaire.
# Centres d'intérêt : espace, sport.
# Données réelles (WebSearch, 01/11/2026) : la gravité à la surface de la Lune
# vaut environ 1/6 de celle de la Terre (1,62 m/s² contre 9,8 m/s², chiffres
# NASA repris par Space.com/AOL ; Britannica, « 8 questions about the Moon »).
# Avec la même impulsion, la hauteur d'un saut est inversement proportionnelle
# à la gravité : environ 6 fois plus haut (Britannica rappelle que la
# combinaison d'astronaute, lourde, empêche de le faire en vrai : la voix dit
# « environ » et « tu deviendrais », c'est juste). Un enfant saute environ
# 30 cm sur place (ordre de grandeur) ; une porte mesure environ 2 m (2,04 m
# en France) ; un étage d'immeuble environ 3 m (4 étages ≈ 12 m). Voix gardée.
# Ajouté ICI (absent du module) : enfant(), porte(), immeuble(), etoiles() ;
# la colonne de blocs = le schéma de billes posé debout (un bloc = 30 cm).
#
# Voix : manim/voix/cm1-prop-fois-plus-short.json (validée le 01/11, débit −10) ;
# WAV : public/sons/cm1-prop-fois-plus-short/ ; marques :
# manim/scripts/cm1/prop_fois_plus_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/cm1/prop_fois_plus_short.py PropFoisPlusShortCM1
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/cm1/prop_fois_plus_short.py PropFoisPlusShortCM1 -o eleveai-maths-cm1-prop-fois-plus-short --media_dir manim/scripts/cm1/media-prop-fois-plus-short
# Sortie : manim/sorties/cm1/maths/proportionnalite/02-fois-plus/eleveai-maths-cm1-prop-fois-plus-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from prop_commun import *  # noqa: E402,F403
from mascotte import MascotteMargouillat  # noqa: E402

SOL = -2.45        # le sol, au-dessus de Ti-Margo
U = 0.42           # la hauteur d'un bloc : 30 cm
BLOC = "#38bdf8"
LUNE = "#9ca3af"
X_KT, X_CT = -1.6, -0.85    # Terre : l'enfant, sa colonne
X_KL, X_CL, X_P = 0.4, 1.12, 1.82   # Lune : l'enfant, sa colonne, la porte


def enfant(s=0.3, tenue="#f97316"):
    """Un enfant en tenue de sport (le personnage générique, petit)."""
    return personne(peau="#c68642", tenue=tenue, cheveux="#1f2937", s=s)


def bloc(x, k, couleur=BLOC):
    """Le k-ième bloc (k = 0 en bas) de la colonne posée en x : 30 cm."""
    return RoundedRectangle(width=0.5, height=U - 0.04, corner_radius=0.06, fill_color=couleur, fill_opacity=0.9,
                            stroke_color=WHITE, stroke_width=2).move_to(P(x, SOL + U * (k + 0.5)))


def porte(h=200 * U / 30):
    """Une porte de 2 m, à la même échelle que les blocs (30 cm = U)."""
    cadre = Rectangle(width=0.42, height=h, fill_color="#92400e", fill_opacity=0.85, stroke_color="#fde68a",
                      stroke_width=3)
    poignee = Dot(radius=0.035, color="#fde68a").move_to(cadre.get_center() + P(0.12, -0.1))
    return VGroup(cadre, poignee).move_to(P(X_P, SOL + h / 2))


def immeuble(etages=4, h=0.32, w=1.2):
    """Un immeuble de `etages` étages (une rangée de fenêtres par étage)."""
    g = VGroup()
    for k in range(etages):
        e = Rectangle(width=w, height=h, fill_color="#475569", fill_opacity=1, stroke_color="#cbd5e1", stroke_width=2)
        e.move_to(P(0, (k + 0.5) * h))
        fen = VGroup(*[Rectangle(width=0.16, height=0.14, fill_color="#fde047", fill_opacity=1, stroke_width=0)
                       .move_to(P(x, (k + 0.5) * h)) for x in (-0.36, 0, 0.36)])
        g.add(e, fen)
    return g


def etoiles(n=14, x0=0.1, x1=2.05, y0=SOL + 0.2, y1=1.0, graine=7):
    rng = np.random.default_rng(graine)
    return VGroup(*[Dot(P(rng.uniform(x0, x1), rng.uniform(y0, y1)), radius=0.025, color=WHITE) for _ in range(n)])


class PropFoisPlusShortCM1(ShortProp):
    nom_voix = "cm1-prop-fois-plus-short"
    fichier_marques = "prop_fois_plus_short_marques.json"
    ceinture = "blanche"

    def decor(self):
        """Terre à gauche (ciel bleu pâle, herbe), Lune à droite (nuit étoilée, sol gris)."""
        ciel = Rectangle(width=2.0, height=3.4, fill_color="#0c4a6e", fill_opacity=0.55, stroke_width=0)
        ciel.move_to(P(-1.08, SOL + 1.7))
        herbe = Rectangle(width=2.0, height=0.14, fill_color="#16a34a", fill_opacity=1, stroke_width=0)
        herbe.move_to(P(-1.08, SOL - 0.07))
        sol_l = Rectangle(width=2.0, height=0.14, fill_color=LUNE, fill_opacity=1, stroke_width=0)
        sol_l.move_to(P(1.08, SOL - 0.07))
        crateres = VGroup(*[Ellipse(width=0.3, height=0.06, fill_color="#6b7280", fill_opacity=1, stroke_width=0)
                            .move_to(P(x, SOL - 0.07)) for x in (0.5, 1.5)])
        nt = self.t("Terre", 26, "#7dd3fc").move_to(P(-1.08, SOL - 0.38))
        nl = self.t("Lune", 26, LUNE).move_to(P(1.08, SOL - 0.38))
        for n in (nt, nl):
            n.sans_synchro = True
        terre = VGroup(ciel, herbe, nt)
        lune = VGroup(etoiles(), sol_l, crateres, nl)
        return terre, lune

    def poser_enfant(self, x, tenue="#f97316"):
        k = enfant(tenue=tenue)
        return k.move_to(P(x, SOL + k.height / 2))

    def sauter(self, k, h, run_time=0.8, *autres):
        self.play(k.animate(rate_func=there_and_back).shift(UP * h), *autres, run_time=run_time)

    def _rep_q(self, sc):
        lg = sc.ligne_rep(0, ["2 ×", "6 =", "12 mètres !"])
        for m, mot in zip(lg, ["2 fois", "6, égale", "12 mètres"]):
            sc.au_mot(mot)
            sc.play(FadeIn(m, shift=UP * 0.12), run_time=0.25)
        imm = immeuble()
        haut = lg.get_bottom()[1] - 0.25
        if haut - imm.height < -2.7:
            imm.scale_to_fit_height(max(0.5, haut + 2.7))
        imm.next_to(lg, DOWN, buff=0.25).set_x(0)
        e4 = self.t("4 étages", 28, "#fde047").next_to(imm, RIGHT, buff=0.2)
        VGroup(imm, e4).set_x(0)
        sc.au_mot("4 étages")
        sc.play(LaggedStart(*[FadeIn(m, shift=UP * 0.1) for m in imm], lag_ratio=0.1), FadeIn(e4, scale=1.2),
                run_time=0.6)
        sc.rep_fini()

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Champion sur la Lune", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]
        titre.sans_synchro = True  # le titre de la vidéo : posé d'un bloc
        terre, lune = self.decor()
        kt, kl = self.poser_enfant(X_KT), self.poser_enfant(X_KL, "#a855f7")

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.au_mot("Sur la Lune")
        self.play(Write(titre), FadeIn(terre), FadeIn(lune), FadeIn(kt), FadeIn(kl), run_time=0.7)
        self.au_mot("champion")
        ch = self.borne(self.t("champion de saut !", 34, AMBRE), 0.8).move_to(P(0, 1.55))
        self.play(FadeIn(ch, scale=1.2), run_time=0.35)
        self.sauter(kl, 2.2, 1.4)
        self.attendre_voix(marge=0.2)

        # ── 01 : sur Terre, 30 cm ──
        self.dire("01-terre")
        self.au_mot("Sur Terre")
        l1 = self.borne(self.ligne([("Sur Terre :", "#7dd3fc"), ("30 cm", BLOC)], 34), 0.8).move_to(P(0, 1.55))
        self.play(FadeOut(ch), FadeIn(l1[0], shift=UP * 0.12), Indicate(terre[2], color="#7dd3fc"), run_time=0.4)
        self.au_mot("tu sautes")
        self.sauter(kt, U, 0.7)
        b0 = bloc(X_CT, 0)
        self.au_mot("30 centimètres")
        e30 = self.t("30 cm", 24, BLOC).next_to(b0, UP, buff=0.1)
        self.play(FadeIn(l1[1], scale=1.3), GrowFromEdge(b0, DOWN), FadeIn(e30), run_time=0.45)
        self.sauter(kt, U, 0.7)
        self.attendre_voix(marge=0.2)

        # ── 02 : sur la Lune, 6 fois plus haut : 180 cm ──
        self.dire("02-lune")
        self.au_mot("Sur la Lune")
        l2 = self.ligne([("Sur la Lune :", LUNE), ("6 fois plus haut", AMBRE)], 30).move_to(P(0, 1.75))
        self.play(FadeOut(l1), FadeIn(l2[0], shift=UP * 0.12), Indicate(lune[3], color=LUNE), run_time=0.4)
        bl = [bloc(X_CL, k) for k in range(6)]
        self.au_mot("6 fois plus haut")
        f6 = self.t("× 6", 30, AMBRE).next_to(VGroup(*bl), UP, buff=0.12)
        f6._pas_audit = f6.sans_synchro = True  # « 6 fois » : dit à l'instant
        self.play(FadeIn(l2[1], scale=1.2), TransformFromCopy(b0, bl[0]), run_time=0.3)
        self.play(LaggedStart(*[TransformFromCopy(bl[0], b) for b in bl[1:]], lag_ratio=0.25), FadeIn(f6), run_time=0.9)
        lg = self.ligne([("30 ×", WHITE), ("6 =", AMBRE), ("180 cm", VERT_OK)], 34).move_to(P(0, 1.2))
        self.au_mot("30 fois")
        self.play(FadeIn(lg[0], shift=RIGHT * 0.12), Indicate(b0, color=BLOC), run_time=0.3)
        self.au_mot("6, égale")
        self.play(FadeIn(lg[1], shift=RIGHT * 0.12), run_time=0.3)
        self.au_mot("180 centimètres")
        self.play(FadeIn(lg[2], scale=1.3), Indicate(VGroup(*bl), color=VERT_OK, scale_factor=1.05), run_time=0.45)
        self.insister(lg[2], 1.2)
        self.sauter(kl, 6 * U, 1.4)
        pt = porte()
        self.au_mot("porte")
        np_ = self.t("porte", 24, "#fde68a").rotate(PI / 2).move_to(pt[0].get_center() + UP * 0.3)
        self.play(FadeIn(pt, shift=UP * 0.2), FadeIn(np_), run_time=0.45)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 03 : la question-pause (3 s) ──
        self.question_pause("03-question", "03b-reponse", ["Un champion saute 2 m", "sur Terre. Sur la Lune ?"],
                            [self.t("8 mètres", 30), self.t("12 mètres", 30), self.t("6 mètres", 30)], 1,
                            ["2 × 6 = 12 mètres !"], mot_q="Un champion", autres_r=self._rep_q)
        self.vider(garder)

        # ── 04 : la question en commentaire : Ti Margo sur la Lune ──
        self.dire("04-commentaire")
        tm = MascotteMargouillat().scale(0.55).move_to(P(0, 0.95))
        self.au_mot("Et Ti Margo")
        nom = self.t("Ti Margo", 34, VERT_OK).move_to(P(0, 1.85))
        self.play(FadeIn(tm, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("10 centimètres")
        r1 = self.ligne([("Sur Terre :", "#7dd3fc"), ("10 cm", BLOC)], 34).move_to(P(0, -0.1))
        self.play(FadeIn(r1, shift=UP * 0.15), tm.animate(rate_func=there_and_back).shift(UP * 0.25), run_time=0.6)
        self.au_mot("Combien")
        r2 = self.ligne([("Sur la Lune :", LUNE), ("?", AMBRE)], 40).move_to(P(0, -0.85))
        self.play(FadeIn(r2, scale=1.2), run_time=0.4)
        self.play(tm.animate(rate_func=there_and_back).shift(UP * 0.7), run_time=0.6)
        self.insister(r2[1], 1.3)
        self.appel_commentaire(y=-1.75)
