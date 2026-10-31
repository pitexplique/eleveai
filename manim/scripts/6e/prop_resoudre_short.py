# prop_resoudre_short.py
# EleveAI — Maths 6e — short jumeau de l'épisode 05 « Résoudre un problème de
# proportionnalité » (micro prop_direct). CEINTURE BLANCHE (règle du short
# blanc, REGLES.md : en haut l'image qui bouge, en bas les maths qui se
# remplissent EN MÊME TEMPS ; échelle entière des ceintures sous le titre).
# Il AMUSE : une COURSE de trois coureurs, un par chemin (l'unité, les
# colonnes, le coefficient), sur le même problème : 4 places de concert
# 100 € → 6 places ? Chaque coureur avance quand son calcul avance ; EN BAS, le
# tableau se remplit au même instant (1 → 25 €, 2 → 50 €, 6 → 150 €) ; les
# trois arrivent au même drapeau « 150 € ».
#   · 1 question-pause (3 s) : 8 places ? (le double de 4 → 200 €) ; leurres :
#     104 € (ajouter au lieu de multiplier : 100 + 4), 400 € (multiplier par 4
#     au lieu de doubler : mauvais coefficient) ;
#   · fin : « Combien coûtent 10 places, et quel chemin ? » (250 €) en commentaire.
# Centres d'intérêt : musique. Prix fictif (25 € la place, ordre de grandeur
# d'un concert en salle) : pas de donnée réelle à sourcer.
# Ajouté ICI (absent du module) : coureur(), la piste de course et son
# drapeau ; la pastille « × 25 » posée sur le tableau (pas de place à droite
# pour la flèche latérale dans le cadre de 4,5) ; _carte_choix compacte,
# _disposer_q et table_haut() repris de prop_tableau_short.py.
#
# Voix : manim/voix/6e-prop-resoudre-short.json (validée, débit −10) ;
# marques : manim/scripts/6e/prop_resoudre_short_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/6e/prop_resoudre_short.py PropResoudreShort6e
# python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/6e/prop_resoudre_short.py PropResoudreShort6e -o eleveai-maths-6e-prop-resoudre-short --media_dir manim/scripts/6e/media-prop-resoudre-short
# Sortie : manim/sorties/6e/maths/proportionnalite/05-resoudre/eleveai-maths-6e-prop-resoudre-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403

C1, C2, C3 = "#a78bfa", FLECHE_COL, AMBRE
COUL = [C1, C2, C3]
NOMS = ["Unité", "Colonnes", "Coefficient"]
YS = [1.95, 1.45, 0.95]
XA, XB = -2.05, 0.85


def coureur(c, s=1.0):
    """Un petit coureur : tête, maillot de sa couleur, jambes en foulée."""
    tete = Circle(radius=0.08, fill_color="#e0ac69", fill_opacity=1, stroke_width=0).move_to(P(0.02, 0.12))
    corps = RoundedRectangle(width=0.13, height=0.16, corner_radius=0.04, fill_color=c, fill_opacity=1,
                             stroke_color=WHITE, stroke_width=1.5).move_to(P(0, -0.02))
    jambes = VGroup(Line(P(0, -0.1), P(-0.08, -0.19)), Line(P(0, -0.1), P(0.08, -0.19))).set_stroke(WHITE, 3)
    return VGroup(jambes, corps, tete).scale(s)


def nb_libre(*mobs):
    for m in mobs:
        for f in m.get_family():
            if isinstance(f, Text):
                f.sans_synchro = True
                f._pas_audit = True
    return mobs[0] if len(mobs) == 1 else mobs


class PropResoudreShort6e(ShortProp):
    nom_voix = "6e-prop-resoudre-short"
    fichier_marques = "prop_resoudre_short_marques.json"
    ceinture = "blanche"
    Y_Q = 0.45

    def _carte_choix(self, lettre, txt, largeur, fs):
        """Comme prop_tableau_short.py : cartes de 0,56 de haut."""
        rond = Circle(radius=0.26 * fs / 34, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=0)
        l = Text(lettre, font_size=fs, color=WHITE, weight=BOLD).move_to(rond)
        corps = txt if isinstance(txt, Mobject) else Text(txt, font_size=fs, color=WHITE)
        ligne = VGroup(VGroup(rond, l), corps).arrange(RIGHT, buff=0.25)
        if ligne.width > largeur - 0.4:
            ligne.scale_to_fit_width(largeur - 0.4)
        cadre = RoundedRectangle(width=largeur, height=max(0.56, ligne.height + 0.18), corner_radius=0.14,
                                 stroke_color=BLEU_CALCUL, stroke_width=3, fill_color="#0b1220", fill_opacity=1)
        ligne.move_to(cadre).align_to(cadre.get_left() + RIGHT * 0.2, LEFT)
        return VGroup(cadre, ligne)

    def _disposer_q(self, question, choix, phrase):
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        for f in q.get_family():
            if isinstance(f, Text):
                f.sans_synchro = True  # « Et 8 places ? » s'écrit avec son nombre
        return tete, q, cartes, pause, rebours, ph

    def table(self, montrer=False):
        tb = TableauProp(["Places", "Prix (€)"], [[4, 1, 2, 6], [100, 25, 50, 150]], montrer=montrer,
                         largeur_case=0.7, largeur_libelle=1.05, hauteur=0.6, fs=26, marge=0.12)
        return tb

    def table_haut(self):
        """Le tableau rempli, en petit en haut (question, fin)."""
        tb = self.table(montrer=True)
        nb_libre(tb)
        return tb.scale(0.75).move_to(P(0, 1.92))

    def piste(self):
        """Les trois couloirs, la ligne d'arrivée, le drapeau et sa boîte « ? € »."""
        g = VGroup()
        self.couloirs, self.noms, self.coureurs, self.x_cour = VGroup(), VGroup(), VGroup(), [XA + 0.2] * 3
        for i, y in enumerate(YS):
            c = RoundedRectangle(width=XB - XA, height=0.42, corner_radius=0.1, fill_color="#1e293b", fill_opacity=1,
                                 stroke_color=COUL[i], stroke_width=2).move_to(P((XA + XB) / 2, y))
            self.couloirs.add(c)
            n = Text(NOMS[i], font_size=19, color=COUL[i], weight=BOLD).move_to(P(0, y)).align_to(P(XA + 0.45, 0),
                                                                                                    LEFT)
            n.set_z_index(2)
            n.sans_synchro = True
            self.noms.add(n)
            self.coureurs.add(coureur(COUL[i]).move_to(P(XA + 0.2, y)).set_z_index(3))
        damier = VGroup(*[Square(0.105, fill_color=WHITE if (a + b) % 2 == 0 else BLACK, fill_opacity=1,
                                 stroke_width=0).move_to(P(XB + 0.06 + 0.105 * a, YS[2] - 0.2 + 0.105 * b))
                          for a in range(2) for b in range(14)])
        mat = Line(P(1.3, YS[1] + 0.08), P(1.3, YS[0] + 0.25), color=GREY_A, stroke_width=4)
        toile = Polygon(P(1.3, YS[0] + 0.25), P(1.7, YS[0] + 0.12), P(1.3, YS[0] - 0.01), fill_color=ROUGE_P,
                        fill_opacity=1, stroke_width=0)
        self.boite = RoundedRectangle(width=0.9, height=0.46, corner_radius=0.1, fill_color="#052e16",
                                      fill_opacity=1, stroke_color=VERT_OK, stroke_width=3).move_to(P(1.5, YS[1] - 0.22))
        self.arrivee = Text("? €", font_size=26, color=ORANGE_RETENUE, weight=BOLD).move_to(self.boite)
        nb_libre(self.arrivee)
        g.add(self.couloirs, damier, mat, toile, self.boite, self.arrivee, self.coureurs)
        return g

    def courir(self, i, frac):
        x1 = XA + 0.2 + frac * (XB - XA - 0.35)
        self.x_cour[i] = x1
        c = self.coureurs[i]
        return c.animate.move_to(P(x1, YS[i]))

    def arriver(self, s):
        neuf = Text(s, font_size=26, color=VERT_OK, weight=BOLD)
        neuf.scale_to_fit_width(min(neuf.width, 0.74)).move_to(self.boite)
        vieux, self.arrivee = self.arrivee, neuf
        return AnimationGroup(FadeOut(vieux, scale=0.6), FadeIn(neuf, scale=1.5))

    def lc(self, morceaux, y, fs=30):
        return self.ligne(morceaux, fs).move_to(P(0, y))

    def pastille(self, tb):
        """« × 25 » posé sur le trait entre les deux lignes, côté libellés : le
        prix = 25 fois le nombre de places (la flèche latérale ne tient pas)."""
        t = Text("× 25", font_size=22, color=NUIT, weight=BOLD)
        fond = RoundedRectangle(width=t.width + 0.2, height=0.3, corner_radius=0.1, fill_color=AMBRE, fill_opacity=1,
                                stroke_width=0)
        g = VGroup(fond, t.move_to(fond))
        x = (tb.carte.get_left()[0] + tb.cases[0][0].get_left()[0]) / 2
        return g.move_to(P(x, (tb.y(0) + tb.y(1)) / 2))

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Trois chemins", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        tb = self.tb = self.table()
        tb.move_to(P(0, -1.5))
        piste = self.piste()
        L1, L2 = 0.4, -0.05

        # ── 00 : l'accroche ──
        self.dire("00-accroche")
        self.au_mot("Trois chemins")
        self.play(Write(titre), FadeIn(piste, shift=UP * 0.2), run_time=0.6)
        self.play(*[c.animate.shift(RIGHT * 0.12) for c in self.coureurs], rate_func=there_and_back, run_time=0.5)
        self.au_mot("Lequel")
        q = self.borne(self.t("Lequel est le plus rapide ?", 30, AMBRE)).move_to(P(0, L1 - 0.2))
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.play(Wiggle(self.coureurs), run_time=0.7)
        self.attendre_voix(marge=0.2)

        # ── 01 : 4 places de concert, 100 € ──
        self.dire("01-concert")
        l1 = self.lc([("4 places", WHITE), ("=", WHITE), ("100 €", VERT_OK)], L1)
        self.au_mot("4 places")
        self.play(FadeOut(q), FadeIn(tb.fond, shift=UP * 0.2), FadeIn(tb.valeur(0, 0), scale=1.4),
                  FadeIn(l1[0], shift=RIGHT * 0.15), run_time=0.45)
        self.au_mot("100 €")
        self.play(FadeIn(tb.valeur(1, 0), scale=1.4), FadeIn(l1[1]), FadeIn(l1[2], scale=1.3), run_time=0.4)
        l2 = self.lc([("6 places", WHITE), ("→", WHITE), ("? €", ORANGE_RETENUE)], L2)
        nb_libre(l2[2])
        self.au_mot("6 places")
        self.play(FadeIn(tb.valeur(0, 3), scale=1.4), FadeIn(tb.trou(1, 3), scale=1.3), FadeIn(l2[0]), FadeIn(l2[1]),
                  FadeIn(l2[2], scale=1.3), run_time=0.45)
        self.attendre_voix(marge=0.2)

        # ── 02 : chemin 1, l'unité ──
        self.dire("02-chemin1")
        self.au_mot("Chemin 1")
        self.play(FadeOut(VGroup(l1, l2)), FadeIn(self.noms[0], scale=1.2),
                  self.couloirs[0].animate.set_stroke(width=5), run_time=0.4)
        self.au_mot("1 place")
        self.play(FadeIn(tb.valeur(0, 1), scale=1.4), FadeIn(tb.trou(1, 1), scale=1.3), tb.allumer(0, 1),
                  run_time=0.4)
        a = self.lc([("100 ÷", WHITE), ("4 =", WHITE), ("25 €", VERT_OK)], L1)
        self.au_mot("100 divisé")
        self.play(FadeIn(a[0], shift=RIGHT * 0.15), tb.allumer(1, 0), run_time=0.3)
        self.au_mot("par 4")
        self.play(FadeIn(a[1], shift=RIGHT * 0.15), tb.allumer(0, 0), run_time=0.3)
        self.au_mot("égale 25")
        self.play(FadeIn(a[2], scale=1.3), tb.remplir(1, 1, 25), *[tb.eteindre(r, 0) for r in range(2)],
                  tb.eteindre(0, 1), self.courir(0, 0.5), run_time=0.6)
        self.au_mot("6 places")
        self.play(tb.allumer(0, 3), run_time=0.3)
        b = self.lc([("6 ×", WHITE), ("25 =", WHITE), ("150 €", VERT_OK)], L2)
        self.au_mot("6 fois")
        self.play(FadeIn(b[0], shift=RIGHT * 0.15), run_time=0.3)
        self.au_mot("25, égale")
        self.play(FadeIn(b[1], shift=RIGHT * 0.15), tb.allumer(1, 1), run_time=0.3)
        self.au_mot("150 €")
        self.play(FadeIn(b[2], scale=1.3), tb.remplir(1, 3, 150), tb.eteindre(0, 3), tb.eteindre(1, 1),
                  self.courir(0, 1.0), self.arriver("150 €"), run_time=0.6)
        self.play(tb.allumer(1, 3), run_time=0.25)
        self.attendre_voix(marge=0.2)

        # ── 03 : chemin 2, les colonnes ──
        self.dire("03-chemin2")
        self.au_mot("Chemin 2")
        self.play(FadeOut(VGroup(a, b)), tb.eteindre(1, 3), FadeIn(self.noms[1], scale=1.2),
                  self.couloirs[1].animate.set_stroke(width=5), run_time=0.4)
        self.au_mot("2 places")
        self.play(FadeIn(tb.valeur(0, 2), scale=1.4), FadeIn(tb.trou(1, 2), scale=1.3), tb.allumer(0, 2),
                  run_time=0.4)
        a = self.lc([("Moitié de 4", WHITE), ("→", WHITE), ("50 €", VERT_OK)], L1)
        self.au_mot("de 4")
        self.play(FadeIn(a[0], shift=RIGHT * 0.15), tb.allumer(0, 0), run_time=0.35)
        self.au_mot("50 €")
        self.play(FadeIn(a[1]), FadeIn(a[2], scale=1.3), tb.remplir(1, 2, 50), tb.eteindre(0, 0),
                  tb.eteindre(0, 2), self.courir(1, 0.5), run_time=0.6)
        b = self.lc([("6 =", WHITE), ("4 +", WHITE), ("2", WHITE)], L1)
        self.au_mot("6, c'est")
        self.play(FadeOut(a), FadeIn(b[0], shift=RIGHT * 0.15), tb.allumer(0, 3), run_time=0.35)
        self.au_mot("4 plus")
        self.play(FadeIn(b[1], shift=RIGHT * 0.15), tb.allumer(0, 0), run_time=0.3)
        self.au_mot("2 : 100")
        self.play(FadeIn(b[2], shift=RIGHT * 0.15), tb.allumer(0, 2), run_time=0.3)
        c = self.lc([("100 +", WHITE), ("50 =", WHITE), ("150 €", VERT_OK)], L2)
        self.au_mot("100 plus")
        self.play(FadeIn(c[0], shift=RIGHT * 0.15), *[tb.eteindre(0, k) for k in (0, 2, 3)], tb.allumer(1, 0),
                  run_time=0.3)
        self.au_mot("50, égale")
        self.play(FadeIn(c[1], shift=RIGHT * 0.15), tb.allumer(1, 2), run_time=0.3)
        self.au_mot("150 €")
        self.play(FadeIn(c[2], scale=1.3), tb.eteindre(1, 0), tb.eteindre(1, 2), tb.allumer(1, 3),
                  self.courir(1, 1.0), run_time=0.6)
        self.play(Indicate(tb.textes[1][3], color=VERT_OK, scale_factor=1.4),
                  Indicate(VGroup(self.boite, self.arrivee), color=VERT_OK), run_time=0.5)
        self.attendre_voix(marge=0.2)

        # ── 04 : chemin 3, le coefficient ; même arrivée ──
        self.dire("04-chemin3")
        self.au_mot("Chemin 3")
        self.play(FadeOut(VGroup(b, c)), tb.eteindre(1, 3), FadeIn(self.noms[2], scale=1.2),
                  self.couloirs[2].animate.set_stroke(width=5), run_time=0.4)
        a = self.lc([("Prix =", WHITE), ("25 ×", AMBRE), ("places", WHITE)], L1)
        pas = self.pastille(tb)
        self.au_mot("Le prix")
        self.play(FadeIn(a[0], shift=RIGHT * 0.15), Indicate(tb.libelles[1], color=AMBRE), run_time=0.35)
        self.au_mot("25 fois")
        self.play(FadeIn(a[1], scale=1.3), FadeIn(pas, scale=1.4), run_time=0.4)
        self.au_mot("nombre de places")
        self.play(FadeIn(a[2], shift=RIGHT * 0.15), Indicate(tb.libelles[0], color=AMBRE), run_time=0.4)
        b = self.lc([("6 ×", WHITE), ("25 =", WHITE), ("150 €", VERT_OK)], L2)
        self.au_mot("6 fois")
        self.play(FadeIn(b[0], shift=RIGHT * 0.15), tb.allumer(0, 3), run_time=0.3)
        self.au_mot("25, égale")
        self.play(FadeIn(b[1], shift=RIGHT * 0.15), Indicate(pas, color=AMBRE), run_time=0.3)
        self.au_mot("150 €")
        self.play(FadeIn(b[2], scale=1.3), tb.eteindre(0, 3), tb.allumer(1, 3), self.courir(2, 1.0), run_time=0.6)
        self.au_mot("Même arrivée")
        fin = self.borne(self.t("Même arrivée pour les trois !", 30, VERT_OK), 0.9).move_to(P(0, (L1 + L2) / 2))
        self.play(FadeOut(VGroup(a, b)), FadeIn(fin, scale=1.2),
                  *[cr.animate.shift(UP * 0.12) for cr in self.coureurs], run_time=0.4)
        self.play(*[cr.animate.shift(DOWN * 0.12) for cr in self.coureurs],
                  Indicate(VGroup(self.boite, self.arrivee), color=VERT_OK, scale_factor=1.25), run_time=0.5)
        self.insister(fin, 1.1)
        self.attendre_voix(marge=0.2)

        # ── 05 : la question-pause (3 s) : le tableau monte, les choix dessous ──
        garder = [margo, titre, badge]
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.4)
        self.tb = th = self.table_haut()
        self.play(FadeIn(th, shift=UP * 0.2), run_time=0.4)

        def rep(sc):
            l0 = sc.ligne_rep(0, ["8 =", "le double de 4."])
            l1_ = sc.ligne_rep(1, ["Le double de 100", "= 200 €."])
            sc.au_mot("8, c'est")
            sc.play(FadeIn(l0[0], shift=UP * 0.12), run_time=0.25)
            sc.au_mot("double de 4")
            sc.play(FadeIn(l0[1], shift=UP * 0.12), Indicate(th.textes[0][0], color=AMBRE, scale_factor=1.5),
                    run_time=0.35)
            sc.au_mot("Le double de 100")
            sc.play(FadeIn(l1_[0], shift=UP * 0.12), Indicate(th.textes[1][0], color=AMBRE, scale_factor=1.5),
                    run_time=0.35)
            sc.au_mot("200 €")
            sc.play(FadeIn(l1_[1], scale=1.3), run_time=0.3)
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse", ["Et 8 places ?"],
                            [self.t("104 €", 30), self.t("200 €", 30), self.t("400 €", 30)], 1,
                            ["8 = le double de 4.", "Le double de 100 = 200 €."], mot_q="Et 8", autres_r=rep)
        self.play(*[FadeOut(m) for m in self.mobjects if all(m is not k for k in garder)], run_time=0.4)
        self.play(FadeIn(self.table_haut()), run_time=0.3)

        # ── 06 : la question en commentaire ──
        self.dire("06-commentaire")
        self.au_mot("10 places")
        q = self.borne(self.ligne([("10 places", AMBRE), ("→ ? €", VERT_OK)], 40), 0.9).move_to(P(0, 0.4))
        self.play(FadeIn(q, scale=1.3), run_time=0.4)
        self.insister(q, 1.1)
        self.au_mot("quel chemin")
        ch = VGroup(*[VGroup(coureur(COUL[i], 1.6), Text(NOMS[i], font_size=22, color=COUL[i], weight=BOLD))
                      .arrange(DOWN, buff=0.08) for i in range(3)]).arrange(RIGHT, buff=0.22)
        ch.scale_to_fit_width(min(ch.width, 3.8)).move_to(P(0, -0.45))
        self.play(LaggedStart(*[FadeIn(x, shift=UP * 0.15) for x in ch], lag_ratio=0.2), run_time=0.6)
        self.appel_commentaire(y=-1.45)
