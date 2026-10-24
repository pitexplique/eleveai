# stats_rep_circulaire.py
# EleveAI — Maths 1re (tronc commun) — série « Statistiques », lycée, épisode 08 :
# LIRE UN DIAGRAMME CIRCULAIRE OU SEMI-CIRCULAIRE. Micro du coach
# info_rep_circulaire (notion info_representations_croisees). AVEC VOIX.
# Paysage 16:9. CEINTURE VERTE : la paysage complète du niveau (100 % = 360°,
# 1 % = 3,6°, dans les deux sens ; demi-disque 1,8° ; effectif = % × total).
# Short jumeau : stats_rep_circulaire_short.py (orange).
#
# ⭐ Décor et métier : l'ÉNERGIE ; un INGÉNIEUR DU RÉSEAU ÉLECTRIQUE montre d'où
# vient l'électricité produite en France (problématique : représenter, passer
# d'un angle à une part et à une quantité). Centres d'intérêt : nature-ecologie,
# sciences.
# Source : bilan électrique 2024 de RTE, chiffres repris par l'AFP (« La France
# produit toujours plus d'électricité bas carbone », 20/01/2025), lu le
# 24/10/2026 : https://www.connaissancedesenergies.org/afp/la-france-produit-toujours-plus-delectricite-bas-carbone-250120
# Production 536,5 TWh ; nucléaire 361,7 (67,41 %) ; hydraulique 74,7 ;
# éolien 46,6 ; solaire 23,3 ; fossiles 19,9 ; reste (bioénergies…) 10,3.
# Parts arrondies (Python) : 67,4 → 67 ; 13,9 → 14 ; 8,7 → 9 ; autres
# (solaire + fossiles + bioénergies) 53,5 / 536,5 = 9,97 → 10. Somme 100.
# Calculs : 360 ÷ 100 = 3,6 ; 14 × 3,6 = 50,4 ; 32,4 ÷ 3,6 = 9 ; 100 − 67 = 33 ;
# 536,5 × 0,14 = 75,11 (officiel 74,7) ; 67 × 1,8 = 120,6 ; 67 × 3,6 = 241,2 ;
# 14 × 1,8 = 25,2 ; 10 × 3,6 = 36 ; 536,5 × 0,09 = 48,285.
#
# Mapping micro → écrans (banque information-chiffree, info_rep_circulaire) :
# info_rep_circ_complement → 03, 04 · info_rep_circ_angle (× 3,6 et ÷ 3,6) → 02,
# 05, question 1, défi 1 · info_rep_circ_effectif (effectif, demi-disque) → 07,
# 08 piège, question 2, défi 2.
# Écrans : 00 garde · 01 l'ingénieur, 536,5 TWh · 02 la règle (3,6°) · 03 les
# parts · 04 le complément · 05 un angle · 06 question 1 · 07 un effectif · 08
# le piège (semi-circulaire) · 09 question 2 · 10 défi · 10b correction · 11 ce
# que tu as appris · 12 fin.
# ⛔ PAS D'ÉCART : chaque pourcentage s'affiche au mot où la voix le dit.
#
# Voix : manim/voix/1re-stats-rep-circulaire.json (débit −7) ; calage :
# manim/scripts/premiere/stats_rep_circulaire_marques.json.
# python -m manim render -qh --disable_caching manim/scripts/premiere/stats_rep_circulaire.py StatsRepCirculairePremiere -o eleveai-maths-premiere-commun-stats-rep-circulaire --media_dir manim/scripts/premiere/media-stats-rep-circulaire
# Sortie : manim/sorties/premiere-commun/maths/statistiques/08-rep-circulaire/

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "stmg"))

from stats_lycee_i1_commun import *  # noqa: E402,F403

NOMS = ["Nucléaire", "Hydraulique", "Éolien", "Autres"]
PARTS = [67, 14, 9, 10]
COUL = ["#fcd34d", "#93c5fd", "#6ee7b7", "#fca5a5"]


def pylone(h=2.6):
    """Un pylône électrique en treillis, deux bras, des câbles."""
    c = "#cbd5e1"
    g, d = P(-0.28 * h, 0), P(0.28 * h, 0)
    s = P(0, h)
    pieds = VGroup(Line(g, s, color=c, stroke_width=5), Line(d, s, color=c, stroke_width=5))
    treillis = VGroup()
    for k in range(1, 6):
        y0, y1 = h * (k - 1) / 6, h * k / 6
        w0, w1 = 0.28 * h * (1 - y0 / h), 0.28 * h * (1 - y1 / h)
        treillis.add(Line(P(-w0, y0), P(w1, y1), color=c, stroke_width=3),
                     Line(P(w0, y0), P(-w1, y1), color=c, stroke_width=3))
    bras = VGroup(Line(P(-0.45 * h, 0.72 * h), P(0.45 * h, 0.72 * h), color=c, stroke_width=5),
                  Line(P(-0.32 * h, 0.88 * h), P(0.32 * h, 0.88 * h), color=c, stroke_width=5))
    cables = VGroup(*[Line(P(x, y), P(x + 0.45 * h * np.sign(x), y - 0.1 * h), color=AMBRE, stroke_width=3)
                      for x, y in ((-0.45 * h, 0.72 * h), (0.45 * h, 0.72 * h), (-0.32 * h, 0.88 * h),
                                   (0.32 * h, 0.88 * h))])
    return VGroup(cables, pieds, treillis, bras).move_to(ORIGIN)


def eclair(h=0.6, couleur=AMBRE):
    return Polygon(P(0.1, 0.5), P(-0.25, -0.05), P(0.02, -0.05), P(-0.12, -0.5), P(0.28, 0.1), P(0.0, 0.1),
                   fill_color=couleur, fill_opacity=1, stroke_width=0).scale(h)


class StatsRepCirculaireBase(PaysageI1):
    nom_voix = "1re-stats-rep-circulaire"
    fichier_marques = "stats_rep_circulaire_marques.json"
    identite = "Maths 1re — EleveAI"
    ceinture = "verte"
    XL = 1.0

    def cam(self, centre=None, valeurs=True, titre="Électricité 2024 (en %)", **kw):
        opts = dict(rayon=1.75, couleurs=COUL, titre=titre, fs=28, valeurs_parts=valeurs, pourcentages=True,
                    centre=ORIGIN if centre is None else centre)
        opts.update(kw)
        c = Camembert(NOMS, PARTS, **opts)
        for t in c.textes:
            t.set_z_index(3)
        if opts.get("montrer_etiquettes", True):  # « Nucléaire » bien DANS sa part
            c.textes[0].move_to(c.centre + c._dir(0) * c._rayon() * 0.45)
        return caser(c, -6.6, 0.45, -3.3, 3.1) if centre is None else c

    def cam_pret(self, cacher_valeurs=False):
        c = self.cam()
        if cacher_valeurs:
            self.cacher(c)
        self.add(c)
        return c

    def cacher(self, c, quelles=(0, 1, 2, 3)):
        """Retire les pourcentages (ils apparaîtront au mot, par valeur())."""
        c.vals = {}
        for i in quelles:
            c.vals[i] = c.textes[i][1].set_z_index(3)
            c.textes[i].remove(c.vals[i])

    def angle_part(self, c, i, txt=None, couleur="#c2410c", fs=30):
        """L'arc de l'angle de la part i (camembert du coach : de midi, sens horaire)."""
        debut = PI / 2 - sum(PARTS[:i]) / 100 * TAU
        r = c._rayon() * 0.42
        return arc_angle(c.centre, r, debut, -PARTS[i] / 100 * TAU, couleur, txt, fs).set_z_index(6)

    ARC = "#c2410c"  # l'arc d'angle : orange foncé, lisible sur le jaune comme sur le bleu

    def valeur(self, c, i):
        """Faire apparaître le pourcentage (caché) de la part i."""
        return FadeIn(c.vals[i], scale=1.3)

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Lire un diagramme circulaire", self.identite, self.ceinture)
        c = self.cam(centre=P(-0.6, 0.0), valeurs=False, titre=None, rayon=1.05, fs=20, montrer_etiquettes=False)
        self.au_mot("Lire un diagramme circulaire")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(c.fond), run_time=0.7)
        self.play(c.apparaitre(run_time=1.0))
        self.au_mot("des angles")
        a = arc_angle(c.centre, 0.5, PI / 2, -0.67 * TAU, AMBRE)
        q = self.t("?", 90, ORANGE_RETENUE).next_to(c, RIGHT, buff=0.5)
        self.play(Create(a), FadeIn(q, scale=0.4), run_time=0.6)
        self.insister(q, 1.3, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : l'ingénieur, 536,5 TWh ─────────────────────────────────────────

    def ecran_situation(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-situation")
        py = pylone(2.6).move_to(P(-3.7, -0.5))
        self.play(FadeIn(py, shift=UP * 0.3), run_time=0.6)
        self.au_mot("536,5")
        nb = self.ligne([("536,5", JAUNE_TITRE), ("TWh", WHITE)], 46).move_to(P(-3.7, 2.85))
        an = self.t("produits en France en 2024", 28, GREY_A).next_to(nb, DOWN, buff=0.15)
        self.play(FadeIn(nb, scale=0.7), FadeIn(an), run_time=0.6)
        self.play(*[Flash(py[0][k].get_end(), color=AMBRE, line_length=0.15) for k in range(4)], run_time=0.6)
        self.au_mot("Un ingénieur du réseau électrique")
        metier = self.col(self.bloc(["Ingénieur du", "réseau électrique"], 42, BLEU_CALCUL), 2.4, xl=0.8)
        self.play(FadeIn(metier, shift=UP * 0.2), run_time=0.5)
        self.au_mot("d'où elle vient")
        ou = self.col(self.ligne([("d'où vient", WHITE), ("l'électricité ?", AMBRE)], 34), 1.25, xl=0.8)
        self.play(FadeIn(ou), run_time=0.4)
        self.au_mot("un diagramme circulaire")
        c = self.cam(centre=P(2.0, -1.1), valeurs=False, titre=None, rayon=0.95, fs=20, montrer_etiquettes=False)
        self.play(FadeIn(c.fond), c.apparaitre(run_time=1.0), run_time=1.0)
        self.au_mot("le disque entier")
        t = self.bloc(["disque entier", "= toute la", "production"], 32).move_to(P(4.6, -1.1))
        self.play(FadeIn(t, shift=LEFT * 0.2), Circumscribe(c.parts, shape=Circle, color=AMBRE), run_time=0.9)
        self.attendre_voix()

    # ── 02 : la règle ───────────────────────────────────────────────────────

    def ecran_regle(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-regle")
        c = self.cam(valeurs=True)
        self.cacher(c)
        t0 = self.col(self.t("La règle", 48, JAUNE_TITRE), 2.75)
        self.play(FadeIn(c.fond), c.apparaitre(run_time=1.0), FadeIn(t0, shift=RIGHT * 0.2), run_time=1.0)
        self.au_mot("vaut 100 %")
        r1 = self.col(self.ligne([("disque entier", WHITE), ("=", WHITE), ("100 %", VERT_OK)], 40), 1.75)
        self.play(FadeIn(r1, shift=RIGHT * 0.2), Indicate(c.parts, color=AMBRE, scale_factor=1.04), run_time=0.6)
        self.au_mot("360 degrés")
        tour = arc_angle(c.centre, c._rayon() * 0.42, PI / 2, -TAU * 0.999, "#c2410c").set_z_index(6)
        r2 = self.col(self.ligne([("=", WHITE), ("360°", AMBRE)], 40), 1.0, xl=self.XL + 2.15)
        self.play(Create(tour), FadeIn(r2, shift=RIGHT * 0.2), run_time=0.9)
        self.au_mot("Donc 1 %")
        r3 = self.col(self.ligne([("1 %", VERT_OK), ("↔", WHITE), ("360 ÷ 100", WHITE)], 42), -0.15)
        self.play(FadeIn(r3, shift=RIGHT * 0.2), FadeOut(tour), run_time=0.5)
        self.au_mot("soit 3,6 degrés")
        r4 = self.col(self.ligne([("=", WHITE), ("3,6°", AMBRE)], 54), -1.05, xl=self.XL + 1.0)
        cadre = self.encadrer(VGroup(r3, r4))
        self.play(FadeIn(r4, scale=0.7), run_time=0.4)
        self.play(Create(cadre), run_time=0.4)
        self.insister(r4[1], 1.35, 0.25)
        self.attendre_voix()

    # ── 03 : les parts ──────────────────────────────────────────────────────

    def ecran_parts(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-parts")
        c = self.cam_pret(cacher_valeurs=True)
        lignes = VGroup()
        for i, (mot, ref) in enumerate(zip(NOMS, ["Le nucléaire", "L'hydraulique", "L'éolien", "les autres sources"])):
            self.au_mot(ref)
            ln = self.col(self.ligne([(mot + " :", WHITE), (f"{PARTS[i]} %", COUL[i])], 40), 2.5 - i * 0.78)
            self.play(c.focus(i, 0.35), run_time=0.3)
            self.au_mot(f"{PARTS[i]} %")
            self.play(self.valeur(c, i), FadeIn(ln, shift=RIGHT * 0.2), run_time=0.4)
            lignes.add(ln)
            if i == 3:
                d = self.col(self.t("solaire, gaz, bioénergies", 28, GREY_A), 2.5 - 3 * 0.78 - 0.5, xl=self.XL + 0.3)
                self.play(FadeIn(d), run_time=0.3)
        self.au_mot("Ensemble")
        s = self.col(self.ligne([("67 + 14 + 9 + 10", WHITE), ("=", WHITE), ("100 %", VERT_OK)], 40), -1.25)
        self.play(c.rallumer(), FadeIn(s, shift=UP * 0.15), run_time=0.5)
        self.insister(s[2], 1.3, 0.25)
        self.attendre_voix()

    # ── 04 : le complément ──────────────────────────────────────────────────

    def ecran_complement(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-complement")
        c = self.cam_pret()
        self.au_mot("ne vient pas du nucléaire")
        t0 = self.col(self.bloc(["Hors nucléaire ?"], 46, JAUNE_TITRE), 2.6)
        self.play(FadeIn(t0, shift=RIGHT * 0.2), c.estomper([1, 2, 3], 0.25), run_time=0.6)
        self.play(c.sortir(1, 0.12), c.sortir(2, 0.12), c.sortir(3, 0.12), run_time=0.4)
        self.au_mot("100 moins 67")
        k = self.col(self.ligne([("100", WHITE), ("−", WHITE), ("67", WHITE)], 52), 1.35)
        self.play(FadeIn(k, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 33 %")
        eg = self.ligne([("=", WHITE), ("33 %", VERT_OK)], 52).next_to(k, RIGHT, buff=0.25)
        self.play(FadeIn(eg, scale=0.7), run_time=0.4)
        self.insister(eg[1], 1.35, 0.25)
        self.au_mot("Environ un tiers")
        tiers = self.col(self.ligne([("≈", WHITE), ("un tiers", AMBRE), ("du disque", WHITE)], 40), 0.15)
        self.play(FadeIn(tiers, shift=UP * 0.15), run_time=0.5)
        self.attendre_voix()

    # ── 05 : un angle ───────────────────────────────────────────────────────

    def ecran_angle(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-angle")
        c = self.cam_pret()
        self.au_mot("L'angle du secteur")
        t0 = self.col(self.t("Un angle", 48, JAUNE_TITRE), 2.6)
        self.play(FadeIn(t0, shift=RIGHT * 0.2), c.focus(1, 0.3), run_time=0.5)
        a = self.angle_part(c, 1)
        self.play(Create(a), run_time=0.6)
        self.au_mot("14 fois 3,6")
        k = self.col(self.ligne([("14", BLEU_CALCUL), ("×", WHITE), ("3,6", AMBRE)], 52), 1.35)
        self.play(FadeIn(k, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 50,4")
        eg = self.ligne([("=", WHITE), ("50,4°", VERT_OK)], 52).next_to(k, RIGHT, buff=0.25)
        lab = self.angle_part(c, 1, "50,4°", fs=30)
        self.play(FadeIn(eg, scale=0.7), FadeIn(lab[1], scale=0.6), run_time=0.5)
        self.insister(eg[1], 1.35, 0.25)
        self.attendre_voix()

    # ── 06 : question 1 (de l'angle à la part) ──────────────────────────────

    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        c = self.cam()
        self.cacher(c, (2,))  # la part de l'éolien est la réponse
        self.add(c)

        def avant():
            self.play(c.focus(2, 0.3), FadeIn(self.angle_part(c, 2, "32,4°", fs=28)), run_time=0.5)

        self.question_pause("06-question", "06b-reponse", ["L'éolien mesure 32,4°.", "Quelle part ?"],
                            ["9 %", "32,4 %", "90 %"], 0, ["32,4 ÷ 3,6 = 9 %", "B : un angle ; C : la virgule"],
                            x0=self.XL + 0.2, largeur=5.0, ys=(0.95, 0.0, -0.95), avant=avant,
                            geste=lambda: self.play(self.valeur(c, 2), run_time=0.4))

    # ── 07 : un effectif ────────────────────────────────────────────────────

    def ecran_effectif(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-effectif")
        c = self.cam_pret()
        self.au_mot("n'est pas un effectif")
        t0 = self.col(self.bloc(["% ≠ effectif"], 48, JAUNE_TITRE), 2.75)
        self.play(FadeIn(t0, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("Pour l'hydraulique")
        self.play(c.focus(1, 0.3), run_time=0.4)
        self.au_mot("14 % de 536,5")
        k1 = self.col(self.ligne([("14 %", BLEU_CALCUL), ("de", WHITE), ("536,5 TWh", WHITE)], 40), 1.85)
        self.play(FadeIn(k1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("536,5 fois 0,14")
        k2 = self.col(self.ligne([("536,5", WHITE), ("×", WHITE), ("0,14", WHITE)], 44), 1.0)
        self.play(FadeIn(k2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 75,11")
        e2 = self.col(self.ligne([("=", WHITE), ("75,11", WHITE)], 44), 0.2, xl=self.XL + 0.6)
        self.play(FadeIn(e2, scale=0.7), run_time=0.4)
        self.au_mot("environ 75")
        e3 = self.col(self.ligne([("≈", WHITE), ("75 TWh", VERT_OK)], 48), -0.6, xl=self.XL + 0.6)
        self.play(FadeIn(e3, scale=0.7), run_time=0.4)
        self.insister(e3[1], 1.3, 0.25)
        self.au_mot("Le bilan officiel donne 74,7")
        off = self.col(self.ligne([("bilan officiel :", GREY_A), ("74,7 TWh", WHITE)], 32), -1.35)
        ok = self.coche(VERT_OK, 0.24).next_to(off, RIGHT, buff=0.2)
        self.col(VGroup(off, ok), -1.35)
        self.play(FadeIn(off, shift=UP * 0.15), run_time=0.4)
        self.au_mot("c'est cohérent")
        self.play(Create(ok), run_time=0.3)
        self.au_mot("14 % est arrondi")
        arr = self.col(self.t("(14 % est arrondi)", 28, GREY_A), -1.95)
        self.play(FadeIn(arr), run_time=0.3)
        self.attendre_voix()

    # ── 08 : le piège (semi-circulaire) ─────────────────────────────────────

    def demi(self):
        d = DemiCamembert(NOMS, PARTS, rayon=2.3, couleurs=COUL, titre="Électricité 2024 (en %)", fs=26)
        return caser(d, -6.6, 0.45, -3.0, 3.0)

    def angle_demi(self, d, i, txt=None, fs=28):
        debut = PI - sum(PARTS[:i]) / 100 * PI
        r = d._rayon() * 0.42
        return arc_angle(d.centre, r, debut, -PARTS[i] / 100 * PI, "#c2410c", txt, fs).set_z_index(6)

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-piege")
        d = self.demi()
        self.au_mot("Le piège")
        titre = self.col(self.t("Le piège", 50, ROUGE_ERREUR), 3.0)
        self.play(Write(titre), FadeIn(d.carte), FadeIn(d.titre), FadeIn(d.base), run_time=0.5)
        self.au_mot("le diagramme semi-circulaire")
        self.play(d.apparaitre(run_time=1.0))
        self.add(d)
        self.au_mot("le demi-disque, 180 degrés")
        r1 = self.col(self.ligne([("demi-disque", WHITE), ("=", WHITE), ("180°", AMBRE)], 40), 2.05)
        tour = arc_angle(d.centre, d._rayon() * 0.42, PI, -PI * 0.999, "#c2410c")
        self.play(FadeIn(r1, shift=RIGHT * 0.2), Create(tour), run_time=0.7)
        self.au_mot("qui vaut 100 %")
        r1b = self.col(self.ligne([("=", WHITE), ("100 %", VERT_OK)], 40), 1.35, xl=self.XL + 2.6)
        self.play(FadeIn(r1b, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("1 % correspond à 1,8")
        r2 = self.col(self.ligne([("1 %", VERT_OK), ("↔", WHITE), ("1,8°", AMBRE)], 46), 0.5)
        self.play(FadeIn(r2, shift=RIGHT * 0.2), FadeOut(tour), run_time=0.5)
        self.insister(r2[2], 1.35, 0.25)
        self.au_mot("Le nucléaire : 67 fois 1,8")
        self.play(d.focus(0, 0.3), run_time=0.3)
        k = self.col(self.ligne([("67 × 1,8", WHITE)], 44), -0.4)
        self.play(FadeIn(k, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 120,6")
        eg = self.ligne([("=", WHITE), ("120,6°", VERT_OK)], 44).next_to(k, RIGHT, buff=0.2)
        a = self.angle_demi(d, 0, "120,6°")
        self.play(FadeIn(eg, scale=0.7), Create(a[0]), FadeIn(a[1]), run_time=0.5)
        self.au_mot("et non 241,2")
        non = self.col(self.t("241,2°", 40, ORANGE_RETENUE), -1.25, xl=self.XL + 0.4)
        self.play(FadeIn(non), run_time=0.3)
        self.play(Create(croix(non, sw=6)), run_time=0.3)
        self.attendre_voix()

    # ── 09 : question 2 (l'angle dans le demi-disque) ───────────────────────

    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        d = self.demi()
        self.add(d)

        def geste():
            a = self.angle_demi(d, 1, "25,2°")
            self.play(Create(a[0]), FadeIn(a[1]), run_time=0.5)

        self.question_pause("09-question", "09b-reponse", ["Demi-disque :", "l'angle de l'hydraulique ?"],
                            ["25,2°", "50,4°", "14°"], 0, ["14 × 1,8 = 25,2°", "B : 3,6 ; C : le % pris pour un angle"],
                            x0=self.XL + 0.2, largeur=5.0, ys=(0.95, 0.0, -0.95),
                            avant=lambda: self.play(d.focus(1, 0.3), run_time=0.4), geste=geste)

    # ── 10 : défi ───────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("10-defi")
        c = self.cam_pret()
        self.au_mot("À toi de jouer")
        titre = self.col(self.t("À toi de jouer", 50, JAUNE_TITRE), 2.75)
        self.play(Write(titre), run_time=0.6)
        self.au_mot("Un : dans le disque entier")
        q1 = self.col(VGroup(self.ligne([("1.", AMBRE), ("Angle des", WHITE)], 38),
                             self.t("autres sources ?", 38)).arrange(DOWN, aligned_edge=LEFT, buff=0.12), 1.55)
        self.play(FadeIn(q1, shift=RIGHT * 0.2), c.focus(3, 0.3), run_time=0.6)
        self.au_mot("Deux : combien")
        q2 = self.col(VGroup(self.ligne([("2.", AMBRE), ("Éolien :", WHITE)], 38),
                             self.t("combien de TWh ?", 38)).arrange(DOWN, aligned_edge=LEFT, buff=0.12), 0.0)
        self.play(FadeIn(q2, shift=RIGHT * 0.2), c.focus(2, 0.3), run_time=0.6)
        self.au_mot("Mets pause")
        pause = self.pause_defi(-1.35)
        self.play(Write(pause), c.rallumer(), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("10b-correction")
        c = self.cam_pret()
        titre = self.col(self.t("Correction", 50, JAUNE_TITRE), 2.75)
        self.play(Write(titre), c.focus(3, 0.3), run_time=0.5)
        self.au_mot("10 fois 3,6")
        k1 = self.col(self.ligne([("1.", AMBRE), ("10 × 3,6", WHITE)], 44), 1.75)
        self.play(FadeIn(k1, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 36")
        r1 = self.ligne([("=", WHITE), ("36°", VERT_OK)], 44).next_to(k1, RIGHT, buff=0.2)
        a = self.angle_part(c, 3, "36°", fs=28)
        self.play(FadeIn(r1, scale=0.7), Create(a[0]), FadeIn(a[1]), run_time=0.5)
        self.insister(r1[1], 1.3, 0.25)
        self.au_mot("536,5 fois 0,09")
        self.play(c.focus(2, 0.3), FadeOut(a), run_time=0.3)
        k2 = self.col(self.ligne([("2.", AMBRE), ("536,5 × 0,09", WHITE)], 44), 0.6)
        self.play(FadeIn(k2, shift=RIGHT * 0.2), run_time=0.4)
        self.au_mot("égale 48,285")
        r2 = self.col(self.ligne([("=", WHITE), ("48,285", WHITE)], 44), -0.25, xl=self.XL + 0.55)
        self.play(FadeIn(r2, scale=0.7), run_time=0.4)
        self.au_mot("environ 48")
        r3 = self.col(self.ligne([("≈", WHITE), ("48 TWh", VERT_OK)], 48), -1.1, xl=self.XL + 0.55)
        self.play(FadeIn(r3, scale=0.7), run_time=0.4)
        self.insister(r3[1], 1.3, 0.25)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("11-finale")
        c = self.cam_pret()
        lignes = self.finale([("Disque : 100 % = 360°", "1 % ↔ 3,6°"), ("Demi-disque : 180°", "1 % ↔ 1,8°"),
                              ("Effectif :", "% × total")], [1.75, 0.15, -1.45])
        self.au_mot("Le disque entier")
        self.montrer_ligne(lignes[0], Create(self.angle_part(c, 0)))
        self.au_mot("Dans un demi-disque")
        self.montrer_ligne(lignes[1])
        self.au_mot("Et un effectif")
        self.montrer_ligne(lignes[2], c.focus(1, 0.35))
        self.insister(lignes[2][1], 1.1, 0.3)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_regle()
        self.ecran_parts()
        self.ecran_complement()
        self.ecran_angle()
        self.ecran_question1()
        self.ecran_effectif()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")


class StatsRepCirculairePremiere(StatsRepCirculaireBase):
    identite = "Maths 1re — EleveAI"
    ceinture = "verte"
