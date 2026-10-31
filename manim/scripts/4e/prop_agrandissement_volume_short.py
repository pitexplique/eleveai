# prop_agrandissement_volume_short.py
# EleveAI — Maths 4e — short jumeau de l'épisode 13 « Agrandir un volume »
# (micro agrandissement_volume). CEINTURE BLANCHE (règle du short blanc,
# REGLES.md). Il AMUSE : « Combien de petits dés pour un dé géant ? » → le dé
# 2 fois plus grand en demande 8, pas 2 !
#   · EN HAUT, l'image : le petit dé, le dé géant en fil de fer, puis les
#     petits dés qui s'EMPILENT dedans (2 en longueur, 2 en largeur, 2 en
#     hauteur), en perspective cavalière ;
#   · EN BAS, au même instant : « 2 en longueur… », 2 × 2 × 2 = 8 dés, « Pas 2 » ;
#   · 1 question-pause (3 s) : un dé 3 fois plus grand ? (27) ; leurres : 3
#     (× 3 comme une longueur), 9 (× 9 comme une aire) ;
#   · fin : un dé 4 fois plus grand, combien de petits dés ? (4 × 4 × 4 = 64)
#     en commentaire.
# Centres d'intérêt : jeux-defis. Aucun chiffre du monde réel : rien à sourcer.
#
# Voix : manim/voix/4e-prop-agrandissement-volume-short.json (validée le 31/10,
# débit −10) ; WAV : public/sons/4e-prop-agrandissement-volume-short/ ;
# marques : manim/scripts/4e/prop_agrandissement_volume_short_marques.json.
# Outils : Pave, Cadre3D, proj() repris de prop_agrandissement_volume.py
# (import) ; de() (un dé blanc à points) ajouté ici.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/prop_agrandissement_volume_short.py PropAgrandissementVolumeShort4e
# PYTHONIOENCODING=utf-8 python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/prop_agrandissement_volume_short.py PropAgrandissementVolumeShort4e -o eleveai-maths-4e-prop-agrandissement-volume-short --media_dir manim/media-prop-4e-13
# Sortie : manim/sorties/4e/maths/proportionnalite/13-agrandissement-volume/eleveai-maths-4e-prop-agrandissement-volume-short.mp4

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))

from prop_commun import *  # noqa: E402,F403
from prop_agrandissement_volume import Cadre3D, Pave, gras, proj, sans  # noqa: E402

BLANC_DE = ("#f8fafc", "#ffffff", "#cbd5e1")   # avant, dessus, droite
ROUGE_DE = "#dc2626"
FACE = {  # les points de chaque face visible, en coordonnées de la face (0..1)
    "avant": [(0.25, 0.25), (0.75, 0.25), (0.5, 0.5), (0.25, 0.75), (0.75, 0.75)],   # 5
    "dessus": [(0.25, 0.25), (0.75, 0.75)],                                        # 2
    "droite": [(0.25, 0.25), (0.5, 0.5), (0.75, 0.75)],                            # 3
}


def de(x=0, y=0, z=0, o=ORIGIN, u=1.0):
    """Un dé blanc 1 × 1 × 1 en (x, y, z), points rouges sur les trois faces vues."""
    p = Pave(1, 1, 1, x, y, z, o, u, BLANC_DE, bord="#334155", sw=2)
    pts = VGroup()
    r = 0.085 * u
    for s, t in FACE["avant"]:
        pts.add(Dot(proj(x + s, y, z + t, o, u), radius=r, color=ROUGE_DE))
    for s, t in FACE["dessus"]:
        pts.add(Ellipse(width=2 * r, height=1.1 * r, color=ROUGE_DE, fill_opacity=1, stroke_width=0)
                .move_to(proj(x + s, y + t, z + 1, o, u)))
    for s, t in FACE["droite"]:
        pts.add(Ellipse(width=1.1 * r, height=2 * r, color=ROUGE_DE, fill_opacity=1, stroke_width=0)
                .move_to(proj(x + 1, y + s, z + t, o, u)))
    g = VGroup(p, pts)
    g.pave = p
    return g


def des_empiles(n, o, u):
    """n × n × n dés, ordre du peintre par z_index ; .rangee(j, k), .couche(k)."""
    g = VGroup()
    g.cases = {}
    for j in reversed(range(n)):
        for i in range(n):
            for k in range(n):
                d = de(i, j, k, o, u)
                d.set_z_index((n - 1 - j) * 100 + i * 10 + k + 1)
                for f in d.get_family():
                    f.z_index = d.z_index
                g.cases[(i, j, k)] = d
                g.add(d)
    g.rangee = lambda j, k: VGroup(*[g.cases[(i, j, k)] for i in range(n)])  # noqa: E731
    g.couche = lambda k: VGroup(*[g.cases[(i, j, k)] for j in reversed(range(n)) for i in range(n)])  # noqa: E731
    return g


class PropAgrandissementVolumeShort4e(ShortProp):
    nom_voix = "4e-prop-agrandissement-volume-short"
    fichier_marques = "prop_agrandissement_volume_short_marques.json"
    ceinture = "blanche"

    def _rep_q(self, sc):
        lg = sc.ligne_rep(0, ["3 ×", "3 ×", "3 =", "27 dés."])
        for m, mot in zip(lg, [("3 fois", 1), ("3 fois", 2), ("3, égale", 1), ("27 dés", 1)]):
            sc.au_mot(*mot)
            sc.play(FadeIn(m, shift=UP * 0.12), run_time=0.25)
        sc.rep_fini()

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Le dé géant", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [margo, titre, badge]
        u = 0.78
        o = P(-0.75, 0.05)

        # ── 00 : l'accroche : combien de petits dés pour un dé géant ? ──
        self.dire("00-accroche")
        petit = de(o=P(-2.05, 1.2), u=u)
        geant = Cadre3D(2, 2, 2, o=o, u=u, couleur=WHITE, sw=4).set_z_index(4000)
        q = self.borne(self.t("Combien de petits dés ?", 34, AMBRE), 0.6).move_to(P(0, -0.75))
        self.au_mot("Combien")
        self.play(Write(titre), FadeIn(q, shift=UP * 0.15), run_time=0.6)
        self.au_mot("petits dés")
        self.play(FadeIn(petit, scale=0.6), run_time=0.45)
        self.au_mot("dé géant")
        self.play(Create(geant), run_time=0.8)
        self.insister(q, 1.08)
        self.attendre_voix(marge=0.2)

        # ── 01 : 2 fois plus grand dans chaque sens ──
        self.dire("01-geant")
        k = geant.coins
        x2 = VGroup(gras("× 2", 30, AMBRE).next_to((k["o"] + k["a"]) / 2, DOWN, buff=0.12),
                    gras("× 2", 30, AMBRE).next_to((k["a"] + k["b"]) / 2, RIGHT, buff=0.1).shift(DOWN * 0.1),
                    gras("× 2", 30, AMBRE).next_to((k["o"] + k["c"]) / 2, LEFT, buff=0.1))
        x2.set_z_index(6000)
        L1 = self.ligne([("× 2", AMBRE), ("dans chaque sens", WHITE)], 34).move_to(P(0, -1.5))
        self.au_mot("Le dé géant")
        self.play(Indicate(geant.vues, color=AMBRE, scale_factor=1.03), run_time=0.5)
        self.au_mot("2 fois")
        self.play(FadeIn(L1[0], scale=1.3), LaggedStart(*[FadeIn(t, scale=1.3) for t in x2], lag_ratio=0.3),
                  run_time=0.7)
        self.au_mot("dans chaque")
        self.play(FadeIn(L1[1], shift=RIGHT * 0.15), run_time=0.4)
        self.attendre_voix(marge=0.2)

        # ── 02 : on empile : 2 × 2 × 2 = 8 dés ! Pas 2. ──
        self.dire("02-empiler")
        emp = des_empiles(2, o, u)
        ys = (-0.55, -1.05, -1.55)
        lignes = []
        for y, mot, groupe, cle in zip(ys, ("longueur", "largeur", "hauteur"),
                                       (emp.rangee(0, 0), emp.rangee(1, 0), emp.couche(1)),
                                       ("2 dés en longueur", "2 en largeur", "2 en hauteur")):
            lg = self.ligne([("2", AMBRE), (("dés en " if mot == "longueur" else "en ") + mot, WHITE)], 32)
            lg.move_to(P(0, y))
            lignes.append(lg)
            self.au_mot(cle)
            anims = [FadeIn(lg, shift=RIGHT * 0.15),
                     LaggedStart(*[FadeIn(d, shift=DOWN * 0.3) for d in groupe], lag_ratio=0.3)]
            if mot == "longueur":
                anims += [FadeOut(geant.cachees), FadeOut(q), FadeOut(L1), FadeOut(x2), FadeOut(petit)]
            self.play(*anims, run_time=0.6)
        R = self.borne(self.ligne([("2 ×", AMBRE), ("2 ×", AMBRE), ("2 =", AMBRE), ("8 dés !", VERT_OK)], 40),
                       0.5).move_to(P(0, -0.85))
        self.au_mot("2 fois")
        self.play(FadeOut(VGroup(*lignes)), FadeIn(R[0], shift=RIGHT * 0.15), run_time=0.3)
        self.au_mot("2 fois", 2)
        self.play(FadeIn(R[1], shift=RIGHT * 0.15), run_time=0.25)
        self.au_mot("2, égale")
        self.play(FadeIn(R[2], shift=RIGHT * 0.15), run_time=0.25)
        self.au_mot("8 dés")
        self.play(FadeIn(R[3], scale=1.3), Circumscribe(emp, color=VERT_OK, time_width=0.6), run_time=0.7)
        pas = self.ligne([("Pas", ROUGE_ERREUR), ("2 !", ROUGE_ERREUR)], 44).move_to(P(0, -1.75))
        self.au_mot("Pas 2")
        self.play(FadeIn(pas, scale=1.3), run_time=0.35)
        self.play(Create(croix(pas[1], sw=6)), run_time=0.3)
        self.attendre_voix(marge=0.2)
        self.vider(garder)

        # ── 03 : la question-pause (3 s) : 3 fois plus grand ──
        self.question_pause("03-question", "03b-reponse",
                            ["Un dé 3 fois plus grand", "dans chaque sens.", "Combien de petits dés ?"],
                            [self.t("3", 30), self.t("9", 30), self.t("27", 30)], 2,
                            ["3 × 3 × 3 = 27 dés."], mot_q="Un dé", autres_r=self._rep_q)
        self.vider(garder)

        # ── 04 : la question en commentaire : 4 fois plus grand ──
        self.dire("04-commentaire")
        u4 = 0.38
        o4 = P(-0.85, 0.15)
        p4 = de(o=P(-2.05, 1.6), u=u4)
        g4 = Cadre3D(4, 4, 4, o=o4, u=u4, couleur=WHITE, sw=4)
        k4 = g4.coins
        x4 = VGroup(gras("× 4", 30, AMBRE).next_to((k4["o"] + k4["a"]) / 2, DOWN, buff=0.12),
                    gras("× 4", 30, AMBRE).next_to((k4["a"] + k4["b"]) / 2, RIGHT, buff=0.1).shift(DOWN * 0.1),
                    gras("× 4", 30, AMBRE).next_to((k4["o"] + k4["c"]) / 2, LEFT, buff=0.1))
        self.au_mot("Et toi")
        self.play(FadeIn(p4, scale=0.6), Create(g4), run_time=0.6)
        L4 = self.ligne([("× 4", AMBRE), ("dans chaque sens", WHITE)], 32).move_to(P(0, -0.6))
        self.au_mot("4 fois")
        self.play(FadeIn(L4[0], scale=1.3), LaggedStart(*[FadeIn(t, scale=1.3) for t in x4], lag_ratio=0.3),
                  run_time=0.6)
        self.au_mot("dans chaque")
        self.play(FadeIn(L4[1], shift=RIGHT * 0.15), run_time=0.35)
        qq = self.borne(self.t("? petits dés", 40, BLEU_CALCUL), 0.6).move_to(P(0, -1.25))
        qq.sans_synchro = True
        self.au_mot("combien")
        self.play(FadeIn(qq, scale=1.2), run_time=0.4)
        self.insister(qq, 1.1)
        self.appel_commentaire(y=-1.95)
