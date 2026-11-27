/* ============================================================
   Série Nombres entiers CP — SHORT 10 : « Les cartes dans le vent » (micro cp_entier_ordonner), 27/11/2026.
   Outils : cp-commun.js + cp-entier.js + cp-entier2-dessins.js + cp-entier3-dessins.js. Voix : manim/voix/cp-entier-ordonner-short.json.
   Le vent fait voler trois cartes : 91, 9, 19. Question : B (9 ; 19 ; 91) ; pièges 91 ; 19 ; 9 (à l'envers) et 19 ; 9 ; 91 (le 1 qui trompe).
   ⭐ 27/11 : pas de « TU PARIES ? » écrit : l'accroche = les cartes qui tournoient dans le vent + « Comment les remettre dans l'ordre ? ».
   Ceinture blanche. Commentaire : ranger 50, 15, 5. La carte se range à droite sous l'ardoise, Ti Margo à gauche.
   ============================================================ */
FILMS['ordonner']=function(outils){
  const DUR={'00-accroche':11.72,'01-question':19.33,'01b-reponse':13.21,'02-commentaire':9.36,'03-abonne':6.1};
  const clips=enchainer(.4,Object.keys(DUR),DUR,{'00-accroche':1.1,'01-question':3.3,'01b-reponse':1.4,'02-commentaire':1.6});
  const A=Object.fromEntries(clips), {dit,mot}=voixDe(A);
  const [acc,q,r,com,f]=clips.map(x=>x[1]), FIN=+(f+DUR['03-abonne']+1.5).toFixed(2);
  const fin=x=>A[x]+DUR[x];

  poserClasse(); const tab=poserTableau({L:4.4,H:3,x:0,y:4.55});
  outils.panneau.style.display='none'; cssCartes(); carteCoteE(); finShortE();
  const css=document.createElement('style'); css.textContent='#carte .choix{white-space:nowrap;}'; document.head.append(css);

  const m0=(w,n=1)=>mot('00-accroche',w,n);
  const tLe=m0('Le'), tVent=m0('vent'), t91=m0('Quatre-vingt-onze'), t9=m0('neuf'), t19=m0('dix-neuf'), tTout=m0('Tout'), tComment=m0('Comment');
  const mr=(w,n=1)=>mot('01b-reponse',w,n);
  const tB=mr('B'), tN1=mr('Neuf'), tChif=mr('chiffre'), tCest=mr("c'est"), tPlusP=mr('plus'), tPetit=mr('petit'), tD1=mr('Dix-neuf'), tDiz=mr('dizaine'),
    tQ1=mr('Quatre-vingt-onze'), tN2=mr('neuf',2), tN3=mr('neuf',3), tD2=mr('dix-neuf',2), tQ2=mr('quatre-vingt-onze',2);
  const mc=w=>mot('02-commentaire',w), tRange=mc('range-les'), t50=mc('cinquante'), t15=mc('quinze'), t5=mc('cinq'), tRep=mc('réponds');
  const finTitre=tLe-.08;

  /* les trois cartes : 91, 9, 19 ; posées en désordre, puis en éventail 9 < 19 < 91 */
  const W=215, NUM=[91,9,19], POSE=[[220,390,-.22],[535,455,.16],[845,375,-.12]], ARRIVE=[t91,t9,t19];
  /* la réponse : deux échanges en arc. « Neuf » : le 9 et le 91 se croisent ; « Dix-neuf » : le 19 et le 91 se croisent */
  const ETAPES=[[[tN1,[535,350,.04],-110],[tD1,[845,350,.08],-110]],[[tN1,[215,350,-.08],90]],[[tD1,[530,335,0],90]]];
  const pulse=(T,t0,d=1)=>T>=t0&&T<t0+d?1+.5*Math.sin((T-t0)*Math.PI/d):1;
  function carte(c,k,T){ const [px,py,pa]=POSE[k];
    let x,y,a;
    if(T<ARRIVE[k]+.05){ /* elles tournoient dans le vent */
      const u=douxE(entreE(T,tVent+k*.25,ARRIVE[k])), x0=-160, y0=160+k*60;
      x=x0+(px-x0)*u+130*Math.sin(u*Math.PI*2+k)*(1-u); y=y0+(py-y0)*u-90*Math.sin(u*Math.PI*3)*(1-u); a=pa+(1-u)*Math.PI*5; }
    else { x=px; y=py; a=pa+(T<r?.03*Math.sin(T*2+k):0); }
    if(T>=r) for(const [t0,[rx,ry,ra],h] of ETAPES[k]){ if(T<t0) break; const u=entreE(T,t0,t0+.9), [nx,ny]=sautE([x,y],[rx,ry],u,h); x=nx; y=ny; a+=(ra-a)*douxE(u); }
    let zs=[1,1], lueur=0;
    if(T>=r){ if(k===0&&T>=tQ1&&T<tN3) lueur=.5+.3*Math.sin(T*6); if(k===1&&T>=tN1&&T<tD1) lueur=.6+.4*Math.sin(T*6);
      if(k===2) zs=[pulse(T,tDiz-.1),1]; if(k===0) zs=[pulse(T,tN2-.1),1]; }
    if(T>=com) return;
    if(T>=tVent) carteNumE(c,x,y,W,NUM[k],{a,zs,lueur}); }

  function dessiner(T){ const c=tab.c; tab.effacer();
    if(T>=com){ /* à toi : 50, 15, 5 */
      [[50,t50],[15,t15],[5,t5]].forEach(([n,t],i)=>{ if(T>=tRange) carteNumE(c,240+i*290,300,190,T>=t?n:null,{a:[-.12,.08,-.04][i],z:zoom(T,tRange+i*.15,.5),zs:[pulse(T,t,.6),pulse(T,t,.6)]}); });
      if(T>=t5+.4){ const z=zoom(T,t5+.4,.5); ecrire(c,'?',240,590,110*z,CRAIE.jaune); ecrire(c,'<',385,590,100*z,CRAIE.blanc); ecrire(c,'?',530,590,110*z,CRAIE.jaune); ecrire(c,'<',675,590,100*z,CRAIE.blanc); ecrire(c,'?',820,590,110*z,CRAIE.jaune); }
      tab.maj(); return; }
    herbeE(c,640);
    /* un buisson et le fil à linge du jardin */
    c.fillStyle='#2f9e44'; for(const [x,y,rr] of [[70,620,70],[140,600,60],[990,615,72],[930,625,50]]){ c.beginPath(); c.arc(x,y,rr,0,7); c.fill(); }
    ventE(c,T,T<tTout?entreE(T,tLe,tVent+.3):(T<r?Math.max(0,1-(T-tTout)/1.2):0));
    for(const k of [0,1,2]) carte(c,k,T);
    if(T>=tComment&&T<r) ecrire(c,'?',540,180,140*zoom(T,tComment,.5)*(1+.05*Math.sin(T*5)),CRAIE.jaune);
    if(T>=r){ const z1=zoom(T,tD2,.5), z2=zoom(T,tQ2,.5);
      if(T>=tD2) ecrire(c,'<',372,350,110*z1,CRAIE.jaune); if(T>=tQ2) ecrire(c,'<',688,350,110*z2,CRAIE.jaune);
      if(T>=tN3) for(const [x,y] of [[215,120],[530,100],[845,120]]) if(T>=tQ2+.2) etincelle(c,x,y,14+6*Math.sin(T*6+x)); }
    tab.maj();
  }

  const qd=dit('01-question');
  qd('Question !'); qd.jusque('du'); const phraseQ=[qd('Du plus petit au plus grand ?')];
  const tq=(w,n=1)=>mot('01-question',w,n)-q;
  qd.jusque('Mets'); const pauseQ=[qd('Mets pause, et choisis !')];
  const r1=phraseE('9 : le plus petit.',[tN1,tN1,tCest,tPlusP,tPetit]);
  const r2=phraseE('9 < 19 < 91 !',[tN3,tD2,tD2,tQ2,tQ2]);

  poserMiniature(outils,q-.3,'Dans quel<br>ordre ?',ardoiseMini([['91 ; 9 ; 19'],['?','#ffd43b']],380));
  return { clips,FIN,titre:'Les cartes dans le vent',ceinture:0,finTitre,groupes:[],finClip:'03-abonne',
    cuts:[finTitre,q,r,com,f],
    question:{ qc:'01-question',rc:'01b-reponse',finR:com,cpt:fin('01-question')+.1,bonne:1,tBon:tB-r,
      phrase:phraseQ,pause:pauseQ,
      choix:[['91 ; 19 ; 9',tq('A'),tq('quatre-vingt-onze')],['9 ; 19 ; 91',tq('B'),tq('neuf',2)],['19 ; 9 ; 91',tq('C'),tq('dix-neuf',3)]],
      tete:[[r+.1,'Réponse '],[tB,'B !']],reponse:[r1,r2],suite:[] },
    jouer(P,T,cam){
      const g=gestes(P,T); dessiner(T);
      const dansF=T>=f, gros=T<finTitre;
      tab.g.visible=!gros&&!dansF&&!window.MINI;
      cadrer(cam,{gros,large:dansF});
      if(T>=q&&T<com) tiMargoCoteE();

      if(T<acc+1.4) g.salut(T-acc,1.4);
      else if(gros) g.ouvre();
      else if(T<q){ T<t91?g.oups():(T<tComment?g.montre():g.reflechit()); }
      else if(T<r) g.reflechit();
      else if(T<com){ T<tQ2?g.montre():g.fier(); }
      else if(T<f){ T<tRep?g.montre():g.ouvre(); }
      else g.ouvre();

      if(window.MINI){ scene.x=.1; scene.ry=-.12; cam.x=.2; cam.y=2.62; cam.d=9.2; cam.e=.04; P.jaw=.62; g.reflechit(); }
    } };
};
