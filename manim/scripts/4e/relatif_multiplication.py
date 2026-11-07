# relatif_multiplication.py
# EleveAI — Maths 4e — série « Relatifs », épisode 03 : MULTIPLIER. PILOTE de la série.
# Paysage 16:9, AVEC VOIX, ceinture ORANGE. Micro : relatif_multiplication.
# Décor et métier : Léa, glaciologue. Centres : nature-ecologie, sciences.
# Écrans (micro relatif_multiplication partout) : garde (00) ; le glacier (01) ; perte répétée (02) ;
# la méthode (03) ; QUESTION 1 (03q) ; remonter le temps (04, 05) ; la suite (06) ; la table (07) ;
# le piège (08) ; QUESTION 2 (08q) ; défi (09) et correction (09b) ; ce que tu as appris (10) ; fin (11).
# Voix : manim/voix/4e-relatif-multiplication.json ; marques : relatif_multiplication_marques.json.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/relatif_multiplication.py RelatifMultiplication4e
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/relatif_multiplication.py RelatifMultiplication4e -o eleveai-maths-4e-relatif-multiplication --media_dir manim/scripts/4e/media-rel-03
# Sortie : manim/sorties/4e/maths/relatifs/03-multiplication/eleveai-maths-4e-relatif-multiplication.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))

from relatif_commun import *  # noqa: E402,F403


def lea(s=0.72):
    """Léa : l'anorak et le bonnet de glaciologue."""
    p = personne(peau="#c68642", tenue="#0ea5e9", cheveux="#3f2a14", longs=True, s=s)
    bonnet = RoundedRectangle(width=0.82 * s, height=0.26 * s, corner_radius=0.1, fill_color="#f97316", fill_opacity=1, stroke_width=0)
    bonnet.move_to(p.get_top() + DOWN * 0.08 * s)
    return VGroup(p, bonnet)


class RelatifMultiplication4e(PaysageRel):
    nom_voix = "4e-relatif-multiplication"
    fichier_marques = "relatif_multiplication_marques.json"
    ceinture = "orange"

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Multiplier des nombres relatifs", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Multiplier", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        g = Glacier(w=3.6, h=2.2, niveau=0.4, centre=P(-4.7, 0.3))
        l1 = self.lg("Pourquoi moins par moins,", 2.0, 0.75, 42, maxw=8)
        self.dit(l1, "Pourquoi moins par moins,", avec=[FadeIn(g)])
        l2 = self.lg("ça fait plus ?", 2.0, -0.1, 50, JAUNE_TITRE, maxw=8)
        self.dit(l2, "ça fait plus ?")
        self.insister(l2, 1.15, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : le glacier ─────────────────────────────────────────────────────
    def ecran_glacier(self):
        self.ecran("01-glacier")
        p = lea().move_to(P(-5.9, 2.4))
        g = Glacier(w=5.4, h=3.3, niveau=0.9, centre=P(-3.55, -0.6))
        self.dit(self.lg("Léa est glaciologue :", 3.2, 3.05, 40, CIEL), "Léa est glaciologue :", avec=[FadeIn(p, shift=UP * 0.3)])
        self.dit(self.lg("elle mesure les glaciers.", 3.2, 2.4, 36), "elle mesure les glaciers.", avec=[FadeIn(g)])
        l = self.lg("Celui-ci perd 4 mètres", 3.2, 1.6, 36)
        self.dit(l, "Celui-ci perd 4 mètres", avec=[Transform(g.glace, g.glace_a(0.45), run_time=0.9)])
        self.dit(self.lg("d'épaisseur par an.", 3.2, 1.0, 36), "d'épaisseur par an.")
        e = F("Perdre, c'est −4.", 44).move_to(P(3.2, 0.15))
        self.dit(e, "Perdre, c'est moins 4.")
        self.insister(e.atomes[-2], 1.4, 0.18)
        self.dit(self.lg("Dans 3 ans, de combien", 3.2, -0.75, 36), "Dans 3 ans, de combien")
        self.dit(self.lg("aura-t-il changé ?", 3.2, -1.35, 36), "aura-t-il changé ?", avec=[Transform(g.glace, g.glace_a(-0.45), run_time=0.9)])
        c = F("(−4) × 3", 66).move_to(P(2.4, -2.5))
        self.dire_eq(c, "Moins 4 fois 3.")
        self.insister(c, 1.1, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 02 : une perte répétée ──────────────────────────────────────────────
    def ecran_repetee(self):
        self.ecran("02-differents")
        fr = Frise(range(4), 4, x0=-5.4, y0=-2.0, pas=1.45, base=0.8, k=0.15,
                   etiquettes={0: "maintenant", 1: "1 an", 2: "2 ans", 3: "3 ans"})
        for t in fr.temps:
            fr.lab[t].scale(0.85 if t else 0.72)
        self.play(FadeIn(fr.axe), FadeIn(fr.barre[0]), FadeIn(fr.lab[0]), run_time=0.3)
        self.dit(self.lg("Une perte répétée 3 fois :", 3.3, 2.9, 40, CIEL, maxw=6.2), "Une perte répétée 3 fois :")
        h0 = DashedLine(P(fr.x(0) + 0.5, fr.y(0)), P(fr.x(3) + 0.5, fr.y(0)), color="#94a3b8", stroke_width=3)
        self.play(Create(h0), run_time=0.15)
        for t in (1, 2, 3):
            self.au_mot("moins 4", t)
            fl = Arrow(P(fr.x(t), fr.y(t - 1)), P(fr.x(t), fr.y(t)), color=NEG, buff=0, stroke_width=7, max_tip_length_to_length_ratio=0.3)
            tg = F("−4", 34).sans_audit().next_to(fl, UP, buff=0.04)
            ligne = F("−4", 54).sans_audit().move_to(P(1.2 + 1.5 * (t - 1), 1.95))
            self.play(FadeIn(fr.barre[t], shift=DOWN * 0.1), FadeIn(fr.lab[t]), GrowArrow(fl), FadeIn(tg), FadeIn(ligne, scale=1.3), run_time=0.3)
        tot = F("En tout, −12.", 46).move_to(P(3.3, 0.85))
        self.dit(tot, "En tout, moins 12.")
        ac = DoubleArrow(P(fr.x(3) + 0.72, fr.y(0)), P(fr.x(3) + 0.72, fr.y(3)), color=NEG, buff=0, stroke_width=5, tip_length=0.16)
        self.play(GrowFromCenter(ac), run_time=0.2)
        e = F("(−4) × 3 = −12", 54).move_to(P(3.3, -0.55))
        self.dire_eq(e, "Moins 4 fois 3 égale moins 12.")
        self.play(Create(self.cadre_ok(e, 0.18)), run_time=0.2)
        self.attendre_voix(marge=0.8)

    # ── 03 : la méthode ─────────────────────────────────────────────────────
    def ecran_methode(self):
        self.ecran("03-methode")
        c = F("(−4) × 3", 66).sans_audit().move_to(P(0, 3.0))
        self.play(FadeIn(c), run_time=0.2)
        self.dit(self.lg("La méthode :", -3.6, 1.95, 38, CIEL), "La méthode :")
        self.dit(self.lg("le signe d'abord.", -3.6, 1.35, 38, JAUNE_TITRE), "le signe d'abord.")
        s1, s2 = signe("−").move_to(P(-5.0, 0.2)), signe("+").move_to(P(-3.7, 0.2))
        self.play(TransformFromCopy(c.atomes[1], s1), FadeIn(s2, scale=1.3), run_time=0.35)
        self.dit(self.lg("Signes différents :", -3.3, -0.65, 34), "Signes différents :", avec=[Indicate(VGroup(s1, s2), color=WHITE, scale_factor=1.1)])
        fl = Arrow(P(-3.15, 0.2), P(-2.15, 0.2), color=WHITE, buff=0, stroke_width=5)
        s3 = signe("−", 0.42, 60).move_to(P(-1.55, 0.2))
        self.dit(self.lg("le résultat est négatif.", -3.3, -1.25, 34), "le résultat est négatif.", avec=[GrowArrow(fl), FadeIn(s3, scale=1.4)])
        self.dit(self.lg("Puis les distances à zéro :", 3.2, 1.95, 36, CIEL), "Puis les distances à zéro :")
        e = F("4 × 3 = 12", 62).move_to(P(3.2, 0.9))
        self.dire_eq(e, "4 fois 3, 12.")
        r = F("Résultat : −12.", 58, VERT_OK).move_to(P(3.2, -0.5))
        self.dit(r, "Résultat : moins 12.")
        self.play(Create(self.cadre_ok(r, 0.2)), run_time=0.2)
        self.insister(r, 1.1, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 03q : QUESTION 1 ────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        fig = VGroup(*[Arrow(P(0, 0.7), P(0, -0.7), color=NEG, buff=0, stroke_width=8) for _ in range(6)]).arrange(RIGHT, buff=0.36).move_to(P(-3.4, 0.1))
        cad = Text("6 fois de suite", font_size=30, color=CIEL)
        cad.sans_synchro = True
        cad.next_to(fig, UP, buff=0.25)

        def avant(sc):
            sc.eq_dans_q(0, "Que vaut 6 × (−3) ?", "Que vaut 6 fois moins 3 ?")
            sc.play(LaggedStart(*[GrowArrow(a) for a in fig], lag_ratio=0.1), FadeIn(cad), run_time=0.4)

        def apres(sc):
            sc.reponse(("Réponse B : −18.", "Réponse B : moins 18."),
                       ("Signes différents, donc négatif.", "Signes différents, donc négatif."),
                       ("Et 6 × 3 = 18.", "Et 6 fois 3, 18."))

        self.question_pause("03q-question", "03r-reponse", ["Que vaut 6 × (−3) ?"],
                            [E("18", 40, lettres=""), E("−18", 40, lettres=""), E("3", 40, lettres="")], 1,
                            ["Réponse B : −18.", "Signes différents, donc négatif.", "Et 6 × 3 = 18."], avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 04 : remonter le temps ──────────────────────────────────────────────
    def frise_passe(self):
        return Frise([-2, -1, 0, 1], 5, x0=-5.6, y0=-2.2, pas=1.45, base=0.75, k=0.15,
                     etiquettes={-2: "−2", -1: "−1", 0: "0", 1: "1"})

    def ecran_passe(self):
        self.ecran("04-passe")
        fr = self.frise_passe()
        self.add(fr.axe)
        self.play(FadeIn(fr.barre[0]), FadeIn(fr.barre[1]), FadeIn(fr.lab[0]), FadeIn(fr.lab[1]), run_time=0.25)
        maint = T("maintenant", 24, CIEL, audit=False).next_to(fr.lab[0], DOWN, buff=0.12)
        self.add(maint)
        self.dit(self.lg("Maintenant, le mystère.", 3.3, 3.0, 42, JAUNE_TITRE, maxw=6.2), "Maintenant, le mystère.")
        self.dit(self.lg("Un autre glacier", 3.3, 2.25, 36), "Un autre glacier")
        e = F("perd 5 mètres par an : −5.", 36).move_to(P(3.3, 1.65))
        self.dit(e, "perd 5 mètres par an : moins 5.")
        fl = Arrow(P(fr.x(0) - 0.1, -3.25), P(fr.x(-2) - 0.1, -3.25), color=JAUNE_TITRE, buff=0, stroke_width=7)
        t2 = T("Remontons le temps.", 38, JAUNE_TITRE).move_to(P(3.3, 0.85))
        self.au("Remontons", FadeIn(t2, shift=LEFT * 0.3), GrowArrow(fl), rt=0.4)
        self.dit(self.lg("Il y a 2 ans,", 3.3, 0.15, 36), "Il y a 2 ans,")
        e = F("c'est le temps −2.", 36).move_to(P(3.3, -0.45))
        self.dit(e, "c'est le temps moins 2.", avec=[FadeIn(fr.lab[-1]), FadeIn(fr.lab[-2])])
        self.insister(fr.lab[-2], 1.8, 0.2)
        self.dit(self.lg("Il y a 2 ans, ce glacier", 3.3, -1.25, 36, CIEL), "Il y a 2 ans, ce glacier")
        q = T("?", 110, JAUNE_TITRE, audit=False, gras=True).move_to(P(fr.x(-2), -0.9))
        self.dit(self.lg("était-il plus épais,", 3.3, -1.85, 36, CIEL), "était-il plus épais,", avec=[FadeIn(q, scale=0.4)])
        self.dit(self.lg("ou moins épais ?", 3.3, -2.45, 36, CIEL, maxw=4.2), "ou moins épais ?")
        self.attendre_voix(marge=0.8)

    # ── 05 : le film à l'envers ─────────────────────────────────────────────
    def ecran_film(self):
        self.ecran("05-film")
        fr = self.frise_passe()
        self.add(fr.axe, fr.barre[0], fr.barre[1], *[fr.lab[t] for t in fr.temps])
        maint = T("maintenant", 24, CIEL, audit=False).next_to(fr.lab[0], DOWN, buff=0.12)
        self.add(maint)
        self.dit(self.lg("Plus épais, bien sûr :", 3.3, 3.0, 42, JAUNE_TITRE, maxw=6.2), "Plus épais, bien sûr :",
                 avec=[FadeIn(fr.barre[-1], shift=UP * 0.2), FadeIn(fr.barre[-2], shift=UP * 0.2)])
        self.dit(self.lg("il n'avait pas encore perdu", 3.3, 2.3, 34), "il n'avait pas encore perdu")
        self.dit(self.lg("ces 10 mètres.", 3.3, 1.75, 34), "ces 10 mètres.")
        h0 = DashedLine(P(fr.x(-2) - 0.5, fr.y(0)), P(fr.x(0) + 0.5, fr.y(0)), color="#94a3b8", stroke_width=3)
        ac = DoubleArrow(P(fr.x(-2), fr.y(0)), P(fr.x(-2), fr.y(-2)), color=VERT_OK, buff=0, stroke_width=6, tip_length=0.16)
        self.dit(self.lg("Il avait 10 mètres de plus.", 3.3, 1.2, 34, VERT_OK), "Il avait 10 mètres de plus.", avec=[Create(h0), GrowFromCenter(ac)])
        e = F("(−5) × (−2) = +10", 42).move_to(P(3.3, 0.05))
        self.dire_eq(e, "Moins 5 fois moins 2 égale plus 10.")
        e.atomes[-2].set_color(VERT_OK)
        e.atomes[-1].set_color(VERT_OK)
        self.play(Create(self.cadre_ok(e, 0.18)), run_time=0.2)
        self.insister(e, 1.08, 0.2)
        self.dit(self.lg("Une perte, en remontant le temps,", 3.3, -1.1, 32), "Une perte, en remontant le temps,")
        self.dit(self.lg("ça redonne de la glace.", 3.3, -1.65, 32, JAUNE_TITRE), "ça redonne de la glace.")
        self.attendre_voix(marge=0.8)

    # ── 06 : la suite ───────────────────────────────────────────────────────
    def ecran_suite(self):
        self.ecran("06-suite")
        self.dit(self.lg("Regarde aussi cette suite.", 0, 3.15, 40, JAUNE_TITRE, maxw=9), "Regarde aussi cette suite.")
        ys = (2.35, 1.3, 0.25, -0.8, -1.85)
        lignes = [("(−5) × 2 = −10", "Moins 5 fois 2 : moins 10."), ("(−5) × 1 = −5", "Fois 1 : moins 5."),
                  ("(−5) × 0 = 0", "Fois zéro : zéro."), ("(−5) × (−1) = 5", "fois moins 1 : 5."),
                  ("(−5) × (−2) = 10", "Fois moins 2 : 10.")]
        faites = []
        for i, ((s, ph), y) in enumerate(zip(lignes, ys)):
            e = F(s, 50).mis_sur_egal(-0.3, y)
            # le « (−5) » ne se répète pas à la voix : il part au premier mot dit
            sauf = e.atomes[:4] if i else []
            self.dire_eq(e, ph, sauf=sauf, echelle=1.15, avec=[FadeIn(a, scale=1.1) for a in sauf])
            if i >= 3:
                for a in e.atomes[e.atomes.index(e.egal) + 1:]:
                    a.set_color(VERT_OK)
            faites.append(e)
            if i == 2:
                # « À chaque ligne, on monte de 5 » : les flèches des trois premières lignes
                self.au("À chaque ligne", rt=0.1)
                self.mets_fleches(faites, ys, (0, 1))
                self.dit(self.lg("On monte de 5.", 5.15, 1.3, 36, VERT_OK, maxw=2.9), "on monte de 5.")
                self.dit(self.lg("Alors,", -5.95, ys[3], 36, CIEL, maxw=1.5), "Alors,")
        self.mets_fleches(faites, ys, (2, 3))
        self.dit(self.lg("La suite continue", 5.15, -0.5, 32, maxw=2.9), "La suite continue")
        self.dit(self.lg("toute seule.", 5.15, -1.05, 32, maxw=2.9), "toute seule.")
        self.attendre_voix(marge=0.8)

    def mets_fleches(self, faites, ys, idx):
        anims = []
        for k in idx:
            a = CurvedArrow(P(2.65, ys[k]), P(2.65, ys[k + 1]), angle=-1.2, color=VERT_OK, stroke_width=4, tip_length=0.14)
            anims += [Create(a), FadeIn(F("+5", 26, VERT_OK).sans_audit().move_to(P(3.2, (ys[k] + ys[k + 1]) / 2)))]
        self.play(*anims, run_time=0.25)

    # ── 07 : la table ───────────────────────────────────────────────────────
    def ecran_table(self):
        self.ecran("07-table")
        t = TableSignes(cote=1.35, centre=P(-3.5, -0.2))
        self.dit(self.lg("La règle des signes tient dans une table.", 0, 3.1, 40, JAUNE_TITRE, maxw=11), "La règle des signes tient dans une table.", avec=[FadeIn(t)])
        voix = self._texte_voix

        def cases(debut, *ij):
            """Les cases s'entourent à « debut », leur signe tombe au mot qui suit les deux-points."""
            p = voix.find(debut)
            self._attendre_pos(p)
            self.play(*[Circumscribe(t.fond[3 * (i + 1) + j + 1], color=WHITE, run_time=0.3) for i, j in ij], run_time=0.3)
            self._attendre_pos(voix.find(":", p) + 2)
            self.play(*[FadeIn(t.val[c], scale=1.6) for c in ij], run_time=0.2)

        cases("Plus par plus", (0, 0))
        cases("Moins par moins", (1, 1))
        cases("Plus par moins", (0, 1), (1, 0))
        l1 = self.lg("Deux signes identiques", 3.3, 1.35, 38)
        self.dit(l1, "Deux signes identiques", avec=[t.fond[4].animate.set_fill("#052e16", 1), t.fond[8].animate.set_fill("#052e16", 1)])
        self.dit(self.lg("donnent plus.", 3.3, 0.75, 38, VERT_OK), "donnent plus.")
        self.dit(self.lg("Deux signes différents", 3.3, -0.35, 38), "Deux signes différents", avec=[t.fond[5].animate.set_fill("#450a0a", 1), t.fond[7].animate.set_fill("#450a0a", 1)])
        self.dit(self.lg("donnent moins.", 3.3, -0.95, 38, PIEGE), "donnent moins.")
        self.attendre_voix(marge=0.8)

    # ── 08 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("08-piege")
        self.dit(self.lg("Le piège : appliquer cette table à une addition.", 0, 3.1, 40, PIEGE, maxw=11.5), "Le piège : appliquer cette table à une addition.")
        c1 = RoundedRectangle(width=6.0, height=1.5, corner_radius=0.14, stroke_color=VERT_OK, stroke_width=4, fill_color=FOND_CARTE, fill_opacity=1).move_to(P(-3.3, 1.6))
        e1 = F("(−5) × (−2) = 10", 42).move_to(c1)
        self.dire_eq(e1, "Moins 5 fois moins 2, c'est 10.", avec=[FadeIn(c1)], echelle=1.1)
        c2 = RoundedRectangle(width=6.0, height=1.5, corner_radius=0.14, stroke_color=PIEGE, stroke_width=4, fill_color=FOND_CARTE, fill_opacity=1).move_to(P(3.3, 1.6))
        e2 = F("(−5) + (−2) = −7", 42).move_to(c2)
        self.dire_eq(e2, "moins 5 plus moins 2, c'est moins 7.", avec=[FadeIn(c2)], echelle=1.1)
        d = Droite(-8, 2, -5.0, 5.0, -0.9, fs=34)
        s1, s2 = d.saut(0, -5), d.saut(-5, -7)
        self.play(FadeIn(d), Create(s1), run_time=0.25)
        self.play(Create(s2), run_time=0.2)
        self.dit(self.lg("La table, c'est seulement pour multiplier.", -0.6, -2.5, 40, JAUNE_TITRE, maxw=10.5), "La table, c'est seulement pour multiplier.")
        self.attendre_voix(marge=0.8)

    # ── 08q : QUESTION 2 ────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        t = TableSignes(cote=1.15, centre=P(-3.5, 0.0)).remplie()

        def avant(sc):
            sc.eq_dans_q(0, "Que vaut (−7) × (−1) ?", "Que vaut moins 7 fois moins 1 ?")
            sc.play(FadeIn(t), run_time=0.3)

        def apres(sc):
            sc.reponse(("Réponse B : 7.", "Réponse B : 7."),
                       ("Deux signes identiques : positif.", "Deux signes identiques : positif."),
                       ("Et 7 × 1 = 7.", "Et 7 fois 1, 7."))

        self.question_pause("08q-question", "08r-reponse", ["Que vaut (−7) × (−1) ?"],
                            [E("−7", 40, lettres=""), E("7", 40, lettres=""), E("−8", 40, lettres="")], 1,
                            ["Réponse B : 7.", "Deux signes identiques : positif.", "Et 7 × 1 = 7."], avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 09 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("09-defi")
        tit = T("À toi de jouer !", 56, JAUNE_TITRE).move_to(P(0, 2.9))
        self.au("À toi", Write(tit), rt=0.5)
        c1 = RoundedRectangle(width=6.0, height=1.8, corner_radius=0.14, stroke_color=NEG, stroke_width=4, fill_color=FOND_CARTE, fill_opacity=1).move_to(P(-3.3, 0.7))
        c2 = RoundedRectangle(width=6.0, height=1.8, corner_radius=0.14, stroke_color=NEG, stroke_width=4, fill_color=FOND_CARTE, fill_opacity=1).move_to(P(3.3, 0.7))
        e1, e2 = F("(−4) × (−3)", 46), F("(−1) × 9", 46)
        q1, q2 = T("= ?", 46, JAUNE_TITRE, audit=False), T("= ?", 46, JAUNE_TITRE, audit=False)
        VGroup(e1, q1).arrange(RIGHT, buff=0.25).move_to(c1)
        VGroup(e2, q2).arrange(RIGHT, buff=0.25).move_to(c2)
        self.dire_eq(e1, "Moins 4 fois moins 3.", echelle=1.1, avec=[FadeIn(c1)])
        self.play(FadeIn(q1), run_time=0.12)
        self.dire_eq(e2, "moins 1 fois 9.", echelle=1.1, avec=[FadeIn(c2)])
        self.play(FadeIn(q2), run_time=0.12)
        pz = T("Mets pause, et cherche !", 50, ORANGE_RETENUE).move_to(P(-0.4, -1.6))
        self.au("Mets pause", Write(pz), rt=0.5)
        self.attendre_voix(marge=2.0)

    # ── 09b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        self.ecran("09b-correction")
        self.au("Correction", FadeIn(T("Correction", 46, JAUNE_TITRE).move_to(P(0, 3.1))), rt=0.25)
        e1 = F("(−4) × (−3)", 54).sans_audit().move_to(P(-3.3, 2.15))
        e2 = F("(−1) × 9", 54).sans_audit().move_to(P(3.3, 2.15))
        self.au("Moins 4", FadeIn(e1), rt=0.2)
        self.dit(self.lg("signes identiques,", -3.3, 1.2, 34), "signes identiques,", avec=[FadeIn(signe("−").move_to(P(-4.0, 0.45))), FadeIn(signe("−").move_to(P(-2.6, 0.45)))])
        self.dit(self.lg("positif,", -3.3, -0.35, 34, VERT_OK), "positif,")
        r1 = F("12", 80, VERT_OK).move_to(P(-3.3, -1.3))
        self.dire_eq(r1, "positif, 12.", echelle=1.4)
        self.play(Create(self.cadre_ok(r1, 0.16)), run_time=0.15)
        self.au("Moins 1", FadeIn(e2), rt=0.2)
        self.dit(self.lg("signes différents,", 3.3, 1.2, 34), "signes différents,", avec=[FadeIn(signe("−").move_to(P(2.6, 0.45))), FadeIn(signe("+").move_to(P(4.0, 0.45)))])
        self.dit(self.lg("négatif,", 3.3, -0.35, 34, NEG), "négatif,")
        r2 = F("−9", 80, VERT_OK).move_to(P(3.3, -1.3))
        r2.set_color(VERT_OK)
        self.dire_eq(r2, "négatif, moins 9.", echelle=1.4)
        self.play(Create(self.cadre_ok(r2, 0.16)), run_time=0.15)
        self.attendre_voix(marge=1.0)

    # ── 10 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("10-finale", 0.5)
        self.XL = -1.5
        t = TableSignes(cote=1.15).remplie()
        lignes = self.finale_colonne([["Le signe d'abord,", "puis les distances à zéro."],
                                      ["Deux signes identiques", "donnent plus."],
                                      ["Deux signes différents", "donnent moins."]], fs=40, figure=t)
        self.XL = type(self).XL
        self.play(FadeIn(t), run_time=0.25)
        for lg in lignes:
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_glacier()
        self.ecran_repetee()
        self.ecran_methode()
        self.ecran_question1()
        self.ecran_passe()
        self.ecran_film()
        self.ecran_suite()
        self.ecran_table()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")
