# Usage : python scripts/verifier-bords-video.py <video.mp4> [pas_en_s]  → doit afficher « 0 instants ».
# Détecte le texte/dessin qui touche les bords du cadre (marge < 2 % de la largeur).
import sys, av, numpy as np
src = sys.argv[1]; pas = float(sys.argv[2]) if len(sys.argv) > 2 else 1.0
c = av.open(src); s = c.streams.video[0]; d = c.duration / 1e6
t = 0.5; alertes = []
while t < d:
    c.seek(int(t * 1e6))
    for f in c.decode(video=0):
        if f.time >= t - 0.02:
            a = f.to_ndarray(format="rgb24"); h, w, _ = a.shape; m = int(w * 0.02)
            lum = a.max(axis=2) > 60
            bords = {"gauche": lum[:, :m], "droite": lum[:, -m:], "haut": lum[:m, :], "bas": lum[-m:, :]}
            touche = [k for k, v in bords.items() if v.mean() > 0.002]
            if touche: alertes.append((round(t, 1), touche))
            break
    t += pas
for x in alertes: print(x)
print(len(alertes), "instants qui touchent un bord")
