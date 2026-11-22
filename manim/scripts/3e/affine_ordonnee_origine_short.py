# affine_ordonnee_origine_short.py
# EleveAI — Maths 3e — série FONCTIONS AFFINES, épisode 03, le SHORT ceinture JAUNE
# « Le prix de départ » : salle de sport à 20 € par mois, pourquoi la droite ne part-elle pas de zéro ?
# Les frais d'inscription (30 €) : f(x) = 20x + 30, f(0) = 30, la droite coupe l'axe vertical à 30.
# Écrans (clés de la voix) :
#   00-accroche   l'haltère, « 20 € par mois », la droite qui ne part pas de zéro
#   01-image      inscription 30 € : f(x) = 20x + 30, f(0) = 30, l'ordonnée à l'origine
#   01q / 01r     QUESTION (3 s) : f(x) = 20x + 30, f(0) ? réponse C (30)
#   02-question   écran commentaire SANS Ti-Margo : axe vertical à −2, monte de 3 (réponse f(x) = 3x − 2)
#   03-abonne     fin commune (manim/fin_commune.py)
# Lettre de la question : 01q → C.
# Métier de la paysage : Léo, moniteur d'auto-école. Micro : fonctions affines, l'ordonnée à l'origine b.
# Code couleur : x bleu ; a (20 € par mois, « monte de 3 ») orange ; b (30, −2) violet ; droite bleue.
# Voix : manim/voix/3e-affine-ordonnee-origine-short.json (validée) ; marques : affine_ordonnee_origine_short_marques.json.
# Audit : PYTHONIOENCODING=utf-8 AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/3e/affine_ordonnee_origine_short.py AffineOrdonneeOrigineShort3e --media_dir manim/scripts/3e/media-affine-03s-audit
# Rendu : PYTHONIOENCODING=utf-8 python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/3e/affine_ordonnee_origine_short.py AffineOrdonneeOrigineShort3e -o eleveai-maths-3e-affine-ordonnee-origine-short --media_dir manim/scripts/3e/media-affine-03s
# Sortie : manim/sorties/3e/maths/fonctions-affines/03-ordonnee-origine/eleveai-maths-3e-affine-ordonnee-origine-short.mp4

import os
import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI.parent / "4e"))  # la série IDENTITÉS 4e et ses outils communs
sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

from equation_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402
from ident_developper import X  # noqa: E402
from ident_developper_short import IdentDevelopperShort4e  # noqa: E402
from ident_factoriser_short import IdentFactoriserShort3e  # noqa: E402
from affine_ordonnee_origine import COEF_A, ORD_B, AuditPlace, Repere, colorer  # noqa: E402
from fin_commune import ecran_fin, appel_commentaire  # noqa: E402

PAROLE["0"] = "0"
PAROLE["€"] = "euros"


def haltere(s=1.0):
    """Un haltère : la barre et deux paires de disques."""
    barre = RoundedRectangle(width=1.5, height=0.1, corner_radius=0.04, fill_color="#9ca3af", fill_opacity=1,
                             stroke_width=0)
    g = VGroup(barre)
    for sx in (-1, 1):
        g.add(RoundedRectangle(width=0.16, height=0.62, corner_radius=0.05, fill_color="#1f2937", fill_opacity=1,
                               stroke_color="#e5e7eb", stroke_width=2).move_to(P(sx * 0.52, 0)))
        g.add(RoundedRectangle(width=0.14, height=0.44, corner_radius=0.05, fill_color="#374151", fill_opacity=1,
                               stroke_color="#e5e7eb", stroke_width=2).move_to(P(sx * 0.68, 0)))
    return g.scale(s)


class AffineOrdonneeOrigineShort3e(AuditPlace, IdentFactoriserShort3e):
    nom_voix = "3e-affine-ordonnee-origine-short"
    fichier_marques = "affine_ordonnee_origine_short_marques.json"
    identite = "Maths 3e — EleveAI"
    ceinture = "jaune"

    def lf(self, s, y, fs=38, c=WHITE, a=(), b=()):
        return colorer(self.l(s, y, fs, c, lettres="x"), a, b)

    def eq_q(self, s, phrase, couleur=WHITE, a=(), b=()):
        """Dans avant_q : la PREMIÈRE ligne restante de la question devient une expression colorée, au mot."""
        ref = self.q_q[0]
        e = colorer(X(s, 36, couleur), a, b)
        if e.width > 3.9:
            e.scale_to_fit_width(3.9)
        e.move_to(ref)
        self.q_q.remove(ref)
        self._q_aff.append(e)
        self.dire_eq(e, phrase)
        return e

    def _disposer_q(self, question, choix, phrase):
        """2e relecture -ql du 22/11 : énoncé en trois lignes serrées à 36 pt, cartes tassées (0,5 de haut,
        chiffres à 40 pt), « Mets pause, / et choisis ! » à 32 pt dessous :
        son bas reste au-dessus de −2,45 (Ti-Margo, centré en bas, a son haut à −2,92)."""
        tete, q, cartes, pause, rebours, ph = IdentDevelopperShort4e._disposer_q(self, question, choix, phrase)
        dy = 1.95 - tete.get_y()
        tete.shift(UP * dy)
        rebours.shift(UP * dy)
        # des repères neufs à 36 pt (ceux du gabarit sortaient à ~29 pt effectifs) : eq_q pose dessus, au mot.
        # « Combien vaut f(0) ? » ne tient pas sur une ligne (5,2 de large à 38 pt) : trois lignes serrées.
        neufs = [T(s, 36, audit=False) for s in question]
        q.remove(*list(q.submobjects))
        q.add(*neufs)
        q.arrange(DOWN, buff=0.06)
        if os.environ.get("AUDIT") == "1":
            print("LARGEURS q " + " ".join(f"{m.width:.2f}" for m in q), flush=True)
        if q.width > 3.9:
            q.scale_to_fit_width(3.9)
        q.next_to(tete, DOWN, buff=0.1).set_x(0)
        for c in cartes:
            cadre, pas, corps = c[0], c[1][0], c[1][1]
            corps.scale(40 / self._fs(corps))
            pas.scale(0.44 / pas.height)
            cadre.stretch_to_fit_height(0.5)
            cadre.stretch_to_fit_width(max(2.4, pas.width + corps.width + 1.5))
            pas.next_to(cadre.get_left(), RIGHT, buff=0.14).set_y(cadre.get_y())
            corps.next_to(pas, RIGHT, buff=0.25).set_y(cadre.get_y())
        cartes.arrange(DOWN, buff=0.06).next_to(q, DOWN, buff=0.1).set_x(0)
        neuf = VGroup(T("Mets pause,", 32, ORANGE_RETENUE, audit=False),
                      T("et choisis !", 32, ORANGE_RETENUE, audit=False)).arrange(DOWN, buff=0.05)
        for f in neuf.get_family():
            f.sans_synchro = True
        neuf.next_to(cartes, DOWN, buff=0.08).set_x(0)
        ph.arrange(DOWN, buff=0.12).next_to(cartes, DOWN, buff=0.15).set_x(0)
        self._q_aff = []
        if os.environ.get("AUDIT") == "1":
            print(f"MISE-EN-PAGE badge bas {self._badge.get_bottom()[1]:.2f} tete {tete.get_top()[1]:.2f}/"
                  f"{tete.get_bottom()[1]:.2f} rebours bas {rebours.get_bottom()[1]:.2f} "
                  f"q {q.get_top()[1]:.2f}/{q.get_bottom()[1]:.2f} ({self._fs(q):.0f} pt) "
                  f"cartes {cartes.get_top()[1]:.2f}/{cartes.get_bottom()[1]:.2f} ({self._fs(cartes[0][1][1]):.0f} pt) "
                  f"pause bas {neuf.get_bottom()[1]:.2f} ({self._fs(neuf):.0f} pt ; Ti-Margo −2,92, visé ≥ −2,45)",
                  flush=True)
        return tete, q, cartes, neuf, rebours, ph

    def place_reponse(self):
        """Après le ✓ : les cartes ET l'énoncé s'effacent ; la réponse prend toute la place, à ~40 pt."""
        self._audit_place()  # l'écran de la question, cartes comprises
        cartes, ph = self.cartes_q, self.ph_q
        vieux = [cartes, self.mobjects[-1], *self._q_aff, *self.q_q.submobjects]
        self.play(*[FadeOut(m) for m in vieux], run_time=0.25)
        haut = 1.5
        ph.arrange(DOWN, buff=0.22)
        k = min(T(ph[0].original_text, 40, audit=False).height / ph[0].height, 3.9 / ph.width,
                (haut + 2.7) / ph.height)
        ph.scale(k).next_to(P(0, haut), DOWN, buff=0).set_x(0)
        if os.environ.get("AUDIT") == "1":
            fs = 30 * ph[0].height / T(ph[0].original_text, 30, audit=False).height
            print(f"REPONSE taille {fs:.0f} pt, bas {ph.get_bottom()[1]:.2f}", flush=True)

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Le prix de départ", self.ceinture)
        titre.sans_synchro = True
        self._badge = badge
        self.add(badge)
        garder = [badge, titre, margo]
        Y = [-1.1, -1.58, -2.06, -2.52]  # les lignes sous le repère (au-dessus de Ti-Margo)

        # ── 00 : l'accroche : 20 € par mois, et la droite ne part pas de zéro ──
        self.dire("00-accroche")
        h = haltere(0.55).move_to(P(-0.6, 0.95))  # dans le coin vide du futur repère
        self.au("Salle de sport", FadeIn(titre), FadeIn(h, scale=0.8), rt=0.4)
        mois = self.lf("20 € par mois.", 1.95, 38, a=("20",))
        self.dit(mois, "20 euros par mois.")
        # le repère : ≈ 90 % de la largeur, la droite s'arrête sous la dernière graduation (120).
        # -ql 22/11 : graduations 60 et 120 (40 serrait l'étiquette « 30 », posée à gauche de l'axe) ;
        # le « € » monte à droite de la pointe, loin de « 120 ».
        r = Repere(P(-1.25, -0.35), 0.74, 0.0135, 0, 4.35, 0, 132, xt=(1, 2, 3, 4), yt=(60, 120))
        r.noms.add(T("€", 30, CIEL, audit=False).next_to(r.ay.get_end(), RIGHT, buff=0.3).shift(UP * 0.08))
        xnom = T("mois", 32, CIEL, audit=False).move_to(P(1.6, -0.08))
        d = r.droite(lambda x: 20 * x + 30, 0, 4)
        pt = r.point(0, 30, r=0.1)
        o = Circle(radius=0.16, stroke_color=PIEGE, stroke_width=4).move_to(r.p(0, 0))
        if os.environ.get("AUDIT") == "1":
            print(f"MISE-EN-PAGE repere {r.get_left()[0]:.2f}..{r.get_right()[0]:.2f} x {r.get_bottom()[1]:.2f}.."
                  f"{r.get_top()[1]:.2f} ; badge bas {badge.get_bottom()[1]:.2f}, ligne haute {mois.get_top()[1]:.2f}",
                  flush=True)
        self.au("Alors pourquoi", FadeIn(r), FadeIn(xnom), rt=0.35)
        l1 = self.lf("Pourquoi", Y[0], 36)
        self.dit(l1, "pourquoi")
        l2 = self.lf("la droite", Y[1], 36)
        self.poser_gestes(l2, "la droite", {1: lambda: [Create(d)]}, rt=0.3)
        l3 = self.lf("ne part pas", Y[2], 36, JAUNE_TITRE)
        self.dit(l3, "ne part-elle pas")
        l4 = self.lf("de zéro ?", Y[3], 36, JAUNE_TITRE)
        self.poser_gestes(l4, "de zéro ?", {1: lambda: [Create(o)]})
        self.play(Indicate(d, color=JAUNE_TITRE), run_time=0.4)
        self.attendre_voix(marge=0.3)

        # ── 01 : les frais d'inscription : f(0) = 30 ──
        self.dire("01-image")
        self.play(FadeOut(VGroup(l1, l2, l3, l4, o)), run_time=0.25)
        lab = T("30", 34, ORD_B).next_to(r.p(0, 30), LEFT, buff=0.16)  # à gauche de l'axe, à hauteur du point
        if os.environ.get("AUDIT") == "1":
            g60 = next(t for t in r.grad if isinstance(t, Text) and t.original_text == "60")
            g0 = next(t for t in r.grad if isinstance(t, Text) and t.original_text == "0")
            e_ = r.noms[-1]
            g120 = next(t for t in r.grad if isinstance(t, Text) and t.original_text == "120")
            print(f"MISE-EN-PAGE « 30 » y[{lab.get_bottom()[1]:.2f}, {lab.get_top()[1]:.2f}] x[{lab.get_left()[0]:.2f}, "
                  f"{lab.get_right()[0]:.2f}] ; « 60 » bas {g60.get_bottom()[1]:.2f} ; « 0 » haut {g0.get_top()[1]:.2f} ; "
                  f"« 120 » x ≤ {g120.get_right()[0]:.2f} y[{g120.get_bottom()[1]:.2f}, {g120.get_top()[1]:.2f}] ; "
                  f"« € » x ≥ {e_.get_left()[0]:.2f} y[{e_.get_bottom()[1]:.2f}, {e_.get_top()[1]:.2f}] ; "
                  f"ligne f(x) bas ≈ 1,72", flush=True)
        b1 = self.lf("Inscription :", Y[0], 36)
        self.dit(b1, "d'inscription :")
        b2 = self.lf("30 €", Y[1], 40, b=("30",))
        self.poser_gestes(b2, "30 euros.", {0: lambda: [GrowFromCenter(pt), FadeIn(lab, scale=1.3)]})
        b3 = self.lf("Après x mois :", Y[2], 36)
        self.dit(b3, "Après x mois :")
        self.play(FadeOut(VGroup(h, mois)), run_time=0.2)
        e = self.lf("f(x) = 20x + 30", 1.95, 40, a=("20",), b=("30",))
        if os.environ.get("AUDIT") == "1":
            print(f"MISE-EN-PAGE ligne f(x) bas {e.get_bottom()[1]:.2f} x[{e.get_left()[0]:.2f}, {e.get_right()[0]:.2f}] ; "
                  f"« € » haut {r.noms[-1].get_top()[1]:.2f}", flush=True)
        self.dire_eq(e, "f de x égale 20 x plus 30.", echelle=1.1)
        self.play(FadeOut(VGroup(b1, b2, b3)), run_time=0.2)
        c1 = self.lf("Au départ,", Y[0], 36)
        self.dit(c1, "Au départ,")
        c2 = self.lf("x = 0 :", Y[1], 40)
        self.dit(c2, "x vaut 0 :")
        c3 = self.lf("f(0) = 30", Y[2] - 0.05, 40, b=("30",))
        self.poser_gestes(c3, "f de 0 égale 30.", {5: lambda: [Indicate(VGroup(pt, lab), color=ORD_B, scale_factor=1.4)]},
                          echelle=1.1)
        self.play(FadeOut(VGroup(c1, c2, c3)), run_time=0.2)
        d1 = self.lf("L'axe vertical", Y[0], 36)
        self.poser_gestes(d1, "l'axe vertical", {2: lambda: [Indicate(r.ay, color=JAUNE_TITRE, scale_factor=1.04)]})
        d2 = self.lf("à 30 :", Y[1], 36, b=("30",))
        self.poser_gestes(d2, "à 30 :", {1: lambda: [Flash(pt, color=ORD_B, line_length=0.2)]})
        d3 = self.lf("l'ordonnée", Y[2], 36, ORD_B)
        self.dit(d3, "l'ordonnée")
        d4 = self.lf("à l'origine !", Y[3], 36, ORD_B)
        self.dit(d4, "à l'origine.")
        # 3e relecture -ql 22/11 : le cadre vert coupait « à 30 : » et collait au « ! » : on fait briller à la place
        self.play(Indicate(VGroup(d3, d4), color=ORD_B, scale_factor=1.08), run_time=0.5)
        self.attendre_voix(marge=1.0)
        self.vider(garder)

        # ── 01q : la question-pause (3 s) ──
        def avant(sc):
            sc.eq_q("f(x) = 20x + 30", "f de x égale 20 x plus 30.", a=("20",), b=("30",))
            sc.eq_q("Combien vaut", "Combien vaut", couleur=JAUNE_TITRE)
            sc.eq_q("f(0) ?", "f de 0 ?", couleur=JAUNE_TITRE)

        def apres(sc):
            sc.place_reponse()
            sc.ph_eq(0, "Réponse C :", "Réponse C :", premier=True)
            sc.ph_eq(1, "20 × 0 = 0", "20 fois 0, c'est 0.")
            sc.ph_eq(2, "Il reste 30 :", "Il reste 30 :")
            sc.ph_eq(3, "l'ordonnée", "l'ordonnée")
            sc.ph_eq(4, "à l'origine.", "à l'origine.")
            sc.rep_fini()

        self.question_pause("01q-question", "01r-reponse", ["f(x) = 20x + 30", "Combien vaut", "f(0) ?"],
                            [Eq("20", 34), Eq("50", 34), Eq("30", 34)], 2,
                            ["Réponse C :", "20 × 0 = 0", "Il reste 30 :", "l'ordonnée", "à l'origine."],
                            avant_q=avant, autres_r=apres)

        # ── 02 : la question en commentaire, SANS Ti-Margo (17/11), puis la fin commune ──
        self.dire("02-question")
        self.play(FadeOut(Group(*self.mobjects)), run_time=0.25)
        self.remove(*self.mobjects)
        tit = T("À toi !", 52, JAUNE_TITRE).move_to(P(0, 3.2))
        self.au("À toi", FadeIn(tit, shift=DOWN * 0.1), rt=0.35)
        lignes = [("Une droite", "Une droite", WHITE, (), ()), ("coupe l'axe", "coupe l'axe", WHITE, (), ()),
                  ("vertical à −2,", "vertical à moins 2,", WHITE, (), ("−2",)),
                  ("et monte de 3", "et monte de 3", WHITE, ("3",), ()), ("à chaque pas.", "à chaque pas.", WHITE, (), ()),
                  ("Quelle est", "Quelle est", JAUNE_TITRE, (), ()), ("sa fonction ?", "sa fonction ?", JAUNE_TITRE, (), ())]
        for k, (s, ph, c, a, b) in enumerate(lignes):
            self.dit(self.lf(s, 2.4 - 0.52 * k, 38, c, a=a, b=b), ph)
        appel_commentaire(self, y=-1.75)
        self.attendre_voix(marge=0.6)
        ecran_fin(self, "short", voix="03-abonne")
