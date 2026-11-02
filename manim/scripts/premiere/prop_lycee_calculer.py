# prop_lycee_calculer.py
# EleveAI — Maths 1re (automatismes) ET STMG — série « Proportionnalité »,
# LYCÉE, épisode COMMUN 01 : CALCULER UNE PROPORTION (micro du coach :
# auto_prop_calculer, notion auto_proportion, en 1re et en STMG), AVEC VOIX.
# Paysage 16:9, CEINTURE JAUNE (automatisme) pour les deux classes ; seules
# l'identité (« Maths 1re — EleveAI » / « Maths STMG — EleveAI ») et la garde
# changent. Short jumeau : prop_lycee_calculer_short.py (blanche).
# ⭐ Méthode travaillée : proportion = partie ÷ tout ; × 100 pour l'écrire en
# pourcentage ; une proportion est toujours entre 0 et 1 (0 % et 100 %).
# « ÷ » et « × » écrits, jamais 361,7/539 ; décimaux à la virgule.
# ⭐ Leurres (les erreurs dites par la voix) : recopier la partie sans diviser
# (question 1 B 75,1 % ; question 2 B 46,8 %) ; diviser le tout par la partie,
# l'inverse (question 1 C 7,2) ; diviser par le RESTE au lieu du tout (piège
# 06 : 204 % ; question 2 C 9,5 % = 46,8 ÷ 492,2).
#
# Décor et métier : Léa, INGÉNIEURE chez le gestionnaire du réseau électrique
# (casque de chantier, pylône). Centres : sciences, nature-ecologie.
# Source (en bas de l'écran de situation) : RTE, Bilan électrique 2024,
# principaux résultats : nucléaire 361,7 TWh (67,1 %), hydraulique 75,1 TWh
# (13,9 %), éolien 46,8 TWh (8,7 %), solaire 24,8 TWh (4,6 %) ; production
# totale ≈ 539 TWh. La barre « autres » (gaz, bioénergies…) = 539 − 508,4.
#
# Écrans : 00 garde · 01 Léa, 361,7 sur 539 · 02 partie ÷ tout · 03 le calcul
# (0,671 → 67,1 %) · 04 entre 0 et 1 · 05 QUESTION 1 (hydraulique) · 06 le
# piège du reste (204 %) · 07 QUESTION 2 (éolien) · 08 défi (solaire ;
# nucléaire + hydraulique) · 08b correction · 09 ce que tu as appris · 10 fin.
#
# Voix : manim/voix/lycee-prop-calculer.json (validée par Frédéric le 02/11,
# débit −10, ne cite aucune classe), WAV dans public/sons/lycee-prop-calculer/ ;
# marques : manim/scripts/premiere/prop_lycee_calculer_marques.json
# (scripts/marques_dump.ps1 puis cues2marques_gap.py, seuil 0,5 s).
# Outils : ../6e/prop_commun.py + manim/canvas_proportion.py (non modifiés) ;
# base PropTableauBase de ../4e/prop_tableau.py (ligne_rep bornée, lc, jouer,
# coche loin du texte des choix). Ajouté ICI : barre_mix() (la barre de
# 539 TWh découpée par source), lea(), pylone(), barrage(), eolienne(),
# soleil(), sans(), pas_audit().
#
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/premiere/prop_lycee_calculer.py PropLyceeCalculerPremiere
# PYTHONIOENCODING=utf-8 python -m manim render -qh --disable_caching manim/scripts/premiere/prop_lycee_calculer.py PropLyceeCalculerPremiere -o eleveai-maths-premiere-prop-calculer --media_dir manim/scripts/premiere/media-prop-lycee-calculer
# Garde STMG seule : GARDE_SEULE=1 python -m manim render -qh --disable_caching manim/scripts/premiere/prop_lycee_calculer.py PropLyceeCalculerStmg -o garde-stmg-prop-calculer --media_dir manim/scripts/premiere/media-prop-lycee-calculer
# python manim/scripts/cm1/frac_cm_commun.py coller <1re.mp4> <garde-stmg.mp4> <stmg.mp4>
# Sorties : manim/sorties/premiere/maths/proportionnalite/01-calculer/eleveai-maths-premiere-prop-calculer.mp4
#           manim/sorties/stmg/maths/proportionnalite/01-calculer/eleveai-maths-stmg-prop-calculer.mp4

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

NUC = "#a78bfa"     # nucléaire (violet)
HYD = "#38bdf8"     # hydraulique (bleu)
EOL = "#34d399"     # éolien (vert)
SOL = "#fbbf24"     # solaire (jaune)
AUT = "#64748b"     # autres (gris)
RESTE = "#94a3b8"   # le reste, hors nucléaire
TOTAL = 539.0


def sans(m):
    """Un libellé redit partout (« nucléaire », la source) : ni synchro, ni audit."""
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


def barre_mix(parts, largeur=10.0, h=0.8, total=TOTAL, centre=ORIGIN):
    """La barre du tout (total TWh) découpée en segments (valeur, couleur).
    .segs[i] · .cadre ; rien n'est ajouté à la scène."""
    x = -largeur / 2
    segs = VGroup()
    for v, c in parts:
        w = largeur * v / total
        segs.add(Rectangle(width=w, height=h, fill_color=c, fill_opacity=1, stroke_color=NUIT,
                           stroke_width=2).move_to(P(x + w / 2, 0)))
        x += w
    cadre = Rectangle(width=largeur, height=h, stroke_color=WHITE, stroke_width=3)
    g = VGroup(segs, cadre).move_to(centre)
    g.segs, g.cadre = segs, cadre
    return g


def mix_complet(largeur=10.0, h=0.8, centre=ORIGIN):
    return barre_mix([(361.7, NUC), (75.1, HYD), (46.8, EOL), (24.8, SOL), (TOTAL - 508.4, AUT)],
                     largeur, h, centre=centre)


def casque_chantier(p, couleur=WHITE):
    c, r = p.tete.get_center(), p.tete.width / 2
    calotte = AnnularSector(inner_radius=0, outer_radius=r * 1.05, angle=PI, start_angle=0, fill_color=couleur,
                            fill_opacity=1, stroke_color="#cbd5e1", stroke_width=2).move_to(c + UP * r * 0.75)
    bord = RoundedRectangle(width=r * 2.5, height=r * 0.22, corner_radius=0.03, fill_color=couleur, fill_opacity=1,
                            stroke_width=0).move_to(c + UP * r * 0.45)
    return VGroup(calotte, bord)


def lea(s=1.0):
    """Léa, ingénieure du réseau : gilet orange, casque de chantier blanc."""
    p = personne(peau="#f1c27d", tenue="#ea580c", cheveux="#78350f", longs=True)
    bande = Rectangle(width=p.corps.width * 0.85, height=0.08, fill_color="#e5e7eb", fill_opacity=1,
                      stroke_width=0).move_to(p.corps.get_center() + DOWN * 0.05)
    p.add(bande, casque_chantier(p))
    return p.scale(s)


def pylone(s=1.0, couleur="#cbd5e1"):
    """Un pylône électrique en treillis, deux bras, des câbles."""
    pied = VGroup(Line(P(-0.45, -1.0), P(0, 0.9)), Line(P(0.45, -1.0), P(0, 0.9)),
                  Line(P(-0.3, -0.45), P(0.3, -0.45)), Line(P(-0.18, 0.05), P(0.18, 0.05)),
                  Line(P(-0.3, -0.45), P(0.18, 0.05)), Line(P(0.3, -0.45), P(-0.18, 0.05)))
    bras = VGroup(Line(P(-0.7, 0.55), P(0.7, 0.55)), Line(P(-0.5, 0.85), P(0.5, 0.85)))
    isol = VGroup(*[Line(P(x, y), P(x, y - 0.15)) for x, y in ((-0.65, 0.55), (0.65, 0.55), (-0.45, 0.85),
                                                                (0.45, 0.85))])
    g = VGroup(pied, bras, isol).set_stroke(couleur, 4)
    return g.scale(s)


def barrage(s=1.0):
    """Un barrage-voûte, son lac et l'eau qui sort au pied."""
    mur = Polygon(P(-0.7, -0.6), P(0.7, -0.6), P(0.5, 0.6), P(-0.5, 0.6), fill_color="#cbd5e1", fill_opacity=1,
                  stroke_color="#94a3b8", stroke_width=2)
    lac = Rectangle(width=1.0, height=0.35, fill_color=HYD, fill_opacity=1, stroke_width=0).move_to(P(0, 0.75))
    jet = VGroup(*[Line(P(x, -0.3), P(x + 0.05, -0.85), stroke_color=HYD, stroke_width=5) for x in (-0.15, 0, 0.15)])
    return VGroup(lac, mur, jet).scale(s)


def eolienne(s=1.0):
    """Une éolienne : mât blanc, trois pales."""
    mat = Polygon(P(-0.06, -1.0), P(0.06, -1.0), P(0.03, 0.6), P(-0.03, 0.6), fill_color=WHITE, fill_opacity=1,
                  stroke_width=0)
    pales = VGroup(*[Polygon(P(0, 0), P(0.07, 0.15), P(0.0, 0.85), P(-0.05, 0.15), fill_color=WHITE, fill_opacity=1,
                             stroke_width=0).rotate(a, about_point=ORIGIN) for a in (0, 2 * PI / 3, 4 * PI / 3)])
    pales.shift(P(0, 0.6))
    moyeu = Circle(radius=0.07, fill_color=EOL, fill_opacity=1, stroke_width=0).move_to(P(0, 0.6))
    return VGroup(mat, pales, moyeu).scale(s)


def soleil(s=1.0):
    disque = Circle(radius=0.35, fill_color=SOL, fill_opacity=1, stroke_width=0)
    rayons = VGroup(*[Line(P(0.45, 0), P(0.65, 0), stroke_color=SOL, stroke_width=5).rotate(a, about_point=ORIGIN)
                      for a in np.arange(0, 2 * PI, PI / 4)])
    return VGroup(rayons, disque).scale(s)


def part_gauche(bar, v, couleur, total=TOTAL, depuis=0.0):
    """Un segment de la barre `bar` (barre_mix), de `depuis` à depuis + v TWh."""
    L = bar.cadre.width
    w = L * v / total
    x0 = bar.cadre.get_left()[0] + L * depuis / total
    return Rectangle(width=w, height=bar.cadre.height, fill_color=couleur, fill_opacity=1, stroke_color=NUIT,
                     stroke_width=2).move_to(P(x0 + w / 2, bar.cadre.get_y()))


class PropLyceeCalculerBase(PropTableauBase4e):
    nom_voix = "lycee-prop-calculer"
    fichier_marques = "prop_lycee_calculer_marques.json"
    identite = "Maths 1re — EleveAI"
    ceinture = "jaune"

    def garde(self, *a, **k):
        """L'identité (« 1re » porte un 1) et l'échelle : décor, ni synchro ni audit."""
        titre, ident, ech = super().garde(*a, **k)
        pas_audit(ident)
        pas_audit(ech)
        return titre, ident, ech

    def play(self, *a, **k):
        if os.environ.get("TRACE") == "1":
            print(f"T {self.renderer.time - getattr(self, '_debut_voix', 0):.2f} {a[0] if a else ''}"[:90], flush=True)
        return super().play(*a, **k)

    def montre(self, mot, *anims, rt=0.4):
        if mot:
            self.au_mot(*mot) if isinstance(mot, tuple) else self.au_mot(mot)
        self.play(*anims, run_time=rt)

    def titre_haut(self, s, mot, couleur=JAUNE_TITRE, fs=42, x=-0.4):
        self.au_mot(mot)
        tit = self.t(s, fs, couleur).move_to(P(x, 3.1))
        self.play(Write(tit), run_time=0.5)
        return tit

    def barre_nuc(self, largeur=9.0, h=0.75, centre=ORIGIN):
        """Le tout (gris) et la partie nucléaire (violet) : (barre, segment)."""
        bar = barre_mix([(TOTAL, RESTE)], largeur, h, centre=centre)
        return bar, part_gauche(bar, 361.7, NUC)

    @staticmethod
    def acc(mob, s, couleur=WHITE, sens=UP, fs=30):
        br = Brace(mob, sens, buff=0.08, color=couleur)
        t = Text(s, font_size=fs, color=couleur).next_to(br, sens, buff=0.08)
        return br, t

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Calculer une proportion", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Calculer")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        bar = mix_complet(9.0, 0.7, centre=P(-0.3, 0.2))
        self.play(LaggedStart(*[GrowFromEdge(s, LEFT) for s in bar.segs], lag_ratio=0.3), Create(bar.cadre),
                  run_time=1.0)
        q = self.t("Quelle part du tout représente une partie ?", 36, AMBRE).move_to(P(-0.3, 1.35))
        self.montre("Quelle part", FadeIn(q, shift=UP * 0.15), rt=0.5)
        self.au_mot("une partie")
        self.play(Indicate(bar.segs[0], color=WHITE, scale_factor=1.06), run_time=0.7)
        self.attendre_voix(marge=0.6)

    # ── 01 : Léa, 361,7 TWh sur 539 ─────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = lea(1.0).move_to(P(-5.4, -1.2))
        nom = self.t("Léa", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.3)
        self.montre("Voici Léa", FadeIn(pers, shift=UP * 0.3), FadeIn(nom), rt=0.6)
        met = VGroup(self.t("ingénieure", 28, BLEU_CALCUL), self.t("du réseau électrique", 26, BLEU_CALCUL))
        met.arrange(DOWN, buff=0.08).next_to(pers, DOWN, buff=0.15)
        met.shift(RIGHT * max(0, -6.5 - met.get_left()[0]))
        self.montre("ingénieure", FadeIn(met[0], shift=DOWN * 0.1), rt=0.4)
        py = pylone(0.9).move_to(P(-3.3, -1.3))
        self.montre("réseau", FadeIn(met[1], shift=DOWN * 0.1), FadeIn(py, shift=UP * 0.2), rt=0.4)
        bar, nuc = self.barre_nuc(8.4, 0.8, centre=P(1.75, 1.55))
        tete = self.ligne([("En 2024,", WHITE), ("électricité produite en France", GREY_B)], 30)
        sans(tete[1])
        tete.next_to(bar.cadre, UP, buff=0.3)
        self.montre("En 2024", FadeIn(tete[0], shift=RIGHT * 0.2), rt=0.35)
        self.montre("France", FadeIn(tete[1], shift=RIGHT * 0.2), GrowFromEdge(bar, LEFT), rt=0.7)
        br, tt = self.acc(bar.cadre, "≈ 539 TWh", WHITE, DOWN, 34)
        self.montre("539", GrowFromCenter(br), FadeIn(tt, scale=1.3), rt=0.5)
        lnuc = sans(self.t("nucléaire", 28, NUC)).next_to(nuc, UP, buff=0.12)
        self.au_mot("Le nucléaire")
        self.play(GrowFromEdge(nuc, LEFT), FadeOut(tete), FadeIn(lnuc), run_time=0.7)
        v = self.t("361,7 TWh", 30, NUIT).move_to(nuc)
        self.montre("361,7", FadeIn(v, scale=1.3), rt=0.4)
        self.insister(v, 1.15, 0.25)
        q = self.t("Quelle part vient du nucléaire ?", 38, ORANGE_RETENUE).move_to(P(1.75, -1.15))
        self.montre("Quelle part", FadeIn(q, scale=1.15), rt=0.45)
        self.play(Circumscribe(q, color=AMBRE, buff=0.12), run_time=0.8)
        src = sans(self.t("Source : RTE, Bilan électrique 2024", 22, GREY_B)).move_to(P(1.2, -3.25))
        self.play(FadeIn(src), run_time=0.3)
        self.attendre_voix()

    # ── 02 : proportion = partie ÷ tout ─────────────────────────────────────
    def ecran_methode(self):
        self.ecran("02-methode")
        f = self.ligne([("Proportion", AMBRE), ("=", WHITE), ("partie", NUC), ("÷", WHITE), ("tout", WHITE)], 50)
        f.move_to(P(-0.4, 2.7))
        cad = SurroundingRectangle(f, color=AMBRE, buff=0.22, corner_radius=0.12, stroke_width=5)
        self.montre("Une proportion", FadeIn(f[0], shift=RIGHT * 0.2), FadeIn(f[1]), rt=0.4)
        self.montre("la partie", FadeIn(f[2], scale=1.3), rt=0.35)
        self.montre("divisée", FadeIn(f[3], scale=1.3), rt=0.3)
        self.montre("le tout", FadeIn(f[4], scale=1.3), Create(cad), rt=0.45)
        bar, nuc = self.barre_nuc(9.0, 0.8, centre=P(-0.4, 0.2))
        self.play(FadeIn(bar), FadeIn(nuc), run_time=0.4)
        brp = Brace(nuc, UP, buff=0.08, color=NUC)
        lp = self.ligne([("partie :", NUC), ("361,7 TWh", NUC)], 32).next_to(brp, UP, buff=0.08)
        self.montre("La partie", GrowFromCenter(brp), FadeIn(lp[0], shift=RIGHT * 0.15),
                    Indicate(nuc, color=WHITE, scale_factor=1.04), rt=0.45)
        self.montre("361,7", FadeIn(lp[1], scale=1.3), rt=0.35)
        brt = Brace(bar.cadre, DOWN, buff=0.08, color=WHITE)
        lt = self.ligne([("tout :", WHITE), ("539 TWh", WHITE)], 32).next_to(brt, DOWN, buff=0.08)
        self.montre("Le tout", GrowFromCenter(brt), FadeIn(lt[0], shift=RIGHT * 0.15),
                    Indicate(bar.cadre, color=AMBRE, scale_factor=1.02), rt=0.45)
        self.montre("539", FadeIn(lt[1], scale=1.3), rt=0.35)
        self.au_mot("Proportion égale")
        self.insister(VGroup(f, cad), 1.1, 0.3)
        tot = self.t("le tout = le total", 34, GREY_B).move_to(P(-0.4, -2.3))
        self.montre("total", FadeIn(tot, shift=UP * 0.15), rt=0.4)
        self.attendre_voix()

    # ── 03 : le calcul : 361,7 ÷ 539 ≈ 0,671 → 67,1 % ──────────────────────
    def ecran_calcul(self):
        self.ecran("03-calcul")
        bar, nuc = self.barre_nuc(9.0, 0.8, centre=P(-0.4, 2.45))
        ln = sans(self.t("nucléaire", 26, NUC)).next_to(nuc, DOWN, buff=0.12)
        self.add(bar, nuc, ln)
        l1 = self.lc([("361,7 ÷", NUC), ("539", WHITE), ("≈ 0,671", VERT_OK)], 1.05, fs=48, x=-0.4)
        self.jouer(l1, ["361,7", "par 539", "environ 0,671"])
        self.insister(l1[2], 1.12, 0.2)
        l2 = self.lc([("0,671 ×", WHITE), ("100 =", AMBRE), ("67,1 %", VERT_OK)], -0.05, fs=48, x=-0.4)
        self.jouer(l2, ["on multiplie", "par 100", "67,1 %"])
        p = self.t("67,1 %", 34, NUIT).move_to(nuc)
        self.play(FadeIn(p, scale=1.3), run_time=0.3)
        cad = SurroundingRectangle(l2[2], color=VERT_OK, buff=0.15, corner_radius=0.1)
        self.play(Create(cad), run_time=0.4)
        x0, L = bar.cadre.get_left()[0], bar.cadre.width
        tiers = VGroup(*[DashedLine(P(x0 + L * k / 3, bar.cadre.get_top()[1] + 0.15),
                                    P(x0 + L * k / 3, bar.cadre.get_bottom()[1] - 0.15), color=WHITE,
                                    stroke_width=4) for k in (1, 2)])
        dt = self.tampon("≈ deux tiers de l'électricité", NUC, 34).move_to(P(-0.4, -1.4))
        self.montre("deux tiers", Create(tiers), FadeIn(dt, scale=1.15), rt=0.6)
        self.insister(dt, 1.06, 0.2)
        self.attendre_voix()

    # ── 04 : toujours entre 0 et 1 (0 % et 100 %) ──────────────────────────
    def ecran_sens(self):
        self.ecran("04-sens")
        xa, xb, y = -4.6, 3.8, 1.6
        axe = Line(P(xa - 0.6, y), P(xb + 0.8, y), color=GREY_B, stroke_width=4)
        zone = Line(P(xa, y), P(xb, y), color=VERT_OK, stroke_width=12)
        ta = VGroup(Line(P(xa, y - 0.18), P(xa, y + 0.18), stroke_width=5), self.t("0", 40).move_to(P(xa, y - 0.55)))
        tb = VGroup(Line(P(xb, y - 0.18), P(xb, y + 0.18), stroke_width=5), self.t("1", 40).move_to(P(xb, y - 0.55)))
        self.play(Create(axe), run_time=0.4)
        self.montre("entre 0", FadeIn(ta, scale=1.3), rt=0.3)
        self.montre("et 1", FadeIn(tb, scale=1.3), Create(zone), rt=0.5)
        pa = self.t("0 %", 36, VERT_OK).move_to(P(xa, y + 0.6))
        pb = self.t("100 %", 36, VERT_OK).move_to(P(xb, y + 0.6))
        self.montre(("0 %", 1), FadeIn(pa, scale=1.3), rt=0.3)
        self.montre("100 %", FadeIn(pb, scale=1.3), rt=0.35)
        pt = Dot(P(xa + (xb - xa) * 0.671, y), radius=0.14, color=NUC)
        lpt = sans(self.t("nucléaire", 26, NUC)).next_to(pt, DOWN, buff=0.3)
        self.play(FadeIn(pt, scale=2), FadeIn(lpt), run_time=0.4)
        bar, nuc = self.barre_nuc(8.4, 0.75, centre=P(-0.4, -0.55))
        self.play(FadeIn(bar), run_time=0.3)
        l1 = self.t("La partie est dans le tout :", 36).move_to(P(-0.4, -1.55))
        self.montre("La partie", GrowFromEdge(nuc, LEFT), FadeIn(l1, shift=UP * 0.15), rt=0.6)
        l2 = self.t("elle ne peut pas le dépasser.", 36, ROUGE_ERREUR).move_to(P(-0.4, -2.3))
        self.montre("elle ne peut", FadeIn(l2, shift=UP * 0.15), Indicate(bar.cadre, color=ROUGE_ERREUR,
                                                                              scale_factor=1.03), rt=0.6)
        self.attendre_voix()

    def mini_barre(self, v, couleur, depuis=0.0, centre=P(-4.4, -0.6), largeur=4.0):
        """La petite barre du tout (gris) pour une question : (barre, segment)."""
        bar = barre_mix([(TOTAL, RESTE)], largeur, 0.55, centre=centre)
        return bar, part_gauche(bar, v, couleur, depuis=depuis)

    # ── 05 : QUESTION 1 (hydraulique, 75,1 sur 539) ─────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        fig = barrage(1.1).move_to(P(-4.4, 1.5))
        bar, seg = self.mini_barre(75.1, HYD, depuis=361.7)
        st = sans(self.t("le tout", 26, GREY_B)).next_to(bar, DOWN, buff=0.15)

        def avant(sc):
            sc.play(FadeIn(fig, shift=UP * 0.2), FadeIn(bar), FadeIn(st), run_time=0.45)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["75,1 ÷", "539", "≈ 0,139", "= 13,9 %."])
            for m, mot in zip(l0, ["75,1 divisé", "par 539", "environ 0,139", "soit 13,9"]):
                sc.montre(mot, FadeIn(m, shift=UP * 0.12), rt=0.3)
            p = sc.t("13,9 %", 26, HYD).next_to(seg, UP, buff=0.12)
            sc.play(GrowFromEdge(seg, LEFT), FadeIn(p, scale=1.3), run_time=0.5)
            l1 = sc.ligne_rep(1, ["B :", "la partie, sans diviser."])
            sans(l1[1])
            sc.montre("B recopie", FadeIn(l1[0]), rt=0.25)
            sc.montre("sans la", FadeIn(l1[1], shift=UP * 0.12), rt=0.3)
            l2 = sc.ligne_rep(2, ["C :", "le tout ÷ la partie : l'inverse."])
            sans(l2[1])
            sc.montre("C divise", FadeIn(l2[0]), rt=0.25)
            sc.montre("l'inverse", FadeIn(l2[1], shift=UP * 0.12), rt=0.3)
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse",
                            ["L'hydraulique : 75,1 TWh sur 539.", "Quelle proportion ?"],
                            [self.t("13,9 %", 34), self.t("75,1 %", 34), self.t("7,2", 34)], 0,
                            ["75,1 ÷ 539 ≈ 0,139 = 13,9 %.", "B : la partie, sans diviser.",
                             "C : le tout ÷ la partie : l'inverse."], mot_q="L'hydraulique",
                            avant_q=avant, autres_r=apres)

    # ── 06 : le piège : diviser par le reste (204 %) ────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.titre_haut("Attention au piège !", "Attention", couleur=ROUGE_ERREUR, fs=44)
        r = self.ligne([("On divise par le TOUT,", VERT_OK), ("pas par le reste.", ROUGE_P)], 36).move_to(P(-0.4, 2.3))
        self.montre("On divise", FadeIn(r[0], shift=RIGHT * 0.15), rt=0.35)
        self.montre("pas par", FadeIn(r[1], shift=RIGHT * 0.15), rt=0.35)
        bar, nuc = self.barre_nuc(9.0, 0.75, centre=P(-0.4, 1.25))
        self.play(FadeIn(bar), FadeIn(nuc), run_time=0.3)
        reste = part_gauche(bar, TOTAL - 361.7, RESTE, depuis=361.7)
        br = Brace(reste, DOWN, buff=0.08, color=AMBRE)
        lr = sans(self.t("le reste", 30, AMBRE)).next_to(br, DOWN, buff=0.08)
        self.montre("Le reste", GrowFromCenter(br), FadeIn(lr), Indicate(reste, color=AMBRE, scale_factor=1.05), rt=0.6)
        l1 = self.lc([("539 −", WHITE), ("361,7 =", NUC), ("177,3", AMBRE)], -0.35, fs=42, x=-0.4)
        self.jouer(l1, ["539 moins", "361,7, égale", "177,3"])
        self.play(FadeOut(VGroup(bar, nuc, br, lr, reste)), l1.animate.scale(0.8).move_to(P(-0.4, 1.35)), run_time=0.45)
        l2 = self.lc([("361,7 ÷", NUC), ("177,3", AMBRE), ("≈ 2,04", ROUGE_P), ("= 204 %", ROUGE_P)], 0.45, fs=42,
                     x=-0.4)
        self.jouer(l2, ["361,7 divisé", "par 177,3", "environ 2,04", "204 %"])
        x0, w = -5.6, 2.9
        br_r = Rectangle(width=w, height=0.6, fill_color=RESTE, fill_opacity=1, stroke_width=2,
                         stroke_color=NUIT).move_to(P(x0 + w / 2, -0.95))
        tr = sans(self.t("reste", 26, NUIT)).move_to(br_r)
        bn1 = Rectangle(width=w, height=0.6, fill_color=NUC, fill_opacity=1, stroke_width=2,
                        stroke_color=NUIT).move_to(P(x0 + w / 2, -1.75))
        bn2 = Rectangle(width=w * 1.04, height=0.6, fill_color=ROUGE_ERREUR, fill_opacity=1, stroke_width=2,
                        stroke_color=NUIT).next_to(bn1, RIGHT, buff=0)
        tn = sans(self.t("nucléaire", 26, NUIT)).move_to(bn1)
        self.play(FadeIn(br_r), FadeIn(tr), GrowFromEdge(bn1, LEFT), FadeIn(tn), run_time=0.5)
        self.play(GrowFromEdge(bn2, LEFT), run_time=0.6)
        lim = DashedLine(P(x0 + w, -0.5), P(x0 + w, -2.2), color=WHITE, stroke_width=4)
        c100 = self.t("100 %", 28, WHITE).next_to(lim, UP, buff=0.08)
        self.montre("Plus de 100", Create(lim), FadeIn(c100, scale=1.3), Indicate(bn2, color=ROUGE_P), rt=0.6)
        imp = self.tampon("Impossible pour une partie !", ROUGE_ERREUR, 32).move_to(P(-1.6, -2.85))
        self.montre("impossible", FadeIn(imp, scale=1.2), rt=0.45)
        self.play(Create(croix(l2, sw=6)), run_time=0.4)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (éolien, 46,8 sur 539) ──────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        fig = eolienne(1.1).move_to(P(-4.4, 1.6))
        bar, seg = self.mini_barre(46.8, EOL, depuis=436.8)
        st = sans(self.t("le tout", 26, GREY_B)).next_to(bar, DOWN, buff=0.15)

        def avant(sc):
            sc.play(FadeIn(fig, shift=UP * 0.2), FadeIn(bar), FadeIn(st), run_time=0.45)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["46,8 ÷", "539", "≈ 0,087", "= 8,7 %."])
            for m, mot in zip(l0, ["46,8 divisé", "par 539", "environ 0,087", "soit 8,7"]):
                sc.montre(mot, FadeIn(m, shift=UP * 0.12), rt=0.3)
            p = sc.t("8,7 %", 26, EOL).next_to(seg, UP, buff=0.12)
            sc.play(GrowFromEdge(seg, LEFT), FadeIn(p, scale=1.3), run_time=0.5)
            l1 = sc.ligne_rep(1, ["C : ÷ le reste,", "492,2,", "au lieu du total."])
            sc.montre("C divise", FadeIn(l1[0]), rt=0.25)
            sc.montre("492,2", FadeIn(l1[1], scale=1.2), rt=0.3)
            sc.montre("au lieu", FadeIn(l1[2], shift=UP * 0.12), rt=0.3)
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse",
                            ["L'éolien : 46,8 TWh sur 539.", "Quelle proportion ?"],
                            [self.t("8,7 %", 34), self.t("46,8 %", 34), self.t("9,5 %", 34)], 0,
                            ["46,8 ÷ 539 ≈ 0,087 = 8,7 %.", "C : ÷ le reste, 492,2, au lieu du total."],
                            mot_q="L'éolien", avant_q=avant, autres_r=apres)

    # ── 08 : défi (solaire ; nucléaire + hydraulique) ───────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.titre_haut("À toi de jouer !", "À toi de jouer", fs=50)
        bar = mix_complet(9.0, 0.75, centre=P(-0.4, 1.95))
        noms = VGroup(*[sans(self.t(s, 22, c)).next_to(bar.segs[i], DOWN, buff=0.1)
                        for i, (s, c) in enumerate([("nucléaire", NUC), ("hydr.", HYD), ("éol.", EOL)])])
        self.play(FadeIn(bar), FadeIn(noms), run_time=0.4)
        sol = soleil(0.55).move_to(P(-5.6, 0.55))
        l1 = self.lc([("Un :", AMBRE), ("le solaire,", SOL), ("24,8 TWh.", WHITE), ("Quelle proportion ?", WHITE)],
                     0.55, fs=34, x=0.6)
        self.jouer(l1, ["Un :", "le solaire", "24,8", "Quelle proportion"],
                   extra={1: [FadeIn(sol, scale=0.6), Indicate(bar.segs[3], color=WHITE, scale_factor=1.15)]})
        l2 = self.lc([("Deux :", AMBRE), ("nucléaire", NUC), ("+", WHITE), ("hydraulique", HYD),
                      ("ensemble ?", WHITE)], -0.45, fs=34, x=-0.4)
        self.jouer(l2, ["Deux :", "le nucléaire", None, "l'hydraulique", "ensemble"],
                   extra={4: [Indicate(VGroup(bar.segs[0], bar.segs[1]), color=WHITE, scale_factor=1.04)]})
        self.pause_defi(y=-2.0)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(-0.4, 3.15))
        x = -0.4
        l1 = self.lc([("Un :", AMBRE), ("24,8 ÷", SOL), ("539", WHITE), ("≈ 0,046", WHITE), ("= 4,6 %", VERT_OK)],
                     2.1, fs=40, x=x)
        self.jouer(l1, ["Un :", "24,8 divisé", ("par 539", 1), "environ 0,046", "soit 4,6"], extra={0: [FadeIn(tit)]})
        l2 = self.lc([("Deux :", AMBRE), ("361,7 +", NUC), ("75,1 =", HYD), ("436,8", WHITE)], 1.0, fs=40, x=x)
        self.jouer(l2, ["Deux :", "361,7 plus", "plus 75,1", "égale 436,8"])
        l3 = self.lc([("436,8 ÷", WHITE), ("539", WHITE), ("≈ 0,81", WHITE), ("= 81 %", VERT_OK)], -0.1, fs=40, x=x)
        bar = barre_mix([(TOTAL, RESTE)], 8.0, 0.65, centre=P(-1.0, -1.65))
        s1 = part_gauche(bar, 361.7, NUC)
        s2 = part_gauche(bar, 75.1, HYD, depuis=361.7)
        br = Brace(VGroup(s1, s2), DOWN, buff=0.08, color=VERT_OK)
        p81 = self.t("81 %", 30, VERT_OK).next_to(br, DOWN, buff=0.06)
        self.jouer(l3, ["436,8 divisé", ("par 539", 2), "environ 0,81", "soit 81"],
                   extra={0: [FadeIn(bar), GrowFromEdge(s1, LEFT), GrowFromEdge(s2, LEFT)],
                          3: [GrowFromCenter(br), FadeIn(p81, scale=1.3)]})
        self.play(Create(SurroundingRectangle(l3[3], color=VERT_OK, buff=0.15, corner_radius=0.1)), run_time=0.4)
        self.insister(l3[3], 1.12, 0.2)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        bar, nuc = self.barre_nuc(4.2, 0.6)
        br = Brace(nuc, UP, buff=0.06, color=NUC)
        lp = sans(self.t("partie", 26, NUC)).next_to(br, UP, buff=0.06)
        brt = Brace(bar.cadre, DOWN, buff=0.06, color=WHITE)
        lt = sans(self.t("tout", 26, WHITE)).next_to(brt, DOWN, buff=0.06)
        fig = VGroup(bar, nuc, br, lp, brt, lt)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[
            ("Une proportion =", "partie ÷ tout."),
            ("On multiplie par 100", "pour l'écrire en pourcentage."),
            ("Elle est toujours", "entre 0 % et 100 %.")], fs=36)
        self.au_mot("Une proportion")
        self.montrer_ligne(lignes[0], Indicate(nuc, color=WHITE, scale_factor=1.05))
        self.au_mot("On la multiplie")
        self.montrer_ligne(lignes[1])
        self.au_mot("Elle est toujours")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        ecrans = [self.page_de_garde, self.ecran_situation, self.ecran_methode, self.ecran_calcul, self.ecran_sens,
                  self.ecran_question1, self.ecran_piege, self.ecran_question2, self.ecran_defi,
                  self.ecran_correction, self.ecran_finale]
        if os.environ.get("GARDE_SEULE") == "1":  # la garde STMG seule (voir l'en-tête)
            ecrans[0]()
            return
        seuls = os.environ.get("ECRANS")  # mise au point : ECRANS=ecran_piege,ecran_correction
        for e in ecrans:
            if not seuls or e.__name__ in seuls.split(","):
                e()
        if not seuls:
            self.page_abonnement("10-abonne")


class PropLyceeCalculerPremiere(PropLyceeCalculerBase):
    identite = "Maths 1re — EleveAI"
    ceinture = "jaune"


class PropLyceeCalculerStmg(PropLyceeCalculerBase):
    identite = "Maths STMG — EleveAI"
    ceinture = "jaune"
