# masse_estimer.py
# EleveAI — Maths CE2 — série « Masses » (CP → CM2), ÉPISODE CE2 05 : estimer une masse
# (micro ce2_masse_estimer, notion masse), AVEC VOIX.
# Paysage 16:9, CEINTURE JAUNE. Short jumeau (jaune) : film Ti Margo (« mon chat pèse 400 kg ! »).
# Décor et métier : Sarah, SAGE-FEMME (elle pèse les bébés sur une petite balance).
# Mapping micro → écrans : 02 (trois repères : trombone 1 g, brique de lait 1 kg, petite voiture 1 t),
# 03 (un bébé ≈ trois briques de lait = 3 kg ; un élève de CE2 ≈ 25 kg), 04 question (élève de CE2 : 25 kg),
# 05 (une mangue, plus légère qu'une brique : ≈ 400 g), 06 question (5 mangues ≈ 2 kg → une ≈ 400 g),
# 07 défi (pomme, vélo, voiture ↔ 150 g, 12 kg, 1 t), 07b correction, 08 ce que tu as appris, 09 fin commune.
# Voix : manim/voix/ce2-masse-estimer.json (source : masse_voix.py, validée le 16/11).
# Marques : python manim/scripts/ce2/perimetre_marques.py masse:estimer
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/masse_estimer.py MasseEstimerCE2
# Sortie : manim/sorties/ce2/maths/masse/05-estimer/eleveai-maths-ce2-masse-estimer.mp4

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))  # dossier manim/ (fin_commune)

from masse_commun import *  # noqa: E402,F403
from masse_choisir_unite import MasseChoisirUniteCE2Base, court  # noqa: E402
from fin_commune import ecran_fin  # noqa: E402

_V = {e["id"]: e for e in json.load(open(Path(__file__).resolve().parent / "masse_voix.json", encoding="utf-8"))}
EP = _V["ce2-masse-estimer"]
Q1, Q2 = EP["questions"]
C_G, C_KG, C_T = BLEU_D, VERT_OK, LOURD
ROSE = "#f472b6"
MANGUE = "#f59e0b"


def sarah(s=1.0):
    """Sarah, sage-femme : blouse rose, calot rose, cheveux longs."""
    p = visage(personne(peau="#8d5524", tenue=ROSE, cheveux="#1f2937", longs=True, s=s))
    c, r = p.tete.get_center(), p.tete.width / 2
    calot = AnnularSector(inner_radius=0, outer_radius=r * 1.02, angle=PI, start_angle=0, fill_color="#fbcfe8",
                          fill_opacity=1, stroke_color="#be185d", stroke_width=2).move_to(c + UP * r * 0.6)
    p.add(calot)
    return p


def bebe(s=1.0):
    """Un bébé emmailloté : un cocon blanc, une petite tête ronde, deux yeux fermés."""
    corps = Ellipse(width=1.3 * s, height=0.62 * s, fill_color="#f8fafc", fill_opacity=1, stroke_color="#93c5fd",
                    stroke_width=3)
    tete = Circle(radius=0.27 * s, fill_color="#f5c89a", fill_opacity=1, stroke_width=0)
    tete.move_to(corps.get_left() + RIGHT * 0.22 * s + UP * 0.05 * s)
    yeux = VGroup(*[Arc(radius=0.05 * s, start_angle=PI, angle=PI, color="#1f2937", stroke_width=2)
                    .move_to(tete.get_center() + P(dx * s, 0.03 * s)) for dx in (-0.09, 0.09)])
    # (21/11) bonnet = la calotte du crâne (à gauche, le bébé est couché) : il ne coupe plus le visage en deux
    bord = Rectangle(width=0.3 * s, height=0.7 * s).move_to(tete.get_center() + LEFT * 0.29 * s)
    bonnet = Intersection(tete.copy(), bord, fill_color="#93c5fd", fill_opacity=1, stroke_width=0)
    lien = Line(corps.get_top() + LEFT * 0.05 * s, corps.get_bottom() + LEFT * 0.05 * s, color="#93c5fd", stroke_width=3)
    return VGroup(corps, lien, tete, bonnet, yeux)


def eleve(s=1.0):
    """Un élève de CE2 (garçon, tee-shirt vert)."""
    return visage(personne(peau="#e0ac69", tenue="#16a34a", cheveux="#78350f", s=s))


def mangue(s=1.0):
    """Une mangue : un ovale penché, du jaune au rouge, une queue."""
    m = Ellipse(width=0.8 * s, height=0.6 * s, fill_color=MANGUE, fill_opacity=1, stroke_color="#b45309", stroke_width=2)
    joue = Ellipse(width=0.38 * s, height=0.3 * s, fill_color="#ef4444", fill_opacity=0.7, stroke_width=0)
    joue.move_to(m.get_center() + P(0.16 * s, 0.08 * s))
    q = Line(m.get_top() + LEFT * 0.08 * s, m.get_top() + P(-0.14 * s, 0.14 * s), color="#15803d", stroke_width=4 * s)
    return VGroup(m, joue, q).rotate(-0.25)


class MasseEstimerCE2Base(MasseChoisirUniteCE2Base):
    nom_voix = "ce2-masse-estimer"
    fichier_marques = "masse_estimer_marques.json"
    ceinture = "jaune"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Estimer une masse", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Estimer")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        b = bebe(2.2).move_to(P(-3.6, 0.5))
        self.au_mot("Un bébé")
        self.play(FadeIn(b, shift=DOWN * 0.2), run_time=0.4)
        u = [self.t(s_, 44, c) for s_, c in (("3 g ?", C_G), ("3 kg ?", C_KG), ("30 kg ?", C_KG))]
        VGroup(*u).arrange(DOWN, aligned_edge=LEFT, buff=0.25).move_to(P(1.8, 0.4))
        for f in u[1].get_family():  # montré à son instant WAV : l'audit l'apparie au « 3 » de « 3 grammes »
            f._pas_audit = True
        for m, mot in zip(u, ("3 grammes", 5.38, "30 kilogrammes")):  # « 3 kilogrammes » sans marque : lu dans le WAV
            self.au_t(mot) if isinstance(mot, float) else self.au_mot(mot)
            self.play(FadeIn(m, scale=1.15), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 01 : Sarah, sage-femme ──────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        ps = sarah(1.45).move_to(P(-4.9, -0.2))
        nom = self.t("Sarah", 42, ROSE).next_to(ps, UP, buff=0.3)
        self.au_mot("Voici Sarah")
        self.play(FadeIn(ps, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        met = self.t("sage-femme", 28, ROSE).next_to(ps, DOWN, buff=0.15)
        self.au_mot("Elle est sage-femme")
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.3)
        l0 = self.t("Elle aide les bébés à naître.", 36, GRAY_B)
        gauche(l0, -2.4, 2.2)
        self.au_mot("Elle aide")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        bal = balance_electronique("0 g", 2.0).move_to(P(1.6, -1.6))
        b = bebe(1.5)
        b.next_to(bal.plateau, UP, buff=0.0)
        l1 = self.t("Puis elle les pèse.", 36, JAUNE_TITRE)
        gauche(l1, -2.4, 1.3)
        self.au_mot("Puis elle")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("petite balance")
        self.play(FadeIn(bal, shift=UP * 0.2), FadeIn(b, shift=DOWN * 0.3), run_time=0.45)
        # (21/11) le bébé posé, l'afficheur ne reste pas à « 0 g » : il cherche (« ? ? ? »), le nombre vient à l'écran 03
        self.play(Transform(bal.affichage, afficher(bal, "? ? ?", 2.0)), run_time=0.3)
        self.attendre_voix()

    # ── 02 : trois repères ──────────────────────────────────────────────────
    def reperes(self, y=0.6, s=1.0):
        figs = [trombone_m(2.0 * s), brique_lait(1.7 * s), voiture_m(1.3 * s)]
        xs = (-4.2, -0.4, 3.6)
        for f, x in zip(figs, xs):
            f.move_to(P(x, y))
        return figs, xs

    def ecran_reperes(self):
        self.ecran("02-reperes")
        tit = self.t("Trois repères", 48, JAUNE_TITRE).move_to(P(0, 3.0))
        self.au_mot("Trois repères")
        self.play(Write(tit), run_time=0.45)
        figs, xs = self.reperes()
        et = [("1 g", C_G, "1 gramme"), ("1 kg", C_KG, "1 kilogramme"), ("1 t", C_T, "1 tonne")]
        noms = ["un trombone", "une brique de lait", "une petite voiture"]
        for f, x, (u, c, mot), n in zip(figs, xs, et, noms):
            gu = self.t(u, 56, c).move_to(P(x, -1.3))
            gn = self.t(n, 28, WHITE).move_to(P(x, -2.15))
            self.au_mot(mot)
            self.play(FadeIn(gu, scale=1.2), run_time=0.3)
            self.au_mot(n)
            self.play(FadeIn(f, shift=DOWN * 0.2), FadeIn(gn, shift=UP * 0.1), run_time=0.35)
        self.attendre_voix()

    # ── 03 : le bébé (3 briques = 3 kg), l'élève de CE2 (25 kg) ─────────────
    def ecran_bebe(self):
        self.ecran("03-bebe")
        b = bebe(2.0).move_to(P(-4.6, 1.6))
        self.au_mot("Un bébé")
        self.play(FadeIn(b, shift=DOWN * 0.2), run_time=0.4)
        eg = self.t("≈", 60, WHITE).move_to(P(-2.6, 1.6))
        br = VGroup(*[brique_lait(1.2) for _ in range(3)]).arrange(RIGHT, buff=0.25).move_to(P(-0.7, 1.6))
        self.au_mot("c'est environ")
        self.play(FadeIn(eg), run_time=0.25)
        self.au_mot("trois briques")
        self.play(LaggedStart(*[FadeIn(x, shift=DOWN * 0.3) for x in br], lag_ratio=0.3), run_time=0.6)
        r1 = self.t("3 kg", 54, C_KG).move_to(P(2.6, 1.6))
        self.au_mot("3 kilogrammes")
        self.play(FadeIn(r1, scale=1.2), run_time=0.3)
        self.insister(r1, 1.15, 0.25)
        e = eleve(1.1).move_to(P(-4.6, -1.5))
        l2 = base_commune(self.ligne([("Un élève de CE2 :", WHITE), ("environ 25 kg", JAUNE_TITRE)], 40, buff=0.22))
        gauche(l2, -3.4, -1.5)
        self.au_mot("Un élève")
        self.play(FadeIn(e, shift=UP * 0.2), FadeIn(l2[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("environ 25")
        self.play(FadeIn(l2[1], shift=UP * 0.1), run_time=0.3)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (un élève de CE2 : 25 kg) ───────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        e = eleve(1.0).move_to(P(-5.1, 1.9))

        def avant_q(sc):
            sc.play(FadeIn(e, shift=UP * 0.2), run_time=0.2)

        def apres(sc):
            sc.play(Indicate(e, color=VERT_OK, scale_factor=1.1), run_time=0.3)

        self._ph_mots = {(0, 0): "Un élève", (1, 0): "pèse environ", (2, 0): "250 kilogrammes, c'est", (3, 0): "c'est un piano"}
        self.question_gauche("04-question", "04b-reponse",
                             ["Environ combien", "pèse un élève", "de CE2 ?"],
                             [self.choix(court(c_), fs=26) for c_ in Q1["choix"]], Q1["reponse"],
                             ["Un élève de CE2", "pèse environ 25 kg.", "250 kg,", "c'est un piano !"],
                             0.0, mot_q="Environ combien", avant_q=avant_q, autres_r=apres)
        self._ph_mots = {}

    # ── 05 : la mangue (plus légère qu'une brique de lait) ─────────────────
    def ecran_mangue(self):
        self.ecran("05-mangue")
        m = mangue(2.4).move_to(P(-4.4, 0.9))
        self.au_mot("Une mangue")
        self.play(FadeIn(m, shift=DOWN * 0.2), run_time=0.4)
        inf = self.t("<", 72, WHITE).move_to(P(-2.4, 0.9))
        br = brique_lait(2.0).move_to(P(-0.4, 0.9))
        et = self.t("1 kg", 34, C_KG).next_to(br, DOWN, buff=0.2)
        hors_audit(et)
        self.au_mot("plus légère")
        self.play(FadeIn(inf, scale=1.2), run_time=0.3)
        self.au_mot("qu'une brique")
        self.play(FadeIn(br, shift=DOWN * 0.2), FadeIn(et), run_time=0.4)
        res = base_commune(self.ligne([("Une mangue :", WHITE), ("environ 400 g", JAUNE_TITRE)], 46, buff=0.22))
        res.move_to(P(-0.6, -2.05))  # (21/11) écarté du « 1 kg » de la brique
        for f in res[0].get_family():
            f.sans_synchro = True
        self.au_mot("environ 400")
        self.play(FadeIn(res, shift=UP * 0.1), run_time=0.35)
        self.insister(res, 1.1, 0.3)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (5 mangues ≈ 2 kg : une mangue ?) ───────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        bal = balance_electronique("2 kg", 1.72).move_to(P(-4.3, 1.2))  # (21/11) agrandie
        ms = VGroup(*[mangue(0.82) for _ in range(5)]).arrange(RIGHT, buff=0.02)
        ms.next_to(bal.plateau, UP, buff=0.0)
        fig = VGroup(bal, ms)

        def avant_q(sc):
            sc.play(FadeIn(fig, shift=UP * 0.2), run_time=0.2)

        def apres(sc):
            sc.play(Indicate(ms[0], color=VERT_OK, scale_factor=1.3), run_time=0.3)

        self.fs_choix, self.decal_q, self.elargir_q = 22, 2.6, 2.1  # choix longs (« Environ 2 kilogrammes »)
        self._ph_mots = {(0, 0): "2 kilogrammes, c'est", (0, 1): "c'est 2 000", (1, 0): "Partagés", (2, 0): "environ 400"}
        self._ph_egal = True
        self.question_gauche("06-question", "06b-reponse",
                             ["5 mangues pèsent", "environ 2 kg.", "Combien pèse", "une mangue ?"],
                             [self.choix(court(c_), fs=22) for c_ in Q2["choix"]], Q2["reponse"],
                             ["2 kg = 2 000 g.", "Partagés en 5 :", "environ 400 g."],
                             -0.4, couper={0: ("2 kg =", "2 000 g.")},
                             mot_q="Au marché", avant_q=avant_q, autres_r=apres)
        self._ph_mots = {}
        self._ph_egal = False
        self.fs_choix, self.decal_q, self.elargir_q = 26, 1.8, 1.2

    _ph_egal = False

    def _disposer_q(self, question, choix, phrase):
        """Avec _ph_egal : lignes de la phrase de réponse à interligne égal (de ligne de base à ligne de base)."""
        r = super()._disposer_q(question, choix, phrase)
        if not self._ph_egal:
            return r
        ph = r[5]

        def base(m):
            for f in m.get_family():
                txt = f.text.replace(" ", "") if hasattr(f, "text") else ""
                for k, ch in enumerate(txt):
                    if ch.isalnum() and ch not in "gjpqyQ," and k < len(f.submobjects):
                        return f.submobjects[k].get_bottom()[1]
            return m.get_bottom()[1]

        bases = [base(l) for l in ph]
        pas = (bases[0] - bases[-1]) / (len(ph) - 1)
        for i, l in enumerate(ph):
            l.shift(UP * (bases[0] - i * pas - bases[i]))
        return r

    # ── 07 : le défi (pomme, vélo, voiture ↔ 150 g, 12 kg, 1 t) ─────────────
    def rangees(self):
        figs = [pomme(1.5), velo(1.0), voiture_m(1.0)]
        noms = ["La pomme :", "Le vélo :", "La voiture :"]
        ys = (1.7, 0.1, -1.5)
        rows = []
        for f, n, y in zip(figs, noms, ys):
            f.move_to(P(-4.8, y))
            t_ = self.t(n, 40, WHITE)
            gauche(t_, -3.0, y)
            rows.append((f, t_, y))
        return rows

    def ecran_defi(self):
        self.ecran("07-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        rows = self.rangees()
        for (f, t_, y), mot in zip(rows, ("Une pomme", "un vélo", "une voiture")):
            for g_ in t_.get_family():
                g_.sans_synchro = True
            self.au_mot(mot)
            self.play(FadeIn(f, shift=DOWN * 0.2), FadeIn(t_, shift=UP * 0.1), run_time=0.3)
        vals = [self.t(s_, 40, c) for s_, c in (("150 g", C_G), ("12 kg", C_KG), ("1 t", C_T))]
        for v, y in zip(vals, (-1.5, 1.7, 0.1)):  # (21/11) mélangées : pas en face de leur objet
            gauche(v, 3.6, y)
        cadre = SurroundingRectangle(VGroup(*vals), color=GRAY_B, buff=0.3, corner_radius=0.12, stroke_width=3)
        for v, mot in zip(vals, ("150 grammes", "12 kilogrammes", "1 tonne")):
            self.au_mot(mot)
            self.play(FadeIn(v, scale=1.15), *( [Create(cadre)] if v is vals[0] else []), run_time=0.3)
        q = self.t("Qui pèse quoi ?", 40, JAUNE_TITRE).move_to(P(0, -2.45))
        self.au_mot("Qui pèse")
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Mets pause")
        p = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE)
        gauche(p, -6.0, -3.2)
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("07b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        rows = self.rangees()
        for f, t_, y in rows:
            hors_audit(t_)
        self.play(*[FadeIn(m) for f, t_, y in rows for m in (f, t_)], run_time=0.35)
        vals = [("150 g", C_G, "150 grammes"), ("12 kg", C_KG, "12 kilogrammes"), ("1 t", C_T, "1 tonne")]
        for (f, t_, y), (s_, c, mot) in zip(rows, vals):
            v = base_commune(VGroup(t_.copy(), self.t(s_, 44, c)))[1]
            v.next_to(t_, RIGHT, buff=0.3)
            v.shift(UP * (t_[0].get_bottom()[1] - v[0].get_bottom()[1]))
            self.au_mot(mot)
            self.play(FadeIn(v, scale=1.2), run_time=0.3)
            self.insister(v, 1.15, 0.2)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.65)
        tit = self.t("Ce que tu as appris", 46, JAUNE_TITRE).to_edge(UP, buff=0.45)
        self.play(Write(tit), run_time=0.7)
        l0 = self.t("Pour estimer, on compare à un repère :", 38, WHITE).move_to(P(0, 1.9))
        for f in l0.get_family():
            f.sans_synchro = True
        self.au_mot("Pour estimer")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        figs, xs = self.reperes(y=0.2, s=0.9)
        et = [("1 g", C_G), ("1 kg", C_KG), ("1 t", C_T)]
        for f, x, (u, c), mot in zip(figs, xs, et, ("le trombone", "la brique", "la voiture")):
            gu = hors_audit(self.t(u, 48, c)).move_to(P(x, -1.6))
            self.au_mot(mot)
            self.play(FadeIn(f, shift=DOWN * 0.2), FadeIn(gu, scale=1.2), run_time=0.35)
        self.attendre_voix(marge=1.8)  # (21/11) la voiture reste à l'écran avant la fin

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_reperes()
        self.ecran_bebe()
        self.ecran_question1()
        self.ecran_mangue()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        ecran_fin(self, "paysage", voix="09-abonne")


class MasseEstimerCE2(MasseEstimerCE2Base):
    identite = "Maths CE2 — EleveAI"
    ceinture = "jaune"
