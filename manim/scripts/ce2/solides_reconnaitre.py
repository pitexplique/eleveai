# solides_reconnaitre.py
# EleveAI — Maths CE2 — série « Solides et espace », épisode 01 : RECONNAÎTRE LES SOLIDES
# (micro ce2_solide_reconnaitre, notion solides), AVEC VOIX. Paysage 16:9, CEINTURE BLANCHE.
# Vidéo COMMUNE : sert aussi au CM1 (`aussi`).
# Short jumeau : film Ti Margo (le sac mystère : rond en bas, pointu en haut = un cône, réponse C).
# Décor et métier : Jade, VENDEUSE dans un magasin de jouets (centre : jeux-defis).
# Mapping micro → écrans : 02 (un solide a de l'épaisseur), 03 (cube), 04 (pavé droit), 06 (boule,
# cylindre : ils roulent), 07 (cône, pyramide : une pointe), 08 (piège cône / pyramide),
# questions 05 (brique de lait, rép. A) et 09 (cornet, rép. B), défi 10 (bille, cube, canette).
# Voix : manim/voix/ce2-solides-reconnaitre.json (validée le 14/11, Julie, débit −6).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/solides_reconnaitre.py SolidesReconnaitreCE2
# python -m manim render -qh --disable_caching manim/scripts/ce2/solides_reconnaitre.py SolidesReconnaitreCE2 -o eleveai-maths-ce2-solides-reconnaitre --media_dir manim/scripts/ce2/media-sol-01
# Sortie : manim/sorties/ce2/maths/solides/01-reconnaitre/eleveai-maths-ce2-solides-reconnaitre.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from solides_ce2_commun import *  # noqa: E402,F403

ROUGE_DE = "#ef4444"


def de(e=1.0, centre=ORIGIN, couleur="#f8fafc"):
    """Un dé : un cube blanc, des points noirs sur les trois faces vues (1, 2, 3)."""
    c = cube(e=e, centre=centre, couleur=couleur, couleur_trait="#94a3b8")
    pts = VGroup()
    r = 0.07 * e
    for k, uvs in ((0, [(0.5, 0.5)]), (3, [(0.28, 0.28), (0.72, 0.72)]), (5, [(0.25, 0.25), (0.5, 0.5), (0.75, 0.75)])):
        for u, v in uvs:
            pts.add(Dot(c.sur_face(k, u, v), radius=r, color="#111827"))
    c.add(pts)
    return c


def boite_jeu(e=1.0, centre=ORIGIN):
    b = pave(1.8, 0.55, 1.2, e=e, centre=centre, couleur="#16a34a")
    b.add(Polygon(*[b.sur_face(0, u, v) for u, v in ((0, 0.62), (1, 0.62), (1, 0.82), (0, 0.82))],
                  fill_color="#fde047", fill_opacity=1, stroke_width=0))
    return b


def brique(e=1.0, centre=ORIGIN):
    b = pave(0.8, 1.6, 0.6, e=e, centre=centre, couleur="#e0f2fe")
    b.add(Polygon(*[b.sur_face(0, u, v) for u, v in ((0, 0.25), (1, 0.25), (1, 0.6), (0, 0.6))],
                  fill_color="#2563eb", fill_opacity=1, stroke_width=0))
    return b


def ballon(r=0.7, centre=ORIGIN):
    b = Boule(r, centre=centre, couleur="#f97316", equateur=False)
    c = np.array(centre)
    b.add(Arc(radius=r, start_angle=-PI / 2, angle=PI, color="#111827", stroke_width=3).stretch(0.4, 0).move_to(c),
          Line(c + UP * r, c + DOWN * r, color="#111827", stroke_width=3))
    return b


def tambour(e=1.0, centre=ORIGIN):
    t = Cylindre(0.65, 0.9, e=e, centre=centre, couleur="#dc2626")
    b, h = t._bas, t._haut
    m = len(b)
    zig = [b[i] if j % 2 == 0 else h[i] for j, i in enumerate(range(m // 2 - 6, m - 2, 6))]
    if len(zig) > 1:
        t.add(VMobject(stroke_color="#fde047", stroke_width=3).set_points_as_corners(zig))
    return t


def chapeau_fete(e=1.0, centre=ORIGIN):
    c = Cone(0.55, 1.4, e=e, centre=centre, couleur="#a855f7")
    s = c._s
    c.add(VGroup(*[Dot(s + P(dx, dy) * e, radius=0.05 * e, color="#fde047")
                   for dx, dy in ((-0.1, -0.5), (0.12, -0.85), (-0.22, -1.1), (0.25, -1.25))]))
    c.add(Star(5, outer_radius=0.13 * e, color="#fde047", fill_opacity=1).move_to(s + UP * 0.1 * e))
    return c


def toit(e=1.0, centre=ORIGIN):
    return pyramide(4, 1.2, 1.1, e=e, centre=centre, couleur="#b91c1c")


def cornet(e=1.0, centre=ORIGIN):
    """Le cornet de glace : un cône pointe en bas, et une boule de glace dessus."""
    c = Cone(0.5, 1.5, e=e, couleur="#d97706").rotate(PI)
    g = Circle(radius=0.5 * e, fill_color="#f9a8d4", fill_opacity=1, stroke_color=WHITE, stroke_width=3) \
        .next_to(c, UP, buff=-0.25 * e)
    return VGroup(g, c).move_to(centre)


def canette(e=1.0, centre=ORIGIN):
    c = Cylindre(0.38, 0.95, e=e, centre=centre, couleur="#0ea5e9")
    return c


def etagere(y, x0=-0.6, x1=6.4):
    return Rectangle(width=x1 - x0, height=0.14, fill_color=BOIS, fill_opacity=1, stroke_width=0) \
        .move_to(P((x0 + x1) / 2, y))


class SolidesReconnaitreBase(PaysageSolidesCE2):
    nom_voix = "ce2-solides-reconnaitre"
    fichier_marques = "solides_reconnaitre_marques.json"

    def six(self, e=0.55):
        """Les six solides, en rang."""
        return VGroup(cube(e=e), pave(e=e, couleur="#a78bfa"), Boule(0.5, couleur="#3b82f6"),
                      Cylindre(e=e, couleur="#ef4444"), Cone(e=e, couleur="#22c55e"),
                      pyramide(4, e=e, couleur="#fbbf24"))

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Les solides", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Les solides")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        q = self.bloc(["Comment s'appellent ces formes", "qu'on peut prendre dans la main ?"], 38)
        q.move_to(P(0, 1.3))
        six = self.six(0.6).arrange(RIGHT, buff=0.45).move_to(P(0, -0.35))
        if six.width > 11.5:
            six.scale_to_fit_width(11.5)
        self.au_mot("Comment")
        self.play(FadeIn(q, shift=UP * 0.2), LaggedStart(*[FadeIn(s, shift=UP * 0.3) for s in six], lag_ratio=0.15),
                  run_time=1.2)
        self.attendre_voix(marge=0.6)

    # ── 01 : Jade, vendeuse de jouets ───────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        jp = jade(1.0).move_to(P(-5.3, 0.1))
        self.au_mot("Voici Jade")
        nom = self.t("Jade", 42, BLEU_CALCUL).next_to(jp, UP, buff=0.2)
        self.play(FadeIn(jp, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("magasin de jouets")
        met = self.bloc(["magasin", "de jouets"], 26, BLEU_CALCUL).next_to(jp, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        et = VGroup(*[etagere(y, -2.6, 4.6) for y in (1.7, -0.3)])
        jouets = VGroup(de(0.55), ballon(0.32), boite_jeu(0.45), chapeau_fete(0.45), tambour(0.45), toit(0.42))
        places = [P(-1.8, 2.2), P(-0.3, 2.15), P(1.4, 2.1), P(3.5, 2.35), P(-1.2, 0.25), P(1.0, 0.25)]
        for j, p in zip(jouets, places):
            j.move_to(p).align_to(P(0, 1.78 if p[1] > 1 else -0.22), DOWN)
        self.au_mot("elle range")
        self.play(FadeIn(et), LaggedStart(*[FadeIn(j, shift=DOWN * 0.3) for j in jouets], lag_ratio=0.12),
                  run_time=1.2)
        self.au_mot("une étagère pour chaque forme")
        l1 = self.t("une étagère pour chaque forme", 30, JAUNE_TITRE).move_to(P(1.0, -1.15))
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        self.au_mot("comment s'appellent")
        q = self.t("Comment s'appellent ces formes ?", 36, JAUNE_TITRE).move_to(P(0.6, -2.3))
        self.play(FadeIn(q, shift=UP * 0.15), *[Indicate(j, scale_factor=1.12) for j in jouets], run_time=0.8)
        self.attendre_voix()

    # ── 02 : un solide a de l'épaisseur ─────────────────────────────────────
    def ecran_solide(self):
        self.ecran("02-solide")
        feuille = Rectangle(width=3.6, height=2.6, fill_color="#f8fafc", fill_opacity=1, stroke_width=0) \
            .move_to(P(-3.6, 0.5))
        car = Square(1.5, fill_color="#38bdf8", fill_opacity=1, stroke_color="#0f172a", stroke_width=4) \
            .move_to(feuille)
        self.au_mot("Un carré")
        l0 = self.t("Un carré", 36, BLEU_CALCUL).next_to(feuille, UP, buff=0.3)
        self.play(FadeIn(feuille), Create(car), FadeIn(l0), run_time=0.6)
        self.au_mot("à plat")
        l1 = self.t("à plat, sur une feuille", 30).next_to(feuille, DOWN, buff=0.3)
        self.play(FadeIn(l1, shift=UP * 0.1), car.animate.set_fill("#0ea5e9"), run_time=0.4)
        d = de(1.5, P(3.2, 0.5))
        self.au_mot("Un dé")
        l2 = self.t("Un dé", 36, BLEU_CALCUL).next_to(d, UP, buff=0.3)
        self.play(FadeIn(d, scale=0.6), FadeIn(l2), run_time=0.6)
        self.au_mot("dans la main")
        l3 = self.t("on le prend dans la main", 30).next_to(d, DOWN, buff=0.3)
        self.play(FadeIn(l3, shift=UP * 0.1), Rotate(d, angle=0.12, rate_func=there_and_back), run_time=0.6)
        self.au_mot("de l'épaisseur")
        # l'épaisseur : la fuyante du dé, en orange
        ep = d.arete_ab(1, 5, ARETE_C, 12)
        l4 = self.t("Il a de l'épaisseur.", 32, ARETE_C).next_to(l3, DOWN, buff=0.25)
        self.play(Create(ep), FadeIn(l4, shift=UP * 0.1), run_time=0.5)
        self.au_mot("C'est un solide")
        g = self.gros("C'est un solide !", fs=44).move_to(P(0, -2.6))
        self.play(FadeIn(g, scale=1.2), run_time=0.4)
        self.insister(g, 1.1, 0.25)
        self.attendre_voix()

    # ── 03 : le cube ────────────────────────────────────────────────────────
    def ecran_cube(self):
        self.ecran("03-cube")
        d = de(2.2, P(-3.4, 0.2))
        self.add(d)
        self.au_mot("Le dé est un cube")
        tit = self.t("Le cube", 48, JAUNE_TITRE)
        gauche(tit, 0.6, 2.6)
        self.play(Write(tit), Indicate(d, scale_factor=1.06), run_time=0.6)
        self.au_mot("Toutes ses faces")
        l1 = self.bloc(["Toutes ses faces", "sont des carrés,"], 34)
        gauche(l1, 0.6, 1.45)
        f = VGroup(*[d.face(k, "#facc15", 0.55) for k in (0, 3, 5)])
        self.play(FadeIn(l1, shift=UP * 0.1), LaggedStart(*[FadeIn(x) for x in f], lag_ratio=0.3), run_time=0.9)
        self.au_mot("tous pareils")
        l2 = self.t("tous pareils.", 34, VERT_OK)
        gauche(l2, 0.6, 0.45)
        # trois carrés pareils, posés à plat à côté
        cs = VGroup(*[Square(0.9, fill_color="#facc15", fill_opacity=0.8, stroke_color=WHITE, stroke_width=3)
                      for _ in range(3)]).arrange(RIGHT, buff=0.3)
        gauche(cs, 0.8, -0.8)
        self.play(FadeIn(l2, shift=UP * 0.1), TransformFromCopy(f, cs), run_time=0.8)
        self.attendre_voix()

    # ── 04 : le pavé droit ──────────────────────────────────────────────────
    def ecran_pave(self):
        self.ecran("04-pave")
        b = boite_jeu(1.9, P(-3.4, 0.6))
        self.au_mot("La boîte du jeu")
        self.play(FadeIn(b, shift=UP * 0.2), run_time=0.45)
        self.au_mot("un pavé droit")
        tit = self.t("Le pavé droit", 48, JAUNE_TITRE)
        gauche(tit, 0.6, 2.6)
        self.play(Write(tit), run_time=0.5)
        self.au_mot("Ses faces sont des rectangles")
        l1 = self.bloc(["Ses faces sont", "des rectangles."], 34)
        gauche(l1, 0.6, 1.45)
        f = VGroup(*[b.face(k, "#facc15", 0.55) for k in (0, 3, 5)])
        self.play(FadeIn(l1, shift=UP * 0.1), LaggedStart(*[FadeIn(x) for x in f], lag_ratio=0.3), run_time=0.9)
        self.au_mot("comme une boîte")
        ch = pave(1.6, 0.6, 0.9, e=1.2, centre=P(2.4, -0.8), couleur="#92400e")
        l2 = self.t("comme une boîte à chaussures", 30, BLEU_CALCUL).next_to(ch, DOWN, buff=0.3)
        self.play(FadeIn(ch, shift=UP * 0.2), FadeIn(l2), run_time=0.5)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        br = brique(1.5, P(-4.2, 0.9))

        def autres_q(sc):
            sc.play(FadeIn(br, shift=UP * 0.2), run_time=0.35)

        def apres(sc):
            sc.play(*[FadeIn(br.face(k, "#facc15", 0.5)) for k in (0, 3, 5)], run_time=0.4)
            sc.rep_lignes(["Ses faces sont des rectangles,", "pas toutes carrées :", "c'est un pavé droit."],
                          ["Ses faces", "pas toutes", "c'est un pavé"])

        self.question_pause("05-question", "05b-reponse",
                            ["Une brique de lait,", "c'est quel solide ?"],
                            [self.choix("un pavé droit"), self.choix("un cube"), self.choix("une pyramide")], 0,
                            ["Ses faces sont des rectangles,", "pas toutes carrées :", "c'est un pavé droit."],
                            mot_q="Une brique", autres_q=autres_q, autres_r=apres)

    # ── 06 : les solides qui roulent ────────────────────────────────────────
    def ecran_rouler(self):
        self.ecran("06-rouler")
        self.au_mot("les solides qui roulent")
        tit = self.t("Les solides qui roulent", 46, JAUNE_TITRE).move_to(P(0, 3.1))
        self.play(Write(tit), run_time=0.5)
        sol = Line(P(-6.4, -1.0), P(6.0, -1.0), color="#64748b", stroke_width=4)
        self.add(sol)
        bal = ballon(0.75, P(-5.2, -0.25))
        self.au_mot("Le ballon")
        self.play(FadeIn(bal, shift=DOWN * 0.3), run_time=0.35)
        self.au_mot("une boule")
        n1 = self.t("une boule", 34, BLEU_CALCUL).move_to(P(-3.6, 1.7))
        self.play(FadeIn(n1, shift=UP * 0.1), rouler(bal, 1.6, 0.75), run_time=0.6)
        self.au_mot("tout est rond")
        l1 = self.bloc(["tout est rond,", "aucune face plate"], 28).move_to(P(-3.6, -1.9))
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("aucune face plate")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        ta = tambour(1.4, P(1.6, 0.0))
        self.au_mot("Le tambour")
        self.play(FadeIn(ta, shift=DOWN * 0.3), run_time=0.35)
        self.au_mot("un cylindre")
        n2 = self.t("un cylindre", 34, BLEU_CALCUL).move_to(P(2.6, 1.7))
        self.play(FadeIn(n2, shift=UP * 0.1), run_time=0.35)
        self.au_mot("un disque en haut")
        dh = ta.disque_haut("#facc15")
        self.play(FadeIn(dh), run_time=0.35)
        self.au_mot("un disque en bas")
        db = ta.disque_bas("#facc15")
        self.play(FadeIn(db), run_time=0.35)
        self.au_mot("il roule sur le côté")
        l2 = self.t("il roule sur le côté", 28).move_to(P(2.4, -1.9))
        cou = VGroup(ta, dh, db)
        self.play(FadeIn(l2, shift=UP * 0.1), Rotate(cou, -PI / 2), run_time=0.6)
        self.play(cou.animate.shift(RIGHT * 1.6), Rotate(cou, -0.0), run_time=0.7)
        self.attendre_voix()

    # ── 07 : les solides qui ont une pointe ─────────────────────────────────
    def ecran_pointe(self):
        self.ecran("07-pointe")
        self.au_mot("les solides qui ont une pointe")
        tit = self.t("Les solides qui ont une pointe", 46, JAUNE_TITRE).move_to(P(0, 3.1))
        self.play(Write(tit), run_time=0.5)
        ch = chapeau_fete(1.5, P(-3.6, 0.3))
        self.au_mot("Le chapeau de fête")
        self.play(FadeIn(ch, shift=DOWN * 0.3), run_time=0.35)
        self.au_mot("un cône")
        n1 = self.t("un cône", 36, BLEU_CALCUL).next_to(ch, UP, buff=0.35)
        self.play(FadeIn(n1, shift=UP * 0.1), run_time=0.3)
        self.au_mot("un disque en bas")
        db = ch.disque_bas("#facc15")
        self.play(FadeIn(db), run_time=0.35)
        self.au_mot("il monte en pointe")
        self.play(Flash(ch._s, color=SOMMET_C), FadeIn(ch.pointe()), run_time=0.5)
        py = toit(1.5, P(2.8, 0.2))
        tour = Rectangle(width=1.2 * 1.5, height=1.1, fill_color="#d6a15c", fill_opacity=1, stroke_width=0) \
            .next_to(py, DOWN, buff=-0.38).shift(LEFT * 0.27)
        self.au_mot("Le toit du château")
        self.play(FadeIn(tour), FadeIn(py, shift=DOWN * 0.3), run_time=0.4)
        self.au_mot("une pyramide")
        n2 = self.t("une pyramide", 36, BLEU_CALCUL).next_to(py, UP, buff=0.35)
        self.play(FadeIn(n2, shift=UP * 0.1), run_time=0.3)
        self.au_mot("ses faces sont des triangles")
        f = VGroup(*[py.face(k, "#facc15", 0.55) for k in range(1, 5) if py.vue_face[k]])
        self.play(LaggedStart(*[FadeIn(x) for x in f], lag_ratio=0.3), run_time=0.7)
        self.au_mot("jusqu'à la pointe")
        self.play(Flash(py.pt(4), color=SOMMET_C), FadeIn(py.sommet(4)), run_time=0.5)
        self.attendre_voix()

    # ── 08 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("08-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.35)
        co = Cone(0.7, 1.5, e=1.2, centre=P(-3.6, 0.9), couleur="#22c55e")
        py = pyramide(4, 1.3, 1.4, e=1.2, centre=P(2.6, 0.9), couleur="#fbbf24")
        self.au_mot("Le cône et la pyramide")
        self.play(FadeIn(co), FadeIn(py), run_time=0.4)
        self.au_mot("une pointe")
        self.play(Flash(co._s, color=SOMMET_C), Flash(py.pt(4), color=SOMMET_C), FadeIn(co.pointe()),
                  FadeIn(py.sommet(4)), run_time=0.6)
        sol = Line(P(-6.4, -0.75), P(6.0, -0.75), color="#64748b", stroke_width=4)
        self.au_mot("le cône est rond en bas")
        l1 = self.ligne([("rond en bas :", VERT_OK), ("il roule", VERT_OK)], 32, buff=0.2).move_to(P(-3.6, -1.5))
        self.play(Create(sol), FadeIn(co.disque_bas("#facc15")), FadeIn(l1[0], shift=UP * 0.1), run_time=0.45)
        self.au_mot("il roule")
        # le cône couché roule en rond sur lui-même
        self.play(FadeIn(l1[1], shift=UP * 0.1), Rotate(co, PI / 2.6, about_point=co.get_bottom()), run_time=0.6)
        self.play(Rotate(co, -PI / 2.6, about_point=co.get_bottom() + RIGHT * 0.0), run_time=0.5)
        self.au_mot("La pyramide a des faces plates")
        l2 = self.t("des faces plates :", 32, ROUGE_ERREUR).move_to(P(2.6, -1.5))
        self.play(FadeIn(l2, shift=UP * 0.1), Wiggle(py, rotation_angle=0.03 * TAU), run_time=0.7)
        self.au_mot("elle ne roule pas")
        l3 = self.t("elle ne roule pas", 32, ROUGE_ERREUR).next_to(l2, DOWN, buff=0.2)
        self.play(FadeIn(l3, shift=UP * 0.1), run_time=0.35)
        self.attendre_voix()

    # ── 09 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        co = cornet(1.3, P(-4.3, 1.0))

        def autres_q(sc):
            sc.play(FadeIn(co, shift=DOWN * 0.2), run_time=0.35)

        def apres(sc):
            sc.rep_lignes(["Le cornet est rond,", "et il finit en pointe :", "c'est un cône."],
                          ["Le cornet est rond", "il finit en pointe", "c'est un cône"])

        self.question_pause("09-question", "09b-reponse",
                            ["Un cornet de glace,", "c'est quel solide ?"],
                            [self.choix("une pyramide"), self.choix("un cône"), self.choix("un cylindre")], 1,
                            ["Le cornet est rond,", "et il finit en pointe :", "c'est un cône."],
                            mot_q="Un cornet", autres_q=autres_q, autres_r=apres)

    # ── 10 : le défi ────────────────────────────────────────────────────────
    def trois_jouets(self):
        bi = Boule(0.45, centre=P(-4.6, 0.6), couleur="#22d3ee")
        cu = cube(e=1.1, centre=P(-1.6, 0.6), couleur="#f43f5e")
        ca = canette(1.3, P(1.4, 0.6))
        return bi, cu, ca

    def ecran_defi(self):
        self.ecran("10-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        self.au_mot("Jade a encore trois jouets")
        l0 = self.t("Jade a encore trois jouets à ranger :", 34)
        gauche(l0, -6.2, 2.2)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        bi, cu, ca = self.trois_jouets()
        self.au_mot("une bille")
        self.play(FadeIn(bi, scale=0.6), run_time=0.3)
        self.au_mot("un cube de construction")
        self.play(FadeIn(cu, scale=0.6), run_time=0.3)
        self.au_mot("une petite canette")
        self.play(FadeIn(ca, scale=0.6), run_time=0.3)
        self.au_mot("Quel est le nom")
        q = self.t("Quel est le nom de chaque solide ?", 36, JAUNE_TITRE)
        gauche(q, -6.2, -1.6)
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.4)
        self.au_mot("Mets pause")
        pz = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE)
        gauche(pz, -6.2, -2.4)
        self.play(Write(pz), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("10b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        bi, cu, ca = self.trois_jouets()
        self.add(bi, cu, ca)
        for o, nom, mot in ((bi, "une boule", "La bille est une boule"), (cu, "un cube", "construction est un cube"),
                            (ca, "un cylindre", "La canette est un cylindre")):
            t = self.t(nom, 32, BLEU_CALCUL).move_to(P(o.get_center()[0], -0.9))
            self.au_mot(mot)
            self.play(FadeIn(t, shift=UP * 0.1), Indicate(o, scale_factor=1.1), run_time=0.4)
        self.au_mot("Bravo")
        g = self.gros("Bravo, les étagères sont rangées !", fs=36).move_to(P(-0.6, -2.3))
        self.play(FadeIn(g, scale=1.2), run_time=0.4)
        self.attendre_voix()

    # ── 11 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("11-finale", 0.65)
        six = self.six(0.5)
        fig = VGroup(VGroup(*six[:2]).arrange(RIGHT, buff=0.35), VGroup(*six[2:4]).arrange(RIGHT, buff=0.35),
                     VGroup(*six[4:]).arrange(RIGHT, buff=0.35)).arrange(DOWN, buff=0.35)
        lignes = self.finale_gauche(fig, textes=[
            ("Six solides : le cube, le pavé droit, la boule,", "le cylindre, le cône et la pyramide."),
            ("Regarde leurs faces : plates ou rondes,", "carrés, rectangles ou triangles."),
            ("Avec ou sans pointe ?",)], fs=30, x_fig=-4.7, xl=-2.6)
        self.au_mot("Il y a six solides")
        self.montrer_ligne(lignes[0], FadeIn(fig))
        self.au_mot("regarde leurs faces")
        self.montrer_ligne(lignes[1], Indicate(fig[0], color=FACE_C))
        self.au_mot("avec ou sans pointe")
        self.montrer_ligne(lignes[2], Indicate(fig[2], color=SOMMET_C))
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_solide()
        self.ecran_cube()
        self.ecran_pave()
        self.ecran_question1()
        self.ecran_rouler()
        self.ecran_pointe()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("12-abonne")


class SolidesReconnaitreCE2(SolidesReconnaitreBase):
    identite = "Maths CE2 — EleveAI"
    ceinture = "blanche"
