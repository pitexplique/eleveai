# prop_pourcentage_defi_short.py
# EleveAI — Maths 6e — short jumeau de l'épisode 14 « Défis sur les
# pourcentages » (micro pourcentage_defi). CEINTURE BLANCHE (règle du short
# blanc, REGLES.md) : on VOIT la comparaison, aucun calcul posé avant la
# question.
# Il AMUSE : « le meilleur buteur » (celui qui marque le MOINS de buts vise le
# mieux) :
#   · EN HAUT, l'image qui bouge : Léo et Sam tirent au but, chacun juste
#     AU-DESSUS de sa colonne du tableau ;
#   · EN BAS, au même instant, le tableau se remplit : Tirs, Buts, Réussite
#     (10 sur 20 = 50 % ; 40 sur 100 = 40 %), et la jauge de chaque joueur ;
#   · 1 question-pause (3 s) : Lina, 15 buts sur 50 tirs : A : 15 % (le nombre
#     pris pour un pourcentage), B : 30 % (juste), C : 35 % (50 − 15) ;
#   · fin : « 18 buts sur 25 tirs, combien de pour cent ? » (72 %) en commentaire.
# Centres d'intérêt : football, jeux-defis. Joueurs et chiffres INVENTÉS :
# pas de source à citer.
# Ajouté ICI (absent du module) : joueur(), ballon(), cage() ; la jauge de
# réussite = BarrePourcent mode « chargement », etiquette=False.
#
# Voix : manim/voix/6e-prop-pourcentage-defi-short.json (validée, débit −10) ;
# WAV : public/sons/6e-prop-pourcentage-defi-short/ ;
# marques : manim/scripts/6e/prop_pourcentage_defi_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/6e/prop_pourcentage_defi_short.py PropPourcentageDefiShort6e
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/prop_pourcentage_defi_short.py PropPourcentageDefiShort6e -o eleveai-maths-6e-prop-pourcentage-defi-short --media_dir manim/media-prop-14
# Sortie : manim/sorties/6e/maths/proportionnalite/14-pourcentage-defi/eleveai-maths-6e-prop-pourcentage-defi-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403

BLEU_LEO = "#38bdf8"
ROUGE_SAM = "#f87171"
Y_J = 1.3     # la ligne des joueurs, dans la bande du haut


def muet(t):
    for f in t.get_family():
        if isinstance(f, Text):
            f.sans_synchro = True
            f._pas_audit = True
    return t


def ballon(r=0.09):
    b = Circle(radius=r, fill_color=WHITE, fill_opacity=1, stroke_color="#111827", stroke_width=1.5)
    tache = RegularPolygon(5, fill_color="#111827", fill_opacity=1, stroke_width=0).scale(r * 0.45).move_to(b)
    return VGroup(b, tache)


def joueur(maillot, peau="#c68642", longs=False, s=0.28):
    """Un footballeur : le personnage du lot, maillot de couleur, short noir."""
    p = personne(peau=peau, tenue=maillot, longs=longs, s=s)
    short = Rectangle(width=1.0 * s, height=0.35 * s, fill_color="#111827", fill_opacity=1,
                      stroke_width=0).move_to(p.corps.get_bottom() + UP * 0.17 * s)
    p.add(short)
    return p


def cage(l=1.0, h=0.6):
    """Une cage de but vue de face : poteaux blancs, filet."""
    filet = VGroup(*[Line(P(-l / 2 + k * l / 6, 0), P(-l / 2 + k * l / 6, h)) for k in range(1, 6)],
                   *[Line(P(-l / 2, k * h / 4), P(l / 2, k * h / 4)) for k in range(1, 4)]).set_stroke(GREY_B, 1.5)
    cadre = VGroup(Line(P(-l / 2, 0), P(-l / 2, h)), Line(P(-l / 2, h), P(l / 2, h)),
                   Line(P(l / 2, h), P(l / 2, 0))).set_stroke(WHITE, 5)
    return VGroup(filet, cadre)


class PropPourcentageDefiShort6e(ShortProp):
    nom_voix = "6e-prop-pourcentage-defi-short"
    fichier_marques = "prop_pourcentage_defi_short_marques.json"
    ceinture = "blanche"

    def _disposer_q(self, question, choix, phrase):
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        rebours.chiffre.sans_synchro = True  # le compte à rebours part de 3 : ce n'est pas un nombre de la voix
        return tete, q, cartes, pause, rebours, ph

    def tableau(self):
        tb = TableauProp(["Tirs", "Buts", "Réussite"], [[20, 100], [10, 40], ["50 %", "40 %"]], montrer=False,
                         largeur_case=1.15, largeur_libelle=1.45, hauteur=0.6, fs=30, marge=0.14)
        self.caser_bas(tb)
        return tb

    def tir(self, j, but, cg, run_time=0.6):
        """Le ballon part du pied du joueur j vers la cage (dans le filet si but)."""
        b = ballon().move_to(j.get_bottom() + UP * 0.08 + RIGHT * 0.15 * np.sign(cg.get_x() - j.get_x()))
        cible = cg.get_center() + (DOWN * 0.05 if but else UP * 0.55 + RIGHT * 0.2)
        return Succession(FadeIn(b, run_time=0.05), b.animate(run_time=run_time - 0.1, path_arc=-0.6).move_to(cible),
                          FadeOut(b, run_time=0.05))

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Le meilleur buteur", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [margo, titre, badge]
        tb = self.tableau()
        leo = joueur(BLEU_LEO, s=0.32).move_to(P(tb.x(0), Y_J - 0.05))
        sam = joueur(ROUGE_SAM, peau="#e0ac69", s=0.32).move_to(P(tb.x(1), Y_J - 0.05))
        cg = cage(1.1, 0.62).move_to(P(tb.libelles.get_x(), Y_J))
        nl = muet(self.t("Léo", 26, BLEU_LEO)).next_to(leo, UP, buff=0.1)
        ns = muet(self.t("Sam", 26, ROUGE_SAM)).next_to(sam, UP, buff=0.1)

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.au_mot("Celui")
        self.play(Write(titre), FadeIn(cg, shift=UP * 0.2), run_time=0.6)
        q = Text("?", font_size=72, color=ORANGE_RETENUE, weight=BOLD).move_to(P(0, -0.6))
        self.au_mot("le moins")
        self.play(FadeIn(q, scale=0.4), run_time=0.4)
        self.au_mot("meilleur buteur")
        self.play(Indicate(q, color=AMBRE, scale_factor=1.3), Indicate(titre, color=AMBRE, scale_factor=1.05),
                  run_time=0.6)
        self.attendre_voix(marge=0.2)

        # ── 01 : Léo et Sam ──
        self.dire("01-joueurs")
        self.au_mot("Léo")
        self.play(FadeOut(q), FadeIn(leo, shift=UP * 0.2), FadeIn(nl), FadeIn(tb.fond, shift=UP * 0.2),
                  run_time=0.4)
        self.au_mot("20 fois")
        self.play(FadeIn(tb.valeur(0, 0), scale=1.4), tb.allumer(0, 0), self.tir(leo, False, cg, 0.6), run_time=0.6)
        self.au_mot("10 buts")
        self.play(FadeIn(tb.valeur(1, 0), scale=1.4), tb.allumer(1, 0), tb.eteindre(0, 0),
                  self.tir(leo, True, cg, 0.6), run_time=0.6)
        self.au_mot("Sam")
        self.play(FadeIn(sam, shift=UP * 0.2), FadeIn(ns), tb.eteindre(1, 0), run_time=0.4)
        self.au_mot("100 fois")
        self.play(FadeIn(tb.valeur(0, 1), scale=1.4), tb.allumer(0, 1), self.tir(sam, False, cg, 0.6), run_time=0.6)
        self.au_mot("40 buts")
        self.play(FadeIn(tb.valeur(1, 1), scale=1.4), tb.allumer(1, 1), tb.eteindre(0, 1),
                  self.tir(sam, True, cg, 0.6), run_time=0.6)
        self.play(tb.eteindre(1, 1), Indicate(tb.textes[1][1], color=AMBRE, scale_factor=1.3), run_time=0.4)
        self.attendre_voix(marge=0.2)

        # ── 02 : 10 sur 20 = 50 % ; 40 sur 100 = 40 % ──
        self.dire("02-calcul")
        jl = BarrePourcent(50, mode="chargement", largeur=1.05, hauteur=0.32, couleur=BLEU_LEO, etiquette=False)
        js = BarrePourcent(40, mode="chargement", largeur=1.05, hauteur=0.32, couleur=ROUGE_SAM, etiquette=False)
        y_j = tb.carte.get_bottom()[1] - 0.3
        jl.move_to(P(tb.x(0), y_j))
        js.move_to(P(tb.x(1), y_j))
        nom_j = muet(self.t("jauge", 24, GREY_B)).move_to(P(tb.x(0) - 1.2, y_j))
        self.au_mot("Léo : 10")
        self.play(tb.allumer(0, 0), tb.allumer(1, 0), Indicate(leo, color=BLEU_LEO, scale_factor=1.1),
                  FadeIn(jl.piste), FadeIn(js.piste), FadeIn(nom_j), run_time=0.4)
        self.au_mot("la moitié")
        self.play(jl.remplir(0.7), run_time=0.7)
        self.au_mot("50 %")
        self.play(FadeIn(tb.valeur(2, 0), scale=1.4), tb.allumer(2, 0), tb.eteindre(0, 0), tb.eteindre(1, 0),
                  run_time=0.4)
        self.au_mot("Sam : 40")
        self.play(tb.allumer(0, 1), tb.allumer(1, 1), Indicate(sam, color=ROUGE_SAM, scale_factor=1.1), run_time=0.4)
        self.au_mot("100 : 40")
        self.play(js.remplir(0.6), FadeIn(tb.valeur(2, 1), scale=1.4), tb.allumer(2, 1), tb.eteindre(0, 1),
                  tb.eteindre(1, 1), run_time=0.6)
        fin = self.borne(self.t("Léo vise mieux !", 34, VERT_OK), 0.9).move_to(P(0, y_j - 0.6))
        couronne = Star(5, outer_radius=0.17, inner_radius=0.08, fill_color=JAUNE_TITRE, fill_opacity=1,
                        stroke_width=0).next_to(nl, LEFT, buff=0.08)
        self.au_mot("Léo vise")
        self.play(FadeIn(fin, scale=1.2), FadeIn(couronne, scale=2), tb.eteindre(2, 1),
                  Indicate(tb.textes[2][0], color=VERT_OK, scale_factor=1.3), Circumscribe(jl, color=VERT_OK, buff=0.06), run_time=0.5)
        self.insister(fin, 1.1)
        self.attendre_voix(marge=0.3)

        # ── 03 : la question-pause (3 s) : Lina, 15 buts sur 50 tirs ──
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.4)

        def rep(sc):
            l0 = sc.ligne_rep(0, ["50 ×", "2 =", "100."])
            l1 = sc.ligne_rep(1, ["15 ×", "2 =", "30 %."])
            for lg, mots in ((l0, ["50 fois", "2, égale", "100. 15"]),
                             (l1, ["15 fois", ("2, égale", 2), "30 %"])):
                for i, (m, mot) in enumerate(zip(lg, mots)):
                    sc.au_mot(*mot) if isinstance(mot, tuple) else sc.au_mot(mot)
                    sc.play(FadeIn(m, shift=UP * 0.12), run_time=0.3)
            sc.rep_fini()

        self.question_pause("03-question", "03b-reponse", ["Lina : 15 buts sur 50 tirs.", "Quel pourcentage ?"],
                            [self.t("15 %", 30), self.t("30 %", 30), self.t("35 %", 30)], 1,
                            ["50 × 2 = 100.", "15 × 2 = 30 %."], mot_q="Lina", autres_r=rep)

        # ── 04 : la question en commentaire ──
        self.dire("04-commentaire")
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.3)
        j = joueur("#a78bfa", peau="#8d5524", s=0.4).move_to(P(-1.1, 1.3))
        cg2 = cage(1.1, 0.7).move_to(P(1.0, 1.2))
        l0 = self.t("Et toi ?", 40, JAUNE_TITRE).move_to(P(0, 0.2))
        self.au_mot("Et toi")
        self.play(FadeIn(l0, scale=1.2), FadeIn(j, shift=UP * 0.2), FadeIn(cg2), run_time=0.4)
        l1 = self.ligne([("18 buts", AMBRE), ("sur 25 tirs", AMBRE)], 30).move_to(P(0, -0.5))
        self.au_mot("18 buts")
        self.play(FadeIn(l1[0], scale=1.3), self.tir(j, True, cg2, 0.6), run_time=0.6)
        self.au_mot("sur 25")
        self.play(FadeIn(l1[1], shift=RIGHT * 0.15), run_time=0.35)
        l2 = self.borne(self.t("Combien de pour cent ?", 32, VERT_OK), 0.9).move_to(P(0, -1.2))
        self.au_mot("Combien")
        self.play(FadeIn(l2, shift=UP * 0.12), run_time=0.35)
        self.insister(l2, 1.08)
        self.appel_commentaire(y=-1.95)
