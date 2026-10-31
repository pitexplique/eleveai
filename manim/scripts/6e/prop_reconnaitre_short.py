# prop_reconnaitre_short.py
# EleveAI — Maths 6e — short jumeau de l'épisode 01 « Reconnaître la
# proportionnalité » (micro prop_reconnaitre). CEINTURE BLANCHE (règle du short
# blanc, REGLES.md) : on VOIT la notion, aucun calcul posé.
# Il AMUSE : « Et si ta taille était proportionnelle à ton âge ? »
#   · EN HAUT, l'image qui bouge : l'enfant marche au-dessus de SA colonne du
#     tableau et grandit (bébé 75 cm → 150 cm à 2 ans → 900 cm à 12 ans, plus
#     haut que la girafe), puis retombe à sa vraie taille (≈ 1 m 50) ;
#   · EN BAS, au même instant, le tableau âge → taille se remplit (même
#     colonne, même couleur bleue que l'enfant ; 900 en rouge, barré) ;
#   · 1 question-pause (3 s) : 1 place 7 €, 3 places 21 €, proportionnel ?
#   · fin : « combien mesurerait-on à 40 ans ? » (3 000 cm = 30 m).
# Centres d'intérêt : corps-sante, animaux, cinema-series.
# Données réelles (WebSearch, 31/10/2026) : ≈ 75 cm à 1 an (OMS 0-5 ans) ;
# ≈ 150 cm à 12 ans (OMS 5-19 ans : ≈ 149 cm garçons, ≈ 151 cm filles) ;
# girafe adulte 4,3 à 5,9 m (record 5,88 m) : 9 m est bien « plus haut
# qu'une girafe ». Dessin : girafe de 5,5 m, à l'échelle de l'enfant.
#
# Voix : manim/voix/6e-prop-reconnaitre-short.json (validée, débit −10) ;
# marques : manim/scripts/6e/prop_reconnaitre_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/6e/prop_reconnaitre_short.py PropReconnaitreShort6e
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/prop_reconnaitre_short.py PropReconnaitreShort6e -o eleveai-maths-6e-prop-reconnaitre-short --media_dir manim/scripts/6e/media-prop-reconnaitre-short
# Sortie : manim/sorties/6e/maths/proportionnalite/01-reconnaitre/eleveai-maths-6e-prop-reconnaitre-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403
from prop_reconnaitre import enfant  # noqa: E402

SOL = 0.3            # la ligne du sol, dans la bande du haut
K1 = 0.0082          # unités par cm (bébé et 2 ans)
K2 = 0.0021          # unités par cm après le « zoom arrière » (9 m tient)
BLEU_E = "#38bdf8"   # l'enfant = la ligne des tailles


def girafe(h):
    """Une girafe de hauteur h (pieds en y = 0, centrée en x = 0)."""
    jaune, tache = "#f4b942", "#9a5b13"
    pattes = VGroup(*[Rectangle(width=h * 0.045, height=h * 0.36, fill_color=jaune, fill_opacity=1,
                                stroke_width=0).move_to(P(x * h, h * 0.18)) for x in (-0.13, -0.08, 0.08, 0.13)])
    corps = Ellipse(width=h * 0.42, height=h * 0.2, fill_color=jaune, fill_opacity=1, stroke_width=0)
    corps.move_to(P(0, h * 0.42)).rotate(0.12)
    cou = Polygon(P(h * 0.1, h * 0.46), P(h * 0.2, h * 0.5), P(h * 0.25, h * 0.9), P(h * 0.18, h * 0.92),
                  fill_color=jaune, fill_opacity=1, stroke_width=0)
    tete = Ellipse(width=h * 0.16, height=h * 0.08, fill_color=jaune, fill_opacity=1, stroke_width=0)
    tete.move_to(P(h * 0.25, h * 0.94)).rotate(-0.3)
    cornes = VGroup(*[Line(P(h * x, h * 0.96), P(h * x, h * 1.0), color=tache, stroke_width=3)
                      for x in (0.2, 0.24)])
    taches = VGroup(*[Circle(radius=h * 0.025, fill_color=tache, fill_opacity=1, stroke_width=0)
                      .move_to(P(h * x, h * y)) for x, y in ((-0.1, 0.43), (0.0, 0.46), (0.1, 0.42), (-0.03, 0.38),
                                                            (0.17, 0.6), (0.2, 0.75))])
    oeil = Dot(P(h * 0.27, h * 0.95), radius=h * 0.008, color=BLACK)
    return VGroup(pattes, corps, cou, tete, cornes, taches, oeil).move_to(P(0, h / 2))


def debout(m, x, sol=SOL):
    """Pose m debout sur le sol, au-dessus de l'abscisse x."""
    return m.move_to(P(x, sol + m.height / 2))


class PropReconnaitreShort6e(ShortProp):
    nom_voix = "6e-prop-reconnaitre-short"
    fichier_marques = "prop_reconnaitre_short_marques.json"
    ceinture = "blanche"

    def _rep_q(self, sc):
        """La réponse de la question-pause, morceau par morceau, au mot."""
        lg = sc.ligne_rep(0, ["3 ×", "7 =", "21 :", "toujours ×", "7."])
        for m, mot in zip(lg, ["3 fois", "7, égale", "21 :", "toujours", "7."]):
            sc.au_mot(mot)
            sc.play(FadeIn(m, shift=UP * 0.12), run_time=0.25)
        sc.rep_fini()

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Ta taille et ton âge", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]
        tb = TableauProp(["Âge (ans)", "Taille (cm)"], [[1, 2, 12], [75, 150, 900]], montrer=False,
                         largeur_case=0.8, largeur_libelle=1.4, hauteur=0.62, fs=28, marge=0.16,
                         centre=P(0, -1.5))
        sol = Line(P(-2.05, SOL), P(2.05, SOL), color=GREY_C, stroke_width=4)
        xs = [tb.x(c) for c in range(3)]

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.au_mot("ta taille")
        self.play(Write(titre), run_time=0.6)
        self.au_mot("proportionnelle")
        self.play(FadeIn(tb.fond, shift=UP * 0.2), Create(sol), run_time=0.5)
        self.au_mot("âge")
        self.play(Indicate(tb.libelles[0], color=AMBRE), run_time=0.5)
        self.attendre_voix(marge=0.2)

        # ── 01 : le bébé, 75 cm ──
        self.dire("01-bebe")
        bebe = debout(enfant(75 * K1, BLEU_E), xs[0])
        self.au_mot("1 an")
        self.play(tb.allumer(0, 0), FadeIn(tb.valeur(0, 0), scale=1.4), GrowFromEdge(bebe, DOWN), run_time=0.5)
        self.au_mot("75 cm")
        e75 = self.t("75 cm", 26, BLEU_E).next_to(bebe, UP, buff=0.08)
        self.play(tb.eteindre(0, 0), tb.allumer(1, 0), FadeIn(tb.valeur(1, 0), scale=1.4), FadeIn(e75, scale=1.2),
                  run_time=0.45)
        self.play(tb.eteindre(1, 0), run_time=0.2)
        self.attendre_voix(marge=0.2)

        # ── 02 : deux fois plus vieux, deux fois plus grand ──
        self.dire("02-double")
        self.au_mot("deux fois plus vieux")
        d1 = self.borne(self.t("deux fois plus vieux", 22, AMBRE), 0.6).move_to(P(0, 2.08))
        self.play(FadeIn(d1, shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("deux fois plus grand")
        d2 = self.borne(self.t("deux fois plus grand", 22, AMBRE), 0.6).move_to(P(0, 1.78))
        enf2 = debout(enfant(150 * K1, BLEU_E), xs[1])
        moitie = DashedLine(P(xs[1] - 0.35, SOL + 75 * K1), P(xs[1] + 0.35, SOL + 75 * K1), color=WHITE,
                            stroke_width=3, dash_length=0.06)
        self.play(FadeIn(d2, shift=DOWN * 0.1), TransformFromCopy(bebe, enf2), FadeOut(e75), run_time=0.9)
        self.play(Create(moitie), run_time=0.3)
        h2, b2 = tb.fleche_col(0, 1, "× 2", ligne=0, fs=26), tb.fleche_col(0, 1, "× 2", ligne=1, fs=26)
        self.au_mot("2 ans")
        self.play(tb.allumer(0, 1), FadeIn(tb.valeur(0, 1), scale=1.4), Create(h2.fleche), FadeIn(h2.etiquette),
                  FadeOut(d1), FadeOut(d2), run_time=0.45)
        self.au_mot("150 cm")
        e150 = self.t("150 cm", 26, BLEU_E).next_to(enf2, UP, buff=0.08)
        self.play(tb.eteindre(0, 1), tb.allumer(1, 1), FadeIn(tb.valeur(1, 1), scale=1.4), Create(b2.fleche),
                  FadeIn(b2.etiquette), FadeIn(e150, scale=1.2), run_time=0.45)
        self.play(tb.eteindre(1, 1), run_time=0.2)
        self.attendre_voix(marge=0.2)

        # ── 03 : 12 ans : 900 cm, plus haut qu'une girafe ──
        self.dire("03-douze")
        h3, b3 = tb.fleche_col(0, 2, "× 12", ligne=0, fs=26, hauteur=PI / 3.2), \
            tb.fleche_col(0, 2, "× 12", ligne=1, fs=26, couleur=ROUGE_P, hauteur=PI / 3.2)
        self.au_mot("12 ans")
        self.play(tb.allumer(0, 2), FadeIn(tb.valeur(0, 2), scale=1.4), FadeOut(h2), FadeOut(b2), run_time=0.4)
        self.au_mot("12 fois 75")
        self.play(tb.eteindre(0, 2), Create(h3.fleche), FadeIn(h3.etiquette), run_time=0.4)
        self.play(Create(b3.fleche), FadeIn(b3.etiquette), run_time=0.4)
        # le zoom arrière : tout rétrécit sur ses pieds, l'enfant de 12 ans peut grandir
        f = K2 / K1
        self.play(FadeOut(e150), FadeOut(moitie),
                  bebe.animate.scale(f, about_point=bebe.get_bottom()),
                  enf2.animate.scale(f, about_point=enf2.get_bottom()), run_time=0.6)
        geant = debout(enfant(900 * K2, ROUGE_P), xs[2])
        self.au_mot("900 cm")
        tb.valeurs[1][2] = 900
        v900 = tb.valeur(1, 2, ROUGE_P)
        self.play(FadeIn(v900, scale=1.4), GrowFromEdge(geant, DOWN), run_time=1.2)
        self.au_mot("9 mètres")
        e9 = self.t("9 m !", 30, ROUGE_P).next_to(geant, LEFT, buff=0.12).align_to(geant, UP)
        self.play(FadeIn(e9, scale=1.3), run_time=0.35)
        self.insister(e9, 1.25)
        g = debout(girafe(550 * K2), -1.35)
        self.au_mot("girafe")
        eg = self.t("girafe", 24, "#f4b942").next_to(g, RIGHT, buff=0.1).shift(UP * 0.25)
        self.play(FadeIn(g, shift=LEFT * 0.4), FadeIn(eg), run_time=0.5)
        self.attendre_voix(marge=0.3)

        # ── 04 : en vrai, environ 1 m 50 ──
        self.dire("04-vrai")
        vrai = debout(enfant(150 * K2, VERT_OK), xs[2])
        self.au_mot("En vrai")
        self.play(Transform(geant, vrai), FadeOut(e9), run_time=0.8)
        self.au_mot("1 mètre 50")
        e15 = self.t("1 m 50", 28, VERT_OK).move_to(P(xs[2], SOL + 0.95))
        e15.shift(LEFT * max(0, e15.get_right()[0] - 1.95))
        fl15 = Arrow(e15.get_bottom(), vrai.get_top() + UP * 0.03, buff=0.05, color=VERT_OK, stroke_width=4,
                     max_tip_length_to_length_ratio=0.3)
        x900 = tb.barrer(1, 2)
        self.play(FadeIn(e15, scale=1.3), GrowArrow(fl15), FadeOut(eg), Create(x900), run_time=0.4)
        self.au_mot("L'âge et la taille")
        v = self.tampon("Pas proportionnels", ROUGE_ERREUR, 30)
        v.scale_to_fit_width(3.6).move_to(P(0, 1.95))
        self.play(Create(croix(b3, sw=5)), run_time=0.35)
        self.au_mot("ne sont pas")
        self.play(FadeIn(v, scale=1.3), run_time=0.4)
        self.insister(v, 1.08)
        self.attendre_voix(marge=0.4)
        self.vider(garder)

        # ── 05 : la question-pause (3 s) ──
        self.question_pause("05-question", "05b-reponse",
                            ["1 place de cinéma : 7 €.", "3 places : 21 €.", "C'est proportionnel ?"],
                            [self.t("oui", 30), self.t("non", 30), self.t("on ne peut pas savoir", 30)], 0,
                            ["3 × 7 = 21 : toujours × 7."], mot_q="1 place", autres_r=self._rep_q)
        self.vider(garder)

        # ── 06 : la question en commentaire ──
        self.dire("06-commentaire")
        self.au_mot("Si la taille")
        r = self.bloc(["Si la taille était", "proportionnelle à l'âge…"], 30).move_to(P(0, 1.55))
        self.poser_lignes(r, "up", 0.35)
        self.au_mot("40 ans")
        q = self.ligne([("40 ans", BLEU_E), ("→ ? cm", AMBRE)], 44).move_to(P(0, 0.2))
        if q.width > 3.6:
            q.scale_to_fit_width(3.6)
        self.play(FadeIn(q, scale=1.3), run_time=0.4)
        self.insister(q, 1.1)
        self.appel_commentaire(y=-1.2)
