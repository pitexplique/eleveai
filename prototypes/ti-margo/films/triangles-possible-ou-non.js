/* Série Triangles 6e, épisode 08 : LE TOIT DE LA CABANE. Trois planches à l'échelle : 2-3-6 ne se touchent pas,
   3-4-7 se couchent, 4-5-7 font un toit. Chantier dans l'herbe. Échelle unique : 120 pixels pour 1 m. */

function voixTri08(A){
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

const E08=120;
/* Une planche de a à b */
function planche(c,a,b,coul='#c98b4a',ep=26){ c.lineCap='round'; c.strokeStyle='#6b3f1d'; c.lineWidth=ep+8; c.beginPath(); c.moveTo(a[0],a[1]); c.lineTo(b[0],b[1]); c.stroke(); c.strokeStyle=coul; c.lineWidth=ep; c.beginPath(); c.moveTo(a[0],a[1]); c.lineTo(b[0],b[1]); c.stroke();
  for(const p of [a,b]){ c.fillStyle='#3f2a14'; c.beginPath(); c.arc(p[0],p[1],5,0,7); c.fill(); } }
function poserChantier(){
  const sol=new THREE.Mesh(new THREE.PlaneGeometry(900,900),new THREE.MeshBasicMaterial({color:0x8ccf6a})); sol.rotation.x=-Math.PI/2; sol.position.y=-.02; scene3d.add(sol);
  for(const [x,z,h] of [[-6.5,-10,5],[-3.6,-13,6.4],[4.2,-11,5.6],[7,-14,7],[1,-18,7.2],[-9.5,-16,7],[10,-9,5]]){ const g=new THREE.Group(); g.position.set(x,0,z); scene3d.add(g);
    piece(g,new THREE.CylinderGeometry(.22,.3,1.2,10),toon(0x7a4a24),[0,.6,0],null);
    piece(g,new THREE.ConeGeometry(h*.34,h*.62,12),toon(0x2f8f4a),[0,1+h*.31,0],null); piece(g,new THREE.ConeGeometry(h*.26,h*.5,12),toon(0x3aa65a),[0,1+h*.62,0],null); }
  const sol2=new THREE.Mesh(new THREE.CircleGeometry(1.1,32),new THREE.MeshBasicMaterial({color:0xffd23f})); sol2.position.set(-5.2,9.2,-16);
  /* Le tas de planches */
  const tas=new THREE.Group(); tas.position.set(2,0,-2.6); scene3d.add(tas); const b=toon(0xc98b4a);
  for(let i=0;i<4;i++) piece(tas,new RoundedBoxGeometry(2.4-(i%2)*.3,.13,.42,2,.03),b,[(i%2)*.1,.08+i*.15,0],CONTOUR_SOMBRE);
}
function poserCasque(){ const h=new THREE.Group(); h.position.set(0,.43,-.08); h.rotation.z=-.08; tete.add(h); const j=toon(0xf5c518);
  piece(h,new THREE.SphereGeometry(.46,26,14,0,Math.PI*2,0,Math.PI/2),j,[0,.08,0],CONTOUR_SOMBRE);
  piece(h,new THREE.CylinderGeometry(.5,.52,.05,28),j,[0,.09,.02],CONTOUR_SOMBRE);
  piece(h,new RoundedBoxGeometry(.13,.12,.72,2,.03),toon(0xe8a90c),[0,.5,0],null);
  return h; }

FILMS['possible-ou-non']=function(outils){
  const {$,panneau}=outils;
  const DUR={'00-accroche':13.11,'01-rate':9.48,'02-pourquoi':5.73,'03-question':15.4,'03b-reponse':8.38,'04-reussi':9.61,'05-commentaire':13.59,'06-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'03-question':3.3,'05-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixTri08(A);
  const [acc,rat,pou,q,r,reu,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['06-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x], m=mot;

  poserChantier(); poserCasque();
  const tab=poserTableau({L:4.3,H:3,x:0,y:4.55,fond:'#eef7ff'});
  panneau.style.display='none';
  const css=document.createElement('style'); css.textContent='#pause .ligne,#cq .ligne{display:block;}'; document.head.append(css);

  const t2=m('00-accroche','2'), t3=m('00-accroche','3'), t6=m('00-accroche','6'), tTu=m('00-accroche','Tu');
  const tGr=m('01-rate','grande'), tLeve=m('01-rate','lève'), tTou=m('01-rate','tournent'), tPas=m('01-rate','pas'), tRat=m('01-rate','Mon');
  const tN2=m('02-pourquoi','2'), tN3=m('02-pourquoi','3'), tN5=m('02-pourquoi','5'), tN6=m('02-pourquoi','6');
  const tR4=m('04-reussi','4'), tR5=m('04-reussi','5'), tR7=m('04-reussi','7'), tRp=m('04-reussi','4',2), tR9=m('04-reussi','9'), tEnf=m('04-reussi','Enfin');
  const tC3=m('05-commentaire','3'), tC7=m('05-commentaire','7'), tCtro=m('05-commentaire','troisième'), tCom=m('05-commentaire','Combien');
  const tQ3=m('03-question','3'), tQ4=m('03-question','4'), tQ7=m('03-question','7'), tPluie=m('03b-reponse','Bonjour'), tCou=m('03b-reponse','couchent');

  const YB=540, X0=156, X1=X0+6*E08;
  const lab=(c,s,x,y,z=1,coul=COUL.encre)=>texte(c,s,x,y,62*z,coul);
  const rot=(p,L,deg,dir)=>[p[0]+dir*L*Math.cos(deg*Math.PI/180),p[1]-L*Math.sin(deg*Math.PI/180)];

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* Rien ne donne la réponse : la troisième planche reste en pointillés */
      const B=[96,YB], C_=[936,YB], H=rot(B,3*E08,55,1);
      if(T>=tC3){ planche(c,B,H); lab(c,'3 m',H[0]-172,(H[1]+YB)/2-30,Math.max(1,pop(T,tC3)*.4+.6)); }
      if(T>=tC7){ planche(c,B,C_); lab(c,'7 m',516,YB+66,Math.max(1,pop(T,tC7)*.4+.6)); }
      if(T>=tCtro){ c.save(); c.setLineDash([26,20]); c.strokeStyle='#e8590c'; c.lineWidth=14; c.lineCap='round'; c.beginPath(); c.moveTo(H[0],H[1]); c.lineTo(C_[0],C_[1]); c.stroke(); c.restore();
        texte(c,'? m',(H[0]+C_[0])/2+70,(H[1]+C_[1])/2-60,84*Math.max(1,Math.max(pop(T,tCtro),pop(T,tCom))*.4+.6),'#e8590c'); }
      tab.maj(); return; }
    if(T>=reu){ /* Vraie géométrie : 4 m à gauche, 5 m à droite, 7 m en bas */
      const B=[96,YB], C_=[936,YB], ang=Math.acos((49+16-25)/(2*7*4))*180/Math.PI, angC=Math.acos((49+25-16)/(2*7*5))*180/Math.PI;
      const aL=ang*lisse((T-tR4)/.45), aR=angC*lisse((T-tR5)/.45);
      if(T>=tR7){ planche(c,B,C_); lab(c,'7 m',516,YB+66,Math.max(1,pop(T,tR7)*.4+.6)); }
      if(T>=tR4){ const H=rot(B,4*E08,aL,1); planche(c,B,H,'#d9a05b'); lab(c,'4 m',(B[0]+H[0])/2-70,(B[1]+H[1])/2-34,Math.max(1,pop(T,tR4)*.4+.6)); }
      if(T>=tR5){ const H=rot(C_,5*E08,aR,-1); planche(c,C_,H,'#d9a05b'); lab(c,'5 m',(C_[0]+H[0])/2+70,(C_[1]+H[1])/2-34,Math.max(1,pop(T,tR5)*.4+.6)); }
      if(T>=tRp) texte(c,'4 + 5',770,110,76); if(T>=tR9) texte(c,'= 9',950,110,76*Math.max(1,pop(T,tR9)*.4+.6),COUL.ok);
      if(T>=tEnf){ const H=rot(B,4*E08,ang,1); c.strokeStyle='#17452a'; c.lineWidth=7; c.beginPath(); c.moveTo(H[0],H[1]); c.lineTo(H[0],H[1]-110); c.stroke(); c.fillStyle='#e03131'; c.beginPath(); c.moveTo(H[0],H[1]-110); c.lineTo(H[0]+80,H[1]-84); c.lineTo(H[0],H[1]-58); c.closePath(); c.fill(); }
      tab.maj(); return; }
    if(T>=pou){ /* La preuve : 2 et 3 bout à bout, à côté de la grande */
      planche(c,[X0,YB],[X1,YB]); lab(c,'6 m',(X0+X1)/2,YB+66,Math.max(1,pop(T,tN6)*.4+.6),T>=tN6?'#e8590c':COUL.encre);
      const Y=YB-110; if(T>=tN2){ planche(c,[X0,Y],[X0+2*E08,Y],'#d9a05b'); lab(c,'2',X0+E08,Y-52,Math.max(1,pop(T,tN2)*.5+.5)); }
      if(T>=tN3){ planche(c,[X0+2*E08,Y],[X0+5*E08,Y],'#d9a05b'); lab(c,'3',X0+3.5*E08,Y-52,Math.max(1,pop(T,tN3)*.5+.5)); }
      if(T>=tN5){ const Yt=Y-110; c.strokeStyle=COUL.ok; c.lineWidth=8; c.beginPath(); c.moveTo(X0,Yt+20); c.lineTo(X0,Yt); c.lineTo(X0+5*E08,Yt); c.lineTo(X0+5*E08,Yt+20); c.stroke(); texte(c,'5',X0+2.5*E08,Yt-46,84*Math.max(1,pop(T,tN5)*.4+.6),COUL.ok);
        c.save(); c.setLineDash([12,10]); c.strokeStyle=COUL.piege; c.lineWidth=8; c.beginPath(); c.moveTo(X0+5*E08+18,Y); c.lineTo(X1-4,Y); c.stroke(); c.restore(); }
      tab.maj(); return; }
    if(T>=rat){ /* Les deux petites tournent autour de leur clou : leurs cercles ne se touchent jamais */
      const dy=-(1-lisse((T-tGr)/.3))*400; c.save(); c.translate(0,dy); planche(c,[X0,YB],[X1,YB]); c.restore(); if(T>=tGr) lab(c,'6 m',(X0+X1)/2,YB+66);
      if(T>=tLeve){ let th=78*lisse((T-tLeve)/.5);
        if(T>=tTou){ const v=(T-tTou)/(tPas-tTou); th=v<1?46+32*Math.cos(v*Math.PI*3):Math.max(4,14-(T-tPas)*20); }
        if(T>=tTou&&T<tRat){ c.save(); c.setLineDash([8,12]); c.strokeStyle='#868e96'; c.lineWidth=5; c.beginPath(); c.arc(X0,YB,2*E08,-Math.PI/2,0); c.stroke(); c.beginPath(); c.arc(X1,YB,3*E08,Math.PI,Math.PI*1.5); c.stroke(); c.restore(); }
        const HL=rot([X0,YB],2*E08,th,1), HR=rot([X1,YB],3*E08,th,-1);
        planche(c,[X0,YB],HL,'#d9a05b'); planche(c,[X1,YB],HR,'#d9a05b');
        lab(c,'2 m',th>30?HL[0]-82:(X0+HL[0])/2-20,th>30?HL[1]:(YB+HL[1])/2-62); lab(c,'3 m',th>30?HR[0]+82:(X1+HR[0])/2+20,th>30?HR[1]:(YB+HR[1])/2-62);
        if(T>=tPas){ const k=lisse((T-tPas)/.3); c.save(); c.globalAlpha=k; c.lineWidth=10; c.strokeStyle=COUL.piege; const xa=HL[0]+22, xb=HR[0]-22, ym=(HL[1]+HR[1])/2; c.setLineDash([12,10]); c.beginPath(); c.moveTo(xa,ym); c.lineTo(xb,ym); c.stroke(); c.restore(); if(T>=tRat) texte(c,'raté !',(xa+xb)/2,ym-100,96*Math.max(1,pop(T,tRat)*.4+.6),COUL.piege); }
      }
      tab.maj(); return; }
    /* Les trois planches, à l'échelle */
    if(T>=t2){ planche(c,[X0,170],[X0+2*E08,170]); lab(c,'2 m',X0+2*E08+90,170,Math.max(1,pop(T,t2)*.4+.6)); }
    if(T>=t3){ planche(c,[X0,300],[X0+3*E08,300]); lab(c,'3 m',X0+3*E08+90,300,Math.max(1,pop(T,t3)*.4+.6)); }
    if(T>=t6){ planche(c,[X0,430],[X1,430]); lab(c,'6 m',(X0+X1)/2,500,Math.max(1,pop(T,t6)*.4+.6)); }
    tab.maj();
  }

  /* Sous la carte : 3, 4 et 7 à l'échelle, puis 3 + 4 bout à bout sur la grande */
  const dq=document.createElement('canvas'); dq.className='cv'; dq.width=420; dq.height=330; dq.style.cssText='left:34px;top:1120px;width:340px;height:267px;background:#eef7ff;border:6px solid #17452a;border-radius:26px;display:none;z-index:3;'; document.body.append(dq);
  function dessinerQ(T){ const c=dq.getContext('2d'), e=48, x=42; c.fillStyle='#eef7ff'; c.fillRect(0,0,420,330);
    const plan=(a,b,y,co)=>planche(c,[a,y],[b,y],co||'#c98b4a',18), txt=(s,xx,y,co)=>texte(c,s,xx,y,44,co||COUL.encre);
    if(T<r){ if(T>=tQ3){ plan(x,x+3*e,60); txt('3 m',x+3*e+70,60); } if(T>=tQ4){ plan(x,x+4*e,150); txt('4 m',x+4*e+70,150); } if(T>=tQ7){ plan(x,x+7*e,240); txt('7 m',x+3.5*e,290); } }
    else { plan(x,x+7*e,220); txt('7 m',x+3.5*e,280); plan(x,x+3*e,150,'#d9a05b'); txt('3',x+1.5*e,100); plan(x+3*e,x+7*e,150,'#d9a05b'); txt('4',x+5*e,100); } }
  /* La pluie, quand le toit est tout plat */
  const pl=document.createElement('canvas'); pl.className='cv'; pl.width=1080; pl.height=1920; pl.style.cssText='left:0;top:0;width:1080px;height:1920px;display:none;z-index:3;pointer-events:none;'; document.body.append(pl);
  function pleuvoir(T){ const c=pl.getContext('2d'); c.clearRect(0,0,1080,1920); c.strokeStyle='rgba(30,110,200,.75)'; c.lineWidth=7; c.lineCap='round'; for(let i=0;i<70;i++){ const x=(i*157)%1080, y=((i*263)+(T-tPluie)*1500)%1920; c.beginPath(); c.moveTo(x,y); c.lineTo(x-10,y+52); c.stroke(); } }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-rate'), a2=dit('02-pourquoi'), a4=dit('04-reussi'), a5=dit('05-commentaire'), qd=dit('03-question'), rd=dit('03b-reponse');
  const groupes=[
    groupe(acc+.1,acc+3.8,352,62,a0('Salut !'),a0('Je construis ma cabane.')),
    groupe(acc+3.8,acc+8.3,60,62,a0('J’ai trois planches :'),a0('2 m, 3 m et 6 m.')),
    groupe(acc+8.3,acc+10.9,60,62,a0('Je fais un toit'),a0('en triangle.')),
    groupe(acc+10.9,rat,60,62,a0('Tu paries'),a0('que ça marche ?')),
    groupe(rat+.1,rat+2,60,62,a1('Je pose la grande.')),
    groupe(rat+2,rat+4.1,60,62,a1('Je lève les deux autres.')),
    groupe(rat+4.1,rat+7.5,60,62,a1('Elles tournent, tournent,'),a1('et ne se touchent pas.')),
    groupe(rat+7.5,pou,60,62,a1('Mon toit est raté !')),
    groupe(pou+.1,pou+3.3,60,62,a2('Normal :'),a2('2 + 3 font 5.')),
    groupe(pou+3.3,q,60,62,a2('Il faudrait plus que 6.')),
    groupe(reu+.1,reu+4,60,62,a4('Et avec 4 m,'),a4('5 m et 7 m ?')),
    groupe(reu+4,reu+7.9,60,62,a4('4 + 5 = 9,'),a4('plus que 7.')),
    groupe(reu+7.9,com,60,72,a4('Enfin un toit !')),
    groupe(com+.1,com+4,60,60,a5('À toi : j’ai deux planches'),a5('de 3 m et 7 m.')),
    groupe(com+4,com+7.5,60,60,a5('La troisième mesure un'),a5('nombre entier de mètres.')),
    groupe(com+7.5,f,60,52,a5('Combien de longueurs possibles'),a5('pour fermer mon toit ?'),a5('Réponds en commentaire !'))
  ];
  qd('Question !');
  const phraseQ=[qd('Planches de 3 m, 4 m et 7 m.'),qd('Que se passe-t-il ?')];
  const tq=w=>m('03-question',w)-q;
  rd.saute(2); const r1=rd('3 + 4 = 7, tout juste.'), r2=rd('Les planches se couchent.'), r3=rd('Bonjour la pluie !');
  qd.saute(15); const pauseQ=[qd('Mets pause, et choisis !')];

  poserMiniature(outils,acc+1,'Mon toit<br>va-t-il tenir ?'+PARI,`<svg width="300" height="250" viewBox="0 0 360 300"><g stroke-linecap="round"><path d="M20 250H340" stroke="#6b3f1d" stroke-width="30"/><path d="M20 250H340" stroke="#c98b4a" stroke-width="20"/><path d="M20 250L78 150" stroke="#6b3f1d" stroke-width="28"/><path d="M20 250L78 150" stroke="#d9a05b" stroke-width="18"/><path d="M340 250L225 130" stroke="#6b3f1d" stroke-width="28"/><path d="M340 250L225 130" stroke="#d9a05b" stroke-width="18"/></g><text x="150" y="110" font-family="Segoe UI" font-weight="800" font-size="74" fill="#c92a2a" text-anchor="middle">?</text></svg>`);
  return { clips,FIN,titre:'Le toit de la cabane',ceinture:1,finTitre:acc+3.8,groupes,finClip:'06-abonne',
    cuts:[acc+3.8,q,r,reu,com,f],
    question:{ qc:'03-question',rc:'03b-reponse',finR:reu,cpt:fin('03-question')+.1,bonne:1,tBon:.62,
      phrase:phraseQ,pause:pauseQ,
      choix:[['un beau toit',tq('A'),tq('un')],['un toit tout plat',tq('B'),m('03-question','un',2)-q],['elles ne se touchent pas',tq('C'),tq('elles')]],
      tete:[[r+.1,'Réponse '],[r+.62,'B :']],reponse:[r1],suite:[r2,r3] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<reu, dansF=T>=f, gros=T<acc+3.8;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      const voirQ=dansQ&&!window.MINI; dq.style.display=voirQ?'block':'none'; if(voirQ) dessinerQ(T);
      const pluie=T>=tPluie&&T<reu&&!window.MINI; pl.style.display=pluie?'block':'none'; if(pluie) pleuvoir(T);
      scene.x=-.72; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
      if(gros){ scene.x=-.55; cam.d=9.8; cam.y=1.9; }
      if(dansQ){ scene.x=.27; cam.d=11.4; cam.y=3.55; }
      if(dansF){ scene.x=-.1; cam.d=11.4; cam.y=3.55; }

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<tTu) g.montre();
      else if(T<rat) g.pouce();
      else if(T<tPas) g.montre();
      else if(T<pou) g.oups();
      else if(T<q) g.montre();
      else if(T<r) g.reflechit();
      else if(T<reu){ if(T<r+.62) g.ouvre(); else if(T<tCou) g.pouce(); else g.oups(); }
      else if(T<tEnf) g.montre();
      else if(T<com) g.pouce();
      else if(T<f){ T<com+11.2?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.oups(); }
    } };
};
