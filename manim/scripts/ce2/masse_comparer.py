# masse_comparer.py
# EleveAI — Maths CE2 — série « Masses » (CP → CM2), PILOTE : comparer des masses
# (micro ce2_masse_comparer, notion masse ; `aussi` → ce1 ce1_masse_comparer), AVEC VOIX.
# Paysage 16:9, CEINTURE JAUNE. Short jumeau : film Ti Margo (fromage 900 g / 1 kg).
# Décor et métier : Anaïs, FROMAGÈRE (centres : cuisine, métiers).
# Mapping micro → écrans : 02 (même unité : 300 g < 450 g), 03 (deux unités : 1 kg = 1 000 g > 900 g, balance),
# 04 question (balance 1 kg / 1 000 g), 05 piège (900 > 1 mais 1 kg = 1 000 g), 06 question (plumes / cailloux),
# 07 défi (ranger 2 kg, 1 500 g, 800 g), 07b correction, 08 ce que tu as appris.
# Voix : manim/voix/ce2-masse-comparer.json (source : masse_voix.py ; ⛔ WAV seulement après le « oui »).
# Les choix des questions et la bonne lettre viennent de masse_voix.json (même tirage que la voix).
# Marques : python manim/scripts/ce2/perimetre_marques.py masse:comparer (à brancher avec les WAV).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/masse_comparer.py MasseComparerCE2
# python -m manim render -qh --disable_caching manim/scripts/ce2/masse_comparer.py MasseComparerCE2 -o eleveai-maths-ce2-masse-comparer --media_dir manim/scripts/ce2/media-mas-03
# Sortie : manim/sorties/ce2/maths/masse/03-comparer/eleveai-maths-ce2-masse-comparer.mp4

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from masse_commun import *  # noqa: E402,F403

_V = {e["id"]: e for e in json.load(open(Path(__file__).resolve().parent / "masse_voix.json", encoding="utf-8"))}
EP = _V["ce2-masse-comparer"]
Q1, Q2 = EP["questions"]
ABR = {}  # choix courts : écrits en entier, comme la voix


def court(s):
    """Le texte d'un choix à l'écran : unités abrégées comme dans le cours (la voix dit le mot entier)."""
    for a, b in ABR.items():
        s = s.replace(a, b)
    return s[0].upper() + s[1:]


class MasseComparerBase(PaysageMasse):
    nom_voix = "ce2-masse-comparer"
    fichier_marques = "masse_comparer_marques.json"
    ceinture = "jaune"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Comparer des masses", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Comparer des masses")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q0 = self.t("Qu'est-ce qui est le plus lourd :", 38, JAUNE_TITRE)
        q1 = self.ligne([("1 kg", JAUNE_TITRE), ("ou 900 g ?", JAUNE_TITRE)], 38, buff=0.2)
        q = VGroup(q0, q1).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        q.move_to(P(0, 0.3)).align_to(P(-6.2, 0), LEFT)
        f = VGroup(meule(0.75), part_fromage(0.8)).arrange(RIGHT, buff=0.5, aligned_edge=DOWN).move_to(P(4.0, 0.35))
        self.au_mot("Qu'est-ce qui est le plus lourd")
        self.play(FadeIn(q0, shift=UP * 0.2), FadeIn(f, scale=1.1), run_time=0.35)
        self.au_mot("1 kilogramme")
        self.play(FadeIn(q1[0], shift=UP * 0.2), run_time=0.25)
        self.au_mot("ou 900")
        self.play(FadeIn(q1[1], shift=UP * 0.2), run_time=0.3)
        self.attendre_voix(marge=0.6)

    # ── 01 : Anaïs, fromagère ───────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = anais(0.95).move_to(P(-5.0, 0.2))
        nom = self.t("Anaïs", 42, FROMAGE).next_to(pe, UP, buff=0.4)
        self.au_mot("Voici Anaïs")
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Elle est fromagère")
        met = self.t("fromagère", 28, FROMAGE).next_to(pe, DOWN, buff=0.15)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        self.au_mot("Elle coupe des parts")
        l0 = self.bloc(["Elle coupe des parts de fromage", "et les pèse."], 30, GRAY_B)
        self.col(l0, 2.6, -2.6)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        a = meule(0.9).move_to(P(-1.4, -1.2))
        b = part_fromage(1.0).move_to(P(1.2, -1.2))
        self.au_mot("Un client veut le plus gros")
        l1 = self.t("Un client veut le plus gros morceau :", 32)
        self.col(l1, 1.3, -2.6)
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(a, shift=UP * 0.2), FadeIn(b, shift=UP * 0.2), run_time=0.45)
        self.au_mot("1 kilogramme, ou")
        ea = self.etiquette(a, "1 kg", 32, audit=True)
        self.play(FadeIn(ea, scale=1.2), run_time=0.3)
        self.au_mot("900 grammes")
        eb = self.etiquette(b, "900 g", 32, audit=True)
        self.play(FadeIn(eb, scale=1.2), Wiggle(VGroup(a, b)), run_time=0.5)
        self.attendre_voix()

    # ── 02 : même unité ─────────────────────────────────────────────────────
    def ecran_meme_unite(self):
        self.ecran("02-meme-unite")
        b = Balance(3.4).move_to(P(-4.2, 0.0))
        pa, pb = part_fromage(0.6), part_fromage(0.8)
        b.poser(pa, "g")
        b.poser(pb, "d")
        self.add(b)
        self.au_mot("la même unité")
        XP = -0.9
        l0 = self.t("Même unité : c'est facile !", 36, JAUNE_TITRE)
        self.col(l0, 2.4, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        self.au_mot("part de 300")
        ea = self.etiquette_plateau(b, "g", "300 g", audit=True)
        self.play(FadeIn(pa, shift=DOWN * 0.3), FadeIn(ea), run_time=0.35)
        self.au_mot("autre de 450")
        eb = self.etiquette_plateau(b, "d", "450 g", audit=True)
        self.play(FadeIn(pb, shift=DOWN * 0.3), FadeIn(eb), run_time=0.25)
        l1 = self.ligne([("450", BLEU_D), ("est plus grand que", WHITE), ("300", BLEU_D)], 38, buff=0.2)
        self.col(l1, 1.1, XP)
        for m in l1:
            hors_audit(m)  # nombres déjà dits par les étiquettes
        self.aux_extraits([VGroup(l1[0], l1[1]), l1[2]], [("grammes. 450", 1), ("que 300", 1)])
        basculer(self, b, -0.5, [pa, ea], [pb, eb], run_time=0.5)
        self.au_mot("La part de 450")
        l2 = self.ligne([("La part de", WHITE), ("450 g", VERT_OK)], 36, buff=0.2)
        self.col(l2, -0.1, XP)
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("est la plus lourde")
        res = self.gros("est la plus lourde.", fs=42)
        self.col(res, -1.0, XP)
        self.play(FadeIn(res, scale=1.2), Indicate(pb, color=VERT_OK, scale_factor=1.1), run_time=0.5)
        self.attendre_voix()

    # ── 03 : deux unités : d'abord la même unité ────────────────────────────
    def ecran_convertir(self):
        self.ecran("03-convertir")
        b = Balance(3.6).move_to(P(-4.1, -0.2))
        a, c = meule(0.6), part_fromage(0.75)
        b.poser(a, "g")
        b.poser(c, "d")
        ea = self.etiquette_plateau(b, "g", "1 kg")
        ec = self.etiquette_plateau(b, "d", "900 g")
        self.add(b, a, c, ea, ec)
        XP = -0.9
        self.au_mot("Avec deux unités")
        l0 = self.t("Deux unités différentes :", 34, JAUNE_TITRE)
        self.col(l0, 2.7, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        self.au_mot("d'abord la même unité")
        l1 = self.t("d'abord la même unité.", 34, ORANGE_RETENUE)
        self.col(l1, 2.05, XP)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        l2 = self.ligne([("1 kg", BLEU_D), ("= 1 000 g", VERT_OK)], 42, buff=0.3)
        self.col(l2, 1.15, XP)
        hors_audit(l2[1])  # « 1 000 » : posé à son mot
        self.au_mot("1 kilogramme, c'est")
        self.play(FadeIn(l2[0], shift=UP * 0.1), Indicate(ea, color=JAUNE_TITRE), run_time=0.3)
        self.au_mot("1 000 grammes")
        e1000 = hors_audit(Text("1 000 g", font_size=26, color=VERT_OK, weight=BOLD).move_to(ea))
        self.play(FadeIn(l2[1], shift=UP * 0.1), Transform(ea, e1000), run_time=0.4)
        l3 = self.ligne([("On compare", WHITE), ("1 000", BLEU_D), ("et", WHITE), ("900", BLEU_D)], 36, buff=0.18)
        self.col(l3, 0.2, XP)
        hors_audit(l3[1])
        self.au_mot("On compare 1 000")
        self.play(FadeIn(l3[:2], shift=UP * 0.1), run_time=0.25)
        self.au_mot("et 900")
        self.play(FadeIn(l3[2:], shift=UP * 0.1), run_time=0.25)
        l4 = self.ligne([("1 000", VERT_OK), ("est plus grand.", WHITE)], 36, buff=0.2)
        hors_audit(l4[0])
        self.col(l4, -0.65, XP)
        self.au_mot("1 000 est plus grand")
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.3)
        basculer(self, b, 0.5, [a, ea], [c, ec])
        self.au_mot("Le morceau de 1 kilogramme")
        res = self.bloc(["Le morceau de 1 kg", "est le plus lourd !"], 40, VERT_OK)
        self.col(res, -2.0, XP)
        self.play(FadeIn(res, scale=1.1), Indicate(a, color=VERT_OK, scale_factor=1.1), run_time=0.5)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (balance 1 kg / 1 000 g) ────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        b = Balance(3.0, s=0.8).move_to(P(-3.9, 1.3))
        m1 = b.poser(paquet("1 kg", 0.8, "#f59e0b"), "g")
        m2 = b.poser(VGroup(masse_marquee("500 g", 0.75), masse_marquee("500 g", 0.75)).arrange(RIGHT, buff=0.05),
                     "d")
        fig = VGroup(b, m1, m2)

        def autres_q(sc):
            sc.play(FadeIn(fig), run_time=0.35)

        def apres(sc):
            sc.play(Indicate(fig, color=VERT_OK, scale_factor=1.04), run_time=0.2)

        self.question_gauche("04-question", "04b-reponse",
                             ["Balance à deux plateaux :", "1 kg d'un côté, 1 000 g de l'autre.",
                              "Que se passe-t-il ?"],
                             [self.choix(court(c), fs=24) for c in Q1["choix"]], Q1["reponse"],  # même taille pour les 3
                             ["1 kg = 1 000 g.", "Même masse : les plateaux", "restent au même niveau."],
                             -0.75, q_sans_audit=(1,), mot_q="Balance à deux plateaux", autres_q=autres_q, autres_r=apres)

    # ── 05 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("05-piege")
        self.au_mot("Attention au piège")
        tit = self.t("Attention au piège !", 44, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.0)
        self.play(Write(tit), run_time=0.4)
        n = self.ligne([("900", ROUGE_ERREUR), (">", WHITE), ("1", ROUGE_ERREUR)], 64, buff=0.4)
        n.move_to(P(-3.4, 1.3))
        self.aux_extraits([VGroup(n[0], n[1]), n[2]], ["900 est plus grand", ("que 1", 1, 0.15)], run_time=0.2)
        self.au_mot("Mais 1 kilogramme")
        barre = Line(n.get_corner(DL), n.get_corner(UR), color=ROUGE_ERREUR, stroke_width=8)
        vrai = self.ligne([("1 kg", BLEU_D), ("=", WHITE), ("1 000 g", VERT_OK)], 48, buff=0.3).move_to(P(-3.4, -0.1))
        hors_audit(vrai[2])  # « 1 000 » : posé à son mot
        self.play(Create(barre), FadeIn(vrai[0], shift=UP * 0.2), run_time=0.3)
        self.au_mot("c'est 1 000 grammes")
        self.play(FadeIn(vrai[1:], shift=UP * 0.2), run_time=0.3)
        self.insister(vrai, 1.15, 0.25)
        self.au_mot("On compare les nombres seulement")
        res = self.bloc(["On compare les nombres", "seulement avec", "la même unité."], 36, JAUNE_TITRE)
        self.col(res, 0.4, 1.2)
        self.play(FadeIn(res, scale=1.1), run_time=0.45)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (plumes / cailloux) ─────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        b = Balance(3.0, s=0.8).move_to(P(-3.9, 1.2))
        pl = b.poser(plumes(0.55), "g")
        ca = b.poser(cailloux(0.6), "d")
        ep = self.etiquette_plateau(b, "g", "1 kg", 22)
        ec = self.etiquette_plateau(b, "d", "1 kg", 22)
        fig = VGroup(b, pl, ca, ep, ec)

        def autres_q(sc):
            sc.play(FadeIn(fig), run_time=0.35)

        def apres(sc):
            sc.play(Indicate(VGroup(pl, ca), color=VERT_OK, scale_factor=1.06), run_time=0.2)

        self.question_gauche("06-question", "06b-reponse",
                             ["Le plus lourd :", "1 kg de plumes,", "ou 1 kg de cailloux ?"],
                             [self.choix(court(c)) for c in Q2["choix"]], Q2["reponse"],
                             ["1 kg, c'est 1 kg !", "Les plumes prennent", "plus de place,",
                              "même masse."],
                             -0.75, q_sans_audit=(1, 2), mot_q="Qu'est-ce qui est le plus lourd", autres_q=autres_q, autres_r=apres)

    # ── 07 : le défi (ranger 3 fromages) ────────────────────────────────────
    def trois(self):
        f = [meule(0.85), meule(0.7, "#fde68a"), part_fromage(0.75)]
        return VGroup(*f).arrange(RIGHT, buff=0.6, aligned_edge=DOWN)

    def ecran_defi(self):
        self.ecran("07-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        g = self.trois().move_to(P(-3.8, 0.6))
        self.au_mot("Anaïs range trois fromages")
        l0 = self.t("Anaïs range trois fromages,", 34)
        gauche(l0, -0.9, 2.0)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(g, shift=UP * 0.2), run_time=0.4)
        self.au_mot("du plus léger au plus lourd")
        l1 = self.t("du plus léger au plus lourd :", 32, GRAY_B)
        gauche(l1, -0.9, 1.2)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        for f_, s, ex in zip(g, ["2 kg", "1 500 g", "800 g"], ["2 kilogrammes", "1 500", "et 800"]):
            self.au_mot(ex)
            self.play(FadeIn(self.etiquette(f_, s, 28), scale=1.2), run_time=0.25)  # posée à son mot
        self.au_mot("Dans quel ordre")
        q = self.t("Dans quel ordre ?", 40, JAUNE_TITRE)
        gauche(q, -0.9, 0.0)
        self.play(FadeIn(q, shift=UP * 0.1), Wiggle(g), run_time=0.5)
        self.pause_defi(y=-2.2)

    def ecran_correction(self):
        self.ecran("07b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        g = self.trois().move_to(P(-3.8, 1.0))
        ets = VGroup(*[self.etiquette(f_, s, 28) for f_, s in zip(g, ["2 kg", "1 500 g", "800 g"])])
        self.add(g, ets)
        XP = -0.9
        self.au_mot("tout en grammes")
        l0 = self.t("On met tout en grammes :", 34, ORANGE_RETENUE)
        self.col(l0, 2.3, XP)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        a = self.ligne([("2 kg", BLEU_D), ("= 2 000 g", VERT_OK)], 40, buff=0.3)
        self.col(a, 1.4, XP)
        hors_audit(a[1])
        self.aux_extraits([a[0], a[1]], ["2 kilogrammes, c'est", "2 000 grammes"])
        self.play(Transform(ets[0], hors_audit(Text("2 000 g", font_size=28, color=VERT_OK, weight=BOLD)
                                                .move_to(ets[0]))), run_time=0.4)
        self.au_mot("Du plus léger au plus lourd")
        l1 = self.t("Du plus léger au plus lourd :", 34, JAUNE_TITRE)
        self.col(l1, 0.4, XP)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        cible = VGroup(VGroup(g[2], ets[2]), VGroup(g[1], ets[1]), VGroup(g[0], ets[0]))
        xs = [g[0].get_x(), g[1].get_x(), g[2].get_x()]
        self.play(*[c.animate.set_x(x) for c, x in zip(cible, xs)], run_time=0.6)
        ordre = self.ligne([("800 g", VERT_OK), ("<", WHITE), ("1 500 g", VERT_OK), ("<", WHITE), ("2 kg", VERT_OK)],
                           44, buff=0.25)
        self.col(ordre, -0.6, XP)
        for m in ordre:
            hors_audit(m)  # nombres déjà dits : posés à leur extrait
        self.aux_extraits([ordre[0], VGroup(ordre[1], ordre[2]), VGroup(ordre[3], ordre[4])],
                          [("lourd : 800", 1, 0.2), ("puis 1 500", 1, 0.2), ("puis 2", 1, 0.2)])
        self.insister(ordre, 1.1, 0.25)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.65)
        b = Balance(3.0, penche=0.4, s=0.8)
        fig = VGroup(b, b.poser(meule(0.5), "g"), b.poser(part_fromage(0.6), "d"))
        lignes = self.finale_gauche(fig, textes=[
            ("Pour comparer :", "d'abord la même unité,"),
            ("puis on compare", "les nombres."),
            ("La taille ne dit pas", "la masse.")], fs=34)
        self.add(fig)
        self.au_mot("Pour comparer des masses")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("puis on compare")
        self.montrer_ligne(lignes[1])
        self.au_mot("Et la taille")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_meme_unite()
        self.ecran_convertir()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")


class MasseComparerCE2(MasseComparerBase):
    identite = "Maths CE2 — EleveAI"
    ceinture = "jaune"
