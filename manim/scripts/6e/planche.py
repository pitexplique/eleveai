import sys,glob,os,re
from PIL import Image,ImageDraw,ImageFont
d,out=sys.argv[1],sys.argv[2]; n=int(sys.argv[3]) if len(sys.argv)>3 else 7; w=int(sys.argv[4]) if len(sys.argv)>4 else 300
fs=sorted(glob.glob(d+'/*.png'),key=lambda f:float(re.search(r't([\d.]+)\.png',os.path.basename(f)).group(1)))
ims=[Image.open(f).convert('RGB') for f in fs]; h=int(ims[0].height*w/ims[0].width)
rows=(len(ims)+n-1)//n; P=Image.new('RGB',(n*w,rows*h),'black'); D=ImageDraw.Draw(P)
for i,(f,im) in enumerate(zip(fs,ims)):
    x,y=(i%n)*w,(i//n)*h; P.paste(im.resize((w,h)),(x,y)); D.rectangle((x,y,x+70,y+18),fill='black'); D.text((x+3,y+3),os.path.basename(f)[1:-4],fill='yellow')
P.save(out); print(P.size)
