# prop_quatrieme.py
# EleveAI — Maths 4e — série « Proportionnalité », lot 5 (une paysage par
# micro), épisode 24 : CALCULER UNE QUATRIÈME PROPORTIONNELLE (micro du coach :
# prop_quatrieme, notion prop_proportionnalite), AVEC VOIX. Paysage 16:9,
# CEINTURE VERTE. PAYSAGE SEULEMENT (le short 4e-prop-proportionnalite-short-
# croix existe déjà).
# ⭐ Le SEUL épisode de la série avec le PRODUIT EN CROIX (permis en 4e) : la
# diagonale est surlignée dans le TableauProp (cases fuchsia + trait), le
# « troisième nombre » encadré en ambre. Méthode de contrôle : le passage à
# l'unité (écran 03) et l'estimation (écran 07).
# ⭐ Leurres (fil rouge 3 : INVERSER la diagonale, multiplier les mauvais
# nombres) : question 1 : 5 × 8 ÷ 40 et 40 × 5 ÷ 8 ; écran 07 : 6 × 14 ÷ 9 ≈
# 9,3 m barré ; question 2 : 11,25 (= 3 × 15 ÷ 4, la mauvaise diagonale) et 16
# (= 15 + 1, ajouter au lieu de multiplier, fil rouge 1).
#
# Décor et métier : MODE, Malo, STYLISTE (son atelier, ses sweats, ses rouleaux
# de tissu, son mètre ruban). Quantités inventées, plausibles (1,5 m de tissu
# par sweat, 8 boutons par sweat, 8 € le mètre) : aucun chiffre du monde réel,
# pas de source à citer. Centres d'intérêt : mode.
#
# Écrans : 00 garde · 01 Malo et la commande de 14 sweats · 02 le tableau
# (quatrième proportionnelle) · 03 par l'unité (÷ 6, × 14) · 04 le produit en
# croix (diagonale 9 et 14, ÷ 6) · 05 pourquoi ça marche (× 14 et ÷ 6 changent
# de place) · 06 QUESTION 1 (40 € pour 5 m ; 8 m ?) · 07 le piège (mauvaise
# diagonale) et l'estimation · 08 QUESTION 2 (tee-shirts) · 09 défi des
# boutons · 09b correction · 10 ce que tu as appris · 11 fin.
#
# Voix : manim/voix/4e-prop-quatrieme.json (validée par Frédéric le 01/11, débit
# −10), WAV dans public/sons/4e-prop-quatrieme/ ; marques mot à mot :
# manim/scripts/4e/prop_quatrieme_marques.json (scripts/marques_dump.ps1 puis
# un convertisseur qui garde une marque par OCCURRENCE : « 1 200. 1 200 »).
# Outils : manim/scripts/6e/prop_commun.py + manim/canvas_proportion.py (non
# modifiés) ; base PropTableauBase de manim/scripts/4e/prop_tableau.py (chargée
# par son chemin : _disposer_q, question_pause, lc, jouer, ligne_rep bornée,
# muet). Ajouté ICI : malo(), sweat(), rouleau(), teeshirt(), bouton(),
# diagonale() (le trait de la croix) et cadre_case() (le troisième nombre).
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/prop_quatrieme.py PropQuatrieme4e
# PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/4e/prop_quatrieme.py PropQuatrieme4e -o eleveai-maths-4e-prop-quatrieme --media_dir manim/media-prop-4e-24
# Sortie : manim/sorties/4e/maths/proportionnalite/24-quatrieme/eleveai-maths-4e-prop-quatrieme.mp4

import sys
import importlib.util
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

from prop_commun import *  # noqa: E402,F403

_spec = importlib.util.spec_from_file_location("prop_tableau_4e", Path(__file__).resolve().parent / "prop_tableau.py")
_p4 = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_p4)
PropTableauBase4e = _p4.PropTableauBase

DIAG = "#d946ef"        # la diagonale du produit en croix (fuchsia)
DIAG_FOND = "#fae8ff"
DIAG_TXT = "#86198f"
TISSU = "#0ea5e9"       # le tissu des sweats (bleu)
TISSU_F = "#0369a1"
RUBAN = "#facc15"       # le mètre ruban


def sweat(s=1.0, couleur=TISSU):
    """Un sweat à capuche, vu de face."""
    corps = Polygon(P(-0.42, 0.35), P(0.42, 0.35), P(0.38, -0.5), P(-0.38, -0.5), fill_color=couleur, fill_opacity=1,
                    stroke_color=TISSU_F, stroke_width=3)
    mg = Polygon(P(-0.42, 0.35), P(-0.72, -0.25), P(-0.56, -0.33), P(-0.36, 0.0), fill_color=couleur, fill_opacity=1,
                 stroke_color=TISSU_F, stroke_width=3)
    md = mg.copy().flip(UP, about_point=ORIGIN)
    capuche = Arc(radius=0.2, start_angle=PI, angle=PI, color=TISSU_F, stroke_width=5).move_to(P(0, 0.3))
    poche = RoundedRectangle(width=0.42, height=0.18, corner_radius=0.05, fill_color=TISSU_F, fill_opacity=0.6,
                             stroke_width=0).move_to(P(0, -0.28))
    return VGroup(mg, md, corps, capuche, poche).scale(s)


def teeshirt(s=1.0, couleur="#f472b6"):
    """Un tee-shirt, vu de face."""
    f = Polygon(P(-0.28, 0.38), P(-0.62, 0.18), P(-0.5, -0.02), P(-0.34, 0.06), P(-0.34, -0.45), P(0.34, -0.45),
                P(0.34, 0.06), P(0.5, -0.02), P(0.62, 0.18), P(0.28, 0.38), P(0.12, 0.3), P(-0.12, 0.3),
                fill_color=couleur, fill_opacity=1, stroke_color="#9d174d", stroke_width=3)
    return VGroup(f).scale(s)


def rouleau(s=1.0, couleur=TISSU):
    """Un rouleau de tissu (cylindre couché) avec un pan déroulé."""
    pan = Polygon(P(-0.1, -0.25), P(0.9, -0.45), P(0.9, -0.62), P(-0.1, -0.42), fill_color=couleur, fill_opacity=0.85,
                  stroke_color=TISSU_F, stroke_width=2)
    cyl = RoundedRectangle(width=1.3, height=0.6, corner_radius=0.28, fill_color=couleur, fill_opacity=1,
                           stroke_color=TISSU_F, stroke_width=3)
    bout = Ellipse(width=0.26, height=0.6, fill_color=TISSU_F, fill_opacity=1, stroke_width=0).move_to(cyl.get_left()
                                                                                                    + RIGHT * 0.13)
    raies = VGroup(*[Line(P(x, 0.27), P(x, -0.27), color=TISSU_F, stroke_width=2) for x in (-0.15, 0.15, 0.45)])
    return VGroup(pan, cyl, raies, bout).scale(s)


def bouton(s=1.0, couleur="#f59e0b"):
    """Un bouton à quatre trous."""
    d = Circle(radius=0.16, fill_color=couleur, fill_opacity=1, stroke_color="#92400e", stroke_width=3)
    trous = VGroup(*[Dot(P(x, y), radius=0.025, color="#78350f") for x in (-0.05, 0.05) for y in (-0.05, 0.05)])
    return VGroup(d, trous).scale(s)


def malo(s=1.0):
    """Malo, styliste : veste noire, mètre ruban jaune autour du cou."""
    p = personne(peau="#f1c27d", tenue="#111827", cheveux="#7c2d12")
    c = p.tete.get_center()
    r = p.tete.width / 2
    bas = p.corps.get_top()
    g = Line(c + P(-r * 0.75, -r * 0.95), bas + P(-r * 0.35, -r * 1.5), color=RUBAN, stroke_width=9)
    d = Line(c + P(r * 0.75, -r * 0.95), bas + P(r * 0.35, -r * 1.5), color=RUBAN, stroke_width=9)
    tour = Arc(radius=r * 0.8, start_angle=PI * 1.08, angle=PI * 0.84, color=RUBAN, stroke_width=9).move_to(
        c + DOWN * r * 1.0)
    p.add(tour, g, d)
    return p.scale(s)


def diagonale(tb, a=(1, 0), b=(0, 1), couleur=DIAG, buff=0.3, sw=9):
    """Le trait de la croix entre les cases a et b (raccourci de `buff`).
    z_index 5 : une case qu'on allume (remise au premier plan) ne le cache
    plus ; les nombres des cases (z_index 6, voir tab()) restent devant lui."""
    pa, pb = tb.case(*a).get_center(), tb.case(*b).get_center()
    u = (pb - pa) / np.linalg.norm(pb - pa)
    return Line(pa + u * buff, pb - u * buff, color=couleur, stroke_width=sw).set_z_index(5)


def cadre_case(tb, r, c, couleur=FLECHE_K, sw=6):
    """Le cadre ambre du « troisième nombre », dans la case (loin des voisines)."""
    cs = tb.case(r, c)
    return RoundedRectangle(width=cs.width - 0.12, height=cs.height - 0.1, corner_radius=0.1, stroke_color=couleur,
                            stroke_width=sw, fill_opacity=0).move_to(cs).set_z_index(5)


class PropQuatriemeBase(PropTableauBase4e):
    nom_voix = "4e-prop-quatrieme"
    fichier_marques = "prop_quatrieme_marques.json"
    LIBS = ["Sweats", "Tissu (m)"]
    VALS = [[6, 14], [9, 21]]
    X0 = -0.6

    def tab(self, connues, vals=None, libs=None, centre=None, lc=1.9, fs=42, h=0.92, ll=3.0):
        """Le tableau de l'atelier : les cases `connues` portent leur valeur,
        les autres leur « ? ». Renvoie (tb, ce qui est déjà à l'écran)."""
        tb = TableauProp(libs or self.LIBS, vals or self.VALS, montrer=False, largeur_case=lc, largeur_libelle=ll,
                         hauteur=h, fs=fs, centre=centre if centre is not None else P(self.X0, 1.3))
        val0 = tb.valeur

        def valeur(r, c, couleur=VALEUR_P):  # les nombres devant la diagonale (z_index 5)
            return val0(r, c, couleur).set_z_index(6)
        tb.valeur = valeur
        deja = VGroup(tb.fond)
        for r in range(tb.nl):
            for c in range(tb.nc):
                deja.add(tb.valeur(r, c) if (r, c) in connues else tb.trou(r, c))
        return tb, deja

    def choix_ts(self, n, fs=34):
        """Un choix « 20 tee-shirts » : le nombre attend son mot, « tee-shirts »
        n'attend pas (il attendait le « tee-shirts » dit après « 11,25 »)."""
        a, b = self.t(n, fs), self.t("tee-shirts", fs)
        b.sans_synchro = True
        return VGroup(a, b).arrange(RIGHT, buff=0.16, aligned_edge=DOWN)

    def diag_on(self, tb, a=(1, 0), b=(0, 1)):
        """Animations : les deux cases de la diagonale en fuchsia."""
        return [tb.allumer(*a, fond=DIAG_FOND, txt=DIAG_TXT), tb.allumer(*b, fond=DIAG_FOND, txt=DIAG_TXT)]

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("La quatrième proportionnelle", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("La quatrième")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        tb = TableauProp(self.LIBS, [["?"] * 2] * 2, montrer=False, largeur_case=1.6, largeur_libelle=2.6,
                         hauteur=0.75, fs=34, centre=P(0.6, 0.35))
        self.play(FadeIn(tb.fond, shift=UP * 0.2), run_time=0.5)
        trous = [tb.trou(r, c) for r in range(2) for c in range(2)]
        self.play(LaggedStart(*[FadeIn(t, scale=1.4) for t in trous], lag_ratio=0.1), run_time=0.6)
        d = diagonale(tb)
        self.play(Create(d), run_time=0.5)
        self.au_mot("L'atelier")
        deco = VGroup(sweat(1.2), rouleau(1.0)).arrange(DOWN, buff=0.45).move_to(P(-4.6, 0.35))
        nom = self.ligne([("L'atelier de", AMBRE), ("Malo", AMBRE)], 34).next_to(tb.carte, DOWN, buff=0.3)
        self.play(FadeIn(deco, scale=0.7), FadeIn(nom[0], shift=UP * 0.15), run_time=0.4)
        self.au_mot("Malo")
        self.play(FadeIn(nom[1], scale=1.2), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 01 : Malo, styliste, et la commande ─────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = malo(1.0).move_to(P(-5.55, -1.0))
        self.au_mot("Voici Malo")
        nom = self.t("Malo", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.3)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("styliste")
        met = self.t("styliste", 30, BLEU_CALCUL).next_to(pers, DOWN, buff=0.2)
        met.shift(RIGHT * max(0, -6.5 - met.get_left()[0]))
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        self.au_mot("crée des sweats")
        un = sweat(1.3).move_to(P(-5.55, 2.55))
        self.play(FadeIn(un, scale=0.6), run_time=0.4)
        self.au_mot("6 sweats")
        six = VGroup(*[sweat(0.75) for _ in range(6)]).arrange_in_grid(2, 3, buff=(0.3, 0.25)).move_to(P(-1.7, 1.45))
        l1 = self.ligne([("6 sweats", WHITE), ("→", WHITE), ("9 m de tissu", AMBRE)], 32).move_to(P(-1.75, -0.05))
        l1[2].sans_synchro = True  # il attendait « tissu », dit 0,8 s après « 9 mètres »
        self.play(LaggedStart(*[FadeIn(t, shift=DOWN * 0.2) for t in six], lag_ratio=0.08), FadeIn(l1[0]),
                  run_time=0.5)
        self.au_mot("9 mètres")
        rl = rouleau(1.0).move_to(P(-1.7, -1.25))
        self.play(FadeIn(l1[1]), FadeIn(l1[2], scale=1.3), FadeIn(rl, shift=RIGHT * 0.3), run_time=0.5)
        self.insister(l1[2], 1.12, 0.2)
        self.au_mot("boutique")
        bon = self.t("La boutique commande :", 30, JAUNE_TITRE).move_to(P(3.5, 2.3))
        self.play(Write(bon), run_time=0.5)
        self.au_mot("14. Combien")
        quatorze = self.ligne([("14", WHITE), ("sweats", WHITE)], 40).move_to(P(3.75, 1.4))
        quatorze[1].sans_synchro = True  # « sweats » est dit avant « 14 »
        pile = VGroup(*[sweat(0.42) for _ in range(14)]).arrange_in_grid(2, 7, buff=(0.12, 0.15)).move_to(P(3.75, 0.4))
        self.play(FadeIn(quatorze, scale=1.3), LaggedStart(*[FadeIn(t, shift=DOWN * 0.15) for t in pile],
                                                           lag_ratio=0.05), run_time=0.7)
        self.au_mot("Combien")
        q = self.ligne([("Tissu :", WHITE), ("? m", ORANGE_RETENUE)], 40).move_to(P(3.75, -0.75))
        q[1].sans_synchro = True
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.play(Indicate(q[1], color=AMBRE, scale_factor=1.3), run_time=0.7)
        self.attendre_voix()

    # ── 02 : le tableau : trois nombres connus, un seul à trouver ───────────
    def ecran_tableau(self):
        self.ecran("02-tableau")
        tb, _ = self.tab(set())
        self.au_mot("tableau")
        self.play(FadeIn(tb.fond, shift=UP * 0.2), run_time=0.6)
        self.au_mot("6 sweats")
        self.play(tb.remplir(0, 0, 6), run_time=0.4)
        self.au_mot("9 mètres")
        self.play(tb.remplir(1, 0, 9), run_time=0.4)
        self.au_mot("14 sweats")
        self.play(tb.remplir(0, 1, 14), run_time=0.4)
        self.au_mot("point d'interrogation")
        self.play(FadeIn(tb.trou(1, 1), scale=1.4), run_time=0.4)
        self.au_mot("Trois nombres")
        t1 = self.t("Trois nombres connus,", 36).move_to(P(self.X0, -0.55))
        self.play(FadeIn(t1, shift=UP * 0.15), *[tb.allumer(r, c) for r, c in ((0, 0), (1, 0), (0, 1))],
                  run_time=0.5)
        self.au_mot("un seul")
        t2 = self.t("un seul à trouver.", 36, ORANGE_RETENUE).move_to(P(self.X0, -1.25))
        self.play(FadeIn(t2, shift=UP * 0.15), Indicate(tb.trou(1, 1), color=AMBRE, scale_factor=1.25),
                  run_time=0.6)
        self.au_mot("quatrième proportionnelle")
        tp = self.tampon("Une quatrième proportionnelle", VERT_OK, fs=40).move_to(P(self.X0, -2.55))
        self.play(FadeIn(tp, scale=1.2), *[tb.eteindre(r, c) for r, c in ((0, 0), (1, 0), (0, 1))], run_time=0.5)
        self.insister(tp, 1.08, 0.2)
        self.attendre_voix()

    def methode(self, s, mot, y=-3.1, couleur=FLECHE_COL):
        """Le nom de la méthode, sous la figure, à son mot."""
        self.au_mot(mot)
        phr = self.t(s, 36, couleur).move_to(P(self.X0, y))
        self.play(FadeIn(phr, shift=UP * 0.15), run_time=0.4)
        return phr

    # ── 03 : par l'unité (6 → 1 → 14) ───────────────────────────────────────
    def ecran_unite(self):
        self.ecran("03-unite")
        tb, _ = self.tab(set(), vals=[[6, 1, 14], [9, 1.5, 21]], lc=1.6, fs=40, centre=P(self.X0, 1.2))
        self.add(tb.fond, tb.valeur(0, 0), tb.valeur(1, 0), tb.trou(0, 1), tb.trou(1, 1), tb.trou(0, 2),
                 tb.trou(1, 2))
        self.methode("Par l'unité", "passer par l'unité", y=-3.05)
        h1 = tb.fleche_col(0, 1, "÷ 6", ligne=0)
        b1 = tb.fleche_col(0, 1, "÷ 6", ligne=1)
        l1 = self.lc([("9 ÷", WHITE), ("6 =", WHITE), ("1,5 m", VERT_OK)], -1.35, fs=40, x=-3.0)
        self.au_mot("1 sweat")
        self.play(tb.remplir(0, 1, 1), Create(h1.fleche), run_time=0.4)
        self.au_mot("9 divisé")
        self.play(tb.allumer(1, 0), Create(b1.fleche), FadeIn(l1[0], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("6, égale")
        self.play(FadeIn(h1.etiquette, scale=1.3), FadeIn(b1.etiquette, scale=1.3), FadeIn(l1[1], shift=RIGHT * 0.2),
                  run_time=0.3)
        self.au_mot("1,5 mètre")
        self.play(FadeIn(l1[2], scale=1.3), tb.remplir(1, 1, 1.5), tb.eteindre(1, 0), run_time=0.4)
        self.play(tb.allumer(1, 1), run_time=0.3)
        h2 = tb.fleche_col(1, 2, "× 14", ligne=0)
        b2 = tb.fleche_col(1, 2, "× 14", ligne=1)
        l2 = self.lc([("1,5 ×", WHITE), ("14 =", WHITE), ("21 m", VERT_OK)], -1.35, fs=40, x=2.2)
        self.au_mot("14 sweats")
        self.play(tb.remplir(0, 2, 14), Create(h2.fleche), FadeIn(h2.etiquette, scale=1.3), run_time=0.4)
        self.au_mot("1,5 fois")
        self.play(Create(b2.fleche), FadeIn(l2[0], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("14, égale")
        self.play(FadeIn(b2.etiquette, scale=1.3), FadeIn(l2[1], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("21 mètres")
        self.play(FadeIn(l2[2], scale=1.3), tb.remplir(1, 2, 21), tb.eteindre(1, 1), run_time=0.4)
        self.play(tb.allumer(1, 2), run_time=0.3)
        self.insister(l2[2], 1.15, 0.2)
        self.attendre_voix()

    # ── 04 : le produit en croix ────────────────────────────────────────────
    def ecran_croix(self):
        self.ecran("04-croix")
        tb, deja = self.tab({(0, 0), (1, 0), (0, 1)}, centre=P(self.X0, 1.45))
        self.add(deja)
        self.au_mot("produit en croix")
        tit = self.t("Le produit en croix", 40, DIAG).move_to(P(self.X0, 3.15))
        self.play(Write(tit), run_time=0.6)
        d = diagonale(tb)
        self.au_mot("en diagonale")
        self.play(Create(d), run_time=0.5)
        self.au_mot("9 et")
        self.play(tb.allumer(1, 0, fond=DIAG_FOND, txt=DIAG_TXT), run_time=0.3)
        self.au_mot("14, et")
        self.play(tb.allumer(0, 1, fond=DIAG_FOND, txt=DIAG_TXT), run_time=0.3)
        cadre = cadre_case(tb, 0, 0)
        self.au_mot("troisième")
        self.play(Create(cadre), run_time=0.4)
        self.play(Indicate(tb.valeur(0, 0), color=FLECHE_K, scale_factor=1.3), run_time=0.5)
        l1 = self.lc([("9 ×", DIAG), ("14 =", DIAG), ("126", WHITE)], -0.65, fs=42)
        self.jouer(l1, ["9 fois", "14, égale", "126. 126"])
        l2 = self.lc([("126 ÷", WHITE), ("6 =", FLECHE_K), ("21 m", VERT_OK)], -1.5, fs=42)
        self.jouer(l2[:2], ["126 divisé", "6, égale"])
        self.au_mot("21 mètres")
        self.play(FadeIn(l2[2], scale=1.3), tb.remplir(1, 1, 21), run_time=0.4)
        self.play(tb.allumer(1, 1), run_time=0.3)
        self.au_mot("Le même")
        mm = self.t("Le même résultat !", 34, VERT_OK).move_to(P(self.X0, -2.45))
        self.play(FadeIn(mm, shift=UP * 0.15), run_time=0.5)
        self.insister(l2[2], 1.15, 0.2)
        self.attendre_voix()

    # ── 05 : pourquoi ça marche (× 14 et ÷ 6 changent de place) ─────────────
    def ecran_pourquoi(self):
        self.ecran("05-pourquoi")
        self.au_mot("Pourquoi")
        tit = self.t("Pourquoi ça marche ?", 46, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        self.play(Write(tit), run_time=0.5)
        fs = 60
        haut = [self.t("9", fs), self.t("× 14", fs, DIAG), self.t("÷ 6", fs, FLECHE_K)]
        VGroup(*haut).arrange(RIGHT, buff=0.35).move_to(P(-0.6, 1.75))
        self.au_mot("9 fois")
        self.play(FadeIn(haut[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("14, divisé")
        self.play(FadeIn(haut[1], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("6, c'est")
        self.play(FadeIn(haut[2], scale=1.3), run_time=0.3)
        self.au_mot("la même chose")
        egal = self.t("= la même chose", 34, VERT_OK).move_to(P(-0.6, 0.75))
        self.play(FadeIn(egal, scale=1.4), run_time=0.4)
        bas = [self.t("9", fs), self.t("÷ 6", fs, FLECHE_K), self.t("× 14", fs, DIAG)]
        VGroup(*bas).arrange(RIGHT, buff=0.35).move_to(P(-0.6, -0.25))
        self.au_mot("9 divisé")
        self.play(TransformFromCopy(haut[0], bas[0]), run_time=0.4)
        self.au_mot("6, puis")
        self.play(TransformFromCopy(haut[2], bas[1], path_arc=PI / 2), run_time=0.6)
        self.au_mot("14. C'est")
        self.play(TransformFromCopy(haut[1], bas[2], path_arc=-PI / 2), run_time=0.6)
        self.au_mot("passage à l'unité")
        acc = Brace(VGroup(bas[0], bas[1]), DOWN, buff=0.15, color=FLECHE_COL)
        u = self.t("le passage à l'unité", 34, FLECHE_COL).next_to(acc, DOWN, buff=0.15)
        self.play(GrowFromCenter(acc), FadeIn(u, shift=UP * 0.15), run_time=0.5)
        self.au_mot("fait dans")
        o = self.t("fait dans un autre ordre.", 34, VERT_OK).next_to(u, DOWN, buff=0.3).set_x(-0.6)
        self.play(FadeIn(o, shift=UP * 0.15), run_time=0.4)
        self.play(Indicate(bas[1], color=FLECHE_K, scale_factor=1.2), Indicate(bas[2], color=DIAG, scale_factor=1.2),
                  run_time=0.8)
        self.attendre_voix()

    # ── 06 : QUESTION 1 (5 m → 40 € ; 8 m ?) ────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        deco = VGroup(malo(0.9).move_to(P(-5.6, -1.0)), rouleau(1.4).move_to(P(-2.6, 0.4)))
        self.add(deco)
        tb, _ = self.tab(set(), vals=[[5, 8], [40, 64]], libs=["Tissu (m)", "Prix (€)"], lc=1.35, ll=2.4, fs=36,
                         h=0.85, centre=P(-3.15, 0.35))

        def apres(sc):
            sc.play(FadeOut(deco), FadeIn(tb.fond), FadeIn(tb.trou(1, 1)), run_time=0.3)
            l0 = sc.ligne_rep(0, ["Diagonale :", "40 ×", "8,", "÷ 5."])
            l1 = sc.ligne_rep(1, ["320 ÷", "5 =", "64 €."])
            d = diagonale(tb, buff=0.42)
            sc.au_mot("en diagonale")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), Create(d), run_time=0.4)
            sc.au_mot("40 et")
            sc.play(FadeIn(l0[1], shift=UP * 0.15), tb.remplir(1, 0, 40), run_time=0.3)
            sc.play(tb.allumer(1, 0, fond=DIAG_FOND, txt=DIAG_TXT), run_time=0.2)
            sc.au_mot("8, et")
            sc.play(FadeIn(l0[2], shift=UP * 0.15), tb.remplir(0, 1, 8), run_time=0.3)
            sc.play(tb.allumer(0, 1, fond=DIAG_FOND, txt=DIAG_TXT), run_time=0.2)
            sc.au_mot("5. 320")
            sc.play(FadeIn(l0[3], shift=UP * 0.15), tb.remplir(0, 0, 5), Create(cadre_case(tb, 0, 0)), run_time=0.4)
            sc.au_mot("320 divisé")
            sc.play(FadeIn(l1[0], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("5, égale")
            sc.play(FadeIn(l1[1], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("64 euros")
            sc.play(FadeIn(l1[2], scale=1.3), tb.remplir(1, 1, 64), run_time=0.4)
            sc.play(tb.allumer(1, 1), run_time=0.3)
            sc.rep_fini()

        self.question_pause("06-question", "06b-reponse",
                            ["5 m de tissu : 40 €.", "Pour 8 m, quel calcul", "est juste ?"],
                            [self.t("40 × 8 ÷ 5", 34), self.t("5 × 8 ÷ 40", 34), self.t("40 × 5 ÷ 8", 34)], 0,
                            ["Diagonale : 40 × 8, ÷ 5.", "320 ÷ 5 = 64 €."], mot_q="5 mètres", autres_r=apres)

    # ── 07 : le piège (la mauvaise diagonale) et l'estimation ───────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        tit = self.t("Attention au piège !", 40, ROUGE_ERREUR).move_to(P(3.8, 3.1))
        self.au_mot("Attention")
        self.play(Write(tit), run_time=0.5)
        tb, deja = self.tab({(0, 0), (1, 0), (0, 1)}, lc=1.5, ll=2.6, fs=38, h=0.8, centre=P(-3.3, 1.55))
        self.add(deja)
        rouge = dict(fond="#fee2e2", txt=ROUGE_ERREUR)
        self.au_mot("mauvaise diagonale")
        self.play(tb.allumer(0, 0, **rouge), tb.allumer(0, 1, **rouge), run_time=0.4)
        w = self.lc([("6 ×", ROUGE_ERREUR), ("14 ÷", ROUGE_ERREUR), ("9", ROUGE_ERREUR), ("≈ 9,3 m", ROUGE_ERREUR)],
                    1.95, fs=40, x=3.6)
        self.jouer(w, ["6 fois", "14, divisé", "9 : environ", "9,3"])
        self.au_mot("C'est faux")
        barre = Line(w.get_left() + LEFT * 0.15, w.get_right() + RIGHT * 0.15, color=ROUGE_ERREUR, stroke_width=7)
        faux = self.t("Faux !", 40, ROUGE_ERREUR).move_to(P(3.6, 1.05))
        self.play(Create(barre), FadeIn(faux, scale=1.3), tb.eteindre(0, 0), tb.eteindre(0, 1), run_time=0.5)
        self.au_mot("estime")
        es = self.t("D'abord, on estime :", 36, JAUNE_TITRE).move_to(P(self.X0, -0.95))
        self.play(FadeIn(es, shift=UP * 0.15), run_time=0.4)
        e1 = self.lc([("14 sweats :", WHITE), ("un peu plus que le double de 6.", WHITE)], -1.6, fs=32)
        e1[0].sans_synchro = e1[1].sans_synchro = True  # « sweats », « un peu plus… » reviennent plus loin
        self.jouer(e1, ["14 sweats", "6. Il"])
        h = self.muet(tb.fleche_col(0, 1, "plus du double", ligne=0))
        self.play(Create(h.fleche), FadeIn(h.etiquette), run_time=0.4)
        e2 = self.lc([("Il faut plus du double de 9 m :", WHITE), ("plus de 18 m.", AMBRE)], -2.25, fs=32)
        e2[0].sans_synchro = True
        b = self.muet(tb.fleche_col(0, 1, "plus du double", ligne=1))
        self.jouer(e2, ["9 mètres :", "18 mètres"], extra={0: [Create(b.fleche), FadeIn(b.etiquette)]})
        e3 = self.lc([("21 m :", VERT_OK), ("c'est cohérent !", VERT_OK)], -2.95, fs=36)
        self.au_mot("21 mètres")
        self.play(FadeIn(e3[0], scale=1.3), tb.remplir(1, 1, 21), run_time=0.4)
        self.au_mot("cohérent")
        self.play(FadeIn(e3[1], shift=RIGHT * 0.2), tb.allumer(1, 1, fond="#dcfce7", txt="#166534"), run_time=0.4)
        self.insister(e3, 1.1, 0.2)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (3 m → 4 tee-shirts ; 15 m ?) ───────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        deco = VGroup(malo(0.9).move_to(P(-5.6, -1.0)),
                      VGroup(*[teeshirt(0.9) for _ in range(4)]).arrange_in_grid(2, 2, buff=0.25).move_to(P(-2.6, 0.4)))
        self.add(deco)
        tb, _ = self.tab(set(), vals=[[3, 15], [4, 20]], libs=["Tissu (m)", "Tee-shirts"], lc=1.35, ll=2.4, fs=36,
                         h=0.85, centre=P(-3.15, 0.35))

        def apres(sc):
            sc.play(FadeOut(deco), FadeIn(tb.fond), FadeIn(tb.trou(1, 1)), run_time=0.3)
            l0 = sc.ligne_rep(0, ["4 ×", "15 ÷", "3."])
            l1 = sc.ligne_rep(1, ["60 ÷", "3 =", "20 tee-shirts."])
            d = diagonale(tb, buff=0.42)
            sc.au_mot("4 fois")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), tb.remplir(1, 0, 4), Create(d), run_time=0.4)
            sc.play(tb.allumer(1, 0, fond=DIAG_FOND, txt=DIAG_TXT), run_time=0.2)
            sc.au_mot("15, divisé")
            sc.play(FadeIn(l0[1], shift=UP * 0.15), tb.remplir(0, 1, 15), run_time=0.3)
            sc.play(tb.allumer(0, 1, fond=DIAG_FOND, txt=DIAG_TXT), run_time=0.2)
            sc.au_mot("3. 60")
            sc.play(FadeIn(l0[2], shift=UP * 0.15), tb.remplir(0, 0, 3), Create(cadre_case(tb, 0, 0)), run_time=0.4)
            sc.au_mot("60 divisé")
            sc.play(FadeIn(l1[0], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("3, égale")
            sc.play(FadeIn(l1[1], shift=UP * 0.15), run_time=0.3)
            sc.au_mot("20 tee-shirts")
            sc.play(FadeIn(l1[2], scale=1.3), tb.remplir(1, 1, 20), run_time=0.4)
            sc.play(tb.allumer(1, 1), run_time=0.3)
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse",
                            ["3 m de tissu : 4 tee-shirts.", "Combien de tee-shirts", "avec 15 m ?"],
                            [self.choix_ts("20"), self.choix_ts("11,25"), self.choix_ts("16")],
                            0, ["4 × 15 ÷ 3.", "60 ÷ 3 = 20 tee-shirts."], mot_q="3 mètres", autres_r=apres)

    # ── 09 : défi : les boutons ─────────────────────────────────────────────
    LIBS_B = ["Sweats", "Boutons"]
    VALS_B = [[6, 25], [48, 200]]

    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        self.play(Write(tit), run_time=0.6)
        tb, _ = self.tab(set(), vals=self.VALS_B, libs=self.LIBS_B, centre=P(self.X0, 1.3))
        self.play(FadeIn(tb.fond, shift=UP * 0.2), FadeIn(tb.trou(0, 0)), FadeIn(tb.trou(1, 0)), run_time=0.5)
        self.au_mot("6 sweats")
        rang = VGroup(*[sweat(0.6) for _ in range(6)]).arrange(RIGHT, buff=0.22).move_to(P(self.X0, -0.3))
        self.play(tb.remplir(0, 0, 6), LaggedStart(*[FadeIn(s, shift=DOWN * 0.2) for s in rang], lag_ratio=0.12),
                  run_time=0.6)
        self.au_mot("48 boutons")
        bt = VGroup(*[bouton(0.8) for _ in range(12)]).arrange(RIGHT, buff=0.12).next_to(rang, DOWN, buff=0.3)
        self.play(tb.remplir(1, 0, 48), LaggedStart(*[FadeIn(b, scale=0.5) for b in bt], lag_ratio=0.05),
                  run_time=0.6)
        self.au_mot("25 sweats")
        self.play(FadeIn(tb.valeur(0, 1), scale=1.4), FadeIn(tb.trou(1, 1), scale=1.3), run_time=0.4)
        self.pause_defi(y=-1.6)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tb, deja = self.tab({(0, 0), (1, 0), (0, 1)}, vals=self.VALS_B, libs=self.LIBS_B, centre=P(self.X0, 1.65))
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.25))
        self.add(deja)
        self.play(Write(tit), run_time=0.5)
        d = diagonale(tb)
        l0 = self.lc([("48 ×", DIAG), ("25 ÷", DIAG), ("6", FLECHE_K)], 0.0, fs=38)
        self.au_mot("48 fois")
        self.play(Create(d), *self.diag_on(tb), FadeIn(l0[0], shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("25, divisé")
        self.play(FadeIn(l0[1], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("6. 48")
        self.play(FadeIn(l0[2], scale=1.3), Create(cadre_case(tb, 0, 0)), run_time=0.3)
        l1 = self.lc([("48 ×", WHITE), ("25 =", WHITE), ("1 200", WHITE)], -0.72, fs=38)
        self.jouer(l1, [("48 fois", 2), "25, égale", "1 200. 1 200"])
        l2 = self.lc([("1 200 ÷", WHITE), ("6 =", WHITE), ("200 boutons", VERT_OK)], -1.44, fs=38)
        self.jouer(l2[:2], ["1 200 divisé", "6, égale"])
        self.au_mot("200 boutons")
        self.play(FadeIn(l2[2], scale=1.3), tb.remplir(1, 1, 200), run_time=0.4)
        self.play(tb.allumer(1, 1), run_time=0.3)
        l3 = self.lc([("Avec l'unité :", FLECHE_COL), ("8 boutons par sweat,", WHITE), ("× 25", WHITE),
                      ("= 200", VERT_OK)], -2.2, fs=30, x=-1.5)
        self.jouer(l3, ["On vérifie", "8 boutons", "sweat, fois 25", "égale 200."])
        ok = self.coche().next_to(l3, RIGHT, buff=0.3)
        self.play(Create(ok), run_time=0.3)
        self.insister(l2[2], 1.12, 0.2)
        self.attendre_voix()

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        tb, deja = self.tab({(r, c) for r in range(2) for c in range(2)}, centre=ORIGIN)
        d, cadre = diagonale(tb), cadre_case(tb, 0, 0)
        fig = VGroup(deja, d, cadre)
        tb.case(1, 0).set_fill(DIAG_FOND, 1)
        tb.case(0, 1).set_fill(DIAG_FOND, 1)
        tb.valeur(1, 0).set_color(DIAG_TXT)
        tb.valeur(0, 1).set_color(DIAG_TXT)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Trois nombres connus :", "on trouve le quatrième"),
            ("par l'unité,",),
            ("ou par le produit en croix :", "× en diagonale,", "÷ par le troisième."),
            ("D'abord : proportionnel ?", "Puis on estime.")], fs=34)
        self.au_mot("Quand trois")
        self.montrer_ligne(lignes[0])
        self.au_mot("par le passage")
        self.montrer_ligne(lignes[1])
        self.au_mot("ou par le produit")
        self.montrer_ligne(lignes[2], Indicate(d, color=DIAG), Indicate(cadre, color=FLECHE_K))
        self.au_mot("Mais d'abord")
        self.montrer_ligne(lignes[3])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_tableau()
        self.ecran_unite()
        self.ecran_croix()
        self.ecran_pourquoi()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class PropQuatrieme4e(PropQuatriemeBase):
    identite = "Maths 4e — EleveAI"
    ceinture = "verte"
