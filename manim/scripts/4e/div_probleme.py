# div_probleme.py
# EleveAI — Maths 4e — série « Divisibilité et nombres premiers », épisode 06 : PROBLÈMES DE DIVISIBILITÉ.
# Paysage 16:9, AVEC VOIX, ceinture VERTE. Micro : div_probleme.
# Décor et métier : Adam, animateur de planétarium. Centre : espace.
# Écrans : garde (00) ; les kits d'Adam (01) ; les deux listes (02) ; le plus grand commun (03) ;
# QUESTION 1 (03q) ; les comètes (04) ; les multiples sur la frise (05) ; le piège (06) ;
# QUESTION 2 (06q) ; défi (07) et correction (07b) ; ce que tu as appris (08) ; fin (09).
# Voix : manim/voix/4e-div-probleme.json ; marques : div_probleme_marques.json.
#
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/div_probleme.py DivProbleme4e
# Rendu : python -m manim render -qh --disable_caching manim/scripts/4e/div_probleme.py DivProbleme4e -o eleveai-maths-4e-div-probleme --media_dir manim/scripts/4e/media-div-06
# Sortie : manim/sorties/4e/maths/divisibilite/06-probleme/eleveai-maths-4e-div-probleme.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI))

from div_commun import *  # noqa: E402,F403

NUIT = "#0f1b3d"
CARTE_CIEL = "#3b82f6"
CAISSE = "#b7791f"
COMETE_A = ORANGE_RETENUE   # la comète des 6 ans, les multiples de 6
COMETE_B = "#7dd3fc"        # la comète des 8 ans, les multiples de 8


# ── Les objets de l'épisode (propres à ce script) ───────────────────────────
def adam_planetarium(s=0.72):
    """Adam : la veste bleu nuit et l'étoile du planétarium sur la poitrine."""
    p = personne(peau="#c68642", tenue="#1e3a8a", cheveux="#111827", s=s)
    etoile = Star(n=5, outer_radius=0.17 * s, inner_radius=0.07 * s, fill_color=JAUNE_TITRE, fill_opacity=1,
                  stroke_width=0).move_to(p.corps.get_center() + UP * 0.25 * s + LEFT * 0.18 * s)
    return VGroup(p, etoile)


def carte_ciel(w=0.2):
    """Une carte du ciel : un rectangle bleu et trois étoiles blanches."""
    r = RoundedRectangle(width=w, height=w * 1.3, corner_radius=w * 0.12, fill_color=CARTE_CIEL, fill_opacity=1,
                         stroke_color=WHITE, stroke_width=1)
    pts = VGroup(*[Dot(r.get_center() + P(dx * w, dy * w), radius=w * 0.06, color=WHITE)
                   for dx, dy in ((-0.2, 0.3), (0.18, 0.1), (-0.05, -0.3))])
    return VGroup(r, pts)


def boussole(r=0.11):
    """Une boussole : le cadran et l'aiguille rouge."""
    c = Circle(radius=r, fill_color="#e5e7eb", fill_opacity=1, stroke_color="#92400e", stroke_width=2)
    a = Polygon(P(0, r * 0.8), P(r * 0.2, 0), P(-r * 0.2, 0), fill_color=ROUGE_ERREUR, fill_opacity=1, stroke_width=0)
    a.move_to(c.get_center() + UP * r * 0.4)
    return VGroup(c, a)


def etoile(r=0.11):
    return Star(n=5, outer_radius=r, inner_radius=r * 0.45, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_width=0)


def fusee(h=0.26):
    corps = RoundedRectangle(width=h * 0.36, height=h * 0.7, corner_radius=h * 0.12, fill_color="#e5e7eb",
                             fill_opacity=1, stroke_width=0)
    nez = Triangle(fill_color=ROUGE_ERREUR, fill_opacity=1, stroke_width=0).scale_to_fit_width(h * 0.36)
    nez.next_to(corps, UP, buff=0)
    flamme = Triangle(fill_color=ORANGE_RETENUE, fill_opacity=1, stroke_width=0).rotate(PI).scale_to_fit_width(h * 0.26)
    flamme.next_to(corps, DOWN, buff=0)
    return VGroup(flamme, corps, nez)


def grille(fabrique, lignes, colonnes, pas, centre):
    g = VGroup()
    for i in range(lignes):
        for j in range(colonnes):
            g.add(fabrique().move_to(P((j - (colonnes - 1) / 2) * pas, ((lignes - 1) / 2 - i) * pas)))
    return g.move_to(centre)


def kit(haut=4, bas=3, f_haut=None, f_bas=None, w=0.62):
    """Un kit : une boîte ouverte, `haut` objets sur la rangée du haut, `bas` sur celle du bas."""
    f_haut = f_haut or (lambda: carte_ciel(w * 0.15))
    f_bas = f_bas or (lambda: boussole(w * 0.085))
    boite = RoundedRectangle(width=w, height=w * 0.78, corner_radius=w * 0.08, fill_color=CAISSE, fill_opacity=1,
                             stroke_color="#78350f", stroke_width=2)
    r1 = VGroup(*[f_haut() for _ in range(haut)]).arrange(RIGHT, buff=w * 0.05)
    r2 = VGroup(*[f_bas() for _ in range(bas)]).arrange(RIGHT, buff=w * 0.07)
    for r in (r1, r2):
        if r.width > w * 0.88:
            r.scale_to_fit_width(w * 0.88)
    r1.move_to(boite.get_center() + UP * w * 0.17)
    r2.move_to(boite.get_center() + DOWN * w * 0.19)
    return VGroup(boite, r1, r2)


def comete(c, r=0.13, queue=0.7, angle=0.0):
    """Une comète : la tête ronde et sa queue qui s'efface."""
    tete = Circle(radius=r, fill_color=c, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
    q = Polygon(P(0, r * 0.9), P(0, -r * 0.9), P(-queue, 0), fill_color=c, fill_opacity=0.45, stroke_width=0)
    g = VGroup(q, tete)
    return g.rotate(angle, about_point=tete.get_center())


def ciel(rayon=2.4, centre=ORIGIN, graine=3):
    """Le dôme du planétarium : un disque de nuit semé d'étoiles."""
    d = Circle(radius=rayon, fill_color=NUIT, fill_opacity=1, stroke_color="#334155", stroke_width=4).move_to(centre)
    rng = np.random.default_rng(graine)
    pts = VGroup()
    while len(pts) < 40:
        a, rr = rng.uniform(0, TAU), rayon * np.sqrt(rng.uniform(0, 0.9))
        pts.add(Dot(d.get_center() + P(rr * np.cos(a), rr * np.sin(a)), radius=rng.uniform(0.012, 0.03),
                    color=WHITE).set_opacity(rng.uniform(0.4, 0.9)))
    return VGroup(d, pts)


def bus(c, w=1.7):
    caisse = RoundedRectangle(width=w, height=w * 0.48, corner_radius=w * 0.08, fill_color=c, fill_opacity=1,
                              stroke_width=0)
    vitres = VGroup(*[RoundedRectangle(width=w * 0.16, height=w * 0.16, corner_radius=w * 0.02, fill_color="#e0f2fe",
                                       fill_opacity=1, stroke_width=0) for _ in range(4)]).arrange(RIGHT, buff=w * 0.06)
    vitres.move_to(caisse.get_center() + UP * w * 0.07)
    roues = VGroup(*[Circle(radius=w * 0.075, fill_color="#111827", fill_opacity=1, stroke_color="#9ca3af",
                            stroke_width=2).move_to(caisse.get_bottom() + RIGHT * x * w) for x in (-0.3, 0.3)])
    return VGroup(caisse, vitres, roues)


class DivProbleme4e(PaysageDiv):
    nom_voix = "4e-div-probleme"
    fichier_marques = "div_probleme_marques.json"
    ceinture = "verte"

    def atome(self, e, s, n=1):
        """Le n-ième atome « s » d'une formule."""
        k = 0
        for a in e.atomes:
            if a.original_text == s:
                k += 1
                if k == n:
                    return a
        raise ValueError(f"{s} absent de {e.s}")

    def eq_dans_q(self, i, s, phrase, n=1, fs=None, lettres="xytn", couleur=WHITE):
        """Comme celle de equation_commun, mais la ligne ne dépasse jamais x = 6,3."""
        ref = self.q_q[i]
        e = Eq(s, fs or 34, couleur=couleur, lettres=lettres)
        e.scale_to_fit_height(ref.height).move_to(ref)
        if e.get_right()[0] > 6.3:
            c = e.get_center()[0]
            e.scale(2 * (6.3 - c) / e.width)
        self.q_q.remove(ref)
        self.dire_eq(e, phrase, n)
        self._lq.append(e)
        return e

    def souligne(self, a, c=VERT_OK):
        return Line(a.get_corner(DL) + P(-0.05, -0.1), a.get_corner(DR) + P(0.05, -0.1), color=c, stroke_width=5)

    def ph_dans_cadre(self, fig=()):
        """Pour la réponse : la question et la figure de gauche s'effacent, les cartes
        montent sous « Question ! » ; la réponse prendra toute la moitié gauche."""
        cartes = self.cartes_q
        dy = 2.45 - cartes.get_top()[1]
        fam = cartes.get_family()
        coche = [m for m in self.mobjects if m not in fam
                 and cartes.get_left()[0] < m.get_center()[0] < cartes.get_right()[0]
                 and cartes.get_bottom()[1] < m.get_center()[1] < cartes.get_top()[1]]
        bloc = VGroup(cartes, *coche)  # les cartes rétrécissent à droite : la réponse a la place
        cible = bloc.copy().scale(0.72)
        cible.shift(P(6.3 - cible.get_right()[0], 2.45 - cible[0].get_top()[1]))
        self.play(*[FadeOut(l) for l in self._lq], *[FadeOut(m) for m in fig], Transform(bloc, cible), run_time=0.15)
        self.bring_to_front(*coche)  # l'animation a remis les cartes devant la coche
        self._droite_rep = cartes.get_left()[0] - 0.4

    def reponse_libre(self, *lignes, fs=40, haut=2.75, bas=-3.25, gauche=-6.2, droite=None):
        """La phrase de réponse, posée au mot, en grand dans la moitié gauche
        (à la place de la figure), comme les autres textes de la vidéo."""
        droite = droite if droite is not None else self._droite_rep
        es = [E(t, fs, couleur=VERT_OK, lettres="") for t, _ in lignes]
        g = VGroup(*es).arrange(DOWN, aligned_edge=LEFT, buff=0.24)
        g.scale(min(1.0, (haut - bas) / g.height, (droite - gauche) / g.width))
        g.move_to(P((gauche + droite) / 2, (haut + bas) / 2)).align_to(P(gauche, 0), LEFT)
        pas = (g.height - es[0].height / 2 - es[-1].height / 2) / max(1, len(es) - 1)
        y0 = es[0].get_center()[1]
        for i, e in enumerate(es):  # un pas régulier, que la ligne ait des jambages ou non
            e.set_y(y0 - i * pas)
        for i, (e, (_, phrase)) in enumerate(zip(es, lignes)):
            sauf = []
            if i == 0:
                self.play(FadeIn(e.atomes[0]), run_time=0.08)
                sauf = [e.atomes[0]]
            self.dire_eq(e, phrase, echelle=1.0, rt=0.16, sauf=sauf)
        self.rep_fini()

    def rond(self, m, c=VERT_OK, r=None):
        return Circle(radius=r or max(m.width, m.height) * 0.5 + 0.13, color=c, stroke_width=4).move_to(m)

    # ── 00 : page de garde ──────────────────────────────────────────────────
    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre, ident, ech = self.garde("Problèmes de divisibilité", self.identite, self.ceinture, y_ech=-2.65)
        for m in (titre, ident):
            m.sans_synchro = True
        ident._pas_audit = True
        self.au("Problèmes", Write(titre), FadeIn(ident, shift=DOWN * 0.2), FadeIn(ech), rt=0.7)
        k = kit(w=1.5).move_to(P(-5.0, 0.3))
        c1 = comete(COMETE_A, 0.12, 0.6, 0.5).move_to(P(-3.2, 1.0))
        c2 = comete(COMETE_B, 0.12, 0.6, -0.3).move_to(P(-3.0, -0.3))
        l1 = self.lg("Faire des lots,", 2.0, 0.75, 46, maxw=8)
        self.dit(l1, "Faire des lots,", avec=[FadeIn(k, scale=0.6)])
        l2 = self.lg("ou se donner rendez-vous ?", 2.0, -0.1, 50, JAUNE_TITRE, maxw=8)
        self.dit(l2, "ou se donner rendez-vous ?", avec=[FadeIn(c1, shift=RIGHT * 0.3), FadeIn(c2, shift=RIGHT * 0.3)])
        self.insister(l2, 1.12, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 01 : les kits d'Adam ────────────────────────────────────────────────
    def ecran_situation(self):
        self.ecran("01-situation")
        p = adam_planetarium().move_to(P(-5.9, 2.25))
        cartes = grille(lambda: carte_ciel(0.2), 6, 8, 0.32, P(-3.3, 1.55))
        bouss = grille(lambda: boussole(0.12), 6, 6, 0.32, P(-3.3, -1.25))
        self.dit(self.lg("Adam anime un planétarium.", 3.2, 3.05, 40, CIEL, maxw=5.8), "Adam anime un planétarium.",
                 avec=[FadeIn(p, shift=UP * 0.3)])
        self.dit(self.lg("Pour un atelier, il a", 3.2, 2.4, 36), "Pour un atelier, il a")
        self.dit(self.lg("48 cartes du ciel", 3.2, 1.75, 38), "48 cartes du ciel",
                 avec=[LaggedStart(*[FadeIn(c, scale=0.4) for c in cartes], lag_ratio=0.02)])
        self.dit(self.lg("et 36 boussoles.", 3.2, 1.15, 38), "et 36 boussoles.",
                 avec=[LaggedStart(*[FadeIn(b, scale=0.4) for b in bouss], lag_ratio=0.02)])
        self.dit(self.lg("Il veut faire des kits identiques,", 3.2, 0.3, 34, maxw=5.8), "Il veut faire des kits identiques,")
        self.dit(self.lg("sans rien laisser.", 3.2, -0.3, 36, VERT_OK), "sans rien laisser.")
        q1 = self.lg("Combien de kits,", 3.2, -1.3, 44, JAUNE_TITRE)
        self.dit(q1, "Combien de kits,", avec=[FadeIn(kit(w=0.9).move_to(P(0.2, -1.6)), scale=0.5)])
        q2 = self.lg("au plus ?", 3.2, -2.0, 46, JAUNE_TITRE)
        self.dit(q2, "au plus ?")
        self.insister(VGroup(q1, q2), 1.1, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 02 : les deux listes de diviseurs ───────────────────────────────────
    def ecran_diviseurs(self):
        self.ecran("02-diviseurs")
        self.dit(self.lg("Des kits sans reste : on cherche un diviseur commun.", 0, 3.15, 38, JAUNE_TITRE, maxw=12.4),
                 "Des kits sans reste : on cherche un diviseur commun.")
        ic1 = grille(lambda: carte_ciel(0.2), 2, 3, 0.3, P(-5.6, 1.35))
        ic2 = grille(lambda: boussole(0.12), 2, 3, 0.3, P(-5.6, -1.25))
        self.dit(self.lg("Diviseurs de 48 :", -1.6, 1.95, 42, CIEL), "Diviseurs de 48 :", avec=[FadeIn(ic1)])
        e1 = F("1, 2, 3, 4, 6, 8, 12, 16, 24, 48", 50).move_to(P(0.5, 0.95))
        self.dire_eq(e1, "1, 2, 3, 4, 6, 8, 12, 16, 24, 48", echelle=1.4)
        self.dit(self.lg("Diviseurs de 36 :", -1.6, -0.65, 42, CIEL), "Diviseurs de 36 :", avec=[FadeIn(ic2)])
        e2 = F("1, 2, 3, 4, 6, 9, 12, 18, 36", 50).move_to(P(0.5, -1.65))
        self.dire_eq(e2, "1, 2, 3, 4, 6, 9, 12, 18, 36", echelle=1.4)
        self.attendre_voix(marge=0.8)

    # ── 03 : les diviseurs communs, le plus grand ───────────────────────────
    def ecran_plus_grand(self):
        self.ecran("03-plus-grand")
        A = [1, 2, 3, 4, 6, 8, 12, 16, 24, 48]
        B = [1, 2, 3, 4, 6, 9, 12, 18, 36]
        e1 = F(", ".join(map(str, A)), 44).sans_audit().move_to(P(0.6, 2.95))
        e2 = F(", ".join(map(str, B)), 44).sans_audit().move_to(P(0.6, 1.95))
        e2.align_to(e1, LEFT)
        n1 = T("48 :", 40, CIEL, audit=False).next_to(e1, LEFT, buff=0.4)
        n2 = T("36 :", 40, CIEL, audit=False).next_to(e2, LEFT, buff=0.4)
        self.play(FadeIn(VGroup(e1, e2, n1, n2)), run_time=0.3)
        communs = [1, 2, 3, 4, 6, 12]
        lc = F("Les diviseurs communs : 1, 2, 3, 4, 6, 12.", 42).move_to(P(0, 0.85))
        gestes = {}
        ronds = {}
        for n in communs:
            a1, a2 = self.atome(e1, str(n)), self.atome(e2, str(n))
            ronds[n] = (self.souligne(a1), self.souligne(a2))
            gestes[lc.atomes.index(self.atome(lc, str(n)))] = (
                lambda r=ronds[n], a1=a1, a2=a2: [Create(r[0]), Create(r[1]), a1.animate.set_color(VERT_OK), a2.animate.set_color(VERT_OK)])
        self.poser_avec(lc, "Les diviseurs communs : 1, 2, 3, 4, 6, 12.", gestes)
        pg = self.lg("Le plus grand : 12.", -0.2, -0.1, 50, JAUNE_TITRE, maxw=9)
        self.dit(pg, "Le plus grand : 12.",
                 avec=[ronds[12][0].animate.set_stroke(JAUNE_TITRE, 7), ronds[12][1].animate.set_stroke(JAUNE_TITRE, 7),
                       self.atome(e1, "12").animate.set_color(JAUNE_TITRE), self.atome(e2, "12").animate.set_color(JAUNE_TITRE)])
        self.insister(pg, 1.15, 0.2)
        kits = VGroup(*[kit(w=0.62) for _ in range(12)]).arrange(RIGHT, buff=0.14).move_to(P(-0.6, -2.8))
        self.dit(self.lg("Adam fait 12 kits,", 0, -1.05, 40, VERT_OK, maxw=8), "Adam fait 12 kits,",
                 avec=[LaggedStart(*[FadeIn(k, scale=0.5) for k in kits], lag_ratio=0.08)])
        self.dit(self.lg("avec 4 cartes et 3 boussoles chacun.", 0, -1.75, 38, maxw=10),
                 "avec 4 cartes et 3 boussoles chacun.")
        self.play(Circumscribe(kits[0], color=VERT_OK), run_time=0.6)
        self.attendre_voix(marge=0.8)

    # ── 03q : QUESTION 1 ────────────────────────────────────────────────────
    def ecran_question1(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        self._lq = []
        anneau = lambda: Circle(radius=0.12, color=ORANGE_RETENUE, stroke_width=5)  # noqa: E731
        badge = lambda: VGroup(Circle(radius=0.13, fill_color=CIEL, fill_opacity=1, stroke_width=0),  # noqa: E731
                               etoile(0.07).set_fill(WHITE))
        g1 = grille(anneau, 4, 5, 0.38, P(-3.5, 1.15))
        g2 = grille(badge, 5, 6, 0.38, P(-3.5, -1.75))
        c1 = Text("bracelets", font_size=28, color=ORANGE_RETENUE)
        c2 = Text("badges", font_size=28, color=CIEL)
        for c in (c1, c2):
            c.sans_synchro = True
        c1.next_to(g1, UP, buff=0.2)
        c2.next_to(g2, UP, buff=0.2)

        def avant(sc):
            sc.eq_dans_q(0, "20 bracelets et 30 badges,", "20 bracelets et 30 badges,", lettres="")
            sc.play(FadeIn(g1), FadeIn(g2), FadeIn(c1), FadeIn(c2), run_time=0.4)
            sc.eq_dans_q(0, "en lots identiques,", "en lots identiques,", lettres="")
            sc.eq_dans_q(0, "sans reste.", "sans reste.", lettres="")
            sc.eq_dans_q(0, "Combien de lots, au plus ?", "Combien de lots, au plus ?", lettres="")

        def apres(sc):
            sc.ph_dans_cadre([g1, g2, c1, c2])
            sc.reponse_libre(("Réponse B : 10.", "Réponse B : 10."),
                       ("10 divise 20 et 30,", "10 divise 20 et 30,"),
                       ("et aucun nombre plus grand", "et aucun nombre plus grand"),
                       ("ne divise les deux.", "ne divise les deux."),
                       ("60, c'est un multiple :", "60, c'est un multiple :"),
                       ("l'autre problème.", "l'autre problème."))

        self.question_pause("03q-question", "03r-reponse",
                            ["20 bracelets et 30 badges,", "en lots identiques,", "sans reste.", "Combien de lots, au plus ?"],
                            [E("5", 40, lettres=""), E("10", 40, lettres=""), E("60", 40, lettres="")], 1,
                            ["Réponse B : 10.", "10 divise 20 et 30,", "et aucun nombre plus grand", "ne divise les deux.",
                             "60, c'est un multiple :", "l'autre problème."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 04 : les deux comètes ───────────────────────────────────────────────
    def ecran_rdv(self):
        self.ecran("04-rdv")
        ctr = P(-3.6, -0.15)
        dome = ciel(2.55, ctr)
        soleil = VGroup(Circle(radius=0.2, fill_color=JAUNE_TITRE, fill_opacity=1, stroke_width=0),
                        Circle(radius=0.3, color=JAUNE_TITRE, stroke_width=2).set_opacity(0.5)).move_to(ctr + LEFT * 1.1)
        Q = ctr + LEFT * 1.55  # le point de rendez-vous, près du soleil
        o1 = Ellipse(width=2.3, height=1.3, color=COMETE_A, stroke_width=3).move_to(Q + RIGHT * 1.15)
        o2 = Ellipse(width=3.6, height=2.2, color=COMETE_B, stroke_width=3).move_to(Q + RIGHT * 1.8)
        o2.rotate(0.35, about_point=Q)
        ca = comete(COMETE_A, 0.13, 0.55, PI / 2).move_to(o1.point_from_proportion(0.5))
        cb = comete(COMETE_B, 0.13, 0.55, PI / 2).move_to(o2.point_from_proportion(0.5))
        self.dit(self.lg("L'autre problème.", 3.2, 3.1, 44, JAUNE_TITRE), "L'autre problème.",
                 avec=[FadeIn(dome), FadeIn(soleil)])
        self.dit(self.lg("Dans le ciel d'Adam,", 3.2, 2.45, 36), "Dans le ciel d'Adam,")
        self.dit(self.lg("deux comètes imaginaires", 3.2, 1.85, 36), "deux comètes imaginaires")
        self.dit(self.lg("reviennent :", 3.2, 1.25, 36), "reviennent :")
        self.dit(self.lg("l'une tous les 6 ans,", 3.2, 0.5, 40, COMETE_A), "l'une tous les 6 ans,",
                 avec=[Create(o1), FadeIn(ca, scale=0.5)])
        self.dit(self.lg("l'autre tous les 8 ans.", 3.2, -0.1, 40, COMETE_B), "l'autre tous les 8 ans.",
                 avec=[Create(o2), FadeIn(cb, scale=0.5)])
        rdv = Dot(Q, radius=0.07, color=WHITE)
        self.dit(self.lg("Elles viennent de passer ensemble.", 3.2, -0.85, 34, maxw=5.8), "Elles viennent de passer ensemble.",
                 avec=[ca.animate.move_to(Q), cb.animate.move_to(Q + UP * 0.02)])
        self.play(Flash(rdv, color=WHITE, line_length=0.25), FadeIn(rdv), run_time=0.4)
        q1 = self.lg("Quand repasseront-elles", 3.2, -1.75, 42, JAUNE_TITRE, maxw=5.8)
        self.dit(q1, "Quand repasseront-elles")
        q2 = self.lg("ensemble ?", 3.2, -2.45, 46, JAUNE_TITRE)
        self.dit(q2, "ensemble ?")
        self.insister(VGroup(q1, q2), 1.1, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 05 : les multiples sur la frise des années ──────────────────────────
    def ecran_multiples(self):
        self.ecran("05-multiples")
        self.dit(self.lg("Cette fois, on cherche un multiple commun.", 0, 3.15, 40, JAUNE_TITRE, maxw=12),
                 "Cette fois, on cherche un multiple commun.")
        y, x0, u = -0.2, -5.7, 0.47
        X = lambda v: x0 + v * u  # noqa: E731
        axe = Arrow(P(x0 - 0.2, y), P(X(25.2), y), buff=0, color="#cbd5e1", stroke_width=4,
                    max_tip_length_to_length_ratio=0.02)
        tics = VGroup(*[Line(P(X(v), y - (0.12 if v % 2 == 0 else 0.07)), P(X(v), y + (0.12 if v % 2 == 0 else 0.07)),
                             color="#cbd5e1", stroke_width=2) for v in range(25)])
        zero = T("0", 30, "#cbd5e1", audit=False).next_to(P(X(0), y), DOWN, buff=0.18)
        ans = T("ans", 26, "#94a3b8", audit=False).move_to(P(X(25.0), y - 0.45))
        self.play(GrowArrow(axe), FadeIn(tics), FadeIn(zero), FadeIn(ans), run_time=0.4)

        def sauts(pas, c, haut):
            g, lab = [], []
            for k in range(1, 24 // pas + 1):
                a, b = P(X((k - 1) * pas), y + 0.05 * haut), P(X(k * pas), y + 0.05 * haut)
                g.append(ArcBetweenPoints(a, b, angle=-1.6 * haut, color=c, stroke_width=4))
                lab.append(T(str(k * pas), 32, c, audit=False).move_to(P(X(k * pas), y + 0.95 * haut)))
            return g, lab

        sa, la = sauts(6, COMETE_A, 1)
        sb, lb = sauts(8, COMETE_B, -1)
        m6 = F("Multiples de 6 : 6, 12, 18, 24.", 40).move_to(P(-0.8, 2.3))
        m6.atomes[2].set_color(COMETE_A)
        ges = {}
        idx = [i for i, a in enumerate(m6.atomes) if a.original_text.isdigit()][1:]
        for i, s, l in zip(idx, sa, la):
            ges[i] = (lambda s=s, l=l: [Create(s), FadeIn(l, scale=1.3)])
        self.poser_avec(m6, "Multiples de 6 : 6, 12, 18, 24.", ges)
        m8 = F("Multiples de 8 : 8, 16, 24.", 40).move_to(P(-0.8, 1.6))
        m8.align_to(m6, LEFT)
        m8.atomes[2].set_color(COMETE_B)
        ges = {}
        idx = [i for i, a in enumerate(m8.atomes) if a.original_text.isdigit()][1:]
        for i, s, l in zip(idx, sb, lb):
            ges[i] = (lambda s=s, l=l: [Create(s), FadeIn(l, scale=1.3)])
        self.poser_avec(m8, "Multiples de 8 : 8, 16, 24.", ges)
        pc = self.lg("Le premier commun : 24.", -2.6, -2.15, 44, VERT_OK, maxw=6.2)
        self.dit(pc, "Le premier commun : 24.",
                 avec=[Create(self.rond(la[-1], VERT_OK, 0.36)), Create(self.rond(lb[-1], VERT_OK, 0.36))])
        d24 = self.lg("Dans 24 ans.", 3.3, -2.15, 50, JAUNE_TITRE, maxw=3.6)
        self.dit(d24, "Dans 24 ans.")
        self.insister(d24, 1.15, 0.2)
        self.attendre_voix(marge=0.8)

    # ── 06 : le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.ecran("06-piege")
        self.dit(self.lg("Le piège : confondre les deux.", 0, 3.15, 44, PIEGE, maxw=11.5), "Le piège : confondre les deux.")
        cg = RoundedRectangle(width=5.9, height=4.6, corner_radius=0.2, stroke_color=CIEL, stroke_width=4,
                              fill_color=FOND_CARTE, fill_opacity=1).move_to(P(-3.2, -0.25))
        cd = cg.copy().set_stroke(COMETE_A).move_to(P(3.05, -0.25))
        k = VGroup(*[kit(w=0.75) for _ in range(3)]).arrange(RIGHT, buff=0.15).move_to(P(-3.2, 1.25))
        rv = VGroup(comete(COMETE_A, 0.14, 0.6, -0.4), comete(COMETE_B, 0.14, 0.6, 0.4)).arrange(RIGHT, buff=0.05)
        rv.move_to(P(3.05, 1.25))
        self.dit(self.lg("Faire des lots sans reste :", -3.2, 0.3, 36, maxw=5.4), "Faire des lots sans reste :",
                 avec=[FadeIn(cg), FadeIn(k, scale=0.6)])
        self.dit(self.lg("un diviseur commun,", -3.2, -0.55, 40, CIEL, maxw=5.4), "un diviseur commun,")
        l1 = self.lg("le plus grand.", -3.2, -1.4, 46, JAUNE_TITRE, maxw=5.4)
        self.dit(l1, "le plus grand.")
        self.insister(l1, 1.15, 0.18)
        self.dit(self.lg("Se retrouver ensemble :", 3.05, 0.3, 36, maxw=5.4), "Se retrouver ensemble :",
                 avec=[FadeIn(cd), FadeIn(rv, scale=0.6)])
        self.dit(self.lg("un multiple commun,", 3.05, -0.55, 40, COMETE_A, maxw=5.4), "un multiple commun,")
        l2 = self.lg("le plus petit.", 3.05, -1.4, 46, JAUNE_TITRE, maxw=5.4)
        self.dit(l2, "le plus petit.")
        self.insister(l2, 1.15, 0.18)
        self.attendre_voix(marge=0.8)

    # ── 06q : QUESTION 2 ────────────────────────────────────────────────────
    def ecran_question2(self):
        self.clear()
        self.add_mascotte()
        self.XL = 0.6
        self._lq = []
        b1 = bus(COMETE_A).move_to(P(-3.9, 1.3))
        b2 = bus("#0284c7").move_to(P(-3.9, -0.9))
        arret = VGroup(Line(P(0, -0.9), P(0, 0.9), color="#cbd5e1", stroke_width=6),
                       Circle(radius=0.32, fill_color=VERT_OK, fill_opacity=1, stroke_color=WHITE, stroke_width=3).move_to(P(0, 1.1)))
        arret.move_to(P(-1.55, 0.25))
        def avant(sc):
            sc.play(FadeIn(arret), run_time=0.2)
            e = sc.eq_dans_q(0, "Deux bus : l'un toutes les 10 minutes,", "Deux bus passent à un arrêt, l'un toutes les 10 minutes,", lettres="")
            sc.atome(e, "10").set_color(COMETE_A)
            sc.play(FadeIn(b1, shift=RIGHT * 0.4), run_time=0.3)
            e = sc.eq_dans_q(0, "l'autre toutes les 15.", "l'autre toutes les 15.", lettres="")
            sc.atome(e, "15").set_color(CIEL)
            sc.play(FadeIn(b2, shift=RIGHT * 0.4), run_time=0.3)
            sc.eq_dans_q(0, "Dans combien de minutes, au plus tôt,", "Dans combien de minutes, au plus tôt,", lettres="")
            sc.eq_dans_q(0, "repasseront-ils ensemble ?", "repasseront-ils ensemble ?", lettres="")

        def apres(sc):
            sc.ph_dans_cadre([b1, b2, arret])
            sc.reponse_libre(("Réponse B : 30.", "Réponse B : 30."),
                       ("Multiples de 10 : 10, 20, 30.", "Multiples de 10 : 10, 20, 30."),
                       ("Multiples de 15 : 15, 30.", "Multiples de 15 : 15, 30."),
                       ("5, c'est un diviseur commun :", "5, c'est un diviseur commun :"),
                       ("l'autre problème.", "l'autre problème."),
                       ("150, c'est un multiple commun,", "150, c'est un multiple commun,"),
                       ("mais pas le plus petit.", "mais pas le plus petit."))

        self.question_pause("06q-question", "06r-reponse",
                            ["Deux bus : l'un toutes les 10 minutes,", "l'autre toutes les 15.",
                             "Dans combien de minutes, au plus tôt,", "repasseront-ils ensemble ?"],
                            [E("5", 40, lettres=""), E("30", 40, lettres=""), E("150", 40, lettres="")], 1,
                            ["Réponse B : 30.", "Multiples de 10 : 10, 20, 30.", "Multiples de 15 : 15, 30.",
                             "5, c'est un diviseur commun :", "l'autre problème.",
                             "150, c'est un multiple commun,", "mais pas le plus petit."],
                            avant_q=avant, autres_r=apres)
        self.XL = type(self).XL

    # ── 07 : le défi ────────────────────────────────────────────────────────
    def ecran_defi(self):
        self.ecran("07-defi")
        tit = T("À toi de jouer !", 56, JAUNE_TITRE).move_to(P(0, 2.95))
        self.au("À toi", Write(tit), rt=0.5)
        p = adam_planetarium().move_to(P(-5.75, 0.6))
        et = grille(lambda: etoile(0.11), 6, 10, 0.27, P(-2.75, 1.0))
        fu = grille(lambda: fusee(0.3), 5, 9, 0.33, P(-2.75, -1.2))
        self.dit(self.lg("Adam a 60 étoiles", 3.2, 1.95, 40), "Adam a 60 étoiles",
                 avec=[FadeIn(p), LaggedStart(*[FadeIn(s, scale=0.4) for s in et], lag_ratio=0.01)])
        self.dit(self.lg("autocollantes", 3.2, 1.4, 40), "autocollantes")
        self.dit(self.lg("et 45 fusées.", 3.2, 0.85, 40), "et 45 fusées.",
                 avec=[LaggedStart(*[FadeIn(f, scale=0.4) for f in fu], lag_ratio=0.01)])
        q1 = self.lg("Combien de kits identiques,", 3.2, -0.05, 40, JAUNE_TITRE, maxw=5.6)
        self.dit(q1, "Combien de kits identiques,")
        q2 = self.lg("au plus,", 3.2, -0.7, 42, JAUNE_TITRE)
        self.dit(q2, "au plus,")
        q3 = self.lg("sans rien laisser ?", 3.2, -1.35, 42, JAUNE_TITRE)
        self.dit(q3, "sans rien laisser ?")
        self.insister(VGroup(q1, q2, q3), 1.08, 0.2)
        pz = T("Mets pause, et cherche !", 50, ORANGE_RETENUE).move_to(P(-0.4, -2.55))
        self.au("Mets pause", Write(pz), rt=0.5)
        self.attendre_voix(marge=2.0)

    # ── 07b : la correction ─────────────────────────────────────────────────
    def ecran_correction(self):
        self.ecran("07b-correction")
        self.au("Correction", FadeIn(T("Correction", 46, JAUNE_TITRE).move_to(P(0, 3.2))), rt=0.25)
        self.dit(self.lg("On cherche le plus grand diviseur commun de 60 et 45.", 0, 2.4, 36, CIEL, maxw=12.4),
                 "On cherche le plus grand diviseur commun de 60 et 45.")
        self.dit(self.lg("15 divise les deux :", -3.0, 1.45, 42, maxw=6), "15 divise les deux :")
        e1 = F("60 = 15 × 4", 50).move_to(P(-3.0, 0.5))
        self.dire_eq(e1, "60 égale 15 fois 4", echelle=1.2)
        e2 = F("45 = 15 × 3", 50)
        e2.shift(e1.egal.get_center() - e2.egal.get_center() + DOWN * 0.85)
        self.dire_eq(e2, "45 égale 15 fois 3", echelle=1.2)
        kits = VGroup(*[kit(4, 3, lambda: etoile(0.05), lambda: fusee(0.13), w=0.62) for _ in range(15)])
        kits.arrange_in_grid(3, 5, buff=0.14).move_to(P(3.3, 0.55))
        self.dit(self.lg("Aucun nombre plus grand ne marche.", -0.6, -1.2, 36, PIEGE, maxw=10),
                 "Aucun nombre plus grand ne marche.")
        fin = self.lg("15 kits, avec 4 étoiles et 3 fusées chacun.", -0.6, -2.15, 40, VERT_OK, maxw=10.4)
        self.dit(fin, "15 kits, avec 4 étoiles et 3 fusées chacun.",
                 avec=[LaggedStart(*[FadeIn(k, scale=0.5) for k in kits], lag_ratio=0.06)])
        self.play(Create(self.cadre_ok(fin, 0.16)), run_time=0.2)
        self.attendre_voix(marge=1.0)

    # ── 08 : ce que tu as appris ────────────────────────────────────────────
    def ecran_finale(self):
        self.ecran("08-finale", 0.5)
        self.XL = -1.5
        k = kit(w=1.3)
        rv = VGroup(comete(COMETE_A, 0.16, 0.7, -0.4), comete(COMETE_B, 0.16, 0.7, 0.4)).arrange(RIGHT, buff=0.05)
        fig = VGroup(k, rv).arrange(DOWN, buff=0.7)
        lignes = self.finale_colonne([["Des lots sans reste :", "le plus grand diviseur commun."],
                                      ["Se retrouver ensemble :", "le plus petit multiple commun."],
                                      ["On lit bien la question", "avant de choisir."]], fs=40, figure=fig)
        self.XL = type(self).XL
        self.play(FadeIn(fig), run_time=0.25)
        for lg in lignes:
            self.montrer_ligne(lg)
        self.attendre_voix(marge=1.2)

    def construct(self):
        self.page_de_garde()
        self.ecran_situation()
        self.ecran_diviseurs()
        self.ecran_plus_grand()
        self.ecran_question1()
        self.ecran_rdv()
        self.ecran_multiples()
        self.ecran_piege()
        self.ecran_question2()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_finale()
        self.page_abonnement("09-abonne")
