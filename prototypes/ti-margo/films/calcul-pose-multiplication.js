/* ============================================================
   ÉPISODE 03 : LE ZÉRO OUBLIÉ. 23 boîtes de 12 œufs : Ti Margo pose 23 × 12, écrit 23 × 1 = 23 sous 46
   (sans le zéro) et trouve 69. Il vérifie : 20 boîtes de 10 œufs, c'est déjà 200 œufs ; 69 est bien trop
   petit. 12, c'est 2 + 10 : la deuxième ligne vaut 230, et 46 + 230 = 276.
   Outils : films/calcul-pose.js (poser, gestes, cadrer, fusionnerNombres…).
   ============================================================ */

/* Une boîte d'œufs à la craie : le carton, 2 rangées de 6 œufs (k œufs posés) */
function boiteOeufs(c,x,y,z=1,k=12){ if(z<=0) return; const L=300*z, Ht=150*z;
  c.fillStyle='#c9a26b'; c.strokeStyle='#7a4a1c'; c.lineWidth=7; c.beginPath(); c.roundRect(x-L/2,y-Ht/2,L,Ht,18*z); c.fill(); c.stroke();
  for(let j=0;j<12;j++){ if(j>=k) break; const cx=x-L/2+L*((j%6)+.5)/6, cy=y-Ht/4+(j<6?0:Ht/2);
    c.fillStyle='#fff9db'; c.strokeStyle='#b08850'; c.lineWidth=3; c.beginPath(); c.ellipse(cx,cy,17*z,22*z,0,0,7); c.fill(); c.stroke(); } }
/* Une rangée de chiffres posée sous la pose, alignée sur ses colonnes (rang 0 = unités) */
function rangee(c,p,txt,y,z=1,coul,ft=100){ if(z<=0) return; const s=String(txt);
  for(let j=0;j<s.length;j++){ const k=s.length-1-j; ecrire(c,s[j],p.X(k),y,ft*z,typeof coul==='function'?coul(k):(coul||CRAIE['r'+k]||CRAIE.blanc)); } }

FILMS.multiplication=function(outils){
  fusionnerNombres();
  const DUR={'00-accroche':18.89,'01-verif':12.31,'02-question':13.79,'02b-reponse':17.2,'03-ouf':6.5,'04-commentaire':5.93,'05-abonne':6.04};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'02-question':3.3,'03-ouf':.6,'04-commentaire':1.5});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,ver,q,r,ouf,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['05-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes();
  const W=tab.W;

  /* Les instants */
  const t23=mot('00-accroche','23'), t12=mot('00-accroche','12'), tF2=mot('00-accroche','fois',1), t2=mot('00-accroche','2'),
        t46=mot('00-accroche','46'), tF1=mot('00-accroche','fois',3), t1=mot('00-accroche','1'), t23r=mot('00-accroche','23',7),
        tPlus=mot('00-accroche','plus'), t69=mot('00-accroche','69'), tJai=mot('00-accroche','J\'ai'), tParie=mot('00-accroche','paries');
  const tV=mot('01-verif','vérifie'), tV23=mot('01-verif','23'), tV20=mot('01-verif','20'), tV20b=mot('01-verif','20',3),
        tV10=mot('01-verif','10'), tV200=mot('01-verif','200'), tV69=mot('01-verif','69'), tPetit=mot('01-verif','trop');
  const tO276=mot('03-ouf','276'), tO200=mot('03-ouf','200'), tOuf=mot('03-ouf','Ouf');
  const t21=mot('04-commentaire','21'), t13=mot('04-commentaire','13'), tRep=mot('04-commentaire','Réponds');
  const tFinT=t23-.08;

  const XU=880, Y0=120, PW=130, PH=110; /* la pose, à droite de l'ardoise ; la boîte d'œufs à gauche */
  const pose=(c,o)=>poser(c,Object.assign({xu:XU,y0:Y0,w:PW,h:PH,ft:100,n:3,entetes:false,signe:'×'},o));
  const lignes2=(c,p,{row3,z3,coul3,tot,zt,coulT,plus=true})=>{ const y3=p.yRes+PH, yb=y3+PH*.5+8, yt=yb+PH*.55;
    rangee(c,p,row3,y3,z3,coul3);
    if(plus){ ecrire(c,'+',p.xg+PW*.22,y3,90,CRAIE.blanc);
      c.strokeStyle=CRAIE.blanc; c.lineWidth=9; c.lineCap='round'; c.beginPath(); c.moveTo(p.xg-10,yb); c.lineTo(XU+PW*.55,yb); c.stroke(); }
    if(tot) rangee(c,p,tot,yt,zt,coulT);
    return {y3,yt}; };

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* le défi : 21 × 13, la réponse reste à l'élève */
      poser(c,{xu:W/2+75,y0:250,lignes:[{txt:'21',z:T>=t21?zoom(T,t21):0},{txt:'13',z:T>=t13?zoom(T,t13):0}],signe:T>=t13?'×':'',barre:T>=t13?1:0});
      if(T>=tRep) ecrire(c,'?',W/2+75-75,250+2*135+60,130*zoom(T,tRep,.6),CRAIE.jaune);
      tab.maj(); return; }
    if(T>=ouf){ /* la bonne pose : la deuxième ligne commence par 0 (230), 46 + 230 = 276, bien plus que 200 */
      const p=pose(c,{lignes:[{txt:'23'},{txt:'12'}],res:{txt:'46'}});
      const {yt}=lignes2(c,p,{row3:'230',coul3:k=>k===0?CRAIE.ret:CRAIE['r'+k],tot:'276',zt:T>=tO276?zoom(T,tO276,.4):0,coulT:CRAIE.ok});
      if(T>=tO276) ecrire(c,'276',215,yt-170,92*zoom(T,tO276,.4),CRAIE.ok);
      if(T>=tO200) ecrire(c,'> 200',215,yt-60,92*zoom(T,tO200,.4),CRAIE.ok);
      if(T>=tOuf) coche(c,335,yt-175,.8);
      tab.maj(); return; }
    if(T>=ver){ /* la vérification : plus de 20 boîtes de 10 œufs, c'est déjà 200 œufs ; 69 est bien trop petit */
      if(T>=tV23) ecrire(c,'23 boîtes',W/2-175,110,70*zoom(T,tV23,.4),CRAIE.blanc);
      if(T>=tV20) ecrire(c,'> 20 boîtes',W/2+205,110,70*zoom(T,tV20,.4),CRAIE.jaune);
      if(T>=tV20b) ecrire(c,'20',W/2-290,290,96*zoom(T,tV20b,.4),CRAIE.jaune);
      if(T>=tV10) ecrire(c,'× 10',W/2-65,290,96*zoom(T,tV10,.4),CRAIE.jaune);
      if(T>=tV200) ecrire(c,'= 200',W/2+195,290,96*zoom(T,tV200,.4),CRAIE.ok);
      if(T>=tV69) ecrire(c,'69',W/2-150,480,110*zoom(T,tV69,.4),T>=tPetit?CRAIE.faux:CRAIE.blanc);
      if(T>=tPetit) ecrire(c,'< 200 !',W/2+120,480,96*zoom(T,tPetit,.4),CRAIE.faux);
      tab.maj(); return; }
    /* l'accroche : la boîte d'œufs, la multiplication posée avec l'erreur (23 sous 46, sans le zéro) */
    boiteOeufs(c,215,250,zoom(T,t23,.4),T>=t12?12:0);
    if(T>=t23) ecrire(c,'23 boîtes',215,400,66*zoom(T,t23,.4),CRAIE.jaune);
    if(T>=t12) ecrire(c,'de 12 œufs',215,480,58*zoom(T,t12,.4),CRAIE.blanc);
    const p=pose(c,{lignes:[{txt:'23',z:T>=t23?zoom(T,t23,.4):0},{txt:'12',z:T>=t12?zoom(T,t12,.4):0}],signe:T>=t12?'×':'',barre:T>=t12?1:0,
      res:{txt:'46',z:T>=t46?zoom(T,t46,.4):0}});
    if(T>=tF2&&T<tF1) cercle(c,p.X(0),Y0+PH,52,CRAIE.r0,(T-tF2)/.4);
    if(T>=tF1&&T<tPlus) cercle(c,p.X(1),Y0+PH,52,CRAIE.r1,(T-tF1)/.4);
    const {yt}=lignes2(c,p,{row3:'23',z3:T>=t23r?zoom(T,t23r,.4):0,plus:T>=tPlus,tot:'69',zt:T>=t69?zoom(T,t69,.4):0,coulT:CRAIE.blanc});
    if(T>=tJai){ c.strokeStyle=CRAIE.jaune; c.lineWidth=8; c.beginPath(); c.roundRect(XU-205,yt-62,330,124,24); c.stroke(); }
    tab.maj();
  }

  /* Les écrits : exactement ce que dit la voix */
  const a0=dit('00-accroche'), a1=dit('01-verif'), a3=dit('03-ouf'), a4=dit('04-commentaire'), qd=dit('02-question'), rd=dit('02b-reponse');
  const groupes=[
    groupe(acc+.1,tFinT,352,62,a0('Salut !'),a0('Je range des œufs :')),
    ...suiteDe(ver,60,62,[a0('23 boîtes de 12 œufs.')],[a0('23 × 2 = 46.')],[a0('23 × 1 = 23.')],[a0('46 + 23 = 69.')],
      [a0('J’ai 69 œufs !')],[a0('Tu paries ?')]),
    /* « 20 boîtes » est dit deux fois de suite : saute(-1) rend à la 2e la marque que la 1re a sautée */
    ...suiteDe(q,60,62,[a1('Je vérifie.')],[a1('23 boîtes, c’est'),a1('plus de 20 boîtes.')],
      [(a1.saute(-1),a1('20 boîtes de 10 œufs,')),a1('c’est déjà 200 œufs.')],[a1('69, c’est bien trop petit !')]),
    ...suiteDe(com,60,62,[a3('276, c’est bien'),a3('plus que 200.')],[a3('Ouf, mes œufs'),a3('sont tous là !')]),
    ...suiteDe(f,60,60,[a4('À toi : combien font'),a4('21 × 13 ?')],[a4('Réponds en commentaire !')])
  ];
  qd('Question !');
  const phraseQ=[qd('Combien ai-je d’œufs ?')];
  const tq=(m,n=1)=>mot('02-question',m,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  rd.saute(2); const r1=rd('12, c’est 2 + 10.'), r2=rd('23 × 2 = 46.'), r3=rd('23 × 10 = 230 :'), r4=rd('j’avais oublié le zéro.'),
    r5=rd('46 + 230 = 276.');
  const tC=mot('02b-reponse','C');

  poserMiniature(outils,acc+1,'23 boîtes<br>de 12 œufs'+PARI,ardoiseMini([['23 × 12'],['= 69 ?','#ff8787']],320,240));
  return { clips,FIN,titre:'Le zéro oublié',ceinture:1,finTitre:tFinT,groupes,finClip:'05-abonne',
    cuts:[tFinT,ver,q,r,ouf,com,f],
    question:{ qc:'02-question',rc:'02b-reponse',finR:ouf,cpt:fin('02-question')+.1,bonne:2,tBon:tC-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['69',tq('A'),tq('69')],['266',tq('B'),tq('266')],['276',tq('C'),tq('276')]],
      tete:[[r+.1,'Réponse '],[tC,'C !']],reponse:[r1,r2,r3],suite:[r4,r5] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansQ=T>=q&&T<ouf, dansF=T>=f, gros=T<tFinT;
      tab.g.visible=!gros&&!dansQ&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansQ||dansF});

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<ver){ if(T<tF2) g.montre(); else if(T<tJai) g.reflechit(); else if(T<tParie) g.fier(); else g.pouce(); }
      else if(T<q){ if(T>=tPetit){ g.oups(); scene.ry=-.12+.3*lisse((T-tPetit)/.35); } else if(T>=tV) g.montre(); else g.reflechit(); }
      else if(T<r) g.reflechit();
      else if(T<ouf){ T<tC?g.ouvre():g.pouce(); }
      else if(T<com){ T>=tOuf?g.fier():g.montre(); }
      else if(T<f){ T<tRep?g.montre():g.pouce(); }
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
