# puissance_comprendre_short.py
# EleveAI — Maths 4e — série PUISSANCES, épisode 01 « comprendre », le SHORT
# ceinture BLANCHE « Plie une feuille en deux » : aⁿ, ce n'est pas a × n.
#   · EN HAUT, l'image : une feuille vue de PROFIL (un trait) qui se plie en
#     deux à chaque pliage ; la pile de couches s'épaissit (1, 2, 4, 8, 16, 32
#     traits empilés) ; le nombre de couches s'écrit à côté, en VERT ;
#   · EN BAS, au même instant : le compteur de pliages (ORANGE) et le produit
#     « 2 × 2 × … » (BLEU) qui s'allonge ; le produit se replie en 2, le
#     compteur devient l'exposant orange : 2⁵ = 32 ; « Pas 2 × 5 ! » en ROUGE,
#     10 barré ;
#   · 1 question-pause (3 s) après le 2e pliage : 3 pliages → 6 / 8 / 9 ;
#   · fin : 7 pliages, réponse en commentaire (2⁷ = 128), puis la fin standard.
# Code couleur de la série : bleu = la base, orange = l'exposant, vert = le
# résultat juste, rouge = le piège (a × n).
# Micro du coach : puissance_comprendre (aⁿ = a écrit n fois en facteur).
# Centres d'intérêt : sciences (l'expérience de la feuille pliée).
#
# Voix : manim/voix/4e-puissance-comprendre-short.json (validée ; clé 04-abonne
# ajoutée = la phrase de fin du 19/10), débit −6 ; WAV :
# public/sons/4e-puissance-comprendre-short/ ; marques :
# manim/scripts/4e/puissance_comprendre_short_marques.json (les « 2 fois »
# répétés gardent chacun leur instant).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/puissance_comprendre_short.py PuissanceComprendreShort
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/puissance_comprendre_short.py PuissanceComprendreShort -o eleveai-maths-4e-puissance-comprendre-short --media_dir manim/scripts/4e/media-puiss-01-short
# Sortie : manim/sorties/4e/maths/puissances/01-comprendre/eleveai-maths-4e-puissance-comprendre-short.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI.parent / "6e"))

from prop_commun import *  # noqa: E402,F403

sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

import numpy as np  # noqa: E402

CREME = "#f8fafc"     # la feuille
BLEU_PLI = "#7dd3fc"  # la moitié qui se plie
GRIS_T = "#64748b"    # la table
ROUGE_P = "#ef4444"   # le piège
Y_BASE = 0.62         # la première couche, posée sur la table
X_PILE = -0.9         # le centre de la pile, une fois pliée
X_ETIQ = 1.05         # le nombre de couches, à droite de la pile
Y_CPT, Y_PROD, Y_PAS = -0.3, -1.15, -2.0  # les lignes du bas
LARGEURS = [3.6, 1.8, 1.6, 1.4, 1.3, 1.3]  # la pile vue de près après k pliages


def tx(s, fs=34, couleur=WHITE, gras=False, audit=True):
    """Un texte posé AU MOT par le script (pas d'attente automatique)."""
    t = Text(s, font_size=fs, color=couleur, weight=BOLD if gras else NORMAL)
    t.sans_synchro = True
    if not audit:
        t._pas_audit = True
    if t.width > 3.8:  # rien ne touche les bords (cadre de 4,5)
        t.scale_to_fit_width(3.8)
    return t


class Pile:
    """La feuille de profil : une couche = un trait. plier() rabat la moitié
    droite PAR-DESSUS la gauche (rotation d'un demi-tour autour du pli, l'arc
    aplati pour rester dans la bande de l'image) : les couches doublent."""

    def __init__(self, scene, n=1, largeur=3.6, cx=0.0, gap=0.05, sw=2.6):
        self.sc, self.gap, self.sw = scene, gap, sw
        a, b = cx - largeur / 2, cx + largeur / 2
        self.couches = VGroup(*[self._trait(a, b, Y_BASE + i * gap) for i in range(n)])

    def _trait(self, a, b, y, c=CREME):
        return Line(P(a, y), P(b, y), color=c, stroke_width=self.sw)

    @property
    def n(self):
        return len(self.couches)

    def plier(self, avec=(), run_time=0.9):
        sc, cs = self.sc, self.couches
        a, b = cs.get_left()[0], cs.get_right()[0]
        m = (a + b) / 2
        ys = [c.get_y() for c in cs]
        gauches = VGroup(*[self._trait(a, m, y) for y in ys])
        droites = VGroup(*[self._trait(m, b, y, BLEU_PLI) for y in ys])
        sc.remove(cs)
        sc.add(gauches, droites)
        pivot = np.array([m, max(ys) + self.gap / 2, 0.0])
        orig = droites.copy()

        def maj(mob, al):
            th = PI * al
            co, si, s = np.cos(th), np.sin(th), 1 - 0.7 * np.sin(th)

            def f(p):
                v = p - pivot
                return pivot + np.array([co * v[0] - si * v[1], s * (si * v[0] + co * v[1]), 0.0])

            mob.become(orig)
            mob.apply_function(f)

        sc.play(UpdateFromAlphaFunc(droites, maj), *avec, run_time=run_time)
        sc.remove(gauches, droites)
        tous = sorted(list(gauches) + list(droites), key=lambda c: c.get_y())
        self.couches = VGroup(*tous)
        sc.add(self.couches)
        return self.couches

    def recadrer(self, largeur, cx=X_PILE, avec=(), run_time=0.35):
        """La pile vue de plus près (elle raccourcit à chaque pliage)."""
        cible = self.couches.copy().set_color(CREME).stretch_to_fit_width(largeur).set_x(cx)
        self.sc.play(Transform(self.couches, cible), *avec, run_time=run_time)

    def centre_y(self):
        return self.couches.get_center()[1]


def facteurs(n, fs=30):
    """« 2 × 2 × … × 2 » : n morceaux « 2 × » (le dernier « 2 »), en BLEU."""
    g = VGroup(*[tx("2 ×" if k < n - 1 else "2", fs, BLEU_CALCUL, True) for k in range(n)])
    return g.arrange(RIGHT, buff=0.16)


def puissance(base="2", exp="5", fs=64, audit=True):
    """La base en BLEU, l'exposant en ORANGE, petit et haut (pas de LaTeX)."""
    b = tx(base, fs, BLEU_CALCUL, True, audit)
    e = tx(exp, int(fs * 0.55), ORANGE_RETENUE, True, audit)
    e.next_to(b, RIGHT, buff=0.04).align_to(b, UP).shift(UP * 0.16 * fs / 64)
    g = VGroup(b, e)
    g.base, g.exp = b, e
    return g


class PuissanceComprendreShort(ShortProp):
    nom_voix = "4e-puissance-comprendre-short"
    fichier_marques = "puissance_comprendre_short_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "blanche"

    # ── petits outils ──
    def etiquette(self, n, audit=True):
        t = VGroup(tx(str(n), 46, VERT_OK, True, audit), tx("couche" + ("s" if n > 1 else ""), 24, VERT_OK))
        t.arrange(DOWN, buff=0.08)
        return t.move_to(P(X_ETIQ, max(self.pile.centre_y(), Y_BASE + 0.35)))

    def compteur(self, k, audit=True):
        return tx(str(k), 52, ORANGE_RETENUE, True, audit).next_to(self.cpt_lib, RIGHT, buff=0.22)

    def changer(self, ancien, neuf, run_time=0.3):
        """Un nombre remplace l'autre (l'ancien monte et s'efface)."""
        self.play(FadeOut(ancien, shift=UP * 0.25), FadeIn(neuf, shift=UP * 0.25, scale=1.3), run_time=run_time)
        return neuf

    def ligne_prod(self, n, res=None, audit=True):
        """Le produit de n facteurs (et « = res » en vert), centré sur Y_PROD."""
        f = facteurs(n)
        for m in f:
            if not audit:
                m._pas_audit = True
        g = VGroup(*f)
        r = None
        if res is not None:
            r = VGroup(tx("=", 30), tx(str(res), 34, VERT_OK, True, audit)).arrange(RIGHT, buff=0.14)
            g.add(r)
        g.arrange(RIGHT, buff=0.16).move_to(P(0, Y_PROD))
        return f, r

    def _disposer_q(self, question, choix, phrase):
        """Comme le modèle, mais « Question ! » et le compte à rebours reculent
        vers la gauche : le rond du 3 reste loin du bord droit (3 %)."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        d = rebours.get_right()[0] - 1.9
        if d > 0:
            tete.shift(LEFT * d)
            rebours.shift(LEFT * d)
        return tete, q, cartes, pause, rebours, ph

    def appel_commentaire(self, y=Y_PAS):
        self.au_mot("réponds en commentaire")
        appel = self.borne(tx("Réponds en commentaire !", 32, VERT_OK, True), 0.95).move_to(P(0, y))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.0)
        return appel

    def fin_short(self, voix, a_effacer):
        """La fin du 19/10 (celle des shorts de dénombrement, Tle)."""
        self.dire(voix)
        entraine = tx("Entraîne-toi sur", 40, JAUNE_TITRE).move_to(P(0, 2.2))
        site = tx("eleveai.fr", 54, BLEU_CALCUL).move_to(P(0, 1.25))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.2, stroke_width=3)
        abonne = tx("Abonne-toi !", 42, VERT_OK).move_to(P(0, -0.2))
        poignee = tx("@eleveai974", 44, VERT_OK, audit=False).move_to(P(0, -1.05))
        self.play(FadeOut(Group(*a_effacer)), run_time=0.3)
        self.play(Write(entraine), run_time=0.4)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.5)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), GrowFromCenter(poignee), run_time=0.45)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.25))
        self.attendre_voix(marge=1.0)

    def decor(self, audit=True):
        """La table (sous la pile) et la carte des maths (en bas)."""
        table = Line(P(-2.0, Y_BASE - 0.07), P(2.0, Y_BASE - 0.07), color=GRIS_T, stroke_width=4)
        carte = RoundedRectangle(width=4.1, height=2.85, corner_radius=0.18, fill_color="#0b1220",
                                 fill_opacity=1, stroke_color="#334155", stroke_width=2).move_to(P(0, -1.12))
        self.cpt_lib = tx("Pliages :", 36, WHITE, audit=audit).move_to(P(-0.45, Y_CPT))
        return table, carte

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Plie une feuille en deux", self.ceinture)
        titre.sans_synchro = True  # le titre de la vidéo : posé d'un bloc
        self.add(badge)
        garder = [badge, titre, margo]
        table, carte = self.decor()
        self.pile = Pile(self)

        # ── 00 : l'accroche : la feuille, le pli, la question ──
        self.dire("00-accroche")
        self.play(Write(titre), run_time=0.6)
        self.au_mot("feuille")
        self.play(Create(table), Create(self.pile.couches), FadeIn(carte), run_time=0.45)
        pli = DashedLine(P(0, Y_BASE - 0.25), P(0, Y_BASE + 0.35), color=AMBRE, stroke_width=3, dash_length=0.06)
        fl = CurvedArrow(P(1.65, Y_BASE + 0.12), P(-1.55, Y_BASE + 0.12), angle=PI * 0.55, color=AMBRE,
                         stroke_width=4, tip_length=0.18)
        self.au_mot("en deux")
        self.play(Create(pli), Create(fl), run_time=0.6)
        enc = tx("Encore !", 28, ORANGE_RETENUE, True).move_to(P(-0.95, Y_CPT))
        self.au_mot("Encore")
        self.play(FadeIn(enc, scale=1.3), Indicate(fl, color=ORANGE_RETENUE, scale_factor=1.05), run_time=0.4)
        enc2 = tx("Et encore !", 28, ORANGE_RETENUE, True).move_to(P(0.6, Y_CPT - 0.6))
        self.au_mot("Et encore")
        self.play(FadeIn(enc2, scale=1.3), Indicate(fl, color=ORANGE_RETENUE, scale_factor=1.05), run_time=0.4)
        q = tx("Combien de couches ?", 30, WHITE, True).move_to(P(0, Y_PAS + 0.05))
        self.au_mot("Combien")
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.insister(q, 1.08, 0.2)
        self.attendre_voix(marge=0.2)

        # ── 01 : 1 pliage : 2 couches ; 2 pliages : 2 × 2 = 4 couches ──
        self.dire("01-pliages")
        self.play(FadeOut(VGroup(enc, enc2, q)), FadeOut(pli), FadeOut(fl), run_time=0.1)
        cpt = self.compteur(1)
        self.au_mot("1 pliage")
        self.pile.plier(avec=[FadeIn(self.cpt_lib), FadeIn(cpt, scale=1.3)])
        self.pile.recadrer(LARGEURS[1])
        fs, _ = self.ligne_prod(1)
        et = self.etiquette(2)
        self.au_mot("2 couches")
        self.play(FadeIn(et, shift=LEFT * 0.2), FadeIn(fs[0], scale=1.3), run_time=0.35)
        self.au_mot("2 pliages")
        cpt2 = self.compteur(2)
        self.pile.plier(avec=[FadeOut(et), FadeOut(cpt, shift=UP * 0.25), FadeIn(cpt2, shift=UP * 0.25, scale=1.3)])
        self.pile.recadrer(LARGEURS[2])
        cpt = cpt2
        f2, r2 = self.ligne_prod(2, 4)
        self.au_mot("2, 4")
        self.play(ReplacementTransform(fs[0], f2[0]), FadeIn(f2[1], scale=1.3), run_time=0.3)
        et = self.etiquette(4)
        self.au_mot("4 couches")
        self.play(FadeIn(r2, scale=1.3), FadeIn(et, shift=LEFT * 0.2), run_time=0.35)
        self.insister(et, 1.25)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 01q : la question-pause (3 s) : après 3 pliages ? ──
        self.question_pause("01q-question", "01r-reponse", ["Après 3 pliages,", "combien de couches ?"],
                            [self.t("6", 30), self.t("8", 30), self.t("9", 30)], 1,
                            ["2 × 2 × 2 = 2³"], mot_q="Après", autres_r=self._rep_q)
        self.vider(garder)

        # ── 02 : 4 pliages, 5 pliages : 2⁵ = 32 couches. Pas 2 × 5 ! ──
        table, carte = self.decor(audit=False)  # le décor revient tel quel (8 couches, 3 pliages)
        self.pile = Pile(self, n=8, largeur=LARGEURS[3], cx=X_PILE)
        cpt = self.compteur(3, audit=False)
        f3, r3 = self.ligne_prod(3, 8, audit=False)
        et = self.etiquette(8, audit=False)
        self.play(FadeIn(VGroup(table, carte, self.pile.couches, self.cpt_lib, cpt, *f3, r3, et)), run_time=0.4)
        self.dire("02-suite")
        cpt4 = self.compteur(4)
        self.au_mot("4 pliages")
        self.pile.plier(avec=[FadeOut(et), FadeOut(VGroup(*f3, r3)), FadeOut(cpt, shift=UP * 0.25),
                              FadeIn(cpt4, shift=UP * 0.25, scale=1.3)])
        self.pile.recadrer(LARGEURS[4])
        et = self.etiquette(16)
        self.au_mot("16 couches")
        self.play(FadeIn(et, shift=LEFT * 0.2), run_time=0.35)
        cpt5 = self.compteur(5)
        self.au_mot("5 pliages")
        self.pile.plier(avec=[FadeOut(et), FadeOut(cpt4, shift=UP * 0.25), FadeIn(cpt5, shift=UP * 0.25, scale=1.3)])
        self.pile.recadrer(LARGEURS[5])
        f5 = facteurs(5).move_to(P(0, Y_PROD))
        for k in range(5):
            self.au_mot("2 fois" if k < 4 else "2. On", k + 1 if k < 4 else 1)
            self.play(FadeIn(f5[k], scale=1.35), Indicate(self.pile.couches, color=BLEU_PLI, scale_factor=1.03),
                      run_time=0.3)
        p5 = puissance("2", "5", 54).move_to(P(-0.7, Y_PROD + 0.2))
        self.au_mot("2 puissance")
        self.play(ReplacementTransform(f5, p5.base), run_time=0.6)
        self.au_mot("5 :")
        self.play(ReplacementTransform(cpt5.copy(), p5.exp), Indicate(cpt5, color=ORANGE_RETENUE), run_time=0.3)
        self.insister(p5.exp, 1.6, 0.14)
        r32 = VGroup(tx("=", 44), tx("32", 52, VERT_OK, True)).arrange(RIGHT, buff=0.18)
        r32.next_to(p5, RIGHT, buff=0.22).align_to(p5.base, DOWN)
        et = self.etiquette(32)
        self.au_mot("32 couches")
        self.play(FadeIn(r32, scale=1.3), FadeIn(et, shift=LEFT * 0.2), run_time=0.4)
        self.insister(VGroup(r32[1], et), 1.3, 0.25)
        pas = VGroup(tx("Pas", 34, ROUGE_P, True), tx("2 ×", 34, ROUGE_P, True), tx("5 !", 34, ROUGE_P, True))
        pas.arrange(RIGHT, buff=0.16).move_to(P(0, Y_PAS + 0.38))
        dix = tx("10", 34, GREY_B, True, audit=False).move_to(P(0, Y_PAS - 0.24))  # SA ligne, sous le piège
        pas.add(dix)
        barre = Line(pas[3].get_corner(DL) + LEFT * 0.05, pas[3].get_corner(UR) + RIGHT * 0.05, color=ROUGE_P,
                     stroke_width=7)
        for m, mot in zip(pas[:3], ["Pas", "2 fois 5", "5 !"]):
            self.au_mot(mot)
            self.play(FadeIn(m, shift=UP * 0.15), run_time=0.25)
        self.play(FadeIn(pas[3], scale=1.2), run_time=0.25)
        self.play(Create(barre), run_time=0.3)
        self.insister(r32[1], 1.25, 0.25)
        self.attendre_voix(marge=0.4)

        # ── 03 : la question en commentaire : 7 pliages ──
        self.vider(garder + [table, carte, self.pile.couches])
        self.dire("03-question")
        q1 = VGroup(tx("Après", 34), tx("7 pliages", 34, ORANGE_RETENUE, True)).arrange(RIGHT, buff=0.16)
        if q1.width > 3.5:
            q1.scale_to_fit_width(3.5)
        q1.move_to(P(0, Y_CPT))
        self.au_mot("Après")
        self.play(FadeIn(q1[0], shift=UP * 0.12), run_time=0.25)
        self.au_mot("7")
        self.play(FadeIn(q1[1], scale=1.3), run_time=0.3)
        q2 = tx("combien de couches ?", 32, WHITE, True).move_to(P(0, Y_PROD + 0.25))
        mystere = tx("?", 80, VERT_OK, True).move_to(P(X_ETIQ, self.pile.centre_y()))
        self.au_mot("combien")
        self.play(FadeIn(q2, shift=UP * 0.12), FadeIn(mystere, scale=1.6), run_time=0.4)
        q3 = tx("Écris-le avec une puissance !", 28, BLEU_CALCUL, True).move_to(P(0, Y_PROD - 0.4))
        self.borne(q3, 0.7)
        self.au_mot("Écris-le")
        self.play(FadeIn(q3, shift=UP * 0.12), run_time=0.35)
        appel = self.appel_commentaire()

        # ── 04 : la fin standard ──
        self.fin_short("04-abonne", [m for m in self.mobjects if m is not margo])

    def _rep_q(self, sc):
        """La réponse au mot : 2 × 2 × 2, replié en 2³ (base bleue, exposant orange)."""
        ref = sc.ph_q[0]
        f = facteurs(3, 30)
        eg = tx("=", 30)
        p3 = puissance("2", "3", 40)
        lg = VGroup(*f, eg, p3).arrange(RIGHT, buff=0.14).move_to(ref)
        p3.align_to(f, DOWN)
        for k, (mot, n) in enumerate([("2 fois", 1), ("2 fois", 2), ("2 :", 1)]):
            sc.au_mot(mot, n)
            sc.play(FadeIn(f[k], shift=UP * 0.12), run_time=0.25)
        sc.au_mot("2 puissance")
        sc.play(FadeIn(eg), FadeIn(p3.base, scale=1.3), run_time=0.3)
        sc.au_mot("3.")
        sc.play(FadeIn(p3.exp, scale=1.5), run_time=0.3)
        sc.insister(p3.exp, 1.5, 0.2)
        sc.rep_fini()
