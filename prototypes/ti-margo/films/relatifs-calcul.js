/* ============================================================
   ÉPISODE 05 : LE JEU DES 3 PORTES. −2 + 3 × (−4) = −14.
   Un plateau de jeu télévisé, de nuit. Ti Margo se trompe deux fois :
   à chaque mauvaise porte, la trappe s'ouvre et il finit dans la piscine.
   ============================================================ */
FILMS.calcul=function({el,$,mots,jetons,panneau,carte,legende,fin,lisse}){
  /* ---- Les clips : tout le reste en découle ---- */
  const acc=.4,sit=17.1,q=25.2,a=40.8,cc=53.5,r=64.1,c=78.6,f=87.75,FIN=94.6;
  const clips=[['00-accroche',acc],['01-situation',sit],['01q-question',q],['02-porte-a',a],['03-porte-c',cc],['01r-reponse',r],['05-question',c],['06-abonne',f]];

  /* ---- Les légendes : chaque mot écrit à l'instant exact où il est dit ---- */
  const N=' ';
  const G=(base,de,fin,top,phr,fs)=>({de:base+de,a:fin,top,fs,phrases:phr.map(([t,l])=>[base+l[0],base+l[l.length-1],t,l.map(x=>base+x)])});
  const groupes=[
    G(acc,.1,acc+3.7,410,[['Salut'+N+'!',[.1]],['Moi, c’est Ti Margo.',[1.46,2.0,2.23,2.41]]]),
    G(acc,3.75,acc+6.5,60,[['Bienvenue au jeu des 3 portes'+N+'!',[3.8,4.44,4.55,4.76,4.92,5.19]]]),
    G(acc,6.52,acc+9.3,60,[['Derrière la bonne'+N+':',[6.58,7.09,7.25]],['la fête'+N+'!',[7.83,8.01]]]),
    G(acc,9.32,acc+13.33,60,[['Derrière les deux autres'+N+':',[9.37,9.88,10.03,10.18]],['plouf, dans la piscine'+N+'!',[10.83,11.55,11.74,11.88]]]),
    G(acc,13.35,sit-.05,60,[['Tu paries que je trouve du premier coup'+N+'?',[13.4,13.58,13.95,14.14,14.31,14.7,14.85,15.26]]]),
    G(sit,.05,sit+4.8,60,[['Le calcul est au tableau'+N+':',[.1,.32,.86,.97,1.13]],['−2 + 3 × (−4).',[2.11,2.27,2.61,2.9,3.49]]]),
    G(sit,4.82,q-.05,60,[['Sur chaque porte,',[4.87,5.18,5.48]],['un résultat.',[6.16,6.3]]]),
    G(a,.05,a+2.05,60,[['J’essaie la porte A.',[.1,.56,.7,1.06]]]),
    G(a,2.07,a+4.45,60,[['−2 + 3'+N+':',[2.45,2.61,2.95]],['1.',[3.48]]],76),
    G(a,4.47,a+7.55,60,[['1 × (−4)'+N+':',[4.53,4.71,5.29]],['−4.',[6.26]]],76),
    G(a,7.57,a+9.02,60,[['Plouf'+N+'!',[7.64]]],96),
    G(a,9.04,cc-.05,60,[['On n’a pas le droit de lire de gauche à droite.',[9.06,9.2,9.36,9.53,9.67,10,10.13,10.41,10.55,10.86,10.95]]]),
    G(cc,.05,cc+.88,60,[['La porte C.',[.1,.31,.65]]]),
    G(cc,.9,cc+3.42,60,[['3 × 4'+N+':',[.91,1.16,1.48]],['12.',[2.12]]],76),
    G(cc,3.44,cc+6.1,60,[['−2 + 12'+N+':',[3.82,3.98,4.29]],['10.',[4.89]]],76),
    G(cc,6.12,cc+7.55,60,[['Plouf'+N+'!',[6.19]]],96),
    G(cc,7.57,r-.05,60,[['J’ai oublié le moins du 4.',[7.61,7.84,8.34,8.48,8.74,8.89]]]),
    G(r,.05,r+2.88,60,[['Réponse B'+N+':',[.1,.62]],['−14'+N+'!',[1.37]]],76),
    G(r,2.9,r+5.6,60,[['La multiplication d’abord.',[2.92,3.15,4.19]]]),
    G(r,5.62,r+8.75,60,[['3 × (−4)'+N+':',[5.66,5.95,6.54]],['−12.',[7.5]]],76),
    G(r,8.77,r+12.35,60,[['−2 + (−12)'+N+':',[9.15,9.31,9.94]],['−14.',[10.86]]],76),
    G(r,12.37,c-.05,60,[['C’est la fête'+N+'!',[12.41,12.65,12.79]]],84),
    G(c,.05,f-.05,60,[['À toi'+N+':',[.1,.21]],['−5 × 2 + (−3) × (−4).',[1.01,1.32,1.64,2.08,2.6,2.85,3.44]],['Quel résultat'+N+'?',[4.82,5.05]],['Réponds en commentaire'+N+'!',[6.58,7.03,7.15]]],54)
  ];

  /* ---- La formule du panneau ---- */
  const NEG=s=>`<span class="neg">${s}</span>`, POS=s=>`<span class="pos">${s}</span>`, OK=s=>`<span class="ok">${s}</span>`;
  const F_CALC=[[sit+1.79,NEG('−')],[sit+2.11,NEG('2')+' '],[sit+2.27,POS('+')+' '],[sit+2.61,POS('3')+' '],[sit+2.9,'× '],[sit+3.21,'('+NEG('−')],[sit+3.49,NEG('4')+') '],[q+1.63,'= ?']];
  const A1=[[a+2.11,NEG('−')],[a+2.45,NEG('2')+' '],[a+2.61,POS('+')+' '],[a+2.95,POS('3')+' '],[a+3.48,'= '],[a+3.48,POS('1')]];
  const A2=[[a+4.53,POS('1')+' '],[a+4.71,'× '],[a+5.01,'('+NEG('−')],[a+5.29,NEG('4')+') '],[a+5.95,'= '+NEG('−')],[a+6.26,NEG('4')]];
  const C1=[[cc+.91,POS('3')+' '],[cc+1.16,'× '],[cc+1.48,POS('4')+' '],[cc+2.12,'= '],[cc+2.12,POS('12')]];
  const C2=[[cc+3.48,NEG('−')],[cc+3.82,NEG('2')+' '],[cc+3.98,POS('+')+' '],[cc+4.29,POS('12')+' '],[cc+4.89,'= '],[cc+4.89,POS('10')]];
  const OUBLI=[[cc+8.34,POS('3')+' × ('],[cc+8.48,'<span class="oubli">−</span>'],[cc+8.89,NEG('4')+')']];
  const R00=[[r+1.05,NEG('−')],[r+1.37,NEG('14')]];
  const R0=[[r+2.9,NEG('−2')+' '+POS('+')+' '+POS('3')+' × ('+NEG('−4')+')']];
  const R0b=[[r+3.15,NEG('−2')+' '+POS('+')+' '],[r+3.15,POS('3')+' × ('+NEG('−4')+')','surli']];
  const R1=[[r+5.66,POS('3')+' '],[r+5.95,'× '],[r+6.26,'('+NEG('−')],[r+6.54,NEG('4')+') '],[r+7.19,'= '+OK('−')],[r+7.5,OK('12')]];
  const R2=[[r+8.81,NEG('−')],[r+9.15,NEG('2')+' '],[r+9.31,POS('+')+' '],[r+9.68,'('+NEG('−')],[r+9.94,NEG('12')+') '],[r+10.55,'= '+OK('−')],[r+10.86,OK('14')]];
  const F_TOI=[[c+.7,NEG('−')],[c+1.01,NEG('5')+' '],[c+1.32,'× '],[c+1.64,POS('2')+' '],[c+2.08,POS('+')+' '],[c+2.33,'('+NEG('−')],[c+2.6,NEG('3')+') '],[c+2.85,'× '],[c+3.16,'('+NEG('−')],[c+3.44,NEG('4')+') '],[c+5.05,'= ?']];
  const VIDE=[];
  /* Chaque étape : à partir de, pastille [lettre, instant], ligne 1, ligne 2, instant du barré, instant du juste */
  const ETAPES=[
    {de:sit,l1:F_CALC},
    {de:a+1.06,pa:['A',a+1.06],l1:F_CALC},
    {de:a+2.07,pa:['A',a],l1:A1,l2:A2,barre:a+7.64},
    {de:cc+.65,pa:['C',cc+.65],l1:C1,l2:C2,barre:cc+6.19},
    {de:cc+8.34,pa:['C',cc],l1:OUBLI},
    {de:r+.62,pa:['B',r+.62],l1:R00},
    {de:r+2.9,pa:['B',r],l1:R0},
    {de:r+3.15,pa:['B',r],l1:R0b},
    {de:r+5.62,pa:['B',r],l1:R1,l2:R2,juste:r+10.86},
    {de:c+.7,l1:F_TOI}
  ];

  const css=document.createElement('style');
  css.textContent=`#panneau{top:auto!important;bottom:120px!important;}
    .choix.bon{transform:scale(1.05)!important;}
    #ligneP{display:flex;align-items:center;justify-content:center;gap:20px;}
    #pastille{flex:none;width:112px;height:112px;border-radius:50%;background:#17452a;color:#fff;font-size:72px;display:flex;align-items:center;justify-content:center;}
    #lignesC{flex:0 1 auto;min-width:0;}
    .lg{position:relative;width:fit-content;margin:0 auto;font-size:70px;line-height:1.22;white-space:nowrap;min-height:85px;}
    .barreR{position:absolute;left:-12px;right:-12px;top:47%;height:11px;border-radius:6px;background:#e03131;transform-origin:left center;}
    #marque{flex:none;width:92px;height:92px;font-size:84px;line-height:92px;text-align:center;}
    .surli{background:#ffe066;border-radius:12px;padding:0 8px;}
    .oubli{display:inline-block;color:#e03131;border:7px solid #e03131;border-radius:50%;width:84px;height:84px;line-height:66px;text-align:center;margin:0 6px;}`;
  document.head.append(css);
  panneau.innerHTML=`<div id="ligneP"><div id="pastille"></div><div id="lignesC"><div class="lg"><div id="f1"></div><div class="barreR" id="b1"></div></div><div class="lg" id="lg2"><div id="f2"></div><div class="barreR" id="b2"></div></div></div><div id="marque"></div></div>`;
  document.body.style.background='linear-gradient(#0a0630 0%,#1d0f5c 60%,#0a0630 100%)';

  /* ---- Les outils du décor ---- */
  const bm=c=>new THREE.MeshBasicMaterial({color:c});
  const boite=(w,h,d,c,x,y,z,p=scene3d)=>{ const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),bm(c)); m.position.set(x,y,z); p.add(m); return m; };
  const cyl=(rh,rb,h,c,x,y,z,p=scene3d)=>{ const m=new THREE.Mesh(new THREE.CylinderGeometry(rh,rb,h,24),bm(c)); m.position.set(x,y,z); p.add(m); return m; };
  const boule=(R,c,x,y,z,p=scene3d)=>{ const m=new THREE.Mesh(new THREE.SphereGeometry(R,18,12),bm(c)); m.position.set(x,y,z); p.add(m); return m; };
  const plaque=(txt,{w=1.5,h=1.15,fond='#fffdf5',coul='#17452a',bord='#17452a',fs=.72,rond=false}={},x=0,y=0,z=0,p=scene3d)=>{
    const K=256, cv=document.createElement('canvas'); cv.width=Math.round(w*K); cv.height=Math.round(h*K); const g=cv.getContext('2d');
    const R=rond?cv.height/2:cv.height*.16;
    g.beginPath(); g.roundRect(8,8,cv.width-16,cv.height-16,R); g.fillStyle=fond; g.fill(); g.lineWidth=16; g.strokeStyle=bord; g.stroke();
    g.fillStyle=coul; g.textAlign='center'; g.textBaseline='middle'; g.font=`800 ${cv.height*fs}px "Segoe UI"`; g.fillText(txt,cv.width/2,cv.height*.54);
    const tx=new THREE.CanvasTexture(cv); tx.colorSpace=THREE.SRGBColorSpace; tx.anisotropy=8;
    const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:tx,transparent:true})); m.renderOrder=7; m.position.set(x,y,z); p.add(m); return m; };
  /* Un mot lumineux sans fond, pour le tableau */
  const motTableau=(txt,coul,hw)=>{ const cv=document.createElement('canvas'); let g=cv.getContext('2d'); const F=180; g.font=`800 ${F}px "Segoe UI"`; const w=Math.ceil(g.measureText(txt).width)+16;
    cv.width=w; cv.height=230; g=cv.getContext('2d'); g.font=`800 ${F}px "Segoe UI"`; g.fillStyle=coul; g.textAlign='center'; g.textBaseline='middle'; g.fillText(txt,w/2,120);
    const tx=new THREE.CanvasTexture(cv); tx.colorSpace=THREE.SRGBColorSpace; tx.anisotropy=8; const W=hw*w/230;
    const m=new THREE.Mesh(new THREE.PlaneGeometry(W,hw),new THREE.MeshBasicMaterial({map:tx,transparent:true,depthWrite:false})); m.renderOrder=7; m.userData.w=W; return m; };

  /* ---- La nuit : le mur du fond, les rideaux, les étoiles ---- */
  const ZM=-1.5;
  boite(60,30,.1,0x1a1147,0,14,ZM-3.2);
  for(let i=0;i<40;i++){ const x=-16+((i*.618)%1)*32, y=9+((i*.381)%1)*9; boule(.05+((i*.77)%1)*.06,0xffffff,x,y,ZM-3.1); }
  /* Les rideaux, de chaque côté du plateau */
  for(const s of [-1,1]) for(let i=0;i<9;i++){ const m=cyl(.32,.32,9.6,i%2?0xc2255c:0x9c1c4d,s*(5.3+i*.56),4.8,ZM-.1); m.scale.z=.6; }
  for(const s of [-1,1]) boite(.3,8.4,.3,0xffc107,s*5.05,4.2,ZM+.1);

  /* ---- Le mur des portes ---- */
  const COUL_P={A:0xff3d8b,B:0xffa94d,C:0x22b8cf}, XP={A:-3,B:0,C:3}, LP=2.2, HP=4;
  for(const [x,w] of [[-4.575,.95],[-1.5,.8],[1.5,.8],[4.575,.95]]) boite(w,4.45,.2,0x5f3dc4,x,2.225,ZM);
  boite(10.1,.45,.2,0x5f3dc4,0,HP+.225,ZM);
  const PORTES={};
  const valeurs={A:['−4','#d9480f'],B:['−14','#d9480f'],C:['10','#1971c2']};
  const bulbes=[];
  for(const L of ['A','B','C']){
    const x0=XP[L];
    /* L'encadrement et son enseigne */
    boite(.16,HP,.3,0xffc107,x0-LP/2-.05,HP/2,ZM+.1); boite(.16,HP,.3,0xffc107,x0+LP/2+.05,HP/2,ZM+.1); boite(LP+.26,.16,.3,0xffc107,x0,HP+.02,ZM+.1);
    plaque(L,{w:.86,h:.86,fond:'#ffffff',coul:'#17452a',bord:'#ffc107',fs:.72,rond:true},x0,HP+.28,ZM+.3);
    for(let i=0;i<11;i++){ const y=.3+i*.36; bulbes.push(boule(.055,0xffffff,x0-LP/2-.05,y,ZM+.28)); bulbes.push(boule(.055,0xffffff,x0+LP/2+.05,y,ZM+.28)); }
    /* La porte, qui tourne vers le fond */
    const piv=new THREE.Group(); piv.position.set(x0-LP/2,0,ZM+.02); scene3d.add(piv);
    boite(LP,HP,.08,COUL_P[L],LP/2,HP/2,0,piv);
    for(const [yb,hb] of [[1.05,1.3]]) boite(LP-.5,hb,.02,0xffffff,LP/2,yb,.05,piv).material.color.set(COUL_P[L]).multiplyScalar(.82);
    boule(.1,0xffe066,LP-.22,1.75,.1,piv);
    const pQ=plaque('?',{w:1.8,h:1.02,coul:'#17452a',bord:'#17452a',fs:.74},LP/2,3.28,.08,piv);
    const pN=plaque(valeurs[L][0],{w:1.8,h:1.02,coul:valeurs[L][1],bord:valeurs[L][1],fs:.72},LP/2,3.28,.09,piv);
    PORTES[L]={piv,pQ,pN};
    /* Ce qu'il y a derrière */
    const bonne=L==='B';
    boite(LP+.4,HP,.1,bonne?0xfff3bf:0x5c1a1a,x0,HP/2,ZM-2.6);
    boite(.1,HP,2.6,bonne?0xffe066:0x3d1010,x0-LP/2-.1,HP/2,ZM-1.3); boite(.1,HP,2.6,bonne?0xffe066:0x3d1010,x0+LP/2+.1,HP/2,ZM-1.3);
    boite(LP+.4,.1,2.6,bonne?0xffd43b:0x3d1010,x0,HP+.05,ZM-1.3);
    boite(LP+.4,.1,2.6,bonne?0xffd43b:0x3d1010,x0,-.05,ZM-1.3);
    if(!bonne){ for(const s of [-1,1]){ const k=boite(2,.32,.05,0xe03131,x0,2,ZM-2.5); k.rotation.z=s*Math.PI/4; } }
    else {
      /* La coupe sur son socle, et les ballons */
      cyl(.34,.5,.5,0xb8860b,x0,.25,ZM-2.1); cyl(.1,.14,.7,0xffc107,x0,.85,ZM-2.1);
      const coupe=cyl(.62,.26,.85,0xffc107,x0,1.6,ZM-2.1); boite(1.7,.1,.1,0xffc107,x0,1.85,ZM-2.1);
      for(const [dx,yb,k] of [[-.72,2.9,0xff3d8b],[.72,3.1,0x22b8cf],[-.25,3.35,0x51cf66],[.3,2.5,0xcc5de8]]) boule(.27,k,x0+dx,yb,ZM-2.2);
    }
  }

  /* ---- Le public, en silhouette, sur le balcon ---- */
  boite(14,1.2,.1,0xff5fa2,0,5.1,ZM-.35);
  boite(14,.14,.1,0xffc107,0,5.72,ZM-.3);
  const PUBLIC=[];
  for(const [rangee,yb,zb,nb] of [[0,4.92,ZM-.2,27],[1,5.22,ZM-.28,28]]) for(let i=0;i<nb;i++){
    const x=-6.9+i*.5+rangee*.25+Math.sin(i*2.7+rangee)*.05, g=new THREE.Group(); g.position.set(x,yb,zb); scene3d.add(g);
    boule(.18+((i*.37)%.04),0x120a2a,0,.1,0,g); boite(.36,.4,.05,0x120a2a,0,-.2,0,g);
    const bras=[boite(.07,.46,.05,0x120a2a,-.2,.18,0,g),boite(.07,.46,.05,0x120a2a,.2,.18,0,g)];
    PUBLIC.push({g,bras,yb,ph:i*1.3+rangee*.7});
  }
  /* Le balcon, sa rambarde */
  boite(14,.46,.3,0x3d1f91,0,4.68,ZM+.06);
  boite(14,.06,.04,0xffc107,0,4.94,ZM+.1);
  /* Les flashs des téléphones du public */
  const FLASHS=[]; for(let i=0;i<14;i++) FLASHS.push({m:boule(.075,0xffffff,-6.5+i*1,5.1+((i*.618)%1)*.3,ZM-.1),ph:i*2.17});

  /* ---- Le tableau géant ---- */
  const YT=7, XT=9.7;
  boite(XT+.5,3,.2,0xffc107,0,YT,ZM-.1); boite(XT,2.6,.2,0x0b1030,0,YT,ZM);
  for(let i=0;i<31;i++){ const x=-XT/2-.05+i*(XT+.1)/30; bulbes.push(boule(.07,0xffffff,x,YT+1.4,ZM+.12)); bulbes.push(boule(.07,0xffffff,x,YT-1.4,ZM+.12)); }
  const ZTX=ZM+.14;
  /* Une rangée de jetons, centrée : [texte, couleur, écart avant] */
  const rangee=(liste,hw,y,lmax=9)=>{ const g=new THREE.Group(); scene3d.add(g); g.position.set(0,y,ZTX); const ms=liste.map(([t,co])=>motTableau(t,co,hw));
    let L=0; ms.forEach((m,i)=>{ L+=m.userData.w+(i?(liste[i][2]===undefined?hw*.08:liste[i][2]):0); });
    const k=Math.min(1,lmax/L); let x=-L/2; ms.forEach((m,i)=>{ if(i) x+=(liste[i][2]===undefined?hw*.08:liste[i][2]); m.position.x=x+m.userData.w/2; m.userData.x0=m.position.x; x+=m.userData.w; g.add(m); });
    g.scale.set(k,k,1); return {g,ms,k}; };
  const W='#ffffff',O='#ff922b',B='#74c0fc',V2='#8ce99a';
  const TITRE1=rangee([['LE','#ffe066'],['JEU','#ffe066'],['DES','#ffe066']],1.15,YT+.58);
  const TITRE2=rangee([['3','#ff9ccb'],['PORTES','#ff9ccb']],1.15,YT-.58);
  const TCALC=rangee([['−',O],['2',O,0],['+',B],['3',B],['×',W],['(',W],['−',O,0],['4',O,0],[')',W,0]],1.75,YT+.22);
  const TA=rangee([['1',B],['×',W],['(−4)',O],['=',W],['−4',O]],1.75,YT);
  const TC=rangee([['−2',O],['+',B],['12',B],['=',W],['10',B]],1.75,YT);
  const TR2=rangee([['−2',O],['+',B],['(−12)',O]],1.75,YT);
  const TR3=rangee([['−14',V2]],2.3,YT);
  const TTOI=rangee([['−5',O],['×',W],['2',B],['+',B],['(−3)',O],['×',W],['(−4)',O]],1.5,YT);
  const QUAND=(R,l)=>R.ms.forEach((m,i)=>{ m.userData.t=l[i]; });
  QUAND(TITRE1,[acc+4.55,acc+4.55,acc+4.76]); QUAND(TITRE2,[acc+4.92,acc+5.19]);
  QUAND(TCALC,[sit+1.79,sit+2.11,sit+2.27,sit+2.61,sit+2.9,sit+3.21,sit+3.21,sit+3.49,sit+3.49]);
  QUAND(TA,[a+3.48,a+4.71,a+5.29,a+6.26,a+6.26]);
  QUAND(TC,[cc+3.82,cc+3.98,cc+4.29,cc+4.89,cc+4.89]);
  QUAND(TR2,[r+7.5,r+7.5,r+7.5]); QUAND(TR3,[r+10.86]);
  QUAND(TTOI,[c+1.01,c+1.32,c+1.64,c+2.08,c+2.6,c+2.85,c+3.44]);
  const TOUS=[TITRE1,TITRE2,TCALC,TA,TC,TR2,TR3,TTOI];
  /* Le surlignage d'un morceau du calcul, derrière les chiffres */
  const surligne=(R,i,j,coul)=>{ const x0=R.ms[i].position.x-R.ms[i].userData.w/2-.1, x1=R.ms[j].position.x+R.ms[j].userData.w/2+.1, H2=.86, g=new THREE.Group(); R.g.add(g);
    for(const [w,h,x,y] of [[x1-x0+.12,.12,(x0+x1)/2,H2],[x1-x0+.12,.12,(x0+x1)/2,-H2],[.12,2*H2,x0,0],[.12,2*H2,x1,0]]) boite(w,h,.01,coul,x,y,.01,g);
    return g; };
  const HL_G=surligne(TCALC,0,3,0xffe066), HL_F=surligne(TCALC,3,8,0xffe066);
  /* La flèche « de gauche à droite », et la croix qui la barre */
  const flecheG=new THREE.Group(); flecheG.position.set(-4.2,YT-.92,ZTX+.03); scene3d.add(flecheG);
  const fBarre=boite(1,.14,.03,0xffe066,.5,0,0,flecheG), fPte=new THREE.Mesh(new THREE.ConeGeometry(.2,.36,16),bm(0xffe066)); fPte.rotation.z=-Math.PI/2; flecheG.add(fPte);
  const croixG=new THREE.Group(); croixG.position.set(0,YT-.92,ZTX+.05); scene3d.add(croixG);
  for(const s of [-1,1]){ const k=boite(3.2,.3,.03,0xe03131,0,0,0,croixG); k.rotation.z=s*.62; }
  /* L'anneau autour du moins oublié */
  const anneau=new THREE.Mesh(new THREE.RingGeometry(.5,.62,36),bm(0xff2222)); anneau.position.z=.02; TCALC.g.add(anneau); anneau.position.x=TCALC.ms[6].position.x; anneau.position.y=-.02;

  /* ---- Le plateau, en coupe : la scène et la piscine dessous ---- */
  const YE=-.9, YB=-4.2, ZAV=1.6, ZTR=-.7;
  const TOP=0x4c1fb0, TRANCHE=0xffc107;
  /* Le dessus et sa tranche : pleins entre les trappes, sur toute la profondeur */
  for(const [x,w] of [[-4.475,1.05],[-1.5,1.1],[1.5,1.1],[4.475,1.05]]){ boite(w,.3,ZAV-ZM,TOP,x,-.15,(ZAV+ZM)/2); boite(w,.3,.02,TRANCHE,x,-.15,ZAV+.01); }
  /* Derrière les trappes A et C, la bande du fond ; devant B, une fausse trappe jamais ouverte */
  for(const x of [-3,3]){ boite(1.9,.3,ZTR-ZM,TOP,x,-.15,(ZTR+ZM)/2); }
  boite(1.9,.3,ZAV-ZM,TOP,0,-.15,(ZAV+ZM)/2); boite(1.9,.3,.02,TRANCHE,0,-.15,ZAV+.01);
  /* Le dessin des trappes : le même pour les trois, on ne devine rien */
  for(const x of [-3,0,3]){ for(const s of [-1,1]) boite(.05,.012,ZAV-ZTR,0xffe066,x+s*.92,.006,(ZAV+ZTR)/2); boite(1.9,.012,.05,0xffe066,x,.006,ZTR); boite(.03,.012,ZAV-ZTR,0x8f6bf0,x,.006,(ZAV+ZTR)/2); }
  /* Les ampoules du bord de scène */
  for(let i=0;i<34;i++){ const x=-4.92+i*.298; if(Math.abs(Math.abs(x)-3)<.98&&Math.abs(x)>1) continue; bulbes.push(boule(.05,0xffffff,x,-.15,ZAV+.05)); }
  /* Les deux trappes qui s'ouvrent : deux battants */
  const TRAPPES={};
  for(const L of ['A','C']){ const x=XP[L], G_=new THREE.Group(), D_=new THREE.Group(); G_.position.set(x-.95,0,0); D_.position.set(x+.95,0,0); scene3d.add(G_,D_);
    boite(.95,.14,ZAV-ZTR,TOP,.475,-.07,(ZAV+ZTR)/2,G_); boite(.95,.14,ZAV-ZTR,TOP,-.475,-.07,(ZAV+ZTR)/2,D_);
    boite(.95,.14,.02,TRANCHE,.475,-.07,ZAV+.01,G_); boite(.95,.14,.02,TRANCHE,-.475,-.07,ZAV+.01,D_);
    boite(.03,.012,ZAV-ZTR,0x8f6bf0,.93,.006,(ZAV+ZTR)/2,G_);
    for(const [g,s] of [[G_,1],[D_,-1]]){ boite(.05,.012,ZAV-ZTR,0xffe066,s*.03,.006,(ZAV+ZTR)/2,g); boite(.95,.012,.05,0xffe066,s*.475,.006,ZTR+.03,g); }
    /* Le monte-charge, au fond de la piscine */
    const pl=new THREE.Group(); scene3d.add(pl); pl.position.set(x,YB,.4);
    boite(1.55,.14,2,0xadb5bd,0,-.07,0,pl); boite(1.55,.03,.05,0xffe066,0,0,1,pl);
    const ver=cyl(.13,.13,1,0x868e96,x,YB,.4);
    TRAPPES[L]={G_,D_,pl,ver}; }
  /* Le carrelage du fond de la piscine */
  { const cv=document.createElement('canvas'); cv.width=cv.height=128; const g=cv.getContext('2d'); g.fillStyle='#18a7ee'; g.fillRect(0,0,128,128); g.strokeStyle='#8fe0ff'; g.lineWidth=6; g.strokeRect(0,0,128,128);
    const tx=new THREE.CanvasTexture(cv); tx.colorSpace=THREE.SRGBColorSpace; tx.wrapS=tx.wrapT=THREE.RepeatWrapping; tx.repeat.set(60,8);
    const m=new THREE.Mesh(new THREE.PlaneGeometry(60,YE-YB+1.4),new THREE.MeshBasicMaterial({map:tx})); m.position.set(0,(YE+YB)/2+.5,ZM+.01); scene3d.add(m); }
  boite(60,.3,4,0x0f4c75,0,YB-.15,0);
  /* Au-delà de la scène, la piscine est à ciel ouvert : son mur du fond continue */
  boite(60,.05,ZAV-ZM,0x79dcff,0,YE-.01,(ZAV+ZM)/2);
  const EAU=new THREE.Mesh(new THREE.PlaneGeometry(60,YE-YB),new THREE.MeshBasicMaterial({color:0x1c9dff,transparent:true,opacity:.42,depthWrite:false})); EAU.position.set(0,(YE+YB)/2,ZAV+.02); EAU.renderOrder=5; scene3d.add(EAU);
  /* Les vaguelettes, le long du bord de l'eau */
  const VAGUES=[]; for(let i=0;i<70;i++){ const m=boule(.3,0xc8f3ff,-17.25+i*.5,YE,ZAV+.03); m.scale.set(1,.2,.12); VAGUES.push({m,x:-17.25+i*.5}); }
  /* Les bulles au repos */
  const BULLES=[]; for(let i=0;i<9;i++) BULLES.push(boule(.05+((i*.37)%.06),0xe7f9ff,-5+i*1.25,YB,1.3));
  const BULLES_T=[]; for(let i=0;i<12;i++) BULLES_T.push(boule(.06+((i*.61)%.06),0xffffff,0,-5,1.2));

  /* Le canard : d'abord dans sa main, puis dans l'eau, et enfin sur sa tête */
  const faireCanard=(p,k=1)=>{ const g=new THREE.Group(); p.add(g); g.scale.setScalar(k); const corps=boule(.3,0xffd43b,0,0,0,g); corps.scale.set(1.15,.82,1); boule(.2,0xffd43b,.17,.3,0,g);
    const bec=boule(.09,0xf76707,.36,.28,0,g); bec.scale.set(1.3,.5,1); boule(.035,0x17202b,.24,.38,.13,g); boule(.035,0x17202b,.24,.38,-.13,g); boule(.035,0x17202b,.3,.38,.1,g).visible=false; const q=boule(.12,0xfab005,-.34,.14,0,g); q.scale.set(1,1.3,.6); return g; };
  const canard=faireCanard(scene3d); canard.rotation.y=-.5;
  const canardTete=faireCanard(tete,1.05); canardTete.position.set(0,.62,.02); canardTete.rotation.y=-.4;

  /* Les canons à confettis, de chaque côté */
  for(const s of [-1,1]){ const k=cyl(.17,.26,.8,0xe64980,s*4.62,.42,-1); k.rotation.z=s*.5; cyl(.2,.2,.1,0xffe066,s*4.62+s*-.21,.76,-1).rotation.z=s*.5; }

  /* ---- Gerbes : tout est calculé depuis T ---- */
  const COUL_C=[0xff3d8b,0xffd43b,0x22b8cf,0x51cf66,0xcc5de8,0xff922b,0xffffff];
  const gerbes=[];
  const gerbe=(t0,x,y0,{n=30,vy=7,vx=2.6,g=11,R=.09,coul=[0xffffff,0x9be3ff,0x4dc4ff],z=.4,dur=1.7,conf=false,dirx=0,sol=null}={})=>{ const l=[]; for(let i=0;i<n;i++){
      const u=(i*.7548776)%1, w=(i*.5698403)%1, m=conf?boite(.13,.2,.02,COUL_C[i%COUL_C.length],0,0,0):boule(R*(.7+w*.8),coul[i%coul.length],0,0,0); m.visible=false;
      l.push({m,vx:dirx?dirx*(1.5+u*vx):(u*2-1)*vx,vy:vy*(.55+w*.55),vz:(w-.5)*1.2}); }
    gerbes.push({t0,x,y0,g,z,dur,l,conf,sol}); };
  const PLOUF_D=acc+10.83, TP_A={ouvre:a+6.7,trappe:a+7.1,chute:a+7.3,pl:a+7.64,lift0:a+10.05,lift1:a+11.15,L:'A'}, TP_C={ouvre:cc+5.3,trappe:cc+5.7,chute:cc+5.85,pl:cc+6.19,lift0:cc+8.25,lift1:cc+9.35,L:'C'};
  const T_FETE=r+11;
  gerbe(PLOUF_D,5.25,YE,{n:26,vy:6.5,vx:2.2,sol:5});
  gerbe(TP_A.pl,-3,YE,{n:44,vy:9.5,vx:2.2,sol:.92});
  gerbe(TP_C.pl,3,YE,{n:44,vy:9.5,vx:2.2,sol:.92});
  gerbe(TP_A.lift1+.25,-3,1.3,{n:22,vy:3.2,vx:2.6,R:.06,dur:.9});   /* Il s'ébroue */
  gerbe(TP_C.lift1+.1,3,1.3,{n:22,vy:3.2,vx:2.6,R:.06,dur:.5});
  for(const s of [-1,1]){ gerbe(acc+8.01,s*4.3,.9,{n:24,vy:10,vx:2.5,g:9,conf:true,dirx:-s,z:.9,dur:2.2}); gerbe(T_FETE,s*4.3,.9,{n:40,vy:11,vx:3.2,g:9,conf:true,dirx:-s,z:.9,dur:2.4}); }
  gerbe(T_FETE,0,1.8,{n:50,vy:8.5,vx:3.4,g:8,conf:true,z:.5,dur:2.4});
  const anneaux=[[PLOUF_D,5.25],[TP_A.pl,-3],[TP_C.pl,3]].map(([t,x])=>{ const m=cyl(1,1,.02,0xffffff,x,YE+.02,.4); m.material=new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.7,depthWrite:false}); return {m,t}; });
  /* Le « PLOUF » de bande dessinée : écrit quand la voix le dit */
  const bdPlouf=[[TP_A.pl,-3],[TP_C.pl,3]].map(([t,x])=>({t,x,m:plaque('PLOUF !',{w:2.5,h:.84,fond:'#ffe066',coul:'#e03131',bord:'#e03131',fs:.66},x,1.5,1.9)}));

  /* La pluie de confettis, à partir de la bonne porte */
  const PLUIE=[]; for(let i=0;i<150;i++){ const m=boite(.2,.32,.02,COUL_C[i%COUL_C.length],0,0,0); m.visible=false; PLUIE.push({m,x:-5.4+((i*.7548776)%1)*10.8,ph:((i*.5698403)%1)*14,z:-.9+((i*.3247)%1)*2.8,i}); }

  /* Les gouttes qui tombent de lui quand il est trempé, et sa flaque */
  const GOUTTES=[]; for(let i=0;i<16;i++) GOUTTES.push(boule(.05,0x7fd7ff,0,-9,0));
  const flaque=cyl(1,1,.012,0x57c5ff,0,.012,.35); flaque.material=new THREE.MeshBasicMaterial({color:0x57c5ff,transparent:true,opacity:.75,depthWrite:false});

  /* Les projecteurs : de grands cônes de lumière qui balaient le plateau */
  const PROJ=[[-4.6,0xffe066,.62,-.42],[-1.6,0xff5fa2,.8,.1],[1.6,0x5fd8ff,.7,-.1],[4.6,0x9dff7a,.55,.42]].map(([x,k,v,o],i)=>{ const g=new THREE.Group(); g.position.set(x,10.3,1); scene3d.add(g);
    const co=new THREE.Mesh(new THREE.ConeGeometry(1.5,11,28,1,true),new THREE.MeshBasicMaterial({color:k,transparent:true,opacity:.14,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide})); co.position.y=-5.5; g.add(co); co.renderOrder=6; return {g,v,o,ph:i*1.7,co}; });

  /* ---- Les petits sons : le bloup du plouf, les tics du rebours, la fanfare ---- */
  const TICS=[];
  for(let i=0;i<3;i++) TICS.push({t:q+12.4+i,f:760});
  for(const t of [PLOUF_D,TP_A.pl,TP_C.pl]) for(const [d,fq] of [[0,330],[.07,230],[.14,150]]) TICS.push({t:t+d,f:fq});
  for(const [d,fq] of [[0,523],[.14,659],[.28,784],[.42,1047]]){ TICS.push({t:T_FETE+d,f:fq}); }

  /* ---- Ses déplacements : [début, fin, de, à] ---- */
  const MARCHES=[[q+3.6,q+4.2,0,-3],[q+5.6,q+6.25,-3,0],[q+7.95,q+8.6,0,3],[q+9.6,q+10.4,3,0],[a+.05,a+1,0,-3],[a+12.1,cc+.85,-3,3],[cc+9.95,r+.5,3,0]];
  const posTi=T=>{ let x=0,m=null,d=0; for(const [de,fi,x0,x1] of MARCHES){ if(T>=fi) x=x1; else if(T>=de){ x=x0+(x1-x0)*lisse((T-de)/(fi-de)); m=x1>x0?1:-1; d=Math.abs(x-x0); } } return {x,m,d}; };

  const plateauY=(T,ch)=>{ if(T<ch.lift0) return YB; if(T<ch.lift1) return YB+(0-YB)*lisse((T-ch.lift0)/(ch.lift1-ch.lift0)); if(T<ch.lift1+.5) return 0; if(T<ch.lift1+1.4) return YB*lisse((T-ch.lift1-.5)/.9); return YB; };
  const piedsY=(T,ch)=>{ if(T<ch.chute) return 0; if(T>=ch.lift1) return 0; let y;
    if(T<ch.pl){ const u=(T-ch.chute)/(ch.pl-ch.chute); y=YE*u*u; }
    else { const u=Math.min(1,(T-ch.pl)/.8); y=YE+(-3.72-YE)*(1-(1-u)*(1-u))+(u>=1?Math.sin((T-ch.pl)*2.2)*.09:0); }
    return Math.max(y,plateauY(T,ch)); };
  const ouvreTrappe=(T,ch)=>{ if(T<ch.trappe) return 0; if(T<ch.trappe+.16) return (T-ch.trappe)/.16; if(T<ch.lift1+.05) return 1; if(T<ch.lift1+.35) return 1-lisse((T-ch.lift1-.05)/.3); return 0; };
  const ouvrePorte=(T,L)=>{ if(L==='A') return lisse((T-TP_A.ouvre)/.4)*(1-lisse((T-a+.0-11.4)/.55)); if(L==='C') return lisse((T-TP_C.ouvre)/.4)*(1-lisse((T-TP_C.lift1-.1)/.55)); return lisse((T-r-10.86)/.5); };

  poserMiniature(arguments[0],q+11,'−2 + 3 × (−4)<br>Quelle porte ?<div style="color:#e8590c;font-size:136px;margin-top:10px">TU PARIES ?</div>');

  const CUTS=[acc+3.75,acc+6.5,acc+9.32,acc+13.35,sit,sit+1.6,sit+4.1,q,a,a+2.05,a+6.45,a+8.15,a+9.04,a+12.1,cc+.88,cc+5,cc+6.69,cc+7.55,cc+9.95,r+.5,r+2.9,r+5.62,r+10.6,r+12.41,c,c+4.7,f];
  const film={ clips,FIN,tics:TICS,titre:'Le jeu des 3 portes',ceinture:3,finTitre:acc+3.7,cuts:CUTS,groupes,finClip:'06-abonne',
    question:{ qc:'01q-question',rc:'02-porte-a',finR:a,cpt:q+12.4,bonne:1,tBon:.62,
      phrase:[[q+1.63,q+2.69,'Quelle porte je dois ouvrir'+N+'?',[1.63,1.89,2.31,2.48,2.69].map(x=>q+x)]],
      pause:[[q+10.4,q+11.35,'Mets pause, et choisis'+N+'!',[10.4,10.61,11.24,11.35].map(x=>q+x)]],
      choix:[['<span class="neg">−4</span>',4.19,4.86],['<span class="neg">−14</span>',6.25,7.02],['<span class="pos">10</span>',8.57,9.1]],
      tete:VIDE,reponse:VIDE,suite:VIDE },

    jouer(P,T,cam){
      const vise=(x,yW,Y,d,e=.05)=>{ cam.x=x; cam.y=yW+(Y-960)/(2637/d); cam.d=d; cam.e=e; };
      scene.taille=.68; scene.z=.3; racine.rotation.order='YXZ'; racine.rotation.x=0;
      const LARGE=(dx=0)=>vise(dx,0,1220,24.5,.06);

      /* ---- Ce qui vit tout seul ---- */
      const fete=T>=T_FETE&&T<c;
      const excite=(T>=acc+8&&T<acc+9.3)||(T>=PLOUF_D&&T<PLOUF_D+1.2)||(T>=TP_A.pl&&T<TP_A.pl+1.5)||(T>=TP_C.pl&&T<TP_C.pl+1.5)||fete;
      bulbes.forEach((m,i)=>{ const on=Math.sin(T*(fete?13:7)-i*.9)>0; m.material.color.set(on?(i%3===0?0xffe066:i%3===1?0xff5fa2:0x7fe9ff):0x6b5a2a); });
      for(const p of PUBLIC){ const k=excite?1:.25; p.g.position.y=p.yb+Math.abs(Math.sin(T*(excite?7:2.2)+p.ph))*.09*k*2; p.g.rotation.z=Math.sin(T*1.6+p.ph)*.05;
        const lever=excite||Math.sin(T*.8+p.ph*.6)>.86; p.bras.forEach(b=>{ b.visible=lever; }); }
      for(const fl of FLASHS){ const v=Math.sin(T*5.3+fl.ph)>.975; fl.m.visible=v; }
      for(const p of PROJ){ const v=fete?2.6:1; p.g.rotation.z=p.o+Math.sin(T*p.v*v+p.ph)*.34; }
      for(const v of VAGUES) v.m.position.y=YE+Math.sin(T*2.6+v.x*1.25)*.05;
      BULLES.forEach((b,i)=>{ b.position.y=YB+.1+((T*.42+i*.37)%1)*(YE-YB-.2); b.position.x=-5+i*1.25+Math.sin(T*1.4+i)*.1; });

      /* ---- Le tableau ---- */
      const dedans=(R,on)=>{ R.g.visible=on; if(on) for(const m of R.ms) m.visible=T>=m.userData.t; };
      const voitC=(T>=sit+1.79&&T<a+3.48)||(T>=a+7.64&&T<cc+3.44)||(T>=cc+6.19&&T<r+7.5);
      const titreVu=T<acc+13.35||T>=sit; dedans(TITRE1,titreVu&&T>=acc+4.55&&T<sit+1.13); dedans(TITRE2,titreVu&&T>=acc+4.92&&T<sit+1.13);
      dedans(TCALC,voitC); dedans(TA,T>=a+3.48&&T<a+7.64); dedans(TC,T>=cc+3.44&&T<cc+6.19);
      dedans(TR2,T>=r+7.5&&T<r+10.86); dedans(TR3,T>=r+10.86&&T<c); dedans(TTOI,T>=c&&T<c+4.7);
      HL_G.visible=voitC&&T>=a+2.11&&T<a+3.48;
      HL_F.visible=voitC&&((T>=cc+.91&&T<cc+3.44)||(T>=r+3.15));
      /* Le moins du 4 : il tombe du tableau pendant l'erreur, puis revient en grand */
      { const mo=TCALC.ms[6]; mo.position.y=0; mo.rotation.z=0; mo.scale.set(1,1,1); anneau.visible=false;
        if(voitC&&T>=cc+1.16&&T<cc+8.48){ const u=T-cc-1.16; mo.position.y=-6.5*u*u; mo.rotation.z=u*5; mo.visible=u<.48; }
        else if(voitC&&T>=cc+8.48&&T<cc+9.95){ const z=1+.3*Math.sin(Math.min(1,(T-cc-8.48)/.7)*Math.PI/2); const z2=z*(1-.32*lisse((T-cc-9.2)/.5)); mo.scale.set(z2,z2,1); anneau.visible=true; anneau.scale.setScalar(z2*.85); } }
      /* La flèche de la lecture de gauche à droite, barrée quand la voix dit « droite » */
      { const v=T>=a+10.13&&T<a+12.1, u=lisse((T-a-10.41)/.55); flecheG.visible=v; const L=.3+u*8; fBarre.scale.x=L; fBarre.position.x=L/2; fPte.position.x=L+.14; croixG.visible=T>=a+10.95&&T<a+12.1; const z=.42*(T<a+11.3?1+.3*Math.exp(-(T-a-10.95)*6):1); croixG.scale.set(z,z,1); const barree=T>=a+10.95; fBarre.material.color.set(barree?0xff6b6b:0xffe066); fPte.material.color.set(barree?0xff6b6b:0xffe066); }

      /* ---- Les portes et les trappes ---- */
      for(const [L,tc] of [['A',q+4.86],['B',q+7.02],['C',q+9.1]]){ const po=PORTES[L], rev=T>=tc; po.pQ.visible=!rev; po.pN.visible=rev;
        let z=1; if(T>=tc&&T<tc+.6) z=1+.28*Math.sin((T-tc)/.6*Math.PI); if(L==='B'&&T>=r+1.37&&T<r+2.8) z=1+.22*Math.sin(Math.min(1,(T-r-1.37)/.7)*Math.PI); po.pN.scale.set(z,z,1); po.pQ.scale.set(1,1,1);
        po.piv.rotation.y=1.45*ouvrePorte(T,L); }
      for(const ch of [TP_A,TP_C]){ const tr=TRAPPES[ch.L], th=ouvreTrappe(T,ch)*Math.PI/2; tr.G_.rotation.z=-th; tr.D_.rotation.z=th;
        const yp=plateauY(T,ch); tr.pl.position.y=yp; const hv=Math.max(.01,yp-YB); tr.ver.scale.y=hv; tr.ver.position.y=YB+hv/2; }

      /* ---- Le canard ---- */
      const xCanard=5.25+(3-5.25)*Math.min(1,Math.max(0,(T-PLOUF_D)/(cc+7-PLOUF_D)));
      const tetePris=T>=TP_C.lift0&&piedsY(T,TP_C)>=-3.2||T>=TP_C.lift1;
      canardTete.visible=tetePris&&!window.MINI;
      canard.visible=!tetePris&&T>=acc+9.32&&!window.MINI;
      if(T<acc+10.35){ canard.position.set(5.32,1.62,.82); canard.rotation.z=0; }
      else if(T<PLOUF_D){ const u=(T-acc-10.35)/(PLOUF_D-acc-10.35); canard.position.set(5.32-.07*u,1.62+(YE+.1-1.62)*u*u,.82-.2*u); canard.rotation.z=-u*1.3; }
      else { const g=T-PLOUF_D; const saut=(T>=TP_C.pl&&T<TP_C.pl+.8)?Math.sin((T-TP_C.pl)/.8*Math.PI)*.9:0; canard.position.set(xCanard,YE+.1+Math.sin(T*2.6+xCanard)*.05+saut+(g<.5?-.25*Math.sin(g/.5*Math.PI):0),.62); canard.rotation.z=Math.sin(T*1.9)*.1; }

      /* ---- Sa position ---- */
      const {x:xM,m:mar,d:dM}=posTi(T);
      let xT=xM, ch=null;
      if(T>=acc+9.32&&T<acc+13.35) xT=4.45;
      for(const c2 of [TP_A,TP_C]) if(T>=c2.chute&&T<c2.lift1) ch=c2;
      const yT=ch?piedsY(T,ch):0;
      scene.x=xT; scene.y=yT; scene.ySol=0; scene.cacherOmbre=yT<-.01;
      const sousLEau=ch&&T>=ch.pl&&yT<YE-1;

      /* Trempé : les gouttes et la flaque */
      const mouille=T>=TP_A.lift0&&yT>YE-1.6&&T<f+20;
      const nb=T>=TP_C.lift0?16:10;
      GOUTTES.forEach((g,i)=>{ const v=mouille&&i<nb; g.visible=v; if(v){ const u=(T*2.4+i*.37)%1; g.position.set(xT+(i%2?1:-1)*(.3+(i%5)*.07),yT+1.55*(1-u),.3+.55+Math.cos(i*1.7)*.12); } });
      flaque.visible=mouille&&yT>=-.01; if(flaque.visible){ const r0=.62+.1*Math.sin(T*1.4)+(T>=TP_C.lift1?.14:0); flaque.scale.set(r0,1,r0*.75); flaque.position.x=xT; flaque.position.z=.42; }

      /* Les gerbes */
      for(const g of gerbes){ const t=T-g.t0, on=t>=0&&t<g.dur; for(let i=0;i<g.l.length;i++){ const d=g.l[i]; if(!on){ d.m.visible=false; continue; }
          const x=g.x+d.vx*t, y=g.y0+d.vy*t-.5*g.g*t*t; let v=true;
          /* La gerbe qui sort de la trappe ne traverse pas le plancher */
          if(g.sol!==null){ const horsTrou=Math.abs(x-g.x)>g.sol, surScene=g.sol===5?Math.abs(x)<5:true; if(y<YE) v=false; if(surScene&&horsTrou&&g.sol!==5&&y<.05) v=false; if(g.sol===5&&Math.abs(x)<5&&y<.05) v=false; }
          else if(!g.conf&&y<.03) v=false; else if(g.conf&&y<.02) v=false;
          d.m.visible=v; d.m.position.set(x,y,g.z+d.vz*t+(g.conf?0:.3)); if(g.conf){ d.m.rotation.x=t*(5+i%5); d.m.rotation.z=t*(3+i%3)+i; } } }
      for(const an of anneaux){ const t=T-an.t, v=t>=0&&t<.9; an.m.visible=v; if(v){ const R=.5+t*2.2; an.m.scale.set(R,1,R*.45); an.m.material.opacity=.75*(1-t/.9); } }
      for(const b of bdPlouf){ const t=T-b.t, v=t>=0&&t<.5; b.m.visible=v; if(v){ const z=t<.14?.4+.8*t/.14:1.2-.2*lisse((t-.14)/.2); b.m.scale.set(z,z,1); b.m.rotation.z=(b.x<0?-.08:.08); } }
      BULLES_T.forEach((b,i)=>{ const v=!!sousLEau; b.visible=v; if(v){ const u=(T*1.1+i*.083)%1; b.position.set(xT+(i%2?1:-1)*(.72+(i%5)*.07)+Math.sin(i*2.3+T*2)*.06,yT+1.1+u*(YE-yT-1.1),1.25); } });

      /* La pluie de confettis */
      for(const p of PLUIE){ const t=(T-T_FETE)*4-p.ph, v=T>=T_FETE&&t>=0&&t<10.2; p.m.visible=v; if(v){ p.m.position.set(p.x+Math.sin(t*1.4+p.i)*.3,10-t,p.z); p.m.rotation.x=t*2.3+p.i; p.m.rotation.y=t*1.7; p.m.rotation.z=p.i; } }

      /* ---- Les gestes ---- */
      const ouvre=()=>{ P.gesteD='ouverte'; P.md.set(.86,2.02+Math.sin(T*3)*.06,.5); P.cd.set(.72,1.58,.2); P.tetY=.08+Math.sin(T*1.7)*.07; };
      const montre=()=>{ P.gesteD='index'; P.md.set(1.02,2.72+Math.sin(T*3)*.04,.42); P.cd.set(.86,1.95,.1); P.tetX=-.14; P.regY=.3; P.regX=-.25; };
      const pouce=()=>{ P.md.set(.95,2.32,.45); P.cd.set(.74,1.7,.14); P.gesteD='pouce'; P.tetZ=-.14; P.paupiere=-1.1; };
      const reflechit=()=>{ P.md.set(.44,2.3,.72); P.cd.set(.78,1.78,.34); P.gesteD='index'; P.tetZ=.15; P.tetX=-.1; P.regX=-.28; P.regY=.35; P.qSway=Math.sin(T*3)*.3; };
      const grand=()=>{ P.gesteD='ouverte'; P.md.set(1.15,2.7+Math.sin(T*3)*.05,.3); P.cd.set(.95,1.95,.1); P.mg.set(-1.15,2.7-Math.sin(T*3)*.05,.3); P.cg.set(-.95,1.95,.1); P.paupiere=-1.2; P.qEnroule=.8; };
      const grelotte=(k=1)=>{ scene.x=xT+Math.sin(T*41)*.022*k; P.gesteD='poing'; P.md.set(.38,2.1+Math.sin(T*37)*.03,.72); P.cd.set(.74,1.72,.3); P.mg.set(-.38,2.12-Math.sin(T*37)*.03,.72); P.cg.set(-.74,1.72,.3);
        P.tetZ=Math.sin(T*33)*.05; P.tetX=.08; P.paupiere=-1.25; P.regY=.32; P.jaw=Math.max(P.jaw,.3)+Math.sin(T*47)*.05; P.qEnroule=1.1; };
      const marche=()=>{ scene.ry=mar>0?1.25:-1.25; const j=P.jaw; marcher(dM*.445,P); P.jaw=j; };
      const danse=t=>{ const j=P.jaw; ACTIONS.danse.f(t,P); P.jaw=j; };
      /* La chute : surprise, suspendu dans le vide, les bras en l'air, sous l'eau, puis remonté */
      const plonge=ch2=>{
        if(T<ch2.trappe){ pouce(); P.ty=.3*lisse((T-ch2.ouvre-.1)/.2); P.regY=-.3; }
        else if(T<ch2.chute){ P.gesteD='ouverte'; P.md.set(1.15,2.0,.3); P.cd.set(.95,1.6,.1); P.mg.set(-1.15,2.0,.3); P.cg.set(-.95,1.6,.1); P.regX=.4; P.tetX=.22; P.paupiere=-1.3; P.jaw=Math.max(P.jaw,.5); P.pg.y=.1; P.pd.y=.1; }
        else if(T<ch2.pl){ P.gesteD='ouverte'; P.md.set(.7,3.3,.3); P.cd.set(.8,2.4,.1); P.mg.set(-.7,3.3,.3); P.cg.set(-.8,2.4,.1); P.jaw=.75; P.paupiere=-1.3; P.pg.y=.2; P.pd.y=.2; P.qEnroule=.5; }
        else if(T<ch2.lift0+.3){ const s=Math.sin(T*6); P.gesteD='ouverte'; P.md.set(.9,2.8+s*.3,.4); P.cd.set(.85,2.2,.15); P.mg.set(-.9,2.8-s*.3,.4); P.cg.set(-.85,2.2,.15); P.jaw=.14; P.paupiere=-1.3; P.pg.y=.25+s*.1; P.pd.y=.25-s*.1; P.qSway=s*.7; }
        else { grelotte(.5); }
      };

      /* ---- Les plans ---- */
      if(T<acc+3.75){ /* Le salut, sur le plateau */
        vise(0,0,1780,6.6);
        if(T<acc+1.4){ const e=lisse((T-acc)*4)*lisse((acc+1.4-T)*4); P.md.set(.88,2.2+.68*e,.28); P.cd.set(.82,1.92,.06); P.gesteD='ouverte'; P.tourneD=Math.sin(T*11)*.42*e; } else ouvre();
      }
      else if(T<acc+6.5){ /* Le recul : on découvre le plateau, le tableau s'allume */
        const u=lisse((T-acc-3.75)/1.5); vise(0,0,1500+(1220-1500)*u,11+13.5*u,.06); grand(); P.sautY=T>=acc+4.5&&T<acc+5?Math.sin((T-acc-4.5)/.5*Math.PI)*.2:0;
      }
      else if(T<acc+9.32){ /* La fête : les canons */
        const u=(T-acc-6.5)/2.82; vise(Math.sin(u*2.4)*.35,0,1330,21-1.2*u,.06);
        if(T<acc+8.01) ouvre(); else danse(T-acc-8.01);
      }
      else if(T<acc+13.35){ /* Plouf : il lâche le canard, au bout de la scène */
        const u=(T-acc-9.32)/4; vise(4.25+.2*u,0,1040,12-1*u,.06); scene.ry=-.05;
        if(T<acc+10.35){ P.gesteD='ouverte'; P.md.set(1.06,2.05,.75); P.cd.set(.82,1.7,.3); P.regY=.28; P.regX=.1; P.tetY=.15; }
        else if(T<acc+11.55){ P.gesteD='ouverte'; P.md.set(1.06,2.05,.75); P.cd.set(.82,1.7,.3); P.regY=.3; P.regX=.35; P.tetX=.2; P.tetY=.2; }
        else { P.gesteD='index'; P.md.set(1.12,1.25,.62); P.cd.set(.9,1.6,.25); P.regY=.3; P.regX=.32; P.tetX=.16; P.tetY=.14; }
      }
      else if(T<sit){ /* Le pari : la caméra s'approche */
        const u=(T-acc-13.35)/(sit-acc-13.35); vise(0,0,1660,9.5-2.1*lisse(u)); scene.ry=-.14+Math.sin(T*2)*.05; pouce(); P.tetZ=-.14+Math.sin(T*3.1)*.05;
      }
      else if(T<sit+1.6){ LARGE(); montre(); }
      else if(T<sit+4.1){ /* Le calcul : la caméra suit l'écriture */
        const u=lisse((T-sit-1.7)/2); vise(-1.1+2.2*u,YT,580,16,.03); montre();
      }
      else if(T<q){ /* Chaque porte, un résultat */
        const u=lisse((T-sit-4.3)/3.4); vise(-2.3+4.6*u,0,1180,13,.06); ouvre(); P.tetY=-.2+.4*u; P.regY=-.3+.6*u;
      }
      else if(T<a){ /* La question : il court d'une porte à l'autre */
        const u=(T-q)/(a-q); vise(Math.sin(u*5)*.1,0,1340,22-.7*u,.06);
        if(mar) marche();
        else if(T>=q+4.2&&T<q+5.6||T>=q+6.25&&T<q+7.95||T>=q+8.6&&T<q+9.6){ montre(); scene.ry=.0; }
        else reflechit();
      }
      else if(T<a+2.05){ /* En route vers la porte A */
        vise(posTi(T).x*.8,0,1300,11.6,.06);
        if(mar) marche(); else { ouvre(); P.tetY=.2; }
      }
      else if(T<a+6.45){ /* Il lit de gauche à droite, très sûr de lui */
        LARGE(Math.sin(T*.9)*.08); montre();
        if(T>=a+3.48&&T<a+3.9) P.sautY=Math.sin((T-a-3.48)/.42*Math.PI)*.18;
      }
      else if(T<a+8.15){ /* La porte s'ouvre derrière lui : un mur et une croix. La trappe. */
        vise(-3,0,1160,10.5,.08); plonge(TP_A); scene.ry=-.1;
      }
      else if(T<a+9.04){ /* Au fond de l'eau */
        const u=(T-a-8.15)/.9; vise(-3,-1.9,830-30*u,11.5,.03); plonge(TP_A); scene.ry=-.1;
      }
      else if(T<a+12.1){ /* Le tableau : pas de gauche à droite. Le monte-charge le ramène, trempé. */
        LARGE(-.15+.15*Math.sin(T*.7)); plonge(TP_A); scene.ry=-.1;
        if(T>=TP_A.lift1){ if(T<TP_A.lift1+.25) grelotte(.5); else if(T<TP_A.lift1+.85){ grelotte(1); scene.ry=-.1+Math.sin(T*30)*.4; } else grelotte(1); }
      }
      else if(T<cc+.88){ /* Il court, tout mouillé, jusqu'à la C */
        vise(posTi(T).x*.8,0,1300,11.6,.06); if(mar) marche(); else { ouvre(); }
      }
      else if(T<cc+5){ LARGE(Math.sin(T*.9)*.08); montre(); scene.x=xT+Math.sin(T*41)*.01; }
      else if(T<cc+6.69){ vise(3,0,1160,10.5,.08); plonge(TP_C); scene.ry=-.1; }
      else if(T<cc+7.55){ const u=(T-cc-6.69)/.86; vise(3,-1.9,830-30*u,11.5,.03); plonge(TP_C); scene.ry=-.1; }
      else if(T<cc+9.95){ /* Le moins oublié revient au tableau ; lui revient, avec le canard */
        LARGE(.15); plonge(TP_C); scene.ry=-.1;
        if(T>=TP_C.lift1) grelotte(1);
      }
      else if(T<r+.5){ vise(posTi(T).x*.8,0,1300,11.6,.06); if(mar) marche(); else ouvre(); }
      else if(T<r+2.9){ /* Réponse B */
        const u=lisse((T-r-.5)/2.3); vise(0,0,1230,12.5-1.3*u,.06); scene.ry=-.1; grelotte(.7); P.gesteD='ouverte'; P.md.set(.92,2.7,.4); P.cd.set(.82,2,.12); P.regX=-.3; P.tetX=-.16;
      }
      else if(T<r+5.62){ /* La multiplication d'abord : le tableau de près */
        const u=(T-r-2.9)/2.72; vise(1.1+.3*u,YT,580,16-.8*u,.03); montre();
      }
      else if(T<r+10.6){ /* Les deux calculs, juste à la suite, avec tout le plateau */
        vise(0,0,1220,24.5,.06); montre(); scene.x=Math.sin(T*33)*.008;
      }
      else if(T<c){ /* La bonne porte s'ouvre : il n'ose pas regarder, puis c'est la fête */
        if(T<r+12.41) vise(0,0,1400,11.5-.5*lisse((T-r-10.6)/1.8),.06); else LARGE(Math.sin((T-r)*1.1)*.1); scene.ry=-.1;
        if(T<r+11.3){ P.gesteD='ouverte'; P.md.set(.24,3.2,.98); P.cd.set(.82,2.1,.3); P.mg.set(-.24,3.2,.98); P.cg.set(-.82,2.1,.3); P.tetX=.1; P.paupiere=-1.3; }
        else if(T<r+12.41){ const u2=(T-r-11.3)/1.1; P.sautY=Math.sin(u2*Math.PI)*.7; grand(); P.jaw=Math.max(P.jaw,.6); }
        else danse(T-r-12.41);
      }
      else if(T<c+4.7){ /* À toi : le tableau a changé */
        vise(0,0,1220,24.5,.06); scene.ry=-.12+Math.sin(T*.9)*.06; montre();
      }
      else if(T<f){ /* Le défi, droit dans les yeux, le canard toujours sur la tête */
        const u=(T-c-4.7)/(f-c-4.7); vise(Math.sin(u*3.2)*.3,0,1500,14-.4*lisse(u)); scene.ry=-.12+Math.sin(T*.9)*.06; T<c+6.58?ouvre():pouce();
      }
      else { /* La fin : sous l'écran de fin */
        vise(.25,0,1770,8.2+Math.sin((T-f)*.5)*.2); scene.ry=-.14+Math.sin(T*1.4)*.05; T-f<2.35?ouvre():pouce();
      }

      if(window.MINI){ scene.x=0; scene.y=0; scene.z=3; scene.taille=1.6; scene.ry=-.1; scene.cacherOmbre=false; P.jaw=.62; pouce(); gerbes.forEach(g=>g.l.forEach(d=>{d.m.visible=false;})); flaque.visible=false; GOUTTES.forEach(g=>{g.visible=false;});
        TOUS.forEach(R=>{ R.g.visible=false; }); TITRE2.g.visible=true; TITRE2.ms.forEach(m=>{ m.visible=true; }); vise(0,0,1720,19,.06); panneau.style.display='none'; canard.visible=false; canardTete.visible=false; return; }

      /* ---- Le panneau du bas ---- */
      const voirP=T>=sit+1.7&&T<f;
      panneau.style.display=voirP?'block':'none';
      if(voirP){
        let et=ETAPES[0]; for(const e of ETAPES) if(T>=e.de) et=e;
        const pa=$('pastille'); pa.style.display=et.pa?'flex':'none'; if(et.pa){ pa.textContent=et.pa[0]; pa.style.visibility=T>=et.pa[1]?'':'hidden'; pa.style.background=et.pa[0]==='B'?'#2f9a3a':(et.barre&&T>=et.barre?'#e03131':'#17452a'); }
        jetons($('f1'),et.l1||VIDE,T);
        const a2=!!et.l2; $('lg2').style.display=a2?'':'none'; jetons($('f2'),et.l2||VIDE,T);
        const ub=et.barre?lisse((T-et.barre)/.22):0;
        for(const b of ['b1','b2']){ const e=$(b); e.style.display=ub>0?'':'none'; e.style.transform=`rotate(${b==='b1'?-3:3}deg) scaleX(${ub})`; }
        const ma=$('marque'); const mauvais=et.barre&&T>=et.barre, bon=et.juste&&T>=et.juste;
        ma.style.display=(et.barre||et.juste)?'':'none'; ma.textContent=mauvais?'✗':(bon?'✓':''); ma.style.color=mauvais?'#e03131':'#2f9a3a';
      }
    } };
  return film;
};
