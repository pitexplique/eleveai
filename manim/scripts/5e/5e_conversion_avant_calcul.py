# 5e_conversion_avant_calcul.py
# EleveAI — Maths 5e — série « Aire, volume et conversions » (2e poste), épisode C3 : CONVERTIR AVANT DE CALCULER
# (micro conversion_avant_calcul, notion grandeur_conversion), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : 5e-conversion-avant-calcul-short (le ruban du cadeau : 1 m = 100 cm ; 100 − 30 = 70 cm).
# Décor et métier : Lucie, CHEFFE CUISINIÈRE (crème en L, cL, mL ; ficelle de cuisine ; centres cuisine, argent-budget).
# Mapping micro → écrans : 02 (comparer 0,5 L, 75 cL, 400 mL : tout en mL, 500, 750, 400 → 75 cL), 03 (soustraire :
# 1,2 m − 45 cm ; 1,2 m = 120 cm ; 120 − 45 = 75 cm), 04 (méthode : une seule unité, tout convertir, puis calculer),
# 06 (piège : « 1,2 − 45 » ne veut rien dire ; 120 cm − 45 cm), questions 05 (A : 200 − 60 = 140 cm) et
# 07 (B : 800, 850, 700 mL → 85 cL), défi 08 (1 500 − 600 − 250 = 650 mL ; 650 ≥ 600 : oui ; reste 50 mL).
# Fiche : lib/fiches/maths-5e-conversions.tsx.
# Voix : manim/voix/5e-conversion-avant-calcul.json (validée le 15/11, Julie, débit −6) ;
# marques : 5e_conversion_avant_calcul_marques.json (python manim/scripts/5e/aire_volume_5e_marques.py conversion-avant-calcul).
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/5e/5e_conversion_avant_calcul.py ConversionAvantCalcul5e
# Sortie finale : manim/sorties/5e/maths/conversion/03-avant-calcul/eleveai-maths-5e-conversion-avant-calcul.mp4

import os
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from aire_volume_5e_commun import *  # noqa: E402,F403

# Une couleur par unité, la même sur tout l'épisode
U_L, U_CL, U_ML = "#7dd3fc", "#f9a8d4", "#fde047"     # litre (bleu clair), centilitre (rose), millilitre (jaune)
U_M, U_CM = "#fdba74", "#86efac"                      # mètre (orange), centimètre (vert clair)
CREME, CREME_B = "#fef3c7", "#a16207"                 # la crème, le bord des bouteilles
BOUCHON = "#2563eb"
FICELLE, FICELLE_B = "#e7c992", "#8a5a2b"             # la ficelle de cuisine (et le rouleau)
COUPE_C = "#fb923c"                                   # le morceau coupé
RUBAN = "#ec4899"                                     # le ruban (question 1)
CASSEROLE, CASSEROLE_B = "#94a3b8", "#334155"
VERRINE, VERRINE_B = "#fecdd3", "#9f1239"

_SEP = re.compile(r"(?<=\d)[   ](\d{3})\b")


def bouteille(w=1.2, h=1.8, remplie=1.0, etiquette=True):
    """Une bouteille de crème : un corps arrondi (h de haut, w de large, le bas en ORIGIN), un goulot, un bouchon ;
    la crème remplit `remplie` du corps (le reste est vide, transparent) ; une bande d'étiquette sombre au milieu.
    .corps .creme .goulot .bouchon .etiq (le cartouche) ; .vide = le haut du corps, sans crème."""
    corps = RoundedRectangle(width=w, height=h, corner_radius=min(0.22, w * 0.18), fill_opacity=0,
                             stroke_color=CREME_B, stroke_width=4).move_to(P(0, h / 2))
    interieur = h - 0.1
    hc = max(0.001, interieur * remplie)
    creme = Rectangle(width=w - 0.1, height=hc, fill_color=CREME, fill_opacity=1, stroke_width=0)
    creme.move_to(P(0, 0.05 + hc / 2))
    goulot = Rectangle(width=w * 0.42, height=0.26, fill_color=CREME, fill_opacity=1, stroke_color=CREME_B,
                       stroke_width=4).move_to(P(0, h + 0.13))
    bouchon = RoundedRectangle(width=w * 0.5, height=0.17, corner_radius=0.05, fill_color=BOUCHON, fill_opacity=1,
                               stroke_width=0).move_to(P(0, h + 0.26 + 0.085))
    g = VGroup(creme, corps, goulot, bouchon)
    if etiquette:
        etiq = RoundedRectangle(width=w * 0.92, height=0.5, corner_radius=0.08, fill_color="#0f172a",
                                fill_opacity=0.92, stroke_width=0).move_to(P(0, h * 0.5))
        g.add(etiq)
        g.etiq = etiq
    g.corps, g.creme, g.goulot, g.bouchon, g.w, g.h = corps, creme, goulot, bouchon, w, h
    return g


def niveau(b, remplie):
    """La crème d'une bouteille b ramenée à `remplie` du corps (une copie à animer vers elle)."""
    interieur = b.h - 0.1
    hc = max(0.001, interieur * remplie)
    c = b.creme.copy().stretch_to_fit_height(hc)
    return c.align_to(b.corps.get_bottom() + UP * 0.05, DOWN)


def casserole(w=1.5, h=0.75):
    """Une casserole vue de face, le manche à gauche (le bas en ORIGIN)."""
    cuve = Polygon(P(-w / 2, h), P(w / 2, h), P(w / 2 - 0.08, 0), P(-w / 2 + 0.08, 0), fill_color=CASSEROLE,
                   fill_opacity=1, stroke_color=CASSEROLE_B, stroke_width=4)
    bord = Line(P(-w / 2 - 0.06, h), P(w / 2 + 0.06, h), color=CASSEROLE_B, stroke_width=7)
    manche = RoundedRectangle(width=0.7, height=0.14, corner_radius=0.06, fill_color="#1f2937", fill_opacity=1,
                              stroke_width=0).move_to(P(-w / 2 - 0.38, h * 0.8))
    g = VGroup(manche, cuve, bord)
    g.cuve = cuve
    return g


def verrine(w=0.9, h=0.95):
    """Une verrine de dessert (le bas en ORIGIN) : du rose, une cerise."""
    verre = Polygon(P(-w / 2, h), P(w / 2, h), P(w * 0.32, 0), P(-w * 0.32, 0), fill_color=VERRINE, fill_opacity=1,
                    stroke_color=VERRINE_B, stroke_width=4)
    cerise = Circle(radius=0.11, fill_color="#dc2626", fill_opacity=1, stroke_width=0).move_to(P(0.1, h + 0.08))
    return VGroup(verre, cerise)


class ConversionAvantCalcul5e(Paysage5e):
    nom_voix = "5e-conversion-avant-calcul"
    fichier_marques = "5e_conversion_avant_calcul_marques.json"
    ceinture = "verte"

    def col(self, mob, y, xl=None):
        """col() de la base, mais qui DIT quand elle rétrécit une ligne (elle le fait en silence)."""
        w = mob.width
        r = super().col(mob, y, xl)
        if os.environ.get("BORDS") == "1" and r.width < w - 0.01:
            tx = [f.original_text for f in r.get_family() if getattr(f, "original_text", None)]
            print(f"BORD SERRE {getattr(self, '_cle_voix', '?')} {w:.2f} → {r.width:.2f} ({' | '.join(tx)[:50]})",
                  flush=True)
        return r

    def _auditer(self, avant, t0):
        """L'audit de la base cherche « 1500 » dans une voix qui dit « 1 500 » : il ne le trouve pas. Ici, il relit
        la voix avec ses milliers collés (« 1 500 » → « 1500 » + une espace APRÈS : la longueur, donc les marques,
        ne bougent pas). Copie de 5e_volume_unite.py."""
        v = getattr(self, "_texte_voix", "") or ""
        self._texte_voix = _SEP.sub(lambda m: m.group(1) + " ", v)
        try:
            super()._auditer(avant, t0)
        finally:
            self._texte_voix = v

    def pause_defi(self, y=-2.35, marge=2.0):
        """« Mets pause, et cherche ! » calé à gauche de la colonne du défi (x = −1) : posé par la base dans la
        colonne de droite, il était rétréci à 77 % et touchait Ti Margo (0,2 d'air)."""
        self.au_mot("Mets pause")
        p = gauche(self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE), -1.0, y)
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=marge)

    def lab(self, s, fs=28, couleur=WHITE):
        """Une étiquette posée sur une figure (cartouche sombre), hors audit."""
        t = self.t(s, fs, couleur)
        hors_audit(t)
        return sur_fond(t)

    def etiq(self, b, s, couleur, fs=28):
        """Le texte de l'étiquette d'une bouteille, hors audit (le nombre est dit en même temps dans la colonne)."""
        t = self.t(s, fs, couleur)
        hors_audit(t)
        if t.width > b.etiq.width - 0.1:
            t.scale_to_fit_width(b.etiq.width - 0.1)
        return t.move_to(b.etiq)

    # ── les trois bouteilles de crème (écrans 02, 04, 09) ───────────────────
    def trois_bouteilles(self, x0=-5.4, bas=-1.65, k=0.0036, w=1.5, pas=1.8):
        """0,5 L, 75 cL, 400 mL : hauteurs proportionnelles au contenu (500, 750, 400 mL)."""
        bs = VGroup()
        for i, ml in enumerate((500, 750, 400)):
            b = bouteille(w, ml * k)
            b.shift(P(x0 + i * pas, bas))
            bs.add(b)
        return bs

    # ── la ficelle de cuisine (écrans 03) ───────────────────────────────────
    U_CM_ = 0.042   # 1 cm = 0,042 unité : 120 cm = 5,04
    X0, Y0 = -5.75, 0.6

    def ficelle(self, debut, fin, couleur=FICELLE, y=None):
        y = self.Y0 if y is None else y
        u = self.U_CM_
        return Line(P(self.X0 + debut * u, y), P(self.X0 + fin * u, y), color=couleur, stroke_width=12)

    def rouleau(self):
        r = Circle(radius=0.42, fill_color=FICELLE, fill_opacity=1, stroke_color=FICELLE_B, stroke_width=4)
        trou = Circle(radius=0.13, fill_color="#3f2a14", fill_opacity=1, stroke_width=0)
        tours = VGroup(*[Circle(radius=rr, stroke_color=FICELLE_B, stroke_width=2) for rr in (0.22, 0.32)])
        return VGroup(r, tours, trou).move_to(P(self.X0 - 0.3, self.Y0 + 0.05))

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Convertir avant de calculer", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Convertir avant de calculer")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Peut-on additionner", "des litres", "et des centilitres ?"], 38)
        q.move_to(P(0, 0.2)).align_to(P(-6.2, 0), LEFT)
        b1 = bouteille(1.25, 2.0).shift(P(1.3, -1.25))
        b2 = bouteille(0.8, 1.1).shift(P(3.6, -1.25))
        e1 = self.etiq(b1, "L", U_L, 32)
        e2 = self.etiq(b2, "cL", U_CL, 30)
        plus = self.t("+", 60, WHITE).move_to(P(2.5, -0.35))
        qm = self.t("?", 60, JAUNE_TITRE).move_to(P(4.75, -0.35))
        hors_audit(plus)
        hors_audit(qm)
        self.au_mot("Peut-on additionner")
        self.play(FadeIn(q[0], shift=UP * 0.2), run_time=0.4)
        self.au_mot("des litres")
        self.play(FadeIn(q[1], shift=UP * 0.2), FadeIn(b1, shift=UP * 0.2), FadeIn(e1), run_time=0.45)
        self.au_mot("et des centilitres")
        self.play(FadeIn(q[2], shift=UP * 0.2), FadeIn(plus), FadeIn(b2, shift=UP * 0.2), FadeIn(e2),
                  FadeIn(qm, scale=1.3), run_time=0.55)
        self.attendre_voix(marge=0.6)

    # ── 01 : Lucie, cheffe cuisinière ───────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        lu = lucie(1.0).move_to(P(-5.25, 0.1))
        lu.corps.set_stroke("#64748b", 3)
        self.au_mot("Voici Lucie")
        nom = self.t("Lucie", 40, BLEU_CALCUL).next_to(lu, UP, buff=0.25)
        self.play(FadeIn(lu, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("cheffe cuisinière")
        met = self.bloc(["cheffe", "cuisinière"], 28, BLEU_CALCUL).next_to(lu, DOWN, buff=0.15)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        x = -2.9
        l0 = self.bloc(["Ses recettes mélangent", "les unités :"], 36, WHITE)
        self.col(l0, 2.45, x)
        self.au_mot("Ses recettes mélangent")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("les unités")
        self.play(FadeIn(l0[1], shift=UP * 0.1), run_time=0.3)
        unites = [("des litres", "L", U_L, "des litres"), ("des centilitres", "cL", U_CL, "des centilitres"),
                  ("des millilitres", "mL", U_ML, "des millilitres")]
        ys = [1.2, 0.45, -0.3]
        for (s, u, c, m), y in zip(unites, ys):
            lg = self.ligne([(s, WHITE), (u, c)], 34, buff=0.3)
            badge = SurroundingRectangle(lg[1], color=c, buff=0.1, corner_radius=0.08, stroke_width=3)
            g = VGroup(lg, badge)
            self.col(g, y, x + 0.3)
            self.au_mot(m)
            self.play(FadeIn(g, shift=UP * 0.1), run_time=0.35)
        l4 = self.bloc(["Avant de calculer, elle met", "tout dans la même unité."], 36, VERT_OK)
        self.col(l4, -1.55, x)
        self.au_mot("Avant de calculer")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("dans la même unité")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.4)
        self.insister(l4, 1.05, 0.25)
        self.attendre_voix()

    # ── 02 : comparer (0,5 L, 75 cL, 400 mL → 500, 750, 400 mL) ─────────────
    def ecran_comparer(self):
        self.ecran("02-comparer")
        bs = self.trois_bouteilles()
        X = -0.4   # les bouteilles s'arrêtent à x = −1,05 : la colonne commence plus à gauche
        noms = [("0,5 L", U_L), ("75 cL", U_CL), ("400 mL", U_ML)]
        ets = [self.etiq(b, s, c, 26) for b, (s, c) in zip(bs, noms)]
        l0 = self.t("Trois bouteilles de crème :", 34, WHITE)
        self.col(l0, 2.75, X)
        self.au_mot("Trois bouteilles de crème")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        l1 = self.ligne([("0,5 L,", U_L), ("75 cL", U_CL), ("et 400 mL", U_ML)], 36, buff=0.25)
        self.col(l1, 2.1, X)
        for i, m in enumerate(["0,5 litre", "75 centilitres", "400 millilitres"]):
            self.au_mot(m)
            self.play(FadeIn(bs[i], shift=UP * 0.2), FadeIn(ets[i]), FadeIn(l1[i], shift=UP * 0.1), run_time=0.4)
        l2 = self.bloc(["Laquelle est", "la plus grande ?"], 36, JAUNE_TITRE)
        self.col(l2, 1.2, X)
        self.au_mot("Laquelle est la plus grande")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.4)
        l3 = self.t("Tout en millilitres :", 34, U_ML)
        self.col(l3, 0.25, X)
        self.au_mot("Lucie met tout en millilitres")
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.35)
        l4 = self.ligne([("500,", U_ML), ("750", U_ML), ("et 400", U_ML)], 40, buff=0.25)
        self.col(l4, -0.45, X)
        mls = [self.lab(s, 26, U_ML).next_to(b, DOWN, buff=0.14) for s, b in zip(["500 mL", "750 mL", "400 mL"], bs)]
        for i, (m, n) in enumerate([("500", 1), ("750", 1), ("et 400", 2)]):
            self.au_mot(m, n)
            self.play(FadeIn(l4[i], shift=UP * 0.1), FadeIn(mls[i], shift=UP * 0.1), run_time=0.3)
        res = self.gros("La plus grande : 75 cL", fs=34)
        self.col(res, -1.4, X)
        cadre = SurroundingRectangle(VGroup(bs[1], mls[1]), color=VERT_OK, buff=0.12, corner_radius=0.1,
                                     stroke_width=6)
        self.au_mot("c'est 75 centilitres")
        self.play(FadeIn(res, scale=1.15), Create(cadre), run_time=0.5)
        self.insister(res, 1.05, 0.25)
        self.attendre_voix()

    # ── 03 : soustraire (1,2 m − 45 cm : 120 − 45 = 75 cm) ──────────────────
    def ecran_soustraire(self):
        self.ecran("03-soustraire")
        rou = self.rouleau()
        fil = self.ficelle(0, 120)
        l0 = self.ligne([("Ficelle :", WHITE), ("1,2 m", U_M)], 36, buff=0.25)
        self.col(l0, 2.75)
        self.au_mot("Un rouleau de ficelle")
        self.play(FadeIn(rou, scale=0.8), Create(fil), FadeIn(l0[0], shift=UP * 0.1), run_time=0.6)
        c12 = self.lab("1,2 m", 30, U_M).next_to(fil, UP, buff=0.3)
        self.au_mot("mesure 1,2 mètre")
        self.play(FadeIn(l0[1], shift=UP * 0.1), FadeIn(c12), run_time=0.35)
        # le morceau coupé : les 45 derniers centimètres
        reste = self.ficelle(0, 75)
        morceau = self.ficelle(75, 120, COUPE_C)
        coupe = DashedLine(P(self.X0 + 75 * self.U_CM_, self.Y0 + 0.35), P(self.X0 + 75 * self.U_CM_, self.Y0 - 0.35),
                           color=ROUGE_ERREUR, stroke_width=5, dash_length=0.08)
        l1 = self.ligne([("Lucie coupe", WHITE), ("45 cm.", COUPE_C)], 36, buff=0.22)
        self.col(l1, 2.05)
        self.au_mot("Lucie en coupe")
        self.play(FadeIn(l1[0], shift=UP * 0.1), Create(coupe), run_time=0.35)
        self.add(reste, morceau)
        self.remove(fil)
        self.au_mot("45 centimètres")
        c45 = self.lab("45 cm", 28, COUPE_C)
        self.play(morceau.animate.shift(DOWN * 1.1 + RIGHT * 0.25), FadeOut(coupe), FadeIn(l1[1], shift=UP * 0.1),
                  run_time=0.5)
        c45.next_to(morceau, DOWN, buff=0.25)
        self.play(FadeIn(c45), run_time=0.25)
        l2 = self.t("Tout en centimètres :", 34, U_CM)
        self.col(l2, 1.3)
        self.au_mot("Tout en centimètres")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        l3 = self.ligne([("1,2 m", U_M), ("= 120 cm", U_CM)], 40, buff=0.25)
        self.col(l3, 0.5)
        self.au_mot("1,2 mètre égale")
        self.play(FadeIn(l3[0], shift=UP * 0.1), Indicate(c12, color=JAUNE_TITRE, scale_factor=1.15), run_time=0.4)
        c120 = self.lab("120 cm", 30, U_CM).move_to(c12)
        self.au_mot("120 centimètres")
        self.play(FadeIn(l3[1], shift=UP * 0.1), ReplacementTransform(c12, c120), run_time=0.3)
        l4 = self.ligne([("120 − 45", BLEU_D)], 40)
        self.col(l4, -0.35)
        self.au_mot("120 moins 45")
        self.play(FadeIn(l4, shift=UP * 0.1), Indicate(morceau, color=JAUNE_TITRE, scale_factor=1.05), run_time=0.4)
        res = self.gros("Il reste 75 cm", fs=42)
        self.col(res, -1.3)
        c75 = self.lab("75 cm", 30, VERT_OK).next_to(reste, DOWN, buff=0.25)
        self.au_mot("il reste 75 centimètres")
        self.play(FadeIn(res, scale=1.15), FadeIn(c75), reste.animate.set_color(VERT_OK), run_time=0.5)
        self.insister(res, 1.06, 0.25)
        self.attendre_voix()

    # ── 04 : la méthode ─────────────────────────────────────────────────────
    def ecran_methode(self):
        self.ecran("04-methode")
        self.au_mot("La méthode")
        l0 = self.t("La méthode :", 40, JAUNE_TITRE)
        gauche(l0, -6.2, 3.0)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        etapes = [(["On choisit une seule unité."], ["on choisit une seule unité"], U_ML),
                  (["On convertit tout", "dans cette unité."], ["On convertit tout", "dans cette unité"], WHITE),
                  (["Ensuite seulement,", "on compare ou on calcule."], ["Ensuite seulement", "on compare ou on calcule"],
                   VERT_OK)]
        y = 2.15
        blocs = []
        for lignes, mots, c in etapes:
            b = self.bloc(lignes, 36, c)
            b.align_to(P(0, y), UP).align_to(P(-6.0, 0), LEFT)
            blocs.append(b)
            y = b.get_bottom()[1] - 0.3
        bs = self.trois_bouteilles(x0=1.9, bas=-0.9, k=0.0028, w=1.35, pas=1.55)
        ets = [self.etiq(b, s, U_ML, 23) for b, s in zip(bs, ["500 mL", "750 mL", "400 mL"])]
        self.au_mot(etapes[0][1][0])
        self.play(FadeIn(blocs[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot(etapes[1][1][0])
        self.play(FadeIn(blocs[1][0], shift=UP * 0.1), run_time=0.35)
        self.au_mot(etapes[1][1][1])
        self.play(FadeIn(blocs[1][1], shift=UP * 0.1), LaggedStart(*[FadeIn(VGroup(b, e), shift=UP * 0.2)
                                                                      for b, e in zip(bs, ets)], lag_ratio=0.2),
                  run_time=0.6)
        self.au_mot(etapes[2][1][0])
        self.play(FadeIn(blocs[2][0], shift=UP * 0.1), run_time=0.35)
        self.au_mot(etapes[2][1][1])
        self.play(FadeIn(blocs[2][1], shift=UP * 0.1), run_time=0.35)
        self.insister(blocs[2], 1.05, 0.25)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        u, x0, y = 0.022, -5.9, 1.7     # 200 cm = 4,4 unités
        reste = Rectangle(width=140 * u, height=0.32, fill_color=RUBAN, fill_opacity=1, stroke_color="#831843",
                          stroke_width=3).move_to(P(x0 + 70 * u, y))
        coupe = Rectangle(width=60 * u, height=0.32, fill_color=RUBAN, fill_opacity=1, stroke_color="#831843",
                          stroke_width=3).move_to(P(x0 + 170 * u, y))
        c2 = self.lab("2 m", 28, U_M).next_to(VGroup(reste, coupe), UP, buff=0.3)
        trait = DashedLine(P(x0 + 140 * u, y + 0.35), P(x0 + 140 * u, y - 0.35), color=WHITE, stroke_width=5,
                           dash_length=0.08)
        coupe2 = coupe.copy().shift(DOWN * 0.95 + RIGHT * 0.15)
        c60 = self.lab("60 cm", 26, COUPE_C).next_to(coupe2, DOWN, buff=0.2)
        qm = self.lab("?", 34, JAUNE_TITRE).next_to(reste, DOWN, buff=0.3)

        coupe.become(coupe2)

        def avant(sc):
            sc.play(FadeIn(reste), FadeIn(coupe), FadeIn(c2), Create(trait), FadeIn(c60), FadeIn(qm), run_time=0.4)

        self.question_gauche("05-question", "05b-reponse",
                             ["Un ruban de 2 m.", "On en coupe 60 cm.", "Combien reste-t-il ?"],
                             [self.choix("140 cm"), self.choix("58 cm"), self.choix("1,4 cm")], 0,
                             ["2 m = 200 cm.", "200 − 60 = 140 cm."],
                             -0.4, couper={0: ("2 m", "= 200 cm."), 1: ("200 − 60", "= 140 cm.")},
                             mot_q="Un ruban", avant_q=avant)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        l1 = self.bloc(["On ne calcule jamais avec", "deux unités différentes."], 38, JAUNE_TITRE)
        gauche(l1, -6.0, 1.85)
        self.au_mot("On ne calcule jamais")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("deux unités différentes")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.35)
        faux = self.ligne([("1,2", U_M), ("− 45", COUPE_C)], 60, buff=0.25)
        gauche(faux, -5.8, 0.35)
        self.au_mot("1,2 moins")
        self.play(FadeIn(faux[0], scale=1.2), run_time=0.3)
        self.au_mot("moins 45")
        self.play(FadeIn(faux[1], scale=1.2), run_time=0.3)
        barre = Line(faux.get_corner(DL) + P(-0.1, -0.05), faux.get_corner(UR) + P(0.1, 0.05), color=ROUGE_ERREUR,
                     stroke_width=9)
        l2 = self.t("ça ne veut rien dire.", 38, ROUGE_ERREUR).next_to(faux, RIGHT, buff=0.6)
        self.au_mot("ça ne veut rien dire")
        self.play(Create(barre), FadeIn(l2, shift=UP * 0.1), run_time=0.45)
        juste = self.ligne([("120 cm", U_CM), ("− 45 cm", COUPE_C)], 54, buff=0.25)
        gauche(juste, -5.8, -1.2)
        self.au_mot("120 centimètres")
        self.play(FadeIn(juste[0], scale=1.2), run_time=0.3)
        self.au_mot("moins 45 centimètres")
        self.play(FadeIn(juste[1], scale=1.2), run_time=0.3)
        oui = self.t("oui !", 46, VERT_OK).next_to(juste, RIGHT, buff=0.6)
        ok = self.coche(VERT_OK, 0.3).next_to(oui, RIGHT, buff=0.3)
        self.au_mot("oui")
        self.play(FadeIn(oui, scale=1.2), Create(ok), run_time=0.4)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        bs = VGroup(*[bouteille(1.05, 1.55).shift(P(-5.3 + i * 1.6, 0.25)) for i in range(3)])
        ets = [self.etiq(b, s, JAUNE_TITRE, 30) for b, s in zip(bs, "ABC")]
        qm = self.lab("?", 40, JAUNE_TITRE).move_to(P(-1.3, 2.3))

        def avant(sc):
            sc.play(LaggedStart(*[FadeIn(VGroup(b, e), shift=UP * 0.2) for b, e in zip(bs, ets)], lag_ratio=0.1),
                    FadeIn(qm), run_time=0.35)

        self.question_gauche("07-question", "07b-reponse",
                             ["Quelle est la plus", "grande quantité ?"],
                             [self.choix("0,8 L"), self.choix("85 cL"), self.choix("700 mL")], 1,
                             ["En millilitres :", "800, 850 et 700.", "La plus grande :", "85 cL."],
                             -0.4, couper={1: ("800,", "850", "et 700.")},
                             mot_q="Quelle", avant_q=avant)

    # ── 08 : le défi (la crème de Lucie) ────────────────────────────────────
    def cuisine(self):
        b = bouteille(1.6, 2.7).shift(P(-5.15, -1.95))
        cas = casserole().shift(P(-2.75, 0.75))
        ver = verrine().shift(P(-2.75, -1.6))
        return b, cas, ver

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        b, cas, ver = self.cuisine()
        x = -1.0
        l0 = self.ligne([("Lucie a", WHITE), ("1,5 L", U_L), ("de crème.", WHITE)], 34, buff=0.18)
        self.col(l0, 2.25, x)
        e15 = self.etiq(b, "1,5 L", U_L, 30)
        self.au_mot("Lucie a 1,5 litre")
        self.play(FadeIn(b, shift=UP * 0.2), FadeIn(e15), FadeIn(l0[:2], shift=UP * 0.1), run_time=0.45)
        self.au_mot("de crème")
        self.play(FadeIn(l0[2], shift=UP * 0.1), run_time=0.3)
        l1 = self.ligne([("60 cL", U_CL), ("pour une sauce,", WHITE)], 34, buff=0.18)
        self.col(l1, 1.5, x)
        c60 = self.lab("60 cL", 28, U_CL).next_to(cas, UP, buff=0.2)
        self.au_mot("60 centilitres")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("pour une sauce")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(cas, shift=UP * 0.2), FadeIn(c60), run_time=0.4)
        l2 = self.ligne([("250 mL", U_ML), ("pour un dessert.", WHITE)], 34, buff=0.18)
        self.col(l2, 0.8, x)
        c250 = self.lab("250 mL", 28, U_ML).next_to(ver, UP, buff=0.25)
        self.au_mot("250 millilitres")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("pour un dessert")
        self.play(FadeIn(l2[1], shift=UP * 0.1), FadeIn(ver, shift=UP * 0.2), FadeIn(c250), run_time=0.4)
        l3 = self.bloc(["Combien en reste-t-il,", "en millilitres ?"], 34, JAUNE_TITRE)
        self.col(l3, -0.15, x)
        self.au_mot("Combien en reste-t-il")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("en millilitres")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.3)
        l4 = self.bloc(["Peut-elle refaire", "la même sauce ?"], 34, JAUNE_TITRE)
        self.col(l4, -1.35, x)
        self.au_mot("Peut-elle refaire")
        self.play(FadeIn(l4[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("la même sauce")
        self.play(FadeIn(l4[1], shift=UP * 0.1), run_time=0.3)
        self.pause_defi(y=-2.35)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        b, cas, ver = self.cuisine()
        e15 = self.etiq(b, "1,5 L", U_L, 30)
        self.add(b, cas, ver, e15)
        x = -1.0
        l0 = self.t("Tout en millilitres :", 34, U_ML)
        self.col(l0, 2.25, x)
        self.au_mot("Tout en millilitres")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        l1 = self.ligne([("1 500,", U_ML), ("600", U_ML), ("et 250.", U_ML)], 38, buff=0.25)
        self.col(l1, 1.55, x)
        e1500 = self.lab("1 500 mL", 28, U_ML).next_to(b, DOWN, buff=0.18)
        c600 = self.lab("600 mL", 28, U_ML).next_to(cas, UP, buff=0.2)
        c250 = self.lab("250 mL", 28, U_ML).next_to(ver, UP, buff=0.25)
        for m, lg, fig in zip(["1 500", "600", "et 250"], l1, [e1500, c600, c250]):
            self.au_mot(m)
            self.play(FadeIn(lg, shift=UP * 0.1), FadeIn(fig, scale=1.15), run_time=0.3)
        l2 = self.ligne([("1 500", BLEU_D), ("− 600", BLEU_D), ("− 250", BLEU_D), ("= 650 mL", VERT_OK)], 36, buff=0.2)
        self.col(l2, 0.8, x)
        self.au_mot("1 500 moins")
        self.play(FadeIn(l2[0], shift=UP * 0.1), run_time=0.25)
        self.au_mot("moins 600")
        self.play(FadeIn(l2[1], shift=UP * 0.1), Indicate(cas, color=JAUNE_TITRE, scale_factor=1.06), run_time=0.3)
        self.au_mot("moins 250")
        self.play(FadeIn(l2[2], shift=UP * 0.1), Indicate(ver, color=JAUNE_TITRE, scale_factor=1.08), run_time=0.3)
        e650 = self.lab("650 mL", 28, VERT_OK).move_to(e1500)
        self.au_mot("650 millilitres")
        self.play(FadeIn(l2[3], shift=UP * 0.1), b.creme.animate.become(niveau(b, 650 / 1500)),
                  ReplacementTransform(e1500, e650), run_time=0.6)
        l3 = self.bloc(["La sauce demande 600 :", "oui, elle peut la refaire."], 34, WHITE)
        self.col(l3, -0.25, x)
        self.au_mot("La sauce demande 600")
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("oui")
        self.play(FadeIn(l3[1], shift=UP * 0.1), run_time=0.35)
        res = self.gros("Il restera 50 mL.", fs=40)
        self.col(res, -1.45, x)
        e50 = self.lab("50 mL", 28, VERT_OK).move_to(e1500)
        self.au_mot("Il restera 50 millilitres")
        self.play(FadeIn(res, scale=1.15), b.creme.animate.become(niveau(b, 50 / 1500)),
                  ReplacementTransform(e650, e50), run_time=0.6)
        self.insister(res, 1.06, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        bs = self.trois_bouteilles(x0=0, bas=0, k=0.0032, w=1.3, pas=1.42)
        ets = [self.etiq(b, s, U_ML, 23) for b, s in zip(bs, ["500 mL", "750 mL", "400 mL"])]
        fig = VGroup(*[VGroup(b, e) for b, e in zip(bs, ets)])
        lignes = self.finale_gauche(fig, textes=[
            ("Avant de comparer", "ou de calculer,"),
            ("on met tout dans", "la même unité."),
            ("Ensuite seulement,", "on calcule.")], fs=34, x_fig=-4.4, xl=-2.0)
        self.add(fig)
        self.au_mot("Avant de comparer")
        self.montrer_ligne(lignes[0], Indicate(fig, color=JAUNE_TITRE, scale_factor=1.04))
        self.au_mot("on met tout")
        self.montrer_ligne(lignes[1])
        self.au_mot("Ensuite seulement")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_comparer()
        self.ecran_soustraire()
        self.ecran_methode()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")
