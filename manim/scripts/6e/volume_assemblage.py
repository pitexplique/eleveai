# volume_assemblage.py
# EleveAI — Maths 6e — série « Volume et solides », épisode V4 : ASSEMBLER DES VOLUMES
# (micro volume_assemblage), notion volume_solide.
# Paysage 16:9, CEINTURE JAUNE, avec voix (manim/voix/6e-volume-assemblage.json, validée le 15/11, Julie, débit −6).
# Short jumeau : film Ti Margo (le château 18 + 7 = 25 : réponse C).
# Métier : Manon, MENUISIÈRE (maquette d'armoire 24 + 4 − 2 = 26) ; centres : construction, art-design.
# Mapping micro → écrans : volume_assemblage → 02 (coller = additionner : 8 + 4 = 12), 03 (la forme change,
# pas le nombre : à droite, dessus, derrière), 04 (avec des unités : 18 cm³ + 12 cm³ = 30 cm³), 06 (enlever
# = soustraire : 20 − 6 = 14), 07 (piège : les faces collées se cachent, les cubes restent) ; questions
# 05 (15 + 9 = 24 cm³, rép. A) et 08 (3 blocs de 8 = 24 cm³, rép. B) ; défi 09 (armoire : 4 × 2 × 3 = 24,
# + 2 × 2 × 1 = 4, − niche de 2 → 26 cubes).
# Cubes : Empilement (solides_cm1_commun), opaques, dessinés du fond vers l'avant ; un solide collé à DROITE
# ou DESSUS est dessiné après l'autre (il le cache bien).
# Audit : bash <notes>/outils/dry.sh volume_assemblage VolumeAssemblage6e
# HD : bash <notes>/outils/hd.sh volume_assemblage VolumeAssemblage6e eleveai-maths-6e-volume-assemblage manim/sorties/6e/maths/volume/04-assemblage
# Sortie : manim/sorties/6e/maths/volume/04-assemblage/eleveai-maths-6e-volume-assemblage.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from volume_6e_commun import *  # noqa: E402,F403

ORANGE_C = "#f97316"   # le solide qu'on colle
BOIS = "#b7793f"       # le bois de Manon
NICHE_C = "#ef4444"    # la niche qu'on creuse
NORMALES = (np.array([0, 0, -1.0]), UP, RIGHT)  # devant, dessus, droite (ordre de Empilement.un_cube)


def dans(ref, positions, couleur=VOL_C, couleurs=None):
    """Un Empilement de `positions` posé dans le repère de l'Empilement `ref` (même e, même origine)."""
    emp = Empilement(positions, e=ref.e, couleur=couleur, couleurs=couleurs)
    emp.shift(ref._dec - emp._dec)
    emp._dec = ref._dec
    return emp


def recolorer(cube, couleur):
    """Les animations qui repeignent un cube (ses trois faces vues, ombrées)."""
    return [f.animate.set_fill(nuance(couleur, n), 1) for f, n in zip(cube, NORMALES)]


def coller_a(emp, cible, q=(0, 0, 0)):
    """Le vecteur qui amène le coin q de emp sur le point cible."""
    return cible - emp.pp(q)


def bibliotheque(h=2.2, l=1.6):
    """Une bibliothèque en bois : cadre, 3 étagères, des livres."""
    cadre = Rectangle(width=l, height=h, fill_color=BOIS, fill_opacity=1, stroke_color="#78350f", stroke_width=4)
    g = VGroup(cadre)
    couleurs = ("#dc2626", "#2563eb", "#16a34a", "#facc15", "#a855f7")
    for k in range(3):
        y = -h / 2 + (k + 1) * h / 3
        g.add(Line(P(-l / 2, y), P(l / 2, y), color="#78350f", stroke_width=5))
        for j in range(4):
            g.add(Rectangle(width=0.16, height=h / 3 - 0.22, fill_color=couleurs[(j + k) % 5], fill_opacity=1,
                            stroke_width=0).move_to(P(-l / 2 + 0.22 + j * 0.22, y - h / 6 + 0.02)))
    return g


class VolumeAssemblageBase(PaysageVolume6e):
    nom_voix = "6e-volume-assemblage"
    fichier_marques = "volume_assemblage_marques.json"

    def calc(self, pieces, x, y, ex, fs=34, buff=0.16):
        """Un calcul écrit au fil de la voix : chaque morceau (UN nombre) à SON extrait (qui
        commence par ce nombre). pieces : (texte, couleur)."""
        lg = self.ligne(pieces, fs, buff=buff)
        gauche(lg, x, y)
        self.aux_extraits(lg, ex)
        return lg

    def poser(self, emp, shift=DOWN * 0.25, run_time=0.45, lag=0.05):
        """Les cubes d'un Empilement se posent un par un (dans l'ordre de dessin)."""
        self.play(LaggedStart(*[FadeIn(c, shift=shift) for c in emp], lag_ratio=lag), run_time=run_time)
        self.add(emp)

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Assembler des volumes", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Assembler des volumes")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.8)
        self.au_mot("Quand on colle deux solides")
        q = self.bloc(["Quand on colle deux solides,", "que devient le volume ?"], 36, JAUNE_TITRE)
        gauche(q, -6.2, 0.6)
        a = Empilement(pave_cubes(2, 2, 1), e=0.8, centre=P(3.0, 0.6))
        b = Empilement(pave_cubes(1, 2, 1), e=0.8, centre=P(5.4, 0.6), couleur=ORANGE_C)
        self.play(FadeIn(q[0], shift=UP * 0.1), FadeIn(a, scale=0.6), FadeIn(b, scale=0.6), run_time=0.5)
        self.au_mot("que devient le volume")
        self.play(FadeIn(q[1], shift=UP * 0.1), b.animate.shift(coller_a(b, a.pp((2, 0, 0)))), run_time=0.6)
        self.attendre_voix(marge=0.6)

    # ── 01 : la situation ───────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        mp = manon(1.0).move_to(P(-5.3, 0.5))
        self.au_mot("Voici Manon")
        nom = self.t("Manon", 40, BLEU_CALCUL).next_to(mp, UP, buff=0.2)
        self.play(FadeIn(mp, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Elle est menuisière")
        met = self.t("menuisière", 28, BLEU_CALCUL).next_to(mp, DOWN, buff=0.2)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        cais = Empilement(pave_cubes(3, 1, 1), e=0.95, centre=P(-2.2, 1.5), couleur=BOIS, trait="#451a03")
        self.au_mot("des caissons en bois")
        l1 = self.t("des caissons en bois,", 28).move_to(P(-2.2, 0.42))
        self.play(LaggedStart(*[FadeIn(c, shift=DOWN * 0.4) for c in cais], lag_ratio=0.25), FadeIn(l1), run_time=0.6)
        self.add(cais)
        self.au_mot("comme de gros blocs")
        l2 = self.t("comme de gros blocs", 28).move_to(P(-2.2, -0.15))
        self.play(FadeIn(l2, shift=UP * 0.1), Indicate(cais, color="#fbbf24", scale_factor=1.04), run_time=0.45)
        bib = bibliotheque().move_to(P(2.0, 1.5))
        self.au_mot("une bibliothèque")
        l3 = self.t("une bibliothèque", 26).next_to(bib, DOWN, buff=0.2)
        self.play(FadeIn(bib, shift=UP * 0.2), FadeIn(l3), run_time=0.45)
        maq = Empilement(pave_cubes(3, 3, 1), e=0.5, centre=P(4.9, 1.5), couleur=BOIS, trait="#451a03")
        fl = Arrow(P(3.0, 1.5), P(3.95, 1.5), buff=0.05, color=JAUNE_TITRE, stroke_width=5)
        self.au_mot("une maquette avec des cubes")
        l4 = self.t("la maquette", 26).next_to(maq, DOWN, buff=0.2)
        self.play(GrowArrow(fl), LaggedStart(*[FadeIn(c, shift=DOWN * 0.2) for c in maq], lag_ratio=0.06),
                  FadeIn(l4), run_time=0.6)
        self.add(maq)
        self.au_mot("Quel volume prendra")
        q = self.t("Quel volume prendra le meuble entier ?", 36, JAUNE_TITRE).move_to(P(-1.2, -2.6))
        self.play(FadeIn(q, shift=UP * 0.1), Indicate(maq, color="#fbbf24", scale_factor=1.05), run_time=0.45)
        self.attendre_voix()

    # ── 02 : coller = additionner ───────────────────────────────────────────
    def ecran_coller(self):
        self.ecran("02-coller")
        a = Empilement(pave_cubes(4, 2, 1), e=0.85, centre=P(-3.6, 1.2))
        b = Empilement(pave_cubes(2, 2, 1), e=0.85, centre=P(2.2, 1.2), couleur=ORANGE_C)
        self.au_mot("On colle un solide")
        tit = self.t("On colle deux solides.", 40, JAUNE_TITRE)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), FadeIn(a, scale=0.7), run_time=0.45)
        la = self.t("8 cubes", 32, VOL_C).next_to(a, DOWN, buff=0.25)
        self.au_mot("8 cubes")
        self.play(FadeIn(la, shift=UP * 0.1), run_time=0.3)
        self.au_mot("et un solide de 4")
        self.play(FadeIn(b, scale=0.7), run_time=0.3)
        lb = self.t("4 cubes", 32, ORANGE_C).next_to(b, DOWN, buff=0.25)
        self.au_mot("4 cubes")
        self.play(FadeIn(lb, shift=UP * 0.1), run_time=0.3)
        self.au_mot("On compte tout")
        v = coller_a(b, a.pp((4, 0, 0)))
        self.play(b.animate.shift(v), lb.animate.shift(v), run_time=0.35)
        cubes = [(a, q) for q in sorted(a.cubes, key=lambda q: (-q[1], q[0]))] + \
                [(b, q) for q in sorted(b.cubes, key=lambda q: (-q[1], q[0]))]
        nums = VGroup(*[Text(str(k + 1), font_size=26, color=BLACK, weight=BOLD).move_to(e.centre_cube(q))
                        for k, (e, q) in enumerate(cubes)])
        hors_audit(nums)
        self.play(LaggedStart(*[FadeIn(n, scale=1.3) for n in nums], lag_ratio=0.08), run_time=0.45)
        self.calc([("8", VOL_C), ("+ 4", ORANGE_C), ("= 12 cubes", VERT_OK)], -5.6, -1.2,
                  ex=["8 plus", "4, 12", "12 cubes"], fs=40)
        self.au_mot("Coller, c'est additionner")
        g = self.gros("Coller, c'est additionner.", couleur=VERT_OK, fs=38)
        gauche(g, -5.6, -2.45)
        self.play(FadeIn(g, scale=1.15), run_time=0.4)
        self.attendre_voix()

    # ── 03 : la forme change, pas le nombre ─────────────────────────────────
    def ecran_forme(self):
        self.ecran("03-forme")
        self.au_mot("Aucun cube ne disparaît")
        tit = self.t("Aucun cube ne disparaît quand on colle.", 36, JAUNE_TITRE)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.45)
        l1 = self.ligne([("La forme change,", WHITE), ("le nombre de cubes reste le même.", VERT_OK)], 30, buff=0.2)
        gauche(l1, -6.2, 2.25)
        self.au_mot("La forme change")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("le nombre de cubes reste")
        self.play(FadeIn(l1[1], shift=UP * 0.1), run_time=0.3)
        A = [(x, y, 0) for x in range(4) for y in range(2)]
        confs = [("à droite", A + [(x, y, 0) for x in (4, 5) for y in range(2)], -4.3),
                 ("dessus", A + [(x, y, 0) for x in (1, 2) for y in (2, 3)], -0.6),
                 ("derrière", A + [(x, y, 1) for x in (2, 3) for y in range(2)], 3.0)]
        lab12 = VGroup()
        for mot, pos, x in confs:
            orange = [q for q in pos if q not in A]
            emp = Empilement(pos, e=0.5, centre=P(x, 0.3), couleurs={q: ORANGE_C for q in orange})
            emp.move_to(P(x, 0.3))
            lab = self.t(mot, 30, BLEU_CALCUL).move_to(P(x, -1.2))
            self.au_mot(mot)
            anims = [FadeIn(c, shift=DOWN * 0.35) if q in orange else FadeIn(c) for q, c in
                     zip(sorted(pos, key=lambda q: (-q[2], q[1], q[0])), emp)]
            self.play(*anims, FadeIn(lab, shift=UP * 0.1), run_time=0.4)
            self.add(emp)
            lab12.add(self.t("12 cubes", 30, VERT_OK).move_to(P(x, -1.75)))
        big = self.t("Toujours 12 cubes !", 40, VERT_OK).move_to(P(-0.8, -2.65))
        self.aux_extraits([VGroup(lab12, big)], ["12 cubes"])
        self.insister(big, 1.1, 0.25)
        self.attendre_voix()

    # ── 04 : avec des unités ────────────────────────────────────────────────
    def ecran_unites(self):
        self.ecran("04-unites")
        self.au_mot("Avec des unités")
        tit = self.t("Avec des unités, c'est pareil.", 40, JAUNE_TITRE)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.4)
        a = Empilement(pave_cubes(3, 3, 2), e=0.65, centre=P(-4.4, 0.9))
        b = Empilement(pave_cubes(2, 3, 2), e=0.65, centre=P(0.6, 0.9), couleur="#3b82f6")
        la = self.t("18 cm³", 34, VOL_C).next_to(a, DOWN, buff=0.25)
        lb = self.t("12 cm³", 34, "#60a5fa").next_to(b, DOWN, buff=0.25)
        self.au_mot("Un bloc de 18")
        self.play(FadeIn(a, scale=0.7), run_time=0.3)
        self.au_mot("18 centimètres cubes")
        self.play(FadeIn(la, shift=UP * 0.1), run_time=0.3)
        self.au_mot("un bloc de 12")
        self.play(FadeIn(b, scale=0.7), run_time=0.3)
        self.au_mot("12 centimètres cubes")
        self.play(FadeIn(lb, shift=UP * 0.1), run_time=0.3)
        self.au_mot("Ensemble")
        v = coller_a(b, a.pp((3, 0, 0)))
        ens = self.t("Ensemble :", 36)
        gauche(ens, -5.6, -1.45)
        self.play(b.animate.shift(v), lb.animate.shift(v + RIGHT * 0.45), la.animate.shift(LEFT * 0.45),
                  FadeIn(ens, shift=UP * 0.1), run_time=0.4)
        self.calc([("18 cm³", VOL_C), ("+ 12 cm³", "#60a5fa"), ("= 30 cm³", VERT_OK)], ens.get_right()[0] + 0.25, -1.45,
                  ex=["18 plus", "12, 30", "30 centimètres cubes"], fs=40)
        tot = SurroundingRectangle(VGroup(a, b), color=VERT_OK, buff=0.12, stroke_width=5)
        self.play(Create(tot), run_time=0.4)
        self.attendre_voix()

    # ── 05 : QUESTION 1 (réponse A) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        a = Empilement(pave_cubes(5, 3, 1), e=0.45, centre=P(-4.7, 1.7))
        b = Empilement(pave_cubes(3, 3, 1), e=0.45, centre=P(-1.6, 1.7), couleur=ORANGE_C)
        la = hors_audit(self.t("15 cm³", 30, VOL_C).next_to(a, DOWN, buff=0.2))
        lb = hors_audit(self.t("9 cm³", 30, ORANGE_C).next_to(b, DOWN, buff=0.2))

        def autres_q(sc):
            sc.play(FadeIn(a, shift=UP * 0.2), FadeIn(b, shift=UP * 0.2), FadeIn(la), FadeIn(lb), run_time=0.35)

        def apres(sc):
            l0 = sc.rep_bas(0, ["Coller, c'est additionner :"], fs=32, y0=-1.3, pas=0.6)
            sc.au_mot("Coller, c'est additionner")
            v = coller_a(b, a.pp((5, 0, 0)))
            sc.play(FadeIn(l0, shift=UP * 0.08), b.animate.shift(v), lb.animate.shift(v), run_time=0.4)
            l1 = sc.rep_bas(1, ["15", "+ 9", "= 24 cm³."], fs=32, y0=-1.3, pas=0.6, buff=0.16)
            sc.aux_extraits(l1, ["15 plus", "9, 24", "24 centimètres cubes"])
            l2 = sc.rep_bas(2, [("6, c'est la différence :", ORANGE_RETENUE)], fs=32, y0=-1.3, pas=0.6)
            sc.aux_extraits(l2, ["6, c'est la différence"])
            l3 = sc.rep_bas(3, [("on a enlevé au lieu d'ajouter.", ORANGE_RETENUE)], fs=32, y0=-1.3, pas=0.6)
            sc.au_mot("on a enlevé")
            sc.play(FadeIn(l3, shift=UP * 0.08), run_time=0.3)
            sc.rep_fini()

        self.question_pause("05-question", "05b-reponse",
                            ["On colle un solide de 15 cm³", "et un solide de 9 cm³.", "Quel est le volume",
                             "du nouveau solide ?"],
                            [self.choix("24 cm³"), self.choix("6 cm³"), self.choix("15 cm³")], 0,
                            ["Coller, c'est additionner :", "15 + 9 = 24 cm³.", "6, c'est la différence :",
                             "on a enlevé au lieu d'ajouter."],
                            mot_q="On colle un solide", autres_q=autres_q, autres_r=apres)

    # ── 06 : enlever = soustraire ───────────────────────────────────────────
    def ecran_enlever(self):
        self.ecran("06-enlever")
        self.au_mot("Et si on enlève")
        tit = self.t("Et si on enlève un morceau ?", 40, JAUNE_TITRE)
        gauche(tit, -6.2, 3.05)
        self.play(Write(tit), run_time=0.4)
        bloc = Empilement(pave_cubes(5, 2, 2), e=0.75, centre=P(-2.9, 1.0), couleur=BOIS, trait="#451a03")
        mp = manon(0.6).move_to(P(-5.9, -1.15))
        self.au_mot("Manon creuse une niche")
        self.play(FadeIn(mp, shift=UP * 0.2), FadeIn(bloc, scale=0.7), run_time=0.4)
        lb = self.t("bloc de 20 cubes", 30).next_to(bloc, UP, buff=0.2)
        self.au_mot("bloc de 20")
        self.play(FadeIn(lb, shift=DOWN * 0.1), run_time=0.3)
        niche = [(x, y, 0) for x in (1, 2, 3) for y in (0, 1)]
        self.au_mot("La niche prend")
        self.play(*[a for q in niche for a in recolorer(bloc.cubes[q], NICHE_C)], run_time=0.35)
        ln = self.ligne([("la niche :", NICHE_C), ("6 cubes", NICHE_C)], 30, buff=0.14).move_to(P(-2.9, -0.45))
        self.play(FadeIn(ln[0], shift=UP * 0.1), run_time=0.25)
        self.aux_extraits(ln[1:], ["6 cubes"])
        self.au_mot("Il reste")
        trous = VGroup(*[bloc.fantome(q, JAUNE_TITRE, 3) for q in niche])
        ir = self.t("Il reste :", 34)
        gauche(ir, 0.8, 1.3)
        self.play(FadeOut(VGroup(*[bloc.cubes[q] for q in niche]), shift=DOWN * 0.6), FadeIn(ir), Create(trous),
                  run_time=0.35)
        self.calc([("20", WHITE), ("− 6", NICHE_C), ("= 14 cubes", VERT_OK)], 0.8, 0.45,
                  ex=["20 moins", "6, 14", "14 cubes"], fs=40)
        self.au_mot("Enlever, c'est soustraire")
        g = self.gros("Enlever, c'est soustraire.", couleur=VERT_OK, fs=38)
        gauche(g, -4.9, -2.6)
        self.play(FadeIn(g, scale=1.15), run_time=0.4)
        self.attendre_voix()

    # ── 07 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("07-piege")
        self.au_mot("Attention au piège")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.05)
        a = Empilement(pave_cubes(2, 2, 2), e=0.9, centre=P(-4.6, 0.7))
        b = Empilement(pave_cubes(2, 2, 2), e=0.9, centre=P(-1.3, 0.7), couleur=ORANGE_C)
        self.play(Write(tit), FadeIn(a), FadeIn(b), run_time=0.45)
        x = 1.0
        l1 = self.bloc(["Quand deux solides", "se collent,"], 30)
        gauche(l1, x, 2.0)
        self.au_mot("Quand deux solides")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.3)
        faces = VGroup(*[a.cubes[(1, y, z)][2].copy().set_fill(JAUNE_TITRE, 0.9) for y in range(2) for z in range(2)])
        l2 = self.bloc(["leurs faces collées", "se cachent."], 30, JAUNE_TITRE)
        gauche(l2, x, 0.85)
        self.au_mot("leurs faces collées")
        self.play(FadeIn(l2[0], shift=UP * 0.1), FadeIn(faces), run_time=0.35)
        self.au_mot("se cachent")
        S = [a.pp(p) for p in ((2, 0, 0), (2, 2, 0), (2, 2, 2), (2, 0, 2))]
        bord = DashedVMobject(Polygon(*S, color=JAUNE_TITRE, stroke_width=4), num_dashes=24)
        self.bring_to_front(b)
        self.play(FadeIn(l2[1]), b.animate.shift(coller_a(b, a.pp((2, 0, 0)))), run_time=0.45)
        self.play(Create(bord), run_time=0.3)
        l3 = self.bloc(["Mais les cubes", "sont toujours là :"], 30, VERT_OK)
        gauche(l3, x, -0.3)
        self.au_mot("Mais les cubes")
        self.play(FadeIn(l3, shift=UP * 0.1),
                  LaggedStart(*[Indicate(c, color=WHITE, scale_factor=1.06) for c in list(a) + list(b)],
                              lag_ratio=0.08), run_time=0.8)
        self.au_mot("le volume ne diminue pas")
        l4 = self.t("le volume ne diminue pas.", 30, VERT_OK)
        gauche(l4, x, -1.35)
        self.play(FadeIn(l4, shift=UP * 0.1), run_time=0.3)
        self.au_mot("On additionne tous les cubes")
        g = self.gros("On additionne tous les cubes.", couleur=VERT_OK, fs=36)
        gauche(g, -6.0, -2.55)
        self.play(FadeIn(g, scale=1.1), run_time=0.4)
        self.attendre_voix()

    # ── 08 : QUESTION 2 (réponse B) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        blocs = [Empilement(pave_cubes(2, 2, 2), e=0.45, centre=P(x, 1.7), couleur=c)
                 for x, c in ((-5.4, VOL_C), (-3.6, "#3b82f6"), (-1.8, "#a855f7"))]
        labs = VGroup(*[hors_audit(self.t("8 cm³", 28, WHITE).next_to(b, DOWN, buff=0.2)) for b in blocs])

        def autres_q(sc):
            sc.play(*[FadeIn(b, shift=UP * 0.2) for b in blocs], FadeIn(labs), run_time=0.35)

        def apres(sc):
            l0 = sc.rep_bas(0, ["3 blocs", "de 8 :"], fs=32, y0=-1.3, pas=0.6, buff=0.16)
            v1 = coller_a(blocs[1], blocs[0].pp((2, 0, 0)))
            v2 = coller_a(blocs[2], blocs[0].pp((4, 0, 0)))
            sc.au_mot("3 blocs de")
            sc.play(FadeIn(l0[0], shift=UP * 0.08), blocs[1].animate.shift(v1), blocs[2].animate.shift(v2),
                    FadeOut(labs), run_time=0.3)
            sc.aux_extraits(l0[1:], ["8 : 8"])
            l1 = sc.rep_bas(1, ["8 + 8 + 8,", "ou 3 × 8", "= 24 cm³."], fs=32, y0=-1.3, pas=0.6, buff=0.14)
            sc.aux_extraits(l1, ["8 plus 8 plus", "3 fois 8", "24 centimètres cubes"])
            l2 = sc.rep_bas(2, [("16, c'est seulement", ORANGE_RETENUE), ("2 blocs.", ORANGE_RETENUE)], fs=32,
                            y0=-1.3, pas=0.6, buff=0.16)
            sc.aux_extraits(l2[:1], ["16, c'est seulement"])
            sc.play(blocs[2].animate.set_opacity(0.25), run_time=0.25)
            sc.aux_extraits(l2[1:], ["2 blocs"])
            sc.rep_fini()

        self.question_pause("08-question", "08b-reponse",
                            ["Manon colle 3 blocs pareils", "de 8 cm³.", "Quel est le volume", "du meuble ?"],
                            [self.choix("11 cm³"), self.choix("24 cm³"), self.choix("16 cm³")], 1,
                            ["3 blocs de 8 :", "8 + 8 + 8, ou 3 × 8 = 24 cm³.", "16, c'est seulement 2 blocs."],
                            mot_q="Manon colle 3 blocs", autres_q=autres_q, autres_r=apres)

    # ── 09 : le défi ────────────────────────────────────────────────────────
    GRAND = [(x, y, z) for x in range(4) for y in range(3) for z in range(2)]
    PETIT = [(x, 3, z) for x in (1, 2) for z in range(2)]
    NICHE = [(1, 0, 0), (2, 0, 0)]

    def armoire(self, e, centre):
        """L'armoire : grand bloc 4 × 3 (haut) × 2 (fond), petit bloc 2 × 1 × 2 dessus."""
        ref = Empilement(pave_cubes(4, 4, 2), e=e, centre=centre)
        return ref, dans(ref, self.GRAND, VOL_C), dans(ref, self.PETIT, ORANGE_C)

    def ecran_defi(self):
        self.ecran("09-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        ref, grand, petit = self.armoire(0.62, P(-4.2, 0.4))
        x = -1.6
        self.au_mot("La maquette d'une armoire")
        l0 = self.t("La maquette d'une armoire :", 30)
        gauche(l0, x, 2.3)
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.3)
        self.au_mot("un bloc de 4")
        self.poser(grand, run_time=0.35, lag=0.02)
        c4 = fleche_cote(ref.pp((0, 0, 0)) + DOWN * 0.22, ref.pp((4, 0, 0)) + DOWN * 0.22, "4", 26, LONG_C, DOWN, 0.08)
        c2 = fleche_cote(ref.pp((4, 0, 0)) + P(0.22, -0.1), ref.pp((4, 0, 2)) + P(0.22, -0.1), "2", 26, LONG_C,
                         RIGHT, 0.08)
        c3 = fleche_cote(ref.pp((0, 0, 0)) + LEFT * 0.22, ref.pp((0, 3, 0)) + LEFT * 0.22, "3", 26, LONG_C, LEFT, 0.08)
        for c in (c4, c2, c3):
            hors_audit(c)
        l1 = self.ligne([("un bloc de 4", WHITE), ("sur 2", WHITE), ("sur 3 cubes,", WHITE)], 30, buff=0.14)
        gauche(l1, x, 1.6)
        self.aux_extraits([VGroup(l1[0], c4), VGroup(l1[1], c2), VGroup(l1[2], c3)],
                          ["4 sur 2", "2 sur 3", "3 cubes"])
        self.au_mot("avec un petit bloc")
        self.play(LaggedStart(*[FadeIn(c, shift=DOWN * 0.5) for c in petit], lag_ratio=0.1), run_time=0.35)
        self.add(petit)
        l2 = self.ligne([("avec un petit bloc de 2", ORANGE_C), ("sur 2", ORANGE_C), ("sur 1", ORANGE_C)], 30,
                        buff=0.14)
        gauche(l2, x, 0.95)
        self.aux_extraits(l2, ["2 sur 2", "2 sur 1", "1 collé"])
        self.au_mot("collé dessus")
        l2b = self.t("collé dessus.", 30, ORANGE_C)
        gauche(l2b, x, 0.35)
        self.play(FadeIn(l2b, shift=UP * 0.1), run_time=0.25)
        self.au_mot("Puis Manon creuse")
        l3 = self.ligne([("Manon creuse une niche de", WHITE), ("2 cubes.", NICHE_C)], 30, buff=0.14)
        gauche(l3, x, -0.35)
        self.play(FadeIn(l3[0], shift=UP * 0.1), *[a for q in self.NICHE for a in recolorer(grand.cubes[q], NICHE_C)],
                  run_time=0.35)
        self.aux_extraits(l3[1:], ["2 cubes"])
        trous = VGroup(*[ref.fantome(q, JAUNE_TITRE, 3) for q in self.NICHE])
        self.play(FadeOut(VGroup(*[grand.cubes[q] for q in self.NICHE]), shift=DOWN * 0.5), Create(trous),
                  run_time=0.4)
        self.au_mot("Quel est le volume final")
        q = self.t("Quel est le volume final ?", 36, JAUNE_TITRE)
        gauche(q, x, -1.2)
        self.play(FadeIn(q, shift=UP * 0.1), run_time=0.35)
        self.au_mot("Mets pause")
        pz = self.t("Mets pause, et cherche !", 32, ORANGE_RETENUE)
        gauche(pz, x, -2.3)
        self.play(Write(pz), run_time=0.8)
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.ecran("09b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        ref, grand, petit = self.armoire(0.52, P(-5.0, 0.3))
        self.add(grand)
        x, fs = -3.4, 30
        self.au_mot("Le grand bloc")
        g0 = self.t("Grand bloc :", fs, VOL_C)
        gauche(g0, x, 2.2)
        self.play(FadeIn(g0), Indicate(grand, color=VERT_OK, scale_factor=1.04), run_time=0.35)
        self.calc([("4", BLEU_D), ("× 2", BLEU_D), ("= 8 ;", BLEU_D), ("× 3", BLEU_D), ("= 24 cubes.", VOL_C)],
                  g0.get_right()[0] + 0.2, 2.2, ex=["4 fois 2", "2, 8", "8 ; fois", "3, 24", "24 cubes. Le"], fs=fs)
        self.au_mot("Le petit bloc")
        p0 = self.t("Petit bloc :", fs, ORANGE_C)
        gauche(p0, x, 1.3)
        self.play(FadeIn(p0), LaggedStart(*[FadeIn(c, shift=DOWN * 0.4) for c in petit], lag_ratio=0.1), run_time=0.35)
        self.add(petit)
        self.calc([("2", BLEU_D), ("× 2", BLEU_D), ("= 4 ;", BLEU_D), ("× 1", BLEU_D), ("= 4 cubes.", ORANGE_C)],
                  p0.get_right()[0] + 0.2, 1.3, ex=["2 fois 2", "2, 4 ;", "4 ; fois", "1, 4", "4 cubes. Collés"], fs=fs)
        self.au_mot("Collés")
        k0 = self.t("Collés :", fs)
        gauche(k0, x, 0.4)
        self.play(FadeIn(k0), Indicate(VGroup(grand, petit), color=WHITE, scale_factor=1.03), run_time=0.35)
        self.calc([("24", BLEU_D), ("+ 4", BLEU_D), ("= 28 cubes.", BLEU_D)], k0.get_right()[0] + 0.2, 0.4,
                  ex=["24 plus", "4, 28", "28 cubes"], fs=fs)
        self.au_mot("On creuse la niche")
        n0 = self.t("Niche :", fs, NICHE_C)
        gauche(n0, x, -0.5)
        trous = VGroup(*[ref.fantome(q, JAUNE_TITRE, 3) for q in self.NICHE])
        self.play(FadeIn(n0), *[a for q in self.NICHE for a in recolorer(grand.cubes[q], NICHE_C)], run_time=0.25)
        self.play(FadeOut(VGroup(*[grand.cubes[q] for q in self.NICHE]), shift=DOWN * 0.5), Create(trous),
                  run_time=0.3)
        lg = self.calc([("28", BLEU_D), ("− 2", NICHE_C), ("= 26 cubes.", VERT_OK)], n0.get_right()[0] + 0.2, -0.5,
                       ex=["28 moins", "2, 26", "26 cubes"], fs=fs)
        fin = hors_audit(self.gros("Volume final : 26 cubes", couleur=VERT_OK, fs=40))
        gauche(fin, x, -1.75)
        self.play(FadeIn(fin, scale=1.15), run_time=0.35)
        self.insister(lg[2], 1.15, 0.25)
        self.attendre_voix()

    def ecran_finale(self):
        self.ecran("10-finale", 0.65)
        ref, grand, petit = self.armoire(0.55, ORIGIN)
        fig = VGroup(grand, petit)
        lignes = self.finale_gauche(fig, textes=[
            ("Coller deux solides, c'est", "additionner leurs volumes."),
            ("Enlever un morceau,", "c'est soustraire."),
            ("La forme change, mais", "aucun cube ne disparaît.")], fs=30, x_fig=-4.9, xl=-2.6)
        for f in lignes.get_family():
            f.sans_synchro = True
        hors_audit(lignes)
        self.add(fig)
        self.au_mot("Coller deux solides")
        self.montrer_ligne(lignes[0])
        self.au_mot("Enlever un morceau")
        self.montrer_ligne(lignes[1])
        self.au_mot("La forme change")
        self.montrer_ligne(lignes[2])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_coller()
        self.ecran_forme()
        self.ecran_unites()
        self.ecran_question1()
        self.ecran_enlever()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("11-abonne")


class VolumeAssemblage6e(VolumeAssemblageBase):
    identite = "Maths 6e — EleveAI"
    ceinture = "jaune"
