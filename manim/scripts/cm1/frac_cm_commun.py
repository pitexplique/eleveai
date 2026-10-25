# frac_cm_commun.py
# EleveAI — série « Fractions », CM1 ET CM2 (25/10/2026, lot CM I : 01-lire,
# 02-representer, 03-droite, 04-comparer) : les OUTILS COMMUNS des épisodes CM.
# Pas de scène ici. Pensé pour les lots CM suivants (05-equivalente, 06-decimale,
# 07-defi, puis CM1 seul / CM2 seul) : importe-le, ne le recopie pas.
#
# ⛔ Ne modifie NI manim/canvas_fractions.py NI 6e/frac_commun.py NI
# 4e/frac_lote_commun.py (IMPORTÉS, pas recopiés) : PaysageE / ShortE y donnent
# la synchro au mot (au_mot, au_nb, montre, calc, rep/rep_fin), la question-pause
# (compte à rebours 5 s / 3 s), l'AUDIT de synchro et le contrôle des BORDS :
#   AUDIT=1 BORDS=1 python -m manim render --dry_run <script> <Classe>
#   → 0 ligne AUDIT-AVANCE, 0 RETARD, 0 BORD.
# ⭐ Ajouté ici :
#   · PaysageCM / ShortCM : identité « Maths CM1 — EleveAI », ceinture ; une voix
#     `cm-frac-<slug>` (ne cite aucune classe), marques À CÔTÉ du script (cm1/) ;
#   · construct() commun : self.ecrans() (la liste des écrans, garde en premier)
#     puis la page de fin « 10-abonne » ; GARDE_SEULE=1 ne rend que la garde ;
#   · ⭐ UNE voix, DEUX rendus, UN SEUL rendu long : la sous-classe CM2 ne change
#     que l'identité et la ceinture, qui ne paraissent QUE sur la garde. On rend
#     la paysage CM1 en entier, la garde CM2 seule (GARDE_SEULE=1, ~10 s), puis :
#       python manim/scripts/cm1/frac_cm_commun.py coller <cm1.mp4> <garde-cm2.mp4> <sortie-cm2.mp4>
#     (la garde CM2 remplace les premières secondes de la vidéo CM1, image pour
#     image ; même durée, même voix). Un rendu complet de la classe CM2 donne
#     la même vidéo : c'est seulement plus long.
#   · en_mots(n, d) : « 3 huitièmes », « 1 demi », « 2 tiers » ;
#   · etiquette() : une flèche + un mot qui nomme un morceau (« dénominateur »),
#     posée à côté, jamais collée ;
#   · barre_inegale() / disque_inegal() : le PIÈGE des parts inégales (coach :
#     unequalParts), au style des figures du coach ;
#   · chiffre_sur(m, txt) : un petit numéro posé sur une part (compter les parts).
#
# Ceintures (REGLES.md : la verte = la paysage complète du niveau de la classe) :
# paysage CM1 VERTE (la notion de CM1, complète) ; la même paysage en CM2 est
# un RAPPEL de CM1 : JAUNE. Shorts : BLANCHE (on voit, aucun calcul posé).

import os
import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "4e"))

from frac_lote_commun import *  # noqa: E402,F401,F403

NOMS = {2: ("demi", "demis"), 3: ("tiers", "tiers"), 4: ("quart", "quarts"), 5: ("cinquième", "cinquièmes"),
        6: ("sixième", "sixièmes"), 7: ("septième", "septièmes"), 8: ("huitième", "huitièmes"),
        9: ("neuvième", "neuvièmes"), 10: ("dixième", "dixièmes"), 12: ("douzième", "douzièmes"),
        100: ("centième", "centièmes")}


def en_mots(n, d):
    """« 3 huitièmes », « 1 demi » (le numérateur en chiffres, comme la voix)."""
    return f"{n} {NOMS[d][0 if n == 1 else 1]}"


def etiquette(cible, txt, cote=RIGHT, couleur=AMBRE, fs=30, long=0.7, buff=0.18):
    """Une flèche qui pointe `cible` depuis `cote`, et le mot au bout.
    Renvoie VGroup(fleche, texte) ; le texte n'est jamais collé à la cible."""
    bout = cible.get_critical_point(cote) + cote * buff
    fl = Arrow(bout + cote * long, bout, buff=0, color=couleur, stroke_width=5, tip_length=0.18,
               max_tip_length_to_length_ratio=0.5)
    t = Text(txt, font_size=fs, color=couleur).next_to(fl, cote, buff=0.12)
    return VGroup(fl, t)


def barre_inegale(largeurs=(0.8, 1.3, 1.9, 2.4), h=0.8, centre=ORIGIN, k=0, couleur=BLEU_PART):
    """Une barre coupée en parts INÉGALES (les k premières bleues), carte du coach.
    .parts[i] .carte ; rien n'est ajouté à la scène."""
    x = -sum(largeurs) / 2
    parts = VGroup()
    for i, w in enumerate(largeurs):
        parts.add(Rectangle(width=w, height=h, fill_color=couleur if i < k else VIDE, fill_opacity=1,
                            stroke_color=BORD, stroke_width=3).move_to(P(x + w / 2, 0)))
        x += w
    carte = RoundedRectangle(width=sum(largeurs) + 0.6, height=h + 0.6, corner_radius=0.22, fill_color=CARTE,
                             fill_opacity=1, stroke_color=GRILLE, stroke_width=3)
    g = VGroup(carte, parts).move_to(centre)
    g.parts, g.carte = parts, carte
    return g


def disque_inegal(angles=(40, 70, 110, 140), rayon=1.2, centre=ORIGIN, k=0, couleur=BLEU_PART):
    """Un disque coupé en parts INÉGALES (angles en degrés, somme 360), depuis le
    haut, dans le sens des aiguilles d'une montre. .parts[i] .carte .cercle."""
    parts, a0 = VGroup(), PI / 2
    for i, a in enumerate(angles):
        ang = a * DEGREES
        parts.add(AnnularSector(inner_radius=0, outer_radius=rayon, angle=-ang, start_angle=a0,
                                fill_color=couleur if i < k else VIDE, fill_opacity=1,
                                stroke_color=BORD, stroke_width=3))
        a0 -= ang
    cercle = Circle(radius=rayon, stroke_color=BORD, stroke_width=4)
    carte = RoundedRectangle(width=2 * rayon + 0.6, height=2 * rayon + 0.6, corner_radius=0.22, fill_color=CARTE,
                             fill_opacity=1, stroke_color=GRILLE, stroke_width=3)
    g = VGroup(carte, parts, cercle).move_to(centre)
    g.parts, g.carte, g.cercle = parts, carte, cercle
    return g


def chiffre_sur(m, txt, fs=30, couleur=NUIT):
    """Un numéro posé au centre de la part m (on compte les parts) : non audité."""
    t = Text(str(txt), font_size=fs, color=couleur, weight=BOLD).move_to(m.get_center())
    return pas_audit(t)


class _ConstructCM:
    """construct() commun : les écrans de l'épisode, puis la page de fin."""

    cle_abonne = "10-abonne"

    def ecrans(self):
        raise NotImplementedError

    def construct(self):
        ecrans = self.ecrans()
        if os.environ.get("GARDE_SEULE") == "1":
            ecrans[0]()
            return
        for e in ecrans:
            e()
        if self.cle_abonne:
            self.page_abonnement(self.cle_abonne)


class PaysageCM(_ConstructCM, PaysageE):
    identite = "Maths CM1 — EleveAI"
    ceinture = "verte"

    def calc_ici(self, morceaux, centre, fs=40, avec=()):
        """calc() posé n'importe où (pas seulement dans la colonne) : une ligne
        de morceaux (texte, couleur), chaque nombre à son mot."""
        lg = self.ligne(morceaux, fs).move_to(centre)
        self._par_lots(list(lg.submobjects), lambda m: FadeIn(m, shift=RIGHT * 0.2), 0.3, avec=avec)
        return lg

    def garde(self, *a, **k):
        """La garde du gabarit ; l'identité (« CM1 » porte un 1 !) et l'échelle
        des ceintures sont du décor : ni synchro au mot, ni audit."""
        titre, ident, ech = super().garde(*a, **k)
        pas_audit(ident)
        pas_audit(ech)
        return titre, ident, ech


class ShortCM(ShortE):
    ceinture = "blanche"


# ── la garde CM2 collée sur la vidéo CM1 (voir l'en-tête) ───────────────────

def _duree_video(f):
    out = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-count_packets", "-show_entries",
                          "stream=nb_read_packets,r_frame_rate", "-of", "csv=p=0", str(f)],
                         capture_output=True, text=True, check=True).stdout.strip().split(",")
    num, den = out[0].split("/")
    return int(out[1]) * int(den) / int(num)


def coller(video_cm1, garde_cm2, sortie):
    """La vidéo CM1 dont les Tg premières secondes (la garde) sont remplacées
    par la garde CM2 (Tg = durée de la garde CM2, au nombre d'images près)."""
    tg = _duree_video(garde_cm2)
    f = (f"[0:v]trim=0:{tg},setpts=PTS-STARTPTS[v0];[0:a]apad,atrim=0:{tg},asetpts=PTS-STARTPTS[a0];"
         f"[1:v]trim=start={tg},setpts=PTS-STARTPTS[v1];[1:a]atrim=start={tg},asetpts=PTS-STARTPTS[a1];"
         "[v0][a0][v1][a1]concat=n=2:v=1:a=1[v][a]")
    Path(sortie).parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", str(garde_cm2), "-i", str(video_cm1), "-filter_complex", f,
                    "-map", "[v]", "-map", "[a]", "-c:v", "libx264", "-crf", "16", "-preset", "medium",
                    "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", str(sortie)], check=True)
    print(f"colle : garde {tg:.3f} s + {video_cm1} -> {sortie}")


if __name__ == "__main__" and len(sys.argv) == 5 and sys.argv[1] == "coller":
    coller(*sys.argv[2:5])
