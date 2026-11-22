# masse_cm2_defi.py
# EleveAI — Maths CM2 — série « Masses » (CP → CM2), ÉPISODE CM2 04 : le défi des masses
# (micro masse_defi, notion masse), AVEC VOIX. DERNIER épisode de la série.
# Paysage 16:9, CEINTURE BLEUE. Short jumeau (blanche) : film Ti Margo (le téléphérique de 0,4 t).
# Décor et métier : Hamza, PILOTE DE MONTGOLFIÈRE (avant chaque vol, il additionne toutes les masses).
# Mapping micro → écrans : 02 (le pilote 78,5 kg + le gaz 3 × 22 = 66 kg : 144,5 kg), 03 (450 − 144,5 = 305,5 kg
# pour les passagers), 04 question (72 kg + un sac de 3 500 g = 75,5 kg), 05 (4 × 75,5 = 302 < 305,5),
# 06 question (un 5e passager de 60 kg : non, il reste 3,5 kg), 07 défi (nacelle de 0,5 t, pilote 80 kg, gaz 70 kg,
# passagers de 75 kg), 07b correction (500 − 80 − 70 = 350 ; 4 → 300 ; 5 → 375 : au plus 4), 08 ce que tu as appris,
# 09 fin commune.
# Voix : manim/voix/cm2-masse-defi.json (source : masse_voix.py, validée le 16/11).
# Marques : python manim/scripts/ce2/perimetre_marques.py masse:defi:cm2
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/masse_cm2_defi.py MasseDefiCM2
# Sortie : manim/sorties/cm2/maths/masse/04-defi/eleveai-maths-cm2-masse-defi.mp4

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))  # dossier manim/ (fin_commune)

from masse_commun import *  # noqa: E402,F403
from masse_choisir_unite import MasseChoisirUniteCE2Base  # noqa: E402
from masse_cm1_comparer import abr, muet  # noqa: E402
from masse_probleme import coche, croix  # noqa: E402
from masse_cm2_estimer import adulte  # noqa: E402
from fin_commune import ecran_fin  # noqa: E402

_V = {e["id"]: e for e in json.load(open(Path(__file__).resolve().parent / "masse_voix.json", encoding="utf-8"))}
EP = _V["cm2-masse-defi"]
Q1, Q2 = EP["questions"]
C_G, C_KG, C_T = BLEU_D, VERT_OK, LOURD
ROUGE_X = "#ef4444"
OSIER = "#a16207"
CIEL = "#38bdf8"
CONTOUR = dict(stroke_color="#1f2937", stroke_width=2)
TENUES = ("#6366f1", "#db2777", "#16a34a", "#f59e0b", "#0891b2")
PEAUX = ("#e0ac69", "#8d5524", "#c68642", "#f1c27d", "#8d5524")


def hamza(s=1.0):
    """Hamza, pilote de montgolfière : blouson marron, casquette de pilote bleue, petite flamme sur la poitrine."""
    p = visage(personne(peau="#c68642", tenue="#92400e", cheveux="#111827", s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    cal = AnnularSector(inner_radius=0, outer_radius=r * 1.04, angle=PI, start_angle=0, fill_color="#1d4ed8",
                        fill_opacity=1, stroke_color="#1e3a8a", stroke_width=2).move_to(c + UP * r * 0.6)
    vis = RoundedRectangle(width=r * 1.1, height=r * 0.22, corner_radius=r * 0.1, fill_color="#1e3a8a",
                           fill_opacity=1, stroke_width=0).move_to(c + P(r * 0.85, r * 0.2))
    co = p.corps
    fl = Polygon(P(0, 0.16), P(0.09, -0.02), P(0.05, -0.1), P(-0.05, -0.1), P(-0.09, -0.02), fill_color="#f97316",
                 fill_opacity=1, stroke_color="#facc15", stroke_width=1.5).scale(s * 1.2)
    fl.move_to(co.get_center() + P(-co.width * 0.18, co.height * 0.18))
    p.add(cal, vis, fl)
    return p


def enveloppe(L=1.0):
    pts = [P(x * L, y * L) for x, y in ((-0.22, -0.78), (-0.55, -0.38), (-0.84, 0.22), (-0.76, 0.74),
                                        (-0.42, 1.03), (0.0, 1.1), (0.42, 1.03), (0.76, 0.74), (0.84, 0.22),
                                        (0.55, -0.38), (0.22, -0.78))]
    v = VMobject().set_points_smoothly(pts)
    v.add_line_to(pts[0])
    return v


def montgolfiere(s=1.0, nacelle_l=0.75, couleurs=("#ef4444", "#facc15", "#ef4444")):
    """Une montgolfière : enveloppe à fuseaux (trois bandes), jupe, brûleur, cordes, nacelle en osier (.nacelle).
    nacelle_l : largeur de la nacelle (élargie pour y mettre des passagers)."""
    e = enveloppe(1.0)
    bandes = VGroup()
    for f, c_ in zip((1.0, 0.62, 0.24), couleurs):
        b = e.copy().stretch(f, 0).set_fill(c_, 1).set_stroke("#7f1d1d", 2)
        bandes.add(b)
    jupe = Polygon(P(-0.22, -0.78), P(0.22, -0.78), P(0.17, -0.95), P(-0.17, -0.95), fill_color="#7f1d1d",
                   fill_opacity=1, stroke_width=0)
    bru = Rectangle(width=0.2, height=0.1, fill_color="#334155", fill_opacity=1, stroke_width=0).move_to(P(0, -1.03))
    w, yh, yb = nacelle_l, -1.45, -1.85
    cordes = VGroup(*[Line(P(u * 0.17, -0.95), P(u * (w / 2 - 0.03), yh), color="#d6d3d1", stroke_width=2)
                      for u in (-1, 1)])
    nac = Rectangle(width=w, height=yh - yb, fill_color=OSIER, fill_opacity=1, stroke_color="#713f12",
                    stroke_width=3).move_to(P(0, (yh + yb) / 2))
    bord = Rectangle(width=w + 0.06, height=0.07, fill_color="#713f12", fill_opacity=1,
                     stroke_width=0).move_to(P(0, yh))
    tresse = VGroup(*[Line(P(-w / 2 + 0.03, y), P(w / 2 - 0.03, y), color="#713f12", stroke_width=1.5)
                      for y in (yh - 0.13, yh - 0.26)])
    nacelle = VGroup(nac, bord, tresse)
    g = VGroup(bandes, jupe, bru, cordes, nacelle).scale(s)
    g.nacelle = nac
    g.panier = nacelle
    return g


def flamme(s=1.0):
    ext = Polygon(P(0, 0.3), P(0.12, 0.02), P(0.08, -0.1), P(-0.08, -0.1), P(-0.12, 0.02), fill_color="#f97316",
                  fill_opacity=1, stroke_width=0)
    inn = Polygon(P(0, 0.16), P(0.06, 0.0), P(0.0, -0.08), P(-0.06, 0.0), fill_color="#fde047", fill_opacity=1,
                  stroke_width=0)
    return VGroup(ext, inn).scale(s)


def bouteille_gaz(texte=None, s=1.0):
    """Une bouteille de gaz : corps bleu-gris arrondi, robinet, étiquette optionnelle (« 22 kg »)."""
    corps = RoundedRectangle(width=0.55 * s, height=1.05 * s, corner_radius=0.2 * s, fill_color="#64748b",
                             fill_opacity=1, stroke_color="#cbd5e1", stroke_width=2)
    col_ = Rectangle(width=0.16 * s, height=0.14 * s, fill_color="#94a3b8", fill_opacity=1,
                     stroke_width=0).next_to(corps, UP, buff=0)
    rob = Rectangle(width=0.3 * s, height=0.07 * s, fill_color="#facc15", fill_opacity=1,
                    stroke_width=0).next_to(col_, UP, buff=0)
    g = VGroup(corps, col_, rob)
    if texte:
        et = hors_audit(Text(texte, font_size=int(26 * s), color=WHITE, weight=BOLD)).move_to(corps)
        if et.width > corps.width * 0.9:
            et.scale_to_fit_width(corps.width * 0.9)
        g.add(et)
    return g


def passager(i, s=1.0):
    return adulte(s, TENUES[i % 5], PEAUX[i % 5], longs=i % 2 == 1)


def embarquer(mg, gens, s):
    """Range des passagers dans la nacelle (derrière le panier) : renvoie le groupe placé."""
    g = VGroup(*gens).arrange(RIGHT, buff=0.02 * s)
    g.move_to(mg.nacelle).align_to(mg.nacelle, DOWN).shift(UP * mg.nacelle.height * 0.35)
    g.set_z_index(1)
    mg.panier.set_z_index(2)
    return g


class MasseDefiCM2Base(MasseChoisirUniteCE2Base):
    nom_voix = "cm2-masse-defi"
    fichier_marques = "masse_cm2_defi_marques.json"
    ceinture = "bleue"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Le défi des masses", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("défi")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        mg = montgolfiere(1.35).move_to(P(-4.5, 0.4))
        self.au_mot("La nacelle")
        self.play(FadeIn(mg, shift=UP * 0.4), run_time=0.5)
        l1 = base_commune(self.ligne([("Au plus", WHITE), ("450 kg", C_KG)], 54, buff=0.3))
        l1.move_to(P(1.6, 0.9))
        self.morceaux(l1, ("au plus", "450 kilogrammes"))
        l2 = self.t("Combien de passagers ?", 44, JAUNE_TITRE).move_to(P(1.6, -0.35))
        self.au_mot("Combien")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 01 : Hamza, pilote de montgolfière ──────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        X = -2.7
        pe = hamza(1.45).move_to(P(-4.45, -0.2))
        nom = self.t("Hamza", 42, "#fb923c").next_to(pe, UP, buff=0.35)
        self.au_mot("Voici Hamza")
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        met = self.t("pilote de montgolfière", 26, "#fb923c").next_to(pe, DOWN, buff=0.15)
        self.au_mot("pilote")
        self.play(FadeIn(met), run_time=0.35)
        mg = montgolfiere(1.15).move_to(P(4.6, 0.9))
        self.au_mot("montgolfière")
        self.play(FadeIn(mg, shift=UP * 0.4), run_time=0.45)
        l0 = self.t("Avant chaque vol,", 38, WHITE)
        gauche(l0, X, 1.0)
        l1 = self.t("il additionne les masses :", 38, WHITE)
        gauche(l1, X, 0.2)
        self.au_mot("Avant")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        self.au_mot("il additionne")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        l2 = base_commune(self.ligne([("rien au-delà de", GRAY_B), ("450 kg", C_KG)], 38, buff=0.25))
        gauche(l2, X, -0.8)
        self.morceaux(l2, ("rien ne", "450 kilogrammes"))
        self.insister(l2[1], 1.12, 0.25)
        self.attendre_voix()

    # ── 02 : le pilote et le gaz (78,5 + 66 = 144,5 kg) ─────────────────────
    def ecran_pilote_gaz(self):
        self.ecran("02-pilote-gaz")
        tit = self.t("Le pilote et le gaz", 46, JAUNE_TITRE).move_to(P(0, 3.0))
        self.play(Write(tit), run_time=0.4)
        pe = hamza(1.05).move_to(P(-5.2, 0.9))
        X = -3.6
        l1 = base_commune(self.ligne([("Hamza :", WHITE), ("78,5 kg", C_KG)], 42, buff=0.25))
        gauche(l1, X, 1.4)
        self.au_mot("Hamza pèse")
        self.play(FadeIn(pe, shift=UP * 0.2), FadeIn(l1[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("78,5")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        bts = VGroup(*[bouteille_gaz("22 kg", 1.4) for _ in range(3)]).arrange(RIGHT, buff=0.14)
        bts.move_to(P(-5.0, -1.7))
        self.au_mot("Les bouteilles")
        self.play(LaggedStart(*[FadeIn(b, shift=DOWN * 0.2) for b in bts], lag_ratio=0.2), run_time=0.5)
        l2 = base_commune(self.ligne([("Le gaz :", WHITE), ("3 × 22", WHITE), ("= 66 kg", C_KG)], 42, buff=0.25))
        gauche(l2, X, 0.3)
        self.morceaux(l2, ("gaz", "3 fois", "66 kilogrammes"))
        l3 = base_commune(self.ligne([("78,5", C_KG), ("+ 66", C_KG), ("= 144,5 kg", JAUNE_TITRE)], 46, buff=0.25))
        gauche(l3, X + 0.6, -1.2)
        self.morceaux(l3, (9.40, "plus 66", "144,5"))
        self.insister(l3[2], 1.12, 0.25)
        self.attendre_voix()

    # ── 03 : ce qu'il reste pour les passagers (305,5 kg) ───────────────────
    def ecran_reste(self):
        self.ecran("03-reste")
        tit = self.t("Ce qu'il reste", 46, JAUNE_TITRE).move_to(P(0, 3.0))
        self.play(Write(tit), run_time=0.4)
        mg = montgolfiere(1.6, nacelle_l=1.1).move_to(P(-4.6, -0.2))
        pe = hamza(0.5)
        pg = embarquer(mg, [pe], 1.6)
        self.add(mg, pg)
        l1 = base_commune(self.ligne([("450", C_KG), ("− 144,5", WHITE), ("= 305,5 kg", JAUNE_TITRE)], 50,
                                     buff=0.28))
        gauche(l1, -2.0, 1.2)
        self.morceaux(l1, ("450 moins", "144,5", "305,5"))
        self.insister(l1[2], 1.12, 0.25)
        l2 = self.t("pour les passagers", 42, WHITE)
        gauche(l2, -2.0, 0.1)
        self.au_mot("pour les")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (72 kg + 3 500 g = 75,5 kg) ─────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        pa = passager(0, 0.85).move_to(P(-5.6, 1.85))
        sc_ = sac(None, 0.7, "#7c3aed").next_to(pa, RIGHT, buff=0.08).align_to(pa, DOWN)

        def avant_q(sc):
            sc.play(FadeIn(pa, shift=DOWN * 0.2), FadeIn(sc_, shift=DOWN * 0.2), run_time=0.2)

        self._ph_mots = {(0, 0): "3 500 grammes, c'est", (1, 0): "72 plus", (2, 0): "75,5"}
        self.question_gauche("04-question", "04b-reponse",
                             ["Un passager : 72 kg,", "un sac : 3 500 g.", "Masse en tout ?"],
                             [self.choix(abr(c_), fs=26) for c_ in Q1["choix"]], Q1["reponse"],
                             ["3 500 g = 3,5 kg", "72 + 3,5", "= 75,5 kg."],
                             -0.2, mot_q="Un passager", avant_q=avant_q)
        self._ph_mots, self._q_apres = {}, {}

    # ── 05 : quatre passagers (4 × 75,5 = 302 < 305,5) ──────────────────────
    def ecran_quatre(self):
        self.ecran("05-quatre", 0.65)
        tit = self.t("Quatre passagers", 46, JAUNE_TITRE).move_to(P(0, 3.0))
        mg = montgolfiere(1.55, nacelle_l=1.6).move_to(P(-4.5, -0.2))
        self.play(Write(tit), FadeIn(mg), run_time=0.4)
        gens = embarquer(mg, [passager(i, 0.42) for i in range(4)], 1.55)
        X = -1.6
        l1 = base_commune(self.ligne([("4 × 75,5", WHITE), ("= 302 kg", JAUNE_TITRE)], 48, buff=0.28))
        gauche(l1, X, 1.4)
        self.au_mot("Quatre passagers")
        self.play(LaggedStart(*[FadeIn(g_, shift=DOWN * 0.3) for g_ in gens], lag_ratio=0.2), run_time=0.6)
        self.morceaux(l1, ("4 fois", "302 kilogrammes"))
        self.insister(l1[1], 1.12, 0.25)
        l2 = base_commune(self.ligne([("302", C_KG), ("<", WHITE), ("305,5", C_KG)], 48, buff=0.28))
        muet(l2[0])  # 2e « 302 » sans marque : montré à son instant WAV (9,10 s)
        gauche(l2, X, 0.2)
        self.morceaux(l2, (9.10, "plus petit", "305,5"))
        ok = coche(1.1).next_to(l2, RIGHT, buff=0.4)
        l3 = self.t("Ils peuvent monter !", 42, VERT_OK)
        gauche(l3, X, -1.0)
        self.au_mot("ils peuvent")
        self.play(FadeIn(l3, shift=UP * 0.1), Create(ok), run_time=0.4)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (un 5e passager de 60 kg : non, il reste 3,5 kg) ────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        pa = passager(4, 0.85).move_to(P(-5.5, 1.85))
        et = hors_audit(self.t("?", 48, JAUNE_TITRE)).next_to(pa, RIGHT, buff=0.15)

        def avant_q(sc):
            sc.play(FadeIn(pa, shift=DOWN * 0.2), FadeIn(et), run_time=0.2)

        self._ph_mots = {(0, 0): "305,5 moins", (1, 0): "il reste 3,5", (2, 0): "60, c'est", (3, 0): "bien trop"}
        self.question_gauche("06-question", "06b-reponse",
                             ["Un cinquième passager", "de 60 kg", "veut monter.", "Est-ce possible ?"],
                             [self.choix(abr(c_), fs=24) for c_ in Q2["choix"]], Q2["reponse"],
                             ["305,5 − 302", "= 3,5 kg restants.", "60 kg :", "bien trop !"],
                             -0.2, mot_q="Un cinquième", avant_q=avant_q)
        self._ph_mots, self._q_apres = {}, {}

    # ── 07 : le défi (nacelle de 0,5 t) ─────────────────────────────────────
    def ecran_defi(self):
        self.ecran("07-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        mg = montgolfiere(1.25, couleurs=("#2563eb", "#f8fafc", "#2563eb")).move_to(P(-4.7, 0.2))
        X = -2.0
        l1 = base_commune(self.ligne([("Une nacelle :", WHITE), ("0,5 t", C_T), ("au plus", WHITE)], 42, buff=0.25))
        gauche(l1, X, 2.0)
        self.au_mot("Une autre")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(mg, shift=UP * 0.3), run_time=0.35)
        self.au_mot("0,5")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        l2 = base_commune(self.ligne([("Le pilote :", WHITE), ("80 kg", C_KG)], 42, buff=0.25))
        gauche(l2, X, 1.1)
        self.morceaux(l2, ("Le pilote", "80 kilogrammes"))
        l3 = base_commune(self.ligne([("Le gaz :", WHITE), ("70 kg", C_KG)], 42, buff=0.25))
        gauche(l3, X, 0.2)
        self.morceaux(l3, ("le gaz", "70 kilogrammes"))
        l4 = self.t("Combien de passagers", 42, JAUNE_TITRE)
        gauche(l4, X, -0.75)
        self.au_mot("Combien de passagers")
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.3)
        l5 = base_commune(self.ligne([("de 75 kg,", C_KG), ("au plus ?", JAUNE_TITRE)], 42, buff=0.25))
        gauche(l5, X, -1.6)
        self.morceaux(l5, ("75 kilogrammes", "au plus ?"))
        self.au_mot("Mets pause")
        p = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE)
        gauche(p, -6.0, -3.2)
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("07b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        X = -6.2
        l1 = base_commune(self.ligne([("0,5 t", C_T), ("= 500 kg", C_KG)], 42, buff=0.25))
        gauche(l1, X, 2.1)
        self.morceaux(l1, ("0,5 tonne", "500 kilogrammes"))
        l2 = base_commune(self.ligne([("500", C_KG), ("− 80", WHITE), ("− 70", WHITE), ("= 350 kg", JAUNE_TITRE)], 42,
                                     buff=0.25))
        muet(l2[0])  # 2e « 500 » sans marque : montré à son instant WAV (5,96 s)
        gauche(l2, X, 1.15)
        self.morceaux(l2, (5.96, "80 moins", "70 :", "350."))
        l3 = base_commune(self.ligne([("4 passagers :", WHITE), ("300 kg", C_KG)], 42, buff=0.25))
        gauche(l3, X, 0.2)
        self.morceaux(l3, ("4 passagers :", "300 kilogrammes"))
        ok = coche(1.0).next_to(l3, RIGHT, buff=0.35)
        self.play(Create(ok), run_time=0.3)
        l4 = base_commune(self.ligne([("5 passagers :", WHITE), ("375 kg", ROUGE_X)], 42, buff=0.25))
        gauche(l4, X, -0.75)
        self.morceaux(l4, ("5 passagers", "375"))
        nx = croix(0.9).next_to(l4, RIGHT, buff=0.35)
        tr = self.t("trop !", 38, ROUGE_X).next_to(nx, RIGHT, buff=0.25)
        self.au_mot("trop")
        self.play(Create(nx), FadeIn(tr), run_time=0.35)
        l5 = self.t("Au plus 4 passagers", 46, JAUNE_TITRE)
        gauche(l5, X, -1.9)
        cadre = SurroundingRectangle(l5, color=JAUNE_TITRE, buff=0.2, corner_radius=0.1)
        self.au_mot("Au plus")
        self.play(FadeIn(l5, shift=UP * 0.1), Create(cadre), run_time=0.4)
        mg = montgolfiere(1.1, nacelle_l=1.45, couleurs=("#2563eb", "#f8fafc", "#2563eb")).move_to(P(5.0, 0.9))
        gens = embarquer(mg, [passager(i, 0.32) for i in range(4)], 1.1)
        self.play(FadeIn(mg), LaggedStart(*[FadeIn(g_, shift=DOWN * 0.2) for g_ in gens], lag_ratio=0.15),
                  run_time=0.6)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.65)
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        l0 = self.t("Dans un défi à étapes :", 42, WHITE)
        gauche(l0, -5.6, 1.9)
        self.au_mot("Dans un")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        lignes = []
        for i, (txt, y, mot) in enumerate((("on convertit,", 0.85, "convertit"),
                                           ("on calcule chaque étape,", -0.2, "calcule"),
                                           ("on vérifie avec la limite.", -1.25, "vérifie"))):
            l_ = base_commune(self.ligne([(f"{i + 1}.", JAUNE_TITRE), (txt, WHITE)], 40, buff=0.22))
            hors_audit(l_[0])
            gauche(l_, -5.2, y)
            lignes.append(l_)
            self.au_mot(mot)
            self.play(FadeIn(l_, shift=UP * 0.1), run_time=0.35)
        ok = coche(1.0).next_to(lignes[2], RIGHT, buff=0.4)
        self.play(Create(ok), run_time=0.35)
        self.attendre_voix(marge=1.8)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_pilote_gaz()
        self.ecran_reste()
        self.ecran_question1()
        self.ecran_quatre()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        ecran_fin(self, "paysage", voix="09-abonne")


class MasseDefiCM2(MasseDefiCM2Base):
    identite = "Maths CM2 — EleveAI"
    ceinture = "bleue"
