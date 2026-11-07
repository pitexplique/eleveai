/* Série Divisibilité 4e, épisode 01 : LES CAISSES DU QUAI (voix 4e-div-multiple-short).
   Ti Margo empile 42 caisses en piles de 6 : 7 piles, il n'en reste aucune, 6 × 7 = 42.
   42 est un multiple de 6, 6 est un diviseur de 42 : le grand est le multiple, le petit le diviseur.
   Avec 45 caisses, 3 restent : 45 n'est pas un multiple de 6.
   Outils communs (voixDe, enchainer, suiteDe, poserTableau, ecrire, pop, tz, gestes, poserMiniature, PARI,
   CRAIE) : films/divisibilite.js. Code couleur : le petit (le diviseur) jaune, le grand (le multiple) bleu. */

/* ---- Le quai : pavés, bord de quai, mer, bateau au loin, caisses empilées, bites d'amarrage ---- */
function multipleQuai(){
  const ciel=new THREE.Mesh(new THREE.PlaneGeometry(240,70),new THREE.MeshBasicMaterial({color:0xbfe6ff})); ciel.position.set(0,22,-30); scene3d.add(ciel);
  const mer=new THREE.Mesh(new THREE.PlaneGeometry(900,900),new THREE.MeshBasicMaterial({color:0x3d8fd1})); mer.rotation.x=-Math.PI/2; mer.position.y=-.35; scene3d.add(mer);
  const quai=new THREE.Mesh(new THREE.PlaneGeometry(80,40),new THREE.MeshBasicMaterial({color:0xc9bfae})); quai.rotation.x=-Math.PI/2; quai.position.set(0,-.02,14); scene3d.add(quai);
  /* les joints des pavés */
  for(let k=-3;k<=8;k++){ const j=new THREE.Mesh(new THREE.PlaneGeometry(80,.05),new THREE.MeshBasicMaterial({color:0xa99f8e})); j.rotation.x=-Math.PI/2; j.position.set(0,-.01,-5.4+k*1.6); scene3d.add(j); }
  piece(scene3d,new THREE.BoxGeometry(80,.3,.5),toon(0x8d8273),[0,.13,-6],null);
  /* le bateau au loin */
  const b=new THREE.Group(); b.position.set(3.4,0,-16); scene3d.add(b);
  piece(b,new RoundedBoxGeometry(5,1,1.6,3,.2),toon(0xd9480f),[0,.25,0],CONTOUR_FIN);
  piece(b,new RoundedBoxGeometry(1.8,1.1,1.2,3,.12),toon(0xffffff),[-.6,1.3,0],CONTOUR_FIN);
  piece(b,new THREE.CylinderGeometry(.18,.18,1,10),toon(0x343a40),[.6,1.6,0],null);
  /* les caisses du fond, en piles */
  const bois=[0xc0843f,0xb5763a,0xcf9455];
  for(const [x,n] of [[-6.4,3],[-5.4,2],[-4.4,1],[2.9,2],[3.85,3],[4.8,1],[-7.4,1],[5.75,2]])
    for(let k=0;k<n;k++){ const c=piece(scene3d,new RoundedBoxGeometry(.92,.92,.92,3,.06),toon(bois[(k+Math.abs(x))%3|0]),[x,.46+k*.94,-4.6],CONTOUR_FIN);
      c.rotation.y=((x*7+k*3)%5-2)*.04; }
  /* les bites d'amarrage */
  for(const x of [-3,3,-8.6,8.6]){ piece(scene3d,new THREE.CylinderGeometry(.26,.32,.7,14),toon(0x343a40),[x,.35,-5.5],CONTOUR_FIN);
    piece(scene3d,new THREE.CylinderGeometry(.36,.36,.12,14),toon(0x495057),[x,.74,-5.5],null); }
}

/* ---- Une caisse à la craie : bois, cadre, planche en diagonale ---- */
const MULT_BOIS='#c8925a', MULT_PLUS='#ff922b';
function multipleCaisse(c,x,y,s,coul=MULT_BOIS,z=1){ if(z<=0) return; s*=z; const h=s/2;
  c.fillStyle=coul; c.fillRect(x-h,y-h,s,s); c.strokeStyle='#5c3a1e'; c.lineWidth=Math.max(3,s*.08); c.strokeRect(x-h+2,y-h+2,s-4,s-4);
  c.beginPath(); c.moveTo(x-h+4,y+h-4); c.lineTo(x+h-4,y-h+4); c.stroke(); }
function multipleVide(c,x,y,s){ const h=s/2; c.strokeStyle=CRAIE.faux; c.lineWidth=5; c.setLineDash([12,9]); c.strokeRect(x-h+3,y-h+3,s-6,s-6); c.setLineDash([]); }
/* Une ligne de jetons écrits chacun à son instant : [[instant, texte, couleur], …], centrée en x */
function multipleLigne(c,T,toks,x,y,taille=70){
  c.font=`800 ${taille}px "Segoe UI"`; const esp=c.measureText(' ').width, L=toks.map(k=>c.measureText(k[1]).width);
  let gx=x-(L.reduce((a,b)=>a+b,0)+esp*(toks.length-1))/2;
  toks.forEach(([t,s,coul],k)=>{ if(T>=t) ecrire(c,s,gx+L[k]/2,y,taille*Math.max(1,Math.min(1.12,pop(T,t,.4))),coul||CRAIE.blanc); gx+=L[k]+esp; });
}
const multipleU=(T,t0,d=.45)=>{ const u=Math.max(0,Math.min(1,(T-t0)/d)); return u*u*(3-2*u); };

FILMS.multiple=function(outils){
  const {panneau}=outils;
  const DUR={'00-accroche':12.94,'01-caisses':11.26,'02-mots':12.4,'03-oups':12.03,'03q-question':18.45,'03r-reponse':6.17,'04-question':8.3,'05-abonne':6.05};
  const clips=enchainer(.4,['00-accroche','01-caisses','02-mots','03-oups','03q-question','03r-reponse','04-question','05-abonne'],DUR,{'03q-question':3.3,'04-question':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,ca,mo,ou,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  multipleQuai(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55,fond:'#22343f',bois:0x6b4a2b});
  panneau.style.display='none';
  const css=document.createElement('style');
  css.textContent='#pause .ligne,#cq .ligne{display:block;} #carte .choix{font-size:54px;margin:8px 44px;}'; document.head.append(css);

  /* Les instants */
  const tMultiple=mot('00-accroche','Multiple'), tOu=mot('00-accroche','ou'), tDiv=mot('00-accroche','diviseur'), tMelange=mot('00-accroche','mélange'), tParie=mot('00-accroche','paries');
  const t42=mot('01-caisses','42'), tCaisses=mot('01-caisses','caisses',2), tPiles=mot('01-caisses','piles'), tDe=mot('01-caisses','de'), t6a=mot('01-caisses','6');
  const tP=[1,2,3].map(k=>mot('01-caisses',String(k))), t7=mot('01-caisses','7'), tAucune=mot('01-caisses','aucune');
  const tFois=mot('01-caisses','fois'), t6f=mot('01-caisses','6',2), t7f=mot('01-caisses','égale'), t42f=mot('01-caisses','42',3);
  const m42=mot('02-mots','42'), mMult=mot('02-mots','multiple'), m6=mot('02-mots','6'), mDiv=mot('02-mots','diviseur'), mGrand=mot('02-mots','grand'), mPetit=mot('02-mots','petit');
  const o45=mot('03-oups','45'), oCaisses=mot('03-oups','caisses',2), o7=mot('03-oups','7'), o3=mot('03-oups','3'), oRestent=mot('03-oups','restent'), oOups=mot('03-oups','Oups');
  const oN=['45','n\'est','pas','un','multiple','de','6'].map((w,k)=>mot('03-oups',w,k===0?3:(k>=5?2:1)));
  const qA=mot('04-question','56'), qMult=mot('04-question','multiple'), qDe=mot('04-question','de'), q8=mot('04-question','8'), qReponds=mot('04-question','Réponds');

  /* 42 caisses en tas (toujours les mêmes) */
  const TAS=[]; { let s=11; const rnd=()=>(s=(s*16807)%2147483647)/2147483647;
    while(TAS.length<42){ const p=[110+rnd()*836,200+rnd()*370]; if(TAS.every(v=>Math.hypot(v[0]-p[0],v[1]-p[1])>58)) TAS.push(p); } }
  const TAS56=[]; { let s=23; const rnd=()=>(s=(s*16807)%2147483647)/2147483647;
    while(TAS56.length<56){ const p=[110+rnd()*836,215+rnd()*280]; if(TAS56.every(v=>Math.hypot(v[0]-p[0],v[1]-p[1])>44)) TAS56.push(p); } }
  const TAS45=[]; { let s=31; const rnd=()=>(s=(s*16807)%2147483647)/2147483647;
    while(TAS45.length<45){ const p=[110+rnd()*836,200+rnd()*370]; if(TAS45.every(v=>Math.hypot(v[0]-p[0],v[1]-p[1])>54)) TAS45.push(p); } }
  const S=52, BASE=600, XP=p=>110+p*100, YN=n=>BASE-S/2-n*S;   /* pile p, niveau n */

  function dessiner(T){ const c=tab.c, W=tab.W; tab.effacer();
    if(T>=com){ /* le défi : 56 caisses, la question, rien de la réponse */
      if(T>=qA){ ecrire(c,'56',W/2,110,130*Math.max(1,pop(T,qA)),CRAIE.grand);
        TAS56.forEach(([x,y],k)=>multipleCaisse(c,x,y,40,MULT_BOIS,tz(T,qA+k*.012))); }
      multipleLigne(c,T,[[qMult,'multiple',CRAIE.grand],[qDe,'de'],[q8,'8 ?',CRAIE.petit]],W/2,615,96);
      tab.maj(); return; }
    if(T>=ou){ /* 45 caisses : 7 piles de 6, et 3 qui restent */
      if(T<oN[0]) multipleLigne(c,T,[[o45,'45',CRAIE.grand],[oCaisses,'caisses']],W/2,80,70);
      else multipleLigne(c,T,[[oN[0],'45',CRAIE.grand],[oN[1],'n’est'],[oN[2],'pas'],[oN[3],'un'],[oN[4],'multiple',CRAIE.faux],[oN[5],'de'],[oN[6],'6',CRAIE.petit]],W/2,80,60);
      for(let k=0;k<42;k++){ const p=Math.floor(k/6), n=k%6, t0=o7+p*.1; if(T<t0) continue; multipleCaisse(c,XP(p),YN(n),S,MULT_BOIS,1); }
      if(T<o7&&T>=o45) TAS45.forEach(([x,y],k)=>multipleCaisse(c,x,y,44,MULT_BOIS,tz(T,o45+k*.01)));
      if(T>=o3){ for(let n=0;n<3;n++) multipleCaisse(c,XP(7),YN(n),S,MULT_PLUS,tz(T,o3+n*.12));
        for(let n=3;n<6;n++) multipleVide(c,XP(7),YN(n),S); }
      if(T>=oRestent) ecrire(c,'3 restent',XP(7)-40,YN(6)-6,52*Math.max(1,pop(T,oRestent)),CRAIE.faux);
      tab.maj(); return; }
    if(T>=mo){ /* le grand, le petit */
      const s=44, base=500, XG=300, XPe=830, z=t=>Math.max(1,Math.min(1.15,pop(T,t)));
      for(let p=0;p<7;p++) for(let n=0;n<6;n++) multipleCaisse(c,XG+(p-3)*56,base-s/2-n*s,s,MULT_BOIS);
      for(let n=0;n<6;n++) multipleCaisse(c,XPe,base-s/2-n*s,s,MULT_BOIS);
      if(T>=mMult) ecrire(c,'multiple',XG,80,66*z(mMult),CRAIE.grand);
      if(T>=mDiv) ecrire(c,'diviseur',XPe,80,66*z(mDiv),CRAIE.petit);
      if(T>=m42) ecrire(c,'42',XG,180,90*z(m42),CRAIE.grand);
      if(T>=m6) ecrire(c,'6',XPe,180,90*z(m6),CRAIE.petit);
      if(T>=mGrand) ecrire(c,'LE GRAND',XG,575,62*z(mGrand),CRAIE.grand);
      if(T>=mPetit) ecrire(c,'LE PETIT',XPe,575,62*z(mPetit),CRAIE.petit);
      tab.maj(); return; }
    if(T>=ca){ /* 42 caisses en tas, puis 7 piles de 6 */
      const haut=T<tFois?[[t42,'42',CRAIE.grand],[tCaisses,'caisses'],[tPiles,'en piles'],[tDe,'de'],[t6a,'6',CRAIE.petit]]
        :[[t6f,'6',CRAIE.petit],[mot('01-caisses','fois',2),'×'],[t7f,'7'],[mot('01-caisses','égale',2),'='],[t42f,'42',CRAIE.grand]];
      multipleLigne(c,T,haut,W/2-60,80,T<tFois?62:86);
      const depart=p=>p<3?tP[p]:t7+(p-3)*.12;
      for(let k=0;k<42;k++){ const p=Math.floor(k/6), n=k%6, u=multipleU(T,depart(p));
        if(T<t42) continue; const z=u>0?1:tz(T,t42+k*.012);
        multipleCaisse(c,TAS[k][0]+(XP(p)-TAS[k][0])*u,TAS[k][1]+(YN(n)-TAS[k][1])*u,S-(u<1?6*(1-u):0),MULT_BOIS,z); }
      ['1','2','3'].forEach((s,p)=>{ if(T>=tP[p]) ecrire(c,s,XP(p),YN(6)-6,50*Math.max(1,pop(T,tP[p])),CRAIE.petit); });
      if(T>=t7) ecrire(c,'7',XP(6),YN(6)-6,50*Math.max(1,pop(T,t7)),CRAIE.petit);
      if(T>=tAucune) ecrire(c,'aucune !',900,450,56*Math.max(1,Math.min(1.12,pop(T,tAucune))),CRAIE.ok);
      tab.maj(); return; }
    /* l'accroche : multiple ou diviseur, les deux mots se mélangent ; le pari */
    const u=multipleU(T,tMelange,.8), sw=Math.sin(u*Math.PI);
    if(T>=tMultiple) ecrire(c,'multiple',240+520*u,250-150*sw,84*Math.max(1,Math.min(1.15,pop(T,tMultiple))),CRAIE.grand);
    if(T>=tOu) ecrire(c,'ou',500,250,64);
    if(T>=tDiv){ ecrire(c,'diviseur',760-520*u,250+150*sw,84*Math.max(1,Math.min(1.15,pop(T,tDiv))),CRAIE.petit); ecrire(c,'?',985,250,84); }
    if(T>=tParie) ecrire(c,'TU PARIES ?',W/2,560,130*Math.max(1,pop(T,tParie)),'#ff922b');
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-caisses'), a2=dit('02-mots'), a3=dit('03-oups'), a4=dit('04-question'), qd=dit('03q-question'), rd=dit('03r-reponse');
  const finTitre=tMultiple-.08;
  const groupes=[
    groupe(acc+.1,finTitre,352,62,a0('Salut !'),a0('Moi, c’est Ti Margo.')),
    ...suiteDe(ca,60,58,[a0('Multiple ou diviseur ?'),a0('Tout le monde les mélange.')],[a0('Tu paries que tu ne te tromperas'),a0('plus jamais, après ce film ?')]),
    ...suiteDe(mo,60,58,[a1('J’empile 42 caisses en piles de 6.')],[a1('1, 2, 3… 7 piles,'),a1('et il n’en reste aucune.')],[a1('6 × 7 = 42.')]),
    ...suiteDe(ou,60,58,[a2('Alors 42 est un multiple de 6.')],[a2('Et 6 est un diviseur de 42.')],[a2('Le grand, c’est le multiple.'),a2('Le petit, c’est le diviseur.')]),
    ...suiteDe(q,60,58,[a3('Maintenant, 45 caisses.'),a3('Piles de 6 : 7 piles…')],[a3('et 3 caisses qui restent.')],[a3('Oups !'),a3('45 n’est pas un multiple de 6.')]),
    ...suiteDe(f,60,56,[a4('À toi : 56 est-il'),a4('un multiple de 8 ?')],[a4('Écris ton calcul.'),a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('8 × 4 = 32.'),qd('Que peut-on dire ?')];
  const CH=[qd('A : 32 est un diviseur de 8.'),qd('B : 8 est un diviseur de 32.'),qd('C : 8 est un multiple de 32.')];
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const rR=rd('Réponse B :'), r1=rd('8 est un diviseur de 32 !'), r2=rd('Le petit divise le grand.');
  /* Un choix s'écrit mot à mot : chaque mot à l'instant où il est dit */
  const motsChoix=CH.map(([,,txt,tm])=>({mots:txt.replace(/\.$/,'').split(' ').slice(2),tm:tm.slice(2)}));
  const choix=CH.map(([,,,tm],i)=>['',tm[0]-q,tm[2]-q]);
  const ecrireChoix=T=>choix.forEach((ch,i)=>{ const {mots,tm}=motsChoix[i];
    ch[0]=mots.map((w,k)=>`<span style="visibility:${T>=tm[k]||T>=r?'visible':'hidden'}">${w}</span>`).join(' '); });

  poserMiniature(outils,acc+1,'Multiple<br>ou diviseur ?'+PARI,
    `<svg width="290" height="202" viewBox="0 0 330 230"><rect x="6" y="6" width="318" height="218" rx="18" fill="#22343f" stroke="#6b4a2b" stroke-width="12"/>${
      Array.from({length:42},(_,k)=>{ const x=32+Math.floor(k/6)*40, y=180-(k%6)*26; return `<rect x="${x}" y="${y}" width="24" height="24" fill="#c8925a" stroke="#5c3a1e" stroke-width="3"/>`; }).join('')}</svg>`);
  return { clips,FIN,titre:'Multiple ou diviseur ?',ceinture:1,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,ca,mo,ou,q,r,com,f],
    question:{ qc:'03q-question',rc:'03r-reponse',finR:com,cpt:fin('03q-question')+.1,bonne:1,tBon:rR[3][1]-r,
      phrase:phraseQ,pause:pauseQ,choix,
      tete:[[rR[3][0],'Réponse '],[rR[3][1],'B :']],reponse:[r1],suite:[r2] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T); ecrireChoix(T);
      const dansQ=T>=q&&T<com, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      scene.x=-.72; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
      if(gros){ scene.x=-.55; cam.d=9.8; cam.y=1.9; }
      if(dansQ||dansF){ scene.x=-.1; cam.d=11.4; cam.y=3.55; }

      if(T<acc+1.5) g.salut(T-acc,1.5);
      else if(gros) g.ouvre();
      else if(T<ca){ if(T>=tMelange&&T<tParie) g.oups(); else if(T>=tParie) g.fier(); else g.montre(); }
      else if(T<mo){ if(T>=tAucune&&T<tFois) g.fier(); else if(T>=tP[0]&&T<t7+.8) g.reflechit(); else g.montre(); }
      else if(T<ou){ T>=mGrand?g.fier():g.montre(); }
      else if(T<q){ if(T>=oOups&&T<oN[0]) g.oups(); else if(T>=oRestent-.2&&T<oOups) g.reflechit(); else g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<com){ T<rR[3][1]?g.ouvre():g.pouce(); }
      else if(T<f){ T<qReponds?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
