# ajout_site_graphiques_1re.py — série GRAPHIQUES 1re (24/11/2026)
# Ajoute NOS entrées (premiere|stmg)-graph-* à lib/videos/videos-r2.json et lib/videos/bilans-videos.json,
# à partir du manifeste (copie de travail), SANS lancer scripts/generer-videos-r2.mjs (interdit au poste 1)
# et sans toucher aux autres clés (les deux fichiers ont des modifications non commitées d'autres sessions).
#   python manim/ajout_site_graphiques_1re.py [ecrire]
import json
import re
import sys
from pathlib import Path

R = Path(__file__).resolve().parents[1]
NOTRE = re.compile(r"^(premiere|stmg)-graph-")
HORS_VUS = {"La question du jour", "Question 1", "Question 2", "À toi de jouer", "Correction", "Ce que tu as appris"}


def coach(v):
    return f"/coach/serie?classe={v['classe']}&matiere=maths&notion={v['notionId']}&microId={v['microId']}&display=simple"


def main():
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    ecrire = sys.argv[1:] == ["ecrire"]
    vids = [v for v in json.loads((R / "manim/manifeste-youtube.json").read_text(encoding="utf-8"))["videos"] if NOTRE.match(v["id"])]
    p_r2, p_bi = R / "lib/videos/videos-r2.json", R / "lib/videos/bilans-videos.json"
    t_r2 = p_r2.open(encoding="utf-8", newline="").read()
    t_bi = p_bi.open(encoding="utf-8", newline="").read()
    r2, bi = json.loads(t_r2), json.loads(t_bi)
    a_r2, a_bi = len(r2), len(bi)
    for v in vids:
        base = v["fichier"][:-4]
        r2[v["id"]] = {"fichier": v["fichier"], "poster": v["miniature"], "vignette": base + ".vignette.webp",
                       "titre": v["titre"], "short": v["type"] == "short", "youtube": v.get("url"), "coach": coach(v)}
        chap = v.get("chapitres") or []
        titres = [c[1] if isinstance(c, list) else c.get("titre") for c in chap]
        vus = [t for t in titres[1:] if t and t not in HORS_VUS] if v["type"] != "short" else []
        bi[v["id"]] = {"vus": vus, "questions": [{"question": q["question"], "choix": q["choix"], "reponse": q["reponse"]}
                                                 for q in v.get("questions", [])]}
        print(v["id"], "| vus :", vus)
    print("videos-r2 :", a_r2, "→", len(r2), "| bilans :", a_bi, "→", len(bi))
    if not ecrire:
        return
    nl_r2 = "\r\n" if "\r\n" in t_r2 else "\n"
    s = json.dumps(r2, ensure_ascii=False, indent=1) + "\n"
    p_r2.write_text(s, encoding="utf-8", newline=nl_r2)
    for sep in ((",", ":"), (", ", ": ")):
        if json.dumps(json.loads(t_bi), ensure_ascii=False, separators=sep) in (t_bi, t_bi.rstrip("\r\n")):
            fin = t_bi[len(t_bi.rstrip("\r\n")):]
            p_bi.write_text(json.dumps(bi, ensure_ascii=False, separators=sep) + fin, encoding="utf-8", newline="")
            break
    else:
        raise SystemExit("bilans : format non reconnu, rien écrit pour bilans")
    print("écrit")


if __name__ == "__main__":
    main()
