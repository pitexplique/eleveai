# decomposition.py
# EleveAI — « Les bases » — Décomposer en facteurs premiers.
#
# ⭐ 08/10/2026 — Frédéric : « Décomposer un entier en produit de facteurs
# premiers, il faut une autre vidéo » (le défi mémoire n'y suffisait pas), puis
# « crée la vidéo paysage ». Voix : manim/voix/bases-decomposition.json (−7).
# ⭐ L'IMAGE : on casse les billes en groupes égaux jusqu'à ce que plus rien ne
# se casse — il ne reste que des nombres premiers, les BRIQUES des nombres.
# Suite de « Pourquoi 13 ne se range pas » (youtu.be/0SMk_9elRFI).
# ⭐ Pour insister : le nombre GROSSIT puis reprend sa taille (règle du 07/10),
# jamais de zoom de caméra.
# ⛔ La division s'écrit « : ». ⛔ AUCUNE ÉTIQUETTE DE NIVEAU.
#
# Rendu :
#   python -m manim render -qh --disable_caching manim/scripts/bases/decomposition.py Decomposition -o eleveai-maths-bases-decomposition --media_dir manim/scripts/bases/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from manim import *

from charte import *
from gabarit_sixieme import Notion6e
from nombres_premiers import _Billes

OBJECTIFS = [
    "casser un nombre en facteurs premiers",
    "écrire sa décomposition",
    "s'en servir pour résoudre un problème",
]
COULEURS_BRIQUES = {2: VERT_OK, 3: ORANGE_RETENUE, 5: VIOLET_ACCENT, 7: BLEU_CALCUL}


class Decomposition(_Billes, Notion6e):

    identite = "Les bases · EleveAI"
    nom_voix = "bases-decomposition"

    # ── les briques ─────────────────────────────────────────────────────────

    def insister(self, mob, facteur=1.45, duree=0.25):
        """Le geste pour insister : grossir, puis reprendre sa taille."""
        self.play(mob.animate.scale(facteur), run_time=duree)
        self.play(mob.animate.scale(1 / facteur), run_time=duree)

    def brique(self, p, largeur=1.0, hauteur=0.62, font_size=36):
        coul = COULEURS_BRIQUES.get(p, WHITE)
        r = RoundedRectangle(width=largeur, height=hauteur, corner_radius=0.08,
                             stroke_color=coul, stroke_width=3).set_fill(coul, opacity=0.25)
        return VGroup(r, self.t(str(p), font_size, coul).move_to(r))

    def noeud(self, n, pos, premier=False):
        t = self.t(str(n), 40, COULEURS_BRIQUES.get(n, WHITE) if premier else WHITE).move_to(pos)
        if premier:
            return VGroup(t, Circle(radius=0.36, color=COULEURS_BRIQUES.get(n, VERT_OK), stroke_width=3).move_to(pos))
        return VGroup(t)

    def branche(self, a, b):
        return Line(a.get_bottom() + DOWN * 0.05, b.get_top() + UP * 0.05, color=GREY_B, stroke_width=2.5)

    def arbre(self, racine, gauche, droite, x0, y0=2.2, ecart=1.3, pas=1.3):
        """Un arbre à deux étages : racine → (g, d) → (g1, g2) et (d1, d2).
        `gauche` = (n, (p, q)), `droite` = (n, (p, q)). Renvoie les étages."""
        r = self.noeud(racine, [x0, y0, 0])
        g = self.noeud(gauche[0], [x0 - ecart, y0 - pas, 0])
        d = self.noeud(droite[0], [x0 + ecart, y0 - pas, 0])
        feuilles_g = [self.noeud(p, [x0 - ecart + dx, y0 - 2 * pas, 0], premier=True)
                      for p, dx in zip(gauche[1], (-0.6, 0.6))]
        feuilles_d = [self.noeud(p, [x0 + ecart + dx, y0 - 2 * pas, 0], premier=True)
                      for p, dx in zip(droite[1], (-0.6, 0.6))]
        return r, (g, d), feuilles_g, feuilles_d

    def arbre_statique(self, x0, racine, gauche, droite):
        """L'arbre déjà dessiné, d'un bloc (pour le rappeler à côté d'un autre)."""
        r, (g, d), fg, fd = self.arbre(racine, gauche, droite, x0)
        return VGroup(r, g, d, *fg, *fd, self.branche(r, g), self.branche(r, d),
                      *[self.branche(g, f) for f in fg], *[self.branche(d, f) for f in fd])

    def pousser(self, parent, enfants):
        self.play(*[Create(self.branche(parent, e)) for e in enfants],
                  *[FadeIn(e, shift=DOWN * 0.15) for e in enfants], run_time=0.7)

    def produit(self, facteurs, font_size=44, debut="", fin=""):
        """« 60 = 2 × 2 × 3 × 5 » en jetons séparés, chaque facteur à sa couleur."""
        jetons = []
        if debut:
            jetons.append(self.t(debut, font_size))
        for i, p in enumerate(facteurs):
            if i:
                jetons.append(self.t("×", font_size))
            jetons.append(self.t(str(p), font_size, COULEURS_BRIQUES.get(p, WHITE)))
        if fin:
            jetons.append(self.t(fin, font_size))
        return VGroup(*jetons).arrange(RIGHT, buff=0.22)

    # ── 01 · casser 12 billes ───────────────────────────────────────────────
    def ecran_casser_12(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-casser-12")
        self.titre_ecran("Casser 12 billes")
        y = 1.3
        billes = VGroup(*[self.bille(0.2) for _ in range(12)])
        for i, b in enumerate(billes):
            b.move_to([-0.6 + (i - 5.5) * 0.55, y, 0])
        self.au_mot("Prenons 12 billes")
        self.play(LaggedStart(*[GrowFromCenter(b) for b in billes], lag_ratio=0.05))
        # étape 1 : 2 groupes de 6
        self.au_mot("en 2 groupes de 6")
        cx1 = [-3.4, 2.2]
        self.play(*[b.animate.move_to([cx1[i // 6] + (i % 6 - 2.5) * 0.5, y, 0]) for i, b in enumerate(billes)])
        c1 = VGroup(*[self.cadre(VGroup(*billes[6 * g:6 * g + 6]), VERT_OK, buff=0.1) for g in range(2)])
        self.play(Create(c1))
        self.au_mot("12 égale 2 fois 6")
        f1 = self.t("12 = 2 × 6", 44).move_to([-0.6, -0.4, 0])
        self.play(Write(f1))
        # étape 2 : chaque 6 en 2 groupes de 3
        self.au_mot("Chaque groupe de 6")
        cx2 = [-4.6, -2.2, 1.0, 3.4]
        self.play(FadeOut(c1), *[b.animate.move_to([cx2[i // 3] + (i % 3 - 1) * 0.5, y, 0]) for i, b in enumerate(billes)])
        c2 = VGroup(*[self.cadre(VGroup(*billes[3 * g:3 * g + 3]), ORANGE_RETENUE, buff=0.1) for g in range(4)])
        self.play(Create(c2))
        self.au_mot("6 égale 2 fois 3")
        f2 = self.t("6 = 2 × 3", 44).move_to([-0.6, -1.25, 0])
        self.play(Write(f2))
        self.au_mot("Et 3 ?")
        self.insister(c2[0], 1.3)
        self.au_mot("3 est premier")
        p = self.t("3 est premier, il ne se casse plus", 32, ORANGE_RETENUE).move_to([-0.6, -2.15, 0])
        self.play(FadeIn(p))
        self.insister(p)
        self.attendre_voix()

    # ── 02 · les briques de 12 ──────────────────────────────────────────────
    def ecran_resultat_12(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-resultat-12")
        self.titre_ecran("Les briques de 12")
        self.au_mot("2, 2 et 3")
        briques = VGroup(*[self.brique(p, 1.4, 0.85, 48) for p in (2, 2, 3)]).arrange(RIGHT, buff=0.35)
        briques.move_to([-0.6, 1.4, 0])
        for b in briques:
            self.play(GrowFromCenter(b), run_time=0.4)
            self.insister(b, 1.3, 0.15)
        self.au_mot("12 égale 2 fois 2 fois 3")
        f = self.produit([2, 2, 3], 64, debut="12 =").move_to([-0.6, -0.2, 0])
        self.play(Write(f))
        self.insister(f, 1.2)
        self.au_mot("C'est la décomposition")
        lbl = VGroup(self.t("la décomposition de 12", 32, JAUNE_TITRE),
                     self.t("en produit de facteurs premiers", 32, JAUNE_TITRE)).arrange(DOWN, buff=0.12)
        lbl.move_to([-0.6, -1.65, 0])
        self.play(FadeIn(lbl, shift=UP * 0.15))
        self.attendre_voix()

    # ── 03 · l'arbre de 60 ──────────────────────────────────────────────────
    def construire_arbre(self, x0, racine, gauche, droite, extraits):
        r, (g, d), fg, fd = self.arbre(racine, gauche, droite, x0)
        self.au_mot(extraits[0])
        self.play(FadeIn(r, scale=1.3))
        self.pousser(r, [g, d])
        self.au_mot(extraits[1])
        self.pousser(g, fg)
        self.au_mot(extraits[2])
        self.pousser(d, fd)
        return r, g, d, fg + fd

    def ecran_arbre_60(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-arbre-60")
        self.titre_ecran("L'arbre de 60")
        _, _, _, feuilles = self.construire_arbre(
            -3.0, 60, (6, (2, 3)), (10, (2, 5)),
            ["60 égale 6 fois 10", "6 égale 2 fois 3", "10 égale 2 fois 5"])
        self.au_mot("Toutes les branches")
        self.play(*[Flash(f, color=f[1].get_color(), line_length=0.2) for f in feuilles])
        for f in feuilles:
            self.insister(f, 1.35, 0.15)
        self.au_mot("60 égale 2 fois 2 fois 3 fois 5")
        res = self.produit([2, 2, 3, 5], 56, debut="60 =").move_to([2.9, 0.9, 0])
        self.play(Write(res))
        self.insister(res, 1.15)
        self.attendre_voix()

    # ── 04 · un autre chemin, les mêmes briques ─────────────────────────────
    def ecran_autre_chemin(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-autre-chemin")
        self.titre_ecran("Un autre chemin")
        gauche = self.arbre_statique(-3.4, 60, (6, (2, 3)), (10, (2, 5)))
        self.add(gauche.set_opacity(0.4))
        _, _, _, feuilles = self.construire_arbre(
            2.4, 60, (4, (2, 2)), (15, (3, 5)),
            ["60 égale 4 fois 15", "4 égale 2 fois 2", "15 égale 3 fois 5"])
        self.au_mot("les mêmes briques")
        self.play(FadeTransform(gauche, self.arbre_statique(-3.4, 60, (6, (2, 3)), (10, (2, 5)))))
        for f in feuilles:
            self.insister(f, 1.35, 0.15)
        self.au_mot("Quel que soit le chemin")
        res = self.produit([2, 2, 3, 5], 48, debut="60 =").move_to([-0.6, -2.3, 0])
        self.play(Write(res))
        self.play(Circumscribe(res, color=JAUNE_TITRE))
        self.attendre_voix()

    # ── 05 · la méthode des divisions ───────────────────────────────────────
    def ecran_methode(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-methode")
        self.titre_ecran("Diviser par 2, 3, 5, 7…")
        lignes = [
            ("60 divisé par 2", "60 : 2 = 30", WHITE, 2),
            ("30 divisé par 2", "30 : 2 = 15", WHITE, 2),
            ("15 ne se divise pas par 2", "15 : 2, ça ne tombe pas juste", ROUGE_ERREUR, None),
            ("15 divisé par 3", "15 : 3 = 5", WHITE, 3),
            ("5 est premier", "5 est premier", VIOLET_ACCENT, 5),
        ]
        diviseurs = []
        for i, (extrait, txt, coul, d) in enumerate(lignes):
            self.au_mot(extrait)
            l = self.t(txt, 40, coul).move_to([-3.2, 2.1 - i * 0.85, 0])
            l.align_to([-6.3, 0, 0], LEFT)
            self.play(Write(l), run_time=0.6)
            if d:
                diviseurs.append((l, d))
        self.au_mot("Les diviseurs utilisés")
        briques = VGroup(*[self.brique(d, 1.0, 0.62, 36) for _, d in diviseurs]).arrange(RIGHT, buff=0.25)
        briques.move_to([3.8, 1.95, 0])
        self.play(*[TransformFromCopy(l, b) for (l, _), b in zip(diviseurs, briques)], run_time=1.2)
        for b in briques:
            self.insister(b, 1.3, 0.15)
        res = self.produit([2, 2, 3, 5], 44, debut="60 =").move_to([3.8, -0.4, 0])
        self.play(Write(res))
        self.attendre_voix()

    # ── 06 · les puissances ─────────────────────────────────────────────────
    def ecran_puissances(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-puissances")
        self.titre_ecran("Ranger les briques identiques")
        self.au_mot("2 fois 2, c'est 2 au carré")
        a = self.produit([2, 2], 64).move_to([-2.2, 1.2, 0])
        fl = Arrow([-0.8, 1.2, 0], [0.6, 1.2, 0], color=WHITE, buff=0)
        p = self.puissance(2, 2, font_size=72, color=VERT_OK).move_to([1.6, 1.3, 0])
        self.play(Write(a))
        self.play(GrowArrow(fl), TransformFromCopy(a, p))
        self.insister(p, 1.4)
        self.au_mot("60 égale 2 au carré")
        res = VGroup(self.t("60 =", 64), self.puissance(2, 2, font_size=64, color=VERT_OK),
                     self.t("×", 64), self.t("3", 64, ORANGE_RETENUE), self.t("×", 64),
                     self.t("5", 64, VIOLET_ACCENT)).arrange(RIGHT, buff=0.25).move_to([-0.6, -0.6, 0])
        self.play(Write(res))
        self.insister(res, 1.15)
        self.attendre_voix()

    # ── 07 · le problème du fleuriste ───────────────────────────────────────
    def ecran_probleme(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-probleme")
        self.titre_ecran("À quoi ça sert ?")
        self.au_mot("60 roses et 84 tulipes")
        self.play(FadeIn(self.t("60 roses", 40, ROUGE_ERREUR).move_to([-3.6, 2.35, 0])),
                  FadeIn(self.t("84 tulipes", 40, JAUNE_TITRE).move_to([1.4, 2.35, 0])))
        self.play(FadeIn(self.t("le plus de bouquets identiques ?", 30, BLEU_CALCUL).move_to([-1.1, 1.65, 0])))
        # Les deux décompositions, facteur sous facteur.
        xs = [-5.0, -4.0, -3.0, -2.3, -1.6, -0.9, -0.2, 0.5, 1.2]

        def ligne(nombre, facteurs, y):
            jetons = [str(nombre), "="] + sum([[str(p), "×"] for p in facteurs], [])[:-1]
            g = VGroup()
            for x, j in zip(xs, jetons):
                coul = COULEURS_BRIQUES.get(int(j), WHITE) if j.isdigit() and int(j) < 10 else WHITE
                g.add(self.t(j, 44, coul).move_to([x, y, 0]))
            return g

        self.au_mot("60 égale 2 fois 2 fois 3 fois 5")
        l60 = ligne(60, [2, 2, 3, 5], 0.75)
        self.play(Write(l60))
        self.au_mot("84 égale")
        l84 = ligne(84, [2, 2, 3, 7], -0.15)
        self.play(Write(l84))
        self.au_mot("Les briques communes")
        communes = SurroundingRectangle(VGroup(*l60[2:7], *l84[2:7]), color=VERT_OK, buff=0.15, corner_radius=0.12)
        self.play(Create(communes))
        self.insister(VGroup(*l60[2:7], *l84[2:7]), 1.15)
        self.au_mot("2 fois 2 fois 3 égale 12")
        douze = self.t("2 × 2 × 3 = 12", 44, VERT_OK).move_to([-1.9, -1.15, 0])
        self.play(Write(douze))
        self.au_mot("Il fera 12 bouquets")
        bouquets = VGroup(*[VGroup(Dot(color=ROUGE_ERREUR, radius=0.07), Dot(color=JAUNE_TITRE, radius=0.07)).arrange(RIGHT, buff=0.04)
                            for _ in range(12)]).arrange_in_grid(rows=2, cols=6, buff=0.25).move_to([3.6, 0.3, 0])
        self.play(LaggedStart(*[GrowFromCenter(b) for b in bouquets], lag_ratio=0.06))
        r = VGroup(self.t("12 bouquets", 40, VERT_OK),
                   self.t("5 roses et 7 tulipes dans chacun", 28)).arrange(DOWN, buff=0.15).move_to([-1.0, -2.2, 0])
        self.play(FadeIn(r))
        self.insister(r[0])
        self.attendre_voix()

    # ── 08 · le piège ───────────────────────────────────────────────────────
    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.dire("08-piege")
        self.titre_ecran("Le piège")
        self.au_mot("60 égale 6 fois 10")
        f = VGroup(self.t("60 =", 64), self.t("6", 64, ROUGE_ERREUR), self.t("×", 64),
                   self.t("10", 64, ROUGE_ERREUR)).arrange(RIGHT, buff=0.3).move_to([-0.6, 1.4, 0])
        self.play(Write(f))
        self.au_mot("6 et 10 ne sont pas premiers")
        self.play(*[Create(SurroundingRectangle(f[i], color=ROUGE_ERREUR, buff=0.1)) for i in (1, 3)])
        self.insister(VGroup(f[1], f[3]), 1.3)
        self.play(FadeIn(self.t("pas fini !", 44, ROUGE_ERREUR).move_to([-0.6, 0.2, 0])))
        self.au_mot("On continue")
        suite = VGroup(self.t("6 = 2 × 3", 40), self.t("10 = 2 × 5", 40)).arrange(RIGHT, buff=1.2).move_to([-0.6, -0.8, 0])
        self.play(Write(suite))
        res = self.produit([2, 2, 3, 5], 48, debut="60 =").move_to([-0.6, -1.9, 0])
        self.play(Write(res))
        self.play(Create(self.coche().next_to(res, RIGHT, buff=0.3)))
        self.attendre_voix()

    # ── 09 · le récapitulatif ───────────────────────────────────────────────
    def ecran_recap(self):
        self.clear()
        self.add_mascotte()
        self.dire("09-recap")
        self.titre_ecran("Le récapitulatif")
        lignes = [
            ("On casse le nombre", "On casse jusqu'aux nombres premiers.", WHITE, 2.1),
            ("dessiner un arbre", "Un arbre, ou diviser par 2, 3, 5, 7…", WHITE, 1.1),
            ("les mêmes briques", "Quel que soit le chemin, les mêmes briques.", JAUNE_TITRE, 0.1),
            ("Et les briques communes", "Briques communes = le plus de paquets identiques.", VERT_OK, -0.9),
        ]
        for extrait, txt, coul, y in lignes:
            self.au_mot(extrait)
            l = self.t(txt, 32, coul).move_to([-0.6, y, 0])
            self.play(FadeIn(l, shift=RIGHT * 0.2))
        briques = VGroup(*[self.brique(p, 0.9, 0.55, 30) for p in (2, 2, 3, 5)]).arrange(RIGHT, buff=0.2)
        briques.move_to([-0.6, -2.1, 0])
        self.play(LaggedStart(*[GrowFromCenter(b) for b in briques], lag_ratio=0.15))
        self.attendre_voix()

    # ── 10-11 · défi et correction ──────────────────────────────────────────
    def ecran_defi(self):
        self.clear()
        self.add_mascotte()
        self.dire("10-defi")
        self.titre_ecran("À toi !")
        self.au_mot("Décompose 90")
        d = self.t("Décompose 90", 80, BLEU_CALCUL).move_to([-0.6, 0.9, 0])
        self.play(Write(d))
        self.insister(d, 1.15)
        self.play(FadeIn(self.t("en produit de facteurs premiers", 36).move_to([-0.6, -0.4, 0])))
        self.au_mot("Mets pause")
        self.play(Write(self.chute("Mets pause, et cherche !", color=ORANGE_RETENUE, font_size=34)))
        self.attendre_voix(marge=2.5)

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("11-correction")
        self.titre_ecran("Correction")
        lignes = [
            ("90 divisé par 2", "90 : 2 = 45", WHITE),
            ("45 ne se divise pas", "45 : 2, ça ne tombe pas juste", ROUGE_ERREUR),
            ("45 divisé par 3", "45 : 3 = 15", WHITE),
            ("15 divisé par 3", "15 : 3 = 5", WHITE),
            ("Et 5 est premier", "5 est premier", VIOLET_ACCENT),
        ]
        for i, (extrait, txt, coul) in enumerate(lignes):
            self.au_mot(extrait)
            l = self.t(txt, 38, coul).move_to([-3.2, 2.1 - i * 0.8, 0])
            l.align_to([-6.3, 0, 0], LEFT)
            self.play(Write(l), run_time=0.6)
        self.au_mot("90 égale 2 fois 3 fois 3 fois 5")
        r1 = self.produit([2, 3, 3, 5], 44, debut="90 =").move_to([3.9, -0.2, 0])
        self.play(Write(r1))
        self.au_mot("c'est-à-dire")
        r2 = VGroup(self.t("=", 48), self.t("2", 48, VERT_OK), self.t("×", 48),
                    self.puissance(3, 2, font_size=48, color=ORANGE_RETENUE), self.t("×", 48),
                    self.t("5", 48, VIOLET_ACCENT)).arrange(RIGHT, buff=0.22).move_to([4.1, -1.2, 0])
        self.play(Write(r2))
        self.insister(r2, 1.2)
        self.play(Create(self.coche().next_to(r2, RIGHT, buff=0.3)))
        self.attendre_voix()

    def construct(self):
        self.page_de_garde(
            titre="Décomposer en facteurs premiers",
            accroche="60 billes, jusqu'où les casser ?",
            promesse="Les nombres premiers, briques de tous les nombres.",
        )
        self.page_objectifs(OBJECTIFS)
        self.ecran_casser_12()
        self.ecran_resultat_12()
        self.ecran_arbre_60()
        self.ecran_autre_chemin()
        self.ecran_methode()
        self.ecran_puissances()
        self.ecran_probleme()
        self.ecran_piege()
        self.ecran_recap()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            points=OBJECTIFS,
            rappel="Les nombres premiers sont les briques de tous les nombres.",
            voix="12-finale",
        )
        self.page_abonnement(voix="13-abonne")
