#!/usr/bin/env python
"""Un MP4 est-il a jour vis-a-vis de son script ? — EleveAI, 17/11/2026.

⛔ NE COMPARE JAMAIS un MP4 a la date du COMMIT de son script. Un commit enregistre
un contenu, il ne l'ecrit pas : on commite souvent une heure apres avoir rendu, sans
que rien n'ait change entre-temps. Le 17/11, ce seul contresens a fait declarer SEPT
MP4 de 3e perimes alors que les seize etaient bons — et a failli couter sept rendus HD
sur un verrou que trois sessions se partagent.

La preuve se fait en TROIS points, et les trois sont necessaires :
  1. mtime(.py) < mtime(.mp4)      le rendu est posterieur a la derniere ecriture
  2. le .py sur le disque est identique a HEAD   ce qui est commite EST ce qui a ete rendu
  3. mtime(.mp4) coincide avec un log de rendu   c'est un rendu, pas une COPIE
Le point 3 est celui qu'on oublie : `cp`, `mv` et une restauration rafraichissent le
mtime sans rien rendre, et un MP4 copie se declare alors a jour.

    python -X utf8 -I manim/poste2/verifier-fraicheur-mp4.py manim/sorties/3e/**/*.mp4
    python -X utf8 -I manim/poste2/verifier-fraicheur-mp4.py --serie 4e

⚠️ `-X utf8` en plus de `-I` : avec `-I` seul, PYTHONIOENCODING est ignore et les
accents de la sortie font planter l'outil sous Windows.
"""
import datetime
import glob
import os
import subprocess
import sys

RACINE = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
TOLERANCE_LOG = 3.0  # s entre la fin d'ecriture du MP4 et celle du log du rendu


def heure(t):
    return datetime.datetime.fromtimestamp(t).strftime('%d/%m %H:%M:%S')


def script_de(mp4):
    """eleveai-maths-4e-solides-perspective.mp4 -> manim/scripts/4e/4e_solides_perspective.py"""
    nom = os.path.basename(mp4)[:-4]
    for prefixe in ('eleveai-maths-', 'eleveai-'):
        if nom.startswith(prefixe):
            nom = nom[len(prefixe):]
            break
    morceaux = nom.split('-')
    classe = morceaux[0]
    base = f"{classe}_{'_'.join(morceaux[1:]).replace('-', '_')}"
    # Les episodes de 3e de la serie perimetre/aire/volume vivent dans scripts/4e.
    for dossier in (classe, '4e', '3e', '5e', '6e', 'cm2'):
        chemin = os.path.join(RACINE, 'manim', 'scripts', dossier, base + '.py')
        if os.path.exists(chemin):
            return chemin
    return None


def logs_de_rendu():
    motifs = ('manim/scripts/*/media-hd-*.hd.log', 'manim/scripts/*/media-*.log')
    out = {}
    for motif in motifs:
        for chemin in glob.glob(os.path.join(RACINE, motif)):
            out[chemin] = os.path.getmtime(chemin)
    return out


def propre_vis_a_vis_de_head(py):
    rel = os.path.relpath(py, RACINE).replace(os.sep, '/')
    r = subprocess.run(['git', 'diff', '--quiet', 'HEAD', '--', rel], cwd=RACINE)
    return r.returncode == 0


def verifier(mp4s):
    logs = logs_de_rendu()
    douteux = []
    print(f"{'video':46} {'script ecrit':>15} {'MP4':>15} {'log':>7} {'git':>8}  verdict")
    print('-' * 108)
    for mp4 in mp4s:
        nom = os.path.basename(mp4)[:-4]
        py = script_de(mp4)
        if py is None:
            print(f"{nom:46} {'SCRIPT INTROUVABLE':>15}")
            douteux.append((nom, 'script introuvable'))
            continue
        t_mp4, t_py = os.path.getmtime(mp4), os.path.getmtime(py)
        ecart = min((abs(t_mp4 - t) for t in logs.values()), default=None)
        a_un_log = ecart is not None and ecart < TOLERANCE_LOG
        propre = propre_vis_a_vis_de_head(py)
        ok = t_py < t_mp4 and a_un_log and propre
        raisons = []
        if t_py >= t_mp4:
            raisons.append(f"script ecrit APRES le rendu (+{(t_py - t_mp4) / 60:.0f} min)")
        if not propre:
            raisons.append('script modifie et non commite')
        if not a_un_log:
            raisons.append('aucun log de rendu a cet instant : MP4 copie ?')
        if not ok:
            douteux.append((nom, ' ; '.join(raisons)))
        print(f"{nom:46} {heure(t_py):>15} {heure(t_mp4):>15} "
              f"{('oui' if a_un_log else 'NON'):>7} {('propre' if propre else 'MODIFIE'):>8}  "
              f"{'a jour' if ok else '<<< ' + raisons[0]}")
    print('-' * 108)
    print(f"{len(mp4s)} MP4 : {len(mp4s) - len(douteux)} prouves a jour, {len(douteux)} douteux.")
    for nom, pourquoi in douteux:
        print(f"  ⛔ {nom} : {pourquoi}")
    return 1 if douteux else 0


def main(argv):
    if len(argv) >= 2 and argv[0] == '--serie':
        mp4s = sorted(glob.glob(os.path.join(RACINE, 'manim', 'sorties', argv[1], '**', '*.mp4'),
                                recursive=True))
    else:
        mp4s = sorted(argv)
    if not mp4s:
        print(__doc__)
        return 2
    return verifier(mp4s)


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
