# prop_unite_short.py
# EleveAI — Maths 6e — short jumeau de l'épisode 04 « Passer par l'unité »
# (micro prop_unite). CEINTURE BLANCHE (règle du short blanc, REGLES.md) : on
# VOIT la notion ; les seuls calculs écrits sont ceux que dit la voix.
# Il AMUSE : « Le grand paquet est-il toujours le moins cher ? »
#   · EN HAUT, l'image : le rayon du supermarché, petit paquet de céréales
#     (bleu, 500 g, 2 €) et grand paquet (orange, 1 kg, 5 €) ; un 2e petit
#     paquet glisse à côté du premier (2 petits = 1 kg) ; le grand tremble ;
#   · EN BAS, au même instant, le tableau du coach se remplit SOUS chaque
#     paquet (même colonne, même couleur) : petit | 2 petits | grand ;
#     « × 2 » en haut et en bas ; 4 € (vert) contre 5 € (rouge) ;
#   · surprise : le grand est plus cher au kilo ;
#   · 1 question-pause (3 s) : 3 yaourts 2 €, pack de 12 à 9 € ;
#   · fin : « 250 g de chocolat coûtent 3 €, combien coûte 1 kg ? » (12 €).
# Centres d'intérêt : argent-budget, cuisine.
# Prix fictifs, à l'ordre de grandeur réel (céréales ≈ 4 à 5 € le kilo) :
# aucun chiffre du monde réel cité, pas de source.
#
# Voix : manim/voix/6e-prop-unite-short.json (validée, débit −10) ;
# marques : manim/scripts/6e/prop_unite_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/6e/prop_unite_short.py PropUniteShort6e
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/prop_unite_short.py PropUniteShort6e -o eleveai-maths-6e-prop-unite-short --media_dir manim/scripts/6e/media-prop-unite-short
# Sortie : manim/sorties/6e/maths/proportionnalite/04-unite/eleveai-maths-6e-prop-unite-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403

SOL = 0.95            # l'étagère du rayon
BLEU_PT = "#38bdf8"   # le petit paquet = sa colonne
ORANGE_GD = "#fb923c"  # le grand paquet = sa colonne
STICKER = "#facc15"
BLEU_P = "#0284c7"    # le texte bleu dans le tableau blanc (colonnes du petit)
ORANGE_P = "#ea580c"  # le texte orange dans le tableau blanc (colonne du grand)


def paquet(l, h, couleur):
    """Un paquet de céréales : boîte, bandeau, bol ; le mot CÉRÉALES (décor)."""
    boite = RoundedRectangle(width=l, height=h, corner_radius=0.06, fill_color=couleur, fill_opacity=1,
                             stroke_color=WHITE, stroke_width=2)
    bande = Rectangle(width=l, height=h * 0.16, fill_color=WHITE, fill_opacity=0.9, stroke_width=0)
    bande.move_to(boite.get_top() + DOWN * h * 0.2)
    mot = Text("CÉRÉALES", font_size=14, color="#7c2d12", weight=BOLD).scale_to_fit_width(l * 0.8)
    mot.move_to(bande)
    mot.sans_synchro = mot._pas_audit = True
    return VGroup(boite, bande, mot)


def sticker(s, fs=22):
    """L'étiquette de prix jaune (le prix posé au mot)."""
    t = Text(s, font_size=fs, color=BLACK, weight=BOLD)
    rond = Circle(radius=max(0.22, t.width / 2 + 0.07), fill_color=STICKER, fill_opacity=1, stroke_color="#a16207",
                  stroke_width=2)
    return VGroup(rond, t.move_to(rond))


def tablette(l=2.4, h=1.1):
    """Une tablette de chocolat (décor) : 2 × 4 carrés."""
    fond = RoundedRectangle(width=l, height=h, corner_radius=0.08, fill_color="#5b3416", fill_opacity=1,
                            stroke_color="#d4a373", stroke_width=3)
    carres = VGroup(*[RoundedRectangle(width=l / 4 - 0.12, height=h / 2 - 0.12, corner_radius=0.05,
                                       stroke_color="#d4a373", stroke_width=2, fill_color="#7c4a1e", fill_opacity=1)
                      .move_to(fond.get_corner(UL) + P((i + 0.5) * l / 4, -(j + 0.5) * h / 2))
                      for i in range(4) for j in range(2)])
    return VGroup(fond, carres)


class PropUniteShort6e(ShortProp):
    nom_voix = "6e-prop-unite-short"
    fichier_marques = "prop_unite_short_marques.json"
    ceinture = "blanche"
    _q_morceaux = None

    def _disposer_q(self, question, choix, phrase):
        """Comme ShortLotC, mais la question en MORCEAUX (chaque nombre à son
        mot : « 12 » n'attend pas « 9 € ») et des cartes un peu plus basses de
        taille (× 0,86) : la réponse tient au-dessus de Ti-Margo."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        if self._q_morceaux:
            q = VGroup(*[self.ligne(m, 28) for m in self._q_morceaux]).arrange(DOWN, buff=0.1)
            q.next_to(tete, DOWN, buff=0.2).set_x(0)
        cartes.scale(0.86).next_to(q, DOWN, buff=0.18).set_x(0)
        pause.next_to(cartes, DOWN, buff=0.12).set_x(0)
        ph.next_to(cartes, DOWN, buff=0.12).set_x(0)
        return tete, q, cartes, pause, rebours, ph

    def _rep_q(self, sc):
        """La réponse de la question-pause, morceau par morceau, au mot."""
        l0 = sc.ligne_rep(0, ["12 =", "4 ×", "3 :", "4 ×", "2 =", "8 €."])
        l1 = sc.ligne_rep(1, ["Moins cher", "que 9 € !"])
        for m, mot in zip(list(l0) + list(l1), ["12 yaourts", "4 fois 3", "3 yaourts", "4 fois 2", "2, égale",
                                                "8 €", "Moins cher", "9 €"]):
            sc.au_mot(mot)
            sc.play(FadeIn(m, shift=UP * 0.12), run_time=0.25)
        sc.rep_fini()

    def construct(self):
        self.margo_bas()
        titre, badge = self.entete_short("Petit ou grand paquet ?", self.ceinture)
        self.add(badge)
        garder = [badge, titre, self.mobjects[0]]
        tb = TableauProp(["Masse", "Prix"], [["500 g", "1 kg", "1 kg"], ["2 €", "4 €", "5 €"]], montrer=False,
                         largeur_case=0.92, largeur_libelle=1.0, hauteur=0.62, fs=28, marge=0.16,
                         centre=P(0, -0.95))
        xs = [tb.x(c) for c in range(3)]
        etagere = VGroup(Rectangle(width=4.1, height=0.12, fill_color="#a16207", fill_opacity=1, stroke_width=0)
                         .move_to(P(0, SOL - 0.06)),
                         Line(P(-2.0, SOL - 0.12), P(2.0, SOL - 0.12), color="#451a03", stroke_width=3))
        petit = paquet(0.74, 1.15, BLEU_PT)
        petit.move_to(P(xs[0], SOL + 0.5))
        petit.move_to(P(xs[0], SOL + 0.575))
        grand = paquet(0.84, 1.38, ORANGE_GD).move_to(P(xs[2], SOL + 0.69))
        m_pt = Text("500 g", font_size=24, color=WHITE, weight=BOLD).scale_to_fit_width(0.58)
        m_pt.move_to(petit.get_top() + DOWN * 0.52)
        m_gd = Text("1 kg", font_size=26, color=WHITE, weight=BOLD).scale_to_fit_width(0.56)
        m_gd.move_to(grand.get_top() + DOWN * 0.56)
        s_pt = sticker("2 €", 20).move_to(petit.get_bottom() + UP * 0.28)
        s_gd = sticker("5 €", 20).move_to(grand.get_bottom() + UP * 0.3)

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.au_mot("grand paquet")
        self.play(Write(titre), FadeIn(etagere), run_time=0.6)
        self.au_mot("est-il")
        self.play(FadeIn(petit, shift=DOWN * 0.2), FadeIn(grand, shift=DOWN * 0.2), run_time=0.4)
        self.au_mot("moins cher")
        self.play(FadeIn(tb.fond, shift=UP * 0.2), Indicate(grand, color=AMBRE), run_time=0.6)
        self.attendre_voix(marge=0.2)

        # ── 01 : les deux paquets ──
        self.dire("01-paquets")
        self.au_mot("supermarché")
        self.play(Indicate(etagere, color=AMBRE), run_time=0.5)
        self.au_mot("petit paquet")
        self.play(Indicate(petit, color=BLEU_PT, scale_factor=1.12), tb.allumer(0, 0), run_time=0.5)
        self.au_mot("500 g")
        self.play(FadeIn(m_pt, scale=1.3), FadeIn(tb.valeur(0, 0, BLEU_P), scale=1.4), tb.cases[0][0].animate.set_fill(CARTE, 1),
                  run_time=0.4)
        self.au_mot("2 €")
        self.play(FadeIn(s_pt, scale=1.5), FadeIn(tb.valeur(1, 0, BLEU_P), scale=1.4), run_time=0.4)
        self.au_mot("grand paquet")
        self.play(Indicate(grand, color=ORANGE_GD, scale_factor=1.1), tb.allumer(0, 2), run_time=0.5)
        self.au_mot("1 kg")
        self.play(FadeIn(m_gd, scale=1.3), FadeIn(tb.valeur(0, 2, ORANGE_P), scale=1.4), tb.cases[0][2].animate.set_fill(CARTE, 1),
                  run_time=0.4)
        self.au_mot("5 €")
        self.play(FadeIn(s_gd, scale=1.5), FadeIn(tb.valeur(1, 2, ORANGE_P), scale=1.4), run_time=0.4)
        self.attendre_voix(marge=0.2)

        # ── 02 : le grand semble avantageux… vérifions ──
        self.dire("02-comparer")
        self.au_mot("plus avantageux")
        av = self.borne(self.t("Plus avantageux ?", 30, ORANGE_GD)).move_to(P(0, 0.45))
        gd = VGroup(grand, m_gd, s_gd)
        self.play(FadeIn(av, shift=DOWN * 0.1), gd.animate.scale(1.08), run_time=0.4)
        self.play(gd.animate.scale(1 / 1.08), run_time=0.25)
        self.au_mot("Vérifions")
        ve = self.borne(self.t("Vérifions !", 30, AMBRE)).move_to(P(0, 0.45))
        self.play(FadeOut(av, shift=UP * 0.1), FadeIn(ve, shift=UP * 0.1), run_time=0.35)
        self.au_mot("prix pour 1 kilo")
        pk = self.borne(self.t("Le prix pour 1 kg ?", 30, AMBRE)).move_to(P(0, 0.45))
        self.play(FadeOut(ve), FadeIn(pk, scale=1.2), FadeIn(tb.trou(0, 1)), FadeIn(tb.trou(1, 1)), run_time=0.4)
        self.attendre_voix(marge=0.2)
        self._suite(tb, xs, petit, m_pt, s_pt, grand, s_gd, pk, garder, m_gd)

    def _suite(self, tb, xs, petit, m_pt, s_pt, grand, s_gd, pk, garder, m_gd):
        # ── 03 : 1 kg = 2 petits paquets : 2 × 2 € = 4 € ──
        self.dire("03-deux-petits")
        self.au_mot("1 kg")
        self.play(FadeOut(pk), tb.remplir(0, 1, couleur=BLEU_P), run_time=0.4)
        copie = VGroup(petit, m_pt, s_pt).copy()
        for f in copie.get_family():  # le même paquet, déjà dit : n'attend rien
            if isinstance(f, Text):
                f._pas_audit = f.sans_synchro = True
        h = tb.fleche_col(0, 1, "× 2", ligne=0, fs=26)
        self.au_mot("2 petits")
        self.add(copie)
        self.play(copie.animate.move_to(P(xs[1], copie.get_y())), Create(h.fleche), FadeIn(h.etiquette, scale=1.3),
                  run_time=0.7)
        self.au_mot("500 g")
        self.play(Indicate(m_pt, color=AMBRE), Indicate(copie[1], color=AMBRE), run_time=0.5)
        b = tb.fleche_col(0, 1, "× 2", ligne=1, fs=26)
        self.au_mot("2 fois")
        self.play(Create(b.fleche), FadeIn(b.etiquette, scale=1.3), run_time=0.4)
        self.au_mot("2 €")
        self.play(Indicate(s_pt, scale_factor=1.3), Indicate(copie[2], scale_factor=1.3), run_time=0.5)
        self.au_mot("4 €")
        self.play(tb.remplir(1, 1, couleur=BLEU_P), Indicate(VGroup(petit, m_pt, s_pt, copie), color=VERT_OK),
                  run_time=0.5)
        self.attendre_voix(marge=0.2)

        # ── 04 : 4 € le kilo contre 5 € le kilo : surprise ──
        self.dire("04-surprise")
        self.au_mot("Petits paquets")
        self.play(FadeOut(h), FadeOut(b), Indicate(VGroup(petit, m_pt, s_pt, copie), color=BLEU_PT), run_time=0.5)
        self.au_mot("4 €")
        self.play(tb.allumer(1, 1, fond="#dcfce7", txt="#166534"), run_time=0.4)
        self.insister(tb.textes[1][1], 1.3)
        self.au_mot("Grand paquet")
        self.play(Indicate(VGroup(grand, m_gd, s_gd), color=ORANGE_GD, scale_factor=1.1), run_time=0.5)
        self.au_mot("5 €")
        self.play(tb.allumer(1, 2, fond="#fee2e2", txt="#991b1b"), run_time=0.4)
        self.insister(tb.textes[1][2], 1.3)
        self.au_mot("Surprise")
        tout_gd = VGroup(grand, m_gd, s_gd)
        self.play(Wiggle(tout_gd, scale_value=1.12, rotation_angle=0.06 * TAU), run_time=0.8)
        self.au_mot("le grand est")
        v = self.tampon("Le grand est plus cher !", ROUGE_ERREUR, 30)
        v.scale_to_fit_width(min(v.width, 4.0)).move_to(P(0, 0.42))
        self.play(FadeIn(v, scale=1.3), run_time=0.4)
        self.insister(v, 1.05)
        self.attendre_voix(marge=0.4)
        self.vider(garder)

        # ── 05 : la question-pause (3 s) ──
        self._q_morceaux = [[("3 yaourts", WHITE), (": 2 €.", WHITE)], [("Pack de 12", WHITE), (": 9 €.", WHITE)],
                            [("Meilleur prix ?", WHITE)]]
        self.question_pause("05-question", "05b-reponse", ["3 yaourts : 2 €.", "Pack de 12 : 9 €.", "Meilleur prix ?"],
                            [self.t("les 3 yaourts", 28), self.t("le pack de 12", 28), self.t("c'est pareil", 28)], 0,
                            ["12 = 4 × 3 : 4 × 2 = 8 €.", "Moins cher que 9 € !"], mot_q="3 yaourts",
                            autres_r=self._rep_q)
        self.vider(garder)

        # ── 06 : la question en commentaire ──
        self.dire("06-commentaire")
        self.au_mot("Et toi")
        et = self.t("Et toi ?", 38, JAUNE_TITRE).move_to(P(0, 1.95))
        self.play(FadeIn(et, shift=DOWN * 0.1), run_time=0.35)
        choc = tablette(2.2, 1.0).move_to(P(0, 0.9))
        l1 = self.ligne([("250 g", AMBRE), ("→", GREY_B), ("3 €", VERT_OK)], 42).move_to(P(0, -0.3))
        l2 = self.ligne([("1 kg", AMBRE), ("→", GREY_B), ("? €", ORANGE_RETENUE)], 42).move_to(P(0, -1.15))
        l2[1].set_x(l1[1].get_x())
        l2[0].next_to(l2[1], LEFT, buff=0.16)
        l2[2].next_to(l2[1], RIGHT, buff=0.16)
        self.au_mot("250 g")
        self.play(FadeIn(choc, shift=DOWN * 0.2), FadeIn(l1[0], scale=1.3), run_time=0.45)
        self.au_mot("3 €")
        self.play(FadeIn(l1[1]), FadeIn(l1[2], scale=1.3), run_time=0.35)
        self.au_mot("1 kg")
        self.play(FadeIn(l2, scale=1.2), run_time=0.4)
        self.insister(l2[2], 1.25)
        self.appel_commentaire(y=-2.1)
