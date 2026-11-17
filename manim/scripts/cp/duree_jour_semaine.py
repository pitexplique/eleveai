# duree_jour_semaine.py
# EleveAI — Maths CP — série « Durées » (CP → 6e) : LES MOMENTS DE LA JOURNÉE
# (micro cp_duree_jour_semaine, notion duree), AVEC VOIX. Paysage 16:9, CEINTURE BLANCHE.
# Décor et métier : Malo, MAÎTRE-NAGEUR (il ouvre la piscine le matin, il la ferme le soir).
# Mapping micro → écrans : 02 (les moments : matin, midi, après-midi, soir), 03 (une heure revient 2 fois par jour),
# 04 (on pense à ce qu'on fait), 06 (piège : le nombre seul ne suffit pas),
# questions 05 (midi : on déjeune, B) et 07 (le goûter à 4 heures : l'après-midi, A), défi 08 (« je me lève à 7 heures du soir »).
# Voix : manim/voix/cp-duree-jour-semaine.json (validée le 17/11, Julie, débit −6) ;
# marques : duree_jour_semaine_marques.json (python manim/scripts/cp/duree_marques.py jour-semaine).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cp/duree_jour_semaine.py DureeJourSemaineCP
# python -m manim render -qh --disable_caching manim/scripts/cp/duree_jour_semaine.py DureeJourSemaineCP -o eleveai-maths-cp-duree-jour-semaine --media_dir manim/scripts/cp/media-duree-jour-semaine
# Sortie : manim/sorties/cp/maths/duree/03-jour-semaine/eleveai-maths-cp-duree-jour-semaine.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from duree_cp_commun import *  # noqa: E402,F403

JOUR = "#7dd3fc"     # le matin, le jour (bleu ciel)
SOIR = "#a5b4fc"     # le soir, la nuit (bleu lavande)


def carte(w, h, couleur, op=0.22):
    return RoundedRectangle(width=w, height=h, corner_radius=0.2, fill_color=couleur, fill_opacity=op,
                            stroke_color=couleur, stroke_width=3)


class DureeJourSemaineBase(PaysageDureeCP):
    nom_voix = "cp-duree-jour-semaine"
    fichier_marques = "duree_jour_semaine_marques.json"
    ceinture = "blanche"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Les moments de la journée", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Les moments")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q0 = self.ligne([("7 heures,", JAUNE_TITRE), ("c'est le matin", JOUR)], 38, buff=0.2)
        q1 = self.ligne([("ou le soir ?", SOIR)], 38)
        q = VGroup(q0, q1).arrange(DOWN, aligned_edge=LEFT, buff=0.3)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        hg = hl(0.95, 7, 0).move_to(P(4.4, 0.25))
        so = soleil(0.7).move_to(P(2.85, 1.35))
        lu = lune(0.9).move_to(P(5.95, 1.35))
        self.au_mot("7 heures")
        self.play(FadeIn(q0[0], shift=UP * 0.2), FadeIn(hg, scale=0.8), run_time=0.4)
        self.au_mot("c'est le matin")
        self.play(FadeIn(q0[1], shift=UP * 0.1), FadeIn(so, scale=0.6), run_time=0.4)
        self.au_mot("ou le soir")
        self.play(FadeIn(q1, shift=UP * 0.1), FadeIn(lu, scale=0.6), run_time=0.4)
        self.attendre_voix(marge=0.6)

    # ── 01 : Malo, maître-nageur ────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = malo(0.95).move_to(P(-4.85, -0.2))
        self.au_mot("Voici Malo")
        nom = self.t("Malo", 42, JAUNE_TITRE).next_to(pe, UP, buff=0.75)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Il est maître-nageur")
        met = self.t("maître-nageur", 28, JAUNE_TITRE).next_to(pe, DOWN, buff=0.12)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        XL = -2.9
        pi = piscine(4.8, 1.5).move_to(P(1.4, -1.45))
        l0 = gauche(self.t("Il surveille la piscine.", 36), XL, 2.95)
        self.au_mot("Il surveille")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(pi, shift=UP * 0.3), run_time=0.45)
        so = soleil(0.55).move_to(P(XL + 0.3, 1.95))
        l1 = gauche(self.ligne([("Le matin,", JOUR), ("il ouvre la piscine.", WHITE)], 36, buff=0.2), XL + 0.85, 1.95)
        ouv = hors_audit(panneau("OUVERT", "#16a34a", 0.9)).next_to(pi, RIGHT, buff=0.25).align_to(pi, DOWN)
        self.au_mot("Le matin")
        self.play(FadeIn(so, scale=0.6), FadeIn(l1[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("il ouvre")
        self.play(FadeIn(l1[1], shift=UP * 0.1), FadeIn(ouv, shift=UP * 0.2), run_time=0.4)
        lu = lune(0.7).move_to(P(XL + 0.3, 0.85))
        l2 = gauche(self.ligne([("Le soir,", SOIR), ("il la ferme.", WHITE)], 36, buff=0.2), XL + 0.85, 0.85)
        fer = hors_audit(panneau("FERMÉ", "#dc2626", 0.9)).move_to(ouv, aligned_edge=DOWN)
        nuit = pi[0].copy().set_fill("#0f172a", 0.55).set_stroke(width=0)
        self.au_mot("Le soir")
        self.play(FadeIn(lu, scale=0.6), FadeIn(l2[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("il la ferme")
        self.play(FadeIn(l2[1], shift=UP * 0.1), ReplacementTransform(ouv, fer), FadeIn(nuit), run_time=0.5)
        self.attendre_voix()

    # ── 02 : les moments de la journée ──────────────────────────────────────
    def ecran_journee(self):
        self.ecran("02-journee")
        tit = self.t("Une journée", 46, JAUNE_TITRE).move_to(P(0, 3.15))
        self.au_mot("Une journée")
        self.play(FadeIn(tit, shift=UP * 0.15), run_time=0.35)
        moments = [
            ("Le matin", "le matin", JOUR, soleil(0.6), (0.0, -0.25), ["se lever,", "aller à l'école"], "Le matin"),
            ("Midi", "midi", "#facc15", soleil(0.6), (0.0, 0.1), ["déjeuner"], "À midi"),
            ("L'après-midi", "l'après-midi", "#fb923c", soleil(0.6), (0.0, -0.05), ["le goûter"], "L'après-midi"),
            ("Le soir", "le soir", SOIR, lune(0.85), (0.0, 0.05), ["dîner,", "se coucher"], "Le soir"),
        ]
        dessins = [None, assiette(0.7), gouter(0.85), lit(0.7)]
        for k, (nom, _, coul, astre, dxy, act, mot) in enumerate(moments):
            x = -4.65 + 3.1 * k
            c = carte(2.9, 4.2, coul).move_to(P(x, -0.1))
            n = self.t(nom, 30, coul).move_to(P(x, 1.5))
            astre.move_to(P(x + dxy[0], 0.6 + dxy[1]))
            grp = VGroup(c, n, astre)
            if dessins[k] is not None:
                dessins[k].move_to(P(x, -0.55))
                grp.add(dessins[k])
            a = VGroup(*[self.t(s, 26) for s in act]).arrange(DOWN, buff=0.1).move_to(P(x, -1.6 + (0.15 if len(act) == 1 else 0)))
            grp.add(a)
            self.au_mot(mot)
            self.play(FadeIn(grp, shift=UP * 0.2), run_time=0.45)
        self.attendre_voix()

    # ── 03 : une heure revient 2 fois par jour ──────────────────────────────
    def deux_horloges(self, h, y=-0.1, r=1.15):
        cg = carte(5.2, 4.6, JOUR, 0.16).move_to(P(-3.0, y))
        cd = carte(5.2, 4.6, SOIR, 0.16).move_to(P(3.0, y)).set_fill("#1e1b4b", 0.7)
        hg = hl(r, h, 0).move_to(P(-3.0, y + 0.45))
        hd = hl(r, h, 0).move_to(P(3.0, y + 0.45))
        so = soleil(0.55).move_to(P(-1.05, y + 1.7))
        lu = lune(0.75).move_to(P(4.95, y + 1.7))
        return cg, cd, hg, hd, so, lu

    def ecran_deux_fois(self):
        self.ecran("03-deux-fois")
        l0 = self.ligne([("Une heure revient", WHITE), ("2 fois", JAUNE_TITRE), ("par jour.", WHITE)], 42, buff=0.2)
        l0.move_to(P(0, 3.1))
        self.au_mot("une heure revient")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("2 fois")
        self.play(FadeIn(l0[1:], scale=1.15), run_time=0.4)
        cg, cd, hg, hd, so, lu = self.deux_horloges(7)
        tg = self.ligne([("7 heures", JAUNE_TITRE), ("du matin", JOUR)], 36, buff=0.2).move_to(P(-3.0, -1.75))
        td = self.ligne([("7 heures", JAUNE_TITRE), ("du soir", SOIR)], 36, buff=0.2).move_to(P(3.0, -1.75))
        self.au_mot("7 heures du matin")
        self.play(FadeIn(cg), FadeIn(hg, scale=0.85), FadeIn(so, scale=0.6), FadeIn(tg, shift=UP * 0.1), run_time=0.5)
        self.au_mot("7 heures du soir")
        self.play(FadeIn(cd), FadeIn(hd, scale=0.85), FadeIn(lu, scale=0.6), FadeIn(td, shift=UP * 0.1), run_time=0.5)
        self.play(Indicate(hg.aig_h, color=JAUNE_TITRE, scale_factor=1.25), run_time=0.45)
        self.play(Indicate(hd.aig_h, color=JAUNE_TITRE, scale_factor=1.25), run_time=0.45)
        self.attendre_voix()

    # ── 04 : on pense à ce qu'on fait ───────────────────────────────────────
    def ecran_indice(self):
        self.ecran("04-indice")
        tit = self.t("On pense à ce qu'on fait", 44, JAUNE_TITRE).move_to(P(0, 3.15))
        self.au_mot("Pour savoir")
        self.play(FadeIn(tit, shift=UP * 0.15), run_time=0.4)
        cg, cd, hg, hd, so, lu = self.deux_horloges(7, r=1.0)
        self.add(cg, cd, hg, hd, so, lu)
        hg.shift(LEFT * 1.1 + DOWN * 0.1)
        hd.shift(LEFT * 1.1 + DOWN * 0.1)
        li = lit(0.95).move_to(P(-1.75, 0.35))
        ass = assiette(0.8).move_to(P(4.25, 0.35))
        tg = VGroup(self.ligne([("7 heures", JAUNE_TITRE), ("du matin :", JOUR)], 32, buff=0.18),
                    self.t("on se lève.", 36)).arrange(DOWN, buff=0.15).move_to(P(-3.0, -1.6))
        td = VGroup(self.ligne([("7 heures", JAUNE_TITRE), ("du soir :", SOIR)], 32, buff=0.18),
                    self.t("on dîne.", 36)).arrange(DOWN, buff=0.15).move_to(P(3.0, -1.6))
        self.au_mot("À 7 heures du matin")
        self.play(FadeIn(tg[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("on se lève")
        self.play(FadeIn(tg[1], scale=1.15), FadeIn(li, scale=0.7), run_time=0.5)
        self.au_mot("À 7 heures du soir")
        self.play(FadeIn(td[0], shift=UP * 0.1), run_time=0.35)
        self.au_mot("on dîne")
        self.play(FadeIn(td[1], scale=1.15), FadeIn(ass, scale=0.7), run_time=0.45)
        self.attendre_voix()

    # ── 05 / 07 : questions ─────────────────────────────────────────────────
    def question(self, cle_q, cle_r, h, dessin, lignes_q, mot_q, choix, bonne, phrase, mot_d):
        self.clear()
        self.add_mascotte()
        hg = hl(1.05, h, 0).move_to(P(-4.6, 1.35))
        so = soleil(0.6).move_to(P(-2.55, 2.25))
        self.add(hg, so)
        dessin.move_to(P(-2.35, 0.9))

        def autres_r(sc):
            for i in range(len(phrase)):
                sc.rep(i, avec=[FadeIn(dessin, scale=0.6)] if i == mot_d else [])
            sc.rep_fin()

        self.question_gauche(cle_q, cle_r, lignes_q, [self.choix(x) for x in choix], bonne, phrase, -0.75,
                             mot_q=mot_q, autres_r=autres_r)

    def ecran_question1(self):
        self.question("05-question", "05b-reponse", 12, assiette(0.75), ["Il est midi.", "Que fait-on d'habitude ?"],
                      "Il est midi", ["on se couche", "on déjeune", "on se lève"], 1,
                      ["À midi, on déjeune", "à la cantine ou à la maison."], 0)

    # ── 06 : le piège (le nombre seul ne suffit pas) ────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = gauche(self.t("Attention au piège !", 46, ROUGE_ERREUR), -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        l0 = gauche(self.t("Le nombre seul ne suffit pas.", 38), -6.2, 2.1)
        self.au_mot("Le nombre seul")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        lignes = []
        for k, (moment, coul, astre, fin, dessin, mot, mot2) in enumerate([
                ("du matin,", JOUR, soleil(0.5), "on arrive à l'école.", None, "À 8 heures du matin", "on arrive"),
                ("du soir,", SOIR, lune(0.65), "on va au lit.", lit(0.75), "À 8 heures du soir", "on va au lit")]):
            y = 0.55 - 2.0 * k
            fond = carte(12.2, 1.75, coul, 0.14).move_to(P(-0.3, y))
            if k == 1:
                fond.set_fill("#1e1b4b", 0.7)
            hg = hl(0.68, 8, 0).move_to(P(-5.45, y))
            astre.move_to(P(-4.35, y + 0.45))
            t0 = gauche(self.ligne([("À 8 heures", JAUNE_TITRE), (moment, coul)], 36, buff=0.2), -3.85, y + 0.35)
            t1 = gauche(self.t(fin, 36), -3.85, y - 0.4)
            self.au_mot(mot)
            self.play(FadeIn(fond), FadeIn(hg, scale=0.85), FadeIn(astre, scale=0.6), FadeIn(t0, shift=UP * 0.1),
                      run_time=0.45)
            self.au_mot(mot2)
            anims = [FadeIn(t1, shift=UP * 0.1)]
            if dessin is not None:
                dessin.move_to(P(2.6, y))
                anims.append(FadeIn(dessin, scale=0.7))
            self.play(*anims, run_time=0.4)
            lignes.append(t0)
        self.attendre_voix()

    def ecran_question2(self):
        self.question("07-question", "07b-reponse", 4, gouter(0.9), ["Malo prend son goûter",
                                                                     "à 4 heures.", "C'est quel moment ?"],
                      "Malo prend", ["l'après-midi", "le matin", "la nuit"], 0,
                      ["On prend le goûter l'après-midi.", "C'est 4 heures de l'après-midi."], 0)

    # ── 08 : le défi (« je me lève à 7 heures du soir ») ────────────────────
    def pause_gauche(self, y=-2.75, marge=2.0):
        self.au_mot("Mets pause")
        p = gauche(self.t("Mets pause, et cherche !", 36, ORANGE_RETENUE), -6.2, y)
        self.play(Write(p), run_time=0.8)
        self.attendre_voix(marge=marge)

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        XL = -6.2
        pe = malo(0.85).move_to(P(4.3, -0.9))
        l0 = gauche(self.t("Malo dit :", 40), XL, 1.95)
        self.au_mot("Malo dit")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(pe, shift=UP * 0.3), run_time=0.4)
        bt = self.ligne([("« Je me lève", WHITE), ("à 7 heures du soir. »", JAUNE_TITRE)], 38, buff=0.2)
        bulle = RoundedRectangle(width=bt.width + 0.6, height=bt.height + 0.6, corner_radius=0.3, fill_color="#1e293b",
                                 fill_opacity=1, stroke_color=WHITE, stroke_width=3)
        b = VGroup(bulle, bt.move_to(bulle)).next_to(P(XL, 0.85), RIGHT, buff=0)
        b.move_to(P(XL + b.width / 2, 0.85))
        self.au_mot("je me lève")
        self.play(FadeIn(bulle, scale=0.9), FadeIn(bt[0]), run_time=0.4)
        self.au_mot("à 7 heures du soir")
        self.play(FadeIn(bt[1], scale=1.15), run_time=0.4)
        q = gauche(self.t("A-t-il raison ?", 40, JAUNE_TITRE), XL, -0.45)
        self.au_mot("A-t-il raison")
        self.play(FadeIn(q, shift=UP * 0.15), Wiggle(pe, scale_value=1.05, rotation_angle=0.03 * TAU), run_time=0.6)
        self.pause_gauche(y=-1.6)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        XL = -6.2
        fn = carte(3.4, 1.8, SOIR, 0.7).set_fill("#1e1b4b", 0.7).move_to(P(4.3, 1.75))
        lu = lune(0.75).move_to(P(3.35, 2.1))
        li = lit(1.0).move_to(P(4.6, 1.45))
        l0 = gauche(self.ligne([("Le soir,", SOIR), ("il fait nuit.", WHITE)], 38, buff=0.2), XL, 1.95)
        self.au_mot("Le soir")
        self.play(FadeIn(l0, shift=UP * 0.1), FadeIn(fn), FadeIn(lu, scale=0.6), run_time=0.45)
        l1 = gauche(self.t("On dîne, puis on va au lit.", 38), XL, 1.15)
        self.au_mot("On dîne")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("on va au lit")
        self.play(FadeIn(li, scale=0.7), run_time=0.35)
        fj = carte(3.4, 2.1, JOUR, 0.16).move_to(P(4.3, -0.45))
        hg = hl(0.78, 7, 0).move_to(P(3.75, -0.45))
        so = soleil(0.5).move_to(P(5.25, -0.05))
        l2 = gauche(self.ligne([("On se lève", WHITE), ("à 7 heures du matin.", JAUNE_TITRE)], 38, buff=0.2), XL, -0.05)
        self.au_mot("On se lève")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(fj), FadeIn(hg, scale=0.85), run_time=0.4)
        self.au_mot("à 7 heures du matin")
        self.play(FadeIn(l2[1], scale=1.15), FadeIn(so, scale=0.6), run_time=0.4)
        l3 = gauche(self.t("Malo s'est trompé !", 42, ROUGE_ERREUR), XL, -1.25)
        self.au_mot("Malo s'est trompé")
        self.play(FadeIn(l3, scale=1.15), run_time=0.4)
        self.insister(l3, 1.12, 0.22)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        so = soleil(0.8).move_to(P(-0.8, 0.6))
        lu = lune(1.1).move_to(P(0.8, -0.6))
        fig = hors_audit(VGroup(so, lu))
        lignes = self.finale_gauche(fig, textes=[
            ("La journée a des moments :", "matin, midi, après-midi, soir."),
            ("Une heure revient", "2 fois par jour."),
            ("On pense à ce qu'on fait", "pour trouver le moment.")], fs=34, x_fig=-4.6, xl=-2.0)
        self.add(fig)
        self.au_mot("La journée a")
        self.montrer_ligne(lignes[0], Indicate(so, color=JAUNE_TITRE, scale_factor=1.15))
        self.au_mot("Une heure revient")
        self.montrer_ligne(lignes[1], Indicate(lu, color=JAUNE_TITRE, scale_factor=1.15))
        self.au_mot("On pense")
        self.montrer_ligne(lignes[2], Circumscribe(fig, color=VERT_OK, shape=Circle, buff=0.1))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_journee()
        self.ecran_deux_fois()
        self.ecran_indice()
        self.ecran_question1()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class DureeJourSemaineCP(DureeJourSemaineBase):
    identite = "Maths CP — EleveAI"
    ceinture = "blanche"
