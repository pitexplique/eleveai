# pythagore_defi_cube.py
# EleveAI — Maths 4e — Pythagore, le DÉFI : combien de triangles rectangles dans un cube ?
# (notionId : pythagore_theoreme, micro : pythagore_defi), AVEC VOIX. CEINTURE ORANGE.
#
# ⭐ « Fais-les dessiner rapidement » : 0,2 s par triangle (0,5 pour les 4 premiers).
# ⭐ Frédéric, 13/10/2026 : « tu dessines un cube avec ses lettres, puis tu dessines
# en rouge un triangle, puis l'autre, en effaçant les précédents, avec un compteur en
# bas, sans tous les nommer ; ne dis pas à haute voix tous les triangles ».
# Les comptes, vérifiés par le calcul : 56 triangles = 24 sur les faces (1, 1, 2)
# + 24 en biais (1, 2, 3) + 8 équilatéraux (2, 2, 2).
#
# ⭐ 31/10/2026 : refonte « questions-pauses » (manim/questions-pythagore.md, Ép. 8) :
# paysage Q1 entre 01-cube et 02-faces (4 par face), Q2 entre 03-biais et 04-total (48),
# compte à rebours de 5 s, le cube reste à gauche pendant la question ; fin du 19/10 ;
# short : 1 question-pause après 01-image (3 s). Module commun : pythagore_pauses.py.
# Marques mot à mot : 4e-pythagore-defi-cube[-short].marques.json (ici). Avant tout rendu :
#   AUDIT=1 BORDS=1 python -m manim render --dry_run manim/scripts/4e/pythagore_defi_cube.py DefiCube4e
#   AUDIT=1 BORDS=1 python -m manim render --dry_run -r 1080,1920 manim/scripts/4e/pythagore_defi_cube.py DefiCubeShort4e
#
# Deux scènes : la paysage (la correction) et le short (la question seule, publié AVANT).
# Voix : manim/voix/4e-pythagore-defi-cube.json et 4e-pythagore-defi-cube-short.json.
# Rendu paysage : python -m manim render -qh --disable_caching manim/scripts/4e/pythagore_defi_cube.py DefiCube4e -o eleveai-maths-4e-pythagore-defi-cube --media_dir manim/scripts/4e/media
# Rendu short   : python -m manim render -qh -r 1080,1920 --disable_caching manim/scripts/4e/pythagore_defi_cube.py DefiCubeShort4e -o eleveai-maths-4e-pythagore-defi-cube-short --media_dir manim/scripts/4e/media
# Puis copier les mp4 dans manim/sorties/4e/maths/pythagore/08-defi-cube/.

import sys
from itertools import combinations
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent))

from pythagore_reconnaitre import P, Notion4e  # noqa: E402  (pose les chemins)

from manim import *  # noqa: E402

from charte import *  # noqa: E402
from gabarit_sixieme import Short6e  # noqa: E402
from signes_expression_2de import echelle_ceintures  # noqa: E402
from pythagore_pauses import PausesPaysage, PausesShort, sans_audit  # noqa: E402

ROUGE_TRI = "#EF4444"
SOMMETS = {"A": (0, 0, 0), "B": (1, 0, 0), "C": (1, 1, 0), "D": (0, 1, 0),
           "E": (0, 0, 1), "F": (1, 0, 1), "G": (1, 1, 1), "H": (0, 1, 1)}
ARETES = ["AB", "BC", "CD", "DA", "EF", "FG", "GH", "HE", "AE", "BF", "CG", "DH"]
CACHEES = {"CD", "DA", "DH"}  # les arêtes qui partent de D, le sommet du fond
FACES = ["ABCD", "EFGH", "ABFE", "BCGF", "CDHG", "DAEH"]


def d2(p, q):
    return sum((SOMMETS[p][i] - SOMMETS[q][i]) ** 2 for i in range(3))


def type_triangle(t):
    return tuple(sorted([d2(t[0], t[1]), d2(t[1], t[2]), d2(t[0], t[2])]))


def familles():
    """Les triangles des faces (rangés face par face), en biais (ABG d'abord), équilatéraux."""
    faces = []
    for f in FACES:
        for t in combinations(f, 3):
            faces.append("".join(t))
    tous = ["".join(t) for t in combinations("ABCDEFGH", 3)]
    biais = [t for t in tous if type_triangle(t) == (1, 2, 3)]
    biais.sort(key=lambda t: t != "ABG")
    equi = [t for t in tous if type_triangle(t) == (2, 2, 2)]
    assert len(faces) == 24 and len(biais) == 24 and len(equi) == 8
    return faces, biais, equi


class _Cube:
    """Le cube ABCDEFGH en perspective cavalière (fuyantes à 45°, coefficient 0,45)."""

    def pt(self, nom):
        x, y, z = SOMMETS[nom]
        return self.origine + self.arete * np.array([x + 0.45 * y * 0.71, z + 0.45 * y * 0.71, 0])

    def dessiner_cube(self, font_size=30):
        traits = VGroup()
        for a in ARETES:
            p, q = self.pt(a[0]), self.pt(a[1])
            if a in CACHEES or a[::-1] in CACHEES:
                traits.add(DashedLine(p, q, color=GRAY_B, stroke_width=3, dash_length=0.12))
            else:
                traits.add(Line(p, q, color=WHITE, stroke_width=4))
        centre = sum(self.pt(n) for n in SOMMETS) / 8
        lettres = VGroup()
        for n in SOMMETS:
            d = self.pt(n) - centre
            lettres.add(Text(n, font_size=font_size).move_to(self.pt(n) + d / np.linalg.norm(d) * 0.32))
        return traits, lettres

    def tri(self, t, couleur=ROUGE_TRI):
        return Polygon(*[self.pt(n) for n in t], color=couleur, stroke_width=6,
                       fill_color=couleur, fill_opacity=0.35)


class DefiCube4e(PausesPaysage, _Cube, Notion4e):
    nom_voix = "4e-pythagore-defi-cube"

    def t(self, texte, font_size=34, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def compteur(self, n, libelle="triangles rectangles", couleur=ROUGE_TRI, x=-3.4, taille=64):
        # (31/10) le compteur se LIT (il n'est pas dit nombre par nombre) : hors audit.
        return sans_audit(VGroup(self.t(str(n), taille, couleur), self.t(libelle, 30, couleur))
                          .arrange(RIGHT, buff=0.3).move_to(P(x, -3.1)))  # 31/10 : marge du bas

    def defiler(self, triangles, debut, duree, couleur=ROUGE_TRI, libelle="triangles rectangles", x=-3.4):
        """Chaque triangle remplace le précédent ; le compteur avance d'un cran."""
        for k, t in enumerate(triangles):
            nouveau = self.tri(t, couleur)
            anims = [FadeIn(nouveau),
                     Transform(self.cpt, self.compteur(debut + k, libelle, couleur, x=x, taille=(48 if x > 0 else 64)))]
            if self.courant is not None:
                anims.append(FadeOut(self.courant))
            self.play(*anims, run_time=duree)
            self.courant = nouveau

    # ── 00 : page de garde ──────────────────────────────────────────────────

    def page_de_garde(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")
        titre = self.t("Le défi du cube", 60, JAUNE_TITRE).to_edge(UP, buff=0.7)
        identite = self.t(self.identite, 28).next_to(titre, DOWN, buff=0.25)
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2))
        self.au_mot("combien de triangles")
        q1 = self.t("Combien de triangles rectangles", 40, BLEU_CALCUL)
        q2 = self.t("dans un cube ?", 40, BLEU_CALCUL)
        VGroup(q1, q2).arrange(DOWN, buff=0.2).move_to(P(0, 0.4))
        self.play(FadeIn(q1, shift=UP * 0.2))
        self.play(FadeIn(q2, shift=UP * 0.2))
        self.au_mot("Mets pause")
        self.play(FadeIn(self.t("Mets pause, et compte !", 34, ORANGE_RETENUE).move_to(P(0, -0.8))))
        self.play(FadeIn(echelle_ceintures("orange").move_to(P(-0.6, -2.4))))
        self.attendre_voix(marge=1.5)

    # ── (31/10) les questions-pauses : le cube reste à gauche, la question à droite ─

    def remettre_cube(self, traits, lettres, *autres):
        """Après une question (écran effacé) : le cube revient tel qu'il était."""
        self.clear()
        self.add_mascotte(scale=0.45)
        self.add(traits, lettres, *autres)

    def question_etroite(self, *a, **k):
        """La colonne de la question un peu plus étroite (x = 2,6, largeur 5,6) : la phrase
        verte ne passe pas sur Ti-Margo. Réglage d'instance ; le module commun n'est pas touché."""
        self.LARG = 5.6
        try:
            return self.ecran_question(*a, x_col=2.6, **k)
        finally:
            del self.LARG

    def question_face(self, traits, lettres):
        self.question_etroite("01q-question", "01r-reponse",
                            ["Sur une seule face carrée,", "combien de triangles", "rectangles ?"],
                            ["2", "4", "6"], 1, ["On enlève un sommet sur quatre :", "4 façons."],
                            figure=VGroup(traits, lettres))
        self.remettre_cube(traits, lettres)

    def question_total(self, traits, lettres):
        self.question_etroite("03q-question", "03r-reponse",
                            ["Alors, combien de triangles", "rectangles en tout ?"],
                            ["24", "48", "56"], 1, [], figure=VGroup(traits, lettres))
        self.remettre_cube(traits, lettres, self.cpt)

    # ── le déroulé sur UN même écran : le cube reste, les triangles défilent ─

    def construct(self):
        self.page_de_garde()

        self.clear()
        self.add_mascotte(scale=0.45)
        self.origine, self.arete = P(-6.0, -2.1), 3.0
        traits, lettres = self.dessiner_cube()
        faces, biais, equi = familles()
        self.courant = None
        self.cpt = self.compteur(0)
        xr = 2.9

        # 01 : le cube — (31/10) le cube et ses lettres ensemble : « On choisit » arrive vite
        self.dire("01-cube")
        self.play(Create(traits), FadeIn(lettres), run_time=1.2)
        self.au_mot("On choisit trois")
        exemple = self.tri("ACH", BLEU_CALCUL)
        self.play(FadeIn(exemple))
        self.play(FadeOut(exemple))
        self.au_mot("Combien de ces triangles")
        q = self.t("Combien ont un angle droit ?", 34, BLEU_CALCUL).move_to(P(xr, 2.2))
        self.play(FadeIn(q))
        self.attendre_voix()
        self.question_face(traits, lettres)

        # 02 : les faces — (31/10) chaque nombre À SON MOT (marques) ; la numérotation
        # « 1. » et « 2 arêtes + 1 diagonale » (dites « Première », « deux… une ») hors audit.
        self.dire("02-faces")
        panneau1 = VGroup(sans_audit(self.t("1. Sur les faces", 38, JAUNE_TITRE).move_to(P(xr, 2.2))))
        self.play(FadeIn(panneau1[0]), FadeIn(self.cpt))
        self.au_mot("deux arêtes et une diagonale")
        panneau1.add(sans_audit(self.t("2 arêtes + 1 diagonale de face", 28).move_to(P(xr, 1.5))))
        self.play(FadeIn(panneau1[1]))
        self.au_mot("Une face en contient 4")
        self.defiler(faces[:3], 1, 0.3)
        self.au_nb("contient 4")
        panneau1.add(self.t("4 par face", 30, ROUGE_TRI).move_to(P(xr, 0.8)))
        self.play(FadeIn(panneau1[2]), run_time=0.3)
        self.defiler(faces[3:4], 4, 0.3)
        six, fois4, egal = (self.t(x, 44, ROUGE_TRI) for x in ("6", "× 4", "= 24"))
        VGroup(six, fois4, egal).arrange(RIGHT, buff=0.2).move_to(P(xr, 0.0))
        panneau1.add(six, fois4, egal)
        self.au_nb("Le cube a 6")
        self.defiler(faces[4:10], 5, 0.12)
        self.au_mot("6 fois 4")
        self.play(FadeIn(six), run_time=0.2)
        self.au_nb("6 fois 4")
        self.play(FadeIn(fois4), run_time=0.2)
        self.defiler(faces[10:17], 11, 0.1)
        self.au_nb("4, 24")
        self.play(FadeIn(egal), run_time=0.25)
        self.defiler(faces[17:], 18, 0.1)
        self.attendre_voix()

        # 03 : en biais — le panneau des faces se range en une ligne de résumé (rappel : hors audit)
        self.dire("03-biais")
        resume1 = sans_audit(self.t("sur les faces : 24", 28, ROUGE_TRI).move_to(P(xr, 2.75)))
        self.play(FadeOut(self.courant), ReplacementTransform(panneau1, resume1))
        self.courant = None
        panneau2 = VGroup(sans_audit(self.t("2. En biais", 38, JAUNE_TITRE).move_to(P(xr, 2.05))))
        self.play(FadeIn(panneau2[0]))
        self.au_mot("Une arête, une diagonale de face")
        panneau2.add(sans_audit(self.t("1 arête + 1 diagonale de face", 26).move_to(P(xr, 1.45))),
                     sans_audit(self.t("+ 1 grande diagonale", 26).move_to(P(xr, 1.0))))
        self.play(FadeIn(panneau2[1]))
        self.au_mot("et la grande diagonale")
        self.play(FadeIn(panneau2[2]))
        self.au_mot("Par exemple ABG")
        abg = self.tri("ABG")
        self.play(FadeIn(abg), Transform(self.cpt, self.compteur(25)))
        self.au_mot("perpendiculaire à toute la face")
        face = Polygon(*[self.pt(n) for n in "BCGF"], stroke_width=0, fill_color=BLEU_CALCUL, fill_opacity=0.25)
        ab = Line(self.pt("A"), self.pt("B"), color=BLEU_CALCUL, stroke_width=8)
        self.play(FadeIn(face), Create(ab))
        self.au_mot("l'angle en B est droit")
        rond = Circle(radius=0.3, color=BLEU_CALCUL, stroke_width=5).move_to(self.pt("B"))
        self.play(Create(rond), FadeIn(self.t("angle droit en B", 28, BLEU_CALCUL).move_to(P(xr, 0.3))))
        # (31/10) la vérification morceau par morceau, chaque nombre quand il est dit
        ag = self.t("AG² = 3", 32, ORANGE_RETENUE)
        ab2, un1, plus2, eg3 = (self.t(x, 32, BLEU_CALCUL) for x in ("AB² + BG²", "= 1", "+ 2", "= 3"))
        l2 = VGroup(ab2, un1, plus2, eg3).arrange(RIGHT, buff=0.15)
        VGroup(ag, l2).arrange(DOWN, buff=0.15).move_to(P(xr, -0.7))
        self.au_nb("vaut 3")
        self.play(FadeIn(ag), run_time=0.3)
        self.au_mot("et AB au carré")
        self.play(FadeIn(ab2), run_time=0.3)
        self.au_mot("1 plus 2")
        self.play(FadeIn(un1), run_time=0.2)
        self.au_nb("1 plus 2")
        self.play(FadeIn(plus2), run_time=0.2)
        self.au_nb("aussi 3")
        self.play(FadeIn(eg3), run_time=0.3)
        self.au_mot("Il y en a 24")
        self.play(FadeOut(face), FadeOut(rond), FadeOut(ab), run_time=0.4)
        self.courant = abg
        self.defiler(biais[1:], 26, 0.15)
        self.attendre_voix()
        self.courant = None
        self.question_total(traits, lettres)  # (31/10) l'écran est effacé : le panneau de droite est vide

        # 04 : le total — (31/10) chaque 24, puis le 48, à son mot
        self.dire("04-total")
        f24, b24 = self.t("sur les faces : 24", 34, ROUGE_TRI), self.t("en biais : 24", 34, ROUGE_TRI)
        somme, e48 = self.t("24 + 24", 56, VERT_OK), self.t("= 48", 56, VERT_OK)
        total = VGroup(somme, e48).arrange(RIGHT, buff=0.25)
        bilan = VGroup(f24, b24, total).arrange(DOWN, buff=0.35).move_to(P(xr, 0.8))
        self.au_nb("faces, 24")  # (01/11) la voix dit aussi « sur les faces », « en biais »
        self.play(FadeIn(f24), run_time=0.3)
        self.au_nb("biais, 24")
        self.play(FadeIn(b24), run_time=0.3)
        self.au_nb("24 plus 24")
        self.play(FadeIn(somme), run_time=0.3)
        self.au_nb("24 : 48")
        self.play(Write(e48), self.cpt.animate.scale(1.15), run_time=0.5)
        self.play(Circumscribe(total, color=VERT_OK))
        self.attendre_voix()

        # 05 : le piège, les équilatéraux — leur compteur à droite, l'autre reste à 48
        self.dire("05-piege")
        self.play(FadeOut(f24), FadeOut(b24), total.animate.scale(0.6).move_to(P(xr, 2.6)))
        self.au_mot("trois diagonales de faces")
        self.cpt_rect = self.cpt
        self.cpt = self.compteur(0, "équilatéraux", ORANGE_RETENUE, x=3.4, taille=48)
        self.play(FadeIn(self.cpt), run_time=0.3)
        self.defiler(equi[:4], 1, 0.3, couleur=ORANGE_RETENUE, libelle="équilatéraux", x=3.4)
        self.au_mot("aucun angle droit")
        self.play(FadeIn(self.t("équilatéral : aucun angle droit", 30, ORANGE_RETENUE).move_to(P(xr, 1.4))),
                  run_time=0.4)
        self.defiler(equi[4:], 5, 0.25, couleur=ORANGE_RETENUE, libelle="équilatéraux", x=3.4)
        e56, e48b, e8 = (self.t(x, 52, JAUNE_TITRE) for x in ("56", "= 48", "+ 8"))
        VGroup(e56, e48b, e8).arrange(RIGHT, buff=0.2).move_to(P(xr, 0.2))
        self.au_nb("En tout, 56")
        self.play(FadeOut(self.courant), FadeIn(e56), run_time=0.3)
        self.au_nb("48 rectangles")
        self.play(FadeIn(e48b), run_time=0.3)
        self.au_nb("et 8")
        self.play(FadeIn(e8), run_time=0.3)
        self.attendre_voix()

        # 06 : la fin
        self.dire("06-fin")
        # (31/10) les deux compteurs s'effacent : la phrase du bas passait dessus
        self.play(FadeOut(self.cpt), FadeOut(self.cpt_rect), run_time=0.3)
        self.play(Write(self.chute("Tu en avais trouvé combien ? Dis-le en commentaire !", color=VERT_OK, font_size=30)))
        self.attendre_voix(marge=1.0)
        self.page_abonnement(voix="07-abonne")


class DefiCubeShort4e(PausesShort, _Cube, Short6e):
    nom_voix = "4e-pythagore-defi-cube-short"

    def construct(self):
        self.margo_bas()
        self.dire("00-accroche")
        # (01/11) l'ÉCHELLE ENTIÈRE des ceintures sous le titre (REGLES.md, 13/10), pas le badge seul ;
        # titre un peu plus haut : l'échelle ne touche ni lui, ni la question, ni le cube.
        titre = self.grand("Le défi du cube", font_size=44, color=JAUNE_TITRE).move_to(P(0, 3.15))
        badge = echelle_ceintures("orange").scale_to_fit_width(config.frame_width * 0.7)
        badge.next_to(titre, DOWN, buff=0.16)
        q = self.grand("Combien de triangles rectangles ?", font_size=26, color=BLEU_CALCUL)
        q.next_to(badge, DOWN, buff=0.16)
        self.play(FadeIn(titre), FadeIn(badge), run_time=0.8)
        self.au_mot("Combien")
        self.play(FadeIn(q))
        self.attendre_voix(marge=0.2)

        # ⭐ Frédéric, 13/10 : « dans le short, tableau en bas » (règle du short blanc :
        # l'image en haut, les maths qui se remplissent en bas, en même temps).
        self.dire("01-image")
        self.play(FadeOut(q), run_time=0.3)
        self.origine, self.arete = P(-0.9, -0.3), 1.5
        traits, lettres = self.dessiner_cube(font_size=22)
        # Le tableau : « triangle | angle droit ? », trois lignes vides.
        x0, x1, x2 = -1.5, 0.2, 1.7
        ys = [-1.0, -1.42, -1.84, -2.26]
        cadre = VGroup(*[Line(P(x0, y + 0.21), P(x2, y + 0.21), color=GRAY_B, stroke_width=2) for y in ys],
                       Line(P(x0, ys[-1] - 0.21), P(x2, ys[-1] - 0.21), color=GRAY_B, stroke_width=2),
                       Line(P(x0, ys[0] + 0.21), P(x0, ys[-1] - 0.21), color=GRAY_B, stroke_width=2),
                       Line(P(x1, ys[0] + 0.21), P(x1, ys[-1] - 0.21), color=GRAY_B, stroke_width=2),
                       Line(P(x2, ys[0] + 0.21), P(x2, ys[-1] - 0.21), color=GRAY_B, stroke_width=2))
        entete = VGroup(Text("triangle", font_size=16, color=JAUNE_TITRE).move_to(P((x0 + x1) / 2, ys[0])),
                        Text("angle droit ?", font_size=16, color=JAUNE_TITRE).move_to(P((x1 + x2) / 2, ys[0])))
        self.au_mot("Un cube")
        self.play(Create(traits), FadeIn(lettres), Create(cadre), FadeIn(entete), run_time=1.2)
        courant = None
        for k, (mot, t, verdict, coul) in enumerate([("Trois sommets", "ABC", "✓ oui", VERT_OK),
                                                     ("Celui-là aussi", "ABG", "✓ oui", VERT_OK),
                                                     ("Et celui-là", "ACF", "?", ORANGE_RETENUE)]):
            self.au_mot(mot)
            tri = self.tri(t)
            y = ys[k + 1]
            nom = Text(t, font_size=24, color=ROUGE_TRI).move_to(P((x0 + x1) / 2, y))
            rep = Text(verdict, font_size=24, color=coul).move_to(P((x1 + x2) / 2, y))
            anims = [FadeIn(tri), FadeIn(nom)]
            if courant is not None:
                anims.append(FadeOut(courant))
            self.play(*anims, run_time=0.5)
            self.play(FadeIn(rep, scale=1.4), run_time=0.4)
            courant = tri
        self.attendre_voix(marge=0.6)

        # ── 01q : la question-pause (3 s) ──
        self.ecran_question("01q-question", "01r-reponse",
                            ["Trois sommets d'une même face,", "comme A, B et C.", "Le triangle a-t-il un angle droit ?"],
                            ["oui, en B", "non", "oui, en A"], 0, ["AB et BC sont deux arêtes", "de la face."])

        self.clear()
        self.margo_bas()
        self.dire("02-question")
        self.origine, self.arete = P(-0.75, -0.05), 1.3
        traits, lettres = self.dessiner_cube(font_size=20)
        self.add(traits, lettres)
        # (31/10) « Combien » est le premier mot : titre et question paraissent ensemble
        self.au_mot("Combien de triangles")
        self.play(Write(self.grand("À toi !", font_size=52, color=JAUNE_TITRE).move_to(P(0, 2.8))),
                  FadeIn(self.grand("Combien de triangles", font_size=32, color=BLEU_CALCUL).move_to(P(0, -0.75))),
                  FadeIn(self.grand("rectangles dans un cube ?", font_size=32, color=BLEU_CALCUL).move_to(P(0, -1.2))),
                  run_time=0.8)
        self.au_mot("Réponds en commentaire")
        rep = VGroup(self.grand("en commentaire !", font_size=34, color=VERT_OK),
                     sans_audit(self.grand("@eleveai974", font_size=34, color=BLEU_CALCUL))).arrange(DOWN, buff=0.12)
        self.play(FadeIn(rep.move_to(P(0, -2.0))))
        self.attendre_voix(marge=1.5)
