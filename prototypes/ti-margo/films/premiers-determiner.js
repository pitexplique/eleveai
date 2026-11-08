/* Série Nombres premiers 4e, épisode 09 : LES CIGALES (voix 4e-premier-determiner-short).
   Dans la forêt, des cigales sortent de terre tous les 13 ou 17 ans : deux nombres premiers.
   Un prédateur qui revient tous les 2, 3 ou 4 ans les croise rarement (la frise des années).
   Le test de Ti Margo jusqu'à 100 : ÷ 2, ÷ 3, ÷ 5, ÷ 7 ; 91 = 7 × 13, le test par 7 qu'on oublie.
   Outils communs (voixDe, enchainer, suiteDe, poserTableau, ecrire, pop, tz, gestes, poserMiniature, PARI,
   CRAIE) : films/premiers.js. Couleurs des tests : 2 orange, 3 bleu, 5 rose, 7 violet. */

const DET_C={2:'#ffa94d',3:'#74c0fc',4:'#faa2c1',5:'#faa2c1',7:'#b197fc'};

/* ---- La forêt : sous-bois, troncs, feuillages, trous de sortie des cigales, cigales sur les troncs ---- */
function determinerForet(){
  const ciel=new THREE.Mesh(new THREE.PlaneGeometry(240,70),new THREE.MeshBasicMaterial({color:0xcfe8d6})); ciel.position.set(0,22,-30); scene3d.add(ciel);
  const sol=new THREE.Mesh(new THREE.PlaneGeometry(900,900),new THREE.MeshBasicMaterial({color:0x6f9a4a})); sol.rotation.x=-Math.PI/2; sol.position.y=-.02; scene3d.add(sol);
  const sentier=new THREE.Mesh(new THREE.PlaneGeometry(3,40),new THREE.MeshBasicMaterial({color:0xb08b5b})); sentier.rotation.x=-Math.PI/2; sentier.position.set(0,-.01,8); scene3d.add(sentier);
  /* les arbres du fond, en deux rangs */
  const verts=[0x2f7d32,0x3f9142,0x2b6e2f,0x4c9a3f];
  const arbres=[[-6.6,-5.2,1.1],[-4.4,-6.4,1.25],[-2.6,-5.0,.95],[2.7,-5.1,1.0],[4.6,-6.2,1.2],[6.7,-5.0,1.05],[-8.6,-7.5,1.3],[8.6,-7.4,1.3],[-1,-9,1.4],[1.6,-8.6,1.3]];
  const troncs=[];
  arbres.forEach(([x,z,s],k)=>{ const a=new THREE.Group(); a.position.set(x,0,z); scene3d.add(a);
    const h=3.4*s; troncs.push({x,z,s,h});
    piece(a,new THREE.CylinderGeometry(.22*s,.32*s,h,12),toon(0x7a5230),[0,h/2,0],CONTOUR_FIN);
    for(const [dx,dy,dz,r] of [[0,h+.5*s,0,1.25],[-.75*s,h-.1,.2,.9],[.8*s,h,.1,.95],[0,h+1.3*s,-.1,.85]])
      piece(a,new THREE.IcosahedronGeometry(r*s,1),toon(verts[(k+Math.round(dx*3))&3]),[dx,dy,dz],CONTOUR_FIN); });
  /* les fougères et les trous de sortie dans la terre */
  for(let i=-7;i<=7;i++){ if(Math.abs(i)<2) continue; const f=new THREE.Group(); f.position.set(i*1.1,0,-3.2-((i*i)%3)*.35); scene3d.add(f);
    for(let k=0;k<5;k++){ const fe=piece(f,new THREE.ConeGeometry(.12,.9,6),toon(0x3d8b37),[0,.35,0],null); fe.rotation.z=(k-2)*.45; fe.position.x=(k-2)*.12; } }
  for(const [x,z] of [[-2.2,-1.6],[-3.4,-.4],[2.4,-1.2],[3.6,-.2],[-1.6,.6],[1.9,.9],[-4.2,1.4],[4.4,1.6]]){
    const t=new THREE.Mesh(new THREE.CircleGeometry(.13,14),new THREE.MeshBasicMaterial({color:0x3b2a1a})); t.rotation.x=-Math.PI/2; t.position.set(x,.001,z); scene3d.add(t); }
  /* les cigales posées sur les troncs : corps sombre, yeux rouges, ailes transparentes */
  const cigales=[];
  for(const [k,y,cote] of [[2,1.7,1],[3,2.3,-1],[0,1.5,1],[5,2.0,-1],[4,2.8,1],[1,1.2,-1]]){ const t=troncs[k];
    const c=new THREE.Group(); c.position.set(t.x+cote*.05,y,t.z+.3*t.s+.05); c.rotation.z=cote*.12; scene3d.add(c);
    piece(c,ell(.08,.17,.07,16),toon(0x2b2b30),[0,0,0],CONTOUR_FIN);
    piece(c,ell(.09,.05,.06,12),toon(0x1f1f24),[0,.17,0],null);
    for(const s of [-1,1]) piece(c,new THREE.SphereGeometry(.035,10,8),toon(0xe03131),[s*.08,.18,.03],null);
    const ailes=[];
    for(const s of [-1,1]){ const w=new THREE.Mesh(new THREE.PlaneGeometry(.12,.34),new THREE.MeshBasicMaterial({color:0xfff3bf,transparent:true,opacity:.55,side:THREE.DoubleSide}));
      w.position.set(s*.07,-.06,.08); w.rotation.z=s*.28; c.add(w); ailes.push([w,s]); }
    cigales.push({g:c,ailes}); }
  return cigales;
}

/* Une cigale vue de dessus, à la craie (tête en haut) */
function determinerCigale(c,x,y,s,z=1){ if(z<=0) return; s*=z;
  c.save(); c.translate(x,y);
  c.fillStyle='rgba(255,243,191,.35)'; c.strokeStyle='#ffa94d'; c.lineWidth=Math.max(2,s*.05);
  for(const sx of [-1,1]){ c.save(); c.rotate(-sx*.32); c.beginPath(); c.ellipse(sx*s*.2,s*.2,s*.18,s*.5,0,0,7); c.fill(); c.stroke(); c.restore(); }
  c.fillStyle='#495057'; c.strokeStyle='#ced4da'; c.lineWidth=Math.max(2,s*.04); c.beginPath(); c.ellipse(0,s*.1,s*.2,s*.4,0,0,7); c.fill(); c.stroke();
  c.fillStyle='#343a40'; c.beginPath(); c.ellipse(0,-s*.3,s*.24,s*.13,0,0,7); c.fill();
  c.fillStyle='#ff6b6b'; for(const sx of [-1,1]){ c.beginPath(); c.arc(sx*s*.2,-s*.3,s*.07,0,7); c.fill(); }
  c.restore(); }
/* Une larve sous terre, à la craie */
function determinerLarve(c,x,y,s){ c.fillStyle='#e8a15b'; c.beginPath(); c.ellipse(x,y,s*.22,s*.34,.4,0,7); c.fill();
  c.strokeStyle='#ffe8cc'; c.lineWidth=4; for(const dy of [-.08,.06,.2]){ c.beginPath(); c.moveTo(x-s*.18,y+dy*s); c.lineTo(x+s*.2,y+dy*s-s*.08); c.stroke(); } }
/* Une case de test « ÷ d » */
function determinerTest(c,d,x,y,z=1){ if(z<=0) return; const w=190*z, h=110*z, col=DET_C[d];
  c.strokeStyle=col; c.lineWidth=8; c.beginPath(); c.roundRect(x-w/2,y-h/2,w,h,18); c.stroke();
  ecrire(c,'÷ '+d,x,y+4,76*z,col); }
function determinerCroix(c,x,y,r,coul=CRAIE.blanc){ c.strokeStyle=coul; c.lineWidth=10; c.lineCap='round'; c.beginPath(); c.moveTo(x-r,y-r); c.lineTo(x+r,y+r); c.moveTo(x+r,y-r); c.lineTo(x-r,y+r); c.stroke(); }
/* Une ligne de jetons écrits chacun à son instant : [[instant, texte, couleur], …], centrée en x */
function determinerLigne(c,T,toks,x,y,taille=70){
  c.font=`800 ${taille}px "Segoe UI"`; const esp=c.measureText(' ').width, L=toks.map(k=>c.measureText(k[1]).width);
  let gx=x-(L.reduce((a,b)=>a+b,0)+esp*(toks.length-1))/2;
  toks.forEach(([t,s,coul],k)=>{ if(T>=t) ecrire(c,s,gx+L[k]/2,y,taille*Math.max(1,Math.min(1.12,pop(T,t,.4))),coul||CRAIE.blanc); gx+=L[k]+esp; });
}

FILMS.determiner=function(outils){
  const {panneau}=outils;
  const DUR={'00-accroche':10.82,'01-cigales':11.49,'02-test':9.61,'02q-question':16.29,'02r-reponse':8.77,'03-question':7.05,'04-abonne':6.05};
  const clips=enchainer(.4,['00-accroche','01-cigales','02-test','02q-question','02r-reponse','03-question','04-abonne'],DUR,{'02q-question':3.3,'03-question':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,ci,te,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['04-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  const cig3d=determinerForet(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55,fond:'#1f3b2a',bois:0x6b4a2b});
  panneau.style.display='none';
  const css=document.createElement('style');
  css.textContent='#pause .ligne,#cq .ligne{display:block;} div#rebours{display:block;} #carte .choix{font-size:54px;margin:8px 44px;}'; document.head.append(css);

  /* Les instants */
  const tCertaines=mot('00-accroche','Certaines'), tCigales=mot('00-accroche','cigales'), tTerre=mot('00-accroche','terre'), t17a=mot('00-accroche','17'), tParie=mot('00-accroche','paries'), tPremierA=mot('00-accroche','premier');
  const c17=mot('01-cigales','17'), c13=mot('01-cigales','13'), cEt=mot('01-cigales','13',3), cPremiers=mot('01-cigales','premiers'), cPred=mot('01-cigales','prédateur');
  const cD=[2,3,4].map(d=>mot('01-cigales',String(d))), cRare=mot('01-cigales','rarement');
  const e100=mot('02-test','100'), eDiv=mot('02-test','divise'), eD=[2,3,5,7].map(d=>mot('02-test',String(d))), eRien=mot('02-test','rien'), eJuste=mot('02-test','juste'), ePremier=mot('02-test','premier');
  const qCombien=mot('03-question','combien'), qPremiers=mot('03-question','premiers'), q80=mot('03-question','80'), q100=mot('03-question','100'), qReponds=mot('03-question','Réponds');

  const X=v=>72+v*51, AXE=455;
  function dessiner(T){ const c=tab.c, W=tab.W; tab.effacer();
    if(T>=com){ /* le défi : les nombres de 80 à 100, la question, rien de la réponse */
      if(T>=qCombien) ecrire(c,'Combien de nombres premiers',W/2,90,64);
      determinerLigne(c,T,[[q80-.05,'entre'],[q80,'80',CRAIE.petit],[q80+.25,'et'],[q100,'100 ?',CRAIE.petit]],W/2,205,96);
      if(T>=q100) for(let n=80;n<=100;n++){ const k=n-80, x=110+(k%7)*140, y=335+Math.floor(k/7)*110, t0=q100+.1+k*.03;
        if(T>=t0) ecrire(c,String(n),x,y,66*Math.min(1.12,pop(T,t0)),CRAIE.blanc); }
      tab.maj(); return; }
    if(T>=te){ /* le test : ÷ 2, ÷ 3, ÷ 5, ÷ 7 ; rien ne tombe juste : premier */
      determinerLigne(c,T,[[mot('02-test','Mon'),'Mon test'],[mot('02-test','jusqu\'à'),'jusqu’à'],[e100,'100',CRAIE.petit]],W/2,85,70);
      if(T>=eDiv) ecrire(c,'je divise par :',W/2,200,58,CRAIE.grand);
      [2,3,5,7].forEach((d,k)=>{ const x=165+k*242; determinerTest(c,d,x,340,tz(T,eD[k]));
        if(T>=eRien+k*.15) determinerCroix(c,x,470,26*Math.max(1,pop(T,eRien+k*.15)),'#ced4da'); });
      if(T>=eJuste) ecrire(c,'rien ne tombe juste',W/2,545,58*Math.max(1,Math.min(1.1,pop(T,eJuste))),'#ced4da');
      if(T>=ePremier) ecrire(c,'PREMIER !',W/2,640,92*Math.max(1,Math.min(1.12,pop(T,ePremier))),CRAIE.ok);
      tab.maj(); return; }
    if(T>=ci){ /* la frise des années : le prédateur tous les 2, 3 ou 4 ans ; les cigales à 13 et 17 */
      c.strokeStyle=CRAIE.blanc; c.lineWidth=6; c.beginPath(); c.moveTo(X(0)-20,AXE); c.lineTo(X(18)+30,AXE); c.stroke();
      fleche(c,X(18),AXE,X(18)+40,AXE,CRAIE.blanc,6);
      for(let v=0;v<=18;v++){ c.lineWidth=4; c.beginPath(); c.moveTo(X(v),AXE-10); c.lineTo(X(v),AXE+10); c.stroke(); ecrire(c,String(v),X(v),AXE+42,34,'#adb5bd'); }
      ecrire(c,'ans',X(18)+8,AXE-40,34,'#adb5bd');
      if(T>=c17){ determinerCigale(c,X(17),AXE+140,104,tz(T,c17)); ecrire(c,'17',X(17),AXE+232,46*tz(T,c17),CRAIE.ok); }
      if(T>=c13){ determinerCigale(c,X(13),AXE+140,104,tz(T,c13)); ecrire(c,'13',X(13),AXE+232,46*tz(T,c13),CRAIE.ok); }
      if(T>=cEt) determinerLigne(c,T,[[cEt,'13 et 17',CRAIE.ok],[mot('01-cigales','sont'),'sont'],[cPremiers,'premiers',CRAIE.ok]],W/2,70,70);
      [2,3,4].forEach((d,k)=>{ if(T<cD[k]) return; const y=AXE-72-k*82, col=DET_C[d];
        ecrire(c,String(d),X(0),y,54*Math.max(1,pop(T,cD[k])),col);
        for(let v=d,j=0;v<=18;v+=d,j++){ const z=tz(T,cD[k]+.05+j*.05); if(!z) continue; c.fillStyle=col; c.beginPath(); c.arc(X(v),y,18*z,0,7); c.fill(); } });
      if(T>=cRare) for(const v of [13,17]){ c.strokeStyle=CRAIE.ok; c.lineWidth=6; c.setLineDash([16,12]); c.beginPath(); c.moveTo(X(v),AXE-24); c.lineTo(X(v),AXE-270); c.stroke(); c.setLineDash([]); }
      tab.maj(); return; }
    /* l'accroche : la cigale, la larve sous terre 17 ans, le pari */
    if(T>=tTerre){ c.fillStyle='#5c3b1e'; c.fillRect(0,330,W,250); c.fillStyle='#69db7c'; c.fillRect(0,322,W,14); determinerLarve(c,200,450,120); }
    if(T>=tCigales) determinerCigale(c,200,170,180,tz(T,tCigales));
    if(T>=t17a) ecrire(c,'17 ans',660,450,130*Math.max(1,pop(T,t17a)),CRAIE.petit);
    if(T>=tParie) ecrire(c,'TU PARIES ?',680,175,92*Math.max(1,Math.min(1.15,pop(T,tParie))),'#ff922b');
    if(T>=tPremierA) ecrire(c,'nombre premier ?',W/2,650,74*Math.max(1,Math.min(1.12,pop(T,tPremierA))),CRAIE.ok);
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-cigales'), a2=dit('02-test'), a3=dit('03-question'), qd=dit('02q-question'), rd=dit('02r-reponse');
  const finTitre=tCertaines-.08;
  const groupes=[
    groupe(acc+.1,finTitre,352,62,a0('Salut !'),a0('Moi, c’est Ti Margo.')),
    ...suiteDe(ci,60,58,[a0('Certaines cigales dorment'),a0('sous terre pendant 17 ans.')],[a0('Tu paries qu’elles ont choisi'),a0('un nombre premier ?')]),
    ...suiteDe(te,60,58,[a1('17 ans, ou 13 ans'),a1('selon les espèces.')],[a1('13 et 17 sont premiers.')],[a1('Un prédateur qui revient'),a1('tous les 2, 3 ou 4 ans'),a1('les croise rarement.')]),
    ...suiteDe(q,60,58,[a2('Mon test, pour les nombres'),a2('jusqu’à 100 :')],[a2('je divise par 2, 3, 5 et 7.')],[a2('Si rien ne tombe juste,'),a2('il est premier.')]),
    ...suiteDe(f,60,56,[a3('À toi : combien y a-t-il'),a3('de nombres premiers'),a3('entre 80 et 100 ?')],[a3('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('91 est-il premier ?')];
  const CH=[qd('A : oui.'),qd('B : non, 91 = 7 × 13.'),qd('C : non, 91 = 3 × 31.')];
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const rR=rd('Réponse B !'), r1=rd('91 ÷ 7 = 13.'), r2=rd('Le test par 7, tout le monde l’oublie.');
  /* Un choix s'écrit mot à mot : chaque mot à l'instant où il est dit */
  const motsChoix=CH.map(([,,txt,tm])=>({mots:txt.replace(/\.$/,'').split(' ').slice(2),tm:tm.slice(2)}));
  const choix=CH.map(([,,,tm])=>['',tm[0]-q,tm[2]-q]);
  const ecrireChoix=T=>choix.forEach((ch,i)=>{ const {mots,tm}=motsChoix[i];
    ch[0]=mots.map((w,k)=>`<span style="visibility:${T>=tm[k]||T>=r?'visible':'hidden'}">${w}</span>`).join(' '); });

  poserMiniature(outils,acc+1,'Cigales de 17 ans :<br>nombre premier ?'+PARI,
    `<svg width="300" height="210" viewBox="0 0 330 230"><rect x="6" y="6" width="318" height="218" rx="18" fill="#1f3b2a" stroke="#6b4a2b" stroke-width="12"/>
      <g transform="translate(110 118)"><ellipse cx="-30" cy="22" rx="24" ry="62" transform="rotate(-18)" fill="rgba(255,243,191,.4)" stroke="#ffa94d" stroke-width="5"/>
      <ellipse cx="30" cy="22" rx="24" ry="62" transform="rotate(18)" fill="rgba(255,243,191,.4)" stroke="#ffa94d" stroke-width="5"/>
      <ellipse cx="0" cy="12" rx="25" ry="50" fill="#495057" stroke="#ced4da" stroke-width="4"/><ellipse cx="0" cy="-40" rx="30" ry="16" fill="#343a40"/>
      <circle cx="-25" cy="-40" r="9" fill="#ff6b6b"/><circle cx="25" cy="-40" r="9" fill="#ff6b6b"/></g>
      <text x="245" y="138" font-family="Segoe UI" font-weight="800" font-size="82" fill="#ffd43b" text-anchor="middle">17</text></svg>`);
  return { clips,FIN,titre:'Premier ou pas ?',ceinture:2,finTitre,groupes,finClip:'04-abonne',
    cuts:[finTitre,ci,te,q,r,com,f],
    question:{ qc:'02q-question',rc:'02r-reponse',finR:com,cpt:fin('02q-question')+.1,bonne:1,tBon:rR[3][1]-r,
      phrase:phraseQ,pause:pauseQ,choix,
      tete:[[rR[3][0],'Réponse '],[rR[3][1],'B !']],reponse:[r1],suite:[r2] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T); ecrireChoix(T);
      /* les cigales chantent : leurs ailes vibrent */
      cig3d.forEach(({g:cg,ailes},k)=>{ const chante=Math.sin(T*.9+k*1.7)>-.2; ailes.forEach(([w,s])=>{ w.rotation.z=s*(.28+(chante?Math.sin(T*70+k)*.12:0)); }); });
      const dansQ=T>=q&&T<com, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      scene.x=-.72; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
      if(gros){ scene.x=-.55; cam.d=9.8; cam.y=1.9; }
      if(dansQ||dansF){ scene.x=-.1; cam.d=11.4; cam.y=3.55; }

      if(T<acc+1.5) g.salut(T-acc,1.5);
      else if(gros) g.ouvre();
      else if(T<ci){ T>=tParie?g.fier():g.montre(); }
      else if(T<te){ if(T>=cPred&&T<cRare) g.reflechit(); else if(T>=cRare||(T>=cEt&&T<cPred)) g.fier(); else g.montre(); }
      else if(T<q){ T>=ePremier?g.fier():g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<com){ T<rR[3][1]?g.ouvre():(T>=mot('02r-reponse','tout')?g.oups():g.pouce()); }
      else if(T<f){ T<qReponds?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
