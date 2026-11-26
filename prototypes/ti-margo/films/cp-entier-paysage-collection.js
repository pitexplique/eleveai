/* ============================================================
   Série Nombres entiers CP — PAYSAGE 03 : « Une assiette pour chacun » (micro cp_entier_construire_collection), 26/11/2026.
   Outils : cp-commun.js + cp-entier.js (relu par cp-entier-paysage.js). Voix : manim/voix/cp-entier-collection-paysage.json.
   La fête sous les étoiles : 6 copains, 6 assiettes, une pour chacun. Questions en plein milieu :
   un ballon pour chacun des 5 enfants ? B (5). Quatre copains, trois chapeaux ? C (il en manque un).
   ⭐ Pendant les questions, les dessins restent à gauche de l'ardoise ; la carte est à droite.
   ============================================================ */
FILMS['collection']=function(outils){
  const DUR={'00-accroche':9.51,'01-compter':7.72,'02-construire':10.32,'03-question':13.69,'03b-reponse':6.17,
    '04-question':15.0,'04b-reponse':5.86,'05-appris':3.85,'06-abonne':9.74};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1,'01-compter':.5,'02-construire':1.2,
    '03-question':3.3,'03b-reponse':1.4,'04-question':3.3,'04b-reponse':1.4,'05-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,cpt,con,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['06-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style'); css.textContent='#carte .choix{font-size:60px!important;}'; document.head.append(css);

  const m0=w=>mot('00-accroche',w);
  const tCe=m0('Ce'), tSoir=m0('soir'), tEt=m0('étoiles'), tArr=m0('arrivent'), tAss=m0('assiette');
  const tC1=['Un','deux','trois','quatre','cinq'].map(w=>mot('01-compter',w)).concat([mot('01-compter','six',1)]), tSix=mot('01-compter','six',2);
  const tC2=['Un','deux','trois','quatre','cinq'].map(w=>mot('02-construire',w)).concat([mot('02-construire','six',2)]), tPers=mot('02-construire','personne');
  const tCinqA=mot('03b-reponse','Cinq'), tCinqB=mot('03b-reponse','cinq',2), tBal=mot('03b-reponse','ballons'), tChac=mot('03b-reponse','Chacun');
  const tCop=mot('04b-reponse','copain'), tChap=mot('04b-reponse','chapeau'), tIl=mot('04b-reponse','Il');
  const tDonne=mot('05-appris','donne');
  const finTitre=tCe-.08;

  const QUI=['lapin','chat','souris','canard','ours','cochon'], XF=k=>120+k*163;
  const COUL_B=['#ff6b6b','#ffd43b','#74c0fc','#b197fc','#ff922b'], COUL_H=['#be4bdb','#1c7ed6','#f76707'];
  function lune(c,x,y,r){ c.fillStyle='#fff3bf'; c.beginPath(); c.arc(x,y,r,0,7); c.fill(); c.fillStyle=tab.fond; c.beginPath(); c.arc(x+r*.45,y-r*.2,r*.85,0,7); c.fill(); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ /* ce que tu as appris : un objet pour chacun, des traits qui relient */
      for(let k=0;k<4;k++){ const x=210+k*210; copainE(c,QUI[k],x,370,1.15);
        assietteCraie(c,x,610,150);
        const t=tDonne+k*.22; if(T>=t){ c.strokeStyle=CRAIE.ok; c.lineWidth=7; c.setLineDash([14,10]); c.beginPath(); c.moveTo(x,385); c.lineTo(x,385+(570-385)*entreE(T,t,t+.35)); c.stroke(); c.setLineDash([]); } }
      tab.maj(); return; }
    if(T>=q2){ /* quatre copains, trois chapeaux */
      for(let k=0;k<4;k++){ const x=95+k*125; copainE(c,QUI[k],x,660,1.3);
        if(k<3){ const d=tCop+k*.15, u=T>=r2?douxE(entreE(T,d,d+.5)):0, y=250+6*Math.sin(T*2+k)*(1-u)+(476-250)*u;
          chapeauFete(c,x,y,1.2,COUL_H[k]); } }
      if(T>=r2&&T>=tChap){ const x=95+3*125, a=.5+.5*Math.sin(T*6); c.save(); c.globalAlpha=a; c.strokeStyle=CRAIE.faux; c.lineWidth=6; c.setLineDash([12,9]);
        c.beginPath(); c.moveTo(x-41,476); c.lineTo(x,476-110); c.lineTo(x+41,476); c.closePath(); c.stroke(); c.setLineDash([]); c.restore(); }
      if(T>=r2&&T>=tIl) ecrire(c,'?',95+3*125,300,90*zoom(T,tIl,.5),CRAIE.faux);
      tab.maj(); return; }
    if(T>=q1){ /* cinq enfants ; un ballon pour chacun */
      for(let k=0;k<5;k++){ const x=58+k*98; copainE(c,QUI[k],x,660,1.15);
        if(T>=r1){ const t=tBal+k*.14; if(T>=t){ const by=300+8*Math.sin(T*1.6+k);
          c.strokeStyle='#dee2e6'; c.lineWidth=3; c.beginPath(); c.moveTo(x+28,by+46); c.lineTo(x+36,575); c.stroke();
          ballonAir(c,x+28,by,38,COUL_B[k],zoom(T,t,.4),T>=tChac?.5+.5*Math.sin(T*5+k):0); } } }
      if(T>=r1&&T>=tCinqB) ecrire(c,'5',280,110,130*zoom(T,tCinqB,.5),CRAIE.ok);
      tab.maj(); return; }

    /* la fête : la lune, les étoiles, les copains, puis les assiettes */
    if(T>=tSoir) lune(c,930,90,52);
    if(T>=tEt) etoilesE(c,T,16,860,170);
    QUI.forEach((qui,k)=>{ const d=tArr+k*.18; if(T<d) return; const u=douxE(entreE(T,d,d+.7));
      copainE(c,qui,XF(k)+(1-u)*500,520,1.35,T>=cpt&&T>=tC1[k]&&T<tC1[k]+.9?1:0); });
    if(T>=cpt) tC1.forEach((t,k)=>etiquette(c,String(k+1),XF(k),170,T,t,k===5?CRAIE.ok:CRAIE.jaune,46));
    if(T>=tSix&&T<con) ecrire(c,'6',528,90,120*zoom(T,tSix,.5),CRAIE.ok);
    if(T>=tAss&&T<cpt) assietteCraie(c,528,620,170,zoom(T,tAss,.4));
    if(T>=con) tC2.forEach((t,k)=>{ if(T<t-.3) return; const u=douxE(entreE(T,t-.3,t+.1)); assietteCraie(c,XF(k),625-(1-u)*120,140,1);
      etiquette(c,String(k+1),XF(k),688,T,t,k===5?CRAIE.ok:CRAIE.blanc,40); });
    if(T>=tPers&&T<q1) for(const [x,y] of [[200,120],[528,140],[860,120],[360,300],[700,300]]) etincelle(c,x,y,16+6*Math.sin(T*6+x));
    tab.maj();
  }

  const qa=dit('03-question'), qb=dit('04-question');
  qa('Question !'); qa.jusque('Combien'); const phrase1=[qa('Combien de ballons ?')]; qa.jusque('Mets'); const pause1=[qa('Mets pause, et choisis !')];
  const mq=w=>mot('04-question',w);
  qb('Question !'); const phrase2=[phraseE('4 copains, 3 chapeaux.',[mq('Quatre'),mq('copains'),mq('trois'),mq('chapeaux')]),(qb.jusque('assez'),qb('Assez ?'))];
  qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const tqa=m=>mot('03-question',m)-q1, tqb=m=>mot('04-question',m)-q2;
  const tB=mot('03b-reponse','B'), tC=mot('04b-reponse','C'), mr=w=>mot('04b-reponse',w);
  const questions=[
    { qc:'03-question',rc:'03b-reponse',finR:fin('03b-reponse')+.8,cpt:fin('03-question')+.1,bonne:1,tBon:tB-r1,
      phrase:phrase1,pause:pause1,
      choix:[['4',tqa('A'),tqa('quatre')],['5',tqa('B'),tqa('cinq')],['6',tqa('C'),tqa('six')]],
      tete:[[r1+.1,'Réponse '],[tB,'B !']],reponse:[phraseE('5 enfants, 5 ballons.',[tCinqA,mot('03b-reponse','enfants'),tCinqB])],suite:[] },
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,bonne:2,tBon:tC-r2,
      phrase:phrase2,pause:pause2,
      choix:[['trop',tqb('A'),tqb('trop')],['oui',tqb('B'),tqb('oui')],['manque 1',tqb('C'),tqb('manque')]],
      tete:[[r2+.1,'Réponse '],[tC,'C !']],reponse:[phraseE('Il en manque 1.',[tIl,mr('en'),mr('manque'),mot('04b-reponse','un',2)])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,tC2[5]+.4,'Assez de<br>chapeaux ?<div style="color:#e8590c;font-size:120px;margin-top:10px">TU PARIES ?</div>');
  return { clips,FIN,titre:'Une assiette pour chacun',ceinture:0,finTitre,groupes,finClip:'06-abonne',
    cuts:[finTitre,cpt,con,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros||T<cpt) g.ouvre();
      else if(T<q1) T>=tPers?g.fier():g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) g.fier();
      else if(T<f) g.montre();
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.fier(); }
    } };
};
