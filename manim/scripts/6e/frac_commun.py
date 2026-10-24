# frac_commun.py
# EleveAI — série « Fractions » (6e et 4e, 24/10/2026) : les BASES DE SCÈNE
# communes à tous les épisodes. Pas de scène ici. Créé par le pilote 6e 03-egale.
#
# ⭐ Repris SANS LES MODIFIER (import) : manim/scripts/stmg/stats_lycee_j2_commun.py
#   (PaysageJ2 / ShortJ2 : question_pause() avec compte à rebours, synchro par
#   jetons « un nombre n'apparaît pas avant d'être dit », ECRAN/QUESTION t=…
#   imprimés au rendu, finale_colonne() « Ce que tu as appris » titre EN HAUT
#   ET CENTRÉ, page_abonnement() du 19/10, marges ≥ 3 %).
# ⭐ Ajouté ici :
#   · les marques mot à mot (*_marques.json) sont lues À CÔTÉ DU SCRIPT de
#     l'épisode (6e/ ou 4e/), plus dans stmg/ ;
#   · la synchro par jetons IGNORE les objets marqués `sans_synchro`
#     (EcritureFraction, étiquettes de canvas_fractions.py) : « 3/4 » se dit
#     « 3 quarts », le 4 n'est jamais prononcé ; on la pose AU MOT (au_mot) ;
#   · PaysageFrac (identité « Maths 6e — EleveAI », ceinture verte) et
#     ShortFrac (ceinture blanche) ; une 4e change `identite` / `ceinture` ;
#   · inline(s) : « 4/6 » écrit en ligne (comme les choix du coach), sans synchro.
#
# Usage dans un épisode (manim/scripts/<classe>/frac_<slug>.py) :
#   sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "6e"))
#   from frac_commun import *          # PaysageFrac, ShortFrac, P, canvas_fractions…
#   class FracEgaleBase(PaysageFrac):
#       nom_voix = "6e-frac-egale"; fichier_marques = "frac_egale_marques.json"

import inspect
import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))            # manim/
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "stmg"))

from stats_lycee_j2_commun import *  # noqa: E402,F401,F403
from stats_lycee_j2_commun import _a_plat  # noqa: E402,F401
from canvas_fractions import *  # noqa: E402,F401,F403


class _MarquesIci:
    """Les marques mot à mot sont lues dans le dossier du SCRIPT de l'épisode."""

    def _marques(self):
        if not hasattr(self, "_cache_marques"):
            ch = Path(inspect.getfile(type(self))).resolve().parent / self.fichier_marques
            self._cache_marques = json.loads(ch.read_text(encoding="utf-8-sig"))
        return self._cache_marques


class _SansSynchro:
    """La synchro par jetons de SynchroJ2, sauf pour les objets `sans_synchro`."""

    def _nouveaux_textes(self, anims):
        neufs = super()._nouveaux_textes(anims)
        exclus = set()
        for a in _a_plat(anims):
            for m in (getattr(a, "mobject", None), getattr(a, "target_mobject", None)):
                if m is None:
                    continue
                for f in m.get_family():
                    if getattr(f, "sans_synchro", False):
                        exclus.update(id(g) for g in f.get_family())
        return [f for f in neufs if id(f) not in exclus]

    def inline(self, s, fs=34, color=WHITE):
        """Une fraction écrite EN LIGNE (« 4/6 »), comme les choix du coach."""
        t = Text(s, font_size=fs, color=color)
        t.sans_synchro = True
        return t


class _QuestionFigure:
    """question_pause() du lot J2, avec un crochet `avant_q(scene)` joué juste
    après « Question ! » et AVANT la question écrite : une figure qui porte
    des nombres (« 7/3 = …/6 ») y entre AU MOT, jamais avant la voix."""

    def question_pause(self, cle_q, cle_r, question, choix, bonne, phrase, mots_choix=("A :", "B :", "C :"),
                       autres_q=None, autres_r=None, mot_q=None, avant_q=None):
        if avant_q is None:
            return super().question_pause(cle_q, cle_r, question, choix, bonne, phrase, mots_choix, autres_q,
                                          autres_r, mot_q)
        crochet = self.poser_lignes
        etat = {"fait": False}

        def poser(mob, anim="fade", run_time=0.4):
            if not etat["fait"]:  # le premier poser_lignes est celui de la question
                etat["fait"] = True
                self.poser_lignes = crochet
                avant_q(self)
            return crochet(mob, anim, run_time)

        self.poser_lignes = poser
        try:
            return super().question_pause(cle_q, cle_r, question, choix, bonne, phrase, mots_choix, autres_q,
                                          autres_r, mot_q)
        finally:
            self.poser_lignes = crochet


class PaysageFrac(_MarquesIci, _SansSynchro, _QuestionFigure, PaysageJ2):
    identite = "Maths 6e — EleveAI"
    ceinture = "verte"

    def figure_gauche(self, mob, haut=3.3, bas=-3.3, droite=None):
        """Recadre une figure dans la moitié gauche (sans toucher les bords)."""
        return self.cadrer(mob, droite=self.XL - 0.35 if droite is None else droite, haut=haut, bas=bas)


class ShortFrac(_MarquesIci, _SansSynchro, _QuestionFigure, ShortJ2):
    ceinture = "blanche"
