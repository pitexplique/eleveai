# atelier_video.py
# EleveAI — « Crée ta vidéo de maths » : l'annonce de l'atelier vidéo (/atelier-video).
#
# ⭐ 09-10/10/2026 — Frédéric : « on va faire une vidéo paysage et short pour
# avertir qu'ils peuvent faire une vidéo », puis « go » le 10/10 sur les voix :
#   manim/voix/annonce-atelier-video.json        (paysage, 10 écrans)
#   manim/voix/annonce-atelier-video-short.json  (short, 5 écrans)
# ⛔ La voix dit, l'écran écrit : chaque ligne de script, chaque nombre, chaque
#   bouton nommé par la voix s'affiche AU MOT (`au_mot`).
# ⛔ Le short finit par une question à poser en commentaire (règle du 09/10).
# ⛔ AUCUNE ÉTIQUETTE DE NIVEAU : l'atelier sert toutes les classes et toutes
#   les matières (Frédéric : « cela concerne le français, pour la rédaction »).
# Les écrans montrent l'atelier tel qu'il est : script en français, aperçu,
# voix au micro, bouton « Télécharger ma vidéo ».
#
# Voix :
#   powershell -File scripts/generer-voix.ps1 -Fichier manim/voix/annonce-atelier-video.json -Debit -7
#   powershell -File scripts/generer-voix.ps1 -Fichier manim/voix/annonce-atelier-video-short.json -Debit -7
# Rendu :
#   python -m manim render -qh --disable_caching manim/scripts/bases/atelier_video.py AtelierVideo -o eleveai-maths-bases-atelier-video --media_dir manim/scripts/bases/media
#   python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/bases/atelier_video.py AtelierVideoShort -o eleveai-maths-bases-atelier-video-short --media_dir manim/scripts/bases/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_bases import NotionBases
from gabarit_seconde import NotionSeconde, ShortSeconde
from gabarit_sixieme import _Voix6e

MONO = "Consolas"
GRIS_PANNEAU = "#1E293B"
OBJECTIFS = [
    "écrire ton script",
    "voir l'aperçu",
    "y mettre ta voix",
    "télécharger ta vidéo",
]


class _Atelier:
    """Les objets de l'atelier : lignes de script, écran, boutons, clap, micro."""

    def clear(self):
        """⭐ 10/10/2026 — Frédéric : « il manque dans la vidéo l'adresse
        eleveai.fr », puis « ou alors l'adresse complète pour créer ta vidéo ».
        L'adresse COMPLÈTE reste donc à l'écran du début à la fin : chaque écran
        commence par `clear()`, qui la repose aussitôt, au coin BAS-gauche (en haut
        elle touchait les titres longs, vu au brouillon ; Ti-Margo est en bas à droite).
        ⛔ PAS DANS LE SHORT : « le short est parfait » (10/10), il garde l'adresse
        de son écran 03 et ne change plus."""
        super().clear()
        if config.frame_width < 8:
            return self
        adresse = Text("eleveai.fr/atelier-video", font_size=26, color=BLEU_CALCUL)
        self.add(adresse.to_corner(DL, buff=0.25))
        return self

    def ligne(self, texte, font_size=24, color=WHITE):
        return Text(texte, font=MONO, font_size=font_size, color=color)

    def panneau(self, largeur, hauteur, centre):
        return RoundedRectangle(width=largeur, height=hauteur, corner_radius=0.15,
                                stroke_color=GREY_B, stroke_width=2).set_fill(GRIS_PANNEAU, opacity=1).move_to(centre)

    def ecran(self, largeur, centre):
        """L'écran de la vidéo : un cadre 16:9 noir, comme l'aperçu de l'atelier."""
        return Rectangle(width=largeur, height=largeur * 9 / 16, stroke_color=WHITE,
                         stroke_width=2.5).set_fill(BLACK, opacity=1).move_to(centre)

    def bouton(self, texte, couleur, font_size=26, icone=None):
        t = Text(texte, font_size=font_size, color=WHITE, weight=BOLD)
        morceaux = [t]
        if icone == "lecture":
            morceaux.insert(0, Triangle(color=WHITE).set_fill(WHITE, 1).rotate(-PI / 2).scale(0.12))
        elif icone == "bas":
            fleche = Arrow(UP * 0.22, DOWN * 0.22, buff=0, color=WHITE, stroke_width=5,
                           max_tip_length_to_length_ratio=0.45)
            morceaux.insert(0, fleche)
        contenu = VGroup(*morceaux).arrange(RIGHT, buff=0.18)
        fond = RoundedRectangle(width=contenu.width + 0.6, height=contenu.height + 0.4,
                                corner_radius=0.18, stroke_width=0).set_fill(couleur, opacity=1)
        return VGroup(fond, contenu.move_to(fond))

    def billes(self, rangees, colonnes, rayon=0.12, buff=0.12):
        g = VGroup(*[Circle(radius=rayon, stroke_width=0).set_fill("#58A6FF", 1)
                     for _ in range(rangees * colonnes)])
        return g.arrange_in_grid(rows=rangees, cols=colonnes, buff=buff)

    def clap(self, largeur=1.6):
        """Le clap de cinéma — celui du bandeau de l'accueil."""
        k = largeur / 1.12
        corps = RoundedRectangle(width=1.12 * k, height=0.70 * k, corner_radius=0.08 * k,
                                 stroke_color=BLEU_CALCUL, stroke_width=4).set_fill(WHITE, 1)
        barre = Rectangle(width=1.12 * k, height=0.22 * k, stroke_color=BLEU_CALCUL,
                          stroke_width=4).set_fill(WHITE, 1)
        barre.next_to(corps, UP, buff=0.02)
        rayures = VGroup(*[
            Polygon([-0.38 + 0.32 * i, 0.11, 0], [-0.22 + 0.32 * i, 0.11, 0],
                    [-0.32 + 0.32 * i, -0.11, 0], [-0.48 + 0.32 * i, -0.11, 0],
                    stroke_width=0).set_fill(BLEU_CALCUL, 1).scale(k, about_point=ORIGIN)
            for i in range(3)
        ]).move_to(barre)
        haut = VGroup(barre, rayures).rotate(14 * DEGREES, about_point=barre.get_corner(DL))
        lecture = Triangle(stroke_width=0).set_fill(BLEU_CALCUL, 1).rotate(-PI / 2).scale(0.2 * k).move_to(corps)
        return VGroup(corps, haut, lecture)

    def micro(self, hauteur=1.4):
        k = hauteur / 1.4
        tete = RoundedRectangle(width=0.5 * k, height=0.8 * k, corner_radius=0.25 * k,
                                stroke_color=WHITE, stroke_width=3).set_fill(ROUGE_ERREUR, 0.85)
        anse = Arc(radius=0.38 * k, start_angle=PI, angle=PI, color=WHITE, stroke_width=3)
        anse.move_to(tete.get_bottom() + DOWN * 0.05 * k)
        pied = Line(anse.get_bottom(), anse.get_bottom() + DOWN * 0.3 * k, color=WHITE, stroke_width=3)
        socle = Line(pied.get_end() + LEFT * 0.22 * k, pied.get_end() + RIGHT * 0.22 * k,
                     color=WHITE, stroke_width=3)
        return VGroup(tete, anse, pied, socle)

    def telephone(self, hauteur=1.4):
        k = hauteur / 1.4
        corps = RoundedRectangle(width=0.72 * k, height=1.4 * k, corner_radius=0.12 * k,
                                 stroke_color=WHITE, stroke_width=3).set_fill(GRIS_PANNEAU, 1)
        ecran = Rectangle(width=0.56 * k, height=1.0 * k, stroke_width=0).set_fill(BLEU_CALCUL, 0.35)
        bouton = Circle(radius=0.06 * k, color=WHITE, stroke_width=2)
        bouton.move_to(corps.get_bottom() + UP * 0.12 * k)
        return VGroup(corps, ecran.move_to(corps).shift(UP * 0.05 * k), bouton)

    def cadenas(self, taille=0.7):
        corps = RoundedRectangle(width=taille, height=taille * 0.75, corner_radius=0.08,
                                 stroke_width=0).set_fill(VERT_OK, 1)
        anse = Arc(radius=taille * 0.3, start_angle=0, angle=PI, color=VERT_OK, stroke_width=6)
        anse.next_to(corps, UP, buff=-0.02)
        return VGroup(anse, corps)

    def fichier(self, nom, largeur=1.3):
        h = largeur * 1.25
        coin = largeur * 0.28
        forme = Polygon([0, 0, 0], [largeur - coin, 0, 0], [largeur, -coin, 0], [largeur, -h, 0], [0, -h, 0],
                        stroke_color=WHITE, stroke_width=3).set_fill(GRIS_PANNEAU, 1)
        pli = Polygon([largeur - coin, 0, 0], [largeur - coin, -coin, 0], [largeur, -coin, 0],
                      stroke_color=WHITE, stroke_width=2)
        lecture = Triangle(stroke_width=0).set_fill(VERT_OK, 1).rotate(-PI / 2).scale(0.22)
        lecture.move_to([largeur / 2, -h / 2, 0])
        etiquette = Text(nom, font=MONO, font_size=20, color=WHITE).next_to(forme, DOWN, buff=0.15)
        return VGroup(forme, pli, lecture, etiquette)

    def ordinateur(self, largeur=3.0):
        ecran = RoundedRectangle(width=largeur, height=largeur * 0.62, corner_radius=0.1,
                                 stroke_color=WHITE, stroke_width=3).set_fill(BLACK, 1)
        socle = Polygon([-largeur * 0.62, 0, 0], [largeur * 0.62, 0, 0], [largeur * 0.55, -0.18, 0],
                        [-largeur * 0.55, -0.18, 0], stroke_color=WHITE, stroke_width=3).set_fill(GRIS_PANNEAU, 1)
        socle.next_to(ecran, DOWN, buff=0.03)
        return VGroup(ecran, socle)

    def ondes(self, centre, taille=0.3, couleur=VERT_OK):
        return VGroup(*[
            Arc(radius=taille * (i + 1), start_angle=-PI / 4, angle=PI / 2, color=couleur,
                stroke_width=4).move_arc_center_to(centre)
            for i in range(3)
        ])


class AtelierVideo(_Voix6e, _Atelier, NotionBases):
    """L'annonce de l'atelier vidéo — format paysage, avec voix."""

    nom_voix = "annonce-atelier-video"
    identite = "EleveAI · l'atelier vidéo"

    def construct(self):
        self.page_de_garde(
            titre="Crée ta vidéo de maths",
            accroche="Les maths, ça sert à rien… sauf à les expliquer.",
            promesse="Aujourd'hui, c'est toi qui fais la vidéo.",
        )
        self.page_objectifs(OBJECTIFS)
        self.ecran_idee()
        self.ecran_script()
        self.ecran_regle()
        self.ecran_apercu()
        self.ecran_enregistrer()
        self.ecran_ta_voix()
        self.ecran_telecharger()
        self.ecran_fin()
        NotionSeconde.page_abonnement(self)

    # ── 01 : Manim, Python… et ici le français ───────────────────────────────
    def ecran_idee(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-idee")
        self.titre_ecran("Faire une vidéo de maths")

        self.au_mot("Manim")
        manim = Text("Manim", font_size=50, color=BLEU_CALCUL).move_to([-3.6, 2.0, 0])
        sous = Text("un logiciel gratuit de vidéos de maths", font_size=22, color=WHITE)
        sous.next_to(manim, DOWN, buff=0.15)
        self.play(GrowFromCenter(manim), FadeIn(sous, shift=UP * 0.1))

        self.au_mot("programmer en Python")
        etiquette_py = Text("D'habitude : programmer en Python", font_size=24, color=ORANGE_RETENUE)
        code = VGroup(
            self.ligne("class MaVideo(Scene):", 20),
            self.ligne("  def construct(self):", 20),
            self.ligne("    t = MathTex(...)", 20),
            self.ligne("    self.play(Write(t))", 20),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.12)
        fond_py = self.panneau(code.width + 0.6, code.height + 0.5, [-3.6, -0.6, 0])
        code.move_to(fond_py)
        etiquette_py.next_to(fond_py, UP, buff=0.2)
        self.play(FadeIn(etiquette_py), FadeIn(fond_py), FadeIn(code, shift=RIGHT * 0.2))
        croix = Cross(VGroup(fond_py, code), stroke_color=ROUGE_ERREUR, stroke_width=6)
        self.play(Create(croix))

        self.au_mot("Ici, tu écris en français")
        etiquette_fr = Text("Ici : en français", font_size=24, color=VERT_OK)
        script = VGroup(
            self.ligne("titre : 12 billes", 22),
            self.ligne("billes : 3 x 4", 22),
            self.ligne("écris : 12 = 3 × 4", 22),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.16)
        fond_fr = self.panneau(script.width + 0.7, script.height + 0.55, [3.5, -0.6, 0])
        script.move_to(fond_fr)
        etiquette_fr.next_to(fond_fr, UP, buff=0.2)
        self.play(FadeIn(etiquette_fr), FadeIn(fond_fr))
        self.play(LaggedStart(*[FadeIn(l, shift=RIGHT * 0.2) for l in script], lag_ratio=0.35))

        self.au_mot("une ligne par plan")
        plan = Text("une ligne = un plan", font_size=24, color=BLEU_CALCUL).next_to(fond_fr, DOWN, buff=0.25)
        self.play(Write(plan))

        self.au_mot("sur eleveai.fr")
        url = Text("eleveai.fr/atelier-video", font_size=34, color=BLEU_CALCUL).move_to([0.6, -2.7, 0])
        self.play(Write(url), Create(SurroundingRectangle(url, color=BLEU_CALCUL, buff=0.15)))
        self.attendre_voix()

    # ── 02 : le script, ligne par ligne, et ce qu'il dessine ─────────────────
    def ecran_script(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-script")
        self.titre_ecran("Ton script, ligne par ligne")

        fond = self.panneau(6.9, 4.4, [-3.3, -0.2, 0])
        ecran = self.ecran(5.6, [3.55, 0.35, 0])
        self.play(FadeIn(fond), Create(ecran))
        lignes = VGroup()
        haut = fond.get_top()[1] - 0.45

        def ecrire(num, texte, couleur=WHITE, decalage=0):
            n = Text(str(num) if num else "", font=MONO, font_size=20, color=GREY_B)
            t = self.ligne(texte, 21, couleur)
            y = haut - 0.62 * (len(lignes))
            n.move_to([fond.get_left()[0] + 0.3, y, 0])
            t.next_to([fond.get_left()[0] + 0.55 + decalage, y, 0], RIGHT, buff=0)
            groupe = VGroup(n, t)
            lignes.add(groupe)
            self.play(FadeIn(n), AddTextLetterByLetter(t, time_per_char=0.03))
            return t

        self.au_mot("Ligne 1")
        ecrire(1, "objectif : voir que 12 = 3 × 4")

        self.au_mot("Ligne 2")
        ecrire(2, "titre : 12 billes")
        titre = Text("12 billes", font_size=26, color=WHITE).move_to(ecran.get_top() + DOWN * 0.35)
        self.play(Write(titre))

        self.au_mot("Ligne 3")
        ecrire(3, "billes : 3 x 4")
        self.au_mot("Et les billes apparaissent")
        b = self.billes(3, 4).move_to(ecran.get_center() + UP * 0.15)
        self.play(LaggedStart(*[GrowFromCenter(x) for x in b], lag_ratio=0.08))
        self.au_mot("3 rangées de 4")
        rangees = Text("3 rangées de 4", font_size=22, color=BLEU_CALCUL).next_to(ecran, DOWN, buff=0.2)
        self.play(FadeIn(rangees, shift=UP * 0.1), Indicate(b, color=BLEU_CALCUL, scale_factor=1.1))

        self.au_mot("Ligne 4")
        ecrire(4, "écris : 12 = 3 × 4")
        egalite = Text("12 = 3 × 4", font_size=30, color=WHITE).next_to(b, DOWN, buff=0.22)
        self.play(Write(egalite))

        self.au_mot("Après la barre")
        dis = ecrire(None, "| dis : 12 égale 3 fois 4", ORANGE_RETENUE, decalage=0.4)
        self.au_mot("la phrase que la voix dira")
        sous_titre = Text("12 égale 3 fois 4", font_size=18, color="#DDDDDD").move_to(ecran.get_bottom() + UP * 0.22)
        self.play(FadeIn(sous_titre), Indicate(dis, color=ORANGE_RETENUE))
        self.attendre_voix()

    # ── 03 : la règle « la voix dit, l'écran écrit » ─────────────────────────
    def ecran_regle(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-regle")
        self.titre_ecran("Une règle")

        self.au_mot("ce que la voix dit")
        regle = VGroup(
            Text("ce que la voix dit", font_size=34, color=BLEU_CALCUL),
            Text("=", font_size=40, color=WHITE),
            Text("ce que l'écran écrit", font_size=34, color=VERT_OK),
        ).arrange(RIGHT, buff=0.35).move_to([0, 1.7, 0])
        self.play(FadeIn(regle[0], shift=RIGHT * 0.2))
        self.au_mot("l'écran l'écrit")
        self.play(FadeIn(regle[1]), FadeIn(regle[2], shift=LEFT * 0.2))

        self.au_mot("Si ta voix dit 12")
        voix = self.ligne("dis : j'ai 12 billes", 26, ORANGE_RETENUE).move_to([-3.3, 0.1, 0])
        self.play(FadeIn(voix, shift=UP * 0.1))
        self.au_mot("le 12 doit être à l'écran")
        ecran = self.ecran(3.4, [3.3, 0.1, 0])
        douze = Text("12", font_size=54, color=WHITE).move_to(ecran)
        fleche = Arrow(voix.get_right(), ecran.get_left(), buff=0.25, color=WHITE)
        self.play(Create(ecran), GrowArrow(fleche))
        self.play(Write(douze), Create(self.coche().next_to(ecran, DOWN, buff=0.2)))

        self.au_mot("Sinon")
        alerte = Text("La voix dit 12, mais ce n'est pas écrit à l'écran.", font_size=26, color=ORANGE_RETENUE)
        alerte.move_to([-0.6, -2.4, 0])
        cadre = SurroundingRectangle(alerte, color=ORANGE_RETENUE, buff=0.22, stroke_width=3)
        self.play(FadeIn(alerte, shift=UP * 0.15), Create(cadre))
        self.au_mot("en orange")
        self.play(Indicate(VGroup(alerte, cadre), color=ORANGE_RETENUE, scale_factor=1.05))
        self.attendre_voix()

    # ── 04 : l'aperçu, et la ligne qu'on corrige ─────────────────────────────
    def ecran_apercu(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-apercu")
        self.titre_ecran("L'aperçu")

        self.au_mot("Clique sur Voir l'aperçu")
        bouton = self.bouton("Voir l'aperçu", "#0284C7", icone="lecture").move_to([-3.6, 1.5, 0])
        self.play(GrowFromCenter(bouton))
        self.play(Indicate(bouton, scale_factor=1.12))

        self.au_mot("Ta vidéo se joue")
        ecran = self.ecran(5.4, [3.3, 0.6, 0])
        self.play(Create(ecran))
        titre = Text("12 billes", font_size=24).move_to(ecran.get_top() + DOWN * 0.32)
        b = self.billes(3, 4, rayon=0.11).move_to(ecran.get_center() + UP * 0.1)
        self.play(Write(titre), LaggedStart(*[GrowFromCenter(x) for x in b], lag_ratio=0.06))
        self.au_mot("avec la voix")
        sous_titre = Text("J'ai 12 billes.", font_size=18, color="#DDDDDD").move_to(ecran.get_bottom() + UP * 0.22)
        avec = Text("avec la voix", font_size=24, color=BLEU_CALCUL).next_to(ecran, DOWN, buff=0.2)
        self.play(FadeIn(sous_titre), FadeIn(avec))

        self.au_mot("Quelque chose ne va pas")
        fausse = self.ligne("billes : 3 x 5", 28, ROUGE_ERREUR).move_to([-3.6, -0.4, 0])
        b_faux = self.billes(3, 5, rayon=0.11).move_to(b)
        self.play(FadeIn(fausse), Transform(b, b_faux))
        self.au_mot("Tu corriges la ligne")
        juste = self.ligne("billes : 3 x 4", 28, VERT_OK).move_to(fausse)
        self.play(TransformMatchingShapes(fausse, juste))
        self.au_mot("et tu relances")
        self.play(Indicate(bouton, scale_factor=1.12),
                  Transform(b, self.billes(3, 4, rayon=0.11).move_to(ecran.get_center() + UP * 0.1)))
        self.attendre_voix()

    # ── 05 : se connecter, garder son travail ────────────────────────────────
    def ecran_enregistrer(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-enregistrer")
        self.titre_ecran("Garder ton travail")

        self.au_mot("code établissement")
        code = self.bouton("Code établissement", "#334155", font_size=26).move_to([-3.2, 1.6, 0])
        self.play(GrowFromCenter(code))
        self.au_mot("ou ton e-mail")
        ou = Text("ou", font_size=28).next_to(code, RIGHT, buff=0.45)
        mail = self.bouton("E-mail", "#334155", font_size=26).next_to(ou, RIGHT, buff=0.45)
        self.play(FadeIn(ou), GrowFromCenter(mail))

        self.au_mot("ton script et ta voix")
        dossier = self.panneau(5.2, 2.3, [-1.6, -1.0, 0])
        titre_d = Text("Mes vidéos", font_size=26, color=JAUNE_TITRE).move_to(dossier.get_top() + DOWN * 0.38)
        contenu = VGroup(
            self.ligne("12 billes  —  ton script", 22),
            self.ligne("            —  ta voix", 22, BLEU_CALCUL),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.2).next_to(titre_d, DOWN, buff=0.3)
        self.play(FadeIn(dossier), Write(titre_d))
        self.play(LaggedStart(*[FadeIn(c, shift=RIGHT * 0.2) for c in contenu], lag_ratio=0.4))

        self.au_mot("Toi seul les vois")
        cadenas = self.cadenas(0.75).move_to([3.0, -1.0, 0])
        seul = Text("Toi seul les vois.", font_size=28, color=VERT_OK).next_to(cadenas, DOWN, buff=0.25)
        self.play(GrowFromCenter(cadenas), FadeIn(seul, shift=UP * 0.1))
        self.attendre_voix()

    # ── 06 : sa voix au micro, et ce que le site entend ──────────────────────
    def ecran_ta_voix(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-ta-voix")
        self.titre_ecran("Ta voix")

        self.au_mot("Un micro suffit")
        micro = self.micro(1.5).move_to([-4.6, 1.2, 0])
        lab_micro = Text("un micro", font_size=24).next_to(micro, DOWN, buff=0.2)
        self.play(GrowFromCenter(micro), FadeIn(lab_micro))
        self.au_mot("celui d'un téléphone")
        tel = self.telephone(1.5).move_to([-2.4, 1.2, 0])
        lab_tel = Text("ou un téléphone", font_size=24).next_to(tel, DOWN, buff=0.2)
        self.play(GrowFromCenter(tel), FadeIn(lab_tel))

        self.au_mot("Phrase par phrase")
        phrase = self.ligne("« J'ai 12 billes. »", 24).move_to([2.6, 1.6, 0])
        bouton = self.bouton("M'enregistrer", "#DC2626", font_size=22).next_to(phrase, DOWN, buff=0.3)
        self.play(FadeIn(phrase), GrowFromCenter(bouton))
        self.au_mot("tu t'enregistres")
        point = Dot(color=ROUGE_ERREUR, radius=0.12).next_to(bouton, RIGHT, buff=0.3)
        self.play(FadeIn(point), Flash(point, color=ROUGE_ERREUR))
        self.play(Indicate(point, color=ROUGE_ERREUR, scale_factor=1.5))

        self.au_mot("Le site écrit ce qu'il a entendu")
        entendu = Text("J'ai entendu : « Moi, j'ai 12 billes. »", font_size=26, color=BLEU_CALCUL)
        entendu.move_to([0, -0.9, 0])
        self.play(Write(entendu))

        self.au_mot("Ta phrase s'écrit dans ton script")
        avant = self.ligne("titre : 12 billes | dis : J'ai 12 billes.", 22).move_to([-0.6, -2.3, 0])
        self.play(FadeIn(avant))
        apres = self.ligne("titre : 12 billes | dis : Moi, j'ai 12 billes.", 22, VERT_OK).move_to(avant)
        self.play(TransformMatchingShapes(avant, apres))
        self.attendre_voix()

    # ── 07 : télécharger la vidéo ────────────────────────────────────────────
    def ecran_telecharger(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-telecharger")
        self.titre_ecran("Télécharger ta vidéo")

        self.au_mot("Clique sur Télécharger")
        bouton = self.bouton("Télécharger ma vidéo", "#059669", icone="bas").move_to([-3.4, 1.7, 0])
        self.play(GrowFromCenter(bouton))
        self.play(Indicate(bouton, scale_factor=1.1))

        self.au_mot("Elle se joue une fois")
        ecran = self.ecran(3.6, [-3.4, -0.6, 0])
        self.play(Create(ecran))
        b = self.billes(3, 4, rayon=0.08, buff=0.09).move_to(ecran)
        une_fois = Text("elle se joue une fois", font_size=22, color=WHITE).next_to(ecran, DOWN, buff=0.2)
        self.play(LaggedStart(*[GrowFromCenter(x) for x in b], lag_ratio=0.05), FadeIn(une_fois))

        self.au_mot("le fichier arrive")
        ordi = self.ordinateur(3.2).move_to([3.4, -0.4, 0])
        fichier = self.fichier("12-billes.webm", 1.0).move_to(ecran)
        self.play(Create(ordi))
        self.play(FadeIn(fichier))
        self.play(fichier.animate.move_to(ordi[0].get_center()), run_time=1.2)
        self.au_mot("avec ta voix")
        ondes = self.ondes(fichier[0].get_right() + RIGHT * 0.1, taille=0.18)
        lab_voix = Text("avec ta voix", font_size=24, color=VERT_OK).next_to(ordi, UP, buff=0.3)
        self.play(Create(ondes), FadeIn(lab_voix))

        self.au_mot("Rien à installer")
        rien = self.chute("Rien à installer.", color=VERT_OK, font_size=34)
        self.play(Write(rien))
        self.attendre_voix()

    # ── 08 : explique une notion ─────────────────────────────────────────────
    def ecran_fin(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-fin")

        clap = self.clap(1.2).move_to([-5.9, 2.5, 0])
        self.add(clap)
        expl = Text("Choisis une notion que tu as comprise", font_size=34, color=WHITE).move_to([0.9, 2.4, 0])
        self.play(Write(expl), GrowFromCenter(clap))
        self.au_mot("en 30 secondes")
        trente = Text("explique-la en 30 secondes", font_size=40, color=BLEU_CALCUL).move_to([0, 1.2, 0])
        self.play(GrowFromCenter(trente))
        self.au_mot("avec ta voix")
        voix = Text("avec ta voix", font_size=30, color=WHITE).next_to(trente, DOWN, buff=0.25)
        self.play(FadeIn(voix, shift=UP * 0.1))

        self.au_mot("Si tu sais l'expliquer")
        piege = Text("Si tu sais l'expliquer, tu l'as comprise.", font_size=32, color=ORANGE_RETENUE)
        piege.move_to([0, -0.8, 0])
        cadre = SurroundingRectangle(piege, color=ORANGE_RETENUE, buff=0.25, stroke_width=3)
        self.play(Write(piege), Create(cadre))

        self.au_mot("Les maths, ça sert à rien")
        chute = Text("Les maths, ça sert à rien… sauf à les expliquer.", font_size=32, color=JAUNE_TITRE)
        chute.move_to([-0.4, -2.2, 0])
        url = Text("eleveai.fr/atelier-video", font_size=26, color=BLEU_CALCUL).next_to(chute, DOWN, buff=0.3)
        self.play(Write(chute))
        self.play(FadeIn(url))
        self.attendre_voix(marge=1.0)


class AtelierVideoShort(_Voix6e, _Atelier, ShortSeconde):
    """Le short de l'atelier vidéo — 9:16, ~40 s, finit par une question."""

    nom_voix = "annonce-atelier-video-short"

    def construct(self):
        self.garde()
        self.ecrire()
        self.ta_voix()
        self.telecharger()
        self.question()
        NotionSeconde.page_abonnement(self)

    def garde(self):
        """⛔ L'image à 1 seconde devient la vignette : tout est posé d'emblée,
        sans animation, et tient plus de 1,3 s."""
        self.clear()
        self.margo_bas()
        self.dire("00-garde")
        lignes = VGroup(
            self.grand("Et si c'était", font_size=46, color=WHITE),
            self.grand("TOI", font_size=96, color=JAUNE_TITRE),
            self.grand("qui faisais", font_size=46, color=WHITE),
            self.grand("la vidéo de maths ?", font_size=46, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.28).move_to([0, -0.15, 0])
        clap = self.clap(1.3).move_to([0, 2.75, 0])
        self.add(clap, lignes)
        self.wait(1.4)
        self.play(Indicate(lignes[1], color=JAUNE_TITRE, scale_factor=1.15))
        self.attendre_voix(marge=0.4)

    def ecrire(self):
        self.clear()
        self.margo_bas()
        self.dire("01-ecrire")
        titre = self.grand("Tu écris en français", font_size=36, color=JAUNE_TITRE).move_to([0, 3.0, 0])
        self.play(Write(titre))

        self.au_mot("Écris")
        l1 = self.ligne("écris : 12 = 3 × 4", 26)
        l2 = self.ligne("| dis : 12 égale 3 fois 4", 26, ORANGE_RETENUE)
        fond = self.panneau(4.2, 1.6, [0, 1.65, 0])
        l1.move_to(fond.get_center() + UP * 0.32)
        if l1.width > 3.9:
            l1.scale_to_fit_width(3.9)
        self.play(FadeIn(fond), AddTextLetterByLetter(l1, time_per_char=0.04))
        self.au_mot("Dis")
        l2.move_to(fond.get_center() + DOWN * 0.32)
        if l2.width > 3.9:
            l2.scale_to_fit_width(3.9)
        self.play(AddTextLetterByLetter(l2, time_per_char=0.04))

        self.au_mot("Et c'est à l'écran")
        ecran = self.ecran(4.1, [0, -0.85, 0])
        egalite = Text("12 = 3 × 4", font_size=52, color=WHITE).move_to(ecran.get_center() + UP * 0.15)
        sous_titre = Text("12 égale 3 fois 4", font_size=18, color="#DDDDDD").move_to(ecran.get_bottom() + UP * 0.22)
        self.play(Create(ecran), run_time=0.6)
        self.play(Write(egalite), FadeIn(sous_titre), run_time=0.8)
        # La phrase finit sur « à l'écran » : on laisse l'écran se lire.
        self.attendre_voix(marge=1.8)

    def ta_voix(self):
        self.clear()
        self.margo_bas()
        self.dire("02-ta-voix")
        titre = self.grand("La voix, c'est la tienne", font_size=34, color=JAUNE_TITRE).move_to([0, 3.0, 0])
        self.play(Write(titre))
        self.au_mot("tu parles")
        micro = self.micro(1.6).move_to([0, 1.3, 0])
        ondes = self.ondes(micro[0].get_right() + RIGHT * 0.15, taille=0.22, couleur=BLEU_CALCUL)
        self.play(GrowFromCenter(micro), Create(ondes))
        self.au_mot("le site écrit")
        entendu = VGroup(
            self.grand("J'ai entendu :", font_size=30, color=BLEU_CALCUL),
            self.grand("« 12 égale 3 fois 4 »", font_size=32, color=WHITE),
        ).arrange(DOWN, buff=0.2).move_to([0, -0.8, 0])
        self.play(Write(entendu[0]))
        self.play(AddTextLetterByLetter(entendu[1], time_per_char=0.04))
        self.attendre_voix(marge=0.4)

    def telecharger(self):
        self.clear()
        self.margo_bas()
        self.dire("03-telecharger")
        self.au_mot("Un clic")
        b1 = self.bouton("Voir l'aperçu", "#0284C7", font_size=26, icone="lecture").move_to([0, 2.7, 0])
        un = self.grand("1 clic : l'aperçu", font_size=30, color=WHITE).next_to(b1, DOWN, buff=0.25)
        self.play(GrowFromCenter(b1), FadeIn(un))
        self.au_mot("Un deuxième")
        b2 = self.bouton("Télécharger ma vidéo", "#059669", font_size=24, icone="bas").move_to([0, 0.95, 0])
        if b2.width > 4.2:
            b2.scale_to_fit_width(4.2)
        deux = self.grand("2e clic : ta vidéo", font_size=30, color=WHITE).next_to(b2, DOWN, buff=0.25)
        self.play(GrowFromCenter(b2), FadeIn(deux))
        self.au_mot("Gratuit")
        gratuit = VGroup(
            self.grand("Gratuit", font_size=36, color=VERT_OK),
            self.grand("rien à installer", font_size=30, color=VERT_OK),
        ).arrange(DOWN, buff=0.15).move_to([0, -0.85, 0])
        self.play(GrowFromCenter(gratuit[0]), FadeIn(gratuit[1]))
        self.au_mot("eleveai.fr")
        url = self.grand("eleveai.fr/atelier-video", font_size=30, color=BLEU_CALCUL).move_to([0, -2.0, 0])
        self.play(Write(url), Create(SurroundingRectangle(url, color=BLEU_CALCUL, buff=0.15)))
        self.attendre_voix(marge=0.5)

    def question(self):
        """⛔ La dernière phrase est une question, écrite, puis « Réponds en commentaire »."""
        self.clear()
        self.margo_bas()
        self.dire("04-question")
        q = VGroup(
            self.grand("Et toi,", font_size=44, color=JAUNE_TITRE),
            self.grand("quelle notion", font_size=40, color=WHITE),
            self.grand("tu expliquerais", font_size=40, color=WHITE),
            self.grand("en 30 secondes ?", font_size=40, color=BLEU_CALCUL),
        ).arrange(DOWN, buff=0.25).move_to([0, 1.5, 0])
        self.play(LaggedStart(*[FadeIn(m, shift=UP * 0.12) for m in q], lag_ratio=0.25))
        self.au_mot("Réponds en commentaire")
        rep = self.grand("Réponds en commentaire", font_size=34, color=VERT_OK).move_to([0, -1.1, 0])
        cadre = SurroundingRectangle(rep, color=VERT_OK, buff=0.2, stroke_width=3)
        self.play(GrowFromCenter(rep), Create(cadre))
        self.attendre_voix(marge=1.2)
