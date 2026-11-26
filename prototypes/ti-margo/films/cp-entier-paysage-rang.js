/* ============================================================
   Série Nombres entiers CP — PAYSAGE 02 : « La file du toboggan » (micro cp_entier_rang), 25/11/2026.
   Outils : cp-commun.js + cp-entier.js (relu par cp-entier-paysage.js). Voix : manim/voix/cp-entier-rang-paysage.json.
   Au parc, la file du toboggan : lapin, chat, Ti Margo, souris, canard. Premier, deuxième, troisième.
   Questions en plein milieu : qui est le deuxième ? C (le chat). Le lapin a glissé : quelle place ? A (deuxième).
   ⭐ Pendant les questions, la file reste visible à gauche ; la carte, plus étroite, est à droite.
   ============================================================ */
FILMS['rang']=function(outils){
  const DUR={'00-accroche':10.6,'01-premier':7.33,'02-compter':7.93,'03-question':12.02,'03b-reponse':6.27,
    '04-question':16.87,'04b-reponse':8.16,'05-appris':5.45,'06-abonne':9.74};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1,'01-premier':.5,'02-compter':1.2,
    '03-question':3.3,'03b-reponse':1.4,'04-question':3.3,'04b-reponse':1.4,'05-appris':1.4});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,pre,cpt,q1,r1,q2,r2,ap,f]=clips.map(x=>x[1]), FIN=+(f+DUR['06-abonne']+.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=cadrePaysageE();
  outils.panneau.style.display='none'; cssCartes();
  const css=document.createElement('style');
  css.textContent='#carte{left:1390px!important;} #carte .choix{font-size:62px!important;gap:14px;padding:4px 14px;} #carte .choix b{width:70px;height:70px;}';
  document.head.append(css);

  const m0=w=>mot('00-accroche',w);
  const tAu=m0('Au'), tSol=m0('soleil'), tTob=m0('toboggan'), tQueue=m0('queue'), tChac=m0('Chacun');
  const tPrem=mot('01-premier','premier'), tLapin=mot('01-premier','lapin'), tOreil=mot('01-premier','oreilles');
  const tC=['premier','deuxième','troisième'].map(w=>mot('02-compter',w)), tMoi=mot('02-compter','Moi');
  const tR1=[mot('03b-reponse','Premier'),mot('03b-reponse','Deuxième')];
  const tWiii=mot('04-question','Wiii'), tGlis=mot('04-question','glissé');
  const tR2=[mot('04b-reponse','premier'),mot('04b-reponse','deuxième')], tBien=mot('04b-reponse','Bientôt');
  const tA=['premier','deuxième','troisième'].map(w=>mot('05-appris',w));
  const finTitre=tAu-.08;

  /* La file : le 1er tout près de l'échelle du toboggan (à gauche) */
  const QUI=['lapin','chat','margo','souris','canard'], X=k=>172+k*108, PIEDS=665, HAUT=365;
  /* Après la glissade du lapin, chacun avance d'une place */
  const avance=T=>douxE(entreE(T,tGlis+.3,tGlis+1.5));
  function file(c,T,{lueur=[],sans=[]}={}){
    QUI.forEach((qui,k)=>{ if(sans.includes(k)) return; copainE(c,qui,X(k),PIEDS,1.25,lueur.includes(k)?.6+.4*Math.sin(T*5+k):0); }); }
  function toboggan(c){ c.strokeStyle=CRAIE.blanc; c.lineWidth=7; c.lineCap='round';
    c.beginPath(); c.moveTo(118,PIEDS); c.lineTo(118,330); c.moveTo(78,PIEDS); c.lineTo(78,330); c.stroke();
    c.lineWidth=5; c.beginPath(); for(let y=610;y>340;y-=44){ c.moveTo(78,y); c.lineTo(118,y); } c.stroke();
    c.strokeStyle='#ff922b'; c.lineWidth=16; c.beginPath(); c.moveTo(78,335); c.quadraticCurveTo(20,420,14,PIEDS-20); c.stroke(); }
  const rang=(c,n,k,T,t0,coul=CRAIE.jaune)=>rangE(c,n,X(k),HAUT,T,t0,coul,52);

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=ap){ /* ce que tu as appris : je pars de celui qui est devant */
      toboggan(c); file(c,T);
      const ts=[...tA,tA[2]+.55,tA[2]+1.1];
      ts.forEach((t,k)=>rang(c,k+1,k,T,t,k===0?CRAIE.ok:CRAIE.jaune));
      const kd=ts.filter(t=>T>=t).length-1; if(kd>=0&&T<ts[4]+.8) doigtE(c,X(kd),HAUT-56,90);
      tab.maj(); return; }
    if(T>=q2){ /* le lapin a glissé ; chacun avance d'une place */
      toboggan(c);
      const v=avance(T);
      QUI.forEach((qui,k)=>{ if(k===0) return; const x=X(k)-108*v, rep=T>=r2;
        const l=rep&&((k===1&&T>=tR2[0])||(k===2&&T>=tR2[1]))?.6+.4*Math.sin(T*5+k):0; copainE(c,qui,x,PIEDS,1.25,l); });
      /* la glissade : il monte à l'échelle, puis wiii ! */
      if(T<tGlis+1.2){ const u=entreE(T,tWiii-.2,tWiii+.5), w=entreE(T,tWiii+.5,tWiii+1.3);
        let [x,y]=u<1?sautE([X(0),PIEDS],[98,335],u,60):[98,335];
        if(w>0){ const s=douxE(w); x=98-84*s; y=335+(PIEDS-355)*s*s; }
        c.save(); c.globalAlpha=1-entreE(T,tGlis+.4,tGlis+1.1); copainE(c,'lapin',x,y,1.1*(1-.25*w)); c.restore(); }
      if(T>=tWiii&&T<tGlis+1.2) ecrire(c,'Wiii !',360,190,80*zoom(T,tWiii,.5),CRAIE.jaune);
      if(T>=r2){ rangE(c,1,X(0),HAUT,T,tR2[0],CRAIE.jaune,52); rangE(c,2,X(1),HAUT,T,tR2[1],CRAIE.ok,58); }
      if(T>=tBien) for(const [x,y] of [[200,250],[360,280],[280,200]]) etincelle(c,x,y,16+6*Math.sin(T*6+x));
      tab.maj(); return; }

    /* le parc : le soleil, un arbre, le toboggan ; puis la file */
    if(T<q1){ if(T>=tSol) soleilEtoileE(c,880,130,70,T,entreE(T,tSol,tSol+.8));
      if(T>=tAu) pommierCraie(c,880,PIEDS,.62,zoom(T,tAu,.4)); }
    if(T>=tTob) toboggan(c);
    if(T>=tQueue) QUI.forEach((qui,k)=>{ const z=zoom(T,tQueue+k*.18,.4); if(z<=0) return;
      let l=0;
      if(T>=pre&&T<cpt&&k===0&&T>=tPrem) l=.6+.4*Math.sin(T*5);
      if(T>=cpt&&T<q1&&k===2&&T>=tMoi) l=.6+.4*Math.sin(T*5);
      if(T>=r1&&k===1&&T>=tR1[1]) l=.6+.4*Math.sin(T*5);
      copainE(c,qui,X(k),PIEDS,1.25*z,l); });
    if(T>=tChac&&T<pre) ecrire(c,'Chacun son tour !',440,110,62*zoom(T,tChac,.4),CRAIE.jaune);
    if(T>=pre&&T>=tPrem) rang(c,1,0,T,tPrem);
    if(T>=tOreil&&T<cpt) for(const [x,y] of [[X(0)-40,430],[X(0)+44,425]]) etincelle(c,x,y,14+5*Math.sin(T*6+x));
    if(T>=cpt&&T<q1){ [1,2].forEach(k=>rang(c,k+1,k,T,tC[k],k===2&&T>=tMoi?CRAIE.ok:CRAIE.jaune));
      const kd=tC.filter(t=>T>=t).length-1; if(kd>=0&&T<tMoi) doigtE(c,X(kd),HAUT-56,90); }
    if(T>=r1&&T>=tR1[1]) rang(c,2,1,T,tR1[1],CRAIE.ok);
    tab.maj();
  }

  const qa=dit('03-question'), qb=dit('04-question');
  qa('Question !'); const phrase1=[qa('Qui est le deuxième ?')]; qa.jusque('Mets'); const pause1=[qa('Mets pause, et montre-le !')];
  qb('Question !'); qb.jusque('quelle'); const phrase2=[qb('Quelle place ?')];
  qb.jusque('Mets'); const pause2=[qb('Mets pause, et choisis !')];
  const tqa=m=>mot('03-question',m)-q1, tqb=m=>mot('04-question',m)-q2;
  const tB1=mot('03b-reponse','C'), tB2=mot('04b-reponse','A');
  const ORD=n=>`${n}<sup style="font-size:.55em">${n===1?'er':'e'}</sup>`;
  const questions=[
    { qc:'03-question',rc:'03b-reponse',finR:fin('03b-reponse')+.8,cpt:fin('03-question')+.1,bonne:2,tBon:tB1-r1,
      phrase:phrase1,pause:pause1,
      choix:[['🐭 souris',tqa('A'),tqa('souris')],['🦆 canard',tqa('B'),tqa('canard')],['🐱 chat',tqa('C'),tqa('chat')]],
      tete:[[r1+.1,'Réponse '],[tB1,'C !']],reponse:[phraseE('2e : le chat',[tR1[1],mot('03b-reponse','le',2),mot('03b-reponse','chat')])],suite:[] },
    { qc:'04-question',rc:'04b-reponse',finR:fin('04b-reponse')+.8,cpt:fin('04-question')+.1,bonne:0,tBon:tB2-r2,
      phrase:phrase2,pause:pause2,
      choix:[[ORD(2),tqb('A'),tqb('deuxième')],[ORD(3),tqb('B'),tqb('troisième')],[ORD(4),tqb('C'),tqb('quatrième')]],
      tete:[[r2+.1,'Réponse '],[tB2,'A !']],reponse:[phraseE('Moi : 2e !',[mot('04b-reponse','Moi'),tR2[1],tR2[1]])],suite:[] }
  ];
  const groupes=[groupe(ap+.05,f,30,60,phraseE('Ce que tu as appris',[ap+.05,ap+.05,ap+.05,ap+.05,ap+.05]))];

  miniPaysageE(outils,tC[2]+.3,'Qui est<br>le 2<sup style="font-size:.55em">e</sup> ?<div style="color:#e8590c;font-size:120px;margin-top:10px">TU PARIES ?</div>');
  return { clips,FIN,titre:'La file du toboggan',ceinture:0,finTitre,groupes,finClip:'06-abonne',
    cuts:[finTitre,pre,cpt,q1,r1,q2,r2,ap,f],
    question:questions[0], questions,
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      camPaysageE(cam,{gros,fin:dansF});
      const dansQ=(T>=q1&&T<r1)||(T>=q2&&T<r2);

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<pre) g.ouvre();
      else if(T<q1) T>=tMoi?g.fier():g.montre();
      else if(dansQ) g.reflechit();
      else if(T<ap) T>=tBien?g.pouce():g.fier();
      else if(T<f) g.montre();
      else { T-f<2.35?g.ouvre():g.pouce(); }

      if(window.MINI){ tab.g.visible=false; scene.x=-3.1; scene.ry=.2; cam.x=0; cam.y=2.75; cam.d=7.6; cam.e=.02; P.jaw=.62; g.fier(); }
    } };
};
