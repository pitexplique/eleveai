# longueur_defi.py
# EleveAI — Maths CE2 — série « Longueurs », épisode 08 : UN DÉFI DE LONGUEURS
# (micro ce2_longueur_defi, notion longueur), AVEC VOIX. Paysage 16:9, CEINTURE BLEUE.
# Short jumeau : film Ti Margo (le skate : 6 dm = 60 cm = 600 mm, réponse A).
# Décor et métier : Maya, PÂTISSIÈRE (centre : cuisine) : les gâteaux et leurs rubans.
# Mapping micro → écrans : 01-03 (une même longueur écrite de 3 façons : 12 cm = 120 mm = 1 dm et 2 cm),
# 05-05b (défi : 3 × 25 = 75, 100 − 75 = 25 : un 4e morceau tout juste), 06 (piège : 120 mm n'est pas 120 cm),
# questions 04 (3 dm = 30 cm : B) et 07 (2 m = 4 × 50 cm : C), défi 08 (100 − 75 = 25 < 30 : pas assez).
# Voix : manim/voix/ce2-longueur-defi.json (validée le 14/11, Julie, débit −6) ;
# marques : longueur_defi_marques.json (python manim/scripts/ce2/perimetre_marques.py longueur:defi ;
# ⛔ une marque ajoutée à la main : 08b « 25, c'est moins » à 14,20 s, mesurée sur le WAV).
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/ce2/longueur_defi.py LongueurDefiCE2
# python -m manim render -qh --disable_caching manim/scripts/ce2/longueur_defi.py LongueurDefiCE2 -o eleveai-maths-ce2-longueur-defi --media_dir manim/scripts/ce2/media-lg-08
# Sortie : manim/sorties/ce2/maths/longueur/08-defi/eleveai-maths-ce2-longueur-defi.mp4

import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from longueur_ce2_commun import *  # noqa: E402,F403

ROSE = "#f472b6"
CREME = "#fde68a"
GENOISE = "#d97706"
LEA = "#38bdf8"
KEVIN = "#a78bfa"
MALIA = "#fb923c"
R1, R2, R3 = "#f472b6", "#38bdf8", "#facc15"


def gateau(s=1.0, ruban_c=ROSE):
    """Un gâteau à deux étages, un ruban autour, une cerise."""
    bas = Rectangle(width=2.0 * s, height=0.7 * s, fill_color=GENOISE, fill_opacity=1, stroke_width=0)
    haut = Rectangle(width=1.4 * s, height=0.55 * s, fill_color=GENOISE, fill_opacity=1, stroke_width=0)
    haut.next_to(bas, UP, buff=0)
    cr1 = Rectangle(width=2.0 * s, height=0.12 * s, fill_color=CREME, fill_opacity=1, stroke_width=0)
    cr1.move_to(bas.get_top() + DOWN * 0.06 * s)
    cr2 = Rectangle(width=1.4 * s, height=0.12 * s, fill_color=CREME, fill_opacity=1, stroke_width=0)
    cr2.move_to(haut.get_top() + DOWN * 0.06 * s)
    rb = Rectangle(width=2.0 * s, height=0.18 * s, fill_color=ruban_c, fill_opacity=1, stroke_width=0)
    rb.move_to(bas.get_center() + DOWN * 0.08 * s)
    cerise = Circle(radius=0.13 * s, fill_color="#dc2626", fill_opacity=1, stroke_width=0)
    cerise.next_to(haut, UP, buff=-0.02)
    plat = Ellipse(width=2.5 * s, height=0.22 * s, fill_color="#e5e7eb", fill_opacity=1, stroke_width=0)
    plat.next_to(bas, DOWN, buff=-0.08 * s)
    return VGroup(plat, bas, haut, cr1, cr2, rb, cerise)


def main_plate(s=1.0, couleur="#e0ac69"):
    """Une main à plat, doigts serrés vers le haut (sa largeur : environ 1 dm)."""
    paume = RoundedRectangle(width=1.0 * s, height=0.9 * s, corner_radius=0.18 * s, fill_color=couleur,
                             fill_opacity=1, stroke_width=0)
    doigts = VGroup(*[RoundedRectangle(width=0.23 * s, height=h * s, corner_radius=0.1 * s, fill_color=couleur,
                                       fill_opacity=1, stroke_width=0)
                      for h in (0.62, 0.78, 0.74, 0.55)]).arrange(RIGHT, buff=0.02 * s, aligned_edge=DOWN)
    doigts.next_to(paume, UP, buff=-0.12 * s)
    pouce = RoundedRectangle(width=0.22 * s, height=0.55 * s, corner_radius=0.1 * s, fill_color=couleur,
                             fill_opacity=1, stroke_width=0).rotate(0.7).move_to(paume.get_left() + P(-0.05 * s,
                                                                                                    0.05 * s))
    return VGroup(pouce, doigts, paume)


class LongueurDefiBase(PaysageLongueurCE2):
    nom_voix = "ce2-longueur-defi"
    fichier_marques = "longueur_defi_marques.json"
    ceinture = "bleue"

    # Morceaux de réponse dont le nombre est redit loin de sa 1re fois : instant forcé (marques).
    _forces = {("04b-reponse", "= 3 × 10"): 5.58, ("07b-reponse", "200 :"): 5.56}

    def _force(self, f):
        """L'instant forcé de f : par son texte, ou par ses lettres (la synchro coupe « = 3 × 10 »
        en morceaux « = 3 × » / « 10 », qui n'ont plus le texte d'origine)."""
        cle = getattr(self, "_cle_voix", None)
        t = self._forces.get((cle, getattr(f, "original_text", None)))
        if os.environ.get("DBG_FORCE") and cle == "04b-reponse":
            print("FORCE?", type(f).__name__, repr(getattr(f, "original_text", None)),
                  [getattr(x, "_force_t", None) for x in f.get_family()][:3], flush=True)
        if t is None:
            for x in f.get_family():
                c = getattr(x, "_force_t", None)
                if c is not None and c[0] == cle:
                    return c[1]
        return t

    def _disposer_q(self, question, choix, phrase):
        r = super()._disposer_q(question, choix, phrase)
        for (cle, txt), t in self._forces.items():
            for f in r[5].get_family():
                if isinstance(f, Text) and f.original_text == txt:
                    for x in f.get_family():
                        x._force_t = (cle, t)
        return r

    def _attente(self, textes):
        for f in textes:
            t = self._force(f)
            if t is not None:
                return max(0.0, self._debut_voix + t - self.renderer.time)
        return super()._attente(textes)

    def _debut(self, m):
        t = self._force(m)
        if t is not None:  # un morceau forcé ouvre son propre lot (sinon il retient le morceau d'avant)
            return max(0.0, self._debut_voix + t - self.renderer.time)
        return super()._debut(m)

    @staticmethod
    def _base(t):
        """La ligne de base d'un Text : le bas de sa 1re lettre sans jambage (ni « = », ni « × »)."""
        lettres = [c for c in t.original_text if not c.isspace()]
        if len(lettres) != len(t.submobjects):
            return None
        for i, c in enumerate(lettres):
            if c.isdigit() or (c.isalpha() and c not in "gjpqyQJ"):
                return t.submobjects[i].get_bottom()[1]
        return None

    def _aligner_bases(self, m):
        b0 = self._base(m[0])
        for x in m[1:]:
            b = self._base(x)
            if b0 is not None and b is not None:
                x.shift(UP * (b0 - b))
        return m

    def ligne(self, *a, **k):
        """Une ligne de morceaux sur UNE ligne de base (« Maya a » / « 1 m » ne sautent plus)."""
        return self._aligner_bases(super().ligne(*a, **k))

    def poser(self, m, run_time=0.25):
        for f in m.get_family():
            f.sans_synchro = True
        self.play(FadeIn(m, shift=UP * 0.08), run_time=run_time)

    def morceaux_a_la_place(self, orig, mots, fs=32):
        """Remplace le Text `orig` (d'une finale) par des morceaux, chacun posé ensuite à son mot."""
        m = VGroup(*[self.t(x, fs) for x in mots]).arrange(RIGHT, buff=0.16)
        self._aligner_bases(m)  # (« = 120 mm » : le « = » n'est pas sur la ligne de base)
        m.scale(orig[0].height / m[0][0].height)
        m.shift(orig[0].get_corner(DL) - m[0][0].get_corner(DL))
        for x in m:
            hors_audit(x)
            for f in x.get_family():
                f.sans_synchro = True
        return m

    def poser_a(self, etapes, run_time=0.2):
        for ex, m in etapes:
            ex = list(ex) if isinstance(ex, (tuple, list)) else [ex, 1]
            self.au_mot(*ex)
            self.wait(0.07)
            self.play(FadeIn(m, shift=RIGHT * 0.15), run_time=run_time)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Un défi de longueurs", self.identite, self.ceinture, y_ech=-2.45)
        self.au_mot("Un défi de longueurs")
        self.play(Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), run_time=0.7)
        q = self.t("Qui a raison ?", 46, JAUNE_TITRE)
        q.move_to(P(0, 0.4)).align_to(P(-6.2, 0), LEFT)
        g = gateau(1.0).move_to(P(3.4, 0.5))
        self.au_mot("Qui a raison")
        self.play(FadeIn(q, shift=UP * 0.2), FadeIn(g, shift=UP * 0.3), run_time=0.5)
        self.attendre_voix(marge=0.6)

    # ── 01 : Maya, pâtissière ───────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        pe = maya(0.95).move_to(P(-5.0, 0.3))
        self.au_mot("Voici Maya")
        nom = self.t("Maya", 42, JAUNE_TITRE).next_to(pe, UP, buff=0.75)
        self.play(FadeIn(pe, shift=UP * 0.3), FadeIn(nom), run_time=0.45)
        self.au_mot("Elle est pâtissière")
        met = self.t("pâtissière", 26, "#f9a8d4").next_to(pe, DOWN, buff=0.12)
        self.play(FadeIn(met, shift=DOWN * 0.1), run_time=0.35)
        g = gateau(0.9).move_to(P(4.2, -1.6))  # (à 0.3, il touchait « Malia : 1 dm et 2 cm »)
        self.au_mot("Autour de chaque gâteau")
        self.play(FadeIn(g, shift=UP * 0.2), run_time=0.4)
        self.au_mot("elle met un ruban")
        self.play(Indicate(g[5], color=ROSE, scale_factor=1.15), run_time=0.4)
        l0 = self.bloc(["Ses trois apprentis mesurent", "le même ruban :"], 32, WHITE, buff=0.1)
        gauche(l0, -2.6, 2.7)
        self.au_mot("Ses trois apprentis")
        self.play(FadeIn(l0, shift=UP * 0.1), run_time=0.35)
        rows = [("Léa écrit", "Léa :", LEA, [("12 cm", "12 centimètres")], 1.4),
                ("Kevin écrit", "Kevin :", KEVIN, [("120 mm", "120 millimètres")], 0.4),
                ("Malia écrit", "Malia :", MALIA, [("1 dm", "1 décimètre"), ("et 2 cm", "et 2")], -0.6)]
        for ex, nm, coul, vals, y in rows:
            t = self.ligne([(nm, coul)] + [(v, WHITE) for v, _ in vals], 40, buff=0.3)
            gauche(t, -2.4, y)
            self.au_mot(ex)
            self.play(FadeIn(t[0], shift=RIGHT * 0.2), run_time=0.3)
            self.aux_extraits(list(t[1:]), [(e, 1) for _, e in vals], run_time=0.3)
        q = self.t("Qui a raison ?", 44, JAUNE_TITRE)
        gauche(q, -2.4, -2.0)
        self.au_mot("Qui a raison")
        self.play(FadeIn(q, scale=1.15), run_time=0.4)
        self.attendre_voix()

    # ── 02 : les millimètres ────────────────────────────────────────────────
    def ecran_mm(self):
        self.ecran("02-mm")
        self.au_mot("On met tout en centimètres")
        tit = self.t("On met tout en centimètres.", 42, JAUNE_TITRE)
        gauche(tit, -6.2, 3.0)
        self.play(FadeIn(tit, shift=UP * 0.1), run_time=0.35)
        c0 = self.ligne([("10 mm", KEVIN), ("= 1 cm", VERT_OK)], 46, buff=0.3)
        gauche(c0, -6.2, 2.0)
        r = regle(n_cm=2, u=1.6, mm=True, h=0.75, fs=22).move_to(P(3.6, 2.0))
        cm1 = Brace(Line(P(r.x(0), 0), P(r.x(1), 0)), DOWN, color=VERT_OK).next_to(r, DOWN, buff=0.08)
        cm1.set_x((r.x(0) + r.x(1)) / 2)
        self.aux_extraits([VGroup(c0[0], r)], [("10 millimètres", 1)], run_time=0.35)
        self.aux_extraits([VGroup(c0[1], cm1)], [("1 centimètre", 1)], run_time=0.3)
        ech = 0.075  # unités Manim par mm (120 mm = 9 unités)
        b = barre([10] * 12, ech, (KEVIN, "#6d28d9"), h=0.5).move_to(P(-0.4, 0.4))
        e = hors_audit(self.t("120 mm", 34, KEVIN)).next_to(b, UP, buff=0.15).align_to(b, LEFT)
        self.aux_extraits([VGroup(b, e)], [("120 millimètres", 1)], run_time=0.4)
        c1 = self.ligne([("12 paquets de 10 mm", WHITE), ("= 12 cm", VERT_OK)], 44, buff=0.3)
        gauche(c1, -5.6, -0.9)
        nums = VGroup(*[hors_audit(Text(str(k + 1), font_size=22, color=WHITE, weight=BOLD))
                        .next_to(b[k], DOWN, buff=0.1) for k in range(12)])
        hors_audit(c1[0])  # « 12 » et « 10 » : posés à « 12 paquets »
        self.au_mot("12 paquets")
        self.play(FadeIn(c1[0], shift=UP * 0.1), LaggedStart(*[FadeIn(n) for n in nums], lag_ratio=0.08),
                  run_time=0.8)
        hors_audit(c1[1])
        self.aux_extraits([c1[1]], [("12 centimètres", 1)], run_time=0.3)
        self.insister(c1[1], 1.2, 0.25)
        self.attendre_voix()

    # ── 03 : le décimètre ───────────────────────────────────────────────────
    def ecran_dm(self):
        self.ecran("03-dm")
        c0 = self.ligne([("1 dm", MALIA), ("= 10 cm", VERT_OK)], 46, buff=0.3)
        gauche(c0, -6.2, 3.0)
        ech = 0.5  # unités Manim par cm
        b = barre([10, 2], ech, (MALIA, "#fdba74"), h=0.5).move_to(P(-0.2, 1.4)).align_to(P(-5.6, 0), LEFT)
        a1 = accolade(b[0], "10 cm", 28, MALIA, dessus=False)
        a2 = etiq(b[1], "2 cm", 28, "#fdba74", RIGHT, 0.15)  # (une accolade au-dessus chevauchait « 1 dm = 10 cm »)
        self.au_mot("1 décimètre")
        self.play(FadeIn(c0[0], shift=UP * 0.1), GrowFromEdge(b[0], LEFT), run_time=0.35)
        self.aux_extraits([VGroup(c0[1], a1)], [("10 centimètres", 1)], run_time=0.3)
        c1 = self.ligne([("10 cm", MALIA), ("+ 2 cm", "#fdba74"), ("= 12 cm", VERT_OK)], 46, buff=0.3)
        gauche(c1, -6.2, -0.15)  # (l'accolade « 10 cm » sous la barre descend à y 0.6)
        hors_audit(c1[0])
        self.au_mot("Plus 2")
        self.play(FadeIn(c1[0]), FadeIn(c1[1], shift=UP * 0.1), GrowFromEdge(b[1], LEFT), FadeIn(a2), run_time=0.35)
        tout = accolade(b, "12 cm", 30, VERT_OK, dessus=True)
        hors_audit(c1[2])
        self.aux_extraits([VGroup(c1[2], tout)], [("12 centimètres", 1)], run_time=0.3)
        l = self.t("Les trois ont raison !", 44, VERT_OK)
        gauche(l, -6.2, -1.25)
        self.au_mot("Les trois ont raison")
        self.play(FadeIn(l, scale=1.15), run_time=0.4)
        r = self.ligne([("12 cm", LEA), ("=", WHITE), ("120 mm", KEVIN), ("=", WHITE), ("1 dm et 2 cm", MALIA)],
                       40, buff=0.25)
        gauche(r, -6.2, -2.35)
        for m in r:
            hors_audit(m)  # rappel des trois écritures déjà dites
            for f in m.get_family():
                f.sans_synchro = True
        self.au_mot("c'est la même longueur")
        self.play(LaggedStart(*[FadeIn(m, shift=UP * 0.1) for m in r], lag_ratio=0.25), run_time=0.9)
        self.attendre_voix()

    # ── 04 : QUESTION 1 (réponse B) ─────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        b = barre([10, 10, 10], 0.13, (MALIA, "#fdba74"), h=0.45).move_to(P(-4.2, 1.6))
        labs = VGroup(*[hors_audit(Text("1 dm", font_size=22, color=BLACK, weight=BOLD)).move_to(p) for p in b])
        labs.set_z_index(3)  # (l'Indicate de la réponse remet la barre devant)

        def autres_q(sc):
            sc.play(GrowFromEdge(b, LEFT), FadeIn(labs), run_time=0.4)

        def apres(sc):
            sc.play(Indicate(b, color=VERT_OK, scale_factor=1.06), run_time=0.25)

        self.question_gauche("04-question", "04b-reponse",
                             ["Laquelle de ces longueurs", "est égale à 3 dm ?"],
                             [self.choix("3 cm"), self.choix("30 cm"), self.choix("300 cm")], 1,
                             ["1 dm = 10 cm.", "3 dm = 3 × 10", "= 30 cm."],
                             -0.5, couper={0: ("1 dm", "= 10 cm."), 1: ("3 dm", "= 3 × 10")},
                             mot_q="Laquelle de ces", autres_q=autres_q, autres_r=apres)

    # ── 05 : nouveau défi : 4 morceaux de 25 cm ? ───────────────────────────
    def le_ruban(self, y):
        return barre([25, 25, 25, 25], 0.085, (R1, "#be185d"), h=0.5, inconnue=3).move_to(P(-0.3, y))

    def ecran_ruban(self):
        self.ecran("05-ruban")
        self.au_mot("Nouveau défi")
        tit = self.t("Nouveau défi !", 46, JAUNE_TITRE)
        gauche(tit, -6.2, 3.0)
        self.play(Write(tit), run_time=0.35)
        b = self.le_ruban(1.3)
        plein = ruban(b.width, R1, 0.5).move_to(b)
        tout = accolade(b, "1 m", 34, R1, dessus=True)
        self.au_mot("1 mètre")
        self.play(GrowFromEdge(plein, LEFT), FadeIn(tout), run_time=0.45)
        coupes = VGroup(*[DashedLine(b[k].get_corner(UR) + UP * 0.2, b[k].get_corner(DR) + DOWN * 0.2,
                                     color=WHITE) for k in range(3)])
        labs = VGroup(*[hors_audit(Text("25 cm", font_size=24, color=BLACK, weight=BOLD)).move_to(b[k])
                        for k in range(3)])
        self.au_mot("Elle coupe trois morceaux")
        self.play(Create(coupes), run_time=0.45)
        self.au_mot("25 centimètres")
        self.play(FadeOut(plein), FadeIn(b), FadeIn(labs), run_time=0.4)
        q = self.ligne([("Peut-elle en couper", JAUNE_TITRE), ("un quatrième ?", ORANGE_RETENUE)], 40, buff=0.25)
        gauche(q, -6.2, -0.6)
        quoi = Text("?", font_size=40, color=ORANGE_RETENUE, weight=BOLD).move_to(b[3])
        self.au_mot("Peut-elle en couper")
        self.play(FadeIn(q[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("un quatrième")
        self.play(FadeIn(q[1], scale=1.1), FadeIn(quoi, scale=1.3), run_time=0.35)
        self.insister(quoi, 1.4, 0.25)
        self.attendre_voix()

    def ecran_ruban_calcul(self):
        self.ecran("05b-calcul")
        b = self.le_ruban(2.6)
        labs = VGroup(*[hors_audit(Text("25 cm", font_size=24, color=BLACK, weight=BOLD)).move_to(b[k])
                        for k in range(3)])
        quoi = hors_audit(Text("?", font_size=40, color=ORANGE_RETENUE, weight=BOLD)).move_to(b[3])
        labs.set_z_index(3)  # l'Indicate des morceaux les remet devant : les étiquettes restent dessus
        self.add(b, quoi)
        self.poser(labs, 0.15)  # (un Text ajouté par add() attend son nombre : on le pose)
        c0 = self.ligne([("1 m", R1), ("= 100 cm", VERT_OK)], 44, buff=0.3)
        gauche(c0, -6.2, 1.3)
        c1 = self.ligne([("3 × 25", R1), ("= 75", BLEU_D)], 44, buff=0.3)
        gauche(c1, -6.2, 0.35)
        c2 = self.ligne([("100", VERT_OK), ("− 75", BLEU_D), ("= 25 cm", ORANGE_RETENUE)], 44, buff=0.3)
        gauche(c2, -6.2, -0.6)
        for m in list(c0) + list(c1) + list(c2):
            hors_audit(m)  # 25, 75, 100 redits : chaque morceau à SON extrait
        self.aux_extraits([c0[0], c0[1]], [("1 mètre, c'est", 1), ("100 centimètres", 1)], run_time=0.25)
        self.au_mot("Trois morceaux")
        self.play(Indicate(VGroup(b[0], b[1], b[2]), scale_factor=1.05), run_time=0.35)
        self.aux_extraits([c1[0], c1[1]], [("3 fois 25", 1), ("75. Il", 1)], run_time=0.25)
        self.aux_extraits([c2[0], c2[1]], [("100 moins", 1), ("75, 25", 1)], run_time=0.25)
        l25 = hors_audit(Text("25 cm", font_size=24, color=BLACK, weight=BOLD)).move_to(b[3])
        self.aux_extraits([c2[2]], [("25 centimètres", 1)], run_time=0.3)
        self.play(Transform(quoi, l25), b[3].animate.set_fill(R1, opacity=0.9), run_time=0.4)
        f = self.t("Tout juste un quatrième morceau !", 38, VERT_OK)
        gauche(f, -6.0, -1.9)
        self.au_mot("tout juste")
        self.play(FadeIn(f, scale=1.1), run_time=0.4)
        self.insister(f, 1.1, 0.25)
        self.attendre_voix()

    # ── 06 : le piège : 120 mm n'est pas 120 cm ─────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.au_mot("Attention")
        tit = self.t("Attention au piège !", 46, ROUGE_ERREUR)
        gauche(tit, -6.2, 3.0)
        self.play(Write(tit), run_time=0.35)
        c = self.ligne([("120 mm", KEVIN), ("≠", ROUGE_ERREUR), ("120 cm", ROUGE_ERREUR)], 50, buff=0.35)
        gauche(c, -6.2, 2.0)
        ech = 0.045
        r1 = ruban(12 * ech, KEVIN, 0.35).move_to(P(0, 0.9)).align_to(P(-5.6, 0), LEFT)
        r2 = ruban(120 * ech, ROUGE_ERREUR, 0.35).move_to(P(0, 0.2)).align_to(P(-5.6, 0), LEFT)
        e1 = hors_audit(self.t("120 mm", 28, KEVIN)).next_to(r1, RIGHT, buff=0.2)
        e2 = hors_audit(self.t("120 cm", 28, ROUGE_ERREUR)).next_to(r2, RIGHT, buff=0.2)
        self.aux_extraits([VGroup(c[0], r1, e1)], [("120 millimètres", 1)], run_time=0.35)
        self.au_mot("ce n'est pas")
        self.play(FadeIn(c[1], scale=1.3), run_time=0.3)
        hors_audit(c[2])
        self.aux_extraits([VGroup(c[2], r2, e2)], [("120 centimètres", 1)], run_time=0.35)
        l1 = self.t("Le millimètre est tout petit :", 38, JAUNE_TITRE)
        gauche(l1, -6.2, -0.7)
        self.au_mot("Le millimètre est tout petit")
        self.play(FadeIn(l1, shift=UP * 0.1), run_time=0.35)
        c2 = self.ligne([("120 mm", KEVIN), ("= 12 cm", VERT_OK)], 46, buff=0.3)
        gauche(c2, -5.6, -1.6)
        hors_audit(c2[0])
        self.aux_extraits([c2[0]], [("120 millimètres", 2)], run_time=0.3)
        hors_audit(c2[1])
        self.aux_extraits([c2[1]], [("12 centimètres", 1)], run_time=0.3)
        mn = main_plate(0.85).next_to(r1, RIGHT, buff=1.8).shift(UP * 0.2)
        l2 = self.t("à peine plus qu'une main", 32, VERT_OK)
        gauche(l2, -5.6, -2.5)
        self.au_mot("à peine plus")
        self.play(FadeIn(l2, shift=UP * 0.1), FadeIn(mn, shift=UP * 0.2), run_time=0.4)
        self.play(Indicate(r1, scale_factor=1.3), run_time=0.4)
        self.attendre_voix()

    # ── 07 : QUESTION 2 (réponse C) ─────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        b = barre([50, 50, 50, 50], 0.024, (R2, "#0369a1"), h=0.4).move_to(P(-3.6, 1.5))
        plein = ruban(b.width, R2, 0.4).move_to(b)
        e = etiq(plein, "2 m", 28, R2, UP, 0.12)
        gs = VGroup(*[gateau(0.32, R2) for _ in range(4)]).arrange(RIGHT, buff=0.12).next_to(b, DOWN, buff=0.3)

        def autres_q(sc):
            sc.play(GrowFromEdge(plein, LEFT), FadeIn(e), run_time=0.4)

        def apres(sc):
            sc.play(FadeOut(plein), FadeIn(b), LaggedStart(*[FadeIn(g, shift=UP * 0.2) for g in gs],
                                                            lag_ratio=0.2), run_time=0.5)

        self.question_gauche("07-question", "07b-reponse",
                             ["Maya a 2 m de ruban.", "Un gâteau : 50 cm.",
                              "Pour combien de gâteaux ?"],
                             [self.choix("2 gâteaux"), self.choix("50 gâteaux"), self.choix("4 gâteaux")], 2,
                             ["2 m = 200 cm.", "50, 100, 150, 200 :", "4 morceaux de 50 cm."],
                             -0.5, sans_audit=(1,), couper={0: ("2 m", "= 200 cm."), 1: ("50,", "100,", "150,", "200 :"),
                                           2: ("4 morceaux", "de 50 cm.")},
                             mot_q="Maya a 2", autres_q=autres_q, autres_r=apres)

    # ── 08 : le défi ────────────────────────────────────────────────────────
    def la_barre(self, y, ech=0.075):
        return barre([40, 35, 25], ech, (R1, R2, R3), h=0.5, inconnue=2).move_to(P(-0.3, y))

    def ecran_defi(self):
        self.ecran("08-defi", 0.65)
        self.au_mot("À toi de jouer")
        tit = self.t("À toi de jouer !", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.4)
        b = self.la_barre(1.4)
        plein = ruban(b.width, R3, 0.5).move_to(b)
        tout = accolade(b, "1 m", 32, R3, dessus=True)
        l0 = self.ligne([("Maya a", WHITE), ("1 m", R3), ("de ruban.", WHITE)], 38, buff=0.2)
        gauche(l0, -6.2, 0.2)
        self.au_mot("Maya a 1")
        self.play(FadeIn(l0, shift=UP * 0.1), GrowFromEdge(plein, LEFT), FadeIn(tout), run_time=0.45)
        t1 = hors_audit(Text("40 cm", font_size=26, color=BLACK, weight=BOLD)).move_to(b[0])
        t2 = hors_audit(Text("35 cm", font_size=26, color=BLACK, weight=BOLD)).move_to(b[1])
        l1 = self.ligne([("Elle utilise", WHITE), ("40 cm", R1), (", puis", WHITE), ("35 cm.", R2)], 38, buff=0.2)
        l1[2].shift(LEFT * 0.15)
        gauche(l1, -6.2, -0.6)
        self.au_mot("Elle en utilise")
        self.play(FadeIn(l1[0], shift=UP * 0.1), run_time=0.3)
        self.aux_extraits([VGroup(l1[1], b[0], t1)], [("40 centimètres", 1)], run_time=0.35)
        self.au_mot("puis 35")
        self.play(FadeIn(l1[2]), FadeIn(l1[3]), FadeIn(b[1]), FadeIn(t2), run_time=0.35)
        quoi = Text("?", font_size=40, color=ORANGE_RETENUE, weight=BOLD).move_to(b[2])
        q = self.ligne([("Assez pour un gâteau de", JAUNE_TITRE), ("30 cm ?", ORANGE_RETENUE)], 38, buff=0.2)
        gauche(q, -6.2, -1.45)
        self.au_mot("Lui en reste-t-il assez")
        self.play(FadeOut(plein), FadeIn(b[2]), FadeIn(quoi, scale=1.3), FadeIn(q[0], shift=UP * 0.1), run_time=0.4)
        self.au_mot("30 centimètres")
        self.play(FadeIn(q[1], scale=1.1), run_time=0.3)
        self.pause_defi(y=-2.4)

    def ecran_correction(self):
        self.ecran("08b-correction", 0.65)
        tit = self.t("Correction", 50, JAUNE_TITRE).move_to(P(0, 3.15))
        self.play(Write(tit), run_time=0.35)
        b = self.la_barre(2.3, 0.05).move_to(P(3.6, 2.3))
        t1 = hors_audit(Text("40", font_size=22, color=BLACK, weight=BOLD)).move_to(b[0])
        t2 = hors_audit(Text("35", font_size=22, color=BLACK, weight=BOLD)).move_to(b[1])
        quoi = hors_audit(Text("?", font_size=30, color=ORANGE_RETENUE, weight=BOLD)).move_to(b[2])
        self.add(b, quoi)
        self.poser(VGroup(t1, t2), 0.15)
        c0 = self.ligne([("1 m", R3), ("= 100 cm", VERT_OK)], 40, buff=0.3)
        gauche(c0, -6.2, 2.3)
        c1 = self.ligne([("Utilisé :", GRAY_B), ("40", R1), ("+ 35", R2), ("= 75", BLEU_D)], 40, buff=0.25)
        gauche(c1, -6.2, 1.35)
        c2 = self.ligne([("Il reste :", GRAY_B), ("100", VERT_OK), ("− 75", BLEU_D), ("= 25 cm", ORANGE_RETENUE)],
                        40, buff=0.25)
        gauche(c2, -6.2, 0.4)
        for m in list(c0) + list(c1) + list(c2):
            hors_audit(m)
        self.aux_extraits([c0[0], c0[1]], [("1 mètre, c'est", 1), ("100 centimètres", 1)], run_time=0.25)
        self.aux_extraits([c1[0], c1[1], c1[2], c1[3]], [("Utilisé", 1), ("40 plus", 1), ("35, 75", 1), ("75. Il", 1)],
                          run_time=0.22)
        self.aux_extraits([c2[0], c2[1], c2[2]], [("Il reste", 1), ("100 moins", 1), ("75, 25", 1)], run_time=0.22)
        l25 = hors_audit(Text("25", font_size=22, color=BLACK, weight=BOLD)).move_to(b[2])
        self.aux_extraits([c2[3]], [("25 centimètres", 1)], run_time=0.3)
        self.play(Transform(quoi, l25), b[2].animate.set_fill(R3, opacity=0.9), run_time=0.35)
        # 25 contre 30 : deux rubans l'un sous l'autre
        ech = 0.12
        r25 = ruban(25 * ech, R3, 0.32).move_to(P(0, -0.7)).align_to(P(1.2, 0), LEFT)
        r30 = ruban(30 * ech, ORANGE_RETENUE, 0.32).move_to(P(0, -1.3)).align_to(P(1.2, 0), LEFT)
        e25 = hors_audit(self.t("25 cm", 26, R3)).next_to(r25, LEFT, buff=0.2)
        e30 = hors_audit(self.t("30 cm", 26, ORANGE_RETENUE)).next_to(r30, LEFT, buff=0.2)
        c3 = self.ligne([("25", ORANGE_RETENUE), ("< 30 :", WHITE), ("pas assez !", ROUGE_ERREUR)], 40, buff=0.25)
        gauche(c3, -6.2, -0.7)
        for m in c3:
            hors_audit(m)
        self.aux_extraits([VGroup(c3[0], r25, e25), VGroup(c3[1], r30, e30), c3[2]],
                          [("25, c'est", 1), ("que 30", 1), ("pas assez", 1)], run_time=0.3)
        manque = Rectangle(width=5 * ech, height=0.32, fill_color=ROUGE_ERREUR, fill_opacity=0.9, stroke_width=0)
        manque.next_to(r25, RIGHT, buff=0)
        c4 = self.ligne([("Il manque", WHITE), ("5 cm.", ROUGE_ERREUR)], 42, buff=0.25)
        gauche(c4, -6.2, -1.8)
        self.au_mot("Il manque")
        self.play(FadeIn(c4[0], shift=UP * 0.1), run_time=0.3)
        self.au_mot("manque 5")
        self.play(FadeIn(c4[1], scale=1.2), FadeIn(manque), run_time=0.35)
        self.insister(manque, 1.4, 0.25)
        self.attendre_voix()

    # ── 09 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("09-finale", 0.65)
        fig = gateau(0.9)
        lignes = self.finale_gauche(fig, textes=[
            ("Une même longueur peut s'écrire", "de plusieurs façons :", "12 cm = 120 mm = 1 dm et 2 cm."),
            ("Dans un défi : la même unité,", "puis on calcule étape par étape.")], fs=30)
        bloc = lignes[0][1]
        orig = bloc[2]
        pieces = self.morceaux_a_la_place(orig, ["12 cm", "= 120 mm", "= 1 dm", "et 2 cm."], fs=30)
        bloc.remove(orig)
        self.add(fig)
        self.au_mot("Une même longueur")
        self.montrer_ligne(lignes[0], Indicate(fig, scale_factor=1.05))
        self.poser_a([("12 centimètres", pieces[0]), ("120 millimètres", pieces[1]),
                      ("1 décimètre", pieces[2]), ("et 2", pieces[3])])
        self.au_mot("Dans un défi")
        self.montrer_ligne(lignes[1])
        self.attendre_voix(marge=1.0)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_mm()
        self.ecran_dm()
        self.ecran_question1()
        self.ecran_ruban()
        self.ecran_ruban_calcul()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("10-abonne")


class LongueurDefiCE2(LongueurDefiBase):
    identite = "Maths CE2 — EleveAI"
    ceinture = "bleue"
