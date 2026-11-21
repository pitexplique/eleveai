# masse_cm1_comparer.py
# EleveAI — Maths CM1 — série « Masses » (CP → CM2), ÉPISODE CM1 01 : comparer des masses
# (micro masse_comparer, notion masse), AVEC VOIX.
# Paysage 16:9, CEINTURE JAUNE. Short jumeau (blanche) : film Ti Margo (3 500 g contre 4 kg de cartable).
# Décor et métier : Ilyes, JOCKEY (on le pèse avec sa selle avant la course).
# Mapping micro → écrans : 02 (les signes : 54 kg < 56 kg), 03 (selles 2 kg 50 g / 2 500 g : tout en grammes),
# 04 question (3 kg ou 2 900 g), 05 (le camion : 3 t 500 kg = 3 500 kg > 3 000 kg), 06 question (la plus légère :
# 1 kg 200 g, 1 020 g, 1 kg 2 g), 07 défi (trois jockeys à ranger), 07b correction, 08 ce que tu as appris,
# 09 fin commune.
# Voix : manim/voix/cm1-masse-comparer.json (source : masse_voix.py, validée le 16/11).
# Marques : python manim/scripts/ce2/perimetre_marques.py masse:comparer:cm1
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/masse_cm1_comparer.py MasseComparerCM1
# Sortie : manim/sorties/cm1/maths/masse/01-comparer/eleveai-maths-cm1-masse-comparer.mp4

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))  # dossier manim/ (fin_commune)

from masse_commun import *  # noqa: E402,F403
from masse_choisir_unite import MasseChoisirUniteCE2Base, court  # noqa: E402
from masse_relations import camion_m  # noqa: E402
from fin_commune import ecran_fin  # noqa: E402

_V = {e["id"]: e for e in json.load(open(Path(__file__).resolve().parent / "masse_voix.json", encoding="utf-8"))}
EP = _V["cm1-masse-comparer"]
Q1, Q2 = EP["questions"]
C_G, C_KG, C_T = BLEU_D, VERT_OK, LOURD
CASAQUE = "#e11d48"
CUIR = "#92400e"


def abr(s):
    """Les unités en symboles, comme à l'écran (« 3 kilogrammes » → « 3 kg »)."""
    for long_, sym in (("kilogrammes", "kg"), ("kilogramme", "kg"), ("grammes", "g"), ("gramme", "g"),
                       ("tonnes", "t")):
        s = s.replace(long_, sym)
    return court(s)


def ilyes(s=1.0):
    """Ilyes, jockey : casaque rouge, casque jaune à visière, un losange jaune sur la poitrine."""
    p = visage(personne(peau="#8d5524", tenue=CASAQUE, cheveux="#111827", s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    casque = AnnularSector(inner_radius=0, outer_radius=r * 1.06, angle=PI, start_angle=0, fill_color="#facc15",
                           fill_opacity=1, stroke_color="#a16207", stroke_width=2).move_to(c + UP * r * 0.6)
    visiere = RoundedRectangle(width=r * 1.2, height=r * 0.2, corner_radius=r * 0.1, fill_color="#eab308",
                               fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.34 + RIGHT * r * 0.55)
    los = Square(side_length=r * 0.75, fill_color="#facc15", fill_opacity=1, stroke_width=0).rotate(PI / 4)
    los.move_to(c + DOWN * r * 2.55)
    p.add(los, casque, visiere)
    return p


def selle(s=1.0, couleur=CUIR):
    """Une selle de course, de profil : siège creusé (troussequin à gauche, pommeau à droite), quartier,
    sangle et étrier."""
    siege = Polygon(P(-0.78, 0.34), P(-0.62, 0.1), P(-0.3, 0.0), P(0.3, 0.0), P(0.58, 0.2), P(0.74, 0.12),
                    P(0.6, -0.16), P(-0.62, -0.16), fill_color=couleur, fill_opacity=1, stroke_color="#451a03",
                    stroke_width=3).round_corners(0.05).scale(s)
    quartier = RoundedRectangle(width=0.62 * s, height=0.5 * s, corner_radius=0.1 * s, fill_color="#b45309",
                                fill_opacity=1, stroke_color="#451a03", stroke_width=2)
    quartier.move_to(siege.get_bottom() + DOWN * 0.18 * s)
    fil = Line(P(0, -0.2 * s), P(0, -0.78 * s), color="#1f2937", stroke_width=4 * s)
    etrier = Polygon(P(-0.13, -0.78), P(0.13, -0.78), P(0.18, -0.98), P(-0.18, -0.98), fill_opacity=0,
                     stroke_color=METAL, stroke_width=5 * s).scale(s, about_point=ORIGIN)
    g = VGroup(fil, etrier, quartier, siege)
    return g


def muet(m):
    """Un nombre REDIT par l'écrit, pas par la voix (ou montré avec sa ligne) : ni audit, ni synchro."""
    for f in m.get_family():
        f._pas_audit = True
        f.sans_synchro = True
    return m


class MasseComparerCM1Base(MasseChoisirUniteCE2Base):
    nom_voix = "cm1-masse-comparer"
    fichier_marques = "masse_cm1_comparer_marques.json"
    ceinture = "jaune"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Comparer des masses", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Comparer")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        sa, sb = selle(1.5).move_to(P(-4.0, 0.75)), selle(1.5, "#7c2d12").move_to(P(0.6, 0.75))
        la = base_commune(self.ligne([("2 kg", C_KG), ("50 g", C_G)], 44, buff=0.2))
        la.next_to(sa, DOWN, buff=0.3)
        lb = self.t("2 500 g", 44, C_G).next_to(sb, DOWN, buff=0.3)
        ou = self.t("ou", 38, GRAY_B).move_to(P(-1.7, la.get_center()[1]))
        self.au_mot("2 kilogrammes")
        self.play(FadeIn(sa, shift=DOWN * 0.2), FadeIn(la[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("50 grammes")
        self.play(FadeIn(la[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("ou 2 500")
        self.play(FadeIn(ou), run_time=0.2)
        self.au_mot("2 500 grammes")
        self.play(FadeIn(sb, shift=DOWN * 0.2), FadeIn(lb, shift=UP * 0.1), run_time=0.35)
        q = self.t("?", 90, JAUNE_TITRE).move_to(P(-1.7, 0.85))
        self.au_mot("plus lourd")
        self.play(FadeIn(q, scale=1.3), run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 01 : Ilyes, jockey ──────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        X = 0.2
        pi_ = ilyes(1.45).move_to(P(-5.3, -0.2))
        nom = self.t("Ilyes", 42, CASAQUE).next_to(pi_, UP, buff=0.3)
        self.au_mot("Voici Ilyes")
        self.play(FadeIn(pi_, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        met = self.t("jockey", 28, CASAQUE).next_to(pi_, DOWN, buff=0.15)
        ch = cheval(1.55).move_to(P(-2.4, -1.0))
        l0 = self.t("Il monte des chevaux", 38, WHITE)
        l0b = self.t("de course.", 38, WHITE)
        gauche(l0, X, 2.4)
        gauche(l0b, X, 1.65)
        self.au_mot("Il est jockey")
        self.play(FadeIn(met), FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        self.au_mot("des chevaux")
        self.play(FadeIn(ch, shift=LEFT * 0.3), FadeIn(l0b, shift=UP * 0.1), run_time=0.45)
        s_ = selle(1.0).move_to(ch[3].get_top() + UP * 0.12)
        l1 = self.t("Avant la course :", 36, GRAY_B)
        l1b = self.t("on le pèse avec sa selle.", 36, GRAY_B)
        gauche(l1, X, 0.4)
        gauche(l1b, X, -0.35)
        self.au_mot("Avant chaque")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("on le pèse")
        self.play(FadeIn(l1b, shift=UP * 0.1), run_time=0.3)
        self.au_mot("sa selle")
        self.play(FadeIn(s_, shift=DOWN * 0.3), run_time=0.35)
        l2 = self.t("Pas trop lourd !", 44, JAUNE_TITRE)
        gauche(l2, X, -1.5)
        self.au_mot("trop lourd")
        self.play(FadeIn(l2, scale=1.15), run_time=0.35)
        self.attendre_voix()

    # ── 02 : les signes (54 kg < 56 kg) ─────────────────────────────────────
    def ecran_signes(self):
        self.ecran("02-signes")
        X = -0.4
        l0 = self.t("Comparer : des signes.", 38, WHITE)
        gauche(l0, X, 2.4)
        self.au_mot("Pour comparer")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        pa = muet(pese_personne("54 kg", 1.3)).move_to(P(-5.0, -0.3))
        pb = muet(pese_personne("56 kg", 1.3)).move_to(P(-2.3, -0.3))
        l1 = base_commune(self.ligne([("54 kg", C_KG), ("<", JAUNE_TITRE), ("56 kg", C_KG)], 64, buff=0.35))
        gauche(l1, X, 1.0)
        self.au_mot("54 kilogrammes")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(pa, shift=UP * 0.2), run_time=0.35)
        l2 = base_commune(self.ligne([("<", JAUNE_TITRE), (": plus petit que", WHITE)], 38, buff=0.2))
        l3 = hors_audit(base_commune(self.ligne([(">", JAUNE_TITRE), (": plus grand que", GRAY_B)], 38, buff=0.2)))
        gauche(l2, X, -0.3)
        gauche(l3, X, -1.1)
        self.au_mot("est plus")
        self.play(FadeIn(l1[1], scale=1.3), FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("56 kilogrammes")
        self.play(FadeIn(l1[2], shift=UP * 0.1), FadeIn(pb, shift=UP * 0.2), run_time=0.35)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        self.insister(l1[1], 1.3, 0.25)
        self.attendre_voix()

    # ── 03 : les deux selles (2 kg 50 g / 2 500 g) ──────────────────────────
    def ecran_convertir(self):
        self.ecran("03-convertir")
        X = 0.1
        sa = selle(1.25).move_to(P(-5.1, 1.9))
        sb = selle(1.25, "#7c2d12").move_to(P(-2.3, 1.9))
        na = self.t("Ilyes", 28, CASAQUE).next_to(sa, DOWN, buff=0.15)
        nb = self.t("son ami", 28, GRAY_B).next_to(sb, DOWN, buff=0.15)
        l0 = base_commune(self.ligne([("Ilyes :", WHITE), ("2 kg", C_KG), ("50 g", C_G)], 42, buff=0.22))
        gauche(l0, X, 2.5)
        self.au_mot("La selle")
        self.play(FadeIn(l0[0], shift=UP * 0.1), FadeIn(sa, shift=DOWN * 0.2), FadeIn(na), run_time=0.35)
        self.morceaux(l0[1:], ("2 kilogrammes", "50 grammes"))
        l1 = base_commune(self.ligne([("Son ami :", WHITE), ("2 500 g", C_G)], 42, buff=0.22))
        gauche(l1, X, 1.6)
        self.au_mot("Celle de")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(sb, shift=DOWN * 0.2), FadeIn(nb), run_time=0.35)
        self.morceaux(l1[1:], ("2 500 grammes",))
        l2 = self.t("Tout en grammes :", 40, JAUNE_TITRE)
        gauche(l2, X, 0.55)
        self.au_mot("On met")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        l3 = base_commune(self.ligne([("2 kg 50 g", WHITE), ("= 2 050 g", C_G)], 44, buff=0.25))
        hors_audit(l3[0])
        gauche(l3, X, -0.4)
        self.play(FadeIn(l3[0], shift=UP * 0.1), run_time=0.3)
        self.morceaux(l3[1:], ("2 050 grammes",))
        self.insister(l3[1], 1.12, 0.25)
        l4 = base_commune(self.ligne([("2 050", WHITE), ("<", JAUNE_TITRE), ("2 500", WHITE)], 50, buff=0.32))
        gauche(l4, X, -1.4)
        self.morceaux(l4, (11.34, "plus petit", "2 500."))
        b = Balance(4.2, -0.6, s=0.85).move_to(P(-3.7, -1.55))
        ca, cb = sa.copy(), sb.copy()
        b.poser(ca.scale(0.75), "g")
        b.poser(cb.scale(0.75), "d")
        self.au_mot("La selle de l'ami")
        self.play(FadeIn(b, shift=UP * 0.2), TransformFromCopy(sa, ca), TransformFromCopy(sb, cb), run_time=0.6)
        self.play(Indicate(VGroup(sb, nb), color=LOURD, scale_factor=1.1), run_time=0.35)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (3 kg ou 2 900 g) ───────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()

        def avant_q(sc):
            sc._q_mots = {1: "3 kilogrammes,", 2: "2 900 grammes ?"}

        self._ph_mots = {(0, 0): 0.83, (1, 0): "3 000 grammes", (2, 0): 4.20, (3, 0): "2 900."}
        self.question_gauche("04-question", "04b-reponse",
                             ["Le plus lourd :", "3 kg", "ou 2 900 g ?"],
                             [self.choix(abr(c_), fs=26) for c_ in Q1["choix"]], Q1["reponse"],
                             ["3 kg =", "3 000 g.", "3 000 >", "2 900."],
                             -0.2,
                             mot_q="Qu'est-ce", avant_q=avant_q)
        self._ph_mots, self._q_apres = {}, {}

    # ── 05 : les très lourds (le camion : 3 t 500 kg) ───────────────────────
    def ecran_tonne(self):
        self.ecran("05-tonne")
        X = -1.9
        l0 = self.t("Et les très lourds ?", 44, JAUNE_TITRE)
        gauche(l0, X, 2.5)
        self.au_mot("Et les")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        cm = camion_m(1.05).move_to(P(-4.4, -1.3))
        cm.add(cheval(0.62, "#d6a35c").move_to(cm[0]))
        l1 = base_commune(self.ligne([("Le camion :", WHITE), ("3 t", C_T), ("500 kg", C_KG)], 42, buff=0.22))
        gauche(l1, X, 1.4)
        self.au_mot("Le camion")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(cm, shift=RIGHT * 0.4), run_time=0.4)
        self.morceaux(l1[1:], ("3 tonnes", "500 kilogrammes"))
        l2 = base_commune(self.ligne([("soit", WHITE), ("3 500 kg", C_KG)], 46, buff=0.22))
        gauche(l2, X, 0.35)
        self.morceaux(l2, ("soit", "3 500 kilogrammes"))
        self.insister(l2[1], 1.12, 0.25)
        l3 = base_commune(self.ligne([("Plus que", WHITE), ("3 t", C_T), ("= 3 000 kg", C_KG)], 40,
                                     buff=0.22))
        gauche(l3, X, -0.75)
        self.morceaux(l3, ("C'est plus", "3 tonnes :", 10.26))
        l4 = base_commune(self.ligne([("3 500 kg", C_KG), (">", JAUNE_TITRE), ("3 000 kg", C_KG)], 46, buff=0.3))
        hors_audit(l4)
        gauche(l4, X, -1.8)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.35)
        self.insister(l4[1], 1.3, 0.25)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (la plus légère) ────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()

        def avant_q(sc):
            sc._q_mots = {1: "1 kilogramme 200", 2: "1 020 grammes,", 3: "1 kilogramme 2 grammes ?"}

        self._ph_mots = {(0, 0): "En grammes", (1, 0): "1 200,", (1, 1): 3.62, (2, 0): 4.15,
                         (3, 0): "La plus", (4, 0): "1 002 grammes"}
        self.question_gauche("06-question", "06b-reponse",
                             ["La plus légère :", "1 kg 200 g,", "1 020 g,", "ou 1 kg 2 g ?"],
                             [self.choix(abr(c_), fs=26) for c_ in Q2["choix"]], Q2["reponse"],
                             ["En grammes :", "1 200 ; 1 020 ;", "1 002.", "La plus petite :", "1 002 g."],
                             -0.4, couper={1: ("1 200 ;", "1 020 ;")},
                             mot_q="La plus", avant_q=avant_q)
        self._ph_mots, self._q_apres = {}, {}

    # ── 07 : le défi (trois jockeys à ranger) ───────────────────────────────
    def jockeys(self, valeurs, mots, couleurs=(CASAQUE, "#2563eb", "#16a34a"), y0=2.05):
        X = -4.7
        rangs = VGroup()
        for i, ((nom, morceaux_), mot, coul) in enumerate(zip(valeurs, mots, couleurs)):
            y = y0 - 1.05 * i
            tete = visage(personne(peau=("#8d5524", "#e0ac69", "#c68642")[i], tenue=coul, cheveux="#111827",
                                   longs=(i == 2), s=0.42))
            tete.move_to(P(-5.9, y - 0.05))
            l = base_commune(self.ligne([(f"{nom} :", WHITE)] + [(m, c) for m, c in morceaux_], 42, buff=0.2))
            gauche(l, X, y)
            hors_audit(tete)
            for k, (m, mt) in enumerate(zip(l, mot)):
                if mt is not None:
                    self.au_t(mt) if isinstance(mt, (int, float)) else self.au_mot(mt)
                anims = [FadeIn(m, shift=UP * 0.1)] + ([FadeIn(tete, shift=RIGHT * 0.2)] if k == 0 else [])
                self.play(*anims, run_time=0.3)
            rangs.add(VGroup(tete, l))
        return rangs

    def ecran_defi(self):
        self.ecran("07-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        self.jockeys([("Ilyes", (("57 kg", C_KG), ("300 g", C_G))),
                      ("Jules", (("57 030 g", C_G),)),
                      ("Inaya", (("57 kg", C_KG), ("3 g", C_G)))],
                     [("Ilyes :", "57 kilogrammes 300", "300 grammes."),
                      ("Jules :", "57 030"),
                      ("Inaya :", "57 kilogrammes 3 grammes", "3 grammes.")])
        q = self.t("Range-les du plus léger", 40, JAUNE_TITRE)
        q2 = self.t("au plus lourd.", 40, JAUNE_TITRE)
        gauche(q, -6.3, -1.2)
        gauche(q2, -6.3, -1.9)
        self.au_mot("Range-les")
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.3)
        self.au_mot("au plus lourd")
        self.play(FadeIn(q2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Mets pause")
        p = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE)
        gauche(p, -6.3, -2.85)
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("07b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        eg = self.t("En grammes :", 36, GRAY_B)
        gauche(eg, -6.3, 2.35)
        self.au_mot("En grammes")
        self.play(FadeIn(eg, shift=UP * 0.1), run_time=0.3)
        r = self.jockeys([("Ilyes", (("57 300 g", C_G),)),
                          ("Jules", (("57 030 g", C_G),)),
                          ("Inaya", (("57 003 g", C_G),))],
                         [("Ilyes,", "57 300."), ("Jules,", "57 030."), ("Inaya,", "57 003.")], y0=1.5)
        l0 = self.t("Du plus léger au plus lourd :", 38, WHITE)
        gauche(l0, -6.3, -1.7)
        self.au_mot("Du plus")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        l1 = self.ligne([("Inaya", VERT_OK), ("< Jules", VERT_OK), ("< Ilyes", VERT_OK)], 46, buff=0.3)
        gauche(l1, -6.3, -2.6)
        self.morceaux(l1, ("Inaya, Jules", "Jules, puis", "Ilyes."))
        self.play(Indicate(r[2], color=VERT_OK, scale_factor=1.06), run_time=0.35)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.65)
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        b = Balance(3.6, -0.6, s=0.8).move_to(P(-4.0, -0.6))
        ca, cb = selle(0.85), selle(0.85, "#7c2d12")
        b.poser(ca, "g")
        b.poser(cb, "d")
        fig = hors_audit(VGroup(b, ca, cb))
        X = -1.0
        l0 = self.t("Pour comparer des masses :", 34, WHITE)
        l0b = self.t("d'abord la même unité.", 34, VERT_OK)
        gauche(l0, X, 1.7)
        gauche(l0b, X, 1.0)
        self.au_mot("Pour comparer")
        self.play(FadeIn(fig, shift=UP * 0.2), FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        self.au_mot("la même")
        self.play(FadeIn(l0b, shift=UP * 0.1), run_time=0.35)
        l1 = self.t("Puis on compare les nombres,", 32, WHITE)
        l1b = self.t("chiffre par chiffre.", 34, JAUNE_TITRE)
        gauche(l1, X, -0.3)
        gauche(l1b, X, -1.0)
        self.au_mot("Puis on")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("chiffre par")
        self.play(FadeIn(l1b, shift=UP * 0.1), run_time=0.35)
        ex = hors_audit(self.t("2 kg 50 g = 2 050 g < 2 500 g", 30, GRAY_B))
        gauche(ex, X, -1.9)
        self.play(FadeIn(ex, shift=UP * 0.1), run_time=0.3)
        self.attendre_voix(marge=1.8)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_signes()
        self.ecran_convertir()
        self.ecran_question1()
        self.ecran_tonne()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        ecran_fin(self, "paysage", voix="09-abonne")


class MasseComparerCM1(MasseComparerCM1Base):
    identite = "Maths CM1 — EleveAI"
    ceinture = "jaune"
