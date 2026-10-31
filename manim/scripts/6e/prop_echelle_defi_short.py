# prop_echelle_defi_short.py
# EleveAI — Maths 6e — short jumeau de l'épisode 10 « Défis sur les échelles »
# (micro echelle_defi, notion prop_echelle). CEINTURE BLANCHE (règle du short
# blanc, REGLES.md ; le short du défi 6e du lot 1 était blanc aussi).
# Il AMUSE : « Au cinéma, ce dinosaure géant est… une figurine ! »
#   · EN HAUT, l'image : l'écran de cinéma et son dinosaure géant, qui
#     rétrécit en figurine posée sur son socle ; sous elle, la figurine en
#     BLEU (20 cm, court) et le dinosaure du film en VERT (40 m, long) ;
#   · EN BAS, au même instant, le tableau figurine (cm) → film (m) se remplit :
#     40 ÷ 20 = 2, donc 1 cm → 2 m (flèche « ÷ 20 » au-dessus, calcul dessous) ;
#   · 1 question-pause (3 s) : la queue de 8 cm ? (16 m) ; leurres : 10 m
#     (ajouter : 8 + 2), 4 m (inverser : 8 ÷ 2) ;
#   · fin : la bouche mesure 3 cm, combien de mètres ? (6 m) en commentaire.
# Centres d'intérêt : dinosaures, cinema-series.
#
# ⭐ Chiffres du monde réel (WebSearch, 31/10/2026) : un dinosaure de film qui
# « paraît mesurer 40 m » est à la taille des plus grands sauropodes connus :
# Argentinosaurus, estimé 30 à 40 m selon les études (Paul 2019 : au moins
# 35 m ; Wikipédia / prehistoric-wildlife.com : 35-40 m), Patagotitan ≈ 37-40 m
# (Slate, 2014). La figurine de 20 cm et le film sont inventés (aucun film ni
# aucune espèce n'est nommé dans la voix) : rien de faux à corriger.
# Ajouté ICI : dino() (sauropode : .corps .cou .tete .queue .bouche), socle(),
# ecran_cine() ; une seule flèche de colonne « ÷ 20 » (cadre étroit).
#
# Voix : manim/voix/6e-prop-echelle-defi-short.json (validée, débit −10) ;
# WAV : public/sons/6e-prop-echelle-defi-short/ ; marques :
# manim/scripts/6e/prop_echelle_defi_short_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/6e/prop_echelle_defi_short.py PropEchelleDefiShort6e
# PYTHONIOENCODING=utf-8 python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/prop_echelle_defi_short.py PropEchelleDefiShort6e -o eleveai-maths-6e-prop-echelle-defi-short --media_dir manim/media-prop-10-6e
# Sortie : manim/sorties/6e/maths/proportionnalite/10-echelle-defi/eleveai-maths-6e-prop-echelle-defi-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403

BLEU_P = "#2563eb"
BLEU_P2 = "#60a5fa"
VERT_R = "#16a34a"
VERT_D = "#65a30d"     # la peau du dinosaure
VERT_DD = "#365314"


def sans(m):
    for f in m.get_family():
        if isinstance(f, Text):
            f.sans_synchro = True
            f._pas_audit = True
    return m


def dino(s=1.0):
    """Un sauropode tourné vers la droite (long cou, longue queue)."""
    st = dict(fill_color=VERT_D, fill_opacity=1, stroke_color=VERT_DD, stroke_width=2)
    queue = Polygon(P(-0.5, 0.15), P(-0.55, -0.15), P(-1.1, -0.22), P(-1.65, -0.3), P(-1.1, -0.08), **st)
    pattes = VGroup(*[RoundedRectangle(width=0.17, height=0.5, corner_radius=0.05, **st).move_to(P(x, -0.38))
                      for x in (-0.38, -0.18, 0.2, 0.4)])
    corps = Ellipse(width=1.35, height=0.62, **st)
    cou = Polygon(P(0.35, 0.18), P(0.6, 0.12), P(1.05, 0.88), P(0.86, 0.96), **st)
    tete = Ellipse(width=0.42, height=0.22, **st).move_to(P(1.07, 0.98))
    oeil = Dot(P(1.1, 1.02), radius=0.03, color=BLACK)
    bouche = Line(P(1.12, 0.93), P(1.27, 0.95), color=VERT_DD, stroke_width=3)
    taches = VGroup(*[Circle(radius=r, fill_color="#a3e635", fill_opacity=0.8, stroke_width=0).move_to(P(x, y))
                      for x, y, r in ((-0.2, 0.12, 0.08), (0.1, 0.18, 0.06), (-0.4, 0.0, 0.05))])
    g = VGroup(queue, pattes, corps, taches, cou, tete, oeil, bouche)
    g.queue, g.corps, g.cou, g.tete, g.bouche = queue, corps, cou, tete, bouche
    return g.scale(s)


def socle(l=1.8):
    return RoundedRectangle(width=l, height=0.14, corner_radius=0.05, fill_color="#a16207", fill_opacity=1,
                            stroke_color="#713f12", stroke_width=2)


def ecran_cine(l=4.0, h=2.15):
    """L'écran de cinéma : cadre sombre, bandes de pellicule en haut et en bas."""
    fond = RoundedRectangle(width=l, height=h, corner_radius=0.1, fill_color="#0c4a6e", fill_opacity=1,
                            stroke_color="#e2e8f0", stroke_width=4)
    trous = VGroup()
    for y in (h / 2 - 0.1, -h / 2 + 0.1):
        for k in range(12):
            trous.add(Square(0.08, fill_color="#e2e8f0", fill_opacity=0.9, stroke_width=0).move_to(
                P(-l / 2 + 0.2 + k * (l - 0.4) / 11, y)))
    sol = Rectangle(width=l - 0.1, height=0.35, fill_color="#65a30d", fill_opacity=0.5, stroke_width=0).move_to(
        P(0, -h / 2 + 0.38))
    return VGroup(fond, sol, trous)


class PropEchelleDefiShort6e(ShortProp):
    nom_voix = "6e-prop-echelle-defi-short"
    fichier_marques = "prop_echelle_defi_short_marques.json"
    ceinture = "blanche"

    def _rep_q(self, sc):
        lg = sc.ligne_rep(0, ["8 ×", "2 =", "16 m."])
        for m, mot in zip(lg, ["8 fois", "2, égale", "16 m"]):
            sc.au_mot(mot)
            sc.play(FadeIn(m, shift=UP * 0.12), run_time=0.25)
        sc.rep_fini()

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Le dinosaure du film", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [margo, titre, badge]

        # ── 00 : l'accroche : le géant du film… est une figurine ──
        self.dire("00-accroche")
        ecr = ecran_cine().move_to(P(0, 1.2))
        d = dino(0.95).move_to(P(0.05, 1.12))
        self.au_mot("Au cinéma")
        self.play(Write(titre), FadeIn(ecr, scale=0.85), run_time=0.6)
        self.au_mot("dinosaure géant")
        self.play(GrowFromPoint(d, P(0.05, 0.4)), run_time=0.6)
        self.play(Wiggle(d.tete), run_time=0.5)
        x_g = -1.65                                   # le bout de la queue de la figurine
        so = socle(1.6).move_to(P(-0.85, 1.32))
        fig_cible = d.copy().scale(0.45 / 0.95)
        fig_cible.next_to(so, UP, buff=0.0).shift(RIGHT * (x_g - fig_cible.get_left()[0]))
        so.match_x(fig_cible)
        surprise = self.borne(self.t("Une figurine !", 40, AMBRE), 0.8).move_to(P(0, -0.9))
        self.au_mot("une figurine")
        self.play(FadeOut(ecr), Transform(d, fig_cible), FadeIn(so, shift=UP * 0.1), FadeIn(surprise, scale=0.7),
                  run_time=0.7)
        self.insister(surprise, 1.1)
        self.attendre_voix(marge=0.2)

        # ── 01 : 20 cm de figurine, 40 m dans le film ──
        self.dire("01-figurine")
        tb = TableauProp(["Figurine (cm)", "Film (m)"], [[20, 1], [40, 2]], montrer=False, largeur_case=0.85,
                         largeur_libelle=2.0, hauteur=0.66, fs=28, marge=0.14, centre=P(0, -1.15))
        x_d = d.get_right()[0]
        y_b = 1.05
        bleu = VGroup(Line(P(x_g, y_b), P(x_d, y_b), color=BLEU_P2, stroke_width=8),
                      Line(P(x_g, y_b + 0.1), P(x_g, y_b - 0.1), color=BLEU_P2, stroke_width=5),
                      Line(P(x_d, y_b + 0.1), P(x_d, y_b - 0.1), color=BLEU_P2, stroke_width=5))
        l20 = Text("20 cm", font_size=28, color=BLEU_P2, weight=BOLD).next_to(bleu, RIGHT, buff=0.15)
        self.au_mot("La figurine")
        self.play(FadeOut(surprise), FadeIn(tb.fond, shift=UP * 0.2), Indicate(d, color="#a3e635"), run_time=0.5)
        self.au_mot("20 cm")
        self.play(Create(bleu), FadeIn(l20, scale=1.3), FadeIn(tb.valeur(0, 0), scale=1.4), tb.allumer(0, 0),
                  run_time=0.45)
        x_v = 0.55
        y_v = 0.6
        vert = VGroup(Line(P(x_g, y_v), P(x_v, y_v), color=VERT_R, stroke_width=10),
                      Line(P(x_g, y_v + 0.12), P(x_g, y_v - 0.12), color=VERT_R, stroke_width=5),
                      Line(P(x_v, y_v + 0.12), P(x_v, y_v - 0.12), color=VERT_R, stroke_width=5))
        l40 = Text("40 m", font_size=30, color=VERT_OK, weight=BOLD).next_to(vert, RIGHT, buff=0.15)
        self.au_mot("Dans le film")
        self.play(tb.eteindre(0, 0), run_time=0.3)
        self.au_mot("40 m")
        self.play(Create(vert), FadeIn(l40, scale=1.3), FadeIn(tb.valeur(1, 0), scale=1.4), tb.allumer(1, 0),
                  run_time=0.5)
        self.play(tb.eteindre(1, 0), run_time=0.25)
        self.attendre_voix(marge=0.2)

        # ── 02 : 40 ÷ 20 = 2 : 1 cm → 2 m ──
        self.dire("02-echelle")
        self.au_mot("Que vaut")
        self.play(FadeIn(tb.valeur(0, 1), scale=1.4), FadeIn(tb.trou(1, 1), scale=1.3), tb.allumer(0, 1),
                  Indicate(bleu, color=BLEU_P), run_time=0.45)
        h = tb.fleche_col(0, 1, "÷ 20", ligne=0, fs=26, couleur=AMBRE)
        lg = self.ligne([("40 ÷", WHITE), ("20 =", AMBRE), ("2", VERT_OK)], 38).move_to(P(0, -2.3))
        self.au_mot("40 divisé")
        self.play(FadeIn(lg[0], shift=RIGHT * 0.15), tb.eteindre(0, 1), Create(h.fleche),
                  run_time=0.45)
        self.au_mot("par 20")
        self.play(FadeIn(lg[1], shift=RIGHT * 0.15), FadeIn(h.etiquette, scale=1.3),
                  run_time=0.4)
        self.au_mot("égale 2")
        self.play(FadeIn(lg[2], scale=1.4), tb.remplir(1, 1, 2), run_time=0.4)
        self.play(tb.allumer(1, 1), run_time=0.25)
        self.au_mot("1 cm représente")
        self.play(Circumscribe(tb.colonne(1), color=AMBRE, buff=0.05), run_time=0.7)
        self.insister(lg[2], 1.3)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 03 : la question-pause (3 s) : la queue de 8 cm ──
        self.question_pause("03-question", "03b-reponse", ["La queue mesure 8 cm.", "Dans le film ?"],
                            [self.t("16 m", 30), self.t("10 m", 30), self.t("4 m", 30)], 0,
                            ["8 × 2 = 16 m."], mot_q="La queue", autres_r=self._rep_q)
        self.vider(garder)

        # ── 04 : la question en commentaire : la bouche de 3 cm ──
        self.dire("04-commentaire")
        d4 = dino(0.9).move_to(P(-0.45, 1.2))
        self.au_mot("Et toi")
        self.play(FadeIn(d4, scale=0.8), run_time=0.45)
        l3 = Text("3 cm", font_size=28, color=BLEU_P2, weight=BOLD).next_to(d4.tete, RIGHT, buff=0.12)
        self.au_mot("La bouche")
        self.play(Circumscribe(d4.tete, color=BLEU_P2, buff=0.06), d4.bouche.animate.set_stroke(BLEU_P2, 6),
                  run_time=0.6)
        qq = self.borne(self.ligne([("3 cm", BLEU_CALCUL), ("→ ? m", VERT_OK)], 42), 0.9).move_to(P(0, -0.35))
        qq[1].sans_synchro = True
        self.au_mot("3 cm")
        self.play(FadeIn(l3, scale=1.3), FadeIn(qq[0], scale=1.3), run_time=0.4)
        self.au_mot("Combien")
        self.play(FadeIn(qq[1], shift=RIGHT * 0.2), run_time=0.4)
        self.insister(qq, 1.1)
        self.appel_commentaire(y=-1.45)
