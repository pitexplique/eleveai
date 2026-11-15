/* Série Volume 6e, ÉPISODE 04 : MON CHÂTEAU EN CUBES (ceinture blanche). Outils : 6e-commun.js et films/6e-volume.js.
   Le donjon : 18 cubes (3 × 3 × 2) ; la tour : 7 cubes. Il colle la tour contre le donjon, clac !
   Question : combien de cubes dans le château ? Coller, c'est additionner : 18 + 7 = 25 (C). Aucun cube ne disparaît.
   Oups, un cube tombe : il en reste 24. Commentaire : un pont de 9 cubes et deux tours de 6 ? */

/* Un drapeau planté au point écran (x, y) */
function drapeau(c,x,y,coul='#e03131',h=70){ c.strokeStyle='#f8f9fa'; c.lineWidth=5; c.beginPath(); c.moveTo(x,y); c.lineTo(x,y-h); c.stroke();
  c.fillStyle=coul; c.beginPath(); c.moveTo(x,y-h); c.lineTo(x+48,y-h+16); c.lineTo(x,y-h+32); c.closePath(); c.fill(); }
/* Le tube de colle (centre x, y) */
function tubeColle(c,x,y,u=1){ if(u<=0) return; c.save(); c.translate(x,y); c.scale(u,u);
  c.fillStyle='#f8f9fa'; c.strokeStyle='#495057'; c.lineWidth=5; c.beginPath(); c.roundRect(-55,-80,110,170,20); c.fill(); c.stroke();
  c.fillStyle='#ff922b'; c.beginPath(); c.moveTo(-28,-80); c.lineTo(28,-80); c.lineTo(10,-130); c.lineTo(-10,-130); c.closePath(); c.fill(); c.stroke();
  ecrire(c,'colle',0,10,40,'#1971c2'); c.restore(); }

FILMS.assemblage=function(outils){
  const DUR={'00-accroche':8.03,'01-coller':4.22,'02-question':12.42,'02b-reponse':9.31,'03-ouf':6.71,'04-commentaire':9.42,'05-abonne':6.05};
  const B=baseFilm(outils,DUR), {clips,A,dit,mot,marque,acc,hist:col,q,r,ouf,com,f,FIN,tab,W}=B;
  const m0=k=>marque('00-accroche',k), mr=k=>marque('02b-reponse',k), m3=k=>marque('03-ouf',k), m4=k=>marque('04-commentaire',k);

  const tLe=m0(6), tDonjon=m0(7), t18=m0(8), t18c=m0(9), tLa=m0(10), tTour=m0(11), t7=m0(12), t7c=m0(13);
  const tColle=mot('01-coller','colle'), tClac=mot('01-coller','Clac');
  const tC=mot('02b-reponse','C'), rColler=mot('02b-reponse','Coller'), rAdd=mot('02b-reponse','additionner'), r18=mr(5), rPlus=mr(6), r7=mr(7), r25=mr(8), r25c=mr(9),
    rAucun=mot('02b-reponse','Aucun'), rDisp=mot('02b-reponse','disparaît');
  const oTombe=mot('03-ouf','tombe'), o24=mot('03-ouf','24'), oVite=mot('03-ouf','Vite'), oColle=mot('03-ouf','colle');
  const cPont=mot('04-commentaire','pont'), c9=m4(7), cDeux=mot('04-commentaire','deux'), c6=m4(13), cCombien=mot('04-commentaire','Combien'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tLe-.08, finR=rColler-.08;

  const DON='#adb5bd', TOU='#ff922b';
  const e=62, o={e,ox:150,oy:640};
  const P=(x,y,z)=>cav([x,y,z],e,o.ox,o.oy);
  const DONJON=paveCubes(3,3,2), TOUR=[...Array(7).keys()].map(k=>[3,k,0]);
  /* la tour : à x = 6 au début (décalée de 3), collée contre le donjon après « Clac » ; v = 0 → 1 pendant le glissement */
  function chateau(c,T,{v=1,donjon=true,ntour=7,coulD=DON,coulT=TOU,tombe=0}={}){
    const pos=[...(donjon?DONJON:[]),...TOUR.slice(0,ntour)], decal={};
    TOUR.forEach(p=>decal[p.join(',')]=[3*(1-v),0,0]);
    if(tombe>0) decal['3,6,0']=[1.8*tombe,-6*lisse01(tombe),0];
    blocs(c,pos,o,{coul:(x,y,z)=>x===3?coulT:coulD,lw:4,decal});
    if(donjon){ const d=P(1.5,3,1); drapeau(c,d[0],d[1],'#1971c2'); }
    if(ntour===7&&tombe<=0){ const d=P(3.5+3*(1-v),7,.5); drapeau(c,d[0],d[1]); } }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : un pont de 9 cubes entre deux tours de 6 */
      const ee=58, oc=centrerBoite(0,11,0,6,0,1,ee,520,375), Q=(x,y,z)=>cav([x,y,z],ee,oc.ox,oc.oy), pos=[];
      if(T>=c9) for(let x=1;x<=9;x++) if(T>=c9+.06*(x-1)) pos.push([x,5,0]);
      if(T>=c6) for(let y=0;y<6;y++){ if(T>=c6+.07*y){ pos.push([0,y,0]); pos.push([10,y,0]); } }
      if(T>=cPont&&T<c9) polygone(c,[Q(1,5,0),Q(10,5,0),Q(10,6,0),Q(1,6,0)],null,CRAIE.gris,4);
      blocs(c,pos,oc,{coul:(x)=>x===0||x===10?TOU:DON,lw:4});
      if(T>=c9){ const a=Q(1,6,0), b=Q(10,6,0); cote(c,[a[0],a[1]-40],[b[0],b[1]-40],(T-c9)/.6); ecrire(c,'9 cubes',(a[0]+b[0])/2,a[1]-92,54,CRAIE.jaune); }
      if(T>=c6){ for(const x of [0,10]){ const a=Q(x+.5,0,0); ecrire(c,'6',a[0],a[1]+46,54*zoom(T,c6,.4),CRAIE.jaune); } }
      if(T>=cCombien){ const m=Q(5.5,2.2,0); ecrire(c,'?',m[0],m[1],170*zoom(T,cCombien,.6),CRAIE.jaune); }
      tab.maj(); return; }
    if(T<col){ /* le donjon (18), puis la tour (7), à part */
      if(T>=tDonjon-.05||T>=finTitre){ const n=Math.min(18,Math.floor(18*entre(T,tDonjon,t18c+.3))+1); blocs(c,DONJON.slice(0,n),o,{coul:DON,lw:4}); }
      if(T>=t18c+.3){ const d=P(1.5,3,1); drapeau(c,d[0],d[1],'#1971c2'); }
      if(T>=t18){ const p=P(1.5,3,1); prog(c,[[t18,'18'],[t18c,'18 cubes']],T,p[0]-60,p[1]-110,56,CRAIE.blanc); }
      if(T>=tTour){ const n=Math.min(7,Math.floor(7*entre(T,tTour,t7c+.2))+1); blocs(c,TOUR.slice(0,n),o,{coul:TOU,lw:4,decal:Object.fromEntries(TOUR.map(p=>[p.join(','),[3,0,0]]))}); }
      if(T>=t7c+.2){ const d=P(6.5,7,.5); drapeau(c,d[0],d[1]); }
      if(T>=t7){ const p=P(7,3.5,0); prog(c,[[t7,'7'],[t7c,'7 cubes']],T,p[0]+150,p[1],56,TOU); }
      tab.maj(); return; }
    if(T<q){ /* il colle la tour contre le donjon : clac ! */
      const v=lisse01(entre(T,tColle,tClac)); chateau(c,T,{v});
      const p=P(1.5,3,1); ecrire(c,'18 cubes',p[0]-60,p[1]-110,56,CRAIE.blanc);
      const p7=P(4+3*(1-v),3.5,0); ecrire(c,'7 cubes',p7[0]+150,p7[1],56,TOU);
      if(T>=tClac){ const s=P(3,2.5,0), u=zoom(T,tClac,.6); c.save(); c.translate(s[0],s[1]); c.fillStyle=CRAIE.jaune;
        c.beginPath(); for(let k=0;k<16;k++){ const a=k*Math.PI/8, rr=(k%2?28:62)*u; k?c.lineTo(rr*Math.cos(a),rr*Math.sin(a)):c.moveTo(rr,0); } c.closePath(); c.globalAlpha=.85; c.fill(); c.restore();
        ecrire(c,'Clac !',P(3,5,0)[0]+250,P(3,5,0)[1],70*u,CRAIE.jaune); }
      tab.maj(); return; }
    if(T<ouf){ /* la réponse : coller, c'est additionner : 18 + 7 = 25 ; aucun cube ne disparaît */
      chateau(c,T,{coulD:T>=r18?'#ced4da':DON,coulT:T>=r7?'#ffa94d':TOU});
      const X=790;
      if(T>=rAdd) ecrire(c,'coller = +',X,110,58*zoom(T,rAdd,.4),CRAIE.blanc);
      if(T>=r18) prog(c,[[r18,'18'],[rPlus,'18 +'],[r7,'18 + 7'],[r25,'18 + 7 = 25']],T,X,250,66,CRAIE.ok);
      if(T>=r25c) ecrire(c,'cubes',X,330,52,CRAIE.ok);
      if(T>=rDisp) coche(c,X-60,450,.55);
      tab.maj(); return; }
    /* ouf : un cube tombe, il en reste 24 ; vite, la colle ! */
    chateau(c,T,{tombe:entre(T,oTombe-.4,oTombe+.5)});
    if(T>=o24) ecrire(c,'24',820,150,96*zoom(T,o24,.5),CRAIE.jaune);
    if(T>=oColle) tubeColle(c,850,430,zoom(T,oColle,.5));
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-coller'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,62,a0('Je construis mon château'),a0('en cubes.')),
    ...suiteDe(col,60,62,[a0('Le donjon : 18 cubes.')],[a0('La tour : 7 cubes.')]),
    ...suiteDe(q,60,62,[a1('Je colle la tour'),a1('contre le donjon.')],[a1('Clac !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien de cubes'),qd('dans mon château ?')];
  const CH=choixMotAMot(qd,q,r,[['A','11'],['B','18'],['C','25']],outils.$);
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2);
  groupes.push(...suiteDe(ouf,60,62,[rd('Coller, c’est additionner :')],[rd('18 + 7, 25 cubes.')],[rd('Aucun cube ne disparaît !')]),
    ...suiteDe(com,60,62,[a3('Oups, un cube tombe…')],[a3('Il en reste 24.')],[a3('Vite, la colle !')]),
    ...suiteDe(f,60,58,[a4('À toi : je colle un pont de 9 cubes'),a4('et deux tours de 6 cubes chacune.')],[a4('Combien de cubes en tout ?')],[a4('Réponds en commentaire !')]));

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>
    ${[0,1,2].map(y=>[0,1,2].map(x=>`<rect x="${40+36*x}" y="${178-36*y}" width="36" height="36" fill="#adb5bd" stroke="#1b2a3a" stroke-width="3"/>`).join('')).join('')}
    ${[...Array(5).keys()].map(k=>`<rect x="148" y="${178-36*k}" width="36" height="36" fill="#ff922b" stroke="#1b2a3a" stroke-width="3"/>`).join('')}
    <text x="80" y="95" font-family="Segoe UI" font-weight="800" font-size="40" fill="#f8f9fa" text-anchor="middle">18</text>
    <text x="215" y="80" font-family="Segoe UI" font-weight="800" font-size="40" fill="#ff922b" text-anchor="middle">7</text>
    <text x="275" y="170" font-family="Segoe UI" font-weight="800" font-size="90" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'18 + 7 cubes :<br>combien ?'+PARI,mini);
  return { clips,FIN,titre:'Mon château en cubes',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,col,q,r,finR,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR,cpt:B.fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,choix:CH.choix,
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); CH.maj(T); dessiner(T);
      const dansQ=T>=q&&T<finR, dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});
      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.fier();
      else if(T<col) g.montre();
      else if(T<q){ T<tClac?g.montre():g.fier(); }
      else if(T<r) g.reflechit();
      else if(T<finR){ T<tC?g.ouvre():g.pouce(); }
      else if(T<ouf){ T<rAucun?g.montre():g.pouce(); }
      else if(T<com){ T<oVite?g.oups():g.montre(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }
      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
