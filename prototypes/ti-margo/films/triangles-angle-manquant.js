/* Série Triangles 6e, épisode 07 : LE COIN MANGÉ. Ti Margo cuisinier croque le coin d'un biscuit
   en triangle : 180° moins ce qui reste, et le coin est retrouvé. Cuisine carrelée. */

function voixTri07(A){
  const norme=s=>s.toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g,''), CL={};
  for(const [k,l] of Object.entries((window.CUES||{})[VIDEO]||{})){ CL[k]=[]; for(const [t,w] of l){ const d=CL[k][CL[k].length-1]; if(!(d&&norme(d[1])===norme(w)&&/[0-9]/.test(w))) CL[k].push([t,w]); } }
  function dit(clip){ const l=CL[clip]; if(!l) throw new Error('clip sans instants : '+clip); let i=0, prec='', av=null;
    const f=txt=>{ const tm=[]; txt.split(' ').forEach(w=>{ const n=norme(w); if(!n){ tm.push(av); return; }
        const c=i<l.length?norme(l[i][1]):'';
        if(prec.includes(n)&&!(c&&(c.includes(n)||n.includes(c)))){ tm.push(av); return; }
        if(i>=l.length) throw new Error(`${clip} : plus de mots pour « ${txt} »`);
        if(!c.includes(n)&&!n.includes(c)) throw new Error(`${clip} : écrit « ${w} », dit « ${l[i][1]} »`);
        av=A[clip]+l[i][0]; prec=c; tm.push(av); i++; });
      return [tm[0],tm[tm.length-1],txt,tm]; };
    f.saute=n=>{ i+=n; return f; };
    return f; }
  function mot(clip,m,n=1){ const l=CL[clip], c=norme(m); let k=0;
    for(const [t,w] of l) if(w.split(/\s+/).some(x=>norme(x)===c)&&++k===n) return A[clip]+t;
    throw new Error(`${clip} : mot introuvable « ${m} »`); }
  return {dit,mot};
}

function triAngles07(angB,angC,base,cx,baseY){ const r=Math.PI/180, angA=180-angB-angC, ab=base*Math.sin(angC*r)/Math.sin(angA*r);
  return [[cx-base/2+ab*Math.cos(angB*r),baseY-ab*Math.sin(angB*r)],[cx-base/2,baseY],[cx+base/2,baseY]]; }

/* Le biscuit : S = [haut, bas gauche, bas droite].
   o.croque (0→1) : le haut est mangé ; o.retrouve (0→1) : le coin revient, en vert ; o.etiq = {sommet: texte} */
function biscuit(c,S,o={}){ const R=o.r||S.R||100, fond=o.fond||'#fffdf5', V=S[0], ep=o.ep||9;
  const d=(a,b)=>{ const L=Math.hypot(b[0]-a[0],b[1]-a[1]); return [(b[0]-a[0])/L,(b[1]-a[1])/L]; };
  c.beginPath(); S.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1])); c.closePath(); c.fillStyle='#e9b872'; c.fill(); c.strokeStyle='#9c5b22'; c.lineWidth=ep; c.lineJoin='round'; c.stroke();
  /* Les pépites, à l'écart du haut */
  c.fillStyle='#6b3f1d'; [[.15,.42,.43],[.28,.2,.52],[.3,.55,.15],[.42,.33,.25],[.2,.7,.1],[.18,.1,.72],[.4,.1,.5]].forEach(([a,b,e])=>{ const x=a*S[0][0]+b*S[1][0]+e*S[2][0], y=a*S[0][1]+b*S[1][1]+e*S[2][1]; c.beginPath(); c.arc(x+(S[0][0]-x)*0,y,(o.pep||9),0,7); c.fill(); });
  const u1=d(V,S[1]), u2=d(V,S[2]), P1=[V[0]+u1[0]*R,V[1]+u1[1]*R], P2=[V[0]+u2[0]*R,V[1]+u2[1]*R];
  const croque=o.croque||0, ret=o.retrouve||0;
  if(croque>0){ /* La morsure : le coin part, le bord garde des dents */
    c.save(); c.fillStyle=fond; c.strokeStyle='#9c5b22';
    const k=Math.min(1,croque);
    c.beginPath(); c.moveTo(V[0]-u1[0]*20-u2[0]*20,V[1]-u1[1]*20-u2[1]*20); c.lineTo(V[0]+(P1[0]-V[0])*k+u1[0]*12*k-u2[0]*18,V[1]+(P1[1]-V[1])*k+u1[1]*12*k); c.lineTo(V[0]+(P2[0]-V[0])*k+u2[0]*12*k-u1[0]*18,V[1]+(P2[1]-V[1])*k+u2[1]*12*k); c.closePath(); c.fill();
    for(let i=0;i<=3;i++){ const t=i/3, x=P1[0]+(P2[0]-P1[0])*t, y=P1[1]+(P2[1]-P1[1])*t, rr=R*.2*k; c.beginPath(); c.arc(x+(V[0]-x)*.03,y+(V[1]-y)*.03,rr,0,7); c.fill(); }
    c.restore();
    /* Le coin disparu, en pointillés */
    if(o.pointille&&!ret){ c.save(); c.setLineDash([16,14]); c.strokeStyle='#c92a2a'; c.lineWidth=ep*.7; c.beginPath(); c.moveTo(P1[0],P1[1]); c.lineTo(V[0],V[1]); c.lineTo(P2[0],P2[1]); c.stroke(); c.restore(); }
  }
  if(ret>0){ c.save(); c.globalAlpha=lisse(ret); c.fillStyle='#8ce99a'; c.strokeStyle='#2f9a3a'; c.lineWidth=ep; c.beginPath(); c.moveTo(V[0],V[1]); c.lineTo(P1[0],P1[1]); c.lineTo(P2[0],P2[1]); c.closePath(); c.fill(); c.stroke(); c.restore(); }
  /* Les angles écrits dans leur coin */
  const G=[(S[0][0]+S[1][0]+S[2][0])/3,(S[0][1]+S[1][1]+S[2][1])/3];
  for(const [i,txt,z,coul] of o.etiq||[]){ if(!txt) continue; const p=S[i], L=Math.hypot(G[0]-p[0],G[1]-p[1]), dist=i===0&&croque>0?(o.dehors?-(o.fs||54)*.95:R*.62):Math.min(L*.62,(o.fs||54)*1.9);
    const yy=p[1]+(G[1]-p[1])/L*dist, xx=p[0]+(G[0]-p[0])/L*dist;
    if(!(i===0&&croque>0)){ c.save(); c.font=`800 ${o.fs||54}px "Segoe UI"`; const w=c.measureText(txt).width+18; c.fillStyle='rgba(255,253,245,.92)'; c.beginPath(); c.roundRect(xx-w/2,yy-(o.fs||54)*.62,w,(o.fs||54)*1.24,12); c.fill(); c.restore(); }
    texte(c,txt,xx,yy,(o.fs||54)*(z||1),coul||COUL.encre); }
}

function poserCuisine(){
  const cs=document.createElement('canvas'); cs.width=cs.height=128; const a=cs.getContext('2d'); a.fillStyle='#f4efe4'; a.fillRect(0,0,128,128); a.fillStyle='#4a6b8a'; a.fillRect(0,0,64,64); a.fillRect(64,64,64,64);
  const ts=new THREE.CanvasTexture(cs); ts.wrapS=ts.wrapT=THREE.RepeatWrapping; ts.repeat.set(60,60); ts.colorSpace=THREE.SRGBColorSpace;
  const sol=new THREE.Mesh(new THREE.PlaneGeometry(200,200),new THREE.MeshBasicMaterial({map:ts})); sol.rotation.x=-Math.PI/2; sol.position.y=-.02; scene3d.add(sol);
  const cm=document.createElement('canvas'); cm.width=cm.height=128; const b=cm.getContext('2d'); b.fillStyle='#d8f0ee'; b.fillRect(0,0,128,128); b.strokeStyle='#ffffff'; b.lineWidth=6; b.strokeRect(0,0,128,128);
  const tm=new THREE.CanvasTexture(cm); tm.wrapS=tm.wrapT=THREE.RepeatWrapping; tm.repeat.set(40,27); tm.colorSpace=THREE.SRGBColorSpace;
  const mur=new THREE.Mesh(new THREE.PlaneGeometry(60,40),new THREE.MeshBasicMaterial({map:tm})); mur.position.set(0,16,-5); scene3d.add(mur);
  /* Le plan de travail derrière Ti Margo */
  const plan=new THREE.Mesh(new THREE.BoxGeometry(60,1.5,1.2),new THREE.MeshBasicMaterial({color:0xc4613a})); plan.position.set(0,.75,-3.4); scene3d.add(plan);
  const dessus=new THREE.Mesh(new THREE.BoxGeometry(60,.1,1.3),new THREE.MeshBasicMaterial({color:0xf3e6c8})); dessus.position.set(0,1.53,-3.4); scene3d.add(dessus);
  for(let x=-14;x<=14;x+=2.4){ const p=new THREE.Mesh(new THREE.PlaneGeometry(2.1,1.15),new THREE.MeshBasicMaterial({color:0xd8754c})); p.position.set(x,.72,-2.79); scene3d.add(p); }
}
function poserToque(){ const h=new THREE.Group(); h.position.set(0,.46,-.07); h.rotation.z=-.08; tete.add(h); const b=toon(0xffffff);
  piece(h,new THREE.CylinderGeometry(.37,.35,.16,24),b,[0,.06,0],CONTOUR_SOMBRE);
  piece(h,new THREE.SphereGeometry(.31,18,14),b,[-.2,.3,0],CONTOUR_SOMBRE); piece(h,new THREE.SphereGeometry(.31,18,14),b,[.2,.3,0],CONTOUR_SOMBRE); piece(h,new THREE.SphereGeometry(.34,18,14),b,[0,.38,0],CONTOUR_SOMBRE);
  return h; }
function poserMiettes(){ const m=toon(0xb9772e), L=[]; for(const [x,y,z,r] of [[-.2,-.34,.62,.035],[.16,-.37,.62,.03],[.03,-.42,.6,.04],[.3,-.24,.58,.028]]) L.push(piece(tete,new THREE.SphereGeometry(r,10,8),m,[x,y,z],null)); return L; }

FILMS['angle-manquant']=function(outils){
  const {$,panneau}=outils;
  const DUR={'00-accroche':14.1,'01-retrouve':14.56,'02-question':19.74,'02b-reponse':10.51,'03-vite':9.88,'04-commentaire':12.37,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixTri07(A);
  const [acc,ret,q,r,vit,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserCuisine(); poserToque(); const miettes=poserMiettes();
  const tab=poserTableau({L:4.3,H:3,x:0,y:4.55,pieds:false,bois:0x8a5a2b});
  panneau.style.display='none';
  const css=document.createElement('style'); css.textContent='#pause .ligne,#cq .ligne{display:block;}'; document.head.append(css);

  /* Vrais angles : 70° en haut, 50° et 60° en bas */
  const S1=triAngles07(50,60,570,560,420); S1.R=135;
  const SV1=triAngles07(30,50,460,270,560); SV1.R=72; /* 100° en haut, 30° et 50° : c'est 50° qui est mangé, on le met en bas droite */
  const SV2=triAngles07(60,60,370,770,560); SV2.R=100;
  const SC=triAngles07(65,65,330,330,520);

  const m=(c,w,n)=>mot(c,w,n);
  const tJai=m('00-accroche','J\'ai'), tMange=m('00-accroche','mangé'), t50=m('00-accroche','50'), t60=m('00-accroche','60'), tTroi=m('00-accroche','troisième'), tDisp=m('00-accroche','Disparu'), tTu=m('00-accroche','Tu');
  const tOups=m('00-accroche','Oups');
  const tGrave=m('01-retrouve','Pas'), t3=m('01-retrouve','3'), tP50=m('01-retrouve','50'), tP110=m('01-retrouve','110'), tM180=m('01-retrouve','180',2), tM70=m('01-retrouve','70'), tRet=m('01-retrouve','Coin');
  const tP60=m('01-retrouve','60'), tM110=m('01-retrouve','110',2);
  const tV100=m('03-vite','100'), tV30=m('03-vite','30'), tV50=m('03-vite','50'), tV601=m('03-vite','60'), tV602=A['03-vite']+6.7, tV603=A['03-vite']+8.0;
  const tIso=m('04-commentaire','isocèle'), t40=m('04-commentaire','40'), tComb=m('04-commentaire','Combien'), tAtt=m('04-commentaire','Attention'), t2sol=m('04-commentaire','2');
  const tMiam=m('02b-reponse','Miam');

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* Aucun angle n'est placé sur la figure : le 40° peut être en haut ou en bas */
      biscuit(c,SC,{fs:0});
      const mil=(a,b)=>[(a[0]+b[0])/2,(a[1]+b[1])/2];
      for(const [a,b] of [[SC[0],SC[1]],[SC[0],SC[2]]]){ const p=mil(a,b), L=Math.hypot(b[0]-a[0],b[1]-a[1]), nx=-(b[1]-a[1])/L, ny=(b[0]-a[0])/L; c.strokeStyle=COUL.encre; c.lineWidth=8; c.beginPath(); c.moveTo(p[0]-nx*24,p[1]-ny*24); c.lineTo(p[0]+nx*24,p[1]+ny*24); c.stroke(); }
      if(T>=t40) texte(c,'40°',620,170,104*Math.max(1,pop(T,t40,.5)*.5+.5),COUL.cote);
      if(T>=tComb){ texte(c,'?',790,170,104*Math.max(1,pop(T,tComb+.5,.5)*.5+.5),'#e8590c'); texte(c,'?',920,170,104*Math.max(1,pop(T,tComb+.9,.5)*.5+.5),'#e8590c'); }
      if(T>=t2sol) texte(c,'2 solutions !',760,400,84*Math.max(1,pop(T,t2sol,.5)*.15+.85),COUL.piege);
      tab.maj(); return; }
    if(T>=vit){ /* Deux biscuits, en vrais angles */
      const Sa=[SV1[2],SV1[1],SV1[0]]; /* 50° mangé en bas à droite : le haut est le sommet à 100° */
      if(T>=tV100){
        const cr=Math.min(1,(T-tV30)/.3); dessinerCoinMange(c,SV1,2,cr>0?cr:0,T>=tV50?lisse((T-tV50)/.35):0,[[0,'100°',T>=tV100],[1,'30°',T>=tV30],[2,'50°',T>=tV50]],'#2f9a3a'); }
      if(T>=tV601){ const cr=Math.min(1,(T-tV602)/.3); dessinerCoinMange(c,SV2,0,cr>0?cr:0,T>=tV603?lisse((T-tV603)/.35):0,[[1,'60°',T>=tV601],[2,'60°',T>=tV602],[0,'60°',T>=tV603]],'#2f9a3a'); }
      tab.maj(); return; }
    /* Le premier biscuit, puis le calcul */
    if(T>=tJai-.05){
      const cr=T>=tMange?Math.min(1,(T-tMange)/.25):0, rt=T>=tM70?Math.min(1,(T-tM70)/.4):0;
      biscuit(c,S1,{croque:cr,retrouve:rt,pointille:T>=tDisp,etiq:[[1,T>=t50?'50°':'',Math.max(1,pop(T,t50)*.5+.5)],[2,T>=t60?'60°':'',Math.max(1,pop(T,t60)*.5+.5)],[0,T>=tM70?'70°':(T>=tTroi?'?':''),T>=tM70?Math.max(1,pop(T,tM70)*.5+.5):Math.max(1,pop(T,tTroi)*.6+.4),T>=tM70?COUL.ok:'#e8590c']]});
      /* Les miettes tombent de la morsure */
      if(T>=tMange&&T<tMange+1.2){ const k=T-tMange; for(let i=0;i<9;i++){ const x=S1[0][0]+((i*67)%140-70)*(.4+k), y=S1[0][1]+30+k*k*520+i*8; c.fillStyle='#b9772e'; c.beginPath(); c.arc(x,y,8-(i%3)*2,0,7); c.fill(); } }
    }
    if(T>=ret){ const y1=510,y2=628;
      if(T>=tP50) texte(c,'50',540,y1,74); if(T>=tP50+.45) texte(c,'+',622,y1,74); if(T>=tP60) texte(c,'60',704,y1,74);
      if(T>=tP110){ texte(c,'=',790,y1,74); texte(c,'110',885,y1,74*Math.max(1,pop(T,tP110)*.4+.6),COUL.cote); }
      if(T>=tM180){ texte(c,'180',540,y2,74); texte(c,'−',640,y2,74); }
      if(T>=tM110) texte(c,'110',745,y2,74,COUL.cote);
      if(T>=tM70){ texte(c,'=',845,y2,74); texte(c,'70°',945,y2,74*Math.max(1,pop(T,tM70)*.4+.6),COUL.ok); }
    }
    tab.maj();
  }
  /* Un biscuit où le coin mangé est quelconque */
  function dessinerCoinMange(c,S,i,cr,rt,etiq,coul){ const V=[S[i],S[(i+1)%3],S[(i+2)%3]]; V.R=S.R;
    const map=e=>[((e[0]-i)%3+3)%3,e[2]?e[1]:'',1,e[0]===i&&rt>0?coul:(e[0]===i?'#e8590c':COUL.encre)];
    biscuit(c,V,{croque:cr,retrouve:rt,r:S.R,dehors:true,fs:50,pep:7,ep:7,etiq:etiq.map(map)}); }

  /* Sous la carte de question : le biscuit à 90° et 35°, en vrais angles */
  const dq=document.createElement('canvas'); dq.className='cv'; dq.width=420; dq.height=380; dq.style.cssText='left:34px;top:1100px;width:340px;height:308px;background:#fffdf5;border:6px solid #17452a;border-radius:26px;display:none;z-index:3;'; document.body.append(dq);
  const SQ=triAngles07(90,35,340,205,345); SQ.R=70;
  const tQ90=m('02-question','90'), tQ35=m('02-question','35'), tQuel=m('02-question','Quel');
  function dessinerQ(T){ const c=dq.getContext('2d'); c.fillStyle='#fffdf5'; c.fillRect(0,0,420,380);
    biscuit(c,SQ,{croque:1,r:70,fs:44,pep:6,ep:6,pointille:T>=tQuel,etiq:[[1,T>=tQ90?'90°':''],[2,T>=tQ35?'35°':''],[0,T>=tQuel?'?':'',1,'#e8590c']]}); }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-retrouve'), a3=dit('03-vite'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,acc+2.6,352,70,a0('Salut !'),a0('Oups.')),
    groupe(acc+2.6,acc+5.55,60,62,a0('J’ai mangé un coin'),a0('de ce triangle.')),
    groupe(acc+5.55,acc+10,60,62,a0('50°, 60°,'),a0('et le troisième ?')),
    groupe(acc+10,acc+11.5,60,76,a0('Disparu !')),
    groupe(acc+11.5,ret,60,62,a0('Tu paries'),a0('que je le retrouve ?')),
    groupe(ret+.1,ret+5.2,60,62,a1('Pas grave.'),a1('3 angles, ça fait 180°.')),
    groupe(ret+5.2,ret+8.6,60,72,a1('50 + 60 = 110.')),
    groupe(ret+8.6,ret+12.8,60,72,a1('180 − 110 = 70°.')),
    groupe(ret+12.8,q,60,72,a1('Coin retrouvé !')),
    groupe(vit+.1,vit+1.5,60,76,a3('Plus vite !')),
    groupe(vit+1.5,vit+5.4,60,62,a3('100° et 30° : 50°.')),
    groupe(vit+5.4,com,60,62,[vit+5.5,vit+8,'60° et 60° : 60° !',[vit+5.5,vit+6.6,vit+6.7,vit+7.9,vit+8.0]]),
    groupe(com+.1,com+4.4,60,60,a4('À toi : un triangle isocèle'),a4('a un angle de 40°.')),
    groupe(com+4.4,com+7.1,60,60,a4('Combien mesurent'),a4('les deux autres ?')),
    groupe(com+7.1,com+10.1,60,60,a4('Attention,'),a4('il y a 2 solutions !')),
    groupe(com+10.1,f,60,60,a4('Réponds en commentaire !'))
  ];
  qd('Question !');
  const phraseQ=[qd('J’ai encore faim.'),qd('Il reste 90° et 35°.'),qd('Quel coin j’ai mangé ?')];
  const tq=w=>m('02-question',w)-q;
  rd.saute(2); const r1=rd('90 + 35 = 125.'), r2=rd('180 − 125 = 55°.'), r3=rd('Miam !');
  qd.saute(6); const pauseQ=[qd('Mets pause, et choisis !')];

  poserMiniature(outils,acc+1,'Quel coin<br>j’ai mangé ?'+PARI,`<svg width="300" height="250" viewBox="0 0 360 300"><path d="M150 96L30 280L330 280L212 96Z" fill="#e9b872" stroke="#9c5b22" stroke-width="10" stroke-linejoin="round"/><path d="M150 96L181 20L212 96" fill="none" stroke="#c92a2a" stroke-width="8" stroke-dasharray="14 12"/><g fill="#6b3f1d"><circle cx="120" cy="230" r="11"/><circle cx="230" cy="245" r="11"/><circle cx="180" cy="170" r="11"/></g><text x="181" y="90" font-family="Segoe UI" font-weight="800" font-size="40" fill="#e8590c" text-anchor="middle">?</text></svg>`);
  return { clips,FIN,titre:'Le coin mangé',ceinture:1,finTitre:acc+2.6,groupes,finClip:'05-abonne',
    cuts:[acc+2.6,q,r,vit,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:vit,cpt:fin('02-question')+.1,bonne:0,tBon:.72,
      phrase:phraseQ,pause:pauseQ,
      choix:[['55°',tq('A'),tq('55')],['65°',tq('B'),tq('65')],['145°',tq('C'),tq('145')]],
      tete:[[r+.1,'Réponse '],[r+.72,'A :']],reponse:[r1],suite:[r2,r3] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<vit, dansF=T>=f, gros=T<acc+2.6;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      const voirQ=T>=q&&T<r&&!window.MINI; dq.style.display=voirQ?'block':'none'; if(voirQ) dessinerQ(T);
      scene.x=-.72; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
      if(gros){ scene.x=-.55; cam.d=9.8; cam.y=1.9; }
      if(T>=q&&T<r){ scene.x=.27; cam.d=11.4; cam.y=3.55; }
      if(T>=r&&T<vit||dansF){ scene.x=-.1; cam.d=11.4; cam.y=3.55; }
      const mie=(T>=tOups&&T<ret+.2)||(T>=tMiam&&T<vit)||window.MINI; miettes.forEach(x=>x.visible=mie);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(T<tJai) g.oups();
      else if(T<t50) g.montre();
      else if(T<tTroi) g.montre();
      else if(T<tTu) g.oups();
      else if(T<ret) g.ouvre();
      else if(T<q){ T<tP50?g.ouvre():(T>=tRet?g.pouce():g.montre()); }
      else if(T<r) g.reflechit();
      else if(T<vit){ T<r+.72?g.ouvre():g.pouce(); if(T>=tMiam) P.jaw=.7; }
      else if(T<com){ g.montre(); }
      else if(T<f){ T<com+10.1?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.pouce(); }
    } };
};
