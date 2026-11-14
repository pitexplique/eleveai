# longueur_probleme.py
# EleveAI — Maths CE2 — série « Longueurs », épisode 07 : UN PROBLÈME DE LONGUEURS
# (micro ce2_longueur_probleme, notion longueur), AVEC VOIX. Paysage 16:9, CEINTURE ORANGE.
# Short jumeau : film Ti Margo (la corde à sauter, réponse B).
# Décor et métier : Jules, TECHNICIEN DE CONCERT (centre : musique) : câbles, enceintes, projecteurs.
# Mapping micro → écrans : 02 (convertir d'abord : 3 m = 300 cm), 03 (additionner : 300 + 250 = 550 cm
# = 5 m et 50 cm), 04 (piège : 3 + 250 = 253 ne veut rien dire), 06-06b (deux étapes : 200 − (65 + 45) = 90 cm),
# questions 05 (2 m + 40 cm = 240 cm : C) et 07 (1 m − 30 cm = 70 cm : A),
# défi 08 (1 m + 50 cm + 1 m = 250 cm).
# Voix : manim/voix/ce2-longueur-probleme.json (validée le 14/11, Julie, débit −6) ;
# marques : longueur_probleme_marques.json (python manim/scripts/ce2/perimetre_marques.py longueur:probleme).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/longueur_probleme.py LongueurProblemeCE2
# python -m manim render -qh --disable_caching manim/scripts/ce2/longueur_probleme.py LongueurProblemeCE2 -o eleveai-maths-ce2-longueur-probleme --media_dir manim/scripts/ce2/media-lg-07
# Sortie : manim/sorties/ce2/maths/longueur/07-probleme/eleveai-maths-ce2-longueur-probleme.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from longueur_ce2_commun import *  # noqa: E402,F403

CABLE1 = "#f97316"   # le câble de 3 m (orange)
CABLE2 = "#38bdf8"   # le câble de 250 cm (bleu ciel)
CABLE3 = "#a78bfa"   # le 3e câble du défi
CORDE = "#facc15"
ADHESIF = "#e5e7eb"
E = 0.012            # unités Manim par cm (300 cm = 3,6)


def cable(L, couleur, ep=0.18):
    """Un câble : une bande colorée et une fiche à chaque bout."""
    c = ruban(L, couleur, ep, sw=1.5)
    f1 = RoundedRectangle(width=0.16, height=ep * 1.7, corner_radius=0.04, fill_color="#9ca3af", fill_opacity=1,
                          stroke_width=0).next_to(c, LEFT, buff=0)
    f2 = f1.copy().next_to(c, RIGHT, buff=0)
    return VGroup(c, f1, f2)


def enceinte(h=1.3):
    caisse = RoundedRectangle(width=h * 0.62, height=h, corner_radius=0.06, fill_color="#1f2937", fill_opacity=1,
                              stroke_color="#9ca3af", stroke_width=3)
    hp1 = Circle(radius=h * 0.2, color="#9ca3af", stroke_width=3).move_to(caisse.get_center() + DOWN * h * 0.15)
    hp2 = Circle(radius=h * 0.09, color="#9ca3af", stroke_width=3).move_to(caisse.get_center() + UP * h * 0.27)
    c1 = Dot(hp1.get_center(), radius=h * 0.05, color="#9ca3af")
    return VGroup(caisse, hp1, hp2, c1)


def projecteur(s=1.0, couleur="#fde047", angle=-0.35):
    corps = RoundedRectangle(width=0.55 * s, height=0.38 * s, corner_radius=0.08 * s, fill_color="#374151",
                             fill_opacity=1, stroke_color="#9ca3af", stroke_width=2)
    lentille = Circle(radius=0.12 * s, fill_color=couleur, fill_opacity=1, stroke_width=0)
    lentille.next_to(corps, DOWN, buff=-0.08 * s)
    faisceau = Polygon(lentille.get_center(), lentille.get_center() + P(-0.45 * s, -1.3 * s),
                       lentille.get_center() + P(0.45 * s, -1.3 * s), fill_color=couleur, fill_opacity=0.25,
                       stroke_width=0)
    g = VGroup(faisceau, corps, lentille)
    g.rotate(angle, about_point=corps.get_center())
    return g


def note(s=1.0, couleur="#f472b6"):
    tete = Ellipse(width=0.26 * s, height=0.19 * s, fill_color=couleur, fill_opacity=1, stroke_width=0)
    hampe = Line(tete.get_right() + LEFT * 0.02 * s, tete.get_right() + P(-0.02 * s, 0.55 * s), color=couleur,
                 stroke_width=4)
    return VGroup(tete, hampe)


def scene_concert(s=1.0):
    """Les lumières (2 projecteurs sur une barre) et les haut-parleurs (2 enceintes)."""
    barre_l = Line(P(-1.7 * s, 0), P(1.7 * s, 0), color="#9ca3af", stroke_width=6)
    p1 = projecteur(s, "#fde047", -0.4).next_to(barre_l, DOWN, buff=-0.05).shift(LEFT * 0.9 * s)
    p2 = projecteur(s, "#f472b6", 0.4).next_to(barre_l, DOWN, buff=-0.05).shift(RIGHT * 0.9 * s)
    return VGroup(barre_l, p1, p2)


class LongueurProblemeBase(PaysageLongueurCE2):
    nom_voix = "ce2-longueur-probleme"
    fichier_marques = "longueur_probleme_marques.json"
    ceinture = "orange"

    # Morceaux de réponse dont le nombre est REDIT plus de 1,5 s après sa 1re fois : la synchro par jetons
    # le croit « déjà dit » et l'affiche trop tôt → instant forcé (marques ajoutées, mesurées sur le WAV).
    _forces = {("05b-reponse", "200 +"): 4.12, ("07b-reponse", "100 −"): 3.82,
               ("04-piege", "3 m = 300 cm"): 0.0}  # (rappel du dessin, posé avec la phrase)

    def _attente(self, textes):
        for f in textes:
            t = self._forces.get((getattr(self, "_cle_voix", None), getattr(f, "original_text", None)))
            if t is not None:
                return max(0.0, self._debut_voix + t - self.renderer.time)
        return super()._attente(textes)

    def a_l_instant(self, t):
        """Attendre l'instant t (s) de la voix de l'écran : pour un mot SANS marque (TTS), mesuré sur le WAV."""
        reste = self._debut_voix + t - self.renderer.time
        if reste > 0.05:
            self.wait(reste)

    def poser(self, m, run_time=0.25):
        for f in m.get_family():
            f.sans_synchro = True
        self.play(FadeIn(m, shift=UP * 0.08), run_time=run_time)

    def deux_cables(self, y, x0=-2.4, lab=True):
        c1 = cable(300 * E, CABLE1)
        c2 = cable(250 * E, CABLE2)
        VGroup(c1, c2).arrange(RIGHT, buff=0.04).move_to(P(0, y)).align_to(P(x0, 0), LEFT)
        e1 = etiq(c1, "3 m", 32, CABLE1, UP, 0.15)
        e2 = etiq(c2, "250 cm", 32, CABLE2, UP, 0.15)
        return c1, c2, e1, e2

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Un problème de longueurs", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Un problème de longueurs")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.bloc(["Combien de câble", "pour la scène ?"], 40, JAUNE_TITRE, buff=0.22)
        q.move_to(P(0, 0.4)).align_to(P(-6.2, 0), LEFT)
        en = enceinte(1.4).move_to(P(4.9, 0.5))
        c = cable(2.6, CABLE1).move_to(P(2.2, -0.1))
        self.au_mot("Combien de câble")
        self.play(FadeIn(q, shift=UP * 0.2), FadeIn(en, shift=LEFT * 0.3), GrowFromEdge(c, LEFT), run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 01 : Jules, technicien de concert ───────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = jules(0.95).move_to(P(-5.0, 0.6))
        self.au_mot("Voici Jules")
        nom = self.t("Jules", 42, JAUNE_TITRE).next_to(pe, UP, buff=0.55)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Il est technicien de concert")
        met = self.bloc(["technicien", "de concert"], 24, "#fdba74", buff=0.06).next_to(pe, DOWN, buff=0.12)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        sc = scene_concert(0.9).move_to(P(0.4, 2.3))
        self.au_mot("il installe les lumières")
        self.play(FadeIn(sc, shift=DOWN * 0.2), run_time=0.45)
        ens = VGroup(enceinte(1.1), enceinte(1.1)).arrange(RIGHT, buff=2.9).move_to(P(0.4, 1.75))
        nts = VGroup(note(0.8), note(0.8, "#38bdf8")).arrange(RIGHT, buff=0.35).next_to(ens[1], RIGHT, buff=0.3)
        self.au_mot("les haut-parleurs")
        self.play(FadeIn(ens, shift=UP * 0.2), FadeIn(nts, shift=UP * 0.2), run_time=0.45)
        c1, c2, e1, e2 = self.deux_cables(-0.4)
        self.au_mot("Pour brancher une enceinte")
        self.play(Indicate(ens[1], scale_factor=1.08), run_time=0.35)
        self.au_mot("3 mètres")
        self.play(GrowFromEdge(c1, LEFT), FadeIn(e1, scale=1.2), run_time=0.4)
        self.au_mot("250 centimètres")
        self.play(GrowFromEdge(c2, LEFT), FadeIn(e2, scale=1.2), run_time=0.4)
        q = self.t("Quelle longueur en tout ?", 40, JAUNE_TITRE)
        gauche(q, -2.4, -2.5)
        tout = accolade(VGroup(c1, c2), "?", 34, JAUNE_TITRE, dessus=False)
        self.au_mot("Quelle longueur en tout")
        self.play(FadeIn(q, scale=1.1), FadeIn(tout), run_time=0.4)
        self.attendre_voix()

    # ── 02 : convertir d'abord ──────────────────────────────────────────────
    def ecran_convertir(self):
        self.ecran("02-convertir")
        c1, c2, e1, e2 = self.deux_cables(1.4, x0=-4.6)
        self.au_mot("Les deux câbles")
        self.play(FadeIn(VGroup(c1, c2)), FadeIn(e1), FadeIn(e2), run_time=0.4)
        l0 = self.t("Pas la même unité !", 42, ROUGE_ERREUR)
        gauche(l0, -6.2, 3.0)
        self.au_mot("n'ont pas la même unité")
        self.play(FadeIn(l0, scale=1.1), Indicate(e1[-1:], color=ROUGE_ERREUR, scale_factor=1.6),
                  Indicate(e2[-2:], color=ROUGE_ERREUR, scale_factor=1.6), run_time=0.5)
        l1 = self.t("D'abord, on convertit :", 40, JAUNE_TITRE)
        gauche(l1, -6.2, -0.3)
        self.au_mot("D'abord, on convertit")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        c = self.ligne([("3 m", CABLE1), ("= 300 cm", VERT_OK)], 54, buff=0.3)
        gauche(c, -5.6, -1.6)
        hors_audit(c[0])  # « 3 » déjà écrit sur le câble : posé à « 3 mètres, c'est »
        self.aux_extraits([c[0]], [("3 mètres, c'est", 1)], run_time=0.3)
        self.au_mot("300 centimètres")
        e1b = hors_audit(Text("300 cm", font_size=32, color=CABLE1, weight=BOLD)).move_to(e1)
        self.play(FadeIn(c[1], shift=UP * 0.1), run_time=0.3)
        self.play(Transform(e1, e1b), run_time=0.45)
        self.insister(e1, 1.3, 0.25)
        self.attendre_voix()

    # ── 03 : additionner ────────────────────────────────────────────────────
    def ecran_additionner(self):
        self.ecran("03-additionner")
        self.au_mot("Puis on additionne")
        tit = self.t("Puis on additionne :", 42, JAUNE_TITRE)
        gauche(tit, -6.2, 3.0)
        b = barre([300, 250], 0.016, (CABLE1, CABLE2), h=0.6).move_to(P(-0.9, 1.4))
        t1 = hors_audit(self.t("300 cm", 30, BLACK)).move_to(b[0])
        t2 = hors_audit(self.t("250 cm", 30, BLACK)).move_to(b[1])
        self.play(FadeIn(tit, shift=UP * 0.1), FadeIn(b), FadeIn(t1), FadeIn(t2), run_time=0.4)
        c = self.ligne([("300", CABLE1), ("+ 250", CABLE2), ("= 550", VERT_OK)], 54, buff=0.3)
        gauche(c, -5.6, -0.2)
        tout = accolade(b, "550 cm", 34, VERT_OK, dessus=True)
        hors_audit(c[0])  # « 300 » écrit dans la barre : chaque morceau à SON nombre
        self.aux_extraits([c[0], c[1]], [("300 plus", 1), ("250, 550", 1)], run_time=0.25)
        self.aux_extraits([VGroup(c[2], tout)], [("550. Le", 1)], run_time=0.3)
        r = self.ligne([("Le câble mesure", WHITE), ("550 cm", VERT_OK)], 42, buff=0.3)
        gauche(r, -5.6, -1.3)
        self.au_mot("Le câble mesure")
        self.play(FadeIn(r[0], shift=UP * 0.1), run_time=0.3)
        hors_audit(r[1])  # « 550 » redit
        self.aux_extraits([r[1]], [("550 centimètres", 1)], run_time=0.3)
        r2 = self.ligne([("= 5 m", ORANGE_RETENUE), ("et 50 cm", ORANGE_RETENUE)], 42, buff=0.25)
        r2.next_to(r, DOWN, buff=0.4).align_to(r[1], LEFT)
        self.au_mot("5 mètres")
        self.play(FadeIn(r2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("et 50 centimètres")
        self.play(FadeIn(r2[1], shift=UP * 0.1), run_time=0.3)
        self.insister(r2, 1.15, 0.25)
        self.attendre_voix()

    # ── 04 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("04-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.0)
        self.play(Write(tit), run_time=0.35)
        l0 = self.ligne([("On n'additionne pas", WHITE), ("3", CABLE1), ("et", WHITE), ("250", CABLE2)], 38,
                        buff=0.22)
        gauche(l0, -6.2, 2.1)
        self.au_mot("On n'additionne pas")
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.3)
        c = self.ligne([("3", WHITE), ("+ 250", WHITE), ("= 253", ROUGE_ERREUR)], 54, buff=0.3)
        gauche(c, -5.6, 0.9)
        for m in c:
            hors_audit(m)  # le calcul s'écrit en même temps que la phrase : chaque nombre à SON mot
        self.aux_extraits([VGroup(l0[1], l0[2], c[0]), VGroup(l0[3], c[1])], [("3 et 250", 1), ("250 : ça", 1)],
                          run_time=0.2)
        self.aux_extraits([c[2]], [("253", 1)], run_time=0.3)
        x = croix_rouge(c)
        rien = self.t("Ça ne veut rien dire !", 36, ROUGE_ERREUR)
        gauche(rien, -5.6, 0.0)
        self.au_mot("ça ne veut rien dire")
        self.play(Create(x), FadeIn(rien, scale=1.1), run_time=0.45)
        # le dessin : un câble de 3 m est bien plus long que « 3 » de 250 !
        c1 = cable(300 * E, CABLE1)
        c2 = cable(250 * E, CABLE2)
        VGroup(c1, c2).arrange(RIGHT, buff=0.04).move_to(P(-1.2, -1.3))
        e1 = etiq(c1, "300 cm", 28, CABLE1, UP, 0.12)  # (3 m, déjà converti)
        e2 = etiq(c2, "250 cm", 28, CABLE2, UP, 0.12)
        for f in VGroup(e1, e2).get_family():
            f.sans_synchro = True  # rappel des nombres déjà dits
        l1 = self.t("On met d'abord tout dans la même unité.", 38, VERT_OK)
        gauche(l1, -6.2, -2.45)
        self.au_mot("On met d'abord tout")
        self.play(FadeIn(l1, shift=UP * 0.1), FadeIn(VGroup(c1, c2)), FadeIn(e1), FadeIn(e2), run_time=0.45)
        self.insister(e1, 1.2, 0.25)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse C) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        c1 = cable(200 * E, CABLE1)
        c2 = cable(40 * E, CABLE2)
        VGroup(c1, c2).arrange(RIGHT, buff=0.04).move_to(P(-4.2, 1.5))
        e1 = etiq(c1, "2 m", 30, CABLE1, UP, 0.12)
        e2 = etiq(c2, "40 cm", 30, CABLE2, UP, 0.12)

        def autres_q(sc):
            sc.play(GrowFromEdge(c1, LEFT), FadeIn(e1), run_time=0.35)
            sc.play(GrowFromEdge(c2, LEFT), FadeIn(e2), run_time=0.3)

        def apres(sc):
            sc.play(Indicate(VGroup(c1, c2), color=VERT_OK, scale_factor=1.06), run_time=0.25)

        self.question_gauche("05-question", "05b-reponse",
                             ["Jules met bout à bout un câble", "de 2 m et un câble de 40 cm.",
                              "Quelle longueur en tout ?"],
                             [self.choix("42 cm"), self.choix("60 cm"), self.choix("240 cm")], 2,
                             ["2 m = 200 cm.", "200 + 40 = 240 cm."],
                             -0.5, couper={0: ("2 m", "= 200 cm."), 1: ("200 +", "40", "= 240 cm.")},
                             mot_q="Jules met bout", autres_q=autres_q, autres_r=apres)

    # ── 06 : deux étapes : la corde ─────────────────────────────────────────
    def la_corde(self, y):
        b = barre([65, 45, 90], 0.045, ("#fb923c", "#f472b6", CORDE), h=0.5, inconnue=2).move_to(P(-0.4, y))
        return b

    def ecran_deux_etapes(self):
        self.ecran("06-deux-etapes")
        self.au_mot("Jules a une corde")
        pr = projecteur(1.1, "#fde047", 0).move_to(P(5.0, 2.2))
        l0 = self.ligne([("Une corde de", WHITE), ("2 m", CORDE)], 40, buff=0.25)
        gauche(l0, -6.2, 3.0)
        self.play(FadeIn(l0[0], shift=UP * 0.1), run_time=0.3)
        b = self.la_corde(1.4)
        tout = accolade(b, "2 m", 32, CORDE, dessus=True)
        corde = ruban(b.width, CORDE, 0.5).move_to(b)
        self.au_mot("2 mètres")
        self.play(FadeIn(l0[1], scale=1.2), GrowFromEdge(corde, LEFT), FadeIn(tout), run_time=0.45)
        self.au_mot("pour accrocher un projecteur")
        self.play(FadeIn(pr, shift=DOWN * 0.2), run_time=0.35)
        t1 = hors_audit(self.t("65 cm", 28, BLACK)).move_to(b[0])
        t2 = hors_audit(self.t("45 cm", 28, BLACK)).move_to(b[1])
        ciseaux1 = DashedLine(b[0].get_corner(UR) + UP * 0.25, b[0].get_corner(DR) + DOWN * 0.25, color=WHITE)
        ciseaux2 = DashedLine(b[1].get_corner(UR) + UP * 0.25, b[1].get_corner(DR) + DOWN * 0.25, color=WHITE)
        self.au_mot("65 centimètres")
        self.play(FadeIn(b[0]), FadeIn(t1), Create(ciseaux1), run_time=0.4)
        self.au_mot("45 centimètres")
        self.play(FadeIn(b[1]), FadeIn(t2), Create(ciseaux2), run_time=0.4)
        reste = Text("?", font_size=40, color=ORANGE_RETENUE, weight=BOLD).move_to(b[2])
        q = self.t("Combien en reste-t-il ?", 42, JAUNE_TITRE)
        gauche(q, -6.2, -0.4)
        self.au_mot("Combien en reste-t-il")
        self.play(FadeOut(corde), FadeIn(b[2]), FadeIn(reste, scale=1.3), FadeIn(q, scale=1.1), run_time=0.45)
        self.insister(reste, 1.4, 0.25)
        self.attendre_voix()

    def ecran_calcul(self):
        self.ecran("06b-calcul")
        b = self.la_corde(2.6)
        t1 = hors_audit(self.t("65 cm", 28, BLACK)).move_to(b[0])
        t2 = hors_audit(self.t("45 cm", 28, BLACK)).move_to(b[1])
        reste = hors_audit(Text("?", font_size=40, color=ORANGE_RETENUE, weight=BOLD)).move_to(b[2])
        self.add(b, reste)
        self.poser(VGroup(t1, t2), 0.15)  # (un Text ajouté par add() attend son nombre : on le pose)
        c0 = self.ligne([("2 m", CORDE), ("= 200 cm", VERT_OK)], 46, buff=0.3)
        gauche(c0, -6.2, 1.2)
        hors_audit(c0[0])
        self.au_mot("2 mètres, c'est")
        self.play(FadeIn(c0[0], shift=UP * 0.1), run_time=0.3)
        self.aux_extraits([c0[1]], [("200 centimètres", 1)], run_time=0.3)
        l1 = self.t("Coupés :", 40, GRAY_B)
        c1 = self.ligne([("65", "#fb923c"), ("+ 45", "#f472b6"), ("= 110", BLEU_D)], 46, buff=0.3)
        gauche(l1, -6.2, 0.1)
        c1.next_to(l1, RIGHT, buff=0.35)
        self.au_mot("Les morceaux coupés")
        self.play(FadeIn(l1, shift=UP * 0.1), Indicate(VGroup(b[0], b[1]), scale_factor=1.05), run_time=0.35)
        for m in c1:
            hors_audit(m)  # 65 et 45 sont écrits sur la corde : chaque morceau à SON nombre
        self.aux_extraits([c1[0], c1[1], c1[2]], [("65 plus", 1), ("45, 110", 1), ("110. Il", 1)], run_time=0.25)
        l2 = self.t("Il reste :", 40, GRAY_B)
        c2 = self.ligne([("200", VERT_OK), ("− 110", BLEU_D), ("= 90 cm", ORANGE_RETENUE)], 46, buff=0.3)
        gauche(l2, -6.2, -1.0)
        c2.next_to(l2, RIGHT, buff=0.35)
        self.au_mot("Il reste")
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        for m in c2:
            hors_audit(m)
        self.aux_extraits([c2[0], c2[1]], [("200 moins", 1), ("110, 90", 1)], run_time=0.25)
        r90 = hors_audit(self.t("90 cm", 28, BLACK)).move_to(b[2])
        self.aux_extraits([c2[2]], [("90 centimètres", 1)], run_time=0.3)
        self.play(Transform(reste, r90), b[2].animate.set_fill(opacity=0.9), run_time=0.4)
        self.insister(c2[2], 1.2, 0.25)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse A) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        rl = ruban(100 * 0.03, ADHESIF, 0.35).move_to(P(-4.0, 1.5))
        rouleau = VGroup(Circle(radius=0.42, fill_color=ADHESIF, fill_opacity=1, stroke_color="#9ca3af",
                                stroke_width=3),
                         Circle(radius=0.2, fill_color=BLACK, fill_opacity=1, stroke_color="#9ca3af",
                                stroke_width=2)).next_to(rl, LEFT, buff=-0.1)
        coupe = DashedLine(rl.get_left() + P(30 * 0.03, 0.4), rl.get_left() + P(30 * 0.03, -0.4),
                           color=ROUGE_ERREUR)
        e = etiq(rl, "1 m", 30, ADHESIF, UP, 0.15)

        def autres_q(sc):
            sc.play(FadeIn(rouleau), GrowFromEdge(rl, LEFT), FadeIn(e), run_time=0.4)

        def apres(sc):
            sc.play(Create(coupe), Indicate(rl, color=VERT_OK, scale_factor=1.04), run_time=0.3)

        self.question_gauche("07-question", "07b-reponse",
                             ["Jules a 1 m de ruban adhésif.", "Il en utilise 30 cm.",
                              "Combien en reste-t-il ?"],
                             [self.choix("70 cm"), self.choix("29 cm"), self.choix("130 cm")], 0,
                             ["1 m = 100 cm.", "100 − 30 = 70 cm."],
                             -0.5, couper={0: ("1 m", "= 100 cm."), 1: ("100 −", "30", "= 70 cm.")},
                             mot_q="Jules a 1", autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi : trois câbles ─────────────────────────────────────────
    def trois_cables(self, ech=0.02):
        cs = VGroup(cable(100 * ech, CABLE1), cable(50 * ech, CABLE2), cable(100 * ech, CABLE3))
        cs.arrange(RIGHT, buff=0.04)
        return cs

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        l0 = self.t("Jules pose trois câbles bout à bout :", 36, JAUNE_TITRE)
        gauche(l0, -6.2, 2.3)
        self.au_mot("Jules pose trois câbles")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        cs = self.trois_cables(0.03).move_to(P(-0.6, 0.9))
        labs = [etiq(cs[0], "1 m", 34, CABLE1, UP, 0.15), etiq(cs[1], "50 cm", 34, CABLE2, UP, 0.15),
                etiq(cs[2], "1 m", 34, CABLE3, UP, 0.15)]
        for c, lab, ex in zip(cs, labs, (("1 mètre,", 1), ("50 centimètres", 1), ("1 mètre.", 1))):
            self.au_mot(*ex)
            self.wait(0.07)
            self.play(GrowFromEdge(c, LEFT), FadeIn(lab, scale=1.2), run_time=0.35)
        q = self.bloc(["Quelle longueur en tout,", "en centimètres ?"], 38, JAUNE_TITRE, buff=0.12)
        gauche(q, -6.2, -1.0)
        tout = accolade(cs, "?", 34, JAUNE_TITRE, dessus=False)
        self.au_mot("Quelle longueur en tout")
        self.play(FadeIn(q, scale=1.05), FadeIn(tout), run_time=0.4)
        self.pause_defi(y=-2.5)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        cs = self.trois_cables(0.022).move_to(P(3.3, 1.9))
        labs = VGroup(etiq(cs[0], "100 cm", 24, CABLE1, UP, 0.12), etiq(cs[1], "50 cm", 24, CABLE2, UP, 0.12),
                      etiq(cs[2], "100 cm", 24, CABLE3, UP, 0.12))
        self.add(cs)
        c0 = self.ligne([("1 m", CABLE1), ("= 100 cm", VERT_OK)], 44, buff=0.3)
        gauche(c0, -6.2, 2.2)
        hors_audit(c0[0])
        self.au_mot("1 mètre, c'est")
        self.play(FadeIn(c0[0], shift=UP * 0.1), run_time=0.3)
        self.aux_extraits([VGroup(c0[1], labs)], [("100 centimètres", 1)], run_time=0.3)
        c1 = self.ligne([("100", CABLE1), ("+ 50", CABLE2), ("= 150", BLEU_D)], 44, buff=0.3)
        gauche(c1, -6.2, 1.1)
        c2 = self.ligne([("150", BLEU_D), ("+ 100", CABLE3), ("= 250", VERT_OK)], 44, buff=0.3)
        gauche(c2, -6.2, 0.0)
        for m in list(c1) + list(c2):
            hors_audit(m)  # les nombres sont redits : chaque morceau à SON instant
        # « 100 plus » n'avait pas de marque (TTS) : marque ajoutée à la main (4,78 s, mesurée sur le WAV)
        self.aux_extraits([c1[0], c1[1], c1[2]], [("100 plus", 1), ("50, 150", 1), ("150. 150", 1)], run_time=0.25)
        self.aux_extraits([c2[0], c2[1], c2[2]], [("150 plus", 1), ("100, 250", 1), ("250. Les", 1)],
                          run_time=0.25)
        tout = accolade(cs, "250 cm", 30, VERT_OK, dessus=False)
        r = self.ligne([("Les câbles mesurent", WHITE), ("250 cm", VERT_OK)], 40, buff=0.3)
        gauche(r, -6.2, -1.15)
        self.au_mot("Les câbles mesurent")
        self.play(FadeIn(r[0], shift=UP * 0.1), run_time=0.3)
        hors_audit(r[1])
        self.aux_extraits([VGroup(r[1], tout)], [("250 centimètres", 1)], run_time=0.3)
        r2 = self.ligne([("= 2 m", ORANGE_RETENUE), ("et 50 cm", ORANGE_RETENUE)], 40, buff=0.25)
        r2.next_to(r, DOWN, buff=0.35).align_to(r[1], LEFT)
        self.au_mot("2 mètres")
        self.play(FadeIn(r2[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("et 50 centimètres")
        self.play(FadeIn(r2[1], shift=UP * 0.1), run_time=0.3)
        self.insister(r2, 1.15, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        fig = VGroup(cable(1.9, CABLE1), cable(1.4, CABLE2)).arrange(DOWN, buff=0.35, aligned_edge=LEFT)
        lignes = self.finale_gauche(fig, textes=[
            ("Dans un problème de longueurs :", "tout dans la même unité,", "souvent en centimètres."),
            ("Puis on calcule,", "étape par étape."),
            ("1 m = 100 cm",)], fs=32)
        self.add(fig)
        self.au_mot("Dans un problème de longueurs")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.au_mot("Puis on calcule")
        self.montrer_ligne(lignes[1])
        self.au_mot("1 mètre, c'est 100")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_convertir()
        self.ecran_additionner()
        self.ecran_piege()
        self.ecran_question1()
        self.ecran_deux_etapes()
        self.ecran_calcul()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


def croix_rouge(m, sw=8):
    return VGroup(Line(m.get_corner(UL), m.get_corner(DR), color=ROUGE_ERREUR, stroke_width=sw),
                  Line(m.get_corner(DL), m.get_corner(UR), color=ROUGE_ERREUR, stroke_width=sw))


class LongueurProblemeCE2(LongueurProblemeBase):
    identite = "Maths CE2 — EleveAI"
    ceinture = "orange"
