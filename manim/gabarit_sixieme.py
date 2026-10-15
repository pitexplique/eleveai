# gabarit_sixieme.py
# LE GABARIT DES VIDÉOS DE NOTION DE 6e, AVEC VOIX.
#
# ── POURQUOI CE MODULE EXISTE (01/10/2026) ────────────────────────────────────
# Les dix-huit scripts de 6e (août 2026) sont MUETS : le texte à l'écran portait
# tout. Frédéric, 01/10 : « il faut rajouter du son ». Les 6e lisent
# difficilement (voir la fiche des décimaux réécrite le 30/09) : la voix porte
# l'explication, l'écran ne garde que les nombres et les dessins.
#
# ⭐ On repart de `NotionBases` : sa page de fin renvoie au COACH, et son
# identité est un paramètre. On n'y change que l'étiquette : « Maths 6e ».
#
# ⭐ `au_mot()` CALE UNE ANIMATION SUR UNE PHRASE DE LA VOIX. Un écran de 6e dit
# cinq ou six choses en trente secondes ; si tout s'anime au début puis attend,
# l'élève voit le 3 bouger pendant que la voix parle du 7. Le texte de la voix
# est relu dans `manim/voix/<nom>.json`, et l'instant visé s'estime au prorata
# des caractères. ⚠️ C'est une estimation : elle dérive d'une seconde au plus
# sur un écran long, ce qui suffit pour qu'un dessin arrive avec sa phrase.
# ⛔ Un extrait introuvable lève une erreur : une faute de frappe ne doit pas
# décaler une animation en silence.
#
# Le débit des voix de 6e est −10 (CP −18, lycée −4), décidé le 01/10/2026.

import json
from pathlib import Path

from manim import *

from charte import *
from gabarit_bases import NotionBases
from gabarit_seconde import SONS, ShortSeconde

VOIX_JSON = Path(__file__).resolve().parent / "voix"


class _Voix6e:
    """La voix, relue en texte pour caler les animations sur les phrases."""

    nom_voix = None  # « 6e-entier-nombre » → public/sons/… et manim/voix/….json

    @property
    def dossier_voix(self):
        return SONS / self.nom_voix

    def _textes(self):
        if not hasattr(self, "_cache_textes"):
            chemin = VOIX_JSON / f"{self.nom_voix}.json"
            self._cache_textes = json.loads(chemin.read_text(encoding="utf-8"))
        return self._cache_textes

    def dire(self, nom, dossier=None):
        duree = super().dire(nom, dossier)
        self._debut_voix = self.renderer.time
        self._duree_voix = duree
        self._texte_voix = self._textes().get(nom, "") if dossier is None else ""
        return duree

    def au_mot(self, extrait):
        """Attend que la voix arrive à `extrait` dans la phrase en cours."""
        texte = self._texte_voix
        i = texte.find(extrait)
        if i < 0:
            raise ValueError(f"« {extrait} » absent de la voix : {texte[:60]}…")
        if not self._duree_voix:
            return
        cible = self._debut_voix + self._duree_voix * i / len(texte)
        reste = cible - self.renderer.time
        if reste > 0.05:
            self.wait(reste)

    # ── les dessins de la 6e ────────────────────────────────────────────────

    def tableau_num(self, entetes, y_ent=1.8, y_case=0.9, largeur=1.9,
                    x_centre=0.0, font_ent=22, h_case=1.0):
        """Le tableau de numération : une colonne par rang, la virgule étroite.

        Renvoie (entêtes, cases, abscisses des colonnes).
        """
        largeurs = [0.6 if e == "," else largeur for e in entetes]
        total = sum(largeurs)
        x = x_centre - total / 2
        xs, ent, cases = [], VGroup(), VGroup()
        for e, w in zip(entetes, largeurs):
            cx = x + w / 2
            xs.append(cx)
            if e != ",":
                cadre = Rectangle(width=w, height=0.6, stroke_width=2, color=BLEU_CALCUL)
                cadre.move_to([cx, y_ent, 0])
                lbl = Text(e, font_size=font_ent, color=BLEU_CALCUL).move_to([cx, y_ent, 0])
                if lbl.width > w - 0.12:
                    lbl.scale_to_fit_width(w - 0.12)
                ent.add(VGroup(cadre, lbl))
                cases.add(Rectangle(width=w, height=h_case, stroke_width=2, color=WHITE)
                          .move_to([cx, y_case, 0]))
            else:
                cases.add(VGroup())
            x += w
        return ent, cases, xs

    def chiffres(self, xs, y, chaine, font_size=56, color=WHITE):
        """Un nombre posé chiffre par chiffre sur les colonnes `xs` (même longueur)."""
        return VGroup(*[Text(c, font_size=font_size, color=color).move_to([x, y, 0])
                        for x, c in zip(xs, chaine)])

    def droite(self, a, b, n, etiquettes, longueur=9.0, centre=(0, 0),
               font_size=28, sous_etiquettes=None):
        """Une droite graduée de `a` à `b`, coupée en `n` parts.

        `etiquettes` : {valeur: texte} écrits sous la droite, en blanc.
        ⛔ Tracée à la main, sans `NumberLine(include_numbers=True)` qui passe
        par LaTeX (absent du poste).
        Renvoie (groupe, fonction valeur → point).
        """
        cx, cy = centre
        x0 = cx - longueur / 2

        def pt(v):
            return np.array([x0 + longueur * (v - a) / (b - a), cy, 0])

        axe = Line(pt(a) + LEFT * 0.3, pt(b) + RIGHT * 0.3, stroke_width=3)
        ticks = VGroup()
        for i in range(n + 1):
            v = a + (b - a) * i / n
            h = 0.16 if i in (0, n) else 0.1
            ticks.add(Line(pt(v) + DOWN * h, pt(v) + UP * h, stroke_width=2))
        labels = VGroup(*[Text(t, font_size=font_size, color=WHITE).move_to(pt(v) + DOWN * 0.5)
                          for v, t in etiquettes.items()])
        return VGroup(axe, ticks, labels), pt

    def point(self, pt, v, texte, color=VERT_OK, font_size=30, haut=True):
        d = Dot(pt(v), color=color, radius=0.11)
        lbl = Text(texte, font_size=font_size, color=color)
        lbl.next_to(d, UP if haut else DOWN, buff=0.28)
        return VGroup(d, lbl)


class Notion6e(_Voix6e, NotionBases):
    """Une vidéo de notion de 6e, format paysage, avec voix."""

    identite = "Maths 6e — EleveAI"


class Short6e(_Voix6e, ShortSeconde):
    """Un short de 6e, format 9:16, avec voix. Il renvoie à la vidéo longue."""
