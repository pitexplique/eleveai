# facto_verifier.py
# EleveAI — Maths 4e — série FACTORISATION, épisode 03 : VÉRIFIER une factorisation en développant.
# Paysage 16:9, AVEC VOIX, ceinture ORANGE. Micro : litteral_factoriser_verifier (tous les écrans).
# Métier : Tom, game designer. Centres : jeux vidéo, numérique.
# Écrans : garde (00) ; le niveau de Tom : 6 points par étoile + 30 de bonus, 6(x + 30) (01) ;
# on développe : 6x + 180, la factorisation est fausse (02) ; corriger : 30 = 6 × 5, 6(x + 5) (03) ;
# QUESTION 1 (03q, réponse A) ; l'erreur de signe 4x − 12 (04) ; la lettre en facteur x² + 9x (05) ;
# QUESTION 2 (05q, réponse B) ; défi 5x + 45 = 5(x + 45) ? (06) et correction (06b) ;
# ce que tu as appris (07) ; fin du 05/11 (08).
# Code couleur (celui de la série) : x bleu ; le FACTEUR COMMUN et ses flèches orange ; juste vert ;
# piège, faux rouge.
# Voix : manim/voix/4e-facto-verifier.json (validée le 11/11) ; marques : facto_verifier_marques.json.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/facto_verifier.py FactoVerifier4e --media_dir manim/scripts/4e/media-facto-03-audit
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/facto_verifier.py FactoVerifier4e -o eleveai-maths-4e-facto-verifier --media_dir manim/scripts/4e/media-facto-03
# Sortie : manim/sorties/4e/maths/factorisation/03-verifier/eleveai-maths-4e-facto-verifier.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))

from relatif_commun import *  # noqa: E402,F403
from equation_commun import PAROLE  # noqa: E402
from facto_maximum import FactoMaximum4e  # noqa: E402

PAROLE["²"] = "carré"

FACTEUR = OPERATION  # le facteur commun, et ses flèches
OR_ETOILE = "#facc15"
VIOLET = "#7c3aed"


def D(s, fs=56, couleur=WHITE, lettres="xy", audit=True):
    """Une expression : les lettres en bleu."""
    return E(s, fs, couleur, lettres=lettres, audit=audit)


def etoile(r=0.24):
    return Star(5, outer_radius=r, inner_radius=r * 0.45, fill_color=OR_ETOILE, fill_opacity=1,
                stroke_color="#fde68a", stroke_width=2)


def coffre(s=1.0):
    """Le coffre du bonus : la caisse, le couvercle jaune, la serrure."""
    caisse = RoundedRectangle(width=0.66, height=0.42, corner_radius=0.05, fill_color="#92400e", fill_opacity=1,
                              stroke_color="#fbbf24", stroke_width=2)
    couv = RoundedRectangle(width=0.72, height=0.18, corner_radius=0.05, fill_color="#f59e0b", fill_opacity=1,
                            stroke_width=0).next_to(caisse, UP, buff=0.0)
    serrure = Square(0.1, fill_color="#fde68a", fill_opacity=1, stroke_width=0).move_to(caisse.get_top() + DOWN * 0.08)
    return VGroup(caisse, couv, serrure).scale(s)


def ecran_jeu(n=4):
    """L'écran du jeu de Tom (rendu vide) : .etoiles et .coffre, posés par le script."""
    cadre = RoundedRectangle(width=4.4, height=2.3, corner_radius=0.14, fill_color="#0b1220", fill_opacity=1,
                             stroke_color=VIOLET, stroke_width=5)
    sol = Rectangle(width=4.12, height=0.16, fill_color="#16a34a", fill_opacity=1, stroke_width=0)
    sol.move_to(cadre.get_bottom() + UP * 0.28)
    pied = Polygon(P(-0.3, 0), P(0.3, 0), P(0.5, -0.32), P(-0.5, -0.32), fill_color="#334155", fill_opacity=1,
                   stroke_width=0).next_to(cadre, DOWN, buff=0)
    g = VGroup(pied, cadre, sol)
    g.etoiles = VGroup(*[etoile() for _ in range(n)]).arrange(RIGHT, buff=0.36)
    g.coffre = coffre()
    g.cadre = cadre
    return g


def placer_jeu(g, centre):
    """Pose l'écran ET ce qu'il affichera (les étoiles et le coffre ne sont pas dans le groupe)."""
    g.move_to(centre)
    c = g.cadre.get_center()
    g.etoiles.move_to(c + P(-0.6, 0.35))
    g.coffre.move_to(c + P(1.45, 0.2))
    return g


def loupe(r=0.42, c=CIEL):
    verre = Circle(radius=r, stroke_color=c, stroke_width=7, fill_color=c, fill_opacity=0.12)
    a = verre.point_at_angle(-PI / 4)
    manche = Line(a, a + P(0.5, -0.5) * r / 0.42, stroke_width=13, color="#a16207")
    return VGroup(manche, verre)


def tom(s=0.78):
    """Tom, game designer : sweat violet, casque audio, manette en main."""
    m = Metier(["Tom", "game designer"], fs=28, peau="#c68642", tenue=VIOLET, cheveux="#1f2937", s=s)
    m.nom.arrange(DOWN, buff=0.12)
    p = m.perso
    p.add(casque_audio(p))
    man = RoundedRectangle(width=0.5 * s, height=0.22 * s, corner_radius=0.1 * s, fill_color="#e2e8f0", fill_opacity=1,
                           stroke_width=0).move_to(p.get_center() + P(0, -0.3) * s)
    bt = VGroup(Dot(radius=0.03 * s, color="#ef4444").move_to(man.get_center() + RIGHT * 0.12 * s),
                Dot(radius=0.03 * s, color="#2563eb").move_to(man.get_center() + LEFT * 0.12 * s))
    p.add(man, bt)
    return m


class FactoVerifier4e(PaysageRel):
    nom_voix = "4e-facto-verifier"
    fichier_marques = "facto_verifier_marques.json"
    ceinture = "orange"

    def fleche_arc(self, a, b, couleur=None, angle=-1.2, sw=5):
        return CurvedArrow(a.get_top() + UP * 0.1, b.get_top() + UP * 0.12, angle=angle, color=couleur or FACTEUR,
                           stroke_width=sw, tip_length=0.16)

    def fleches(self, e, i_k, cibles, couleur=None, angles=(-1.6, -1.15)):
        """Du facteur (atome i_k) vers chaque terme de la parenthèse (atomes ou groupes d'atomes)."""
        return [self.fleche_arc(e.atomes[i_k], c if isinstance(c, Mobject) else e.atomes[c], couleur, angle=a)
                for c, a in zip(cibles, angles)]

    finale_gauche = FactoMaximum4e.finale_gauche

    def _disposer_q(self, question, choix, phrase):
        """Les cartes remontent sous la question : la phrase de réponse garde sa taille."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        cartes.next_to(q, DOWN, buff=0.3).align_to(P(self.XL, 0), LEFT)
        pause.next_to(cartes, DOWN, buff=0.3).align_to(P(self.XL, 0), LEFT)
        # 12/11 relecture : comme au 04, la phrase de réponse sous la figure, à gauche, à 36 pt (elle était
        # minuscule sous les cartes) ; la figure est remontée en haut à gauche
        ph = VGroup(*[T(x, 36, VERT_OK, audit=False) for x in phrase]).arrange(DOWN, aligned_edge=LEFT, buff=0.2)
        if ph.width > 6.7:
            ph.scale_to_fit_width(6.7)
        haut = getattr(self, "ph_haut", -0.6)
        ph.align_to(P(-6.45, 0), LEFT).align_to(P(0, haut), UP)
        if ph.get_bottom()[1] < -3.45:
            ph.scale((haut + 3.45) / ph.height, about_point=P(-6.45, haut))
        self.ph_q = ph
        return tete, q, cartes, pause, rebours, ph

    def rangee(self, morceaux, x, y, buff=0.32):
        """Des morceaux (phrase, expression…) sur une ligne, posés AVANT d'être animés."""
        return VGroup(*morceaux).arrange(RIGHT, buff=buff).move_to(P(x, y))

    def dit_avec(self, e, phrase, gestes, n=1, rt=0.12):
        """Comme dit (sans zoom), mais l'atome i joue en plus ses animations gestes[i]()."""
        debut = -1
        for _ in range(n):
            debut = self._texte_voix.find(phrase, debut + 1)
        if debut < 0:
            raise ValueError(f"« {phrase} » absent de la voix {self._cle_voix}")
        lots = self._plan_eq(e, debut, debut + len(phrase))
        for k, (pos, atomes) in enumerate(lots):
            self._attendre_pos(pos)
            d = rt
            if k + 1 < len(lots):
                gap = self._debut_voix + self._t_pos(lots[k + 1][0]) - self.renderer.time
                d = max(0.08, min(rt, gap - 0.01))
            ex = []
            for a in atomes:
                f = gestes.get(e.atomes.index(a))
                if f:
                    ex += f()
            self.play(*[FadeIn(a) for a in atomes], *ex, run_time=d)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Vérifier une factorisation", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Vérifier", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        e = D("6(x + 5)", 84, audit=False).move_to(P(-4.0, 0.3))
        e.atomes[0].set_color(FACTEUR)
        lp = loupe(0.62).move_to(e.get_left() + P(0.55, -0.05))
        self.play(FadeIn(e, shift=UP * 0.2), FadeIn(lp), run_time=0.3)
        self.play(lp.animate.move_to(e.get_right() + P(-0.55, -0.05)), run_time=0.9)
        l1 = self.lg("Comment être sûr", 3.0, 0.6, 42, maxw=6.4)
        self.dit(l1, "Comment être sûr")
        l2 = self.lg("de ne pas s'être trompé ?", 3.0, -0.2, 46, JAUNE_TITRE, maxw=6.2)
        self.dit(l2, "de ne pas s'être trompé ?")
        self.insister(l2, 1.08, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : le niveau de Tom ───────────────────────────────────────────────
    def ecran_designer(self):
        self.ecran("01-designer")
        m = tom()
        m.perso.move_to(P(-5.2, -0.2))
        m.nom.next_to(m.perso, UP, buff=0.14).set_x(-5.2)
        self.au("Tom", FadeIn(m.perso, shift=UP * 0.3), FadeIn(m.nom[0], shift=UP * 0.1), rt=0.35)
        self.au("game designer", FadeIn(m.nom[1], shift=UP * 0.1), rt=0.3)
        jeu = placer_jeu(ecran_jeu(), P(-2.25, -0.9))
        l1 = self.lg("Dans son jeu, un niveau rapporte", 0, 0, 36, maxw=7.4)
        l1.move_to(P(0.3, 2.95))
        self.dit(l1, "Dans son jeu, un niveau rapporte", avec=[FadeIn(jeu, shift=UP * 0.2)])
        six = VGroup(*[T("6", 28, OR_ETOILE).next_to(s, DOWN, buff=0.08) for s in jeu.etoiles])
        l2 = self.lg("6 points par étoile,", 0, 0, 36, maxw=4.6)
        l3 = self.lg("plus 30 points de bonus.", 0, 0, 36, maxw=5.4)
        self.rangee([l2, l3], 0.3, 2.3, buff=0.24)
        self.dit(l2, "6 points par étoile,",
                 avec=[LaggedStart(*[FadeIn(s, scale=0.5) for s in jeu.etoiles], lag_ratio=0.15), FadeIn(six)])
        trente = T("30", 28, WHITE).next_to(jeu.coffre, DOWN, buff=0.08)
        self.dit_avec(l3, "plus 30 points de bonus.", {1: lambda: [FadeIn(jeu.coffre, shift=DOWN * 0.2), FadeIn(trente)]})
        acc = Brace(VGroup(jeu.etoiles, six), DOWN, buff=0.06, color=INCONNUE)
        xe = D("x", 34, audit=False).next_to(acc, DOWN, buff=0.04)
        la = self.lg("Avec x étoiles :", 0, 0, 36, lettres="x", maxw=3.4)
        f1 = D("6x + 30", 56)
        self.rangee([la, f1], 2.3, 1.4)
        self.dit(la, "Avec x étoiles :", avec=[GrowFromCenter(acc), FadeIn(xe)])
        self.dire_eq(f1, "6 x plus 30.", echelle=1.2)
        lb = self.lg("Tom simplifie sa formule :", 3.4, 0.4, 36, maxw=5.8)
        self.dit(lb, "Tom simplifie sa formule :")
        lc = self.lg("il écrit", 0, 0, 36, maxw=2)
        f2 = D("6(x + 30)", 56)
        f2.atomes[0].set_color(FACTEUR)
        self.rangee([lc, f2], 2.8, -0.55)  # loin du bord droit
        self.dit(lc, "il écrit")
        self.dire_eq(f2, "6 fois, entre parenthèses, x plus 30.", echelle=1.2)
        lp = loupe(0.5).move_to(f2.get_left() + P(-0.1, -0.05))
        l4 = self.lg("Avant de publier son jeu, il vérifie.", -0.4, -2.7, 40, CIEL, maxw=9.6)
        self.dit(l4, "Avant de publier son jeu, il vérifie.", avec=[FadeIn(lp, scale=0.6)])
        self.play(lp.animate.move_to(f2.get_right() + P(-0.45, -0.05)), run_time=0.7)
        self.insister(VGroup(*l4.atomes[-2:]), 1.2, 0.18)
        self.attendre_voix(marge=0.8)

    # ── 02 : on développe ───────────────────────────────────────────────────
    def ecran_developper(self):
        self.ecran("02-developper")
        l1 = self.lg("Pour vérifier une factorisation,", 0, 0, 40, maxw=7.4)
        l2 = self.lg("on développe.", 0, 0, 48, JAUNE_TITRE, maxw=4.2)
        self.rangee([l1, l2], 0, 3.0)
        e = D("6(x + 30)", 76, audit=False).move_to(P(-3.6, 1.2))
        e.atomes[0].set_color(FACTEUR)
        self.dit(l1, "Pour vérifier une factorisation,", avec=[FadeIn(e, shift=UP * 0.2)])
        self.dit(l2, "on développe.")
        self.insister(l2, 1.1, 0.18)
        f1, f2 = self.fleches(e, 0, (2, 4))
        a = D("6 × x = 6x", 52).mis_sur_egal(3.0, 1.55)
        a.atomes[0].set_color(FACTEUR)
        self.dire_eq(a, "6 fois x : 6 x.", avec=[Create(f1)])
        b = D("6 × 30 = 180", 52).mis_sur_egal(3.0, 0.65)
        b.atomes[0].set_color(FACTEUR)
        self.dire_eq(b, "6 fois 30 : 180.", avec=[Create(f2)])
        c1 = self.lg("On trouve", 0, 0, 40, maxw=3)
        c2 = D("6x + 180,", 60)
        self.rangee([c1, c2], -0.6, -0.55)
        self.dit(c1, "On trouve")
        self.dire_eq(c2, "6 x plus 180,", echelle=1.2)
        d1 = self.lg("et pas", 0, 0, 40, maxw=2.4)
        d2 = D("6x + 30 !", 60)
        self.rangee([d1, d2], -0.6, -1.5)
        self.dit(d1, "et pas")
        self.dire_eq(d2, "6 x plus 30 !", echelle=1.2)
        self.play(c2.atomes[3].animate.set_color(PIEGE), b.atomes[-1].animate.set_color(PIEGE),
                  d2.atomes[3].animate.set_color(VERT_OK), run_time=0.25)
        self.play(Circumscribe(c2.atomes[3], color=PIEGE, buff=0.08), Circumscribe(d2.atomes[3], color=VERT_OK, buff=0.08),
                  run_time=0.5)
        r = self.lg("La factorisation de Tom est fausse.", -0.4, -2.55, 46, PIEGE, maxw=9.8)
        ba = self.barrer(e, sw=8)
        self.dit(r, "La factorisation de Tom est fausse.", avec=[Create(ba)])
        self.insister(r, 1.06, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 03 : corriger ───────────────────────────────────────────────────────
    def ecran_corriger(self):
        self.ecran("03-corriger")
        e0 = D("6(x + 30)", 60, audit=False)
        e0.atomes[0].set_color(FACTEUR)
        a = D("30 = 6 × 5", 54)
        l2 = self.lg("il fallait écrire 5.", 0, 0, 40, maxw=4.6)
        self.rangee([e0, a], -0.6, 2.05, buff=1.1)
        l2.move_to(P(a.get_x(), 1.25))
        self.play(FadeIn(e0), run_time=0.25)
        l1 = self.lg("Le 30 est resté dans la parenthèse.", 0, 3.05, 42, maxw=11)
        self.dit(l1, "Le 30 est resté dans la parenthèse.", avec=[e0.atomes[4].animate.set_color(PIEGE)])
        self.play(Circumscribe(VGroup(e0.atomes[1], e0.atomes[5]), color=PIEGE, buff=0.1), run_time=0.5)
        a.atomes[2].set_color(FACTEUR)
        a.atomes[4].set_color(VERT_OK)
        self.dire_eq(a, "Or 30, c'est 6 fois 5")
        self.dit(l2, "il fallait écrire 5.", avec=[Circumscribe(a.atomes[4], color=VERT_OK, buff=0.08)])
        b1 = self.lg("La bonne formule :", 0, 0, 40, CIEL, maxw=4.6)
        b = D("6(x + 5).", 62)
        b.atomes[0].set_color(FACTEUR)
        b.atomes[4].set_color(VERT_OK)
        self.rangee([b1, b], -1.1, -0.1, buff=0.4)
        self.dit(b1, "La bonne formule :")
        self.dire_eq(b, "6 fois, entre parenthèses, x plus 5.", echelle=1.2)
        f1, f2 = self.fleches(b, 0, (2, 4))
        v1 = self.lg("On vérifie :", 0, 0, 40, maxw=3.2)
        v = D("6x + 30.", 60)
        self.rangee([v1, v], -1.1, -1.25, buff=0.4)
        self.dit(v1, "On vérifie :", avec=[Create(f1), Create(f2)])
        self.dire_eq(v, "6 x plus 30.", echelle=1.2)
        r1 = self.lg("On retrouve l'expression de départ :", 0, 0, 40, maxw=7.8)
        r2 = self.lg("c'est juste.", 0, 0, 48, VERT_OK, maxw=3.2)
        self.rangee([r1, r2], -0.75, -2.4, buff=0.35)  # loin de Ti-Margo
        self.dit(r1, "On retrouve l'expression de départ :", avec=[Circumscribe(v, color=VERT_OK, buff=0.1)])
        self.dit(r2, "c'est juste.")
        cr = self.cadre_ok(VGroup(b, f1, f2), 0.14)
        self.play(Create(cr), run_time=0.25)
        self.insister(r2, 1.15, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 03q : QUESTION 1 (réponse A) ────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        e = D("8(x + 5)", 80, audit=False).move_to(P(-3.6, 2.1))
        e.atomes[0].set_color(FACTEUR)
        r = D("= 8x + 40", 64, VERT_OK, audit=False).next_to(e, DOWN, buff=0.5)
        self.ph_haut = r.get_bottom()[1] - 0.45
        r.align_to(e, LEFT).shift(LEFT * 0.4)

        def avant(sc):
            sc.eq_dans_q(0, "8x + 40 = 8(x + 5).", "8 x plus 40 égale 8 fois, entre parenthèses, x plus 5.", lettres="x", fs=36)
            sc.play(FadeIn(e, shift=UP * 0.2), run_time=0.3)
            sc.eq_dans_q(0, "Est-ce juste ?", "Est-ce juste ?", lettres="", fs=36)

        def apres(sc):
            sc.ph_eq(0, "Réponse A : oui.", "Réponse A : oui.", premier=True)
            f = VGroup(*sc.fleches(e, 0, (2, 4)))
            sc.ph_eq(1, "8 × x = 8x,", "8 fois x : 8 x,", lettres="x", avec=[Create(f)])
            sc.ph_eq(2, "et 8 × 5 = 40.", "et 8 fois 5 : 40.")
            sc.ph_eq(3, "On retrouve 8x + 40.", "On retrouve 8 x plus 40.", lettres="x", avec=[FadeIn(r, shift=DOWN * 0.2)])
            sc.play(Circumscribe(r, color=VERT_OK, buff=0.12), run_time=0.5)
            sc.rep_fini()

        self.question_pause("03q-question", "03r-reponse", ["8x + 40 = 8(x + 5).", "Est-ce juste ?"],
                            [E("oui", 34, lettres=""), E("non, c'est 8(x + 40)", 34, lettres="x"),
                             E("non, c'est 8x(1 + 5)", 34, lettres="x")], 0,
                            ["Réponse A : oui.", "8 × x = 8x,", "et 8 × 5 = 40.", "On retrouve 8x + 40."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 04 : l'erreur de signe ──────────────────────────────────────────────
    def ecran_signe(self):
        self.ecran("04-signe")
        tit = T("Autre erreur :", 46, PIEGE, gras=True)
        l0 = self.lg("le signe.", 0, 0, 46, JAUNE_TITRE, maxw=3.6)
        self.rangee([tit, l0], -2.6, 3.0, buff=0.35)
        self.au("Autre erreur", FadeIn(tit, scale=1.3), rt=0.25)
        self.dit(l0, "le signe.")
        g = D("4x − 12 = 4(x + 3) ?", 66).move_to(P(-0.4, 1.75))
        g.atomes[5].set_color(FACTEUR)
        self.dire_eq(g, "4 x moins 12 égale 4 fois, entre parenthèses, x plus 3 ?", echelle=1.15)
        f1, f2 = self.fleches(g, 5, (7, 9))
        d1 = self.lg("Développons :", 0, 0, 40, CIEL, maxw=3.4)
        d = D("4x + 12.", 62)
        self.rangee([d1, d], -0.8, 0.35, buff=0.4)
        self.dit(d1, "Développons :", avec=[Create(f1), Create(f2)])
        self.dire_eq(d, "4 x plus 12.", echelle=1.2)
        s = self.lg("Le signe a changé !", -0.8, -0.85, 46, PIEGE, maxw=7)
        self.dit(s, "Le signe a changé !", avec=[g.atomes[2].animate.set_color(VERT_OK), d.atomes[2].animate.set_color(PIEGE),
                                                  g.atomes[8].animate.set_color(PIEGE)])
        self.play(Circumscribe(g.atomes[2], color=VERT_OK, buff=0.1), Circumscribe(d.atomes[2], color=PIEGE, buff=0.1),
                  Circumscribe(g.atomes[8], color=PIEGE, buff=0.1), run_time=0.5)
        b1 = self.lg("La bonne factorisation :", 0, 0, 40, CIEL, maxw=5.2)
        b = D("4(x − 3).", 62)
        b.atomes[0].set_color(FACTEUR)
        b.atomes[3].set_color(VERT_OK)
        self.rangee([b1, b], -0.8, -2.15, buff=0.4)
        self.dit(b1, "La bonne factorisation :")
        self.dire_eq(b, "4 fois, entre parenthèses, x moins 3.", echelle=1.2)
        self.play(Create(self.cadre_ok(b, 0.2)), run_time=0.2)
        self.insister(b.atomes[3], 1.5, 0.18)
        self.attendre_voix(marge=0.8)

    # ── 05 : la lettre en facteur ───────────────────────────────────────────
    def ecran_lettre(self):
        self.ecran("05-lettre")
        tit = self.lg("Avec une lettre en facteur.", 0, 3.1, 44, JAUNE_TITRE, maxw=11)
        self.dit(tit, "Avec une lettre en facteur.")
        g = D("x² + 9x = x(x + 9x) ?", 64).move_to(P(-0.4, 1.75))
        g.atomes[6].set_color(FACTEUR)
        self.dire_eq(g, "x au carré plus 9 x égale x fois, entre parenthèses, x plus 9 x ?", echelle=1.15)
        f1, f2 = self.fleches(g, 6, (8, VGroup(g.atomes[10], g.atomes[11])))
        d1 = self.lg("Développons :", 0, 0, 40, CIEL, maxw=3.4)
        a = D("x × x = x²", 48)
        b = D("x × 9x = 9x²", 48)
        for m in (a, b):
            m.atomes[0].set_color(FACTEUR)
        self.rangee([d1, a, b], 0, 0.55, buff=0.8)
        self.dit(d1, "Développons :")
        self.dire_eq(a, "x fois x, x au carré.", avec=[Create(f1)])
        self.dire_eq(b, "x fois 9 x, 9 x au carré.", avec=[Create(f2)])
        t1 = self.lg("On trouve", 0, 0, 40, maxw=3)
        t = D("x² + 9x² :", 58)
        t2 = self.lg("c'est faux.", 0, 0, 46, PIEGE, maxw=3.4)
        self.rangee([t1, t, t2], -0.6, -0.6, buff=0.35)
        self.dit(t1, "On trouve")
        self.dire_eq(t, "x au carré plus 9 x au carré :", echelle=1.2)
        self.dit(t2, "c'est faux.", avec=[VGroup(*t.atomes[3:6]).animate.set_color(PIEGE)])
        s1 = self.lg("Le x est déjà sorti :", 0, 0, 40, lettres="", maxw=5)
        s1.atomes[1].set_color(FACTEUR)
        s2 = self.lg("il ne reste que 9.", 0, 0, 40, maxw=4.4)
        self.rangee([s1, s2], -0.6, -1.65, buff=0.35)
        self.dit(s1, "Le x est déjà sorti :", avec=[Circumscribe(g.atomes[6], color=FACTEUR, buff=0.1)])
        bx = self.barrer(g.atomes[11], sw=7)
        self.dit(s2, "il ne reste que 9.", avec=[Create(bx), g.atomes[11].animate.set_color(PIEGE)])
        b1 = self.lg("La bonne factorisation :", 0, 0, 40, CIEL, maxw=5.2)
        r = D("x(x + 9).", 62)
        r.atomes[0].set_color(FACTEUR)
        r.atomes[4].set_color(VERT_OK)
        self.rangee([b1, r], -0.8, -2.7, buff=0.4)
        self.dit(b1, "La bonne factorisation :")
        self.dire_eq(r, "x fois, entre parenthèses, x plus 9.", echelle=1.2)
        self.play(Create(self.cadre_ok(r, 0.2)), run_time=0.2)
        self.insister(r.atomes[4], 1.5, 0.18)
        self.attendre_voix(marge=0.8)

    # ── 05q : QUESTION 2 (réponse B) ────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        e = D("9(x + 3)", 72, audit=False).move_to(P(-3.6, 2.15))
        e.atomes[0].set_color(FACTEUR)
        r1 = D("= 9x + 27", 58, audit=False)
        r1.atomes[3].set_color(PIEGE)
        r1.next_to(e, DOWN, buff=0.4).align_to(e, LEFT).shift(LEFT * 0.35)
        r2 = D("9(x − 3)", 64, VERT_OK, audit=False)
        r2.next_to(r1, DOWN, buff=0.45).set_x(e.get_center()[0])
        self.ph_haut = r2.get_bottom()[1] - 0.5
        r2.atomes[0].set_color(FACTEUR)
        r2.atomes[2].set_color(INCONNUE)

        def avant(sc):
            sc.eq_dans_q(0, "Léo factorise 9x − 27 en 9(x + 3).", "Léo factorise 9 x moins 27 en 9 fois, entre parenthèses, x plus 3.",
                         lettres="x", fs=36)
            sc.play(FadeIn(e, shift=UP * 0.2), run_time=0.3)
            sc.eq_dans_q(0, "A-t-il raison ?", "A-t-il raison ?", lettres="", fs=36)

        def apres(sc):
            sc.ph_eq(0, "Réponse B : non.", "Réponse B : non.", premier=True)
            f = VGroup(*sc.fleches(e, 0, (2, 4)))
            sc.ph_eq(1, "9(x + 3) donne 9x + 27.", "9 fois, entre parenthèses, x plus 3, donne 9 x plus 27.", lettres="x",
                     avec=[Create(f), FadeIn(r1, shift=DOWN * 0.2)])
            sc.ph_eq(2, "Le moins a disparu :", "Le moins a disparu :", avec=[Circumscribe(r1.atomes[3], color=PIEGE, buff=0.08)])
            sc.ph_eq(3, "il fallait 9(x − 3).", "il fallait 9 fois, entre parenthèses, x moins 3.", lettres="x")
            sc.play(FadeIn(r2, shift=UP * 0.2), Create(sc.cadre_ok(r2, 0.2)), run_time=0.3)
            sc.rep_fini()

        self.question_pause("05q-question", "05r-reponse", ["Léo factorise 9x − 27 en 9(x + 3).", "A-t-il raison ?"],
                            [E("oui", 34, lettres=""), E("non", 34, lettres=""), E("on ne peut pas savoir", 34, lettres="")], 1,
                            ["Réponse B : non.", "9(x + 3) donne 9x + 27.", "Le moins a disparu :", "il fallait 9(x − 3)."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 06 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("06-defi")
        tit = T("À toi de jouer.", 56, JAUNE_TITRE).move_to(P(0, 2.9))
        self.au("À toi", Write(tit), rt=0.5)
        e = D("5x + 45 = 5(x + 45)", 76).move_to(P(-0.4, 1.35))
        e.atomes[5].set_color(FACTEUR)
        self.dire_eq(e, "5 x plus 45 égale 5 fois, entre parenthèses, x plus 45.", echelle=1.15)
        q = self.lg("Juste ou faux ?", -0.4, 0.0, 54, CIEL, maxw=7)
        ok = self.coche(VERT_OK, 0.3).next_to(q, LEFT, buff=0.5)
        croix = VGroup(Line(P(-0.25, -0.25), P(0.25, 0.25)), Line(P(-0.25, 0.25), P(0.25, -0.25))).set_stroke(PIEGE, 9)
        croix.next_to(q, RIGHT, buff=0.5)
        self.dit(q, "Juste ou faux ?", avec=[Create(ok)])
        self.play(Create(croix), run_time=0.25)
        pz = T("Mets pause, et cherche !", 50, ORANGE_RETENUE).move_to(P(-0.4, -1.5))
        self.au("Mets pause", Write(pz), rt=0.5)
        self.defi = dict(tit=tit, e=e, q=VGroup(q, ok, croix), pz=pz)
        self.attendre_voix(marge=2.0)

    # ── 06b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        d = self.defi
        self.dire("06b-correction")
        tit = T("Correction", 50, JAUNE_TITRE).move_to(P(0, 2.95))
        e = d["e"]
        self.au("Correction", ReplacementTransform(d["tit"], tit), FadeOut(d["pz"]), FadeOut(d["q"]),
                e.animate.scale(0.8).move_to(P(-0.4, 1.8)), rt=0.4)
        f1, f2 = self.fleches(e, 5, (7, 9))
        d1 = self.lg("Développons :", 0, 0, 40, CIEL, maxw=3.4)
        a = D("5 × x = 5x", 48)
        b = D("5 × 45 = 225", 48)
        for m in (a, b):
            m.atomes[0].set_color(FACTEUR)
        self.rangee([d1, a, b], 0, 0.6, buff=0.8)
        self.dit(d1, "Développons :")
        self.dire_eq(a, "5 fois x, 5 x.", avec=[Create(f1)])
        self.dire_eq(b, "5 fois 45, 225.", avec=[Create(f2)])
        t1 = self.lg("On trouve", 0, 0, 40, maxw=3)
        t = D("5x + 225 :", 58)
        t2 = self.lg("c'est faux.", 0, 0, 46, PIEGE, maxw=3.4)
        self.rangee([t1, t, t2], -0.6, -0.5, buff=0.35)
        self.dit(t1, "On trouve")
        self.dire_eq(t, "5 x plus 225 :", echelle=1.2)
        ba = self.barrer(VGroup(*e.atomes[5:]), sw=7)
        self.dit(t2, "c'est faux.", avec=[t.atomes[3].animate.set_color(PIEGE), b.atomes[-1].animate.set_color(PIEGE), Create(ba)])
        c = D("45 = 5 × 9.", 56).move_to(P(-0.6, -1.55))
        c.atomes[2].set_color(FACTEUR)
        c.atomes[4].set_color(VERT_OK)
        self.dire_eq(c, "45, c'est 5 fois 9.")
        b1 = self.lg("La bonne factorisation :", 0, 0, 40, CIEL, maxw=5.2)
        r = D("5(x + 9).", 62)
        r.atomes[0].set_color(FACTEUR)
        r.atomes[4].set_color(VERT_OK)
        self.rangee([b1, r], -0.8, -2.65, buff=0.4)
        self.dit(b1, "La bonne factorisation :")
        self.dire_eq(r, "5 fois, entre parenthèses, x plus 9.", echelle=1.2)
        self.play(Create(self.cadre_ok(r, 0.2)), run_time=0.2)
        self.insister(r, 1.1, 0.2)
        self.attendre_voix(marge=1.2)

    # ── 07 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("07-finale", 0.5)
        e = D("6(x + 5)", 72, audit=False)
        e.atomes[0].set_color(FACTEUR)
        f = VGroup(*self.fleches(e, 0, (2, 4)))
        r = D("= 6x + 30", 60, VERT_OK, audit=False).next_to(e, DOWN, buff=0.5)
        lp = loupe(0.6).next_to(r, DOWN, buff=0.55)
        fig = VGroup(f, e, r, lp)
        # 12/11 relecture : la colonne du module réduisait les points de moitié ; celle du 04, à 42 pt
        lignes = self.finale_gauche([["Pour vérifier", "une factorisation,", "on développe."],
                                     ["On doit retrouver", "exactement l'expression", "de départ."],
                                     ["Regarde bien les nombres", "de la parenthèse,", "et les signes."]], fig)
        for lg in lignes:
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_designer()
        self.ecran_developper()
        self.ecran_corriger()
        self.ecran_question1()
        self.ecran_signe()
        self.ecran_lettre()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("08-abonne")
