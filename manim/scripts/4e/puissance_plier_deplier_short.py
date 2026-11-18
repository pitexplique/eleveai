# puissance_plier_deplier_short.py
# EleveAI — Maths 4e — série PUISSANCES, épisode 14, SHORT DÉFI ceinture ORANGE
# « Plier, déplier » (idée de Frédéric, 18/11/2026, méthode de Singapour :
# le geste, puis l'image, puis l'écriture).
#   · DÉFI : je plie 3 fois, je déplie : combien de parts ? une part = ? ;
#   · EN HAUT la feuille se plie (un rabat glisse sur le pli) : 2, 4, 8 parts ;
#     EN BAS, au même instant : « 1 pliage → 2 parts »… « 2 × 2 × 2 = 2³ » ;
#   · on déplie : 8 → 4 → 2 (÷ 2), puis plus de pli : 2⁰ = 1 ;
#   · question-pause (3 s) : 2⁻¹ → −2 / 0 / la moitié (C) ;
#   · 2⁻³ = une part après 3 pliages = 1/8 (la part en ORANGE) ;
#   · question en commentaire : 2⁻⁵ (réponse 1/32), puis la fin standard.
# Sens imagé retenu : 2⁻ⁿ = la TAILLE d'une part après n pliages (déplier
# seul ne donne pas de parts « négatives »).
# Micro du coach : 4e puissance_exposant_negatif. Centres : jeux-defis, art-design.
#
# Voix : manim/voix/4e-puissance-plier-deplier-short.json (validée 18/11), débit −6.
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/puissance_plier_deplier_short.py PuissancePlierDeplierShort
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/puissance_plier_deplier_short.py PuissancePlierDeplierShort -o eleveai-maths-4e-puissance-plier-deplier-short --media_dir manim/scripts/4e/media-puiss-14-short
# Sortie : manim/sorties/4e/maths/puissances/14-plier-deplier/eleveai-maths-4e-puissance-plier-deplier-short.mp4

import sys
from pathlib import Path

ICI = Path(__file__).resolve().parent
sys.path.insert(0, str(ICI.parent / "6e"))

from prop_commun import *  # noqa: E402,F403

sys.path.insert(0, str(ICI))  # le dossier du script EN TÊTE

EXPO_C = ORANGE_RETENUE
ROUGE_P = "#ef4444"
CIEL = "#93c5fd"
PAPIER = "#fdf6e3"
RABAT = "#d6c9a8"
PLI = "#2b6cb0"
PART = "#f6ad55"
FX, FY, FW, FH = -0.75, 1.0, 1.36, 1.92   # la feuille (centre, largeur, hauteur)
LX = 1.25                                # l'étiquette « 8 parts » à droite
Y_CARTE = -1.43


def tx(s, fs=34, couleur=WHITE, gras=False, audit=True):
    """Un texte posé AU MOT par le script (pas d'attente automatique)."""
    t = Text(s, font_size=fs, color=couleur, weight=BOLD if gras else NORMAL)
    t.sans_synchro = True
    if not audit:
        t._pas_audit = True
    if t.width > 3.9:
        t.scale_to_fit_width(3.9)
    return t


def puissance(base, exp, fs=64, audit=True, cb=BLEU_CALCUL):
    """La base en BLEU, l'exposant en ORANGE, petit et haut (pas de LaTeX)."""
    b = tx(str(base), fs, cb, True, audit)
    e = tx(str(exp), int(fs * 0.55), EXPO_C, True, audit)
    e.next_to(b, RIGHT, buff=0.04).align_to(b, UP).shift(UP * 0.16 * fs / 64)
    g = VGroup(b, e)
    g.base, g.exp = b, e
    return g


def grille(n):
    """(colonnes, rangées) après n pliages : on plie en long, puis en large…"""
    return 2 ** ((n + 1) // 2), 2 ** (n // 2)


def plis_du_niveau(k):
    """Les plis NOUVEAUX du k-ième pliage (k ≥ 1) : des segments sur la feuille."""
    x0, y0 = FX - FW / 2, FY - FH / 2
    traits = VGroup()
    if k % 2:  # pli vertical
        c = 2 ** ((k + 1) // 2)
        for i in range(1, c, 2):
            x = x0 + i * FW / c
            traits.add(DashedLine(P(x, y0), P(x, y0 + FH), color=PLI, stroke_width=4, dash_length=0.08))
    else:
        r = 2 ** (k // 2)
        for j in range(1, r, 2):
            y = y0 + j * FH / r
            traits.add(DashedLine(P(x0, y), P(x0 + FW, y), color=PLI, stroke_width=4, dash_length=0.08))
    return traits


def rabats(k):
    """Les rabats du k-ième pliage : le morceau qui se replie sur chaque pli."""
    x0, y0 = FX - FW / 2, FY - FH / 2
    g = VGroup()
    if k % 2:
        c = 2 ** ((k + 1) // 2)
        for i in range(1, c, 2):
            r = Rectangle(width=FW / c, height=FH, fill_color=RABAT, fill_opacity=0.85, stroke_width=0)
            r.move_to(P(x0 + (i + 0.5) * FW / c, FY))
            r.pli = P(x0 + i * FW / c, FY)
            g.add(r)
    else:
        rr = 2 ** (k // 2)
        for j in range(1, rr, 2):
            r = Rectangle(width=FW, height=FH / rr, fill_color=RABAT, fill_opacity=0.85, stroke_width=0)
            r.move_to(P(FX, y0 + (j + 0.5) * FH / rr))
            r.pli = P(FX, y0 + j * FH / rr)
            g.add(r)
    g.vertical = bool(k % 2)
    return g


def une_part(n):
    """La part en haut à gauche après n pliages (ORANGE)."""
    c, r = grille(n)
    w, h = FW / c, FH / r
    return Rectangle(width=w, height=h, fill_color=PART, fill_opacity=1, stroke_color=PLI, stroke_width=3).move_to(
        P(FX - FW / 2 + w / 2, FY + FH / 2 - h / 2))


def caler(g, largeur=3.7):
    """Une ligne de la carte : jamais plus large que la carte (marges de 3 %)."""
    if g.width > largeur:
        g.scale_to_fit_width(largeur)
    return g


def feuille():
    return Rectangle(width=FW, height=FH, fill_color=PAPIER, fill_opacity=1, stroke_color="#cbd5e0",
                     stroke_width=4).move_to(P(FX, FY))


class PuissancePlierDeplierShort(ShortProp):
    nom_voix = "4e-puissance-plier-deplier-short"
    fichier_marques = "puissance_plier_deplier_short_marques.json"
    identite = "Maths 4e — EleveAI"
    ceinture = "orange"

    def au(self, extrait, *anims, n=1, rt=0.35):
        self.au_mot(extrait, n)
        if anims:
            self.play(*anims, run_time=rt)

    def _disposer_q(self, question, choix, phrase):
        """« Question ! » et le compte à rebours reculent vers la gauche (3 %)."""
        tete, q, cartes, pause, rebours, ph = super()._disposer_q(question, choix, phrase)
        d = rebours.get_right()[0] - 1.9
        if d > 0:
            tete.shift(LEFT * d)
            rebours.shift(LEFT * d)
        return tete, q, cartes, pause, rebours, ph

    def appel_commentaire(self, y):
        self.au_mot("Réponds en commentaire")
        appel = self.borne(tx("Réponds en commentaire !", 32, VERT_OK, True), 0.95).move_to(P(0, y))
        self.play(FadeIn(appel, scale=0.7), run_time=0.35)
        self.insister(appel, 1.1, 0.25)
        self.attendre_voix(marge=1.0)
        return appel

    def fin_short(self, voix, a_effacer):
        """La fin du 19/10 (celle des shorts de la série)."""
        self.dire(voix)
        entraine = tx("Entraîne-toi sur", 40, JAUNE_TITRE).move_to(P(0, 2.2))
        site = tx("eleveai.fr", 54, BLEU_CALCUL).move_to(P(0, 1.25))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.2, stroke_width=3)
        abonne = tx("Abonne-toi !", 42, VERT_OK).move_to(P(0, -0.2))
        poignee = tx("@eleveai974", 44, VERT_OK, audit=False).move_to(P(0, -1.05))
        self.play(FadeOut(Group(*a_effacer)), run_time=0.3)
        self.play(Write(entraine), run_time=0.4)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.5)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), GrowFromCenter(poignee), run_time=0.45)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.25))
        self.attendre_voix(marge=1.0)

    def carte(self):
        return RoundedRectangle(width=4.05, height=2.75, corner_radius=0.18, fill_color="#0b1220", fill_opacity=1,
                                stroke_color="#334155", stroke_width=2).move_to(P(0, Y_CARTE))

    # ── la feuille ──
    def poser_feuille(self, n=0, anim=True):
        """La feuille et ses plis déjà faits (n niveaux) ; self.plis[k] = plis du pliage k."""
        self.f = feuille()
        self.plis = {k: plis_du_niveau(k) for k in range(1, n + 1)}
        objets = [self.f, *self.plis.values()]
        if anim:
            self.play(FadeIn(Group(*objets), shift=UP * 0.15), run_time=0.35)
        else:
            self.add(*objets)

    def plier(self, k, *avec, rt=0.45, rt2=0.25):
        """Le k-ième pliage : chaque rabat glisse sur son pli, puis le pli reste marqué."""
        rb = rabats(k)
        dim = 0 if rb.vertical else 1
        self.add(rb)
        self.play(*[r.animate.stretch(0.03, dim, about_point=r.pli) for r in rb], *avec, run_time=rt)
        self.plis[k] = plis_du_niveau(k)
        self.play(FadeOut(rb), Create(self.plis[k]), run_time=rt2)

    def deplier(self, k, *avec, rt=0.45):
        """On défait le k-ième pliage : le rabat se rouvre et son pli s'efface."""
        rb = rabats(k)
        dim = 0 if rb.vertical else 1
        for r in rb:
            r.stretch(0.03, dim, about_point=r.pli)
        self.add(rb)
        self.play(*[r.animate.stretch(1 / 0.03, dim, about_point=r.pli) for r in rb], FadeOut(self.plis.pop(k)),
                  *avec, run_time=rt)
        self.play(FadeOut(rb), run_time=0.2)

    def etiquette(self, s, couleur=VERT_OK, audit=True):
        """« 8 parts » à droite de la feuille."""
        lab = tx(s, 34, couleur, True, audit)
        if lab.width > 1.55:
            lab.scale_to_fit_width(1.55)
        return lab.move_to(P(LX, FY))

    def etiquette_anims(self, ancienne, s, couleur=VERT_OK):
        nouv = self.etiquette(s, couleur)
        return nouv, [FadeOut(ancienne, shift=UP * 0.15), FadeIn(nouv, scale=1.3)]

    def changer_etiquette(self, ancienne, s, couleur=VERT_OK):
        nouv = self.etiquette(s, couleur)
        if ancienne is None:
            self.play(FadeIn(nouv, scale=1.3), run_time=0.3)
        else:
            self.play(FadeOut(ancienne, shift=UP * 0.15), FadeIn(nouv, scale=1.3), run_time=0.3)
        return nouv

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Plier, déplier", self.ceinture)
        titre.sans_synchro = True  # le titre de la vidéo : posé d'un bloc
        self.add(badge)
        garder = [badge, titre, margo]

        # ── 00 : le défi ──
        self.dire("00-defi")
        carte = self.carte()
        defi = tx("Défi !", 46, EXPO_C, True).move_to(P(0, -0.42))
        self.au("Défi", Write(titre), FadeIn(carte), FadeIn(defi, scale=1.4), rt=0.45)
        self.insister(defi, 1.3, 0.2)
        self.f = feuille()
        self.plis = {}
        l1 = VGroup(tx("Je plie", 30), tx("3 fois,", 30, BLEU_CALCUL, True), tx("je déplie.", 30))
        caler(l1.arrange(RIGHT, buff=0.14)).move_to(P(0, -1.05))
        self.au("plie", FadeIn(l1[0], shift=UP * 0.12), rt=0.25)
        self.au("feuille", FadeIn(self.f, shift=UP * 0.15), rt=0.3)
        self.au("3 fois", FadeIn(l1[1], scale=1.3), rt=0.25)
        for k in (1, 2, 3):
            self.plier(k, rt=0.22, rt2=0.15)
        self.au("déplie", FadeIn(l1[2], shift=UP * 0.12), Indicate(self.f, color=CIEL, scale_factor=1.04), rt=0.4)
        l2 = VGroup(tx("Combien de parts", 30), tx("?", 34, EXPO_C, True)).arrange(RIGHT, buff=0.12)
        caler(l2).move_to(P(0, -1.65))
        q1 = self.etiquette("? parts", EXPO_C)
        self.au("Combien", FadeIn(l2[0], shift=UP * 0.12), rt=0.3)
        self.au("parts ?", FadeIn(l2[1], scale=1.5), FadeIn(q1, scale=1.3), rt=0.3)
        l3 = VGroup(tx("Une part =", 30), tx("?", 34, EXPO_C, True), tx("de la feuille", 30))
        caler(l3.arrange(RIGHT, buff=0.14)).move_to(P(0, -2.3))
        p3 = une_part(3)
        self.au("une part", FadeIn(l3[0], shift=UP * 0.12), FadeIn(p3, scale=1.2), rt=0.35)
        self.bring_to_front(*self.plis.values())
        self.au("quelle", FadeIn(l3[1], scale=1.5), rt=0.25)
        self.au("de la feuille", FadeIn(l3[2], shift=UP * 0.12), rt=0.25)
        self.insister(l3[1], 1.5, 0.2)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 01 : plier : 2, 4, 8 parts ; 2 × 2 × 2 = 2³ ──
        self.dire("01-plier")
        carte = self.carte()
        self.f = feuille()
        self.plis = {}
        self.play(FadeIn(carte), FadeIn(self.f, shift=UP * 0.15), run_time=0.3)
        lab = None
        mots = (("1 pliage", "2 parts", "2 parts."), ("2 pliages", "4", "4."), ("3 pliages", "8", "8."))
        for k, (m_pl, val, m_val) in enumerate(mots, start=1):
            y = -0.45 - 0.5 * (k - 1)
            lg = VGroup(tx(m_pl, 30), tx("→", 30, CIEL),
                        tx(f"{2 ** k} parts", 30, VERT_OK, True))
            caler(lg.arrange(RIGHT, buff=0.16)).move_to(P(0, y))
            self.au(m_pl, FadeIn(lg[0], shift=UP * 0.12), rt=0.2)
            self.plier(k, FadeIn(lg[1]), rt=0.35)
            self.au(m_val, FadeIn(lg[2], scale=1.3), rt=0.25)
            lab = self.changer_etiquette(lab, f"{2 ** k} parts")
        ex = VGroup(tx("2", 44, BLEU_CALCUL, True), tx("×", 40), tx("2", 44, BLEU_CALCUL, True), tx("×", 40),
                    tx("2", 44, BLEU_CALCUL, True), tx("=", 40))
        p23 = puissance(2, 3, 56)
        ligne = caler(VGroup(*ex, p23).arrange(RIGHT, buff=0.14)).move_to(P(0, -2.25))
        p23.exp.align_to(p23.base, UP).shift(UP * 0.14)
        self.au("2 fois", FadeIn(ex[0], scale=1.2), FadeIn(ex[1]), rt=0.25)
        self.au("2 fois", FadeIn(ex[2], scale=1.2), FadeIn(ex[3]), n=2, rt=0.25)
        self.play(FadeIn(ex[4], scale=1.2), run_time=0.25)
        self.au("2 puissance", FadeIn(ex[5]), FadeIn(p23.base, scale=1.2), rt=0.3)
        self.au("3.", FadeIn(p23.exp, scale=1.8), rt=0.3)
        self.insister(p23.exp, 1.6, 0.2)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 02 : déplier : 8 → 4 → 2 ──
        self.dire("02-deplier")
        carte = self.carte()
        self.poser_feuille(3, anim=False)
        lab = self.etiquette("8 parts", audit=False)
        self.play(FadeIn(carte), FadeIn(Group(self.f, *self.plis.values(), lab)), run_time=0.3)
        l1 = VGroup(tx("8 parts", 30, VERT_OK, True, audit=False), tx("→", 34, CIEL), tx("4 parts", 30, VERT_OK, True))
        l1.arrange(RIGHT, buff=0.42)
        l2 = VGroup(tx("4 parts", 30, VERT_OK, True, audit=False), tx("→", 34, CIEL), tx("2 parts", 30, VERT_OK, True))
        l2.arrange(RIGHT, buff=0.42)
        caler(l1).move_to(P(0, -0.55))
        caler(l2).move_to(P(0, -1.3))
        d1 = tx("÷ 2", 22, CIEL, True).next_to(l1[1], UP, buff=0.1)
        d2 = tx("÷ 2", 22, CIEL, True).next_to(l2[1], UP, buff=0.1)
        self.au("déplie", FadeIn(l1[0], shift=UP * 0.12), rt=0.25)
        self.deplier(3, FadeIn(l1[1]), rt=0.4)
        self.au("4 parts", FadeIn(l1[2], scale=1.3), rt=0.3)
        lab = self.changer_etiquette(lab, "4 parts")
        self.au("Encore", FadeIn(l2[0], shift=UP * 0.12), rt=0.25)
        self.deplier(2, FadeIn(l2[1]), rt=0.35)
        lab, a_lab = self.etiquette_anims(lab, "2 parts")
        self.au("2.", FadeIn(l2[2], scale=1.3), *a_lab, rt=0.3)
        l3 = VGroup(tx("À chaque fois :", 32, JAUNE_TITRE), tx("÷ 2", 40, CIEL, True)).arrange(RIGHT, buff=0.2)
        caler(l3).move_to(P(0, -2.15))
        self.au("À chaque", FadeIn(l3[0], shift=UP * 0.12), rt=0.3)
        self.au("divise", FadeIn(l3[1], scale=1.5), FadeIn(d1, scale=1.3), FadeIn(d2, scale=1.3), rt=0.35)
        self.insister(l3[1], 1.5, 0.2)
        self.attendre_voix(marge=0.3)
        self.vider(garder)
        self.insister(l3[1], 1.5, 0.2)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 03 : plus de pli : 2⁰ = 1 ──
        self.dire("03-zero")
        carte = self.carte()
        self.poser_feuille(1, anim=False)
        lab = self.etiquette("2 parts", audit=False)
        self.play(FadeIn(carte), FadeIn(Group(self.f, *self.plis.values(), lab)), run_time=0.3)
        self.au("Plus de pli", rt=0.2)
        self.deplier(1, rt=0.4)
        ent = tx("la feuille entière", 32, JAUNE_TITRE).move_to(P(0, -0.5))
        self.au("la feuille", FadeIn(ent, shift=UP * 0.12), Indicate(self.f, color=CIEL, scale_factor=1.05), rt=0.4)
        self.au("1 seule")
        lab = self.changer_etiquette(lab, "1 part")
        p20 = puissance(2, 0, 84)
        eg = VGroup(tx("=", 70), tx("1", 84, VERT_OK, True))
        ligne = VGroup(p20, *eg).arrange(RIGHT, buff=0.25).move_to(P(0, -1.75))
        p20.exp.align_to(p20.base, UP).shift(UP * 0.2)
        self.au("2 puissance", FadeIn(p20.base, scale=1.2), rt=0.3)
        self.au("0 égale", FadeIn(p20.exp, scale=1.8), FadeIn(eg[0]), rt=0.3)
        self.au("1.", FadeIn(eg[1], scale=1.5), rt=0.3)
        self.insister(eg[1], 1.5, 0.2)
        self.play(Flash(eg[1], color=VERT_OK, line_length=0.2), run_time=0.4)
        self.attendre_voix(marge=0.3)
        self.vider(garder)

        # ── 03q : la question-pause (3 s) : 2⁻¹ ? ──
        self.question_pause("03q-question", "03r-reponse", ["On divise encore par 2.", "2⁻¹, c'est quoi ?"],
                            [self.t("−2", 30), self.t("0", 30), self.t("la moitié", 30)], 2,
                            ["Réponse C : la moitié.", "Une part après 1 pliage."], mot_q="On divise")
        self.vider(garder)

        # ── 04 : 2⁻³ = une part après 3 pliages = 1/8 ──
        self.dire("04-moins3")
        carte = self.carte()
        self.poser_feuille(3, anim=False)
        self.play(FadeIn(carte), FadeIn(Group(self.f, *self.plis.values())), run_time=0.3)
        pm3 = puissance(2, "−3", 76).move_to(P(0, -0.6))
        pm3.exp.align_to(pm3.base, UP).shift(UP * 0.18)
        self.au("Et 2", FadeIn(pm3.base, scale=1.2), rt=0.3)
        self.au("3 ?", FadeIn(pm3.exp, scale=1.8), rt=0.3)
        self.insister(pm3.exp, 1.5, 0.2)
        part = une_part(3)
        sous = caler(tx("Une part après 3 pliages", 30)).move_to(P(0, -1.45))
        self.au("Une part", FadeIn(part, scale=1.2), rt=0.35)
        self.bring_to_front(*self.plis.values())
        self.au("3 pliages", FadeIn(sous, shift=UP * 0.12), rt=0.3)
        l3 = VGroup(tx("=", 50), tx("1/8", 60, VERT_OK, True), tx("de la feuille", 30, JAUNE_TITRE))
        caler(l3.arrange(RIGHT, buff=0.2)).move_to(P(0, -2.2))
        self.au("un huitième", FadeIn(l3[0]), FadeIn(l3[1], scale=1.4), rt=0.35)
        self.insister(l3[1], 1.4, 0.2)
        self.au("de feuille", FadeIn(l3[2], shift=UP * 0.12), rt=0.3)
        self.attendre_voix(marge=0.4)
        self.vider(garder)

        # ── 05 : la question en commentaire : 2⁻⁵ ──
        self.dire("05-question")
        carte = self.carte()
        self.poser_feuille(5, anim=False)
        part = une_part(5)
        qp = self.etiquette("?", EXPO_C)
        qp.scale(1.6)
        fl = Arrow(qp.get_left() + LEFT * 0.05, part.get_right() + RIGHT * 0.02, buff=0.08, color=EXPO_C,
                   stroke_width=5, max_tip_length_to_length_ratio=0.2)
        defi = tx("Défi :", 40, EXPO_C, True).move_to(P(0, -0.45))
        self.au("Défi", FadeIn(carte), FadeIn(defi, scale=1.3), FadeIn(Group(self.f, *self.plis.values())), rt=0.35)
        pm5 = puissance(2, "−5", 70)
        eg = VGroup(tx("=", 56), tx("?", 66, EXPO_C, True))
        ligne = caler(VGroup(pm5, *eg).arrange(RIGHT, buff=0.25), 3.3).move_to(P(0, -1.25))
        pm5.exp.align_to(pm5.base, UP).shift(UP * 0.17)
        self.au("2 puissance", FadeIn(pm5.base, scale=1.2), rt=0.3)
        self.au("5,", FadeIn(pm5.exp, scale=1.8), rt=0.3)
        self.au("quelle part", FadeIn(part, scale=1.2), FadeIn(eg), rt=0.35)
        self.bring_to_front(*self.plis.values())
        self.play(FadeIn(qp, scale=1.4), GrowArrow(fl), run_time=0.3)
        self.insister(eg[1], 1.5, 0.2)
        self.appel_commentaire(-2.3)

        # ── 06 : la fin standard ──
        self.fin_short("06-abonne", [m for m in self.mobjects if m is not margo])
