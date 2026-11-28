/* Dessins propres aux films Ti Margo « margo-pb-cp » (28/11). Relu après margo-dessins.js.
   ⛔ Une seule session écrit ici : celle du CP (ou la fille qui la relaie).
   Les filles qui font un épisode mettent leurs dessins propres DANS leur film (fonctions locales), pas ici. */

/* Une lueur jaune ronde derrière un objet (commune à tous les dessins ci-dessous) */
function lueurCP(c,x,y,r,u){ if(u<=0) return; c.fillStyle=`rgba(255,212,59,${.38*u})`; c.beginPath(); c.arc(x,y,r,0,7); c.fill(); }

/* Un œuf (centre x, y ; hauteur h) */
function oeufE(c,x,y,h=70,{z=1,lueur=0,terne=0}={}){ if(z<=0) return; const k=Math.min(1.15,z); h*=k; lueurCP(c,x,y,h*.85,lueur);
  c.globalAlpha=terne?.35:1; c.fillStyle='#fff4e6'; c.strokeStyle='#d9a066'; c.lineWidth=4;
  c.beginPath(); c.ellipse(x,y,h*.38,h*.5,0,0,7); c.fill(); c.stroke();
  c.fillStyle='rgba(255,255,255,.8)'; c.beginPath(); c.ellipse(x-h*.12,y-h*.18,h*.08,h*.13,-.3,0,7); c.fill(); c.globalAlpha=1; }

/* Un nid de paille (centre du bas x, yBas ; largeur w) ; dessiner les œufs AVANT pour qu'il les cache à moitié */
function nidE(c,x,yBas,w=320,{lueur=0}={}){ const h=w*.32; lueurCP(c,x,yBas-h*.5,w*.62,lueur);
  c.fillStyle='#c08550'; c.strokeStyle='#8a5a2b'; c.lineWidth=5;
  c.beginPath(); c.moveTo(x-w/2,yBas-h); c.quadraticCurveTo(x,yBas+h*.35,x+w/2,yBas-h); c.lineTo(x+w*.42,yBas-h*.15); c.quadraticCurveTo(x,yBas+h*.2,x-w*.42,yBas-h*.15); c.closePath(); c.fill(); c.stroke();
  c.beginPath(); c.ellipse(x,yBas-h*.45,w/2,h*.55,0,0,Math.PI); c.fill(); c.stroke();
  c.strokeStyle='#ffd8a8'; c.lineWidth=3;
  for(let i=0;i<9;i++){ const a=x-w*.42+i*w*.105; c.beginPath(); c.moveTo(a,yBas-h*.7+((i%3)*6)); c.quadraticCurveTo(a+w*.05,yBas-h*.2,a+w*.11,yBas-h*.55); c.stroke(); } }

/* Une poule (centre du bas x, yBas ; échelle s) ; assise=1 : posée (on ne voit pas les pattes) */
function pouleE(c,x,yBas,s=1,{assise=0,T=0,dir=1,z=1,lueur=0}={}){ if(z<=0) return; c.save(); c.translate(x,yBas); c.scale(dir*s*z,s*z);
  lueurCP(c,0,-110,130,lueur); const b=Math.sin(T*2.4)*3;
  if(!assise){ c.strokeStyle='#f59f00'; c.lineWidth=7; c.lineCap='round';
    for(const px of [-22,22]){ c.beginPath(); c.moveTo(px,-50); c.lineTo(px,0); c.moveTo(px,0); c.lineTo(px+16,4); c.moveTo(px,0); c.lineTo(px-12,4); c.stroke(); } }
  const yc=assise?-55:-110;
  /* la queue */
  c.fillStyle='#e8590c'; c.beginPath(); c.moveTo(-70,yc-10); c.quadraticCurveTo(-130,yc-90,-95,yc-110); c.quadraticCurveTo(-80,yc-50,-60,yc-30); c.fill();
  /* le corps */
  c.fillStyle='#fff9db'; c.strokeStyle='#adb5bd'; c.lineWidth=4; c.beginPath(); c.ellipse(0,yc,92,68,0,0,7); c.fill(); c.stroke();
  c.fillStyle='#ffe8cc'; c.beginPath(); c.ellipse(-12,yc+6,48,30,.2,0,7); c.fill();
  /* la tête */
  const hx=62, hy=yc-80+b; c.fillStyle='#fff9db'; c.beginPath(); c.ellipse(hx,hy,40,44,0,0,7); c.fill(); c.stroke();
  c.fillStyle='#e03131'; c.beginPath(); c.arc(hx-12,hy-44,13,0,7); c.arc(hx+4,hy-48,14,0,7); c.arc(hx+18,hy-42,12,0,7); c.fill();
  c.beginPath(); c.ellipse(hx+30,hy+24,8,13,0,0,7); c.fill();
  c.fillStyle='#f59f00'; c.beginPath(); c.moveTo(hx+34,hy-6); c.lineTo(hx+62,hy+4); c.lineTo(hx+34,hy+14); c.closePath(); c.fill();
  c.fillStyle='#212529'; c.beginPath(); c.arc(hx+14,hy-8,6,0,7); c.fill();
  c.restore(); }

/* Un petit oiseau rond (centre x, y ; rayon r) ; aile > 0 : il bat des ailes (il vole) */
function oiseauE(c,x,y,r=34,{coul='#4dabf7',T=0,k=0,aile=0,dir=1,z=1,lueur=0,terne=0}={}){ if(z<=0) return; c.save(); c.translate(x,y); c.scale(dir*z,z);
  lueurCP(c,0,0,r*1.6,lueur); c.globalAlpha=terne?.3:1;
  c.fillStyle=coul; c.strokeStyle='rgba(0,0,0,.35)'; c.lineWidth=3;
  c.beginPath(); c.moveTo(-r*.8,-r*.1); c.lineTo(-r*1.45,-r*.45); c.lineTo(-r*1.4,r*.2); c.closePath(); c.fill();
  c.beginPath(); c.arc(0,0,r,0,7); c.fill(); c.stroke();
  c.fillStyle='#fff3bf'; c.beginPath(); c.ellipse(r*.2,r*.35,r*.55,r*.45,0,0,7); c.fill();
  const a=aile?Math.sin(T*14+k)*.9:0; c.fillStyle='rgba(0,0,0,.18)'; c.save(); c.translate(-r*.1,-r*.05); c.rotate(-.3-a); c.beginPath(); c.ellipse(-r*.35,0,r*.6,r*.32,0,0,7); c.fill(); c.restore();
  c.fillStyle='#212529'; c.beginPath(); c.arc(r*.45,-r*.3,r*.13,0,7); c.fill();
  c.fillStyle='#f59f00'; c.beginPath(); c.moveTo(r*.9,-r*.2); c.lineTo(r*1.35,-r*.05); c.lineTo(r*.9,r*.12); c.closePath(); c.fill();
  if(!aile){ c.strokeStyle='#f59f00'; c.lineWidth=3; c.beginPath(); c.moveTo(-r*.15,r*.95); c.lineTo(-r*.15,r*1.15); c.moveTo(r*.2,r*.95); c.lineTo(r*.2,r*1.15); c.stroke(); }
  c.globalAlpha=1; c.restore(); }

/* Un fil tendu entre deux poteaux (y = hauteur du fil) */
function filPoteauxE(c,x0,x1,y){ c.fillStyle='#8a5a2b'; c.fillRect(x0-12,y-30,24,720-y+30); c.fillRect(x1-12,y-30,24,720-y+30);
  c.strokeStyle='#343a40'; c.lineWidth=5; c.beginPath(); c.moveTo(x0,y); c.quadraticCurveTo((x0+x1)/2,y+26,x1,y); c.stroke(); }
/* La hauteur du fil à l'abscisse x (pour poser les oiseaux dessus) */
const filYE=(x0,x1,y,x)=>{ const u=(x-x0)/(x1-x0); return y+52*u*(1-u); };

/* Un biscuit rond (centre x, y ; rayon r) ; croque (0 → 1) : une bouchée en moins */
function biscuitE(c,x,y,r=40,{z=1,lueur=0,terne=0,croque=0}={}){ if(z<=0) return; const k=Math.min(1.15,z); r*=k; lueurCP(c,x,y,r*1.5,lueur);
  c.save(); c.globalAlpha=terne?.3:1; c.fillStyle='#e8a15c'; c.strokeStyle='#a0522d'; c.lineWidth=4;
  c.beginPath(); c.arc(x,y,r,0,7); c.fill(); c.stroke();
  if(croque>0){ c.globalCompositeOperation='destination-out'; c.beginPath(); c.arc(x+r*.85,y-r*.6,r*.55*Math.min(1,croque),0,7); c.fill(); c.globalCompositeOperation='source-over'; }
  c.fillStyle='#6b3b1f'; for(const [dx,dy] of [[-.4,-.3],[.3,-.1],[-.1,.4],[.35,.45],[-.45,.25]]){ c.beginPath(); c.arc(x+dx*r,y+dy*r,r*.11,0,7); c.fill(); }
  c.restore(); }

/* Une boîte ouverte (coin bas gauche x, yBas ; largeur w ; hauteur h) ; dessiner son contenu APRÈS le fond, AVANT le devant */
function boiteFondE(c,x,yBas,w,h,coul='#4dabf7'){ c.fillStyle='rgba(0,0,0,.25)'; c.beginPath(); c.roundRect(x,yBas-h,w,h,10); c.fill();
  c.fillStyle=coul; c.strokeStyle='rgba(0,0,0,.4)'; c.lineWidth=4; c.beginPath(); c.moveTo(x,yBas-h); c.lineTo(x-26,yBas-h-50); c.lineTo(x+w*.45,yBas-h-50); c.lineTo(x+w*.5,yBas-h); c.closePath(); c.fill(); c.stroke(); }
function boiteDevantE(c,x,yBas,w,h,coul='#4dabf7',{lueur=0}={}){ if(lueur>0){ c.strokeStyle=`rgba(255,212,59,${.8*lueur})`; c.lineWidth=12; c.beginPath(); c.roundRect(x-6,yBas-h*.45-6,w+12,h*.45+12,12); c.stroke(); }
  c.fillStyle=coul; c.strokeStyle='rgba(0,0,0,.4)'; c.lineWidth=4; c.beginPath(); c.roundRect(x,yBas-h*.45,w,h*.45,10); c.fill(); c.stroke();
  c.fillStyle='rgba(255,255,255,.35)'; c.fillRect(x+10,yBas-h*.45+10,w-20,8); }

/* La fenêtre du train : le paysage défile (champs, arbres) derrière une vitre (x, y, w, h) */
function fenetreTrainE(c,x,y,w,h,T){ c.save(); c.beginPath(); c.roundRect(x,y,w,h,26); c.clip();
  c.fillStyle='#a5d8ff'; c.fillRect(x,y,w,h); c.fillStyle='#8ce99a'; c.fillRect(x,y+h*.62,w,h*.38);
  c.fillStyle='#b2f2bb'; c.beginPath(); c.ellipse(x+w*.3,y+h*.66,w*.5,h*.12,0,0,7); c.fill();
  const d=(T*120)%(w*.5);
  for(let i=-1;i<4;i++){ const ax=x+w-((i*w*.5+d)%(w*2))+w*.2; c.fillStyle='#8a5a2b'; c.fillRect(ax-6,y+h*.48,12,h*.18);
    c.fillStyle='#2f9e44'; c.beginPath(); c.arc(ax,y+h*.44,h*.12,0,7); c.fill(); }
  c.fillStyle='rgba(255,255,255,.85)'; c.beginPath(); c.ellipse(x+w*.25-((T*20)%(w*.6))+w*.4,y+h*.18,w*.1,h*.06,0,0,7); c.fill();
  c.restore(); c.strokeStyle='#495057'; c.lineWidth=14; c.beginPath(); c.roundRect(x,y,w,h,26); c.stroke();
  c.strokeStyle='rgba(255,255,255,.4)'; c.lineWidth=5; c.beginPath(); c.moveTo(x+w*.12,y+h*.2); c.lineTo(x+w*.25,y+h*.08); c.stroke(); }

/* Une carte à jouer (centre x, y ; largeur w), une étoile dessus */
function carteJeuE(c,x,y,w=70,{coul='#e64980',a=0,z=1,lueur=0}={}){ if(z<=0) return; const k=Math.min(1.15,z), h=w*1.4; c.save(); c.translate(x,y); c.rotate(a); c.scale(k,k);
  lueurCP(c,0,0,h*.75,lueur);
  c.fillStyle='#fff'; c.strokeStyle='#495057'; c.lineWidth=3; c.beginPath(); c.roundRect(-w/2,-h/2,w,h,8); c.fill(); c.stroke();
  c.fillStyle=coul; c.beginPath(); for(let i=0;i<10;i++){ const rr=i%2?w*.14:w*.32, t=-Math.PI/2+i*Math.PI/5; c.lineTo(Math.cos(t)*rr,Math.sin(t)*rr); } c.closePath(); c.fill();
  c.restore(); }

/* Un bandeau sombre derrière une formule écrite sur un décor clair (ciel, mur) : centre x, y ; largeur w ; hauteur h */
function bandeauE(c,x,y,w,h=120,u=1){ if(u<=0) return; c.fillStyle=`rgba(33,37,41,${.78*Math.min(1,u)})`; c.beginPath(); c.roundRect(x-w/2,y-h/2,w,h,h/2); c.fill(); }
