# masse_probleme.py
# EleveAI — Maths CE2 — série « Masses » (CP → CM2), ÉPISODE CE2 06 : problèmes de masses
# (micro ce2_masse_probleme, notion masse), AVEC VOIX.
# Paysage 16:9, CEINTURE JAUNE. Short jumeau (jaune) : film Ti Margo (la valise de 24 kg, 23 kg au plus).
# Décor et métier : Adam, AGENT D'ENREGISTREMENT à l'aéroport (il pèse les valises : 23 kg au plus).
# Mapping micro → écrans : 02 (ajouter : 18 kg + 3 kg = 21 kg, ça passe), 03 (enlever : 25 − 23 = 2 kg),
# 04 question (2 kg de livres + 750 g de jouets = 2 750 g), 05 (plein − vide : 1 200 − 300 = 900 g),
# 06 question (équilibre : 500 + 200 + 200 = 900 g), 07 défi (valise de Nina : 20 + 2 + 2 = 24 kg),
# 07b correction, 08 ce que tu as appris, 09 fin commune.
# Voix : manim/voix/ce2-masse-probleme.json (source : masse_voix.py, validée le 16/11).
# Marques : python manim/scripts/ce2/perimetre_marques.py masse:probleme
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/masse_probleme.py MasseProblemeCE2
# Sortie : manim/sorties/ce2/maths/masse/06-probleme/eleveai-maths-ce2-masse-probleme.mp4

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))  # dossier manim/ (fin_commune)

from masse_commun import *  # noqa: E402,F403
from masse_choisir_unite import MasseChoisirUniteCE2Base, court  # noqa: E402
from fin_commune import ecran_fin  # noqa: E402

_V = {e["id"]: e for e in json.load(open(Path(__file__).resolve().parent / "masse_voix.json", encoding="utf-8"))}
EP = _V["ce2-masse-probleme"]
Q1, Q2 = EP["questions"]
C_G, C_KG = BLEU_D, VERT_OK
AERO = "#0ea5e9"


def adam(s=1.0):
    """Adam, agent d'enregistrement : veste bleu marine, foulard jaune, badge blanc."""
    p = visage(personne(peau="#a0662f", tenue="#1e3a8a", cheveux="#111827", s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    cou = p.tete.get_bottom()
    foulard = Triangle(fill_color="#facc15", fill_opacity=1, stroke_width=0).scale(r * 0.42).rotate(PI)
    foulard.move_to(cou + DOWN * r * 0.45)
    badge = RoundedRectangle(width=r * 0.55, height=r * 0.36, corner_radius=r * 0.06, fill_color=WHITE,
                             fill_opacity=1, stroke_width=0).move_to(cou + P(r * 0.75, -r * 1.05))
    p.add(foulard, badge)
    return p


def coche(s=1.0, couleur=VERT_OK):
    """Une coche dessinée (✓)."""
    return VMobject(stroke_color=couleur, stroke_width=9 * s).set_points_as_corners(
        [P(-0.28 * s, 0.0), P(-0.08 * s, -0.22 * s), P(0.32 * s, 0.26 * s)])


def croix(s=1.0, couleur=ROUGE_ERREUR):
    """Une croix dessinée (✗)."""
    return VGroup(Line(P(-0.25 * s, -0.25 * s), P(0.25 * s, 0.25 * s), color=couleur, stroke_width=9 * s),
                  Line(P(-0.25 * s, 0.25 * s), P(0.25 * s, -0.25 * s), color=couleur, stroke_width=9 * s))


def pancarte(sc, s=1.0):
    """La pancarte du comptoir : « 23 kg / au plus » (textes de la scène : l'audit les suit)."""
    t1 = sc.t("23 kg", int(44 * s), ROUGE_ERREUR)
    t2 = sc.t("au plus", int(30 * s), "#1f2937")
    VGroup(t1, t2).arrange(DOWN, buff=0.1 * s)
    fond = RoundedRectangle(width=max(t1.width, t2.width) + 0.5 * s, height=t1.height + t2.height + 0.55 * s,
                            corner_radius=0.12 * s, fill_color="#f8fafc", fill_opacity=1, stroke_color=ROUGE_ERREUR,
                            stroke_width=5).move_to(VGroup(t1, t2))
    return VGroup(fond, t1, t2)


def comptoir(s=1.0):
    """Le comptoir d'enregistrement : un bloc gris clair, un bandeau bleu."""
    bloc = Rectangle(width=3.4 * s, height=1.1 * s, fill_color="#cbd5e1", fill_opacity=1, stroke_color="#64748b",
                     stroke_width=2)
    bande = Rectangle(width=3.4 * s, height=0.22 * s, fill_color=AERO, fill_opacity=1, stroke_width=0)
    bande.move_to(bloc.get_top() + DOWN * 0.11 * s)
    return VGroup(bloc, bande)


def valise_sur(bal, couleur="#7c3aed", s=1.0):
    """Une valise posée sur le pèse-personne."""
    v = valise(s, couleur)
    v.next_to(bal, UP, buff=0.02)
    return v


def billes(boite_, n=7, s=1.0):
    """Des billes de couleur posées dans la boîte (sur le corps)."""
    corps = boite_[0]
    cs = ("#ef4444", "#3b82f6", "#22c55e", "#facc15", "#f97316", "#a855f7", "#06b6d4")
    g = VGroup(*[Circle(radius=0.09 * s, fill_color=cs[i % len(cs)], fill_opacity=1, stroke_color=WHITE,
                        stroke_width=1) for i in range(n)])
    g.arrange_in_grid(2, (n + 1) // 2, buff=0.03 * s).move_to(corps.get_center())
    return g


class MasseProblemeCE2Base(MasseChoisirUniteCE2Base):
    nom_voix = "ce2-masse-probleme"
    fichier_marques = "masse_probleme_marques.json"
    ceinture = "jaune"

    def aff(self, bal, texte, s):
        """Nouvel afficheur du pèse-personne (hors audit : le nombre est aussi écrit en clair)."""
        return hors_audit(Text(texte, font_size=int(20 * s), color="#4ade80", weight=BOLD)).move_to(bal.ecran)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Problèmes de masses", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Problèmes")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        v = valise(1.6, "#7c3aed").move_to(P(-3.4, 0.5))
        self.au_mot("Une valise")
        self.play(FadeIn(v, shift=DOWN * 0.2), run_time=0.4)
        pc = pancarte(self, 1.1).move_to(P(0.9, 0.6))
        self.au_mot("23 kilogrammes")
        self.play(FadeIn(pc[0]), FadeIn(pc[1], scale=1.15), run_time=0.35)
        self.au_mot("au plus")
        self.play(FadeIn(pc[2]), run_time=0.3)
        q = self.t("Passe-t-elle ?", 44, JAUNE_TITRE).move_to(P(4.2, 0.6))
        self.au_mot("Celle-ci")
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 01 : Adam, agent d'enregistrement ───────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pa = adam(1.45).move_to(P(-4.6, -0.2))
        nom = self.t("Adam", 42, AERO).next_to(pa, UP, buff=0.3)
        self.au_mot("Voici Adam")
        self.play(FadeIn(pa, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        l0 = self.t("Il travaille à l'aéroport,", 36, GRAY_B)
        l1 = self.t("au comptoir d'enregistrement.", 36, GRAY_B)
        gauche(l0, -2.6, 2.4)
        gauche(l1, -2.6, 1.65)
        self.au_mot("Il travaille")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        cp = comptoir(1.0).move_to(P(3.1, -2.05))
        met = self.t("agent d'enregistrement", 22, AERO).next_to(pa, DOWN, buff=0.15)
        self.au_mot("au comptoir")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(cp, shift=UP * 0.2), FadeIn(met), run_time=0.4)
        bal = pese_personne("0 kg", 1.15).move_to(P(-0.3, -1.75))
        v = valise_sur(bal, "#0d9488", 1.0)
        self.au_mot("Il pèse")
        self.play(FadeIn(bal, shift=UP * 0.2), FadeIn(v, shift=DOWN * 0.3), run_time=0.45)
        self.play(Transform(bal.affichage, self.aff(bal, "? kg", 1.15)), run_time=0.25)
        pc = pancarte(self, 1.0).move_to(P(3.1, -0.3))
        self.au_mot("23 kilogrammes")
        self.play(FadeIn(pc[0]), FadeIn(pc[1], scale=1.15), run_time=0.35)
        self.au_mot("au plus")
        self.play(FadeIn(pc[2]), run_time=0.3)
        self.insister(pc, 1.1, 0.3)
        self.attendre_voix()

    # ── 02 : ajouter (18 kg + 3 kg = 21 kg : ça passe) ──────────────────────
    def ecran_ajouter(self):
        self.ecran("02-ajouter")
        X = -1.4
        bal = pese_personne("18 kg", 1.4).move_to(P(-4.6, -1.6))
        v = valise_sur(bal, "#e11d48", 1.05)
        l0 = base_commune(self.ligne([("La valise de Lou :", WHITE), ("18 kg", C_KG)], 40, buff=0.22))
        gauche(l0, X, 2.4)
        self.morceaux(l0, ("La valise", "18 kilogrammes"))
        self.play(FadeIn(bal, shift=UP * 0.2), FadeIn(v, shift=DOWN * 0.3), run_time=0.4)
        sc_ = sac("3 kg", 0.95, "#fbbf24")
        sc_.next_to(v, UP, buff=0.0)
        l1 = base_commune(self.ligne([("Elle ajoute un sac :", WHITE), ("3 kg", C_KG)], 40, buff=0.22))
        gauche(l1, X, 1.5)
        self.morceaux(l1, ("Elle ajoute", "3 kilogrammes"))
        self.play(FadeIn(sc_, shift=DOWN * 0.4), run_time=0.35)
        l2 = base_commune(self.ligne([("18 +", WHITE), ("3", WHITE), ("= 21 kg", JAUNE_TITRE)], 50, buff=0.32))
        gauche(l2, X, 0.2)
        self.morceaux(l2, ("18 plus", "3 :", "21 kilogrammes"))
        self.play(Transform(bal.affichage, self.aff(bal, "21 kg", 1.4)), run_time=0.3)
        self.insister(l2[2], 1.15, 0.25)
        l3 = base_commune(self.ligne([("21 < 23 :", WHITE), ("la valise passe !", VERT_OK)], 40, buff=0.22))
        gauche(l3, X, -1.1)
        ok = coche(1.3).next_to(v, RIGHT, buff=0.3)
        for f in l3[0].get_family():  # « 21 » et « 23 » redits : déjà montrés plus haut
            f._pas_audit = True
            f.sans_synchro = True
        self.morceaux(l3, ("C'est moins", "la valise passe"))
        self.play(Create(ok), run_time=0.35)
        self.attendre_voix()

    # ── 03 : enlever (25 − 23 = 2 kg) ───────────────────────────────────────
    def ecran_enlever(self):
        self.ecran("03-enlever")
        X = -1.4
        bal = pese_personne("25 kg", 1.4).move_to(P(-4.6, -1.6))
        v = valise_sur(bal, "#2563eb", 1.05)
        l0 = base_commune(self.ligne([("La valise de Max :", WHITE), ("25 kg", ROUGE_ERREUR)], 40, buff=0.22))
        gauche(l0, X, 2.4)
        self.morceaux(l0, ("La valise", "25 kilogrammes"))
        self.play(FadeIn(bal, shift=UP * 0.2), FadeIn(v, shift=DOWN * 0.3), run_time=0.4)
        trop = croix(0.9).next_to(v, UP, buff=0.25)
        self.play(Create(trop), run_time=0.3)
        l1 = self.t("Il doit enlever :", 40, WHITE)
        gauche(l1, X, 1.3)
        self.au_mot("Il doit enlever")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        l2 = base_commune(self.ligne([("25 −", WHITE), ("23", WHITE), ("= 2 kg", JAUNE_TITRE)], 50, buff=0.32))
        gauche(l2, X, 0.0)
        self.morceaux(l2, ("25 moins", "23 :", "2 kilogrammes"))
        sortie = hors_audit(paquet("2 kg", 0.9, "#f59e0b")).move_to(v.get_center())
        self.play(FadeIn(sortie, scale=0.6), run_time=0.2)
        self.play(sortie.animate.move_to(P(-1.0, -1.7)), FadeOut(trop),
                  Transform(bal.affichage, self.aff(bal, "23 kg", 1.4)), run_time=0.6)
        self.insister(l2[2], 1.15, 0.25)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (2 kg de livres + 750 g de jouets) ──────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        s_ = sac(None, 1.2, "#fbbf24").move_to(P(-5.3, 2.2))
        lv = livres(0.6).move_to(P(-4.1, 1.95))

        def avant_q(sc):
            sc._q_mots = {0: "2 kilogrammes", 1: "750 grammes"}
            sc.play(FadeIn(s_, shift=UP * 0.2), FadeIn(lv, shift=UP * 0.2), run_time=0.2)

        def apres(sc):
            sc.play(Indicate(s_, color=VERT_OK, scale_factor=1.1), run_time=0.3)

        self._ph_mots = {(0, 0): "2 kilogrammes, c'est", (0, 1): "2 000 grammes", (1, 0): 3.96, (2, 0): "2 750 grammes"}
        self.question_gauche("04-question", "04b-reponse",
                             ["2 kg de livres", "et 750 g de jouets.", "Combien de grammes", "en tout ?"],
                             [self.choix(court(c_), fs=26) for c_ in Q1["choix"]], Q1["reponse"],
                             ["2 kg = 2 000 g.", "2 000 + 750", "= 2 750 g."],
                             -0.2, couper={0: ("2 kg =", "2 000 g.")},
                             mot_q="Un sac", avant_q=avant_q, autres_r=apres)
        self._ph_mots = {}

    # ── 05 : plein − vide (1 200 − 300 = 900 g) ─────────────────────────────
    def ecran_plein_vide(self):
        self.ecran("05-plein-vide")
        X = -1.6
        bal = balance_electronique("0 g", 1.6).move_to(P(-4.4, -1.6))
        bx = boite(1.7, "#a78bfa")
        bx.next_to(bal.plateau, UP, buff=0.0)
        l0 = base_commune(self.ligne([("Boîte vide :", WHITE), ("300 g", C_G)], 40, buff=0.22))
        gauche(l0, X, 2.4)
        self.au_mot("Une boîte")
        self.play(FadeIn(bal, shift=UP * 0.2), FadeIn(bx, shift=DOWN * 0.3), FadeIn(l0[0], shift=UP * 0.1),
                  run_time=0.4)
        self.au_mot("300 grammes")
        self.play(FadeIn(l0[1], shift=UP * 0.1), Transform(bal.affichage, afficher(bal, "300 g", 1.6)), run_time=0.3)
        bi = billes(bx, 7, 1.7)
        l1 = base_commune(self.ligne([("Pleine :", WHITE), ("1 kg 200 g", C_KG), ("= 1 200 g", JAUNE_TITRE)], 40,
                                     buff=0.22))
        gauche(l1, X, 1.45)
        self.au_mot("Pleine de billes")
        self.play(FadeIn(l1[0], shift=UP * 0.1), FadeIn(bi, shift=DOWN * 0.5), run_time=0.35)
        self.au_mot("1 kilogramme")
        self.play(FadeIn(l1[1], shift=UP * 0.1), Transform(bal.affichage, afficher(bal, "1 200 g", 1.6)),
                  run_time=0.3)
        self.au_mot("1 200 grammes")
        self.play(FadeIn(l1[2], shift=UP * 0.1), run_time=0.3)
        l2a = self.t("Les billes :", 40, WHITE)
        gauche(l2a, X, 0.3)
        self.au_mot("Les billes :")
        self.play(FadeIn(l2a, shift=UP * 0.1), run_time=0.3)
        l2 = base_commune(self.ligne([("1 200 −", WHITE), ("300", WHITE), ("= 900 g", JAUNE_TITRE)], 48, buff=0.32))
        gauche(l2, X, -0.75)
        self.morceaux(l2, ("1 200 moins", "300,", "900 grammes"))
        self.play(Indicate(bi, color=JAUNE_TITRE, scale_factor=1.2), run_time=0.4)
        self.insister(l2[2], 1.15, 0.25)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (équilibre : 500 g + deux masses de 200 g) ──────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        b = Balance(3.5, s=0.95).move_to(P(-4.3, 1.5))
        pq = b.poser(paquet(None, 1.0, "#60a5fa"), "g")
        ms = VGroup(masse_marquee("500 g", 1.2), masse_marquee("200 g", 1.0), masse_marquee("200 g", 1.0))
        ms.arrange(RIGHT, buff=0.04, aligned_edge=DOWN)
        b.poser(ms, "d")
        fig = VGroup(b, pq, ms)

        def avant_q(sc):
            sc._q_mots = {1: "500 grammes"}
            sc.play(FadeIn(fig, shift=UP * 0.2), run_time=0.2)

        def apres(sc):
            sc.play(Indicate(ms[1:], color=VERT_OK, scale_factor=1.2), run_time=0.3)

        self._ph_mots = {(0, 0): "500 plus", (0, 1): "200 plus 200", (0, 2): 2.6, (1, 0): "900 grammes",
                         (2, 0): "On compte", (3, 0): "les deux masses"}
        self.question_gauche("06-question", "06b-reponse",
                             ["Un paquet est en", "équilibre avec 500 g", "et deux masses de 200 g.",
                              "Combien pèse-t-il ?"],
                             [self.choix(court(c_), fs=26) for c_ in Q2["choix"]], Q2["reponse"],
                             ["500 + 200 + 200", "= 900 g.", "On compte bien", "les deux masses !"],
                             0.0, couper={0: ("500 +", "200 +", "200")},
                             mot_q="Un paquet", avant_q=avant_q, autres_r=apres)
        self._ph_mots = {}

    # ── 07 : le défi (valise de Nina) ───────────────────────────────────────
    def figure_nina(self):
        bal = pese_personne("20 kg", 1.3).move_to(P(-5.0, -1.6))
        v = valise_sur(bal, "#16a34a", 1.0)
        return bal, v

    def ecran_defi(self):
        self.ecran("07-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        X = -3.0
        bal, v = self.figure_nina()
        l0 = base_commune(self.ligne([("Valise de Nina :", WHITE), ("20 kg", C_KG)], 40, buff=0.22))
        gauche(l0, X, 1.9)
        self.morceaux(l0, ("La valise", "20 kilogrammes"))
        self.play(FadeIn(bal, shift=UP * 0.2), FadeIn(v, shift=DOWN * 0.3), run_time=0.35)
        l1 = base_commune(self.ligne([("+ 4 paquets de", WHITE), ("500 g", C_G)], 40, buff=0.22))
        gauche(l1, X, 1.0)
        pqs = VGroup(*[paquet(None, 0.62, "#60a5fa") for _ in range(4)]).arrange(RIGHT, buff=0.08)
        pqs.next_to(l1, RIGHT, buff=0.35)
        self.morceaux(l1, ("4 paquets", "500 grammes"))
        self.play(LaggedStart(*[FadeIn(x, shift=DOWN * 0.2) for x in pqs], lag_ratio=0.2), run_time=0.4)
        l2 = base_commune(self.ligne([("+ un sac de", WHITE), ("2 kg", C_KG)], 40, buff=0.22))
        gauche(l2, X, 0.1)
        sc_ = sac(None, 0.75, "#fbbf24").next_to(l2, RIGHT, buff=0.35)
        self.morceaux(l2, ("puis un sac", "2 kilogrammes"))
        self.play(FadeIn(sc_, shift=DOWN * 0.2), run_time=0.3)
        pc = pancarte(self, 0.85).move_to(P(4.3, -0.5))
        for f in pc[1:].get_family():
            f._pas_audit = True  # rappel de la règle (« 23 » n'est pas redit ici)
            f.sans_synchro = True
        q = self.t("Passe-t-elle ?", 42, JAUNE_TITRE)
        gauche(q, X, -0.9)
        self.au_mot("Passe-t-elle")
        self.play(FadeIn(q, shift=UP * 0.1), FadeIn(pc), run_time=0.35)
        self.au_mot("Mets pause")
        p = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE)
        gauche(p, X, -1.9)
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("07b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        X = -3.0
        bal, v = self.figure_nina()
        hors_audit(bal)
        self.play(FadeIn(bal), FadeIn(v), run_time=0.3)
        l0 = base_commune(self.ligne([("4 × 500 g", WHITE), ("= 2 000 g", WHITE), ("= 2 kg", C_KG)], 44, buff=0.22))
        gauche(l0, X, 1.8)
        self.morceaux(l0, ("4 paquets", "2 000 grammes", "2 kilogrammes"))
        l1 = base_commune(self.ligne([("20 +", WHITE), ("2 +", WHITE), ("2", WHITE), ("= 24 kg", ROUGE_ERREUR)], 50,
                                     buff=0.32))
        gauche(l1, X, 0.5)
        self.morceaux(l1, ("20 plus", "2 plus 2", 8.0, "24 kilogrammes"))
        self.play(Transform(bal.affichage, self.aff(bal, "24 kg", 1.3)), run_time=0.3)
        self.insister(l1[3], 1.15, 0.25)
        l2 = base_commune(self.ligne([("24 > 23 :", WHITE), ("elle ne passe pas !", ROUGE_ERREUR)], 40, buff=0.22))
        gauche(l2, X, -0.8)
        non = croix(1.1).next_to(l2, RIGHT, buff=0.3)
        for f in l2[0].get_family():  # « 24 » et « 23 » redits
            f._pas_audit = True
            f.sans_synchro = True
        self.morceaux(l2, ("C'est plus", "la valise ne"))
        self.play(Create(non), run_time=0.35)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.65)
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        l0 = self.t("Pour un problème de masses :", 38, WHITE).move_to(P(0, 1.9))
        self.au_mot("Pour un problème")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        etapes = [("1", "la même unité", AERO, "la même unité"), ("2", "on calcule", JAUNE_TITRE, "on calcule"),
                  ("3", "on vérifie", VERT_OK, "puis on vérifie")]
        xs = (-4.0, 0.0, 4.0)
        for (n, txt, c, mot), x in zip(etapes, xs):
            rond = Circle(radius=0.45, fill_color=c, fill_opacity=1, stroke_width=0).move_to(P(x, 0.4))
            num = hors_audit(Text(n, font_size=40, color="#0f172a", weight=BOLD)).move_to(rond)
            lab = self.t(txt, 36, c).move_to(P(x, -0.6))
            for f in lab.get_family():
                f.sans_synchro = True
            self.au_mot(mot)
            self.play(FadeIn(rond, scale=1.2), FadeIn(num), FadeIn(lab, shift=UP * 0.1), run_time=0.35)
        ex = hors_audit(self.t("2 kg = 2 000 g", 36, GRAY_B)).move_to(P(-4.0, -1.45))
        self.play(FadeIn(ex, shift=UP * 0.1), run_time=0.3)
        self.attendre_voix(marge=1.8)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_ajouter()
        self.ecran_enlever()
        self.ecran_question1()
        self.ecran_plein_vide()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        ecran_fin(self, "paysage", voix="09-abonne")


class MasseProblemeCE2(MasseProblemeCE2Base):
    identite = "Maths CE2 — EleveAI"
    ceinture = "jaune"
