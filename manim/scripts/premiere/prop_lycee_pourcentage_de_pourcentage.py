# prop_lycee_pourcentage_de_pourcentage.py
# EleveAI — Maths 2de, 1re (automatismes) ET STMG — série « Proportionnalité »,
# LYCÉE, épisode COMMUN « UN POURCENTAGE D'UN POURCENTAGE » (micros du coach :
# info_pourcentage_de_pourcentage en 2de, notion information_chiffree_evolutions ;
# auto_prop_pourcentage_de_pourcentage en 1re, notion auto_partie_tout ;
# auto_prop_de_proportion en STMG, notion auto_proportion), AVEC VOIX.
# Paysage 16:9. CEINTURES : 2de VERTE ; 1re et STMG ORANGE. Seules l'identité
# (« Maths 2de / 1re / STMG — EleveAI ») et la ceinture changent (la voix ne cite
# aucune classe). Short jumeau : prop_lycee_pourcentage_de_pourcentage_short.py.
# ⭐ Méthode travaillée : p % de q % = p × q, les deux proportions écrites en
# DÉCIMAL (0,31 × 0,38 = 0,1178 ≈ 11,8 %) ; le résultat est plus petit que
# chacune ; on n'additionne jamais deux pourcentages qui ne portent pas sur le
# même tout. « × » et « ÷ » écrits, décimaux à la virgule.
# ⭐ Le dessin qui porte tout : le CARRÉ DE 100 % (le tout), une BANDE verticale
# de 38 % (les produits), dans la bande un PETIT RECTANGLE de 31 % de sa hauteur
# (les places de marché) : son aire = 31 % de 38 % du carré.
# ⭐ Leurres (les erreurs dites par la voix) : ADDITIONNER les deux pourcentages
# (piège 06 : 38 + 31 = 69 %, barré ; question 1 A 90 % ; question 2 B 660 =
# 55 % de 1 200) ; multiplier sans écrire en décimal (question 1 C 2 000 %) ;
# prendre le second pourcentage du TOUT (question 2 C 300 = 25 % de 1 200).
#
# Décor et métier : Karim, ANALYSTE du commerce en ligne (son ordinateur, ses
# graphiques). Centres : argent-budget, technologie-ia.
# Source (en bas de l'écran de situation) : Fevad, bilan du e-commerce 2024 :
# 175,3 Md€ dépensés en ligne (+9,6 %), produits 66,9 Md€ (≈ 38 %), services
# 108,4 Md€ ; les places de marché = 31 % des ventes de produits.
# Contrôle : 0,31 × 66,9 ≈ 20,7 Md€ ; 20,7 ÷ 175,3 ≈ 0,118 ; 0,31 × 0,38 = 0,1178.
#
# Écrans : 00 garde · 01 Karim, 175,3 Md€, produits 38 %, places de marché 31 %
# · 02 la question du jour (31 % ? non) · 03 le carré de 100 % · 04 le calcul
# (produit, vérification en euros) · 05 QUESTION 1 (50 % de 40 %) · 06 le piège
# (38 + 31 = 69 % barré) · 07 QUESTION 2 (lycée de 1 200 élèves) · 08 défi
# (cadres, télétravail) · 08b correction · 09 ce que tu as appris · 10 fin.
#
# Voix : manim/voix/lycee-prop-pourcentage-de-pourcentage.json (validée par
# Frédéric le 02/11, débit −10), WAV dans
# public/sons/lycee-prop-pourcentage-de-pourcentage/ ; marques mot à mot :
# manim/scripts/premiere/prop_lycee_pourcentage_de_pourcentage_marques.json
# (scripts/marques_dump.ps1 puis cues2marques_gap.py, seuil 0,5 s).
# Outils (non modifiés) : ../6e/prop_commun.py, manim/canvas_proportion.py, la
# base PropTableauBase de ../4e/prop_tableau.py. Ajouté ICI : carre() (le carré
# de 100 %), deux_barres() (le tout puis les produits « zoomés »), karim(),
# ordinateur(), sans(), pas_audit() ; la phrase des réponses à la taille de la
# question (36).
# ⚠️ « 1 200 » et « 2 500 » : l'audit les lit « 1200 » / « 2500 » (fausse alerte
# AUDIT-ABSENT) : ces morceaux sont sortis de l'audit et posés à la main au mot.
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/premiere/prop_lycee_pourcentage_de_pourcentage.py PropLyceePourcentageDePourcentageSeconde
# PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/premiere/prop_lycee_pourcentage_de_pourcentage.py PropLyceePourcentageDePourcentageSeconde -o eleveai-maths-seconde-prop-pourcentage-de-pourcentage --media_dir manim/scripts/premiere/media-prop-lycee-pdp
# Gardes seules : GARDE_SEULE=1 … PropLyceePourcentageDePourcentagePremiere -o garde-premiere-pdp (idem …Stmg -o garde-stmg-pdp)
# python manim/scripts/cm1/frac_cm_commun.py coller <2de.mp4> <garde.mp4> <sortie.mp4>
# Sorties : manim/sorties/seconde/maths/proportionnalite/02-pourcentage-de-pourcentage/eleveai-maths-seconde-prop-pourcentage-de-pourcentage.mp4
#           manim/sorties/premiere/maths/proportionnalite/06-pourcentage-de-pourcentage/eleveai-maths-premiere-prop-pourcentage-de-pourcentage.mp4
#           manim/sorties/stmg/maths/proportionnalite/04-pourcentage-de-pourcentage/eleveai-maths-stmg-prop-pourcentage-de-pourcentage.mp4

import importlib.util
import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))
sys.path.insert(0, str(Path(__file__).resolve().parent))  # le dossier du script EN TÊTE

from prop_commun import *  # noqa: E402,F403


def _charger(nom, chemin):
    spec = importlib.util.spec_from_file_location(nom, chemin)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


_t4 = _charger("prop_tableau_4e", Path(__file__).resolve().parents[1] / "4e" / "prop_tableau.py")
PropTableauBase4e = _t4.PropTableauBase

PROD = "#38bdf8"    # les produits : la bande (bleu)
MP = "#fb923c"      # les places de marché : le petit rectangle (orange)
SERV = "#334155"    # le reste du carré, les services (ardoise)


def sans(m):
    """Un libellé redit (« produits », la source) : ni synchro, ni audit."""
    for f in m.get_family():
        if isinstance(f, Text):
            f.sans_synchro = True
            f._pas_audit = True
    return m


def pas_audit(m):
    for f in m.get_family():
        f._pas_audit = True
        f.sans_synchro = True
    return m


def hors_audit(m):
    """« 1 200 », « 2 500 » : la synchro reste, l'audit (qui lit « 1200 ») non."""
    for f in m.get_family():
        f._pas_audit = True
    return m


def carre(cote=4.0, pb=0.38, pr=0.31, centre=ORIGIN):
    """Le carré de 100 % (le tout), la bande verticale de pb (à gauche) et, en bas
    de la bande, le petit rectangle de pr de sa hauteur : aire = pr × pb.
    .fond .bande .rect .contour ; rien n'est ajouté à la scène."""
    fond = Square(cote, fill_color=SERV, fill_opacity=1, stroke_width=0)
    bande = Rectangle(width=cote * pb, height=cote, fill_color=PROD, fill_opacity=1, stroke_color=NUIT,
                      stroke_width=2).align_to(fond, LEFT)
    rect = Rectangle(width=cote * pb, height=cote * pr, fill_color=MP, fill_opacity=1, stroke_color=NUIT,
                     stroke_width=2).align_to(fond, LEFT).align_to(fond, DOWN)
    contour = Square(cote, stroke_color=WHITE, stroke_width=4)
    g = VGroup(fond, bande, rect, contour).move_to(centre)
    g.fond, g.bande, g.rect, g.contour = fond, bande, rect, contour
    return g


def karim(s=1.0):
    """Karim, analyste : chemise bleu canard, badge, lunettes."""
    p = personne(peau="#8d5524", tenue="#0f766e", cheveux="#111827")
    badge = RoundedRectangle(width=0.36, height=0.22, corner_radius=0.04, fill_color=WHITE, fill_opacity=1,
                             stroke_width=0).move_to(p.corps.get_center() + P(0.25, 0.3))
    p.add(badge, lunettes(p))
    return p.scale(s)


def ordinateur(s=1.0):
    """Un ordinateur portable, un graphique en barres à l'écran."""
    ecran = RoundedRectangle(width=1.5, height=1.0, corner_radius=0.06, fill_color="#0b1220", fill_opacity=1,
                             stroke_color="#cbd5e1", stroke_width=4)
    barres = VGroup(*[Rectangle(width=0.18, height=h, fill_color=c, fill_opacity=1, stroke_width=0)
                      for h, c in ((0.3, SERV), (0.5, PROD), (0.65, MP), (0.42, PROD))])
    barres.arrange(RIGHT, buff=0.1, aligned_edge=DOWN).move_to(ecran).align_to(ecran.get_bottom() + UP * 0.15, DOWN)
    base = Polygon(P(-0.9, -0.55), P(0.9, -0.55), P(0.75, -0.42), P(-0.75, -0.42), fill_color="#cbd5e1",
                   fill_opacity=1, stroke_width=0)
    return VGroup(ecran, barres, base).scale(s)


def deux_barres(largeur=8.0, h=0.7, x=1.9, y1=2.0, y2=0.3):
    """Le tout (175,3 Md€) : produits 38 % (bleu) + services ; dessous, la barre
    des PRODUITS « zoomée » (même largeur), reliée par deux pointillés, dont
    31 % (orange) = les places de marché. Rien n'est ajouté à la scène."""
    tout = Rectangle(width=largeur, height=h, fill_color=SERV, fill_opacity=1, stroke_color=WHITE,
                     stroke_width=3).move_to(P(x, y1))
    prod = Rectangle(width=largeur * 0.38, height=h, fill_color=PROD, fill_opacity=1, stroke_color=NUIT,
                     stroke_width=2).align_to(tout, LEFT).set_y(y1)
    zoom = Rectangle(width=largeur, height=h, fill_color=PROD, fill_opacity=1, stroke_color=WHITE,
                     stroke_width=3).move_to(P(x, y2))
    mp = Rectangle(width=largeur * 0.31, height=h, fill_color=MP, fill_opacity=1, stroke_color=NUIT,
                   stroke_width=2).align_to(zoom, LEFT).set_y(y2)
    liens = VGroup(DashedLine(prod.get_corner(DL), zoom.get_corner(UL), color=PROD, stroke_width=3),
                   DashedLine(prod.get_corner(DR), zoom.get_corner(UR), color=PROD, stroke_width=3))
    g = VGroup(tout, prod, liens, zoom, mp)
    g.tout, g.prod, g.liens, g.zoom, g.mp = tout, prod, liens, zoom, mp
    return g


class PropLyceePourcentageDePourcentageBase(PropTableauBase4e):
    nom_voix = "lycee-prop-pourcentage-de-pourcentage"
    fichier_marques = "prop_lycee_pourcentage_de_pourcentage_marques.json"
    identite = "Maths 2de — EleveAI"
    ceinture = "verte"
    FS_PH = 36     # la phrase des réponses : au moins la taille de la question

    def garde(self, *a, **k):
        """L'identité (« 2de », « 1re ») et l'échelle : décor, ni synchro ni audit."""
        titre, ident, ech = super().garde(*a, **k)
        pas_audit(ident)
        pas_audit(ech)
        return titre, ident, ech

    def play(self, *a, **k):
        if os.environ.get("TRACE") == "1":
            print(f"T {self.renderer.time - getattr(self, '_debut_voix', 0):.2f} {a[0] if a else ''}"[:90], flush=True)
        return super().play(*a, **k)

    def _disposer_q(self, question, choix, phrase):
        """La phrase de la réponse à la taille de la question (36), sous les cartes."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        neuve = VGroup(*[self.t(x, self.FS_PH, VERT_OK) for x in phrase]).arrange(DOWN, buff=0.2,
                                                                                    aligned_edge=LEFT)
        x0, haut = -6.35, getattr(self, "_ph_haut", 0.2)
        if neuve.width > self.XL - 0.35 - x0:
            neuve.scale_to_fit_width(self.XL - 0.35 - x0)
        neuve.align_to(P(x0, 0), LEFT).align_to(P(0, haut), UP)
        self.ph_q = neuve
        return tete, q, cartes, pause, rebours, neuve

    def montre(self, mot, *anims, rt=0.4):
        if mot:
            self.au_mot(*mot) if isinstance(mot, tuple) else self.au_mot(mot)
        self.play(*anims, run_time=rt)

    def titre_haut(self, s, mot, couleur=JAUNE_TITRE, fs=42, x=-0.4):
        self.au_mot(mot)
        tit = self.t(s, fs, couleur).move_to(P(x, 3.1))
        self.play(Write(tit), run_time=0.5)
        return tit

    def lg(self, morceaux, y, fs=40, xl=None):
        """Une ligne de la colonne de droite (non jouée), bornée aux marges."""
        return self.col(self.ligne(morceaux, fs), y, xl)

    def source(self, s):
        src = sans(self.t(s, 22, GREY_B))
        src._bloc = True
        return src.move_to(P(1.6, -3.25))

    @staticmethod
    def acc(mob, s, couleur=WHITE, sens=UP, fs=30):
        br = Brace(mob, sens, buff=0.08, color=couleur)
        t = Text(s, font_size=fs, color=couleur).next_to(br, sens, buff=0.08)
        return br, t

    def poser_carre(self, c, rt=0.9):
        """Le carré, puis sa bande, puis son petit rectangle (sans nombres)."""
        self.play(FadeIn(c.fond), Create(c.contour), run_time=0.4)
        self.play(GrowFromEdge(c.bande, LEFT), run_time=rt / 2)
        self.play(GrowFromEdge(c.rect, DOWN), run_time=rt / 2)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Un pourcentage d'un pourcentage", self.identite, self.ceinture,
                                       y_ech=-2.45)
        self.au_mot("Un pourcentage")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        c = carre(1.9, centre=P(-3.6, -0.3))
        q = self.ligne([("31 %", MP), ("de", WHITE), ("38 %", PROD), ("= ?", AMBRE)], 48).move_to(P(0.9, -0.3))
        self.play(FadeIn(c.fond), Create(c.contour), run_time=0.4)
        self.montre("31 %", FadeIn(q[0], scale=1.3), rt=0.35)
        self.montre("de 38", FadeIn(q[1]), rt=0.2)
        self.montre("38 %", FadeIn(q[2], scale=1.3), GrowFromEdge(c.bande, LEFT), rt=0.4)
        self.montre("cela fait", GrowFromEdge(c.rect, DOWN), rt=0.4)
        self.montre("combien", FadeIn(q[3], scale=1.3), Indicate(c.rect, color=WHITE, scale_factor=1.1), rt=0.5)
        self.attendre_voix(marge=0.6)

    # ── 01 : Karim, 175,3 Md€, produits 38 %, places de marché 31 % ────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = karim(1.0).move_to(P(-5.4, -1.2))
        nom = self.t("Karim", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.3)
        self.montre("Voici Karim", FadeIn(pers, shift=UP * 0.3), FadeIn(nom), rt=0.6)
        met = VGroup(self.t("analyste", 28, BLEU_CALCUL), self.t("du commerce en ligne", 26, BLEU_CALCUL))
        met.arrange(DOWN, buff=0.08).next_to(pers, DOWN, buff=0.15)
        met.shift(RIGHT * max(0, -6.45 - met.get_left()[0]))
        self.montre("analyste", FadeIn(met[0], shift=DOWN * 0.1), rt=0.4)
        ordi = ordinateur(0.85).move_to(P(-3.35, -1.5))
        self.montre("commerce en ligne", FadeIn(met[1], shift=DOWN * 0.1), FadeIn(ordi, shift=UP * 0.2), rt=0.4)
        b = deux_barres(7.8, 0.7, x=2.15, y1=1.85, y2=0.05)
        tete = self.ligne([("En 2024,", WHITE), ("achats en ligne", GREY_B)], 30).next_to(b.tout, UP, buff=0.3)
        sans(tete[1])
        self.montre("En 2024", FadeIn(tete[0], shift=RIGHT * 0.2), rt=0.35)
        self.montre("dépensé", FadeIn(tete[1], shift=RIGHT * 0.2), GrowFromEdge(b.tout, LEFT), rt=0.6)
        br, tt = self.acc(b.tout, "175,3 Md€", WHITE, UP, 32)
        self.montre("175,3", FadeOut(tete), GrowFromCenter(br), FadeIn(tt, scale=1.3), rt=0.5)
        v38 = self.ligne([("38 %", NUIT), ("produits", NUIT)], 26).move_to(b.prod)
        sans(v38[1])
        self.montre("Environ 38", GrowFromEdge(b.prod, LEFT), FadeIn(v38[0], scale=1.2), rt=0.6)
        self.montre("des produits", FadeIn(v38[1]), rt=0.3)
        serv = sans(self.t("services", 26, WHITE)).move_to(b.tout.get_right() + LEFT * b.tout.width * 0.31)
        self.montre("services", FadeIn(serv), rt=0.35)
        self.montre("parmi ces achats", Create(b.liens), GrowFromEdge(b.zoom, LEFT), rt=0.7)
        lz = sans(self.t("les produits", 26, NUIT)).move_to(b.zoom.get_right() + LEFT * b.zoom.width * 0.33)
        self.play(FadeIn(lz), run_time=0.3)
        v31 = self.t("31 %", 30, NUIT).move_to(b.mp)
        self.montre("31 %", GrowFromEdge(b.mp, LEFT), FadeIn(v31, scale=1.3), rt=0.5)
        brm, tm = self.acc(b.mp, "places de marché", MP, DOWN, 30)
        self.montre("places de marché", GrowFromCenter(brm), FadeIn(tm, shift=DOWN * 0.1), rt=0.45)
        self.insister(VGroup(b.mp, v31), 1.1, 0.25)
        self.play(FadeIn(self.source("Source : Fevad, bilan du e-commerce 2024")), run_time=0.3)
        self.attendre_voix()

    # ── 02 : la question du jour : 31 % ? Non ───────────────────────────────
    def ecran_question_du_jour(self):
        self.ecran("02-question-du-jour")
        q = VGroup(self.t("Quelle part de TOUT le commerce en ligne", 36, AMBRE),
                   self.t("passe par les places de marché ?", 36, AMBRE)).arrange(DOWN, buff=0.12)
        q.move_to(P(-0.4, 2.75))
        self.montre("Quelle part", FadeIn(q[0], shift=UP * 0.15), rt=0.45)
        self.montre("passe par", FadeIn(q[1], shift=UP * 0.15), rt=0.4)
        b = deux_barres(7.0, 0.6, x=-0.4, y1=1.35, y2=-0.15)
        l38 = sans(self.t("produits", 24, NUIT)).move_to(b.prod)
        lmp = sans(self.t("31 %", 24, NUIT)).move_to(b.mp)
        self.play(FadeIn(b.tout), FadeIn(b.prod), FadeIn(l38), run_time=0.35)
        self.play(Indicate(b.tout, color=AMBRE, scale_factor=1.03), run_time=0.5)
        faux = self.t("31 % ?", 44, ROUGE_P).move_to(P(-3.6, -1.4))
        self.montre("31 % ?", FadeIn(faux, scale=1.3), rt=0.4)
        non = self.t("Non !", 44, ROUGE_ERREUR).next_to(faux, RIGHT, buff=0.5)
        self.montre("Non", FadeIn(non, scale=1.3), Create(croix(faux, sw=6)), rt=0.45)
        l2 = self.lg([("31 %", MP), ("d'une partie seulement :", WHITE), ("les produits", PROD)], -2.35, 36,
                     xl=-5.9)
        self.montre(("31 %", 2), FadeIn(l2[0], scale=1.3), Create(b.liens), GrowFromEdge(b.zoom, LEFT), rt=0.6)
        self.montre("d'une partie", FadeIn(l2[1], shift=RIGHT * 0.15), GrowFromEdge(b.mp, LEFT), FadeIn(lmp),
                    rt=0.5)
        self.montre("les produits", FadeIn(l2[2], scale=1.2), Indicate(b.prod, color=WHITE, scale_factor=1.06),
                    rt=0.5)
        self.attendre_voix()

    # ── 03 : le carré de 100 % ──────────────────────────────────────────────
    def ecran_carre(self):
        self.ecran("03-carre")
        c = carre(4.4, centre=P(-2.75, -0.05))
        b100, t100 = self.acc(c.contour, "100 %", WHITE, UP, 34)
        xl = 0.45
        L1 = self.lg([("Le tout :", WHITE), ("100 %", WHITE)], 2.2, 40, xl)
        self.montre("le tout", FadeIn(L1[0], shift=RIGHT * 0.15), FadeIn(c.fond), Create(c.contour), rt=0.5)
        self.montre("100 %", FadeIn(L1[1], scale=1.3), GrowFromCenter(b100), FadeIn(t100, scale=1.3), rt=0.45)
        L2 = self.lg([("Les produits :", PROD), ("38 %", PROD)], 1.3, 40, xl)
        b38, t38 = self.acc(c.bande, "38 %", PROD, DOWN, 34)
        self.montre("Les produits", FadeIn(L2[0], shift=RIGHT * 0.15), GrowFromEdge(c.bande, LEFT), rt=0.6)
        self.montre("38 %", FadeIn(L2[1], scale=1.3), GrowFromCenter(b38), FadeIn(t38, scale=1.3), rt=0.45)
        L3 = self.lg([("Dans la bande :", MP), ("31 %", MP)], 0.4, 40, xl)
        b31, t31 = self.acc(c.rect, "31 %", MP, LEFT, 34)
        self.montre("Dans cette bande", FadeIn(L3[0], shift=RIGHT * 0.15), Indicate(c.bande, color=WHITE,
                                                                                  scale_factor=1.03), rt=0.5)
        self.montre("31 %", FadeIn(L3[1], scale=1.3), GrowFromEdge(c.rect, DOWN), GrowFromCenter(b31),
                    FadeIn(t31, scale=1.3), rt=0.6)
        self.montre("un petit rectangle", Indicate(c.rect, color=WHITE, scale_factor=1.1), rt=0.6)
        L4 = self.lg([("Sa part du carré :", WHITE)], -0.75, 40, xl)
        L5 = self.lg([("31 % de 38 %", AMBRE)], -1.6, 48, xl + 0.3)
        cad = SurroundingRectangle(L5, color=AMBRE, buff=0.18, corner_radius=0.12, stroke_width=5)
        self.montre("Sa part", FadeIn(L4, shift=RIGHT * 0.15), rt=0.4)
        self.montre("c'est 31", FadeIn(L5, scale=1.2), Create(cad), rt=0.5)
        self.insister(VGroup(c.rect), 1.15, 0.25)
        self.attendre_voix()

    # ── 04 : le calcul : un produit ; vérification en euros ────────────────
    def ecran_calcul(self):
        self.ecran("04-calcul")
        c = carre(2.6, centre=P(-4.75, 1.3))
        self.add(c)
        xl = -2.3
        L1 = self.lg([("Un pourcentage d'un pourcentage", WHITE), ("= un produit", AMBRE)], 2.75, 34, xl)
        self.montre("Un pourcentage", FadeIn(L1[0], shift=RIGHT * 0.15), rt=0.45)
        self.montre("produit", FadeIn(L1[1], scale=1.2), rt=0.4)
        L2 = self.lg([("0,31 ×", MP), ("0,38", PROD), ("= 0,1178", WHITE)], 1.6, 48, xl + 1.2)
        self.jouer(L2, ["0,31", "0,38", "0,1178"])
        L3 = self.lg([("≈ 11,8 %", VERT_OK)], 0.6, 52, xl + 3.6)
        p = self.t("11,8 %", 19, NUIT).move_to(c.rect)
        self.montre("environ 11,8", FadeIn(L3, scale=1.3), FadeIn(p, scale=1.3), rt=0.45)
        cad = SurroundingRectangle(L3, color=VERT_OK, buff=0.15, corner_radius=0.1)
        self.play(Create(cad), Indicate(c.rect, color=WHITE, scale_factor=1.12), run_time=0.5)
        L4 = self.lg([("Vérification en euros :", GREY_B)], -0.85, 36, -5.9)
        self.montre("Vérification", FadeIn(L4, shift=RIGHT * 0.15), rt=0.4)
        L5 = self.lg([("≈ 20,7 Md€", MP), ("÷", WHITE), ("175,3 Md€", WHITE), ("≈ 11,8 %", VERT_OK)], -1.65, 44,
                     -5.9)
        self.jouer(L5, ["environ 20,7", None, "175,3", ("encore 11,8")])
        self.insister(L5[3], 1.12, 0.2)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (50 % de 40 %) ──────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        c = carre(2.4, 0.4, 0.5, centre=P(-4.6, 1.85))
        self._ph_haut = 0.25

        def avant(sc):
            sc.play(FadeIn(c.fond), Create(c.contour), FadeIn(c.bande), run_time=0.4)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["0,5 ×", "0,4 =", "0,2", "= 20 %."])
            for m, mot in zip(l0, ["0,5 fois", "fois 0,4", "égale 0,2", "soit 20"]):
                sc.montre(mot, FadeIn(m, shift=UP * 0.12), rt=0.3)
            p = sc.t("20 %", 26, NUIT).move_to(c.rect)
            sc.play(GrowFromEdge(c.rect, DOWN), FadeIn(p, scale=1.3), run_time=0.5)
            l1 = sc.ligne_rep(1, ["A : on additionne."])
            sc.montre("A additionne", FadeIn(l1[0]), rt=0.3)
            l2 = sc.ligne_rep(2, ["C : 50 × 40,", "sans décimal."])
            sc.montre("C multiplie", FadeIn(l2[0], shift=UP * 0.12), rt=0.3)
            sc.montre("sans les", FadeIn(l2[1], shift=UP * 0.12), rt=0.3)
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse",
                            ["Combien font", "50 % de 40 % ?"],
                            [self.t("90 %", 34), self.t("20 %", 34), self.t("2 000 %", 34)], 1,
                            ["0,5 × 0,4 = 0,2 = 20 %.", "A : on additionne.", "C : 50 × 40, sans décimal."],
                            mot_q="Combien", avant_q=avant, autres_r=apres)

    # ── 06 : le piège : 38 + 31 = 69 %, barré ───────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.titre_haut("Attention au piège !", "Attention", couleur=ROUGE_ERREUR, fs=44)
        c = carre(3.6, centre=P(-3.1, -0.6))
        b38, t38 = self.acc(c.bande, "38 %", PROD, UP, 30)
        b31, t31 = self.acc(c.rect, "31 %", MP, LEFT, 30)
        fig = VGroup(c, b38, t38, b31, t31)
        sans(fig)
        self.play(FadeIn(fig), run_time=0.4)
        xl = -0.75
        L1 = self.lg([("On n'additionne jamais", ROUGE_P)], 2.35, 38, xl)
        L1b = self.lg([("deux pourcentages", WHITE)], 1.8, 38, xl)
        self.montre("On n'additionne", FadeIn(L1, shift=RIGHT * 0.15), rt=0.4)
        self.montre("deux pourcentages", FadeIn(L1b, shift=RIGHT * 0.15), rt=0.35)
        L2 = self.lg([("qui ne portent pas", WHITE)], 1.25, 38, xl)
        L2b = self.lg([("sur le même tout.", AMBRE)], 0.7, 38, xl)
        self.montre("qui ne portent", FadeIn(L2, shift=RIGHT * 0.15), rt=0.35)
        self.montre("même tout", FadeIn(L2b, shift=RIGHT * 0.15), Indicate(c.contour, color=AMBRE,
                                                                          scale_factor=1.03), rt=0.5)
        ya = c.rect.get_y()
        L3 = self.lg([("38 +", PROD), ("31 =", MP), ("69 %", ROUGE_P)], ya, 44, xl + 0.35)
        fl = Arrow(L3.get_left() + LEFT * 0.1, c.rect.get_right() + RIGHT * 0.05, buff=0.05, color=ROUGE_P,
                   stroke_width=5, max_tip_length_to_length_ratio=0.3)
        self.montre("38 plus", FadeIn(L3[0], shift=RIGHT * 0.15), GrowArrow(fl), rt=0.35)
        self.montre("31, égale", FadeIn(L3[1], shift=RIGHT * 0.15), rt=0.3)
        g69 = DashedVMobject(Rectangle(width=c.contour.width * 0.69, height=c.contour.height, color=ROUGE_P,
                                       stroke_width=6).align_to(c.contour, LEFT).align_to(c.contour, DOWN),
                             num_dashes=60)
        self.montre("69 %", FadeIn(L3[2], scale=1.3), Create(g69), rt=0.6)
        fx = self.t("faux !", 40, ROUGE_ERREUR).next_to(L3, DOWN, buff=0.3).align_to(L3, LEFT)
        self.montre("c'est faux", Create(croix(L3, sw=6)), FadeIn(fx, scale=1.3), FadeOut(g69), rt=0.5)
        L4 = self.lg([("Le petit rectangle", MP), ("<", WHITE), ("la bande", PROD)], -0.15, 38, xl)
        self.montre("Le petit rectangle", FadeIn(L4[0], shift=RIGHT * 0.15), Indicate(c.rect, color=WHITE,
                                                                                    scale_factor=1.1), rt=0.5)
        self.montre("que la bande", FadeIn(L4[1]), FadeIn(L4[2], shift=RIGHT * 0.15),
                    Indicate(c.bande, color=WHITE, scale_factor=1.04), rt=0.5)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (lycée de 1 200 élèves) ─────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        c = carre(2.0, 0.3, 0.25, centre=P(-5.3, 2.05))
        xd = -4.0
        self._ph_haut = 0.55

        def avant(sc):
            sc.play(FadeIn(c.fond), Create(c.contour), run_time=0.3)

        def donnees(sc):
            d1 = hors_audit(sc.lg([("1 200 élèves", WHITE)], 2.75, 30, xd))
            d2 = sc.lg([("30 %", PROD), ("en terminale", PROD)], 2.1, 30, xd)
            d3 = sc.lg([("25 % d'entre eux", MP), ("internes", MP)], 1.45, 30, xd)
            if d3.get_right()[0] > sc.XL - 0.3:
                d3.scale_to_fit_width(sc.XL - 0.3 - xd).align_to(P(xd, 0), LEFT)
            sc.au_mot("1 200")
            sc.play(FadeIn(d1, shift=RIGHT * 0.15), run_time=0.3)
            sc.au_mot("30 %")
            sc.play(FadeIn(d2, shift=RIGHT * 0.15), GrowFromEdge(c.bande, LEFT), run_time=0.4)
            sc.au_mot("25 %")
            sc.play(FadeIn(d3, shift=RIGHT * 0.15), GrowFromEdge(c.rect, DOWN), run_time=0.4)

        def avant_q(sc):
            avant(sc)
            donnees(sc)
            sc.au_mot("Combien d'internes")

        def apres(sc):
            l0 = sc.ligne_rep(0, ["0,3 ×", "0,25 =", "0,075", "= 7,5 %"])
            for m, mot in zip(l0, ["0,3 fois", "fois 0,25", "égale 0,075", "soit 7,5"]):
                sc.montre(mot, FadeIn(m, shift=UP * 0.12), rt=0.3)
            p = sc.t("7,5 %", 22, WHITE).next_to(c.rect, RIGHT, buff=0.12)
            sc.play(FadeIn(p, scale=1.3), Indicate(c.rect, color=WHITE, scale_factor=1.15), run_time=0.45)
            l1 = sc.ligne_rep(1, ["0,075 ×", "1 200 =", "90 élèves."])
            hors_audit(l1[1])
            for m, mot in zip(l1, ["0,075 fois", "fois 1 200", "égale 90"]):
                sc.montre(mot, FadeIn(m, shift=UP * 0.12), rt=0.3)
            l2 = sc.ligne_rep(2, ["B : 30 + 25 %."])
            sc.montre("B additionne", FadeIn(l2[0]), rt=0.3)
            l3 = sc.ligne_rep(3, ["C : 25 %", "de tout le lycée."])
            sc.montre("25 % de tout", FadeIn(l3[0], shift=UP * 0.12), rt=0.3)
            sc.montre("de tout", FadeIn(l3[1], shift=UP * 0.12), rt=0.3)
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse",
                            ["Combien d'internes", "en terminale ?"],
                            [self.t("90", 34), self.t("660", 34), self.t("300", 34)], 0,
                            ["0,3 × 0,25 = 0,075 = 7,5 %", "0,075 × 1 200 = 90 élèves.",
                             "B : 30 + 25 %.", "C : 25 % de tout le lycée."],
                            avant_q=avant_q, autres_r=apres)

    # ── 08 : défi (cadres, télétravail) ─────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.titre_haut("À toi de jouer !", "À toi de jouer", fs=50)
        c = carre(3.4, 0.4, 0.15, centre=P(-4.4, 0.2))
        self.play(FadeIn(c.fond), Create(c.contour), run_time=0.4)
        xl = -2.15
        L0 = self.lg([("Une entreprise :", WHITE)], 2.2, 38, xl)
        self.montre("Dans une entreprise", FadeIn(L0, shift=RIGHT * 0.15), rt=0.35)
        L1 = self.lg([("40 %", PROD), ("des salariés", PROD), ("sont cadres,", WHITE)], 1.4, 38, xl)
        self.montre("40 %", FadeIn(L1[0], scale=1.3), GrowFromEdge(c.bande, LEFT), rt=0.45)
        self.montre("des salariés", FadeIn(L1[1], shift=RIGHT * 0.15), rt=0.3)
        self.montre("sont cadres", FadeIn(L1[2], shift=RIGHT * 0.15), rt=0.3)
        L2 = self.lg([("15 %", MP), ("des cadres", MP), ("télétravaillent.", WHITE)], 0.6, 38, xl)
        self.montre("15 %", FadeIn(L2[0], scale=1.3), GrowFromEdge(c.rect, DOWN), rt=0.45)
        self.montre("des cadres", FadeIn(L2[1], shift=RIGHT * 0.15), rt=0.3)
        self.montre("télétravaillent", FadeIn(L2[2], shift=RIGHT * 0.15), rt=0.3)
        L3 = self.lg([("Un :", AMBRE), ("quelle part des salariés ?", AMBRE)], -0.3, 38, xl)
        self.montre("Quelle part", FadeIn(L3, shift=RIGHT * 0.15), Indicate(c.rect, color=WHITE, scale_factor=1.2),
                    rt=0.45)
        L4 = self.lg([("Deux :", AMBRE), ("sur 2 500 salariés,", WHITE), ("combien ?", AMBRE)], -1.1, 38, xl)
        hors_audit(L4[1])
        self.montre("Et sur", FadeIn(L4[0], shift=RIGHT * 0.15), rt=0.3)
        self.montre("2 500", FadeIn(L4[1], shift=RIGHT * 0.15), rt=0.35)
        self.montre("combien de personnes", FadeIn(L4[2], scale=1.2), rt=0.35)
        self.pause_defi(y=-2.1)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = sans(self.t("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.15)))
        c = carre(3.0, 0.4, 0.15, centre=P(-3.65, 0.2))
        b40, t40 = self.acc(c.bande, "40 %", PROD, UP, 28)
        b15, t15 = self.acc(c.rect, "15 %", MP, LEFT, 28)
        xl = -1.85
        L1 = self.lg([("Un :", AMBRE), ("0,4 ×", PROD), ("0,15 =", MP), ("0,06", WHITE), ("= 6 %", VERT_OK)], 1.6,
                     40, xl)
        L2 = self.lg([("Deux :", AMBRE), ("0,06 ×", WHITE), ("2 500 =", WHITE), ("150", VERT_OK)], 0.2, 40, xl)
        self.add(tit, sans(VGroup(c, b40, t40, b15, t15)), sans(L1[0]), sans(L2[0]))
        p = self.t("6 %", 22, NUIT).move_to(c.rect)
        self.jouer(VGroup(*L1[1:]), ["0,4 fois", "fois 0,15", "égale 0,06", "soit 6"], extra={3: [FadeIn(p, scale=1.3)]})
        self.play(Create(SurroundingRectangle(L1[4], color=VERT_OK, buff=0.12, corner_radius=0.1)), run_time=0.35)
        hors_audit(L2[2])
        self.jouer(VGroup(*L2[1:]), ["0,06 fois", "fois 2 500", "égale 150"])
        L3 = self.lg([("150 personnes", VERT_OK)], -0.85, 44, xl + 2.2)
        self.play(FadeIn(L3, scale=1.2), run_time=0.35)
        self.play(Create(SurroundingRectangle(L3, color=VERT_OK, buff=0.15, corner_radius=0.1)), run_time=0.35)
        self.insister(L3, 1.1, 0.2)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        c = carre(2.6, centre=P(-4.0, -0.4))
        b38, t38 = self.acc(c.bande, "38 %", PROD, UP, 26)
        b31, t31 = self.acc(c.rect, "31 %", MP, LEFT, 26)
        fig = sans(VGroup(c, b38, t38, b31, t31))
        self.add(fig)
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        lignes = VGroup()
        for morceaux in [("Un pourcentage d'un pourcentage :", "on multiplie les deux, en décimal."),
                         ("Le résultat est plus petit", "que chacune."), ("On ne les additionne jamais.",)]:
            bloc = VGroup(*[self.t(x, 38) for x in morceaux]).arrange(DOWN, aligned_edge=LEFT, buff=0.1)
            lignes.add(VGroup(self.coche(), bloc).arrange(RIGHT, buff=0.25))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.45)
        if lignes.width > self.BORD_X - 0.1 + 2.2:
            lignes.scale_to_fit_width(self.BORD_X - 0.1 + 2.2)
        lignes.align_to(P(-2.2, 0), LEFT).align_to(P(0, 2.35), UP)
        self.au_mot("Un pourcentage")
        self.montrer_ligne(lignes[0], Indicate(c.rect, color=WHITE, scale_factor=1.1))
        self.au_mot("Le résultat")
        self.montrer_ligne(lignes[1])
        self.au_mot("On ne les")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        ecrans = [self.page_de_garde, self.ecran_situation, self.ecran_question_du_jour, self.ecran_carre,
                  self.ecran_calcul, self.ecran_question1, self.ecran_piege, self.ecran_question2, self.ecran_defi,
                  self.ecran_correction, self.ecran_finale]
        if os.environ.get("GARDE_SEULE") == "1":  # la garde 1re / STMG seule (voir l'en-tête)
            ecrans[0]()
            return
        seuls = os.environ.get("ECRANS")  # mise au point : ECRANS=ecran_piege,ecran_correction
        for e in ecrans:
            if not seuls or e.__name__ in seuls.split(","):
                e()
        if not seuls:
            self.page_abonnement("10-abonne")


class PropLyceePourcentageDePourcentageSeconde(PropLyceePourcentageDePourcentageBase):
    identite = "Maths 2de — EleveAI"
    ceinture = "verte"


class PropLyceePourcentageDePourcentagePremiere(PropLyceePourcentageDePourcentageBase):
    identite = "Maths 1re — EleveAI"
    ceinture = "orange"


class PropLyceePourcentageDePourcentageStmg(PropLyceePourcentageDePourcentageBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "orange"
