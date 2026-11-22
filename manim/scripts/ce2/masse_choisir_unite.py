# masse_choisir_unite.py
# EleveAI — Maths CE2 — série « Masses » (CP → CM2), ÉPISODE CE2 04 : choisir la bonne unité
# (micro ce2_masse_choisir_unite, notion masse), AVEC VOIX.
# Paysage 16:9, CEINTURE JAUNE. Short jumeau (jaune) : film Ti Margo (« 2 tonnes de bananes » sur la liste).
# Décor et métier : Tom, CHAUFFEUR ROUTIER (son camion livre des fruits et du riz aux magasins).
# ⚠️ Numérotation : le pilote « comparer » occupe le dossier 03 → ce film va dans 04-choisir-unite.
# Mapping micro → écrans : 02 (léger → le gramme : un letchi, 20 g), 03 (on le porte → le kilogramme : le sac
# de riz, 5 kg), 04 (très lourd → la tonne : le camion, 12 t), 05 question (un camion : en tonnes),
# 06 piège (le cartable de « 3 t » = trois voitures → 3 kg), 07 question (la gomme : 20 g, pas 1 kg),
# 08 défi (banane 150…, Tom 80…, camion chargé 20…), 08b correction, 09 ce que tu as appris, 10 fin commune.
# Voix : manim/voix/ce2-masse-choisir-unite.json (source : masse_voix.py, validée le 16/11).
# Marques : python manim/scripts/ce2/perimetre_marques.py masse:choisir_unite
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/masse_choisir_unite.py MasseChoisirUniteCE2
# Sortie : manim/sorties/ce2/maths/masse/04-choisir-unite/eleveai-maths-ce2-masse-choisir-unite.mp4

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))  # dossier manim/ (fin_commune)

from masse_commun import *  # noqa: E402,F403
from masse_cp_estimer import MasseEstimerCPBase  # noqa: E402
from masse_relations import camion_m, ardoise2  # noqa: E402
from fin_commune import ecran_fin  # noqa: E402

_V = {e["id"]: e for e in json.load(open(Path(__file__).resolve().parent / "masse_voix.json", encoding="utf-8"))}
EP = _V["ce2-masse-choisir-unite"]
Q1, Q2 = EP["questions"]
C_G, C_KG, C_T = BLEU_D, VERT_OK, LOURD
ROUTE = "#0ea5e9"


def court(s):
    return s[0].upper() + s[1:]


def tom(s=1.0):
    """Tom, chauffeur routier : chemise bleue, casquette rouge à visière."""
    p = visage(personne(peau="#c68642", tenue="#1d4ed8", cheveux="#3f2a14", s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    calotte = AnnularSector(inner_radius=0, outer_radius=r * 1.05, angle=PI, start_angle=0, fill_color="#dc2626",
                            fill_opacity=1, stroke_color="#7f1d1d", stroke_width=2).move_to(c + UP * r * 0.62)
    visiere = RoundedRectangle(width=r * 1.3, height=r * 0.22, corner_radius=r * 0.1, fill_color="#b91c1c",
                               fill_opacity=1, stroke_width=0).move_to(c + UP * r * 0.36 + RIGHT * r * 0.6)
    p.add(calotte, visiere)
    return p


def letchi(s=1.0):
    """Un letchi : une boule rouge bosselée, une petite queue verte."""
    b = Circle(radius=0.32 * s, fill_color="#dc2626", fill_opacity=1, stroke_color="#7f1d1d", stroke_width=2)
    bosses = VGroup(*[Dot(b.get_center() + 0.18 * s * np.array([np.cos(a), np.sin(a), 0]), radius=0.035 * s,
                          color="#991b1b") for a in np.linspace(0, TAU, 7, endpoint=False)])
    bosses.add(Dot(b.get_center(), radius=0.035 * s, color="#991b1b"))
    queue = Line(b.get_top(), b.get_top() + P(0.08 * s, 0.18 * s), color="#15803d", stroke_width=4 * s)
    feuille = Ellipse(width=0.26 * s, height=0.11 * s, fill_color="#22c55e", fill_opacity=1, stroke_width=0)
    feuille.rotate(0.5).move_to(queue.get_end() + P(0.11 * s, 0.02 * s))
    return VGroup(b, bosses, queue, feuille)


def sac_riz(texte="5 kg", s=1.0):
    """Un sac de riz blanc, un grain dessiné, son étiquette."""
    g = sac(texte, s, "#f5f5f4")
    return g


def gomme(s=1.0):
    """Une gomme : un pavé blanc et bleu, un peu penché."""
    a = Rectangle(width=0.55 * s, height=0.32 * s, fill_color="#f8fafc", fill_opacity=1, stroke_color="#94a3b8",
                  stroke_width=2)
    b = Rectangle(width=0.35 * s, height=0.32 * s, fill_color="#3b82f6", fill_opacity=1, stroke_color="#1e3a8a",
                  stroke_width=2).next_to(a, RIGHT, buff=0)
    return VGroup(a, b).rotate(0.15)


def banane(s=1.0):
    """Une banane jaune, courbée, bouts bruns."""
    arc = AnnularSector(inner_radius=0.55 * s, outer_radius=0.8 * s, angle=PI * 0.6, start_angle=PI * 1.2,
                        fill_color="#facc15", fill_opacity=1, stroke_color="#a16207", stroke_width=2)
    bouts = VGroup(*[Dot(p, radius=0.05 * s, color="#713f12") for p in
                     (arc.point_from_proportion(0.0), arc.point_from_proportion(0.25))])
    return VGroup(arc, bouts)


class MasseChoisirUniteCE2Base(MasseEstimerCPBase):
    nom_voix = "ce2-masse-choisir-unite"
    fichier_marques = "masse_choisir_unite_marques.json"
    ceinture = "jaune"

    def morceaux(self, l, mots, run_time=0.3):
        """Montre les morceaux d'une ligne(), chacun à SON mot (un nombre à l'instant où la voix le dit)."""
        for m, mot in zip(l, mots):
            if mot is not None:
                self.au_t(mot) if isinstance(mot, (int, float)) else self.au_mot(mot)
            self.play(FadeIn(m, shift=UP * 0.1), run_time=run_time)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Choisir la bonne unité", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Choisir")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        xs = (-4.2, -0.6, 3.6)
        figs = [letchi(1.6), sac_riz(None, 1.5), camion_m(0.95)]
        for f, x in zip(figs, xs):
            f.move_to(P(x, 0.6))
        for f, mot in zip(figs, ("Un letchi", "un sac de riz", "un camion")):
            self.au_mot(mot)
            self.play(FadeIn(f, shift=DOWN * 0.2), run_time=0.35)
        u = [self.t(s, 44, c) for s, c in (("g ?", C_G), ("kg ?", C_KG), ("t ?", C_T))]
        for m, f in zip(u, figs):
            m.move_to(P(f.get_center()[0], -0.95))
        for m in u:
            for f in m.get_family():
                f.sans_synchro = True
        for m, mot in zip(u, ("en grammes", "en kilogrammes", "en tonnes")):
            self.au_mot(mot)
            self.play(FadeIn(m, scale=1.15), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 01 : Tom, chauffeur routier ─────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pt = tom(1.45).move_to(P(-4.9, -0.2))
        nom = self.t("Tom", 42, ROUTE).next_to(pt, UP, buff=0.3)
        self.au_mot("Voici Tom")
        self.play(FadeIn(pt, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        met = self.t("chauffeur routier", 26, ROUTE).next_to(pt, DOWN, buff=0.15)
        self.au_mot("Il est chauffeur")
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.3)
        cam = camion_m(1.5).move_to(P(1.4, 1.1))
        self.au_mot("Son gros camion")
        self.play(FadeIn(cam, shift=LEFT * 1.0), run_time=0.6)
        l0 = self.t("Il livre des fruits", 36, GRAY_B)
        l1 = self.t("et du riz aux magasins.", 36, GRAY_B)
        gauche(l0, -2.4, -1.3)
        gauche(l1, -2.4, -2.1)
        self.au_mot("livre des fruits")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        self.au_mot("et du riz")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 02 · 03 · 04 : une unité par écran, même mise en page (objet à gauche, colonne à droite) ──
    XU = -0.3

    def ecran_gramme(self):
        X = self.XU
        bal = balance_electronique("0 g", 2.0).move_to(P(-3.7, -1.4))
        fig = letchi(1.7)
        fig.next_to(bal.plateau, UP, buff=0.02)
        l_obj = self.t("Objet léger :", 40, GRAY_B)
        l_unite = base_commune(self.ligne([("le gramme", C_G), ("(g)", C_G)], 46, buff=0.2))
        l_val = VGroup(self.t("Un letchi :", 40, WHITE), self.t("environ 20 g", 44, JAUNE_TITRE))
        self.ecran("02-gramme")
        gauche(l_obj, X, 2.0)
        self.au_mot("objet léger")
        self.play(FadeIn(l_obj, shift=UP * 0.1), run_time=0.3)
        self.au_mot("comme un letchi")
        self.play(FadeIn(bal, shift=UP * 0.2), FadeIn(fig, shift=DOWN * 0.3), run_time=0.4)
        gauche(l_unite, X, 0.8)
        self.au_mot("le gramme")
        self.play(FadeIn(l_unite, scale=1.1), run_time=0.35)
        self.insister(l_unite, 1.12, 0.3)
        gauche(l_val[0], X, -0.6)
        gauche(l_val[1], X, -1.5)
        self.au_mot("Un letchi pèse")
        self.play(FadeIn(l_val[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("environ 20")
        self.play(FadeIn(l_val[1], shift=UP * 0.1), Transform(bal.affichage, afficher(bal, "20 g", 2.0)), run_time=0.35)
        self.attendre_voix()

    def unite_et_valeur(self, l_unite, mot_unite, l_val, mot_val, autres=()):
        """« le kilogramme (kg) » à son mot, puis TOUT DE SUITE la valeur (« : 5 kilogrammes » suit sans pause)."""
        self.au_mot(mot_unite)
        self.play(FadeIn(l_unite, scale=1.1), run_time=0.3)
        for f in l_val[0].get_family():
            f.sans_synchro = True
        self.au_mot(mot_val)
        self.play(FadeIn(l_val, shift=UP * 0.1), *autres, run_time=0.3)
        self.insister(VGroup(l_unite, l_val), 1.08, 0.3)

    def ecran_kilo(self):
        X = self.XU
        bal = pese_personne("0 kg", 1.6).move_to(P(-3.7, -1.7))
        fig = sac_riz("RIZ", 1.9)
        fig.next_to(bal, UP, buff=0.05)
        l_obj = self.t("Objet qu'on porte :", 40, GRAY_B)
        l_unite = base_commune(self.ligne([("le kilogramme", C_KG), ("(kg)", C_KG)], 46, buff=0.2))
        l_val = base_commune(self.ligne([("Le sac de riz :", WHITE), ("5 kg", JAUNE_TITRE)], 44, buff=0.22))
        self.ecran("03-kilo")
        gauche(l_obj, X, 2.0)
        self.au_mot("objet qu'on")
        self.play(FadeIn(l_obj, shift=UP * 0.1), run_time=0.3)
        self.au_mot("comme un sac")
        self.play(FadeIn(bal, shift=UP * 0.2), FadeIn(fig, shift=DOWN * 0.3), run_time=0.4)
        gauche(l_unite, X, 0.8)
        gauche(l_val, X, -0.8)
        aff = hors_audit(Text("5 kg", font_size=32, color="#4ade80", weight=BOLD)).move_to(bal.ecran)
        self.unite_et_valeur(l_unite, "le kilogramme", l_val, "5 kilogrammes", [Transform(bal.affichage, aff)])
        self.attendre_voix()

    def ecran_tonne(self):
        X = self.XU
        cam = camion_m(1.45).move_to(P(-3.7, -0.5))
        l_obj = self.t("Objet très lourd :", 40, GRAY_B)
        l_unite = base_commune(self.ligne([("la tonne", C_T), ("(t)", C_T)], 46, buff=0.2))
        l_val = base_commune(self.ligne([("Le camion :", WHITE), ("12 t", JAUNE_TITRE)], 44, buff=0.22))
        self.ecran("04-tonne")
        gauche(l_obj, X, 2.0)
        self.au_mot("objet très")
        self.play(FadeIn(l_obj, shift=UP * 0.1), run_time=0.3)
        self.au_mot("comme le camion")
        self.play(FadeIn(cam, shift=LEFT * 1.0), run_time=0.5)
        gauche(l_unite, X, 0.8)
        gauche(l_val, X, -0.8)
        et = hors_audit(Text("12 t", font_size=54, color=WHITE, weight=BOLD)).move_to(cam[0])
        self.unite_et_valeur(l_unite, "la tonne", l_val, "12 tonnes", [FadeIn(et, scale=1.2)])
        self.attendre_voix()

    # ── 05 : QUESTION 1 (un camion : quelle unité ?) ────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        cam = camion_m(1.0).move_to(P(-4.6, 2.1))

        def avant_q(sc):
            sc.play(FadeIn(cam, shift=LEFT * 0.4), run_time=0.2)

        def apres(sc):
            sc.play(Indicate(cam, color=VERT_OK, scale_factor=1.1), run_time=0.3)

        self._ph_mots = {(0, 0): "Un camion est", (1, 0): "très lourd", (2, 0): "on le pèse", (3, 0): "en tonnes"}
        self.question_gauche("05-question", "05b-reponse",
                             ["Avec quelle unité", "pèse-t-on", "un camion ?"],
                             [self.choix(court(c_), fs=26) for c_ in Q1["choix"]], Q1["reponse"],
                             ["Un camion est", "très lourd :", "on le pèse", "en tonnes."],
                             0.0, mot_q="Avec quelle", avant_q=avant_q, autres_r=apres)
        self._ph_mots = {}

    # ── 06 : le piège (le cartable de 3 t) ──────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        tit = self.t("Attention !", 50, ROUGE_ERREUR).move_to(P(0, 3.1))
        self.au_mot("Attention")
        self.play(Write(tit), run_time=0.4)
        cart = cartable(1.5).move_to(P(-5.0, 1.3))
        ar = ardoise2(["Mon cartable", "pèse 3 t."]).move_to(P(-1.6, 1.3))
        self.au_mot("Un élève écrit")
        self.play(FadeIn(cart, shift=DOWN * 0.2), FadeIn(ar, shift=UP * 0.2), run_time=0.4)
        l0 = base_commune(self.ligne([("3 t", C_T), ("= 3 voitures !", WHITE)], 40, buff=0.22))
        gauche(l0, 1.6, 1.9)
        voits = VGroup(*[voiture_m(0.7, c) for c in ("#3b82f6", "#22c55e", "#eab308")]).arrange(RIGHT, buff=0.2)
        voits.next_to(l0, DOWN, buff=0.35).align_to(l0, LEFT)
        for f in l0[1].get_family():  # la voix dit « trois » : le socle attendait le « 3 » suivant (2,9 s)
            f.sans_synchro = True
            f._pas_audit = True
        self.au_mot("3 tonnes, c'est")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("trois voitures")
        self.play(FadeIn(l0[1], shift=UP * 0.1), LaggedStart(*[FadeIn(v, shift=LEFT * 0.4) for v in voits],
                                                                 lag_ratio=0.3), run_time=0.6)
        croix = Cross(ar[1][1], stroke_color=ROUGE_ERREUR, stroke_width=6)
        self.play(Create(croix), run_time=0.3)
        bon = base_commune(self.ligne([("Mon cartable pèse", WHITE), ("3 kg.", C_KG)], 44, buff=0.22))
        bon.move_to(P(-0.6, -1.6))
        for f in bon[0].get_family():
            f.sans_synchro = True
        self.au_mot("Il fallait")
        self.play(FadeIn(bon[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("3 kilogrammes")
        self.play(FadeIn(bon[1], scale=1.2), run_time=0.35)
        self.play(Create(SurroundingRectangle(bon, color=VERT_OK, buff=0.2, corner_radius=0.12, stroke_width=5)),
                  run_time=0.4)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (la gomme de « 1 kg ») ──────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        go = gomme(2.2).move_to(P(-5.2, 2.2))
        fig = VGroup(go)

        def avant_q(sc):
            sc.play(FadeIn(fig, shift=UP * 0.2), run_time=0.2)

        def apres(sc):
            sc.play(Indicate(go, color=VERT_OK, scale_factor=1.15), run_time=0.3)

        self._ph_mots = {(0, 0): "Une gomme", (2, 0): "environ 20", (3, 0): "1 kilogramme, c'est", (4, 0): "une brique"}
        self.question_gauche("07-question", "07b-reponse",
                             ["Un élève dit :", "« Ma gomme", "pèse 1 kg. »", "Qu'aurait-il dû dire ?"],
                             [self.choix(court(c_), fs=26) for c_ in Q2["choix"]], Q2["reponse"],
                             ["Une gomme", "est légère :", "environ 20 g.", "1 kg, c'est", "une brique de lait !"],
                             -0.4,
                             mot_q="Un élève", avant_q=avant_q, autres_r=apres)
        self._ph_mots = {}

    # ── 08 : le défi (banane, Tom, camion chargé) ───────────────────────────
    def rangees(self):
        """Les trois lignes du défi : dessin à gauche, « … pèse 150 » à droite (hors du texte : l'unité)."""
        figs = [banane(1.3), tom(0.7), camion_m(0.75)]
        noms = ["Une banane : 150", "Tom : 80", "Le camion chargé : 20"]
        ys = (1.7, 0.1, -1.6)
        rows = []
        for f, n, y in zip(figs, noms, ys):
            f.move_to(P(-4.6, y))
            rows.append((f, self.t(n, 40, WHITE), y))
        for f, t_, y in rows:
            gauche(t_, -2.6, y)
        return rows

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer : trouve l'unité !", 46, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.5)
        rows = self.rangees()
        trous = []
        for (f, t_, y), mot in zip(rows, ("Une banane", "Tom pèse", "Son camion")):
            self.au_mot(mot)
            q = self.t("?", 44, ORANGE_RETENUE)
            q = VGroup(SurroundingRectangle(q, color=ORANGE_RETENUE, buff=0.12, corner_radius=0.08), q)
            q.next_to(t_, RIGHT, buff=0.25)
            trous.append(q)
            self.play(FadeIn(f, shift=DOWN * 0.2), FadeIn(t_, shift=UP * 0.1), FadeIn(q), run_time=0.35)
        self.au_mot("Mets pause")
        p = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE)
        gauche(p, -6.0, -2.9)
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        rows = self.rangees()
        for f, t_, y in rows:
            hors_audit(t_)
        self.play(*[FadeIn(m) for f, t_, y in rows for m in (f, t_)], run_time=0.35)
        unites = [("g", C_G, "150 grammes"), ("kg", C_KG, "80 kilogrammes"), ("t", C_T, "20 tonnes")]
        for (f, t_, y), (u, c, mot) in zip(rows, unites):
            # la ligne entière (« … : 150 g ») posée sur l'ancienne : l'unité est sur la MÊME ligne de base
            ref = self.t("0 " + u, 40, WHITE)  # le « 0 » de « 0 g » posé sur le dernier chiffre : même ligne de base
            ref.shift(t_[-1].get_center() - ref[0].get_center())
            m = VGroup(*ref.submobjects[1:]).set_color(c)
            for g_ in m.get_family():
                g_.sans_synchro = True
            self.au_mot(mot)
            self.play(FadeIn(m, scale=1.3), run_time=0.3)
            self.insister(m, 1.2, 0.2)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        xs = (-4.3, -0.4, 3.6)
        figs = [letchi(1.4), sac_riz("RIZ", 1.4), camion_m(0.8)]
        lignes = [("g", C_G, "objets légers"), ("kg", C_KG, "ce qu'on porte"), ("t", C_T, "très lourds")]
        mots = ("Le gramme", "le kilogramme", "la tonne")
        for f, x, (u, c, txt), mot in zip(figs, xs, lignes, mots):
            f.move_to(P(x, 1.0))
            gu = self.t(u, 60, c).move_to(P(x, -0.7))
            gt = self.t(txt, 32, WHITE).move_to(P(x, -1.6))
            for g_ in gt.get_family():
                g_.sans_synchro = True
            self.au_mot(mot)
            self.play(FadeIn(f, shift=DOWN * 0.2), FadeIn(gu, scale=1.2), FadeIn(gt, shift=UP * 0.1), run_time=0.4)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_gramme()
        self.ecran_kilo()
        self.ecran_tonne()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        ecran_fin(self, "paysage", voix="10-abonne")


class MasseChoisirUniteCE2(MasseChoisirUniteCE2Base):
    identite = "Maths CE2 — EleveAI"
    ceinture = "jaune"
