# pythagore_rediger.py
# EleveAI — Maths 4e — Pythagore, épisode 7 : rédiger avec Pythagore ou sa réciproque
# (notionId : pythagore_theoreme, micro : pythagore_rediger), AVEC VOIX.
#
# ⭐ Dernier épisode de la série (13/10/2026). Sa micro : savoir LEQUEL écrire et
# COMMENT. Une seule question (« l'angle droit, je le connais ou je le cherche ? »),
# les deux copies modèles en quatre lignes, où se place « rectangle en » (première
# ligne du théorème, dernière de la réciproque), le piège du mélange, un défi double.
#
# ⭐ 31/10/2026 : refonte « questions-pauses » (manim/questions-pythagore.md, Ép. 7) :
# Q1 après 04-mots (théorème ou réciproque ?), Q2 après 05-piege (quelle phrase est
# juste ?), compte à rebours de 5 s ; finale « Ce que tu as appris » ; fin du 19/10.
# Module commun : pythagore_pauses.py. Marques mot à mot : 4e-pythagore-rediger.marques.json.
# Avant tout rendu :
#   AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/pythagore_rediger.py PythagoreRediger4e
#
# Voix : manim/voix/4e-pythagore-rediger.json (Julie, débit −7) ; clés 04q/04r/05q/05r,
# 07-finale et 08-abonne ajoutées ou changées le 31/10.
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/pythagore_rediger.py PythagoreRediger4e -o eleveai-maths-4e-pythagore-rediger --media_dir manim/scripts/4e/media
# Puis copier le mp4 dans manim/sorties/4e/maths/pythagore/07-rediger/.

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from pythagore_reciproque import COTE, COUL_HYP, P, PythagoreReciproque4e, echelle_ceintures  # noqa: E402
from pythagore_pauses import PausesPaysage, sans_audit  # noqa: E402

from manim import *  # noqa: E402

from charte import *  # noqa: E402


# Le mixin EN PREMIER, sauf si la scène parente (ép. 6, un autre agent) l'a déjà : MRO cohérent.
_BASES = ((PythagoreReciproque4e,) if issubclass(PythagoreReciproque4e, PausesPaysage)
          else (PausesPaysage, PythagoreReciproque4e))


class PythagoreRediger4e(*_BASES):
    nom_voix = "4e-pythagore-rediger"

    # ── les figures ─────────────────────────────────────────────────────────

    def tri_abc(self, origine=P(-6.2, -2.2), u=0.3, carre=True):
        A = origine
        B, C = A + RIGHT * 6 * u, A + UP * 8 * u
        contour, cr, hyp, lab = self.tri_rect(A, B, C, lettres="ABC")
        etiq = VGroup(self.t("6", 26, COTE).next_to(Line(A, B), DOWN, buff=0.1),
                      self.t("8", 26, COTE).next_to(Line(A, C), LEFT, buff=0.1))
        return contour, cr, hyp, lab, etiq

    def tri_def(self, origine=P(-6.4, -2.2), u=0.2):
        D = origine
        F, E = D + RIGHT * 12 * u, D + UP * 5 * u
        contour, cr, hyp, lab = self.tri_rect(D, F, E, lettres="DFE")
        etiq = VGroup(self.t("12", 26).next_to(Line(D, F), DOWN, buff=0.1),
                      self.t("5", 26).next_to(Line(D, E), LEFT, buff=0.1),
                      self.t("13", 26).move_to((E + F) / 2 + UR * 0.28))
        return contour, cr, hyp, lab, etiq

    # ── (31/10) la copie MORCEAU PAR MORCEAU : chaque nombre à son mot ──────

    def morceler(self, morceaux, font_size, color):
        """Une ligne en morceaux (des Text), posés EXACTEMENT comme la ligne entière."""
        txts = [m[0] if isinstance(m, tuple) else m for m in morceaux]
        F = self.t(" ".join(txts), font_size, color)
        ms = [self.t(x, font_size, color) for x in txts]
        n = [len([c for c in x if not c.isspace()]) for x in txts]
        if len(F) == sum(n) and all(len(m) == k for m, k in zip(ms, n)):
            i = 0
            for m, k in zip(ms, n):
                m.shift(F[i].get_center() - m[0].get_center())
                i += k
        else:
            VGroup(*ms).arrange(RIGHT, buff=0.14 * font_size / 30)
        for m, x in zip(ms, txts):
            if re.fullmatch(r"\d\.", x.strip()):
                sans_audit(m)  # le « 1. » de la copie se dit « Un : »
        g = VGroup(*ms)
        g.morceaux, g.cues = ms, [m[1] if isinstance(m, tuple) else None for m in morceaux]
        return g

    def copie_m(self, lignes, x, y0, pas, font_size):
        """Comme copie(), mais chaque ligne = liste de morceaux (str, ou (str, extrait de la voix))."""
        g = VGroup()
        for k, spec in enumerate(lignes):
            l = self.morceler(spec[0], font_size, spec[1])
            retrait = spec[2] if len(spec) > 2 else 0.0
            l.move_to(P(0, y0 - k * pas)).align_to(P(x + retrait, 0), LEFT)
            g.add(l)
        return g

    def poser_copie(self, lignes, depuis=0):
        """Chaque morceau paraît à SON mot : l'extrait donné, sinon son 1er mot et son dernier
        nombre ; un extrait "" = dans la MÊME animation que le morceau d'avant."""
        groupes = []
        for l in lignes:
            for m, cue in zip(l.morceaux, l.cues):
                if cue == "" and groupes:
                    groupes[-1][1].append(m)
                else:
                    groupes.append((cue, [m]))
        for cue, ms in groupes:
            if cue is not None and cue != "":
                j = self._texte_voix.find(cue, depuis + 1 if depuis else 0)  # après le morceau d'avant
                if j < 0:
                    raise ValueError(f"« {cue} » absent de la voix après {depuis}")
                self._attendre_pos(j)
                depuis = j
            elif cue is None:
                i, depuis = self._cue(ms[0], depuis)
                if i is not None:
                    self._attendre_pos(i)
            self.play(*[FadeIn(m, shift=RIGHT * 0.15) for m in ms], run_time=0.3)
        return depuis
    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Rédiger avec Pythagore", 60, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2))
        self.au_mot("Le théorème ou la réciproque")
        q1 = self.t("Le théorème ou la réciproque :", 40, BLEU_CALCUL)
        q2 = self.t("lequel écrire ?", 40, BLEU_CALCUL)
        VGroup(q1, q2).arrange(DOWN, buff=0.2).move_to(P(0, 0.2))
        self.play(FadeIn(q1, shift=UP * 0.2))
        self.play(FadeIn(q2, shift=UP * 0.2))
        self.play(FadeIn(echelle_ceintures("jaune").move_to(P(-0.6, -2.4))))
        self.attendre_voix(marge=1.0)

    # ── 01 : la seule question ──────────────────────────────────────────────

    def ecran_seule_question(self):  # (31/10 : renommé, ecran_question est celui du mixin)
        self.clear()
        self.add_mascotte()
        self.dire("01-question")
        self.titre_ecran("Une seule question : l'angle droit ?")
        g = self.tri_abc(origine=P(-5.4, -0.6), u=0.25)
        d = self.tri_abc(origine=P(1.4, -0.6), u=0.25)
        self.play(Create(g[0]), Create(d[0]))
        self.au_mot("je le connais, ou je le cherche")
        self.play(GrowFromCenter(g[1]), Write(self.t("?", 48, BLEU_CALCUL).move_to(d[0].get_vertices()[0] + UR * 0.35)))
        self.au_mot("Je le connais")
        t1 = VGroup(self.t("je le connais", 30, BLEU_CALCUL), self.t("→ le THÉORÈME", 36, COUL_HYP),
                    self.t("je calcule une longueur", 28)).arrange(DOWN, buff=0.12).move_to(P(-4.0, -2.0))
        self.play(FadeIn(t1))
        self.au_mot("Je le cherche")
        t2 = VGroup(self.t("je le cherche", 30, BLEU_CALCUL), self.t("→ la RÉCIPROQUE", 36, VERT_OK),
                    self.t("je prouve l'angle droit", 28)).arrange(DOWN, buff=0.12).move_to(P(2.8, -2.0))
        self.play(FadeIn(t2))
        self.attendre_voix()

    # ── 02 : le théorème, en quatre lignes ──────────────────────────────────
    # (31/10) morceau par morceau : « 36 », « 64 », « 100 », « 10 » à leur mot.

    def ecran_theoreme(self):
        self.clear()
        self.add_mascotte(scale=0.4)
        self.dire("02-theoreme")
        self.titre_ecran("Le théorème, en quatre lignes")
        contour, cr, hyp, lab, etiq = self.tri_abc()
        self.add(contour, cr, lab, etiq)
        lignes = self.copie_m([
            (["1.", ("Le triangle ABC est rectangle en A.", "le triangle")], JAUNE_TITRE),
            (["2.", ("D'après le théorème de Pythagore :", "d'après")], WHITE),
            ([("BC² = AB² + AC².", "BC au carré égale AB")], WHITE, 0.45),
            (["3.", ("BC²", "BC au carré"), "= 6² + 8² = 36", "+ 64", "= 100."], BLEU_CALCUL),
            (["4.", ("BC", "BC égale"), "= √100", "= 10 cm."], VERT_OK),
        ], x=-3.4, y0=1.6, pas=0.66, font_size=30)
        self.poser_copie(lignes)
        self.play(Create(hyp), FadeIn(self.t("10", 26, COUL_HYP).move_to(hyp.get_center() + UR * 0.3)))
        self.attendre_voix()

    # ── 03 : la réciproque, en quatre lignes ────────────────────────────────

    def ecran_reciproque(self):
        self.clear()
        self.add_mascotte(scale=0.4)
        self.dire("03-reciproque")
        self.titre_ecran("La réciproque, en quatre lignes")
        contour, cr, hyp, lab, etiq = self.tri_def(origine=P(-6.0, -2.2))  # (31/10) 3 % du bord gauche
        self.add(contour, lab, etiq)
        lignes = self.copie_m([
            (["1.", ("Le plus grand côté est [EF].", "le plus grand")], WHITE),
            (["2.", ("D'une part :", "d'une part"), ("EF²", "EF au carré"), "= 13² = 169."], COUL_HYP),
            ([("D'autre part :", "D'autre part"), ("DE² + DF²", "DE au carré"), "= 25", "+ 144", "= 169."],
             COTE, 0.45),
            (["3.", ("Donc EF² = DE² + DF².", "donc")], BLEU_CALCUL),
            (["4.", ("D'après la réciproque du théorème de Pythagore,", "d'après")], JAUNE_TITRE),
            ([("DEF est rectangle en D.", "DEF est rectangle")], JAUNE_TITRE, 0.45),
        ], x=-3.2, y0=1.7, pas=0.6, font_size=27)
        self.poser_copie(lignes)
        self.play(GrowFromCenter(cr))
        self.play(Indicate(cr, scale_factor=1.6))
        self.attendre_voix()
    # ── 04 : où se place « rectangle en » ───────────────────────────────────

    def ecran_mots(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-mots")
        self.titre_ecran("Où se place « rectangle en » ?")
        th = self.copie([("Le triangle ABC est rectangle en A.", JAUNE_TITRE), ("D'après le théorème…", GRAY_B),
                         ("BC² = 100", GRAY_B), ("BC = 10 cm.", GRAY_B)], x=-6.3, y0=1.5, pas=0.55, font_size=24)
        rc = self.copie([("Le plus grand côté est [EF].", GRAY_B), ("D'une part… D'autre part…", GRAY_B),
                         ("Donc EF² = DE² + DF².", GRAY_B), ("D'après la réciproque…,", GRAY_B),
                         ("DEF est rectangle en D.", JAUNE_TITRE)], x=0.6, y0=1.5, pas=0.55, font_size=24)
        self.play(FadeIn(self.t("le théorème", 32, COUL_HYP).move_to(P(-4.4, 2.2))),
                  FadeIn(self.t("la réciproque", 32, VERT_OK).move_to(P(2.6, 2.2))), FadeIn(sans_audit(th)), FadeIn(sans_audit(rc)))  # la copie qu'on relit
        self.au_mot("Dans le théorème")
        b1 = SurroundingRectangle(th[0], color=JAUNE_TITRE, buff=0.08)
        self.play(Create(b1))
        self.au_mot("on part de l'angle droit")
        self.play(FadeIn(self.t("au DÉBUT : on part de l'angle droit", 24, COUL_HYP).move_to(P(-3.55, -1.4))))
        self.au_mot("Dans la réciproque")
        b2 = SurroundingRectangle(rc[4], color=JAUNE_TITRE, buff=0.08)
        self.play(Create(b2))
        self.au_mot("on arrive à l'angle droit")
        self.play(FadeIn(self.t("à la FIN : on arrive à l'angle droit", 24, VERT_OK).move_to(P(3.4, -1.4))))
        self.attendre_voix()

    # ── 05 : le piège ───────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("Le piège : mélanger les deux")
        self.au_mot("Écrire : d'après le théorème")
        f1 = self.ligne("« D'après le théorème de Pythagore, le triangle est rectangle. »", 1.3, 28, ROUGE_ERREUR, x=0)
        self.play(FadeIn(f1))
        self.au_mot("C'est faux")
        self.play(Create(Line(f1.get_left(), f1.get_right(), color=ROUGE_ERREUR, stroke_width=5)))
        self.play(FadeIn(self.ligne("le théorème ne prouve pas l'angle droit", 0.6, 28, ORANGE_RETENUE, x=0)))
        self.au_mot("Ou commencer par")
        f2 = self.ligne("« Le triangle est rectangle. » … quand on le cherche", -0.4, 28, ROUGE_ERREUR, x=0)
        self.play(FadeIn(f2))
        self.play(Create(Line(f2.get_left(), f2.get_right(), color=ROUGE_ERREUR, stroke_width=5)))
        self.au_mot("c'est justement ce qu'on cherche")
        self.play(Write(self.chute("On n'écrit « rectangle » que si on le SAIT, ou à la fin, une fois PROUVÉ.",
                                   color=VERT_OK, font_size=28)))
        self.attendre_voix()

    # ── 04q / 05q : les questions-pauses ──────────────────────────────────

    def question_quel_outil(self):
        self.ecran_question("04q-question", "04r-reponse",
                            ["ABC est rectangle en A,", "et on cherche BC. On utilise :"],
                            ["le théorème", "la réciproque", "les deux"], 0,
                            ["On connaît l'angle droit,", "on calcule une longueur."])

    def question_quelle_phrase(self):
        self.LARG, self.FS_C = 9.0, 30  # trois phrases longues : cartes plus larges, place pour la coche
        self.ecran_question("05q-question", "05r-reponse", ["Quelle phrase est juste ?"],
                            [["D'après le théorème de Pythagore,", "ABC est rectangle."],
                             ["D'après la réciproque du théorème", "de Pythagore, ABC est rectangle."],
                             "D'après la réciproque, BC = 10 cm."], 1,
                            ["La réciproque prouve l'angle droit ;", "le théorème calcule une longueur."], x_col=0.0)
        del self.LARG, self.FS_C

    # ── 06 : défi ───────────────────────────────────────────────────────────
    # (31/10) chaque donnée à son mot : « 9 », « 12 », « 8 », « 15 et 17 ».

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("06-defi")
        self.play(Write(self.t("À toi de jouer : deux questions", 44, JAUNE_TITRE).to_edge(UP)))
        q1 = VGroup(self.morceler(["1.", ("RST est rectangle en S,", "RST")], 30, WHITE),
                    self.morceler(["RS = 9 cm,", "ST = 12 cm."], 30, WHITE),
                    self.morceler([("Calcule RT.", "calcule RT")], 30, BLEU_CALCUL)).arrange(DOWN, buff=0.12)
        q2 = VGroup(self.morceler(["2.", ("Un triangle a pour côtés", "un triangle")], 30, WHITE),
                    self.morceler(["8,", "15 et 17 cm."], 30, WHITE),
                    self.morceler([("Est-il rectangle ?", "est-il rectangle")], 30, BLEU_CALCUL)).arrange(DOWN, buff=0.12)
        c1 = SurroundingRectangle(q1, color=WHITE, buff=0.25, corner_radius=0.12)
        c2 = SurroundingRectangle(q2, color=WHITE, buff=0.25, corner_radius=0.12)
        VGroup(q1, c1).move_to(P(-3.5, 0.6))
        VGroup(q2, c2).move_to(P(3.5, 0.6))
        self.au_mot("Un : RST")
        self.play(Create(c1), run_time=0.4)
        d = self.poser_copie(q1, self._pos("Un : RST"))
        self.au_mot("Deux : un triangle")
        self.play(Create(c2), run_time=0.4)
        self.poser_copie(q2, d)
        self.au_mot("théorème ou réciproque")
        self.play(FadeIn(self.ligne("Pour chacune : théorème ou réciproque ?", -1.3, 36, COUL_HYP, x=0)))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et rédige !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    # (31/10) colonnes rentrées (3 % des bords), police 22 ; chaque nombre à son mot.
    def ecran_correction(self):
        self.clear()
        self.add_mascotte(scale=0.4)
        self.dire("06b-correction")
        self.titre_ecran("Correction")
        g = self.copie_m([
            (["1.", ("Angle droit connu :", "Question un"), "le THÉORÈME."], COUL_HYP),
            ([("RST est rectangle en S.", "")], WHITE),
            ([("D'après le théorème de Pythagore :", "")], WHITE),
            ([("RT²", "RT au carré"), "= 9² + 12² = 81", "+ 144", "= 225"], BLEU_CALCUL),
            ([("RT", "RT égale"), "= √225", "= 15 cm."], VERT_OK),
        ], x=-6.35, y0=1.8, pas=0.56, font_size=22)
        d = self.copie_m([
            (["2.", ("Angle droit cherché :", "Question deux"), "la RÉCIPROQUE."], VERT_OK),
            ([("Le plus grand côté mesure 17.", "17 au carré")], WHITE),
            ([("D'une part :", ""), ("17²", ""), "= 289."], COUL_HYP),
            ([("D'autre part :", "D'autre part"), "8²", "+ 15²", "= 64 + 225 = 289."], COTE),
            ([("C'est égal : d'après la réciproque,", "C'est égal")], JAUNE_TITRE),
            ([("le triangle est rectangle.", "le triangle est rectangle")], JAUNE_TITRE),
        ], x=0.1, y0=1.8, pas=0.56, font_size=22)
        fin = self.poser_copie(g)
        self.poser_copie(d, fin)
        self.attendre_voix()
    # ── 07 : ce que tu as appris ────────────────────────────────────────────

    def ecran_finale(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-finale")
        self.play(Write(self.t("Ce que tu as appris", 44, JAUNE_TITRE).to_edge(UP)))
        questions = [
            ("Choisir entre", "Choisir entre le théorème et la réciproque ?"),
            ("Rédiger le théorème", "Rédiger le théorème en quatre lignes ?"),
            ("Rédiger la réciproque", "Rédiger la réciproque en quatre lignes ?"),
        ]
        lignes = VGroup(*[VGroup(self.coche(), self.t(txt, 30)).arrange(RIGHT, buff=0.3) for _, txt in questions])
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.55).move_to(P(-0.3, 0.6))
        for (mot, _), l in zip(questions, lignes):
            self.au_mot(mot)
            self.play(FadeIn(l[1], shift=RIGHT * 0.2), run_time=0.6)
            self.play(Create(l[0]), run_time=0.4)
        self.au_mot("Tu as terminé")
        bravo = self.t("Série Pythagore terminée. Bravo !", 44, VERT_OK).move_to(P(0, -1.6))
        self.play(Write(bravo))
        self.play(Flash(bravo, color=VERT_OK, line_length=0.4))
        self.attendre_voix(marge=1.0)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde()
        self.ecran_seule_question()
        self.ecran_theoreme()
        self.ecran_reciproque()
        self.ecran_mots()
        self.question_quel_outil()
        self.ecran_piege()
        self.question_quelle_phrase()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement(voix="08-abonne")
