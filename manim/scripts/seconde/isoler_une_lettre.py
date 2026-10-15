# isoler_une_lettre.py
# EleveAI — Maths seconde, 1re et STMG — Isoler une lettre dans une formule, AVEC VOIX.
# Micros : seconde expr_exprimer_variable ; 1re/STMG auto_alg_isoler_variable.
#
# ⭐ 12/10/2026 : paysage 5 du fil « calcul littéral », sur le modèle du TVI
# (image vécue avant la règle). Ouverture CHOISIE par Frédéric : « une formule
# qui en contient trois » (il doute du « Les maths, ça sert à rien… »).
# Voix validée : manim/voix/seconde-isoler-une-lettre.json (débit −4).
# ⚠️ 2 km et 1,5 km/h sont dits « disons » : ce n'est pas une mesure du sentier.
#
# Rendu : python -m manim render -qh --disable_caching manim/scripts/seconde/isoler_une_lettre.py IsolerUneLettre -o eleveai-maths-seconde-isoler-une-lettre --media_dir manim/scripts/seconde/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from gabarit_sixieme import Notion6e

OBJECTIFS = [
    "Lire une formule et isoler une lettre",
    "Éviter le piège, en vérifiant les unités",
    "Isoler en deux étapes",
]


class NotionLycee(Notion6e):
    identite = "Maths seconde, 1re et STMG — EleveAI"


class IsolerUneLettre(NotionLycee):
    nom_voix = "seconde-isoler-une-lettre"

    def t(self, texte, font_size=36, color=WHITE):
        return Text(texte, font_size=font_size, color=color)

    def barrer(self, mob, color=ROUGE_ERREUR):
        return Line(mob.get_corner(DL) + LEFT * 0.06, mob.get_corner(UR) + RIGHT * 0.06,
                    stroke_width=5, color=color)

    def montagne(self):
        sol = Line([-6.4, -1.8, 0], [-1.6, -1.8, 0], color=GRAY_B, stroke_width=3)
        mont = Polygon([-6.2, -1.8, 0], [-3.9, 1.2, 0], [-1.8, -1.8, 0], color=VERT_OK,
                       fill_color=VERT_OK, fill_opacity=0.25, stroke_width=3)
        soleil = Circle(radius=0.35, color=JAUNE_TITRE, fill_color=JAUNE_TITRE, fill_opacity=0.9).move_to([-2.2, 1.6, 0])
        sommet = Dot([-3.9, 1.2, 0], color=WHITE, radius=0.08)
        marcheur = Dot([-5.1, -0.35, 0], color=BLEU_CALCUL, radius=0.12)
        return VGroup(sol, mont, soleil, sommet), marcheur

    # ── 00 ──────────────────────────────────────────────────────────────────

    def page_de_garde(self, voix="00-garde"):
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire(voix)
        titre = self.t("Une formule = 3 formules", 54, JAUNE_TITRE).to_edge(UP, buff=0.55)
        identite = self.t(self.identite, 26).next_to(titre, DOWN, buff=0.25)
        f = self.t("d = v × t", 96, BLEU_CALCUL).move_to([-0.6, 1.0, 0])
        self.play(Write(titre), FadeIn(identite, shift=DOWN * 0.2), FadeIn(f))
        self.au_mot("Tu en connais trois")
        self.play(FadeIn(self.t("trois formules en une :", 34, ORANGE_RETENUE).move_to([-0.6, -0.1, 0])))
        trois = VGroup()
        for mot, txt, x in [("une pour la distance", "d = v × t", -4.2), ("une pour la vitesse", "v = d ÷ t", -0.6),
                            ("une pour le temps", "t = d ÷ v", 3.0)]:
            self.au_mot(mot)
            e = self.t(txt, 40, VERT_OK).move_to([x, -0.9, 0])
            self.play(FadeIn(e, shift=UP * 0.15))
            trois.add(e)
        self.au_mot("Encore faut-il")
        self.play(Write(self.chute("Encore faut-il savoir les sortir.", color=JAUNE_TITRE, font_size=34)))
        self.attendre_voix()

    # ── 01 ──────────────────────────────────────────────────────────────────

    def ecran_formule(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-formule")
        self.titre_ecran("1. Une formule, trois lettres")
        f = self.t("d = v × t", 80, BLEU_CALCUL).move_to([-0.6, 1.6, 0])
        self.play(Write(f))
        self.au_mot("la distance égale")
        self.play(FadeIn(self.t("distance = vitesse × temps", 36).move_to([-0.6, 0.5, 0])))
        self.au_mot("Si on connaît deux")
        self.play(FadeIn(self.t("2 lettres connues  →  la 3e se calcule", 34, VERT_OK).move_to([-0.6, -0.4, 0])))
        self.au_mot("À condition de savoir isoler")
        self.play(Write(self.chute("À condition de savoir ISOLER la lettre cherchée.", color=JAUNE_TITRE)))
        self.attendre_voix()

    # ── 02 ──────────────────────────────────────────────────────────────────

    def ecran_isoler(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-isoler")
        self.titre_ecran("2. Isoler t")
        decor, marcheur = self.montagne()
        self.play(FadeIn(decor))
        self.au_mot("Disons qu'il te reste")
        self.play(FadeIn(marcheur), FadeIn(self.t("d = 2 km", 32).move_to([-4.0, -2.25, 0])))
        self.au_mot("1,5 kilomètre par heure")
        self.play(FadeIn(self.t("v = 1,5 km/h", 32).move_to([-4.0, -2.8, 0])),
                  marcheur.animate.move_to([-4.3, 0.7, 0]), run_time=1.2)
        x = 2.4
        self.au_mot("On cherche t")
        self.play(FadeIn(self.t("t = ?", 46, ORANGE_RETENUE).move_to([x, 2.0, 0])))
        self.au_mot("t est multiplié par v")
        self.play(FadeIn(self.t("d = v × t", 44, BLEU_CALCUL).move_to([x, 1.15, 0])))
        self.au_mot("on divise les deux côtés")
        self.play(FadeIn(self.t("÷ v des deux côtés", 32, ORANGE_RETENUE).move_to([x, 0.45, 0])))
        self.au_mot("t égale d divisé par v")
        self.play(FadeIn(self.t("t = d ÷ v", 50, VERT_OK).move_to([x, -0.3, 0])))
        self.au_mot("2 divisé par 1,5")
        self.play(FadeIn(self.t("2 ÷ 1,5 ≈ 1,33 h", 40).move_to([x, -1.1, 0])))
        self.au_mot("Une heure et vingt")
        self.play(GrowFromCenter(self.t("≈ 1 h 20 min", 48, VERT_OK).move_to([x, -1.9, 0])))
        self.attendre_voix()

    # ── 03 ──────────────────────────────────────────────────────────────────

    def ecran_heure(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-heure")
        self.titre_ecran("3. L'heure du réveil")
        self.au_mot("Si le soleil se lève")
        self.play(FadeIn(self.t("lever du soleil :  6 h 00", 46, JAUNE_TITRE).move_to([-0.6, 1.4, 0])))
        self.play(FadeIn(self.t("montée :  − 1 h 20", 46).move_to([-0.6, 0.4, 0])))
        self.au_mot("tu pars à 4 heures 40")
        self.play(GrowFromCenter(self.t("départ :  4 h 40", 64, VERT_OK).move_to([-0.6, -0.8, 0])))
        self.attendre_voix()

    # ── 04 ──────────────────────────────────────────────────────────────────

    def ecran_methode(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-methode")
        self.titre_ecran("4. La méthode")
        self.au_mot("On regarde ce qu'on fait subir")
        self.play(FadeIn(self.t("1. Que fait-on subir à la lettre ?", 38).move_to([-0.6, 1.6, 0])))
        self.au_mot("on le défait des deux côtés")
        self.play(FadeIn(self.t("2. On le défait des DEUX côtés", 38).move_to([-0.6, 0.7, 0])))
        self.au_mot("avec l'opération inverse")
        self.play(FadeIn(self.t("× ↔ ÷      + ↔ −", 50, ORANGE_RETENUE).move_to([-0.6, -0.2, 0])))
        self.au_mot("C'est exactement résoudre")
        self.play(Write(self.chute("= résoudre une équation, avec des lettres.", color=VERT_OK)))
        self.attendre_voix()

    # ── 05 ──────────────────────────────────────────────────────────────────

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-piege")
        self.titre_ecran("5. Le piège classique")
        faux = self.t("v = d × t", 70, ORANGE_RETENUE).move_to([-0.6, 1.6, 0])
        self.play(FadeIn(faux))
        self.au_mot("Faux")
        self.play(Create(self.barrer(faux)))
        self.au_mot("Vérifie avec les unités")
        self.play(FadeIn(self.t("km × h  ≠  km/h", 56).move_to([-0.6, 0.4, 0])))
        self.au_mot("La bonne formule")
        self.play(GrowFromCenter(self.t("v = d ÷ t", 72, VERT_OK).move_to([-0.6, -0.9, 0])))
        self.attendre_voix()

    # ── 06 ──────────────────────────────────────────────────────────────────

    def ecran_deux_etapes(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-deux-etapes")
        self.titre_ecran("6. En deux étapes")
        self.au_mot("Un prix payé")
        self.play(Write(self.t("P = H × 1,2 + 5", 56, BLEU_CALCUL).move_to([-0.6, 2.0, 0])))
        self.au_mot("H, c'est le prix hors taxe")
        self.play(FadeIn(self.t("H : prix hors taxe     5 € : livraison", 30, GRAY_B).move_to([-0.6, 1.3, 0])))
        self.au_mot("D'abord, on enlève 5")
        self.play(FadeIn(self.t("1)  − 5 :", 36, ORANGE_RETENUE).move_to([-4.6, 0.4, 0])),
                  FadeIn(self.t("P − 5 = H × 1,2", 44).move_to([0.2, 0.4, 0])))
        self.au_mot("Puis on divise par 1,2")
        self.play(FadeIn(self.t("2)  ÷ 1,2 :", 36, ORANGE_RETENUE).move_to([-4.6, -0.5, 0])),
                  FadeIn(self.t("H = (P − 5) ÷ 1,2", 46, VERT_OK).move_to([0.4, -0.5, 0])))
        self.au_mot("On défait la dernière opération")
        self.play(Write(self.chute("On défait la DERNIÈRE opération en premier.", color=JAUNE_TITRE)))
        self.attendre_voix()

    # ── 07 ──────────────────────────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("07-defi")
        self.play(Write(self.t("À toi de jouer", 46, JAUNE_TITRE).to_edge(UP)))
        self.au_mot("Le périmètre d'un rectangle")
        self.play(GrowFromCenter(self.t("P = 2(L + l)", 90, BLEU_CALCUL).move_to([-0.6, 1.0, 0])))
        self.au_mot("Isole L")
        self.play(FadeIn(self.t("Isole L.", 50).move_to([-0.6, -0.4, 0])))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=36)))
        self.attendre_voix(marge=2.0)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("07b-correction")
        self.titre_ecran("Correction")
        self.play(FadeIn(self.t("P = 2(L + l)", 50, BLEU_CALCUL).move_to([-0.6, 2.0, 0])))
        self.au_mot("on divise par 2")
        self.play(FadeIn(self.t("÷ 2 :", 36, ORANGE_RETENUE).move_to([-4.4, 1.1, 0])),
                  FadeIn(self.t("P ÷ 2 = L + l", 44).move_to([0.0, 1.1, 0])))
        self.au_mot("Puis on enlève l")
        self.play(FadeIn(self.t("− l :", 36, ORANGE_RETENUE).move_to([-4.4, 0.2, 0])),
                  FadeIn(self.t("L = P ÷ 2 − l", 50, VERT_OK).move_to([0.0, 0.2, 0])))
        self.au_mot("Vérifions")
        self.play(FadeIn(self.t("5 sur 3 :  P = 16  →  16 ÷ 2 − 3 = 5", 36).move_to([-0.6, -0.9, 0])))
        self.au_mot("C'est juste")
        self.play(FadeIn(self.coche().move_to([4.3, -0.9, 0])))
        self.attendre_voix()

    def construct(self):
        self.page_de_garde()
        self.page_objectifs(OBJECTIFS)
        self.ecran_formule()
        self.ecran_isoler()
        self.ecran_heure()
        self.ecran_methode()
        self.ecran_piege()
        self.ecran_deux_etapes()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=[
                "Une formule : une équation à plusieurs lettres",
                "On défait, des deux côtés, la dernière opération d'abord",
                "On vérifie : avec des nombres ou les unités",
            ],
            rappel="Piège : v = d × t est faux : km × h ne fait pas des km/h.",
            voix="08-finale",
        )
        self.page_abonnement(voix="09-abonne")
