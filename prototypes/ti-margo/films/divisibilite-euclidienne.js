/* Série Divisibilité 4e, épisode 04 : LES COOKIES (division euclidienne).
   Ti Margo, pâtissier, range 47 cookies par boîtes de 6 : 7 boîtes pleines, il reste 5, qu'il mange.
   Le pari : « il m'en restera plus de 6 ? » Impossible : avec 6 cookies, il remplirait une boîte de plus.
   47 = 6 × 7 + 5, et le reste est toujours plus petit que la boîte.
   Décor : une cuisine de pâtisserie (parquet, mur crème, plan de travail, four, bocal à cookies).
   Réutilise les outils de films/divisibilite.js : voixDe, enchainer, groupe, suiteDe, poserMiniature,
   PARI, poserTableau, CRAIE, ecrire, pop, tz, fleche, gestes. Tout ce qui est propre ici finit par « Cookies ». */

/* ---- Un cookie à la craie : pâte dorée, bord cuit, pépites ---- */
function cookieCookies(c,x,y,r,z=1,k=0){ if(z<=0) return; r*=z;
  c.fillStyle='#e8b26a'; c.beginPath(); c.arc(x,y,r,0,7); c.fill();
  c.strokeStyle='#b0733a'; c.lineWidth=Math.max(2,r*.13); c.stroke();
  c.fillStyle='#4a2c17'; for(let i=0;i<4;i++){ const a=k*1.7+i*1.75, d=r*(.28+.16*((i*7+k)%3)); c.beginPath(); c.arc(x+Math.cos(a)*d,y+Math.sin(a)*d,r*.15,0,7); c.fill(); } }
/* Une boîte à cookies à la craie : cols × lignes alvéoles, centrée en (x,y) */
const PAS_C=52, R_C=22;
function boiteCookies(c,x,y,cols=3,lignes=2,coul=CRAIE.blanc,z=1){ if(z<=0) return; const w=cols*PAS_C+24, h=lignes*PAS_C+24;
  c.save(); c.translate(x,y); c.scale(z,z); c.strokeStyle=coul; c.lineWidth=6; c.beginPath(); c.roundRect(-w/2,-h/2,w,h,14); c.stroke();
  c.strokeStyle='rgba(248,249,250,.3)'; c.lineWidth=3;
  for(let i=0;i<lignes;i++) for(let j=0;j<cols;j++){ c.beginPath(); c.arc((j-(cols-1)/2)*PAS_C,(i-(lignes-1)/2)*PAS_C,R_C+3,0,7); c.stroke(); }
  c.restore(); }
const alveoleCookies=(x,y,s,cols=3,lignes=2)=>[x+((s%cols)-(cols-1)/2)*PAS_C,y+(Math.floor(s/cols)-(lignes-1)/2)*PAS_C];
const lisseCookies=u=>{ u=Math.max(0,Math.min(1,u)); return u*u*(3-2*u); };
/* Des mots à la suite, chacun à son instant et dans sa couleur, centrés en (x,y) */
function suiteCookies(c,T,morceaux,x,y,taille){ c.font=`800 ${taille}px "Segoe UI"`; const esp=taille*.32;
  const L=morceaux.map(([s])=>c.measureText(s).width), tot=L.reduce((a,b)=>a+b,0)+esp*(morceaux.length-1); let xx=x-tot/2;
  morceaux.forEach(([s,t,coul],k)=>{ if(T>=t) ecrire(c,s,xx+L[k]/2,y,taille*Math.max(1,pop(T,t)),coul); xx+=L[k]+esp; }); }

/* ---- La cuisine de pâtisserie ---- */
function poserCuisineCookies(){
  const cs=document.createElement('canvas'); cs.width=256; cs.height=64; const a=cs.getContext('2d');
  a.fillStyle='#c8955f'; a.fillRect(0,0,256,64); a.strokeStyle='#9c6b3c'; a.lineWidth=3;
  for(let y=0;y<=64;y+=32){ a.beginPath(); a.moveTo(0,y); a.lineTo(256,y); a.stroke(); }
  for(const [x,y] of [[60,0],[190,0],[120,32],[240,32]]){ a.beginPath(); a.moveTo(x,y); a.lineTo(x,y+32); a.stroke(); }
  const ts=new THREE.CanvasTexture(cs); ts.wrapS=ts.wrapT=THREE.RepeatWrapping; ts.repeat.set(40,160); ts.colorSpace=THREE.SRGBColorSpace;
  const sol=new THREE.Mesh(new THREE.PlaneGeometry(200,200),new THREE.MeshBasicMaterial({map:ts})); sol.rotation.x=-Math.PI/2; sol.position.y=-.02; scene3d.add(sol);
  /* Le mur crème à rayures roses */
  const cm=document.createElement('canvas'); cm.width=cm.height=64; const b=cm.getContext('2d'); b.fillStyle='#fff3dc'; b.fillRect(0,0,64,64); b.fillStyle='#ffd8d8'; b.fillRect(0,0,22,64);
  const tm=new THREE.CanvasTexture(cm); tm.wrapS=tm.wrapT=THREE.RepeatWrapping; tm.repeat.set(60,1); tm.colorSpace=THREE.SRGBColorSpace;
  const mur=new THREE.Mesh(new THREE.PlaneGeometry(60,40),new THREE.MeshBasicMaterial({map:tm})); mur.position.set(0,16,-6); scene3d.add(mur);
  /* Le plan de travail en bois clair, ses tiroirs et la porte du four */
  const plan=new THREE.Mesh(new THREE.BoxGeometry(60,1.5,1.2),new THREE.MeshBasicMaterial({color:0xf2d7a6})); plan.position.set(0,.75,-4.4); scene3d.add(plan);
  const dessus=new THREE.Mesh(new THREE.BoxGeometry(60,.12,1.3),new THREE.MeshBasicMaterial({color:0x8a5a2b})); dessus.position.set(0,1.55,-4.4); scene3d.add(dessus);
  for(let x=-14;x<=14;x+=2.2){ if(Math.abs(x-2.2)<.5) continue; const p=new THREE.Mesh(new THREE.PlaneGeometry(1.9,1.1),new THREE.MeshBasicMaterial({color:0xe6c089})); p.position.set(x,.74,-3.79); scene3d.add(p);
    const poignee=new THREE.Mesh(new THREE.PlaneGeometry(.5,.08),new THREE.MeshBasicMaterial({color:0x8a5a2b})); poignee.position.set(x,1.12,-3.78); scene3d.add(poignee); }
  const four=new THREE.Mesh(new THREE.PlaneGeometry(1.9,1.2),new THREE.MeshBasicMaterial({color:0x3b3b3b})); four.position.set(2.2,.74,-3.79); scene3d.add(four);
  const vitre=new THREE.Mesh(new THREE.PlaneGeometry(1.45,.7),new THREE.MeshBasicMaterial({color:0xff9a3c})); vitre.position.set(2.2,.68,-3.78); scene3d.add(vitre);
  /* Le bocal à cookies sur le plan de travail */
  const bocal=new THREE.Group(); bocal.position.set(-2.3,1.6,-4.3); scene3d.add(bocal);
  piece(bocal,new THREE.CylinderGeometry(.45,.45,1.0,24),toon(0xdff3ff,{transparent:true,opacity:.75}),[0,.5,0],CONTOUR_FIN);
  piece(bocal,new THREE.CylinderGeometry(.5,.5,.16,24),toon(0xe03131),[0,1.08,0],CONTOUR_FIN);
  for(let i=0;i<5;i++) piece(bocal,new THREE.CylinderGeometry(.3,.3,.07,18),toon(0xd9a05b),[(i%2?.1:-.08),.12+i*.17,.05],null).rotation.z=(i%2?.25:-.2);
  /* L'étagère en haut, ses pots */
  const et=new THREE.Mesh(new THREE.BoxGeometry(7,.12,.5),new THREE.MeshBasicMaterial({color:0x8a5a2b})); et.position.set(0,6.55,-5.6); scene3d.add(et);
  [[-2.6,0xffa94d],[-1.7,0x74c0fc],[1.8,0x8ce99a],[2.7,0xfaa2c1]].forEach(([x,col])=>{ const g=new THREE.Group(); g.position.set(x,6.61,-5.55); scene3d.add(g);
    piece(g,new THREE.CylinderGeometry(.26,.26,.6,16),toon(col),[0,.3,0],CONTOUR_FIN); piece(g,new THREE.CylinderGeometry(.28,.28,.1,16),toon(0xffffff),[0,.64,0],CONTOUR_FIN); });
}
/* La toque du pâtissier */
function poserToqueCookies(){ const h=new THREE.Group(); h.position.set(0,.46,-.07); h.rotation.z=.08; tete.add(h); const b=toon(0xffffff);
  piece(h,new THREE.CylinderGeometry(.37,.35,.16,24),b,[0,.06,0],CONTOUR_SOMBRE);
  for(const [x,y,r] of [[-.2,.3,.31],[.2,.3,.31],[0,.4,.34]]) piece(h,new THREE.SphereGeometry(r,18,14),b,[x,y,0],CONTOUR_SOMBRE);
  return h; }
/* Les miettes autour de la bouche, et le cookie que Ti Margo tient pour croquer */
function poserMiettesCookies(){ const m=toon(0xb9772e), L=[];
  for(const [x,y,z,r] of [[-.22,-.33,.6,.035],[.17,-.36,.6,.03],[.02,-.41,.58,.04],[.31,-.23,.56,.028],[-.33,-.2,.55,.025]]) L.push(piece(tete,new THREE.SphereGeometry(r,10,8),m,[x,y,z],null));
  return L; }
function poserCookieMainCookies(){ const g=new THREE.Group(); g.position.set(0,.2,.12); mainD.g.add(g);
  piece(g,new THREE.CylinderGeometry(.2,.2,.06,22),toon(0xe8b26a),[0,0,0],CONTOUR_FIN).rotation.x=Math.PI/2;
  for(const [x,y] of [[-.07,.05],[.08,.06],[.02,-.08],[-.1,-.05]]) piece(g,new THREE.SphereGeometry(.03,8,6),toon(0x4a2c17),[x,y,.035],null);
  return g; }

FILMS.euclidienne=function(outils){
  const {$,panneau}=outils;
  const DUR={'00-accroche':13.54,'01-boites':13.62,'02-jamais':15.05,'02q-question':12.2,'02r-reponse':7.73,'03-question':8.54,'04-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02q-question':3.3,'03-question':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,bo,ja,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['04-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserCuisineCookies(); poserToqueCookies(); const miettes=poserMiettesCookies(), enMain=poserCookieMainCookies();
  const tab=poserTableau({L:4.4,H:3,x:0,y:4.72,pieds:false,fond:'#2b3a33',bois:0x9c6b3c});
  panneau.style.display='none';
  const css=document.createElement('style'); css.textContent='#pause .ligne,#cq .ligne{display:block;} div#rebours{display:block;}'; document.head.append(css);

  /* Les instants */
  const tJai=mot('00-accroche','J\'ai'), t47=mot('00-accroche','47'), tBoite=mot('00-accroche','boîtes'), t6a=mot('00-accroche','6');
  const tResteA=mot('00-accroche','reste'), tMange=mot('00-accroche','mange'), tParie=mot('00-accroche','paries'), tPlusA=mot('00-accroche','plus'), t6b=mot('00-accroche','6',2);
  const NB=['6','12','18','24','30','36','42'], tC=NB.map(n=>mot('01-boites',n)), tPleines=mot('01-boites','pleines');
  const t47m=mot('01-boites','47'), t42=mot('01-boites','42',2), tResteB=mot('01-boites','reste'), t5c=mot('01-boites','5'), tMiam=mot('01-boites','Miam');
  const tPlusJ=mot('02-jamais','Plus'), tImp=mot('02-jamais','Impossible'), tAvec=mot('02-jamais','Avec'), tRemp=mot('02-jamais','remplirais'), tDePlus=mot('02-jamais','plus',2);
  const tResteJ=mot('02-jamais','reste'), tPetit=mot('02-jamais','petit'), tBoiteJ=mot('02-jamais','boîte',2);
  const e47=mot('02-jamais','47'), e6=mot('02-jamais','6',4), e7=mot('02-jamais','7'), ePlus=mot('02-jamais','plus',4), e5=mot('02-jamais','5');
  const tGouter=mot('02r-reponse','Petit');
  const tToi=mot('03-question','toi'), t100=mot('03-question','100'), tBoiteQ=mot('03-question','boîtes'), t7q=mot('03-question','7'), tCombien=mot('03-question','Combien'), tReponds=mot('03-question','Réponds');

  /* 47 cookies en vrac, en bas du tableau (toujours les mêmes) */
  /* une grille de 12 × 4 secouée : du vrac, mais jamais deux cookies l'un sur l'autre */
  const VRAC=[]; { let s=11; const rnd=()=>(s=(s*16807)%2147483647)/2147483647;
    for(let k=0;k<48;k++){ const x=80+(k%12)*81+(rnd()-.5)*22, y=350+Math.floor(k/12)*68+(rnd()-.5)*18; VRAC.push([x,y]); }
    VRAC.splice(41,1); }
  const BX=[140,400,660,920], BY=[95,240], boite=k=>[BX[k%4],BY[Math.floor(k/4)]];
  const RESTE=[0,1,2,3,4].map(k=>[110+k*64,420]);
  const ORANGE='#ffa94d';

  function dessiner(T){ const c=tab.c, W=tab.W; tab.effacer();
    if(T>=com){ /* le défi : 100 cookies, boîtes de 7, rien de la réponse */
      if(T>=t100){ const z=Math.max(1,pop(T,t100)); ecrire(c,'100 cookies',W/2,95,92*z,CRAIE.petit);
        for(let k=0;k<9;k++) cookieCookies(c,170+k*90,205,30,tz(T,t100+.1+k*.04),k); }
      if(T>=tBoiteQ){ boiteCookies(c,W/2,325,7,1,CRAIE.blanc,tz(T,tBoiteQ)); }
      if(T>=t7q) ecrire(c,'boîtes de 7',W/2,415,70*Math.max(1,pop(T,t7q)),CRAIE.grand);
      if(T>=tCombien) ecrire(c,'reste : ?',W/2,540,100*Math.max(1,pop(T,tCombien)),ORANGE);
      tab.maj(); return; }
    if(T>=ja){ /* plus de 6 ? impossible : 6 cookies font une boîte de plus ; 47 = 6 × 7 + 5 */
      if(T>=tPlusJ) ecrire(c,'Plus de 6 ?',W/2,62,76*Math.max(1,pop(T,tPlusJ)));
      if(T>=tImp){ c.save(); c.translate(W/2,150); c.rotate(-.06); ecrire(c,'Impossible !',0,0,92*Math.max(1,pop(T,tImp)),CRAIE.faux); c.restore(); }
      if(T>=tAvec){ boiteCookies(c,720,285,3,2,CRAIE.blanc,tz(T,tAvec));
        const u=lisseCookies((T-tRemp)/.6);
        for(let k=0;k<6;k++){ const [x1,y1]=[95+k*58,285], [x2,y2]=alveoleCookies(720,285,k); cookieCookies(c,x1+(x2-x1)*u,y1+(y2-y1)*u,R_C,tz(T,tAvec+k*.05),k); } }
      if(T>=tRemp&&T<tRemp+.9) fleche(c,450,285,600,285,CRAIE.ok);
      if(T>=tDePlus) ecrire(c,'+1 boîte',935,285,56*Math.max(1,pop(T,tDePlus)),CRAIE.ok);
      if(T>=tResteJ) suiteCookies(c,T,[['reste',tResteJ,ORANGE],['<',tPetit,CRAIE.blanc],['6',tBoiteJ,CRAIE.petit]],W/2,410,90);
      if(T>=tBoiteJ) ecrire(c,'(la boîte)',W/2+160,474,50,CRAIE.petit);
      suiteCookies(c,T,[['47',e47,CRAIE.grand],['=',e47,CRAIE.blanc],['6',e6,CRAIE.petit],['×',e6,CRAIE.blanc],['7',e7,CRAIE.ok],['+',ePlus,CRAIE.blanc],['5',e5,ORANGE]],W/2,555,84);
      tab.maj(); return; }
    if(T>=bo){ /* 7 boîtes qui se remplissent ; il reste 5 ; Miam */
      for(let k=0;k<7;k++){ const [x,y]=boite(k); boiteCookies(c,x,y,3,2,T>=tPleines?CRAIE.ok:CRAIE.blanc); }
      for(let k=0;k<7;k++){ const [x,y]=boite(k); if(T>=tC[k]) ecrire(c,NB[k],x+112,y-50,44*Math.max(1,pop(T,tC[k])),CRAIE.petit); }
      VRAC.forEach(([x0,y0],k)=>{
        if(k<42){ const b=Math.floor(k/6), [x1,y1]=alveoleCookies(...boite(b),k%6), u=lisseCookies((T-tC[b])/.4); cookieCookies(c,x0+(x1-x0)*u,y0+(y1-y0)*u,R_C,1,k); return; }
        const j=k-42, [x1,y1]=RESTE[j], u=lisseCookies((T-tPleines-.5)/.5), tMord=tMiam+.1+j*.18;
        if(T>=tMord){ c.fillStyle='#b0733a'; for(let m=0;m<3;m++){ c.beginPath(); c.arc(x1-10+m*11,y1+16-(m%2)*8,4,0,7); c.fill(); } return; }
        cookieCookies(c,x0+(x1-x0)*u,y0+(y1-y0)*u,R_C,1,k); });
      if(T>=tResteB&&T<tMiam+1.2){ c.strokeStyle=ORANGE; c.lineWidth=7; c.beginPath(); c.roundRect(RESTE[0][0]-40,RESTE[0][1]-42,RESTE[4][0]-RESTE[0][0]+80,84,40); c.stroke(); }
      suiteCookies(c,T,[['47',t47m,CRAIE.grand],['−',t47m,CRAIE.blanc],['42',t42,CRAIE.petit],['=',t5c,CRAIE.blanc],['5',t5c,ORANGE]],760,420,84);
      if(T>=tMiam) ecrire(c,'Miam !',760,555,96*Math.max(1,pop(T,tMiam)),ORANGE);
      tab.maj(); return; }
    /* l'accroche : 47 cookies, une boîte de 6 vide, le pari */
    if(T>=t47) VRAC.forEach(([x,y],k)=>cookieCookies(c,x,y,R_C,tz(T,t47+k*.02),k));
    if(T>=tBoite) boiteCookies(c,140,170,3,2,CRAIE.blanc,tz(T,tBoite));
    if(T>=t6a) ecrire(c,'boîte de 6',140,280,50*Math.max(1,pop(T,t6a)),CRAIE.petit);
    if(T>=tResteA) ecrire(c,'Reste :',640,110,74*Math.max(1,pop(T,tResteA)));
    if(T>=tPlusA) ecrire(c,'plus de 6 ?',640,240,96*Math.max(1,pop(T,t6b)),ORANGE);
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-boites'), a2=dit('02-jamais'), a3=dit('03-question'), qd=dit('02q-question'), rd=dit('02r-reponse');
  const egalite=[e47,e5,'47 = 6 × 7 + 5.',[e47,e47,e6,e6,e7,ePlus,e5]];
  const groupes=[
    groupe(acc+.1,tJai-.08,352,62,a0('Salut !'),a0('Moi, c’est Ti Margo.')),
    ...suiteDe(bo,60,58,[a0('J’ai 47 cookies,'),a0('et des boîtes de 6.')],[a0('Ce qui reste,'),a0('je le mange.')],[a0('Tu paries qu’il m’en restera'),a0('plus de 6 ?')]),
    ...suiteDe(ja,60,58,[a1('6, 12, 18, 24,'),a1('30, 36, 42 :')],[a1('7 boîtes pleines.')],[a1('47 − 42 :'),a1('il me reste 5 cookies.')],[a1('Miam.')]),
    ...suiteDe(q,60,58,[a2('Plus de 6 ?'),a2('Impossible !')],[a2('Avec 6 cookies, je remplirais'),a2('une boîte de plus.')],[a2('Le reste est toujours'),a2('plus petit que la boîte.')],[egalite]),
    ...suiteDe(f,60,56,[a3('À toi : 100 cookies,'),a3('boîtes de 7.')],[a3('Combien de cookies'),a3('me restent ?'),a3('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('50 cookies, boîtes de 8.'),qd('Combien j’en mange ?')];
  const tq=m=>mot('02q-question',m)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(3); const r1=rd('8 × 6 = 48.'), r2=rd('Il m’en reste 2.'), r3=rd('Petit goûter…');

  poserMiniature(outils,acc+1,'47 cookies : il en<br>reste plus de 6 ?'+PARI,
    `<svg width="330" height="210" viewBox="0 0 330 210"><rect x="6" y="6" width="318" height="198" rx="18" fill="#2b3a33" stroke="#9c6b3c" stroke-width="12"/>
      <rect x="28" y="40" width="170" height="122" rx="14" fill="none" stroke="#f8f9fa" stroke-width="6"/>${
      Array.from({length:6},(_,k)=>{ const x=62+(k%3)*51, y=75+Math.floor(k/3)*52; return `<circle cx="${x}" cy="${y}" r="21" fill="#e8b26a" stroke="#b0733a" stroke-width="3"/><circle cx="${x-6}" cy="${y-5}" r="4" fill="#4a2c17"/><circle cx="${x+7}" cy="${y+4}" r="4" fill="#4a2c17"/>`; }).join('')}${
      Array.from({length:5},(_,k)=>{ const x=236+(k%2)*44, y=50+Math.floor(k/2)*52+(k===4?0:0); const X=k===4?258:x; return `<circle cx="${X}" cy="${y}" r="19" fill="#e8b26a" stroke="#ffa94d" stroke-width="4"/><circle cx="${X-5}" cy="${y-4}" r="3.5" fill="#4a2c17"/><circle cx="${X+6}" cy="${y+4}" r="3.5" fill="#4a2c17"/>`; }).join('')}</svg>`);
  return { clips,FIN,titre:'La division euclidienne',ceinture:2,finTitre:tJai-.08,groupes,finClip:'04-abonne',
    cuts:[tJai-.08,bo,ja,q,r,com,f],
    question:{ qc:'02q-question',rc:'02r-reponse',finR:com,cpt:fin('02q-question')+.1,bonne:0,tBon:mot('02r-reponse','A')-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['2',tq('A'),tq('2')],['6',tq('B'),tq('6')],['10',tq('C'),tq('10')]],
      tete:[[r+.1,'Réponse '],[mot('02r-reponse','A'),'A : 2.']],reponse:[r1],suite:[r2,r3] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<com, dansF=T>=f, gros=T<tJai-.08;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      scene.x=-.72; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
      if(gros){ scene.x=-.55; cam.d=9.8; cam.y=1.9; }
      if(dansQ||dansF){ scene.x=-.1; cam.d=11.4; cam.y=3.55; }

      /* Croquer : la main à la bouche, le cookie dedans, les yeux fermés, la mâchoire qui mâche */
      const miam=()=>{ P.gesteD='ouverte'; P.md.set(.26,2.38,.8); P.cd.set(.76,1.8,.42); P.tetZ=.1; P.tetX=.06; P.paupiere=-1.25; P.jaw=.18+.3*Math.abs(Math.sin(T*11)); };
      const croque=(T>=tMange-.15&&T<tParie-.25)||(T>=tMiam-.1&&T<tMiam+1.25)||(T>=tGouter-.1&&T<com-.15);
      enMain.visible=croque&&!window.MINI;
      miettes.forEach(m=>m.visible=!window.MINI&&((T>=tMiam+.4&&T<tPlusJ+3)||(T>=tGouter+.3&&T<com)));

      if(T<acc+1.5) g.salut(T-acc,1.5);
      else if(gros) g.ouvre();
      else if(T<bo){ if(croque) miam(); else T<tParie?g.montre():g.fier(); }
      else if(T<ja){ if(croque) miam(); else T<tPleines?g.montre():(T<tMiam?g.montre():g.fier()); }
      else if(T<q){ if(T>=tImp&&T<tAvec) g.fier(); else if(T>=tResteJ&&T<e47) g.reflechit(); else g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<com){ if(croque) miam(); else if(T<mot('02r-reponse','A')) g.ouvre(); else g.pouce(); }
      else if(T<f){ T<tReponds?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.78; cam.d=10.0; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
