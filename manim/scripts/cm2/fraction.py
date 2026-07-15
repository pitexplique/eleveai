# fraction.py
# EleveAI — Maths CM2 — Les fractions (notionId : fraction)
# Mêmes exemples que la fiche lib/fiches/maths-cm2-fractions.tsx.
# CM2 = texte brut, langage d'un enfant de ~10 ans. Muet + texte. Fiche
# découverte : lire, représenter (barre/disque/grille), placer sur la droite —
# PAS d'addition (ça vient en 5e). VARIÉTÉ D'ANIMATIONS + légendes distribuées.
#
# Mapping micro-compétences (banque fractions.bank.ts) → écrans :
# - fraction_lire         → écran 1 (barre 3/4 : numérateur / dénominateur)
# - fraction_representer  → écran 2 (disque 2/5), écran 3 (grille 7/10),
#                           écran 4 (piège : parts inégales)
# - fraction_droite       → écran 5 (1/2 et 3/4 sur la droite),
#                           écran 6 (5/4 après 1) + défi/correction (7/3 entre 2 et 3)
#
# Rendu : python -m manim render -qh manim/scripts/cm2/fraction.py FractionCM2 -o eleveai-maths-cm2-fraction --media_dir manim/scripts/cm2/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from mascotte import MascotteMargouillat


class FractionCM2(Scene):

    # ── outils communs ──────────────────────────────────────────────────────

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def barre(self, n, d, width=6.0, height=0.9, x=0.0, y=0.0, couleur=BLEU_CALCUL):
        """Barre de fraction : d cases, n coloriées."""
        cells = VGroup()
        cw = width / d
        x0 = x - width / 2
        for i in range(d):
            c = Rectangle(width=cw, height=height, stroke_width=2, color=WHITE)
            c.move_to([x0 + cw * (i + 0.5), y, 0])
            if i < n:
                c.set_fill(couleur, opacity=0.85)
            cells.add(c)
        return cells

    def disque(self, n, d, r=1.2, x=0.0, y=0.0, couleur=BLEU_CALCUL):
        """Disque partagé en d secteurs égaux, n coloriés."""
        grp = VGroup()
        for i in range(d):
            sec = Sector(
                radius=r,
                angle=TAU / d,
                start_angle=PI / 2 + i * TAU / d,
                stroke_color=WHITE,
                stroke_width=2,
                fill_color=couleur if i < n else BLACK,
                fill_opacity=0.85 if i < n else 0.0,
            )
            grp.add(sec)
        grp.shift([x, y, 0])
        return grp

    def grille(self, rows, cols, shaded, cell=0.66, x=0.0, y=0.0, couleur=BLEU_CALCUL):
        """Grille rows×cols, shaded cases coloriées (de gauche à droite)."""
        grp = VGroup()
        w, h = cols * cell, rows * cell
        x0, y0 = x - w / 2, y + h / 2
        k = 0
        for r in range(rows):
            for c in range(cols):
                cellule = Rectangle(width=cell, height=cell, stroke_width=2, color=WHITE)
                cellule.move_to([x0 + cell * (c + 0.5), y0 - cell * (r + 0.5), 0])
                if k < shaded:
                    cellule.set_fill(couleur, opacity=0.85)
                grp.add(cellule)
                k += 1
        return grp

    def ligne(self, vmin, vmax, d, y=0.0, x_span=5.2):
        """Droite graduée : petits traits tous les 1/d, chiffres SEULEMENT
        sur les entiers. Renvoie (groupe, x_of)."""
        x0, x1 = -x_span, x_span

        def x_of(v):
            return x0 + (x1 - x0) * (v - vmin) / (vmax - vmin)

        axe = Arrow([x0 - 0.4, y, 0], [x1 + 0.4, y, 0], buff=0, stroke_width=3, color=WHITE)
        ticks = VGroup()
        labels = VGroup()
        n = round((vmax - vmin) * d)
        for i in range(n + 1):
            v = vmin + i / d
            tx = x_of(v)
            is_int = abs(v - round(v)) < 1e-9
            h = 0.17 if is_int else 0.09
            ticks.add(Line([tx, y - h, 0], [tx, y + h, 0], stroke_width=2))
            if is_int:
                labels.add(Text(str(round(v)), font_size=26, color=WHITE).move_to([tx, y - 0.5, 0]))
        return VGroup(axe, ticks, labels), x_of

    def point(self, x_of, v, label, color, y=0.0, up=0.7):
        dot = Dot([x_of(v), y, 0], color=color, radius=0.13)
        lbl = Text(label, font_size=30, color=color).move_to([x_of(v), y + up, 0])
        return VGroup(dot, lbl)

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("Les fractions", font_size=52, color=JAUNE_TITRE).to_edge(UP)
        sous_titre = Text("Maths CM2 — EleveAI", font_size=32, color=WHITE)
        sous_titre.next_to(titre, DOWN, buff=0.35)
        accroche = Text("3/4 : 3 parts sur 4. Où se place cette fraction ?", font_size=34, color=BLEU_CALCUL)
        accroche.next_to(sous_titre, DOWN, buff=0.9)
        astuce = Text("Lire · dessiner · placer sur la droite", font_size=28, color=WHITE)
        astuce.next_to(accroche, DOWN, buff=0.5)
        self.play(Write(titre), FadeIn(sous_titre))
        self.play(GrowFromCenter(accroche))
        self.play(FadeIn(astuce, shift=UP * 0.2))
        self.wait(2.2)

    # ── écran 1 : lire (barre 3/4, numérateur / dénominateur) ──────────────
    # Entrées : Create + FadeIn shift ; emphase : GrowArrow + Indicate.

    def ecran_lire(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Lire une fraction")

        b = self.barre(3, 4, y=0.4)
        self.play(Create(b))
        self.wait(0.4)

        frac = Text("3/4", font_size=64, color=WHITE).move_to([-4.4, 0.4, 0])
        self.play(FadeIn(frac, shift=RIGHT * 0.3))
        self.wait(0.3)

        # le haut : parts prises ; le bas : parts égales — légendes distribuées.
        haut = Text("3 = parts prises", font_size=28, color=VERT_OK).move_to([2.4, 1.9, 0])
        fh = Arrow([1.2, 1.7, 0], [-0.6, 0.9, 0], buff=0.15, color=VERT_OK)
        self.play(Write(haut), GrowArrow(fh))
        self.play(Indicate(b[0], color=VERT_OK), Indicate(b[1], color=VERT_OK), Indicate(b[2], color=VERT_OK))
        self.wait(0.6)

        bas = Text("4 = parts égales (le tout)", font_size=28, color=ORANGE_RETENUE).move_to([0, -1.4, 0])
        fb = Arrow([-2.0, -1.0, 0], [-2.6, -0.1, 0], buff=0.15, color=ORANGE_RETENUE)
        self.play(FadeIn(bas, shift=UP * 0.2), GrowArrow(fb))
        self.wait(2.0)

    # ── écran 2 : le disque (2/5) ──────────────────────────────────────────
    # Entrées : GrowFromCenter + coloriage progressif ; emphase : Circumscribe.

    def ecran_disque(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Le disque")

        enonce = Text("Un disque partagé en 5 parts égales", font_size=30, color=WHITE).move_to([0, 2.0, 0])
        self.play(FadeIn(enonce, shift=DOWN * 0.2))

        vide = self.disque(0, 5, x=-2.6, y=-0.3)
        self.play(GrowFromCenter(vide))
        self.wait(0.4)

        plein = self.disque(2, 5, x=-2.6, y=-0.3)
        note = Text("2 parts sont coloriées", font_size=28, color=BLEU_CALCUL).move_to([2.4, 0.4, 0])
        self.play(Transform(vide, plein), Write(note))
        self.play(Circumscribe(vide, color=VERT_OK, shape=Circle))
        self.wait(0.8)

        conclusion = Text("2 sur 5 → 2/5", font_size=46, color=VERT_OK).move_to([2.4, -0.8, 0])
        self.play(Write(conclusion))
        self.wait(2.0)

    # ── écran 3 : la grille (7/10) ─────────────────────────────────────────
    # Entrées : Create + LaggedStart coloriage ; emphase : compteur.

    def ecran_grille(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. La grille")

        enonce = Text("Une grille de 10 cases", font_size=30, color=WHITE).move_to([0, 2.0, 0])
        self.play(Write(enonce))

        vide = self.grille(2, 5, 0, x=0.0, y=0.2)
        self.play(Create(vide))
        self.wait(0.3)

        # on colorie 7 cases une à une.
        self.play(LaggedStart(*[vide[i].animate.set_fill(BLEU_CALCUL, opacity=0.85)
                                for i in range(7)], lag_ratio=0.15))
        compte = Text("7 cases coloriées sur 10", font_size=28, color=ORANGE_RETENUE).move_to([0, -1.4, 0])
        self.play(FadeIn(compte, shift=UP * 0.2))
        self.wait(0.8)

        conclusion = Text("7/10", font_size=52, color=VERT_OK).to_edge(DOWN, buff=0.5)
        self.play(Write(conclusion))
        self.wait(2.0)

    # ── écran 4 : piège (parts inégales) ───────────────────────────────────
    # Entrées : Create + Cross rouge ; emphase : FadeIn message.

    def ecran_piege(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. Attention : parts égales !")

        # une barre AUX PARTS INÉGALES : ce n'est pas une fraction valable.
        largeurs = [2.6, 1.0, 1.6, 0.8]  # tailles différentes
        x0 = -3.0
        cells = VGroup()
        x = x0
        for i, w in enumerate(largeurs):
            c = Rectangle(width=w, height=0.9, stroke_width=2, color=WHITE)
            c.move_to([x + w / 2, 0.4, 0])
            if i == 0:
                c.set_fill(BLEU_CALCUL, opacity=0.85)
            cells.add(c)
            x += w
        self.play(Create(cells))
        self.wait(0.5)

        faux = Text("1 part sur 4 ? NON : les parts n'ont pas la même taille.",
                    font_size=28, color=ROUGE_ERREUR).move_to([0, -0.9, 0])
        croix = Cross(cells, stroke_color=ROUGE_ERREUR, stroke_width=8)
        self.play(Write(faux))
        self.play(Create(croix))
        self.wait(1.0)

        regle = Text("Une fraction, c'est TOUJOURS des parts égales.",
                     font_size=30, color=VERT_OK).to_edge(DOWN)
        self.play(FadeIn(regle, shift=UP * 0.2))
        self.wait(2.0)

    # ── écran 5 : sur la droite (1/2 puis 3/4) ─────────────────────────────
    # Entrées : Create ligne + FadeIn scale ; emphase : GrowArrow.

    def ecran_droite(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("5. Une fraction est un nombre")

        consigne = Text("On partage l'unité (de 0 à 1) en 4 parts égales", font_size=28, color=WHITE).move_to([0, 2.0, 0])
        self.play(Write(consigne))

        ligne, x_of = self.ligne(0, 1, 4, y=0.3, x_span=5.0)
        self.play(Create(ligne[0]), Create(ligne[1]), Write(ligne[2]))
        self.wait(0.4)

        # 1/2 au milieu.
        p_demi = self.point(x_of, 0.5, "1/2", BLEU_CALCUL, y=0.3)
        note1 = Text("1/2 : pile au milieu", font_size=26, color=BLEU_CALCUL).move_to([-2.6, -1.1, 0])
        self.play(FadeIn(p_demi, scale=0.4), FadeIn(note1, shift=UP * 0.2))
        self.wait(0.8)

        # 3/4 : 3 parts de 1/4.
        p_trois = self.point(x_of, 0.75, "3/4", VERT_OK, y=0.3)
        fleche = Arrow([x_of(0), -0.5, 0], [x_of(0.75), -0.5, 0], buff=0.1, color=VERT_OK)
        note2 = Text("3/4 : 3 traits après 0", font_size=26, color=VERT_OK).move_to([2.4, -1.1, 0])
        self.play(FadeIn(p_trois, scale=0.4), GrowArrow(fleche), FadeIn(note2, shift=UP * 0.2))
        self.play(Circumscribe(p_trois, color=VERT_OK))
        self.wait(2.0)

    # ── écran 6 : plus grand que 1 (5/4) ───────────────────────────────────
    # Entrées : ligne + curseur qui glisse ; emphase : Flash.

    def ecran_superieur(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("6. Plus grand que 1")

        consigne = Text("Où se place 5/4 ?", font_size=32, color=WHITE).move_to([0, 2.0, 0])
        self.play(FadeIn(consigne, shift=DOWN * 0.2))

        ligne, x_of = self.ligne(0, 2, 4, y=0.3, x_span=5.2)
        self.play(Create(ligne[0]), Create(ligne[1]), Write(ligne[2]))
        self.wait(0.3)

        rappel = Text("4/4 = 1", font_size=30, color=ORANGE_RETENUE).move_to([x_of(1), 1.3, 0])
        tick1 = Dot([x_of(1), 0.3, 0], color=ORANGE_RETENUE, radius=0.12)
        self.play(Write(rappel), FadeIn(tick1, scale=0.4))
        self.wait(0.6)

        # 5/4 = un cran après 1.
        p = self.point(x_of, 1.25, "5/4", VERT_OK, y=0.3)
        fleche = Arrow([x_of(1), -0.6, 0], [x_of(1.25), -0.6, 0], buff=0.1, color=VERT_OK)
        note = Text("un quart de plus que 1", font_size=26, color=VERT_OK).move_to([x_of(1.25), -1.2, 0])
        self.play(FadeIn(p, scale=0.4), GrowArrow(fleche), FadeIn(note, shift=UP * 0.2))
        self.play(Flash(p[0], color=VERT_OK))
        self.wait(0.6)

        conclusion = Text("5/4 se place après 1", font_size=40, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion))
        self.wait(2.0)

    # ── écran 7 : défi (7 mangues pour 3) ──────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("Défi", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        self.play(GrowFromCenter(titre))

        q1 = Text("À La Réunion, on partage 7 mangues pour 3.", font_size=32, color=WHITE).move_to([0, 1.5, 0])
        q2 = Text("Cela fait la fraction 7/3.", font_size=32, color=BLEU_CALCUL).move_to([0, 0.8, 0])
        q3 = Text("Entre quels nombres entiers se place 7/3 ?", font_size=32, color=WHITE).move_to([0, 0.0, 0])
        indice = Text("Indice : 6/3 = 2 et 9/3 = 3", font_size=28, color=ORANGE_RETENUE).move_to([0, -0.8, 0])
        self.play(Write(q1))
        self.play(FadeIn(q2, shift=DOWN * 0.2))
        self.play(Write(q3))
        self.play(FadeIn(indice, shift=UP * 0.2))

        pause = Text("Mets pause et cherche !", font_size=30, color=ORANGE_RETENUE).to_edge(DOWN)
        self.play(Write(pause))
        self.wait(4.0)

    # ── écran 8 : correction (7/3 entre 2 et 3) ────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        ligne, x_of = self.ligne(0, 3, 3, y=0.4, x_span=5.4)
        self.play(Create(ligne[0]), Create(ligne[1]), Write(ligne[2]))
        self.wait(0.3)

        # les repères 6/3 = 2 et 9/3 = 3.
        r1 = Text("6/3 = 2", font_size=26, color=ORANGE_RETENUE).move_to([x_of(2), 1.3, 0])
        r2 = Text("9/3 = 3", font_size=26, color=ORANGE_RETENUE).move_to([x_of(3), 1.3, 0])
        self.play(Write(r1), Write(r2))
        self.wait(0.5)

        p = self.point(x_of, 7 / 3, "7/3", VERT_OK, y=0.4)
        self.play(FadeIn(p, scale=0.4))
        zone = DoubleArrow([x_of(2), -0.5, 0], [x_of(3), -0.5, 0], buff=0.05, color=BLEU_CALCUL, stroke_width=4)
        self.play(GrowFromCenter(zone))
        self.wait(0.6)

        conclusion = Text("7/3 est entre 2 et 3", font_size=42, color=VERT_OK).to_edge(DOWN)
        self.play(Write(conclusion), Flash(p[0], color=VERT_OK))
        self.wait(2.4)

    # ── écran 9 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. Numérateur (haut) = parts prises ; dénominateur (bas) = parts égales.", font_size=25),
            Text("2. Une fraction n'a de sens que si les parts sont ÉGALES.", font_size=25),
            Text("3. Une fraction est un nombre : elle se place sur la droite.", font_size=25),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([0, 0.3, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[FadeIn(p, shift=RIGHT * 0.3) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.ecran_accueil()
        self.ecran_lire()
        self.ecran_disque()
        self.ecran_grille()
        self.ecran_piege()
        self.ecran_droite()
        self.ecran_superieur()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ─── SCRIPT VOIX (optionnel — à lire au téléphone par-dessus la vidéo muette) ──
# Dire « top » quand le titre d'accueil apparaît (point de synchro Clipchamp).
# Ton simple, phrases courtes, on REDIT ce que l'écran montre.
#
# [Accueil ~0:00]    « Salut ! Les fractions. Trois quarts, c'est trois parts sur
#                      quatre. Mais cette fraction, où est-ce qu'elle se place ?
#                      Regarde. »
# [Écran 1 ~0:14]    « Dans trois quarts : le nombre du haut, trois, c'est les
#                      parts qu'on prend. Le nombre du bas, quatre, c'est le
#                      nombre total de parts égales. »
# [Écran 2 ~0:32]    « Un disque partagé en cinq parts égales. On en colorie deux.
#                      Deux parts sur cinq : ça s'écrit deux cinquièmes. »
# [Écran 3 ~0:48]    « Une grille de dix cases. On en colorie sept. Sept cases sur
#                      dix : la fraction, c'est sept dixièmes. »
# [Écran 4 ~1:04]    « Attention ! Ici les parts n'ont pas la même taille. Ce
#                      n'est pas une fraction. Une fraction, c'est toujours des
#                      parts égales. »
# [Écran 5 ~1:20]    « Une fraction, c'est aussi un nombre. Je partage l'unité, de
#                      zéro à un, en quatre. Un demi, c'est pile au milieu. Trois
#                      quarts, c'est trois traits après zéro. »
# [Écran 6 ~1:38]    « Et cinq quarts ? Quatre quarts font un. Cinq quarts, c'est
#                      un quart de plus : ça se place juste après un. »
# [Défi ~1:56]       « À toi ! Sept mangues partagées pour trois, ça fait sept
#                      tiers. Entre quels entiers ça se place ? Mets pause. »
# [Correction ~2:12] « Six tiers font deux, neuf tiers font trois. Sept tiers est
#                      entre les deux : entre deux et trois. »
# [À retenir ~2:28]  « On retient : le haut, les parts prises ; le bas, les parts
#                      égales. Toujours des parts égales. Et une fraction se place
#                      sur la droite, comme un nombre. À bientôt ! »
