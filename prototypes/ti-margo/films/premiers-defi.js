/* Série Nombres premiers 4e, épisode 11 : LE PLATEAU DE QUIZ (voix 4e-premier-defi-short).
   Sur le plateau d'un jeu télévisé, Ti Margo parie qu'il compte les diviseurs de 60 sans les écrire.
   60 = 2 × 2 × 3 × 5 ; un diviseur, c'est un choix : 0, 1 ou 2 fois le 2 (3 choix), 0 ou 1 fois le 3
   (2 choix), 0 ou 1 fois le 5 (2 choix) ; 3 × 2 × 2 = 12. L'écran du jeu prépare 12 cases vides,
   la vérification les remplit : 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60. Gagné.
   Outils communs (voixDe, enchainer, suiteDe, poserTableau, ecrire, pop, tz, gestes, poserMiniature, PARI,
   CRAIE) : films/premiers.js. Couleurs des facteurs : 2 bleu ciel, 3 orange, 5 violet (comme la paysage). */

const DEFI_C={2:'#74c0fc',3:'#ffa94d',5:'#d0bfff'};

/* ---- Le plateau : sol sombre et brillant, mur violet, rampe d'ampoules autour de l'écran,
   deux pupitres de candidats avec leur buzzer, projecteurs ---- */
function defiPlateau(tab){
  const mur=new THREE.Mesh(new THREE.PlaneGeometry(240,70),new THREE.MeshBasicMaterial({color:0x2b1a5e})); mur.position.set(0,22,-14); scene3d.add(mur);
  const sol=new THREE.Mesh(new THREE.PlaneGeometry(900,900),new THREE.MeshBasicMaterial({color:0x16183d})); sol.rotation.x=-Math.PI/2; sol.position.y=-.02; scene3d.add(sol);
  /* le rond de scène sous Ti Margo, et les lignes lumineuses du sol */
  const rond=new THREE.Mesh(new THREE.CircleGeometry(2.1,48),new THREE.MeshBasicMaterial({color:0x4c2fa8})); rond.rotation.x=-Math.PI/2; rond.position.set(-.4,-.005,.3); scene3d.add(rond);
  const anneau=new THREE.Mesh(new THREE.RingGeometry(2.1,2.22,48),new THREE.MeshBasicMaterial({color:0xffd43b})); anneau.rotation.x=-Math.PI/2; anneau.position.set(-.4,-.004,.3); scene3d.add(anneau);
  for(const a of [-.9,-.45,.45,.9]){ const l=new THREE.Mesh(new THREE.PlaneGeometry(.07,30),new THREE.MeshBasicMaterial({color:0xcc5de8})); l.rotation.x=-Math.PI/2; l.rotation.z=a; l.position.set(0,-.01,-2); scene3d.add(l); }
  /* le décor du fond : des panneaux lumineux « ? » */
  for(const [x,y,c] of [[-7.2,4.2,0xe8590c],[7.2,4.2,0x1c7ed6],[-9.8,6.2,0x12b886],[9.8,6.2,0xf06595]]){
    const p=new THREE.Group(); p.position.set(x,y,-11); scene3d.add(p);
    piece(p,new RoundedBoxGeometry(2.2,2.2,.2,3,.2),toon(c),[0,0,0],CONTOUR_FIN);
    const cv=document.createElement('canvas'); cv.width=cv.height=256; const k=cv.getContext('2d');
    k.fillStyle='#fff'; k.font='900 210px "Segoe UI"'; k.textAlign='center'; k.textBaseline='middle'; k.fillText('?',128,140);
    const tx=new THREE.CanvasTexture(cv); tx.colorSpace=THREE.SRGBColorSpace;
    const f=new THREE.Mesh(new THREE.PlaneGeometry(1.8,1.8),new THREE.MeshBasicMaterial({map:tx,transparent:true})); f.position.z=.11; p.add(f); }
  /* les deux pupitres des candidats, chacun son buzzer */
  for(const [x,c] of [[-4.7,0xe8590c],[4.7,0x1c7ed6]]){ const p=new THREE.Group(); p.position.set(x,0,-3.2); p.rotation.y=-Math.sign(x)*.35; scene3d.add(p);
    piece(p,new RoundedBoxGeometry(1.5,1.25,.9,3,.08),toon(0x2b2f5c),[0,.62,0],CONTOUR_FIN);
    piece(p,new RoundedBoxGeometry(1.52,.22,.92,2,.05),toon(c),[0,.95,0],CONTOUR_FIN);
    piece(p,new THREE.CylinderGeometry(.24,.28,.14,20),toon(0x343a40),[0,1.32,0],null);
    piece(p,new THREE.SphereGeometry(.2,20,12,0,Math.PI*2,0,Math.PI/2),toon(0xfa5252),[0,1.38,0],CONTOUR_FIN); }
  /* les projecteurs : des cônes de lumière très pâles */
  for(const [x,z] of [[-3.2,-1],[3.2,-1]]){ const cone=new THREE.Mesh(new THREE.ConeGeometry(1.6,9,28,1,true),
      new THREE.MeshBasicMaterial({color:0xfff3bf,transparent:true,opacity:.07,depthWrite:false,side:THREE.DoubleSide}));
    cone.position.set(x,4.5,z); cone.rotation.z=Math.sign(x)*.32; scene3d.add(cone); }
  /* la rampe d'ampoules autour de l'écran (dans le groupe de l'écran : elle disparaît avec lui) */
  const amp=[], L=4.4+.5, H=3+.5;
  const pts=[]; for(let k=0;k<=15;k++) pts.push([-L/2+k*L/15,H/2],[-L/2+k*L/15,-H/2]); for(let k=1;k<11;k++) pts.push([-L/2,-H/2+k*H/11],[L/2,-H/2+k*H/11]);
  pts.forEach(([x,y],k)=>{ const m=new THREE.MeshBasicMaterial({color:0xffe066}); const b=new THREE.Mesh(new THREE.SphereGeometry(.075,10,8),m); b.position.set(x,y,-.02); tab.g.add(b); amp.push([m,k]); });
  return amp;
}

/* Un jeton rond de facteur, à la craie : le disque sombre, le bord coloré, le chiffre */
function defiJeton(c,n,x,y,r,z=1){ if(z<=0) return; r*=z; c.fillStyle='#0f1033'; c.beginPath(); c.arc(x,y,r,0,7); c.fill();
  c.strokeStyle=DEFI_C[n]; c.lineWidth=Math.max(4,r*.16); c.beginPath(); c.arc(x,y,r,0,7); c.stroke(); ecrire(c,String(n),x,y+r*.06,r*1.25,DEFI_C[n]); }
/* Une boîte de choix : k jetons du facteur n (aucun : un tiret gris) */
function defiBoite(c,n,k,x,y,w,h,z=1,allume=false){ if(z<=0) return; const s=Math.min(1,z);
  c.save(); c.translate(x,y); c.scale(s,s); c.fillStyle=allume?'#1f4d2e':'#0f1033'; c.fillRect(-w/2,-h/2,w,h);
  c.strokeStyle=allume?CRAIE.ok:DEFI_C[n]; c.lineWidth=6; c.strokeRect(-w/2,-h/2,w,h);
  if(k===0){ c.strokeStyle='#868e96'; c.lineWidth=7; c.beginPath(); c.moveTo(-18,0); c.lineTo(18,0); c.stroke(); }
  else for(let i=0;i<k;i++) defiJeton(c,n,(i-(k-1)/2)*58,0,24);
  c.restore(); }
/* Une case du quiz : un rectangle arrondi, vide (« ? ») ou retourné avec son nombre */
function defiCase(c,x,y,w,h,txt,z){ c.fillStyle=z>0?'#2f9e44':'#251f63'; c.strokeStyle=z>0?CRAIE.ok:'#9775fa'; c.lineWidth=6;
  c.beginPath(); c.roundRect(x-w/2,y-h/2,w,h,16); c.fill(); c.stroke();
  if(z>0) ecrire(c,txt,x,y+3,72*Math.min(1.15,z),'#ffffff'); else ecrire(c,'?',x,y+3,60,'#9775fa'); }
/* Une ligne de jetons écrits chacun à son instant : [[instant, texte, couleur], …], centrée en x */
function defiLigne(c,T,toks,x,y,taille=70){
  c.font=`800 ${taille}px "Segoe UI"`; const esp=c.measureText(' ').width, L=toks.map(k=>c.measureText(k[1]).width);
  let gx=x-(L.reduce((a,b)=>a+b,0)+esp*(toks.length-1))/2;
  toks.forEach(([t,s,coul],k)=>{ if(T>=t) ecrire(c,s,gx+L[k]/2,y,taille*Math.max(1,Math.min(1.12,pop(T,t,.4))),coul||CRAIE.blanc); gx+=L[k]+esp; });
}

FILMS.defi=function(outils){
  const {panneau}=outils;
  const DUR={'00-accroche':10.36,'01-casse':5.25,'02-choix':14.23,'03-verif':11.89,'03q-question':12.17,'03r-reponse':7.49,'04-question':5.44,'05-abonne':6.05};
  const clips=enchainer(.4,['00-accroche','01-casse','02-choix','03-verif','03q-question','03r-reponse','04-question','05-abonne'],DUR,{'03q-question':3.3,'04-question':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,ca,ch,ve,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];
  const CL=(window.CUES||{})[VIDEO]||{}, at=(clip,k)=>A[clip]+CL[clip][k][0];   /* l'instant du k-ième mot du clip */

  const tab=poserTableau({L:4.4,H:3,x:0,y:4.55,fond:'#1a1446',bois:0x7048e8});
  const ampoules=defiPlateau(tab);
  panneau.style.display='none';
  const css=document.createElement('style'); css.textContent='#pause .ligne,#cq .ligne{display:block;}'; document.head.append(css);

  /* Les instants */
  const tSalut=mot('00-accroche','Salut'), t60=mot('00-accroche','60'), tDiv=mot('00-accroche','diviseurs'), tParie=mot('00-accroche','paries'), tEcrire=mot('00-accroche','écrire');
  const finTitre=t60-.08;
  /* 01 : 60 = 2 × 2 × 3 × 5 (le « fois » est le second mot de chaque paire « 2 fois ») */
  const c60=mot('01-casse','60'), cTok=[4,5,6,7,8,9,10].map(k=>at('01-casse',k));
  /* 02 : les choix */
  const hZ=[5,6,8].map(k=>at('02-choix',k)), h3c=at('02-choix',10);          /* zéro, un, deux (le 2) ; 3 choix */
  const tZ3=[12,14].map(k=>at('02-choix',k)), t2c3=at('02-choix',16);          /* zéro, un (le 3) ; 2 choix */
  const tZ5=[18,20].map(k=>at('02-choix',k)), t2c5=at('02-choix',22);          /* zéro, un (le 5) ; 2 choix */
  const tF=[24,25,26,27,28,29,30].map(k=>at('02-choix',k));                    /* 3 × 2 × 2 = 12 */
  const tChoix=mot('02-choix','choix');
  /* 03 : la vérification */
  const LISTE=[1,2,3,4,5,6,10,12,15,20,30,60], tL=LISTE.map(n=>mot('03-verif',String(n))), tDouze=mot('03-verif','Douze'), tGagne=mot('03-verif','Gagné');
  const tVerif=mot('03-verif','vérifie');
  /* 04 : le défi */
  const tCombien=mot('04-question','combien'), t100=mot('04-question','100'), tReponds=mot('04-question','Réponds');

  const RY=[175,300,425];   /* les lignes des trois facteurs */
  function dessiner(T){ const c=tab.c, W=tab.W; tab.effacer();
    if(T>=com){ /* le défi : 100, la question, rien de la réponse */
      if(T>=tCombien) ecrire(c,'Combien de diviseurs',W/2,120,76,CRAIE.blanc);
      if(T>=t100){ const z=Math.max(1,pop(T,t100)); ecrire(c,'a 100 ?',W/2,330,190*z,CRAIE.petit); }
      if(T>=t100) for(let k=0;k<5;k++) ecrire(c,'?',150+k*190,540,90*Math.max(1,Math.min(1.2,pop(T,t100+.2+k*.1))),['#ff922b','#74c0fc','#8ce99a','#faa2c1','#d0bfff'][k]);
      tab.maj(); return; }
    if(T>=ve){ /* 12 cases, préparées vides, retournées une à une */
      if(T>=tVerif) ecrire(c,'Je vérifie :',W/2,78,64,CRAIE.grand);
      LISTE.forEach((n,k)=>{ const x=W/2+((k%6)-2.5)*165, y=k<6?200:355; defiCase(c,x,y,145,130,String(n),T>=tL[k]?pop(T,tL[k],.4)||1:0); });
      if(T>=tDouze){ const z=Math.max(1,pop(T,tDouze)); ecrire(c,'12 !',W/2-210,525,112*z,CRAIE.ok); }
      if(T>=tGagne){ const z=Math.max(1,pop(T,tGagne)); ecrire(c,'GAGNÉ !',W/2+180,525,100*z,'#ffd43b'); }
      tab.maj(); return; }
    if(T>=ch){ /* les choix : une ligne par facteur, une boîte par nombre de fois */
      defiLigne(c,T,[[0,'60'],[0,'='],[0,'2',DEFI_C[2]],[0,'×'],[0,'2',DEFI_C[2]],[0,'×'],[0,'3',DEFI_C[3]],[0,'×'],[0,'5',DEFI_C[5]]],W/2,68,58);
      const ligne=(n,kmax,tz0,tLab,y,lab)=>{ defiJeton(c,n,90,y,40,1);
        for(let k=0;k<=kmax;k++) if(T>=tz0[k]) defiBoite(c,n,k,250+k*175,y,150,96,pop(T,tz0[k],.4)||1,T>=tLab);
        for(let k=0;k<=kmax;k++) if(T>=tz0[k]) ecrire(c,String(k),250+k*175,y+66,36,'#adb5bd');
        if(T>=tLab){ const z=Math.max(1,Math.min(1.15,pop(T,tLab,.4))); ecrire(c,lab,890,y,62*z,CRAIE.petit); } };
      ligne(2,2,hZ,h3c,RY[0],'3 choix'); ligne(3,1,tZ3,t2c3,RY[1],'2 choix'); ligne(5,1,tZ5,t2c5,RY[2],'2 choix');
      /* 3 × 2 × 2 = 12 : chaque « choix » s'entoure quand son nombre est dit */
      [[tF[0],0],[tF[2],1],[tF[4],2]].forEach(([t,k])=>{ if(T>=t){ c.strokeStyle=CRAIE.petit; c.lineWidth=5; c.strokeRect(765,RY[k]-44,250,88); } });
      defiLigne(c,T,[[tF[0],'3',CRAIE.petit],[tF[1],'×'],[tF[2],'2',CRAIE.petit],[tF[3],'×'],[tF[4],'2',CRAIE.petit],[tF[5],'='],[tF[6],'12',CRAIE.ok]],W/2,548,84);
      if(T<hZ[0]&&T>=tChoix) ecrire(c,'diviseur = choix',W/2+70,300,84*Math.max(1,Math.min(1.12,pop(T,tChoix,.4))),CRAIE.petit);
      tab.maj(); return; }
    if(T>=ca){ /* je casse 60 */
      if(T>=c60) ecrire(c,'60',W/2,200,170*Math.max(1,Math.min(1.15,pop(T,c60))),CRAIE.blanc);
      const X=[200,290,380,470,560,650,740,830], S=['2','×','2','×','3','×','5'];
      if(T>=cTok[0]) ecrire(c,'=',110,470,96);
      S.forEach((s,k)=>{ const t=cTok[k]; if(T<t) return; const z=Math.max(1,Math.min(1.2,pop(T,t)));
        if(s==='×') ecrire(c,s,X[k]+40,470,80); else defiJeton(c,+s,X[k]+40,470,52,z); });
      if(T>=cTok[0]){ c.strokeStyle='#9775fa'; c.lineWidth=6; c.setLineDash([16,12]); c.beginPath(); c.moveTo(W/2,290); c.lineTo(W/2,390); c.stroke(); c.setLineDash([]); }
      tab.maj(); return; }
    /* l'accroche : 60, des « ? » partout, le pari */
    if(T>=t60) ecrire(c,'60',W/2,260,240*Math.max(1,pop(T,t60)),CRAIE.petit);
    if(T>=tDiv) [[180,140],[880,150],[150,420],[905,430],[320,560],[740,560]].forEach(([x,y],k)=>ecrire(c,'?',x,y,90*Math.max(1,Math.min(1.25,pop(T,tDiv+k*.08))),'#9775fa'));
    if(T>=tParie) ecrire(c,'TU PARIES ?',W/2,560,120*Math.max(1,pop(T,tParie)),'#ff922b');
    if(T>=tEcrire) ecrire(c,'sans liste !',W/2,425,76*Math.max(1,Math.min(1.15,pop(T,tEcrire,.4))),CRAIE.faux);
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-casse'), a2=dit('02-choix'), a3=dit('03-verif'), a4=dit('04-question'), qd=dit('03q-question'), rd=dit('03r-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,352,62,a0('Salut !'),a0('Moi, c’est Ti Margo.')),
    ...suiteDe(ca,60,58,[a0('60 a beaucoup de diviseurs.')],[a0('Tu paries que je les compte'),a0('sans en écrire un seul ?')]),
    ...suiteDe(ch,60,58,[a1('D’abord, je casse 60 :'),a1('2 × 2 × 3 × 5.')]),
    ...suiteDe(ve,60,58,[a2('Un diviseur, c’est un choix.')],[a2('Zéro, un ou deux 2 : 3 choix.')],[a2('Zéro ou un 3 : 2 choix.'),a2('Zéro ou un 5 : 2 choix.')],[a2('3 × 2 × 2 = 12.')]),
    ...suiteDe(q,60,58,[a3('Je vérifie :'),a3('1, 2, 3, 4, 5, 6,'),a3('10, 12, 15, 20, 30, 60.')],[a3('Douze ! Gagné.')]),
    ...suiteDe(f,60,56,[a4('À toi : combien de diviseurs'),a4('a 100 ?'),a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('18 = 2 × 3 × 3.'),qd('Combien a-t-il de diviseurs ?')];
  const tq=(m,n=1)=>mot('03q-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const rR=rd('Réponse C : 6.'), r1=rd('2 choix pour le 2,'), r2=rd('3 choix pour le 3.'), r3=rd('2 × 3 = 6.');

  poserMiniature(outils,acc+1,'Les diviseurs de 60,<br>sans les écrire'+PARI,
    `<svg width="272" height="173" viewBox="0 0 330 210"><rect x="6" y="6" width="318" height="198" rx="18" fill="#1a1446" stroke="#7048e8" stroke-width="12"/>${
      Array.from({length:12},(_,k)=>{ const x=30+(k%4)*72, y=26+Math.floor(k/4)*58; return `<rect x="${x}" y="${y}" width="60" height="48" rx="9" fill="#251f63" stroke="#9775fa" stroke-width="4"/><text x="${x+30}" y="${y+36}" font-family="Segoe UI" font-weight="800" font-size="34" fill="#9775fa" text-anchor="middle">?</text>`; }).join('')}</svg>`);
  return { clips,FIN,titre:'Compter les diviseurs',ceinture:3,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,ca,ch,ve,q,r,com,f],
    question:{ qc:'03q-question',rc:'03r-reponse',finR:com,cpt:fin('03q-question')+.1,bonne:2,tBon:rR[3][1]-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['3',tq('A'),tq('3',4)],['5',tq('B'),tq('5')],['6',tq('C'),tq('6')]],
      tete:[[rR[3][0],'Réponse '],[rR[3][1],'C : 6.']],reponse:[r1,r2],suite:[r3] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<com, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      /* la rampe d'ampoules clignote ; elle s'emballe à « Gagné » */
      const vite=T>=tGagne&&T<q?9:2.2;
      ampoules.forEach(([m,k])=>m.color.setHex(Math.sin(T*vite+k*.9)>0?0xffe066:0xfff9db));
      scene.x=-.72; cam.e=0; cam.d=11; cam.y=3.42; cam.x=0;
      if(gros){ scene.x=-.55; cam.d=9.8; cam.y=1.9; }
      if(dansQ||dansF){ scene.x=-.1; cam.d=11.4; cam.y=3.55; }

      if(T<acc+1.5) g.salut(T-acc,1.5);
      else if(gros) g.ouvre();
      else if(T<ca){ T<tParie?g.montre():g.fier(); }
      else if(T<ch){ T<cTok[0]?g.reflechit():g.montre(); }
      else if(T<ve){ if(T>=tF[0]) g.fier(); else if(T<hZ[0]) g.reflechit(); else g.montre(); }
      else if(T<q){ if(T>=tGagne) g.fier(); else if(T>=tDouze) g.pouce(); else g.montre(); }
      else if(T<r) g.reflechit();
      else if(T<com){ T<rR[3][1]?g.ouvre():g.pouce(); }
      else if(T<f){ T<tReponds?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
