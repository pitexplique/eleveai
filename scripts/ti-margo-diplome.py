# Ti Margo diplômé (16/10/2026) — pour la bande CRPE de l'accueil.
# Frédéric : « à gauche deux personnes créoles avec diplômes ou margouillat
# avec diplôme ». Ti Margo + une toque de diplômé + un diplôme roulé, dessinés
# ici par-dessus l'image d'origine (rien n'est retouché dans ti-margo.png).
# Usage : python scripts/ti-margo-diplome.py → public/images/ti-margo-diplome.png

from pathlib import Path

from PIL import Image, ImageDraw

RACINE = Path(__file__).resolve().parents[1]
NAVY = (4, 27, 51, 255)
AMBRE = (251, 191, 36, 255)
CREME = (255, 247, 230, 255)
ROUGE = (220, 38, 38, 255)
TRAIT = (15, 23, 42, 255)

tm = Image.open(RACINE / "public" / "cahier-vacances" / "ti-margo.png").convert("RGBA")
tm = tm.crop(tm.getbbox())  # 750 x 1094
M = 230  # marge en haut pour la toque
im = Image.new("RGBA", (tm.width + 80, tm.height + M), (0, 0, 0, 0))
im.alpha_composite(tm, (0, M))
d = ImageDraw.Draw(im)

# ── La toque, posée sur le haut du crâne (vers x = 360 dans l'image rognée)
cx, cy = 372, M + 6
# ⚠️ Liseré AMBRE : la bande de l'accueil est bleu nuit, une toque noire sans
# bord y disparaîtrait.
NOIR = (17, 24, 39, 255)
d.polygon([(cx - 120, cy + 10), (cx + 120, cy + 10), (cx + 105, cy + 110), (cx - 105, cy + 110)],
          fill=NOIR, outline=AMBRE, width=8)
d.polygon([(cx - 240, cy), (cx, cy - 75), (cx + 240, cy), (cx, cy + 75)], fill=NOIR, outline=AMBRE, width=10)
d.ellipse((cx - 16, cy - 16, cx + 16, cy + 16), fill=AMBRE)
# le gland, qui pend du bord droit
d.line([(cx, cy), (cx + 225, cy + 6), (cx + 225, cy + 150)], fill=AMBRE, width=12)
d.rounded_rectangle((cx + 205, cy + 140, cx + 245, cy + 215), radius=10, fill=AMBRE)

# ── Le diplôme roulé, dessiné à part puis incliné, posé en bas à gauche
roule = Image.new("RGBA", (420, 140), (0, 0, 0, 0))
r = ImageDraw.Draw(roule)
r.rounded_rectangle((30, 25, 390, 115), radius=45, fill=CREME, outline=TRAIT, width=6)
r.ellipse((350, 25, 420, 115), fill=CREME, outline=TRAIT, width=6)
r.ellipse((370, 50, 400, 90), fill=(253, 230, 138, 255), outline=TRAIT, width=4)
r.rectangle((185, 22, 225, 118), fill=ROUGE, outline=TRAIT, width=4)
r.polygon([(195, 115), (215, 115), (225, 140), (205, 128), (185, 140)], fill=ROUGE)
roule = roule.rotate(28, expand=True, resample=Image.BICUBIC)
im.alpha_composite(roule, (-10, M + 700))

im = im.crop(im.getbbox())
im.thumbnail((360, 520), Image.LANCZOS)  # la bande l'affiche à ~70 px de haut
chemin = RACINE / "public" / "images" / "ti-margo-diplome.png"
im.save(chemin, optimize=True)
print(chemin, im.size)
