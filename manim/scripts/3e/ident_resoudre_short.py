# ident_resoudre_short.py
# EleveAI — Maths 3e — série IDENTITÉS REMARQUABLES, épisode 08, le SHORT ceinture VERTE
# « La solution oubliée » : (x − 2)² = 25. Tu trouves 7 ? Il en manque une. La méthode en grand : 25 à
# gauche, (x − 2)² − 25 = 0, a² − b², (x − 7)(x + 3) = 0, produit nul : x = 7 ou x = −3.
#   · 1 question-pause (3 s) : x² − 1 = 0, bonne réponse A (deux solutions, 1 et −1) ;
#   · fin : résous (x + 3)² = 16, réponse en commentaire (x = 1 ou x = −7), puis la fin commune
#     (manim/fin_commune.py : appel_commentaire, ecran_fin).
# Micro : equation_carre_factoriser (3e, notion equation_resolution) ; s'appuie sur equation_produit_nul et
# litteral_identite. Métier : Tom, photographe (la paysage). Centres : reseaux-sociaux, art-design.
# Voix : manim/voix/3e-identites-resoudre-short.json (validée) ; marques : ident_resoudre_short_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/3e/ident_resoudre_short.py IdentResoudreShort3e --media_dir manim/scripts/3e/media-ident-08s-audit
# Rendu : PYTHONIOENCODING=utf-8 python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/3e/ident_resoudre_short.py IdentResoudreShort3e -o eleveai-maths-3e-identites-resoudre-short --media_dir manim/scripts/3e/media-ident-08s
# Sortie : manim/sorties/3e/maths/expression-litterale/08-resoudre-identite/eleveai-maths-3e-identites-resoudre-short.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI.parent / "4e"))  # equation_commun, distrib_simple_short, facto_simple_short
sys.path.insert(0, str(ICI))

from equation_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402
from equation_defi import E, _OutilsDefi  # noqa: E402
from equation_probleme import _OutilsProbleme  # noqa: E402
from distrib_simple_short import DistribSimpleShort4e  # noqa: E402
from facto_simple_short import FactoSimpleShort4e  # noqa: E402
from fin_commune import ecran_fin, appel_commentaire  # noqa: E402

PAROLE["²"] = "carré"

CARRE_A = "#93c5fd"
CARRE_B = "#c4b5fd"
DEPLACE = OPERATION


def idx(e, s, k=1):
    """L'indice du k-ième atome de texte s dans e."""
    n = 0
    for i, a in enumerate(e.atomes):
        if a.original_text == s:
            n += 1
            if n == k:
                return i
    raise ValueError(f"{s} absent de {e.s}")


class IdentResoudreShort3e(_OutilsProbleme, _OutilsDefi, ShortEq):
    nom_voix = "3e-identites-resoudre-short"
    fichier_marques = "ident_resoudre_short_marques.json"
    identite = "Maths 3e — EleveAI"
    ceinture = "verte"

    def l(self, s, y, fs=32, c=WHITE, lettres=""):
        """La ligne de DistribSimpleShort4e (bornée à 3,95) ; si elle doit rétrécir, on le dit."""
        e = E(s, fs, c, lettres=lettres)
        if e.width > 3.95:
            print(f"RETRECI « {s} » {e.width:.2f} > 3.95", flush=True)
            e.scale_to_fit_width(3.95)
        return e.move_to(P(0, y))

    def _disposer_q(self, question, choix, phrase):
        """22/11 (relecture -ql) : l'énoncé en 36 pt, les cartes larges (3,9 : 4,2 quand la bonne grossit) et hautes, le choix en 36 pt,
        une place pour la coche à droite ; tout au milieu de l'écran, au-dessus de Ti-Margo."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        if len(q.submobjects):
            q.scale(T(question[0], 36, audit=False).height / q[0].height)
            q.arrange(DOWN, buff=0.1).next_to(tete, DOWN, buff=0.15).set_x(0)
        for c in cartes:
            corps = c[1][1]
            if hasattr(corps, "s"):
                c[1].scale(Eq(corps.s, 36, lettres="").height / corps.height)
        larg = min(3.9, max(c[1].width for c in cartes) + 0.8)
        for c in cartes:
            ligne = c[1]
            if ligne.width > larg - 0.8:
                ligne.scale_to_fit_width(larg - 0.8)
            c[0].become(RoundedRectangle(width=larg, height=ligne.height + 0.26, corner_radius=0.14,
                                         stroke_color=BLEU_CALCUL, stroke_width=3, fill_color="#0b1220",
                                         fill_opacity=1))
            ligne.move_to(c[0]).align_to(c[0].get_left() + RIGHT * 0.18, LEFT)
        cartes.arrange(DOWN, buff=0.12).next_to(q, DOWN, buff=0.22).set_x(0)
        pause.next_to(cartes, DOWN, buff=0.14).set_x(0)
        ph.arrange(DOWN, buff=0.1).next_to(cartes, DOWN, buff=0.12).set_x(0)
        return tete, q, cartes, pause, rebours, ph

    monter_reponse = FactoSimpleShort4e.monter_reponse
    eq_dans_q = FactoSimpleShort4e.eq_dans_q

    def lx(self, s, y, fs=40, c=WHITE, largeur=3.7):
        """Une expression : x en bleu, bornée à `largeur` (une équation ne se coupe pas)."""
        e = E(s, fs, c, lettres="x")
        if e.width > largeur:
            e.scale_to_fit_width(largeur)
        return e.move_to(P(0, y))

    def dit_avec(self, e, phrase, gestes, n=1, rt=0.12):
        """Comme dit (sans zoom), mais l'atome i joue en plus les animations gestes[i]."""
        debut = -1
        for _ in range(n):
            debut = self._texte_voix.find(phrase, debut + 1)
        lots = self._plan_eq(e, debut, debut + len(phrase))
        for k, (pos, atomes) in enumerate(lots):
            self._attendre_pos(pos)
            d = rt
            if k + 1 < len(lots):
                gap = self._debut_voix + self._t_pos(lots[k + 1][0]) - self.renderer.time
                d = max(0.08, min(rt, gap - 0.01))
            ex = []
            for a in atomes:
                ex += gestes.get(e.atomes.index(a), [])
            self.play(*[FadeIn(a) for a in atomes], *ex, run_time=max(d, 0.25) if ex else d)
        return e

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("La solution oubliée", self.ceinture)
        titre.sans_synchro = True
        self.add(badge)
        garder = [badge, titre, margo]

        # ── 00 : l'accroche : (x − 2)² = 25, tu trouves 7 ? (toute la hauteur, au-dessus de Ti-Margo) ──
        self.dire("00-accroche")
        e0 = self.lx("(x − 2)² = 25", 1.35, 72, largeur=3.9)
        self.dire_eq(e0, "x moins 2, au carré, égale 25.", avec=[FadeIn(titre)])
        l1 = self.l("Tu trouves", 0.15, 48, CIEL)
        self.dit(l1, "Tu trouves")
        sept = self.l("7 ?", -0.95, 110, JAUNE_TITRE)
        self.dire_eq(sept, "7 ?", echelle=1.3)
        l2 = self.l("Il en manque", -2.0, 42, PIEGE)
        l2b = self.l("une !", -2.55, 42, PIEGE)
        self.dit(l2, "Il en manque")
        self.dit(l2b, "une.")
        self.play(Wiggle(sept), run_time=0.45)
        self.insister(VGroup(l2, l2b), 1.04, 0.15)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 01 : la méthode en grand, étalée sur la hauteur ; au produit nul, le haut s'efface et les
        # deux solutions s'écrivent en grand au milieu de l'écran ──
        self.dire("01-image")
        a0 = self.l("On ramène 25", 2.0, 38, CIEL)
        self.dit(a0, "On ramène 25")
        a0b = self.l("à gauche :", 1.4, 38, CIEL)
        self.dit(a0b, "à gauche :")
        e1 = self.lx("(x − 2)² − 25 = 0", 0.4, 50, largeur=4.0)
        i25 = idx(e1, "25")
        e1.atomes[i25].set_color(DEPLACE)
        e1.atomes[i25 - 1].set_color(DEPLACE)
        self.dire_eq(e1, "x moins 2, au carré, moins 25, égale 0.", echelle=1.15)
        a1 = self.l("C'est a² − b² :", -0.7, 40)
        a1.atomes[idx(a1, "a")].set_color(CARRE_A)
        a1.atomes[idx(a1, "b")].set_color(CARRE_B)
        ba = SurroundingRectangle(VGroup(*e1.atomes[0:6]), color=CARRE_A, buff=0.05, stroke_width=3)
        bb = SurroundingRectangle(e1.atomes[i25], color=CARRE_B, buff=0.05, stroke_width=3)
        self.dit_avec(a1, "C'est a au carré moins b au carré :",
                      {idx(a1, "a"): [Create(ba)], idx(a1, "b"): [Create(bb)]})
        e2 = self.lx("(x − 7)(x + 3) = 0", -1.9, 50, largeur=4.0)
        self.dire_eq(e2, "x moins 7, fois x plus 3, égale 0.", echelle=1.15, avec=[FadeOut(ba), FadeOut(bb)])
        a2 = self.l("Produit nul :", 0.55, 44, JAUNE_TITRE)
        self.dit(a2, "Produit nul :", rt=0.3,
                 avec=[FadeOut(VGroup(a0, a0b, e1, a1)), e2.animate.move_to(P(0, 1.6))])
        s1 = self.lx("x = 7", -0.55, 76, VERT_OK)
        ou = self.l("ou", -1.4, 48, JAUNE_TITRE)
        s2 = self.lx("x = −3", -2.25, 76, VERT_OK)
        self.dire_eq(s1, "x égale 7,", echelle=1.15)
        self.au("ou x égale moins", FadeIn(ou, scale=1.3), rt=0.25)
        self.dire_eq(s2, "x égale moins 3.", echelle=1.15)
        self.play(Circumscribe(s2, color=JAUNE_TITRE, buff=0.1), run_time=0.5)
        self.insister(s2, 1.08, 0.15)
        self.attendre_voix(marge=1.0)
        self.vider(garder)

        # ── 01q : la question-pause (3 s) ──
        def avant(sc):
            sc.eq_dans_q(0, "Combien de", "Combien de", lettres="", fs=36, couleur=JAUNE_TITRE)
            sc.eq_dans_q(0, "solutions a", "solutions a", lettres="", fs=36, couleur=JAUNE_TITRE)
            sc.eq_dans_q(0, "x² − 1 = 0 ?", "x au carré moins 1 égale 0 ?", lettres="x", fs=36,
                         couleur=JAUNE_TITRE)

        def apres(sc):
            sc.monter_reponse(0)
            sc.ph_eq(0, "Réponse A :", "Réponse A :", premier=True)
            sc.ph_eq(1, "(x − 1)(x + 1) = 0.", "x moins 1, fois x plus 1, égale 0.", lettres="x")
            sc.ph_eq(2, "Donc 1 et −1.", "Donc 1 et moins 1.")
            sc.rep_fini()

        self.question_pause("01q-question", "01r-reponse", ["Combien de", "solutions a", "x² − 1 = 0 ?"],
                            [Eq("1 et −1", 34, lettres=""), Eq("une seule", 34, lettres=""),
                             Eq("aucune", 34, lettres="")], 0,
                            ["Réponse A :", "(x − 1)(x + 1) = 0.", "Donc 1 et −1."],
                            avant_q=avant, autres_r=apres)

        # ── 02 : la question en commentaire, SANS Ti-Margo (17/11), puis la fin commune ──
        # Dessinée ici comme ident_developper_short : chaque nombre tombe sur son mot.
        self.dire("02-question")
        self.play(FadeOut(Group(*self.mobjects)), run_time=0.25)
        self.remove(*self.mobjects)
        tit = T("À toi !", 60, JAUNE_TITRE).move_to(P(0, 1.85))
        self.au("À toi", FadeIn(tit, shift=DOWN * 0.1), rt=0.35)
        q1 = self.l("Résous", 0.75, 52)
        self.dit(q1, "Résous")
        q2 = self.lx("(x + 3)² = 16", -0.4, 80, largeur=4.0)
        self.dire_eq(q2, "x plus 3, au carré, égale 16.", echelle=1.1)
        appel_commentaire(self, y=-2.0)
        self.attendre_voix(marge=0.6)
        ecran_fin(self, "short", voix="03-abonne")
