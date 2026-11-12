# calcul_pose_verifier.py
# EleveAI — Maths 6e — série « Calcul posé », épisode 05 : VÉRIFIER UN CALCUL POSÉ
# (micro entier_verifier_calcul, notion entier_calcul_pose), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Short jumeau : film Ti Margo (prototypes/ti-margo/films/calcul-pose-verifier.js).
# Décor et métier : Zoé, RÉALISATRICE de dessins animés (matrice métiers ; 24 images par seconde).
# Méthodes : l'ordre de grandeur (386 + 247 : 533 trop loin de 640), l'opération inverse (702 − 358 :
# 354 + 358 = 712, pas 702), la division vérifiée par une multiplication (96 ÷ 4 : 34 × 4 = 136).
# Écrans : garde (00), situation (01), ordre de grandeur (02), QUESTION 1 (03, réponse C), opération inverse (04),
# division (05), QUESTION 2 (06, réponse A), défi 3 minutes de dessin animé (07) et correction (07b),
# appris (08), fin (09).
# Voix : manim/voix/6e-calcul-pose-verifier.json ; marques : calcul_pose_verifier_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/6e/calcul_pose_verifier.py CalculPoseVerifier6e
# python -m manim render -qh --disable_caching manim/scripts/6e/calcul_pose_verifier.py CalculPoseVerifier6e -o eleveai-maths-6e-calcul-pose-verifier --media_dir manim/scripts/6e/media-cp-05
# Sortie : manim/sorties/6e/maths/calcul-pose/05-verifier/eleveai-maths-6e-calcul-pose-verifier.mp4

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from calcul_pose_commun import *  # noqa: E402,F403
from calcul_pose_multiplication import PoseX, FOIS  # noqa: E402
from calcul_pose_division import Potence, DIV, GRIS  # noqa: E402


def zoe(s=1.0):
    """Zoé, réalisatrice : pull violet, cheveux longs, un clap de cinéma à la main."""
    p = visage(personne(peau="#a0673f", tenue="#7c3aed", cheveux="#111827", longs=True, s=s))
    c, w = p.corps.get_center(), p.corps.width
    clap = VGroup(
        Rectangle(width=0.62 * s, height=0.42 * s, fill_color="#1f2937", fill_opacity=1, stroke_color=WHITE,
                  stroke_width=2),
        Rectangle(width=0.62 * s, height=0.12 * s, fill_color=WHITE, fill_opacity=1, stroke_width=0)
        .shift(UP * 0.27 * s).rotate(0.25, about_point=P(-0.31 * s, 0.21 * s)),
    ).move_to(c + P(w * 0.75, 0.1 * s))
    p.add(clap)
    return p


def pellicule(x, y, n=8, a=0.42, couleurs=("#fde68a", "#fca5a5", "#93c5fd", "#86efac")):
    """Une bande de film : n images en ligne, perforations en haut et en bas."""
    fond = Rectangle(width=n * a + 0.12, height=a * 1.55, fill_color="#111827", fill_opacity=1,
                     stroke_color="#475569", stroke_width=2).move_to(P(x, y))
    g = VGroup(fond)
    for k in range(n):
        cx = x - (n - 1) * a / 2 + k * a
        g.add(Rectangle(width=a * 0.8, height=a * 0.8, fill_color=couleurs[k % len(couleurs)], fill_opacity=1,
                        stroke_width=0).move_to(P(cx, y)))
        for dy in (-1, 1):
            g.add(Square(a * 0.14, fill_color="#e5e7eb", fill_opacity=1, stroke_width=0)
                  .move_to(P(cx, y + dy * a * 0.62)))
    return g


def pas_audit(m):
    """Hors audit, mais toujours synchronisé (les choix des questions sont redits dans la réponse)."""
    for f in m.get_family():
        f._pas_audit = True
    return m


def nombre(po, s, i=None, couleur=WHITE):
    """Les chiffres du nombre s à la ligne i de la pose (le résultat si i est None)."""
    i = len(po.lignes) if i is None else i
    return VGroup(*[po._t(ch, len(s) - 1 - k, i, couleur) for k, ch in enumerate(s)])


class CalculPoseVerifierBase(PaysageCalculPose):
    nom_voix = "6e-calcul-pose-verifier"
    fichier_marques = "calcul_pose_verifier_marques.json"

    def _disposer_q(self, question, choix, phrase):
        """Le compte à rebours n'est pas un nombre dit : hors synchro."""
        r = super()._disposer_q(question, choix, phrase)
        for f in r[4].get_family():
            f.sans_synchro = True
        return r

    def ecrire(self, morceaux, mot, x0, y, fs=32, autres=(), buff=0.18, n=1):
        """Une ligne, bord gauche en x0, posée au mot ; UN play par morceau ; (texte, couleur, mot) :
        ce morceau attend aussi son mot (un nombre seul) ; mot peut être (extrait, n). Un nombre à
        milliers (« 3 600 ») est hors audit : l'audit lit « 3600 »."""
        mots = [m[2] if len(m) > 2 else None for m in morceaux]
        lg = self.ligne([m[:2] for m in morceaux], fs, buff=buff)
        for m, mo in zip(lg, morceaux):
            if re.search(r"\d \d{3}", mo[0]):
                hors_audit(m)
        gauche(lg, x0, y)
        if mot:
            self.au_mot(mot, n)
        for k, m in enumerate(lg):
            if mots[k]:
                self.au_mot(*(mots[k] if isinstance(mots[k], tuple) else (mots[k],)))
            av = autres.get(k, []) if isinstance(autres, dict) else (autres if k == 0 else [])
            self.play(FadeIn(m, shift=UP * 0.1), *av, run_time=0.25)
        return lg

    def montrer(self, lg, mots, avec=None):
        avec = avec or {}
        for k, m in enumerate(lg):
            if mots[k]:
                self.au_mot(mots[k])
            self.play(FadeIn(m, shift=UP * 0.1), *avec.get(k, []), run_time=0.25)

    def croix(self, m, couleur=ROUGE_ERREUR):
        return VGroup(Line(m.get_corner(UL), m.get_corner(DR), color=couleur, stroke_width=6),
                      Line(m.get_corner(DL), m.get_corner(UR), color=couleur, stroke_width=6))

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Vérifier un calcul posé", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Vérifier")
        po = Pose(["386", "247"], signe="+", origine=P(3.4, 1.4), pas=0.48, hl=0.62, fs=44)
        mini = VGroup(po.ligne(0), po.ligne(1), po.signe, po.barre)
        r = nombre(po, "633", couleur=VERT_OK)
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), FadeIn(mini), run_time=0.7)
        q = self.t("Mon résultat est-il juste ?", 40)
        q.move_to(P(0, 0.35)).align_to(P(-6.2, 0), LEFT)
        pt = self.t("?", 52, ORANGE_RETENUE).next_to(r, RIGHT, buff=0.3)
        self.au_mot("Comment savoir")
        self.play(FadeIn(q, shift=UP * 0.2), FadeIn(r, scale=1.4), FadeIn(pt, scale=2), run_time=0.4)
        self.play(Wiggle(pt), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : Zoé, réalisatrice ──────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        z = zoe(1.05).move_to(P(-5.2, -0.2))
        self.au_mot("Voici Zoé")
        nom = self.t("Zoé", 42, BLEU_CALCUL).next_to(z, UP, buff=0.25)
        self.play(FadeIn(z, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        x0 = -3.3
        self.ecrire([("réalisatrice de dessins animés", BLEU_CALCUL)], "réalisatrice", x0, 2.7, fs=36)
        film = pellicule(0.4, 1.3, n=12)
        self.au_mot("Dans un dessin")
        self.play(FadeIn(film, shift=LEFT * 0.4), run_time=0.5)
        self.ecrire([("Chaque seconde :", WHITE), ("24 images.", AMBRE_D)], "chaque seconde", x0, 0.0, fs=38,
                    autres=[Indicate(film, color=AMBRE_D, scale_factor=1.05)])
        self.ecrire([("Zoé fait beaucoup de calculs,", WHITE)], "Zoé fait", x0, -1.3, fs=34)
        lg = self.ecrire([("et elle les vérifie toujours.", VERT_OK)], "et elle les vérifie", x0, -1.95, fs=34)
        ch = self.coche(taille=0.45).next_to(lg, RIGHT, buff=0.3)
        self.play(Create(ch), run_time=0.35)
        self.attendre_voix()

    # ── 02 : l'ordre de grandeur ────────────────────────────────────────────
    def ecran_ordre(self):
        self.ecran("02-ordre")
        self.au_mot("Première méthode")
        tit = self.t("Première méthode : l'ordre de grandeur", 44, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.45)
        po = Pose(["386", "247"], signe="+", origine=P(-3.9, 1.6), pas=0.7, hl=0.9, fs=62)
        x0, fs = -1.9, 32
        faux = nombre(po, "533")
        self.ecrire([("Zoé trouve", WHITE), ("386 + 247 =", WHITE, "386 plus"), ("533.", WHITE, "533. Elle")],
                    "Zoé trouve", x0, 2.4, fs=fs,
                    autres={1: [FadeIn(po.ligne(0)), FadeIn(po.ligne(1)), FadeIn(po.signe), Create(po.barre)],
                            2: [FadeIn(faux, scale=1.3)]})
        self.ecrire([("Elle arrondit :", BLEU_CALCUL)], "Elle arrondit", x0, 1.8, fs=fs)
        self.ecrire([("386,", WHITE), ("c'est presque", WHITE), ("390.", BLEU_D, "390. 247")], "386, c'est", x0, 1.2,
                    fs=fs)
        self.ecrire([("247,", WHITE), ("c'est presque", WHITE), ("250.", AMBRE_D, "250. 390")], "247, c'est", x0, 0.6,
                    fs=fs)
        self.ecrire([("390 + 250 =", WHITE), ("640.", VERT_OK, "640. 533")], "390 plus", x0, 0.0, fs=fs)
        cx = self.croix(faux)
        self.ecrire([("533,", ROUGE_ERREUR), ("c'est trop loin !", ROUGE_ERREUR)], "533, c'est", x0, -0.7, fs=fs,
                    autres=[Create(cx)])
        r1 = po.ret(2, "1")
        self.ecrire([("Elle a oublié une retenue.", ORANGE_RETENUE)], "Elle a oublié", x0, -1.3, fs=fs,
                    autres=[FadeIn(r1, scale=2)])
        self.play(Indicate(r1, color=ORANGE_RETENUE, scale_factor=1.8), run_time=0.5)
        bon = nombre(po, "633", couleur=VERT_OK)
        self.ecrire([("Le bon résultat est", WHITE), ("633.", VERT_OK, "633.")], "Le bon", x0, -2.0, fs=fs)
        self.play(FadeOut(faux), FadeOut(cx), FadeIn(bon, scale=1.3), run_time=0.35)
        self.attendre_voix()

    # ── 03 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        po = Pose(["498", "307"], signe="+", origine=P(-3.8, 2.0), pas=0.7, hl=0.9, fs=60)
        g = VGroup(po.ligne(0), po.ligne(1), po.signe, po.barre)

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            b = lambda i, m: sc.rep_bas(i, m, pas=0.6, buff=0.2)  # noqa: E731
            sc.montrer(b(0, ["498,", "c'est presque", ("500.", BLEU_D)]), ["498, c'est", None, "500. 307"])
            sc.montrer(b(1, ["307,", "c'est presque", ("300.", AMBRE_D)]), ["307, c'est", None, "300. 500"])
            sc.montrer(b(2, ["500 + 300 =", ("800.", VERT_OK)]), ["500 plus", "800."])
            sc.rep_fini()

        self.question_pause("03-question", "03b-reponse", ["Quel est le bon ordre", "de grandeur de 498 + 307 ?"],
                            [pas_audit(self.t("700", 36)), pas_audit(self.t("900", 36)), pas_audit(self.t("800", 36))], 2,
                            ["498, c'est presque 500.", "307, c'est presque 300.", "500 + 300 = 800."],
                            mot_q="Quel est", autres_q=autres_q, autres_r=apres)

    # ── 04 : l'opération inverse ────────────────────────────────────────────
    def ecran_inverse(self):
        self.ecran("04-inverse")
        self.au_mot("Deuxième méthode")
        tit = self.t("Deuxième méthode : l'opération inverse", 44, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.45)
        pa = Pose(["702", "358"], signe=MOINS, origine=P(-4.0, 1.75), pas=0.6, hl=0.8, fs=54)
        pb = Pose(["354", "358"], signe="+", origine=P(-1.0, 1.75), pas=0.6, hl=0.8, fs=54)
        pb2 = Pose(["344", "358"], signe="+", origine=P(-1.0, 1.75), pas=0.6, hl=0.8, fs=54)
        x0, fs = -0.2, 30
        self.ecrire([("Zoé calcule", WHITE), ("702 " + MOINS, WHITE, "702 moins"), ("358,", WHITE, "358, et")],
                    "Zoé calcule", x0, 2.35, fs=fs,
                    autres={1: [FadeIn(pa.ligne(0))], 2: [FadeIn(pa.ligne(1)), FadeIn(pa.signe), Create(pa.barre)]})
        faux = nombre(pa, "354")
        self.ecrire([("et trouve", WHITE), ("354.", WHITE, "354. Elle")], "et trouve", x0, 1.75, fs=fs,
                    autres={1: [FadeIn(faux, scale=1.3)]})
        self.ecrire([("Elle vérifie avec une addition :", BLEU_CALCUL)], "Elle vérifie", x0, 1.0, fs=fs)
        b712 = nombre(pb, "712", couleur=ROUGE_ERREUR)
        self.ecrire([("354 +", WHITE, "354 plus"), ("358 =", WHITE, "358, 712"), ("712.", ROUGE_ERREUR, "712. Ce")],
                    None, x0, 0.4, fs=fs,
                    autres={0: [FadeIn(pb.ligne(0))], 1: [FadeIn(pb.ligne(1)), FadeIn(pb.signe), Create(pb.barre)],
                            2: [FadeIn(b712, scale=1.3)]})
        cx = self.croix(faux)
        self.ecrire([("Ce n'est pas 702 !", ROUGE_ERREUR)], "Ce n'est pas", x0, -0.2, fs=fs,
                    autres=[Create(cx), Indicate(pa.ligne(0), color=ROUGE_ERREUR)])
        bon = nombre(pa, "344", couleur=VERT_OK)
        self.ecrire([("Le bon résultat est", WHITE), ("344.", VERT_OK, "344. Et")], "Le bon", x0, -0.95, fs=fs)
        self.play(FadeOut(faux), FadeOut(cx), FadeIn(bon, scale=1.3), run_time=0.3)
        b702 = nombre(pb2, "702", couleur=VERT_OK)
        self.ecrire([("Et 344 +", WHITE, "344 plus"), ("358,", WHITE, "358, ça"), ("ça fait bien", WHITE),
                     ("702.", VERT_OK, "702.")], "Et 344", x0, -1.6, fs=fs,
                    autres={0: [FadeOut(pb.ligne(0)), FadeOut(b712), FadeIn(pb2.ligne(0))], 3: [FadeIn(b702, scale=1.3)]})
        ch = self.coche(taille=0.45).next_to(b702, DOWN, buff=0.25)
        self.play(Create(ch), run_time=0.3)
        self.attendre_voix()

    # ── 05 : vérifier une division ──────────────────────────────────────────
    def ecran_division(self):
        self.ecran("05-division")
        po = Potence(2, 4, lq=1.5, x0=-6.0, y0=2.0, w=0.8, dy=0.8, fs=62, nlig=3)
        x0, fs = -2.2, 32
        self.ecrire([("Pour une division,", JAUNE_TITRE)], "Pour une division", x0, 2.6, fs=36)
        self.ecrire([("on vérifie avec une multiplication.", WHITE)], "on vérifie", x0, 2.0, fs=fs)
        self.ecrire([("96", AMBRE_D, "96 divisé"), (DIV, WHITE), ("4 :", BLEU_D, "4 : Zoé")], None, x0, 1.05, fs=fs,
                    autres=[Create(po.barre_v), Create(po.barre_h), FadeIn(po.nombre(0, 0, "96"))])
        self.play(FadeIn(po.div, scale=1.3), run_time=0.25)
        q34 = VGroup(po.q(0, 3, ROUGE_ERREUR), po.q(1, 4, ROUGE_ERREUR))
        self.ecrire([("Zoé trouve", WHITE), ("34.", ROUGE_ERREUR, "34. Mais")], "Zoé trouve", x0, 0.45, fs=fs,
                    autres=[])
        self.play(FadeIn(q34, scale=1.4), run_time=0.25)
        self.ecrire([("Mais", WHITE), ("34 " + FOIS + " 4 =", WHITE, "34 fois"), ("136.", ROUGE_ERREUR, "136. C'est")],
                    "Mais 34", x0, -0.15, fs=fs)
        cx = self.croix(q34)
        self.ecrire([("C'est trop !", ROUGE_ERREUR)], "C'est trop", x0, -0.75, fs=fs, autres=[Create(cx)])
        q24 = VGroup(po.q(0, 2), po.q(1, 4))
        self.ecrire([("Le bon quotient est", WHITE), ("24 :", VERT_OK, "24 : 24")], "Le bon quotient", x0, -1.5, fs=fs)
        self.play(FadeOut(q34), FadeOut(cx), FadeIn(q24, scale=1.4), run_time=0.3)
        lg = self.ecrire([("24 " + FOIS + " 4 =", WHITE, "24 fois"), ("96.", VERT_OK, "96.")], None, x0, -2.1, fs=fs)
        ch = self.coche(taille=0.45).next_to(lg, RIGHT, buff=0.25)
        self.play(Create(ch), Indicate(po.nombre(0, 0, "96"), color=VERT_OK), run_time=0.4)
        self.attendre_voix()

    # ── 06 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        po = Pose(["50", "17"], signe=MOINS, origine=P(-4.6, 2.0), pas=0.7, hl=0.9, fs=60)
        g = VGroup(po.ligne(0), po.ligne(1), po.signe, po.barre, nombre(po, "33", couleur=BLEU_CALCUL))

        def autres_q(sc):
            sc.play(FadeIn(g), run_time=0.35)

        def apres(sc):
            b = lambda i, m: sc.rep_bas(i, m, pas=0.56, buff=0.2)  # noqa: E731
            sc.montrer(b(0, ["On ajoute ce qui reste"]), ["On ajoute"])
            sc.montrer(b(1, ["à ce qu'on a enlevé :"]), ["à ce qu'on"])
            sc.montrer(b(2, ["33 +", "17 =", ("50.", VERT_OK)]), ["33 plus", "17, 50", "50. C'est"])
            sc.montrer(b(3, [("C'est juste.", VERT_OK)]), ["C'est juste"])
            sc.rep_fini()

        self.question_pause("06-question", "06b-reponse", ["Quelle addition vérifie", "50 " + MOINS + " 17 = 33 ?"],
                            [pas_audit(self.t("33 + 17", 36)), pas_audit(self.t("50 + 17", 36)),
                             pas_audit(self.t("50 + 33", 36))], 0,
                            ["On ajoute ce qui reste", "à ce qu'on a enlevé :", "33 + 17 = 50.", "C'est juste."],
                            mot_q="Quelle addition", autres_q=autres_q, autres_r=apres)

    # ── 07 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("07-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        z = zoe(0.8).move_to(P(-5.4, 0.6))
        film = pellicule(-2.1, 1.6, n=8, a=0.4)
        self.au_mot("Le dessin animé")
        self.play(FadeIn(z, shift=UP * 0.2), FadeIn(film, shift=LEFT * 0.3), run_time=0.5)
        x0, fs = 0.0, 30
        self.ecrire([("Le dessin animé de Zoé", WHITE)], None, x0, 2.0, fs=fs)
        self.ecrire([("dure", WHITE), ("3 minutes.", AMBRE_D)], "dure 3", x0, 1.4, fs=fs)
        self.ecrire([("Une minute :", WHITE), ("60 secondes.", BLEU_D)], "Une minute", x0, 0.6, fs=fs)
        self.ecrire([("Chaque seconde :", WHITE), ("24 images.", ROSE_D)], "Chaque seconde", x0, -0.2, fs=fs,
                    autres=[Indicate(film, color=ROSE_D, scale_factor=1.05)])
        self.ecrire([("Combien d'images faut-il dessiner ?", JAUNE_TITRE)], "Combien d'images", -4.6, -1.5, fs=36)
        self.pause_defi(y=-2.6)

    def ecran_correction(self):
        self.ecran("07b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        po = PoseX(["180", "24"], rt=3, origine=P(-3.4, 2.15), pas=0.62, fs=50, hl=0.8)
        x0, fs = -1.6, 30
        self.ecrire([("3 minutes, c'est", WHITE), ("3 " + FOIS + " 60 :", WHITE, "3 fois 60"),
                     ("180 secondes.", AMBRE_D, "180 secondes")], "3 minutes", x0, 2.45, fs=fs)
        self.ecrire([("On pose", WHITE), ("180 " + FOIS, BLEU_CALCUL, "180 fois 24"), ("24.", BLEU_CALCUL, "24. Première")],
                    "On pose", x0, 1.85, fs=fs,
                    autres={1: [FadeIn(po.ligne(0))], 2: [FadeIn(po.ligne(1)), FadeIn(po.signe), Create(po.barre)]})
        p1 = VGroup(*[po.prod(0, r, v, BLEU_D) for r, v in ((2, 7), (1, 2), (0, 0))])
        self.ecrire([("Première ligne :", BLEU_D), ("180 " + FOIS + " 4 =", WHITE, "180 fois 4"),
                     ("720.", BLEU_D, "720. Deuxième")], "Première", x0, 1.25, fs=fs)
        self.play(FadeIn(p1, scale=1.4), run_time=0.3)
        p2 = VGroup(po.prod(1, 3, 3, AMBRE_D), po.prod(1, 2, 6, AMBRE_D), po.prod(1, 1, 0, AMBRE_D),
                    po.prod(1, 0, 0, ORANGE_RETENUE))
        self.ecrire([("Deuxième ligne :", AMBRE_D), ("180 " + FOIS + " 20 =", WHITE, "180 fois 20"),
                     ("3 600.", AMBRE_D, "3 600. Total")], "Deuxième", x0, 0.65, fs=fs)
        self.play(FadeIn(p2, scale=1.4), run_time=0.3)
        self.ecrire([("Total :", WHITE), ("720 +", BLEU_D, "720 plus"), ("3 600 =", AMBRE_D, "3 600, 4")], "Total",
                    x0, 0.05, fs=fs, autres=[FadeIn(po.plus2()), Create(po.barre2())])
        tot = VGroup(*[po.total(r, v) for r, v in ((3, 4), (2, 3), (1, 2), (0, 0))])
        g = hors_audit(self.gros("4 320 images", fs=46))
        gauche(g, x0, -0.75)
        self.au_mot("4 320 images")
        self.play(FadeIn(g, scale=1.3), LaggedStart(*[FadeIn(m, scale=1.5) for m in tot], lag_ratio=0.2), run_time=0.45)
        self.ecrire([("On vérifie :", JAUNE_TITRE), ("200 " + FOIS + " 20 =", WHITE, "200 fois"),
                     ("4 000.", BLEU_CALCUL, "4 000. C'est")], "On vérifie", x0, -1.6, fs=fs)
        lg = self.ecrire([("C'est proche !", VERT_OK)], "C'est proche", x0, -2.2, fs=fs)
        ch = self.coche(taille=0.4).next_to(lg, RIGHT, buff=0.25)
        self.play(Create(ch), run_time=0.3)
        self.attendre_voix()

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.65)
        po = Pose(["344", "358"], signe="+", origine=P(-4.1, 1.5), pas=0.46, hl=0.6, fs=40)
        res = nombre(po, "702", couleur=VERT_OK)
        fig = VGroup(po.ligne(0), po.ligne(1), po.signe, po.barre, res)
        lignes = self.finale_gauche(fig, textes=[
            ("On vérifie avec", "un ordre de grandeur."),
            ("On vérifie avec", "l'opération inverse :"),
            ("l'addition pour la soustraction,", "la multiplication pour la division.")], fs=34, x_fig=-4.6, xl=-2.4)
        self.add(fig)
        self.au_mot("On vérifie avec un")
        self.montrer_ligne(lignes[0], Indicate(res, color=VERT_OK, scale_factor=1.3))
        self.au_mot("On vérifie avec l")
        self.montrer_ligne(lignes[1], Indicate(po.signe, color=BLEU_CALCUL, scale_factor=1.6))
        self.au_mot("l'addition")
        self.montrer_ligne(lignes[2], Indicate(fig, color=AMBRE_D, scale_factor=1.05))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_ordre()
        self.ecran_question1()
        self.ecran_inverse()
        self.ecran_division()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")


class CalculPoseVerifier6e(CalculPoseVerifierBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"
