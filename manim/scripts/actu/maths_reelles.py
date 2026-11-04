# manim/scripts/actu/maths_reelles.py
#
# SÉRIE « ACTU » — ANNONCE des visios « Maths réelles » (short 9:16, CEINTURE
# BLANCHE, 03/11/2026). Le piège des soldes : −30 % puis +30 % ne ramène pas à
# 100 € (100 × 0,7 = 70 ; 70 × 1,3 = 91).
#
# Voix VALIDÉE par Frédéric : manim/annonce-maths-reelles.md, section « Le short,
# écran par écran », reprise MOT POUR MOT dans manim/voix/actu-maths-reelles-short.json
# (9 clés). Les nombres y sont écrits en chiffres (« 100 euros », « 30 % ») : la
# voix les prononce de la même façon, et la synchro par jetons les reconnaît.
#   powershell -File scripts/generer-voix.ps1 -Fichier manim/voix/actu-maths-reelles-short.json -Debit -10
#   powershell -File scripts/marques_dump.ps1 -Fichier manim/voix/actu-maths-reelles-short.json -Sortie manim/scripts/actu/maths_reelles_marques.json -Debit -10
#   python scripts/cues2marques.py manim/voix/actu-maths-reelles-short.json manim/scripts/actu/maths_reelles_marques.json.cues.tsv manim/scripts/actu/maths_reelles_marques.json
# Audit : AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/actu/maths_reelles.py MathsReellesShort
# Rendu : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/actu/maths_reelles.py MathsReellesShort
#           -o eleveai-maths-actu-maths-reelles-short --media_dir manim/scripts/actu/media-maths-reelles
# Sortie : manim/sorties/actu/maths/shorts/fr/maths-reelles/eleveai-maths-actu-maths-reelles-short.mp4
# ⛔ Aucun décor de La Réunion (règle des 4 %). Centres : argent / consommation, numérique.
#
# Écarts assumés avec la règle « un nombre n'apparaît pas avant d'être dit » :
#  · « 70 € » sur l'étiquette (écran 01) : demandé par le script, la voix ne dit 70 qu'à l'écran 03 ;
#  · « 1,3 » (écran 03) et « +50 % » (écran 04) : écrits, jamais dits (demandés par le script).

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from prop_commun import *  # noqa: E402,F403

DRAPEAUX = Path(__file__).resolve().parents[3] / "public" / "drapeaux"
FOND_CARTE = "#0b1220"
DENIM = "#3b5b92"
DENIM_FONCE = "#253c66"
PAPIER = "#fef3c7"
ROUGE = ROUGE_ERREUR

PAYS = [("france", "France"), ("andorre", "Andorre"), ("suisse", "Suisse"), ("belgique", "Belgique"),
        ("luxembourg", "Luxembourg"), ("cote-divoire", "Côte d'Ivoire"), ("senegal", "Sénégal"),
        ("maroc", "Maroc")]


def decor(m):
    """Objet dessiné : ni synchro ni audit (toute sa famille)."""
    for f in m.get_family():
        f._pas_audit = True
        f.sans_synchro = True
    return m


def jean(h=2.2):
    """Un jean dessiné : ceinture, deux jambes, coutures, poche."""
    taille = Rectangle(width=1.3, height=0.22, fill_color=DENIM_FONCE, fill_opacity=1, stroke_width=0)
    taille.move_to(P(0, 1.0))
    jambes = Polygon(P(-0.65, 0.89), P(0.65, 0.89), P(0.72, -1.1), P(0.12, -1.1), P(0.0, 0.2),
                     P(-0.12, -1.1), P(-0.72, -1.1), fill_color=DENIM, fill_opacity=1, stroke_color=DENIM_FONCE,
                     stroke_width=3)
    couture = VGroup(DashedLine(P(-0.42, 0.85), P(-0.45, -1.05), color=JAUNE_TITRE, stroke_width=1.5,
                                dash_length=0.05),
                     DashedLine(P(0.42, 0.85), P(0.45, -1.05), color=JAUNE_TITRE, stroke_width=1.5,
                                dash_length=0.05))
    poche = Arc(radius=0.25, start_angle=PI, angle=PI / 2, color=DENIM_FONCE, stroke_width=3).move_to(P(-0.42, 0.66))
    bouton = Circle(radius=0.05, fill_color=GREY_B, fill_opacity=1, stroke_width=0).move_to(P(0, 1.0))
    g = decor(VGroup(jambes, taille, couture, poche, bouton))
    g.scale_to_fit_height(h)
    g.ceinture = taille
    return g


def etiquette(larg=1.75, haut=0.85):
    """L'étiquette de prix (bout pointu à gauche, trou, ficelle) : le prix se pose dedans."""
    w, h = larg / 2, haut / 2
    corps = Polygon(P(-w, 0), P(-w + 0.28, h), P(w, h), P(w, -h), P(-w + 0.28, -h), fill_color=PAPIER,
                    fill_opacity=1, stroke_color=ORANGE_RETENUE, stroke_width=3)
    trou = Circle(radius=0.06, fill_color=BLACK, fill_opacity=1, stroke_color=ORANGE_RETENUE, stroke_width=2)
    trou.move_to(P(-w + 0.22, 0))
    g = decor(VGroup(corps, trou))
    g.trou = trou
    g.zone = P(0.12, 0)
    return g


def tele(larg=1.5):
    ecran = RoundedRectangle(width=larg, height=larg * 0.62, corner_radius=0.08, fill_color="#1e293b",
                             fill_opacity=1, stroke_color=GREY_B, stroke_width=4)
    pied = VGroup(Line(P(-0.18, 0), P(0.18, 0), color=GREY_B, stroke_width=5),
                  Line(P(0, 0), P(0, 0.14), color=GREY_B, stroke_width=5))
    pied.next_to(ecran, DOWN, buff=0.0)
    g = decor(VGroup(ecran, pied))
    g.ecran = ecran
    return g


def telephone(h=1.25):
    corps = RoundedRectangle(width=h * 0.55, height=h, corner_radius=0.1, fill_color="#1e293b", fill_opacity=1,
                             stroke_color=GREY_B, stroke_width=4)
    haut = Line(P(-0.08, 0), P(0.08, 0), color=GREY_B, stroke_width=3).move_to(corps.get_top() + DOWN * 0.08)
    g = decor(VGroup(corps, haut))
    g.ecran = corps
    return g


def camembert(r=0.16):
    return decor(VGroup(Sector(radius=r, angle=TAU * 0.62, fill_color=BLEU_CALCUL, fill_opacity=1, stroke_width=0),
                        Sector(radius=r, start_angle=TAU * 0.62, angle=TAU * 0.38, fill_color=GREY_B,
                               fill_opacity=1, stroke_width=0)))


def barres(h=0.34):
    b = VGroup(*[Rectangle(width=0.08, height=h * k, fill_color=ORANGE_RETENUE, fill_opacity=1, stroke_width=0)
                 for k in (0.35, 0.55, 1.0)]).arrange(RIGHT, buff=0.04, aligned_edge=DOWN)
    return decor(b)


def fleche_haut(h=0.36, couleur=ROUGE):
    return decor(Arrow(P(0, -h / 2), P(0, h / 2), buff=0, color=couleur, stroke_width=6,
                       max_tip_length_to_length_ratio=0.4))


def bulle(larg=1.6, haut=0.9, couleur=BLEU_CALCUL):
    """Une bulle de commentaire DESSINÉE (jamais un emoji), trois points dedans."""
    corps = RoundedRectangle(width=larg, height=haut, corner_radius=0.22, fill_color=FOND_CARTE, fill_opacity=1,
                             stroke_color=couleur, stroke_width=4)
    queue = Polygon(P(-larg * 0.2, -haut / 2 + 0.02), P(-larg * 0.32, -haut / 2 - 0.3),
                    P(-larg * 0.04, -haut / 2 + 0.02), fill_color=FOND_CARTE, fill_opacity=1,
                    stroke_color=couleur, stroke_width=4)
    cache = Line(P(-larg * 0.2 + 0.03, -haut / 2 + 0.01), P(-larg * 0.04 - 0.03, -haut / 2 + 0.01),
                 color=FOND_CARTE, stroke_width=6)
    points = VGroup(*[Dot(P(x, 0), radius=0.07, color=couleur) for x in (-0.3, 0, 0.3)])
    g = decor(VGroup(queue, corps, cache, points))
    g.pts = points
    return g


def drapeau(slug, larg=0.82):
    svg = SVGMobject(str(DRAPEAUX / f"{slug}.svg"))
    svg.scale_to_fit_width(larg)
    cadre = Rectangle(width=svg.width, height=svg.height, stroke_color=GREY_B, stroke_width=1.5).move_to(svg)
    return decor(VGroup(svg, cadre))


class MathsReellesShort(ShortProp):
    nom_voix = "actu-maths-reelles-short"
    fichier_marques = "maths_reelles_marques.json"
    ceinture = "blanche"
    LARG_MAX = 3.8  # cadre de 4,5 : 3 % de marge de chaque côté, plus du jeu pour les zooms

    def t(self, s, fs=36, color=WHITE):
        m = Text(s, font_size=fs, color=color)
        if m.width > self.LARG_MAX:
            m.scale_to_fit_width(self.LARG_MAX)
        return m

    def prix(self, s, couleur="#0f172a", fs=30):
        m = Text(s, font_size=fs, color=couleur, weight=BOLD)
        return m.move_to(self.etiq.get_center() + RIGHT * 0.12)

    # ── 00 : les soldes, le jean à 100 €, −30 % ──
    def ecran_soldes(self, titre):
        self.dire("00-soldes")
        self.play(Write(titre), run_time=0.4)
        soldes = self.t("SOLDES", 40, WHITE)
        bande = decor(RoundedRectangle(width=soldes.width + 0.5, height=soldes.height + 0.28, corner_radius=0.1,
                                       fill_color=ROUGE, fill_opacity=1, stroke_width=0))
        g = VGroup(bande, soldes).move_to(P(0, 1.85))
        self.play(GrowFromCenter(bande), FadeIn(soldes, scale=1.3), run_time=0.4)
        self.jean = j = jean(2.1).move_to(P(-1.1, 0.05))
        self.au_mot("jean")
        self.play(FadeIn(j, shift=UP * 0.2), run_time=0.35)
        self.etiq = e = etiquette().move_to(P(0.8, 0.45))
        self.ficelle = decor(Line(e.trou.get_center(), j.ceinture.get_right() + LEFT * 0.05, color=GREY_B,
                                  stroke_width=2))
        self.add(self.ficelle)
        self.play(Create(self.ficelle), FadeIn(e, shift=LEFT * 0.15), run_time=0.3)
        self.p100 = self.prix("100 €")
        self.play(FadeIn(self.p100, scale=1.4), run_time=0.3)
        self.insister(self.p100, 1.12, 0.2)
        self.moins = self.t("−30 %", 50, ROUGE).move_to(P(0.8, -0.55))
        barre = decor(Line(self.p100.get_left() + LEFT * 0.05, self.p100.get_right() + RIGHT * 0.05, color=ROUGE,
                           stroke_width=6))
        self.play(FadeIn(self.moins, scale=1.15), run_time=0.35)
        self.play(Create(barre), self.p100.animate.set_opacity(0.45), run_time=0.3)
        self.barre100 = barre
        self.bande_soldes = g
        self.attendre_voix(marge=0.3)

    # ── 01 : 70 €, un mois plus tard, +30 % ──
    def ecran_remonte(self):
        self.dire("01-remonte")
        p70 = self.prix("70 €")
        self.play(FadeOut(VGroup(self.p100, self.barre100)), FadeIn(p70, scale=1.3), run_time=0.4)
        self.p_act = p70
        mois = self.t("Un mois plus tard,", 30).move_to(P(0, -1.55))
        self.play(FadeIn(mois, shift=UP * 0.15), run_time=0.35)
        plus = self.t("+30 %", 46, VERT_OK).move_to(P(0.75, -0.55))
        self.play(FadeOut(self.moins, shift=DOWN * 0.2), run_time=0.2)
        self.play(FadeIn(plus, scale=1.15), run_time=0.35)
        self.insister(plus, 1.1, 0.2)
        self.plus, self.mois = plus, mois
        self.attendre_voix(marge=0.3)

    # ── 02 : la question-pause « Vrai ou faux » + chrono 3 s ──
    def ecran_vrai_faux(self):
        self.dire("02-vrai-faux")
        haut = VGroup(self.jean, self.ficelle, self.etiq, self.p_act)
        self.play(FadeOut(VGroup(self.bande_soldes, self.plus, self.mois)),
                  haut.animate.scale(0.62).move_to(P(0, 1.3)), run_time=0.25)
        q = self.p_act
        inter = Text("? €", font_size=30, color=ORANGE_RETENUE, weight=BOLD).scale(0.62).move_to(q)
        vf = self.t("VRAI OU FAUX ?", 42, JAUNE_TITRE).move_to(P(0, 0.2))
        self.play(GrowFromCenter(vf), Transform(q, inter), run_time=0.35)
        self.insister(vf, 1.08, 0.2)
        rev = self.ligne([("Il est revenu", WHITE), ("à 100 € ?", WHITE)], 30, buff=0.16).move_to(P(0, -0.5))
        self.play(FadeIn(rev[0], shift=UP * 0.12), run_time=0.3)
        self.play(FadeIn(rev[1], scale=1.25), run_time=0.3)
        pause = VGroup(pastille_pause(0.3), self.t("Mets pause et réfléchis.", 26, ORANGE_RETENUE)).arrange(
            RIGHT, buff=0.16)
        self.borne(pause, 0.6).move_to(P(0, -1.2))
        self.play(FadeIn(pause, shift=UP * 0.12), run_time=0.35)
        rebours = CompteARebours(3, r=0.32, fs=30).move_to(P(0, -2.0))
        decor(rebours)
        self.play(FadeIn(rebours, scale=0.8), run_time=0.3)
        self.attendre_voix(marge=0.1)
        rebours.jouer(self)
        self.vf, self.rev, self.pause_q, self.rebours = vf, rev, pause, rebours

    # ── 03 : Faux ! 30 % de 70 = 21 ; 70 × 1,3 = 91 € ──
    def ecran_faux(self):
        self.dire("03-faux")
        faux = self.t("FAUX !", 56, ROUGE).move_to(self.vf)
        cadre = decor(SurroundingRectangle(faux, color=ROUGE, buff=0.14, corner_radius=0.1, stroke_width=5))
        self.play(FadeOut(VGroup(self.vf, self.rev, self.pause_q, self.rebours)), run_time=0.2)
        self.play(FadeIn(faux, scale=1.5), Create(cadre), run_time=0.35)
        l1 = self.ligne([("30 %", BLEU_CALCUL), ("de 70", BLEU_CALCUL), ("= 21", BLEU_CALCUL)], 36,
                        buff=0.16).move_to(P(0, -0.6))
        for k, m in enumerate(l1):
            self.play(FadeIn(m, shift=RIGHT * 0.15), run_time=0.3)
        gauche = Text("70 × 1,3 =", font_size=38, color=WHITE)
        decor(gauche)
        res = Text("91 €", font_size=42, color=VERT_OK, weight=BOLD)
        l2 = VGroup(gauche, res).arrange(RIGHT, buff=0.18)
        self.borne(l2, 0.8).move_to(P(0, -1.45))
        self.au_mot("Le jean")
        self.play(FadeIn(gauche, shift=RIGHT * 0.15), run_time=0.35)
        p91 = Text("91 €", font_size=30, color="#15803d", weight=BOLD).scale(0.62).move_to(self.p_act)
        decor(p91)
        self.play(FadeIn(res, scale=1.4), Transform(self.p_act, p91), run_time=0.35)
        cr = decor(SurroundingRectangle(res, color=VERT_OK, buff=0.1, corner_radius=0.08))
        self.play(res.animate.scale(1.35), run_time=0.3)
        self.play(res.animate.scale(1 / 1.35), Create(cr), run_time=0.3)
        self.attendre_voix(marge=0.4)

    # ── 04 : des phrases comme ça, tous les jours : télé, réseaux ──
    def carte_titre(self, dessin, mot, couleur, fs=30):
        txt = self.t(mot, fs, couleur)
        txt.sans_synchro = True
        txt._pas_audit = True
        ligne = VGroup(dessin, txt).arrange(RIGHT, buff=0.2)
        cadre = decor(RoundedRectangle(width=max(2.9, ligne.width + 0.45), height=0.62, corner_radius=0.12, fill_color=FOND_CARTE,
                                       fill_opacity=1, stroke_color=couleur, stroke_width=3))
        ligne.move_to(cadre)
        return VGroup(cadre, ligne)

    def ecran_phrases(self):
        self.dire("04-phrases")
        a = self.t("Des phrases comme ça,", 32).move_to(P(0, 3.25))
        self.play(FadeIn(a, shift=DOWN * 0.12), run_time=0.3)
        cartes = [self.carte_titre(camembert(), "SONDAGE", BLEU_CALCUL),
                  self.carte_titre(barres(), "GRAPHIQUE", ORANGE_RETENUE),
                  self.carte_titre(fleche_haut(), "+50 %", ROUGE, 36)]
        # le fil qui DÉFILE : chaque titre entre en bas, les autres montent
        pos = [P(0, 0.95), P(0, 1.7), P(0, 2.45)]
        posees = []
        for c in cartes:
            c.move_to(pos[0])
            anims = [p.animate.move_to(pos[len(posees) - k]) for k, p in enumerate(posees)]
            self.play(FadeIn(c, shift=UP * 0.4), *anims, run_time=0.4)
            posees.append(c)
            self.wait(0.15)
        b = self.t("on t'en dit tous les jours.", 30, JAUNE_TITRE).move_to(P(0, 0.15))
        self.play(FadeIn(b, shift=UP * 0.12), run_time=0.35)
        tv = tele(1.55).move_to(P(-1.0, -1.1))
        mini = self.t("+50 %", 34, ROUGE)
        mini.scale_to_fit_width(tv.ecran.width * 0.75).move_to(tv.ecran)
        decor(mini)
        la_tele = self.t("À la télé,", 26).move_to(P(-1.0, -2.0))
        self.au_mot("télé")
        self.play(FadeIn(tv, shift=UP * 0.15), FadeIn(la_tele), FadeIn(mini, scale=1.3), run_time=0.35)
        ph = telephone(1.2).move_to(P(1.05, -1.05))
        coeur = decor(VGroup(camembert(0.18), barres(0.3)).arrange(DOWN, buff=0.12).move_to(ph.ecran))
        res = VGroup(self.t("sur les", 26), self.t("réseaux.", 26)).arrange(DOWN, buff=0.06).move_to(P(1.05, -2.15))
        decor(res)
        self.au_mot("réseaux")
        self.play(FadeIn(ph, shift=UP * 0.15), FadeIn(res), FadeIn(coeur, scale=1.3), run_time=0.35)
        self.play(Wiggle(VGroup(tv, mini)), Wiggle(VGroup(ph, coeur)), run_time=0.6)
        self.attendre_voix(marge=0.3)

    # ── 05 : MATHS RÉELLES, en direct dès janvier ; une phrase, on vote, on vérifie ──
    def ecran_maths_reelles(self):
        self.dire("05-maths-reelles")
        direct = self.t("en direct, dès janvier", 30).move_to(P(0.17, 1.4))
        rond = decor(Dot(radius=0.1, color=ROUGE).next_to(direct, LEFT, buff=0.16))
        self.au_mot("janvier")
        self.play(FadeIn(direct, shift=UP * 0.12), GrowFromCenter(rond), run_time=0.35)
        self.play(Flash(rond, color=ROUGE, line_length=0.15), run_time=0.4)
        m1 = self.t("MATHS", 64, JAUNE_TITRE).move_to(P(0, 3.0))
        m2 = self.t("RÉELLES", 64, JAUNE_TITRE).move_to(P(0, 2.25))
        decor(m2)
        self.au_mot("Maths")
        self.play(GrowFromCenter(m1), GrowFromCenter(m2), run_time=0.4)
        mr = VGroup(m1, m2)
        if mr.width > 3.4:
            mr.scale_to_fit_width(3.4)
        self.insister(mr, 1.1, 0.25)
        # les trois temps d'une visio
        b = bulle(0.9, 0.5).move_to(P(-1.45, 0.45))
        une = self.t("Une phrase", 30).move_to(P(0.5, 0.45))
        self.play(FadeIn(b, scale=1.2), FadeIn(une, shift=LEFT * 0.12), run_time=0.35)
        vote = self.t("on vote :", 30).move_to(P(-0.95, -0.4))
        vf = self.t("Vrai ou faux ?", 30, JAUNE_TITRE).next_to(vote, RIGHT, buff=0.18)
        decor(vf)
        boutons = VGroup()
        for s, c in (("VRAI", VERT_OK), ("FAUX", ROUGE)):
            tt = self.t(s, 24, WHITE)
            decor(tt)
            fond = decor(RoundedRectangle(width=1.15, height=0.48, corner_radius=0.12, fill_color=c, fill_opacity=1,
                                          stroke_width=0))
            boutons.add(VGroup(fond, tt.move_to(fond)))
        boutons.arrange(RIGHT, buff=0.35).move_to(P(0, -1.0))
        lv = VGroup(vote, vf)
        self.borne(lv, 0.6).move_to(P(0, -0.4))
        self.play(FadeIn(vote, shift=LEFT * 0.12), run_time=0.3)
        self.play(FadeIn(vf, scale=1.2), LaggedStart(*[GrowFromCenter(x) for x in boutons], lag_ratio=0.3),
                  run_time=0.45)
        coche = decor(self.coche(VERT_OK, 0.24))
        coche.scale_to_fit_height(0.3)
        ver = VGroup(self.t("on vérifie", 34, VERT_OK), self.t("avec les maths", 32))
        lg = VGroup(coche, ver[0]).arrange(RIGHT, buff=0.2).move_to(P(0, -1.75))
        ver[1].move_to(P(0, -2.3))
        decor(ver)
        self.au_mot("vérifie")
        self.play(Create(coche), FadeIn(ver[0], shift=LEFT * 0.12), run_time=0.35)
        self.au_mot("avec les maths")
        self.play(FadeIn(ver[1], shift=LEFT * 0.12), run_time=0.3)
        self.insister(VGroup(coche, ver), 1.08, 0.2)
        self.attendre_voix(marge=0.3)

    # ── 06 : les 8 pays ──
    def ecran_pays(self):
        self.dire("06-pays")
        tit = self.ligne([("Des élèves de", WHITE), ("8 pays", JAUNE_TITRE)], 36, buff=0.18).move_to(P(0, 3.15))
        self.play(FadeIn(tit[0], shift=DOWN * 0.12), run_time=0.3)
        self.play(FadeIn(tit[1], scale=1.4), run_time=0.3)
        cases = []
        for slug, nom in PAYS:
            d = drapeau(slug)
            n = self.t(nom, 18, GREY_A)
            decor(n)
            if n.width > 0.98:
                n.scale_to_fit_width(0.98)
            cases.append(VGroup(d, n.next_to(d, DOWN, buff=0.08)))
        grille = VGroup(*cases).arrange_in_grid(2, 4, buff=(0.13, 0.28))
        self.borne(grille, 0.5).move_to(P(0, 1.55))
        self.play(LaggedStart(*[FadeIn(c, scale=0.6) for c in cases], lag_ratio=0.12), run_time=0.9)
        cl = self.t("du collège au lycée", 32, BLEU_CALCUL).move_to(P(0, -0.05))
        self.play(FadeIn(cl, shift=UP * 0.12), run_time=0.35)
        a = self.t("Pour ne plus", 36).move_to(P(0, -0.95))
        b = self.t("se faire avoir.", 38, VERT_OK).move_to(P(0, -1.6))
        b.scale_to_fit_width(min(b.width, 3.3))
        decor(b)
        self.play(FadeIn(a, shift=UP * 0.12), run_time=0.3)
        self.au_mot("faire")
        self.play(GrowFromCenter(b), run_time=0.35)
        self.insister(b, 1.15, 0.25)
        self.attendre_voix(marge=0.4)

    # ── 07 : la question en commentaire ──
    def ecran_commentaire(self):
        self.dire("07-commentaire")
        et = self.t("Et toi :", 48, JAUNE_TITRE).move_to(P(0, 2.9))
        self.play(FadeIn(et, scale=1.3), run_time=0.3)
        l1 = self.t("quelle phrase", 38).move_to(P(0, 2.05))
        l2 = self.t("veux-tu qu'on vérifie ?", 34).move_to(P(0, 1.4))
        self.play(FadeIn(l1, shift=UP * 0.12), run_time=0.3)
        self.play(FadeIn(l2, shift=UP * 0.12), run_time=0.3)
        b = bulle(2.0, 1.05).move_to(P(0, 0.05))
        self.play(GrowFromCenter(b), run_time=0.35)
        self.play(LaggedStart(*[Indicate(p, scale_factor=1.6) for p in b.pts], lag_ratio=0.25), run_time=0.7)
        dis = VGroup(self.t("Dis-le", 38, VERT_OK), self.t("en commentaire !", 34, VERT_OK)).arrange(
            DOWN, buff=0.12).move_to(P(0, -1.6))
        decor(dis)
        self.au_mot("Dis-le")
        self.play(FadeIn(dis[0], scale=0.7), run_time=0.3)
        self.au_mot("commentaire")
        self.play(FadeIn(dis[1], scale=0.7), run_time=0.35)
        self.insister(dis, 1.06, 0.25)
        self.attendre_voix(marge=1.0)

    # ── 08 : la fin du 19/10 (copie de ia_maths.py) ──
    def page_abonnement(self, voix="08-abonne"):
        self.clear()
        self.margo_bas()
        self.dire(voix)
        entraine = self.t("Entraîne-toi sur", 40, JAUNE_TITRE).move_to(P(0, 2.4))
        site = Text("eleveai.fr", font_size=54, color=BLEU_CALCUL).move_to(P(0, 1.45))
        cadre = SurroundingRectangle(site, color=BLEU_CALCUL, buff=0.2, stroke_width=3)
        abonne = Text("Abonne-toi !", font_size=42, color=VERT_OK).move_to(P(0, 0.0))
        poignee = decor(Text("@eleveai974", font_size=44, color=VERT_OK).move_to(P(0, -0.85)))
        self.play(Write(entraine), run_time=0.4)
        self.au_mot("éleveai")
        self.play(GrowFromCenter(site), Create(cadre), run_time=0.5)
        self.au_mot("abonne-toi")
        self.play(FadeIn(abonne, shift=UP * 0.15), GrowFromCenter(poignee), run_time=0.45)
        self.play(Flash(poignee, color=VERT_OK, line_length=0.25))
        self.attendre_voix(marge=1.0)

    def construct(self):
        margo = self.margo_bas()
        titre, badge = self.entete_short("Le piège des soldes", self.ceinture)
        decor(titre)
        self.add(badge)
        garder = [margo, titre, badge]
        self.ecran_soldes(titre)
        self.ecran_remonte()
        self.ecran_vrai_faux()
        self.ecran_faux()
        self.vider([margo])
        self.ecran_phrases()
        self.vider([margo])
        self.ecran_maths_reelles()
        self.vider([margo])
        self.ecran_pays()
        self.vider([margo])
        self.ecran_commentaire()
        self.page_abonnement()
