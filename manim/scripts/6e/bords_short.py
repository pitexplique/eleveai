# Marge de 3 % d'un short sur décor clair : cherche Ti Margo (vert), les cartes (encre) et les objets maths.
import sys,subprocess,numpy as np,tempfile,glob,os
from PIL import Image
v=sys.argv[1]; d=tempfile.mkdtemp()
subprocess.run(['ffmpeg','-v','error','-i',v,'-vf','fps=2',d+'/%05d.png'],check=True)
m=32; al=[]; fs=sorted(glob.glob(d+'/*.png'))
for f in fs:
    a=np.asarray(Image.open(f).convert('RGB'),dtype=int)
    for nom,z in (('G',a[:,:m]),('D',a[:,-m:]),('H',a[:m]),('B',a[-m:])):
        r,g,b=z[...,0],z[...,1],z[...,2]
        vert=(g>r+25)&(g>b+60)&(g>90)             # Ti Margo
        encre=(r<70)&(g<100)&(b<80)               # cartes, contours
        n=int(vert.sum()+encre.sum())
        if n>25: al.append((int(os.path.basename(f)[:5])/2,nom,n))
print(len(fs),'images,',len(al),'alertes',al[:12])
