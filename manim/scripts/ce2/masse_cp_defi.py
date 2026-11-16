# masse_cp_defi.py
# EleveAI — Maths CP — série « Masses » (CP → CM2), ÉPISODE CP 04 : le défi des masses
# (micro cp_masse_contenance_defi, notion masse_contenance), AVEC VOIX.
# Paysage 16:9, CEINTURE BLANCHE. Short jumeau : film Ti Margo (trois cadeaux de la même taille).
# Décor et métier : Noé, LIVREUR À VÉLO (centres : sport, transports).
# Mapping micro → écrans : 02 + 03 (deux pesées sur le même écran : rouge > bleu, bleu > vert),
# 04 question (le plus léger : le vert), 05 (le rang, du plus lourd au plus léger),
# 06 question (sac de plumes, sac de billes : même taille, pas même masse), 07 défi (pomme, prune, cerise),
# 07b correction, 08 ce que tu as appris.
# Voix : manim/voix/cp-masse-defi.json (source : masse_voix.py, validée le 16/11).
# Marques : python manim/scripts/ce2/perimetre_marques.py masse:defi:cp
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/masse_cp_defi.py MasseDefiCP
# Sortie : manim/sorties/cp/maths/masse/04-defi/eleveai-maths-cp-masse-defi.mp4

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from masse_commun import *  # noqa: E402,F403
from masse_cp_estimer import MasseEstimerCPBase, court, meme_ligne  # noqa: E402

_V = {e["id"]: e for e in json.load(open(Path(__file__).resolve().parent / "masse_voix.json", encoding="utf-8"))}
EP = _V["cp-masse-defi"]
Q1, Q2 = EP["questions"]
JAUNE_GILET = "#facc15"
ROUGE, BLEU_C, VERT_C = "#ef4444", "#3b82f6", "#22c55e"


class MasseDefiCPBase(MasseEstimerCPBase):
    """Même socle que CP 03 (questions à choix de même taille, cartes élargies : _disposer_q)."""
    nom_voix = "cp-masse-defi"
    fichier_marques = "masse_cp_defi_marques.json"
    ceinture = "blanche"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Le défi des masses", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Le défi des masses")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q0 = self.t("Trois colis :", 40, JAUNE_TITRE)
        q1 = self.t("lequel est le plus lourd ?", 40, JAUNE_TITRE)
        q = VGroup(q0, q1).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        f = VGroup(colis(ROUGE, 0.85), colis(BLEU_C, 0.85), colis(VERT_C, 0.85)).arrange(RIGHT, buff=0.3)
        f.move_to(P(4.1, 0.35))
        self.au_mot("Trois colis")
        self.play(FadeIn(q0, shift=UP * 0.2), LaggedStart(*[FadeIn(x, scale=1.1) for x in f], lag_ratio=0.25),
                  run_time=0.6)
        self.au_mot("lequel est le plus lourd")
        self.play(FadeIn(q1, shift=UP * 0.2), run_time=0.35)
        self.attendre_voix(marge=0.6)

    # ── 01 : Noé, livreur à vélo ────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = noe(0.95).move_to(P(-5.2, 0.4))
        nom = self.t("Noé", 42, JAUNE_GILET).next_to(pe, UP, buff=0.4)
        self.au_mot("Voici Noé")
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Il est livreur à vélo")
        met = self.t("livreur à vélo", 30, JAUNE_GILET).next_to(pe, DOWN, buff=0.15)
        v = velo_livreur(1.05).move_to(P(-2.4, 0.0))
        self.play(FadeIn(met, shift=DOWN * 0.1), FadeIn(v, shift=RIGHT * 0.4), run_time=0.45)
        self.au_mot("Il a trois colis")
        l0 = self.t("Il a trois colis :", 34, GRAY_B)
        self.col(l0, 2.6, 0.2)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        Y = 0.9
        cs = [colis(c_, 1.0).move_to(P(x, Y)) for c_, x in ((ROUGE, 1.0), (BLEU_C, 2.9), (VERT_C, 4.8))]
        noms = [self.t(n, 28).next_to(c_, DOWN, buff=0.2) for n, c_ in zip(("le rouge", "le bleu", "le vert"), cs)]
        meme_ligne(noms, noms[0][0].get_bottom()[1])
        for c_, n, mot in zip(cs, noms, ("le rouge", "le bleu", "le vert")):
            self.au_mot(mot)
            self.play(FadeIn(c_, shift=DOWN * 0.3), FadeIn(n), run_time=0.35)
        self.au_mot("Lequel est le plus lourd")
        q = self.t("Lequel est le plus lourd ?", 34, JAUNE_TITRE)
        self.col(q, -1.2, 0.2)
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.35)
        self.attendre_voix()

    # ── 02 + 03 : les deux pesées, côte à côte ──────────────────────────────
    def pesee(self, x, cg, cd, cle_tit, tit_txt, mot_descend, lignes, mot_ligne):
        b = Balance(4.5).move_to(P(x, 0.5))
        g, d = b.poser(colis(cg, 0.75), "g"), b.poser(colis(cd, 0.75), "d")
        self.au_mot(cle_tit)
        tit = self.t(tit_txt, 36, JAUNE_TITRE).move_to(P(x, 3.0))
        self.play(Write(tit), FadeIn(b), FadeIn(g, shift=DOWN * 0.3), FadeIn(d, shift=DOWN * 0.3), run_time=0.5)
        self.au_mot(mot_descend)
        basculer(self, b, 0.5, [g], [d], run_time=0.8)  # la GAUCHE descend
        l0 = self.t(lignes[0], 30, LOURD).move_to(P(x, -1.35))
        self.play(FadeIn(l0, shift=UP * 0.1), Indicate(g, color=LOURD, scale_factor=1.15), run_time=0.4)
        self.au_mot(mot_ligne)
        l1 = self.t(lignes[1], 30, LOURD).next_to(l0, DOWN, buff=0.18)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        return VGroup(tit, b, g, d, l0, l1)

    def ecran_pesees(self):
        self.ecran("02-pesee1")
        self.pesee(-3.5, ROUGE, BLEU_C, "Première pesée", "Première pesée", "Le rouge descend",
                   ["Le rouge descend.", "Il est plus lourd que le bleu."], "Il est plus lourd que le bleu")
        self.attendre_voix()
        self.dire("03-pesee2")  # même écran : la deuxième pesée vient à côté de la première
        self.pesee(3.3, BLEU_C, VERT_C, "Deuxième pesée", "Deuxième pesée", "Le bleu descend",
                   ["Le bleu descend.", "Il est plus lourd que le vert."], "Il est plus lourd que le vert")
        self.attendre_voix()

    # ── 04 : QUESTION 1 (le plus léger) ─────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        ba = Balance(2.4, penche=0.5, s=0.72).move_to(P(-4.95, 2.05))
        bb = Balance(2.4, penche=0.5, s=0.72).move_to(P(-2.75, 0.45))
        R, B1 = ba.poser(colis(ROUGE, 0.6), "g"), ba.poser(colis(BLEU_C, 0.6), "d")
        B2, V = bb.poser(colis(BLEU_C, 0.6), "g"), bb.poser(colis(VERT_C, 0.6), "d")
        fig = VGroup(ba, R, B1, bb, B2, V)

        def autres_q(sc):
            sc.play(FadeIn(fig), run_time=0.35)

        def apres(sc):
            sc.play(Indicate(V, color=VERT_OK, scale_factor=1.3), run_time=0.4)

        self.question_gauche("04-question", "04b-reponse",
                             ["Quel colis est le plus léger ?"],
                             [self.choix(court(c), fs=26) for c in Q1["choix"]], Q1["reponse"],
                             ["Le rouge bat le bleu,", "le bleu bat le vert.", "Le vert est le plus léger."],
                             -1.05, mot_q="Quel colis", avant_q=autres_q, autres_r=apres)

    # ── 05 : le rang, du plus lourd au plus léger ───────────────────────────
    def ecran_rang(self):
        self.ecran("05-rang")
        self.au_mot("Du plus lourd au plus léger")
        tit = self.t("Du plus lourd au plus léger", 40, JAUNE_TITRE).move_to(P(0, 3.0))
        fl = Arrow(P(-5.4, 1.9), P(5.4, 1.9), color=ORANGE_RETENUE, stroke_width=8, buff=0)
        e0 = self.t("plus lourd", 28, LOURD).next_to(fl.get_start(), DOWN, buff=0.15).align_to(fl, LEFT)
        e1 = self.t("plus léger", 28, LEGER).next_to(fl.get_end(), DOWN, buff=0.15).align_to(fl, RIGHT)
        self.play(Write(tit), GrowArrow(fl), FadeIn(e0), FadeIn(e1), run_time=0.6)
        Y = 0.0
        cs = [colis(c_, 1.1).move_to(P(x, Y)) for c_, x in ((ROUGE, -4.0), (BLEU_C, -0.2), (VERT_C, 3.6))]
        for k, (c_, n) in enumerate(zip(cs, ("le rouge", "le bleu", "le vert"))):
            self.au_mot(n)
            num = self.t(str(k + 1), 44, JAUNE_TITRE).move_to(P(c_.get_center()[0], 1.0))
            hors_audit(num)
            et = meme_ligne([self.t(n, 30).move_to(P(c_.get_center()[0], 0))], Y - 1.0)[0]
            self.play(FadeIn(c_, shift=RIGHT * 0.3), FadeIn(num, scale=1.2), FadeIn(et), run_time=0.4)
        self.au_mot("Le rouge est le plus lourd")
        l = self.t("Le rouge est le plus lourd !", 34, LOURD).move_to(P(-0.4, -2.1))
        self.play(FadeIn(l, shift=UP * 0.1), run_time=0.35)
        self.insister(cs[0], 1.2, 0.3)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (sac de plumes, sac de billes) ──────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        sp, sb = sac_plein("plumes", 1.0), sac_plein("billes", 1.0)
        sp.move_to(P(-5.6, 1.45))
        sb.move_to(P(-3.95, 1.45))

        def avant_q(sc):  # les deux sacs, dès « Un sac de plumes » (sans étiquette : la question les nomme)
            sc.play(LaggedStart(FadeIn(sp, shift=UP * 0.2), FadeIn(sb, shift=UP * 0.2), lag_ratio=0.4), run_time=0.5)

        def apres(sc):
            sc.play(Indicate(sb, color=VERT_OK, scale_factor=1.25), run_time=0.4)

        self.fs_choix, self.decal_q, self.elargir_q = 24, 3.3, 2.1  # choix longs : 24 pour les trois, colonne plus à gauche, cartes élargies
        self.question_gauche("06-question", "06b-reponse",
                             ["Un sac de plumes,", "un sac de billes.", "Même taille.", "Pèsent-ils pareil ?"],
                             [self.choix(court(c), fs=26) for c in Q2["choix"]], Q2["reponse"],
                             ["Même taille, mais", "pas même masse.", "Les billes sont", "bien plus lourdes."],
                             0.3, mot_q="Un sac de plumes", avant_q=avant_q, autres_r=apres)
        self.fs_choix, self.decal_q, self.elargir_q = 26, 1.8, 1.2

    # ── 07 : le défi (pomme, prune, cerise) ─────────────────────────────────
    def ecran_defi(self):
        self.ecran("07-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        Y = 1.45
        po, pr, ce = pomme(1.5), prune(1.5), cerise(1.6)
        for o, x in ((po, -4.6), (pr, -2.6), (ce, -0.8)):
            o.move_to(P(x, Y)).align_to(P(0, Y - 0.45), DOWN)
        self.au_mot("La pomme est plus lourde que la prune")
        l0 = self.t("La pomme est plus lourde que la prune.", 32)
        gauche(l0, -6.0, 0.35)
        self.play(FadeIn(po, scale=1.1), FadeIn(pr, scale=1.1), FadeIn(l0, shift=UP * 0.1), run_time=0.45)
        self.au_mot("La prune est plus lourde que la cerise")
        l1 = self.t("La prune est plus lourde que la cerise.", 32)
        gauche(l1, -6.0, -0.25)
        self.play(FadeIn(ce, scale=1.1), FadeIn(l1, shift=UP * 0.1), run_time=0.45)
        self.au_mot("Quel fruit est le plus léger")
        q = self.t("Quel fruit est le plus léger ?", 36, JAUNE_TITRE)
        gauche(q, -6.0, -0.9)
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Mets pause")  # à gauche, sous la question : loin de Ti Margo
        p = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE)
        gauche(p, -6.0, -1.65)
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("07b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        fl = Arrow(P(-5.4, 1.9), P(3.0, 1.9), color=ORANGE_RETENUE, stroke_width=8, buff=0)
        e0 = self.t("plus léger", 28, LEGER).next_to(fl.get_start(), DOWN, buff=0.15).align_to(fl, LEFT)
        e1 = self.t("plus lourd", 28, LOURD).next_to(fl.get_end(), DOWN, buff=0.15).align_to(fl, RIGHT)
        for m in (e0, e1):
            hors_audit(m)  # les repères de la flèche, lus comme une figure (la voix dit « plus légère » plus tard)
        self.play(GrowArrow(fl), FadeIn(e0), FadeIn(e1), run_time=0.4)
        Y = 0.2
        rang = [(cerise(1.6), "la cerise", -4.3, "La cerise est plus légère"),
                (prune(1.5), "la prune", -1.4, "que la prune"),
                (pomme(1.5), "la pomme", 1.8, "que la pomme")]
        objs = []
        for o, n, x, mot in rang:
            o.move_to(P(x, Y)).align_to(P(0, Y - 0.45), DOWN)
            self.au_mot(mot)
            et = meme_ligne([self.t(n, 30, VERT_OK).move_to(P(x, 0))], Y - 0.95)[0]
            self.play(FadeIn(o, shift=RIGHT * 0.3), FadeIn(et), run_time=0.3)
            objs.append(o)
        self.au_mot("La cerise est la plus légère")
        l = self.t("La cerise est la plus légère.", 34, VERT_OK).move_to(P(-1.2, -1.75))
        self.play(FadeIn(l, shift=UP * 0.1), run_time=0.35)
        self.insister(objs[0], 1.25, 0.3)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.65)
        b = Balance(3.0, penche=0.5, s=0.8)
        fig = VGroup(b, b.poser(colis(ROUGE, 0.5), "g"), b.poser(colis(BLEU_C, 0.5), "d"))
        lignes = self.finale_gauche(fig, textes=[
            ("Avec deux pesées,", "on range trois objets."),
            ("Et la taille ne dit pas", "la masse.")], fs=36)
        self.add(fig)
        self.au_mot("Avec deux pesées")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("Et la taille ne dit pas la masse")
        self.montrer_ligne(lignes[1])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_pesees()
        self.ecran_question1()
        self.ecran_rang()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")


class MasseDefiCP(MasseDefiCPBase):
    identite = "Maths CP — EleveAI"
    ceinture = "blanche"
