/* Série Volume 6e, ÉPISODE 05 : LES GLAÇONS DE LA FÊTE (ceinture blanche). Outils : 6e-commun.js et films/6e-volume.js.
   Il faut 48 glaçons ; le bac fait 6 cases de long et 4 de large. Question : combien de bacs pleins ?
   Un bac : 6 × 4 = 24 glaçons ; 48 ÷ 24 = 2 bacs (C). 24, c'est ce que contient un bac, pas le nombre de bacs.
   2 bacs au congélateur, et il faut attendre. Commentaire : une boîte de dés 3 × 3 × 3, 20 déjà rangés ? */

const GLACE='#d0ebff', GLACE_T='#4dabf7', BAC='#339af0';
/* Un bac à glaçons 6 × 4 (o : {e, ox, oy}) : le plancher quadrillé ;
   cases = {'x,z': couleur} pour colorer des cases vides */
function bacGlacons(c,o,{cases={}}={}){
  const P=(x,y,z)=>cav([x,y,z],o.e,o.ox,o.oy);
  coffre(c,6,.7,4,o,cc=>{
    for(const [k,col] of Object.entries(cases)){ const [x,z]=k.split(',').map(Number); polygone(cc,[P(x,0,z),P(x+1,0,z),P(x+1,0,z+1),P(x,0,z+1)],col,null,0,.85); }
    cc.save(); cc.strokeStyle='#e7f5ff'; cc.lineWidth=3; cc.beginPath();
    for(let x=1;x<6;x++){ cc.moveTo(...P(x,0,0)); cc.lineTo(...P(x,0,4)); } for(let z=1;z<4;z++){ cc.moveTo(...P(0,0,z)); cc.lineTo(...P(6,0,z)); } cc.stroke(); cc.restore();
  },{bois:BAC,or:'#a5d8ff',couvercle:false}); }
/* Un dé (cube blanc, points noirs sur la face de devant et sur le dessus) */
function motifDe(c,Q){ c.fillStyle='#212529'; for(const [a,b,d] of [[.5,.5,0],[.5,1,.5]]){ const p=Q(a,b,d); c.beginPath(); c.arc(p[0],p[1],5,0,7); c.fill(); } }

FILMS.defi=function(outils){
  const DUR={'00-accroche':5.45,'01-bac':4.21,'02-question':11.3,'02b-reponse':14.78,'03-ouf':6.78,'04-commentaire':11.1,'05-abonne':6.05};
  const B=baseFilm(outils,DUR), {clips,A,dit,mot,marque,acc,hist:bac,q,r,ouf,com,f,FIN,tab,W}=B;
  const m0=k=>marque('00-accroche',k), m1=k=>marque('01-bac',k), mr=k=>marque('02b-reponse',k), m4=k=>marque('04-commentaire',k);

  const tIl=mot('00-accroche','Il'), t48=m0(6), t48g=m0(7), tCube=mot('00-accroche','cube');
  const tBac=mot('01-bac','bac'), t6=m1(5), tLong=mot('01-bac','long'), t4=m1(10), tLarge=mot('01-bac','large');
  const tC=mot('02b-reponse','C'), rUn=mr(2), r6=mr(4), rFois=mr(5), r4=mr(6), r24=mr(7), r24g=mr(8), r48=mr(9), rDiv=mr(10), r24b=mr(12), r2=mr(13), r2b=mr(14),
    r24c=mr(15), rContient=mot('02b-reponse','contient'), rBac1=mr(21), rPas=mot('02b-reponse','pas');
  const o2=mot('03-ouf','2'), oCongel=mot('03-ouf','congélateur'), oAttends=mot('03-ouf','j\'attends'), oDur=mot('03-ouf','dur');
  const cBoite=mot('04-commentaire','boîte'), cDes=mot('04-commentaire','dés'), c3a=m4(7), c3b=m4(9), c3c=m4(11), c20=m4(16), cCombien=mot('04-commentaire','Combien'), tRep=mot('04-commentaire','Réponds');
  const finTitre=tIl-.08, finR=rUn-.08;

  function glacon(c,x,y,ee,u=1){ if(u<=0) return; blocs(c,[[0,0,0]],{e:ee*u,ox:x-ee*u*.68,oy:y+ee*u*.68},{coul:GLACE,trait:GLACE_T,lw:4});
    c.fillStyle='rgba(255,255,255,.8)'; c.beginPath(); c.ellipse(x-ee*u*.4,y+ee*u*.05,ee*u*.08,ee*u*.18,.5,0,7); c.fill(); }
  /* un bac et ses glaçons : n glaçons, un par case, rangées de devant d'abord */
  function bacPlein(c,o,n,cases={}){ bacGlacons(c,o,{cases});
    if(n>0){ const pos=[]; for(let z=0;z<4;z++) for(let x=0;x<6;x++) pos.push([x,z]);
      const ord=pos.slice(0,n).sort((a,b)=>(b[1]-a[1])||(a[0]-b[0]));
      for(const [x,z] of ord){ const s=o.e*.78, d=(o.e-s)/2, p=cav([x,0,z],o.e,o.ox,o.oy); blocs(c,[[0,0,0]],{e:s,ox:p[0]+d,oy:p[1]-d*.3},{coul:GLACE,trait:GLACE_T,lw:3}); } } }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : une boîte de dés 3 × 3 × 3, 20 dés déjà rangés */
      const ee=96, oc=centrerBoite(0,3,0,3,0,3,ee,380,350), Q=(x,y,z)=>cav([x,y,z],ee,oc.ox,oc.oy);
      if(T>=cBoite) coffre(c,3,3,3,oc,cc=>{ if(T>=c20){ const pos=[...paveCubes(3,2,3),[0,2,2],[1,2,2]]; blocs(cc,pos,oc,{coul:'#f8f9fa',trait:'#495057',lw:3,motif:motifDe}); } },{bois:'#e8590c',or:'#ffd8a8',couvercle:false});
      if(T>=c3a){ const a=Q(0,0,0), b=Q(3,0,0); cote(c,[a[0],a[1]+38],[b[0],b[1]+38],(T-c3a)/.4); ecrire(c,'3',(a[0]+b[0])/2,a[1]+86,56,CRAIE.jaune); }
      if(T>=c3b){ const a=Q(3,0,0), b=Q(3,0,3); cote(c,[a[0]+38,a[1]+8],[b[0]+38,b[1]+8],(T-c3b)/.4); ecrire(c,'3',(a[0]+b[0])/2+84,(a[1]+b[1])/2+18,56,CRAIE.jaune); }
      if(T>=c3c){ const a=Q(0,0,0), b=Q(0,3,0); cote(c,[a[0]-38,a[1]],[b[0]-38,b[1]],(T-c3c)/.4); ecrire(c,'3',a[0]-84,(a[1]+b[1])/2,56,CRAIE.jaune); }
      if(T>=c20) ecrire(c,'20 dés',850,180,60*zoom(T,c20,.4),CRAIE.blanc);
      if(T>=cCombien) ecrire(c,'?',850,360,150*zoom(T,cCombien,.6),CRAIE.jaune);
      tab.maj(); return; }
    if(T<bac){ /* il faut 48 glaçons */
      if(T>=t48) prog(c,[[t48,'48'],[t48g,'48 glaçons']],T,W/2,170,96,CRAIE.blanc);
      if(T>=tCube) glacon(c,W/2,430,150,zoom(T,tCube,.4));
      tab.maj(); return; }
    if(T<q){ /* le bac : 6 cases de long, 4 de large */
      const o=centrerBoite(0,6,0,.7,0,4,100,W/2-20,400), P=(x,y,z)=>cav([x,y,z],100,o.ox,o.oy), cases={};
      if(T>=t6&&T<t4) for(let x=0;x<6;x++) if(T>=t6+.1*x) cases[x+',0']='#ffd43b';
      if(T>=t4) for(let z=0;z<4;z++) if(T>=t4+.12*z) cases['5,'+z]='#8ce99a';
      if(T>=tBac) bacGlacons(c,o,{cases});
      if(T>=t6){ const a=P(0,0,0), b=P(6,0,0); cote(c,[a[0],a[1]+40],[b[0],b[1]+40],(T-t6)/(tLong+.2-t6)); ecrire(c,'6',(a[0]+b[0])/2,a[1]+92,62,CRAIE.jaune); }
      if(T>=t4){ const a=P(6,0,0), b=P(6,0,4); cote(c,[a[0]+40,a[1]+10],[b[0]+40,b[1]+10],(T-t4)/(tLarge+.2-t4)); ecrire(c,'4',(a[0]+b[0])/2+90,(a[1]+b[1])/2+20,62,CRAIE.jaune); }
      tab.maj(); return; }
    if(T<ouf){ /* la réponse : un bac = 6 × 4 = 24 ; 48 ÷ 24 = 2 bacs */
      const e1=66, oa=centrerBoite(0,6,0,.7,0,4,e1,300,230), ob=centrerBoite(0,6,0,.7,0,4,e1,300,520);
      const n=Math.min(24,Math.floor(24*entre(T,r6,r24+.2))+(T>=r6?1:0));
      bacPlein(c,oa,n);
      const pa=cav([6,.35,2],e1,oa.ox,oa.oy);
      if(T>=r24) ecrire(c,'24',pa[0]+100,pa[1]+10,56*zoom(T,r24,.4),CRAIE.ok);
      if(T>=rDiv){ bacPlein(c,ob,T>=r2?24:0); const pb=cav([6,.35,2],e1,ob.ox,ob.oy); if(T>=r2) ecrire(c,'24',pb[0]+100,pb[1]+10,56*zoom(T,r2,.4),CRAIE.ok); }
      const X=830;
      if(T>=r6) prog(c,[[r6,'6'],[rFois,'6 ×'],[r4,'6 × 4'],[r24,'6 × 4 = 24']],T,X,90,60,CRAIE.ok);
      if(T>=r48) prog(c,[[r48,'48'],[rDiv,'48 ÷'],[r24b,'48 ÷ 24'],[r2,'48 ÷ 24 = 2']],T,X,200,58,CRAIE.jaune);
      if(T>=r2b) ecrire(c,'2 bacs',X,275,54*zoom(T,r2b,.4),CRAIE.jaune);
      if(T>=r24c) prog(c,[[r24c,'24'],[rBac1,'24 = 1 bac']],T,X,410,56,CRAIE.ok);
      if(T>=rPas){ ecrire(c,'24 bacs',X,510,56,CRAIE.faux); trait(c,[X-120,540],[X+120,480],(T-rPas)/.4,CRAIE.faux,9); }
      tab.maj(); return; }
    /* ouf : 2 bacs au congélateur… on attend */
    const fx=380, fy=90, fw=380, fh=560;
    if(T>=o2){ polygone(c,[[fx,fy],[fx+fw,fy],[fx+fw,fy+fh],[fx,fy+fh]],'#e9ecef','#adb5bd',8);
      polygone(c,[[fx+20,fy+20],[fx+fw-20,fy+20],[fx+fw-20,fy+fh-20],[fx+20,fy+fh-20]],'#d0ebff','#74c0fc',5);
      for(const k of [0,1]){ const u=lisse01(entre(T,o2+.25*k,o2+.25*k+.5)), y=fy+120+200*k;
        const oo=centrerBoite(0,6,0,.7,0,4,44,fx+fw/2+(1-u)*500,y); if(u>0) bacPlein(c,oo,24); } }
    if(T>=oAttends){ const cx=880, cy=300, R=90; c.fillStyle='#f8f9fa'; c.strokeStyle='#495057'; c.lineWidth=8; c.beginPath(); c.arc(cx,cy,R,0,7); c.fill(); c.stroke();
      const a=(T-oAttends)*5, b=(T-oAttends)*.5; c.strokeStyle='#212529'; c.lineCap='round';
      c.lineWidth=8; c.beginPath(); c.moveTo(cx,cy); c.lineTo(cx+60*Math.sin(a),cy-60*Math.cos(a)); c.stroke();
      c.lineWidth=11; c.beginPath(); c.moveTo(cx,cy); c.lineTo(cx+40*Math.sin(b),cy-40*Math.cos(b)); c.stroke(); }
    tab.maj();
  }

  const a0=dit('00-accroche'), a1=dit('01-bac'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,finTitre,330,62,a0('C’est la fête !')),
    ...suiteDe(bac,60,62,[a0('Il me faut 48 glaçons'),a0('en forme de cube.')]),
    ...suiteDe(q,60,62,[a1('Mon bac à glaçons fait'),a1('6 cases de long et 4 de large.')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien de bacs pleins'),qd('dois-je faire ?')];
  const CH=choixMotAMot(qd,q,r,[['A','24'],['B','10'],['C','2']],outils.$);
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2);
  groupes.push(...suiteDe(ouf,60,62,[rd('Un bac : 6 × 4,'),rd('24 glaçons.')],[rd('48 divisé par 24,'),rd('2 bacs.')],
      [rd('24, c’est ce que contient un bac,'),rd('pas le nombre de bacs !')]),
    ...suiteDe(com,60,62,[a3('2 bacs au congélateur…')],[a3('et maintenant, j’attends.')],[a3('Le plus dur,'),a3('c’est d’attendre !')]),
    ...suiteDe(f,60,58,[a4('À toi : une boîte de dés'),a4('fait 3 sur 3 sur 3.')],[a4('J’en ai déjà rangé 20.')],[a4('Combien en manque-t-il ?')],[a4('Réponds en commentaire !')]));

  const mini=`<svg width="330" height="250" viewBox="0 0 330 250"><rect x="6" y="6" width="318" height="238" rx="18" fill="#1f3b2c" stroke="#8a5a2b" stroke-width="12"/>
    <path d="M40 150 L190 150 L230 110 L80 110 Z" fill="#339af0" stroke="#a5d8ff" stroke-width="4"/>
    ${[0,1,2,3,4,5].map(x=>`<rect x="${52+23*x}" y="128" width="20" height="20" fill="#d0ebff" stroke="#4dabf7" stroke-width="2"/>`).join('')}
    <text x="135" y="80" font-family="Segoe UI" font-weight="800" font-size="52" fill="#f8f9fa" text-anchor="middle">48</text>
    <text x="135" y="215" font-family="Segoe UI" font-weight="800" font-size="40" fill="#ffd43b" text-anchor="middle">6 × 4</text>
    <text x="280" y="160" font-family="Segoe UI" font-weight="800" font-size="90" fill="#ffd43b" text-anchor="middle">?</text></svg>`;
  poserMiniature(outils,acc+1,'48 glaçons :<br>combien de bacs ?'+PARI,mini);
  return { clips,FIN,titre:'Les glaçons de la fête',ceinture:0,finTitre,groupes,finClip:'05-abonne',
    cuts:[finTitre,bac,q,r,finR,ouf,com,f],
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
      else if(T<bac) g.montre();
      else if(T<q) g.montre();
      else if(T<r) g.reflechit();
      else if(T<finR){ T<tC?g.ouvre():g.pouce(); }
      else if(T<ouf){ T<r24c?g.montre():g.reflechit(); }
      else if(T<com){ T<oAttends?g.fier():g.reflechit(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }
      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
