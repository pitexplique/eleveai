/* Série Solides et espace CE2 : les shorts en dessin animé. Outils : films/ce2-commun.js, plus ici :
   les solides en PERSPECTIVE CAVALIÈRE à la craie (mêmes règles que les paysages,
   manim/scripts/ce2/solides_ce2_commun.py : fuyantes à 45°, coefficient 0,5, faces vues pleines,
   arêtes cachées en POINTILLÉS), le cône, le cylindre, et le pliage d'un patron de cube en 3D.
   Code couleur des paysages : faces bleu clair, arêtes orange, sommets jaunes.
   ÉPISODE 01 : LE SAC MYSTÈRE. Ti Margo touche sans regarder : rond en bas, pointu en haut. « Une pyramide ! »
   Non : un cône (C). Dans le sac, un cornet de glace. Commentaire : une boîte de conserve. */

const KC=.5, AC=Math.PI/4, VUE=[-KC*Math.cos(AC),-KC*Math.sin(AC),1];
const SFACE='#74c0fc', SARETE='#ff922b', SSOMMET='#ffd43b';
const sub=(a,b)=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]], dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
/* Projection cavalière : (x à droite, y en haut, z vers le fond) → pixels, e = pixels par unité */
function cav(p,e,ox,oy){ return [ox+(p[0]+KC*p[2]*Math.cos(AC))*e, oy-(p[1]+KC*p[2]*Math.sin(AC))*e]; }
function newell(P){ let n=[0,0,0]; for(let i=0;i<P.length;i++){ const c=cross(P[i],P[(i+1)%P.length]); n=[n[0]+c[0],n[1]+c[1],n[2]+c[2]]; }
  const l=Math.hypot(...n)||1; return n.map(v=>v/l); }
/* Un polyèdre : faces orientées vers l'extérieur, faces vues, arêtes vues ou cachées */
function polyedre(S,F){ const g=S.reduce((a,p)=>[a[0]+p[0]/S.length,a[1]+p[1]/S.length,a[2]+p[2]/S.length],[0,0,0]);
  const faces=F.map(f=>{ let P=f.map(i=>S[i]), n=newell(P); const m=P.reduce((a,p)=>[a[0]+p[0]/P.length,a[1]+p[1]/P.length,a[2]+p[2]/P.length],[0,0,0]);
    if(dot(n,sub(m,g))<0){ f=[...f].reverse(); n=n.map(v=>-v); } return {f,n,vue:dot(n,VUE)<-1e-6}; });
  const A={}; faces.forEach((fa,k)=>fa.f.forEach((a,j)=>{ const b=fa.f[(j+1)%fa.f.length], key=Math.min(a,b)+'-'+Math.max(a,b); (A[key]=A[key]||[]).push(k); }));
  const aretes=Object.entries(A).map(([key,ks])=>{ const [a,b]=key.split('-').map(Number); return {a,b,key,vue:ks.some(k=>faces[k].vue)}; });
  return {S,faces,aretes}; }
const CUBE_S=[[0,0,0],[1,0,0],[1,1,0],[0,1,0],[0,0,1],[1,0,1],[1,1,1],[0,1,1]];
const CUBE_F=[[0,1,2,3],[4,5,6,7],[0,1,5,4],[3,2,6,7],[0,3,7,4],[1,2,6,5]];
function pave3(L=1,h=1,p=1){ return polyedre(CUBE_S.map(([x,y,z])=>[x*L,y*h,z*p]),CUBE_F); }
function pyramide3(n=4,cote=1,h=1.1,L=null){ let b;
  if(n===4){ const l=L||cote; b=[[0,0,0],[l,0,0],[l,0,cote],[0,0,cote]]; return polyedre([...b,[l/2,h,cote/2]],[[0,1,2,3],[0,1,4],[1,2,4],[2,3,4],[3,0,4]]); }
  const r=cote/(2*Math.sin(Math.PI/n)), r0=-Math.PI/2-Math.PI/n;
  b=[...Array(n)].map((_,i)=>[r*Math.cos(r0+2*Math.PI*i/n),0,r*Math.sin(r0+2*Math.PI*i/n)]);
  return polyedre([...b,[0,h,0]],[[...Array(n).keys()],...[...Array(n).keys()].map(i=>[i,(i+1)%n,n])]); }
/* Teinte d'une face selon sa normale : le dessus clair, la droite plus sombre */
function teinte(hex,n){ const l=.55*Math.max(0,n[1])-.35*Math.max(0,n[0])+.15*Math.max(0,-n[2]);
  const v=parseInt(hex.slice(1),16), rgb=[v>>16,(v>>8)&255,v&255].map(x=>l>=0?x+(255-x)*Math.min(l,.6):x*(1+Math.max(l,-.6)));
  return 'rgb('+rgb.map(Math.round).join(',')+')'; }
/* Dessine un polyèdre. o = {e, ox, oy, coul, trait, lw, faces:{k:couleur}, aretes:{'a-b':couleur}, alpha} */
function dessinerPoly(c,P,o){ const e=o.e, pr=P.S.map(p=>cav(p,e,o.ox,o.oy)), lw=o.lw||6;
  c.save(); c.lineJoin='round'; c.lineCap='round';
  P.faces.forEach((fa,k)=>{ if(!fa.vue) return; c.globalAlpha=o.alpha??.92; c.fillStyle=teinte((o.faces&&o.faces[k])||o.coul||SFACE,fa.n);
    c.beginPath(); fa.f.forEach((i,j)=>j?c.lineTo(...pr[i]):c.moveTo(...pr[i])); c.closePath(); c.fill(); });
  c.globalAlpha=1;
  P.faces.forEach((fa,k)=>{ if(fa.vue||!(o.faces&&o.faces[k])) return; c.fillStyle=o.faces[k]; c.globalAlpha=.3;
    c.beginPath(); fa.f.forEach((i,j)=>j?c.lineTo(...pr[i]):c.moveTo(...pr[i])); c.closePath(); c.fill(); c.globalAlpha=1; });
  for(const ar of P.aretes){ const col=(o.aretes&&o.aretes[ar.key])||o.trait||'#f8f9fa';
    if(o.cacheesOff&&!ar.vue) continue;
    c.strokeStyle=col; c.lineWidth=(o.aretes&&o.aretes[ar.key])?lw*1.8:(ar.vue?lw:lw*.7); c.setLineDash(ar.vue?[]:[16,12]);
    c.beginPath(); c.moveTo(...pr[ar.a]); c.lineTo(...pr[ar.b]); c.stroke(); }
  c.setLineDash([]); c.restore(); return pr; }
/* Le centre écran d'un polyèdre : ox, oy pour que son dessin soit centré sur (cx, cy) */
function centrer(P,e,cx,cy){ const pr=P.S.map(p=>cav(p,e,0,0)), xs=pr.map(p=>p[0]), ys=pr.map(p=>p[1]);
  return {e,ox:cx-(Math.min(...xs)+Math.max(...xs))/2, oy:cy-(Math.min(...ys)+Math.max(...ys))/2}; }
/* Le cône et le cylindre debout : base en ellipse (devant pleine, derrière en pointillés) */
function ellipseBase(c,x,y,rx,ry,coul,lw=6){ c.strokeStyle=coul; c.lineWidth=lw; c.beginPath(); c.ellipse(x,y,rx,ry,0,0,Math.PI); c.stroke();
  c.setLineDash([14,10]); c.lineWidth=lw*.7; c.beginPath(); c.ellipse(x,y,rx,ry,0,Math.PI,2*Math.PI); c.stroke(); c.setLineDash([]); }
function cone(c,x,y,r,h,coul='#69db7c',{pointe=false,disque=null,trait='#f8f9fa',bas=true}={}){ const ry=r*.32;
  c.fillStyle=coul; c.beginPath(); c.moveTo(x-r,y); c.lineTo(x,y-h); c.lineTo(x+r,y); c.ellipse(x,y,r,ry,0,0,Math.PI); c.fill();
  if(disque){ c.fillStyle=disque; c.globalAlpha=.6; c.beginPath(); c.ellipse(x,y,r,ry,0,0,2*Math.PI); c.fill(); c.globalAlpha=1; }
  c.strokeStyle=trait; c.lineWidth=6; c.lineJoin='round'; c.beginPath(); c.moveTo(x-r,y); c.lineTo(x,y-h); c.lineTo(x+r,y); c.stroke();
  if(bas) ellipseBase(c,x,y,r,ry,trait); if(pointe) rond(c,x,y-h,14,SSOMMET); }
function cylindre(c,x,y,r,h,coul='#4dabf7',{haut=null,bas=null,trait='#f8f9fa'}={}){ const ry=r*.32;
  c.fillStyle=coul; c.beginPath(); c.moveTo(x-r,y); c.lineTo(x-r,y-h); c.ellipse(x,y-h,r,ry,0,Math.PI,0,true); c.lineTo(x+r,y); c.ellipse(x,y,r,ry,0,0,Math.PI); c.fill();
  c.fillStyle=haut||'#a5d8ff'; c.beginPath(); c.ellipse(x,y-h,r,ry,0,0,2*Math.PI); c.fill();
  if(bas){ c.fillStyle=bas; c.globalAlpha=.5; c.beginPath(); c.ellipse(x,y,r,ry,0,0,2*Math.PI); c.fill(); c.globalAlpha=1; }
  c.strokeStyle=trait; c.lineWidth=6; c.beginPath(); c.ellipse(x,y-h,r,ry,0,0,2*Math.PI); c.stroke();
  c.beginPath(); c.moveTo(x-r,y); c.lineTo(x-r,y-h); c.moveTo(x+r,y); c.lineTo(x+r,y-h); c.stroke(); ellipseBase(c,x,y,r,ry,trait); }
function rond(c,x,y,r,coul){ c.fillStyle=coul; c.beginPath(); c.arc(x,y,r,0,7); c.fill(); }
const entre=(T,t0,t1)=>Math.max(0,Math.min(1,(T-t0)/Math.max(.05,t1-t0)));
const lisse01=u=>u*u*(3-2*u);

/* ---- Le patron de cube qui se plie : cellules (colonne, rangée), parents, angles (degrés), tilt ---- */
const PATRONS={ croix:[{fond:[1,1],g:[0,1],d:[2,1],av:[1,0],ar:[1,2],couv:[1,3]},{fond:null,g:'fond',d:'fond',av:'fond',ar:'fond',couv:'ar'}],
  ligne:[{a:[0,0],fond:[1,0],c:[2,0],d:[3,0],e:[4,0],f:[5,0]},{fond:null,a:'fond',c:'fond',d:'c',e:'d',f:'e'}] };
function rotRod(v,a,th){ const c=Math.cos(th), s=Math.sin(th), axv=cross(a,v), d=dot(a,v);
  return [v[0]*c+axv[0]*s+a[0]*d*(1-c), v[1]*c+axv[1]*s+a[1]*d*(1-c), v[2]*c+axv[2]*s+a[2]*d*(1-c)]; }
/* angles : {nom: degrés}, tilt : −90 = à plat face à nous, 0 = couché sur la table ; sens −1 : plié vers l'arrière */
function plierPatron(nom,angles,tilt=0,sens=1){ const [cel,par]=PATRONS[nom], t=tilt*Math.PI/180;
  const monde=(k,p)=>{ let s=k; while(par[s]){ const pa=par[s], [c1,r1]=cel[s], [c0,r0]=cel[pa];
      const d=[c1-c0,0,r1-r0], ch=[(c0+c1)/2+.5,0,(r0+r1)/2+.5], ax=cross(d,[0,sens,0]);
      const v=rotRod(sub(p,ch),ax,(angles[s]||0)*Math.PI/180); p=[ch[0]+v[0],ch[1]+v[1],ch[2]+v[2]]; s=pa; } return p; };
  const incl=p=>[p[0],p[1]*Math.cos(t)-p[2]*Math.sin(t),p[1]*Math.sin(t)+p[2]*Math.cos(t)];
  return Object.keys(cel).map(k=>{ const [c0,r0]=cel[k], P=[[c0,0,r0],[c0+1,0,r0],[c0+1,0,r0+1],[c0,0,r0+1]].map(p=>incl(monde(k,p)));
    return {nom:k,P,n:newell(P),z:P.reduce((a,p)=>a+p[2],0)/4-.02*P.reduce((a,p)=>a+p[1],0)/4}; }).sort((a,b)=>b.z-a.z); }
/* Dessine les carrés pliés ; ancre = le centre du fond (cellule racine) à l'écran */
function dessinerPatron(c,carres,e,cx,cy,{coul='#e8b04b',couleurs={},caches=[],numeros=null}={}){
  const fond=carres.find(q=>q.nom==='fond'), m=fond.P.reduce((a,p)=>[a[0]+p[0]/4,a[1]+p[1]/4,a[2]+p[2]/4],[0,0,0]), o=cav(m,e,0,0);
  const ox=cx-o[0], oy=cy-o[1];
  for(const q of carres){ if(caches.includes(q.nom)) continue; const pr=q.P.map(p=>cav(p,e,ox,oy)), n=dot(q.n,VUE)>0?q.n.map(v=>-v):q.n;
    c.fillStyle=teinte(couleurs[q.nom]||coul,n); c.strokeStyle='#7c4a12'; c.lineWidth=6; c.lineJoin='round';
    c.beginPath(); pr.forEach((p,j)=>j?c.lineTo(...p):c.moveTo(...p)); c.closePath(); c.fill(); c.stroke();
    if(numeros&&numeros[q.nom]){ const g=pr.reduce((a,p)=>[a[0]+p[0]/4,a[1]+p[1]/4],[0,0]); ecrire(c,numeros[q.nom],g[0],g[1]+18,56,'#3b2a14'); } } }

/* ---- Les objets de la série ---- */
function sacMystere(c,x,y,w,h,ouvert=0){ c.fillStyle='#a0522d'; c.beginPath(); c.moveTo(x-w*.42,y-h*.62); c.quadraticCurveTo(x-w*.62,y+h*.3,x-w*.4,y+h*.42);
  c.lineTo(x+w*.4,y+h*.42); c.quadraticCurveTo(x+w*.62,y+h*.3,x+w*.42,y-h*.62); c.closePath(); c.fill();
  c.fillStyle='#8b4513'; c.fillRect(x-w*.46,y-h*.66,w*.92,h*.12); c.strokeStyle='#e9c46a'; c.lineWidth=8;
  c.beginPath(); c.moveTo(x-w*.1,y-h*.6); c.quadraticCurveTo(x,y-h*.75-ouvert*30,x+w*.1,y-h*.6); c.stroke(); }
function cornet(c,x,y,s=1){ c.fillStyle='#e8a33d'; c.beginPath(); c.moveTo(x-70*s,y-150*s); c.lineTo(x,y); c.lineTo(x+70*s,y-150*s); c.closePath(); c.fill();
  c.strokeStyle='#b07020'; c.lineWidth=4; for(let k=1;k<4;k++){ c.beginPath(); c.moveTo(x-70*s+k*35*s,y-150*s); c.lineTo(x-35*s+k*10*s,y-60*s); c.stroke(); }
  rond(c,x,y-180*s,72*s,'#f783ac'); rond(c,x-25*s,y-205*s,20*s,'#fcc2d7'); }

FILMS.reconnaitre=function(outils){
  const DUR={'00-accroche':10.41,'01-oups':6.34,'02-question':13.94,'02b-reponse':10.17,'03-ouf':5.59,'04-commentaire':6.39,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':.4,'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,oup,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();
  const W=tab.W;

  const tSoeur=mot('00-accroche','sœur'), tRond=mot('00-accroche','rond'), tPique=mot('00-accroche','pique');
  const tPyr=mot('01-oups','pyramide'), tRig=mot('01-oups','rigole');
  const tCornet=mot('03-ouf','cornet'), tMiam=mot('03-ouf','Miam');
  const tBoite=mot('04-commentaire','boîte'), tRep=mot('04-commentaire','Réponds');
  const tJe=mot('00-accroche','Ma');

  function dessiner(T){ const c=tab.c; tab.effacer(); const X=W/2, Y=560;
    if(T>=com){ /* le défi : une boîte de conserve */
      cylindre(c,X,560,130,300,'#e03131',{haut:'#ced4da'}); c.fillStyle='#f8f9fa'; c.fillRect(X-130,400,260,70);
      ecrire(c,'TOMATES',X,450,44,'#e03131');
      if(T>=tRep) ecrire(c,'?',X+250,330,150*zoom(T,tRep,.6),CRAIE.jaune);
      tab.maj(); return; }
    if(T<oup){ /* le sac : on touche, rond en bas, pointu en haut */
      if(T>=tSoeur) sacMystere(c,X,380,420,420);
      if(T>=tRond){ c.save(); c.setLineDash([16,10]); c.strokeStyle=CRAIE.jaune; c.lineWidth=8; c.beginPath(); c.ellipse(X,520,150,40,0,0,7); c.stroke(); c.restore();
        ecrire(c,'rond',X-280,540,58*zoom(T,tRond,.4),CRAIE.jaune); }
      if(T>=tPique){ const k=zoom(T,tPique,.4); c.fillStyle=CRAIE.faux; c.beginPath(); c.moveTo(X-25,240); c.lineTo(X,240-90*k); c.lineTo(X+25,240); c.fill();
        ecrire(c,'pointu !',X+250,170,58*k,CRAIE.faux); }
      tab.maj(); return; }
    if(T<q){ /* « une pyramide ! » … et la sœur rigole */
      const P=pyramide3(4,1,1.2), o=centrer(P,300,X-120,400); if(T>=tPyr) dessinerPoly(c,P,{...o,coul:'#ffd43b'});
      if(T>=tPyr) ecrire(c,'une pyramide ?',X-120,110,64*zoom(T,tPyr,.4),CRAIE.blanc);
      if(T>=tRig){ ecrire(c,'hi hi hi !',X+300,250,60*zoom(T,tRig,.4),'#f783ac'); ecrire(c,'?',X+300,420,120*zoom(T,tRig,.5),CRAIE.jaune); }
      tab.maj(); return; }
    /* ouf : le cornet de glace sort du sac */
    sacMystere(c,X-200,450,320,320,1);
    if(T>=tCornet){ const u=lisse01(entre(T,tCornet,tCornet+.8)); cornet(c,X+170,600-60*u,1.15); }
    if(T>=tMiam) ecrire(c,'Miam !',X+170,120,70*zoom(T,tMiam,.4),'#f783ac');
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-oups'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,tJe-.08,352,62,a0('Salut !')),
    ...suiteDe(oup,60,62,[a0('Ma sœur a caché un objet'),a0('dans ce sac.')],[a0('Je ne regarde pas,'),a0('je touche.')],
      [a0('C’est rond en bas…'),a0('et ça pique en haut !')]),
    ...suiteDe(q,60,62,[a1('Facile !'),a1('C’est une pyramide !')],[a1('Hé, pourquoi'),a1('ma sœur rigole ?')]),
    ...suiteDe(com,60,62,[a3('Et dans le sac…'),a3('un cornet de glace !')],[a3('Miam, je le garde !')]),
    ...suiteDe(f,60,60,[a4('À toi : une boîte'),a4('de conserve,'),a4('c’est quel solide ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Rond en bas, pointu en haut :'),qd('c’est quel solide ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('C’est un cône :'), r2=rd('un disque en bas,'), r3=rd('et une pointe en haut.'), r4=rd('La pyramide, elle,'), r5=rd('a des faces plates en triangles.');
  const tC=mot('02b-reponse','C');

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>
    <path d="M100 70 Q70 200 105 215 L225 215 Q260 200 230 70 Z" fill="#a0522d"/><rect x="92" y="60" width="146" height="20" fill="#8b4513"/>
    <path d="M150 60 L165 20 L180 60 Z" fill="#ff8787"/><ellipse cx="165" cy="195" rx="60" ry="15" fill="none" stroke="#ffd43b" stroke-width="6" stroke-dasharray="12 8"/>
    <text x="165" y="150" font-family="Segoe UI" font-weight="800" font-size="70" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'Quel solide<br>dans le sac ?'+PARI,mini);
  return { clips,FIN,titre:'Le sac mystère',ceinture:0,finTitre:tJe-.08,groupes,finClip:'05-abonne',
    cuts:[tJe-.08,oup,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['une pyramide',tq('A'),tq('pyramide')],['un cylindre',tq('B'),tq('cylindre')],['un cône',tq('C'),tq('cône')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1,r2,r3,r4,r5],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<tJe-.08;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});
      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<oup){ T<tRond?g.montre():(T<tPique?g.reflechit():g.oups()); }
      else if(T<q){ if(T<tRig) g.fier(); else { g.oups(); scene.ry=-.12+.3*lisse((T-tRig)/.35); } }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tC?g.ouvre():g.pouce(); }
      else if(T<com){ T<tMiam?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }
      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
