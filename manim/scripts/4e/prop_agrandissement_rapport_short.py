# prop_agrandissement_rapport_short.py
# EleveAI — Maths 4e — short jumeau de l'épisode 11 « Agrandir une photo »
# (micro agrandissement_rapport, notion prop_echelle). CEINTURE BLANCHE (règle
# du short blanc, REGLES.md). Il AMUSE : on agrandit la photo d'un chat en
# AJOUTANT 4 cm partout → le chat est tout écrasé ; en MULTIPLIANT par 2 → il
# garde sa forme.
#   · EN HAUT, l'image : la photo du chat et son agrandissement (écrasé en
#     rouge, puis juste en vert), côte à côte ;
#   · EN BAS, au même instant : « + 4 cm » → 8 cm sur 10 cm (barré),
#     « × 2 » → 8 cm sur 12 cm ;
#   · 1 question-pause (3 s) : 5 cm sur 7 cm, rapport 3 → 15 cm sur 21 cm ;
#     leurres : 8 cm sur 10 cm (+ 3 partout), 15 cm sur 7 cm (un seul côté
#     multiplié) ;
#   · fin : 6 cm sur 9 cm, la largeur devient 30 cm : la hauteur ? (45 cm,
#     rapport 5) en commentaire.
# Centres d'intérêt : animaux, reseaux-sociaux. Aucun chiffre réel : rien à
# sourcer.
#
# Voix : manim/voix/4e-prop-agrandissement-rapport-short.json (validée, débit
# −10) ; WAV : public/sons/4e-prop-agrandissement-rapport-short/ ; marques :
# manim/scripts/4e/prop_agrandissement_rapport_short_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/prop_agrandissement_rapport_short.py PropAgrandissementRapportShort4e
# PYTHONIOENCODING=utf-8 python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/prop_agrandissement_rapport_short.py PropAgrandissementRapportShort4e -o eleveai-maths-4e-prop-agrandissement-rapport-short --media_dir manim/media-prop-4e-11
# Sortie : manim/sorties/4e/maths/proportionnalite/11-agrandissement-rapport/eleveai-maths-4e-prop-agrandissement-rapport-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

from prop_commun import *  # noqa: E402,F403
from prop_agrandissement_rapport import Photo, gras, sans  # noqa: E402

BLEU_P = "#2563eb"
VERT_R = "#16a34a"
ENCRE = "#0f172a"


def chat():
    """La photo d'un chat, dessinée pour 4 cm sur 6 cm (boîte 1 × 1,5)."""
    fond = Rectangle(width=1, height=1.5, fill_color="#bbf7d0", fill_opacity=1, stroke_width=0)
    roux, fonce = "#f97316", "#9a3412"
    corps = Ellipse(width=0.8, height=0.75, fill_color=roux, fill_opacity=1, stroke_width=0).move_to(P(0, -0.42))
    tete = Circle(radius=0.3, fill_color=roux, fill_opacity=1, stroke_width=0).move_to(P(0, 0.2))
    oreilles = VGroup(*[Polygon(P(x - 0.13, 0.36), P(x + 0.13, 0.36), P(x, 0.62), fill_color=roux, fill_opacity=1,
                                stroke_width=0) for x in (-0.18, 0.18)])
    interieur = VGroup(*[Polygon(P(x - 0.06, 0.4), P(x + 0.06, 0.4), P(x, 0.53), fill_color="#fecaca",
                                 fill_opacity=1, stroke_width=0) for x in (-0.18, 0.18)])
    yeux = VGroup(*[Ellipse(width=0.1, height=0.13, fill_color="#16a34a", fill_opacity=1, stroke_color=ENCRE,
                            stroke_width=2).move_to(P(x, 0.25)) for x in (-0.11, 0.11)])
    nez = Triangle(fill_color="#f472b6", fill_opacity=1, stroke_width=0).scale(0.04).rotate(PI).move_to(P(0, 0.13))
    moust = VGroup(*[Line(P(s * 0.08, 0.1 + d), P(s * 0.36, 0.13 + 2.2 * d), color=WHITE, stroke_width=2)
                     for s in (-1, 1) for d in (-0.03, 0.02)])
    rayures = VGroup(*[Line(P(x, 0.47), P(x, 0.38), color=fonce, stroke_width=3) for x in (-0.05, 0.05)])
    queue = Arc(radius=0.2, start_angle=-PI / 2, angle=PI, arc_center=P(0.42, -0.55), color=roux, stroke_width=8)
    return VGroup(fond, queue, corps, tete, oreilles, interieur, rayures, yeux, nez, moust)


class PropAgrandissementRapportShort4e(ShortProp):
    nom_voix = "4e-prop-agrandissement-rapport-short"
    fichier_marques = "prop_agrandissement_rapport_short_marques.json"
    ceinture = "blanche"

    def photos(self, l2, h2, couleur, u=0.16, l1=4, h1=6):
        """Le chat l1 × h1 à gauche et son image l2 × h2 à droite, posés sur y = -0.3."""
        a = Photo(l1, h1, u, P(-1.55, -0.3), contenu=chat, couleur=BLEU_P)
        b = Photo(l2, h2, u, P(-0.65, -0.3), contenu=chat, couleur=couleur)
        return a, b

    def lab_g(self, ph, s, fs=24):
        """La hauteur de la photo de gauche, écrite DEBOUT à sa gauche."""
        return gras(s, fs, ph.couleur).rotate(PI / 2).next_to(ph.cadre, LEFT, buff=0.1)

    def mots(self, lg, mots, avec=None):
        avec = avec or {}
        for i, (m, mot) in enumerate(zip(lg, mots)):
            if mot:
                if isinstance(mot, tuple):
                    self.au_mot(*mot)
                else:
                    self.au_mot(mot)
            self.play(FadeIn(m, shift=UP * 0.12), *avec.get(i, []), run_time=0.3)

    def choix(self, l, h):
        """Un choix « 8 cm sur 10 cm » en TROIS Text : chaque nombre à son mot."""
        return self.ligne([(f"{l} cm", WHITE), ("sur", WHITE), (f"{h} cm", WHITE)], 28, buff=0.12)

    def _rep_q(self, sc):
        lg = sc.ligne_rep(0, ["5 ×", "3 =", "15 ;", "7 ×", "3 =", "21."])
        for m, mot in zip(lg, ["5 fois", ("3, égale", 1), "15.", "7 fois", ("3, égale", 2), "21."]):
            if isinstance(mot, tuple):
                sc.au_mot(*mot)
            else:
                sc.au_mot(mot)
            sc.play(FadeIn(m, shift=UP * 0.12), run_time=0.25)
        l1 = sc.ligne_rep(1, ["On multiplie", "tout."])
        sc.au_mot("On multiplie")
        sc.play(FadeIn(l1, shift=UP * 0.12), run_time=0.3)
        sc.rep_fini()

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Agrandir une photo", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [margo, titre, badge]

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        a, b = self.photos(8, 10, ROUGE_ERREUR)
        self.au_mot("Agrandir")
        self.play(Write(titre), FadeIn(a, scale=0.8), run_time=0.6)
        q = self.borne(self.t("+ des centimètres ?", 36, AMBRE), 0.8).move_to(P(0, -1.3))
        q.sans_synchro = True
        self.au_mot("en ajoutant")
        self.play(FadeIn(q, scale=0.7), run_time=0.4)
        self.au_mot("Regarde")
        self.play(Indicate(a, color=AMBRE, scale_factor=1.1), run_time=0.6)
        self.attendre_voix(marge=0.2)

        # ── 01 : la photo du chat, 4 cm sur 6 cm ──
        self.dire("01-photo")
        L1 = self.ligne([("Photo :", WHITE), ("4 cm", BLEU_CALCUL), ("sur", WHITE), ("6 cm", BLEU_CALCUL)], 36)
        L1.move_to(P(0, -1.2))
        self.au_mot("Une photo")
        self.play(FadeOut(q), FadeIn(L1[0], shift=UP * 0.12), Wiggle(a.contenu), run_time=0.6)
        self.mots(L1[1:], ["4 cm", None, "6 cm"],
                  {0: [FadeIn(a.lab_l("4 cm", fs=24), scale=1.3)], 2: [FadeIn(self.lab_g(a, "6 cm"), scale=1.3)]})
        self.attendre_voix(marge=0.2)

        # ── 02 : + 4 cm partout : 8 cm sur 10 cm, le chat est écrasé ──
        self.dire("02-ajouter")
        L2 = self.ligne([("+ 4 cm", ROUGE_ERREUR), ("partout", WHITE)], 36).move_to(P(0, -1.85))
        bas = Line(b.cadre.get_corner(DL), b.cadre.get_corner(DR), color=ROUGE_ERREUR, stroke_width=7)
        self.au_mot("On ajoute")
        self.play(FadeIn(L2[0], scale=1.2), run_time=0.35)
        self.au_mot("partout")
        self.play(FadeIn(L2[1], shift=UP * 0.12), run_time=0.3)
        L3 = self.ligne([("8 cm", ROUGE_ERREUR), ("sur", WHITE), ("10 cm", ROUGE_ERREUR)], 38).move_to(P(0, -2.5))
        self.mots(L3, ["8 cm", None, "10 cm"],
                  {0: [Create(bas), FadeIn(b.lab_l("8 cm", fs=24), scale=1.3)],
                   2: [GrowFromEdge(b, DOWN), FadeIn(b.lab_h("10 cm", fs=24), scale=1.3)]})
        self.remove(bas)
        ec = self.borne(gras("Écrasé !", 40, ROUGE_ERREUR), 1.0).move_to(P(0, 1.85))
        ec.sans_synchro = True
        self.au_mot("écrasé")
        self.play(FadeIn(ec, scale=1.4), Wiggle(b.contenu, scale_value=1.15), run_time=0.7)
        self.play(Create(croix(L2[0], sw=6)), run_time=0.3)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 03 : × 2 partout : 8 cm sur 12 cm, même forme ──
        self.dire("03-multiplier")
        a2, b2 = self.photos(8, 12, VERT_R)
        la = sans(VGroup(a2.lab_l("4 cm", fs=24), self.lab_g(a2, "6 cm")))
        self.play(FadeIn(a2), FadeIn(la), run_time=0.3)
        L4 = self.ligne([("× 2", VERT_OK), ("partout", WHITE)], 36).move_to(P(0, -1.2))
        self.au_mot("On multiplie")
        self.play(FadeIn(L4[1], shift=UP * 0.12), run_time=0.3)
        self.au_mot("par 2")
        self.play(FadeIn(L4[0], scale=1.3), run_time=0.3)
        bas = Line(b2.cadre.get_corner(DL), b2.cadre.get_corner(DR), color=VERT_R, stroke_width=7)
        L5 = self.ligne([("8 cm", VERT_OK), ("sur", WHITE), ("12 cm", VERT_OK)], 38).move_to(P(0, -1.85))
        self.mots(L5, ["8 cm", None, "12 cm"],
                  {0: [Create(bas), FadeIn(b2.lab_l("8 cm", fs=24), scale=1.3)],
                   2: [GrowFromEdge(b2, DOWN), FadeIn(b2.lab_h("12 cm", fs=24), scale=1.3)]})
        self.remove(bas)
        L6 = self.borne(gras("Même forme !", 38, VERT_OK), 0.8).move_to(P(0, -2.5))
        L6.sans_synchro = True
        self.au_mot("garde sa forme")
        self.play(FadeIn(L6, scale=1.2), Indicate(b2.contenu, scale_factor=1.06), run_time=0.6)
        L7 = self.borne(gras("2 fois plus grand !", 34, AMBRE), 1.0).move_to(P(0, 1.95))
        self.au_mot("2 fois")
        self.play(FadeIn(L7, scale=1.2), run_time=0.4)
        self.insister(L7, 1.1)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 04 : la question-pause (3 s) ──
        self.question_pause("04-question", "04b-reponse",
                            ["Photo : 5 cm sur 7 cm,", "agrandie avec un rapport 3.", "Elle mesure…"],
                            [self.choix(8, 10), self.choix(15, 21), self.choix(15, 7)], 1,
                            ["5 × 3 = 15 ; 7 × 3 = 21.", "On multiplie tout."], mot_q="Une photo",
                            autres_r=self._rep_q)
        self.vider(garder)

        # ── 05 : la question en commentaire ──
        self.dire("05-commentaire")
        u = 0.08  # à l'échelle : la largeur de 30 cm est bien 5 fois celle de 6 cm
        a5 = Photo(6, 9, u, P(-1.75, 0.3), contenu=chat)
        self.au_mot("Et toi")
        self.play(FadeIn(a5, scale=0.8), run_time=0.45)
        Q1 = self.ligne([("Photo :", WHITE), ("6 cm", BLEU_CALCUL), ("sur", WHITE), ("9 cm", BLEU_CALCUL)], 32)
        Q1.move_to(P(0, -0.6))
        self.mots(Q1, ["Une photo", "6 cm", None, "9 cm"],
                  {1: [FadeIn(a5.lab_l("6 cm", fs=22), scale=1.3)],
                   3: [FadeIn(gras("9 cm", 22, BLEU_P).next_to(a5.cadre, UP, buff=0.1), scale=1.3)]})
        Q2 = self.ligne([("Largeur :", WHITE), ("30 cm", VERT_OK)], 32).move_to(P(0, -1.2))
        x0 = -1.0
        lg30 = Line(P(x0, 0.3), P(x0 + 30 * u, 0.3), color=VERT_R, stroke_width=8)
        l30 = gras("30 cm", 24, VERT_OK).next_to(lg30, DOWN, buff=0.1)
        self.mots(Q2, ["sa largeur", "30 cm"], {1: [Create(lg30), FadeIn(l30, scale=1.3)]})
        haut = DashedLine(lg30.get_end(), lg30.get_end() + UP * 1.6, color=ORANGE_RETENUE, stroke_width=5)
        qh = gras("?", 44, ORANGE_RETENUE).next_to(haut, LEFT, buff=0.15)
        qh.sans_synchro = True
        Q3 = self.ligne([("Hauteur :", WHITE), ("? cm", ORANGE_RETENUE)], 34).move_to(P(0, -1.8))
        Q3[1].sans_synchro = True
        self.au_mot("Combien")
        self.play(FadeIn(Q3, shift=UP * 0.12), Create(haut), FadeIn(qh, scale=1.3), run_time=0.5)
        self.insister(Q3[1], 1.25)
        self.appel_commentaire(y=-2.6)
