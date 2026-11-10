# passe_distributivite.py
# Passe finale de la série DISTRIBUTIVITÉ 4e (10/11/2026) : les 10 entrées du manifeste et les
# coupes de fin du lecteur. Copie adaptée de `passe_relatifs.py`. Les temps des chapitres et des
# questions sont relevés dans l'AUDIO de chaque mp4 (corrélation avec les WAV des clips), jamais
# estimés. Les shorts sont des shorts Manim (pas de dessin animé en 4e).
# Le manifeste a des modifications non commitées d'autres sessions : on sauvegarde, on lit, puis
# on écrit dans une étape séparée, en ajoutant seulement.
#
#   python manim/passe_distributivite.py temps     → manim/sorties/4e/maths/distributivite/temps.json
#   python manim/passe_distributivite.py manifeste → ajoute ou remplace les 10 entrées 4e-distrib-*
#   python manim/passe_distributivite.py coupes    → les valeurs de COUPE_PAR_VIDEO (LecteurVideo.tsx)
import json
import shutil
import subprocess
import sys
import tempfile
import wave
from pathlib import Path

import numpy as np

RACINE = Path(__file__).resolve().parents[1]
SERIE = RACINE / "manim" / "sorties" / "4e" / "maths" / "distributivite"
VOIX = RACINE / "manim" / "voix"
SONS = RACINE / "public" / "sons"
MARQUES = RACINE / "manim" / "scripts" / "4e"
MANIFESTE = RACINE / "manim" / "manifeste-youtube.json"
TEMPS = SERIE / "temps.json"
SR = 8000
PAS_AVANT = "2026-12-01"  # date de prudence : rien sur YouTube sans son ordre
COURS = "https://www.eleveai.fr/fiches-cours/maths/4e/litteral-distributivite"
EXOS = "https://www.eleveai.fr/fiches-exercices/maths/4e/litteral-distributivite"
NOTION = "litteral_distributivite"


def coach(micro):
    return f"https://www.eleveai.fr/coach/serie?classe=4e&matiere=maths&notion={NOTION}&microId={micro}&display=simple"


def lire_wav(p):
    with wave.open(str(p)) as w:
        n, sr, ch, l = w.getnframes(), w.getframerate(), w.getnchannels(), w.getsampwidth()
        x = np.frombuffer(w.readframes(n), dtype={2: np.int16, 4: np.int32}[l]).astype(np.float32)
    x = x.reshape(-1, ch).mean(axis=1)
    k = np.linspace(0, len(x) - 1, int(len(x) * SR / sr)).astype(int)
    return x[k]


def audio_mp4(p):
    with tempfile.TemporaryDirectory() as d:
        w = Path(d) / "a.wav"
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(p), "-ac", "1", "-ar", str(SR), "-sample_fmt", "s16", str(w)], check=True)
        return lire_wav(w)


def correl(ref, cible):
    """Position de ref dans cible, et sa qualité (0 à 1)."""
    n = len(cible) + len(ref)
    c = np.fft.irfft(np.fft.rfft(cible, n) * np.conj(np.fft.rfft(ref, n)), n)[: len(cible)]
    i = int(np.argmax(c))
    q = float(c[i] / (np.linalg.norm(ref) * np.linalg.norm(cible[i : i + len(ref)]) + 1e-9))
    return i, q


def mesurer(nom, mp4):
    a = audio_mp4(mp4)
    clips = list(json.loads((VOIX / f"{nom}.json").read_text(encoding="utf-8")))
    pos, res = 0, {}
    for c in clips:
        r = lire_wav(SONS / nom / f"{c}.wav")
        ref = r[: min(len(r), SR * 3)]
        # le clip suivant commence au plus 25 s après la fin du précédent
        fen = a[pos : pos + len(r) + SR * 25]
        i, q = correl(ref, fen)
        t = (pos + i) / SR
        if q < 0.5:
            print("⚠️ corrélation faible", nom, c, round(q, 2))
        res[c] = round(t, 2)
        pos = pos + i + len(r) - SR // 4
    return res, round(len(a) / SR, 2)


def mmss(t):
    t = int(t + 0.5)
    return f"{t // 60:02d}:{t % 60:02d}"


# ───── Les contenus ─────
EPS = [
    dict(num="01", slug="simple", n=1, ceinture="jaune", sc="jaune", centres=["construction", "art-design"], scentres=["jeux-defis"],
         titre="3(x + 4) : le 3 multiplie tout — La distributivité simple — épisode 1 · Maths 4e",
         intro="Lucas est menuisier. Il fabrique 3 étagères identiques : pour chacune, une planche de x décimètres et une petite planche de 4 décimètres. Combien de bois en tout ? Deux façons de compter, un même résultat.",
         puces=["3(x + 4) = 3x + 12 : le nombre devant la parenthèse multiplie chaque terme", "on vérifie avec x = 10", "le piège : 3x + 4, le 3 a oublié le 4", "avec un moins : 4(x − 3) = 4x − 12", "un nombre négatif devant : −2(x − 5) = −2x + 10"],
         defi="développe 6(2x − 5).",
         chap={"01-menuisier": "Lucas, menuisier", "02-paquets": "Première façon : 3 paquets", "03-ranger": "Deuxième façon : ranger les planches", "04-egalite": "Développer", "05-verifier": "On vérifie", "06-piege": "Le piège", "06q-question": "Question 1", "07-moins": "Avec un moins", "08-negatif": "Un nombre négatif devant", "08q-question": "Question 2", "09-defi": "À toi de jouer", "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
         qs=[("06q-question", "Que donne 5(x + 2) ?", ["5x + 2", "x + 10", "5x + 10"], 2, "Le 5 multiplie x, et il multiplie aussi le 2."),
             ("08q-question", "Que donne −3(x + 4) ?", ["−3x + 12", "−3x − 12", "−3x + 4"], 1, "−3 × 4, c'est −12.")],
         tags=["distributivité", "distributivité simple", "développer", "calcul littéral", "menuisier", "étagères"],
         st="7 × 13 de tête en 5 secondes : tu paries que tu n'y arrives pas ? ⚡ — 4e #Shorts",
         sq=("01q-question", "Que donne 7(x + 3) ?", ["7x + 21", "7x + 3", "x + 21"], 0, "Le 7 multiplie x, et il multiplie aussi le 3."),
         sa="7 × 13, de tête, en 5 secondes. Le secret : 13, c'est 10 + 3. 7 × 10 = 70, 7 × 3 = 21, et 70 + 21 = 91.\n7(10 + 3) = 7 × 10 + 7 × 3 : c'est la distributivité, et elle marche aussi avec une lettre.",
         stoi="calcule 8 × 12 de tête, avec le secret. Réponds en commentaire !", srep="96 : 8 × 10 + 8 × 2 = 80 + 16.",
         stags=["calcul mental", "calcul éclair", "7 × 13", "distributivité"]),
    dict(num="02", slug="double", n=2, ceinture="orange", sc="orange", centres=["photo", "art-design"], scentres=["nature-ecologie", "jeux-defis"],
         titre="4 morceaux, rien d'oublié — La double distributivité — épisode 2 · Maths 4e",
         intro="Inès est photographe. Elle encadre une photo dans un passe-partout de x + 4 centimètres sur x + 2 centimètres. Quelle est son aire ? On découpe le cadre en 4 morceaux.",
         puces=["(x + 4)(x + 2) = x² + 2x + 4x + 8 = x² + 6x + 8", "la méthode : chaque terme multiplie chaque terme, 4 flèches", "le piège : x² + 8, les deux morceaux du milieu oubliés", "avec un moins : (x − 2)(x + 5) = x² + 3x − 10"],
         defi="développe (2x + 1)(x + 3).",
         chap={"01-photographe": "Inès, photographe", "02-rectangle": "L'aire du cadre", "03-decouper": "4 morceaux", "04-reduire": "On réduit", "05-fleches": "La méthode : 4 flèches", "06-verifier": "On vérifie", "06q-question": "Question 1", "07-piege": "Le piège", "08-moins": "Avec un moins", "08q-question": "Question 2", "09-defi": "À toi de jouer", "09b-correction": "Correction", "10-finale": "Ce que tu as appris"},
         qs=[("06q-question", "Que donne (x + 5)(x + 1) ?", ["x² + 5", "x² + 6x + 5", "x² + 5x + 5"], 1, "x + 5x, c'est 6x."),
             ("08q-question", "Que donne (x − 3)(x + 4) ?", ["x² − 12", "x² − x − 12", "x² + x − 12"], 2, "4x − 3x, c'est x.")],
         tags=["double distributivité", "développer", "produit de deux parenthèses", "calcul littéral", "photographe", "aire d'un rectangle"],
         st="Un potager de 12 m sur 13 : son aire de tête, en 4 morceaux 🥕 — 4e #Shorts",
         sq=("01q-question", "Que donne (x + 1)(x + 3) ?", ["x² + 3", "x² + 4x + 4", "x² + 4x + 3"], 2, "4 morceaux : x², 3x, x et 3."),
         sa="Un potager de 12 mètres sur 13. Son aire, de tête ? 12 = 10 + 2, 13 = 10 + 3 : on le coupe en 4 morceaux. 100 + 30 + 20 + 6 = 156 mètres carrés.\nLa double distributivité, dessinée : chaque morceau compte.",
         stoi="calcule 11 × 14 de tête, avec les 4 morceaux. Réponds en commentaire !", srep="154 : 100 + 40 + 10 + 4.",
         stags=["potager", "4 morceaux", "aire", "double distributivité"]),
    dict(num="03", slug="reduire", n=3, ceinture="orange", sc="orange", centres=["natation", "sport"], scentres=["jeux-defis", "mode"],
         titre="Les x avec les x — Développer et réduire — épisode 3 · Maths 4e",
         intro="Sarah est maître-nageuse. Une série, c'est x longueurs de crawl et 4 longueurs de dos. Elle en prévoit 3, puis 5 longueurs pour finir. Combien de longueurs en tout ? D'abord on développe, puis on réduit.",
         puces=["3(x + 4) + 5 = 3x + 12 + 5 = 3x + 17", "réduire : les x avec les x, les nombres avec les nombres", "deux parenthèses : 2(x + 3) + 4(x − 1) = 6x + 2", "le moins devant : 10 − 3(x − 1) = 13 − 3x"],
         defi="développe et réduis 5(x + 2) + 3(x − 4).",
         chap={"01-piscine": "Sarah, maître-nageuse", "02-ecrire": "Écrire, puis développer", "04-reduire": "Puis réduire", "05-familles": "Ranger par familles", "05q-question": "Question 1", "06-deux": "Avec deux parenthèses", "07-moins": "Un moins devant la parenthèse", "07q-question": "Question 2", "08-defi": "À toi de jouer", "08b-correction": "Correction", "09-finale": "Ce que tu as appris"},
         qs=[("05q-question", "Que donne 2(x + 5) + 3 ?", ["2x + 13", "2x + 8", "15x"], 0, "2x + 10, plus 3."),
             ("07q-question", "Que donne 8 − 2(x − 4) ?", ["6x − 24", "16 − 2x", "−2x"], 1, "−2 × (−4) = +8, et 8 + 8 = 16.")],
         tags=["développer et réduire", "réduire une expression", "distributivité", "calcul littéral", "maître-nageuse", "natation"],
         st="3x + 5 + 2x + 1 = 11x ? Non ! Le tri des chaussettes 🧦 — 4e #Shorts",
         sq=("01q-question", "Que donne 2(x + 3) + x ?", ["3x + 6", "2x + 6", "9x"], 0, "2x + 6, plus x : 3x + 6."),
         sa="3x + 5 + 2x + 1, ça fait 11x ? Non ! On range comme des chaussettes : les x avec les x, les nombres avec les nombres. 3x + 2x = 5x, 5 + 1 = 6 : résultat 5x + 6.\nRéduire, c'est trier par familles.",
         stoi="développe et réduis 4(x + 1) + 2x. Réponds en commentaire !", srep="6x + 4 : 4x + 4 + 2x.",
         stags=["chaussettes", "réduire", "les x avec les x", "développer et réduire"]),
    dict(num="04", slug="reconnaitre", n=4, ceinture="jaune", sc="jaune", centres=["cuisine"], scentres=["cinema-series", "argent-budget"],
         titre="Produit ou somme ? — Développer ou pas ? — épisode 4 · Maths 4e",
         intro="Karim est cuisinier dans une cantine. Pour 4 tables, il prévoit x crêpes et 2 compotes par table. Sur sa liste : 4(x + 2). Son collègue écrit 4x + 8. Qui a raison ?",
         puces=["4(x + 2) est un produit, 4x + 8 est une somme : la même quantité", "on regarde la dernière opération", "développer, c'est passer du produit à la somme", "le piège : 3 + (x + 1), rien ne multiplie la parenthèse"],
         defi="6(x + 1) et 6x + 1 : laquelle est un produit ? Sont-elles égales ?",
         chap={"01-cantine": "Karim, cuisinier de cantine", "02-deux": "Un produit, une somme", "03-derniere": "La dernière opération", "04-regle": "Quand développer ?", "04q-question": "Question 1", "05-piege": "Le piège", "06-developpee": "Déjà développée", "06q-question": "Question 2", "07-defi": "À toi de jouer", "07b-correction": "Correction", "08-finale": "Ce que tu as appris"},
         qs=[("04q-question", "Laquelle faut-il développer ?", ["5x + 7", "3x − 1", "2(x + 6)"], 2, "Le 2 multiplie une parenthèse : c'est un produit."),
             ("06q-question", "Laquelle est déjà développée ?", ["7x − 2", "7(x − 2)", "x(x + 1)"], 0, "C'est une somme : plus rien à distribuer.")],
         tags=["produit ou somme", "dernière opération", "reconnaître une expression", "développer", "distributivité", "cuisinier", "cantine"],
         st="2 × 3 + 4 : le caissier du cinéma a-t-il raison ? 🍿 — 4e #Shorts",
         sq=("01q-question", "5(x + 1), c'est quoi ?", ["une somme", "une différence", "un produit"], 2, "La dernière opération est la multiplication par 5."),
         sa="2 amis au cinéma. Chacun prend une place à 3 euros et un pop-corn à 4 euros. Le caissier tape 2 × 3 + 4 = 10 euros : un seul pop-corn est payé ! Il fallait 2 × (3 + 4) = 14 euros.\nLa parenthèse change tout : c'est un produit.",
         stoi="3x + 2 : produit ou somme ? Réponds en commentaire !", srep="une somme : la dernière opération est l'addition.",
         stags=["cinéma", "caissier", "produit ou somme", "parenthèses"]),
    dict(num="05", slug="defi", n=5, ceinture="verte", sc="orange", centres=["argent-budget", "cuisine"], scentres=["jeux-video", "argent-budget"],
         titre="4 × 2,99 de tête en 2 secondes — Défis de distributivité — épisode 5 · Maths 4e",
         intro="Chloé est vendeuse dans une boulangerie. Un client achète 4 tartes à 2,99 euros : elle calcule de tête, en 2 secondes. Trois défis : calculer de tête, trouver l'erreur, écrire un problème.",
         puces=["4 × 2,99 = 4 × 3 − 4 × 0,01 = 11,96", "trouver l'erreur : 5(x − 3) n'est pas 5x − 3", "l'erreur de signe : −2(x − 4) = −2x + 8", "écrire un problème : 3(x + 2) + 2(x + 5) = 5x + 16"],
         defi="calcule de tête 7 × 1,99.",
         chap={"01-vendeuse": "Chloé, vendeuse en boulangerie", "02-astuce": "Défi 1 : calculer de tête", "02q-question": "Question 1", "03-erreur": "Défi 2 : trouver l'erreur", "04-signe": "L'erreur de signe", "04q-question": "Question 2", "05-probleme": "Défi 3 : écrire un problème", "06-modeliser": "Développer et réduire", "07-defi": "À toi de jouer", "07b-correction": "Correction", "08-finale": "Ce que tu as appris"},
         qs=[("02q-question", "Combien coûtent 6 croissants à 0,99 euro ?", ["5,94 euros", "6,06 euros", "5,99 euros"], 0, "6 × 1 = 6, moins 6 × 0,01 = 0,06."),
             ("04q-question", "Où est l'erreur ? 3(2x + 5) = 6x + 8", ["6x est faux", "8 est faux, il faut 15", "il n'y a pas d'erreur"], 1, "3 × 5, c'est 15 : 6x + 15.")],
         tags=["défi", "calcul mental", "trouver l'erreur", "distributivité", "calcul littéral", "vendeuse", "boulangerie"],
         st="3 jeux vidéo à 19,99 € : le prix de tête en 5 secondes 🎮 — 4e #Shorts",
         sq=("01q-question", "Et 5 livres à 9,99 euros ?", ["45,99 euros", "50,05 euros", "49,95 euros"], 2, "5 × 10 = 50, moins 5 × 0,01 = 0,05."),
         sa="3 jeux vidéo à 19,99 euros. Combien en tout, de tête, en 5 secondes ? 19,99, c'est 20 − 0,01. 3 × 20 = 60, 3 × 0,01 = 0,03 : 60 − 0,03 = 59,97 euros.\nLe prix rond : la distributivité au service du calcul mental.",
         stoi="4 places de concert à 24,99 euros. Combien en tout ? Réponds en commentaire !", srep="99,96 euros : 4 × 25 − 4 × 0,01 = 100 − 0,04.",
         stags=["prix rond", "jeux vidéo", "calcul mental", "19,99"]),
]

COMMUNS = ["maths", "4e", "collège", "cycle 4", "CRPE", "EleveAI"]


def entrees():
    temps = json.loads(TEMPS.read_text(encoding="utf-8"))
    out = []
    # ⛔ YouTube refuse TOUS les chapitres s'il y en a un de moins de 10 s : on le vérifie ici.
    for e in EPS:
        t = temps[f"4e-distrib-{e['slug']}"]["clips"]
        ts = [0] + [t[c] for c in list(e["chap"])[1:]]
        for a, b in zip(ts, ts[1:]):
            if b - a < 10:
                raise SystemExit(f"chapitre de moins de 10 s : {e['slug']} à {mmss(a)}")
    for e in EPS:
        slug, rep = e["slug"], f"{e['num']}-{e['slug']}"
        dos = f"4e/maths/distributivite/{rep}"
        nom = f"eleveai-maths-4e-distrib-{slug}"
        micro = f"{NOTION}_{slug}"
        t = temps[f"4e-distrib-{slug}"]["clips"]
        acc = e["intro"] + "\n\nDans cette vidéo :\n" + "\n".join("• " + p for p in e["puces"])
        acc += f"\n\n⏸ 2 questions-pauses : mets pause, et choisis !\n🥋 Ceinture {e['ceinture']}.\nUn défi en fin de vidéo, avec sa correction : {e['defi']}"
        acc += f"\n\nPour s'entraîner :\n• la fiche de cours : {COURS}\n• les exercices corrigés : {EXOS}\n• la série du coach sur cette compétence : {coach(micro)}"
        acc += f"\n\n🔢 Épisode {e['n']} sur 5 de la série Distributivité d'EleveAI, en 4e."
        chap = [["00:00", e["chap"][next(iter(e["chap"]))]]] + [[mmss(t[c]), lib] for c, lib in list(e["chap"].items())[1:]]
        qs = [{"t": mmss(t[c]), "question": q, "choix": ch, "reponse": r, "explication": x} for c, q, ch, r, x in e["qs"]]
        out.append({
            "id": f"4e-distrib-{slug}", "pas_avant": PAS_AVANT, "notionId": NOTION, "microId": micro, "classe": "4e",
            "ceinture": e["ceinture"], "serie": "Maths 4e", "type": "longue", "fichier": f"{dos}/{nom}.mp4", "miniature": f"{dos}/{nom}.png",
            "titre": e["titre"], "accroche": acc, "chapitres": chap, "fiche": COURS, "fiche_exercices": EXOS,
            "tags": e["tags"] + COMMUNS, "questions": qs, "centres": e["centres"],
        })
        ts = temps[f"4e-distrib-{slug}-short"]["clips"]
        c, q, ch, r, x = e["sq"]
        sacc = e["sa"] + f"\n\nVoix de synthèse.\n🥋 Ceinture {e['sc']}.\n👉 À toi : {e['stoi']}"
        sacc += f"\n\n▶️ L'épisode complet : {{{{LONGUE}}}}\n🎯 Le coach : {coach(micro)}\n\nFait à La Réunion 🌋 — Frédéric Lacoste\n\n#Shorts #maths #distributivité #4e #collège"
        out.append({
            "id": f"4e-distrib-{slug}-short", "pas_avant": PAS_AVANT, "notionId": NOTION, "microId": micro, "classe": "4e",
            "ceinture": e["sc"], "serie": "Maths 4e", "type": "short", "renvoie_vers": f"4e-distrib-{slug}",
            "fichier": f"{dos}/{nom}-short.mp4", "miniature": f"{dos}/{nom}-short.png",
            "titre": e["st"], "accroche": sacc, "tags": e["stags"] + ["calcul littéral"] + COMMUNS + [f"ceinture {e['sc']}", "Shorts"],
            "questions": [{"t": mmss(ts[c]), "question": q, "choix": ch, "reponse": r, "explication": x}], "centres": e["scentres"],
        })
    return out


def coupes():
    """COUPE_PAR_VIDEO : secondes retirées à la fin du mp4.
    Paysage : au milieu de la pause entre « point f r. » et « Et si ça t'a aidé » (marques du clip de fin).
    Short : au début de « Mets un pouce », + 0,03 s (même calcul que Relatifs et Divisibilité)."""
    temps = json.loads(TEMPS.read_text(encoding="utf-8"))
    res = {}
    for e in EPS:
        for suf, scr in (("", f"distrib_{e['slug']}"), ("-short", f"distrib_{e['slug']}_short")):
            nom = f"4e-distrib-{e['slug']}{suf}"
            voix = json.loads((VOIX / f"{nom}.json").read_text(encoding="utf-8"))
            cle = [k for k in voix if k.endswith("abonne")][0]
            texte = voix[cle]
            marques = json.loads((MARQUES / f"{scr}_marques.json").read_text(encoding="utf-8"))[cle]
            debut = temps[nom]["clips"][cle]
            duree = temps[nom]["duree"]

            def instant(mot):
                return dict(marques)[texte.index(mot)]

            if suf:
                t = debut + instant("Mets")
                res[nom] = round(duree - t + 0.03, 2)
            else:
                # dernière marque avant « Et si » (le « r » de « f r. ») et début de « Et si »
                t_et = instant("Et si")
                avant = [m for c, m in marques if m < t_et][-1]
                t = debut + (avant + t_et) / 2
                res[nom] = round(duree - t, 1)
            print(nom, "durée", duree, "fin", cle, debut, "coupe à", round(t, 2), "→", res[nom])
    return res


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    mode = sys.argv[1]
    if mode == "temps":
        res = {}
        for e in EPS:
            for suf in ("", "-short"):
                nom = f"4e-distrib-{e['slug']}{suf}"
                mp4 = SERIE / f"{e['num']}-{e['slug']}" / f"eleveai-maths-{nom}.mp4"
                clips, duree = mesurer(nom, mp4)
                res[nom] = {"duree": duree, "clips": clips}
                print(nom, duree, "fin", clips[list(clips)[-1]])
        TEMPS.write_text(json.dumps(res, ensure_ascii=False, indent=1), encoding="utf-8")
    elif mode == "coupes":
        print(json.dumps(coupes(), indent=1))
    elif mode == "manifeste":
        sauve = Path(tempfile.gettempdir()) / "manifeste-youtube.avant-distributivite.json"
        shutil.copy(MANIFESTE, sauve)
        texte = MANIFESTE.read_text(encoding="utf-8")
        data = json.loads(texte)
        neuves = entrees()
        ids = {n["id"] for n in neuves}
        avant = len(data["videos"])
        # une entrée déjà publiée garderait son url : on ne remplace que ce que nous avons écrit
        for v in data["videos"]:
            if v["id"] in ids and v.get("url"):
                raise SystemExit("déjà publiée : " + v["id"])
        data["videos"] = [v for v in data["videos"] if v["id"] not in ids] + neuves
        sortie = json.dumps(data, ensure_ascii=False, indent=2) + "\n"
        MANIFESTE.write_text(sortie, encoding="utf-8", newline="\n" if "\r\n" not in texte else "\r\n")
        print("manifeste :", avant, "→", len(data["videos"]), "sauvegarde", sauve)


if __name__ == "__main__":
    main()
