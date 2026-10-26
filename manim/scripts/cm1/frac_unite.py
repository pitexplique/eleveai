# frac_unite.py
# EleveAI — Maths CM1 — série « Fractions », épisode 08 : L'UNITÉ DANS UNE
# FRACTION (micro du coach : fraction_unite, CM1 seul), AVEC VOIX. Paysage 16:9.
# CEINTURE VERTE (la notion de CM1 complète : l'unité = le tout, partager le
# tout — c'est une division —, ce qui reste, l'unité entière d/d = 1, le piège
# « 1 quart dépend de l'unité », défi corrigé).
# Short jumeau : frac_unite_short.py (la Terre et la Lune, blanche).
#
# Décor et métier : la CHORALE ; Sofia, CHEFFE DE CHORALE : 12 enfants ; 1/4 de
# la chorale devant = 12 ÷ 4 = 3 enfants ; derrière 3/4 = 9 enfants ; 4/4 = 1 ;
# 1/2 de 12 = 6 mais 1/2 de 20 = 10 ; la grande et la petite tarte ; défi : 1/3
# de 15 = 5. Aucune donnée du monde réel citée. Centres : musique.
# Vérifié (Python) : 12 ÷ 4 = 3 ; 12 − 3 = 9 = 3 × 3 ; 4/4 = 1 ; 12 ÷ 2 = 6 ;
# 20 ÷ 2 = 10 ; 15 ÷ 3 = 5.
#
# Micro → écrans (banque cm1/maths/fractions-gabarits-a.ts tpl_121-125) :
# l'unité entière (02 et 05, tpl_121 / tpl_123), partager un groupe (03,
# tpl_124 : « c'est une division »), ce qui reste (QUESTION 1, tpl_122 : leurres
# 1/4 = ce qui est pris, 4/4 = tout), unités différentes (06 + QUESTION 2,
# tpl_125 : leurre « c'est pareil »), défi (08, tpl_124).
# Écrans : 00 garde · 01 Sofia · 02 l'unité · 03 partager · 04 QUESTION 1 ·
# 05 l'unité entière · 06 le piège · 07 QUESTION 2 · 08 défi · 08b correction ·
# 09 ce que tu as appris · 10 fin.
#
# Bases : frac_cm_commun.py (PaysageCM, NON modifié) ; canvas_fractions.py ;
# décors : frac_cmj_commun.py (chorale, cheffe).
# Voix : manim/voix/cm-frac-unite.json (débit −10) ; marques : frac_unite_marques.json.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/frac_unite.py FracUniteCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/frac_unite.py FracUniteCM1 -o eleveai-maths-cm1-frac-unite --media_dir manim/scripts/cm1/media-frac-unite
# Sortie : manim/sorties/cm1/maths/fractions/08-unite/eleveai-maths-cm1-frac-unite.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from frac_cm_commun import *  # noqa: E402,F403
from frac_cmj_commun import *  # noqa: E402,F403

XF = -3.3


def en_groupes(kids, g, centre, buff_in=0.1, buff_out=0.55):
    """La place de chaque enfant quand on les range en paquets de g (colonnes) :
    renvoie (cibles, cadres) ; cibles[i] = la copie de l'enfant i à sa place."""
    cop = kids.copy()
    paquets = VGroup(*[VGroup(*cop[i:i + g]).arrange(DOWN, buff=buff_in) for i in range(0, len(cop), g)])
    paquets.arrange(RIGHT, buff=buff_out).move_to(centre)
    cadres = VGroup(*[SurroundingRectangle(p, color=AMBRE, buff=0.1, corner_radius=0.1, stroke_width=5)
                      for p in paquets])
    return cop, cadres


class FracUniteBase(PaysageCM):
    nom_voix = "cm-frac-unite"
    fichier_marques = "frac_unite_marques.json"

    def ecrans(self):
        return [self.page_de_garde, self.ecran_situation, self.ecran_unite, self.ecran_question1,
                self.ecran_entiere, self.ecran_piege, self.ecran_question2, self.ecran_defi, self.ecran_correction,
                self.ecran_finale]

    def kids12(self, centre=P(XF, 0.6)):
        return chorale(12, 6, s=1.6, buff=0.22, centre=centre)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("L'unité dans une fraction", self.identite, self.ceinture, y_ech=-2.7)
        self.au_mot("L'unité")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        f = EcritureFraction(1, 4, fs=100).move_to(P(-2.4, 0.35))
        q = self.t("de quoi ?", 64, AMBRE).next_to(f, RIGHT, buff=0.6)
        au_fil(self, [("1 quart", [f], []), ("de quoi", [q], [])])
        self.insister(q, 1.2, 0.25)
        self.attendre_voix(marge=0.8)

    # ── 01 : Sofia, cheffe de chorale ───────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        so = cheffe(1.0).move_to(P(-5.4, -1.6))
        nom = self.t("Sofia", 40, BLEU_CALCUL).next_to(so, RIGHT, buff=0.35).shift(UP * 0.6)
        met = self.t("cheffe de chorale", 30, BLEU_CALCUL).next_to(nom, DOWN, buff=0.12).align_to(nom, LEFT)
        au_fil(self, [("Voici Sofia", [so, nom], []), ("cheffe de chorale", [met], [])])
        k = self.kids12(P(-2.9, 1.5))
        l1 = self.col(self.t("12 enfants", 42), 2.2)
        au_fil(self, [("a 12", [l1], [LaggedStart(*[FadeIn(x, shift=UP * 0.2) for x in k], lag_ratio=0.06)])],
               run_time=0.9)
        f = EcritureFraction(1, 4, fs=72)
        l2 = VGroup(f, self.inline("devant", 40, AMBRE)).arrange(RIGHT, buff=0.3)
        l2[1].set_y(f.trait.get_y())
        self.col(l2, 0.8)
        au_fil(self, [("veut 1 quart", [f], []), ("devant", [l2[1]], [])])
        q = self.col(self.t("Combien d'enfants ?", 40, ORANGE_RETENUE), -0.6)
        au_fil(self, [("Combien d'enfants", [q], [])])
        self.attendre_voix()

    # ── 02-03 : l'unité, puis partager en 4 ─────────────────────────────────
    def ecran_unite(self):
        self.ecran("02-unite")
        k = self.kids12()
        self.add(k)
        cad = SurroundingRectangle(k, color=AMBRE, buff=0.25, corner_radius=0.2, stroke_width=6)
        l1 = self.col(self.t("L'unité = le tout", 42, AMBRE), 2.4)
        au_fil(self, [("L'unité, c'est le tout", [l1], [Create(cad)])])
        l2 = self.col(self.t("12 enfants", 40), 1.5)
        au_fil(self, [("les 12", [l2], [Indicate(k, color=AMBRE, scale_factor=1.03)])])
        l3 = self.col(self.t("en 4 parts égales", 40, BLEU_PART), 0.6)
        au_fil(self, [("en 4", [l3], [])])
        self.attendre_voix(marge=0.2)
        self.dire("03-partage")
        cibles, cadres = en_groupes(k, 3, P(XF, 0.3))
        c = ligne_calc(self, [("12", WHITE), ("÷", AMBRE), ("4", AMBRE), ("=", WHITE), ("3", VERT_OK)], -0.5, fs=50)
        au_fil(self, [("12 enfants", [], [FadeOut(cad), *[x.animate.move_to(cc) for x, cc in zip(k, cibles)]]),
                      ("en 4 groupes", [], [LaggedStart(*[Create(cc) for cc in cadres], lag_ratio=0.2)]),
                      ("12 divisé", [c[0]], []), ("divisé par 4", [c[1], c[2]], []),
                      ("égale 3", [c[3], c[4]], [])], run_time=0.7)
        f = EcritureFraction(1, 4, fs=60)
        r = VGroup(f, self.inline("= 3 enfants", 44, VERT_OK)).arrange(RIGHT, buff=0.3)
        r[1].set_y(f.trait.get_y())
        self.col(r, -1.9)
        au_fil(self, [("1 quart de la chorale", [f], [cadres[0].animate.set_stroke(VERT_OK, 8)]),
                      ("c'est 3 enfants", [r[1]], [VGroup(*k[0:3]).animate.shift(DOWN * 0.35)])])
        self.etat = (k, cadres)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (ce qui reste derrière) ─────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        k = self.kids12()
        cibles, cadres = en_groupes(k, 3, P(XF, 0.1))
        for x, c in zip(k, cibles):
            x.move_to(c)
        VGroup(*k[0:3], cadres[0]).shift(DOWN * 0.45)
        cadres[0].set_stroke(VERT_OK, 8)
        dev = self.inline("devant", 30, VERT_OK).next_to(cadres[0], DOWN, buff=0.15)
        self.add(k, cadres, dev)

        def apres(sc):
            sc.au_mot("4 quarts font")
            sc.play(*[c.animate.set_stroke(BLEU_PART, 8) for c in cadres[1:]], run_time=0.5)

        self.question_pause("04-question", "04b-reponse", ["1 quart est devant.", "Quelle fraction reste derrière ?"],
                            [EcritureFraction(1, 4, fs=40), EcritureFraction(3, 4, fs=40),
                             EcritureFraction(4, 4, fs=40)], 1,
                            ["4 − 1 = 3 : 3 quarts", "9 enfants derrière"], autres_r=apres)

    # ── 05 : l'unité entière (4/4 = 1) ──────────────────────────────────────
    def ecran_entiere(self):
        self.ecran("05-entiere")
        b = Barre(4, 0, largeur=5.4, hauteur=0.9, centre=P(XF, 0.9))
        self.add(b)
        f = EcritureFraction(4, 4, fs=100).move_to(P(2.2, 0.9))
        au_fil(self, [("4 quarts, c'est", [f], [b.colorier(range(4), lag=0.15)])], run_time=0.7)
        l1 = self.col(self.t("l'unité entière", 40, AMBRE), -0.6)
        au_fil(self, [("l'unité.", [l1], [Indicate(b, color=AMBRE, scale_factor=1.03)])])
        r = self.col(self.bloc(["numérateur = dénominateur", "→ on a tout"], 34, BLEU_PART), -1.35)
        sans_synchro(r)
        au_fil(self, [("Quand le numérateur", [r[0]], [Indicate(f.num, color=AMBRE), Indicate(f.den, color=AMBRE)]),
                      ("on a tout", [r[1]], [])])
        eg = self.inline("= 1", 90, VERT_OK).next_to(f, RIGHT, buff=0.35)
        eg.set_y(f.trait.get_y())
        au_fil(self, [("égale 1", [eg], [])])
        self.insister(eg, 1.2, 0.25)
        self.attendre_voix()

    # ── 06 : le piège (1 demi dépend de l'unité) ────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention au piège")
        self.titre("Attention au piège !", ROUGE_ERREUR)
        k12 = chorale(12, 6, s=1.2, buff=0.16, centre=P(XF, 1.4))
        k20 = chorale(20, 10, s=1.2, buff=0.12, centre=P(XF, -1.1))
        moit12 = SurroundingRectangle(VGroup(*k12[0:3], *k12[6:9]), color=VERT_OK, buff=0.08, stroke_width=5)
        moit20 = SurroundingRectangle(VGroup(*k20[0:5], *k20[10:15]), color=VERT_OK, buff=0.08, stroke_width=5)
        l0 = self.col(self.t("ça dépend de l'unité !", 36, AMBRE), 2.0)
        au_fil(self, [("ça dépend de l'unité", [l0], [])])
        c1 = ligne_calc(self, [("1 demi", WHITE), ("de 12", WHITE), ("= 6 enfants", VERT_OK)], 0.9, fs=38)
        au_fil(self, [(("1 demi", 2), [c1[0]], []), ("chorale de 12", [c1[1]], [FadeIn(k12)]),
                      ("c'est 6", [c1[2]], [Create(moit12)])])
        c2 = ligne_calc(self, [("1 demi", WHITE), ("de 20", WHITE), ("= 10 enfants", VERT_OK)], -0.4, fs=38)
        au_fil(self, [(("1 demi", 3), [c2[0]], []), ("chorale de 20", [c2[1]], [FadeIn(k20)]),
                      ("c'est 10", [c2[2]], [Create(moit20)])])
        self.attendre_voix()

    # ── 07 : QUESTION 2 (la grande et la petite tarte) ──────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        gr = Disque(4, 1, rayon=1.45, centre=P(-4.6, 0.0))  # deux cartes séparées, jamais collées
        pe = Disque(4, 1, rayon=0.7, centre=P(-1.5, -0.75))
        self.add(gr, pe)

        def apres(sc):
            sc.rep(0)
            sc.rep(1)
            sc.au_mot("la grande tarte donne")
            sc.play(gr.sortir(0, 0.3), Indicate(gr.parts[0], color=VERT_OK, scale_factor=1.06), run_time=0.6)
            sc.rep_fin()

        self.question_pause("07-question", "07b-reponse", ["Où est le plus", "gros quart ?"],
                            [self.inline("la grande tarte", 30), self.inline("la petite tarte", 30),
                             self.inline("c'est pareil", 30)], 0,
                            ["Des quarts tous les deux,", "mais pas la même unité !"], autres_r=apres)

    # ── 08 : défi (1 tiers de 15) ───────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("08-defi", 0.5)
        self.au_mot("À toi de jouer")
        self.titre("À toi de jouer !", fs=50)
        k = chorale(15, 5, s=1.6, buff=0.22, centre=P(XF, 0.5))
        l1 = self.col(self.t("15 enfants", 40), 2.0)
        au_fil(self, [("a 15", [l1], [LaggedStart(*[FadeIn(x, shift=UP * 0.15) for x in k], lag_ratio=0.05)])],
               run_time=0.8)
        f = EcritureFraction(1, 3, fs=64)
        l2 = VGroup(f, self.inline("joue du tambour", 36)).arrange(RIGHT, buff=0.3)
        l2[1].set_y(f.trait.get_y())
        self.col(l2, 0.9)
        au_fil(self, [("1 tiers", [f], []), ("joue du tambour", [l2[1]], [])])
        q = self.col(self.bloc(["Combien d'enfants", "jouent du tambour ?"], 38, ORANGE_RETENUE), -0.75)
        self.au_mot("Combien d'enfants")
        self.poser_lignes(q, "up", 0.3)
        self.pause_defi(y=-2.0)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        self.titre("Correction", fs=50)
        k = chorale(15, 5, s=1.6, buff=0.22, centre=P(XF, 0.6))
        self.add(k)
        cad = SurroundingRectangle(k, color=AMBRE, buff=0.22, corner_radius=0.2, stroke_width=6)
        au_fil(self, [("L'unité, c'est les 15", [], [Create(cad)])])
        cibles, cadres = en_groupes(k, 5, P(XF, 0.4), buff_out=0.7)
        self.au_mot("3 groupes égaux")
        self.play(FadeOut(cad), *[x.animate.move_to(c) for x, c in zip(k, cibles)], run_time=1.0)
        self.play(LaggedStart(*[Create(c) for c in cadres], lag_ratio=0.2), run_time=0.6)
        c = ligne_calc(self, [("15", WHITE), ("÷", AMBRE), ("3", AMBRE), ("=", WHITE), ("5", VERT_OK)], 1.6, fs=50)
        au_fil(self, [("égaux : 15", [c[0]], []), ("15 divisé par 3", [c[1], c[2]], []),
                      ("égale 5", [c[3], c[4]], [])])
        f = EcritureFraction(1, 3, fs=60)
        r = VGroup(f, self.inline("= 5 enfants", 44, VERT_OK)).arrange(RIGHT, buff=0.3)
        r[1].set_y(f.trait.get_y())
        self.col(r, 0.0)
        au_fil(self, [("1 tiers de la chorale", [f], [cadres[0].animate.set_stroke(VERT_OK, 8)]),
                      ("c'est 5 enfants", [r[1]], [])])
        self.play(Create(self.encadrer(r, buff=0.15)), run_time=0.4)
        self.attendre_voix(marge=1.6)

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        k = self.kids12(ORIGIN)
        cibles, cadres = en_groupes(k, 3, ORIGIN)
        for x, c in zip(k, cibles):
            x.move_to(c)
        cadres[0].set_stroke(VERT_OK, 8)
        fig = VGroup(k, cadres)
        self.add(fig)
        lignes = self.finale_colonne(figure=fig, textes=[("L'unité, c'est le tout.",),
                                                         ("Le dénominateur dit en combien", "de parts égales on la partage."),
                                                         ("Numérateur = dénominateur :", "l'unité entière."),
                                                         ("Un quart dépend de l'unité !",)], fs=34)
        for mot, lg in zip(["L'unité, c'est le tout.", "Le dénominateur dit", "Quand le numérateur", "Et 1 quart"],
                           lignes):
            self.au_mot(mot) if not any(ch.isdigit() for ch in mot) else self.au_nb(mot)
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.0)


class FracUniteCM1(FracUniteBase):
    identite = "Maths CM1 — EleveAI"
    ceinture = "verte"
