# espace_plan_equation_short.py
# EleveAI — Maths Tle spé — short « une équation, c'est un plan » (9:16), ceinture VERTE.
# Micro du coach : espace_plan_equation. Paysage jumeau : espace_plan_equation.py (HD livré).
#
# ⭐ UNE SEULE IDÉE : dans l'espace, une seule équation à trois inconnues décrit un PLAN,
# jamais une droite. ⛔ Un short ne résume pas son épisode.
#
#   · 00-accroche   : dans le plan une droite, dans l'espace un plan tout entier ;
#   · 01-idee       : z = 0 n'est pas un point de hauteur nulle, c'est le sol ;
#   · 02/02b        : question-pause (C : un plan), 3 s ;
#   · 03-commentaire: y = −3 — ⛔ la réponse n'est ni dite ni affichée ;
#   · 04-abonne     : la fin commune.
#
# ⭐ LE SOL SE PROJETTE BIEN, et ce n'est pas un hasard : `platitude((0 ; 0 ; 1))` vaut
# **14,9°**, au-dessus du seuil de 12° en dessous duquel un morceau de plan se lit comme
# une lame (le NOYAU de la cavalière, `espace3d.py`). Le contrôle est une assertion
# d'import : si le seuil du socle change, l'écran casse au lieu de mentir.
#
# Voix : manim/voix/terminale-espace-plan-equation-short.json (débit −6).
# Mesure : python -X utf8 manim/scripts/terminale/espace_mesure_short.py E4
# Dry run : AUDIT=1 BORDS=1 PYTHONIOENCODING=utf-8 python -X utf8 -m manim render --dry_run -qh -r 1080,1920 manim/scripts/terminale/espace_plan_equation_short.py EspacePlanEquationShort
# Planche : PYTHONIOENCODING=utf-8 python -X utf8 -m manim render -ql -r 1080,1920 --disable_caching manim/scripts/terminale/espace_plan_equation_short.py EspacePlanEquationShort -o eleveai-maths-terminale-espace-plan-equation-short --media_dir manim/scripts/terminale/media-espace-plan-equation-short

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from espace_commun_short import *  # noqa: E402,F403

# ── LES DONNÉES, vérifiées à l'import ───────────────────────────────────────
NORMALE_SOL = (0, 0, 1)                      # le plan z = 0, celui de l'écran 01
BONNE = 2                                    # C — tirage des shorts (B C A C A B)
CHOIX = ("une droite", "un point", "un plan")
assert CHOIX[BONNE] == "un plan"
assert len(set(CHOIX)) == 3                  # trois natures, exclusives par dimension
# ⛔ LE CONTRÔLE QUI DOIT POUVOIR ÉCHOUER : si le sol se projetait sous 12°, il se
# lirait comme une lame et l'écran 01 contredirait sa propre légende (« le sol tout
# entier »). Mesuré : 14,9°.
assert platitude(NORMALE_SOL) > 12.0, platitude(NORMALE_SOL)


def pieces(e):
    """BÂTIT et POSITIONNE les six écrans, sans rien jouer."""
    p = {}
    titre, badge = e.entete_blocs("Plans")

    # ── 00 : l'accroche, deux mondes ────────────────────────────────────────
    a1 = e.blocs_phrase("Dans le plan, une équation donne une droite.", 1.70, 28, GREY_A)
    a2 = e.blocs_phrase("Dans l'espace, elle donne un plan tout entier.", 0.15, 28, C_PLAN)
    a3 = e.blocs_phrase("C'est le piège le plus coûteux du chapitre.", -1.70, 28, C_PIEGE)
    cadre = SurroundingRectangle(a3, color=C_PIEGE, buff=0.14, stroke_width=3)
    p["00-accroche"] = [("titre", titre), ("badge", badge), ("dans le plan", a1),
                        ("dans l'espace", a2), ("le piège", VGroup(a3, cadre))]

    # ── 01 : z = 0, c'est le sol ────────────────────────────────────────────
    eq = e.pose(e.eq_mots(["z", "=", "0"], 40, C_REGARD), 2.00)
    cadre_eq = SurroundingRectangle(eq, color=C_REGARD, buff=0.14, stroke_width=3)
    r, axes = e.repere(o=(0.0, 0.0), u=0.46, portee=3)
    # ⚠️ `demi = 1,1` est mesuré avec la figure : un morceau plus large sort du cadre en
    # 9:16 (la marge s'arrête à x = ±2,115, soit moins de la moitié d'un paysage).
    sol = r.plan(NORMALE_SOL, d=0.0, centre=(1, 1, 0), demi=1.1, couleur=C_PLAN, op=0.30)
    fig = VGroup(axes, sol)
    fig.move_to(P(0.0, 0.58))
    ph1 = e.blocs_phrase("c'est le sol tout entier, le plan x O y.", -1.30, 26)
    ph2 = e.blocs_phrase("deux libertés font une surface.", -2.40, 26, GREY_A)
    p["01-idee"] = [("titre", titre), ("badge", badge), ("l'équation", VGroup(eq, cadre_eq)),
                    ("le sol", fig), ("le plan xOy", ph1), ("deux libertés", ph2)]

    # ── 02 / 02b : la question-pause ────────────────────────────────────────
    # ⭐ 30/30 vient d'un balayage hors rendu : les trois choix tiennent sur une ligne,
    # donc c'est le plus grand couple de la série des six.
    fsq, fsc = 30, 30
    q_lignes, _ = e.lignes("Dans l'espace, les points tels que x = 2, c'est :", fsq)
    tete, q, cartes, pause, rebours = e.q_tete(q_lignes, list(CHOIX), fs_q=fsq, fs_c=fsc)
    p["02-question"] = [("titre", titre), ("badge", badge), ("tête", tete),
                        ("rebours", rebours), ("question", q), ("cartes", cartes),
                        ("pause", pause)]
    # ⚠️ Hérite de la question : la place libre est AU-DESSUS des cartes.
    haut = float(cartes.get_top()[1])
    r1 = e.pose(e.eq_mots(["1x", "+", "0y", "+", "0z", "−", "2", "=", "0"], 26, VERT_OK),
                haut + 1.35)
    r2 = e.blocs_phrase("Ici y et z sont libres.", haut + 0.55, 26, GREY_A)
    p["02b-reponse"] = [("titre", titre), ("badge", badge), ("cartes", cartes),
                        ("l'équation complète", r1), ("y et z libres", r2)]

    # ── 03 : la question en commentaire ─────────────────────────────────────
    et = e.pose(e.t("À toi !", 38, JAUNE_TITRE, larg=None), 3.50)
    eq3 = e.pose(e.eq_mots(["y", "=", "−3"], 48, C_REGARD), 1.70)
    cadre3 = SurroundingRectangle(eq3, color=C_REGARD, buff=0.16, stroke_width=3)
    dq = e.blocs_phrase("c'est quoi ?", 0.20, 34)
    appel = e.appel_blocs(-1.60)
    p["03-commentaire"] = [("à toi", et), ("l'équation", VGroup(eq3, cadre3)),
                           ("question", dq), ("appel", appel)]
    return p


class EspacePlanEquationShort(ShortEspace):
    fichier_marques = "espace_plan_equation_short_marques.json"
    nom_voix = "terminale-espace-plan-equation-short"

    def construct(self):
        p = pieces(self)
        titre, badge = p["00-accroche"][0][1], p["00-accroche"][1][1]
        a1, a2, a3g = (x[1] for x in p["00-accroche"][2:])

        # ── 00 ──────────────────────────────────────────────────────────────
        # ⛔ Titre AJOUTÉ avant la voix (mesuré E1 : 0,50 s de retard sinon).
        self.margo_bas()
        self.add(titre, badge)
        self.dire("00-accroche")
        self.jouer_phrase(a1, "Dans le plan, une équation donne une droite.")
        self.jouer_phrase(a2, "Dans l'espace, elle donne un plan tout entier.")
        self.jouer_phrase(a3g[0], "C'est le piège le plus coûteux du chapitre.")
        self.play(Create(a3g[1]), run_time=0.3)
        self.insister(a3g, 1.05)
        self.attendre_voix(marge=0.25)

        # ── 01 ──────────────────────────────────────────────────────────────
        self.dire("01-idee")
        eqg, fig, ph1, ph2 = (x[1] for x in p["01-idee"][2:])
        self.play(FadeOut(VGroup(a1, a2, a3g)), run_time=0.25)
        self.au_fin("l'équation z égale zéro")
        self.play(FadeIn(eqg[0], scale=1.2), Create(eqg[1]), run_time=0.4)
        axes, sol = fig
        # ⚠️ 0,3 et 0,4 au lieu de 0,4 et 0,6 : mesuré au dry run, la dernière phrase de
        # l'écran arrivait **0,83 s en retard** parce que tout ce qui précède prenait
        # plus de temps que la voix n'en laisse. Ce n'est pas une cote d'image, c'est un
        # budget de secondes — et il se mesure, il ne s'estime pas.
        self.au_mot("ce n'est pas un point")
        self.play(Create(axes), run_time=0.3)
        # ⭐ Le morceau de sol paraît AVEC sa légende, pas avant : mis en file, son
        # `run_time` coûtait 0,4 s au budget du clip et la phrase suivante arrivait
        # 0,83 s en retard (mesuré au dry run).
        self.jouer_phrase(ph1, "c'est le sol tout entier, le plan x O y.",
                          avec=[FadeIn(sol, scale=0.85)])
        self.jouer_phrase(ph2, "deux libertés font une surface.")
        self.attendre_voix(marge=0.3)

        # ── 02 ──────────────────────────────────────────────────────────────
        self.dire("02-question")
        t0 = self.renderer.time
        tete, rebours, q, cartes, pause = (x[1] for x in p["02-question"][2:])
        self.play(FadeOut(VGroup(eqg, fig, ph1, ph2)), run_time=0.3)
        self.au_mot("Question")
        self.play(FadeIn(tete, shift=DOWN * 0.12), run_time=0.3)
        self.au_mot("Dans l'espace")
        self.play(FadeIn(q[0], shift=UP * 0.08), run_time=0.25)
        self.au_fin("les points tels que x égale 2")
        self.play(FadeIn(q[1:], shift=UP * 0.08), run_time=0.3)
        self.q_montrer_choix(cartes)
        self.q_pause(pause, rebours, "02-question", t0, BONNE)

        # ── 02b ─────────────────────────────────────────────────────────────
        self.dire("02b-reponse")
        r1, r2 = p["02b-reponse"][3][1], p["02b-reponse"][4][1]
        ok = self.q_reponse(cartes, BONNE, pause, rebours)
        self.play(FadeOut(VGroup(tete, q)), run_time=0.25)
        self.au_fin("moins 2, égale zéro")
        self.play(FadeIn(r1, shift=UP * 0.08), run_time=0.4)
        self.jouer_phrase(r2, "Ici y et z sont libres.")
        self.attendre_voix(marge=0.3)

        # ── 03 ──────────────────────────────────────────────────────────────
        self.dire("03-commentaire")
        et, eq3g, dq, appel = (x[1] for x in p["03-commentaire"])
        self.play(FadeOut(VGroup(cartes, r1, r2, ok, titre, badge)), run_time=0.3)
        self.au_mot("À toi")
        self.play(FadeIn(et, shift=DOWN * 0.1), run_time=0.35)
        self.au_fin("y égale moins 3")
        self.play(FadeIn(eq3g[0], scale=1.2), Create(eq3g[1]), run_time=0.45)
        self.jouer_phrase(dq, "c'est quoi ?")
        self.jouer_appel(appel)
        self.attendre_voix(marge=0.5)

        # ── 04 ──────────────────────────────────────────────────────────────
        self.fin_short("04-abonne", [et, eq3g, dq, appel])
