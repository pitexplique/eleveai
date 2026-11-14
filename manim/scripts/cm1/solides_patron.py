# solides_patron.py
# EleveAI — Maths CM1 — série « Solides et espace », épisode 02 : RECONNAÎTRE UN PATRON
# (micro solide_patron, notion solides), AVEC VOIX. Paysage 16:9, CEINTURE VERTE.
# Va plus loin que le CE2 (le patron du cube en croix : vidéo CE2 « patron » par `aussi` si besoin).
# Short jumeau : film Ti Margo (le dé mal numéroté : réponse C).
# Décor et métier : Rose, CRÉATRICE DE JEUX DE SOCIÉTÉ (centres : jeux-defis, art-design).
# Mapping micro → écrans : 02 (d'autres patrons du cube, 11 en tout), 03 (plier dans sa tête),
# 04 (patrons du pavé, de la pyramide, du cylindre), 06 (le dé : faces opposées = 7), 07 (piège :
# deux carrés qui se touchent sont voisins), questions 05 (patron du cylindre, rép. B) et 08 (en face
# du 2, rép. C), défi 09 (numéroter le patron du dé : 6, 5, 4).
# Voix : manim/voix/cm1-solides-patron.json (validée le 14/11, Julie, débit −6).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/cm1/solides_patron.py SolidesPatronCM1
# python -m manim render -qh --disable_caching manim/scripts/cm1/solides_patron.py SolidesPatronCM1 -o eleveai-maths-cm1-solides-patron --media_dir manim/scripts/cm1/media-sol-02
# Sortie : manim/sorties/cm1/maths/solides/02-patron/eleveai-maths-cm1-solides-patron.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from solides_cm1_commun import *  # noqa: E402,F403

FOND = "#38bdf8"
COTE = "#a3e635"
COUV = "#f472b6"
DE = "#f8fafc"
PAIRES = ["#f97316", "#a78bfa", "#22c55e"]  # 1-6, 2-5, 3-4

# les 11 patrons du cube (cellule (colonne, rangée), rangée 0 en bas)
ONZE = ([[(0, 1), (1, 1), (2, 1), (3, 1), (a, 2), (b, 0)] for a, b in ((0, 0), (0, 1), (0, 2), (0, 3), (1, 1), (1, 2))]
        + [[(0, 2), (1, 2), (1, 1), (2, 1), (3, 1), (c, 0)] for c in (1, 2, 3)]
        + [[(0, 0), (1, 0), (1, 1), (2, 1), (2, 2), (3, 2)], [(0, 1), (1, 1), (2, 1), (2, 0), (3, 0), (4, 0)]])


def plat(cases, cote=0.3, centre=ORIGIN, couleur=CARTON):
    return patron_plat({k: c for k, c in enumerate(cases)}, cote, centre, couleur)


class SolidesPatronBase(PaysageSolidesCM1):
    nom_voix = "cm1-solides-patron"
    fichier_marques = "solides_patron_marques.json"

    def plier_tout(self, pa, ordre, run_time=2.4, rt_tilt=0.7):
        """ordre : liste d'étapes (noms des carrés qui se plient ensemble)."""
        self.play(pa.plier(tilt=0, run_time=rt_tilt))
        for etape in ordre:
            self.play(pa.plier({k: 90 for k in etape}, run_time=run_time / len(ordre)))

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Reconnaître un patron", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Reconnaître un patron")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        q = self.bloc(["Quel dessin à plat", "devient quel solide ?"], 40)
        gauche(q, -6.2, 0.6)
        pc, par, pli = patron_pyramide(1.0, 0.9)
        pa = PatronLibre(pc, par, e=0.75, centre=P(3.8, 0.7))
        self.au_mot("Quel dessin")
        self.play(FadeIn(q, shift=UP * 0.2), FadeIn(pa), run_time=0.5)
        self.play(pa.plier(tilt=0, run_time=0.6))
        self.play(pa.plier(pli, run_time=1.4))
        self.attendre_voix(marge=0.6)

    def ecran_situation(self):
        self.ecran("01-situation")
        rp = rose(1.0).move_to(P(-4.9, 0.2))
        self.au_mot("Voici Rose")
        nom = self.t("Rose", 42, BLEU_CALCUL).next_to(rp, UP, buff=0.2)
        self.play(FadeIn(rp, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("créatrice de jeux de société")
        met = self.bloc(["créatrice de", "jeux de société"], 28, BLEU_CALCUL).next_to(rp, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        de = cube(e=1.0, centre=P(-2.0, 1.6), couleur=DE, couleur_trait="#334155")
        pions = VGroup(*[Cone(0.3, 0.75, centre=P(0.2 + 0.75 * k, 1.5), couleur=c) for k, c in
                         enumerate(("#ef4444", "#3b82f6", "#22c55e"))])
        boite = pave(2.0, 0.7, 1.4, e=0.95, centre=P(4.2, 1.6), couleur=CARTON, couleur_trait="#fef3c7")
        for ob, mot, txt in ((de, "un dé", "un dé"), (pions, "des pions", "des pions"), (boite, "et une boîte", "une boîte")):
            lab = self.t(txt, 30).next_to(ob, DOWN, buff=0.2)
            self.au_mot(mot)
            self.play(FadeIn(ob, shift=DOWN * 0.2), FadeIn(lab), run_time=0.4)
        self.au_mot("Chaque pièce commence par un patron")
        g = self.gros("Chaque pièce commence par un patron.", couleur=JAUNE_TITRE, fs=34).move_to(P(1.0, -1.6))
        self.play(FadeIn(g, scale=1.15), run_time=0.45)
        self.attendre_voix()

    # ── 02 : d'autres patrons du cube ───────────────────────────────────────
    def ecran_autres(self):
        self.ecran("02-autres-cube")
        l0 = self.ligne([("Le patron du cube a", WHITE), ("6 carrés.", WHITE)], 34, buff=0.2)
        gauche(l0, -6.2, 3.05)
        self.aux_extraits(l0, ["Le patron du cube a", "6 carrés"])
        cr = patron_plat("croix", 0.42, P(-5.0, 0.9))
        self.au_mot("La croix n'est pas le seul")
        l1 = self.t("La croix n'est pas le seul !", 34, JAUNE_TITRE)
        gauche(l1, -6.2, 2.3)
        self.play(FadeIn(cr), FadeIn(l1, shift=UP * 0.1), run_time=0.4)
        pd = Patron("decale", e=0.55, centre=P(-1.2, 0.6))
        pe = Patron("escalier", e=0.55, centre=P(3.6, 0.6))
        self.au_mot("une bande de 4 carrés")
        t1 = self.bloc(["une bande de 4,", "un au-dessus, un au-dessous"], 26, COTE).next_to(pd, DOWN, buff=0.25)
        self.play(FadeIn(pd), FadeIn(t1[0]), run_time=0.4)
        self.au_mot("un carré au-dessus")
        self.play(FadeIn(t1[1]), run_time=0.3)
        self.au_mot("décalés")
        self.plier_tout(pd, [["b0", "b2"], ["haut", "bas"], ["b3"]], 0.6, 0.25)
        self.au_mot("et un escalier")
        t2 = self.t("un escalier", 28, COTE).next_to(pe, DOWN, buff=0.25)
        self.play(FadeIn(pe), FadeIn(t2), run_time=0.4)
        self.plier_tout(pe, [["b", "d"], ["a", "e"], ["f"]], 0.6, 0.25)
        self.au_mot("Il y a 11 patrons")
        onze = VGroup(*[plat(c, 0.26) for c in ONZE]).arrange_in_grid(2, 6, buff=(0.45, 0.4)).move_to(P(-0.4, 0.6))
        g = self.gros("11 patrons du cube en tout", couleur=JAUNE_TITRE, fs=34).move_to(P(-0.4, -1.9))
        self.play(*[FadeOut(m) for m in (cr, pd, pe, t1, t2, l1)], FadeIn(g), run_time=0.3)
        self.play(LaggedStart(*[FadeIn(o, scale=0.6) for o in onze], lag_ratio=0.08), run_time=0.9)
        self.attendre_voix()

    # ── 03 : plier dans sa tête ─────────────────────────────────────────────
    def ecran_plier(self):
        self.ecran("03-plier")
        pa = Patron("decale", e=0.8, centre=P(-3.6, 0.5))
        self.add(pa)
        x = -0.4
        self.au_mot("on plie dans sa tête")
        tit = self.t("On plie dans sa tête :", 38, JAUNE_TITRE)
        gauche(tit, x, 2.7)
        self.play(Write(tit), run_time=0.4)
        self.au_mot("On choisit un carré pour le fond")
        l1 = self.t("un carré pour le fond,", 30, FOND)
        gauche(l1, x, 1.8)
        pa.couleurs["fond"] = FOND
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.play(pa.plier(tilt=0, run_time=0.8))
        self.au_mot("Les carrés qui le touchent se relèvent")
        l2 = self.t("ceux qui le touchent se relèvent,", 28, COTE)
        gauche(l2, x, 1.1)
        pa.couleurs.update({"b0": COTE, "b2": COTE})
        self.play(FadeIn(l2, shift=UP * 0.1), run_time=0.3)
        self.play(pa.plier({"b0": 90, "b2": 90}, run_time=0.9))
        self.play(pa.plier({"haut": 90, "bas": 90}, run_time=0.8))
        self.au_mot("Le dernier se rabat en couvercle")
        l3 = self.t("le dernier se rabat : le couvercle.", 28, COUV)
        gauche(l3, x, 0.4)
        pa.couleurs["b3"] = COUV
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.3)
        self.play(pa.plier({"b3": 90}, run_time=0.9))
        self.au_mot("Si deux carrés arrivent au même endroit")
        bl = Patron("bloc", e=0.55, centre=P(2.6, -1.6))
        l4 = self.bloc(["Deux carrés au même endroit :", "ce n'est pas un patron."], 28, ROUGE_ERREUR)
        gauche(l4, -6.2, -2.4)
        self.play(FadeIn(bl), FadeIn(l4[0], shift=UP * 0.1), run_time=0.35)
        self.play(bl.plier({"a": 90, "c": 90, "e": 90, "d": 90, "f": 90}, tilt=0, run_time=1.0))
        dbl = VGroup(bl.contour_carre("a", ROUGE_ERREUR, 8), bl.contour_carre("d", ROUGE_ERREUR, 8))
        self.au_mot("ce n'est pas un patron")
        self.play(Create(dbl), FadeIn(l4[1], shift=UP * 0.1), run_time=0.4)
        self.attendre_voix()

    # ── 04 : chaque solide a son patron ─────────────────────────────────────
    def ecran_solides(self):
        self.ecran("04-solides")
        self.au_mot("Chaque solide a son patron")
        tit = self.t("Chaque solide a son patron", 42, JAUNE_TITRE).move_to(P(0, 3.1))
        self.play(Write(tit), run_time=0.4)
        pc, par, pli = patron_pave(1.3, 0.8, 0.55)
        pv = PatronLibre(pc, par, e=0.8, centre=P(-4.5, 0.6), couleur="#60a5fa")
        self.au_mot("Le pavé droit")
        t1 = self.t("Le pavé droit :", 30, "#60a5fa").move_to(P(-4.5, -1.5))
        self.play(FadeIn(pv), FadeIn(t1), run_time=0.35)
        l1 = self.ligne([("6 rectangles,", WHITE)], 28).next_to(t1, DOWN, buff=0.12)
        self.aux_extraits(l1, ["6 rectangles"])
        l1b = self.t("pareils deux par deux", 26).next_to(l1, DOWN, buff=0.1)
        self.aux_extraits([l1b], ["pareils deux par deux"])
        self.play(pv.plier(tilt=0, run_time=0.5))
        self.play(pv.plier(pli, run_time=1.0))
        pc, par, pli2 = patron_pyramide(0.9, 0.85)
        py = PatronLibre(pc, par, e=0.8, centre=P(-0.5, 0.6), couleur="#facc15", couleurs={"base": "#fb923c"})
        self.au_mot("La pyramide à base carrée")
        t2 = self.t("La pyramide :", 30, "#facc15").move_to(P(-0.5, -1.5))
        self.play(FadeIn(py), FadeIn(t2), run_time=0.35)
        l2 = self.ligne([("un carré", WHITE), ("et 4 triangles", WHITE)], 28, buff=0.18)
        l2.arrange(DOWN, buff=0.1).next_to(t2, DOWN, buff=0.12)
        self.aux_extraits(l2, ["un carré", "4 triangles"])
        self.play(py.plier(tilt=0, run_time=0.5))
        self.play(py.plier(pli2, run_time=1.0))
        self.au_mot("Le cylindre")
        rect = Rectangle(width=2.8, height=1.4, fill_color="#c084fc", fill_opacity=0.9, stroke_color=WHITE,
                         stroke_width=4).move_to(P(3.6, 0.6))
        d1 = Circle(radius=0.45, fill_color="#e879f9", fill_opacity=0.9, stroke_color=WHITE, stroke_width=4) \
            .next_to(rect, UP, buff=0)
        d2 = d1.copy().next_to(rect, DOWN, buff=0)
        t3 = self.t("Le cylindre :", 30, "#c084fc").move_to(P(3.6, -1.5))
        self.play(FadeIn(VGroup(rect, d1, d2)), FadeIn(t3), run_time=0.35)
        l3 = self.ligne([("2 disques", WHITE), ("et un rectangle", WHITE)], 28, buff=0.18)
        l3.arrange(DOWN, buff=0.1).next_to(t3, DOWN, buff=0.12)
        self.aux_extraits(l3, ["2 disques", "un rectangle"])
        self.au_mot("qui s'enroule")
        cy = Cylindre(0.5, 1.4, centre=P(3.6, 0.6), couleur="#c084fc")
        self.play(ReplacementTransform(VGroup(rect, d1, d2), cy), run_time=1.0)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        cy = Cylindre(0.65, 1.5, centre=P(-4.4, 1.3), couleur="#c084fc")

        def autres_q(sc):
            sc.play(FadeIn(cy, shift=UP * 0.2), run_time=0.35)

        def apres(sc):
            lg = sc.rep_bas(0, [("Les 2 disques : le dessus", "#e879f9")], fs=30, y0=-1.4, pas=0.6)
            lgb = sc.rep_bas(1, [("et le dessous.", "#e879f9")], fs=30, y0=-1.4, pas=0.6)
            sc.aux_extraits([VGroup(lg[0], lgb[0])], [("Les 2 disques", 1, 0.2)])
            sc.play(FadeIn(cy.disque_haut("#e879f9")), FadeIn(cy.disque_bas("#e879f9")), run_time=0.3)
            lg2 = sc.rep_bas(2, [("Le rectangle s'enroule autour.", "#c084fc")], fs=30, y0=-1.4, pas=0.6)
            sc.au_mot("Le rectangle s'enroule")
            sc.play(FadeIn(lg2), Indicate(cy.corps, color=WHITE), run_time=0.35)
            lg3 = sc.rep_bas(3, [("1 carré et 4 triangles : la pyramide.", ORANGE_RETENUE)], fs=30, y0=-1.4, pas=0.6)
            sc.aux_extraits([lg3[0]], ["Le carré et les 4 triangles"])
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse",
                            ["Quel est le patron", "d'un cylindre ?"],
                            [self.choix("1 carré et 4 triangles", fs=24), self.choix("2 disques et 1 rectangle", fs=24),
                             self.choix("6 rectangles", fs=24)], 1,
                            ["Les 2 disques : le dessus et le dessous.", "Le rectangle s'enroule autour.",
                             "1 carré et 4 triangles : la pyramide."],
                            mot_q="Quel est le patron", autres_q=autres_q, autres_r=apres)

    # ── 06 : le dé ──────────────────────────────────────────────────────────
    def de_croix(self, e=0.85, centre=ORIGIN):
        pa = Patron("croix", e=e, centre=centre, couleur=DE)
        return pa

    def ecran_de(self):
        self.ecran("06-de")
        pa = self.de_croix(0.85, P(-3.8, 0.0))
        self.au_mot("le dé de Rose")
        self.play(FadeIn(pa), run_time=0.4)
        x = 0.2
        self.au_mot("deux faces opposées font toujours 7")
        l00 = self.t("Deux faces opposées", 30)
        gauche(l00, x, 2.85)
        l0 = self.ligne([("font toujours", WHITE), ("7.", JAUNE_TITRE)], 30, buff=0.18)
        gauche(l0, x, 2.3)
        self.play(FadeIn(l00, shift=UP * 0.1), FadeIn(l0[0], shift=UP * 0.1), run_time=0.3)
        self.aux_extraits([l0[1]], ["7. 1"])
        paires = [(("fond", "1"), ("couv", "6"), "1 en face de 6"), (("g", "2"), ("d", "5"), "2 en face de 5"),
                  (("av", "3"), ("ar", "4"), "3 en face de 4")]
        for k, ((c1, n1), (c2, n2), txt) in enumerate(paires):
            col = PAIRES[k]
            lg = self.ligne([(n1, col), ("en face de", col), (n2, col)], 32, buff=0.2)
            gauche(lg, x + 0.5, 1.6 - 0.62 * k)
            t1 = Text(n1, font_size=44, color="#1e293b", weight=BOLD).move_to(pa.centre_carre(c1))
            t2 = Text(n2, font_size=44, color="#1e293b", weight=BOLD).move_to(pa.centre_carre(c2))
            f1 = pa.contour_carre(c1, col, 9)
            f2 = pa.contour_carre(c2, col, 9)
            self.aux_extraits([VGroup(lg[0], t1, f1)], [(n1 + " en face", 1)])
            self.play(FadeIn(lg[1]), run_time=0.2)
            self.aux_extraits([VGroup(lg[2], t2, f2)], [n2 if k < 2 else "4. Sur"])
        self.au_mot("Sur le patron")
        l4 = self.bloc(["Sur le patron, deux faces opposées", "ne se touchent jamais :", "toujours un carré entre elles."],
                       26, VERT_OK)
        gauche(l4, x, -0.9)
        self.play(FadeIn(l4[0], shift=UP * 0.1), FadeIn(l4[1], shift=UP * 0.1), run_time=0.3)
        self.au_mot("il y a toujours un carré entre elles")
        entre = pa.contour_carre("ar", WHITE, 11)
        self.play(FadeIn(l4[2], shift=UP * 0.1), Create(entre), run_time=0.45)
        self.play(Indicate(entre, color=VERT_OK), run_time=0.5)
        self.attendre_voix()

    # ── 07 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        pa = Patron("croix", e=0.85, centre=P(-3.6, -0.1), couleur=DE)
        pa.couleurs.update({"fond": ORANGE_RETENUE, "d": ORANGE_RETENUE})
        pa.maj()
        self.au_mot("Deux carrés qui se touchent")
        l0 = self.bloc(["Deux carrés qui se touchent", "sur le patron"], 30, ORANGE_RETENUE)
        gauche(l0, 0.2, 1.9)
        self.play(FadeIn(pa), FadeIn(l0, shift=UP * 0.1), run_time=0.4)
        self.au_mot("sont voisins sur le dé")
        l1 = self.t("sont voisins sur le dé.", 32, ORANGE_RETENUE)
        gauche(l1, 0.2, 0.85)
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        self.play(pa.plier(tilt=0, run_time=0.6))
        self.play(pa.plier({k: 90 for k in ("g", "d", "av", "ar", "couv")}, run_time=1.2))
        self.au_mot("Ils ne peuvent pas être opposés")
        l2 = self.bloc(["Ils ne peuvent pas", "être opposés !"], 34, ROUGE_ERREUR)
        gauche(l2, 0.4, -0.6)
        self.play(FadeIn(l2, scale=1.1), run_time=0.4)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        de = cube(e=1.3, centre=P(-4.3, 1.3), couleur=DE, couleur_trait="#334155")
        deux = Text("2", font_size=54, color="#1e293b", weight=BOLD).move_to(de.centre_face(0))
        hors_audit(deux)

        def autres_q(sc):
            sc.play(FadeIn(de, shift=UP * 0.2), FadeIn(deux), run_time=0.35)

        def apres(sc):
            lg = sc.rep_bas(0, [("Deux faces opposées font", VERT_OK), ("7 :", VERT_OK)], fs=32, buff=0.18)
            sc.au_mot("Deux faces opposées font")
            sc.play(FadeIn(lg[0]), run_time=0.25)
            sc.aux_extraits([lg[1]], ["7 : 7"])
            lg2 = sc.rep_bas(1, ["7 − 2", "= 5."], fs=32, buff=0.2)
            sc.aux_extraits(lg2, [("7 moins 2", 1, 0.2), "5. Le"])
            lg3 = sc.rep_bas(2, [("Le 5 est en face du 2.", VERT_OK)], fs=32)
            sc.aux_extraits([lg3[0]], [("Le 5 est", 1)])
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse",
                            ["Sur un dé, quelle face", "est en face du 2 ?"],
                            [self.choix("le 3"), self.choix("le 6"), self.choix("le 5")], 2,
                            ["Deux faces opposées font 7 :", "7 − 2 = 5.", "Le 5 est en face du 2."],
                            mot_q="Sur un dé", autres_q=autres_q, autres_r=apres)

    # ── 09 : le défi ────────────────────────────────────────────────────────
    ECRITS = [("fond", "1"), ("b0", "2"), ("haut", "3")]
    VIDES = [("b3", "6", "fond"), ("b2", "5", "b0"), ("bas", "4", "haut")]

    def de_decale(self, e, centre):
        return Patron("decale", e=e, centre=centre, couleur=DE)

    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        pa = self.de_decale(0.85, P(-3.6, 0.3))
        self.au_mot("Rose a écrit")
        l0 = self.ligne([("Rose a écrit", WHITE), ("1,", WHITE), ("2", WHITE), ("et 3", WHITE)], 34, buff=0.2)
        gauche(l0, 0.2, 2.1)
        self.play(FadeIn(pa), FadeIn(l0[0]), run_time=0.4)
        nums = [Text(n, font_size=44, color="#1e293b", weight=BOLD).move_to(pa.centre_carre(c)) for c, n in self.ECRITS]
        self.aux_extraits([VGroup(l0[1], nums[0]), VGroup(l0[2], nums[1]), VGroup(l0[3], nums[2])],
                          ["1, 2", "2 et", "3 sur"])
        self.au_mot("Quels nombres")
        q = self.bloc(["Quels nombres dans", "les trois cases vides ?"], 36, JAUNE_TITRE)
        gauche(q, 0.2, 0.6)
        qm = VGroup(*[Text("?", font_size=44, color=ORANGE_RETENUE, weight=BOLD).move_to(pa.centre_carre(c))
                      for c, _, _ in self.VIDES])
        self.play(FadeIn(q, shift=UP * 0.1), FadeIn(qm), run_time=0.4)
        self.au_mot("Mets pause")
        pz = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE)
        gauche(pz, 0.2, -1.0)
        self.play(Write(pz), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        pa = self.de_decale(0.85, P(-3.6, 0.3))
        nums = VGroup(*[hors_audit(Text(n, font_size=44, color="#1e293b", weight=BOLD).move_to(pa.centre_carre(c)))
                        for c, n in self.ECRITS])
        self.add(pa, nums)
        self.au_mot("On plie dans sa tête")
        l0 = self.t("On plie dans sa tête.", 32)
        gauche(l0, 0.2, 2.25)
        self.play(FadeIn(l0, shift=UP * 0.1), FadeOut(nums), run_time=0.3)
        self.play(pa.plier(tilt=0, run_time=0.3))
        self.play(pa.plier({k: 90 for k in pa.angles if k != "fond"}, run_time=0.7))
        self.play(pa.plier({k: 0 for k in pa.angles}, tilt=-90, run_time=0.5))
        self.add(nums)
        textes = [["La case au bout de la bande", "est en face du 1 :", "6"], ["En face du 2 :", "5"],
                  ["En face du 3 :", "4"]]
        mots = [("La case au bout", "en face du 1", "on écrit 6"), (None, "en face du 2", "5. La"),
                (None, "en face du 3", "4. Chaque")]
        y = 1.35
        for k, ((cv, n, ce), tx, (m0, m1, m2)) in enumerate(zip(self.VIDES, textes, mots)):
            col = PAIRES[k]
            if len(tx) == 3:
                lg0 = self.t(tx[0], 30, col)
                gauche(lg0, 0.2, y)
                self.au_mot(m0)
                self.play(FadeIn(lg0, shift=UP * 0.1), Create(pa.contour_carre(cv, col, 9)), run_time=0.3)
                y -= 0.6
            lg = self.ligne([(tx[-2], col), (tx[-1], VERT_OK)], 30, buff=0.2)
            gauche(lg, 0.2, y)
            if len(tx) == 2:
                self.au_mot("La case en face du 2" if k == 1 else "La dernière")
                self.play(Create(pa.contour_carre(cv, col, 9)), run_time=0.25)
            self.aux_extraits([VGroup(lg[0], pa.contour_carre(ce, col, 9))], [(m1, 1, 0.6)])
            n_t = Text(n, font_size=44, color=col, weight=BOLD).move_to(pa.centre_carre(cv))
            self.aux_extraits([VGroup(lg[1], n_t)], [(m2, 1, 0.55) if k == 0 else m2])
            y -= 0.75
        self.au_mot("Chaque paire fait 7")
        g = self.gros("Chaque paire fait 7.", couleur=VERT_OK, fs=34)
        gauche(g, 0.2, y - 0.2)
        self.play(FadeIn(g, scale=1.15), run_time=0.3)
        self.attendre_voix()

    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        pa = Patron("decale", e=0.5)
        lignes = self.finale_gauche(pa, textes=[
            ("Le cube a 11 patrons,", "pas seulement la croix."),
            ("Pour vérifier : on plie dans sa tête,", "un carré après l'autre."),
            ("Pavé : des rectangles ; pyramide :", "des triangles et une base ;", "cylindre : disques et rectangle.")],
            fs=30, x_fig=-5.0, xl=-2.6)
        pa.recaler()
        self.add(pa)
        self.au_mot("Le cube a 11 patrons")
        self.montrer_ligne(lignes[0])
        self.au_mot("Pour vérifier")
        self.montrer_ligne(lignes[1])
        self.au_mot("Et chaque solide a son patron")
        self.montrer_ligne(lignes[2])
        self.play(pa.plier(tilt=0, run_time=0.5))
        self.play(pa.plier({k: 90 for k in pa.angles if k != "fond"}, run_time=1.3))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_autres()
        self.ecran_plier()
        self.ecran_solides()
        self.ecran_question1()
        self.ecran_de()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class SolidesPatronCM1(SolidesPatronBase):
    identite = "Maths CM1 — EleveAI"
    ceinture = "verte"
