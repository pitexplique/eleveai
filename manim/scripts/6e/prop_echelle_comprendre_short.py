# prop_echelle_comprendre_short.py
# EleveAI — Maths 6e ET 4e (épisode COMMUN) — short jumeau de l'épisode 07
# « Comprendre une échelle » (micro echelle_comprendre, notion prop_echelle).
# CEINTURE BLANCHE (règle du short blanc, REGLES.md) : on VOIT l'échelle ; un
# seul calcul, celui que dit la voix. Il n'affiche pas la classe : rendu UNE
# fois, copié sous les noms 6e et 4e.
# Il AMUSE : « Cette petite voiture cache un nombre secret. »
#   · EN HAUT, l'image : la petite voiture de collection (10 cm), on la
#     retourne : « 1/43 » écrit dessous ; elle GRANDIT jusqu'à la vraie ;
#   · EN BAS, au même instant, le canvas `echelle` du coach : la miniature
#     en BLEU (10 cm), la vraie en VERT (430 cm), la flèche ambre « × 43 » ;
#     le calcul 10 × 43 = 430 cm = 4 m 30 ;
#   · 1 question-pause (3 s) : l'avion au 1/100 de 40 cm (140 cm = ajouter,
#     4 000 cm, 400 cm) → 40 m, un avion de ligne ;
#   · fin : « une figurine de 3 cm au 1/60 : combien mesure la vraie
#     personne ? » (180 cm = 1 m 80), réponse en commentaire.
# Centres d'intérêt : voitures-motos, avions.
# Chiffres réels (WebSearch, 31/10/2026) :
#   · 1/43 = l'échelle de référence des voitures miniatures de collection ;
#     un modèle au 1/43 mesure « environ 10 cm » (voiture-miniature.com,
#     pages « échelle 1/43 ») : 10 × 43 = 430 cm = 4,30 m, la longueur d'une
#     voiture compacte. Voix gardée.
#   · avion de ligne ≈ 40 m : Airbus A320 37,57 m, Boeing 737-800 39,47 m
#     (dimensions.com, fiches A320 et 737-800). « 40 mètres, la taille d'un
#     avion de ligne » : ordre de grandeur juste, voix gardée.
# Ajouté ICI : voiture(), avion(), figurine(), Mini (le canvas `echelle` du
# coach à la largeur du short : libellé AU-DESSUS de chaque segment).
#
# Voix : manim/voix/commun-prop-echelle-comprendre-short.json (validée, débit
# −10) ; WAV : public/sons/commun-prop-echelle-comprendre-short/ ; marques :
# manim/scripts/6e/prop_echelle_comprendre_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/6e/prop_echelle_comprendre_short.py PropEchelleComprendreShort
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/prop_echelle_comprendre_short.py PropEchelleComprendreShort -o eleveai-maths-6e-prop-echelle-comprendre-short --media_dir manim/scripts/6e/media-prop-echelle-comprendre
# Sorties (le même fichier, deux noms) :
#   manim/sorties/6e/maths/proportionnalite/07-echelle-comprendre/eleveai-maths-6e-prop-echelle-comprendre-short.mp4
#   manim/sorties/4e/maths/proportionnalite/07-echelle-comprendre/eleveai-maths-4e-prop-echelle-comprendre-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403
from prop_echelle_comprendre import BLEU_NOIR, BLEU_PLAN, GRIS_L, VERT_REEL, cote  # noqa: E402

ROUGE_V = "#dc2626"
Y_IMG = 1.45   # la bande de l'image


def voiture(l=1.0, couleur=ROUGE_V):
    """Une voiture vue de profil : caisse, habitacle, vitres, roues, phare."""
    caisse = RoundedRectangle(width=l, height=0.27 * l, corner_radius=0.08 * l, fill_color=couleur,
                              fill_opacity=1, stroke_width=0)
    hab = Polygon(P(-0.3 * l, 0.12 * l), P(0.22 * l, 0.12 * l), P(0.1 * l, 0.33 * l), P(-0.18 * l, 0.33 * l),
                  fill_color=couleur, fill_opacity=1, stroke_width=0)
    vitres = VGroup(Polygon(P(-0.25 * l, 0.15 * l), P(-0.05 * l, 0.15 * l), P(-0.05 * l, 0.29 * l),
                            P(-0.16 * l, 0.29 * l)),
                    Polygon(P(-0.01 * l, 0.15 * l), P(0.17 * l, 0.15 * l), P(0.08 * l, 0.29 * l),
                            P(-0.01 * l, 0.29 * l))).set_fill("#bae6fd", 1).set_stroke(width=0)
    roues = VGroup(*[VGroup(Circle(radius=0.1 * l, fill_color="#111827", fill_opacity=1, stroke_width=0),
                            Circle(radius=0.045 * l, fill_color="#9ca3af", fill_opacity=1, stroke_width=0))
                     .move_to(P(x * l, -0.13 * l)) for x in (-0.3, 0.3)])
    phare = Circle(radius=0.03 * l, fill_color="#fde047", fill_opacity=1, stroke_width=0).move_to(P(0.47 * l, 0.02 * l))
    return VGroup(hab, caisse, vitres, roues, phare)


def avion(l=2.0):
    """Un avion de ligne de profil : fuselage, aile, dérive, hublots."""
    fus = RoundedRectangle(width=l, height=0.16 * l, corner_radius=0.08 * l, fill_color="#f1f5f9", fill_opacity=1,
                           stroke_color="#64748b", stroke_width=2)
    nez = Circle(radius=0.08 * l, fill_color="#f1f5f9", fill_opacity=1, stroke_width=0).move_to(P(0.46 * l, 0))
    aile = Polygon(P(-0.05 * l, -0.02 * l), P(0.12 * l, -0.02 * l), P(-0.12 * l, -0.22 * l), P(-0.2 * l, -0.22 * l),
                   fill_color="#94a3b8", fill_opacity=1, stroke_width=0)
    derive = Polygon(P(-0.5 * l, 0.06 * l), P(-0.36 * l, 0.06 * l), P(-0.47 * l, 0.28 * l), P(-0.52 * l, 0.28 * l),
                     fill_color="#2563eb", fill_opacity=1, stroke_width=0)
    hublots = VGroup(*[Circle(radius=0.012 * l, fill_color="#0369a1", fill_opacity=1, stroke_width=0)
                       .move_to(P(-0.3 * l + k * 0.06 * l, 0.025 * l)) for k in range(12)])
    return VGroup(derive, fus, nez, aile, hublots)


def figurine(s=0.35):
    """Une petite figurine sur son socle rond."""
    p = personne(peau="#e0ac69", tenue="#7c3aed", cheveux="#78350f", longs=True, s=s)
    socle = Ellipse(width=p.width * 1.2, height=0.12, fill_color="#475569", fill_opacity=1,
                    stroke_width=0).next_to(p, DOWN, buff=-0.03)
    return VGroup(socle, p)


class Mini(VGroup):
    """Le canvas `echelle` du coach à la largeur d'un short : carte blanche,
    « Miniature » puis son segment BLEU (court), « Vraie » puis son segment
    VERT (long) ; libellés au-dessus, valeurs au bout ; flèche ambre « × k »."""

    def __init__(self, noms=("Miniature", "Vraie"), longueurs=(0.55, 2.0), largeur=4.0, fs=26, centre=ORIGIN, **kw):
        super().__init__(**kw)
        self.L, self.fs = longueurs, fs
        self.carte = RoundedRectangle(width=largeur, height=2.4, corner_radius=0.2, fill_color=CARTE,
                                      fill_opacity=1, stroke_color="#e2e8f0", stroke_width=3)
        x0 = self.carte.get_left()[0] + 0.3
        ys = (self.carte.get_top()[1] - 0.85, self.carte.get_bottom()[1] + 0.5)  # chaque libellé sur SA ligne, au-dessus
        self.libelles = VGroup()
        for k, s in enumerate(noms):
            t = texte(s, fs * 0.8, GRIS_L)
            t.sans_synchro = True
            self.libelles.add(t.next_to(P(x0, ys[k]), UP, buff=0.3).align_to(P(x0, 0), LEFT))
        self.fond = VGroup(self.carte, self.libelles)
        self._r = [Dot(P(x0, y), radius=0.001, fill_opacity=0, stroke_width=0) for y in ys]
        self.add(self.fond, *self._r)
        self.move_to(centre)

    def seg(self, k, txt):
        a = self._r[k].get_center()
        b = a + RIGHT * self.L[k]
        coul = BLEU_PLAN if k == 0 else VERT_REEL
        ligne = Line(a, b, color=coul, stroke_width=7)
        pts = VGroup(*[Dot(p, radius=0.06, color=NUIT) for p in (a, b)])
        t = Text(txt, font_size=self.fs, color=coul, weight=BOLD).next_to(b, RIGHT, buff=0.15)
        g = VGroup(ligne, pts, t)
        g.ligne, g.etiquette = VGroup(ligne, pts), t
        return g

    def fleche(self, txt):
        a = self._r[0].get_center() + RIGHT * self.L[0] + DOWN * 0.1
        b = self._r[1].get_center() + RIGHT * self.L[1] * 0.55 + UP * 0.12
        fl = Arrow(a, b, buff=0.05, color=AMBRE, stroke_width=6, max_tip_length_to_length_ratio=0.3)
        t = Text(txt, font_size=self.fs + 2, color=AMBRE, weight=BOLD).next_to(fl.get_center(), RIGHT, buff=0.15)
        g = VGroup(fl, t)
        g.fleche, g.etiquette = fl, t
        return g


class PropEchelleComprendreShort(ShortProp):
    nom_voix = "commun-prop-echelle-comprendre-short"
    fichier_marques = "prop_echelle_comprendre_short_marques.json"
    ceinture = "blanche"

    def _rep_q(self, sc):
        l0 = sc.ligne_rep(0, ["40 ×", "100 =", "4 000 cm"])
        l1 = sc.ligne_rep(1, ["= 40 m,", "un avion de ligne !"])
        av = avion(1.6).move_to(sc.cartes_q[2])  # à la place du choix C (faux), qui s'efface
        for m, mot in zip(l0, ["40 fois", "100,", "4 000 cm"]):
            sc.au_mot(mot)
            sc.play(FadeIn(m, shift=UP * 0.12), run_time=0.25)
        sc.au_mot("40 mètres")
        sc.play(FadeIn(l1[0], scale=1.2), run_time=0.3)
        sc.au_mot("avion de ligne")
        sc.play(FadeIn(l1[1], shift=UP * 0.12), FadeOut(sc.cartes_q[2]), FadeIn(av, shift=RIGHT * 0.6), run_time=0.5)
        sc.rep_fini()

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Le nombre secret", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]
        titre.sans_synchro = True  # le titre de la vidéo : posé d'un bloc
        mini = Mini(centre=P(0, -1.8))

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.play(Write(titre), run_time=0.6)
        car = voiture(1.1).move_to(P(-0.2, Y_IMG))
        self.au_mot("petite voiture")
        self.play(FadeIn(car, shift=RIGHT * 0.8), run_time=0.5)
        mystere = Text("?", font_size=80, color=AMBRE, weight=BOLD).move_to(P(1.2, Y_IMG + 0.15))
        self.au_mot("nombre secret")
        self.play(FadeIn(mystere, scale=1.6), run_time=0.4)
        self.play(Wiggle(car), run_time=0.6)
        self.attendre_voix(marge=0.2)

        # ── 01 : 10 cm, et « 1/43 » écrit dessous ──
        self.dire("01-voiture")
        g, d = car.get_corner(DL) + DOWN * 0.15, car.get_corner(DR) + DOWN * 0.15
        c10 = cote(g, d, "10 cm", BLEU_NOIR, fs=28)
        s_mini = mini.seg(0, "10 cm")
        self.au_mot("10")
        self.play(FadeOut(mystere), Create(c10.trait), FadeIn(c10.etiquette, scale=1.4), FadeIn(mini.fond),
                  Create(s_mini.ligne), FadeIn(s_mini.etiquette, scale=1.4), run_time=0.5)
        self.au_mot("Sous la voiture")
        self.play(FadeOut(c10), Rotate(car, PI, axis=RIGHT), run_time=0.7)
        plaque = RoundedRectangle(width=1.1, height=0.42, corner_radius=0.08, fill_color=CARTE, fill_opacity=1,
                                  stroke_color="#64748b", stroke_width=2).move_to(P(1.35, Y_IMG + 0.05))
        e43 = Text("1/43", font_size=28, color=NUIT, weight=BOLD).move_to(plaque)
        e43._pas_audit = True  # l'inscription entière, posée au « 43 » du « 1 sur 43 »
        self.au_mot("1 sur")
        self.play(FadeIn(plaque, scale=0.7), Indicate(car, color=AMBRE, scale_factor=1.05), run_time=0.3)
        self.au_mot("43")
        self.play(FadeIn(e43, scale=1.4), run_time=0.3)
        self.insister(VGroup(plaque, e43), 1.25)
        self.attendre_voix(marge=0.2)

        # ── 02 : la vraie voiture est 43 fois plus grande : elle grandit ──
        self.dire("02-sens")
        self.play(Rotate(car, PI, axis=RIGHT), FadeOut(VGroup(plaque, e43)), run_time=0.5)
        fl = mini.fleche("× 43")
        s_vraie = mini.seg(1, "430 cm")
        ph = self.ligne([("43 fois", AMBRE), ("plus grande !", WHITE)], 30).move_to(P(0, 0.3))
        self.au_mot("vraie voiture")
        self.play(car.animate.move_to(P(0, Y_IMG)), run_time=0.4)
        self.au_mot("43")
        self.play(car.animate.scale(2.9).move_to(P(0, Y_IMG - 0.05)), GrowArrow(fl.fleche),
                  FadeIn(fl.etiquette, scale=1.3), Create(s_vraie.ligne), FadeIn(ph[0], scale=1.3), run_time=1.0)
        self.au_mot("plus grande")
        self.play(FadeIn(ph[1], shift=RIGHT * 0.15), run_time=0.35)
        self.attendre_voix(marge=0.2)

        # ── 03 : 10 × 43 = 430 cm = 4 m 30 ──
        self.dire("03-calcul")
        lg = self.ligne([("10 ×", BLEU_NOIR), ("43 =", AMBRE), ("430 cm", VERT_OK)], 34).move_to(P(0, 0.35))
        self.play(FadeOut(ph), run_time=0.15)
        self.poser_lignes(VGroup(*lg[:2]), "fade", 0.3)
        self.au_mot("430")
        self.play(FadeIn(lg[2], scale=1.3), FadeIn(s_vraie.etiquette, scale=1.4), run_time=0.4)
        l2 = self.ligne([("=", WHITE), ("4 m", VERT_OK), ("30", VERT_OK)], 38, buff=0.24).move_to(P(0, -0.2))
        self.au_mot("La vraie")
        self.play(Indicate(car, color=VERT_OK, scale_factor=1.04), FadeIn(l2[0]), run_time=0.5)
        self.au_mot("4 mètres")
        self.play(FadeIn(l2[1], scale=1.3), run_time=0.3)
        self.au_mot("30 !")
        self.play(FadeIn(l2[2], scale=1.3), run_time=0.3)
        self.insister(l2[1:], 1.3)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 04 : la question-pause (3 s) : l'avion au 1/100 ──
        self.question_pause("04-question", "04b-reponse",
                            ["Un avion miniature au 1/100", "mesure 40 cm.", "Combien mesure le vrai ?"],
                            [self.t("140 cm", 30), self.t("4 000 cm", 30), self.t("400 cm", 30)], 1,
                            ["40 × 100 = 4 000 cm", "= 40 m, un avion de ligne !"], mot_q="Un avion",
                            autres_r=self._rep_q)
        self.vider(garder)

        # ── 05 : la question en commentaire : la figurine au 1/60 ──
        self.dire("05-commentaire")
        fig = figurine(0.42).move_to(P(-1.2, Y_IMG - 0.1))
        g = fig.get_corner(DR) + RIGHT * 0.25
        c3 = cote(g, g + UP * fig.height, "3 cm", BLEU_NOIR, fs=28, cote_txt=RIGHT)
        vraie = personne(peau="#e0ac69", tenue="#7c3aed", cheveux="#78350f", longs=True, s=0.6)
        vraie.set_fill(opacity=0).set_stroke(GRIS_L, 3)
        vraie.move_to(P(1.3, Y_IMG - 0.1))
        qm = Text("?", font_size=60, color=AMBRE, weight=BOLD).move_to(vraie)
        self.au_mot("Et toi")
        self.play(FadeIn(fig, shift=UP * 0.3), run_time=0.4)
        self.au_mot("3")
        self.play(Create(c3.trait), FadeIn(c3.etiquette, scale=1.4), run_time=0.4)
        e60 = self.ligne([("au", WHITE), ("1/60", AMBRE)], 34).move_to(P(0, 0.2))
        self.au_mot("60")
        self.play(FadeIn(e60, scale=1.3), run_time=0.35)
        self.au_mot("Combien")
        r = self.bloc(["Combien mesure", "la vraie personne ?"], 32).move_to(P(0, -0.7))
        self.play(FadeIn(r, shift=UP * 0.15), Create(vraie), FadeIn(qm, scale=1.4), run_time=0.6)
        self.insister(qm, 1.3)
        self.appel_commentaire(y=-1.75)
