/* ============================================================
   Série Nombres entiers CP — SHORT 06 : « La fusée » (micro cp_entier_droite), 26/11/2026.
   Outils : cp-commun.js + cp-entier.js + cp-entier2-dessins.js. Voix : manim/voix/cp-entier-droite-short.json.
   3, 2, 1, décollage : la fusée monte sur une piste DEBOUT (0, 5 et 10 écrits) et s'arrête sur le 8.
   Question : jusqu'où ? B (8). Réponse : je pars du 5 : 6, 7, 8. Ceinture blanche. Commentaire : après 19 ?
   ⭐ La carte se range à droite sous l'ardoise, Ti Margo à gauche.
   ============================================================ */
FILMS['droite']=function(outils){
  const DUR={'00-accroche':9.94,'01-question':12.37,'01b-reponse':8.09,'02-commentaire':8.38,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':3.3,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes(); carteCoteE(); finShortE();

  const m0=w=>mot('00-accroche',w);
  const t3=m0('Trois'), t2=m0('deux'), t1=m0('un'), tDec=m0('décollage'), tEt=m0('étoiles'), tArr=m0("s'arrête");
  const mr=(w,n=1)=>mot('01b-reponse',w,n);
  const tB=mr('B'), tCinq=mr('cinq'), tSix=mr('six'), tSept=mr('sept'), tHuit=mr('huit'), tHuit2=mr('huit',2);
  const tPiste=mot('02-commentaire','piste'), t19=mot('02-commentaire','dix-neuf'), tApres=mot('02-commentaire','après'), tRep=mot('02-commentaire','réponds');
  const finTitre=t3-.08;

  /* la piste debout : 0 en bas (y 670), 10 en haut (y 110) */
  const P0={x0:430,y0:680,dx:0,dy:-61,min:0,max:10};
  const hauteur=T=>T<tDec?0:8*douxE(entreE(T,tDec,tArr));
  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* après 19 ? une piste couchée 17 → 21 */
      if(T>=tPiste){ const pos=pisteE(c,{x0:150,y0:380,dx:190,min:17,max:21,ecrits:T>=t19?[19]:[],taille:80,couleur:()=>CRAIE.jaune,zEcrit:()=>zoom(T,t19,.5)});
        if(T>=tApres){ const [x,y]=pos(20); arcSautE(c,pos(19),[x,y],entreE(T,tApres,tApres+.6),90); ecrire(c,'?',x,y+80,96*zoom(T,tApres+.5,.5),CRAIE.ok); } }
      tab.maj(); return; }
    etoilesE(c,T,16,1056,700);
    const rep=T>=r, compte=v=>rep&&((v===5&&T>=tCinq)||(v===6&&T>=tSix)||(v===7&&T>=tSept)||(v===8&&T>=tHuit));
    const ecrits=[0,5,10].concat(rep?[6,7,8].filter(compte):[]);
    const pos=pisteE(c,{...P0,ecrits,taille:66,allume:v=>compte(v)?1:0,couleur:v=>v===8&&rep?CRAIE.ok:(v===5&&rep&&T>=tCinq?CRAIE.jaune:CRAIE.blanc),
      zEcrit:v=>v===6?zoom(T,tSix,.5):v===7?zoom(T,tSept,.5):v===8?zoom(T,tHuit,.5):1});
    if(rep) for(const [a,b,t] of [[5,6,tSix],[6,7,tSept],[7,8,tHuit]]) if(T>=t-.35){ const [xa,ya]=pos(a), [xb,yb]=pos(b); arcSautE(c,[xa+34,ya],[xb+34,yb],entreE(T,t-.35,t),-40); }
    /* la fusée, à droite de la piste */
    const h=hauteur(T), [, yF]=pos(h), vole=T>=tDec&&T<tArr+.3;
    fuseeE(c,600,yF-60,1.6,T,vole?1:(T<tDec?0:0));
    if(T>=q){ c.strokeStyle=CRAIE.jaune; c.lineWidth=4; c.setLineDash([8,8]); c.beginPath(); c.moveTo(550,yF); c.lineTo(462,yF); c.stroke(); c.setLineDash([]);
      if(!rep||T<tHuit) ecrire(c,'?',320,yF,72,CRAIE.jaune); }
    /* le compte à rebours 3, 2, 1 */
    for(const [s,t,tn] of [['3',t3,t2],['2',t2,t1],['1',t1,tDec]]) if(T>=t&&T<tn) ecrire(c,s,850,360,200*zoom(T,t,.5),CRAIE.jaune);
    if(T>=tDec&&T<tDec+1.2) ecrire(c,'🚀',850,360,120,CRAIE.blanc);
    if(rep&&T>=tHuit2) for(const [x,y] of [[680,yF-60],[540,yF-90],[700,yF+40]]) etincelle(c,x,y,16+6*Math.sin(T*6+x));
    tab.maj();
  }

  const qd=dit('01-question');
  qd('Question !'); const phraseQ=[qd("Jusqu'où ma fusée est-elle montée ?")];
  const tq=w=>mot('01-question',w)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et compte les sauts !')];
  const r1=phraseE('Je pars du 5 : 6, 7, 8 !',[mr('Je'),mr('pars'),mr('du'),tCinq,tCinq,tSix,tSept,tHuit,tHuit]);

  poserMiniature(outils,q-.3,'Jusqu\'où<br>est-elle montée ?'+PARI,ardoiseMini([['🚀 ?','#ffd43b']]));
  return { clips,FIN,titre:'La fusée',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['9',tq('A'),tq('neuf')],['8',tq('B'),tq('huit')],['7',tq('C'),tq('sept')]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[r1],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansF});
      if(T>=q&&T<com) tiMargoCoteE();

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q){ T<tDec?g.montre():(T<tEt?g.oups():g.fier()); }
      else if(T<r) g.reflechit();
      else if(T<com){ T<tHuit2?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.ouvre(); }
      else g.ouvre();

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.fier(); }
    } };
};
