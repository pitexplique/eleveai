# prop_pourcentage_comprendre.py
# EleveAI — Maths 6e — série « Proportionnalité », épisode 11 : COMPRENDRE UN
# POURCENTAGE (micro du coach : pourcentage_comprendre, notion
# pourcentage_nombre), AVEC VOIX. Paysage 16:9, CEINTURE VERTE (la paysage
# complète du niveau : situation, méthode, piège, 2 questions-pauses, défi
# corrigé). Short jumeau : prop_pourcentage_comprendre_short.py (blanche).
# ⭐ L'idée : « pour cent » = « sur 100 », vu sur 100 CASES (une case par
# animal) ; si le total n'est pas 100, on le RAMÈNE à 100 avec le tableau de
# proportionnalité (l'opération écrite sur la flèche : × 2, × 5, × 10).
# Lien sans duplication : les fractions 6e 12 (pourcentage ↔ fraction) et 13
# (pourcentage ↔ décimal) ont déjà la grille de 100 cases ; on la reprend
# (grille100, BarrePourcent) sans refaire leur méthode.
# ⛔ Pas de produit en croix (6e) ; « × » sur les flèches, aucune division ici.
# ⭐ Leurres (consigne-videos-proportionnalite.md, erreur 6 « un pourcentage
# = un nombre de cases sans le sur 100 ») : écran 05 (25 sur 50 ≠ 25 %),
# question 2 (5 lapins sur 20 → 5 % faux, 20 % faux).
#
# Décor et métier : ANIMAUX ; Clara, VÉTÉRINAIRE dans un refuge (100 animaux,
# 45 chats). Chiffres inventés (un refuge imaginaire) : aucune donnée du monde
# réel citée, pas de source à donner.
# Centres d'intérêt : animaux, chiens-chats.
#
# Micro → écrans : pour cent = sur 100 (02) ; le complément à 100 % (03) ;
# QUESTION 1 (04, 30 chiens sur 100) ; le piège 25 sur 50 (05) ; ramener à
# 100 par le tableau (06) ; QUESTION 2 (07, 5 lapins sur 20) ; défi (08) et
# correction (08b, 7 chats sur 10) ; ce que tu as appris (09) ; fin (10).
# Écrans : 00 garde · 01 Clara et le refuge · 02 sur 100 · 03 le reste ·
# 04 QUESTION 1 · 05 le piège · 06 le tableau · 07 QUESTION 2 · 08 défi ·
# 08b correction · 09 ce que tu as appris · 10 fin.
#
# Voix : manim/voix/6e-prop-pourcentage-comprendre.json (validée par Frédéric,
# débit −10), WAV dans public/sons/6e-prop-pourcentage-comprendre/ ; marques
# mot à mot : manim/scripts/6e/prop_pourcentage_comprendre_marques.json
# (scripts/marques_dump.ps1 puis scripts/cues2marques.py ; ajoutées à la main
# car un mot répété deux fois de suite est jeté : « 100 %. 100 % » (03),
# « 25. 25 » (07b), « 70. 70 » (08b)).
# Outils : prop_commun.py + manim/canvas_proportion.py (non modifiés).
# Ajouté ICI : tete_chat(), tete_chien(), tete_lapin(), refuge(), clara(),
# stethoscope(), les grilles de 50 et de 10 cases (Grille de canvas_fractions).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/prop_pourcentage_comprendre.py PropPourcentageComprendre6e
# python -m manim render -qh --disable_caching manim/scripts/6e/prop_pourcentage_comprendre.py PropPourcentageComprendre6e -o eleveai-maths-6e-prop-pourcentage-comprendre --media_dir manim/media-prop-11
# Sortie : manim/sorties/6e/maths/proportionnalite/11-pourcentage-comprendre/eleveai-maths-6e-prop-pourcentage-comprendre.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from prop_commun import *  # noqa: E402,F403

C_CHAT = "#fb923c"     # les chats (orange)
C_AUTRE = "#4ade80"    # les autres animaux (vert)
C_CHIEN = "#a16207"    # les chiens (brun)
C_LAPIN = "#f472b6"    # les lapins (rose)
BLOUSE_V = "#0ea5e9"


def tete_chat(couleur=C_CHAT, s=1.0):
    """Une tête de chat : rond, deux oreilles pointues, yeux, museau."""
    tete = Circle(radius=0.3, fill_color=couleur, fill_opacity=1, stroke_color="#7c2d12", stroke_width=2)
    oreilles = VGroup(*[Polygon(P(x - 0.12, 0.16), P(x + 0.12, 0.16), P(x + 0.02 * np.sign(x), 0.42),
                                fill_color=couleur, fill_opacity=1, stroke_color="#7c2d12", stroke_width=2)
                        for x in (-0.17, 0.17)])
    yeux = VGroup(*[Dot(P(x, 0.05), radius=0.045, color="#111827") for x in (-0.11, 0.11)])
    nez = Triangle(fill_color="#be185d", fill_opacity=1, stroke_width=0).scale(0.05).rotate(PI).move_to(P(0, -0.06))
    mous = VGroup(*[Line(P(sx * 0.08, -0.08 + dy), P(sx * 0.36, -0.04 + 2 * dy), stroke_width=1.5,
                         color="#111827") for sx in (-1, 1) for dy in (-0.03, 0.03)])
    return VGroup(oreilles, tete, yeux, nez, mous).scale(s)


def tete_chien(couleur=C_CHIEN, s=1.0):
    """Une tête de chien : rond, oreilles tombantes, museau clair, truffe."""
    tete = Circle(radius=0.3, fill_color=couleur, fill_opacity=1, stroke_color="#451a03", stroke_width=2)
    oreilles = VGroup(*[Ellipse(width=0.18, height=0.4, fill_color="#451a03", fill_opacity=1, stroke_width=0)
                        .rotate(sx * 0.35).move_to(P(sx * 0.3, 0.02)) for sx in (-1, 1)])
    museau = Ellipse(width=0.3, height=0.2, fill_color="#fde68a", fill_opacity=1, stroke_width=0).move_to(P(0, -0.12))
    truffe = Ellipse(width=0.1, height=0.07, fill_color="#111827", fill_opacity=1, stroke_width=0).move_to(P(0, -0.07))
    yeux = VGroup(*[Dot(P(x, 0.08), radius=0.045, color="#111827") for x in (-0.11, 0.11)])
    return VGroup(tete, oreilles, museau, truffe, yeux).scale(s)


def tete_lapin(couleur=C_LAPIN, s=1.0):
    """Une tête de lapin : rond, deux longues oreilles, yeux."""
    oreilles = VGroup(*[Ellipse(width=0.15, height=0.5, fill_color=couleur, fill_opacity=1, stroke_color=WHITE,
                                stroke_width=2).move_to(P(x, 0.42)) for x in (-0.1, 0.1)])
    tete = Circle(radius=0.26, fill_color=couleur, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    yeux = VGroup(*[Dot(P(x, 0.04), radius=0.04, color="#111827") for x in (-0.09, 0.09)])
    return VGroup(oreilles, tete, yeux).scale(s)


def refuge(s=1.0):
    """Le refuge : murs, toit, porte, panneau « REFUGE »."""
    murs = Rectangle(width=2.6, height=1.6, fill_color="#fef3c7", fill_opacity=1, stroke_color="#92400e",
                     stroke_width=4)
    toit = Polygon(P(-1.55, 0.8), P(1.55, 0.8), P(0, 1.75), fill_color="#b91c1c", fill_opacity=1,
                   stroke_color="#7f1d1d", stroke_width=4)
    porte = RoundedRectangle(width=0.55, height=0.9, corner_radius=0.08, fill_color="#92400e", fill_opacity=1,
                             stroke_width=0).move_to(P(0, -0.35))
    panneau = RoundedRectangle(width=1.9, height=0.42, corner_radius=0.08, fill_color="#166534", fill_opacity=1,
                               stroke_color=WHITE, stroke_width=2).move_to(P(0, 0.5))
    mot = Text("REFUGE", font_size=22, color=WHITE, weight=BOLD).move_to(panneau)
    mot.sans_synchro = mot._pas_audit = True
    g = VGroup(murs, toit, porte, panneau, mot).scale(s)
    g.murs, g.mot = murs, mot
    return g


def stethoscope(p):
    """Un stéthoscope autour du cou du personnage p."""
    c = p.tete.get_center() + DOWN * p.tete.height * 0.95
    l = p.tete.width
    tube = Arc(radius=l * 0.38, start_angle=PI * 1.05, angle=PI * 0.9, arc_center=c, stroke_color="#111827",
               stroke_width=5)
    fil = Line(tube.get_end(), tube.get_end() + DOWN * l * 0.55, stroke_color="#111827", stroke_width=5)
    capsule = Circle(radius=l * 0.1, fill_color="#94a3b8", fill_opacity=1, stroke_color="#111827",
                     stroke_width=3).move_to(fil.get_end())
    return VGroup(tube, fil, capsule)


def clara(s=1.0):
    """Clara, vétérinaire : cheveux longs, blouse blanche, stéthoscope."""
    p = personne(peau="#e0ac69", tenue=BLOUSE_V, cheveux="#7c2d12", longs=True, s=s)
    p.add(blouse(p))
    p.add(stethoscope(p))
    return p


def grille(lignes, colonnes, cote, centre=ORIGIN):
    """Une grille vide de la carte du coach (Grille de canvas_fractions)."""
    return Grille(lignes, colonnes, colories=[], cote=cote, sw=2, centre=centre)


def moitie_gauche(lignes=5, colonnes=10):
    """Les indices des cases des 5 premières colonnes (la moitié gauche)."""
    return [r * colonnes + c for r in range(lignes) for c in range(colonnes // 2)]


class PropPourcentageComprendreBase(PaysageProp):
    nom_voix = "6e-prop-pourcentage-comprendre"
    fichier_marques = "prop_pourcentage_comprendre_marques.json"
    X_G = -3.4   # le centre de la grille de gauche

    def ligne_rep(self, i, morceaux, fs=None):
        """Celle de prop_tableau.py : bornée à droite (BORD_X), même largeur
        que la phrase remplacée (la surcharge du lot 1)."""
        lg = super().ligne_rep(i, morceaux, fs)
        ref = self.ph_q[i]
        lg.scale_to_fit_width(ref.width).move_to(ref).align_to(ref, LEFT)
        g = lg.get_left()[0]
        if lg.get_right()[0] > self.BORD_X - 0.05:
            lg.scale_to_fit_width(self.BORD_X - 0.05 - g).align_to(P(g, 0), LEFT)
        return lg

    @staticmethod
    def muet(fl):
        """Étiquette de flèche dont le nombre vient d'être dit : ni attente, ni audit."""
        fl.etiquette._pas_audit = True
        fl.etiquette.sans_synchro = True
        return fl

    def _disposer_q(self, question, choix, phrase):
        """Le chiffre du compte à rebours (« 5 ») n'attend pas le mot « 5 » de la voix."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        for f in rebours.get_family():
            if isinstance(f, Text):
                f.sans_synchro = True
        return tete, q, cartes, pause, rebours, ph

    @staticmethod
    def donnee(t):
        """Une donnée de la figure, dite à l'écran d'avant : affichée d'un bloc."""
        t._pas_audit = True
        t.sans_synchro = True
        return t

    def grille100(self, chats=0, autres=0, cote=0.5, centre=None):
        """Les 100 cases du refuge : `chats` cases orange puis `autres` vertes."""
        g = grille(10, 10, cote, centre=centre if centre is not None else P(self.X_G, -0.1))
        for i in range(chats):
            g.liste[i].set_fill(C_CHAT, 1)
        for i in range(chats, chats + autres):
            g.liste[i].set_fill(C_AUTRE, 1)
        g.colories = list(range(chats + autres))
        return g

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Comprendre un pourcentage", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Que veut")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        pc = Text("%", font_size=170, color=C_CHAT, weight=BOLD).move_to(P(-1.2, 0.3))
        chat = tete_chat(s=2.0).move_to(P(-4.6, 0.3))
        chien = tete_chien(s=2.0).move_to(P(4.5, 0.3))
        self.au_mot("pour cent")
        self.play(GrowFromCenter(pc), FadeIn(chat, shift=RIGHT * 0.3), FadeIn(chien, shift=LEFT * 0.3),
                  run_time=0.6)
        q = Text("= ?", font_size=110, color=AMBRE).next_to(pc, RIGHT, buff=0.45)
        self.au_mot("Trois mots")
        self.play(FadeIn(q, scale=0.5), run_time=0.4)
        self.insister(pc, 1.15, 0.25)
        self.attendre_voix(marge=0.6)

    # ── 01 : Clara, vétérinaire au refuge ───────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pers = clara(1.05).move_to(P(-5.45, -0.7))
        self.au_mot("Voici Clara")
        nom = self.t("Clara", 40, BLEU_CALCUL).next_to(pers, UP, buff=0.25)
        self.play(FadeIn(pers, shift=UP * 0.3), FadeIn(nom), run_time=0.6)
        self.au_mot("vétérinaire")
        met = self.t("vétérinaire", 32, BLEU_CALCUL).next_to(pers, DOWN, buff=0.2)
        met.shift(RIGHT * max(0, -6.45 - met.get_left()[0]))
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.4)
        rf = refuge(1.0).move_to(P(-1.85, 0.55))
        self.au_mot("refuge")
        self.play(FadeIn(VGroup(*rf[:4]), scale=0.9), Write(rf.mot), run_time=0.6)
        self.au_mot("animaux")
        betes = VGroup(tete_chat(s=0.9), tete_chien(s=0.9), tete_lapin(s=0.9)).arrange(RIGHT, buff=0.3)
        betes.next_to(rf, DOWN, buff=0.3)
        self.play(LaggedStart(*[FadeIn(b, shift=UP * 0.2) for b in betes], lag_ratio=0.25), run_time=0.7)
        # la fiche de Clara (carte blanche, écrite en bleu nuit)
        fiche = RoundedRectangle(width=5.0, height=3.6, corner_radius=0.2, fill_color=CARTE, fill_opacity=1,
                                 stroke_color="#94a3b8", stroke_width=3).move_to(P(3.55, 0.75))
        self.au_mot("Le refuge accueille")
        self.play(FadeIn(fiche, shift=LEFT * 0.2), run_time=0.4)
        l1 = self.ligne([("100", NUIT), ("animaux", NUIT)], 40).move_to(fiche.get_top() + DOWN * 0.65)
        l1.align_to(fiche.get_left() + RIGHT * 0.4, LEFT)
        self.au_mot("100 animaux")
        self.play(FadeIn(l1, shift=RIGHT * 0.2), Indicate(betes, color=AMBRE, scale_factor=1.1), run_time=0.5)
        l2 = self.ligne([("45", C_CHAT), ("chats", NUIT)], 40).next_to(l1, DOWN, buff=0.35).align_to(l1, LEFT)
        mini = tete_chat(s=0.55).next_to(l2, RIGHT, buff=0.3)
        self.au_mot("45")
        self.play(FadeIn(l2[0], scale=1.3), run_time=0.3)
        self.au_mot("chats")
        self.play(FadeIn(l2[1], shift=RIGHT * 0.2), FadeIn(mini, scale=0.6), run_time=0.35)
        self.au_mot("fiche")
        self.play(Indicate(fiche, color=BLEU_CALCUL, scale_factor=1.04), run_time=0.6)
        trait = Line(fiche.get_left() + P(0.3, 0), fiche.get_right() + P(-0.3, 0), color="#cbd5e1",
                     stroke_width=3).set_y(l2.get_bottom()[1] - 0.3)
        l3 = self.ligne([("45 %", C_CHAT), ("de chats", NUIT)], 42).next_to(trait, DOWN, buff=0.35)
        l3.set_x(fiche.get_x())
        self.au_mot("écrit")
        self.play(Create(trait), run_time=0.3)
        self.au_mot("45 %")
        self.play(FadeIn(l3[0], scale=1.4), run_time=0.35)
        self.au_mot("de chats")
        self.play(FadeIn(l3[1], shift=RIGHT * 0.2), run_time=0.3)
        self.insister(l3[0], 1.25, 0.2)
        self.attendre_voix()

    # ── 02 : pour cent = sur 100 ────────────────────────────────────────────
    def ecran_sur_100(self):
        self.ecran("02-sur-100")
        self.au_mot("Pourquoi")
        tit = self.ligne([("Pourquoi", JAUNE_TITRE), ("45 % ?", C_CHAT)], 46)
        self.col(tit, 3.0)
        self.play(FadeIn(tit[0], shift=DOWN * 0.15), run_time=0.3)
        self.au_mot("45 %")
        self.play(FadeIn(tit[1], scale=1.3), run_time=0.3)
        bp = BarrePourcent(45, mode="cases", cote=0.5, couleur=C_CHAT, etiquette=False,
                           centre=P(self.X_G, -0.1)).vide()
        g = bp.grille
        self.au_mot("Voici 100 cases")
        l1 = self.col(self.t("100 cases", 40), 2.1)
        self.play(g.apparaitre(1.0), FadeIn(l1, shift=RIGHT * 0.2))
        self.au_mot("une case")
        l2 = self.ligne([("une case", WHITE), ("= un animal", WHITE)], 38)
        ic = tete_chien(s=0.75).next_to(l2, RIGHT, buff=0.25)
        bloc = self.col(VGroup(l2, ic), 1.3)
        self.play(FadeIn(l2[0], shift=RIGHT * 0.2), Indicate(g.liste[0], color=AMBRE, scale_factor=1.6),
                  run_time=0.4)
        self.au_mot("animal")
        self.play(FadeIn(l2[1], shift=RIGHT * 0.2), FadeIn(ic, scale=0.6), run_time=0.35)
        self.au_mot("45 cases")
        l3 = self.ligne([("45 cases :", C_CHAT), ("des chats", WHITE)], 38)
        self.col(l3, 0.45)
        self.play(FadeIn(l3[0], shift=RIGHT * 0.2), bp.remplir(run_time=1.4))
        self.au_mot("des chats")
        self.play(FadeIn(l3[1], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("45 sur 100")
        l4 = self.col(self.ligne([("45", C_CHAT), ("sur 100", WHITE)], 50), -0.45)
        self.poser_lignes(l4, "fade", 0.3)
        self.au_mot("Pour cent veut")
        r = self.ligne([("pour cent", AMBRE), ("=", WHITE), ("sur 100", AMBRE)], 44)
        self.col(r, -1.45)
        if r.get_right()[0] > self.BORD_X - 0.35:  # le cadre (buff 0,15) reste à 3 % du bord
            r.scale_to_fit_width(self.BORD_X - 0.35 - self.XL - 0.15).align_to(P(self.XL + 0.15, 0), LEFT)
        self.play(FadeIn(r[0], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("dire : sur 100")
        self.play(FadeIn(r[1:], shift=RIGHT * 0.2), run_time=0.3)
        cadre = self.encadrer(r, AMBRE, 0.15)
        self.play(Create(cadre), run_time=0.4)
        self.au_mot("45 %, c'est")
        l5 = self.ligne([("45 %", VERT_OK), ("=", WHITE), ("45", VERT_OK), ("sur 100", VERT_OK)], 46)
        self.col(l5, -2.55)
        self.play(FadeIn(l5[0], scale=1.3), run_time=0.35)
        self.au_mot("c'est 45")
        self.play(FadeIn(l5[1:3], shift=RIGHT * 0.2), Indicate(g.liste[44], color=WHITE, scale_factor=1.5),
                  run_time=0.4)
        self.au_mot("sur 100.", 3)
        self.play(FadeIn(l5[3], shift=RIGHT * 0.2), run_time=0.3)
        self.insister(l5, 1.08, 0.2, about=l5.get_left())
        self.attendre_voix()

    # ── 03 : le reste, et 100 % ─────────────────────────────────────────────
    def ecran_reste(self):
        self.ecran("03-reste")
        g = self.grille100(45)
        self.add(g)
        self.au_mot("Et les autres")
        tit = self.col(self.t("Et les autres animaux ?", 44, JAUNE_TITRE), 3.0)
        self.play(Write(tit), run_time=0.5)
        self.calc([("100 −", WHITE), ("45", C_CHAT), ("=", WHITE), ("55", C_AUTRE)], 2.05, fs=48)
        self.au_mot("55 cases")
        l2 = self.ligne([("55 cases", C_AUTRE), ("sur 100 :", WHITE), ("55 %", C_AUTRE)], 44)
        self.col(l2, 1.05)
        self.play(FadeIn(l2[0], shift=RIGHT * 0.2), g.colorier(range(45, 100), couleur=C_AUTRE, lag=0.02,
                                                                 run_time=1.0))
        self.poser_lignes(VGroup(*l2[1:]), "fade", 0.3)
        self.au_mot("Les chats")
        self.play(Indicate(VGroup(*g.liste[:45]), color=C_CHAT, scale_factor=1.03), run_time=0.6)
        l3 = self.ligne([("45 %", C_CHAT), ("+", WHITE), ("55 %", C_AUTRE), ("=", WHITE), ("100 %", JAUNE_TITRE)], 50)
        self.col(l3, -0.1)
        self.poser_lignes(l3, "fade", 0.3)
        cadre = SurroundingRectangle(g.liste, color=JAUNE_TITRE, buff=0.12, stroke_width=7)
        self.au_mot("100 %, c'est")
        l4 = self.ligne([("100 %", JAUNE_TITRE), ("= tout le refuge", WHITE)], 40)
        self.col(l4, -1.3)
        self.play(FadeIn(l4[0], scale=1.3), Create(cadre), run_time=0.5)
        self.au_mot("tout le refuge")
        self.play(FadeIn(l4[1], shift=RIGHT * 0.2), Indicate(g.liste, color=JAUNE_TITRE, scale_factor=1.03),
                  run_time=0.6)
        self.insister(l4[0], 1.2, 0.2)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (30 chiens sur 100 animaux) ─────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        g = self.grille100()
        self.add(g)

        def apres(sc):
            sc.au_mot("30 sur")
            sc.play(g.colorier(range(30), couleur=C_CHIEN, lag=0.03, run_time=0.9))

        self.question_pause("04-question", "04b-reponse",
                            ["Un refuge de 100 animaux.", "30 sont des chiens.", "Quel pourcentage de chiens ?"],
                            [self.t("30 %", 34), self.t("70 %", 34), self.t("3 %", 34)], 0,
                            ["30 sur 100, c'est 30 %."], mot_q="Dans un refuge", autres_r=apres)

    # ── 05 : le piège (25 chats sur 50 animaux) ─────────────────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        tit = self.col(self.t("Attention au piège !", 44, ROUGE_ERREUR), 3.0)
        self.au_mot("Attention")
        self.play(Write(tit), run_time=0.5)
        g50 = grille(5, 10, 0.42, centre=P(-3.65, 1.95))
        l1 = self.col(self.ligne([("Petit refuge :", WHITE), ("50 animaux", WHITE)], 38), 2.1)
        self.au_mot("petit refuge")
        self.play(g50.apparaitre(0.8), FadeIn(l1[0], shift=RIGHT * 0.2))
        self.au_mot("50 animaux")
        self.play(FadeIn(l1[1], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("25")
        l2 = self.col(self.ligne([("25", C_CHAT), ("chats", WHITE)], 40), 1.25)
        self.play(FadeIn(l2[0], scale=1.3), g50.colorier(moitie_gauche(), couleur=C_CHAT, lag=0.03, run_time=0.9))
        self.au_mot("chats")
        self.play(FadeIn(l2[1], shift=RIGHT * 0.2), run_time=0.3)
        self.au_mot("25 %")
        faux = self.col(self.t("25 % ?", 52, ORANGE_RETENUE), 0.35)
        self.play(FadeIn(faux, scale=1.3), run_time=0.35)
        self.au_mot("Non")
        x_faux = croix(faux, sw=7)
        self.play(Create(x_faux), run_time=0.35)
        self.au_mot("25 sur")
        l3 = self.col(self.ligne([("25 sur 50", WHITE), ("= la moitié", AMBRE)], 40), -0.55)
        x_mil = g50.liste[5].get_left()[0]
        mil = DashedLine(P(x_mil, g50.liste.get_top()[1] + 0.15), P(x_mil, g50.liste.get_bottom()[1] - 0.15),
                         color=AMBRE, stroke_width=6, dash_length=0.12)
        self.poser_lignes(VGroup(l3[0]), "fade", 0.3)
        self.au_mot("moitié")
        self.play(FadeIn(l3[1], shift=RIGHT * 0.2), Create(mil), run_time=0.5)
        # sur 100 : un deuxième refuge pareil, dessous ; la moitié reste la moitié
        bas = VGroup(g50.copy(), mil.copy())
        self.au_mot("Sur 100")
        l4 = self.col(self.ligne([("Sur 100 :", WHITE), ("la moitié", AMBRE), ("= 50", C_CHAT)], 40), -1.45)
        self.play(bas.animate.shift(DOWN * (g50.carte.height + 0.12)), FadeIn(l4[0], shift=RIGHT * 0.2),
                  run_time=0.7)
        self.au_mot("la moitié, c'est")
        self.play(FadeIn(l4[1], shift=RIGHT * 0.2), Indicate(VGroup(mil, bas[1]), color=AMBRE), run_time=0.4)
        self.au_mot("c'est 50")
        self.play(FadeIn(l4[2], scale=1.3), run_time=0.35)
        self.au_mot("Donc 50 %")
        l5 = self.ligne([("Donc", WHITE), ("50 %", VERT_OK), ("de chats", VERT_OK)], 46)
        l5[1:].shift(RIGHT * 0.25)
        self.col(l5, -2.55)
        self.poser_lignes(l5, "fade", 0.3)
        self.play(Create(self.encadrer(l5[1:], VERT_OK, 0.12)), run_time=0.4)
        self.attendre_voix()

    # ── 06 : le tableau : ramener 50 animaux à 100 ──────────────────────────
    def table_chats(self, libs, vals, centre, case=1.7, lib=2.8, fs=42):
        return TableauProp(libs, vals, montrer=False, largeur_case=case, largeur_libelle=lib, hauteur=0.9,
                           fs=fs, centre=centre)

    def ecran_tableau(self):
        self.ecran("06-tableau")
        tit = self.t("Un pourcentage, c'est une proportion.", 40, JAUNE_TITRE).move_to(P(-0.4, 3.15))
        self.au_mot("Un pourcentage")
        self.play(Write(tit), run_time=0.7)
        tb = self.table_chats(["Chats", "Animaux"], [[25, 50], [50, 100]], P(-0.6, 0.45))
        self.au_mot("On complète")
        self.play(FadeIn(tb.fond, shift=UP * 0.2), FadeIn(tb.trou(0, 1)), run_time=0.5)
        self.au_mot("25 chats")
        self.play(FadeIn(tb.valeur(0, 0), scale=1.4), run_time=0.3)
        self.au_mot("50 animaux")
        self.play(FadeIn(tb.valeur(1, 0), scale=1.4), run_time=0.3)
        self.au_mot("Pour 100 animaux")
        self.play(FadeIn(tb.valeur(1, 1), scale=1.4), tb.allumer(1, 1), run_time=0.4)
        b = tb.fleche_col(0, 1, "× 2", ligne=1)
        self.au_mot("2 fois")
        self.play(Create(b.fleche), FadeIn(b.etiquette, scale=1.4), tb.eteindre(1, 1), run_time=0.45)
        h = self.muet(tb.fleche_col(0, 1, "× 2", ligne=0))
        self.au_mot("plus")
        self.play(Create(h.fleche), FadeIn(h.etiquette, scale=1.4), run_time=0.4)
        self.au_mot("50 chats")
        self.play(tb.remplir(0, 1, 50), run_time=0.4)
        self.play(tb.allumer(0, 1), run_time=0.3)
        self.au_mot("50 sur")
        l1 = self.ligne([("50 sur 100", WHITE), ("=", WHITE), ("50 %", VERT_OK)], 50, buff=0.3).move_to(P(-0.6, -2.55))
        self.play(FadeIn(l1[0], shift=RIGHT * 0.2), tb.allumer(1, 1), run_time=0.35)
        self.au_mot("50 %")
        self.play(FadeIn(l1[1:], scale=1.3), run_time=0.35)
        self.play(Create(self.encadrer(l1[2], VERT_OK, 0.12)), run_time=0.4)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (5 lapins sur 20 animaux) ───────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        g20 = grille(2, 10, 0.5, centre=P(self.X_G, 0.9))
        for i in range(5):
            g20.liste[i].set_fill(C_LAPIN, 1)
        lapins = VGroup(*[tete_lapin(s=0.75).next_to(g20.liste[i], UP, buff=0.12) for i in range(5)])
        lapins.shift(UP * 0.35)
        deco = VGroup(g20, lapins)
        self.add(deco)
        tb = self.table_chats(["Lapins", "Animaux"], [[5, 25], [20, 100]], P(self.X_G + 0.2, 0.6), case=1.35,
                              lib=2.4, fs=40)

        def apres(sc):
            l0 = sc.ligne_rep(0, ["20 ×", "5 =", "100."])
            l1 = sc.ligne_rep(1, ["Alors", "5 ×", "5 =", "25."])
            l2 = sc.ligne_rep(2, ["25 sur 100 :", "25 %."])
            b = tb.fleche_col(0, 1, "× 5", ligne=1)
            h = self.muet(tb.fleche_col(0, 1, "× 5", ligne=0))
            sc.play(FadeOut(deco), FadeIn(tb.fond), FadeIn(self.donnee(tb.valeur(0, 0))),
                    FadeIn(self.donnee(tb.valeur(1, 0))), FadeIn(tb.trou(0, 1)), run_time=0.35)
            sc.au_mot("20 fois")
            sc.play(FadeIn(l0[0], shift=UP * 0.15), tb.allumer(1, 0), Create(b.fleche), run_time=0.3)
            sc.au_mot("5, égale")
            sc.play(FadeIn(l0[1], shift=UP * 0.15), FadeIn(b.etiquette, scale=1.3), run_time=0.3)
            sc.au_mot("100.")
            sc.play(FadeIn(l0[2], scale=1.3), FadeIn(tb.valeur(1, 1), scale=1.4), tb.eteindre(1, 0), run_time=0.35)
            sc.au_mot("Alors")
            sc.play(FadeIn(l1[0], shift=UP * 0.15), tb.allumer(0, 0), run_time=0.3)
            sc.au_mot("5 fois")
            sc.play(FadeIn(l1[1], shift=UP * 0.15), Create(h.fleche), run_time=0.3)
            sc.au_mot("5, égale", 2)
            sc.play(FadeIn(l1[2], shift=UP * 0.15), FadeIn(h.etiquette, scale=1.3), run_time=0.3)
            sc.au_mot("25.")
            sc.play(FadeIn(l1[3], scale=1.3), tb.remplir(0, 1, 25), tb.eteindre(0, 0), run_time=0.35)
            sc.au_mot("25 sur")
            sc.play(FadeIn(l2[0], shift=UP * 0.15), tb.allumer(0, 1), tb.allumer(1, 1), run_time=0.3)
            sc.au_mot("25 %")
            sc.play(FadeIn(l2[1], scale=1.3), run_time=0.35)
            sc.rep_fini()

        self.question_pause("07-question", "07b-reponse",
                            ["Un refuge a 20 animaux.", "5 sont des lapins.", "Quel pourcentage de lapins ?"],
                            [self.t("5 %", 34), self.t("25 %", 34), self.t("20 %", 34)], 1,
                            ["20 × 5 = 100.", "Alors 5 × 5 = 25.", "25 sur 100 : 25 %."], mot_q="Un refuge",
                            autres_r=apres)

    # ── 08 : défi (7 chats sur 10 animaux) ──────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(-0.4, 3.1))
        self.play(Write(tit), run_time=0.6)
        g10 = grille(1, 10, 0.6, centre=P(-0.6, 0.95))
        l1 = self.t("10 animaux", 40).next_to(g10, UP, buff=0.25)
        self.au_mot("10 animaux")
        self.play(g10.apparaitre(0.7), FadeIn(l1, shift=DOWN * 0.15))
        chats = VGroup(*[tete_chat(s=0.6).next_to(g10.liste[i], DOWN, buff=0.45) for i in range(7)])
        l2 = self.ligne([("7", C_CHAT), ("chats", WHITE)], 44).move_to(P(-0.6, -0.95))
        self.au_mot("7 sont")
        self.play(g10.colorier(range(7), couleur=C_CHAT, lag=0.08, run_time=0.8), FadeIn(l2[0], scale=1.3))
        self.au_mot("chats")
        self.play(LaggedStart(*[FadeIn(c, shift=UP * 0.15) for c in chats], lag_ratio=0.1), FadeIn(l2[1]),
                  run_time=0.6)
        self.au_mot("Quel pourcentage")
        q = self.ligne([("? %", ORANGE_RETENUE), ("de chats", WHITE)], 50).move_to(P(-0.6, -1.85))
        self.play(FadeIn(q, scale=1.2), run_time=0.4)
        self.insister(q[0], 1.25, 0.2)
        self.au_mot("Mets pause")
        p = self.t("Mets pause, et cherche !", 34, ORANGE_RETENUE).move_to(P(-0.6, -2.85))
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(1.7, 3.15))
        tb = self.table_chats(["Chats", "Animaux"], [[7, 70], [10, 100]], P(-3.3, 1.05), case=1.4, lib=2.4, fs=40)
        g = self.grille100(cote=0.3, centre=P(3.55, 0.55))
        self.play(Write(tit), FadeIn(tb.fond), FadeIn(self.donnee(tb.valeur(0, 0))),
                  FadeIn(self.donnee(tb.valeur(1, 0))), FadeIn(tb.trou(0, 1)), run_time=0.5)
        b = tb.fleche_col(0, 1, "× 10", ligne=1)
        h = self.muet(tb.fleche_col(0, 1, "× 10", ligne=0))
        x0 = -5.9
        l1 = self.ligne([("10 ×", WHITE), ("10 =", WHITE), ("100", VERT_OK)], 44).move_to(P(0, -1.6))
        l1.align_to(P(x0, 0), LEFT)
        self.au_mot("10 fois")
        self.play(FadeIn(l1[0], shift=RIGHT * 0.2), tb.allumer(1, 0), Create(b.fleche), run_time=0.35)
        self.au_mot("10, égale")
        self.play(FadeIn(l1[1], shift=RIGHT * 0.2), FadeIn(b.etiquette, scale=1.3), run_time=0.3)
        self.au_mot("100.")
        self.play(FadeIn(l1[2], scale=1.3), FadeIn(tb.valeur(1, 1), scale=1.4), tb.eteindre(1, 0),
                  g.apparaitre(0.8))
        l2 = self.ligne([("Alors", WHITE), ("7 ×", WHITE), ("10 =", WHITE), ("70", VERT_OK)], 44)
        l2.move_to(P(0, -2.35)).align_to(P(x0, 0), LEFT)
        self.au_mot("Alors")
        self.play(FadeIn(l2[0], shift=RIGHT * 0.2), tb.allumer(0, 0), run_time=0.3)
        self.au_mot("7 fois")
        self.play(FadeIn(l2[1], shift=RIGHT * 0.2), Create(h.fleche), run_time=0.3)
        self.au_mot("10, égale", 2)
        self.play(FadeIn(l2[2], shift=RIGHT * 0.2), FadeIn(h.etiquette, scale=1.3), run_time=0.3)
        self.au_mot("70.")
        self.play(FadeIn(l2[3], scale=1.3), tb.remplir(0, 1, 70), tb.eteindre(0, 0), run_time=0.35)
        l3 = self.ligne([("70 sur 100 :", WHITE), ("70 %", VERT_OK), ("de chats", VERT_OK)], 46)
        l3[1:].shift(RIGHT * 0.2)
        l3.move_to(P(0, -3.1)).align_to(P(x0, 0), LEFT)
        self.au_mot("70 sur")
        self.play(FadeIn(l3[0], shift=RIGHT * 0.2), tb.allumer(0, 1), tb.allumer(1, 1),
                  g.colorier(range(70), couleur=C_CHAT, lag=0.02, run_time=1.0))
        self.au_mot("70 %")
        self.play(FadeIn(l3[1], scale=1.3), run_time=0.35)
        self.au_mot("de chats")
        self.play(FadeIn(l3[2], shift=RIGHT * 0.2), run_time=0.3)
        self.play(Create(self.encadrer(l3[1:], VERT_OK, 0.12)), run_time=0.4)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        g = self.grille100(45, 55, cote=0.42, centre=ORIGIN)
        self.add(g)
        lignes = self.finale_colonne(figure=g, textes=[
            ("Pour cent veut dire sur 100.",),
            ("100 %, c'est le tout.",),
            ("Si le total n'est pas 100,", "on le ramène à 100", "avec un tableau", "de proportionnalité.")], fs=36)
        for t in lignes[1][1]:
            t.sans_synchro = True  # posée AU MOT « 100 % » (sinon elle attendait « tout »)
        self.au_mot("Pour cent veut")
        self.montrer_ligne(lignes[0])
        self.au_mot("100 %, c'est")
        self.montrer_ligne(lignes[1], Indicate(g.liste, color=JAUNE_TITRE, scale_factor=1.03))
        # le 3e point, morceau par morceau AU MOT (« ramène à 100 » attendait « ramène »)
        b3 = lignes[2][1]
        for t in b3[1:]:
            t.sans_synchro = True
        self.au_mot("Si le total")
        self.play(Create(lignes[2][0]), run_time=0.35)
        self.poser_lignes(VGroup(b3[0]), "fade", 0.35)
        self.au_mot("100 avec")
        self.play(FadeIn(b3[1], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("avec un")
        self.play(FadeIn(b3[2], shift=RIGHT * 0.2), run_time=0.35)
        self.au_mot("de proportionnalité")
        self.play(FadeIn(b3[3], shift=RIGHT * 0.2), run_time=0.35)
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_sur_100()
        self.ecran_reste()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_tableau()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class PropPourcentageComprendre6e(PropPourcentageComprendreBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
