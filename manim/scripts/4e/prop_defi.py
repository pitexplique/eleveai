# prop_defi.py
# EleveAI — Maths 4e — série « Proportionnalité », lot 5 (une paysage par
# micro), épisode 27 : DÉFIS SUR LA PROPORTIONNALITÉ (micro du coach :
# prop_defi, notion prop_proportionnalite), AVEC VOIX. Paysage 16:9, CEINTURE
# VERTE. PAYSAGE SEULEMENT (le short 4e-prop-proportionnalite-short-defi existe).
# ⭐ Méthodes travaillées : vérifier D'ABORD si c'est proportionnel (les niveaux
# du jeu : × 2 en haut, × 4 en bas, « Pas proportionnel ») ; le PASSAGE À
# L'UNITÉ (5 min → 1 min → 12 min) ; le COEFFICIENT entre colonnes (× 2,5) ;
# ADDITIONNER DES MORCEAUX (4 min + 20 s, « + » en haut et en bas du tableau) ;
# COMPARER deux offres en ramenant à la même quantité (pour 1 €). Pas de produit
# en croix (réservé à l'épisode 24) ; « ÷ » écrit, jamais 5/2.
# ⭐ Fil rouge (erreur 2) : CROIRE TOUT PROPORTIONNEL (les niveaux, écran 04 ;
# le gros pack, écran 07 : « plus gros = plus avantageux » barré). Leurres :
# question 1, 454 = 450 + 4 (erreur 1, ajouter) et 1 350 = 450 × 3 ; question 2,
# 10 € = 5 × 2 (erreur 3, inverser : doubler au lieu de prendre la moitié).
#
# Décor et métier : Kenza, GAME DESIGNER (son écran de jeu, sa manette, la
# balance du « jeu juste », la boutique et ses packs, le boss).
# Centres d'intérêt : jeux-video.
# Chiffres : tous inventés (XP, pièces, prix des packs) ; aucun fait réel cité,
# pas de source à recopier.
#
# Écrans : 00 garde · 01 Kenza game designer · 02 défi 1, les XP (unité 5 → 1
# → 12) · 03 QUESTION 1 (3 quêtes → 7 quêtes) · 04 défi 2, les niveaux (pas
# proportionnel) · 05 défi 3, la boutique (× 2,5) · 06 QUESTION 2 (400 pièces)
# · 07 le piège des packs (pour 1 €) · 08 défi du boss · 08b correction
# (4 min + 20 s) · 09 ce que tu as appris · 10 fin.
#
# Voix : manim/voix/4e-prop-defi.json (validée par Frédéric le 01/11, débit
# −10), WAV dans public/sons/4e-prop-defi/ ; marques mot à mot :
# manim/scripts/4e/prop_defi_marques.json (scripts/marques_dump.ps1 puis le
# convertisseur « une marque par occurrence »).
# Outils : manim/scripts/6e/prop_commun.py + manim/canvas_proportion.py (non
# modifiés) ; base PropTableauBase de manim/scripts/4e/prop_tableau.py
# (épisode 21 : ligne_rep bornée, lc, jouer, _disposer_q coche loin du texte,
# choix non audités à la réponse) ; piece() et coffre() de
# manim/scripts/6e/prop_tableau.py. Ajouté ICI : kenza(), manette(),
# badge_xp(), console(), balance(), pack(), boss().
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/prop_defi.py PropDefi4e
# PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/4e/prop_defi.py PropDefi4e -o eleveai-maths-4e-prop-defi --media_dir manim/media-prop-4e-27
# Sortie : manim/sorties/4e/maths/proportionnalite/27-defi/eleveai-maths-4e-prop-defi.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

import importlib.util  # noqa: E402

from prop_commun import *  # noqa: E402,F403


def _charger(nom, chemin):
    spec = importlib.util.spec_from_file_location(nom, chemin)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_ICI = Path(__file__).resolve().parent
_t4 = _charger("prop_tableau_4e", _ICI / "prop_tableau.py")    # épisode 21 (4e)
PropTableauBase4e, plus_bas = _t4.PropTableauBase, _t4.plus_bas
piece, coffre, OR = _t4._p6.piece, _t4._p6.coffre, _t4._p6.OR

JEU = "#8b5cf6"        # le violet du jeu de Kenza
JEU_F = "#5b21b6"
XP_C = "#22d3ee"       # les XP (cyan)
PIECE_C = "#facc15"    # les pièces (or)


def manette(s=1.0, couleur=JEU):
    """Une manette de jeu : corps arrondi, croix, deux boutons."""
    corps = RoundedRectangle(width=1.3, height=0.62, corner_radius=0.28, fill_color=couleur, fill_opacity=1,
                             stroke_color=JEU_F, stroke_width=3)
    croix_d = VGroup(Rectangle(width=0.3, height=0.09), Rectangle(width=0.09, height=0.3)).set_fill(
        WHITE, 1).set_stroke(width=0).move_to(corps.get_center() + P(-0.35, 0))
    bts = VGroup(*[Circle(radius=0.07, fill_color=c, fill_opacity=1, stroke_width=0).move_to(
        corps.get_center() + d) for c, d in (("#f43f5e", P(0.3, 0.08)), ("#22c55e", P(0.45, -0.07)))])
    return VGroup(corps, croix_d, bts).scale(s)


def badge_xp(s=1.0):
    """L'insigne des XP : une étoile cyan (sans texte)."""
    e = Star(5, outer_radius=0.42, inner_radius=0.19, fill_color=XP_C, fill_opacity=1, stroke_color="#0e7490",
             stroke_width=3)
    return VGroup(e).scale(s)


def tas_pieces(n=3, s=1.0):
    """Une petite pile de pièces d'or."""
    g = VGroup(*[piece(0.2).shift(UP * 0.09 * i + RIGHT * 0.03 * (i % 2)) for i in range(n)])
    return g.scale(s)


def kenza(s=1.0):
    """Kenza, game designer : sweat violet, casque audio, manette en main."""
    p = personne(peau="#a0673a", tenue=JEU, cheveux="#111827", longs=True)
    p.add(casque_audio(p))
    p.add(manette(0.55).move_to(p.corps.get_center() + P(0.15, -0.25)))
    return p.scale(s)


def console(l=3.4, h=2.1):
    """L'écran de jeu de Kenza : cadre sombre, ciel, sol, héros, drapeau de quête."""
    cadre = RoundedRectangle(width=l + 0.25, height=h + 0.25, corner_radius=0.15, fill_color="#1f2937",
                             fill_opacity=1, stroke_color="#475569", stroke_width=3)
    ciel = Rectangle(width=l, height=h, fill_color="#1e1b4b", fill_opacity=1, stroke_width=0)
    sol = Rectangle(width=l, height=h * 0.25, fill_color="#15803d", fill_opacity=1, stroke_width=0).align_to(
        ciel, DOWN)
    heros = VGroup(Square(0.32, fill_color="#f97316", fill_opacity=1, stroke_width=0),
                   Square(0.2, fill_color="#fde68a", fill_opacity=1, stroke_width=0).shift(UP * 0.26))
    heros.next_to(sol, UP, buff=0).shift(LEFT * l * 0.28)
    mat = Line(P(0, 0), P(0, 0.75), color=GREY_B, stroke_width=4)
    dra = Polygon(P(0, 0.75), P(0.38, 0.62), P(0, 0.48), fill_color="#f43f5e", fill_opacity=1, stroke_width=0)
    drapeau = VGroup(mat, dra).next_to(sol, UP, buff=0).shift(RIGHT * l * 0.3)
    etoiles = VGroup(*[Dot(P(x, y), radius=0.03, color=WHITE) for x, y in
                       ((-1.2, 0.7), (-0.4, 0.85), (0.5, 0.6), (1.3, 0.8), (0.1, 0.35))]).move_to(ciel).shift(UP * 0.3)
    g = VGroup(cadre, ciel, sol, etoiles, heros, drapeau)
    g.heros = heros
    return g


def balance(s=1.0):
    """Une balance à deux plateaux, bien horizontale (le jeu « juste »)."""
    pied = Polygon(P(-0.5, -1.0), P(0.5, -1.0), P(0, -0.75), fill_color=GREY_B, fill_opacity=1, stroke_width=0)
    mat = Line(P(0, -0.75), P(0, 0.5), color=GREY_B, stroke_width=6)
    fleau = Line(P(-1.3, 0.5), P(1.3, 0.5), color=GREY_B, stroke_width=6)
    g = VGroup(pied, mat, fleau)
    plats = VGroup()
    for x in (-1.3, 1.3):
        fils = VGroup(Line(P(x, 0.5), P(x - 0.35, -0.15)), Line(P(x, 0.5), P(x + 0.35, -0.15))).set_stroke(
            GREY_B, 3)
        plat = Arc(radius=0.42, start_angle=PI, angle=PI, color=GREY_B, stroke_width=5).move_to(P(x, -0.25))
        plats.add(VGroup(fils, plat))
    g.add(plats)
    g.plats = plats
    return g.scale(s)


def pack(s=1.0, n=3, couleur=JEU):
    """Un pack de la boutique : un coffre posé sur un socle violet, des pièces au-dessus."""
    socle = RoundedRectangle(width=1.25, height=0.22, corner_radius=0.08, fill_color=couleur, fill_opacity=1,
                             stroke_width=0)
    cf = coffre(1.0).next_to(socle, UP, buff=0)
    tas = VGroup(*[tas_pieces(2 + (i % 2), 0.8).move_to(cf.get_top() + P(-0.3 + 0.3 * i, 0.12 + 0.05 * (i % 2)))
                   for i in range(n)])
    return VGroup(socle, cf, tas).scale(s)


def boss(s=1.0):
    """Le boss du jeu : un gros monstre rouge à cornes, sa barre de vie."""
    corps = Ellipse(width=1.9, height=1.6, fill_color="#b91c1c", fill_opacity=1, stroke_color="#7f1d1d",
                    stroke_width=4)
    cornes = VGroup(*[Polygon(P(x, 0.55), P(x + 0.25 * d, 0.55), P(x + 0.32 * d, 1.05), fill_color="#fde68a",
                              fill_opacity=1, stroke_width=0) for x, d in ((-0.55, -1), (0.55, 1))])
    yeux = VGroup(*[VGroup(Circle(radius=0.17, fill_color=WHITE, fill_opacity=1, stroke_width=0),
                           Circle(radius=0.08, fill_color="#111827", fill_opacity=1, stroke_width=0))
                    .move_to(P(x, 0.2)) for x in (-0.35, 0.35)])
    bouche = VGroup(*[Polygon(P(x, -0.25), P(x + 0.18, -0.25), P(x + 0.09, -0.45), fill_color=WHITE,
                              fill_opacity=1, stroke_width=0) for x in (-0.45, -0.18, 0.09, 0.36)])
    vie = VGroup(RoundedRectangle(width=1.8, height=0.22, corner_radius=0.08, fill_color="#334155", fill_opacity=1,
                                  stroke_width=0),
                 RoundedRectangle(width=1.4, height=0.16, corner_radius=0.06, fill_color="#22c55e", fill_opacity=1,
                                  stroke_width=0)).move_to(P(0, 1.35))
    vie[1].align_to(vie[0], LEFT).shift(RIGHT * 0.03)
    return VGroup(cornes, corps, yeux, bouche, vie).scale(s)


class PropDefiBase(PropTableauBase4e):
    nom_voix = "4e-prop-defi"
    fichier_marques = "prop_defi_marques.json"
    LIBS = ["Temps (min)", "XP"]
    VALS = [[5, 1, 12], [150, 30, 360]]
    X0 = -1.2

    def table_p(self, libs, vals, centre, lc=1.6, ll=3.0, fs=38):
        return TableauProp(libs, vals, montrer=False, largeur_case=lc, largeur_libelle=ll, hauteur=0.9, fs=fs,
                           centre=centre)

    def titre_haut(self, s, mot, couleur=JAUNE_TITRE, fs=42, x=-0.4):
        self.au_mot(mot)
        tit = self.t(s, fs, couleur).move_to(P(x, 3.1))
        self.play(Write(tit), run_time=0.5)
        return tit

    @staticmethod
    def sans(*ms):
        """Rappels déjà dits (ou dits en mots) : ni attente ni audit."""
        for m in ms:
            for f in m.get_family():
                f._pas_audit = f.sans_synchro = True
        return ms[0] if len(ms) == 1 else ms

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Défis sur la proportionnalité", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Défis")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        tb = TableauProp(["Temps (min)", "XP"], [["?", "?"], ["?", "?"]], montrer=True, largeur_case=1.2,
                         largeur_libelle=2.6, hauteur=0.75, fs=34, centre=P(-0.4, 0.35))
        self.play(FadeIn(tb, shift=UP * 0.2), run_time=0.5)
        self.au_mot("Le jeu")
        g = VGroup(manette(1.1), badge_xp(1.0)).arrange(DOWN, buff=0.35).move_to(P(-5.2, 0.35))
        d = pack(1.2).move_to(P(4.6, 0.35))
        nom = self.t("Le jeu de Kenza", 34, AMBRE).next_to(tb, DOWN, buff=0.3)
        self.play(FadeIn(g, scale=0.7), FadeIn(d, shift=LEFT * 0.2), FadeIn(nom, shift=UP * 0.15), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : Kenza, game designer ───────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = kenza(1.0).move_to(P(-5.5, -0.9))
        self.au_mot("Voici Kenza")
        nom = self.t("Kenza", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.3)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("game designer")
        met = self.t("game designer", 30, BLEU_CALCUL).next_to(pers, DOWN, buff=0.15)
        met.shift(RIGHT * max(0, -6.4 - met.get_left()[0]))
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        ec = console(3.4, 2.1).move_to(P(-1.0, 1.55))
        self.au_mot("elle invente")
        self.play(FadeIn(ec, scale=0.8), run_time=0.5)
        self.au_mot("jeu vidéo")
        self.play(ec.heros.animate.shift(UP * 0.5), rate_func=there_and_back, run_time=0.6)
        bx = badge_xp(0.8).move_to(P(2.2, 2.2))
        lx = self.t("XP", 44, XP_C).next_to(bx, RIGHT, buff=0.25)
        px = self.t("points d'expérience", 28, XP_C).next_to(VGroup(bx, lx), DOWN, buff=0.15).align_to(bx, LEFT)
        self.au_mot("points d'expérience")
        self.play(FadeIn(bx, scale=0.6), FadeIn(px, shift=RIGHT * 0.2), run_time=0.5)
        self.au_mot("les XP")
        self.play(FadeIn(lx, scale=1.3), run_time=0.4)
        tp = tas_pieces(3, 1.4).move_to(P(2.2, 0.45))
        lp = self.t("pièces d'or", 36, PIECE_C).next_to(tp, RIGHT, buff=0.3)
        self.au_mot("pièces d'or")
        self.play(FadeIn(tp, shift=DOWN * 0.2), FadeIn(lp, shift=RIGHT * 0.2), run_time=0.5)
        bal = balance(0.75).move_to(P(-1.0, -1.75))
        self.au_mot("tout régler")
        self.play(FadeIn(bal, shift=UP * 0.2), run_time=0.5)
        sur = VGroup(badge_xp(0.45).next_to(bal.plats[0][1], UP, buff=0.02),
                     tas_pieces(2, 0.9).next_to(bal.plats[1][1], UP, buff=0.02))
        self.play(FadeIn(sur, shift=DOWN * 0.2), run_time=0.4)
        jj = self.t("Un jeu juste", 38, VERT_OK).move_to(P(2.6, -1.75))
        self.au_mot("soit juste")
        self.play(FadeIn(jj, scale=1.2), run_time=0.4)
        self.play(Circumscribe(jj, color=VERT_OK, buff=0.12), run_time=0.8)
        self.attendre_voix()

    # ── 02 : défi 1, les XP d'une quête (5 min → 1 min → 12 min) ───────────
    def ecran_xp(self):
        self.ecran("02-xp")
        self.titre_haut("Défi 1 : les XP des quêtes", "1. Une")
        xc = -1.6
        tb = self.table_p(self.LIBS, self.VALS, P(xc, 0.55), lc=1.4, ll=2.6)
        self.au_mot("Une quête")
        self.play(FadeIn(tb.fond, shift=UP * 0.2), run_time=0.5)
        self.au_mot("5 minutes")
        self.play(FadeIn(tb.valeur(0, 0), scale=1.4), run_time=0.35)
        self.au_mot("150 XP")
        self.play(FadeIn(tb.valeur(1, 0), scale=1.4), run_time=0.35)
        v = self.tampon("Proportionnel", VERT_OK, 32).move_to(P(4.4, 0.55))
        self.au_mot("proportionnels")
        self.play(FadeIn(v, scale=1.3), run_time=0.45)
        self.au_mot("12 minutes")
        self.play(FadeIn(tb.valeur(0, 2), scale=1.4), FadeIn(tb.trou(1, 2), scale=1.3), run_time=0.4)
        h1, b1 = tb.fleche_col(0, 1, "÷ 5", ligne=0), tb.fleche_col(0, 1, "÷ 5", ligne=1)
        h2, b2 = tb.fleche_col(1, 2, "× 12", ligne=0), tb.fleche_col(1, 2, "× 12", ligne=1)
        L1 = self.lc([("1 min :", WHITE), ("150 ÷", WHITE), ("5 =", FLECHE_COL), ("30 XP", VERT_OK)], -1.75,
                     fs=40, x=xc)
        self.jouer(L1, ["1 minute", "150 divisé", "par 5", "30 XP"],
                   extra={0: [FadeIn(tb.valeur(0, 1), scale=1.4)],
                          2: [Create(h1.fleche), FadeIn(h1.etiquette), Create(b1.fleche), FadeIn(b1.etiquette)],
                          3: [FadeIn(tb.valeur(1, 1), scale=1.4)]})
        L2 = self.lc([("12 min :", WHITE), ("30 ×", WHITE), ("12 =", FLECHE_COL), ("360 XP", VERT_OK)], -2.7,
                     fs=40, x=xc)
        self.jouer(L2, [("12 minutes", 2), "30 fois", "12, égale", "360 XP"],
                   extra={2: [Create(h2.fleche), FadeIn(h2.etiquette), Create(b2.fleche), FadeIn(b2.etiquette)],
                          3: [tb.remplir(1, 2, 360)]})
        self.play(tb.allumer(1, 2), run_time=0.3)
        self.insister(L2[3], 1.15, 0.2)
        self.attendre_voix()

    # ── 03 : QUESTION 1 (3 quêtes → 450 pièces ; 7 quêtes ?) ────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        deco = VGroup(kenza(0.9).move_to(P(-5.6, -1.0)), coffre(1.6).move_to(P(-2.8, 0.4)))
        self.add(deco)
        tb = self.table_p(["Quêtes", "Pièces"], [[3, 1, 7], [450, 150, 1050]], P(-3.55, 0.9), lc=1.15, ll=1.95,
                          fs=34)

        def apres(sc):
            connus = self.sans(tb.valeur(0, 0), tb.valeur(1, 0))  # données de la question, relues
            sc.play(FadeOut(deco), FadeIn(tb.fond), FadeIn(VGroup(*connus)), run_time=0.15)
            l0 = sc.ligne_rep(0, ["450 ÷", "3 =", "150 pièces."])
            l1 = sc.ligne_rep(1, ["150 ×", "7 =", "1 050 pièces."])
            sc.au_mot("1 quête")
            sc.play(FadeIn(tb.valeur(0, 1), scale=1.4), tb.allumer(0, 1), run_time=0.3)
            sc.au_mot("450 divisé")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("par 3")
            sc.play(FadeIn(l0[1], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("150 pièces")
            sc.play(FadeIn(l0[2], scale=1.3), FadeIn(tb.valeur(1, 1), scale=1.4), tb.eteindre(0, 1), run_time=0.3)
            sc.au_mot("7 quêtes")
            sc.play(FadeIn(tb.valeur(0, 2), scale=1.4), tb.allumer(0, 2), run_time=0.3)
            sc.au_mot("150 fois")
            sc.play(FadeIn(l1[0], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("7, égale")
            sc.play(FadeIn(l1[1], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("1 050 pièces")
            sc.play(FadeIn(l1[2], scale=1.3), FadeIn(tb.valeur(1, 2), scale=1.4), tb.eteindre(0, 2), run_time=0.4)
            sc.play(tb.allumer(1, 2), run_time=0.3)
            sc.rep_fini()

        self.question_pause("03-question", "03b-reponse",
                            ["3 quêtes : 450 pièces.", "Combien pour 7 quêtes ?"],
                            [self.t("454 pièces", 34), self.t("1 050 pièces", 34), self.t("1 350 pièces", 34)], 1,
                            ["450 ÷ 3 = 150 pièces.", "150 × 7 = 1 050 pièces."],
                            mot_q="3 quêtes", autres_r=apres)

    # ── 04 : défi 2, les niveaux (× 2 en haut, × 4 en bas : pas proportionnel)
    def ecran_niveaux(self):
        self.ecran("04-niveaux")
        self.titre_haut("Défi 2 : les niveaux", "2. Pour")
        xc = -2.2
        tb = self.table_p(["Niveau", "XP"], [[2, 3, 4], [100, 200, 400]], P(xc, 0.35), lc=1.5, ll=2.4)
        self.play(FadeIn(tb.fond, shift=UP * 0.2), run_time=0.4)
        base = -0.95
        barres = VGroup(*[Rectangle(width=0.62, height=h, fill_color=XP_C, fill_opacity=0.9, stroke_color="#0e7490",
                                    stroke_width=3).move_to(P(x, base + h / 2))
                          for x, h in ((3.0, 0.55), (3.95, 1.1), (4.9, 2.2))])
        sol = Line(P(2.45, base), P(5.45, base), color=GREY_B, stroke_width=4)
        noms = VGroup(*[self.t(f"{n}", 28, GREY_A).next_to(b, DOWN, buff=0.2) for n, b in zip((2, 3, 4), barres)])
        self.sans(noms)
        for k, (mn, mx) in enumerate((("2, il", "100 XP"), ("3, 200", "200 XP"), ("4, 400", "400 XP"))):
            self.au_mot(mn)
            extra = [FadeIn(sol), FadeIn(noms)] if k == 0 else []
            self.play(FadeIn(tb.valeur(0, k), scale=1.4), *extra, run_time=0.35)
            self.au_mot(mx)
            self.play(FadeIn(tb.valeur(1, k), scale=1.4), GrowFromEdge(barres[k], DOWN), run_time=0.4)
        q = self.t("Proportionnel ?", 38, AMBRE).move_to(P(xc, -2.5))
        self.au_mot("Est-ce proportionnel")
        self.play(FadeIn(q, scale=1.2), run_time=0.4)
        h = self.muet(tb.fleche_col(0, 2, "× 2", ligne=0))
        self.au_mot("le numéro double")
        self.play(Create(h.fleche), FadeIn(h.etiquette, scale=1.3), tb.allumer(0, 0), tb.allumer(0, 2), run_time=0.5)
        b = tb.fleche_col(0, 2, "× 4", ligne=1, couleur=ROUGE_ERREUR)
        self.au_mot("multipliés par 4")
        self.play(Create(b.fleche), tb.eteindre(0, 0), tb.eteindre(0, 2), tb.allumer(1, 0), tb.allumer(1, 2),
                  run_time=0.5)
        self.au_mot("4. Ce")
        self.play(FadeIn(b.etiquette, scale=1.3), run_time=0.3)
        v = self.tampon("Pas proportionnel", ROUGE_ERREUR, 38).move_to(q)
        self.au_mot("Ce n'est pas")
        self.play(FadeOut(q), FadeIn(v, scale=1.3), run_time=0.45)
        self.insister(v, 1.08, 0.25)
        fls = VGroup()
        for i in (0, 1):
            a, c = barres[i].get_top() + UP * 0.1, barres[i + 1].get_top() + UP * 0.1
            f = CurvedArrow(a, c, angle=-PI / 3, color=AMBRE, stroke_width=4, tip_length=0.16)
            fls.add(VGroup(f))
        dbl = self.t("× 2 à chaque niveau", 28, AMBRE).move_to(P(3.95, 1.85))
        self.sans(fls, dbl)
        self.au_mot("le double du")
        self.play(LaggedStart(*[Create(g[0]) for g in fls], lag_ratio=0.5), FadeIn(dbl, shift=DOWN * 0.15),
                  run_time=0.8)
        self.attendre_voix()

    # ── 05 : défi 3, la boutique (800 pièces → 5 € ; 2 000 pièces ?) ───────
    def ecran_boutique(self):
        self.ecran("05-boutique")
        self.titre_haut("Défi 3 : la boutique du jeu", "3. Dans")
        xc = -1.6
        tb = self.table_p(["Pièces", "Prix (€)"], [[800, 2000], [5, "12,50"]], P(xc, 0.55), lc=1.8, ll=2.6)
        pk = pack(1.1).move_to(P(4.4, 1.3))
        self.au_mot("la boutique")
        self.play(FadeIn(tb.fond, shift=UP * 0.2), FadeIn(pk, scale=0.7), run_time=0.5)
        self.au_mot("800 pièces")
        self.play(FadeIn(tb.valeur(0, 0), scale=1.4), run_time=0.35)
        self.au_mot("5 euros")
        self.play(FadeIn(tb.valeur(1, 0), scale=1.4), run_time=0.35)
        billet = VGroup(RoundedRectangle(width=1.5, height=0.8, corner_radius=0.08, fill_color="#16a34a",
                                         fill_opacity=1, stroke_color="#14532d", stroke_width=3),
                        Text("€", font_size=40, color=WHITE, weight=BOLD)).move_to(P(4.4, -0.35))
        ev = self.t("en vrai", 30, VERT_OK).next_to(billet, DOWN, buff=0.15)
        self.au_mot("en vrai")
        self.play(FadeIn(billet, shift=UP * 0.2), FadeIn(ev), run_time=0.4)
        self.au_mot("ce qu'ils")
        self.play(Indicate(tb.libelles[1], color=AMBRE, scale_factor=1.2), run_time=0.6)
        self.au_mot("2 000 pièces")
        self.play(FadeIn(tb.valeur(0, 1), scale=1.4), FadeIn(tb.trou(1, 1), scale=1.3), run_time=0.4)
        h = tb.fleche_col(0, 1, "× 2,5", ligne=0)
        b = tb.fleche_col(0, 1, "× 2,5", ligne=1)
        L1 = self.lc([("2 000 =", WHITE), ("800 ×", WHITE), ("2,5", FLECHE_COL)], -1.95, fs=40, x=xc)
        self.jouer(L1, ["2 000, c'est", "800 fois", ("2,5", 1)],
                   extra={0: [tb.allumer(0, 1)], 1: [tb.allumer(0, 0)],
                          2: [Create(h.fleche), FadeIn(h.etiquette, scale=1.3)]})
        self.play(tb.eteindre(0, 0), tb.eteindre(0, 1), run_time=0.3)
        L2 = self.lc([("5 ×", WHITE), ("2,5 =", FLECHE_COL), ("12,50 €", VERT_OK)], -2.85, fs=40, x=xc)
        self.jouer(L2, ["Donc 5", ("2,5", 2), "12,50"],
                   extra={1: [Create(b.fleche), FadeIn(b.etiquette, scale=1.3)], 2: [tb.remplir(1, 1, "12,50")]})
        self.play(tb.allumer(1, 1), run_time=0.3)
        self.insister(L2[2], 1.15, 0.2)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (800 pièces → 5 € ; 400 pièces ?) ───────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        deco = VGroup(kenza(0.9).move_to(P(-5.6, -1.0)), pack(1.3).move_to(P(-2.8, 0.4)))
        self.add(deco)
        tb = self.table_p(["Pièces", "Prix (€)"], [[800, 400], [5, "2,50"]], P(-3.85, 0.9), lc=1.3, ll=2.2, fs=36)
        h = self.muet(tb.fleche_col(0, 1, "÷ 2", ligne=0))
        b = self.muet(tb.fleche_col(0, 1, "÷ 2", ligne=1))

        def apres(sc):
            connus = self.sans(tb.valeur(0, 0), tb.valeur(1, 0))  # données de la question, relues
            sc.play(FadeOut(deco), FadeIn(tb.fond), FadeIn(VGroup(*connus)), FadeIn(tb.trou(1, 1)), run_time=0.15)
            l0 = sc.ligne_rep(0, ["400 :", "moitié de 800."])
            l1 = sc.ligne_rep(1, ["Moitié de 5 € :", "2,50 €."])
            sc.au_mot("400, c'est")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), FadeIn(tb.valeur(0, 1), scale=1.4), run_time=0.3)
            sc.au_mot("la moitié de 800")
            sc.play(FadeIn(l0[1], shift=UP * 0.15), Create(h.fleche), FadeIn(h.etiquette), run_time=0.4)
            sc.au_mot("la moitié de 5")
            sc.play(FadeIn(l1[0], shift=UP * 0.15), Create(b.fleche), FadeIn(b.etiquette), run_time=0.4)
            sc.au_mot("2,50 euros")
            sc.play(FadeIn(l1[1], scale=1.3), tb.remplir(1, 1, "2,50"), run_time=0.4)
            sc.play(tb.allumer(1, 1), run_time=0.3)
            sc.rep_fini()

        self.question_pause("06-question", "06b-reponse",
                            ["800 pièces : 5 €.", "Combien coûtent", "400 pièces ?"],
                            [self.t("2,50 €", 34), self.t("10 €", 34), self.t("1 €", 34)], 0,
                            ["400 : moitié de 800.", "Moitié de 5 € : 2,50 €."], mot_q="800 pièces",
                            autres_r=apres)

    # ── 07 : le piège : le gros pack n'est pas le plus avantageux (pour 1 €) ─
    def ecran_piege(self):
        self.ecran("07-piege")
        self.titre_haut("Attention au piège !", "Attention", couleur=ROUGE_ERREUR, fs=42)
        faux = self.t("Plus gros = plus avantageux ?", 30, ROUGE_P).move_to(P(-0.9, 2.12))
        self.au_mot("Le plus gros")
        self.play(FadeIn(faux, shift=UP * 0.15), run_time=0.4)
        self.au_mot("n'est pas toujours")
        self.play(Create(croix(faux, sw=6)), run_time=0.4)
        libs = ["Prix (€)", "Pièces"]
        tA = self.table_p(libs, [[5, 1], [800, 160]], P(-3.9, -0.55), lc=1.25, ll=2.0, fs=32)
        tB = self.table_p(libs, [[15, 1], [2000, "≈ 133"]], P(1.9, -0.55), lc=1.25, ll=2.0, fs=32)
        pA = VGroup(pack(0.6), self.t("Pack A", 32, AMBRE)).arrange(RIGHT, buff=0.3).move_to(P(-5.0, 1.2))
        pB = VGroup(pack(0.85), self.t("Pack B", 32, AMBRE)).arrange(RIGHT, buff=0.3).move_to(P(0.4, 1.2))
        self.au_mot("Pack A")
        self.play(FadeIn(pA, scale=0.8), FadeIn(tA.fond, shift=UP * 0.2), run_time=0.45)
        self.au_mot("800 pièces")
        self.play(FadeIn(tA.valeur(1, 0), scale=1.4), run_time=0.3)
        self.au_mot("5 euros")
        self.play(FadeIn(tA.valeur(0, 0), scale=1.4), run_time=0.3)
        self.au_mot("Pack B")
        self.play(FadeIn(pB, scale=0.8), FadeIn(tB.fond, shift=UP * 0.2), run_time=0.45)
        self.au_mot("2 000 pièces")
        self.play(FadeIn(tB.valeur(1, 0), scale=1.4), run_time=0.3)
        self.au_mot("15 euros")
        self.play(FadeIn(tB.valeur(0, 0), scale=1.4), run_time=0.3)
        self.au_mot("Pour 1 euro")
        self.play(FadeIn(tA.valeur(0, 1), scale=1.4), FadeIn(tB.valeur(0, 1), scale=1.4), tA.allumer(0, 1),
                  tB.allumer(0, 1), run_time=0.4)
        fa = tA.fleche_col(0, 1, "÷ 5", ligne=0)
        fb = tB.fleche_col(0, 1, "÷ 15", ligne=0)
        LA = self.lc([("800 ÷", WHITE), ("5 =", FLECHE_COL), ("160 pièces", VERT_OK)], -2.1, fs=30, x=-3.9)
        self.jouer(LA, ["A donne", "par 5", "160 pièces"],
                   extra={1: [Create(fa.fleche), FadeIn(fa.etiquette)], 2: [tA.remplir(1, 1, 160)]})
        LB = self.lc([("2 000 ÷", WHITE), ("15 ≈", FLECHE_COL), ("133 pièces", ORANGE_RETENUE)], -2.1, fs=30,
                     x=1.9)
        self.jouer(LB, ["B donne", "par 15", "133 pièces"],
                   extra={1: [Create(fb.fleche), FadeIn(fb.etiquette)], 2: [tB.remplir(1, 1, "≈ 133")]})
        fin = self.t("Le gros pack est moins avantageux !", 34, ROUGE_ERREUR).move_to(P(-0.9, -3.0))
        self.au_mot("Le gros pack est")
        self.play(FadeIn(fin, shift=UP * 0.15), tB.allumer(1, 1), run_time=0.45)
        self.play(Circumscribe(LA[2], color=VERT_OK, buff=0.1), run_time=0.8)
        self.attendre_voix()

    # ── 08 : défi : le boss (90 XP par minute ; 4 min 20 s → ?) ─────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.titre_haut("À toi de jouer !", "À toi de jouer", fs=50)
        xc = -1.6
        tb = self.table_p(["Temps", "XP"], [["1 min", "4 min 20 s"], [90, "?"]], P(xc, 1.25), lc=2.5, ll=1.9,
                          fs=36)
        bs = boss(0.95).move_to(P(4.3, 0.9))
        self.au_mot("Un boss")
        self.play(FadeIn(bs, scale=0.6), FadeIn(tb.fond, shift=UP * 0.2), run_time=0.5)
        self.au_mot("90 XP")
        self.play(FadeIn(tb.valeur(1, 0), scale=1.4), run_time=0.35)
        self.au_mot("par minute")
        self.play(FadeIn(self.sans(tb.valeur(0, 0)), scale=1.4), run_time=0.35)
        self.au_mot("4 minutes")
        self.play(FadeIn(tb.valeur(0, 1), scale=1.4), run_time=0.4)
        self.au_mot("Combien d'XP")
        self.play(FadeIn(tb.trou(1, 1), scale=1.3), run_time=0.35)
        self.play(Indicate(tb.trou(1, 1), color=AMBRE, scale_factor=1.3), run_time=0.6)
        self.pause_defi(y=-1.2)

    # ── 08b : correction : 4 min + 20 s (additionner des morceaux) ──────────
    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.2))
        self.play(Write(tit), run_time=0.5)
        xc = self.X0
        tb = self.table_p(["Temps", "XP"], [["4 min", "20 s", "4 min 20 s"], [360, 30, 390]], P(xc, 0.85),
                          lc=2.0, ll=1.8, fs=34)
        tot = self.sans(tb.valeur(0, 2))  # la durée du combat, dite à l'écran 08
        self.add(tb.fond, tot, tb.trou(1, 2))
        L1 = self.lc([("4 min :", WHITE), ("90 ×", WHITE), ("4 =", FLECHE_COL), ("360 XP", VERT_OK)], -1.05,
                     fs=36, x=xc)
        self.jouer(L1, ["4 minutes", "90 fois", "4, égale", "360 XP"],
                   extra={0: [FadeIn(tb.valeur(0, 0), scale=1.4)], 3: [FadeIn(tb.valeur(1, 0), scale=1.4)]})
        L2 = self.lc([("20 s :", WHITE), ("le tiers", AMBRE), ("d'une minute", AMBRE)], -1.72, fs=36, x=xc)
        self.jouer(L2, ["20 secondes", "le tiers", "d'une minute"],
                   extra={0: [FadeIn(tb.valeur(0, 1), scale=1.4)]})
        L3 = self.lc([("90 ÷", WHITE), ("3 =", FLECHE_COL), ("30 XP", VERT_OK)], -2.39, fs=36, x=xc)
        self.jouer(L3, ["90 divisé", "par 3", "30 XP"], extra={2: [FadeIn(tb.valeur(1, 1), scale=1.4)]})
        ph = tb.plus(0, 1)
        L4 = self.lc([("360 +", WHITE), ("30 =", FLECHE_COL), ("390 XP", VERT_OK)], -3.05, fs=40, x=xc)
        self.jouer(L4, ["360 plus", "30, égale", "390 XP"],
                   extra={0: [FadeIn(ph, scale=1.3), tb.allumer(1, 0), tb.allumer(1, 1)],
                          2: [tb.remplir(1, 2, 390)]})
        self.play(tb.eteindre(1, 0), tb.eteindre(1, 1), tb.allumer(1, 2), run_time=0.3)
        self.insister(L4[2], 1.15, 0.2)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        tb = self.table_p(["Prix (€)", "Pièces"], [[5, 1], [800, 160]], ORIGIN, lc=1.2, ll=2.3, fs=32)
        fl = tb.fleche_col(0, 1, "÷ 5", ligne=0)
        fig = VGroup(tb.fond, *[tb.valeur(r, c) for r in (0, 1) for c in (0, 1)], fl)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("On vérifie d'abord", "si c'est proportionnel."),
            ("Méthodes : passage à l'unité,", "coefficient, ou additionner", "des morceaux."),
            ("Pour comparer deux offres,", "on ramène à la même quantité.")], fs=36)
        self.au_mot("on vérifie")
        self.montrer_ligne(lignes[0])
        self.au_mot("Puis on choisit")
        self.montrer_ligne(lignes[1])
        self.au_mot("Et pour comparer")
        self.montrer_ligne(lignes[2], Indicate(tb.valeur(0, 1), color=FLECHE_K))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_xp()
        self.ecran_question1()
        self.ecran_niveaux()
        self.ecran_boutique()
        self.ecran_question2()
        self.ecran_piege()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class PropDefi4e(PropDefiBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"
