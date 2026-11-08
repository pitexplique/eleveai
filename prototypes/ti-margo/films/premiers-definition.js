/* Série Nombres premiers 4e, épisode 08 : LA PARADE DES 13 MUSICIENS (voix 4e-premier-definition-short).
   Ti Margo veut ranger 13 musiciens en rectangle pour la parade. 12 se rangent (2 × 6, 3 × 4) ;
   13, non : 2 rangées, il en reste 1 ; 3 rangées, il en reste 1 ; une seule longue file de 13.
   13 est premier : deux diviseurs, 1 et lui-même.
   Outils communs (voixDe, enchainer, suiteDe, poserTableau, ecrire, pop, tz, gestes, poserMiniature, PARI,
   CRAIE) : films/premiers.js. Code couleur : un rectangle possible bleu, le musicien en trop orange, le premier jaune. */

/* ---- La rue de la parade : pavés, trottoirs, façades colorées, fanions, lampadaires, confettis ---- */
function definitionRue(){
  const ciel=new THREE.Mesh(new THREE.PlaneGeometry(240,70),new THREE.MeshBasicMaterial({color:0xbfe6ff})); ciel.position.set(0,22,-30); scene3d.add(ciel);
  const sol=new THREE.Mesh(new THREE.PlaneGeometry(900,900),new THREE.MeshBasicMaterial({color:0xd8cfc0})); sol.rotation.x=-Math.PI/2; sol.position.y=-.02; scene3d.add(sol);
  const rue=new THREE.Mesh(new THREE.PlaneGeometry(80,7),new THREE.MeshBasicMaterial({color:0x6c757d})); rue.rotation.x=-Math.PI/2; rue.position.set(0,-.01,1.2); scene3d.add(rue);
  for(let k=-12;k<=12;k++){ const b=new THREE.Mesh(new THREE.PlaneGeometry(1.2,.16),new THREE.MeshBasicMaterial({color:0xffffff})); b.rotation.x=-Math.PI/2; b.position.set(k*2.2,0,1.2); scene3d.add(b); }
  /* les façades du fond */
  const murs=[0xf4a261,0xe76f51,0x2a9d8f,0xe9c46a,0x8ecae6,0xf28482,0x90be6d,0xcdb4db];
  for(let i=-6;i<=6;i++){ const h=4.6+((i*i*7)%5)*.45, m=new THREE.Group(); m.position.set(i*2.3,0,-8); scene3d.add(m);
    piece(m,new THREE.BoxGeometry(2.25,h,1),toon(murs[(i+8)%8]),[0,h/2,0],CONTOUR_FIN);
    piece(m,new THREE.BoxGeometry(2.45,.22,1.15),toon(0x6d4c41),[0,h+.1,0],null);
    for(let r=0;r<Math.floor((h-1.4)/1.25);r++) for(const x of [-.5,.5])
      piece(m,new THREE.BoxGeometry(.5,.66,.06),toon(0x264653),[x,1.6+r*1.25,.52],null);
    piece(m,new THREE.BoxGeometry(.66,1.1,.06),toon(0x5c3a1e),[0,.55,.52],null); }
  /* les fanions, d'une façade à l'autre */
  const fan=[0xe03131,0xfab005,0x1c7ed6,0x2f9e44,0xae3ec9];
  for(const y of [3.9,3.35]) for(let k=-26;k<=26;k++){
    const f=new THREE.Mesh(new THREE.ConeGeometry(.16,.36,3),toon(fan[(k+26)%5])); f.rotation.z=Math.PI; f.position.set(k*.5,y-.06*Math.cos(k*.6),-6.6+(y-3.35)); scene3d.add(f); }
  /* les lampadaires */
  for(const x of [-6.2,6.2]){ piece(scene3d,new THREE.CylinderGeometry(.08,.1,3.4,10),toon(0x343a40),[x,1.7,-4.4],CONTOUR_FIN);
    piece(scene3d,new THREE.SphereGeometry(.28,14,10),toon(0xfff3bf),[x,3.5,-4.4],CONTOUR_FIN); }
  /* les confettis au sol */
  let s=5; const rnd=()=>(s=(s*16807)%2147483647)/2147483647;
  for(let k=0;k<90;k++){ const c=new THREE.Mesh(new THREE.CircleGeometry(.07,8),new THREE.MeshBasicMaterial({color:fan[k%5]}));
    c.rotation.x=-Math.PI/2; c.position.set(-9+rnd()*18,.005,-3+rnd()*8); scene3d.add(c); }
}

/* ---- Un musicien à la craie : shako, tête, veste, et son instrument (tambour ou trompette) ---- */
const DEF_VESTE='#e03131', DEF_PLUS='#ff922b';
function definitionMusicien(c,x,y,s,k=0,coul=DEF_VESTE,z=1){ if(z<=0) return; s*=z;
  c.fillStyle=coul; c.beginPath(); c.roundRect(x-s*.3,y-s*.08,s*.6,s*.62,s*.1); c.fill();
  c.fillStyle='#f1c27d'; c.beginPath(); c.arc(x,y-s*.28,s*.2,0,7); c.fill();
  c.fillStyle='#1c2a4a'; c.fillRect(x-s*.17,y-s*.66,s*.34,s*.26); c.fillStyle='#ffd43b'; c.fillRect(x-s*.04,y-s*.76,s*.08,s*.12);
  if(k%2){ c.fillStyle='#f8f9fa'; c.beginPath(); c.arc(x,y+s*.3,s*.2,0,7); c.fill(); c.strokeStyle='#5c3a1e'; c.lineWidth=Math.max(2,s*.05); c.stroke(); }
  else { c.strokeStyle='#ffd43b'; c.lineWidth=Math.max(3,s*.07); c.beginPath(); c.moveTo(x+s*.05,y-s*.2); c.lineTo(x+s*.42,y-s*.2); c.stroke();
    c.fillStyle='#ffd43b'; c.beginPath(); c.moveTo(x+s*.42,y-s*.2); c.lineTo(x+s*.56,y-s*.34); c.lineTo(x+s*.56,y-s*.06); c.closePath(); c.fill(); } }
function definitionVide(c,x,y,s){ c.strokeStyle=CRAIE.faux; c.lineWidth=5; c.setLineDash([12,9]); c.strokeRect(x-s*.36,y-s*.72,s*.72,s*1.3); c.setLineDash([]); }
const definitionU=(T,t0,d=.5)=>{ const u=Math.max(0,Math.min(1,(T-t0)/d)); return u*u*(3-2*u); };
/* les places d'un rectangle : lignes × col, centrées en (x,y) */
const definitionPlaces=(lignes,col,x,y,px,py)=>Array.from({length:lignes*col},(_,k)=>[x+(k%col-(col-1)/2)*px,y+(Math.floor(k/col)-(lignes-1)/2)*py]);

FILMS.definition=function(outils){
  const {panneau}=outils;
  const DUR={'00-accroche':10.37,'01-douze':6.05,'02-treize':13.27,'03-premier':7.81,'03q-question':11.9,'03r-reponse':7.66,'04-question':6.77,'05-abonne':6.05};
  const clips=enchainer(.4,['00-accroche','01-douze','02-treize','03-premier','03q-question','03r-reponse','04-question','05-abonne'],DUR,{'03q-question':3.3,'04-question':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,dz,tr,pr,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  definitionRue(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55,fond:'#1f3a4d',bois:0x7a4b24});
  panneau.style.display='none';
  const css=document.createElement('style'); css.textContent='#pause .ligne,#cq .ligne{display:block;} div#rebours{display:block;}'; document.head.append(css);

  /* Les instants */
  const tPour=mot('00-accroche','Pour'), t13=mot('00-accroche','13'), tRect=mot('00-accroche','rectangle'), tParie=mot('00-accroche','paries');
  const d12=mot('01-douze','12'), dFacile=mot('01-douze','facile'), d2=mot('01-douze','2'), d3=mot('01-douze','3');
  const e13=mot('02-treize','13'), e2=mot('02-treize','2'), eReste1=mot('02-treize','reste'), e3=mot('02-treize','3'), eReste2=mot('02-treize','reste',2);
  const e4=mot('02-treize','4'), e5=mot('02-treize','5'), e6=mot('02-treize','6'), eRien=mot('02-treize','rien'), eUne=mot('02-treize','Une'), e13b=mot('02-treize','13',2);
  const pPremier=mot('03-premier','premier'), pDiv=mot('03-premier','diviseurs'), pLui=mot('03-premier','lui-même'), pRange=mot('03-premier','range'), pRect=mot('03-premier','rectangle');
  const cCombien=mot('04-question','combien'), cEntre=mot('04-question','entre'), c30=mot('04-question','30'), cReponds=mot('04-question','Réponds');

  /* 13 musiciens en vrac (toujours les mêmes) */
  const vrac=(n,graine,y0,y1,ec)=>{ const V=[]; let s=graine; const rnd=()=>(s=(s*16807)%2147483647)/2147483647;
    while(V.length<n){ const p=[110+rnd()*836,y0+rnd()*(y1-y0)]; if(V.every(v=>Math.hypot(v[0]-p[0],v[1]-p[1])>ec)) V.push(p); } return V; };
  const V13=vrac(13,17,230,520,125), V12=vrac(12,29,230,520,125);
  const S=96;   /* la taille d'un musicien */

  function dessiner(T){ const c=tab.c, W=tab.W; tab.effacer();
    if(T>=com){ /* le défi : les nombres de 1 à 30, rien de la réponse */
      if(T>=cCombien) ecrire(c,'Combien de nombres premiers',W/2,80,64,CRAIE.blanc);
      if(T>=cEntre) ecrire(c,'entre 1 et 30 ?',W/2,190,96*Math.max(1,pop(T,c30)),CRAIE.petit);
      for(let n=1;n<=30;n++){ const t0=c30+(n-1)*.03; if(T<t0) continue; const x=W/2+((n-1)%10-4.5)*96, y=360+Math.floor((n-1)/10)*112;
        c.strokeStyle='#adb5bd'; c.lineWidth=3; c.strokeRect(x-42,y-46,84,92); ecrire(c,String(n),x,y,58*Math.max(1,Math.min(1.2,pop(T,t0,.35)))); }
      tab.maj(); return; }
    if(T>=pr){ /* 13 est premier : deux diviseurs, pas de rectangle */
      definitionPlaces(1,13,W/2,150,78,0).forEach(([x,y],k)=>definitionMusicien(c,x,y,62,k,DEF_VESTE));
      if(T>=pr) ecrire(c,'13',W/2-220,320,120*Math.max(1,pop(T,pr)),CRAIE.petit);
      if(T>=pPremier) ecrire(c,'est premier',W/2+110,320,86*Math.max(1,Math.min(1.15,pop(T,pPremier))),CRAIE.petit);
      if(T>=pDiv){ ecrire(c,'diviseurs :',W/2-190,450,64,CRAIE.blanc); }
      if(T>=mot('03-premier','1')) ecrire(c,'1',W/2+50,450,76*Math.max(1,pop(T,mot('03-premier','1'))),CRAIE.ok);
      if(T>=mot('03-premier','1')) ecrire(c,'et',W/2+140,450,60,CRAIE.blanc);
      if(T>=pLui) ecrire(c,'13',W/2+250,450,76*Math.max(1,pop(T,pLui)),CRAIE.ok);
      if(T>=pRect){ const x0=W/2+90, y0=540, L=280, H=110, u=Math.min(1,(T-pRect)/.35); c.strokeStyle=CRAIE.grand; c.lineWidth=6; c.setLineDash([16,11]); c.strokeRect(x0,y0,L,H); c.setLineDash([]);
        c.strokeStyle=CRAIE.faux; c.lineWidth=11; c.beginPath(); c.moveTo(x0-14,y0-14); c.lineTo(x0-14+(L+28)*u,y0-14+(H+28)*u); c.stroke();
        c.beginPath(); c.moveTo(x0+L+14,y0-14); c.lineTo(x0+L+14-(L+28)*u,y0-14+(H+28)*u); c.stroke(); }
      tab.maj(); return; }
    if(T>=tr){ /* 13 musiciens : 2 rangées, 3 rangées… une seule file */
      if(T<eUne){ ecrire(c,'13 ?',W/2,70,96*Math.max(1,pop(T,e13)),CRAIE.petit); }
      if(T<e2) V13.forEach(([x,y],k)=>definitionMusicien(c,x,y,S,k,DEF_VESTE,tz(T,e13+k*.02)));
      else if(T<e3){ /* 2 rangées de 6, et 1 en trop */
        const pl=definitionPlaces(2,6,430,290,110,160), u=definitionU(T,e2,.7);
        V13.slice(0,12).forEach(([x,y],k)=>definitionMusicien(c,x+(pl[k][0]-x)*u,y+(pl[k][1]-y)*u,S,k));
        const ex=430+3.5*110, ey=210; definitionMusicien(c,V13[12][0]+(ex-V13[12][0])*u,V13[12][1]+(ey-V13[12][1])*u,S,12,DEF_PLUS);
        if(T>=e2) ecrire(c,'2 rangées',430,520,58,CRAIE.grand);
        if(T>=eReste1){ definitionVide(c,ex,370,S); ecrire(c,'il en reste 1',W/2,625,70*Math.max(1,pop(T,eReste1)),CRAIE.faux); } }
      else if(T<e4){ /* 3 rangées de 4, et 1 en trop */
        const s3=88, pl=definitionPlaces(3,4,430,335,125,130), u=definitionU(T,e3,.7), de=definitionPlaces(2,6,430,290,110,160);
        de.forEach(([x,y],k)=>definitionMusicien(c,x+(pl[k][0]-x)*u,y+(pl[k][1]-y)*u,S+(s3-S)*u,k));
        const ex=430+2.5*125, ey=205; definitionMusicien(c,430+3.5*110+(ex-430-3.5*110)*u,210+(ey-210)*u,S+(s3-S)*u,12,DEF_PLUS);
        ecrire(c,'3 rangées',430,555,58,CRAIE.grand);
        if(T>=eReste2){ definitionVide(c,ex,335,s3); definitionVide(c,ex,465,s3); ecrire(c,'il en reste 1',W/2,635,70*Math.max(1,pop(T,eReste2)),CRAIE.faux); } }
      else if(T<eUne){ /* 4, 5, 6 rangées : rien ne marche */
        [[e4,'4'],[e5,'5'],[e6,'6']].forEach(([t0,s],k)=>{ if(T<t0) return; const x=260+k*270, z=Math.max(1,Math.min(1.15,pop(T,t0)));
          ecrire(c,s,x-44,300,120*z,CRAIE.grand); ecrire(c,'✗',x+52,300,96*z,CRAIE.faux); ecrire(c,'rangées',x,400,44,CRAIE.blanc); });
        if(T>=eRien) ecrire(c,'rien ne marche !',W/2,570,96*Math.max(1,pop(T,eRien)),CRAIE.faux); }
      else { /* une seule longue file de 13 */
        const pl=definitionPlaces(1,13,W/2,300,78,0), u=definitionU(T,eUne,.8);
        V13.forEach(([x,y],k)=>definitionMusicien(c,x+(pl[k][0]-x)*u,y+(pl[k][1]-y)*u,66,k,k===12?DEF_VESTE:DEF_VESTE));
        if(T>=mot('02-treize','file')) ecrire(c,'une seule file',W/2,480,78*Math.max(1,pop(T,mot('02-treize','file'))),CRAIE.petit);
        if(T>=e13b) ecrire(c,'de 13',W/2,590,96*Math.max(1,pop(T,e13b)),CRAIE.petit); }
      tab.maj(); return; }
    if(T>=dz){ /* 12 musiciens : 2 × 6, puis 3 × 4 */
      ecrire(c,'12 musiciens',W/2,70,72*Math.max(1,Math.min(1.15,pop(T,d12))),CRAIE.grand);
      const pl=definitionPlaces(2,6,265,300,82,150), u=definitionU(T,d2,.7);
      V12.forEach(([x,y],k)=>{ const xx=x+(pl[k][0]-x)*u, yy=y+(pl[k][1]-y)*u; definitionMusicien(c,xx,yy,u>0?80:S,k,DEF_VESTE,T>=d2?1:tz(T,d12+k*.03)); });
      if(T>=d2){ ecrire(c,'2',185,540,80*Math.max(1,pop(T,d2)),CRAIE.petit); ecrire(c,'×',265,540,64); ecrire(c,'6',345,540,80*Math.max(1,pop(T,mot('01-douze','6'))),CRAIE.grand); }
      if(T>=d3){ definitionPlaces(3,4,800,285,84,128).forEach(([x,y],k)=>definitionMusicien(c,x,y,80,k,DEF_VESTE,tz(T,d3+k*.04)));
        ecrire(c,'3',720,540,80*Math.max(1,pop(T,d3)),CRAIE.petit); ecrire(c,'×',800,540,64); ecrire(c,'4',880,540,80*Math.max(1,pop(T,mot('01-douze','4'))),CRAIE.grand); }
      if(T>=dFacile&&T<d2) ecrire(c,'facile !',W/2,640,80*Math.max(1,pop(T,dFacile)),CRAIE.ok);
      tab.maj(); return; }
    /* l'accroche : 13 musiciens en vrac, un rectangle ? et le pari */
    if(T>=t13){ ecrire(c,'13 musiciens',W/2,70,80*Math.max(1,Math.min(1.15,pop(T,t13))),CRAIE.petit);
      V13.forEach(([x,y],k)=>definitionMusicien(c,x,y-30,S,k,DEF_VESTE,tz(T,t13+k*.04))); }
    if(T>=tRect){ const u=Math.min(1,(T-tRect)/.5); c.strokeStyle=CRAIE.grand; c.lineWidth=7; c.setLineDash([24,16]); c.strokeRect(70,130,916*u,440); c.setLineDash([]); }
    if(T>=tParie) ecrire(c,'TU PARIES ?',W/2,650,120*Math.max(1,pop(T,tParie)),'#ff922b');
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-douze'), a2=dit('02-treize'), a3=dit('03-premier'), a4=dit('04-question'), qd=dit('03q-question'), rd=dit('03r-reponse');
  const finTitre=tPour-.08;
  const groupes=[
    groupe(acc+.1,finTitre,352,62,a0('Salut !'),a0('Moi, c’est Ti Margo.')),
    ...suiteDe(dz,60,58,[a0('Pour la parade, je range'),a0('13 musiciens en rectangle.')],[a0('Tu paries que j’y arrive ?')]),
    ...suiteDe(tr,60,58,[a1('Avec 12 musiciens, facile :')],[a1('2 rangées de 6,'),a1('ou 3 rangées de 4.')]),
    ...suiteDe(pr,60,58,[a2('Avec 13 ?')],[a2('2 rangées : il en reste 1.')],[a2('3 rangées : il en reste 1.')],[a2('4, 5, 6… rien ne marche !')],[a2('Une seule longue file de 13.')]),
    ...suiteDe(q,60,58,[a3('13 est un nombre premier :')],[a3('il n’a que deux diviseurs,'),a3('1 et lui-même.')],[a3('Il ne se range pas'),a3('en rectangle.')]),
    ...suiteDe(f,60,56,[a4('À toi : combien y a-t-il'),a4('de nombres premiers'),a4('entre 1 et 30 ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Lequel est premier ?')];
  const tq=m=>mot('03q-question',m)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(3); const r1=rd('21 = 3 × 7,'), r2=rd('et 27 = 3 × 9.');
  const tB=mot('03r-reponse','B')-r;

  poserMiniature(outils,acc+1,'13 musiciens<br>en rectangle'+PARI,
    `<svg width="330" height="214" viewBox="0 0 330 214"><rect x="6" y="6" width="318" height="202" rx="18" fill="#1f3a4d" stroke="#7a4b24" stroke-width="12"/>${
      Array.from({length:13},(_,k)=>{ const x=k<12?48+(k%4)*56:280, y=k<12?50+Math.floor(k/4)*56:50, col=k<12?'#e03131':'#ff922b';
        return `<rect x="${x-13}" y="${y-6}" width="26" height="28" rx="5" fill="${col}"/><circle cx="${x}" cy="${y-14}" r="10" fill="#f1c27d"/><rect x="${x-8}" y="${y-32}" width="16" height="11" fill="#1c2a4a"/>`; }).join('')
    }<text x="280" y="160" font-size="64" font-weight="800" fill="#ff8787" text-anchor="middle" font-family="Segoe UI">?</text></svg>`);
  return { clips,FIN,titre:'Les nombres premiers',ceinture:1,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,dz,tr,pr,q,r,com,f],
    question:{ qc:'03q-question',rc:'03r-reponse',finR:com,cpt:fin('03q-question')+.1,bonne:1,tBon:tB,
      phrase:phraseQ,pause:pauseQ,
      choix:[['21',tq('A'),tq('21')],['19',tq('B'),tq('19')],['27',tq('C'),tq('27')]],
      tete:[[r+.1,'Réponse '],[r+tB,'B : 19.']],reponse:[r1],suite:[r2] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<com, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      scene.x=-.72; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
      if(gros){ scene.x=-.55; cam.d=9.8; cam.y=1.9; }
      if(dansQ||dansF){ scene.x=-.1; cam.d=11.4; cam.y=3.55; }

      if(T<acc+1.5) g.salut(T-acc,1.5);
      else if(gros) g.ouvre();
      else if(T<dz){ T<tParie?g.montre():g.fier(); }
      else if(T<tr){ if(T>=dFacile&&T<d2) g.fier(); else g.montre(); }
      else if(T<pr){ if(T>=eRien&&T<eUne) g.oups(); else if((T>=eReste1-.2&&T<e3)||(T>=eReste2-.2&&T<e4)) g.reflechit(); else g.montre(); }
      else if(T<q){ if(T>=pPremier&&T<pDiv) g.fier(); else if(T>=pRange) g.oups(); else g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<com){ T<r+tB?g.ouvre():g.pouce(); }
      else if(T<f){ T<cReponds?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
