# racine_carree_2de.py
# EleveAI — Maths seconde — La racine carrée (notionId : racine_carree_2de)
#
# ⭐ SCRIPT ÉTALON DU LYCÉE (09/09/2026). Il sert à MESURER le coût d'une vidéo
# de seconde avant d'en lancer 24. Trois choix y sont pris une fois pour toutes,
# et les 23 autres scripts n'auront qu'à les reprendre :
#
#   1. AUCUN LaTeX. `MathTex` ne se rend PAS sur cette machine : il n'y a ni
#      MiKTeX ni TeX Live, et `manim/scripts/premiere/derivation.py` — écrit en
#      MathTex le 21/07 — n'a donc jamais pu sortir un seul mp4. Les maths sont
#      donc composées en Text + dessin, via les helpers `radical()` et `frac()`.
#      La fiche fait déjà ce choix dans ses tableaux (« √50 = 5√2 »), donc
#      l'élève retrouve la même écriture d'un support à l'autre.
#   2. PAGE DE GARDE ET PAGE FINALE PARAMÉTRÉES (demande de Frédéric, 09/09).
#      `page_de_garde()` et `page_finale()` prennent leurs textes en arguments :
#      la logique se règle ICI, une fois, et se réplique à l'identique.
#      ⚠️ Quand elle sera validée, ces deux méthodes montent dans `charte.py` et
#      les 24 scripts les importent — on ne les recopie pas 24 fois.
#   3. Mêmes exemples que la fiche `lib/fiches/maths-seconde-racines.tsx`.
#
# Mapping micro-compétences (lib/tutor-v4/knowledge/maths/seconde/microSkills.ts,
# notion racine_carree_2de — 6 micros, TOUTES couvertes) → écrans :
# - racine_calcul         → écran 1 (définition + droite graduée + carrés parfaits)
# - racine_domaine        → écran 2 (la courbe : 4 a une image, −1 n'en a pas)
# - racine_carre_de_a2    → écran 3 (√(a²) = |a|, testé sur 5 et −5)
# - racine_produit        → écran 4 (√(4×9) = √4 × √9 = 6)
# - racine_somme          → écran 5 (√(9+16) = 5 mais √9 + √16 = 7 : c'est FAUX)
#                            + écran 7 (correction : additionner à radical identique)
# - racine_simplification → écran 6 (√50 = 5√2, le plus grand carré)
#
# Défi = la question 2.3 du contrôle commun de mars 2025 (√75 − √48 sous la
# forme a√3), celle qui a fait créer le micro `racine_somme`.
#
# Rendu : python -m manim render -qh manim/scripts/seconde/racine_carree_2de.py RacineCarree2de -o eleveai-maths-seconde-racine-carree-2de --media_dir manim/scripts/seconde/media

import sys
import wave
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from manim import *

from charte import *
from mascotte import MascotteMargouillat

# ─── La voix ──────────────────────────────────────────────────────────────────
# ⭐ LA VOIX MONTE AU LYCÉE (09/09/2026, demande de Frédéric : « fais un preview
# avec son »). `manim/REGLES.md` pose le muet par défaut et n'ouvrait la voix
# qu'au cycle 2, pour une raison qui ne vaut pas ici — un CP ne sait pas lire.
# La raison au lycée est autre : une notion de seconde se DÉROULE (« je simplifie
# chacune, PUIS je soustrais »), et un enchaînement s'écoute mieux qu'il ne se
# lit. ⚠️ Coût vérifié : la voix est locale et gratuite (voix Windows Julie via
# `scripts/generer-voix.ps1`), mais elle FAIT LA DURÉE — 2 min 34 en muet
# deviennent 4 min 40.
#
# Régénérer :
#   powershell -File scripts/generer-voix.ps1 -Fichier manim/voix/seconde-racine-carree-2de.json -Voix Julie -Debit -4
# ⚠️ `-Debit -4` et non `-18` : le -18 du CP donne au lycée une voix qui traîne.
VOIX = Path(__file__).resolve().parents[3] / "public" / "sons" / "seconde-racine-carree-2de"
# ⭐ Les clips PARTAGÉS par toutes les vidéos (l'appel à l'abonnement). Ils sont
# déjà générés pour le CP : on les emprunte au lieu d'en refaire 24 copies.
COMMUN = Path(__file__).resolve().parents[3] / "public" / "sons" / "cp-commun"


class RacineCarree2de(Scene):

    # ══════════════════════════════════════════════════════════════════════════
    # LES BRIQUES COMMUNES — page de garde, page finale, radical
    # ⚠️ À REMONTER DANS charte.py une fois la logique validée par Frédéric.
    # ══════════════════════════════════════════════════════════════════════════

    def add_mascotte(self, scale=0.5):
        m = MascotteMargouillat().scale(scale).to_corner(DOWN + RIGHT, buff=0.35)
        self.add(m)
        return m

    def titre_ecran(self, texte):
        t = Text(texte, font_size=40, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(t))
        return t

    def dire(self, nom, dossier=None):
        """Lance le clip de voix de l'écran et retient l'instant où il finit.

        `dossier` permet d'emprunter un clip PARTAGÉ (ex. `COMMUN / abonne`) :
        une phrase identique d'une vidéo à l'autre ne se régénère pas 24 fois.

        ⛔⛔ RENDRE SANS CACHE (`--disable_caching`), sinon les sons sautent
        sans un mot d'avertissement : Manim réutilise les segments vidéo déjà
        calculés et n'y réinjecte pas l'audio.
        ⭐ La durée se LIT dans le WAV, elle ne se recopie jamais à la main :
        une table écrite à la main se désynchronise dès qu'on régénère une voix,
        et le symptôme est une phrase coupée que personne ne revérifie.
        """
        chemin = (dossier or VOIX) / f"{nom}.wav"
        if not chemin.exists():
            self._fin_voix = None
            return 0.0
        self.add_sound(str(chemin))
        with wave.open(str(chemin), "rb") as w:
            duree = w.getnframes() / float(w.getframerate())
        self._fin_voix = self.renderer.time + duree
        return duree

    def attendre_voix(self, marge=0.7):
        """Tient l'écran jusqu'à la fin de la phrase, plus une respiration.

        C'est la voix qui commande la durée, jamais l'inverse : si un écran
        gagne une animation, il ne s'allonge pas ; s'il en perd une, l'image
        patiente au lieu de couper la phrase en deux.
        """
        fin = getattr(self, "_fin_voix", None)
        if fin is None:
            self.wait(marge)
            return
        self.wait(max(marge, fin - self.renderer.time + marge))

    def chute(self, texte, color=BLEU_CALCUL, font_size=30):
        """La phrase du bas — celle qui conclut l'écran.

        ⛔ ELLE NE DOIT PAS PASSER DERRIÈRE TI-MARGO. Le mascotte occupe le coin
        bas-droit à partir de x ≈ 5,0 ; une phrase centrée de plus de 11 unités
        finissait dessous, illisible (constaté au rendu du 09/09). On la rétrécit
        si besoin et on la recentre à gauche.
        """
        t = Text(texte, font_size=font_size, color=color)
        # ⚠️ La largeur se prend sur le CADRE, pas en dur : le même helper sert
        # le paysage (14,2 de large) et le Short vertical (4,5). Une constante
        # écrite en dur faisait déborder tout le texte du Short hors de l'image.
        vertical = config.frame_width < 8
        largeur_max = config.frame_width - (0.5 if vertical else 3.8)
        if t.width > largeur_max:
            t.scale_to_fit_width(largeur_max)
        # ⛔ En vertical, Ti-Margo est au centre-bas (et non dans un coin comme
        # en paysage) : une chute posée à 0,7 du bord lui passe DERRIÈRE. On la
        # remonte au-dessus de lui.
        return t.to_edge(DOWN, buff=1.45 if vertical else 0.7).shift(LEFT * (0.0 if vertical else 0.6))

    def radical(self, radicande, coefficient="", font_size=44, color=WHITE):
        """Un radical DESSINÉ : coefficient, signe √, radicande, et sa barre.

        ⛔ Sans LaTeX, « √50 » seul manque de sa barre horizontale (le vinculum)
        et l'élève ne voit pas où s'arrête le nombre sous le radical. On la
        trace : c'est un `Line` posé sur la boite du radicande.
        """
        morceaux = []
        if coefficient:
            morceaux.append(Text(coefficient, font_size=font_size, color=color))
        signe = Text("√", font_size=font_size * 1.15, color=color)
        nombre = Text(str(radicande), font_size=font_size, color=color)
        morceaux += [signe, nombre]

        groupe = VGroup(*morceaux).arrange(RIGHT, buff=0.06, aligned_edge=DOWN)
        barre = Line(
            nombre.get_corner(UL) + LEFT * 0.02 + UP * 0.06,
            nombre.get_corner(UR) + RIGHT * 0.04 + UP * 0.06,
            stroke_width=2.5,
            color=color,
        )
        return VGroup(groupe, barre)

    def page_de_garde(self, titre, accroche, promesse):
        """PAGE DE GARDE — la même pour les 24 notions de seconde.

        Quatre lignes, toujours dans cet ordre :
          · le titre de la notion (jaune, la plus grosse) ;
          · « Maths seconde — EleveAI » (l'identité, taille fixe) ;
          · l'ACCROCHE : une question, jamais un résumé. C'est elle qui décide
            si l'élève reste — l'image que YouTube prélève à 1 seconde tombe ici.
          · la PROMESSE : ce qu'il saura faire à la fin, en trois mots séparés
            par des points médians.
        """
        self.clear()
        self.add_mascotte(scale=0.8)
        self.dire("00-garde")

        t = Text(titre, font_size=54, color=JAUNE_TITRE).to_edge(UP, buff=0.9)
        identite = Text("Maths seconde — EleveAI", font_size=30, color=WHITE)
        identite.next_to(t, DOWN, buff=0.35)
        acc = Text(accroche, font_size=34, color=BLEU_CALCUL)
        acc.next_to(identite, DOWN, buff=0.95)
        prom = Text(promesse, font_size=26, color=WHITE)
        prom.next_to(acc, DOWN, buff=0.55)

        self.play(Write(t), FadeIn(identite, shift=DOWN * 0.2))
        self.play(GrowFromCenter(acc))
        self.play(Flash(acc, color=BLEU_CALCUL, line_length=0.3))
        self.play(FadeIn(prom, shift=UP * 0.2))
        self.attendre_voix()

    def coche(self, couleur=VERT_OK, taille=0.22):
        """Une coche DESSINÉE (deux segments), jamais un emoji.

        ⛔ Les emoji ne sont pas rendus par la police de Manim : ils sortent en
        petits carrés. Tout pictogramme se trace.
        """
        c = VMobject(stroke_color=couleur, stroke_width=5)
        c.set_points_as_corners([
            [-taille, 0.0, 0],
            [-taille * 0.25, -taille * 0.75, 0],
            [taille, taille * 0.8, 0],
        ])
        return c

    def page_objectifs(self, objectifs):
        """L'ANNONCE DES OBJECTIFS — la même pour les 24 notions.

        ⭐ DEMANDE DE FRÉDÉRIC (09/09/2026), au nom de l'ENSEIGNEMENT EXPLICITE :
        « on doit savoir en début de vidéo ce que l'on va savoir faire ». La
        méthode veut qu'un cours s'ouvre sur son objectif et se ferme sur sa
        vérification — annoncer, montrer, faire pratiquer, revenir à l'annonce.
        `page_finale()` reprend donc CES MÊMES phrases, cochées.

        ⭐ Les objectifs se lisent dans les MICRO-COMPÉTENCES de la notion
        (`lib/tutor-v4/knowledge/maths/<classe>/microSkills.ts`) : elles sont
        déjà écrites comme des savoir-faire (« Simplifier une racine carrée »).
        L'élève entend donc l'objectif ici, et retrouve le même énoncé, mot pour
        mot, dans la liste du coach quand il va s'entraîner.
        ⚠️ TROIS AU PLUS, en verbes d'action. Six micros ne font pas six lignes :
        on les regroupe, sinon plus personne ne retient l'annonce.
        """
        self.clear()
        self.add_mascotte()
        self.dire("00b-objectifs")

        titre = Text("À la fin, tu sauras", font_size=44, color=JAUNE_TITRE).to_edge(UP, buff=0.75)
        self.play(Write(titre))

        lignes = VGroup()
        for i, texte in enumerate(objectifs):
            num = Text(f"{i + 1}.", font_size=32, color=BLEU_CALCUL)
            corps = Text(texte, font_size=30, color=WHITE)
            lignes.add(VGroup(num, corps).arrange(RIGHT, buff=0.28, aligned_edge=UP))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.72).move_to([0, 0.15, 0])
        for l in lignes:
            self.play(FadeIn(l, shift=RIGHT * 0.25), run_time=0.55)

        self.play(Write(self.chute("Trois objectifs. On y va.", color=BLEU_CALCUL)))
        self.attendre_voix()

    def page_finale(self, points, rappel):
        """PAGE FINALE — la même pour les 24 notions de seconde.

        Trois étages :
          · « À retenir » + 3 lignes MAXIMUM (au-delà, on ne retient rien) ;
          · le RAPPEL : la phrase-piège du chapitre, en orange, isolée — c'est
            l'erreur que le prof voit revenir sur les copies ;
          · la signature EleveAI + l'adresse de la fiche.
        """
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("10-finale")

        # ⭐ « Tu sais maintenant » ET NON « À retenir » : la clôture de
        # l'enseignement explicite REVIENT à l'annonce du début. Les trois
        # lignes reprennent les trois objectifs de `page_objectifs()`, dans le
        # même ordre, chacune cochée — l'élève voit qu'il a fait le tour.
        titre = Text("Tu sais maintenant", font_size=44, color=JAUNE_TITRE).to_edge(UP)
        lignes = VGroup()
        for p in points:
            lignes.add(VGroup(self.coche(), Text(p, font_size=26, color=WHITE))
                       .arrange(RIGHT, buff=0.3, aligned_edge=UP))
        lignes.arrange(DOWN, aligned_edge=LEFT, buff=0.45).move_to([0, 0.75, 0])

        # ⚠️ Le cadre du rappel touchait les deux bords : on borne sa largeur.
        piege = Text(rappel, font_size=27, color=ORANGE_RETENUE)
        if piege.width > 11.0:
            piege.scale_to_fit_width(11.0)
        piege.move_to([0, -1.35, 0])
        cadre = SurroundingRectangle(piege, color=ORANGE_RETENUE, buff=0.25, stroke_width=2)

        # ⚠️ L'adresse du site N'EST PLUS ICI : l'écran d'abonnement qui suit la
        # porte, et l'écrire deux fois de suite l'affaiblit.
        signature = Text(SIGNATURE, font_size=25, color=VERT_OK).to_edge(DOWN, buff=0.85)

        self.play(Write(titre))
        for l in lignes:
            self.play(FadeIn(l, shift=RIGHT * 0.2), run_time=0.5)
        self.play(Write(piege), Create(cadre))
        self.play(Flash(piege, color=ORANGE_RETENUE, line_length=0.25))
        self.play(FadeIn(signature))
        self.attendre_voix(marge=1.0)

    def page_abonnement(self):
        """L'ÉCRAN D'ABONNEMENT — le même pour les 24 notions.

        ⭐ La POIGNÉE est écrite en toutes lettres, jamais un bouton dessiné :
        rien n'est cliquable dans une vidéo, et imiter l'interface de YouTube
        promettrait une action que l'image ne peut pas rendre. Une poignée, elle,
        se retient et se retape.
        ⭐ La signature est « Frédéric Lacoste — La Réunion », SANS le mot
        « enseignant » : c'est la formule arrêtée le 03/09/2026 pour YouTube.
        ⚠️ Le bloc reste au-dessus du cinquième inférieur de l'image, que
        l'interface de YouTube recouvre.
        ⚠️ Coût mesuré sur les Shorts : environ +5 s, et autant de rétention en
        moins. Le pari est assumé — convertir vaut mieux que retenir.
        """
        self.clear()
        self.dire("abonne", dossier=COMMUN)
        self.add_mascotte(scale=0.9)

        appel = Text("Abonne-toi à la chaîne !", font_size=52, color=JAUNE_TITRE).move_to([0, 1.9, 0])
        poignee = Text("@eleveai974", font_size=64, color=BLEU_CALCUL).move_to([0, 0.75, 0])
        cadre = SurroundingRectangle(poignee, color=BLEU_CALCUL, buff=0.32, stroke_width=3)

        site = Text("Toutes les fiches sur eleveai.fr", font_size=32, color=VERT_OK).move_to([0, -0.75, 0])
        auteur = Text("Frédéric Lacoste — La Réunion", font_size=27, color=WHITE).move_to([0, -1.65, 0])

        self.play(Write(appel))
        self.play(GrowFromCenter(poignee), Create(cadre))
        self.play(Flash(poignee, color=BLEU_CALCUL, line_length=0.35))
        self.play(FadeIn(site, shift=UP * 0.2))
        self.play(FadeIn(auteur))
        self.attendre_voix(marge=1.4)

    # ══════════════════════════════════════════════════════════════════════════
    # LES ÉCRANS DE LA NOTION
    # ══════════════════════════════════════════════════════════════════════════

    # ── écran 1 : racine_calcul ─────────────────────────────────────────────

    def ecran_definition(self):
        self.clear()
        self.add_mascotte()
        self.dire("01-definition")
        self.titre_ecran("Une racine, c'est un nombre")

        regle = Text(
            "√a est le nombre POSITIF dont le carré vaut a.",
            font_size=32, color=WHITE,
        ).move_to([0, 2.0, 0])
        self.play(Write(regle))
        self.wait(0.8)

        # La droite graduée : une racine se place, comme n'importe quel nombre.
        # ⛔ `label_constructor=Text` EST OBLIGATOIRE. Par défaut, Manim écrit
        # les graduations en `DecimalNumber`, qui passe par LaTeX — absent de
        # cette machine : le rendu s'arrête net sur un `FileNotFoundError` qui
        # ne nomme ni LaTeX ni la ligne fautive. Même règle pour `Axes`.
        axe = NumberLine(
            x_range=[0, 4, 1], length=9.5, include_numbers=True,
            label_constructor=Text, font_size=26, color=WHITE,
        ).move_to([0, 0.2, 0])
        self.play(Create(axe))

        # ⛔ √2 (1,41) et √3 (1,73) ne sont séparés que de 0,32 sur l'axe : au
        # rendu du 09/09, leurs deux commentaires s'écrivaient l'un SUR l'autre.
        # D'où le décalage horizontal de l'étiquette (`dx`) et la hauteur propre
        # à chaque commentaire (`dy`) — deux points proches ne commentent jamais
        # à la même ligne.
        # ⚠️ dy ≥ 1,05 : sous 1,0 le commentaire s'écrit SUR les graduations de
        # l'axe (constaté au rendu). Les nombres de la droite occupent la bande
        # juste sous elle — on ne commente jamais dans cette bande.
        marques = [
            (1.41, "√2", "environ 1,41", ROUGE_ERREUR, -0.30, -1.05),
            (1.73, "√3", "environ 1,73", ORANGE_RETENUE, +0.30, -1.68),
            (3.00, "√9", "= 3, tout rond", VERT_OK, 0.00, -1.05),
        ]
        for valeur, nom, commentaire, couleur, dx, dy in marques:
            p = Dot(axe.n2p(valeur), color=couleur, radius=0.09)
            etiq = Text(nom, font_size=30, color=couleur)
            etiq.next_to(p, UP, buff=0.22).shift(RIGHT * dx)
            com = Text(commentaire, font_size=22, color=couleur)
            com.move_to(p.get_center() + DOWN * abs(dy) + RIGHT * dx)
            self.play(GrowFromCenter(p), FadeIn(etiq, shift=DOWN * 0.15), FadeIn(com))
            self.wait(0.4)

        self.play(Write(self.chute("√2 n'est pas un symbole étrange : c'est un point sur la droite.")))
        self.attendre_voix()

    # ── écran 1 bis : les carrés parfaits (l'outil du chapitre) ─────────────

    def ecran_carres_parfaits(self):
        self.clear()
        self.add_mascotte()
        self.dire("02-carres")
        self.titre_ecran("Les carrés parfaits : à connaître par cœur")

        pourquoi = Text(
            "Ce sont les racines qui tombent juste. Sans elles, rien ne se simplifie.",
            font_size=27, color=WHITE,
        ).move_to([0, 2.1, 0])
        self.play(Write(pourquoi))

        # ⚠️ Dix cases centrées mangeaient toute la largeur : les légendes
        # « le nombre » et « sa racine » sortaient du cadre par la gauche. Cases
        # resserrées (1,0 au lieu de 1,15) et bande décalée à droite pour leur
        # laisser 1,4 unité.
        valeurs = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
        cases = VGroup()
        for i, v in enumerate(valeurs):
            boite = VGroup(
                Rectangle(width=1.0, height=0.75, stroke_width=2, color=BLEU_CALCUL),
                Text(str(v), font_size=24, color=WHITE),
            )
            cases.add(boite)
        cases.arrange(RIGHT, buff=0.10).move_to([0.95, 0.85, 0])

        racines = VGroup()
        for i, v in enumerate(valeurs):
            r = Text(str(int(v ** 0.5)), font_size=30, color=VERT_OK)
            r.move_to(cases[i].get_center() + DOWN * 1.15)
            racines.add(r)

        legende_h = Text("le nombre", font_size=22, color=BLEU_CALCUL)
        legende_h.next_to(cases, LEFT, buff=0.25).shift(UP * 0.0)
        legende_b = Text("sa racine", font_size=22, color=VERT_OK)
        legende_b.next_to(racines, LEFT, buff=0.25)

        self.play(LaggedStart(*[FadeIn(c, shift=DOWN * 0.2) for c in cases], lag_ratio=0.12))
        self.play(FadeIn(legende_h))
        self.play(LaggedStart(*[GrowFromCenter(r) for r in racines], lag_ratio=0.12))
        self.play(FadeIn(legende_b))
        self.wait(1.0)

        self.play(Indicate(cases[4], color=JAUNE_TITRE), Indicate(racines[4], color=JAUNE_TITRE))
        self.play(Write(self.chute("25 donne 5, car 5 × 5 = 25.", color=JAUNE_TITRE)))
        self.attendre_voix()

    # ── écran 2 : racine_domaine ────────────────────────────────────────────

    def ecran_domaine(self):
        self.clear()
        self.add_mascotte()
        self.dire("03-domaine")
        self.titre_ecran("Elle refuse les négatifs — et ça se VOIT")

        axes = Axes(
            x_range=[-2, 6, 1], y_range=[-1, 3, 1],
            x_length=7.5, y_length=4.0,
            axis_config={"include_numbers": True, "label_constructor": Text, "font_size": 22},
            tips=False,
        ).move_to([-0.8, -0.35, 0])
        self.play(Create(axes))

        courbe = axes.plot(lambda x: x ** 0.5, x_range=[0, 6, 0.05], color=BLEU_CALCUL, stroke_width=5)
        nom = Text("y = √x", font_size=28, color=BLEU_CALCUL).next_to(axes.c2p(6, 2.45), RIGHT, buff=0.1)
        self.play(Create(courbe), FadeIn(nom))
        self.wait(0.6)

        # 4 a une image.
        p4 = Dot(axes.c2p(4, 2), color=VERT_OK, radius=0.09)
        v4 = DashedLine(axes.c2p(4, 0), axes.c2p(4, 2), color=VERT_OK, stroke_width=3)
        h4 = DashedLine(axes.c2p(4, 2), axes.c2p(0, 2), color=VERT_OK, stroke_width=3)
        lect = Text("4 a une image : √4 = 2", font_size=28, color=VERT_OK).move_to([3.7, 1.9, 0])
        self.play(Create(v4), Create(h4), GrowFromCenter(p4))
        self.play(Write(lect))
        self.wait(1.0)

        # −1 n'en a aucune : la courbe n'existe pas à gauche de zéro.
        zone = Rectangle(
            width=abs(axes.c2p(0, 0)[0] - axes.c2p(-2, 0)[0]),
            height=abs(axes.c2p(0, 3)[1] - axes.c2p(0, -1)[1]),
            stroke_width=0, fill_color=ROUGE_ERREUR, fill_opacity=0.18,
        ).move_to((axes.c2p(-2, -1) + axes.c2p(0, 3)) / 2)
        # ⚠️ Au centre de la zone, « rien ici » tombait sur les graduations de
        # l'axe vertical. On le monte dans le coin haut-gauche de la zone.
        vide = Text("rien ici", font_size=24, color=ROUGE_ERREUR).move_to(axes.c2p(-1.05, 2.35))
        self.play(FadeIn(zone), FadeIn(vide))

        self.play(Write(self.chute("−1 n'a AUCUNE image : la courbe s'arrête à zéro.", color=ROUGE_ERREUR)))
        self.attendre_voix()

    # ── écran 3 : racine_carre_de_a2 ────────────────────────────────────────

    def ecran_racine_d_un_carre(self):
        self.clear()
        self.add_mascotte()
        self.dire("04-carre-a2")
        self.titre_ecran("La racine d'un carré")

        regle = self.radical("a²", font_size=46, color=BLEU_CALCUL)
        egal = Text("=", font_size=46, color=WHITE)
        val = Text("|a|", font_size=46, color=VERT_OK)
        ligne = VGroup(regle, egal, val).arrange(RIGHT, buff=0.3).move_to([0, 1.85, 0])
        self.play(FadeIn(regle, shift=RIGHT * 0.3), Write(egal), GrowFromCenter(val))
        self.wait(0.7)

        precision = Text(
            "et non « a » : une racine rend TOUJOURS un résultat positif.",
            font_size=27, color=WHITE,
        ).next_to(ligne, DOWN, buff=0.45)
        self.play(Write(precision))
        self.wait(0.8)

        # On le teste sur un positif, puis sur un négatif.
        def essai(a, x):
            # ⚠️ Le signe moins typographique (−, U+2212), pas le tiret ASCII :
            # le reste de la vidéo l'écrit ainsi, et « -5 » à côté de « −5 »
            # se voit à l'écran.
            depart = Text(f"a = {a}".replace("-", "−"), font_size=30, color=JAUNE_TITRE).move_to([x, -0.35, 0])
            carre = Text(f"a² = {a * a}", font_size=30, color=BLEU_CALCUL).move_to([x, -1.05, 0])
            rac = self.radical(a * a, font_size=30, color=VERT_OK).move_to([x - 0.35, -1.8, 0])
            res = Text(f"= {abs(a)}", font_size=30, color=VERT_OK).next_to(rac, RIGHT, buff=0.18)
            return depart, carre, rac, res

        d1, c1, r1, s1 = essai(5, -3.1)
        d2, c2, r2, s2 = essai(-5, 2.4)

        self.play(Write(d1), Write(c1))
        self.play(FadeIn(r1), Write(s1))
        self.wait(0.7)
        self.play(Write(d2), Write(c2))
        self.play(FadeIn(r2), Write(s2))
        self.wait(0.6)

        self.play(Write(self.chute("5 et −5 donnent le MÊME résultat : 5. Le signe a disparu.", color=ORANGE_RETENUE)))
        self.play(Circumscribe(VGroup(s1, s2), color=ORANGE_RETENUE, buff=0.2))
        self.attendre_voix()

    # ── écran 4 : racine_produit ────────────────────────────────────────────

    def ecran_produit(self):
        self.clear()
        self.add_mascotte()
        self.dire("05-produit")
        self.titre_ecran("Le PRODUIT passe")

        regle_g = self.radical("a × b", font_size=42, color=BLEU_CALCUL)
        eg = Text("=", font_size=42, color=WHITE)
        regle_d1 = self.radical("a", font_size=42, color=BLEU_CALCUL)
        fois = Text("×", font_size=42, color=WHITE)
        regle_d2 = self.radical("b", font_size=42, color=BLEU_CALCUL)
        regle = VGroup(regle_g, eg, regle_d1, fois, regle_d2).arrange(RIGHT, buff=0.25)
        regle.move_to([0, 2.25, 0])
        self.play(LaggedStart(FadeIn(regle_g), Write(eg), FadeIn(regle_d1), Write(fois), FadeIn(regle_d2), lag_ratio=0.3))
        self.wait(0.5)

        # ⭐ LA CONDITION, ET ELLE N'EST PAS DÉCORATIVE (Frédéric, 09/09/2026) :
        # « le produit se décompose si a et b positifs ». Sans elle la règle est
        # fausse — √((−1) × (−1)) vaut 1, alors que √(−1) n'existe même pas.
        # Elle s'affiche SOUS la règle, jamais dans un coin : elle en fait partie.
        condition = Text("à condition que a ≥ 0 et b ≥ 0", font_size=26, color=JAUNE_TITRE)
        condition.next_to(regle, DOWN, buff=0.28)
        self.play(FadeIn(condition, shift=UP * 0.15))
        self.play(Indicate(condition, color=JAUNE_TITRE))
        self.wait(0.4)

        verif = Text("On vérifie sur des carrés parfaits, où tout se calcule :",
                     font_size=27, color=WHITE).move_to([0, 1.05, 0])
        self.play(Write(verif))

        # Chemin de gauche : on multiplie d'abord.
        g1 = self.radical("4 × 9", font_size=36, color=WHITE).move_to([-3.2, 0.25, 0])
        g2 = self.radical(36, font_size=36, color=WHITE).move_to([-3.2, -0.7, 0])
        g3 = Text("= 6", font_size=38, color=VERT_OK).move_to([-3.2, -1.6, 0])
        fl_g = Arrow(g1.get_bottom(), g2.get_top(), buff=0.08, color=WHITE, stroke_width=3)

        # Chemin de droite : on prend les racines d'abord.
        d1a = self.radical(4, font_size=36, color=WHITE)
        d1b = Text("×", font_size=36, color=WHITE)
        d1c = self.radical(9, font_size=36, color=WHITE)
        d1 = VGroup(d1a, d1b, d1c).arrange(RIGHT, buff=0.15).move_to([3.2, 0.25, 0])
        d2 = Text("2 × 3", font_size=36, color=WHITE).move_to([3.2, -0.7, 0])
        d3 = Text("= 6", font_size=38, color=VERT_OK).move_to([3.2, -1.6, 0])
        fl_d = Arrow(d1.get_bottom(), d2.get_top(), buff=0.08, color=WHITE, stroke_width=3)

        self.play(FadeIn(d1, shift=LEFT * 0.3), FadeIn(g1, shift=RIGHT * 0.3))
        self.play(Create(fl_g), Create(fl_d))
        self.play(FadeIn(g2), FadeIn(d2))
        self.play(Write(g3), Write(d3))
        self.wait(0.6)

        self.play(Circumscribe(VGroup(g3, d3), color=VERT_OK, buff=0.25))
        self.play(Write(self.chute("Les deux chemins donnent 6. La règle est vraie.", color=VERT_OK)))
        self.attendre_voix()

    # ── écran 5 : racine_somme (LE piège du chapitre) ───────────────────────

    def ecran_somme_interdite(self):
        self.clear()
        self.add_mascotte()
        self.dire("06-somme")
        self.titre_ecran("La SOMME, elle, ne passe pas")

        alerte = Text(
            "L'erreur imite la règle du produit — c'est ce qui la rend tenace.",
            font_size=27, color=WHITE,
        ).move_to([0, 2.05, 0])
        self.play(Write(alerte))

        # Même mise en scène que l'écran précédent : deux chemins, deux résultats.
        g1 = self.radical("9 + 16", font_size=36, color=WHITE).move_to([-3.2, 0.85, 0])
        g2 = self.radical(25, font_size=36, color=WHITE).move_to([-3.2, -0.1, 0])
        g3 = Text("= 5", font_size=42, color=VERT_OK).move_to([-3.2, -1.05, 0])
        fl_g = Arrow(g1.get_bottom(), g2.get_top(), buff=0.08, color=WHITE, stroke_width=3)

        d1a = self.radical(9, font_size=36, color=WHITE)
        d1b = Text("+", font_size=36, color=WHITE)
        d1c = self.radical(16, font_size=36, color=WHITE)
        d1 = VGroup(d1a, d1b, d1c).arrange(RIGHT, buff=0.15).move_to([3.2, 0.85, 0])
        d2 = Text("3 + 4", font_size=36, color=WHITE).move_to([3.2, -0.1, 0])
        d3 = Text("= 7", font_size=42, color=ROUGE_ERREUR).move_to([3.2, -1.05, 0])
        fl_d = Arrow(d1.get_bottom(), d2.get_top(), buff=0.08, color=WHITE, stroke_width=3)

        self.play(FadeIn(g1, shift=RIGHT * 0.3), FadeIn(d1, shift=LEFT * 0.3))
        self.play(Create(fl_g), Create(fl_d))
        self.play(FadeIn(g2), FadeIn(d2))
        self.play(Write(g3), Write(d3))
        self.wait(0.8)

        # Le verdict : 5 et 7 ne sont pas le même nombre.
        verdict = Text("5 ≠ 7", font_size=50, color=ROUGE_ERREUR).move_to([0, -1.05, 0])
        self.play(GrowFromCenter(verdict), Flash(verdict, color=ROUGE_ERREUR, line_length=0.3))
        self.wait(0.5)

        self.play(Write(self.chute("√(a + b) n'est PAS √a + √b. Jamais.", color=ROUGE_ERREUR, font_size=32)))
        self.attendre_voix()

    # ── écran 6 : racine_simplification ─────────────────────────────────────

    def ecran_simplifier(self):
        self.clear()
        self.add_mascotte()
        self.dire("07-simplifier")
        self.titre_ecran("Simplifier : sortir le carré caché")

        etape1 = Text("1. Je cherche le plus GRAND carré parfait qui divise le nombre.",
                      font_size=27, color=WHITE).move_to([0, 2.15, 0])
        self.play(Write(etape1))

        # 50 = 25 × 2, et 25 est un carré parfait.
        dep = self.radical(50, font_size=48, color=JAUNE_TITRE).move_to([-4.0, 0.9, 0])
        self.play(FadeIn(dep, shift=DOWN * 0.3))
        self.wait(0.4)

        dec = self.radical("25 × 2", font_size=44, color=WHITE).move_to([-0.6, 0.9, 0])
        fl1 = Arrow(dep.get_right(), dec.get_left(), buff=0.25, color=BLEU_CALCUL, stroke_width=3)
        self.play(Create(fl1), FadeIn(dec))
        self.play(Indicate(dec, color=BLEU_CALCUL))
        self.wait(0.4)

        etape2 = Text("2. Le carré SORT en devenant sa racine ; le reste demeure dessous.",
                      font_size=27, color=WHITE).move_to([0, -0.15, 0])
        self.play(Write(etape2))

        sortie = self.radical(2, coefficient="5", font_size=48, color=VERT_OK).move_to([3.4, 0.9, 0])
        fl2 = Arrow(dec.get_right(), sortie.get_left(), buff=0.25, color=VERT_OK, stroke_width=3)
        self.play(Create(fl2), FadeIn(sortie, shift=RIGHT * 0.3))
        self.play(Circumscribe(sortie, color=VERT_OK, buff=0.2))
        self.wait(0.8)

        # La même mécanique sur trois autres nombres : l'élève voit le motif.
        autres = VGroup()
        for nombre, carre, coef, reste in [(12, "4 × 3", "2", 3), (75, "25 × 3", "5", 3), (48, "16 × 3", "4", 3)]:
            a = self.radical(nombre, font_size=30, color=WHITE)
            b = Text("=", font_size=30, color=WHITE)
            c = self.radical(carre, font_size=30, color=WHITE)
            d = Text("=", font_size=30, color=WHITE)
            e = self.radical(reste, coefficient=coef, font_size=30, color=VERT_OK)
            autres.add(VGroup(a, b, c, d, e).arrange(RIGHT, buff=0.18))
        autres.arrange(DOWN, buff=0.35, aligned_edge=LEFT).move_to([-0.6, -1.75, 0])
        self.play(LaggedStart(*[FadeIn(l, shift=UP * 0.2) for l in autres], lag_ratio=0.35))
        self.attendre_voix()

    # ── écran 7 : le défi (la vraie question du contrôle commun) ────────────

    def ecran_defi(self):
        self.clear()
        self.add_mascotte(scale=0.65)
        self.dire("08-defi")
        titre = Text("Défi", font_size=48, color=JAUNE_TITRE).to_edge(UP)
        self.play(Write(titre))

        origine = Text("La vraie question, tombée au contrôle commun de mars.",
                       font_size=25, color=BLEU_CALCUL).move_to([0, 2.1, 0])
        self.play(FadeIn(origine))

        c = Text("C =", font_size=44, color=WHITE)
        r1 = self.radical(75, font_size=44, color=WHITE)
        moins = Text("−", font_size=44, color=WHITE)
        r2 = self.radical(48, font_size=44, color=WHITE)
        enonce = VGroup(c, r1, moins, r2).arrange(RIGHT, buff=0.25).move_to([0, 0.95, 0])
        self.play(FadeIn(enonce, shift=DOWN * 0.25))
        self.wait(0.5)

        consigne = Text("Écris C sous la forme a√3.", font_size=36, color=JAUNE_TITRE).move_to([0, -0.15, 0])
        self.play(Write(consigne))

        indice = Text("Indice : les deux racines cachent le même carré... et le même √3.",
                      font_size=26, color=BLEU_CALCUL).move_to([0, -1.15, 0])
        self.play(FadeIn(indice, shift=UP * 0.2))

        pause = self.chute("Mets pause et cherche !", color=ORANGE_RETENUE, font_size=32)
        self.play(Write(pause), Flash(pause, color=ORANGE_RETENUE, line_length=0.25))
        # ⭐ Le défi garde une pause EN PLUS de la voix : c'est le seul écran où
        # l'élève doit travailler, pas regarder.
        self.attendre_voix(marge=4.0)

    # ── écran 8 : correction (racine_somme, le versant qui MARCHE) ──────────

    def ecran_correction(self):
        self.clear()
        self.add_mascotte()
        self.dire("09-correction")
        self.titre_ecran("Correction")

        e1 = Text("1. Je simplifie CHAQUE racine séparément.", font_size=28, color=WHITE).move_to([0, 2.15, 0])
        self.play(Write(e1))

        # √75 = 5√3
        a1 = self.radical(75, font_size=34, color=WHITE)
        a2 = Text("=", font_size=34, color=WHITE)
        a3 = self.radical("25 × 3", font_size=34, color=WHITE)
        a4 = Text("=", font_size=34, color=WHITE)
        a5 = self.radical(3, coefficient="5", font_size=34, color=VERT_OK)
        lgn1 = VGroup(a1, a2, a3, a4, a5).arrange(RIGHT, buff=0.18).move_to([0, 1.25, 0])
        self.play(FadeIn(lgn1, shift=RIGHT * 0.2))
        self.wait(0.5)

        # √48 = 4√3
        b1 = self.radical(48, font_size=34, color=WHITE)
        b2 = Text("=", font_size=34, color=WHITE)
        b3 = self.radical("16 × 3", font_size=34, color=WHITE)
        b4 = Text("=", font_size=34, color=WHITE)
        b5 = self.radical(3, coefficient="4", font_size=34, color=VERT_OK)
        lgn2 = VGroup(b1, b2, b3, b4, b5).arrange(RIGHT, buff=0.18).move_to([0, 0.45, 0])
        self.play(FadeIn(lgn2, shift=RIGHT * 0.2))
        self.wait(0.5)

        e2 = Text("2. Même radical (√3) : je soustrais les coefficients.",
                  font_size=28, color=WHITE).move_to([0, -0.4, 0])
        self.play(Write(e2))
        self.play(Indicate(a5, color=JAUNE_TITRE), Indicate(b5, color=JAUNE_TITRE))

        comme = Text("exactement comme 5x − 4x = x", font_size=25, color=BLEU_CALCUL).move_to([0, -1.05, 0])
        self.play(FadeIn(comme))
        self.wait(0.6)

        f1 = Text("C =", font_size=40, color=WHITE)
        f2 = self.radical(3, coefficient="5", font_size=40, color=WHITE)
        f3 = Text("−", font_size=40, color=WHITE)
        f4 = self.radical(3, coefficient="4", font_size=40, color=WHITE)
        f5 = Text("=", font_size=40, color=VERT_OK)
        f6 = self.radical(3, font_size=40, color=VERT_OK)
        final = VGroup(f1, f2, f3, f4, f5, f6).arrange(RIGHT, buff=0.22).move_to([0, -2.0, 0])
        self.play(FadeIn(final, shift=UP * 0.25))
        self.play(Circumscribe(VGroup(f5, f6), color=VERT_OK, buff=0.2))

        self.play(Write(self.chute("donc a = 1", color=VERT_OK)))
        self.attendre_voix()

    # ── déroulé ─────────────────────────────────────────────────────────────

    def construct(self):
        self.page_de_garde(
            titre="La racine carrée",
            accroche="√9 + √16, ça fait √25 ?",
            promesse="Simplifier · additionner · ne plus tomber dans le piège",
        )
        # ⭐ Les trois objectifs sont ANNONCÉS ici et REPRIS cochés à la fin.
        # Ils regroupent les 6 micros de `racine_carree_2de` en trois
        # savoir-faire — la formulation reste celle du coach, pour que l'élève
        # la reconnaisse en allant s'entraîner.
        self.page_objectifs([
            "simplifier une racine : √50 = 5√2",
            "additionner deux racines — et voir quand c'est impossible",
            "expliquer pourquoi √(−9) n'existe pas",
        ])
        self.ecran_definition()
        self.ecran_carres_parfaits()
        self.ecran_domaine()
        self.ecran_racine_d_un_carre()
        self.ecran_produit()
        self.ecran_somme_interdite()
        self.ecran_simplifier()
        self.ecran_defi()
        self.ecran_correction()
        self.page_finale(
            # ⚠️ MÊME ORDRE que `page_objectifs()` : la clôture répond à
            # l'annonce, objectif par objectif.
            points=[
                "simplifier : sortir le plus grand carré, √50 = 5√2",
                "additionner seulement à radical identique",
                "√(a × b) = √a × √b si a ≥ 0 et b ≥ 0, mais JAMAIS pour une somme",
            ],
            rappel="√9 + √16 = 7, pas 5. Vérifie toujours sur des carrés parfaits.",
        )
        self.page_abonnement()


# ══════════════════════════════════════════════════════════════════════════════
#  LE SHORT 9:16 — l'appât, pas le cours
#
# ⭐ FORME DÉCIDÉE PAR FRÉDÉRIC (09/09/2026) : « des shorts simples qui renvoient
# à la chaîne YouTube ». Le Short ne rejoue donc PAS la notion : il prend UN seul
# micro — ici `racine_somme`, le piège du chapitre — le retourne en 40 secondes,
# et renvoie à la vidéo longue. Un short par notion, pas un short par micro.
#
# ⭐ LE MÊME FICHIER SERT YOUTUBE **ET** INSTAGRAM : 1080×1920 vaut pour les
# Shorts, les Reels et TikTok. Ce qui diffère n'est pas la vidéo, c'est la
# ZONE SÛRE — Instagram recouvre le haut (nom du compte) en plus du bas. D'où la
# règle ci-dessous : rien de vital au-dessus de y = +3,0 ni sous y = −2,2.
# ⚠️ Sur les deux plateformes RIEN N'EST CLIQUABLE : la poignée s'écrit.
#
# Rendu :
#   python -m manim render -qh -r 1080,1920 --disable_caching \
#     manim/scripts/seconde/racine_carree_2de.py RacineCarree2deShort \
#     -o eleveai-maths-seconde-racine-carree-2de-short --media_dir manim/scripts/seconde/media
# ══════════════════════════════════════════════════════════════════════════════

_SONS = Path(__file__).resolve().parents[3] / "public" / "sons"
VOIX_SHORT = _SONS / "seconde-racine-carree-2de-short"
VOIX_SHORT_SIMPLIFIER = _SONS / "seconde-racine-carree-2de-short-simplifier"
VOIX_SHORT_NEGATIF = _SONS / "seconde-racine-carree-2de-short-negatif"


class RacineCarree2deShort(RacineCarree2de):
    """Short n°1 — le piège de la somme (micro `racine_somme`).

    ⭐ SERT AUSSI DE BASE aux autres shorts de la notion : le cadre vertical,
    la mascotte basse et l'écran de renvoi sont écrits ICI une seule fois. Un
    short de plus = une sous-classe, son `dossier_voix` et son `construct`.
    """

    dossier_voix = VOIX_SHORT

    def __init__(self, **kwargs):
        # ⛔ AVANT super().__init__() : `-r 1080,1920` ne change que les PIXELS,
        # pas le cadre logique. Sans ces deux lignes, tout le texte déborde.
        config.frame_height = 8.0
        config.frame_width = 4.5
        super().__init__(**kwargs)

    def dire(self, nom, dossier=None):
        return super().dire(nom, dossier=dossier or self.dossier_voix)

    def margo_bas(self):
        """Ti-Margo dans la bande basse — celle que l'interface recouvre.

        Il n'y porte aucune information : c'est la signature visuelle, elle peut
        être masquée chez une partie des spectateurs sans rien coûter.
        """
        m = MascotteMargouillat().scale(0.38).move_to([0, -3.45, 0])
        self.add(m)
        return m

    # ── 1. l'accroche — c'est CETTE image que YouTube prélève à 1 seconde ──

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")

        g = self.radical(9, font_size=42, color=WHITE)
        plus = Text("+", font_size=42, color=WHITE)
        d = self.radical(16, font_size=42, color=WHITE)
        ligne = VGroup(g, plus, d).arrange(RIGHT, buff=0.16).move_to([0, 1.55, 0])

        eg = Text("=", font_size=42, color=WHITE).move_to([-0.75, 0.55, 0])
        r25 = self.radical(25, font_size=42, color=JAUNE_TITRE).move_to([0.15, 0.55, 0])
        inter = Text("?", font_size=64, color=JAUNE_TITRE).move_to([1.35, 0.55, 0])

        # ⭐ Tout est posé en DEUX temps : à la première seconde, la question
        # doit déjà être entière à l'écran.
        self.play(FadeIn(ligne, shift=DOWN * 0.2), run_time=0.5)
        self.play(FadeIn(eg), FadeIn(r25), GrowFromCenter(inter), run_time=0.5)
        self.play(Flash(inter, color=JAUNE_TITRE, line_length=0.3), run_time=0.6)

        piste = Text("Beaucoup répondent oui.", font_size=26, color=BLEU_CALCUL).move_to([0, -0.75, 0])
        self.play(Write(piste))
        self.attendre_voix(marge=0.4)

    # ── 2. le chemin juste ──────────────────────────────────────────────────

    def ecran_gauche(self):
        self.clear()
        self.margo_bas()
        self.dire("01-gauche")

        titre = Text("On calcule.", font_size=32, color=JAUNE_TITRE).move_to([0, 2.85, 0])
        self.play(Write(titre))

        a = self.radical("9 + 16", font_size=38, color=WHITE).move_to([0, 1.6, 0])
        fl = Arrow([0, 1.15, 0], [0, 0.45, 0], buff=0.05, color=BLEU_CALCUL, stroke_width=3)
        b = self.radical(25, font_size=38, color=WHITE).move_to([0, 0.05, 0])
        c = Text("= 5", font_size=52, color=VERT_OK).move_to([0, -1.15, 0])

        self.play(FadeIn(a, shift=DOWN * 0.2))
        self.play(Create(fl), FadeIn(b))
        self.play(GrowFromCenter(c))
        self.attendre_voix(marge=0.4)

    # ── 3. le chemin qu'on croit vrai ───────────────────────────────────────

    def ecran_droite(self):
        self.clear()
        self.margo_bas()
        self.dire("02-droite")

        titre = Text("Et si on sépare ?", font_size=32, color=JAUNE_TITRE).move_to([0, 2.85, 0])
        self.play(Write(titre))

        g = self.radical(9, font_size=38, color=WHITE)
        p = Text("+", font_size=38, color=WHITE)
        d = self.radical(16, font_size=38, color=WHITE)
        ligne = VGroup(g, p, d).arrange(RIGHT, buff=0.16).move_to([0, 1.6, 0])

        fl = Arrow([0, 1.15, 0], [0, 0.45, 0], buff=0.05, color=BLEU_CALCUL, stroke_width=3)
        etape = Text("3 + 4", font_size=40, color=WHITE).move_to([0, 0.05, 0])
        res = Text("= 7", font_size=52, color=ROUGE_ERREUR).move_to([0, -1.15, 0])

        self.play(FadeIn(ligne, shift=DOWN * 0.2))
        self.play(Create(fl), FadeIn(etape))
        self.play(GrowFromCenter(res))
        self.attendre_voix(marge=0.4)

    # ── 4. le verdict ───────────────────────────────────────────────────────

    def ecran_verdict(self):
        self.clear()
        self.margo_bas()
        self.dire("03-verdict")

        choc = Text("5 ≠ 7", font_size=88, color=ROUGE_ERREUR).move_to([0, 1.75, 0])
        self.play(GrowFromCenter(choc))
        self.play(Flash(choc, color=ROUGE_ERREUR, line_length=0.45))

        regle = VGroup(
            Text("√(a + b)", font_size=36, color=WHITE),
            Text("n'est PAS", font_size=30, color=ROUGE_ERREUR),
            Text("√a + √b", font_size=36, color=WHITE),
        ).arrange(DOWN, buff=0.32).move_to([0, -0.35, 0])
        self.play(LaggedStart(*[FadeIn(m, shift=UP * 0.15) for m in regle], lag_ratio=0.35))

        jamais = Text("Jamais.", font_size=38, color=ROUGE_ERREUR).move_to([0, -1.95, 0])
        self.play(Write(jamais))
        self.attendre_voix(marge=0.4)

    # ── 5. ce qu'il faut retenir ────────────────────────────────────────────

    def ecran_regle(self):
        self.clear()
        self.margo_bas()
        self.dire("04-regle")

        titre = Text("À retenir", font_size=38, color=JAUNE_TITRE).move_to([0, 2.9, 0])
        self.play(Write(titre))

        oui = VGroup(
            Text("le PRODUIT", font_size=32, color=VERT_OK),
            Text("√(a × b) = √a × √b", font_size=28, color=WHITE),
            Text("si a ≥ 0 et b ≥ 0", font_size=22, color=JAUNE_TITRE),
        ).arrange(DOWN, buff=0.22).move_to([0, 1.35, 0])
        cadre_oui = SurroundingRectangle(oui, color=VERT_OK, buff=0.22, stroke_width=2.5)

        non = VGroup(
            Text("la SOMME", font_size=32, color=ROUGE_ERREUR),
            Text("√(a + b) ≠ √a + √b", font_size=28, color=WHITE),
        ).arrange(DOWN, buff=0.22).move_to([0, -0.85, 0])
        cadre_non = SurroundingRectangle(non, color=ROUGE_ERREUR, buff=0.22, stroke_width=2.5)

        self.play(FadeIn(oui), Create(cadre_oui))
        self.play(FadeIn(non), Create(cadre_non))
        self.play(Write(self.chute("Teste sur des carrés parfaits.", color=BLEU_CALCUL, font_size=24)))
        self.attendre_voix(marge=0.4)

    # ── 6. le renvoi — l'objet même du Short ────────────────────────────────

    def ecran_renvoi(self):
        self.clear()
        self.margo_bas()
        self.dire("05-fin")

        # ⚠️ Bloc HAUT et CENTRE : sur Instagram la légende et les boutons
        # mangent le bas, sur YouTube le titre de la vidéo aussi.
        appel = VGroup(
            Text("La vidéo complète", font_size=34, color=WHITE),
            Text("sur la chaîne", font_size=34, color=WHITE),
        ).arrange(DOWN, buff=0.22).move_to([0, 2.1, 0])
        self.play(LaggedStart(*[Write(m) for m in appel], lag_ratio=0.3))

        poignee = Text("@eleveai974", font_size=42, color=BLEU_CALCUL).move_to([0, 0.65, 0])
        cadre = SurroundingRectangle(poignee, color=BLEU_CALCUL, buff=0.24, stroke_width=3)
        self.play(GrowFromCenter(poignee), Create(cadre))
        self.play(Flash(poignee, color=BLEU_CALCUL, line_length=0.3))

        site = Text("eleveai.fr", font_size=34, color=VERT_OK).move_to([0, -0.85, 0])
        auteur = Text("Frédéric Lacoste", font_size=24, color=WHITE).move_to([0, -1.75, 0])
        lieu = Text("La Réunion", font_size=24, color=WHITE).move_to([0, -2.2, 0])
        self.play(FadeIn(site, shift=UP * 0.15))
        self.play(FadeIn(auteur), FadeIn(lieu))
        self.attendre_voix(marge=1.5)

    def construct(self):
        self.ecran_accroche()
        self.ecran_gauche()
        self.ecran_droite()
        self.ecran_verdict()
        self.ecran_regle()
        self.ecran_renvoi()


# ══════════════════════════════════════════════════════════════════════════════
#  Short n°2 — SIMPLIFIER (micro `racine_simplification`)
#  Trois accroches pour une seule vidéo longue : on mesure laquelle convertit.
# ══════════════════════════════════════════════════════════════════════════════

class RacineCarree2deShortSimplifier(RacineCarree2deShort):

    dossier_voix = VOIX_SHORT_SIMPLIFIER

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")

        r = self.radical(50, font_size=76, color=JAUNE_TITRE).move_to([0, 1.5, 0])
        self.play(FadeIn(r, shift=DOWN * 0.2), run_time=0.5)

        # ⛔ FadeIn ET NON Write : YouTube prélève l'image de couverture à UNE
        # SECONDE. Un `Write` y est encore à mi-course et la vignette montre un
        # mot coupé. À 0,9 s, la question doit être entière à l'écran.
        q = Text("ça se simplifie ?", font_size=34, color=WHITE).move_to([0, 0.15, 0])
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.play(Flash(r, color=JAUNE_TITRE, line_length=0.4))
        self.attendre_voix(marge=0.4)

    def ecran_carre(self):
        self.clear()
        self.margo_bas()
        self.dire("01-carre")

        titre = Text("Le plus GRAND carré", font_size=30, color=JAUNE_TITRE).move_to([0, 2.9, 0])
        self.play(Write(titre))

        depart = self.radical(50, font_size=48, color=WHITE).move_to([0, 1.7, 0])
        self.play(FadeIn(depart))

        fl = Arrow([0, 1.2, 0], [0, 0.55, 0], buff=0.05, color=BLEU_CALCUL, stroke_width=3)
        dec = self.radical("25 × 2", font_size=44, color=WHITE).move_to([0, 0.1, 0])
        self.play(Create(fl), FadeIn(dec))

        note = Text("25 est un carré parfait", font_size=26, color=VERT_OK).move_to([0, -1.1, 0])
        self.play(Write(note), Indicate(dec, color=VERT_OK))
        self.attendre_voix(marge=0.4)

    def ecran_sortir(self):
        self.clear()
        self.margo_bas()
        self.dire("02-sortir")

        titre = Text("Le carré SORT", font_size=32, color=JAUNE_TITRE).move_to([0, 2.9, 0])
        self.play(Write(titre))

        dec = self.radical("25 × 2", font_size=44, color=WHITE).move_to([0, 1.6, 0])
        self.play(FadeIn(dec))

        detail = VGroup(
            Text("√25 = 5", font_size=34, color=VERT_OK),
            Text("le 2 reste dessous", font_size=26, color=WHITE),
        ).arrange(DOWN, buff=0.28).move_to([0, 0.35, 0])
        self.play(LaggedStart(*[FadeIn(m, shift=UP * 0.15) for m in detail], lag_ratio=0.35))

        res = self.radical(2, coefficient="5", font_size=54, color=VERT_OK).move_to([0, -1.15, 0])
        self.play(GrowFromCenter(res))
        self.attendre_voix(marge=0.4)

    def ecran_resultat(self):
        self.clear()
        self.margo_bas()
        self.dire("03-resultat")

        g = self.radical(50, font_size=52, color=WHITE)
        eg = Text("=", font_size=52, color=WHITE)
        d = self.radical(2, coefficient="5", font_size=52, color=VERT_OK)
        ligne = VGroup(g, eg, d).arrange(RIGHT, buff=0.22).move_to([0, 1.2, 0])

        self.play(FadeIn(g))
        self.play(Write(eg), GrowFromCenter(d))
        self.play(Circumscribe(d, color=VERT_OK, buff=0.2))
        self.attendre_voix(marge=0.4)

    def ecran_piege(self):
        self.clear()
        self.margo_bas()
        self.dire("04-piege")

        titre = Text("Le piège", font_size=34, color=ROUGE_ERREUR).move_to([0, 3.0, 0])
        self.play(Write(titre))

        sujet = self.radical(72, font_size=40, color=WHITE).move_to([0, 2.1, 0])
        self.play(FadeIn(sujet))

        faux = VGroup(
            Text("72 = 4 × 18", font_size=28, color=WHITE),
            self.radical(18, coefficient="2", font_size=34, color=ROUGE_ERREUR),
            Text("exact, mais pas fini", font_size=22, color=ROUGE_ERREUR),
        ).arrange(DOWN, buff=0.2).move_to([0, 0.75, 0])
        cadre_faux = SurroundingRectangle(faux, color=ROUGE_ERREUR, buff=0.18, stroke_width=2)

        juste = VGroup(
            Text("72 = 36 × 2", font_size=28, color=WHITE),
            self.radical(2, coefficient="6", font_size=34, color=VERT_OK),
            Text("le PLUS GRAND carré", font_size=22, color=VERT_OK),
        ).arrange(DOWN, buff=0.2).move_to([0, -1.35, 0])
        cadre_juste = SurroundingRectangle(juste, color=VERT_OK, buff=0.18, stroke_width=2)

        self.play(FadeIn(faux), Create(cadre_faux))
        self.play(FadeIn(juste), Create(cadre_juste))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_carre()
        self.ecran_sortir()
        self.ecran_resultat()
        self.ecran_piege()
        self.ecran_renvoi()


# ══════════════════════════════════════════════════════════════════════════════
#  Short n°3 — POURQUOI √(−9) N'EXISTE PAS (micro `racine_domaine`)
# ══════════════════════════════════════════════════════════════════════════════

class RacineCarree2deShortNegatif(RacineCarree2deShort):

    dossier_voix = VOIX_SHORT_NEGATIF

    def ecran_accroche(self):
        self.clear()
        self.margo_bas()
        self.dire("00-accroche")

        r = self.radical("−9", font_size=80, color=ROUGE_ERREUR).move_to([0, 1.6, 0])
        self.play(FadeIn(r, shift=DOWN * 0.2), run_time=0.5)

        q = VGroup(
            Text("Pourquoi", font_size=32, color=WHITE),
            Text("ça n'existe pas ?", font_size=32, color=WHITE),
        ).arrange(DOWN, buff=0.2).move_to([0, 0.1, 0])
        # ⛔ Même règle que le short « simplifier » : les deux lignes arrivent
        # ENSEMBLE et vite, pour que l'image de 1 s porte la question entière.
        self.play(FadeIn(q, shift=UP * 0.15), run_time=0.4)
        self.play(Flash(r, color=ROUGE_ERREUR, line_length=0.4))
        self.attendre_voix(marge=0.4)

    def ecran_carres(self):
        self.clear()
        self.margo_bas()
        self.dire("01-carre")

        titre = Text("Un carré est positif", font_size=30, color=JAUNE_TITRE).move_to([0, 2.9, 0])
        self.play(Write(titre))

        a = Text("3 × 3 = 9", font_size=38, color=VERT_OK).move_to([0, 1.5, 0])
        b = Text("(−3) × (−3) = 9", font_size=38, color=VERT_OK).move_to([0, 0.4, 0])
        self.play(FadeIn(a, shift=RIGHT * 0.2))
        self.play(FadeIn(b, shift=LEFT * 0.2))
        self.play(Indicate(b, color=JAUNE_TITRE))

        note = Text("moins par moins : plus", font_size=26, color=WHITE).move_to([0, -0.7, 0])
        self.play(Write(note))
        self.attendre_voix(marge=0.4)

    def ecran_aucun(self):
        self.clear()
        self.margo_bas()
        self.dire("02-aucun")

        phrase = VGroup(
            Text("Aucun nombre", font_size=34, color=WHITE),
            Text("multiplié par lui-même", font_size=30, color=WHITE),
            Text("ne donne −9", font_size=36, color=ROUGE_ERREUR),
        ).arrange(DOWN, buff=0.35).move_to([0, 1.1, 0])
        self.play(LaggedStart(*[FadeIn(m, shift=UP * 0.15) for m in phrase], lag_ratio=0.4))
        self.play(Flash(phrase[2], color=ROUGE_ERREUR, line_length=0.3))
        self.attendre_voix(marge=0.4)

    def ecran_courbe(self):
        self.clear()
        self.margo_bas()
        self.dire("03-courbe")

        titre = Text("Et ça se VOIT", font_size=32, color=JAUNE_TITRE).move_to([0, 3.2, 0])
        self.play(Write(titre))

        # ⚠️ Axes RÉDUITS : 4,5 unités de large en tout, moins la marge.
        axes = Axes(
            x_range=[-2, 5, 1], y_range=[0, 3, 1],
            x_length=3.6, y_length=2.6,
            axis_config={"include_numbers": True, "label_constructor": Text, "font_size": 16},
            tips=False,
        ).move_to([0.15, 1.1, 0])
        self.play(Create(axes))

        courbe = axes.plot(lambda x: x ** 0.5, x_range=[0, 5, 0.05], color=BLEU_CALCUL, stroke_width=4)
        self.play(Create(courbe))

        p = Dot(axes.c2p(4, 2), color=VERT_OK, radius=0.07)
        lect = Text("√4 = 2", font_size=24, color=VERT_OK).move_to([0, -0.75, 0])
        self.play(GrowFromCenter(p), Write(lect))

        zone = Rectangle(
            width=abs(axes.c2p(0, 0)[0] - axes.c2p(-2, 0)[0]),
            height=abs(axes.c2p(0, 3)[1] - axes.c2p(0, 0)[1]),
            stroke_width=0, fill_color=ROUGE_ERREUR, fill_opacity=0.22,
        ).move_to((axes.c2p(-2, 0) + axes.c2p(0, 3)) / 2)
        self.play(FadeIn(zone))

        rien = Text("rien à gauche de 0", font_size=26, color=ROUGE_ERREUR).move_to([0, -1.55, 0])
        self.play(Write(rien))
        self.attendre_voix(marge=0.4)

    def ecran_regle(self):
        self.clear()
        self.margo_bas()
        self.dire("04-regle")

        titre = Text("À retenir", font_size=36, color=JAUNE_TITRE).move_to([0, 2.9, 0])
        self.play(Write(titre))

        bloc = VGroup(
            Text("√a existe", font_size=36, color=VERT_OK),
            Text("seulement si", font_size=28, color=WHITE),
            Text("a ≥ 0", font_size=44, color=VERT_OK),
        ).arrange(DOWN, buff=0.3).move_to([0, 1.0, 0])
        cadre = SurroundingRectangle(bloc, color=VERT_OK, buff=0.28, stroke_width=3)

        self.play(LaggedStart(*[FadeIn(m, shift=UP * 0.15) for m in bloc], lag_ratio=0.35))
        self.play(Create(cadre))
        self.play(Write(self.chute("positif ou nul.", color=BLEU_CALCUL, font_size=26)))
        self.attendre_voix(marge=0.4)

    def construct(self):
        self.ecran_accroche()
        self.ecran_carres()
        self.ecran_aucun()
        self.ecran_courbe()
        self.ecran_regle()
        self.ecran_renvoi()
