# prop_pourcentage_lire.py
# EleveAI — Maths 6e — série « Proportionnalité », lot 3, épisode 12 : LIRE UN
# POURCENTAGE (micro du coach : pourcentage_lire, notion pourcentage_nombre),
# AVEC VOIX. Paysage 16:9, CEINTURE VERTE (la paysage complète du niveau :
# situation, lecture « sur 100 » avec les 100 cases, tableau pour une autre
# quantité, piège, 2 questions-pauses, défi corrigé). Short jumeau :
# prop_pourcentage_lire_short.py (blanche).
# ⭐ Méthode travaillée : 70 % = 70 sur 100 (les 100 cases, 1 case = 1 g), puis
# le TABLEAU DE PROPORTIONNALITÉ pour ramener à une autre quantité (flèche de
# colonne « × 2 », « ÷ 2 », « × 3 », l'opération écrite sur la flèche).
# ⛔ Pas de produit en croix (6e) ; « ÷ » pour une division.
# Lien sans duplication : « pour cent = sur 100 » est posé par la série
# fractions (6e 12 pourcentage-fraction, 13 pourcentage-decimal) ; ici on LIT
# une étiquette et on la ramène à une autre masse.
# ⭐ Leurres (consigne-videos-proportionnalite.md) : 6. « 70 % » lu comme 70 g
# dans n'importe quelle tablette (écran 05, piège : 50 g → 35 g) ; question 1 :
# 70 g (le complément, lecture à l'envers), 3 g (30 % lu 3) ; question 2 : 20 g
# (le pourcentage recopié sans ramener à 200 g), 220 g (AJOUTER 200 + 20 au lieu
# de multiplier, erreur 1).
#
# Décor et métier : CUISINE, Emma, CHOCOLATIÈRE (tablette 70 % de cacao). Puis
# étiquettes de la vie : tee-shirt 100 % coton, boisson 0 % de sucre ajouté,
# pâte à tartiner 20 % de noisettes (chiffres inventés).
# Fait réel vérifié (WebSearch, 31/10/2026) : « dans un chocolat noir à 70 %, le
# reste est surtout du sucre » — VRAI : le pourcentage affiché = fèves + beurre
# de cacao, « les 30 % restants sont essentiellement du sucre » ; une tablette
# 70 % analysée : 63 % de fèves, 7,5 % de beurre de cacao, 29 % de sucre,
# vanille et lécithine (allodocteurs.fr, « Sucre, fèves, beurre de cacao… que
# contiennent vos chocolats ? » ; Test-Achats, chocolat noir, « comment
# choisir »). Voix gardée telle quelle.
# Centres d'intérêt : cuisine.
#
# Micro → écrans : lire un pourcentage = « sur 100 » (02, les 100 cases) ;
# ramener à une autre quantité par le tableau (03) ; QUESTION 1 (04) ; le piège
# (05, ÷ 2) ; les pourcentages de la vie, 100 % et 0 % (06) ; QUESTION 2 (07) ;
# défi (08) et correction (08b, × 3) ; ce que tu as appris (09) ; fin (10).
# Écrans : 00 garde · 01 Emma et sa tablette · 02 lire 70 % · 03 le tableau ·
# 04 QUESTION 1 · 05 le piège · 06 100 % et 0 % · 07 QUESTION 2 · 08 défi ·
# 08b correction · 09 ce que tu as appris · 10 fin.
#
# Voix : manim/voix/6e-prop-pourcentage-lire.json (validée par Frédéric, débit
# −10), WAV dans public/sons/6e-prop-pourcentage-lire/ ; marques mot à mot :
# manim/scripts/6e/prop_pourcentage_lire_marques.json (scripts/marques_dump.ps1
# puis scripts/cues2marques.py).
# BarrePourcent (module) : utilisée en mode « cases » (100 cases, carte du
# coach), etiquette=False (le « 70 % » est écrit AU MOT par la scène) ; la
# 2e couleur (le sucre) est coloriée par .grille.colorier(…, couleur=SUCRE).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/prop_pourcentage_lire.py PropPourcentageLire6e
# python -m manim render -qh --disable_caching manim/scripts/6e/prop_pourcentage_lire.py PropPourcentageLire6e -o eleveai-maths-6e-prop-pourcentage-lire --media_dir manim/media-prop-12
# Sortie : manim/sorties/6e/maths/proportionnalite/12-pourcentage-lire/eleveai-maths-6e-prop-pourcentage-lire.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403

CACAO = "#7c3f17"        # les cases de cacao (sur la carte blanche)
CACAO_T = "#e0a06a"      # « 70 g de cacao » écrit sur fond noir
SUCRE = "#facc15"        # les cases de sucre, et le mot « sucre »
LAIT = "#b07040"         # le chocolat au lait
COTON = "#60a5fa"        # le coton (tee-shirt), même bleu que le short
EMBALLAGE = "#b91c1c"


def tablette(l=2.6, h=1.6, couleur="#5b3417", emballage=EMBALLAGE, carres=(4, 3)):
    """Une tablette de chocolat : carrés moulés, à moitié dans son emballage.
    .corps · .papier (la bande d'emballage où l'étiquette se pose)."""
    corps = RoundedRectangle(width=l, height=h, corner_radius=0.08, fill_color=couleur, fill_opacity=1,
                             stroke_color="#2b1608", stroke_width=3)
    nx, ny = carres
    traits = VGroup(*[Line(P(-l / 2 + l * i / nx, -h / 2), P(-l / 2 + l * i / nx, h / 2)) for i in range(1, nx)],
                    *[Line(P(-l / 2, -h / 2 + h * j / ny), P(l / 2, -h / 2 + h * j / ny)) for j in range(1, ny)])
    traits.set_stroke("#2b1608", 3)
    reflets = VGroup(*[Line(P(-l / 2 + l * i / nx + 0.08, -h / 2 + h * (j + 1) / ny - 0.08),
                            P(-l / 2 + l * (i + 1) / nx - 0.08, -h / 2 + h * (j + 1) / ny - 0.08))
                       for i in range(nx) for j in range(ny)]).set_stroke(WHITE, 2, opacity=0.18)
    g = VGroup(corps, traits, reflets)
    g.corps = corps
    if emballage:
        papier = Rectangle(width=l * 0.62 + 0.1, height=h + 0.14, fill_color=emballage, fill_opacity=1,
                           stroke_color="#7f1d1d", stroke_width=3).align_to(corps, RIGHT).shift(RIGHT * 0.05)
        papier.set_y(corps.get_y())
        alu = Rectangle(width=0.1, height=h + 0.06, fill_color="#cbd5e1", fill_opacity=1, stroke_width=0)
        alu.next_to(papier, LEFT, buff=0)
        g.add(alu, papier)
        g.papier = papier
    return g


def etiquette_sur(papier, lignes, fs=26, couleur=WHITE):
    """Les lignes de l'étiquette, posées sur la bande d'emballage (non jouées)."""
    b = VGroup(*[Text(s, font_size=fs, color=couleur, weight=BOLD) for s in lignes]).arrange(DOWN, buff=0.08)
    if b.width > papier.width - 0.2:
        b.scale_to_fit_width(papier.width - 0.2)
    return b.move_to(papier)


def emma(s=1.0):
    """Emma, chocolatière : blouse blanche, toque."""
    p = personne(peau="#f1c27d", tenue="#7c2d12", cheveux="#78350f", longs=True, s=s)
    p.add(blouse(p))
    t = p.tete
    toque = VGroup(RoundedRectangle(width=t.width * 0.9, height=t.height * 0.45, corner_radius=0.08,
                                    fill_color=WHITE, fill_opacity=1, stroke_color="#cbd5e1", stroke_width=2),
                   Circle(radius=t.width * 0.33, fill_color=WHITE, fill_opacity=1, stroke_color="#cbd5e1",
                          stroke_width=2))
    toque[1].next_to(toque[0], UP, buff=-t.height * 0.2)
    toque.next_to(t, UP, buff=-t.height * 0.12)
    p.add(toque)
    return p


def tee_shirt(l=1.7, couleur=COTON, contour="#1e3a8a"):
    """Un tee-shirt vu de face (polygone), largeur l."""
    pts = [(-0.45, 0.75), (-0.16, 0.75), (0, 0.6), (0.16, 0.75), (0.45, 0.75), (0.85, 0.38), (0.65, 0.13),
           (0.45, 0.28), (0.45, -0.78), (-0.45, -0.78), (-0.45, 0.28), (-0.65, 0.13), (-0.85, 0.38)]
    k = l / 1.7
    return Polygon(*[P(x * k, y * k) for x, y in pts], fill_color=couleur, fill_opacity=1, stroke_color=contour,
                   stroke_width=3)


def boisson(s=1.0):
    """Une bouteille de boisson : corps vert d'eau, étiquette, bouchon."""
    corps = RoundedRectangle(width=0.8, height=1.7, corner_radius=0.2, fill_color="#99f6e4", fill_opacity=0.9,
                             stroke_color="#0f766e", stroke_width=3)
    col = Polygon(P(-0.4, 0.75), P(0.4, 0.75), P(0.15, 1.15), P(-0.15, 1.15), fill_color="#99f6e4",
                  fill_opacity=0.9, stroke_color="#0f766e", stroke_width=3)
    bouchon = RoundedRectangle(width=0.36, height=0.2, corner_radius=0.05, fill_color="#f97316", fill_opacity=1,
                               stroke_width=0).move_to(P(0, 1.24))
    bande = Rectangle(width=0.8, height=0.55, fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(P(0, -0.1))
    return VGroup(col, corps, bouchon, bande).scale(s)


def noisette(r=0.16):
    coque = Circle(radius=r, fill_color="#a16207", fill_opacity=1, stroke_color="#713f12", stroke_width=2)
    chapeau = AnnularSector(inner_radius=0, outer_radius=r * 1.05, angle=PI, start_angle=0,
                            fill_color="#65a30d", fill_opacity=1, stroke_width=0).move_to(coque.get_top() + DOWN * r * 0.25)
    return VGroup(coque, chapeau)


def pot(s=1.0):
    """Un pot de pâte à tartiner : verre, pâte brune, couvercle, noisette."""
    verre = RoundedRectangle(width=1.3, height=1.5, corner_radius=0.18, fill_color="#5b3417", fill_opacity=1,
                             stroke_color="#e2e8f0", stroke_width=4)
    couv = RoundedRectangle(width=1.4, height=0.3, corner_radius=0.06, fill_color="#dc2626", fill_opacity=1,
                            stroke_width=0).next_to(verre, UP, buff=0)
    bande = Rectangle(width=1.3, height=0.6, fill_color=WHITE, fill_opacity=1, stroke_width=0).move_to(verre)
    n = noisette(0.17).move_to(bande)
    return VGroup(verre, couv, bande, n).scale(s)


class PropPourcentageLireBase(PaysageProp):
    nom_voix = "6e-prop-pourcentage-lire"
    fichier_marques = "prop_pourcentage_lire_marques.json"
    LIBS = ["Chocolat (g)", "Cacao (g)"]
    X0 = -0.6

    def table(self, vals, centre=None, libs=None, fs=38):
        """Le tableau de proportionnalité (cases vides : valeurs posées au mot)."""
        return TableauProp(libs or self.LIBS, vals, montrer=False, largeur_case=1.6, largeur_libelle=3.2, fs=fs,
                           centre=centre if centre is not None else P(self.X0, 1.0))

    def ligne_c(self, morceaux, y, fs=42, x=None):
        return self.ligne(morceaux, fs).move_to(P(self.X0 if x is None else x, y))

    def ligne_rep(self, i, morceaux, fs=None):
        """Celle de prop_commun, à la taille de la phrase remplacée et bornée à
        droite (surcharge reprise de prop_tableau.py)."""
        lg = super().ligne_rep(i, morceaux, fs)
        ref = self.ph_q[i]
        lg.scale_to_fit_width(ref.width).move_to(ref).align_to(ref, LEFT)
        g = lg.get_left()[0]
        if lg.get_right()[0] > self.BORD_X - 0.05:
            lg.scale_to_fit_width(self.BORD_X - 0.05 - g).align_to(P(g, 0), LEFT)
        return lg

    @staticmethod
    def muet(fl):
        """Étiquette de flèche dite en mots (« deux fois moins ») : ni synchro, ni audit."""
        fl.etiquette._pas_audit = True
        fl.etiquette.sans_synchro = True
        return fl

    def cent_cases(self, valeur, cote=0.5, centre=ORIGIN, couleur=CACAO):
        """Les 100 cases du coach (BarrePourcent, mode cases), vides, sans étiquette."""
        return BarrePourcent(valeur, mode="cases", cote=cote, etiquette=False, couleur=couleur, centre=centre)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Lire un pourcentage", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Lire")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        tab = tablette(3.4, 2.0).move_to(P(-0.4, 0.45))
        self.au_mot("étiquette")
        self.play(FadeIn(tab, shift=UP * 0.2), run_time=0.6)
        self.au_mot("70 % ?")
        et = etiquette_sur(tab.papier, ["70 %"], fs=50, couleur=WHITE)
        q = self.t("?", 90, ORANGE_RETENUE).next_to(tab, RIGHT, buff=0.5)
        self.play(FadeIn(et, scale=1.4), FadeIn(q, scale=0.6), run_time=0.5)
        self.insister(et, 1.25, 0.25)
        self.attendre_voix(marge=0.6)

    # ── 01 : Emma, chocolatière ─────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = emma(1.0).move_to(P(-5.5, -1.0))
        self.au_mot("Voici Emma")
        nom = self.t("Emma", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.25)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("chocolatière")
        met = self.t("chocolatière", 30, BLEU_CALCUL).next_to(pers, DOWN, buff=0.2)
        met.shift(RIGHT * max(0, -6.5 - met.get_left()[0]))
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        tab = tablette(4.4, 2.7).move_to(P(-1.2, 0.7))
        self.au_mot("tablette")
        self.play(FadeIn(tab, shift=UP * 0.2), run_time=0.6)
        nm = etiquette_sur(tab.papier, ["Chocolat", "noir"], fs=34).shift(UP * 0.55)
        self.au_mot("chocolat noir")
        self.play(FadeIn(nm, shift=DOWN * 0.1), run_time=0.4)
        et = etiquette_sur(tab.papier, ["70 %", "de cacao"], fs=38, couleur="#fde68a").shift(DOWN * 0.5)
        self.au_mot("70 % de cacao")
        self.play(FadeIn(et[0], scale=1.4), run_time=0.4)
        self.au_mot("de cacao")
        self.play(FadeIn(et[1], shift=UP * 0.1), run_time=0.3)
        self.insister(et[0], 1.3, 0.25)
        q = self.ligne([("Qu'est-ce que", WHITE), ("ça veut dire ?", ORANGE_RETENUE)], 38)
        q.arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        self.col(q, -2.0, xl=-3.6)
        self.au_mot("Qu'est-ce")
        self.play(FadeIn(q, shift=UP * 0.15), Circumscribe(et, color=ORANGE_RETENUE), run_time=0.8)
        self.attendre_voix()

    # ── 02 : 70 %, c'est 70 sur 100 (les 100 cases) ─────────────────────────
    def ecran_lire(self):
        self.ecran("02-lire")
        pc = self.cent_cases(70, cote=0.5, centre=P(-3.55, -0.1))
        g = pc.grille
        l0 = self.ligne([("70 %", AMBRE), ("=", WHITE), ("70 sur", AMBRE), ("100", AMBRE)], 46)
        self.col(l0, 2.75)
        self.au_mot("70 %")
        self.poser_lignes(l0, "fade", 0.35)
        self.play(Circumscribe(l0, color=AMBRE), run_time=0.6)
        l1 = self.col(self.ligne([("100 g", WHITE), ("de chocolat", WHITE)], 40), 1.55)
        self.au_mot("Sur 100 g")
        self.play(FadeIn(pc, shift=UP * 0.2), FadeIn(l1[0], shift=RIGHT * 0.2), run_time=0.6)
        self.au_mot("de chocolat")
        self.play(FadeIn(l1[1], shift=RIGHT * 0.2), Indicate(g.liste, color=AMBRE, scale_factor=1.03), run_time=0.6)
        l2 = self.col(self.ligne([("→", WHITE), ("70 g", CACAO_T), ("de cacao", CACAO_T)], 40), 0.6)
        self.au_mot("70 g de")
        self.play(FadeIn(l2[:2], shift=RIGHT * 0.2), pc.remplir(1.3), run_time=1.3)
        self.au_mot("de cacao")
        self.play(FadeIn(l2[2], shift=RIGHT * 0.2), run_time=0.3)
        l3 = self.col(self.ligne([("Le reste :", WHITE), ("30 g", SUCRE)], 40), -0.45)
        self.au_mot("Le reste")
        self.play(FadeIn(l3[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("30 g")
        self.play(FadeIn(l3[1], scale=1.3), g.colorier(range(70, 100), couleur=SUCRE, lag=0.03, run_time=0.9),
                  run_time=0.9)
        l4 = self.col(self.t("surtout du sucre", 40, SUCRE), -1.4)
        self.au_mot("surtout")
        self.play(FadeIn(l4, shift=UP * 0.15), run_time=0.4)
        self.attendre_voix()

    # ── 03 : une tablette de 200 g : le tableau ─────────────────────────────
    def ecran_tableau(self):
        self.ecran("03-tableau")
        q = self.ligne([("Une tablette de", WHITE), ("200 g", AMBRE), ("?", WHITE)], 42).move_to(P(self.X0, 3.15))
        self.poser_lignes(q, "fade", 0.3)
        tb = self.table([[100, 200], [70, 140]], centre=P(self.X0, 0.75))
        self.au_mot("tableau")
        self.play(FadeOut(q), FadeIn(tb.fond, shift=UP * 0.2), *[FadeIn(tb.trou(r, c), scale=1.3)
                                                                 for r in range(2) for c in range(2)], run_time=0.6)
        self.au_mot("100 g de")
        self.play(tb.remplir(0, 0), tb.allumer(0, 0), run_time=0.4)
        self.au_mot("70 g de")
        self.play(tb.remplir(1, 0), tb.allumer(1, 0), run_time=0.4)
        self.play(tb.eteindre(0, 0), tb.eteindre(1, 0), run_time=0.3)
        self.au_mot("200 g, c'est")
        self.play(tb.remplir(0, 1), tb.allumer(0, 1), run_time=0.4)
        h = tb.fleche_col(0, 1, "× 2", ligne=0)
        self.au_mot("2 fois")
        self.play(Create(h.fleche), FadeIn(h.etiquette, scale=1.4), run_time=0.5)
        self.insister(h.etiquette, 1.3, 0.2)
        b = tb.fleche_col(0, 1, "× 2", ligne=1)
        lg = self.ligne_c([("70 ×", WHITE), ("2", FLECHE_COL), ("=", WHITE), ("140 g", VERT_OK)], -1.85)
        self.au_mot("70 fois")
        self.play(tb.eteindre(0, 1), tb.allumer(1, 0), Create(b.fleche), FadeIn(lg[0], shift=RIGHT * 0.2),
                  run_time=0.5)
        self.au_mot("2, égale")
        self.play(FadeIn(b.etiquette, scale=1.4), FadeIn(lg[1:3], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("140 g")
        self.play(FadeIn(lg[3], scale=1.3), tb.remplir(1, 1), tb.eteindre(1, 0), run_time=0.4)
        self.play(tb.allumer(1, 1), run_time=0.3)
        self.insister(lg[3], 1.15, 0.2)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (chocolat au lait 30 %) ─────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        tab = tablette(3.6, 2.2, couleur=LAIT, emballage="#1d4ed8").move_to(P(-3.4, 0.4))
        nm = etiquette_sur(tab.papier, ["Chocolat", "au lait"], fs=34)
        deco = VGroup(tab, nm)
        self.add(deco)
        pc = self.cent_cases(30, cote=0.45, centre=P(-3.4, 0.1), couleur=LAIT)

        def apres(sc):
            sc.play(FadeOut(deco), FadeIn(pc), run_time=0.3)
            sc.rep(0, avec=[pc.remplir(0.9)])
            sc.rep_fin()

        self.question_pause("04-question", "04b-reponse",
                            ["Un chocolat au lait", "contient 30 % de cacao.", "Combien de cacao", "dans 100 g ?"],
                            [self.t("70 g", 34), self.t("30 g", 34), self.t("3 g", 34)], 1,
                            ["30 %, c'est 30 sur 100 :", "30 g de cacao dans 100 g."], mot_q="Un chocolat",
                            autres_r=apres)

    # ── 05 : le piège : 70 g, c'est pour 100 g ──────────────────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        tit = self.t("Attention au piège !", 44, ROUGE_ERREUR).move_to(P(self.X0, 3.15))
        self.au_mot("Attention")
        self.play(Write(tit), run_time=0.5)
        l0 = self.ligne_c([("70 % :", AMBRE), ("pas 70 g", ROUGE_ERREUR), ("dans n'importe quelle tablette", WHITE)],
                          2.4, fs=34)
        self.poser_lignes(l0, "fade", 0.3)
        tabs = VGroup(tablette(1.2, 0.75), tablette(2.0, 1.2), tablette(2.8, 1.7)).arrange(RIGHT, buff=0.5,
                                                                                         aligned_edge=DOWN)
        tabs.move_to(P(self.X0, 0.4))
        self.au_mot("quelle tablette")
        self.play(LaggedStart(*[FadeIn(t, shift=UP * 0.2) for t in tabs], lag_ratio=0.25), run_time=0.8)
        tb = self.table([[100, 50], [70, 35]], centre=P(self.X0, 0.05))
        self.au_mot("70 g, c'est")
        self.play(FadeOut(tabs), FadeIn(tb.fond), FadeIn(tb.valeur(1, 0), scale=1.4), tb.allumer(1, 0),
                  run_time=0.4)
        self.au_mot("100 g. Dans")
        self.play(FadeIn(tb.valeur(0, 0), scale=1.4), tb.allumer(0, 0), run_time=0.4)
        self.play(tb.eteindre(0, 0), tb.eteindre(1, 0), run_time=0.3)
        self.au_mot("50 g")
        self.play(FadeIn(tb.valeur(0, 1), scale=1.4), FadeIn(tb.trou(1, 1), scale=1.3), tb.allumer(0, 1),
                  run_time=0.4)
        h = self.muet(tb.fleche_col(0, 1, "÷ 2", ligne=0))
        self.au_mot("deux fois moins")
        self.play(Create(h.fleche), FadeIn(h.etiquette, scale=1.4), run_time=0.5)
        b = tb.fleche_col(0, 1, "÷ 2", ligne=1)
        lg = self.ligne_c([("70 ÷", WHITE), ("2", FLECHE_COL), ("=", WHITE), ("35 g", VERT_OK)], -2.65)
        self.au_mot("70 divisé")
        self.play(tb.eteindre(0, 1), tb.allumer(1, 0), Create(b.fleche), FadeIn(lg[0], shift=RIGHT * 0.2),
                  run_time=0.4)
        self.au_mot("par 2")
        self.play(FadeIn(b.etiquette, scale=1.4), FadeIn(lg[1:3], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("35 g")
        self.play(FadeIn(lg[3], scale=1.3), tb.remplir(1, 1), tb.eteindre(1, 0), run_time=0.4)
        self.play(tb.allumer(1, 1), run_time=0.3)
        self.insister(lg[3], 1.15, 0.2)
        self.attendre_voix()

    # ── 06 : 100 % et 0 % ───────────────────────────────────────────────────
    def ecran_autres(self):
        self.ecran("06-autres")
        tit = self.t("Les pourcentages sont partout", 44, JAUNE_TITRE).move_to(P(-0.3, 3.15))
        self.au_mot("pourcentages")
        self.play(Write(tit), run_time=0.6)
        ts = tee_shirt(2.0).move_to(P(-5.0, 1.0))
        g1 = self.cent_cases(100, cote=0.21, centre=P(-2.45, 1.0), couleur=COTON)
        self.au_mot("tee-shirt")
        self.play(FadeIn(ts, shift=UP * 0.2), FadeIn(g1), run_time=0.5)
        e1 = self.ligne([("100 %", AMBRE), ("coton", COTON)], 40).move_to(P(-3.75, -0.85))
        self.au_mot("100 % coton")
        self.play(FadeIn(e1[0], scale=1.4), run_time=0.35)
        self.au_mot("coton. Tout")
        self.play(FadeIn(e1[1], shift=RIGHT * 0.15), run_time=0.3)
        p1 = self.t("Tout est en coton.", 34).move_to(P(-3.75, -1.75))
        self.au_mot("Tout est")
        self.play(FadeIn(p1, shift=UP * 0.15), g1.remplir(1.0), run_time=1.0)
        bo = boisson(1.0).move_to(P(1.3, 1.0))
        g2 = self.cent_cases(0, cote=0.21, centre=P(3.85, 1.0), couleur=SUCRE)
        self.au_mot("boisson")
        self.play(FadeIn(bo, shift=UP * 0.2), FadeIn(g2), run_time=0.5)
        e2 = self.ligne([("0 %", AMBRE), ("de sucre ajouté", SUCRE)], 40).move_to(P(2.6, -0.85))
        self.au_mot("0 % de sucre")
        self.play(FadeIn(e2[0], scale=1.4), run_time=0.35)
        self.au_mot("de sucre ajouté")
        self.play(FadeIn(e2[1], shift=RIGHT * 0.15), run_time=0.3)
        p2 = self.t("On n'a ajouté aucun sucre.", 34).move_to(P(2.6, -1.75))
        self.au_mot("On n'a")
        self.play(FadeIn(p2, shift=UP * 0.15), Circumscribe(g2, color=SUCRE, buff=0.08),
                  run_time=0.6)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (pâte à tartiner 20 %, pot de 200 g) ────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        deco = pot(1.6).move_to(P(-3.4, 0.4))
        self.add(deco)
        tb = TableauProp(["Pâte (g)", "Noisettes (g)"], [[100, 200], [20, 40]], montrer=False, largeur_case=1.4,
                         largeur_libelle=2.8, fs=36, centre=P(-3.25, 0.3))

        def apres(sc):
            l0 = sc.ligne_rep(0, ["20 g pour", "100 g.", "200 g, c'est"])
            l1 = sc.ligne_rep(1, ["2 fois plus :", "40 g de noisettes."])
            for m in [*l0, *l1]:
                m.sans_synchro = True  # chaque morceau est posé AU MOT ci-dessous
            h = tb.fleche_col(0, 1, "× 2", ligne=0)
            b = self.muet(tb.fleche_col(0, 1, "× 2", ligne=1))
            sc.au_mot("20 g pour")
            sc.play(FadeOut(deco), FadeIn(tb.fond), FadeIn(tb.valeur(1, 0), scale=1.4),
                    FadeIn(l0[0], shift=UP * 0.12), run_time=0.3)
            sc.au_mot("100 g. 200")
            sc.play(FadeIn(tb.valeur(0, 0), scale=1.4), FadeIn(l0[1], shift=UP * 0.12), run_time=0.3)
            sc.au_mot("200 g, c'est")
            sc.play(FadeIn(tb.valeur(0, 1), scale=1.4), FadeIn(tb.trou(1, 1), scale=1.3),
                    FadeIn(l0[2], shift=UP * 0.12), run_time=0.3)
            sc.au_mot("2 fois")
            sc.play(Create(h.fleche), FadeIn(h.etiquette, scale=1.4), Create(b.fleche), FadeIn(b.etiquette),
                    FadeIn(l1[0], shift=UP * 0.12), run_time=0.4)
            sc.au_mot("40 g")
            sc.play(tb.remplir(1, 1), FadeIn(l1[1], scale=1.2), run_time=0.35)
            sc.play(tb.allumer(1, 1), run_time=0.3)
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse",
                            ["Une pâte à tartiner", "contient 20 % de noisettes.",
                             "Combien de noisettes", "dans un pot de 200 g ?"],
                            [self.t("20 g", 34), self.t("220 g", 34), self.t("40 g", 34)], 2,
                            ["20 g pour 100 g. 200 g, c'est", "2 fois plus : 40 g de noisettes."],
                            mot_q="Une pâte", autres_r=apres)

    # ── 08 : défi : 80 %, tablette de 300 g ─────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        self.play(Write(tit), run_time=0.6)
        pers = emma(0.95).move_to(P(-5.55, -1.0))
        tab = tablette(3.4, 2.1, emballage="#047857").move_to(P(-2.3, 0.8))
        self.au_mot("Emma")
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(tab, shift=UP * 0.2), run_time=0.6)
        l1 = self.col(self.ligne([("Un chocolat à", WHITE), ("80 %", AMBRE), ("de cacao.", WHITE)], 38), 1.75, xl=-0.1)
        et = etiquette_sur(tab.papier, ["80 %"], fs=48, couleur="#fde68a")
        self.au_mot("chocolat à")
        self.play(FadeIn(l1[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("80 %")
        self.play(FadeIn(l1[1], scale=1.3), FadeIn(et, scale=1.4), run_time=0.4)
        self.au_mot("de cacao")
        self.play(FadeIn(l1[2], shift=RIGHT * 0.2), run_time=0.3)
        l2 = self.col(self.t("Combien de cacao", 40, ORANGE_RETENUE), 0.85, xl=-0.1)
        self.au_mot("Combien")
        self.play(FadeIn(l2, shift=RIGHT * 0.2), run_time=0.4)
        l3 = self.col(self.ligne([("pour une tablette de", WHITE), ("300 g ?", AMBRE)], 38), -0.05, xl=-0.1)
        self.au_mot("pour une")
        self.play(FadeIn(l3[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("300 g")
        self.play(FadeIn(l3[1], scale=1.3), tab.animate.scale(1.12), run_time=0.4)
        self.play(Indicate(l3[1], color=AMBRE, scale_factor=1.08), run_time=0.5)
        self.pause_defi(y=-1.2)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.15))
        self.play(Write(tit), run_time=0.5)
        tb = self.table([[100, 300], [80, 240]], centre=P(self.X0, 0.6))
        self.play(FadeIn(tb.fond), *[FadeIn(tb.trou(r, c)) for r in range(2) for c in range(2)], run_time=0.4)
        self.au_mot("80 g de")
        self.play(tb.remplir(1, 0), tb.allumer(1, 0), run_time=0.4)
        self.au_mot("100 g. 300")
        self.play(tb.remplir(0, 0), tb.allumer(0, 0), run_time=0.4)
        self.play(tb.eteindre(0, 0), tb.eteindre(1, 0), run_time=0.3)
        self.au_mot("300 g, c'est")
        self.play(tb.remplir(0, 1), tb.allumer(0, 1), run_time=0.4)
        h = tb.fleche_col(0, 1, "× 3", ligne=0)
        self.au_mot("3 fois")
        self.play(Create(h.fleche), FadeIn(h.etiquette, scale=1.4), run_time=0.5)
        self.insister(h.etiquette, 1.3, 0.2)
        b = tb.fleche_col(0, 1, "× 3", ligne=1)
        lg = self.ligne_c([("80 ×", WHITE), ("3", FLECHE_COL), ("=", WHITE), ("240 g", VERT_OK),
                           ("de cacao", VERT_OK)], -2.15)
        self.au_mot("80 fois")
        self.play(tb.eteindre(0, 1), tb.allumer(1, 0), Create(b.fleche), FadeIn(lg[0], shift=RIGHT * 0.2),
                  run_time=0.5)
        self.au_mot("3, égale")
        self.play(FadeIn(b.etiquette, scale=1.4), FadeIn(lg[1:3], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("240 g")
        self.play(FadeIn(lg[3], scale=1.3), tb.remplir(1, 1), tb.eteindre(1, 0), run_time=0.4)
        self.au_mot("de cacao.")
        self.play(FadeIn(lg[4], shift=RIGHT * 0.2), tb.allumer(1, 1), run_time=0.3)
        self.play(Create(self.encadrer(lg[3:])), run_time=0.4)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        pc = self.cent_cases(70, cote=0.27)
        for i in range(70):
            pc.grille.liste[i].set_fill(CACAO, 1)
        for i in range(70, 100):
            pc.grille.liste[i].set_fill(SUCRE, 1)
        tb = self.table([[100, 200], [70, 140]])
        textes = VGroup()
        for r in range(2):
            for c in range(2):
                textes.add(tb.valeur(r, c))
        fig = VGroup(pc, VGroup(tb.fond, textes, tb.fleche_col(0, 1, "× 2", ligne=0),
                                tb.fleche_col(0, 1, "× 2", ligne=1))).arrange(DOWN, buff=0.3)
        for t in fig.get_family():
            if isinstance(t, Text):
                t._pas_audit = t.sans_synchro = True
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Lire un pourcentage :", "70 %, c'est 70 pour 100."),
            ("Pour une autre quantité,", "on complète un tableau", "de proportionnalité.")], fs=36)
        self.au_mot("Lire un")
        self.montrer_ligne(lignes[0], Indicate(pc, color=AMBRE, scale_factor=1.04))
        self.au_mot("Pour une autre")
        self.montrer_ligne(lignes[1], Indicate(fig[1], color=FLECHE_COL, scale_factor=1.04))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_lire()
        self.ecran_tableau()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_autres()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class PropPourcentageLire6e(PropPourcentageLireBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
