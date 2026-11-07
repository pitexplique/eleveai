# python planche_video.py <mp4> <sortie.png> <colonnes> <largeur> <pas_s>
import sys,subprocess,os,tempfile,glob
from PIL import Image,ImageDraw
mp4,out,n,w,pas=sys.argv[1],sys.argv[2],int(sys.argv[3]),int(sys.argv[4]),float(sys.argv[5])
d=tempfile.mkdtemp()
subprocess.run(['ffmpeg','-v','error','-i',mp4,'-vf',f'fps=1/{pas},scale={w}:-1',d+'/%04d.png'],check=True)
fs=sorted(glob.glob(d+'/*.png')); ims=[Image.open(f).convert('RGB') for f in fs]; h=ims[0].height
r=(len(ims)+n-1)//n; P=Image.new('RGB',(n*w,r*h),'black'); D=ImageDraw.Draw(P)
for i,im in enumerate(ims):
    x,y=(i%n)*w,(i//n)*h; P.paste(im,(x,y)); D.rectangle((x,y,x+44,y+13),fill='black'); D.text((x+2,y+1),f'{(i+.5)*pas:.0f}s',fill='yellow')
P.save(out); print(out,P.size)
