# mesure-shorts-ps-espace.py — LA MESURE DES SIX SHORTS DU PRODUIT SCALAIRE (E7 à E12).
#
#   python -X utf8 manim/poste2/mesure-shorts-ps-espace.py              # les six
#   python -X utf8 manim/poste2/mesure-shorts-ps-espace.py E7           # un seul
#   python -X utf8 manim/poste2/mesure-shorts-ps-espace.py E7 --cotes   # + les boîtes
#   python -X utf8 manim/poste2/mesure-shorts-ps-espace.py --fleches    # les noms de vecteur
#   python -X utf8 manim/poste2/mesure-shorts-ps-espace.py --ancres     # la synchro
#
# ⭐⭐ IL NE RECOPIE RIEN, ET C'EST TOUT SON INTÉRÊT. `espace_mesure_short.py` porte les
# cinq contrôles de la série (BORD, RÉTRÉCI, MARGO, CHEVAUCHE, TITRE) plus `etiquettes()`,
# et il est GELÉ : sa table `SHORTS` ne connaît que les six shorts de la GÉOMÉTRIE (E1 à
# E6). On ne peut donc pas lui demander les six du produit scalaire… mais on peut
# l'importer et lui SUBSTITUER sa table. L'instrument reste unique.
# ⛔ La tentation était de recopier les 540 lignes de l'instrument en changeant six
# lignes de table. « Deux copies d'une seule vérité divergent dès qu'on en touche une »
# (cote de Ravi, épisode 10) : un correctif apporté là-bas ne serait jamais arrivé ici,
# et l'instrument aurait menti sans qu'aucun signe ne le dise.
#
# ⚠️ Ce qu'il mesure est le MODÈLE, pas les PIXELS — exactement comme l'original. La
# planche `-ql` et les gros plans restent obligatoires.

import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
_RACINE = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(_RACINE / "manim" / "scripts" / "terminale"))

import espace_mesure_short as socle  # noqa: E402

# ⭐ La table des six, et c'est la SEULE chose que ce fichier ajoute. Les clés continuent
# la numérotation de la série : E1 à E6 sont les shorts de la géométrie, E7 à E12 ceux du
# produit scalaire — les mêmes numéros que les douze épisodes paysages.
SHORTS = {
    "E7": ("ps_espace_calculer_short", "PsEspaceCalculerShort"),
    "E8": ("ps_espace_orthogonalite_short", "PsEspaceOrthogonaliteShort"),
    "E9": ("ps_espace_norme_distance_short", "PsEspaceNormeDistanceShort"),
    "E10": ("ps_espace_angle_short", "PsEspaceAngleShort"),
    "E11": ("ps_espace_plan_normal_short", "PsEspacePlanNormalShort"),
    "E12": ("ps_espace_defi_short", "PsEspaceDefiShort"),
}

# ⛔ La substitution se fait sur le MODULE, pas sur une copie du dictionnaire : `une()`,
# `fleches()` et `main()` lisent tous `SHORTS` comme un global de leur module.
socle.SHORTS = SHORTS


# ── ⛔⛔ LA SECONDE SUBSTITUTION, ET ELLE A ÉTÉ TROUVÉE PAR UN CHIFFRE IMPLAUSIBLE ──
#
# `--ancres` répondait **15 ancres littérales, 15 non uniques** sur un script dont
# `verifier-avant-rendu.py` venait de dire que les quinze extraits étaient dans la voix,
# et dont le dry run sortait 0 AUDIT-AVANCE et 0 RETARD. Trois instruments, deux
# d'accord et un seul contre : c'est l'instrument isolé qu'il faut ouvrir.
#
# La cause tient en une ligne du socle gelé : `_voix_des_shorts()` lit
# `manim/voix/terminale-espace-*-short.json`. Les six voix du produit scalaire
# s'appellent `terminale-PS-espace-*-short.json` — le motif ne les attrape pas. Le
# dictionnaire des textes était donc VIDE, `txt.count(extrait)` rendait 0 pour tout, et
# le contrôle condamnait chaque ancre sans avoir lu une seule voix.
#
# ⭐⭐ LA LEÇON EST CELLE DE LA SÉRIE, À SA ÉNIÈME RÉCIDIVE : un instrument qui rend un
# verdict sans avoir regardé sa source ne mesure rien. Ici il était VISIBLE parce que le
# verdict était 15 sur 15 ; s'il n'y avait eu qu'une ancre dans le fichier, « 1 non
# unique » aurait été parfaitement plausible et j'aurais corrigé une ancre juste.
# ⚠️ Et le danger symétrique est le vrai : avec quinze faux positifs à ignorer, une
# ancre réellement ambiguë serait passée dans le bruit — « un gros AUDIT-TARD cachait
# une vraie avance », huit fois dans cette série.
def _voix_des_six():
    """Les six voix du PRODUIT SCALAIRE, là où le socle ne lit que celles de la géométrie."""
    import json
    out = {}
    for f in (_RACINE / "manim" / "voix").glob("terminale-ps-espace-*-short.json"):
        out[f.stem] = json.loads(f.read_text(encoding="utf-8"))
    if not out:
        # ⛔ Un contrôle qui ne trouve aucune voix doit CRIER, pas rendre un verdict :
        # c'est exactement le défaut qu'on vient de corriger. Il ne se répétera pas ici
        # en silence.
        raise SystemExit("⛔ aucune voix « terminale-ps-espace-*-short.json » trouvée — "
                         "ce contrôle ne mesurerait rien")
    return out


socle._voix_des_shorts = _voix_des_six

if __name__ == "__main__":
    socle.main()
