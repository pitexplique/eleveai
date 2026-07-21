# duree.py
# EleveAI — Maths CM2 — Les durées (notionId : duree)
# Mêmes exemples que la fiche lib/fiches/maths-cm2-durees.tsx.
# CM2 = texte brut, langage d'un enfant de ~10 ans. VARIÉTÉ D'ANIMATIONS
# (aiguilles qui tournent, frise du temps qui se remplit par bonds, deux horloges
# côte à côte). Légendes DISTRIBUÉES.
#
# ⚠️ SON — ligne du 21/07 : la leçon prend la VOIX de Frédéric. Script voix en
# bas, à DEUX COLONNES (écrit / voix) : la voix GUIDE LE REGARD, ne relit pas.
#
# Mapping micro-compétences (banque durees.bank.ts) → écrans :
# - duree_lire     → écran 1 (horloge : 3 h, puis 7 h 15)
# - duree_convertir→ écran 2 (1 h = 60 min ; 90 min = 1 h 30)
# - duree_calculer → écran 3 (frise film : 17 h 40 + 1 h + 50 min = 19 h 30)
# - duree_probleme → écran 4 (bus 974 : 7 h 10 → 7 h 25 = 15 min)
# - duree_defi     → défi + correction (rando 6 h 50 + 35 + 20 + 25 = 8 h 10)
#
# Rendu : python -m manim render -qh manim/scripts/cm2/duree.py DureeCM2 -o eleveai-maths-cm2-duree --media_dir manim/scripts/cm2/media

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

import numpy as np
from manim import *

from charte import *
from mascotte import MascotteMargouillat


def hand_angle_min(minute):
    return (90 - minute * 6) * DEGREES


def hand_angle_hour(hour, minute):
    return (90 - (hour % 12 + minute / 60) * 30) * DEGREES


class DureeCM2(Scene):

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def horloge(self, center, r=1.4):
        """Cadran + graduations. Renvoie (groupe, center, r)."""
        c = np.array([center[0], center[1], 0])
        cadran = Circle(radius=r, color=WHITE, stroke_width=4).move_to(c)
        cadran.set_fill("#0b1b2b", opacity=1)
        ticks = VGroup()
        nums = VGroup()
        for k in range(12):
            ang = (90 - k * 30) * DEGREES
            p1 = c + (r - 0.14) * np.array([np.cos(ang), np.sin(ang), 0])
            p2 = c + r * np.array([np.cos(ang), np.sin(ang), 0])
            ticks.add(Line(p1, p2, stroke_width=3, color=WHITE))
            n = 12 if k == 0 else k
            np_ = c + (r - 0.4) * np.array([np.cos(ang), np.sin(ang), 0])
            nums.add(Text(str(n), font_size=20, color=WHITE).move_to(np_))
        return VGroup(cadran, ticks, nums), c, r

    def aiguilles(self, c, r, hour, minute):
        ah = hand_angle_hour(hour, minute)
        am = hand_angle_min(minute)
        hh = Line(c, c + 0.55 * r * np.array([np.cos(ah), np.sin(ah), 0]), stroke_width=8, color=BLEU_CALCUL)
        mm = Line(c, c + 0.85 * r * np.array([np.cos(am), np.sin(am), 0]), stroke_width=6, color="#ef4444")
        pin = Dot(c, radius=0.06, color=JAUNE_TITRE)
        return VGroup(hh, mm, pin)

    def frise(self, labels_vals, start_label, end_label, y=-0.4, x0=-5.0, x1=5.0):
        """Frise horizontale : segments colorés + étiquettes. labels_vals =
        [(label, minutes, color), ...]. Renvoie le groupe."""
        total = sum(v for _, v, _ in labels_vals)
        grp = VGroup()
        axe = Line([x0, y, 0], [x1, y, 0], stroke_width=3, color=WHITE)
        grp.add(axe)
        x = x0
        segs = []
        for lab, v, col in labels_vals:
            w = (x1 - x0) * v / total
            seg = Line([x, y, 0], [x + w, y, 0], stroke_width=10, color=col)
            tick = Line([x, y - 0.12, 0], [x, y + 0.12, 0], stroke_width=2, color=WHITE)
            lb = Text(lab, font_size=22, color=col).move_to([x + w / 2, y + 0.5, 0])
            segs.append(VGroup(seg, tick, lb))
            x += w
        endtick = Line([x1, y - 0.12, 0], [x1, y + 0.12, 0], stroke_width=2, color=WHITE)
        sl = Text(start_label, font_size=24, color=WHITE).move_to([x0, y - 0.55, 0])
        el = Text(end_label, font_size=24, color=VERT_OK).move_to([x1, y - 0.55, 0])
        grp.add(endtick, sl, el)
        return grp, segs

    # ── écran 0 : accueil ───────────────────────────────────────────────────

    def ecran_accueil(self):
        self.clear()
        self.add_mascotte(scale=0.8)
        titre = Text("Les durées", font_size=54, color=JAUNE_TITRE).to_edge(UP)
        sous = Text("Maths CM2 — EleveAI", font_size=32, color=WHITE).next_to(titre, DOWN, buff=0.35)
        hg, c, r = self.horloge([-2.6, -0.4, 0], r=1.3)
        aig = self.aiguilles(c, r, 3, 0)
        accroche = Text("60 minutes… pas 100 !", font_size=34, color=BLEU_CALCUL).move_to([1.8, 0.3, 0])
        astuce = Text("Le temps se compte par paquets de 60.", font_size=25, color=WHITE).next_to(accroche, DOWN, buff=0.5)
        self.play(Write(titre), FadeIn(sous))
        self.play(Create(hg), FadeIn(aig))
        self.play(GrowFromCenter(accroche))
        self.play(FadeIn(astuce, shift=UP * 0.2))
        self.wait(2.2)

    # ── écran 1 : lire l'heure ─────────────────────────────────────────────

    def ecran_lire(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("1. Lire l'heure")

        hg, c, r = self.horloge([-3.0, -0.2, 0], r=1.6)
        self.play(Create(hg))
        aig = self.aiguilles(c, r, 3, 0)
        self.play(Create(aig))
        lab3 = Text("3 h 00", font_size=40, color=VERT_OK).move_to([0.6, 0.6, 0])
        self.play(FadeIn(lab3, shift=RIGHT * 0.2))
        self.wait(0.6)

        # la grande aiguille avance sur le 3 → 7 h 15.
        note = Text("La grande aiguille sur le 3 = 15 min", font_size=26, color=ORANGE_RETENUE).move_to([1.8, -0.4, 0])
        aig2 = self.aiguilles(c, r, 7, 15)
        self.play(Transform(aig, aig2), FadeIn(note))
        lab715 = Text("7 h 15", font_size=40, color=VERT_OK).move_to([0.6, 0.6, 0])
        self.play(Transform(lab3, lab715))
        self.wait(2.0)

    # ── écran 2 : convertir ────────────────────────────────────────────────

    def ecran_convertir(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("2. Convertir")

        eq = Text("1 h = 60 min", font_size=48, color=WHITE).move_to([0, 1.5, 0])
        self.play(Write(eq))
        self.wait(0.4)

        # 90 min : on sort une heure (60), il reste 30.
        barre = Rectangle(width=9.0, height=0.7, stroke_width=2, color=WHITE).move_to([0, 0.1, 0])
        h60 = Rectangle(width=6.0, height=0.7, fill_color=BLEU_CALCUL, fill_opacity=0.85, stroke_width=2, color=WHITE).move_to([-1.5, 0.1, 0])
        r30 = Rectangle(width=3.0, height=0.7, fill_color=ORANGE_RETENUE, fill_opacity=0.85, stroke_width=2, color=WHITE).move_to([3.0, 0.1, 0])
        l90 = Text("90 min", font_size=28, color=WHITE).next_to(barre, UP, buff=0.3)
        self.play(Create(barre), FadeIn(l90))
        self.play(FadeIn(h60))
        self.play(FadeIn(r30))
        lb60 = Text("1 h", font_size=26, color=BLEU_CALCUL).move_to([-1.5, 0.1, 0])
        lb30 = Text("30 min", font_size=24, color=WHITE).move_to([3.0, 0.1, 0])
        self.play(FadeIn(lb60), FadeIn(lb30))

        conclusion = Text("90 min = 1 h 30", font_size=44, color=VERT_OK).to_edge(DOWN, buff=0.7)
        self.play(Write(conclusion))
        self.wait(2.0)

    # ── écran 3 : calculer l'heure de fin (frise) ──────────────────────────

    def ecran_calculer(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("3. L'heure de fin")

        enonce = Text("Un film à 17 h 40 dure 1 h 50", font_size=30, color=WHITE).move_to([0, 1.9, 0])
        self.play(FadeIn(enonce, shift=DOWN * 0.2))

        grp, segs = self.frise([("+ 1 h", 60, "#38bdf8"), ("+ 50 min", 50, "#f97316")],
                               "17 h 40", "19 h 30", y=0.2)
        self.play(Create(grp[0]))
        self.play(FadeIn(grp[1]), Write(grp[2]), Write(grp[3]))
        for s in segs:
            self.play(Create(s[0]), FadeIn(s[1]), FadeIn(s[2]), run_time=0.7)

        e1 = Text("17 h 40 + 1 h = 18 h 40", font_size=28, color=BLEU_CALCUL).move_to([0, -1.4, 0])
        e2 = Text("18 h 40 + 50 min = 19 h 30", font_size=30, color=VERT_OK).to_edge(DOWN, buff=0.5)
        self.play(FadeIn(e1, shift=UP * 0.2))
        self.play(Write(e2))
        self.wait(2.0)

    # ── écran 4 : problème du bus (deux horloges) ──────────────────────────

    def ecran_probleme(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("4. Le bus de Saint-Pierre")

        hg1, c1, r1 = self.horloge([-3.2, 0.2, 0], r=1.3)
        hg2, c2, r2 = self.horloge([3.2, 0.2, 0], r=1.3)
        self.play(Create(hg1), Create(hg2))
        a1 = self.aiguilles(c1, r1, 7, 10)
        a2 = self.aiguilles(c2, r2, 7, 25)
        l1 = Text("7 h 10\nmaintenant", font_size=24, color=WHITE, line_spacing=0.8).next_to(hg1, DOWN, buff=0.3)
        l2 = Text("7 h 25\nle bus", font_size=24, color=VERT_OK, line_spacing=0.8).next_to(hg2, DOWN, buff=0.3)
        self.play(Create(a1), FadeIn(l1))
        self.play(Create(a2), FadeIn(l2))

        fleche = Arrow([-1.6, 0.2, 0], [1.6, 0.2, 0], buff=0.1, color=ORANGE_RETENUE)
        ecart = Text("15 min", font_size=32, color=ORANGE_RETENUE).next_to(fleche, UP, buff=0.2)
        self.play(GrowArrow(fleche), FadeIn(ecart))

        conclusion = Text("Le bus part dans 15 minutes", font_size=36, color=VERT_OK).to_edge(DOWN, buff=0.5)
        self.play(Write(conclusion))
        self.wait(2.2)

    # ── écran 5 : défi (rando) ─────────────────────────────────────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.6)
        titre = Text("Défi", font_size=46, color=JAUNE_TITRE).to_edge(UP)
        self.play(GrowFromCenter(titre))

        q1 = Text("Léa part marcher à 6 h 50.", font_size=32, color=WHITE).move_to([0, 1.7, 0])
        q2 = Text("35 min de marche, 20 min de pause, 25 min de marche.", font_size=28, color=WHITE).move_to([0, 0.9, 0])
        q3 = Text("À quelle heure finit-elle ?", font_size=32, color=BLEU_CALCUL).move_to([0, 0.1, 0])
        indice = Text("Indice : additionne les 3 durées d'abord.", font_size=26, color=ORANGE_RETENUE).move_to([0, -0.7, 0])
        self.play(Write(q1))
        self.play(FadeIn(q2, shift=DOWN * 0.2))
        self.play(FadeIn(q3, shift=DOWN * 0.2))
        self.play(FadeIn(indice, shift=UP * 0.2))

        pause = Text("Mets pause et cherche !", font_size=30, color=ORANGE_RETENUE).to_edge(DOWN)
        self.play(Write(pause))
        self.wait(4.0)

    # ── écran 6 : correction (frise) ───────────────────────────────────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.titre_ecran("Correction")

        somme = Text("35 + 20 + 25 = 80 min = 1 h 20", font_size=32, color=BLEU_CALCUL).move_to([0, 2.0, 0])
        self.play(Write(somme))

        grp, segs = self.frise([("+ 35", 35, "#22c55e"), ("+ 20", 20, "#f59e0b"), ("+ 25", 25, "#38bdf8")],
                               "6 h 50", "8 h 10", y=0.3)
        self.play(Create(grp[0]), Write(grp[2]), Write(grp[3]))
        self.play(LaggedStart(*[FadeIn(s) for s in segs], lag_ratio=0.3))
        self.wait(0.5)

        e = Text("6 h 50 + 1 h 20 = 8 h 10", font_size=32, color=WHITE).move_to([0, -1.2, 0])
        conclusion = Text("Léa finit à 8 h 10", font_size=40, color=VERT_OK).to_edge(DOWN, buff=0.6)
        self.play(FadeIn(e, shift=UP * 0.2))
        self.play(Write(conclusion))
        self.wait(2.4)

    # ── écran 7 : à retenir ─────────────────────────────────────────────────

    def ecran_conclusion(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        titre = Text("À retenir", font_size=46, color=JAUNE_TITRE).to_edge(UP)

        points = VGroup(
            Text("1. 1 h = 60 min et 1 min = 60 s.", font_size=27),
            Text("2. Pour une heure de fin : d'abord les heures, puis les minutes.", font_size=27),
            Text("3. On ne dépasse jamais 59 min : à 60, on forme une heure.", font_size=27),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.5).move_to([0, 0.2, 0])

        signature = Text(SIGNATURE, font_size=26, color=VERT_OK).to_edge(DOWN)

        self.play(Write(titre))
        self.play(LaggedStart(*[FadeIn(p, shift=RIGHT * 0.3) for p in points], lag_ratio=0.3))
        self.play(Write(signature))
        self.wait(2.5)

    def construct(self):
        self.ecran_accueil()
        self.ecran_lire()
        self.ecran_convertir()
        self.ecran_calculer()
        self.ecran_probleme()
        self.ecran_defi()
        self.ecran_correction()
        self.ecran_conclusion()


# ─── SCRIPT VOIX (leçon → VOIX de Frédéric, ligne éditoriale du 21/07) ─────────
# DEUX COLONNES : ce qui RESTE écrit à l'écran (minimal) / ce que dit la VOIX.
# Règle d'or : la voix GUIDE LE REGARD, elle ne relit pas le texte affiché.
#
#  minutage   │ CE QUI RESTE À L'ÉCRAN        │ CE QUE DIT LA VOIX (guidage, ≠ écran)
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Accueil    │ « Les durées » + horloge      │ « Attention au piège du temps : ici on
#  ~0:00      │  60 minutes… pas 100 !        │   compte par soixante, jamais par cent.
#             │                               │   Une heure, c'est soixante minutes. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 1    │  horloge 3 h → 7 h 15         │ « Deux aiguilles : la courte pour les
#  ~0:14      │                               │   heures, la longue pour les minutes.
#             │                               │   Suis la longue qui glisse sur le trois :
#             │                               │   trois, ça fait quinze minutes. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 2    │  1 h = 60 min                 │ « Quatre-vingt-dix minutes, c'est trop
#  ~0:32      │  90 min = 1 h 30              │   pour rester en minutes. Regarde la barre :
#             │                               │   on en sort une heure pleine, la partie
#             │                               │   bleue, et il reste la partie orange. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 3    │  frise 17 h 40 → 19 h 30      │ « Ne calcule pas d'un coup. Avance sur la
#  ~0:52      │  + 1 h · + 50 min             │   frise par bonds : d'abord le grand bond
#             │                               │   d'une heure, puis le petit bond de
#             │                               │   cinquante minutes. Tu arrives à la fin. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Écran 4    │  deux horloges 7h10 / 7h25    │ « Compare les deux montres. La grande
#  ~1:14      │  → 15 min                     │   aiguille a juste avancé d'un cran de
#             │                               │   quinze. C'est ça, ton temps d'attente. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Défi       │  6h50, 35+pause 20+25         │ « À toi. Trois morceaux de temps à mettre
#  ~1:34      │  Quelle heure de fin ?        │   bout à bout. Additionne-les avant de
#             │                               │   partir de six heures cinquante. Pause. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  Correction │  35+20+25 = 80 = 1 h 20       │ « Les trois bouts font quatre-vingts
#  ~1:50      │  6 h 50 + 1 h 20 = 8 h 10     │   minutes — une heure vingt. On ajoute à
#             │                               │   six heures cinquante : huit heures dix. »
# ───────────┼──────────────────────────────┼──────────────────────────────────────
#  À retenir  │  les 3 points                 │ « Retiens : tout se compte par soixante ;
#  ~2:08      │                               │   pour une heure de fin, les heures puis
#             │                               │   les minutes ; et jamais soixante minutes
#             │                               │   dans une écriture. À bientôt ! »
