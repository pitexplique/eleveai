# prop_lycee_proportion.py
# EleveAI — Maths 2de — série « Proportionnalité », LYCÉE, épisode seconde 01 :
# PROPORTION D'UNE SOUS-POPULATION (micro du coach : info_proportion, notion
# information_chiffree_evolutions), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# ⭐ Méthode travaillée : proportion = partie ÷ tout (effectif de la
# sous-population ÷ effectif de RÉFÉRENCE) ; un même effectif donne deux
# pourcentages selon la référence : « pour cent de quoi ? ».
# ⭐ Le dessin (un par écran) : le grand rectangle « territoire 55 Mha », la
# forêt dedans (bande de 32 % de la largeur : aire = proportion), la forêt
# publique dedans (le quart bas de la bande : 25 % de la forêt) ; au piège, le
# MÊME petit rectangle comparé à deux références (la forêt / le territoire).
# ⭐ Leurres (les erreurs dites par la voix) : question 1 B 2,8 % (la partie
# recopiée), C 6,3 (tout ÷ partie) ; question 2 A 25 % (mauvaise référence :
# la part de la forêt), C 32 % (toute la forêt).
#
# Décor et métier : NATURE, Aïcha, INGÉNIEURE FORESTIÈRE (casque de chantier,
# sapins). Centres d'intérêt : nature-ecologie, histoire-geographie.
# Sources (prompt lycée, 02/11/2026) :
#   · SDES / IGN : forêt 17,6 Mha en 2024 = 32 % du territoire métropolitain
#     (≈ 55 Mha) ;
#   · ministère de l'Écologie (2022) : forêt ≈ 75 % privée, 16 % communale,
#     9 % domaniale (État) → forêt publique 25 % ≈ 4,4 Mha ; communes ≈ 2,8 Mha ;
#     État ≈ 1,6 Mha.
#
# Écrans : 00 garde · 01 Aïcha, la forêt dans le territoire · 02 partie ÷ tout
# (32 %) · 03 la sous-population (75 % privée, 25 % publique) · 04 QUESTION 1
# (communes 2,8 sur 17,6) · 05 changer de référence (4,4 ÷ 55 = 8 %) · 06 le
# piège « pour cent de quoi ? » · 07 QUESTION 2 (4,4 sur 55) · 08 défi (État
# 1,6 Mha) · 08b correction · 09 ce que tu as appris · 10 fin.
#
# Voix : manim/voix/seconde-prop-proportion.json (validée par Frédéric le
# 02/11, débit −10), WAV dans public/sons/seconde-prop-proportion/ ; marques
# mot à mot : manim/scripts/seconde/prop_lycee_proportion_marques.json
# (scripts/marques_dump.ps1 puis cues2marques_gap.py, seuil 0,5 s).
# Outils : manim/scripts/6e/prop_commun.py + manim/canvas_proportion.py (non
# modifiés) ; base PropTableauBase de manim/scripts/4e/prop_tableau.py et
# sans() de prop_agrandissement_rapport.py (comme prop_pourcentage_calculer.py).
# Ajouté ICI : figure_terr(), aicha(), sapin().
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/seconde/prop_lycee_proportion.py PropLyceeProportionSeconde
# PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/seconde/prop_lycee_proportion.py PropLyceeProportionSeconde -o eleveai-maths-seconde-prop-proportion --media_dir manim/scripts/seconde/media-prop-lycee-proportion
# Sortie : manim/sorties/seconde/maths/proportionnalite/01-proportion/eleveai-maths-seconde-prop-proportion.mp4

import sys
from pathlib import Path

_ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(_ICI.parents[0] / "4e"))
sys.path.insert(0, str(_ICI.parents[0] / "6e"))
sys.path.insert(0, str(_ICI))

import importlib.util  # noqa: E402

from prop_commun import *  # noqa: E402,F403
from prop_agrandissement_rapport import sans  # noqa: E402


def _charger(nom, chemin):
    spec = importlib.util.spec_from_file_location(nom, chemin)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


PropTableauBase4e = _charger("prop_tableau_4e_lycee", _ICI.parents[0] / "4e" / "prop_tableau.py").PropTableauBase

TERR = "#3f3a36"       # le territoire (fond pierre)
TERR_B = "#a8a29e"     # son contour
FORET = "#16a34a"      # la forêt
PRIVEE = "#14532d"     # la forêt privée (vert sombre)
PUB = "#fbbf24"        # la forêt publique (ambre)
COMM = "#a3e635"       # les forêts des communes
ETAT = "#38bdf8"       # les forêts de l'État


def figure_terr(w=6.0, h=3.6, pf=0.32, pp=0.25, centre=ORIGIN):
    """Le territoire (rectangle w × h), la forêt (bande gauche de largeur
    pf × w, toute la hauteur : aire = pf du territoire) et la forêt publique
    (le bas de la bande, hauteur pp × h : aire = pp de la forêt).
    .terr .foret .pub : rien n'est ajouté à la scène."""
    terr = Rectangle(width=w, height=h, fill_color=TERR, fill_opacity=1, stroke_color=TERR_B, stroke_width=4)
    foret = Rectangle(width=w * pf, height=h, fill_color=FORET, fill_opacity=1, stroke_width=0)
    foret.align_to(terr, LEFT).align_to(terr, DOWN)
    pub = Rectangle(width=w * pf, height=h * pp, fill_color=PUB, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    pub.align_to(terr, LEFT).align_to(terr, DOWN)
    g = VGroup(terr, foret, pub).move_to(centre)
    g.terr, g.foret, g.pub = terr, foret, pub
    return g


def sapin(s=1.0, couleur=FORET):
    """Un sapin : trois étages et un tronc."""
    et = VGroup(*[Triangle(fill_color=couleur, fill_opacity=1, stroke_width=0).scale(0.42 - 0.08 * k)
                  .move_to(P(0, 0.05 + 0.3 * k)) for k in range(3)])
    tronc = Rectangle(width=0.12, height=0.25, fill_color="#78350f", fill_opacity=1, stroke_width=0)
    tronc.next_to(et, DOWN, buff=-0.05)
    return VGroup(tronc, et).scale(s)


def aicha(s=1.0):
    """Aïcha, ingénieure forestière : veste verte, casque de chantier orange,
    carnet de relevés."""
    p = personne(peau="#8d5524", tenue="#15803d", cheveux="#1f2937", longs=True)
    c, r = p.tete.get_center(), p.tete.width / 2
    casque = AnnularSector(inner_radius=0, outer_radius=r * 1.08, angle=PI, start_angle=0, fill_color="#f97316",
                           fill_opacity=1, stroke_width=0).move_to(c + P(0, r * 0.62))
    visiere = RoundedRectangle(width=r * 2.6, height=0.08, corner_radius=0.03, fill_color="#ea580c",
                               fill_opacity=1, stroke_width=0).move_to(c + P(0, r * 0.12))
    carnet = RoundedRectangle(width=0.4, height=0.5, corner_radius=0.04, fill_color=WHITE, fill_opacity=1,
                              stroke_color="#94a3b8", stroke_width=2).move_to(p.corps.get_center() + P(0.3, 0.1))
    bande = Rectangle(width=p.corps.width * 0.62, height=0.1, fill_color="#facc15", fill_opacity=1,
                      stroke_width=0).move_to(p.corps.get_center() + P(0, -0.35))
    p.add(bande, casque, visiere, carnet)
    return p.scale(s)


class PropLyceeProportionBase(PropTableauBase4e):
    nom_voix = "seconde-prop-proportion"
    fichier_marques = "prop_lycee_proportion_marques.json"

    # Défauts repris le 03/11 : les questions-pauses dans une colonne plus
    # large (bord gauche XL_Q au lieu de 0,95), pour que l'énoncé (36) et la
    # phrase de réponse (34) ne soient plus réduits ; lisibles du fond de la classe.
    XL_Q = -1.3

    def question_pause(self, *a, **k):
        xl, self.XL, self._en_q = self.XL, self.XL_Q, True
        try:
            return super().question_pause(*a, **k)
        finally:
            self.XL, self._en_q = xl, False

    def bloc(self, lignes, fs=38, color=WHITE, buff=0.14):
        if getattr(self, "_en_q", False):
            fs, buff = max(fs, 34), 0.1
        return super().bloc(lignes, fs, color, buff)

    def _disposer_q(self, question, choix, phrase):
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        cartes.arrange(DOWN, buff=0.1).next_to(q, DOWN, buff=0.15).align_to(P(self.XL, 0), LEFT)
        pause.next_to(cartes, DOWN, buff=0.3).align_to(P(self.XL, 0), LEFT)
        ph.next_to(cartes, DOWN, buff=0.14).align_to(P(self.XL, 0), LEFT)
        return tete, q, cartes, pause, rebours, ph

    def ligne_rep(self, i, morceaux, fs=None):
        return super().ligne_rep(i, morceaux, fs or 34)

    def montre(self, mot, *anims, rt=0.4):
        """Au mot de la voix (str ou (str, n)), joue les animations."""
        if mot:
            self.au_mot(*mot) if isinstance(mot, tuple) else self.au_mot(mot)
        self.play(*anims, run_time=rt)

    def titre_haut(self, s, mot, couleur=JAUNE_TITRE, fs=42, x=-0.4):
        self.au_mot(mot)
        tit = self.t(s, fs, couleur).move_to(P(x, 3.1))
        self.play(Write(tit), run_time=0.5)
        return tit

    def pile(self, morceaux, y, fs=36, x=0.0):
        """Les morceaux l'un SOUS l'autre, centrés en (x, y) (non joués)."""
        g = VGroup(*[self.t(s, fs, c) for s, c in morceaux]).arrange(DOWN, buff=0.1)
        return g.move_to(P(x, y))

    def source(self, s, x=1.3):
        """La source, discrète, en bas de l'écran de situation."""
        return sans(self.t(s, 20, GREY_B)).move_to(P(x, -3.3))

    def reprise(self, w=4.4, h=2.6, centre=P(-3.7, 0.5), pub=False, etiquettes=True):
        """La figure du territoire reprise d'un écran à l'autre (self.add : ni
        synchro ni audit) ; renvoie la figure et ses étiquettes."""
        f = figure_terr(w, h, centre=centre)
        if not pub:
            f.pub.set_opacity(0)
        et = VGroup()
        if etiquettes:
            et.add(sans(self.t("17,6 Mha", 20, WHITE)).move_to(f.foret.get_top() + DOWN * 0.3))
            et.add(sans(self.t("Territoire : 55 Mha", 26, TERR_B)).next_to(f.terr, DOWN, buff=0.18))
        self.add(f, et)
        return f, et

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Proportion d'une sous-population", self.identite, self.ceinture,
                                       y_ech=-2.45)
        sans(ident)  # « 2de » : l'identité, pas un nombre dit
        self.au_mot("Proportion")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        f = figure_terr(3.4, 1.7, centre=P(0, 0.45))
        deco = VGroup(sapin(1.0), sapin(0.8, PRIVEE), sapin(0.9)).arrange(RIGHT, buff=0.05, aligned_edge=DOWN)
        deco.move_to(P(-4.4, 0.45))
        self.play(FadeIn(f.terr), GrowFromEdge(f.foret, LEFT), FadeIn(deco, scale=0.7), run_time=0.6)
        self.play(FadeIn(f.pub, scale=1.2), run_time=0.3)
        q = self.ligne([("Un pourcentage,", WHITE), ("mais pour cent de quoi ?", ORANGE_RETENUE)], 36)
        q.move_to(P(0, -1.0))
        self.jouer(q, ["Un pourcentage", "mais pour"])
        self.play(Circumscribe(f.pub, color=AMBRE, buff=0.06), run_time=0.7)
        self.attendre_voix(marge=0.6)

    # ── 01 : Aïcha, la forêt dans le territoire ─────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = aicha(1.0).move_to(P(-5.4, -0.9))
        self.au_mot("Voici Aïcha")
        nom = self.t("Aïcha", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.35)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        met = VGroup(self.t("ingénieure", 28, BLEU_CALCUL), self.t("forestière", 28, BLEU_CALCUL))
        met.arrange(DOWN, buff=0.08).next_to(pers, DOWN, buff=0.15)
        self.montre("ingénieure", FadeIn(met[0], shift=DOWN * 0.1), rt=0.35)
        deco = VGroup(sapin(0.8), sapin(0.65, PRIVEE)).arrange(RIGHT, buff=0.05, aligned_edge=DOWN)
        deco.next_to(nom, UP, buff=0.25)
        self.montre("forestière", FadeIn(met[1], shift=DOWN * 0.1), FadeIn(deco, scale=0.7), rt=0.4)
        f = figure_terr(6.2, 3.3, centre=P(1.3, 0.25))
        f.pub.set_opacity(0)
        haut = self.ligne([("En 2024 ·", AMBRE), ("France métropolitaine", AMBRE)], 30).next_to(f.terr, UP, buff=0.25)
        self.montre("En 2024", FadeIn(f.terr), FadeIn(haut[0], shift=DOWN * 0.1), rt=0.5)
        lf = VGroup(self.t("Forêt", 26, WHITE), self.t("17,6 Mha", 26, WHITE)).arrange(DOWN, buff=0.08)
        lf.move_to(f.foret.get_top() + DOWN * 0.55)
        self.montre("la forêt", GrowFromEdge(f.foret, LEFT), FadeIn(lf[0]), rt=0.6)
        self.montre("17,6 millions", FadeIn(lf[1], scale=1.3), rt=0.35)
        self.insister(lf[1], 1.15, 0.2)
        self.montre("France", FadeIn(haut[1], shift=DOWN * 0.1), rt=0.4)
        bas = self.ligne([("Territoire :", TERR_B), ("55 Mha", WHITE)], 32).next_to(f.terr, DOWN, buff=0.2)
        self.montre("territoire", FadeIn(bas[0], shift=UP * 0.1), Circumscribe(f.terr, color=TERR_B, buff=0.05), rt=0.6)
        self.montre("55 millions", FadeIn(bas[1], scale=1.3), rt=0.35)
        note = sans(self.t("Mha : millions d'hectares", 22, GREY_B)).next_to(bas, DOWN, buff=0.15)
        src = self.source("Source : SDES / IGN, 2024")
        self.play(FadeIn(note), FadeIn(src), run_time=0.4)
        self.attendre_voix()

    # ── 02 : partie ÷ tout = 32 % ──────────────────────────────────────────
    def ecran_calcul(self):
        self.ecran("02-calcul")
        f, et = self.reprise()
        x = 3.0
        l1 = self.lc([("Proportion", JAUNE_TITRE), ("=", WHITE), ("partie", FORET), ("÷", WHITE), ("tout", TERR_B)],
                     2.4, fs=38, x=2.7)
        self.jouer(l1, ["proportion", None, "partie", "divisée", "tout"],
                   extra={2: [Indicate(f.foret, color=COMM, scale_factor=1.05)],
                          4: [Circumscribe(f.terr, color=TERR_B, buff=0.05)]})
        l2 = self.lc([("17,6 ÷", FORET), ("55 =", TERR_B), ("0,32", VERT_OK)], 1.2, fs=46, x=x)
        self.jouer(l2, ["17,6", "par 55", "0,32"])
        l3 = self.lc([("soit", WHITE), ("32 %", VERT_OK), ("du territoire", WHITE)], 0.1, fs=46, x=x)
        p32 = self.t("32 %", 32, NUIT).move_to(f.foret.get_center() + DOWN * 0.2)
        self.jouer(l3, ["soit", "32 %", "du territoire"], extra={1: [FadeIn(p32, scale=1.3)]})
        self.insister(l3[1], 1.2, 0.2)
        tiers = VGroup(*[DashedLine(f.terr.get_corner(DL) + RIGHT * f.terr.width * k / 3,
                                    f.terr.get_corner(UL) + RIGHT * f.terr.width * k / 3,
                                    color=WHITE, stroke_width=3, dash_length=0.12) for k in (1, 2)])
        l4 = self.lc([("≈ un hectare", AMBRE), ("sur trois", AMBRE)], -1.1, fs=40, x=x)
        self.jouer(l4, ["Presque", "sur trois"], extra={0: [Create(tiers)]})
        self.insister(l4, 1.08, 0.2)
        self.attendre_voix()

    # ── 03 : la sous-population : 75 % privée, 25 % publique ───────────────
    def ecran_sous_population(self):
        self.ecran("03-sous-population")
        f, et = self.reprise(w=3.8, h=2.6, centre=P(-4.5, 0.6))
        z = Rectangle(width=2.4, height=3.6, fill_color=FORET, fill_opacity=1, stroke_color=WHITE, stroke_width=3)
        z.move_to(P(0.4, 0.55))
        zoom = VGroup(DashedLine(f.foret.get_corner(UR), z.get_corner(UL), color=GREY_B, stroke_width=2),
                      DashedLine(f.foret.get_corner(DR), z.get_corner(DL), color=GREY_B, stroke_width=2))
        tit = self.t("Dans cette forêt", 36, JAUNE_TITRE).next_to(z, UP, buff=0.2)
        self.montre("Dans cette", Create(zoom), FadeIn(z), FadeIn(tit, shift=DOWN * 0.1), rt=0.6)
        q = z.height / 4
        quarts = VGroup(*[Rectangle(width=z.width, height=q, fill_color=FORET, fill_opacity=1, stroke_color=WHITE,
                                    stroke_width=2).move_to(z.get_top() + DOWN * q * (k + 0.5)) for k in range(4)])
        xl = 2.0
        l0 = VGroup(self.t("trois hectares", 30, WHITE), self.t("sur quatre", 30, WHITE)).arrange(DOWN, buff=0.06,
                                                                                               aligned_edge=LEFT)
        l0.move_to(P(0, quarts[1].get_y() + 0.45)).align_to(P(xl, 0), LEFT)
        self.montre("trois hectares", FadeIn(quarts), FadeIn(l0[0], shift=RIGHT * 0.15), rt=0.45)
        self.montre("quatre", FadeIn(l0[1], shift=RIGHT * 0.15),
                    LaggedStart(*[quarts[k].animate.set_fill(PRIVEE) for k in range(3)], lag_ratio=0.3), rt=0.8)
        l1 = self.ligne([("privée :", COMM), ("75 %", COMM)], 34).next_to(l0, DOWN, buff=0.2).align_to(l0, LEFT)
        self.montre("privés", FadeIn(l1[0], shift=RIGHT * 0.15), rt=0.35)
        p75 = self.t("75 %", 34, WHITE).move_to(VGroup(*quarts[:3]))
        self.montre("75 %", FadeIn(l1[1], scale=1.3), FadeIn(p75, scale=1.3), rt=0.4)
        l2 = self.ligne([("Le reste :", WHITE), ("25 %", PUB)], 34).move_to(P(0, quarts[3].get_y() - 0.05))
        l2.align_to(P(xl, 0), LEFT)
        p25 = self.t("25 %", 30, NUIT).move_to(quarts[3])
        self.montre("Le reste", FadeIn(l2[0], shift=RIGHT * 0.15), rt=0.35)
        self.montre("25 %", FadeIn(l2[1], scale=1.3), quarts[3].animate.set_fill(PUB), FadeIn(p25, scale=1.3), rt=0.45)
        l3 = self.t("forêt publique", 32, PUB).next_to(l2, DOWN, buff=0.15).align_to(l2, LEFT)
        self.montre("publique", FadeIn(l3, shift=RIGHT * 0.15), f.pub.animate.set_opacity(1), rt=0.45)
        l4 = self.t("à l'État ou aux communes", 26, GREY_B).next_to(l3, DOWN, buff=0.12).align_to(l2, LEFT)
        self.montre("l'État", FadeIn(l4, shift=RIGHT * 0.15), rt=0.35)
        self.play(Indicate(f.pub, color=WHITE, scale_factor=1.15), run_time=0.6)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (communes : 2,8 Mha sur 17,6) ──────────────────────
    def barre_foret(self, centre=P(-4.4, 0.0), w=1.9, h=3.6):
        """La forêt seule (= le tout), debout, et la part des communes en bas."""
        z = Rectangle(width=w, height=h, fill_color=PRIVEE, fill_opacity=1, stroke_color=WHITE, stroke_width=3)
        z.move_to(centre)
        cm = Rectangle(width=w, height=h * 0.16, fill_color=COMM, fill_opacity=1, stroke_width=0)
        cm.align_to(z, DOWN).align_to(z, LEFT)
        return z, cm

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        z, cm = self.barre_foret(centre=P(-4.4, 0.3))
        lz = sans(self.t("Forêt : 17,6 Mha", 26, WHITE)).next_to(z, UP, buff=0.15)
        lc_ = self.t("2,8 Mha", 24, NUIT).move_to(cm)

        def avant(sc):
            sc.play(FadeIn(z), FadeIn(lz), run_time=0.4)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["2,8 ÷", "17,6", "≈ 0,16,", "soit 16 %."])
            p16 = sc.t("16 %", 30, COMM).next_to(cm, RIGHT, buff=0.15)
            sc.montre("2,8", FadeIn(l0[0], shift=UP * 0.15), GrowFromEdge(cm, DOWN), rt=0.4)
            sc.play(FadeIn(lc_), run_time=0.25)
            sc.montre("17,6", FadeIn(l0[1], shift=UP * 0.15), Circumscribe(z, color=WHITE, buff=0.05), rt=0.5)
            sc.montre("0,16", FadeIn(l0[2], shift=UP * 0.15), rt=0.35)
            sc.montre("16 %", FadeIn(l0[3], scale=1.3), FadeIn(p16, scale=1.3), rt=0.4)
            l1 = sc.ligne_rep(1, ["B : la partie recopiée ;"])
            l2 = sc.ligne_rep(2, ["C : tout ÷ partie."])
            sc.montre("B recopie", FadeIn(l1[0], shift=UP * 0.15), rt=0.35)
            sc.montre("C divise", FadeIn(l2[0], shift=UP * 0.15), rt=0.35)
            sc.rep_fini()

        self.question_pause("04-question", "04b-reponse",
                            ["Forêts des communes : 2,8 Mha", "sur 17,6 Mha.", "Quelle proportion de la forêt ?"],
                            [self.t("16 %", 34), self.t("2,8 %", 34), self.t("6,3", 34)], 0,
                            ["2,8 ÷ 17,6 ≈ 0,16, soit 16 %.", "B : la partie recopiée ;", "C : tout ÷ partie."],
                            mot_q="Les forêts", avant_q=avant, autres_r=apres)

    # ── 05 : changer de référence : 4,4 ÷ 55 = 8 % ─────────────────────────
    def ecran_reference(self):
        self.ecran("05-reference")
        f, et = self.reprise(w=4.4, h=2.6, centre=P(-3.7, 0.7), pub=False)
        x = 2.9
        l1 = self.lc([("25 % de", PUB), ("17,6", FORET), ("= 4,4 Mha", PUB)], 2.3, fs=42, x=x)
        p44 = self.t("4,4", 24, NUIT).move_to(f.pub)
        self.jouer(l1, ["25 %", "17,6", "4,4 millions"],
                   extra={0: [f.pub.animate.set_opacity(1)], 2: [FadeIn(p44, scale=1.3)]})
        self.insister(l1[2], 1.1, 0.2)
        l2 = self.lc([("Par rapport", WHITE), ("au territoire ?", TERR_B)], 1.15, fs=40, x=x)
        self.jouer(l2, ["Mais par rapport", "au territoire"], extra={1: [Circumscribe(f.terr, color=TERR_B, buff=0.05)]})
        l3 = self.lc([("4,4 ÷", PUB), ("55 =", TERR_B), ("0,08", VERT_OK)], 0.0, fs=46, x=x)
        self.jouer(l3, ["4,4 divisé", "par 55", "0,08"])
        l4 = self.lc([("soit", WHITE), ("8 %", VERT_OK), ("du territoire", WHITE)], -1.1, fs=46, x=x)
        sans(l4[2])
        p8 = self.t("8 %", 30, PUB).next_to(f.pub, RIGHT, buff=0.15)
        self.jouer(l4, ["soit", "8 %", None], extra={1: [FadeIn(p8, scale=1.3)]})
        self.insister(l4[1], 1.2, 0.2)
        self.attendre_voix()

    # ── 06 : le piège : le même 4,4 Mha, deux références ───────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.titre_haut("Voilà le piège !", "Voilà", couleur=ROUGE_ERREUR, fs=44)
        w, h = 4.0, 2.4
        zf = Rectangle(width=w * 0.32, height=h, fill_color=FORET, fill_opacity=1, stroke_color=WHITE,
                       stroke_width=3).move_to(P(-4.3, 0.35))
        zt = Rectangle(width=w, height=h, fill_color=TERR, fill_opacity=1, stroke_color=TERR_B,
                       stroke_width=4).move_to(P(1.2, 0.35))
        pubs = VGroup()
        for z in (zf, zt):
            pubs.add(Rectangle(width=w * 0.32, height=h * 0.25, fill_color=PUB, fill_opacity=1, stroke_color=WHITE,
                               stroke_width=2).align_to(z, LEFT).align_to(z, DOWN))
        nf = sans(self.t("la forêt", 26, FORET)).next_to(zf, UP, buff=0.12)
        nt = sans(self.t("le territoire", 26, TERR_B)).next_to(zt, UP, buff=0.12)
        self.play(FadeIn(zf), FadeIn(zt), FadeIn(nf), FadeIn(nt), run_time=0.5)
        meme = self.ligne([("Le même nombre :", AMBRE), ("4,4 Mha", PUB)], 30).move_to(P(-1.55, 2.3))
        self.montre("Le même", FadeIn(meme[0], shift=DOWN * 0.1), FadeIn(pubs[0]), FadeIn(pubs[1]), rt=0.45)
        n44 = VGroup(*[self.t("4,4", 24, NUIT).move_to(p) for p in pubs])
        self.montre("4,4 millions", FadeIn(meme[1], scale=1.3), FadeIn(n44[0], scale=1.3), FadeIn(n44[1], scale=1.3),
                    rt=0.4)
        self.play(Indicate(pubs[0], color=WHITE, scale_factor=1.1), Indicate(pubs[1], color=WHITE, scale_factor=1.1),
                  run_time=0.6)
        la = self.ligne([("25 %", PUB), ("de la forêt", FORET)], 32).next_to(zf, DOWN, buff=0.25)
        lb = self.ligne([("8 %", PUB), ("du territoire", TERR_B)], 32).next_to(zt, DOWN, buff=0.25)
        self.jouer(la, ["25 %", "de la forêt"], extra={0: [Circumscribe(zf, color=FORET, buff=0.05)]})
        self.jouer(lb, ["8 %", "du territoire"], extra={0: [Circumscribe(zt, color=TERR_B, buff=0.05)]})
        l1 = self.ligne([("Un pourcentage ne veut rien dire", WHITE), ("tant qu'on n'a pas dit :", WHITE)], 25)
        l1.move_to(P(-1.0, -2.15))
        self.jouer(l1, ["Un pourcentage", "tant"])
        tp = self.tampon("pour cent de quoi ?", ORANGE_RETENUE, 36).move_to(P(-1.2, -2.95))
        self.montre("pour cent de quoi", FadeIn(tp, scale=1.2), rt=0.45)
        self.insister(tp, 1.1, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (4,4 Mha sur 55 Mha de territoire) ─────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        f = figure_terr(4.2, 2.4, centre=P(-4.2, 0.6))
        f.foret.set_opacity(0.35)
        lt = sans(self.t("Territoire : 55 Mha", 24, TERR_B)).next_to(f.terr, DOWN, buff=0.15)
        n44 = sans(self.t("4,4", 22, NUIT)).move_to(f.pub)
        lp = sans(self.t("forêt publique : 4,4 Mha", 26, PUB)).next_to(f.terr, UP, buff=0.15).align_to(f.terr, LEFT)

        def avant(sc):
            sc.play(FadeIn(f), FadeIn(lt), FadeIn(n44), FadeIn(lp), run_time=0.4)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["4,4 ÷", "55 =", "0,08,", "soit 8 %."])
            p8 = sc.t("8 %", 28, PUB).next_to(f.pub, RIGHT, buff=0.15)
            sc.montre("4,4", FadeIn(l0[0], shift=UP * 0.15), Indicate(f.pub, color=WHITE, scale_factor=1.1), rt=0.4)
            sc.montre("par 55", FadeIn(l0[1], shift=UP * 0.15), Circumscribe(f.terr, color=TERR_B, buff=0.05), rt=0.5)
            sc.montre("0,08", FadeIn(l0[2], shift=UP * 0.15), rt=0.35)
            sc.montre("8 %", FadeIn(l0[3], scale=1.3), FadeIn(p8, scale=1.3), rt=0.4)
            l1 = sc.ligne_rep(1, ["A : la part de la forêt ;"])
            l2 = sc.ligne_rep(2, ["C : toute la forêt."])
            sc.montre("A se trompe", FadeIn(l1[0], shift=UP * 0.15), rt=0.35)
            sc.montre("C, c'est", FadeIn(l2[0], shift=UP * 0.15), rt=0.35)
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse",
                            ["4,4 Mha", "sur 55 Mha.", "Quel pourcentage du territoire ?"],
                            [self.t("25 %", 34), self.t("8 %", 34), self.t("32 %", 34)], 1,
                            ["4,4 ÷ 55 = 0,08, soit 8 %.", "A : la part de la forêt ;", "C : toute la forêt."],
                            mot_q="4,4 millions", avant_q=avant, autres_r=apres)

    # ── 08 : défi : les forêts de l'État (1,6 Mha) ─────────────────────────
    def figure_etat(self, centre=P(-3.7, 0.5)):
        f = figure_terr(4.4, 2.6, centre=centre)
        f.pub.set_opacity(0)
        et = Rectangle(width=f.foret.width, height=f.foret.height * 0.09, fill_color=ETAT, fill_opacity=1,
                       stroke_width=0).align_to(f.foret, LEFT).align_to(f.foret, DOWN)
        lt = sans(self.t("Territoire : 55 Mha", 26, TERR_B)).next_to(f.terr, DOWN, buff=0.18)
        lf = sans(self.t("17,6 Mha", 20, WHITE)).move_to(f.foret.get_top() + DOWN * 0.3)
        return f, et, lt, lf

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.titre_haut("À toi de jouer !", "À toi de jouer", fs=50)
        f, et, lt, lf = self.figure_etat()
        self.play(FadeIn(f), FadeIn(lt), FadeIn(lf), run_time=0.4)
        x = 2.9
        l1 = self.lc([("État :", ETAT), ("1,6 Mha", ETAT)], 1.9, fs=42, x=x)
        self.jouer(l1, ["l'État", "1,6 million"], extra={1: [GrowFromEdge(et, DOWN)]})
        self.play(Indicate(et, color=WHITE, scale_factor=1.2), run_time=0.5)
        l2 = self.pile([("Quel % de la forêt", FORET), ("(17,6 Mha) ?", WHITE)], 0.75, fs=36, x=x)
        self.jouer(l2, ["Quel pourcentage", "17,6 millions"], extra={0: [Circumscribe(f.foret, color=COMM, buff=0.04)]})
        l3 = self.pile([("Quel % du territoire", TERR_B), ("(55 Mha) ?", WHITE)], -0.65, fs=36, x=x)
        self.jouer(l3, [("Quel pourcentage", 2), "55 millions"],
                   extra={0: [Circumscribe(f.terr, color=TERR_B, buff=0.05)]})
        self.pause_defi(y=-1.9)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.2))
        f, et, lt, lf = self.figure_etat(centre=P(-3.7, 0.3))
        self.add(f, et, lt, lf)
        x = 2.5
        t1 = self.lc([("De la forêt :", FORET)], 2.2, fs=38, x=x)
        self.jouer(t1, ["De la forêt"], extra={0: [Write(tit), Circumscribe(f.foret, color=COMM, buff=0.04)]})
        l1 = self.lc([("1,6 ÷", ETAT), ("17,6", FORET), ("≈ 0,09", WHITE), ("= 9 %", VERT_OK)], 1.35, fs=40, x=x)
        p9 = self.t("9 %", 26, ETAT).next_to(et, RIGHT, buff=0.12).shift(UP * 0.12)
        l1[3].shift(RIGHT * 0.2)
        self.jouer(l1, ["1,6", "17,6", "0,09", "9 %"], extra={3: [FadeIn(p9, scale=1.3)]})
        t2 = self.lc([("Du territoire :", TERR_B)], 0.25, fs=38, x=x)
        self.jouer(t2, ["Du territoire"], extra={0: [Circumscribe(f.terr, color=TERR_B, buff=0.05)]})
        l2 = self.lc([("1,6 ÷", ETAT), ("55", TERR_B), ("≈ 0,029", WHITE), ("= 2,9 %", VERT_OK)], -0.6, fs=40, x=x)
        l2[3].shift(RIGHT * 0.2)
        self.jouer(l2, [("1,6", 2), "par 55", "0,029", "2,9 %"])
        for m in (l1[3], l2[3]):
            self.play(Create(SurroundingRectangle(m, color=VERT_OK, buff=0.12, corner_radius=0.1)), run_time=0.3)
        self.insister(VGroup(l1[3], l2[3]), 1.08, 0.2)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ───────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        f = figure_terr(3.4, 2.1)
        e1 = sans(self.t("25 % de la forêt", 24, PUB))
        e2 = sans(self.t("8 % du territoire", 24, TERR_B))
        VGroup(e1, e2).arrange(DOWN, buff=0.1).next_to(f, DOWN, buff=0.2)
        fig = VGroup(f, e1, e2)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("La proportion d'une sous-population,", "c'est son effectif", "÷ l'effectif de référence."),
            ("Change la référence,", "et le pourcentage change."),
            ("Dis toujours :", "pour cent de quoi ?")], fs=34)
        self.au_mot("La proportion")
        self.montrer_ligne(lignes[0], Circumscribe(f.pub, color=VERT_OK, buff=0.05))
        self.au_mot("Change")
        self.montrer_ligne(lignes[1])
        self.au_mot("Dis toujours")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        import os
        ecrans = ["page_de_garde", "ecran_situation", "ecran_calcul", "ecran_sous_population", "ecran_question1", "ecran_reference", "ecran_piege", "ecran_question2", "ecran_defi", "ecran_correction", "ecran_finale"]
        seuls = os.environ.get("ECRANS")  # mise au point : ECRANS=ecran_question1,ecran_question2
        for e in ecrans:
            if not seuls or e in seuls.split(","):
                getattr(self, e)()
        if not seuls:
            self.page_abonnement("10-abonne")


class PropLyceeProportionSeconde(PropLyceeProportionBase):
    identite = "Maths 2de — EleveAI"
    ceinture = "verte"
